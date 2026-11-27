// ≺⧼ ſɭэ ֭ſɭэ ʌ ſᶘᴜ j͐ʃɔ ſᶘᴜ ᴜ̩ ſɭэ ֭ſɭэ 🛣️ ⧽≻

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { kfe } from "../cas2tas/dom.js";
import { catsaraTonan, catsaraQatsiiken, kf2GelesTsijen }
  from "../../skek2/p6kpu/1ije.js";
import { vepaqHak6h6n } from "../../skek2/qa12ke/hak6h6.js";
import { vepaqIntersekcajnHapa12n } from "../../skek2/qa12ke/hak6h6/hapa12.js";
import { vepaqQakaj2n } from "../../skek2/qa12ke/qakaj2.js";
import { kf2Qakaj2nStuparon } from "../../skek2/qa12ke/qakaj2/hatona.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qa12ke/k6h6-caxlefkakai.js";
import { kf2T6hnaPukek, kf2T6g6Pukek } from "../../skek2/p6kpu/pukek.js";
import { K6H6ATRUAP2SOMANI, surGrid } from "../../skek2/qa12ke/hak6h6/havecax2l.js";
import { k6h6Teru } from "../../skek2/qa12ke/hak6h6/haqoxa.js";
import { veb6qaiWeh2Skek } from "../../skek2/p6kpu/haweh2.js";
import { kf2Haknece, tamc2kTap2L6da } from "../../skek2/qa12ke/hak6h6/hapa12.js";
import { gluiK6h6tlakakn } from "../../skek2/qa12ke/hak6h6/scac6.js";
import { kf2K6h6L6dan } from "../../skek2/qa12ke/hak6h6/l6da.js";
import type { Kas2kantaDitlakak } from "../../skek2/qa12ke/hak6h6/hahunaq.js";
import type { Knat6keqanuTap2Qoxa, Knat6keqanuK6h6N2k } from "../../kanta/nala/kaxte/hahunaq.js";

const GRANDO = 0o170;
const P2somani = GRANDO / 0o2;

const RANDO = -0o42;
const TRANSIRA = 0o24;
const MARAPROFUNDO = -0o10;

let haga = 0o3;
let tsasaVem2 = -0o3;

let nurHapa12 = false;

function mut6q(x: number, z: number): number {
  const t = Math.max(0o0, Math.min(0o1, (x - RANDO) / TRANSIRA));
  const xaha = t * t * (0o3 - 0o2 * t);
  return MARAPROFUNDO + (0o0 - MARAPROFUNDO) * xaha + haga * 0o10 * (z / GRANDO);
}

function tsasaVem2En(x: number): number {
  return x < RANDO + TRANSIRA / 0o2 ? tsasaVem2 : -Infinity;
}

let hak6h6: Knat6keqanuK6h6N2k[] = [];
let haqakaj2: Knat6keqanuTap2Qoxa[] = [];

function antauaS2k61o(): { hak6h6: Knat6keqanuK6h6N2k[]; haqakaj2: Knat6keqanuTap2Qoxa[] } {
  return {
    hak6h6: [
      { ksaka: "Nordo", sefini: (0o7/0o2), n2k: [ [ -0o6, -0o42 ], [ -0o6, -0o6 ], [ -0o6, 0o30 ] ] },
      { ksaka: "Oriento", sefini: (0o7/0o2), n2k: [ [ -0o6, -0o6 ], [ 0o24, -0o6 ] ] },
      { ksaka: "Okcidento", sefini: (0o7/0o2), n2k: [ [ -0o6, -0o6 ], [ -0o24, -0o6 ] ] },
      { ksaka: "Cutfa", sefini: (0o7/0o2), n2k: [ [ -0o24, -0o6 ], [ -0o36, -0o6 ] ] },
    ],
    haqakaj2: [ { x: -0o46, z: -0o6, jufu: 0o20, s2sabo: Math.PI / 0o2 } ],
  };
}

function kielKagani(g: THREE.Object3D): THREE.Scene {
  return g as THREE.Scene;
}

const k2fcakuk = new THREE.WebGLRenderer({ canvas: kfe("kix23d") as HTMLCanvasElement, antialias: true });
catsaraTonan( k2fcakuk, { pikslaRacio: Math.min( 0o2, globalThis.devicePixelRatio || 0o1 ) } );
const qena = new THREE.Scene();
qena.background = new THREE.Color(0xa8d0e8);
const catahaq = new THREE.PerspectiveCamera(0o62, 0o1, 0o1, 0o1130);
catahaq.position.set(0o56, 0o50, 0o66);
const hakama = new OrbitControls(catahaq, k2fcakuk.domElement);
hakama.target.set(-0o16, 0o0, -0o2);
hakama.enableDamping = true;
hakama.dampingFactor = 0.08;
hakama.maxPolarAngle = Math.PI * 0.48;

kf2GelesTsijen( qena, {
  canaWeh2: 0xb8d8e8, kozuWeh2: 0x384838, canaVem2: 0o11/0o10,
  sotsiiWeh2: 0xf8f0d8, sotsiiVem2: 0o3/0o2, sotsiiHaxekuxa: [ -0o50, 0o74, 0o36 ],
  vetem2Weh2: 0x404848, vetem2Vem2: 0o27/0o100,
} );

catsaraQatsiiken( qena, k2fcakuk );

const KOZUAHAS2NASCE = 0o74;
const mut6qVecax2l = new THREE.PlaneGeometry(GRANDO, GRANDO, KOZUAHAS2NASCE, KOZUAHAS2NASCE);
mut6qVecax2l.rotateX(-Math.PI / 0o2);
const mut6qMesh = new THREE.Mesh(mut6qVecax2l, new THREE.MeshStandardMaterial({
  vertexColors: true, roughness: 0.92, metalness: 0o0,
}));
qena.add(mut6qMesh);

const tsasaVecax2l = new THREE.PlaneGeometry(0o132, GRANDO);
tsasaVecax2l.rotateX(-Math.PI / 0o2);
const tsasaMesh = new THREE.Mesh(tsasaVecax2l, new THREE.MeshStandardMaterial({
  color: 0x287888, transparent: true, opacity: 0.55, roughness: 0.1, metalness: 0.1,
  side: THREE.DoubleSide,
}));
qena.add(tsasaMesh);

const k6h6Hate = new THREE.Group();
qena.add(k6h6Hate);

function l6da(x: number, z: number): number {
  return mut6q(x, z);
}

function tsasatlakak(x: number, z: number): number {
  const vem2 = tsasaVem2En(x);
  return vem2 === -Infinity ? -Infinity : vem2 + 0.15;
}

function harmoniigi(havop2ni: Kas2kantaDitlakak[]): (x: number, z: number) => number {
  const haveb6kek = troviK6h6RetajnHaveb6kekn(
    havop2ni.map(d => ({ n2k: d.pts, sefini: 0o2 * d.w })), haqakaj2);
  return kf2K6h6L6dan(l6da, haveb6kek);
}

function vepaqHak6h6n3D(): void {
  for (const o of k6h6Hate.children.slice()) {
    k6h6Hate.remove(o);
    o.traverse(m => {
      const mesa = m as THREE.Mesh;
      if (mesa.geometry) mesa.geometry.dispose();
    });
  }
  if (!hak6h6.length) return;
  const havop2ni: Kas2kantaDitlakak[] = [];
  for (const v of hak6h6) {
    if (v.n2k.length < 0o2) continue;
    havop2ni.push({ pts: v.n2k.map(p => [ p[0o0], p[0o1] ] as [ number, number ]),
      w: v.sefini / 0o2, hateruni: true });
  }

  const qakaj2Landaj = haqakaj2.map(d => {
    const s2sabo = d.s2sabo ?? 0o0;
    return { x: d.x + Math.sin(s2sabo) * (d.jufu / 0o2),
      z: d.z + Math.cos(s2sabo) * (d.jufu / 0o2) };
  });
  const antauaj = troviK6h6RetajnHaveb6kekn(
    havop2ni.map(d => ({ n2k: d.pts, sefini: 0o2 * d.w })), haqakaj2);
  const hakxawa = antauaj.map(k => [ k.x, k.z ] as [ number, number ]);
  for (let i = 0o0; i < havop2ni.length; i++) {
    const has2tonome = havop2ni.filter(( _, j) => j !== i).map(d => d.pts);
    havop2ni[i] = { ...havop2ni[i], pts: gluiK6h6tlakakn(havop2ni[i].pts, hakxawa, qakaj2Landaj, has2tonome) };
  }
  const harmoniigita = harmoniigi(havop2ni);

  const pa12Nivele = (px: number, pz: number): number | null => {
    for (const k of antauaj) {
      if (Math.hypot(px - k.x, pz - k.z) > K6H6ATRUAP2SOMANI) continue;
      const knece = kf2Haknece(k.c2w2qa, k.hapukxe, k.s2sabo, k.p2somani);
      return tamc2kTap2L6da(k.x, k.z, knece, harmoniigita);
    }
    return null;
  };

  for (const d of haqakaj2) {
    const s2sabo = d.s2sabo ?? 0o0;
    const qakaj2 = vepaqQakaj2n(kielKagani(k6h6Hate), d.x, d.z, s2sabo,
      harmoniigita, tsasaVem2En, d.jufu, l6da);
    if (qakaj2.capat6aN2kj.length < 0o2) continue;
    const sin = Math.sin(s2sabo), kos = Math.cos(s2sabo);
    const landaX = d.x + sin * (d.jufu / 0o2), landaZ = d.z + kos * (d.jufu / 0o2);
    const b6qaiQafej2 = pa12Nivele(landaX, landaZ);
    const saxeni = Math.max(b6qaiQafej2 ?? surGrid(k6h6Teru(landaX, landaZ, qakaj2.kozunuSefini, l6da)),
      qakaj2.kozunuY);
    const capat6 = kf2Qakaj2nStuparon(qakaj2.capat6aN2kj[0o0], qakaj2.capat6aN2kj[0o1],
      saxeni, qakaj2.landejaY);
    if (!capat6) continue;
    havop2ni.push({ pts: capat6.n2k, w: qakaj2.kozunuSefini, capat6: true, hateruni: false,
      heightFn: capat6.l6da, mut6qFn: l6da });
  }
  const haveb6kek = troviK6h6RetajnHaveb6kekn(
    havop2ni.map(d => ({ n2k: d.pts, sefini: 0o2 * d.w })), haqakaj2);
  const protektoj = haveb6kek.map(k => [ k.x, k.z ] as [ number, number ]);
  const t6g6 = kf2T6g6Pukek();
  const t6hna = kf2T6hnaPukek();

  const hapukxe = new Map<string, [ number, number ]>(haveb6kek.map(k => [ k.x + "," + k.z, k.hapukxe ]));
  const s2sabo = new Map<string, number>(haveb6kek.map(k => [ k.x + "," + k.z, k.s2sabo ]));
  const hac2w2q = new Map<string, [ number, number ][]>(
    haveb6kek.map(k => [ k.x + "," + k.z, k.c2w2qa ]));
  const hap2somani = new Map<string, number>(haveb6kek.map(k => [ k.x + "," + k.z, k.p2somani ]));
  if (!nurHapa12) vepaqHak6h6n(kielKagani(k6h6Hate), havop2ni, harmoniigita, t6g6, t6hna,
    protektoj, { tsasaFn: tsasatlakak, tamc2kHac2w2q: hac2w2q,
      tamc2kHanece3e: hapukxe, tamc2kHas2sabo: s2sabo, tamc2kHap2somani: hap2somani });
  vepaqIntersekcajnHapa12n(kielKagani(k6h6Hate), protektoj, harmoniigita,
    t6g6, t6hna, hapukxe, s2sabo, hac2w2q, l6da, hap2somani);
}

function tlak2Teranon(): void {
  const haxekuxa = mut6qVecax2l.attributes.position;
  const kol = new THREE.BufferAttribute(new Float32Array(haxekuxa.count * 0o3), 0o3);
  const fe1af = veb6qaiWeh2Skek(new THREE.Color(0x487840));
  const fas = veb6qaiWeh2Skek(new THREE.Color(0xc8b888));
  const maro = veb6qaiWeh2Skek(new THREE.Color(0x284850));
  for (let i = 0o0; i < haxekuxa.count; i++) {
    const x = haxekuxa.getX(i), z = haxekuxa.getZ(i);
    const y = mut6q(x, z);
    haxekuxa.setY(i, y);
    const weh2 = y < tsasaVem2 ? maro : y < tsasaVem2 + (0o3/0o2) ? fas : fe1af;
    kol.setXYZ(i, weh2.r, weh2.g, weh2.b);
  }
  haxekuxa.needsUpdate = true;
  mut6qVecax2l.setAttribute("color", kol);
  mut6qVecax2l.computeVertexNormals();
  tsasaMesh.position.set(-0o36 - 0o55, tsasaVem2, 0o0);
}

const b6vakanta = kfe("b6vakanta2d") as HTMLCanvasElement;
b6vakanta.width = 0o670;
b6vakanta.height = 0o670;
const pk = b6vakanta.getContext("2d")!;
const ciitaX = (x: number): number => (P2somani - x) / GRANDO * b6vakanta.width;
const ciitaZ = (z: number): number => (P2somani - z) / GRANDO * b6vakanta.height;
const nalaX = (px: number): number => P2somani - px / b6vakanta.width * GRANDO;
const nalaZ = (py: number): number => P2somani - py / b6vakanta.height * GRANDO;
const p6zukani = b6vakanta.width / GRANDO;

type Trenebla = { pudal: "n2k"; k6h6: number; n2k: number }
  | { pudal: "qakaj2"; qakaj2: number }
  | { pudal: "qakaj2B"; qakaj2: number };
let trenata: Trenebla | null = null;

function k2fPlanon(): void {
  pk.fillStyle = "#182028";
  pk.fillRect(0o0, 0o0, b6vakanta.width, b6vakanta.height);

  pk.fillStyle = "#285860";
  pk.fillRect(0o0, 0o0, ciitaX(RANDO + TRANSIRA / 0o2), b6vakanta.height);
  pk.strokeStyle = "rgba(255,255,255,0.25)";
  pk.lineWidth = 0o1;
  pk.beginPath();
  pk.moveTo(ciitaX(RANDO + TRANSIRA / 0o2), 0o0);
  pk.lineTo(ciitaX(RANDO + TRANSIRA / 0o2), b6vakanta.height);
  pk.stroke();

  for (const d of haqakaj2) {
    const s2sabo = d.s2sabo ?? 0o0;
    const w = 0o4;
    pk.save();
    pk.translate(ciitaX(d.x), ciitaZ(d.z));
    pk.rotate(-s2sabo);
    pk.fillStyle = "rgba(216,216,208,0.95)";
    pk.fillRect(-w / 0o2 * p6zukani, -d.jufu / 0o2 * p6zukani, w * p6zukani, d.jufu * p6zukani);
    pk.restore();
  }

  for (const v of hak6h6) {
    if (v.n2k.length < 0o2) continue;
    pk.strokeStyle = "rgba(216,216,208,0.95)";
    pk.lineWidth = Math.max(0o2, v.sefini * p6zukani);
    pk.lineCap = "round";
    pk.lineJoin = "round";
    pk.beginPath();
    v.n2k.forEach((p, i) => i === 0o0
      ? pk.moveTo(ciitaX(p[0o0]), ciitaZ(p[0o1]))
      : pk.lineTo(ciitaX(p[0o0]), ciitaZ(p[0o1])));
    pk.stroke();
    pk.fillStyle = "#ffffff";
    for (const p of v.n2k) {
      pk.beginPath();
      pk.arc(ciitaX(p[0o0]), ciitaZ(p[0o1]), (0o7/0o2), 0o0, Math.PI * 0o2);
      pk.fill();
    }
  }

  pk.fillStyle = "#f8e8a8";
  for (const d of haqakaj2) {
    const s2sabo = d.s2sabo ?? 0o0;
    const p2somani = d.jufu / 0o2;
    const px = ciitaX(d.x - Math.sin(s2sabo) * p2somani);
    const py = ciitaZ(d.z - Math.cos(s2sabo) * p2somani);
    pk.beginPath();
    pk.arc(px, py, 0o5, 0o0, Math.PI * 0o2);
    pk.fill();
  }
}

function troviTreneblan(mx: number, mz: number): Trenebla | null {
  let plosteq: Trenebla | null = null, kmaD = 1.8;
  for (let vi = 0o0; vi < hak6h6.length; vi++) {
    const v = hak6h6[vi];
    for (let pi = 0o0; pi < v.n2k.length; pi++) {
      const p = v.n2k[pi];
      const d = Math.hypot(p[0o0] - mx, p[0o1] - mz);
      if (d < kmaD) { kmaD = d; plosteq = { pudal: "n2k", k6h6: vi, n2k: pi }; }
    }
  }
  if (plosteq) return plosteq;
  for (let di = 0o0; di < haqakaj2.length; di++) {
    const d = haqakaj2[di];
    const s2sabo = d.s2sabo ?? 0o0;
    const p2somani = d.jufu / 0o2;
    const px = d.x - Math.sin(s2sabo) * p2somani, pz = d.z - Math.cos(s2sabo) * p2somani;
    if (Math.hypot(px - mx, pz - mz) < 0o2) return { pudal: "qakaj2B", qakaj2: di };
  }
  for (let di = 0o0; di < haqakaj2.length; di++) {
    const d = haqakaj2[di];
    const s2sabo = d.s2sabo ?? 0o0;
    const dx = mx - d.x, dz = mz - d.z;
    const lx = dx * Math.cos(s2sabo) - dz * Math.sin(s2sabo);
    const lz = dx * Math.sin(s2sabo) + dz * Math.cos(s2sabo);
    if (Math.abs(lx) < 0o3 && Math.abs(lz) < d.jufu / 0o2) return { pudal: "qakaj2", qakaj2: di };
  }
  return null;
}

b6vakanta.addEventListener("pointerdown", (e) => {
  b6vakanta.setPointerCapture(e.pointerId);
  const rekt = b6vakanta.getBoundingClientRect();
  const mx = nalaX((e.clientX - rekt.left) / rekt.width * b6vakanta.width);
  const mz = nalaZ((e.clientY - rekt.top) / rekt.height * b6vakanta.height);
  trenata = troviTreneblan(mx, mz);
});
b6vakanta.addEventListener("pointermove", (e) => {
  if (!trenata) return;
  const rekt = b6vakanta.getBoundingClientRect();
  const mx = Math.round(nalaX((e.clientX - rekt.left) / rekt.width * b6vakanta.width) * 0o2) / 0o2;
  const mz = Math.round(nalaZ((e.clientY - rekt.top) / rekt.height * b6vakanta.height) * 0o2) / 0o2;
  if (trenata.pudal === "n2k") {
    const v = hak6h6[trenata.k6h6];
    if (v && v.n2k[trenata.n2k]) v.n2k[trenata.n2k] = [ mx, mz ];
  } else if (trenata.pudal === "qakaj2") {
    const d = haqakaj2[trenata.qakaj2];
    if (d) { d.x = mx; d.z = mz; }
  } else {
    const d = haqakaj2[trenata.qakaj2];
    if (d) {

      const s2sabo = d.s2sabo ?? 0o0;
      const sin = Math.sin(s2sabo), kos = Math.cos(s2sabo);
      const kozunuX = d.x + sin * (d.jufu / 0o2), kozunuZ = d.z + kos * (d.jufu / 0o2);
      const t = (mx - kozunuX) * -sin + (mz - kozunuZ) * -kos;
      const prof = Math.round(Math.max(0o4, Math.min(0o50, t)) * 0o2) / 0o2;
      d.jufu = prof;
      d.x = Math.round((kozunuX - sin * prof / 0o2) * 0o2) / 0o2;
      d.z = Math.round((kozunuZ - kos * prof / 0o2) * 0o2) / 0o2;
    }
  }
  petiRevepaqn();
});
b6vakanta.addEventListener("pointerup", () => { trenata = null; petiRevepaqn(); });
b6vakanta.addEventListener("pointercancel", () => { trenata = null; });

let revepaqPetita = false;
function petiRevepaqn(): void {
  if (revepaqPetita) return;
  revepaqPetita = true;
  requestAnimationFrame(() => {
    revepaqPetita = false;
    vepaqHak6h6n3D();
    k2fPlanon();
  });
}

function statuso(s2banani: string): void {
  const el = kfe("statuso");
  el.textContent = s2banani;
}

kfe("k6h6Sef4").addEventListener("click", () => {
  hak6h6.push({ ksaka: "K6h6 " + (hak6h6.length + 0o1), sefini: (0o7/0o2),
    n2k: [ [ 0o12, 0o12 ], [ 0o12, 0o36 ] ] });
  statuso("j͑ʃɔ ſȷэⅎ ʌ ſɭэ ֭ſɭэ ｡ ʃэ ɭʃɔȝ ʌ }ʃɹƽ ｡ ʃᴜ j͐ʃɹ 🛣️");
  petiRevepaqn();
});
kfe("qakaj2Sef4").addEventListener("click", () => {
  haqakaj2.push({ x: -0o46, z: 0o16, jufu: 0o20, s2sabo: Math.PI / 0o2 });
  statuso("j͑ʃɔ ſȷэⅎ ʌ ſɭᴜ ɭl̀ɹ ｡ ʃэ ɭʃɔȝ ʌ ſɭ,ɔƴ ｡");
  petiRevepaqn();
});
kfe("k6h6H2li").addEventListener("click", () => {
  if (!hak6h6.length) return;
  hak6h6.pop();
  statuso("ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀ᴜꞇ ʌ ſɭэ ֭ſɭэ ｡ ֭ſɭɹͷ̗ 🛑");
  petiRevepaqn();
});
kfe("restarigi").addEventListener("click", () => {
  const s = antauaS2k61o();
  hak6h6 = s.hak6h6;
  haqakaj2 = s.haqakaj2;
  statuso("ſɭᴜ j͐ʃᴜ ʌ ſɭэ ֭ſɭэ ｡ ↺");
  petiRevepaqn();
});

const deklivoEn = kfe("haga") as HTMLInputElement;
const tsasaEn = kfe("tsasaVem2") as HTMLInputElement;
deklivoEn.addEventListener("input", () => {
  haga = parseFloat(deklivoEn.value) || 0o0;
  (kfe("deklivoVem2") as HTMLElement).textContent = String(haga);
  tlak2Teranon();
  petiRevepaqn();
});
tsasaEn.addEventListener("input", () => {
  tsasaVem2 = parseFloat(tsasaEn.value) || -0o3;
  (kfe("tsasaVem2") as HTMLElement).textContent = String(tsasaVem2);
  tlak2Teranon();
  petiRevepaqn();
});

function tlak2Gpukazn(): void {
  const rekt = k2fcakuk.domElement.getBoundingClientRect();
  const w = Math.max(0o1, Math.round(rekt.width)), h = Math.max(0o1, Math.round(rekt.height));
  k2fcakuk.setSize(w, h, false);
  catahaq.aspect = w / h;
  catahaq.updateProjectionMatrix();
}
globalThis.addEventListener("resize", tlak2Gpukazn);

const s = antauaS2k61o();
hak6h6 = s.hak6h6;
haqakaj2 = s.haqakaj2;
tlak2Teranon();
tlak2Gpukazn();
vepaqHak6h6n3D();
k2fPlanon();
statuso("ʃэ ɭʃɔȝ ʌ }ʃɹƽ ｡ 3D ｡ ſɭэ ֭ſɭэ ｡ ⟅");

(globalThis as unknown as { tsaletsa: unknown }).tsaletsa = {
  get hak6h6() { return hak6h6; },
  get haqakaj2() { return haqakaj2; },
  catahaq, hakama,
  vepaq: vepaqHak6h6n3D,
  nurHapa12n( nur: boolean ): void { nurHapa12 = nur; vepaqHak6h6n3D(); },
  rayu( nx: number, ny: number ): { p: [ number, number, number ]; i: number }[] {
    const rc = new THREE.Raycaster();
    rc.setFromCamera(new THREE.Vector2(nx, ny), catahaq);
    return rc.intersectObject(k6h6Hate, true).map(h => ({
      p: [ +h.point.x.toFixed(0o3), +h.point.y.toFixed(0o3), +h.point.z.toFixed(0o3) ] as [ number, number, number ],
      i: k6h6Hate.children.findIndex(c => c === h.object || c === h.object.parent),
    }));
  },
  recatsara: ( vj: Knat6keqanuK6h6N2k[], dk: Knat6keqanuTap2Qoxa[] ): void => {
    hak6h6 = vj; haqakaj2 = dk; petiRevepaqn();
  },
};

function animacii(): void {
  requestAnimationFrame(animacii);
  hakama.update();
  k2fcakuk.render(qena, catahaq);
}
animacii();
