// Vegetajxa modulo — betuloj, filikoj, likenoj por la nebula arbara medio
import * as THREE from "three";
import { kreiSxelanTeksajxon, kreiFilikanTeksajxon, kreiPurpuranFilikanTeksajxon, kreiHerbErinanTeksajxon } from "./teksajxoj.js";

const hazard = (a: number, b: number): number => a + Math.random() * (b - a);

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
  excludeRivers: (x: number, z: number) => boolean
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

    if (excludeRivers(x, z) || Math.hypot(x, z) < 0o16) continue;

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
  const kronajGeometrioj = specoj.map( speco => konstruiFrondanKronon( speco.nombro, speco.kronaLargho, speco.kronaAlto, speco.mallevo ));
  const kronajAltoj = kronajGeometrioj.map( geometrio => {
    geometrio.computeBoundingBox();
    return geometrio.boundingBox!.max.y - geometrio.boundingBox!.min.y;
  });
  const trunkajGeometrioj = specoj.map( speco => new THREE.CylinderGeometry( 3/16, 5/16, speco.trunkaAlto, 7 ));
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

    const specoIndico = ( indicoj.reduce( ( a, b ) => a + b, 0 ) ) % specoj.length;
    const speco = specoj[specoIndico];
    const kronaAlto = kronajAltoj[specoIndico];
    const skalo = 6/8 + hazardaGenerilo() * 6/8;
    E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
    Q.setFromEuler( E );
    const y = heightFn( x, z );
    // La translokigoj devas inkluzivi la saman specimenan skalon kiel la geometrio.
    // Alie la trunko malleviĝas kaj la krono flosas super ĝi ĉe malgrandaj skaloj.
    const trunkaCentroY = y + speco.trunkaAlto * skalo / 2;
    const kronaCentroY = y + skalo * ( speco.trunkaAlto + kronaAlto / 2 - 1/8 );
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

function konstruiFrondanKronon( nombro: number, largho: number, alto: number, mallevo: number ): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  for ( let i = 0; i < nombro; i++ ) {
    // Konstruu cxiu frondon cxirkaux la bazo; tiel la bazo restas sur la grundo
    // kaj la rotacio ne tiras la teksturon en oblikvan, distorditan formon.
    const frondo = new THREE.PlaneGeometry( largho, alto ).translate( 0, alto / 2, 0 ).toNonIndexed();
    const transformo = new THREE.Matrix4().makeRotationY( i / nombro * Math.PI * 2 );
    transformo.multiply( new THREE.Matrix4().makeRotationX( mallevo ));
    frondo.applyMatrix4( transformo );
    partoj.push( frondo );
  }
  const geometrio = kunfandiGeometriojn( partoj );
  geometrio.computeBoundingBox();
  if ( geometrio.boundingBox ) geometrio.translate( 0, -geometrio.boundingBox.min.y, 0 );
  return geometrio;
}

// konstruiLikenSxtonojn — Metu liken-kovritajn sxtonojn en la arbaron.
export function konstruiLikenSxtonojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: (x: number, z: number) => number,
  excludeRivers: (x: number, z: number) => boolean
): void {
  const hazardaGenerilo = mulberry32(99221);
  const sxtonaGeometrio = new THREE.IcosahedronGeometry(1, 0);
  const sxtonoj = new THREE.InstancedMesh(sxtonaGeometrio, new THREE.MeshStandardMaterial({ roughness: 61/64, color: 0x687870 }), kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();

  for ( let i = 0; i < kvanto; i++ ) {
    let x: number, z: number;
    const a = hazardaGenerilo() * Math.PI * 2;
    const hazardaRadiuso = 0o22 + hazardaGenerilo() * 0o156;
    x = Math.sin(a) * hazardaRadiuso;
    z = Math.cos(a) * hazardaRadiuso;
    if (excludeRivers(x, z)) { i--; continue; }

    const skaloY = 4/8 + hazardaGenerilo() * 4/8;
    E.set(hazardaGenerilo() * 13/32, hazardaGenerilo() * Math.PI * 2, hazardaGenerilo() * 13/32);
    Q.setFromEuler(E);
    M.compose( new THREE.Vector3(x, heightFn(x, z) + skaloY * 19/64, z),
      Q,
      new THREE.Vector3(skaloY, skaloY, skaloY) );
    sxtonoj.setMatrixAt(i, M);
  }

  sxtonoj.instanceMatrix.needsUpdate = true;
  sxtonoj.castShadow = true;
  sceno.add(sxtonoj);
}

// konstruiLarikon — Konstruu instancigitajn larikojn ( konusaj kronoj ) en la sceno.
//     @param arboj ( ArboMetado[] ) - La metitaj arboj.
//     @param kolorPaletro ( number[] ) - Koloroj por la kronoj.
export function konstruiLarikon( sceno: THREE.Scene,
  arboj: ArboMetado[]
): void {
  if (arboj.length === 0) return;

  const hazardaGenerilo = mulberry32(33718);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const trunkaGeometrio = new THREE.CylinderGeometry( 7/32, 3/8, 1, 7, 1 );
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, roughness: 45/64 });
  const trunkoj = new THREE.InstancedMesh( trunkaGeometrio, trunkaMaterialo, arboj.length );

  const kronaGeometrio = new THREE.ConeGeometry( 1, 1, 7, 1 );
  const kronaMaterialo = new THREE.MeshStandardMaterial({ roughness: 29/32 });
  const kronoj = new THREE.InstancedMesh( kronaGeometrio, kronaMaterialo, arboj.length * 2 );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x587848, 0x687058, 0x788868, 0x889878, 0x689058 ];

  arboj.forEach(( t, i ) => {
    const h = 48/8 + t.s * 32/8;
    E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
    Q.setFromEuler( E );
    M.compose( new THREE.Vector3( t.x, t.h + h / 2, t.z ), Q, new THREE.Vector3( 1, h, 1 ));
    trunkoj.setMatrixAt( i, M );

      const kronoAlto = 20/8 * t.s + 6/8;
    const kronoRadiuso = 9/8 * t.s + 4/8;
    // La konusa krono komencu ĉe la supro de la trunko, ne ene de ĝi.
    M.compose( new THREE.Vector3( t.x, t.h + h + kronoAlto / 2, t.z ),
      Q,
      new THREE.Vector3( kronoRadiuso, kronoAlto, kronoRadiuso ));
    kronoj.setMatrixAt( i * 2, M );
    kronoj.setColorAt( i * 2, C.setHex( paletro[( hazardaGenerilo() * paletro.length ) | 0] ));

    const duaKronoAlto = kronoAlto * 4/8;
    M.compose( new THREE.Vector3( t.x + kronoRadiuso * 17/64, t.h + h + kronoAlto + 4/8 + duaKronoAlto / 2, t.z + kronoRadiuso * 11/64 ),
      Q,
      new THREE.Vector3( kronoRadiuso * 17/32, duaKronoAlto, kronoRadiuso * 17/32 ));
    kronoj.setMatrixAt( i * 2 + 1, M );
    kronoj.setColorAt( i * 2 + 1, C.setHex( paletro[( hazardaGenerilo() * paletro.length ) | 0] ));
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  kronoj.instanceMatrix.needsUpdate = true;
  if ( kronoj.instanceColor ) kronoj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = kronoj.castShadow = true;
  sceno.add( trunkoj, kronoj );
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
  excludeRivers: ( x: number, z: number ) => boolean
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
    if ( excludeRivers( x, z )) continue;
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

// konstruiFungojn — Metu instancigitajn fungoxn ( amanitoj ) en la arbaron.
export function konstruiFungojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean
): void {
  const hazardaGenerilo = mulberry32(88417);

  const tigoGeometrio = new THREE.CylinderGeometry( 2/16, 3/16, 1, 6, 1 );
  const tigoMaterialo = new THREE.MeshStandardMaterial({ roughness: 7/8, color: 0xe8e0d8 });
  const tigoj = new THREE.InstancedMesh( tigoGeometrio, tigoMaterialo, kvanto );

  const cxapoGeometrio = new THREE.ConeGeometry( 1, 1, 7, 1 );
  const cxapoMaterialo = new THREE.MeshStandardMaterial({ roughness: 6/8, color: 0xd84838 });
  const cxapoj = new THREE.InstancedMesh( cxapoGeometrio, cxapoMaterialo, kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  let fi = 0;
  let gardilo = 0;

  while ( fi < kvanto && gardilo++ < 0o3720 ) {
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
    if ( excludeRivers( x, z )) continue;
    if ( Math.hypot( x, z ) < 0o20 ) continue;

    const skalo = 4/8 + hazardaGenerilo() * 6/8;
    const tigoAlto = skalo * 6/8;
    // Tigo
    M.compose( new THREE.Vector3( x, heightFn( x, z ) + tigoAlto / 2, z ),
      Q.identity(),
      new THREE.Vector3( 1, tigoAlto, 1 ));
    tigoj.setMatrixAt( fi, M );
    // Cxapo
    const cxapoAlto = skalo * 5/8;
    M.compose( new THREE.Vector3( x, heightFn( x, z ) + tigoAlto + cxapoAlto / 2, z ),
      Q.identity(),
      new THREE.Vector3( skalo * 6/8, cxapoAlto, skalo * 6/8 ));
    cxapoj.setMatrixAt( fi, M );
    fi++;
  }

  tigoj.count = fi;
  cxapoj.count = fi;
  tigoj.instanceMatrix.needsUpdate = true;
  cxapoj.instanceMatrix.needsUpdate = true;
  sceno.add( tigoj, cxapoj );
}

// konstruiFalintajnTrunkojn — Metu falintajn arbtrunkojn en la arbaron.
export function konstruiFalintajnTrunkojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean
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
    if ( excludeRivers( x, z )) continue;
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
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean
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
    if ( excludeBuildings( x, z, 3 )) continue;
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

function kunfandiTriGeometriojn( a: THREE.BufferGeometry, b: THREE.BufferGeometry, c: THREE.BufferGeometry ): THREE.BufferGeometry {
  return kunfandiDuGeometriojn( kunfandiDuGeometriojn( a, b ), c );
}

function kunfandiDuGeometriojn(a: THREE.BufferGeometry, b: THREE.BufferGeometry): THREE.BufferGeometry {
  const aPos = a.getAttribute("position");
  const bPos = b.getAttribute("position");
  const aCount = aPos.count;
  const bCount = bPos.count;
  const tuto = aCount + bCount;

  const pozicio = new Float32Array(tuto * 3);
  const normo = new Float32Array(tuto * 3);
  const uv = new Float32Array(tuto * 2);

  pozicio.set(aPos.array as Float32Array, 0);
  pozicio.set(bPos.array as Float32Array, aCount * 3);

  const aNorm = a.getAttribute("normal");
  const bNorm = b.getAttribute("normal");
  if (aNorm) normo.set(aNorm.array as Float32Array, 0);
  if (bNorm) normo.set(bNorm.array as Float32Array, aCount * 3);

  const aUV = a.getAttribute("uv");
  const bUV = b.getAttribute("uv");
  if (aUV) uv.set(aUV.array as Float32Array, 0);
  if (bUV) uv.set(bUV.array as Float32Array, aCount * 2);

  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return out;
}
