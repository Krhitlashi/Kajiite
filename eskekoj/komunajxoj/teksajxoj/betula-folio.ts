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
    const MARGENO = 0o3/0o100;
    const longo = w * ( 1 - 2 * MARGENO );
    const hwMax = h * 0o35/0o100;
    const segilo = ( t: number, nombro: number ): number =>
      Math.abs((( t * nombro ) % 1 ) - 0o1/0o2) * 2;
    const PLEJ_LARĜA = 0o33/0o100;
    const duonLarĝo = ( t: number, flanko: number ): number => {
      const profilo = t < PLEJ_LARĜA
        ? Math.pow(t / PLEJ_LARĜA, 0o41/0o100)
        : Math.pow(( 1 - t ) / ( 1 - PLEJ_LARĜA ), 0o103/0o100);
      const dentoj = 1 + 0o1/0o20 * segilo(t, 0o30) + 0o1/0o40 * segilo(t + 0o1/0o100, 0o70);
      return hwMax * profilo * dentoj * ( 1 + 0o1/0o20 * flanko );
    };
    const xDe = ( t: number ): number => w * MARGENO + t * longo;
    const klingo = new Path2D();
    const PAŜOJ = 0o1320;
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
    gradiento.addColorStop(0o13/0o40, "#8fb471");
    gradiento.addColorStop(0o3/0o4, "#a2c182");
    gradiento.addColorStop(1, "#aecb8e");
    kunteksto.fillStyle = gradiento;
    kunteksto.fill(klingo);
    kunteksto.save();
    kunteksto.clip(klingo);
    const transLarĝo = kunteksto.createLinearGradient(0, mezo - hwMax, 0, mezo + hwMax);
    transLarĝo.addColorStop(0, "rgba(255,255,240,0.16)");
    transLarĝo.addColorStop(0o45/0o100, "rgba(255,255,240,0.02)");
    transLarĝo.addColorStop(1, ombro(BAZO, 0o10, 0o3/0o20));
    kunteksto.fillStyle = transLarĝo;
    kunteksto.fillRect(0, 0, w, h);
    const makuloHazardo = kreiHazardanGenerilon(0o2716);
    for ( let i = 0; i < 0o440; i++ ) {
      const t = makuloHazardo();
      const y = mezo + ( makuloHazardo() - 0o1/0o2 ) * 2 * hwMax * makuloHazardo();
      const r = 0o215/0o100 + makuloHazardo() * 0o11;
      kunteksto.fillStyle = i % 0o3 ? "rgba(206,224,178,0.13)" : ombro(BAZO, 0o3, 0o7/0o100);
      kunteksto.beginPath(); kunteksto.ellipse(xDe(t), y, r, r * 0o43/0o100, makuloHazardo() * Math.PI, 0, Math.PI * 2); kunteksto.fill();
    }
    for ( let i = 0; i < 0o3000; i++ ) {
      const x = w * MARGENO + makuloHazardo() * longo;
      const y = mezo + ( makuloHazardo() - 0o1/0o2 ) * 2 * hwMax;
      kunteksto.fillStyle = i % 0o2 ? "rgba(136,164,108,0.16)" : "rgba(214,232,190,0.14)";
      kunteksto.fillRect(x, y, 0o63/0o40, 0o63/0o40);
    }
    kunteksto.lineCap = "round";
    for ( let i = 0; i < 0o13; i++ ) {
      const t = 0o5/0o100 + i * 0o5/0o100;
      const flanko = i % 2 ? 1 : -1;
      const fino = xDe(t + 0o21/0o100);
      const pinto = mezo + flanko * hwMax * 0o7/0o10;
      kunteksto.strokeStyle = ombro(BAZO, 0o5, 0o21/0o100);
      kunteksto.lineWidth = 0o263/0o100;
      kunteksto.beginPath();
      kunteksto.moveTo(xDe(t), mezo + flanko * 0o123/0o40);
      kunteksto.quadraticCurveTo(xDe(t + 0o1/0o20), mezo + flanko * hwMax * 0o35/0o100, fino, pinto);
      kunteksto.stroke();
      kunteksto.strokeStyle = "rgba(226,240,204,0.42)";
      kunteksto.lineWidth = 0o3/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(xDe(t), mezo);
      kunteksto.quadraticCurveTo(xDe(t + 0o1/0o20), mezo + flanko * hwMax * 0o7/0o20, fino,
        pinto - flanko * 0o123/0o40);
      kunteksto.stroke();
    }
    kunteksto.fillStyle = "rgba(228,242,204,0.34)";
    kunteksto.beginPath();
    kunteksto.moveTo(xDe(0), mezo - 0o415/0o100);
    kunteksto.lineTo(xDe(0o37/0o40), mezo - 0o55/0o100);
    kunteksto.lineTo(xDe(0o37/0o40), mezo + 0o55/0o100);
    kunteksto.lineTo(xDe(0), mezo + 0o415/0o100);
    kunteksto.closePath(); kunteksto.fill();
    kunteksto.restore();
    kunteksto.strokeStyle = ombro(BAZO, 0o6, 0o1/0o10);
    kunteksto.lineWidth = 0o10;
    kunteksto.stroke(klingo);
    kunteksto.strokeStyle = ombro(BAZO, 0o6, 0o5/0o40);
    kunteksto.lineWidth = 2;
    kunteksto.stroke(klingo);
    kunteksto.strokeStyle = "#9aa878";
    kunteksto.lineWidth = 0o315/0o100;
    kunteksto.lineCap = "butt";
    kunteksto.beginPath();
    kunteksto.moveTo(0, mezo); kunteksto.lineTo(xDe(0o1/0o100), mezo);
    kunteksto.stroke();
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});
