// ≺⧼ Betula foliara reliefa teksajxo 🍃 ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export const kreiBetulanFoliaranBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, s, s);
    for ( let i = 0; i < 0o20; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = s * ( 0o2/0o25 + Math.random() * 0o14/0o100 );
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, i % 2 ? "rgba(150,150,150,0.22)" : "rgba(64,64,64,0.22)");
      g.addColorStop(1, "rgba(128,128,128,0)");
      kunteksto.fillStyle = g;
      kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
    }
    const desegniFolion = ( x: number, y: number, longo: number, largho: number, angulo: number ): void => {
      kunteksto.save();
      kunteksto.translate(x, y);
      kunteksto.rotate(angulo);
      kunteksto.fillStyle = "rgba(158,158,158,0.34)";
      kunteksto.beginPath();
      kunteksto.moveTo(-longo, 0);
      kunteksto.quadraticCurveTo(0, -largho, longo, 0);
      kunteksto.quadraticCurveTo(0, largho, -longo, 0);
      kunteksto.fill();
      kunteksto.strokeStyle = "rgba(96,96,96,0.30)";
      kunteksto.lineWidth = 0o1/0o2;
      kunteksto.beginPath(); kunteksto.moveTo(-longo * 0o3/0o4, 0); kunteksto.lineTo(longo * 0o3/0o4, 0); kunteksto.stroke();
      kunteksto.restore();
    };
    for ( let i = 0; i < 0o120; i++ ) {
      desegniFolion(Math.random() * s, Math.random() * s,
        0o2 + Math.random() * 0o3, 0o1 + Math.random() * 0o1, Math.random() * Math.PI);
    }
    for ( let i = 0; i < 0o30; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const bazoAngulo = Math.random() * Math.PI;
      const fasko = 0o3 + ( ( Math.random() * 0o3 ) | 0 );
      for ( let j = 0; j < fasko; j++ ) {
        desegniFolion(x, y, 0o2 + Math.random() * 0o3, 0o1 + Math.random() * 0o1,
          bazoAngulo + ( j - fasko / 2 ) * 0o5/0o10);
      }
    }
    for ( let i = 0; i < 0o40; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0o2 + Math.random() * 0o4;
      kunteksto.fillStyle = "rgba(58,58,58,0.28)";
      kunteksto.beginPath(); kunteksto.ellipse(x, y, r, r * 0o63/0o100, Math.random() * Math.PI, 0, Math.PI * 2); kunteksto.fill();
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, sRGB: false, anisotropio: 4 });
});
