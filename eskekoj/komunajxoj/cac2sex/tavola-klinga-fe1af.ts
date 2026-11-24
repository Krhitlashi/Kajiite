// ≺⧼ ſȷɔ ſᶘᴜʞ j͑ʃᴜꞇ ʌ ɭʃᴜ j͑ʃ'ɜ j͐ʃɜ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🌾 ⧽≻
import * as THREE from "three";
import { x2paKs2bu } from "../koloroj.js";
import { kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";

export const kf2HerbanTavolanKlinganCac2sex = sxovu((): THREE.CanvasTexture => {
  const w = 0o100, h = 0o400;
  return kf2P2t6zoCac2sex(w, h, ( kuns2bana ) => {
    // ⟨ j͐ʃᴜ̩ᴜ , ֭ſɭwƽ , ꞙɭɔ ʌ ſɟɔ ɭl̀ɔ ⟅ ſɟɔ ɭʃɹ ʌ ꞙɭц ʌ ſɭᴜ ſɭw j͐ʃᴜ ,
    //   ſɭɹ ʌ j͑ʃͷ̗ᴜʞ ʌ ꞙɭɔ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ⟅ ᶅſɔ ֭ſɭɹ ʌ j͑ʃᴜꞇ ʌ KNAKEHE 📃 ⟩
    const ar2ha = x2paKs2bu(kuns2bana, 0, h, 0, 0, [
      [ 0x789080, 1 ],
      [ 0x98a898, 1 ],
      [ 0xa8c0a8, 1 ],
    ]);
    kuns2bana.fillStyle = ar2ha;
    kuns2bana.fillRect(0, 0, w, h);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});
