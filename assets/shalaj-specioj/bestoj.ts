// Besta modulo — ktenoforoj ( kombuloj ), glacifisoj kaj marlaraksxoj por la rivero
// Travideblaj, biolumineskaj ĝelatenaj bestoj kun ok irizaj kombovicoj,
// preskaŭ travideblaj fiŝoj kaj etaj longkruraj marbestoj.
//  · Beroe — longforma ovalo kun granda buŝo ĉe la supro.
//  · Mnemiopsis ( marmukso ) — pli ronda korpo kun kvar loboj ĉe la buŝo.
//  · Pleŭrobrakia ( margrozberujo ) — malgranda ronda korpo kun du longaj palpoj.
//  · Glacifiso ( Channichthyidae ) — travidebla fiŝo kun vosta, dorsa kaj
//    brustaj naĝiloj; ĝi naĝas per vosta batado.
//  · Marlaraksxo ( Pycnogonida ) — eta korpo kun ok longegaj kruroj, marŝanta
//    sur la riverfundo.
// Ili drivas laŭ la riverfluo kaj naĝas per pulsoj ( vidu gxisdatigiBestojn ).
//
// La specoj estas konstruitaj kiel malnetoj ( geometrioj/materialoj unufoje ),
// kaj ĉiu besto estas klono de sia malneto — la klonoj kunhavas la samajn
// geometriojn kaj materialojn, do la bestoj ne kostas teksturojn po unu.
import * as THREE from "three";

export interface Besto {
  grupo: THREE.Group;
  korpo: THREE.Mesh;
  vosto?: THREE.Object3D;  // vosta naĝilo ( glacifiso ) — batas dum naĝado
  animajxoj: THREE.Object3D[]; // specio-specifaj movaj partoj ( palpoj, loboj, kruroj )
  bazajKruroj: Array<{ kruro: THREE.Object3D; q: THREE.Quaternion; ankro: THREE.Vector3 }>;
  x: number;           // baza x — laŭ la rivero aŭ en la lago
  zOfseto: number;     // laterala forpreno de la rivercentro
  cz: number;          // baza z — en la lago la besto restas ĉe sia propra centro
  enLago: boolean;     // ĉu la besto naĝas en la lago ( anstataŭ la rivero )
  bazaY: number;       // negativa kroma alteco — korpocentro sub la akvosurfaco
  direkto: number;     // baza kapo-direkto ( jaro )
  phase: number;
  amplitudo: number;   // oscila intervalo laŭ la rivero
  rapido: number;      // naĝa rapido ( oscilfrekvenco )
  speco: string;       // speco-specifa animacio
}

export interface BestoSistemo {
  bestoj: Besto[];
  riverFn: (x: number) => number;
  akvoYFn: (x: number) => number;
  lago?: { x: number; z: number; r: number; nivelo: number };
}

// kreiKombovicanTeksajxon — Procedura teksajxo kun vertikalaj strioj ĉirkaŭ
// la korpo ( la kombovicoj ). Malhela fono, blankecaj strioj kun molaj randoj.
// La sama teksajxo funkcias kiel irideseca kaj emisia mapo — la strioj brilas
// kaj refraktas lumon en ĉielarkajn kolorojn, dum la resto restas travidebla.
function kreiKombovicanTeksajxon( strioj = 0o10 ): THREE.CanvasTexture {
  const s = 0o200; // 128
  const kanvasa = document.createElement( "canvas" );
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext( "2d" )!;
  kunteksto.clearRect( 0, 0, s, s );
  // Malhela fono — nenia iridesco/emisio ekster la strioj.
  kunteksto.fillStyle = "rgb(6,10,16)";
  kunteksto.fillRect( 0, 0, s, s );

  const strioLargho = s / strioj;
  for ( let k = 0; k < strioj; k++ ) {
    const cx = ( k + 0o1/0o2 ) * strioLargho;
    const r = strioLargho * 0o23/0o100;
    const gradiento = kunteksto.createLinearGradient( cx - r, 0, cx + r, 0 );
    // Alterna brilo — la ok vicoj ne estas tute identaj en naturo.
    const helo = 0o3/0o4 + ( k % 0o2 ) * 0o15/0o100;
    gradiento.addColorStop( 0, "rgba(255,255,255,0)" );
    gradiento.addColorStop( 0o1/0o2, "rgba(235,245,255," + helo + ")" );
    gradiento.addColorStop( 1, "rgba(255,255,255,0)" );
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect( cx - r, 0, r * 0o2, s );
  }

  const teksajxo = new THREE.CanvasTexture( kanvasa );
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiKorpon — Lathe-korpo kun kombovicoj bakitaj en la UV-mapoj ( la
// strioj ĉirkaŭvolvas la korpon laŭlonge — ok kombovicoj ĉe ĉiu speco ).
function kreiKorpon( teksajxo: THREE.CanvasTexture, profilo: [number, number][],
  koloro: number, emisio: number ): THREE.Mesh {
  const punktoj = profilo.map( ( [ r, y ] ) => new THREE.Vector2( r, y ) );
  const geometrio = new THREE.LatheGeometry( punktoj, 0o20 );
  const materialo = new THREE.MeshPhysicalMaterial({
    color: koloro,
    transparent: true,
    opacity: 0o3/0o10,
    depthWrite: false,
    roughness: 0o1/0o10,
    metalness: 0,
    iridescence: 1,
    iridescenceIOR: 0o25/0o20,
    iridescenceMap: teksajxo,
    emissive: emisio,
    emissiveMap: teksajxo,
    emissiveIntensity: 0o7/0o10,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh( geometrio, materialo );
}

interface SpecoMalneto {
  malneto: THREE.Group;
  platigxo: THREE.Vector3;
  supro: number;   // korpa supro super la grupo-origino ( × grandeco )
  speco: string;
  mergo?: number;  // kroma subakvigo por fundaj bestoj ( pozitiva = pli profunde )
}

// konstruiBeroanMalneton — Beroe. Longforma ovalo, ok kombovicoj, granda buŝo
// ĉe la supro ( malhela faringo videbla tra la travidebla korpo ), platigita.
function konstruiBeroanMalneton( teksajxo: THREE.CanvasTexture ): SpecoMalneto {
  const grupo = new THREE.Group();
  const profilo: [number, number][] = [
    [ 0o1/0o100, -0o43/0o40 ], [ 0o7/0o40, -0o75/0o100 ], [ 0o33/0o100, -0o55/0o100 ], [ 0o11/0o20, -0o13/0o40 ],
    [ 0o23/0o40, 0 ], [ 0o45/0o100, 0o13/0o40 ], [ 0o1/0o2, 0o55/0o100 ], [ 0o33/0o100, 0o75/0o100 ], [ 0o35/0o100, 0o43/0o40 ],
  ];
  const korpo = kreiKorpon( teksajxo, profilo, 0xe8d8e0, 0x285078 );
  korpo.name = "korpo";
  grupo.add( korpo );

  // Faringo — malhela buŝa tubo en la supra duono; restas ene de la korpo.
  const faringo = new THREE.Mesh(
    new THREE.CylinderGeometry( 0o7/0o100, 0o7/0o100, 0o1/0o2, 0o10 ).translate( 0, 0o1/0o4, 0 ),
    new THREE.MeshPhysicalMaterial({
      color: 0x986080, transparent: true, opacity: 0o5/0o20, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x402040, emissiveIntensity: 0o1/0o4,
    })
  );
  faringo.name = "faringo";
  faringo.position.y = 0o5/0o10;
  grupo.add( faringo );

  return { malneto: grupo, platigxo: new THREE.Vector3( 0o1, 0o1, 0o63/0o100 ), supro: 0o43/0o40, speco: "beroe" };
}

// konstruiMnemiopsanMalneton — Mnemiopsis. Pli ronda korpo kun kvar buŝaj loboj.
function konstruiMnemiopsanMalneton( teksajxo: THREE.CanvasTexture ): SpecoMalneto {
  const grupo = new THREE.Group();
  const profilo: [number, number][] = [
    [ 0o1/0o100, -0o1 ], [ 0o23/0o100, -0o33/0o40 ], [ 0o45/0o100, -0o23/0o40 ], [ 0o57/0o100, -0o1/0o4 ],
    [ 0o31/0o40, 0 ], [ 0o57/0o100, 0o1/0o4 ], [ 0o5/0o10, 0o43/0o100 ], [ 0o7/0o20, 0o63/0o100 ],
    [ 0o23/0o100, 0o75/0o100 ], [ 0o21/0o100, 0o1 ],
  ];
  const korpo = kreiKorpon( teksajxo, profilo, 0xd8e8f0, 0x285878 );
  korpo.name = "korpo";
  grupo.add( korpo );

  const lobaMaterialo = new THREE.MeshPhysicalMaterial({
    color: 0xd0e8f8, transparent: true, opacity: 0o5/0o20, depthWrite: false,
    roughness: 0o1/0o4, emissive: 0x285878, emissiveIntensity: 0o3/0o10, side: THREE.DoubleSide,
  });
  for ( let k = 0; k < 0o4; k++ ) {
    const a = k / 0o4 * Math.PI * 0o2 + Math.PI / 0o4;
    const lobo = new THREE.Mesh( new THREE.BoxGeometry( 0o3/0o20, 0o3/0o20, 0o6/0o20 ), lobaMaterialo );
    lobo.name = "lobo";
    lobo.position.set( Math.sin( a ) * 0o41/0o100, -0o55/0o100, Math.cos( a ) * 0o41/0o100 );
    lobo.rotation.y = a;
    grupo.add( lobo );
  }

  return { malneto: grupo, platigxo: new THREE.Vector3( 0o1, 0o1, 0o1 ), supro: 0o43/0o40, speco: "mnemiopsis" };
}

// konstruiPleŭrobrakianMalneton — Pleŭrobrakia. Malgranda ronda korpo, du
// longaj sinuaj palpoj pendantaj malsupren.
function konstruiPleŭrobrakianMalneton( teksajxo: THREE.CanvasTexture ): SpecoMalneto {
  const grupo = new THREE.Group();
  const profilo: [number, number][] = [
    [ 0o1/0o100, -0o1 ], [ 0o33/0o100, -0o63/0o100 ], [ 0o55/0o100, -0o35/0o100 ], [ 0o31/0o40, 0 ],
    [ 0o55/0o100, 0o35/0o100 ], [ 0o37/0o100, 0o63/0o100 ], [ 0o5/0o20, 0o75/0o100 ], [ 0o11/0o40, 0o1 ],
  ];
  const korpo = kreiKorpon( teksajxo, profilo, 0xd8f0e8, 0x286858 );
  korpo.name = "korpo";
  grupo.add( korpo );

  const palpaMaterialo = new THREE.MeshPhysicalMaterial({
    color: 0xc8e8e0, transparent: true, opacity: 0o1/0o2, depthWrite: false,
    roughness: 0o1/0o4, emissive: 0x288878, emissiveIntensity: 0o1/0o2, side: THREE.DoubleSide,
  });
  for ( const s of [ 0o1, -0o1 ] ) {
    const punktoj: THREE.Vector3[] = [];
    for ( let i = 0; i <= 0o10; i++ ) {
      const t = i / 0o10;
      punktoj.push( new THREE.Vector3(
        s * 0o3/0o20,
        -0o1 - t * 0o123/0o40,
        Math.sin( t * Math.PI * 0o2 + s ) * 0o1/0o10
      ) );
    }
    const kurbo = new THREE.CatmullRomCurve3( punktoj );
    const palpo = new THREE.Mesh( new THREE.TubeGeometry( kurbo, 0o10, 0o3/0o100, 0o6 ), palpaMaterialo );
    palpo.name = "palpo";
    grupo.add( palpo );
  }

  return { malneto: grupo, platigxo: new THREE.Vector3( 0o1, 0o1, 0o1 ), supro: 0o43/0o40, speco: "pleurobrakia" };
}

// konstruiGlacifisanMalneton — Glacifiso ( Channichthyidae ). Preskaŭ
// travidebla fiŝo — la antarktaj glacifisoj ne havas hemoglobinon, do ilia
// korpo estas senkolora. Longforma lathe-korpo, granda forkoforma vosta
// naĝilo, malgranda dorsa naĝilo kaj du brustaj naĝiloj.
function konstruiGlacifisanMalneton(): SpecoMalneto {
  const grupo = new THREE.Group();
  const profilo: [number, number][] = [
    [ 0o1/0o100, -0o1 ], [ 0o7/0o40, -0o3/0o4 ], [ 0o13/0o40, -0o1/0o2 ], [ 0o15/0o40, -0o1/0o4 ],
    [ 0o33/0o100, 0 ], [ 0o31/0o100, 0o1/0o4 ], [ 0o5/0o20, 0o1/0o2 ], [ 0o3/0o20, 0o3/0o4 ], [ 0o1/0o40, 0o1 ],
  ];
  const punktoj = profilo.map( ( [ r, y ] ) => new THREE.Vector2( r, y ) );
  const geometrio = new THREE.LatheGeometry( punktoj, 0o20 );
  // Turnu la korpon horizontale — la nazo ( supro de la profilo ) rigardu +z.
  geometrio.rotateX( Math.PI / 0o2 );
  const korpaMaterialo = new THREE.MeshPhysicalMaterial({
    color: 0xd0e8e8,
    transparent: true,
    opacity: 0o7/0o20,
    depthWrite: false,
    roughness: 0o1/0o4,
    iridescence: 0o3/0o10,
    iridescenceIOR: 0o25/0o20,
    emissive: 0x304850,
    emissiveIntensity: 0o1/0o4,
    side: THREE.DoubleSide,
  });
  const korpo = new THREE.Mesh( geometrio, korpaMaterialo );
  korpo.name = "korpo";
  grupo.add( korpo );

  const naĝilaMaterialo = new THREE.MeshStandardMaterial({
    color: 0xb8d8e8, transparent: true, opacity: 0o3/0o10,
    depthWrite: false, side: THREE.DoubleSide, roughness: 0o1/0o2,
  });
  // Vosta naĝilo — forkoforma ebeno staranta vertikale ĉe la vosto.
  const formo = new THREE.Shape();
  formo.moveTo( 0, 0o5/0o20 );
  formo.lineTo( 0o3/0o20, 0 );
  formo.lineTo( 0, -0o5/0o20 );
  formo.lineTo( -0o3/0o20, 0 );
  formo.closePath();
  const vosto = new THREE.Mesh( new THREE.ShapeGeometry( formo ), naĝilaMaterialo );
  vosto.name = "vosto";
  vosto.position.z = -0o1 - 0o1/0o20;
  grupo.add( vosto );

  // Dorsa naĝilo — malgranda vertikala ebeno sur la dorso.
  const dorsa = new THREE.Mesh( new THREE.PlaneGeometry( 0o5/0o20, 0o5/0o40 ), naĝilaMaterialo );
  dorsa.name = "dorsa";
  dorsa.position.set( 0, 0o33/0o100, -0o1/0o4 );
  dorsa.rotation.z = 0o1/0o10;
  grupo.add( dorsa );

  // Brustaj naĝiloj — du flankaj ebenoj, iomete svingantaj malantaŭen.
  for ( const s of [ 0o1, -0o1 ] ) {
    const brusta = new THREE.Mesh( new THREE.PlaneGeometry( 0o5/0o20, 0o3/0o20 ), naĝilaMaterialo );
    brusta.name = "brusta";
    brusta.position.set( s * 0o11/0o40, -0o1/0o20, 0o3/0o20 );
    brusta.rotation.y = s * Math.PI / 0o2 + 0o1/0o10 * s;
    brusta.rotation.x = -0o1/0o10;
    grupo.add( brusta );
  }

  return { malneto: grupo, platigxo: new THREE.Vector3( 0o3/0o4, 0o1, 0o1 ), supro: 0o33/0o100, speco: "glacifiso" };
}

// konstruiMarlaraksxanMalneton — Marlaraksxo ( Pycnogonida ). Eta korpo kun
// ok longegaj, maldikaj kruroj ( kvar paroj ) kaj malgranda rostro. Ili
// marŝas sur la riverfundo ( mergo metas ilin profunde sub la surfacon ).
function konstruiMarlaraksxanMalneton(): SpecoMalneto {
  const grupo = new THREE.Group();
  const korpaMaterialo = new THREE.MeshStandardMaterial({
    color: 0xc8b090, transparent: true, opacity: 0o3/0o4,
    depthWrite: false, side: THREE.DoubleSide, roughness: 0o1/0o2,
  });
  // Eta korpo — malgranda sfero.
  const korpo = new THREE.Mesh( new THREE.SphereGeometry( 0o1/0o10, 0o10, 0o6 ), korpaMaterialo );
  korpo.name = "korpo";
  grupo.add( korpo );

  // Rostro — eta tubo antaŭen.
  const rostro = new THREE.Mesh( new THREE.CylinderGeometry( 0o1/0o100, 0o1/0o100, 0o3/0o20, 0o6 ), korpaMaterialo );
  rostro.rotation.x = Math.PI / 0o2;
  rostro.position.z = 0o3/0o40;
  grupo.add( rostro );

  // Ok kruroj — longegaj maldikaj cilindroj, sternitaj eksteren-malsupren.
  // Ĉiu paro havas ankaŭ antaŭen/malantaŭen disvastigon laŭ la korpo ( kiel
  // vera marlaraksxo ), kaj ĉiu kruro elkreskas el la korposurfaco — la
  // ankro sidas sur la sfero ( 0o1/0o10 ), ne for de ĝi.
  // La antaŭa harfina maldikeco ( 0.01 ) malaperis en la akva profundo.
  // Pli dikaj, kontrastaj kruroj restas legeblaj sen pligrandigi la korpon.
  const kruraGeometrio = new THREE.CylinderGeometry( 0o2/0o100, 0o2/0o100, 1, 0o10 );
  const kruraMaterialo = new THREE.MeshStandardMaterial({
    color: 0xd4b58f, transparent: false, opacity: 1,
    // La akvo ne skribas profundon ( depthWrite false en akvo.ts ), do la
    // kruroj restas videblaj tra la travidebla akvo — sed konstruaĵoj ( kiuj
    // skribas profundon ) nun ĝuste kovras ilin, anstataŭ lasi ilin brili tra
    // la muroj ( tio okazis kiam depthTest estis malŝaltita ).
    depthWrite: true, depthTest: true, side: THREE.DoubleSide,
    roughness: 0o1/0o2, emissive: 0x392418, emissiveIntensity: 0o1/0o10,
  });
  const supren = new THREE.Vector3( 0, 1, 0 );
  const direkto = new THREE.Vector3();
  for ( let k = 0; k < 0o4; k++ ) {
    // Kvar paroj laŭ la korpo — malantaŭen ĝis antaŭen ( ±z ).
    const zDisvastigo = ( k / 0o4 - 0o3/0o10 ) * 0o2;
    for ( const s of [ 0o1, -0o1 ] ) {
      // Direkto. Eksteren ( ±x ), malsupren, kaj antaŭe/malantaŭe laŭ la paro.
      direkto.set(
        s * Math.sin( 0o5/0o10 ),
        -Math.cos( 0o5/0o10 ),
        zDisvastigo
      ).normalize();
      const kruro = new THREE.Mesh( kruraGeometrio, kruraMaterialo );
      kruro.name = "kruro";
      kruro.scale.y = 0o3/0o2; // longa kruro
      kruro.renderOrder = 6;
      kruro.quaternion.setFromUnitVectors( supren, direkto );
      // La baza pozo estas konservata en la malneto; la efektiva klono ricevas
      // sian propran typed-kvaternionon en konstruiBestojn ( userData ne taŭgas
      // por THREE.Quaternion, ĉar Object3D.clone serialigas ĝin al JSON ).
      // Ankru la kruron sur la korposurfaco kaj etendu laŭ la direkto
      // ( la cilindro longas 0o3/0o2, do ĝi etendiĝas de 0o1/0o10 ĝis 0o15/0o10 ).
      kruro.position.copy( direkto ).multiplyScalar( 0o1/0o10 + 0o3/0o4 );
      grupo.add( kruro );
    }
  }

  return { malneto: grupo, platigxo: new THREE.Vector3( 0o1, 0o1, 0o1 ), supro: 0o1/0o10, speco: "marlaraksxo", mergo: 0o2 };
}

// konstruiBestojn — Metu la bestojn en la riveron. Hazardaj pozicioj laŭ la
// riverkurbiĝo, evitante la dokojn. Ili flosas ĉe la akvosurfaco ( aŭ marŝas
// pli profunde ) kaj naĝas per pulsoj ( vidu gxisdatigiBestojn ).
//     @param kvanto ( number ) - Kiom da bestoj.
//     @param riverFn ( funkcio ) - Rivercentra funkcio z(x).
//     @param akvoYFn ( funkcio ) - Akvosurfaca alta funkcio y(x).
//     @param duonaLargho ( number ) - Duon-larĝo de la rivero.
// Reuzataj matematikaj objektoj por la marŝa animacio — la kruroj ne
// bezonas krei novajn vektorojn aŭ kvaternionojn ĉikadre.
const kruroBataAkso = new THREE.Vector3( 0, 0, 1 );
const kruroLevaAkso = new THREE.Vector3( 1, 0, 0 );
const kruroBataKvaterniono = new THREE.Quaternion();
const kruroLevaKvaterniono = new THREE.Quaternion();
const kruroAnimKvaterniono = new THREE.Quaternion();
const kruroDirekto = new THREE.Vector3();
const kruroBazaDirekto = new THREE.Vector3( 0, 1, 0 );
const kruroDuonoLonga = 0o3/0o4;

export function konstruiBestojn( sceno: THREE.Scene,
  kvanto: number,
  riverFn: (x: number) => number,
  akvoYFn: (x: number) => number,
  duonaLargho: number,
  lago?: { x: number; z: number; r: number; nivelo: number }
): BestoSistemo {
  const bestoj: Besto[] = [];
  // Unu komuna kombovica teksajxo por la ktenoforoj ( la strioj estas la samaj ).
  const teksajxo = kreiKombovicanTeksajxon( 0o10 );
  const malnetoj = [
    konstruiBeroanMalneton( teksajxo ),
    konstruiMnemiopsanMalneton( teksajxo ),
    konstruiPleŭrobrakianMalneton( teksajxo ),
    konstruiGlacifisanMalneton(),
    konstruiMarlaraksxanMalneton(),
  ];

  // La tri dokoj — la bestoj evitas ilin por ne naĝi tra la platformoj. La
  // rando kovras ankaŭ la naĝan osciladon ( ±0o10 ), do la besto restas for.
  const DOKOJ_X = [ -0o52, 0, 0o52 ];
  const estasDoko = (x: number) => DOKOJ_X.some( d => Math.abs( x - d ) < 0o26 );

  for ( let i = 0; i < kvanto; i++ ) {
    // Triono de la bestoj naĝas en la lago ( se ĝi ekzistas ); la cetero laŭ
    // la rivero. La lagaj bestoj ricevas hazardan punkton en la disko kaj
    // restas ĉirkaŭ ĝi, anstataŭ sekvi la riverkurbon.
    const enLago = !!lago && Math.random() < 1/3;
    let x = 0, zOfseto = 0, cz = 0;
    if ( enLago ) {
      const ang = Math.random() * Math.PI * 0o2;
      const rr = lago.r * 0o6/0o10 * Math.sqrt( Math.random() );
      x = lago.x + Math.cos( ang ) * rr;
      cz = lago.z + Math.sin( ang ) * rr;
    } else {
      let provoj = 0;
      do {
        x = -0o200 + Math.random() * 0o400;
        provoj++;
      } while ( estasDoko( x ) && provoj < 0o100 );
      // La laterala limo 0o10 ( 8 ) superas la realan duon-larĝon 0o124/0o10 ×
      // 0o3/0o4 = 0o77/0o10, do ĝi neniam limigas la nunan riveron — ĝi nur
      // gardas kontraŭ pli larĝaj riveroj estonte.
      zOfseto = ( Math.random() - 0o1/0o2 ) * Math.min( 0o10, duonaLargho * 0o3/0o4 );
    }
    const speco = malnetoj[ ( Math.random() * malnetoj.length ) | 0 ];
    // Klono kunhavas la geometriojn/materialojn de la malneto.
    const grupo = speco.malneto.clone();
    const korpo = grupo.getObjectByName( "korpo" ) as THREE.Mesh;
    const vosto = grupo.getObjectByName( "vosto" ) as THREE.Object3D | undefined;
    const animajxoj = grupo.children.filter( c => c !== korpo && c !== vosto );
    const bazajKruroj = animajxoj
      .filter( parto => parto.name === "kruro" ).map( kruro => {
        // La cilindro estas centrita sur sia longo ( 1.5 unuoj post la
        // skalo ), do la vera artik-loko estas ĉe ĝia supra fino. Konservu
        // ĝin aparte por ke la piedo svingu sen ŝiriĝi for de la korpo.
        kruroBazaDirekto.set( 0, 1, 0 ).applyQuaternion( kruro.quaternion ).normalize();
        return {
          kruro,
          q: kruro.quaternion.clone(),
          ankro: kruro.position.clone().sub( kruroBazaDirekto.clone().multiplyScalar( kruroDuonoLonga ) ),
        };
      });
    const platigxo = speco.platigxo;
    const grandeco = 0o1/0o2 + Math.random() * 0o3/0o4;
    grupo.scale.set( grandeco * platigxo.x, grandeco * platigxo.y, grandeco * platigxo.z );
    // La grupo sidas tiel, ke la korpo estas plejparte subakva — nur la supro
    // restas ĉe la surfaclinio ( plus la mergo de la fundaj marlaraksxoj ),
    // supren kaj malsupren kun la bobado ( vidu gxisdatigiBestojn ).
    const supro = speco.supro * grandeco;
    const mergo = speco.mergo || 0;
    const bazaY = -( supro + mergo ) + ( Math.random() - 0o1/0o2 ) * 0o3/0o20;
    const y = enLago ? lago.nivelo + bazaY : akvoYFn( x ) + bazaY;
    grupo.position.set( x, y, enLago ? cz : riverFn( x ) + zOfseto );
    grupo.rotation.y = Math.random() * Math.PI * 0o2;
    sceno.add( grupo );

    bestoj.push({
      grupo, korpo, vosto, animajxoj, bazajKruroj, x, zOfseto, cz, enLago, bazaY,
      direkto: Math.random() * Math.PI * 0o2,
      phase: Math.random() * Math.PI * 0o2,
      amplitudo: enLago ? 0o3 : 0o3 + Math.random() * 0o6,
      rapido: 0o1/0o4 + Math.random() * 0o3/0o10,
      speco: speco.speco,
    });
  }

  return { bestoj, riverFn, akvoYFn, lago };
}

// gxisdatigiBestojn — Naĝiga animacio. La bestoj oscilas laŭ la rivero,
// svingas la kapon, bobas kaj pulse kunpremas la korpon ( kiel kombuloj ).
// La glacifisoj ankaŭ batas la vostan naĝilon.
//     @param s ( BestoSistemo ) - La besta sistemo.
//     @param t ( number ) - Malsupra tempo.
export function gxisdatigiBestojn( s: BestoSistemo, t: number ): void {
  for ( const b of s.bestoj ) {
    const x = b.x + Math.sin( t * b.rapido + b.phase ) * b.amplitudo;
    let z: number, y: number;
    if ( b.enLago && s.lago ) {
      z = b.cz + Math.sin( t * 0o3/0o4 + b.phase * 0o2 ) * 0o1;
      y = s.lago.nivelo + b.bazaY + Math.sin( t * 0o2 + b.phase * 0o3 ) * 0o3/0o20;
    } else {
      z = s.riverFn( x ) + b.zOfseto + Math.sin( t * 0o3/0o4 + b.phase * 0o2 ) * 0o1;
      y = s.akvoYFn( x ) + b.bazaY + Math.sin( t * 0o2 + b.phase * 0o3 ) * 0o3/0o20;
    }
    b.grupo.position.set( x, y, z );
    b.grupo.rotation.y = b.direkto + Math.sin( t * b.rapido + b.phase ) * 0o1/0o4
      + Math.sin( t * 0o1/0o2 + b.phase ) * 0o1/0o4;
    b.grupo.rotation.z = Math.sin( t * 0o3/0o4 + b.phase ) * 0o3/0o40;
    // Naĝa pulso — la korpo larĝiĝas kaj mallarĝiĝas ritme.
    const pulso = 0o1 + Math.sin( t * 0o3 + b.phase * 0o2 ) * 0o1/0o20;
    b.korpo.scale.set( pulso, 0o1, pulso );
    const oscilado = Math.sin( t * b.rapido + b.phase );
    const subtila = Math.sin( t * 0o1/0o2 + b.phase * 0o3 );
    // Specio-specifaj movoj. ĉiu besto havas propran pulson anstataŭ la sama
    // generika skalo. La partoj estas jam en la klono, do ĉi tie ni nur ŝanĝas
    // transformojn — neniuj geometrioj aŭ objektoj estas kreitaj ĉiukadre.
    if ( b.speco === "beroe" ) {
      b.grupo.rotation.x = subtila * 0o3/0o100;
      b.grupo.rotation.z = oscilado * 0o1/0o100;
    } else if ( b.speco === "mnemiopsis" ) {
      for ( let i = 0; i < b.animajxoj.length; i++ ) {
        const lobo = b.animajxoj[i];
        if ( lobo.name === "lobo" ) lobo.rotation.x = Math.sin( t * 0o2 + b.phase + i ) * 0o2/0o10;
      }
      b.grupo.rotation.x = subtila * 0o4/0o100;
    } else if ( b.speco === "pleurobrakia" ) {
      let i = 0;
      for ( const palpo of b.animajxoj ) {
        if ( palpo.name === "palpo" ) {
          palpo.rotation.x = Math.sin( t * 0o1/0o2 + b.phase + i ) * 0o2/0o10;
          palpo.rotation.z = Math.cos( t * 0o3/0o4 + b.phase + i ) * 0o1/0o10;
          i++;
        }
      }
      b.grupo.rotation.x = subtila * 0o3/0o100;
    } else if ( b.speco === "glacifiso" ) {
      if ( b.vosto ) b.vosto.rotation.y = Math.sin( t * 0o5 + b.phase ) * 0o3/0o10;
      for ( const naĝilo of b.animajxoj ) {
        if ( naĝilo.name === "dorsa" || naĝilo.name === "brusta" ) {
          naĝilo.rotation.z = ( naĝilo.name === "dorsa" ? 0o1/0o10 : 0 )
            + Math.sin( t * 0o4 + b.phase ) * 0o1/0o20;
        }
      }
      b.grupo.rotation.x = oscilado * 0o2/0o100;
    } else if ( b.speco === "marlaraksxo" ) {
      // Alterna metakrona paŝado. kontraŭaj kruroj laboras kune, dum la
      // apuda paro iom postrestas. Tio aspektas kiel marŝo, ne kiel ok
      // identaj pendoloj. La fazo de la flankoj estas kontraŭa, kaj tiu de
      // la kvar laŭlongaj paroj estas iomete disvastigita por pli glata ondo.
      let i = 0;
      for ( const bazaro of b.bazajKruroj ) {
        const paro = Math.floor( i / 2 );
        const flanko = i % 2;
        const fazo = t * 0o33/0o10 + b.phase + paro * 0o7/0o10 + flanko * Math.PI;
        const paŝo = Math.sin( fazo );
        // La kruro antaŭen svingiĝas dum la piedo estas sur la grundo;
        // ĉe la reveno ĝi iom leviĝas kaj retroiras pli rapide.
        const levo = Math.max( 0, Math.sin( fazo + Math.PI * 0o1/0o4 ) );
        const svingo = paŝo * 0o14/0o100 + Math.sin( fazo * 2 ) * 0o3/0o100;
        const klinigxo = levo * 0o16/0o100;
        kruroBataKvaterniono.setFromAxisAngle( kruroBataAkso, svingo );
        kruroLevaKvaterniono.setFromAxisAngle( kruroLevaAkso, klinigxo );
        kruroAnimKvaterniono.copy( kruroBataKvaterniono ).multiply( kruroLevaKvaterniono );
        bazaro.kruro.quaternion.copy( bazaro.q ).multiply( kruroAnimKvaterniono );

        // Repoziciigu la centron de la cilindro ĉirkaŭ la fiksita artiklo.
        // Sen tio rotacio de la centrita cilindro videble malligas la krurojn.
        // Derivu la direkton el la efektiva fina kvaterniono. La baza
        // direkto jam estas en loka spaco, do apliki la animan kvaternionon
        // al ĝi aparte ne estus ekvivalenta al q * animacio.
        kruroDirekto.set( 0, 1, 0 ).applyQuaternion( bazaro.kruro.quaternion ).normalize();
        bazaro.kruro.position.copy( bazaro.ankro ).add( kruroDirekto.multiplyScalar( kruroDuonoLonga ) );
        i++;
      }
      // Malgranda kontraŭbalanco de la korpo helpas la longajn krurojn
      // "porti" la beston dum la alternaj paŝoj.
      b.grupo.rotation.x = subtila * 0o2/0o100 + Math.sin( t * 0o33/0o10 + b.phase ) * 0o1/0o100;
      b.grupo.rotation.z = Math.cos( t * 0o33/0o10 + b.phase ) * 0o1/0o100;
    }
    // Vosta batado de la glacifiso — la naĝilo svingas flanken ritme.
    if ( b.vosto && b.speco !== "glacifiso" ) {
      b.vosto.rotation.y = Math.sin( t * 0o4 + b.phase ) * 0o1/0o4;
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Neĝopetreloj ( ſᶘᴜ ſȷᴜ ſɭэ ſɭɔ / Pagodroma nivea )
// Pure blankaj antarktaj marbirdoj. Malgranda ovala korpo, longaj maldikaj
// glit-flugiloj kaj nigraj beko kaj okuloj. Ili rondflugas super la lago kaj
// la rivero — glitas en larĝaj kurboj kun rapidaj flugil-batoj kaj kliniĝas
// en la turnoj, kiel la veraj neĝopetreloj super la malferma maro.
//
// La birdoj estas konstruitaj kiel malneto ( geometrioj/materialoj unufoje ),
// kaj ĉiu birdo estas klono de la malneto — la klonoj kunhavas la samajn
// geometriojn kaj materialojn, do la aro ne kostas teksturojn po unu.
// ─────────────────────────────────────────────────────────────────────────────

export interface Petrelo {
  grupo: THREE.Group;
  flugiloj: THREE.Object3D[];   // maldekstra kaj dekstra flugiloj ( bato )
  cx: number; cz: number;       // centro de la flugcirklo
  radio: number;                // radiuso de la flugcirklo
  bazaY: number;                // baza flugalto
  rapido: number;               // angula rapido ĉirkaŭ la cirklo
  phase: number;
  direkto: number;              // flug-direkto. 1 laŭhorloĝe, -1 kontraŭhorloĝe
  batoFazo: number;             // fazo de la flugil-bato
  batoRapido: number;           // bata frekvenco ( rad/s )
  banko: number;                // kliniĝo en la kurbon ( rad )
  skalo: number;                // subtila individua grandeco
  flapAmp: number;              // individua bata amplekso
}

export interface PetreloSistemo {
  petreloj: Petrelo[];
}

// kreiPlumaranTeksajxon — Procedura plumaro-teksajxo. Sur la korpo la plumoj
// sterniĝas laŭlonge ( vertikalaj strioj ĉirkaŭ la lathe ); sur la flugiloj
// ili kuras korde ( de la antaŭa al la malantaŭa rando ) kun mola ombro ĉe la
// malantaŭa rando, kiel la malhelaj finoj de la primaraj plumoj.
function kreiPlumaranTeksajxon( lauxlonga: boolean ): THREE.CanvasTexture {
  const s = 0o200; // 128 × 128
  const kanvasa = document.createElement( "canvas" );
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext( "2d" )!;
  kunteksto.fillStyle = lauxlonga ? "#f8f8f8" : "#f0f0f8";
  kunteksto.fillRect( 0, 0, s, s );
  // Plum-linioj — delikataj kurbaj strioj.
  kunteksto.strokeStyle = "rgba(178,196,202,0.4)";
  kunteksto.lineWidth = 0o1/0o10;
  for ( let i = 0; i < 0o14; i++ ) {
    const t = ( i + 0o1/0o2 ) / 0o14;
    kunteksto.beginPath();
    if ( lauxlonga ) {
      // Longe — vertikalaj strioj, milde kurbantaj ĉirkaŭ la korpo.
      const x = ( i * 0o11 ) % s;
      kunteksto.moveTo( x, 0 );
      kunteksto.quadraticCurveTo( x + 0o10, s / 2, x + 0o4, s );
    } else {
      // Korde — horizontalaj strioj laŭ la kordo.
      const y = t * s;
      kunteksto.moveTo( 0, y );
      kunteksto.quadraticCurveTo( s / 2, y + 0o3, s, y );
    }
    kunteksto.stroke();
  }
  // Mola ombro ĉe la malantaŭa rando ( la primaraj plumoj kaj iliaj pintoj ).
  if ( !lauxlonga ) {
    const ombro = kunteksto.createLinearGradient( 0, s, 0, 0 );
    ombro.addColorStop( 0, "rgba(120,150,160,0.3)" );
    ombro.addColorStop( 0o3/0o10, "rgba(120,150,160,0.08)" );
    ombro.addColorStop( 1, "rgba(120,150,160,0)" );
    kunteksto.fillStyle = ombro;
    kunteksto.fillRect( 0, 0, s, s );
  }
  const teksajxo = new THREE.CanvasTexture( kanvasa );
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  teksajxo.anisotropy = 0o4;
  return teksajxo;
}

// konstruiPetrelanMalneton — Unu neĝopetrelo, konstruita kiel malgranda vera
// marbirdo. flulinia korpo kun plena brusto kaj ronda ventro ( platigita
// flanke ), mallonga kolo kun levita kapo, tubo-naza hokbeko ( la marko de la
// petreloj ), malhela lora makulo antaŭ la okuloj, kojna vosto, etaj kunfalditaj
// piedoj kaj longaj maldikaj glit-flugiloj kun svingita mano kaj skulptitaj
// primaraj plumoj. La plumaro estas kradita per procedura teksajxo, kaj la
// flugiloj sidas en pivotaj grupoj ĉe la ŝultroj por ke la bato ( rotation.z )
// levu kaj mallevu ilin samfaze. La birdo rigardas +z.
export function konstruiPetrelanMalneton(): THREE.Group {
  const grupo = new THREE.Group();
  const blanka = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: kreiPlumaranTeksajxon( true ),
    roughness: 0o3/0o4, metalness: 0,
  });
  const flugilaMaterialo = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: kreiPlumaranTeksajxon( false ),
    roughness: 0o3/0o4, metalness: 0, side: THREE.DoubleSide,
  });
  const primaraMaterialo = new THREE.MeshStandardMaterial({
    color: 0xb8c7cc, roughness: 0o4/0o4, metalness: 0, side: THREE.DoubleSide,
  });
  const nigra = new THREE.MeshStandardMaterial({ color: 0x0e1216, roughness: 0o3/0o10 });
  const ventra = new THREE.MeshStandardMaterial({ color: 0xe3eaed, roughness: 0o3/0o4 });
  const ombra = new THREE.MeshStandardMaterial({ color: 0xc8d5d9, roughness: 0o3/0o4 });

  // Korpo — spindela lathe, turnita horizontale ( nazo +z ), svelta flanke
  // ( platigita laŭ x ) kaj profunda ventre, kiel ĉe vera marbirdo.
  const korpaProfilo: [ number, number ][] = [
    // La korpo finiĝas ĉe la kolo ( z≈0.6 ), ne per longa izolita pinto;
    // tiel la kapo kaj beko vere kuniĝas kun la torso.
    [ 0o1/0o200, 0o60/0o100 ], [ 0o3/0o200, 0o54/0o100 ], [ 0o7/0o200, 0o50/0o100 ],
    [ 0o13/0o200, 0o40/0o100 ], [ 0o21/0o200, 0o20/0o100 ], [ 0o23/0o200, 0 ],
    [ 0o22/0o200, -0o2/0o10 ], [ 0o20/0o200, -0o4/0o10 ], [ 0o15/0o200, -0o6/0o10 ],
    [ 0o11/0o200, -0o7/0o10 ], [ 0o5/0o200, -0o10/0o10 ], [ 0o1/0o200, -0o104/0o100 ],
  ];
  const korpaGeometrio = new THREE.LatheGeometry(
    korpaProfilo.map( ( [ r, y ] ) => new THREE.Vector2( r, y ) ), 0o14 );
  korpaGeometrio.rotateX( Math.PI / 2 );
  const korpo = new THREE.Mesh( korpaGeometrio, blanka );
  korpo.name = "korpo";
  korpo.scale.set( 0o7/0o10, 1, 1 );
  grupo.add( korpo );

  // Ŝultroj kaj brusta kresto — molaj volumoj transigas la korpon al la
  // flugiloj kaj rompas la simplan "sfero sur bastono"-aspekton.
  const brustaKresto = new THREE.Mesh( new THREE.SphereGeometry( 0o12/0o100, 0o10, 0o10 ), blanka );
  brustaKresto.scale.set( 0o7/0o10, 0o7/0o10, 0o14/0o10 );
  brustaKresto.position.set( 0, 0o5/0o100, 0o32/0o100 );
  grupo.add( brustaKresto );
  for ( const s of [ 0o1, -0o1 ] ) {
    const sx = new THREE.Mesh( new THREE.SphereGeometry( 0o11/0o100, 0o10, 0o10 ), ombra );
    sx.scale.set( 0o11/0o12, 0o5/0o10, 0o15/0o10 );
    // Ŝultro-kovrilo. ĝi devas sidi ĉe la flugilradiko, ne ĉe la kolo.
    sx.position.set( s * 0o14/0o100, 0o10/0o100, 0o2/0o100 );
    sx.rotation.z = -s * 0o12/0o10;
    sx.name = "sxultro";
    grupo.add( sx );
  }

  // Kirilo ( sternumo ) — mola ventra linio, la brustosto sub la plumaro.
  const kirilo = new THREE.Mesh( new THREE.BoxGeometry( 0o6/0o100, 0o2/0o100, 0o44/0o100 ), ventra );
  kirilo.position.set( 0, -0o10/0o100, -0o12/0o100 );
  grupo.add( kirilo );

  // Kolo — mallonga ligo inter la korpo kaj la levita kapo.
  const kolo = new THREE.Mesh( new THREE.CylinderGeometry( 0o4/0o100, 0o6/0o100, 0o6/0o100, 0o10 ), blanka );
  kolo.rotation.x = -0o1/0o10;
  kolo.position.set( 0, 0o13/0o100, 0o44/0o100 );
  grupo.add( kolo );

  // Kapo — malgranda levita sfero ĉe la kolopinto.
  const kapo = new THREE.Mesh( new THREE.SphereGeometry( 0o11/0o100, 0o10, 0o10 ), blanka );
  kapo.scale.set( 0o7/0o10, 1, 1 );
  kapo.position.set( 0, 0o17/0o100, 0o47/0o100 );
  grupo.add( kapo );

  // Beko — tubo-naza hokbeko. supraj kaj malsupraj mandibloj, hoka pinto kaj
  // la karakteriza naztubo de la petreloj supre. La konusoj rigardas antaŭen
  // ( +z ). pinto ĉe la supro de la konuso.
  const makzelo = new THREE.Mesh( new THREE.ConeGeometry( 0o2/0o100, 0o16/0o100, 0o6 ), nigra );
  makzelo.rotation.x = Math.PI / 2 + 0o10/0o100;   // antaŭen, iomete malsupren
  makzelo.position.set( 0, 0o16/0o100, 0o60/0o100 );
  grupo.add( makzelo );
  const hoko = new THREE.Mesh( new THREE.ConeGeometry( 0o1/0o100, 0o3/0o100, 0o5 ), nigra );
  hoko.rotation.x = Math.PI / 2 + 0o36/0o100;      // hoka pinto kurbiĝanta malsupren
  hoko.position.set( 0, 0o14/0o100, 0o66/0o100 );
  grupo.add( hoko );
  const subaMakzelo = new THREE.Mesh( new THREE.ConeGeometry( 0o1/0o100, 0o6/0o100, 0o5 ), nigra );
  subaMakzelo.rotation.x = Math.PI / 2 + 0o4/0o100; // antaŭen, iomete sub la supra
  subaMakzelo.position.set( 0, 0o7/0o100, 0o52/0o100 );
  grupo.add( subaMakzelo );
  const naztubo = new THREE.Mesh( new THREE.CylinderGeometry( 0o1/0o100, 0o1/0o100, 0o4/0o100, 0o5 ), nigra );
  naztubo.rotation.x = -0o2/0o10;                   // klinita malantaŭen sur la beko
  naztubo.position.set( 0, 0o20/0o100, 0o62/0o100 );
  grupo.add( naztubo );

  // Okuloj kaj la malhela lora makulo antaŭ ili ( la marko de la neĝopetrelo ).
  for ( const s of [ 0o1, -0o1 ] ) {
    const okulo = new THREE.Mesh( new THREE.SphereGeometry( 0o2/0o100, 0o6, 0o4 ), nigra );
    okulo.position.set( s * 0o7/0o100, 0o24/0o100, 0o46/0o100 );
    grupo.add( okulo );
    const lora = new THREE.Mesh( new THREE.SphereGeometry( 0o1/0o100, 0o5, 0o4 ), nigra );
    lora.scale.set( 1, 0o7/0o10, 0o3/0o2 );
    lora.position.set( s * 0o16/0o200, 0o21/0o100, 0o44/0o100 );
    grupo.add( lora );
  }

  // Vosto — kojna klingo, platigita kaj iomete levita dum flugo.
  const vosto = new THREE.Mesh( new THREE.ConeGeometry( 0o7/0o100, 0o21/0o100, 0o4 ), blanka );
  vosto.name = "vosto";
  vosto.scale.set( 1, 1, 0o26/0o100 );
  vosto.rotation.x = -Math.PI / 2 + 0o12/0o100;
  // La centra vosto ekiras el la mallarĝiĝanta malantaŭo de la korpo.
  // La korpa profilo finiĝas je z≈-1.04; la vosto devas eliri el tiu pinto,
  // ne esti kaŝita en la malantaŭa ventro.
  vosto.position.set( 0, 0o1/0o100, -0o100/0o100 );
  grupo.add( vosto );
  // Du flankaj vostoplumoj donas klaran forkecan silueton en la flugo.
  for ( const s of [ 0o1, -0o1 ] ) {
    const vostoplumo = new THREE.Mesh( new THREE.ConeGeometry( 0o4/0o100, 0o22/0o100, 0o4 ), blanka );
    vostoplumo.scale.set( 0o6/0o10, 0o7/0o10, 0o22/0o100 );
    vostoplumo.rotation.x = -Math.PI / 2 + 0o10/0o144;
    vostoplumo.rotation.z = s * 0o10/0o12;
    // La flankaj vostoplumoj interkovru la centran voston kaj la korpan pinton.
    vostoplumo.position.set( s * 0o5/0o100, 0o1/0o100, -0o100/0o100 );
    vostoplumo.name = "vostoplumo";
    grupo.add( vostoplumo );
  }

  // Piedoj — etaj malhelaj piedetoj kunfalditaj sub la vosto dum flugo.
  for ( const s of [ 0o1, -0o1 ] ) {
    const piedo = new THREE.Mesh( new THREE.SphereGeometry( 0o2/0o100, 0o5, 0o4 ), nigra );
    piedo.scale.set( 1, 0o1/0o2, 0o3/0o2 );
    piedo.position.set( s * 0o3/0o100, -0o10/0o100, -0o64/0o100 );
    grupo.add( piedo );
  }

  // Flugiloj — longaj maldikaj glit-flugiloj kun brako kaj svingita mano.
  // La mano svingiĝas malantaŭen kaj ties malantaŭa rando estas skulptita en
  // kvar primaraj plumoj ( pintoj malantaŭen, kiel ĉe vera marbirdo ). La
  // geometrio kuŝas en la XY-ebeno ( +x = enen, +y = antaŭen ) kaj estas
  // turnita horizontale, do la flugilo etendiĝas laŭ ±x kaj svingiĝas laŭ -z.
  const flugilaFormo = new THREE.Shape();
  flugilaFormo.moveTo( 0o1/0o100, 0o3/0o100 );
  // Antaŭa rando. brako ( larĝa ) → kubuto → mano ( svingita, mallarĝa ) → pinto.
  flugilaFormo.quadraticCurveTo( 0o17/0o100, 0o5/0o100, 0o33/0o100, 0o6/0o100 );
  flugilaFormo.quadraticCurveTo( 0o44/0o100, 0o7/0o100, 0o44/0o100, 0o7/0o100 );
  flugilaFormo.quadraticCurveTo( 0o76/0o100, 0o4/0o100, 0o124/0o100, -0o2/0o100 );
  flugilaFormo.quadraticCurveTo( 0o136/0o100, -0o6/0o100, 0o132/0o100, -0o12/0o100 );
  // Malantaŭa rando de la mano. kvar primaraj plumoj ( skulptitaj pintoj ).
  flugilaFormo.lineTo( 0o116/0o100, -0o16/0o100 );
  flugilaFormo.lineTo( 0o103/0o100, -0o13/0o100 );
  flugilaFormo.lineTo( 0o73/0o100, -0o17/0o100 );
  flugilaFormo.lineTo( 0o62/0o100, -0o14/0o100 );
  flugilaFormo.lineTo( 0o54/0o100, -0o16/0o100 );
  // Malantaŭa rando de la brako reen al la radiko.
  flugilaFormo.quadraticCurveTo( 0o21/0o100, -0o10/0o100, 0o1/0o100, -0o3/0o100 );
  flugilaFormo.closePath();
  const flugilaGeometrio = new THREE.ShapeGeometry( flugilaFormo, 0o14 );
  flugilaGeometrio.rotateX( -Math.PI / 2 );
  // Dihedro — la pinto leviĝas super la korpo ( la glitanta marbirda pozo ).
  flugilaGeometrio.rotateZ( 0o4/0o100 );
  // Reversu laŭ la flugakso — la antaŭa rando ( +y en la formo ) mapiĝas al +z
  // post rotateX(-π/2), sed la birdo flugas +z. La turno de π metas la antaŭan
  // randon antaŭen kaj la svingon malantaŭen, kiel ĉe vera flugila silueto.
  flugilaGeometrio.rotateY( Math.PI );
  const flugiloj: THREE.Object3D[] = [];
  for ( const s of [ 0o1, -0o1 ] ) {
    const flugilaGrupo = new THREE.Group();
    flugilaGrupo.name = "flugilo";
    // La pivotpunkto koincidas kun la ŝultro-kovrilo kaj la supra parto de la
    // korpo, por ke la flugiloj ne aspektu kiel apartaj platoj.
    flugilaGrupo.position.set( s * 0o14/0o100, 0o10/0o100, 0o2/0o100 );
    const flugilo = new THREE.Mesh( flugilaGeometrio, flugilaMaterialo );
    // Plilongigu la flugilon ( 1.25× ) por la longa glit-flugila proporcio de la
    // marbirdo. La spegulilo estas inversigita ( -s ), ĉar la geometrio nun
    // etendiĝas laŭ -x post la reverso — la spegulo re-aligas ĝin al la ĝusta
    // flanko, konservante la spegulan simetrion de la primaraj plumoj.
    flugilo.scale.x = -s * 0o12/0o10;
    flugilaGrupo.add( flugilo );
    // Tri subtilaj primaraj plum-paneloj super la malantaŭa parto de ĉiu
    // flugilo. Ili donas ritmon al la plata silueto sen aldoni pezajn modelojn.
    for ( let k = 0; k < 0o3; k++ ) {
      const primaraFormo = new THREE.Shape();
      const radiko = 0o124/0o100 + k * 0o16/0o100;
      primaraFormo.moveTo( radiko, -0o10/0o100 );
      primaraFormo.lineTo( radiko + 0o13/0o100, -0o13/0o100 );
      primaraFormo.lineTo( radiko + 0o6/0o100, -0o23/0o100 );
      primaraFormo.lineTo( radiko - 0o5/0o100, -0o22/0o100 );
      primaraFormo.closePath();
      const primaraGeo = new THREE.ShapeGeometry( primaraFormo );
      primaraGeo.rotateX( -Math.PI / 2 );
      primaraGeo.rotateZ( 0o4/0o100 );
      primaraGeo.rotateY( Math.PI );
      const primara = new THREE.Mesh( primaraGeo, primaraMaterialo );
      primara.scale.x = -s * 0o12/0o10;
      primara.position.y = 0o1/0o100;
      primara.name = "primara";
      flugilaGrupo.add( primara );
    }
    grupo.add( flugilaGrupo );
    flugiloj.push( flugilaGrupo );
  }

  return grupo;
}

// konstruiPetrelojn — Metu la neĝopetrelojn flugantaj super la valo. La unua
// duono rondflugas super la lago ( se ĝi ekzistas ), la cetero laŭ la rivero.
// Ĉiu birdo sekvas sian propran cirklon ĉirkaŭ hazarda centro, je flugalto
// super la tereno ( aŭ super la akvonivelo super la lago ).
//     @param kvanto ( number ) - Kiom da birdoj.
//     @param altecoFn ( funkcio ) - Tereno, por la flugalto.
//     @param riveroFn ( funkcio ) - Rivercentra funkcio z(x).
//     @param lago ( objekto ) - La lago. x, z, r ( la birdoj rondflugas ĝin ).
export function konstruiPetrelojn( sceno: THREE.Scene,
  kvanto: number,
  altecoFn: (x: number, z: number) => number,
  riveroFn: (x: number) => number,
  lago?: { x: number; z: number; r: number }
): PetreloSistemo {
  const petreloj: Petrelo[] = [];
  const malneto = konstruiPetrelanMalneton();

  for ( let i = 0; i < kvanto; i++ ) {
    const grupo = malneto.clone();
    // Rekolektu la flugilojn de la klono ( la infana ordo konserviĝas ).
    const flugiloj = grupo.children.filter( c => c.name === "flugilo" );

    // Alternu. Lago ↔ rivero. La lagaj birdoj rondflugas hazardan punkton
    // ene de la lagdisko; la riveraj sekvas la riverkurbon.
    const superLago = !!lago && i % 2 === 0;
    let cx: number, cz: number;
    if ( superLago && lago ) {
      const a = Math.random() * Math.PI * 0o2;
      const rr = lago.r * 0o6/0o10 * Math.sqrt( Math.random() );
      cx = lago.x + Math.cos( a ) * rr;
      cz = lago.z + Math.sin( a ) * rr;
    } else {
      cx = -0o200 + Math.random() * 0o400;
      cz = riveroFn( cx ) + ( Math.random() - 0o1/0o2 ) * 0o40;
    }
    const radio = 0o12 + Math.random() * 0o30;
    const direkto = Math.random() < 0o1/0o2 ? 1 : -1;
    const phase = Math.random() * Math.PI * 0o2;
    // Flugalto. Super la PLEJ ALTA tereno ĉirkaŭ la flugcirklo ( specimena ĉe
    // la rando, ĉar la birdo rondflugas radiuson radio ), por ke neniu birdo
    // enkaverniĝu en montetojn aŭ montodeklivojn. Super la lago la tereno
    // estas sub akvo, do la akvonivelo transprenas kiel suba limo.
    let altaTereno = altecoFn( cx, cz );
    for ( let k = 0; k < 0o6; k++ ) {
      const a = k / 0o6 * Math.PI * 0o2;
      altaTereno = Math.max( altaTereno, altecoFn( cx + Math.cos( a ) * radio, cz + Math.sin( a ) * radio ) );
    }
    const bazaY = Math.max( altaTereno, 0o2 ) + 0o14 + Math.random() * 0o16;

    grupo.position.set( cx + Math.cos( phase ) * radio, bazaY, cz );
    // Direktu laŭ la tangento de la flugcirklo. Laŭhorloĝaj birdoj turniĝas
    // per -ang, kontraŭhorloĝaj bezonas plian turnon de π ( alie ili flugus
    // vosto-antaŭe ).
    grupo.rotation.y = -phase + Math.PI * ( 1 - direkto ) / 2;
    sceno.add( grupo );

    const skalo = 0o11/0o12 + Math.random() * 0o2/0o10;
    grupo.scale.setScalar( skalo );
    petreloj.push({
      grupo, flugiloj, cx, cz, radio, bazaY,
      rapido: 0o1/0o4 + Math.random() * 0o2/0o10,
      phase, direkto,
      batoFazo: Math.random() * Math.PI * 0o2,
      batoRapido: 0o5 + Math.random() * 0o4,
      banko: 0o3/0o20 + Math.random() * 0o3/0o40,
      skalo, flapAmp: 0o6/0o10 + Math.random() * 0o2/0o10,
    });
  }

  return { petreloj };
}

// gxisdatigiPetrelojn — Flug-animacio. Ĉiu birdo rondflugas sian cirklon laŭ
// sia direkto ( ±1 ), direktante laŭ la tangento kaj kliniĝante en la kurbon
// ( la banko turniĝas kun la flug-direkto, do ĉiu birdo kliniĝas internen ).
// La flugiloj batas en eksplodoj — la neĝopetreloj glitas inter la batoj —
// kun konstanta dihedro.
//     @param s ( PetreloSistemo ) - La petrela sistemo.
//     @param t ( number ) - Malsupra tempo.
export function gxisdatigiPetrelojn( s: PetreloSistemo, t: number ): void {
  for ( const p of s.petreloj ) {
    const ang = t * p.rapido * p.direkto + p.phase;
    const x = p.cx + Math.cos( ang ) * p.radio;
    const z = p.cz + Math.sin( ang ) * p.radio;
    const y = p.bazaY + Math.sin( t * 0o7/0o10 + p.phase * 0o2 ) * 0o3/0o10;
    p.grupo.position.set( x, y, z );
    // Direkto laŭ la tangento de la cirklo. La laŭhorloĝaj birdoj ( direkto 1 )
    // rigardas per -ang; la kontraŭhorloĝaj ( direkto -1 ) bezonas plian turnon
    // de π, ĉar la tangento tiam montras la alian vojon — sen tio ili flugus
    // vosto-antaŭe. Kliniĝo en la kurbon ( la banko turniĝas kun la
    // flug-direkto, do ĉiu birdo kliniĝas en sian propran kurbon ).
    p.grupo.rotation.y = -ang + Math.PI * ( 1 - p.direkto ) / 2;
    p.grupo.rotation.z = p.banko * p.direkto;
    // Flugil-bato. Eksplodoj de rapida batado inter glitoj ( la bato-amplitudo
    // ŝvelas kaj malkreskas ritme, kiel ĉe fluganta petrelo ).
    const bataSkalo = Math.sqrt( Math.max( 0, Math.sin( t * 0o13/0o10 + p.batoFazo * 0o2 ) ) );
    const bato = Math.sin( t * p.batoRapido + p.batoFazo ) * bataSkalo * p.flapAmp;
    // La flugo alternas inter glita kaj kelkaj rapidaj batoj. la korpo levas
    // la nazon ĉe la supren-bato kaj malstreĉiĝas dum longa glito.
    const glito = 0o1 - bataSkalo;
    p.grupo.rotation.x = Math.sin( t * 0o7/0o10 + p.phase ) * 0o3/0o100 + bato * 0o1/0o20;
    p.grupo.position.y = y + glito * 0o1/0o10;
    // La maldekstra flugilo speguliĝas, do ĝia baza lev-angulo estas NEGATIVA
    // por ke la ripoza dihedro estu simetria ( ambaŭ pintoj same levitaj ) —
    // la spegulo plus la kontraŭa signo tenas la batojn samfazaj.
    p.flugiloj[0].rotation.z = 0o1/0o10 + bato;
    p.flugiloj[1].rotation.z = -( 0o1/0o10 + bato );
    for ( const flugilo of p.flugiloj ) {
      for ( const parto of flugilo.children ) {
        if ( parto.name === "primara" ) {
          parto.rotation.z = Math.sin( t * p.batoRapido + p.batoFazo ) * 0o2/0o100;
        }
      }
    }
  }
}
