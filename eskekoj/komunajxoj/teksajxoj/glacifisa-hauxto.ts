// ≺⧼ Glacifisa haŭta teksajxo 🐟 ⧽≻
import { kreiKanvasanTeksajxon } from "./helpiloj.js";
import * as THREE from "three";

interface GlacifisajMarkoj {
  longo: number; kapoZ: number; okulaFlanko: number; okulaZ: number;
}

export function kreiGlacifisanHaŭtanTeksajxon( markoj: GlacifisajMarkoj ): THREE.CanvasTexture {
  const { longo, kapoZ, okulaFlanko, okulaZ } = markoj;
  const w = 0o400, h = 0o1000;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    const gradiento = kunteksto.createLinearGradient(0, 0, w, 0);
    gradiento.addColorStop(0, "#93a9b4");
    gradiento.addColorStop(0o14/0o100, "#6d8996");
    gradiento.addColorStop(0o25/0o100, "#3d5666");
    gradiento.addColorStop(0o36/0o100, "#6d8996");
    gradiento.addColorStop(0o5/0o10, "#93a9b4");
    gradiento.addColorStop(0o7/0o10, "#e4eff1");
    gradiento.addColorStop(0o4/0o5, "#c4d8de");
    gradiento.addColorStop(1, "#93a9b4");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
    const dorsoPeco = ( x: number ): number =>
      ( 0o1 + Math.cos(( x / w - 0o25/0o100 ) * Math.PI * 2)) * 0o1/0o2;
    const makulon = ( x: number, y: number, r: number, rondo: number,
      alfa: number, koloro: string ): void => {
      for ( const dx of [ -w, 0, w ] ) {
        const g = kunteksto.createRadialGradient(x + dx, y, 0, x + dx, y, r);
        g.addColorStop(0, "rgba(" + koloro + "," + alfa + ")");
        g.addColorStop(1, "rgba(" + koloro + ",0)");
        kunteksto.fillStyle = g;
        kunteksto.beginPath();
        kunteksto.ellipse(x + dx, y, r, r * rondo, 0, 0, Math.PI * 2);
        kunteksto.fill();
      }
    };
    for ( let i = 0; i < 0o360; i++ ) {
      const x = w * ( 0o25/0o100 + ( Math.random() - 0o1/0o2 ) * 0o7/0o10 );
      const y = Math.random() * h;
      const r = w * ( 0o25/0o1000 + Math.random() * 0o75/0o1000 );
      makulon(x, y, r, 0o6/0o10,
        ( 0o1/0o12 + Math.random() * 0o1/0o7 ) * dorsoPeco(x), "64,90,106");
    }
    for ( let i = 0; i < 0o1000; i++ ) {
      const x = Math.random() * w, y = Math.random() * h;
      const r = w * ( 0o5/0o1000 + Math.random() * 0o15/0o1000 );
      makulon(x, y, r, 1,
        ( 0o10/0o100 + Math.random() * 0o16/0o100 ) * dorsoPeco(x), "72,96,110");
    }
    kunteksto.strokeStyle = "rgba(96,124,138,0.09)";
    kunteksto.lineWidth = 1;
    for ( let y = h * 0o12/0o100; y < h * 0o6/0o7; y += h * 0o22/0o1000 ) {
      kunteksto.beginPath();
      kunteksto.moveTo(0, y);
      kunteksto.lineTo(w, y + h * 0o1/0o30);
      kunteksto.stroke();
    }
    for ( let i = 0; i < 0o36; i++ ) {
      const x = w * ( 0o25/0o100 + ( Math.random() - 0o1/0o2 ) * 0o4/0o10 );
      const y = h * ( 0o1/0o12 + Math.random() * 0o7/0o10 );
      const r = w * ( 0o2/0o100 + Math.random() * 0o5/0o100 );
      makulon(x, y, r, 0o7/0o10,
        ( 0o16/0o100 + Math.random() * 0o1/0o6 ) * dorsoPeco(x), "44,64,80");
    }
    const yDe = ( v: number ): number => ( 1 - v ) * h;
    kunteksto.fillStyle = "rgba(56,74,90,0.30)";
    kunteksto.fillRect(0, yDe(0o5/0o100), w, h * 0o35/0o1000);
    const brankV = -kapoZ / longo;
    const brankY = yDe(brankV);
    const brankaBando = kunteksto.createLinearGradient(
      0, brankY + h * 0o12/0o100, 0, brankY - h * 0o12/0o100);
    brankaBando.addColorStop(0, "rgba(48,64,80,0)");
    brankaBando.addColorStop(0o5/0o10, "rgba(40,56,72,0.42)");
    brankaBando.addColorStop(1, "rgba(48,64,80,0)");
    kunteksto.fillStyle = brankaBando;
    kunteksto.fillRect(0, brankY - h * 0o12/0o100, w, h * 0o24/0o100);
    kunteksto.fillStyle = "rgba(32,48,64,0.40)";
    kunteksto.fillRect(0, yDe(brankV + 0o3/0o100) - 1, w, 2);
    const okulaU = Math.acos(okulaFlanko) / ( Math.PI * 2 );
    const okulaV = -okulaZ / longo;
    for ( const okulaX of [ okulaU, 0o5/0o10 - okulaU ] ) {
      makulon(okulaX * w, yDe(okulaV), w * 0o6/0o100, 0o4/0o5, 0o7/0o20, "38,56,70");
    }
    kunteksto.fillStyle = "rgba(96,128,144,0.40)";
    for ( const flanka of [ 0, w / 2 ] ) {
      for ( let v = 0o32/0o100; v < 0o12/0o13; v += 0o1/0o100 ) {
        kunteksto.fillRect(flanka - 1, yDe(v), 2, 3);
      }
    }
  }, [ 1, 1 ], { anisotropio: 0o4 });
}
