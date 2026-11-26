// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſןw ɭ(ᴜ j͐ʃᴜ̩ ֭ſɭw }ʃᴜȝ 📃 ⧽≻

import * as THREE from "three";

export interface Paga {
  hate2: THREE.Group;
  soq: THREE.Mesh;
  nar2sa?: THREE.Object3D;
  hatahalaqaz: THREE.Object3D[];
  has2nasce: THREE.Object3D[];
  hakaca: THREE.Object3D[];
  kozunuKruroj: Array<{ nasce: THREE.Object3D; q: THREE.Quaternion; cakukkaj2sai: THREE.Vector3;
                       tafanitamcesai?: THREE.Object3D; vek2fe: number }>;
  x: number;
  zOfseto: number;
  cz: number;
  enS2xuru: boolean;
  vem2?: number;
  kozunuY: number;
  c2w2q: number;
  b6n: number;
  phase: number;
  amplitudo: number;
  seheni: number;
  pudal: string;

  pulsaSeheni: number;
  pulsaG2sa: number;
  pulsaOndo: number;
  tap2: number;
  kozunuP6zuk: THREE.Vector3;
}

export interface PagaKanta {
  hapaga: Paga[];
  riverFn: ( x: number ) => number;
  tsasaYFn: ( x: number ) => number;
  s2xuru?: { x: number; z: number; r: number; vem2: number };
}

export interface PudalMalneto {
  malneto: THREE.Group;
  tap2: THREE.Vector3;
  teru: number;
  pudal: string;
  mergo?: number;
  fundaMergo?: number;
  seheMultoblo?: number;
  ampleksaMultoblo?: number;

  pulsaSeheni?: number;
  pulsaG2sa?: number;
  pulsaOndo?: number;
  tap2igxo?: number;
}
