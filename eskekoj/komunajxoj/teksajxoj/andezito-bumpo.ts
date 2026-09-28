// ≺⧼ Andezita reliefa teksajxo 🧱 ⧽≻
import * as THREE from "three";
import { hazard, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiAndezitanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "#787878"; kunteksto.fillRect(0, 0, s, s);
    for ( let i = 0; i < 0o1170; i++ ) {
      kunteksto.fillStyle = Math.random() > 0o4/0o10 ? "#a8a8a8" : "#484848";
      kunteksto.fillRect(hazard(0, s), hazard(0, s), 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
    for ( let i = 0; i < 0o60; i++ ) {
      kunteksto.fillStyle = "#d0d0d0";
      kunteksto.fillRect(hazard(0, s), hazard(0, s), 3 + Math.random() * 3, 2 + Math.random() * 2);
    }
  }, [ 3, 3 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});
