// ≺⧼ Leda teksajxo 👞 ⧽≻
import * as THREE from "three";
import { desegniWrapajnNubojn, desegniWrapan, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiLederanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( k ) => {
    k.fillStyle = "#d8d8d8"; k.fillRect(0, 0, s, s);
    desegniWrapajnNubojn(k, s, s, 0o20,
      [ "rgba(240,240,236,0.24)", "rgba(120,118,112,0.18)", "rgba(168,166,160,0.20)" ],
      0o10/0o100, 0o14/0o100);
    for ( let i = 0; i < 0o24; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const longo = 0o20 + Math.random() * 0o60;
      const ondo = ( Math.random() - 0o5/0o10 ) * 0o10;
      const angulo = ( Math.random() - 0o5/0o10 ) * 0o2/0o10;
      desegniWrapan(k, s, () => {
        k.save();
        k.translate(x, y);
        k.rotate(angulo);
        k.lineCap = "round";
        k.strokeStyle = "rgba(126,124,118,0.22)";
        k.lineWidth = 0o2;
        k.beginPath();
        k.moveTo(-longo / 0o2, 0);
        k.quadraticCurveTo(0, ondo, longo / 0o2, 0);
        k.stroke();
        k.strokeStyle = "rgba(248,248,244,0.22)";
        k.lineWidth = 0o1;
        k.translate(0, 0o2);
        k.beginPath();
        k.moveTo(-longo / 0o2, 0);
        k.quadraticCurveTo(0, ondo, longo / 0o2, 0);
        k.stroke();
        k.restore();
      });
    }
    for ( let i = 0; i < 0o4000; i++ ) {
      const largho = 0o1 + ( ( Math.random() * 0o2 ) | 0 );
      const alto = 0o1 + ( ( Math.random() * 0o2 ) | 0 );
      k.fillStyle = Math.random() < 0o5/0o10
        ? `rgba(252,252,248,${0o5/0o100 + Math.random() * 0o12/0o100})`
        : `rgba(104,102,98,${0o5/0o100 + Math.random() * 0o12/0o100})`;
      k.fillRect(Math.random() * ( s - largho ), Math.random() * ( s - alto ), largho, alto);
    }
    for ( let i = 0; i < 0o6; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const longo = 0o10 + Math.random() * 0o30;
      desegniWrapan(k, s, () => {
        k.strokeStyle = `rgba(250,250,246,${0o14/0o100 + Math.random() * 0o10/0o100})`;
        k.lineWidth = 1;
        k.beginPath();
        k.moveTo(x, y);
        k.lineTo(x + longo, y + ( Math.random() - 0o5/0o10 ) * 0o6);
        k.stroke();
      });
    }
  }, [ 0o2, 0o2 ], { anisotropio: 0o4 });
});
