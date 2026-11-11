// ≺⧼ វាយនភាពចម្លាក់អង់ដេស៊ីត 🧱 ⧽≻
import * as THREE from "three";
import { desegniKonturanTeksajxon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiAndezitanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const grandeco = 0o1000;
  return kreiKanvasanTeksajxon(grandeco, grandeco, ( kunteksto ) => {
    desegniKonturanTeksajxon(kunteksto, [ 0x888878, 0x989888, 0x787868 ], 0o6353, 0o4, 0o6, true);
  }, [ 0o3, 0o3 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 0o4 });
});
