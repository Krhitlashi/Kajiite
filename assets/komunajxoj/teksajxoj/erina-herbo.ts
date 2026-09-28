// ≺⧼ Erina herba teksajxo 🌾 ⧽≻
import * as THREE from "three";
import { kreiHazardanGenerilon } from "../hazardo.js";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiHerbErinanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    const hazardo = kreiHazardanGenerilon(0o2715);
    const desegniKlingon = ( x0: number, y0: number, alto: number, klino: number,
      largho: number, koloroj: [ string, string ] ): void => {
      const paŝoj = 0o10;
      const maldekstra: [ number, number ][] = [];
      const dekstra: [ number, number ][] = [];
      for ( let i = 0; i <= paŝoj; i++ ) {
        const t = i / paŝoj;
        const x = x0 + klino * t * t;
        const y = y0 - alto * t;
        const duonLarĝo = largho * 0o5/0o10 * Math.pow(1 - t, 0o7/0o10);
        maldekstra.push([ x - duonLarĝo, y ]);
        dekstra.push([ x + duonLarĝo, y ]);
      }
      const gradiento = kunteksto.createLinearGradient(x0, y0, x0 + klino, y0 - alto);
      gradiento.addColorStop(0, koloroj[0]);
      gradiento.addColorStop(0o6/0o10, koloroj[0]);
      gradiento.addColorStop(1, koloroj[1]);
      kunteksto.fillStyle = gradiento;
      kunteksto.beginPath();
      kunteksto.moveTo(maldekstra[0][0], maldekstra[0][1]);
      for ( let i = 1; i < maldekstra.length; i++ ) {
        kunteksto.lineTo(maldekstra[i][0], maldekstra[i][1]);
      }
      for ( let i = dekstra.length - 1; i >= 0; i-- ) {
        kunteksto.lineTo(dekstra[i][0], dekstra[i][1]);
      }
      kunteksto.closePath();
      kunteksto.fill();
    };
    const paletro: [ string, string ][] = [
      [ "#2e5622", "#7cb648" ],
      [ "#336026", "#8cc451" ],
      [ "#29501e", "#6fae42" ],
      [ "#3a6a2b", "#9ad05c" ],
      [ "#436428", "#bcc24a" ],
      [ "#4e5f2a", "#d2c052" ],
    ];
    const bazoY = s * 0.97;
    for ( let i = 0; i < 0o34; i++ ) {
      desegniKlingon(s * ( 0.06 + hazardo() * 0.88 ), bazoY,
        s * ( 0.44 + hazardo() * 0o3/0o10 ),
        s * ( hazardo() - 0o1/0o2 ) * 0.62,
        s * ( 0.013 + hazardo() * 0.013 ),
        paletro[( hazardo() * 0o4 ) | 0]);
    }
    for ( let i = 0; i < 0o10; i++ ) {
      desegniKlingon(s * ( 0o1/0o10 + hazardo() * 0o15/0o20 ), bazoY,
        s * ( 0o5/0o20 + hazardo() * 0.38 ),
        s * ( hazardo() - 0o1/0o2 ) * 0o1/0o2,
        s * ( 0o1/0o100 + hazardo() * 0o1/0o100 ),
        paletro[0o4 + ( ( hazardo() * 0o2 ) | 0)]);
    }
    for ( let i = 0; i < 0o26; i++ ) {
      const koloro = paletro[0o3 + ( ( hazardo() * 0o3 ) | 0 )];
      desegniKlingon(s * ( 0.08 + hazardo() * 0.84 ), bazoY,
        s * ( 0o3/0o20 + hazardo() * 0o5/0o20 ),
        s * ( hazardo() - 0o1/0o2 ) * 0.36,
        s * ( 0.017 + hazardo() * 0.016 ), koloro);
    }
    const ombroR = s * 0o5/0o20;
    const ombroY = bazoY - s * 0.03;
    const ombro = kunteksto.createRadialGradient(s / 2, ombroY, 0, s / 2, ombroY, ombroR);
    ombro.addColorStop(0, "rgba(30,44,22,0.62)");
    ombro.addColorStop(0.55, "rgba(34,50,26,0.28)");
    ombro.addColorStop(1, "rgba(34,50,26,0)");
    kunteksto.fillStyle = ombro;
    kunteksto.beginPath();
    kunteksto.ellipse(s / 2, ombroY, ombroR, ombroR * 0.62, 0, 0, Math.PI * 2);
    kunteksto.fill();
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});
