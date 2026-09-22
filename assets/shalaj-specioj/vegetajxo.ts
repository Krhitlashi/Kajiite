// ≺⧼ Vegetajxa modulo 🌲 ⧽≻
// Betuloj, filikoj, likenoj por la nebula arbara medio.
// Noto. la betula specio similas al la paperbetulo ( Betula papyrifera ) —
// blanka senŝeliĝanta ŝelo kaj larĝa, horizontala krono.
import * as THREE from "three";
import { kreiSxelanTeksajxon, kreiSxelanBumpanTeksajxon, kreiLarikanSxelanTeksajxon, kreiLarikanSxelanBumpanTeksajxon, kreiFilikanTeksajxon, kreiPurpuranFilikanTeksajxon,
  kreiPurpuranFrondanTeksajxon, kreiPurpuranTronkofilikanTeksajxon,
  kreiHerbanKlinganTeksajxon, kreiLikenanTeksajxon, kreiLikenanBumpanTeksajxon, kreiPurpuranFolianTeksajxon, kreiPurpuranSxelanTeksajxon,
  kreiPurpuranSxelanBumpanTeksajxon,
  kreiPurpuranTrunkanTeksajxon, kreiPurpuranTrunkanBumpanTeksajxon,
  kreiFrutikosanLikenanTeksajxon, kreiFolisanLikenanTeksajxon, kreiByssoidanLikenanTeksajxon,
  kreiMuskanTeksajxon, kreiCetkuanTeksajxon, kreiCakeanTeksajxon,
  kreiBetulanFoliaranTeksajxon, kreiBetulanFoliaranBumpanTeksajxon,
  kreiBetulanFolianTeksajxon,
  kreiLarikanFoliaranTeksajxon,
  kreiDioritanTeksajxon, kreiDioritanBumpanTeksajxon,
  kreiRokenTeksajxon, kreiRokenBumpanTeksajxon,
  sxelaTrunkaKoloro, sxelaKolumKoloro } from "../komunajxoj/teksajxoj.js";
import { kreiBuferanGeometrion, kunfandiDuGeometriojn, kunfandiGeometriojnSenIndekson } from "../komunajxoj/kunfandajxoj.js";
import { kreiHazardanGenerilon } from "../komunajxoj/hazardo.js";
import { glataPaso, akvaNivelo, biomo, type Biomo } from "../../src/tereno.js";

// ⟨ Geometrio ↔ metado 📃 ⟩ — la kronaj geometrioj estas unu unito altaj, sed
// ilia RADIUSO dependas de la pingla longo. La metaj funkcioj skvamas per la
// proporcio inter la dezirita krona radiuso kaj ĉi tiu geometria radiuso, do
// la modelo kaj la interspaco ĉiam kongruas.
const KRONA_GEOMETRIA_RADIUSO = 0.49;   // la larika krono, mezurita el la geometrio
// Kiom alta tavolo kompare kun sia larĝo — la geometrio mem jam estas spira
// ( ~1.4× pli alta ol larĝa ), do iomete sub 1 donas la montaran larikan konon.
const TAVOLA_PROPORCIO = 0o10/0o12;            // 0.8

// La purpuraj filik-trunkaj radiusoj ( supro kaj malsupro ) — uzataj kaj por
// la trunka geometrio kaj por la fronda elir-radiuso, por ke ili ĉiam kongruu.
const PURPURAJ_TRUNKAJ_RADIOJ = { supro: 0o3/0o20, malsupro: 0o5/0o20 };

// Krona radiuso — la foliara larĝo de ĉiu arba speco, uzata por la inter-arba
// interspaco, por ke la kronoj neniam trapenetru unu la alian. Ĉiu arbo portas
// sian propran radiuson ( r ), kaj la kandidato ricevas la specian funkcion de
// sia metado — malsamaj specoj miksiĝas sen super-spacigo de la maldikaj.
const KRONA_LIBERO = 0o2;   // libera spaco inter la kronaj randoj
const kronaRadiusoBetula = ( s: number ): number => 0o215/0o100 * s + 0o63/0o100;
export const kronaRadiusoLarika = ( s: number ): number => 0o11/0o10 * s + 0o4/0o10;
export const kronaRadiusoHxsxaksxlefa = ( s: number ): number => 0o6/0o10 + 0o1 * s;
// Pussxlefo — fern-granda planto, do nur eta krona libero ( ~0.5 unuoj ).
export const kronaRadiusoPussxlefa = ( s: number ): number => 0o25/0o100 + 0o2 * s;

// ⟨ Specoj ↔ biomoj ( kiu kreskas kie ) 📃 ⟩ — la kontrolo de la planto-spawno.
// Cxiu speco apartenas al unu aux pluraj biomoj ( tereno.ts ). La metaj
// funkcioj ricevas la biomo-liston de la vokanto ( urbo.ts ), kiu uzas la
// komunajn arojn sube — sxangxu la aron por sxangxi, kie la speco kreskas.
//   · valo — la arbareroj ( la arbaro plenigas la tutan biomon ).
//   · ebenaĵo — la malalta grundo ekster la arbareroj ( nur kelkaj etaj
//     plantoj. herbo kaj purpuraj plantoj ).
//   · montaro — la alpa zono ( Pussxlefo, rokoj, montaj arboj ).
//   · akvaj-plantoj — la akvaj plantoj ( la ĝenerala akva zono ) kreskas nur
//     en la pentritaj akvaj zonoj.
//   · ekvizeto — la DU ekvizetaj specioj ( cetkuoj / Equisetum praealtum kaj
//     cakeoj / Equisetum telmateia ) kreskas nur en la pentrita ekvizeta
//     zono, sur la akvo.
export const VALAJ_BIOMOJ: readonly Biomo[] = [ "valo" ];
export const EBENAJAJ_BIOMOJ: readonly Biomo[] = [ "ebenaĵo" ];
export const MONTAJ_BIOMOJ: readonly Biomo[] = [ "montaro" ];
export const AKVAJ_PLANTOJ_BIOMOJ: readonly Biomo[] = [ "akvaj-plantoj" ];
export const EKVIZETO_BIOMOJ: readonly Biomo[] = [ "ekvizeto" ];

// PunktaHasho — eta spaca haŝo-krado por la metaj bukloj. La minimumajn
// distancojn antaŭe kontrolis lineara skanado de ĉiuj jam metitaj punktoj
// ( O(n²) tra miloj da lokoj kaj dek miloj da provoj ) — la samaj demandoj
// estas O(1) po ĉelo ĉi tie. La eroj estas generikaj ( [x,z] tufoj aŭ
// ArboMetado ) kaj la demandobufro reuziĝas — neniu asigno po provo.
class PunktaHasho<T> {
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
function punktoLibera(hasho: PunktaHasho<[ number, number ]>, x: number, z: number, minDist: number): boolean {
  const najbaroj = hasho.najbaroj(x, z, minDist);
  const m2 = minDist * minDist;
  for ( let i = 0; i < najbaroj.length; i++ ) {
    const dx = x - najbaroj[i][0], dz = z - najbaroj[i][1];
    if ( dx * dx + dz * dz < m2 ) return false;
  }
  return true;
}

// metiPussxlefojn — Metu Pussxlefojn laux la biomo de la skulptita tereno
// ( tereno.ts ). La montara biomo estas la natura hejmo de la planto — plena
// denseco sur la deklivoj sub la arbolinio — dum la vala biomo ricevas nur
// maloftajn akceptojn ( 0o1/0o40 ), do la planto okazas pli ofte sur la
// montoj. La alto elektas la tipon kaj la densecon. super la arbolinio
// ( ~0o16–0o26 ) la planto fadas al nulo, kaj la tro krutaj klifoj estas
// preterlasataj.
//     @param heightFn ( funkcio ) - Tera alta funkcio.
//     @param kvanto ( number ) - La celata plantnombro.
//     @param excludeRivers ( funkcio ) - Riverfiltro.
//     @param excludePaths ( funkcio ) - Vojfiltro.
//     @param excludeBuildings ( funkcio ) - Konstruajxa filtro.
//     @param semo ( number ) - Hazarda semo.
//     @param evituArbojn ( ArboMetado[] = [] ) - Jam metitaj arboj; la plantoj
//         restas ekster la trunkoj/kronoj anstataŭ kreski en la arbojn.
//     @returns plantoj ( ArboMetado[] ) - La metitaj plantoj.
export function metiPussxlefojn(heightFn: ( x: number, z: number ) => number,
  kvanto: number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o62450,
  evituArbojn: ArboMetado[] = []
): ArboMetado[] {
  const hazardaGenerilo = mulberry32(semo);
  const placed: ArboMetado[] = [];
  // La metitaj arboj en la spaca haŝo — la interspaca demando O(1) po ĉelo
  // anstataŭ la lineara skanado de ĉiuj metitaj arboj po provo.
  const metitaHasho = new PunktaHasho<ArboMetado>(0o10);
  for ( const arbo of evituArbojn ) metitaHasho.meti(arbo.x, arbo.z, arbo);
  let provoj = 0;
  // Arbolinia fado — la plantoj malabundas sur la altaj deklivoj, la krestoj
  // kaj la pintoj ( plena sub ≈0o16, nula ĉe ≈0o26 ), kiel en metiMontajnArbojn.
  const arboliniaFado = ( h: number ): number => 1 - glataPaso(0o16, 0o26, h);

  while ( placed.length < kvanto && provoj++ < 0o30000 ) {
    // Triangula disdono tra la tuta mondo ( ±0o600 ) — la montaroj ( z ≈
    // 0o200–0o400, x ≈ ±0o200 ) estas ene de la skanujo, do la planto povas
    // trovi kaj la valon kaj la montojn.
    const x = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * 0o600;
    const z = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * 0o600;
    if ( Math.hypot(x, z) < 0o20 ) continue;   // la urbo restas malfermita
    if ( excludeRivers(x, z) ) continue;
    if ( excludePaths(x, z, 0o3) ) continue;
    if ( excludeBuildings(x, z, 0o3) ) continue;
    const h = heightFn(x, z);
    if ( h < akvaNivelo(x, z) + 0o1/0o10 ) continue;   // subakva grundo
    // La biomo — la altaĵoj ( montaro ) estas la natura hejmo de la Pussxlefo
    // ( plena akcepto ), dum la vala biomo ricevas nur maloftajn akceptojn
    // ( 0o1/0o40 = 1/32 ), do la planto okazas pli ofte sur la montoj.
    const akcepto = arboliniaFado(h) * ( biomo(x, z) === "montaro" ? 1 : 0o1/0o40 );
    if ( hazardaGenerilo() > akcepto ) continue;
    // Tro kruta deklivo — neniu planto sur la klifoj ( la montaraj pintoj ).
    if ( montaKruteco(heightFn, x, z) > 0o6/0o10 ) continue;
    const s = 0o63/0o100 + hazardaGenerilo() * 0o55/0o100;
    const kandidataR = kronaRadiusoPussxlefa(s);
    let troProksima = false;
    for ( const arbo of metitaHasho.najbaroj(x, z, kandidataR + 0o10 + KRONA_LIBERO) ) {
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        interspaco(0o4, arbo.r ?? kronaRadiusoBetula(arbo.s), kandidataR) ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    placed.push({ x, z, h, s, r: kandidataR });
    metitaHasho.meti(x, z, placed[placed.length - 1]);
  }
  return placed;
}

// La inter-arba minimuma distanco — la pli granda de la baza interspaco kaj la
// sumo de la du kronaj radiusoj plus la libero, por ke la foliaroj restu liberaj.
const interspaco = ( baza: number, rA: number, rB: number ): number =>
  Math.max(baza, rA + rB + KRONA_LIBERO);

// montaKruteco — La plej granda altecdiferenco per unuo ĉe la punkto,
// specimenita laŭ x kaj z ( pasxo 0o4 ). La sama dekliva mezurilo por la
// montaj arboj, rokoj kaj subkreskajxoj — neniu objekto sxvebas sur la klifoj.
//     @param heightFn ( funkcio ) - Tera alta funkcio.
//     @param x, z ( number ) - La punkto.
//     @returns kruteco ( number ) - Altecdiferenco per unuo.
function montaKruteco(heightFn: ( x: number, z: number ) => number, x: number, z: number): number {
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
function spronaDuono(xDuono: number, z: number, fado: ( z: number ) => number): number {
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
interface Grovo { x: number; z: number; r: number; }

// kreiGrovojn — Disigu arbarerojn nature tra la mondo. Hazardaj centroj kun
// hazardaj radiusoj, nek egale spacigitaj nek en ringo. La centroj evitas la
// urbon kaj la riveron; la arboj poste klasteriĝas ĉirkaŭ ili.
function kreiGrovojn(kvanto: number, worldRadius: number,
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
  const hazardaGenerilo = mulberry32(semo);
  return kreiGrovojn(kvanto, worldRadius, hazardaGenerilo, excludeRivers);
}

// hazardaGrovaLoko — Hazarda punkto en hazarda arbarero. La dusuma disdono
// ( sumo de du hazardoj ) densigas la centron kaj maldensigas la randon — la
// natura arba klastero-formo, anstataŭ la uniforma disko de ringo.
function hazardaGrovaLoko(hazardaGenerilo: () => number, grovoj: Grovo[]): { x: number; z: number } {
  const g = grovoj[( hazardaGenerilo() * grovoj.length ) | 0];
  const angulo = hazardaGenerilo() * Math.PI * 2;
  const disto = g.r * ( hazardaGenerilo() + hazardaGenerilo() - 1 );
  return { x: g.x + Math.sin(angulo) * disto, z: g.z + Math.cos(angulo) * disto };
}

// metiArbojn — Metu arbojn en la arbaron, evitante riverojn, vojojn kaj
// konstruajxojn. La specimenado estas UNIFORMA tra la tuta mondo kaj la
// biomo-filtrilo elektas la lokojn — la arbaro plenigas la TUTAN valan biomon
// ( la arbareroj de tereno.ts ), anstataŭ maldensaj makuloj kun malplenaj
// paŭzoj inter ili. La grovoj-parametro restas por retro-kongruo sed ne
// plu influas la specimenadon.
//     @param heightFn ( funkcio ) - Tera alta funkcio.
export function metiArbojn(heightFn: ( x: number, z: number ) => number,
  kvanto: number,
  worldRadius: number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53104,
  evituArbojn: ArboMetado[] = [],
  minimumaDistanco = 0o10,
  grovoj: Grovo[] = [],
  kronaRadiuso: ( s: number ) => number = kronaRadiusoBetula,
  biomojFiltro?: readonly Biomo[]
): ArboMetado[] {
  const hazardaGenerilo = mulberry32(semo);
  const placed: ArboMetado[] = [];
  // La spaca haŝo tenas LA EVITU-ARBOJN kaj la jam metitajn — la linara
  // skanado ( plus la per-prova [ ...evituArbojn, ...placed ] asigno ) de la
  // malnova versio estis la plej peza parto de la arbara generado.
  const metitaHasho = new PunktaHasho<ArboMetado>(0o10);
  for ( const arbo of evituArbojn ) metitaHasho.meti(arbo.x, arbo.z, arbo);
  let provoj = 0;

  const bonaLoko = ( x: number, z: number, s: number ): boolean => {
    if ( Math.hypot(x, z) < 0o20 ) return false;
    // La biomo — la arbaro kreskas nur en sia biomo ( valo aux montaro ).
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return false;
    if ( excludeRivers(x, z) ) return false;
    // La akva masko estas dua sekureca tavolo. ĝi kaptas la malprofundajn
    // bordojn, kie la regiona river-filtrilo ne sufiĉas por la arbo-bazo.
    if ( heightFn(x, z) < akvaNivelo(x, z) + 0o1/0o10 ) return false;
    if ( excludePaths(x, z, 0o44/0o10) ) return false;
    if ( excludeBuildings(x, z, 3) ) return false;
    const kandidataR = kronaRadiuso(s);
    for ( const arbo of metitaHasho.najbaroj(x, z, kandidataR + minimumaDistanco + KRONA_LIBERO) ) {
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        interspaco(minimumaDistanco, arbo.r ?? kronaRadiusoBetula(arbo.s), kandidataR) ) return false;
    }
    return true;
  };

  while ( placed.length < kvanto && provoj++ < 0o30000 ) {
    // Triangula disdono tra la tuta mondo ( ±worldRadius ) — la biomo-filtrilo
    // tenas la arbojn en la valaj arbareroj, do la arbaro plenigas ilin tute.
    const x = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * worldRadius;
    const z = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * worldRadius;
    if ( Math.abs(x) > worldRadius + 0o20 || Math.abs(z) > worldRadius + 0o20 ) continue;
    const s = 0o63/0o100 + hazardaGenerilo() * 0o55/0o100;
    if ( !bonaLoko(x, z, s) ) continue;
    placed.push({ x, z, h: heightFn(x, z), s, r: kronaRadiuso(s) });
    metitaHasho.meti(x, z, placed[placed.length - 1]);
  }
  return placed;
}

// metiMontajnArbojn — Metu arbojn sur la nordan montaron ( montaroNorda en
// tereno.ts ), nur sur moderaj deklivoj sub la arbolinio, evitante riverojn,
// vojojn kaj konstruajxojn. La dekliva filtraĵo ( specimenita per la tera alto )
// tenas la arbojn sur la piedeblaj deklivoj anstataŭ ŝvebantaj sur klifoj.
// La bando estas larĝa ( ĝis zMax ≈ 0o430 ), kaj tri naturaj formoj anstataŭas
// rektangulajn randojn. (1) la x-envelopo sekvas la montan spron-silueton —
// pli larĝa ĉe la piedo, pli mallarĝa al la kresto; (2) la suda fado
// dissolvas la arbaron en la valan arbaron ĉe la piedo; (3) la arbolinia fado
// laŭ la tera alto ( plena sub ≈0o16, nula ĉe ≈0o26 ) dissolvas la arbaron
// en la senarbajn pintojn — la kresto kaj la norda deklivo transiras nature
// al rokoj kaj likenoj anstataŭ fermiĝi per duro rando. Krome la arboj
// klasteriĝas en naturaj arbareroj ( la plimulto ĉirkaŭ hazardaj makulaj
// ankroj en la sama envelopo, kun paŭzoj inter la makuloj ) anstataŭ
// unuforma tapiŝo, kaj ilia grandeco malgrandiĝas al la arbolinio — plena
// grandeco sub ≈0o16, duono ĉe la arbolinio — kiel en vera montarbaro.
//     @param heightFn ( funkcio ) - Tera alta funkcio.
//     @param zMin, zMax ( number ) - La monta bando laŭ z.
//     @param excludeRivers ( funkcio ) - Riverfiltro.
//     @param excludePaths ( funkcio ) - Vojfiltro.
//     @param excludeBuildings ( funkcio ) - Konstruajxa filtro.
//     @param semo ( number ) - Hazarda semo.
//     @param evituArbojn ( ArboMetado[] ) - Jam metitaj arboj ( minimuma distanco ).
//     @returns arboj ( ArboMetado[] ) - La metitaj arboj.
export function metiMontajnArbojn(heightFn: ( x: number, z: number ) => number,
  kvanto: number,
  zMin: number, zMax: number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53130,
  evituArbojn: ArboMetado[] = [],
  minimumaDistanco = 0o10,
  kronaRadiuso: ( s: number ) => number = kronaRadiusoBetula,
  cx = 0,
  xDuono = 0o340,
  biomojFiltro?: readonly Biomo[]
): ArboMetado[] {
  const hazardaGenerilo = mulberry32(semo);
  const placed: ArboMetado[] = [];
  // La spaca haŝo — la sama interspaca akcelo kiel en metiArbojn. La aro
  // de la valaj arboj restas por la mozaika interspaco ( O(1) hasado ).
  const metitaHasho = new PunktaHasho<ArboMetado>(0o10);
  for ( const arbo of evituArbojn ) metitaHasho.meti(arbo.x, arbo.z, arbo);
  let provoj = 0;
  // Aro de la valaj arboj — rapida testado de la mozaika interspaco en la
  // ofta buklo ( Set.has estas O(1), kontraste al array.includes O(n) ).
  const evitaAro = new Set(evituArbojn);

  // Suda fado — la monta arbaro dissolviĝas en la valan arbaron anstataŭ
  // komenciĝi ĉe la duro piedo. la denseco rampas de 0 al plena tra la unuaj
  // 0o20 unuoj de la bando, do la transiro inter la zonoj estas natura.
  const sudaFado = ( z: number ): number => glataPaso(zMin, zMin + 0o20, z);

  // Arbolinia fado — la denseco fadas laŭ la tera alto. plena sub ≈0o16,
  // malkreskanta tra 0o16→0o26 kaj nula super ≈0o26. Tiel la arbaro dissolviĝas
  // en la senarbajn pintojn kaj la norda deklivo ( kie la tero denove subiras
  // sub la arbolinion ) povas rearbariĝi nature, anstataŭ fermiĝi per duro rando.
  const arboliniaFado = ( h: number ): number => 1 - glataPaso(0o16, 0o26, h);

  // X-envelopo — la arbaro sekvas la montan spron-silueton. pli larĝa ĉe la
  // piedo ( kie la spronoj larĝe disvastiĝas ), pli mallarĝa al la kresto.
  // La centro ( cx ) kaj duono-larĝo ( xDuono ) estas parametro — la norda
  // montaro ( defaŭlto cx=0, xDuono=0o340 ) kaj la nordorienta monto
  // ( cx=-0o350, xDuono=0o60 ) uzas la saman funkcion.
  const xEnvelopo = ( z: number ): number => spronaDuono(xDuono, z, sudaFado);

  // Montaraj arbareroj — la arboj klasteriĝas en naturaj makuloj anstataŭ
  // unuforma tapiŝo. La ankroj aperas hazarde en la sama spur-silueta envelopo
  // kiel la arboj, kun minimuma reciproka distanco, por ke la deklivoj montru
  // verajn arbarerojn kun paŭzoj inter ili.
  const grovoj: { x: number; z: number }[] = [];
  let grovajProvoj = 0;
  while ( grovoj.length < Math.max(0o4, Math.floor(kvanto / 0o16)) && grovajProvoj++ < 0o10000 ) {
    const gz = zMin + hazardaGenerilo() * ( zMax - zMin );
    if ( hazardaGenerilo() > sudaFado(gz) ) continue;
    const gx = cx + ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo(gz);
    if ( Math.hypot(gx, gz) < 0o110 ) continue;   // la urbo restas malfermita
    if ( excludeRivers(gx, gz) || excludePaths(gx, gz, 0o2) || excludeBuildings(gx, gz, 0o2) ) continue;
    let troProksima = false;
    for ( const g of grovoj ) {
      if ( Math.hypot(gx - g.x, gz - g.z) < 0o40 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    grovoj.push({ x: gx, z: gz });
  }

  while ( placed.length < kvanto && provoj++ < 0o10000 ) {
    let z: number, x: number;
    // Tri kvaronoj de la arboj sidas ĉirkaŭ la grovaj ankroj ( dusuma distanco
    // — densa centro, maldensa rando ), la resto disiĝas libere inter la
    // makuloj; la arbaro montras klasteran strukturon anstataŭ kovri la tutan
    // deklivon egale.
    if ( grovoj.length && hazardaGenerilo() < 0o3/0o4 ) {
      const g = grovoj[( hazardaGenerilo() * grovoj.length ) | 0];
      const ang = hazardaGenerilo() * Math.PI * 2;
      const disto = 0o14 * ( hazardaGenerilo() + hazardaGenerilo() );
      x = g.x + Math.sin(ang) * disto;
      z = g.z + Math.cos(ang) * disto;
      // La suda fado validas ankaŭ por la klasterigitaj arboj — alie densaj
      // makuloj aperus ĝuste ĉe la monto-piedo, kie la arbaro devus dissolviĝi
      // en la valan arbaron.
      if ( hazardaGenerilo() > sudaFado(z) ) continue;
    } else {
      z = zMin + hazardaGenerilo() * ( zMax - zMin );
      if ( hazardaGenerilo() > sudaFado(z) ) continue;   // maldensa ĉe la piedo
      // Triangula disdono laŭ x — densa meze, maldensa ĉe la spronaj finoj.
      x = cx + ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo(z);
    }
    if ( Math.hypot(x, z) < 0o110 ) continue;   // la urbo restas malfermita
    // La biomo — la monta arbaro kreskas nur en la montara biomo ( la sama
    // decido kiel la ludo ), do la skulptilo povas sxanĝi la arbzonon per la
    // altigxo aux malaltigxo de la tero super MONTA_ALTO.
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) continue;
    const h = heightFn(x, z);
    // Neniu monta arbo en subakva aŭ malseke inundita grundo.
    if ( h < akvaNivelo(x, z) + 0o1/0o10 ) continue;
    // Arbolinia fado — malabundigas la arbojn sur la altaj deklivoj, la
    // krestoj kaj la pintoj ( plena sub ≈0o16, nula ĉe ≈0o26 ).
    if ( hazardaGenerilo() > arboliniaFado(h) ) continue;   // arbolinio
    if ( excludeRivers(x, z) ) continue;
    if ( excludePaths(x, z, 0o44/0o10) ) continue;
    if ( excludeBuildings(x, z, 3) ) continue;
    // Tro kruta deklivo — neniu arbo sur la klifoj ( la montaraj pintoj ).
    if ( montaKruteco(heightFn, x, z) > 0o6/0o10 ) continue;
    // Alteca skemo — la arboj malgrandiĝas al la arbolinio ( natura
    // subgranda zono de la montarbaro ). plena grandeco sub ≈0o16, fadanta
    // al duono ĉe la arbolinio, anstataŭ unuforma grandeco tra la deklivo.
    const s = ( 0o63/0o100 + hazardaGenerilo() * 0o55/0o100 )
      * ( 0o1/0o2 + 0o1/0o2 * arboliniaFado(h) );
    const kandidataR = kronaRadiuso(s);
    let troProksima = false;
    for ( const arbo of metitaHasho.najbaroj(x, z, kandidataR + minimumaDistanco + KRONA_LIBERO) ) {
      // Kontraŭ la valaj arboj la distanco estas pli libera ( 0o4 ), por ke la
      // monta arbaro interplektiĝu kun la vala anstataŭ lasi mozaton laŭ la piedo.
      const mozaika = evitaAro.has(arbo) ? 0o4 : minimumaDistanco;
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        interspaco(mozaika, arbo.r ?? kronaRadiusoBetula(arbo.s), kandidataR) ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    placed.push({ x, z, h, s, r: kronaRadiuso(s) });
    metitaHasho.meti(x, z, placed[placed.length - 1]);
  }
  return placed;
}

// konstruiMontajnRokojn — Metu rokajn blokojn sur la nordan montaron, sur la
// altaj deklivoj kaj krestoj, kie la arboj malabundas. La rokoj sekvas la
// terenon kaj ricevas malvarmajn grizojn por kongrui kun la montara roko.
// La disdono samformas kun la monta arbaro — la sama spron-silueta x-envelopo
// kaj suda fado — sed la alteca akcepto estas inversa. la rokoj densegas sur
// la kresto kaj la supraj deklivoj ( kie la arboj fadas ), kaj dissolviĝas
// malsupren en la arbaran zonon. Tiel la rokzono sekvas la naturan montan
// silueton anstataŭ rektangulon.
//     @returns metitaj ( ArboMetado[] ) - La pozicioj, por ke la likenoj povas
//         grupigi ĉirkaŭ ili.
export function konstruiMontajnRokojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 624512,
  cx = 0,
  xDuono = 0o340,
  zMin = 0o260,
  zDuono = 0o160,
  biomojFiltro?: readonly Biomo[]
): ArboMetado[] {
  const hazardaGenerilo = mulberry32(semo);
  // Tri malsamaj rokformoj — antaŭe ĉiuj blokoj en la mondo estis la SAMA
  // neperturbita dudekedro, do oni vidis la saman ŝtonon ripetitan sur la
  // tuta montaro. Ĉiu bloko nun elektas unu el tri formoj ( malsamaj semoj de
  // la perturbo ), kaj ĉiu el la tri estas aparta InstancedMesh.
  const SXTONAJ_FORMONOJ = 0o3;
  const sxtonaMaterialo = kreiSxtonanMaterialon();
  const sxtonajMeshoj: THREE.InstancedMesh[] = [];
  const sxtonajNombroj = new Int32Array(SXTONAJ_FORMONOJ);
  for ( let f = 0; f < SXTONAJ_FORMONOJ; f++ ) {
    const mesho = new THREE.InstancedMesh(konstruiRokGeometrion(0o7 + f * 0o31),
      sxtonaMaterialo, kvanto);
    mesho.count = 0;
    sxtonajMeshoj.push(mesho);
  }

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  // ⟨ La tono venas el la teksajxo 📃 ⟩ — la instanca koloro MULTIPLIĜAS kun
  // la ŝtona teksajxo, do du mid-grizaj valoroj ( 0x8a kaj ~0x85 ) donas
  // preskaŭ nigran rokon; la paletro do portas nur etan grizecan nuancon
  // ( varma aŭ malvarma, kun kelkaj verdaj ) kaj la ŝtona tono mem restas en
  // la teksajxo. Same en konstruiMetitanRokon.
  const paletro = [ 0xf2f2f0, 0xffffff, 0xe8e8e4, 0xf6f4f2, 0xece9e3, 0xeff0e2 ];
  const metitaj: ArboMetado[] = [];
  let li = 0;
  let gardilo = 0;

  // La sama pieda fado kaj spron-silueta x-envelopo kiel en metiMontajnArbojn
  // ( parametroj cx/xDuono/zMin/zDuono — la norda montaro kaj la nordorienta
  // monto uzas la saman funkcion ), por ke la rokzono kongruu kun la arbarzono.
  const sudaFado = ( z: number ): number => glataPaso(zMin, zMin + 0o20, z);
  const xEnvelopo = ( z: number ): number => spronaDuono(xDuono, z, sudaFado);
  // Alteca akcepto — inversa de la arbolinia fado. malmulta sub la arbolinio
  // ( kie la arbaro vivas ), plena sur la kresto kaj la supraj deklivoj.
  const rokAkcepto = ( h: number ): number => glataPaso(0o16, 0o30, h);

  while ( li < kvanto && gardilo++ < 0o10000 ) {
    const z = zMin + hazardaGenerilo() * zDuono;
    if ( hazardaGenerilo() > sudaFado(z) ) continue;
    const x = cx + ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo(z);
    if ( Math.hypot(x, z) < 0o110 ) continue;
    // La biomo — la rokoj sekvas la montaran biomon.
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) continue;
    if ( hazardaGenerilo() > rokAkcepto(heightFn(x, z)) ) continue;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) ) continue;
    // Tro kruta deklivo — neniu roko ŝvebas sur la klifoj.
    if ( montaKruteco(heightFn, x, z) > 0o1 ) continue;

    const skaloY = 0o5/0o10 + hazardaGenerilo() * 0o5/0o10;
    // ⟨ Ne tro plata 📃 ⟩ — la blokoj estas iomete pli larĝaj ol altaj kaj
    // iomete pli longaj laŭ unu flanko, kiel rulitaj ŝtonegoj. Antaŭe la larĝo
    // estis ĝis 1.3× la alto KAJ la geometrio mem estis 0.6 alta kaj 0.7 skvamita
    // — la blokoj finiĝis je ~40% de sia larĝo kaj aspektis kiel splatoj.
    const skaloX = skaloY * ( 0.85 + hazardaGenerilo() * 0.3 );
    const skaloZ = skaloY * ( 0.85 + hazardaGenerilo() * 0.3 );
    E.set(hazardaGenerilo() * 0o15/0o40, hazardaGenerilo() * Math.PI * 2, hazardaGenerilo() * 0o15/0o40);
    Q.setFromEuler(E);
    const y = heightFn(x, z);
    // Preskaŭ duone en la tero — la plata bazo restas sub la grundo.
    M.compose(new THREE.Vector3(x, y + skaloY * 0o2/0o10, z),
      Q,
      new THREE.Vector3(skaloX, skaloY * 0o11/0o12, skaloZ));
    const forma = ( hazardaGenerilo() * SXTONAJ_FORMONOJ ) | 0;
    const mesho = sxtonajMeshoj[forma];
    mesho.setMatrixAt(sxtonajNombroj[forma], M);
    mesho.setColorAt(sxtonajNombroj[forma],
      C.setHex(paletro[( hazardaGenerilo() * paletro.length ) | 0]));
    sxtonajNombroj[forma]++;
    metitaj.push({ x, z, h: y, s: skaloY });
    li++;
  }

  for ( let f = 0; f < SXTONAJ_FORMONOJ; f++ ) {
    const mesho = sxtonajMeshoj[f];
    mesho.count = sxtonajNombroj[f];
    mesho.instanceMatrix.needsUpdate = true;
    if ( mesho.instanceColor ) mesho.instanceColor.needsUpdate = true;
    sceno.add(mesho);
  }
  return metitaj;
}

// konstruiFlokanMuskanGeometrion — Konstruu molan, flokan musko-monton.
// NENIU pli malalta platformo — la fadenoj mem formas la tutan monteton.
// Pli multaj fadenoj ol antaŭe ( 0o240 = 160 anstataŭ 0o34 = 28 ), kun
// monteta profilo ( pli longaj meze, pli mallongaj ĉe la rando ), por ke la
// silueto restu kupola sen la glata baza kuseno kaj la denseco restu muskaj
// anstataŭ aspekti kiel altaj herberoj.
function konstruiFlokanMuskanGeometrion(): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  const R = 0o7/0o10;   // monteta radiuso
  const fadenoj = 0o230;
  for ( let i = 0; i < fadenoj; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * R;
    // Monteta profilo — la fadenoj mallongiĝas al la rando, do sen la
    // platformo la monteto restas kupola kaj ne iĝas plata broso.
    const profilo = 1 - r / R;
    const alto = ( 0o4/0o10 + Math.random() * 0o4/0o10 ) * ( 0o3/0o10 + 0o7/0o10 * profilo );
    const largho = 0o2/0o100 + Math.random() * 0o4/0o100;
    const klino = 0o1/0o10 + Math.random() * 0o2/0o10;
    const fadeno = new THREE.ConeGeometry(largho, alto, 4).translate(0, alto / 2, 0);
    const akso = new THREE.Vector3(-Math.sin(a), 0, Math.cos(a));
    fadeno.applyMatrix4(new THREE.Matrix4().makeRotationAxis(akso, klino));
    fadeno.rotateY(a + ( Math.random() - 0o5/0o10 ) * 0o2/0o10);
    fadeno.translate(Math.cos(a) * r, 0, Math.sin(a) * r);
    partoj.push(fadeno);
  }
  return kunfandiGeometriojnSenIndekson(partoj);
}

// instanciiSubkreskajxojn — Komuna konstruo por miksitaj subkreskajxaj tavoloj.
// Konstruas sep instancigitajn plantojn ( verdan filikon, malaltan purpuran
// planton, purpuran filikon, arboforman purpuran filikon, herbotufon,
// musko-monteton kaj likenan makulon ) kaj plenigas ilin per unu komuna
// ciklo. la proviza funkcio donas kandidat-lokojn, la evitu-arbaro kaj la
// reciproka interspaco filtrila ilin, kaj la speca loto disdonas la plantojn.
// La malsamaj medioj ( montaro, lagrando ) nur provizas malsamajn
// kandidat-samplerilojn.
//     @param sceno ( THREE.Scene ) - La sceno.
//     @param kvanto ( number ) - Nombro da plantoj.
//     @param heightFn ( funkcio ) - Teren-alto.
//     @param hazardaGenerilo ( funkcio ) - Hazarda generilo.
//     @param provizi ( funkcio ) - Kandidat-loko, aŭ null por preterpasi.
//     @param evituArbojn ( ArboMetado[] ) - Cxiuj arboj ( trunkoj/kronoj ).
//     @param gardiloLim ( number ) - Maksimumaj provoj.
function instanciiSubkreskajxojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  hazardaGenerilo: () => number,
  provizi: () => [ number, number ] | null,
  evituArbojn: ArboMetado[],
  gardiloLim = 0o10000
): void {
  // ⟨ Tri-dimensiaj plantoj 📃 ⟩ — la malgrandaj plantoj de la miksaj makuloj
  // estis ĝis nun KRUCITAJ KARTOJ: du aŭ kvar ebenoj kun bildo de planto. De
  // proksime oni vidis la rektan randon de la ebenoj, la krucon de supre
  // aspektis kiel X, kaj la sama bildo ripetiĝis sur ĉiu specimeno. Nun ili
  // uzas la samajn ARKAJN FRONDOJN kiel la filikoj de la valo — frondoj kun
  // levita raĥiso, kiuj leviĝas, malfermiĝas kaj malleviĝas.
  const filikaGeometrio = konstruiFilikanRozeton(1.35, 0o11, 0.20);
  const filikoj = new THREE.InstancedMesh(filikaGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiFilikanTeksajxon(), alphaTest: 0o15/0o50, side: THREE.DoubleSide, roughness: 1 }), kvanto);

  const purpuraGeometrio = konstruiPurpuranRozeton(1.55, 0o12, 0.22);
  const purpuraj = new THREE.InstancedMesh(purpuraGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranFrondanTeksajxon(), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), kvanto);

  // Malaltaj purpuraj plantoj — la malgranda variaĵo de la purpura filiko.
  const malaltaGeometrio = konstruiPurpuranRozeton(0.95, 0o15, 0.32, true);
  const malaltaj = new THREE.InstancedMesh(malaltaGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranFrondanTeksajxon(true), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), kvanto);

  // La herbo ankaŭ ĉi tie estas la TRI-DIMENSIA tufo ( vidu konstruiHerbon ) —
  // la krucitaj kartoj restis nur ĉi tie, en la miksaj makuloj, kaj vidigis
  // sian rektan randon inter la aliaj plantoj.
  const herboj = new THREE.InstancedMesh(konstruiHerbanTufanGeometrion(),
    new THREE.MeshStandardMaterial({ map: kreiHerbanKlinganTeksajxon(), side: THREE.DoubleSide,
      vertexColors: true, roughness: 1 }), kvanto);

  const muskaTeksturo = kreiMuskanTeksajxon();
  const muskoj = new THREE.InstancedMesh(konstruiFlokanMuskanGeometrion(),
    new THREE.MeshStandardMaterial({ map: muskaTeksturo, color: 0xffffff, roughness: 1 }), kvanto);

  // Arboformaj purpuraj filikoj — la sama trunko + tavola krono kiel en
  // konstruiAltajnPurpurajnFilikojn ( unu reprezenta speco, du tavoloj ).
  const altaSpeco = { trunkaAlto: 0o74/0o10, kronaAlto: 0o73/0o10, kronaLargho: 0o16/0o10, nombro: 0o10, mallevo: 0o10/0o10 };
  const altaKronoGeometrio = konstruiTavolanFrondanKronon(altaSpeco, 2);
  const altaTrunkaGeometrio = new THREE.CylinderGeometry(
    PURPURAJ_TRUNKAJ_RADIOJ.supro, PURPURAJ_TRUNKAJ_RADIOJ.malsupro, altaSpeco.trunkaAlto, 7);
  const altajTrunkoj = new THREE.InstancedMesh(altaTrunkaGeometrio,
    new THREE.MeshStandardMaterial({
      map: kreiPurpuranTrunkanTeksajxon(), bumpMap: kreiPurpuranTrunkanBumpanTeksajxon(),
      bumpScale: 0o6/0o10, color: 0xffffff, roughness: 0o7/0o10,
    }), kvanto);
  const altajKronoj = new THREE.InstancedMesh(altaKronoGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranTronkofilikanTeksajxon(false), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), kvanto);

  // Likenaj makuloj — tri formoj ( frutikoza, folia, bisoida ), sekvantaj
  // la deklivan normalon.
  const likenojFrutikozaj = new THREE.InstancedMesh(konstruiFrutikosanLikenGeometrion(),
    new THREE.MeshStandardMaterial({ map: kreiFrutikosanLikenanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide,
      transparent: true, depthWrite: false, roughness: 1 }), kvanto);
  const likenojFolioj = new THREE.InstancedMesh(konstruiKrustanLikenGeometrion(),
    new THREE.MeshStandardMaterial({ map: kreiFolisanLikenanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide,
      transparent: true, depthWrite: false, roughness: 1 }), kvanto);
  const likenojBisoidaj = new THREE.InstancedMesh(konstruiByssoidanLikenGeometrion(),
    new THREE.MeshStandardMaterial({ map: kreiByssoidanLikenanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide,
      transparent: true, depthWrite: false, roughness: 1 }), kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const S = new THREE.Vector3();
  const P = new THREE.Vector3();
  const C = new THREE.Color();
  const yawQ = new THREE.Quaternion();
  const vertikala = new THREE.Vector3(0, 1, 0);
  const normalo = new THREE.Vector3();
  const ena = new THREE.Vector3();
  const enX = new THREE.Vector3();
  const enZ = new THREE.Vector3();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let fi = 0, pu = 0, mp = 0, hi = 0, ta = 0, mi = 0, li = 0, lf = 0, lo = 0, lb = 0;
  let gardilo = 0;

  // metiYaw — Metu instancan elementon ĉe ( x, y, z ) kun hazarda jaro kaj
  // unuforma skalo — la komuna pozo por la simplaj starantaj plantoj. La jaro
  // estas parametro por ke trunko kaj krono kune uzu la SAMAN turnon.
  const metiYaw = ( mesh: THREE.InstancedMesh, i: number, x: number, y: number, z: number, skalo: number, jaro?: number ): void => {
    E.set(0, jaro ?? hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(P.set(x, y, z), Q, S.setScalar(skalo));
    mesh.setMatrixAt(i, M);
  };

  // finigi — Fiksu la efektivan nombron, ĝisdatigu la matricojn kaj aldonu la
  // instancan objekton al la sceno — la komuna fino de la instancitaj tavoloj.
  const finigi = ( mesh: THREE.InstancedMesh, nombro: number, ombras = false ): void => {
    mesh.count = nombro;
    mesh.instanceMatrix.needsUpdate = true;
    if ( mesh.instanceColor ) mesh.instanceColor.needsUpdate = true;
    if ( ombras ) mesh.castShadow = true;
    sceno.add(mesh);
  };

  while ( fi + pu + mp + hi + ta + mi + li < kvanto && gardilo++ < gardiloLim ) {
    const loko = provizi();
    if ( !loko ) continue;
    const x = loko[0], z = loko[1];
    // Speca loto unue — la arboformaj purpuraj filikoj bezonas pli da libero
    // ol la malgrandaj plantoj ( iliaj kronoj larĝas ĝis ~2.6 unuoj ).
    const speco = hazardaGenerilo();
    const alta = speco >= 0o7/0o10 && speco < 0o63/0o100;
    const arbLibero = alta ? 0o146/0o100 + KRONA_LIBERO : 0o4/0o10;
    const minDist = alta ? 0o146/0o100 * 0o2 + 0o3 : 0o14/0o10;
    // Evitu la trunkojn/kronojn de cxiuj arboj.
    let troProksima = false;
    for ( const arbo of evituArbojn ) {
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        ( arbo.r ?? kronaRadiusoBetula(arbo.s) ) + arbLibero ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    // Eta interspaco — la plantoj restu distingeblaj ( pli granda por la
    // arboformaj filikoj, kies kronoj ne trapenetru unu la alian ). La hasho
    // anstataŭ la lineara skanado ( la sama decido, O(1) po ĉelo ).
    if ( !punktoLibera(metitajHasho, x, z, minDist) ) continue;

    const y = heightFn(x, z);
    if ( speco < 0o2/0o10 ) {
      // Verda filiko.
      metiYaw(filikoj, fi++, x, y, z, 0o5/0o10 + hazardaGenerilo() * 0o6/0o10);
    } else if ( speco < 0o4/0o10 ) {
      // Malalta purpura planto.
      metiYaw(malaltaj, mp++, x, y, z, 0o6/0o10 + hazardaGenerilo() * 0o6/0o10);
    } else if ( speco < 0o6/0o10 ) {
      // Purpura filiko.
      metiYaw(purpuraj, pu++, x, y, z, 0o45/0o100 + hazardaGenerilo() * 0o5/0o10);
    } else if ( speco < 0o7/0o10 ) {
      // Herbotufo.
      metiYaw(herboj, hi++, x, y, z, 0o3/0o10 + hazardaGenerilo() * 0o5/0o10);
    } else if ( speco < 0o63/0o100 ) {
      // Arboforma purpura filiko — trunko kaj tavola krono je la sama bazo.
      const skalo = 0o5/0o10 + hazardaGenerilo() * 0o11/0o10;
      const jaro = hazardaGenerilo() * Math.PI * 2;
      metiYaw(altajTrunkoj, ta, x, y + altaSpeco.trunkaAlto * skalo / 2, z, skalo, jaro);
      metiYaw(altajKronoj, ta, x, y, z, skalo, jaro);
      // Eta helo-variaĵo po trunko — la sxoelo ne estas identa ĉie.
      const helo = 0.92 + hazardaGenerilo() * 0.08;
      C.setRGB(helo, helo * 0.98, helo * 1.02);
      altajTrunkoj.setColorAt(ta, C);
      ta++;
    } else if ( speco < 0o11/0o10 ) {
      // Musko-monteto — platigita.
      const skalo = 0o25/0o100 + hazardaGenerilo() * 0o35/0o100;
      // La musko kuŝu laŭ la sama loka deklivo kiel la likenoj. Antaŭe ĝi
      // ĉiam uzis la identan kvaternionon kaj videble flosis horizontale sur
      // flankaj terenoj.
      const paso = skalo * 0o1/0o2;
      ena.set(x, y, z);
      enX.set(x + paso, heightFn(x + paso, z), z).sub(ena);
      enZ.set(x, heightFn(x, z + paso), z).sub(ena);
      normalo.crossVectors(enZ, enX).normalize();
      const vert = normalo.y;
      const horiz = Math.hypot(normalo.x, normalo.z);
      const maxKruteco = Math.PI / 16;
      if ( horiz > 0o1/0o2000 && Math.atan2(horiz, Math.max(vert, 0o1/0o2000)) > maxKruteco ) {
        const u = Math.tan(maxKruteco);
        const hx = normalo.x / horiz;
        const hz = normalo.z / horiz;
        normalo.set(hx * u, 1, hz * u);
      }
      normalo.normalize();
      Q.setFromUnitVectors(vertikala, normalo);
      E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
      yawQ.setFromEuler(E);
      Q.multiply(yawQ);
      // Sen la pli malalta platformo la fadenaj bazoj estas ĉe y = 0 — metu
      // la monteton ĝuste sur la teron anstataŭ la malnova kusena ofseto.
      M.compose(P.set(x, y + 0o1/0o40, z), Q,
        S.set(skalo, skalo * 0o5/0o10, skalo));
      muskoj.setMatrixAt(mi++, M);
    } else {
      // Likena makulo — tridimensia, sekvas la deklivan normalon.
      const skalo = 0o6/0o10 + hazardaGenerilo() * 0o12/0o10;
      const paso = skalo * 0o1/0o2;
      ena.set(x, y, z);
      enX.set(x + paso, heightFn(x + paso, z), z).sub(ena);
      enZ.set(x, heightFn(x, z + paso), z).sub(ena);
      normalo.crossVectors(enZ, enX).normalize();
      const vert = normalo.y;
      const horiz = Math.hypot(normalo.x, normalo.z);
      const maxKruteco = Math.PI / 16;
      if ( horiz > 0o1/0o2000 && Math.atan2(horiz, Math.max(vert, 0o1/0o2000)) > maxKruteco ) {
        const u = Math.tan(maxKruteco);
        const hx = normalo.x / horiz;
        const hz = normalo.z / horiz;
        normalo.set(hx * u, 1, hz * u);
      }
      normalo.normalize();
      Q.setFromUnitVectors(vertikala, normalo);
      E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
      yawQ.setFromEuler(E);
      Q.multiply(yawQ);
      M.compose(P.set(x, y + 0o1/0o40, z), Q, S.setScalar(skalo));
      // Forma loto — la tri likenaj formoj miksiĝas.
      const loto = hazardaGenerilo();
      if ( loto < 0o4/0o10 ) { likenojFrutikozaj.setMatrixAt(lf++, M); }
      else if ( loto < 0o7/0o10 ) { likenojFolioj.setMatrixAt(lo++, M); }
      else { likenojBisoidaj.setMatrixAt(lb++, M); }
      li++;
    }
    metitajHasho.meti(x, z, [ x, z ]);
  }

  finigi(filikoj, fi); finigi(malaltaj, mp); finigi(purpuraj, pu);
  finigi(herboj, hi); finigi(muskoj, mi);
  finigi(likenojFrutikozaj, lf); finigi(likenojFolioj, lo); finigi(likenojBisoidaj, lb);
  finigi(altajTrunkoj, ta, true); finigi(altajKronoj, ta, true);
}

// konstruiMontajnSubkreskajxojn — Metu subkreskajxojn tra la betulaj/larikaj
// arbaroj de la valo kaj la norda montaro. Tri kvaronoj klasterigxas cxirkaux
// la arboj — gxuste ekster la kronoj — por ke la subkreskajxo floru tie, kie
// la arbaro vivas; la resto sekvas la saman spur-siluetan x-envelopon kaj
// sudan fadon kiel la monta arbaro ( metiMontajnArbojn ), do la plantaro
// dissolvigxas nature en la valan arbaron anstataux komencigxi per dura rando.
// La arbolinia fado ( iomete pli tolerema ol tiu de la arboj, cxar arbustoj
// kreskas pli alten ) malabundigas la plantojn super la arbolinio, kaj la
// dekliva filtrajxo tenas ilin sur la piedeblaj deklivoj. Cxiuj arboj estas
// evitu-ankroj, por ke neniu planto kresku en la trunkojn aŭ kronojn.
//     @param sceno ( THREE.Scene ) - La sceno.
//     @param kvanto ( number ) - Nombro da plantoj.
//     @param heightFn ( funkcio ) - Teren-alto.
//     @param montajArboj ( ArboMetado[] ) - La klaster-ankroj ( arboj ).
//     @param evituArbojn ( ArboMetado[] ) - Cxiuj arboj ( trunkoj/kronoj ).
//     @param excludeRivers ( funkcio ) - Rivera filtro.
//     @param excludePaths ( funkcio ) - Voja filtro.
//     @param excludeBuildings ( funkcio ) - Konstruajxa filtro.
//     @param semo ( number ) - Hazarda semo.
export function konstruiMontajnSubkreskajxojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  montajArboj: ArboMetado[],
  evituArbojn: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53133,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = mulberry32(semo);

  // La sama pieda fado kaj spur-silueta x-envelopo kiel en metiMontajnArbojn,
  // sed la bando kovras la tutan montaron ( la piedo gxis la norda piedo ) kaj
  // komencigxas pli sube — en la norda rando de la vala arbaro ( z ≈ 0o174 ),
  // por ke la subkreskajxo enmiksigxu en la valan betulan/larikan arbaron
  // anstataux lasi nudan strion cxe la monto-piedo.
  const sudaFado = ( z: number ): number => glataPaso(0o174, 0o210, z);
  const xEnvelopo = ( z: number ): number => spronaDuono(0o340, z, sudaFado);
  // Arbolinia fado — pli tolerema ol tiu de la arboj ( 0o16 → 0o26 ). la
  // filikoj kaj arbustoj kreskas iomete pli alten ol la arboj.
  const arboliniaFado = ( h: number ): number => 1 - glataPaso(0o20, 0o34, h);

  const provizi = (): [ number, number ] | null => {
    let x: number, z: number;
    if ( montajArboj.length && hazardaGenerilo() < 0o3/0o4 ) {
      // Klasterigxu cxirkaux la arboj — gxuste ekster la kronoj.
      const t = montajArboj[( hazardaGenerilo() * montajArboj.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      // Larĝa ringo ( 0.5..5.5 ) — la malgrandaj plantoj kreskas nature cxirkaŭ
      // la trunko, kaj la arboformaj purpuraj filikoj ( kiuj bezonas pli da
      // libero ) povas ankaux aperi apud la arboj.
      const d = ( t.r ?? kronaRadiusoBetula(t.s) ) + 0o5/0o10 + hazardaGenerilo() * 0o4;
      x = t.x + Math.sin(a) * d;
      z = t.z + Math.cos(a) * d;
    } else {
      // Envelopo — la samaj spur-siluetaj formoj kiel la monta arbaro.
      z = 0o174 + hazardaGenerilo() * 0o250;
      if ( hazardaGenerilo() > sudaFado(z) ) return null;
      x = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo(z);
    }
    if ( Math.hypot(x, z) < 0o20 ) return null;   // la urbo-centro restas malfermita
    // La biomo — la monta subkreskajxo nur en la montara biomo.
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return null;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) || excludeBuildings(x, z, 0o2) ) return null;
    if ( hazardaGenerilo() > arboliniaFado(heightFn(x, z)) ) return null;
    // Deklivo — neniu planto sxvebas sur la klifoj.
    if ( montaKruteco(heightFn, x, z) > 0o63/0o100 ) return null;
    return [ x, z ];
  };

  instanciiSubkreskajxojn(sceno, kvanto, heightFn, hazardaGenerilo, provizi, evituArbojn, 0o20000);
}

// konstruiLaganSubkreskajxojn — Metu la samajn subkreskajxojn en ringo cxirkaux
// la lago, sur la sekaj bordoj ekster la lagrando — la ondigita lagrando
// ( radioFn ) donas la formon, kaj tri kvaronoj klasterigxas cxirkaux la lagaj
// arboj ( gxuste ekster la kronoj ) por ke la plantoj floru kie la lagarbaro
// vivas. La malseka rivera kavo oriente de la lago restas sen plantoj.
//     @param sceno ( THREE.Scene ) - La sceno.
//     @param kvanto ( number ) - Nombro da plantoj.
//     @param heightFn ( funkcio ) - Teren-alto.
//     @param cx, cz ( number ) - Lagcentro.
//     @param radioFn ( ang → r ) - Lagranda radiusa funkcio.
//     @param akvoNiveloFn ( x, z → y ) - Akvosurfaca nivelo.
//     @param lagArboj ( ArboMetado[] ) - La lagaj arboj ( klaster-ankroj ).
//     @param evituArbojn ( ArboMetado[] ) - Cxiuj lagaj arboj ( trunkoj/kronoj ).
//     @param excludeRivers ( funkcio ) - Rivera filtro.
//     @param excludePaths ( funkcio ) - Voja filtro.
//     @param excludeBuildings ( funkcio ) - Konstruajxa filtro.
//     @param semo ( number ) - Hazarda semo.
export function konstruiLaganSubkreskajxojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoNiveloFn: ( x: number, z: number ) => number,
  lagArboj: ArboMetado[],
  evituArbojn: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53134,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = mulberry32(semo);

  const provizi = (): [ number, number ] | null => {
    let x: number, z: number;
    if ( lagArboj.length && hazardaGenerilo() < 0o3/0o4 ) {
      // Klasterigxu cxirkaux la lagaj arboj — gxuste ekster la kronoj.
      const t = lagArboj[( hazardaGenerilo() * lagArboj.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      // Larĝa ringo ( 0.5..5.5 ) — same kiel en la montara/vala tavolo.
      const d = ( t.r ?? kronaRadiusoBetula(t.s) ) + 0o5/0o10 + hazardaGenerilo() * 0o4;
      x = t.x + Math.sin(a) * d;
      z = t.z + Math.cos(a) * d;
    } else {
      // Ringo de la lagrando gxis ~40 unuojn ekster gxi — sekvas la bordon.
      const angulo = hazardaGenerilo() * Math.PI * 2;
      const radiuso = radioFn(angulo) + hazardaGenerilo() * 0o40;
      x = cx + Math.cos(angulo) * radiuso;
      z = cz + Math.sin(angulo) * radiuso;
    }
    if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) return null;
    // La biomo — la lag-subkreskajxo restas en la vala biomo.
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return null;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) || excludeBuildings(x, z, 0o2) ) return null;
    // Nur seka bordo — la malseka kavo restas sen plantoj.
    if ( heightFn(x, z) < akvoNiveloFn(x, z) ) return null;
    return [ x, z ];
  };

  instanciiSubkreskajxojn(sceno, kvanto, heightFn, hazardaGenerilo, provizi, evituArbojn, 0o10000);
}

// konstruiBetulanFoliaranGeometrion — Konstruu kompaktan "nuban kusenon" por
// la bonsajeca betula krono. Ĉiu kuseno estas plata, densa folia maseto kun
// neregula rando; la tuta krono konsistas el pluraj tiaj apartaj kusenoj
// sidiĝantaj sur videblaj branĉoj, kun malplenoj inter ili.
// funkcio konstruiBetulanFoliaranGeometrion
// ⟨ Rezulto 📃 ⟩ — la krono venas en DU partoj: la MASO ( la kusenoj kaj la
// branĉetoj, kun la foliara teksaĵo ) kaj la FOLIKARTOJ ( la unuopaj folioj,
// kun la unu-folia teksaĵo kaj alphaTest ). Antaŭe ĉio estis unu geometrio uzanta
// la foliaran teksaĵon, do ĉiu folikarto montris makulojn de cent folioj kaj
// aspektis kiel verda peco — la komuna kaŭzo de la "verdaj steloj" en la krono.
function konstruiBetulanFoliaranGeometrion(): { maso: THREE.BufferGeometry; folioj: THREE.BufferGeometry } {
  const partoj: THREE.BufferGeometry[] = [];
  const foliajPartoj: THREE.BufferGeometry[] = [];
  // ⟨ La kuseno 📃 ⟩ — antaŭe la kuseno havis sep grandajn interkovrantajn
  // sferojn ( radiuso ĝis 0.28 ) plus dek plenigaĵojn. Ĝi estis malregula, sed
  // nur je la skalo de tiuj sep sferoj: de proksime — kaj en la ilo — ĉiu
  // kuseno ankoraŭ montriĝis kiel PILKO, kaj la krono kiel aro da verdaj
  // pilkoj. Nun la maso estas la MALHELPA INTERNO de la kuseno — la ombro
  // inter la folioj, kiu NE estas videblaĵo mem.
  // ⟨ Kial unu kerno, ne pufoj 📃 ⟩ — du provoj de pufoj montriĝis same: se la
  // pufoj estas grandaj, ĉiu kuseno montriĝas kiel amaso da verdaj globoj; se
  // ili estas etaj, oni bezonas centojn por plenigi la saman volumon kaj ĉiu
  // verto-buĝeto triobliĝas por 768 betuloj. La kerno estas do UNU malregula
  // bulo ( dudekedro de 80 facetoj, kies vertojn ŝovas malalta ondofunkcio de
  // la direkto — neniu kudro, ĉar la duplikataj vertoj ricevas la saman ŝovon )
  // kaj nur KELKE da malgrandaj elstaraĵoj sur ĝi, por ke la rando de la kerno
  // ne estu glata sfero. La kerno de 0.27 sidas profunde ene de la folia ŝelo
  // ( la folikartoj de la rando startas je 0.33–0.40 ), do la videbla plej
  // eksteraĵo de ĉiu kuseno estas ĉiam folio, kaj la malhelaĵo aperas nur tra
  // la malplenoj inter ili, kiel en vera betula krono.
  // ⟨ La per-vertaj nuancoj 📃 ⟩ — la kunfando konservas la koloratributon nur
  // se ĈIU parto portas ĝin ( vidu kunfandiDuGeometriojn ). Ĉiu parto ricevas
  // sian propran nuance multobligilon, do la kerno ne estas unu egala maso.
  const kunTinto = ( g: THREE.BufferGeometry, r: number, gn: number, b: number ): THREE.BufferGeometry => {
    const n = g.getAttribute("position").count;
    const koloroj = new Float32Array(n * 3);
    for ( let i = 0; i < n; i++ ) {
      koloroj[i * 3] = r; koloroj[i * 3 + 1] = gn; koloroj[i * 3 + 2] = b;
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    return g;
  };
  // ⟨ Vertikala gradiento 📃 ⟩ — la sama per-verta nuanco, sed laŭ la ALTO de la
  // verto: malsupre malhela, supre hela. La kerno tion bezonas, ĉar de SUPRE la
  // folioj de la pinto ne kovras ĉion: la malhela bulo videblis kiel malhelaj
  // makuloj sur la supro de ĉiu betulo. Kun la gradiento la kerno montriĝas kiel
  // ombro inter la folioj de flanke, sed kiel lumigita foliaro de supre.
  const kunVertikalaTinto = ( g: THREE.BufferGeometry,
    mR: number, mG: number, mB: number,
    hR: number, hG: number, hB: number ): THREE.BufferGeometry => {
    g.computeBoundingBox();
    const bb = g.boundingBox ?? new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1));
    const yMin = bb.min.y, yMax = bb.max.y;
    const p = g.getAttribute("position");
    const koloroj = new Float32Array(p.count * 3);
    for ( let i = 0; i < p.count; i++ ) {
      const t = yMax > yMin ? ( p.getY(i) - yMin ) / ( yMax - yMin ) : 0o1/0o2;
      koloroj[i * 3] = mR + ( hR - mR ) * t;
      koloroj[i * 3 + 1] = mG + ( hG - mG ) * t;
      koloroj[i * 3 + 2] = mB + ( hB - mB ) * t;
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    return g;
  };
  // ⟨ Kiom da facetoj 📃 ⟩ — dudekedro de unu divido havas 80 facetojn de
  // ~0.15 sur 0.27-radiusa bulo ( ~0.37 unuojn en la mondo ) — tro grandaj: la
  // kerno montriĝis kiel fasetita kristalo. Kun du dividoj la facetoj estas
  // kvaronon tiel larĝaj kaj la malregula bulo legiĝas kiel ombro, dum la
  // kosto restas 960 vertoj kontraŭ la 12000 de la folikartoj.
  const KERNELO_PLATIGO = 0.62;
  const kerno = new THREE.IcosahedronGeometry(0.24, 2);
  {
    const p = kerno.getAttribute("position");
    const n = kerno.getAttribute("normal");
    for ( let i = 0; i < p.count; i++ ) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const l = Math.hypot(x, y, z) || 1;
      const nx = x / l, ny = y / l, nz = z / l;
      // ⟨ Malalta frekvenco 📃 ⟩ — la bulo devas esti malregula je la skalo de
      // la tuta kuseno, ne je la skalo de la facetoj: kun altfrekvenca bruo la
      // vertoj de najbaraj facetoj disiĝas kaj la kerno montriĝas kiel
      // kristalo. Tri malsamaj ondolongoj donas bulon de neregula, sed glata
      // konturo.
      const ondo = 1 + 0.17 * Math.sin(nx * 4.1 + 1.3) * Math.cos(ny * 3.3 - 0.7)
        + 0.12 * Math.sin(nz * 5.7 + 2.2) + 0.07 * Math.cos(nx * 7.3 + nz * 6.1);
      p.setXYZ(i, x * ondo, y * ondo * KERNELO_PLATIGO, z * ondo);
      // ⟨ Glataj normaloj 📃 ⟩ — dudekedro NE estas indeksita: ĉiu verto
      // apartenas al unu faceto, do computeVertexNormals donas al ĉiu faceto
      // UNU normalon kaj la kerno montriĝis kiel papera poliedro kun grandaj
      // ebenaj kolorpecoj. La normalon oni skribu mem, el la direkto de la
      // sfero — ĝi estas la normalo de la plata sfero, transformita per la
      // inversa skalo ( la plataĵo de la akso Y ).
      const vn = Math.hypot(nx, ny / KERNELO_PLATIGO, nz) || 1;
      n.setXYZ(i, nx / vn, ny / KERNELO_PLATIGO / vn, nz / vn);
    }
  }
  // ⟨ La kerno ne estu UNUTONA 📃 ⟩ — antaŭe la tuta kerno ricevis unu nudon
  // ( 0.92 ) kaj ĝia supro restis malhela egale kiel ĝia malsupro.
  partoj.push(kunVertikalaTinto(kerno, 0.55, 0.60, 0.42, 1.45, 1.50, 1.20));
  // Kelkaj malgrandaj elstaraĵoj — ili rompas la glatan randon de la kerno
  // tie, kie ĝi montriĝas tra malpleno inter la folioj.
  for ( let i = 0; i < 0o10; i++ ) {
    const z = Math.random() * 2 - 1;
    const ang = Math.random() * Math.PI * 2;
    const rFlanko = Math.sqrt(Math.max(0, 1 - z * z));
    const r = 0.20 + Math.random() * 0.10;
    const elstaro = new THREE.IcosahedronGeometry(0.035 + Math.random() * 0.04, 1);
    elstaro.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
      Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)));
    elstaro.applyMatrix4(new THREE.Matrix4().makeScale(
      0.8 + Math.random() * 0.4,
      0.6 + Math.random() * 0.4,
      0.8 + Math.random() * 0.4));
    elstaro.translate(rFlanko * Math.cos(ang) * r, z * r * 0o1/0o2, rFlanko * Math.sin(ang) * r);
    partoj.push(kunTinto(elstaro, 0.82 + Math.random() * 0.36, 0.84 + Math.random() * 0.36,
      0.76 + Math.random() * 0.34));
  }

  // kreiFolianKarteton — UNU betula folio: simpla ortangulo, kies UV-oj
  // kovras la tutan kanvason de la folia teksaĵo ( kreiBetulanFolianTeksajxon ).
  //
  // ⟨ Kial ortangulo 📃 ⟩ — la geometrio antaŭe DESEGNIS sian propran folian
  // konturon ( ok segmentoj, segildentado, faldita klingo ) KAJ ricevis la
  // folian teksaĵon, kiu portas SIAN propran konturon. Du malsamaj konturoj
  // devis koincidi, kaj ili ne povis: la teksaĵa folio estis tondita de la
  // geometria rando, la UV-oj streĉiĝis — de proksime ĉiu folio aspektis
  // distordita. Nun la teksaĵo portas la tutan formon ( pinto, tigo,
  // segildenta rando, vejnoj ) kaj alphaTest eltranĉas ĝin; la geometrio estas
  // nur kadro. La folio ankaŭ kreskas el sia BAZO ( la tigo sidas ĉe la origino
  // de la kartono ), do ĝi pendas de la branĉeto kiel vera folio.
  const kreiFolianKarteton = ( longo: number, largho: number ): THREE.BufferGeometry => {
    // ⟨ La klingo kurbiĝas 📃 ⟩ — plata ortangulo spegulas la lumon EGALE el
    // ĉiu angulo, kaj amaso da tiaj kartoj aspektas kiel paperaj teleroj. Kun
    // 2×2 subdivido oni povas faldi la folion: la du duonoj leviĝas laŭ la
    // mezvejno kaj la pinto malleviĝas, do ĉiu folio havas du lumigatajn
    // flankojn kaj la foliaro havas profundon. La faldo profundis de 0.30 al
    // 0.36 de la larĝo — ju pli profunda la angulo, des pli da ombro ĝi tenas
    // kaj des malpli la folio legiĝas kiel plata plato.
    const geometrio = new THREE.PlaneGeometry(longo, largho, 0o2, 0o2)
      .translate(longo / 2, 0, 0);
    const pozicioj = geometrio.attributes.position;
    const kurboLarĝe = largho * 0.36;
    const kurboLonge = largho * 0.28;
    for ( let i = 0; i < pozicioj.count; i++ ) {
      const x = pozicioj.getX(i);
      const y = pozicioj.getY(i);
      const trans = y / ( largho / 2 );
      const laux = x / longo;
      pozicioj.setZ(i, kurboLarĝe * trans * trans + kurboLonge * laux * laux);
    }
    geometrio.computeVertexNormals();
    // ⟨ La nuanco de ĉiu unuopa folio 📃 ⟩ — ĉiuj folioj de la tuta Betularo
    // dividas UNU teksaĵon kaj po-kusene UNU instanc-koloron. Sen plua variado
    // ĉiu kuseno estis unutona kaj la krono legiĝis kiel unu verda materio
    // anstataŭ kiel foliaro: la okulo ne ricevas la etajn helo-diferencojn,
    // kiujn ĝi uzas por distingi foliojn unu de la alia. Ĉiu kartono do portas
    // sian propran per-vertan nuancon — iom pli hela, iom pli flava, iom pli
    // malhela — kaj la materialo multiplikas ĝin ( vertexColors ).
    const helo = 0.80 + Math.random() * 0.46;
    const varmo = 0.86 + Math.random() * 0.14;   // malpli da bluo = pli varma verdo
    const koloroj = new Float32Array(pozicioj.count * 3);
    for ( let i = 0; i < pozicioj.count; i++ ) {
      koloroj[i * 3] = helo * ( 0.96 + Math.random() * 0.08 );
      koloroj[i * 3 + 1] = helo * ( 0.97 + Math.random() * 0.07 );
      koloroj[i * 3 + 2] = helo * varmo * ( 0.94 + Math.random() * 0.1 );
    }
    geometrio.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    return geometrio;
  };

  // kreiFolitufon — Malgranda tufo da betulaj folioj ĉirkaŭ komuna punkto.
  //
  // ⟨ Kial 📃 ⟩ — ĉiu fasko estis TRI KRUCITAJ kartoj je fiksaj anguloj
  // ( 0°, +60°, −60° ĉirkaŭ la vertikala akso ), ĉiuj en la sama ebeno. De
  // flanko tio aspektas kiel SESPINTA ASTERISKO de maldikaj klingoj, kaj ĝuste
  // tion oni vidis en la krono: verdaj steloj anstataŭ folioj. Nun ĉiu folio
  // de la tufo ricevas sian propran direkton ( plenan cirklon, ne fiksajn
  // angulojn ), sian propran klinon, sian propran rulon kaj sian propran
  // longon — de iu ajn flanko la tufo estas tufo da folioj.
  const kreiFolitufon = ( longo: number, largho: number, kvanto: number ): THREE.BufferGeometry => {
    const folioj: THREE.BufferGeometry[] = [];
    const bazo = Math.random() * Math.PI * 2;
    for ( let j = 0; j < kvanto; j++ ) {
      const folio = kreiFolianKarteton(
        longo * ( 0o7/0o10 + Math.random() * 0o5/0o10 ),
        largho * ( 0o4/0o5 + Math.random() * 0o5/0o10 ));
      // ⟨ La ordo de la turnoj 📃 ⟩ — kun la defaŭlta ordo "XYZ" la lasta
      // turno okazas ĉirkaŭ la MONDA X-akso, kiu post la kurbiĝo kaj la turno
      // ne plu estas la longa akso de la klingo: la "rulo" do ne rulis la
      // folion ĉirkaŭ ĝia propra vejno, sed ĝin klinis flanken. Kun "YXZ" la
      // sinsekvo estas ĝusta — unue la klino en la ebeno de la folio, poste la
      // rulo ĉirkaŭ ĝia propra longa akso, fine la turno ĉirkaŭ la vertikalo.
      folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
        // rulo — la klingo turniĝas ĉirkaŭ sia propra longa akso
        ( Math.random() - 0o5/0o10 ) * 0o4/0o5,
        // turno — ĉiu folio direktiĝas al sia propra flanko
        bazo + j / kvanto * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o6/0o10,
        // klino — la folioj pendas malsupren sub sia propra pezo
        -0o15/0o100 - Math.random() * 0o5/0o10, "YXZ")));
      folioj.push(folio);
    }
    return kunfandiGeometriojnSenIndekson(folioj);
  };

  // ⟨ Kiom larĝa la klingo 📃 ⟩ — la kartono devas havi la SAMAN proporcion
  // kiel la folio desegnita en la teksaĵo ( ~2:1 ), alie la teksaĵo streĉiĝas
  // kaj la folio aspektas dika kaj distordita. Ĉiuj folioj de la krono uzas
  // ĉi tiun proporcion.
  const LARĜA_PROPORCIO = 0o1/0o2;

  // ⟨ La folioj estas tro grandaj 📃 ⟩ — la kusenoj estas 2–5 unuojn larĝaj,
  // do folio de 0.13–0.19 unuoj montriĝas sur la krono kiel brasiko: ĉiu
  // kuseno vidigas kelkajn MEGALAJN foliojn anstataŭ centojn da etaj. Veraj
  // betulaj folioj estas etaj kompare kun la arbo; per ĉi tiu faktoro la krono
  // reakiras sian fajnan foligran teksturon. La kusenoj ricevas pli da folioj
  // ( vidu faskoj kaj randaj ) por ke la mantelo restu densa.
  const FOLIA_SKALO = 0.8;

  // Foliaj faskoj — la folioj grupiĝas en malgrandajn faskojn ĉirkaŭ
  // maldikaj branĉetoj, kiuj kreskas el la centra maso de la kuseno.
  // Tri kompaktaj radialaj tavoloj — la kuseno restas malgranda ( r ĝis ~0.4 ).
  // Pluraj folifaskoj po kuseno ( 8 → 12 ) — la krono densiĝas kaj la folioj
  // legiĝas kiel foliaro, ne kiel kelkaj apartaj branĉetoj.
  const faskoj = 0o17;
  for ( let i = 0; i < faskoj; i++ ) {
    const a = i / faskoj * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o5/0o10;
    const tavolo = i % 0o3;
    const ekstera = tavolo / 0o2;
    // ⟨ La folioj sidas SUR la kuseno 📃 ⟩ — la foliaj tufoj antaŭe iris ĝis
    // 0.32 de la centro de la kuseno, dum la kusena MASO mem atingas nur ~0.46
    // ( kaj kun la skalo de la granda supra kuseno tio estas pli ol duoble la
    // larĝo de la maso ). La folioj do ŝvebis ekster la kuseno, kaj la krono
    // aspektis kiel nubo el disaj folioj. Nun ili sidas ene de la maso.
    const r = 0o14/0o100 + tavolo * 0o10/0o100 + ( Math.random() - 0o5/0o10 ) * 0o1/0o40;
    // ⟨ Ne ĉio en unu ebeno 📃 ⟩ — kun y-variado de nur ±0.05 la folifaskoj de
    // la tri "tavoloj" sidis preskaŭ sur unu horizontala ebeno, kaj la kuseno
    // montriĝis plata kiel telero. Veraj folioj sidas je malsamaj altoj kaj
    // superkovras sin unu la alian en profundo.
    const y = ( Math.random() - 0o5/0o10 ) * 0o14/0o100;
    const celo = new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    // Maldika branĉeto de la centro ĝis la fasko — ĝi videble ligas la
    // foliojn al la centra maso.
    if ( celo.length() > 0o1/0o100 ) {
      const direkto = celo.clone().normalize();
      const branĉeto = new THREE.CylinderGeometry(0o10/0o1000, 0o20/0o1000, celo.length(), 4)
        .translate(0, celo.length() / 2, 0);
      branĉeto.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direkto)));
      partoj.push(kunTinto(branĉeto, 0.62, 0.6, 0.54));
    }
    // Tri aŭ kvar foliaj tufoj ĉirkaŭ la pinto de la branĉeto — ĉiu tufo
    // portas siajn proprajn foliojn kun propraj anguloj.
    const folioj = 0o3 + ( ( Math.random() * 0o2 ) | 0 );
    for ( let j = 0; j < folioj; j++ ) {
      const longo = ( 0o13/0o100 + Math.random() * 0o6/0o100 )
        * ( 1 - ekstera * 0o1/0o4 ) * FOLIA_SKALO;
      const largho = longo * LARĜA_PROPORCIO * ( 0o4/0o5 + Math.random() * 0o5/0o10 );
      const folio = kreiFolitufon(longo, largho, 0o3);
      // Natura klino — la tufo pendas iomete malsupren kaj turniĝas ĉirkaŭ
      // sia tigo, neniam uniforme radiale.
      const klino = new THREE.Euler(
        -0o2/0o10 - Math.random() * 0o4/0o10,
        ( Math.random() - 0o5/0o10 ) * 0o7/0o10,
        ( Math.random() - 0o5/0o10 ) * 0o6/0o10);
      folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(klino));
      if ( j > 0 ) {
        folio.translate(
          celo.x + ( Math.random() - 0o5/0o10 ) * 0o3/0o20,
          celo.y + ( Math.random() - 0o5/0o10 ) * 0o3/0o20,
          celo.z + ( Math.random() - 0o5/0o10 ) * 0o3/0o20);
      } else {
        folio.translate(celo.x, celo.y, celo.z);
      }
      foliajPartoj.push(folio);
    }
  }
  // ⟨ La folia supro 📃 ⟩ — la kuseno ne rajtas finiĝi per glata VERDA PILKO.
  // La folioj de la flanka zono kaj de la rando portas la silueton, sed la
  // SUPRAĵO de la kuseno restis nuda sfero ( de supre la krono aspektis kiel
  // aro de verdaj pilkoj ). Nun tavolo de folioj kuŝas sur la supra duonsfero,
  // ĉiu kline gxuste tiom, ke ĝiaj klingoj sekvu la kurbiĝon de la kuseno.
  // ⟨ La sunflora disdono 📃 ⟩ — la folioj de la supro estis dismetitaj tute
  // HAZARDE, do iuj lokoj de la kupolo ricevis tri tufojn kaj aliaj neniun; tra
  // la malplenoj la MALHELA kerno de la kuseno montriĝis, kaj de supre ĉiu
  // betulo portis malhelajn makulojn sur la pinto de la krono. Nun la tufoj sidas
  // sur la sunflora spiralo ( la ora angulo ) kiel la semoj de sunfloro: la
  // disdono estas egala kaj sen amasiĝoj, do la sama nombro da folioj kovras la
  // tutan kupolon. Nur la klino de ĉiu folio restas hazarda — la krono ne
  // aspektas maŝina.
  const suprajFolioj = 0o66;
  const oraAngulo = Math.PI * ( 3 - Math.sqrt(5) );
  for ( let i = 0; i < suprajFolioj; i++ ) {
    const frakcio = Math.sqrt(( i + 0.5 ) / suprajFolioj );
    const spirala = i * oraAngulo;
    const rSupra = 0o30/0o100 * frakcio * Math.cos(spirala);
    const zSupra = 0o30/0o100 * frakcio * Math.sin(spirala);
    // La alteco sekvas la sf erojn de la kuseno. La KUPOLO estas la centra
    // sfero ( radiuso 0.21 ); la antaŭa 0.17 metis la foliojn de la pinto
    // INTERNE de tiu sfero, do la supro restis nuda kaj glata. Nun ili sidas
    // sur la surfaco — kaj iomete super ĝi, por ke ili ne dronu.
    const rNun = Math.hypot(rSupra, zSupra);
    const ySupra = 0.20 * Math.sqrt(Math.max(0, 1 - Math.pow(rNun / 0.30, 2))) + 0.012;
    const celo = new THREE.Vector3(rSupra, ySupra, zSupra);
    const longo = ( 0o12/0o100 + Math.random() * 0o6/0o100 ) * FOLIA_SKALO;
    const folio = kreiFolitufon(longo, longo * LARĜA_PROPORCIO * 0.9, 0o3);
    // La klino sekvas la deklivon de la sfero — sur la pinto la folioj kuŝas
    // preskaŭ horizontale, ĉe la flankoj ili pendas malsupren laŭ la kurbiĝo.
    const deklivo = Math.min(1, rNun / 0.30) * 0.85;
    const a = Math.atan2(zSupra, rSupra);
    folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
      0,
      -a + ( Math.random() - 0.5 ) * 0.9,
      -deklivo - Math.random() * 0.25, "YXZ")));
    folio.translate(celo.x, celo.y, celo.z);
    foliajPartoj.push(folio);
  }
  // ⟨ La folia rando 📃 ⟩ — la kuseno ne rajtas finiĝi per glata sfera rando:
  // vera betula kuseno havas faskojn kaj maldikajn branĉetojn elstarantajn tra
  // sia rando. La rando ankaŭ iomete PENDAS — la folioj kliniĝas malsupren,
  // kio donas al la krono la maldensan, aeran betulan silueton.
  const randaj = 0o34;   // densa, foliplena rando
  for ( let i = 0; i < randaj; i++ ) {
    const a = i / randaj * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o2/0o10;
    // ⟨ Ĝuste ĉe la rando de la kusena maso 📃 ⟩ — la kerno nun atingas 0.34
    // ( plus la radiuso de la pufo ), do la branĉetoj de la rando startas
    // iomete PLI ekstere ol antaŭe. Tiel la folioj — ne la malhela kerno —
    // estas la plej eksteraĵo de la kuseno, kio donas la maldikan, aeran
    // betulan silueton.
    const r = 0o33/0o100 + Math.random() * 0o7/0o100;
    const celo = new THREE.Vector3(Math.cos(a) * r,
      -0o4/0o100 + ( Math.random() - 0o5/0o10 ) * 0o26/0o100, Math.sin(a) * r);
    const branĉeto = new THREE.CylinderGeometry(0o6/0o1000, 0o16/0o1000, r, 4)
      .translate(0, r / 2, 0);
    branĉeto.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0),
        celo.clone().normalize())));
    partoj.push(kunTinto(branĉeto, 0.62, 0.6, 0.54));
    // Tri folioj ĉe la pinto de ĉiu randa branĉeto, klinitaj malsupren.
    for ( let j = 0; j < 0o3; j++ ) {
      // ⟨ La randa foliaro 📃 ⟩ — la folioj de la randaj branĉetoj estas pli
      // grandaj ol tiuj interne ( la lumo estas ĉe la rando ), kaj ili estas la
      // UNUAĵO, kion la okulo vidas ĉe la silueto de la krono: antaŭe ili estis
      // tiel etaj, ke la kusenoj finiĝis per nuda, glata sfera rando.
      const longo = ( 0o13/0o100 + Math.random() * 0o6/0o100 ) * FOLIA_SKALO;
      // ⟨ La larĝo 📃 ⟩ — ĉi tie estis 0.55 ( preskaŭ 3× la longo ). Tri
      // krucitaj tiaj kartoj faris GRANDAN PLATAN DISKON ĉe la rando de ĉiu
      // kuseno — videblaj verdaj teleroj elstarantaj el la krono. Nun la karto
      // portas unu veran folion ( vidu LARĜA_PROPORCIO ).
      const largho = longo * LARĜA_PROPORCIO * ( 0o4/0o5 + Math.random() * 0o4/0o10 );
      const folio = kreiFolitufon(longo, largho, 0o3);
      // La randa tufo pendas pli forte malsupren — ĝi estas la silueto de la
      // krono kontraŭ la ĉielo.
      folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
        -0o5/0o10 - Math.random() * 0o4/0o10,
        ( Math.random() - 0o5/0o10 ) * 0o7/0o10,
        ( Math.random() - 0o5/0o10 ) * 0o5/0o10, "YXZ")));
      folio.translate(celo.x, celo.y, celo.z);
      foliajPartoj.push(folio);
    }
  }
  // ⟨ La folioj SUB la kuseno 📃 ⟩ — betulaj folioj pendas ankaŭ sub la
  // kuseno, kie la branĉetoj estas pli malhelaj kaj la lumo nur trafas ilin
  // de malantaŭe. Sen ili la malsupra rando de ĉiu kuseno estis glata sfero,
  // kaj la krono aspektis kiel pilko de malsupre.
  const subaj = 0o12;
  for ( let i = 0; i < subaj; i++ ) {
    const a = i / subaj * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o4/0o10;
    const r = 0o14/0o100 + Math.random() * 0o16/0o100;
    const celo = new THREE.Vector3(Math.cos(a) * r,
      -0o1/0o12 - Math.random() * 0o10/0o100, Math.sin(a) * r);
    const longo = ( 0o10/0o100 + Math.random() * 0o5/0o100 ) * FOLIA_SKALO;
    const folio = kreiFolitufon(longo, longo * LARĜA_PROPORCIO, 0o2);
    // Forta klino malsupren — ĉi tiuj folioj pendas, ili ne leviĝas.
    folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
      -0o2/0o10,
      a + ( Math.random() - 0o5/0o10 ) * 0o5/0o10,
      -0o4/0o5 - Math.random() * 0o4/0o10, "YXZ")));
    folio.translate(celo.x, celo.y, celo.z);
    foliajPartoj.push(folio);
  }
  // Neniu centra vertikala cilindro — la malnova akso montriĝis kiel malhela
  // vertikala konuso inter la du kronoj. La foliaj kusenetoj kaj kartoj mem
  // tenas la foliaron ligita al la trunko.
  return { maso: kunfandiGeometriojnSenIndekson(partoj),
    folioj: kunfandiGeometriojnSenIndekson(foliajPartoj) };
}

// kreiTrunkanGeometrion — La komuna trunko de la arboj: lathe-profilo kun
// RADIKA LARĜIĜO ĉe la grundo kaj glata mallarĝiĝo al la pinto.
//
// ⟨ Kial 📃 ⟩ — la antaŭa trunko estis simpla CILINDRO de 0o7/0o40 supre al
// 0o3/0o10 malsupre: ĝi havis trunkon, sed neniun bazan larĝiĝon. Arbo sen
// radika larĝiĝo aspektas kiel stango enŝovita en la teron — oni vidas la
// akutan randon kie la cilindro tuŝas la herbon. La larĝiĝo ankaŭ donas al la
// okulo la skalon de la arbo kaj rompas la perfektan vertikalan linion.
//     @param larghoBazo ( number ) - La trunka radiuso ĉe la grundo.
//     @param larghoSupro ( number ) - La trunka radiuso ĉe la pinto.
//     @param larghoRadiko ( number ) - La radiuso de la larĝiĝo sur la grundo.
//     @param segmentoj ( number ) - Kiom da flankoj ( 9–11 sufiĉas ).
//     @returns geometrio ( BufferGeometry ) - La trunko, centro je y = 0, alto 1.
function kreiTrunkanGeometrion(larghoBazo: number, larghoSupro: number,
  larghoRadiko: number, segmentoj = 0o11): THREE.BufferGeometry {
  // La profilo ( r, y ) de la radika larĝiĝo ( malsupre ) ĝis la pinto. La
  // larĝiĝo vivas nur en la unuaj 15% de la trunko, kiel vera radika kolumo.
  const profilo: THREE.Vector2[] = [
    new THREE.Vector2(0, -0.5),
    new THREE.Vector2(larghoRadiko, -0.5),        // la larĝiĝo sur la grundo
    new THREE.Vector2(larghoRadiko * 0.74, -0.465),
    new THREE.Vector2(larghoBazo * 1.14, -0.43),
    new THREE.Vector2(larghoBazo, -0.36),         // la trunko mem komenciĝas
    new THREE.Vector2(larghoBazo * 0.80 + larghoSupro * 0.20, -0.10),
    new THREE.Vector2(larghoBazo * 0.50 + larghoSupro * 0.50, 0.20),
    new THREE.Vector2(larghoBazo * 0.22 + larghoSupro * 0.78, 0.42),
    new THREE.Vector2(larghoSupro, 0.48),
    new THREE.Vector2(larghoSupro * 0.5, 0.5),
    new THREE.Vector2(0, 0.5),
  ];
  const geometrio = new THREE.LatheGeometry(profilo, segmentoj);
  geometrio.computeVertexNormals();
  return geometrio;
}

// konstruiArbaron — Konstruu instancigitajn arbojn (trunkoj kaj foliaroj) en la sceno.
export function konstruiArbaron(sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = mulberry32(77531);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const sxelaBumpo = kreiSxelanBumpanTeksajxon();
  // La betula trunko — maldika kaj glata, kun radika larĝiĝo.
  const trunkaGeometrio = kreiTrunkanGeometrion(0o3/0o10, 0o7/0o40, 0o3/0o10 * 1.42, 0o13);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, bumpMap: sxelaBumpo, bumpScale: 0o6/0o10, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return trunkoj;

  const kronaGeometrioj = konstruiBetulanFoliaranGeometrion();
  // ⟨ Duflanka foliaro 📃 ⟩ — la folikartoj estas PLATAJ ( unu triangula
  // ventumilo ĉe ĉiu flanko de la kuseno ), do kun la defaŭlta FrontSide nur
  // la duono de la folioj estis videbla el iu ajn direkto kaj la krono aspektis
  // maldensa kaj plata. Duflanke ĉiu karteto lumas de ambaŭ flankoj — la sama
  // geometrio nun donas preskaŭ duoblan foliaron.
  // ⟨ La folia reliefo 📃 ⟩ — la kusenoj estas ARoj da glataj sferoj, do
  // proksime ili aspektis kiel verdaj balonoj. Kun bump-teksaĵo ( folietoj,
  // vejnoj kaj malhelaj interspacoj ) la sama sfera maso legiĝas kiel foliaro
  // — la reliefo portas la foliojn, kiujn la geometrio ne povas porti.
  // ⟨ La tekstura skalo 📃 ⟩ — la foliara teksajxo montras ĉirkaŭ cent foliojn,
  // kaj ĉiu kusen-sfero portas la TUTAN teksajxon sur sia malgranda surfaco: la
  // cent folioj fariĝis du-tri rastrumeroj, kiujn la okulo legas kiel unu glatan
  // verdan mason. Kun 2.4× ripeto la folioj havas sian veran grandecon sur la
  // kuseno, kaj la kuseno legiĝas kiel foliaro anstataŭ kiel pilko. La teksaĵoj
  // estas klonoj — la originalo estas kundividita ( sxovu ) kaj uzata ankaŭ de
  // la muska kaj betulaj materialoj.
  // ⟨ La ripeto 📃 ⟩ — la kusena kerno estas nun UNU bulo de ~0.55 en la
  // geometria spaco ( ~1.4 unuoj en la mondo, kun la skalo de la kuseno ), do
  // la ripeto devas esti tia, ke la folioj de la kanvaso havu sian veran
  // grandecon sur ĝi. Ĉe 3× ripeto ĉiu el la ~100 folioj de la kanvaso estas
  // ĉirkaŭ 5 centonoj de unuo — sama skalo kiel la folikartoj mem — kaj la
  // kerno legiĝas kiel ombro de folimaso, ne kiel kolorŝmiraĵo.
  const masaTeksajxo = kreiBetulanFoliaranTeksajxon().clone();
  masaTeksajxo.repeat.set(3, 3);
  masaTeksajxo.needsUpdate = true;
  const masaBumpo = kreiBetulanFoliaranBumpanTeksajxon().clone();
  masaBumpo.repeat.set(3, 3);
  masaBumpo.needsUpdate = true;
  // ⟨ vertexColors 📃 ⟩ — la per-vertaj nuancoj de la pufoj ( vidu kunTinto
  // en konstruiBetulanFoliaranGeometrion ) venas de ĉi tiu flago.
  const kronaMaterialo = new THREE.MeshStandardMaterial({
    map: masaTeksajxo, color: 0xffffff, roughness: 0o35/0o40,
    bumpMap: masaBumpo, bumpScale: 0o12/0o10,
    vertexColors: true,
    side: THREE.DoubleSide,
  });
  // ⟨ La unuopaj folioj 📃 ⟩ — la folikartoj ricevas SIAN propran teksaĵon
  // ( unu betula folio kun travidebla fono ) kaj alphaTest, do ili montriĝas
  // kiel veraj folioj anstataŭ kiel verdaj pecoj de la foliara teksaĵo.
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiBetulanFolianTeksajxon(), color: 0xffffff, roughness: 0o35/0o40,
    alphaTest: 0o45/0o100, vertexColors: true, side: THREE.DoubleSide,
  });
  // Bonsajeca krono. Ses apartaj "nubaj kusenoj" po arbo, ĉiu sidiĝanta sur
  // videbla branĉo — malsimetriaj, je malsamaj altoj kaj radiusoj, kun
  // malplenoj inter ili, kiel ĉe bonsajo.
  const PADOJ = 0o10;
  const kronoj = new THREE.InstancedMesh(kronaGeometrioj.maso, kronaMaterialo, arboj.length * PADOJ);
  const folioj = new THREE.InstancedMesh(kronaGeometrioj.folioj, foliaMaterialo, arboj.length * PADOJ);
  const brancxoGeometrio = new THREE.CylinderGeometry(0o3/0o100, 0o5/0o100, 1, 5);
  const brancxoj = new THREE.InstancedMesh(brancxoGeometrio, trunkaMaterialo, arboj.length * PADOJ);

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  // ⟨ La du paledroj 📃 ⟩ — la folikartoj kaj ilia kusena kerno ne povas
  // havi la saman koloron: la kartoj ESTAS la foliaro ( verdaj, helaj, kun
  // la suno tra ili ) kaj la kerno estas la ombro INTER la folioj. Antaŭe ambaŭ
  // ricevis la saman palan verdon, do la kerno montriĝis kiel aro da HELAJ
  // verdaj pilkoj ĝuste tie, kie oni atendas mallumon — la plej videbla kaŭzo
  // de la aspekto "la folioj estas pilkoj".
  // La folikartoj — preskaŭ blankaj nuancoj ( la verdo venas de la folia
  // teksaĵo kaj de la per-vertaj nuancoj; la instanca koloro nur MODIFAS ĝin ).
  const paletroFolioj = [ 0xeef4dc, 0xe2ecc6, 0xf6f8ea, 0xd6e4b8, 0xe8f0d2 ];
  // ⟨ La kerno ne estu NIGRA 📃 ⟩ — la unua versio uzis tre profundan verdon
  // ( 0x38522f ), kaj ĉar la kerno ankaŭ ĵetas sian propran ombron sur sin,
  // la interno de ĉiu kuseno montriĝis preskaŭ nigra kun videblaj facetoj —
  // la okulo legas nigran poliedron, ne ombron de foliaro. Nun la kerno estas
  // meza malhela verdo, kiu sub la ombro faliĝas gxuste en la tonon de profunda
  // foliombro.
  const paletroMaso = [ 0x51703f, 0x476437, 0x5b7a48, 0x3f5a33, 0x4d6b3d ];

  arboj.forEach(( t, i ) => {
    const h = 0o64/0o10 + t.s * 0o44/0o10;
    // Eta klino rompas la uniformecon — la betuloj ne staras perfekte rekte.
    const Q = kreiKlinoQuaternionon(hazardaGenerilo, 0o2/0o20, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Q);

    // ⟨ La trunko finiĝas EN la krono 📃 ⟩ — la trunko iris ĝis la plena alto
    // h, sed la plej alta kuseno sidas je 0.92 h kaj larĝas nur ~0.3, do la
    // blanka trunkopinto elstaris SUPER la foliaron kiel fosto. Nun la trunko
    // finiĝas je 0.90 h, profunde en la pinta kuseno, kie la folioj ĝin kaŝas
    // — kiel ĉe vera betulo, kie la ĉefa ŝoso perdiĝas en la krono.
    const trunkaAlto = h * 0.9;
    M.compose(pozicio(new THREE.Vector3(0, trunkaAlto / 2, 0)), Q, new THREE.Vector3(1, trunkaAlto, 1));
    trunkoj.setMatrixAt(i, M);

    // Betula sxoelo — blankeca, kun varia helo kaj varma/malvarma tono po
    // arbo. iuj estas neĝe blankaj, aliaj kremkoloraj aŭ grizetaj.
    const helo = 0.94 + hazardaGenerilo() * 0.06;
    C.setRGB(
      helo * ( 0.98 + hazardaGenerilo() * 0.03 ),
      helo,
      helo * ( 0.93 + hazardaGenerilo() * 0.07 ));
    trunkoj.setColorAt(i, C);

    const kronoRadiuso = 0o215/0o100 * t.s + 0o63/0o100;
    const foliaraSkalo = kronoRadiuso * 0o52/0o100 * ( 0o36/0o40 + hazardaGenerilo() * 0o15/0o100 );
    // La ses nubaj kusenoj — malsimetriaj anguloj, altoj kaj radiusoj, kiel
    // ĉe bonsajo, plus GRANDA centra supra kuseno super la trunka supro —
    // la ĉefa maso, kiel la originala granda betula krono. Ĉiu kuseno ricevas
    // propran turniĝon de sia folia silueto.
    // ⟨ La kronaj kusenoj 📃 ⟩ — ok kusenoj en TRI ringoj plus pinto, ne ses
    // kusenoj dise sur la trunko. Antaŭe la kusenoj staris en unu vertikala
    // vico kun grandaj malplenoj inter si, do la krono montriĝis kiel ŝtuparo
    // da apartaj verdaj pilkoj kun NUdaj trunko-segmentoj inter ili. Nun la
    // ringoj interkovriĝas vertikale kaj horizontale, do la ok kusenoj
    // kunfandiĝas en UNU kontinuan, iomete konusan kronon ( betula krono estas
    // pli larĝa ĉe la bazo kaj mallarĝiĝas supren ), kun la trunketo videbla
    // nur tra la maldensaj randoj.
    // ⟨ La formo de la krono 📃 ⟩ — la antaŭa aranĝo mallarĝiĝis unuforme de
    // malsupre supren ( fr 0.58 → 0.18 ), kio estas la profilo de KONUSO: la
    // betuloj aspektis kiel pingloarboj. Vera betula krono estas OVO — mallarĝa
    // ĉe la malsupra fino, plej larĝa ĉirkaŭ du trionoj de sia alto, kaj
    // rondiĝanta al pinto. La ok kusenoj nun sekvas tiun profilon, kaj la
    // malsupra zono estas pli mallarĝa, do pli da trunko restas videbla sub la
    // krono, kiel ĉe vera paperbetulo.
    const padBazoj = [
      // Malsupra zono — mallarĝa, la unua etaĝo de la krono.
      { a: 0.5, fy: 0.48, fr: 0.36, s: 1.30 },
      { a: 3.7, fy: 0.51, fr: 0.40, s: 1.35 },
      // La plej larĝa zono — ĉirkaŭ du trionoj de la alto.
      { a: 1.9, fy: 0.63, fr: 0.58, s: 1.42 },
      { a: 5.1, fy: 0.62, fr: 0.55, s: 1.34 },
      { a: 0.2, fy: 0.70, fr: 0.52, s: 1.30 },
      { a: 3.0, fy: 0.74, fr: 0.46, s: 1.36 },
      // Supra zono kaj la pinta kuseno.
      { a: 1.3, fy: 0.84, fr: 0.34, s: 1.25 },
      { a: 4.2, fy: 0.92, fr: 0.20, s: 1.30 },
    ];
    padBazoj.forEach(( pb, k ) => {
      const idx = i * PADOJ + k;
      // Eta per-arbo jittero — ĉiu betulo havas sian propran aranĝon.
      const a = pb.a + ( hazardaGenerilo() - 0o5/0o10 ) * 0o6/0o10;
      const yPado = h * ( pb.fy + ( hazardaGenerilo() - 0o5/0o10 ) * 0o4/0o100 );
      const rPado = foliaraSkalo * ( pb.fr + ( hazardaGenerilo() - 0o5/0o10 ) * 0o10/0o100 );
      const sPado = foliaraSkalo * pb.s * ( 0o36/0o40 + hazardaGenerilo() * 0o15/0o100 );
      const padoQ = Q.clone().multiply(
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), a));
      M.compose(pozicio(new THREE.Vector3(Math.cos(a) * rPado, yPado, Math.sin(a) * rPado)),
        padoQ, new THREE.Vector3(sPado, sPado, sPado));
      kronoj.setMatrixAt(idx, M);
      kronoj.setColorAt(idx, hazardaKoloro(hazardaGenerilo, C, paletroMaso));
      // La folikartoj sidas en la SAMA loka spaco kiel la kusena maso, do ili
      // ricevas la saman matricon — sed SIAN propran, multe pli helan koloron.
      folioj.setMatrixAt(idx, M);
      folioj.setColorAt(idx, hazardaKoloro(hazardaGenerilo, C, paletroFolioj));

      // Videbla branĉo de la trunko ĝis la kuseno — la bonsaja strukturo.
      const yBrancxo = yPado - h * 0o1/0o10;
      const el = new THREE.Vector3(0, yBrancxo, 0);
      const al = new THREE.Vector3(Math.cos(a) * rPado, yPado, Math.sin(a) * rPado);
      const direkto = al.clone().sub(el);
      const longoB = direkto.length();
      if ( longoB > 0o1/0o100 ) {
        const Qb = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0), direkto.clone().normalize());
        const centroB = el.clone().add(al).multiplyScalar(0o1/0o2);
        M.compose(pozicio(centroB), Q.clone().multiply(Qb), new THREE.Vector3(1, longoB, 1));
        brancxoj.setMatrixAt(idx, M);
      }
    });
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  kronoj.instanceMatrix.needsUpdate = true;
  folioj.instanceMatrix.needsUpdate = true;
  brancxoj.instanceMatrix.needsUpdate = true;
  if ( trunkoj.instanceColor ) trunkoj.instanceColor.needsUpdate = true;
  if ( kronoj.instanceColor ) kronoj.instanceColor.needsUpdate = true;
  if ( folioj.instanceColor ) folioj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = kronoj.castShadow = brancxoj.castShadow = true;
  // La unuopaj folioj NE ĵetas ombron — folikartoj kun alphaTest farus truajn,
  // tremajn ombrojn sur la teron kaj la ombra mapo duobliĝus por la tuta krono.
  folioj.castShadow = false;
  sceno.add(trunkoj, kronoj, folioj, brancxoj);
  return trunkoj;
}

// konstruiFilikojn — Metu filikojn proksime al arboj kaj vojrandoj.
export function konstruiFilikojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  vojSpecimenoj: THREE.Vector3[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = mulberry32(55661);
  const filikaTeksajxo = kreiFilikanTeksajxon();

  // ⟨ Tri-dimensia filiko 📃 ⟩ — antaŭe ĉiu filiko estis DU KRUCITAJ KARTONOJ
  // kun bildo de filiko sur ili. De malproksime tio eĉ funkciis, sed ĝi estis
  // plate: oni vidis la rektan randon de la ebenoj, la "kruco" montriĝis de
  // supre kiel X, kaj la sama bildo ripetiĝis sur ĉiu specimeno. Nun la filiko
  // estas vera rozeto da ARKAJ FRONDOJ — ĝi uzas la saman konstruilon kiel la
  // grandaj purpuraj filikoj: ĉiu frondo estas rubando ( levita mezo-ripo, la
  // raĥiso, kaj du flankoj kun la filika teksturo ), ĝi leviĝas el la grundo,
  // malfermiĝas eksteren kaj ĝia pinto malleviĝas sub la propra pezo.
  // ⟨ La proporcioj 📃 ⟩ — frondo estas mallarĝa kaj arka: ĉe larĝo 0.26 kontraŭ
  // longo 1.15 ( kaj kun la malplenoj inter la pinnoj la videbla larĝo estas
  // ~0.22 ) ĝi estas kvin-oble pli longa ol larĝa, kiel vera filika frondo.
  // Dek frondoj sufiĉas — pli multe kaŝis la malplenojn inter la pinnoj kaj la
  // rozeto legiĝis kiel solida karno. La frondoj leviĝas pli krute ol antaŭe
  // ( 0.22 rad ) kaj kurbiĝas malpli, do la planto staras kiel filiko kaj ne
  // malfermiĝas kiel agavo.
  const filikaGeometrio = konstruiFrondanKronon(0o11, 0.32, 1.05, 0.20, 0.012, 0.62);
  const filikaMaterialo = new THREE.MeshStandardMaterial({ map: filikaTeksajxo, alphaTest: 0o15/0o50, side: THREE.DoubleSide, roughness: 1 });
  const filikoj = new THREE.InstancedMesh(filikaGeometrio, filikaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let fi = 0;
  let gardilo = 0;
  // Malfermaj filikoj — la foraj, ne-arbaj filikoj klasteriĝas en naturaj
  // arbareroj tra la tuta vala biomo ( ±0o600 ) anstataŭ disiĝi tra la mapo.
  const filikaGrovoj = kreiGrovojn(Math.max(0o4, Math.floor(kvanto / 0o20)), 0o600, hazardaGenerilo, excludeRivers);

  while ( fi < kvanto && gardilo++ < 0o5660 ) {
    let x: number, z: number;
    if ( hazardaGenerilo() < 0o23/0o40 && nearTrees.length ) {
      const t = nearTrees[( hazardaGenerilo() * nearTrees.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 3;
      x = t.x + Math.sin(a) * hazardaRadiuso;
      z = t.z + Math.cos(a) * hazardaRadiuso;
    } else if ( vojSpecimenoj.length ) {
      const p = vojSpecimenoj[( hazardaGenerilo() * vojSpecimenoj.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 2 + hazardaGenerilo() * 3;
      x = p.x + Math.sin(a) * hazardaRadiuso;
      z = p.z + Math.cos(a) * hazardaRadiuso;
    } else {
      const loko = hazardaGrovaLoko(hazardaGenerilo, filikaGrovoj);
      x = loko.x;
      z = loko.z;
    }

    // La biomo — la filikoj restas en la vala biomo.
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) continue;
    if ( excludeRivers(x, z) || excludePaths(x, z, 2) || Math.hypot(x, z) < 0o16 ) continue;
    // Eta interspaco — la filikoj ne kresku unu sur la alia ĉe la arboj.
    if ( !punktoLibera(metitajHasho, x, z, 0o2) ) continue;

    const skalo = 0o55/0o100 + hazardaGenerilo() * 0o63/0o100;
    // Ankaŭ la filikoj kliniĝas iomete — rozeto, kiu staras perfekte vertikale,
    // legiĝas kiel telero de supre.
    E.set(( hazardaGenerilo() - 0o5/0o10 ) * 0o2/0o10, hazardaGenerilo() * Math.PI * 2,
      ( hazardaGenerilo() - 0o5/0o10 ) * 0o2/0o10);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q, new THREE.Vector3(skalo, skalo, skalo));
    filikoj.setMatrixAt(fi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  filikoj.count = fi;
  filikoj.instanceMatrix.needsUpdate = true;
  sceno.add(filikoj);
}

// konstruiMetitanRokon — UNU montara roko cxe preciza pozicio ( la objekta
// ilo de la terena skulptilo ). La sama ikosaedra roko kiel la montaraj
// rokoj, kun hazarda grizeca tono kaj turno — la loka vario.
//     @param x, z ( number ) - Monda pozicio.
//     @param heightFn ( funkcio ) - Tera alta funkcio.
//     @param skalo ( number ) - Grando ( la montaraj rokoj estas 0.5-1.0 ).
//     @param rotacio ( number = -1 ) - La turno en radianoj; -1 = hazarda
//     ( la montaraj rokoj ).
// hashVertico — Determina hazardo por vertico de la roka geometrio. La
// dudekedro NE havas indekson — ĉiu triangulo havas siajn proprajn verticojn,
// do la perturbo devas dependi de la POZICIO ( ne de la vertica indekso ),
// alie la najbaraj trianguloj disiĝus kaj la roko disfalis en ŝelojn.
//     @returns ( number ) - 0…1, la sama por ĉiu kopio de la sama vertico.
function hashVertico(x: number, y: number, z: number, semo: number): number {
  const sx = Math.round(x * 0o1000), sy = Math.round(y * 0o1000), sz = Math.round(z * 0o1000);
  let n = ( sx * 374761393 + sy * 668265263 + sz * 1274126177 + semo * 2654435761 ) | 0;
  n = ( n ^ ( n >> 13 ) ) * 1274126177;
  return (( n ^ ( n >> 16 )) >>> 0) / 4294967296;
}

// konstruiRokGeometrion — Kruda rokbloko. La antaŭa roko estis NEPERTURBITA
// dudekedro: dek du identaj verticoj kaj dudek perfektaj trianguloj, do ĉiu
// roko en la mondo aspektis kiel samegranda globo kun plataj facetoj nur ĉe la
// anguloj de la geometrio. Nun ĉiu vertico estas puŝita laŭ sia radiuso per
// hazarda faktoro ( la facetoj iĝas neregulaj kaj akraj, kiel rompita ŝtono ),
// kaj la suba parto estas kunpremita, por ke la bloko kuŝu sur plata bazo en
// la tero anstataŭ pendi per pinto.
//     @param semo ( number ) - La hazardo-semo — la sama semo donas la saman rokon.
//     @returns geometrio ( THREE.BufferGeometry ) - La roko, radiuso ~1.
function konstruiRokGeometrion(semo = 1): THREE.BufferGeometry {
  // ⟨ Pli da facoj 📃 ⟩ — dudekedro sen subdivido havas dudek triangulojn, do
  // ĉiu faco estas granda plata telero; kune kun la plata bazo la bloko
  // aspektis kiel frakasita kuko ( "splato" ). Kun unu subdivido ( okdek
  // trianguloj ) la facoj malgrandiĝas kaj la silueto povas esti neregula sed
  // GLATA, kiel rulita ŝtonego.
  const geometrio = new THREE.IcosahedronGeometry(1, 1);
  const pozicioj = geometrio.attributes.position;
  for ( let i = 0; i < pozicioj.count; i++ ) {
    let x = pozicioj.getX(i), y = pozicioj.getY(i), z = pozicioj.getZ(i);
    const longo = Math.hypot(x, y, z) || 1;
    const nx = x / longo, ny = y / longo, nz = z / longo;
    // ⟨ Glata perturbo 📃 ⟩ — la radiuso venas el kelkaj sinusoj de la
    // DIREKTO, ne el hazardo po vertico: najbaraj verticoj moviĝas kune, do la
    // surfaco estas kontinua ondaro ( ŝveloj kaj kavoj ) anstataŭ hazarda
    // pinglaro. La semo ŝanĝas la fazojn, do la tri formoj vere malsamas.
    const ondo = ( ax: number, ay: number, az: number, ofto: number ): number =>
      Math.sin(( nx * ax + ny * ay + nz * az ) * 2 + ofto + semo * 0.7);
    const r = 1
      + 0.14 * ondo(1, 0.7, 0.4, 0)
      + 0.09 * ondo(0.5, 1.3, 0.9, 2.1)
      + 0.06 * ondo(1.7, 0.4, 1.1, 4.3);
    x *= r; z *= r;
    // Nur ETA kunpremo — la antaŭa 0.6 ( kaj plia 0.5 sub la mezo ) faris
    // telerojn. Ŝtonego estas iomete pli larĝa ol alta, ne plata.
    y *= r * 0.88;
    if ( y < 0 ) y *= 0.8;
    pozicioj.setXYZ(i, x, y, z);
  }
  geometrio.computeVertexNormals();
  return geometrio;
}

// kreiSxtonanMaterialon — La komuna materialo de la rokoj. La roko estis
// SENDEKORA — nur griza koloro, do ĉiu facetego aspektis kiel plata papero.
// Poste ĝi portis la dioriton de la VOJOJ ( polurita pavimo: fajngrajna kaj
// alta-kontrasta kun preskaŭ blankaj kaj preskaŭ nigraj eroj ), kiu sur granda
// natura ŝtonego aspektis kiel punktita papero. Nun la rokoj havas Sian propran
// paron — malalta kontrasto, pli grandaj eroj, fendoj kaj erodaj makuloj
// ( kreiRokenTeksajxon kaj ĝia bumpo ) — dum la vojoj kaj la lampoj retenas la
// poluritan dioriton. La reliefo ankaŭ estas pli forta ( 0.8 anstataŭ 0.4 ),
// ĉar natura roko estas kruda, ne polurita.
function kreiSxtonanMaterialon(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    roughness: 0.9, metalness: 0,
    map: kreiRokenTeksajxon(),
    bumpMap: kreiRokenBumpanTeksajxon(), bumpScale: 0o4/0o5,
  });
}

export function konstruiMetitanRokon(sceno: THREE.Scene,
  x: number, z: number,
  heightFn: ( x: number, z: number ) => number,
  skalo: number,
  rotacio = -1,
  semo = 0o11
): THREE.InstancedMesh {
  const sxtonaGeometrio = konstruiRokGeometrion(semo);
  const sxtonoj = new THREE.InstancedMesh(sxtonaGeometrio, kreiSxtonanMaterialon(), 1);
  // Vidu la rimarkon en konstruiMontajnRokojn — la instanca koloro multipliĝas
  // kun la teksajxo, do ĝi restas preskaŭ blanka.
  const paletro = [ 0xf2f2f0, 0xffffff, 0xe8e8e4, 0xf6f4f2, 0xece9e3, 0xeff0e2 ];
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  E.set(rotacio >= 0 ? 0 : Math.random() * 0o15/0o40,
    rotacio >= 0 ? rotacio : Math.random() * Math.PI * 2,
    rotacio >= 0 ? 0 : Math.random() * 0o15/0o40);
  Q.setFromEuler(E);
  const y = heightFn(x, z);
  // ⟨ La bloko kuŝas EN la tero 📃 ⟩ — oni metas ĝin tiom profunde, ke la
  // malsupra parto restas sub la grundo, sed ne tiom, ke ĝi malaperas.
  const skaloY = skalo * 0o11/0o12;
  const skaloXZ = skalo * ( 0.9 + Math.random() * 0.3 );
  M.compose(new THREE.Vector3(x, y + skaloY * 0o2/0o10, z),
    Q, new THREE.Vector3(skaloXZ, skaloY, skaloXZ));
  sxtonoj.setMatrixAt(0, M);
  sxtonoj.setColorAt(0, C.setHex(paletro[( Math.random() * paletro.length ) | 0]));
  sxtonoj.instanceMatrix.needsUpdate = true;
  if ( sxtonoj.instanceColor ) sxtonoj.instanceColor.needsUpdate = true;
  sceno.add(sxtonoj);
  return sxtonoj;
}

// konstruiMetitanFilikon — UNU filiko cxe preciza pozicio ( la objekta ilo
// de la terena skulptilo ). Verda aux purpura ( filikaSpeco 0/1 ) kaj hazarda
// turno.
//
// ⟨ Tri-dimensie 📃 ⟩ — ankaŭ ĉi tiu filiko estis DU KRUCITAJ KARTOJ, la
// sama plataĵo kiel la valaj antaŭe: rektaj randaj ebenoj, X-forma kruco de
// supre, kaj unu bildo ripetita sur ĉiu metita planto. Nun ĝi estas la sama
// ARKA ROZETO da frondoj kiel la ceteraj filikoj ( konstruiFilikanRozeton ) —
// la purpura varianto uzas la purpuran frondan geometrion.
//     @param x, z ( number ) - Monda pozicio.
//     @param heightFn ( funkcio ) - Tera alta funkcio.
//     @param skalo ( number ) - Grando ( la valaj filikoj estas 0.55-1.18 ).
//     @param filikaSpeco ( number = 0 ) - 0=verda, 1=purpura.
export function konstruiMetitanFilikon(sceno: THREE.Scene,
  x: number, z: number,
  heightFn: ( x: number, z: number ) => number,
  skalo: number,
  filikaSpeco = 0
): THREE.InstancedMesh {
  const filikaTeksajxo = filikaSpeco === 1 ? kreiPurpuranFrondanTeksajxon(true) : kreiFilikanTeksajxon();
  const filikaGeometrio = filikaSpeco === 1
    ? konstruiPurpuranRozeton(1.35, 0o13, 0.30, true)
    : konstruiFilikanRozeton(1.30, 0o11, 0.20);
  const filikaMaterialo = new THREE.MeshStandardMaterial({ map: filikaTeksajxo, alphaTest: 0o15/0o50, side: THREE.DoubleSide, roughness: 1 });
  const filikoj = new THREE.InstancedMesh(filikaGeometrio, filikaMaterialo, 1);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  E.set(0, Math.random() * Math.PI * 2, 0);
  Q.setFromEuler(E);
  M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q, new THREE.Vector3(skalo, skalo, skalo));
  filikoj.setMatrixAt(0, M);
  filikoj.count = 1;
  filikoj.instanceMatrix.needsUpdate = true;
  sceno.add(filikoj);
  return filikoj;
}

// konstruiPurpurajnPlantojn — Metu malaltajn purpurajn plantojn en la arbara rando.
export function konstruiPurpurajnPlantojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[]
): void {
  // Densa, malalta varianto — pli da frondoj, pli mallarĝe malfermitaj.
  konstruiPeriferianFilikanAreon(sceno, kvanto, heightFn, excludeRivers, excludePaths, excludeBuildings,
    kreiPurpuranFrondanTeksajxon(true), 0.95, 0o15, 0.32, true, 0o53104, biomojFiltro);
}

// konstruiPurpurajnFilikojn — Metu pli altajn purpurajn filikojn inter la eksteraj arboj.
export function konstruiPurpurajnFilikojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[]
): void {
  konstruiPeriferianFilikanAreon(sceno, kvanto, heightFn, excludeRivers, excludePaths, excludeBuildings,
    kreiPurpuranFrondanTeksajxon(), 1.45, 0o13, 0.26, false, 0o53114, biomojFiltro);
}

// konstruiPeriferianFilikanAreon — Tri-dimensia purpura filiko por natura arbara rando.
function konstruiPeriferianFilikanAreon(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  teksajxo: THREE.CanvasTexture,
  alto: number,
  nombro: number,
  malfermo: number,
  densa: boolean,
  semo: number,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = mulberry32(semo);
  // ⟨ Tri-dimensia purpura filiko 📃 ⟩ — la sama arka fronda rozeto kiel la
  // verdaj filikoj, kun la purpuraj pinnoj. Antaŭe ĉiu planto estis KVAR
  // KRUCITAJ EBENOJ kun pentrita planto: la rektaj randaj randoj videblis, la
  // kruco aspektis kiel X de supre, kaj ĉiuj specimenoj montris la saman
  // bildon. Nun ĉiu estas vera frondaro, do ĝi legiĝas kiel filiko el ĉiu
  // angulo, kaj la frondoj ricevas la lumon malsame laŭ sia tuta longo.
  const materialo = new THREE.MeshStandardMaterial({ map: teksajxo, alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 });
  const plantoj = new THREE.InstancedMesh(
    konstruiPurpuranRozeton(alto, nombro, malfermo, densa), materialo, kvanto);

  // Arbareroj — la purpuraj plantoj klasteriĝas en naturaj makuloj tra la
  // tuta vala biomo ( ±0o600 ), anstataŭ egala ringo ĉirkaŭ la urbo.
  const grovoj = kreiGrovojn(Math.max(0o4, Math.floor(kvanto / 0o20)), 0o600, hazardaGenerilo, excludeRivers);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let pi = 0;
  let gardilo = 0;

  while ( pi < kvanto && gardilo++ < 0o10000 ) {
    const loko = hazardaGrovaLoko(hazardaGenerilo, grovoj);
    const x = loko.x;
    const z = loko.z;
    if ( Math.abs(x) > 0o600 || Math.abs(z) > 0o600 ) continue;
    // La biomo — la purpuraj plantoj restas en la vala biomo.
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) continue;
    if ( excludeRivers(x, z) ) continue;
    if ( excludePaths(x, z, 0o2) ) continue;
    if ( excludeBuildings(x, z, 0o2) ) continue;
    // Eta interspaco — la purpuraj plantoj restu distingeblaj, ne unu sur la alia.
    if ( !punktoLibera(metitajHasho, x, z, 0o2) ) continue;

    const skalo = 0o6/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(skalo, skalo, skalo));
    plantoj.setMatrixAt(pi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  plantoj.count = pi;
  plantoj.instanceMatrix.needsUpdate = true;
  sceno.add(plantoj);
}

// konstruiAltajnPurpurajnFilikojn — Metu arboformajn purpurajn filikojn ĉe la arbara rando.
// La folioj kreskas tavole laŭ la trunko kaj la trunko transiras al ili
// senjunte — kiel la Ĥŝakŝlefo.
//     @param evituArbojn ( ArboMetado[] = [] ) - Jam metitaj arboj; la filikoj
//         restas ekster la trunkoj/kronoj anstataŭ kreski en la arbojn.
export function konstruiAltajnPurpurajnFilikojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  evituArbojn: ArboMetado[] = [],
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = mulberry32(0o53120);
  const specoj = [
    { trunkaAlto: 0o74/0o10, kronaAlto: 0o73/0o10, kronaLargho: 0o16/0o10, nombro: 0o10, mallevo: 0o10/0o10, densa: false },
    { trunkaAlto: 0o56/0o10, kronaAlto: 0o54/0o10, kronaLargho: 0o12/0o10, nombro: 0o6, mallevo: 0o4/0o10, densa: true },
    { trunkaAlto: 0o124/0o10, kronaAlto: 0o43/0o10, kronaLargho: 0o12/0o10, nombro: 5, mallevo: 0o11/0o10, densa: false },
  ];
  // Ĉiu speco havas sian tavolnombron — la folioj kreskas tavole.
  const TAVOLOJ = [ 2, 3, 4 ];
  const kronajGeometrioj = specoj.map(( speco, i ) => konstruiTavolanFrondanKronon(speco, TAVOLOJ[i]));
  const trunkajGeometrioj = specoj.map(speco => new THREE.CylinderGeometry(
    PURPURAJ_TRUNKAJ_RADIOJ.supro, PURPURAJ_TRUNKAJ_RADIOJ.malsupro, speco.trunkaAlto, 7));
  // La trunka sxoelo — komuna teksturo kun reliefo; la tri specoj havas
  // subtilajn helo-nuancojn, kaj la instancoj etan hazardan variaĵon.
  const trunkajMaterialoj = specoj.map(( _, i ) => new THREE.MeshStandardMaterial({
    map: kreiPurpuranTrunkanTeksajxon(), bumpMap: kreiPurpuranTrunkanBumpanTeksajxon(),
    bumpScale: 0o6/0o10, color: [ 0xffffff, 0xf8f0f8, 0xe8e0e8 ][i], roughness: 0o7/0o10,
  }));
  const kronajMaterialoj = specoj.map(speco => new THREE.MeshStandardMaterial({
    map: kreiPurpuranTronkofilikanTeksajxon(speco.densa), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1,
  }));
  const nombroj = specoj.map(() => Math.ceil(kvanto / specoj.length));
  const trunkoj = trunkajGeometrioj.map(( geometrio, i ) => new THREE.InstancedMesh(geometrio, trunkajMaterialoj[i], nombroj[i]));
  const kronoj = kronajGeometrioj.map(( geometrio, i ) => new THREE.InstancedMesh(geometrio, kronajMaterialoj[i], nombroj[i]));
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const indicoj = specoj.map(() => 0);
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let provoj = 0;
  // Arbareroj — la altaj purpuraj filikoj kreskas en naturaj makuloj tra la
  // tuta vala biomo ( ±0o600 ), ne en ringo.
  const grovoj = kreiGrovojn(Math.max(0o4, Math.floor(kvanto / 0o20)), 0o600, hazardaGenerilo, excludeRivers);

  while ( indicoj.reduce(( a, b ) => a + b, 0) < kvanto && provoj++ < 0o10000 ) {
    const loko = hazardaGrovaLoko(hazardaGenerilo, grovoj);
    const x = loko.x;
    const z = loko.z;
    if ( Math.abs(x) > 0o600 || Math.abs(z) > 0o600 ) continue;
    // La biomo — la altaj purpuraj filikoj restas en la vala biomo.
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) continue;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o3) || excludeBuildings(x, z, 0o3) ) continue;
    // Ne lasu la arboformajn filikojn kreski unu EN la alian — la triangulara
    // grova disdono densigas la centrojn, kaj sen interspaco multaj specimenoj
    // kreskis je preskaŭ la sama loko, kun la frondaj kronoj trapenetrantaj.
    // La interspaco estas krona-konscia. la plej larĝa krono ( 0o16/0o10 ) je
    // la plej granda skalo ( 0o16/0o10 ) larĝas ≈ 2.6 unuojn, do la efika
    // duon-radiuso estas ≈ 1.6 ( 8/5 ) kun la pendantaj frondoj.
    let troProksima = !punktoLibera(metitajHasho, x, z, 0o146/0o100 * 0o2 + 0o3);
    // Ankaŭ ne en la arbojn — la trunko kaj la pendantaj kronoj de la filiko
    // restas ekster la krona radiuso de ĉiu jam metita arbo ( plus la libero ).
    if ( !troProksima ) {
      for ( const arbo of evituArbojn ) {
        if ( Math.hypot(x - arbo.x, z - arbo.z) <
          ( arbo.r ?? kronaRadiusoBetula(arbo.s) ) + 0o146/0o100 + KRONA_LIBERO ) { troProksima = true; break; }
      }
    }
    if ( troProksima ) continue;

    // Hazardelektu la specion — malsamaj trunkoj/kronoj donas diversajn grandecojn.
    let specoIndico = ( hazardaGenerilo() * specoj.length ) | 0;
    if ( indicoj[specoIndico] >= nombroj[specoIndico] ) {
      specoIndico = indicoj.findIndex(( n, j ) => n < nombroj[j]);
      if ( specoIndico < 0 ) break;
    }
    const speco = specoj[specoIndico];
    const skalo = 0o5/0o10 + hazardaGenerilo() * 0o11/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    const y = heightFn(x, z);
    // La translokigoj devas inkluzivi la saman specimenan skalon kiel la geometrio.
    // Alie la trunko malleviĝas kaj la krono flosas super ĝi ĉe malgrandaj skaloj.
    const trunkaCentroY = y + speco.trunkaAlto * skalo / 2;
    // La tavola krono-geometrio estas baz-ankrita ĉe la trunka bazo — la plej
    // suba tavolo komenciĝas duone laŭ la trunko, do la trunko transiras al
    // la folioj senjunte.
    const kronaCentroY = y;
    M.compose(new THREE.Vector3(x, trunkaCentroY, z), Q, new THREE.Vector3(skalo, skalo, skalo));
    trunkoj[specoIndico].setMatrixAt(indicoj[specoIndico], M);
    // Eta helo-variaĵo po trunko — la sxoelo ne estas identa ĉie.
    const helo = 0.92 + hazardaGenerilo() * 0.08;
    C.setRGB(helo, helo * 0.98, helo * 1.02);
    trunkoj[specoIndico].setColorAt(indicoj[specoIndico], C);
    M.compose(new THREE.Vector3(x, kronaCentroY, z), Q, new THREE.Vector3(skalo, skalo, skalo));
    kronoj[specoIndico].setMatrixAt(indicoj[specoIndico], M);
    indicoj[specoIndico]++;
    metitajHasho.meti(x, z, [ x, z ]);
  }

  trunkoj.forEach(( mesh, i ) => {
    mesh.count = indicoj[i]; mesh.instanceMatrix.needsUpdate = true; mesh.castShadow = true; sceno.add(mesh);
    if ( mesh.instanceColor ) mesh.instanceColor.needsUpdate = true;
  });
  kronoj.forEach(( mesh, i ) => { mesh.count = indicoj[i]; mesh.instanceMatrix.needsUpdate = true; mesh.castShadow = true; sceno.add(mesh); });
}

// konstruiFrondanKronon — La frondoj de unu tavolo. ĈIU FRONDO ESTAS KURBA
// RUBANDO, ne plata ortangulo.
//
// ⟨ Kial 📃 ⟩ — antaŭe ĉiu frondo estis `PlaneGeometry` ( plata kartono )
// klinita per unu rotacio: la frondoj estis ebenaj teleroj elstarantaj el la
// trunko, kaj de la flanko la krono aspektis kiel radio de glavoj. Filika
// frondo estas ARKO: ĝi leviĝas el la trunko, ĝi malfermiĝas eksteren kaj ĝia
// pinto MALLEVIĝAS sub la propra pezo. La rubando nun havas tri kolonojn
// ( levita mezo-ripo — la raĥiso — kaj du flankoj ) kaj ses segmentojn, kaj
// ĝi ankaŭ TORDIĝAS laŭ sia longo, do ĉiu frondo estas vera kurbiĝinta
// surfaco, kiu kaptas la lumon malsame laŭ sia tuta longo.
//     @param nombro ( number ) - Kiom da frondoj en la krono.
//     @param largho ( number ) - La larĝo de frondo ĉe sia bazo.
//     @param alto ( number ) - La longo de la frondo ( laŭ la arko ).
//     @param mallevo ( number ) - La elira klino de la frondoj.
//     @param radiuso ( number ) - La trunka radiuso ĉe ĉi tiu tavolo.
//     @returns geometrio ( THREE.BufferGeometry ) - La krono de la tavolo.
function konstruiFrondanKronon(nombro: number, largho: number, alto: number, mallevo: number,
  radiuso = 0, kurbiFaktoro = 1): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  const SEGMENTOJ = 0o6;
  for ( let i = 0; i < nombro; i++ ) {
    const frakcio = i / nombro;
    const ang = frakcio * Math.PI * 2;
    // Ĉiu frondo kurbiĝas alie — la krono ne estas rado. Per granda
    // kurbiFaktoro la frondo ruliĝas en sin ( la krozo de filiko ).
    const kurbiĝo = alto * ( 0.30 + ( i % 0o3 ) * 0.09 ) * kurbiFaktoro;
    const tordo = ( ( i % 0o5 ) - 2 ) * 0.10;
    const pozicioj: number[] = [];
    const uvoj: number[] = [];
    const indeksoj: number[] = [];
    for ( let s = 0; s <= SEGMENTOJ; s++ ) {
      const t = s / SEGMENTOJ;
      // La centro de la frondo — ĝi leviĝas, kurbiĝas eksteren ( +z ) kaj la
      // pinto ankaŭ iomete malleviĝas sub la propra pezo.
      const cy = alto * ( t - 0.10 * t * t );
      const cz = kurbiĝo * Math.pow(t, 1.7);
      // La larĝo — plej larĝa ĉe la malsupro, mallarĝiĝanta al la pinto; la
      // pinto tamen ne estas punkto ( la teksturo portas sian propran silueton ).
      const hw = largho * 0.5 * ( 1 - 0.55 * Math.pow(t, 2.2) );
      // La mezo-ripo — la raĥiso — estas levita super la foliplato.
      const ripo = Math.max(hw * 0.55, largho * 0.10);
      const a = tordo * t;
      const cos = Math.cos(a), sin = Math.sin(a);
      const kolonoj: [ number, number ][] = [ [ -hw, 0 ], [ 0, ripo ], [ hw, 0 ] ];
      for ( let kol = 0; kol < 0o3; kol++ ) {
        const dx = kolonoj[kol][0], dz = kolonoj[kol][1];
        pozicioj.push(dx * cos - dz * sin, cy, cz + dx * sin + dz * cos);
        uvoj.push(kol === 0 ? 0 : ( kol === 1 ? 0.5 : 1 ), t);
      }
    }
    for ( let s = 0; s < SEGMENTOJ; s++ ) {
      for ( let kol = 0; kol < 0o2; kol++ ) {
        const a = s * 0o3 + kol, b = a + 1, c = a + 0o3, d = a + 0o4;
        indeksoj.push(a, c, b, b, c, d);
      }
    }
    const frondo = kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
    // La frondo eliras el la trunka surfaco: unue la elira klino, poste la
    // turno ĉirkaŭ la trunko, fine la puŝo eksteren laŭ la trunka radiuso.
    frondo.applyMatrix4(new THREE.Matrix4().makeRotationX(mallevo));
    frondo.applyMatrix4(new THREE.Matrix4().makeRotationY(ang));
    // La bazo sidas sur la trunka surfaco — kaj iomete INTERNE, por ke nenia
    // interspaco videblu ĉe la kunmeto.
    frondo.translate(Math.sin(ang) * radiuso * 0.8, 0, Math.cos(ang) * radiuso * 0.8);
    partoj.push(frondo);
  }
  const geometrio = kunfandiGeometriojnSenIndekson(partoj);
  geometrio.computeBoundingBox();
  if ( geometrio.boundingBox ) geometrio.translate(0, -geometrio.boundingBox.min.y, 0);
  return geometrio;
}

// konstruiFilikanRozeton — Filika rozeto SUR LA GRUNDO: frondoj elirantaj el
// komuna bazo, sen trunko. Ĝi estas la sama arka frondo kiel ĉe la arboformaj
// filikoj, do la planto legiĝas kiel filiko el ĉiu angulo kaj NE kiel du
// krucitaj kartoj ( la rektaj randaj ebenoj kaj la X-forma kruco de supre ).
//
// ⟨ Proporcio 📃 ⟩ — filika frondo larĝas ~30% de sia longo, kaj la malfermita
// rozeto ( kun la kurbiĝo de ĉiu frondo kaj la lasta klino ) altiĝas al ~93% de
// la fronda longo. La parametro `alto` estas la ALTO DE LA PLANTO, do la
// fronda longo kaj la baza radiuso estas derivitaj el ĝi — ĉiuj filikoj en la
// mondo tiel havas la samajn proporciojn.
//     @param alto ( number ) - Kiom alta estas la tuta planto.
//     @param nombro ( number ) - Kiom da frondoj en la rozeto.
//     @param malfermo ( number ) - La elira klino de la frondoj.
//     @returns geometrio ( THREE.BufferGeometry ) - La rozeto, baz-ankrita.
function konstruiFilikanRozeton(alto: number, nombro: number, malfermo: number): THREE.BufferGeometry {
  return konstruiFrondanKronon(nombro, alto * 0.32, alto / 0.93, malfermo, alto * 0.012, 0.62);
}

// konstruiPurpuranRozeton — La PURPURA filiko sur la grundo — la sama arka
// frondo, kun la purpuraj pinnoj. La densa varianto ( malaltaj, densaj plantoj
// ĉe la rando de la arbaro ) havas pli da frondoj, kiuj malfermiĝas pli
// mallarĝe, do la rozeto estas pli kompakta kaj la planto pli malalta.
//     @param alto ( number ) - Kiom alta estas la tuta planto.
//     @param nombro ( number ) - Kiom da frondoj en la rozeto.
//     @param malfermo ( number ) - La elira klino de la frondoj.
//     @param densa ( boolean = false ) - Ĉu la densa, malalta varianto.
//     @returns geometrio ( THREE.BufferGeometry ) - La rozeto, baz-ankrita.
function konstruiPurpuranRozeton(alto: number, nombro: number, malfermo: number,
  densa = false): THREE.BufferGeometry {
  return konstruiFrondanKronon(nombro, alto * ( densa ? 0.30 : 0.34 ), alto / 0.93,
    malfermo, alto * 0.012, densa ? 0.78 : 0.62);
}

// konstruiTavolanFrondanKronon — Kunu plurajn frondajn tavolojn laŭ la trunko,
// por ke la folioj kresku tavole kaj la trunko transiru al ili senjunte. La plej
// suba tavolo estas ĉe y=0 ( la trunka bazo ); la supraj sekvas la trunk-alton.
//     @param speco ( objekto ) - La speco-datumoj.
//     @param tavoloj ( number ) - Kiom da foliaj tavoloj.
//     @returns geometrio ( THREE.BufferGeometry ) - La tavola krono.
function konstruiTavolanFrondanKronon(speco: {
  trunkaAlto: number; kronaAlto: number; kronaLargho: number; nombro: number; mallevo: number;
}, tavoloj: number): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  for ( let t = 0; t < tavoloj; t++ ) {
    // La plej suba tavolo duone laŭ la trunko; la supro ĝuste sur la trunka
    // pinto — la supraj folioj kuŝas sur la trunko, nek sub nek super ĝi,
    // ĉe ĉiu plant-grandeco ( ĉio estas proporcia al la trunka alto ).
    const frakcio = 0o1/0o2 + t * ( 0o1/0o2 / ( tavoloj - 1 ) );
    // La malsupraj folioj estas pli malgrandaj; la supraj plenaj.
    const skaloT = 0o1/0o2 + t * ( 0o1/0o2 / ( tavoloj - 1 ) );
    // La trunka radiuso ĉe tiu alto ( la trunko pintigas de malsupro al supro ) —
    // la frondoj eliras el la trunka surfaco, ne sub ĝi.
    const trunkaRadiuso = PURPURAJ_TRUNKAJ_RADIOJ.malsupro
      - frakcio * ( PURPURAJ_TRUNKAJ_RADIOJ.malsupro - PURPURAJ_TRUNKAJ_RADIOJ.supro );
    const frondo = konstruiFrondanKronon(speco.nombro,
      speco.kronaLargho * skaloT, speco.kronaAlto * skaloT, speco.mallevo, trunkaRadiuso);
    frondo.translate(0, speco.trunkaAlto * frakcio, 0);
    partoj.push(frondo);
  }
  // ⟨ La krozoj 📃 ⟩ — la nova pinto de la filikarbo. Vero filiko portas ĉe sia
  // pinto kelkajn ĴUS malfermiĝantajn frondojn, RULIGITAJN en sin kiel
  // violono-sxlosilo ( la krozoj ). Ili estas la signo, kiun la okulo uzas por
  // legi planton kiel filikon, kaj sen ili la trunka pinto estis nuda bastono.
  // Tri mallongaj, forte kurbaj frondoj ĉe la trunka supro — laŭ tri anguloj.
  const krozoj = konstruiFrondanKronon(0o3, speco.kronaLargho * 0.32,
    speco.kronaAlto * 0.38, speco.mallevo * 0.2 + 0.55,
    PURPURAJ_TRUNKAJ_RADIOJ.supro, 1.35);
  krozoj.translate(0, speco.trunkaAlto * 0.98, 0);
  partoj.push(krozoj);
  return kunfandiGeometriojnSenIndekson(partoj);
}

// konstruiLikenSxtonojn — Metu liken-kovritajn sxtonojn en la arbaron.
// Kelkaj sxtonoj portas verdan likenan nuancon, la aliaj restas grizaj.
//     @returns metitaj ( ArboMetado[] ) - La pozicioj de la metitaj sxtonoj,
//         por ke la likenoj povas grupigi ĉirkaŭ ili.
export function konstruiLikenSxtonojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean
): ArboMetado[] {
  const hazardaGenerilo = mulberry32(99221);
  const sxtonaGeometrio = konstruiRokGeometrion(0o33);
  const sxtonoj = new THREE.InstancedMesh(sxtonaGeometrio,
    kreiSxtonanMaterialon(), kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  // Verdete grizaj tonoj — ankaŭ pli helaj pro la nova ŝtona teksaĵo.
  const paletro = [ 0x88a090, 0x98a898, 0x88a090, 0xa8b890, 0xb8c8a0, 0x98a898 ];
  const metitaj: ArboMetado[] = [];

  for ( let i = 0; i < kvanto; i++ ) {
    let x: number, z: number;
    const a = hazardaGenerilo() * Math.PI * 2;
    const hazardaRadiuso = 0o22 + hazardaGenerilo() * 0o160;
    x = Math.sin(a) * hazardaRadiuso;
    z = Math.cos(a) * hazardaRadiuso;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) ) { i--; continue; }

    const skaloY = 0o4/0o10 + hazardaGenerilo() * 0o4/0o10;
    E.set(hazardaGenerilo() * 0o15/0o40, hazardaGenerilo() * Math.PI * 2, hazardaGenerilo() * 0o15/0o40);
    Q.setFromEuler(E);
    const y = heightFn(x, z);
    M.compose(new THREE.Vector3(x, y + skaloY * 0o2/0o10, z),
      Q,
      new THREE.Vector3(skaloY * ( 0.9 + hazardaGenerilo() * 0.4 ),
        skaloY * 0o7/0o10,
        skaloY * ( 0.9 + hazardaGenerilo() * 0.4 )));
    sxtonoj.setMatrixAt(i, M);
    sxtonoj.setColorAt(i, C.setHex(paletro[( hazardaGenerilo() * paletro.length ) | 0]));
    metitaj.push({ x, z, h: y, s: skaloY });
  }

  sxtonoj.instanceMatrix.needsUpdate = true;
  if ( sxtonoj.instanceColor ) sxtonoj.instanceColor.needsUpdate = true;

  sceno.add(sxtonoj);
  return metitaj;
}

// konstruiKrustanLikenGeometrion — Konstruu tridimensian krustan likenan
// geometrion anstataŭ platan ebenon. Maldika kupolo kun neregulaj tuberoj,
// kun planaj UV-oj ( la tuta likena teksajxo kuŝas sur la supro ) — la
// alphaTest tranĉas la eksteron, do la videbla formo sekvas la loban makulon
// kaj la tuberoj kaptas lumon. La kupolo atingas nulon ĉe la makula rando,
// do la krusto kuŝas plate sur la tero sen kruta rando.
//     @returns geometrio ( THREE.BufferGeometry ) - La krusta disko.
function konstruiKrustanLikenGeometrion(): THREE.BufferGeometry {
  const segmentoj = 0o40, ringoj = 0o4;
  const radio = 0o10/0o10;
  const dikeco = 0o15/0o100;
  const fazo1 = Math.random() * Math.PI * 2;
  const fazo2 = Math.random() * Math.PI * 2;
  // alto — La kupola alto ĉe ( t, a ), kie t estas la radiusa frakcio kaj
  // a la angulo. La kupolo pintiĝas en la centro kaj malaperas ĉe la rando
  // de la makulo ( t ≈ 0o7/0o10 ); la tuberoj donas neregulan reliefon.
  const alto = ( t: number, a: number ): number => {
    const kupolo = Math.max(0, Math.cos(t * 0o16/0o10));
    const tubero = 0o15/0o100 * Math.sin(a * 0o3 + fazo1) * Math.sin(t * Math.PI)
      + 0o1/0o10 * Math.sin(a * 0o7 + fazo2) * Math.sin(t * Math.PI * 0o3/0o2);
    return dikeco * kupolo * ( 1 + tubero );
  };
  const pozicioj: number[] = [];
  const uv: number[] = [];
  const indeksoj: number[] = [];
  // Centro.
  pozicioj.push(0, alto(0, 0), 0);
  uv.push(0o5/0o10, 0o5/0o10);
  // Ringoj — ĉiu vertico havas planajn UV-ojn ( x, z → u, v ), do la tuta
  // teksajxo kuŝas sur la supro kaj la makulo aperas en la centro.
  for ( let r = 1; r <= ringoj; r++ ) {
    const t = r / ringoj;
    for ( let sIdx = 0; sIdx < segmentoj; sIdx++ ) {
      const a = sIdx / segmentoj * Math.PI * 2;
      const x = Math.cos(a) * radio * t;
      const z = Math.sin(a) * radio * t;
      pozicioj.push(x, alto(t, a), z);
      uv.push(x * 0o5/0o10 + 0o5/0o10, z * 0o5/0o10 + 0o5/0o10);
    }
  }
  // Indeksoj — centro-fano kaj ringaj kvadratoj.
  for ( let sIdx = 0; sIdx < segmentoj; sIdx++ ) {
    const s2 = ( sIdx + 1 ) % segmentoj;
    indeksoj.push(0, 1 + sIdx, 1 + s2);
  }
  for ( let r = 1; r < ringoj; r++ ) {
    const sube = 1 + ( r - 1 ) * segmentoj;
    const supre = 1 + r * segmentoj;
    for ( let sIdx = 0; sIdx < segmentoj; sIdx++ ) {
      const s2 = ( sIdx + 1 ) % segmentoj;
      indeksoj.push(sube + sIdx, supre + sIdx, supre + s2);
      indeksoj.push(sube + sIdx, supre + s2, sube + s2);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj: uv });
}

// konstruiFrutikosanLikenGeometrion — Konstruu la arbustforman likenan
// geometrion. Pluraj tufoj el krucitaj vertikalaj klingoj, ĉiu kun la sama
// branĉiĝanta trunketa teksajxo — la tridimensia formo de frutikosa likeno
// ( Cladonia, boaclikeno ). La tufoj sidas en malgranda disko kaj leviĝas
// de la tero.
//     @returns geometrio ( THREE.BufferGeometry ) - La arbusta tufaro.
function konstruiFrutikosanLikenGeometrion(): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  const tuftoj = 0o4;
  for ( let t = 0; t < tuftoj; t++ ) {
    const x = ( Math.random() - 0o5/0o10 ) * 0o4/0o10;
    const z = ( Math.random() - 0o5/0o10 ) * 0o4/0o10;
    const alto = 0o5/0o10 + Math.random() * 0o4/0o10;
    const largho = 0o16/0o100 + Math.random() * 0o1/0o10;
    const ang = Math.random() * Math.PI * 2;
    const a = new THREE.PlaneGeometry(largho, alto).translate(0, alto / 2, 0);
    const b = a.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    const tufto = kunfandiDuGeometriojn(a, b);
    tufto.applyMatrix4(new THREE.Matrix4().makeRotationY(ang));
    tufto.translate(x, 0, z);
    partoj.push(tufto);
  }
  return kunfandiGeometriojnSenIndekson(partoj);
}

// konstruiByssoidanLikenGeometrion — Konstruu la bisoidan likenan geometrion.
// Plata laneca nubo — interkovrantaj platigitaj sferoj kun planaj UV-oj, por
// ke la supro-direkta lana teksajxo kuŝu sur la supro anstataŭ ĉirkaŭvolvi
// pilkon. Antaŭe la sfera UV-ado ( la nubo ĉe la ekvatoro, la travideblaj
// polusoj tranĉitaj ) kaj la apenaŭa platigo ( 0o7/0o10 ) lasis la nubon
// aspekti kiel pilko staranta sur sia flanko anstataŭ kuŝanta sur la tero.
//     @returns geometrio ( THREE.BufferGeometry ) - La lana nubo.
function konstruiByssoidanLikenGeometrion(): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  const nombro = 0o3 + ( ( Math.random() * 0o3 ) | 0 );
  for ( let i = 0; i < nombro; i++ ) {
    const r = 0o2/0o10 + Math.random() * 0o2/0o10;
    const x = ( Math.random() - 0o1/0o2 ) * 0o4/0o10;
    const z = ( Math.random() - 0o1/0o2 ) * 0o4/0o10;
    const sfero = new THREE.SphereGeometry(r, 0o10, 6);
    // Planaj UV-oj — projekciu x,z sur la teksajxon, do la tuta lana nubo
    // kuŝas sur la plata supro ( la sama principo kiel la krusta disko ).
    const pozicio = sfero.attributes.position;
    const uv = new Float32Array(pozicio.count * 2);
    for ( let j = 0; j < pozicio.count; j++ ) {
      uv[j * 2] = pozicio.getX(j) / ( 2 * r ) + 0o1/0o2;
      uv[j * 2 + 1] = pozicio.getZ(j) / ( 2 * r ) + 0o1/0o2;
    }
    sfero.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    // Forta platigo — la nubo kuŝas kiel maldika laneca pato sur la tero,
    // kun la malsupro iomete en la grundo.
    sfero.applyMatrix4(new THREE.Matrix4().makeScale(1, 0o3/0o10, 1));
    sfero.translate(x, r * 0o2/0o10, z);
    partoj.push(sfero);
  }
  return kunfandiGeometriojnSenIndekson(partoj);
}

// konstruiLikenojn — Metu likenajn makulojn sur la arbaran teron. Tri formoj
// miksiĝas. frutikoza ( arbusta ), folia ( plata disko ) kaj bisoida ( lana
// nubo ). Ĉiu makulo kuŝiĝas laŭ la loka deklivo — la normalo venas el tri
// teraj specimenoj, do la makulo sekvas la monteton kaj ne tranĉas en ĝin.
// La makuloj grupigas apud arboj kaj sxtonoj, kaj kelkaj sterniĝas hazarde.
// En la montara reĝimo ( montara = true ) la hazardaj makuloj uzas la saman
// spron-siluetan x-envelopon kaj altecan akcepton kiel la montaj rokoj — la
// likenoj sterniĝas super la kresto kaj la supraj deklivoj, kongrue kun la
// nova rokzono kaj arbolinia fado, anstataŭ en rektangula bando.
//     @param nearTrees ( ArboMetado[] ) - Arboj por la grupigado.
//     @param nearSxtonoj ( ArboMetado[] ) - Liken-sxtonoj por la grupigado.
//     @param montara ( boolean ) - Montara reĝimo ( spur-silueta alta disdono ).
export function konstruiLikenojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  nearSxtonoj: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  montara = false
): void {
  const hazardaGenerilo = mulberry32(0o72331);

  // Tri likenaj formoj — frutikoza ( arbusta ), folia ( plata ) kaj bisoida
  // ( lana ). Ĉiu havas sian geometrion kaj teksajxon; la loto elektas la
  // formon por ĉiu makulo.
  const formoj = [
    { geometrio: konstruiFrutikosanLikenGeometrion(), teksajxo: kreiFrutikosanLikenanTeksajxon() },
    { geometrio: konstruiKrustanLikenGeometrion(), teksajxo: kreiFolisanLikenanTeksajxon() },
    { geometrio: konstruiByssoidanLikenGeometrion(), teksajxo: kreiByssoidanLikenanTeksajxon() },
  ].map(( formo ) => {
    const reto = new THREE.InstancedMesh(formo.geometrio,
      new THREE.MeshStandardMaterial({
        map: formo.teksajxo, alphaTest: 0o15/0o40, side: THREE.DoubleSide,
        transparent: true, depthWrite: false, roughness: 1,
      }), kvanto);
    return { reto, nombro: 0 };
  });

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const yawQ = new THREE.Quaternion();
  const vertikala = new THREE.Vector3(0, 1, 0);
  const normalo = new THREE.Vector3();
  const ena = new THREE.Vector3();
  const enX = new THREE.Vector3();
  const enZ = new THREE.Vector3();
  const ankroj = [ ...nearTrees, ...nearSxtonoj ];
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let li = 0;
  let gardilo = 0;

  // Montara reĝimo — la sama pieda fado, spron-silueta x-envelopo kaj inversa
  // alteca akcepto kiel en konstruiMontajnRokojn ( zMin = 0o260 ).
  const sudaFado = ( z: number ): number => glataPaso(0o260, 0o300, z);
  const xEnvelopo = ( z: number ): number => spronaDuono(0o340, z, sudaFado);
  const altaAkcepto = ( h: number ): number => glataPaso(0o14, 0o26, h);

  while ( li < kvanto && gardilo++ < 0o10000 ) {
    let x: number, z: number;
    if ( montara ) {
      // Montara disdono — la samaj spur-siluetaj formoj kiel la rokoj.
      z = 0o260 + hazardaGenerilo() * 0o160;
      if ( hazardaGenerilo() > sudaFado(z) ) continue;
      x = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo(z);
    } else if ( ankroj.length && hazardaGenerilo() < 0o3/0o4 ) {
      const t = ankroj[( hazardaGenerilo() * ankroj.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 3;
      x = t.x + Math.sin(a) * hazardaRadiuso;
      z = t.z + Math.cos(a) * hazardaRadiuso;
    } else {
      const a = hazardaGenerilo() * Math.PI * 2;
      const r = 0o20 + 0o160 * Math.sqrt(hazardaGenerilo());
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
    }
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) ) continue;
    if ( Math.hypot(x, z) < 0o20 ) continue;
    // Montara alteca akcepto — la likenoj sterniĝas sur la supraj deklivoj.
    if ( montara && hazardaGenerilo() > altaAkcepto(heightFn(x, z)) ) continue;
    // Eta interspaco — la makuloj ne kuŝu unu sur la alia.
    if ( !punktoLibera(metitajHasho, x, z, 0o2) ) continue;

    const skalo = 0o6/0o10 + hazardaGenerilo() * 0o12/0o10;
    // Tri teraj specimenoj difinas la deklivan normalon.
    const paso = skalo * 0o1/0o2;
    ena.set(x, heightFn(x, z), z);
    enX.set(x + paso, heightFn(x + paso, z), z).sub(ena);
    enZ.set(x, heightFn(x, z + paso), z).sub(ena);
    normalo.crossVectors(enZ, enX).normalize();
    // Ne lasu la makulon stari sur sia flanko ĉe krutaj deklivoj ( la
    // rivervalaj muroj, la montetaj flankoj ) — limigu la klinon al malgranda
    // angulo, por ke la likeno ĉiam kuŝu preskaŭ plate kaj neniam aperu rande.
    // La normalo estas rekonstruita je la limigita klino, do eĉ preskaŭ
    // vertikala muro donas platan makulon ( ne unu starantan rande ).
    const vert = normalo.y;
    const horiz = Math.hypot(normalo.x, normalo.z);
    const maxKruteco = Math.PI / 16; // ≈ 11° — ĉiam kuŝu plate
    if ( horiz > 0o1/0o2000 && Math.atan2(horiz, Math.max(vert, 0o1/0o2000)) > maxKruteco ) {
      const u = Math.tan(maxKruteco);
      const hx = normalo.x / horiz;
      const hz = normalo.z / horiz;
      normalo.set(hx * u, 1, hz * u);
    }
    normalo.normalize();
    Q.setFromUnitVectors(vertikala, normalo);
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    yawQ.setFromEuler(E);
    Q.multiply(yawQ);
    M.compose(new THREE.Vector3(x, ena.y + 0o1/0o40, z), Q,
      new THREE.Vector3(skalo, skalo, skalo));
    // Forma loto — la tri likenaj formoj miksiĝas sur la tero.
    const loto = hazardaGenerilo();
    const elekto = loto < 0o4/0o10 ? 0 : loto < 0o7/0o10 ? 1 : 2;
    formoj[elekto].reto.setMatrixAt(formoj[elekto].nombro++, M);
    li++;
    metitajHasho.meti(x, z, [ x, z ]);
  }

  for ( const formo of formoj ) {
    formo.reto.count = formo.nombro;
    formo.reto.instanceMatrix.needsUpdate = true;
    sceno.add(formo.reto);
  }
}

// konstruiTrunkanLikenBulon — Konstruu la tridimensian krustan bulon por la
// trunkaj likenoj. Dudekedro kun detaloj, neregula radiala delokiĝo kaj
// Y-prema platigo — malglata, tubera krusto anstataŭ glata pilko. La UV-oj
// projekcias la likenan teksajxon kiel dekalon sur la ANTAŬA ĉapo ( +Y ). la
// bulo sidas sur la ŝelo kun +Y radiale eksteren, do la makulo ĉiam rigardas
// eksteren kaj restas orta. La sfera UV-ado de la dudekedro ( azimuto/inklino )
// ĉirkaŭvolvis la tutan bulon kaj turnis la makulon malsame sur ĉiu bulo laŭ
// ĝia rotacio — tial iuj likenoj aperis inversaj aŭ klinitaj. La malantaŭaj
// verticoj ( y < 0 ) specimenas la travideblan randon de la teksajxo
// ( ClampToEdge ), do la alphaTest forĵetas ilin kaj restas nur la antaŭa
// krusto.
//     @returns geometrio ( THREE.BufferGeometry ) - La krusta bulo.
function konstruiTrunkanLikenBulon(): THREE.BufferGeometry {
  const hazardaGenerilo = mulberry32(0o62455);
  const geometrio = new THREE.IcosahedronGeometry(1, 1);
  const pozicioj = geometrio.attributes.position.array as Float32Array;
  const kvanto = pozicioj.length / 3;
  // Originaj direktoj — antaŭ la delokiĝo, por la UV-decido kaj -projekcio.
  const direktoj = new Float32Array(kvanto * 3);
  direktoj.set(pozicioj);
  // Grandaj tuberoj — kelkaj semitaj punktoj sur la sfero; ĉiu vertico
  // leviĝas laŭ sia proksimeco al ili. La sama semo donas la saman
  // malglatan formon al ĉiuj buloj.
  const tuberoj: [ number, number, number, number ][] = [];
  for ( let t = 0; t < 0o6; t++ ) {
    const a = hazardaGenerilo() * Math.PI * 2;
    const b = Math.acos(2 * hazardaGenerilo() - 1);
    const r = 0o3/0o10 + hazardaGenerilo() * 0o3/0o10;
    tuberoj.push([ Math.sin(b) * Math.cos(a), Math.cos(b), Math.sin(b) * Math.sin(a), r ]);
  }
  for ( let i = 0; i < kvanto; i++ ) {
    const ox = direktoj[i * 3], oy = direktoj[i * 3 + 1], oz = direktoj[i * 3 + 2];
    let deloko = 0;
    for ( const [ bx, by, bz, br ] of tuberoj ) {
      const d = Math.sqrt(( ox - bx ) ** 2 + ( oy - by ) ** 2 + ( oz - bz ) ** 2);
      deloko += Math.max(0, 1 - d / br) * 0o14/0o100;
    }
    // Eta kontinua malglateco — sinusaj ondoj de la pozicio rompas la
    // glatecon sen per-vertica sparkleco ( najbaraj facetoj dividas la valoron ).
    deloko += Math.sin(ox * 0o4) * Math.sin(oy * 0o7) * Math.sin(oz * 0o11) * 0o4/0o100
      + Math.sin(ox * 0o13 + 1) * Math.cos(oy * 0o20 + 2) * 0o3/0o100;
    const f = 1 + deloko;
    pozicioj[i * 3] = ox * f;
    pozicioj[i * 3 + 1] = oy * f * 0o6/0o10; // plata krusto — premu la Y-akson
    pozicioj[i * 3 + 2] = oz * f;
  }
  // UV-oj — la antaŭa ĉapo projekciita plate sur la teksajxon; la malantaŭo
  // sendita for de la teksajxo ( ClampToEdge donas la travideblan randon ).
  const uv = new Float32Array(kvanto * 2);
  for ( let i = 0; i < kvanto; i++ ) {
    if ( direktoj[i * 3 + 1] >= 0 ) {
      uv[i * 2] = direktoj[i * 3] * 0o33/0o100 + 0o5/0o10;
      uv[i * 2 + 1] = direktoj[i * 3 + 2] * 0o33/0o100 + 0o5/0o10;
    } else {
      uv[i * 2] = -1; uv[i * 2 + 1] = -1;
    }
  }
  geometrio.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  geometrio.computeVertexNormals();
  return geometrio;
}

// konstruiTrunkajnLikenojn — Metu tridimensiajn likenojn sur iujn arbotrunkojn.
// La trunkoj estas instancigitaj; ĉi tiu funkcio legas la matricon de ĉiu
// instanco por trovi la realan pozicion, rotacion kaj skalon de la trunko, kaj
// algluas malgrandajn krustajn bulojn al la ŝelo de hazarda subaro da arboj.
// Ĉiu bulo sidas je hazarda alteco kaj ĉirkaŭaĵo de la trunko, kaj rigardas
// radiale eksteren de la trunka akso. La trunka geometrio pintiĝas de 0o3/0o10
// ( malsupro ) al 0o7/0o40 ( supro ), kaj la x-skalo de ĉiu instanco estas la
// radiusa faktoro de tiu arbo — do la buloj ĉiam kuŝas ĝuste sur la ŝelo.
//     @param sceno ( THREE.Scene ) - La sceno.
//     @param trunkoj ( THREE.InstancedMesh[] ) - La trunkaj retoj de la arboj.
//     @param semo ( number ) - Hazarda semo.
//     @returns buloj ( THREE.InstancedMesh ) - La likena reto.
export function konstruiTrunkajnLikenojn(sceno: THREE.Scene,
  trunkoj: THREE.InstancedMesh[],
  semo = 0o62451
): THREE.InstancedMesh {
  const hazardaGenerilo = mulberry32(semo);
  const likenaTeksajxo = kreiLikenanTeksajxon();
  const likenaBumpo = kreiLikenanBumpanTeksajxon();

  // Krusta bulo — tubera, platigita kupolo kun la likena teksajxo kiel
  // dekalon sur la antaŭa ĉapo; la alphaTest tranĉas la eksteron, do restas
  // neregula, krusta formo. La bump-teksajxo levas la helajn lobojn kaj
  // sinkigas la malhelajn fendetojn.
  const buloGeometrio = konstruiTrunkanLikenBulon();
  const buloMaterialo = new THREE.MeshStandardMaterial({
    map: likenaTeksajxo, bumpMap: likenaBumpo, bumpScale: 0o3/0o10,
    alphaTest: 0o10/0o40, side: THREE.DoubleSide, roughness: 1, color: 0xffffff,
  });
  // Kapacito — maksimume 0o4 buloj po arbo.
  const kapacito = trunkoj.reduce(( sumo, tr ) => sumo + tr.count, 0) * 0o4;
  const buloj = new THREE.InstancedMesh(buloGeometrio, buloMaterialo, kapacito);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const P = new THREE.Vector3();
  const S = new THREE.Vector3();
  const akso = new THREE.Vector3();
  const radia = new THREE.Vector3();
  const surTrunko = new THREE.Vector3();
  const yUp = new THREE.Vector3(0, 1, 0);
  const Qb = new THREE.Quaternion();
  const Qy = new THREE.Quaternion();
  let bi = 0;

  for ( const trunko of trunkoj ) {
    for ( let i = 0; i < trunko.count; i++ ) {
      // Nur iuj arboj portas likenojn ( ĉ. 1/3 ).
      if ( hazardaGenerilo() > 1/3 ) continue;
      trunko.getMatrixAt(i, M);
      M.decompose(P, Q, S);
      const alto = S.y;
      const bulojNombro = 1 + ( ( hazardaGenerilo() * 3 ) | 0 );
      for ( let b = 0; b < bulojNombro; b++ ) {
        // Alteco-frakcio laŭ la trunko — nur sur videbla ŝelo. Sub la kronoj
        // ( betuloj. t ≈ 0o3/0o4 ) kaj sub la ŝelaj tasoj de la Ĥŝakŝlefoj
        // ( t ≈ 0o7/0o20, kie la tas-radiuso superas la trunkon kaj kaŝus ilin ).
        const t = 0o1/0o10 + hazardaGenerilo() * 0o1/0o2;
        const ang = hazardaGenerilo() * Math.PI * 2;
        // Radiuso ĉe tiu alteco — la geometrio pintiĝas de 0o3/0o10 al 0o7/0o40.
        const r = ( 0o3/0o10 - t * ( 0o3/0o10 - 0o7/0o40 ) ) * S.x;
        akso.set(0, ( t - 0o1/0o2 ) * alto, 0).applyQuaternion(Q);
        radia.set(Math.cos(ang), 0, Math.sin(ang)).applyQuaternion(Q);
        surTrunko.copy(P).add(akso).addScaledVector(radia, r + 0o1/0o40);
        // La bulo rigardas radiale eksteren de la trunka akso.
        Qb.setFromUnitVectors(yUp, radia);
        Qy.setFromAxisAngle(radia, hazardaGenerilo() * Math.PI * 2);
        // La rulado estas ĉirkaŭ la reala monda radiala akso. Premultipliko
        // aplikas ĝin POST la Y→radia vicigo; la malnova ordo rulis ĉirkaŭ
        // la malĝusta loka akso kaj faris la makulon renversiĝi sur la trunko.
        Qb.premultiply(Qy);
        const skalo = 0o1/0o10 + hazardaGenerilo() * 0o1/0o20;
        M.compose(surTrunko, Qb, new THREE.Vector3(skalo, skalo, skalo));
        buloj.setMatrixAt(bi++, M);
      }
    }
  }

  buloj.count = bi;
  buloj.instanceMatrix.needsUpdate = true;
  sceno.add(buloj);
  return buloj;
}

// konstruiLarikanFoliaranGeometrion — Konstruu la konusan kronon de lariko
// kun kirloj de maldikaj pinglaj ventumiloj. La baza konuso ( bazo je y = 0,
// pinto supre ) donas la tavolan volumon; ĉiu kirlo sidas sur la konusa
// surfaco kaj konsistas el maldikaj, pintigitaj pinglaj kartoj kiuj fane
// disetendiĝas eksteren — la karakteriza larika branĉeto, ne mola sfero.
function konstruiLarikanFoliaranGeometrion(): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  // ⟨ La krono 📃 ⟩ — la antaŭa krono estis LARĜA SOLIDA KONUSO ( radiuso 0.48
  // → 0.12 ) kun pinglaj faskoj ĉirkaŭ ĝi: en la ludo ĝi aspektis kiel papera
  // tendo ( aŭ lampskermo ) kun franĝo. Nun la interna maso estas MALDIKA
  // SPAJRO ( 0.19 → 0.03 ) kaj la pinglaj faskoj FARAS la silueton: ili sidas
  // sur la spajra surfaco kaj longas ĝuste tiom, ke iliaj pintoj atingas la
  // eksteran profilon de la krono. La krono do estas aero kun pingloj, ne
  // konuso kun pingloj sur ĝi.
  const ALTO = 1;
  const KERNA_BOT = 0o14/0o100;    // 0.1875 — la spajra radiuso ĉe la bazo
  const KERNA_SUP = 0o5/0o100;     // 0.078 — ĉe la pinto
  const kerno = new THREE.CylinderGeometry(KERNA_SUP, KERNA_BOT, ALTO, 0o12, 0o3);
  kerno.translate(0, ALTO / 2, 0);
  partoj.push(kerno);
  // La ekstera profilo de la krono — mallarĝiĝanta spajro. La pingla longo
  // ĉe ĉiu kirlo venas el la diferenco inter ĉi tiu profilo kaj la kerno.
  const eksteraR = ( t: number ): number => 0.5 * Math.pow(1 - t, 0o7/0o10) + 0.02;
  const kernaR = ( t: number ): number => KERNA_BOT + ( KERNA_SUP - KERNA_BOT ) * t;

  // Maldika pingla kartono — longa, tre mallarĝa, pintigita ĉe ambaŭ pintoj,
  // kiel unu pinglo de lariko. La UV-oj ripetas la pinglan teksturon laŭlonge.
  // ⟨ La pinglo kurbiĝas 📃 ⟩ — la pingla kartono estis TUTE REKTA: du
  // rektaj strekoj de pinto al pinto. Nun la mezaj verticoj leviĝas el la
  // ebeno ( 8% de la longo ), do la pinglo pendas iomete ĉe sia pinto — la
  // karakteriza mola larika pinglo.
  const kreiPinglanKarteton = ( longo: number, dikeco: number ): THREE.BufferGeometry => {
    const kurbo = longo * 0o2/0o25;
    // ⟨ La pinglo eliras el la branĉeto 📃 ⟩ — la pingla kartono estis
    // CENTRITA sur sia propra bazo ( de −longo/2 ĝis +longo/2 ), do ĝi atingis
    // nur DUONON de la longo, por kiu ĝi estis kalkulita ( la longo venas el la
    // diferenco inter la spajra kaj la kronaj profilo ). Nun ĝi etendiĝas de la
    // bazo ( 0 ) ĝis sia pinto ( +longo ) — la pinglaj faskoj vere atingas la
    // silueton de la krono kaj la krono larĝiĝas ĝis sia vera profilo.
    const pozicioj = [
      0, 0, 0, longo * 0o35/0o100, -dikeco / 2, kurbo,
      longo * 0o65/0o100, -dikeco / 2, kurbo, longo, 0, 0,
      longo * 0o65/0o100, dikeco / 2, kurbo, longo * 0o35/0o100, dikeco / 2, kurbo,
    ];
    const uvoj = [ 0, 0o1/0o2, 0o2/0o10, 0, 0o63/0o100, 0, 1, 0o1/0o2,
      0o63/0o100, 1, 0o2/0o10, 1 ];
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
    geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 2));
    geometrio.setIndex([ 0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5 ]);
    geometrio.computeVertexNormals();
    return geometrio;
  };

  // Unu pingla ventumilo — du krucitaj faskoj de pingloj radiaj el komuna
  // bazo, klinitaj iomete supren ĉe la randoj. La duobla kruco donas al la
  // tufo veran 3D-plenon, kiel larika branĉeto, ne unu platan ventumilon.
  const kreiPinglanVentumilon = ( longo: number, dikeco: number,
    klinoM = 0o6/0o10 ): THREE.BufferGeometry => {
    const fasko = ( turno: number ): THREE.BufferGeometry => {
      const pingloj: THREE.BufferGeometry[] = [];
      const kvanto = 0o13;   // 11 pingloj po fasko ( estis 9 )
      for ( let j = 0; j < kvanto; j++ ) {
        const t = j / ( kvanto - 1 ) - 0o5/0o10;
        // ⟨ La pingla vario 📃 ⟩ — ĉiuj pingloj de fasko estis EGALLONGAJ,
        // sianĝustaj kaj en unu ebeno, do la ekstera rando de ĉiu ventumilo
        // estis matematike rekta kaj la krono aspektis kiel peniko. Nun ĉiu
        // pinglo havas sian propran longon ( ±20% ), sian propran flankklinon
        // kaj etan rulon ĉirkaŭ sia akso — la pinglaro densiĝas kaj moliĝas
        // kiel vera branĉeto.
        const klino = t * klinoM + ( Math.random() - 0o5/0o10 ) * 0o3/0o10;
        const pinglo = kreiPinglanKarteton(
          longo * ( 0o4/0o5 + Math.random() * 0o4/0o10 ), dikeco);
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationY(turno));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationY(
          t * 0o14/0o10 + ( Math.random() - 0o5/0o10 ) * 0o1/0o10));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationX(
          ( Math.random() - 0o5/0o10 ) * 0o5/0o10));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationZ(klino));
        pingloj.push(pinglo);
      }
      return kunfandiGeometriojnSenIndekson(pingloj);
    };
    return kunfandiGeometriojnSenIndekson([ fasko(0), fasko(Math.PI / 2) ]);
  };

  const kirloj = 0o10;         // 8 kirloj laŭ la spajro ( estis 7 )
  const faskojPoKirlo = 0o7;   // 7 faskoj po kirlo — 56 faskoj ( estis 49 )
  for ( let i = 0; i < kirloj * faskojPoKirlo; i++ ) {
    const kirlo = Math.floor(i / faskojPoKirlo);
    const enKirlo = i % faskojPoKirlo;
    // Ĉiu kirlo turniĝas iomete rilate la antaŭan — la pinglaj faskoj de
    // malsamaj kirloj tiel interplektiĝas, anstataŭ stari en vertikalaj linioj.
    const a = enKirlo / faskojPoKirlo * Math.PI * 2 + kirlo * 0o7/0o20
      + ( Math.random() - 0o5/0o10 ) * 0o1/0o10;
    // La kirlo sidas alte laŭ la spajro. La unua restas iom super la bazo,
    // por ke neniuj pingloj pendu sub la kronon.
    const t = 0o7/0o100 + ( kirlo / ( kirloj - 1 ) ) * 0o66/0o100;
    const y = t * ALTO;
    const kR = kernaR(t);
    const bazoP = new THREE.Vector3(Math.cos(a) * kR, y, Math.sin(a) * kR);
    // La ventumilo direktiĝas radiale eksteren, iomete supren — larika
    // branĉeto leviĝas kaj malfermiĝas, kaj ĝiaj pingloj molas malsupren.
    const akso = new THREE.Vector3(
      Math.cos(a) * 0o66/0o100, 0o40/0o100 + Math.random() * 0o15/0o100,
      Math.sin(a) * 0o66/0o100).normalize();
    // ⟨ Du kadroj 📃 ⟩ — la pingla ventumilo estas konstruita en la loka
    // X-akso ( la pingloj etendiĝas laŭ ±X ), sed ĝi estis turnita per la
    // kvaternio kiu portas +Y al la branĉo. Tiu turno portas ±X AL ILI
    // PERPENDIKLARE al la branĉo — kaj, laŭ la azimuto, eĉ malsupren — do la
    // pingloj ne atingis la eksteran profilon de la krono ( por kiu ilia longo
    // estis kalkulita ) kaj la tavoloj aspektis kiel brosoj anstataŭ kiel
    // branĉetoj. La konektilo ( cilindro laŭ +Y ) restas sur la Y-turno; la
    // ventumilo ricevas sian propran turnon +X → branĉo, do ĝiaj pingloj
    // kuŝas LAŬ la branĉeto, kiel ĉe vera lariko.
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), akso);
    const qPingloj = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), akso);
    // La branĉa konektilo — videbla branĉeto de la spajro ĝis la fasko.
    const konektiloLongo = Math.max(0o10/0o100, kR * 0o7/0o10);
    const konektilo = new THREE.CylinderGeometry(0o2/0o100, 0o4/0o100, konektiloLongo, 5)
      .translate(0, konektiloLongo / 2, 0);
    konektilo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
    konektilo.translate(bazoP.x - akso.x * konektiloLongo, bazoP.y - akso.y * konektiloLongo,
      bazoP.z - akso.z * konektiloLongo);
    partoj.push(konektilo);
    // ⟨ La pingla longo 📃 ⟩ — ĝi venas de la EKSTERA profilo de la krono:
    // la fasko longas ĝuste tiom, ke ĝia pinto atingas la spajran silueton
    // ( kun eta hazardo, por ke la rando ne estu matematike glata ).
    const longo = ( eksteraR(t) - kR ) * ( 1 + ( Math.random() - 0o5/0o10 ) * 0o2/0o10 )
      + 0o2/0o100;
    // La plej suba kirlo ricevas pli mallongajn pinglojn, por ke ili ne
    // subiru la bazon de la krono.
    const ventumilo = kreiPinglanVentumilon(longo * ( kirlo === 0 ? 0o7/0o10 : 1 ),
      0o3/0o200, -0o4/0o10);
    ventumilo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(qPingloj));
    ventumilo.translate(bazoP.x, bazoP.y, bazoP.z);
    partoj.push(ventumilo);
  }
  // La pinta ŝoso — la lasta, pinta branĉeto de la krono ( lariko havas
  // videblan gvidanton super la lasta pingla kirlo ).
  partoj.push(new THREE.CylinderGeometry(0o1/0o100, 0o4/0o100, 0o16/0o100, 5)
    .translate(0, ALTO + 0o6/0o100, 0));
  // Centra kolumo kovras la trunkan pinton sub la krono — ĉiu tavolo do
  // videble kreskas el la trunko kaj ne flosas.
  // Neniu aparta kolumo — la spajro mem kovras la trunkopinton. La antaŭa
  // kolumo ( radiuso 0.375 × la tavola skalo ) estis pli larĝa ol la spajro,
  // do ĉe ĉiu tavolo videblis glata solida konuso sub la pingloj — la krono
  // aspektis kiel lampskermo. La maldika spajro sufiĉas.
  return kunfandiGeometriojnSenIndekson(partoj);
}

// konstruiLarikon — Konstruu instancigitajn alpajn larikojn ( Larix lyallii )
// en la sceno.
// La alpina lariko havas grizbrunan, platan trunk-sxoelon kaj aŭtunan
// orflavan pinglaron — la sola konifero kiu perdas siajn pinglojn aŭtune.
// Ĝiaj tavoligitaj kronoj formas distingajn kirlojn.
//     @param arboj ( ArboMetado[] ) - La metitaj arboj.
export function konstruiLarikon(sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = mulberry32(33718);
  const larikaTeksajxo = kreiLarikanSxelanTeksajxon();
  const larikaBumpo = kreiLarikanSxelanBumpanTeksajxon();
  // La larika trunko — pli maldika kaj pli alte pintiĝanta ol la betula, kun
  // la sama radika larĝiĝo ( lariko staras sur roka, neĝa grundo kaj ofte
  // montras siajn radikojn ).
  const trunkaGeometrio = kreiTrunkanGeometrion(0o5/0o20, 0o11/0o100, 0o5/0o20 * 1.38, 0o11);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: larikaTeksajxo, bumpMap: larikaBumpo, bumpScale: 0o6/0o10, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return trunkoj;

  // Du aŭ tri konusaj tavoloj, ĉiu pli mallarĝa ol la antaŭa — la kirloj
  // de la alpina lariko. La tavoloj restas sur la trunk-akso, nur la tria
  // foje estas kaŝita ( skalo 0 ).
  const kronaGeometrio = konstruiLarikanFoliaranGeometrion();
  kronaGeometrio.computeBoundingBox();
  // ⟨ Duflankaj pingloj 📃 ⟩ — la pingloj estas kartetoj, do kun la defaŭlta
  // FrontSide duono de la 49 ventumiloj estis nevidebla el iu ajn direkto ( oni
  // vidis malantaŭen turnitajn pinglojn nur kiel truojn ). Duflanke la pinglaro
  // duobliĝas sen pli da geometrio.
  const kronaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiLarikanFoliaranTeksajxon(), color: 0xffffff, roughness: 0o35/0o40,
    side: THREE.DoubleSide,
  });
  // Kvar tavoloj — la krono de alta lariko devas kovri pli ol la trunka pinto.
  const MAKS_TAVOLOJ = 0o4;
  const kronoj = new THREE.InstancedMesh(kronaGeometrio, kronaMaterialo, arboj.length * MAKS_TAVOLOJ);

  // ⟨ La nudaj branĉetoj 📃 ⟩ — matura montara konifero portas kelkajn SEKajn,
  // nudajn branĉetojn sur la malsupra trunko ( la pingloj mortas en la ombro de
  // la krono ). Sen ili la trunko estas glata stango kaj la arbo aspektas kiel
  // balailo sur fosto; kun ili la okulo legas la aĝon kaj la skalon de la arbo.
  // Ili eliras suben-eksteren kaj uzu la SAMan ŝelteksturon kiel la trunko.
  const BRANCXETOJ = 0o3;
  const brancxetaGeometrio = new THREE.CylinderGeometry(0o1/0o100, 0o5/0o100, 1, 4)
    .translate(0, 0o1/0o2, 0);
  const brancxetoj = new THREE.InstancedMesh(brancxetaGeometrio, trunkaMaterialo,
    arboj.length * BRANCXETOJ);

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  const yUp = new THREE.Vector3(0, 1, 0);
  const xAkso = new THREE.Vector3(1, 0, 0);
  // La koloro de la nuna trunko — la sekaj branĉetoj reuzas ĝin ( pli malhela ),
  // do ili kongruas kun la ŝelo de SIA arbo.
  const sxelaKoloro = new THREE.Color();
  // Aŭtunaj pingloj — orflavaj kun kelkaj verdflavaj kaj ambraj nuancoj.
  const paletro = [ 0xc8a848, 0xd0b858, 0xd8c060, 0xd8a838, 0xc0a048, 0xe0c868, 0xb89038, 0xa8b048 ];

  arboj.forEach(( t, i ) => {
    // ⟨ Kresku ankaŭ MALLONGA 📃 ⟩ — la antaŭa alto estis 6 + 4×s, do ĉiu
    // lariko estis alta kaj la arbaro montris nur stangojn. Poste ĝi ricevis
    // hazardan faktoron 0.75–1.45, sed eĉ tiam la plej malalta ebla arbo estis
    // 3.5 unuojn alta: sur la malaltaj deklivoj, kie la grundo estas malriĉa,
    // la lariko ankaŭ restas malgranda ( 1.4–2 unuoj ), kiel junulo aŭ kriplulo
    // inter la plenkreskuloj. La hazarda faktoro nun etendiĝas de 0.42 al 1.42,
    // do la larikaro montras arbojn de po du kaj duono unuoj ĝis preskaŭ dek.
    const h = (3.4 + t.s * 3.0) * (0.42 + hazardaGenerilo() * 1.0);
    // ⟨ La trunko sekvas la alton 📃 ⟩ — trunk-larĝo sendependa de la alto
    // farus el malalta lariko ŝtupon kaj el alta vergon. La larĝo venas el la
    // mondo-alto, do la malgrandaj larikoj estas egale sveltaj.
    const trunkaLargho = 0.30 + h * 0.075;
    // Alpaj larikoj kreskas kompakte — malgranda klino nur rompas la uniformecon.
    const Q = kreiKlinoQuaternionon(hazardaGenerilo, 0o3/0o20, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Q);

    M.compose(pozicio(new THREE.Vector3(0, h / 2, 0)), Q,
      new THREE.Vector3(trunkaLargho, h, trunkaLargho));
    trunkoj.setMatrixAt(i, M);

    // Larika sxoelo varias de grizbruna ĝis ruĝbruna — nuanco po arbo.
    const helo = 0.92 + hazardaGenerilo() * 0.08;
    C.setRGB(
      helo * ( 0.98 + hazardaGenerilo() * 0.04 ),
      helo * ( 0.95 + hazardaGenerilo() * 0.05 ),
      helo * ( 0.90 + hazardaGenerilo() * 0.07 ));
    trunkoj.setColorAt(i, C);
    sxelaKoloro.copy(C);

    const tavoloj = 0o3 + ( ( hazardaGenerilo() * 0o2 ) | 0 );
    // ⟨ La proporcioj 📃 ⟩ — la antaŭa krono estis preskaŭ same larĝa kiel
    // alta ( tendego ). La alpina lariko estas SPIRA: la tavoloj estas
    // preskaŭ duoble pli altaj ol larĝaj, do la tuta krono legiĝas kiel
    // mallarĝa pinto super la trunko, kiel ĉe la montaraj larikoj. La tavoloj
    // ankaŭ pli altas nun: antaŭe la tuta krono kovris nur la supran trionon
    // de la trunko kaj la arbo aspektis kiel nuda stango kun pingla ĉapo.
    // ⟨ La larĝo venas el la metado 📃 ⟩ — antaŭe la larĝa kaj la alta skalo
    // estis SENDEPENDAJ ( 0.7 kontraŭ 2.8 en la malsupra tavolo ): ĉiu pingla
    // kartono — la folioj de lariko — streĉiĝis kvaroble laŭ la vertikalo, kaj
    // la krono aspektis kiel broso sur fosto anstataŭ kiel pinglarbo. Plie la
    // modelo estis 0.9 larĝa dum la metado rezervas 3.0 por la speco, do la
    // malplenoj inter la arboj regis la arbaron. Nun la larĝo venas el la SAMA
    // funkcio, kiun la metado uzas ( kronaRadiusoLarika ), kaj la alta skalo
    // venas el la larĝa — la modelo kaj la interspaco ne povas malkongrui.
    // ⟨ Ankaŭ la krono sekvas la alton 📃 ⟩ — kronaRadiusoLarika donas la
    // larĝon, kiun la metado rezervas, sed tiu larĝo apartenas al PLENKRESKA
    // lariko: malgranda arbo kun plenkreska krono estus arbusto. La krono
    // restas tiom larĝa kiom la trunko permesas ( la rando de matura lariko
    // estas ~55% de ĝia alto ) — kaj nur la pli malgranda el la du gajnas.
    const kronaRadiuso = Math.min(0.75 * kronaRadiusoLarika(t.s), 0.27 * h);
    const bazaLargho = kronaRadiuso / KRONA_GEOMETRIA_RADIUSO;
    const kronaMinimumaY = kronaGeometrio.boundingBox!.min.y;
    const kronaMaksimumaY = kronaGeometrio.boundingBox!.max.y;
    // La geometria krono estas ~1.4 unitojn alta, do la monda alto de tavolo
    // estas kronoAlto × ĉi tiu faktoro — sen ĝi la krono sidis tro alte kaj la
    // trunko restis nuda sub ĝi.
    const geometriaAlto = kronaMaksimumaY - kronaMinimumaY;
    // ⟨ Unue la tavoloj 📃 ⟩ — la krono devas scii sian propran alton antaŭ ol
    // ĝi povas sidiĝi: ĝi kovras la supran duonon de la trunko kaj ĝia pinto
    // etendiĝas iomete super la trunkopinto ( la gvidanto de lariko ).
    const tavolajSkaloj: { largho: number; alto: number }[] = [];
    let kronoSumo = 0;
    for ( let k = 0; k < tavoloj; k++ ) {
      const m = k / MAKS_TAVOLOJ;
      const largho = bazaLargho * ( 1 - m * 0o3/0o4 )
        * ( 0o21/0o24 + hazardaGenerilo() * 0o3/0o10 );
      const alto = largho * TAVOLA_PROPORCIO * ( 0o11/0o12 + hazardaGenerilo() * 0o2/0o10 );
      tavolajSkaloj.push({ largho, alto });
      // La interkovro de la tavoloj — kiu ankaŭ decidas kiom alta la tuta
      // krono fariĝas. Kun la 60% de antaŭe la krono kovris la du trionojn de
      // la trunko kaj la pingloj aperis meze de la arbo; kun 35% la krono
      // sidas sur la supra duono.
      kronoSumo += ( k === 0 ? alto : alto * 0o27/0o100 ) * geometriaAlto;
    }
    let antaŭaSupro = h + 0o3/0o10 - kronoSumo;
    for ( let k = 0; k < MAKS_TAVOLOJ; k++ ) {
      if ( k >= tavoloj ) {
        // Neuzitaj tavoloj — skalo 0 kaŝas ilin ( la buĝeto de la instanckapablo ).
        M.compose(pozicio(new THREE.Vector3(0, antaŭaSupro, 0)), Q,
          new THREE.Vector3(0, 0, 0));
        kronoj.setMatrixAt(i * MAKS_TAVOLOJ + k, M);
        kronoj.setColorAt(i * MAKS_TAVOLOJ + k, hazardaKoloro(hazardaGenerilo, C, paletro));
        continue;
      }
      const { largho: kronoLargho, alto: kronoAlto } = tavolajSkaloj[k];
      // ⟨ La kunfando de la tavoloj 📃 ⟩ — ĉiu tavolo komenciĝas iomete SUB
      // la supra rando de la antaŭa ( 60% de sia propra alto ), ne ĝuste sur
      // ĝi. Antaŭe la tavoloj stakigis sin unu sur la pinto de la antaŭa, do
      // inter ili videblis NUDaj trunko-segmentoj kaj la krono aspektis kiel
      // tri flosantaj spajroj. Kun la interkovro la tavoloj kunfandiĝas en unu
      // kontinuan kronon, kiel ĉe vera lariko.
      // La interkovro mezuriĝas en MONDAJ unuoj ( la geometria krono estas
      // 1.42 altaj ), do la krono finiĝas ĝuste super la trunkopinto.
      const bazaY = antaŭaSupro - ( k === 0 ? 0 : 0o27/0o100 * kronoAlto * geometriaAlto);
      const centroY = bazaY - kronaMinimumaY * kronoAlto - kronoAlto * 0o1/0o100;
      // Eta sendependa ŝovo de ĉiu kirlo faras naturan, ne perfekte centran
      // pinglan tavolon, dum la komuna trunk-akso ankoraŭ restas videbla.
      M.compose(pozicio(new THREE.Vector3(
        ( hazardaGenerilo() - 0o5/0o10 ) * 0o12/0o100,
        centroY,
        ( hazardaGenerilo() - 0o5/0o10 ) * 0o12/0o100)), Q,
        new THREE.Vector3(kronoLargho, kronoAlto, kronoLargho));
      kronoj.setMatrixAt(i * MAKS_TAVOLOJ + k, M);
      kronoj.setColorAt(i * MAKS_TAVOLOJ + k, hazardaKoloro(hazardaGenerilo, C, paletro));
      antaŭaSupro = centroY + kronaMaksimumaY * kronoAlto;
    }

    // La sekaj branĉetoj sur la malsupra trunko — tri, je malsamaj altoj kaj
    // anguloj, ĉiu klinita suben-eksteren ( pli ol 90° de la vertikalo ).
    for ( let b = 0; b < BRANCXETOJ; b++ ) {
      const ang = hazardaGenerilo() * Math.PI * 2;
      // ⟨ Kie la sekaj branĉetoj 📃 ⟩ — ili sidas SUB la krono, sur la malsupra
      // triono de la trunko. Kun la larĝiĝinta krono ili devis malsupreniri:
      // antaŭe ili estis je 20–45% de la alto, sed tie nun estas la krono mem.
      const yBrancxo = h * ( 0o1/0o10 + b * 0o1/0o10
        + ( hazardaGenerilo() - 0o5/0o10 ) * 0o1/0o20 );
      const longo = ( 0o3/0o10 + hazardaGenerilo() * 0o1/0o2 ) * trunkaLargho;
      // Pli ol duona turno — la branĉeto pendas malsupren, kiel mortinta pinto.
      const klino = 0o17/0o10 + hazardaGenerilo() * 0o4/0o10;
      const Qb = new THREE.Quaternion().setFromAxisAngle(yUp, ang)
        .multiply(new THREE.Quaternion().setFromAxisAngle(xAkso, klino));
      // La bazo sidas sur la trunka surfaco je tiu alto ( la trunkoprofilo
      // mallarĝiĝas supren, do la radiuso sekvas ĝin ).
      const trunkaR = ( 0o5/0o20 * ( 1 - yBrancxo / h ) + 0o11/0o100 * ( yBrancxo / h ) )
        * trunkaLargho * 0o7/0o10;
      // La pozicio devas kongrui kun la turniĝo: la deklino turnas la branĉeton
      // al +z, kaj la vido-turno Qy(ang) portas +z al ( sin ang, 0, cos ang ).
      M.compose(pozicio(new THREE.Vector3(
        Math.sin(ang) * trunkaR, yBrancxo, Math.cos(ang) * trunkaR)),
        Qb.premultiply(Q), new THREE.Vector3(trunkaLargho, longo, trunkaLargho));
      brancxetoj.setMatrixAt(i * BRANCXETOJ + b, M);
      // Iomete pli malhela ol la trunko — morta ligno.
      brancxetoj.setColorAt(i * BRANCXETOJ + b, C.copy(sxelaKoloro).multiplyScalar(0o7/0o10));
    }
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  kronoj.instanceMatrix.needsUpdate = true;
  brancxetoj.instanceMatrix.needsUpdate = true;
  if ( trunkoj.instanceColor ) trunkoj.instanceColor.needsUpdate = true;
  if ( kronoj.instanceColor ) kronoj.instanceColor.needsUpdate = true;
  if ( brancxetoj.instanceColor ) brancxetoj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = kronoj.castShadow = brancxetoj.castShadow = true;
  sceno.add(trunkoj, kronoj, brancxetoj);
  return trunkoj;
}

// konstruiSxelanRingon — La rigidaj ŝelaj tasoj de la purpuraj laktukaj
// plantoj ( Ĥŝakŝlefo kaj Pussxlefo ) — simetriaj TASOJ malfermitaj supren:
// mallarĝaj ĉe la malsupro, kie ili brakumas la trunkon, kaj kurbiĝantaj
// eksteren kaj SUPren ( trumpeto-formo ), kies supra rando disiĝas en kvar
// foliformajn lobojn ĉe la kvar flankoj de la folioj.
//
// ⟨ Kie la folioj eliras 📃 ⟩ — la foliaj bazoj sidas INTERNE de la taso
// ( la taso estas metita tiel, ke ĝia mallarĝa malsupro estas sub ili ), do la
// folioj leviĝas el la interno de la taso kaj etendiĝas eksteren super ĝia
// rando. La taso do NE pendas malsupren — ĝi malfermiĝas al la ĉielo.
function konstruiSxelanRingon(): THREE.BufferGeometry {
  const geometrio = new THREE.CylinderGeometry(0o16/0o40, 0o13/0o40, 1, 0o32, 0o6, true).translate(0, 0o1/0o2, 0);
  const pozicioj = geometrio.attributes.position;
  for ( let i = 0; i < pozicioj.count; i++ ) {
    const x = pozicioj.getX(i);
    const y = pozicioj.getY(i);
    const z = pozicioj.getZ(i);
    // La kvar foliaj loboj — unu je ĉiu folia flanko.
    const ang = Math.atan2(x, z);
    const lobo = Math.pow(( Math.cos(4 * ang) + 1 ) / 2, 2);
    // ⟨ La folia bazo 📃 ⟩ — antaŭe la TASO estis cilindro: ĝia malsupra rando
    // estis rekta cirklo ĉirkaŭ la trunko, do la kunmeto de trunko kaj taso
    // aspektis kiel glaso ŝovita sur bastonon. Nun la malsupra rando MEM estas
    // foliforma: ĉe ĉiu folio ĝi MALLEVIĜAS en pintan lobon, kiu brakumas la
    // trunkon ( la bazo de folio, ne la rando de ujo ), kaj la efiko malaperas
    // supren, kie la kolumo malfermiĝas kiel korneto. La supra rando retenas
    // siajn kvar levitajn lobojn.
    const baza = Math.pow(1 - y, 3);
    // La rando kurbiĝas eksteren SUPren — ju pli alta la punkto, des pli
    // larĝa la radiuso ( kaj des pli la rando malfermiĝas kiel korneto ).
    const faktoro = 1 + 0o1/0o10 * y * y + 0o1/0o20 * baza;
    const novaY = y + 2/5 * lobo * y - 0o45/0o100 * lobo * baza;
    pozicioj.setXYZ(i, x * faktoro, novaY, z * faktoro);
  }
  geometrio.computeVertexNormals();
  return geometrio;
}

// kreiSxelanRinganMaterialon — La ŝela materialo por la trunko aŭ por la
// kolumaj tasoj.
//
// ⟨ La ripeto de la taso 📃 ⟩ — la trunko kaj la taso uzas la SAMAN bildon sed
// en tre malsamaj proporcioj: la trunko estas ~1.5 unuojn ĉirkaŭe kaj 8–19
// unuojn alta, la taso ~2 unuojn ĉirkaŭe kaj nur 0.75 unuojn alta. Kun la sama
// ripeto la taso montris nur ~6% de la bilda alto, do ĝiaj ringoj smiriĝis en
// unu senforman bendon. La tasoj ricevas PROPRAN teksturo-klonon kun vertikala
// ripeto de 0o1/0o20 ( 5% ): la sama rastrumera denseco kiel la trunko, kaj ĉar
// la bildo estas malhela ĉe sia malsupro, la taso restas malhela ĉe sia bazo
// kaj heliĝas al sia rando — la intencita aspekto. La klonoj kunhavigas la
// bildon, do ili kostas preskaŭ nenion en memoro.
// ⟨ Kiom ripeti 📃 ⟩ — la teksajxo estas desegnita por MEZA Ĥŝakŝlefa trunko:
// ~13 unuoj alta kun ~20 folio-cikatriĉaj ringoj. Ĉiu alia surfaco ricevas
// propran vertikalan ripeton, por ke la ringoj havu la saman GRANDON en la mondo
// ( la sama rastrumera denseco ) anstataŭ la saman nombron:
//   Ĥŝakŝlefa trunko ( 8–19 unuoj )  → 1      ( la tuta bildo )
//   Ĥŝakŝlefa kolumo ( 0.75 unuoj )  → 0.05   ( ~1 ringo sur la kolumo )
//   Pussxlefa trunko ( ~0.6 unuoj )  → 0.05
//   Pussxlefa kolumo ( ~0.12 unuoj ) → 0.015
// Sen ĉi tio la etaj Pussxlefoj portis ĉiujn ringojn sur duon-unuan trunkon —
// pura sub-piksela bruo. La propraj teksturoj kunhavigas la bildon, do la
// klonoj kostas preskaŭ nenion en memoro.
//     @param ripetoY ( number ) - La vertikala ripeto ( 1 = la tuta bildo ).
//     @param taso ( boolean ) - Ĉu ĉi tiu materialo estas por koluma taso.
//     @param offsetY ( number = 0 ) - Kie en la bildo la legata bando komenciĝas.
//              ⟨ La koluma bando 📃 ⟩ — la kolumaj tasoj legas la bandon, kiu
//              FINIĝAS ĉe la pinta rando de la bildo ( offset.y = 1 − ripeto ),
//              ĉar ili sidas alte sur la trunko. Tiu bando ( vidu
//              desegniLaSxelanKolumon en teksajxoj.ts ) estas la plej hela ŝelo
//              de la trunko PLUS la vico da altaj foli-formaj skvamoj. Antaŭe la
//              tasoj legis la plej malhelan malsupron de la bildo ( offset 0 ),
//              do ĉiu kolumo estis preskaŭ nigra dum la trunko estis mez-purpura.
//     @returns materialo ( THREE.MeshStandardMaterial ) - La preta materialo.
function kreiSxelanRinganMaterialon(ripetoY: number, taso: boolean,
  offsetY = 0): THREE.MeshStandardMaterial {
  const mapo = kreiPurpuranSxelanTeksajxon();
  const reliefo = kreiPurpuranSxelanBumpanTeksajxon();
  // La klonoj estas kreitaj nur kiam la ripeto devias de 1 — tiam la origina
  // teksturo restas senŝanĝa por la aliaj uzoj.
  const uzi = ( t: THREE.Texture ): THREE.Texture => {
    if ( ripetoY === 1 ) return t;
    const klono = t.clone() as THREE.Texture;
    klono.repeat.set(1, ripetoY);
    klono.offset.set(0, offsetY);
    klono.needsUpdate = true;
    return klono;
  };
  // ⟨ La reliefo mallevigxis 📃 ⟩ — la reliefa teksajxo de la ŝelo portas cikatrojn
  // kaj fibrojn kun forta kontrasto, kaj sur la maldika trunko ( radiuso ~0.2 unuoj )
  // granda bumpScale faras la surfacon KRISPA — ĉiu ringo kaj ĉiu fibro legigxas
  // kiel gravurita sulko. Nun la reliefo estas kvaroble pli mola, do la trunko
  // legigxas glata kaj la cikatroj restas nur kiel mola ombro sur la surfaco.
  // ⟨ La ringoj malpliiĝis 📃 ⟩ — la skizo portas nun duonon da cikatroj kaj da
  // fibroj, do ankaŭ la reliefo malleviĝis ( 0o1/0o50 anstataŭ 0o1/0o40 ): la
  // ŝelo montras la ringojn kiel molan ombron, ne kiel gravuritan sulkon.
  return new THREE.MeshStandardMaterial({
    map: uzi(mapo), bumpMap: uzi(reliefo), bumpScale: 0o1/0o50, color: 0xffffff,
    roughness: taso ? 0o63/0o100 : 0o53/0o100,
    side: taso ? THREE.DoubleSide : THREE.FrontSide,
  });
}

// ⟨ La trunkopinto 📃 ⟩ — La purpuraj ŝlefoj finiĝis per PLATA TRANĈA DISKO:
// la trunka cilindro havas supran kovrilon, kaj ĉar la pinta krono malfermiĝas
// supren, tiu kovrilo restis videbla en la mezo de la krono — de supre la
// planto finiĝis per hela plata poligono, kaj de flanke per rekta ŝtupo. Ĉi tiu
// profilo mallarĝigas la lastan parton de la trunko ĝis nulo, do la pinto estas
// rondigita konuseto ( kreskanta burĝono ), kaj la supra kovrilo kolapsas en
// punkton kaj tute malaperas. La sama profilo ankaŭ regas la radiuson, kiun la
// folioj kaj la ŝelaj tasoj uzas por sidiĝi sur la trunko — do ĉio kongruas.
//     @param t ( number ) - La frakcio de la trunka alto ( 0 malsupre, 1 supre ).
//     @returns faktoro ( number ) - La multiplikilo de la trunka radiuso.
const TRUNKOPINTA_KOMENCO = 0.88;
function trunkopintaProfilon(t: number): number {
  if ( t <= TRUNKOPINTA_KOMENCO ) return 1;
  const u = Math.min(1, ( t - TRUNKOPINTA_KOMENCO ) / ( 1 - TRUNKOPINTA_KOMENCO ));
  return Math.sqrt(Math.max(0, 1 - u * u));
}

// konstruiHxsxaksxlefojn — Konstruu instancigitajn purpurajn laktuk-arbojn
// ( ı],ͷ̗ɔʞ ֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ / Ĥŝakŝlefo ) en la sceno. Ĉiu arbo havas altan
// purpuran trunkon kaj 3–5 tavolojn, ĉiu kun kvar grandaj kurbiĝintaj folioj
// ( kvar flankoj × pluraj fojoj vertikale — la tri-tavola regulo estis nur
// ekzemplo, do pli povas okazi ). De la unua folia tavolo supren la trunko
// estas kovrita de rigidaj senkrustiĝantaj ringoj — simetriaj tasoj kies
// supraj randoj disiĝas foliforme, el kiuj la folioj etendiĝas senjunte.
//     @param arboj ( ArboMetado[] ) - La metitaj arboj.
export function konstruiHxsxaksxlefojn(sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = mulberry32(0o62445);
  const MAX_TAVOLOJ = 5;
  // Purpura trunko — kiel la aliaj purpuraj plantoj, ne betula ŝelo.
  // La segmentoj de la alto ( 0o24 = 20 ) estas tiom multaj, ke la pinta
  // profilo havas tri ringojn super TRUNKOPINTA_KOMENCO — per malmultaj
  // segmentoj la "rondigita" pinto estus nur unu kruta konuso.
  // ⟨ La flankoj de la trunko 📃 ⟩ — la antaŭaj 0o12 ( 10 ) flankoj faris la
  // folio-cikatriĉajn ringojn de la nova ŝela teksajxo ONDAJ: ĉiu ringo estas
  // plurlatero, ne cirklo, do dekduo da flankoj legiĝas kiel zigzaga linio. Kun
  // 0o30 ( 24 ) flankoj la ringoj legiĝas kiel veraj horizontalaj cikatroj — sed
  // la silueto ankoraŭ montris la rektajn facojn kiel krispajn angulojn, ĉar la
  // trunko estas maldika kaj tre proksima al la okuloj. Nun 0o50 ( 40 ) flankoj
  // faras la silueton kaj la lumon preskaŭ tute glataj.
  const trunkaGeometrio = new THREE.CylinderGeometry(0o7/0o40, 0o3/0o10, 1, 0o50, 0o24);
  // ⟨ La nodoj de la tigo 📃 ⟩ — kie la kolumo renkontas la trunkon, la tigo
  // estas iomete pli dika, kiel la nodo de vera tigo sub folio. Sen ĝi la
  // kolumoj aspektis kiel glasoj ŝovitaj sur glatan bastonon. La nodoj sidas
  // ĉe 0.28 kaj 0.78 de la alto — la ekstremaj foliaj tavoloj de ĉiu arbo.
  {
    const pozicioj = trunkaGeometrio.attributes.position;
    const nodo = ( t: number, mezo: number ): number =>
      Math.exp(-Math.pow(( t - mezo ) / 0.05, 2));
    for ( let i = 0; i < pozicioj.count; i++ ) {
      const x = pozicioj.getX(i);
      const y = pozicioj.getY(i);
      const z = pozicioj.getZ(i);
      const t = y + 0o1/0o2;
      const faktoro = ( 1 + 0.09 * nodo(t, 0.28) + 0.09 * nodo(t, 0.78) )
        * trunkopintaProfilon(t);
      pozicioj.setXYZ(i, x * faktoro, y, z * faktoro);
    }
    trunkaGeometrio.computeVertexNormals();
  }
  // La trunko havas la SAMAN teksturon kiel la ŝelaj ringoj — malhela ĉe la
  // bazo, heliĝanta al la supro, kun la fajnaj ŝelaj strioj.
  const trunkaMaterialo = kreiSxelanRinganMaterialon(1, false);
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return trunkoj;

  // Pli dika, plena folio — pli larĝa klingo, pli profunda kurbeco kaj
  // reala diko, kiel laktuko aŭ brasiko.
  const foliaGeometrio = konstruiKurbanLaktukanFolion();
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiPurpuranFolianTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 0o63/0o100,
  });
  // Kapacito: la folioj de la tavoloj PLUS la kvar pinta krono-tavoloj ( vidu
  // malsupre ) — 5 tavoloj × 4 flankoj + 4 × 4 = 36.
  const folioj = new THREE.InstancedMesh(foliaGeometrio, foliaMaterialo, arboj.length * ( MAX_TAVOLOJ * 4 + 0o24 ));

  // Rigidaj ŝelaj ringoj — simetriaj tasoj ĉirkaŭ la trunko, pli larĝaj ĉe la
  // supro kaj kurbiĝantaj eksteren ( trumpeto-formo ), kies supraj randoj
  // disiĝas en kvar foliformajn lobojn ( ĉe la kvar flankoj de la folioj ).
  // La folioj etendiĝas el la loboj senjunte.
  const sxelaGeometrio = konstruiSxelanRingon();
  // La ringo kreskas el la trunko: la koluma bando ( la supra, plej hela parto
  // de la ŝela bildo, kun la foli-formaj skvamoj ) — do la taso havas la saman
  // lumon kiel la trunko, kaj ĝiaj skvamoj finiĝas ĉe ĝia rando.
  const sxelaMaterialo = kreiSxelanRinganMaterialon(0.05, true, 1 - 0.05);
  // Kapacito 12 ringoj po arbo — kun la grandeco-multiplikilo la maksimuma
  // alto estas 18.75 ( 15 × 0o5/0o4 ), kiu donas 5 foliajn tavolojn plus 4
  // suprajn tasojn ( la pli mallonga ringa spaco aldonis unu ).
  const sxeloj = new THREE.InstancedMesh(sxelaGeometrio, sxelaMaterialo, arboj.length * 0o14);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x8848a8, 0x9858b8, 0xa868c0, 0x7840a0, 0x9050b0 ];
  const yUp = new THREE.Vector3(0, 1, 0);
  // La tono, kiun la kolumaj tasoj MEM montras ( la mezo de la koluma bando en
  // la linia spaco ) — la referenco, kontraŭ kiu ĉiu taso kompensiĝas al la
  // trunka tono ĉe sia propra alto ( vidu la per-instancajn kolorojn sube ).
  const kolumaTono = sxelaKolumKoloro();
  let fi = 0;
  let si = 0;

  arboj.forEach(( t, i ) => {
    // Malsamaj grandecoj — la arba faktoro donas la bazan alton kaj la
    // multiplikilo ( 0o3/0o4 ĝis 0o5/0o4 ) faras kelkajn arbojn rimarkeble pli
    // mallongaj kaj aliajn pli altaj.
    const h = ( 0o110/0o10 + t.s * 0o40/0o10 ) * ( 0o3/0o4 + hazardaGenerilo() * 0o1/0o2 );
    const Qtrunko = kreiKlinoQuaternionon(hazardaGenerilo, 0o1/0o10, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Qtrunko);

    M.compose(pozicio(new THREE.Vector3(0, h / 2, 0)), Qtrunko,
      new THREE.Vector3(1, h, 1));
    trunkoj.setMatrixAt(i, M);

    // La trunka radiuso je la alto y — la trunkocilindro havas la radiusojn
    // 0o3/0o10 ( 0.375 ) malsupre kaj 0o7/0o40 ( 0.219 ) supre, do la profilo
    // estas rekta. Ĉi tiu unu formulo donas la saman radiuson al la folioj
    // kaj al la ŝelaj tasoj — ili do ĉiam sidas sur la ŝelo.

    const trunkoR = ( y: number ): number =>
      ( 0o3/0o10 - ( y / h ) * ( 0o3/0o10 - 0o7/0o40 ) ) * trunkopintaProfilon(y / h);

    // 3–5 tavoloj × kvar flankoj — la folioj ĉirkaŭas la trunkon egale.
    const tavoloj = 3 + ( ( hazardaGenerilo() * 3 ) | 0 );
    // La tavolaj altoj — la ŝelaj tasoj sidas SUR ĉi tiuj, do konservu ilin.
    const tavolajY: number[] = [];
    for ( let tavolo = 0; tavolo < tavoloj; tavolo++ ) {
      const tFrakcio = tavolo / ( tavoloj - 1 );
      // Inter 0o11/0o40 ( 0.28 ) kaj 0o25/0o40 ( 0.78 ) de la alto — la
      // antaŭa gamo komenciĝis je 0.44, do preskaŭ duono de la trunko restis
      // nuda stango sub la foliaro.
      const y = h * ( 0o11/0o40 + 0o1/0o2 * tFrakcio );
      tavolajY.push(y);
      const tavolaSkalo = ( 1 - tavolo * 0o1/0o20 ) * ( 1 + t.s * 0o1/0o4 );
      const trunkaR = trunkoR(y);
      // ⟨ Kiom malfermita estas la tavolo 📃 ⟩ — la plej malsupraj folioj de
      // ĉiu tavolo restas pli mallongaj kaj pli proksime al la trunko, kaj la
      // supraj tavoloj malfermiĝas pli ( kiel vera laktuka rozo ). 0 malsupre,
      // 1 supre.
      const malfermo = 0o1/0o2 + 0o1/0o2 * tFrakcio;
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        const angulo = flanko / 4 * Math.PI * 2;
        // La folio KRESKAS EL LA TRUNKO: la bazo sidas sur la trunka surfaco
        // ( iomete interne, por ke neniu interspaco videblu ) INTERNE de la
        // ŝela taso, kaj la klingo LEVIĝAS supren el la taso antaŭ ol kliniĝi
        // eksteren. Antaŭe la bazo staris je trunkoR + 0.1, tute en la aero,
        // kaj la folioj aspektis kiel ŝvebantaj plumoj apud la trunko.
        E.set(0o1/0o20 + 0o3/0o20 * malfermo, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        const skalo = tavolaSkalo
          * ( 0o13/0o20 + 0o3/0o20 * malfermo + hazardaGenerilo() * 0o1/0o20 );
        M.compose(pozicio(new THREE.Vector3(
            Math.sin(angulo) * trunkaR * 0o7/0o10, y, Math.cos(angulo) * trunkaR * 0o7/0o10)),
          Q, new THREE.Vector3(skalo, skalo, skalo));
        folioj.setMatrixAt(fi, M);
        folioj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
        fi++;
      }
    }

    // Ŝelaj tasoj — unu ĉe ĉiu folia tavolo. La taso malfermiĝas SUPren kaj
    // eksteren ( trumpeto ), kaj ĝia mallarĝa malsupro staras iomete sub la
    // foliaj bazoj, do la folioj leviĝas el la INTERNO de la taso kaj etendiĝas
    // eksteren super ĝia rando. Poste pluaj tasoj supren sur la nudan
    // trunkopinton, por ke la pinto aspektu kiel stako de tasoj, kiel en la
    // skulptaĵo.
    const sxelaAlto = 0o15/0o20;
    // ⟨ La konusoj estas KONTINUA stako 📃 ⟩ — la spaco inter la supraj tasoj
    // estis 0o11/0o10 ( 1.125 ) dum la taso mem altas nur 0.8125. Inter ĉiu paro
    // de supraj tasoj restis videbla truo, do la supraĵo aspektis kiel konusoj
    // ŜVEBANTAJ ĉirkaŭ la maldika trunkopinto ( tie la trunko mallarĝiĝas al
    // nulo per trunkopintaProfilon ). Nun la spaco estas 60% de la tasa alto, do
    // ĉiu taso eniras la sekvan kaj la tuta supraĵo legiĝas kiel unu kono.
    const ringaSpaco = sxelaAlto * 0o6/0o10;
    const lastaTavolaY = tavolajY[tavolajY.length - 1];
    const suprajRingoj = Math.max(1, Math.ceil(( h - sxelaAlto - lastaTavolaY ) / ringaSpaco));
    for ( let ringo = 0; ringo < tavoloj + suprajRingoj; ringo++ ) {
      const sxelaY = ringo < tavoloj
        ? tavolajY[ringo]
        : lastaTavolaY + ( ringo - tavoloj + 1 ) * ringaSpaco;
      if ( sxelaY > h - sxelaAlto ) break;
      // La taso sidas ĝuste sur la trunko — iomete pli larĝa ol la ŝelo,
      // por ke la rando videblu, sed ne tiom ke ĝi aspektu kiel funelo.
      // La malsupro de la taso iras 0o14/0o40 da tasalto SUB la foliaj bazoj.
      // ⟨ La konoj supren 📃 ⟩ — la supraj tasoj ( super la lasta folia tavolo )
      // NE estas egallarĝaj kiel antaŭe, kiam la trunkopinto aspektis kiel
      // kolono de identaj teleroj. Ili sekvas la trunkan profilon kaj malfermiĝas
      // nur iomete, do la tuta supraĵo legiĝas kiel unu kono.
      const superaj = ringo < tavoloj ? 0 : ( ringo - tavoloj + 1 ) / suprajRingoj;
      // ⟨ Etendiĝi EKSTEREN 📃 ⟩ — antaŭe la ringoj super la lasta folia
      // tavolo MALlarĝiĝis supren ( faktoro 1 − 0.62 ), do la tuta supro estis
      // pinto kaj la planto aspektis kiel lanco. Nun ili MALFERMIĝas iomete —
      // ĉiu pli alta ringo estas iomete pli larĝa ol la antaŭa, kiel laktuka
      // kapo malfermiĝanta.
      // ⟨ Malfermo 📃 ⟩ — la malfermo estis 0.30, kiu kun la pinta kono faris
      // funelon super la foliaro. Nun la suprajn tasojn kovras la tri pinta
      // TAVOLOJ de folioj ( vidu malsupre ), do la tasoj povas resti preskaŭ
      // laŭ la trunka profilo kaj la supro legiĝas kiel foliaro, ne kiel taso.
      // ⟨ Nur malmulte 📃 ⟩ — la antaŭa faktoro 1.18 larĝigis la suprajn tasojn
      // dum la trunko mallarĝiĝis supren, do la pinto aspektis kiel teleroj sur
      // bastono. 6% sufiĉas por legiĝi kiel malfermiĝanta laktuka kapo, sed la
      // tasoj restas brakitaj al la trunko.
      const konaFaktoro = 1 + 0.06 * superaj;
      // ⟨ La mezuro venas el la tas-MALSUPRO 📃 ⟩ — la taso brakumas la trunkon
      // ĉe sia malsupro, kaj tie la trunko estas la plej DIKA ( ĝi mallarĝiĝas
      // supren ). Mezuri ĉe la centro de la taso donis tro malgrandan radiuson,
      // do la subaj tasoj povis flosi ĉirkaŭ la ŝelo. La alto de tiu malsupro
      // samtempe estas la pozicio de la taso, do ambaŭ uzas la saman nombron.
      const sxelaBazo = sxelaY - sxelaAlto * 0o14/0o40 + sxelaAlto * 0o3/0o10 * superaj;
      const ringaSkalo = Math.max(0o1/0o20,
        trunkoR(Math.max(0, sxelaBazo)) / ( 0o13/0o40 ) * 0o11/0o10) * konaFaktoro;
      M.compose(pozicio(new THREE.Vector3(0, sxelaBazo, 0)), Qtrunko,
        new THREE.Vector3(ringaSkalo, sxelaAlto, ringaSkalo));
      sxeloj.setMatrixAt(si, M);
      // ⟨ Ĉiu taso sekvas la trunkan tonon 📃 ⟩ — la koluma materialo ĉiam legas
      // la SAMAN bandon de la ŝela bildo ( la plej helan, kie sidas la koluma
      // foli-desegno ), do sen ĝi ĉiu taso havus la plej supran tonon de la
      // trunko — ankaŭ la tasoj malalte sur la ŝelo, kiuj tiam aspektis multe pli
      // helaj ol la trunko apud ili. Nun ĉiu taso ricevas la tonon, kiun la
      // trunko mem havas ĉe la sama alto, do la tasoj transiras senkude en la
      // trunkon ĉe ĉiu nivelo — la kono kaj la trunko estas unu objekto.
      const trunkaTono = sxelaTrunkaKoloro(sxelaBazo / h);
      C.setRGB(
        Math.min(1, trunkaTono[0] / kolumaTono[0]),
        Math.min(1, trunkaTono[1] / kolumaTono[1]),
        Math.min(1, trunkaTono[2] / kolumaTono[2]));
      sxeloj.setColorAt(si, C);
      si++;
    }

    // ⟨ La pinta krono 📃 ⟩ — la ŝlefo NE finiĝas per pinto, sed ankaŭ NE per
    // plata telero. La supro estas kvar TAVOLOJ kiel la ceteraj, sed ili
    // MALGRANDIĜAS supren: la plej malsupra malfermiĝas eksteren super la
    // randon de la lasta taso, kaj ĉiu sekva stariĝas kaj mallongiĝas, ĝis la
    // plej supra estas malgranda burĝono de junaj folioj, kiu fermas la
    // trunkopinton. Antaŭe la supraj folioj estis la PLEJ GRANDAJ ( skalo
    // 0.83–0.95 kontraŭ 0.55 malsupre ), do la kapo larĝiĝis supren kaj la
    // krono de supre aspektis kiel plata folia stelo kun la trunka disko en la
    // mezo. Nun la plej supra tavolo sidas ĝuste sur la pinto ( pintaR = 0, la
    // profilo de trunkopintaProfilon ), do ĝiaj folioj eliras el la pinto mem.
    const PINTAJ_TAVOLOJ = 0o4;
    const pintaAlto = Math.min(h, lastaTavolaY + suprajRingoj * ringaSpaco);
    const pintaBazo = Math.min(lastaTavolaY + ringaSpaco * 0o2/0o10, pintaAlto);
    const pintaFazo = hazardaGenerilo() * Math.PI * 2;
    for ( let tavolo = 0; tavolo < PINTAJ_TAVOLOJ; tavolo++ ) {
      const tFrakcio = tavolo / ( PINTAJ_TAVOLOJ - 1 );
      const pintaY = pintaBazo + ( pintaAlto - pintaBazo ) * tFrakcio;
      // Ju pli supre, des pli la folio stariĝas: 20° malsupre, 3° supre — la
      // sama klino kiel la tavolaj folioj, sed finiĝanta en fermita burĝono.
      const elklino = 0.35 - tFrakcio * 0.30;
      const pintaR = trunkoR(pintaY) * 0o7/0o10;
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        // La tavoloj ŝoviĝas unu kontraŭ la alia — la folioj ne formas radiuson.
        const angulo = pintaFazo + tavolo * 0o1/0o2 + flanko / 4 * Math.PI * 2;
        E.set(elklino + ( hazardaGenerilo() - 0o5/0o10 ) * 0o2/0o20, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        // La supraj folioj estas la SAMaj folioj kiel la tavolaj — nur pli
        // junaj, do pli mallongaj kaj pli mallarĝaj.
        const skalo = ( 1 + t.s * 0o1/0o4 )
          * ( 0.92 - tFrakcio * 0.60 + hazardaGenerilo() * 0o1/0o10 );
        M.compose(pozicio(new THREE.Vector3(
            Math.sin(angulo) * pintaR, pintaY, Math.cos(angulo) * pintaR)),
          Q, new THREE.Vector3(skalo, skalo, skalo));
        folioj.setMatrixAt(fi, M);
        folioj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
        fi++;
      }
    }
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  folioj.count = fi;
  folioj.instanceMatrix.needsUpdate = true;
  if ( folioj.instanceColor ) folioj.instanceColor.needsUpdate = true;
  sxeloj.count = si;
  sxeloj.instanceMatrix.needsUpdate = true;
  if ( sxeloj.instanceColor ) sxeloj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = folioj.castShadow = sxeloj.castShadow = true;
  sceno.add(trunkoj, folioj, sxeloj);
  return trunkoj;
}

// konstruiPussxlefojn — Konstruu instancigitajn Pussxlefojn
// ( ſ̀ȷɔ ı],ͷ̗ɔʞ ſןɹɔ˞ ꞁȷ̀ᴜꞇ / Pussxlefo ) — fern-grandaj purpuraj laktukaj
// plantoj, etaj Ĥŝakŝlefoj. mallonga purpura trunko, 1–2 tavoloj de la samaj
// kurbiĝintaj laktukaj folioj kaj unu ŝela taso ĉe la unua tavolo. La
// travideblaj manĝeblaj beroj kreiĝas aparte ( mangxajxoj.ts ).
//     @param plantoj ( ArboMetado[] ) - La metitaj plantoj.
export function konstruiPussxlefojn(sceno: THREE.Scene,
  plantoj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = mulberry32(0o62450);
  const MAX_TAVOLOJ = 2;
  // Purpura trunko — kiel la Ĥŝakŝlefo, nur pli maldika por la eta planto.
  const trunkaGeometrio = new THREE.CylinderGeometry(0o3/0o40, 0o5/0o40, 1, 0o30, 0o20);
  // ⟨ La trunkopinto 📃 ⟩ — la sama rondigita pinto kiel ĉe la granda
  // Ĥŝakŝlefo: la plata supra kovrilo de la cilindro malaperas.
  {
    const pozicioj = trunkaGeometrio.attributes.position;
    for ( let i = 0; i < pozicioj.count; i++ ) {
      const f = trunkopintaProfilon(pozicioj.getY(i) + 0o1/0o2);
      pozicioj.setXYZ(i, pozicioj.getX(i) * f, pozicioj.getY(i), pozicioj.getZ(i) * f);
    }
    trunkaGeometrio.computeVertexNormals();
  }
  const trunkaMaterialo = kreiSxelanRinganMaterialon(0.05, false);
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, plantoj.length);
  if ( plantoj.length === 0 ) return trunkoj;

  const foliaGeometrio = konstruiKurbanLaktukanFolion();
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiPurpuranFolianTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 0o63/0o100,
  });
  // Kapacito: la folioj de la tavoloj PLUS la tri pinta krono-tavoloj ( vidu
  // malsupre ) — 2 tavoloj × 4 flankoj + 3 × 4 = 20.
  const folioj = new THREE.InstancedMesh(foliaGeometrio, foliaMaterialo, plantoj.length * ( MAX_TAVOLOJ * 4 + 0o24 ));
  const sxelaGeometrio = konstruiSxelanRingon();
  const sxelaMaterialo = kreiSxelanRinganMaterialon(0.015, true);
  const sxeloj = new THREE.InstancedMesh(sxelaGeometrio, sxelaMaterialo, plantoj.length);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x8848a8, 0x9858b8, 0xa868c0, 0x7840a0, 0x9050b0 ];
  const yUp = new THREE.Vector3(0, 1, 0);
  let fi = 0;
  let si = 0;

  plantoj.forEach(( t, i ) => {
    // Fern-granda — la planto estas eta Ĥŝakŝlefo, ~0.65–1.2 unuojn alta.
    const h = ( 0o5/0o10 + t.s * 0o3/0o10 ) * ( 0o6/0o10 + hazardaGenerilo() * 0o3/0o10 );
    // Skribu la realan plant-alton reen sur la metadon — la ber-klastroj
    // ( mangxajxoj.ts ) bezonas gxin por sidi en la ŝela taso.
    t.plantAlto = h;
    const Qtrunko = kreiKlinoQuaternionon(hazardaGenerilo, 0o1/0o10, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Qtrunko);

    M.compose(pozicio(new THREE.Vector3(0, h / 2, 0)), Qtrunko,
      new THREE.Vector3(1, h, 1));
    trunkoj.setMatrixAt(i, M);

    // La trunka radiuso je la alto y — la sama profilo kiel la trunka geometrio
    // ( inkluzive de la rondigita pinto ), do la folioj kaj la taso ĉiam sidas
    // sur la ŝelo kaj la pinta krono kongruas kun la pinto.
    const trunkaR = ( y: number ): number =>
      ( 0o5/0o40 - ( y / h ) * 0o2/0o40 ) * trunkopintaProfilon(y / h);

    // 1–2 tavoloj × kvar flankoj — la folioj ĉirkaŭas la trunkon egale.
    const tavoloj = 1 + ( ( hazardaGenerilo() * 2 ) | 0 );
    for ( let tavolo = 0; tavolo < tavoloj; tavolo++ ) {
      const tFrakcio = tavoloj === 1 ? 0 : tavolo / ( tavoloj - 1 );
      // La foliaj tavoloj sidas ĉe 0o3/0o10 ( 0.375 ) kaj 0o6/0o10 ( 0.75 )
      // de la alto, por ke la trunkopinto videblu super la foliaro.
      const y = h * ( 0o3/0o10 + 0o3/0o10 * tFrakcio );
      const tavolaSkalo = ( 1 - tavolo * 0o1/0o10 );
      // La trunka radiuso ĉe tiu alto — la folia bazo kreskas el la ŝelo
      // mem ( iomete interne ), kiel ĉe la granda Ĥŝakŝlefo. Antaŭe ĝi
      // staris 0.0625 ekster la trunko — videbla truo ĉe tiel maldika ŝelo.
      const trunkaRadiuso = trunkaR(y);
      const ellagxo = trunkaRadiuso * 0o7/0o10;
      // ⟨ Simetrio 📃 ⟩ — la kvar flankoj de ĉiu folia tavolo turniĝas per la
      // SAMA grandeco kaj la SAMA klino, do la planto estas kvar-obla simetria.
      // Antaŭe ĉiu el la kvar folioj ricevis sian propran hazardan skalon, do la
      // planto aspektis dise ĵetita anstataŭ kiel malgranda laktuka rozo.
      const skalo = tavolaSkalo * ( 0o12/0o100 + hazardaGenerilo() * 0o13/0o100 );
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        const angulo = flanko / 4 * Math.PI * 2;
        E.set(0o2/0o10, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        M.compose(pozicio(new THREE.Vector3(
            Math.sin(angulo) * ellagxo, y, Math.cos(angulo) * ellagxo)),
          Q, new THREE.Vector3(skalo, skalo, skalo));
        folioj.setMatrixAt(fi, M);
        folioj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
        fi++;
      }
    }

    // Unu ŝela taso ĉe la unua folia tavolo — nur por plantoj sufiĉe altaj,
    // por ke la taso ne enfalu en la teron.
    //
    // ⟨ La tasalta proporcio 📃 ⟩ — antaŭe la taso estis FIKSaj 0.375 unuoj
    // altaj, sed la tuta planto altas nur 0.5–0.7! La taso do kovris la plej
    // grandan parton de la planto kaj KAŜIS la foliojn. La taso nun estas
    // 20% de la planto, kun la sama proporcio kiel ĉe la granda Ĥŝakŝlefo.
    const unuaTavolaY = h * 0o3/0o10;
    const sxelaAlto = h * 0o2/0o10;
    if ( unuaTavolaY <= h - sxelaAlto ) {
      // ⟨ La mezuro venas el la tas-MALSUPRO 📃 ⟩ — la sama regulo kiel ĉe la
      // granda Ĥŝakŝlefo: la taso brakumas la trunkon ĉe sia malsupro, kie la
      // trunko estas la plej dika.
      const tasMalsupro = unuaTavolaY - sxelaAlto * 0o14/0o40;
      const trunkaRadiuso = trunkaR(tasMalsupro);
      const ringaSkalo = Math.max(0o3/0o40, trunkaRadiuso / ( 0o13/0o40 ) * 0o11/0o10);
      // La taso malfermiĝas supren; ĝia malsupro staras sub la foliaj bazoj,
      // do la folioj leviĝas el la interno de la taso ( la sama aranĝo kiel
      // ĉe la granda Ĥŝakŝlefo ).
      M.compose(pozicio(new THREE.Vector3(0, unuaTavolaY - sxelaAlto * 0o14/0o40, 0)), Qtrunko,
        new THREE.Vector3(ringaSkalo, sxelaAlto, ringaSkalo));
      sxeloj.setMatrixAt(si, M);
      si++;
    }

    // ⟨ La pinta krono 📃 ⟩ — same kiel ĉe la granda Ĥŝakŝlefo: la planto ne
    // finiĝu per nuda trunkopinto, sed la supro ankaŭ ne estu plata telero.
    // Tri malgrandaj tavoloj da folioj KIEL LA CETERAJ, kiuj MALGRANDIĜAS
    // supren: la plej malsupra malfermiĝas eksteren super la foliaron, kaj la
    // plej supra sidas ĝuste sur la pinto kiel fermita burĝono ( antaŭe la du
    // pintaj tavoloj finiĝis ĉe 0.856 h, do la supra 14% de la trunko restis
    // nuda stango kun ĝia plata kovrilo ).
    const PINTAJ_TAVOLOJ = 0o3;
    const pintaBazo = h * 0o7/0o10;
    const pintaAlto = h;
    for ( let tavolo = 0; tavolo < PINTAJ_TAVOLOJ; tavolo++ ) {
      const tFrakcio = tavolo / ( PINTAJ_TAVOLOJ - 1 );
      const pintaY = pintaBazo + ( pintaAlto - pintaBazo ) * tFrakcio;
      const elklino = 0.35 - tFrakcio * 0.30;
      const trunkaRadiuso = trunkaR(pintaY);
      // ⟨ La pinta krono estas simetria 📃 ⟩ — la pinto ne plu turniĝas per
      // hazarda fazo kaj la tavoloj ne plu ŝoviĝas unu kontraŭ la alia, do ĉiuj
      // kvar flankoj de ĉiu tavolo staras samloke kaj la pinto legiĝas kiel
      // kvar-obla simetria konuso.
      const skalo = ( 0o12/0o100 + hazardaGenerilo() * 0o13/0o100 )
        * ( 0.75 - tFrakcio * 0.45 );
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        const angulo = flanko / 4 * Math.PI * 2;
        E.set(elklino, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        M.compose(pozicio(new THREE.Vector3(
            Math.sin(angulo) * trunkaRadiuso * 0o7/0o10, pintaY,
            Math.cos(angulo) * trunkaRadiuso * 0o7/0o10)),
          Q, new THREE.Vector3(skalo, skalo, skalo));
        folioj.setMatrixAt(fi, M);
        folioj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
        fi++;
      }
    }
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  folioj.count = fi;
  folioj.instanceMatrix.needsUpdate = true;
  if ( folioj.instanceColor ) folioj.instanceColor.needsUpdate = true;
  sxeloj.count = si;
  sxeloj.instanceMatrix.needsUpdate = true;
  if ( sxeloj.instanceColor ) sxeloj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = folioj.castShadow = sxeloj.castShadow = true;
  sceno.add(trunkoj, folioj, sxeloj);
  return trunkoj;
}

// kreiHerbanKlingon — UNU herba klingo kiel VERA tri-dimensia rubando.
//
// ⟨ Kial ne kartono 📃 ⟩ — la herbo estis krucitaj kartoj ( du ebenaj
// ortanguloj kun alfa-teksajxo ), do ĉiu tufo estis plata: de iu ajn angulo oni
// vidis la rektan randon de la kartono kaj la klingoj ne havis profilon nek
// aĝon. Ĉi tiu klingo estas rubando el TRI kolonoj ( maldekstra, levita meza
// kresto, dekstra ) kaj KVAR segmentoj: ĝi kurbiĝas flanken kaj antaŭen, ĝi
// mallarĝiĝas al akra pinto, kaj ĝi tORDIĜAS ĉirkaŭ sia propra akso, do ĉiu
// klingo kaptas la lumon alie.
//     @param longo ( number ) - La longo de la klingo ( 1 = la tufa alto ).
//     @param largho ( number ) - La larĝo ĉe la bazo.
//     @param klino ( number ) - Kiom la pinto kliniĝas flanken ( +x ).
//     @param arko ( number ) - Kiom la pinto kurbiĝas antaŭen ( +z ).
//     @param tordo ( number ) - Kiom la klingo turniĝas ĉirkaŭ sia akso.
//     @param koloro ( THREE.Color ) - La per-klinga nuanco ( multiplikata ).
//     @returns geometrio ( THREE.BufferGeometry ) - La klingo.
function kreiHerbanKlingon(longo: number, largho: number, klino: number,
  arko: number, tordo: number, koloro: THREE.Color): THREE.BufferGeometry {
  const SEGMENTOJ = 0o4;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const koloroj: number[] = [];
  const indeksoj: number[] = [];
  for ( let i = 0; i <= SEGMENTOJ; i++ ) {
    const t = i / SEGMENTOJ;
    // La centro de la klingo — la pinto kliniĝas flanken ( klino ) kaj
    // kurbiĝas antaŭen ( arko ) kiel herba folio sub sia propra pezo.
    const cx = klino * t * t;
    const cz = arko * t * t;
    const duonLarĝo = largho * 0.5 * Math.pow(1 - t, 0o7/0o10);
    // La meza kolono estas levita laŭ la loka Z — la kresto de la klingo.
    const kresto = duonLarĝo * 0.9 + largho * 0.12;
    // La tordo turnas la kolonojn ĉirkaŭ la vertikala akso.
    const ang = tordo * t;
    const cos = Math.cos(ang), sin = Math.sin(ang);
    const kolonoj: [ number, number ][] = [
      [ -duonLarĝo, 0 ], [ 0, kresto ], [ duonLarĝo, 0 ] ];
    for ( let kol = 0; kol < 0o3; kol++ ) {
      const dx = kolonoj[kol][0], dz = kolonoj[kol][1];
      pozicioj.push(cx + dx * cos - dz * sin, longo * t, cz + dx * sin + dz * cos);
      uvoj.push(kol === 0 ? 0 : ( kol === 1 ? 0.5 : 1 ), t);
      koloroj.push(koloro.r, koloro.g, koloro.b);
    }
  }
  for ( let i = 0; i < SEGMENTOJ; i++ ) {
    for ( let kol = 0; kol < 0o2; kol++ ) {
      const a = i * 0o3 + kol, b = a + 1, c = a + 0o3, d = a + 0o4;
      indeksoj.push(a, c, b, b, c, d);
    }
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
  geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 2));
  geometrio.setAttribute("color", new THREE.Float32BufferAttribute(koloroj, 3));
  geometrio.setIndex(indeksoj);
  geometrio.computeVertexNormals();
  return geometrio;
}

// konstruiHerbanTufanGeometrion — Tufo el veraj klingoj. La klingoj staras sur
// eta disko ( pli densaj meze ), ĉiu kun sia propra longo, klino, arko kaj
// tordo; kelkaj ( ĉiu kvina ) estas SEKaj kaj flavaj. La koloroj estas pakataj
// en la geometrian kolor-aron, do unu materialo kaj unu instancomesho sufiĉas.
//     @param semo ( number ) - La semo de la aranĝo ( ĉiuj tufoj samas ).
//     @returns geometrio ( THREE.BufferGeometry ) - La tufo.
function konstruiHerbanTufanGeometrion(semo = 0o2715): THREE.BufferGeometry {
  const hazardo = mulberry32(semo);
  const klingoj: THREE.BufferGeometry[] = [];
  const verda = new THREE.Color();
  const seka = new THREE.Color();
  const KLINGOJ = 0o34;   // 28 klingoj
  for ( let i = 0; i < KLINGOJ; i++ ) {
    // La disko de la bazoj — densa meze ( sqrt donas egalan areon ).
    const ang = hazardo() * Math.PI * 2;
    const r = 0.17 * Math.sqrt(hazardo());
    const bazoX = Math.cos(ang) * r, bazoZ = Math.sin(ang) * r;
    // La klingoj de la rando klinas eksteren multe pli ol la internaj.
    const elen = 0o5/0o10 + r * 0.7;
    // ⟨ Larĝaj klingoj 📃 ⟩ — ĉe 0.020–0.034 la klingoj estis fadenoj: la tufo
    // aspektis kiel dratoj anstataŭ herbo. Herba klingo larĝas ĉirkaŭ 5% de sia
    // longo, kaj la plej longaj klingoj estas ankaŭ la plej dikaj ( la malnovaj
    // estis pli MALDlKAJ ju pli longaj, kio estas malnatura ).
    const longo = 0.42 + hazardo() * 0.6;
    const largho = ( 0.026 + hazardo() * 0.016 ) * ( 0.72 + longo * 0.4 );
    // ⟨ La arko de la pintoj 📃 ⟩ — la klingoj de la RANDO ne nur klinas, ili
    // ankaŭ KURBIĜAS super la tufo ( herbo malfermiĝas kiel fontano ); sen tio
    // la tufo estas fasko de rektoj. La internaj klingoj restas preskaŭ vertikalaj.
    const arkaFaktoro = 0.55 + r * 2.2;
    const klino = Math.cos(ang) * elen * ( 0.35 + hazardo() * 0.65 )
      + ( hazardo() - 0.5 ) * 0.16;
    const arko = Math.sin(ang) * elen * ( 0.35 + hazardo() * 0.65 ) * arkaFaktoro
      + ( hazardo() - 0.5 ) * 0.16;
    const tordo = ( hazardo() - 0.5 ) * 1.2;
    // La nuanco — ĉiu klingo iomete malsamas, kaj ĉiu kvara estas seka.
    const sekaKlingo = i % 0o4 === 0o1;
    if ( sekaKlingo ) {
      seka.setRGB(1.06, 0.84 + hazardo() * 0.1, 0.34 + hazardo() * 0.16 );
    } else {
      verda.setRGB(0.72 + hazardo() * 0.34, 0.8 + hazardo() * 0.28, 0.62 + hazardo() * 0.3);
    }
    const klingo = kreiHerbanKlingon(longo, largho, klino, arko, tordo,
      sekaKlingo ? seka : verda);
    klingo.translate(bazoX, 0, bazoZ);
    klingoj.push(klingo);
  }
  return kunfandiGeometriojnSenIndekson(klingoj);
}

// konstruiHerbon — Metu instancigitajn herberojn en la arbaron.
export function konstruiHerbon(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = mulberry32(44261);
  // ⟨ Veraj klingoj 📃 ⟩ — la tufo estas konstruata el 22 tri-dimensiaj
  // klingoj ( vidu kreiHerbanKlingon ), ne el krucitaj kartoj. La materialo ne
  // bezonas alfa-teston ( la formon portas la geometrio ) kaj la per-klingajn
  // nuancojn portas la vertica kolor-aro.
  const herbaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiHerbanKlinganTeksajxon(), side: THREE.DoubleSide,
    vertexColors: true, roughness: 1,
  });
  const herboj = new THREE.InstancedMesh(konstruiHerbanTufanGeometrion(), herbaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let hi = 0;
  let gardilo = 0;

  while ( hi < kvanto && gardilo++ < 0o5660 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    // La herbo kovras la TUTAN valan biomon ( ±0o600 = la monda krado ) — la
    // biomo-filtrilo tenas gxin en la valo/malseka bordo, do nenia vala loko
    // restas nuda.
    const radiuso = 0o20 + 0o1000 * Math.sqrt(hazardaGenerilo());
    const x = Math.sin(angulo) * radiuso;
    const z = Math.cos(angulo) * radiuso;
    if ( Math.abs(x) > 0o600 || Math.abs(z) > 0o600 ) continue;
    // La biomo — la herbo restas en la vala biomo ( la montaj pintoj estas
    // rokoj kaj likenoj, ne herbejoj ).
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) continue;
    if ( excludeRivers(x, z) ) continue;
    if ( excludePaths(x, z, 2) ) continue;
    if ( excludeBuildings(x, z, 2) ) continue;
    if ( Math.hypot(x, z) < 0o16 ) continue;
    // Eta interspaco — la herboj kresku kiel tufoj, ne kiel solida tapiŝo.
    if ( !punktoLibera(metitajHasho, x, z, 0o12/0o10) ) continue;

    // ⟨ Neniu tufo staras rekte 📃 ⟩ — kun skalo egala en ĉiuj tri aksoj kaj
    // neniom da klino ĉiu tufo estis perfekte vertikala kaj same alta, do la
    // herbejo montriĝis kiel regula tapiŝo el la samaj kartoj. La klino, la
    // malegala alto kaj la etaj varioj de la larĝo rompas tion.
    const skalo = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(( hazardaGenerilo() - 0.5 ) * 0.16,
      hazardaGenerilo() * Math.PI * 2,
      ( hazardaGenerilo() - 0.5 ) * 0.16);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(skalo * ( 0.85 + hazardaGenerilo() * 0.3 ),
        skalo * ( 0.75 + hazardaGenerilo() * 0.55 ),
        skalo * ( 0.85 + hazardaGenerilo() * 0.3 )));
    herboj.setMatrixAt(hi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  herboj.count = hi;
  herboj.instanceMatrix.needsUpdate = true;
  sceno.add(herboj);
}

// konstruiMusxajnMontetojn — Metu musko montetojn proksime al arboj.
export function konstruiMusxajnMontetojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  const hazardaGenerilo = mulberry32(66173);
  const muskaGeometrio = konstruiFlokanMuskanGeometrion();
  const muskaTeksturo = kreiMuskanTeksajxon();
  const muskaMaterialo = new THREE.MeshStandardMaterial({ map: muskaTeksturo, color: 0xffffff, roughness: 1 });
  const muskoj = new THREE.InstancedMesh(muskaGeometrio, muskaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const normalo = new THREE.Vector3();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  const ena = new THREE.Vector3();
  const enX = new THREE.Vector3();
  const enZ = new THREE.Vector3();
  const vertikala = new THREE.Vector3(0, 1, 0);
  const yawQ = new THREE.Quaternion();
  let mi = 0;
  let gardilo = 0;

  while ( mi < kvanto && gardilo++ < 0o3710 ) {
    let x: number, z: number;
    if ( hazardaGenerilo() < 0o26/0o40 && nearTrees.length ) {
      const t = nearTrees[( hazardaGenerilo() * nearTrees.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 3;
      x = t.x + Math.sin(a) * hazardaRadiuso;
      z = t.z + Math.cos(a) * hazardaRadiuso;
    } else {
      const a = hazardaGenerilo() * Math.PI * 2;
      const r = 0o22 + hazardaGenerilo() * 0o166;
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
    }
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) ) continue;
    if ( Math.hypot(x, z) < 0o20 ) continue;
    // Eta interspaco — la musko montetoj restu apartaj, ne kunfanditaj.
    if ( !punktoLibera(metitajHasho, x, z, 0o2) ) continue;

    const skalo = 0o3/0o10 + hazardaGenerilo() * 0o5/0o10;
    const y = heightFn(x, z);
    const paso = skalo * 0o1/0o2;
    ena.set(x, y, z);
    enX.set(x + paso, heightFn(x + paso, z), z).sub(ena);
    enZ.set(x, heightFn(x, z + paso), z).sub(ena);
    normalo.crossVectors(enZ, enX).normalize();
    const vert = normalo.y;
    const horiz = Math.hypot(normalo.x, normalo.z);
    const maxKruteco = Math.PI / 16;
    if ( horiz > 0o1/0o2000 && Math.atan2(horiz, Math.max(vert, 0o1/0o2000)) > maxKruteco ) {
      const u = Math.tan(maxKruteco);
      const hx = normalo.x / horiz;
      const hz = normalo.z / horiz;
      normalo.set(hx * u, 1, hz * u);
    }
    normalo.normalize();
    Q.setFromUnitVectors(vertikala, normalo);
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    yawQ.setFromEuler(E);
    Q.multiply(yawQ);
    // Sen la pli malalta platformo la fadenaj bazoj estas ĉe y = 0 — metu
    // la monteton ĝuste sur la teron anstataŭ la malnova kusena ofseto.
    M.compose(new THREE.Vector3(x, y + 0o1/0o40, z), Q,
      new THREE.Vector3(skalo, skalo * 0o5/0o10, skalo));
    muskoj.setMatrixAt(mi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  muskoj.count = mi;
  muskoj.instanceMatrix.needsUpdate = true;
  sceno.add(muskoj);
}

// konstruiFalintajnTrunkojn — Metu falintajn arbtrunkojn en la arbaron.
export function konstruiFalintajnTrunkojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean
): [ number, number ][][] {
  const hazardaGenerilo = mulberry32(22931);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const sxelaBumpo = kreiSxelanBumpanTeksajxon();
  const trunkaGeometrio = new THREE.CylinderGeometry(0o3/0o10, 0o4/0o10, 1, 7, 1);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, bumpMap: sxelaBumpo, bumpScale: 0o6/0o10, roughness: 0o67/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  const falintajRandoj: [ number, number ][][] = [];
  let ti = 0;
  let gardilo = 0;

  while ( ti < kvanto && gardilo++ < 0o3710 ) {
    let x: number, z: number;
    if ( hazardaGenerilo() < 0o26/0o40 && nearTrees.length ) {
      const t = nearTrees[( hazardaGenerilo() * nearTrees.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 4;
      x = t.x + Math.sin(a) * hazardaRadiuso;
      z = t.z + Math.cos(a) * hazardaRadiuso;
    } else {
      const a = hazardaGenerilo() * Math.PI * 2;
      const r = 0o30 + hazardaGenerilo() * 0o160;
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
    }
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o3) ) continue;
    if ( Math.hypot(x, z) < 0o20 ) continue;
    // Eta interspaco — la falintaj trunkoj ne kuŝu krucigitaj sur la grundo.
    if ( !punktoLibera(metitajHasho, x, z, 0o3) ) continue;

    const longo = 0o12/0o10 + hazardaGenerilo() * 0o22/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, Math.PI / 2 + ( hazardaGenerilo() - 0o4/0o10 ) * 0o4/0o10);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z) + 0o4/0o10, z), Q, new THREE.Vector3(1, longo, 1));
    trunkoj.setMatrixAt(ti++, M);
    metitajHasho.meti(x, z, [ x, z ]);
    // Piedaj randoj por la kolizioj — la sama Eulera rotacio ( yaw = angulo ),
    // kiun la matrico uzas ( Rz unue klinas la akson al -x, Ry turnas ĝin ),
    // do la ringo kongruas kun la vidita trunko.
    const angulo = E.y;
    const piedoj: [ number, number ][] = [];
    for ( let k = 0; k < 0o5; k++ ) {
      const t = ( k + 0o1/0o2 ) / 0o5 - 0o1/0o2;   // -0o4/0o10 .. 0o4/0o10 laŭlonge
      piedoj.push([ x - Math.cos(angulo) * longo * t, z + Math.sin(angulo) * longo * t ]);
    }
    falintajRandoj.push(piedoj);
  }

  trunkoj.count = ti;
  trunkoj.instanceMatrix.needsUpdate = true;

  sceno.add(trunkoj);
  return falintajRandoj;
}

// kreiRibitanSegmenton — Unu riba kan-segmento kun stel-forma transversa sekco.
// La alterna radiuso ( kresto, valo, kresto ... ) donas la profundajn vertikalajn
// ripojn de vera ĉevalvosto — ne nura platsurfaca cilindro. Fermitaj ĉapoj
// supre kaj malsupre ( la malsupra kaŝiĝas en la grundo, la supra sub la
// sekva segmento aŭ la strobilo ).
//     @param rMalsupra ( number ) - Radiuso de la malsupra ringo.
//     @param rSupra ( number ) - Radiuso de la supra ringo.
//     @param alto ( number ) - Segmenta alto.
//     @param flankoj ( number ) - Kiom da ripoj ( krestoj ).
//     @param kresta ( number ) - Kiom profunde la valoj falas ( 0 = cilindro ).
function kreiRibitanSegmenton(rMalsupra: number, rSupra: number, alto: number,
  flankoj: number, kresta: number): THREE.BufferGeometry {
  const ringo = flankoj * 2;   // krestoj kaj valoj alternas
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let k = 0; k < ringo; k++ ) {
    const ang = k / ringo * Math.PI * 2;
    const faktoro = ( k % 2 === 0 ) ? 1 : ( 1 - kresta );
    pozicioj.push(Math.cos(ang) * rMalsupra * faktoro, 0, Math.sin(ang) * rMalsupra * faktoro);
    uvoj.push(k / ringo, 0);
    pozicioj.push(Math.cos(ang) * rSupra * faktoro, alto, Math.sin(ang) * rSupra * faktoro);
    uvoj.push(k / ringo, 1);
  }
  for ( let k = 0; k < ringo; k++ ) {
    const a = k * 2, b = k * 2 + 1;
    const c = ( ( k + 1 ) % ringo ) * 2, d = c + 1;
    indeksoj.push(a, b, c, b, d, c);
  }
  const cM = ringo * 2, cS = cM + 1;
  pozicioj.push(0, 0, 0); uvoj.push(0o1/0o2, 0);
  pozicioj.push(0, alto, 0); uvoj.push(0o1/0o2, 1);
  for ( let k = 0; k < ringo; k++ ) {
    const a = k * 2, b = ( ( k + 1 ) % ringo ) * 2;
    indeksoj.push(a, b, cM);          // malsupra ĉapo, normalo −y
    indeksoj.push(a + 1, cS, b + 1);  // supra ĉapo, normalo +y
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

// konstruiKanGeometrion — Komuna kan-geometrio por la du kavalerbaj specioj.
// Riba kana tigo ( stel-forma sekco ) kun ŝirmaj kolumetoj kaj dentetoj ĉe la
// nodoj, kaj laŭ la elekto. Kirloj da pendantaj branĉetoj ( la botelpura
// silueto de la granda ĉevalvosto ) kaj/aŭ skvama strobilo ( konusa sporujo )
// ĉe la pinto. Konstruita je unu unuo alta, por ke la instancoj skalu ĝin
// laŭ sia alto.
//     @param nodoj ( number ) - Kiom da kanaj segmentoj.
//     @param kunBrancetoj ( boolean ) - Ĉu aldoni branĉet-kirlojn ĉe la nodoj.
//     @param kunStrobilo ( boolean ) - Ĉu aldoni la skvaman sporujon.
function konstruiKanGeometrion(nodoj: number, kunBrancetoj: boolean, kunStrobilo: boolean): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  const segmentaAlto = 1 / nodoj;
  const rBazo = 0o3/0o40;              // 3/32 — maldika, kana
  const rSupro = 0o1/0o40;             // 1/32 — la kano pintiĝas
  // 8 ripoj donas pli glatan riban silueton; la skuraj kanoj portas pli
  // profundajn ripojn ol la branĉaj ĉevalvostoj.
  // ⟨ Pli profundaj ripoj 📃 ⟩ — ĉe kresta 0.10 la ripoj preskaŭ ne videblis:
  // la tigo montriĝis kiel glata verda cilindro kaj la karakteriza EKVIVIZETA
  // kanelo perdiĝis ( la ripoj kaj la nodoj estas la tuta identeco de la
  // planto ). Nun la krestoj leviĝas 16–22% super la valojn kaj la silueto de
  // la tigo havas videblajn dentojn.
  const flankoj = 8;
  const kresta = kunBrancetoj ? 0o16/0o100 : 0o22/0o100;
  for ( let i = 0; i < nodoj; i++ ) {
    const y0 = i * segmentaAlto;
    const r0 = rBazo - ( rBazo - rSupro ) * ( i / nodoj );
    const r1 = rBazo - ( rBazo - rSupro ) * ( ( i + 1 ) / nodoj );
    // Kana segmento — la stel-forma sekco montras la ripojn de la tigo.
    partoj.push(kreiRibitanSegmenton(r0, r1, segmentaAlto, flankoj, kresta).translate(0, y0, 0));
    // Ŝirma ingo ĉe la nodo — la karakteriza kana artiklo.
    // ⟨ La formo de la ingo 📃 ⟩ — vera ekvizeta ingo ne estas egallarĝa
    // cilindro ( tio aspektis kiel ringo ŝovita sur vergon ): ĝi estas mallonga
    // TASO, pli mallarĝa ĉe la malsupro kie ĝi brakumas la tigon sub la nodo,
    // kaj MALFERMIĜANTA supren. El ĝia rando leviĝas la dentoj.
    if ( i > 0 ) {
      const ingaAlto = segmentaAlto * 0o35/0o100;
      const kolumeto = new THREE.CylinderGeometry(r0 * 0o14/0o10, r0 * 0o11/0o10,
        ingaAlto, flankoj, 1).translate(0, y0, 0);
      partoj.push(kolumeto);
      if ( kunBrancetoj ) {
        // Kirlo da pendantaj branĉetoj — la botelpura silueto de la granda
        // ĉevalvosto. La longo sekvamas sinus-profilon laŭ la tigo ( la
        // mezaj kirloj plej longaj, la pinta kaj la baza pli mallongaj — la
        // natura formo de Equisetum telmateia ), kaj ĉiu kirlo iomete
        // suprenleviĝas anstataŭ pendi sub la horizonto.
        const brancetoj = 0o12;
        const profilo = Math.sin(Math.PI * Math.min(1, ( i + 1 ) / nodoj));
        const longeco = segmentaAlto * ( 1.1 + 2.1 * profilo );
        const eliro = 0.10 + 0.45 * ( i / nodoj );
        for ( let b = 0; b < brancetoj; b++ ) {
          const ang = b / brancetoj * Math.PI * 2 + i * 0o3/0o10;
          // ⟨ La branĉeto Arkas 📃 ⟩ — antaŭe ĉiu branĉeto estis UNU mallonga
          // konuso klinita 29° supren: la kirloj aspektis kiel rigidaj
          // pingloj kaj la planto kiel bambuo. Vera branĉeto de Equisetum
          // telmateia estas DU- ĝis TRI-segmenta vergo, kun propra nodo, kiu
          // eliras preskaŭ horizontale kaj LEVIĝAS ĉe sia pinto. La du
          // segmentoj do havas malsamajn angulojn, kaj malgranda ingo sidu
          // ĉe la artiko.
          const unua = longeco * 0.55, dua = longeco * 0.55;
          const anguloj = [ eliro, eliro + 0.55 ];
          const longoj = [ unua, dua ];
          let bazo = new THREE.Vector3(Math.sin(ang) * r0, y0, Math.cos(ang) * r0);
          for ( let s = 0; s < 2; s++ ) {
            const a = anguloj[s], L = longoj[s];
            const peco = new THREE.ConeGeometry(
              r0 * ( s === 0 ? 0.34 : 0.24 ), L, 4).translate(0, L / 2, 0);
            const Mb = new THREE.Matrix4().makeRotationY(ang);
            Mb.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2 - a));
            peco.applyMatrix4(Mb);
            peco.translate(bazo.x, bazo.y, bazo.z);
            partoj.push(peco);
            // La sekva segmento eliras el la pinto de ĉi tiu.
            const direkto = new THREE.Vector3(
              Math.sin(ang) * Math.cos(a), Math.sin(a), Math.cos(ang) * Math.cos(a));
            bazo = bazo.clone().add(direkto.multiplyScalar(L));
            if ( s === 0 ) {
              const artiko = new THREE.CylinderGeometry(r0 * 0.30, r0 * 0.30,
                r0 * 0.5, 4).translate(0, r0 * 0.25, 0);
              const Ma = new THREE.Matrix4().makeRotationY(ang);
              Ma.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2 - a));
              artiko.applyMatrix4(Ma);
              artiko.translate(bazo.x, bazo.y, bazo.z);
              partoj.push(artiko);
            }
          }
        }
      } else {
        // Dentoj — la malgrandaj triangulaj pintoj de la ingo, kiuj ĉirkaŭas
        // ĉiun nodon de la skura kano.
        // ⟨ Kial ili aspektis kiel klingoj 📃 ⟩ — la dento estis konuso
        // KUŜANTA: ĝi estis rotaciita preskaŭ horizontale ( π/2 − 0.3 ) kaj
        // metita je la duono de la konusa alto for de la tigo, do ĝi elstaris
        // kiel aparta triangula klingo. Ankaŭ ĝia direkto kaj ĝia pozicio
        // estis turnitaj je 90° unu de la alia ( la pozicio uzis cos/sin, la
        // turno sin/cos ), do la dentoj montris TANGENTE anstataŭ RADIALE.
        // Nun la dento staras sur la rando de la ingo kaj klinas nur iomete
        // eksteren — ĝi estas la pinto de la ingo, ne spino.
        // ⟨ Unu dento po ripo 📃 ⟩ — vera ekvizeto havas same multajn dentojn
        // kiel ripojn, kaj la dentoj SINSEKVAS la ripojn ( ili estas la
        // daŭrigo de la ripoj trans la nodo ). La antaŭaj ses maldikaj pingloj
        // ( alto 1.15 × la tigo-radiuso, larĝo 0.3 ) estis pli longaj ol tuta
        // segmento kaj aspektis kiel dornoj; nun ĉiu dento estas triangulo
        // larĝa ĉe la bazo kaj nur duonan segmenton alta, kaj ili sidas ĝuste
        // super la ok ripoj.
        const dentoj = flankoj;
        const dentoAlto = segmentaAlto * 0o55/0o100;
        for ( let d = 0; d < dentoj; d++ ) {
          const ang = d / dentoj * Math.PI * 2;
          const dento = new THREE.ConeGeometry(r0 * 0.5, dentoAlto, 3);
          const M = new THREE.Matrix4().makeRotationY(ang);
          M.multiply(new THREE.Matrix4().makeRotationX(0.22));
          dento.applyMatrix4(M);
          dento.translate(Math.sin(ang) * r0 * 0o12/0o10,
            y0 + dentoAlto * 0o35/0o100, Math.cos(ang) * r0 * 0o12/0o10);
          partoj.push(dento);
        }
      }
    }
  }
  if ( kunStrobilo ) {
    // Strobilo — mallonga pedunklo kaj skvama konusa sporujo kun ŝtupetaj
    // skvam-ringoj kaj pinto. La larĝo estas RELATIVA al la tigo-pinto
    // ( rSupro ) — la malnovaj fiksa-larĝaj ringoj ( 0o1/0o10 ) estis kvar
    //oble larĝaj ol la tigo mem kaj aspektis kiel tro grandaj buloj.
    const strobilaLargho = rSupro * 0o3/0o2;
    const pedunklo = new THREE.CylinderGeometry(rSupro * 0o6/0o10, rSupro * 0o6/0o10,
      0o4/0o100, 6).translate(0, 1 + 0o2/0o100, 0);
    partoj.push(pedunklo);
    const skvamoj = 5;
    for ( let s = 0; s < skvamoj; s++ ) {
      const t = s / skvamoj;
      const rS = strobilaLargho * ( 1 - t * 0o6/0o10 );
      const ringo = new THREE.CylinderGeometry(rS * 0o7/0o10, rS, 0o3/0o100, 8)
        .translate(0, 1 + 0o4/0o100 + s * 0o3/0o100, 0);
      partoj.push(ringo);
    }
    const pinto = new THREE.ConeGeometry(strobilaLargho * 0o3/0o10, 0o3/0o100, 6)
      .translate(0, 1 + 0o4/0o100 + skvamoj * 0o3/0o100 + 0o15/0o1000, 0);
    partoj.push(pinto);
  } else {
    // Mallonga pinto — la branĉa ĉevalvosto finiĝas per eta pinto anstataŭ
    // plata ĉapo ĉe la pinto de la lasta segmento.
    const pinto = new THREE.ConeGeometry(0o1/0o100, 0o3/0o100, 6)
      .translate(0, 1 + 0o1/0o100, 0);
    partoj.push(pinto);
  }
  // ⟨ La proporcio de la tigo 📃 ⟩ — la geometrio estas unu unuo alta kun
  // radiuso 0.094, t.e. 1:10.6 — vera ekvizeto estas 1:20 ĝis 1:40. Oni ne
  // povas simple maldikigi la geometrion per la instanca skalo ( vidu
  // instanciiKavalerbojn: la skalo nun estas uniforma ), do la tuta geometrio
  // estas mallarĝigita laŭ la horizontala ebeno je 0.42 — la radiоj, la ingoj,
  // la dentoj kaj la branĉetoj ĉiuj samtempe, kaj la vertikalaj proporcioj
  // restas ĝustaj.
  const geometrio = kunfandiGeometriojnSenIndekson(partoj);
  geometrio.scale(0.42, 1, 0.42);
  return geometrio;
}

// konstruiCetkuanGeometrion — Konstruu la geometrion de unu cetkuo
// ( Equisetum praealtum / ſᶘɔ ɭʃƽɹ ). La alta senbranĉa "skura kano" —
// multaj nodoj kun profundaj ripoj, ŝirmaj kolumetoj, dentetoj kaj skvama
// strobilo ĉe la pinto.
function konstruiCetkuanGeometrion(): THREE.BufferGeometry {
  return konstruiKanGeometrion(0o13, false, true);
}

// konstruiCakeanGeometrion — Konstruu la geometrion de unu cakeo
// ( Equisetum telmateia / ſᶘᴜ ſɭɔ ). La granda ĉevalvosto — kana tigo kun
// kirloj da pendantaj branĉetoj ĉe ĉiu nodo, sen strobilo.
function konstruiCakeanGeometrion(): THREE.BufferGeometry {
  return konstruiKanGeometrion(6, true, false);
}

// instanciiKavalerbojn — Komuna instancigilo por la du kavalerbaj specioj
// ( cetkuo kaj cakeo ). Unu geometrio kaj unu koloro po specio, kaj la loka
// proponilo decidas kie kreski.
//     @param geometrio ( THREE.BufferGeometry ) - La specia geometrio.
//     @param koloro ( number ) - La specia koloro.
//     @param minAlto, maxAlto ( number ) - La specia alta intervalo.
//     @param proponu ( funkcio ) - Proponas kandidatan lokon aŭ null por retry.
function instanciiKavalerbojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  semo: number,
  geometrio: THREE.BufferGeometry,
  teksajxo: THREE.CanvasTexture,
  koloro: number,
  minAlto: number,
  maxAlto: number,
  proponu: ( h: () => number ) => { x: number; z: number } | null
): void {
  const hazardaGenerilo = mulberry32(semo);
  const materialo = new THREE.MeshStandardMaterial({ map: teksajxo, roughness: 0o7/0o10, color: 0xffffff });
  const kavalerboj = new THREE.InstancedMesh(geometrio, materialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  let ki = 0;
  let gardilo = 0;

  while ( ki < kvanto && gardilo++ < 0o10000 ) {
    const loko = proponu(hazardaGenerilo);
    if ( !loko ) continue;
    const x = loko.x, z = loko.z;
    const alto = minAlto + hazardaGenerilo() * ( maxAlto - minAlto );
    // Hazarda turno kaj eta klino — la ribaj tigoj ne ĉiuj rigardu samdirekte.
    E.set(0, hazardaGenerilo() * Math.PI * 2, ( hazardaGenerilo() - 0o4/0o10 ) * 0o4/0o10);
    Q.setFromEuler(E);
    // ⟨ La bazo sur la tero 📃 ⟩ — la geometrio staras sur sia propra origino
    // ( y = 0 estas la tigo-bazo ), do la instanco metiĝas ĜUSTE sur la teron.
    // Antaŭe la pozicio estis y + alto/2 ( la centro de la skatolo ), kaj la
    // tuta planto ŝvebis duonon de sia alto super la grundo.
    // ⟨ Uniforma skalo 📃 ⟩ — la antaŭa skalo ( 1, alto, 1 ) streĉis NUR la
    // vertikalon: la tigo restis samlarĝa dum la tuta planto altiĝis, la
    // ingoj kaj la dentoj streĉiĝis en longajn pinglojn ( trioble ĉe alta
    // planto ), kaj la kano aspektis kiel pingloarbo. Kun uniforma skalo ĉio
    // kreskas kune, kiel vera planto.
    const y = heightFn(x, z);
    M.compose(new THREE.Vector3(x, y, z), Q, new THREE.Vector3(alto, alto, alto));
    kavalerboj.setMatrixAt(ki, M);
    // Nuanco — ĉiu planto ricevas etan helan/malhelan varianton de la specia
    // koloro, por ke la stando ne aspektu unuforma.
    kavalerboj.setColorAt(ki, C.setHex(koloro).multiplyScalar(0o111/0o100 + hazardaGenerilo() * 0o15/0o100));
    ki++;
  }

  kavalerboj.count = ki;
  kavalerboj.instanceMatrix.needsUpdate = true;
  if ( kavalerboj.instanceColor ) kavalerboj.instanceColor.needsUpdate = true;
  sceno.add(kavalerboj);
}

// konstruiCetkuojn — Metu cetkuojn ( Equisetum praealtum / ſᶘɔ ɭʃƽɹ ), la
// altajn senbranĉajn skurajn kanojn kun strobiloj, proksime al la rivero.
export function konstruiCetkuojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  riverZFn: ( x: number ) => number,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[]
): void {
  instanciiKavalerbojn(sceno, kvanto, heightFn, 11593, konstruiCetkuanGeometrion(),
    kreiCetkuanTeksajxon(), 0xf0f8e8, 0o14/0o10, 0o30/0o10, ( h ) => {
      const angulo = h() * Math.PI * 2;
      const radiuso = 0o20 + 0o177 * Math.sqrt(h());
      const x = Math.sin(angulo) * radiuso;
      const z = Math.cos(angulo) * radiuso;
      if ( Math.abs(x) > 0o200 || Math.abs(z) > 0o200 ) return null;
      // La biomo — la riveraj kanoj restas en la vala biomo.
      if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return null;
      // Nur proksime al rivero
      if ( Math.abs(z - riverZFn(x)) > 0o10 ) return null;
      if ( excludeBuildings(x, z, 3) || excludePaths(x, z, 0o2) ) return null;
      if ( Math.hypot(x, z) < 0o16 ) return null;
      return { x, z };
    });
}

// metiArbojnCxirkauLagon — Metu arbojn en ringo ĉirkaŭ la lago, sur la sekaj
// bordoj ekster la lagrando. La ringo sekvas la ondigitan lagrandon ( radioFn ),
// do la arboj restas proksime al la akvo sed neniam en ĝi; la seka-borda
// kontrolo ( akvoNiveloFn ) tenas ilin for de la malseka orienta kavo.
//     @param cx, cz ( number ) - Lagcentro.
//     @param radioFn ( ang → r ) - Lagranda radiusa funkcio.
//     @param akvoNiveloFn ( x, z → y ) - Akvosurfaca nivelo ( la lago aŭ rivero ).
export function metiArbojnCxirkauLagon(heightFn: ( x: number, z: number ) => number,
  kvanto: number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoNiveloFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53120,
  evituArbojn: ArboMetado[] = [],
  minimumaDistanco = 0o10,
  kronaRadiuso: ( s: number ) => number = kronaRadiusoBetula,
  biomojFiltro?: readonly Biomo[]
): ArboMetado[] {
  const hazardaGenerilo = mulberry32(semo);
  const placed: ArboMetado[] = [];
  // La spaca haŝo — la sama interspaca akcelo kiel en metiArbojn.
  const metitaHasho = new PunktaHasho<ArboMetado>(0o10);
  for ( const arbo of evituArbojn ) metitaHasho.meti(arbo.x, arbo.z, arbo);
  let provoj = 0;

  const bonaLoko = ( x: number, z: number, s: number ): boolean => {
    // La biomo — la lagringo restas en sia biomo ( la valo ).
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return false;
    if ( excludeRivers(x, z) ) return false;
    if ( excludePaths(x, z, 0o44/0o10) ) return false;
    if ( excludeBuildings(x, z, 3) ) return false;
    // Nur seka bordo — la rivera kavo oriente de la lago restas sen arboj.
    // Levu la minimuman piedon iom super la surfaco por ke la trunko ne
    // aspektu duone subakvigita ĉe la ondigita rando.
    if ( heightFn(x, z) < akvoNiveloFn(x, z) + 0o2/0o10 ) return false;
    const kandidataR = kronaRadiuso(s);
    for ( const arbo of metitaHasho.najbaroj(x, z, kandidataR + minimumaDistanco + KRONA_LIBERO) ) {
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        interspaco(minimumaDistanco, arbo.r ?? kronaRadiusoBetula(arbo.s), kandidataR) ) return false;
    }
    return true;
  };

  while ( placed.length < kvanto && provoj++ < 0o3710 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    // Ringo de la lagrando ( +6 ) ĝis ~38 unuojn ekster ĝi.
    const radiuso = radioFn(angulo) + 0o6 + hazardaGenerilo() * 0o46;
    const x = cx + Math.cos(angulo) * radiuso;
    const z = cz + Math.sin(angulo) * radiuso;
    // Restu sur la grundo — la fora lagbordo atingas la montopiedojn.
    if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) continue;
    const s = 0o63/0o100 + hazardaGenerilo() * 0o55/0o100;
    if ( !bonaLoko(x, z, s) ) continue;
    placed.push({ x, z, h: heightFn(x, z), s, r: kronaRadiuso(s) });
    metitaHasho.meti(x, z, placed[placed.length - 1]);
  }
  return placed;
}

// konstruiHerbonCxirkauLagon — Metu herberojn en ringo ĉirkaŭ la lago, sur la
// sekaj bordoj ekster la lagrando — densa herba rando ĉirkaŭ la akvo.
export function konstruiHerbonCxirkauLagon(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoNiveloFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53122
): void {
  const hazardaGenerilo = mulberry32(semo);
  // ⟨ Veraj klingoj 📃 ⟩ — la tufo estas konstruata el 22 tri-dimensiaj
  // klingoj ( vidu kreiHerbanKlingon ), ne el krucitaj kartoj. La materialo ne
  // bezonas alfa-teston ( la formon portas la geometrio ) kaj la per-klingajn
  // nuancojn portas la vertica kolor-aro.
  const herbaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiHerbanKlinganTeksajxon(), side: THREE.DoubleSide,
    vertexColors: true, roughness: 1,
  });
  const herboj = new THREE.InstancedMesh(konstruiHerbanTufanGeometrion(), herbaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let hi = 0;
  let gardilo = 0;

  while ( hi < kvanto && gardilo++ < 0o5660 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    // Ringo de la lagrando ĝis ~40 unuojn ekster ĝi.
    const radiuso = radioFn(angulo) + hazardaGenerilo() * 0o40;
    const x = cx + Math.cos(angulo) * radiuso;
    const z = cz + Math.sin(angulo) * radiuso;
    if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) continue;
    if ( excludeRivers(x, z) || excludePaths(x, z, 2) || excludeBuildings(x, z, 2) ) continue;
    if ( heightFn(x, z) < akvoNiveloFn(x, z) ) continue;
    // Eta interspaco — la herboj kresku kiel tufoj, ne kiel solida tapiŝo.
    if ( !punktoLibera(metitajHasho, x, z, 0o12/0o10) ) continue;

    // ⟨ Neniu tufo staras rekte 📃 ⟩ — kun skalo egala en ĉiuj tri aksoj kaj
    // neniom da klino ĉiu tufo estis perfekte vertikala kaj same alta, do la
    // herbejo montriĝis kiel regula tapiŝo el la samaj kartoj. La klino, la
    // malegala alto kaj la etaj varioj de la larĝo rompas tion.
    const skalo = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(( hazardaGenerilo() - 0.5 ) * 0.16,
      hazardaGenerilo() * Math.PI * 2,
      ( hazardaGenerilo() - 0.5 ) * 0.16);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(skalo * ( 0.85 + hazardaGenerilo() * 0.3 ),
        skalo * ( 0.75 + hazardaGenerilo() * 0.55 ),
        skalo * ( 0.85 + hazardaGenerilo() * 0.3 )));
    herboj.setMatrixAt(hi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  herboj.count = hi;
  herboj.instanceMatrix.needsUpdate = true;
  sceno.add(herboj);
}

// konstruiCakeojn — Metu cakeojn ( Equisetum telmateia / ſᶘᴜ ſɭɔ ), la
// grandajn branĉet-kirlajn ĉevalvostojn, en maldika ringo ĉe la lagrando —
// kareksa rando ĝuste ĉe la akvo, kie la bordo estas malseka ( ne pli ol
// ~2 unuojn super la akvonivelo ).
export function konstruiCakeojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoNiveloFn: ( x: number, z: number ) => number,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 11605,
  biomojFiltro?: readonly Biomo[]
): void {
  instanciiKavalerbojn(sceno, kvanto, heightFn, semo, konstruiCakeanGeometrion(),
    kreiCakeanTeksajxon(), 0xe8f8e0, 0o12/0o10, 0o24/0o10, ( h ) => {
      const angulo = h() * Math.PI * 2;
      // Maldika bendo ĝis ~10 unuojn ekster la lagrando.
      const radiuso = radioFn(angulo) + h() * 0o10;
      const x = cx + Math.cos(angulo) * radiuso;
      const z = cz + Math.sin(angulo) * radiuso;
      if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) return null;
      // La biomo — la lag-kareksoj restas en la vala biomo.
      if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return null;
      if ( excludeBuildings(x, z, 3) || excludePaths(x, z, 0o2) ) return null;
      // Kareksoj kreskas sur la malseka bordo, ne sur la alta seka tero.
      if ( heightFn(x, z) > akvoNiveloFn(x, z) + 2 ) return null;
      return { x, z };
    });
}

// helpiloj

// konstruiKurbanLaktukanFolion — Konstruu kurbiĝintan laktukan folion.
// La folio etendiĝas de la bazo ( tigo ) kaj kurbiĝas malantaŭen al la pinto,
// kun larĝa, plena klingo ( kiel laktuko aŭ brasiko ) kaj glataj randoj.
// La bazo estas ĉe y=0. La kurbeco estas integrita laŭ la longeco
// vico post vico, do la arka longeco restas egala al la origina longeco —
// neniu streĉo ĉe la pinto.
//     @param kurbeco ( number ) - Kiom la folio kurbiĝas al la pinto.
//     @param largxeco ( number ) - La largxa faktoro de la klingo.
//     @param dikeco ( number ) - La reala tri-dimensia diko de la klingo.
//     @returns geometrio ( THREE.BufferGeometry ) - La kurba folio.
function konstruiKurbanLaktukanFolion(kurbeco = 2, largxeco = 6/5, dikeco = 0o3/0o40): THREE.BufferGeometry {
  // Pli longa klingo — la folioj branĉiĝas pli eksteren.
  const longo = 0o5/0o2;
  const segmentoj = 0o14;
  const largxoj = 7;
  const geometrio = new THREE.PlaneGeometry(largxeco, longo, largxoj, segmentoj);
  const pozicioj = geometrio.attributes.position;
  const vicoj = segmentoj + 1;
  const paso = longo / segmentoj;
  // Integrita kurbeco — ĉiu vico faldiĝas je la kreskanta angulo. Akumulu
  // la tangentajn ( cos, sin ) paŝojn anstataŭ turni la tutan longon.
  const vicoY = new Float32Array(vicoj);
  const vicoZ = new Float32Array(vicoj);
  const suboj = 0o10;
  for ( let j = 1; j < vicoj; j++ ) {
    const s0 = ( j - 1 ) * paso;
    const s1 = j * paso;
    let dy = 0, dz = 0;
    for ( let k = 1; k <= suboj; k++ ) {
      const u = s0 + ( s1 - s0 ) * ( k - 0o1/0o2 ) / suboj;
      const angulo = Math.pow(u / longo, 2) * kurbeco;
      dy += Math.cos(angulo) * paso / suboj;
      dz += Math.sin(angulo) * paso / suboj;
    }
    vicoY[j] = vicoY[j - 1] + dy;
    vicoZ[j] = vicoZ[j - 1] + dz;
  }
  for ( let i = 0; i < pozicioj.count; i++ ) {
    const x = pozicioj.getX(i);
    const y = pozicioj.getY(i);
    const j = Math.round(( ( y + longo / 2 ) / longo ) * segmentoj);
    const t = j / segmentoj;
    // La profilo estas glata elipso — mallarĝa ĉe la bazo kaj pinto, plej
    // larĝa meze — do la flankoj ne pikas. Eta baza amplekso tenas la folion
    // sur la trunko, kiel etendo de la ŝeloj.
    const profilo = Math.sin(Math.PI * t) + 0o1/0o10 * Math.pow(1 - t, 4);
    const novaX = x * profilo;
    pozicioj.setXYZ(i, novaX, vicoY[j], vicoZ[j]);
  }
    geometrio.computeVertexNormals();
    // Du tavoloj laŭ la normaloj donas la folion realan dikon — la rando
    // montras la interspacon, do la klingo aspektas dika kaj karna.
    const dorso = geometrio.clone();
    const normoj = geometrio.attributes.normal;
    const dorsoNormoj = dorso.attributes.normal;
    const frontoPozicioj = geometrio.attributes.position;
    const dorsoPozicioj = dorso.attributes.position;
    for ( let i = 0; i < frontoPozicioj.count; i++ ) {
      const nx = normoj.getX(i) * dikeco / 2;
      const ny = normoj.getY(i) * dikeco / 2;
      const nz = normoj.getZ(i) * dikeco / 2;
      frontoPozicioj.setXYZ(i, frontoPozicioj.getX(i) + nx, frontoPozicioj.getY(i) + ny, frontoPozicioj.getZ(i) + nz);
      dorsoPozicioj.setXYZ(i, dorsoPozicioj.getX(i) - nx, dorsoPozicioj.getY(i) - ny, dorsoPozicioj.getZ(i) - nz);
      // La dorsa tavolo rigardas malsupren — turnu ĝiajn normojn, por ke
      // la suba flanko lumiĝu ĝuste ankaŭ sen DoubleSide.
      dorsoNormoj.setXYZ(i, -normoj.getX(i), -normoj.getY(i), -normoj.getZ(i));
    }
    return kunfandiDuGeometriojn(geometrio, dorso);
  }

// kreiKlinoQuaternionon — Klinu arbon hazarde por rompi la vertikalan silueton.
// Unue turnu ĝin ĉirkaŭ la vertikalo ( yaw ), poste klinu laŭ hazarda direkto.
// La klina angulo varias de 0 ĝis plenaKlinangulo, ĉar la hazarda faktoro
// havas gamon de −0o4/0o10 ĝis +0o4/0o10.
//     @param hazardaGenerilo ( funkcio ) - Hazarda nombra generilo.
//     @param plenaKlinangulo ( number ) - Maksimuma klina angulo en radianoj.
//     @param yaw ( number ) - Turniĝo ĉirkaŭ la vertikalo.
//     @returns kvaropo ( THREE.Quaternion ) - La kombinita klino.
function kreiKlinoQuaternionon(hazardaGenerilo: () => number, plenaKlinangulo: number, yaw: number): THREE.Quaternion {
  const turno = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, yaw, 0));
  const direkto = hazardaGenerilo() * Math.PI * 2;
  const angulo = ( hazardaGenerilo() - 0o4/0o10 ) * plenaKlinangulo;
  const klino = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(Math.sin(direkto), 0, Math.cos(direkto)), angulo);
  return klino.multiply(turno);
}

// kreiPoziciilon — Kreu funkcion kiu turnas lokan punkton per la klino kaj
// aldonas la bazon, por ke krono-buleoj restu sur la klinita trunko.
//     @param bazo ( THREE.Vector3 ) - La trunka bazo sur la grundo.
//     @param Q ( THREE.Quaternion ) - La trunka klino.
//     @returns pozicio ( funkcio ) - Lokalo al mondo.
function kreiPoziciilon(bazo: THREE.Vector3, Q: THREE.Quaternion): ( lokala: THREE.Vector3 ) => THREE.Vector3 {
  return ( lokala ) => bazo.clone().add(lokala.clone().applyQuaternion(Q));
}

// hazardaKoloro — Elektu hazardan koloron el paletro kun eta hela variado.
//     @param hazardaGenerilo ( funkcio ) - Hazarda nombra generilo.
//     @param koloro ( THREE.Color ) - Reuzebla koloro por la eligo.
//     @param paletro ( number[] ) - Koloroj por la foliaro.
//     @returns koloro ( THREE.Color ) - La elektita koloro.
function hazardaKoloro(hazardaGenerilo: () => number, koloro: THREE.Color, paletro: number[]): THREE.Color {
  koloro.setHex(paletro[( hazardaGenerilo() * paletro.length ) | 0]);
  koloro.offsetHSL(0, 0, ( hazardaGenerilo() - 0o4/0o10 ) * 0o1/0o10);
  return koloro;
}

function mulberry32(semo: number): () => number {
  // La vegetajxa modulo uzas sian propran pliigon por konservi la ekzaktan
  // seman sekvencon de la plantoj — ŝanĝi ĝin movus ĉiun arbon en la mondo.
  return kreiHazardanGenerilon(semo, 0x682878F5);
}


