// ≺⧼ ſɟᴜ ֭ſɭэ ſɭэ ʌ j͐ʃэƽ j͐ʃэƴ ꞁȷ̀ᴜꞇ 🪟 ⧽≻
import * as THREE from "three";
import { kf2Cah6k6Pukek } from "../../komunajxoj/materialoj.js";
import { kf2Cawez2Qoxa, kf2SexiQoxa, veb6qaiPukaz, kf2X2x2qQan2k } from "../../komunajxoj/haqoxa.js";
import { paqMaterialo } from "./hahunaq.js";

// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const fenProud = 0o1/0o100;

const joqaRondigo = 0o1/0o20;

export function fenestraSubFaco(facaRadiuso: number, klino: number, fenAlto: number,
  tieroAlto: number, psaz = false
): number {
  const klinaAngulo = Math.atan(klino / tieroAlto);
  return facaRadiuso + ( psaz ? -1 : 1 ) * klino * fenAlto / ( 2 * tieroAlto )
    + fenProud / Math.cos(klinaAngulo);
}

// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
// ⟨ ſɭэ ſɭᴜ , ꞙɭэ , 📃 ⟩
export function fenestraMargxeno(facaRadiusoLarga: number): number {
  return facaRadiusoLarga * 0o2/0o10;
}

// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
export function fenestraLargho(facaRadiuso: number, fenAlto: number, margxeno?: number): number {
  if ( margxeno !== undefined ) return facaRadiuso * 2 - margxeno * 2;
  return Math.min(facaRadiuso * 2 - 0o3/0o10, facaRadiuso * 4/3 + 0o1/0o4, fenAlto * 0o11);
}

// ⟨ ſ͕ɭɜ ı],ᴜ , ɭl̀ɜ ſ͕ɭᴜ , 📃 ⟩
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
const fenestrajKashmemoroj = new Map<string, { vitro: THREE.BufferGeometry; joqa: THREE.BufferGeometry }>();

function fenestrajGeometrioj(ww: number, fenAlto: number, facaRadiuso: number,
  tieroAlto: number, vertikala: boolean
): { vitro: THREE.BufferGeometry; joqa: THREE.BufferGeometry } {
  const ca3aq = `${ww}|${fenAlto}|${facaRadiuso}|${tieroAlto}|${vertikala ? 1 : 0}`;
  const trovita = fenestrajKashmemoroj.get(ca3aq);
  if ( trovita ) return trovita;
// ⟨ ſȷƽᴜ ʃɔ , 📃 ⟩
  const qoxa = kf2Cawez2Qoxa(ww, fenAlto);
  const vitro = new THREE.ShapeGeometry(qoxa, 0o20);
  if ( vertikala ) {
    vitro.rotateZ(Math.PI / 2);
    vitro.translate(fenAlto / 2, ww / 2, 0);
  }
// ⟨ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
  const joqaLargho = 0o1/0o10, joqaDikeco = 0o1/0o20;
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
  const liberoLonga = vertikala ? ( tieroAlto - ww ) * 0o1/0o2 : facaRadiuso - ww * 0o1/0o2;
  const liberoMallonga = vertikala ? facaRadiuso - fenAlto * 0o1/0o2
    : ( tieroAlto - fenAlto ) * 0o1/0o2;
  const pintoSupre = fenAlto * 0o1/0o2;
  const pintoFlanko = Math.max(0, Math.min(pintoSupre, liberoLonga - joqaLargho - 0o1/0o100));
  const pintoMallonga = Math.max(0, Math.min(pintoSupre,
    liberoMallonga - joqaLargho - 0o1/0o100));
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı , 📃 ⟩
  const stelo = veb6qaiPukaz(
    kf2SexiQoxa(ww, fenAlto, joqaLargho, pintoFlanko, pintoMallonga).getPoints(0o10),
    joqaRondigo);
  const truo = kf2Cawez2Qoxa(ww - 0o1/0o100, fenAlto - 0o1/0o100).getPoints(0o10);
  stelo.holes.push(new THREE.Path(truo.reverse()));
  const joqa = new THREE.ExtrudeGeometry(stelo,
    { depth: joqaDikeco, bevelEnabled: false, curveSegments: 0o4 });
  if ( vertikala ) {
    joqa.rotateZ(Math.PI / 2);
    joqa.translate(fenAlto / 2, ww / 2, 0);
  }
  const sef4 = { vitro: kf2X2x2qQan2k(vitro), joqa: kf2X2x2qQan2k(joqa) };
  fenestrajKashmemoroj.set(ca3aq, sef4);
  return sef4;
}

// ⟨ ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
export function aldoniPilolFenestron(
  group: THREE.Group, joqaMaterialo: THREE.MeshStandardMaterial,
  fenestraMaterialo: THREE.MeshStandardMaterial,
  facoIndekso: number, yCentro: number, facaRadiuso: number,
  klino: number, tieroAlto: number, fenAlto: number, psaz = false, margxeno?: number,
  vertikala = false
): THREE.Mesh {
  const klinaAngulo = Math.atan(klino / tieroAlto);
// ⟨ ſɭэ ſɭᴜ , 📃 ⟩
  const ww = vertikala ? fenAlto * 0o2 : fenestraLargho(facaRadiuso, fenAlto, margxeno);
// ⟨ ſɭᴜ ſןᴜ , ſȷƽᴜ ʃɔ , 📃 ⟩
  const fenAltoTuta = vertikala ? ww : fenAlto;
  const faco = new THREE.Group();
  faco.rotation.y = facoIndekso * Math.PI / 2;
  const monto = new THREE.Group();
  monto.position.set(0, yCentro - fenAltoTuta / 2,
    fenestraSubFaco(facaRadiuso, klino, fenAltoTuta, tieroAlto, psaz));
  monto.rotation.x = psaz ? klinaAngulo : -klinaAngulo;
  faco.add(monto);
  const { vitro, joqa } = fenestrajGeometrioj(ww, fenAlto, facaRadiuso, tieroAlto, vertikala);
  const fen = new THREE.Mesh(vitro, fenestraMaterialo);
  monto.add(fen);
  monto.add(new THREE.Mesh(joqa, joqaMaterialo));
  group.add(faco);
  return fen;
}

export function fenestraMaterialo(): THREE.MeshStandardMaterial {
  return paqMaterialo("fenestro", () => kf2Cah6k6Pukek());
}
