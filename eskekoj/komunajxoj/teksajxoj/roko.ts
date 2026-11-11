// ≺⧼ វាយនភាពថ្ម 🪨 ⧽≻
import * as THREE from "three";
import { desegniKonturanTeksajxon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiRokenTeksajxon = sxovu((): THREE.CanvasTexture => {
  const grandeco = 0o1000;
  return kreiKanvasanTeksajxon(grandeco, grandeco, ( kunteksto ) => {
    desegniKonturanTeksajxon(kunteksto, [ 0x989890, 0x888880, 0xa0a098 ], 0o2731, 0o4, 0o4);
  }, [ 0o3, 0o3 ], { volvado: THREE.RepeatWrapping, anisotropio: 0o4 });
});
