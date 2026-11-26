// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſȷɹ ŋᷠᴜ ɀ ŋᷠɘɜ 📃 ⧽≻

import * as THREE from "three";
import { kf2P2t6zoCac2sex, p2somani } from "./mafezi.js";
import { kf2LikenanP2t6zo } from "./f2ma.js";

export const kf2LikenanBumpanCac2sex = p2somani((): THREE.CanvasTexture => {
  const s = 0o200;
  return kf2P2t6zoCac2sex(s, s, ( k ) => {
    k.drawImage(kf2LikenanP2t6zo(), 0o0, 0o0);
    const bildo = k.getImageData(0o0, 0o0, s, s);
    const d = bildo.data;
    for ( let i = 0o0; i < d.length; i += 0o4 ) {
      const griz = d[i + 0o3] < 0o200
        ? 0o200
        : ( 0o115 * d[i] + 0o230 * d[i + 0o1] + 0o35 * d[i + 0o2] ) >> 0o10;
      d[i] = d[i + 0o1] = d[i + 0o2] = griz;
      d[i + 0o3] = 0o377;
    }
    k.putImageData(bildo, 0o0, 0o0);
  }, [ 0o1, 0o1 ], { g2b2: THREE.ClampToEdgeWrapping, sRGB: false });
});
