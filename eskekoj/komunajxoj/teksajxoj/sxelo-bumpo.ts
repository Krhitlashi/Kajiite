// វាយនភាពចម្លាក់សំបកប៊ឺច
import * as THREE from "three";
import { desegniKonturanTeksajxon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";
import { sxelaH, sxelaW } from "./sxelo.js";

export const kreiSxelanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  return kreiKanvasanTeksajxon(sxelaW, sxelaH, ( kunteksto ) => {
    desegniKonturanTeksajxon(kunteksto, [ 0xf8f8f0, 0xe8e8e0, 0xd8d8d0 ], 0o5413, 0o2, 0o40, true);
  }, [ 0o1, 0o1 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 0o4 });
});
