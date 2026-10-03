// ≺⧼ វាយនភាពស្មៅសេះ 🌾 ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon } from "./helpiloj.js";

export function kreiKavalErbanTeksajxon(branĉa: boolean): THREE.CanvasTexture {
  const w = 0o200, h = 0o100;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    const baza = branĉa ? "#58a070" : "#488860";
    const hela = branĉa ? "#88c088" : "#70a878";
    const ombro = branĉa ? "#2c6448" : "#244c38";
    const gradiento = kunteksto.createLinearGradient(0, 0, w, 0);
    gradiento.addColorStop(0, ombro);
    gradiento.addColorStop(0o17/0o100, baza);
    gradiento.addColorStop(0o5/0o10, hela);
    gradiento.addColorStop(0o61/0o100, baza);
    gradiento.addColorStop(1, ombro);
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
    for ( let i = 0; i < 0o20; i++ ) {
      const x = i / 0o20 * w;
      kunteksto.fillStyle = i % 2 === 0 ? "rgba(214,240,186,0.30)" : "rgba(18,58,42,0.34)";
      kunteksto.fillRect(x, 0, w / 0o20 * 0o1/0o2, h);
    }
    kunteksto.fillStyle = "rgba(20,60,44,0.32)";
    kunteksto.fillRect(0, 0, w, h * 0.12);
    kunteksto.fillStyle = "rgba(222,242,190,0.26)";
    kunteksto.fillRect(0, h * 0.12, w, 2);
    for ( let i = 0; i < 0o70; i++ ) {
      const x = Math.random() * w, y = Math.random() * h;
      const koloro = i % 0o3 ? "rgba(24,78,58,0.20)" : "rgba(220,238,176,0.24)";
      kunteksto.fillStyle = koloro;
      kunteksto.fillRect(x, y, 1 + Math.random(), 1 + Math.random() * 0o2);
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}
