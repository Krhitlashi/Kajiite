import * as THREE from "three";
import { desegniKonturanTeksajxon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiLarikanFoliaranTeksajxon = sxovu((): THREE.CanvasTexture =>
  kreiKanvasanTeksajxon(0o1000, 0o1000, ( kunteksto ) => {
    desegniKonturanTeksajxon(kunteksto, [ 0xc8c068, 0xb8b058, 0xd8c878 ], 0o2720, 0o10, 0o2);
  }, [ 0o1, 0o1 ], { anisotropio: 0o4 }));
