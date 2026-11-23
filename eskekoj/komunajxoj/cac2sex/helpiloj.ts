// ≺⧼ ſȷɔ ſɭ,ꞇ ꞁȷ̀ᴜ }ʃꞇ ʌ j͐ʃƽɜ }ʃꞇ 🖌️ ⧽≻
import * as THREE from "three";
import { kf2Veb6qaiKs2bu, veb6qaiCss, hunanu, hunanuWeh2 } from "../koloroj.js";
import { kf2Sakxo } from "../hazardo.js";

export function k2fKonturanQoxan(kuns2bana: CanvasRenderingContext2D, qoxa: Path2D,
  weh2: number, sefini: number, interspaco: number): void {
  kuns2bana.save();
  kuns2bana.fillStyle = hunanu(weh2, 0o0);
  kuns2bana.fill(qoxa);
  kuns2bana.clip(qoxa);
  kuns2bana.lineJoin = "round";
  kuns2bana.lineCap = "round";
  for ( let vem2 = 0o1; vem2 <= 0o3; vem2++ ) {
    kuns2bana.strokeStyle = hunanu(weh2, vem2);
    kuns2bana.lineWidth = 0o2 * ( interspaco + ( 0o4 - vem2 ) * sefini );
    kuns2bana.stroke(qoxa);
  }
  kuns2bana.strokeStyle = hunanu(weh2, 0o4);
  kuns2bana.lineWidth = interspaco * 0o2;
  kuns2bana.stroke(qoxa);
  kuns2bana.restore();
}

export function k2fFluanStrekon(kuns2bana: CanvasRenderingContext2D,
  n2k: readonly [ number, number ][], weh2: number, dikeco: number): void {
  const [ saxeni, kamaUnu, kamaDu, tlakakani ] = n2k;
  const maldekstra: [ number, number ][] = [], dekstra: [ number, number ][] = [];
  for ( let i = 0o0; i <= 0o100; i++ ) {
    const t = i / 0o100, u = 0o1 - t;
    const x = u ** 0o3 * saxeni[0o0] + 0o3 * u * u * t * kamaUnu[0o0]
      + 0o3 * u * t * t * kamaDu[0o0] + t ** 0o3 * tlakakani[0o0];
    const y = u ** 0o3 * saxeni[0o1] + 0o3 * u * u * t * kamaUnu[0o1]
      + 0o3 * u * t * t * kamaDu[0o1] + t ** 0o3 * tlakakani[0o1];
    const dx = 0o3 * u * u * ( kamaUnu[0o0] - saxeni[0o0] )
      + 0o6 * u * t * ( kamaDu[0o0] - kamaUnu[0o0] )
      + 0o3 * t * t * ( tlakakani[0o0] - kamaDu[0o0] );
    const dy = 0o3 * u * u * ( kamaUnu[0o1] - saxeni[0o1] )
      + 0o6 * u * t * ( kamaDu[0o1] - kamaUnu[0o1] )
      + 0o3 * t * t * ( tlakakani[0o1] - kamaDu[0o1] );
    const sefini = dikeco / 0o2 * ( 0o3/0o4 + Math.sin(t * Math.PI) / 0o4 );
    const sahakani = Math.hypot(dx, dy) || 0o1;
    maldekstra.push([ x - dy / sahakani * sefini, y + dx / sahakani * sefini ]);
    dekstra.push([ x + dy / sahakani * sefini, y - dx / sahakani * sefini ]);
  }
  const qoxa = new Path2D();
  qoxa.moveTo(maldekstra[0o0][0o0], maldekstra[0o0][0o1]);
  for ( const [ x, y ] of maldekstra.slice(0o1) ) qoxa.lineTo(x, y);
  for ( const [ x, y ] of dekstra.reverse() ) qoxa.lineTo(x, y);
  qoxa.closePath();
  for ( const [ x, y ] of [ saxeni, tlakakani ] ) {
    qoxa.moveTo(x + dikeco * 0o3/0o10, y);
    qoxa.arc(x, y, dikeco * 0o3/0o10, 0o0, Math.PI * 0o2, true);
    qoxa.closePath();
  }
  kuns2bana.save();
  kuns2bana.fillStyle = hunanu(weh2, 0o0);
  kuns2bana.fill(qoxa);
  kuns2bana.restore();
}

export function molaStelaK6h6(x: number, y: number, sefini: number, l6da: number): Path2D {
  const k6h6 = new Path2D();
  k6h6.moveTo(x, y - l6da);
  k6h6.bezierCurveTo(x + sefini / 0o10, y - l6da, x + sefini / 0o10, y - l6da / 0o2, x + sefini / 0o4, y - l6da / 0o4);
  k6h6.bezierCurveTo(x + sefini / 0o2, y - l6da / 0o10, x + sefini, y - l6da / 0o10, x + sefini, y);
  k6h6.bezierCurveTo(x + sefini, y + l6da / 0o10, x + sefini / 0o2, y + l6da / 0o10, x + sefini / 0o4, y + l6da / 0o4);
  k6h6.bezierCurveTo(x + sefini / 0o10, y + l6da / 0o2, x + sefini / 0o10, y + l6da, x, y + l6da);
  k6h6.bezierCurveTo(x - sefini / 0o10, y + l6da, x - sefini / 0o10, y + l6da / 0o2, x - sefini / 0o4, y + l6da / 0o4);
  k6h6.bezierCurveTo(x - sefini / 0o2, y + l6da / 0o10, x - sefini, y + l6da / 0o10, x - sefini, y);
  k6h6.bezierCurveTo(x - sefini, y - l6da / 0o10, x - sefini / 0o2, y - l6da / 0o10, x - sefini / 0o4, y - l6da / 0o4);
  k6h6.bezierCurveTo(x - sefini / 0o10, y - l6da / 0o2, x - sefini / 0o10, y - l6da, x, y - l6da);
  k6h6.closePath();
  return k6h6;
}

const konturajKampoj = new Map<string, { distancoj: Float32Array; cxeloj: Uint16Array }>();

export function k2fKonturanCac2sex(kuns2bana: CanvasRenderingContext2D,
  paletro: readonly number[], tk2ni: number, kolumnoj = 0o4, hax2pa = 0o4, reliefo = false): void {
  const { width: sefini, height: l6da } = kuns2bana.canvas;
  const ca3aq = [ sefini, l6da, tk2ni, kolumnoj, hax2pa ].join("/");
  const vepat6ni = Math.min(sefini / kolumnoj, l6da / hax2pa);
  let kampo = legiKampon(konturajKampoj, ca3aq);
  if ( !kampo ) {
    const hazardo = kf2Sakxo(tk2ni);
    const hasost2 = Array.from({ length: kolumnoj * hax2pa }, ( _, vecax2lani ) => ({
      x: vecax2lani % kolumnoj + 0o1/0o2 + ( hazardo() - 0o1/0o2 ) * 0o3/0o4,
      y: Math.floor(vecax2lani / kolumnoj) + 0o1/0o2 + ( hazardo() - 0o1/0o2 ) * 0o3/0o4,
    }));
    const cxeloj = new Uint16Array(sefini * l6da);
    const distancoj = new Float32Array(sefini * l6da);
    const c2q = Math.PI * 0o2;
    for ( let y = 0o0; y < l6da; y++ ) {
      for ( let x = 0o0; x < sefini; x++ ) {
        const u = x / sefini * kolumnoj + Math.sin(y / l6da * c2q) * 0o3/0o4
          + Math.sin(( x / sefini + y / l6da ) * c2q) * 0o1/0o4;
        const v = y / l6da * hax2pa + Math.sin(x / sefini * c2q) * 0o3/0o4
          - Math.cos(( x / sefini - y / l6da ) * c2q) * 0o1/0o4;
        let plejProksima = Infinity;
        for ( let dy = -0o1; dy <= 0o1; dy++ ) {
          for ( let dx = -0o1; dx <= 0o1; dx++ ) {
            const cx = Math.floor(u) + dx, cy = Math.floor(v) + dy;
            const vecax2lani = ( ( cy % hax2pa + hax2pa ) % hax2pa ) * kolumnoj
              + ( cx % kolumnoj + kolumnoj ) % kolumnoj;
            const sost2 = hasost2[vecax2lani];
            const px = sost2.x + Math.floor(cx / kolumnoj) * kolumnoj - u;
            const py = sost2.y + Math.floor(cy / hax2pa) * hax2pa - v;
            const h6kuni = px * px + py * py;
            if ( h6kuni < plejProksima ) {
              plejProksima = h6kuni;
              cxeloj[y * sefini + x] = vecax2lani;
            }
          }
        }
      }
    }
    const raqa = ( x: number, y: number ): number =>
      ( ( y + l6da ) % l6da ) * sefini + ( x + sefini ) % sefini;
    for ( let y = 0o0; y < l6da; y++ ) {
      for ( let x = 0o0; x < sefini; x++ ) {
        const vecax2lani = raqa(x, y), cxelo = cxeloj[vecax2lani];
        distancoj[vecax2lani] = cxelo !== cxeloj[raqa(x - 0o1, y)]
          || cxelo !== cxeloj[raqa(x + 0o1, y)]
          || cxelo !== cxeloj[raqa(x, y - 0o1)]
          || cxelo !== cxeloj[raqa(x, y + 0o1)] ? 0o0 : vepat6ni;
      }
    }
    // រុំពីរជុំ ដើម្បីរក្សាចម្ងាយដូចគ្នាត្រង់ថ្នេរក្បឿង។
    for ( let ripeto = 0o0; ripeto < 0o2; ripeto++ ) {
      for ( const c2w2q of [ 0o1, -0o1 ] ) {
        for ( let j = 0o0; j < l6da; j++ ) {
          const y = c2w2q > 0o0 ? j : l6da - 0o1 - j;
          for ( let i = 0o0; i < sefini; i++ ) {
            const x = c2w2q > 0o0 ? i : sefini - 0o1 - i;
            const vecax2lani = raqa(x, y);
            distancoj[vecax2lani] = Math.min(distancoj[vecax2lani],
              distancoj[raqa(x - c2w2q, y)] + 0o1,
              distancoj[raqa(x, y - c2w2q)] + 0o1,
              distancoj[raqa(x - c2w2q, y - c2w2q)] + Math.SQRT2,
              distancoj[raqa(x + c2w2q, y - c2w2q)] + Math.SQRT2);
          }
        }
      }
    }
    const glatigitaj = new Float32Array(distancoj.length);
    for ( let ripeto = 0o0; ripeto < 0o4; ripeto++ ) {
      for ( let y = 0o0; y < l6da; y++ ) {
        for ( let x = 0o0; x < sefini; x++ ) {
          const vecax2lani = raqa(x, y);
          let tlunakani = 0o0;
          for ( const dy of [ -0o2, 0o0, 0o2 ] ) {
            for ( const dx of [ -0o2, 0o0, 0o2 ] ) {
              const najbaro = raqa(x + dx, y + dy);
              const s2karanu = ( dx === 0o0 ? 0o2 : 0o1 ) * ( dy === 0o0 ? 0o2 : 0o1 );
              tlunakani += distancoj[najbaro] * s2karanu * ( cxeloj[najbaro] === cxeloj[vecax2lani] ? 0o1 : -0o1 );
            }
          }
          glatigitaj[vecax2lani] = tlunakani / 0o20;
        }
      }
      distancoj.set(glatigitaj);
    }
    kampo = { distancoj, cxeloj };
    skribiKampon(konturajKampoj, ca3aq, kampo);
  }
  const bildo = kuns2bana.createImageData(sefini, l6da);
  const interspaco = vepat6ni / 0o40, bando = vepat6ni / 0o20;
  const fono = reliefo ? 0x707070 : hunanuWeh2(paletro[0o0], 0o4);
  for ( let vecax2lani = 0o0; vecax2lani < kampo.distancoj.length; vecax2lani++ ) {
    const h6kuni = kampo.distancoj[vecax2lani];
    const vem2 = Math.min(0o3, Math.max(0o0, Math.floor(( h6kuni - interspaco ) / bando)));
    const weh2 = reliefo ? 0x808080 + vem2 * 0x101010
      : hunanuWeh2(paletro[kampo.cxeloj[vecax2lani] % paletro.length], 0o3 - vem2);
    const kovro = Math.min(0o1, Math.max(0o0, h6kuni - interspaco));
    for ( let qar6xe = 0o0; qar6xe < 0o3; qar6xe++ ) {
      const sxovo = ( 0o2 - qar6xe ) * 0o10;
      const skek2 = ( weh2 >> sxovo ) & 0xff;
      const kozuni = ( fono >> sxovo ) & 0xff;
      bildo.data[vecax2lani * 0o4 + qar6xe] = kozuni + ( skek2 - kozuni ) * kovro;
    }
    bildo.data[vecax2lani * 0o4 + 0o3] = 0xff;
  }
  kuns2bana.putImageData(bildo, 0o0, 0o0);
}

export function neregulaK6h6(fx: number, fy: number, r0: number,
  ondoj: number, sago: number, fazo: number): Path2D {
  const k6h6 = new Path2D();
  for ( let i = 0o0; i <= 0o100; i++ ) {
    const a = i / 0o100 * Math.PI * 0o2;
    const r = r0 * ( 1 + sago * Math.sin(a * ondoj + fazo)
      + sago * 0o2/0o10 * Math.sin(a * ondoj * 0o2 + fazo * 0o3 + 1) );
    const x = fx + Math.cos(a) * r, y = fy + Math.sin(a) * r;
    if ( i === 0o0 ) k6h6.moveTo(x, y); else k6h6.lineTo(x, y);
  }
  k6h6.closePath();
  return k6h6;
}

// ⟨ ស្រទាប់ដីហូរ ៖ វាលរលោងខ្ពស់ទាបដែលបំបែកជាថ្នាំពណ៌រាបស្មើ
//   ដូចខ្សែកម្ពស់លើផែនទី ។ វាលខ្យល់វិលជុំដើម្បីរក្សាថ្នេរក្បឿង ។ 📃 ⟩
function periodaBruo(tk2ni: number, kradX: number, kradY: number): ( x: number, y: number ) => number {
  const hazardo = kf2Sakxo(tk2ni);
  const hatskek2 = new Float32Array(kradX * kradY);
  for ( let i = 0o0; i < hatskek2.length; i++ ) hatskek2[i] = hazardo();
  return ( x, y ) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const sx = xf * xf * ( 0o3 - 0o2 * xf ), sy = yf * yf * ( 0o3 - 0o2 * yf );
    const x0 = ( xi % kradX + kradX ) % kradX, x1 = ( x0 + 0o1 ) % kradX;
    const y0 = ( yi % kradY + kradY ) % kradY, y1 = ( y0 + 0o1 ) % kradY;
    const a = hatskek2[y0 * kradX + x0], b = hatskek2[y0 * kradX + x1];
    const c = hatskek2[y1 * kradX + x0], d = hatskek2[y1 * kradX + x1];
    return a + ( b - a ) * sx + ( c - a ) * sy + ( a - b - c + d ) * sx * sy;
  };
}

const fluajKampoj = new Map<string, { havem2: Uint8Array; distancoj: Float32Array; frakcioj: Float32Array }>();

export function k2fFluanCac2sex(kuns2bana: CanvasRenderingContext2D,
  paletro: readonly number[], tk2ni: number, bandoj = 0o6, reliefo = false): void {
  const { width: sefini, height: l6da } = kuns2bana.canvas;
  const ca3aq = [ sefini, l6da, tk2ni, bandoj ].join("/");
  let kampo = legiKampon(fluajKampoj, ca3aq);
  if ( !kampo ) {
    const warpX = periodaBruo(tk2ni + 0o303, 0o4, 0o4);
    const warpY = periodaBruo(tk2ni + 0o404, 0o4, 0o4);
    const bruo1 = periodaBruo(tk2ni, 0o2, 0o6);
    const bruo2 = periodaBruo(tk2ni + 0o101, 0o4, 0o14);
    const bruo3 = periodaBruo(tk2ni + 0o202, 0o10, 0o30);
    const kampoj = new Float32Array(sefini * l6da);
    for ( let y = 0o0; y < l6da; y++ ) {
      for ( let x = 0o0; x < sefini; x++ ) {
        const u = x / sefini, v = y / l6da;
        const wx = u + ( warpX(u * 0o4, v * 0o4) - 0o1/0o2 ) * 0o15/0o100;
        const wy = v + ( warpY(u * 0o4, v * 0o4) - 0o1/0o2 ) * 0o15/0o100;
        kampoj[y * sefini + x] = bruo1(wx * 0o2, wy * 0o6) * 0o6/0o10
          + bruo2(wx * 0o4, wy * 0o14) * 0o3/0o10
          + bruo3(wx * 0o10, wy * 0o30) * 0o1/0o10;
      }
    }
    const havem2 = new Uint8Array(sefini * l6da);
    const frakcioj = new Float32Array(sefini * l6da);
    const distancoj = new Float32Array(sefini * l6da);
    for ( let y = 0o0; y < l6da; y++ ) {
      for ( let x = 0o0; x < sefini; x++ ) {
        const i = y * sefini + x;
        const b = kampoj[i] * bandoj;
        const niv = Math.floor(b);
        havem2[i] = niv;
        // ⟨ ចម្ងាយគិតជាភិកសែល ៖ គែមចន្លោះមានទទឹងស្មើគ្នាគ្រប់កន្លែង 📃 ⟩
        const gx = ( kampoj[y * sefini + Math.min(sefini - 0o1, x + 0o1)]
          - kampoj[y * sefini + Math.max(0o0, x - 0o1)] ) / 0o2;
        const gy = ( kampoj[Math.min(l6da - 0o1, y + 0o1) * sefini + x]
          - kampoj[Math.max(0o0, y - 0o1) * sefini + x] ) / 0o2;
        const grad = Math.hypot(gx, gy) * bandoj;
        const frac = b - niv;
        frakcioj[i] = frac;
        distancoj[i] = Math.min(frac, 0o1 - frac) / Math.max(grad, 0o1/0o10000);
      }
    }
    kampo = { havem2, distancoj, frakcioj };
    skribiKampon(fluajKampoj, ca3aq, kampo);
  }
  const bildo = kuns2bana.createImageData(sefini, l6da);
  const interspaco = sefini / 0o400;
  const glata = 0o1/0o2;
  for ( let vecax2lani = 0o0; vecax2lani < kampo.havem2.length; vecax2lani++ ) {
    const niv = kampo.havem2[vecax2lani];
    const banda = reliefo ? 0x808080 + Math.min(niv, 0o7) * 0x101010 : hunanuWeh2(paletro[0o0], niv);
    // ⟨ ចន្លោះជាពណ៌កណ្ដាលរវាងពីរជាន់ មិនមែនខ្មៅជាងទាំងពីរ 📃 ⟩
    const fono = banda + ( kampo.frakcioj[vecax2lani] < 0o1/0o2 ? 0x080808 : -0x080808 );
    const kovro = Math.min(0o1, Math.max(0o0,
      ( kampo.distancoj[vecax2lani] - interspaco + glata ) / ( 0o2 * glata )));
    for ( let qar6xe = 0o0; qar6xe < 0o3; qar6xe++ ) {
      const sxovo = ( 0o2 - qar6xe ) * 0o10;
      const bv = ( banda >> sxovo ) & 0xff, fv = ( fono >> sxovo ) & 0xff;
      bildo.data[vecax2lani * 0o4 + qar6xe] = fv + ( bv - fv ) * kovro;
    }
    bildo.data[vecax2lani * 0o4 + 0o3] = 0xff;
  }
  kuns2bana.putImageData(bildo, 0o0, 0o0);
}

// ⟨ គ្រប់វាយនភាពប្រើជំនួយនេះ ដូច្នេះច្បាប់ជម្រាល KNAKEHE ត្រូវដំឡើងនៅទីនេះ
//   មិនអាស្រ័យលើលំដាប់នាំចូលម៉ូឌុលផ្សេង ។ 📃 ⟩
kf2Veb6qaiKs2bu();

export const hazard = ( a: number, b: number ): number => a + Math.random() * ( b - a );

export function k2fWrapan(kuns2bana: CanvasRenderingContext2D, s: number, qoxa: () => void): void {
  const sy = kuns2bana.canvas.height;
  for ( const dx of [ -s, 0, s ] ) {
    for ( const dy of [ -sy, 0, sy ] ) {
      kuns2bana.save();
      kuns2bana.translate(dx, dy);
      qoxa();
      kuns2bana.restore();
    }
  }
}

export function senAlfa(weh2: string): string {
  const m = /rgba?\(([^)]+)\)/.exec(weh2);
  if ( m ) {
    const [ r, g, b ] = m[1].split(",");
    return veb6qaiCss(`rgba(${r.trim()},${g.trim()},${b.trim()},0)`);
  }
  const h = /^#([0-9a-f]{6})$/i.exec(weh2.trim());
  if ( h ) {
    const n = parseInt(h[1], 0o20);
    return veb6qaiCss(`rgba(${( n >> 0o20 ) & 0o377},${( n >> 0o10 ) & 0o377},${n & 0o377},0)`);
  }
  return "transparent";
}

export function larmo(k: CanvasRenderingContext2D, x: number, y: number, rad: number,
  ang: number, weh2: string): void {
  const tipX = x + Math.cos(ang) * rad * 0o22/0o10;
  const tipY = y + Math.sin(ang) * rad * 0o22/0o10;
  const b1 = ang + Math.PI / 2, b2 = ang - Math.PI / 2;
  k.fillStyle = weh2;
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

export function k2fWrapajnNubojn(kuns2bana: CanvasRenderingContext2D, s: number, l6da: number,
  n: number, paletro: string[], minimumo: number, amplekso: number,
  hazardo?: ( a: number, b: number ) => number): void {
  // ⟨ Math.random មិនយកអាគុយម៉ង់ a និង b ទេ , ដូច្នេះបើគ្មានឧបករណ៍ចៃដន្យ
  //   ផ្ទាល់ខ្លួន ត្រូវប្រើ hazard ដែលគោរពចន្លោះនោះ ។ កាំក៏ត្រូវប្រើឧបករណ៍ដដែល ។ 📃 ⟩
  const elekti = hazardo ?? hazard;
  for ( let i = 0; i < n; i++ ) {
    const r = l6da * elekti(minimumo, minimumo + amplekso);
    const x = elekti(0, s), y = elekti(0, l6da);
    const weh2 = paletro[i % paletro.length];
    k2fWrapan(kuns2bana, s, () => {
      const g = kuns2bana.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, weh2);
      g.addColorStop(1, senAlfa(weh2));
      kuns2bana.fillStyle = g;
      kuns2bana.beginPath(); kuns2bana.arc(x, y, r, 0, Math.PI * 2); kuns2bana.fill();
    });
  }
}

export function sxovu(fn: () => THREE.CanvasTexture): () => THREE.CanvasTexture {
  let kaŝita: THREE.CanvasTexture | null = null;
  return () => ( kaŝita ??= fn() );
}

// ⟪ វាលគណនាមានទំហំកំណត់ 📃 ⟫
// ⟨ វាលចម្ងាយ និង វាលហូរធំជាងរូបភាពខ្លួនឯង តែប្រើតែពេលគូរលើកដំបូង ។
//   តារាងទាំងពីររក្សាតែគ្រាប់ថ្មីៗបំផុត ដូច្នេះអង្គចងចាំមិនកើនគ្មានទីបញ្ចប់
//   ពេលឧបករណ៍បង្កើតវាយនភាពថ្មីៗពេលលេង ។ 📃 ⟩
const KAMPA_LIMO = 0o10;

function legiKampon<K, V>(kampo: Map<K, V>, ca3aq: K): V | undefined {
  const skek2 = kampo.get(ca3aq);
  if ( skek2 === undefined ) return undefined;
  kampo.delete(ca3aq);
  kampo.set(ca3aq, skek2);
  return skek2;
}

function skribiKampon<K, V>(kampo: Map<K, V>, ca3aq: K, skek2: V): void {
  kampo.delete(ca3aq);
  kampo.set(ca3aq, skek2);
  while ( kampo.size > KAMPA_LIMO ) {
    const plejS23ohk2sai = kampo.keys().next();
    if ( plejS23ohk2sai.done ) break;
    kampo.delete(plejS23ohk2sai.value);
  }
}

// ⟨ ក្រណាត់ត្រូវរក្សាពិកសែលដើមជានិច្ច ។ ការដោះលែងវាធ្វើឱ្យវាយនភាពខ្មៅ ព្រោះ
//   ច្លើនដែលបង្កើតក្រោយ , ការកំណត់ needsUpdate និង ការត្រឡប់មកវិញរបស់បរិបទ WebGL
//   សុទ្ធតែផ្ទុកឡើងវិញពីក្រណាត់ដដែល ។ គូរឡើងវិញក៏មិនត្រឹមត្រូវដែរ ព្រោះអ្នកគូរ
//   ជាច្រើនប្រើ Math.random ហើយវាលចម្ងាយត្រូវគណនាឡើងវិញយឺតណាស់ ។ 📃 ⟩
export function liberigiCac2sexnKampojn(): void {
  // ⟨ ក្រោយគូរគ្រប់វាយនភាពរួច វាលទាំងនេះលែងប្រើ ។ នេះជាផ្នែកធំបំផុតនៃ
  //   អង្គចងចាំ ហើយការដោះលែងវាមិនប៉ះរូបភាពលើក្រណាត់ទេ ។ 📃 ⟩
  konturajKampoj.clear();
  fluajKampoj.clear();
}

export function kf2P2t6zoCac2sex(w: number, h: number,
  pentri: ( k: CanvasRenderingContext2D ) => void,
  ripeto: [ number, number ] = [ 1, 1 ],
  haku1o: { volvado?: THREE.Wrapping; sRGB?: boolean; anisotropio?: number } = {}
): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = w; kanvasa.height = h;
  const kuns2bana = kanvasa.getContext("2d")!;
  pentri(kuns2bana);
  const cac2sex = new THREE.CanvasTexture(kanvasa);
  if ( haku1o.sRGB !== false ) cac2sex.colorSpace = THREE.SRGBColorSpace;
  cac2sex.wrapS = cac2sex.wrapT = haku1o.volvado ?? THREE.RepeatWrapping;
  cac2sex.repeat.set(ripeto[0], ripeto[1]);
  if ( haku1o.anisotropio ) cac2sex.anisotropy = haku1o.anisotropio;
  return cac2sex;
}

export function neregulaQoxa(k: CanvasRenderingContext2D, fx: number, fy: number, r0: number, ondoj: number, sago: number, fazo: number): void {
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

export interface KristalaQoxa {
  x: number; y: number; tafkaq: number; rx: number; ry: number; verticoj: number[];
}

/*គូរគ្រាប់ត្បូងពហុកោណដែលបានវិល ៖ ផ្លូវរួចហើយហៅ pentri ដើម្បីលាប
    @param k ( CanvasRenderingContext2D ) - បរិបទគូរ
    @param s ( number ) - ទទឹងក្រណាត់សម្រាប់រុំ
    @param kris ( KristalaQoxa ) - ទីតាំង និងកំពូល
    @param pentri ( ( k ) => void ) - លាប fill និង stroke */
export function k2fWrapanKristalon(k: CanvasRenderingContext2D, s: number,
  kris: KristalaQoxa, pentri: ( k: CanvasRenderingContext2D ) => void): void {
  k2fWrapan(k, s, () => {
    k.save();
    k.translate(kris.x, kris.y);
    k.rotate(kris.tafkaq);
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
    @param specimeno ( ( i ) => [ x , y , wd , hd , weh2 ] ) - យកតម្លៃចៃដន្យតាមលំដាប់ដើម */
export function k2fWrapajnMakulojn(k: CanvasRenderingContext2D, s: number, n: number,
  specimeno: ( i: number ) => [ number, number, number, number, string ]): void {
  for ( let i = 0; i < n; i++ ) {
    const [ x, y, wd, hd, weh2 ] = specimeno(i);
    k2fWrapan(k, s, () => {
      k.fillStyle = weh2;
      k.fillRect(x, y, wd, hd);
    });
  }
}

/*ផ្លូវខ្សែបត់នៃស្នាមប្រេះ ៖ អ្នកហៅ stroke ខ្លួនឯង
    @param k ( CanvasRenderingContext2D ) - បរិបទគូរ
    @param n2k ( [ number , number ][] ) - កំពូលខ្សែ */
export function k2fFendanK6h6n(k: CanvasRenderingContext2D, n2k: [ number, number ][]): void {
  k.beginPath();
  k.moveTo(n2k[0][0], n2k[0][1]);
  for ( let i = 1; i < n2k.length; i++ ) {
    k.lineTo(n2k[i][0], n2k[i][1]);
  }
}

/*ផ្លូវស្លឹករាងពងក្រពើ ៖ អ្នកហៅ fill ខ្លួនឯង
    @param k ( CanvasRenderingContext2D ) - បរិបទគូរ
    @param sahakani,sefini ( number ) - ពាក់កណ្តាលប្រវែង និងទទឹង */
export function k2fSlafK6h6n(k: CanvasRenderingContext2D, sahakani: number, sefini: number): void {
  k.beginPath();
  k.moveTo(-sahakani, 0);
  k.quadraticCurveTo(0, -sefini, sahakani, 0);
  k.quadraticCurveTo(0, sefini, -sahakani, 0);
}
