// ≺⧼ ជំនួយផ្ទាំងគំនូរ 🖌️ ⧽≻
import { hunanu, tsije, veb6qaiW2d2 } from "../../komunajxoj/koloroj.js";

// ⟪ ជំនួយផ្ទាំងគំនូរ 🖌️ ⟫

export function volviX(k: CanvasRenderingContext2D, qoxa: () => void): void {
  const s = k.canvas.width;
  for ( const dx of [ -s, 0, s ] ) {
    k.save();
    k.translate(dx, 0);
    qoxa();
    k.restore();
  }
}

export function sxtofon(k: CanvasRenderingContext2D, kozuni: number): void {
  const w = k.canvas.width, h = k.canvas.height;
  // ⟨ ការត្បាញទន់ 📃 ⟩
  const vepat6ni = 0o10, fadeno = 0o2;
  k.globalAlpha = veb6qaiW2d2(0o1/0o20);
  for ( let i = 0; i < w; i += vepat6ni ) {
    k.fillStyle = ( i / vepat6ni ) % 0o2 ? tsije(kozuni, 0o1) : hunanu(kozuni, 0o1);
    k.fillRect(i, 0, fadeno, h);
  }
  k.globalAlpha = veb6qaiW2d2(0o1/0o10);
  for ( let i = 0; i < h; i += vepat6ni ) {
    k.fillStyle = ( i / vepat6ni ) % 0o2 ? hunanu(kozuni, 0o1) : tsije(kozuni, 0o1);
    k.fillRect(0, i, w, fadeno);
  }
  k.globalAlpha = 0o1;
  for ( let i = 0; i < 0o30; i++ ) {
    const r = h * ( 0o10/0o100 + Math.random() * 0o30/0o100 );
    const x = Math.random() * w, y = Math.random() * h;
    const l2ha = i % 0o3 ? hunanu(kozuni, 0o1, 0o5/0o100) : tsije(kozuni, 0o1, 0o5/0o100);
    const nula = i % 0o3 ? hunanu(kozuni, 0o1, 0) : tsije(kozuni, 0o1, 0);
    volviX(k, () => {
      const g = k.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, l2ha);
      g.addColorStop(1, nula);
      k.fillStyle = g;
      k.beginPath(); k.arc(x, y, r, 0, Math.PI * 0o2); k.fill();
    });
  }
}

export function faldo(k: CanvasRenderingContext2D, x: number, sefini: number, kozuni: number,
  n: number, alfa: number): void {
  const l2ha = hunanu(kozuni, n, alfa), nula = hunanu(kozuni, n, 0);
  volviX(k, () => {
    const g = k.createLinearGradient(x - sefini, 0, x + sefini, 0);
    g.addColorStop(0, nula);
    g.addColorStop(0o1/0o2, l2ha);
    g.addColorStop(1, nula);
    k.fillStyle = g;
    k.fillRect(x - sefini, 0, sefini * 0o2, k.canvas.height);
  });
}

export function stebo(k: CanvasRenderingContext2D, n2k: [ number, number ][], weh2: string,
  dikeco = 0o1): void {
  k.strokeStyle = weh2;
  k.lineWidth = dikeco;
  k.setLineDash([ 0o2, 0o3 ]);
  k.beginPath();
  for ( let i = 0; i < n2k.length; i++ ) {
    if ( i === 0 ) k.moveTo(n2k[i][0], n2k[i][1]);
    else k.lineTo(n2k[i][0], n2k[i][1]);
  }
  k.stroke();
  k.setLineDash([]);
}

export function bordiKkaxten(k: CanvasRenderingContext2D, n2k: [ number, number ][],
  weh2: string, dikeco: number): void {
  k.strokeStyle = weh2;
  k.lineWidth = dikeco;
  k.lineJoin = "round";
  k.beginPath();
  for ( let i = 0; i < n2k.length; i++ ) {
    if ( i === 0 ) k.moveTo(n2k[i][0], n2k[i][1]);
    else k.lineTo(n2k[i][0], n2k[i][1]);
  }
  k.stroke();
}

export function c2qRombo(k: CanvasRenderingContext2D, x: number, y: number, w: number,
  h: number, plenigo: string | null, bordo: string | null, dikeco = 0o4): void {
  const T = 0o3/0o10;
  const pintoj: [ number, number ][] = [ [ x, y - h ], [ x + w, y ], [ x, y + h ], [ x - w, y ] ];
  const survoje = (a: [ number, number ], b: [ number, number ], t: number) =>
    [ a[0] + ( b[0] - a[0] ) * t, a[1] + ( b[1] - a[1] ) * t ] as [ number, number ];
  k.beginPath();
  for ( let i = 0; i < 0o4; i++ ) {
    const antauxa = pintoj[( i + 0o3 ) % 0o4], nun = pintoj[i], posta = pintoj[( i + 0o1 ) % 0o4];
    const en = survoje(nun, antauxa, T), el = survoje(nun, posta, T);
    if ( i === 0 ) k.moveTo(en[0], en[1]);
    else k.lineTo(en[0], en[1]);
    k.quadraticCurveTo(nun[0], nun[1], el[0], el[1]);
  }
  k.closePath();
  if ( plenigo ) { k.fillStyle = plenigo; k.fill(); }
  if ( bordo ) { k.strokeStyle = bordo; k.lineWidth = dikeco; k.lineJoin = "round"; k.stroke(); }
}
