// ≺⧼ វាយនភាពដី 🗺️ ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiTerenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    kunteksto.lineCap = "round";
    for ( let i = 0; i < 0o70; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0o4 + Math.random() * 0o10;
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, i % 0o3 ? "rgba(84,116,66,0.10)" : "rgba(138,150,87,0.08)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      kunteksto.fillStyle = g;
      kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
    }
    for ( let i = 0; i < 0o300; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const longo = 0o2 + Math.random() * 0o10;
      const a = -Math.PI / 2 + ( Math.random() - 0o5/0o10 ) * 0o7/0o10;
      kunteksto.strokeStyle = i % 0o4 ? "rgba(72,112,60,0.16)" : "rgba(166,170,93,0.14)";
      kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + ( Math.random() - 0o5/0o10 ) * 0o2, y - longo * 0o1/0o2,
        x + Math.cos(a) * longo, y + Math.sin(a) * longo);
      kunteksto.stroke();
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});
