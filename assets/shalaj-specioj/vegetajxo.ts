// Vegetajxa modulo — betuloj, filikoj, likenoj por la nebula arbara medio
// Noto. la betula specio similas al la paperbetulo ( Betula papyrifera ) —
// blanka senŝeliĝanta ŝelo kaj larĝa, horizontala krono.
import * as THREE from "three";
import { kreiSxelanTeksajxon, kreiSxelanBumpanTeksajxon, kreiLarikanSxelanTeksajxon, kreiLarikanSxelanBumpanTeksajxon, kreiFilikanTeksajxon, kreiPurpuranFilikanTeksajxon,
  kreiHerbErinanTeksajxon, kreiLikenanTeksajxon, kreiLikenanBumpanTeksajxon, kreiPurpuranFolianTeksajxon, kreiPurpuranSxelanTeksajxon,
  kreiPurpuranTrunkanTeksajxon, kreiPurpuranTrunkanBumpanTeksajxon,
  kreiFrutikosanLikenanTeksajxon, kreiFolisanLikenanTeksajxon, kreiByssoidanLikenanTeksajxon,
  kreiMuskanTeksajxon, kreiCetkuanTeksajxon, kreiCakeanTeksajxon,
  kreiBetulanFoliaranTeksajxon, kreiLarikanFoliaranTeksajxon } from "../komunajxoj/teksajxoj.js";
import { kreiBuferanGeometrion, kunfandiDuGeometriojn, kunfandiGeometriojnSenIndekson } from "../komunajxoj/kunfandajxoj.js";
import { kreiHazardanGenerilon } from "../komunajxoj/hazardo.js";
import { glataPaso, akvaNivelo, biomo, type Biomo } from "../../src/tereno.js";

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
    for ( const arbo of [ ...evituArbojn, ...placed ] ) {
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        interspaco(0o4, arbo.r ?? kronaRadiusoBetula(arbo.s), kandidataR) ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    placed.push({ x, z, h, s, r: kandidataR });
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
    for ( const arbo of [ ...evituArbojn, ...placed ] ) {
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
    for ( const arbo of [ ...evituArbojn, ...placed ] ) {
      // Kontraŭ la valaj arboj la distanco estas pli libera ( 0o4 ), por ke la
      // monta arbaro interplektiĝu kun la vala anstataŭ lasi mozaton laŭ la piedo.
      const mozaika = evitaAro.has(arbo) ? 0o4 : minimumaDistanco;
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        interspaco(mozaika, arbo.r ?? kronaRadiusoBetula(arbo.s), kandidataR) ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    placed.push({ x, z, h, s, r: kronaRadiuso(s) });
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
  const sxtonaGeometrio = new THREE.IcosahedronGeometry(1, 0);
  const sxtonoj = new THREE.InstancedMesh(sxtonaGeometrio,
    new THREE.MeshStandardMaterial({ roughness: 0o75/0o100 }), kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  // Montara roko — grizecaj tonoj kun malvarma nuanco.
  const paletro = [ 0x686868, 0x787878, 0x585858, 0x787878, 0x887878, 0x686858 ];
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
    E.set(hazardaGenerilo() * 0o15/0o40, hazardaGenerilo() * Math.PI * 2, hazardaGenerilo() * 0o15/0o40);
    Q.setFromEuler(E);
    const y = heightFn(x, z);
    M.compose(new THREE.Vector3(x, y + skaloY * 0o23/0o100, z),
      Q,
      new THREE.Vector3(skaloY, skaloY, skaloY));
    sxtonoj.setMatrixAt(li, M);
    sxtonoj.setColorAt(li, C.setHex(paletro[( hazardaGenerilo() * paletro.length ) | 0]));
    metitaj.push({ x, z, h: y, s: skaloY });
    li++;
  }

  sxtonoj.instanceMatrix.needsUpdate = true;
  if ( sxtonoj.instanceColor ) sxtonoj.instanceColor.needsUpdate = true;

  sceno.add(sxtonoj);
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
  // Krucaj geometrioj — la samaj formoj kiel en la valo ( konstruiFilikojn,
  // konstruiPurpurajnPlantojn, konstruiPurpurajnFilikojn, konstruiHerbon,
  // konstruiMusxajnMontetojn, konstruiLikenojn ).
  const filikaG = new THREE.PlaneGeometry(0o155/0o100, 0o155/0o100).translate(0, 0o33/0o40, 0);
  const filikaGeometrio = kunfandiDuGeometriojn(filikaG,
    filikaG.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2)));
  const filikoj = new THREE.InstancedMesh(filikaGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiFilikanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 1 }), kvanto);

  const purpuraL = 0o11/0o20, purpuraH = 0o22/0o20;
  const pa = new THREE.PlaneGeometry(purpuraL, purpuraH).translate(0, purpuraH / 2, 0);
  const pb = pa.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
  const pc = pa.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 4));
  const pd = pa.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(3 * Math.PI / 4));
  const purpuraGeometrio = kunfandiGeometriojnSenIndekson([ pa, pb, pc, pd ]);
  const purpuraj = new THREE.InstancedMesh(purpuraGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranFilikanTeksajxon(), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), kvanto);

  // Malaltaj purpuraj plantoj — la malgranda variaĵo de la purpura filiko.
  const malaltaL = 0o12/0o20, malaltaH = 0o16/0o20;
  const ma = new THREE.PlaneGeometry(malaltaL, malaltaH).translate(0, malaltaH / 2, 0);
  const mb = ma.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
  const mc = ma.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 4));
  const md = ma.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(3 * Math.PI / 4));
  const malaltaGeometrio = kunfandiGeometriojnSenIndekson([ ma, mb, mc, md ]);
  const malaltaj = new THREE.InstancedMesh(malaltaGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranFilikanTeksajxon(true), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), kvanto);

  const herbaG = new THREE.PlaneGeometry(0o5/0o10, 0o10/0o10).translate(0, 0o4/0o10, 0);
  const herbaGeometrio = kunfandiDuGeometriojn(herbaG,
    herbaG.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2)));
  const herboj = new THREE.InstancedMesh(herbaGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiHerbErinanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 1 }), kvanto);

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
    new THREE.MeshStandardMaterial({ map: kreiPurpuranFilikanTeksajxon(false), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), kvanto);

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
  const metitaj: [ number, number ][] = [];
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
    // arboformaj filikoj, kies kronoj ne trapenetru unu la alian ).
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot(x - px, z - pz) < minDist ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

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
    metitaj.push([ x, z ]);
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
function konstruiBetulanFoliaranGeometrion(): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  // Plata bazo — la kuseno estas multe pli larĝa ol alta, kiel bonsaja nubo.
  const bazo = new THREE.SphereGeometry(0o3/0o10, 0o10, 0o7);
  bazo.applyMatrix4(new THREE.Matrix4().makeScale(1, 0o1/0o2, 1));
  partoj.push(bazo);
  // Malgrandaj internaj plenigaĵoj — denseco ene de la kuseno.
  for ( let i = 0; i < 0o10; i++ ) {
    const a = i / 0o10 * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o3/0o10;
    const r = 0o1/0o10 + Math.random() * 0o12/0o100;
    const kuseno = new THREE.SphereGeometry(0o1/0o10 + Math.random() * 0o5/0o100, 0o10, 0o6);
    kuseno.applyMatrix4(new THREE.Matrix4().makeScale(
      1, 0o6/0o10 + Math.random() * 0o2/0o10, 1));
    kuseno.translate(Math.cos(a) * r, ( Math.random() - 0o5/0o10 ) * 0o1/0o10, Math.sin(a) * r);
    partoj.push(kuseno);
  }

  // Folia kartono kun ovoforma, segildenta betula silueto — la plej larĝa
  // punkto estas sub la mezo, la pinto estas akra kaj la bazo mallarĝiĝas al
  // la tigo, kiel ĉe vera paperbetula folio. La antaŭa mallarĝa lanca formo
  // kun nur 7 punktoj aspektis artefarita kaj pika.
  const kreiFolianKarteton = ( longo: number, largho: number ): THREE.BufferGeometry => {
    const L = longo, hwMax = largho / 2;
    const plejLarĝa = -L * 0o13/0o100;
    const duonLarĝo = ( x: number, d: number ): number => {
      const hw = x <= plejLarĝa
        ? hwMax * ( x + L / 2 ) / ( plejLarĝa + L / 2 )
        : hwMax * Math.pow(1 - ( x - plejLarĝa ) / ( L / 2 - plejLarĝa ), 0o7/0o10);
      // eta segildenta dentado — vera betula folia rando
      return hw * ( 1 + 0.05 * Math.sin(d * 2.1) );
    };
    const N = 0o4;
    const punktoj: number[] = [];
    const uvoj: number[] = [];
    // bazo — radiko de la triangula ventumilo
    punktoj.push(-L / 2, 0, 0);
    uvoj.push(0, 0o1/0o2);
    // malsupra rando de la bazo ĝis la pinto
    for ( let s = 1; s <= N; s++ ) {
      const x = -L / 2 + ( s / N ) * L;
      punktoj.push(x, -duonLarĝo(x, s), 0);
      uvoj.push(s / N, 0o13/0o100);
    }
    // pinto
    punktoj.push(L / 2, 0, 0);
    uvoj.push(1, 0o1/0o2);
    // supra rando de la pinto reen al la bazo
    for ( let s = N; s >= 1; s-- ) {
      const x = -L / 2 + ( s / N ) * L;
      punktoj.push(x, duonLarĝo(x, s), 0);
      uvoj.push(s / N, 0o65/0o100);
    }
    const indeksoj: number[] = [];
    for ( let i = 1; i < 2 * N + 1; i++ ) indeksoj.push(0, i, i + 1);
    return kreiBuferanGeometrion(punktoj, indeksoj, { uvoj });
  };

  // Foliaj faskoj — la folioj grupiĝas en malgrandajn faskojn ĉirkaŭ
  // maldikaj branĉetoj, kiuj kreskas el la centra maso de la kuseno.
  // Tri kompaktaj radialaj tavoloj — la kuseno restas malgranda ( r ĝis ~0.4 ).
  const faskoj = 0o10;
  for ( let i = 0; i < faskoj; i++ ) {
    const a = i / faskoj * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o5/0o10;
    const tavolo = i % 0o3;
    const ekstera = tavolo / 0o2;
    const r = 0o1/0o10 + tavolo * 0o1/0o10 + ( Math.random() - 0o5/0o10 ) * 0o1/0o40;
    const y = ( Math.random() - 0o5/0o10 ) * 0o1/0o10;
    const celo = new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    // Maldika branĉeto de la centro ĝis la fasko — ĝi videble ligas la
    // foliojn al la centra maso.
    if ( celo.length() > 0o1/0o100 ) {
      const direkto = celo.clone().normalize();
      const branĉeto = new THREE.CylinderGeometry(0o10/0o1000, 0o20/0o1000, celo.length(), 4)
        .translate(0, celo.length() / 2, 0);
      branĉeto.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direkto)));
      partoj.push(branĉeto);
    }
    // 3–4 folioj ĉirkaŭ la pinto de la branĉeto — unu natura folia fasko.
    const folioj = 0o3 + ( ( Math.random() * 0o2 ) | 0 );
    for ( let j = 0; j < folioj; j++ ) {
      const longo = ( 0o13/0o100 + Math.random() * 0o6/0o100 ) * ( 1 - ekstera * 0o1/0o4 );
      const largho = ( 0o5/0o100 + Math.random() * 0o2/0o100 ) * ( 1 - ekstera * 0o1/0o4 );
      const folioA = kreiFolianKarteton(longo, largho);
      const folioB = folioA.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 3));
      const folioC = folioA.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(-Math.PI / 3));
      const folio = kunfandiGeometriojnSenIndekson([ folioA, folioB, folioC ]);
      // Natura klino — la folioj pendas iomete malsupren kaj turniĝas ĉirkaŭ
      // sia tigo, neniam uniforme radiale.
      const klino = new THREE.Euler(
        -0o2/0o10 - Math.random() * 0o4/0o10,
        a + ( Math.random() - 0o5/0o10 ) * 0o7/0o10,
        ( Math.random() - 0o5/0o10 ) * 0o6/0o10);
      folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(klino));
      folio.translate(
        celo.x + ( Math.random() - 0o5/0o10 ) * 0o1/0o20,
        celo.y + ( Math.random() - 0o5/0o10 ) * 0o1/0o20,
        celo.z + ( Math.random() - 0o5/0o10 ) * 0o1/0o20);
      partoj.push(folio);
    }
  }
  // Neniu centra vertikala cilindro — la malnova akso montriĝis kiel malhela
  // vertikala konuso inter la du kronoj. La foliaj kusenetoj kaj kartoj mem
  // tenas la foliaron ligita al la trunko.
  return kunfandiGeometriojnSenIndekson(partoj);
}

// konstruiArbaron — Konstruu instancigitajn arbojn (trunkoj kaj foliaroj) en la sceno.
export function konstruiArbaron(sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = mulberry32(77531);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const sxelaBumpo = kreiSxelanBumpanTeksajxon();
  const trunkaGeometrio = new THREE.CylinderGeometry(0o7/0o40, 0o3/0o10, 1, 7, 1);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, bumpMap: sxelaBumpo, bumpScale: 0o6/0o10, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return trunkoj;

  const kronaGeometrio = konstruiBetulanFoliaranGeometrion();
  const kronaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiBetulanFoliaranTeksajxon(), color: 0xffffff, roughness: 0o35/0o40,
  });
  // Bonsajeca krono. Ses apartaj "nubaj kusenoj" po arbo, ĉiu sidiĝanta sur
  // videbla branĉo — malsimetriaj, je malsamaj altoj kaj radiusoj, kun
  // malplenoj inter ili, kiel ĉe bonsajo.
  const PADOJ = 0o6;
  const kronoj = new THREE.InstancedMesh(kronaGeometrio, kronaMaterialo, arboj.length * PADOJ);
  const brancxoGeometrio = new THREE.CylinderGeometry(0o3/0o100, 0o5/0o100, 1, 5);
  const brancxoj = new THREE.InstancedMesh(brancxoGeometrio, trunkaMaterialo, arboj.length * PADOJ);

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  // La betula krono estas hela blankeca mento — pli hela kaj pli blankeca ol
  // la grunda herbo, tiel ke la foliaro legiĝas kiel pala menteca nubo super
  // la herbejo. Neniu malhela tono en la paletro; la ombroj venas nur de la
  // teksturaj makuloj.
  const paletro = [ 0x90b090, 0xa0c0a0, 0xb8d0b8, 0xc8e0c8, 0x88b088 ];

  arboj.forEach(( t, i ) => {
    const h = 0o64/0o10 + t.s * 0o44/0o10;
    // Eta klino rompas la uniformecon — la betuloj ne staras perfekte rekte.
    const Q = kreiKlinoQuaternionon(hazardaGenerilo, 0o2/0o20, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Q);

    M.compose(pozicio(new THREE.Vector3(0, h / 2, 0)), Q, new THREE.Vector3(1, h, 1));
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
    const padBazoj = [
      { a: 0.7, fy: 0.60, fr: 0.30, s: 0.94 },
      { a: 4.1, fy: 0.67, fr: 0.34, s: 0.88 },
      { a: 2.3, fy: 0.77, fr: 0.54, s: 1.14 },
      { a: 5.4, fy: 0.84, fr: 0.46, s: 1.06 },
      { a: 1.5, fy: 0.94, fr: 0.26, s: 1.06 },
      { a: 2.9, fy: 1.00, fr: 0.04, s: 2.35 },
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
      kronoj.setColorAt(idx, hazardaKoloro(hazardaGenerilo, C, paletro));

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
  brancxoj.instanceMatrix.needsUpdate = true;
  if ( trunkoj.instanceColor ) trunkoj.instanceColor.needsUpdate = true;
  if ( kronoj.instanceColor ) kronoj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = kronoj.castShadow = brancxoj.castShadow = true;
  sceno.add(trunkoj, kronoj, brancxoj);
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

  const fa = new THREE.PlaneGeometry(0o155/0o100, 0o155/0o100).translate(0, 0o33/0o40, 0);
  const fb = fa.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));

  // mana kunfando
  const merged = kunfandiDuGeometriojn(fa, fb);
  const filikaMaterialo = new THREE.MeshStandardMaterial({ map: filikaTeksajxo, alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 1 });
  const filikoj = new THREE.InstancedMesh(merged, filikaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitaj: [ number, number ][] = [];
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
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot(x - px, z - pz) < 0o2 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

    const skalo = 0o55/0o100 + hazardaGenerilo() * 0o63/0o100;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q, new THREE.Vector3(skalo, skalo, skalo));
    filikoj.setMatrixAt(fi++, M);
    metitaj.push([ x, z ]);
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
export function konstruiMetitanRokon(sceno: THREE.Scene,
  x: number, z: number,
  heightFn: ( x: number, z: number ) => number,
  skalo: number,
  rotacio = -1
): THREE.InstancedMesh {
  const sxtonaGeometrio = new THREE.IcosahedronGeometry(1, 0);
  const sxtonoj = new THREE.InstancedMesh(sxtonaGeometrio,
    new THREE.MeshStandardMaterial({ roughness: 0o75/0o100 }), 1);
  const paletro = [ 0x686868, 0x787878, 0x585858, 0x787878, 0x887878, 0x686858 ];
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  E.set(rotacio >= 0 ? 0 : Math.random() * 0o15/0o40,
    rotacio >= 0 ? rotacio : Math.random() * Math.PI * 2,
    rotacio >= 0 ? 0 : Math.random() * 0o15/0o40);
  Q.setFromEuler(E);
  const y = heightFn(x, z);
  M.compose(new THREE.Vector3(x, y + skalo * 0o23/0o100, z),
    Q, new THREE.Vector3(skalo, skalo, skalo));
  sxtonoj.setMatrixAt(0, M);
  sxtonoj.setColorAt(0, C.setHex(paletro[( Math.random() * paletro.length ) | 0]));
  sxtonoj.instanceMatrix.needsUpdate = true;
  if ( sxtonoj.instanceColor ) sxtonoj.instanceColor.needsUpdate = true;
  sceno.add(sxtonoj);
  return sxtonoj;
}

// konstruiMetitanFilikon — UNU filiko cxe preciza pozicio ( la objekta ilo
// de la terena skulptilo ). Verda aux purpura ( filikaSpeco 0/1 ) — la
// purpura uzas la purpuran filikan teksajxon — kaj hazarda turno.
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
  const filikaTeksajxo = filikaSpeco === 1 ? kreiPurpuranFilikanTeksajxon(true) : kreiFilikanTeksajxon();
  const fa = new THREE.PlaneGeometry(0o155/0o100, 0o155/0o100).translate(0, 0o33/0o40, 0);
  const fb = fa.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
  const merged = kunfandiDuGeometriojn(fa, fb);
  const filikaMaterialo = new THREE.MeshStandardMaterial({ map: filikaTeksajxo, alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 1 });
  const filikoj = new THREE.InstancedMesh(merged, filikaMaterialo, 1);
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
  konstruiPeriferianFilikanAreon(sceno, kvanto, heightFn, excludeRivers, excludePaths, excludeBuildings,
    kreiPurpuranFilikanTeksajxon(true), 0o12/0o20, 0o16/0o20, 0o53104, biomojFiltro);
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
    kreiPurpuranFilikanTeksajxon(), 0o15/0o20, 0o24/0o20, 0o53114, biomojFiltro);
}

// konstruiPeriferianFilikanAreon — Kunigu du krucajn tavolojn por natura arbara rando.
function konstruiPeriferianFilikanAreon(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  teksajxo: THREE.CanvasTexture,
  bazaLargho: number,
  bazaAlto: number,
  semo: number,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = mulberry32(semo);
  // Kvar egalaj krucaj ebenoj konservas la frondan formon el cxiu rigardangulo.
  // Tri ebenoj lasis kelkajn specimenojn videble plataj kaj distorditaj.
  const fa = new THREE.PlaneGeometry(bazaLargho, bazaAlto).translate(0, bazaAlto / 2, 0);
  const fb = fa.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
  const fc = fa.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 4));
  const fd = fa.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(3 * Math.PI / 4));
  const merged = kunfandiGeometriojnSenIndekson([ fa, fb, fc, fd ]);
  const materialo = new THREE.MeshStandardMaterial({ map: teksajxo, alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 });
  const plantoj = new THREE.InstancedMesh(merged, materialo, kvanto);

  // Arbareroj — la purpuraj plantoj klasteriĝas en naturaj makuloj tra la
  // tuta vala biomo ( ±0o600 ), anstataŭ egala ringo ĉirkaŭ la urbo.
  const grovoj = kreiGrovojn(Math.max(0o4, Math.floor(kvanto / 0o20)), 0o600, hazardaGenerilo, excludeRivers);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitaj: [ number, number ][] = [];
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
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot(x - px, z - pz) < 0o2 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

    const skalo = 0o6/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(skalo, skalo, skalo));
    plantoj.setMatrixAt(pi++, M);
    metitaj.push([ x, z ]);
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
    map: kreiPurpuranFilikanTeksajxon(speco.densa), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1,
  }));
  const nombroj = specoj.map(() => Math.ceil(kvanto / specoj.length));
  const trunkoj = trunkajGeometrioj.map(( geometrio, i ) => new THREE.InstancedMesh(geometrio, trunkajMaterialoj[i], nombroj[i]));
  const kronoj = kronajGeometrioj.map(( geometrio, i ) => new THREE.InstancedMesh(geometrio, kronajMaterialoj[i], nombroj[i]));
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const indicoj = specoj.map(() => 0);
  const metitaj: [ number, number ][] = [];
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
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot(x - px, z - pz) < 0o146/0o100 * 0o2 + 0o3 ) { troProksima = true; break; }
    }
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
    metitaj.push([ x, z ]);
  }

  trunkoj.forEach(( mesh, i ) => {
    mesh.count = indicoj[i]; mesh.instanceMatrix.needsUpdate = true; mesh.castShadow = true; sceno.add(mesh);
    if ( mesh.instanceColor ) mesh.instanceColor.needsUpdate = true;
  });
  kronoj.forEach(( mesh, i ) => { mesh.count = indicoj[i]; mesh.instanceMatrix.needsUpdate = true; mesh.castShadow = true; sceno.add(mesh); });
}

function konstruiFrondanKronon(nombro: number, largho: number, alto: number, mallevo: number, radiuso = 0): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  for ( let i = 0; i < nombro; i++ ) {
    // Konstruu cxiu frondon cxirkaux la bazo; tiel la bazo restas sur la grundo
    // kaj la rotacio ne tiras la teksturon en oblikvan, distorditan formon.
    const frondo = new THREE.PlaneGeometry(largho, alto).translate(0, alto / 2, 0).toNonIndexed();
    const transformo = new THREE.Matrix4().makeRotationY(i / nombro * Math.PI * 2);
    transformo.multiply(new THREE.Matrix4().makeRotationX(mallevo));
    frondo.applyMatrix4(transformo);
    // Puŝu la frondon eksteren laŭ la trunka radiuso, por ke ĝi eliru el la
    // trunka surfaco anstataŭ sub ĝi.
    frondo.translate(Math.sin(i / nombro * Math.PI * 2) * radiuso, 0,
      Math.cos(i / nombro * Math.PI * 2) * radiuso);
    partoj.push(frondo);
  }
  const geometrio = kunfandiGeometriojnSenIndekson(partoj);
  geometrio.computeBoundingBox();
  if ( geometrio.boundingBox ) geometrio.translate(0, -geometrio.boundingBox.min.y, 0);
  return geometrio;
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
  const sxtonaGeometrio = new THREE.IcosahedronGeometry(1, 0);
  const sxtonoj = new THREE.InstancedMesh(sxtonaGeometrio,
    new THREE.MeshStandardMaterial({ roughness: 0o75/0o100 }), kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x687870, 0x788878, 0x687870, 0x889870, 0x98a880, 0x788878 ];
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
    M.compose(new THREE.Vector3(x, y + skaloY * 0o23/0o100, z),
      Q,
      new THREE.Vector3(skaloY, skaloY, skaloY));
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
  const metitaj: [ number, number ][] = [];
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
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot(x - px, z - pz) < 0o2 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

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
    metitaj.push([ x, z ]);
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
  // La konusa interna maso — la trunkon kovranta tavolo kun bazo je y = 0.
  // Ĝi restas maldika, por ke la pingloj faru la videblan volumon.
  // La konuso kreskas el la trunk-pinto ( bazo je y = 0 ) — neniu parto de
  // la foliaro pendas sub la trunko, do ĉiu tavolo sidas rekte sur la antaŭa.
  // Trunkoforma tavolo — pli larĝa kaj pli malalta ol antaŭe, kun plena
  // supro ( ne pintaĵo ), por ke la sekva tavolo videble kresku EL la antaŭa
  // anstataŭ stari sur pinto. La skalo 0o24/0o10 pligrandigas la pintan
  // radiuson ĝis ~0o15, do neniu nuda trunko aperas inter la tavoloj.
  const konuso = new THREE.CylinderGeometry(0o15/0o100, 0o62/0o100, 0o110/0o100, 0o14, 0o4);
  konuso.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
  konuso.translate(0, 0o55/0o100, 0);
  partoj.push(konuso);

  // Maldika pingla kartono — longa, tre mallarĝa, pintigita ĉe ambaŭ pintoj,
  // kiel unu pinglo de lariko. La UV-oj ripetas la pinglan teksturon laŭlonge.
  const kreiPinglanKarteton = ( longo: number, dikeco: number ): THREE.BufferGeometry => {
    const pozicioj = [
      -longo / 2, 0, 0, -longo * 0o15/0o100, -dikeco / 2, 0,
      longo * 0o15/0o100, -dikeco / 2, 0, longo / 2, 0, 0,
      longo * 0o15/0o100, dikeco / 2, 0, -longo * 0o15/0o100, dikeco / 2, 0,
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
  const kreiPinglanVentumilon = ( longo: number, dikeco: number ): THREE.BufferGeometry => {
    const fasko = ( turno: number ): THREE.BufferGeometry => {
      const pingloj: THREE.BufferGeometry[] = [];
      const kvanto = 0o7;
      for ( let j = 0; j < kvanto; j++ ) {
        const t = j / ( kvanto - 1 ) - 0o5/0o10;
        const klino = t * 0o6/0o10; // ekstremoj klinas supren
        const pinglo = kreiPinglanKarteton(longo, dikeco);
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationY(turno));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationY(
          t * 0o14/0o10));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationZ(klino));
        pingloj.push(pinglo);
      }
      return kunfandiGeometriojnSenIndekson(pingloj);
    };
    return kunfandiGeometriojnSenIndekson([ fasko(0), fasko(Math.PI / 2) ]);
  };

  const kirloj = 0o4;
  const faskojPoKirlo = 0o10;
  for ( let i = 0; i < kirloj * faskojPoKirlo; i++ ) {
    const kirlo = Math.floor(i / faskojPoKirlo);
    const enKirlo = i % faskojPoKirlo;
    // Regulaj kirloj kun iom da angula bruo aspektas kiel realaj branĉetoj.
    const a = enKirlo / faskojPoKirlo * Math.PI * 2 + kirlo * 0o3/0o20
      + ( Math.random() - 0o5/0o10 ) * 0o1/0o10;
    // La kirloj koncentriĝas sur la malsupra duono — la konuso pintiĝas
    // supren, do pli da pinglaroj malsupre donas la veran larikan formon.
    // La unua kirlo komenciĝas ĉe y = 0o12/0o100, sufiĉe alte por ke la
    // ventumiloj neniam pendu sub la konusa bazo.
    const t = 0o10/0o100 + ( kirlo / ( kirloj - 1 ) ) * 0o60/0o100;
    const y = t * 0o110/0o100;
    const konusaR = 0o62/0o100 * ( 1 - t );
    const branĉetaR = konusaR + ( Math.random() - 0o5/0o10 ) * 0o1/0o100;
    const bazoP = new THREE.Vector3(Math.cos(a) * branĉetaR, y, Math.sin(a) * branĉetaR);
    // La ventumilo direktiĝas laŭ la konusa deklivo — iom supren kaj
    // radiale eksteren — do ĉiu pingla fasko videble kreskas el la branĉo.
    const akso = new THREE.Vector3(
      Math.cos(a) * 0o7/0o10, 0o45/0o10 + Math.random() * 0o2/0o10, Math.sin(a) * 0o7/0o10
).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), akso);
    // Mallonga branĉeta konektilo eniras la konusan kortekson, tiel ke neniu
    // pingla fasko ŝvebas aŭ tro elstaras.
    const konektiloLongo = 0o14/0o100;
    const konektilo = new THREE.CylinderGeometry(0o2/0o100, 0o3/0o100, konektiloLongo, 5)
      .translate(0, konektiloLongo / 2, 0);
    konektilo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
    konektilo.translate(bazoP.x - akso.x * konektiloLongo, bazoP.y - akso.y * konektiloLongo,
      bazoP.z - akso.z * konektiloLongo);
    partoj.push(konektilo);
    // La pingla ventumilo mem — pli longa ĉe la malsupraj kirloj, kaj
    // sufiĉe granda por vidiĝi ĉe la konusa rando.
    // La ventumilo estas iom pli mallonga ĉe la unua kirlo, por ke neniu
    // pinglo subiru la konusan bazon ( y = 0 ).
    const longo = ( 0o12/0o100 + ( 1 - t ) * 0o16/0o100 + Math.random() * 0o6/0o100 )
      * ( kirlo === 0 ? 0o7/0o10 : 1 );
    const ventumilo = kreiPinglanVentumilon(longo, 0o3/0o200);
    ventumilo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
    ventumilo.translate(bazoP.x, bazoP.y, bazoP.z);
    partoj.push(ventumilo);
  }
  // Centra kolumo kovras la trunkan pinton sub la konusa bazo — ĉiu tavolo
  // do videble kreskas el la trunko kaj ne flosas.
  partoj.push(new THREE.CylinderGeometry(0o16/0o100, 0o30/0o100, 0o24/0o100, 7)
    .translate(0, 0o10/0o100, 0));
  return kunfandiGeometriojnSenIndekson(partoj);
}

// konstruiLarikon — Konstruu instancigitajn alpinajn larikojn en la sceno.
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
  const trunkaGeometrio = new THREE.CylinderGeometry(0o7/0o40, 0o3/0o10, 1, 7, 1);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: larikaTeksajxo, bumpMap: larikaBumpo, bumpScale: 0o6/0o10, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return trunkoj;

  // Du aŭ tri konusaj tavoloj, ĉiu pli mallarĝa ol la antaŭa — la kirloj
  // de la alpina lariko. La tavoloj restas sur la trunk-akso, nur la tria
  // foje estas kaŝita ( skalo 0 ).
  const kronaGeometrio = konstruiLarikanFoliaranGeometrion();
  kronaGeometrio.computeBoundingBox();
  const kronaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiLarikanFoliaranTeksajxon(), color: 0xffffff, roughness: 0o35/0o40,
  });
  const kronoj = new THREE.InstancedMesh(kronaGeometrio, kronaMaterialo, arboj.length * 3);

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  // Aŭtunaj pingloj — orflavaj kun kelkaj verdflavaj kaj ambraj nuancoj.
  const paletro = [ 0xc8a848, 0xd0b858, 0xd8c060, 0xd8a838, 0xc0a048, 0xe0c868, 0xb89038, 0xa8b048 ];

  arboj.forEach(( t, i ) => {
    const h = 0o60/0o10 + t.s * 0o40/0o10;
    const trunkaLargho = 0o31/0o40 + t.s * 0o7/0o40;
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

    const tavoloj = 2 + ( ( hazardaGenerilo() * 2 ) | 0 );
    const bazaLargho = 0o11/0o10 * t.s + 0o4/0o10;
    const bazaAlto = 0o17/0o10 * t.s + 0o5/0o10;
    const kronaMinimumaY = kronaGeometrio.boundingBox!.min.y;
    const kronaMaksimumaY = kronaGeometrio.boundingBox!.max.y;
    let antaŭaSupro = h;
    for ( let k = 0; k < 3; k++ ) {
      const m = k / 3;
      const kronoLargho = bazaLargho * ( 1 - m * 0o3/0o4 )
        * ( 0o7/0o10 + hazardaGenerilo() * 0o1/0o20 );
      const kronoAlto = bazaAlto * ( 1 - m * 0o3/0o20 )
        * ( 0o7/0o10 + hazardaGenerilo() * 0o1/0o20 );
      if ( k >= tavoloj ) {
        M.compose(pozicio(new THREE.Vector3(0, antaŭaSupro, 0)), Q,
          new THREE.Vector3(0, 0, 0));
        kronoj.setMatrixAt(i * 3 + k, M);
        kronoj.setColorAt(i * 3 + k, hazardaKoloro(hazardaGenerilo, C, paletro));
        continue;
      }
      // Ĉiu tavolo komenciĝas ĉe la supra rando de la antaŭa, anstataŭ
      // akumuli arbitran vertikalan paŝon kaj disiĝi de la trunko.
      const centroY = antaŭaSupro - kronaMinimumaY * kronoAlto - kronoAlto * 0o1/0o100;
      // Eta sendependa ŝovo de ĉiu kirlo faras naturan, ne perfekte centran
      // pinglan tavolon, dum la komuna trunk-akso ankoraŭ restas videbla.
      M.compose(pozicio(new THREE.Vector3(
        ( hazardaGenerilo() - 0o5/0o10 ) * 0o12/0o100,
        centroY,
        ( hazardaGenerilo() - 0o5/0o10 ) * 0o12/0o100)), Q,
        new THREE.Vector3(kronoLargho, kronoAlto, kronoLargho));
      kronoj.setMatrixAt(i * 3 + k, M);
      kronoj.setColorAt(i * 3 + k, hazardaKoloro(hazardaGenerilo, C, paletro));
      antaŭaSupro = centroY + kronaMaksimumaY * kronoAlto;
    }
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  kronoj.instanceMatrix.needsUpdate = true;
  if ( trunkoj.instanceColor ) trunkoj.instanceColor.needsUpdate = true;
  if ( kronoj.instanceColor ) kronoj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = kronoj.castShadow = true;
  sceno.add(trunkoj, kronoj);
  return trunkoj;
}

// konstruiSxelanRingon — La rigidaj ŝelaj tasoj de la purpuraj laktukaj
// plantoj ( Ĥŝakŝlefo kaj Pussxlefo ) — simetriaj tasoj, pli larĝaj ĉe la
// supro kaj kurbiĝantaj eksteren ( trumpeto-formo ), kies supraj randoj
// disiĝas en kvar foliformajn lobojn ( ĉe la kvar flankoj de la folioj ).
function konstruiSxelanRingon(): THREE.BufferGeometry {
  const geometrio = new THREE.CylinderGeometry(0o16/0o40, 0o13/0o40, 1, 0o30, 1, true).translate(0, 0o1/0o2, 0);
  const pozicioj = geometrio.attributes.position;
  for ( let i = 0; i < pozicioj.count; i++ ) {
    const x = pozicioj.getX(i);
    const y = pozicioj.getY(i);
    const z = pozicioj.getZ(i);
    // La ringo kurbiĝas eksteren al la supro — la radiuso kreskas kvadrate.
    const faktoro = 1 + 0o1/0o10 * y * y;
    let novaY = y;
    if ( y > 0o3/0o4 ) {
      // Kvar rondaj foli-loboj ĉe la kvar flankaj direktoj.
      const ang = Math.atan2(x, z);
      const lobo = Math.pow(( Math.cos(4 * ang) + 1 ) / 2, 2);
      novaY = y + 2/5 * lobo;
    }
    pozicioj.setXYZ(i, x * faktoro, novaY, z * faktoro);
  }
  geometrio.computeVertexNormals();
  return geometrio;
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
  const trunkaGeometrio = new THREE.CylinderGeometry(0o7/0o40, 0o3/0o10, 1, 7, 1);
  // La trunko havas la SAMAN teksturon kiel la ŝelaj ringoj — malhela ĉe la
  // bazo, heliĝanta al la supro, kun la fajnaj ŝelaj strioj.
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: kreiPurpuranSxelanTeksajxon(), color: 0xffffff, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return trunkoj;

  // Pli dika, plena folio — pli larĝa klingo, pli profunda kurbeco kaj
  // reala diko, kiel laktuko aŭ brasiko.
  const foliaGeometrio = konstruiKurbanLaktukanFolion();
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiPurpuranFolianTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 1,
  });
  const folioj = new THREE.InstancedMesh(foliaGeometrio, foliaMaterialo, arboj.length * MAX_TAVOLOJ * 4);

  // Rigidaj ŝelaj ringoj — simetriaj tasoj ĉirkaŭ la trunko, pli larĝaj ĉe la
  // supro kaj kurbiĝantaj eksteren ( trumpeto-formo ), kies supraj randoj
  // disiĝas en kvar foliformajn lobojn ( ĉe la kvar flankoj de la folioj ).
  // La folioj etendiĝas el la loboj senjunte.
  const sxelaGeometrio = konstruiSxelanRingon();
  // La ringo kreskas el la trunko. malhela trunka koloro ĉe la malsupro,
  // heliĝanta al la ringa koloro ĉe la rando.
  const sxelaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiPurpuranSxelanTeksajxon(), color: 0xffffff, roughness: 0o67/0o100, side: THREE.DoubleSide,
  });
  // Kapacito 9 ringoj po arbo — kun la grandeco-multiplikilo la maksimuma
  // alto estas 18.75 ( 15 × 0o5/0o4 ), kiu donas maksimume 9 ringojn.
  const sxeloj = new THREE.InstancedMesh(sxelaGeometrio, sxelaMaterialo, arboj.length * 0o11);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x8848a8, 0x9858b8, 0xa868c0, 0x7840a0, 0x9050b0 ];
  const yUp = new THREE.Vector3(0, 1, 0);
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

    // 3–5 tavoloj × kvar flankoj — la folioj ĉirkaŭas la trunkon egale.
    const tavoloj = 3 + ( ( hazardaGenerilo() * 3 ) | 0 );
    for ( let tavolo = 0; tavolo < tavoloj; tavolo++ ) {
      const tFrakcio = tavolo / ( tavoloj - 1 );
      // La supro restas ĉe 0o17/0o20 de la alto, por ke trunkopinto videblu super la krono.
      const y = h * ( 0o7/0o20 + 0o10/0o20 * tFrakcio );
      const tavolaSkalo = ( 1 - tavolo * 0o1/0o10 ) * ( 1 + t.s * 0o1/0o2 );
      // La trunka radiuso ĉe tiu alto — la folia bazo sidas ĝuste sur la
      // ŝelaj tasoj, kiel etendo de la ŝeloj.
      const trunkaRadiuso = 0o14/0o40 - ( y / h ) * 0o5/0o40;
      const ellagxo = trunkaRadiuso + 0o4/0o40;
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        const angulo = flanko / 4 * Math.PI * 2;
        // La folio leviĝas de la ŝelo kaj branĉiĝas eksteren — klino 0o3/0o10
        // donas pli da ekstera etendo dum la bazo restas sur la ŝeloj.
        E.set(0o3/0o10, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        const skalo = tavolaSkalo * ( 0o7/0o10 + hazardaGenerilo() * 0o1/0o4 );
        M.compose(pozicio(new THREE.Vector3(
            Math.sin(angulo) * ellagxo, y, Math.cos(angulo) * ellagxo)),
          Q, new THREE.Vector3(skalo, skalo, skalo));
        folioj.setMatrixAt(fi, M);
        folioj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
        fi++;
      }
    }

    // Ŝelaj ringoj — simetriaj tasoj, nestitaj unu en la alian, ekde la unua
    // folia tavolo ĝis la supro. La loboj jam estas en la geometrio ĉe la kvar
    // flankoj, do ĉiu ringo nur sekvas la trunkon.
    const unuaTavolaY = h * 0o7/0o20;
    const sxelaAlto = 0o3/0o2;
    const ringaSpaco = 0o11/0o10;
    // La gardo malsupre rompas la ciklon ĉe la trunka supro, do ĉi tiu
    // kalkulo nur supertaksas — ĝi ne bezonas kroman +1.
    const ringoj = Math.max(1, Math.ceil(( h - sxelaAlto - unuaTavolaY ) / ringaSpaco));
    for ( let ringo = 0; ringo < ringoj; ringo++ ) {
      const sxelaY = unuaTavolaY + ringo * ringaSpaco;
      if ( sxelaY > h - sxelaAlto ) break;
      // La ringo sidas ĝuste sur la trunko — skalu ĝin al la loka trunka
      // radiuso, por ke neniu interspaco videblu inter ringo kaj ŝelo.
      const trunkaR = 0o14/0o40 - ( sxelaY / h ) * 0o5/0o40;
      const ringaSkalo = Math.max(0o3/0o40, trunkaR / ( 0o12/0o40 ));
      M.compose(pozicio(new THREE.Vector3(0, sxelaY, 0)), Qtrunko,
        new THREE.Vector3(ringaSkalo, sxelaAlto, ringaSkalo));
      sxeloj.setMatrixAt(si, M);
      si++;
    }
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  folioj.count = fi;
  folioj.instanceMatrix.needsUpdate = true;
  if ( folioj.instanceColor ) folioj.instanceColor.needsUpdate = true;
  sxeloj.count = si;
  sxeloj.instanceMatrix.needsUpdate = true;
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
  const trunkaGeometrio = new THREE.CylinderGeometry(0o3/0o40, 0o5/0o40, 1, 7, 1);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: kreiPurpuranSxelanTeksajxon(), color: 0xffffff, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, plantoj.length);
  if ( plantoj.length === 0 ) return trunkoj;

  const foliaGeometrio = konstruiKurbanLaktukanFolion();
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiPurpuranFolianTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 1,
  });
  const folioj = new THREE.InstancedMesh(foliaGeometrio, foliaMaterialo, plantoj.length * MAX_TAVOLOJ * 4);
  const sxelaGeometrio = konstruiSxelanRingon();
  const sxelaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiPurpuranSxelanTeksajxon(), color: 0xffffff, roughness: 0o67/0o100, side: THREE.DoubleSide,
  });
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
    const Qtrunko = kreiKlinoQuaternionon(hazardaGenerilo, 0o1/0o10, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Qtrunko);

    M.compose(pozicio(new THREE.Vector3(0, h / 2, 0)), Qtrunko,
      new THREE.Vector3(1, h, 1));
    trunkoj.setMatrixAt(i, M);

    // 1–2 tavoloj × kvar flankoj — la folioj ĉirkaŭas la trunkon egale.
    const tavoloj = 1 + ( ( hazardaGenerilo() * 2 ) | 0 );
    for ( let tavolo = 0; tavolo < tavoloj; tavolo++ ) {
      const tFrakcio = tavoloj === 1 ? 0 : tavolo / ( tavoloj - 1 );
      // La foliaj tavoloj sidas ĉe 0o3/0o10 ( 0.375 ) kaj 0o6/0o10 ( 0.75 )
      // de la alto, por ke la trunkopinto videblu super la foliaro.
      const y = h * ( 0o3/0o10 + 0o3/0o10 * tFrakcio );
      const tavolaSkalo = ( 1 - tavolo * 0o1/0o10 );
      // La trunka radiuso ĉe tiu alto — la folia bazo sidas ĝuste sur la ŝelo.
      const trunkaRadiuso = 0o5/0o40 - ( y / h ) * 0o2/0o40;
      const ellagxo = trunkaRadiuso + 0o2/0o40;
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        const angulo = flanko / 4 * Math.PI * 2;
        E.set(0o3/0o10, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        const skalo = tavolaSkalo * ( 0o12/0o100 + hazardaGenerilo() * 0o13/0o100 );
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
    const unuaTavolaY = h * 0o3/0o10;
    const sxelaAlto = 0o3/0o10;
    if ( unuaTavolaY <= h - sxelaAlto ) {
      const trunkaR = 0o5/0o40 - ( unuaTavolaY / h ) * 0o2/0o40;
      const ringaSkalo = Math.max(0o3/0o40, trunkaR / ( 0o12/0o40 ));
      M.compose(pozicio(new THREE.Vector3(0, unuaTavolaY, 0)), Qtrunko,
        new THREE.Vector3(ringaSkalo, sxelaAlto, ringaSkalo));
      sxeloj.setMatrixAt(si, M);
      si++;
    }
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  folioj.count = fi;
  folioj.instanceMatrix.needsUpdate = true;
  if ( folioj.instanceColor ) folioj.instanceColor.needsUpdate = true;
  sxeloj.count = si;
  sxeloj.instanceMatrix.needsUpdate = true;
  trunkoj.castShadow = folioj.castShadow = sxeloj.castShadow = true;
  sceno.add(trunkoj, folioj, sxeloj);
  return trunkoj;
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
  const herbaTeksajxo = kreiHerbErinanTeksajxon();

  const fa = new THREE.PlaneGeometry(0o5/0o10, 0o10/0o10).translate(0, 0o4/0o10, 0);
  const fb = fa.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
  const merged = kunfandiDuGeometriojn(fa, fb);
  const herbaMaterialo = new THREE.MeshStandardMaterial({ map: herbaTeksajxo, alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 1 });
  const herboj = new THREE.InstancedMesh(merged, herbaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitaj: [ number, number ][] = [];
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
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot(x - px, z - pz) < 0o12/0o10 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

    const skalo = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q, new THREE.Vector3(skalo, skalo, skalo));
    herboj.setMatrixAt(hi++, M);
    metitaj.push([ x, z ]);
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
  const ena = new THREE.Vector3();
  const enX = new THREE.Vector3();
  const enZ = new THREE.Vector3();
  const vertikala = new THREE.Vector3(0, 1, 0);
  const yawQ = new THREE.Quaternion();
  const metitaj: [ number, number ][] = [];
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
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot(x - px, z - pz) < 0o2 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

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
    metitaj.push([ x, z ]);
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
): void {
  const hazardaGenerilo = mulberry32(22931);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const sxelaBumpo = kreiSxelanBumpanTeksajxon();
  const trunkaGeometrio = new THREE.CylinderGeometry(0o3/0o10, 0o4/0o10, 1, 7, 1);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, bumpMap: sxelaBumpo, bumpScale: 0o6/0o10, roughness: 0o67/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitaj: [ number, number ][] = [];
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
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot(x - px, z - pz) < 0o3 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

    const longo = 0o12/0o10 + hazardaGenerilo() * 0o22/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, Math.PI / 2 + ( hazardaGenerilo() - 0o4/0o10 ) * 0o4/0o10);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z) + 0o4/0o10, z), Q, new THREE.Vector3(1, longo, 1));
    trunkoj.setMatrixAt(ti++, M);
    metitaj.push([ x, z ]);
  }

  trunkoj.count = ti;
  trunkoj.instanceMatrix.needsUpdate = true;

  sceno.add(trunkoj);
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
  const flankoj = 8;
  const kresta = kunBrancetoj ? 0o1/0o10 : 0o15/0o100;
  for ( let i = 0; i < nodoj; i++ ) {
    const y0 = i * segmentaAlto;
    const r0 = rBazo - ( rBazo - rSupro ) * ( i / nodoj );
    const r1 = rBazo - ( rBazo - rSupro ) * ( ( i + 1 ) / nodoj );
    // Kana segmento — la stel-forma sekco montras la ripojn de la tigo.
    partoj.push(kreiRibitanSegmenton(r0, r1, segmentaAlto, flankoj, kresta).translate(0, y0, 0));
    // Ŝirma kolumeto ĉe la nodo — la karakteriza kana artiklo, pli larĝa
    // ol la tigo, glata por kontrasti kun la ripoj.
    if ( i > 0 ) {
      const kolumeto = new THREE.CylinderGeometry(r0 * 0o14/0o10, r0 * 0o14/0o10,
        segmentaAlto * 0o3/0o10, flankoj, 1).translate(0, y0, 0);
      partoj.push(kolumeto);
      if ( kunBrancetoj ) {
        // Kirlo da pendantaj branĉetoj — la botelpura silueto de la granda
        // ĉevalvosto. Pli multaj kaj pli longaj ol antaŭe, pendantaj iomete
        // SUB la horizonto, kaj pli longaj malsupre, pli mallongaj supre
        // ( la natura formo de Equisetum telmateia ).
        const brancetoj = 9;
        const longeco = segmentaAlto * ( 0o14/0o10 - 0o6/0o10 * ( i / nodoj ) );
        for ( let b = 0; b < brancetoj; b++ ) {
          const ang = b / brancetoj * Math.PI * 2;
          const branceto = new THREE.ConeGeometry(0o12/0o1000, longeco, 4)
            .translate(0, longeco / 2, 0);
          const M = new THREE.Matrix4().makeRotationY(ang);
          // Preskaŭ horizontale, tiam lasu la pinton pendi malsupren.
          M.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2 + 0o3/0o10));
          // Eta ŝtupo — la branĉetoj ne kuŝu ĉiuj en unu plata ringo.
          M.multiply(new THREE.Matrix4().makeRotationX(( b % 0o3 ) * 0o1/0o20));
          branceto.applyMatrix4(M);
          branceto.translate(0, y0, 0);
          partoj.push(branceto);
        }
      } else {
        // Dentetoj — la malgrandaj triangulaj folioj kiuj ĉirkaŭas ĉiun nodon
        // de la skura kano. Ses etaj konusoj starantaj ĉe la kolumeta rando.
        const dentoj = 6;
        for ( let d = 0; d < dentoj; d++ ) {
          const ang = d / dentoj * Math.PI * 2;
          const dento = new THREE.ConeGeometry(0o15/0o1000, 0o4/0o100, 3)
            .translate(0, 0o2/0o100, 0);
          const M = new THREE.Matrix4().makeRotationY(ang);
          M.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2 - 0o3/0o10));
          dento.applyMatrix4(M);
          dento.translate(Math.cos(ang) * r0 * 0o15/0o10, y0, Math.sin(ang) * r0 * 0o15/0o10);
          partoj.push(dento);
        }
      }
    }
  }
  if ( kunStrobilo ) {
    // Strobilo — mallonga pedunklo kaj skvama konusa sporujo kun ŝtupetaj
    // skvam-ringoj kaj pinto, multe pli simila al vera ĉevalvosta strobilo
    // ol unu nuda konuso.
    const pedunklo = new THREE.CylinderGeometry(rSupro * 0.8, rSupro * 0.8,
      0o6/0o100, 6).translate(0, 1 + 0o3/0o100, 0);
    partoj.push(pedunklo);
    const skvamoj = 4;
    for ( let s = 0; s < skvamoj; s++ ) {
      const rS = 0o1/0o10 * ( 1 - s * 0o2/0o10 );
      const ringo = new THREE.CylinderGeometry(rS * 0.8, rS, 0o3/0o100, 8)
        .translate(0, 1 + 0o6/0o100 + s * 0o3/0o100, 0);
      partoj.push(ringo);
    }
    const pinto = new THREE.ConeGeometry(0o12/0o1000, 0o5/0o100, 6)
      .translate(0, 1 + 0o6/0o100 + skvamoj * 0o3/0o100, 0);
    partoj.push(pinto);
  } else {
    // Mallonga pinto — la branĉa ĉevalvosto finiĝas per eta pinto anstataŭ
    // plata ĉapo ĉe la pinto de la lasta segmento.
    const pinto = new THREE.ConeGeometry(0o1/0o100, 0o3/0o100, 6)
      .translate(0, 1 + 0o1/0o100, 0);
    partoj.push(pinto);
  }
  return kunfandiGeometriojnSenIndekson(partoj);
}

// konstruiCetkuanGeometrion — Konstruu la geometrion de unu cetkuo
// ( Equisetum praealtum / ſᶘɔ ɭʃƽɹ ). La alta senbranĉa "skura kano" —
// multaj nodoj kun profundaj ripoj, ŝirmaj kolumetoj, dentetoj kaj skvama
// strobilo ĉe la pinto.
function konstruiCetkuanGeometrion(): THREE.BufferGeometry {
  return konstruiKanGeometrion(9, false, true);
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
    const y = heightFn(x, z);
    M.compose(new THREE.Vector3(x, y + alto / 2, z), Q, new THREE.Vector3(1, alto, 1));
    kavalerboj.setMatrixAt(ki, M);
    // Nuanco — ĉiu planto ricevas etan helan/malhelan varianton de la specia
    // koloro, por ke la stando ne aspektu unuforma.
    kavalerboj.setColorAt(ki, C.setHex(koloro).multiplyScalar(0.85 + hazardaGenerilo() * 0.2));
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
    kreiCetkuanTeksajxon(), 0x386848, 0o14/0o10, 0o30/0o10, ( h ) => {
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
    for ( const arbo of [ ...evituArbojn, ...placed ] ) {
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
  const herbaTeksajxo = kreiHerbErinanTeksajxon();

  const fa = new THREE.PlaneGeometry(0o5/0o10, 0o10/0o10).translate(0, 0o4/0o10, 0);
  const fb = fa.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
  const merged = kunfandiDuGeometriojn(fa, fb);
  const herbaMaterialo = new THREE.MeshStandardMaterial({ map: herbaTeksajxo, alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 1 });
  const herboj = new THREE.InstancedMesh(merged, herbaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitaj: [ number, number ][] = [];
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
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot(x - px, z - pz) < 0o12/0o10 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

    const skalo = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q, new THREE.Vector3(skalo, skalo, skalo));
    herboj.setMatrixAt(hi++, M);
    metitaj.push([ x, z ]);
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
    kreiCakeanTeksajxon(), 0x50a860, 0o12/0o10, 0o24/0o10, ( h ) => {
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


