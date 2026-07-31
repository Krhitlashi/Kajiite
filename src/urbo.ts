// Urbo — urba konstruo. konstruajxoj, vojoj, placoj, lampoj, vegetajxo, nebulo, akvo, kanuoj
// Modula krada sistemo — vojoj kaj konstruajxaj pozicioj derivitaj de kradaj parametroj.
import * as THREE from "three";
import { konstruiZiguraton, TIPARO, KonstruSpec } from "../assets/zigurato-konstruilo.js";
import { kreiNebulanTeksajxon } from "../assets/teksajxoj.js";
import { konstruiRiveron, RiverData } from "../assets/akvo.js";
import { metiArbojn, konstruiArbaron, konstruiFilikojn, konstruiPurpurajnPlantojn, konstruiPurpurajnFilikojn,
  konstruiAltajnPurpurajnFilikojn, konstruiLikenSxtonojn, konstruiLarikon, konstruiHerbon, konstruiMusxajnMontetojn, konstruiFungojn,
  konstruiFalintajnTrunkojn, konstruiEquisetum } from "../assets/vegetajxo.js";
import { konstruiVojojn, konstruiPlacojn, konstruiSpronon, konstruiPeriferiajnPlatformojn, VojDifino } from "../assets/vojoj.js";
import { konstruiDokon } from "../assets/doko.js";
import { konstruiLampojn, LampSistemo } from "../assets/lampoj.js";
import { kreiKanoton, Kanoto } from "../assets/transporto.js";
import { konstruiFiguron, gxisdatigiNpc } from "../assets/npcoj.js";
import type { Figuro, Vesto } from "../assets/npcoj.js";
import { kreiInternanSistemon, InternaSistemo } from "../assets/internoj.js";
import { riveroZ, alteco, akvoY, montetaBazo } from "./tereno.js";

export interface UrbaSistemo {
  konstruSpecoj: KonstruSpec[];
  kolizioj: { x: number; z: number; r: number }[];
  selektajxoj: THREE.Mesh[];
  konstruGrupoj: THREE.Group[];
  vojSpecimenoj: THREE.Vector3[];
  placajNodoj: [number, number][];
  riverData: RiverData;
  lampSistemo: LampSistemo;
  nebuloj: THREE.Sprite[];
  kanuoj: Kanoto[];
  npcoj: Figuro[];
  internaSistemo: InternaSistemo;
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
  // 7×5 rektangula urba arangxo — perfekte simetria krado.
  // Cxiu vico havas la samajn 7 kolumnojn, cxiu celo havas konstruajxon.
  // Neniuj nulaj celoj, neniuj brecxoj — cxiuj blokoj estas unuformaj kvadratoj.
  //
  //  G = generala (domo/turo), N = mangxejo, Y = stacio, W = sanktejo
  //
  //       | G | G | G | G | G | G | G |   z=2 (supro)
  //       | G | G | N | N | N | G | G |   z=1
  //       | G | Y | G | W | G | Y | G |   z=0 (centro)
  //       | G | G | N | N | N | G | G |   z=-1
  //       | G | G | G | G | G | G | G |   z=-2 (subo)
  // ═══════════════════════════════════════════════════════════
  type CellType = "domo" | "turo" | "manĝejo" | "stacio" | "sanktejo";

  // Konstruajxaj pozicioj. [col, row, type] kie mondo = (col*PASXO, row*PASXO), W je (0,0).
  // 7 cols × 5 rows = 31 buildings (4 corner edges removed). Mirrored across both axes.
  const LAYOUT: [number, number, CellType][] = [
    // Row 2 — top edge (corners removed)
    [ -2, 2, "domo" ], [ -1, 2, "turo" ], [ 0, 2, "domo" ], [ 1, 2, "turo" ], [ 2, 2, "domo" ],
    // Row 1
    [ -3, 1, "domo" ], [ -2, 1, "turo" ], [ -1, 1, "manĝejo" ], [ 0, 1, "manĝejo" ], [ 1, 1, "manĝejo" ], [ 2, 1, "turo" ], [ 3, 1, "domo" ],
    // Row 0 — center
    [ -3, 0, "domo" ], [ -2, 0, "stacio" ], [ -1, 0, "domo" ], [ 0, 0, "sanktejo" ], [ 1, 0, "domo" ], [ 2, 0, "stacio" ], [ 3, 0, "domo" ],
    // Row -1
    [ -3, -1, "domo" ], [ -2, -1, "turo" ], [ -1, -1, "manĝejo" ], [ 0, -1, "manĝejo" ], [ 1, -1, "manĝejo" ], [ 2, -1, "turo" ], [ 3, -1, "domo" ],
    // Row -2 — bottom edge (corners removed)
    [ -2, -2, "domo" ], [ -1, -2, "turo" ], [ 0, -2, "domo" ], [ 1, -2, "turo" ], [ 2, -2, "domo" ],
  ];

  const kolizioj: { x: number; z: number; r: number }[] = [];
  const PASXO = 0o30;

  // Konstruu la urbon el la kvadrataj celloj
  let bldgIdx = 0;
  const konstruSpecoj: KonstruSpec[] = [];
  for (const [col, row, type] of LAYOUT) {
    const x = col * PASXO, z = row * PASXO;
    if (type === null) continue;
    const niveloj = type === "sanktejo" ? 7 : type === "turo" ? 0o10 : type === "stacio" ? 3 : 4;
    const w = type === "sanktejo" ? 0o12 : type === "turo" ? 0o10 : 0o10;  // stacio, manĝejo, domo all 8×8
    const d = w;  // square buildings. depth = width
    const tieroAlto = type === "sanktejo" ? 24/8 : type === "turo" ? 24/8 : type === "stacio" ? 109/32 : 205/64;
    const sube = type === "sanktejo" ? 2 : undefined;
    const tieroAltoSub = type === "sanktejo" ? 83/32 : undefined;
    konstruSpecoj.push({ x, z, type, name: "bldg" + bldgIdx, niveloj, w, d, tieroAlto, sube, tieroAltoSub, rot: 0, diamond: true });
    bldgIdx++;
  }

  // Fiksu teren-alton kaj kolizion por cxiu konstruajxo (vojoj ne bezonataj ankoraux)
  konstruSpecoj.forEach(s => {
    s.h0 = alteco(s.x, s.z);
    kolizioj.push({ x: s.x, z: s.z, r: Math.hypot(s.w, s.d) / 2 + 4/8 });
  });

  const selektajxoj: THREE.Mesh[] = [];

  // ⟪ Rivero 📃 ⟫
  const riverData = konstruiRiveron(sceno, riveroZ, akvoY, 84/8, -0o200, 0o200, 0o50);

  // ⟪ Dokoj — tri lignaj alirejoj laŭ la suda riverbordo 📃 ⟫
  const DOKO_KOORDINATOJ: [number, number][] = [
    [ -0o52, -0o144 ], [ 0, -0o142 ], [ 0o52, -0o140 ],
  ];
  for ( const [ dx, dz ] of DOKO_KOORDINATOJ ) {
    konstruiDokon( sceno, dx, dz, 0, alteco, akvoY );
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
  konstruSpecoj.forEach(s => konstruGrupoj.push(konstruiZiguraton(s, sceno, selektajxoj)));

  // Konstruu aron da celloj por rapida sercxo
  const hasCellAt = (c: number, r: number) =>
    LAYOUT.some(([lc, lr, lt]) => lc === c && lr === r && lt !== null);

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

    // Konstruu segmentojn NUR inter intersekcaj NS-vojoj — neniuj randaj stumpoj
    const pts = [...intersecting].sort((a, b) => a - b);
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

    // Konstruu segmentojn NUR inter intersekcaj EW-vojoj — neniuj randaj stumpoj
    const pts = [...intersecting].sort((a, b) => a - b);
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
  vojDifinoj.push({ pts: [ [ -0o124, -0o144 ], [ -0o70, -0o150 ], [ -0o52, -0o150 ] ], w: 14/8 });
  vojDifinoj.push({ pts: [ [ 0o52, -0o140 ], [ 0o70, -0o136 ], [ 0o124, -0o136 ] ], w: 14/8 });

  // Docka avenuo — ĝia ĉefa akso kongruas kun la urba krada vojo ĉe x=12.
  // Ĉiu branĉo finiĝas ĉe la propra landa rando de doko, ne tra ĝia platformo.
  const dockaLandaRando: [ number, number ][] = [
    [ -0o52, -0o135 ], [ 0, -0o133 ], [ 0o52, -0o131 ],
  ];
  vojDifinoj.push({ pts: [ [ 0o14, -0o44 ], [ 0o14, -0o131 ] ], w: 14/8 });
  for ( const [ dx, dz ] of dockaLandaRando ) {
    vojDifinoj.push({ pts: [ [ 0o14, -0o131 ], [ dx, dz ] ], w: 14/8 });
  }

  // Voja duon-larĝo — la segmenta larĝo estas 14/8, do ĝia duon-larĝo estas 7/8.
  function vojDuonLargho(_g: number): number {
    return 7/8;
  }

  // ⟪ Spronvojoj 📃 ⟫
  for (const s of konstruSpecoj) {
    if (s.x === 0 && s.z === 0) continue;
    const rot = s.rot || 0;
    const pordoOffset = s.d / 2 + 12/8;
    const pordoX = s.x + Math.sin(rot) * pordoOffset;
    const pordoZ = s.z + Math.cos(rot) * pordoOffset;

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
      vojZ = pordoZ;
    } else {
      const signo = fZ > 0 ? 1 : -1;
      let celZ = signo > 0 ? Math.max(...RETO_Z) : Math.min(...RETO_Z);
      for (const rz of RETO_Z) {
        if (signo > 0 && rz > pordoZ && rz < celZ) celZ = rz;
        if (signo < 0 && rz < pordoZ && rz > celZ) celZ = rz;
      }
      const duonL = vojDuonLargho(celZ);
      vojX = pordoX;
      vojZ = celZ - signo * duonL;
    }

    if (Math.hypot(pordoX - vojX, pordoZ - vojZ) > 4/8) {
      konstruiSpronon(pordoX, pordoZ, vojX, vojZ, alteco, dioritaMaterialo, andezitaMaterialo, sceno);
    }
  }

  const vojSpecimenoj = konstruiVojojn(sceno, vojDifinoj, alteco, dioritaMaterialo, andezitaMaterialo);

  // ⟪ Placoj 📃 ⟫
  const placajNodoj: [number, number][] = [];
  for (const pX of RETO_X) {
    for (const pZ of RETO_Z) {
      if (Math.abs(pZ - riveroZ(pX)) < 0o17) continue;
      if (Math.hypot(pX, pZ) > 0o170) continue;
      let interkovro = false;
      for (const s of konstruSpecoj) {
        if (Math.hypot(pX - s.x, pZ - s.z) < Math.max(s.w, s.d) / 2 + 12/8) { interkovro = true; break; }
      }
      if (!interkovro) placajNodoj.push([pX, pZ]);
    }
  }
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
  }
  // Platformoj estas diamantaj (pintoj laŭ la aksoj), do iliaj lampoj estu sam-orientitaj.
  for (const [ x, z ] of periferiajPlatformoj) addLamp( x, z, alteco( x, z ) + 5/8, 0 );
  for (const gx of RETO_X) {
    for (const gz of RETO_Z) {
      if (Math.abs(gz - riveroZ(gx)) < 0o14) continue;
      addLamp(gx + 19/8, gz + 19/8);
      addLamp(gx - 19/8, gz - 19/8);
    }
  }
  const lampSistemo = konstruiLampojn(sceno, lampLokoj, dioritaMaterialo, oraMaterialo);

  // ⟪ Vegetajxo 📃 ⟫
  const ekskluziviRiveron = (x: number, z: number) => Math.abs(z - riveroZ(x)) < 7;
  const ekskluziviVojojn = (x: number, z: number, m: number) => {
    for (const p of vojSpecimenoj) if (Math.hypot(x - p.x, z - p.z) < m) return true;
    return false;
  };
  const ekskluziviKonstruajxon = (x: number, z: number, m: number) => {
    for (const s of konstruSpecoj) if (Math.hypot(x - s.x, z - s.z) < s.w * 19/32 + m) return true;
    return false;
  };
  // Betuloj ( arbara periferio ) — pli densa ol antauxe
  const arboj = metiArbojn( alteco, 0o400, 0o200, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53104 );
  konstruiArbaron( sceno, arboj );

  // Larikoj — miksitaj kun betuloj por pli diversa arbaro
  // Aparta semo kaj granda inter-arba liberspaco malebligas kronan interkovron.
  const larikoj = metiArbojn( alteco, 0o200, 0o200, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53114, arboj, 0o30 );
  konstruiLarikon( sceno, larikoj );

  // Filikoj — pli da kvanto, apud arboj kaj vojoj
  konstruiFilikojn( sceno, 0o400, alteco, arboj, vojSpecimenoj, ekskluziviRiveron );

  // Purpuraj plantoj — ringo de koloro ĉe la urba rando, kie la vojoj dissolvigas en arbaron
  konstruiPurpurajnPlantojn( sceno, 0o200, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon );

  // Purpuraj filikoj — pli altaj violetaj frondoj kiel en Four Groves
  konstruiPurpurajnFilikojn( sceno, 0o200, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon );
  konstruiAltajnPurpurajnFilikojn( sceno, 0o100, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon );

  // Liken-sxtonoj — en la arbaro
  konstruiLikenSxtonojn( sceno, 0o60, alteco, ekskluziviRiveron );

  // Herbo — densa herbtapiso en la arbaro kaj randoj
  konstruiHerbon( sceno, 0o600, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon );

  // Musko montetoj — apud arboj tra la arbaro
  konstruiMusxajnMontetojn( sceno, 0o200, alteco, arboj, ekskluziviRiveron );

  // Fungoj ( amanitoj ) — en ombraj lokoj sub arboj
  konstruiFungojn( sceno, 0o100, alteco, arboj, ekskluziviRiveron );

  // Falintaj trunkoj — en la densa arbaro
  konstruiFalintajnTrunkojn( sceno, 0o40, alteco, arboj, ekskluziviRiveron );

  // Equisetum ( kavalerbo ) — laux la riverbordoj
  konstruiEquisetum( sceno, 0o120, alteco, riveroZ, ekskluziviKonstruajxon );

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
  const kanuoj: Kanoto[] = [];
  kanuoj.push(kreiKanoton(sceno, 0o52, -0o151, -Math.PI * 2/8, oraMaterialo, akvoY(0o52)));
  kanuoj.push(kreiKanoton(sceno, -0o52, -0o167, Math.PI * 2/8, oraMaterialo, akvoY(-0o52)));
  kanuoj.push(kreiKanoton(sceno, 0, -0o160, -Math.PI * 4/8, oraMaterialo, akvoY(0)));

  // ⟪ NPC-agordo 📃 ⟫
  const VESTA_LISTO: Vesto[] = [
    { name: "vestoVerdant", main: 0x184838, accent: 0xd8b068, interno: 0x103828 },
    { name: "vestoHearth", main: 0x584830, accent: 0xd8c8a0, interno: 0x302818 },
    { name: "vestoMist", main: 0xd8e0e0, accent: 0x889898, interno: 0xa8b8b8 },
    { name: "vestoEmber", main: 0x783828, accent: 0xe0a858, interno: 0x402018 },
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
    const fig = konstruiFiguron(VESTA_LISTO[npcoj.length % VESTA_LISTO.length]);
    const h = alteco(sX, sZ);
    fig.group.position.set(sX, h, sZ);
    fig.home.set(sX, h, sZ);
    fig.target.set(sX, h, sZ);
    fig.wait = Math.random() * 4;
    fig.rapido = 45/64 + Math.random() * 4/8;
    sceno.add(fig.group);
    npcoj.push(fig);
  }

  // ⟪ Interna sistemo 📃 ⟫
  const internaSistemo: InternaSistemo = kreiInternanSistemon();

  return {
    konstruSpecoj, kolizioj, selektajxoj, konstruGrupoj,
    vojSpecimenoj, placajNodoj, riverData, lampSistemo,
    nebuloj, kanuoj, npcoj, internaSistemo, vojDifinoj, vojDuonLargho,
    NPCLOKOJ, VESTA_LISTO,
  };
}
