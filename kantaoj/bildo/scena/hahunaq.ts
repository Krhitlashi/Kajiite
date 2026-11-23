// ≺⧼ ֭ſɭw }ʃᴜȝ 📃 ⧽≻
import * as THREE from "three";
import type { CxielajUnihaqoxa } from "../../../eskekoj/komunajxoj/lumo.js";

export type Vetero = "nebula" | "pluva" | "hajla" | "nega";

export interface VeteraPaletro {
  top: THREE.Color; mid: THREE.Color; bot: THREE.Color;
  sunCol: THREE.Color; fog: THREE.Color;
  hemiSky: THREE.Color; hemiGnd: THREE.Color;
  sunPos: THREE.Vector3;
  sunInt: number; hemiInt: number; sprajtaOp: number; eksxekuxa: number; nebulDenso: number;
}

export interface VeteraDuopo { tago: VeteraPaletro; krepusko: VeteraPaletro; }

export interface ScenaSistemo {
  bildilo: THREE.WebGLRenderer;
  qena: THREE.Scene;
  fotilo: THREE.PerspectiveCamera;
  dioritaMaterialo: THREE.MeshStandardMaterial;
  andezitaMaterialo: THREE.MeshStandardMaterial;
  eniraMaterialo: THREE.MeshStandardMaterial;
  oraMaterialo: THREE.MeshStandardMaterial;
  cxielo: THREE.Mesh;
  cxielajUnihaqoxa: CxielajUnihaqoxa;
  hemiLumo: THREE.HemisphereLight;
  suna: THREE.DirectionalLight;
  sunaSprajto: THREE.Sprite;
  aplikiRezimon: ( t: number ) => void;
  aplikiVeteron: ( v: Vetero ) => void;
  gxisdatigiVeteron: ( t: number ) => void;
  gxisdatigiOmbron: ( x: number, z: number ) => boolean;
  maksimumaRatio: number;
}
