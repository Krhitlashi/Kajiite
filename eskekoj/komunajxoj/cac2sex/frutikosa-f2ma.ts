// ≺⧼ ſȷɹ ŋᷠᴜ j͑ʃᴜꞇ ʌ ſȷƣ̋w ɭʃꞇ ſɭɜ j͑ʃᴜ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🫐 ⧽≻
import * as THREE from "three";
import { hunanu } from "../koloroj.js";
import { kf2Sakxo } from "../hazardo.js";
import { k2fKonturanQoxan, kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";

// ⟨ ɭʃɜ ſɭɹȝ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ ʌ ſɭɔƽ , ſןɔ ſ͕ɭɔ }ʃꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɟᴜ ſȷᴜ ʌ ſןw ſɭᴜƴ ʌ ſɭᴜ ſɭw j͐ʃᴜ 📃 ⟩
function trunketaK6h6(x: number, kozuni: number, l6da: number, kkaxte: number, dikeco: number): Path2D {
  const k6h6 = new Path2D();
  const pintoX = x + kkaxte, pintoY = kozuni - l6da;
  const pintoR = dikeco * 0o3/0o10;
  k6h6.moveTo(x - dikeco / 0o2, kozuni);
  k6h6.quadraticCurveTo(pintoX - pintoR, kozuni - l6da * 0o5/0o10, pintoX - pintoR, pintoY);
  k6h6.arc(pintoX, pintoY, pintoR, Math.PI, Math.PI * 0o2);
  k6h6.quadraticCurveTo(pintoX + pintoR, kozuni - l6da * 0o5/0o10, x + dikeco / 0o2, kozuni);
  k6h6.closePath();
  return k6h6;
}

function tasoK6h6(tx: number, ty: number, rad: number): Path2D {
  const k6h6 = new Path2D();
  k6h6.ellipse(tx, ty, rad, rad * 0o6/0o10, 0, 0o0, Math.PI * 0o2);
  return k6h6;
}

export const kf2FrutikosanLikenanCac2sex = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kf2P2t6zoCac2sex(s, s, ( kuns2bana ) => {
    kuns2bana.clearRect(0o0, 0o0, s, s);
    const hazardo = kf2Sakxo(0o5234);
    const kozuni = s * 0o17/0o20;
    const bazoj = [ 0xb0c0a0, 0xc8d0b8, 0xa8b898, 0xc0c8a8 ];
    const kuseno = new Path2D();
    kuseno.ellipse(s / 0o2, kozuni, s * 0o2/0o10, s * 0o4/0o100, 0, 0o0, Math.PI * 0o2);
    k2fKonturanQoxan(kuns2bana, kuseno, 0x889878, s * 0o1/0o60, s * 0o1/0o140);
    const k2fTason = ( tx: number, ty: number, rad: number ): void => {
      k2fKonturanQoxan(kuns2bana, tasoK6h6(tx, ty, rad), 0xb8a080, s * 0o1/0o140, s * 0o1/0o400);
      kuns2bana.fillStyle = hunanu(0xb8a080, 0o3);
      kuns2bana.beginPath();
      kuns2bana.ellipse(tx, ty, rad * 0o4/0o10, rad * 0o2/0o10, 0, 0o0, Math.PI * 0o2);
      kuns2bana.fill();
    };
    const trunketoj = 0o7;
    for ( let i = 0o0; i < trunketoj; i++ ) {
      const x = s * ( 0o2/0o10 + hazardo() * 0o5/0o10 );
      const l6da = s * ( 0o3/0o10 + hazardo() * 0o2/0o10 );
      const kkaxte = ( hazardo() - 0o5/0o10 ) * s * 0o1/0o10;
      const dikeco = s * ( 0o2/0o100 + hazardo() * 0o1/0o100 );
      k2fKonturanQoxan(kuns2bana, trunketaK6h6(x, kozuni, l6da, kkaxte, dikeco),
        bazoj[i % bazoj.length], s * 0o1/0o140, s * 0o1/0o400);
      const branĉoj = 0o1 + ( ( hazardo() * 0o2 ) | 0 );
      for ( let b = 0o0; b < branĉoj; b++ ) {
        const t = 0o3/0o10 + b * 0o2/0o10 + hazardo() * 0o1/0o10;
        const bx = x + kkaxte * t, by = kozuni - l6da * t;
        const balto = l6da * ( 0o2/0o10 + hazardo() * 0o2/0o10 );
        const bk = ( b % 0o2 ? 1 : -1 ) * s * ( 0o3/0o100 + hazardo() * 0o3/0o100 );
        const bd = dikeco * 0o6/0o10;
        k2fKonturanQoxan(kuns2bana, trunketaK6h6(bx, by, balto, bk, bd),
          bazoj[( i + 1 ) % bazoj.length], s * 0o1/0o200, s * 0o1/0o400);
        k2fTason(bx + bk, by - balto, bd * ( 0o1 + hazardo() * 0o4/0o10 ));
      }
      k2fTason(x + kkaxte, kozuni - l6da, dikeco * ( 0o1 + hazardo() * 0o4/0o10 ));
    }
  }, [ 0o1, 0o1 ], { volvado: THREE.ClampToEdgeWrapping });
});
