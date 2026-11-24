// ≺⧼ j͐ʃƽɜ ʌ j͑ʃɜȝ ɭʃɔ 🧵 ⧽≻
import * as THREE from "three";
import { k2fWrapajnNubojn, k2fWrapan, kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";

export const kf2SxtofanBumpanCac2sex = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kf2P2t6zoCac2sex(s, s, ( kuns2bana ) => {
    kuns2bana.fillStyle = "#808080";
    kuns2bana.fillRect(0, 0, s, s);
    const vepat6ni = 0o10, fadeno = 0o2;
    for ( let i = 0; i < s; i += vepat6ni ) {
      const hela = ( i / vepat6ni ) % 0o2 === 0;
      kuns2bana.fillStyle = hela ? "rgba(168,168,168,0.13)" : "rgba(88,88,88,0.11)";
      kuns2bana.fillRect(i, 0, fadeno, s);
      kuns2bana.fillStyle = hela ? "rgba(88,88,88,0.11)" : "rgba(168,168,168,0.13)";
      kuns2bana.fillRect(0, i, s, fadeno);
    }
    for ( let i = 0; i < 0o400; i++ ) {
      const w = 0o1 + ( ( Math.random() * 0o3 ) | 0 ), h = 0o1 + ( ( Math.random() * 0o3 ) | 0 );
      const x = ( Math.random() * s ) | 0, y = ( Math.random() * s ) | 0;
      const griz = Math.random() < 0o1/0o2 ? "rgba(200,200,200,0.14)" : "rgba(64,64,64,0.13)";
      k2fWrapan(kuns2bana, s, () => {
        kuns2bana.fillStyle = griz;
        kuns2bana.fillRect(x, y, w, h);
      });
    }
    k2fWrapajnNubojn(kuns2bana, s, s, 0o20,
      [ "rgba(224,224,224,0.10)", "rgba(64,64,64,0.12)", "rgba(136,136,136,0.10)" ],
      0o4/0o100, 0o10/0o100);
  }, [ 1, 1 ], { sRGB: false, anisotropio: 0o10 });
});
