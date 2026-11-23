// ≺⧼ ſᶘꞇ }ʃɔ j͑ʃɹ ſɟɔ j͐ʃɹ j͑ʃᴜꞇ ʌ ſɭɹ ᶅſɹƽ j͐ʃƽɜ }ʃꞇ 🌳 ⧽≻
import * as THREE from "three";
import { k2fWrapan, kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";
import { k2fLaS2cel2nKolumon, k2fS2cel2jnPorojn, generiPuranS2cel2nSkizon, puraS2cel2H, puraS2cel2W } from "./asfa-s2cel2.js";
import { k2fStrion } from "./s2cel2.js";

export const kf2AsfanS2cel2nBumpanCac2sex = sxovu((): THREE.CanvasTexture => {
  const w = puraS2cel2W, h = puraS2cel2H;
  const cac2sex = kf2P2t6zoCac2sex(w, h, ( kuns2bana ) => {
    kuns2bana.fillStyle = "#808080";
    kuns2bana.fillRect(0, 0, w, h);
    const skizo = generiPuranS2cel2nSkizon();
    for ( const makulo of skizo.makuloj ) {
      const weh2 = makulo.hela ? "rgba(152,152,152,0.12)" : "rgba(72,72,72,0.12)";
      k2fWrapan(kuns2bana, w, () => {
        const g = kuns2bana.createRadialGradient(makulo.x, makulo.y, 0, makulo.x, makulo.y, makulo.r);
        g.addColorStop(0, weh2);
        g.addColorStop(1, "rgba(128,128,128,0)");
        kuns2bana.fillStyle = g;
        kuns2bana.beginPath(); kuns2bana.arc(makulo.x, makulo.y, makulo.r, 0, Math.PI * 2); kuns2bana.fill();
      });
    }
    for ( const pa12 of skizo.hapa12 ) {
      k2fWrapan(kuns2bana, w, () => {
        const g = kuns2bana.createLinearGradient(pa12.x, 0, pa12.x + pa12.sefini, 0);
        g.addColorStop(0, "rgba(128,128,128,0)");
        g.addColorStop(0o1/0o2, pa12.hela ? "rgba(152,152,152,0.45)" : "rgba(112,112,112,0.35)");
        g.addColorStop(1, "rgba(128,128,128,0)");
        kuns2bana.fillStyle = g;
        kuns2bana.fillRect(pa12.x, 0, pa12.sefini, h);
      });
    }
    kuns2bana.lineCap = "round";
    for ( const fendo of skizo.fendoj ) {
      const kernDikeco = Math.max(1, fendo.dikeco * 0o5/0o10);
      k2fWrapan(kuns2bana, w, () => {
        k2fStrion(kuns2bana, fendo, "rgba(120,120,120,0.50)");
        k2fStrion(kuns2bana, { ...fendo, dikeco: kernDikeco }, "rgba(80,80,80,0.70)");
      });
    }
    k2fS2cel2jnPorojn(kuns2bana, 0o3/0o2, "rgba(72,72,72,0.16)", "rgba(168,168,168,0.15)");
    k2fLaS2cel2nKolumon(kuns2bana,
      [ "rgba(112,112,112,0.14)", "rgba(128,128,128,0)" ],
      "rgba(152,152,152,0.38)", "rgba(96,96,96,0.50)");
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
  cac2sex.wrapT = THREE.ClampToEdgeWrapping;
  return cac2sex;
});
