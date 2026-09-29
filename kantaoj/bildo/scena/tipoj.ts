// ≺⧼ Tipoj 📃 ⧽≻
// La publikaj tipoj de la sceno — la vetero, la veteraj paletroj kaj la
// scen-sistemo, kiun kreiScenon redonas.
import * as THREE from "three";

// Vetero — la kvar eblaj atmosferoj apud la kutima krepuska reĝimo. La
// defaŭlta estas la nebula ( la urbo sidas en nebula betularo ).
export type Vetero = "nebula" | "pluva" | "hajla" | "nega";

// VeteraPaletro — la tuta koloraro de unu veter-stato. La koloroj estas
// THREE.Color ( ne nombroj ), ĉar la atmosfera lerpo ilin klonas kaj miksaĵas.
export interface VeteraPaletro {
  top: THREE.Color; mid: THREE.Color; bot: THREE.Color;
  sunCol: THREE.Color; fog: THREE.Color;
  hemiSky: THREE.Color; hemiGnd: THREE.Color;
  sunPos: THREE.Vector3;
  sunInt: number; hemiInt: number; sprajtaOp: number; ekspozicio: number; nebulDenso: number;
}

// VeteraDuopo — la du statoj de ĉiu vetero, la tago kaj la krepusko.
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
  // La maksimuma ekrandenso por la dinamika rezolucio ( sperto.ts ) — 1.5 sur
  // la tuŝaj aparatoj, 2 surtablue. La buklo povas malaltigi la denson sub ĝin
  // sub ŝarĝo, sed neniam super ĝin.
  maksimumaRatio: number;
}
