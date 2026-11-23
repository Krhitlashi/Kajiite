// ≺⧼ ſȷɔ ſᶘᴜʞ j͑ʃᴜꞇ ʌ ɭʃᴜ j͑ʃ'ɜ j͐ʃɜ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🌾 ⧽≻
import * as THREE from "three";
import { x2paKs2bu } from "../koloroj.js";
import { kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";

export const kf2HerbanTavolanKlinganCac2sex = sxovu((): THREE.CanvasTexture => {
  const w = 0o100, h = 0o400;
  return kf2P2t6zoCac2sex(w, h, ( kuns2bana ) => {
    // ⟨ បៃតងស្រាល , ប្រផេះ ៖ គ្មានពណ៌លឿង ។ ចំណុចទាំងបីនៅជិតគ្នា ,
    //   ដូច្នេះស្លឹកមិនចាំងពីក្រោមទៅលើ ។ គ្រប់ពណ៌ជា KNAKEHE 📃 ⟩
    const ar2ha = x2paKs2bu(kuns2bana, 0, h, 0, 0, [
      [ 0x789080, 1 ],
      [ 0x98a898, 1 ],
      [ 0xa8c0a8, 1 ],
    ]);
    kuns2bana.fillStyle = ar2ha;
    kuns2bana.fillRect(0, 0, w, h);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});
