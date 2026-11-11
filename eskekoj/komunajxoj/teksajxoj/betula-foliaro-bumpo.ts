import * as THREE from "three";
import { desegniKonturanTeksajxon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiBetulanFoliaranBumpanTeksajxon = sxovu((): THREE.CanvasTexture =>
  kreiKanvasanTeksajxon(0o1000, 0o1000, ( kunteksto ) => {
    desegniKonturanTeksajxon(kunteksto, [ 0x808080 ], 0o2716, 0o4, 0o6, true);
  }, [ 0o1, 0o1 ], { sRGB: false, anisotropio: 0o4 }));
