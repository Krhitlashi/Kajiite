// ≺⧼ ប្រភេទចំណត ⚓ ⧽≻
import * as THREE from "three";
import { VOJA_BORDA_LARĜO } from "../vojoj/mezuroj.js";

// ⟨ ទទឹងចំណតស្មើទទឹងផ្លូវ 📏 ⟩ ៖ ចំណតត្រូវធំល្មមនឹងផ្លូវដែលមកដល់ ។
// ទទឹងកណ្តាលរបស់ចំណតគឺ DOKO_PLATFORMA_LARĜO ៖ តម្លៃនេះបញ្ជូនទៅជណ្តើរចំណតជា
// ទទឹងកណ្តាលដែរ ។ ស្មាថ្មរបស់ចំណតត្រូវស្មើស្មាផ្លូវ , បើមិនដូច្នេះផ្លូវ
// លាតហួសចំណត ហើយឃើញជាជំហានតូចនៅគែមទាំងពីរ ។ 📃 ⟩
export const DOKO_PLATFORMA_LARĜO = 0o16/0o10;
export const DOKO_KADRA_LARĜO = VOJA_BORDA_LARĜO;

export interface DokaSekcio {
  lx: number;
  lz: number;
  w: number;
  d: number;
  y: number;
}

export interface Doko {
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
