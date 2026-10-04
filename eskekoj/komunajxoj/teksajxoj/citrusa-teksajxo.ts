// ≺⧼ វាយនភាពក្រូចឆ្មារ 🍋 ⧽≻
import { kreiKanvasanTeksajxon } from "./helpiloj.js";
import * as THREE from "three";

let citrusaTeksajxo: THREE.CanvasTexture | null = null;

export function citrusaTeksajxon(): THREE.CanvasTexture {
  return citrusaTeksajxo ??= kreiKanvasanTeksajxon(0o100, 0o100, ( k ) => {
    k.fillStyle = "#fff6e0"; k.fillRect(0, 0, 0o100, 0o100);
    const c = 0o40;
    k.strokeStyle = "rgba(190,138,52,0.45)"; k.lineWidth = 1;
    for ( let i = 0; i < 0o10; i++ ) {
      const ang = i / 0o10 * Math.PI * 2;
      k.beginPath(); k.moveTo(c, c);
      k.lineTo(c + Math.cos(ang) * 0o70, c + Math.sin(ang) * 0o70); k.stroke();
    }
    k.strokeStyle = "rgba(214,132,36,0.75)"; k.lineWidth = 0o2;
    k.beginPath(); k.arc(c, c, 0o45, 0, Math.PI * 2); k.stroke();
  }, [ 1, 1 ], { anisotropio: 2 });
}
