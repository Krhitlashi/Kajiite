// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ֭ſɭᴜ ֭ſɭw }ʃᴜȝ 📃 ⧽≻

import * as THREE from "three";
import type { CanaUnihaqoxa } from "../../../skek2/p6kpu/1ije.js";

export type Vet6lima = "nebula" | "pluva" | "hajla" | "nega";

export interface Vet6Haweh2Cax2lo {
  soza: THREE.Color; sost2: THREE.Color; psaz: THREE.Color;
  sunaHaweh2: THREE.Color; maha: THREE.Color;
  hemiCana: THREE.Color; hemiKozu: THREE.Color;
  sunaHaxekuxa: THREE.Vector3;
  sunaVem2: number; hemiVem2: number; sprajtaVem2: number; t6fani: number; mahaVem2: number;
}

export interface Vet6Kcakca { h2hafaf2: Vet6Haweh2Cax2lo; pukobestaf: Vet6Haweh2Cax2lo; }

export interface ScenaKanta {
  k2fcakuk: THREE.WebGLRenderer;
  qena: THREE.Scene;
  catahaq: THREE.PerspectiveCamera;
  dioritaPukek: THREE.MeshStandardMaterial;
  andezitaPukek: THREE.MeshStandardMaterial;
  eniraPukek: THREE.MeshStandardMaterial;
  oraPukek: THREE.MeshStandardMaterial;
  cana: THREE.Mesh;
  canaajUnihaqoxa: CanaUnihaqoxa;
  hemiTsije: THREE.HemisphereLight;
  suna: THREE.DirectionalLight;
  sunaSprajto: THREE.Sprite;
  k2reiSupknu: ( t: number ) => void;
  k2reiVet6liman: ( v: Vet6lima ) => void;
  tlak2Vet6liman: ( t: number ) => void;
  tlak2Ombron: ( x: number, z: number ) => boolean;
  maksimumaRatio: number;
}
