// ≺⧼ Larika foliara teksajxo 🍃 ⧽≻
import * as THREE from "three";
import { kreiKanvasanTeksajxon, ombro, sxovu } from "./helpiloj.js";

export const kreiLarikanFoliaranTeksajxon = sxovu((): THREE.CanvasTexture => {
  const BAZO = 0xa8a850;
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    const gradiento = kunteksto.createLinearGradient(0, 0, 0, s);
    gradiento.addColorStop(0, "#d0c868");
    gradiento.addColorStop(0o5/0o10, "#a8a050");
    gradiento.addColorStop(1, "#687048");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, s, s);
    const pinglajKoloroj = [ "rgba(239,216,105,0.62)", "rgba(204,190,84,0.60)", "rgba(168,168,84,0.58)", "rgba(88,102,52,0.56)", "rgba(224,168,64,0.60)" ];
    const desegniVentumilon = ( x: number, y: number, bazoAngulo: number, longo: number, koloroj: string[] ): void => {
      kunteksto.save();
      kunteksto.translate(x, y);
      kunteksto.rotate(bazoAngulo);
      const pingloj = 0o6 + ( ( Math.random() * 0o3 ) | 0 );
      for ( let j = 0; j < pingloj; j++ ) {
        const t = j / ( pingloj - 1 ) - 0o5/0o10;
        const a = t * 0o6/0o10;
        const pl = longo * ( 0o6/0o10 + Math.random() * 0o4/0o10 );
        kunteksto.strokeStyle = koloroj[( j + ( ( Math.random() * koloroj.length ) | 0 ) ) % koloroj.length];
        kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1/0o2;
        kunteksto.lineCap = "round";
        kunteksto.beginPath();
        kunteksto.moveTo(0, 0);
        kunteksto.quadraticCurveTo(Math.cos(a) * pl * 0o46/0o100, -Math.sin(a) * pl * 0o46/0o100 - pl * 0o2/0o10,
          Math.cos(a) * pl, -Math.sin(a) * pl);
        kunteksto.stroke();
      }
      kunteksto.restore();
    };
    for ( let i = 0; i < 0o54; i++ ) {
      desegniVentumilon(Math.random() * s, Math.random() * s,
        Math.random() * Math.PI * 2, 0o4 + Math.random() * 0o6, pinglajKoloroj);
    }
    kunteksto.lineCap = "round";
    for ( let i = 0; i < 0o40; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const angulo = Math.random() * Math.PI * 2;
      const longo = 0o3 + Math.random() * 0o4;
      kunteksto.strokeStyle = ombro(BAZO, 0o7, 0o5/0o20);
      kunteksto.lineWidth = 0o1/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + Math.cos(angulo) * longo * 0o1/0o2, y + Math.sin(angulo) * longo * 0o1/0o2,
        x + Math.cos(angulo) * longo * 0o3/0o4, y + Math.sin(angulo) * longo * 0o3/0o4);
      kunteksto.stroke();
    }
    for ( let i = 0; i < 0o70; i++ ) {
      kunteksto.fillStyle = i % 0o3 ? "rgba(240,226,126,0.42)" : ombro(BAZO, 0o7, 0.38);
      kunteksto.fillRect(Math.random() * s, Math.random() * s, 1 + Math.random() * 0o2, 1 + Math.random() * 0o2);
    }
    kunteksto.lineCap = "round";
    for ( let i = 0; i < 0o220; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const a = -Math.PI / 2 + ( Math.random() - 0o5/0o10 ) * 0o6/0o10;
      const longo = 0o2 + Math.random() * 0o4;
      kunteksto.strokeStyle = i % 0o4 ? "rgba(190,188,89,0.34)" : ombro(BAZO, 0o5, 0.32);
      kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + ( Math.random() - 0o5/0o10 ) * 0o2, y - longo * 0o1/0o2,
        x + Math.cos(a) * longo, y + Math.sin(a) * longo);
      kunteksto.stroke();
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});
