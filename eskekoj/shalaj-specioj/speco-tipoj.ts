// ≺⧼ ប្រភេទសត្វ 🐾 ⧽≻
import * as THREE from "three";

export interface Besto {
  hate: THREE.Group;
  korpo: THREE.Mesh;
  nar2sa?: THREE.Object3D;
  animajxoj: THREE.Object3D[];
  segmentoj: THREE.Object3D[];
  naĝiloj: THREE.Object3D[];
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
  speco: string;
  // ⟨ ជីពចរកតេណូផរ និងការរាបស្មើ 📃 ⟩
  pulsaRapido: number;
  pulsaForto: number;
  pulsaOndo: number;
  plata: number;
  bazaSkalo: THREE.Vector3;
}

export interface BestoSistemo {
  bestoj: Besto[];
  riverFn: ( x: number ) => number;
  akvoYFn: ( x: number ) => number;
  lago?: { x: number; z: number; r: number; vem2: number };
}

export interface SpecoMalneto {
  malneto: THREE.Group;
  platigxo: THREE.Vector3;
  teru: number;
  speco: string;
  mergo?: number;
  fundaMergo?: number;
  rapidaMultoblo?: number;
  ampleksaMultoblo?: number;
  // ⟨ ជីពចរកតេណូផរ 📃 ⟩
  pulsaRapido?: number;
  pulsaForto?: number;
  pulsaOndo?: number;
  plata?: number;
}
