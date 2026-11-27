// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ꞁȷ̀ᴜ j͑ʃʞᴜ ɔ˞ͷ̗ʞ 📃 ⧽≻
import * as THREE from "three";
import { hunanu } from "../haweh2.js";
import { k2fKonturanQoxan, kf2P2t6zoCac2sex, p2somani } from "./pukek.js";

function kf2Kxa(): Path2D {
  const kxa = new Path2D();
  kxa.moveTo(0o400, 0o60);
  kxa.bezierCurveTo(0o600, 0o140, 0o740, 0o400, 0o740, 0o1000);
  kxa.bezierCurveTo(0o740, 0o1400, 0o600, 0o1700, 0o400, 0o1700);
  kxa.bezierCurveTo(0o200, 0o1700, 0o40, 0o1400, 0o40, 0o1000);
  kxa.bezierCurveTo(0o40, 0o400, 0o200, 0o140, 0o400, 0o60);
  kxa.closePath();
  return kxa;
}

function kf2Lobon(saxeni: number, pal6: number, vek2fe: number): Path2D {
  const l6ksabosai = new Path2D();
  const vem2 = ( h6kuni: number ): number => 0o400 + vek2fe * h6kuni;
  l6ksabosai.moveTo(vem2(0o30), saxeni);
  l6ksabosai.bezierCurveTo(vem2(pal6 / 0o2), saxeni,
    vem2(pal6), saxeni - 0o100, vem2(pal6), saxeni - 0o200);
  l6ksabosai.bezierCurveTo(vem2(pal6), saxeni - 0o260,
    vem2(pal6 * 0o3 / 0o4), saxeni - 0o300, vem2(pal6 / 0o2), saxeni - 0o260);
  l6ksabosai.bezierCurveTo(vem2(pal6 / 0o4), saxeni - 0o240,
    vem2(0o30), saxeni - 0o140, vem2(0o30), saxeni - 0o60);
  l6ksabosai.bezierCurveTo(vem2(0o30), saxeni - 0o30,
    vem2(0o20), saxeni, vem2(0o30), saxeni);
  l6ksabosai.closePath();
  return l6ksabosai;
}

function k2fRipojn(kuns2bana: CanvasRenderingContext2D, weh2: number): void {
  for ( const vek2fe of [ -0o1, 0o1 ] ) {
    for ( const [ saxeni, pal6 ] of [ [ 0o700, 0o200 ], [ 0o1200, 0o260 ], [ 0o1500, 0o220 ] ] ) {
      k2fKonturanQoxan(kuns2bana, kf2Lobon(saxeni, pal6, vek2fe), weh2, 0o14, 0o4);
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

export const kf2AsfanSlafCac2sex = p2somani((): THREE.CanvasTexture => {
  const kozuni = 0xb868d0;
  const sefini = 0o1000, l6da = 0o2000;
  return kf2P2t6zoCac2sex(sefini, l6da, ( kuns2bana ) => {
    kuns2bana.clearRect(0o0, 0o0, sefini, l6da);
    const kxa = kf2Kxa();
    k2fKonturanQoxan(kuns2bana, kxa, kozuni, 0o30, 0o4);
    kuns2bana.save();
    kuns2bana.clip(kxa);
    k2fRipojn(kuns2bana, kozuni);
    kuns2bana.restore();
  }, [ 0o1, 0o1 ], { g2b2: THREE.ClampToEdgeWrapping });
});
