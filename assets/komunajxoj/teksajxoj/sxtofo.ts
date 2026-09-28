// ≺⧼ Sxtofa reliefa teksajxo 🧵 ⧽≻
import * as THREE from "three";
import { desegniWrapajnNubojn, desegniWrapan, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiSxtofanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080";
    kunteksto.fillRect(0, 0, s, s);
    const paso = 0o10, fadeno = 0o2;
    for ( let i = 0; i < s; i += paso ) {
      const hela = ( i / paso ) % 0o2 === 0;
      kunteksto.fillStyle = hela ? "rgba(168,168,168,0.13)" : "rgba(88,88,88,0.11)";
      kunteksto.fillRect(i, 0, fadeno, s);
      kunteksto.fillStyle = hela ? "rgba(88,88,88,0.11)" : "rgba(168,168,168,0.13)";
      kunteksto.fillRect(0, i, s, fadeno);
    }
    for ( let i = 0; i < 0o400; i++ ) {
      const w = 0o1 + ( ( Math.random() * 0o3 ) | 0 ), h = 0o1 + ( ( Math.random() * 0o3 ) | 0 );
      const x = ( Math.random() * s ) | 0, y = ( Math.random() * s ) | 0;
      const griz = Math.random() < 0o1/0o2 ? "rgba(200,200,200,0.14)" : "rgba(64,64,64,0.13)";
      desegniWrapan(kunteksto, s, () => {
        kunteksto.fillStyle = griz;
        kunteksto.fillRect(x, y, w, h);
      });
    }
    desegniWrapajnNubojn(kunteksto, s, s, 0o20,
      [ "rgba(224,224,224,0.10)", "rgba(64,64,64,0.12)", "rgba(136,136,136,0.10)" ],
      0o4/0o100, 0o10/0o100);
  }, [ 1, 1 ], { sRGB: false, anisotropio: 0o10 });
});
