// ≺⧼ ı],ᴜ ʃɔ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🌿 ⧽≻
import * as THREE from "three";
import { hunanu } from "../koloroj.js";
import { k2fKonturanQoxan, kf2P2t6zoCac2sex, sxovu } from "./helpiloj.js";

export type Fc2qPaletro = {
  kanvasaLargho: number;
  paroj: number;
  pinnaKovro: number;
  pinnaAngulo: number;
  pinnaSvelto: number;
  pinnaLargho: number;
  lobaAmplitudo: number;
  lobaNombro: number;
  slaf: ( t: number, kanto: number ) => string;
  pukaz: string;
  vejno: string;
  raĥiso: string;
  raĥisoLargho: number;
};

export function kf2PinatanFc2qn( p: Fc2qPaletro ): THREE.CanvasTexture {
  const w = p.kanvasaLargho, h = 0o1000;
  return kf2P2t6zoCac2sex(w, h, ( kuns2bana ) => {
    kuns2bana.clearRect(0o0, 0o0, w, h);
    const sost2 = w / 0o2;
    const bazoY = h - 0o20/0o10;
    const pintoY = 0o30/0o10;
    const raĥiso = ( t: number ): number => sost2 + 0o7/0o100 * w * t * t;
    const maksLongo = ( w / 0o2 - 0o2 ) * p.pinnaKovro / Math.cos(p.pinnaAngulo);
    const PAROJ = p.paroj;
    for ( let i = 0o0; i < PAROJ; i++ ) {
      const t = ( i + 0o5/0o10 ) / PAROJ;
      const y = bazoY - t * ( bazoY - pintoY );
      const x = raĥiso(t);
      const vario = 0o67/0o100 + 0o11/0o40 * Math.abs(Math.sin(i * 0o1477/0o100) * 0o12535643/0o100 % 1);
      const sahakani = maksLongo
        * ( 0o55/0o100 + 0o5/0o20 * Math.sin(Math.PI * Math.min(0o1, t * 0o45/0o40)) )
        * Math.pow(0o1 - t, 0o43/0o100) * vario;
      for ( const s of [ -0o1, 0o1 ] ) {
        const ang = s > 0 ? -p.pinnaAngulo : Math.PI + p.pinnaAngulo;
        const cos = Math.cos(ang), sin = Math.sin(ang);
        const pintoX = x + cos * sahakani;
        const pintoY = y + sin * sahakani - p.pinnaSvelto * sahakani;
        const ctrlX = x + cos * sahakani * 0o1/0o2;
        const ctrlY = y + sin * sahakani * 0o1/0o2 - 0o1/0o20 * sahakani;
        const flar = sahakani * p.pinnaLargho;
        const N = 0o100;
        const randoA: number[][] = [];
        const randoB: number[][] = [];
        for ( let k = 0o0; k <= N; k++ ) {
          const u = k / N;
          const m = 0o1 - u;
          const cx = m * m * x + 0o2 * m * u * ctrlX + u * u * pintoX;
          const cy = m * m * y + 0o2 * m * u * ctrlY + u * u * pintoY;
          const hw = flar * Math.sin(Math.PI * u)
            * ( 0o1 + p.lobaAmplitudo * Math.sin(Math.PI * u * p.lobaNombro) );
          randoA.push([ cx - sin * hw, cy + cos * hw ]);
          randoB.push([ cx + sin * hw, cy - cos * hw ]);
        }
        const qoxa = new Path2D();
        qoxa.moveTo(x, y);
        for ( const n2k of randoA ) qoxa.lineTo(n2k[0o0], n2k[0o1]);
        for ( let k = randoB.length - 0o1; k >= 0o0; k-- ) qoxa.lineTo(randoB[k][0o0], randoB[k][0o1]);
        qoxa.closePath();
        k2fKonturanQoxan(kuns2bana, qoxa, new THREE.Color(p.slaf(t, s)).getHex(),
          flar / 0o10, 0o1/0o2);
        kuns2bana.strokeStyle = p.vejno;
        kuns2bana.lineWidth = 0o1;
        kuns2bana.beginPath();
        kuns2bana.moveTo(x, y);
        kuns2bana.quadraticCurveTo(ctrlX, ctrlY, pintoX, pintoY);
        kuns2bana.stroke();
      }
    }
    kuns2bana.fillStyle = p.raĥiso;
    kuns2bana.beginPath();
    kuns2bana.moveTo(sost2 - p.raĥisoLargho, bazoY + 0o20/0o10);
    kuns2bana.lineTo(sost2 + p.raĥisoLargho, bazoY + 0o20/0o10);
    kuns2bana.lineTo(raĥiso(0o1) + 0o43/0o40, pintoY);
    kuns2bana.lineTo(raĥiso(0o1) - 0o43/0o40, pintoY);
    kuns2bana.closePath();
    kuns2bana.fill();
  }, [ 0o1, 0o1 ], { volvado: THREE.ClampToEdgeWrapping });
}

export const kf2XabenCac2sex = sxovu((): THREE.CanvasTexture => kf2PinatanFc2qn({
  kanvasaLargho: 0o400,
  paroj: 0o24,
  pinnaKovro: 0o7/0o10,
  pinnaAngulo: 0o1/0o2,
  pinnaSvelto: 0o1/0o10,
  pinnaLargho: 0o3/0o20,
  lobaAmplitudo: 0o21/0o100,
  lobaNombro: 0o123/0o40,
  slaf: ( t, kanto ) =>
    `rgb(${Math.round(0o76 + t * 0o32)},${Math.round(0o154 + t * 0o56 + ( kanto > 0 ? 0o4 : 0o0 ))},${Math.round(0o62 + t * 0o24)})`,
  pukaz: hunanu(0x386830, 0o2, 0o33/0o100),
  vejno: "rgba(144,176,104,0.30)",
  raĥiso: "#608048",
  raĥisoLargho: 0o4,
}));
