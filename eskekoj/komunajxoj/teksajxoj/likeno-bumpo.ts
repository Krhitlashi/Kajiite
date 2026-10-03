// ≺⧼ វាយនភាពចម្លាក់ស្លែ 🪨 ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";
import { kreiLikenanKanvason } from "./likeno.js";

export const kreiLikenanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( k ) => {
    k.drawImage(kreiLikenanKanvason(), 0, 0);
    const bildo = k.getImageData(0, 0, s, s);
    const d = bildo.data;
    for ( let i = 0; i < d.length; i += 4 ) {
      const griz = d[i + 3] < 0o200
        ? 0o200
        : ( 0o115 * d[i] + 0o230 * d[i + 1] + 0o35 * d[i + 2] ) >> 8;
      d[i] = d[i + 1] = d[i + 2] = griz;
      d[i + 3] = 0o377;
    }
    k.putImageData(bildo, 0, 0);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, sRGB: false });
});
