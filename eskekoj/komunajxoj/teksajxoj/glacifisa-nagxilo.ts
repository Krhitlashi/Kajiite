// ≺⧼ វាយនភាពព្រុយត្រីទឹកកក 🐟 ⧽≻
import { kreiKanvasanTeksajxon } from "./helpiloj.js";
import * as THREE from "three";

export function kreiGlacifisanNaĝilanTeksajxon(): THREE.CanvasTexture {
  const w = 0o400, h = 0o200;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    const gradiento = kunteksto.createLinearGradient(0, 0, w, 0);
    gradiento.addColorStop(0, "#6f8b9a");
    gradiento.addColorStop(0o25/0o100, "#a6c0cc");
    gradiento.addColorStop(0o7/0o10, "#c2d6de");
    gradiento.addColorStop(1, "#8fadbb");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
    for ( let i = 0; i <= 0o24; i++ ) {
      const bazaY = i / 0o24 * h;
      kunteksto.strokeStyle = i % 0o2 ? "rgba(46,72,88,0.46)" : "rgba(88,116,132,0.34)";
      kunteksto.lineWidth = i % 0o3 ? 1 : 2;
      kunteksto.beginPath();
      kunteksto.moveTo(0, h / 0o2 + ( bazaY - h / 0o2 ) * 0o7/0o10);
      kunteksto.lineTo(w, bazaY);
      kunteksto.stroke();
    }
    kunteksto.fillStyle = "rgba(120,146,160,0.55)";
    kunteksto.fillRect(0, 0, w * 0o12/0o100, h);
    kunteksto.fillStyle = "rgba(58,84,100,0.34)";
    kunteksto.fillRect(w * 0o72/0o100, 0, w * 0o3/0o10, h);
  }, [ 1, 1 ], { anisotropio: 0o4 });
}
