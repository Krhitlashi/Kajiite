import * as THREE from "three";
import { hunanu } from "../koloroj.js";
import { k2fKonturanQoxan, kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";

function kf2Klingon(): Path2D {
  const klingo = new Path2D();
  klingo.moveTo(0o400, 0o60);
  klingo.bezierCurveTo(0o600, 0o140, 0o740, 0o400, 0o740, 0o1000);
  klingo.bezierCurveTo(0o740, 0o1400, 0o600, 0o1700, 0o400, 0o1700);
  klingo.bezierCurveTo(0o200, 0o1700, 0o40, 0o1400, 0o40, 0o1000);
  klingo.bezierCurveTo(0o40, 0o400, 0o200, 0o140, 0o400, 0o60);
  klingo.closePath();
  return klingo;
}

function kf2Lobon(saxeni: number, amplekso: number, kanto: number): Path2D {
  const lobo = new Path2D();
  const vem2 = ( h6kuni: number ): number => 0o400 + kanto * h6kuni;
  lobo.moveTo(vem2(0o30), saxeni);
  lobo.bezierCurveTo(vem2(amplekso / 0o2), saxeni,
    vem2(amplekso), saxeni - 0o100, vem2(amplekso), saxeni - 0o200);
  lobo.bezierCurveTo(vem2(amplekso), saxeni - 0o260,
    vem2(amplekso * 0o3 / 0o4), saxeni - 0o300, vem2(amplekso / 0o2), saxeni - 0o260);
  lobo.bezierCurveTo(vem2(amplekso / 0o4), saxeni - 0o240,
    vem2(0o30), saxeni - 0o140, vem2(0o30), saxeni - 0o60);
  lobo.bezierCurveTo(vem2(0o30), saxeni - 0o30,
    vem2(0o20), saxeni, vem2(0o30), saxeni);
  lobo.closePath();
  return lobo;
}

function k2fRipojn(kuns2bana: CanvasRenderingContext2D, weh2: number): void {
  for ( const kanto of [ -0o1, 0o1 ] ) {
    for ( const [ saxeni, amplekso ] of [ [ 0o700, 0o200 ], [ 0o1200, 0o260 ], [ 0o1500, 0o220 ] ] ) {
      k2fKonturanQoxan(kuns2bana, kf2Lobon(saxeni, amplekso, kanto), weh2, 0o14, 0o4);
    }
  }
  kuns2bana.beginPath();
  kuns2bana.moveTo(0o400, 0o1700);
  kuns2bana.bezierCurveTo(0o410, 0o1300, 0o370, 0o500, 0o400, 0o100);
  kuns2bana.strokeStyle = hunanu(weh2, 0o4);
  kuns2bana.lineWidth = 0o4;
  kuns2bana.lineCap = "round";
  kuns2bana.stroke();
}

export const kf2AsfanSlafCac2sex = sxovu((): THREE.CanvasTexture => {
  const kozuni = 0xb868d0;
  const sefini = 0o1000, l6da = 0o2000;
  return kf2P2t6zoCac2sex(sefini, l6da, ( kuns2bana ) => {
    kuns2bana.clearRect(0o0, 0o0, sefini, l6da);
    const klingo = kf2Klingon();
    k2fKonturanQoxan(kuns2bana, klingo, kozuni, 0o30, 0o4);
    kuns2bana.save();
    kuns2bana.clip(klingo);
    k2fRipojn(kuns2bana, kozuni);
    kuns2bana.restore();
  }, [ 0o1, 0o1 ], { volvado: THREE.ClampToEdgeWrapping });
});
