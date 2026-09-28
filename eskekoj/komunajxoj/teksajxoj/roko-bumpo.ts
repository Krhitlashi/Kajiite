// ≺⧼ Roka reliefa teksajxo 🪨 ⧽≻
import * as THREE from "three";
import { desegniWrapan, hazard, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";
import { generiRokanSkizon } from "./roko.js";

export const kreiRokenBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, s, s);
    const skizo = generiRokanSkizon();
    for ( const kris of skizo.kristaloj ) {
      const griz = Math.round(0o212 + kris.tono * 0o104);
      desegniWrapan(kunteksto, s, () => {
        kunteksto.save();
        kunteksto.translate(kris.x, kris.y);
        kunteksto.rotate(kris.angulo);
        kunteksto.beginPath();
        for ( let v = 0; v < kris.verticoj.length; v++ ) {
          const a = ( v / kris.verticoj.length ) * Math.PI * 2;
          const r = kris.verticoj[v];
          const px = Math.cos(a) * kris.rx * r, py = Math.sin(a) * kris.ry * r;
          if ( v === 0 ) kunteksto.moveTo(px, py); else kunteksto.lineTo(px, py);
        }
        kunteksto.closePath();
        kunteksto.fillStyle = `rgb(${griz},${griz},${griz})`;
        kunteksto.fill();
        kunteksto.strokeStyle = "rgb(58,58,58)";
        kunteksto.lineWidth = 1;
        kunteksto.stroke();
        kunteksto.restore();
      });
    }
    for ( const fendo of skizo.fendoj ) {
      desegniWrapan(kunteksto, s, () => {
        kunteksto.lineCap = "round";
        kunteksto.strokeStyle = "rgb(40,40,40)";
        kunteksto.lineWidth = fendo.dikeco + 1;
        kunteksto.beginPath();
        kunteksto.moveTo(fendo.punktoj[0][0], fendo.punktoj[0][1]);
        for ( let i = 1; i < fendo.punktoj.length; i++ ) {
          kunteksto.lineTo(fendo.punktoj[i][0], fendo.punktoj[i][1]);
        }
        kunteksto.stroke();
        kunteksto.strokeStyle = "rgb(148,148,148)";
        kunteksto.lineWidth = 1;
        kunteksto.stroke();
      });
    }
    for ( let i = 0; i < 0o600; i++ ) {
      const x = hazard(0, s), y = hazard(0, s);
      const wd = 1 + Math.random() * 2, hd = 1 + Math.random() * 2;
      const koloro = Math.random() > 0o5/0o10 ? "rgba(170,170,170,0.5)" : "rgba(92,92,92,0.5)";
      desegniWrapan(kunteksto, s, () => {
        kunteksto.fillStyle = koloro;
        kunteksto.fillRect(x, y, wd, hd);
      });
    }
  }, [ 0o3, 0o3 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});
