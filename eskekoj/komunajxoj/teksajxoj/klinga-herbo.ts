// ≺⧼ វាយនភាពស្លឹកស្មៅ 🌾 ⧽≻
import * as THREE from "three";
import { kreiHazardanGenerilon } from "../hazardo.js";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiHerbanKlinganTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = 0o100, h = 0o400;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    // ⟨ បៃតងស្រាល , ប្រផេះ និងបៃតងចាស់ ៖ ចុងស្លឹកមិនលឿងទេ 📃 ⟩
    const gradiento = kunteksto.createLinearGradient(0, h, 0, 0);
    gradiento.addColorStop(0, "#22362b");
    gradiento.addColorStop(0o1/0o4, "#32503c");
    gradiento.addColorStop(0o43/0o100, "#57795f");
    gradiento.addColorStop(0o15/0o20, "#8aa68c");
    gradiento.addColorStop(1, "#b9c3b3");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
    const meza = w / 2;
    const kresto = kunteksto.createLinearGradient(meza - 6, 0, meza + 6, 0);
    kresto.addColorStop(0, "rgba(16,36,24,0.30)");
    kresto.addColorStop(0o13/0o40, "rgba(200,214,198,0.28)");
    kresto.addColorStop(0o1/0o2, "rgba(216,226,214,0.34)");
    kresto.addColorStop(0o25/0o40, "rgba(200,214,198,0.28)");
    kresto.addColorStop(1, "rgba(16,36,24,0.30)");
    kunteksto.fillStyle = kresto;
    kunteksto.fillRect(meza - 6, 0, 0o14, h);
    const hazardo = kreiHazardanGenerilon(0o2717);
    for ( let i = 0; i < 0o22; i++ ) {
      const x = hazardo() * w;
      const disto = Math.abs(x - meza) / meza;
      kunteksto.fillStyle = hazardo() < 0o1/0o2
        ? `rgba(30,52,38,${0o3/0o40 + disto * 0o1/0o10})`
        : `rgba(182,196,178,${0o1/0o20 + ( 1 - disto ) * 0o3/0o40})`;
      kunteksto.fillRect(x, 0, 1, h);
    }
    kunteksto.fillStyle = "rgba(20,36,26,0.34)";
    kunteksto.fillRect(0, 0, 0o3/0o2, h);
    kunteksto.fillRect(w - 0o3/0o2, 0, 0o3/0o2, h);
    const baza = kunteksto.createLinearGradient(0, h, 0, h * 0o3/0o4);
    baza.addColorStop(0, "rgba(14,26,18,0.55)");
    baza.addColorStop(1, "rgba(14,26,18,0)");
    kunteksto.fillStyle = baza;
    kunteksto.fillRect(0, h * 0o3/0o4, w, h * 0o1/0o4);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});
