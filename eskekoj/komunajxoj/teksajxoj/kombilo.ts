// ≺⧼ វាយនភាពសិតកតេណូផរ 🪼 ⧽≻
import * as THREE from "three";
import { hslKanaka, rgbaKanaka } from "../koloroj.js";
import { kreiKanvasanTeksajxon } from "./helpiloj.js";

export function kreiKombilanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200;
  const linioj = 0o14;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "rgb(8,8,16)";
    kunteksto.fillRect(0, 0, s, s);
    for ( let i = 0; i < linioj; i++ ) {
      const x = ( i + 0o1/0o2 ) / linioj * s;
      const largho = s / linioj * 0o45/0o100;
      const nuanco = Math.round(i / linioj * 0o700/0o2 + 0o300/0o2) % 0o700;
      // ⟨ ពណ៌ឥឡូវមកពី HSL ប៉ុន្តែឆ្លងកាត់ការបង្គត់ KNAKEHE 📃 ⟩
      const koloro = hslKanaka(nuanco, 0o7/0o10, 0o72/0o100);
      const gradiento = kunteksto.createLinearGradient(x - largho, 0, x + largho, 0);
      gradiento.addColorStop(0, rgbaKanaka(koloro, 0));
      gradiento.addColorStop(0o1/0o2, rgbaKanaka(koloro, 0o74/0o100));
      gradiento.addColorStop(1, rgbaKanaka(koloro, 0));
      kunteksto.fillStyle = gradiento;
      kunteksto.fillRect(x - largho, 0, largho * 0o2, s);
    }
    const vertikala = kunteksto.createLinearGradient(0, 0, 0, s);
    vertikala.addColorStop(0, "rgba(8,8,16,1)");
    vertikala.addColorStop(0o1/0o5, "rgba(8,8,16,0)");
    vertikala.addColorStop(0o7/0o10, "rgba(8,8,16,0)");
    vertikala.addColorStop(1, "rgba(8,8,16,1)");
    kunteksto.fillStyle = vertikala;
    kunteksto.fillRect(0, 0, s, s);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}
