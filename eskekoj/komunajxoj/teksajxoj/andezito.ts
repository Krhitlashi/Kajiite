// ≺⧼ វាយនភាពអង់ដេស៊ីត 🧱 ⧽≻
import * as THREE from "three";
import { hazard, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiAndezitanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "#686858"; kunteksto.fillRect(0, 0, s, s);
    const tonoj = [ "#787868", "#888878", "#585850", "#989888", "#484840" ];
    for ( let i = 0; i < 0o1170; i++ ) {
      kunteksto.fillStyle = tonoj[i % tonoj.length];
      kunteksto.fillRect(hazard(0, s), hazard(0, s), hazard(0o1, 0o4), hazard(0o1, 0o3));
    }
    kunteksto.strokeStyle = "rgba(120,120,112,0.28)";
    kunteksto.lineWidth = 3;
    for ( let i = 0; i < 0o40; i++ ) {
      const y = hazard(0, s);
      kunteksto.beginPath();
      kunteksto.moveTo(0, y);
      kunteksto.lineTo(s, y + hazard(-0o3, 0o3));
      kunteksto.stroke();
    }
    for ( let i = 0; i < 0o60; i++ ) {
      kunteksto.fillStyle = "rgba(184,184,176,0.75)";
      kunteksto.fillRect(hazard(0, s), hazard(0, s), 3 + Math.random() * 3, 2 + Math.random() * 2);
    }
    for ( let i = 0; i < 0o140; i++ ) {
      kunteksto.fillStyle = "rgba(32,32,32,0.6)";
      kunteksto.fillRect(hazard(0, s), hazard(0, s), 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
  }, [ 3, 3 ], { volvado: THREE.RepeatWrapping, anisotropio: 4 });
});
