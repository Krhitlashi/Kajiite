// ≺⧼ Brila teksajxo ✨ ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon } from "./helpiloj.js";

export function kreiBrilanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    const r = kunteksto.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    r.addColorStop(0, "rgba(255,205,120,0.95)");
    r.addColorStop(0o13/0o40, "rgba(255,165,70,0.4)");
    r.addColorStop(1, "rgba(255,150,60,0)");
    kunteksto.fillStyle = r; kunteksto.fillRect(0, 0, s, s);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}
