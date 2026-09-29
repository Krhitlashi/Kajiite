// ≺⧼ La gazono 🟩 ⧽≻
// La kontinua tapiŝo de malalta herbo super la tuta mondo — la agordo ( la
// ĉelo, la tabulo, la limoj, la biomaj koloroj ), la determinisma haketo
// ( herbaHasho ), la geometrio de unu makulo ( konstruiHerbanTavolanGeometrion )
// kaj la konstruilo ( konstruiHerbanTavolon ), kiu disdividas la mondon en
// malgrandajn tabulojn kaj registras ilin por la per-kadra vidlimo ( vento.ts ).
import * as THREE from "three";
import { kreiHerbanTavolanKlinganTeksajxon } from "../../../komunajxoj/teksajxoj/tavola-klinga-herbo.js";
import { terenaKoloroEn } from "../../../komunajxoj/terenkoloroj.js";
import { kunfandiGeometriojnSenIndekson } from "../../../komunajxoj/kunfandajxoj.js";
import { kreiVegetajxanHazardon } from "../hazardoj.js";
import { biomo, akvaNivelo, SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO,
  type Biomo } from "../../../../kantaoj/mondo/tereno.js";
import { kreiHerbanKlingon } from "./klingoj.js";
import { kreiHerbanMaterialon, herbajTavoloj } from "./vento.js";

// ⟪ La herba tavolo 📃 ⟫ — La malalta herbo de la TUTA mondo.
// La herbo sidas senmove sur la tero ( ĝi ne sekvas la ludanton ), do la mapo
// aspektas sama ie ajn oni iras kaj neniu makulo movigxas kun la fotilo. La
// prezo de tio estas la GRANDO. La mondo estas 0o600 · 0o600 unuoj ( 0o2000² )
// kaj la gresaj biomoj kovras 0o10000² proksimume, do ĉiu dua unuo postulas
// pli ol cent mil makulojn. Tion la memoro eltenas, sed ne unu solan
// InstancedMesh — ĝia limiga sfero estus la tuta mondo, do la GPU traktus ĉiun
// makulon ĉiukadre, ankaŭ tiujn malantaŭ la ludanto.
//   · La TAVOLOJ — la mondo dividigxas en malgrandajn tabulojn ( HERBA_TABELO )
//     kaj ĉiu tabulo estas propra InstancedMesh kun propra limiga sfero. Nur la
//     tabuloj apud la ludanto desegniĝas; ekster la fada distanco la vidlimo
//     forigas ilin tute antaŭ ol ili atingas la GPU-on.
//   · La FADO — la materialo malgrandigas la makulon al ĝia bazo ĉe la limo
//     ( kreiHerbanMaterialon ), do la herbo solvigxas en la grundon anstataŭ
//     aperi kaj malaperi kun duro rando.
//     @param sceno ( THREE.Scene ) - La sceno.
//     @param jesi ( funkcio ) - La cedilo inter la tabuloj, por ke la ŝarĝo
//         ne frostigu la paĝon dum dudek mil makuloj kalkuligxas.
//     @param heightFn ( funkcio ) - Tera alta funkcio.
//     @param excludeRivers, excludePaths, excludeBuildings ( funkcio ) - La
//         samaj ekskludoj kiel la cetera vegetajxo ( urbo.ts ).
//     @param biomojFiltro ( Biomo[] = undefined , nedeviga ) - La biomoj kie la
//         herbo kreskas ( la valo kaj la ebenaĵo ).
//     @param denso ( number = 1 , nedeviga ) - La proporcio de la ĉeloj kiuj
//         ricevas makulon ( 1 = ĉiu ĉelo ). La malfortaj aparatoj ricevas malpli.
// HerbaTufo — unu makulo de la kontinua tavolo. La koloron de la makulo
// determinas ĝia terena pozicio ( deklivo, alto, akvo ) kaj ĝia biomo — vidu la
// kolor-buklon de konstruiHerbanTavolon.
export interface HerbaTufo {
  x: number; z: number; y: number;
  sx: number; sy: number; sz: number;
  q: THREE.Quaternion;
  nuanco: number;
  deklivo: number;   // |∇h| — la deklivo de la tereno ( por la terena koloro )
  biomo: Biomo;      // la biomo de la pentrita tavolo ( por la biomaj parametroj )
  varianto: number;  // la geometria aranĝo de la makulo ( vidu HERBA_TAVOLAJ_VARIANTOJ )
}

// ⟨ La ĉelo kaj la tabulo 📃 ⟩ — la ĉela grandeco estas la interspaco de la
// makuloj. Ĝi dividas la tabulon SEN resto ( 16 / 2 = 8 ĉeloj ), do la kradoj
// de la tabuloj kaj de la ĉeloj koincidas kaj neniu makulo estas metata dufoje.
const HERBA_CXELO = 0o2;      // 2 — la interspaco de la makuloj
// La nomo de ĉiu herba tabulo. La bakado de la mapo ( bakiMapon ) serĉas gxin
// por kaŝi la herbon — la malalta herbo estas preskaŭ unu pikselo sur la 2D-mapo
// ( 0o3/0o10 unuoj en mondo de 0o1400 ), sed ĝi estas cent mil instancoj.
export const HERBA_TAVOLA_NOMO = "herbaTavolo";
const HERBA_TABELO = 0o20;    // 16 — la tabula grandeco ( mondunuoj )
// HERBA_JITERO — la duon-amplitudo de la hazarda delokigo de ĉiu makulo
// ( ± 0.375 ). La makuloj sidas preskaŭ sur la krado: pli granda delokigo lasus
// du najbarojn ĝis tri unuojn aparte kaj la diskoj de la klingoj ( radiuso
// 1.35 — pli ol la duona interspaco ) ne plu surrenversiĝus, do la grundo
// aperus en la interspacoj.
const HERBA_JITERO = 0o6/0o20;   // 0.375
// HERBA_LIMO — la vidlima distanco de ĉiu tabulo. La limigo mezuriĝas de la
// RANDO de la tabulo ( la vidlimo aldonas la propran radiuson ), do la plej
// proksima makulo de la tabulo estas je HERBA_LIMO unuoj de la fotilo kiam la
// tabulo malaperas.
const HERBA_LIMO = 0o60;      // 48
// HERBA_FADO — la distanco kie la makulo plene malgrandigxas al sia bazo.
// ⟨ Egala al la limo 📃 ⟩ — la fado devas FINIĜI guste tie, kie la tabuloj
// malaperas. Kun HERBA_FADO malpli granda ol HERBA_LIMO ( 40 antaŭe ) la herbo
// estis ankoraŭ plenaalte je la limo kaj malaperis kun dura rando; kun pli
// granda ĝi solviĝus en la grundon jam antaŭ ol la tabulo forirus ( videbla
// nuda ringo). Kun la egala valoro la herbo dikiĝas ekde 36 unuoj kaj estas
// nulo ĝuste kiam la tabulo ( kaj ĝiaj klingoj ) foriras.
const HERBA_FADO = HERBA_LIMO;   // 48

// ⟪ La klingoj de la kontinua gazono 📃 ⟫ — la fajneco kaj la pufeco de la
// malalta tapiŝo. Unu makulo estas AKSOJ × AKSOJ klingoj sur sia kvadrata
// flanko ( 2.3 ) kaj ĉiu klingo portas SEGMENTOJN da kurbaj segmentoj. Pli da
// klingoj donas pli densan, pli pufan gazonon — sed ankaŭ pli da trianguloj,
// kaj la makuloj apud la ludanto estas la plej granda parto de la bildigata
// mondo ( ĉirkaŭ 3000 makuloj × la klingoj ). Ĉi tiuj du nombroj estas la unuaj
// kiujn oni turnu por la rendimento.
// ⟨ Tri segmentoj 📃 ⟩ — la klingoj de la gazono estas mallongaj ( 0o6/0o20 =
// 0.375 ), do tri segmentoj jam donas glatan arkon; la kvara aldonus 33% da
// trianguloj por preskaŭ nenion videblan. La pufon portas la DENSEco kaj la
// larĝo, ne la segmentoj.
// ⟨ Pli densa 📃 ⟩ — 0o13 ( 11 ) klingoj po akso ( 121 po makulo ) anstataŭ 9
// ( 81 ). Vidate de la okulo la gazono estas la malproksimaĵo de la piedoj, do
// la interspaco de la klingoj estas tio, kion oni vidas — 0.209 unuoj anstataŭ
// 0.256. La kosto estas 50% pli da trianguloj ( 1452 po makulo ), sed la pufon
// kaj la densecon oni povas aĉeti nur per trianguloj; la mezuroj estas en la
// raporto de la ago.
const HERBA_TAVOLA_AKSOJ = 0o13;      // 11 klingoj po akso ( 121 po makulo )
const HERBA_TAVOLA_SEGMENTOJ = 0o3;   // 3 segmentoj po klingo ( 12 trianguloj )
// ⟪ La variantoj de la aranĝo 📃 ⟫ — la klingoj de la gazono venas el unu
// komuna geometrio, do sen tio la SAMA aranĝo ripetiĝus en ĉiu makulo de la
// mondo ( nur turnita ) kaj la okulo tuj rekonus la tufon. Tri semoj ( kun
// iomete malsamaj longoj kaj denseco ) disigas tiun ripeton; la makulo elektas
// sian varianton per sia propra haketo ( vidu kalkuliTufon ).
const HERBA_TAVOLAJ_VARIANTOJ = 0o3;

// ⟪ La biomaj kolor-parametroj de la herbo 🎨 ⟫ — la malalta herbo prenas sian
// koloron de la TERENA paletro ( terenkoloroj.ts, per terenaKoloroEn ), do ĝi
// havas la saman tonon kiel la grundo sub ĝi, kaj la roko, la neĝo kaj la
// akvoborda tavolo transiras sur la herbon kune kun la tereno. SUPER tio ĉi tiu
// tabelo multobligas la koloron per la BIOMO de la pentrita biomo-tavolo
// ( tereno.ts — biomo() ). La valoroj estas multiplikiloj po kanalo:
//   · malpli ol 1 en kanalo — tiu kanalo Malheliĝas ( ekz. b: 0.8 donas pli
//     sekan, flavetan herbon ),
//   · pli ol 1 — tiu kanalo Heliĝas.
// Biomoj malĉeestaj en la tabelo uzas la blankan multiplikilon ( 1, 1, 1 ).
// Por ŝanĝi la herbon de unu biomo, ŝanĝu ĝian vicon ĉi tie:
//   HERBA_BIOMAJ_KOLOROJ.ebenaĵo = [ 0o11/0o10, 0o1, 0o7/0o10 ];   // pli seka
// La du unuaj biomoj estas la solaj kie la herbo nun kreskas ( la filtrilo de
// konstruiHerbanTavolon ); la ceteraj pretas por la estonteco.
export const HERBA_BIOMAJ_KOLOROJ:
  Partial<Record<Biomo, readonly [ number, number, number ]>> = {
    "valo": [ 0o1, 0o1, 0o1 ],                  // la arbarvalo — la terena tono mem
    "ebenaĵo": [ 0o1, 0o1, 0o4/0o5 ],           // la ebenaĵo — pli seka ( malpli da bluo )
    "montaro": [ 0o17/0o20, 0o1, 0o1 ],         // la montaro — pli malvarma ( malpli da ruĝo )
    "akvaj-plantoj": [ 0o17/0o20, 0o1, 0o4/0o5 ], // la marĉoj — malsekaj kaj malhelaj
    "ekvizeto": [ 0o17/0o20, 0o1, 0o17/0o20 ],  // la ekvizetaj kampoj
  };

// La blanka multiplikilo — la defaŭlto por la biomoj sen parametroj.
const HERBA_BLANKA_KOLORO = new THREE.Color(0o1, 0o1, 0o1);

// HERBA_MALHELIGO — kiom la gazono restas sub la hel-nuanco de la makulo. La
// koloro de la gazono estas la TERENA koloro kun la kromeo konservita, sed kun la
// heleco anstataŭigita per la nuanco de la makulo ( 0.875 ĝis 0.975 ) — kaj tiu estas
// MULTE pli hela ol la terena paletro. Ĉi tiu multiplikilo tiras la gazonon
// malsupren al la grundo, dum la terena paletro iris iomete supren al la herbo
// ( vidu HERBO_A kaj HERBO_B en terenkoloroj.ts ) — la du tavoloj renkontiĝas
// meze, anstataŭ ke la gazono brilu kiel aparta, pli hela tavolo. 1 = la malnova,
// pli hela gazono.
const HERBA_MALHELIGO = 0o6/0o10;   // 0.75

// herbaHasho — Determinisma hazarda valoro en [ 0, 1 ) por unu ĉelo. La sama
// ĉelo donas ĉiam la saman valoron, do la lokoj ne ŝanĝiĝas kiam la kampo
// refariĝas — la herbo ne saltas dum irado.
function herbaHasho(ix: number, iz: number): number {
  let h = Math.imul(ix, 0x27d4eb2d) ^ Math.imul(iz, 0x165667b1);
  h = Math.imul(h ^ ( h >>> 0o15 ), 0x2545f491);
  return ( ( h ^ ( h >>> 0o13 ) ) >>> 0 ) / 4294967296;
}

export async function konstruiHerbanTavolon(
  sceno: THREE.Scene,
  jesi: () => Promise<void>,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[],
  denso = 0o10/0o10
): Promise<void> {
  // ⟨ La senkolora klingo 📃 ⟩ — la kontinua gazono uzas la GRIZAN klingan
  // teksajxon ( kreiHerbanTavolanKlinganTeksajxon ): la koloron alportas la
  // per-makulaj verticaj koloroj, kiuj venas el la terena paletro malsupre.
  const materialo = kreiHerbanMaterialon(HERBA_FADO, kreiHerbanTavolanKlinganTeksajxon());
  // La tavolo — la klingoj sidas sur krado, kiu plenigas la tutan ĉelon.
  // ⟨ La proporcio de la klingo 📃 ⟩ — la gazono estas densa kampo de klingoj,
  // ne malmultaj folioj: ili estas iom pli dikaj ol la originalaj ( 0o16/0o10 = 1.75 )
  // kaj pli altaj, do la klingo restas greso anstataŭ folio, ĉar la longo kreskis
  // kune kun la larĝo.
  //
  // ⟨ Pli alta gazono 📃 ⟩ — la longo estas 0o11/0o20 ( 0.5625 ) anstataŭ 0o6/0o20
  // ( 0.375 ), kaj la alta-skalo de la makulo restas proksime de 1 ( vidu
  // kalkuliTufon ). La plej alta loko estas nun ĉirkaŭ 0.56 unuojn — ĝis la genuo
  // de plenkreskulo, do la gazono havas korpon sed ĝi ankoraŭ ne kaŝas la figurojn
  // kiuj staras en ĝi. La klingoj leviĝas preskaŭ vertikale ( vidu elen ), do la
  // plia longo montriĝas kiel ALTO, ne kiel sterniĝo.
  //
  // ⟨ La delokigo malgrandiĝas 📃 ⟩ — la jitter ( 0o6/0o100 = 0.09375 ) tenas la
  // klingojn preskaŭ sur la krado, do la gazono estas EGALA kampo anstataŭ kolekto
  // de amasetoj.
  // ⟨ Tri aranĝoj 📃 ⟩ — tri semoj, iomete malsamaj longoj kaj unu malpli densa
  // krado: la makuloj elektas inter ili per haketo ( vidu kalkuliTufon ), do la
  // sama klingaro ne speguligxas tra la kampo. La geometrioj estas malgrandaj kaj
  // KOMUNAJ — la memoro kreskas per tri etaj bufroj, ne per la instancoj.
  const variantoj: THREE.BufferGeometry[] = [
    konstruiHerbanTavolanGeometrion(2.3, HERBA_TAVOLA_AKSOJ,
      0o6/0o100, 0o11/0o20, 0o16/0o10, 0o2715),
    konstruiHerbanTavolanGeometrion(2.3, HERBA_TAVOLA_AKSOJ,
      0o5/0o100, 0o23/0o40, 0o15/0o10, 0o4633),
    konstruiHerbanTavolanGeometrion(2.3, HERBA_TAVOLA_AKSOJ - 1,
      0o7/0o100, 0o21/0o40, 0o14/0o10, 0o6151),
  ];
  // La pentrita mondo — la sama kadro kiun la biomoj mem kovras. La ĉeloj de la
  // krado estas mondaj ( la unua ĉelo de la mondo estas unuaCxelo ), do la sama
  // loko donas la saman makulon, kiu ajn tabulo gxin kalkulas.
  const amplexo = SKULPTA_N * SKULPTA_PASO;
  const cxelojPoTabelo = Math.round(HERBA_TABELO / HERBA_CXELO);
  const tabeloj = Math.ceil(amplexo / HERBA_TABELO);
  const unuaCxelo = Math.round(SKULPTA_ORIGINO[0] / HERBA_CXELO);
  const unuaCxeloZ = Math.round(SKULPTA_ORIGINO[1] / HERBA_CXELO);

  const M = new THREE.Matrix4();
  const P = new THREE.Vector3();
  const S = new THREE.Vector3();
  const C = new THREE.Color();
  const teraKoloro = new THREE.Color();
  const E = new THREE.Euler();
  const Q = new THREE.Quaternion();
  const ena = new THREE.Vector3(), enX = new THREE.Vector3(), enZ = new THREE.Vector3();
  const normalo = new THREE.Vector3();
  const vertikala = new THREE.Vector3(0, 1, 0);
  // La makuloj de unu tabulo — po unu listo por ĉiu geometria varianto, ĉar unu
  // InstancedMesh portas unu geometrion.
  const lokoj: HerbaTufo[][] = variantoj.map(() => []);
  // La biomaj multiplikiloj ( HERBA_BIOMAJ_KOLOROJ ) unufoje kiel Color-oj — la
  // buklo de la makuloj ne konstruu objekton po makulo.
  const biomaKoloro = new Map<Biomo, THREE.Color>();
  for ( const nomo of Object.keys(HERBA_BIOMAJ_KOLOROJ) as Biomo[] ) {
    const rgb = HERBA_BIOMAJ_KOLOROJ[nomo];
    if ( rgb ) biomaKoloro.set(nomo, new THREE.Color(rgb[0], rgb[1], rgb[2]));
  }

  // kalkuliTufon — Ĉu la ĉelo havas makulon, kaj se jes, ĝian pretan pozicion,
  // skalon, pozon kaj hel-nuancon. La biomo, la ekskludoj, la akvo kaj la
  // kruteco decidas. La deklivo ankaŭ kuŝigas la makulon laŭ la tera normalo
  // ( limigita al iom sub kvarono de rekta angulo ), do la herbo sternigxas sur
  // la deklivo anstataŭ trapiki ĝin vertikale.
  const kalkuliTufon = ( ix: number, iz: number ): HerbaTufo | null => {
    if ( herbaHasho(ix, iz) > denso ) return null;
    const x = ( ix + 0o1/0o2 ) * HERBA_CXELO + ( herbaHasho(ix + 0o3, iz) - 0o1/0o2 ) * HERBA_JITERO * 0o2;
    const z = ( iz + 0o1/0o2 ) * HERBA_CXELO + ( herbaHasho(ix, iz + 0o5) - 0o1/0o2 ) * HERBA_JITERO * 0o2;
    // La biomo — ĝi decidas kaj ĉu la herbo kreskas ĉi tie ( la filtrilo ) kaj
    // kian nuancon ĝi ricevos ( HERBA_BIOMAJ_KOLOROJ ).
    const bi = biomo(x, z);
    if ( biomojFiltro && !biomojFiltro.includes(bi) ) return null;
    if ( excludeRivers(x, z) ) return null;
    // La marĝenoj kovras la klingojn mem — la disko de la makulo atingas 1.35
    // unuojn kaj la pintoj de la plej eksteraj klingoj iom pli, do herbo je du
    // unuoj de vojo aŭ konstruajxo neniam eniras ĝin.
    if ( excludePaths(x, z, 0o2) ) return null;
    if ( excludeBuildings(x, z, 0o2) ) return null;
    const y = heightFn(x, z);
    if ( y < akvaNivelo(x, z) + 0o1/0o10 ) return null;

    // ⟨ Du specimenoj por du respondoj 📃 ⟩ — la du najbaraj altoj donas
    // samtempe la KRUTECON ( por forlasi la klifojn ) kaj la NORMALON ( por
    // kuŝigi la makulon sur la deklivo ). Antaŭe aparta kruteca mezurilo kaj la
    // normalo postulis kvar specimenojn; nun du sufiĉas.
    const paso = HERBA_CXELO;
    ena.set(x, y, z);
    enX.set(x + paso, heightFn(x + paso, z), z).sub(ena);
    enZ.set(x, heightFn(x, z + paso), z).sub(ena);
    if ( Math.max(Math.abs(enX.y), Math.abs(enZ.y)) / paso > 0o7/0o10 ) return null;
    // La grandeco de la deklivo — la terena koloro bezonas ĝin ( sur la krutajxo
    // la tereno estas roko, do ankaŭ la herbo tie griziĝas ).
    const deklivo = Math.hypot(enX.y, enZ.y) / paso;
    normalo.crossVectors(enZ, enX).normalize();
    if ( normalo.y < 0 ) normalo.negate();

    // ⟨ La larĝeco restu preskaŭ egala 📃 ⟩ — la makulo devas kovri sian ĉelon
    // ( flanko 2.3 · 0.9 = 2.07 > 2 ), alie malgranda makulo lasus trukon inter
    // siaj najbaroj kaj la tapeto vidigxus kiel kradaĵo. La horizonta vario do
    // restas malgranda, kaj la vidatan varion portas la KLINGOJ mem ( ĉiu klingo
    // havas sian propran longon, klino, larĝon kaj tordon ) kaj iliaj koloroj.
    const sx = 0o11/0o12 + herbaHasho(ix + 0o11, iz) * 0o1/0o4;
    const sz = 0o11/0o12 + herbaHasho(ix, iz + 0o11) * 0o1/0o4;
    // ⟨ La sama alto 📃 ⟩ — la alto de la makulo apenaŭ varias ( 0.875 ĝis 1 ).
    // ⟨ Kial ne pli 📃 ⟩ — la makuloj estas KVARANGOJ de la monda krado, do granda
    // alt-vario desegnis tiujn kvadratojn per malsamaj altoj kaj la gazono
    // montriĝis kiel GRUPOJ da herbo ( antaŭe la vario iris ĝis 1.7× inter la
    // najbaroj, kun la malnova skalo-multobligo ). Nun la alt-vario sidas nur en
    // la klingoj mem, do la makuloj sekvas unu la alian kaj la kampo legiĝas kiel
    // unu egala gazono. Kun la klingo ĝis 0o11/0o20 ( 0.5625 ) la plej alta loko
    // estas ĉirkaŭ 0.56 unuoj — sub la genuo, do ĝi ankoraŭ ne kaŝas la figurojn.
    const sy = 0o7/0o10 + herbaHasho(ix + 0o13, iz + 0o3) * 0o1/0o10;
    const klinLimito = Math.PI / 0o10;
    const horiz = Math.hypot(normalo.x, normalo.z);
    if ( horiz > 0o1/0o2000 && Math.atan2(horiz, Math.max(normalo.y, 0o1/0o2000)) > klinLimito ) {
      const u = Math.tan(klinLimito);
      normalo.set(normalo.x / horiz * u, 1, normalo.z / horiz * u).normalize();
    }
    const q = new THREE.Quaternion().setFromUnitVectors(vertikala, normalo);
    E.set(0, herbaHasho(ix + 0o15, iz + 0o7) * Math.PI * 2, 0);
    q.multiply(Q.setFromEuler(E));

    // ⟨ La varianto de la aranĝo 📃 ⟩ — unu el la tri geometrioj. La haketo
    // uzas aliajn aldonojn ol la pozicio, do la elekto ne rilatas al la loko de
    // la makulo en sia ĉelo.
    const varianto = Math.min(HERBA_TAVOLAJ_VARIANTOJ - 1,
      Math.floor(herbaHasho(ix + 0o21, iz + 0o27) * HERBA_TAVOLAJ_VARIANTOJ));
    // ⟨ La nuanco 📃 ⟩ — 0.875 ĝis 0.975. La amplekso MALGRANDIĜIS ( antaŭe
    // 0.7 ĝis 1.1, do 1.6-obla diferenco inter najbaraj makuloj ): ĉiu makulo
    // estas kvadrato de la monda krado kun UNU koloro, do granda nuanco-vario
    // pentris tiujn kvadratojn kaj la kampo legiĝis kiel mozaiko de grupoj. La
    // malsamecon nun portas la klingoj mem ( ĉiu havas sian propran koloron ).
    return { x, z, y, sx, sy, sz, q, deklivo, biomo: bi, varianto,
      nuanco: 0o17/0o20 + herbaHasho(ix + 0o17, iz + 0o13) * 0o1/0o10 };
  };

  // La tabuloj — unu InstancedMesh po tabulo, plenigita unufoje. La makuloj de
  // tabulo kuŝas ene de ĝia kadro, do ĝia limiga sfero estas malgranda kaj la
  // vidlimo povas forigi ĝin tute. La cedo inter la tabuloj tenas la ŝarĝan
  // stangon movigxanta dum la dekmiloj da makuloj kalkuligxas.
  for ( let tz = 0; tz < tabeloj; tz++ ) {
    for ( let tx = 0; tx < tabeloj; tx++ ) {
      for ( let v = 0; v < lokoj.length; v++ ) lokoj[v].length = 0;
      const unuaX = unuaCxelo + tx * cxelojPoTabelo;
      const unuaZ = unuaCxeloZ + tz * cxelojPoTabelo;
      for ( let iz = 0; iz < cxelojPoTabelo; iz++ ) {
        for ( let ix = 0; ix < cxelojPoTabelo; ix++ ) {
          const tufo = kalkuliTufon(unuaX + ix, unuaZ + iz);
          if ( tufo !== null ) lokoj[tufo.varianto].push(tufo);
        }
      }
      // La tabulo naskas unu meshon po varianto ( nur la variantoj kun makuloj ),
      // do la instancoj de la sama geometrio kunigas — la trianguloj kaj la
      // alvokoj restas la samaj kiel antaŭe, krom unu plia alvoko po varianto.
      for ( let v = 0; v < lokoj.length; v++ ) {
        const tufoj = lokoj[v];
        if ( tufoj.length === 0 ) continue;
        const mesho = new THREE.InstancedMesh(variantoj[v], materialo, tufoj.length);
        for ( let i = 0; i < tufoj.length; i++ ) {
          const tufo = tufoj[i];
          M.compose(P.set(tufo.x, tufo.y, tufo.z), tufo.q, S.set(tufo.sx, tufo.sy, tufo.sz));
          mesho.setMatrixAt(i, M);
          // ⟨ La koloro venas de la TERENO 📃 ⟩ — ĉiu makulo ricevas la koloron
          // de la grundo ĜUSTE sub ĝi ( terenaKoloroEn — la sama funkcio, kiu
          // kolorigas la terenon mem ), do la gazono kaj la grundo havas la saman
          // tonon, la limo inter ili ne plu videblas, kaj la rokaj, neĝaj kaj
          // akvobordaj zonoj transiras sur la herbon kune kun la tereno.
          //
          // La terena paletro estas MALHELA kaj trankvila ( oliva grizo-verdo ),
          // dum la klinga teksajxo jam portas la helon. La koloro do normaliĝas
          // al la hel-nuanco de la makulo ( tufo.nuanco ): la KROMEco ( la huo kaj
          // la saturo ) de la tereno konserviĝas, sed la absoluta malheleco ne —
          // la herbo estas la sama tono, nur pli hela ol la grundo. Fine la bioma
          // parametro ( HERBA_BIOMAJ_KOLOROJ ) multobligas la rezulton.
          const tera = terenaKoloroEn(teraKoloro, tufo.y, tufo.x, tufo.z, tufo.deklivo, akvaNivelo);
          // La heleco de la terena koloro — la malmultekosta takso ( r + 2g + b ) / 4,
          // la sama konvencio kiel la ceteraj kolor-miksoj de la modulo.
          const teraLumo = Math.max(
            ( tera.r + tera.g * 0o2 + tera.b ) * 0o1/0o4, 0o1/0o100 );
          // ⟨ Pli proksime al la tereno 📃 ⟩ — HERBA_MALHELIGO tiras la gazonon
          // malsupren al la terena helo ( kaj la terena paletro iris iomete supren
          // al la herbo — vidu terenkoloroj.ts ), do la du tavoloj renkontiĝas
          // meze anstataŭ ke la gazono brilu kiel aparta, pli hela tavolo.
          C.copy(tera).multiplyScalar(tufo.nuanco * HERBA_MALHELIGO / teraLumo)
            .multiply(biomaKoloro.get(tufo.biomo) ?? HERBA_BLANKA_KOLORO);
          mesho.setColorAt(i, C);
        }
        mesho.instanceMatrix.needsUpdate = true;
        if ( mesho.instanceColor ) mesho.instanceColor.needsUpdate = true;
        mesho.name = HERBA_TAVOLA_NOMO;
        sceno.add(mesho);
        // ⟨ La propra vidlimo 📃 ⟩ — la gazono NE uzas la komunan vidlimon de la
        // sceno ( kiu mezuras de la ludanto aŭ de la orbita celo ), ĉar ĝia fado
        // mezuriĝas de la FOTILO — vidu gxisdatigiHerbon. La limo estas la centro
        // de la tabulo plus duono de ĝia diagonalo ( kaj iom da marĝeno por la
        // klingoj, kiuj etendiĝas preter la ĉelo ), do tabulo malaperas nur kiam
        // ĉiuj ĝiaj klingoj jam malgrandiĝis al la grundo — neniu salto.
        herbajTavoloj.push({
          mesho,
          cx: ( unuaX + cxelojPoTabelo * 0o1/0o2 ) * HERBA_CXELO,
          cz: ( unuaZ + cxelojPoTabelo * 0o1/0o2 ) * HERBA_CXELO,
          limo: HERBA_LIMO + HERBA_TABELO * 0o7/0o10,
        });
      }
    }
    await jesi();
  }
}

// konstruiHerbanTavolanGeometrion — La herba TAVOLO — la makulo de la kampo.
// ⟨ Kial aparta konstruilo 📃 ⟩ — la tufo ( vidu supre ) amasigas ĉiujn klingojn
// en disketon de radiuso 0.17, do la tufoj legiĝas kiel apartaj faskoj kun nuda
// grundo inter ili. La tavolo anstataŭe metras la klingojn sur JUNA krado, kiu
// plenigas la TUTAN ĉelon de la kampo — la makuloj de la najbaraj ĉeloj
// interplektiĝas kiel la kaheloj de planko, sen truoj kaj sen buloj. Tio estas
// la tuta malsamo inter la du herboj: la malnova herbo estas disaj TUFOJ, la
// nova estas kontinua TAPETO.
//
// ⟨ La formo 📃 ⟩ — la klingoj havas la LANCETAN folian profilon
// ( kreiHerbanKlingon ), ili staras preskaŭ VERTIKALE ( vidu elen ) kun mola pinto,
// kaj la krado de la alvokanto restas densa ( HERBA_TAVOLA_AKSOJ ). La gazono
// estas MALALTA kaj EGALA ( vidu la longon ĉe la alvokanto kaj la alt-skalon de
// kalkuliTufon ), do ĝi legiĝas kiel unu vertikala kampo — nek lito de sternitaj
// klingoj nek vicoj da apartaj tufoj — dum la makuloj restas senkudraj.
//     @param flanko ( number = 2.3 ) - La flanko de la kvadrata tavolo ( mondunuoj ).
//         Iom pli granda ol la ĉela interspaco ( HERBA_CXELO = 2 ), do la randoj
//         de la najbaraj makuloj surrenversiĝas anstataŭ lasi kudron.
//     @param akso ( number = 0o10 ) - Kiom da klingoj laŭ unu akso ( la krado
//         estas akso × akso klingoj ). La interspaco estas flanko / akso ≈ 0.29.
//     @param jit ( number = 0.17 ) - La duon-amplitudo de la delokigo de ĉiu
//         klingo en la krado. Sen ĝi la krado vidigxas kiel maŝo — regula krado
//         de plantidoj anstataŭ gazono; kun ĝi la punktoj restas egale densaj
//         sed la okulo ne plu trovas la liniojn.
//     @param longo ( number = 0.4 ) - La maksimuma longo de la klingoj.
//     @param larghaFaktoro ( number = 0o14/0o10 ) - La multobligilo de la klinga
//         larĝo. La malalta gazono bezonas iom pli larĝajn klingojn ol la tufo,
//         sed ne tro — tro larĝaj klingoj legigxas kiel folioj.
//     @param semo ( number = 0o2715 ) - La semo de la aranĝo ( ĉiuj makuloj samas ).
//     @returns geometrio ( THREE.BufferGeometry ) - La tavolo.
function konstruiHerbanTavolanGeometrion(flanko = 2.3, akso = 0o10, jit = 0.17,
  longo = 0.4, larghaFaktoro = 0o14/0o10, semo = 0o2715): THREE.BufferGeometry {
  const hazardo = kreiVegetajxanHazardon(semo);
  const klingoj: THREE.BufferGeometry[] = [];
  const verda = new THREE.Color();
  const seka = new THREE.Color();
  const duono = flanko * 0o1/0o2;
  const pasxo = flanko / akso;
  for ( let iz = 0; iz < akso; iz++ ) {
    for ( let ix = 0; ix < akso; ix++ ) {
      // La loko de la klingo — ĝia krada nodo plus malgranda delokigo.
      const rx = -duono + ( ix + 0o1/0o2 ) * pasxo + ( hazardo() - 0o1/0o2 ) * jit * 0o2;
      const rz = -duono + ( iz + 0o1/0o2 ) * pasxo + ( hazardo() - 0o1/0o2 ) * jit * 0o2;
      const radiko = Math.hypot(rx, rz);
      const disto = Math.min(1, radiko / duono);
      // ⟨ La klingoj staras REKTE 📃 ⟩ — la gazono estas VERTIKALA. La klingoj
      // leviĝas preskaŭ rekte el la tero kaj nur la rando de la makulo kliniĝas
      // iomete eksteren ( ĝis 0o10/0o100 = 0.1875 ), ĝuste por kovri la kudron
      // inter la najbaraj makuloj. Antaŭe la pinto forŝoviĝis ĝis 0.5625 unuojn dum
      // la klingo altas nur 0.42 — la klingoj kuŝis preskaŭ PLATE sur la grundo kaj
      // ĉiu makulo malfermiĝis kiel fontano, do la gazono aspektis sternita kaj
      // la makuloj legiĝis kiel apartaj tufoj. Vertikale la klingo montras sian
      // propran longon anstataŭ sian flankon.
      const elen = 0o6/0o100 + disto * 0o10/0o100;
      const dirx = radiko > 0 ? rx / radiko : 0;
      const dirz = radiko > 0 ? rz / radiko : 0;
      // ⟨ La alt-vario 📃 ⟩ — la klingoj de unu makulo malsamas ( duono ĝis la
      // tuta longo ), do la supro de la gazono estas malebena kaj mola anstataŭ
      // plata; kaj ĉiu klingo sidas pli malpli egale — la malsamo venas de la
      // longo, ne de amasiĝo.
      // ⟨ Sen randa levo 📃 ⟩ — la randoj ne plu estas pli altaj ol la mezo
      // ( antaŭe disto multiplikis la longon ĝis 1.125 ). Tiu levo igis ĉiun
      // makulon proprieta kupolo — vidata de proksime la gazono montriĝis kiel
      // vicoj da apartaj tufoj anstataŭ unu egala kampo.
      const klingoLongo = longo * ( 0o1/0o2 + hazardo() * 0o1/0o2 );
      const klingoLargho = ( 0.026 + hazardo() * 0.016 ) * larghaFaktoro
        * ( 0.9 + klingoLongo * 0.5 );
      // ⟨ La delokigo de la klino 📃 ⟩ — al la malgranda randa klino aldoniĝas
      // MALGRANDA hazarda parto ( 0o6/0o100 ), do la klingoj restas preskaŭ
      // vertikalaj kaj nur iomete diferencas. Granda hazarda parto ( 0.12 antaŭe )
      // disĵetis la klingojn en malegalajn amasetojn — precize la "amasigxo", kiun
      // ni forprenas; la malsameco nun venas de la longo, la larĝo kaj la tordo,
      // ne de hazarda direktado.
      const klino = dirx * elen * ( 0.4 + hazardo() * 0.6 )
        + ( hazardo() - 0o1/0o2 ) * 0o4/0o100;
      const arko = dirz * elen * ( 0.4 + hazardo() * 0.6 )
        + ( hazardo() - 0o1/0o2 ) * 0o4/0o100;
      // ⟨ La tordo 📃 ⟩ — la klingoj estas larĝaj, do ilia ORIENTIĜO gravas: sen
      // tordo ĉiuj larĝaj flankoj turnigxus samdirekten kaj la kampo aspektus kiel
      // vicoj de folioj. La tordo restas modera ( 0o16/0o10 = 1.75 ) — la granda
      // tordo ( 3.25 antaŭe ) turnis la klingojn ĝis preskaŭ horizontala kaj la
      // gazono aspektis sternita.
      const tordo = ( hazardo() - 0o1/0o2 ) * 0o16/0o10;
      // La nuanco — ĉiu klingo iomete malsamas, kaj ĉiu kvara estas seka.
      // ⟨ Hazarde, ne laŭ pozicio 📃 ⟩ — la sekaj klingoj estis elektitaj per
      // ( ix + iz ) % 0o4, do ĉiu makulo portis la SAMAN diagonalan strion de
      // flavaj klingoj ( nur turnitan kun la makulo ) kaj la kampo montris
      // kradon de strioj. Nun la hazardo decidas, do la sekaj klingoj disiĝas
      // senfigurare.
      const sekaKlingo = hazardo() < 0o1/0o4;
      if ( sekaKlingo ) {
        seka.setRGB(1.06, 0.84 + hazardo() * 0o1/0o10, 0.34 + hazardo() * 0.16 );
      } else {
        verda.setRGB(0.72 + hazardo() * 0.34, 0.8 + hazardo() * 0.28, 0.62 + hazardo() * 0.3);
      }
      // ⟨ La folia klingo 📃 ⟩ — la kontinua gazono uzas la LANCETAN profilon
      // ( mallarĝa bazo, larĝa triono, fina pinto — kiel la folioj de la herbo
      // en Genshin ) kun mola, pufa pinto ( 0.6 ).
      const klingo = kreiHerbanKlingon(klingoLongo, klingoLargho, klino, arko, tordo,
        sekaKlingo ? seka : verda, HERBA_TAVOLA_SEGMENTOJ, 0o6/0o10, true);
      klingo.translate(rx, 0, rz);
      klingoj.push(klingo);
    }
  }
  return kunfandiGeometriojnSenIndekson(klingoj);
}
