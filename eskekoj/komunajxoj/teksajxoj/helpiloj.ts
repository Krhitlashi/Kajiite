// ≺⧼ ជំនួយវាយនភាពរួម 🖌️ ⧽≻
import * as THREE from "three";
import { instaliKanakaGradientojn, kanakaCss, ombro, ombraKoloro } from "../koloroj.js";
import { kf2Sakxo } from "../hazardo.js";

export function desegniKonturanFormon(kunteksto: CanvasRenderingContext2D, formo: Path2D,
  koloro: number, largho: number, interspaco: number): void {
  kunteksto.save();
  kunteksto.fillStyle = ombro(koloro, 0o0);
  kunteksto.fill(formo);
  kunteksto.clip(formo);
  kunteksto.lineJoin = "round";
  kunteksto.lineCap = "round";
  for ( let nivelo = 0o1; nivelo <= 0o3; nivelo++ ) {
    kunteksto.strokeStyle = ombro(koloro, nivelo);
    kunteksto.lineWidth = 0o2 * ( interspaco + ( 0o4 - nivelo ) * largho );
    kunteksto.stroke(formo);
  }
  kunteksto.strokeStyle = ombro(koloro, 0o4);
  kunteksto.lineWidth = interspaco * 0o2;
  kunteksto.stroke(formo);
  kunteksto.restore();
}

const konturajKampoj = new Map<string, { distancoj: Float32Array; cxeloj: Uint16Array }>();

export function desegniKonturanTeksajxon(kunteksto: CanvasRenderingContext2D,
  paletro: readonly number[], semo: number, kolumnoj = 0o4, vicoj = 0o4, reliefo = false): void {
  const { width: largho, height: alto } = kunteksto.canvas;
  const klavo = [ largho, alto, semo, kolumnoj, vicoj ].join("/");
  const pasxo = Math.min(largho / kolumnoj, alto / vicoj);
  let kampo = konturajKampoj.get(klavo);
  if ( !kampo ) {
    const hazardo = kf2Sakxo(semo);
    const centroj = Array.from({ length: kolumnoj * vicoj }, ( _, indekso ) => ({
      x: indekso % kolumnoj + 0o1/0o2 + ( hazardo() - 0o1/0o2 ) * 0o3/0o4,
      y: Math.floor(indekso / kolumnoj) + 0o1/0o2 + ( hazardo() - 0o1/0o2 ) * 0o3/0o4,
    }));
    const cxeloj = new Uint16Array(largho * alto);
    const distancoj = new Float32Array(largho * alto);
    const rondo = Math.PI * 0o2;
    for ( let y = 0o0; y < alto; y++ ) {
      for ( let x = 0o0; x < largho; x++ ) {
        const u = x / largho * kolumnoj + Math.sin(y / alto * rondo) * 0o3/0o4
          + Math.sin(( x / largho + y / alto ) * rondo) * 0o1/0o4;
        const v = y / alto * vicoj + Math.sin(x / largho * rondo) * 0o3/0o4
          - Math.cos(( x / largho - y / alto ) * rondo) * 0o1/0o4;
        let plejProksima = Infinity;
        for ( let dy = -0o1; dy <= 0o1; dy++ ) {
          for ( let dx = -0o1; dx <= 0o1; dx++ ) {
            const cx = Math.floor(u) + dx, cy = Math.floor(v) + dy;
            const indekso = ( ( cy % vicoj + vicoj ) % vicoj ) * kolumnoj
              + ( cx % kolumnoj + kolumnoj ) % kolumnoj;
            const centro = centroj[indekso];
            const px = centro.x + Math.floor(cx / kolumnoj) * kolumnoj - u;
            const py = centro.y + Math.floor(cy / vicoj) * vicoj - v;
            const distanco = px * px + py * py;
            if ( distanco < plejProksima ) {
              plejProksima = distanco;
              cxeloj[y * largho + x] = indekso;
            }
          }
        }
      }
    }
    const loko = ( x: number, y: number ): number =>
      ( ( y + alto ) % alto ) * largho + ( x + largho ) % largho;
    for ( let y = 0o0; y < alto; y++ ) {
      for ( let x = 0o0; x < largho; x++ ) {
        const indekso = loko(x, y), cxelo = cxeloj[indekso];
        distancoj[indekso] = cxelo !== cxeloj[loko(x - 0o1, y)]
          || cxelo !== cxeloj[loko(x + 0o1, y)]
          || cxelo !== cxeloj[loko(x, y - 0o1)]
          || cxelo !== cxeloj[loko(x, y + 0o1)] ? 0o0 : pasxo;
      }
    }
    // រុំពីរជុំ ដើម្បីរក្សាចម្ងាយដូចគ្នាត្រង់ថ្នេរក្បឿង។
    for ( let ripeto = 0o0; ripeto < 0o2; ripeto++ ) {
      for ( const direkto of [ 0o1, -0o1 ] ) {
        for ( let j = 0o0; j < alto; j++ ) {
          const y = direkto > 0o0 ? j : alto - 0o1 - j;
          for ( let i = 0o0; i < largho; i++ ) {
            const x = direkto > 0o0 ? i : largho - 0o1 - i;
            const indekso = loko(x, y);
            distancoj[indekso] = Math.min(distancoj[indekso],
              distancoj[loko(x - direkto, y)] + 0o1,
              distancoj[loko(x, y - direkto)] + 0o1,
              distancoj[loko(x - direkto, y - direkto)] + Math.SQRT2,
              distancoj[loko(x + direkto, y - direkto)] + Math.SQRT2);
          }
        }
      }
    }
    const glatigitaj = new Float32Array(distancoj.length);
    for ( let ripeto = 0o0; ripeto < 0o4; ripeto++ ) {
      for ( let y = 0o0; y < alto; y++ ) {
        for ( let x = 0o0; x < largho; x++ ) {
          const indekso = loko(x, y);
          let sumo = 0o0;
          for ( const dy of [ -0o2, 0o0, 0o2 ] ) {
            for ( const dx of [ -0o2, 0o0, 0o2 ] ) {
              const najbaro = loko(x + dx, y + dy);
              const pezo = ( dx === 0o0 ? 0o2 : 0o1 ) * ( dy === 0o0 ? 0o2 : 0o1 );
              sumo += distancoj[najbaro] * pezo * ( cxeloj[najbaro] === cxeloj[indekso] ? 0o1 : -0o1 );
            }
          }
          glatigitaj[indekso] = sumo / 0o20;
        }
      }
      distancoj.set(glatigitaj);
    }
    kampo = { distancoj, cxeloj };
    konturajKampoj.set(klavo, kampo);
  }
  const bildo = kunteksto.createImageData(largho, alto);
  const interspaco = pasxo / 0o40, bando = pasxo / 0o20;
  const fono = reliefo ? 0x707070 : ombraKoloro(paletro[0o0], 0o4);
  for ( let indekso = 0o0; indekso < kampo.distancoj.length; indekso++ ) {
    const distanco = kampo.distancoj[indekso];
    const nivelo = Math.min(0o3, Math.max(0o0, Math.floor(( distanco - interspaco ) / bando)));
    const koloro = reliefo ? 0x808080 + nivelo * 0x101010
      : ombraKoloro(paletro[kampo.cxeloj[indekso] % paletro.length], 0o3 - nivelo);
    const kovro = Math.min(0o1, Math.max(0o0, distanco - interspaco));
    for ( let kanalo = 0o0; kanalo < 0o3; kanalo++ ) {
      const sxovo = ( 0o2 - kanalo ) * 0o10;
      const valoro = ( koloro >> sxovo ) & 0xff;
      const bazo = ( fono >> sxovo ) & 0xff;
      bildo.data[indekso * 0o4 + kanalo] = bazo + ( valoro - bazo ) * kovro;
    }
    bildo.data[indekso * 0o4 + 0o3] = 0xff;
  }
  kunteksto.putImageData(bildo, 0o0, 0o0);
}

export function neregulaVojo(fx: number, fy: number, r0: number,
  ondoj: number, sago: number, fazo: number): Path2D {
  const vojo = new Path2D();
  for ( let i = 0o0; i <= 0o100; i++ ) {
    const a = i / 0o100 * Math.PI * 0o2;
    const r = r0 * ( 1 + sago * Math.sin(a * ondoj + fazo)
      + sago * 0o2/0o10 * Math.sin(a * ondoj * 0o2 + fazo * 0o3 + 1) );
    const x = fx + Math.cos(a) * r, y = fy + Math.sin(a) * r;
    if ( i === 0o0 ) vojo.moveTo(x, y); else vojo.lineTo(x, y);
  }
  vojo.closePath();
  return vojo;
}

// ⟨ ស្រទាប់ដីហូរ ៖ វាលរលោងខ្ពស់ទាបដែលបំបែកជាថ្នាំពណ៌រាបស្មើ
//   ដូចខ្សែកម្ពស់លើផែនទី ។ វាលខ្យល់វិលជុំដើម្បីរក្សាថ្នេរក្បឿង ។ 📃 ⟩
function periodaBruo(semo: number, kradX: number, kradY: number): ( x: number, y: number ) => number {
  const hazardo = kf2Sakxo(semo);
  const valoroj = new Float32Array(kradX * kradY);
  for ( let i = 0o0; i < valoroj.length; i++ ) valoroj[i] = hazardo();
  return ( x, y ) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const sx = xf * xf * ( 0o3 - 0o2 * xf ), sy = yf * yf * ( 0o3 - 0o2 * yf );
    const x0 = ( xi % kradX + kradX ) % kradX, x1 = ( x0 + 0o1 ) % kradX;
    const y0 = ( yi % kradY + kradY ) % kradY, y1 = ( y0 + 0o1 ) % kradY;
    const a = valoroj[y0 * kradX + x0], b = valoroj[y0 * kradX + x1];
    const c = valoroj[y1 * kradX + x0], d = valoroj[y1 * kradX + x1];
    return a + ( b - a ) * sx + ( c - a ) * sy + ( a - b - c + d ) * sx * sy;
  };
}

const fluajKampoj = new Map<string, { niveloj: Uint8Array; distancoj: Float32Array; frakcioj: Float32Array }>();

export function desegniFluanTeksajxon(kunteksto: CanvasRenderingContext2D,
  paletro: readonly number[], semo: number, bandoj = 0o6, reliefo = false): void {
  const { width: largho, height: alto } = kunteksto.canvas;
  const klavo = [ largho, alto, semo, bandoj ].join("/");
  let kampo = fluajKampoj.get(klavo);
  if ( !kampo ) {
    const warpX = periodaBruo(semo + 0o303, 0o4, 0o4);
    const warpY = periodaBruo(semo + 0o404, 0o4, 0o4);
    const bruo1 = periodaBruo(semo, 0o2, 0o6);
    const bruo2 = periodaBruo(semo + 0o101, 0o4, 0o14);
    const bruo3 = periodaBruo(semo + 0o202, 0o10, 0o30);
    const kampoj = new Float32Array(largho * alto);
    for ( let y = 0o0; y < alto; y++ ) {
      for ( let x = 0o0; x < largho; x++ ) {
        const u = x / largho, v = y / alto;
        const wx = u + ( warpX(u * 0o4, v * 0o4) - 0o1/0o2 ) * 0o15/0o100;
        const wy = v + ( warpY(u * 0o4, v * 0o4) - 0o1/0o2 ) * 0o15/0o100;
        kampoj[y * largho + x] = bruo1(wx * 0o2, wy * 0o6) * 0o6/0o10
          + bruo2(wx * 0o4, wy * 0o14) * 0o3/0o10
          + bruo3(wx * 0o10, wy * 0o30) * 0o1/0o10;
      }
    }
    const niveloj = new Uint8Array(largho * alto);
    const frakcioj = new Float32Array(largho * alto);
    const distancoj = new Float32Array(largho * alto);
    for ( let y = 0o0; y < alto; y++ ) {
      for ( let x = 0o0; x < largho; x++ ) {
        const i = y * largho + x;
        const b = kampoj[i] * bandoj;
        const niv = Math.floor(b);
        niveloj[i] = niv;
        // ⟨ ចម្ងាយគិតជាភិកសែល ៖ គែមចន្លោះមានទទឹងស្មើគ្នាគ្រប់កន្លែង 📃 ⟩
        const gx = ( kampoj[y * largho + Math.min(largho - 0o1, x + 0o1)]
          - kampoj[y * largho + Math.max(0o0, x - 0o1)] ) / 0o2;
        const gy = ( kampoj[Math.min(alto - 0o1, y + 0o1) * largho + x]
          - kampoj[Math.max(0o0, y - 0o1) * largho + x] ) / 0o2;
        const grad = Math.hypot(gx, gy) * bandoj;
        const frac = b - niv;
        frakcioj[i] = frac;
        distancoj[i] = Math.min(frac, 0o1 - frac) / Math.max(grad, 0o1/0o10000);
      }
    }
    kampo = { niveloj, distancoj, frakcioj };
    fluajKampoj.set(klavo, kampo);
  }
  const bildo = kunteksto.createImageData(largho, alto);
  const interspaco = largho / 0o400;
  const glata = 0o1/0o2;
  for ( let indekso = 0o0; indekso < kampo.niveloj.length; indekso++ ) {
    const niv = kampo.niveloj[indekso];
    const banda = reliefo ? 0x808080 + Math.min(niv, 0o7) * 0x101010 : ombraKoloro(paletro[0o0], niv);
    // ⟨ ចន្លោះជាពណ៌កណ្ដាលរវាងពីរជាន់ មិនមែនខ្មៅជាងទាំងពីរ 📃 ⟩
    const fono = banda + ( kampo.frakcioj[indekso] < 0o1/0o2 ? 0x080808 : -0x080808 );
    const kovro = Math.min(0o1, Math.max(0o0,
      ( kampo.distancoj[indekso] - interspaco + glata ) / ( 0o2 * glata )));
    for ( let kanalo = 0o0; kanalo < 0o3; kanalo++ ) {
      const sxovo = ( 0o2 - kanalo ) * 0o10;
      const bv = ( banda >> sxovo ) & 0xff, fv = ( fono >> sxovo ) & 0xff;
      bildo.data[indekso * 0o4 + kanalo] = fv + ( bv - fv ) * kovro;
    }
    bildo.data[indekso * 0o4 + 0o3] = 0xff;
  }
  kunteksto.putImageData(bildo, 0o0, 0o0);
}

// ⟨ គ្រប់វាយនភាពប្រើជំនួយនេះ ដូច្នេះច្បាប់ជម្រាល KNAKEHE ត្រូវដំឡើងនៅទីនេះ
//   មិនអាស្រ័យលើលំដាប់នាំចូលម៉ូឌុលផ្សេង ។ 📃 ⟩
instaliKanakaGradientojn();

export const hazard = ( a: number, b: number ): number => a + Math.random() * ( b - a );

export function desegniWrapan(kunteksto: CanvasRenderingContext2D, s: number, formo: () => void): void {
  const sy = kunteksto.canvas.height;
  for ( const dx of [ -s, 0, s ] ) {
    for ( const dy of [ -sy, 0, sy ] ) {
      kunteksto.save();
      kunteksto.translate(dx, dy);
      formo();
      kunteksto.restore();
    }
  }
}

export function senAlfa(koloro: string): string {
  const m = /rgba?\(([^)]+)\)/.exec(koloro);
  if ( m ) {
    const [ r, g, b ] = m[1].split(",");
    return kanakaCss(`rgba(${r.trim()},${g.trim()},${b.trim()},0)`);
  }
  const h = /^#([0-9a-f]{6})$/i.exec(koloro.trim());
  if ( h ) {
    const n = parseInt(h[1], 0o20);
    return kanakaCss(`rgba(${( n >> 0o20 ) & 0o377},${( n >> 0o10 ) & 0o377},${n & 0o377},0)`);
  }
  return "transparent";
}

export function larmo(k: CanvasRenderingContext2D, x: number, y: number, rad: number,
  ang: number, koloro: string): void {
  const tipX = x + Math.cos(ang) * rad * 0o22/0o10;
  const tipY = y + Math.sin(ang) * rad * 0o22/0o10;
  const b1 = ang + Math.PI / 2, b2 = ang - Math.PI / 2;
  k.fillStyle = koloro;
  k.beginPath();
  k.moveTo(tipX, tipY);
  k.quadraticCurveTo(
    x + Math.cos(ang + 0o72/0o100) * rad * 0o15/0o10,
    y + Math.sin(ang + 0o72/0o100) * rad * 0o15/0o10,
    x + Math.cos(b1) * rad, y + Math.sin(b1) * rad
  );
  k.arc(x, y, rad, b1, b2, true);
  k.quadraticCurveTo(
    x + Math.cos(ang - 0o72/0o100) * rad * 0o15/0o10,
    y + Math.sin(ang - 0o72/0o100) * rad * 0o15/0o10,
    tipX, tipY
  );
  k.closePath();
  k.fill();
}

export function desegniWrapajnNubojn(kunteksto: CanvasRenderingContext2D, s: number, alto: number,
  n: number, paletro: string[], minimumo: number, amplekso: number,
  hazardo?: ( a: number, b: number ) => number): void {
  // ⟨ Math.random មិនយកអាគុយម៉ង់ a និង b ទេ , ដូច្នេះបើគ្មានឧបករណ៍ចៃដន្យ
  //   ផ្ទាល់ខ្លួន ត្រូវប្រើ hazard ដែលគោរពចន្លោះនោះ ។ កាំក៏ត្រូវប្រើឧបករណ៍ដដែល ។ 📃 ⟩
  const elekti = hazardo ?? hazard;
  for ( let i = 0; i < n; i++ ) {
    const r = alto * elekti(minimumo, minimumo + amplekso);
    const x = elekti(0, s), y = elekti(0, alto);
    const koloro = paletro[i % paletro.length];
    desegniWrapan(kunteksto, s, () => {
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, koloro);
      g.addColorStop(1, senAlfa(koloro));
      kunteksto.fillStyle = g;
      kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
    });
  }
}

export function sxovu(fn: () => THREE.CanvasTexture): () => THREE.CanvasTexture {
  let kaŝita: THREE.CanvasTexture | null = null;
  return () => ( kaŝita ??= fn() );
}

export function kreiKanvasanTeksajxon(w: number, h: number,
  pentri: ( k: CanvasRenderingContext2D ) => void,
  ripeto: [ number, number ] = [ 1, 1 ],
  agordoj: { volvado?: THREE.Wrapping; sRGB?: boolean; anisotropio?: number } = {}
): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = w; kanvasa.height = h;
  const kunteksto = kanvasa.getContext("2d")!;
  pentri(kunteksto);
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  if ( agordoj.sRGB !== false ) teksajxo.colorSpace = THREE.SRGBColorSpace;
  teksajxo.wrapS = teksajxo.wrapT = agordoj.volvado ?? THREE.RepeatWrapping;
  teksajxo.repeat.set(ripeto[0], ripeto[1]);
  if ( agordoj.anisotropio ) teksajxo.anisotropy = agordoj.anisotropio;
  return teksajxo;
}

export function neregulaFormo(k: CanvasRenderingContext2D, fx: number, fy: number, r0: number, ondoj: number, sago: number, fazo: number): void {
  k.beginPath();
  for ( let i = 0; i <= 0o40; i++ ) {
    const a = i / 0o40 * Math.PI * 2;
    const r = r0 * ( 1 + sago * Math.sin(a * ondoj + fazo) + sago * 0o5/0o10 * Math.sin(a * ondoj * 2 + fazo * 3 + 1) );
    const x = fx + Math.cos(a) * r, y = fy + Math.sin(a) * r;
    if ( i === 0 ) k.moveTo(x, y); else k.lineTo(x, y);
  }
  k.closePath();
}

// ⟪ ម៉ាស៊ីនវាយនភាពរួម 🖌️ ⟫
// ⟨ ថ្ម និងដាយ៉ូរីតគូរគ្រាប់ត្បូង និងចំណុចតូចៗតាមទម្រង់ដូចគ្នា ៖
//   ពណ៌ និងកម្ពស់ខុសគ្នាតែនៅជំហានលាបប៉ុណ្ណោះ ។ 📃 ⟩

export interface KristalaFormo {
  x: number; y: number; angulo: number; rx: number; ry: number; verticoj: number[];
}

/*គូរគ្រាប់ត្បូងពហុកោណដែលបានវិល ៖ ផ្លូវរួចហើយហៅ pentri ដើម្បីលាប
    @param k ( CanvasRenderingContext2D ) - បរិបទគូរ
    @param s ( number ) - ទទឹងក្រណាត់សម្រាប់រុំ
    @param kris ( KristalaFormo ) - ទីតាំង និងកំពូល
    @param pentri ( ( k ) => void ) - លាប fill និង stroke */
export function desegniWrapanKristalon(k: CanvasRenderingContext2D, s: number,
  kris: KristalaFormo, pentri: ( k: CanvasRenderingContext2D ) => void): void {
  desegniWrapan(k, s, () => {
    k.save();
    k.translate(kris.x, kris.y);
    k.rotate(kris.angulo);
    k.beginPath();
    for ( let v = 0; v < kris.verticoj.length; v++ ) {
      const a = ( v / kris.verticoj.length ) * Math.PI * 2;
      const r = kris.verticoj[v];
      const px = Math.cos(a) * kris.rx * r;
      const py = Math.sin(a) * kris.ry * r;
      if ( v === 0 ) k.moveTo(px, py); else k.lineTo(px, py);
    }
    k.closePath();
    pentri(k);
    k.restore();
  });
}

/*គូរចំណុចតូចៗច្រើនដែលរុំជុំក្រណាត់
    @param k ( CanvasRenderingContext2D ) - បរិបទគូរ
    @param s ( number ) - ទទឹងក្រណាត់
    @param n ( number ) - ចំនួនចំណុច
    @param specimeno ( ( i ) => [ x , y , wd , hd , koloro ] ) - យកតម្លៃចៃដន្យតាមលំដាប់ដើម */
export function desegniWrapajnMakulojn(k: CanvasRenderingContext2D, s: number, n: number,
  specimeno: ( i: number ) => [ number, number, number, number, string ]): void {
  for ( let i = 0; i < n; i++ ) {
    const [ x, y, wd, hd, koloro ] = specimeno(i);
    desegniWrapan(k, s, () => {
      k.fillStyle = koloro;
      k.fillRect(x, y, wd, hd);
    });
  }
}

/*ផ្លូវខ្សែបត់នៃស្នាមប្រេះ ៖ អ្នកហៅ stroke ខ្លួនឯង
    @param k ( CanvasRenderingContext2D ) - បរិបទគូរ
    @param punktoj ( [ number , number ][] ) - កំពូលខ្សែ */
export function desegniFendanVojon(k: CanvasRenderingContext2D, punktoj: [ number, number ][]): void {
  k.beginPath();
  k.moveTo(punktoj[0][0], punktoj[0][1]);
  for ( let i = 1; i < punktoj.length; i++ ) {
    k.lineTo(punktoj[i][0], punktoj[i][1]);
  }
}

/*ផ្លូវស្លឹករាងពងក្រពើ ៖ អ្នកហៅ fill ខ្លួនឯង
    @param k ( CanvasRenderingContext2D ) - បរិបទគូរ
    @param longo,largho ( number ) - ពាក់កណ្តាលប្រវែង និងទទឹង */
export function desegniFolianVojon(k: CanvasRenderingContext2D, longo: number, largho: number): void {
  k.beginPath();
  k.moveTo(-longo, 0);
  k.quadraticCurveTo(0, -largho, longo, 0);
  k.quadraticCurveTo(0, largho, -longo, 0);
}
