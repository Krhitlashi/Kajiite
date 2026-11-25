// ≺⧼ ſȷɔ ſᶘᴜʞ j͑ʃᴜꞇ ʌ ſɭͷ̗ꞇ }ʃɴᴜ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🌾 ⧽≻
import * as THREE from "three";
import { kf2Sakxo } from "../caq2q.js";
import { kf2P2t6zoCac2sex, p2somani } from "./mafezi.js";

export const kf2HerbanKlinganCac2sex = p2somani((): THREE.CanvasTexture => {
  const w = 0o100, h = 0o400;
  return kf2P2t6zoCac2sex(w, h, ( kuns2bana ) => {
    // ⟨ j͐ʃᴜ̩ᴜ , ֭ſɭwƽ , j͐ʃᴜ̩ᴜ ʌ ſɭɜʞ ⟅ ſɟɔ ɭʃɹ ʌ j͑ʃͷ̗ᴜʞ ʌ ꞙɭɔ ʌ ſɟɔ ɭl̀ɔ 📃 ⟩
    const ar2ha = kuns2bana.createLinearGradient(0, h, 0, 0);
    ar2ha.addColorStop(0, "#203028");
    ar2ha.addColorStop(0o1/0o4, "#305038");
    ar2ha.addColorStop(0o43/0o100, "#507858");
    ar2ha.addColorStop(0o15/0o20, "#88a088");
    ar2ha.addColorStop(1, "#b8c0b0");
    kuns2bana.fillStyle = ar2ha;
    kuns2bana.fillRect(0, 0, w, h);
    const meza = w / 2;
    const kresto = kuns2bana.createLinearGradient(meza - 6, 0, meza + 6, 0);
    kresto.addColorStop(0, "rgba(16,32,24,0.30)");
    kresto.addColorStop(0o13/0o40, "rgba(200,208,192,0.28)");
    kresto.addColorStop(0o1/0o2, "rgba(216,224,208,0.34)");
    kresto.addColorStop(0o25/0o40, "rgba(200,208,192,0.28)");
    kresto.addColorStop(1, "rgba(16,32,24,0.30)");
    kuns2bana.fillStyle = kresto;
    kuns2bana.fillRect(meza - 6, 0, 0o14, h);
    const sakxo = kf2Sakxo(0o2717);
    for ( let i = 0; i < 0o22; i++ ) {
      const x = sakxo() * w;
      const h6kuni = Math.abs(x - meza) / meza;
      kuns2bana.fillStyle = sakxo() < 0o1/0o2
        ? `rgba(24,48,32,${0o3/0o40 + h6kuni * 0o1/0o10})`
        : `rgba(176,192,176,${0o1/0o20 + ( 1 - h6kuni ) * 0o3/0o40})`;
      kuns2bana.fillRect(x, 0, 1, h);
    }
    kuns2bana.fillStyle = "rgba(16,32,24,0.34)";
    kuns2bana.fillRect(0, 0, 0o3/0o2, h);
    kuns2bana.fillRect(w - 0o3/0o2, 0, 0o3/0o2, h);
    const kozunu = kuns2bana.createLinearGradient(0, h, 0, h * 0o3/0o4);
    kozunu.addColorStop(0, "rgba(8,24,16,0.55)");
    kozunu.addColorStop(1, "rgba(8,24,16,0)");
    kuns2bana.fillStyle = kozunu;
    kuns2bana.fillRect(0, h * 0o3/0o4, w, h * 0o1/0o4);
  }, [ 1, 1 ], { g2b2: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});
