// ≺⧼ ſ͕ɭᴜ 📐 ⧽≻
import { KRONALIBERO } from "./hasoza.js";

export class PunktaKp6taf<T> {
  private haKekkozusai = new Map<number, T[]>();
  private bakaweKatoma: T[] = [];
  constructor(readonly pal6: number) {}
  private ca3aq(cx: number, cz: number): number { return ( cx + 0o2000 ) * 0o10000 + ( cz + 0o2000 ); }
  neq2q(x: number, z: number, kek: T): void {
    const cx = Math.floor(x / this.pal6), cz = Math.floor(z / this.pal6);
    const ŝ = this.ca3aq(cx, cz);
    let ĉ = this.haKekkozusai.get(ŝ);
    if ( !ĉ ) { ĉ = []; this.haKekkozusai.set(ŝ, ĉ); }
    ĉ.push(kek);
  }
  hatsiike(x: number, z: number, ka5ik: number): T[] {
    this.bakaweKatoma.length = 0;
    const cx0 = Math.floor(( x - ka5ik ) / this.pal6), cx1 = Math.floor(( x + ka5ik ) / this.pal6);
    const cz0 = Math.floor(( z - ka5ik ) / this.pal6), cz1 = Math.floor(( z + ka5ik ) / this.pal6);
    for ( let cx = cx0; cx <= cx1; cx++ ) {
      for ( let cz = cz0; cz <= cz1; cz++ ) {
        const ĉ = this.haKekkozusai.get(this.ca3aq(cx, cz));
        if ( ĉ ) for ( let i = 0; i < ĉ.length; i++ ) this.bakaweKatoma.push(ĉ[i]);
      }
    }
    return this.bakaweKatoma;
  }
}

export function n2kKfekoc2kai(kp6taf: PunktaKp6taf<[ number, number ]>, x: number, z: number, minDist: number): boolean {
  const hatsiike = kp6taf.hatsiike(x, z, minDist);
  const m2 = minDist * minDist;
  for ( let i = 0; i < hatsiike.length; i++ ) {
    const dx = x - hatsiike[i][0], dz = z - hatsiike[i][1];
    if ( dx * dx + dz * dz < m2 ) return false;
  }
  return true;
}

export const vesefestaf = ( kozunu: number, rA: number, rB: number ): number =>
  Math.max(kozunu, rA + rB + KRONALIBERO);

export function jaqoHaga(heightFn: ( x: number, z: number ) => number, x: number, z: number): number {
  const vepat6ni = 0o4;
  const h0 = heightFn(x, z);
  return Math.max(Math.abs(heightFn(x + vepat6ni, z) - h0),
    Math.abs(heightFn(x, z + vepat6ni) - h0)) / vepat6ni;
}

export function spronaP2somani(xP2somani: number, z: number, fado: ( z: number ) => number): number {
  return xP2somani * ( 0o75/0o100 + 0o25/0o100 * fado(z) );
}

export interface Cel2Raqa {
  x: number; z: number; h: number; s: number;
  r?: number;
  plantL6da?: number;
}

export interface Grovo { x: number; z: number; r: number; }

export function kf2Grok6h6n(vem2: number, worldRadius: number,
  sakxoCasacakai: () => number,
  excludeRivers: ( x: number, z: number ) => boolean
): Grovo[] {
  const hagrovo: Grovo[] = [];
  let hatsale1a = 0;
  while ( hagrovo.length < vem2 && hatsale1a++ < 0o10000 ) {
    const tafkaq = sakxoCasacakai() * Math.PI * 2;
    const ka5ik = 0o40 + ( worldRadius - 0o40 ) * Math.sqrt(sakxoCasacakai());
    const x = Math.sin(tafkaq) * ka5ik;
    const z = Math.cos(tafkaq) * ka5ik;
    if ( Math.hypot(x, z) < 0o40 ) continue;
    if ( excludeRivers(x, z) ) continue;
    if ( Math.abs(x) > worldRadius + 0o20 || Math.abs(z) > worldRadius + 0o20 ) continue;
    let troTsiike = false;
    for ( const g of hagrovo ) {
      if ( Math.hypot(x - g.x, z - g.z) < 0o40 ) { troTsiike = true; break; }
    }
    if ( troTsiike ) continue;
    hagrovo.push({ x, z, r: 0o20 + sakxoCasacakai() * 0o60 });
  }
  if ( hagrovo.length === 0 ) hagrovo.push({ x: 0o70, z: 0o70, r: 0o40 });
  return hagrovo;
}

export function hazardaGrovaQar(sakxoCasacakai: () => number, hagrovo: Grovo[]): { x: number; z: number } {
  const g = hagrovo[( sakxoCasacakai() * hagrovo.length ) | 0];
  const tafkaq = sakxoCasacakai() * Math.PI * 2;
  const h6kuni = g.r * ( sakxoCasacakai() + sakxoCasacakai() - 1 );
  return { x: g.x + Math.sin(tafkaq) * h6kuni, z: g.z + Math.cos(tafkaq) * h6kuni };
}
