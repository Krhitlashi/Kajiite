// ≺⧼ ſɭэ ֭ſɭэ ʌ j͐ʃɹ ŋᷠɔ ʌ ſ͕ɭɔ }ʃᴜ 🛣️ ⧽≻
// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
// ( ſɭɜ ſɭ,w , ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
// ( ſɭэ ſɭᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { catsaraTonan, catsaraQatsiiken, kf2GelesTsijen }
  from "../../skek2/x2x2q/tsije.js";
import { vepaqHak6h6n } from "../../skek2/qatsiike/hak6h6.js";
import { vepaqIntersekcajnHapa12n } from "../../skek2/qatsiike/hak6h6/hapa12.js";
import { vepaqQakaj2n } from "../../skek2/qatsiike/qakaj2.js";
import { kf2Qakaj2nStuparon } from "../../skek2/qatsiike/qakaj2/hatona.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { kf2T6hnaPukek, kf2T6g6Pukek } from "../../skek2/x2x2q/pukek.js";
import { K6H6ATRUAP2SOMANI, surGrid } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { k6h6Teru } from "../../skek2/qatsiike/hak6h6/haqoxa.js";
import { veb6qaiWeh2Skek } from "../../skek2/x2x2q/haweh2.js";
import { kf2Haknece, tamc2kTap2L6da } from "../../skek2/qatsiike/hak6h6/hapa12.js";
import { gluiK6h6tlakakn } from "../../skek2/qatsiike/hak6h6/scac6.js";
import { kf2K6h6L6dan } from "../../skek2/qatsiike/hak6h6/l6da.js";
import type { Kas2kantaDitlakak } from "../../skek2/qatsiike/hak6h6/hahunaq.js";
import type { Knat6keqanuTap2Qoxa, Knat6keqanuK6h6N2k } from "../../kanta/nala/kaxte/hahunaq.js";

// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫ , ſɭᴜ ſןᴜ , ꞙɭı ,
const GRANDO = 0o170;
const P2somani = GRANDO / 2;
// ⟨ ſɭɜ ſɭ,w , ꞙɭɿ , 📃 ⟩
const RANDO = -0o42;
const TRANSIRA = 0o24;
const MARAPROFUNDO = -0o10;

let haga = 3;
let tsasaVem2 = -3;
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
let nurHapa12 = false;

/* ſɭɜ ſɭ,w , ꞙɭц ,
   ផ្អៀងតាម −z ដើម្បីឱ្យចំណុចភ្ជាប់មានកម្រិតខុសគ្នា ។
    @param x ( number ) - ពិភពលោក x ។
    @param z ( number ) - ពិភពលោក z ។
@returns kម្ពស់ ( number )។ */
function t6lima(x: number, z: number): number {
  const t = Math.max(0, Math.min(1, (x - RANDO) / TRANSIRA));
  const xaha = t * t * (3 - 2 * t);
  return MARAPROFUNDO + (0 - MARAPROFUNDO) * xaha + haga * 0o10 * (z / GRANDO);
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭэ ,
    @returns kម្រិត ( number )។ */
function tsasaVem2En(x: number): number {
  return x < RANDO + TRANSIRA / 2 ? tsasaVem2 : -Infinity;
}

// ⟪ ſɭэ ᶗ‹ , ꞙɭɩ , 📃 ⟫ , ſɭэ ֭ſɭэ , ꞙɭɿ ,
let hak6h6: Knat6keqanuK6h6N2k[] = [];
let haqakaj2: Knat6keqanuTap2Qoxa[] = [];

function antauaS2k61o(): { hak6h6: Knat6keqanuK6h6N2k[]; haqakaj2: Knat6keqanuTap2Qoxa[] } {
  return {
    hak6h6: [
      { ksaka: "Nordo", sefini: 3.5, n2k: [ [ -6, -0o42 ], [ -6, -6 ], [ -6, 0o30 ] ] },
      { ksaka: "Oriento", sefini: 3.5, n2k: [ [ -6, -6 ], [ 0o24, -6 ] ] },
      { ksaka: "Okcidento", sefini: 3.5, n2k: [ [ -6, -6 ], [ -0o24, -6 ] ] },
      { ksaka: "Cutfa", sefini: 3.5, n2k: [ [ -0o24, -6 ], [ -0o36, -6 ] ] },
    ],
    haqakaj2: [ { x: -0o46, z: -6, jufu: 0o20, s2sabo: Math.PI / 2 } ],
  };
}

/* ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param g ( THREE.Object3D ) - ក្រុម ។
@returns ឆាក ( THREE.Scene )។ */
function kielKagani(g: THREE.Object3D): THREE.Scene {
  return g as THREE.Scene;
}

// ⟪ ſɭᴜ ſןᴜ , 🎥 ⟫
// ⟨ ſɭэ ſɭw , ꞙɭı , 📃 ⟩
const k2fcakuk = new THREE.WebGLRenderer({ canvas: kfe("kix23d") as HTMLCanvasElement, antialias: true });
catsaraTonan( k2fcakuk, { pikslaRacio: Math.min( 0o2, globalThis.devicePixelRatio || 1 ) } );
const qena = new THREE.Scene();
qena.background = new THREE.Color(0xa8d0e8);
const catahaq = new THREE.PerspectiveCamera(0o62, 1, 1, 0o1130);
catahaq.position.set(0o56, 0o50, 0o66);
const hakama = new OrbitControls(catahaq, k2fcakuk.domElement);
hakama.target.set(-0o16, 0, -2);
hakama.enableDamping = true;
hakama.dampingFactor = 0.08;
hakama.maxPolarAngle = Math.PI * 0.48;
// ⟨ ſᶘɹ ſɭᴜ , ſɭэ ſɭw , 📃 ⟩
kf2GelesTsijen( qena, {
  canaWeh2: 0xb8d8e8, kozuWeh2: 0x384838, canaVem2: 0o11/0o10,
  sotsiiWeh2: 0xf8f0d8, sotsiiVem2: 0o3/0o2, sotsiiHaxekuxa: [ -0o50, 0o74, 0o36 ],
  vetem2Weh2: 0x404848, vetem2Vem2: 0o27/0o100,
} );
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı , 📃 ⟩
catsaraQatsiiken( qena, k2fcakuk );

// ⟪ ſɭɜ ſɭ,w , 🏔️ ⟫ , ſɭᴜ ſןᴜ , ꞙɭı ,
const KOZUAHAS2NASCE = 0o74;
const t6limaVecax2l = new THREE.PlaneGeometry(GRANDO, GRANDO, KOZUAHAS2NASCE, KOZUAHAS2NASCE);
t6limaVecax2l.rotateX(-Math.PI / 2);
const t6limaMesh = new THREE.Mesh(t6limaVecax2l, new THREE.MeshStandardMaterial({
  vertexColors: true, roughness: 0.92, metalness: 0,
}));
qena.add(t6limaMesh);

// ⟪ ſᶘᴜ j͑ʃᴜ , 🌊 ⟫ , ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
const tsasaVecax2l = new THREE.PlaneGeometry(0o132, GRANDO);
tsasaVecax2l.rotateX(-Math.PI / 2);
const tsasaMesh = new THREE.Mesh(tsasaVecax2l, new THREE.MeshStandardMaterial({
  color: 0x287888, transparent: true, opacity: 0.55, roughness: 0.1, metalness: 0.1,
  side: THREE.DoubleSide,
}));
qena.add(tsasaMesh);

// ⟪ ſɭэ ֭ſɭэ , ꞙɭɿ , 📃 ⟫ , ſɭᴜ ſןᴜ , ꞙɭц ,
const k6h6Hate = new THREE.Group();
qena.add(k6h6Hate);

/* ſɭɜ ſɭ,w , ꞙɭɿ , */
function l6da(x: number, z: number): number {
  return t6lima(x, z);
}

/* ſᶘᴜ j͑ʃᴜ , ꞙɭɿ , */
function tsasatlakak(x: number, z: number): number {
  const vem2 = tsasaVem2En(x);
  return vem2 === -Infinity ? -Infinity : vem2 + 0.15;
}

// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩

// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫
// ⟨ ſɭɜ ſɭ,w , ꞙɭı , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,

/* ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param havop2ni ( Kas2kantaDitlakak[] ) - ផ្លូវទាំងអស់ ។
@returns harmoniigita ( ( x , z ) => number ) - កម្ពស់ផ្លូវ ។ */
function harmoniigi(havop2ni: Kas2kantaDitlakak[]): (x: number, z: number) => number {
  const haveb6kek = troviK6h6RetajnHaveb6kekn(
    havop2ni.map(d => ({ n2k: d.pts, sefini: 2 * d.w })), haqakaj2);
  return kf2K6h6L6dan(l6da, haveb6kek);
}

/* ſɭᴜ ſןᴜ , ꞙɭц , */
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
    if (v.n2k.length < 2) continue;
    havop2ni.push({ pts: v.n2k.map(p => [ p[0], p[1] ] as [ number, number ]),
      w: v.sefini / 2, hateruni: true });
  }
// ⟪ ſɭэ ֭ſɭэ , 🧲 ⟫ , ſɭэ ֭ſɭэ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ꞙɭɿ ,
  const qakaj2Landaj = haqakaj2.map(d => {
    const s2sabo = d.s2sabo ?? 0;
    return { x: d.x + Math.sin(s2sabo) * (d.jufu / 2),
      z: d.z + Math.cos(s2sabo) * (d.jufu / 2) };
  });
  const antauaj = troviK6h6RetajnHaveb6kekn(
    havop2ni.map(d => ({ n2k: d.pts, sefini: 2 * d.w })), haqakaj2);
  const hakxawa = antauaj.map(k => [ k.x, k.z ] as [ number, number ]);
  for (let i = 0; i < havop2ni.length; i++) {
    const has2tonome = havop2ni.filter(( _, j) => j !== i).map(d => d.pts);
    havop2ni[i] = { ...havop2ni[i], pts: gluiK6h6tlakakn(havop2ni[i].pts, hakxawa, qakaj2Landaj, has2tonome) };
  }
  const harmoniigita = harmoniigi(havop2ni);
// ⟨ ſɭᴜ ſןᴜ , 📏 ⟩ , ſןɔ˞ᴜƴ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
  const pa12Nivele = (px: number, pz: number): number | null => {
    for (const k of antauaj) {
      if (Math.hypot(px - k.x, pz - k.z) > K6H6ATRUAP2SOMANI) continue;
      const knece = kf2Haknece(k.c2w2qa, k.hapukxe, k.s2sabo, k.p2somani);
      return tamc2kTap2L6da(k.x, k.z, knece, harmoniigita);
    }
    return null;
  };
// ⟪ ſןɔ˞ᴜƴ , ⚓ ⟫ , ſןɔ˞ᴜƴ , ꞙɭı ,
// ſןɔ˞ᴜƴ , ſɭэ ֭ſɭэ , ꞙɭɿ ,
  for (const d of haqakaj2) {
    const s2sabo = d.s2sabo ?? 0;
    const qakaj2 = vepaqQakaj2n(kielKagani(k6h6Hate), d.x, d.z, s2sabo,
      harmoniigita, tsasaVem2En, d.jufu, l6da);
    if (qakaj2.capat6aN2kj.length < 2) continue;
    const sin = Math.sin(s2sabo), kos = Math.cos(s2sabo);
    const landaX = d.x + sin * (d.jufu / 2), landaZ = d.z + kos * (d.jufu / 2);
    const b6qaiQafej2 = pa12Nivele(landaX, landaZ);
    const saxeni = Math.max(b6qaiQafej2 ?? surGrid(k6h6Teru(landaX, landaZ, qakaj2.kozunuSefini, l6da)),
      qakaj2.kozunuY);
    const capat6 = kf2Qakaj2nStuparon(qakaj2.capat6aN2kj[0], qakaj2.capat6aN2kj[1],
      saxeni, qakaj2.landejaY);
    if (!capat6) continue;
    havop2ni.push({ pts: capat6.n2k, w: qakaj2.kozunuSefini, capat6: true, hateruni: false,
      heightFn: capat6.l6da, t6limaFn: l6da });
  }
  const haveb6kek = troviK6h6RetajnHaveb6kekn(
    havop2ni.map(d => ({ n2k: d.pts, sefini: 2 * d.w })), haqakaj2);
  const protektoj = haveb6kek.map(k => [ k.x, k.z ] as [ number, number ]);
  const t6g6 = kf2T6g6Pukek();
  const t6hna = kf2T6hnaPukek();
// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
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

// ⟪ ſɭɜ ſɭ,w , 🏔️ ⟫ , ſɭᴜ ſןᴜ , ꞙɭı ,
function tlak2Teranon(): void {
  const haxekuxa = t6limaVecax2l.attributes.position;
  const kol = new THREE.BufferAttribute(new Float32Array(haxekuxa.count * 3), 3);
  const fe1af = veb6qaiWeh2Skek(new THREE.Color(0x4f7a42));
  const fas = veb6qaiWeh2Skek(new THREE.Color(0xc8b888));
  const maro = veb6qaiWeh2Skek(new THREE.Color(0x2c4a50));
  for (let i = 0; i < haxekuxa.count; i++) {
    const x = haxekuxa.getX(i), z = haxekuxa.getZ(i);
    const y = t6lima(x, z);
    haxekuxa.setY(i, y);
    const weh2 = y < tsasaVem2 ? maro : y < tsasaVem2 + 1.5 ? fas : fe1af;
    kol.setXYZ(i, weh2.r, weh2.g, weh2.b);
  }
  haxekuxa.needsUpdate = true;
  t6limaVecax2l.setAttribute("color", kol);
  t6limaVecax2l.computeVertexNormals();
  tsasaMesh.position.set(-0o36 - 0o55, tsasaVem2, 0);
}

// ⟪ ſɭᴜ ſןᴜ , 🗺️ ⟫ , ſɭэ ֭ſɭэ , ꞙɭɿ ,
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
  pk.fillRect(0, 0, b6vakanta.width, b6vakanta.height);
// ſᶘᴜ j͑ʃᴜ , ſɭɜ ſɭ,w ,
  pk.fillStyle = "#285860";
  pk.fillRect(0, 0, ciitaX(RANDO + TRANSIRA / 2), b6vakanta.height);
  pk.strokeStyle = "rgba(255,255,255,0.25)";
  pk.lineWidth = 1;
  pk.beginPath();
  pk.moveTo(ciitaX(RANDO + TRANSIRA / 2), 0);
  pk.lineTo(ciitaX(RANDO + TRANSIRA / 2), b6vakanta.height);
  pk.stroke();
// ſןɔ˞ᴜƴ ,
  for (const d of haqakaj2) {
    const s2sabo = d.s2sabo ?? 0;
    const w = 4;
    pk.save();
    pk.translate(ciitaX(d.x), ciitaZ(d.z));
    pk.rotate(-s2sabo);
    pk.fillStyle = "rgba(216,216,208,0.95)";
    pk.fillRect(-w / 2 * p6zukani, -d.jufu / 2 * p6zukani, w * p6zukani, d.jufu * p6zukani);
    pk.restore();
  }
// ſɭэ ֭ſɭэ ,
  for (const v of hak6h6) {
    if (v.n2k.length < 2) continue;
    pk.strokeStyle = "rgba(216,216,208,0.95)";
    pk.lineWidth = Math.max(2, v.sefini * p6zukani);
    pk.lineCap = "round";
    pk.lineJoin = "round";
    pk.beginPath();
    v.n2k.forEach((p, i) => i === 0
      ? pk.moveTo(ciitaX(p[0]), ciitaZ(p[1]))
      : pk.lineTo(ciitaX(p[0]), ciitaZ(p[1])));
    pk.stroke();
    pk.fillStyle = "#ffffff";
    for (const p of v.n2k) {
      pk.beginPath();
      pk.arc(ciitaX(p[0]), ciitaZ(p[1]), 3.5, 0, Math.PI * 2);
      pk.fill();
    }
  }
// ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ ,
  pk.fillStyle = "#f8e8a8";
  for (const d of haqakaj2) {
    const s2sabo = d.s2sabo ?? 0;
    const p2somani = d.jufu / 2;
    const px = ciitaX(d.x - Math.sin(s2sabo) * p2somani);
    const py = ciitaZ(d.z - Math.cos(s2sabo) * p2somani);
    pk.beginPath();
    pk.arc(px, py, 5, 0, Math.PI * 2);
    pk.fill();
  }
}

/* ſɭэ ſɭᴜ , ꞙɭı , */
function troviTreneblan(mx: number, mz: number): Trenebla | null {
  let plosteq: Trenebla | null = null, kmaD = 1.8;
  for (let vi = 0; vi < hak6h6.length; vi++) {
    const v = hak6h6[vi];
    for (let pi = 0; pi < v.n2k.length; pi++) {
      const p = v.n2k[pi];
      const d = Math.hypot(p[0] - mx, p[1] - mz);
      if (d < kmaD) { kmaD = d; plosteq = { pudal: "n2k", k6h6: vi, n2k: pi }; }
    }
  }
  if (plosteq) return plosteq;
  for (let di = 0; di < haqakaj2.length; di++) {
    const d = haqakaj2[di];
    const s2sabo = d.s2sabo ?? 0;
    const p2somani = d.jufu / 2;
    const px = d.x - Math.sin(s2sabo) * p2somani, pz = d.z - Math.cos(s2sabo) * p2somani;
    if (Math.hypot(px - mx, pz - mz) < 2) return { pudal: "qakaj2B", qakaj2: di };
  }
  for (let di = 0; di < haqakaj2.length; di++) {
    const d = haqakaj2[di];
    const s2sabo = d.s2sabo ?? 0;
    const dx = mx - d.x, dz = mz - d.z;
    const lx = dx * Math.cos(s2sabo) - dz * Math.sin(s2sabo);
    const lz = dx * Math.sin(s2sabo) + dz * Math.cos(s2sabo);
    if (Math.abs(lx) < 3 && Math.abs(lz) < d.jufu / 2) return { pudal: "qakaj2", qakaj2: di };
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
  const mx = Math.round(nalaX((e.clientX - rekt.left) / rekt.width * b6vakanta.width) * 2) / 2;
  const mz = Math.round(nalaZ((e.clientY - rekt.top) / rekt.height * b6vakanta.height) * 2) / 2;
  if (trenata.pudal === "n2k") {
    const v = hak6h6[trenata.k6h6];
    if (v && v.n2k[trenata.n2k]) v.n2k[trenata.n2k] = [ mx, mz ];
  } else if (trenata.pudal === "qakaj2") {
    const d = haqakaj2[trenata.qakaj2];
    if (d) { d.x = mx; d.z = mz; }
  } else {
    const d = haqakaj2[trenata.qakaj2];
    if (d) {
// ⟨ ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
      const s2sabo = d.s2sabo ?? 0;
      const sin = Math.sin(s2sabo), kos = Math.cos(s2sabo);
      const kozunuX = d.x + sin * (d.jufu / 2), kozunuZ = d.z + kos * (d.jufu / 2);
      const t = (mx - kozunuX) * -sin + (mz - kozunuZ) * -kos;
      const prof = Math.round(Math.max(4, Math.min(0o50, t)) * 2) / 2;
      d.jufu = prof;
      d.x = Math.round((kozunuX - sin * prof / 2) * 2) / 2;
      d.z = Math.round((kozunuZ - kos * prof / 2) * 2) / 2;
    }
  }
  petiRevepaqn();
});
b6vakanta.addEventListener("pointerup", () => { trenata = null; petiRevepaqn(); });
b6vakanta.addEventListener("pointercancel", () => { trenata = null; });

// ⟪ ſɭэ ſɭᴜ , 🏗️ ⟫ , ſɭэ ᶗ‹ , ꞙɭı ,
// ſɭэ ᶗ‹ , ꞙɭɿ ,
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

// ⟪ ſɭᴜ ſןᴜ , 🛠️ ⟫
kfe("k6h6Sef4").addEventListener("click", () => {
  hak6h6.push({ ksaka: "K6h6 " + (hak6h6.length + 1), sefini: 3.5,
    n2k: [ [ 0o12, 0o12 ], [ 0o12, 0o36 ] ] });
  statuso("ផ្លូវថ្មីនៅខាងស្តាំ ។ អូសចំណុចរបស់វាក្នុងផែនទីតូច ។");
  petiRevepaqn();
});
kfe("qakaj2Sef4").addEventListener("click", () => {
  haqakaj2.push({ x: -0o46, z: 0o16, jufu: 0o20, s2sabo: Math.PI / 2 });
  statuso("ចតុកោណថ្មីនៅឆ្នេរ ។ អូសកំពូលរបស់វាដើម្បីពង្រីក ។");
  petiRevepaqn();
});
kfe("k6h6H2li").addEventListener("click", () => {
  if (!hak6h6.length) return;
  hak6h6.pop();
  statuso("បានលុបផ្លូវចុងក្រោយ ។");
  petiRevepaqn();
});
kfe("restarigi").addEventListener("click", () => {
  const s = antauaS2k61o();
  hak6h6 = s.hak6h6;
  haqakaj2 = s.haqakaj2;
  statuso("បានដាក់ដើមវិញ ។");
  petiRevepaqn();
});

// ⟪ ſɭɜ ſɭ,w , 🏔️ ⟫ , ſɭэ ֭ſɭэ , ꞙɭı ,
const deklivoEn = kfe("haga") as HTMLInputElement;
const tsasaEn = kfe("tsasaVem2") as HTMLInputElement;
deklivoEn.addEventListener("input", () => {
  haga = parseFloat(deklivoEn.value) || 0;
  (kfe("deklivoVem2") as HTMLElement).textContent = String(haga);
  tlak2Teranon();
  petiRevepaqn();
});
tsasaEn.addEventListener("input", () => {
  tsasaVem2 = parseFloat(tsasaEn.value) || -3;
  (kfe("tsasaVem2") as HTMLElement).textContent = String(tsasaVem2);
  tlak2Teranon();
  petiRevepaqn();
});

// ⟪ ſɭᴜ ſןᴜ , 🎥 ⟫ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
function tlak2Gpukazn(): void {
  const rekt = k2fcakuk.domElement.getBoundingClientRect();
  const w = Math.max(1, Math.round(rekt.width)), h = Math.max(1, Math.round(rekt.height));
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
statuso("អូសចំណុចផ្លូវ ឬកំពូលកំពង់ ។ ផ្លូវ 3D សាងសង់ឡើងវិញភ្លាម ។");

// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩ , ſɭэ ֭ſɭэ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ꞙɭɿ ,
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
      p: [ +h.point.x.toFixed(3), +h.point.y.toFixed(3), +h.point.z.toFixed(3) ] as [ number, number, number ],
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

/* ſɭэ ᶗ‹ , ꞙɭı ,
    @param id ( string ) - លេខសម្គាល់ធាតុ ។
@returns ធាតុ ( HTMLElement )។ */
function kfe(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error("ធាតុ " + id + " មិនមានទេ");
  return el;
}
