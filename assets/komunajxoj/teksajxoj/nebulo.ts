// ≺⧼ Nebula teksajxo 🌫️ ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon } from "./helpiloj.js";

export function kreiNebulanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    const r = kunteksto.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    r.addColorStop(0, "rgba(240,244,238,0.6)");
    r.addColorStop(0o4/0o10, "rgba(240,244,238,0.22)");
    r.addColorStop(1, "rgba(240,244,238,0)");
    kunteksto.fillStyle = r; kunteksto.fillRect(0, 0, s, s);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}
