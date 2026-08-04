// Urbo — urba konstruo. konstruajxoj, vojoj, placoj, lampoj, vegetajxo, nebulo, akvo, kanuoj
// Modula krada sistemo — vojoj kaj konstruajxaj pozicioj derivitaj de kradaj parametroj.
import * as THREE from "three";
import { konstruiSatalon, TIPARO, KonstruSpec } from "../assets/satalaj-konstruajxoj.js";
import { kreiNebulanTeksajxon } from "../assets/teksajxoj.js";
import { konstruiRiveron, konstruiLagon, RiverData } from "../assets/akvo.js";
import { konstruiBestojn, BestoSistemo, konstruiPetrelojn, PetreloSistemo } from "../assets/shalaj-specioj/bestoj.js";
import { kreiArbarerojn, metiArbojn, konstruiArbaron, konstruiFilikojn, konstruiPurpurajnPlantojn, konstruiPurpurajnFilikojn,
  konstruiAltajnPurpurajnFilikojn, konstruiLikenSxtonojn, konstruiLarikon, konstruiHerbon, konstruiMusxajnMontetojn,
  konstruiFalintajnTrunkojn, konstruiCetkuojn, konstruiLikenojn, konstruiHxsxaksxlefojn, konstruiTrunkajnLikenojn,
  metiArbojnCxirkauLagon, konstruiHerbonCxirkauLagon, konstruiCakeojn, metiMontajnArbojn, konstruiMontajnRokojn,
  kronaRadiusoLarika, kronaRadiusoHxsxaksxlefa } from "../assets/shalaj-specioj/vegetajxo.js";
import { konstruiVojojn, konstruiPlacojn, konstruiSpronon, konstruiPeriferiajnPlatformojn, VojDifino } from "../assets/vojoj.js";
import { konstruiDokon } from "../assets/doko.js";
import { konstruiHxeuxfojn, HxeuxfaSistemo } from "../assets/hxeuxfa-lampo.js";
import { konstruiKeuxfhxeso, KeuxfhxesoLoko } from "../assets/keuxfhxeso.js";
import { kreiKanoton, Kanoto } from "../assets/transporto.js";
import { konstruiFiguron, gxisdatigiNpc } from "../assets/shalaj-specioj/homoj.js";
import type { Figuro, Vesto } from "../assets/shalaj-specioj/homoj.js";
import { kreiInternanSistemon, InternaSistemo } from "../assets/internoj.js";
import { konstruiKrasesxagxon } from "../assets/krasesxagxa-kosmosxipo.js";
import type { Krasesxagxo } from "../assets/krasesxagxa-kosmosxipo.js";
import { riveroZ, alteco, akvoY, montetaBazo, glataPaso, RIVERA_DUONLARĜO,
  LAGO_X, LAGO_RZ, RIVERA_BUŜO_X, riveraAkvaNivelo, lagoZ, lagoNivelo, lagoRadio, cxuEnLago, akvaNivelo } from "./tereno.js";
import { VESTOJ } from "../assets/vestoj.js";

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
  petreloj: PetreloSistemo;
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
  // 7×7 kruca arangxo — kvar-flanka simetrio. La nordo/sudo egalas la
  // oriento/okcidento. Ĉiu flanko havas tri tavolojn de tri konstruaĵojn.
  //  · UNUA tavolo ( plej proksima al la centro ) = la aliaj tipoj.
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
    const tieroAlto = type === "sanktejo" ? 0o30/0o10 : type === "turo" ? 0o30/0o10 : type === "kasafeo" ? 0o155/0o40 : 0o315/0o100;
    const sube = type === "sanktejo" ? 2 : undefined;
    const tieroAltoSub = type === "sanktejo" ? 0o123/0o40 : undefined;
    konstruSpecoj.push({ x, z, type, name: "paq" + bldgIdx, niveloj, w, d, tieroAlto, sube, tieroAltoSub, rot: 0, diamond: true });
    bldgIdx++;
  }

  // Kosmoporda stacio rekte malantaŭ la norda nova ekstera domo (0,3) — la
  // domo baras la rektan vojon (plenigita vojbaro). La rotacio (PI, pordo
  // suden) estas aŭtomate fiksita de la rot-pasoj sube.
  konstruSpecoj.push({ x: 0, z: 0o140, type: "stacioxipo", name: "paq" + bldgIdx, niveloj: 3, w: 0o10, d: 0o10, tieroAlto: 0o155/0o40, rot: 0, diamond: true });
  bldgIdx++;

  // Fiksu teren-alton kaj kolizion por cxiu konstruajxo (vojoj ne bezonataj ankoraux)
  konstruSpecoj.forEach(s => {
    s.h0 = alteco(s.x, s.z);
    kolizioj.push({ x: s.x, z: s.z, r: Math.hypot(s.w, s.d) / 2 + 0o4/0o10 });
  });

  const selektajxoj: THREE.Mesh[] = [];

  // ⟪ Rivero 📃 ⟫
  // La ribono etendiĝas okcidenten multe preter la ludebla areo ( x ≤ 0o400 ),
  // do la rivero aspektas longa kaj solviĝas en la nebulon anstataŭ halti ĉe la
  // urbo-rondo. Oriente ( -x sur la norda mapo ) ĝi enfluas la lagon. La ribono
  // finiĝas ĉe la lagbordo ( RIVERA_BUŜO_X ) kaj mallarĝiĝas glate al punkto,
  // dum la akvonivelo krampiĝas al la laga nivelo — neniu duobla surfaco aŭ
  // paŝo ĉe la buŝo. La tereno-profundo ( alteco ) koloriĝas la akvon laŭ la fundo.
  const riverData = konstruiRiveron(sceno, riveroZ, riveraAkvaNivelo, RIVERA_DUONLARĜO, 0o400, RIVERA_BUŜO_X, 0o120, alteco);

  // ⟪ Lago oriente 📃 ⟫ — la rivero enfluas grandan lagon oriente de la valo
  // ( sur la norda mapo oriento estas -x, do la lago aperas dekstre ); la rando
  // sekvas la ondigitan elipson ( lagoRadio ), pli larĝa norde-sude.
  const lago = konstruiLagon( sceno, LAGO_X, lagoZ(), lagoRadio, lagoNivelo(), alteco );

  // ⟪ Dokoj — tri alirejoj laŭ la suda riverbordo 📃 ⟫
  // La dokoj sekvas la riverkurbon (riveroZ + 14), do cxiu pinto atingas la akvon
  // egalproporcie, kaj la meza estas pli longa cxefpiero.
  const DOKO_X = [ -0o52, 0, 0o52 ];
  const DOKO_PROFUNDOJ = [ 0o14, 0o20, 0o14 ];
  const dokoKolizioj: { x: number; z: number; w: number; d: number; rot: number; y: number }[] = [];
  for ( let i = 0; i < DOKO_X.length; i++ ) {
    const doko = konstruiDokon( sceno, DOKO_X[i], riveroZ( DOKO_X[i] ) + 0o16, 0, alteco, akvoY, DOKO_PROFUNDOJ[i] );
    // La doka platformo estas 0o16/0o10 larĝa; ĝia rotacio estas 0 (aksi-para).
    dokoKolizioj.push({ x: DOKO_X[i], z: riveroZ( DOKO_X[i] ) + 0o16, w: 0o16/0o10, d: DOKO_PROFUNDOJ[i], rot: 0, y: doko.platformY });
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
  // La sxipo flosas super la stacio. Ĝia plej suba parto estas ~17.97 sub la
  // origino (5 subaj tieroj), do y=30 lasas klaran spacon super la tegmento
  // (10.2 alta) — la sama malsupro-alteco kiel antaŭ la spegula plilongigo.
  const xipo: Krasesxagxo = konstruiKrasesxagxon(sceno, 0, 0o36, 0o140, oraMaterialo, eniraMaterialo);
  // La sxipa interno flosas CE LA SXIPO ( ne sur la tero ). Marku la stacion per la
  // fluga alteco, por ke eniri la spacosxipon teleportu al la supro kie gxi estas.
  const stacioSxipo = konstruSpecoj.find(s => s.type === "stacioxipo");
  if (stacioSxipo) stacioSxipo.flugoY = xipo.group.position.y;

  // Konstruu aron da celloj por rapida sercxo
  const hasCellAt = (c: number, r: number) =>
    LAYOUT.some(([lc, lr, lt]) => lc === c && lr === r && lt !== null);

  // La veraj rando-nodoj de la voja reto. La finoj de cxiu vojo-linio, kie la
  // segmentoj haltas ( sen aldonaj stumpoj ). Nur tiuj ricevas rondigitajn ĉapojn.
  const placajNodoj: [number, number][] = [];
  const aldoniPlacon = (x: number, z: number) => {
    if (Math.abs(z - riveroZ(x)) < 0o17) return;
    if (Math.hypot(x, z) > 0o170) return;
    for (const s of konstruSpecoj) {
      if (Math.hypot(x - s.x, z - s.z) < Math.max(s.w, s.d) / 2 + 0o14/0o10) return;
    }
    placajNodoj.push([x, z]);
  };

  // Realaj intersekcoj de la voja reto ( kie kaj EW kaj NS vojo efektive
  // ekzistas ). Nur tiuj ricevas la kvar-lampan ŝablonon; malplenaj regionoj
  // sen vojo restas sen lampoj.
  const realajIntersekcoj = new Set<string>();

  // Por cxiu EW-vojo (inter apudaj vicoj), kreu segmentojn inter NS-vojoj
  for (const roadZ of RETO_Z) {
    const r1 = Math.round(roadZ / PASXO - 0o4/0o10);
    const r2 = Math.round(roadZ / PASXO + 0o4/0o10);
    // Trovu kiuj NS-vojoj intersekcas cxi tiun EW-vojon
    const intersecting: number[] = [];
    for (const rx of RETO_X) {
      const c1 = Math.round(rx / PASXO - 0o4/0o10);
      const c2 = Math.round(rx / PASXO + 0o4/0o10);
      if (hasCellAt(c1, r1) || hasCellAt(c1, r2) ||
          hasCellAt(c2, r1) || hasCellAt(c2, r2)) {
        intersecting.push(rx);
      }
    }
    if (intersecting.length < 2) continue;
    for (const rx of intersecting) realajIntersekcoj.add(rx + "," + roadZ);

    // Konstruu segmentojn NUR inter intersekcaj NS-vojoj — neniuj randaj stumpoj
    const pts = [...intersecting].sort((a, b) => a - b);
    // Rando-nodoj. La du finoj de cxi tiu EW-linio.
    aldoniPlacon(pts[0], roadZ);
    aldoniPlacon(pts[pts.length - 1], roadZ);
    const w = 0o16/0o10;  // uniform 1.75 half-width
    for (let i = 0; i < pts.length - 1; i++) {
      const x1 = pts[i], x2 = pts[i + 1];
      if (Math.abs(x2 - x1) > 0o1/0o10) {
        vojDifinoj.push({ pts: [[x1, roadZ], [x2, roadZ]], w });
      }
    }
  }

  // Por cxiu NS-vojo (inter apudaj kolumnoj), kreu segmentojn inter EW-vojoj
  for (const roadX of RETO_X) {
      const c1 = Math.round(roadX / PASXO - 0o4/0o10);
      const c2 = Math.round(roadX / PASXO + 0o4/0o10);
    // Trovu kiuj EW-vojoj intersekcas cxi tiun NS-vojon
    const intersecting: number[] = [];
    for (const rz of RETO_Z) {
      const r1 = Math.round(rz / PASXO - 0o4/0o10);
      const r2 = Math.round(rz / PASXO + 0o4/0o10);
      if (hasCellAt(c1, r1) || hasCellAt(c1, r2) ||
          hasCellAt(c2, r1) || hasCellAt(c2, r2)) {
        intersecting.push(rz);
      }
    }
    if (intersecting.length < 2) continue;
    for (const rz of intersecting) realajIntersekcoj.add(roadX + "," + rz);

    // Konstruu segmentojn NUR inter intersekcaj EW-vojoj — neniuj randaj stumpoj
    const pts = [...intersecting].sort((a, b) => a - b);
    // Rando-nodoj. La du finoj de cxi tiu NS-linio.
    aldoniPlacon(roadX, pts[0]);
    aldoniPlacon(roadX, pts[pts.length - 1]);
    const w = 0o16/0o10;  // uniform 1.75 half-width
    for (let i = 0; i < pts.length - 1; i++) {
      const z1 = pts[i], z2 = pts[i + 1];
      if (Math.abs(z2 - z1) > 0o1/0o10) {
        vojDifinoj.push({ pts: [[roadX, z1], [roadX, z2]], w });
      }
    }
  }

  // Rivervojo — unu kontinua kajo laŭ la riverbordo. Ĝi sekvas la riverkurbon
  // kaj la terenon, kaj trapasas la nordan (landan) randon de ĉiu doko, do la
  // tri dokoj konektiĝas rekte al la kajo — ne plu du disigitaj branĉoj kun
  // zigzaga okcidenta branĉo ĉirkaŭ la meza platformo. La orienta fino ŝoviĝas
  // de la subakva deklivo ( 84,-94. Tereno -4.69, sub la akvonivelo -4.24 ) al
  // seka tero ( 84,-82. Tereno 0.85 ), do la tuta kajo kuŝas sur la tero.
  const dokaNordaRando = ( i: number ) => riveroZ( DOKO_X[i] ) + 0o16 + DOKO_PROFUNDOJ[i] / 2;
  const dockaLandaRando: [ number, number ][] = DOKO_X.map( ( dx, i ) => [ dx, dokaNordaRando( i ) ] );
  // La kajo. Okcidenta arbaro-aliro, la tri dokaj landrandoj ( kiuj sekvas la
  // riverkurbon ), orienta aliro al seka bordo.
  vojDifinoj.push({
    pts: [
      [ -0o124, -0o144 ], [ -0o70, -0o150 ],
      ...dockaLandaRando,
      [ 0o70, -0o124 ], [ 0o124, -0o122 ],
    ],
    w: 0o16/0o10
  });

  // Docka avenuo — ĝia ĉefa akso kongruas kun la urba krada vojo ĉe x=12; ĝi
  // alvenas al la kajo ĉe (12,-88.5) kaj kunfandiĝas kun ĝi. La kajo mem
  // servas la tri dokojn, do neniaj apartaj branĉoj de la avenuo bezonatas.
  vojDifinoj.push({ pts: [ [ 0o14, -0o44 ], [ 0o14, -0o131 ] ], w: 0o16/0o10 });

  // Arbarvojo — la stacidoma vojo ne kondukas REKTE al la konstruaĵo.
  // anstataŭe ĝi kondukas al KVADRATA vojo ĉirkaŭ la norda nova ekstera domo
  // (0,3) kiu baras la rektan vojon. La domo formas "plenigitan vojbaron"
  // (la urba sprono finiĝas ĉe ĝia suda pordo ĉe z=60). La suda flanko de la
  // kvadrato estas la ekzistanta kradvojo ĉe z=60; la orienta/okcidenta
  // flankoj plilongiĝas la kradvojojn ĉe x=±12; la norda flanko estas nova
  // EW-vojo ĉe z=84. De la norda flanko la stacidoma vojo rampas sur la
  // lanĉ-apronon ĝis la stacia pordo (z=92). La vojo-supro sekvus la terenon
  // +0o2/0o10 kaj enpuŝus ĝis 0o3/0o20 SUPER la apron-supron (h0 + 0o1/0o20), do ĝi
  // ricevas propran altan funkcion kiu rampas malsupren al la aprona nivelo
  // dum la lastaj ~2 unuoj (z 88..90). Sur la aprono la vojo kuŝas ĝuste sur
  // la supro — la voja polygonOffset gajnas la koincidajn facojn kontraŭ la
  // aprono, kaj ĝi pasas 0o1/0o100 SUB la orajn bendojn (ĝia supro je h0 + 0o4/0o100,
  // la bendoj je h0 + 0o5/0o100) — neniu z-flagrado, kaj ĝi atingas la pordon ĉe
  // la muro.
  const stacioH0 = stacioSxipo ? (stacioSxipo.h0 ?? alteco(0, 0o140)) : alteco(0, 0o140);
  const apronaNivelo = stacioH0 + 0o1/0o20 - 0o2/0o10;
  const arbarvojaAlteco = (x: number, z: number): number => {
    const t = glataPaso(0o130, 0o132, z);
    return alteco(x, z) * (1 - t) + apronaNivelo * t;
  };
  // Kvadrata ringo ĉirkaŭ la baranta domo (0,3). Orienta/okcidenta flankoj
  // (x=±12, z 60..84) kaj norda flanko (z=84, x ±12). La suda flanko estas la
  // ekzistanta kradvojo ĉe z=60.
  vojDifinoj.push({ pts: [ [ 0o14, 0o74 ], [ 0o14, 0o124 ] ], w: 0o16/0o10 });
  vojDifinoj.push({ pts: [ [ -0o14, 0o74 ], [ -0o14, 0o124 ] ], w: 0o16/0o10 });
  vojDifinoj.push({ pts: [ [ -0o14, 0o124 ], [ 0o14, 0o124 ] ], w: 0o16/0o10 });
  // (0,84) = norda flanko de la kvadrato; (0,92) = stacia pordo.
  vojDifinoj.push({
    pts: [ [ 0, 0o124 ], [ 0, 0o130 ], [ 0, 0o132 ], [ 0, 0o134 ] ],
    w: 0o16/0o10,
    heightFn: arbarvojaAlteco
  });

  // Rondigitaj ĉapoj por la kajo kaj stacidomaj vojoj — la samaj rondigitaj
  // vojo-partoj kiel la krada reto. La krado registras siajn rando-nodojn per
  // aldoniPlacon dum la retokonstruo, sed ĉi tiuj vojoj ( la kajo, stacidoma
  // ringo ) aldoniĝas rekte al vojDifinoj poste, do iliaj finoj ne ricevis
  // kapojn. Kelkaj finoj kuŝas ankaŭ preter la kutima krada radiuso ( 0o170 ),
  // kaj la rivero-filtrilo ekskludus la orientan kajon.
  // La kajo — la okcidenta fino en la arbaro kaj la orienta fino sur la seka
  // bordo ( 84,-82. Tereno 0.85 ) ricevas ĉapojn kun lampoj — la malnova orienta
  // fino ĉe (84,-94) estis sub la akvonivelo kaj ricevis kapon sen lampoj pli sube.
  placajNodoj.push([ -0o124, -100 ]);
  placajNodoj.push([ 0o124, -0o122 ]);
  // La dokaj landrandoj — kie la kajo renkontas ĉiun platformon, la rando-nodo
  // markas la enirejon ( samaj kapoj kaj lampoj kiel antaŭe ).
  for ( const [ dx, dz ] of dockaLandaRando ) placajNodoj.push([ dx, dz ]);
  // Stacidoma ringo — la nordaj anguloj ( la sudaj estas kradaj kruciĝoj ).
  placajNodoj.push([ 0o14, 0o124 ]);
  placajNodoj.push([ -0o14, 0o124 ]);
  // La arbarvojo ( kiu finiĝas ĉe la stacia pordo sur la aprono, ne sur la
  // normala tereno ) ricevas propran kapon sen lampoj.
  konstruiPlacojn(sceno, [ [ 0, 0o134 ] ], arbarvojaAlteco, dioritaMaterialo, andezitaMaterialo);

  // Voja duon-larĝo — la segmenta larĝo estas 0o16/0o10, do ĝia duon-larĝo estas 0o7/0o10.
  function vojDuonLargho(_g: number): number {
    return 0o7/0o10;
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
    const pordoOffset = s.d / 2 + 0o14/0o10;
    const pordoX = s.x + Math.sin(rot) * pordoOffset;
    const pordoZ = s.z + Math.cos(rot) * pordoOffset;
    // La sprono komencigxas cxe la muro-bazo (ne 0o14/0o10 for), por ke la vojo
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

    if (Math.hypot(spronoX - vojX, spronoZ - vojZ) > 0o4/0o10) {
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
      const pordoX = s.x + difX * (s.d / 2 + 0o14/0o10), pordoZ = s.z + difZ * (s.d / 2 + 0o14/0o10);
      if (Math.hypot(x - pordoX, z - pordoZ) < 4) return;
      if (Math.hypot(x - s.x, z - s.z) < Math.max(s.w, s.d) / 2 + 0o14/0o10) return;
    }
    // Evitu meti lampojn sur ekzistantajn lampojn (ene de 2 unuoj)
    for (const ekz of lampLokoj) {
      if (Math.hypot(x - ekz.x, z - ekz.z) < 2) return;
    }
    lampLokoj.push({ x, z, y: bazaY, rotacio });
  };
  for (const [aX, aZ] of placajNodoj) {
    for (const [ox, oz] of [ [ -0o21/0o10, -0o21/0o10 ], [ 0o21/0o10, -0o21/0o10 ], [ -0o21/0o10, 0o21/0o10 ], [ 0o21/0o10, 0o21/0o10 ] ]) addLamp(aX + ox, aZ + oz);
  }  // Platformoj estas diamantaj (pintoj laŭ la aksoj), do iliaj lampoj estu sam-orientitaj.
  // Lampoj estas plantitaj en la platforman supran tavolon (y + 0o2/0o10 + 0o2/0o10 - 0o1/0o40).
  for ( const [ x, z ] of periferiajPlatformoj ) addLamp( x, z, alteco( x, z ) + 0o4/0o10 - 0o1/0o40, 0 );
  for (const gx of RETO_X) {
    for (const gz of RETO_Z) {
      // Nur realaj vojkruciĝoj ( kaj ne la rivero ) ricevas la kvar-lampan
      // ŝablonon; malplenaj regionoj sen vojo restas sen lampoj.
      if (Math.abs(gz - riveroZ(gx)) < 0o14) continue;
      if (!realajIntersekcoj.has(gx + "," + gz)) continue;
      // Kvar lampoj en la kvar kvadratoj ĉirkaŭ ĉiu intersekco.
      addLamp(gx + 0o23/0o10, gz + 0o23/0o10);
      addLamp(gx + 0o23/0o10, gz - 0o23/0o10);
      addLamp(gx - 0o23/0o10, gz + 0o23/0o10);
      addLamp(gx - 0o23/0o10, gz - 0o23/0o10);
    }
  }
  // Lampoj ĉirkaŭ la lago — uniforma dismeto: egalaj angulaj paŝoj, kaj la
  // distanco ligita al la ondigita lagrando ( lagoRadio ), do la lampoj
  // spuras la bordon egale inter si sen perfekta cirklo — nur eta kribro por
  // ne aspekti mekanike. La rivera buŝo kaj la orienta enfluo ( kie la rivero
  // renkontas la lagon ) restas sen lampoj. Cxiu cirkauxa lampo staras sur la
  // samaj diamantaj platoj kiel la periferiaj platformoj ( reuzita
  // konstruiPeriferiajnPlatformojn ) — kolektita en lampajPlatformLokoj.
  const lampajPlatformLokoj: [ number, number ][] = [];
  const LAGO_LAMP_N = 0o5;    // 5 — malmultaj, egale ĉirkaŭ la lago
  const lagoNiv = lagoNivelo();
  for ( let i = 0; i < LAGO_LAMP_N; i++ ) {
    const a = i / LAGO_LAMP_N * Math.PI * 2 + ( Math.random() - 0.5 ) * 0o1 / 0o6;
    const d = lagoRadio( a ) + 0o20 + ( Math.random() - 0.5 ) * 0o6;
    const x = LAGO_X + Math.cos( a ) * d;
    const z = lagoZ() + Math.sin( a ) * d;
    if ( Math.abs( z - riveroZ( x ) ) < 8 ) continue;      // rivera buŝo/enfluo
    if ( alteco( x, z ) < lagoNiv + 0o4/0o10 ) continue;   // subakva bordo
    if ( lampLokoj.some( l => Math.hypot( x - l.x, z - l.z ) < 0o40 ) ) continue;
    addLamp( x, z, alteco( x, z ) + 0o4/0o10 - 0o1/0o40 );
    lampajPlatformLokoj.push( [ x, z ] );
  }

  // Lampoj ĉirkaŭ la norda montaro — pozicioj laux la GEOGRAFIO de la monto
  // ( montaroNorda en tereno.ts ), ne ringo. La monto estas orienta-okcidenta
  // kresto ( suda ramplo z ≈ 0o200 → 0o346 ) kun kvar pintoj ( x ≈ -0o310,
  // -0o140, 0o50, 0o250 ) kaj trairebla selo ( x ≈ 0o150 ). La lampoj sekvas
  // la piedon de la suda ramplo ( kvar lauxlonge, al la urba aliro ), la selan
  // vojeton, la orientan kaj okcidentan spronojn kaj la nordan piedon — nenia
  // egala disigo ĉirkaŭ cirklo.
  const montajLampLokoj: [ number, number ][] = [
    [ -0o214, 0o204 ], [ -0o50, 0o202 ], [ 0o74, 0o203 ], [ 0o151, 0o257 ],
    [ 0o245, 0o204 ], [ -0o404, 0o322 ], [ 0o377, 0o310 ], [ -0o120, 0o443 ],
    [ 0o106, 0o440 ],
  ];
  for ( const [ mx, mz ] of montajLampLokoj ) {
    if ( Math.abs( mz - riveroZ( mx ) ) < 8 ) continue;   // rivero
    if ( cxuEnLago( mx, mz ) ) continue;                  // lago
    if ( lampLokoj.some( l => Math.hypot( mx - l.x, mz - l.z ) < 0o26 ) ) continue;
    addLamp( mx, mz, alteco( mx, mz ) + 0o4/0o10 - 0o1/0o40 );
    lampajPlatformLokoj.push( [ mx, mz ] );
  }

  // La cirkauxaj lampoj ( lago kaj monto ) staras sur la samaj rondigitaj
  // diamantaj platformoj kiel la periferiaj — rekta reuzo de la ekzistanta
  // konstruiPeriferiajnPlatformojn ( neniu duobla kodo ).
  konstruiPeriferiajnPlatformojn( sceno, lampajPlatformLokoj, alteco, dioritaMaterialo, andezitaMaterialo );

  const lampSistemo = konstruiHxeuxfojn(sceno, lampLokoj, dioritaMaterialo, oraMaterialo);
  // Lampaj kolizioj — malgrandaj cirkloj ĉirkaŭ ĉiu lampa kolono.
  for ( const l of lampLokoj ) kolizioj.push({ x: l.x, z: l.z, r: 0o5/0o10 });

  // ⟪ Keŭfĥesoj 📃 ⟫ — starfrukt-formaj strukturoj ( ſɭw ʃɔɔ˞ ) kun 6-flanka
  // simetrio. Ili staras nur ĉe la kvar ANGULOJ de la centra konstruaĵo ( la
  // diamanta sanktejo ), unu ĝuste ekster ĉiu pinto. La sankteja piedo estas
  // kvadrato turnita je Math.PI / 4 ( kreiKlinoTavolon ), do giaj pintoj
  // alfrontas la diagonalojn 45°, 135°, 225° kaj 315° — ne la flankojn.
  const KEUXFHXESO_R = 0o11;   // 9 — klare ekster la pinto ( 7.07 ) sen tuŝo
  const keuxfhxesoLokoj: KeuxfhxesoLoko[] = [];
  for ( let i = 0; i < 4; i++ ) {
    const a = Math.PI / 4 + i * Math.PI / 2;
    keuxfhxesoLokoj.push( { x: Math.cos( a ) * KEUXFHXESO_R, z: Math.sin( a ) * KEUXFHXESO_R, rot: a } );
  }
  konstruiKeuxfhxeso( sceno, keuxfhxesoLokoj, alteco, oraMaterialo );
  for ( const l of keuxfhxesoLokoj ) kolizioj.push( { x: l.x, z: l.z, r: 0o16/0o10 } );

  // ⟪ Vegetajxo 📃 ⟫
  const ekskluziviRiveron = (x: number, z: number) => Math.abs(z - riveroZ(x)) < 7 || cxuEnLago(x, z);
  const ekskluziviVojojn = (x: number, z: number, m: number) => {
    for (const p of vojSpecimenoj) if (Math.hypot(x - p.x, z - p.z) < m) return true;
    // La arbar-randaj diamantaj platformoj estas pavimitaj restlokoj — la
    // samaj pavim-specimenoj, por ke neniu planto aperu sur ili.
    for (const [px, pz] of periferiajLokoj) if (Math.hypot(x - px, z - pz) < m + 3) return true;
    // La keŭfĥesoj staras en la herbejo — neniu planto tra ili.
    for (const l of keuxfhxesoLokoj) if (Math.hypot(x - l.x, z - l.z) < m + 0o25/0o10) return true;
    // La ĉirkaŭaj lampaj diamantaj platformoj estas pavimitaj restlokoj — neniu planto.
    for (const [px, pz] of lampajPlatformLokoj) if (Math.hypot(x - px, z - pz) < m + 3) return true;
    return false;
  };
  const ekskluziviKonstruajxon = (x: number, z: number, m: number) => {
    for (const s of konstruSpecoj) if (Math.hypot(x - s.x, z - s.z) < s.w * 0o23/0o40 + m) return true;
    return false;
  };
  // Betuloj ( arbara periferio ) — pli densa ol antauxe. Unu komuna
  // arbarero-aro estas dividita inter la tri arbo-specoj, por ke betuloj,
  // larikoj kaj Ĥŝakŝlefoj miksiĝu en la samaj naturaj arbareroj.
  // La arbarera kvanto devenas de la tuta arba nombro ( 256+128+64 ) — la
  // sama 1/24-regulo kiel en metiArbojn.
  const arbareroj = kreiArbarerojn( Math.max( 0o4, Math.floor(( 0o400 + 0o200 + 0o100 ) / 0o24 )),
    0o200, ekskluziviRiveron, 0o53104 );
  const arboj = metiArbojn( alteco, 0o400, 0o200, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o53104, [], 0o10, arbareroj );
  const betulajTrunkoj = konstruiArbaron( sceno, arboj );

  // Larikoj — miksitaj kun betuloj por pli diversa arbaro
  // La inter-arba distanco estas malgranda, por ke la larikoj vere aperu
  // inter la betuloj — tro granda liberspaco lasis preskaŭ neniun lokon.
  const larikoj = metiArbojn( alteco, 0o200, 0o200, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o53114, arboj, 0o10, arbareroj, kronaRadiusoLarika );
  const larikajTrunkoj = konstruiLarikon( sceno, larikoj );

  // Ĥŝakŝlefoj ( ı],ͷ̗ɔʞ ֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ ) — purpuraj laktuk-arboj, 3–5
  // tavoloj de kvar grandaj kurbiĝintaj folioj kaj segmenta ŝelo
  const hxsxaksxlefoj = metiArbojn( alteco, 0o100, 0o200, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o62445, [ ...arboj, ...larikoj ], 0o10, arbareroj, kronaRadiusoHxsxaksxlefa );
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

  // Cetkuoj ( ſᶘɔ ɭʃƽɹ / Equisetum praealtum ) — la altaj senbranĉaj skuraj
  // kanoj kun strobiloj, laŭ la riverbordoj ( la lago estas akvo, do neniu
  // planto ene de la lagdisko )
  konstruiCetkuojn( sceno, 0o120, alteco, riveroZ,
    (x: number, z: number) => ekskluziviKonstruajxon(x, z, 3) || cxuEnLago(x, z), ekskluziviVojojn );

  // ⟪ Vegetaĵo ĉirkaŭ la lago 📃 ⟫ — la lago sidas malproksime oriente
  // ( dist ~236 ), ekster la radiuso de la urba arbaro, do ĝiaj bordoj
  // restis nudaj. Ringo da betuloj kaj larikoj sekvas la ondigitan lagrandon
  // ( lagoRadio ), sur la sekaj bordoj ekster la lagrando; herbo kovras la
  // bordon kaj kareksoj staras ĉe la akvo. La orienta malseka kavo restas
  // malplena ( akvaNivelo kontrolas la sekecon ). La ĉef-arbaraj arboj estas
  // ankaŭ evitu-ankroj, por ke la ringo ne kunpremu la urban arbaron.
  const lagArboj = metiArbojnCxirkauLagon( alteco, 0o60, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53117, [ ...arboj, ...larikoj ], 0o10 );
  const lagTrunkoj = konstruiArbaron( sceno, lagArboj );
  const lagLarikoj = metiArbojnCxirkauLagon( alteco, 0o40, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53121, [ ...lagArboj, ...arboj, ...larikoj ], 0o10,
    kronaRadiusoLarika );
  const lagLarikajTrunkoj = konstruiLarikon( sceno, lagLarikoj );
  // Trunkaj likenoj ankaux sur la lag-arboj ( nova semo por malsamaj buloj )
  konstruiTrunkajnLikenojn( sceno, [ lagTrunkoj, lagLarikajTrunkoj ], 0o62452 );
  konstruiHerbonCxirkauLagon( sceno, 0o300, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53122 );
  // Cakeoj ( ſᶘᴜ ſɭɔ / Equisetum telmateia ) — la grandaj branĉet-kirlaj
  // ĉevalvostoj, kareksa rando ĉe la lagrando, kie la bordo estas malseka
  // ( ne pli ol ~2 unuojn super la akvonivelo ).
  konstruiCakeojn( sceno, 0o120, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviKonstruajxon, ekskluziviVojojn, 11605 );

  // ⟪ Montara vegetajxo 📃 ⟫ — la norda montaro ( montaroNorda en tereno.ts )
  // ricevas alpan larikaron sur la deklivoj, betulojn pli sube, kaj rokojn
  // kaj likenojn sur la krestoj. La arboj sidas nur sur piedeblaj deklivoj sub
  // la arbolinio ( metiMontajnArbojn filtras la krutajn murojn kaj la altajn
  // pintojn ), do la montaro restas transirebla tra la selo. La montaj arboj
  // evitas la urban arbaron kaj la suda fado dissolvas la montaran arbaron en
  // la valan, por ke la du zonoj kuniĝu nature sen kudro; la arbolinia fado
  // kaj la spron-silueta x-envelopo rompas la rektangulan bordon de la arbaro.
  // La betuloj sidas ĉe la piedo, en la transira zono inter la valo kaj la
  // montaraj deklivoj; la larikoj kovras la tutan monton, ambaŭflanke de la
  // kresto, sub la arbolinio.
  const montajBetuloj = metiMontajnArbojn( alteco, 0o100, 0o214, 0o270,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53132,
    [ ...arboj, ...larikoj ] );
  const montajBetulaTrunkoj = konstruiArbaron( sceno, montajBetuloj );
  const montajLarikoj = metiMontajnArbojn( alteco, 0o200, 0o260, 0o430,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53131,
    [ ...montajBetuloj, ...arboj, ...larikoj ], 0o10, kronaRadiusoLarika );
  const montajLarikaTrunkoj = konstruiLarikon( sceno, montajLarikoj );
  const montajRokoj = konstruiMontajnRokojn( sceno, 0o100, alteco, ekskluziviRiveron, ekskluziviVojojn );
  // Likenoj sur la montaro — grupigitaj ĉirkaŭ la montaj arboj kaj rokoj,
  // kun la samaj spur-siluetaj formoj kaj alta disdono kiel la rokoj.
  konstruiLikenojn( sceno, 0o150, alteco, [ ...montajLarikoj, ...montajBetuloj ], montajRokoj,
    ekskluziviRiveron, ekskluziviVojojn, true );
  // Trunkaj likenoj sur la montaj larikoj kaj betuloj.
  konstruiTrunkajnLikenojn( sceno, [ montajLarikaTrunkoj, montajBetulaTrunkoj ], 0o62453 );

  // ⟪ Nebulaj sprajtoj 📃 ⟫
  const nebulaTeksajxo = kreiNebulanTeksajxon();
  const nebuloj: THREE.Sprite[] = [];
  for (const [x, z, y, skalo, op] of [
    [ -0o106, -0o106, 0o24/0o10, 0o50, 0o5/0o40 ], [ -0o36, -0o110, 0o215/0o100, 0o54, 0o3/0o20 ],
    [ 0o24, -0o106, 0o263/0o100, 0o50, 0o5/0o40 ], [ 0o74, -0o104, 0o115/0o40, 0o44, 0o5/0o40 ],
    [ -0o62, -0o55, 0o163/0o100, 0o36, 0o11/0o100 ], [ -0o113, 0o36, 0o63/0o40, 0o32, 0o3/0o40 ],
    [ 0o106, -0o50, 0o163/0o100, 0o34, 0o3/0o40 ], [ -0o74, 0o106, 0o14/0o10, 0o30, 0o3/0o40 ],
    [ 0o101, 0o106, 0o155/0o100, 0o32, 0o5/0o100 ], [ -0o132, 0o12, 0o55/0o40, 0o26, 0o1/0o10 ],
  ]) {
    const materialo = new THREE.SpriteMaterial({ map: nebulaTeksajxo, transparent: true, opacity: op, depthWrite: false });
    const sp = new THREE.Sprite(materialo);
    sp.position.set(x, y, z); sp.scale.setScalar(skalo);
    sp.userData = { rapido: 0o15/0o40 + Math.random() * 0o10/0o10 };
    sceno.add(sp); nebuloj.push(sp);
  }
  for (let i = 0; i < 0o50; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 0o120 + Math.random() * 0o310;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const y = alteco(x, z) + 0o4/0o10 + Math.random() * 3;
    const materialo = new THREE.SpriteMaterial({
      map: nebulaTeksajxo, transparent: true,
      opacity: 0o1/0o10 + Math.random() * 0o5/0o40,
      depthWrite: false,
    });
    const sp = new THREE.Sprite(materialo);
    sp.position.set(x, y, z);
    sp.scale.setScalar(0o62 + Math.random() * 0o120);
    sp.userData = { rapido: 0o15/0o100 + Math.random() * 0o4/0o10 };
    sceno.add(sp); nebuloj.push(sp);
  }

  // ⟪ Kanuoj 📃 ⟫
  // La kanuoj sekvas la novajn dokpintojn (riveroZ + 3, en la akvo) por resti atingeblaj de la dokoj.
  const kanuoj: Kanoto[] = [];
  // La eksteraj kanuoj estas la nova "satala" stilo (malhel-pina/ora, kongrua al
  // la arkitekturo); la centra restas la baza hela stilo.
  kanuoj.push(kreiKanoton(sceno, 0o52, riveroZ(0o52) + 3, -Math.PI * 0o2/0o10, oraMaterialo, akvoY(0o52), "satala"));
  kanuoj.push(kreiKanoton(sceno, -0o52, riveroZ(-0o52) + 3, Math.PI * 0o2/0o10, oraMaterialo, akvoY(-0o52), "satala"));
  kanuoj.push(kreiKanoton(sceno, 0, riveroZ(0) + 3, -Math.PI * 0o4/0o10, oraMaterialo, akvoY(0)));

  // ⟪ Ktenoforoj 📃 ⟫
  // Travideblaj kombuloj ( Beroe, Mnemiopsis, Pleŭrobrakia ) naĝas en la rivero,
  // evitante la dokojn. Ilia animacio okazas en sperto.ts ( gxisdatigiBestojn ).
  const bestoj = konstruiBestojn( sceno, 0o30, riveroZ, riveraAkvaNivelo, RIVERA_DUONLARĜO,
    { x: LAGO_X, z: lagoZ(), r: LAGO_RZ, nivelo: lagoNivelo() } );

  // ⟪ Neĝopetreloj 📃 ⟫
  // Pure blankaj marbirdoj ( ſᶘᴜ ſȷᴜ ſɭэ ſɭɔ / Pagodroma nivea ) rondflugas
  // super la lago kaj la rivero. Ilia animacio okazas en sperto.ts
  // ( gxisdatigiPetrelojn ).
  const petreloj = konstruiPetrelojn( sceno, 0o20, alteco, riveroZ,
    { x: LAGO_X, z: lagoZ(), r: LAGO_RZ } );

  // ⟪ NPC-agordo 📃 ⟫ — la vestoj vivas en assets/vestoj.ts ( VESTOJ );
  // tiu ĉi modulo nur alinomas ilin por la urba sistemo.
  const VESTA_LISTO: Vesto[] = VESTOJ;

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
    const fig = konstruiFiguron(VESTA_LISTO[npcoj.length % VESTA_LISTO.length], Math.random() < 0o1/0o4);
    const h = alteco(sX, sZ);
    fig.group.position.set(sX, h, sZ);
    fig.hejmo.set(sX, h, sZ);
    fig.celo.set(sX, h, sZ);
    fig.atendo = Math.random() * 4;
    fig.rapido = 0o55/0o100 + Math.random() * 0o4/0o10;
    sceno.add(fig.group);
    npcoj.push(fig);
  }

  // ⟪ Interna sistemo 📃 ⟫
  const internaSistemo: InternaSistemo = kreiInternanSistemon();

  return {
    konstruSpecoj, kolizioj, dokoKolizioj, selektajxoj, konstruGrupoj,
    vojSpecimenoj, placajNodoj,    riverData, lago, bestoj, petreloj, lampSistemo,
    nebuloj, kanuoj, npcoj, internaSistemo, xipo, vojDifinoj, vojDuonLargho,
    NPCLOKOJ, VESTA_LISTO,
  };
}
