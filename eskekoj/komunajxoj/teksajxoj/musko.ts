import * as THREE from "three";
import { desegniKonturanTeksajxon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiMuskanTeksajxon = sxovu((): THREE.CanvasTexture =>
  kreiKanvasanTeksajxon(0o1000, 0o1000, ( kunteksto ) => {
    desegniKonturanTeksajxon(kunteksto, [ 0x60a898, 0x509888, 0x80b098 ], 0o2730, 0o6, 0o6);
  }, [ 0o1, 0o1 ], { anisotropio: 0o4 }));
