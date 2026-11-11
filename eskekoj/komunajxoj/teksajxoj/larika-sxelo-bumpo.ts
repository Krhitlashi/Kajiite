// វាយនភាពចម្លាក់សំបកល្មុត
import * as THREE from "three";
import { desegniKonturanTeksajxon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiLarikanSxelanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const largho = 0o1000, alto = 0o2000;
  return kreiKanvasanTeksajxon(largho, alto, ( kunteksto ) => {
    desegniKonturanTeksajxon(kunteksto, [ 0xa89880, 0x988870, 0xb8a890 ], 0o6257, 0o6, 0o4, true);
  }, [ 0o1, 0o2 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 0o4 });
});
