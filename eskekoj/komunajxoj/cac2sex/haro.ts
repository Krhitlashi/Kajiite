// ≺⧼ ſᶘᴜȝ ꞁȷ̀ᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 💇 ⧽≻
import * as THREE from "three";
import { k2fWrapan, kf2P2t6zoCac2sex, senAlfa, sxovu } from "./helpiloj.js";

export const kf2HaranCac2sex = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kf2P2t6zoCac2sex(s, s, ( k ) => {
    k.fillStyle = "#d8d8d8"; k.fillRect(0, 0, s, s);
    for ( let i = 0; i < 0o160; i++ ) {
      const x = Math.random() * s;
      const sefini = 0o4 + Math.random() * 0o20;
      const hela = Math.random() < 0o5/0o10;
      const forteco = 0o16/0o100 + Math.random() * 0o20/0o100;
      const pinto = hela
        ? `rgba(248,248,240,${forteco})`
        : `rgba(64,72,96,${forteco})`;
      k2fWrapan(k, s, () => {
        const g = k.createLinearGradient(x, 0, x + sefini, 0);
        g.addColorStop(0, senAlfa(pinto));
        g.addColorStop(0o1/0o2, pinto);
        g.addColorStop(1, senAlfa(pinto));
        k.fillStyle = g;
        k.fillRect(x, 0, sefini, s);
      });
    }
    k.lineCap = "round";
    for ( let i = 0; i < 0o700; i++ ) {
      const sahakani = 0o100 + ( ( Math.random() * 0o300 ) | 0 );
      const klino = ( Math.random() - 0o5/0o10 ) * 0o1;
      const forteco = 0o6/0o100 + Math.random() * 0o22/0o100;
      const weh2 = Math.random() < 0o5/0o10
        ? `rgba(255,255,248,${forteco})`
        : `rgba(64,72,96,${forteco})`;
      const x = Math.random() * ( s - 0o4 ), y = Math.random() * ( s - sahakani );
      const g = k.createLinearGradient(x, y, x + klino, y + sahakani);
      g.addColorStop(0, senAlfa(weh2));
      g.addColorStop(0o1/0o2, weh2);
      g.addColorStop(1, senAlfa(weh2));
      k.strokeStyle = g;
      k.lineWidth = 1;
      k.beginPath();
      k.moveTo(x, y);
      k.quadraticCurveTo(x + klino * 0o1/0o2, y + sahakani * 0o1/0o2, x + klino, y + sahakani);
      k.stroke();
    }
    const hazace = k.createLinearGradient(0, 0, 0, s);
    hazace.addColorStop(0, "rgba(80,88,112,0.20)");
    hazace.addColorStop(0o5/0o10, "rgba(80,88,112,0.04)");
    hazace.addColorStop(1, "rgba(80,88,112,0)");
    k.fillStyle = hazace;
    k.fillRect(0, 0, s, s);
  }, [ 0o3, 0o1 ], { anisotropio: 0o4 });
});
