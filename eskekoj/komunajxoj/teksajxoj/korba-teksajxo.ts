// ≺⧼ វាយនភាពកន្ត្រក 🧺 ⧽≻
import { kreiKanvasanTeksajxon } from "./helpiloj.js";
import * as THREE from "three";

let korbaTeksajxo: THREE.CanvasTexture | null = null;

export function korbaTeksajxon(): THREE.CanvasTexture {
  return korbaTeksajxo ??= kreiKanvasanTeksajxon(0o100, 0o100, ( k ) => {
    k.fillStyle = "#ffffff"; k.fillRect(0, 0, 0o100, 0o100);
    const largho = 0o100 / 0o4;
    for ( let i = 0; i < 0o4; i++ ) {
      const x = i * largho;
      const horizontala = k.createLinearGradient(x, 0, x + largho, 0);
      horizontala.addColorStop(0, "rgba(150,124,92,0.45)");
      horizontala.addColorStop(0o5/0o10, "rgba(255,255,255,0.0)");
      horizontala.addColorStop(1, "rgba(150,124,92,0.45)");
      k.fillStyle = horizontala; k.fillRect(x, 0, largho, 0o100);
      const vertikala = k.createLinearGradient(0, x, 0, x + largho);
      vertikala.addColorStop(0, "rgba(120,96,68,0.30)");
      vertikala.addColorStop(0o5/0o10, "rgba(255,255,255,0.10)");
      vertikala.addColorStop(1, "rgba(120,96,68,0.30)");
      k.fillStyle = vertikala; k.fillRect(0, x, 0o100, largho);
    }
  }, [ 3, 1 ], { anisotropio: 4 });
}
