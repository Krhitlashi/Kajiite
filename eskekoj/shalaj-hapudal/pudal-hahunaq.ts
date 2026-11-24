// ≺⧼ ſןᴜ ſ͔ɭᴜ j͑ʃᴜꞇ ʌ ֭ſɭw }ʃᴜȝ 🐾 ⧽≻
import * as THREE from "three";

export interface Paga {
  hate: THREE.Group;
  korpo: THREE.Mesh;
  nar2sa?: THREE.Object3D;
  animajxoj: THREE.Object3D[];
  has2nasce: THREE.Object3D[];
  hakaca: THREE.Object3D[];
  bazajKruroj: Array<{ kruro: THREE.Object3D; q: THREE.Quaternion; ankro: THREE.Vector3;
                       genuo?: THREE.Object3D; kanto: number }>;
  x: number;
  zOfseto: number;
  cz: number;
  enLago: boolean;
  vem2?: number;
  bazaY: number;
  c2w2q: number;
  turno: number;
  phase: number;
  amplitudo: number;
  rapido: number;
  pudal: string;
  // ⟨ j͑ʃɹ }ʃɹ ɭʃᴜ , ſɭɜ ſɭ,w ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
  pulsaRapido: number;
  pulsaForto: number;
  pulsaOndo: number;
  plata: number;
  bazaSkalo: THREE.Vector3;
}

export interface PagaSistemo {
  hapaga: Paga[];
  riverFn: ( x: number ) => number;
  akvoYFn: ( x: number ) => number;
  lago?: { x: number; z: number; r: number; vem2: number };
}

export interface PudalMalneto {
  malneto: THREE.Group;
  platigxo: THREE.Vector3;
  teru: number;
  pudal: string;
  mergo?: number;
  fundaMergo?: number;
  seheMultoblo?: number;
  ampleksaMultoblo?: number;
  // ⟨ j͑ʃɹ }ʃɹ ɭʃᴜ 📃 ⟩
  pulsaRapido?: number;
  pulsaForto?: number;
  pulsaOndo?: number;
  plata?: number;
}
