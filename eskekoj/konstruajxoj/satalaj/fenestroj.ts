// ≺⧼ បង្អួចរាងគ្រាប់ 🪟 ⧽≻
import * as THREE from "three";
import { kreiFenestranMaterialon } from "../../komunajxoj/materialoj.js";
import { kreiPilolFenestranFormon, kreiStelanFenestranFormon, rondigiKonturon } from "../../komunajxoj/formoj.js";
import { konstruajxaMaterialo } from "./tipoj.js";

// ⟨ បង្អួចរាងគ្រាប់ 📃 ⟩
const fenProud = 0o1/0o100;

const kadroRondigo = 0o1/0o20;

export function fenestraSubFaco(facaRadiuso: number, klino: number, fenAlto: number,
  tieroAlto: number, suba = false
): number {
  const klinaAngulo = Math.atan(klino / tieroAlto);
  return facaRadiuso + ( suba ? -1 : 1 ) * klino * fenAlto / ( 2 * tieroAlto )
    + fenProud / Math.cos(klinaAngulo);
}

// ⟨ លេខមួយសម្រាប់អគារទាំងមូល 📃 ⟩
// ⟨ ធំប៉ុន្មាន 📃 ⟩
// ⟨ ហេតុអ្វីមិនពីស្រទាប់ចុង 📃 ⟩
export function fenestraMargxeno(facaRadiusoLarga: number): number {
  return facaRadiusoLarga * 0o2/0o10;
}

// ⟨ ជាមួយរឹម 📃 ⟩
// ⟨ គ្មានរឹម 📃 ⟩
export function fenestraLargho(facaRadiuso: number, fenAlto: number, margxeno?: number): number {
  if ( margxeno !== undefined ) return facaRadiuso * 2 - margxeno * 2;
  return Math.min(facaRadiuso * 2 - 0o3/0o10, facaRadiuso * 4/3 + 0o1/0o4, fenAlto * 0o11);
}

// ⟨ ឃ្លាំងធរណីមាត្របង្អួច 📃 ⟩ ៖ អគារជាច្រើនមានស្រទាប់ដូចគ្នា , ដូច្នេះបង្អួចរបស់ពួកវា
// មានរូបរាងដូចគ្នាទាំងស្រុង ។ ទីតាំង និងការបង្វិលខុសគ្នា , តែធរណីមាត្រអាស្រ័យតែលើ
// ទំហំទាំងនេះ ។ ការកាត់រូបរាងផ្កាយដែលមានរន្ធចំណាយពេលច្រើន , ដូច្នេះធ្វើម្តង ។ 📃 ⟩
const fenestrajKashmemoroj = new Map<string, { vitro: THREE.BufferGeometry; kadro: THREE.BufferGeometry }>();

function fenestrajGeometrioj(ww: number, fenAlto: number, facaRadiuso: number,
  tieroAlto: number, vertikala: boolean
): { vitro: THREE.BufferGeometry; kadro: THREE.BufferGeometry } {
  const klavo = `${ww}|${fenAlto}|${facaRadiuso}|${tieroAlto}|${vertikala ? 1 : 0}`;
  const trovita = fenestrajKashmemoroj.get(klavo);
  if ( trovita ) return trovita;
  // ⟨ ការបង្វិលបញ្ឈរ 📃 ⟩
  const formo = kreiPilolFenestranFormon(ww, fenAlto);
  const vitro = new THREE.ShapeGeometry(formo, 0o100);
  if ( vertikala ) {
    vitro.rotateZ(Math.PI / 2);
    vitro.translate(fenAlto / 2, ww / 2, 0);
  }
  // ⟨ ស៊ុមមាសជាចានរាប 📃 ⟩
  // ⟨ ហេតុអ្វីផ្កាយហើម 📃 ⟩
  const kadroLargho = 0o1/0o10, kadroDikeco = 0o1/0o20;
  // ⟨ ចុងចំហៀងនៅលើមុខ 📃 ⟩
  // ⟨ ទំហំទទេប៉ុន្មាន 📃 ⟩
  const liberoLonga = vertikala ? ( tieroAlto - ww ) * 0o1/0o2 : facaRadiuso - ww * 0o1/0o2;
  const liberoMallonga = vertikala ? facaRadiuso - fenAlto * 0o1/0o2
    : ( tieroAlto - fenAlto ) * 0o1/0o2;
  const pintoSupre = fenAlto * 0o1/0o2;
  const pintoFlanko = Math.max(0, Math.min(pintoSupre, liberoLonga - kadroLargho - 0o1/0o100));
  const pintoMallonga = Math.max(0, Math.min(pintoSupre,
    liberoMallonga - kadroLargho - 0o1/0o100));
  // ⟨ គ្មានជ្រុង 📃 ⟩
  const stelo = rondigiKonturon(
    kreiStelanFenestranFormon(ww, fenAlto, kadroLargho, pintoFlanko, pintoMallonga).getPoints(0o20),
    kadroRondigo);
  const truo = kreiPilolFenestranFormon(ww - 0o1/0o100, fenAlto - 0o1/0o100).getPoints(0o20);
  stelo.holes.push(new THREE.Path(truo.reverse()));
  const kadro = new THREE.ExtrudeGeometry(stelo,
    { depth: kadroDikeco, bevelEnabled: false, curveSegments: 0o10 });
  if ( vertikala ) {
    kadro.rotateZ(Math.PI / 2);
    kadro.translate(fenAlto / 2, ww / 2, 0);
  }
  const nova = { vitro, kadro };
  fenestrajKashmemoroj.set(klavo, nova);
  return nova;
}

// ⟨ ពេលវាមានប្រយោជន៍ 📃 ⟩
export function aldoniPilolFenestron(
  group: THREE.Group, kadraMaterialo: THREE.MeshStandardMaterial,
  fenestraMaterialo: THREE.MeshStandardMaterial,
  facoIndekso: number, yCentro: number, facaRadiuso: number,
  klino: number, tieroAlto: number, fenAlto: number, suba = false, margxeno?: number,
  vertikala = false
): THREE.Mesh {
  const klinaAngulo = Math.atan(klino / tieroAlto);
  // ⟨ មាត្រវែង 📃 ⟩
  const ww = vertikala ? fenAlto * 0o2 : fenestraLargho(facaRadiuso, fenAlto, margxeno);
  // ⟨ មាត្របញ្ឈរបង្អួច 📃 ⟩
  const fenAltoTuta = vertikala ? ww : fenAlto;
  const faco = new THREE.Group();
  faco.rotation.y = facoIndekso * Math.PI / 2;
  const monto = new THREE.Group();
  monto.position.set(0, yCentro - fenAltoTuta / 2,
    fenestraSubFaco(facaRadiuso, klino, fenAltoTuta, tieroAlto, suba));
  monto.rotation.x = suba ? klinaAngulo : -klinaAngulo;
  faco.add(monto);
  const { vitro, kadro } = fenestrajGeometrioj(ww, fenAlto, facaRadiuso, tieroAlto, vertikala);
  const fen = new THREE.Mesh(vitro, fenestraMaterialo);
  monto.add(fen);
  monto.add(new THREE.Mesh(kadro, kadraMaterialo));
  group.add(faco);
  return fen;
}

export function fenestraMaterialo(): THREE.MeshStandardMaterial {
  return konstruajxaMaterialo("fenestro", () => kreiFenestranMaterialon());
}
