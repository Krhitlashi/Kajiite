import * as THREE from "three";
import { ombro } from "../koloroj.js";
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

function kreiLobon(komenco: number, amplekso: number, flanko: number): Path2D {
  const lobo = new Path2D();
  const nivelo = ( distanco: number ): number => 0o400 + flanko * distanco;
  lobo.moveTo(nivelo(0o30), komenco);
  lobo.bezierCurveTo(nivelo(amplekso / 0o2), komenco,
    nivelo(amplekso), komenco - 0o100, nivelo(amplekso), komenco - 0o200);
  lobo.bezierCurveTo(nivelo(amplekso), komenco - 0o260,
    nivelo(amplekso * 0o3 / 0o4), komenco - 0o300, nivelo(amplekso / 0o2), komenco - 0o260);
  lobo.bezierCurveTo(nivelo(amplekso / 0o4), komenco - 0o240,
    nivelo(0o30), komenco - 0o140, nivelo(0o30), komenco - 0o60);
  lobo.bezierCurveTo(nivelo(0o30), komenco - 0o30,
    nivelo(0o20), komenco, nivelo(0o30), komenco);
  lobo.closePath();
  return lobo;
}

function desegniRipojn(kunteksto: CanvasRenderingContext2D, koloro: number): void {
  for ( const flanko of [ -0o1, 0o1 ] ) {
    for ( const [ komenco, amplekso ] of [ [ 0o700, 0o200 ], [ 0o1200, 0o260 ], [ 0o1500, 0o220 ] ] ) {
      desegniKonturanFormon(kunteksto, kreiLobon(komenco, amplekso, flanko), koloro, 0o14, 0o4);
    }
  }
  kunteksto.beginPath();
  kunteksto.moveTo(0o400, 0o1700);
  kunteksto.bezierCurveTo(0o410, 0o1300, 0o370, 0o500, 0o400, 0o100);
  kunteksto.strokeStyle = ombro(koloro, 0o4);
  kunteksto.lineWidth = 0o4;
  kunteksto.lineCap = "round";
  kunteksto.stroke();
}

export const kreiPurpuranFolianTeksajxon = sxovu((): THREE.CanvasTexture => {
  const bazo = 0xb868d0;
  const largho = 0o1000, alto = 0o2000;
  return kreiKanvasanTeksajxon(largho, alto, ( kunteksto ) => {
    kunteksto.clearRect(0o0, 0o0, largho, alto);
    const klingo = kreiKlingon();
    desegniKonturanFormon(kunteksto, klingo, bazo, 0o30, 0o4);
    kunteksto.save();
    kunteksto.clip(klingo);
    desegniRipojn(kunteksto, bazo);
    kunteksto.restore();
  }, [ 0o1, 0o1 ], { volvado: THREE.ClampToEdgeWrapping });
});
