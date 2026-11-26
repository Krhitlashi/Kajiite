// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſᶘᴜȝ 📃 ⧽≻

import * as THREE from "three";
import { k2fWrapan, kf2P2t6zoCac2sex, senAlfa, p2somani } from "./mafezi.js";

export const kf2HaranCac2sex = p2somani((): THREE.CanvasTexture => {
  const s = 0o400;
  return kf2P2t6zoCac2sex(s, s, ( k ) => {
    k.fillStyle = "#d8d8d8"; k.fillRect(0o0, 0o0, s, s);
    for ( let i = 0o0; i < 0o160; i++ ) {
      const x = Math.random() * s;
      const sefini = 0o4 + Math.random() * 0o20;
      const hela = Math.random() < 0o5/0o10;
      const forteco = 0o16/0o100 + Math.random() * 0o20/0o100;
      const n2k = hela
        ? `rgba(248,248,240,${forteco})`
        : `rgba(64,72,96,${forteco})`;
      k2fWrapan(k, s, () => {
        const g = k.createLinearGradient(x, 0o0, x + sefini, 0o0);
        g.addColorStop(0o0, senAlfa(n2k));
        g.addColorStop(0o1/0o2, n2k);
        g.addColorStop(0o1, senAlfa(n2k));
        k.fillStyle = g;
        k.fillRect(x, 0o0, sefini, s);
      });
    }
    k.lineCap = "round";
    for ( let i = 0o0; i < 0o700; i++ ) {
      const sahakani = 0o100 + ( ( Math.random() * 0o300 ) | 0o0 );
      const s2sabo = ( Math.random() - 0o5/0o10 ) * 0o1;
      const forteco = 0o6/0o100 + Math.random() * 0o22/0o100;
      const weh2 = Math.random() < 0o5/0o10
        ? `rgba(255,255,248,${forteco})`
        : `rgba(64,72,96,${forteco})`;
      const x = Math.random() * ( s - 0o4 ), y = Math.random() * ( s - sahakani );
      const g = k.createLinearGradient(x, y, x + s2sabo, y + sahakani);
      g.addColorStop(0o0, senAlfa(weh2));
      g.addColorStop(0o1/0o2, weh2);
      g.addColorStop(0o1, senAlfa(weh2));
      k.strokeStyle = g;
      k.lineWidth = 0o1;
      k.beginPath();
      k.moveTo(x, y);
      k.quadraticCurveTo(x + s2sabo * 0o1/0o2, y + sahakani * 0o1/0o2, x + s2sabo, y + sahakani);
      k.stroke();
    }
    const hazace = k.createLinearGradient(0o0, 0o0, 0o0, s);
    hazace.addColorStop(0o0, "rgba(80,88,112,0.20)");
    hazace.addColorStop(0o5/0o10, "rgba(80,88,112,0.04)");
    hazace.addColorStop(0o1, "rgba(80,88,112,0)");
    k.fillStyle = hazace;
    k.fillRect(0o0, 0o0, s, s);
  }, [ 0o3, 0o1 ], { anisotropio: 0o4 });
});
