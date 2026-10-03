// ≺⧼ វាយនភាពស្លឹកប៊ឺច 🍃 ⧽≻
import * as THREE from "three";
import { kreiHazardanGenerilon } from "../hazardo.js";
import { ombro } from "../koloroj.js";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiBetulanFolianTeksajxon = sxovu((): THREE.CanvasTexture => {
  const BAZO = 0x98b078;
  const w = 0o1000, h = 0o400;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, w, h);
    const mezo = h / 2;
    const MARGENO = 0.04;
    const longo = w * ( 1 - 2 * MARGENO );
    const hwMax = h * 0.46;
    const segilo = ( t: number, nombro: number ): number =>
      Math.abs((( t * nombro ) % 1 ) - 0o1/0o2) * 2;
    const PLEJ_LARĜA = 0.42;
    const duonLarĝo = ( t: number, flanko: number ): number => {
      const profilo = t < PLEJ_LARĜA
        ? Math.pow(t / PLEJ_LARĜA, 0.52)
        : Math.pow(( 1 - t ) / ( 1 - PLEJ_LARĜA ), 1.05);
      const dentoj = 1 + 0.055 * segilo(t, 24) + 0.026 * segilo(t + 0.021, 56);
      return hwMax * profilo * dentoj * ( 1 + 0o1/0o20 * flanko );
    };
    const xDe = ( t: number ): number => w * MARGENO + t * longo;
    const klingo = new Path2D();
    const PAŜOJ = 720;
    for ( let i = 0; i <= PAŜOJ; i++ ) {
      const t = i / PAŜOJ;
      const y = mezo - duonLarĝo(t, -1);
      if ( i === 0 ) klingo.moveTo(xDe(t), y); else klingo.lineTo(xDe(t), y);
    }
    for ( let i = PAŜOJ; i >= 0; i-- ) {
      const t = i / PAŜOJ;
      klingo.lineTo(xDe(t), mezo + duonLarĝo(t, 1));
    }
    klingo.closePath();
    const gradiento = kunteksto.createLinearGradient(0, 0, w, 0);
    gradiento.addColorStop(0, "#7ba55e");
    gradiento.addColorStop(0.35, "#8fb471");
    gradiento.addColorStop(0o3/0o4, "#a2c182");
    gradiento.addColorStop(1, "#aecb8e");
    kunteksto.fillStyle = gradiento;
    kunteksto.fill(klingo);
    kunteksto.save();
    kunteksto.clip(klingo);
    const transLarĝo = kunteksto.createLinearGradient(0, mezo - hwMax, 0, mezo + hwMax);
    transLarĝo.addColorStop(0, "rgba(255,255,240,0.16)");
    transLarĝo.addColorStop(0o45/0o100, "rgba(255,255,240,0.02)");
    transLarĝo.addColorStop(1, ombro(BAZO, 0o10, 0.18));
    kunteksto.fillStyle = transLarĝo;
    kunteksto.fillRect(0, 0, w, h);
    const makuloHazardo = kreiHazardanGenerilon(0o2716);
    for ( let i = 0; i < 0o440; i++ ) {
      const t = makuloHazardo();
      const y = mezo + ( makuloHazardo() - 0o1/0o2 ) * 2 * hwMax * makuloHazardo();
      const r = 2.2 + makuloHazardo() * 9;
      kunteksto.fillStyle = i % 0o3 ? "rgba(206,224,178,0.13)" : ombro(BAZO, 0o3, 0.11);
      kunteksto.beginPath(); kunteksto.ellipse(xDe(t), y, r, r * 0.55, makuloHazardo() * Math.PI, 0, Math.PI * 2); kunteksto.fill();
    }
    for ( let i = 0; i < 0o3000; i++ ) {
      const x = w * MARGENO + makuloHazardo() * longo;
      const y = mezo + ( makuloHazardo() - 0o1/0o2 ) * 2 * hwMax;
      kunteksto.fillStyle = i % 0o2 ? "rgba(136,164,108,0.16)" : "rgba(214,232,190,0.14)";
      kunteksto.fillRect(x, y, 1.6, 1.6);
    }
    kunteksto.lineCap = "round";
    for ( let i = 0; i < 0o13; i++ ) {
      const t = 0.075 + i * 0.078;
      const flanko = i % 2 ? 1 : -1;
      const fino = xDe(t + 0.26);
      const pinto = mezo + flanko * hwMax * 0.88;
      kunteksto.strokeStyle = ombro(BAZO, 0o5, 0.26);
      kunteksto.lineWidth = 2.8;
      kunteksto.beginPath();
      kunteksto.moveTo(xDe(t), mezo + flanko * 2.6);
      kunteksto.quadraticCurveTo(xDe(t + 0.06), mezo + flanko * hwMax * 0.45, fino, pinto);
      kunteksto.stroke();
      kunteksto.strokeStyle = "rgba(226,240,204,0.42)";
      kunteksto.lineWidth = 0o3/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(xDe(t), mezo);
      kunteksto.quadraticCurveTo(xDe(t + 0.06), mezo + flanko * hwMax * 0.44, fino,
        pinto - flanko * 2.6);
      kunteksto.stroke();
    }
    kunteksto.fillStyle = "rgba(228,242,204,0.34)";
    kunteksto.beginPath();
    kunteksto.moveTo(xDe(0), mezo - 4.2);
    kunteksto.lineTo(xDe(0.97), mezo - 0.7);
    kunteksto.lineTo(xDe(0.97), mezo + 0.7);
    kunteksto.lineTo(xDe(0), mezo + 4.2);
    kunteksto.closePath(); kunteksto.fill();
    kunteksto.restore();
    kunteksto.strokeStyle = ombro(BAZO, 0o6, 0.12);
    kunteksto.lineWidth = 8;
    kunteksto.stroke(klingo);
    kunteksto.strokeStyle = ombro(BAZO, 0o6, 0.16);
    kunteksto.lineWidth = 2;
    kunteksto.stroke(klingo);
    kunteksto.strokeStyle = "#9aa878";
    kunteksto.lineWidth = 3.2;
    kunteksto.lineCap = "butt";
    kunteksto.beginPath();
    kunteksto.moveTo(0, mezo); kunteksto.lineTo(xDe(0.022), mezo);
    kunteksto.stroke();
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});
