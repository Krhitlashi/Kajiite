// ≺⧼ Metado de la plantoj 🌳 ⧽≻
// La konkretaj metaj pasoj — la Puŝŝlefoj laŭ la biomo ( metiPussxlefojn ),
// la arbaro de la valo ( metiArbojn ), la montara arbaro
// ( metiMontajnArbojn ) kaj la lagringo ( metiArbojnCxirkauLagon ). La
// komunaj spacaj iloj ( la haŝo, la interspaco, la arbareroj ) vivas en
// metado.ts.
import { glataPaso, akvaNivelo, biomo, type Biomo } from "../../../kantaoj/mondo/tereno.js";
import { KRONA_LIBERO, kronaRadiusoBetula, kronaRadiusoPussxlefa } from "./kronoj.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";
import { PunktaHasho, interspaco, montaKruteco, spronaDuono, type ArboMetado } from "./metado.js";

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
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
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
  kronaRadiuso: ( s: number ) => number = kronaRadiusoBetula,
  biomojFiltro?: readonly Biomo[]
): ArboMetado[] {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
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
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
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
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
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
