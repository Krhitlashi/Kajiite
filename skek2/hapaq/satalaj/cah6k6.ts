// ≺⧼ ſɟᴜ ֭ſɭэ ſɭэ ʌ j͐ʃэƽ j͐ʃэƴ ꞁȷ̀ᴜꞇ 🪟 ⧽≻
import * as THREE from "three";
import { kf2Cah6k6Pukek } from "../../x2x2q/pukek.js";
import { kf2Cawez2Qoxa, kf2SexiQoxa, veb6qaiPukaz, kf2Xiix2qQan2k } from "../../x2x2q/haqoxa.js";
import { paqPukek } from "./hahunaq.js";

// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const fenProud = 0o1/0o100;

const joqaRondigo = 0o1/0o20;

export function fenestraSubFaco(facaKa5ik: number, s2sabo: number, fenL6da: number,
  b6k61oL6da: number, psaz = false
): number {
  const klinaTafkaq = Math.atan(s2sabo / b6k61oL6da);
  return facaKa5ik + ( psaz ? -0o1 : 0o1 ) * s2sabo * fenL6da / ( 0o2 * b6k61oL6da )
    + fenProud / Math.cos(klinaTafkaq);
}

// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
// ⟨ ſɭэ ſɭᴜ , ꞙɭэ , 📃 ⟩
export function fenestraMargxeno(facaKa5ikLarga: number): number {
  return facaKa5ikLarga * 0o2/0o10;
}

// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
export function fenestraSefini(facaKa5ik: number, fenL6da: number, pukazBendo?: number): number {
  if ( pukazBendo !== undefined ) return facaKa5ik * 0o2 - pukazBendo * 0o2;
  return Math.min(facaKa5ik * 0o2 - 0o3/0o10, facaKa5ik * 0o4/0o3 + 0o1/0o4, fenL6da * 0o11);
}

// ⟨ ſ͕ɭɜ ı],ᴜ , ɭl̀ɜ ſ͕ɭᴜ , 📃 ⟩
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
const fenestrajKashmemoroj = new Map<string, { vitro: THREE.BufferGeometry; joqa: THREE.BufferGeometry }>();

function fenestrajHavecax2lani(ww: number, fenL6da: number, facaKa5ik: number,
  b6k61oL6da: number, vertikala: boolean
): { vitro: THREE.BufferGeometry; joqa: THREE.BufferGeometry } {
  const ca3aq = `${ww}|${fenL6da}|${facaKa5ik}|${b6k61oL6da}|${vertikala ? 0o1 : 0o0}`;
  const kawake = fenestrajKashmemoroj.get(ca3aq);
  if ( kawake ) return kawake;
// ⟨ ſȷƽᴜ ʃɔ , 📃 ⟩
  const qoxa = kf2Cawez2Qoxa(ww, fenL6da);
  const vitro = new THREE.ShapeGeometry(qoxa, 0o20);
  if ( vertikala ) {
    vitro.rotateZ(Math.PI / 0o2);
    vitro.translate(fenL6da / 0o2, ww / 0o2, 0o0);
  }
// ⟨ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
  const joqaSefini = 0o1/0o10, joqaKof = 0o1/0o20;
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
  const liberoSahakani = vertikala ? ( b6k61oL6da - ww ) * 0o1/0o2 : facaKa5ik - ww * 0o1/0o2;
  const liberoC2na = vertikala ? facaKa5ik - fenL6da * 0o1/0o2
    : ( b6k61oL6da - fenL6da ) * 0o1/0o2;
  const cet2Tik = fenL6da * 0o1/0o2;
  const cet2Flanko = Math.max(0o0, Math.min(cet2Tik, liberoSahakani - joqaSefini - 0o1/0o100));
  const cet2C2na = Math.max(0o0, Math.min(cet2Tik,
    liberoC2na - joqaSefini - 0o1/0o100));
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı , 📃 ⟩
  const sexi = veb6qaiPukaz(
    kf2SexiQoxa(ww, fenL6da, joqaSefini, cet2Flanko, cet2C2na).getPoints(0o10),
    joqaRondigo);
  const truo = kf2Cawez2Qoxa(ww - 0o1/0o100, fenL6da - 0o1/0o100).getPoints(0o10);
  sexi.holes.push(new THREE.Path(truo.reverse()));
  const joqa = new THREE.ExtrudeGeometry(sexi,
    { depth: joqaKof, bevelEnabled: false, curveSegments: 0o4 });
  if ( vertikala ) {
    joqa.rotateZ(Math.PI / 0o2);
    joqa.translate(fenL6da / 0o2, ww / 0o2, 0o0);
  }
  const sef4 = { vitro: kf2Xiix2qQan2k(vitro), joqa: kf2Xiix2qQan2k(joqa) };
  fenestrajKashmemoroj.set(ca3aq, sef4);
  return sef4;
}

// ⟨ ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
export function tlunakPilolCah6k6(
  group: THREE.Group, joqaPukek: THREE.MeshStandardMaterial,
  fenestraPukek: THREE.MeshStandardMaterial,
  facoVecax2l: number, ySost2: number, facaKa5ik: number,
  s2sabo: number, b6k61oL6da: number, fenL6da: number, psaz = false, pukazBendo?: number,
  vertikala = false
): THREE.Mesh {
  const klinaTafkaq = Math.atan(s2sabo / b6k61oL6da);
// ⟨ ſɭэ ſɭᴜ , 📃 ⟩
  const ww = vertikala ? fenL6da * 0o2 : fenestraSefini(facaKa5ik, fenL6da, pukazBendo);
// ⟨ ſɭᴜ ſןᴜ , ſȷƽᴜ ʃɔ , 📃 ⟩
  const fenL6daTuta = vertikala ? ww : fenL6da;
  const faco = new THREE.Group();
  faco.rotation.y = facoVecax2l * Math.PI / 0o2;
  const monto = new THREE.Group();
  monto.position.set(0o0, ySost2 - fenL6daTuta / 0o2,
    fenestraSubFaco(facaKa5ik, s2sabo, fenL6daTuta, b6k61oL6da, psaz));
  monto.rotation.x = psaz ? klinaTafkaq : -klinaTafkaq;
  faco.add(monto);
  const { vitro, joqa } = fenestrajHavecax2lani(ww, fenL6da, facaKa5ik, b6k61oL6da, vertikala);
  const fen = new THREE.Mesh(vitro, fenestraPukek);
  monto.add(fen);
  monto.add(new THREE.Mesh(joqa, joqaPukek));
  group.add(faco);
  return fen;
}

export function fenestraPukek(): THREE.MeshStandardMaterial {
  return paqPukek("cah6k6", () => kf2Cah6k6Pukek());
}
