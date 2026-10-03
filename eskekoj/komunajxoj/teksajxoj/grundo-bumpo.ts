// ≺⧼ វាយនភាពចម្លាក់ដី 🟫 ⧽≻
import * as THREE from "three";
import { GRUNDA_RIPETO, GRUNDA_S, kreiGrundanKanvason } from "./grundo.js";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiGrundanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = GRUNDA_S;
  return kreiKanvasanTeksajxon(s, s, ( k ) => {
    k.drawImage(kreiGrundanKanvason(false), 0, 0);
  }, GRUNDA_RIPETO, { sRGB: false, anisotropio: 0o10 });
});
