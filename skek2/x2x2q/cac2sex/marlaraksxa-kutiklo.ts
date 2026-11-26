// ≺⧼ ŋᷠᴜ ɽ͑ʃ'ͷ̗ᴜ ɽ͑ʃ'ᴜ ſɭɔ˞ᶗ‹ᴜ j͑ʃᴜꞇ ʌ j͑ʃɹ ſɟɔ j͐ʃɹ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🕷️ ⧽≻
import { kf2P2t6zoCac2sex } from "./mafezi.js";
import * as THREE from "three";

export function kf2KutiklanCac2sex(): { weh2: THREE.CanvasTexture; reliefo: THREE.CanvasTexture } {
  const s = 0o200;
  const desegnu = (reliefo: boolean) => kf2P2t6zoCac2sex(s, s, ( kuns2bana ) => {
    kuns2bana.fillStyle = reliefo ? "rgb(128,128,128)" : "rgb(208,176,136)";
    kuns2bana.fillRect(0o0, 0o0, s, s);
    for ( let i = 0o0; i < 0o6; i++ ) {
      const y = ( i + 0o1/0o2 ) / 0o6 * s;
      kuns2bana.strokeStyle = reliefo ? "rgba(64,64,64,0.55)" : "rgba(144,112,72,0.8)";
      kuns2bana.lineWidth = s * 0o1/0o100;
      kuns2bana.beginPath();
      kuns2bana.moveTo(0o0, y);
      kuns2bana.lineTo(s, y);
      kuns2bana.stroke();
    }
    for ( let i = 0o0; i < 0o300; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0o23/0o40 + Math.random() * 0o43/0o40;
      kuns2bana.fillStyle = reliefo
        ? ( Math.random() < 0o1/0o2 ? "rgba(200,200,200,0.5)" : "rgba(80,80,80,0.45)" )
        : ( Math.random() < 0o1/0o2 ? "rgba(232,208,176,0.5)" : "rgba(168,128,88,0.45)" );
      kuns2bana.beginPath();
      kuns2bana.arc(x, y, r, 0o0, Math.PI * 0o2);
      kuns2bana.fill();
    }
  }, [ 0o1, 0o1 ], { g2b2: THREE.RepeatWrapping });
  return { weh2: desegnu(false), reliefo: desegnu(true) };
}
