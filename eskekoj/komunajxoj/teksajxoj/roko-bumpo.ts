// ≺⧼ វាយនភាពចម្លាក់ថ្ម 🪨 ⧽≻
import * as THREE from "three";
import { desegniWrapajnMakulojn, desegniWrapan, desegniWrapanKristalon,
  desegniFendanVojon, hazard, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";
import { generiRokanSkizon } from "./roko.js";

export const kreiRokenBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, s, s);
    const skizo = generiRokanSkizon();
    for ( const kris of skizo.kristaloj ) {
      const griz = Math.round(0o212 + kris.tono * 0o104);
      desegniWrapanKristalon(kunteksto, s, kris, ( k ) => {
        k.fillStyle = `rgb(${griz},${griz},${griz})`;
        k.fill();
        k.strokeStyle = "rgb(56,56,56)";
        k.lineWidth = 1;
        k.stroke();
      });
    }
    for ( const fendo of skizo.fendoj ) {
      desegniWrapan(kunteksto, s, () => {
        kunteksto.lineCap = "round";
        kunteksto.strokeStyle = "rgb(40,40,40)";
        kunteksto.lineWidth = fendo.dikeco + 1;
        desegniFendanVojon(kunteksto, fendo.punktoj);
        kunteksto.stroke();
        kunteksto.strokeStyle = "rgb(144,144,144)";
        kunteksto.lineWidth = 1;
        kunteksto.stroke();
      });
    }
    desegniWrapajnMakulojn(kunteksto, s, 0o600, () => {
      const x = hazard(0, s), y = hazard(0, s);
      const wd = 1 + Math.random() * 2, hd = 1 + Math.random() * 2;
      const koloro = Math.random() > 0o5/0o10 ? "rgba(168,168,168,0.5)" : "rgba(88,88,88,0.5)";
      return [ x, y, wd, hd, koloro ];
    });
  }, [ 0o3, 0o3 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});
