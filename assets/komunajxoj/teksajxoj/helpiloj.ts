// ≺⧼ Komunaj teksturaj helpiloj 🖌️ ⧽≻
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
    const n = parseInt(h[1], 16);
    return `rgba(${( n >> 16 ) & 255},${( n >> 8 ) & 255},${n & 255},0)`;
  }
  return "transparent";
}

export function ombro(koloro: number, n = 0o1, alfa = 1): string {
  const kanalo = ( sovo: number ): number =>
    Math.max(0, ( ( koloro >> sovo ) & 0xff ) - n * 0x10);
  return `rgba(${kanalo(0o20)},${kanalo(0o10)},${kanalo(0)},${alfa})`;
}

export function helo(koloro: number, n = 0o1, alfa = 1): string {
  const kanalo = ( sovo: number ): number =>
    Math.min(0xf8, ( ( koloro >> sovo ) & 0xff ) + n * 0x10);
  return `rgba(${kanalo(0o20)},${kanalo(0o10)},${kanalo(0)},${alfa})`;
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
