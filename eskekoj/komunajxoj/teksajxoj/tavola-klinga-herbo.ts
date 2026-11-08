// ≺⧼ វាយនភាពស្មៅស្រទាប់ 🌾 ⧽≻
import * as THREE from "three";
import { liniaGradiento } from "../koloroj.js";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiHerbanTavolanKlinganTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = 0o100, h = 0o400;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    // ⟨ បៃតងស្រាល , ប្រផេះ ៖ គ្មានពណ៌លឿង ។ ចំណុចទាំងបីនៅជិតគ្នា ,
    //   ដូច្នេះស្លឹកមិនចាំងពីក្រោមទៅលើ ។ គ្រប់ពណ៌ជា KNAKEHE 📃 ⟩
    const gradiento = liniaGradiento(kunteksto, 0, h, 0, 0, [
      [ 0x789080, 1 ],
      [ 0x98a898, 1 ],
      [ 0xa8c0a8, 1 ],
    ]);
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});
