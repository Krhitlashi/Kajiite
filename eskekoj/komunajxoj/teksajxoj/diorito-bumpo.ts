// ≺⧼ Diorita reliefa teksajxo 🪨 ⧽≻
import * as THREE from "three";
import { dioritaPaletro, generiDioritajnKristalojn } from "./diorito.js";
import { desegniWrapan, hazard, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiDioritanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, s, s);
    const kristaloj = generiDioritajnKristalojn();
    for ( let i = 0; i < kristaloj.length; i++ ) {
      const kris = kristaloj[i];
      const pal = dioritaPaletro[kris.indekso];
      const griz = Math.round(0o400 * pal.reliefo);
      const rando = Math.max(0o40, Math.round(0o400 * ( pal.reliefo - 0o1/0o20 )));
      desegniWrapan(kunteksto, s, () => {
        kunteksto.save();
        kunteksto.translate(kris.x, kris.y);
        kunteksto.rotate(kris.angulo);
        kunteksto.beginPath();
        for ( let v = 0; v < kris.verticoj.length; v++ ) {
          const a = ( v / kris.verticoj.length ) * Math.PI * 2;
          const r = kris.verticoj[v];
          const px = Math.cos(a) * kris.rx * r;
          const py = Math.sin(a) * kris.ry * r;
          if ( v === 0 ) kunteksto.moveTo(px, py); else kunteksto.lineTo(px, py);
        }
        kunteksto.closePath();
        kunteksto.fillStyle = `rgb(${griz},${griz},${griz})`;
        kunteksto.fill();
        kunteksto.strokeStyle = `rgb(${rando},${rando},${rando})`;
        kunteksto.lineWidth = 1;
        kunteksto.stroke();
        kunteksto.restore();
      });
    }
    for ( let i = 0; i < 0o640; i++ ) {
      const wd = 1 + Math.random() * 2, hd = 1 + Math.random() * 2;
      const x = hazard(0, s), y = hazard(0, s);
      const koloro = Math.random() > 0o4/0o10 ? "rgba(216,216,216,0.6)" : "rgba(88,88,88,0.6)";
      desegniWrapan(kunteksto, s, () => {
        kunteksto.fillStyle = koloro;
        kunteksto.fillRect(x, y, wd, hd);
      });
    }
  }, [ 0o2, 0o2 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});
