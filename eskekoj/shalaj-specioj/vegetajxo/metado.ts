// ≺⧼ ការដាក់ 📐 ⧽≻
import { KRONA_LIBERO } from "./kronoj.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";

export class PunktaHasho<T> {
  private ĉeloj = new Map<number, T[]>();
  private bufro: T[] = [];
  constructor(readonly grandeco: number) {}
  private ŝlosilo(cx: number, cz: number): number { return ( cx + 0o2000 ) * 0o10000 + ( cz + 0o2000 ); }
  meti(x: number, z: number, ero: T): void {
    const cx = Math.floor(x / this.grandeco), cz = Math.floor(z / this.grandeco);
    const ŝ = this.ŝlosilo(cx, cz);
    let ĉ = this.ĉeloj.get(ŝ);
    if ( !ĉ ) { ĉ = []; this.ĉeloj.set(ŝ, ĉ); }
    ĉ.push(ero);
  }
  najbaroj(x: number, z: number, radiuso: number): T[] {
    this.bufro.length = 0;
    const cx0 = Math.floor(( x - radiuso ) / this.grandeco), cx1 = Math.floor(( x + radiuso ) / this.grandeco);
    const cz0 = Math.floor(( z - radiuso ) / this.grandeco), cz1 = Math.floor(( z + radiuso ) / this.grandeco);
    for ( let cx = cx0; cx <= cx1; cx++ ) {
      for ( let cz = cz0; cz <= cz1; cz++ ) {
        const ĉ = this.ĉeloj.get(this.ŝlosilo(cx, cz));
        if ( ĉ ) for ( let i = 0; i < ĉ.length; i++ ) this.bufro.push(ĉ[i]);
      }
    }
    return this.bufro;
  }
}

export function punktoLibera(hasho: PunktaHasho<[ number, number ]>, x: number, z: number, minDist: number): boolean {
  const najbaroj = hasho.najbaroj(x, z, minDist);
  const m2 = minDist * minDist;
  for ( let i = 0; i < najbaroj.length; i++ ) {
    const dx = x - najbaroj[i][0], dz = z - najbaroj[i][1];
    if ( dx * dx + dz * dz < m2 ) return false;
  }
  return true;
}

export const interspaco = ( baza: number, rA: number, rB: number ): number =>
  Math.max(baza, rA + rB + KRONA_LIBERO);

export function montaKruteco(heightFn: ( x: number, z: number ) => number, x: number, z: number): number {
  const paso = 0o4;
  const h0 = heightFn(x, z);
  return Math.max(Math.abs(heightFn(x + paso, z) - h0),
    Math.abs(heightFn(x, z + paso) - h0)) / paso;
}

export function spronaDuono(xDuono: number, z: number, fado: ( z: number ) => number): number {
  return xDuono * ( 0o75/0o100 + 0o25/0o100 * fado(z) );
}

export interface ArboMetado {
  x: number; z: number; h: number; s: number;
  r?: number;
  plantAlto?: number;
}

export interface Grovo { x: number; z: number; r: number; }

export function kreiGrovojn(kvanto: number, worldRadius: number,
  hazardaGenerilo: () => number,
  excludeRivers: ( x: number, z: number ) => boolean
): Grovo[] {
  const grovoj: Grovo[] = [];
  let provoj = 0;
  while ( grovoj.length < kvanto && provoj++ < 0o10000 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    const radiuso = 0o40 + ( worldRadius - 0o40 ) * Math.sqrt(hazardaGenerilo());
    const x = Math.sin(angulo) * radiuso;
    const z = Math.cos(angulo) * radiuso;
    if ( Math.hypot(x, z) < 0o40 ) continue;
    if ( excludeRivers(x, z) ) continue;
    if ( Math.abs(x) > worldRadius + 0o20 || Math.abs(z) > worldRadius + 0o20 ) continue;
    let troProksima = false;
    for ( const g of grovoj ) {
      if ( Math.hypot(x - g.x, z - g.z) < 0o40 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    grovoj.push({ x, z, r: 0o20 + hazardaGenerilo() * 0o60 });
  }
  if ( grovoj.length === 0 ) grovoj.push({ x: 0o70, z: 0o70, r: 0o40 });
  return grovoj;
}

export function kreiArbarerojn(kvanto: number, worldRadius: number,
  excludeRivers: ( x: number, z: number ) => boolean,
  semo = 0o53104
): Grovo[] {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
  return kreiGrovojn(kvanto, worldRadius, hazardaGenerilo, excludeRivers);
}

export function hazardaGrovaLoko(hazardaGenerilo: () => number, grovoj: Grovo[]): { x: number; z: number } {
  const g = grovoj[( hazardaGenerilo() * grovoj.length ) | 0];
  const angulo = hazardaGenerilo() * Math.PI * 2;
  const disto = g.r * ( hazardaGenerilo() + hazardaGenerilo() - 1 );
  return { x: g.x + Math.sin(angulo) * disto, z: g.z + Math.cos(angulo) * disto };
}
