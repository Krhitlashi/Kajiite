// ≺⧼ ſ͕ɭᴜ 📐 ⧽≻
import { KRONA_LIBERO } from "./hasoza.js";

export class PunktaHasho<T> {
  private haKekkozusai = new Map<number, T[]>();
  private bakaweKatoma: T[] = [];
  constructor(readonly grandeco: number) {}
  private ca3aq(cx: number, cz: number): number { return ( cx + 0o2000 ) * 0o10000 + ( cz + 0o2000 ); }
  meti(x: number, z: number, ero: T): void {
    const cx = Math.floor(x / this.grandeco), cz = Math.floor(z / this.grandeco);
    const ŝ = this.ca3aq(cx, cz);
    let ĉ = this.haKekkozusai.get(ŝ);
    if ( !ĉ ) { ĉ = []; this.haKekkozusai.set(ŝ, ĉ); }
    ĉ.push(ero);
  }
  najbaroj(x: number, z: number, ka5ik: number): T[] {
    this.bakaweKatoma.length = 0;
    const cx0 = Math.floor(( x - ka5ik ) / this.grandeco), cx1 = Math.floor(( x + ka5ik ) / this.grandeco);
    const cz0 = Math.floor(( z - ka5ik ) / this.grandeco), cz1 = Math.floor(( z + ka5ik ) / this.grandeco);
    for ( let cx = cx0; cx <= cx1; cx++ ) {
      for ( let cz = cz0; cz <= cz1; cz++ ) {
        const ĉ = this.haKekkozusai.get(this.ca3aq(cx, cz));
        if ( ĉ ) for ( let i = 0; i < ĉ.length; i++ ) this.bakaweKatoma.push(ĉ[i]);
      }
    }
    return this.bakaweKatoma;
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
  const vepat6ni = 0o4;
  const h0 = heightFn(x, z);
  return Math.max(Math.abs(heightFn(x + vepat6ni, z) - h0),
    Math.abs(heightFn(x, z + vepat6ni) - h0)) / vepat6ni;
}

export function spronaDuono(xDuono: number, z: number, fado: ( z: number ) => number): number {
  return xDuono * ( 0o75/0o100 + 0o25/0o100 * fado(z) );
}

export interface ArboRaqa {
  x: number; z: number; h: number; s: number;
  r?: number;
  plantAlto?: number;
}

export interface Grovo { x: number; z: number; r: number; }

export function kf2Grovojn(vem2: number, worldRadius: number,
  hazardaGenerilo: () => number,
  excludeRivers: ( x: number, z: number ) => boolean
): Grovo[] {
  const grovoj: Grovo[] = [];
  let provoj = 0;
  while ( grovoj.length < vem2 && provoj++ < 0o10000 ) {
    const tafkaq = hazardaGenerilo() * Math.PI * 2;
    const ka5ik = 0o40 + ( worldRadius - 0o40 ) * Math.sqrt(hazardaGenerilo());
    const x = Math.sin(tafkaq) * ka5ik;
    const z = Math.cos(tafkaq) * ka5ik;
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

export function hazardaGrovaLoko(hazardaGenerilo: () => number, grovoj: Grovo[]): { x: number; z: number } {
  const g = grovoj[( hazardaGenerilo() * grovoj.length ) | 0];
  const tafkaq = hazardaGenerilo() * Math.PI * 2;
  const h6kuni = g.r * ( hazardaGenerilo() + hazardaGenerilo() - 1 );
  return { x: g.x + Math.sin(tafkaq) * h6kuni, z: g.z + Math.cos(tafkaq) * h6kuni };
}
