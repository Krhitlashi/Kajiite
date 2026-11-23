// ≺⧼ ſɭɜ ſɭ,w j͑ʃᴜꞇ ʌ ſɭɹ ᶅſɹƽ j͐ʃƽɜ }ʃꞇ 🟫 ⧽≻
import * as THREE from "three";
import { GRUNDA_RIPETO, GRUNDA_S, kf2GrundanKanvason } from "./grundo.js";
import { kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";

export const kf2GrundanBumpanCac2sex = sxovu((): THREE.CanvasTexture => {
  const s = GRUNDA_S;
  return kf2P2t6zoCac2sex(s, s, ( k ) => {
    k.drawImage(kf2GrundanKanvason(false), 0, 0);
  }, GRUNDA_RIPETO, { sRGB: false, anisotropio: 0o10 });
});
