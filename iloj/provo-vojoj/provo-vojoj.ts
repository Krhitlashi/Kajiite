// ≺⧼ ឆាកសាកល្បងផ្លូវ 🛣️ ⧽≻
// ⟨ ហេតុអ្វីឆាកតូច 📃 ⟩ គឺការសាកល្បងផ្លូវ 3D ជាធម្មតាត្រូវការផ្ទុកពិភពលោកទាំងមូល
// ( ដី ទឹក ទីក្រុង ) ដែលយឺតណាស់ ។ ឆាកនេះប្រើឧបករណ៍សាងសង់ពិតរបស់ហ្គេម
// ( konstruiVojojn , konstruiIntersekcajnPlatojn , konstruiDokon ) លើដីតូចមួយ
// ដែលមានឆ្នេរ និងទឹក , ដូច្នេះចានភ្ជាប់ ជណ្តើរកំពង់ និងកម្ពស់ផ្លូវ
// អាចមើលឃើញភ្លាម ។
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { konstruiIntersekcajnPlatojn } from "../../eskekoj/medio/vojoj/platoj.js";
import { konstruiDokon } from "../../eskekoj/medio/doko.js";
import { kreiStuparanAlton, kreiStuparajnPunktojn } from "../../eskekoj/medio/doko/stuparo.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { kreiAndezitanMaterialon, kreiDioritanMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { STUPA_RISERO, VOJA_BORDA_LARĜO, VOJA_SUPRO_LEVIGXO,
  surGrid } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { gluiVojaFinon } from "../../kantaoj/mondo/urbo/gluado.js";
import { kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import type { VojDifino } from "../../eskekoj/medio/vojoj/tipoj.js";
import type { SkulptaPlatformo, SkulptaVojo } from "../../kantaoj/mondo/urbo/tipoj.js";

// ⟪ ព្រំដែនឆាក 📏 ⟫ ។ ឆាកតូចដែលមានឆ្នេរនៅខាងលិច ( −x ) ។
const GRANDO = 120;
const DUONO = GRANDO / 2;
// ⟨ ឆ្នេរ ៖ ដីនៅ x > −0o42 , សមុទ្រនៅខាងឆ្វេង ។ 📃 ⟩
const RANDO = -34;
const TRANSIRA = 20;
const MARA_PROFUNDO = -8;

let deklivo = 0;
let akvaNivelo = -3;
// ⟨ សាកល្បងចានភ្ជាប់តែមួយ 📃 ⟩ ៖ លាក់ផ្លូវដើម្បីមើលចានភ្ជាប់ឯករាជ្យ ។
let nurPlatoj = false;

/* កម្ពស់ដីនៃឆាកសាកល្បង ។ ដីចុះទៅសមុទ្រនៅខាងលិច , ហើយជម្រាល ( deklivo )
   ផ្អៀងតាម −z ដើម្បីឱ្យចំណុចភ្ជាប់មានកម្រិតខុសគ្នា ។
    @param x ( number ) - ពិភពលោក x ។
    @param z ( number ) - ពិភពលោក z ។
@returns kម្ពស់ ( number )។ */
function grundo(x: number, z: number): number {
  const t = Math.max(0, Math.min(1, (x - RANDO) / TRANSIRA));
  const glata = t * t * (3 - 2 * t);
  return MARA_PROFUNDO + (0 - MARA_PROFUNDO) * glata + deklivo * (z / GRANDO);
}
/* កម្រិតទឹក , ឬ −Infinity បើគ្មានទឹក ។ ទឹកមានតែខាងលិចឆ្នេរ ។
    @returns kម្រិត ( number )។ */
function akvaNiveloEn(x: number): number {
  return x < RANDO + TRANSIRA / 2 ? akvaNivelo : -Infinity;
}

// ⟪ ទិន្នន័យដែលកែបាន 📃 ⟫ ។ ផ្លូវ និងកំពង់តូចៗ , ដូចទិន្នន័យរបស់កម្មវិធីកែ ។
let vojoj: SkulptaVojo[] = [];
let dokoj: SkulptaPlatformo[] = [];

function antauaStato(): { vojoj: SkulptaVojo[]; dokoj: SkulptaPlatformo[] } {
  return {
    vojoj: [
      { nomo: "Nordo", larĝo: 3.5, punktoj: [ [ -6, -34 ], [ -6, -6 ], [ -6, 24 ] ] },
      { nomo: "Oriento", larĝo: 3.5, punktoj: [ [ -6, -6 ], [ 20, -6 ] ] },
      { nomo: "Okcidento", larĝo: 3.5, punktoj: [ [ -6, -6 ], [ -20, -6 ] ] },
      { nomo: "Kajo", larĝo: 3.5, punktoj: [ [ -20, -6 ], [ -30, -6 ] ] },
    ],
    dokoj: [ { x: -38, z: -6, profundo: 16, rotacio: Math.PI / 2 } ],
  };
}

/* ក្រុមអាចប្រើជាឆាក ៖ ឧបករណ៍សាងសង់របស់ហ្គេមប្រកាសឆាក , រីឯឧបករណ៍ផ្តល់ក្រុម ។
    @param g ( THREE.Object3D ) - ក្រុម ។
@returns ឆាក ( THREE.Scene )។ */
function kielSceno(g: THREE.Object3D): THREE.Scene {
  return g as THREE.Scene;
}

// ⟪ ឆាក 3D 🎥 ⟫
const bildilo = new THREE.WebGLRenderer({ canvas: elemento("vido3d") as HTMLCanvasElement, antialias: true });
bildilo.setPixelRatio(Math.min(2, globalThis.devicePixelRatio || 1));
const sceno = new THREE.Scene();
sceno.background = new THREE.Color(0xa8d0e8);
const fotilo = new THREE.PerspectiveCamera(50, 1, 1, 600);
fotilo.position.set(46, 40, 54);
const regiloj = new OrbitControls(fotilo, bildilo.domElement);
regiloj.target.set(-14, 0, -2);
regiloj.enableDamping = true;
regiloj.dampingFactor = 0.08;
regiloj.maxPolarAngle = Math.PI * 0.48;
// ពន្លឺ គឺដូចទិដ្ឋភាព 3D របស់កម្មវិធីកែ ។
sceno.add(new THREE.HemisphereLight(0xb8d8e8, 0x384838, 1.1));
const suno = new THREE.DirectionalLight(0xf8f0d8, 1.5);
suno.position.set(-40, 60, 30);
sceno.add(suno);
sceno.add(new THREE.AmbientLight(0x404848, 0.35));

// ⟪ ដី 🏔️ ⟫ ។ សំណាញ់ដែលអាចគណនាឡើងវិញពេលជម្រាលប្តូរ ។
const TERENA_SEGMENTOJ = 60;
const teraGeometrio = new THREE.PlaneGeometry(GRANDO, GRANDO, TERENA_SEGMENTOJ, TERENA_SEGMENTOJ);
teraGeometrio.rotateX(-Math.PI / 2);
const teraMesh = new THREE.Mesh(teraGeometrio, new THREE.MeshStandardMaterial({
  vertexColors: true, roughness: 0.92, metalness: 0,
}));
sceno.add(teraMesh);

// ⟪ ទឹក 🌊 ⟫ ។ បន្ទះថ្លានៅកម្រិតទឹក , ខាងលិចឆ្នេរ ។
const akvaGeometrio = new THREE.PlaneGeometry(90, GRANDO);
akvaGeometrio.rotateX(-Math.PI / 2);
const akvaMesh = new THREE.Mesh(akvaGeometrio, new THREE.MeshStandardMaterial({
  color: 0x287888, transparent: true, opacity: 0.55, roughness: 0.1, metalness: 0.1,
  side: THREE.DoubleSide,
}));
sceno.add(akvaMesh);

// ⟨ ក្រុមផ្លូវ និងកំពង់ 📃 ⟩ ។ សាងសង់ឡើងវិញទាំងស្រុងរាល់ការផ្លាស់ប្តូរ ។
const vojaGrupo = new THREE.Group();
sceno.add(vojaGrupo);

/* គណនាកម្ពស់ដី 3D នៃឆាក ។ */
function alteco(x: number, z: number): number {
  return grundo(x, z);
}

/* កម្រិតទឹកសម្រាប់ផ្ទៃផ្លូវ ( បូកចន្លោះស្ពាន ) ។ */
function akvaFino(x: number, z: number): number {
  const nivelo = akvaNiveloEn(x);
  return nivelo === -Infinity ? -Infinity : nivelo + 0.15;
}

/* ផ្ទៃផ្លូវ ៖ ខ្ពស់ជាងដីជុំវិញមួយកម្រិត ។ ដូច kantaoj/mondo/urbo.ts ។
    @param x, z ( number ) - ពិភពលោក ។
    @param largho ( number ) - ទទឹងផ្លូវ ។
@returns kម្ពស់ផ្ទៃ ( number )។ */
function vojaSupro(x: number, z: number, largho: number): number {
  const duono = largho / 2 + VOJA_BORDA_LARĜO;
  let maks = alteco(x, z);
  for (let i = 0; i < 8; i++) {
    const ang = i * Math.PI / 4;
    maks = Math.max(maks, alteco(x + Math.cos(ang) * duono, z + Math.sin(ang) * duono));
  }
  return maks + VOJA_SUPRO_LEVIGXO;
}

// ⟪ កម្រិតរួមនៅចំណុចភ្ជាប់ 📏 ⟫
// ⟨ វាលតែមួយ , ដូចហ្គេម 📃 ⟩ ៖ កម្ពស់ផ្លូវនៅទីនេះមកពី `kreiVojoAlton` , ដូច
// kantaoj/mondo/urbo.ts ។ មុននេះឆាកនេះមានច្បាប់ផ្ទាល់ខ្លួន , ដូច្នេះវាបង្ហាញ
// កម្ពស់ខុសពីហ្គេម ។

/* គណនាកម្ពស់ផ្លូវដែលបានតម្រឹមតាមចំណុចភ្ជាប់ ។
    @param difinoj ( VojDifino[] ) - ផ្លូវទាំងអស់ ។
@returns harmoniigita ( ( x , z ) => number ) - កម្ពស់ផ្លូវ ។ */
function harmoniigi(difinoj: VojDifino[]): (x: number, z: number) => number {
  const kunigoj = troviVojaRetajnKunigojn(
    difinoj.map(d => ({ punktoj: d.pts, larĝo: 2 * d.w })), dokoj);
  return kreiVojoAlton(alteco, kunigoj);
}

/* សាងសង់ក្រុមផ្លូវឡើងវិញ ៖ ផ្លូវ , ចានភ្ជាប់ , កំពង់ និងជណ្តើរកំពង់ ។ */
function konstruiVojojn3D(): void {
  for (const o of vojaGrupo.children.slice()) {
    vojaGrupo.remove(o);
    o.traverse(m => {
      const mesa = m as THREE.Mesh;
      if (mesa.geometry) mesa.geometry.dispose();
    });
  }
  if (!vojoj.length) return;
  const difinoj: VojDifino[] = [];
  for (const v of vojoj) {
    if (v.punktoj.length < 2) continue;
    difinoj.push({ pts: v.punktoj.map(p => [ p[0], p[1] ] as [ number, number ]),
      w: v.larĝo / 2, kapoj: true });
  }
  // ⟪ ការទាញចុងផ្លូវ 🧲 ⟫ ។ ចុងផ្លូវទាក់ទៅចំណុចភ្ជាប់ជិតបំផុត ដើម្បីកុំឱ្យ
  // នៅសល់ចន្លោះស្មៅរវាងផ្លូវ និងចានភ្ជាប់ ។
  const dokoLandaj = dokoj.map(d => {
    const rotacio = d.rotacio ?? 0;
    return { x: d.x + Math.sin(rotacio) * (d.profundo / 2),
      z: d.z + Math.cos(rotacio) * (d.profundo / 2) };
  });
  const antauaj = troviVojaRetajnKunigojn(
    difinoj.map(d => ({ punktoj: d.pts, larĝo: 2 * d.w })), dokoj);
  const celoj = antauaj.map(k => [ k.x, k.z ] as [ number, number ]);
  for (let i = 0; i < difinoj.length; i++) {
    const aliaj = difinoj.filter((_, j) => j !== i).map(d => d.pts);
    difinoj[i] = { ...difinoj[i], pts: gluiVojaFinon(difinoj[i].pts, celoj, dokoLandaj, aliaj) };
  }
  const harmoniigita = harmoniigi(difinoj);
  // ⟪ កំពង់ និងជណ្តើរ ⚓ ⟫ ។ កំពង់សាងសង់ដោយ konstruiDokon , ហើយជណ្តើររបស់វា
  // ជាផ្លូវជំហាន ( stuparo ) ដូច kantaoj/mondo/urbo.ts ។
  for (const d of dokoj) {
    const rotacio = d.rotacio ?? 0;
    const doko = konstruiDokon(kielSceno(vojaGrupo), d.x, d.z, rotacio,
      harmoniigita, akvaNiveloEn, d.profundo, alteco);
    if (doko.stuparajPunktoj.length < 2) continue;
    const sin = Math.sin(rotacio), kos = Math.cos(rotacio);
    const landaX = d.x + sin * (d.profundo / 2), landaZ = d.z + kos * (d.profundo / 2);
    const starto = Math.max(surGrid(vojaSupro(landaX, landaZ, doko.platformWidth)), doko.platformY);
    const falto = starto - doko.landejaY;
    if (falto <= STUPA_RISERO * 0.5) continue;
    const nombro = Math.max(1, Math.round(falto / STUPA_RISERO));
    const punktoj = kreiStuparajnPunktojn(doko.stuparajPunktoj[0], doko.stuparajPunktoj[1], nombro);
    difinoj.push({ pts: punktoj, w: doko.platformWidth, stuparo: true, kapoj: false,
      heightFn: kreiStuparanAlton(punktoj, starto - STUPA_RISERO - VOJA_SUPRO_LEVIGXO),
      grundoFn: alteco });
  }
  const kunigoj = troviVojaRetajnKunigojn(
    difinoj.map(d => ({ punktoj: d.pts, larĝo: 2 * d.w })), dokoj);
  const protektoj = kunigoj.map(k => [ k.x, k.z ] as [ number, number ]);
  const diorito = kreiDioritanMaterialon();
  const andezito = kreiAndezitanMaterialon();
  if (!nurPlatoj) konstruiVojojn(kielSceno(vojaGrupo), difinoj, harmoniigita, diorito, andezito,
    protektoj, { akvaFn: akvaFino });
  const fermitaj = new Map<string, [ number, number ]>(kunigoj.map(k => [ k.x + "," + k.z, k.fermitaj ]));
  const rotacioj = new Map<string, number>(kunigoj.map(k => [ k.x + "," + k.z, k.rotacio ]));
  const direktoj = new Map<string, [ number, number ][]>(
    kunigoj.map(k => [ k.x + "," + k.z, k.direktaj ]));
  konstruiIntersekcajnPlatojn(kielSceno(vojaGrupo), protektoj, harmoniigita,
    diorito, andezito, fermitaj, rotacioj, direktoj, alteco);
}

// ⟪ ដី និងទឹក 🏔️ ⟫ ។ កម្ពស់សំណាញ់ត្រូវបានគណនាឡើងវិញពេលជម្រាលប្តូរ ។
function gxisdatigiTeranon(): void {
  const poz = teraGeometrio.attributes.position;
  const kol = new THREE.BufferAttribute(new Float32Array(poz.count * 3), 3);
  const herbo = new THREE.Color(0x4f7a42);
  const sablo = new THREE.Color(0xc8b888);
  const maro = new THREE.Color(0x2c4a50);
  for (let i = 0; i < poz.count; i++) {
    const x = poz.getX(i), z = poz.getZ(i);
    const y = grundo(x, z);
    poz.setY(i, y);
    const koloro = y < akvaNivelo ? maro : y < akvaNivelo + 1.5 ? sablo : herbo;
    kol.setXYZ(i, koloro.r, koloro.g, koloro.b);
  }
  poz.needsUpdate = true;
  teraGeometrio.setAttribute("color", kol);
  teraGeometrio.computeVertexNormals();
  akvaMesh.position.set(-30 - 45, akvaNivelo, 0);
}

// ⟪ ផែនទីតូច 2D 🗺️ ⟫ ។ អូសចំណុចផ្លូវ និងកំពូលកំពង់ ។
const plano = elemento("plano2d") as HTMLCanvasElement;
plano.width = 440;
plano.height = 440;
const pk = plano.getContext("2d")!;
const pikseloX = (x: number): number => (DUONO - x) / GRANDO * plano.width;
const pikseloZ = (z: number): number => (DUONO - z) / GRANDO * plano.height;
const mondoX = (px: number): number => DUONO - px / plano.width * GRANDO;
const mondoZ = (py: number): number => DUONO - py / plano.height * GRANDO;
const skalo = plano.width / GRANDO;

type Trenebla = { speco: "punkto"; vojo: number; punkto: number }
  | { speco: "doko"; doko: number }
  | { speco: "pinto"; doko: number };
let trenata: Trenebla | null = null;

function desegniPlanon(): void {
  pk.fillStyle = "#1c222e";
  pk.fillRect(0, 0, plano.width, plano.height);
  // សមុទ្រ និងឆ្នេរ ។
  pk.fillStyle = "#2b5a66";
  pk.fillRect(0, 0, pikseloX(RANDO + TRANSIRA / 2), plano.height);
  pk.strokeStyle = "rgba(255,255,255,0.25)";
  pk.lineWidth = 1;
  pk.beginPath();
  pk.moveTo(pikseloX(RANDO + TRANSIRA / 2), 0);
  pk.lineTo(pikseloX(RANDO + TRANSIRA / 2), plano.height);
  pk.stroke();
  // កំពង់ ។
  for (const d of dokoj) {
    const rotacio = d.rotacio ?? 0;
    const w = 4;
    pk.save();
    pk.translate(pikseloX(d.x), pikseloZ(d.z));
    pk.rotate(-rotacio);
    pk.fillStyle = "rgba(216,216,208,0.95)";
    pk.fillRect(-w / 2 * skalo, -d.profundo / 2 * skalo, w * skalo, d.profundo * skalo);
    pk.restore();
  }
  // ផ្លូវ ។
  for (const v of vojoj) {
    if (v.punktoj.length < 2) continue;
    pk.strokeStyle = "rgba(216,216,208,0.95)";
    pk.lineWidth = Math.max(2, v.larĝo * skalo);
    pk.lineCap = "round";
    pk.lineJoin = "round";
    pk.beginPath();
    v.punktoj.forEach((p, i) => i === 0
      ? pk.moveTo(pikseloX(p[0]), pikseloZ(p[1]))
      : pk.lineTo(pikseloX(p[0]), pikseloZ(p[1])));
    pk.stroke();
    pk.fillStyle = "#ffffff";
    for (const p of v.punktoj) {
      pk.beginPath();
      pk.arc(pikseloX(p[0]), pikseloZ(p[1]), 3.5, 0, Math.PI * 2);
      pk.fill();
    }
  }
  // កំពូលកំពង់ ។
  pk.fillStyle = "#f8e8a8";
  for (const d of dokoj) {
    const rotacio = d.rotacio ?? 0;
    const duon = d.profundo / 2;
    const px = pikseloX(d.x - Math.sin(rotacio) * duon);
    const py = pikseloZ(d.z - Math.cos(rotacio) * duon);
    pk.beginPath();
    pk.arc(px, py, 5, 0, Math.PI * 2);
    pk.fill();
  }
}

/* រកវត្ថុអូសជិតបំផុតនឹងទ្រនិច ( ចំណុចផ្លូវ , កំពូលកំពង់ , ឬវេទិកាកំពង់ ) ។ */
function troviTreneblan(mx: number, mz: number): Trenebla | null {
  let plej: Trenebla | null = null, plejD = 1.8;
  for (let vi = 0; vi < vojoj.length; vi++) {
    const v = vojoj[vi];
    for (let pi = 0; pi < v.punktoj.length; pi++) {
      const p = v.punktoj[pi];
      const d = Math.hypot(p[0] - mx, p[1] - mz);
      if (d < plejD) { plejD = d; plej = { speco: "punkto", vojo: vi, punkto: pi }; }
    }
  }
  if (plej) return plej;
  for (let di = 0; di < dokoj.length; di++) {
    const d = dokoj[di];
    const rotacio = d.rotacio ?? 0;
    const duon = d.profundo / 2;
    const px = d.x - Math.sin(rotacio) * duon, pz = d.z - Math.cos(rotacio) * duon;
    if (Math.hypot(px - mx, pz - mz) < 2) return { speco: "pinto", doko: di };
  }
  for (let di = 0; di < dokoj.length; di++) {
    const d = dokoj[di];
    const rotacio = d.rotacio ?? 0;
    const dx = mx - d.x, dz = mz - d.z;
    const lx = dx * Math.cos(rotacio) - dz * Math.sin(rotacio);
    const lz = dx * Math.sin(rotacio) + dz * Math.cos(rotacio);
    if (Math.abs(lx) < 3 && Math.abs(lz) < d.profundo / 2) return { speco: "doko", doko: di };
  }
  return null;
}

plano.addEventListener("pointerdown", (e) => {
  plano.setPointerCapture(e.pointerId);
  const rekt = plano.getBoundingClientRect();
  const mx = mondoX((e.clientX - rekt.left) / rekt.width * plano.width);
  const mz = mondoZ((e.clientY - rekt.top) / rekt.height * plano.height);
  trenata = troviTreneblan(mx, mz);
});
plano.addEventListener("pointermove", (e) => {
  if (!trenata) return;
  const rekt = plano.getBoundingClientRect();
  const mx = Math.round(mondoX((e.clientX - rekt.left) / rekt.width * plano.width) * 2) / 2;
  const mz = Math.round(mondoZ((e.clientY - rekt.top) / rekt.height * plano.height) * 2) / 2;
  if (trenata.speco === "punkto") {
    const v = vojoj[trenata.vojo];
    if (v && v.punktoj[trenata.punkto]) v.punktoj[trenata.punkto] = [ mx, mz ];
  } else if (trenata.speco === "doko") {
    const d = dokoj[trenata.doko];
    if (d) { d.x = mx; d.z = mz; }
  } else {
    const d = dokoj[trenata.doko];
    if (d) {
      // ⟨ កំពូលអូស ៖ ចំណុចដីនៅស្ថិត , ប្រវែង = ចម្ងាយតាមអ័ក្ស 📃 ⟩
      const rotacio = d.rotacio ?? 0;
      const sin = Math.sin(rotacio), kos = Math.cos(rotacio);
      const bazoX = d.x + sin * (d.profundo / 2), bazoZ = d.z + kos * (d.profundo / 2);
      const t = (mx - bazoX) * -sin + (mz - bazoZ) * -kos;
      const prof = Math.round(Math.max(4, Math.min(40, t)) * 2) / 2;
      d.profundo = prof;
      d.x = Math.round((bazoX - sin * prof / 2) * 2) / 2;
      d.z = Math.round((bazoZ - kos * prof / 2) * 2) / 2;
    }
  }
  petiRekonstruon();
});
plano.addEventListener("pointerup", () => { trenata = null; petiRekonstruon(); });
plano.addEventListener("pointercancel", () => { trenata = null; });

// ⟪ ការសាងសង់ឡើងវិញ 🏗️ ⟫ ។ ការអូសហៅបន្តបន្ទាប់ , ដូច្នេះការសាងសង់ត្រូវ
// ធ្វើតែម្តងក្នុងមួយស៊ុម ។
let rekonstruoPetita = false;
function petiRekonstruon(): void {
  if (rekonstruoPetita) return;
  rekonstruoPetita = true;
  requestAnimationFrame(() => {
    rekonstruoPetita = false;
    konstruiVojojn3D();
    desegniPlanon();
  });
}

function statuso(teksto: string): void {
  const el = elemento("statuso");
  el.textContent = teksto;
}

// ⟪ ប៊ូតុង 🛠️ ⟫
elemento("vojoNova").addEventListener("click", () => {
  vojoj.push({ nomo: "Vojo " + (vojoj.length + 1), larĝo: 3.5,
    punktoj: [ [ 10, 10 ], [ 10, 30 ] ] });
  statuso("ផ្លូវថ្មីនៅខាងស្តាំ ។ អូសចំណុចរបស់វាក្នុងផែនទីតូច ។");
  petiRekonstruon();
});
elemento("dokoNova").addEventListener("click", () => {
  dokoj.push({ x: -38, z: 14, profundo: 16, rotacio: Math.PI / 2 });
  statuso("ចតុកោណថ្មីនៅឆ្នេរ ។ អូសកំពូលរបស់វាដើម្បីពង្រីក ។");
  petiRekonstruon();
});
elemento("vojoForigi").addEventListener("click", () => {
  if (!vojoj.length) return;
  vojoj.pop();
  statuso("បានលុបផ្លូវចុងក្រោយ ។");
  petiRekonstruon();
});
elemento("restarigi").addEventListener("click", () => {
  const s = antauaStato();
  vojoj = s.vojoj;
  dokoj = s.dokoj;
  statuso("បានដាក់ដើមវិញ ។");
  petiRekonstruon();
});

// ⟪ ជម្រាល និងទឹក 🏔️ ⟫ ។ ការប្តូរដីធ្វើឱ្យផ្លូវសាងសង់ឡើងវិញផ្ទាល់ ។
const deklivoEn = elemento("deklivo") as HTMLInputElement;
const akvoEn = elemento("akvoNivelo") as HTMLInputElement;
deklivoEn.addEventListener("input", () => {
  deklivo = parseFloat(deklivoEn.value) || 0;
  (elemento("deklivoValoro") as HTMLElement).textContent = String(deklivo);
  gxisdatigiTeranon();
  petiRekonstruon();
});
akvoEn.addEventListener("input", () => {
  akvaNivelo = parseFloat(akvoEn.value) || -3;
  (elemento("akvoValoro") as HTMLElement).textContent = String(akvaNivelo);
  gxisdatigiTeranon();
  petiRekonstruon();
});

// ⟪ ស៊ុម 🎥 ⟫ ។ ផ្ទាំងគំនូរ 3D ប្តូរទំហំតាមបង្អួច ។
function gxisdatigiGrandon(): void {
  const rekt = bildilo.domElement.getBoundingClientRect();
  const w = Math.max(1, Math.round(rekt.width)), h = Math.max(1, Math.round(rekt.height));
  bildilo.setSize(w, h, false);
  fotilo.aspect = w / h;
  fotilo.updateProjectionMatrix();
}
globalThis.addEventListener("resize", gxisdatigiGrandon);

const s = antauaStato();
vojoj = s.vojoj;
dokoj = s.dokoj;
gxisdatigiTeranon();
gxisdatigiGrandon();
konstruiVojojn3D();
desegniPlanon();
statuso("អូសចំណុចផ្លូវ ឬកំពូលកំពង់ ។ ផ្លូវ 3D សាងសង់ឡើងវិញភ្លាម ។");

// ⟨ ចូលពីកុងសូល 📃 ⟩ ៖ ដើម្បីដាក់ទិន្នន័យផ្លូវដោយផ្ទាល់ខ្លួនក្នុងការសាកល្បង
// ពីជំនួយការទំព័រ ( __provo.reagordi ( vojoj , dokoj ) ) ។
(globalThis as unknown as { __provo: unknown }).__provo = {
  get vojoj() { return vojoj; },
  get dokoj() { return dokoj; },
  fotilo, regiloj,
  konstrui: konstruiVojojn3D,
  nurPlatojn( nur: boolean ): void { nurPlatoj = nur; konstruiVojojn3D(); },
  rayu( nx: number, ny: number ): { p: [ number, number, number ]; i: number }[] {
    const rc = new THREE.Raycaster();
    rc.setFromCamera(new THREE.Vector2(nx, ny), fotilo);
    return rc.intersectObject(vojaGrupo, true).map(h => ({
      p: [ +h.point.x.toFixed(3), +h.point.y.toFixed(3), +h.point.z.toFixed(3) ] as [ number, number, number ],
      i: vojaGrupo.children.findIndex(c => c === h.object || c === h.object.parent),
    }));
  },
  reagordi: ( vj: SkulptaVojo[], dk: SkulptaPlatformo[] ): void => {
    vojoj = vj; dokoj = dk; petiRekonstruon();
  },
};

function animacii(): void {
  requestAnimationFrame(animacii);
  regiloj.update();
  bildilo.render(sceno, fotilo);
}
animacii();

/* យកធាតុពីឯកសារ ។ បើគ្មាន , កំហុស ។
    @param id ( string ) - លេខសម្គាល់ធាតុ ។
@returns ធាតុ ( HTMLElement )។ */
function elemento(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error("ធាតុ " + id + " មិនមានទេ");
  return el;
}
