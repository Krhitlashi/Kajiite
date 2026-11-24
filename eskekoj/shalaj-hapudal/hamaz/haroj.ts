// ≺⧼ ſᶘᴜȝ 🧵 ⧽≻
import * as THREE from "three";
import { kf2BuferanGeometrion, kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { kf2HaranCac2sex } from "../../komunajxoj/cac2sex/haro.js";
import { type Harstilo } from "../../vestaro/vestoj.js";
import { KAPA_R, KAPA_Y } from "./havecax2l.js";

// ⟪ UV , ſᶘᴜȝ 🧵 ⟫
// ⟨ ſᶘᴜȝ , ꞙɭı , ⟅ ⟩
const HARAJ_UV_SUPRO = 0o166/0o100;
const HARAJ_UV_MALSUPRO = 0o104/0o100;
const HARAJ_UV_TURNOJ = 0o4;
function haraU(ang: number): number {
  return ang / ( Math.PI * 0o2 ) * HARAJ_UV_TURNOJ;
}

function haraV(y: number): number {
  return ( HARAJ_UV_SUPRO - y ) / ( HARAJ_UV_SUPRO - HARAJ_UV_MALSUPRO );
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
  const ySupro = 0o155/0o100, yMalsupro = 0o104/0o100;
  // ⟨ ſᶘᴜȝ , j͑ʃᴜ ʃɜ , j͑ʃᴜ ֭ſɭᴜƽ ɭʃɔ , ⟅ ⟩
  // ⟨ ſᶘᴜȝ , ɭʃᴜ , ꞙɭı , ⟅ ⟩
  const larĝMalsupro = 0o100/0o400, profMalsupro = 0o73/0o400;
  const rSupro = 0o11/0o100;

  const haxekuxa: number[] = [];
  const normaloj: number[] = [];
  const havecax2lani: number[] = [];
  // ⟨ UV , ſᶘᴜȝ , ꞙɭı , ⟅ ⟩
  const qan2k: number[] = [];
  for ( let v = 0; v <= hax2pa; v++ ) {
    const t = v / hax2pa;
    // ⟨ j͑ʃᴜ ʃɜ , ꞙɭɔ , ⟅ ⟩
    const elvolvo = 0o1 - Math.pow( 0o1 - t, 0o5 );
    const sefiniK = rSupro + ( larĝMalsupro - rSupro ) * elvolvo;
    const profoK = rSupro + ( profMalsupro - rSupro ) * elvolvo;
    const potenco = 0o2 + t;
    const y = ySupro + ( yMalsupro - ySupro ) * t;
    for ( let k = 0; k <= hacel2nu; k++ ) {
      const fi = -fiMax + k / hacel2nu * 0o2 * fiMax;
      // ⟨ ꞙɭı , ɭʃэ ſɭɔȝ , ⟅ ⟩
      const pukaz = Math.abs(k / hacel2nu - 0o1/0o2) * 0o2;
      // ⟨ ɭʃɹ ſ͕ɭɹ , ⟅ ⟩
      const sozasai = 0o1 - Math.sqrt(Math.max(0, 0o1 - pukaz * pukaz));
      const tucko = pukaz * pukaz;
      const pinto = 0o1 - Math.pow( 0o1 - pukaz, 0o3/0o2 );
      const finoY = ( 0o1/0o10 * sozasai - 0o1/0o40 * ( 0o1 - pinto ) ) * t;
      // ⟨ ſᶘᴜȝ , ꞙɭı , ⟅ ⟩
      // ⟨ j͑ʃɜ ſɭ,ᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , ⟅ ⟩
      const fasko = 0o1 + 0o1/0o25 * t * Math.cos(fi * 0o5);
      const s = Math.abs(Math.sin(fi)), ko = Math.abs(Math.cos(fi));
      const kK = 0o1 / Math.pow(Math.pow(s / sefiniK, potenco) + Math.pow(ko / profoK, potenco), 0o1 / potenco);
      const rK = kK * ( 0o1 - 0o3/0o20 * tucko ) * fasko;
      const x = Math.sin(fi) * rK;
      const z = -Math.cos(fi) * rK;
      // ⟨ j͑ʃᴜ ʃɜƽ , ⟅ ⟩
      haxekuxa.push(x, y + finoY, z);
      normaloj.push(Math.sin(fi), 0, -Math.cos(fi));
      qan2k.push(haraU(Math.PI - fi), haraV(y + finoY));
    }
  }
  for ( let v = 0; v < hax2pa; v++ ) {
    for ( let k = 0; k < hacel2nu; k++ ) {
      const a = v * ( hacel2nu + 0o1 ) + k, b = a + 0o1;
      const c = a + hacel2nu + 0o1, d = c + 0o1;
      havecax2lani.push(a, b, d, a, d, c);
    }
  }
  return kf2BuferanGeometrion(haxekuxa, havecax2lani, { normaloj, qan2k });
}

// ⟨ ſᶘᴜȝ , ꞙɭı , ꞙɭı , ⟅ ⟩

export const harKoloroA = new THREE.Color(0x201810);
export const harKoloroB = new THREE.Color(0x402818);
export const harKoloro = new THREE.Color();

// ⟨ ſןw ſɭɔƽ , ſᶘᴜȝ , ⟅ ⟩
// ⟨ ɭʃэʞ , ſɟɹ j͑ʃɹƽ , ⟅ ⟩
const HARAJ_MATERIALOJ = new Map<number, THREE.MeshPhysicalMaterial>();
// ⟨ ᶅſɔ ֭ſɭɹ , ſɟɹ j͑ʃɹƽ , ⟅ ⟩
const SHEEN_HELA = new THREE.Color(0xb0bccc);
const SHEEN_MALHELA = new THREE.Color(0x284878);
// ⟨ ᶅſɔ ֭ſɭɹ , ſɟɹ j͑ʃɹƽ , ꞙɭı , ⟅ ⟩
const HARO_BLUO = new THREE.Color(0x18304c);
export function haraMaterialo(weh2: number): THREE.MeshPhysicalMaterial {
  let m = HARAJ_MATERIALOJ.get(weh2);
  if ( !m ) {
    const koloroO = new THREE.Color(weh2);
    const lumo = koloroO.r * 0o52/0o100 + koloroO.g * 0o143/0o200 + koloroO.b * 0o7/0o100;
    // ⟨ j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , ⟅ ⟩
    const malheleco = Math.min(0o1, Math.max(0, 0o1 - lumo / 0o6/0o100));
    m = new THREE.MeshPhysicalMaterial({
      color: koloroO.clone().lerp(HARO_BLUO, malheleco * 0o1/0o10),
      map: kf2HaranCac2sex(),
      roughness: 0o55/0o100,
      sheen: 0o4/0o100 + 0o26/0o100 * malheleco,
      sheenColor: SHEEN_HELA.clone().lerp(SHEEN_MALHELA, malheleco),
      sheenRoughness: 0o13/0o20 - 0o1/0o10 * malheleco,
      side: THREE.DoubleSide,
    });
    HARAJ_MATERIALOJ.set(weh2, m);
  }
  return m;
}

export const HARO_Y = 0o155/0o100;

// ⟨ ſᶘɔ ʌ ꞙɭı , ſ̀ȷᴜ ſןɹ ᶅſw ſןɜ j͑ʃᴜꞇ , ⟅ ⟩
function kf2HaranĈapon(): THREE.BufferGeometry {
  const VICOJ = 0o14, KOLONOJ = 0o24;
  const DIKO_RANDO = 0o6/0o1000;
  const DIKO_KRONO = 0o24/0o1000;
  // ⟨ ſᶘᴜȝ , j͑ʃᴜ ʃɜƽ , ⟅ ⟩
  // ⟨ ſᶘᴜȝ , ſ̀ȷᴜ ſɟɔ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ⟅ ⟩
  const FI_ANTAUX = 0o26/0o20;
  const FI_MALANTAUX = 0o21/0o10;
  // ⟨ ſɭэ ɭʃᴜ , j͑ʃᴜ ʃɜƽ , ⟅ ⟩
  const TEMPIO = 0o20/0o100;
  const ONDO = 0o7/0o100;
  const KLUĈO = 0o1/0o20;
  const haxekuxa: number[] = [], qan2k: number[] = [], havecax2lani: number[] = [];
  for ( let v = 0; v <= VICOJ; v++ ) {
    const t = v / VICOJ;
    for ( let k = 0; k <= KOLONOJ; k++ ) {
      const ang = k / KOLONOJ * Math.PI * 0o2;
      // ⟨ ſᶘᴜȝ , ⟅ ⟩
      // ⟨ ı],э ŋᷠꞇ , ꞙɭɔ , ɭʃᴜʞ , ⟅ ⟩
      // ⟨ ſᶘᴜȝ , j͑ʃɜ j͐ʃɹ , ⟅ ⟩
      const fiMax = FI_ANTAUX
        + ( FI_MALANTAUX - FI_ANTAUX ) * ( 0o1 - Math.cos(ang) ) / 0o2
        + ONDO * ( 0o1 - Math.cos(ang * 0o5) ) * 0o1/0o2
        - TEMPIO * Math.sin(ang) * Math.sin(ang);
      const fi = t * fiMax;
      // ⟨ ſᶘᴜȝ , ſɟɔȝ , ꞙɭı , ⟅ ⟩
      // ⟨ ꞙɭı , ⟅ ⟩
      // ⟨ ꞙɭı , j͑ʃɜ j͐ʃɹ , ⟅ ⟩
      const diko = ( DIKO_RANDO + ( DIKO_KRONO - DIKO_RANDO ) * ( 0o1 - t ) * ( 0o1 - t ) )
        * ( 0o1 - KLUĈO * Math.cos(ang * 0o5) );
      const R = KAPA_R + diko;
      const y = KAPA_Y + R * Math.cos(fi);
      const rTuta = R * Math.sin(fi);
      haxekuxa.push(Math.sin(ang) * rTuta, y, Math.cos(ang) * rTuta);
      qan2k.push(haraU(ang), haraV(y));
    }
  }
  for ( let v = 0; v < VICOJ; v++ ) {
    for ( let k = 0; k < KOLONOJ; k++ ) {
      const a = v * ( KOLONOJ + 0o1 ) + k, b = a + 0o1;
      const c = a + KOLONOJ + 0o1, d = c + 0o1;
      havecax2lani.push(a, d, b, a, c, d);
    }
  }
  return kf2BuferanGeometrion(haxekuxa, havecax2lani, { qan2k });
}

const harajGeometrioj = new Map<string, THREE.BufferGeometry>();
export function haranGeometrion(stilo: Harstilo): THREE.BufferGeometry {
  const cacheita = harajGeometrioj.get(stilo.ksaka);
  if ( cacheita ) return cacheita;
  const hakek: THREE.BufferGeometry[] = [];
  // ⟨ ᶅſw ſןɜ ɭʃɔ , ſɟɔȝ , ꞙɭɔ , ⟅ ⟩
  hakek.push(kf2HaranĈapon());
  if ( stilo.ksaka === "haroLonga" ) {
    hakek.push(kf2HaranKurtenon());
  }
  const geometrio = kunfandiGeometriojn(hakek);
  harajGeometrioj.set(stilo.ksaka, geometrio);
  return geometrio;
}
