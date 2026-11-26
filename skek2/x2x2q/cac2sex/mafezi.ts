// ≺⧼ ſȷɔ ſɭ,ꞇ ꞁȷ̀ᴜ }ʃꞇ ʌ j͐ʃƽɜ }ʃꞇ 🖌️ ⧽≻
import * as THREE from "three";
import { kf2Veb6qaiKs2bu, veb6qaiCss, hunanu, hunanuWeh2 } from "../haweh2.js";
import { kf2Sakxo } from "../caq2q.js";

export function k2fKonturanQoxan(kuns2bana: CanvasRenderingContext2D, qoxa: Path2D,
  weh2: number, sefini: number, vesefestaf: number): void {
  kuns2bana.save();
  kuns2bana.fillStyle = hunanu(weh2, 0o0);
  kuns2bana.fill(qoxa);
  kuns2bana.clip(qoxa);
  kuns2bana.lineJoin = "round";
  kuns2bana.lineCap = "round";
  for ( let vem2 = 0o1; vem2 <= 0o3; vem2++ ) {
    kuns2bana.strokeStyle = hunanu(weh2, vem2);
    kuns2bana.lineWidth = 0o2 * ( vesefestaf + ( 0o4 - vem2 ) * sefini );
    kuns2bana.stroke(qoxa);
  }
  kuns2bana.strokeStyle = hunanu(weh2, 0o4);
  kuns2bana.lineWidth = vesefestaf * 0o2;
  kuns2bana.stroke(qoxa);
  kuns2bana.restore();
}

export function k2fFluanStrekon(kuns2bana: CanvasRenderingContext2D,
  n2k: readonly [ number, number ][], weh2: number, kof: number): void {
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
    const sefini = kof / 0o2 * ( 0o3/0o4 + Math.sin(t * Math.PI) / 0o4 );
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
    qoxa.moveTo(x + kof * 0o3/0o10, y);
    qoxa.arc(x, y, kof * 0o3/0o10, 0o0, Math.PI * 0o2, true);
    qoxa.closePath();
  }
  kuns2bana.save();
  kuns2bana.fillStyle = hunanu(weh2, 0o0);
  kuns2bana.fill(qoxa);
  kuns2bana.restore();
}

export function baz2SexiaK6h6(x: number, y: number, sefini: number, l6da: number): Path2D {
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

const konturajKampoj = new Map<string, { hah6kuni: Float32Array; hak2pa: Uint16Array }>();

export function k2fKonturanCac2sex(kuns2bana: CanvasRenderingContext2D,
  weh2Cax2lo: readonly number[], tk2ni: number, hakolumno = 0o4, hax2pa = 0o4, reliefo = false): void {
  const { width: sefini, height: l6da } = kuns2bana.canvas;
  const ca3aq = [ sefini, l6da, tk2ni, hakolumno, hax2pa ].join("/");
  const vepat6ni = Math.min(sefini / hakolumno, l6da / hax2pa);
  let were = vefalKampon(konturajKampoj, ca3aq);
  if ( !were ) {
    const sakxo = kf2Sakxo(tk2ni);
    const hasost2 = Array.from({ length: hakolumno * hax2pa }, ( _, vecax2lani ) => ({
      x: vecax2lani % hakolumno + 0o1/0o2 + ( sakxo() - 0o1/0o2 ) * 0o3/0o4,
      y: Math.floor(vecax2lani / hakolumno) + 0o1/0o2 + ( sakxo() - 0o1/0o2 ) * 0o3/0o4,
    }));
    const hak2pa = new Uint16Array(sefini * l6da);
    const hah6kuni = new Float32Array(sefini * l6da);
    const c2q = Math.PI * 0o2;
    for ( let y = 0o0; y < l6da; y++ ) {
      for ( let x = 0o0; x < sefini; x++ ) {
        const u = x / sefini * hakolumno + Math.sin(y / l6da * c2q) * 0o3/0o4
          + Math.sin(( x / sefini + y / l6da ) * c2q) * 0o1/0o4;
        const v = y / l6da * hax2pa + Math.sin(x / sefini * c2q) * 0o3/0o4
          - Math.cos(( x / sefini - y / l6da ) * c2q) * 0o1/0o4;
        let kmaTsiike = Infinity;
        for ( let dy = -0o1; dy <= 0o1; dy++ ) {
          for ( let dx = -0o1; dx <= 0o1; dx++ ) {
            const cx = Math.floor(u) + dx, cy = Math.floor(v) + dy;
            const vecax2lani = ( ( cy % hax2pa + hax2pa ) % hax2pa ) * hakolumno
              + ( cx % hakolumno + hakolumno ) % hakolumno;
            const sost2 = hasost2[vecax2lani];
            const px = sost2.x + Math.floor(cx / hakolumno) * hakolumno - u;
            const py = sost2.y + Math.floor(cy / hax2pa) * hax2pa - v;
            const h6kuni = px * px + py * py;
            if ( h6kuni < kmaTsiike ) {
              kmaTsiike = h6kuni;
              hak2pa[y * sefini + x] = vecax2lani;
            }
          }
        }
      }
    }
    const raqa = ( x: number, y: number ): number =>
      ( ( y + l6da ) % l6da ) * sefini + ( x + sefini ) % sefini;
    for ( let y = 0o0; y < l6da; y++ ) {
      for ( let x = 0o0; x < sefini; x++ ) {
        const vecax2lani = raqa(x, y), k2pa = hak2pa[vecax2lani];
        hah6kuni[vecax2lani] = k2pa !== hak2pa[raqa(x - 0o1, y)]
          || k2pa !== hak2pa[raqa(x + 0o1, y)]
          || k2pa !== hak2pa[raqa(x, y - 0o1)]
          || k2pa !== hak2pa[raqa(x, y + 0o1)] ? 0o0 : vepat6ni;
      }
    }
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
    for ( let ripeto = 0o0; ripeto < 0o2; ripeto++ ) {
      for ( const c2w2q of [ 0o1, -0o1 ] ) {
        for ( let j = 0o0; j < l6da; j++ ) {
          const y = c2w2q > 0o0 ? j : l6da - 0o1 - j;
          for ( let i = 0o0; i < sefini; i++ ) {
            const x = c2w2q > 0o0 ? i : sefini - 0o1 - i;
            const vecax2lani = raqa(x, y);
            hah6kuni[vecax2lani] = Math.min(hah6kuni[vecax2lani],
              hah6kuni[raqa(x - c2w2q, y)] + 0o1,
              hah6kuni[raqa(x, y - c2w2q)] + 0o1,
              hah6kuni[raqa(x - c2w2q, y - c2w2q)] + Math.SQRT2,
              hah6kuni[raqa(x + c2w2q, y - c2w2q)] + Math.SQRT2);
          }
        }
      }
    }
    const haxaha = new Float32Array(hah6kuni.length);
    for ( let ripeto = 0o0; ripeto < 0o4; ripeto++ ) {
      for ( let y = 0o0; y < l6da; y++ ) {
        for ( let x = 0o0; x < sefini; x++ ) {
          const vecax2lani = raqa(x, y);
          let tlunakani = 0o0;
          for ( const dy of [ -0o2, 0o0, 0o2 ] ) {
            for ( const dx of [ -0o2, 0o0, 0o2 ] ) {
              const tsiike = raqa(x + dx, y + dy);
              const s2karanu = ( dx === 0o0 ? 0o2 : 0o1 ) * ( dy === 0o0 ? 0o2 : 0o1 );
              tlunakani += hah6kuni[tsiike] * s2karanu * ( hak2pa[tsiike] === hak2pa[vecax2lani] ? 0o1 : -0o1 );
            }
          }
          haxaha[vecax2lani] = tlunakani / 0o20;
        }
      }
      hah6kuni.set(haxaha);
    }
    were = { hah6kuni, hak2pa };
    skribiKampon(konturajKampoj, ca3aq, were);
  }
  const bildo = kuns2bana.createImageData(sefini, l6da);
  const vesefestaf = vepat6ni / 0o40, bando = vepat6ni / 0o20;
  const fono = reliefo ? 0x707070 : hunanuWeh2(weh2Cax2lo[0o0], 0o4);
  for ( let vecax2lani = 0o0; vecax2lani < were.hah6kuni.length; vecax2lani++ ) {
    const h6kuni = were.hah6kuni[vecax2lani];
    const vem2 = Math.min(0o3, Math.max(0o0, Math.floor(( h6kuni - vesefestaf ) / bando)));
    const weh2 = reliefo ? 0x808080 + vem2 * 0x101010
      : hunanuWeh2(weh2Cax2lo[were.hak2pa[vecax2lani] % weh2Cax2lo.length], 0o3 - vem2);
    const kovro = Math.min(0o1, Math.max(0o0, h6kuni - vesefestaf));
    for ( let qar6xe = 0o0; qar6xe < 0o3; qar6xe++ ) {
      const santa = ( 0o2 - qar6xe ) * 0o10;
      const skek2 = ( weh2 >> santa ) & 0xff;
      const kozuni = ( fono >> santa ) & 0xff;
      bildo.data[vecax2lani * 0o4 + qar6xe] = kozuni + ( skek2 - kozuni ) * kovro;
    }
    bildo.data[vecax2lani * 0o4 + 0o3] = 0xff;
  }
  kuns2bana.putImageData(bildo, 0o0, 0o0);
}

export function neregulaK6h6(fx: number, fy: number, r0: number,
  hax6mi: number, sago: number, xafanitapu: number): Path2D {
  const k6h6 = new Path2D();
  for ( let i = 0o0; i <= 0o100; i++ ) {
    const a = i / 0o100 * Math.PI * 0o2;
    const r = r0 * ( 0o1 + sago * Math.sin(a * hax6mi + xafanitapu)
      + sago * 0o2/0o10 * Math.sin(a * hax6mi * 0o2 + xafanitapu * 0o3 + 0o1) );
    const x = fx + Math.cos(a) * r, y = fy + Math.sin(a) * r;
    if ( i === 0o0 ) k6h6.moveTo(x, y); else k6h6.lineTo(x, y);
  }
  k6h6.closePath();
  return k6h6;
}

// ⟨ ſɭɜ ſɭ,w , ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
//   ſɭэ ſɭw , ꞙɭɿ , 📃 ⟩
function periodaBruo(tk2ni: number, kradX: number, kradY: number): ( x: number, y: number ) => number {
  const sakxo = kf2Sakxo(tk2ni);
  const hatskek2 = new Float32Array(kradX * kradY);
  for ( let i = 0o0; i < hatskek2.length; i++ ) hatskek2[i] = sakxo();
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

const fluajKampoj = new Map<string, { havem2: Uint8Array; hah6kuni: Float32Array; hadoma: Float32Array }>();

export function k2fFluanCac2sex(kuns2bana: CanvasRenderingContext2D,
  weh2Cax2lo: readonly number[], tk2ni: number, havem2Kvanto = 0o6, reliefo = false): void {
  const { width: sefini, height: l6da } = kuns2bana.canvas;
  const ca3aq = [ sefini, l6da, tk2ni, havem2Kvanto ].join("/");
  let were = vefalKampon(fluajKampoj, ca3aq);
  if ( !were ) {
    const warpX = periodaBruo(tk2ni + 0o303, 0o4, 0o4);
    const warpY = periodaBruo(tk2ni + 0o404, 0o4, 0o4);
    const bruo1 = periodaBruo(tk2ni, 0o2, 0o6);
    const bruo2 = periodaBruo(tk2ni + 0o101, 0o4, 0o14);
    const bruo3 = periodaBruo(tk2ni + 0o202, 0o10, 0o30);
    const hawere = new Float32Array(sefini * l6da);
    for ( let y = 0o0; y < l6da; y++ ) {
      for ( let x = 0o0; x < sefini; x++ ) {
        const u = x / sefini, v = y / l6da;
        const wx = u + ( warpX(u * 0o4, v * 0o4) - 0o1/0o2 ) * 0o15/0o100;
        const wy = v + ( warpY(u * 0o4, v * 0o4) - 0o1/0o2 ) * 0o15/0o100;
        hawere[y * sefini + x] = bruo1(wx * 0o2, wy * 0o6) * 0o6/0o10
          + bruo2(wx * 0o4, wy * 0o14) * 0o3/0o10
          + bruo3(wx * 0o10, wy * 0o30) * 0o1/0o10;
      }
    }
    const havem2 = new Uint8Array(sefini * l6da);
    const hadoma = new Float32Array(sefini * l6da);
    const hah6kuni = new Float32Array(sefini * l6da);
    for ( let y = 0o0; y < l6da; y++ ) {
      for ( let x = 0o0; x < sefini; x++ ) {
        const i = y * sefini + x;
        const b = hawere[i] * havem2Kvanto;
        const niv = Math.floor(b);
        havem2[i] = niv;
// ⟨ ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟩
        const gx = ( hawere[y * sefini + Math.min(sefini - 0o1, x + 0o1)]
          - hawere[y * sefini + Math.max(0o0, x - 0o1)] ) / 0o2;
        const gy = ( hawere[Math.min(l6da - 0o1, y + 0o1) * sefini + x]
          - hawere[Math.max(0o0, y - 0o1) * sefini + x] ) / 0o2;
        const grad = Math.hypot(gx, gy) * havem2Kvanto;
        const frac = b - niv;
        hadoma[i] = frac;
        hah6kuni[i] = Math.min(frac, 0o1 - frac) / Math.max(grad, 0o1/0o10000);
      }
    }
    were = { havem2, hah6kuni, hadoma };
    skribiKampon(fluajKampoj, ca3aq, were);
  }
  const bildo = kuns2bana.createImageData(sefini, l6da);
  const vesefestaf = sefini / 0o400;
  const xaha = 0o1/0o2;
  for ( let vecax2lani = 0o0; vecax2lani < were.havem2.length; vecax2lani++ ) {
    const niv = were.havem2[vecax2lani];
    const banda = reliefo ? 0x808080 + Math.min(niv, 0o7) * 0x101010 : hunanuWeh2(weh2Cax2lo[0o0], niv);
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , 📃 ⟩
    const fono = banda + ( were.hadoma[vecax2lani] < 0o1/0o2 ? 0x080808 : -0x080808 );
    const kovro = Math.min(0o1, Math.max(0o0,
      ( were.hah6kuni[vecax2lani] - vesefestaf + xaha ) / ( 0o2 * xaha )));
    for ( let qar6xe = 0o0; qar6xe < 0o3; qar6xe++ ) {
      const santa = ( 0o2 - qar6xe ) * 0o10;
      const bv = ( banda >> santa ) & 0xff, fv = ( fono >> santa ) & 0xff;
      bildo.data[vecax2lani * 0o4 + qar6xe] = fv + ( bv - fv ) * kovro;
    }
    bildo.data[vecax2lani * 0o4 + 0o3] = 0xff;
  }
  kuns2bana.putImageData(bildo, 0o0, 0o0);
}

// ⟨ j͐ʃƽɜ , ſ͕ɭɜ ı],ᴜ ,
//   ſɭэ ᶗ‹ , ꞙɭɿ , 📃 ⟩
kf2Veb6qaiKs2bu();

export const hazard = ( a: number, b: number ): number => a + Math.random() * ( b - a );

export function k2fWrapan(kuns2bana: CanvasRenderingContext2D, s: number, qoxa: () => void): void {
  const sy = kuns2bana.canvas.height;
  for ( const dx of [ -s, 0o0, s ] ) {
    for ( const dy of [ -sy, 0o0, sy ] ) {
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
    const [ r, g, b ] = m[0o1].split(",");
    return veb6qaiCss(`rgba(${r.trim()},${g.trim()},${b.trim()},0)`);
  }
  const h = /^#([0-9a-f]{6})$/i.exec(weh2.trim());
  if ( h ) {
    const n = parseInt(h[0o1], 0o20);
    return veb6qaiCss(`rgba(${( n >> 0o20 ) & 0o377},${( n >> 0o10 ) & 0o377},${n & 0o377},0)`);
  }
  return "transparent";
}

export function larmo(k: CanvasRenderingContext2D, x: number, y: number, rad: number,
  ang: number, weh2: string): void {
  const tipX = x + Math.cos(ang) * rad * 0o22/0o10;
  const tipY = y + Math.sin(ang) * rad * 0o22/0o10;
  const b1 = ang + Math.PI / 0o2, b2 = ang - Math.PI / 0o2;
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

export function k2fVas2flofajnF2m2jn(kuns2bana: CanvasRenderingContext2D, s: number, l6da: number,
  n: number, weh2Cax2lo: string[], minimumo: number, amplekso: number,
  sakxo?: ( a: number, b: number ) => number): void {
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ ,
//   ſɭэ ſɭᴜ , ſɭᴜ ſןᴜ , 📃 ⟩
  const sukf2qi = sakxo ?? hazard;
  for ( let i = 0o0; i < n; i++ ) {
    const r = l6da * sukf2qi(minimumo, minimumo + amplekso);
    const x = sukf2qi(0o0, s), y = sukf2qi(0o0, l6da);
    const weh2 = weh2Cax2lo[i % weh2Cax2lo.length];
    k2fWrapan(kuns2bana, s, () => {
      const g = kuns2bana.createRadialGradient(x, y, 0o0, x, y, r);
      g.addColorStop(0o0, weh2);
      g.addColorStop(0o1, senAlfa(weh2));
      kuns2bana.fillStyle = g;
      kuns2bana.beginPath(); kuns2bana.arc(x, y, r, 0o0, Math.PI * 0o2); kuns2bana.fill();
    });
  }
}

export function p2somani(fn: () => THREE.CanvasTexture): () => THREE.CanvasTexture {
  let kaŝita: THREE.CanvasTexture | null = null;
  return () => ( kaŝita ??= fn() );
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ ,
//   ſɭэ ᶗ‹ , ꞙɭц ,
//   ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
const KAMPALIMO = 0o10;

function vefalKampon<K, V>(were: Map<K, V>, ca3aq: K): V | undefined {
  const skek2 = were.get(ca3aq);
  if ( skek2 === undefined ) return undefined;
  were.delete(ca3aq);
  were.set(ca3aq, skek2);
  return skek2;
}

function skribiKampon<K, V>(were: Map<K, V>, ca3aq: K, skek2: V): void {
  were.delete(ca3aq);
  were.set(ca3aq, skek2);
  while ( were.size > KAMPALIMO ) {
    const kmaH2y2k = were.keys().next();
    if ( kmaH2y2k.done ) break;
    were.delete(kmaH2y2k.value);
  }
}

// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
//   ſɭᴜ ſןᴜ , ꞙɭɿ ,
//   ſ͕ɭɜ ı],ᴜ , ꞙɭц ,
//   ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
export function fu36Cac2sexnWerejn(): void {
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɩ ,
//   ſɭᴜ ſןᴜ , ꞙɭꞟ , 📃 ⟩
  konturajKampoj.clear();
  fluajKampoj.clear();
}

export function kf2P2t6zoCac2sex(w: number, h: number,
  pentri: ( k: CanvasRenderingContext2D ) => void,
  ripeto: [ number, number ] = [ 0o1, 0o1 ],
  haku1o: { g2b2?: THREE.Wrapping; sRGB?: boolean; anisotropio?: number } = {}
): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = w; kanvasa.height = h;
  const kuns2bana = kanvasa.getContext("2d")!;
  pentri(kuns2bana);
  const cac2sex = new THREE.CanvasTexture(kanvasa);
  if ( haku1o.sRGB !== false ) cac2sex.colorSpace = THREE.SRGBColorSpace;
  cac2sex.wrapS = cac2sex.wrapT = haku1o.g2b2 ?? THREE.RepeatWrapping;
  cac2sex.repeat.set(ripeto[0o0], ripeto[0o1]);
  if ( haku1o.anisotropio ) cac2sex.anisotropy = haku1o.anisotropio;
  return cac2sex;
}

export function neregulaQoxa(k: CanvasRenderingContext2D, fx: number, fy: number, r0: number, hax6mi: number, sago: number, xafanitapu: number): void {
  k.beginPath();
  for ( let i = 0o0; i <= 0o40; i++ ) {
    const a = i / 0o40 * Math.PI * 0o2;
    const r = r0 * ( 0o1 + sago * Math.sin(a * hax6mi + xafanitapu) + sago * 0o5/0o10 * Math.sin(a * hax6mi * 0o2 + xafanitapu * 0o3 + 0o1) );
    const x = fx + Math.cos(a) * r, y = fy + Math.sin(a) * r;
    if ( i === 0o0 ) k.moveTo(x, y); else k.lineTo(x, y);
  }
  k.closePath();
}

// ⟪ ſɭᴜ ſןᴜ , 🖌️ ⟫
// ⟨ ſɭɜ ſɭᴜ , ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
//   ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , 📃 ⟩

export interface KristalaQoxa {
  x: number; y: number; tafkaq: number; rx: number; ry: number; hakekuxa: number[];
}

/* ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
    @param k ( CanvasRenderingContext2D ) - ſɭɹʞ ｡
    @param s ( number ) - j͑ʃɔ ſȷꞇ }ʃꞇ ｡ j͑ʃɜ ſɭ,ᴜ ｡
    @param kris ( KristalaQoxa ) - j͑ʃэ ɭl̀э ｡ j͑ʃɜ ſɭ,ᴜ ｡
    @param pentri ( ( k ) => void ) - fill ｡ stroke ｡ */
export function k2fWrapanKristalon(k: CanvasRenderingContext2D, s: number,
  kris: KristalaQoxa, pentri: ( k: CanvasRenderingContext2D ) => void): void {
  k2fWrapan(k, s, () => {
    k.save();
    k.translate(kris.x, kris.y);
    k.rotate(kris.tafkaq);
    k.beginPath();
    for ( let v = 0o0; v < kris.hakekuxa.length; v++ ) {
      const a = ( v / kris.hakekuxa.length ) * Math.PI * 0o2;
      const r = kris.hakekuxa[v];
      const px = Math.cos(a) * kris.rx * r;
      const py = Math.sin(a) * kris.ry * r;
      if ( v === 0o0 ) k.moveTo(px, py); else k.lineTo(px, py);
    }
    k.closePath();
    pentri(k);
    k.restore();
  });
}

/* ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
    @param k ( CanvasRenderingContext2D ) - ſɭɹʞ ｡
    @param s ( number ) - j͑ʃɔ ſȷꞇ }ʃꞇ ｡
    @param n ( number ) - }ʃɹƽ ｡ j͑ʃ'ɔ ſɭɹ ſȷɔ ｡
    @param pxeutso ( ( i ) => [ x , y , wd , hd , weh2 ] ) - ſɟwƽ ｡ j͑ʃ'ɔ ſɭɹ ſȷɔ ｡ */
export function k2fVas2flofajnXet7jn(k: CanvasRenderingContext2D, s: number, n: number,
  pxeutso: ( i: number ) => [ number, number, number, number, string ]): void {
  for ( let i = 0o0; i < n; i++ ) {
    const [ x, y, wd, hd, weh2 ] = pxeutso(i);
    k2fWrapan(k, s, () => {
      k.fillStyle = weh2;
      k.fillRect(x, y, wd, hd);
    });
  }
}

/* ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
    @param k ( CanvasRenderingContext2D ) - ſɭɹʞ ｡
    @param n2k ( [ number , number ][] ) - ꞁȷ̀ɹ ꞁȷ̀ᴜȝ ｡ */
export function k2fFendanK6h6n(k: CanvasRenderingContext2D, n2k: [ number, number ][]): void {
  k.beginPath();
  k.moveTo(n2k[0o0][0o0], n2k[0o0][0o1]);
  for ( let i = 0o1; i < n2k.length; i++ ) {
    k.lineTo(n2k[i][0o0], n2k[i][0o1]);
  }
}

/* ſᶘᴜ j͑ʃᴜ , ꞙɭэ ,
    @param k ( CanvasRenderingContext2D ) - ſɭɹʞ ｡
    @param sahakani,sefini ( number ) - j͑ʃɜ ſɭ,ᴜ ｡ j͑ʃɔ ſȷꞇ }ʃꞇ ｡ */
export function k2fSlafK6h6n(k: CanvasRenderingContext2D, sahakani: number, sefini: number): void {
  k.beginPath();
  k.moveTo(-sahakani, 0o0);
  k.quadraticCurveTo(0o0, -sefini, sahakani, 0o0);
  k.quadraticCurveTo(0o0, sefini, -sahakani, 0o0);
}
