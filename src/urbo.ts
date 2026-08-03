// Urbo — urba konstruo. konstruajxoj, vojoj, placoj, lampoj, vegetajxo, nebulo, akvo, kanuoj
// Modula krada sistemo — vojoj kaj konstruajxaj pozicioj derivitaj de kradaj parametroj.
import * as THREE from "three";
import { konstruiSatalon, TIPARO, KonstruSpec } from "../assets/satalaj-konstruajxoj.js";
import { kreiNebulanTeksajxon } from "../assets/teksajxoj.js";
import { konstruiRiveron, konstruiLagon, RiverData } from "../assets/akvo.js";
import { konstruiBestojn, BestoSistemo } from "../assets/bestoj.js";
import { metiArbojn, konstruiArbaron, konstruiFilikojn, konstruiPurpurajnPlantojn, konstruiPurpurajnFilikojn,
  konstruiAltajnPurpurajnFilikojn, konstruiLikenSxtonojn, konstruiLarikon, konstruiHerbon, konstruiMusxajnMontetojn,
  konstruiFalintajnTrunkojn, konstruiEquisetum, konstruiLikenojn, konstruiHxsxaksxlefojn, konstruiTrunkajnLikenojn } from "../assets/vegetajxo.js";
import { konstruiVojojn, konstruiPlacojn, konstruiSpronon, konstruiPeriferiajnPlatformojn, VojDifino } from "../assets/vojoj.js";
import { konstruiDokon } from "../assets/doko.js";
import { konstruiHxeuxfojn, HxeuxfaSistemo } from "../assets/hxeuxfa-lampo.js";
import { kreiKanoton, Kanoto } from "../assets/transporto.js";
import { konstruiFiguron, gxisdatigiNpc } from "../assets/npcoj.js";
import type { Figuro, Vesto } from "../assets/npcoj.js";
import { kreiInternanSistemon, InternaSistemo } from "../assets/internoj.js";
import { konstruiKrasesxagxon } from "../assets/krasesxagxa-kosmosxipo.js";
import type { Krasesxagxo } from "../assets/krasesxagxa-kosmosxipo.js";
import { riveroZ, alteco, akvoY, montetaBazo, glataPaso, RIVERA_DUONLARĜO,
  LAGO_X, LAGO_RZ, RIVERA_ENFLUO_X, lagoZ, lagoNivelo, lagoRadio, cxuEnLago } from "./tereno.js";

export interface UrbaSistemo {
  konstruSpecoj: KonstruSpec[];
  kolizioj: { x: number; z: number; r: number }[];
  // Doka kolizio — rektangulaj platformoj (kun rotacio) por bloki suben-iron.
  // y = monda supro de la platformo ( la nivelo sur kiu oni piediras ).
  dokoKolizioj: { x: number; z: number; w: number; d: number; rot: number; y: number }[];
  selektajxoj: THREE.Mesh[];
  konstruGrupoj: THREE.Group[];
  vojSpecimenoj: THREE.Vector3[];
  placajNodoj: [number, number][];
  riverData: RiverData;
  lago: RiverData;
  bestoj: BestoSistemo;
  lampSistemo: HxeuxfaSistemo;
  nebuloj: THREE.Sprite[];
  kanuoj: Kanoto[];
  npcoj: Figuro[];
  internaSistemo: InternaSistemo;
  xipo: Krasesxagxo;
  vojDifinoj: VojDifino[];
  vojDuonLargho: (g: number) => number;
  NPCLOKOJ: [number, number][];
  VESTA_LISTO: Vesto[];
}

export function konstruiUrbon(
  sceno: THREE.Scene,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial
): UrbaSistemo {
  // ═══════════════════════════════════════════════════════════
  // 7×7 kruca arangxo — kvar-flanka simetrio: la nordo/sudo egalas la
  // oriento/okcidento. Ĉiu flanko havas tri tavolojn de tri konstruaĵojn:
  //  · UNUA tavolo ( plej proksima al la centro ) = la aliaj tipoj:
  //    mangxejoj ( kahxjenko ), kasafeoj ( kunvenoĉambroj ), sanktejo.
  //  · DUA tavolo = nur altaj turoj ( veuxkupanko ).
  //  · TRIA tavolo ( ekstera ) = nur domoj ( kapuo ).
  // La kvar anguloj ( ±3,±3 ) kaj la internaj diagonaloj estas malplenaj.
  //
  //  V = veuxkupanko (alta turo), D = domo, M = mangxejo, K = kasafeo, W = sanktejo
  //
  //       | − | − | D | D | D | − | − |   z=3 (tria tavolo — domoj)
  //       | − | V | V | V | − |   z=2 (dua tavolo — turoj)
  //       | D | V | M | K | M | V | D |   z=1 (unua tavolo — la aliaj tipoj)
  //       | D | V | K | W | K | V | D |   z=0 (centro)
  //       | D | V | M | K | M | V | D |   z=-1 (unua tavolo — la aliaj tipoj)
  //       | − | V | V | V | − |   z=-2 (dua tavolo — turoj)
  //       | − | − | D | D | D | − | − |   z=-3 (tria tavolo — domoj)
  // ═══════════════════════════════════════════════════════════
  type CellType = "domo" | "turo" | "mangxejo" | "kasafeo" | "sanktejo";

  // Konstruajxaj pozicioj. [col, row, type] kie mondo = (col*PASXO, row*PASXO), W je (0,0).
  // 7 cols × 7 rows = 33 cells (4 corner cells + 4 diagonal gaps removed). Kvar-flanka simetrio.
  const LAYOUT: [number, number, CellType][] = [
    // Row 3 — norda TRIA tavolo ( domoj )
    [ -1, 3, "domo" ], [ 0, 3, "domo" ], [ 1, 3, "domo" ],
    // Row 2 — norda DUA tavolo ( turoj )
    [ -1, 2, "turo" ], [ 0, 2, "turo" ], [ 1, 2, "turo" ],
    // Row 1 — UNUA tavolo ( mangxejoj/kasafeo ) kun la orienta/okcidenta
    // dua ( turoj ) kaj tria ( domoj ) tavoloj
    [ -3, 1, "domo" ], [ -2, 1, "turo" ], [ -1, 1, "mangxejo" ], [ 0, 1, "kasafeo" ], [ 1, 1, "mangxejo" ], [ 2, 1, "turo" ], [ 3, 1, "domo" ],
    // Row 0 — centro ( sanktejo kun kasafeoj; turoj/domoj oriente-okcidente )
    [ -3, 0, "domo" ], [ -2, 0, "turo" ], [ -1, 0, "kasafeo" ], [ 0, 0, "sanktejo" ], [ 1, 0, "kasafeo" ], [ 2, 0, "turo" ], [ 3, 0, "domo" ],
    // Row -1 — UNUA tavolo ( mangxejoj/kasafeo ) kun la orienta/okcidenta
    // dua ( turoj ) kaj tria ( domoj ) tavoloj
    [ -3, -1, "domo" ], [ -2, -1, "turo" ], [ -1, -1, "mangxejo" ], [ 0, -1, "kasafeo" ], [ 1, -1, "mangxejo" ], [ 2, -1, "turo" ], [ 3, -1, "domo" ],
    // Row -2 — suda DUA tavolo ( turoj )
    [ -1, -2, "turo" ], [ 0, -2, "turo" ], [ 1, -2, "turo" ],
    // Row -3 — suda TRIA tavolo ( domoj )
    [ -1, -3, "domo" ], [ 0, -3, "domo" ], [ 1, -3, "domo" ],
  ];

  const kolizioj: { x: number; z: number; r: number }[] = [];
  const PASXO = 0o30;

  // Konstruu la urbon el la kvadrataj celloj
  let bldgIdx = 0;
  const konstruSpecoj: KonstruSpec[] = [];
  for (const [col, row, type] of LAYOUT) {
    const x = col * PASXO, z = row * PASXO;
    if (type === null) continue;
    const niveloj = type === "sanktejo" ? 7 : type === "turo" ? 0o10 : 4;
    const w = type === "sanktejo" ? 0o12 : type === "turo" ? 0o10 : 0o10;  // kasafeo, mangxejo, domo all 8×8
    const d = w;  // square buildings. depth = width
    const tieroAlto = type === "sanktejo" ? 24/8 : type === "turo" ? 24/8 : type === "kasafeo" ? 109/32 : 205/64;
    const sube = type === "sanktejo" ? 2 : undefined;
    const tieroAltoSub = type === "sanktejo" ? 83/32 : undefined;
    konstruSpecoj.push({ x, z, type, name: "paq" + bldgIdx, niveloj, w, d, tieroAlto, sube, tieroAltoSub, rot: 0, diamond: true });
    bldgIdx++;
  }

  // Kosmoporda stacio rekte malantaŭ la norda nova ekstera domo (0,3) — la
  // domo baras la rektan vojon (plenigita vojbaro). La rotacio (PI, pordo
  // suden) estas aŭtomate fiksita de la rot-pasoj sube.
  konstruSpecoj.push({ x: 0, z: 0o140, type: "stacioxipo", name: "paq" + bldgIdx, niveloj: 3, w: 0o10, d: 0o10, tieroAlto: 109/32, rot: 0, diamond: true });
  bldgIdx++;

  // Fiksu teren-alton kaj kolizion por cxiu konstruajxo (vojoj ne bezonataj ankoraux)
  konstruSpecoj.forEach(s => {
    s.h0 = alteco(s.x, s.z);
    kolizioj.push({ x: s.x, z: s.z, r: Math.hypot(s.w, s.d) / 2 + 4/8 });
  });

  const selektajxoj: THREE.Mesh[] = [];

  // ⟪ Rivero 📃 ⟫
  // La ribono etendiĝas okcidenten multe preter la ludebla areo ( x ≤ 0o400 ),
  // do la rivero aspektas longa kaj solviĝas en la nebulon anstataŭ halti ĉe la
  // urbo-rondo. Oriente ( -x sur la norda mapo ) ĝi enfluas la lagon — la
  // ribono finiĝas ENE de la lago ( RIVERA_ENFLUO_X ), kie la lagbordo estas
  // larĝa ĉordo, do la rivero ŝajnas enflui sen videbla rando.
  const riverData = konstruiRiveron(sceno, riveroZ, akvoY, RIVERA_DUONLARĜO, 0o400, RIVERA_ENFLUO_X, 0o120);

  // ⟪ Lago oriente 📃 ⟫ — la rivero enfluas grandan lagon oriente de la valo
  // ( sur la norda mapo oriento estas -x, do la lago aperas dekstre ); la rando
  // sekvas la ondigitan elipson ( lagoRadio ), pli larĝa norde-sude.
  const lago = konstruiLagon( sceno, LAGO_X, lagoZ(), lagoRadio, lagoNivelo() );

  // ⟪ Dokoj — tri alirejoj laŭ la suda riverbordo 📃 ⟫
  // La dokoj sekvas la riverkurbon (riveroZ + 14), do cxiu pinto atingas la akvon
  // egalproporcie, kaj la meza estas pli longa cxefpiero.
  const DOKO_X = [ -0o52, 0, 0o52 ];
  const DOKO_PROFUNDOJ = [ 0o14, 0o20, 0o14 ];
  const dokoKolizioj: { x: number; z: number; w: number; d: number; rot: number; y: number }[] = [];
  for ( let i = 0; i < DOKO_X.length; i++ ) {
    const doko = konstruiDokon( sceno, DOKO_X[i], riveroZ( DOKO_X[i] ) + 0o16, 0, alteco, akvoY, DOKO_PROFUNDOJ[i] );
    // La doka platformo estas 14/8 larĝa; ĝia rotacio estas 0 (aksi-para).
    dokoKolizioj.push({ x: DOKO_X[i], z: riveroZ( DOKO_X[i] ) + 0o16, w: 14/8, d: DOKO_PROFUNDOJ[i], rot: 0, y: doko.platformY });
  }

  // ⟪ Voja reto 📃 ⟫
  const vojDifinoj: VojDifino[] = [];

  // Kolektu cxiujn apartajn kolumnojn kaj vicojn kun ne-nulaj celloj
  const colSet = new Set<number>(), rowSet = new Set<number>();
  for (const [c, r, t] of LAYOUT) {
    if (t !== null) { colSet.add(c); rowSet.add(r); }
  }
  const KOLOJ = [...colSet].sort((a, b) => a - b);
  const VICOJ = [...rowSet].sort((a, b) => a - b);

  // NS-vojoj pozicioj (inter apudaj kolumnoj)
  const RETO_X: number[] = [];
  for (let ci = 0; ci < KOLOJ.length - 1; ci++) {
    if (KOLOJ[ci + 1] - KOLOJ[ci] === 1) {
      RETO_X.push((KOLOJ[ci] + KOLOJ[ci + 1]) / 2 * PASXO);
    }
  }

  // EW-vojoj pozicioj (inter apudaj vicoj)
  const RETO_Z: number[] = [];
  for (let ri = 0; ri < VICOJ.length - 1; ri++) {
    if (VICOJ[ri + 1] - VICOJ[ri] === 1) {
      RETO_Z.push((VICOJ[ri] + VICOJ[ri + 1]) / 2 * PASXO);
    }
  }

  // Konstruajxa rotacio. frontu al centro laux la domina akso
  // (vojoj cxiam kuŝas inter apudaj vicoj/kolumnoj, do fronti al centro = fronti al plej proksima vojo)
  konstruSpecoj.forEach(s => {
    if (s.x !== 0 || s.z !== 0) {
      if (Math.abs(s.x) > Math.abs(s.z)) {
        s.rot = s.x > 0 ? -Math.PI / 2 : Math.PI / 2;
      } else {
        s.rot = s.z > 0 ? Math.PI : 0;
      }
    }
  });

  const konstruGrupoj: THREE.Group[] = [];
  konstruSpecoj.forEach(s => konstruGrupoj.push(konstruiSatalon(s, sceno, selektajxoj)));

  // ⟪ Spacosxipo — flosas super la kosmoporda stacio 📃 ⟫
  // La sxipo flosas super la stacio: ĝia plej suba parto estas ~17.97 sub la
  // origino (5 subaj tieroj), do y=30 lasas klaran spacon super la tegmento
  // (10.2 alta) — la sama malsupro-alteco kiel antaŭ la spegula plilongigo.
  const xipo: Krasesxagxo = konstruiKrasesxagxon(sceno, 0, 0o36, 0o140, oraMaterialo, eniraMaterialo);
  // La sxipa interno flosas CE LA SXIPO (ne sur la tero): marku la stacion per la
  // fluga alteco, por ke eniri la spacosxipon teleportu al la supro kie gxi estas.
  const stacioSxipo = konstruSpecoj.find(s => s.type === "stacioxipo");
  if (stacioSxipo) stacioSxipo.flugoY = xipo.group.position.y;

  // Konstruu aron da celloj por rapida sercxo
  const hasCellAt = (c: number, r: number) =>
    LAYOUT.some(([lc, lr, lt]) => lc === c && lr === r && lt !== null);

  // La veraj rando-nodoj de la voja reto: la finoj de cxiu vojo-linio, kie la
  // segmentoj haltas ( sen aldonaj stumpoj ). Nur tiuj ricevas rondigitajn ĉapojn.
  const placajNodoj: [number, number][] = [];
  const aldoniPlacon = (x: number, z: number) => {
    if (Math.abs(z - riveroZ(x)) < 0o17) return;
    if (Math.hypot(x, z) > 0o170) return;
    for (const s of konstruSpecoj) {
      if (Math.hypot(x - s.x, z - s.z) < Math.max(s.w, s.d) / 2 + 12/8) return;
    }
    placajNodoj.push([x, z]);
  };

  // Realaj intersekcoj de la voja reto ( kie kaj EW kaj NS vojo efektive
  // ekzistas ). Nur tiuj ricevas la kvar-lampan ŝablonon; malplenaj regionoj
  // sen vojo restas sen lampoj.
  const realajIntersekcoj = new Set<string>();

  // Por cxiu EW-vojo (inter apudaj vicoj), kreu segmentojn inter NS-vojoj
  for (const roadZ of RETO_Z) {
    const r1 = Math.round(roadZ / PASXO - 4/8);
    const r2 = Math.round(roadZ / PASXO + 4/8);
    // Trovu kiuj NS-vojoj intersekcas cxi tiun EW-vojon
    const intersecting: number[] = [];
    for (const rx of RETO_X) {
      const c1 = Math.round(rx / PASXO - 4/8);
      const c2 = Math.round(rx / PASXO + 4/8);
      if (hasCellAt(c1, r1) || hasCellAt(c1, r2) ||
          hasCellAt(c2, r1) || hasCellAt(c2, r2)) {
        intersecting.push(rx);
      }
    }
    if (intersecting.length < 2) continue;
    for (const rx of intersecting) realajIntersekcoj.add(rx + "," + roadZ);

    // Konstruu segmentojn NUR inter intersekcaj NS-vojoj — neniuj randaj stumpoj
    const pts = [...intersecting].sort((a, b) => a - b);
    // Rando-nodoj: la du finoj de cxi tiu EW-linio.
    aldoniPlacon(pts[0], roadZ);
    aldoniPlacon(pts[pts.length - 1], roadZ);
    const w = 14/8;  // uniform 1.75 half-width
    for (let i = 0; i < pts.length - 1; i++) {
      const x1 = pts[i], x2 = pts[i + 1];
      if (Math.abs(x2 - x1) > 1/8) {
        vojDifinoj.push({ pts: [[x1, roadZ], [x2, roadZ]], w });
      }
    }
  }

  // Por cxiu NS-vojo (inter apudaj kolumnoj), kreu segmentojn inter EW-vojoj
  for (const roadX of RETO_X) {
      const c1 = Math.round(roadX / PASXO - 4/8);
      const c2 = Math.round(roadX / PASXO + 4/8);
    // Trovu kiuj EW-vojoj intersekcas cxi tiun NS-vojon
    const intersecting: number[] = [];
    for (const rz of RETO_Z) {
      const r1 = Math.round(rz / PASXO - 4/8);
      const r2 = Math.round(rz / PASXO + 4/8);
      if (hasCellAt(c1, r1) || hasCellAt(c1, r2) ||
          hasCellAt(c2, r1) || hasCellAt(c2, r2)) {
        intersecting.push(rz);
      }
    }
    if (intersecting.length < 2) continue;
    for (const rz of intersecting) realajIntersekcoj.add(roadX + "," + rz);

    // Konstruu segmentojn NUR inter intersekcaj EW-vojoj — neniuj randaj stumpoj
    const pts = [...intersecting].sort((a, b) => a - b);
    // Rando-nodoj: la du finoj de cxi tiu NS-linio.
    aldoniPlacon(roadX, pts[0]);
    aldoniPlacon(roadX, pts[pts.length - 1]);
    const w = 14/8;  // uniform 1.75 half-width
    for (let i = 0; i < pts.length - 1; i++) {
      const z1 = pts[i], z2 = pts[i + 1];
      if (Math.abs(z2 - z1) > 1/8) {
        vojDifinoj.push({ pts: [[roadX, z1], [roadX, z2]], w });
      }
    }
  }

  // Rivervojo — la dokoj okupas la mezon, do la promenvojo disigas sin
  // maldekstre kaj dekstre por eviti geometriajn interkovrojn kun la platformoj.
  // Cxiu brancxo finigxas cxe la norda rando de sia doko (kiu sekvas la riveron).
  const dokaNordaRando = ( i: number ) => riveroZ( DOKO_X[i] ) + 0o16 + DOKO_PROFUNDOJ[i] / 2;
  vojDifinoj.push({ pts: [ [ -0o124, -0o144 ], [ -0o70, -0o150 ], [ DOKO_X[0], dokaNordaRando( 0 ) ] ], w: 14/8 });
  vojDifinoj.push({ pts: [ [ DOKO_X[2], dokaNordaRando( 2 ) ], [ 0o70, -0o136 ], [ 0o124, -0o136 ] ], w: 14/8 });

  // Docka avenuo — ĝia ĉefa akso kongruas kun la urba krada vojo ĉe x=12.
  // Ĉiu branĉo finiĝas ĉe la norda rando de sia doko, ne tra ĝia platformo.
  const dockaLandaRando: [ number, number ][] = DOKO_X.map( ( dx, i ) => [ dx, dokaNordaRando( i ) ] );
  vojDifinoj.push({ pts: [ [ 0o14, -0o44 ], [ 0o14, -0o131 ] ], w: 14/8 });
  // Brancxoj de la avenuo al la dokoj. La OKCIDENTA brancxo iras NORDEN de la meza
  // platformo (la meza brancxo okupas la rektan okcidentan koridoron, kaj la malnova
  // rekta okcidenta brancxo kunkolis kun gxi kaj trairis la mezan platformon) kaj
  // alproksimigxas la okcidentan dokon de la nordo, perpendikulare al gia dorsa
  // rando — neniu interkovro kun la meza brancxo, neniu trairo tra la platformo.
  for ( let i = 0; i < dockaLandaRando.length; i++ ) {
    const [ dx, dz ] = dockaLandaRando[i];
    if ( i === 0 ) {
      vojDifinoj.push({ pts: [ [ 0o14, -0o124 ], [ -0o10, -0o125 ], [ DOKO_X[0], -0o137 ], [ dx, dz ] ], w: 14/8 });
    } else {
      vojDifinoj.push({ pts: [ [ 0o14, -0o131 ], [ dx, dz ] ], w: 14/8 });
    }
  }

  // Arbarvojo — la stacidoma vojo ne kondukas REKTE al la konstruaĵo:
  // anstataŭe ĝi kondukas al KVADRATA vojo ĉirkaŭ la norda nova ekstera domo
  // (0,3) kiu baras la rektan vojon. La domo formas "plenigitan vojbaron"
  // (la urba sprono finiĝas ĉe ĝia suda pordo ĉe z=60). La suda flanko de la
  // kvadrato estas la ekzistanta kradvojo ĉe z=60; la orienta/okcidenta
  // flankoj plilongiĝas la kradvojojn ĉe x=±12; la norda flanko estas nova
  // EW-vojo ĉe z=84. De la norda flanko la stacidoma vojo rampas sur la
  // lanĉ-apronon ĝis la stacia pordo (z=92). La vojo-supro sekvus la terenon
  // +2/8 kaj enpuŝus ĝis 3/16 SUPER la apron-supron (h0 + 1/16), do ĝi
  // ricevas propran altan funkcion kiu rampas malsupren al la aprona nivelo
  // dum la lastaj ~2 unuoj (z 88..90). Sur la aprono la vojo kuŝas ĝuste sur
  // la supro — la voja polygonOffset gajnas la koincidajn facojn kontraŭ la
  // aprono, kaj ĝi pasas 1/64 SUB la orajn bendojn (ĝia supro je h0 + 4/64,
  // la bendoj je h0 + 5/64) — neniu z-flagrado, kaj ĝi atingas la pordon ĉe
  // la muro.
  const stacioH0 = stacioSxipo ? (stacioSxipo.h0 ?? alteco(0, 0o140)) : alteco(0, 0o140);
  const apronaNivelo = stacioH0 + 1/16 - 2/8;
  const arbarvojaAlteco = (x: number, z: number): number => {
    const t = glataPaso(0o130, 0o132, z);
    return alteco(x, z) * (1 - t) + apronaNivelo * t;
  };
  // Kvadrata ringo ĉirkaŭ la baranta domo (0,3): orienta/okcidenta flankoj
  // (x=±12, z 60..84) kaj norda flanko (z=84, x ±12). La suda flanko estas la
  // ekzistanta kradvojo ĉe z=60.
  vojDifinoj.push({ pts: [ [ 0o14, 0o74 ], [ 0o14, 0o124 ] ], w: 14/8 });
  vojDifinoj.push({ pts: [ [ -0o14, 0o74 ], [ -0o14, 0o124 ] ], w: 14/8 });
  vojDifinoj.push({ pts: [ [ -0o14, 0o124 ], [ 0o14, 0o124 ] ], w: 14/8 });
  // (0,84) = norda flanko de la kvadrato; (0,92) = stacia pordo.
  vojDifinoj.push({
    pts: [ [ 0, 0o124 ], [ 0, 0o130 ], [ 0, 0o132 ], [ 0, 0o134 ] ],
    w: 14/8,
    heightFn: arbarvojaAlteco
  });

  // Voja duon-larĝo — la segmenta larĝo estas 14/8, do ĝia duon-larĝo estas 7/8.
  function vojDuonLargho(_g: number): number {
    return 7/8;
  }

  // ⟪ Spronvojoj 📃 ⟫
  // La spronaj specimenoj kovras ankaŭ la spur-vojojn, por ke neniu planto
  // povu aperi sur ili ( ili ne estas en vojDifinoj ).
  const spronajSpecimenoj: THREE.Vector3[] = [];
  for (const s of konstruSpecoj) {
    if (s.x === 0 && s.z === 0) continue;
    // La kosmoporda stacio havas propran arbarvojon (vidu sube) — neniu aŭtomata sprono.
    if (s.type === "stacioxipo") continue;
    const rot = s.rot || 0;
    const pordoOffset = s.d / 2 + 12/8;
    const pordoX = s.x + Math.sin(rot) * pordoOffset;
    const pordoZ = s.z + Math.cos(rot) * pordoOffset;
    // La sprono komencigxas cxe la muro-bazo (ne 12/8 for), por ke la vojo
    // atingas la konstruajxon kaj estas pli longa.
    const spronoX = s.x + Math.sin(rot) * (s.d / 2);
    const spronoZ = s.z + Math.cos(rot) * (s.d / 2);

    const fX = Math.sin(rot), fZ = Math.cos(rot);
    let vojX: number, vojZ: number;

    if (Math.abs(fX) > Math.abs(fZ)) {
      const signo = fX > 0 ? 1 : -1;
      let celX = signo > 0 ? Math.max(...RETO_X) : Math.min(...RETO_X);
      for (const rx of RETO_X) {
        if (signo > 0 && rx > pordoX && rx < celX) celX = rx;
        if (signo < 0 && rx < pordoX && rx > celX) celX = rx;
      }
      const duonL = vojDuonLargho(celX);
      vojX = celX - signo * duonL;
      vojZ = spronoZ;
    } else {
      const signo = fZ > 0 ? 1 : -1;
      let celZ = signo > 0 ? Math.max(...RETO_Z) : Math.min(...RETO_Z);
      for (const rz of RETO_Z) {
        if (signo > 0 && rz > pordoZ && rz < celZ) celZ = rz;
        if (signo < 0 && rz < pordoZ && rz > celZ) celZ = rz;
      }
      const duonL = vojDuonLargho(celZ);
      vojX = spronoX;
      vojZ = celZ - signo * duonL;
    }

    if (Math.hypot(spronoX - vojX, spronoZ - vojZ) > 4/8) {
      konstruiSpronon(spronoX, spronoZ, vojX, vojZ, alteco, dioritaMaterialo, andezitaMaterialo, sceno);
      // Densaj specimenoj laŭ la sprono — saman distancon kiel la ĉefaj vojoj.
      const spurro = Math.hypot(vojX - spronoX, vojZ - spronoZ);
      const nombro = Math.max(1, Math.round(spurro / 2));
      for (let k = 0; k <= nombro; k++) {
        const t = k / nombro;
        const sx = spronoX + (vojX - spronoX) * t;
        const sz = spronoZ + (vojZ - spronoZ) * t;
        spronajSpecimenoj.push(new THREE.Vector3(sx, alteco(sx, sz), sz));
      }
    }
  }

  const vojSpecimenoj = konstruiVojojn(sceno, vojDifinoj, alteco, dioritaMaterialo, andezitaMaterialo);
  // Kunigi la spur-vojojn kun la ĉefaj vojoj, por ke la ekskludo kovru ĉion.
  vojSpecimenoj.push(...spronajSpecimenoj);

  // ⟪ Placoj 📃 ⟫ — ĉapoj ĉe la veraj rando-nodoj kolektitaj dum la voja reto
  // ( la finoj de ĉiu linio ), ne plu nur ĉe la kvar anguloj de la tuta skatolo.
  konstruiPlacojn(sceno, placajNodoj, alteco, dioritaMaterialo, andezitaMaterialo);

  // ⟪ Arbar-randaj platformoj 📃 ⟫
  // Rondigitaj diamantoj donas malgrandajn ripozlokojn sen kovri la vojan reton.
  const periferiajLokoj: [ number, number ][] = [
    [ -0o150, 0o40 ], [ -0o110, 0o110 ], [ -0o35, 0o150 ], [ 0o40, 0o150 ],
    [ 0o112, 0o100 ], [ 0o150, 0o30 ], [ 0o130, -0o100 ], [ -0o130, -0o100 ],
  ];
  const periferiajPlatformoj = konstruiPeriferiajnPlatformojn(
    sceno, periferiajLokoj, alteco, dioritaMaterialo, andezitaMaterialo
  );

  // ⟪ Lampoj 📃 ⟫
  const lampLokoj: { x: number; z: number; y: number; rotacio?: number }[] = [];
  const addLamp = (x: number, z: number, bazaY = alteco( x, z ), rotacio = Math.PI / 4) => {
    for (const s of konstruSpecoj) {
      const difX = Math.sin(s.rot || 0), difZ = Math.cos(s.rot || 0);
      const pordoX = s.x + difX * (s.d / 2 + 12/8), pordoZ = s.z + difZ * (s.d / 2 + 12/8);
      if (Math.hypot(x - pordoX, z - pordoZ) < 4) return;
      if (Math.hypot(x - s.x, z - s.z) < Math.max(s.w, s.d) / 2 + 12/8) return;
    }
    // Evitu meti lampojn sur ekzistantajn lampojn (ene de 2 unuoj)
    for (const ekz of lampLokoj) {
      if (Math.hypot(x - ekz.x, z - ekz.z) < 2) return;
    }
    lampLokoj.push({ x, z, y: bazaY, rotacio });
  };
  for (const [aX, aZ] of placajNodoj) {
    for (const [ox, oz] of [ [ -17/8, -17/8 ], [ 17/8, -17/8 ], [ -17/8, 17/8 ], [ 17/8, 17/8 ] ]) addLamp(aX + ox, aZ + oz);
  }  // Platformoj estas diamantaj (pintoj laŭ la aksoj), do iliaj lampoj estu sam-orientitaj.
  // Lampoj estas plantitaj en la platforman supran tavolon (y + 2/8 + 2/8 - 1/32).
  for ( const [ x, z ] of periferiajPlatformoj ) addLamp( x, z, alteco( x, z ) + 4/8 - 1/32, 0 );
  for (const gx of RETO_X) {
    for (const gz of RETO_Z) {
      // Nur realaj vojkruciĝoj ( kaj ne la rivero ) ricevas la kvar-lampan
      // ŝablonon; malplenaj regionoj sen vojo restas sen lampoj.
      if (Math.abs(gz - riveroZ(gx)) < 0o14) continue;
      if (!realajIntersekcoj.has(gx + "," + gz)) continue;
      // Kvar lampoj en la kvar kvadratoj ĉirkaŭ ĉiu intersekco.
      addLamp(gx + 19/8, gz + 19/8);
      addLamp(gx + 19/8, gz - 19/8);
      addLamp(gx - 19/8, gz + 19/8);
      addLamp(gx - 19/8, gz - 19/8);
    }
  }
  const lampSistemo = konstruiHxeuxfojn(sceno, lampLokoj, dioritaMaterialo, oraMaterialo);
  // Lampaj kolizioj — malgrandaj cirkloj ĉirkaŭ ĉiu lampa kolono.
  for ( const l of lampLokoj ) kolizioj.push({ x: l.x, z: l.z, r: 5/8 });

  // ⟪ Vegetajxo 📃 ⟫
  const ekskluziviRiveron = (x: number, z: number) => Math.abs(z - riveroZ(x)) < 7 || cxuEnLago(x, z);
  const ekskluziviVojojn = (x: number, z: number, m: number) => {
    for (const p of vojSpecimenoj) if (Math.hypot(x - p.x, z - p.z) < m) return true;
    // La arbar-randaj diamantaj platformoj estas pavimitaj restlokoj — la
    // samaj pavim-specimenoj, por ke neniu planto aperu sur ili.
    for (const [px, pz] of periferiajLokoj) if (Math.hypot(x - px, z - pz) < m + 3) return true;
    return false;
  };
  const ekskluziviKonstruajxon = (x: number, z: number, m: number) => {
    for (const s of konstruSpecoj) if (Math.hypot(x - s.x, z - s.z) < s.w * 19/32 + m) return true;
    return false;
  };
  // Betuloj ( arbara periferio ) — pli densa ol antauxe
  const arboj = metiArbojn( alteco, 0o400, 0o200, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53104 );
  const betulajTrunkoj = konstruiArbaron( sceno, arboj );

  // Larikoj — miksitaj kun betuloj por pli diversa arbaro
  // La inter-arba distanco estas malgranda, por ke la larikoj vere aperu
  // inter la betuloj — tro granda liberspaco lasis preskaŭ neniun lokon.
  const larikoj = metiArbojn( alteco, 0o200, 0o200, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53114, arboj, 0o10 );
  const larikajTrunkoj = konstruiLarikon( sceno, larikoj );

  // Ĥŝakŝlefoj ( ı],ͷ̗ɔʞ ֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ ) — purpuraj laktuk-arboj, 3–5
  // tavoloj de kvar grandaj kurbiĝintaj folioj kaj segmenta ŝelo
  const hxsxaksxlefoj = metiArbojn( alteco, 0o100, 0o200, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o62445, [ ...arboj, ...larikoj ], 0o10 );
  const hxsxaksxlefojTrunkoj = konstruiHxsxaksxlefojn( sceno, hxsxaksxlefoj );

  // Trunkaj likenoj — tridimensiaj krustaj buloj sur iuj arbotrunkoj. La
  // trunkaj matricoj jam donas la realan pozicion/kliniĝon de ĉiu arbo, do
  // la likenoj sidas ĝuste sur la ŝelo sen ripeto de la hazardaj vokoj.
  konstruiTrunkajnLikenojn( sceno, [ betulajTrunkoj, larikajTrunkoj, hxsxaksxlefojTrunkoj ] );

  // Filikoj — pli da kvanto, apud arboj kaj vojoj
  konstruiFilikojn( sceno, 0o400, alteco, arboj, vojSpecimenoj, ekskluziviRiveron, ekskluziviVojojn );

  // Purpuraj plantoj — ringo de koloro ĉe la urba rando, kie la vojoj dissolvigas en arbaron
  konstruiPurpurajnPlantojn( sceno, 0o200, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon );

  // Purpuraj filikoj — pli altaj violetaj frondoj kiel en Four Groves
  konstruiPurpurajnFilikojn( sceno, 0o200, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon );
  konstruiAltajnPurpurajnFilikojn( sceno, 0o100, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon );

  // Liken-sxtonoj — en la arbaro; la metitaj pozicioj ankoras la likenojn.
  const likenSxtonoj = konstruiLikenSxtonojn( sceno, 0o60, alteco, ekskluziviRiveron, ekskluziviVojojn );

  // Likeno — krustaj makuloj sur la grundo apud arboj kaj sxtonoj
  konstruiLikenojn( sceno, 0o200, alteco, [ ...arboj, ...larikoj, ...hxsxaksxlefoj ], likenSxtonoj, ekskluziviRiveron, ekskluziviVojojn );

  // Herbo — densa herbtapiso en la arbaro kaj randoj
  konstruiHerbon( sceno, 0o600, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon );

  // Musko montetoj — apud arboj tra la arbaro
  konstruiMusxajnMontetojn( sceno, 0o200, alteco, arboj, ekskluziviRiveron, ekskluziviVojojn );


  // Falintaj trunkoj — en la densa arbaro
  konstruiFalintajnTrunkojn( sceno, 0o40, alteco, arboj, ekskluziviRiveron, ekskluziviVojojn );

  // Equisetum ( kavalerbo ) — laux la riverbordoj kaj la lagbordo ( la lago
  // estas akvo, do neniu planto ene de la lagdisko )
  konstruiEquisetum( sceno, 0o120, alteco, riveroZ,
    (x: number, z: number) => ekskluziviKonstruajxon(x, z, 3) || cxuEnLago(x, z), ekskluziviVojojn );

  // ⟪ Nebulaj sprajtoj 📃 ⟫
  const nebulaTeksajxo = kreiNebulanTeksajxon();
  const nebuloj: THREE.Sprite[] = [];
  for (const [x, z, y, skalo, op] of [
    [ -0o106, -0o106, 20/8, 0o50, 5/32 ], [ -0o36, -0o110, 141/64, 0o54, 3/16 ],
    [ 0o24, -0o106, 179/64, 0o50, 5/32 ], [ 0o74, -0o104, 77/32, 0o44, 5/32 ],
    [ -0o62, -0o55, 115/64, 0o36, 9/64 ], [ -0o113, 0o36, 51/32, 0o32, 3/32 ],
    [ 0o106, -0o50, 115/64, 0o34, 3/32 ], [ -0o74, 0o106, 12/8, 0o30, 3/32 ],
    [ 0o101, 0o106, 109/64, 0o32, 5/64 ], [ -0o132, 0o12, 45/32, 0o26, 1/8 ],
  ]) {
    const materialo = new THREE.SpriteMaterial({ map: nebulaTeksajxo, transparent: true, opacity: op, depthWrite: false });
    const sp = new THREE.Sprite(materialo);
    sp.position.set(x, y, z); sp.scale.setScalar(skalo);
    sp.userData = { rapido: 13/32 + Math.random() * 8/8 };
    sceno.add(sp); nebuloj.push(sp);
  }
  for (let i = 0; i < 0o50; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 0o120 + Math.random() * 0o310;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const y = alteco(x, z) + 4/8 + Math.random() * 3;
    const materialo = new THREE.SpriteMaterial({
      map: nebulaTeksajxo, transparent: true,
      opacity: 1/8 + Math.random() * 5/32,
      depthWrite: false,
    });
    const sp = new THREE.Sprite(materialo);
    sp.position.set(x, y, z);
    sp.scale.setScalar(0o62 + Math.random() * 0o120);
    sp.userData = { rapido: 13/64 + Math.random() * 4/8 };
    sceno.add(sp); nebuloj.push(sp);
  }

  // ⟪ Kanuoj 📃 ⟫
  // La kanuoj sekvas la novajn dokpintojn (riveroZ + 3, en la akvo) por resti atingeblaj de la dokoj.
  const kanuoj: Kanoto[] = [];
  // La eksteraj kanuoj estas la nova "satala" stilo (malhel-pina/ora, kongrua al
  // la arkitekturo); la centra restas la baza hela stilo.
  kanuoj.push(kreiKanoton(sceno, 0o52, riveroZ(0o52) + 3, -Math.PI * 2/8, oraMaterialo, akvoY(0o52), "satala"));
  kanuoj.push(kreiKanoton(sceno, -0o52, riveroZ(-0o52) + 3, Math.PI * 2/8, oraMaterialo, akvoY(-0o52), "satala"));
  kanuoj.push(kreiKanoton(sceno, 0, riveroZ(0) + 3, -Math.PI * 4/8, oraMaterialo, akvoY(0)));

  // ⟪ Ktenoforoj 📃 ⟫
  // Travideblaj kombuloj ( Beroe, Mnemiopsis, Pleŭrobrakia ) naĝas en la rivero,
  // evitante la dokojn. Ilia animacio okazas en sperto.ts ( gxisdatigiBestojn ).
  const bestoj = konstruiBestojn( sceno, 0o30, riveroZ, akvoY, RIVERA_DUONLARĜO,
    { x: LAGO_X, z: lagoZ(), r: LAGO_RZ, nivelo: lagoNivelo() } );

  // ⟪ NPC-agordo 📃 ⟫
  const VESTA_LISTO: Vesto[] = [
    { nomo: "vestoVerdant", ĉefa: 0x184838, akcenta: 0xd8b068, interno: 0x103828, pantalono: 0x285880, botoj: 0x583818 },
    { nomo: "vestoHearth", ĉefa: 0x584830, akcenta: 0xd8c8a0, interno: 0x302818, pantalono: 0x3878a0, botoj: 0x583808 },
    { nomo: "vestoMist", ĉefa: 0xd8e0e0, akcenta: 0x889898, interno: 0xa8b8b8, pantalono: 0x5898b8, botoj: 0x503808 },
    { nomo: "vestoEmber", ĉefa: 0x783828, akcenta: 0xe0a858, interno: 0x402018, pantalono: 0x2858a0, botoj: 0x583838 },
  ];

  // Generu NPC-ojn poziciojn laux vojrandoj tra la diamanta arangxo
  const NPCLOKOJ: [number, number][] = [];
  const NPCLOKOJ_SET = new Set<string>();
  const addNPCLoc = (x: number, z: number) => {
    const rx = Math.round(x * 10) / 10, rz = Math.round(z * 10) / 10;
    const k = `${rx},${rz}`;
    if (!NPCLOKOJ_SET.has(k)) { NPCLOKOJ_SET.add(k); NPCLOKOJ.push([x, z]); }
  };
  // NPC-oj laux EW-vojrandoj — unu offset norde kaj sude de cxiu EW-vojo
  for (const rz of RETO_Z) {
    for (const rx of RETO_X) {
      const ox = 4;
      addNPCLoc(rx + ox, rz - 4);
      addNPCLoc(rx - ox, rz - 4);
      addNPCLoc(rx + ox, rz + 4);
      addNPCLoc(rx - ox, rz + 4);
    }
  }
  // Ekstraj NPC-oj laux la eksteraj vojrandoj
  for (const rx of RETO_X) {
    addNPCLoc(rx + 4, -0o70 - 4);
    addNPCLoc(rx - 4, -0o70 - 4);
  }

  const npcoj: Figuro[] = [];
  for (const [sX, sZ] of NPCLOKOJ) {
    const bad = ekskluziviRiveron(sX, sZ) || ekskluziviKonstruajxon(sX, sZ, 3);
    if (bad) continue;
    const fig = konstruiFiguron(VESTA_LISTO[npcoj.length % VESTA_LISTO.length], Math.random() < 1/4);
    const h = alteco(sX, sZ);
    fig.group.position.set(sX, h, sZ);
    fig.hejmo.set(sX, h, sZ);
    fig.celo.set(sX, h, sZ);
    fig.atendo = Math.random() * 4;
    fig.rapido = 45/64 + Math.random() * 4/8;
    sceno.add(fig.group);
    npcoj.push(fig);
  }

  // ⟪ Interna sistemo 📃 ⟫
  const internaSistemo: InternaSistemo = kreiInternanSistemon();

  return {
    konstruSpecoj, kolizioj, dokoKolizioj, selektajxoj, konstruGrupoj,
    vojSpecimenoj, placajNodoj,    riverData, lago, bestoj, lampSistemo,
    nebuloj, kanuoj, npcoj, internaSistemo, xipo, vojDifinoj, vojDuonLargho,
    NPCLOKOJ, VESTA_LISTO,
  };
}
