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
  x: number;           // baza x — laŭ la rivero aŭ en la lago
  zOfseto: number;     // laterala forpreno de la rivercentro
  cz: number;          // baza z — en la lago la besto restas ĉe sia propra centro
  enLago: boolean;     // ĉu la besto naĝas en la lago ( anstataŭ la rivero )
  bazaY: number;       // negativa kroma alteco — korpocentro sub la akvosurfaco
  direkto: number;     // baza kapo-direkto ( jaro )
  phase: number;
  amplitudo: number;   // oscila intervalo laŭ la rivero
  rapido: number;      // naĝa rapido ( oscilfrekvenco )
}

export interface BestoSistemo {
  bestoj: Besto[];
  riverFn: (x: number) => number;
  akvoYFn: (x: number) => number;
  lago?: { x: number; z: number; r: number; nivelo: number };
}

// kreiKombovicanTeksajxon — Procedura teksajxo kun vertikalaj strioj ĉirkaŭ
// la korpo ( la kombovicoj ): malhela fono, blankecaj strioj kun molaj randoj.
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
  mergo?: number;  // kroma subakvigo por fundaj bestoj ( pozitiva = pli profunde )
}

// konstruiBeroanMalneton — Beroe: longforma ovalo, ok kombovicoj, granda buŝo
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
    new THREE.CylinderGeometry( 0o7/0o100, 0o7/0o100, 0o1/0o2, 0o6 ).translate( 0, 0o1/0o4, 0 ),
    new THREE.MeshPhysicalMaterial({
      color: 0x986080, transparent: true, opacity: 0o5/0o20, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x402040, emissiveIntensity: 0o1/0o4,
    })
  );
  faringo.position.y = 0o5/0o10;
  grupo.add( faringo );

  return { malneto: grupo, platigxo: new THREE.Vector3( 0o1, 0o1, 0o63/0o100 ), supro: 0o43/0o40 };
}

// konstruiMnemiopsanMalneton — Mnemiopsis: pli ronda korpo kun kvar buŝaj loboj.
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
    lobo.position.set( Math.sin( a ) * 0o41/0o100, -0o55/0o100, Math.cos( a ) * 0o41/0o100 );
    lobo.rotation.y = a;
    grupo.add( lobo );
  }

  return { malneto: grupo, platigxo: new THREE.Vector3( 0o1, 0o1, 0o1 ), supro: 0o43/0o40 };
}

// konstruiPleŭrobrakianMalneton — Pleŭrobrakia: malgranda ronda korpo, du
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
    grupo.add( palpo );
  }

  return { malneto: grupo, platigxo: new THREE.Vector3( 0o1, 0o1, 0o1 ), supro: 0o43/0o40 };
}

// konstruiGlacifisanMalneton — Glacifiso ( Channichthyidae ): preskaŭ
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
  dorsa.position.set( 0, 0o33/0o100, -0o1/0o4 );
  dorsa.rotation.z = 0o1/0o10;
  grupo.add( dorsa );

  // Brustaj naĝiloj — du flankaj ebenoj, iomete svingantaj malantaŭen.
  for ( const s of [ 0o1, -0o1 ] ) {
    const brusta = new THREE.Mesh( new THREE.PlaneGeometry( 0o5/0o20, 0o3/0o20 ), naĝilaMaterialo );
    brusta.position.set( s * 0o11/0o40, -0o1/0o20, 0o3/0o20 );
    brusta.rotation.y = s * Math.PI / 0o2 + 0o1/0o10 * s;
    brusta.rotation.x = -0o1/0o10;
    grupo.add( brusta );
  }

  return { malneto: grupo, platigxo: new THREE.Vector3( 0o3/0o4, 0o1, 0o1 ), supro: 0o33/0o100 };
}

// konstruiMarlaraksxanMalneton — Marlaraksxo ( Pycnogonida ): eta korpo kun
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
  const kruraGeometrio = new THREE.CylinderGeometry( 0o1/0o100, 0o1/0o100, 1, 0o6 );
  const kruraMaterialo = new THREE.MeshStandardMaterial({
    color: 0xb8a080, transparent: true, opacity: 0o3/0o4,
    depthWrite: false, roughness: 0o1/0o2,
  });
  const supren = new THREE.Vector3( 0, 1, 0 );
  const direkto = new THREE.Vector3();
  for ( let k = 0; k < 0o4; k++ ) {
    // Kvar paroj laŭ la korpo — malantaŭen ĝis antaŭen ( ±z ).
    const zDisvastigo = ( k / 0o4 - 0o3/0o10 ) * 0o2;
    for ( const s of [ 0o1, -0o1 ] ) {
      // Direkto: eksteren ( ±x ), malsupren, kaj antaŭe/malantaŭe laŭ la paro.
      direkto.set(
        s * Math.sin( 0o5/0o10 ),
        -Math.cos( 0o5/0o10 ),
        zDisvastigo
      ).normalize();
      const kruro = new THREE.Mesh( kruraGeometrio, kruraMaterialo );
      kruro.scale.y = 0o3/0o2; // longa kruro
      kruro.quaternion.setFromUnitVectors( supren, direkto );
      // Ankru la kruron sur la korposurfaco kaj etendu laŭ la direkto
      // ( la cilindro longas 0o3/0o2, do ĝi etendiĝas de 0o1/0o10 ĝis 0o15/0o10 ).
      kruro.position.copy( direkto ).multiplyScalar( 0o1/0o10 + 0o3/0o4 );
      grupo.add( kruro );
    }
  }

  return { malneto: grupo, platigxo: new THREE.Vector3( 0o1, 0o1, 0o1 ), supro: 0o1/0o10, mergo: 0o2 };
}

// konstruiBestojn — Metu la bestojn en la riveron: hazardaj pozicioj laŭ la
// riverkurbiĝo, evitante la dokojn. Ili flosas ĉe la akvosurfaco ( aŭ marŝas
// pli profunde ) kaj naĝas per pulsoj ( vidu gxisdatigiBestojn ).
//     @param kvanto ( number ) - Kiom da bestoj.
//     @param riverFn ( funkcio ) - Rivercentra funkcio z(x).
//     @param akvoYFn ( funkcio ) - Akvosurfaca alta funkcio y(x).
//     @param duonaLargho ( number ) - Duon-larĝo de la rivero.
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
      grupo, korpo, vosto, x, zOfseto, cz, enLago, bazaY,
      direkto: Math.random() * Math.PI * 0o2,
      phase: Math.random() * Math.PI * 0o2,
      amplitudo: enLago ? 0o3 : 0o3 + Math.random() * 0o6,
      rapido: 0o1/0o4 + Math.random() * 0o3/0o10,
    });
  }

  return { bestoj, riverFn, akvoYFn, lago };
}

// gxisdatigiBestojn — Naĝiga animacio: la bestoj oscilas laŭ la rivero,
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
    // Vosta batado de la glacifiso — la naĝilo svingas flanken ritme.
    if ( b.vosto ) {
      b.vosto.rotation.y = Math.sin( t * 0o4 + b.phase ) * 0o1/0o4;
    }
  }
}
