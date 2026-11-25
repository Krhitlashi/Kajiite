// ≺⧼ }ʃɔ ʃw j͐ʃᴜ j͑ʃᴜꞇ ʌ ɭʃᴜ j͑ʃ'ɜ j͐ʃɜ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🌫️ ⧽≻
import * as THREE from "three";
import { kf2P2t6zoCac2sex } from "./mafezi.js";

export function kf2NebulTavolanCac2sex(): THREE.CanvasTexture {
  const s = 0o400;
  return kf2P2t6zoCac2sex(s, s, ( kuns2bana ) => {
    kuns2bana.clearRect(0, 0, s, s);
    const haxet7 = 0o40;
    for ( let i = 0; i < haxet7; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = s * ( 0o1/0o4 + Math.random() * 0o1/0o2 );
      const denso = 0o7/0o40 + Math.random() * 0o13/0o40;
      const weh2 = `rgba(200,216,216,${denso.toFixed(2)})`;
      for ( const dx of [ -s, 0, s ] ) {
        for ( const dy of [ -s, 0, s ] ) {
          const g = kuns2bana.createRadialGradient(x + dx, y + dy, 0, x + dx, y + dy, r);
          g.addColorStop(0, weh2);
          g.addColorStop(1, "rgba(200,216,216,0)");
          kuns2bana.fillStyle = g;
          kuns2bana.beginPath();
          kuns2bana.arc(x + dx, y + dy, r, 0, Math.PI * 2);
          kuns2bana.fill();
        }
      }
    }
  }, [ 1, 1 ], { g2b2: THREE.RepeatWrapping });
}
