// ≺⧼ Ktenofora kombovica teksajxo 🪼 ⧽≻
import { kreiKanvasanTeksajxon } from "./helpiloj.js";
import * as THREE from "three";

export function kreiKombovicanTeksajxon(): THREE.CanvasTexture {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    kunteksto.fillStyle = "rgb(6,10,16)";
    kunteksto.fillRect(0, 0, s, s);
    const strioLargho = s / 0o10;
    for ( let k = 0; k < 0o10; k++ ) {
      const cx = ( k + 0o1/0o2 ) * strioLargho;
      const r = strioLargho * 0o23/0o100;
      const gradiento = kunteksto.createLinearGradient(cx - r, 0, cx + r, 0);
      const helo = 0o3/0o4 + ( k % 0o2 ) * 0o15/0o100;
      gradiento.addColorStop(0, "rgba(255,255,255,0)");
      gradiento.addColorStop(0o1/0o2, "rgba(235,245,255," + helo + ")");
      gradiento.addColorStop(1, "rgba(255,255,255,0)");
      kunteksto.fillStyle = gradiento;
      kunteksto.fillRect(cx - r, 0, r * 0o2, s);
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}
