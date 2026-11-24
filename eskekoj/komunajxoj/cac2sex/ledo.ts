// ≺⧼ j͐ʃƽɜ ʌ ſᶘw ֭ſɭᴜ 👞 ⧽≻
import * as THREE from "three";
import { k2fWrapajnNubojn, k2fWrapan, kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";

export const kf2LederanCac2sex = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kf2P2t6zoCac2sex(s, s, ( k ) => {
    k.fillStyle = "#d8d8d8"; k.fillRect(0, 0, s, s);
    k2fWrapajnNubojn(k, s, s, 0o20,
      [ "rgba(240,240,232,0.24)", "rgba(120,112,112,0.18)", "rgba(168,160,160,0.20)" ],
      0o10/0o100, 0o14/0o100);
    for ( let i = 0; i < 0o24; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const sahakani = 0o20 + Math.random() * 0o60;
      const ondo = ( Math.random() - 0o5/0o10 ) * 0o10;
      const tafkaq = ( Math.random() - 0o5/0o10 ) * 0o2/0o10;
      k2fWrapan(k, s, () => {
        k.save();
        k.translate(x, y);
        k.rotate(tafkaq);
        k.lineCap = "round";
        k.strokeStyle = "rgba(120,120,112,0.22)";
        k.lineWidth = 0o2;
        k.beginPath();
        k.moveTo(-sahakani / 0o2, 0);
        k.quadraticCurveTo(0, ondo, sahakani / 0o2, 0);
        k.stroke();
        k.strokeStyle = "rgba(248,248,240,0.22)";
        k.lineWidth = 0o1;
        k.translate(0, 0o2);
        k.beginPath();
        k.moveTo(-sahakani / 0o2, 0);
        k.quadraticCurveTo(0, ondo, sahakani / 0o2, 0);
        k.stroke();
        k.restore();
      });
    }
    for ( let i = 0; i < 0o4000; i++ ) {
      const sefini = 0o1 + ( ( Math.random() * 0o2 ) | 0 );
      const l6da = 0o1 + ( ( Math.random() * 0o2 ) | 0 );
      k.fillStyle = Math.random() < 0o5/0o10
        ? `rgba(248,248,248,${0o5/0o100 + Math.random() * 0o12/0o100})`
        : `rgba(104,96,96,${0o5/0o100 + Math.random() * 0o12/0o100})`;
      k.fillRect(Math.random() * ( s - sefini ), Math.random() * ( s - l6da ), sefini, l6da);
    }
    for ( let i = 0; i < 0o6; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const sahakani = 0o10 + Math.random() * 0o30;
      k2fWrapan(k, s, () => {
        k.strokeStyle = `rgba(248,248,240,${0o14/0o100 + Math.random() * 0o10/0o100})`;
        k.lineWidth = 1;
        k.beginPath();
        k.moveTo(x, y);
        k.lineTo(x + sahakani, y + ( Math.random() - 0o5/0o10 ) * 0o6);
        k.stroke();
      });
    }
  }, [ 0o2, 0o2 ], { anisotropio: 0o4 });
});
