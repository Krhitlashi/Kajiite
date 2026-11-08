// ≺⧼ វាយនភាពព្រុយត្រីទឹកកក 🐟 ⧽≻
import { kreiKanvasanTeksajxon } from "./helpiloj.js";
import * as THREE from "three";

export function kreiGlacifisanNaĝilanTeksajxon(): THREE.CanvasTexture {
  const w = 0o400, h = 0o200;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    const gradiento = kunteksto.createLinearGradient(0, 0, w, 0);
    gradiento.addColorStop(0, "#688898");
    gradiento.addColorStop(0o25/0o100, "#a0c0c8");
    gradiento.addColorStop(0o7/0o10, "#c0d0d8");
    gradiento.addColorStop(1, "#88a8b8");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
    for ( let i = 0; i <= 0o24; i++ ) {
      const bazaY = i / 0o24 * h;
      kunteksto.strokeStyle = i % 0o2 ? "rgba(40,72,88,0.46)" : "rgba(88,112,128,0.34)";
      kunteksto.lineWidth = i % 0o3 ? 1 : 2;
      kunteksto.beginPath();
      kunteksto.moveTo(0, h / 0o2 + ( bazaY - h / 0o2 ) * 0o7/0o10);
      kunteksto.lineTo(w, bazaY);
      kunteksto.stroke();
    }
    kunteksto.fillStyle = "rgba(120,144,160,0.55)";
    kunteksto.fillRect(0, 0, w * 0o12/0o100, h);
    kunteksto.fillStyle = "rgba(56,80,96,0.34)";
    kunteksto.fillRect(w * 0o72/0o100, 0, w * 0o3/0o10, h);
  }, [ 1, 1 ], { anisotropio: 0o4 });
}
