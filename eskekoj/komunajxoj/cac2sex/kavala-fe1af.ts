// ≺⧼ ſɭᴜ j͑ʃ'ᴜ j͐ʃᴜ j͑ʃᴜꞇ ʌ ſȷɔ ſᶘᴜʞ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🌾 ⧽≻
import * as THREE from "three";
import { kf2P2t6zoCac2sex } from "./helpiloj.js";

export function kf2KavalErbanCac2sex(branĉa: boolean): THREE.CanvasTexture {
  const w = 0o200, h = 0o100;
  return kf2P2t6zoCac2sex(w, h, ( kuns2bana ) => {
    const baza = branĉa ? "#58a070" : "#488860";
    const hela = branĉa ? "#88c088" : "#70a878";
    const hunanu = branĉa ? "#286048" : "#204838";
    const ar2ha = kuns2bana.createLinearGradient(0, 0, w, 0);
    ar2ha.addColorStop(0, hunanu);
    ar2ha.addColorStop(0o17/0o100, baza);
    ar2ha.addColorStop(0o5/0o10, hela);
    ar2ha.addColorStop(0o61/0o100, baza);
    ar2ha.addColorStop(1, hunanu);
    kuns2bana.fillStyle = ar2ha;
    kuns2bana.fillRect(0, 0, w, h);
    for ( let i = 0; i < 0o20; i++ ) {
      const x = i / 0o20 * w;
      kuns2bana.fillStyle = i % 2 === 0 ? "rgba(208,240,184,0.30)" : "rgba(16,56,40,0.34)";
      kuns2bana.fillRect(x, 0, w / 0o20 * 0o1/0o2, h);
    }
    kuns2bana.fillStyle = "rgba(16,56,40,0.32)";
    kuns2bana.fillRect(0, 0, w, h * 0o1/0o10);
    kuns2bana.fillStyle = "rgba(216,240,184,0.26)";
    kuns2bana.fillRect(0, h * 0o1/0o10, w, 2);
    for ( let i = 0; i < 0o70; i++ ) {
      const x = Math.random() * w, y = Math.random() * h;
      const weh2 = i % 0o3 ? "rgba(24,72,56,0.20)" : "rgba(216,232,176,0.24)";
      kuns2bana.fillStyle = weh2;
      kuns2bana.fillRect(x, y, 1 + Math.random(), 1 + Math.random() * 0o2);
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}
