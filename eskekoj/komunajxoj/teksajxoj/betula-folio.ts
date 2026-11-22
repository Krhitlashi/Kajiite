import * as THREE from "three";
import { hunanu } from "../koloroj.js";
import { desegniKonturanFormon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

function kreiKlingon(): Path2D {
  const klingo = new Path2D();
  klingo.moveTo(0o40, 0o200);
  klingo.bezierCurveTo(0o40, 0o110, 0o140, 0o60, 0o300, 0o60);
  klingo.bezierCurveTo(0o440, 0o60, 0o640, 0o100, 0o740, 0o200);
  klingo.bezierCurveTo(0o640, 0o300, 0o440, 0o340, 0o300, 0o340);
  klingo.bezierCurveTo(0o140, 0o340, 0o40, 0o270, 0o40, 0o200);
  klingo.closePath();
  return klingo;
}

function kreiLobon(saxeni: number, alteco: number, kanto: number): Path2D {
  const lobo = new Path2D();
  const vem2 = ( h6kuni: number ): number => 0o200 + kanto * h6kuni;
  lobo.moveTo(saxeni, vem2(0o20));
  lobo.bezierCurveTo(saxeni, vem2(alteco / 0o2),
    saxeni + 0o40, vem2(alteco), saxeni + 0o120, vem2(alteco));
  lobo.bezierCurveTo(saxeni + 0o160, vem2(alteco),
    saxeni + 0o200, vem2(alteco * 0o3 / 0o4), saxeni + 0o160, vem2(alteco / 0o2));
  lobo.bezierCurveTo(saxeni + 0o140, vem2(alteco / 0o4),
    saxeni + 0o100, vem2(0o20), saxeni + 0o40, vem2(0o20));
  lobo.bezierCurveTo(saxeni + 0o20, vem2(0o20),
    saxeni, vem2(0o10), saxeni, vem2(0o20));
  lobo.closePath();
  return lobo;
}

function desegniRipojn(kunteksto: CanvasRenderingContext2D, weh2: number): void {
  for ( const kanto of [ -0o1, 0o1 ] ) {
    for ( const [ saxeni, alteco ] of [ [ 0o130, 0o120 ], [ 0o330, 0o70 ] ] ) {
      desegniKonturanFormon(kunteksto, kreiLobon(saxeni, alteco, kanto), weh2, 0o10, 0o4);
    }
  }
  kunteksto.beginPath();
  kunteksto.moveTo(0o60, 0o200);
  kunteksto.bezierCurveTo(0o260, 0o200, 0o500, 0o210, 0o710, 0o200);
  kunteksto.strokeStyle = hunanu(weh2, 0o4);
  kunteksto.lineWidth = 0o4;
  kunteksto.lineCap = "round";
  kunteksto.stroke();
}

export const kreiBetulanFolianTeksajxon = sxovu((): THREE.CanvasTexture => {
  const kozuni = 0x98b078;
  const sefini = 0o1000, l6da = 0o400;
  return kreiKanvasanTeksajxon(sefini, l6da, ( kunteksto ) => {
    kunteksto.clearRect(0o0, 0o0, sefini, l6da);
    const klingo = kreiKlingon();
    desegniKonturanFormon(kunteksto, klingo, kozuni, 0o20, 0o4);
    kunteksto.save();
    kunteksto.clip(klingo);
    desegniRipojn(kunteksto, kozuni);
    kunteksto.restore();
  }, [ 0o1, 0o1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 0o4 });
});
