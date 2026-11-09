// ≺⧼ វាយនភាពចម្លាក់ដាយ៉ូរីត 🪨 ⧽≻
import * as THREE from "three";
import { dioritaPaletro, generiDioritajnKristalojn } from "./diorito.js";
import { desegniWrapajnMakulojn, desegniWrapanKristalon, hazard, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

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
      desegniWrapanKristalon(kunteksto, s, kris, ( k ) => {
        k.fillStyle = `rgb(${griz},${griz},${griz})`;
        k.fill();
        k.strokeStyle = `rgb(${rando},${rando},${rando})`;
        k.lineWidth = 1;
        k.stroke();
      });
    }
    desegniWrapajnMakulojn(kunteksto, s, 0o640, () => {
      const wd = 1 + Math.random() * 2, hd = 1 + Math.random() * 2;
      const x = hazard(0, s), y = hazard(0, s);
      const koloro = Math.random() > 0o4/0o10 ? "rgba(216,216,216,0.6)" : "rgba(88,88,88,0.6)";
      return [ x, y, wd, hd, koloro ];
    });
  }, [ 0o2, 0o2 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});
