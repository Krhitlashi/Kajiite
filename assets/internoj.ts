// Interna modulo — pluretagxaj internaj spacoj por piediri tra ili
// Rezajnita por kongrui al la malhel-verda/oro satala estetiko de Priskribo.md.
//   • Muroj en la sama koloro kiel la eksteraj muroj de la konstruajxo, varmaj oraj kadroj (#d9b36a)
//   • Nesimetraj rondigitaj anguloj (32px/16px)
//   • Dikaj oraj angulaj kadroj kiuj flairas eksteren supre
//   • Longaj horizontalaj rondigitaj fenestroj
//   • Rondigita trapeza porda arko sur teretaĝo
//   • Varma atmosfera ora lumigado
//   • Vertikalaj skriptplatoj de malsupro al supro
//   • Minimalismaj rondangulaj mebloj kun oraj akcentoj

import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { KonstruSpec, kreiMangxajxojn, MangxajxItemo, aldoniVaporon, TIPARO } from "./satalaj-konstruajxoj.js";
import { generiSkribanTeksajxon } from "./skripto-rivelilo.js";
import { nomoAih } from "../src/tradukoj.js";

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

// heliksaAltecxo — Alteco de kontinua turno sur la spiralo: pozitivaj turnoj
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

// Helpilo. krei Materialon por oro
function oroMaterialo(metalness = 0o7/0o10, roughness = 0o13/0o40): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: GOLD, metalness, roughness,
  });
}

// Helpilo por segmentita arkformo ( por pordo kaj fenestroj )
function kreiArkFormon( radiuso: number, segmentoj: number, largho: number ): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  const verts: number[] = [];
  const idx: number[] = [];
  for ( let i = 0; i <= segmentoj; i++ ) {
    const ang = (i / segmentoj) * Math.PI;
    const x = Math.cos(ang) * radiuso;
    const y = Math.sin(ang) * radiuso;
    // Antaŭa flanko
    verts.push(x, y, largho / 2);
    // Malantaŭa flanko
    verts.push(x, y, -largho / 2);
    if (i > 0) {
      const a = (i - 1) * 2, b = i * 2;
      idx.push(a, a + 1, b, b, a + 1, b + 1);
    }
  }
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

// kreiPilolFenestranFormon — LONGAs horizontalas rondigitan fenestron: rektangulo
// kun duoncirklaj finoj (pilolo). Uzata por la internaj fenestroj (centritaj sur
// cxiu muro) kaj la spacosxipaj eksteraj fenestroj.
export function kreiPilolFenestranFormon(w: number, h: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 2, r = h / 2;
  s.moveTo(-hw + r, 0);
  s.lineTo(hw - r, 0);
  s.absarc(hw - r, r, r, -Math.PI / 2, Math.PI / 2, false);
  s.lineTo(-hw + r, h);
  s.absarc(-hw + r, r, r, Math.PI / 2, Math.PI * 0o3/0o2, false);
  s.closePath();
  return s;
}

// konstruiMuronKunPilolaTruo — Muro el fidindaj skatol-segmentoj ( kiuj plene
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
      m.position.set( cx, bazaY + cyLoka, cz + cxLoka );
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

  // Kvar rondigitaj angulaj plenigaĵoj: la regiono inter la rektangula truo kaj
  // la duoncirklaj ĉap-finoj de la pilola fenestro. Ĉiu formo estas konstruita
  // en sia propra loka kadro ( centrita je la angula centro ) kaj metita per
  // aldoniAngulon ĉe la koresponda angulo.
  const r = hh / 2;
  const cyArk = fenLokY + r;
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
// orientacio: "malantaŭ" (fakas +z), "maldekstra" (fakas +x), "dekstra" (fakas -x).
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
  // Fenestro-larĝo laŭ la tavolflanko: pli longa sur pli longaj muroj, kun
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
  // sidas tuj ekster la ora rando (z = 0.06) por resti videbla kiel fajna linio.
  const kadroPunktoj: number[] = [];
  for ( let i = 0; i < konturo.length; i++ ) {
    const a = konturo[i];
    const b = konturo[( i + 1 ) % konturo.length];
    kadroPunktoj.push( a.x, a.y, 0.07, b.x, b.y, 0.07 );
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
  helaMaterialo: THREE.MeshStandardMaterial
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
      const oraTablaRando = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0o3/0o4, roughness: 0o3/0o10 });
      // La tablo staras en la kontraŭa angulo de la lito ( antaŭ-maldekstre ).
      const tabloX = -hw + 2, tabloZ = hd - 2;
      const tablo = new THREE.Mesh( new RoundedBoxGeometry( 0o16/0o10, 0o3/0o10, 0o12/0o10, 3, 0o1/0o10 ), lignaMaterialo );
      tablo.position.set( tabloX, y + 0o2/0o10, tabloZ );
      tablo.castShadow = true;
      grupo.add( tablo );
      const rando = new THREE.Mesh( new RoundedBoxGeometry( 0o16/0o10 + 0o1/0o20, 0o1/0o20, 0o12/0o10 + 0o1/0o20, 3, 0o1/0o10 ), oraTablaRando );
      rando.position.set( tabloX, y + 0o2/0o10 + 0o3/0o20 - 0o1/0o40 - 0o1/0o100, tabloZ );
      rando.castShadow = true;
      grupo.add( rando );
      // Seĝoj ĉirkaŭ la tablo
      const segxMaterialo = new THREE.MeshStandardMaterial({ color: 0x806038, roughness: 0o7/0o10 });
      for ( const [ox, oz] of [ [ -0o12/0o10, 0 ], [ 0o12/0o10, 0 ], [ 0, -0o12/0o10 ], [ 0, 0o12/0o10 ] ] as [number, number][] ) {
        const sego = new THREE.Mesh( new THREE.CylinderGeometry( 0o3/0o20, 0o4/0o20, 0o3/0o10, 0o10 ), segxMaterialo );
        sego.position.set( tabloX + ox, y + 0o3/0o20, tabloZ + oz );
        sego.castShadow = true;
        grupo.add( sego );
      }
    }
    // Lito — simpla rondangula hela beiga ligna bloko rekte sur la planko, kun
    // malgranda rondangula kapkuseno ĉe la kapo (+x). La lito staras en la
    // malantaŭ-dekstra angulo kun malgranda libero de la muroj; sur etajoj tro
    // malgrandaj (hw < 0o5/0o2) neniu lito eniras sen trui la helikon.
    const litLargho = Math.min( etapo === 0 ? 0o22/0o10 : 0o16/0o10, hw * 2 - 2 );
    if ( litLargho >= 0o4/0o10 && hw >= 0o5/0o2 ) {
      const litX = hw - litLargho / 2 - 0o1/0o10, litZ = -hd + 0o13/0o20;
      // Korpo — rondangula hela beiga ligna bloko sur la planko
      const lignaHelaMaterialo = new THREE.MeshStandardMaterial({ color: 0xc8b088, roughness: 0o6/0o10 });
      const korpo = new THREE.Mesh( new RoundedBoxGeometry( litLargho, 0o3/0o20, 0o14/0o10, 3, 0o1/0o20 ), lignaHelaMaterialo );
      korpo.position.set( litX, y + 0o3/0o40, litZ );
      korpo.castShadow = true;
      grupo.add( korpo );
      // Kapkuseno — pli malgranda rondangula rektangulo ( ne plena profundo ),
      // hela ŝtofo por ke ĝi distingiĝu de la korpo.
      const kapkusenaMaterialo = new THREE.MeshStandardMaterial({ color: 0xe0d8c8, roughness: 0o5/0o10 });
      const kapkuseno = new THREE.Mesh( new RoundedBoxGeometry( 0o5/0o10, 0o1/0o10, 0o6/0o10, 3, 0o1/0o20 ), kapkusenaMaterialo );
      kapkuseno.position.set( litX + litLargho / 2 - 0o3/0o10, y + 0o2/0o10, litZ );
      kapkuseno.castShadow = true;
      grupo.add( kapkuseno );
    }
  } else if ( tipo === "turo" ) {
    // Malantaŭaj angulaj manrel-pilieroj ĉe la helika ŝtuparo.
    for ( const sX of [ -1, 1 ] ) {
      aldoniSkatolon( 0o1/0o10, tieroAlto * 0o4/0o10, 0o1/0o10, sX * ( hw - 0o5/0o20 ), -hd + 0o3/0o10, metalaMaterialo );
    }
  } else if ( tipo === "kasafeo" ) {
    // Kunvenoĉambro: longa rondangula tablo kun seĝoj ambaŭflanke
    if ( hw >= 3 && hd >= 3 ) {
      const tl = Math.min( hw * 2 - 2, 5 );
      const tz = -hd + 0o11/0o4;
      const tablo = new THREE.Mesh( new RoundedBoxGeometry( tl, 0o3/0o10, 0o12/0o10, 3, 0o1/0o10 ), lignaMaterialo );
      tablo.position.set( 0, y + 0o2/0o10, tz );
      tablo.castShadow = true;
      grupo.add( tablo );
      const oraRando = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0o3/0o4, roughness: 0o3/0o10 });
      const rando = new THREE.Mesh( new RoundedBoxGeometry( tl + 0o1/0o20, 0o1/0o20, 0o12/0o10 + 0o1/0o20, 3, 0o1/0o10 ), oraRando );
      rando.position.set( 0, y + 0o2/0o10 + 0o3/0o20 - 0o1/0o40 - 0o1/0o100, tz );
      rando.castShadow = true;
      grupo.add( rando );
      // Seĝoj ambaŭflanke laŭ la longa flanko (ne ĉe la helika truo)
      const segxMaterialo = new THREE.MeshStandardMaterial({ color: 0x806038, roughness: 0o7/0o10 });
      for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
        const sego = new THREE.Mesh( new THREE.CylinderGeometry( 0o3/0o20, 0o4/0o20, 0o3/0o10, 0o10 ), segxMaterialo );
        sego.position.set( sX * tl / 4, y + 0o3/0o20, tz + sZ * 0o15/0o10 );
        sego.castShadow = true;
        grupo.add( sego );
      }
    }
  } else if ( tipo === "sanktejo" && etapo === 0 ) {
    const altaro = new THREE.Mesh( new THREE.CylinderGeometry( 0o5/0o10, 0o6/0o10, 0o4/0o10, 0o12 ), metalaMaterialo );
    altaro.position.set( 0, y + 0o2/0o10, -hd + 2 );
    altaro.castShadow = true;
    grupo.add( altaro );
    const brilo = new THREE.Mesh( new THREE.SphereGeometry( 0o3/0o10, 0o12, 0o10 ), helaMaterialo );
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
  g.fillStyle = "#02070c"; g.fillRect(0, 0, c.width, c.height);
  for ( let i = 0; i < 0o140; i++ ) {
    const x = Math.random() * c.width, y = Math.random() * c.height;
    const r = 0.6 + Math.random() * 1.6;
    g.fillStyle = `rgba(214,240,255,${(0.35 + Math.random() * 0.65).toFixed(2)})`;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  return new THREE.CanvasTexture(c);
}

// kreiStelanPlankanTeksajxon — Rondigita kvar-pinta stel-desegno por la planko,
// uzante la muran koloron de la konstruajxo ( bazo ) kaj ĝian akcentan
// ( kadran ) koloron. Rondaj formoj kaj kurbaj stel-eĝoj anstataŭ akraj pikoj;
// la desegno respektas la kvadratajn limojn de la planko (rondigita kvadrata
// kadro apud la randoj kaj pintoj al la kvar anguloj).
//     @param bazaKoloro ( number = 0x184838 ) - Koloro de la konstruajxaj muroj.
//     @param akcentaKoloro ( number = 0xd8b068 ) - Akcenta ( ora ) koloro.
function kreiStelanPlankanTeksajxon( bazaKoloro: number, akcentaKoloro: number ): THREE.CanvasTexture {
  const c = document.createElement( "canvas" );
  c.width = c.height = 0o2000;
  const g = c.getContext( "2d" )!;
  const cx = c.width / 2, cy = c.height / 2;
  const R = c.width / 2;
  const hex = ( n: number ) => "#" + n.toString( 16 ).padStart( 6, "0" );
  const baza = hex( bazaKoloro ), akcenta = hex( akcentaKoloro );
  g.fillStyle = baza;
  g.fillRect( 0, 0, c.width, c.height );

  // Milda radia lumo de la centro — ronda, mola brilo anstataŭ akra stelo.
  const grad = g.createRadialGradient( cx, cy, 0, cx, cy, R );
  grad.addColorStop( 0, akcenta + "33" );
  grad.addColorStop( 1, akcenta + "00" );
  g.fillStyle = grad;
  g.fillRect( 0, 0, c.width, c.height );

  // Kvar-pinta stelo kun KURBAJ konkavaj eĝoj (ne akraj rektaj pikoj). La
  // kontrolpunkto de cxiu eĝo sidas iomete enen, do la valoj rondigas.
  const kvarpinta = ( ekstera: number, ena: number, koloro: string, ofseto = 0 ) => {
    g.fillStyle = koloro;
    g.beginPath();
    const n = 4;
    // <= n*2 fermas la lastan eĝon per kurbo (ne rekta linio).
    for ( let i = 0; i <= n * 2; i++ ) {
      const ang = ofseto + ( i / ( n * 2 ) ) * Math.PI * 2;
      const rad = i % 2 === 0 ? ekstera : ena;
      const x = cx + Math.cos( ang ) * rad;
      const y = cy + Math.sin( ang ) * rad;
      if ( i === 0 ) { g.moveTo( x, y ); continue; }
      const prevAng = ofseto + ( ( i - 1 ) / ( n * 2 ) ) * Math.PI * 2;
      const midAng = ( prevAng + ang ) / 2;
      const midRad = ena + ( ekstera - ena ) * 0.3;
      g.quadraticCurveTo(
        cx + Math.cos( midAng ) * midRad,
        cy + Math.sin( midAng ) * midRad,
        x, y
      );
    }
    g.closePath();
    g.fill();
  };
  const ringo = ( rad: number, largho: number, koloro: string ) => {
    g.strokeStyle = koloro;
    g.lineWidth = largho;
    g.beginPath();
    g.arc( cx, cy, rad, 0, Math.PI * 2 );
    g.stroke();
  };
  // Rondigita kvadrata kadro — sekvas la kvadratajn limojn de la planko.
  const rondangulaKvadrato = ( inseto: number, angulaRadiuso: number, largho: number, koloro: string ) => {
    g.strokeStyle = koloro;
    g.lineWidth = largho;
    g.beginPath();
    g.moveTo( cx - R + inseto + angulaRadiuso, cy - R + inseto );
    g.arcTo( cx + R - inseto, cy - R + inseto, cx + R - inseto, cy - R + inseto + angulaRadiuso, angulaRadiuso );
    g.arcTo( cx + R - inseto, cy + R - inseto, cx + R - inseto - angulaRadiuso, cy + R - inseto, angulaRadiuso );
    g.arcTo( cx - R + inseto, cy + R - inseto, cx - R + inseto, cy + R - inseto - angulaRadiuso, angulaRadiuso );
    g.arcTo( cx - R + inseto, cy - R + inseto, cx - R + inseto + angulaRadiuso, cy - R + inseto, angulaRadiuso );
    g.closePath();
    g.stroke();
  };

  // Granda kvar-pinta stelo (akcenta) — pintoj al la kvar anguloj de la kvadrato.
  kvarpinta( R * 0.85, R * 0.3, akcenta, Math.PI / 4 );
  // Rondaj ringoj (ne turnita dua stelo) — la dezajno restas klare KVAR-pinta.
  ringo( R * 0.58, R * 0.03, baza );
  ringo( R * 0.56, R * 0.012, akcenta );
  // Rondigita kvadrata kadro apud la rando — kvadrato-konscia.
  rondangulaKvadrato( R * 0.035, R * 0.15, R * 0.03, akcenta );
  rondangulaKvadrato( R * 0.085, R * 0.1, R * 0.012, baza );
  // Kvar rondaj angulaj akcentoj — rondigitaj anguloj de la kvadrato.
  for ( const sx of [ -1, 1 ] ) for ( const sy of [ -1, 1 ] ) {
    g.fillStyle = akcenta;
    g.beginPath();
    g.arc( cx + sx * R * 0.94, cy + sy * R * 0.94, R * 0.055, 0, Math.PI * 2 );
    g.fill();
  }
  // Ronda centro: disko kun interna kerno.
  g.fillStyle = akcenta;
  g.beginPath();
  g.arc( cx, cy, R * 0.2, 0, Math.PI * 2 );
  g.fill();
  g.fillStyle = baza;
  g.beginPath();
  g.arc( cx, cy, R * 0.11, 0, Math.PI * 2 );
  g.fill();
  g.fillStyle = akcenta;
  g.beginPath();
  g.arc( cx, cy, R * 0.045, 0, Math.PI * 2 );
  g.fill();

  const teksajxo = new THREE.CanvasTexture( c );
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  // Anizotropio tenas la stelon klara ĉe malprofundaj rigard-anguloj.
  teksajxo.anisotropy = 0o10;
  return teksajxo;
}

// eniriSxipanInternon — La interno de la spacosxipo: pluretagxa kareno-kabino
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

  // Helika ŝtuparo — sama strukturo kiel en la konstruajxoj: unu plena turno
  // po etaĝo, supren tra la supraj tieroj kaj suben tra la subaj.
  const helikso: HeliksoInfo = {
    rKol: 0o3/0o10, rEkster: rHelikso, perTurno: 0o14,
    turnoAlto: sxipaTiero, turnoAltoSub: sxipaTiero,
    turnoj: up - 1, turnojSube: down,
  };
  sys.helikso = helikso;

  // Etaĝoj: la enira etaĝo je 0, subaj kaj supraj laŭ la tieroj. La klampo
  // (hw/hd) estas kvadrato ene de la ronda kareno: r/√2 ĉe ĉiu etaĝo.
  sys.plankoj = [];
  for (let j = down; j >= 1; j--) {
    const r = konusaR(-j * sxipaTiero);
    sys.plankoj.push({ y: -j * sxipaTiero, hw: r / Math.SQRT2, hd: r / Math.SQRT2, alto: sxipaTiero });
  }
  for (let i = 0; i < up; i++) {
    const r = konusaR(i * sxipaTiero);
    sys.plankoj.push({ y: i * sxipaTiero, hw: r / Math.SQRT2, hd: r / Math.SQRT2, alto: sxipaTiero });
  }

  // Kareno-muroj: du konusoj (supra kaj suba) sekvantaj la sxipan silueton,
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

  // Etaĝaj diskoj: plenaj ĉe la malsupro, ringaj (kun helika truo) aliloke.
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
      new THREE.CylinderGeometry(helikso.rKol, helikso.rKol * 0o13/0o12, suproY - fundoY, 0o16),
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
  const holosfero = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o4, 0o12, 0o10), brila);
  holosfero.position.set(0, 0o7/0o2, -0o5/0o2);
  grupo.add(holosfero);
  const hololumo = new THREE.PointLight(0x9fe8e0, 0o6/0o10, 0o20, 2);
  hololumo.position.set(0, 0o7/0o2, -0o5/0o2);
  grupo.add(hololumo);

  // Aera pordo ĉe la malantaŭo (la enirejo): ora kadro kun brila panelo —
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

  // Animacioj: la hologramo rotacias, ekrano/fenestroj pulsas, la stelaro drivas.
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
  cxefaSceno: THREE.Scene
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
  const niveloj = Math.min(spec.niveloj, 0o10);
  const sube = Math.min(spec.sube || 0, 3);
  const tieroAltoSub = spec.tieroAltoSub || tieroAlto;
  // Helica ŝtuparo: unu plena turno po etaĝo, atingante ĉiujn etaĝojn (supre
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
  // Planko kun radiale simetria stel-desegno en la koloroj de la konstruajxo.
  const plankoMaterialo = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: kreiStelanPlankanTeksajxon( muraTipo.wall, muraTipo.frame ), roughness: 0o55/0o100,
  });
  const plafonaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x060e0a, roughness: 0o67/0o100,
  });
  const kadraMaterialo = oroMaterialo();
  const fenestraMaterialo = new THREE.MeshStandardMaterial({
    color: 0x0a1a18, emissive: 0x688888, emissiveIntensity: 0o3/0o20,
    roughness: 0o3/0o20, metalness: 0o3/0o20,
    transparent: true, opacity: 0o7/0o10,
  });
  const sxtupMaterialo = new THREE.MeshStandardMaterial({
    color: 0x3a3a32, roughness: 0o67/0o100,
  });
  // Komunaj materialoj por dekoracioj
  const oraBazaMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o3/0o10 });
  const oraKadroMaterialo = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 });
  const oraArkoMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o3/0o10, side: THREE.DoubleSide });
  const oraNazoMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o3/0o10 });
  const oraTrimMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o3/0o10 });
  const oraCxapoMaterialo = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 });

  const group = new THREE.Group();
  const lignaMaterialo = new THREE.MeshStandardMaterial({ color: 0x54402e, roughness: 0o7/0o10 });
  const metalaMaterialo = new THREE.MeshStandardMaterial({ color: 0x806838, metalness: 0o5/0o10, roughness: 0o5/0o10 });
  const helaMaterialo = new THREE.MeshStandardMaterial({ color: 0xb8d8c8, emissive: 0x385848, emissiveIntensity: 0o4/0o10, roughness: 0o4/0o10 });

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

    // Antauxa muro kun rondigita pordo en la teretaĝo
    if ( et === 0 ) {
      // Porda larĝo sekvas la EKSTERAN pordon (aldoniEnirejon, bazo ≈ 0o233/0o100
      // ≈ 2.42): la malnova 0o3/0o2 (1.5) estis pli mallarĝa ol la ekstera
      // pordo-slabo, do la slabaj flankoj tranĉis la internan muron — la pordo
      // "klipis en la muron".
      const pordLargho = 0o233/0o100 + 0o1/0o10;
      // Pordo sufiĉe alta por la okulnivelo de la ludanto (≈ 2.16),
      // sed lasu al la arko sufiĉan liberecon sub la plafono
      const pordAlto = Math.min( alto * 0o3/0o4, alto - 0o7/0o10 );
      // Arko ne pli alta ol la libero sub la plafono (0o1/0o20 marĝeno).
      const arkRadiuso = Math.min( pordLargho / 2, alto - pordAlto - 0o1/0o20 );
      const arkSegmentoj = 0o10;

      // Muro maldekstre de la pordo
      konstruiMuron(group, -hw, 0, hw - pordLargho / 2, y, alto, 0o3/0o20, muraMaterialo, 0, hd);
      // Muro dekstre de la pordo
      konstruiMuron(group, pordLargho / 2, 0, hw - pordLargho / 2, y, alto, 0o3/0o20, muraMaterialo, 0, hd);
      // Muro super la pordo
      konstruiMuron(group, -pordLargho / 2, pordAlto, pordLargho, y, alto - pordAlto, 0o3/0o20, muraMaterialo, 0, hd);

      // Arka porda kapo — ora rando ĝuste antaŭ la interna muro-faco (ne entombigita)
      const arkGeo = kreiArkFormon(arkRadiuso, arkSegmentoj, 0o3/0o20);
      const ark = new THREE.Mesh(arkGeo, new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0o3/0o10, side: THREE.DoubleSide }));
      ark.position.set(0, y + pordAlto, hd - 0o3/0o20);
      group.add(ark);

      // Ora pordokadro — sama larĝo kiel la arko, rektangulo ĝis la arka bazo
      const kadroGeo = new THREE.EdgesGeometry(
        new THREE.BoxGeometry( pordLargho, pordAlto, 0o1/0o40 )
      );
      const kadroLinio = new THREE.LineSegments(
        kadroGeo,
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
      );
      // Sam-ebena kun la arko (hd - 0o3/0o20), ne entombigita en la muro.
      kadroLinio.position.set( 0, y + pordAlto / 2, hd - 0o3/0o20 );
      group.add(kadroLinio);

      // Malgranda ora sojlo
      const sojlo = new THREE.Mesh(
        new THREE.BoxGeometry( pordLargho + 0o1/0o10, 0o2/0o40, 0o3/0o20 ),
        new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0o23/0o100, metalness: 0o55/0o100 })
      );
      sojlo.position.set(0, y, hd - 0o1/0o20);
      group.add(sojlo);
    } else {
      // Plena muro sur la supraj kaj sub-teraj etagxoj
      konstruiMuron(group, -hw, 0, hw * 2, y, alto, 0o3/0o20, muraMaterialo, 0, hd);
    }

    // Malantaŭa muro: unu centrita longa horizontala rondigita fenestro
    aldoniLonganFenestron(group, 0, -hd, y, alto, hw, "malantaŭ", muraMaterialo, fenestraMaterialo, oraArkoMaterialo, oraKadroMaterialo);

    // Maldekstra muro: unu centrita longa horizontala rondigita fenestro
    aldoniLonganFenestron(group, -hw, 0, y, alto, hd, "maldekstra", muraMaterialo, fenestraMaterialo, oraArkoMaterialo, oraKadroMaterialo);

    // Dekstra muro: unu centrita longa horizontala rondigita fenestro
    aldoniLonganFenestron(group, hw, 0, y, alto, hd, "dekstra", muraMaterialo, fenestraMaterialo, oraArkoMaterialo, oraKadroMaterialo);

    // Dikaj oraj angulaj kolonoj kun supra ekflaro
    const kolDikeco = 0o7/0o40;
    const kolAlto = alto;
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      // Ĉefa kolona korpo
      const kol = new THREE.Mesh(
        new THREE.BoxGeometry(kolDikeco, kolAlto, kolDikeco),
        kadraMaterialo
      );
      kol.position.set(sX * (hw - kolDikeco / 2), y + kolAlto / 2, sZ * (hd - kolDikeco / 2));
      group.add(kol);

      // Supra iom pli larĝa kapo
      const flara = new THREE.Mesh(
        new THREE.BoxGeometry( kolDikeco * 0o15/0o10, kolAlto * 0o1/0o40, kolDikeco * 0o15/0o10 ),
        kadraMaterialo
      );
      flara.position.set( sX * ( hw - kolDikeco / 2 ), y + kolAlto - kolAlto * 0o1/0o40, sZ * ( hd - kolDikeco / 2 ));
      group.add(flara);

      // Malgranda ora bazo
      const bazo = new THREE.Mesh(
        new THREE.BoxGeometry( kolDikeco * 0o5/0o4, kolAlto * 0o1/0o40, kolDikeco * 0o5/0o4 ),
        new THREE.MeshStandardMaterial({ color: GOLD_SOFT, metalness: 0o5/0o10, roughness: 0o13/0o40 })
      );
      bazo.position.set( sX * ( hw - kolDikeco / 2 ), y + kolAlto * 0o1/0o100, sZ * ( hd - kolDikeco / 2 ));
      group.add(bazo);
    }

    // Muraj lampoj kun varma ora brilo
    const lampNombro = Math.max( 1, Math.floor( hw ) - 1 );
    for ( let i = 0; i < lampNombro; i++ ) {
      const lx = -hw + ( i + 1 ) * hw * 2 / ( lampNombro + 1 );
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
        new THREE.SphereGeometry( 0o1/0o20, 0o10, 0o6 ),
        new THREE.MeshBasicMaterial({ color: GOLD_WARM, transparent: true, opacity: 0o3/0o20 })
      );
      glo.position.set( lx, y + alto * 0o5/0o10, hd - 0o3/0o10 );
      group.add(glo);
    }

    // Vertikala skribplato sur la antauxa muro
    if ( et === 0 && spec.name ) {
      const plakedInk = "#" + GOLD.toString(16).padStart(6, "0");
      // Larĝo 0o136 (94) kongruas la aspekton de la plato (4/5 × 0o15/0o10).
      // Travidebla plato: nur la teksto montrigxas super la muro (neniu nigra bloko).
      const plakedo = generiSkribanTeksajxon(nomoAih(spec.name), {
        w: 0o136, h: 0o300, ink: plakedInk,
      });
      // Alta vertikala skribplato
      const surfaco = new THREE.Mesh(
        new THREE.PlaneGeometry( 4/5, 0o15/0o10 ),
        new THREE.MeshStandardMaterial({ map: plakedo, transparent: true, roughness: 0o23/0o100, metalness: 0o55/0o100 })
      );
      surfaco.position.set( 0, y + alto * 0o3/0o10, hd - 0o1/0o20 );
      group.add(surfaco);
      // Dekora ora kadro ĉirkaŭ la plato
      const pkadro = new THREE.LineSegments(
        new THREE.EdgesGeometry( new THREE.BoxGeometry( 1, 0o16/0o10, 0o1/0o40 )),
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0o4/0o10 })
      );
      pkadro.position.set( 0, y + alto * 0o3/0o10, hd - 0o1/0o40 );
      group.add(pkadro);
    }

    aldoniInternanMeblaron( group, spec.type, hw, hd, y, alto, et, niveloj,
      lignaMaterialo, metalaMaterialo, helaMaterialo );

    // Plafonaj traboj kun oraj akcentoj
    if ( spec.type !== "kasafeo" && hw > 0o3/0o2 ) {
      const trabaMaterialo = new THREE.MeshStandardMaterial({ color: 0x1a1810, roughness: 0o67/0o100 });
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
    // Centra ligna kolono (supren kaj sub la teron)
    const kolono = new THREE.Mesh(
      new THREE.CylinderGeometry( helikso.rKol, helikso.rKol * 0o13/0o12, suproY - fundoY, 0o16 ),
      lignaMaterialo
    );
    kolono.position.set( 0, ( fundoY + suproY ) / 2, 0 );
    kolono.castShadow = true;
    group.add( kolono );
    // Paŝoj ĉirkaŭ la kolono — sub-teraj turnoj (negativaj) kaj supraj turnoj
    for ( let p = -nSube; p < nSupre; p++ ) {
      const ang = p * paŝoAngulo;
      const paŝoAlto = p < 0 ? paŝoAltoSube : paŝoAltoSupre;
      const y = heliksaAltecxo( helikso, p / helikso.perTurno );
      const paso = new THREE.Mesh(
        new THREE.BoxGeometry( paŝoLargho, paŝoAlto, radiala ),
        sxtupMaterialo
      );
      paso.position.set( rMezo * Math.sin(ang), y + paŝoAlto / 2, rMezo * Math.cos(ang) );
      paso.rotation.y = ang;
      paso.castShadow = true;
      group.add( paso );
      // Ora nazo sur la antaŭa rando de ĉiu paŝo
      const nazo = new THREE.Mesh(
        new THREE.BoxGeometry( paŝoLargho + 0o1/0o20, 0o1/0o20, 0o1/0o20 ),
        oraNazoMaterialo
      );
      nazo.position.set( ( helikso.rEkster - 0o1/0o40 ) * Math.sin(ang), y + paŝoAlto - 0o1/0o40, ( helikso.rEkster - 0o1/0o40 ) * Math.cos(ang) );
      nazo.rotation.y = ang;
      group.add( nazo );
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
      new THREE.MeshStandardMaterial({ color: 0x54402e, roughness: 0o7/0o10 })
    );
    counter.position.set( 0o5/0o10, 0o4/0o10, -md / 2 + 0o1/0o10 );
    group.add(counter);
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry( 0o3/0o10, 0o3/0o10, 0o4/0o10, 0o16 ),
      new THREE.MeshStandardMaterial({ color: 0x8a6f4a, roughness: 0o4/0o10, metalness: 0o3/0o10 })
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
      // Rondangula tablo
      const tb = new THREE.Mesh(
        new RoundedBoxGeometry( 0o16/0o10, 0o3/0o10, 0o12/0o10, 3, 0o1/0o10 ),
        new THREE.MeshStandardMaterial({ color: 0x54402e, roughness: 0o7/0o10 })
      );
      tb.position.set( tx, 0o2/0o10, tz );
      tb.castShadow = true;
      group.add( tb );
      // Ora rando ĉirkaŭ la tablo-supro
      const rando = new THREE.Mesh(
        new RoundedBoxGeometry( 0o16/0o10 + 0o1/0o20, 0o1/0o20, 0o12/0o10 + 0o1/0o20, 3, 0o1/0o10 ),
        new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0o3/0o4, roughness: 0o3/0o10 })
      );
      // Rando iomete sub la tablo-supro (0o7/0o20) por eviti z-batalan brilon
      rando.position.set( tx, 0o2/0o10 + 0o3/0o10 / 2 - 0o1/0o40 - 0o1/0o100, tz );
      rando.castShadow = true;
      group.add( rando );
      tabloj.push({ x: tx, z: tz });
      // Seĝoj sur la tri liberaj flankoj; la flanko kontraŭ la vendotablo restas sen seĝo
      const seĝajOfsetoj: [number, number][] = tz < 0
        ? [ [ -0o12/0o10, 0 ], [ 0o12/0o10, 0 ], [ 0, 0o12/0o10 ] ]
        : [ [ -0o12/0o10, 0 ], [ 0o12/0o10, 0 ], [ 0, -0o12/0o10 ], [ 0, 0o12/0o10 ] ];
      for ( const [ox, oz] of seĝajOfsetoj ) {
        const seĝo = new THREE.Mesh(
          new THREE.CylinderGeometry( 0o3/0o20, 0o4/0o20, 0o3/0o10, 0o10 ),
          new THREE.MeshStandardMaterial({ color: 0x806038, roughness: 0o7/0o10 })
        );
        seĝo.position.set( tx + ox, 0o3/0o20, tz + oz );
        seĝo.castShadow = true;
        group.add( seĝo );
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

  // Enira punkto tuj interne de la pordo
  const enirX = 0;
  const enirZ = Math.max(0o3/0o2, d / 2) - 0o4/0o10;
  const enirY = 0o4/0o10;
  const enirDirekto = 0;

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
