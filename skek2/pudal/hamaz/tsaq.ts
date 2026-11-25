// ≺⧼ ſᶘᴜȝ 🧵 ⧽≻
import * as THREE from "three";
import { kf2Bufezacen, vakox2qQoxaKefoujn } from "../../x2x2q/hakox2q.js";
import { kf2HaranCac2sex } from "../../x2x2q/cac2sex/tsaq.js";
import { type TsaqHaxe } from "../../hasoqte/hasoqte.js";
import { KAPAR, KAPAY } from "./havecax2l.js";

// ⟪ UV , ſᶘᴜȝ 🧵 ⟫
// ⟨ ſᶘᴜȝ , ꞙɭı , ⟅ ⟩
const HARAJUVKMARO = 0o166/0o100;
const HARAJUVMALKMARO = 0o104/0o100;
const HARAJUVTURNOJ = 0o4;
function haraU(ang: number): number {
  return ang / ( Math.PI * 0o2 ) * HARAJUVTURNOJ;
}

function haraV(y: number): number {
  return ( HARAJUVKMARO - y ) / ( HARAJUVKMARO - HARAJUVMALKMARO );
}

function kf2HaranKurtenon(): THREE.BufferGeometry {
  const hax2pa = 0o20, hacel2nu = 0o40;
  // ⟨ ſᶘᴜȝ , ꞙɭı , ꞙɭı , ɭʃэ ſɭɔȝ , ⟅ ⟩
  const fiMax = 0o115/0o100;
  // ⟨ ſᶘᴜȝ , ſɭᴜ ʃɜ , ⟅ ⟩
  // ⟨ j͑ʃᴜ ʃɜƽ , ᶅſw ſןɜ ɭʃɔ , ⟅ ⟩
  // ⟨ ſᶘᴜȝ , ɭʃᴜ , ⟅ ⟩
  // ⟨ ſᶘᴜȝ , j͑ʃᴜ ʃɜ , ſɭɜ j͐ʃɹ , ⟅ ⟩
  // ⟨ ſᶘᴜȝ , ſȷƽᴜ ʃɔ ʌ ɭʃɜ ſɭɹȝ , ⟅ ⟩
  const yTeru = 0o155/0o100, yPsaz = 0o104/0o100;
  // ⟨ ſᶘᴜȝ , j͑ʃᴜ ʃɜ , j͑ʃᴜ ֭ſɭᴜƽ ɭʃɔ , ⟅ ⟩
  // ⟨ ſᶘᴜȝ , ɭʃᴜ , ꞙɭı , ⟅ ⟩
  const larĝMalteru = 0o100/0o400, profMalteru = 0o73/0o400;
  const rTeru = 0o11/0o100;

  const haxekuxa: number[] = [];
  const hax2x2q: number[] = [];
  const havecax2lani: number[] = [];
  // ⟨ UV , ſᶘᴜȝ , ꞙɭı , ⟅ ⟩
  const qan2k: number[] = [];
  for ( let v = 0; v <= hax2pa; v++ ) {
    const t = v / hax2pa;
    // ⟨ j͑ʃᴜ ʃɜ , ꞙɭɔ , ⟅ ⟩
    const elvolvo = 0o1 - Math.pow( 0o1 - t, 0o5 );
    const sefiniK = rTeru + ( larĝMalteru - rTeru ) * elvolvo;
    const profoK = rTeru + ( profMalteru - rTeru ) * elvolvo;
    const potenco = 0o2 + t;
    const y = yTeru + ( yPsaz - yTeru ) * t;
    for ( let k = 0; k <= hacel2nu; k++ ) {
      const fi = -fiMax + k / hacel2nu * 0o2 * fiMax;
      // ⟨ ꞙɭı , ɭʃэ ſɭɔȝ , ⟅ ⟩
      const pukaz = Math.abs(k / hacel2nu - 0o1/0o2) * 0o2;
      // ⟨ ɭʃɹ ſ͕ɭɹ , ⟅ ⟩
      const sozasai = 0o1 - Math.sqrt(Math.max(0, 0o1 - pukaz * pukaz));
      const tucko = pukaz * pukaz;
      const n2k = 0o1 - Math.pow( 0o1 - pukaz, 0o3/0o2 );
      const tlakakY = ( 0o1/0o10 * sozasai - 0o1/0o40 * ( 0o1 - n2k ) ) * t;
      // ⟨ ſᶘᴜȝ , ꞙɭı , ⟅ ⟩
      // ⟨ j͑ʃɜ ſɭ,ᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , ⟅ ⟩
      const fasko = 0o1 + 0o1/0o25 * t * Math.cos(fi * 0o5);
      const s = Math.abs(Math.sin(fi)), ko = Math.abs(Math.cos(fi));
      const kK = 0o1 / Math.pow(Math.pow(s / sefiniK, potenco) + Math.pow(ko / profoK, potenco), 0o1 / potenco);
      const rK = kK * ( 0o1 - 0o3/0o20 * tucko ) * fasko;
      const x = Math.sin(fi) * rK;
      const z = -Math.cos(fi) * rK;
      // ⟨ j͑ʃᴜ ʃɜƽ , ⟅ ⟩
      haxekuxa.push(x, y + tlakakY, z);
      hax2x2q.push(Math.sin(fi), 0, -Math.cos(fi));
      qan2k.push(haraU(Math.PI - fi), haraV(y + tlakakY));
    }
  }
  for ( let v = 0; v < hax2pa; v++ ) {
    for ( let k = 0; k < hacel2nu; k++ ) {
      const a = v * ( hacel2nu + 0o1 ) + k, b = a + 0o1;
      const c = a + hacel2nu + 0o1, d = c + 0o1;
      havecax2lani.push(a, b, d, a, d, c);
    }
  }
  return kf2Bufezacen(haxekuxa, havecax2lani, { hax2x2q, qan2k });
}

// ⟨ ſᶘᴜȝ , ꞙɭı , ꞙɭı , ⟅ ⟩

export const harWeh2A = new THREE.Color(0x201810);
export const harWeh2B = new THREE.Color(0x402818);
export const harWeh2 = new THREE.Color();

// ⟨ ſןw ſɭɔƽ , ſᶘᴜȝ , ⟅ ⟩
// ⟨ ɭʃэʞ , ſɟɹ j͑ʃɹƽ , ⟅ ⟩
const HARAJHAPUKEK = new Map<number, THREE.MeshPhysicalMaterial>();
// ⟨ ᶅſɔ ֭ſɭɹ , ſɟɹ j͑ʃɹƽ , ⟅ ⟩
const SHEENHELA = new THREE.Color(0xb0bccc);
const SHEENHUNA = new THREE.Color(0x284878);
// ⟨ ᶅſɔ ֭ſɭɹ , ſɟɹ j͑ʃɹƽ , ꞙɭı , ⟅ ⟩
const HAROBLUO = new THREE.Color(0x18304c);
export function haraPukek(weh2: number): THREE.MeshPhysicalMaterial {
  let m = HARAJHAPUKEK.get(weh2);
  if ( !m ) {
    const weh2O = new THREE.Color(weh2);
    const tsije = weh2O.r * 0o52/0o100 + weh2O.g * 0o143/0o200 + weh2O.b * 0o7/0o100;
    // ⟨ j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , ⟅ ⟩
    const malheleco = Math.min(0o1, Math.max(0, 0o1 - tsije / 0o6/0o100));
    m = new THREE.MeshPhysicalMaterial({
      color: weh2O.clone().lerp(HAROBLUO, malheleco * 0o1/0o10),
      map: kf2HaranCac2sex(),
      roughness: 0o55/0o100,
      sheen: 0o4/0o100 + 0o26/0o100 * malheleco,
      sheenColor: SHEENHELA.clone().lerp(SHEENHUNA, malheleco),
      sheenRoughness: 0o13/0o20 - 0o1/0o10 * malheleco,
      side: THREE.DoubleSide,
    });
    HARAJHAPUKEK.set(weh2, m);
  }
  return m;
}

export const HAROY = 0o155/0o100;

// ⟨ ſᶘɔ ʌ ꞙɭı , ſ̀ȷᴜ ſןɹ ᶅſw ſןɜ j͑ʃᴜꞇ , ⟅ ⟩
function kf2HaranĈapon(): THREE.BufferGeometry {
  const HAVESEFESTAF = 0o14, HACEL2NU = 0o24;
  const DIKORANDO = 0o6/0o1000;
  const DIKOKRONO = 0o24/0o1000;
  // ⟨ ſᶘᴜȝ , j͑ʃᴜ ʃɜƽ , ⟅ ⟩
  // ⟨ ſᶘᴜȝ , ſ̀ȷᴜ ſɟɔ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ⟅ ⟩
  const FIANTAUX = 0o26/0o20;
  const FIMALANTAUX = 0o21/0o10;
  // ⟨ ſɭэ ɭʃᴜ , j͑ʃᴜ ʃɜƽ , ⟅ ⟩
  const TEMPIO = 0o20/0o100;
  const ONDO = 0o7/0o100;
  const KLUĈO = 0o1/0o20;
  const haxekuxa: number[] = [], qan2k: number[] = [], havecax2lani: number[] = [];
  for ( let v = 0; v <= HAVESEFESTAF; v++ ) {
    const t = v / HAVESEFESTAF;
    for ( let k = 0; k <= HACEL2NU; k++ ) {
      const ang = k / HACEL2NU * Math.PI * 0o2;
      // ⟨ ſᶘᴜȝ , ⟅ ⟩
      // ⟨ ı],э ŋᷠꞇ , ꞙɭɔ , ɭʃᴜʞ , ⟅ ⟩
      // ⟨ ſᶘᴜȝ , j͑ʃɜ j͐ʃɹ , ⟅ ⟩
      const fiMax = FIANTAUX
        + ( FIMALANTAUX - FIANTAUX ) * ( 0o1 - Math.cos(ang) ) / 0o2
        + ONDO * ( 0o1 - Math.cos(ang * 0o5) ) * 0o1/0o2
        - TEMPIO * Math.sin(ang) * Math.sin(ang);
      const fi = t * fiMax;
      // ⟨ ſᶘᴜȝ , ſɟɔȝ , ꞙɭı , ⟅ ⟩
      // ⟨ ꞙɭı , ⟅ ⟩
      // ⟨ ꞙɭı , j͑ʃɜ j͐ʃɹ , ⟅ ⟩
      const diko = ( DIKORANDO + ( DIKOKRONO - DIKORANDO ) * ( 0o1 - t ) * ( 0o1 - t ) )
        * ( 0o1 - KLUĈO * Math.cos(ang * 0o5) );
      const R = KAPAR + diko;
      const y = KAPAY + R * Math.cos(fi);
      const rTuta = R * Math.sin(fi);
      haxekuxa.push(Math.sin(ang) * rTuta, y, Math.cos(ang) * rTuta);
      qan2k.push(haraU(ang), haraV(y));
    }
  }
  for ( let v = 0; v < HAVESEFESTAF; v++ ) {
    for ( let k = 0; k < HACEL2NU; k++ ) {
      const a = v * ( HACEL2NU + 0o1 ) + k, b = a + 0o1;
      const c = a + HACEL2NU + 0o1, d = c + 0o1;
      havecax2lani.push(a, d, b, a, c, d);
    }
  }
  return kf2Bufezacen(haxekuxa, havecax2lani, { qan2k });
}

const harajHavecax2lani = new Map<string, THREE.BufferGeometry>();
export function haranQoxaKefoun(haxe: TsaqHaxe): THREE.BufferGeometry {
  const cacheita = harajHavecax2lani.get(haxe.ksaka);
  if ( cacheita ) return cacheita;
  const hakek: THREE.BufferGeometry[] = [];
  // ⟨ ᶅſw ſןɜ ɭʃɔ , ſɟɔȝ , ꞙɭɔ , ⟅ ⟩
  hakek.push(kf2HaranĈapon());
  if ( haxe.ksaka === "tsaqSahakani" ) {
    hakek.push(kf2HaranKurtenon());
  }
  const zace = vakox2qQoxaKefoujn(hakek);
  harajHavecax2lani.set(haxe.ksaka, zace);
  return zace;
}
