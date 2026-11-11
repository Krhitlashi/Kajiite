import * as THREE from "three";
import { desegniFluanTeksajxon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const GRUNDA_S = 0o1000;

export function kreiGrundanKanvason(koloro: boolean): HTMLCanvasElement {
  const kanvaso = document.createElement("canvas");
  kanvaso.width = kanvaso.height = GRUNDA_S;
  desegniFluanTeksajxon(kanvaso.getContext("2d")!,
    [ 0xf8f8f0, 0xe8f0d8, 0xe8e8d0 ], 0o2710, 0o6, !koloro);
  return kanvaso;
}

export const GRUNDA_RIPETO: [ number, number ] = [ 0o140, 0o140 ];

export const kreiGrundanTeksajxon = sxovu((): THREE.CanvasTexture =>
  kreiKanvasanTeksajxon(GRUNDA_S, GRUNDA_S, ( kunteksto ) => {
    kunteksto.drawImage(kreiGrundanKanvason(true), 0o0, 0o0);
  }, GRUNDA_RIPETO, { anisotropio: 0o10 }));
