// ≺⧼ វាយនភាពដាយ៉ូរីត 🪨 ⧽≻
import * as THREE from "three";
import { desegniKonturanTeksajxon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiDioritanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const grandeco = 0o1000;
  return kreiKanvasanTeksajxon(grandeco, grandeco, ( kunteksto ) => {
    desegniKonturanTeksajxon(kunteksto, [ 0xe8e8e0, 0xd8d8d0, 0xb8b8b0, 0x888880 ], 0o4617, 0o6, 0o6);
  }, [ 0o2, 0o2 ], { volvado: THREE.RepeatWrapping, anisotropio: 0o4 });
});
