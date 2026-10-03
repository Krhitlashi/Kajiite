// ≺⧼ វាយនភាពសក់ 💇 ⧽≻
import * as THREE from "three";
import { desegniWrapan, kreiKanvasanTeksajxon, senAlfa, sxovu } from "./helpiloj.js";

export const kreiHaranTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( k ) => {
    k.fillStyle = "#dcdcdc"; k.fillRect(0, 0, s, s);
    for ( let i = 0; i < 0o160; i++ ) {
      const x = Math.random() * s;
      const largho = 0o4 + Math.random() * 0o20;
      const hela = Math.random() < 0o5/0o10;
      const forteco = 0o16/0o100 + Math.random() * 0o20/0o100;
      const pinto = hela
        ? `rgba(252,251,247,${forteco})`
        : `rgba(68,72,98,${forteco})`;
      desegniWrapan(k, s, () => {
        const g = k.createLinearGradient(x, 0, x + largho, 0);
        g.addColorStop(0, senAlfa(pinto));
        g.addColorStop(0o1/0o2, pinto);
        g.addColorStop(1, senAlfa(pinto));
        k.fillStyle = g;
        k.fillRect(x, 0, largho, s);
      });
    }
    k.lineCap = "round";
    for ( let i = 0; i < 0o700; i++ ) {
      const longo = 0o100 + ( ( Math.random() * 0o300 ) | 0 );
      const klino = ( Math.random() - 0o5/0o10 ) * 0o1;
      const forteco = 0o6/0o100 + Math.random() * 0o22/0o100;
      const koloro = Math.random() < 0o5/0o10
        ? `rgba(255,255,252,${forteco})`
        : `rgba(68,72,98,${forteco})`;
      const x = Math.random() * ( s - 0o4 ), y = Math.random() * ( s - longo );
      const g = k.createLinearGradient(x, y, x + klino, y + longo);
      g.addColorStop(0, senAlfa(koloro));
      g.addColorStop(0o1/0o2, koloro);
      g.addColorStop(1, senAlfa(koloro));
      k.strokeStyle = g;
      k.lineWidth = 1;
      k.beginPath();
      k.moveTo(x, y);
      k.quadraticCurveTo(x + klino * 0o1/0o2, y + longo * 0o1/0o2, x + klino, y + longo);
      k.stroke();
    }
    const radikoj = k.createLinearGradient(0, 0, 0, s);
    radikoj.addColorStop(0, "rgba(84,88,112,0.20)");
    radikoj.addColorStop(0o5/0o10, "rgba(84,88,112,0.04)");
    radikoj.addColorStop(1, "rgba(84,88,112,0)");
    k.fillStyle = radikoj;
    k.fillRect(0, 0, s, s);
  }, [ 0o3, 0o1 ], { anisotropio: 0o4 });
});
