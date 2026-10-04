// ≺⧼ ជំនួយវាយនភាពរួម 🖌️ ⧽≻
import * as THREE from "three";

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
    return `rgba(${r.trim()},${g.trim()},${b.trim()},0)`;
  }
  const h = /^#([0-9a-f]{6})$/i.exec(koloro.trim());
  if ( h ) {
    const n = parseInt(h[1], 0o20);
    return `rgba(${( n >> 0o20 ) & 0o377},${( n >> 0o10 ) & 0o377},${n & 0o377},0)`;
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
  const elekti = hazardo ?? Math.random;
  for ( let i = 0; i < n; i++ ) {
    const r = alto * ( minimumo + Math.random() * amplekso );
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
