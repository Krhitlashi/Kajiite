// ≺⧼ វាយនភាពស្លែស្លឹក 🍃 ⧽≻
import * as THREE from "three";
import { kf2Sakxo } from "../hazardo.js";
import { desegniKonturanFormon, kreiKanvasanTeksajxon, neregulaVojo, sxovu } from "./helpiloj.js";

export const kreiFolisanLikenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0o0, 0o0, s, s);
    const hazardo = kf2Sakxo(0o5232);
    const cx = s / 0o2, cy = s / 0o2;
    const bazoj = [ 0xb0c098, 0xb8c8a8, 0xc8d0b0, 0x98b088 ];
    desegniKonturanFormon(kunteksto,
      neregulaVojo(cx, cy, s * 0o16/0o100, 0o7, 0o25/0o100, hazardo() * Math.PI * 0o2),
      0x98b088, s * 0o1/0o40, s * 0o1/0o100);
    const loboj = 0o16;
    for ( let i = 0o0; i < loboj; i++ ) {
      const a = ( i / loboj + ( hazardo() - 0o5/0o10 ) * 0o1/0o10 ) * Math.PI * 0o2;
      const d = s * ( 0o12/0o100 + hazardo() * 0o5/0o100 );
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
      const r = s * ( 0o4/0o100 + hazardo() * 0o3/0o100 );
      desegniKonturanFormon(kunteksto,
        neregulaVojo(x, y, r, 0o5, 0o3/0o10, hazardo() * Math.PI * 0o2),
        bazoj[i % bazoj.length], s * 0o1/0o60, s * 0o1/0o140);
    }
    const apotecioj = 0o7;
    for ( let i = 0o0; i < apotecioj; i++ ) {
      const a = hazardo() * Math.PI * 0o2;
      const d = s * hazardo() * 0o12/0o100;
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
      const r = s * ( 0o15/0o1000 + hazardo() * 0o1/0o100 );
      const disko = new Path2D();
      disko.arc(x, y, r, 0o0, Math.PI * 0o2);
      desegniKonturanFormon(kunteksto, disko, 0xb87858, s * 0o1/0o140, s * 0o1/0o200);
    }
  }, [ 0o1, 0o1 ], { volvado: THREE.ClampToEdgeWrapping });
});
