// ≺⧼ វាយនភាពស្លឹកប៊ឺច 🍃 ⧽≻
import * as THREE from "three";
import { ombro } from "../koloroj.js";
import { kreiKanvasanTeksajxon, senAlfa, sxovu } from "./helpiloj.js";

export const kreiBetulanFoliaranTeksajxon = sxovu((): THREE.CanvasTexture => {
  const BAZO = 0xc8d8c0;
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    const gradiento = kunteksto.createLinearGradient(0, 0, 0, s);
    gradiento.addColorStop(0, "#e8f0e0");
    gradiento.addColorStop(0o4/0o10, "#c8d8c0");
    gradiento.addColorStop(1, "#a8c0a8");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, s, s);
    for ( let i = 0; i < 0o60; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = s * ( 0o2/0o100 + Math.random() * 0o5/0o100 );
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      const koloro = i % 0o3 ? "rgba(224,240,224,0.22)" : ombro(BAZO, 0o10, 0o5/0o40);
      g.addColorStop(0, koloro);
      g.addColorStop(1, senAlfa(koloro));
      kunteksto.fillStyle = g;
      kunteksto.beginPath(); kunteksto.ellipse(x, y, r, r * 0o7/0o10, Math.random() * Math.PI, 0, Math.PI * 2); kunteksto.fill();
    }
    const foliajKoloroj = [ "rgba(144,176,152,0.55)", "rgba(184,208,184,0.50)", "rgba(128,160,128,0.58)", "rgba(208,224,208,0.46)", "rgba(232,240,232,0.38)" ];
    const desegniFolion = ( x: number, y: number, longo: number, largho: number, angulo: number, koloro: string ): void => {
      kunteksto.save();
      kunteksto.translate(x, y);
      kunteksto.rotate(angulo);
      kunteksto.fillStyle = koloro;
      kunteksto.beginPath();
      kunteksto.moveTo(-longo, 0);
      kunteksto.quadraticCurveTo(0, -largho, longo, 0);
      kunteksto.quadraticCurveTo(0, largho, -longo, 0);
      kunteksto.fill();
      kunteksto.strokeStyle = "rgba(240,248,232,0.55)";
      kunteksto.lineWidth = 0o1/0o2;
      kunteksto.beginPath(); kunteksto.moveTo(-longo * 0o3/0o4, 0); kunteksto.lineTo(longo * 0o3/0o4, 0); kunteksto.stroke();
      kunteksto.strokeStyle = "rgba(240,248,232,0.30)";
      kunteksto.lineWidth = 0o1/0o4;
      kunteksto.beginPath();
      kunteksto.moveTo(-longo * 0o2/0o10, 0); kunteksto.lineTo(0, -largho * 0o63/0o100);
      kunteksto.moveTo(longo * 0o2/0o10, 0); kunteksto.lineTo(0, largho * 0o63/0o100);
      kunteksto.stroke();
      kunteksto.restore();
    };
    for ( let i = 0; i < 0o160; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const longo = 0o2 + Math.random() * 0o3;
      const largho = 0o1 + Math.random() * 0o1;
      desegniFolion(x, y, longo, largho, Math.random() * Math.PI, foliajKoloroj[i % foliajKoloroj.length]);
    }
    for ( let i = 0; i < 0o30; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const bazoAngulo = Math.random() * Math.PI;
      const fasko = 0o3 + ( ( Math.random() * 0o3 ) | 0 );
      for ( let j = 0; j < fasko; j++ ) {
        const longo = 0o2 + Math.random() * 0o3;
        const largho = 0o1 + Math.random() * 0o1;
        desegniFolion(x + ( Math.random() - 0o5/0o10 ) * 0o1, y + ( Math.random() - 0o5/0o10 ) * 0o1,
          longo, largho, bazoAngulo + ( j - fasko / 2 ) * 0o5/0o10 + ( Math.random() - 0o5/0o10 ) * 0o2/0o10,
          foliajKoloroj[( i + j ) % foliajKoloroj.length]);
      }
    }
    kunteksto.lineCap = "round";
    for ( let i = 0; i < 0o140; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const angulo = Math.random() * Math.PI * 2;
      const longo = 0o1 + Math.random() * 0o3;
      kunteksto.strokeStyle = i % 0o3 ? ombro(BAZO, 0o5, 0o7/0o40) : "rgba(216,232,216,0.26)";
      kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + Math.cos(angulo) * longo * 0o1/0o2,
        y + Math.sin(angulo) * longo * 0o1/0o2 - 1,
        x + Math.cos(angulo) * longo, y + Math.sin(angulo) * longo);
      kunteksto.stroke();
    }
    for ( let i = 0; i < 0o30; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0o2 + Math.random() * 0o4;
      kunteksto.fillStyle = ombro(BAZO, 0o12, 0o1/0o10);
      kunteksto.beginPath(); kunteksto.ellipse(x, y, r, r * 0o63/0o100, Math.random() * Math.PI, 0, Math.PI * 2); kunteksto.fill();
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});
