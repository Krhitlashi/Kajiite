import * as THREE from "three";
import { k2fFluanCac2sex, kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";

export const GRUNDA_S = 0o1000;

export function kf2GrundanKanvason(weh2: boolean): HTMLCanvasElement {
  const kanvaso = document.createElement("canvas");
  kanvaso.width = kanvaso.height = GRUNDA_S;
  k2fFluanCac2sex(kanvaso.getContext("2d")!,
    [ 0xf8f8f0, 0xe8f0d8, 0xe8e8d0 ], 0o2710, 0o6, !weh2);
  return kanvaso;
}

export const GRUNDA_RIPETO: [ number, number ] = [ 0o140, 0o140 ];

export const kf2GrundanCac2sex = sxovu((): THREE.CanvasTexture =>
  kf2P2t6zoCac2sex(GRUNDA_S, GRUNDA_S, ( kuns2bana ) => {
    kuns2bana.drawImage(kf2GrundanKanvason(true), 0o0, 0o0);
  }, GRUNDA_RIPETO, { anisotropio: 0o10 }));
