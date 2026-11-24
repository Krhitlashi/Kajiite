// ≺⧼ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ j͑ʃᴜꞇ ʌ ֭ſɭw }ʃᴜȝ ⚓ ⧽≻
import * as THREE from "three";
import { VOJA_BORDA_SEFINI } from "../hak6h6/havecax2l.js";

// ⟨ ſɭɜ ſɭ,w }ʃw ʌ j͑ʃɔ ſȷꞇ }ʃꞇ ſɭэ ֭ſɭэ ʌ j͑ʃɔ ſȷꞇ }ʃꞇ 📏 ⟩ , ſɭɜ ſɭ,w }ʃw ʌ ſɭэ ֭ſɭэ
// ſɭɜ ſɭ,w }ʃw ʌ j͑ʃɔ ſȷꞇ }ʃꞇ ʌ DOKO_PLATFORMA_SEFINI ⟅
// ſɭɜ ſɭ,w }ʃw ʌ j͑ʃɔ ſȷꞇ }ʃꞇ ⟅ ſɭᴜ }ʃᴜȝ
// ſɭэ ֭ſɭэ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ ʌ ſɭɜ ſɭw j͐ʃᴜ ʌ ſɭᴜ ſ͕ȷɔ 📃 ⟩
export const DOKO_PLATFORMA_SEFINI = 0o16/0o10;
export const DOKO_JOQA_SEFINI = VOJA_BORDA_SEFINI;

export interface DokaSekcio {
  lx: number;
  lz: number;
  w: number;
  d: number;
  y: number;
}

export interface Qakaj2 {
  group: THREE.Group;
  x: number;
  z: number;
  platformWidth: number;
  platformDepth: number;
  platformY: number;
  landejaY: number;
  sekcioj: DokaSekcio[];
  stuparajPunktoj: [ number, number ][];
}
