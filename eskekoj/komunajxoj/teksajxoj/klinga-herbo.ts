// ≺⧼ វាយនភាពស្លឹកស្មៅ 🌾 ⧽≻
import * as THREE from "three";
import { kf2Sakxo } from "../hazardo.js";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiHerbanKlinganTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = 0o100, h = 0o400;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    // ⟨ បៃតងស្រាល , ប្រផេះ និងបៃតងចាស់ ៖ ចុងស្លឹកមិនលឿងទេ 📃 ⟩
    const gradiento = kunteksto.createLinearGradient(0, h, 0, 0);
    gradiento.addColorStop(0, "#203028");
    gradiento.addColorStop(0o1/0o4, "#305038");
    gradiento.addColorStop(0o43/0o100, "#507858");
    gradiento.addColorStop(0o15/0o20, "#88a088");
    gradiento.addColorStop(1, "#b8c0b0");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
    const meza = w / 2;
    const kresto = kunteksto.createLinearGradient(meza - 6, 0, meza + 6, 0);
    kresto.addColorStop(0, "rgba(16,32,24,0.30)");
    kresto.addColorStop(0o13/0o40, "rgba(200,208,192,0.28)");
    kresto.addColorStop(0o1/0o2, "rgba(216,224,208,0.34)");
    kresto.addColorStop(0o25/0o40, "rgba(200,208,192,0.28)");
    kresto.addColorStop(1, "rgba(16,32,24,0.30)");
    kunteksto.fillStyle = kresto;
    kunteksto.fillRect(meza - 6, 0, 0o14, h);
    const hazardo = kf2Sakxo(0o2717);
    for ( let i = 0; i < 0o22; i++ ) {
      const x = hazardo() * w;
      const disto = Math.abs(x - meza) / meza;
      kunteksto.fillStyle = hazardo() < 0o1/0o2
        ? `rgba(24,48,32,${0o3/0o40 + disto * 0o1/0o10})`
        : `rgba(176,192,176,${0o1/0o20 + ( 1 - disto ) * 0o3/0o40})`;
      kunteksto.fillRect(x, 0, 1, h);
    }
    kunteksto.fillStyle = "rgba(16,32,24,0.34)";
    kunteksto.fillRect(0, 0, 0o3/0o2, h);
    kunteksto.fillRect(w - 0o3/0o2, 0, 0o3/0o2, h);
    const baza = kunteksto.createLinearGradient(0, h, 0, h * 0o3/0o4);
    baza.addColorStop(0, "rgba(8,24,16,0.55)");
    baza.addColorStop(1, "rgba(8,24,16,0)");
    kunteksto.fillStyle = baza;
    kunteksto.fillRect(0, h * 0o3/0o4, w, h * 0o1/0o4);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});
