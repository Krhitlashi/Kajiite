import * as THREE from "three";
import { desegniKonturanTeksajxon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiBetulanFoliaranTeksajxon = sxovu((): THREE.CanvasTexture =>
  kreiKanvasanTeksajxon(0o1000, 0o1000, ( kunteksto ) => {
    desegniKonturanTeksajxon(kunteksto, [ 0xd8e8c8, 0xc8d8b8, 0xe8f0d8 ], 0o2716, 0o4, 0o6);
  }, [ 0o1, 0o1 ], { anisotropio: 0o4 }));
