// ≺⧼ Filika teksajxo 🌿 ⧽≻
import * as THREE from "three";
import { ombro } from "../koloroj.js";
import { kreiKanvasanTeksajxon, sxovu } from "./helpiloj.js";

export type FrondaPaletro = {
  kanvasaLargho: number;
  paroj: number;
  pinnaKovro: number;
  pinnaAngulo: number;
  pinnaSvelto: number;
  pinnaLargho: number;
  lobaAmplitudo: number;
  lobaNombro: number;
  folio: ( t: number, flanko: number ) => string;
  rando: string;
  vejno: string;
  raĥiso: string;
  raĥisoLargho: number;
};

export function kreiPinatanFrondon( p: FrondaPaletro ): THREE.CanvasTexture {
  const w = p.kanvasaLargho, h = 0o1000;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, w, h);
    const mezo = w / 2;
    const bazoY = h - 0o20/0o10;
    const pintoY = 0o30/0o10;
    const raĥiso = ( t: number ): number => mezo + 0.11 * w * t * t;
    const maksLongo = ( w / 2 - 2 ) * p.pinnaKovro / Math.cos(p.pinnaAngulo);
    const PAROJ = p.paroj;
    for ( let i = 0; i < PAROJ; i++ ) {
      const t = ( i + 0o5/0o10 ) / PAROJ;
      const y = bazoY - t * ( bazoY - pintoY );
      const x = raĥiso(t);
      const vario = 0.86 + 0.28 * Math.abs(Math.sin(i * 12.9898) * 43758.5453 % 1);
      const longo = maksLongo
        * ( 0.70 + 0o5/0o20 * Math.sin(Math.PI * Math.min(1, t * 1.15)) )
        * Math.pow(1 - t, 0.55) * vario;
      for ( const s of [ -1, 1 ] ) {
        const ang = s > 0 ? -p.pinnaAngulo : Math.PI + p.pinnaAngulo;
        const cos = Math.cos(ang), sin = Math.sin(ang);
        const pintoX = x + cos * longo;
        const pintoY = y + sin * longo - p.pinnaSvelto * longo;
        const ctrlX = x + cos * longo * 0o1/0o2;
        const ctrlY = y + sin * longo * 0o1/0o2 - 0o1/0o20 * longo;
        const flar = longo * p.pinnaLargho;
        const N = 0o10;
        const randoA: number[][] = [];
        const randoB: number[][] = [];
        for ( let k = 0; k <= N; k++ ) {
          const u = k / N;
          const m = 1 - u;
          const cx = m * m * x + 2 * m * u * ctrlX + u * u * pintoX;
          const cy = m * m * y + 2 * m * u * ctrlY + u * u * pintoY;
          const hw = flar * Math.sin(Math.PI * u)
            * ( 1 + p.lobaAmplitudo * Math.sin(Math.PI * u * p.lobaNombro) );
          randoA.push([ cx - sin * hw, cy + cos * hw ]);
          randoB.push([ cx + sin * hw, cy - cos * hw ]);
        }
        kunteksto.fillStyle = p.folio(t, s);
        kunteksto.beginPath();
        kunteksto.moveTo(x, y);
        for ( const p of randoA ) kunteksto.lineTo(p[0], p[1]);
        for ( let k = randoB.length - 1; k >= 0; k-- ) kunteksto.lineTo(randoB[k][0], randoB[k][1]);
        kunteksto.closePath();
        kunteksto.fill();
        kunteksto.strokeStyle = p.rando;
        kunteksto.lineWidth = 1.3;
        kunteksto.stroke();
        kunteksto.strokeStyle = p.vejno;
        kunteksto.lineWidth = 1;
        kunteksto.beginPath();
        kunteksto.moveTo(x, y);
        kunteksto.quadraticCurveTo(ctrlX, ctrlY, pintoX, pintoY);
        kunteksto.stroke();
      }
    }
    kunteksto.fillStyle = p.raĥiso;
    kunteksto.beginPath();
    kunteksto.moveTo(mezo - p.raĥisoLargho, bazoY + 0o20/0o10);
    kunteksto.lineTo(mezo + p.raĥisoLargho, bazoY + 0o20/0o10);
    kunteksto.lineTo(raĥiso(1) + 1.1, pintoY);
    kunteksto.lineTo(raĥiso(1) - 1.1, pintoY);
    kunteksto.closePath();
    kunteksto.fill();
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}

export const kreiFilikanTeksajxon = sxovu((): THREE.CanvasTexture => kreiPinatanFrondon({
  kanvasaLargho: 0o400,
  paroj: 0o24,
  pinnaKovro: 0.88,
  pinnaAngulo: 0o1/0o2,
  pinnaSvelto: 0.12,
  pinnaLargho: 0.19,
  lobaAmplitudo: 0.26,
  lobaNombro: 2.6,
  folio: ( t, flanko ) =>
    `rgb(${Math.round(62 + t * 26)},${Math.round(108 + t * 46 + ( flanko > 0 ? 5 : 0 ))},${Math.round(50 + t * 20)})`,
  rando: ombro(0x386830, 0o2, 0.42),
  vejno: "rgba(150,180,110,0.30)",
  raĥiso: "#65854e",
  raĥisoLargho: 4,
}));
