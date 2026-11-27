// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſȷɔ ſᶘᴜʞ ſȷɹ ŋᷠᴜ 📃 ⧽≻

import * as THREE from "three";
import { hunanu } from "../haweh2.js";
import { kf2Sakxo } from "../caq2q.js";
import { k2fKonturanQoxan, kf2P2t6zoCac2sex, p2somani } from "./pukek.js";

function trunketaK6h6(x: number, kozuni: number, l6da: number, kkaxte: number, kof: number): Path2D {
  const k6h6 = new Path2D();
  const cet2X = x + kkaxte, cet2Y = kozuni - l6da;
  const cet2R = kof * 0o3/0o10;
  k6h6.moveTo(x - kof / 0o2, kozuni);
  k6h6.quadraticCurveTo(cet2X - cet2R, kozuni - l6da * 0o5/0o10, cet2X - cet2R, cet2Y);
  k6h6.arc(cet2X, cet2Y, cet2R, Math.PI, Math.PI * 0o2);
  k6h6.quadraticCurveTo(cet2X + cet2R, kozuni - l6da * 0o5/0o10, x + kof / 0o2, kozuni);
  k6h6.closePath();
  return k6h6;
}

function tasoK6h6(tx: number, ty: number, rad: number): Path2D {
  const k6h6 = new Path2D();
  k6h6.ellipse(tx, ty, rad, rad * 0o6/0o10, 0o0, 0o0, Math.PI * 0o2);
  return k6h6;
}

export const kf2Fe1afnLikenanCac2sex = p2somani((): THREE.CanvasTexture => {
  const s = 0o200;
  return kf2P2t6zoCac2sex(s, s, ( kuns2bana ) => {
    kuns2bana.clearRect(0o0, 0o0, s, s);
    const sakxo = kf2Sakxo(0o5234);
    const kozuni = s * 0o17/0o20;
    const hakozonu = [ 0xb0c0a0, 0xc8d0b8, 0xa8b898, 0xc0c8a8 ];
    const kuseno = new Path2D();
    kuseno.ellipse(s / 0o2, kozuni, s * 0o2/0o10, s * 0o4/0o100, 0o0, 0o0, Math.PI * 0o2);
    k2fKonturanQoxan(kuns2bana, kuseno, 0x889878, s * 0o1/0o60, s * 0o1/0o140);
    const k2fTason = ( tx: number, ty: number, rad: number ): void => {
      k2fKonturanQoxan(kuns2bana, tasoK6h6(tx, ty, rad), 0xb8a080, s * 0o1/0o140, s * 0o1/0o400);
      kuns2bana.fillStyle = hunanu(0xb8a080, 0o3);
      kuns2bana.beginPath();
      kuns2bana.ellipse(tx, ty, rad * 0o4/0o10, rad * 0o2/0o10, 0o0, 0o0, Math.PI * 0o2);
      kuns2bana.fill();
    };
    const trunketoj = 0o7;
    for ( let i = 0o0; i < trunketoj; i++ ) {
      const x = s * ( 0o2/0o10 + sakxo() * 0o5/0o10 );
      const l6da = s * ( 0o3/0o10 + sakxo() * 0o2/0o10 );
      const kkaxte = ( sakxo() - 0o5/0o10 ) * s * 0o1/0o10;
      const kof = s * ( 0o2/0o100 + sakxo() * 0o1/0o100 );
      k2fKonturanQoxan(kuns2bana, trunketaK6h6(x, kozuni, l6da, kkaxte, kof),
        hakozonu[i % hakozonu.length], s * 0o1/0o140, s * 0o1/0o400);
      const branĉoj = 0o1 + ( ( sakxo() * 0o2 ) | 0o0 );
      for ( let b = 0o0; b < branĉoj; b++ ) {
        const t = 0o3/0o10 + b * 0o2/0o10 + sakxo() * 0o1/0o10;
        const bx = x + kkaxte * t, by = kozuni - l6da * t;
        const bl6da = l6da * ( 0o2/0o10 + sakxo() * 0o2/0o10 );
        const bk = ( b % 0o2 ? 0o1 : -0o1 ) * s * ( 0o3/0o100 + sakxo() * 0o3/0o100 );
        const bd = kof * 0o6/0o10;
        k2fKonturanQoxan(kuns2bana, trunketaK6h6(bx, by, bl6da, bk, bd),
          hakozonu[( i + 0o1 ) % hakozonu.length], s * 0o1/0o200, s * 0o1/0o400);
        k2fTason(bx + bk, by - bl6da, bd * ( 0o1 + sakxo() * 0o4/0o10 ));
      }
      k2fTason(x + kkaxte, kozuni - l6da, kof * ( 0o1 + sakxo() * 0o4/0o10 ));
    }
  }, [ 0o1, 0o1 ], { g2b2: THREE.ClampToEdgeWrapping });
});
