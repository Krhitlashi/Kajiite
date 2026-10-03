// ≺⧼ ប្រភេទសត្វ 🐾 ⧽≻
import * as THREE from "three";

export interface Besto {
  grupo: THREE.Group;
  korpo: THREE.Mesh;
  vosto?: THREE.Object3D;
  animajxoj: THREE.Object3D[];
  segmentoj: THREE.Object3D[];
  naĝiloj: THREE.Object3D[];
  bazajKruroj: Array<{ kruro: THREE.Object3D; q: THREE.Quaternion; ankro: THREE.Vector3;
                       genuo?: THREE.Object3D; flanko: number }>;
  x: number;
  zOfseto: number;
  cz: number;
  enLago: boolean;
  nivelo?: number;
  bazaY: number;
  direkto: number;
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
  lago?: { x: number; z: number; r: number; nivelo: number };
}

export interface SpecoMalneto {
  malneto: THREE.Group;
  platigxo: THREE.Vector3;
  supro: number;
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
