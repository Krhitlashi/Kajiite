// Tip-deklaroj por la CDN-import-map-aj aldonmoduloj.
// La baza "three" modulo uzas tipojn el node_modules/three ( instalita per npm ).
// Ĉi tiuj aldonoj estas solvitaj dum rultempo per la retumila import-map.
//   "three/addons/*" → jsdelivr CDN examples/jsm/*

declare module "three/addons/controls/OrbitControls.js" {
  import * as THREE from "three";
  export class OrbitControls extends THREE.EventDispatcher {
    constructor(camera: THREE.Camera, domElement: HTMLElement);
    target: THREE.Vector3;
    enabled: boolean;
    enableDamping: boolean;
    dampingFactor: number;
    maxPolarAngle: number;
    minDistance: number;
    maxDistance: number;
    update(): void;
    dispose(): void;
    saveState(): void;
    reset(): void;
  }
}

declare module "three/addons/environments/RoomEnvironment.js" {
  import * as THREE from "three";
  export class RoomEnvironment extends THREE.Scene {
    constructor(renderer?: THREE.WebGLRenderer);
    dispose(): void;
  }
}

declare module "three/addons/utils/BufferGeometryUtils.js" {
  import * as THREE from "three";
  export function mergeGeometries(geometries: THREE.BufferGeometry[], useGroups?: boolean): THREE.BufferGeometry;
}

// Tutmondaĵoj el la ekstera aih.js ( ſɭɔ j͑ʃ'ɔ }ʃꞇ.js ) ŝarĝita per <script> en index.html.
// vacepu — Envolvi cxiun vorton de la donita klaso en <span class="cepufalxez">.
declare function vacepu(klasoNomo: string): void;
