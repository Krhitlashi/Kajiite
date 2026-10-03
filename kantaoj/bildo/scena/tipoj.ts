// ≺⧼ ប្រភេទ 📃 ⧽≻
import * as THREE from "three";

export type Vetero = "nebula" | "pluva" | "hajla" | "nega";

export interface VeteraPaletro {
  top: THREE.Color; mid: THREE.Color; bot: THREE.Color;
  sunCol: THREE.Color; fog: THREE.Color;
  hemiSky: THREE.Color; hemiGnd: THREE.Color;
  sunPos: THREE.Vector3;
  sunInt: number; hemiInt: number; sprajtaOp: number; ekspozicio: number; nebulDenso: number;
}

export interface VeteraDuopo { tago: VeteraPaletro; krepusko: VeteraPaletro; }

export interface ScenaSistemo {
  bildilo: THREE.WebGLRenderer;
  sceno: THREE.Scene;
  fotilo: THREE.PerspectiveCamera;
  dioritaMaterialo: THREE.MeshStandardMaterial;
  andezitaMaterialo: THREE.MeshStandardMaterial;
  eniraMaterialo: THREE.MeshStandardMaterial;
  oraMaterialo: THREE.MeshStandardMaterial;
  cxielo: THREE.Mesh;
  cxielajUniformoj: Record<string, THREE.IUniform>;
  hemiLumo: THREE.HemisphereLight;
  suna: THREE.DirectionalLight;
  sunaSprajto: THREE.Sprite;
  aplikiRezimon: ( t: number ) => void;
  aplikiVeteron: ( v: Vetero ) => void;
  gxisdatigiVeteron: ( t: number ) => void;
  gxisdatigiOmbron: ( x: number, z: number ) => boolean;
  maksimumaRatio: number;
}
