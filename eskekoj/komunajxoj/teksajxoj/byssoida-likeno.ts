// ≺⧼ វាយនភាពស្លែប៊ីសូអ៊ីត 🕸️ ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon, neregulaFormo, sxovu } from "./helpiloj.js";

export const kreiByssoidanLikenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    const cx = s / 2, cy = s / 2;
    const bazajKoloroj = [ "rgba(72,82,68,0.70)", "rgba(92,96,78,0.68)", "rgba(110,108,88,0.64)" ];
    const fibrajKoloroj = [ "rgba(220,220,198,0.82)", "rgba(194,198,174,0.78)", "rgba(154,164,136,0.72)", "rgba(238,232,204,0.76)" ];
    const tufoj: { x: number; y: number; r: number }[] = [];
    const tufojNombro = 0o10 + ( ( Math.random() * 0o6 ) | 0 );
    for ( let i = 0; i < tufojNombro; i++ ) {
      const a = Math.random() * Math.PI * 2;
      const d = s * Math.random() * 0o3/0o100;
      const r = s * ( 0o4/0o100 + Math.random() * 0o3/0o100 );
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
      tufoj.push({ x, y, r });
      neregulaFormo(kunteksto, x, y, r, 0o4 + ( ( Math.random() * 0o3 ) | 0 ), 0o2/0o10, Math.random() * Math.PI * 2);
      kunteksto.fillStyle = bazajKoloroj[i % bazajKoloroj.length];
      kunteksto.fill();
    }
    for ( const tufo of tufoj ) {
      const fibroj = 0o14 + ( ( Math.random() * 0o10 ) | 0 );
      for ( let i = 0; i < fibroj; i++ ) {
        const a = Math.random() * Math.PI * 2;
        const komencaR = tufo.r * ( 0o15/0o100 + Math.random() * 0o32/0o100 );
        const longo = tufo.r * ( 0o10/0o10 + Math.random() * 0o10/0o10 );
        const sx = tufo.x + Math.cos(a) * komencaR;
        const sy = tufo.y + Math.sin(a) * komencaR;
        const ex = tufo.x + Math.cos(a) * longo;
        const ey = tufo.y + Math.sin(a) * longo;
        const kurbo = ( Math.random() - 0o5/0o10 ) * tufo.r;
        const perpx = -Math.sin(a) * kurbo, perpy = Math.cos(a) * kurbo;
        kunteksto.strokeStyle = fibrajKoloroj[( i + tufoj.indexOf(tufo) ) % fibrajKoloroj.length];
        kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1;
        kunteksto.lineCap = "round";
        kunteksto.beginPath();
        kunteksto.moveTo(sx, sy);
        kunteksto.quadraticCurveTo(( sx + ex ) / 2 + perpx, ( sy + ey ) / 2 + perpy, ex, ey);
        kunteksto.stroke();
        if ( i % 0o4 === 0 ) {
          const forkA = a + ( Math.random() - 0o5/0o10 ) * 0o3/0o10;
          const forkL = tufo.r * ( 0o4/0o10 + Math.random() * 0o5/0o10 );
          kunteksto.strokeStyle = fibrajKoloroj[( i + 1 ) % fibrajKoloroj.length];
          kunteksto.beginPath();
          kunteksto.moveTo(ex, ey);
          kunteksto.quadraticCurveTo(ex + Math.cos(forkA) * forkL * 0o4/0o10, ey + Math.sin(forkA) * forkL * 0o4/0o10,
            ex + Math.cos(forkA) * forkL, ey + Math.sin(forkA) * forkL);
          kunteksto.stroke();
        }
      }
    }
    for ( let i = 0; i < 0o100; i++ ) {
      const a = Math.random() * Math.PI * 2;
      const r = s * 0o15/0o100 * Math.sqrt(Math.random());
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      kunteksto.fillStyle = i % 0o3 ? "rgba(232,230,204,0.62)" : "rgba(72,76,64,0.58)";
      kunteksto.fillRect(x, y, 0o1 + Math.random() * 0o2, 0o1 + Math.random() * 0o2);
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});
