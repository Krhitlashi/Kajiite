
declare module "three/addons/controls/OrbitControls.js" {
  import * as THREE from "three";
  export class OrbitControls extends THREE.EventDispatcher {
    constructor(camera: THREE.Camera, domElement: HTMLElement);
    target: THREE.Vector3;
    enabled: boolean;
    enableDamping: boolean;
    dampingFactor: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    maxPolarAngle: number;
    minDistance: number;
    maxDistance: number;
    mouseButtons: { LEFT?: number; MIDDLE?: number; RIGHT?: number };
    touches: { ONE?: number; TWO?: number };
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

declare function vacepu(klasoNomo: string): void;
