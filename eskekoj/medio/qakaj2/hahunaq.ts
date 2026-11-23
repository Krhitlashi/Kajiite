// ≺⧼ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ j͑ʃᴜꞇ ʌ ֭ſɭw }ʃᴜȝ ⚓ ⧽≻
import * as THREE from "three";
import { VOJA_BORDA_SEFINI } from "../hak6h6/havecax2l.js";

// ⟨ ទទឹងចំណតស្មើទទឹងផ្លូវ 📏 ⟩ ៖ ចំណតត្រូវធំល្មមនឹងផ្លូវដែលមកដល់ ។
// ទទឹងកណ្តាលរបស់ចំណតគឺ DOKO_PLATFORMA_SEFINI ៖ តម្លៃនេះបញ្ជូនទៅជណ្តើរចំណតជា
// ទទឹងកណ្តាលដែរ ។ ស្មាថ្មរបស់ចំណតត្រូវស្មើស្មាផ្លូវ , បើមិនដូច្នេះផ្លូវ
// លាតហួសចំណត ហើយឃើញជាជំហានតូចនៅគែមទាំងពីរ ។ 📃 ⟩
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
