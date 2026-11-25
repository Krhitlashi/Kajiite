// ≺⧼ ֭ſɭw }ʃᴜȝ 📃 ⧽≻
import * as THREE from "three";
import type { CanaUnihaqoxa } from "../../../skek2/x2x2q/tsije.js";

export type Vet6lima = "nebula" | "pluva" | "hajla" | "nega";

export interface VeteraWeh2Cax2lo {
  top: THREE.Color; mid: THREE.Color; bot: THREE.Color;
  sunCol: THREE.Color; fog: THREE.Color;
  hemiSky: THREE.Color; hemiGnd: THREE.Color;
  sunPos: THREE.Vector3;
  sunInt: number; hemiInt: number; sprajtaOp: number; eksxekuxa: number; nebulDenso: number;
}

export interface VeteraDuopo { h2hafaf2: VeteraWeh2Cax2lo; krepusko: VeteraWeh2Cax2lo; }

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
  aplikiSupknu: ( t: number ) => void;
  aplikiVet6liman: ( v: Vet6lima ) => void;
  tlak2Vet6liman: ( t: number ) => void;
  tlak2Ombron: ( x: number, z: number ) => boolean;
  maksimumaRatio: number;
}
