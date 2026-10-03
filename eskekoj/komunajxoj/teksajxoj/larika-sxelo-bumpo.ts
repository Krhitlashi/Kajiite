// ≺⧼ វាយនភាពចម្លាក់សំបកល្មុត 🌲 ⧽≻
import * as THREE from "three";
import { desegniWrapan, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";
import { generiLarikanSkizon } from "./larika-sxelo.js";
import { desegniHorizontanStrion, desegniStrion } from "./sxelo.js";

export const kreiLarikanSxelanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = 0o200, h = 0o400;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, w, h);
    const skizo = generiLarikanSkizon();
    for ( let i = 0; i < 0o10; i++ ) {
      const r = h * ( 0o10/0o100 + Math.random() * 0o12/0o100 );
      const x = Math.random() * w, y = Math.random() * h;
      const koloro = i % 2 ? "rgba(142,142,138,0.16)" : "rgba(70,70,70,0.16)";
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, koloro);
        g.addColorStop(1, "rgba(128,128,128,0)");
        kunteksto.fillStyle = g;
        kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
      });
    }
    for ( const fendo of skizo.fendoj ) {
      const kernDikeco = Math.max(1, fendo.dikeco * 0o5/0o10);
      desegniWrapan(kunteksto, w, () => {
        desegniStrion(kunteksto, fendo, "rgba(120,120,120,0.50)");
        desegniStrion(kunteksto, { ...fendo, dikeco: kernDikeco }, "rgba(86,86,86,0.70)");
      });
    }
    for ( const kresto of skizo.krestoj ) {
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createLinearGradient(kresto.x, 0, kresto.x + kresto.largho, 0);
        g.addColorStop(0, "rgba(128,128,128,0)");
        g.addColorStop(0o1/0o2, kresto.hela ? "rgba(162,162,162,0.48)" : "rgba(112,112,112,0.38)");
        g.addColorStop(1, "rgba(128,128,128,0)");
        kunteksto.fillStyle = g;
        kunteksto.fillRect(kresto.x, 0, kresto.largho, h);
      });
    }
    for ( const fendo of skizo.fendoj ) {
      const kernDikeco = Math.max(1, fendo.dikeco * 0o5/0o10);
      desegniWrapan(kunteksto, w, () => {
        desegniStrion(kunteksto, { ...fendo, x: fendo.x + kernDikeco * 0o6/0o10, dikeco: 1 },
          "rgba(158,158,158,0.35)");
      });
    }
    for ( const plato of skizo.platoj ) {
      const koloro = plato.tono < 0o5/0o10 ? "rgba(152,152,152,0.40)" : "rgba(98,98,98,0.45)";
      desegniWrapan(kunteksto, w, () => { desegniHorizontanStrion(kunteksto, plato, koloro); });
    }
    for ( const makulo of skizo.makuloj ) {
      const koloro = makulo.hela ? "rgba(152,152,152,0.35)" : "rgba(94,94,94,0.40)";
      desegniWrapan(kunteksto, w, () => {
        kunteksto.fillStyle = koloro;
        kunteksto.beginPath(); kunteksto.arc(makulo.x, makulo.y, makulo.r, 0, Math.PI * 2); kunteksto.fill();
      });
    }
  }, [ 1, 2 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});
