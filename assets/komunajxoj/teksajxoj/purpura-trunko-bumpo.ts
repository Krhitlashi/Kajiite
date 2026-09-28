// ≺⧼ Purpura trunka reliefa teksajxo 🌳 ⧽≻
import * as THREE from "three";
import { desegniWrapan, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";
import { desegniPurpuranBendon, generiPurpuranTrunkanSkizon, purpuraTrunkaH, purpuraTrunkaW } from "./purpura-trunko.js";

export const kreiPurpuranTrunkanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = purpuraTrunkaW, h = purpuraTrunkaH;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, w, h);
    const skizo = generiPurpuranTrunkanSkizon();
    for ( let i = 0; i < 0o10; i++ ) {
      const r = h * ( 0o10/0o100 + Math.random() * 0o12/0o100 );
      const x = Math.random() * w, y = Math.random() * h;
      const koloro = i % 2 ? "rgba(144,144,144,0.16)" : "rgba(72,72,72,0.16)";
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, koloro);
        g.addColorStop(1, "rgba(128,128,128,0)");
        kunteksto.fillStyle = g;
        kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
      });
    }
    for ( const bendo of skizo.bendoj ) {
      desegniPurpuranBendon(kunteksto, bendo, "rgba(86,86,86,0.6)");
      desegniPurpuranBendon(kunteksto, { ...bendo, y: bendo.y + bendo.alto }, "rgba(152,152,152,0.45)");
    }
    for ( const fibro of skizo.fibroj ) {
      const koloro = fibro.tono < 0o5/0o10 ? "rgba(152,152,152,0.25)" : "rgba(96,96,96,0.25)";
      desegniWrapan(kunteksto, w, () => {
        kunteksto.strokeStyle = koloro;
        kunteksto.lineWidth = 1;
        kunteksto.lineCap = "round";
        kunteksto.beginPath();
        kunteksto.moveTo(fibro.x, 0);
        kunteksto.quadraticCurveTo(fibro.x + 0o2, h * 0o4/0o10, fibro.x - 0o2, h);
        kunteksto.stroke();
      });
    }
    for ( const skvamo of skizo.skvamoj ) {
      const koloro = skvamo.hela ? "rgba(152,152,152,0.35)" : "rgba(94,94,94,0.40)";
      desegniWrapan(kunteksto, w, () => {
        kunteksto.fillStyle = koloro;
        kunteksto.beginPath(); kunteksto.arc(skvamo.x, skvamo.y, skvamo.r, 0, Math.PI * 2); kunteksto.fill();
      });
    }
  }, [ 1, 2 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});
