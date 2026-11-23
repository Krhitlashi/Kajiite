// ≺⧼ ſɭэ ֭ſɭэ ʌ j͐ʃɹ ŋᷠɔ ʌ ſ͕ɭɔ }ʃᴜ 🛣️ ⧽≻
// ⟨ ហេតុអ្វីឆាកតូច 📃 ⟩ គឺការសាកល្បងផ្លូវ 3D ជាធម្មតាត្រូវការផ្ទុកពិភពលោកទាំងមូល
// ( ដី ទឹក ទីក្រុង ) ដែលយឺតណាស់ ។ ឆាកនេះប្រើឧបករណ៍សាងសង់ពិតរបស់ហ្គេម
// ( vepaqHak6h6n , vepaqIntersekcajnHapa12n , vepaqQakaj2n ) លើដីតូចមួយ
// ដែលមានឆ្នេរ និងទឹក , ដូច្នេះចានភ្ជាប់ ជណ្តើរកំពង់ និងកម្ពស់ផ្លូវ
// អាចមើលឃើញភ្លាម ។
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { agordiBildilon, agordiMedion, kf2CxefajnLumojn }
  from "../../eskekoj/komunajxoj/lumo.js";
import { vepaqHak6h6n } from "../../eskekoj/medio/hak6h6.js";
import { vepaqIntersekcajnHapa12n } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { vepaqQakaj2n } from "../../eskekoj/medio/qakaj2.js";
import { kf2DokanStuparon } from "../../eskekoj/medio/qakaj2/stuparo.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { kf2T6hnaPukek, kf2T6g6Pukek } from "../../eskekoj/komunajxoj/materialoj.js";
import { VOJA_TRUA_DUONO, surGrid } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { k6h6Supro } from "../../eskekoj/medio/hak6h6/haqoxa.js";
import { veb6qaiWeh2Skek } from "../../eskekoj/komunajxoj/koloroj.js";
import { kf2Brakojn, kunigaPlataAlto } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { gluiK6h6Finon } from "../../eskekoj/medio/hak6h6/gluado.js";
import { kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import type { VojDifino } from "../../eskekoj/medio/hak6h6/hahunaq.js";
import type { SkulptaPlatqoxa, SkulptaK6h6 } from "../../kantaoj/mondo/kaxte/hahunaq.js";

// ⟪ ព្រំដែនឆាក 📏 ⟫ ។ ឆាកតូចដែលមានឆ្នេរនៅខាងលិច ( −x ) ។
const GRANDO = 0o170;
const DUONO = GRANDO / 2;
// ⟨ ឆ្នេរ ៖ ដីនៅ x > −0o42 , សមុទ្រនៅខាងឆ្វេង ។ 📃 ⟩
const RANDO = -0o42;
const TRANSIRA = 0o24;
const MARA_PROFUNDO = -0o10;

let haga = 3;
let akvaVem2 = -3;
// ⟨ សាកល្បងចានភ្ជាប់តែមួយ 📃 ⟩ ៖ លាក់ផ្លូវដើម្បីមើលចានភ្ជាប់ឯករាជ្យ ។
let nurHapa12 = false;

/* កម្ពស់ដីនៃឆាកសាកល្បង ។ ដីចុះទៅសមុទ្រនៅខាងលិច , ហើយជម្រាល ( haga )
   ផ្អៀងតាម −z ដើម្បីឱ្យចំណុចភ្ជាប់មានកម្រិតខុសគ្នា ។
    @param x ( number ) - ពិភពលោក x ។
    @param z ( number ) - ពិភពលោក z ។
@returns kម្ពស់ ( number )។ */
function grundo(x: number, z: number): number {
  const t = Math.max(0, Math.min(1, (x - RANDO) / TRANSIRA));
  const glata = t * t * (3 - 2 * t);
  return MARA_PROFUNDO + (0 - MARA_PROFUNDO) * glata + haga * 0o10 * (z / GRANDO);
}
/* កម្រិតទឹក , ឬ −Infinity បើគ្មានទឹក ។ ទឹកមានតែខាងលិចឆ្នេរ ។
    @returns kម្រិត ( number )។ */
function akvaVem2En(x: number): number {
  return x < RANDO + TRANSIRA / 2 ? akvaVem2 : -Infinity;
}

// ⟪ ទិន្នន័យដែលកែបាន 📃 ⟫ ។ ផ្លូវ និងកំពង់តូចៗ , ដូចទិន្នន័យរបស់កម្មវិធីកែ ។
let hak6h6: SkulptaK6h6[] = [];
let haqakaj2: SkulptaPlatqoxa[] = [];

function antauaStato(): { hak6h6: SkulptaK6h6[]; haqakaj2: SkulptaPlatqoxa[] } {
  return {
    hak6h6: [
      { ksaka: "Nordo", sefini: 3.5, n2k: [ [ -6, -0o42 ], [ -6, -6 ], [ -6, 0o30 ] ] },
      { ksaka: "Oriento", sefini: 3.5, n2k: [ [ -6, -6 ], [ 0o24, -6 ] ] },
      { ksaka: "Okcidento", sefini: 3.5, n2k: [ [ -6, -6 ], [ -0o24, -6 ] ] },
      { ksaka: "Kajo", sefini: 3.5, n2k: [ [ -0o24, -6 ], [ -0o36, -6 ] ] },
    ],
    haqakaj2: [ { x: -0o46, z: -6, profundo: 0o20, rotacio: Math.PI / 2 } ],
  };
}

/* ក្រុមអាចប្រើជាឆាក ៖ ឧបករណ៍សាងសង់របស់ហ្គេមប្រកាសឆាក , រីឯឧបករណ៍ផ្តល់ក្រុម ។
    @param g ( THREE.Object3D ) - ក្រុម ។
@returns ឆាក ( THREE.Scene )។ */
function kielSceno(g: THREE.Object3D): THREE.Scene {
  return g as THREE.Scene;
}

// ⟪ ឆាក 3D 🎥 ⟫
// ⟨ agordiBildilon បញ្ចូលពន្លឺចង្កៀងកោង និងជំហានពណ៌រួម 📃 ⟩
const bildilo = new THREE.WebGLRenderer({ canvas: elemento("vido3d") as HTMLCanvasElement, antialias: true });
agordiBildilon( bildilo, { pikslaRacio: Math.min( 0o2, globalThis.devicePixelRatio || 1 ) } );
const qena = new THREE.Scene();
qena.background = new THREE.Color(0xa8d0e8);
const fotilo = new THREE.PerspectiveCamera(0o62, 1, 1, 0o1130);
fotilo.position.set(0o56, 0o50, 0o66);
const hakama = new OrbitControls(fotilo, bildilo.domElement);
hakama.target.set(-0o16, 0, -2);
hakama.enableDamping = true;
hakama.dampingFactor = 0.08;
hakama.maxPolarAngle = Math.PI * 0.48;
// ⟨ ពន្លឺមេឃ ព្រះអាទិត្យ និងពន្លឺបំពេញ តាមឧបករណ៍រួម ។ 📃 ⟩
kf2CxefajnLumojn( qena, {
  cxielaKoloro: 0xb8d8e8, grundoKoloro: 0x384838, cxielaIntenso: 0o11/0o10,
  sunaKoloro: 0xf8f0d8, sunaIntenso: 0o3/0o2, sunaXekuxa: [ -0o50, 0o74, 0o36 ],
  plenigaKoloro: 0x404848, plenigaIntenso: 0o27/0o100,
} );
// ⟨ ការឆ្លុះរួម សម្រាប់វត្ថុធាតុដែក និងកញ្ចក់ ។ 📃 ⟩
agordiMedion( qena, bildilo );

// ⟪ ដី 🏔️ ⟫ ។ សំណាញ់ដែលអាចគណនាឡើងវិញពេលជម្រាលប្តូរ ។
const TERENA_SEGMENTOJ = 0o74;
const teraGeometrio = new THREE.PlaneGeometry(GRANDO, GRANDO, TERENA_SEGMENTOJ, TERENA_SEGMENTOJ);
teraGeometrio.rotateX(-Math.PI / 2);
const teraMesh = new THREE.Mesh(teraGeometrio, new THREE.MeshStandardMaterial({
  vertexColors: true, roughness: 0.92, metalness: 0,
}));
qena.add(teraMesh);

// ⟪ ទឹក 🌊 ⟫ ។ បន្ទះថ្លានៅកម្រិតទឹក , ខាងលិចឆ្នេរ ។
const akvaGeometrio = new THREE.PlaneGeometry(0o132, GRANDO);
akvaGeometrio.rotateX(-Math.PI / 2);
const akvaMesh = new THREE.Mesh(akvaGeometrio, new THREE.MeshStandardMaterial({
  color: 0x287888, transparent: true, opacity: 0.55, roughness: 0.1, metalness: 0.1,
  side: THREE.DoubleSide,
}));
qena.add(akvaMesh);

// ⟨ ក្រុមផ្លូវ និងកំពង់ 📃 ⟩ ។ សាងសង់ឡើងវិញទាំងស្រុងរាល់ការផ្លាស់ប្តូរ ។
const k6h6Grupo = new THREE.Group();
qena.add(k6h6Grupo);

/* គណនាកម្ពស់ដី 3D នៃឆាក ។ */
function alteco(x: number, z: number): number {
  return grundo(x, z);
}

/* កម្រិតទឹកសម្រាប់ផ្ទៃផ្លូវ ( បូកចន្លោះស្ពាន ) ។ */
function akvaFino(x: number, z: number): number {
  const vem2 = akvaVem2En(x);
  return vem2 === -Infinity ? -Infinity : vem2 + 0.15;
}

// ⟪ កម្ពស់ផ្ទៃផ្លូវ 📏 ⟫
// ⟨ រូបមន្តតែមួយនៅ haqoxa.js 📃 ⟩ ៖ មុននេះឆាកនេះប្រើ `sefini / 2` ,
// ដូច្នេះផ្ទៃផ្លូវធំជាងហ្គេមពីរដង ។ ឥឡូវអានអនុគមន៍រួម ។ 📃 ⟩

// ⟪ កម្រិតរួមនៅចំណុចភ្ជាប់ 📏 ⟫
// ⟨ វាលតែមួយ , ដូចហ្គេម 📃 ⟩ ៖ កម្ពស់ផ្លូវនៅទីនេះមកពី `kf2K6h6Alton` , ដូច
// kantaoj/mondo/kaxte.ts ។ មុននេះឆាកនេះមានច្បាប់ផ្ទាល់ខ្លួន , ដូច្នេះវាបង្ហាញ
// កម្ពស់ខុសពីហ្គេម ។

/* គណនាកម្ពស់ផ្លូវដែលបានតម្រឹមតាមចំណុចភ្ជាប់ ។
    @param difinoj ( VojDifino[] ) - ផ្លូវទាំងអស់ ។
@returns harmoniigita ( ( x , z ) => number ) - កម្ពស់ផ្លូវ ។ */
function harmoniigi(difinoj: VojDifino[]): (x: number, z: number) => number {
  const haveb6kek = troviK6h6RetajnHaveb6kekn(
    difinoj.map(d => ({ n2k: d.pts, sefini: 2 * d.w })), haqakaj2);
  return kf2K6h6Alton(alteco, haveb6kek);
}

/* សាងសង់ក្រុមផ្លូវឡើងវិញ ៖ ផ្លូវ , ចានភ្ជាប់ , កំពង់ និងជណ្តើរកំពង់ ។ */
function vepaqHak6h6n3D(): void {
  for (const o of k6h6Grupo.children.slice()) {
    k6h6Grupo.remove(o);
    o.traverse(m => {
      const mesa = m as THREE.Mesh;
      if (mesa.geometry) mesa.geometry.dispose();
    });
  }
  if (!hak6h6.length) return;
  const difinoj: VojDifino[] = [];
  for (const v of hak6h6) {
    if (v.n2k.length < 2) continue;
    difinoj.push({ pts: v.n2k.map(p => [ p[0], p[1] ] as [ number, number ]),
      w: v.sefini / 2, hateruni: true });
  }
  // ⟪ ការទាញចុងផ្លូវ 🧲 ⟫ ។ ចុងផ្លូវទាក់ទៅចំណុចភ្ជាប់ជិតបំផុត ដើម្បីកុំឱ្យ
  // នៅសល់ចន្លោះស្មៅរវាងផ្លូវ និងចានភ្ជាប់ ។
  const qakaj2Landaj = haqakaj2.map(d => {
    const rotacio = d.rotacio ?? 0;
    return { x: d.x + Math.sin(rotacio) * (d.profundo / 2),
      z: d.z + Math.cos(rotacio) * (d.profundo / 2) };
  });
  const antauaj = troviK6h6RetajnHaveb6kekn(
    difinoj.map(d => ({ n2k: d.pts, sefini: 2 * d.w })), haqakaj2);
  const celoj = antauaj.map(k => [ k.x, k.z ] as [ number, number ]);
  for (let i = 0; i < difinoj.length; i++) {
    const aliaj = difinoj.filter((_, j) => j !== i).map(d => d.pts);
    difinoj[i] = { ...difinoj[i], pts: gluiK6h6Finon(difinoj[i].pts, celoj, qakaj2Landaj, aliaj) };
  }
  const harmoniigita = harmoniigi(difinoj);
  // ⟨ កម្រិតចានភ្ជាប់ 📏 ⟩ ៖ ជណ្តើរចាប់ផ្តើមត្រង់កម្រិតចាន , ដូច pontaFinAlto
  // ក្នុង kantaoj/mondo/kaxte.ts ។ បើឆាកអានតែដី , កម្រាលខ្ពស់បំផុតនៃជណ្តើរ
  // ខុសពីចាន , ហើយឃើញជាជញ្ជាំងឈរ ។
  const pa12Nivele = (px: number, pz: number): number | null => {
    for (const k of antauaj) {
      if (Math.hypot(px - k.x, pz - k.z) > VOJA_TRUA_DUONO) continue;
      const knece = kf2Brakojn(k.direktaj, k.fermitaj, k.rotacio, k.p2somani);
      return kunigaPlataAlto(k.x, k.z, knece, harmoniigita);
    }
    return null;
  };
  // ⟪ កំពង់ និងជណ្តើរ ⚓ ⟫ ។ កំពង់សាងសង់ដោយ vepaqQakaj2n , ហើយជណ្តើររបស់វា
  // ជាផ្លូវជំហាន ( stuparo ) ដូច kantaoj/mondo/kaxte.ts ។
  for (const d of haqakaj2) {
    const rotacio = d.rotacio ?? 0;
    const qakaj2 = vepaqQakaj2n(kielSceno(k6h6Grupo), d.x, d.z, rotacio,
      harmoniigita, akvaVem2En, d.profundo, alteco);
    if (qakaj2.stuparajPunktoj.length < 2) continue;
    const sin = Math.sin(rotacio), kos = Math.cos(rotacio);
    const landaX = d.x + sin * (d.profundo / 2), landaZ = d.z + kos * (d.profundo / 2);
    const pa12 = pa12Nivele(landaX, landaZ);
    const saxeni = Math.max(pa12 ?? surGrid(k6h6Supro(landaX, landaZ, qakaj2.platformWidth, alteco)),
      qakaj2.platformY);
    const stuparo = kf2DokanStuparon(qakaj2.stuparajPunktoj[0], qakaj2.stuparajPunktoj[1],
      saxeni, qakaj2.landejaY);
    if (!stuparo) continue;
    difinoj.push({ pts: stuparo.n2k, w: qakaj2.platformWidth, stuparo: true, hateruni: false,
      heightFn: stuparo.l6da, grundoFn: alteco });
  }
  const haveb6kek = troviK6h6RetajnHaveb6kekn(
    difinoj.map(d => ({ n2k: d.pts, sefini: 2 * d.w })), haqakaj2);
  const protektoj = haveb6kek.map(k => [ k.x, k.z ] as [ number, number ]);
  const t6g6 = kf2T6g6Pukek();
  const t6hna = kf2T6hnaPukek();
  // ⟨ ដៃពិតរបស់ចានភ្ជាប់ 📃 ⟩ ៖ ផ្លូវត្រូវអានកម្រិតចានដូចចានសាងសង់ ,
  // ដូច្នេះឆាកនេះត្រូវផ្ញើដៃទៅដូច kantaoj/mondo/kaxte.ts ។
  const fermitaj = new Map<string, [ number, number ]>(haveb6kek.map(k => [ k.x + "," + k.z, k.fermitaj ]));
  const rotacioj = new Map<string, number>(haveb6kek.map(k => [ k.x + "," + k.z, k.rotacio ]));
  const hac2w2q = new Map<string, [ number, number ][]>(
    haveb6kek.map(k => [ k.x + "," + k.z, k.direktaj ]));
  const hap2somani = new Map<string, number>(haveb6kek.map(k => [ k.x + "," + k.z, k.p2somani ]));
  if (!nurHapa12) vepaqHak6h6n(kielSceno(k6h6Grupo), difinoj, harmoniigita, t6g6, t6hna,
    protektoj, { akvaFn: akvaFino, kunigajDirektoj: hac2w2q,
      kunigajFermitaj: fermitaj, kunigajRotacioj: rotacioj, kunigajDuonoj: hap2somani });
  vepaqIntersekcajnHapa12n(kielSceno(k6h6Grupo), protektoj, harmoniigita,
    t6g6, t6hna, fermitaj, rotacioj, hac2w2q, alteco, hap2somani);
}

// ⟪ ដី និងទឹក 🏔️ ⟫ ។ កម្ពស់សំណាញ់ត្រូវបានគណនាឡើងវិញពេលជម្រាលប្តូរ ។
function gxisdatigiTeranon(): void {
  const haxekuxa = teraGeometrio.attributes.position;
  const kol = new THREE.BufferAttribute(new Float32Array(haxekuxa.count * 3), 3);
  const fe1af = veb6qaiWeh2Skek(new THREE.Color(0x4f7a42));
  const sablo = veb6qaiWeh2Skek(new THREE.Color(0xc8b888));
  const maro = veb6qaiWeh2Skek(new THREE.Color(0x2c4a50));
  for (let i = 0; i < haxekuxa.count; i++) {
    const x = haxekuxa.getX(i), z = haxekuxa.getZ(i);
    const y = grundo(x, z);
    haxekuxa.setY(i, y);
    const weh2 = y < akvaVem2 ? maro : y < akvaVem2 + 1.5 ? sablo : fe1af;
    kol.setXYZ(i, weh2.r, weh2.g, weh2.b);
  }
  haxekuxa.needsUpdate = true;
  teraGeometrio.setAttribute("color", kol);
  teraGeometrio.computeVertexNormals();
  akvaMesh.position.set(-0o36 - 0o55, akvaVem2, 0);
}

// ⟪ ផែនទីតូច 2D 🗺️ ⟫ ។ អូសចំណុចផ្លូវ និងកំពូលកំពង់ ។
const plano = elemento("plano2d") as HTMLCanvasElement;
plano.width = 0o670;
plano.height = 0o670;
const pk = plano.getContext("2d")!;
const c2taX = (x: number): number => (DUONO - x) / GRANDO * plano.width;
const c2taZ = (z: number): number => (DUONO - z) / GRANDO * plano.height;
const mondoX = (px: number): number => DUONO - px / plano.width * GRANDO;
const mondoZ = (py: number): number => DUONO - py / plano.height * GRANDO;
const p6zukani = plano.width / GRANDO;

type Trenebla = { pudal: "punkto"; k6h6: number; n2k: number }
  | { pudal: "qakaj2"; qakaj2: number }
  | { pudal: "pinto"; qakaj2: number };
let trenata: Trenebla | null = null;

function k2fPlanon(): void {
  pk.fillStyle = "#182028";
  pk.fillRect(0, 0, plano.width, plano.height);
  // សមុទ្រ និងឆ្នេរ ។
  pk.fillStyle = "#285860";
  pk.fillRect(0, 0, c2taX(RANDO + TRANSIRA / 2), plano.height);
  pk.strokeStyle = "rgba(255,255,255,0.25)";
  pk.lineWidth = 1;
  pk.beginPath();
  pk.moveTo(c2taX(RANDO + TRANSIRA / 2), 0);
  pk.lineTo(c2taX(RANDO + TRANSIRA / 2), plano.height);
  pk.stroke();
  // កំពង់ ។
  for (const d of haqakaj2) {
    const rotacio = d.rotacio ?? 0;
    const w = 4;
    pk.save();
    pk.translate(c2taX(d.x), c2taZ(d.z));
    pk.rotate(-rotacio);
    pk.fillStyle = "rgba(216,216,208,0.95)";
    pk.fillRect(-w / 2 * p6zukani, -d.profundo / 2 * p6zukani, w * p6zukani, d.profundo * p6zukani);
    pk.restore();
  }
  // ផ្លូវ ។
  for (const v of hak6h6) {
    if (v.n2k.length < 2) continue;
    pk.strokeStyle = "rgba(216,216,208,0.95)";
    pk.lineWidth = Math.max(2, v.sefini * p6zukani);
    pk.lineCap = "round";
    pk.lineJoin = "round";
    pk.beginPath();
    v.n2k.forEach((p, i) => i === 0
      ? pk.moveTo(c2taX(p[0]), c2taZ(p[1]))
      : pk.lineTo(c2taX(p[0]), c2taZ(p[1])));
    pk.stroke();
    pk.fillStyle = "#ffffff";
    for (const p of v.n2k) {
      pk.beginPath();
      pk.arc(c2taX(p[0]), c2taZ(p[1]), 3.5, 0, Math.PI * 2);
      pk.fill();
    }
  }
  // កំពូលកំពង់ ។
  pk.fillStyle = "#f8e8a8";
  for (const d of haqakaj2) {
    const rotacio = d.rotacio ?? 0;
    const duon = d.profundo / 2;
    const px = c2taX(d.x - Math.sin(rotacio) * duon);
    const py = c2taZ(d.z - Math.cos(rotacio) * duon);
    pk.beginPath();
    pk.arc(px, py, 5, 0, Math.PI * 2);
    pk.fill();
  }
}

/* រកវត្ថុអូសជិតបំផុតនឹងទ្រនិច ( ចំណុចផ្លូវ , កំពូលកំពង់ , ឬវេទិកាកំពង់ ) ។ */
function troviTreneblan(mx: number, mz: number): Trenebla | null {
  let plej: Trenebla | null = null, plejD = 1.8;
  for (let vi = 0; vi < hak6h6.length; vi++) {
    const v = hak6h6[vi];
    for (let pi = 0; pi < v.n2k.length; pi++) {
      const p = v.n2k[pi];
      const d = Math.hypot(p[0] - mx, p[1] - mz);
      if (d < plejD) { plejD = d; plej = { pudal: "punkto", k6h6: vi, n2k: pi }; }
    }
  }
  if (plej) return plej;
  for (let di = 0; di < haqakaj2.length; di++) {
    const d = haqakaj2[di];
    const rotacio = d.rotacio ?? 0;
    const duon = d.profundo / 2;
    const px = d.x - Math.sin(rotacio) * duon, pz = d.z - Math.cos(rotacio) * duon;
    if (Math.hypot(px - mx, pz - mz) < 2) return { pudal: "pinto", qakaj2: di };
  }
  for (let di = 0; di < haqakaj2.length; di++) {
    const d = haqakaj2[di];
    const rotacio = d.rotacio ?? 0;
    const dx = mx - d.x, dz = mz - d.z;
    const lx = dx * Math.cos(rotacio) - dz * Math.sin(rotacio);
    const lz = dx * Math.sin(rotacio) + dz * Math.cos(rotacio);
    if (Math.abs(lx) < 3 && Math.abs(lz) < d.profundo / 2) return { pudal: "qakaj2", qakaj2: di };
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
  if (trenata.pudal === "punkto") {
    const v = hak6h6[trenata.k6h6];
    if (v && v.n2k[trenata.n2k]) v.n2k[trenata.n2k] = [ mx, mz ];
  } else if (trenata.pudal === "qakaj2") {
    const d = haqakaj2[trenata.qakaj2];
    if (d) { d.x = mx; d.z = mz; }
  } else {
    const d = haqakaj2[trenata.qakaj2];
    if (d) {
      // ⟨ កំពូលអូស ៖ ចំណុចដីនៅស្ថិត , ប្រវែង = ចម្ងាយតាមអ័ក្ស 📃 ⟩
      const rotacio = d.rotacio ?? 0;
      const sin = Math.sin(rotacio), kos = Math.cos(rotacio);
      const bazoX = d.x + sin * (d.profundo / 2), bazoZ = d.z + kos * (d.profundo / 2);
      const t = (mx - bazoX) * -sin + (mz - bazoZ) * -kos;
      const prof = Math.round(Math.max(4, Math.min(0o50, t)) * 2) / 2;
      d.profundo = prof;
      d.x = Math.round((bazoX - sin * prof / 2) * 2) / 2;
      d.z = Math.round((bazoZ - kos * prof / 2) * 2) / 2;
    }
  }
  petiRevepaqn();
});
plano.addEventListener("pointerup", () => { trenata = null; petiRevepaqn(); });
plano.addEventListener("pointercancel", () => { trenata = null; });

// ⟪ ការសាងសង់ឡើងវិញ 🏗️ ⟫ ។ ការអូសហៅបន្តបន្ទាប់ , ដូច្នេះការសាងសង់ត្រូវ
// ធ្វើតែម្តងក្នុងមួយស៊ុម ។
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
  const el = elemento("statuso");
  el.textContent = s2banani;
}

// ⟪ ប៊ូតុង 🛠️ ⟫
elemento("k6h6Sef4").addEventListener("click", () => {
  hak6h6.push({ ksaka: "K6h6 " + (hak6h6.length + 1), sefini: 3.5,
    n2k: [ [ 0o12, 0o12 ], [ 0o12, 0o36 ] ] });
  statuso("ផ្លូវថ្មីនៅខាងស្តាំ ។ អូសចំណុចរបស់វាក្នុងផែនទីតូច ។");
  petiRevepaqn();
});
elemento("qakaj2Sef4").addEventListener("click", () => {
  haqakaj2.push({ x: -0o46, z: 0o16, profundo: 0o20, rotacio: Math.PI / 2 });
  statuso("ចតុកោណថ្មីនៅឆ្នេរ ។ អូសកំពូលរបស់វាដើម្បីពង្រីក ។");
  petiRevepaqn();
});
elemento("k6h6Forigi").addEventListener("click", () => {
  if (!hak6h6.length) return;
  hak6h6.pop();
  statuso("បានលុបផ្លូវចុងក្រោយ ។");
  petiRevepaqn();
});
elemento("restarigi").addEventListener("click", () => {
  const s = antauaStato();
  hak6h6 = s.hak6h6;
  haqakaj2 = s.haqakaj2;
  statuso("បានដាក់ដើមវិញ ។");
  petiRevepaqn();
});

// ⟪ ជម្រាល និងទឹក 🏔️ ⟫ ។ ការប្តូរដីធ្វើឱ្យផ្លូវសាងសង់ឡើងវិញផ្ទាល់ ។
const deklivoEn = elemento("haga") as HTMLInputElement;
const akvoEn = elemento("akvoVem2") as HTMLInputElement;
deklivoEn.addEventListener("input", () => {
  haga = parseFloat(deklivoEn.value) || 0;
  (elemento("deklivoValoro") as HTMLElement).textContent = String(haga);
  gxisdatigiTeranon();
  petiRevepaqn();
});
akvoEn.addEventListener("input", () => {
  akvaVem2 = parseFloat(akvoEn.value) || -3;
  (elemento("akvoValoro") as HTMLElement).textContent = String(akvaVem2);
  gxisdatigiTeranon();
  petiRevepaqn();
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
hak6h6 = s.hak6h6;
haqakaj2 = s.haqakaj2;
gxisdatigiTeranon();
gxisdatigiGrandon();
vepaqHak6h6n3D();
k2fPlanon();
statuso("អូសចំណុចផ្លូវ ឬកំពូលកំពង់ ។ ផ្លូវ 3D សាងសង់ឡើងវិញភ្លាម ។");

// ⟨ ចូលពីកុងសូល 📃 ⟩ ៖ ដើម្បីដាក់ទិន្នន័យផ្លូវដោយផ្ទាល់ខ្លួនក្នុងការសាកល្បង
// ពីជំនួយការទំព័រ ( __provo.reagordi ( hak6h6 , haqakaj2 ) ) ។
(globalThis as unknown as { __provo: unknown }).__provo = {
  get hak6h6() { return hak6h6; },
  get haqakaj2() { return haqakaj2; },
  fotilo, hakama,
  vepaq: vepaqHak6h6n3D,
  nurHapa12n( nur: boolean ): void { nurHapa12 = nur; vepaqHak6h6n3D(); },
  rayu( nx: number, ny: number ): { p: [ number, number, number ]; i: number }[] {
    const rc = new THREE.Raycaster();
    rc.setFromCamera(new THREE.Vector2(nx, ny), fotilo);
    return rc.intersectObject(k6h6Grupo, true).map(h => ({
      p: [ +h.point.x.toFixed(3), +h.point.y.toFixed(3), +h.point.z.toFixed(3) ] as [ number, number, number ],
      i: k6h6Grupo.children.findIndex(c => c === h.object || c === h.object.parent),
    }));
  },
  reagordi: ( vj: SkulptaK6h6[], dk: SkulptaPlatqoxa[] ): void => {
    hak6h6 = vj; haqakaj2 = dk; petiRevepaqn();
  },
};

function animacii(): void {
  requestAnimationFrame(animacii);
  hakama.update();
  bildilo.render(qena, fotilo);
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
