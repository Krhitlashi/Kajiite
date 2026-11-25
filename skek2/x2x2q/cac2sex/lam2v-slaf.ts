import * as THREE from "three";
import { hunanu } from "../haweh2.js";
import { k2fKonturanQoxan, kf2P2t6zoCac2sex, p2somani } from "./mafezi.js";

function kf2Kxa(): Path2D {
  const kxa = new Path2D();
  kxa.moveTo(0o40, 0o200);
  kxa.bezierCurveTo(0o40, 0o110, 0o140, 0o60, 0o300, 0o60);
  kxa.bezierCurveTo(0o440, 0o60, 0o640, 0o100, 0o740, 0o200);
  kxa.bezierCurveTo(0o640, 0o300, 0o440, 0o340, 0o300, 0o340);
  kxa.bezierCurveTo(0o140, 0o340, 0o40, 0o270, 0o40, 0o200);
  kxa.closePath();
  return kxa;
}

function kf2Lobon(saxeni: number, l6da: number, vek2fe: number): Path2D {
  const l6ksabosai = new Path2D();
  const vem2 = ( h6kuni: number ): number => 0o200 + vek2fe * h6kuni;
  l6ksabosai.moveTo(saxeni, vem2(0o20));
  l6ksabosai.bezierCurveTo(saxeni, vem2(l6da / 0o2),
    saxeni + 0o40, vem2(l6da), saxeni + 0o120, vem2(l6da));
  l6ksabosai.bezierCurveTo(saxeni + 0o160, vem2(l6da),
    saxeni + 0o200, vem2(l6da * 0o3 / 0o4), saxeni + 0o160, vem2(l6da / 0o2));
  l6ksabosai.bezierCurveTo(saxeni + 0o140, vem2(l6da / 0o4),
    saxeni + 0o100, vem2(0o20), saxeni + 0o40, vem2(0o20));
  l6ksabosai.bezierCurveTo(saxeni + 0o20, vem2(0o20),
    saxeni, vem2(0o10), saxeni, vem2(0o20));
  l6ksabosai.closePath();
  return l6ksabosai;
}

function k2fRipojn(kuns2bana: CanvasRenderingContext2D, weh2: number): void {
  for ( const vek2fe of [ -0o1, 0o1 ] ) {
    for ( const [ saxeni, l6da ] of [ [ 0o130, 0o120 ], [ 0o330, 0o70 ] ] ) {
      k2fKonturanQoxan(kuns2bana, kf2Lobon(saxeni, l6da, vek2fe), weh2, 0o10, 0o4);
    }
  }
  kuns2bana.beginPath();
  kuns2bana.moveTo(0o60, 0o200);
  kuns2bana.bezierCurveTo(0o260, 0o200, 0o500, 0o210, 0o710, 0o200);
  kuns2bana.strokeStyle = hunanu(weh2, 0o4);
  kuns2bana.lineWidth = 0o4;
  kuns2bana.lineCap = "round";
  kuns2bana.stroke();
}

export const kf2Lam2vnSlafCac2sex = p2somani((): THREE.CanvasTexture => {
  const kozuni = 0x98b078;
  const sefini = 0o1000, l6da = 0o400;
  return kf2P2t6zoCac2sex(sefini, l6da, ( kuns2bana ) => {
    kuns2bana.clearRect(0o0, 0o0, sefini, l6da);
    const kxa = kf2Kxa();
    k2fKonturanQoxan(kuns2bana, kxa, kozuni, 0o20, 0o4);
    kuns2bana.save();
    kuns2bana.clip(kxa);
    k2fRipojn(kuns2bana, kozuni);
    kuns2bana.restore();
  }, [ 0o1, 0o1 ], { g2b2: THREE.ClampToEdgeWrapping, anisotropio: 0o4 });
});
