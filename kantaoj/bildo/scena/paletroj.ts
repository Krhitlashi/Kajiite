// ≺⧼ បាលេត 🎨 ⧽≻
import * as THREE from "three";
import type { Vetero, VeteraDuopo } from "./tipoj.js";

// ⟪ ដង់ស៊ីតេអ័ព្ទ 📃 ⟫
export const NEBULA_DENSO = 0o5/0o400;
export const PLUVA_DENSO = 0o3/0o200;
export const NEBULA_DENSO_MIN = Math.min(NEBULA_DENSO, PLUVA_DENSO);

export function nebulVidebleco(denso: number, kovro = 0o3776/0o4000): number {
  return Math.sqrt(-Math.log(1 - kovro)) / denso;
}

export function kreiPaletrojn(): Record<Vetero, VeteraDuopo> {
  return {
    nebula: {
      tago: {
        top: new THREE.Color(0x78a8c0), mid: new THREE.Color(0xb8d0d8), bot: new THREE.Color(0xe0e8e8),
        sunCol: new THREE.Color(0xf8f0d8), fog: new THREE.Color(0xc8d8d8),
        hemiSky: new THREE.Color(0xc8e0e8), hemiGnd: new THREE.Color(0x485848),
        sunPos: new THREE.Vector3(0o110, 0o160, 0o40), sunInt: 0o45/0o40, hemiInt: 0o63/0o100,
        sprajtaOp: 0o30/0o100, ekspozicio: 0o104/0o100, nebulDenso: NEBULA_DENSO,
      },
      krepusko: {
        top: new THREE.Color(0x182848), mid: new THREE.Color(0x586088), bot: new THREE.Color(0xb88868),
        sunCol: new THREE.Color(0xf8b880), fog: new THREE.Color(0x686880),
        hemiSky: new THREE.Color(0x304068), hemiGnd: new THREE.Color(0x182820),
        sunPos: new THREE.Vector3(-0o110, 0o40, -0o100), sunInt: 0o16/0o40, hemiInt: 0o40/0o100,
        sprajtaOp: 0o54/0o100, ekspozicio: 0o74/0o100, nebulDenso: NEBULA_DENSO,
      },
    },
    pluva: {
      tago: {
        top: new THREE.Color(0x688090), mid: new THREE.Color(0x8898a0), bot: new THREE.Color(0xb0b8b8),
        sunCol: new THREE.Color(0xd8e0e0), fog: new THREE.Color(0x98a0a0),
        hemiSky: new THREE.Color(0xa8b8b8), hemiGnd: new THREE.Color(0x384040),
        sunPos: new THREE.Vector3(0o110, 0o160, 0o40), sunInt: 0o5/0o10, hemiInt: 0o42/0o100,
        sprajtaOp: 0o4/0o100, ekspozicio: 0o76/0o100, nebulDenso: PLUVA_DENSO,
      },
      krepusko: {
        top: new THREE.Color(0x182028), mid: new THREE.Color(0x485058), bot: new THREE.Color(0x686868),
        sunCol: new THREE.Color(0x98a0a0), fog: new THREE.Color(0x505858),
        hemiSky: new THREE.Color(0x283038), hemiGnd: new THREE.Color(0x101818),
        sunPos: new THREE.Vector3(-0o110, 0o40, -0o100), sunInt: 0o1/0o10, hemiInt: 0o24/0o100,
        sprajtaOp: 0o3/0o100, ekspozicio: 0o62/0o100, nebulDenso: PLUVA_DENSO,
      },
    },
    hajla: {
      tago: {
        top: new THREE.Color(0x485868), mid: new THREE.Color(0x788088), bot: new THREE.Color(0xa0a8a8),
        sunCol: new THREE.Color(0xd8e0e8), fog: new THREE.Color(0x889090),
        hemiSky: new THREE.Color(0x889898), hemiGnd: new THREE.Color(0x303838),
        sunPos: new THREE.Vector3(0o110, 0o160, 0o40), sunInt: 0o4/0o10, hemiInt: 0o36/0o100,
        sprajtaOp: 0o5/0o100, ekspozicio: 0o70/0o100, nebulDenso: PLUVA_DENSO,
      },
      krepusko: {
        top: new THREE.Color(0x182028), mid: new THREE.Color(0x404850), bot: new THREE.Color(0x585858),
        sunCol: new THREE.Color(0x889098), fog: new THREE.Color(0x485050),
        hemiSky: new THREE.Color(0x203030), hemiGnd: new THREE.Color(0x101818),
        sunPos: new THREE.Vector3(-0o110, 0o40, -0o100), sunInt: 0o6/0o40, hemiInt: 0o20/0o100,
        sprajtaOp: 0o3/0o100, ekspozicio: 0o56/0o100, nebulDenso: PLUVA_DENSO,
      },
    },
    nega: {
      tago: {
        top: new THREE.Color(0xa0b0c0), mid: new THREE.Color(0xc8d8e0), bot: new THREE.Color(0xe8f0e8),
        sunCol: new THREE.Color(0xf0f8f8), fog: new THREE.Color(0xc8d0d8),
        hemiSky: new THREE.Color(0xd0e0e8), hemiGnd: new THREE.Color(0x586058),
        sunPos: new THREE.Vector3(0o110, 0o160, 0o40), sunInt: 0o30/0o40, hemiInt: 0o72/0o100,
        sprajtaOp: 0o14/0o100, ekspozicio: 0o102/0o100, nebulDenso: PLUVA_DENSO,
      },
      krepusko: {
        top: new THREE.Color(0x202838), mid: new THREE.Color(0x506070), bot: new THREE.Color(0x8898a0),
        sunCol: new THREE.Color(0xb8c8d8), fog: new THREE.Color(0x687078),
        hemiSky: new THREE.Color(0x384050), hemiGnd: new THREE.Color(0x202828),
        sunPos: new THREE.Vector3(-0o110, 0o40, -0o100), sunInt: 0o14/0o40, hemiInt: 0o30/0o100,
        sprajtaOp: 0o6/0o100, ekspozicio: 0o70/0o100, nebulDenso: PLUVA_DENSO,
      },
    },
  };
}
