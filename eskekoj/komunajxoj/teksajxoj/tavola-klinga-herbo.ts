// ≺⧼ វាយនភាពស្មៅស្រទាប់ 🌾 ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiHerbanTavolanKlinganTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = 0o100, h = 0o400;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    // ⟨ បៃតងស្រាល , ប្រផេះ ៖ គ្មានពណ៌លឿង 📃 ⟩
    const gradiento = kunteksto.createLinearGradient(0, h, 0, 0);
    gradiento.addColorStop(0, "#64785f");
    gradiento.addColorStop(0o1/0o2, "#8b9d86");
    gradiento.addColorStop(1, "#b7c1af");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});
