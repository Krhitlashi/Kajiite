// Vegetajxa modulo — betuloj, filikoj, likenoj por la nebula arbara medio
import * as THREE from "three";
import { kreiSxelanTeksajxon, kreiLarikanSxelanTeksajxon, kreiFilikanTeksajxon, kreiPurpuranFilikanTeksajxon,
  kreiHerbErinanTeksajxon, kreiLikenanTeksajxon, kreiPurpuranFolianTeksajxon } from "./teksajxoj.js";

const hazard = (a: number, b: number): number => a + Math.random() * (b - a);

// La purpuraj filik-trunkaj radiusoj ( supro kaj malsupro ) — uzataj kaj por
// la trunka geometrio kaj por la fronda elir-radiuso, por ke ili ĉiam kongruu.
const PURPURAJ_TRUNKAJ_RADIOJ = { supro: 3/16, malsupro: 5/16 };

export interface ArboMetado {
  x: number; z: number; h: number; s: number;
}

// metiArbojn — Metu arbojn en la arbaron, evitante riverojn, vojojn kaj konstruajxojn.
//     @param heightFn ( funkcio ) - Tera alta funkcio.
export function metiArbojn( heightFn: (x: number, z: number) => number,
  kvanto: number,
  worldRadius: number,
  excludeRivers: (x: number, z: number) => boolean,
  excludePaths: (x: number, z: number, minDistanco: number) => boolean,
  excludeBuildings: (x: number, z: number, minDistanco: number) => boolean,
  semo = 0o53104,
  evituArbojn: ArboMetado[] = [],
  minimumaDistanco = 0o10
): ArboMetado[] {
  const hazardaGenerilo = mulberry32( semo );
  const placed: ArboMetado[] = [];
  let provoj = 0;

  const bonaLoko = (x: number, z: number): boolean => {
    if (Math.hypot(x, z) < 0o20) return false;
    if (excludeRivers(x, z)) return false;
    if (excludePaths(x, z, 36/8)) return false;
    if (excludeBuildings(x, z, 3)) return false;
    for ( const arbo of [ ...evituArbojn, ...placed ] ) {
      if ( Math.hypot( x - arbo.x, z - arbo.z ) < minimumaDistanco ) return false;
    }
    return true;
  };

  while ( placed.length < kvanto && provoj++ < 0o3720 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    const radiuso = 0o30 + worldRadius * Math.sqrt(hazardaGenerilo());
    const x = Math.sin(angulo) * radiuso;
    const z = Math.cos(angulo) * radiuso;
    if (Math.abs(x) > worldRadius + 0o24 || Math.abs(z) > worldRadius + 0o24) continue;
    if (!bonaLoko(x, z)) continue;
    placed.push({ x, z, h: heightFn(x, z), s: 51/64 + hazardaGenerilo() * 45/64 });
  }
  return placed;
}

// konstruiArbaron — Konstruu instancigitajn arbojn (trunkoj kaj foliaroj) en la sceno.
export function konstruiArbaron( sceno: THREE.Scene,
  arboj: ArboMetado[]
): void {
  if (arboj.length === 0) return;

  const hazardaGenerilo = mulberry32(77531);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const trunkaGeometrio = new THREE.CylinderGeometry(7/32, 3/8, 1, 7, 1);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, roughness: 45/64 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);

  const kronaGeometrio = new THREE.SphereGeometry(1, 7, 5);
  const kronaMaterialo = new THREE.MeshStandardMaterial({ roughness: 29/32 });
  const kronoj = new THREE.InstancedMesh(kronaGeometrio, kronaMaterialo, arboj.length * 2);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x688858, 0x78a068, 0x88a878, 0xa0b080, 0x789868 ];

  arboj.forEach((t, i) => {
    const h = 52/8 + t.s * 36/8;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(t.x, t.h + h / 2, t.z), Q, new THREE.Vector3(1, h, 1));
    trunkoj.setMatrixAt(i, M);

    const kronoRadiuso = 141/64 * t.s + 51/64;
    M.compose(new THREE.Vector3(t.x, t.h + h - 4/8, t.z), Q, new THREE.Vector3(kronoRadiuso, kronoRadiuso * 23/32, kronoRadiuso));
    kronoj.setMatrixAt(i * 2, M);
    kronoj.setColorAt(i * 2, C.setHex(paletro[(hazardaGenerilo() * paletro.length) | 0]));

    M.compose( new THREE.Vector3(t.x + kronoRadiuso * 19/64, t.h + h + 51/64, t.z + kronoRadiuso * 13/64),
      Q,
      new THREE.Vector3(kronoRadiuso * 19/32, kronoRadiuso * 4/8, kronoRadiuso * 19/32) );
    kronoj.setMatrixAt(i * 2 + 1, M);
    kronoj.setColorAt(i * 2 + 1, C.setHex(paletro[(hazardaGenerilo() * paletro.length) | 0]));
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  kronoj.instanceMatrix.needsUpdate = true;
  if (kronoj.instanceColor) kronoj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = kronoj.castShadow = true;
  sceno.add(trunkoj, kronoj);
}

// konstruiFilikojn — Metu filikojn proksime al arboj kaj vojrandoj.
export function konstruiFilikojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: (x: number, z: number) => number,
  nearTrees: ArboMetado[],
  vojSpecimenoj: THREE.Vector3[],
  excludeRivers: (x: number, z: number) => boolean,
  excludePaths: (x: number, z: number, minDistanco: number) => boolean
): void {
  const hazardaGenerilo = mulberry32(55661);
  const filikaTeksajxo = kreiFilikanTeksajxon();

  const fa = new THREE.PlaneGeometry(109/64, 109/64).translate(0, 27/32, 0);
  const fb = fa.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));

  // mana kunfando
  const merged = kunfandiDuGeometriojn(fa, fb);
  const filikaMaterialo = new THREE.MeshStandardMaterial({ map: filikaTeksajxo, alphaTest: 13/32, side: THREE.DoubleSide, roughness: 1 });
  const filikoj = new THREE.InstancedMesh(merged, filikaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  let fi = 0;
  let gardilo = 0;

  while ( fi < kvanto && gardilo++ < 0o5670 ) {
    let x: number, z: number;
    if (hazardaGenerilo() < 19/32 && nearTrees.length) {
      const t = nearTrees[(hazardaGenerilo() * nearTrees.length) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 3;
      x = t.x + Math.sin(a) * hazardaRadiuso;
      z = t.z + Math.cos(a) * hazardaRadiuso;
    } else if ( vojSpecimenoj.length ) {
      const p = vojSpecimenoj[(hazardaGenerilo() * vojSpecimenoj.length) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 2 + hazardaGenerilo() * 3;
      x = p.x + Math.sin(a) * hazardaRadiuso;
      z = p.z + Math.cos(a) * hazardaRadiuso;
    } else {
      x = (hazardaGenerilo() - 4/8) * 0o310;
      z = (hazardaGenerilo() - 4/8) * 0o310;
    }

    if (excludeRivers(x, z) || excludePaths(x, z, 2) || Math.hypot(x, z) < 0o16) continue;

    const skalo = 45/64 + hazardaGenerilo() * 51/64;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q, new THREE.Vector3(skalo, skalo, skalo));
    filikoj.setMatrixAt(fi++, M);
  }

  filikoj.count = fi;
  filikoj.instanceMatrix.needsUpdate = true;
  sceno.add(filikoj);
}

// konstruiPurpurajnPlantojn — Metu malaltajn purpurajn plantojn en la arbara rando.
export function konstruiPurpurajnPlantojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  konstruiPeriferianFilikanAreon( sceno, kvanto, heightFn, excludeRivers, excludePaths, excludeBuildings,
    kreiPurpuranFilikanTeksajxon( true ), 10/16, 14/16, 0o53104 );
}

// konstruiPurpurajnFilikojn — Metu pli altajn purpurajn filikojn inter la eksteraj arboj.
export function konstruiPurpurajnFilikojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  konstruiPeriferianFilikanAreon( sceno, kvanto, heightFn, excludeRivers, excludePaths, excludeBuildings,
    kreiPurpuranFilikanTeksajxon(), 13/16, 20/16, 0o53114 );
}

// konstruiPeriferianFilikanAreon — Kunigu du krucajn tavolojn por natura arbara rando.
function konstruiPeriferianFilikanAreon( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  teksajxo: THREE.CanvasTexture,
  bazaLargho: number,
  bazaAlto: number,
  semo: number
): void {
  const hazardaGenerilo = mulberry32( semo );
  // Kvar egalaj krucaj ebenoj konservas la frondan formon el cxiu rigardangulo.
  // Tri ebenoj lasis kelkajn specimenojn videble plataj kaj distorditaj.
  const fa = new THREE.PlaneGeometry( bazaLargho, bazaAlto ).translate( 0, bazaAlto / 2, 0 );
  const fb = fa.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI / 2 ));
  const fc = fa.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI / 4 ));
  const fd = fa.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( 3 * Math.PI / 4 ));
  const merged = kunfandiGeometriojn([ fa, fb, fc, fd ]);
  const materialo = new THREE.MeshStandardMaterial({ map: teksajxo, alphaTest: 4/8, side: THREE.DoubleSide, roughness: 1 });
  const plantoj = new THREE.InstancedMesh( merged, materialo, kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  let pi = 0;
  let gardilo = 0;

  while ( pi < kvanto && gardilo++ < 0o10000 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    // Ringforma distribuo lasas la urbon malfermita kaj dikigas la arbaran transiron.
    const radiuso = 0o100 + 0o100 * Math.sqrt( hazardaGenerilo() );
    const x = Math.sin( angulo ) * radiuso;
    const z = Math.cos( angulo ) * radiuso;
    if ( Math.hypot( x, z ) > 0o200 ) continue;
    if ( excludeRivers( x, z )) continue;
    if ( excludePaths( x, z, 0o2 )) continue;
    if ( excludeBuildings( x, z, 0o2 )) continue;

    const skalo = 6/8 + hazardaGenerilo() * 6/8;
    E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
    Q.setFromEuler( E );
    M.compose( new THREE.Vector3( x, heightFn( x, z ), z ), Q,
      new THREE.Vector3( skalo, skalo, skalo ));
    plantoj.setMatrixAt( pi++, M );
  }

  plantoj.count = pi;
  plantoj.instanceMatrix.needsUpdate = true;
  sceno.add( plantoj );
}

// konstruiAltajnPurpurajnFilikojn — Metu arboformajn purpurajn filikojn ĉe la arbara rando.
// La folioj kreskas tavole laŭ la trunko kaj la trunko transiras al ili
// senjunte — kiel la Ĥŝakŝlefo.
export function konstruiAltajnPurpurajnFilikojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  const hazardaGenerilo = mulberry32( 0o53124 );
  const specoj = [
    { trunkaAlto: 60/8, kronaAlto: 59/8, kronaLargho: 14/8, nombro: 0o10, mallevo: 8/8, densa: false },
    { trunkaAlto: 46/8, kronaAlto: 44/8, kronaLargho: 10/8, nombro: 0o6, mallevo: 4/8, densa: true },
    { trunkaAlto: 84/8, kronaAlto: 35/8, kronaLargho: 10/8, nombro: 5, mallevo: 9/8, densa: false },
  ];
  // Ĉiu speco havas sian tavolnombron — la folioj kreskas tavole.
  const TAVOLOJ = [ 2, 3, 4 ];
  const kronajGeometrioj = specoj.map( ( speco, i ) => konstruiTavolanFrondanKronon( speco, TAVOLOJ[i] ));
  const trunkajGeometrioj = specoj.map( speco => new THREE.CylinderGeometry(
    PURPURAJ_TRUNKAJ_RADIOJ.supro, PURPURAJ_TRUNKAJ_RADIOJ.malsupro, speco.trunkaAlto, 7 ));
  const trunkajMaterialoj = specoj.map( ( _, i ) => new THREE.MeshStandardMaterial({ color: [ 0x3a2742, 0x40204a, 0x2a1a44 ][i], roughness: 7/8 }));
  const kronajMaterialoj = specoj.map( speco => new THREE.MeshStandardMaterial({
    map: kreiPurpuranFilikanTeksajxon( speco.densa ), alphaTest: 4/8, side: THREE.DoubleSide, roughness: 1,
  }));
  const nombroj = specoj.map( () => Math.ceil( kvanto / specoj.length ));
  const trunkoj = trunkajGeometrioj.map( ( geometrio, i ) => new THREE.InstancedMesh( geometrio, trunkajMaterialoj[i], nombroj[i] ));
  const kronoj = kronajGeometrioj.map( ( geometrio, i ) => new THREE.InstancedMesh( geometrio, kronajMaterialoj[i], nombroj[i] ));
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const indicoj = specoj.map( () => 0 );
  let provoj = 0;

  while ( indicoj.reduce( ( a, b ) => a + b, 0 ) < kvanto && provoj++ < 0o10000 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    const radiuso = 0o100 + 0o100 * Math.sqrt( hazardaGenerilo() );
    const x = Math.sin( angulo ) * radiuso;
    const z = Math.cos( angulo ) * radiuso;
    if ( Math.hypot( x, z ) > 0o200 ) continue;
    if ( excludeRivers( x, z ) || excludePaths( x, z, 0o3 ) || excludeBuildings( x, z, 0o3 )) continue;

    // Hazardelektu la specion — malsamaj trunkoj/kronoj donas diversajn grandecojn.
    let specoIndico = ( hazardaGenerilo() * specoj.length ) | 0;
    if ( indicoj[specoIndico] >= nombroj[specoIndico] ) {
      specoIndico = indicoj.findIndex( ( n, j ) => n < nombroj[j] );
      if ( specoIndico < 0 ) break;
    }
    const speco = specoj[specoIndico];
    const skalo = 5/8 + hazardaGenerilo() * 9/8;
    E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
    Q.setFromEuler( E );
    const y = heightFn( x, z );
    // La translokigoj devas inkluzivi la saman specimenan skalon kiel la geometrio.
    // Alie la trunko malleviĝas kaj la krono flosas super ĝi ĉe malgrandaj skaloj.
    const trunkaCentroY = y + speco.trunkaAlto * skalo / 2;
    // La tavola krono-geometrio estas baz-ankrita ĉe la trunka bazo — la plej
    // suba tavolo komenciĝas duone laŭ la trunko, do la trunko transiras al
    // la folioj senjunte.
    const kronaCentroY = y;
    M.compose( new THREE.Vector3( x, trunkaCentroY, z ), Q, new THREE.Vector3( skalo, skalo, skalo ));
    trunkoj[specoIndico].setMatrixAt( indicoj[specoIndico], M );
    M.compose( new THREE.Vector3( x, kronaCentroY, z ), Q, new THREE.Vector3( skalo, skalo, skalo ));
    kronoj[specoIndico].setMatrixAt( indicoj[specoIndico], M );
    indicoj[specoIndico]++;
  }

  trunkoj.forEach( ( mesh, i ) => { mesh.count = indicoj[i]; mesh.instanceMatrix.needsUpdate = true; mesh.castShadow = true; sceno.add( mesh ); });
  kronoj.forEach( ( mesh, i ) => { mesh.count = indicoj[i]; mesh.instanceMatrix.needsUpdate = true; mesh.castShadow = true; sceno.add( mesh ); });
}

function kunfandiGeometriojn( geometrioj: THREE.BufferGeometry[] ): THREE.BufferGeometry {
  if ( geometrioj.length === 0 ) return new THREE.BufferGeometry();
  return geometrioj.slice( 1 ).reduce( ( rezulto, geometrio ) => kunfandiDuGeometriojn( rezulto, geometrio ), geometrioj[0] );
}

function konstruiFrondanKronon( nombro: number, largho: number, alto: number, mallevo: number, radiuso = 0 ): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  for ( let i = 0; i < nombro; i++ ) {
    // Konstruu cxiu frondon cxirkaux la bazo; tiel la bazo restas sur la grundo
    // kaj la rotacio ne tiras la teksturon en oblikvan, distorditan formon.
    const frondo = new THREE.PlaneGeometry( largho, alto ).translate( 0, alto / 2, 0 ).toNonIndexed();
    const transformo = new THREE.Matrix4().makeRotationY( i / nombro * Math.PI * 2 );
    transformo.multiply( new THREE.Matrix4().makeRotationX( mallevo ));
    frondo.applyMatrix4( transformo );
    // Puŝu la frondon eksteren laŭ la trunka radiuso, por ke ĝi eliru el la
    // trunka surfaco anstataŭ sub ĝi.
    frondo.translate( Math.sin( i / nombro * Math.PI * 2 ) * radiuso, 0,
      Math.cos( i / nombro * Math.PI * 2 ) * radiuso );
    partoj.push( frondo );
  }
  const geometrio = kunfandiGeometriojn( partoj );
  geometrio.computeBoundingBox();
  if ( geometrio.boundingBox ) geometrio.translate( 0, -geometrio.boundingBox.min.y, 0 );
  return geometrio;
}

// konstruiTavolanFrondanKronon — Kunu plurajn frondajn tavolojn laŭ la trunko,
// por ke la folioj kresku tavole kaj la trunko transiru al ili senjunte. La plej
// suba tavolo estas ĉe y=0 ( la trunka bazo ); la supraj sekvas la trunk-alton.
//     @param speco ( objekto ) - La speco-datumoj.
//     @param tavoloj ( number ) - Kiom da foliaj tavoloj.
//     @returns geometrio ( THREE.BufferGeometry ) - La tavola krono.
function konstruiTavolanFrondanKronon( speco: {
  trunkaAlto: number; kronaAlto: number; kronaLargho: number; nombro: number; mallevo: number;
}, tavoloj: number ): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  for ( let t = 0; t < tavoloj; t++ ) {
    // La plej suba tavolo duone laŭ la trunko; la supro ĝuste sur la trunka
    // pinto — la supraj folioj kuŝas sur la trunko, nek sub nek super ĝi,
    // ĉe ĉiu plant-grandeco ( ĉio estas proporcia al la trunka alto ).
    const frakcio = 1/2 + t * ( 1/2 / ( tavoloj - 1 ) );
    // La malsupraj folioj estas pli malgrandaj; la supraj plenaj.
    const skaloT = 1/2 + t * ( 1/2 / ( tavoloj - 1 ) );
    // La trunka radiuso ĉe tiu alto ( la trunko pintigas de malsupro al supro ) —
    // la frondoj eliras el la trunka surfaco, ne sub ĝi.
    const trunkaRadiuso = PURPURAJ_TRUNKAJ_RADIOJ.malsupro
      - frakcio * ( PURPURAJ_TRUNKAJ_RADIOJ.malsupro - PURPURAJ_TRUNKAJ_RADIOJ.supro );
    const frondo = konstruiFrondanKronon( speco.nombro,
      speco.kronaLargho * skaloT, speco.kronaAlto * skaloT, speco.mallevo, trunkaRadiuso );
    frondo.translate( 0, speco.trunkaAlto * frakcio, 0 );
    partoj.push( frondo );
  }
  return kunfandiGeometriojn( partoj );
}

// konstruiLikenSxtonojn — Metu liken-kovritajn sxtonojn en la arbaron.
// Kelkaj sxtonoj portas verdan likenan nuancon, la aliaj restas grizaj.
//     @returns metitaj ( ArboMetado[] ) - La pozicioj de la metitaj sxtonoj,
//         por ke la likenoj povas grupigi ĉirkaŭ ili.
export function konstruiLikenSxtonojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: (x: number, z: number) => number,
  excludeRivers: (x: number, z: number) => boolean,
  excludePaths: (x: number, z: number, minDistanco: number) => boolean
): ArboMetado[] {
  const hazardaGenerilo = mulberry32( 99221 );
  const sxtonaGeometrio = new THREE.IcosahedronGeometry( 1, 0 );
  const sxtonoj = new THREE.InstancedMesh( sxtonaGeometrio,
    new THREE.MeshStandardMaterial({ roughness: 61/64 }), kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x687870, 0x788878, 0x687870, 0x889870, 0x98a880, 0x788878 ];
  const metitaj: ArboMetado[] = [];

  for ( let i = 0; i < kvanto; i++ ) {
    let x: number, z: number;
    const a = hazardaGenerilo() * Math.PI * 2;
    const hazardaRadiuso = 0o22 + hazardaGenerilo() * 0o156;
    x = Math.sin(a) * hazardaRadiuso;
    z = Math.cos(a) * hazardaRadiuso;
    if (excludeRivers(x, z) || excludePaths(x, z, 0o2)) { i--; continue; }

    const skaloY = 4/8 + hazardaGenerilo() * 4/8;
    E.set(hazardaGenerilo() * 13/32, hazardaGenerilo() * Math.PI * 2, hazardaGenerilo() * 13/32);
    Q.setFromEuler(E);
    const y = heightFn( x, z );
    M.compose( new THREE.Vector3(x, y + skaloY * 19/64, z),
      Q,
      new THREE.Vector3(skaloY, skaloY, skaloY) );
    sxtonoj.setMatrixAt(i, M);
    sxtonoj.setColorAt( i, C.setHex( paletro[ ( hazardaGenerilo() * paletro.length ) | 0 ] ) );
    metitaj.push( { x, z, h: y, s: skaloY } );
  }

  sxtonoj.instanceMatrix.needsUpdate = true;
  if ( sxtonoj.instanceColor ) sxtonoj.instanceColor.needsUpdate = true;
  sxtonoj.castShadow = true;
  sceno.add(sxtonoj);
  return metitaj;
}

// konstruiLikenojn — Metu krustajn likenajn makulojn sur la arbaran teron.
// Ĉiu makulo estas unu ebeno kuŝigita laŭ la loka deklivo — la normalo venas
// el tri teraj specimenoj, do la makulo sekvas la monteton kaj ne tranĉas
// en ĝin. Unu ebeno ankaŭ evitas la mem-flagradon de krucigitaj ebenoj.
// La makuloj grupigas apud arboj kaj sxtonoj, kaj kelkaj sterniĝas hazarde.
//     @param nearTrees ( ArboMetado[] ) - Arboj por la grupigado.
//     @param nearSxtonoj ( ArboMetado[] ) - Liken-sxtonoj por la grupigado.
export function konstruiLikenojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  nearSxtonoj: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  const hazardaGenerilo = mulberry32( 0o72331 );
  const likenaTeksajxo = kreiLikenanTeksajxon();

  const geometrio = new THREE.PlaneGeometry( 1, 1 );
  geometrio.rotateX( -Math.PI / 2 );
  const materialo = new THREE.MeshStandardMaterial({
    map: likenaTeksajxo, alphaTest: 13/32, side: THREE.DoubleSide,
    transparent: true, depthWrite: false, roughness: 1,
  });
  const likenoj = new THREE.InstancedMesh( geometrio, materialo, kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const yawQ = new THREE.Quaternion();
  const vertikala = new THREE.Vector3( 0, 1, 0 );
  const normalo = new THREE.Vector3();
  const ena = new THREE.Vector3();
  const enX = new THREE.Vector3();
  const enZ = new THREE.Vector3();
  const ankroj = [ ...nearTrees, ...nearSxtonoj ];
  let li = 0;
  let gardilo = 0;

  while ( li < kvanto && gardilo++ < 0o10000 ) {
    let x: number, z: number;
    if ( ankroj.length && hazardaGenerilo() < 3/4 ) {
      const t = ankroj[ ( hazardaGenerilo() * ankroj.length ) | 0 ];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 3;
      x = t.x + Math.sin( a ) * hazardaRadiuso;
      z = t.z + Math.cos( a ) * hazardaRadiuso;
    } else {
      const a = hazardaGenerilo() * Math.PI * 2;
      const r = 0o20 + 0o160 * Math.sqrt( hazardaGenerilo() );
      x = Math.cos( a ) * r;
      z = Math.sin( a ) * r;
    }
    if ( excludeRivers( x, z ) || excludePaths( x, z, 0o2 )) continue;
    if ( Math.hypot( x, z ) < 0o20 ) continue;

    const skalo = 6/8 + hazardaGenerilo() * 10/8;
    // Tri teraj specimenoj difinas la deklivan normalon.
    const paso = skalo * 1/2;
    ena.set( x, heightFn( x, z ), z );
    enX.set( x + paso, heightFn( x + paso, z ), z ).sub( ena );
    enZ.set( x, heightFn( x, z + paso ), z ).sub( ena );
    normalo.crossVectors( enZ, enX ).normalize();
    Q.setFromUnitVectors( vertikala, normalo );
    E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
    yawQ.setFromEuler( E );
    Q.multiply( yawQ );
    M.compose( new THREE.Vector3( x, ena.y + 1/32, z ), Q,
      new THREE.Vector3( skalo, skalo, skalo ) );
    likenoj.setMatrixAt( li++, M );
  }

  likenoj.count = li;
  likenoj.instanceMatrix.needsUpdate = true;
  sceno.add( likenoj );
}

// konstruiLarikon — Konstruu instancigitajn alpinajn larikojn en la sceno.
// La alpina lariko havas grizbrunan, platan trunk-sxoelon kaj aŭtunan
// orflavan pinglaron — la sola konifero kiu perdas siajn pinglojn aŭtune.
// Ĝiaj tavoligitaj kronoj formas distingajn kirlojn.
//     @param arboj ( ArboMetado[] ) - La metitaj arboj.
export function konstruiLarikon( sceno: THREE.Scene,
  arboj: ArboMetado[]
): void {
  if ( arboj.length === 0 ) return;

  const hazardaGenerilo = mulberry32( 33718 );
  const larikaTeksajxo = kreiLarikanSxelanTeksajxon();
  const trunkaGeometrio = new THREE.CylinderGeometry( 7/32, 3/8, 1, 7, 1 );
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: larikaTeksajxo, roughness: 45/64 });
  const trunkoj = new THREE.InstancedMesh( trunkaGeometrio, trunkaMaterialo, arboj.length );

  // Du aŭ tri konusaj tavoloj, ĉiu pli mallarĝa ol la antaŭa — la kirloj
  // de la alpina lariko. La tavoloj restas sur la trunk-akso, nur la tria
  // foje estas kaŝita ( skalo 0 ).
  const kronaGeometrio = new THREE.ConeGeometry( 1, 1, 7, 1 );
  const kronaMaterialo = new THREE.MeshStandardMaterial({ roughness: 29/32 });
  const kronoj = new THREE.InstancedMesh( kronaGeometrio, kronaMaterialo, arboj.length * 3 );

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  // Aŭtunaj pingloj — orflavaj kun kelkaj verdflavaj kaj ambraj nuancoj.
  const paletro = [ 0xc8a848, 0xd0b858, 0xd8c060, 0xd8a838, 0xc0a048, 0xe0c868, 0xb89038, 0xa8b048 ];

  arboj.forEach(( t, i ) => {
    const h = 48/8 + t.s * 32/8;
    const trunkaLargho = 25/32 + t.s * 7/32;
    // Alpaj larikoj kreskas kompakte — malgranda klino nur rompas la uniformecon.
    const Q = kreiKlinoQuaternionon( hazardaGenerilo, 3/16, hazardaGenerilo() * Math.PI * 2 );
    const bazo = new THREE.Vector3( t.x, t.h, t.z );
    const pozicio = kreiPoziciilon( bazo, Q );

    M.compose( pozicio( new THREE.Vector3( 0, h / 2, 0 ) ), Q,
      new THREE.Vector3( trunkaLargho, h, trunkaLargho ) );
    trunkoj.setMatrixAt( i, M );

    const tavoloj = 2 + ( ( hazardaGenerilo() * 2 ) | 0 );
    const bazaLargho = 9/8 * t.s + 4/8;
    const bazaAlto = 15/8 * t.s + 5/8;
    let y = h;
    for ( let k = 0; k < 3; k++ ) {
      const kaŝita = k >= tavoloj ? 0 : 1;
      const m = k / 3;
      const kronoLargho = bazaLargho * ( 1 - m * 3/4 );
      const kronoAlto = bazaAlto * ( 1 - m * 3/16 );
      y += kronoAlto * 3/8;
      M.compose( pozicio( new THREE.Vector3( 0, y, 0 ) ),
        Q, new THREE.Vector3( kronoLargho * kaŝita, kronoAlto * kaŝita, kronoLargho * kaŝita ) );
      kronoj.setMatrixAt( i * 3 + k, M );
      kronoj.setColorAt( i * 3 + k, hazardaKoloro( hazardaGenerilo, C, paletro ) );
      y += kronoAlto * 5/8;
    }
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  kronoj.instanceMatrix.needsUpdate = true;
  if ( kronoj.instanceColor ) kronoj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = kronoj.castShadow = true;
  sceno.add( trunkoj, kronoj );
}

// konstruiHxsxaksxlefojn — Konstruu instancigitajn purpurajn laktuk-arbojn
// ( ı],ͷ̗ɔʞ ֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ / Ĥŝakŝlefo ) en la sceno. Ĉiu arbo havas altan
// purpuran trunkon kaj 3–5 tavolojn, ĉiu kun kvar grandaj kurbiĝintaj folioj
// ( kvar flankoj × pluraj fojoj vertikale — la tri-tavola regulo estis nur
// ekzemplo, do pli povas okazi ). De la unua folia tavolo supren la trunko
// estas kovrita de rigidaj senkrustiĝantaj ringoj — simetriaj tasoj kies
// supraj randoj disiĝas foliforme, el kiuj la folioj etendiĝas senjunte.
//     @param arboj ( ArboMetado[] ) - La metitaj arboj.
export function konstruiHxsxaksxlefojn( sceno: THREE.Scene,
  arboj: ArboMetado[]
): void {
  if ( arboj.length === 0 ) return;

  const hazardaGenerilo = mulberry32( 0o62445 );
  const MAX_TAVOLOJ = 5;
  // Purpura trunko — kiel la aliaj purpuraj plantoj, ne betula ŝelo.
  const trunkaGeometrio = new THREE.CylinderGeometry( 7/32, 3/8, 1, 7, 1 );
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ color: 0x482848, roughness: 45/64 });
  const trunkoj = new THREE.InstancedMesh( trunkaGeometrio, trunkaMaterialo, arboj.length );

  // Pli dika, plena folio — pli larĝa klingo, pli profunda kurbeco kaj
  // reala diko, kiel laktuko aŭ brasiko.
  const foliaGeometrio = konstruiKurbanLaktukanFolion();
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiPurpuranFolianTeksajxon(), alphaTest: 13/32, side: THREE.DoubleSide, roughness: 1,
  });
  const folioj = new THREE.InstancedMesh( foliaGeometrio, foliaMaterialo, arboj.length * MAX_TAVOLOJ * 4 );

  // Rigidaj ŝelaj ringoj — plenaj simetriaj tasoj ĉirkaŭ la trunko, pli larĝaj
  // ĉe la supro kaj kurbiĝantaj eksteren ( trumpeto-formo ), kies supraj randoj
  // disiĝas en kvar foliformajn lobojn ( ĉe la kvar flankoj de la folioj ).
  // La folioj etendiĝas el la loboj senjunte.
  const sxelaGeometrio = new THREE.CylinderGeometry( 14/32, 11/32, 1, 0o30, 1, true ).translate( 0, 1/2, 0 );
  const sxelaPozicioj = sxelaGeometrio.attributes.position;
  for ( let i = 0; i < sxelaPozicioj.count; i++ ) {
    const x = sxelaPozicioj.getX( i );
    const y = sxelaPozicioj.getY( i );
    const z = sxelaPozicioj.getZ( i );
    // La ringo kurbiĝas eksteren al la supro — la radiuso kreskas kvadrate.
    const faktoro = 1 + 1/8 * y * y;
    let novaY = y;
    if ( y > 3/4 ) {
      // Kvar rondaj foli-loboj ĉe la kvar flankaj direktoj.
      const ang = Math.atan2( x, z );
      const lobo = Math.pow( ( Math.cos( 4 * ang ) + 1 ) / 2, 2 );
      novaY = y + 2/5 * lobo;
    }
    sxelaPozicioj.setXYZ( i, x * faktoro, novaY, z * faktoro );
  }
  sxelaGeometrio.computeVertexNormals();
  const sxelaMaterialo = new THREE.MeshStandardMaterial({ color: 0x583858, roughness: 55/64, side: THREE.DoubleSide });
  // Kapacito 9 ringoj po arbo — kun la grandeco-multiplikilo la maksimuma
  // alto estas 18.75 ( 15 × 5/4 ), kiu donas maksimume 9 ringojn.
  const sxeloj = new THREE.InstancedMesh( sxelaGeometrio, sxelaMaterialo, arboj.length * 0o11 );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x8848a8, 0x9858b8, 0xa868c0, 0x7840a0, 0x9050b0 ];
  const yUp = new THREE.Vector3( 0, 1, 0 );
  let fi = 0;
  let si = 0;

  arboj.forEach(( t, i ) => {
    // Malsamaj grandecoj — la arba faktoro donas la bazan alton kaj la
    // multiplikilo ( 3/4 ĝis 5/4 ) faras kelkajn arbojn rimarkeble pli
    // mallongaj kaj aliajn pli altaj.
    const h = ( 72/8 + t.s * 32/8 ) * ( 3/4 + hazardaGenerilo() * 1/2 );
    const Qtrunko = kreiKlinoQuaternionon( hazardaGenerilo, 1/8, hazardaGenerilo() * Math.PI * 2 );
    const bazo = new THREE.Vector3( t.x, t.h, t.z );
    const pozicio = kreiPoziciilon( bazo, Qtrunko );

    M.compose( pozicio( new THREE.Vector3( 0, h / 2, 0 ) ), Qtrunko,
      new THREE.Vector3( 1, h, 1 ) );
    trunkoj.setMatrixAt( i, M );

    // 3–5 tavoloj × kvar flankoj — la folioj ĉirkaŭas la trunkon egale.
    const tavoloj = 3 + ( ( hazardaGenerilo() * 3 ) | 0 );
    for ( let tavolo = 0; tavolo < tavoloj; tavolo++ ) {
      const tFrakcio = tavolo / ( tavoloj - 1 );
      // La supro restas ĉe 15/16 de la alto, por ke trunkopinto videblu super la krono.
      const y = h * ( 7/16 + 8/16 * tFrakcio );
      const tavolaSkalo = ( 1 - tavolo * 1/8 ) * ( 1 + t.s * 1/2 );
      // La trunka radiuso ĉe tiu alto — la folia bazo sidas ĝuste sur la
      // ŝelaj tasoj, kiel etendo de la ŝeloj.
      const trunkaRadiuso = 12/32 - ( y / h ) * 5/32;
      const ellagxo = trunkaRadiuso + 4/32;
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        const angulo = flanko / 4 * Math.PI * 2;
        // La folio leviĝas de la ŝelo kaj branĉiĝas eksteren — klino 3/8
        // donas pli da ekstera etendo dum la bazo restas sur la ŝeloj.
        E.set( 3/8, 0, 0 );
        Q.setFromEuler( E );
        Q.premultiply( new THREE.Quaternion().setFromAxisAngle( yUp, angulo ) );
        Q.premultiply( Qtrunko );
        const skalo = tavolaSkalo * ( 7/8 + hazardaGenerilo() * 1/4 );
        M.compose( pozicio( new THREE.Vector3(
            Math.sin( angulo ) * ellagxo, y, Math.cos( angulo ) * ellagxo ) ),
          Q, new THREE.Vector3( skalo, skalo, skalo ) );
        folioj.setMatrixAt( fi, M );
        folioj.setColorAt( fi, hazardaKoloro( hazardaGenerilo, C, paletro ) );
        fi++;
      }
    }

    // Ŝelaj ringoj — simetriaj tasoj, nestitaj unu en la alian, ekde la unua
    // folia tavolo ĝis la supro. La loboj jam estas en la geometrio ĉe la kvar
    // flankoj, do ĉiu ringo nur sekvas la trunkon.
    const unuaTavolaY = h * 7/16;
    const sxelaAlto = 3/2;
    const ringaSpaco = 9/8;
    // La gardo malsupre rompas la ciklon ĉe la trunka supro, do ĉi tiu
    // kalkulo nur supertaksas — ĝi ne bezonas kroman +1.
    const ringoj = Math.max( 1, Math.ceil( ( h - sxelaAlto - unuaTavolaY ) / ringaSpaco ) );
    for ( let ringo = 0; ringo < ringoj; ringo++ ) {
      const sxelaY = unuaTavolaY + ringo * ringaSpaco;
      if ( sxelaY > h - sxelaAlto ) break;
      M.compose( pozicio( new THREE.Vector3( 0, sxelaY, 0 ) ), Qtrunko,
        new THREE.Vector3( 1, sxelaAlto, 1 ) );
      sxeloj.setMatrixAt( si, M );
      si++;
    }
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  folioj.count = fi;
  folioj.instanceMatrix.needsUpdate = true;
  if ( folioj.instanceColor ) folioj.instanceColor.needsUpdate = true;
  sxeloj.count = si;
  sxeloj.instanceMatrix.needsUpdate = true;
  trunkoj.castShadow = folioj.castShadow = sxeloj.castShadow = true;
  sceno.add( trunkoj, folioj, sxeloj );
}

// konstruiHerbon — Metu instancigitajn herberojn en la arbaron.
export function konstruiHerbon( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  const hazardaGenerilo = mulberry32(44261);
  const herbaTeksajxo = kreiHerbErinanTeksajxon();

  const fa = new THREE.PlaneGeometry( 5/8, 8/8 ).translate( 0, 4/8, 0 );
  const fb = fa.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI / 2 ));
  const merged = kunfandiDuGeometriojn( fa, fb );
  const herbaMaterialo = new THREE.MeshStandardMaterial({ map: herbaTeksajxo, alphaTest: 13/32, side: THREE.DoubleSide, roughness: 1 });
  const herboj = new THREE.InstancedMesh( merged, herbaMaterialo, kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  let hi = 0;
  let gardilo = 0;

  while ( hi < kvanto && gardilo++ < 0o5670 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    const radiuso = 0o20 + 0o177 * Math.sqrt( hazardaGenerilo() );
    const x = Math.sin( angulo ) * radiuso;
    const z = Math.cos( angulo ) * radiuso;
    if ( Math.abs( x ) > 0o250 || Math.abs( z ) > 0o250 ) continue;
    if ( excludeRivers( x, z )) continue;
    if ( excludePaths( x, z, 2 )) continue;
    if ( excludeBuildings( x, z, 2 )) continue;
    if ( Math.hypot( x, z ) < 0o16 ) continue;

    const skalo = 4/8 + hazardaGenerilo() * 6/8;
    E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
    Q.setFromEuler( E );
    M.compose( new THREE.Vector3( x, heightFn( x, z ), z ), Q, new THREE.Vector3( skalo, skalo, skalo ));
    herboj.setMatrixAt( hi++, M );
  }

  herboj.count = hi;
  herboj.instanceMatrix.needsUpdate = true;
  sceno.add( herboj );
}

// konstruiMusxajnMontetojn — Metu musko montetojn proksime al arboj.
export function konstruiMusxajnMontetojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  const hazardaGenerilo = mulberry32(66173);
  const muskaGeometrio = new THREE.SphereGeometry( 1, 6, 5 );
  const muskaMaterialo = new THREE.MeshStandardMaterial({ roughness: 1, color: 0x385038 });
  const muskoj = new THREE.InstancedMesh( muskaGeometrio, muskaMaterialo, kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  let mi = 0;
  let gardilo = 0;

  while ( mi < kvanto && gardilo++ < 0o3720 ) {
    let x: number, z: number;
    if ( hazardaGenerilo() < 22/32 && nearTrees.length ) {
      const t = nearTrees[( hazardaGenerilo() * nearTrees.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 3;
      x = t.x + Math.sin( a ) * hazardaRadiuso;
      z = t.z + Math.cos( a ) * hazardaRadiuso;
    } else {
      const a = hazardaGenerilo() * Math.PI * 2;
      const r = 0o22 + hazardaGenerilo() * 0o166;
      x = Math.cos( a ) * r;
      z = Math.sin( a ) * r;
    }
    if ( excludeRivers( x, z ) || excludePaths( x, z, 0o2 )) continue;
    if ( Math.hypot( x, z ) < 0o20 ) continue;

    const skalo = 3/8 + hazardaGenerilo() * 5/8;
    M.compose( new THREE.Vector3( x, heightFn( x, z ) + skalo * 2/8, z ),
      Q.identity(),
      new THREE.Vector3( skalo, skalo * 3/8, skalo ));
    muskoj.setMatrixAt( mi++, M );
  }

  muskoj.count = mi;
  muskoj.instanceMatrix.needsUpdate = true;
  sceno.add( muskoj );
}

// konstruiFalintajnTrunkojn — Metu falintajn arbtrunkojn en la arbaron.
export function konstruiFalintajnTrunkojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  const hazardaGenerilo = mulberry32(22931);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const trunkaGeometrio = new THREE.CylinderGeometry( 3/8, 4/8, 1, 7, 1 );
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, roughness: 55/64 });
  const trunkoj = new THREE.InstancedMesh( trunkaGeometrio, trunkaMaterialo, kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  let ti = 0;
  let gardilo = 0;

  while ( ti < kvanto && gardilo++ < 0o3720 ) {
    let x: number, z: number;
    if ( hazardaGenerilo() < 22/32 && nearTrees.length ) {
      const t = nearTrees[( hazardaGenerilo() * nearTrees.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 4;
      x = t.x + Math.sin( a ) * hazardaRadiuso;
      z = t.z + Math.cos( a ) * hazardaRadiuso;
    } else {
      const a = hazardaGenerilo() * Math.PI * 2;
      const r = 0o30 + hazardaGenerilo() * 0o160;
      x = Math.cos( a ) * r;
      z = Math.sin( a ) * r;
    }
    if ( excludeRivers( x, z ) || excludePaths( x, z, 0o3 )) continue;
    if ( Math.hypot( x, z ) < 0o24 ) continue;

    const longo = 10/8 + hazardaGenerilo() * 18/8;
    E.set( 0, hazardaGenerilo() * Math.PI * 2, Math.PI / 2 + ( hazardaGenerilo() - 4/8 ) * 4/8 );
    Q.setFromEuler( E );
    M.compose( new THREE.Vector3( x, heightFn( x, z ) + 4/8, z ), Q, new THREE.Vector3( 1, longo, 1 ));
    trunkoj.setMatrixAt( ti++, M );
  }

  trunkoj.count = ti;
  trunkoj.instanceMatrix.needsUpdate = true;
  trunkoj.castShadow = true;
  sceno.add( trunkoj );
}

// konstruiEquisetum — Metu instancigitajn equisetum ( kavalerbojn ) proksime al rivero.
export function konstruiEquisetum( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  riverZFn: ( x: number ) => number,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  const hazardaGenerilo = mulberry32(11593);
  const equiGeometrio = new THREE.CylinderGeometry( 1/16, 2/16, 1, 5, 3 );
  const equiMaterialo = new THREE.MeshStandardMaterial({ roughness: 7/8, color: 0x407848 });
  const equis = new THREE.InstancedMesh( equiGeometrio, equiMaterialo, kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  let ei = 0;
  let gardilo = 0;

  while ( ei < kvanto && gardilo++ < 0o5670 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    const radiuso = 0o20 + 0o177 * Math.sqrt( hazardaGenerilo() );
    const x = Math.sin( angulo ) * radiuso;
    const z = Math.cos( angulo ) * radiuso;
    if ( Math.abs( x ) > 0o200 || Math.abs( z ) > 0o200 ) continue;
    // Nur proksime al rivero
    if ( Math.abs( z - riverZFn( x )) > 0o12 ) continue;
    if ( excludeBuildings( x, z, 3 ) || excludePaths( x, z, 0o2 )) continue;
    if ( Math.hypot( x, z ) < 0o16 ) continue;

    const alto = 10/8 + hazardaGenerilo() * 14/8;
    E.set( 0, 0, ( hazardaGenerilo() - 4/8 ) * 4/8 );
    Q.setFromEuler( E );
    M.compose( new THREE.Vector3( x, heightFn( x, z ) + alto / 2, z ), Q, new THREE.Vector3( 1, alto, 1 ));
    equis.setMatrixAt( ei++, M );
  }

  equis.count = ei;
  equis.instanceMatrix.needsUpdate = true;
  sceno.add( equis );
}

// helpiloj

// konstruiKurbanLaktukanFolion — Konstruu kurbiĝintan laktukan folion.
// La folio etendiĝas de la bazo ( tigo ) kaj kurbiĝas malantaŭen al la pinto,
// kun larĝa, plena klingo ( kiel laktuko aŭ brasiko ) kaj glataj randoj.
// La bazo estas ĉe y=0. La kurbeco estas integrita laŭ la longeco
// vico post vico, do la arka longeco restas egala al la origina longeco —
// neniu streĉo ĉe la pinto.
//     @param kurbeco ( number ) - Kiom la folio kurbiĝas al la pinto.
//     @param largxeco ( number ) - La largxa faktoro de la klingo.
//     @param dikeco ( number ) - La reala tri-dimensia diko de la klingo.
//     @returns geometrio ( THREE.BufferGeometry ) - La kurba folio.
function konstruiKurbanLaktukanFolion( kurbeco = 2, largxeco = 6/5, dikeco = 3/32 ): THREE.BufferGeometry {
  // Pli longa klingo — la folioj branĉiĝas pli eksteren.
  const longo = 5/2;
  const segmentoj = 0o14;
  const largxoj = 7;
  const geometrio = new THREE.PlaneGeometry( largxeco, longo, largxoj, segmentoj );
  const pozicioj = geometrio.attributes.position;
  const vicoj = segmentoj + 1;
  const paso = longo / segmentoj;
  // Integrita kurbeco — ĉiu vico faldiĝas je la kreskanta angulo: akumulu
  // la tangentajn ( cos, sin ) paŝojn anstataŭ turni la tutan longon.
  const vicoY = new Float32Array( vicoj );
  const vicoZ = new Float32Array( vicoj );
  const suboj = 0o10;
  for ( let j = 1; j < vicoj; j++ ) {
    const s0 = ( j - 1 ) * paso;
    const s1 = j * paso;
    let dy = 0, dz = 0;
    for ( let k = 1; k <= suboj; k++ ) {
      const u = s0 + ( s1 - s0 ) * ( k - 1/2 ) / suboj;
      const angulo = Math.pow( u / longo, 2 ) * kurbeco;
      dy += Math.cos( angulo ) * paso / suboj;
      dz += Math.sin( angulo ) * paso / suboj;
    }
    vicoY[j] = vicoY[j - 1] + dy;
    vicoZ[j] = vicoZ[j - 1] + dz;
  }
  for ( let i = 0; i < pozicioj.count; i++ ) {
    const x = pozicioj.getX( i );
    const y = pozicioj.getY( i );
    const j = Math.round( ( ( y + longo / 2 ) / longo ) * segmentoj );
    const t = j / segmentoj;
    // La profilo estas glata elipso — mallarĝa ĉe la bazo kaj pinto, plej
    // larĝa meze — do la flankoj ne pikas. Eta baza amplekso tenas la folion
    // sur la trunko, kiel etendo de la ŝeloj.
    const profilo = Math.sin( Math.PI * t ) + 1/8 * Math.pow( 1 - t, 4 );
    const novaX = x * profilo;
    pozicioj.setXYZ( i, novaX, vicoY[j], vicoZ[j] );
  }
    geometrio.computeVertexNormals();
    // Du tavoloj laŭ la normaloj donas la folion realan dikon — la rando
    // montras la interspacon, do la klingo aspektas dika kaj karna.
    const dorso = geometrio.clone();
    const normoj = geometrio.attributes.normal;
    const dorsoNormoj = dorso.attributes.normal;
    const frontoPozicioj = geometrio.attributes.position;
    const dorsoPozicioj = dorso.attributes.position;
    for ( let i = 0; i < frontoPozicioj.count; i++ ) {
      const nx = normoj.getX( i ) * dikeco / 2;
      const ny = normoj.getY( i ) * dikeco / 2;
      const nz = normoj.getZ( i ) * dikeco / 2;
      frontoPozicioj.setXYZ( i, frontoPozicioj.getX( i ) + nx, frontoPozicioj.getY( i ) + ny, frontoPozicioj.getZ( i ) + nz );
      dorsoPozicioj.setXYZ( i, dorsoPozicioj.getX( i ) - nx, dorsoPozicioj.getY( i ) - ny, dorsoPozicioj.getZ( i ) - nz );
      // La dorsa tavolo rigardas malsupren — turnu ĝiajn normojn, por ke
      // la suba flanko lumiĝu ĝuste ankaŭ sen DoubleSide.
      dorsoNormoj.setXYZ( i, -normoj.getX( i ), -normoj.getY( i ), -normoj.getZ( i ) );
    }
    return kunfandiDuGeometriojn( geometrio, dorso );
  }

// kreiKlinoQuaternionon — Klinu arbon hazarde por rompi la vertikalan silueton.
// Unue turnu ĝin ĉirkaŭ la vertikalo ( yaw ), poste klinu laŭ hazarda direkto.
// La klina angulo varias de 0 ĝis plenaKlinangulo, ĉar la hazarda faktoro
// havas gamon de −4/8 ĝis +4/8.
//     @param hazardaGenerilo ( funkcio ) - Hazarda nombra generilo.
//     @param plenaKlinangulo ( number ) - Maksimuma klina angulo en radianoj.
//     @param yaw ( number ) - Turniĝo ĉirkaŭ la vertikalo.
//     @returns kvaropo ( THREE.Quaternion ) - La kombinita klino.
function kreiKlinoQuaternionon( hazardaGenerilo: () => number, plenaKlinangulo: number, yaw: number ): THREE.Quaternion {
  const turno = new THREE.Quaternion().setFromEuler( new THREE.Euler( 0, yaw, 0 ) );
  const direkto = hazardaGenerilo() * Math.PI * 2;
  const angulo = ( hazardaGenerilo() - 4/8 ) * plenaKlinangulo;
  const klino = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3( Math.sin( direkto ), 0, Math.cos( direkto ) ), angulo );
  return klino.multiply( turno );
}

// kreiPoziciilon — Kreu funkcion kiu turnas lokan punkton per la klino kaj
// aldonas la bazon, por ke krono-buleoj restu sur la klinita trunko.
//     @param bazo ( THREE.Vector3 ) - La trunka bazo sur la grundo.
//     @param Q ( THREE.Quaternion ) - La trunka klino.
//     @returns pozicio ( funkcio ) - Lokalo al mondo.
function kreiPoziciilon( bazo: THREE.Vector3, Q: THREE.Quaternion ): ( lokala: THREE.Vector3 ) => THREE.Vector3 {
  return ( lokala ) => bazo.clone().add( lokala.clone().applyQuaternion( Q ) );
}

// hazardaKoloro — Elektu hazardan koloron el paletro kun eta hela variado.
//     @param hazardaGenerilo ( funkcio ) - Hazarda nombra generilo.
//     @param koloro ( THREE.Color ) - Reuzebla koloro por la eligo.
//     @param paletro ( number[] ) - Koloroj por la foliaro.
//     @returns koloro ( THREE.Color ) - La elektita koloro.
function hazardaKoloro( hazardaGenerilo: () => number, koloro: THREE.Color, paletro: number[] ): THREE.Color {
  koloro.setHex( paletro[ ( hazardaGenerilo() * paletro.length ) | 0 ] );
  koloro.offsetHSL( 0, 0, ( hazardaGenerilo() - 4/8 ) * 1/8 );
  return koloro;
}

function mulberry32(semo: number): () => number {
  let a = semo >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x682878F5) | 0;
    let t = Math.imul(a ^ (a >>> 0o17), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 0o75 | t)) ^ t;
    return ((t ^ (t >>> 0o16)) >>> 0) / 4294967296;
  };
}

function kunfandiDuGeometriojn(a: THREE.BufferGeometry, b: THREE.BufferGeometry): THREE.BufferGeometry {
  // Ne-indeksaj geometrioj konservas la triangulan ordon dum kunfando;
  // alie la indekso perdiĝas kaj duono de ĉiu ebeno neniam bildiĝas.
  const na = a.index ? a.toNonIndexed() : a;
  const nb = b.index ? b.toNonIndexed() : b;
  const aPos = na.getAttribute("position");
  const bPos = nb.getAttribute("position");
  const aCount = aPos.count;
  const bCount = bPos.count;
  const tuto = aCount + bCount;

  const pozicio = new Float32Array(tuto * 3);
  const normo = new Float32Array(tuto * 3);
  const uv = new Float32Array(tuto * 2);

  pozicio.set(aPos.array as Float32Array, 0);
  pozicio.set(bPos.array as Float32Array, aCount * 3);

  const aNorm = na.getAttribute("normal");
  const bNorm = nb.getAttribute("normal");
  if (aNorm) normo.set(aNorm.array as Float32Array, 0);
  if (bNorm) normo.set(bNorm.array as Float32Array, aCount * 3);

  const aUV = na.getAttribute("uv");
  const bUV = nb.getAttribute("uv");
  if (aUV) uv.set(aUV.array as Float32Array, 0);
  if (bUV) uv.set(bUV.array as Float32Array, aCount * 2);

  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return out;
}
