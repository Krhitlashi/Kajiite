// NPC-modulo — figuroj vagantaj tra la sxtupurbo de ornaveth-v2
// Malalt-poligonaj figuroj kun tavoligitaj vestoj, foliaj manikoj, kvarstelo/rombo-motivoj
import * as THREE from "three";

// --- Vesto tipo ---
export interface Vesto {
  nomo: string;
  ĉefa: number;
  akcenta: number;
  interno: number;
  pantalono: number;  // kutime hela aŭ malhela bluo
  botoj: number;      // kutime bruno
}

// --- Kanvasaj helpiloj ---
const deksesuma = (c: number) => "#" + c.toString(0o20).padStart(0o6, "0");

function kvarStelo(kunteksto: CanvasRenderingContext2D, cX: number, cy: number, r: number, koloro: string): void {
  const s = r * 7/32;
  kunteksto.fillStyle = koloro; kunteksto.beginPath();
  kunteksto.moveTo(cX, cy - r); kunteksto.quadraticCurveTo(cX + s, cy - s, cX + r, cy);
  kunteksto.quadraticCurveTo(cX + s, cy + s, cX, cy + r); kunteksto.quadraticCurveTo(cX - s, cy + s, cX - r, cy);
  kunteksto.quadraticCurveTo(cX - s, cy - s, cX, cy - r); kunteksto.fill();
}

function rombo(kunteksto: CanvasRenderingContext2D, cX: number, cy: number, w: number, h: number,
  plenigo: string | null, bordo: string | null): void {
  kunteksto.beginPath(); kunteksto.moveTo(cX, cy - h); kunteksto.lineTo(cX + w, cy); kunteksto.lineTo(cX, cy + h); kunteksto.lineTo(cX - w, cy); kunteksto.closePath();
  if ( plenigo ) { kunteksto.fillStyle = plenigo; kunteksto.fill(); }
  if ( bordo ) { kunteksto.strokeStyle = bordo; kunteksto.lineWidth = 0o4; kunteksto.stroke(); }
}

// --- Vesta tekstura generatoro ---
function vestaTeksajxo(o: Vesto, speco: string): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas"); kanvasa.width = 0o400; kanvasa.height = 0o1000;
  const kunteksto = kanvasa.getContext("2d")!;
  // La pantalono uzas sian propran bazkoloron ( bluan ); la cetero la ĉefan.
  const M = deksesuma(speco === "pantalono" ? o.pantalono : o.ĉefa), A = deksesuma(o.akcenta), I = deksesuma(o.interno);
  kunteksto.fillStyle = M; kunteksto.fillRect(0, 0, 0o400, 0o1000);
  kunteksto.fillStyle = A; kunteksto.fillRect(0, 0o726, 0o400, 0o32);
  kunteksto.fillStyle = A; kunteksto.globalAlpha = 13/32; kunteksto.fillRect(0, 0o704, 0o400, 0o6); kunteksto.globalAlpha = 0o1;

  if ( speco === "supra" ) {
    // Frontaj motivoj — stelo kun rombo kaj butona plateto sur la fermita brusto.
    // La stelo ( 0o120 ± 0o44 ) restas inter la kolumaj punktoj supre kaj la
    // plateto sube, por ke neniu elemento interkovru.
    kvarStelo(kunteksto, 0o200, 0o120, 0o44, A);
    rombo(kunteksto, 0o200, 0o120, 0o60, 0o60, null, A);
    kunteksto.fillStyle = A;
    for ( let i = 0; i < 0o4; i++ ) { kunteksto.beginPath(); kunteksto.arc(0o200, 0o6 + i * 0o14, 0o5, 0, Math.PI * 0o2); kunteksto.fill(); }
    // Butona plateto — vertikala akcenta linio kun butonoj laŭ la fronta centro
    // ( jako-stilo ). Ĝi komenciĝas sub la stelo ( 0o170 ) kaj sidas alta sur la
    // fermita brusto ( super la levita fronto-hemo, y ≈ 1.14 ), por ke ĝi ne
    // malaperu en la malfermaĵo.
    kunteksto.strokeStyle = A; kunteksto.lineWidth = 0o3;
    kunteksto.beginPath(); kunteksto.moveTo(0o200, 0o170); kunteksto.lineTo(0o200, 0o240); kunteksto.stroke();
    kunteksto.fillStyle = A;
    for ( let i = 0; i < 0o3; i++ ) { kunteksto.beginPath(); kunteksto.arc(0o200, 0o200 + i * 0o22, 0o4, 0, Math.PI * 0o2); kunteksto.fill(); }
    // Dorsaj motivoj — sama stelo ĉe la kudro ( x = 0 kaj x = 0o400 ), ĉar la
    // malantaŭo estas la tekstura rando post la ŝovo ( 1/2 ).
    for ( const x of [ 0, 0o400 ] ) {
      kvarStelo(kunteksto, x, 0o130, 0o40, A);
      rombo(kunteksto, x, 0o130, 0o54, 0o54, null, A);
      kvarStelo(kunteksto, x, 0o560, 0o32, A);
    }
    // Flankaj romboj — sur la pendantaj flankoj, sub la malfermaĵo.
    rombo(kunteksto, 0o124, 0o440, 0o30, 0o40, I, A);
    rombo(kunteksto, 0o254, 0o440, 0o30, 0o40, I, A);
  } else {
    for (let i = 0; i < 0o3; i++) {
      rombo(kunteksto, 0o200, 0o120 + i * 0o156, 0o36, 0o50, null, A);
      // Dorsa ripeto ĉe la kudro ( x = 0 / x = 0o400 ).
      rombo(kunteksto, 0, 0o120 + i * 0o156, 0o36, 0o50, null, A);
      rombo(kunteksto, 0o400, 0o120 + i * 0o156, 0o36, 0o50, null, A);
    }
    kunteksto.globalAlpha = 2/8; kunteksto.fillStyle = A;
    for (let i = 0; i < 0o6; i++) for (let j = 0; j < 0o3; j++) rombo(kunteksto, 0o50 + j * 0o130, 0o50 + i * 0o124, 0o12, 0o16, A, null);
    kunteksto.globalAlpha = 0o1;
  }
  const t = new THREE.CanvasTexture(kanvasa); t.colorSpace = THREE.SRGBColorSpace;
  // La motivoj aperu ĉe la fronto: la ŝovo ( 1/2 ) alportas la teksturcentron,
  // kie la steloj/romboj kaj la butona plateto estas, al la fronto ( +z ).
  t.wrapS = THREE.RepeatWrapping; t.offset.x = 1/2;
  return t;
}

// --- Folia maniko ---
// kreiFoliaTonditanTubon — Konstruu tubon kies malsupra rando estas tondita en
// ripetatajn foliformajn lobojn: la rando mem sekvas foli-siluetojn ( pintoj
// pendantaj malsupren, V-noĉoj leviĝantaj inter la folioj ) — ne apartaj
// elstarantaj folioj. La geometrio ricevas ankaŭ UV-koordinatojn ( u ĉirkaŭ la
// tubo, v laŭ la alto ), por ke teksturaj aplikoj mapu glate.
//     @param suproR ( number ) - Supra radiuso.
//     @param malsuproR ( number ) - Malsupra radiuso.
//     @param suproY ( number ) - Alto de la supro-ringo.
//     @param bazoY ( number ) - Baza alto de la malsupra rando.
//     @param segmentoj ( number ) - Cirkla rezolucio.
//     @param loboj ( number ) - Kiom da foli-loboj ĉirkaŭ la rando.
//     @param profundo ( number ) - Kiom profunde la foli-pintoj pendas.
//     @param nocho ( number ) - Kiom alte la noĉoj leviĝas en la tubon.
//     @param fermitaSupro ( boolean = false ) - Ĉu fermi la supran ringon per ĉapo.
//     @returns geometrio ( THREE.BufferGeometry ) - La tondita tubo.
function kreiFoliaTonditanTubon( suproR: number, malsuproR: number, suproY: number,
  bazoY: number, segmentoj: number, loboj: number, profundo: number, nocho: number,
  fermitaSupro = false ): THREE.BufferGeometry {
  const q = 3/4; // folia profilo — akra sed plena pinto
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  const ringo = segmentoj + 0o1;
  for ( let i = 0; i <= segmentoj; i++ ) {
    const ang = i / segmentoj * Math.PI * 0o2;
    const kx = Math.cos( ang ), kz = Math.sin( ang );
    // Supro ringo.
    pozicioj.push( kx * suproR, suproY, kz * suproR );
    uvoj.push( i / segmentoj, 0 );
    // Malsupro ringo — la folia tondo.
    const u = ( ang * loboj / ( Math.PI * 0o2 ) ) % 0o1; // 0 ĉe foli-pinto
    const v = Math.min( u, 0o1 - u ) * 0o2;              // 0 pinto, 1 noĉo
    const folio = 0o1 - Math.pow( v, q );                // 1 pinto, 0 noĉo
    const y = bazoY + nocho - ( nocho + profundo ) * folio;
    pozicioj.push( kx * malsuproR, y, kz * malsuproR );
    uvoj.push( i / segmentoj, 1 );
  }
  // La pozicioj estas interplektitaj ( supro_i, malsupro_i ), do ĉiu kvadrato
  // ligas la parajn suprojn ( 2i, 2i+2 ) al la neparaj malsuproj ( 2i+1, 2i+3 ).
  for ( let i = 0; i < segmentoj; i++ ) {
    const a = 0o2 * i, b = 0o2 * i + 0o2, c = 0o2 * i + 0o1, d = 0o2 * i + 0o3;
    // Ekstera orientiĝo — la normaloj montru eksteren.
    indeksoj.push( a, b, c, b, d, c );
  }
  if ( fermitaSupro ) {
    // Ĉapo — centro kaj ventumilo super la supro-ringo ( la paraj indeksoj ).
    pozicioj.push( 0, suproY, 0 );
    uvoj.push( 1/2, 0 );
    const centro = 0o2 * ringo;
    for ( let i = 0; i < segmentoj; i++ ) indeksoj.push( 0o2 * i, 0o2 * i + 0o2, centro );
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute( "position", new THREE.Float32BufferAttribute( pozicioj, 3 ) );
  geometrio.setAttribute( "uv", new THREE.Float32BufferAttribute( uvoj, 2 ) );
  geometrio.setIndex( indeksoj );
  geometrio.computeVertexNormals();
  return geometrio;
}

// konstruiManikon — Konstruu tri-dimensian manikon: tubo kies malsupro estas
// tondita en ripetatajn kvar foliformajn lobojn — la rando mem sekvas foli-
// siluetojn — kun akcenta rando kiu sekvas la tondon.
//     @param ĉefaM ( THREE.Material ) - Materialo de la tubo.
//     @param akcentaM ( THREE.Material ) - Materialo de la rando.
//     @returns grupo ( THREE.Group ) - La maniko, origine ĉe la ŝultro.
function konstruiManikon( ĉefaM: THREE.Material, akcentaM: THREE.Material ): THREE.Group {
  const grupo = new THREE.Group();
  // La tubo — pli larĝa ĉe la ŝultro ( y = 0 ), malvastigxanta al la pojno.
  // La malsupro estas tondita en kvar foliformajn lobojn: pintoj pendantaj ĝis
  // -15/16 kaj noĉoj leviĝantaj ĝis -3/4.
  const tubo = new THREE.Mesh(
    kreiFoliaTonditanTubon( 5/32, 1/8, 0, -13/16, 0o60, 0o4, 1/8, 1/16, true ), ĉefaM );
  grupo.add( tubo );
  // La akcenta rando — maldika bandego kiu sekvas la folian tondon, iomete pli
  // larĝa ol la tubo ( 9/64 kontraŭ 1/8 ), por ke ĝi elstaru kiel rando.
  const ringo = new THREE.Mesh(
    kreiFoliaTonditanTubon( 9/64, 9/64, -11/16, -13/16, 0o60, 0o4, 1/8, 1/16 ), akcentaM );
  grupo.add( ringo );
  return grupo;
}

// --- Figuro ---
export interface Figuro {
  group: THREE.Group;
  agordiVeston: (o: Vesto) => void;
  hejmo: THREE.Vector3;
  celo: THREE.Vector3;
  atendo: number;
  rapido: number;
}

// kreiRobanSxelon — Robo kun oblikva malsupra rando: la dorso pendas pli
// malsupren ol la antaŭo ( mantelo-stilo ). La antaŭa rando leviĝas V-forme,
// malfermante la robon kaj montrante la internan ĉemizon sube.
//     @param suproR ( number ) - Supra radiuso.
//     @param malsuproR ( number ) - Malsupra radiuso.
//     @param alto ( number ) - Alto de la robo.
//     @param levo ( number ) - Kiom la antaŭa rando leviĝas.
//     @returns geometrio ( THREE.BufferGeometry ) - La rob-geometrio.
function kreiRobanSxelon( suproR: number, malsuproR: number, alto: number, levo: number ): THREE.BufferGeometry {
  const geometrio = new THREE.CylinderGeometry( suproR, malsuproR, alto, 0o14, 0o1, true );
  const pozicioj = geometrio.attributes.position;
  const v = new THREE.Vector3();
  for ( let i = 0; i < pozicioj.count; i++ ) {
    v.fromBufferAttribute( pozicioj, i );
    if ( v.y < 0 ) {
      // zFrakcio: -1 malantaŭe, 0 flanke, +1 antaŭe. La kvara potenco faras
      // mallarĝan, altan V-forman levaĵon — la malfermaĵo estas alta sed ne larĝa.
      const zFrakcio = v.z / malsuproR;
      v.y += levo * Math.pow( ( zFrakcio + 0o1 ) / 0o2, 0o4 );
      pozicioj.setXYZ( i, v.x, v.y, v.z );
    }
  }
  geometrio.computeVertexNormals();
  return geometrio;
}

// kreiRondanKeston — Konstruu skatolon kun iomete rondaj anguloj ( horizontale ).
// Ronda-forma plano en XZ kun rekta vertikala ekstrudo — la anguloj de la
// silueto estas glataj, ne akraj.
//     @param largho ( number ) - Larĝo ( x ).
//     @param alto ( number ) - Alto ( y ).
//     @param profundo ( number ) - Profundo ( z ).
//     @param radio ( number ) - Radio de la rondaj anguloj.
//     @returns geometrio ( THREE.BufferGeometry ) - La ronda kesto, centrita.
function kreiRondanKeston( largho: number, alto: number, profundo: number, radio: number ): THREE.BufferGeometry {
  const formo = new THREE.Shape();
  const duonLargho = largho / 0o2, duonProfundo = profundo / 0o2, r = Math.min( radio, duonLargho, duonProfundo );
  formo.moveTo( duonLargho - r, duonProfundo );
  formo.lineTo( -duonLargho + r, duonProfundo );
  formo.quadraticCurveTo( -duonLargho, duonProfundo, -duonLargho, duonProfundo - r );
  formo.lineTo( -duonLargho, -duonProfundo + r );
  formo.quadraticCurveTo( -duonLargho, -duonProfundo, -duonLargho + r, -duonProfundo );
  formo.lineTo( duonLargho - r, -duonProfundo );
  formo.quadraticCurveTo( duonLargho, -duonProfundo, duonLargho, -duonProfundo + r );
  formo.lineTo( duonLargho, duonProfundo - r );
  formo.quadraticCurveTo( duonLargho, duonProfundo, duonLargho - r, duonProfundo );
  const geometrio = new THREE.ExtrudeGeometry( formo, { depth: alto, bevelEnabled: false, curveSegments: 0o4 } );
  // La ekstrudo iras laŭ +z; turnu por ke ĝi staru laŭ y, kun la bazo ĉe la origino.
  geometrio.rotateX( -Math.PI / 0o2 );
  geometrio.translate( 0, -alto / 0o2, 0 );
  return geometrio;
}

// kreiHaranKurtenon — Konstruu fleksitan haran kurtenon kiu ĉirkaŭas la
// malantaŭon de la kapo kaj falas ĝis la ŝultroj, kun skalopita ( pinteca )
// malsupra rando kiel harfringo. La kurteno estas pli larĝa sube, do ĝi elstaras
// ekster la roba silueto kaj restas videbla de malantaŭe.
//     @returns geometrio ( THREE.BufferGeometry ) - La har-kurteno, ĉe la kapo.
function kreiHaranKurtenon(): THREE.BufferGeometry {
  const vicoj = 0o14, kolonoj = 0o30;
  const fiMax = 22/10;        // radianoj — de la dorso ĝis la tempioj, iomete
                               // pli antaŭen por kadri la vizaĝon kaj resti ekster la manikoj
  const ySupro = 7/4, yMalsupro = 15/16;
  const rSupro = 3/16, rMalsupro = 27/64;
  const profundo = 1/8;        // kiom la fringaj pintoj pendas
  const pozicioj: number[] = [];
  const normaloj: number[] = [];
  const indeksoj: number[] = [];
  for ( let v = 0; v <= vicoj; v++ ) {
    const t = v / vicoj;
    const r = rSupro + ( rMalsupro - rSupro ) * t;
    const y = ySupro + ( yMalsupro - ySupro ) * t;
    for ( let k = 0; k <= kolonoj; k++ ) {
      const fi = -fiMax + k / kolonoj * 0o2 * fiMax;
      // La malsupra rando — neregula harfringo: pintoj kie la sinuso foras de nulo.
      const pinto = v === vicoj ? profundo * Math.abs( Math.sin( k * 0o5 * Math.PI / kolonoj ) ) : 0;
      const x = Math.sin( fi ) * r;
      const z = -Math.cos( fi ) * r;
      pozicioj.push( x, y - pinto, z );
      // Ekstera normalo — radiala horizontala direkto, for de la kapo-akso.
      normaloj.push( Math.sin( fi ), 0, -Math.cos( fi ) );
    }
  }
  for ( let v = 0; v < vicoj; v++ ) {
    for ( let k = 0; k < kolonoj; k++ ) {
      const a = v * ( kolonoj + 0o1 ) + k, b = a + 0o1;
      const c = a + kolonoj + 0o1, d = c + 0o1;
      indeksoj.push( a, b, d, a, d, c );
    }
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute( "position", new THREE.Float32BufferAttribute( pozicioj, 3 ) );
  geometrio.setAttribute( "normal", new THREE.Float32BufferAttribute( normaloj, 3 ) );
  geometrio.setIndex( indeksoj );
  return geometrio;
}

// kreiHaranFlankon — Konstruu unu flank-haran strion kadrantan la vizaĝon:
// maldika rubando kiu kurbiĝas de la tempio antaŭen-eksteren ĝis la ŝultro,
// malvastigxante al pinto malsupre.
//     @param dir ( number ) - -1 maldekstre, +1 dekstre.
//     @returns geometrio ( THREE.BufferGeometry ) - La har-strio, ĉe la tempio.
function kreiHaranFlankon( dir: number ): THREE.BufferGeometry {
  const vicoj = 0o10, kolonoj = 0o4;
  const ySupro = 99/64, yMalsupro = 35/32;
  const xEn = 3/16, xEk = 19/64;
  const zEn = 1/64, zEk = 9/32;
  const pozicioj: number[] = [];
  const indeksoj: number[] = [];
  for ( let v = 0; v <= vicoj; v++ ) {
    const t = v / vicoj;
    const y = ySupro + ( yMalsupro - ySupro ) * t;
    const duonLargho = ( 0o1 - t ) * 1/16;   // malvastigxas al pinto
    const xCentro = dir * ( xEn + ( xEk - xEn ) * t );
    const z = zEn + ( zEk - zEn ) * t;
    for ( let k = 0; k <= kolonoj; k++ ) {
      const q = k / kolonoj - 1/2;
      pozicioj.push( xCentro + q * 0o2 * duonLargho, y, z );
    }
  }
  for ( let v = 0; v < vicoj; v++ ) {
    for ( let k = 0; k < kolonoj; k++ ) {
      const a = v * ( kolonoj + 0o1 ) + k, b = a + 0o1;
      const c = a + kolonoj + 0o1, d = c + 0o1;
      indeksoj.push( a, b, d, a, d, c );
    }
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute( "position", new THREE.Float32BufferAttribute( pozicioj, 3 ) );
  geometrio.setIndex( indeksoj );
  geometrio.computeVertexNormals();
  return geometrio;
}

// konstruiFiguron — Konstruu NPC-figuron kun tavoligitaj vestoj kaj foli-manikoj.
//     @param o ( Vesto ) - La vesta objekto por koloroj.
//     @param longaHaro ( boolean = false ) - Ĉu aldoni longan har-variaĵon
//         ( ĉapo, dorsa kurteno kaj flankaj haroj ĝis la ŝultroj ).
export function konstruiFiguron(o: Vesto, longaHaro = false): Figuro {
  const g = new THREE.Group();
  const haŭto = new THREE.MeshStandardMaterial({ color: 0x605050, roughness: 45/64 });
  const kapo = new THREE.Mesh(new THREE.SphereGeometry(11/64, 0o12, 0o10), haŭto); kapo.position.y = 13/8;
  // Duflanka haro-materialo — la maldikaj har-folioj ( kurteno, flankoj ) bezonas
  // ambaŭ flankojn por ne malaperi; la ĉapo ne ĝenas per ĝi.
  const haroM = new THREE.MeshStandardMaterial({ color: 0x282818, roughness: 29/32, side: THREE.DoubleSide });
  const haro = new THREE.Mesh( new THREE.SphereGeometry(3/16, 0o12, 0o10), haroM );
  haro.scale.set(0o1, 23/32, 0o1); haro.position.y = 109/64;

  // Kolo — plenigas la breĉon inter la kapo kaj la ĉemizo, por ke neniu truo videblu.
  const kolo = new THREE.Mesh(new THREE.CylinderGeometry(3/32, 7/64, 5/32, 0o14, 0o1), haŭto); kolo.position.y = 93/64;

  const internoM = new THREE.MeshStandardMaterial({
    map: vestaTeksajxo(o, "interno"), roughness: 27/32, side: THREE.DoubleSide,
  });
  const eksteraM = new THREE.MeshStandardMaterial({
    map: vestaTeksajxo(o, "supra"), roughness: 51/64, side: THREE.DoubleSide,
  });
  const pantalonoM = new THREE.MeshStandardMaterial({
    map: vestaTeksajxo(o, "pantalono"), roughness: 51/64, side: THREE.DoubleSide,
  });
  const botoM = new THREE.MeshStandardMaterial({ color: o.botoj, roughness: 27/32 });
  // Plando — la akcenta koloro ĉe la malsupro de la ŝuo.
  const plandoM = new THREE.MeshStandardMaterial({ color: o.akcenta, roughness: 51/64 });

  // Interna ĉemizo — pli granda, iras de la kolo ĝis la talio kaj montriĝas
  // sub la antaŭa rando de la robo. La malsupro ( 31/64 ) enŝoviĝas iomete
  // sub la pantalono-supro ( 1/2 ), por ke neniu koincida rando flagru.
  const interno = new THREE.Mesh( new THREE.CylinderGeometry(3/16, 11/32, 0o1, 0o14, 0o1, true), internoM ); interno.position.y = 63/64;
  // Ekstera robo — pli granda, kun oblikva rando: la dorso pendas super la
  // pantalono ( y = 25/64 ) kaj la antaŭo leviĝas alte ( y = 73/64 ) sed mallarĝe
  // ( la flankoj restas malsupre, y ≈ 28/64 ), malfermiĝante kiel jako — sed la
  // supro restas fermita ĉirkaŭ la kolo.
  const ekstera = new THREE.Mesh( kreiRobanSxelon(7/32, 3/8, 9/8, 3/4), eksteraM ); ekstera.position.y = 61/64;

  // Pantalono — du pli dikaj kruroj, kutime hela aŭ malhela bluo kun rombaj
  // motivoj. La suproj ( 5/32 ) koincidas kun la interna ĉemiz-hemo ( 11/32 ),
  // kaj la fundoj ( 1/8 ) enŝoviĝas en la pli altajn botojn.
  const pantalonoGeometrio = new THREE.CylinderGeometry(5/32, 1/8, 3/8, 0o14, 0o1);
  const pL = new THREE.Mesh(pantalonoGeometrio, pantalonoM); pL.position.set(-3/16, 5/16, 0);
  const pR = new THREE.Mesh(pantalonoGeometrio, pantalonoM); pR.position.set(3/16, 5/16, 0);

  // Botoj — ŝafto supre de sxoforma piedo kiu etendiĝas antaŭen ( +z ), kiel
  // piedo sur homa kruro. La plando sube portas la akcentan koloron. La ŝafto
  // estas malfermita ( sen ĉapoj ) por ke neniu z-flagrado okazu.
  const botoSxafto = new THREE.CylinderGeometry(3/16, 1/8, 9/32, 0o14, 0o1, true);
  const bL1 = new THREE.Mesh(botoSxafto, botoM); bL1.position.set(-3/16, 7/32, 0);
  const bR1 = new THREE.Mesh(botoSxafto, botoM); bR1.position.set(3/16, 7/32, 0);
  // Piedo — malgranda sxoforma bloko antaŭen, kun iomete rondaj anguloj
  // ( horizontale ), por ke la ŝuo aspektu pli polurita. La malsupro ( 1/64 )
  // enŝoviĝas en la plandon ( 0 .. 1/32 ), por ke neniu koincida faco flagru.
  const piedaGeometrio = kreiRondanKeston(1/4, 3/32, 1/4, 1/16);
  const piedL = new THREE.Mesh(piedaGeometrio, botoM); piedL.position.set(-3/16, 1/16, 1/8);
  const piedR = new THREE.Mesh(piedaGeometrio, botoM); piedR.position.set(3/16, 1/16, 1/8);
  // Plando — maldika akcenta plato sub la piedo, iomete pli granda ol la piedo.
  const plandaGeometrio = kreiRondanKeston(9/32, 1/32, 5/16, 1/16);
  const plL = new THREE.Mesh(plandaGeometrio, plandoM); plL.position.set(-3/16, 1/64, 1/8);
  const plR = new THREE.Mesh(plandaGeometrio, plandoM); plR.position.set(3/16, 1/64, 1/8);

  // Tri-dimensiaj manikoj — ĉefa tubo kun akcenta ringo kaj kvarfolia tondita
  // rando. La tubo kliniĝas iomete eksteren de la korpo.
  const manikaTuboM = new THREE.MeshStandardMaterial({ color: o.ĉefa, roughness: 51/64, side: THREE.DoubleSide });
  const manikaAkcentaM = new THREE.MeshStandardMaterial({ color: o.akcenta, roughness: 6/8, side: THREE.DoubleSide });
  const sL = konstruiManikon(manikaTuboM, manikaAkcentaM);
  sL.position.set(-17/64, 91/64, 0); sL.rotation.z = -1/8;
  const sR = konstruiManikon(manikaTuboM, manikaAkcentaM);
  sR.position.set(17/64, 91/64, 0); sR.rotation.z = 1/8;

  // Longa haro — vera har-geometrio anstataŭ sferoj: pli granda ĉapo supre,
  // fleksita kurteno ĉirkaŭ la malantaŭo de la kapo kiu falas ĝis la ŝultroj
  // kun pinteca fringo, kaj du flankaj strioj kadrantaj la vizaĝon. Ĉio en la
  // sama haro-materialo.
  const longaGrupo = new THREE.Group();
  const ĉapo = new THREE.Mesh( new THREE.SphereGeometry(7/32, 0o12, 0o10), haroM );
  ĉapo.scale.set(0o1, 23/32, 0o1); ĉapo.position.y = 109/64;
  longaGrupo.add(ĉapo);
  const kurteno = new THREE.Mesh( kreiHaranKurtenon(), haroM );
  longaGrupo.add(kurteno);
  for ( const dir of [ -0o1, 0o1 ] ) {
    const flanko = new THREE.Mesh( kreiHaranFlankon( dir ), haroM );
    longaGrupo.add(flanko);
  }

  g.add(kapo, haro, kolo, interno, ekstera, pL, pR, bL1, bR1, piedL, piedR, plL, plR, sL, sR);
  if ( longaHaro ) g.add(longaGrupo);
  g.traverse(m => { if ((m as THREE.Mesh).isMesh) (m as THREE.Mesh).castShadow = true; });

  const fig: Figuro = {
    group: g,
    hejmo: new THREE.Vector3(),
    celo: new THREE.Vector3(),
    atendo: 0, rapido: 51/64,
    agordiVeston(nova: Vesto) {
      internoM.map = vestaTeksajxo(nova, "interno"); eksteraM.map = vestaTeksajxo(nova, "supra");
      pantalonoM.map = vestaTeksajxo(nova, "pantalono");
      manikaTuboM.color.setHex(nova.ĉefa); manikaAkcentaM.color.setHex(nova.akcenta);
      botoM.color.setHex(nova.botoj); plandoM.color.setHex(nova.akcenta);
      internoM.map.needsUpdate = eksteraM.map.needsUpdate = pantalonoM.map.needsUpdate = true;
    },
  };
  return fig;
}

// gxisdatigiNpc — Gxisdatigu NPC-pozicion, promenadon kaj ritmon cxiun kadron.
//     @param fig ( Figuro ) - La NPC-figuro por animacii.
//     @param deltaTempo ( number ) - Delta tempo en sekundoj.
//     @param t ( number ) - Malsupra tempo por oscedoj.
//     @param alteco ( funkcio ) - Tera alta funkcio por sekvi la terenon.
export function gxisdatigiNpc(fig: Figuro, deltaTempo: number, t: number, alteco: (x: number, z: number) => number): void {
  fig.atendo -= deltaTempo;
  if ( fig.atendo <= 0 ) {
    const a = Math.random() * Math.PI * 0o2, hazardaRadiuso = Math.random() * 0o5;
    fig.celo.set(fig.hejmo.x + Math.sin(a) * hazardaRadiuso, fig.hejmo.y, fig.hejmo.z + Math.cos(a) * hazardaRadiuso);
    fig.atendo = 0o3 + Math.random() * 0o5;
  }
  const difX = fig.celo.x - fig.group.position.x, difZ = fig.celo.z - fig.group.position.z;
  const d = Math.hypot(difX, difZ);
  if ( d > 19/64 ) {
    fig.group.position.x += difX / d * fig.rapido * deltaTempo;
    fig.group.position.z += difZ / d * fig.rapido * deltaTempo;
    fig.group.position.y = fig.group.position.y + (alteco(fig.group.position.x, fig.group.position.z) - fig.group.position.y) * 13/64;
    fig.group.rotation.y = Math.atan2(difX, difZ);
    fig.group.position.y += Math.abs(Math.sin(t * 0o6)) * 1/64;
  }
  fig.group.rotation.z = Math.sin(t * 77/64 + fig.hejmo.x) * 1/64;
}
