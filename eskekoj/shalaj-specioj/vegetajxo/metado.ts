// ≺⧼ Metado 📐 ⧽≻
// La metaj iloj de la plantoj — la spaca haŝo-krado de la jam metitaj punktoj,
// la interspacaj decidoj ( ĉu loko estas libera, kiom da spaco inter du kronoj,
// kiom kruta la deklivo, kiom larĝa la sprona silueto ) kaj la arbareroj, ĉirkaŭ
// kiuj la arboj kaj la plantoj klasteriĝas.
//
// La funkcioj de la SPECIA metado ( metiArbojn, metiPussxlefojn ktp ) vivas
// apud siaj konstruiloj; ĉi tie restas nur la komuna ilaro, kiun ili kunhavas.
import { KRONA_LIBERO } from "./kronoj.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";

// PunktaHasho — eta spaca haŝo-krado por la metaj bukloj. La minimumajn
// distancojn antaŭe kontrolis lineara skanado de ĉiuj jam metitaj punktoj
// ( O(n²) tra miloj da lokoj kaj dek miloj da provoj ) — la samaj demandoj
// estas O(1) po ĉelo ĉi tie. La eroj estas generikaj ( [x,z] tufoj aŭ
// ArboMetado ) kaj la demandobufro reuziĝas — neniu asigno po provo.
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
  // najbaroj — ĉiuj eroj en la ĉeloj, kiujn la disko de `radiuso` ĉirkaŭ
  // ( x, z ) tuŝas. Ĉiu punkto ene de la radiuso kuŝas en unu el ĉi tiuj
  // ĉeloj ( la gamo estas la ekzacta floor-intervalo — la konservativa
  // supertavolo en ĉelaj termoj ). Revenas la INTERNAN bufron — konsumu ĝin
  // antaŭ la sekva voko ( la ĉi tieaj bukloj faras tion: skani, decidi, daŭrigi ).
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

// punktoLibera — la simpla interspaco-demando super [ x, z ]-tufo-hasho:
// ĉu neniu metita punkto kuŝas ene de `minDist` de ( x, z )? La sama decido
// kiel la malnova lineara skanado ( Math.hypot → kvadrata komparo — la sama
// rezulto sen la hipot-kosto ), per ĉelaj demandoj anstataŭ O(n).
export function punktoLibera(hasho: PunktaHasho<[ number, number ]>, x: number, z: number, minDist: number): boolean {
  const najbaroj = hasho.najbaroj(x, z, minDist);
  const m2 = minDist * minDist;
  for ( let i = 0; i < najbaroj.length; i++ ) {
    const dx = x - najbaroj[i][0], dz = z - najbaroj[i][1];
    if ( dx * dx + dz * dz < m2 ) return false;
  }
  return true;
}

// La inter-arba minimuma distanco — la pli granda de la baza interspaco kaj la
// sumo de la du kronaj radiusoj plus la libero, por ke la foliaroj restu liberaj.
export const interspaco = ( baza: number, rA: number, rB: number ): number =>
  Math.max(baza, rA + rB + KRONA_LIBERO);

// montaKruteco — La plej granda altecdiferenco per unuo ĉe la punkto,
// specimenita laŭ x kaj z ( pasxo 0o4 ). La sama dekliva mezurilo por la
// montaj arboj, rokoj kaj subkreskajxoj — neniu objekto sxvebas sur la klifoj.
//     @param heightFn ( funkcio ) - Tera alta funkcio.
//     @param x, z ( number ) - La punkto.
//     @returns kruteco ( number ) - Altecdiferenco per unuo.
export function montaKruteco(heightFn: ( x: number, z: number ) => number, x: number, z: number): number {
  const paso = 0o4;
  const h0 = heightFn(x, z);
  return Math.max(Math.abs(heightFn(x + paso, z) - h0),
    Math.abs(heightFn(x, z + paso) - h0)) / paso;
}

// spronaDuono — La duono-larĝo de la monta spur-silueto ĉe la punkto — pli
// larĝa ĉe la piedo ( la spronoj disvastiĝas ), pli mallarĝa al la kresto.
// La sama formo por la arbaro, la rokoj kaj la subkreskajxoj.
//     @param xDuono ( number ) - La baza duono-larĝo.
//     @param z ( number ) - La punkto.
//     @param fado ( funkcio ) - La suda fado ( 0 ĉe la piedo, 1 sur la kresto ).
//     @returns duono ( number ) - La duono-larĝo.
export function spronaDuono(xDuono: number, z: number, fado: ( z: number ) => number): number {
  return xDuono * ( 0o75/0o100 + 0o25/0o100 * fado(z) );
}

export interface ArboMetado {
  x: number; z: number; h: number; s: number;
  r?: number;   // krona radiuso — por la inter-arba interspaca kontrolo
  plantAlto?: number;   // la REALA plant-alto — la Pussxlefaj beroj bezonas gxin
}

// Grovo — arbarera centro. La arboj kaj plantoj klasteriĝas ĉirkaŭ la centroj
// anstataŭ formi uniforman ringon ĉirkaŭ la urbo — naturaj arbareroj kun
// maldensaj paŭzoj inter ili.
export interface Grovo { x: number; z: number; r: number; }

// kreiGrovojn — Disigu arbarerojn nature tra la mondo. Hazardaj centroj kun
// hazardaj radiusoj, nek egale spacigitaj nek en ringo. La centroj evitas la
// urbon kaj la riveron; la arboj poste klasteriĝas ĉirkaŭ ili.
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
    if ( Math.hypot(x, z) < 0o40 ) continue;      // la urbo restas malfermita
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

// kreiArbarerojn — Publika enirpunkto al kreiGrovojn. La samaj arbareroj estas
// dividitaj inter la arbo-specoj, por ke betuloj, larikoj kaj Ĥŝakŝlefoj
// miksiĝu en la samaj naturaj arbareroj.
export function kreiArbarerojn(kvanto: number, worldRadius: number,
  excludeRivers: ( x: number, z: number ) => boolean,
  semo = 0o53104
): Grovo[] {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
  return kreiGrovojn(kvanto, worldRadius, hazardaGenerilo, excludeRivers);
}

// hazardaGrovaLoko — Hazarda punkto en hazarda arbarero. La dusuma disdono
// ( sumo de du hazardoj ) densigas la centron kaj maldensigas la randon — la
// natura arba klastero-formo, anstataŭ la uniforma disko de ringo.
export function hazardaGrovaLoko(hazardaGenerilo: () => number, grovoj: Grovo[]): { x: number; z: number } {
  const g = grovoj[( hazardaGenerilo() * grovoj.length ) | 0];
  const angulo = hazardaGenerilo() * Math.PI * 2;
  const disto = g.r * ( hazardaGenerilo() + hazardaGenerilo() - 1 );
  return { x: g.x + Math.sin(angulo) * disto, z: g.z + Math.cos(angulo) * disto };
}
