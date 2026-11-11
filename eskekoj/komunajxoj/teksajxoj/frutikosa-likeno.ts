// ≺⧼ វាយនភាពស្លែផ្លែ 🫐 ⧽≻
import * as THREE from "three";
import { ombro } from "../koloroj.js";
import { kf2Sakxo } from "../hazardo.js";
import { desegniKonturanFormon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

// ⟨ ដើមតូចបញ្ឈរ ៖ ផ្ទាំងឆ្លុះគ្នាត្រូវការរូបរាងបញ្ឈរដែលមានគែមមូល 📃 ⟩
function trunketaVojo(x: number, bazo: number, alto: number, kurbo: number, dikeco: number): Path2D {
  const vojo = new Path2D();
  const pintoX = x + kurbo, pintoY = bazo - alto;
  const pintoR = dikeco * 0o3/0o10;
  vojo.moveTo(x - dikeco / 0o2, bazo);
  vojo.quadraticCurveTo(pintoX - pintoR, bazo - alto * 0o5/0o10, pintoX - pintoR, pintoY);
  vojo.arc(pintoX, pintoY, pintoR, Math.PI, Math.PI * 0o2);
  vojo.quadraticCurveTo(pintoX + pintoR, bazo - alto * 0o5/0o10, x + dikeco / 0o2, bazo);
  vojo.closePath();
  return vojo;
}

function tasoVojo(tx: number, ty: number, rad: number): Path2D {
  const vojo = new Path2D();
  vojo.ellipse(tx, ty, rad, rad * 0o6/0o10, 0, 0o0, Math.PI * 0o2);
  return vojo;
}

export const kreiFrutikosanLikenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0o0, 0o0, s, s);
    const hazardo = kf2Sakxo(0o5234);
    const bazo = s * 0o17/0o20;
    const bazoj = [ 0xb0c0a0, 0xc8d0b8, 0xa8b898, 0xc0c8a8 ];
    const kuseno = new Path2D();
    kuseno.ellipse(s / 0o2, bazo, s * 0o2/0o10, s * 0o4/0o100, 0, 0o0, Math.PI * 0o2);
    desegniKonturanFormon(kunteksto, kuseno, 0x889878, s * 0o1/0o60, s * 0o1/0o140);
    const desegniTason = ( tx: number, ty: number, rad: number ): void => {
      desegniKonturanFormon(kunteksto, tasoVojo(tx, ty, rad), 0xb8a080, s * 0o1/0o140, s * 0o1/0o400);
      kunteksto.fillStyle = ombro(0xb8a080, 0o3);
      kunteksto.beginPath();
      kunteksto.ellipse(tx, ty, rad * 0o4/0o10, rad * 0o2/0o10, 0, 0o0, Math.PI * 0o2);
      kunteksto.fill();
    };
    const trunketoj = 0o7;
    for ( let i = 0o0; i < trunketoj; i++ ) {
      const x = s * ( 0o2/0o10 + hazardo() * 0o5/0o10 );
      const alto = s * ( 0o3/0o10 + hazardo() * 0o2/0o10 );
      const kurbo = ( hazardo() - 0o5/0o10 ) * s * 0o1/0o10;
      const dikeco = s * ( 0o2/0o100 + hazardo() * 0o1/0o100 );
      desegniKonturanFormon(kunteksto, trunketaVojo(x, bazo, alto, kurbo, dikeco),
        bazoj[i % bazoj.length], s * 0o1/0o140, s * 0o1/0o400);
      const branĉoj = 0o1 + ( ( hazardo() * 0o2 ) | 0 );
      for ( let b = 0o0; b < branĉoj; b++ ) {
        const t = 0o3/0o10 + b * 0o2/0o10 + hazardo() * 0o1/0o10;
        const bx = x + kurbo * t, by = bazo - alto * t;
        const balto = alto * ( 0o2/0o10 + hazardo() * 0o2/0o10 );
        const bk = ( b % 0o2 ? 1 : -1 ) * s * ( 0o3/0o100 + hazardo() * 0o3/0o100 );
        const bd = dikeco * 0o6/0o10;
        desegniKonturanFormon(kunteksto, trunketaVojo(bx, by, balto, bk, bd),
          bazoj[( i + 1 ) % bazoj.length], s * 0o1/0o200, s * 0o1/0o400);
        desegniTason(bx + bk, by - balto, bd * ( 0o1 + hazardo() * 0o4/0o10 ));
      }
      desegniTason(x + kurbo, bazo - alto, dikeco * ( 0o1 + hazardo() * 0o4/0o10 ));
    }
  }, [ 0o1, 0o1 ], { volvado: THREE.ClampToEdgeWrapping });
});
