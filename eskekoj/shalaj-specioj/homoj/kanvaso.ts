// ≺⧼ ជំនួយផ្ទាំងគំនូរ 🖌️ ⧽≻
import { ombro, helo } from "../../komunajxoj/koloroj.js";

// ⟪ ជំនួយផ្ទាំងគំនូរ 🖌️ ⟫

export function volviX(k: CanvasRenderingContext2D, formo: () => void): void {
  const s = k.canvas.width;
  for ( const dx of [ -s, 0, s ] ) {
    k.save();
    k.translate(dx, 0);
    formo();
    k.restore();
  }
}

export function sxtofon(k: CanvasRenderingContext2D, bazo: number): void {
  const w = k.canvas.width, h = k.canvas.height;
  // ⟨ ការត្បាញទន់ 📃 ⟩
  const paso = 0o10, fadeno = 0o2;
  k.globalAlpha = 0o1/0o4;
  for ( let i = 0; i < w; i += paso ) {
    k.fillStyle = ( i / paso ) % 0o2 ? helo(bazo, 0o1) : ombro(bazo, 0o1);
    k.fillRect(i, 0, fadeno, h);
  }
  k.globalAlpha = 0o1/0o2;
  for ( let i = 0; i < h; i += paso ) {
    k.fillStyle = ( i / paso ) % 0o2 ? ombro(bazo, 0o1) : helo(bazo, 0o1);
    k.fillRect(0, i, w, fadeno);
  }
  k.globalAlpha = 0o1;
  for ( let i = 0; i < 0o30; i++ ) {
    const r = h * ( 0o10/0o100 + Math.random() * 0o30/0o100 );
    const x = Math.random() * w, y = Math.random() * h;
    const plena = i % 0o3 ? ombro(bazo, 0o1, 0o5/0o100) : helo(bazo, 0o1, 0o5/0o100);
    const nula = i % 0o3 ? ombro(bazo, 0o1, 0) : helo(bazo, 0o1, 0);
    volviX(k, () => {
      const g = k.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, plena);
      g.addColorStop(1, nula);
      k.fillStyle = g;
      k.beginPath(); k.arc(x, y, r, 0, Math.PI * 0o2); k.fill();
    });
  }
}

export function faldo(k: CanvasRenderingContext2D, x: number, largho: number, bazo: number,
  n: number, alfa: number): void {
  const plena = ombro(bazo, n, alfa), nula = ombro(bazo, n, 0);
  volviX(k, () => {
    const g = k.createLinearGradient(x - largho, 0, x + largho, 0);
    g.addColorStop(0, nula);
    g.addColorStop(0o1/0o2, plena);
    g.addColorStop(1, nula);
    k.fillStyle = g;
    k.fillRect(x - largho, 0, largho * 0o2, k.canvas.height);
  });
}

export function stebo(k: CanvasRenderingContext2D, punktoj: [ number, number ][], koloro: string,
  dikeco = 0o1): void {
  k.strokeStyle = koloro;
  k.lineWidth = dikeco;
  k.setLineDash([ 0o2, 0o3 ]);
  k.beginPath();
  for ( let i = 0; i < punktoj.length; i++ ) {
    if ( i === 0 ) k.moveTo(punktoj[i][0], punktoj[i][1]);
    else k.lineTo(punktoj[i][0], punktoj[i][1]);
  }
  k.stroke();
  k.setLineDash([]);
}

export function bordiKurbon(k: CanvasRenderingContext2D, punktoj: [ number, number ][],
  koloro: string, dikeco: number): void {
  k.strokeStyle = koloro;
  k.lineWidth = dikeco;
  k.lineJoin = "round";
  k.beginPath();
  for ( let i = 0; i < punktoj.length; i++ ) {
    if ( i === 0 ) k.moveTo(punktoj[i][0], punktoj[i][1]);
    else k.lineTo(punktoj[i][0], punktoj[i][1]);
  }
  k.stroke();
}

export function rondaRombo(k: CanvasRenderingContext2D, x: number, y: number, w: number,
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
