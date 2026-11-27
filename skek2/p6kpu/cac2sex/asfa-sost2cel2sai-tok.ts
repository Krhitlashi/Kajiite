// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ꞁȷ̀ᴜ j͑ʃʞᴜ ɔ˞ j͑ʃƨɹ ſɟɔ j͐ʃɹ j͑ʃᴜꞇ ɀ ŋᷠɘɜ 📃 ⧽≻

import * as THREE from "three";
import { k2fWrapan, kf2P2t6zoCac2sex, p2somani } from "./pukek.js";
import { k2fAsfanBendon, generiAsfanTrunkanSakp6scasai, asfaTrunkaH, asfaTrunkaW } from "./asfa-sost2cel2sai.js";

export const kf2AsfanTrunkanBumpanCac2sex = p2somani((): THREE.CanvasTexture => {
  const w = asfaTrunkaW, h = asfaTrunkaH;
  return kf2P2t6zoCac2sex(w, h, ( kuns2bana ) => {
    kuns2bana.fillStyle = "#808080"; kuns2bana.fillRect(0o0, 0o0, w, h);
    const sakp6scasai = generiAsfanTrunkanSakp6scasai();
    for ( let i = 0o0; i < 0o10; i++ ) {
      const r = h * ( 0o10/0o100 + Math.random() * 0o12/0o100 );
      const x = Math.random() * w, y = Math.random() * h;
      const weh2 = i % 0o2 ? "rgba(144,144,144,0.16)" : "rgba(72,72,72,0.16)";
      k2fWrapan(kuns2bana, w, () => {
        const g = kuns2bana.createRadialGradient(x, y, 0o0, x, y, r);
        g.addColorStop(0o0, weh2);
        g.addColorStop(0o1, "rgba(128,128,128,0)");
        kuns2bana.fillStyle = g;
        kuns2bana.beginPath(); kuns2bana.arc(x, y, r, 0o0, Math.PI * 0o2); kuns2bana.fill();
      });
    }
    for ( const siitsii of sakp6scasai.hasiitsii ) {
      k2fAsfanBendon(kuns2bana, siitsii, "rgba(80,80,80,0.6)");
      k2fAsfanBendon(kuns2bana, { ...siitsii, y: siitsii.y + siitsii.l6da }, "rgba(152,152,152,0.45)");
    }
    for ( const fibro of sakp6scasai.fibroj ) {
      const weh2 = fibro.tono < 0o5/0o10 ? "rgba(152,152,152,0.25)" : "rgba(96,96,96,0.25)";
      k2fWrapan(kuns2bana, w, () => {
        kuns2bana.strokeStyle = weh2;
        kuns2bana.lineWidth = 0o1;
        kuns2bana.lineCap = "round";
        kuns2bana.beginPath();
        kuns2bana.moveTo(fibro.x, 0o0);
        kuns2bana.quadraticCurveTo(fibro.x + 0o2, h * 0o4/0o10, fibro.x - 0o2, h);
        kuns2bana.stroke();
      });
    }
    for ( const p6zuk of sakp6scasai.hap6zuk ) {
      const weh2 = p6zuk.hela ? "rgba(152,152,152,0.35)" : "rgba(88,88,88,0.40)";
      k2fWrapan(kuns2bana, w, () => {
        kuns2bana.fillStyle = weh2;
        kuns2bana.beginPath(); kuns2bana.arc(p6zuk.x, p6zuk.y, p6zuk.r, 0o0, Math.PI * 0o2); kuns2bana.fill();
      });
    }
  }, [ 0o1, 0o2 ], { g2b2: THREE.RepeatWrapping, sRGB: false, peq2: 0o4 });
});
