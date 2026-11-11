import * as THREE from "three";
import { ombro } from "../koloroj.js";
import { desegniKonturanFormon, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

function kreiKlingon(): Path2D {
  const klingo = new Path2D();
  klingo.moveTo(0o40, 0o200);
  klingo.bezierCurveTo(0o40, 0o110, 0o140, 0o50, 0o300, 0o50);
  klingo.bezierCurveTo(0o440, 0o50, 0o640, 0o120, 0o740, 0o200);
  klingo.bezierCurveTo(0o640, 0o260, 0o440, 0o330, 0o300, 0o330);
  klingo.bezierCurveTo(0o140, 0o330, 0o40, 0o270, 0o40, 0o200);
  klingo.closePath();
  return klingo;
}

function kreiLobon(komenco: number, alteco: number, flanko: number): Path2D {
  const lobo = new Path2D();
  const nivelo = ( distanco: number ): number => 0o200 + flanko * distanco;
  lobo.moveTo(komenco, nivelo(0o20));
  lobo.bezierCurveTo(komenco, nivelo(alteco / 0o2),
    komenco + 0o40, nivelo(alteco), komenco + 0o120, nivelo(alteco));
  lobo.bezierCurveTo(komenco + 0o160, nivelo(alteco),
    komenco + 0o200, nivelo(alteco * 0o3 / 0o4), komenco + 0o160, nivelo(alteco / 0o2));
  lobo.bezierCurveTo(komenco + 0o140, nivelo(alteco / 0o4),
    komenco + 0o100, nivelo(0o20), komenco + 0o40, nivelo(0o20));
  lobo.bezierCurveTo(komenco + 0o20, nivelo(0o20),
    komenco, nivelo(0o10), komenco, nivelo(0o20));
  lobo.closePath();
  return lobo;
}

function desegniRipojn(kunteksto: CanvasRenderingContext2D, koloro: number): void {
  for ( const flanko of [ -0o1, 0o1 ] ) {
    for ( const [ komenco, alteco ] of [ [ 0o130, 0o120 ], [ 0o330, 0o70 ] ] ) {
      desegniKonturanFormon(kunteksto, kreiLobon(komenco, alteco, flanko), koloro, 0o10, 0o4);
    }
  }
  kunteksto.beginPath();
  kunteksto.moveTo(0o60, 0o200);
  kunteksto.bezierCurveTo(0o260, 0o200, 0o500, 0o210, 0o710, 0o200);
  kunteksto.strokeStyle = ombro(koloro, 0o4);
  kunteksto.lineWidth = 0o4;
  kunteksto.lineCap = "round";
  kunteksto.stroke();
}

export const kreiBetulanFolianTeksajxon = sxovu((): THREE.CanvasTexture => {
  const bazo = 0x98b078;
  const largho = 0o1000, alto = 0o400;
  return kreiKanvasanTeksajxon(largho, alto, ( kunteksto ) => {
    kunteksto.clearRect(0o0, 0o0, largho, alto);
    const klingo = kreiKlingon();
    desegniKonturanFormon(kunteksto, klingo, bazo, 0o20, 0o4);
    kunteksto.save();
    kunteksto.clip(klingo);
    desegniRipojn(kunteksto, bazo);
    kunteksto.restore();
  }, [ 0o1, 0o1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 0o4 });
});
