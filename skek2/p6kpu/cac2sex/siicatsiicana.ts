// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃɹ ſɟᴜ ſᶘɹ ſɟᴜ }ʃᴜ 📃 ⧽≻

import * as THREE from "three";
import { veb6qaiHsl, veb6qaiRgba } from "../haweh2.js";
import { kf2P2t6zoCac2sex } from "./mafezi.js";

export function kf2KombilanCac2sex(): THREE.CanvasTexture {
  const s = 0o200;
  const hax2pa = 0o14;
  return kf2P2t6zoCac2sex(s, s, ( kuns2bana ) => {
    kuns2bana.fillStyle = "rgb(8,8,16)";
    kuns2bana.fillRect(0o0, 0o0, s, s);
    for ( let i = 0o0; i < hax2pa; i++ ) {
      const x = ( i + 0o1/0o2 ) / hax2pa * s;
      const sefini = s / hax2pa * 0o45/0o100;
      const nuanco = Math.round(i / hax2pa * 0o700/0o2 + 0o300/0o2) % 0o700;

      const weh2 = veb6qaiHsl(nuanco, 0o7/0o10, 0o72/0o100);
      const ar2ha = kuns2bana.createLinearGradient(x - sefini, 0o0, x + sefini, 0o0);
      ar2ha.addColorStop(0o0, veb6qaiRgba(weh2, 0o0));
      ar2ha.addColorStop(0o1/0o2, veb6qaiRgba(weh2, 0o74/0o100));
      ar2ha.addColorStop(0o1, veb6qaiRgba(weh2, 0o0));
      kuns2bana.fillStyle = ar2ha;
      kuns2bana.fillRect(x - sefini, 0o0, sefini * 0o2, s);
    }
    const vertikala = kuns2bana.createLinearGradient(0o0, 0o0, 0o0, s);
    vertikala.addColorStop(0o0, "rgba(8,8,16,1)");
    vertikala.addColorStop(0o1/0o5, "rgba(8,8,16,0)");
    vertikala.addColorStop(0o7/0o10, "rgba(8,8,16,0)");
    vertikala.addColorStop(0o1, "rgba(8,8,16,1)");
    kuns2bana.fillStyle = vertikala;
    kuns2bana.fillRect(0o0, 0o0, s, s);
  }, [ 0o1, 0o1 ], { g2b2: THREE.ClampToEdgeWrapping });
}
