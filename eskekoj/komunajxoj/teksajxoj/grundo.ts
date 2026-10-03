// ≺⧼ វាយនភាពដី 🟫 ⧽≻
import * as THREE from "three";
import { kreiHazardanGenerilon } from "../hazardo.js";
import { desegniWrapan, kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const GRUNDA_S = 0o1000;

export function kreiGrundanKanvason(koloro: boolean): HTMLCanvasElement {
  const s = GRUNDA_S;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const k = kanvasa.getContext("2d")!;
  const semo = kreiHazardanGenerilon(0o2710);
  const hazardo = ( a: number, b: number ): number => a + semo() * ( b - a );
  k.fillStyle = koloro ? "#FFFFFF" : "#d8d8d8";
  k.fillRect(0, 0, s, s);
  k.lineCap = "round";
  for ( let i = 0; i < 0o140; i++ ) {
    const x = hazardo(0, s), y = hazardo(0, s);
    const r = s * ( 0o6/0o100 + hazardo(0, 1) * 0o16/0o100 );
    const levo = hazardo(0, 1) < 0o5/0o10;
    const fazo = hazardo(0, 1);
    desegniWrapan(k, s, () => {
      const g = k.createRadialGradient(x, y, 0, x, y, r);
      if ( koloro ) {
        g.addColorStop(0, levo ? "rgba(232,246,216,0.10)" : "rgba(88,102,72,0.10)");
      } else {
        g.addColorStop(0, levo ? "rgba(255,255,255,0.62)" : "rgba(24,32,20,0.46)");
      }
      g.addColorStop(0o1, "rgba(255,255,255,0)");
      k.fillStyle = g;
      k.beginPath();
      k.ellipse(x, y, r, r * ( 0o5/0o10 + fazo * 0o4/0o10 ), fazo * Math.PI, 0, Math.PI * 2);
      k.fill();
    });
  }
  for ( let i = 0; i < 0o1000; i++ ) {
    const x = hazardo(0, s), y = hazardo(0, s);
    const longo = s * ( 0o2/0o100 + hazardo(0, 1) * 0o6/0o100 );
    const angulo = -Math.PI / 0o2 + ( hazardo(0, 1) - 0o4/0o10 ) * 0o14/0o10;
    const kurbo = ( hazardo(0, 1) - 0o4/0o10 ) * longo * 0o6/0o10;
    const seka = hazardo(0, 1) < 0o2/0o10;
    const dikeco = 0o1/0o2 + hazardo(0, 1) * 0o1;
    const alfa = 0o12/0o100 + hazardo(0, 1) * 0o14/0o100;
    if ( koloro ) {
      k.strokeStyle = seka ? "rgba(150,158,98," + alfa + ")" : "rgba(72,104,56," + alfa + ")";
    } else {
      k.strokeStyle = seka ? "rgba(228,232,220,0.42)" : "rgba(255,255,255,0.46)";
    }
    k.lineWidth = dikeco;
    desegniWrapan(k, s, () => {
      k.beginPath();
      k.moveTo(x, y);
      k.quadraticCurveTo(x + Math.cos(angulo) * longo * 0o1/0o2 - Math.sin(angulo) * kurbo,
        y + Math.sin(angulo) * longo * 0o1/0o2 + Math.cos(angulo) * kurbo,
        x + Math.cos(angulo) * longo, y + Math.sin(angulo) * longo);
      k.stroke();
    });
  }
  for ( let i = 0; i < 0o100; i++ ) {
    const x = hazardo(0, s), y = hazardo(0, s);
    const r = 1 + hazardo(0, 1) * 0o6/0o10;
    const angulo = hazardo(0, 1) * Math.PI;
    desegniWrapan(k, s, () => {
      k.save();
      k.translate(x, y);
      k.rotate(angulo);
      k.fillStyle = "rgba(20,24,18,0.30)";
      k.beginPath();
      k.ellipse(0, r * 0o5/0o10, r * 0o12/0o10, r * 0o7/0o10, 0, 0, Math.PI * 2);
      k.fill();
      k.fillStyle = koloro ? "rgba(196,204,190,0.66)" : "rgba(255,255,255,0.66)";
      k.beginPath();
      k.ellipse(0, 0, r, r * 0o7/0o10, 0, 0, Math.PI * 2);
      k.fill();
      k.restore();
    });
  }
  const bildo = k.getImageData(0, 0, s, s);
  const d = bildo.data;
  const grajnaForto = koloro ? 0o7 : 0o24;
  for ( let i = 0; i < d.length; i += 4 ) {
    const g = ( Math.random() - 0o4/0o10 ) * grajnaForto;
    d[i] += g; d[i + 1] += g; d[i + 2] += g;
  }
  k.putImageData(bildo, 0, 0);
  return kanvasa;
}

export const GRUNDA_RIPETO: [ number, number ] = [ 0o520, 0o520 ];

export const kreiGrundanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = GRUNDA_S;
  return kreiKanvasanTeksajxon(s, s, ( k ) => {
    k.drawImage(kreiGrundanKanvason(true), 0, 0);
  }, GRUNDA_RIPETO, { anisotropio: 0o10 } );
});
