// ≺⧼ វាយនភាពស្លឹកស្មៅ 🌾 ⧽≻
import * as THREE from "three";
import { kreiHazardanGenerilon } from "../hazardo.js";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiHerbanKlinganTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = 0o100, h = 0o400;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    const gradiento = kunteksto.createLinearGradient(0, h, 0, 0);
    gradiento.addColorStop(0, "#23481a");
    gradiento.addColorStop(0o1/0o4, "#3d7529");
    gradiento.addColorStop(0.55, "#5d9c37");
    gradiento.addColorStop(0.82, "#8cbb4d");
    gradiento.addColorStop(1, "#c0c25e");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
    const meza = w / 2;
    const kresto = kunteksto.createLinearGradient(meza - 6, 0, meza + 6, 0);
    kresto.addColorStop(0, "rgba(18,44,12,0.30)");
    kresto.addColorStop(0.35, "rgba(216,240,170,0.28)");
    kresto.addColorStop(0o1/0o2, "rgba(228,248,186,0.34)");
    kresto.addColorStop(0.65, "rgba(216,240,170,0.28)");
    kresto.addColorStop(1, "rgba(18,44,12,0.30)");
    kunteksto.fillStyle = kresto;
    kunteksto.fillRect(meza - 6, 0, 12, h);
    const hazardo = kreiHazardanGenerilon(0o2717);
    for ( let i = 0; i < 0o22; i++ ) {
      const x = hazardo() * w;
      const disto = Math.abs(x - meza) / meza;
      kunteksto.fillStyle = hazardo() < 0o1/0o2
        ? `rgba(28,58,18,${0.10 + disto * 0.12})`
        : `rgba(190,224,140,${0.07 + ( 1 - disto ) * 0.10})`;
      kunteksto.fillRect(x, 0, 1, h);
    }
    kunteksto.fillStyle = "rgba(20,44,14,0.34)";
    kunteksto.fillRect(0, 0, 0o3/0o2, h);
    kunteksto.fillRect(w - 0o3/0o2, 0, 0o3/0o2, h);
    const baza = kunteksto.createLinearGradient(0, h, 0, h * 0o3/0o4);
    baza.addColorStop(0, "rgba(14,30,10,0.55)");
    baza.addColorStop(1, "rgba(14,30,10,0)");
    kunteksto.fillStyle = baza;
    kunteksto.fillRect(0, h * 0o3/0o4, w, h * 0o1/0o4);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});
