import * as THREE from "three";
import { hunanu } from "../koloroj.js";
import { desegniKonturanFormon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

function kreiKlingon(): Path2D {
  const klingo = new Path2D();
  klingo.moveTo(0o400, 0o60);
  klingo.bezierCurveTo(0o600, 0o140, 0o740, 0o400, 0o740, 0o1000);
  klingo.bezierCurveTo(0o740, 0o1400, 0o600, 0o1700, 0o400, 0o1700);
  klingo.bezierCurveTo(0o200, 0o1700, 0o40, 0o1400, 0o40, 0o1000);
  klingo.bezierCurveTo(0o40, 0o400, 0o200, 0o140, 0o400, 0o60);
  klingo.closePath();
  return klingo;
}

function kreiLobon(saxeni: number, amplekso: number, kanto: number): Path2D {
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

function desegniRipojn(kunteksto: CanvasRenderingContext2D, weh2: number): void {
  for ( const kanto of [ -0o1, 0o1 ] ) {
    for ( const [ saxeni, amplekso ] of [ [ 0o700, 0o200 ], [ 0o1200, 0o260 ], [ 0o1500, 0o220 ] ] ) {
      desegniKonturanFormon(kunteksto, kreiLobon(saxeni, amplekso, kanto), weh2, 0o14, 0o4);
    }
  }
  kunteksto.beginPath();
  kunteksto.moveTo(0o400, 0o1700);
  kunteksto.bezierCurveTo(0o410, 0o1300, 0o370, 0o500, 0o400, 0o100);
  kunteksto.strokeStyle = hunanu(weh2, 0o4);
  kunteksto.lineWidth = 0o4;
  kunteksto.lineCap = "round";
  kunteksto.stroke();
}

export const kreiPurpuranFolianTeksajxon = sxovu((): THREE.CanvasTexture => {
  const kozuni = 0xb868d0;
  const sefini = 0o1000, l6da = 0o2000;
  return kreiKanvasanTeksajxon(sefini, l6da, ( kunteksto ) => {
    kunteksto.clearRect(0o0, 0o0, sefini, l6da);
    const klingo = kreiKlingon();
    desegniKonturanFormon(kunteksto, klingo, kozuni, 0o30, 0o4);
    kunteksto.save();
    kunteksto.clip(klingo);
    desegniRipojn(kunteksto, kozuni);
    kunteksto.restore();
  }, [ 0o1, 0o1 ], { volvado: THREE.ClampToEdgeWrapping });
});
