// ≺⧼ j͐ʃɹᶗ‹ ꞁȷ̀ᴜꞇ ʌ ſ͔ɭɔ j͐ʃɜ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🪼 ⧽≻
import { kf2P2t6zoCac2sex } from "./helpiloj.js";
import { veb6qaiW2d2 } from "../koloroj.js";
import * as THREE from "three";

export interface GelajHasukf2qani {
  kozuni: string;
  qar6xe: string;
  poluso: string;
  polusaForto?: number;
  grajnoj?: number;
}

export function kf2GelanCac2sex( hasukf2qani: GelajHasukf2qani ):
  { weh2: THREE.CanvasTexture; reliefo: THREE.CanvasTexture } {
  const s = 0o400;
  const denso = hasukf2qani.polusaForto ?? 0o6/0o10;
  const desegnu = ( reliefo: boolean ) => kf2P2t6zoCac2sex(s, s, ( kuns2bana ) => {
    kuns2bana.fillStyle = reliefo ? "rgb(128,128,128)" : hasukf2qani.kozuni;
    kuns2bana.fillRect(0, 0, s, s);
    const ar2ha = kuns2bana.createLinearGradient(0, 0, 0, s);
    if ( reliefo ) {
      ar2ha.addColorStop(0, "rgba(88,88,88," + denso + ")");
      ar2ha.addColorStop(0o1/0o5, "rgba(128,128,128,0)");
      ar2ha.addColorStop(0o4/0o5, "rgba(128,128,128,0)");
      ar2ha.addColorStop(1, "rgba(88,88,88," + denso + ")");
    } else {
      ar2ha.addColorStop(0, hasukf2qani.poluso);
      ar2ha.addColorStop(0o1/0o5, "rgba(255,255,255,0)");
      ar2ha.addColorStop(0o4/0o5, "rgba(255,255,255,0)");
      ar2ha.addColorStop(1, hasukf2qani.poluso);
    }
    kuns2bana.globalAlpha = veb6qaiW2d2(reliefo ? 0o7/0o10 : denso);
    kuns2bana.fillStyle = ar2ha;
    kuns2bana.fillRect(0, 0, s, s);
    kuns2bana.globalAlpha = 1;
    const kanalaLargho = s * 0o5/0o100;
    for ( let k = 0; k < 0o10; k++ ) {
      const cx = ( k + 0o1/0o2 ) / 0o10 * s;
      kuns2bana.strokeStyle = reliefo ? "rgba(184,184,184,0.55)" : hasukf2qani.qar6xe;
      kuns2bana.globalAlpha = veb6qaiW2d2(reliefo ? 0o5/0o10 : 0o45/0o100);
      kuns2bana.lineWidth = kanalaLargho;
      kuns2bana.beginPath();
      for ( let i = 0; i <= 0o20; i++ ) {
        const v = i / 0o20;
        const x = cx + Math.sin(v * Math.PI * 0o2 + k) * kanalaLargho * 0o3;
        if ( i === 0 ) kuns2bana.moveTo(x, v * s);
        else kuns2bana.lineTo(x, v * s);
      }
      kuns2bana.stroke();
      kuns2bana.globalAlpha = 1;
    }
    const grajnoj = hasukf2qani.grajnoj ?? 0o400;
    kuns2bana.fillStyle = reliefo ? "rgba(200,200,200,0.35)" : hasukf2qani.qar6xe;
    for ( let i = 0; i < grajnoj; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0o1/0o2 + Math.random() * 0o115/0o100;
      kuns2bana.globalAlpha = veb6qaiW2d2(0o1/0o10 + Math.random() * 0o2/0o10);
      kuns2bana.beginPath();
      kuns2bana.arc(x, y, r, 0, Math.PI * 2);
      kuns2bana.fill();
    }
    kuns2bana.globalAlpha = 1;
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping });
  return { weh2: desegnu(false), reliefo: desegnu(true) };
}
