// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſ͔ɭƣ̋w }ʃԏ͕ɜ ɀ ŋᷠɘɜ 📃 ⧽≻

import * as THREE from "three";
import { GRUNDARIPETO, GRUNDAS, kf2GrundanP2t6zo } from "./grundo.js";
import { kf2P2t6zoCac2sex, p2somani } from "./mafezi.js";

export const kf2GrundanBumpanCac2sex = p2somani((): THREE.CanvasTexture => {
  const s = GRUNDAS;
  return kf2P2t6zoCac2sex(s, s, ( k ) => {
    k.drawImage(kf2GrundanP2t6zo(false), 0o0, 0o0);
  }, GRUNDARIPETO, { sRGB: false, anisotropio: 0o10 });
});
