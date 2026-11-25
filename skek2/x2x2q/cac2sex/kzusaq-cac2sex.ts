// ≺⧼ j͐ʃƽɜ ʌ ſɟᴜ̩ɔ ɭl̀ɹ ſɟɹ ᶅſᴜ 🍋 ⧽≻
import { kf2P2t6zoCac2sex } from "./mafezi.js";
import * as THREE from "three";

let kzusaqCac2sexKozuni: THREE.CanvasTexture | null = null;

export function kzusaqCac2sex(): THREE.CanvasTexture {
  return kzusaqCac2sexKozuni ??= kf2P2t6zoCac2sex(0o100, 0o100, ( k ) => {
    k.fillStyle = "#f8f0e0"; k.fillRect(0, 0, 0o100, 0o100);
    const c = 0o40;
    k.strokeStyle = "rgba(184,136,48,0.45)"; k.lineWidth = 1;
    for ( let i = 0; i < 0o10; i++ ) {
      const ang = i / 0o10 * Math.PI * 2;
      k.beginPath(); k.moveTo(c, c);
      k.lineTo(c + Math.cos(ang) * 0o70, c + Math.sin(ang) * 0o70); k.stroke();
    }
    k.strokeStyle = "rgba(208,128,32,0.75)"; k.lineWidth = 0o2;
    k.beginPath(); k.arc(c, c, 0o45, 0, Math.PI * 2); k.stroke();
  }, [ 1, 1 ], { anisotropio: 2 });
}
