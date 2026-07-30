// Urbo — city construction. buildings, roads, plazas, lamps, vegetation, fog, water, canoes
// Modular grid system — roads and building positions derived from grid parameters.
import * as THREE from "three";
import { generiSkriptanURL } from "../assets/skripto-rivelilo.js";
import { konstruiZiguraton, TIPARO, KonstruSpec } from "../assets/zigurato-konstruilo.js";
import { kreiNebulanTeksajxon } from "../assets/teksajxoj.js";
import { konstruiRiveron, RiverData } from "../assets/akvo.js";
import { metiArbojn, konstruiArbaron, konstruiFilikojn, konstruiLikenSxtonojn } from "../assets/vegetajxo.js";
import { konstruiVojojn, konstruiPlacojn, konstruiSpronon, aldoniIntersekcajnRondigojn, VojDifino } from "../assets/vojoj.js";
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
  //  Rectangular 7×5 city layout — perfectly symmetrical grid.
  //  Every row has the same 7 columns, every cell has a building.
  //  No null cells, no gaps — all blocks are uniform squares.
  //
  //  G = generic (domo/turo), N = manĝejo, Y = stacio, W = sanktejo
  //
  //       | G | G | G | G | G | G | G |   z=2 (top)
  //       | G | G | N | N | N | G | G |   z=1
  //       | G | Y | G | W | G | Y | G |   z=0 (center)
  //       | G | G | N | N | N | G | G |   z=-1
  //       | G | G | G | G | G | G | G |   z=-2 (bottom)
  // ═══════════════════════════════════════════════════════════
  type CellType = "domo" | "turo" | "manĝejo" | "stacio" | "sanktejo";

  // Building placement. [col, row, type] where world = (col*PASXO, row*PASXO), W at (0,0).
  // 7 cols × 5 rows = 31 buildings (4 corner edges removed). Mirrored across both axes.
  const LAYOUT: [number, number, CellType][] = [
    // Row 2 — top edge (corners removed)
    [-2, 2, "domo"], [-1, 2, "turo"], [0, 2, "domo"], [1, 2, "turo"], [2, 2, "domo"],
    // Row 1
    [-3, 1, "domo"], [-2, 1, "turo"], [-1, 1, "manĝejo"], [0, 1, "manĝejo"], [1, 1, "manĝejo"], [2, 1, "turo"], [3, 1, "domo"],
    // Row 0 — center
    [-3, 0, "domo"], [-2, 0, "stacio"], [-1, 0, "domo"], [0, 0, "sanktejo"], [1, 0, "domo"], [2, 0, "stacio"], [3, 0, "domo"],
    // Row -1
    [-3, -1, "domo"], [-2, -1, "turo"], [-1, -1, "manĝejo"], [0, -1, "manĝejo"], [1, -1, "manĝejo"], [2, -1, "turo"], [3, -1, "domo"],
    // Row -2 — bottom edge (corners removed)
    [-2, -2, "domo"], [-1, -2, "turo"], [0, -2, "domo"], [1, -2, "turo"], [2, -2, "domo"],
  ];

  const kolizioj: { x: number; z: number; r: number }[] = [];
  const PASXO = 24;

  // Build the city from layout cells
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

  // Set terrain height and collision for each building (roads not needed yet)
  konstruSpecoj.forEach(s => {
    s.h0 = alteco(s.x, s.z);
    kolizioj.push({ x: s.x, z: s.z, r: Math.hypot(s.w, s.d) / 2 + 4/8 });
  });

  const selektajxoj: THREE.Mesh[] = [];

  // ═══════════════════════════════════════════════════════════
  //  River
  // ═══════════════════════════════════════════════════════════
  const riverData = konstruiRiveron(sceno, riveroZ, akvoY, 84/8, -0o200, 0o200, 0o50);

  // ═══════════════════════════════════════════════════════════
  //  Docks — spur roads from dock positions down to the river
  // ═══════════════════════════════════════════════════════════
  const DOKO_KOORDINATOJ: [number, number][] = [
    [-0o52, -0o144], [0, -0o142], [0o52, -0o140],
  ];
  for (const [dx, dz] of DOKO_KOORDINATOJ) {
    const y = alteco(dx, dz);
    konstruiSpronon(dx, dz, dx, dz - 5, () => y, dioritaMaterialo, andezitaMaterialo, sceno);
  }

  // ═══════════════════════════════════════════════════════════
  //  Road network — individual square segments between intersections
  //  Each road segment is 28 long × roadWidth wide, forming a regular
  //  grid where every block is a 28×28 square.
  // ═══════════════════════════════════════════════════════════
  const vojDifinoj: VojDifino[] = [];

  // Collect all distinct columns and rows with non-null cells
  const colSet = new Set<number>(), rowSet = new Set<number>();
  for (const [c, r, t] of LAYOUT) {
    if (t !== null) { colSet.add(c); rowSet.add(r); }
  }
  const KOLOJ = [...colSet].sort((a, b) => a - b);
  const VICOJ = [...rowSet].sort((a, b) => a - b);

  // NS road positions (between adjacent columns)
  const RETO_X: number[] = [];
  for (let ci = 0; ci < KOLOJ.length - 1; ci++) {
    if (KOLOJ[ci + 1] - KOLOJ[ci] === 1) {
      RETO_X.push((KOLOJ[ci] + KOLOJ[ci + 1]) / 2 * PASXO);
    }
  }

  // EW road positions (between adjacent rows)
  const RETO_Z: number[] = [];
  for (let ri = 0; ri < VICOJ.length - 1; ri++) {
    if (VICOJ[ri + 1] - VICOJ[ri] === 1) {
      RETO_Z.push((VICOJ[ri] + VICOJ[ri + 1]) / 2 * PASXO);
    }
  }

  // Building rotation. face toward center along the dominant axis
  // (roads always lie between adjacent rows/columns, so facing center = facing nearest road)
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

  // Build a set of cells for quick lookup
  const hasCellAt = (c: number, r: number) =>
    LAYOUT.some(([lc, lr, lt]) => lc === c && lr === r && lt !== null);

  // For each EW road (between adjacent rows), create segments between NS roads
  for (const roadZ of RETO_Z) {
    const r1 = Math.round(roadZ / PASXO - 0.5);
    const r2 = Math.round(roadZ / PASXO + 0.5);
    // Find which NS roads intersect this EW road
    const intersecting: number[] = [];
    for (const rx of RETO_X) {
      const c1 = Math.round(rx / PASXO - 0.5);
      const c2 = Math.round(rx / PASXO + 0.5);
      if (hasCellAt(c1, r1) || hasCellAt(c1, r2) ||
          hasCellAt(c2, r1) || hasCellAt(c2, r2)) {
        intersecting.push(rx);
      }
    }
    if (intersecting.length < 2) continue;

    // Build segments ONLY between intersecting NS roads — no edge stubs
    const pts = [...intersecting].sort((a, b) => a - b);
    const w = 14/8;  // uniform 1.75 half-width
    for (let i = 0; i < pts.length - 1; i++) {
      const x1 = pts[i], x2 = pts[i + 1];
      if (Math.abs(x2 - x1) > 1/8) {
        vojDifinoj.push({ pts: [[x1, roadZ], [x2, roadZ]], w });
      }
    }
  }

  // For each NS road (between adjacent columns), create segments between EW roads
  for (const roadX of RETO_X) {
    const c1 = Math.round(roadX / PASXO - 0.5);
    const c2 = Math.round(roadX / PASXO + 0.5);
    // Find which EW roads intersect this NS road
    const intersecting: number[] = [];
    for (const rz of RETO_Z) {
      const r1 = Math.round(rz / PASXO - 0.5);
      const r2 = Math.round(rz / PASXO + 0.5);
      if (hasCellAt(c1, r1) || hasCellAt(c1, r2) ||
          hasCellAt(c2, r1) || hasCellAt(c2, r2)) {
        intersecting.push(rz);
      }
    }
    if (intersecting.length < 2) continue;

    // Build segments ONLY between intersecting EW roads — no edge stubs
    const pts = [...intersecting].sort((a, b) => a - b);
    const w = 14/8;  // uniform 1.75 half-width
    for (let i = 0; i < pts.length - 1; i++) {
      const z1 = pts[i], z2 = pts[i + 1];
      if (Math.abs(z2 - z1) > 1/8) {
        vojDifinoj.push({ pts: [[roadX, z1], [roadX, z2]], w });
      }
    }
  }

  // River road — follows the meandering river course below the city
  vojDifinoj.push({ pts: [[-0o124, -0o144], [-0o70, -0o150], [-0o34, -0o150], [0, -0o142], [0o34, -0o142], [0o70, -0o136], [0o124, -0o136]], w: 28/8 });

  // Road half-width function — uniform width for clean square blocks
  function vojDuonLargho(_g: number): number {
    return 14/8;  // uniform 1.75 half-width (total 3.5) for all roads
  }

  // ═══════════════════════════════════════════════════════════
  //  Spur roads — each building's door connects to the nearest road edge
  // ═══════════════════════════════════════════════════════════
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
      vojX = celX - signo * (duonL - 4/8);
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
      vojZ = celZ - signo * (duonL - 4/8);
    }

    if (Math.hypot(pordoX - vojX, pordoZ - vojZ) > 4/8) {
      konstruiSpronon(pordoX, pordoZ, vojX, vojZ, alteco, dioritaMaterialo, andezitaMaterialo, sceno);
    }
  }

  const vojSpecimenoj = konstruiVojojn(sceno, vojDifinoj, alteco, dioritaMaterialo, andezitaMaterialo);

  // ═══════════════════════════════════════════════════════════
  //  Plazas — at intersection points between EW and NS roads
  // ═══════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════
  //  Corner fillets (rounded intersections)
  // ═══════════════════════════════════════════════════════════
  const cxiujNodojSet = new Set<string>();
  const cxiujNodoj: [number, number][] = [];
  const aldoniNodon = (x: number, z: number) => {
    const k = `${x},${z}`;
    if (!cxiujNodojSet.has(k)) { cxiujNodojSet.add(k); cxiujNodoj.push([x, z]); }
  };
  for (const n of placajNodoj) aldoniNodon(n[0], n[1]);
  for (const def of vojDifinoj) {
    for (const idx of [0, def.pts.length - 1]) {
      const [px, pz] = def.pts[idx];
      if (Math.abs(pz - riveroZ(px)) < 0o17) continue;
      aldoniNodon(px, pz);
    }
  }
  aldoniIntersekcajnRondigojn(sceno, cxiujNodoj, alteco, vojDuonLargho, dioritaMaterialo, andezitaMaterialo);

  // ═══════════════════════════════════════════════════════════
  //  Lamps — at grid intersections and plaza edges
  // ═══════════════════════════════════════════════════════════
  const lampLokoj: { x: number; z: number; y: number }[] = [];
  const addLamp = (x: number, z: number) => {
    for (const s of konstruSpecoj) {
      const difX = Math.sin(s.rot || 0), difZ = Math.cos(s.rot || 0);
      const pordoX = s.x + difX * (s.d / 2 + 12/8), pordoZ = s.z + difZ * (s.d / 2 + 12/8);
      if (Math.hypot(x - pordoX, z - pordoZ) < 4) return;
      if (Math.hypot(x - s.x, z - s.z) < Math.max(s.w, s.d) / 2 + 12/8) return;
    }
    // Avoid placing lamps on top of existing lamps (within 2 units)
    for (const ekz of lampLokoj) {
      if (Math.hypot(x - ekz.x, z - ekz.z) < 2) return;
    }
    lampLokoj.push({ x, z, y: alteco(x, z) });
  };
  for (const [aX, aZ] of placajNodoj) {
    for (const [ox, oz] of [[-17/8, -17/8], [17/8, -17/8], [-17/8, 17/8], [17/8, 17/8]]) addLamp(aX + ox, aZ + oz);
  }
  for (const gx of RETO_X) {
    for (const gz of RETO_Z) {
      if (Math.abs(gz - riveroZ(gx)) < 0o14) continue;
      addLamp(gx + 19/8, gz + 19/8);
      addLamp(gx - 19/8, gz - 19/8);
    }
  }
  const lampSistemo = konstruiLampojn(sceno, lampLokoj, dioritaMaterialo, oraMaterialo);

  // ═══════════════════════════════════════════════════════════
  //  Vegetation
  // ═══════════════════════════════════════════════════════════
  const ekskluziviRiveron = (x: number, z: number) => Math.abs(z - riveroZ(x)) < 7;
  const ekskluziviVojojn = (x: number, z: number, m: number) => {
    for (const p of vojSpecimenoj) if (Math.hypot(x - p.x, z - p.z) < m) return true;
    return false;
  };
  const ekskluziviKonstruajxon = (x: number, z: number, m: number) => {
    for (const s of konstruSpecoj) if (Math.hypot(x - s.x, z - s.z) < s.w * 19/32 + m) return true;
    return false;
  };
  const arboj = metiArbojn(alteco, 0o230, 0o200, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon);
  konstruiArbaron(sceno, arboj);
  konstruiFilikojn(sceno, 0o250, alteco, arboj, vojSpecimenoj, ekskluziviRiveron);
  konstruiLikenSxtonojn(sceno, 0o60, alteco, ekskluziviRiveron);

  // ═══════════════════════════════════════════════════════════
  //  Fog sprites
  // ═══════════════════════════════════════════════════════════
  const nebulaTeksajxo = kreiNebulanTeksajxon();
  const nebuloj: THREE.Sprite[] = [];
  for (const [x, z, y, skalo, op] of [
    [-0o106, -0o106, 20/8, 0o50, 5/32], [-0o36, -0o110, 141/64, 0o54, 3/16],
    [0o24, -0o106, 179/64, 0o50, 5/32], [0o74, -0o104, 77/32, 0o44, 5/32],
    [-0o62, -0o55, 115/64, 0o36, 9/64], [-0o113, 0o36, 51/32, 0o32, 3/32],
    [0o106, -0o50, 115/64, 0o34, 3/32], [-0o74, 0o106, 12/8, 0o30, 3/32],
    [0o101, 0o106, 109/64, 0o32, 5/64], [-0o132, 0o12, 45/32, 0o26, 1/8],
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

  // ═══════════════════════════════════════════════════════════
  //  Canoes — shifted south for new river position
  // ═══════════════════════════════════════════════════════════
  const kanuoj: Kanoto[] = [];
  kanuoj.push(kreiKanoton(sceno, 0o52, -0o151, -Math.PI * 2/8, oraMaterialo, akvoY(0o52)));
  kanuoj.push(kreiKanoton(sceno, -0o52, -0o167, Math.PI * 2/8, oraMaterialo, akvoY(-0o52)));
  kanuoj.push(kreiKanoton(sceno, 0, -0o160, -Math.PI * 4/8, oraMaterialo, akvoY(0)));

  // ═══════════════════════════════════════════════════════════
  //  NPC setup — positioned along the diamond city's road network
  // ═══════════════════════════════════════════════════════════
  const VESTA_LISTO: Vesto[] = [
    { name: "vestoVerdant", main: 0x184838, accent: 0xd8b068, interno: 0x103828 },
    { name: "vestoHearth", main: 0x584830, accent: 0xd8c8a0, interno: 0x302818 },
    { name: "vestoMist", main: 0xd8e0e0, accent: 0x889898, interno: 0xa8b8b8 },
    { name: "vestoEmber", main: 0x783828, accent: 0xe0a858, interno: 0x402018 },
  ];

  // Generate NPC positions along road edges throughout the diamond layout
  const NPCLOKOJ: [number, number][] = [];
  const NPCLOKOJ_SET = new Set<string>();
  const addNPCLoc = (x: number, z: number) => {
    const rx = Math.round(x * 10) / 10, rz = Math.round(z * 10) / 10;
    const k = `${rx},${rz}`;
    if (!NPCLOKOJ_SET.has(k)) { NPCLOKOJ_SET.add(k); NPCLOKOJ.push([x, z]); }
  };
  // NPCs along EW road edges — one offset north and south of each EW road
  for (const rz of RETO_Z) {
    for (const rx of RETO_X) {
      const ox = 4;
      addNPCLoc(rx + ox, rz - 4);
      addNPCLoc(rx - ox, rz - 4);
      addNPCLoc(rx + ox, rz + 4);
      addNPCLoc(rx - ox, rz + 4);
    }
  }
  // Extra NPCs along the outer road edges
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

  // ═══════════════════════════════════════════════════════════
  //  Interior system
  // ═══════════════════════════════════════════════════════════
  const internaSistemo: InternaSistemo = kreiInternanSistemon();

  return {
    konstruSpecoj, kolizioj, selektajxoj, konstruGrupoj,
    vojSpecimenoj, placajNodoj, riverData, lampSistemo,
    nebuloj, kanuoj, npcoj, internaSistemo, vojDifinoj, vojDuonLargho,
    NPCLOKOJ, VESTA_LISTO,
  };
}
