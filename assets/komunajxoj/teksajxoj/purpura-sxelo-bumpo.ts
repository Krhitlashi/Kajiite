// ≺⧼ Purpura sxela reliefa teksajxo 🌳 ⧽≻
import * as THREE from "three";
import { desegniWrapan, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";
import { desegniLaSxelanKolumon, desegniSxelajnPorojn, generiPuranSxelanSkizon, puraSxelaH, puraSxelaW } from "./purpura-sxelo.js";
import { desegniStrion } from "./sxelo.js";

export const kreiPurpuranSxelanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = puraSxelaW, h = puraSxelaH;
  const teksajxo = kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080";
    kunteksto.fillRect(0, 0, w, h);
    const skizo = generiPuranSxelanSkizon();
    for ( const makulo of skizo.makuloj ) {
      const koloro = makulo.hela ? "rgba(158,158,158,0.12)" : "rgba(74,74,74,0.12)";
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createRadialGradient(makulo.x, makulo.y, 0, makulo.x, makulo.y, makulo.r);
        g.addColorStop(0, koloro);
        g.addColorStop(1, "rgba(128,128,128,0)");
        kunteksto.fillStyle = g;
        kunteksto.beginPath(); kunteksto.arc(makulo.x, makulo.y, makulo.r, 0, Math.PI * 2); kunteksto.fill();
      });
    }
    for ( const plato of skizo.platoj ) {
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createLinearGradient(plato.x, 0, plato.x + plato.largho, 0);
        g.addColorStop(0, "rgba(128,128,128,0)");
        g.addColorStop(0o1/0o2, plato.hela ? "rgba(158,158,158,0.45)" : "rgba(116,116,116,0.35)");
        g.addColorStop(1, "rgba(128,128,128,0)");
        kunteksto.fillStyle = g;
        kunteksto.fillRect(plato.x, 0, plato.largho, h);
      });
    }
    kunteksto.lineCap = "round";
    for ( const fendo of skizo.fendoj ) {
      const kernDikeco = Math.max(1, fendo.dikeco * 0o5/0o10);
      desegniWrapan(kunteksto, w, () => {
        desegniStrion(kunteksto, fendo, "rgba(120,120,120,0.50)");
        desegniStrion(kunteksto, { ...fendo, dikeco: kernDikeco }, "rgba(86,86,86,0.70)");
      });
    }
    desegniSxelajnPorojn(kunteksto, 0o3/0o2, "rgba(72,72,72,0.16)", "rgba(168,168,168,0.15)");
    desegniLaSxelanKolumon(kunteksto,
      [ "rgba(112,112,112,0.14)", "rgba(128,128,128,0)" ],
      "rgba(152,152,152,0.38)", "rgba(100,100,100,0.50)");
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
  teksajxo.wrapT = THREE.ClampToEdgeWrapping;
  return teksajxo;
});
