// ≺⧼ j͑ʃɹ ſɟɔ j͐ʃɹ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🌳 ⧽≻
import * as THREE from "three";
import { k2fKonturanCac2sex, kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";

export const s2cel2W = 0o400, s2cel2H = 0o3000;

export interface Lam2vStrio {
  x: number; y: number; sahakani: number; ondo: number; dikeco: number;
}

export function k2fStrion(k: CanvasRenderingContext2D, strio: Lam2vStrio, weh2: string): void {
  k.save();
  k.strokeStyle = weh2;
  k.lineWidth = strio.dikeco;
  k.lineCap = "round";
  k.beginPath();
  k.moveTo(strio.x, strio.y);
  k.quadraticCurveTo(strio.x + strio.ondo, strio.y + strio.sahakani * 0o4/0o10, strio.x - strio.ondo * 0o6/0o10, strio.y + strio.sahakani);
  k.stroke();
  k.restore();
}

export const kf2S2cel2nCac2sex = sxovu((): THREE.CanvasTexture => {
  return kf2P2t6zoCac2sex(s2cel2W, s2cel2H, ( kuns2bana ) => {
    k2fKonturanCac2sex(kuns2bana, [ 0xf8f8f0, 0xe8e8e0, 0xd8d8d0 ], 0o5413, 0o2, 0o40);
  }, [ 0o1, 0o1 ], { anisotropio: 0o4 });
});
