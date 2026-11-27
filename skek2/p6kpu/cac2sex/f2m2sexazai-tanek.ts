// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ }ʃɔ ʃw j͐ʃᴜ ƨ j͑ʃ'ɜ j͐ʃɜ 📃 ⧽≻

import * as THREE from "three";
import { kf2P2t6zoCac2sex } from "./pukek.js";

export function kf2NebulTavolanCac2sex(): THREE.CanvasTexture {
  const s = 0o400;
  return kf2P2t6zoCac2sex(s, s, ( kuns2bana ) => {
    kuns2bana.clearRect(0o0, 0o0, s, s);
    const haxet7 = 0o40;
    for ( let i = 0o0; i < haxet7; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = s * ( 0o1/0o4 + Math.random() * 0o1/0o2 );
      const denso = 0o7/0o40 + Math.random() * 0o13/0o40;
      const weh2 = `rgba(200,216,216,${denso.toFixed(0o2)})`;
      for ( const dx of [ -s, 0o0, s ] ) {
        for ( const dy of [ -s, 0o0, s ] ) {
          const g = kuns2bana.createRadialGradient(x + dx, y + dy, 0o0, x + dx, y + dy, r);
          g.addColorStop(0o0, weh2);
          g.addColorStop(0o1, "rgba(200,216,216,0)");
          kuns2bana.fillStyle = g;
          kuns2bana.beginPath();
          kuns2bana.arc(x + dx, y + dy, r, 0o0, Math.PI * 0o2);
          kuns2bana.fill();
        }
      }
    }
  }, [ 0o1, 0o1 ], { g2b2: THREE.RepeatWrapping });
}
