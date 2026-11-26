// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſɭɜ ŋᷠɀɜ ı],ɹ ſןᴜ 📃 ⧽≻

import { kf2P2t6zoCac2sex } from "./mafezi.js";
import * as THREE from "three";

export function kf2KombovicanCac2sex(): THREE.CanvasTexture {
  const s = 0o400;
  return kf2P2t6zoCac2sex(s, s, ( kuns2bana ) => {
    kuns2bana.clearRect(0o0, 0o0, s, s);
    kuns2bana.fillStyle = "rgb(0,8,16)";
    kuns2bana.fillRect(0o0, 0o0, s, s);
    const strioSefini = s / 0o10;
    for ( let k = 0o0; k < 0o10; k++ ) {
      const cx = ( k + 0o1/0o2 ) * strioSefini;
      const r = strioSefini * 0o23/0o100;
      const ar2ha = kuns2bana.createLinearGradient(cx - r, 0o0, cx + r, 0o0);
      const tsije = 0o3/0o4 + ( k % 0o2 ) * 0o15/0o100;
      ar2ha.addColorStop(0o0, "rgba(255,255,255,0)");
      ar2ha.addColorStop(0o1/0o2, "rgba(232,240,255," + tsije + ")");
      ar2ha.addColorStop(0o1, "rgba(255,255,255,0)");
      kuns2bana.fillStyle = ar2ha;
      kuns2bana.fillRect(cx - r, 0o0, r * 0o2, s);
    }
  }, [ 0o1, 0o1 ], { g2b2: THREE.ClampToEdgeWrapping });
}
