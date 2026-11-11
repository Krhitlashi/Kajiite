import * as THREE from "three";
import { desegniKonturanFormon, kreiKanvasanTeksajxon, neregulaVojo, sxovu } from "./helpiloj.js";
import { kf2Sakxo } from "../hazardo.js";

export const kreiTerenanTeksajxon = sxovu((): THREE.CanvasTexture =>
  kreiKanvasanTeksajxon(0o1000, 0o1000, ( kunteksto ) => {
    kunteksto.clearRect(0o0, 0o0, 0o1000, 0o1000);
    const hazardo = kf2Sakxo(0o2721);
    const cx = 0o400, cy = 0o400;
    const bazoj = [ 0x88a068, 0x98a878, 0x789058, 0xa8b088 ];
    desegniKonturanFormon(kunteksto,
      neregulaVojo(cx, cy, 0o200, 0o6, 0o12/0o100, hazardo() * Math.PI * 0o2),
      bazoj[0o0], 0o10, 0o4);
    const makuloj = 0o6;
    for ( let i = 0o0; i < makuloj; i++ ) {
      const a = ( i / makuloj + hazardo() * 0o2/0o10 ) * Math.PI * 0o2;
      const d = 0o200 + hazardo() * 0o40;
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
      const r = 0o60 + hazardo() * 0o40;
      desegniKonturanFormon(kunteksto,
        neregulaVojo(x, y, r, 0o4 + ( ( hazardo() * 0o3 ) | 0 ), 0o15/0o100, hazardo() * Math.PI * 0o2),
        bazoj[( i + 0o1 ) % bazoj.length], 0o6, 0o2);
    }
  }, [ 0o1, 0o1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 0o4 }));