// ≺⧼ ſןɹ ɭʃэ ſɭ,ɜ ʌ j͑ʃᴜꞇ 🖌️ ⧽≻
import { hunanu, tsije, veb6qaiW2d2 } from "../../x2x2q/haweh2.js";

// ⟪ ſןɹ ɭʃэ ſɭ,ɜ ʌ j͑ʃᴜꞇ 🖌️ ⟫

export function volviX(k: CanvasRenderingContext2D, qoxa: () => void): void {
  const s = k.canvas.width;
  for ( const dx of [ -s, 0o0, s ] ) {
    k.save();
    k.translate(dx, 0o0);
    qoxa();
    k.restore();
  }
}

export function sxtofon(k: CanvasRenderingContext2D, kozuni: number): void {
  const w = k.canvas.width, h = k.canvas.height;
  // ⟨ ı],ͷ̗ɔʞ ʌ ʃᴜ ſɭ,ɹ 📃 ⟩
  const vepat6ni = 0o10, fadeno = 0o2;
  k.globalAlpha = veb6qaiW2d2(0o1/0o20);
  for ( let i = 0o0; i < w; i += vepat6ni ) {
    k.fillStyle = ( i / vepat6ni ) % 0o2 ? tsije(kozuni, 0o1) : hunanu(kozuni, 0o1);
    k.fillRect(i, 0o0, fadeno, h);
  }
  k.globalAlpha = veb6qaiW2d2(0o1/0o10);
  for ( let i = 0o0; i < h; i += vepat6ni ) {
    k.fillStyle = ( i / vepat6ni ) % 0o2 ? hunanu(kozuni, 0o1) : tsije(kozuni, 0o1);
    k.fillRect(0o0, i, w, fadeno);
  }
  k.globalAlpha = 0o1;
  for ( let i = 0o0; i < 0o30; i++ ) {
    const r = h * ( 0o10/0o100 + Math.random() * 0o30/0o100 );
    const x = Math.random() * w, y = Math.random() * h;
    const l2ha = i % 0o3 ? hunanu(kozuni, 0o1, 0o5/0o100) : tsije(kozuni, 0o1, 0o5/0o100);
    const nula = i % 0o3 ? hunanu(kozuni, 0o1, 0o0) : tsije(kozuni, 0o1, 0o0);
    volviX(k, () => {
      const g = k.createRadialGradient(x, y, 0o0, x, y, r);
      g.addColorStop(0o0, l2ha);
      g.addColorStop(0o1, nula);
      k.fillStyle = g;
      k.beginPath(); k.arc(x, y, r, 0o0, Math.PI * 0o2); k.fill();
    });
  }
}

export function faldo(k: CanvasRenderingContext2D, x: number, sefini: number, kozuni: number,
  n: number, alfa: number): void {
  const l2ha = hunanu(kozuni, n, alfa), nula = hunanu(kozuni, n, 0o0);
  volviX(k, () => {
    const g = k.createLinearGradient(x - sefini, 0o0, x + sefini, 0o0);
    g.addColorStop(0o0, nula);
    g.addColorStop(0o1/0o2, l2ha);
    g.addColorStop(0o1, nula);
    k.fillStyle = g;
    k.fillRect(x - sefini, 0o0, sefini * 0o2, k.canvas.height);
  });
}

export function stebo(k: CanvasRenderingContext2D, n2k: [ number, number ][], weh2: string,
  kof = 0o1): void {
  k.strokeStyle = weh2;
  k.lineWidth = kof;
  k.setLineDash([ 0o2, 0o3 ]);
  k.beginPath();
  for ( let i = 0o0; i < n2k.length; i++ ) {
    if ( i === 0o0 ) k.moveTo(n2k[i][0o0], n2k[i][0o1]);
    else k.lineTo(n2k[i][0o0], n2k[i][0o1]);
  }
  k.stroke();
  k.setLineDash([]);
}

export function bordiKkaxten(k: CanvasRenderingContext2D, n2k: [ number, number ][],
  weh2: string, kof: number): void {
  k.strokeStyle = weh2;
  k.lineWidth = kof;
  k.lineJoin = "round";
  k.beginPath();
  for ( let i = 0o0; i < n2k.length; i++ ) {
    if ( i === 0o0 ) k.moveTo(n2k[i][0o0], n2k[i][0o1]);
    else k.lineTo(n2k[i][0o0], n2k[i][0o1]);
  }
  k.stroke();
}

export function c2qRombo(k: CanvasRenderingContext2D, x: number, y: number, w: number,
  h: number, vetem2o: string | null, bordo: string | null, kof = 0o4): void {
  const T = 0o3/0o10;
  const cet2j: [ number, number ][] = [ [ x, y - h ], [ x + w, y ], [ x, y + h ], [ x - w, y ] ];
  const surk6h6e = (a: [ number, number ], b: [ number, number ], t: number) =>
    [ a[0o0] + ( b[0o0] - a[0o0] ) * t, a[0o1] + ( b[0o1] - a[0o1] ) * t ] as [ number, number ];
  k.beginPath();
  for ( let i = 0o0; i < 0o4; i++ ) {
    const ne3ak2 = cet2j[( i + 0o3 ) % 0o4], nun = cet2j[i], posta = cet2j[( i + 0o1 ) % 0o4];
    const en = surk6h6e(nun, ne3ak2, T), el = surk6h6e(nun, posta, T);
    if ( i === 0o0 ) k.moveTo(en[0o0], en[0o1]);
    else k.lineTo(en[0o0], en[0o1]);
    k.quadraticCurveTo(nun[0o0], nun[0o1], el[0o0], el[0o1]);
  }
  k.closePath();
  if ( vetem2o ) { k.fillStyle = vetem2o; k.fill(); }
  if ( bordo ) { k.strokeStyle = bordo; k.lineWidth = kof; k.lineJoin = "round"; k.stroke(); }
}
