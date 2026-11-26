// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſȷᴜ j͑ʃп́ɹ ɭ(ɹ ᴜ̭ ſɟɹ j͑ʃɔᶗ‹ 📃 ⧽≻

import { kf2P2t6zoCac2sex } from "./mafezi.js";
import * as THREE from "three";

let fasw2d2Cac2sexKozuni: THREE.CanvasTexture | null = null;

export function fasw2d2Cac2sex(): THREE.CanvasTexture {
  return fasw2d2Cac2sexKozuni ??= kf2P2t6zoCac2sex(0o100, 0o100, ( k ) => {
    k.fillStyle = "#ffffff"; k.fillRect(0o0, 0o0, 0o100, 0o100);
    for ( let i = 0o0; i < 0o120; i++ ) {
      const x = Math.random() * 0o100, y = Math.random() * 0o100, r = 0o1 + Math.random() * 0o3;
      k.fillStyle = `rgba(144,168,168,${0o30/0o100 + Math.random() * 0o40/0o100})`;
      k.beginPath(); k.arc(x, y, r, 0o0, Math.PI * 0o2); k.fill();
      k.fillStyle = "rgba(255,255,255,0.85)";
      k.beginPath(); k.arc(x - r * 0o2/0o10, y - r * 0o2/0o10, r * 0o5/0o10, 0o0, Math.PI * 0o2); k.fill();
    }
  }, [ 0o2, 0o1 ], { anisotropio: 0o4 });
}
