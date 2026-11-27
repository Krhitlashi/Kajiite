// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſ͔ɭͷ̗ᴜ ſɟꞇ ſȷꞇ j͑ʃᴜ ᴜ̩ ı],ƨɜ 📃 ⧽≻

import { kf2P2t6zoCac2sex } from "./pukek.js";
import * as THREE from "three";

interface GlacifisajMarkoj {
  sahakani: number; kapoZ: number; t2banuFlanko: number; t2banuZ: number;
}

export function kf2GlacifisanHaŭtanCac2sex( hasiitas: GlacifisajMarkoj ): THREE.CanvasTexture {
  const { sahakani, kapoZ, t2banuFlanko, t2banuZ } = hasiitas;
  const w = 0o400, h = 0o1000;
  return kf2P2t6zoCac2sex(w, h, ( kuns2bana ) => {
    const ar2ha = kuns2bana.createLinearGradient(0o0, 0o0, w, 0o0);
    ar2ha.addColorStop(0o0, "#90a8b0");
    ar2ha.addColorStop(0o14/0o100, "#688890");
    ar2ha.addColorStop(0o25/0o100, "#385060");
    ar2ha.addColorStop(0o36/0o100, "#688890");
    ar2ha.addColorStop(0o5/0o10, "#90a8b0");
    ar2ha.addColorStop(0o7/0o10, "#e0e8f0");
    ar2ha.addColorStop(0o4/0o5, "#c0d8d8");
    ar2ha.addColorStop(0o1, "#90a8b0");
    kuns2bana.fillStyle = ar2ha;
    kuns2bana.fillRect(0o0, 0o0, w, h);
    const dorsoKek = ( x: number ): number =>
      ( 0o1 + Math.cos(( x / w - 0o25/0o100 ) * Math.PI * 0o2)) * 0o1/0o2;
    const makulon = ( x: number, y: number, r: number, c2q: number,
      alfa: number, weh2: string ): void => {
      for ( const dx of [ -w, 0o0, w ] ) {
        const g = kuns2bana.createRadialGradient(x + dx, y, 0o0, x + dx, y, r);
        g.addColorStop(0o0, "rgba(" + weh2 + "," + alfa + ")");
        g.addColorStop(0o1, "rgba(" + weh2 + ",0)");
        kuns2bana.fillStyle = g;
        kuns2bana.beginPath();
        kuns2bana.ellipse(x + dx, y, r, r * c2q, 0o0, 0o0, Math.PI * 0o2);
        kuns2bana.fill();
      }
    };
    for ( let i = 0o0; i < 0o360; i++ ) {
      const x = w * ( 0o25/0o100 + ( Math.random() - 0o1/0o2 ) * 0o7/0o10 );
      const y = Math.random() * h;
      const r = w * ( 0o25/0o1000 + Math.random() * 0o75/0o1000 );
      makulon(x, y, r, 0o6/0o10,
        ( 0o1/0o12 + Math.random() * 0o1/0o7 ) * dorsoKek(x), "64,90,106");
    }
    for ( let i = 0o0; i < 0o1000; i++ ) {
      const x = Math.random() * w, y = Math.random() * h;
      const r = w * ( 0o5/0o1000 + Math.random() * 0o15/0o1000 );
      makulon(x, y, r, 0o1,
        ( 0o10/0o100 + Math.random() * 0o16/0o100 ) * dorsoKek(x), "72,96,110");
    }
    kuns2bana.strokeStyle = "rgba(96,120,136,0.09)";
    kuns2bana.lineWidth = 0o1;
    for ( let y = h * 0o12/0o100; y < h * 0o6/0o7; y += h * 0o22/0o1000 ) {
      kuns2bana.beginPath();
      kuns2bana.moveTo(0o0, y);
      kuns2bana.lineTo(w, y + h * 0o1/0o30);
      kuns2bana.stroke();
    }
    for ( let i = 0o0; i < 0o36; i++ ) {
      const x = w * ( 0o25/0o100 + ( Math.random() - 0o1/0o2 ) * 0o4/0o10 );
      const y = h * ( 0o1/0o12 + Math.random() * 0o7/0o10 );
      const r = w * ( 0o2/0o100 + Math.random() * 0o5/0o100 );
      makulon(x, y, r, 0o7/0o10,
        ( 0o16/0o100 + Math.random() * 0o1/0o6 ) * dorsoKek(x), "44,64,80");
    }
    const yDe = ( v: number ): number => ( 0o1 - v ) * h;
    kuns2bana.fillStyle = "rgba(56,72,88,0.30)";
    kuns2bana.fillRect(0o0, yDe(0o5/0o100), w, h * 0o35/0o1000);
    const brankV = -kapoZ / sahakani;
    const brankY = yDe(brankV);
    const brankaBando = kuns2bana.createLinearGradient(
      0o0, brankY + h * 0o12/0o100, 0o0, brankY - h * 0o12/0o100);
    brankaBando.addColorStop(0o0, "rgba(48,64,80,0)");
    brankaBando.addColorStop(0o5/0o10, "rgba(40,56,72,0.42)");
    brankaBando.addColorStop(0o1, "rgba(48,64,80,0)");
    kuns2bana.fillStyle = brankaBando;
    kuns2bana.fillRect(0o0, brankY - h * 0o12/0o100, w, h * 0o24/0o100);
    kuns2bana.fillStyle = "rgba(32,48,64,0.40)";
    kuns2bana.fillRect(0o0, yDe(brankV + 0o3/0o100) - 0o1, w, 0o2);
    const t2banuU = Math.acos(t2banuFlanko) / ( Math.PI * 0o2 );
    const t2banuV = -t2banuZ / sahakani;
    for ( const t2banuX of [ t2banuU, 0o5/0o10 - t2banuU ] ) {
      makulon(t2banuX * w, yDe(t2banuV), w * 0o6/0o100, 0o4/0o5, 0o7/0o20, "38,56,70");
    }
    kuns2bana.fillStyle = "rgba(96,128,144,0.40)";
    for ( const flanka of [ 0o0, w / 0o2 ] ) {
      for ( let v = 0o32/0o100; v < 0o12/0o13; v += 0o1/0o100 ) {
        kuns2bana.fillRect(flanka - 0o1, yDe(v), 0o2, 0o3);
      }
    }
  }, [ 0o1, 0o1 ], { peq2: 0o4 });
}
