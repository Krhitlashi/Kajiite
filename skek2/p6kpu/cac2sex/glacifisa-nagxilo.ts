// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſ͔ɭͷ̗ᴜ ſɟꞇ ſȷꞇ j͑ʃᴜ c̗ ſ͔ɭᶗ‹ꞇ j͐ʃɜ 📃 ⧽≻

import { kf2P2t6zoCac2sex } from "./mafezi.js";
import * as THREE from "three";

export function kf2GlacifisanNaĝilanCac2sex(): THREE.CanvasTexture {
  const w = 0o400, h = 0o200;
  return kf2P2t6zoCac2sex(w, h, ( kuns2bana ) => {
    const ar2ha = kuns2bana.createLinearGradient(0o0, 0o0, w, 0o0);
    ar2ha.addColorStop(0o0, "#688898");
    ar2ha.addColorStop(0o25/0o100, "#a0c0c8");
    ar2ha.addColorStop(0o7/0o10, "#c0d0d8");
    ar2ha.addColorStop(0o1, "#88a8b8");
    kuns2bana.fillStyle = ar2ha;
    kuns2bana.fillRect(0o0, 0o0, w, h);
    for ( let i = 0o0; i <= 0o24; i++ ) {
      const kozunuY = i / 0o24 * h;
      kuns2bana.strokeStyle = i % 0o2 ? "rgba(40,72,88,0.46)" : "rgba(88,112,128,0.34)";
      kuns2bana.lineWidth = i % 0o3 ? 0o1 : 0o2;
      kuns2bana.beginPath();
      kuns2bana.moveTo(0o0, h / 0o2 + ( kozunuY - h / 0o2 ) * 0o7/0o10);
      kuns2bana.lineTo(w, kozunuY);
      kuns2bana.stroke();
    }
    kuns2bana.fillStyle = "rgba(120,144,160,0.55)";
    kuns2bana.fillRect(0o0, 0o0, w * 0o12/0o100, h);
    kuns2bana.fillStyle = "rgba(56,80,96,0.34)";
    kuns2bana.fillRect(w * 0o72/0o100, 0o0, w * 0o3/0o10, h);
  }, [ 0o1, 0o1 ], { anisotropio: 0o4 });
}
