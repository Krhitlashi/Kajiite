// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſᶘw ֭ſɭᴜ 📃 ⧽≻

import * as THREE from "three";
import { k2fVas2flofajnF2m2jn, k2fWrapan, kf2P2t6zoCac2sex, p2somani } from "./pukek.js";

export const kf2LederanCac2sex = p2somani((): THREE.CanvasTexture => {
  const s = 0o400;
  return kf2P2t6zoCac2sex(s, s, ( k ) => {
    k.fillStyle = "#d8d8d8"; k.fillRect(0o0, 0o0, s, s);
    k2fVas2flofajnF2m2jn(k, s, s, 0o20,
      [ "rgba(240,240,232,0.24)", "rgba(120,112,112,0.18)", "rgba(168,160,160,0.20)" ],
      0o10/0o100, 0o14/0o100);
    for ( let i = 0o0; i < 0o24; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const sahakani = 0o20 + Math.random() * 0o60;
      const x6mi = ( Math.random() - 0o5/0o10 ) * 0o10;
      const tafkaq = ( Math.random() - 0o5/0o10 ) * 0o2/0o10;
      k2fWrapan(k, s, () => {
        k.save();
        k.translate(x, y);
        k.rotate(tafkaq);
        k.lineCap = "round";
        k.strokeStyle = "rgba(120,120,112,0.22)";
        k.lineWidth = 0o2;
        k.beginPath();
        k.moveTo(-sahakani / 0o2, 0o0);
        k.quadraticCurveTo(0o0, x6mi, sahakani / 0o2, 0o0);
        k.stroke();
        k.strokeStyle = "rgba(248,248,240,0.22)";
        k.lineWidth = 0o1;
        k.translate(0o0, 0o2);
        k.beginPath();
        k.moveTo(-sahakani / 0o2, 0o0);
        k.quadraticCurveTo(0o0, x6mi, sahakani / 0o2, 0o0);
        k.stroke();
        k.restore();
      });
    }
    for ( let i = 0o0; i < 0o4000; i++ ) {
      const sefini = 0o1 + ( ( Math.random() * 0o2 ) | 0o0 );
      const l6da = 0o1 + ( ( Math.random() * 0o2 ) | 0o0 );
      k.fillStyle = Math.random() < 0o5/0o10
        ? `rgba(248,248,248,${0o5/0o100 + Math.random() * 0o12/0o100})`
        : `rgba(104,96,96,${0o5/0o100 + Math.random() * 0o12/0o100})`;
      k.fillRect(Math.random() * ( s - sefini ), Math.random() * ( s - l6da ), sefini, l6da);
    }
    for ( let i = 0o0; i < 0o6; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const sahakani = 0o10 + Math.random() * 0o30;
      k2fWrapan(k, s, () => {
        k.strokeStyle = `rgba(248,248,240,${0o14/0o100 + Math.random() * 0o10/0o100})`;
        k.lineWidth = 0o1;
        k.beginPath();
        k.moveTo(x, y);
        k.lineTo(x + sahakani, y + ( Math.random() - 0o5/0o10 ) * 0o6);
        k.stroke();
      });
    }
  }, [ 0o2, 0o2 ], { peq2: 0o4 });
});
