// Type declarations for CDN import-map-mapped addon modules.
// The "three" base module uses types from node_modules/three (installed via npm).
// These addons are resolved at runtime by the browser import map:
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
