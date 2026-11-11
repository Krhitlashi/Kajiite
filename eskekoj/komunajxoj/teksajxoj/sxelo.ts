// ≺⧼ វាយនភាពសំបកប៊ឺច 🌳 ⧽≻
import * as THREE from "three";
import { desegniKonturanTeksajxon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const sxelaW = 0o400, sxelaH = 0o3000;

export interface BetulaStrio {
  x: number; y: number; longo: number; ondo: number; dikeco: number;
}

export function desegniStrion(k: CanvasRenderingContext2D, strio: BetulaStrio, koloro: string): void {
  k.save();
  k.strokeStyle = koloro;
  k.lineWidth = strio.dikeco;
  k.lineCap = "round";
  k.beginPath();
  k.moveTo(strio.x, strio.y);
  k.quadraticCurveTo(strio.x + strio.ondo, strio.y + strio.longo * 0o4/0o10, strio.x - strio.ondo * 0o6/0o10, strio.y + strio.longo);
  k.stroke();
  k.restore();
}

export const kreiSxelanTeksajxon = sxovu((): THREE.CanvasTexture => {
  return kreiKanvasanTeksajxon(sxelaW, sxelaH, ( kunteksto ) => {
    desegniKonturanTeksajxon(kunteksto, [ 0xf8f8f0, 0xe8e8e0, 0xd8d8d0 ], 0o5413, 0o2, 0o40);
  }, [ 0o1, 0o1 ], { anisotropio: 0o4 });
});
