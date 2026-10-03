// ≺⧼ វាយនភាពស្មៅស្រទាប់ 🌾 ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiHerbanTavolanKlinganTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = 0o100, h = 0o400;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    const gradiento = kunteksto.createLinearGradient(0, h, 0, 0);
    gradiento.addColorStop(0, "#889088");
    gradiento.addColorStop(0o1/0o2, "#a8b0a8");
    gradiento.addColorStop(1, "#c8d0b8");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});
