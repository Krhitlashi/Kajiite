// ≺⧼ ſᶘꞇ }ʃɔ j͑ʃɜ j͑ʃƨɹ ſɟɔ j͐ʃɹ j͑ʃᴜꞇ ʌ ſɭɹ ᶅſɹƽ j͐ʃƽɜ }ʃꞇ 🌳 ⧽≻
import * as THREE from "three";
import { k2fWrapan, kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";
import { k2fAsfanBendon, generiAsfanTrunkanSkizon, asfaTrunkaH, asfaTrunkaW } from "./asfa-sost2cel2sai.js";

export const kf2AsfanTrunkanBumpanCac2sex = sxovu((): THREE.CanvasTexture => {
  const w = asfaTrunkaW, h = asfaTrunkaH;
  return kf2P2t6zoCac2sex(w, h, ( kuns2bana ) => {
    kuns2bana.fillStyle = "#808080"; kuns2bana.fillRect(0, 0, w, h);
    const skizo = generiAsfanTrunkanSkizon();
    for ( let i = 0; i < 0o10; i++ ) {
      const r = h * ( 0o10/0o100 + Math.random() * 0o12/0o100 );
      const x = Math.random() * w, y = Math.random() * h;
      const weh2 = i % 2 ? "rgba(144,144,144,0.16)" : "rgba(72,72,72,0.16)";
      k2fWrapan(kuns2bana, w, () => {
        const g = kuns2bana.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, weh2);
        g.addColorStop(1, "rgba(128,128,128,0)");
        kuns2bana.fillStyle = g;
        kuns2bana.beginPath(); kuns2bana.arc(x, y, r, 0, Math.PI * 2); kuns2bana.fill();
      });
    }
    for ( const bendo of skizo.bendoj ) {
      k2fAsfanBendon(kuns2bana, bendo, "rgba(80,80,80,0.6)");
      k2fAsfanBendon(kuns2bana, { ...bendo, y: bendo.y + bendo.l6da }, "rgba(152,152,152,0.45)");
    }
    for ( const fibro of skizo.fibroj ) {
      const weh2 = fibro.tono < 0o5/0o10 ? "rgba(152,152,152,0.25)" : "rgba(96,96,96,0.25)";
      k2fWrapan(kuns2bana, w, () => {
        kuns2bana.strokeStyle = weh2;
        kuns2bana.lineWidth = 1;
        kuns2bana.lineCap = "round";
        kuns2bana.beginPath();
        kuns2bana.moveTo(fibro.x, 0);
        kuns2bana.quadraticCurveTo(fibro.x + 0o2, h * 0o4/0o10, fibro.x - 0o2, h);
        kuns2bana.stroke();
      });
    }
    for ( const skvamo of skizo.skvamoj ) {
      const weh2 = skvamo.hela ? "rgba(152,152,152,0.35)" : "rgba(88,88,88,0.40)";
      k2fWrapan(kuns2bana, w, () => {
        kuns2bana.fillStyle = weh2;
        kuns2bana.beginPath(); kuns2bana.arc(skvamo.x, skvamo.y, skvamo.r, 0, Math.PI * 2); kuns2bana.fill();
      });
    }
  }, [ 1, 2 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});
