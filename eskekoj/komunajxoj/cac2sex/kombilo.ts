// ≺⧼ j͐ʃɹᶗ‹ ꞁȷ̀ᴜꞇ ʌ ſɭɜ ŋᷠɀꞇ j͐ʃɜ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🪼 ⧽≻
import * as THREE from "three";
import { veb6qaiHsl, veb6qaiRgba } from "../koloroj.js";
import { kf2P2t6zoCac2sex } from "./helpiloj.js";

export function kf2KombilanCac2sex(): THREE.CanvasTexture {
  const s = 0o200;
  const linioj = 0o14;
  return kf2P2t6zoCac2sex(s, s, ( kuns2bana ) => {
    kuns2bana.fillStyle = "rgb(8,8,16)";
    kuns2bana.fillRect(0, 0, s, s);
    for ( let i = 0; i < linioj; i++ ) {
      const x = ( i + 0o1/0o2 ) / linioj * s;
      const sefini = s / linioj * 0o45/0o100;
      const nuanco = Math.round(i / linioj * 0o700/0o2 + 0o300/0o2) % 0o700;
      // ⟨ ពណ៌ឥឡូវមកពី HSL ប៉ុន្តែឆ្លងកាត់ការបង្គត់ KNAKEHE 📃 ⟩
      const weh2 = veb6qaiHsl(nuanco, 0o7/0o10, 0o72/0o100);
      const ar2ha = kuns2bana.createLinearGradient(x - sefini, 0, x + sefini, 0);
      ar2ha.addColorStop(0, veb6qaiRgba(weh2, 0));
      ar2ha.addColorStop(0o1/0o2, veb6qaiRgba(weh2, 0o74/0o100));
      ar2ha.addColorStop(1, veb6qaiRgba(weh2, 0));
      kuns2bana.fillStyle = ar2ha;
      kuns2bana.fillRect(x - sefini, 0, sefini * 0o2, s);
    }
    const vertikala = kuns2bana.createLinearGradient(0, 0, 0, s);
    vertikala.addColorStop(0, "rgba(8,8,16,1)");
    vertikala.addColorStop(0o1/0o5, "rgba(8,8,16,0)");
    vertikala.addColorStop(0o7/0o10, "rgba(8,8,16,0)");
    vertikala.addColorStop(1, "rgba(8,8,16,1)");
    kuns2bana.fillStyle = vertikala;
    kuns2bana.fillRect(0, 0, s, s);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}
