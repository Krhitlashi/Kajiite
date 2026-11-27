// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſᶘэ ſȷэ ᴜ̭ ſɟɹ j͑ʃɔᶗ‹ 📃 ⧽≻

import { kf2P2t6zoCac2sex } from "./pukek.js";
import * as THREE from "three";

let ts6f6Cac2sexKozuni: THREE.CanvasTexture | null = null;

export function ts6f6Cac2sex(): THREE.CanvasTexture {
  return ts6f6Cac2sexKozuni ??= kf2P2t6zoCac2sex(0o200, 0o200, ( k ) => {
    k.fillStyle = "#ffffff"; k.fillRect(0o0, 0o0, 0o200, 0o200);
    for ( let i = 0o0; i < 0o100; i++ ) {
      const r = 0o10 + Math.random() * 0o30;
      const x = Math.random() * 0o200, y = Math.random() * 0o200;
      const grad = k.createRadialGradient(x, y, 0o0, x, y, r);
      grad.addColorStop(0o0, `rgba(192,176,144,${0o5/0o100 + Math.random() * 0o5/0o100})`);
      grad.addColorStop(0o1, "rgba(192,176,144,0)");
      k.fillStyle = grad; k.beginPath(); k.arc(x, y, r, 0o0, Math.PI * 0o2); k.fill();
    }
    for ( let i = 0o0; i < 0o400; i++ ) {
      k.fillStyle = `rgba(255,255,255,${0o25/0o100 + Math.random() * 0o40/0o100})`;
      k.fillRect(Math.random() * 0o200, Math.random() * 0o200, 0o1, 0o1);
    }
  }, [ 0o1, 0o1 ], { peq2: 0o4 });
}
