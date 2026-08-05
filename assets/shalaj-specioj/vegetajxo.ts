// Vegetajxa modulo — betuloj, filikoj, likenoj por la nebula arbara medio
import * as THREE from "three";
import { kreiSxelanTeksajxon, kreiLarikanSxelanTeksajxon, kreiFilikanTeksajxon, kreiPurpuranFilikanTeksajxon,
  kreiHerbErinanTeksajxon, kreiLikenanTeksajxon, kreiPurpuranFolianTeksajxon } from "../komunajxoj/teksajxoj.js";
import { kunfandiDuGeometriojn, kunfandiGeometriojnSenIndekson } from "../komunajxoj/kunfandajxoj.js";
import { kreiHazardanGenerilon } from "../komunajxoj/hazardo.js";
import { glataPaso } from "../../src/tereno.js";

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

// La inter-arba minimuma distanco — la pli granda de la baza interspaco kaj la
// sumo de la du kronaj radiusoj plus la libero, por ke la foliaroj restu liberaj.
const interspaco = ( baza: number, rA: number, rB: number ): number =>
  Math.max( baza, rA + rB + KRONA_LIBERO );

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
function kreiGrovojn( kvanto: number, worldRadius: number,
  hazardaGenerilo: () => number,
  excludeRivers: (x: number, z: number) => boolean
): Grovo[] {
  const grovoj: Grovo[] = [];
  let provoj = 0;
  while ( grovoj.length < kvanto && provoj++ < 0o10000 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    const radiuso = 0o40 + ( worldRadius - 0o40 ) * Math.sqrt( hazardaGenerilo() );
    const x = Math.sin( angulo ) * radiuso;
    const z = Math.cos( angulo ) * radiuso;
    if ( Math.hypot( x, z ) < 0o40 ) continue;      // la urbo restas malfermita
    if ( excludeRivers( x, z )) continue;
    if ( Math.abs( x ) > worldRadius + 0o24 || Math.abs( z ) > worldRadius + 0o24 ) continue;
    let troProksima = false;
    for ( const g of grovoj ) {
      if ( Math.hypot( x - g.x, z - g.z ) < 0o50 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    grovoj.push( { x, z, r: 0o20 + hazardaGenerilo() * 0o60 } );
  }
  if ( grovoj.length === 0 ) grovoj.push( { x: 0o70, z: 0o70, r: 0o50 } );
  return grovoj;
}

// kreiArbarerojn — Publika enirpunkto al kreiGrovojn. La samaj arbareroj estas
// dividitaj inter la arbo-specoj, por ke betuloj, larikoj kaj Ĥŝakŝlefoj
// miksiĝu en la samaj naturaj arbareroj.
export function kreiArbarerojn( kvanto: number, worldRadius: number,
  excludeRivers: (x: number, z: number) => boolean,
  semo = 0o53104
): Grovo[] {
  const hazardaGenerilo = mulberry32( semo );
  return kreiGrovojn( kvanto, worldRadius, hazardaGenerilo, excludeRivers );
}

// hazardaGrovaLoko — Hazarda punkto en hazarda arbarero. La dusuma disdono
// ( sumo de du hazardoj ) densigas la centron kaj maldensigas la randon — la
// natura arba klastero-formo, anstataŭ la uniforma disko de ringo.
function hazardaGrovaLoko( hazardaGenerilo: () => number, grovoj: Grovo[] ): { x: number; z: number } {
  const g = grovoj[ ( hazardaGenerilo() * grovoj.length ) | 0 ];
  const angulo = hazardaGenerilo() * Math.PI * 2;
  const disto = g.r * ( hazardaGenerilo() + hazardaGenerilo() - 1 );
  return { x: g.x + Math.sin( angulo ) * disto, z: g.z + Math.cos( angulo ) * disto };
}

// metiArbojn — Metu arbojn en la arbaron, evitante riverojn, vojojn kaj konstruajxojn.
// La arboj klasteriĝas en naturaj arbareroj ( grovoj ) anstataŭ en ringo
// ĉirkaŭ la urbo. Se grovoj estas transdonataj, ili estas dividitaj inter la
// arbo-specoj, por ke la arbareroj miksiĝu.
//     @param heightFn ( funkcio ) - Tera alta funkcio.
export function metiArbojn( heightFn: (x: number, z: number) => number,
  kvanto: number,
  worldRadius: number,
  excludeRivers: (x: number, z: number) => boolean,
  excludePaths: (x: number, z: number, minDistanco: number) => boolean,
  excludeBuildings: (x: number, z: number, minDistanco: number) => boolean,
  semo = 0o53104,
  evituArbojn: ArboMetado[] = [],
  minimumaDistanco = 0o10,
  grovoj: Grovo[] = [],
  kronaRadiuso: ( s: number ) => number = kronaRadiusoBetula
): ArboMetado[] {
  const hazardaGenerilo = mulberry32( semo );
  const arbareroj = grovoj.length ? grovoj
    : kreiGrovojn( Math.max( 0o4, Math.floor( kvanto / 0o24 )), worldRadius, hazardaGenerilo, excludeRivers );
  const placed: ArboMetado[] = [];
  let provoj = 0;

  const bonaLoko = (x: number, z: number, s: number): boolean => {
    if (Math.hypot(x, z) < 0o20) return false;
    if (excludeRivers(x, z)) return false;
    if (excludePaths(x, z, 0o44/0o10)) return false;
    if (excludeBuildings(x, z, 3)) return false;
    const kandidataR = kronaRadiuso( s );
    for ( const arbo of [ ...evituArbojn, ...placed ] ) {
      if ( Math.hypot( x - arbo.x, z - arbo.z ) <
        interspaco( minimumaDistanco, arbo.r ?? kronaRadiusoBetula( arbo.s ), kandidataR ) ) return false;
    }
    return true;
  };

  while ( placed.length < kvanto && provoj++ < 0o10000 ) {
    const loko = hazardaGrovaLoko( hazardaGenerilo, arbareroj );
    const x = loko.x;
    const z = loko.z;
    if (Math.abs(x) > worldRadius + 0o24 || Math.abs(z) > worldRadius + 0o24) continue;
    const s = 0o63/0o100 + hazardaGenerilo() * 0o55/0o100;
    if (!bonaLoko(x, z, s)) continue;
    placed.push({ x, z, h: heightFn(x, z), s, r: kronaRadiuso( s ) });
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
export function metiMontajnArbojn( heightFn: (x: number, z: number) => number,
  kvanto: number,
  zMin: number, zMax: number,
  excludeRivers: (x: number, z: number) => boolean,
  excludePaths: (x: number, z: number, minDistanco: number) => boolean,
  excludeBuildings: (x: number, z: number, minDistanco: number) => boolean,
  semo = 0o53131,
  evituArbojn: ArboMetado[] = [],
  minimumaDistanco = 0o10,
  kronaRadiuso: ( s: number ) => number = kronaRadiusoBetula,
  cx = 0,
  xDuono = 0o340
): ArboMetado[] {
  const hazardaGenerilo = mulberry32( semo );
  const placed: ArboMetado[] = [];
  let provoj = 0;
  // Aro de la valaj arboj — rapida testado de la mozaika interspaco en la
  // ofta buklo ( Set.has estas O(1), kontraste al array.includes O(n) ).
  const evitaAro = new Set( evituArbojn );

  // Deklivo — la plej granda altecdiferenco per unuo, specimenita ĉe la punkto.
  const deklivo = (x: number, z: number): number => {
    const paso = 0o4;
    const h0 = heightFn( x, z );
    const hx = heightFn( x + paso, z );
    const hz = heightFn( x, z + paso );
    return Math.max( Math.abs( hx - h0 ), Math.abs( hz - h0 ) ) / paso;
  };

  // Suda fado — la monta arbaro dissolviĝas en la valan arbaron anstataŭ
  // komenciĝi ĉe la duro piedo. la denseco rampas de 0 al plena tra la unuaj
  // 0o20 unuoj de la bando, do la transiro inter la zonoj estas natura.
  const sudaFado = ( z: number ): number => {
    const t = Math.max( 0, Math.min( 1, ( z - zMin ) / 0o20 ));
    return t * t * ( 3 - 2 * t );
  };

  // Arbolinia fado — la denseco fadas laŭ la tera alto. plena sub ≈0o16,
  // malkreskanta tra 0o16→0o26 kaj nula super ≈0o26. Tiel la arbaro dissolviĝas
  // en la senarbajn pintojn kaj la norda deklivo ( kie la tero denove subiras
  // sub la arbolinion ) povas rearbariĝi nature, anstataŭ fermiĝi per duro rando.
  const arboliniaFado = ( h: number ): number => 1 - glataPaso( 0o16, 0o26, h );

  // X-envelopo — la arbaro sekvas la montan spron-silueton. pli larĝa ĉe la
  // piedo ( kie la spronoj larĝe disvastiĝas ), pli mallarĝa al la kresto.
  // La centro ( cx ) kaj duono-larĝo ( xDuono ) estas parametro — la norda
  // montaro ( defaŭlto cx=0, xDuono=0o340 ) kaj la nordorienta monto
  // ( cx=-0o360, xDuono=0o60 ) uzas la saman funkcion.
  const xEnvelopo = ( z: number ): number => xDuono * ( 0o75/0o100 + 0o25/0o100 * sudaFado( z ));

  // Montaraj arbareroj — la arboj klasteriĝas en naturaj makuloj anstataŭ
  // unuforma tapiŝo. La ankroj aperas hazarde en la sama spur-silueta envelopo
  // kiel la arboj, kun minimuma reciproka distanco, por ke la deklivoj montru
  // verajn arbarerojn kun paŭzoj inter ili.
  const grovoj: { x: number; z: number }[] = [];
  let grovajProvoj = 0;
  while ( grovoj.length < Math.max( 0o4, Math.floor( kvanto / 0o16 )) && grovajProvoj++ < 0o10000 ) {
    const gz = zMin + hazardaGenerilo() * ( zMax - zMin );
    if ( hazardaGenerilo() > sudaFado( gz )) continue;
    const gx = cx + ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo( gz );
    if ( Math.hypot( gx, gz ) < 0o120 ) continue;   // la urbo restas malfermita
    if ( excludeRivers( gx, gz ) || excludePaths( gx, gz, 0o2 ) || excludeBuildings( gx, gz, 0o2 )) continue;
    let troProksima = false;
    for ( const g of grovoj ) {
      if ( Math.hypot( gx - g.x, gz - g.z ) < 0o50 ) { troProksima = true; break; }
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
      const g = grovoj[ ( hazardaGenerilo() * grovoj.length ) | 0 ];
      const ang = hazardaGenerilo() * Math.PI * 2;
      const disto = 0o14 * ( hazardaGenerilo() + hazardaGenerilo() );
      x = g.x + Math.sin( ang ) * disto;
      z = g.z + Math.cos( ang ) * disto;
      // La suda fado validas ankaŭ por la klasterigitaj arboj — alie densaj
      // makuloj aperus ĝuste ĉe la monto-piedo, kie la arbaro devus dissolviĝi
      // en la valan arbaron.
      if ( hazardaGenerilo() > sudaFado( z )) continue;
    } else {
      z = zMin + hazardaGenerilo() * ( zMax - zMin );
      if ( hazardaGenerilo() > sudaFado( z )) continue;   // maldensa ĉe la piedo
      // Triangula disdono laŭ x — densa meze, maldensa ĉe la spronaj finoj.
      x = cx + ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo( z );
    }
    if ( Math.hypot( x, z ) < 0o120 ) continue;   // la urbo restas malfermita
    const h = heightFn( x, z );
    // Arbolinia fado — malabundigas la arbojn sur la altaj deklivoj, la
    // krestoj kaj la pintoj ( plena sub ≈0o16, nula ĉe ≈0o26 ).
    if ( hazardaGenerilo() > arboliniaFado( h )) continue;   // arbolinio
    if ( excludeRivers( x, z )) continue;
    if ( excludePaths( x, z, 0o44/0o10 )) continue;
    if ( excludeBuildings( x, z, 3 )) continue;
    // Tro kruta deklivo — neniu arbo sur la klifoj ( la montaraj pintoj ).
    if ( deklivo( x, z ) > 0o6/0o10 ) continue;
    // Alteca skemo — la arboj malgrandiĝas al la arbolinio ( natura
    // subgranda zono de la montarbaro ): plena grandeco sub ≈0o16, fadanta
    // al duono ĉe la arbolinio, anstataŭ unuforma grandeco tra la deklivo.
    const s = ( 0o63/0o100 + hazardaGenerilo() * 0o55/0o100 )
      * ( 0o1/0o2 + 0o1/0o2 * arboliniaFado( h ) );
    const kandidataR = kronaRadiuso( s );
    let troProksima = false;
    for ( const arbo of [ ...evituArbojn, ...placed ] ) {
      // Kontraŭ la valaj arboj la distanco estas pli libera ( 0o5 ), por ke la
      // monta arbaro interplektiĝu kun la vala anstataŭ lasi mozaton laŭ la piedo.
      const mozaika = evitaAro.has( arbo ) ? 0o5 : minimumaDistanco;
      if ( Math.hypot( x - arbo.x, z - arbo.z ) <
        interspaco( mozaika, arbo.r ?? kronaRadiusoBetula( arbo.s ), kandidataR ) ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    placed.push({ x, z, h, s, r: kronaRadiuso( s ) });
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
export function konstruiMontajnRokojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: (x: number, z: number) => number,
  excludeRivers: (x: number, z: number) => boolean,
  excludePaths: (x: number, z: number, minDistanco: number) => boolean,
  semo = 624512,
  cx = 0,
  xDuono = 0o340,
  zMin = 0o260,
  zDuono = 0o160
): ArboMetado[] {
  const hazardaGenerilo = mulberry32( semo );
  const sxtonaGeometrio = new THREE.IcosahedronGeometry( 1, 0 );
  const sxtonoj = new THREE.InstancedMesh( sxtonaGeometrio,
    new THREE.MeshStandardMaterial({ roughness: 0o75/0o100 }), kvanto );

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
  const sudaFado = ( z: number ): number => {
    const t = Math.max( 0, Math.min( 1, ( z - zMin ) / 0o20 ));
    return t * t * ( 3 - 2 * t );
  };
  const xEnvelopo = ( z: number ): number => xDuono * ( 0o75/0o100 + 0o25/0o100 * sudaFado( z ));
  // Alteca akcepto — inversa de la arbolinia fado. malmulta sub la arbolinio
  // ( kie la arbaro vivas ), plena sur la kresto kaj la supraj deklivoj.
  const rokAkcepto = ( h: number ): number => glataPaso( 0o16, 0o30, h );

  while ( li < kvanto && gardilo++ < 0o10000 ) {
    const z = zMin + hazardaGenerilo() * zDuono;
    if ( hazardaGenerilo() > sudaFado( z )) continue;
    const x = cx + ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo( z );
    if ( Math.hypot( x, z ) < 0o120 ) continue;
    if ( hazardaGenerilo() > rokAkcepto( heightFn( x, z ))) continue;
    if ( excludeRivers( x, z ) || excludePaths( x, z, 0o2 )) continue;
    // Tro kruta deklivo — neniu roko ŝvebas sur la klifoj.
    const paso = 0o4;
    const h0 = heightFn( x, z );
    const kruteco = Math.max( Math.abs( heightFn( x + paso, z ) - h0 ),
      Math.abs( heightFn( x, z + paso ) - h0 ) ) / paso;
    if ( kruteco > 0o1 ) continue;

    const skaloY = 0o5/0o10 + hazardaGenerilo() * 0o5/0o10;
    E.set( hazardaGenerilo() * 0o15/0o40, hazardaGenerilo() * Math.PI * 2, hazardaGenerilo() * 0o15/0o40 );
    Q.setFromEuler( E );
    const y = heightFn( x, z );
    M.compose( new THREE.Vector3( x, y + skaloY * 0o23/0o100, z ),
      Q,
      new THREE.Vector3( skaloY, skaloY, skaloY ) );
    sxtonoj.setMatrixAt( li, M );
    sxtonoj.setColorAt( li, C.setHex( paletro[ ( hazardaGenerilo() * paletro.length ) | 0 ] ) );
    metitaj.push( { x, z, h: y, s: skaloY } );
    li++;
  }

  sxtonoj.instanceMatrix.needsUpdate = true;
  if ( sxtonoj.instanceColor ) sxtonoj.instanceColor.needsUpdate = true;
  sxtonoj.castShadow = true;
  sceno.add( sxtonoj );
  return metitaj;
}

// instanciiSubkreskajxojn — Komuna konstruo por miksitaj subkreskajxaj tavoloj.
// Konstruas sep instancigitajn plantojn ( verdan filikon, malaltan purpuran
// planton, purpuran filikon, arboforman purpuran filikon, herbotufon,
// musko-monteton kaj likenan makulon ) kaj plenigas ilin per unu komuna
// ciklo: la proviza funkcio donas kandidat-lokojn, la evitu-arbaro kaj la
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
function instanciiSubkreskajxojn( sceno: THREE.Scene,
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
  const filikaG = new THREE.PlaneGeometry( 0o155/0o100, 0o155/0o100 ).translate( 0, 0o33/0o40, 0 );
  const filikaGeometrio = kunfandiDuGeometriojn( filikaG,
    filikaG.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI / 2 )) );
  const filikoj = new THREE.InstancedMesh( filikaGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiFilikanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 1 }), kvanto );

  const purpuraL = 0o11/0o20, purpuraH = 0o22/0o20;
  const pa = new THREE.PlaneGeometry( purpuraL, purpuraH ).translate( 0, purpuraH / 2, 0 );
  const pb = pa.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI / 2 ));
  const pc = pa.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI / 4 ));
  const pd = pa.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( 3 * Math.PI / 4 ));
  const purpuraGeometrio = kunfandiGeometriojnSenIndekson([ pa, pb, pc, pd ]);
  const purpuraj = new THREE.InstancedMesh( purpuraGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranFilikanTeksajxon(), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), kvanto );

  // Malaltaj purpuraj plantoj — la malgranda variaĵo de la purpura filiko.
  const malaltaL = 0o12/0o20, malaltaH = 0o16/0o20;
  const ma = new THREE.PlaneGeometry( malaltaL, malaltaH ).translate( 0, malaltaH / 2, 0 );
  const mb = ma.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI / 2 ));
  const mc = ma.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI / 4 ));
  const md = ma.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( 3 * Math.PI / 4 ));
  const malaltaGeometrio = kunfandiGeometriojnSenIndekson([ ma, mb, mc, md ]);
  const malaltaj = new THREE.InstancedMesh( malaltaGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranFilikanTeksajxon( true ), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), kvanto );

  const herbaG = new THREE.PlaneGeometry( 0o5/0o10, 0o10/0o10 ).translate( 0, 0o4/0o10, 0 );
  const herbaGeometrio = kunfandiDuGeometriojn( herbaG,
    herbaG.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI / 2 )) );
  const herboj = new THREE.InstancedMesh( herbaGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiHerbErinanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 1 }), kvanto );

  const muskoj = new THREE.InstancedMesh( new THREE.SphereGeometry( 1, 6, 5 ),
    new THREE.MeshStandardMaterial({ roughness: 1, color: 0x385038 }), kvanto );

  // Arboformaj purpuraj filikoj — la sama trunko + tavola krono kiel en
  // konstruiAltajnPurpurajnFilikojn ( unu reprezenta speco, du tavoloj ).
  const altaSpeco = { trunkaAlto: 0o74/0o10, kronaAlto: 0o73/0o10, kronaLargho: 0o16/0o10, nombro: 0o10, mallevo: 0o10/0o10 };
  const altaKronoGeometrio = konstruiTavolanFrondanKronon( altaSpeco, 2 );
  const altaTrunkaGeometrio = new THREE.CylinderGeometry(
    PURPURAJ_TRUNKAJ_RADIOJ.supro, PURPURAJ_TRUNKAJ_RADIOJ.malsupro, altaSpeco.trunkaAlto, 7 );
  const altajTrunkoj = new THREE.InstancedMesh( altaTrunkaGeometrio,
    new THREE.MeshStandardMaterial({ color: 0x3a2742, roughness: 0o7/0o10 }), kvanto );
  const altajKronoj = new THREE.InstancedMesh( altaKronoGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranFilikanTeksajxon( false ), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), kvanto );

  // Likenaj makuloj — plataj grundaj makuloj, sekvantaj la deklivan normalon.
  const likenaGeometrio = new THREE.PlaneGeometry( 1, 1 );
  likenaGeometrio.rotateX( -Math.PI / 2 );
  const likenoj = new THREE.InstancedMesh( likenaGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiLikenanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide,
      transparent: true, depthWrite: false, roughness: 1 }), kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const S = new THREE.Vector3();
  const P = new THREE.Vector3();
  const yawQ = new THREE.Quaternion();
  const vertikala = new THREE.Vector3( 0, 1, 0 );
  const normalo = new THREE.Vector3();
  const ena = new THREE.Vector3();
  const enX = new THREE.Vector3();
  const enZ = new THREE.Vector3();
  const metitaj: [ number, number ][] = [];
  let fi = 0, pu = 0, mp = 0, hi = 0, ta = 0, mi = 0, li = 0;
  let gardilo = 0;

  while ( fi + pu + mp + hi + ta + mi + li < kvanto && gardilo++ < gardiloLim ) {
    const loko = provizi();
    if ( !loko ) continue;
    const x = loko[0], z = loko[1];
    // Speca loto unue — la arboformaj purpuraj filikoj bezonas pli da libero
    // ol la malgrandaj plantoj ( iliaj kronoj larĝas ĝis ~2.6 unuoj ).
    const speco = hazardaGenerilo();
    const alta = speco >= 0o7/0o10 && speco < 0o4/0o5;
    const arbLibero = alta ? 0o10/0o5 + KRONA_LIBERO : 0o4/0o10;
    const minDist = alta ? 0o10/0o5 * 0o2 + 0o3 : 0o14/0o10;
    // Evitu la trunkojn/kronojn de cxiuj arboj.
    let troProksima = false;
    for ( const arbo of evituArbojn ) {
      if ( Math.hypot( x - arbo.x, z - arbo.z ) <
        ( arbo.r ?? kronaRadiusoBetula( arbo.s )) + arbLibero ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    // Eta interspaco — la plantoj restu distingeblaj ( pli granda por la
    // arboformaj filikoj, kies kronoj ne trapenetru unu la alian ).
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot( x - px, z - pz ) < minDist ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

    const y = heightFn( x, z );
    if ( speco < 0o2/0o10 ) {
      // Verda filiko.
      const skalo = 0o5/0o10 + hazardaGenerilo() * 0o6/0o10;
      E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
      Q.setFromEuler( E );
      M.compose( P.set( x, y, z ), Q, S.setScalar( skalo ));
      filikoj.setMatrixAt( fi++, M );
    } else if ( speco < 0o4/0o10 ) {
      // Malalta purpura planto.
      const skalo = 0o6/0o10 + hazardaGenerilo() * 0o6/0o10;
      E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
      Q.setFromEuler( E );
      M.compose( P.set( x, y, z ), Q, S.setScalar( skalo ));
      malaltaj.setMatrixAt( mp++, M );
    } else if ( speco < 0o6/0o10 ) {
      // Purpura filiko.
      const skalo = 0o45/0o100 + hazardaGenerilo() * 0o5/0o10;
      E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
      Q.setFromEuler( E );
      M.compose( P.set( x, y, z ), Q, S.setScalar( skalo ));
      purpuraj.setMatrixAt( pu++, M );
    } else if ( speco < 0o7/0o10 ) {
      // Herbotufo.
      const skalo = 0o3/0o10 + hazardaGenerilo() * 0o5/0o10;
      E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
      Q.setFromEuler( E );
      M.compose( P.set( x, y, z ), Q, S.setScalar( skalo ));
      herboj.setMatrixAt( hi++, M );
    } else if ( speco < 0o4/0o5 ) {
      // Arboforma purpura filiko — trunko kaj tavola krono je la sama bazo.
      const skalo = 0o5/0o10 + hazardaGenerilo() * 0o11/0o10;
      E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
      Q.setFromEuler( E );
      M.compose( P.set( x, y + altaSpeco.trunkaAlto * skalo / 2, z ), Q, S.setScalar( skalo ));
      altajTrunkoj.setMatrixAt( ta, M );
      M.compose( P.set( x, y, z ), Q, S.setScalar( skalo ));
      altajKronoj.setMatrixAt( ta, M );
      ta++;
    } else if ( speco < 0o11/0o10 ) {
      // Musko-monteto — platigita.
      const skalo = 0o25/0o100 + hazardaGenerilo() * 0o35/0o100;
      M.compose( P.set( x, y + skalo * 0o2/0o10, z ), Q.identity(),
        S.set( skalo, skalo * 0o3/0o10, skalo ));
      muskoj.setMatrixAt( mi++, M );
    } else {
      // Likena makulo — plata, sekvas la deklivan normalon.
      const skalo = 0o6/0o10 + hazardaGenerilo() * 0o12/0o10;
      const paso = skalo * 0o1/0o2;
      ena.set( x, y, z );
      enX.set( x + paso, heightFn( x + paso, z ), z ).sub( ena );
      enZ.set( x, heightFn( x, z + paso ), z ).sub( ena );
      normalo.crossVectors( enZ, enX ).normalize();
      const vert = normalo.y;
      const horiz = Math.hypot( normalo.x, normalo.z );
      const maxKruteco = Math.PI / 16;
      if ( horiz > 0o1/0o2000 && Math.atan2( horiz, Math.max( vert, 0o1/0o2000 )) > maxKruteco ) {
        const u = Math.tan( maxKruteco );
        const hx = normalo.x / horiz;
        const hz = normalo.z / horiz;
        normalo.set( hx * u, 1, hz * u );
      }
      normalo.normalize();
      Q.setFromUnitVectors( vertikala, normalo );
      E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
      yawQ.setFromEuler( E );
      Q.multiply( yawQ );
      M.compose( P.set( x, y + 0o1/0o40, z ), Q, S.setScalar( skalo ));
      likenoj.setMatrixAt( li++, M );
    }
    metitaj.push( [ x, z ] );
  }

  filikoj.count = fi; filikoj.instanceMatrix.needsUpdate = true; sceno.add( filikoj );
  malaltaj.count = mp; malaltaj.instanceMatrix.needsUpdate = true; sceno.add( malaltaj );
  purpuraj.count = pu; purpuraj.instanceMatrix.needsUpdate = true; sceno.add( purpuraj );
  herboj.count = hi; herboj.instanceMatrix.needsUpdate = true; sceno.add( herboj );
  muskoj.count = mi; muskoj.instanceMatrix.needsUpdate = true; sceno.add( muskoj );
  likenoj.count = li; likenoj.instanceMatrix.needsUpdate = true; sceno.add( likenoj );
  altajTrunkoj.count = ta; altajTrunkoj.instanceMatrix.needsUpdate = true; altajTrunkoj.castShadow = true; sceno.add( altajTrunkoj );
  altajKronoj.count = ta; altajKronoj.instanceMatrix.needsUpdate = true; altajKronoj.castShadow = true; sceno.add( altajKronoj );
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
export function konstruiMontajnSubkreskajxojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  montajArboj: ArboMetado[],
  evituArbojn: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53133
): void {
  const hazardaGenerilo = mulberry32( semo );

  // La sama pieda fado kaj spur-silueta x-envelopo kiel en metiMontajnArbojn,
  // sed la bando kovras la tutan montaron ( la piedo gxis la norda piedo ) kaj
  // komencigxas pli sube — en la norda rando de la vala arbaro ( z ≈ 0o174 ),
  // por ke la subkreskajxo enmiksigxu en la valan betulan/larikan arbaron
  // anstataux lasi nudan strion cxe la monto-piedo.
  const sudaFado = ( z: number ): number => {
    const t = Math.max( 0, Math.min( 1, ( z - 0o174 ) / 0o20 ));
    return t * t * ( 3 - 2 * t );
  };
  const xEnvelopo = ( z: number ): number => 0o340 * ( 0o75/0o100 + 0o25/0o100 * sudaFado( z ));
  // Arbolinia fado — pli tolerema ol tiu de la arboj ( 0o16 → 0o26 ): la
  // filikoj kaj arbustoj kreskas iomete pli alten ol la arboj.
  const arboliniaFado = ( h: number ): number => 1 - glataPaso( 0o17, 0o34, h );

  const provizi = (): [ number, number ] | null => {
    let x: number, z: number;
    if ( montajArboj.length && hazardaGenerilo() < 0o3/0o4 ) {
      // Klasterigxu cxirkaux la arboj — gxuste ekster la kronoj.
      const t = montajArboj[ ( hazardaGenerilo() * montajArboj.length ) | 0 ];
      const a = hazardaGenerilo() * Math.PI * 2;
      // Larĝa ringo ( 0.5..5.5 ) — la malgrandaj plantoj kreskas nature cxirkaŭ
      // la trunko, kaj la arboformaj purpuraj filikoj ( kiuj bezonas pli da
      // libero ) povas ankaux aperi apud la arboj.
      const d = ( t.r ?? kronaRadiusoBetula( t.s )) + 0o5/0o10 + hazardaGenerilo() * 0o5;
      x = t.x + Math.sin( a ) * d;
      z = t.z + Math.cos( a ) * d;
    } else {
      // Envelopo — la samaj spur-siluetaj formoj kiel la monta arbaro.
      z = 0o174 + hazardaGenerilo() * 0o250;
      if ( hazardaGenerilo() > sudaFado( z )) return null;
      x = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo( z );
    }
    if ( Math.hypot( x, z ) < 0o20 ) return null;   // la urbo-centro restas malfermita
    if ( excludeRivers( x, z ) || excludePaths( x, z, 0o2 ) || excludeBuildings( x, z, 0o2 )) return null;
    if ( hazardaGenerilo() > arboliniaFado( heightFn( x, z ))) return null;
    // Deklivo — neniu planto sxvebas sur la klifoj.
    const paso = 0o4;
    const h0 = heightFn( x, z );
    const kruteco = Math.max( Math.abs( heightFn( x + paso, z ) - h0 ),
      Math.abs( heightFn( x, z + paso ) - h0 )) / paso;
    if ( kruteco > 0o4/0o5 ) return null;
    return [ x, z ];
  };

  instanciiSubkreskajxojn( sceno, kvanto, heightFn, hazardaGenerilo, provizi, evituArbojn, 0o20000 );
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
export function konstruiLaganSubkreskajxojn( sceno: THREE.Scene,
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
  semo = 0o53134
): void {
  const hazardaGenerilo = mulberry32( semo );

  const provizi = (): [ number, number ] | null => {
    let x: number, z: number;
    if ( lagArboj.length && hazardaGenerilo() < 0o3/0o4 ) {
      // Klasterigxu cxirkaux la lagaj arboj — gxuste ekster la kronoj.
      const t = lagArboj[ ( hazardaGenerilo() * lagArboj.length ) | 0 ];
      const a = hazardaGenerilo() * Math.PI * 2;
      // Larĝa ringo ( 0.5..5.5 ) — same kiel en la montara/vala tavolo.
      const d = ( t.r ?? kronaRadiusoBetula( t.s )) + 0o5/0o10 + hazardaGenerilo() * 0o5;
      x = t.x + Math.sin( a ) * d;
      z = t.z + Math.cos( a ) * d;
    } else {
      // Ringo de la lagrando gxis ~40 unuojn ekster gxi — sekvas la bordon.
      const angulo = hazardaGenerilo() * Math.PI * 2;
      const radiuso = radioFn( angulo ) + hazardaGenerilo() * 0o50;
      x = cx + Math.cos( angulo ) * radiuso;
      z = cz + Math.sin( angulo ) * radiuso;
    }
    if ( Math.abs( x ) > 0o450 || Math.abs( z ) > 0o450 ) return null;
    if ( excludeRivers( x, z ) || excludePaths( x, z, 0o2 ) || excludeBuildings( x, z, 0o2 )) return null;
    // Nur seka bordo — la malseka kavo restas sen plantoj.
    if ( heightFn( x, z ) < akvoNiveloFn( x, z )) return null;
    return [ x, z ];
  };

  instanciiSubkreskajxojn( sceno, kvanto, heightFn, hazardaGenerilo, provizi, evituArbojn, 0o10000 );
}

// konstruiArbaron — Konstruu instancigitajn arbojn (trunkoj kaj foliaroj) en la sceno.
export function konstruiArbaron( sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = mulberry32(77531);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const trunkaGeometrio = new THREE.CylinderGeometry(0o7/0o40, 0o3/0o10, 1, 7, 1);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if (arboj.length === 0) return trunkoj;

  const kronaGeometrio = new THREE.SphereGeometry(1, 7, 5);
  const kronaMaterialo = new THREE.MeshStandardMaterial({ roughness: 0o35/0o40 });
  const kronoj = new THREE.InstancedMesh(kronaGeometrio, kronaMaterialo, arboj.length * 2);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x688858, 0x78a068, 0x88a878, 0xa0b080, 0x789868 ];

  arboj.forEach((t, i) => {
    const h = 0o64/0o10 + t.s * 0o44/0o10;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(t.x, t.h + h / 2, t.z), Q, new THREE.Vector3(1, h, 1));
    trunkoj.setMatrixAt(i, M);

    const kronoRadiuso = 0o215/0o100 * t.s + 0o63/0o100;
    M.compose(new THREE.Vector3(t.x, t.h + h - 0o4/0o10, t.z), Q, new THREE.Vector3(kronoRadiuso, kronoRadiuso * 0o27/0o40, kronoRadiuso));
    kronoj.setMatrixAt(i * 2, M);
    kronoj.setColorAt(i * 2, C.setHex(paletro[(hazardaGenerilo() * paletro.length) | 0]));

    M.compose( new THREE.Vector3(t.x + kronoRadiuso * 0o23/0o100, t.h + h + 0o63/0o100, t.z + kronoRadiuso * 0o15/0o100),
      Q,
      new THREE.Vector3(kronoRadiuso * 0o23/0o40, kronoRadiuso * 0o4/0o10, kronoRadiuso * 0o23/0o40) );
    kronoj.setMatrixAt(i * 2 + 1, M);
    kronoj.setColorAt(i * 2 + 1, C.setHex(paletro[(hazardaGenerilo() * paletro.length) | 0]));
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  kronoj.instanceMatrix.needsUpdate = true;
  if (kronoj.instanceColor) kronoj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = kronoj.castShadow = true;
  sceno.add(trunkoj, kronoj);
  return trunkoj;
}

// konstruiFilikojn — Metu filikojn proksime al arboj kaj vojrandoj.
export function konstruiFilikojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: (x: number, z: number) => number,
  nearTrees: ArboMetado[],
  vojSpecimenoj: THREE.Vector3[],
  excludeRivers: (x: number, z: number) => boolean,
  excludePaths: (x: number, z: number, minDistanco: number) => boolean
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
  // arbareroj anstataŭ disiĝi tra la tuta mapo.
  const filikaGrovoj = kreiGrovojn( Math.max( 0o4, Math.floor( kvanto / 0o20 )), 0o200, hazardaGenerilo, excludeRivers );

  while ( fi < kvanto && gardilo++ < 0o5670 ) {
    let x: number, z: number;
    if (hazardaGenerilo() < 0o23/0o40 && nearTrees.length) {
      const t = nearTrees[(hazardaGenerilo() * nearTrees.length) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 3;
      x = t.x + Math.sin(a) * hazardaRadiuso;
      z = t.z + Math.cos(a) * hazardaRadiuso;
    } else if ( vojSpecimenoj.length ) {
      const p = vojSpecimenoj[(hazardaGenerilo() * vojSpecimenoj.length) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 2 + hazardaGenerilo() * 3;
      x = p.x + Math.sin(a) * hazardaRadiuso;
      z = p.z + Math.cos(a) * hazardaRadiuso;
    } else {
      const loko = hazardaGrovaLoko( hazardaGenerilo, filikaGrovoj );
      x = loko.x;
      z = loko.z;
    }

    if (excludeRivers(x, z) || excludePaths(x, z, 2) || Math.hypot(x, z) < 0o16) continue;
    // Eta interspaco — la filikoj ne kresku unu sur la alia ĉe la arboj.
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot( x - px, z - pz ) < 0o2 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

    const skalo = 0o55/0o100 + hazardaGenerilo() * 0o63/0o100;
    E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q, new THREE.Vector3(skalo, skalo, skalo));
    filikoj.setMatrixAt(fi++, M);
    metitaj.push( [ x, z ] );
  }

  filikoj.count = fi;
  filikoj.instanceMatrix.needsUpdate = true;
  sceno.add(filikoj);
}

// konstruiPurpurajnPlantojn — Metu malaltajn purpurajn plantojn en la arbara rando.
export function konstruiPurpurajnPlantojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  konstruiPeriferianFilikanAreon( sceno, kvanto, heightFn, excludeRivers, excludePaths, excludeBuildings,
    kreiPurpuranFilikanTeksajxon( true ), 0o12/0o20, 0o16/0o20, 0o53104 );
}

// konstruiPurpurajnFilikojn — Metu pli altajn purpurajn filikojn inter la eksteraj arboj.
export function konstruiPurpurajnFilikojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  konstruiPeriferianFilikanAreon( sceno, kvanto, heightFn, excludeRivers, excludePaths, excludeBuildings,
    kreiPurpuranFilikanTeksajxon(), 0o15/0o20, 0o24/0o20, 0o53114 );
}

// konstruiPeriferianFilikanAreon — Kunigu du krucajn tavolojn por natura arbara rando.
function konstruiPeriferianFilikanAreon( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  teksajxo: THREE.CanvasTexture,
  bazaLargho: number,
  bazaAlto: number,
  semo: number
): void {
  const hazardaGenerilo = mulberry32( semo );
  // Kvar egalaj krucaj ebenoj konservas la frondan formon el cxiu rigardangulo.
  // Tri ebenoj lasis kelkajn specimenojn videble plataj kaj distorditaj.
  const fa = new THREE.PlaneGeometry( bazaLargho, bazaAlto ).translate( 0, bazaAlto / 2, 0 );
  const fb = fa.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI / 2 ));
  const fc = fa.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI / 4 ));
  const fd = fa.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( 3 * Math.PI / 4 ));
  const merged = kunfandiGeometriojnSenIndekson([ fa, fb, fc, fd ]);
  const materialo = new THREE.MeshStandardMaterial({ map: teksajxo, alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 });
  const plantoj = new THREE.InstancedMesh( merged, materialo, kvanto );

  // Arbareroj — la purpuraj plantoj klasteriĝas en naturaj makuloj, dividante
  // la samajn arbarerojn kiel la arbaro, anstataŭ egala ringo ĉirkaŭ la urbo.
  const grovoj = kreiGrovojn( Math.max( 0o4, Math.floor( kvanto / 0o24 )), 0o200, hazardaGenerilo, excludeRivers );
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitaj: [ number, number ][] = [];
  let pi = 0;
  let gardilo = 0;

  while ( pi < kvanto && gardilo++ < 0o10000 ) {
    const loko = hazardaGrovaLoko( hazardaGenerilo, grovoj );
    const x = loko.x;
    const z = loko.z;
    if ( Math.abs( x ) > 0o224 || Math.abs( z ) > 0o224 ) continue;
    if ( excludeRivers( x, z )) continue;
    if ( excludePaths( x, z, 0o2 )) continue;
    if ( excludeBuildings( x, z, 0o2 )) continue;
    // Eta interspaco — la purpuraj plantoj restu distingeblaj, ne unu sur la alia.
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot( x - px, z - pz ) < 0o2 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

    const skalo = 0o6/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
    Q.setFromEuler( E );
    M.compose( new THREE.Vector3( x, heightFn( x, z ), z ), Q,
      new THREE.Vector3( skalo, skalo, skalo ));
    plantoj.setMatrixAt( pi++, M );
    metitaj.push( [ x, z ] );
  }

  plantoj.count = pi;
  plantoj.instanceMatrix.needsUpdate = true;
  sceno.add( plantoj );
}

// konstruiAltajnPurpurajnFilikojn — Metu arboformajn purpurajn filikojn ĉe la arbara rando.
// La folioj kreskas tavole laŭ la trunko kaj la trunko transiras al ili
// senjunte — kiel la Ĥŝakŝlefo.
//     @param evituArbojn ( ArboMetado[] = [] ) - Jam metitaj arboj; la filikoj
//         restas ekster la trunkoj/kronoj anstataŭ kreski en la arbojn.
export function konstruiAltajnPurpurajnFilikojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  evituArbojn: ArboMetado[] = []
): void {
  const hazardaGenerilo = mulberry32( 0o53124 );
  const specoj = [
    { trunkaAlto: 0o74/0o10, kronaAlto: 0o73/0o10, kronaLargho: 0o16/0o10, nombro: 0o10, mallevo: 0o10/0o10, densa: false },
    { trunkaAlto: 0o56/0o10, kronaAlto: 0o54/0o10, kronaLargho: 0o12/0o10, nombro: 0o6, mallevo: 0o4/0o10, densa: true },
    { trunkaAlto: 0o124/0o10, kronaAlto: 0o43/0o10, kronaLargho: 0o12/0o10, nombro: 5, mallevo: 0o11/0o10, densa: false },
  ];
  // Ĉiu speco havas sian tavolnombron — la folioj kreskas tavole.
  const TAVOLOJ = [ 2, 3, 4 ];
  const kronajGeometrioj = specoj.map( ( speco, i ) => konstruiTavolanFrondanKronon( speco, TAVOLOJ[i] ));
  const trunkajGeometrioj = specoj.map( speco => new THREE.CylinderGeometry(
    PURPURAJ_TRUNKAJ_RADIOJ.supro, PURPURAJ_TRUNKAJ_RADIOJ.malsupro, speco.trunkaAlto, 7 ));
  const trunkajMaterialoj = specoj.map( ( _, i ) => new THREE.MeshStandardMaterial({ color: [ 0x3a2742, 0x40204a, 0x2a1a44 ][i], roughness: 0o7/0o10 }));
  const kronajMaterialoj = specoj.map( speco => new THREE.MeshStandardMaterial({
    map: kreiPurpuranFilikanTeksajxon( speco.densa ), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1,
  }));
  const nombroj = specoj.map( () => Math.ceil( kvanto / specoj.length ));
  const trunkoj = trunkajGeometrioj.map( ( geometrio, i ) => new THREE.InstancedMesh( geometrio, trunkajMaterialoj[i], nombroj[i] ));
  const kronoj = kronajGeometrioj.map( ( geometrio, i ) => new THREE.InstancedMesh( geometrio, kronajMaterialoj[i], nombroj[i] ));
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const indicoj = specoj.map( () => 0 );
  const metitaj: [ number, number ][] = [];
  let provoj = 0;
  // Arbareroj — la altaj purpuraj filikoj kreskas en naturaj makuloj, ne en ringo.
  const grovoj = kreiGrovojn( Math.max( 0o4, Math.floor( kvanto / 0o20 )), 0o200, hazardaGenerilo, excludeRivers );

  while ( indicoj.reduce( ( a, b ) => a + b, 0 ) < kvanto && provoj++ < 0o10000 ) {
    const loko = hazardaGrovaLoko( hazardaGenerilo, grovoj );
    const x = loko.x;
    const z = loko.z;
    if ( Math.abs( x ) > 0o224 || Math.abs( z ) > 0o224 ) continue;
    if ( excludeRivers( x, z ) || excludePaths( x, z, 0o3 ) || excludeBuildings( x, z, 0o3 )) continue;
    // Ne lasu la arboformajn filikojn kreski unu EN la alian — la triangulara
    // grova disdono densigas la centrojn, kaj sen interspaco multaj specimenoj
    // kreskis je preskaŭ la sama loko, kun la frondaj kronoj trapenetrantaj.
    // La interspaco estas krona-konscia: la plej larĝa krono ( 0o16/0o10 ) je
    // la plej granda skalo ( 0o16/0o10 ) larĝas ≈ 2.6 unuojn, do la efika
    // duon-radiuso estas ≈ 1.6 ( 8/5 ) kun la pendantaj frondoj.
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot( x - px, z - pz ) < 0o10/0o5 * 0o2 + 0o3 ) { troProksima = true; break; }
    }
    // Ankaŭ ne en la arbojn — la trunko kaj la pendantaj kronoj de la filiko
    // restas ekster la krona radiuso de ĉiu jam metita arbo ( plus la libero ).
    if ( !troProksima ) {
      for ( const arbo of evituArbojn ) {
        if ( Math.hypot( x - arbo.x, z - arbo.z ) <
          ( arbo.r ?? kronaRadiusoBetula( arbo.s )) + 0o10/0o5 + KRONA_LIBERO ) { troProksima = true; break; }
      }
    }
    if ( troProksima ) continue;

    // Hazardelektu la specion — malsamaj trunkoj/kronoj donas diversajn grandecojn.
    let specoIndico = ( hazardaGenerilo() * specoj.length ) | 0;
    if ( indicoj[specoIndico] >= nombroj[specoIndico] ) {
      specoIndico = indicoj.findIndex( ( n, j ) => n < nombroj[j] );
      if ( specoIndico < 0 ) break;
    }
    const speco = specoj[specoIndico];
    const skalo = 0o5/0o10 + hazardaGenerilo() * 0o11/0o10;
    E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
    Q.setFromEuler( E );
    const y = heightFn( x, z );
    // La translokigoj devas inkluzivi la saman specimenan skalon kiel la geometrio.
    // Alie la trunko malleviĝas kaj la krono flosas super ĝi ĉe malgrandaj skaloj.
    const trunkaCentroY = y + speco.trunkaAlto * skalo / 2;
    // La tavola krono-geometrio estas baz-ankrita ĉe la trunka bazo — la plej
    // suba tavolo komenciĝas duone laŭ la trunko, do la trunko transiras al
    // la folioj senjunte.
    const kronaCentroY = y;
    M.compose( new THREE.Vector3( x, trunkaCentroY, z ), Q, new THREE.Vector3( skalo, skalo, skalo ));
    trunkoj[specoIndico].setMatrixAt( indicoj[specoIndico], M );
    M.compose( new THREE.Vector3( x, kronaCentroY, z ), Q, new THREE.Vector3( skalo, skalo, skalo ));
    kronoj[specoIndico].setMatrixAt( indicoj[specoIndico], M );
    indicoj[specoIndico]++;
    metitaj.push( [ x, z ] );
  }

  trunkoj.forEach( ( mesh, i ) => { mesh.count = indicoj[i]; mesh.instanceMatrix.needsUpdate = true; mesh.castShadow = true; sceno.add( mesh ); });
  kronoj.forEach( ( mesh, i ) => { mesh.count = indicoj[i]; mesh.instanceMatrix.needsUpdate = true; mesh.castShadow = true; sceno.add( mesh ); });
}

function konstruiFrondanKronon( nombro: number, largho: number, alto: number, mallevo: number, radiuso = 0 ): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  for ( let i = 0; i < nombro; i++ ) {
    // Konstruu cxiu frondon cxirkaux la bazo; tiel la bazo restas sur la grundo
    // kaj la rotacio ne tiras la teksturon en oblikvan, distorditan formon.
    const frondo = new THREE.PlaneGeometry( largho, alto ).translate( 0, alto / 2, 0 ).toNonIndexed();
    const transformo = new THREE.Matrix4().makeRotationY( i / nombro * Math.PI * 2 );
    transformo.multiply( new THREE.Matrix4().makeRotationX( mallevo ));
    frondo.applyMatrix4( transformo );
    // Puŝu la frondon eksteren laŭ la trunka radiuso, por ke ĝi eliru el la
    // trunka surfaco anstataŭ sub ĝi.
    frondo.translate( Math.sin( i / nombro * Math.PI * 2 ) * radiuso, 0,
      Math.cos( i / nombro * Math.PI * 2 ) * radiuso );
    partoj.push( frondo );
  }
  const geometrio = kunfandiGeometriojnSenIndekson( partoj );
  geometrio.computeBoundingBox();
  if ( geometrio.boundingBox ) geometrio.translate( 0, -geometrio.boundingBox.min.y, 0 );
  return geometrio;
}

// konstruiTavolanFrondanKronon — Kunu plurajn frondajn tavolojn laŭ la trunko,
// por ke la folioj kresku tavole kaj la trunko transiru al ili senjunte. La plej
// suba tavolo estas ĉe y=0 ( la trunka bazo ); la supraj sekvas la trunk-alton.
//     @param speco ( objekto ) - La speco-datumoj.
//     @param tavoloj ( number ) - Kiom da foliaj tavoloj.
//     @returns geometrio ( THREE.BufferGeometry ) - La tavola krono.
function konstruiTavolanFrondanKronon( speco: {
  trunkaAlto: number; kronaAlto: number; kronaLargho: number; nombro: number; mallevo: number;
}, tavoloj: number ): THREE.BufferGeometry {
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
    const frondo = konstruiFrondanKronon( speco.nombro,
      speco.kronaLargho * skaloT, speco.kronaAlto * skaloT, speco.mallevo, trunkaRadiuso );
    frondo.translate( 0, speco.trunkaAlto * frakcio, 0 );
    partoj.push( frondo );
  }
  return kunfandiGeometriojnSenIndekson( partoj );
}

// konstruiLikenSxtonojn — Metu liken-kovritajn sxtonojn en la arbaron.
// Kelkaj sxtonoj portas verdan likenan nuancon, la aliaj restas grizaj.
//     @returns metitaj ( ArboMetado[] ) - La pozicioj de la metitaj sxtonoj,
//         por ke la likenoj povas grupigi ĉirkaŭ ili.
export function konstruiLikenSxtonojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: (x: number, z: number) => number,
  excludeRivers: (x: number, z: number) => boolean,
  excludePaths: (x: number, z: number, minDistanco: number) => boolean
): ArboMetado[] {
  const hazardaGenerilo = mulberry32( 99221 );
  const sxtonaGeometrio = new THREE.IcosahedronGeometry( 1, 0 );
  const sxtonoj = new THREE.InstancedMesh( sxtonaGeometrio,
    new THREE.MeshStandardMaterial({ roughness: 0o75/0o100 }), kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x687870, 0x788878, 0x687870, 0x889870, 0x98a880, 0x788878 ];
  const metitaj: ArboMetado[] = [];

  for ( let i = 0; i < kvanto; i++ ) {
    let x: number, z: number;
    const a = hazardaGenerilo() * Math.PI * 2;
    const hazardaRadiuso = 0o22 + hazardaGenerilo() * 0o156;
    x = Math.sin(a) * hazardaRadiuso;
    z = Math.cos(a) * hazardaRadiuso;
    if (excludeRivers(x, z) || excludePaths(x, z, 0o2)) { i--; continue; }

    const skaloY = 0o4/0o10 + hazardaGenerilo() * 0o4/0o10;
    E.set(hazardaGenerilo() * 0o15/0o40, hazardaGenerilo() * Math.PI * 2, hazardaGenerilo() * 0o15/0o40);
    Q.setFromEuler(E);
    const y = heightFn( x, z );
    M.compose( new THREE.Vector3(x, y + skaloY * 0o23/0o100, z),
      Q,
      new THREE.Vector3(skaloY, skaloY, skaloY) );
    sxtonoj.setMatrixAt(i, M);
    sxtonoj.setColorAt( i, C.setHex( paletro[ ( hazardaGenerilo() * paletro.length ) | 0 ] ) );
    metitaj.push( { x, z, h: y, s: skaloY } );
  }

  sxtonoj.instanceMatrix.needsUpdate = true;
  if ( sxtonoj.instanceColor ) sxtonoj.instanceColor.needsUpdate = true;
  sxtonoj.castShadow = true;
  sceno.add(sxtonoj);
  return metitaj;
}

// konstruiLikenojn — Metu krustajn likenajn makulojn sur la arbaran teron.
// Ĉiu makulo estas unu ebeno kuŝigita laŭ la loka deklivo — la normalo venas
// el tri teraj specimenoj, do la makulo sekvas la monteton kaj ne tranĉas
// en ĝin. Unu ebeno ankaŭ evitas la mem-flagradon de krucigitaj ebenoj.
// La makuloj grupigas apud arboj kaj sxtonoj, kaj kelkaj sterniĝas hazarde.
// En la montara reĝimo ( montara = true ) la hazardaj makuloj uzas la saman
// spron-siluetan x-envelopon kaj altecan akcepton kiel la montaj rokoj — la
// likenoj sterniĝas super la kresto kaj la supraj deklivoj, kongrue kun la
// nova rokzono kaj arbolinia fado, anstataŭ en rektangula bando.
//     @param nearTrees ( ArboMetado[] ) - Arboj por la grupigado.
//     @param nearSxtonoj ( ArboMetado[] ) - Liken-sxtonoj por la grupigado.
//     @param montara ( boolean ) - Montara reĝimo ( spur-silueta alta disdono ).
export function konstruiLikenojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  nearSxtonoj: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  montara = false
): void {
  const hazardaGenerilo = mulberry32( 0o72331 );
  const likenaTeksajxo = kreiLikenanTeksajxon();

  const geometrio = new THREE.PlaneGeometry( 1, 1 );
  geometrio.rotateX( -Math.PI / 2 );
  const materialo = new THREE.MeshStandardMaterial({
    map: likenaTeksajxo, alphaTest: 0o15/0o40, side: THREE.DoubleSide,
    transparent: true, depthWrite: false, roughness: 1,
  });
  const likenoj = new THREE.InstancedMesh( geometrio, materialo, kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const yawQ = new THREE.Quaternion();
  const vertikala = new THREE.Vector3( 0, 1, 0 );
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
  const sudaFado = ( z: number ): number => {
    const t = Math.max( 0, Math.min( 1, ( z - 0o260 ) / 0o20 ));
    return t * t * ( 3 - 2 * t );
  };
  const xEnvelopo = ( z: number ): number => 0o340 * ( 0o75/0o100 + 0o25/0o100 * sudaFado( z ));
  const altaAkcepto = ( h: number ): number => glataPaso( 0o14, 0o26, h );

  while ( li < kvanto && gardilo++ < 0o10000 ) {
    let x: number, z: number;
    if ( montara ) {
      // Montara disdono — la samaj spur-siluetaj formoj kiel la rokoj.
      z = 0o260 + hazardaGenerilo() * 0o160;
      if ( hazardaGenerilo() > sudaFado( z )) continue;
      x = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo( z );
    } else if ( ankroj.length && hazardaGenerilo() < 0o3/0o4 ) {
      const t = ankroj[ ( hazardaGenerilo() * ankroj.length ) | 0 ];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 3;
      x = t.x + Math.sin( a ) * hazardaRadiuso;
      z = t.z + Math.cos( a ) * hazardaRadiuso;
    } else {
      const a = hazardaGenerilo() * Math.PI * 2;
      const r = 0o20 + 0o160 * Math.sqrt( hazardaGenerilo() );
      x = Math.cos( a ) * r;
      z = Math.sin( a ) * r;
    }
    if ( excludeRivers( x, z ) || excludePaths( x, z, 0o2 )) continue;
    if ( Math.hypot( x, z ) < 0o20 ) continue;
    // Montara alteca akcepto — la likenoj sterniĝas sur la supraj deklivoj.
    if ( montara && hazardaGenerilo() > altaAkcepto( heightFn( x, z ))) continue;
    // Eta interspaco — la makuloj ne kuŝu unu sur la alia.
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot( x - px, z - pz ) < 0o2 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

    const skalo = 0o6/0o10 + hazardaGenerilo() * 0o12/0o10;
    // Tri teraj specimenoj difinas la deklivan normalon.
    const paso = skalo * 0o1/0o2;
    ena.set( x, heightFn( x, z ), z );
    enX.set( x + paso, heightFn( x + paso, z ), z ).sub( ena );
    enZ.set( x, heightFn( x, z + paso ), z ).sub( ena );
    normalo.crossVectors( enZ, enX ).normalize();
    // Ne lasu la makulon stari sur sia flanko ĉe krutaj deklivoj ( la
    // rivervalaj muroj, la montetaj flankoj ) — limigu la klinon al malgranda
    // angulo, por ke la likeno ĉiam kuŝu preskaŭ plate kaj neniam aperu rande.
    // La normalo estas rekonstruita je la limigita klino, do eĉ preskaŭ
    // vertikala muro donas platan makulon ( ne unu starantan rande ).
    const vert = normalo.y;
    const horiz = Math.hypot( normalo.x, normalo.z );
    const maxKruteco = Math.PI / 16; // ≈ 11° — ĉiam kuŝu plate
    if ( horiz > 0o1/0o2000 && Math.atan2( horiz, Math.max( vert, 0o1/0o2000 )) > maxKruteco ) {
      const u = Math.tan( maxKruteco );
      const hx = normalo.x / horiz;
      const hz = normalo.z / horiz;
      normalo.set( hx * u, 1, hz * u );
    }
    normalo.normalize();
    Q.setFromUnitVectors( vertikala, normalo );
    E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
    yawQ.setFromEuler( E );
    Q.multiply( yawQ );
    M.compose( new THREE.Vector3( x, ena.y + 0o1/0o40, z ), Q,
      new THREE.Vector3( skalo, skalo, skalo ) );
    likenoj.setMatrixAt( li++, M );
    metitaj.push( [ x, z ] );
  }

  likenoj.count = li;
  likenoj.instanceMatrix.needsUpdate = true;
  sceno.add( likenoj );
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
export function konstruiTrunkajnLikenojn( sceno: THREE.Scene,
  trunkoj: THREE.InstancedMesh[],
  semo = 0o62451
): THREE.InstancedMesh {
  const hazardaGenerilo = mulberry32( semo );
  const likenaTeksajxo = kreiLikenanTeksajxon();

  // Krusta bulo — platigita dudekedro kun la likena teksajxo; la alphaTest
  // tranĉas la eksteron, do restas neregula, krusta formo.
  const buloGeometrio = new THREE.IcosahedronGeometry( 1, 0 );
  const buloMaterialo = new THREE.MeshStandardMaterial({
    map: likenaTeksajxo, alphaTest: 0o15/0o40, side: THREE.DoubleSide,
    transparent: true, depthWrite: false, roughness: 1,
  });
  // Kapacito — maksimume 0o4 buloj po arbo.
  const kapacito = trunkoj.reduce( ( sumo, tr ) => sumo + tr.count, 0 ) * 0o4;
  const buloj = new THREE.InstancedMesh( buloGeometrio, buloMaterialo, kapacito );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const P = new THREE.Vector3();
  const S = new THREE.Vector3();
  const akso = new THREE.Vector3();
  const radia = new THREE.Vector3();
  const surTrunko = new THREE.Vector3();
  const yUp = new THREE.Vector3( 0, 1, 0 );
  const Qb = new THREE.Quaternion();
  const Qy = new THREE.Quaternion();
  let bi = 0;

  for ( const trunko of trunkoj ) {
    for ( let i = 0; i < trunko.count; i++ ) {
      // Nur iuj arboj portas likenojn ( ĉ. 1/3 ).
      if ( hazardaGenerilo() > 1/3 ) continue;
      trunko.getMatrixAt( i, M );
      M.decompose( P, Q, S );
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
        akso.set( 0, ( t - 0o1/0o2 ) * alto, 0 ).applyQuaternion( Q );
        radia.set( Math.cos( ang ), 0, Math.sin( ang ) ).applyQuaternion( Q );
        surTrunko.copy( P ).add( akso ).addScaledVector( radia, r + 0o1/0o40 );
        // La bulo rigardas radiale eksteren de la trunka akso.
        Qb.setFromUnitVectors( yUp, radia );
        Qy.setFromAxisAngle( radia, hazardaGenerilo() * Math.PI * 2 );
        Qb.multiply( Qy );
        const skalo = 0o1/0o10 + hazardaGenerilo() * 0o1/0o20;
        M.compose( surTrunko, Qb, new THREE.Vector3( skalo, skalo, skalo ) );
        buloj.setMatrixAt( bi++, M );
      }
    }
  }

  buloj.count = bi;
  buloj.instanceMatrix.needsUpdate = true;
  sceno.add( buloj );
  return buloj;
}

// konstruiLarikon — Konstruu instancigitajn alpinajn larikojn en la sceno.
// La alpina lariko havas grizbrunan, platan trunk-sxoelon kaj aŭtunan
// orflavan pinglaron — la sola konifero kiu perdas siajn pinglojn aŭtune.
// Ĝiaj tavoligitaj kronoj formas distingajn kirlojn.
//     @param arboj ( ArboMetado[] ) - La metitaj arboj.
export function konstruiLarikon( sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = mulberry32( 33718 );
  const larikaTeksajxo = kreiLarikanSxelanTeksajxon();
  const trunkaGeometrio = new THREE.CylinderGeometry( 0o7/0o40, 0o3/0o10, 1, 7, 1 );
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: larikaTeksajxo, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh( trunkaGeometrio, trunkaMaterialo, arboj.length );
  if ( arboj.length === 0 ) return trunkoj;

  // Du aŭ tri konusaj tavoloj, ĉiu pli mallarĝa ol la antaŭa — la kirloj
  // de la alpina lariko. La tavoloj restas sur la trunk-akso, nur la tria
  // foje estas kaŝita ( skalo 0 ).
  const kronaGeometrio = new THREE.ConeGeometry( 1, 1, 7, 1 );
  const kronaMaterialo = new THREE.MeshStandardMaterial({ roughness: 0o35/0o40 });
  const kronoj = new THREE.InstancedMesh( kronaGeometrio, kronaMaterialo, arboj.length * 3 );

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  // Aŭtunaj pingloj — orflavaj kun kelkaj verdflavaj kaj ambraj nuancoj.
  const paletro = [ 0xc8a848, 0xd0b858, 0xd8c060, 0xd8a838, 0xc0a048, 0xe0c868, 0xb89038, 0xa8b048 ];

  arboj.forEach(( t, i ) => {
    const h = 0o60/0o10 + t.s * 0o40/0o10;
    const trunkaLargho = 0o31/0o40 + t.s * 0o7/0o40;
    // Alpaj larikoj kreskas kompakte — malgranda klino nur rompas la uniformecon.
    const Q = kreiKlinoQuaternionon( hazardaGenerilo, 0o3/0o20, hazardaGenerilo() * Math.PI * 2 );
    const bazo = new THREE.Vector3( t.x, t.h, t.z );
    const pozicio = kreiPoziciilon( bazo, Q );

    M.compose( pozicio( new THREE.Vector3( 0, h / 2, 0 ) ), Q,
      new THREE.Vector3( trunkaLargho, h, trunkaLargho ) );
    trunkoj.setMatrixAt( i, M );

    const tavoloj = 2 + ( ( hazardaGenerilo() * 2 ) | 0 );
    const bazaLargho = 0o11/0o10 * t.s + 0o4/0o10;
    const bazaAlto = 0o17/0o10 * t.s + 0o5/0o10;
    let y = h;
    for ( let k = 0; k < 3; k++ ) {
      const kaŝita = k >= tavoloj ? 0 : 1;
      const m = k / 3;
      const kronoLargho = bazaLargho * ( 1 - m * 0o3/0o4 );
      const kronoAlto = bazaAlto * ( 1 - m * 0o3/0o20 );
      y += kronoAlto * 0o3/0o10;
      M.compose( pozicio( new THREE.Vector3( 0, y, 0 ) ),
        Q, new THREE.Vector3( kronoLargho * kaŝita, kronoAlto * kaŝita, kronoLargho * kaŝita ) );
      kronoj.setMatrixAt( i * 3 + k, M );
      kronoj.setColorAt( i * 3 + k, hazardaKoloro( hazardaGenerilo, C, paletro ) );
      y += kronoAlto * 0o5/0o10;
    }
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  kronoj.instanceMatrix.needsUpdate = true;
  if ( kronoj.instanceColor ) kronoj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = kronoj.castShadow = true;
  sceno.add( trunkoj, kronoj );
  return trunkoj;
}

// konstruiHxsxaksxlefojn — Konstruu instancigitajn purpurajn laktuk-arbojn
// ( ı],ͷ̗ɔʞ ֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ / Ĥŝakŝlefo ) en la sceno. Ĉiu arbo havas altan
// purpuran trunkon kaj 3–5 tavolojn, ĉiu kun kvar grandaj kurbiĝintaj folioj
// ( kvar flankoj × pluraj fojoj vertikale — la tri-tavola regulo estis nur
// ekzemplo, do pli povas okazi ). De la unua folia tavolo supren la trunko
// estas kovrita de rigidaj senkrustiĝantaj ringoj — simetriaj tasoj kies
// supraj randoj disiĝas foliforme, el kiuj la folioj etendiĝas senjunte.
//     @param arboj ( ArboMetado[] ) - La metitaj arboj.
export function konstruiHxsxaksxlefojn( sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = mulberry32( 0o62445 );
  const MAX_TAVOLOJ = 5;
  // Purpura trunko — kiel la aliaj purpuraj plantoj, ne betula ŝelo.
  const trunkaGeometrio = new THREE.CylinderGeometry( 0o7/0o40, 0o3/0o10, 1, 7, 1 );
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ color: 0x482848, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh( trunkaGeometrio, trunkaMaterialo, arboj.length );
  if ( arboj.length === 0 ) return trunkoj;

  // Pli dika, plena folio — pli larĝa klingo, pli profunda kurbeco kaj
  // reala diko, kiel laktuko aŭ brasiko.
  const foliaGeometrio = konstruiKurbanLaktukanFolion();
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiPurpuranFolianTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 1,
  });
  const folioj = new THREE.InstancedMesh( foliaGeometrio, foliaMaterialo, arboj.length * MAX_TAVOLOJ * 4 );

  // Rigidaj ŝelaj ringoj — plenaj simetriaj tasoj ĉirkaŭ la trunko, pli larĝaj
  // ĉe la supro kaj kurbiĝantaj eksteren ( trumpeto-formo ), kies supraj randoj
  // disiĝas en kvar foliformajn lobojn ( ĉe la kvar flankoj de la folioj ).
  // La folioj etendiĝas el la loboj senjunte.
  const sxelaGeometrio = new THREE.CylinderGeometry( 0o16/0o40, 0o13/0o40, 1, 0o30, 1, true ).translate( 0, 0o1/0o2, 0 );
  const sxelaPozicioj = sxelaGeometrio.attributes.position;
  for ( let i = 0; i < sxelaPozicioj.count; i++ ) {
    const x = sxelaPozicioj.getX( i );
    const y = sxelaPozicioj.getY( i );
    const z = sxelaPozicioj.getZ( i );
    // La ringo kurbiĝas eksteren al la supro — la radiuso kreskas kvadrate.
    const faktoro = 1 + 0o1/0o10 * y * y;
    let novaY = y;
    if ( y > 0o3/0o4 ) {
      // Kvar rondaj foli-loboj ĉe la kvar flankaj direktoj.
      const ang = Math.atan2( x, z );
      const lobo = Math.pow( ( Math.cos( 4 * ang ) + 1 ) / 2, 2 );
      novaY = y + 2/5 * lobo;
    }
    sxelaPozicioj.setXYZ( i, x * faktoro, novaY, z * faktoro );
  }
  sxelaGeometrio.computeVertexNormals();
  const sxelaMaterialo = new THREE.MeshStandardMaterial({ color: 0x583858, roughness: 0o67/0o100, side: THREE.DoubleSide });
  // Kapacito 9 ringoj po arbo — kun la grandeco-multiplikilo la maksimuma
  // alto estas 18.75 ( 15 × 0o5/0o4 ), kiu donas maksimume 9 ringojn.
  const sxeloj = new THREE.InstancedMesh( sxelaGeometrio, sxelaMaterialo, arboj.length * 0o11 );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x8848a8, 0x9858b8, 0xa868c0, 0x7840a0, 0x9050b0 ];
  const yUp = new THREE.Vector3( 0, 1, 0 );
  let fi = 0;
  let si = 0;

  arboj.forEach(( t, i ) => {
    // Malsamaj grandecoj — la arba faktoro donas la bazan alton kaj la
    // multiplikilo ( 0o3/0o4 ĝis 0o5/0o4 ) faras kelkajn arbojn rimarkeble pli
    // mallongaj kaj aliajn pli altaj.
    const h = ( 0o110/0o10 + t.s * 0o40/0o10 ) * ( 0o3/0o4 + hazardaGenerilo() * 0o1/0o2 );
    const Qtrunko = kreiKlinoQuaternionon( hazardaGenerilo, 0o1/0o10, hazardaGenerilo() * Math.PI * 2 );
    const bazo = new THREE.Vector3( t.x, t.h, t.z );
    const pozicio = kreiPoziciilon( bazo, Qtrunko );

    M.compose( pozicio( new THREE.Vector3( 0, h / 2, 0 ) ), Qtrunko,
      new THREE.Vector3( 1, h, 1 ) );
    trunkoj.setMatrixAt( i, M );

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
        E.set( 0o3/0o10, 0, 0 );
        Q.setFromEuler( E );
        Q.premultiply( new THREE.Quaternion().setFromAxisAngle( yUp, angulo ) );
        Q.premultiply( Qtrunko );
        const skalo = tavolaSkalo * ( 0o7/0o10 + hazardaGenerilo() * 0o1/0o4 );
        M.compose( pozicio( new THREE.Vector3(
            Math.sin( angulo ) * ellagxo, y, Math.cos( angulo ) * ellagxo ) ),
          Q, new THREE.Vector3( skalo, skalo, skalo ) );
        folioj.setMatrixAt( fi, M );
        folioj.setColorAt( fi, hazardaKoloro( hazardaGenerilo, C, paletro ) );
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
    const ringoj = Math.max( 1, Math.ceil( ( h - sxelaAlto - unuaTavolaY ) / ringaSpaco ) );
    for ( let ringo = 0; ringo < ringoj; ringo++ ) {
      const sxelaY = unuaTavolaY + ringo * ringaSpaco;
      if ( sxelaY > h - sxelaAlto ) break;
      M.compose( pozicio( new THREE.Vector3( 0, sxelaY, 0 ) ), Qtrunko,
        new THREE.Vector3( 1, sxelaAlto, 1 ) );
      sxeloj.setMatrixAt( si, M );
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
  sceno.add( trunkoj, folioj, sxeloj );
  return trunkoj;
}

// konstruiHerbon — Metu instancigitajn herberojn en la arbaron.
export function konstruiHerbon( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  const hazardaGenerilo = mulberry32(44261);
  const herbaTeksajxo = kreiHerbErinanTeksajxon();

  const fa = new THREE.PlaneGeometry( 0o5/0o10, 0o10/0o10 ).translate( 0, 0o4/0o10, 0 );
  const fb = fa.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI / 2 ));
  const merged = kunfandiDuGeometriojn( fa, fb );
  const herbaMaterialo = new THREE.MeshStandardMaterial({ map: herbaTeksajxo, alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 1 });
  const herboj = new THREE.InstancedMesh( merged, herbaMaterialo, kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitaj: [ number, number ][] = [];
  let hi = 0;
  let gardilo = 0;

  while ( hi < kvanto && gardilo++ < 0o5670 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    const radiuso = 0o20 + 0o177 * Math.sqrt( hazardaGenerilo() );
    const x = Math.sin( angulo ) * radiuso;
    const z = Math.cos( angulo ) * radiuso;
    if ( Math.abs( x ) > 0o250 || Math.abs( z ) > 0o250 ) continue;
    if ( excludeRivers( x, z )) continue;
    if ( excludePaths( x, z, 2 )) continue;
    if ( excludeBuildings( x, z, 2 )) continue;
    if ( Math.hypot( x, z ) < 0o16 ) continue;
    // Eta interspaco — la herboj kresku kiel tufoj, ne kiel solida tapiŝo.
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot( x - px, z - pz ) < 0o12/0o10 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

    const skalo = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
    Q.setFromEuler( E );
    M.compose( new THREE.Vector3( x, heightFn( x, z ), z ), Q, new THREE.Vector3( skalo, skalo, skalo ));
    herboj.setMatrixAt( hi++, M );
    metitaj.push( [ x, z ] );
  }

  herboj.count = hi;
  herboj.instanceMatrix.needsUpdate = true;
  sceno.add( herboj );
}

// konstruiMusxajnMontetojn — Metu musko montetojn proksime al arboj.
export function konstruiMusxajnMontetojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  const hazardaGenerilo = mulberry32(66173);
  const muskaGeometrio = new THREE.SphereGeometry( 1, 6, 5 );
  const muskaMaterialo = new THREE.MeshStandardMaterial({ roughness: 1, color: 0x385038 });
  const muskoj = new THREE.InstancedMesh( muskaGeometrio, muskaMaterialo, kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitaj: [ number, number ][] = [];
  let mi = 0;
  let gardilo = 0;

  while ( mi < kvanto && gardilo++ < 0o3720 ) {
    let x: number, z: number;
    if ( hazardaGenerilo() < 0o26/0o40 && nearTrees.length ) {
      const t = nearTrees[( hazardaGenerilo() * nearTrees.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 3;
      x = t.x + Math.sin( a ) * hazardaRadiuso;
      z = t.z + Math.cos( a ) * hazardaRadiuso;
    } else {
      const a = hazardaGenerilo() * Math.PI * 2;
      const r = 0o22 + hazardaGenerilo() * 0o166;
      x = Math.cos( a ) * r;
      z = Math.sin( a ) * r;
    }
    if ( excludeRivers( x, z ) || excludePaths( x, z, 0o2 )) continue;
    if ( Math.hypot( x, z ) < 0o20 ) continue;
    // Eta interspaco — la musko montetoj restu apartaj, ne kunfanditaj.
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot( x - px, z - pz ) < 0o2 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

    const skalo = 0o3/0o10 + hazardaGenerilo() * 0o5/0o10;
    M.compose( new THREE.Vector3( x, heightFn( x, z ) + skalo * 0o2/0o10, z ),
      Q.identity(),
      new THREE.Vector3( skalo, skalo * 0o3/0o10, skalo ));
    muskoj.setMatrixAt( mi++, M );
    metitaj.push( [ x, z ] );
  }

  muskoj.count = mi;
  muskoj.instanceMatrix.needsUpdate = true;
  sceno.add( muskoj );
}

// konstruiFalintajnTrunkojn — Metu falintajn arbtrunkojn en la arbaron.
export function konstruiFalintajnTrunkojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  nearTrees: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  const hazardaGenerilo = mulberry32(22931);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const trunkaGeometrio = new THREE.CylinderGeometry( 0o3/0o10, 0o4/0o10, 1, 7, 1 );
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, roughness: 0o67/0o100 });
  const trunkoj = new THREE.InstancedMesh( trunkaGeometrio, trunkaMaterialo, kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitaj: [ number, number ][] = [];
  let ti = 0;
  let gardilo = 0;

  while ( ti < kvanto && gardilo++ < 0o3720 ) {
    let x: number, z: number;
    if ( hazardaGenerilo() < 0o26/0o40 && nearTrees.length ) {
      const t = nearTrees[( hazardaGenerilo() * nearTrees.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      const hazardaRadiuso = 1 + hazardaGenerilo() * 4;
      x = t.x + Math.sin( a ) * hazardaRadiuso;
      z = t.z + Math.cos( a ) * hazardaRadiuso;
    } else {
      const a = hazardaGenerilo() * Math.PI * 2;
      const r = 0o30 + hazardaGenerilo() * 0o160;
      x = Math.cos( a ) * r;
      z = Math.sin( a ) * r;
    }
    if ( excludeRivers( x, z ) || excludePaths( x, z, 0o3 )) continue;
    if ( Math.hypot( x, z ) < 0o24 ) continue;
    // Eta interspaco — la falintaj trunkoj ne kuŝu krucigitaj sur la grundo.
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot( x - px, z - pz ) < 0o3 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

    const longo = 0o12/0o10 + hazardaGenerilo() * 0o22/0o10;
    E.set( 0, hazardaGenerilo() * Math.PI * 2, Math.PI / 2 + ( hazardaGenerilo() - 0o4/0o10 ) * 0o4/0o10 );
    Q.setFromEuler( E );
    M.compose( new THREE.Vector3( x, heightFn( x, z ) + 0o4/0o10, z ), Q, new THREE.Vector3( 1, longo, 1 ));
    trunkoj.setMatrixAt( ti++, M );
    metitaj.push( [ x, z ] );
  }

  trunkoj.count = ti;
  trunkoj.instanceMatrix.needsUpdate = true;
  trunkoj.castShadow = true;
  sceno.add( trunkoj );
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
function kreiRibitanSegmenton( rMalsupra: number, rSupra: number, alto: number,
  flankoj: number, kresta: number ): THREE.BufferGeometry {
  const ringo = flankoj * 2;   // krestoj kaj valoj alternas
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let k = 0; k < ringo; k++ ) {
    const ang = k / ringo * Math.PI * 2;
    const faktoro = ( k % 2 === 0 ) ? 1 : ( 1 - kresta );
    pozicioj.push( Math.cos( ang ) * rMalsupra * faktoro, 0, Math.sin( ang ) * rMalsupra * faktoro );
    uvoj.push( k / ringo, 0 );
    pozicioj.push( Math.cos( ang ) * rSupra * faktoro, alto, Math.sin( ang ) * rSupra * faktoro );
    uvoj.push( k / ringo, 1 );
  }
  for ( let k = 0; k < ringo; k++ ) {
    const a = k * 2, b = k * 2 + 1;
    const c = (( k + 1 ) % ringo ) * 2, d = c + 1;
    indeksoj.push( a, b, c, b, d, c );
  }
  const cM = ringo * 2, cS = cM + 1;
  pozicioj.push( 0, 0, 0 ); uvoj.push( 0o1/0o2, 0 );
  pozicioj.push( 0, alto, 0 ); uvoj.push( 0o1/0o2, 1 );
  for ( let k = 0; k < ringo; k++ ) {
    const a = k * 2, b = (( k + 1 ) % ringo ) * 2;
    indeksoj.push( a, b, cM );          // malsupra ĉapo, normalo −y
    indeksoj.push( a + 1, cS, b + 1 );  // supra ĉapo, normalo +y
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute( "position", new THREE.Float32BufferAttribute( pozicioj, 3 ) );
  geometrio.setAttribute( "uv", new THREE.Float32BufferAttribute( uvoj, 2 ) );
  geometrio.setIndex( indeksoj );
  geometrio.computeVertexNormals();
  return geometrio;
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
function konstruiKanGeometrion( nodoj: number, kunBrancetoj: boolean, kunStrobilo: boolean ): THREE.BufferGeometry {
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
    const r1 = rBazo - ( rBazo - rSupro ) * (( i + 1 ) / nodoj );
    // Kana segmento — la stel-forma sekco montras la ripojn de la tigo.
    partoj.push( kreiRibitanSegmenton( r0, r1, segmentaAlto, flankoj, kresta ).translate( 0, y0, 0 ) );
    // Ŝirma kolumeto ĉe la nodo — la karakteriza kana artiklo, pli larĝa
    // ol la tigo, glata por kontrasti kun la ripoj.
    if ( i > 0 ) {
      const kolumeto = new THREE.CylinderGeometry( r0 * 0o14/0o10, r0 * 0o14/0o10,
        segmentaAlto * 0o3/0o10, flankoj, 1 ).translate( 0, y0, 0 );
      partoj.push( kolumeto );
      if ( kunBrancetoj ) {
        // Kirlo da pendantaj branĉetoj — la botelpura silueto de la granda
        // ĉevalvosto. Pli multaj kaj pli longaj ol antaŭe, pendantaj iomete
        // SUB la horizonto, kaj pli longaj malsupre, pli mallongaj supre
        // ( la natura formo de Equisetum telmateia ).
        const brancetoj = 9;
        const longeco = segmentaAlto * ( 0o14/0o10 - 0o6/0o10 * ( i / nodoj ) );
        for ( let b = 0; b < brancetoj; b++ ) {
          const ang = b / brancetoj * Math.PI * 2;
          const branceto = new THREE.ConeGeometry( 0o12/0o1000, longeco, 4 )
            .translate( 0, longeco / 2, 0 );
          const M = new THREE.Matrix4().makeRotationY( ang );
          // Preskaŭ horizontale, tiam lasu la pinton pendi malsupren.
          M.multiply( new THREE.Matrix4().makeRotationX( Math.PI / 2 + 0o3/0o10 ) );
          // Eta ŝtupo — la branĉetoj ne kuŝu ĉiuj en unu plata ringo.
          M.multiply( new THREE.Matrix4().makeRotationX(( b % 0o3 ) * 0o1/0o20 ) );
          branceto.applyMatrix4( M );
          branceto.translate( 0, y0, 0 );
          partoj.push( branceto );
        }
      } else {
        // Dentetoj — la malgrandaj triangulaj folioj kiuj ĉirkaŭas ĉiun nodon
        // de la skura kano. Ses etaj konusoj starantaj ĉe la kolumeta rando.
        const dentoj = 6;
        for ( let d = 0; d < dentoj; d++ ) {
          const ang = d / dentoj * Math.PI * 2;
          const dento = new THREE.ConeGeometry( 0o15/0o1000, 0o4/0o100, 3 )
            .translate( 0, 0o2/0o100, 0 );
          const M = new THREE.Matrix4().makeRotationY( ang );
          M.multiply( new THREE.Matrix4().makeRotationX( Math.PI / 2 - 0o3/0o10 ) );
          dento.applyMatrix4( M );
          dento.translate( Math.cos( ang ) * r0 * 0o15/0o10, y0, Math.sin( ang ) * r0 * 0o15/0o10 );
          partoj.push( dento );
        }
      }
    }
  }
  if ( kunStrobilo ) {
    // Strobilo — mallonga pedunklo kaj skvama konusa sporujo kun ŝtupetaj
    // skvam-ringoj kaj pinto, multe pli simila al vera ĉevalvosta strobilo
    // ol unu nuda konuso.
    const pedunklo = new THREE.CylinderGeometry( rSupro * 0.8, rSupro * 0.8,
      0o6/0o100, 6 ).translate( 0, 1 + 0o3/0o100, 0 );
    partoj.push( pedunklo );
    const skvamoj = 4;
    for ( let s = 0; s < skvamoj; s++ ) {
      const rS = 0o1/0o10 * ( 1 - s * 0o2/0o10 );
      const ringo = new THREE.CylinderGeometry( rS * 0.8, rS, 0o3/0o100, 8 )
        .translate( 0, 1 + 0o6/0o100 + s * 0o3/0o100, 0 );
      partoj.push( ringo );
    }
    const pinto = new THREE.ConeGeometry( 0o12/0o1000, 0o5/0o100, 6 )
      .translate( 0, 1 + 0o6/0o100 + skvamoj * 0o3/0o100, 0 );
    partoj.push( pinto );
  } else {
    // Mallonga pinto — la branĉa ĉevalvosto finiĝas per eta pinto anstataŭ
    // plata ĉapo ĉe la pinto de la lasta segmento.
    const pinto = new THREE.ConeGeometry( 0o1/0o100, 0o3/0o100, 6 )
      .translate( 0, 1 + 0o1/0o100, 0 );
    partoj.push( pinto );
  }
  return kunfandiGeometriojnSenIndekson( partoj );
}

// konstruiCetkuanGeometrion — Konstruu la geometrion de unu cetkuo
// ( Equisetum praealtum / ſᶘɔ ɭʃƽɹ ). La alta senbranĉa "skura kano" —
// multaj nodoj kun profundaj ripoj, ŝirmaj kolumetoj, dentetoj kaj skvama
// strobilo ĉe la pinto.
function konstruiCetkuanGeometrion(): THREE.BufferGeometry {
  return konstruiKanGeometrion( 9, false, true );
}

// konstruiCakeanGeometrion — Konstruu la geometrion de unu cakeo
// ( Equisetum telmateia / ſᶘᴜ ſɭɔ ). La granda ĉevalvosto — kana tigo kun
// kirloj da pendantaj branĉetoj ĉe ĉiu nodo, sen strobilo.
function konstruiCakeanGeometrion(): THREE.BufferGeometry {
  return konstruiKanGeometrion( 6, true, false );
}

// instanciiKavalerbojn — Komuna instancigilo por la du kavalerbaj specioj
// ( cetkuo kaj cakeo ). Unu geometrio kaj unu koloro po specio, kaj la loka
// proponilo decidas kie kreski.
//     @param geometrio ( THREE.BufferGeometry ) - La specia geometrio.
//     @param koloro ( number ) - La specia koloro.
//     @param minAlto, maxAlto ( number ) - La specia alta intervalo.
//     @param proponu ( funkcio ) - Proponas kandidatan lokon aŭ null por retry.
function instanciiKavalerbojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  semo: number,
  geometrio: THREE.BufferGeometry,
  koloro: number,
  minAlto: number,
  maxAlto: number,
  proponu: ( h: () => number ) => { x: number; z: number } | null
): void {
  const hazardaGenerilo = mulberry32( semo );
  const materialo = new THREE.MeshStandardMaterial({ roughness: 0o7/0o10, color: koloro });
  const kavalerboj = new THREE.InstancedMesh( geometrio, materialo, kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  let ki = 0;
  let gardilo = 0;

  while ( ki < kvanto && gardilo++ < 0o10000 ) {
    const loko = proponu( hazardaGenerilo );
    if ( !loko ) continue;
    const x = loko.x, z = loko.z;
    const alto = minAlto + hazardaGenerilo() * ( maxAlto - minAlto );
    // Hazarda turno kaj eta klino — la ribaj tigoj ne ĉiuj rigardu samdirekte.
    E.set( 0, hazardaGenerilo() * Math.PI * 2, ( hazardaGenerilo() - 0o4/0o10 ) * 0o4/0o10 );
    Q.setFromEuler( E );
    const y = heightFn( x, z );
    M.compose( new THREE.Vector3( x, y + alto / 2, z ), Q, new THREE.Vector3( 1, alto, 1 ));
    kavalerboj.setMatrixAt( ki, M );
    // Nuanco — ĉiu planto ricevas etan helan/malhelan varianton de la specia
    // koloro, por ke la stando ne aspektu unuforma.
    kavalerboj.setColorAt( ki, C.setHex( koloro ).multiplyScalar( 0.85 + hazardaGenerilo() * 0.2 ) );
    ki++;
  }

  kavalerboj.count = ki;
  kavalerboj.instanceMatrix.needsUpdate = true;
  if ( kavalerboj.instanceColor ) kavalerboj.instanceColor.needsUpdate = true;
  sceno.add( kavalerboj );
}

// konstruiCetkuojn — Metu cetkuojn ( Equisetum praealtum / ſᶘɔ ɭʃƽɹ ), la
// altajn senbranĉajn skurajn kanojn kun strobiloj, proksime al la rivero.
export function konstruiCetkuojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  riverZFn: ( x: number ) => number,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean
): void {
  instanciiKavalerbojn( sceno, kvanto, heightFn, 11593, konstruiCetkuanGeometrion(),
    0x3a6a4a, 0o14/0o10, 0o30/0o10, ( h ) => {
      const angulo = h() * Math.PI * 2;
      const radiuso = 0o20 + 0o177 * Math.sqrt( h() );
      const x = Math.sin( angulo ) * radiuso;
      const z = Math.cos( angulo ) * radiuso;
      if ( Math.abs( x ) > 0o200 || Math.abs( z ) > 0o200 ) return null;
      // Nur proksime al rivero
      if ( Math.abs( z - riverZFn( x )) > 0o12 ) return null;
      if ( excludeBuildings( x, z, 3 ) || excludePaths( x, z, 0o2 )) return null;
      if ( Math.hypot( x, z ) < 0o16 ) return null;
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
export function metiArbojnCxirkauLagon( heightFn: (x: number, z: number) => number,
  kvanto: number,
  cx: number, cz: number,
  radioFn: (ang: number) => number,
  akvoNiveloFn: (x: number, z: number) => number,
  excludeRivers: (x: number, z: number) => boolean,
  excludePaths: (x: number, z: number, minDistanco: number) => boolean,
  excludeBuildings: (x: number, z: number, minDistanco: number) => boolean,
  semo = 0o53117,
  evituArbojn: ArboMetado[] = [],
  minimumaDistanco = 0o10,
  kronaRadiuso: ( s: number ) => number = kronaRadiusoBetula
): ArboMetado[] {
  const hazardaGenerilo = mulberry32( semo );
  const placed: ArboMetado[] = [];
  let provoj = 0;

  const bonaLoko = (x: number, z: number, s: number): boolean => {
    if (excludeRivers(x, z)) return false;
    if (excludePaths(x, z, 0o44/0o10)) return false;
    if (excludeBuildings(x, z, 3)) return false;
    // Nur seka bordo — la rivera kavo oriente de la lago restas sen arboj.
    if (heightFn(x, z) < akvoNiveloFn(x, z)) return false;
    const kandidataR = kronaRadiuso( s );
    for ( const arbo of [ ...evituArbojn, ...placed ] ) {
      if ( Math.hypot( x - arbo.x, z - arbo.z ) <
        interspaco( minimumaDistanco, arbo.r ?? kronaRadiusoBetula( arbo.s ), kandidataR ) ) return false;
    }
    return true;
  };

  while ( placed.length < kvanto && provoj++ < 0o3720 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    // Ringo de la lagrando ( +6 ) ĝis ~38 unuojn ekster ĝi.
    const radiuso = radioFn( angulo ) + 0o6 + hazardaGenerilo() * 0o46;
    const x = cx + Math.cos( angulo ) * radiuso;
    const z = cz + Math.sin( angulo ) * radiuso;
    // Restu sur la grundo — la fora lagbordo atingas la montopiedojn.
    if ( Math.abs( x ) > 0o450 || Math.abs( z ) > 0o450 ) continue;
    const s = 0o63/0o100 + hazardaGenerilo() * 0o55/0o100;
    if ( !bonaLoko( x, z, s ) ) continue;
    placed.push( { x, z, h: heightFn( x, z ), s, r: kronaRadiuso( s ) } );
  }
  return placed;
}

// konstruiHerbonCxirkauLagon — Metu herberojn en ringo ĉirkaŭ la lago, sur la
// sekaj bordoj ekster la lagrando — densa herba rando ĉirkaŭ la akvo.
export function konstruiHerbonCxirkauLagon( sceno: THREE.Scene,
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
  const hazardaGenerilo = mulberry32( semo );
  const herbaTeksajxo = kreiHerbErinanTeksajxon();

  const fa = new THREE.PlaneGeometry( 0o5/0o10, 0o10/0o10 ).translate( 0, 0o4/0o10, 0 );
  const fb = fa.clone().applyMatrix4( new THREE.Matrix4().makeRotationY( Math.PI / 2 ));
  const merged = kunfandiDuGeometriojn( fa, fb );
  const herbaMaterialo = new THREE.MeshStandardMaterial({ map: herbaTeksajxo, alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 1 });
  const herboj = new THREE.InstancedMesh( merged, herbaMaterialo, kvanto );

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitaj: [ number, number ][] = [];
  let hi = 0;
  let gardilo = 0;

  while ( hi < kvanto && gardilo++ < 0o5670 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    // Ringo de la lagrando ĝis ~40 unuojn ekster ĝi.
    const radiuso = radioFn( angulo ) + hazardaGenerilo() * 0o50;
    const x = cx + Math.cos( angulo ) * radiuso;
    const z = cz + Math.sin( angulo ) * radiuso;
    if ( Math.abs( x ) > 0o450 || Math.abs( z ) > 0o450 ) continue;
    if ( excludeRivers( x, z ) || excludePaths( x, z, 2 ) || excludeBuildings( x, z, 2 )) continue;
    if ( heightFn( x, z ) < akvoNiveloFn( x, z )) continue;
    // Eta interspaco — la herboj kresku kiel tufoj, ne kiel solida tapiŝo.
    let troProksima = false;
    for ( const [ px, pz ] of metitaj ) {
      if ( Math.hypot( x - px, z - pz ) < 0o12/0o10 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;

    const skalo = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set( 0, hazardaGenerilo() * Math.PI * 2, 0 );
    Q.setFromEuler( E );
    M.compose( new THREE.Vector3( x, heightFn( x, z ), z ), Q, new THREE.Vector3( skalo, skalo, skalo ));
    herboj.setMatrixAt( hi++, M );
    metitaj.push( [ x, z ] );
  }

  herboj.count = hi;
  herboj.instanceMatrix.needsUpdate = true;
  sceno.add( herboj );
}

// konstruiCakeojn — Metu cakeojn ( Equisetum telmateia / ſᶘᴜ ſɭɔ ), la
// grandajn branĉet-kirlajn ĉevalvostojn, en maldika ringo ĉe la lagrando —
// kareksa rando ĝuste ĉe la akvo, kie la bordo estas malseka ( ne pli ol
// ~2 unuojn super la akvonivelo ).
export function konstruiCakeojn( sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoNiveloFn: ( x: number, z: number ) => number,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 11605
): void {
  instanciiKavalerbojn( sceno, kvanto, heightFn, semo, konstruiCakeanGeometrion(),
    0x50a860, 0o12/0o10, 0o24/0o10, ( h ) => {
      const angulo = h() * Math.PI * 2;
      // Maldika bendo ĝis ~10 unuojn ekster la lagrando.
      const radiuso = radioFn( angulo ) + h() * 0o12;
      const x = cx + Math.cos( angulo ) * radiuso;
      const z = cz + Math.sin( angulo ) * radiuso;
      if ( Math.abs( x ) > 0o450 || Math.abs( z ) > 0o450 ) return null;
      if ( excludeBuildings( x, z, 3 ) || excludePaths( x, z, 0o2 )) return null;
      // Kareksoj kreskas sur la malseka bordo, ne sur la alta seka tero.
      if ( heightFn( x, z ) > akvoNiveloFn( x, z ) + 2 ) return null;
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
function konstruiKurbanLaktukanFolion( kurbeco = 2, largxeco = 6/5, dikeco = 0o3/0o40 ): THREE.BufferGeometry {
  // Pli longa klingo — la folioj branĉiĝas pli eksteren.
  const longo = 0o5/0o2;
  const segmentoj = 0o14;
  const largxoj = 7;
  const geometrio = new THREE.PlaneGeometry( largxeco, longo, largxoj, segmentoj );
  const pozicioj = geometrio.attributes.position;
  const vicoj = segmentoj + 1;
  const paso = longo / segmentoj;
  // Integrita kurbeco — ĉiu vico faldiĝas je la kreskanta angulo. Akumulu
  // la tangentajn ( cos, sin ) paŝojn anstataŭ turni la tutan longon.
  const vicoY = new Float32Array( vicoj );
  const vicoZ = new Float32Array( vicoj );
  const suboj = 0o10;
  for ( let j = 1; j < vicoj; j++ ) {
    const s0 = ( j - 1 ) * paso;
    const s1 = j * paso;
    let dy = 0, dz = 0;
    for ( let k = 1; k <= suboj; k++ ) {
      const u = s0 + ( s1 - s0 ) * ( k - 0o1/0o2 ) / suboj;
      const angulo = Math.pow( u / longo, 2 ) * kurbeco;
      dy += Math.cos( angulo ) * paso / suboj;
      dz += Math.sin( angulo ) * paso / suboj;
    }
    vicoY[j] = vicoY[j - 1] + dy;
    vicoZ[j] = vicoZ[j - 1] + dz;
  }
  for ( let i = 0; i < pozicioj.count; i++ ) {
    const x = pozicioj.getX( i );
    const y = pozicioj.getY( i );
    const j = Math.round( ( ( y + longo / 2 ) / longo ) * segmentoj );
    const t = j / segmentoj;
    // La profilo estas glata elipso — mallarĝa ĉe la bazo kaj pinto, plej
    // larĝa meze — do la flankoj ne pikas. Eta baza amplekso tenas la folion
    // sur la trunko, kiel etendo de la ŝeloj.
    const profilo = Math.sin( Math.PI * t ) + 0o1/0o10 * Math.pow( 1 - t, 4 );
    const novaX = x * profilo;
    pozicioj.setXYZ( i, novaX, vicoY[j], vicoZ[j] );
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
      const nx = normoj.getX( i ) * dikeco / 2;
      const ny = normoj.getY( i ) * dikeco / 2;
      const nz = normoj.getZ( i ) * dikeco / 2;
      frontoPozicioj.setXYZ( i, frontoPozicioj.getX( i ) + nx, frontoPozicioj.getY( i ) + ny, frontoPozicioj.getZ( i ) + nz );
      dorsoPozicioj.setXYZ( i, dorsoPozicioj.getX( i ) - nx, dorsoPozicioj.getY( i ) - ny, dorsoPozicioj.getZ( i ) - nz );
      // La dorsa tavolo rigardas malsupren — turnu ĝiajn normojn, por ke
      // la suba flanko lumiĝu ĝuste ankaŭ sen DoubleSide.
      dorsoNormoj.setXYZ( i, -normoj.getX( i ), -normoj.getY( i ), -normoj.getZ( i ) );
    }
    return kunfandiDuGeometriojn( geometrio, dorso );
  }

// kreiKlinoQuaternionon — Klinu arbon hazarde por rompi la vertikalan silueton.
// Unue turnu ĝin ĉirkaŭ la vertikalo ( yaw ), poste klinu laŭ hazarda direkto.
// La klina angulo varias de 0 ĝis plenaKlinangulo, ĉar la hazarda faktoro
// havas gamon de −0o4/0o10 ĝis +0o4/0o10.
//     @param hazardaGenerilo ( funkcio ) - Hazarda nombra generilo.
//     @param plenaKlinangulo ( number ) - Maksimuma klina angulo en radianoj.
//     @param yaw ( number ) - Turniĝo ĉirkaŭ la vertikalo.
//     @returns kvaropo ( THREE.Quaternion ) - La kombinita klino.
function kreiKlinoQuaternionon( hazardaGenerilo: () => number, plenaKlinangulo: number, yaw: number ): THREE.Quaternion {
  const turno = new THREE.Quaternion().setFromEuler( new THREE.Euler( 0, yaw, 0 ) );
  const direkto = hazardaGenerilo() * Math.PI * 2;
  const angulo = ( hazardaGenerilo() - 0o4/0o10 ) * plenaKlinangulo;
  const klino = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3( Math.sin( direkto ), 0, Math.cos( direkto ) ), angulo );
  return klino.multiply( turno );
}

// kreiPoziciilon — Kreu funkcion kiu turnas lokan punkton per la klino kaj
// aldonas la bazon, por ke krono-buleoj restu sur la klinita trunko.
//     @param bazo ( THREE.Vector3 ) - La trunka bazo sur la grundo.
//     @param Q ( THREE.Quaternion ) - La trunka klino.
//     @returns pozicio ( funkcio ) - Lokalo al mondo.
function kreiPoziciilon( bazo: THREE.Vector3, Q: THREE.Quaternion ): ( lokala: THREE.Vector3 ) => THREE.Vector3 {
  return ( lokala ) => bazo.clone().add( lokala.clone().applyQuaternion( Q ) );
}

// hazardaKoloro — Elektu hazardan koloron el paletro kun eta hela variado.
//     @param hazardaGenerilo ( funkcio ) - Hazarda nombra generilo.
//     @param koloro ( THREE.Color ) - Reuzebla koloro por la eligo.
//     @param paletro ( number[] ) - Koloroj por la foliaro.
//     @returns koloro ( THREE.Color ) - La elektita koloro.
function hazardaKoloro( hazardaGenerilo: () => number, koloro: THREE.Color, paletro: number[] ): THREE.Color {
  koloro.setHex( paletro[ ( hazardaGenerilo() * paletro.length ) | 0 ] );
  koloro.offsetHSL( 0, 0, ( hazardaGenerilo() - 0o4/0o10 ) * 0o1/0o10 );
  return koloro;
}

function mulberry32(semo: number): () => number {
  // La vegetajxa modulo uzas sian propran pliigon por konservi la ekzaktan
  // seman sekvencon de la plantoj — ŝanĝi ĝin movus ĉiun arbon en la mondo.
  return kreiHazardanGenerilon( semo, 0x682878F5 );
}


