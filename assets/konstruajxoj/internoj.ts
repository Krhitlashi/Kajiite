// Interna modulo — pluretagxaj internaj spacoj por piediri tra ili
// Rezajnita por kongrui al la malhel-verda/oro satala estetiko de Priskribo.md.
//   • Muroj en la sama koloro kiel la eksteraj muroj de la konstruajxo, varmaj oraj kadroj ( #d8b068 )
//   • Nesimetraj rondigitaj anguloj (32px/16px)
//   • Dikaj oraj angulaj kadroj kiuj flairas eksteren supre
//   • Longaj horizontalaj rondigitaj fenestroj
//   • Rondigita trapeza porda arko sur teretaĝo
//   • Varma atmosfera ora lumigado
//   • Vertikalaj skriptplatoj de malsupro al supro
//   • Minimalismaj rondangulaj mebloj kun oraj akcentoj

import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { KonstruSpec, TIPARO } from "./satalaj-konstruajxoj.js";
import { generiSkribanTeksajxon } from "../komunajxoj/skripto-rivelilo.js";
import { kreiPilolFenestranFormon } from "../komunajxoj/formoj.js";
import { deksesuma } from "../vestaro/vestoj.js";
import { nomoAih } from "../../src/tradukoj.js";
import { kreiMangxajxojn, MangxajxItemo, aldoniVaporon } from "../mebloj/mangxajxoj.js";
import { aldoniTablon, aldoniSegxon, LIGNA_KOLORO } from "../mebloj/tabloj.js";

export interface PlankoInfo {
  /** Y-nivelo de la planko */
  y: number;
  /** Duon-largho de la etaĝa spaco */
  hw: number;
  /** Duon-profundo de la etaĝa spaco */
  hd: number;
  /** Alto de la etaĝo */
  alto: number;
}

export interface HeliksoInfo {
  /** Radiuso de la centra kolono */
  rKol: number;
  /** Ekstera radiuso de la ŝtuparo */
  rEkster: number;
  /** Paŝoj po plena turno */
  perTurno: number;
  /** Alto de unu plena turno ( = tieroAlto ) */
  turnoAlto: number;
  /** Alto de unu sub-tera plena turno ( = tieroAltoSub ) */
  turnoAltoSub: number;
  /** Nombro da supraj plenaj turnoj ( = niveloj - 1 ) */
  turnoj: number;
  /** Nombro da sub-teraj plenaj turnoj ( = sube ) */
  turnojSube: number;
}

// heliksaAltecxo — Alteco de kontinua turno sur la spiralo. Pozitivaj turnoj
// supren laŭ turnoAlto, negativaj malsupren laŭ turnoAltoSub.
export function heliksaAltecxo(h: HeliksoInfo, turno: number): number {
  return turno >= 0 ? turno * h.turnoAlto : turno * h.turnoAltoSub;
}

export interface InternaEnirPunkto {
  x: number;
  z: number;
  y: number;
  direkto: number;
}

export interface InternaSistemo {
  currentGroup: THREE.Group | null;
  animated: { update: (t: number) => void }[];
  plankoj: PlankoInfo[];
  helikso: HeliksoInfo | null;
  manĝaĵoj: MangxajxItemo[];
  vaporNuboj: { cloud: THREE.Points; basePos: THREE.Vector3; ph: number }[];
}

// Dezajnaj konstantaj valoroj
const MIST = 0xe6efe9;
const DIM = 0x9db8a4;
const GOLD = 0xd9b36a;
const GOLD_SOFT = 0xc8a45a;
const GOLD_WARM = 0xf8d898;

// kreiTrapezanPordTruon — Rondigita trapezoida truo por la antaŭa pordo,
// kongruanta al la EKSTERAN pordo (rondigitaTrapezaFormo en satalaj-konstruaĵoj).
// CW-orde (kontraŭa al la ekstera konturo) por truo en ShapeGeometry/ExtrudeGeometry.
function kreiTrapezanPordTruon( bazo: number, supro: number, alto: number, rb: number, rt: number ): THREE.Path {
  const p = new THREE.Path(), sl = ( bazo / 2 - supro / 2 ) / alto;
  p.moveTo( -bazo / 2 + rb, 0 );
  p.quadraticCurveTo( -bazo / 2, 0, -bazo / 2 + sl * rb, rb );
  p.lineTo( -supro / 2 - sl * rt, alto - rt );
  p.quadraticCurveTo( -supro / 2, alto, -supro / 2 + rt, alto );
  p.lineTo( supro / 2 - rt, alto );
  p.quadraticCurveTo( supro / 2, alto, supro / 2 + sl * rt, alto - rt );
  p.lineTo( bazo / 2 - sl * rt, rt );
  p.quadraticCurveTo( bazo / 2, 0, bazo / 2 - rb, 0 );
  p.closePath();
  return p;
}// konstruiMuronKunPilolaTruo — Muro el fidindaj skatol-segmentoj ( kiuj plene
// kovras la muron ) kun kvar rondigitaj angulaj plenigaĵoj, por ke la malkovro
// kongruu precize al la pilola fenestro sen akraj rektangulaj anguloj.
// ( La malnova unupe ekstrudita panelo kun pilola truo ne kovris la murojn
// fidinde — la skatol-segmentoj estas la originala, pruvita konstruo. )
function konstruiMuronKunPilolaTruo(
  g: THREE.Group,
  plataLargho: number,
  bazaY: number,
  alto: number,
  dikeco: number,
  ww: number,
  hh: number,
  fenY: number,
  materialo: THREE.MeshStandardMaterial,
  cx: number,
  cz: number,
  rotacio = 0
): void {
  const wc = ww / 2;
  const fenLokY = fenY - bazaY;
  const segLargho = plataLargho - ww / 2;
  const segAlto = alto - (fenLokY + hh);

  // Skatola segmento en la mura loka kadro ( x laŭ la muro, y vertikala ).
  const aldoniBlokon = ( lokalX: number, lokalY: number, largho: number, alteco: number ) => {
    if ( largho <= 0 || alteco <= 0 ) return;
    const b = new THREE.Mesh( new THREE.BoxGeometry( largho, alteco, dikeco ), materialo );
    if ( rotacio ) {
      b.position.set( cx, bazaY + lokalY + alteco / 2, cz + lokalX + largho / 2 );
      b.rotation.y = rotacio;
    } else {
      b.position.set( cx + lokalX + largho / 2, bazaY + lokalY + alteco / 2, cz );
    }
    g.add( b );
  };
  // Rondigita angula plenigaĵo ( formo sen truo — malgranda, fidinda ).
  const aldoniAngulon = ( formo: THREE.Shape, cxLoka: number, cyLoka: number ) => {
    const geo = new THREE.ExtrudeGeometry( formo, { depth: dikeco, bevelEnabled: false, curveSegments: 0o20 } );
    geo.translate( 0, 0, -dikeco / 2 );
    const m = new THREE.Mesh( geo, materialo );
    if ( rotacio ) {
      // Por rotacio +90° ( la maldekstra muro ) la loka +x-akso mapiĝas al mondo −z,
      // dum la cxLoka-ofseto iras laŭ +z — sen la spegulo la angulaj formoj renversiĝus
      // ( renversitaj duoncirkelaj anguloj ĉe la fenestro maldekstre de la pordo ).
      m.position.set( cx, bazaY + cyLoka, cz + ( rotacio > 0 ? -cxLoka : cxLoka ) );
      m.rotation.y = rotacio;
    } else {
      m.position.set( cx + cxLoka, bazaY + cyLoka, cz );
    }
    g.add( m );
  };

  // Malsegmentoj maldekstre/dekstre de la fenestro
  if ( segLargho > 0 ) {
    aldoniBlokon( -plataLargho, 0, segLargho, alto );
    aldoniBlokon( wc, 0, segLargho, alto );
  }
  // Malsegmentoj sub kaj super la fenestro
  if ( fenLokY > 0 ) aldoniBlokon( -wc, 0, ww, fenLokY );
  if ( segAlto > 0 ) aldoniBlokon( -wc, fenLokY + hh, ww, segAlto );

  // Kvar rondigitaj angulaj plenigaĵoj. La regiono inter la rektangula truo kaj
  // la duoncirklaj ĉap-finoj de la pilola fenestro. Ĉiu formo estas konstruita
  // en sia propra loka kadro ( centrita je la angula centro ) kaj metita per
  // aldoniAngulon ĉe la koresponda angulo.
  const r = hh / 2;
  const cyArk = fenLokY + r;
  // Ĉiu plenigaĵo estas kvadrato r×r kun kvaroncirkla arko kuŝanta sur la
  // ĉap-cirklo de la pilola fenestro — la plenigaĵo restas en la muro, ekster
  // la malfermo. La arko-centro estas la angulo de la rektangula truo plej
  // proksima al la fenestra ĉap-centro ( lokalaj (∓r/2, ∓r/2) sube-dekstre ).
  // Supre-dekstre
  const tr = new THREE.Shape();
  tr.moveTo( r / 2, -r / 2 );
  tr.lineTo( r / 2, r / 2 );
  tr.lineTo( -r / 2, r / 2 );
  tr.absarc( -r / 2, -r / 2, r, Math.PI / 2, 0, true );
  tr.closePath();
  aldoniAngulon( tr, wc - r / 2, cyArk + r / 2 );
  // Malsupre-dekstre
  const br = new THREE.Shape();
  br.moveTo( r / 2, r / 2 );
  br.lineTo( r / 2, -r / 2 );
  br.lineTo( -r / 2, -r / 2 );
  br.absarc( -r / 2, r / 2, r, -Math.PI / 2, 0, false );
  br.closePath();
  aldoniAngulon( br, wc - r / 2, cyArk - r / 2 );
  // Supre-maldekstre
  const tl = new THREE.Shape();
  tl.moveTo( -r / 2, -r / 2 );
  tl.lineTo( -r / 2, r / 2 );
  tl.lineTo( r / 2, r / 2 );
  tl.absarc( r / 2, -r / 2, r, Math.PI / 2, Math.PI, false );
  tl.closePath();
  aldoniAngulon( tl, -( wc - r / 2 ), cyArk + r / 2 );
  // Malsupre-maldekstre
  const bl = new THREE.Shape();
  bl.moveTo( -r / 2, r / 2 );
  bl.lineTo( -r / 2, -r / 2 );
  bl.lineTo( r / 2, -r / 2 );
  bl.absarc( r / 2, r / 2, r, -Math.PI / 2, -Math.PI, true );
  bl.closePath();
  aldoniAngulon( bl, -( wc - r / 2 ), cyArk - r / 2 );
}

// aldoniLonganFenestron — Unu centrita LONGAs horizontala RONDIGITA fenestro kun
// ora pilola kadro sur muro.
// orientacio. "malantaŭ" ( fakas +z ), "maldekstra" ( fakas +x ), "dekstra" ( fakas -x ).
function aldoniLonganFenestron(
  group: THREE.Group,
  cx: number, cz: number, bazaY: number, alto: number,
  plataLargho: number,
  orientacio: "malantaŭ" | "maldekstra" | "dekstra",
  muraMaterialo: THREE.MeshStandardMaterial,
  fenestraMaterialo: THREE.MeshStandardMaterial,
  oraRandoMaterialo: THREE.MeshBasicMaterial,
  oraKadroMaterialo: THREE.LineBasicMaterial
): void {
  // Fenestro-larĝo laŭ la tavolflanko. Pli longa sur pli longaj muroj, kun
  // malgranda libero ĉe ĉiu fino (2/3 de la flanko + kvarono).
  const ww = Math.min(plataLargho * 2 - 0o3/0o10, plataLargho * 4/3 + 0o1/0o4);
  const hh = Math.min(0o5/0o10, alto * 0o3/0o12);
  const fenY = bazaY + Math.max(alto * 2/5, 0o3/0o4);
  if (fenY + hh > bazaY + alto) return;
  const malantaŭ = orientacio === "malantaŭ";
  const rotacio = orientacio === "dekstra" ? -Math.PI / 2 : Math.PI / 2;
  // La vitra panelo kaj ora kadro sidas ĉe la ĉambro-flanko de la muro (ne en ĝia centro)
  const ofseto = 0o3/0o40;
  const aCx = malantaŭ ? cx : cx + (orientacio === "dekstra" ? -ofseto : ofseto);
  const aCz = malantaŭ ? cz + ofseto : cz;
  const dikeco = 0o3/0o20;
  // Unu muro kun rondigita (pilola) truo — la malkovro kongruas precize al la
  // pilola fenestro, sen akraj rektangulaj anguloj. La malantaŭa muro restas
  // nerotaciita ( rotacio validas nur por la flankaj muroj ).
  konstruiMuronKunPilolaTruo(group, plataLargho, bazaY, alto, dikeco, ww, hh, fenY, muraMaterialo, cx, cz, malantaŭ ? 0 : rotacio);
  // Vitra panelo (pilola formo) + ora pilola rando — Densa sampado por ke la
  // duoncirkloj estu glate rondaj, ne facetaj.
  const fenGeo = new THREE.ShapeGeometry(kreiPilolFenestranFormon(ww, hh), 0o100);
  const fen = new THREE.Mesh(fenGeo, fenestraMaterialo);
  fen.position.set(aCx, fenY, aCz);
  if (!malantaŭ) fen.rotation.y = rotacio;
  group.add(fen);
  // Ora pilola rando ĉirkaŭ la tuta fenestro (tubo laŭ la konturo). Densa
  // sampado kun CENTRIPETA kurbo — la rando ne ondas/elstaras ĉe la rektaj
  // flankoj de la pilolo (la malnova uniforma tensio tro-svingis ĉe la
  // rekt-sekciaj transiroj kaj distordis la flankojn).
  const konturo = kreiPilolFenestranFormon(ww, hh).getPoints(0o200)
    .map((p: THREE.Vector2) => new THREE.Vector3(p.x, p.y, 0));
  const rimo = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(konturo, true, "centripetal"), 0o100, 0o1/0o20, 6, true),
    oraRandoMaterialo
  );
  rimo.position.set(aCx, fenY, aCz);
  if (!malantaŭ) rimo.rotation.y = rotacio;
  group.add(rimo);
  // Ora kadro laŭ la PILOLA konturo (ne rektangula skatolo) — la malnova
  // rektangula skatolo montris kvadratan flavan konturon ĉirkaŭ la rondigita
  // fenestro. La linia kadro sekvas la saman pilolan formon kiel la vitro, kaj
  // sidas tuj ekster la ora rando ( z = 0o5/0o100 ) por resti videbla kiel fajna linio.
  const kadroPunktoj: number[] = [];
  for ( let i = 0; i < konturo.length; i++ ) {
    const a = konturo[i];
    const b = konturo[( i + 1 ) % konturo.length];
    kadroPunktoj.push( a.x, a.y, 0o5/0o100, b.x, b.y, 0o5/0o100 );
  }
  const kadroGeo = new THREE.BufferGeometry();
  kadroGeo.setAttribute( "position", new THREE.Float32BufferAttribute( kadroPunktoj, 3 ) );
  const kadro = new THREE.LineSegments( kadroGeo, oraKadroMaterialo );
  kadro.position.set( aCx, fenY, aCz );
  if ( !malantaŭ ) kadro.rotation.y = rotacio;
  group.add( kadro );
}

function aldoniInternanMeblaron(
  grupo: THREE.Group,
  tipo: string,
  hw: number,
  hd: number,
  y: number,
  tieroAlto: number,
  etapo: number,
  niveloj: number,
  lignaMaterialo: THREE.MeshStandardMaterial,
  metalaMaterialo: THREE.MeshStandardMaterial,
  helaMaterialo: THREE.MeshStandardMaterial,
  kadraMaterialo: THREE.Material
): void {
  const aldoniSkatolon = ( largho: number, alto: number, profundo: number, x: number, z: number, materialo: THREE.Material ) => {
    const objekto = new THREE.Mesh( new THREE.BoxGeometry( largho, alto, profundo ), materialo );
    objekto.position.set( x, y + alto / 2, z );
    objekto.castShadow = true;
    grupo.add( objekto );
  };


  if ( tipo === "domo" ) {
    // Tablo en la restoracia stilo — rondangula ligna tablo kun ora rando kaj seĝoj
    if ( etapo === 0 && hw >= 3 ) {
      // La tablo staras en la kontraŭa angulo de la lito ( antaŭ-maldekstre ).
      const tabloX = -hw + 2, tabloZ = hd - 2;
      aldoniTablon( grupo, tabloX, tabloZ, y, 0o16/0o10, 0o12/0o10, lignaMaterialo, kadraMaterialo );
      // Seĝoj ĉirkaŭ la tablo — la sama ligna materialo kiel la tablo, kun la
      // sama ora rando ( kadraMaterialo ). La benkoj kuŝas laŭlonge de la tablaj
      // flankoj ( π/2 ĉe la x-flankoj, 0 ĉe la z-flankoj ).
      // La x-flankaj benkoj staras pli fore ( 0o14/0o10 ) ol la z-flankaj
      // ( 0o12/0o10 ), cxar la tablo estas pli largxa ol profunda — la libero al
      // la tablo-rando tiel egalas cxirkaŭe ( 0o3/0o8 ).
      for ( const [ox, oz] of [ [ -0o14/0o10, 0 ], [ 0o14/0o10, 0 ], [ 0, -0o12/0o10 ], [ 0, 0o12/0o10 ] ] as [number, number][] ) {
        aldoniSegxon( grupo, tabloX + ox, tabloZ + oz, y, lignaMaterialo, kadraMaterialo, oz === 0 ? Math.PI / 2 : 0 );
      }
    }
    // Lito — simpla rondangula hela beiga ligna bloko rekte sur la planko, kun
    // larĝa rondangula kapkuseno ĉe la kapo (+x). La lito staras en la
    // malantaŭ-dekstra angulo kun malgranda libero de la muroj. La kapo (+x)
    // kaj la dorso (−z) ambaŭ kuŝas 0o1/0o10 for de la muro, ne plu tuŝante
    // nek enirante la muron; sur etajoj tro malgrandaj (hw < 0o5/0o2) neniu
    // lito eniras sen trui la helikon.
    const litLargho = Math.min( etapo === 0 ? 0o22/0o10 : 0o16/0o10, hw * 2 - 2 );
    if ( litLargho >= 0o4/0o10 && hw >= 0o5/0o2 ) {
      // Kapo 0o1/0o10 for de la dekstra muro; dorso 0o1/0o10 for de la malantaŭa muro.
      const litX = hw - litLargho / 2 - 0o1/0o10, litZ = -hd + 0o7/0o10 + 0o1/0o10;
      // Korpo — rondangula hela beiga ligna bloko sur la planko. Pli alta ol
      // antaŭe ( 0o5/0o20 ), kun diskretaj rondigitaj anguloj ( 0o1/0o50 ) por
      // ke la VERTIKALAJ randoj ne ŝvelu — nur molaj horizontalaj eĝoj supre.
      const korpo = new THREE.Mesh( new RoundedBoxGeometry( litLargho, 0o5/0o20, 0o14/0o10, 3, 0o1/0o50 ), lignaMaterialo );
      korpo.position.set( litX, y + 0o5/0o40, litZ );
      korpo.castShadow = true;
      grupo.add( korpo );
      // Kapkuseno — rondangula rektangulo preskaŭ la tuta profundo de la lito
      // ( 0o14/0o10 − 0o1/0o10 ), kun egala malgranda libero ( 0o1/0o20 ) sur
      // la tri flankoj. Kapo (+x), dorso (−z) kaj fronto (+z). Sidante SUR la
      // pli alta korpo ( centro y+0o3/0o10, malsupro = korpo-supro ).
      const kapkuseno = new THREE.Mesh( new RoundedBoxGeometry( 0o5/0o10, 0o1/0o10, 0o14/0o10 - 0o1/0o10, 3, 0o1/0o50 ), helaMaterialo );
      kapkuseno.position.set( litX + litLargho / 2 - 0o3/0o10, y + 0o3/0o10, litZ );
      kapkuseno.castShadow = true;
      grupo.add( kapkuseno );
    }
  } else if ( tipo === "kasafeo" ) {
    // Kunvenoĉambro. Longa rondangula tablo kun seĝoj ambaŭflanke
    if ( hw >= 3 && hd >= 3 ) {
      const tl = Math.min( hw * 2 - 2, 5 );
      const tz = -hd + 0o11/0o4;
      aldoniTablon( grupo, 0, tz, y, tl, 0o12/0o10, lignaMaterialo, kadraMaterialo );
      // Seĝoj ambaŭflanke laŭ la longa flanko (ne ĉe la helika truo) — la sama
      // ora rando kiel la tablo ( kadraMaterialo ), laŭ la longa akso.
      for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
        aldoniSegxon( grupo, sX * tl / 4, tz + sZ * 0o15/0o10, y, lignaMaterialo, kadraMaterialo );
      }
    }
  } else if ( tipo === "sanktejo" && etapo === 0 ) {
    // La brila sfero — forta varma ora brilo ( GOLD ), pli hela ol la meblara
    // hela materialo, por ke la sankteja fokuso restu videbla.
    const brilaMaterialo = new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0o35/0o100, roughness: 0o4/0o10 });
    const altaro = new THREE.Mesh( new THREE.CylinderGeometry( 0o5/0o10, 0o6/0o10, 0o4/0o10, 0o10 ), metalaMaterialo );
    altaro.position.set( 0, y + 0o2/0o10, -hd + 2 );
    altaro.castShadow = true;
    grupo.add( altaro );
    const brilo = new THREE.Mesh( new THREE.SphereGeometry( 0o3/0o10, 0o10, 0o10 ), brilaMaterialo );
    brilo.position.set( 0, y + tieroAlto * 0o5/0o10, -hd + 2 );
    grupo.add( brilo );
    const lumo = new THREE.PointLight( GOLD_WARM, 0o3/0o10, 0o20, 2 );
    lumo.position.set( 0, y + tieroAlto * 0o5/0o10, -hd + 2 );
    grupo.add( lumo );
  } else if ( tipo === "mangxejo" && etapo === 0 ) {
    aldoniSkatolon( Math.min( hw * 2 - 1, 5 ), 0o3/0o10, 0o3/0o10, 0, -hd + 0o4/0o10, lignaMaterialo );
  }

  if ( niveloj > 1 && etapo === niveloj - 1 && hd >= 2 ) {
    aldoniSkatolon( Math.min( hw * 2 - 1, 4 ), 0o1/0o20, 0o3/0o10, 0, -hd + 0o5/0o20, metalaMaterialo );
  }
}

// Stelplena teksajxo por la sxipa vitralo (kanvaso — neniu dosiero bezonata).
function kreiStelplenanTeksajxon(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 0o200;
  const g = c.getContext("2d")!;
  g.fillStyle = "#000008"; g.fillRect(0, 0, c.width, c.height);
  for ( let i = 0; i < 0o140; i++ ) {
    const x = Math.random() * c.width, y = Math.random() * c.height;
    const r = 0o5/0o10 + Math.random() * 0o15/0o10;
    g.fillStyle = `rgba(214,240,255,${(0o26/0o100 + Math.random() * 0o52/0o100).toFixed(2)})`;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  return new THREE.CanvasTexture(c);
}

// kreiRandomon — Semita hazarda generatoro ( mulberry32 ). la sama semo donas
// la saman vicon da nombroj, do la planko-desegno de konstruajxo restas stabila.
function kreiRandomon( semo: number ): () => number {
  let a = semo >>> 0;
  return () => {
    a |= 0;
    a = ( a + 0x6D2B79F5 ) | 0;
    let t = Math.imul( a ^ ( a >>> 15 ), 1 | a );
    t = ( t + Math.imul( t ^ ( t >>> 7 ), 61 | t ) ) ^ t;
    return ( ( t ^ ( t >>> 14 ) ) >>> 0 ) / 4294967296;
  };
}
// malheligi — Versio de heksa koloro pli malhela je faktoro f ( 0..1 ).
function malheligi( koloro: string, f = 0o62/0o100 ): string {
  const n = parseInt( koloro.slice( 1 ), 16 );
  const r = Math.round( ( ( n >> 16 ) & 255 ) * f );
  const gg = Math.round( ( ( n >> 8 ) & 255 ) * f );
  const b = Math.round( ( n & 255 ) * f );
  return "#" + ( ( r << 16 ) | ( gg << 8 ) | b ).toString( 16 ).padStart( 6, "0" );
}
// larmo — Larmoforma motivo. ronda ŝvelo kun pinta vosto. `ang` montras la
// direkton de la pinto ( for de la ŝvelo ).
function larmo( g: CanvasRenderingContext2D, x: number, y: number, rad: number, ang: number, koloro: string ) {
  const tipX = x + Math.cos( ang ) * rad * 0o22/0o10;
  const tipY = y + Math.sin( ang ) * rad * 0o22/0o10;
  const b1 = ang + Math.PI / 2, b2 = ang - Math.PI / 2;
  g.fillStyle = koloro;
  g.beginPath();
  g.moveTo( tipX, tipY );
  g.quadraticCurveTo(
    x + Math.cos( ang + 0o72/0o100 ) * rad * 0o15/0o10,
    y + Math.sin( ang + 0o72/0o100 ) * rad * 0o15/0o10,
    x + Math.cos( b1 ) * rad, y + Math.sin( b1 ) * rad
  );
  // La ŝvelo — duoncirko malantaŭ la pinto ( tra la dorso, ne la vosto ).
  g.arc( x, y, rad, b1, b2, true );
  g.quadraticCurveTo(
    x + Math.cos( ang - 0o72/0o100 ) * rad * 0o15/0o10,
    y + Math.sin( ang - 0o72/0o100 ) * rad * 0o15/0o10,
    tipX, tipY
  );
  g.closePath();
  g.fill();
}

// generiPlankanTeksajxon — GENERILO por la planko-desegno. La paŝoj sekvas la
// klasikan zellige-stilan ordon.
//   1) Unue la anguloj kaj la centro. stelo en la centro, ronda aŭ larmoforma
//      motivo ĉe ĉiu el la kvar anguloj, kaj linio laŭ la ekstera rando de ĉiu
//      flanko ( duobla kadro ).
//   2) Poste simetriaj kurbaj linioj. nestitaj ondigitaj rondigitaj kvadratoj
//      ( skvirklaj bukloj ) inter la stelo kaj la kadro. Ĉiu buklo sekvas la
//      saman formon skale, do la bukloj kurbiĝas sed NENIAM intertrancas; la
//      konstanta paŝo garantias uniforman liberon inter la bendoj.
// La semo elektas la varianton ( 4/8-pinta stelo, larmo/ringo-anguloj, ondado ),
// do malsamaj konstruajxoj ricevas malsamajn sed stabilajn desegnojn.
//     @param bazaKoloro ( number ) - Koloro de la konstruajxaj muroj.
//     @param akcentaKoloro ( number ) - Akcenta ( ora ) koloro.
//     @param semo ( number ) - Semo por la hazarda varianto.
function generiPlankanTeksajxon( bazaKoloro: number, akcentaKoloro: number, semo: number ): THREE.CanvasTexture {
  const c = document.createElement( "canvas" );
  c.width = c.height = 0o2000;
  const g = c.getContext( "2d" )!;
  const cx = c.width / 2, cy = c.height / 2;
  const R = c.width / 2;
  const baza = deksesuma( bazaKoloro ), akcenta = deksesuma( akcentaKoloro );
  const malhela = malheligi( baza );
  const rnd = kreiRandomon( semo );
  const pintoj = rnd() < 0o5/0o10 ? 4 : 8;
  const larmoj = rnd() < 0o5/0o10;
  const ondo = [ 0o15/0o1000, 0o35/0o1000, 0o55/0o1000 ][ Math.floor( rnd() * 3 ) ];
  const fazo = rnd() < 0o5/0o10 ? 0 : Math.PI / 4;
  const interŝanĝi = rnd() < 0o5/0o10;   // alterna bendo-koloro komencante de la malhela

  g.fillStyle = baza;
  g.fillRect( 0, 0, c.width, c.height );

  // Milda radia lumo de la centro — ronda, mola brilo anstataŭ akra stelo.
  const grad = g.createRadialGradient( cx, cy, 0, cx, cy, R );
  grad.addColorStop( 0, akcenta + "22" );
  grad.addColorStop( 1, akcenta + "00" );
  g.fillStyle = grad;
  g.fillRect( 0, 0, c.width, c.height );

  // ---- 1-a paŝo. anguloj - ronda ringo aŭ larmoforma motivo, turnita al la angulo ----
  const angulaR = R * 0o7/0o100;
  for ( const sx of [ -1, 1 ] ) for ( const sy of [ -1, 1 ] ) {
    const ax = cx + sx * R * 0o62/0o100;
    const ay = cy + sy * R * 0o62/0o100;
    const enen = Math.atan2( cy - ay, cx - ax );
    if ( larmoj ) {
      larmo( g, ax, ay, angulaR, enen, akcenta );
      // Interna kerno de la larmo — la ŝvelo restas ringa.
      g.fillStyle = baza;
      g.beginPath();
      g.arc( ax, ay, angulaR * 0o45/0o100, 0, Math.PI * 2 );
      g.fill();
    } else {
      // Duoblaj cirklaj ringoj kun centra kerno.
      g.strokeStyle = akcenta;
      g.lineWidth = R * 0o12/0o1000;
      g.beginPath();
      g.arc( ax, ay, angulaR, 0, Math.PI * 2 );
      g.stroke();
      g.beginPath();
      g.arc( ax, ay, angulaR * 0o55/0o100, 0, Math.PI * 2 );
      g.stroke();
      g.fillStyle = akcenta;
      g.beginPath();
      g.arc( ax, ay, angulaR * 0o25/0o100, 0, Math.PI * 2 );
      g.fill();
    }
  }

  // ---- 1-a paŝo. centro - stelo kun kurbaj konkavaj eĝoj ----
  const stelo = ( p: number, ekstera: number, ena: number, ofseto = 0 ) => {
    g.fillStyle = akcenta;
    g.beginPath();
    // <= p*2 fermas la lastan eĝon per kurbo (ne rekta linio).
    for ( let i = 0; i <= p * 2; i++ ) {
      const ang = ofseto + ( i / ( p * 2 ) ) * Math.PI * 2;
      const rad = i % 2 === 0 ? ekstera : ena;
      const x = cx + Math.cos( ang ) * rad;
      const y = cy + Math.sin( ang ) * rad;
      if ( i === 0 ) { g.moveTo( x, y ); continue; }
      const prevAng = ofseto + ( ( i - 1 ) / ( p * 2 ) ) * Math.PI * 2;
      const midAng = ( prevAng + ang ) / 2;
      const midRad = ena + ( ekstera - ena ) * 0o23/0o100;
      g.quadraticCurveTo(
        cx + Math.cos( midAng ) * midRad,
        cy + Math.sin( midAng ) * midRad,
        x, y
      );
    }
    g.closePath();
    g.fill();
  };
  const stelEkstera = R * 0o22/0o100;
  // 4-pinta. pintoj al la kvar anguloj ( ofseto π/4 ). 8-pinta. pintoj al la aksoj.
  // La stelo restas ene de la unua bendo ( kies diagonala rando estas ~0.315R ).
  stelo( pintoj, stelEkstera, stelEkstera * 0o4/0o10, pintoj === 4 ? Math.PI / 4 : 0 );
  // Centro-kerno — disko kun interna kerno.
  g.fillStyle = akcenta;
  g.beginPath();
  g.arc( cx, cy, R * 0o45/0o1000, 0, Math.PI * 2 );
  g.fill();
  g.fillStyle = baza;
  g.beginPath();
  g.arc( cx, cy, R * 0o2/0o100, 0, Math.PI * 2 );
  g.fill();
  g.fillStyle = akcenta;
  g.beginPath();
  g.arc( cx, cy, R * 0o7/0o1000, 0, Math.PI * 2 );
  g.fill();

  // ---- 1-a paŝo. linioj laŭ la ekstera rando de ĉiu flanko ( duobla kadro ) ----
  const flankaLinio = ( inseto: number, largho: number, koloro: string ) => {
    g.strokeStyle = koloro;
    g.lineWidth = largho;
    g.beginPath();
    g.moveTo( cx - R + inseto, cy - R + inseto );
    g.lineTo( cx + R - inseto, cy - R + inseto );
    g.lineTo( cx + R - inseto, cy + R - inseto );
    g.lineTo( cx - R + inseto, cy + R - inseto );
    g.lineTo( cx - R + inseto, cy - R + inseto );
    g.stroke();
  };
  flankaLinio( R * 0o45/0o1000, R * 0o2/0o100, akcenta );
  flankaLinio( R * 0o7/0o100, R * 0o1/0o100, malhela );

  // ---- 2-a paŝo. simetriaj kurbaj linioj - nestitaj ondigitaj skvirklaj bendoj ----
  const spuri = ( skalo: number, inversa: boolean ) => {
    const punktoj = 0o240;
    for ( let i = 0; i <= punktoj; i++ ) {
      const t = ( i / punktoj ) * Math.PI * 2 * ( inversa ? -1 : 1 );
      const k = 0o32/0o10;
      const c = Math.pow( Math.abs( Math.cos( t ) ), k ) + Math.pow( Math.abs( Math.sin( t ) ), k );
      const rad = ( skalo / Math.pow( c, 1 / k ) ) * ( 1 + ondo * Math.sin( 4 * t + fazo ) );
      const x = cx + Math.cos( t ) * rad;
      const y = cy + Math.sin( t ) * rad;
      if ( i === 0 ) g.moveTo( x, y ); else g.lineTo( x, y );
    }
    g.closePath();
  };
  const bendo = ( rIn: number, rEk: number, koloro: string ) => {
    g.fillStyle = koloro;
    g.beginPath();
    spuri( rEk, false );
    spuri( rIn, true );
    g.fill( "evenodd" );   // la ringo inter la du bukloj
  };
  const bendoPaŝo = R * 0o55/0o1000;        // egala paŝo -> uniforma libero
  const bendoLargho = bendoPaŝo * 0o55/0o100;
  let bendoN = 0;
  for ( let s = R * 0o31/0o100; s + bendoLargho < R * 0o62/0o100; s += bendoPaŝo ) {
    bendo( s, s + bendoLargho, ( bendoN + ( interŝanĝi ? 1 : 0 ) ) % 2 === 0 ? akcenta : malhela );
    bendoN++;
  }

  const teksajxo = new THREE.CanvasTexture( c );
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  // Anizotropio tenas la desegnon klara ĉe malprofundaj rigard-anguloj.
  teksajxo.anisotropy = 0o10;
  return teksajxo;
}

// eniriSxipanInternon — La interno de la spacosxipo. Pluretagxa kareno-kabino
// kun helika ŝtuparo tra la centro, stelvitralo, kapsulaj fenestroj, konzolo,
// kapitana seĝo kaj hologramo. La kabino flosas CE LA SXIPO (spec.flugoY) — la
// ludanto teleportigxas al la supro kie la sxipo vere estas.
function eniriSxipanInternon(sys: InternaSistemo, spec: KonstruSpec, cxefaSceno: THREE.Scene): InternaEnirPunkto {
  const grupo = new THREE.Group();
  // La sxipo havas 5 suprajn kaj 5 subajn tierojn (vidu kraseŝaĝa-kosmoŝipo.ts); la
  // interno sekvas ilin — unu etaĝo ĉe ĉiu tier-rando, kun helika ŝtuparo.
  const sxipaTiero = 0o163/0o40;
  const up = 5, down = up;
  const rMezCx = 0o17/0o4, rSupro = 0o3/0o4, rBoto = 0o21/0o12;
  const rHelikso = 1;
  const yB = -down * sxipaTiero, yT = up * sxipaTiero;
  // Kareno-radiuso je loka alteco y (konusoj kongruantaj al la sxipa silueto,
  // iomete ene por neniu z-fajfo kun la sxelo).
  const konusaR = (y: number): number =>
    y >= 0 ? rMezCx - (rMezCx - rSupro) * (y / (up * sxipaTiero))
           : rMezCx - (rMezCx - rBoto) * (-y / (down * sxipaTiero));

  const kareno = new THREE.MeshStandardMaterial({ color: 0x10302a, roughness: 0o3/0o10, metalness: 0o11/0o40, side: THREE.DoubleSide });
  const malhela = new THREE.MeshStandardMaterial({ color: 0x0a1816, roughness: 0o5/0o10, metalness: 0o1/0o10 });
  const oro = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0o7/0o10, roughness: 0o13/0o40 });
  const brila = new THREE.MeshStandardMaterial({ color: 0x9fe8e0, emissive: 0x2a6a64, emissiveIntensity: 0o7/0o10, roughness: 0o3/0o10 });
  const vitra = new THREE.MeshBasicMaterial({ color: 0x06121a, map: kreiStelplenanTeksajxon(), toneMapped: false, side: THREE.DoubleSide });
  const sxtupMaterialo = new THREE.MeshStandardMaterial({ color: 0x2a3a34, roughness: 0o67/0o100 });

  // Helika ŝtuparo — sama strukturo kiel en la konstruajxoj. Unu plena turno
  // po etaĝo, supren tra la supraj tieroj kaj suben tra la subaj.
  const helikso: HeliksoInfo = {
    rKol: 0o3/0o10, rEkster: rHelikso, perTurno: 0o14,
    turnoAlto: sxipaTiero, turnoAltoSub: sxipaTiero,
    turnoj: up - 1, turnojSube: down,
  };
  sys.helikso = helikso;

  // Etaĝoj. La enira etaĝo je 0, subaj kaj supraj laŭ la tieroj. La klampo
  // (hw/hd) estas kvadrato ene de la ronda kareno. r/√2 ĉe ĉiu etaĝo.
  sys.plankoj = [];
  for (let j = down; j >= 1; j--) {
    const r = konusaR(-j * sxipaTiero);
    sys.plankoj.push({ y: -j * sxipaTiero, hw: r / Math.SQRT2, hd: r / Math.SQRT2, alto: sxipaTiero });
  }
  for (let i = 0; i < up; i++) {
    const r = konusaR(i * sxipaTiero);
    sys.plankoj.push({ y: i * sxipaTiero, hw: r / Math.SQRT2, hd: r / Math.SQRT2, alto: sxipaTiero });
  }

  // Kareno-muroj. Du konusoj ( supra kaj suba ) sekvantaj la sxipan silueton,
  // kaj plafono ĉe la supro kun luma ringo.
  const supra = new THREE.Mesh(new THREE.CylinderGeometry(rSupro, rMezCx, up * sxipaTiero, 0o40, 1, true), kareno);
  supra.position.y = up * sxipaTiero / 2;
  grupo.add(supra);
  const suba = new THREE.Mesh(new THREE.CylinderGeometry(rMezCx, rBoto, down * sxipaTiero, 0o40, 1, true), kareno);
  suba.position.y = -down * sxipaTiero / 2;
  grupo.add(suba);
  const plafono = new THREE.Mesh(new THREE.CircleGeometry(rSupro, 0o40).rotateX(Math.PI / 2), malhela);
  plafono.position.y = yT;
  grupo.add(plafono);
  const lumRingo = new THREE.Mesh(new THREE.RingGeometry(0o13/0o10, 0o21/0o10, 0o40).rotateX(Math.PI / 2), brila);
  lumRingo.position.y = yT - 0o1/0o20;
  grupo.add(lumRingo);

  // Etaĝaj diskoj. Plenaj ĉe la malsupro, ringaj ( kun helika truo ) aliloke.
  for (const p of sys.plankoj) {
    const r = p.hw * Math.SQRT2;
    const estasMalsupro = p.y === yB;
    const planko = new THREE.Mesh(
      estasMalsupro
        ? new THREE.CircleGeometry(r, 0o40).rotateX(-Math.PI / 2)
        : new THREE.RingGeometry(rHelikso, Math.max(rHelikso + 0o1/0o20, r - 0o1/0o40), 0o40).rotateX(-Math.PI / 2),
      malhela
    );
    planko.position.y = p.y + 0o1/0o40;
    grupo.add(planko);
    // Ora ringo ĉe la enira etaĝo — SUPRE de la planko (0o5/0o100; la planko mem
    // estas je 0o1/0o40, do 0o3/0o100 libero — neniu z-fajfo).
    if (p.y === 0) {
      const ringo = new THREE.Mesh(new THREE.RingGeometry(r - 0o3/0o10, r - 0o1/0o20, 0o40).rotateX(-Math.PI / 2), oro);
      ringo.position.y = 0o5/0o100;
      grupo.add(ringo);
    }
  }

  // Helika ŝtuparo + centra kolono + ora spirala manrelo
  {
    const rMezo = (helikso.rKol + helikso.rEkster) / 2;
    const radiala = helikso.rEkster - helikso.rKol;
    const paŝoAngulo = Math.PI * 2 / helikso.perTurno;
    const paŝoAlto = helikso.turnoAlto / helikso.perTurno;
    const paŝoLargho = rMezo * paŝoAngulo * 0o14/0o12;
    const nSube = helikso.turnojSube * helikso.perTurno;
    const nSupre = helikso.turnoj * helikso.perTurno;
    const fundoY = heliksaAltecxo(helikso, -helikso.turnojSube);
    const suproY = Math.min(yT, heliksaAltecxo(helikso, helikso.turnoj) + 0o4/0o10);
    const kolono = new THREE.Mesh(
      new THREE.CylinderGeometry(helikso.rKol, helikso.rKol * 0o13/0o12, suproY - fundoY, 0o20),
      malhela
    );
    kolono.position.set(0, (fundoY + suproY) / 2, 0);
    grupo.add(kolono);
    for (let p = -nSube; p < nSupre; p++) {
      const ang = p * paŝoAngulo;
      const y = heliksaAltecxo(helikso, p / helikso.perTurno);
      const paso = new THREE.Mesh(
        new THREE.BoxGeometry(paŝoLargho, paŝoAlto, radiala),
        sxtupMaterialo
      );
      paso.position.set(rMezo * Math.sin(ang), y + paŝoAlto / 2, rMezo * Math.cos(ang));
      paso.rotation.y = ang;
      grupo.add(paso);
    }
    const relPunktoj: THREE.Vector3[] = [];
    const relSegmentoj = Math.max(0o100, (helikso.turnoj + helikso.turnojSube) * 0o40);
    for (let i = 0; i <= relSegmentoj; i++) {
      const t = i / relSegmentoj;
      const turno = -helikso.turnojSube + t * (helikso.turnoj + helikso.turnojSube);
      const ang = turno * Math.PI * 2;
      const y = Math.min(yT - 0o1/0o20, heliksaAltecxo(helikso, turno) + 0o3/0o4);
      relPunktoj.push(new THREE.Vector3((helikso.rEkster + 0o1/0o10) * Math.sin(ang), y, (helikso.rEkster + 0o1/0o10) * Math.cos(ang)));
    }
    const relo = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(relPunktoj), relSegmentoj, 0o1/0o30, 0o6, false),
      oro
    );
    grupo.add(relo);
  }

  // Fronta stelvitralo kun ora kadro (ĉe la enira etaĝo) — modesta grandeco,
  // por ke ĝi ne elstaru preter la konusa kareno en la ŝipŝelon.
  // iomete enen de la muro, por ke la anguloj ne elstaru preter la ŝipŝelo
  const vitraloZ = -(konusaR(0o23/0o4) - 0o1/0o4);
  const vitralo = new THREE.Mesh(new THREE.PlaneGeometry(0o4, 0o25/0o10), vitra);
  vitralo.position.set(0, 0o23/0o4, vitraloZ);
  grupo.add(vitralo);
  const vitKadro = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(0o4 + 0o1/0o10, 0o25/0o10 + 0o1/0o10, 0o1/0o40)),
    new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
  );
  vitKadro.position.set(0, 0o23/0o4, vitraloZ);
  grupo.add(vitKadro);

  // Flankaj LONGAs horizontalaj RONDIGITAJ fenestroj (gluaj al la kareno) —
  // mallongaj, por ke la plataj piloloj ne elstaru preter la kurba muro.
  const kapsuloj: THREE.Mesh[] = [];
  const rKaps = konusaR(3 - 0o13/0o40);
  const kapsX = Math.sqrt(Math.max(0o1/0o4, rKaps * rKaps - (0o17/0o10) * (0o17/0o10)));
  for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
    const fenMat = brila.clone();
    fenMat.side = THREE.DoubleSide;
    const fen = new THREE.Mesh(new THREE.ShapeGeometry(kreiPilolFenestranFormon(0o13/0o10, 0o13/0o20), 0o40), fenMat);
    fen.rotation.y = Math.PI / 2;
    fen.position.set(sX * kapsX, 3 - 0o13/0o40, sZ * 0o17/0o10);
    grupo.add(fen);
    kapsuloj.push(fen);
  }

  // Konzolo kun brila ekrano
  const konzolo = new THREE.Mesh(new THREE.BoxGeometry(4, 0o3/0o2, 1), kareno);
  konzolo.position.set(0, 0o3/0o4, -0o5/0o2);
  konzolo.rotation.x = -0o1/0o10;
  konzolo.castShadow = true;
  grupo.add(konzolo);
  const ekrano = new THREE.Mesh(new THREE.PlaneGeometry(3, 1), brila.clone());
  ekrano.position.set(0, 0o25/0o20, -0o61/0o20);
  grupo.add(ekrano);

  // Kapitana seĝo
  const sidilo = new THREE.Mesh(new THREE.BoxGeometry(0o13/0o10, 0o3/0o10, 0o13/0o10), malhela);
  sidilo.position.set(0, 0o3/0o10, -0o3/0o2);
  sidilo.castShadow = true; grupo.add(sidilo);
  const dorso = new THREE.Mesh(new THREE.BoxGeometry(0o13/0o10, 0o7/0o10, 0o1/0o4), kareno);
  dorso.position.set(0, 0o13/0o20, -0o17/0o10);
  grupo.add(dorso);
  const tigo = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o10, 0o1/0o10, 0o3/0o10, 6), oro);
  tigo.position.set(0, 0o3/0o20, -0o3/0o2);
  grupo.add(tigo);

  // Hologramo super la konzolo (la centro apartenas al la ŝtuparo)
  const holoringo = new THREE.Mesh(new THREE.TorusGeometry(0o11/0o12, 0o1/0o24, 0o10, 0o40), brila);
  holoringo.position.set(0, 0o7/0o2, -0o5/0o2);
  grupo.add(holoringo);
  const holoringo2 = new THREE.Mesh(new THREE.TorusGeometry(0o15/0o24, 0o1/0o24, 0o10, 0o40), brila);
  holoringo2.position.set(0, 0o7/0o2, -0o5/0o2);
  grupo.add(holoringo2);
  const holosfero = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o4, 0o10, 0o10), brila);
  holosfero.position.set(0, 0o7/0o2, -0o5/0o2);
  grupo.add(holosfero);
  const hololumo = new THREE.PointLight(0x9fe8e0, 0o6/0o10, 0o20, 2);
  hololumo.position.set(0, 0o7/0o2, -0o5/0o2);
  grupo.add(hololumo);

  // Aera pordo ĉe la malantaŭo ( la enirejo ). Ora kadro kun brila panelo —
  // modesta grandeco (0o3), por ke ĝi restu tute ene de la ŝipŝelo.
  const aerZ = konusaR(0o7/0o2) - 0o1/0o4;
  const aerKadro = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(0o3, 5, 0o1/0o40)),
    new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
  );
  aerKadro.position.set(0, 0o7/0o2, aerZ);
  grupo.add(aerKadro);
  const aerPordo = new THREE.Mesh(new THREE.PlaneGeometry(0o3, 5), brila.clone());
  aerPordo.position.set(0, 0o7/0o2, aerZ);
  grupo.add(aerPordo);

  // Lumigado
  const ambiento = new THREE.HemisphereLight(0xbfe8e0, 0x06120e, 0o5/0o10);
  grupo.add(ambiento);
  const lumo = new THREE.PointLight(GOLD_WARM, 0o4/0o10, 0o14, 2);
  lumo.position.set(0, 7, 0);
  grupo.add(lumo);

  // Animacioj. La hologramo rotacias, ekrano/fenestroj pulsas, la stelaro drivas.
  const ekranoMat = ekrano.material as THREE.MeshStandardMaterial;
  sys.animated.push({
    update: (t: number) => {
      holoringo.rotation.y = t * 0o6/0o12;
      holoringo2.rotation.y = -t * 0o10/0o12;
      holosfero.scale.setScalar(1 + 0o1/0o10 * Math.sin(t * 2));
      ekranoMat.emissiveIntensity = 0o7/0o10 + 0o1/0o4 * Math.sin(t * 2);
      const pulso = 0o3/0o10 + 0o1/0o4 * Math.sin(t * 3);
      for (const k of kapsuloj) (k.material as THREE.MeshStandardMaterial).emissiveIntensity = pulso;
      if (vitra.map) vitra.map.offset.x = (t * 0o1/0o74) % 1;
    },
  });

  // La kabino flosas ĉe la sxipo (flugoY), ne sur la tero.
  grupo.position.set(spec.x, spec.flugoY ?? (spec.h0 || 0), spec.z);
  grupo.rotation.y = spec.rot || 0;
  cxefaSceno.add(grupo);
  sys.currentGroup = grupo;

  // Enira punkto ĉe la malantaŭa aera pordo (sur la enira etaĝo).
  return { x: 0, z: 0o5/0o2, y: 0o4/0o10, direkto: 0 };
}

export function kreiInternanSistemon(): InternaSistemo {
  return { currentGroup: null, animated: [], plankoj: [], helikso: null, manĝaĵoj: [], vaporNuboj: [] };
}

export function eniriInternon(
  sys: InternaSistemo,
  spec: KonstruSpec,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial,
  cxefaSceno: THREE.Scene,
  pordaAngulo = 0
): InternaEnirPunkto {
  // Forigu la antauxan internon
  if (sys.currentGroup) {
    cxefaSceno.remove(sys.currentGroup);
    sys.currentGroup = null;
  }
  sys.animated = [];
  sys.plankoj = [];
  sys.helikso = null;

  // La kosmoporda stacio transportas rekte en la spacosxipon.
  if (spec.type === "stacioxipo") {
    sys.manĝaĵoj = [];
    sys.vaporNuboj = [];
    return eniriSxipanInternon(sys, spec, cxefaSceno);
  }

  const w = Math.min(spec.w, 0o12);
  const d = Math.min(spec.d, 0o12);
  const tieroAlto = spec.tieroAlto;
  // La niveloj baziĝas SUR LA TAVOLOJ de la ekstera konstruajxo ( spec.niveloj )
  // — neniu kroma plafono. La sub-teraj niveloj same venas rekte de la spec
  // ( sube = la nombro da tavoloj ), por ke la interno ĉiam kongruu al la
  // ekstera strukturo.
  const niveloj = spec.niveloj;
  const sube = spec.sube || 0;
  const tieroAltoSub = spec.tieroAltoSub || tieroAlto;
  // Helica ŝtuparo. Unu plena turno po etaĝo, atingante ĉiujn etaĝojn ( supre
  // kaj la sub-terajn nivelojn). La ringa planko-truo egalas la eksteran rampan
  // radion, do oni povas paŝi rekte de la ŝtupoj sur la etaĝon.
  const helikso: HeliksoInfo | null = niveloj > 1 ? {
    rKol: 0o3/0o10, rEkster: 1, perTurno: 0o14, turnoAlto: tieroAlto, turnoAltoSub: tieroAltoSub,
    turnoj: niveloj - 1, turnojSube: sube,
  } : null;
  sys.helikso = helikso;
  // La truo estas ĝuste ĉe la ekstera rampa rando, do la ringa planko komenciĝas
  // kie la ŝtupoj finiĝas — la ludanto povas foriri de la spiralo al la etaĝoj.
  const sxaktaR = helikso ? helikso.rEkster : 0;

  // Materialoj — la internaj muroj uzas la SAMAN koloron kiel la eksteraj
  // muroj de la koncerna konstruajxo ( TIPARO[type].wall ).
  const muraTipo = TIPARO[spec.type] || TIPARO.domo;

  const muraMaterialo = new THREE.MeshStandardMaterial({
    color: muraTipo.wall, roughness: 0o43/0o100, side: THREE.DoubleSide,
  });
  // Planko kun generita simetria desegno en la koloroj de la konstruajxo.
  // La semo venas de la pozicio kaj nomo, do ĉiu konstruajxo ricevas sian
  // propran STABILAN varianton ( la sama konstruajxo ĉiam samas ).
  const plankSemo = ( ( spec.x * 0x9E3779B1 ) ^ ( spec.z * 0x85EBCA77 ) ^
    spec.name.split( "" ).reduce( ( h, ch ) => ( h * 31 + ch.charCodeAt( 0 ) ) | 0, 0 ) ) >>> 0;
  const plankoMaterialo = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: generiPlankanTeksajxon( muraTipo.wall, muraTipo.frame, plankSemo ), roughness: 0o55/0o100,
  });
  const plafonaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x060e0a, roughness: 0o67/0o100,
  });
  const kadraMaterialo = new THREE.MeshStandardMaterial({ color: muraTipo.frame, metalness: 0o7/0o10, roughness: 0o13/0o40 });
  const fenestraMaterialo = new THREE.MeshStandardMaterial({
    color: 0x0a1a18, emissive: 0x688888, emissiveIntensity: 0o3/0o20,
    roughness: 0o3/0o20, metalness: 0o3/0o20,
    transparent: true, opacity: 0o7/0o10,
  });
  // Stupoj — malheligita versio de la konstruajxa muro-koloro.
  const sxtupMaterialo = new THREE.MeshStandardMaterial({
    color: parseInt( malheligi( deksesuma( muraTipo.wall ), 0o6/0o10 ).slice( 1 ), 16 ), roughness: 0o67/0o100,
  });
  // Komunaj materialoj por dekoracioj
  const oraBazaMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o3/0o10 });
  const oraKadroMaterialo = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 });
  const oraArkoMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o3/0o10, side: THREE.DoubleSide });
  const oraTrimMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o3/0o10 });
  const oraCxapoMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 });

  const group = new THREE.Group();
  // Meblaro-materialoj — preferu la KOLOROJN de la konstruajxo ( muraTipo :
  // la muro kaj la ora kadro ), anstataux fiksitaj fremdaj koloroj.
  const lignaMaterialo = new THREE.MeshStandardMaterial({ color: LIGNA_KOLORO, roughness: 0o7/0o10 });
  const metalaMaterialo = new THREE.MeshStandardMaterial({ color: muraTipo.frame, metalness: 0o5/0o10, roughness: 0o5/0o10 });
  const helaMaterialo = new THREE.MeshStandardMaterial({ color: muraTipo.frame, roughness: 0o5/0o10 });

  // Konstruu ĉiujn etaĝojn — sub-terajn (negativaj y) kaj suprajn — per la sama
  // reuzebla kodo, por ke oni povu malsupreniri al la subaj niveloj.
  const etaĝoj: { y: number; hw: number; hd: number; alto: number; et: number }[] = [];
  for ( let j = sube; j >= 1; j-- ) {
    const redukto = j * 6/5;
    etaĝoj.push({ y: -j * tieroAltoSub, hw: Math.max(0o3/0o2, w / 2 - redukto), hd: Math.max(0o3/0o2, d / 2 - redukto), alto: tieroAltoSub, et: -j });
  }
  for ( let et = 0; et < niveloj; et++ ) {
    const redukto = et * 6/5;
    etaĝoj.push({ y: et * tieroAlto, hw: Math.max(0o3/0o2, w / 2 - redukto), hd: Math.max(0o3/0o2, d / 2 - redukto), alto: tieroAlto, et });
  }

  for ( const etaĝo of etaĝoj ) {
    const { y, hw, hd, alto, et } = etaĝo;

    // Dimensioj de la EKSTERAN pordo sur la fronta muro (aldoniEnirejon) —
    // uzataj de la pordmalfermo, la lampoj kaj la plato. Neniu margineto.
    // la porda bevelo (0o5/0o100) kuŝas en la muro aŭ antaŭ ĝi, do la truo
    // kongruas al la PLATA pordokorpo (la malnova margineto lasis videblan
    // interspacon ĉirkaŭ la pordo).
    const pordBazo = 0o233/0o100;
    const pordDuon = pordBazo / 2;

    sys.plankoj.push({ y, hw, hd, alto });

    // Planko ( kun cirkla truo por la helika ŝtuparo sur ĉiuj etaĝoj; la
    // teretaĝo ricevas la truon ankaŭ kiam ekzistas sub-teraj etaĝoj, por ke
    // oni povu malsupreniri la ŝtuparon en la kelon ).
    const planko = new THREE.Mesh(
      helikso && (et !== 0 || sube > 0)
        ? kreiRinganPlankon(hw, hd, sxaktaR, -Math.PI / 2)
        : new THREE.PlaneGeometry(hw * 2, hd * 2).rotateX(-Math.PI / 2),
      plankoMaterialo
    );
    planko.position.set(0, y + 0o1/0o40, 0);
    group.add(planko);

    // Ora planka bordero kun nesimetriaj rondigitaj anguloj
    // Mallongaj oraj strioj ĉe la kvar plankaj anguloj
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      // L-forma angula krampo el du maldikaj skatoloj
      for ( const [dx, dz, lx, lz] of [ [ 1, 0, 0o3/0o10, 0o1/0o20 ], [ 0, 1, 0o1/0o20, 0o3/0o10 ] ] as [number, number, number, number][] ) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(lx, 0o1/0o40, lz), oraBazaMaterialo);
        b.position.set( sX * ( hw - 0o1/0o10 * dx ), y + 0o2/0o40, sZ * ( hd - 0o1/0o10 * dz ));
        group.add(b);
      }
    }

    // Plafono krom cxe la supra etagxo ( kun truo por la helika ŝtuparo )
    if ( et < niveloj - 1 ) {
      const plafono = new THREE.Mesh(
        helikso
          ? kreiRinganPlankon(hw, hd, sxaktaR, Math.PI / 2)
          : new THREE.PlaneGeometry(hw * 2, hd * 2).rotateX(Math.PI / 2),
        plafonaMaterialo
      );
      plafono.position.set(0, y + alto - 0o1/0o40, 0);
      group.add(plafono);
    }

    // Antauxa muro kun rondigita pordo en la teretaĝo. La sanktejo ricevas
    // pordojn sur CXIUJ kvar flankoj ( turnitaj kopioj de la sama muro ); la
    // ceteraj konstruajxoj havas nur la frontan.
    if ( et === 0 ) {
      // Pordo-formo kongruas EXAKTE al la EKSTERAN pordo ( aldoniEnirejon ).
      // rondigita trapezoido — bazo 0o233/0o100, supro ×0o45/0o100, alto
      // 0o11/0o4, kun la SAMAJ rondigitaj anguloj (0o3/0o20 baze, 0o1/0o10
      // supre). La malnova rektangula truo kun arko montris la trapezan pordon
      // en kvadrata eltranĉo, do la malfermo mem estas la trapezo. Tro granda
      // margeno lasis malplenan interspacon ĉirkaŭ la pordo kaj super ĝi.
      const pordSupro = 0o233/0o100 * 0o45/0o100;             // ≈ 1.09
      // Sama alto kiel la pordo, sed neniam super la plafono de mallonga
      // etaĝo — alie la truo elstarus el la muro-rektangulo (degenera formo).
      const pordAlto = Math.min( 0o11/0o4, alto - 0o1/0o10 );  // ≈ 2.25, sama kiel la pordo
      const pordRadiBazo = 0o3/0o20;                         // samaj rondigitaj anguloj
      const pordRadiSupro = 0o1/0o10;                        // kiel la ekstera pordo
      const muraDikeco = 0o3/0o20;
      const pordMuro = new THREE.Group();

      // Unu mura panelo kun trapezoida truo ( anstataŭ tri skatoloj + arko )
      const muroFormo = new THREE.Shape();
      muroFormo.moveTo( -hw, 0 ); muroFormo.lineTo( hw, 0 );
      muroFormo.lineTo( hw, alto ); muroFormo.lineTo( -hw, alto );
      muroFormo.closePath();
      muroFormo.holes.push( kreiTrapezanPordTruon( pordBazo, pordSupro, pordAlto, pordRadiBazo, pordRadiSupro ) );
      const muroGeo = new THREE.ExtrudeGeometry( muroFormo, { depth: muraDikeco, bevelEnabled: false, curveSegments: 0o20 } );
      muroGeo.translate( 0, 0, -muraDikeco / 2 );
      const muro = new THREE.Mesh( muroGeo, muraMaterialo );
      muro.position.set( 0, y, hd );
      pordMuro.add( muro );

      // Ora rando laŭ la trapezoida konturo — tubo ĝuste antaŭ la interna
      // muro-faco (sama ideo kiel la ekstera ora rando ĉirkaŭ la pordo).
      const truKonturo = kreiTrapezanPordTruon( pordBazo, pordSupro, pordAlto, pordRadiBazo, pordRadiSupro )
        .getPoints( 0o100 ).map( (pt: THREE.Vector2) => new THREE.Vector3( pt.x, pt.y, 0 ) );
      const pordRando = new THREE.Mesh(
        new THREE.TubeGeometry( new THREE.CatmullRomCurve3( truKonturo, true, "catmullrom", 0o1/0o2 ), 0o100, 0o1/0o20, 6, true ),
        kadraMaterialo
      );
      pordRando.position.set( 0, y, hd - muraDikeco / 2 - 0o3/0o50 );
      pordMuro.add( pordRando );

      // Malgranda ora sojlo sub la pordo
      const sojlo = new THREE.Mesh(
        new THREE.BoxGeometry( pordBazo + 0o1/0o10, 0o2/0o40, muraDikeco ),
        new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0o23/0o100, metalness: 0o55/0o100 })
      );
      sojlo.position.set(0, y, hd - 0o1/0o20);
      pordMuro.add(sojlo);

      const pordoj = spec.type === "sanktejo" ? 4 : 1;
      for ( let i = 0; i < pordoj; i++ ) {
        const kopio = i === 0 ? pordMuro : pordMuro.clone();
        kopio.rotation.y = i * Math.PI / 2;
        group.add( kopio );
      }
    } else {
      // Plena muro sur la supraj kaj sub-teraj etagxoj
      konstruiMuron(group, -hw, 0, hw * 2, y, alto, 0o3/0o20, muraMaterialo, 0, hd);
    }

    // La tri ceteraj muroj ricevas fenestrojn — krom sur la teretaĝo de la
    // sanktejo, kie ili cxuj havas pordojn.
    const kvarPordoj = et === 0 && spec.type === "sanktejo";
    // Malantaŭa muro. Unu centrita longa horizontala rondigita fenestro
    if ( !kvarPordoj ) aldoniLonganFenestron(group, 0, -hd, y, alto, hw, "malantaŭ", muraMaterialo, fenestraMaterialo, oraArkoMaterialo, oraKadroMaterialo);

    // Maldekstra muro. Unu centrita longa horizontala rondigita fenestro
    if ( !kvarPordoj ) aldoniLonganFenestron(group, -hw, 0, y, alto, hd, "maldekstra", muraMaterialo, fenestraMaterialo, oraArkoMaterialo, oraKadroMaterialo);

    // Dekstra muro. Unu centrita longa horizontala rondigita fenestro
    if ( !kvarPordoj ) aldoniLonganFenestron(group, hw, 0, y, alto, hd, "dekstra", muraMaterialo, fenestraMaterialo, oraArkoMaterialo, oraKadroMaterialo);

    // Dikaj oraj angulaj kolonoj kun supra ekflaro — RONDIGITAJ, ne rektangulaj
    // poloj. La kapoj/bazoj estas centritaj por ke iliaj eksteraj facoj kuŝu
    // ĜUSTE ĉe la muro ( la malnovaj pli larĝaj skatoloj eniris la muron kaj
    // montris duon-entombigitajn orajn rektangulojn ĉe la anguloj ).
    const kolDikeco = 0o7/0o40;
    const kolAlto = alto;
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      // Ĉefa kolona korpo
      const kol = new THREE.Mesh(
        new RoundedBoxGeometry( kolDikeco, kolAlto, kolDikeco, 3, 0o1/0o50 ),
        kadraMaterialo
      );
      kol.position.set(sX * (hw - kolDikeco / 2), y + kolAlto / 2, sZ * (hd - kolDikeco / 2));
      group.add(kol);

      // Supra iom pli larĝa kapo — ekstera faco ĝuste ĉe la muro
      const flara = new THREE.Mesh(
        new RoundedBoxGeometry( kolDikeco * 0o15/0o10, kolAlto * 0o1/0o40, kolDikeco * 0o15/0o10, 3, 0o1/0o50 ),
        kadraMaterialo
      );
      flara.position.set( sX * ( hw - ( kolDikeco * 0o15/0o10 ) / 2 ), y + kolAlto - kolAlto * 0o1/0o40, sZ * ( hd - ( kolDikeco * 0o15/0o10 ) / 2 ));
      group.add(flara);

      // Malgranda ora bazo — ekstera faco ĝuste ĉe la muro
      const bazo = new THREE.Mesh(
        new RoundedBoxGeometry( kolDikeco * 0o5/0o4, kolAlto * 0o1/0o40, kolDikeco * 0o5/0o4, 3, 0o1/0o50 ),
        new THREE.MeshStandardMaterial({ color: GOLD_SOFT, metalness: 0o5/0o10, roughness: 0o13/0o40 })
      );
      bazo.position.set( sX * ( hw - ( kolDikeco * 0o5/0o4 ) / 2 ), y + kolAlto * 0o1/0o100, sZ * ( hd - ( kolDikeco * 0o5/0o4 ) / 2 ));
      group.add(bazo);
    }

    // Muraj lampoj kun varma ora brilo
    const lampNombro = Math.max( 1, Math.floor( hw ) - 1 );
    for ( let i = 0; i < lampNombro; i++ ) {
      const lx = -hw + ( i + 1 ) * hw * 2 / ( lampNombro + 1 );
      // Sur la teretaĝo la pordo okupas la centron de la fronta muro — lampoj
      // ene de la porda malfermo flosus en la aero.
      if ( et === 0 && Math.abs( lx ) < pordDuon ) continue;
      // Ora krampo
      const lampBazo = new THREE.Mesh(
        new THREE.BoxGeometry( 0o1/0o10, 0o1/0o10, 0o1/0o10 ),
        kadraMaterialo
      );
      lampBazo.position.set( lx, y + alto * 0o5/0o10, hd - 0o1/0o40 );
      group.add(lampBazo);
      // Varma punktolumo
      const lumo = new THREE.PointLight( GOLD_WARM, 0o2/0o10, 5, 2 );
      lumo.position.set( lx, y + alto * 0o5/0o10, hd - 0o3/0o10 );
      group.add(lumo);
      // Malgranda brila sfero
      const glo = new THREE.Mesh(
        new THREE.SphereGeometry( 0o1/0o20, 0o10, 0o10 ),
        new THREE.MeshBasicMaterial({ color: GOLD_WARM, transparent: true, opacity: 0o3/0o20 })
      );
      glo.position.set( lx, y + alto * 0o5/0o10, hd - 0o3/0o10 );
      group.add(glo);
    }

    // Vertikala skribplato sur la antauxa muro
    if ( et === 0 && spec.name ) {
      const plakedInk = deksesuma(GOLD);
      // Larĝo 0o136 (94) kongruas la aspekton de la plato (4/5 × 0o15/0o10).
      // Travidebla plato. Nur la teksto montrigxas super la muro ( neniu nigra bloko ).
      const plakedo = generiSkribanTeksajxon(nomoAih(spec.name), {
        w: 0o136, h: 0o300, ink: plakedInk,
      });
      // Alta vertikala skribplato
      const surfaco = new THREE.Mesh(
        new THREE.PlaneGeometry( 4/5, 0o15/0o10 ),
        new THREE.MeshStandardMaterial({ map: plakedo, transparent: true, roughness: 0o23/0o100, metalness: 0o55/0o100 })
      );
      // La plato staras sur la fronta muro DEKSTRE de la pordo (la pordo mem
      // okupas la centron) — la malnova centro flosis en la porda malfermo.
      const pkX = pordDuon + ( hw - pordDuon ) / 2;
      surfaco.position.set( pkX, y + alto * 0o3/0o10, hd - 0o1/0o20 );
      group.add(surfaco);
      // Dekora ora kadro ĉirkaŭ la plato
      const pkadro = new THREE.LineSegments(
        new THREE.EdgesGeometry( new THREE.BoxGeometry( 1, 0o16/0o10, 0o1/0o40 )),
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
      );
      pkadro.position.set( pkX, y + alto * 0o3/0o10, hd - 0o1/0o40 );
      group.add(pkadro);
    }

    aldoniInternanMeblaron( group, spec.type, hw, hd, y, alto, et, niveloj,
      lignaMaterialo, metalaMaterialo, helaMaterialo, kadraMaterialo );

    // Plafonaj traboj kun oraj akcentoj
    if ( spec.type !== "kasafeo" && hw > 0o3/0o2 ) {
      const trabaMaterialo = new THREE.MeshStandardMaterial({ color: parseInt( malheligi( deksesuma( muraTipo.wall ), 0o3/0o10 ).slice( 1 ), 16 ), roughness: 0o67/0o100 });
      for ( let i = 0; i < 2; i++ ) {
        const tx = ( i - 0o4/0o10 ) * hw * 0o7/0o10;
        const trabo = new THREE.Mesh(
          new THREE.BoxGeometry( 0o5/0o40, 0o5/0o40, hd * 2 - 0o3/0o10 ),
          trabaMaterialo
        );
        trabo.position.set(tx, y + alto - 0o2/0o40, 0);
        group.add(trabo);
        // Ora trabokapo
        const cxapo = new THREE.Mesh(
          new THREE.BoxGeometry(0o7/0o40, 0o3/0o40, 0o4/0o40),
          oraCxapoMaterialo
        );
        cxapo.position.set( tx, y + alto - 0o2/0o40 + 0o4/0o40, hd - 0o1/0o4 );
        group.add(cxapo);
        cxapo.position.set( tx, y + tieroAlto - 0o2/0o40 + 0o4/0o40, -hd + 0o1/0o4 );
        group.add(cxapo.clone());
      }
    }
  }

  // Helica ŝtuparo tra la tuta turo — unu plena turno po etaĝo, kun ora
  // spirala manrelo. La spiralo kovras kaj la suprajn kaj la sub-terajn etaĝojn;
  // la piedira alteco sekvas la spiralon (vidu sperto.ts).
  if ( helikso ) {
    const rMezo = ( helikso.rKol + helikso.rEkster ) / 2;
    const radiala = helikso.rEkster - helikso.rKol;
    const paŝoAngulo = Math.PI * 2 / helikso.perTurno;
    const paŝoAltoSupre = helikso.turnoAlto / helikso.perTurno;
    const paŝoAltoSube = helikso.turnoAltoSub / helikso.perTurno;
    const paŝoLargho = rMezo * paŝoAngulo * 0o14/0o12;
    const nSube = helikso.turnojSube * helikso.perTurno;
    const nSupre = helikso.turnoj * helikso.perTurno;
    const fundoY = heliksaAltecxo( helikso, -helikso.turnojSube );
    const suproY = heliksaAltecxo( helikso, helikso.turnoj ) + 0o4/0o10;
    // Centra kolono — la AKCENTA ( ora ) koloro de la konstruajxo, ne la ligno.
    const akcentaMaterialo = new THREE.MeshStandardMaterial({ color: muraTipo.frame, metalness: 0o55/0o100, roughness: 0o23/0o100 });
    const kolono = new THREE.Mesh(
      new THREE.CylinderGeometry( helikso.rKol, helikso.rKol * 0o13/0o12, suproY - fundoY, 0o20 ),
      akcentaMaterialo
    );
    kolono.position.set( 0, ( fundoY + suproY ) / 2, 0 );
    kolono.castShadow = true;
    group.add( kolono );
    // Paŝoj ĉirkaŭ la kolono — sub-teraj turnoj (negativaj) kaj supraj turnoj
    for ( let p = -nSube; p < nSupre; p++ ) {
      const ang = p * paŝoAngulo;
      const paŝoAlto = p < 0 ? paŝoAltoSube : paŝoAltoSupre;
      const y = heliksaAltecxo( helikso, p / helikso.perTurno );
      // Paŝo kun IOMETe rondigitaj anguloj ( radiuso 0o1/0o50 ) — sufiĉe por
      // mola konturo, sed la paŝo restas klare rekta.
      const paso = new THREE.Mesh(
        new RoundedBoxGeometry( paŝoLargho, paŝoAlto, radiala, 3, 0o1/0o50 ),
        sxtupMaterialo
      );
      paso.position.set( rMezo * Math.sin(ang), y + paŝoAlto / 2, rMezo * Math.cos(ang) );
      paso.rotation.y = ang;
      paso.castShadow = true;
      group.add( paso );
      // Ora rimo kiu VOLVAS la paŝon kiel U — maldikaj opakaj bendoj tuj EKSTER
      // la paŝaj facoj ( ekstera faco + la du flankoj ), NENIAM ene de la paŝo.
      // La malnovaj versioj sidis sur/en la paŝa supro — ilia supra faco koincidis
      // kun la paŝa plato kaj z-fajfis ( la oro ŝajnis klipi en la ŝtupon ). Ĉi tiuj
      // bendoj kuŝas apud la paŝo, do neniu superkovro kaj neniu klipo. La alto
      // neniam superas la paŝan leviĝon ( paŝoAlto ), do ili ne enrampas en la
      // najbarajn paŝojn.
      const nazoAlto = Math.min( 0o1/0o40, paŝoAlto );
      const rimY = y + paŝoAlto - nazoAlto / 2;
      const ux = Math.sin( ang ), uz = Math.cos( ang );    // radiale eksteren
      const tx = Math.cos( ang ), tz = -Math.sin( ang );   // tanĝe
      // Ekstera bendo — tuj ekster la ekstera faco ( [rEkster, rEkster + 0.05] ),
      // kun iomete rondigitaj anguloj ( RoundedBoxGeometry, radiuso 0o1/0o120 ).
      const nazo = new THREE.Mesh(
        new RoundedBoxGeometry( paŝoLargho + 0o1/0o10, nazoAlto, 0o1/0o20, 3, 0o1/0o120 ),
        akcentaMaterialo
      );
      nazo.position.set( ( helikso.rEkster + 0o1/0o40 ) * ux, rimY, ( helikso.rEkster + 0o1/0o40 ) * uz );
      nazo.rotation.y = ang;
      group.add( nazo );
      // Du flankaj bendoj — ĉiu tuj ekster sia paŝo-flanko, laŭ la tuta radia
      // longo, kun la samaj rondigitaj anguloj.
      for ( const s of [ -1, 1 ] ) {
        const flanko = new THREE.Mesh(
          new RoundedBoxGeometry( 0o1/0o20, nazoAlto, radiala, 3, 0o1/0o120 ),
          akcentaMaterialo
        );
        flanko.position.set(
          rMezo * ux + s * ( paŝoLargho / 2 + 0o1/0o40 ) * tx,
          rimY,
          rMezo * uz + s * ( paŝoLargho / 2 + 0o1/0o40 ) * tz
        );
        flanko.rotation.y = ang;
        group.add( flanko );
      }
    }
    // Ora spirala manrelo laŭ la ekstera rando (tra la tuta spiralo)
    const relPunktoj: THREE.Vector3[] = [];
    const relSegmentoj = Math.max( 0o100, ( helikso.turnoj + helikso.turnojSube ) * 0o40 );
    for ( let i = 0; i <= relSegmentoj; i++ ) {
      const t = i / relSegmentoj;
      const turno = -helikso.turnojSube + t * ( helikso.turnoj + helikso.turnojSube );
      const ang = turno * Math.PI * 2;
      const y = heliksaAltecxo( helikso, turno ) + 0o3/0o4;
      relPunktoj.push( new THREE.Vector3( ( helikso.rEkster + 0o1/0o10 ) * Math.sin(ang), y, ( helikso.rEkster + 0o1/0o10 ) * Math.cos(ang) ) );
    }
    const relo = new THREE.Mesh(
      new THREE.TubeGeometry( new THREE.CatmullRomCurve3( relPunktoj ), relSegmentoj, 0o1/0o30, 0o6, false ),
      kadraMaterialo
    );
    group.add( relo );
  }

  // Atmosfera lumigado
  // Ĉefa varma direkta lumo de supre
  const cxefaLumo = new THREE.DirectionalLight( 0xf8d898, 0o3/0o10 );
  cxefaLumo.position.set( 0, niveloj * tieroAlto * 4/5, 0 );
  group.add(cxefaLumo);
  // Varma pleniga lumo de sube
  const subLumo = new THREE.DirectionalLight( 0xd9b36a, 0o1/0o10 );
  subLumo.position.set( 0, -1, 0 );
  group.add(subLumo);
  // Ambienta lumo kun varma nuanco
  const ambiento = new THREE.HemisphereLight( 0xd9b36a, 0x08140e, 0o2/0o10 );
  group.add(ambiento);

  // Specialaj mebloj por mangxejo
  if ( spec.type === "mangxejo" ) {
    const mw = Math.min(spec.w, 0o10), md = Math.min(spec.d, 0o10);
    const counter = new THREE.Mesh(
      new THREE.BoxGeometry( Math.min( mw * 2 - 1, 6 ), 1, 0o12/0o10 ),
      lignaMaterialo
    );
    counter.position.set( 0o5/0o10, 0o4/0o10, -md / 2 + 0o1/0o10 );
    group.add(counter);
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry( 0o3/0o10, 0o3/0o10, 0o4/0o10, 0o16 ),
      metalaMaterialo
    );
    pot.position.set( -0o5/0o10, 0o12/0o10, counter.position.z );
    group.add(pot);
    const steamPos = new THREE.Vector3( -0o5/0o10, 0o15/0o10, counter.position.z );
    const vapor = aldoniVaporon(group, steamPos);
    sys.vaporNuboj = [{ ...vapor, ph: 0 }];
    const tabloX = Math.min( 0o22/0o10, Math.max( 0o7/0o10, mw / 2 - 0o5/0o4 ));
    const tabloZ = Math.min( 0o22/0o10, Math.max( 0o7/0o10, md / 2 - 0o5/0o4 ));
    const tabloLokoj = mw >= 0o50/0o10 && md >= 0o50/0o10
      ? [ [ tabloX, tabloZ ], [ -tabloX, tabloZ ], [ tabloX, -tabloZ ], [ -tabloX, -tabloZ ] ]
      : [];
    const tabloj: { x: number; z: number }[] = [];
    for ( const [tx, tz] of tabloLokoj ) {
      aldoniTablon( group, tx, tz, 0, 0o16/0o10, 0o12/0o10, lignaMaterialo, kadraMaterialo );
      tabloj.push({ x: tx, z: tz });
      // Seĝoj sur la tri liberaj flankoj; la flanko kontraŭ la vendotablo restas sen seĝo
      // La x-flankaj benkoj staras pli fore ( 0o14/0o10 ) ol la z-flankaj
      // ( 0o12/0o10 ), cxar la tablo estas pli largxa ol profunda — la libero al
      // la tablo-rando tiel egalas cxirkaŭe ( 0o3/0o8 ).
      const seĝajOfsetoj: [number, number][] = tz < 0
        ? [ [ -0o14/0o10, 0 ], [ 0o14/0o10, 0 ], [ 0, 0o12/0o10 ] ]
        : [ [ -0o14/0o10, 0 ], [ 0o14/0o10, 0 ], [ 0, -0o12/0o10 ], [ 0, 0o12/0o10 ] ];
      for ( const [ox, oz] of seĝajOfsetoj ) {
        aldoniSegxon( group, tx + ox, tz + oz, 0, lignaMaterialo, kadraMaterialo, oz === 0 ? Math.PI / 2 : 0 );
      }
    }
    // Manĝaĵoj sidas sur la tabloj ( ne en la aero )
    const items = kreiMangxajxojn(group, 0, 0, tabloj);
    sys.manĝaĵoj = items;
  }

  // Aldonu la internan grupon
  group.position.set(spec.x, spec.h0 || 0, spec.z);
  group.rotation.y = spec.rot || 0;
  cxefaSceno.add(group);
  sys.currentGroup = group;

  // Enira punkto tuj interne de la pordo tra kiu la ludanto eniris
  // ( pordaAngulo; 0 = la fronta pordo ). La ludanto frontas la centron.
  const enirR = Math.max(0o3/0o2, d / 2) - 0o4/0o10;
  const enirX = Math.sin( pordaAngulo ) * enirR;
  const enirZ = Math.cos( pordaAngulo ) * enirR;
  const enirY = 0o4/0o10;
  const enirDirekto = pordaAngulo;

  return { x: enirX, z: enirZ, y: enirY, direkto: enirDirekto };
}

export function eliriInternon(sys: InternaSistemo, cxefaSceno: THREE.Scene): void {
  if (sys.currentGroup) {
    cxefaSceno.remove(sys.currentGroup);
    sys.currentGroup = null;
  }
  sys.animated = [];
  sys.plankoj = [];
  sys.helikso = null;
  sys.manĝaĵoj = [];
  sys.vaporNuboj = [];
}

export function gxisdatigiInternon(sys: InternaSistemo, t: number): void {
  for ( const a of sys.animated ) a.update( t );
  for ( const v of sys.vaporNuboj ) {
    const pos = v.cloud.geometry.attributes.position;
    if (pos) {
      for ( let i = 0; i < pos.count; i++ ) {
        const y = pos.getY( i ) + 0o3/0o1750;
        if ( y > 7/5 ) pos.setY( i, -0o1/0o12 );
        else pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }
  }
}

// Ringa planko — kvadrato kun cirkla truo por la helika ŝtuparo.
function kreiRinganPlankon( hw: number, hd: number, r: number, rotacio: number ): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.moveTo( -hw, -hd );
  s.lineTo( hw, -hd );
  s.lineTo( hw, hd );
  s.lineTo( -hw, hd );
  s.closePath();
  const truo = new THREE.Path();
  truo.absarc( 0, 0, r, 0, Math.PI * 2, true );
  s.holes.push( truo );
  const g = new THREE.ShapeGeometry( s, 0o30 );
  // Normaligu la UV-ojn al [0,1], por ke la stela plank-teksturo mapiĝu tra la
  // tuta planko ( ShapeGeometry uzas la krudajn formo-koordinatojn kiel UV ).
  const poz = g.getAttribute( "position" );
  const uv = g.getAttribute( "uv" );
  for ( let i = 0; i < uv.count; i++ ) {
    uv.setXY( i, ( poz.getX( i ) + hw ) / ( hw * 2 ), ( poz.getY( i ) + hd ) / ( hd * 2 ) );
  }
  uv.needsUpdate = true;
  return g.rotateX( rotacio );
}

// Helfunkcio por konstrui muron el skatolo
// rotacio estas Y-rotacio en radianoj por flankaj muroj
function konstruiMuron(
  g: THREE.Group,
  lokalX: number, lokalY: number, largho: number,
  bazaY: number, alto: number, dikeco: number,
  materialo: THREE.MeshStandardMaterial,
  cx: number, cz: number,
  rotacio = 0
): void {
  if (largho <= 0 || alto <= 0) return;
  const muro = new THREE.Mesh(new THREE.BoxGeometry(largho, alto, dikeco), materialo);
  if (rotacio) {
    // Por flankaj muroj. lokalX estas Z-offset, cx estas X-ebeno
    muro.position.set(cx, bazaY + lokalY + alto / 2, cz + lokalX + largho / 2);
    muro.rotation.y = rotacio;
  } else {
    muro.position.set(cx + lokalX + largho / 2, bazaY + lokalY + alto / 2, cz);
  }
  g.add(muro);
}
