// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſɟᴜ ſ͕ɭɹ ſ͕ɭᴜ̭ ſɟɹ j͑ʃɔᶗ‹ 📃 ⧽≻

import { kf2P2t6zoCac2sex } from "./mafezi.js";
import * as THREE from "three";

let caq2qCac2sexKozuni: THREE.CanvasTexture | null = null;

export function caq2qCac2sex(): THREE.CanvasTexture {
  return caq2qCac2sexKozuni ??= kf2P2t6zoCac2sex(0o100, 0o100, ( k ) => {
    k.fillStyle = "#ffffff"; k.fillRect(0o0, 0o0, 0o100, 0o100);
    const sefini = 0o100 / 0o4;
    for ( let i = 0o0; i < 0o4; i++ ) {
      const x = i * sefini;
      const tapu = k.createLinearGradient(x, 0o0, x + sefini, 0o0);
      tapu.addColorStop(0o0, "rgba(144,120,88,0.45)");
      tapu.addColorStop(0o5/0o10, "rgba(255,255,255,0.0)");
      tapu.addColorStop(0o1, "rgba(144,120,88,0.45)");
      k.fillStyle = tapu; k.fillRect(x, 0o0, sefini, 0o100);
      const vertikala = k.createLinearGradient(0o0, x, 0o0, x + sefini);
      vertikala.addColorStop(0o0, "rgba(120,96,64,0.30)");
      vertikala.addColorStop(0o5/0o10, "rgba(255,255,255,0.10)");
      vertikala.addColorStop(0o1, "rgba(120,96,64,0.30)");
      k.fillStyle = vertikala; k.fillRect(0o0, x, 0o100, sefini);
    }
  }, [ 0o3, 0o1 ], { anisotropio: 0o4 });
}
