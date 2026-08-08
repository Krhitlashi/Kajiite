// Urbo — urba konstruo. konstruajxoj, vojoj, placoj, lampoj, vegetajxo, nebulo, akvo, kanuoj
// Modula krada sistemo — vojoj kaj konstruajxaj pozicioj derivitaj de kradaj parametroj.
import * as THREE from "three";
import { konstruiSatalon, TIPARO, KonstruSpec } from "../assets/konstruajxoj/satalaj-konstruajxoj.js";
import { kreiNebulanTeksajxon } from "../assets/komunajxoj/teksajxoj.js";
import { konstruiRiveron, konstruiRiveronNordan, konstruiLagon, konstruiSkulptitanAkvon, RiverData } from "../assets/medio/akvo.js";
import { konstruiBestojn, BestoSistemo, konstruiPetrelojn, PetreloSistemo } from "../assets/shalaj-specioj/bestoj.js";
import { kreiArbarerojn, metiArbojn, konstruiArbaron, konstruiFilikojn, konstruiPurpurajnPlantojn, konstruiPurpurajnFilikojn,
  konstruiAltajnPurpurajnFilikojn, konstruiLikenSxtonojn, konstruiLarikon, konstruiHerbon, konstruiMusxajnMontetojn,
  konstruiFalintajnTrunkojn, konstruiCetkuojn, konstruiLikenojn, konstruiHxsxaksxlefojn, konstruiTrunkajnLikenojn,
  metiArbojnCxirkauLagon, konstruiHerbonCxirkauLagon, konstruiCakeojn, metiMontajnArbojn, konstruiMontajnRokojn,
  konstruiMontajnSubkreskajxojn, konstruiLaganSubkreskajxojn, kronaRadiusoLarika, kronaRadiusoHxsxaksxlefa } from "../assets/shalaj-specioj/vegetajxo.js";
import { konstruiVojojn, konstruiSpronon, konstruiPeriferiajnPlatformojn, konstruiIntersekcajnPlatojn, konstruiRondigitanArkon, VojDifino } from "../assets/medio/vojoj.js";
import { konstruiDokon } from "../assets/medio/doko.js";
import { konstruiHxeuxfojn, HxeuxfaSistemo } from "../assets/konstruajxoj/hxeuxfa-lampo.js";
import { konstruiKeuxfhxeso, KeuxfhxesoLoko } from "../assets/mebloj/keuxfhxeso.js";
import { kreiKanoton, Kanoto } from "../assets/medio/transporto.js";
import { konstruiFiguron, gxisdatigiNpc } from "../assets/shalaj-specioj/homoj.js";
import type { Figuro, Vesto } from "../assets/shalaj-specioj/homoj.js";
import { kreiInternanSistemon, InternaSistemo } from "../assets/konstruajxoj/internoj.js";
import { konstruiKrasesxagxon } from "../assets/konstruajxoj/krasesxagxa-kosmosxipo.js";
import type { Krasesxagxo } from "../assets/konstruajxoj/krasesxagxa-kosmosxipo.js";
import { riveroZ, alteco, akvoY, montetaBazo, glataPaso, RIVERA_DUONLARĜO,
  LAGO_X, LAGO_RZ, RIVERA_BUŜO_X, riveraAkvaNivelo, lagoZ, lagoNivelo, lagoRadio, cxuEnLago, akvaNivelo,
  riveroNordOrientaX, riveraNordOrientaNivelo, RIVERA_NORDORIENTA_FONTO_Z,
  RIVERA_NORDORIENTA_DUONLARĜO, RIVERA_NORDORIENTA_BUŜO_Z,
  cxuEnNordorientaRivero, montaroNordOrienta, skulptitaAkvo, skulptaAkvaLimoj,
  SKULPTA_PASO, SKULPTA_AKVA_NIVELO } from "./tereno.js";
import { VESTOJ } from "../assets/vestaro/vestoj.js";

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
  riveroNordOrienta: RiverData;
  lago: RiverData;
  // Skulptita akvo ( la terena skulptilo ) — nulaj se la masko estas malplena.
  skulptaAkvo: RiverData | null;
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

export async function konstruiUrbon(
  sceno: THREE.Scene,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial,
  raportiProgreson?: (procento: number) => void
): Promise<UrbaSistemo> {
  // ⟪ Ŝarĝa progreso 📃 ⟫ — la konstruado cedas inter sekcioj, por ke la
  // ŝarĝa stango vere moviĝu kaj la paĝo restu respondema dum lanĉo.
  const jesi = (): Promise<void> => new Promise(r => setTimeout(r, 0));
  const STAGOJ = 12;
  let stago = 0;
  const raporti = async (): Promise<void> => {
    stago = Math.min(STAGOJ, stago + 1);
    raportiProgreson?.(stago / STAGOJ);
    await jesi();
  };

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
    // Sub-teraj niveloj bazitaj sur la tavoloj: ĉiu tavolo de la ekstera
    // piramido ricevas egalrespondan sub-teran nivelon, por ke la interno
    // kongruu al la ekstera strukturo ( la diamanta spegulo reflektas nur la
    // supran parton — la sub-teraj niveloj estas entombigitaj sub la spegula
    // ebeno, kaj ilia reflekto aperus SUPER la grundon ).
    const sube = niveloj;
    const tieroAltoSub = 0o123/0o40;  // uniforma kel-alto (83/32 = 2.594) por cxiuj tipoj
    konstruSpecoj.push({ x, z, type, name: "paq" + bldgIdx, niveloj, w, d, tieroAlto, sube, tieroAltoSub, rot: 0, diamond: true });
    bldgIdx++;
  }

  // Kosmoporda stacio rekte malantaŭ la norda nova ekstera domo (0,3) — la
  // domo baras la rektan vojon (plenigita vojbaro). La rotacio (PI, pordo
  // suden) estas aŭtomate fiksita de la rot-pasoj sube. La stacio sidas iom
  // pli norden ( 0,100 ), por ke la baseno-aprono ne premu la ringon.
  konstruSpecoj.push({ x: 0, z: 0o144, type: "stacioxipo", name: "paq" + bldgIdx, niveloj: 3, w: 0o10, d: 0o10, tieroAlto: 0o155/0o40, rot: 0, diamond: true });
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

  // ⟪ Nordorienta rivereto 📃 ⟫ — nova mallarĝa rivero fluanta de la
  // nordorienta monto ( montaroNordOrienta ) suden en la lagon. La ribono
  // iras de la montodeklivo ( z≈RIVERA_NORDORIENTA_FONTO_Z ) ĝis la nordorienta lagbordo
  // ( RIVERA_NORDORIENTA_BUŜO_Z ), mallarĝiĝante al punkto ĉe la buŝo.
  const riveroNordOrienta = konstruiRiveronNordan(sceno, riveroNordOrientaX, riveraNordOrientaNivelo,
    RIVERA_NORDORIENTA_DUONLARĜO, RIVERA_NORDORIENTA_FONTO_Z, RIVERA_NORDORIENTA_BUŜO_Z, 0o60, alteco);

  // ⟪ Lago oriente 📃 ⟫ — la rivero enfluas grandan lagon oriente de la valo
  // ( sur la norda mapo oriento estas -x, do la lago aperas dekstre ); la rando
  // sekvas la ondigitan elipson ( lagoRadio ), pli larĝa norde-sude.
  const lago = konstruiLagon( sceno, LAGO_X, lagoZ(), lagoRadio, lagoNivelo(), alteco );

  // ⟪ Skulptita akvo ( la terena skulptilo ) 📃 ⟫ — akvo pentrita en
  // iloj/tero-skulptilo.html. La masko limigas la meshxon al la pentrita zono;
  // nenio konstruigas se ne estas akvo.
  const limojSkulptaj = skulptaAkvaLimoj();
  const skulptaAkvo: RiverData | null = limojSkulptaj
    ? konstruiSkulptitanAkvon( sceno, limojSkulptaj.x0, limojSkulptaj.z0,
        limojSkulptaj.x1, limojSkulptaj.z1, SKULPTA_PASO, skulptitaAkvo,
        SKULPTA_AKVA_NIVELO, alteco )
    : null;

  // ⟪ Dokoj — tri alirejoj laŭ la suda riverbordo 📃 ⟫
  // La dokoj sekvas la riverkurbon (riveroZ + 14), do cxiu pinto atingas la akvon
  // egalproporcie, kaj la meza estas pli longa cxefpiero.
  const DOKO_X = [ -0o60, 0, 0o60 ];
  const DOKO_PROFUNDOJ = [ 0o20, 0o20, 0o20 ];
  const dokoKolizioj: { x: number; z: number; w: number; d: number; rot: number; y: number }[] = [];
  for ( let i = 0; i < DOKO_X.length; i++ ) {
    // La doka z-offseto ( 0o16 ) estas bank-tajlita: la kajo kaj la avenuo estas
    // permane agorditaj al ĝi ( la avenuo kunfandiĝas kun la kajo ĉe x=12 ), do
    // rondigi ĝin ŝovus la kajon for de la avenuo — tenita netuŝita.
    const doko = konstruiDokon( sceno, DOKO_X[i], riveroZ( DOKO_X[i] ) + 0o16, 0, alteco, akvoY, DOKO_PROFUNDOJ[i] );
    // La doka platformo estas 0o16/0o10 larĝa; ĝia rotacio estas 0 (aksi-para).
    dokoKolizioj.push({ x: DOKO_X[i], z: riveroZ( DOKO_X[i] ) + 0o16, w: 0o16/0o10, d: DOKO_PROFUNDOJ[i], rot: 0, y: doko.platformY });
  }
  await raporti();

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
  const xipo: Krasesxagxo = konstruiKrasesxagxon(sceno, 0, 0o40, 0o144, oraMaterialo, eniraMaterialo);
  // La sxipa interno flosas CE LA SXIPO ( ne sur la tero ). Marku la stacion per la
  // fluga alteco, por ke eniri la spacosxipon teleportu al la supro kie gxi estas.
  const stacioSxipo = konstruSpecoj.find(s => s.type === "stacioxipo");
  if (stacioSxipo) stacioSxipo.flugoY = xipo.group.position.y;
  await raporti();

  // Konstruu aron da celloj por rapida sercxo
  const hasCellAt = (c: number, r: number) =>
    LAYOUT.some(([lc, lr, lt]) => lc === c && lr === r && lt !== null);

  // La veraj rando-nodoj de la voja reto. La finoj de cxiu vojo-linio, kie la
  // segmentoj haltas ( sen aldonaj stumpoj ). Nur tiuj ricevas rondigitajn ĉapojn.
  const placajNodoj: [number, number][] = [];
  const cxuNodoValidas = (x: number, z: number): boolean => {
    if (Math.abs(z - riveroZ(x)) < 0o20) return false;
    if (Math.hypot(x, z) > 0o170) return false;
    for (const s of konstruSpecoj) {
      if (Math.hypot(x - s.x, z - s.z) < Math.max(s.w, s.d) / 2 + 0o14/0o10) return false;
    }
    return true;
  };
  const aldoniPlacon = (x: number, z: number) => {
    if (!cxuNodoValidas(x, z)) return;
    placajNodoj.push([x, z]);
  };

  // Noda registro por malkovri L-kornerojn ( kie AMBAU perpendikularaj vojoj
  // finigas samloke ). sx/sz registras la FORAN direkton — la korneran
  // kvadranton — de cxiu voja fino.
  const finoRegistro = new Map<string, { sx: number; sz: number }>();
  const aldoniFinon = (x: number, z: number, sx: number, sz: number) => {
    const k = x + "," + z;
    const e = finoRegistro.get(k) || { sx: 0, sz: 0 };
    if (sx !== 0) e.sx = sx;
    if (sz !== 0) e.sz = sz;
    finoRegistro.set(k, e);
    aldoniPlacon(x, z);
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
    // Rando-nodoj. La du finoj de cxi tiu EW-linio. La okcidenta fino ( pts[0] )
    // havas la korpon orienten ( +x ), do la fora kvadranto estas -x; la orienta
    // fino inverse.
    aldoniFinon(pts[0], roadZ, -1, 0);
    aldoniFinon(pts[pts.length - 1], roadZ, 1, 0);
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
    // Rando-nodoj. La du finoj de cxi tiu NS-linio. La suda fino ( pts[0] ) havas
    // la korpon norden ( +z ), do la fora kvadranto estas -z; la norda fino inverse.
    aldoniFinon(roadX, pts[0], 0, -1);
    aldoniFinon(roadX, pts[pts.length - 1], 0, 1);
    const w = 0o16/0o10;  // uniform 1.75 half-width
    for (let i = 0; i < pts.length - 1; i++) {
      const z1 = pts[i], z2 = pts[i + 1];
      if (Math.abs(z2 - z1) > 0o1/0o10) {
        vojDifinoj.push({ pts: [[roadX, z1], [roadX, z2]], w });
      }
    }
  }

  // L-korneroj — nodoj kie AMBAU perpendikularaj vojoj finigas samloke ( la
  // kvar anguloj de la krada rombo ). Tiuj ricevas rondigitan arkon anstatau
  // du interkovritajn cirklajn ĉapojn.
  const arkajNodoj: { x: number; z: number; sx: number; sz: number }[] = [];
  const arkajKlavoj = new Set<string>();
  for (const [k, e] of finoRegistro) {
    if (e.sx !== 0 && e.sz !== 0) {
      const [x, z] = k.split(",").map(Number);
      if (cxuNodoValidas(x, z)) {
        arkajNodoj.push({ x, z, sx: e.sx, sz: e.sz });
        arkajKlavoj.add(k);
      }
    }
  }
  for (let i = placajNodoj.length - 1; i >= 0; i--) {
    const [x, z] = placajNodoj[i];
    if (arkajKlavoj.has(x + "," + z)) placajNodoj.splice(i, 1);
  }
  // T-kunigoj — nodoj kie UNU vojo finiĝas kaj la alia trapasas. La finiĝanta
  // vojo kaj la trapasanta vojo interkovras samplane ĉe la ena angulo ( la
  // samaj bendoj en la sama loko ) kaj la du tavoloj z-flagris laŭ la fotila
  // angulo. La sama levita kruciĝa plato kiel la kvarvojaj kruciĝoj kovras la
  // tutan nodon per UNU surfaco — la vojoj subiras kaj reaperas glate.
  const tNodoj = placajNodoj.filter(([px, pz]) => realajIntersekcoj.has(px + "," + pz));
  // Fermitaj flankoj por la T-kunigaj platoj — la direkto de la finiĝanta
  // vojo ( unu ne-nula komponanto ). La T-kunigo havas UNU flankon sen vojo,
  // kie la finiĝanta vojo ne daŭrigas; tiu flanko ricevas plenan andezitan
  // strion, por ke la kruciĝo ne lasu tiun flankon malfermita sen bordo.
  //
  // Tra-nodoj — la finiĝanta vojo DAŬRIGAS en la alian direkton ( la ringo
  // etendas la NS-vojon norden ĉe x=±12 kaj la doka avenuo suden ĉe x=12 ),
  // do la fermita-flanka strio tranĉus la daŭrantan vojon kaj restus videbla
  // andezita breto trans la vojo. Tiuj nodoj ricevas la kvarvojan platon
  // anstataŭ la T-platon — la strio malaperas kaj la vojo daŭrigas glate tra
  // la kruciĝo.
  const traNodoj = new Set([ "12,60", "-12,60", "12,-60" ]);
  const tFermitaj = new Map<string, [ number, number ]>();
  for ( const [ tx, tz ] of tNodoj ) {
    const e = finoRegistro.get( tx + "," + tz );
    if ( e && !traNodoj.has( tx + "," + tz ) ) tFermitaj.set( tx + "," + tz, e.sx !== 0 ? [ e.sx, 0 ] : [ 0, e.sz ] );
  }
  // Stacia T-kunigo ( 0,80 ) — la stacia vojo eniras la ringon de la nordo.
  // La ringo pasas orienten-okcidenten kaj la stacia vojo daŭrigas norden, do
  // la fermita flanko ( sen vojo ) estas la SUDO. La strio kuŝas sur la suda
  // bordo-bendo de la ringo ( andezito sur andezito — nevidebla ) kaj la du
  // anguloj sur la norda flanko — la kruciĝo ricevas la saman unu-surfacan
  // platon kiel la ceteraj T-kunigoj, sen duobla tavolo kun la ringo.
  tNodoj.push([ 0, 0o120 ]);
  tFermitaj.set( "0,80", [ 0, -1 ] );
  for (const [px, pz] of placajNodoj) realajIntersekcoj.delete(px + "," + pz);
  for (const klavo of arkajKlavoj) realajIntersekcoj.delete(klavo);

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
      [ -0o124, -0o140 ], [ -0o70, -0o150 ],
      ...dockaLandaRando,
      [ 0o70, -0o124 ], [ 0o124, -0o122 ],
    ],
    w: 0o16/0o10
  });

  // Docka avenuo — ĝia ĉefa akso kongruas kun la urba krada vojo ĉe x=12; ĝi
  // daŭrigas la kradan NS-vojon SUDEN de ĝia fino ( 12,-60 ) ĝis la kajo
  // ( 12,-88 ), kie ĝi kunfandiĝas kun ĝi. La malnova komenco ĉe ( 12,-36 )
  // interkovris la kradan NS-vojon samplane ( z -60..-36 — la sama vojo
  // dufoje ) kaj la du tavoloj z-flagris laŭlonge de la tuta peco. La krada
  // vojo jam kovras la pecon ( 12,-36 )..( 12,-60 ), do la avenuo komenciĝas
  // nur kie la krada vojo finiĝas. La kajo mem servas la tri dokojn, do
  // neniaj apartaj branĉoj de la avenuo bezonatas.
  vojDifinoj.push({ pts: [ [ 0o14, -0o74 ], [ 0o14, -0o130 ] ], w: 0o16/0o10 });

  // Arbarvojo — la stacidoma vojo ne kondukas REKTE al la konstruaĵo.
  // anstataŭe ĝi kondukas al KVADRATA vojo ĉirkaŭ la norda nova ekstera domo
  // (0,3) kiu baras la rektan vojon. La domo formas "plenigitan vojbaron"
  // (la urba sprono finiĝas ĉe ĝia suda pordo ĉe z=60). La suda flanko de la
  // kvadrato estas la ekzistanta kradvojo ĉe z=60; la orienta/okcidenta
  // flankoj plilongiĝas la kradvojojn ĉe x=±12; la norda flanko estas nova
  // EW-vojo ĉe z=80. La norda flanko restas sur la ebena altebenaĵo ( la
  // tereno falas krute norde de z=80 en la naturan basenon de la stacio — la
  // malnova z=84 sidis sur la deklivo, la ŝtupaj ŝoseoj leviĝis super la
  // arkajn angulojn kaj kovris ilin ). De la norda flanko la stacidoma vojo
  // rampas sur la lanĉ-apronon ĝis la stacia pordo (z=96). La vojo-supro
  // sekvus la terenon +0o2/0o10 kaj enpuŝus ĝis 0o3/0o20 SUPER la apron-supron
  // (h0 + 0o1/0o20), do ĝi ricevas propran altan funkcion kiu rampas malsupren
  // al la aprona nivelo dum la lastaj ~2 unuoj (z 94..96 — la sama fino kiel
  // la alireja koridoro, do la vojo neniam enfosas en la terenon dum la
  // malsupreno). Sur la aprono la vojo kuŝas ĝuste sur la supro — la voja
  // polygonOffset gajnas la koincidajn facojn kontraŭ la aprono, kaj ĝi pasas
  // 0o1/0o100 SUB la orajn bendojn (ĝia supro je h0 + 0o4/0o100, la bendoj je
  // h0 + 0o5/0o100) — neniu z-flagrado, kaj ĝi atingas la pordon ĉe la muro.
  const stacioH0 = stacioSxipo ? (stacioSxipo.h0 ?? alteco(0, 0o144)) : alteco(0, 0o144);
  const apronaNivelo = stacioH0 + 0o1/0o20 - 0o2/0o10;
  const arbarvojaAlteco = (x: number, z: number): number => {
    const t = glataPaso(0o136, 0o140, z);
    return alteco(x, z) * (1 - t) + apronaNivelo * t;
  };
  // Kvadrata ringo ĉirkaŭ la baranta domo (0,3). Orienta/okcidenta flankoj
  // (x=±12, z 60..80) kaj norda flanko (z=80, x ±12). La suda flanko estas la
  // ekzistanta kradvojo ĉe z=60.
  vojDifinoj.push({ pts: [ [ 0o14, 0o74 ], [ 0o14, 0o120 ] ], w: 0o16/0o10 });
  vojDifinoj.push({ pts: [ [ -0o14, 0o74 ], [ -0o14, 0o120 ] ], w: 0o16/0o10 });
  vojDifinoj.push({ pts: [ [ -0o14, 0o120 ], [ 0o14, 0o120 ] ], w: 0o16/0o10 });
  // (0,80) = norda flanko de la kvadrato; (0,96) = stacia pordo. La punktoj
  // sidas je du-unuaj paŝoj — la basena deklivo estas kruta, kaj la kvar-
  // unuaj ŝtupoj levitaj ĉe siaj centroj kreis fendegojn en la vojo. La
  // alireja koridoro en tereno.ts glatigas la terenon sub la vojo, do la
  // du-unuaj ŝtupoj farigas normala ŝtuparo anstataŭ rompita ŝoseo.
  vojDifinoj.push({
    pts: [ [ 0, 0o120 ], [ 0, 0o122 ], [ 0, 0o124 ], [ 0, 0o126 ], [ 0, 0o130 ], [ 0, 0o132 ], [ 0, 0o134 ], [ 0, 0o136 ], [ 0, 0o140 ] ],
    w: 0o16/0o10,
    heightFn: arbarvojaAlteco
  });

  // Lamp-nodoj por la kajo kaj stacidomaj vojoj — la samaj lampaj ŝablonoj
  // kiel la krada reto. NENIU ĉap-mesho konstruiĝas ĉe ĉi tiuj nodoj: la
  // malnovaj rondigitaj kapoj ( disko + ringo ) kuŝis SUR la vojoj kaj la
  // tereno samplane, kaj la interkovritaj partoj z-flagris laŭ la fotila
  // angulo. La vojoj mem jam plenigas ĉiun nodon — ĉe T-kunigo la trapasanta
  // vojo kovras la tutan regionon kaj ĝia andezita bordo donas la bordon sur
  // la fermita kvara flanko. La nodoj restas nur por la lampoj.
  placajNodoj.push([ -0o124, -0o140 ]);
  placajNodoj.push([ 0o124, -0o122 ]);
  // Stacia T-kunigo ( 0,80 ) — kie la stacia vojo eniras la ringon. La nodo
  // ricevas la saman kvar-lampan ŝablonon kiel la ceteraj T-kunigoj.
  placajNodoj.push([ 0, 0o120 ]);
  // La dokaj landrandoj — kie la kajo renkontas ĉiun platformon, la rando-nodo
  // markas la enirejon ( lampoj ).
  for ( const [ dx, dz ] of dockaLandaRando ) placajNodoj.push([ dx, dz ]);
  // Stacidoma ringo — la nordaj anguloj ( la sudaj estas kradaj kruciĝoj )
  // estas L-korneroj kaj ricevas rondigitajn arkojn kiel la kradaj anguloj.
  // Ili sidas ĉe z=80 sur la ebena altebenaĵo, ne ĉe la basena deklivo.
  arkajNodoj.push({ x: 0o14, z: 0o120, sx: 1, sz: 1 });
  arkajNodoj.push({ x: -0o14, z: 0o120, sx: -1, sz: 1 });

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

  // ⟪ Kruciĝaj platoj 📃 ⟫ — ĉe ĉiu kruciĝo la strioj de la du vojoj kuŝas
  // samplane kaj la teksturoj montras krucan kvadraton. Diorita centro kun
  // kvar andezitaj anguloj kovras ĉiun kruciĝon per unu levita surfaco, do la
  // duobla andezito en la anguloj malaperas kaj la vojo-randoj daŭrigas preter
  // la kruciĝo. La T-kunigoj ricevas la saman platon — la finiĝanta vojo
  // interkovras la trapasantan samplane kaj la plato estas la unu surfaco.
  konstruiIntersekcajnPlatojn( sceno, [ ...realajIntersekcoj ].map( klavo => {
    const [ x, z ] = klavo.split( "," ).map( Number );
    return [ x, z ] as [ number, number ];
  } ).concat( tNodoj ), alteco, dioritaMaterialo, andezitaMaterialo, tFermitaj );

  // ⟪ Krada indekso por la voja ekskludo 📃 ⟫ — ĉelo-krado por ke la vegetajxo
  // ne skanu ĉiun vojspecimenon por ĉiu kandidata arbo ( O(1) anstataŭ O(n) ).
  const VOJA_ĈELO = 0o10;
  const vojaKrado = new Map<number, THREE.Vector3[]>();
  for (const p of vojSpecimenoj) {
    const kx = Math.floor(p.x / VOJA_ĈELO), kz = Math.floor(p.z / VOJA_ĈELO);
    const klavo = kx * 0o100000 + kz;
    let ĉelo = vojaKrado.get(klavo);
    if (!ĉelo) { ĉelo = []; vojaKrado.set(klavo, ĉelo); }
    ĉelo.push(p);
  }

  // Rondigitaj arkoj ĉe la L-korneroj — kvaronaj diskoj en la korneraj
  // kvadrantoj ( la libera tereno inter la vojoj ), levitaj super la tereno.
  for (const a of arkajNodoj) {
    konstruiRondigitanArkon(sceno, a.x, a.z, a.sx, a.sz, alteco, dioritaMaterialo, andezitaMaterialo);
  }
  await raporti();

  // ⟪ Arbar-randaj platformoj 📃 ⟫
  // Rondigitaj diamantoj donas malgrandajn ripozlokojn sen kovri la vojan reton.
  const periferiajLokoj: [ number, number ][] = [
    [ -0o150, 0o40 ], [ -0o110, 0o110 ], [ -0o40, 0o150 ], [ 0o40, 0o150 ],
    [ 0o110, 0o100 ], [ 0o150, 0o30 ], [ 0o130, -0o100 ], [ -0o130, -0o100 ],
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
  // Rondigitaj arkoj — la L-korneroj ne estas en placajNodoj nek realaj
  // intersekcoj, do ili ricevas propran kvar-lampan ŝablonon por resti lumigitaj.
  for (const a of arkajNodoj) {
    addLamp(a.x + 0o23/0o10, a.z + 0o23/0o10);
    addLamp(a.x + 0o23/0o10, a.z - 0o23/0o10);
    addLamp(a.x - 0o23/0o10, a.z + 0o23/0o10);
    addLamp(a.x - 0o23/0o10, a.z - 0o23/0o10);
  }
  // Lampoj ĉirkaŭ la lago — uniforma dismeto: egalaj angulaj paŝoj, kaj la
  // distanco ligita al la ondigita lagrando ( lagoRadio ), do la lampoj
  // spuras la bordon egale inter si sen perfekta cirklo — nur eta kribro por
  // ne aspekti mekanike. La rivera buŝo kaj la orienta enfluo ( kie la rivero
  // renkontas la lagon ) restas sen lampoj. Cxiu cirkauxa lampo staras sur la
  // samaj diamantaj platoj kiel la periferiaj platformoj ( reuzita
  // konstruiPeriferiajnPlatformojn ) — kolektita en lampajPlatformLokoj.
  const lampajPlatformLokoj: [ number, number ][] = [];
  const LAGO_LAMP_N = 0o10;   // 8 — malmultaj, egale ĉirkaŭ la lago
  const lagoNiv = lagoNivelo();
  for ( let i = 0; i < LAGO_LAMP_N; i++ ) {
    const a = i / LAGO_LAMP_N * Math.PI * 2 + ( Math.random() - 0o1/0o2 ) * 0o5/0o40;
    const d = lagoRadio( a ) + 0o20 + ( Math.random() - 0o1/0o2 ) * 0o10;
    const x = LAGO_X + Math.cos( a ) * d;
    const z = lagoZ() + Math.sin( a ) * d;
    if ( Math.abs( z - riveroZ( x ) ) < 0o10 ) continue;      // rivera buŝo/enfluo
    if ( cxuEnNordorientaRivero( x, z ) ) continue;        // nordorienta rivereto
    if ( alteco( x, z ) < lagoNiv + 0o4/0o10 ) continue;   // subakva bordo
    if ( lampLokoj.some( l => Math.hypot( x - l.x, z - l.z ) < 0o40 ) ) continue;
    addLamp( x, z, alteco( x, z ) + 0o4/0o10 - 0o1/0o40 );
    lampajPlatformLokoj.push( [ x, z ] );
  }

  // Lampoj ĉirkaŭ la norda montaro — pozicioj laux la GEOGRAFIO de la monto
  // ( montaroNorda en tereno.ts ), ne ringo. La monto estas orienta-okcidenta
  // kresto ( suda ramplo z ≈ 0o200 → 0o346 ) kun tri ĉefaj pintoj
  // ( x ≈ -0o300, -0o40, 0o240 ) kaj profundaj seloj inter ili. La lampoj
  // sekvas la piedon de la suda ramplo ( kvar lauxlonge, al la urba aliro ),
  // la selan vojeton, la orientan kaj okcidentan spronojn kaj la nordan
  // piedon — nenia egala disigo ĉirkaŭ cirklo.
  const montajLampLokoj: [ number, number ][] = [
    [ -0o220, 0o200 ], [ -0o60, 0o200 ], [ 0o70, 0o200 ], [ 0o150, 0o260 ],
    [ 0o250, 0o200 ], [ -0o400, 0o320 ], [ 0o400, 0o300 ], [ -0o140, 0o440 ],
    [ 0o110, 0o440 ],
  ];
  for ( const [ mx, mz ] of montajLampLokoj ) {
    if ( Math.abs( mz - riveroZ( mx ) ) < 0o10 ) continue;   // rivero
    if ( cxuEnLago( mx, mz ) ) continue;                  // lago
    if ( lampLokoj.some( l => Math.hypot( mx - l.x, mz - l.z ) < 0o30 ) ) continue;
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
  await raporti();

  // ⟪ Keŭfĥesoj 📃 ⟫ — starfrukt-formaj strukturoj ( ſɭw ʃɔɔ˞ ) kun 6-flanka
  // simetrio. Ili staras nur ĉe la kvar ANGULOJ de la centra konstruaĵo ( la
  // diamanta sanktejo ), unu ĝuste ekster ĉiu pinto. La sankteja piedo estas
  // kvadrato turnita je Math.PI / 4 ( kreiKlinoTavolon ), do giaj pintoj
  // alfrontas la diagonalojn 45°, 135°, 225° kaj 315° — ne la flankojn.
  const KEUXFHXESO_R = 0o12;   // 10 — klare ekster la pinto ( 7.07 ) kaj iom pli for
  const keuxfhxesoLokoj: KeuxfhxesoLoko[] = [];
  for ( let i = 0; i < 4; i++ ) {
    const a = Math.PI / 4 + i * Math.PI / 2;
    keuxfhxesoLokoj.push( { x: Math.cos( a ) * KEUXFHXESO_R, z: Math.sin( a ) * KEUXFHXESO_R, rot: a } );
  }
  konstruiKeuxfhxeso( sceno, keuxfhxesoLokoj, alteco, oraMaterialo );
  for ( const l of keuxfhxesoLokoj ) kolizioj.push( { x: l.x, z: l.z, r: 0o16/0o10 } );
  await raporti();

  // ⟪ Vegetajxo 📃 ⟫
  const ekskluziviRiveron = (x: number, z: number) => Math.abs(z - riveroZ(x)) < 7 || cxuEnLago(x, z) || cxuEnNordorientaRivero(x, z) || skulptitaAkvo(x, z);
  const ekskluziviVojojn = (x: number, z: number, m: number) => {
    // Krada sercxo anstataux la lineara skanado de cxuj vojspecimenoj.
    const r = Math.ceil(m / VOJA_ĈELO) + 1;
    const bx = Math.floor(x / VOJA_ĈELO), bz = Math.floor(z / VOJA_ĈELO);
    const m2 = m * m;
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        const ĉelo = vojaKrado.get((bx + dx) * 0o100000 + (bz + dz));
        if (!ĉelo) continue;
        for (const p of ĉelo) {
          const ddx = x - p.x, ddz = z - p.z;
          if (ddx * ddx + ddz * ddz < m2) return true;
        }
      }
    }
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
  await raporti();

  // Filikoj — pli da kvanto, apud arboj kaj vojoj
  konstruiFilikojn( sceno, 0o400, alteco, arboj, vojSpecimenoj, ekskluziviRiveron, ekskluziviVojojn );

  // Purpuraj plantoj — ringo de koloro ĉe la urba rando, kie la vojoj dissolvigas en arbaron
  konstruiPurpurajnPlantojn( sceno, 0o200, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon );

  // Purpuraj filikoj — pli altaj violetaj frondoj kiel en Four Groves
  konstruiPurpurajnFilikojn( sceno, 0o200, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon );
  // Altaj purpuraj filikoj — la arboformaj, kun la arba listo por ke ili ne
  // kresku en la trunkojn/kronojn de la jam metitaj betuloj, larikoj kaj
  // Ĥŝakŝlefoj.
  konstruiAltajnPurpurajnFilikojn( sceno, 0o100, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    [ ...arboj, ...larikoj, ...hxsxaksxlefoj ] );

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
  await raporti();

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
  // Ĥŝakŝlefoj — purpuraj laktuk-arboj miksitaj en la lagringon, por ke la
  // lagbordo ricevu la saman specan diversecon kiel la ĉef-arbaro.
  const lagHxsxaksxlefoj = metiArbojnCxirkauLagon( alteco, 0o30, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53126, [ ...lagArboj, ...lagLarikoj, ...arboj, ...larikoj ], 0o10,
    kronaRadiusoHxsxaksxlefa );
  const lagHxsxaksxlefojTrunkoj = konstruiHxsxaksxlefojn( sceno, lagHxsxaksxlefoj );
  // Trunkaj likenoj ankaux sur la lag-arboj ( nova semo por malsamaj buloj )
  konstruiTrunkajnLikenojn( sceno, [ lagTrunkoj, lagLarikajTrunkoj, lagHxsxaksxlefojTrunkoj ], 0o62452 );
  konstruiHerbonCxirkauLagon( sceno, 0o300, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53122 );
  // Cakeoj ( ſᶘᴜ ſɭɔ / Equisetum telmateia ) — la grandaj branĉet-kirlaj
  // ĉevalvostoj, kareksa rando ĉe la lagrando, kie la bordo estas malseka
  // ( ne pli ol ~2 unuojn super la akvonivelo ).
  konstruiCakeojn( sceno, 0o120, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviKonstruajxon, ekskluziviVojojn, 11605 );
  // Subkreskajxo cxirkaux la lago — cxiuj malgrandaj plantoj ( verdaj filikoj,
  // malaltaj purpuraj plantoj, purpuraj filikoj, herbotufoj, musko-montetoj
  // kaj likenaj makuloj ) sekvas la ondigitan lagrandon kaj klasterigxas
  // cxirkaux la lagaj arboj, sur la sekaj bordoj.
  konstruiLaganSubkreskajxojn( sceno, 0o500, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    [ ...lagArboj, ...lagLarikoj, ...lagHxsxaksxlefoj ], [ ...lagArboj, ...lagLarikoj, ...lagHxsxaksxlefoj ],
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon );
  await raporti();

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

  // ⟪ Vegetaĵo de la nordorienta monto 📃 ⟫ — la nova monto oriente-norde de la
  // lago ( montaroNordOrienta, centro ≈ -0o360,0o114 ) ricevas sian propran
  // malgrandan larikaron kaj rokojn. La samaj montaj helpiloj ( kun cx/xDuono
  // parametroj ) metu la arbojn laŭ la spur-silueta envelopo de ĉi tiu monto,
  // sub la arbolinio, kaj la rokojn sur la pintoj kaj supraj deklivoj.
  const neBetuloj = metiMontajnArbojn( alteco, 0o40, 0o40, 0o140,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53135,
    [ ...arboj, ...larikoj ], 0o10, undefined, -0o360, 0o64 );
  const neBetulaTrunkoj = konstruiArbaron( sceno, neBetuloj );
  const neLarikoj = metiMontajnArbojn( alteco, 0o60, 0o50, 0o160,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53136,
    [ ...neBetuloj, ...montajBetuloj, ...montajLarikoj, ...arboj, ...larikoj ], 0o10, kronaRadiusoLarika,
    -0o360, 0o64 );
  const neLarikaTrunkoj = konstruiLarikon( sceno, neLarikoj );
  const neRokoj = konstruiMontajnRokojn( sceno, 0o40, alteco, ekskluziviRiveron, ekskluziviVojojn,
    624513, -0o360, 0o64, 0o50, 0o100 );
  konstruiLikenojn( sceno, 0o60, alteco, [ ...neLarikoj, ...neBetuloj ], neRokoj,
    ekskluziviRiveron, ekskluziviVojojn, true );
  konstruiTrunkajnLikenojn( sceno, [ neLarikaTrunkoj, neBetulaTrunkoj ], 0o62454 );
  // Subkreskajxo — verdaj filikoj, malaltaj purpuraj plantoj, purpuraj
  // filikoj, herbotufoj, musko-montetoj kaj likenoj tra la tutaj betulaj kaj
  // larikaj arbaroj ( valaj kaj montaj ). La plantoj klasterigxas cxirkaux la
  // arboj — gxuste ekster la kronoj — kaj la cetero sekvas la montan
  // spur-siluetan envelopon, do la subkreskajxo kovras kaj la valajn kaj la
  // montajn arbarojn. Cxiuj arboj estas evitu-ankroj, por ke neniu planto
  // kresku en la trunkojn aŭ kronojn, kaj la konstruajxoj estas ekskluditaj.
  konstruiMontajnSubkreskajxojn( sceno, 0o3000, alteco,
    [ ...arboj, ...larikoj, ...montajLarikoj, ...montajBetuloj ],
    [ ...arboj, ...larikoj, ...hxsxaksxlefoj, ...montajLarikoj, ...montajBetuloj ],
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon );
  await raporti();

  // ⟪ Nebulaj sprajtoj 📃 ⟫
  const nebulaTeksajxo = kreiNebulanTeksajxon();
  const nebuloj: THREE.Sprite[] = [];
  for (const [x, z, y, skalo, op] of [
    [ -0o110, -0o110, 0o24/0o10, 0o60, 0o5/0o40 ], [ -0o40, -0o110, 0o215/0o100, 0o60, 0o3/0o20 ],
    [ 0o30, -0o110, 0o263/0o100, 0o60, 0o5/0o40 ], [ 0o70, -0o100, 0o115/0o40, 0o40, 0o5/0o40 ],
    [ -0o60, -0o60, 0o163/0o100, 0o40, 0o11/0o100 ], [ -0o110, 0o40, 0o63/0o40, 0o30, 0o3/0o40 ],
    [ 0o110, -0o60, 0o163/0o100, 0o30, 0o3/0o40 ], [ -0o70, 0o110, 0o14/0o10, 0o30, 0o3/0o40 ],
    [ 0o100, 0o110, 0o155/0o100, 0o30, 0o5/0o100 ], [ -0o130, 0o10, 0o55/0o40, 0o30, 0o1/0o10 ],
  ]) {
    const materialo = new THREE.SpriteMaterial({ map: nebulaTeksajxo, transparent: true, opacity: op, depthWrite: false });
    const sp = new THREE.Sprite(materialo);
    sp.position.set(x, y, z); sp.scale.setScalar(skalo);
    sp.userData = { rapido: 0o15/0o40 + Math.random() * 0o10/0o10 };
    sceno.add(sp); nebuloj.push(sp);
  }
  for (let i = 0; i < 0o60; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 0o130 + Math.random() * 0o300;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const y = alteco(x, z) + 0o4/0o10 + Math.random() * 3;
    const materialo = new THREE.SpriteMaterial({
      map: nebulaTeksajxo, transparent: true,
      opacity: 0o1/0o10 + Math.random() * 0o5/0o40,
      depthWrite: false,
    });
    const sp = new THREE.Sprite(materialo);
    sp.position.set(x, y, z);
    sp.scale.setScalar(0o60 + Math.random() * 0o130);
    sp.userData = { rapido: 0o15/0o100 + Math.random() * 0o4/0o10 };
    sceno.add(sp); nebuloj.push(sp);
  }
  await raporti();

  // ⟪ Kanuoj 📃 ⟫
  // La kanuoj sekvas la novajn dokpintojn (riveroZ + 3, en la akvo) por resti atingeblaj de la dokoj.
  // Ili flosas sur la KONKRETA akvosurfaco ( riveraAkvaNivelo — krampita al la
  // laga nivelo ĉe la buŝo ), NE sur la kruda akvoY de la naskiĝloko: tiu povas
  // malsami ĝis ~2 unuoj kaj lasus la kanuon duone droninta. sperto.ts ankaŭ
  // refreŝigas la nivelon ĉiukadre, do la kanuoj ĉiam naĝas ĝuste.
  const kanuoj: Kanoto[] = [];
  // La eksteraj kanuoj estas la nova "satala" stilo (malhel-pina/ora, kongrua al
  // la arkitekturo); la centra restas la baza hela stilo.
  kanuoj.push(kreiKanoton(sceno, 0o60, riveroZ(0o60) + 3, -Math.PI * 0o2/0o10, oraMaterialo, riveraAkvaNivelo(0o60), "satala"));
  kanuoj.push(kreiKanoton(sceno, -0o60, riveroZ(-0o60) + 3, Math.PI * 0o2/0o10, oraMaterialo, riveraAkvaNivelo(-0o60), "satala"));
  kanuoj.push(kreiKanoton(sceno, 0, riveroZ(0) + 3, -Math.PI * 0o4/0o10, oraMaterialo, riveraAkvaNivelo(0)));

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
  await raporti();

  // ⟪ NPC-agordo 📃 ⟫ — la vestoj vivas en assets/vestaro/vestoj.ts ( VESTOJ );
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
    const fig = konstruiFiguron(VESTA_LISTO[npcoj.length % VESTA_LISTO.length], Math.random() < 0o1/0o4 ? "haroLonga" : "haroMalalta");
    const h = alteco(sX, sZ);
    fig.group.position.set(sX, h, sZ);
    fig.hejmo.set(sX, h, sZ);
    fig.celo.set(sX, h, sZ);
    fig.atendo = Math.random() * 4;
    fig.rapido = 0o55/0o100 + Math.random() * 0o4/0o10;
    sceno.add(fig.group);
    npcoj.push(fig);
  }
  await raporti();

  // ⟪ Interna sistemo 📃 ⟫
  const internaSistemo: InternaSistemo = kreiInternanSistemon();

  return {
    konstruSpecoj, kolizioj, dokoKolizioj, selektajxoj, konstruGrupoj,
    vojSpecimenoj, placajNodoj,    riverData, riveroNordOrienta, lago, skulptaAkvo, bestoj, petreloj, lampSistemo,
    nebuloj, kanuoj, npcoj, internaSistemo, xipo, vojDifinoj, vojDuonLargho,
    NPCLOKOJ, VESTA_LISTO,
  };
}
