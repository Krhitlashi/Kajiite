// ≺⧼ វាយនភាពស្លែប៊ីសូអ៊ីត 🕸️ ⧽≻
import * as THREE from "three";
import { kf2Sakxo } from "../hazardo.js";
import { desegniKonturanFormon, kreiKanvasanTeksajxon, neregulaVojo, sxovu } from "./helpiloj.js";

export const kreiByssoidanLikenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0o0, 0o0, s, s);
    const hazardo = kf2Sakxo(0o5233);
    const cx = s / 0o2, cy = s / 0o2;
    const bazoj = [ 0xc8d0b0, 0xd0d8b8, 0xb8c0a0, 0xd8e0c0 ];
    desegniKonturanFormon(kunteksto,
      neregulaVojo(cx, cy, s * 0o16/0o100, 0o6, 0o2/0o10, hazardo() * Math.PI * 0o2),
      0x889878, s * 0o1/0o40, s * 0o1/0o100);
    const tufoj = 0o12;
    for ( let i = 0o0; i < tufoj; i++ ) {
      const a = ( i / tufoj + ( hazardo() - 0o5/0o10 ) * 0o2/0o10 ) * Math.PI * 0o2;
      const d = s * ( 0o15/0o100 + hazardo() * 0o6/0o100 );
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
      const r = s * ( 0o5/0o100 + hazardo() * 0o3/0o100 );
      desegniKonturanFormon(kunteksto,
        neregulaVojo(x, y, r, 0o6, 0o15/0o100, hazardo() * Math.PI * 0o2),
        bazoj[i % bazoj.length], s * 0o1/0o60, s * 0o1/0o140);
    }
    const granetoj = 0o10;
    for ( let i = 0o0; i < granetoj; i++ ) {
      const a = hazardo() * Math.PI * 0o2;
      const d = s * hazardo() * 0o16/0o100;
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
      const r = s * ( 0o1/0o100 + hazardo() * 0o1/0o100 );
      const disko = new Path2D();
      disko.arc(x, y, r, 0o0, Math.PI * 0o2);
      desegniKonturanFormon(kunteksto, disko, 0xe0e0c8, s * 0o1/0o200, s * 0o1/0o400);
    }
  }, [ 0o1, 0o1 ], { volvado: THREE.ClampToEdgeWrapping });
});