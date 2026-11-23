// វាយនភាពចម្លាក់សំបកប៊ឺច
import * as THREE from "three";
import { k2fKonturanCac2sex, kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";
import { s2cel2H, s2cel2W } from "./s2cel2.js";

export const kf2S2cel2nBumpanCac2sex = sxovu((): THREE.CanvasTexture => {
  return kf2P2t6zoCac2sex(s2cel2W, s2cel2H, ( kuns2bana ) => {
    k2fKonturanCac2sex(kuns2bana, [ 0xf8f8f0, 0xe8e8e0, 0xd8d8d0 ], 0o5413, 0o2, 0o40, true);
  }, [ 0o1, 0o1 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 0o4 });
});
