// NPC-modulo — figuroj vagantaj tra la sxtupurbo de ornaveth-v2
// Malalt-poligonaj figuroj kun tavoligitaj vestoj, foliaj manikoj, kvarstelo/rombo-motivoj
import * as THREE from "three";
import { deksesuma, kvarStelo, rombo, HARSTILOJ } from "../vestaro/vestoj.js";
import { kreiRondigitanRektangulanFormon } from "../komunajxoj/formoj.js";
import { kreiBuferanGeometrion } from "../komunajxoj/kunfandajxoj.js";
import type { Vesto, Harstilo } from "../vestaro/vestoj.js";

export type { Vesto };

// --- Kanvasaj helpiloj ---
// ( deksesuma, kvarStelo, rombo venas el vestoj.ts — la komuna vesta modulo )

// --- Vesta tekstura generatoro ---
// vestaTeksajxaStoko — La vestaj teksturoj estas KOMUNAJOJ ( la ekstero dependas
// nur de la vestaj koloroj kaj la parto ), do ili cacheiĝas po ( koloroj, parto ).
// La NPC-aro antaŭe pentris ĝis tri freŝajn 256×256 kanvasojn po figuro — ĝis
// preskaŭ 500 kanvasoj kaj GPU-alŝutoj por la sama malgranda aro da vestoj.
// Kun la cache la aro limiĝas al ( vestoj × partoj ) — ĉiuj figuroj kun la sama
// vesto dividas la saman teksturon, kaj agordiVeston iĝas nur serĉo.
const vestaTeksajxaStoko = new Map<string, THREE.CanvasTexture>();
const vestaTeksajxaKlavo = ( o: Vesto, speco: string ): string =>
  o.nomo + "|" + o.ĉefa + "|" + o.akcenta + "|" + o.interno + "|" + o.pantalono + "|" + speco;
function vestaTeksajxo(o: Vesto, speco: string): THREE.CanvasTexture {
  const klavo = vestaTeksajxaKlavo(o, speco);
  const cacheita = vestaTeksajxaStoko.get(klavo);
  if ( cacheita ) return cacheita;
  const kanvasa = document.createElement("canvas"); kanvasa.width = 0o400; kanvasa.height = 0o1000;
  const kunteksto = kanvasa.getContext("2d")!;
  // La pantalono uzas sian propran bazkoloron ( bluan ); la cetero la ĉefan.
  const M = deksesuma(speco === "pantalono" ? o.pantalono : o.ĉefa), A = deksesuma(o.akcenta), I = deksesuma(o.interno);
  kunteksto.fillStyle = M; kunteksto.fillRect(0, 0, 0o400, 0o1000);
  kunteksto.fillStyle = A; kunteksto.fillRect(0, 0o730, 0o400, 0o32);
  kunteksto.fillStyle = A; kunteksto.globalAlpha = 0o15/0o40; kunteksto.fillRect(0, 0o704, 0o400, 0o6); kunteksto.globalAlpha = 0o1;

  if ( speco === "supra" ) {
    // Frontaj motivoj — stelo kun rombo kaj butona plateto sur la fermita brusto.
    // La stelo ( 0o110 ± 0o44 ) restas inter la kolumaj punktoj supre kaj la
    // plateto sube, por ke neniu elemento interkovru.
    kvarStelo(kunteksto, 0o200, 0o110, 0o44, A);
    rombo(kunteksto, 0o200, 0o110, 0o60, 0o60, null, A);
    kunteksto.fillStyle = A;
    for ( let i = 0; i < 0o4; i++ ) { kunteksto.beginPath(); kunteksto.arc(0o200, 0o6 + i * 0o14, 0o4, 0, Math.PI * 0o2); kunteksto.fill(); }
    // Butona plateto — vertikala akcenta linio kun butonoj laŭ la fronta centro
    // ( jako-stilo ). Ĝi komenciĝas sub la stelo ( 0o200 ) kaj sidas alta sur la
    // fermita brusto ( super la levita fronto-hemo, y ≈ 1.14 ), por ke ĝi ne
    // malaperu en la malfermaĵo.
    kunteksto.strokeStyle = A; kunteksto.lineWidth = 0o3;
    kunteksto.beginPath(); kunteksto.moveTo(0o200, 0o200); kunteksto.lineTo(0o200, 0o230); kunteksto.stroke();
    kunteksto.fillStyle = A;
    for ( let i = 0; i < 0o3; i++ ) { kunteksto.beginPath(); kunteksto.arc(0o200, 0o200 + i * 0o22, 0o4, 0, Math.PI * 0o2); kunteksto.fill(); }
    // Dorsaj motivoj — sama stelo ĉe la kudro ( x = 0 kaj x = 0o400 ), ĉar la
    // malantaŭo estas la tekstura rando post la ŝovo ( 0o1/0o2 ).
    for ( const x of [ 0, 0o400 ] ) {
      kvarStelo(kunteksto, x, 0o130, 0o40, A);
      rombo(kunteksto, x, 0o130, 0o54, 0o54, null, A);
      kvarStelo(kunteksto, x, 0o560, 0o32, A);
    }
    // Flankaj romboj — sur la pendantaj flankoj, sub la malfermaĵo.
    rombo(kunteksto, 0o124, 0o440, 0o30, 0o40, I, A);
    rombo(kunteksto, 0o254, 0o440, 0o30, 0o40, I, A);
  } else {
    for ( let i = 0; i < 0o3; i++ ) {
      rombo(kunteksto, 0o200, 0o110 + i * 0o160, 0o40, 0o40, null, A);
      // Dorsa ripeto ĉe la kudro ( x = 0 / x = 0o400 ).
      rombo(kunteksto, 0, 0o110 + i * 0o160, 0o40, 0o40, null, A);
      rombo(kunteksto, 0o400, 0o110 + i * 0o160, 0o40, 0o40, null, A);
    }
    kunteksto.globalAlpha = 0o2/0o10; kunteksto.fillStyle = A;
    for ( let i = 0; i < 0o6; i++ ) for ( let j = 0; j < 0o3; j++ ) rombo(kunteksto, 0o40 + j * 0o130, 0o40 + i * 0o124, 0o10, 0o16, A, null);
    kunteksto.globalAlpha = 0o1;
  }
  const t = new THREE.CanvasTexture(kanvasa); t.colorSpace = THREE.SRGBColorSpace;
  // La motivoj aperu ĉe la fronto. La ŝovo ( 0o1/0o2 ) alportas la teksturcentron,
  // kie la steloj/romboj kaj la butona plateto estas, al la fronto ( +z ).
  t.wrapS = THREE.RepeatWrapping; t.offset.x = 0o1/0o2;
  vestaTeksajxaStoko.set(klavo, t);
  return t;
}

// --- Folia maniko ---
// kreiFoliaTonditanTubon — Konstruu tubon kies malsupra rando estas tondita en
// ripetatajn foliformajn lobojn. La rando mem sekvas foli-siluetojn ( pintoj
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
function kreiFoliaTonditanTubon(suproR: number, malsuproR: number, suproY: number,
  bazoY: number, segmentoj: number, loboj: number, profundo: number, nocho: number,
  fermitaSupro = false): THREE.BufferGeometry {
  const q = 0o3/0o4; // folia profilo — akra sed plena pinto
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  const ringo = segmentoj + 0o1;
  for ( let i = 0; i <= segmentoj; i++ ) {
    const ang = i / segmentoj * Math.PI * 0o2;
    const kx = Math.cos(ang), kz = Math.sin(ang);
    // Supro ringo.
    pozicioj.push(kx * suproR, suproY, kz * suproR);
    uvoj.push(i / segmentoj, 0);
    // Malsupro ringo — la folia tondo.
    const u = ( ang * loboj / ( Math.PI * 0o2 ) ) % 0o1; // 0 ĉe foli-pinto
    const v = Math.min(u, 0o1 - u) * 0o2;              // 0 pinto, 1 noĉo
    const folio = 0o1 - Math.pow(v, q);                // 1 pinto, 0 noĉo
    const y = bazoY + nocho - ( nocho + profundo ) * folio;
    pozicioj.push(kx * malsuproR, y, kz * malsuproR);
    uvoj.push(i / segmentoj, 1);
  }
  // La pozicioj estas interplektitaj ( supro_i, malsupro_i ), do ĉiu kvadrato
  // ligas la parajn suprojn ( 2i, 2i+2 ) al la neparaj malsuproj ( 2i+1, 2i+3 ).
  for ( let i = 0; i < segmentoj; i++ ) {
    const a = 0o2 * i, b = 0o2 * i + 0o2, c = 0o2 * i + 0o1, d = 0o2 * i + 0o3;
    // Ekstera orientiĝo — la normaloj montru eksteren.
    indeksoj.push(a, b, c, b, d, c);
  }
  if ( fermitaSupro ) {
    // Ĉapo — centro kaj ventumilo super la supro-ringo ( la paraj indeksoj ).
    pozicioj.push(0, suproY, 0);
    uvoj.push(0o1/0o2, 0);
    const centro = 0o2 * ringo;
    for ( let i = 0; i < segmentoj; i++ ) indeksoj.push(0o2 * i, 0o2 * i + 0o2, centro);
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

// konstruiManikon — Konstruu tri-dimensian manikon. Tubo kies malsupro estas
// tondita en ripetatajn kvar foliformajn lobojn — la rando mem sekvas foli-
// siluetojn — kun akcenta rando kiu sekvas la tondon.
//     @param ĉefaM ( THREE.Material ) - Materialo de la tubo.
//     @param akcentaM ( THREE.Material ) - Materialo de la rando.
//     @returns grupo ( THREE.Group ) - La maniko, origine ĉe la ŝultro.
function konstruiManikon(ĉefaM: THREE.Material, akcentaM: THREE.Material): THREE.Group {
  const grupo = new THREE.Group();
  const G = figurajGeometriojn();
  // La tubo — pli larĝa ĉe la ŝultro ( y = 0 ), malvastigxanta al la pojno.
  // La malsupro estas tondita en kvar foliformajn lobojn. Pintoj pendantaj ĝis
  // -0o17/0o20 kaj noĉoj leviĝantaj ĝis -0o3/0o4.
  const tubo = new THREE.Mesh(G.manikaTubo, ĉefaM);
  grupo.add(tubo);
  // La akcenta rando — maldika bandego kiu sekvas la folian tondon, iomete pli
  // larĝa ol la tubo ( 0o11/0o100 kontraŭ 0o1/0o10 ), por ke ĝi elstaru kiel rando.
  const ringo = new THREE.Mesh(G.manikaRingo, akcentaM);
  grupo.add(ringo);
  return grupo;
}

// --- Figuro ---
export interface Figuro {
  group: THREE.Group;
  agordiVeston: ( o: Vesto ) => void;
  agordiHaranStilon: ( stilo: Harstilo ) => void;
  agordiHaranKoloron: ( koloro: number ) => void;
  hejmo: THREE.Vector3;
  celo: THREE.Vector3;
  atendo: number;
  rapido: number;
  marsoFazo: number;          // akumulita marŝa fazo ( paŝa oscilo )
  movoFaktoro: number;        // 0 = staras, 1 = marŝas ( glata transiro )
  kruroj: [ THREE.Object3D, THREE.Object3D ]; // pivot-grupoj [maldekstra, dekstra]
  brakoj: [ THREE.Object3D, THREE.Object3D ]; // pivot-grupoj [maldekstra, dekstra]
}

// kreiRobanSxelon — Robo kun oblikva malsupra rando. La dorso pendas pli
// malsupren ol la antaŭo ( mantelo-stilo ). La antaŭa rando leviĝas V-forme,
// malfermante la robon kaj montrante la internan ĉemizon sube.
//     @param suproR ( number ) - Supra radiuso.
//     @param malsuproR ( number ) - Malsupra radiuso.
//     @param alto ( number ) - Alto de la robo.
//     @param levo ( number ) - Kiom la antaŭa rando leviĝas.
//     @returns geometrio ( THREE.BufferGeometry ) - La rob-geometrio.
function kreiRobanSxelon(suproR: number, malsuproR: number, alto: number, levo: number): THREE.BufferGeometry {
  const geometrio = new THREE.CylinderGeometry(suproR, malsuproR, alto, 0o14, 0o1, true);
  const pozicioj = geometrio.attributes.position;
  const v = new THREE.Vector3();
  for ( let i = 0; i < pozicioj.count; i++ ) {
    v.fromBufferAttribute(pozicioj, i);
    if ( v.y < 0 ) {
      // zFrakcio. -1 malantaŭe, 0 flanke, +1 antaŭe. La kvara potenco faras
      // mallarĝan, altan V-forman levaĵon — la malfermaĵo estas alta sed ne larĝa.
      const zFrakcio = v.z / malsuproR;
      v.y += levo * Math.pow(( zFrakcio + 0o1 ) / 0o2, 0o4);
      pozicioj.setXYZ(i, v.x, v.y, v.z);
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
function kreiRondanKeston(largho: number, alto: number, profundo: number, radio: number): THREE.BufferGeometry {
  const r = Math.min(radio, largho / 0o2, profundo / 0o2);
  // La sama mondvasta rondigita rektangulo kiel la vojoj kaj la apronoj
  // ( kreiRondigitanRektangulanFormon ), kun rekta vertikala ekstrudo.
  const geometrio = new THREE.ExtrudeGeometry(kreiRondigitanRektangulanFormon(largho, profundo, r),
    { depth: alto, bevelEnabled: false, curveSegments: 0o4 });
  // La ekstrudo iras laŭ +z; turnu por ke ĝi staru laŭ y, kun la bazo ĉe la origino.
  geometrio.rotateX(-Math.PI / 0o2);
  geometrio.translate(0, -alto / 0o2, 0);
  return geometrio;
}

// kreiHaranKurtenon — Konstruu fleksitan haran kurtenon kiu ĉirkaŭas la
// malantaŭon de la kapo kaj falas ĝis la ŝultroj, kun skalopita ( pinteca )
// malsupra rando kiel harfringo. La kurteno estas pli larĝa sube, do ĝi elstaras
// ekster la roba silueto kaj restas videbla de malantaŭe.
//     @returns geometrio ( THREE.BufferGeometry ) - La har-kurteno, ĉe la kapo.
function kreiHaranKurtenon(): THREE.BufferGeometry {
  const vicoj = 0o14, kolonoj = 0o30;
  const fiMax = 0o215/0o100;        // radianoj — de la dorso ĝis la tempioj, iomete
                               // pli antaŭen por kadri la vizaĝon kaj resti ekster la manikoj
  const ySupro = 0o7/0o4, yMalsupro = 0o17/0o20;
  const rSupro = 0o3/0o20, rMalsupro = 0o33/0o100;
  const profundo = 0o1/0o10;        // kiom la fringaj pintoj pendas
  const pozicioj: number[] = [];
  const normaloj: number[] = [];
  const indeksoj: number[] = [];
  for ( let v = 0; v <= vicoj; v++ ) {
    const t = v / vicoj;
    const r = rSupro + ( rMalsupro - rSupro ) * t;
    const y = ySupro + ( yMalsupro - ySupro ) * t;
    for ( let k = 0; k <= kolonoj; k++ ) {
      const fi = -fiMax + k / kolonoj * 0o2 * fiMax;
      // La malsupra rando — neregula harfringo. Pintoj kie la sinuso foras de nulo.
      const pinto = v === vicoj ? profundo * Math.abs(Math.sin(k * 0o4 * Math.PI / kolonoj)) : 0;
      const x = Math.sin(fi) * r;
      const z = -Math.cos(fi) * r;
      pozicioj.push(x, y - pinto, z);
      // Ekstera normalo — radiala horizontala direkto, for de la kapo-akso.
      normaloj.push(Math.sin(fi), 0, -Math.cos(fi));
    }
  }
  for ( let v = 0; v < vicoj; v++ ) {
    for ( let k = 0; k < kolonoj; k++ ) {
      const a = v * ( kolonoj + 0o1 ) + k, b = a + 0o1;
      const c = a + kolonoj + 0o1, d = c + 0o1;
      indeksoj.push(a, b, d, a, d, c);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { normaloj });
}

// kreiHaranFlankon — Konstruu unu flank-haran strion kadrantan la vizaĝon.
// maldika rubando kiu kurbiĝas de la tempio antaŭen-eksteren ĝis la ŝultro,
// malvastigxante al pinto malsupre.
//     @param dir ( number ) - -1 maldekstre, +1 dekstre.
//     @returns geometrio ( THREE.BufferGeometry ) - La har-strio, ĉe la tempio.
function kreiHaranFlankon(dir: number): THREE.BufferGeometry {
  const vicoj = 0o10, kolonoj = 0o4;
  const ySupro = 0o143/0o100, yMalsupro = 0o43/0o40;
  const xEn = 0o3/0o20, xEk = 0o23/0o100;
  const zEn = 0o1/0o100, zEk = 0o11/0o40;
  const pozicioj: number[] = [];
  const indeksoj: number[] = [];
  for ( let v = 0; v <= vicoj; v++ ) {
    const t = v / vicoj;
    const y = ySupro + ( yMalsupro - ySupro ) * t;
    const duonLargho = ( 0o1 - t ) * 0o1/0o20;   // malvastigxas al pinto
    const xCentro = dir * ( xEn + ( xEk - xEn ) * t );
    const z = zEn + ( zEk - zEn ) * t;
    for ( let k = 0; k <= kolonoj; k++ ) {
      const q = k / kolonoj - 0o1/0o2;
      pozicioj.push(xCentro + q * 0o2 * duonLargho, y, z);
    }
  }
  for ( let v = 0; v < vicoj; v++ ) {
    for ( let k = 0; k < kolonoj; k++ ) {
      const a = v * ( kolonoj + 0o1 ) + k, b = a + 0o1;
      const c = a + kolonoj + 0o1, d = c + 0o1;
      indeksoj.push(a, b, d, a, d, c);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj);
}

// har-koloroj — malhelbruna ĝis ruĝeta malhelbruna. Ĉiu NPC ricevas propran
// nuancon per hazarda mikso inter la du, por ke la homamaso ne aspektu unuforma.
const harKoloroA = new THREE.Color(0x201810); // malhelbruna
const harKoloroB = new THREE.Color(0x402818); // ruĝeta malhelbruna
const harKoloro = new THREE.Color();            // provizora miksita koloro

// ⟨ Komunaj vestaj materialoj 📃 ⟩ — la tri teksturitaj vestaj materialoj
// ( interno, supra, pantalono ) dependas nur de la vesto, ne de la figuro — ili
// cacheiĝas po vesto kaj dividiĝas inter ĉiuj figuroj kun la sama vesto. La
// unuopaj figuroj ŝanĝas nur la map-referon ( agordiVeston ), do nenia klonita
// materialo bezoniĝas. La haŭto, botoj kaj haro restas po-figuraj ( la haro
// havas hazardan koloron; la botoj-portas la vestajn nuancojn sed la rando de
// ŝanĝo ili ricevas sen kosto de la sama cacheo — vidu la botoj-plando kvaronon ).
const vestajMaterialojStoko = new Map<string, { internoM: THREE.MeshStandardMaterial; eksteraM: THREE.MeshStandardMaterial; pantalonoM: THREE.MeshStandardMaterial }>();
function vestajMaterialoj(o: Vesto): { internoM: THREE.MeshStandardMaterial; eksteraM: THREE.MeshStandardMaterial; pantalonoM: THREE.MeshStandardMaterial } {
  const klavo = o.nomo + "|" + o.ĉefa + "|" + o.akcenta + "|" + o.interno + "|" + o.pantalono;
  let m = vestajMaterialojStoko.get(klavo);
  if ( !m ) {
    m = {
      internoM: new THREE.MeshStandardMaterial({ map: vestaTeksajxo(o, "interno"), roughness: 0o33/0o40, side: THREE.DoubleSide }),
      eksteraM: new THREE.MeshStandardMaterial({ map: vestaTeksajxo(o, "supra"), roughness: 0o63/0o100, side: THREE.DoubleSide }),
      pantalonoM: new THREE.MeshStandardMaterial({ map: vestaTeksajxo(o, "pantalono"), roughness: 0o63/0o100, side: THREE.DoubleSide }),
    };
    vestajMaterialojStoko.set(klavo, m);
  }
  return m;
}

// ⟨ Konstantaj geometrioj 📃 ⟩ — la figuroj de ĉiuj NPC-oj uzas la SAMAJN
// formojn ( la kapo, la kolo, la robo, la pantalono, la botoj ktp. ), do ili
// konstruiĝas UNUFOJE ĉi tie kaj dividiĝas. Antaŭe ĉiu el la 150+ figuroj
// asignis ĉirkaŭ dudek proprajn geometriojn — la konstruo estis la plej peza
// parto de la urba ŝarĝo. La botoj-plando kaj la manikoj restas en la figuro
// ( la manikoj uzas la vestajn kolorojn ), do ili kreiĝas po figuro.
let figurajGeometrioj: {
  kapa: THREE.BufferGeometry;
  kola: THREE.BufferGeometry;
  roba: THREE.BufferGeometry;
  pantalona: THREE.BufferGeometry;
  botaSxafto: THREE.BufferGeometry;
  pieda: THREE.BufferGeometry;
  planda: THREE.BufferGeometry;
  manikaTubo: THREE.BufferGeometry;
  manikaRingo: THREE.BufferGeometry;
  haroĈapoMallonga: THREE.BufferGeometry;   // la mallonga har-ĉapo ( radiuso 0o3/0o20 )
  haroĈapoLonga: THREE.BufferGeometry;      // la longa har-ĉapo ( radiuso 0o7/0o40 )
  haroKurteno: THREE.BufferGeometry;        // la longa-hara kurteno
  haroFlanko: [ THREE.BufferGeometry, THREE.BufferGeometry ];  // la flank-strioj ( maldekstra, dekstra )
} | null = null;
function figurajGeometriojn(): NonNullable<typeof figurajGeometrioj> {
  if ( figurajGeometrioj ) return figurajGeometrioj;
  figurajGeometrioj = {
    kapa: new THREE.SphereGeometry(0o13/0o100, 0o10, 0o10),
    kola: new THREE.CylinderGeometry(0o3/0o40, 0o7/0o100, 0o5/0o40, 0o14, 0o1),
    roba: kreiRobanSxelon(0o7/0o40, 0o3/0o10, 0o11/0o10, 0o3/0o4),
    pantalona: new THREE.CylinderGeometry(0o5/0o40, 0o1/0o10, 0o3/0o10, 0o14, 0o1),
    botaSxafto: new THREE.CylinderGeometry(0o3/0o20, 0o1/0o10, 0o11/0o40, 0o14, 0o1, true),
    pieda: kreiRondanKeston(0o1/0o4, 0o3/0o40, 0o1/0o4, 0o1/0o20),
    planda: kreiRondanKeston(0o11/0o40, 0o1/0o40, 0o5/0o20, 0o1/0o20),
    manikaTubo: kreiFoliaTonditanTubon(0o5/0o40, 0o1/0o10, 0, -0o15/0o20, 0o60, 0o4, 0o1/0o10, 0o1/0o20, true),
    manikaRingo: kreiFoliaTonditanTubon(0o11/0o100, 0o11/0o100, -0o13/0o20, -0o15/0o20, 0o60, 0o4, 0o1/0o10, 0o1/0o20),
    haroĈapoMallonga: new THREE.SphereGeometry(0o3/0o20, 0o10, 0o10),
    haroĈapoLonga: new THREE.SphereGeometry(0o7/0o40, 0o10, 0o10),
    haroKurteno: kreiHaranKurtenon(),
    haroFlanko: [ kreiHaranFlankon(-0o1), kreiHaranFlankon(0o1) ],
  };
  return figurajGeometrioj;
}

// konstruiHaranGrupon — Konstruu la geometrion de unu har-stilo. La ĉapo estas
// komuna al ĉiuj stiloj ( krom la longa, kiu uzas sian propran pli grandan
// ĉapon ); la longa aldonas sian kurtenon super ĝi. Nekonata stilo falas reen
// al la mallonga ĉapo.
//     @param stilo ( Harstilo ) - La stilo por konstrui.
//     @param haroM ( THREE.Material ) - La komuna haro-materialo.
//     @returns grupo ( THREE.Group ) - La har-grupo, ĉe la kapo.
function konstruiHaranGrupon(stilo: Harstilo, haroM: THREE.Material): THREE.Group {
  const grupo = new THREE.Group();
  const G = figurajGeometriojn();
  const ĉapo = ( geo: THREE.BufferGeometry ) => {
    const m = new THREE.Mesh(geo, haroM);
    m.scale.set(0o1, 0o27/0o40, 0o1); m.position.y = 0o155/0o100;
    grupo.add(m);
  };
  if ( stilo.nomo === "haroLonga" ) {
    // Pli granda ĉapo, fleksita kurteno ĉirkaŭ la malantaŭo de la kapo falanta
    // ĝis la ŝultroj kun pinteca fringo, kaj du flankaj strioj kadrantaj la
    // vizaĝon.
    ĉapo(G.haroĈapoLonga);
    grupo.add(new THREE.Mesh(G.haroKurteno, haroM));
    for ( const flanko of G.haroFlanko ) {
      grupo.add(new THREE.Mesh(flanko, haroM));
    }
  } else {
    // Mallonga ( kaj nekonataj ŝlosiloj ) — simpla ĉapo.
    ĉapo(G.haroĈapoMallonga);
  }
  return grupo;
}

// konstruiFiguron — Konstruu NPC-figuron kun tavoligitaj vestoj, foli-manikoj
// kaj har-stiloj. Ĉiuj har-stiloj estas konstruitaj ( nur la elektita videbla ),
// por ke agordiHaron povu ŝanĝi la stilon poste sen rekonstruado.
//     @param o ( Vesto ) - La vesta objekto por koloroj.
//     @param haroKlavo ( string = "haroMalalta" ) - La ŝlosilo de la elektita
//         har-stilo ( sama kiel la nomo en HARSTILOJ ).
export function konstruiFiguron(o: Vesto, haroKlavo = "haroMalalta"): Figuro {
  const g = new THREE.Group();
  const G = figurajGeometriojn();
  const haŭto = new THREE.MeshStandardMaterial({ color: 0x605050, roughness: 0o55/0o100 });
  const kapo = new THREE.Mesh(G.kapa, haŭto); kapo.position.y = 0o15/0o10;
  // Duflanka haro-materialo — la maldikaj har-folioj ( kurteno, flankoj ) bezonas
  // ambaŭ flankojn por ne malaperi; la ĉapo ne ĝenas per ĝi. La koloro miksiĝas
  // hazarde inter malhelbruna kaj ruĝeta malhelbruna por ĉiu NPC.
  harKoloro.lerpColors(harKoloroA, harKoloroB, Math.random());
  const haroM = new THREE.MeshStandardMaterial({ color: harKoloro, roughness: 0o35/0o40, side: THREE.DoubleSide });

  // Kolo — plenigas la breĉon inter la kapo kaj la ĉemizo, por ke neniu truo videblu.
  const kolo = new THREE.Mesh(G.kola, haŭto); kolo.position.y = 0o135/0o100;

  // La vestaj materialoj venas el la komuna cacheo — la sama vesto dividas ilin
  // inter ĉiuj figuroj ( vidu vestajMaterialoj supre ).
  const { internoM, eksteraM, pantalonoM } = vestajMaterialoj(o);
  const botoM = new THREE.MeshStandardMaterial({ color: o.botoj, roughness: 0o33/0o40 });
  // Plando — la akcenta koloro ĉe la malsupro de la ŝuo.
  const plandoM = new THREE.MeshStandardMaterial({ color: o.akcenta, roughness: 0o63/0o100 });

  // Interna ĉemizo — pli granda, iras de la kolo ĝis la talio kaj montriĝas
  // sub la antaŭa rando de la robo. La malsupro ( 0o37/0o100 ) enŝoviĝas iomete
  // sub la pantalono-supro ( 0o1/0o2 ), por ke neniu koincida rando flagru.
  const interno = new THREE.Mesh(new THREE.CylinderGeometry(0o3/0o20, 0o13/0o40, 0o1, 0o14, 0o1, true), internoM); interno.position.y = 0o77/0o100;
  // Ekstera robo — pli granda, kun oblikva rando. La dorso pendas super la
  // pantalono ( y = 0o31/0o100 ) kaj la antaŭo leviĝas alte ( y = 0o111/0o100 ) sed mallarĝe
  // ( la flankoj restas malsupre, y ≈ 0o34/0o100 ), malfermiĝante kiel jako — sed la
  // supro restas fermita ĉirkaŭ la kolo.
  const ekstera = new THREE.Mesh(G.roba, eksteraM); ekstera.position.y = 0o75/0o100;

  // Pantalono — du pli dikaj kruroj, kutime hela aŭ malhela bluo kun rombaj
  // motivoj. La suproj ( 0o5/0o40 ) koincidas kun la interna ĉemiz-hemo ( 0o13/0o40 ),
  // kaj la fundoj ( 0o1/0o10 ) enŝoviĝas en la pli altajn botojn.
  const pantalonoGeometrio = G.pantalona;
  // Kruroj — ĉiu kruro ( pantalono + ŝafto + piedo + plando ) sidas en sia
  // propra pivot-grupo ĉe la kokso ( la supro de la pantalono ), por ke la
  // kruroj povu svingiĝi antaŭen/malantaŭen ĉirkaŭ la kokso dum marŝado. La
  // lokaj ofsetoj reproduktas la originajn poziciojn kiam la grupo ne turniĝas.
  const koksoY = 0o5/0o20;
  const kruroL = new THREE.Group(); kruroL.position.y = koksoY;
  const kruroR = new THREE.Group(); kruroR.position.y = koksoY;
  const pL = new THREE.Mesh(pantalonoGeometrio, pantalonoM); pL.position.set(-0o3/0o20, 0, 0);
  const pR = new THREE.Mesh(pantalonoGeometrio, pantalonoM); pR.position.set(0o3/0o20, 0, 0);

  // Botoj — ŝafto supre de sxoforma piedo kiu etendiĝas antaŭen ( +z ), kiel
  // piedo sur homa kruro. La plando sube portas la akcentan koloron. La ŝafto
  // estas malfermita ( sen ĉapoj ) por ke neniu z-flagrado okazu.
  const botoSxafto = G.botaSxafto;
  const bL1 = new THREE.Mesh(botoSxafto, botoM); bL1.position.set(-0o3/0o20, -0o3/0o40, 0);
  const bR1 = new THREE.Mesh(botoSxafto, botoM); bR1.position.set(0o3/0o20, -0o3/0o40, 0);
  // Piedo — malgranda sxoforma bloko antaŭen, kun iomete rondaj anguloj
  // ( horizontale ), por ke la ŝuo aspektu pli polurita. La malsupro ( 0o1/0o100 )
  // enŝoviĝas en la plandon ( 0 .. 0o1/0o40 ), por ke neniu koincida faco flagru.
  const piedaGeometrio = G.pieda;
  const piedL = new THREE.Mesh(piedaGeometrio, botoM); piedL.position.set(-0o3/0o20, -0o1/0o4, 0o1/0o10);
  const piedR = new THREE.Mesh(piedaGeometrio, botoM); piedR.position.set(0o3/0o20, -0o1/0o4, 0o1/0o10);
  // Plando — maldika akcenta plato sub la piedo, iomete pli granda ol la piedo.
  const plandaGeometrio = G.planda;
  const plL = new THREE.Mesh(plandaGeometrio, plandoM); plL.position.set(-0o3/0o20, -0o23/0o100, 0o1/0o10);
  const plR = new THREE.Mesh(plandaGeometrio, plandoM); plR.position.set(0o3/0o20, -0o23/0o100, 0o1/0o10);
  kruroL.add(pL, bL1, piedL, plL);
  kruroR.add(pR, bR1, piedR, plR);

  // Tri-dimensiaj manikoj — ĉefa tubo kun akcenta ringo kaj kvarfolia tondita
  // rando. La tubo kliniĝas iomete eksteren de la korpo.
  const manikaTuboM = new THREE.MeshStandardMaterial({ color: o.ĉefa, roughness: 0o63/0o100, side: THREE.DoubleSide });
  const manikaAkcentaM = new THREE.MeshStandardMaterial({ color: o.akcenta, roughness: 0o6/0o10, side: THREE.DoubleSide });
  // Brakoj — ĉiu maniko sidas en pivot-grupo ĉe la ŝultro, por ke la brakoj
  // povu svingiĝi kontraŭfaze al la kruroj dum marŝado. La originala ekstera
  // klino ( rotation.z ) restas sur la maniko mem ene de la grupo.
  const brakoL = new THREE.Group(); brakoL.position.set(-0o21/0o100, 0o133/0o100, 0);
  const brakoR = new THREE.Group(); brakoR.position.set(0o21/0o100, 0o133/0o100, 0);
  const sL = konstruiManikon(manikaTuboM, manikaAkcentaM); sL.rotation.z = -0o1/0o10;
  const sR = konstruiManikon(manikaTuboM, manikaAkcentaM); sR.rotation.z = 0o1/0o10;
  brakoL.add(sL); brakoR.add(sR);

  // ⟨ Har-stiloj ⟩
  // Ĉiu stilo estas aparta grupo konstruita ĉiam ( ne nur la elektita ), por
  // ke agordiHaron povu ŝanĝi la stilon poste sen rekonstrui la geometriojn.
  // La grupoj estas konstruitaj per HARSTILOJ ( la sama listo kiel la vestara
  // UI ), do la ŝlosiloj neniam povas disiĝi. Nekonata ŝlosilo falas reen al
  // la mallonga ĉapo.
  const haroGrupoj = new Map<string, THREE.Group>();
  for ( const stilo of HARSTILOJ ) haroGrupoj.set(stilo.nomo, konstruiHaranGrupon(stilo, haroM));
  const aktivaHaro = haroGrupoj.has(haroKlavo) ? haroKlavo : "haroMalalta";

  g.add(kapo, kolo, interno, ekstera, kruroL, kruroR, brakoL, brakoR);

  for ( const [ klavo, grupo ] of haroGrupoj ) {
    grupo.visible = klavo === aktivaHaro;
    g.add(grupo);
  }
  g.traverse(m => { if ( ( m as THREE.Mesh ).isMesh ) (m as THREE.Mesh).castShadow = true; });

  const fig: Figuro = {
    group: g,
    hejmo: new THREE.Vector3(),
    celo: new THREE.Vector3(),
    atendo: 0, rapido: 0o63/0o100,
    marsoFazo: Math.random() * Math.PI * 0o2,
    movoFaktoro: 0,
    kruroj: [ kruroL, kruroR ],
    brakoj: [ brakoL, brakoR ],
    agordiVeston(nova: Vesto) {
      // La vestaj materialoj estas KOMUNAJ ( cacheitaj po vesto kaj dividitaj
      // inter ĉiuj figuroj ), do ili NE mutacieblas ĉi tie — alie ĉiu figuro
      // kun la sama vesto ŝanĝiĝus kune. Anstataŭe la MESH-OJ de ĉi tiu figuro
      // prenas la materialojn de la nova vesto el la cacheo ( nur referoj;
      // neniu kanvaso repentiĝas, neniu needsUpdate sur la teksturoj ).
      const novaVesta = vestajMaterialoj(nova);
      interno.material = novaVesta.internoM;
      ekstera.material = novaVesta.eksteraM;
      pL.material = novaVesta.pantalonoM;
      pR.material = novaVesta.pantalonoM;
      // La manikoj kaj botoj estas po-figuraj materialoj — iliaj koloroj
      // ŝanĝiĝas rekte ( ili portas la vestajn nuancojn de ĉi tiu figuro sole ).
      manikaTuboM.color.setHex(nova.ĉefa); manikaAkcentaM.color.setHex(nova.akcenta);
      botoM.color.setHex(nova.botoj); plandoM.color.setHex(nova.akcenta);
    },
    agordiHaranStilon(stilo: Harstilo) {
      const aktiva = haroGrupoj.has(stilo.nomo) ? stilo.nomo : "haroMalalta";
      for ( const [ klavo, grupo ] of haroGrupoj ) grupo.visible = klavo === aktiva;
    },
    agordiHaranKoloron(koloro: number) {
      // La koloro estas sendependa de la stilo — la haro-materialo estas komuna.
      haroM.color.setHex(koloro);
    },
  };
  return fig;
}

// gxisdatigiNpc — Gxisdatigu NPC-pozicion, promenadon kaj ritmon cxiun kadron.
// Dum la figuro moviĝas, la kruroj svingiĝas kontraŭfaze ĉirkaŭ la koksoj kaj
// la brakoj kontraŭe al la samflanka kruro; starante, la brakoj nur balanciĝas
// iomete. Transiroj inter stari kaj marŝi estas glataj ( movoFaktoro ).
//     @param fig ( Figuro ) - La NPC-figuro por animacii.
//     @param deltaTempo ( number ) - Delta tempo en sekundoj.
//     @param t ( number ) - Malsupra tempo por oscedoj.
//     @param alteco ( funkcio ) - Tera alta funkcio por sekvi la terenon.
//     @param suprajxo ( funkcio ) - La piedebla supraĵo ( la vojoj, dokoj ) —
//         plena ol la tereno. La NPC-oj sekvas ĝin, do ili paŝas SUR la
//         pavimajn vojojn anstataŭ trairi ilin kiel la kruda tero sube.
// marŝSvingo — La komuna marŝa ritmo de ĉiuj figuroj ( ludanto, foraj ludantoj,
// NPC-oj ) — kontraŭfazaj kruroj kaj brakoj plus la eta paŝa bobado. La sama
// ritmo kiel la fotila bobado; movo = 0 donas la silentan sidan/sinkan pozon.
export function marŝSvingo(fig: Pick<Figuro, "group" | "kruroj" | "brakoj">, paso: number, movo: number): void {
  const svingoKruro = 0o3/0o10 * movo * paso;
  fig.kruroj[0].rotation.x = -svingoKruro;
  fig.kruroj[1].rotation.x = svingoKruro;
  const svingoBrako = 0o2/0o10 * movo * paso;
  fig.brakoj[0].rotation.x = svingoBrako;
  fig.brakoj[1].rotation.x = -svingoBrako;
  fig.group.position.y += Math.abs(paso) * 0o2/0o100 * movo;
}

export function gxisdatigiNpc(fig: Figuro, deltaTempo: number, t: number,
  alteco: ( x: number, z: number ) => number,
  suprajxo?: ( x: number, z: number ) => number): void {
  fig.atendo -= deltaTempo;
  if ( fig.atendo <= 0 ) {
    const a = Math.random() * Math.PI * 0o2, hazardaRadiuso = Math.random() * 0o4;
    // Celu la piedeblan supraĵon, ne la krudan terenon — la vojoj estas
    // levitaj platformoj, do supraĵa celo tenas la marŝon sur la pavimon
    // ( la sekva grundo-kvanto tendencas al la pli alta vojo ).
    const cx = fig.hejmo.x + Math.sin(a) * hazardaRadiuso, cz = fig.hejmo.z + Math.cos(a) * hazardaRadiuso;
    const cy = suprajxo ? suprajxo(cx, cz) : alteco(cx, cz);
    fig.celo.set(cx, Number.isFinite(cy) ? Math.max(cy, alteco(cx, cz)) : alteco(cx, cz), cz);
    fig.atendo = 0o3 + Math.random() * 0o4;
  }
  const difX = fig.celo.x - fig.group.position.x, difZ = fig.celo.z - fig.group.position.z;
  const d = Math.hypot(difX, difZ);
  const movas = d > 0o23/0o100;
  // Glata transiro 0..1 inter stari kaj marŝi, por ke la svingoj ne saltu
  // kiam la figuro ekpaŝas aŭ haltas.
  fig.movoFaktoro += ( ( movas ? 0o1 : 0 ) - fig.movoFaktoro ) * Math.min(0o1, deltaTempo * 0o10);
  const movo = fig.movoFaktoro;
  // La marŝa fazo progresas nur dum la figuro moviĝas; pli rapidaj figuroj
  // paŝas pli ofte, kaj ĉiu havas propran fazo-ofseton ( marsoFazo ekvaloro ).
  fig.marsoFazo += deltaTempo * fig.rapido * 0o4 * movo;
  const paso = Math.sin(fig.marsoFazo);
  if ( movas ) {
    fig.group.position.x += difX / d * fig.rapido * deltaTempo;
    fig.group.position.z += difZ / d * fig.rapido * deltaTempo;
    // Sekvu la supraĵon ( vojoj + dokoj ) kiam ĝi kuŝas super la tereno —
    // la glata 0o15/0o100-eca blendado transiras la vojajn ramplojn.
    const teroY = alteco(fig.group.position.x, fig.group.position.z);
    const celoY = suprajxo ? Math.max(teroY, suprajxo(fig.group.position.x, fig.group.position.z)) : teroY;
    fig.group.position.y = fig.group.position.y + ( celoY - fig.group.position.y ) * 0o15/0o100;
    fig.group.rotation.y = Math.atan2(difX, difZ);
  }
  // Sta-svingo — eta balancado nur kiam oni staras, por ke la figuro ne ŝtoniĝu.
  fig.group.rotation.z = Math.sin(t * 0o115/0o100 + fig.hejmo.x) * 0o1/0o100 * ( 0o1 - movo );
  // Krura kaj braka svingo plus paŝa bobado — la komuna marŝa ritmo.
  const idlaBrako = Math.sin(t * 0o7 + fig.hejmo.z) * 0o2/0o100 * ( 0o1 - movo );
  marŝSvingo(fig, paso, movo);
  fig.brakoj[0].rotation.x += idlaBrako;
  fig.brakoj[1].rotation.x -= idlaBrako;
}
