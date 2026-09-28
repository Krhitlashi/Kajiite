// ≺⧼ Homoj 🧍 ⧽≻
// NPC-modulo. figuroj vagantaj tra la sxtupurbo de ornaveth-v2
// Malalt-poligonaj figuroj kun tavoligitaj vestoj, foliaj manikoj, kvarstelo/rombo-motivoj
import * as THREE from "three";
import { deksesuma, kvarStelo, HARSTILOJ } from "../vestaro/vestoj.js";
import { kreiBuferanGeometrion, kunfandiGeometriojn, aplikiSkatolajnUvojn } from "../komunajxoj/kunfandajxoj.js";
import { ombro, helo, kreiSxtofanBumpanTeksajxon, kreiHaranTeksajxon, kreiLederanTeksajxon } from "../komunajxoj/teksajxoj.js";
import type { Vesto, Harstilo } from "../vestaro/vestoj.js";

export type { Vesto };

// --- Kanvasaj helpiloj ---
// ( deksesuma kaj kvarStelo venas el vestoj.ts — la komuna vesta modulo )

// --- Vesta tekstura generatoro ---
// vestaTeksajxaStoko — La vestaj teksturoj estas KOMUNAJOJ ( la ekstero dependas
// nur de la vestaj koloroj kaj la parto ), do ili cacheiĝas po ( koloroj, parto ).
// La NPC-aro antaŭe pentris ĝis tri freŝajn 256×256 kanvasojn po figuro — ĝis
// preskaŭ 500 kanvasoj kaj GPU-alŝutoj por la sama malgranda aro da vestoj.
// Kun la cache la aro limiĝas al ( vestoj × partoj ) — ĉiuj figuroj kun la sama
// vesto dividas la saman teksturon, kaj agordiVeston iĝas nur serĉo.
const vestaTeksajxaStoko = new Map<string, THREE.CanvasTexture>();
const vestaTeksajxaKlavo = ( o: Vesto, speco: string ): string =>
  o.nomo + "|" + o.ĉefa + "|" + o.akcenta + "|" + o.interno + "|" + o.pantalono + "|" + speco;

// ⟪ La mezuroj de la figuro 📏 ⟫ — la SAMaj nombroj por la geometrio kaj por la
// kanvasaj teksturoj. Ĉiu kanvaso montras sian vestparton de SUPRE malsupren
// ( la vico 0 estas la plej supra ), do la pentrado bezonas la mondajn limojn de
// la parto. Antaŭe tiuj nombroj vivis dise ( en la geometrio, en la pentrado kaj
// en la antaŭrigardoj ) kaj povis disiĝi — nun ili estas skribitaj unufoje.
const ROB_Y_MALSUPRO = 0o7/0o16;                 // 0.4375 — la suba rando de la robo ( sub la genuo )
// ⟨ La robo finiĝas sub la mentono 📃 ⟩ — la kolumo sidas ĉe 1.3906, la kolo
// ( 1.375 ĝis 1.531 ) videblas kaj la rando restas la rando de la ĉemizo. Kun
// pli granda alto la kolumo kovrus la buŝon kaj la mentonon ( la kapo finiĝas ĉe
// 1.453 ) kaj la figuro aspektus kiel en tro larĝa skafandro.
// ⟪ La korpaj mejloŝtonoj 📏 ⟫ — la mondaj altoj, de la grundo supren : la
// maleolo 0.09375, la genuo 0.5, la ingveno 0.8359, la kokso ( la pivoto de la
// kruroj ) 0.9297, la talio ( la pivoto de la tuko ) 1.0781, la ŝultro 1.4219,
// la bazo de la kolo 1.4531, la krono 1.797. La kruroj do mezuras 0.5 de la
// tuta alto — la proporcio de vera homo ( antaŭe 0.31, do la figuro similis al
// stango kun kapo ), la talio sidas je 0.6 kaj la ŝultro je 0.79.
// ⟨ La mantelo PLILONGIĜIS 📃 ⟩ — la kruroj PLILONGIS ( la kokso supreniris de
// 0.5625 al 0.9297, vidu la torso-ringojn ), do la mantela alto ne plu povas esti
// 1 : kun la malnova rando ( 0.3906 ) la mantelo falus ĝis la mezo de la tibio.
// La rando sidas ĉe 0.5469 ( ĝuste super la genuo ) por iom da tempo, sed la
// stilo volas PLI longan mantelon : nun ĝi mezuriĝas de la rando 0.4375 ( 0.0625
// sub la genuo, do meze de la tibio ) ĝis la kolumo 1.390625. Sub ĝi restas
// ankoraŭ 0.125 da videbla pantalono antaŭ la bota rando ( 0.3125 ), do la
// mantelo legiĝas longa sen kaŝi la botojn.
const ROB_ALTO = 0o75/0o100;                     // 0.953125
const ROB_Y_SUPRO = ROB_Y_MALSUPRO + ROB_ALTO;   // 1.390625 — la kolumo
// ROB_PROFUNDO — Kiom PROFUNDA estas la robo rilate al sia larĝo. Homo estas pli
// mallarĝa de antaŭe malantaŭen ol dekstre maldekstren, sed la robo estis
// PERFEKTA CIRKLO — de supre ĝi legiĝis kiel granda disko kaj la figuro aspektis
// dika. La tuta vesto do multiplikas la profundecon per ĉi tiu nombro kaj la
// sekco iĝas elipso. La sama nombro validas por la robo kaj por la interna
// ĉemizo, ĉar la du tavoloj devas sekvi la saman sekcon.
// ⟨ 0.8, ne 0.75 📃 ⟩ — la torso mem estas elipso de ĉirkaŭ 0.75 ( larĝo 0.28,
// profundo 0.25 ĉe la brusto ), sed la vesto devas lasi SPACON antaŭ ĝi — la robo
// ruliĝas ĉirkaŭ la zono dum ĉiu paŝo ( vidu marŝSwingon ) kaj glitas antaŭen-
// malantaŭen ĉirkaŭ 0.013 ĉe la ŝultroj. Kun 0.75 la ĉemizo havis nur 0.015 da
// profunda spaco kaj la brusto trapikis ĝin ĉe la rando de la antaŭa malfermaĵo.
const ROB_PROFUNDO = 0o4/0o5;                    // 0.8 — la profundo rilate al la larĝo
// La interna ĉemizo sekvas la robon — ĝi komenciĝas iomete super la suba rando
// de la robo, kaj supre ĝi NE finiĝas per horizontala tranĉo sed per KOLUMO.
// ⟨ La ĉemizo ĉirkaŭas la kolon 📃 ⟩ — antaŭe ĝia supra rando estis tranĉo ĉe la
// ŝultra linio ( 1.391 ), do la ŝultroj restis nudaj kaj la ĉemizo legiĝis kiel
// tubo sen kolumo. Nun la ŝtofo supreniras super la ŝultrojn kaj finiĝas per
// mallonga kolumo ĉirkaŭ la kolo ( 1.46875, ĝuste sub la mentono ) — la sama
// konstruo kiel vera ĉemizo sub mantelo.
// ⟨ La kolumo estas RONDA 📃 ⟩ — la kolo de la homa modelo estas CILINDRO
// ( 0.125 malsupre, 0.109 supre, vidu la kolon en figurajGeometriojn ), do elipsa
// kolumo ( la profundo 0.75 de la larĝo ) ne povus ĉirkaŭi ĝin: antaŭe kaj
// malantaŭe ĝi trapikus la kolon. La kolumaj ringoj do portas sian propran,
// preskaŭ rondan profundon kaj staras 0.02 … 0.03 for de la kolo ( vidu
// kreiInternanSxelon ) — kolumo kiu tuŝas la haŭton legiĝas kiel kudro.
// La kanvasa pentrado uzas ĉi tiujn limojn
// ( vidu pentriInternan ), do la motivoj restas vicigitaj en la mondo.
// ⟨ La ĉemizo MALLONGIĜIS 📃 ⟩ — antaŭe ĝia tuko sekvis la roban randon ( 0.4475,
// nur 0.01 super ĝi ), do la du tavoloj finiĝis preskaŭ kune kaj la rigardo ne
// apartigis ilin. Nun la tuko sidas ĉe 0.578 — klare SUPER la roba rando ( 0.4375,
// do 0.14 da videbla pantalono inter ili ) — kaj ĝia antaŭa parto leviĝas al
// 0.678 ( vidu TUKA_LEVO ), do tra la antaŭa malfermaĵo de la robo oni vidas la
// internan ĉemizon finiĝi alte kaj la pantalonon sub ĝi.
const INTERNO_Y_MALSUPRO = 0o45/0o100;                   // 0.578125 — la tuko
const INTERNO_Y_SUPRO = 0o274/0o200;                     // 1.46875 — la pinto de la kolumo
const INTERNO_ALTO = INTERNO_Y_SUPRO - INTERNO_Y_MALSUPRO;   // 1.068125
// INTERNO_PIVOTO_Y — La alto de la pivoto de la interna ĉemizo. La ĉemizo pendas
// de la ŜULTROJ, ne de la zono — tiel la tuko svingiĝas 0.84 po radiano dum la
// kolumo kaj la ŝultroj apenaŭ moviĝas. La ŝultro-kovrilo de la ĉemizo estas
// ELIPSO ( 0.1875 larĝe, 0.158 profunde ) dum la ŝultro de la torso estas preskaŭ
// RONDO ( 0.171 en la diagonalo ), do la du formoj kuntuŝiĝas tie — turno ĉirkaŭ la
// zono movus la ŝultrojn 0.33 kaj la ĉemizo trapikus la mantelon per 0.007
// ( vidu marŝSvingon ). La pivoto do sidas sur la ŝultra linio, sur la sama alto
// kiel la lasta kovrila ringo de la ĉemizo.
const INTERNO_PIVOTO_Y = 0o133/0o100;            // 1.421875 — la ŝultra linio
const KAPA_Y = 0o15/0o10;                        // 1.625 — la centro de la kapo
// KOLO_Y — la alto de la kolo ( kaj do la pivoto de la kapo-grupo ). La kapo, la
// vizaĝo kaj la haroj turniĝas ĉirkaŭ ĉi tiu punkto, do la kapo povas kliniĝi
// kontraŭ la paŝoj anstataŭ esti rigida parto de la korpo.
const KOLO_Y = 0o135/0o100;                      // 1.453125 — la bazo de la kolo
const SASA_Y = 0o212/0o200;                      // 1.078125 — la zono ( la plej mallarĝa torso-ringo )
const SASA_DUONO = 0o1/0o20;                     // kiom dika la zono ( en mondunuoj )
// MALEOLO_Y — la alto de la maleolo rilate al la koksa grupo de la kruro. La
// piedo turniĝas ĉirkaŭ ĉi tiu punkto dum la paŝo ( la ruliĝo de la plando ), do
// ĝi kongruas kun la plej alta sekco de la bota piedo ( vidu kreiBotan ).
const MALEOLO_Y = -0o64/0o200;                   // −0.40625 — la genuo ( 0.5 ) supren 0.09375
// KUBUTO_Y — la alto de la kubuto rilate al la ŝultro-pivoto. La brako kaj la
// maniko disiĝas ĉi tie en du partojn ( vidu kreiKorpanBrakon kaj
// figurajGeometriojn ), kaj la antaŭbrako turniĝas ĉirkaŭ ĉi tiu punkto dum la
// paŝo. La sama nombro servas tri lokojn — la disigon de la brako, la disigon de
// la maniko kaj la pivoton de la kubuta grupo — do ĝi estas nomita unufoje.
const KUBUTO_Y = -0o256/0o1000;                  // −0.3398 — la kubuto
// HALTO_GAMO — kiom la alto de unu figuro povas varii rilate al la baza modelo.
// La homamaso aspektu kiel homoj, ne kiel vico da kopioj de la sama korpo ( des
// pli videble nun, kiam la har-koloro, la har-stilo, la okuloj kaj la vesto jam
// varias ). La vario tamen restu ETA — ± 5 %, do proksimume 9 cm ĉe plenkreskulo:
// pli granda gamo legiĝus kiel infanoj kaj plenkreskuloj miksitaj.
const HALTO_GAMO = 0o1/0o20;                     // 0.05

// ⟪ La kanvasaj helpiloj 🖌️ ⟫

// volviX — Desegnu la saman formon ĉe la tri horizontalaj kahelaj pozicioj
// ( −s, 0, s ). Ĉiuj vestaj kanvasoj ĉirkaŭvolviĝas horizontale ( la motivoj ĉe
// x = 0 kaj x = 0o400 estas la SAMA loko sur la tubo — la kudro de la dorso ),
// do sen la ĉirkaŭvolvo motivo tranĉiĝus duone ĉe la kudro.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param formo ( funkcio ) - La desegno ( ripetita trifoje ).
function volviX(k: CanvasRenderingContext2D, formo: () => void): void {
  const s = k.canvas.width;
  for ( const dx of [ -s, 0, s ] ) {
    k.save();
    k.translate(dx, 0);
    formo();
    k.restore();
  }
}

// kanvasaY — La kanvasa vico de donita mondalto sur vestparto ( la vico 0 estas
// la supra rando de la parto ). Unu helpilo por la tuta konverto, por ke la
// motivoj kaj la zono de la tri vestpartoj restu vicigitaj en la mondo.
//     @param y ( number ) - La mondalto.
//     @param ySupra ( number ) - La mondalto de la supra rando de la parto.
//     @param alto ( number ) - La alto de la parto ( en mondunuoj ).
//     @param h ( number ) - La kanvasa alto ( rastrumeroj ).
//     @returns y ( number ) - La kanvasa vico.
function kanvasaY(y: number, ySupra: number, alto: number, h: number): number {
  return ( ySupra - y ) / alto * h;
}

// sxtofon — La tuka teksajxo de ĉiuj vestaj kanvasoj. Fajna interplekto
// ( alternaj helaj kaj malhelaj fadenoj, entjera periodo — do la krado mem ne
// montras kudron ) plus molaj nuboj da eluziĝo. Ĉiu tavolo deriviĝas el la
// bazkoloro per ombro kaj helo, do la tuta kanvaso restas en la #nmnmnm-familio
// de la stilo anstataŭ enkonduki fremdajn nuancojn.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param bazo ( number ) - La bazkoloro de la parto ( 0xRRGGBB ).
function sxtofon(k: CanvasRenderingContext2D, bazo: number): void {
  const w = k.canvas.width, h = k.canvas.height;
  // ⟨ La interplekto estas mola 📃 ⟩ — la periodo estas 0o10 rastrumeroj ( ne
  // 0o4 ) kaj la alfo malgranda, ĉar la akra krado de la unua versio aliasis
  // sur la kurba robo kaj la vesto aspektis kiel trikita plasto. La du
  // faden-direktoj ankaŭ havas malsamajn alfojn — la vefto ( horizontale )
  // superregu iomete, do la ŝtofo havas direkton anstataŭ kvadratan reton.
  const paso = 0o10, fadeno = 0o2;
  k.globalAlpha = 0o1/0o4;
  for ( let i = 0; i < w; i += paso ) {
    k.fillStyle = ( i / paso ) % 0o2 ? helo(bazo, 0o1) : ombro(bazo, 0o1);
    k.fillRect(i, 0, fadeno, h);
  }
  k.globalAlpha = 0o1/0o2;
  for ( let i = 0; i < h; i += paso ) {
    k.fillStyle = ( i / paso ) % 0o2 ? ombro(bazo, 0o1) : helo(bazo, 0o1);
    k.fillRect(0, i, w, fadeno);
  }
  k.globalAlpha = 0o1;
  // La eluziĝaj nuboj — malgrandaj molaj makuloj de portata tuko. La montroj
  // ĉirkaŭvolviĝas, kaj la fina koloro estas la sama nuanco kun alfo nulo ( ne
  // nigro kun alfo nulo ), do la randoj malheliĝas NENIOM.
  for ( let i = 0; i < 0o30; i++ ) {
    const r = h * ( 0o10/0o100 + Math.random() * 0o30/0o100 );
    const x = Math.random() * w, y = Math.random() * h;
    const plena = i % 0o3 ? ombro(bazo, 0o1, 0o5/0o100) : helo(bazo, 0o1, 0o5/0o100);
    const nula = i % 0o3 ? ombro(bazo, 0o1, 0) : helo(bazo, 0o1, 0);
    volviX(k, () => {
      const g = k.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, plena);
      g.addColorStop(1, nula);
      k.fillStyle = g;
      k.beginPath(); k.arc(x, y, r, 0, Math.PI * 0o2); k.fill();
    });
  }
}

// faldo — Mola vertikala ombro, kiel la faldo de pendanta tuko. La gradiento
// iras nevideble → malhele → nevideble, do la faldo ne havas randon.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param x ( number ) - La centro de la faldo ( kanvasa x ).
//     @param largho ( number ) - La duonlarĝo de la faldo.
//     @param bazo ( number ) - La bazkoloro ( por la ombro ).
//     @param n ( number ) - Kiom da 0x101010-paŝoj malhelen.
//     @param alfa ( number ) - La alfo de la plej malhela punkto.
function faldo(k: CanvasRenderingContext2D, x: number, largho: number, bazo: number,
  n: number, alfa: number): void {
  const plena = ombro(bazo, n, alfa), nula = ombro(bazo, n, 0);
  volviX(k, () => {
    const g = k.createLinearGradient(x - largho, 0, x + largho, 0);
    g.addColorStop(0, nula);
    g.addColorStop(0o1/0o2, plena);
    g.addColorStop(1, nula);
    k.fillStyle = g;
    k.fillRect(x - largho, 0, largho * 0o2, k.canvas.height);
  });
}

// stebo — Punktita kudro. Maldika streko el etaj streketoj, la sama kiel la
// kudroj de la folioj kaj de la tuko ( la kudroj de la vesto devas legiĝi kiel
// kudroj, ne kiel pentritaj linioj ).
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param punktoj ( [ number, number ][] ) - La vojo de la kudro.
//     @param koloro ( string ) - La kudra koloro.
//     @param dikeco ( number = 0o1 ) - La streketdikeco.
function stebo(k: CanvasRenderingContext2D, punktoj: [ number, number ][], koloro: string,
  dikeco = 0o1): void {
  k.strokeStyle = koloro;
  k.lineWidth = dikeco;
  k.setLineDash([ 0o2, 0o3 ]);
  k.beginPath();
  for ( let i = 0; i < punktoj.length; i++ ) {
    if ( i === 0 ) k.moveTo(punktoj[i][0], punktoj[i][1]);
    else k.lineTo(punktoj[i][0], punktoj[i][1]);
  }
  k.stroke();
  k.setLineDash([]);
}

// bordiKurbon — Streku glatan kurbon tra la punktoj ( la bordoj de la antaŭa
// malfermaĵo, la zono ). La kurbo venas el la sama funkcio kiel la geometrio,
// do la bordo kaj la ŝtofo ne povas disiĝi.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param punktoj ( [ number, number ][] ) - La kurbo.
//     @param koloro ( string ) - La borda koloro.
//     @param dikeco ( number ) - La borda dikeco.
function bordiKurbon(k: CanvasRenderingContext2D, punktoj: [ number, number ][],
  koloro: string, dikeco: number): void {
  k.strokeStyle = koloro;
  k.lineWidth = dikeco;
  k.lineJoin = "round";
  k.beginPath();
  for ( let i = 0; i < punktoj.length; i++ ) {
    if ( i === 0 ) k.moveTo(punktoj[i][0], punktoj[i][1]);
    else k.lineTo(punktoj[i][0], punktoj[i][1]);
  }
  k.stroke();
}

// rondaRombo — Romb-forma motivo kun RONDAJ anguloj. La romboj de la antaŭaj
// motivoj havis kvar akrajn angulojn kaj legiĝis kiel paperaj glumarkoj; nun ĉiu
// pinto rondiĝas per kvadratkurba stango, do la formo sekvas la « rondigita
// rombo »-lingvon de la mondo ( vidu formoj.ts ) kaj de la butonoj.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param x, y ( number ) - La centro de la rombo.
//     @param w, h ( number ) - La duonlarĝo kaj la duonalto.
//     @param plenigo ( string | null ) - La pleniga koloro ( aŭ nulo ).
//     @param bordo ( string | null ) - La borda koloro ( aŭ nulo ).
//     @param dikeco ( number = 0o4 ) - La borda dikeco.
function rondaRombo(k: CanvasRenderingContext2D, x: number, y: number, w: number,
  h: number, plenigo: string | null, bordo: string | null, dikeco = 0o4): void {
  const T = 0o3/0o10;                 // kiom de ĉiu flanko la pinto rondiĝas
  const pintoj: [ number, number ][] = [ [ x, y - h ], [ x + w, y ], [ x, y + h ], [ x - w, y ] ];
  const survoje = (a: [ number, number ], b: [ number, number ], t: number) =>
    [ a[0] + ( b[0] - a[0] ) * t, a[1] + ( b[1] - a[1] ) * t ] as [ number, number ];
  k.beginPath();
  for ( let i = 0; i < 0o4; i++ ) {
    const antauxa = pintoj[( i + 0o3 ) % 0o4], nun = pintoj[i], posta = pintoj[( i + 0o1 ) % 0o4];
    const en = survoje(nun, antauxa, T), el = survoje(nun, posta, T);
    if ( i === 0 ) k.moveTo(en[0], en[1]);
    else k.lineTo(en[0], en[1]);
    k.quadraticCurveTo(nun[0], nun[1], el[0], el[1]);
  }
  k.closePath();
  if ( plenigo ) { k.fillStyle = plenigo; k.fill(); }
  if ( bordo ) { k.strokeStyle = bordo; k.lineWidth = dikeco; k.lineJoin = "round"; k.stroke(); }
}

// ⟪ La antaŭa malfermaĵo de la robo 🚪 ⟫
// MALFERMA_DUONO — kiom da la cirkonferenco ( kiel frakcio de plena turno )
// ĉiu duono de la antaŭa malfermaĵo prenas ĉe la suba rando. La malfermaĵo estas
// nulo ĉe la kolumo — la supra parto de la ekstera ĉemizo estas fermita aŭ
// butonumita — kaj malfermiĝas malsupren, ĝuste kiel la stilo priskribas.
// ⟨ La RONDO estas la KURBO Malsupren, ne la buŝo 📃 ⟩ — la malfermaĵo mem
// malfermiĝas per glata ( 1 − t )², do ĝiaj bordoj kunkuras supren al la fino de
// la plakedo — tio restas. La rondaĵo kiun la stilo postulas estas la SUB en la
// malsupra rando : la tuko leviĝas antaŭe per RONDA arko ( vidu robLevighon ), ne
// per pinto, do la antaŭa malfermaĵo estas ronda valo kaj ne akra triangulo.
//     @param t ( number ) - La altfrakcio ( 0 la suba rando, 1 la kolumo ).
//     @returns duono ( number ) - La duonlarĝo en frakcioj de plena turno.
const MALFERMA_DUONO = 0o1/0o14;
// MALFERMA_RONDO — la radiuso de la rondujo ĉe la malsupraj anguloj de la
// malfermaĵo ( vidu rondigiMalfermanAngulon ).
const MALFERMA_RONDO = 0o4/0o1000;   // 0.0078
function malfermaDuono(t: number): number {
  return MALFERMA_DUONO * ( 0o1 - t ) * ( 0o1 - t );
}

// robLevigho — Kiom la robo leviĝas ĉe la angulo ang kaj la altfrakcio t. La
// suba rando de la robo leviĝas antaŭe ( la mantelo-stilo de la stilo )
// kaj la levo malkreskas LINEARE supren, do la antaŭaj bordoj de la malfermaĵo
// iĝas preskaŭ rektaj diagonaloj de la suba rando ĝis la kolumo. Lineara
// malkresko ( anstataŭ kurba ) tenas la saman ŝtof-densecon laŭ la tuta bordo —
// kun ( 0o1 − t )² la unuaj vicoj premegiĝus kaj la rando montrus sulkon.
// ⟨ La levo estas RONDA, ne pinta 📃 ⟩ — kun la eksponento 4 la levo preskaŭ
// nuliĝis jam 45° for de la fronto, do la suba rando leviĝis en akran pinton
// ( la mantelo havis pikan antaŭan « voston » ). Kun la eksponento 2 la levo
// disvastiĝas pli glate ĉirkaŭ la fronto kaj la rando legiĝas kiel ronda arko.
//     @param ang ( number ) - La cirkla angulo ( 0 antaŭe ).
//     @param t ( number ) - La altfrakcio ( 0 la suba rando, 1 la kolumo ).
//     @returns levigho ( number ) - La levita alto ( mondunuoj ).
const ROB_LEVO = 0o1/0o4;
function robLevigho(ang: number, t: number): number {
  const profilo = Math.pow(( Math.cos(ang) + 0o1 ) / 0o2, 0o2);
  return ROB_LEVO * profilo * ( 0o1 - t );
}

// ⟪ La kanvasaj pentristoj 🖌️ ⟫

// ⟨ La ekstera ĉemizo 📃 ⟩ — la plej videbla tavolo de la figuro. La kanvaso
// estas 0o400 × 0o1000 ( 256 × 512 ) kaj ĝia MEZO ( x = 0o200 ) estas la fronto
// de la figuro — la tekstura ŝovo 0o1/0o2 alportas ĝin tien. La du randoj
// ( x = 0 kaj x = 0o400 ) renkontiĝas ĉe la dorso. La vertikalo estas la alto de
// la robo — la vico 0 estas la kolumo ( ROB_Y_SUPRO = 1.390625 ), la vico 0o1000
// la suba rando ( ROB_Y_MALSUPRO = 0.4375 ).
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param o ( Vesto ) - La vesto ( la koloroj ).
function pentriEksteran(k: CanvasRenderingContext2D, o: Vesto): void {
  const w = k.canvas.width, h = k.canvas.height;
  const M = o.ĉefa, A = o.akcenta, I = o.interno;
  const Mx = deksesuma(M), Ax = deksesuma(A), Ix = deksesuma(I);
  k.fillStyle = Mx;
  k.fillRect(0, 0, w, h);
  sxtofon(k, M);

  // ⟨ La faldoj 📃 ⟩ — molaj vertikalaj ombroj flanke de la fronta panelo. La
  // fronto mem restas plata ( tie sidas la motivoj ), do la faldoj tenas sin
  // flanke kaj ĉe la dorso.
  faldo(k, 0o40, 0o24, M, 0o1, 0o3/0o10);
  faldo(k, 0o124, 0o34, M, 0o1, 0o25/0o100);
  faldo(k, 0o254, 0o34, M, 0o1, 0o25/0o100);
  faldo(k, 0o340, 0o24, M, 0o1, 0o3/0o10);

  // ⟨ La desegno restas EĈE LA CENTRO 📃 ⟩ — la motivoj staras sur la fronta
  // centro kaj la supra parto neniam superas ± 0o50 ( 40 el 64 ), do la fronta
  // desegno ne etendiĝas ĝis la flankoj de la kanvaso. La rondaj finoj de la
  // strekoj validas por ĉiuj motivoj sube.
  k.lineCap = "round";
  k.lineJoin = "round";

  // ⟨ La diagonaloj 📃 ⟩ — du paroj da RONDAJ kvadrataj kurboj. La unua
  // malsupreniras laŭ la ŝultro, la dua disiĝas al la tuko; ambaŭ restas for de
  // la flankaj randoj de la panelo.
  k.strokeStyle = ombro(M, 0o2, 0o4/0o10);
  k.lineWidth = 0o2;
  for ( const dir of [ -0o1, 0o1 ] ) {
    k.beginPath();
    k.moveTo(0o200 + dir * 0o50, 0o62);
    k.quadraticCurveTo(0o200 + dir * 0o46, 0o160, 0o200 + dir * 0o40, 0o200);
    k.stroke();
    k.beginPath();
    k.moveTo(0o200 + dir * 0o40, 0o340);
    k.quadraticCurveTo(0o200 + dir * 0o64, 0o420, 0o200 + dir * 0o64, 0o470);
    k.stroke();
  }

  // ⟨ La kolumo 📃 ⟩ — la vico 0 estas la kolumo ( la mondo 1.390625 ). Bendo pli
  // hela ol la ŝtofo, kun ombro sub ĝi kaj kudro laŭ la malsupra rando.
  const KOLUMO_ALTO = 0o24;   // 20 — la koluma bendo
  k.fillStyle = ombro(M, 0o1);
  k.fillRect(0, 0, w, KOLUMO_ALTO);
  k.fillStyle = helo(M, 0o1);
  k.fillRect(0, 0o4, w, 0o12);
  stebo(k, [ [ 0, KOLUMO_ALTO ], [ w, KOLUMO_ALTO ] ], ombro(M, 0o2), 0o1);

  // ⟨ La antaŭaj bordoj 📃 ⟩ — la randoj de la malfermaĵo, kun ombro interne kaj
  // akcenta tubeto sur la rando mem. La kurbo venas el malfermaDuono, la SAMA
  // funkcio kiun la geometrio uzas, kaj ĝi komenciĝas ĉe la kolumo, ĉar la
  // malfermaĵo mem iras ĝis tie.
  const ombroj: [ [ number, number ][], [ number, number ][] ] = [ [], [] ];
  const bordoj: [ [ number, number ][], [ number, number ][] ] = [ [], [] ];
  for ( let y = KOLUMO_ALTO; y <= h; y += 0o4 ) {
    const duono = malfermaDuono(0o1 - y / h) * w;
    ombroj[0].push([ 0o200 + duono + 0o6, y ]);
    ombroj[1].push([ 0o200 - duono - 0o6, y ]);
    bordoj[0].push([ 0o200 + duono + 0o1, y ]);
    bordoj[1].push([ 0o200 - duono - 0o1, y ]);
  }
  bordiKurbon(k, ombroj[0], ombro(M, 0o1, 0o5/0o10), 0o2);
  bordiKurbon(k, ombroj[1], ombro(M, 0o1, 0o5/0o10), 0o2);
  // ⟨ La akcenta linio 📃 ⟩ — ĝi kuŝas unu rastumeron de la rando; kun la plena
  // dikeco 0o4 la tuta streko falas sur la ŝtofon kaj legiĝas kiel tubetita rando.
  bordiKurbon(k, bordoj[0], Ax, 0o4);
  bordiKurbon(k, bordoj[1], Ax, 0o4);

  // ⟨ La eltranĉoj 📃 ⟩ — kvar stelaj fenestroj. Ĉiu havas la truon en la INTERNA
  // koloro kaj akcentan konturon, do ili legiĝas kiel eltranĉoj. Ili sidas je
  // ± 0o50, do ili ne atingas la flankojn.
  const fenestro = ( x: number, y: number, r: number ) => {
    kvarStelo(k, x, y, r + 0o11, Ax);
    kvarStelo(k, x, y, r + 0o5, Mx);
    kvarStelo(k, x, y, r + 0o4, Ax);
    kvarStelo(k, x, y, r, Ix);
  };
  fenestro(0o200 - 0o50, 0o250, 0o16);
  fenestro(0o200 + 0o50, 0o250, 0o16);
  fenestro(0o200 - 0o50, 0o540, 0o13);
  fenestro(0o200 + 0o50, 0o540, 0o13);

  // ⟨ La brusta motivo 📃 ⟩ — la keuxfhxeso. Solida kvarpinta stelo kun kvar
  // « > »-krampoj kaj du paroj da MALFERMAJ eĥaj arkoj, ĉiuj nur strekoj.
  kvarStelo(k, 0o200, 0o120, 0o36, Ax);
  kvarStelo(k, 0o200, 0o120, 0o14, Ix);
  for ( const sx of [ -0o1, 0o1 ] ) for ( const sy of [ -0o1, 0o1 ] ) {
    const ax = 0o200 + sx * 0o30, ay = 0o120 + sy * 0o30;
    k.strokeStyle = ombro(A, 0o1, 0o7/0o10);
    k.lineWidth = 0o3;
    k.beginPath();
    k.moveTo(ax, ay);
    k.quadraticCurveTo(0o200 + sx * 0o21, ay, 0o200 + sx * 0o17, 0o120 + sy * 0o36);
    k.moveTo(ax, ay);
    k.quadraticCurveTo(ax, 0o120 + sy * 0o21, 0o200 + sx * 0o32, 0o120 + sy * 0o17);
    k.stroke();
  }
  const eĥaj: [ number, number, string ][] = [
    [ 0o1,        0o2, ombro(M, 0o2, 0o5/0o10) ],
    [ 0o7/0o10,   0o3, ombro(A, 0o1, 0o45/0o100) ],
    [ 0o44/0o100, 0o2, ombro(M, 0o3, 0o5/0o10) ],
  ];
  for ( const sy of [ -0o1, 0o1 ] ) {
    const bazoY = 0o120 + sy * 0o42;
    for ( const [ s, dik, kol ] of eĥaj ) {
      const du = 0o34 * s, al = 0o24 * s;
      k.strokeStyle = kol;
      k.lineWidth = dik;
      k.beginPath();
      k.moveTo(0o200 - du, bazoY);
      k.quadraticCurveTo(0o200, bazoY + sy * al * 0o2, 0o200 + du, bazoY);
      k.stroke();
    }
  }

  // ⟨ La dorso 📃 ⟩ — la kudro ( x = 0 kaj x = 0o400 ) estas la SAMA punkto, do
  // la desegno desegniĝas unufoje kaj volviX ĝin spegulas trans la kudron. La
  // tuta motivo staras sur la mezo de la dorso — la koluma V supre, du malgrandaj
  // sxeŭronoj ĉe la ŝultroj, unu granda rombo kaj ĝia centra juvelo — kaj ĉiu
  // streko restas for de ĉiuj aliaj.
  k.lineCap = "round";
  k.lineJoin = "round";
  // ⟨ La koluma V 📃 ⟩ — unu malferma V ĝuste sub la kolumo. La brakoj estas
  // REKTAJ ( nur la kunigaĵo rondiĝas per lineJoin ), do ĝi legiĝas kiel V kaj ne
  // kiel U. Ĝi sidas sola supre, do la supra dorso restas trankvila.
  k.strokeStyle = Ax;
  k.lineWidth = 0o3;
  volviX(k, () => {
    k.beginPath();
    k.moveTo(-0o37, 0o70);
    k.lineTo(0, 0o200);
    k.lineTo(0o37, 0o70);
    k.stroke();
  });
  // ⟨ La ŝultraj sxeŭronoj 📃 ⟩ — po unu MALGRANDA malferma V ekster la brakoj
  // de la koluma V, kaj nur tiuj du, do la ŝultroj ne ripetas kradon.
  k.strokeStyle = ombro(M, 0o2, 0o5/0o10);
  k.lineWidth = 0o2;
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      k.beginPath();
      k.moveTo(dir * 0o64, 0o70);
      k.lineTo(dir * 0o60, 0o130);
      k.lineTo(dir * 0o54, 0o70);
      k.stroke();
    }
  });
  // ⟨ La granda rombo 📃 ⟩ — ĝiaj flankoj estas PRESKAŬ REKTAJ, do la motivo
  // legiĝas kiel rombo kaj neniam kiel lenso aŭ okulo. La supraj flankoj estas
  // strekoj de la ĉefa koloro kaj la malsupraj flankoj estas akcentaj; la du
  // paroj RENKONTIĜAS ĉe la plej larĝaj punktoj, do la rombo havas kvar verajn
  // angulojn, kaj la finoj supre kaj malsupre restas malfermaj.
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      k.strokeStyle = ombro(M, 0o2, 0o5/0o10);
      k.lineWidth = 0o2;
      k.beginPath();
      k.moveTo(0, 0o226);
      k.quadraticCurveTo(dir * 0o32, 0o340, dir * 0o50, 0o444);
      k.stroke();
      k.strokeStyle = Ax;
      k.lineWidth = 0o3;
      k.beginPath();
      k.moveTo(dir * 0o50, 0o444);
      k.quadraticCurveTo(dir * 0o36, 0o516, dir * 0o21, 0o570);
      k.stroke();
    }
  });
  // ⟨ La centra juvelo 📃 ⟩ — solida rombo kun romba truo en la mezo, do la
  // okulo legiĝas kiel ŝtono anstataŭ kiel truo. La plej granda motivo de la
  // dorso staras ĝuste sur la kudro.
  const juvelo = (duono: number, alto: number, koloro: string) => {
    k.fillStyle = koloro;
    k.beginPath();
    k.moveTo(0, 0o370 - alto);
    k.lineTo(duono, 0o370);
    k.lineTo(0, 0o370 + alto);
    k.lineTo(-duono, 0o370);
    k.closePath();
    k.fill();
  };
  volviX(k, () => {
    juvelo(0o21, 0o100, Ax);
    juvelo(0o6, 0o30, Mx);
  });
  // ⟨ La malsupra sxeŭrono 📃 ⟩ — akcenta V sub la juvelo, kiu fermas la
  // malsupran pinton de la rombo sen tuŝi la flankojn supre.
  k.strokeStyle = Ax;
  k.lineWidth = 0o3;
  volviX(k, () => {
    k.beginPath();
    k.moveTo(-0o17, 0o660);
    k.lineTo(0, 0o600);
    k.lineTo(0o17, 0o660);
    k.stroke();
  });

  // ⟨ La dorso ricevas PLI da motivoj 🖌️ ⟩ — antaŭe la dorso havis nur la koluman
  // V-on, la du ŝultrajn sxeŭronojn, la rombon kaj la malsupran sxeŭronon, do la
  // malantaŭo de la ĉemizo legiĝis pli malplena ol la fronto. La desegno nun portas
  // la saman ritmon kiel la fronto — parojn da MALFERMAJ arkoj flanke de la rombo
  // ( la sama ilo kiel la eĥaj arkoj de la fronto ), streketojn ĉe la ŝultroj kaj
  // angulojn ĉe la tuko — ĉiuj spegulitaj trans la kudron per volviX, do la dorso
  // restas simetria kaj la motivoj restas for de la flankaj randoj de la panelo.
  // ⟨ La flankaj arkoj 📃 ⟩ — du paroj da ARKOJ kiuj sekvas la rombon ekstere, ĉe
  // ĝiaj plej larĝaj punktoj ( y = 0o444 ). Ĉiu arko iras de punkto supre de tiu
  // alto, kondukiĝas tra la plej malproksima punkto kaj revenas malsupren — kiel
  // parentezo. La rombo mem atingas 0o50 tie, do la arkoj staras ekster ĝi kaj la
  // pli granda paro enfermas la pli malgrandan. La kolumnoj estas la ena x, la
  // ekstera x, la duonalto, la dikeco kaj la koloro.
  const dorsEĥoj: [ number, number, number, number, string ][] = [
    [ 0o54, 0o70,  0o30, 0o2, ombro(M, 0o2, 0o45/0o100) ],
    [ 0o62, 0o104, 0o42, 0o3, ombro(A, 0o1, 0o5/0o10) ],
  ];
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      for ( const [ ena, ekstera, duonalto, dikeco, koloro ] of dorsEĥoj ) {
        k.strokeStyle = koloro;
        k.lineWidth = dikeco;
        k.beginPath();
        k.moveTo(dir * ena, 0o444 - duonalto);
        k.quadraticCurveTo(dir * ekstera, 0o444, dir * ena, 0o444 + duonalto);
        k.stroke();
      }
    }
  });
  // ⟨ La ŝultraj streketoj 📃 ⟩ — po unu mallonga akcenta streketo super ĉiu
  // sxeŭrono, iomete klinita, same kiel la strekoj flanke de la koluma V. Ili
  // sidas inter la brako de la V kaj la sxeŭrono, do ili plenigas tiun malplenan
  // angulon sen tuŝi la randon de la ŝultro.
  k.strokeStyle = ombro(A, 0o1, 0o45/0o100);
  k.lineWidth = 0o2;
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      k.beginPath();
      k.moveTo(dir * 0o46, 0o34);
      k.lineTo(dir * 0o42, 0o114);
      k.stroke();
    }
  });
  // ⟨ La anguloj ĉe la tuko 📃 ⟩ — paro da mallongaj anguloj super la malsupra
  // rimeno. Ili fermas la dorsan desegnon malsupre same kiel la malsupra sxeŭrono
  // fermas la rombon supre, kaj ili staras spegule ĉe la du flankoj de la kudro.
  k.strokeStyle = ombro(M, 0o2, 0o45/0o100);
  k.lineWidth = 0o2;
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      k.beginPath();
      k.moveTo(dir * 0o24, h - 0o64);
      k.lineTo(dir * 0o40, h - 0o44);
      k.lineTo(dir * 0o56, h - 0o66);
      k.stroke();
    }
  });

  // ⟨ Nenia horizontala linio 📃 ⟩ — nek talio nek zono tranĉas la ĉemizon.

  // ⟨ La malsupra rando estas DUOBLA rimeno 📃 ⟩ — la desegno de la dorso montras
  // DIKAN flavan randon ĉe la tuko, do la maldika streko ( 0o7 ) fariĝis vera bendo
  // kun ombra linio super ĝi kaj malhela streko ene de ĝia supra parto. La tuko de
  // la ĉemizo do legiĝas kiel aparta parto de la vesto anstataŭ kiel la fino de la
  // kanvaso.
  k.fillStyle = Ax;
  k.fillRect(0, h - 0o14, w, 0o14);
  k.fillStyle = ombro(M, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o17, w, 0o3);
  k.fillStyle = ombro(A, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o14, w, 0o2);
}

// ⟨ La interna ĉemizo 📃 ⟩ — la dua tavolo. Ĝi estas videbla tra la antaŭa
// malfermaĵo de la robo kaj tra la eltranĉoj, do ĝia fronta centro ( x = 0o200 )
// portas sian propran motivon — la sama stilo, sed pli malgranda, por ke la du  // tavoloj ne konkuru. La zono kaj la nodo sidas sur ĉi tiu tavolo, ĉar la nodo
// kuŝas en la malfermaĵo, kie la robo ne kovras ĝin.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param o ( Vesto ) - La vesto ( la koloroj ).
function pentriInternan(k: CanvasRenderingContext2D, o: Vesto): void {
  const w = k.canvas.width, h = k.canvas.height;
  const I = o.interno, A = o.akcenta;
  const Ix = deksesuma(I), Ax = deksesuma(A);
  k.fillStyle = Ix;
  k.fillRect(0, 0, w, h);
  sxtofon(k, I);
  // ⟨ Du molaj faldoj 📃 ⟩ — antaŭe kvar, sed kune kun la motivoj ili plenigis
  // la kanvason. Nun ili tenas sin flanke de la centro kaj lasas la mezon al la
  // desegno.
  faldo(k, 0o120, 0o30, I, 0o1, 0o25/0o100);
  faldo(k, 0o260, 0o30, I, 0o1, 0o25/0o100);

  // ⟨ La motivoj estas RONDAJ, maldensaj, kun MALPLENOJ inter ili kaj margenoj
  // de la randoj 📃 ⟩ — la antaŭa desegno estis krado: kvarpinta stelo sur AKRA
  // romba kadro, poste kvin vicoj da romboj ( tri po vico ), kaj la malsupra
  // rando de la zono pendis kiel rektangulaj blokoj ĝis la tuko. Nun la motivoj
  // estas nur RONDAJ strekoj kaj STELOJ, ili restas for de la koluma rando
  // ( y = 0 ) kaj de la tuka rando ( y = h ), kaj inter ili restas multe da
  // malplena ŝtofo — la desegno maldensiĝis anstataŭ pleniĝi.
  const MARGENO = 0o40;          // 32 — la malplena rando supre kaj malsupre
  k.lineCap = "round";
  k.lineJoin = "round";

  // ⟨ La desegno portas VERTIKALAJN liniojn 📃 ⟩ — du longaj, rondaj kudroj
  // malsupreniras de sub la kolumo ĝis la tuko, unu sur ĉiu flanko de la centra
  // kolono. La motivoj de la dua tavolo do sidas inter du vertikalaj strekoj,
  // kaj la horizontalaj elementoj malpliiĝis ( la stilo preferas la vertikalon ).
  for ( const dx of [ -0o126, -0o56, 0o56, 0o126 ] ) {
    k.strokeStyle = ombro(I, 0o3, 0o6/0o10);
    k.lineWidth = 0o2;
    k.beginPath();
    k.moveTo(0o200 + dx, MARGENO + 0o20);
    k.lineTo(0o200 + dx, h - MARGENO);
    k.stroke();
  }

  // ⟨ La koluma arko 📃 ⟩ — unu maldika, ronda streko sub la kolumo.
  k.strokeStyle = ombro(I, 0o2);
  k.lineWidth = 0o2;
  k.beginPath();
  k.moveTo(0o200 - 0o54, MARGENO + 0o10);
  k.quadraticCurveTo(0o200, MARGENO + 0o50, 0o200 + 0o54, MARGENO + 0o10);
  k.stroke();

  // ⟨ La brusta stelo 📃 ⟩ — kvarpinta stelo kun eĥa rombo malantaŭ ĝi. La
  // malfermita CIRKLA kadro malaperis, ĉar la interna ĉemizo nun havas neniajn
  // cirklojn. La eĥa rombo ankaŭ mallarĝiĝis de 0o62 al 0o42, do ĝi restas klare
  // for de la kvar vertikalaj kudroj ( ± 0o56 ) kaj de la koluma arko supre.
  rondaRombo(k, 0o200, 0o166, 0o42, 0o44, null, ombro(I, 0o2, 0o5/0o10), 0o2);
  kvarStelo(k, 0o200, 0o166, 0o24, Ax);
  kvarStelo(k, 0o200, 0o166, 0o11, Ix);

  // ⟨ La videbla fenestro de la interna ĉemizo 📃 ⟩ — la malfermaĵo de la robo
  // montras nur MALVARGA vertikala strio de la fronto: ĉe la brusto ĝi estas ± 6
  // rastrumeroj, ĉe la tuko ± 27. La motivoj de la supra parto ( la koluma arko,
  // la brusta stelo, la buko ĉe la zono ) do sidas KOMENCE MALANTAŬ la ŝtofo.
  // La centro nun portas sian propran desegnon, kaj ĝi sidas en la fenestro mem —
  // inter la kanvasaj vicoj 0o260 kaj 0o770, kie la malfermaĵo vere montriĝas.
  // ⟨ La centro estas EĤAJ RONDAJ SXEVRONOJ 📃 ⟩ — la antaŭa centro havis
  // cirklojn ( kvin butonojn kaj rondan bukon ) kaj la motivoj preskaŭ tuŝis unu
  // la alian. Nun la centro portas KVAR koncentrajn sxevronojn, do V-formojn kun
  // RONDAJ anguloj. Ĉiuj havas la saman supran alton kaj malsamajn pintojn, kaj
  // inter ili restas egala malplena spaco, do la formoj neniam tuŝas.
  k.lineCap = "round";
  k.lineJoin = "round";
  // ⟨ La sxevronoj MALSUPRENIRAS 📃 ⟩ — la pinto sidas SUPRE kaj la brakoj
  // malsupreniras, do la sxevronoj MALFERMIĜAS malsupren kaj sekvas la formon de
  // la malfermaĵo mem ( kiu ankaŭ mallarĝiĝas supren ). Antaŭe la pinto estis
  // malsupre kaj la brakoj supreniris, do en la mallarĝa fenestro videblis nur la
  // fundo de ĉiu sxevrono kaj la desegno legiĝis kiel tasoj MALSUPRENIGITAJ.
  const sxevrono = ( yPinto: number, duono: number, koloro: string, dikeco: number ) => {
    k.strokeStyle = koloro;
    k.lineWidth = dikeco;
    k.beginPath();
    k.moveTo(0o200 - duono, 0o600);
    k.lineTo(0o200 - duono * 0o3/0o10, yPinto + duono * 0o3/0o10);
    k.quadraticCurveTo(0o200 - duono * 0o1/0o5, yPinto, 0o200, yPinto);
    k.quadraticCurveTo(0o200 + duono * 0o1/0o5, yPinto, 0o200 + duono * 0o3/0o10, yPinto + duono * 0o3/0o10);
    k.lineTo(0o200 + duono, 0o600);
    k.stroke();
  };
  sxevrono(0o250, 0o52, ombro(I, 0o2, 0o5/0o10), 0o2);
  sxevrono(0o330, 0o40, ombro(I, 0o3, 0o6/0o10), 0o2);
  sxevrono(0o410, 0o30, ombro(A, 0o1), 0o2);
  sxevrono(0o470, 0o20, Ax, 0o2);

  // ⟨ La steloj flanke de la brusto kaj sub la zono 📃 ⟩ — malgrandaj kaj
  // DISE, kun malplena ŝtofo inter ili ( neniu vico, nenia krado ).
  for ( const dx of [ -0o102, 0o102 ] ) {
    kvarStelo(k, 0o200 + dx, 0o160, 0o12, ombro(I, 0o3));
    kvarStelo(k, 0o200 + dx, 0o160, 0o7, Ax);
    kvarStelo(k, 0o200 + dx, 0o440, 0o11, ombro(I, 0o2));
  }
  kvarStelo(k, 0o200, 0o360, 0o10, ombro(A, 0o1));
  kvarStelo(k, 0o200, 0o640, 0o13, ombro(A, 0o1));
  kvarStelo(k, 0o200, 0o640, 0o6, Ix);

  // ⟨ La dorso 📃 ⟩ — la sama stelo ĉe la kudro ( x = 0 kaj x = 0o400 ), kaj la
  // spina kudro mem kiel mola vertikala streko.
  volviX(k, () => kvarStelo(k, 0, 0o166, 0o20, ombro(I, 0o2)));
  volviX(k, () => {
    k.fillStyle = ombro(I, 0o1, 0o4/0o10);
    k.fillRect(-0o2, MARGENO, 0o4, h - MARGENO * 0o2);
  });

  // ⟨ La talio estas TUTE SENA 📃 ⟩ — ĝi antaŭe havis horizontalan kudron, rondan
  // bukon ( tri cirklojn ) kaj du pendantajn rubandojn. Ĉio malaperis, ĉar la
  // stilo volas neniajn cirklojn kaj neniajn horizontalajn strekojn. La sxevronoj
  // supre restas la solaj motivoj de la fronta centro.
}

// ⟨ La pantalono 📃 ⟩ — du mallongaj tuboj sub la robo. La videbla parto estas
// nur la supra parto de la tubo ( la robo kovras de supre, la botoj de malsupre ),
// do la motivoj koncentriĝas ĉe la supro kaj la malsupro restas trankvila ŝtofo.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param o ( Vesto ) - La vesto ( la koloroj ).
function pentriPantalonon(k: CanvasRenderingContext2D, o: Vesto): void {
  const w = k.canvas.width, h = k.canvas.height;
  const P = o.pantalono, A = o.akcenta;
  const Px = deksesuma(P), Ax = deksesuma(A);
  k.fillStyle = Px;
  k.fillRect(0, 0, w, h);
  sxtofon(k, P);
  faldo(k, 0o200, 0o40, P, 0o1, 0o3/0o10);   // la antaŭa gladlinio
  faldo(k, 0o60, 0o24, P, 0o1, 0o25/0o100);
  faldo(k, 0o340, 0o24, P, 0o1, 0o25/0o100);
  // ⟨ La akcenta RIMENO estas VERTIKALA 📃 ⟩ — la antaŭa versio metis la akcenton
  // kiel HORIZONTALAN bendon ĉirkaŭ la tibio, do ĝi legiĝis kiel dua manumo. Nun
  // la akcento estas VERTIKALA rimeno laŭ ĉiu flanka kudro — la sama strio, kiun
  // la stilo preferas ( vidu la ĉemizojn ) — kaj ĝi iras de la zono ĝis la boto,
  // do ĝi sekvas la kruron dum la tuta paŝo.
  // ⟨ La rimenoj estas MALDIKAJ kaj sur la KVAR ANGULOJ 📃 ⟩ — la antaŭa versio
  // metis du larĝajn rimenojn ( 0o12 rastrumerojn ) sur la ANTAŬAN kaj la
  // MALANTAŬAN mezlinion de la kruro ( u = 0.25 kaj 0.75 ), tie kie la sekco
  // estas plej plata — la akcento do legiĝis kiel du larĝaj strioj trans la
  // femurojn. Nun ĝi iras laŭ la KVAR ANGULOJ de la superelipsa sekco ( la
  // diagonaloj, ang = 45° · k → u = 0.125, 0.375, 0.625, 0.875 → la kanvasaj
  // kolumnoj 0o40, 0o140, 0o240, 0o340 ) kaj ĝi estas MALDIKA ( tri rastrumeroj
  // plus mallarĝa ombro ). Du maldikaj strioj videblas de antaŭe kaj du de
  // malantaŭe, kaj ili sekvas la kruron dum la tuta paŝo — ili estas vertikalaj.
  for ( const x of [ 0o40, 0o140, 0o240, 0o340 ] ) {
    k.fillStyle = ombro(A, 0o1, 0o5/0o10);
    k.fillRect(x - 0o2, 0, 0o5, h);
    k.fillStyle = Ax;
    k.fillRect(x - 0o1, 0, 0o3, h);
  }
  // ⟨ La AKCENTA rimeno ĉe la zono 📃 ⟩ — la supra rando de la tubo estas la zono
  // de la pantalono, do ĝi ricevas akcentan rimenon ( la sama lingvo kiel la apudaj
  // randoj de la ŝuo — la rimeno kaj la bota manumo vicigas sin en la mondo ).
  k.fillStyle = Ax;
  k.fillRect(0, 0, w, 0o3);
  k.fillStyle = ombro(A, 0o1, 0o5/0o10);
  k.fillRect(0, 0o3, w, 0o2);
  // ⟨ La videbla bendo de la kanvaso 📃 ⟩ — la robo kovras de supre, la boto de
  // malsupre, do nur mallonga bendo de la tubo videblas. Mezurite sur la reala
  // geometrio ( la mondaj altoj de la ringoj kontraŭ la kanvasaj vicoj ): la vico
  // 0.365 · 0o1000 = 0o555 estas la roba rando ( 0.4375 ) kaj la vico
  // 0.431 · 0o1000 = 0o657 estas la bota rando ( 0.3125 ) — la motivoj de ĉi tiu
  // pantalono do devas sidi INTER 0o555 kaj 0o657. Ĉio supre sidas sub la robo,
  // ĉio malsupre sidas en la boto.
  // ⟨ La tuko restas trankvila ĉe la boto 📃 ⟩ — la rimenoj ne ĉirkaŭiras la
  // tibion, do la bendo super la bota rando ( la vico 0o634 … 0o657 ) restas blua
  // kaj nur la kvar vertikalaj rimenoj eniras la ŝuon.
  k.fillStyle = ombro(P, 0o1, 0o5/0o10);
  k.fillRect(0, 0o657, w, 0o3);
  // ⟨ La motivoj estas STELOJ kaj MALHELAJ 📃 ⟩ — antaŭe ĉi tie estis vicoj de
  // HELAJ romboj ( la akcenta koloro ), do la pantalono legiĝis kiel helaj strioj
  // en blua ŝtofo. Nun la motivoj estas kvarpintaj STELOJ en la MALHELA nuanco de
  // la ĉefa koloro ( ombro(P, 0o2) ) — ili legiĝas kiel teksitaj motivoj — kaj ili
  // malpliiĝis kaj DISIGIS ( multe da malplena ŝtofo inter ili ). La lasta stelo
  // sidas SUR la akcenta rimeno, do la du motivoj apartenas unu al la alia.
  const steloj: [ number, number, number ][] = [
    [ 0o200, 0o564, 0o15 ],   // 372 — ĵus sub la roba rando
    [ 0o200, 0o613, 0o12 ],   // 395 — meze
    [ 0o200, 0o645, 0o11 ],   // 421 — sur la rimeno
    [ 0,     0o574, 0o11 ],   // 380 — ĉe la kudro ( volviX spegulas ĝin )
    [ 0,     0o625, 0o10 ],   // 405
  ];
  for ( const [ x, y, r ] of steloj ) {
    if ( x === 0 ) volviX(k, () => kvarStelo(k, 0, y, r, ombro(P, 0o2)));
    else kvarStelo(k, x, y, r, ombro(P, 0o2));
  }
  // ⟨ La malsupra horizontala bendo foriĝis 📃 ⟩ — ĝi estis la lasta horizontala
  // desegno de la pantalono ( kaj ĝi sidas ene de la boto, do oni neniam vidis
  // ĝin ). La akcento nun portas sin per la kvar vertikalaj rimenoj.
  k.fillStyle = ombro(P, 0o2);
  k.fillRect(0, h - 0o6, w, 0o3);
}

// ⟨ La maniko 📃 ⟩ — la foli-tondita tubo. ATENTU la direkton de la vertikalo.
// La unua ringo de la tubo ( la ŝultro ) havas uv.y = 0, do ĝi troviĝas ĉe la
// SUBA vico de la kanvaso ( y = 0o200 ); la tondita rando ( uv.y = 1 ) sidas ĉe
// la SUPRA vico ( y = 0 ). La motivoj sekvas tiun ordon.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param o ( Vesto ) - La vesto ( la koloroj ).
function pentriManikon(k: CanvasRenderingContext2D, o: Vesto): void {
  const w = k.canvas.width, h = k.canvas.height;
  const M = o.ĉefa, A = o.akcenta;
  const Mx = deksesuma(M), Ax = deksesuma(A);
  k.fillStyle = Mx;
  k.fillRect(0, 0, w, h);
  sxtofon(k, M);
  // la akcenta rimeno laŭ la tondita rando ( la kanvasa SUPRA vico ) — la
  // geometrio tondas la tubon en foliojn, do la rimeno sekvas la foli-siluetojn.
  k.fillStyle = Ax;
  k.fillRect(0, 0, w, 0o10);
  k.fillStyle = ombro(A, 0o1, 0o5/0o10);
  k.fillRect(0, 0o10, w, 0o3);
  // ⟨ Kvarpintaj steloj super la rimeno 📃 ⟩ — la sama motivo kiel la brusta stelo
  // ( kvarStelo ), sed malpli granda. Antaŭe ĉi tie estis etaj romboj, sed kvar
  // akraj romboj tiel proksime al la tondita rando legiĝis kiel ortanguloj; la
  // stelo havas la saman kvar-pintan silueton kiel la cetero de la vesto kaj
  // malfermiĝas malsupren, do la rimeno kaj la stelo apartenas al la sama familia
  // motivo. Ĉiu stelo estas 12 rastrumeroj larĝa ( r = 6 ), do la ok steloj
  // disiĝas egale ĉirkaŭ la tubo ( 16 rastrumeroj po stelo ).
  for ( let i = 0; i < 0o10; i++ )
    kvarStelo(k, i * 0o20 + 0o10, 0o26, 0o6, ombro(A, 0o1));
  // la ŝultra motivo — kvarpinta stelo ĉe la kudro ( x = 0 kaj x = w estas la
  // sama punkto, do la stelo desegniĝas ĉe ambaŭ kaj unu plia frontas ).
  kvarStelo(k, 0, h - 0o24, 0o22, Ax);
  kvarStelo(k, w, h - 0o24, 0o22, Ax);
  kvarStelo(k, w / 0o2, h - 0o24, 0o22, Ax);
  // la faldoj laŭ la tubo, kaj la ombro de la ŝultro supre.
  faldo(k, 0o40, 0o16, M, 0o1, 0o3/0o10);
  faldo(k, 0o100, 0o16, M, 0o1, 0o3/0o10);
  faldo(k, 0o140, 0o16, M, 0o1, 0o3/0o10);
  k.fillStyle = ombro(M, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o10, w, 0o10);
}
// VESTAJ_KANVASOJ — La kanvasa grando de ĉiu vestparto. La robo kaj la interna
// ĉemizo portas siajn motivojn sur 0o400 × 0o1000 ( la robo estas 0o1 mondunuon
// alta, do la kanvaso havas sufiĉe da rastrumeroj por la kudroj kaj
// la motivoj ); la maniko sidas sur 0o200 × 0o200 — ĝi estas mallonga tubo kaj
// 0o400 × 0o1000 estus malŝparo de tekstura memoro por ĉiu vesto.
const VESTAJ_KANVASOJ: Record<string, [ number, number ]> = {
  supra: [ 0o400, 0o1000 ],
  interno: [ 0o400, 0o1000 ],
  pantalono: [ 0o400, 0o1000 ],
  maniko: [ 0o200, 0o200 ],
};

// vestaTeksajxo — La kanvasa teksturo de unu vestparto ( kaŝmemorita po vesto kaj
// parto ). La kvar specoj estas la TUTA vesta teksturaro — la sama vesto ĉiam
// donas la samajn kanvasojn, do ĉiuj figuroj kun tiu vesto dividas ilin.
//     @param o ( Vesto ) - La vesto ( la koloroj ).
//     @param speco ( string ) - La parto ( supra · interno · pantalono · maniko ).
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksturo.
function vestaTeksajxo(o: Vesto, speco: string): THREE.CanvasTexture {
  const klavo = vestaTeksajxaKlavo(o, speco);
  const cacheita = vestaTeksajxaStoko.get(klavo);
  if ( cacheita ) return cacheita;
  const [ largho, alto ] = VESTAJ_KANVASOJ[speco] ?? VESTAJ_KANVASOJ.supra;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = largho; kanvasa.height = alto;
  const kunteksto = kanvasa.getContext("2d")!;
  if ( speco === "supra" ) pentriEksteran(kunteksto, o);
  else if ( speco === "interno" ) pentriInternan(kunteksto, o);
  else if ( speco === "pantalono" ) pentriPantalonon(kunteksto, o);
  else pentriManikon(kunteksto, o);
  const t = new THREE.CanvasTexture(kanvasa);
  t.colorSpace = THREE.SRGBColorSpace;
  // La motivoj aperu ĉe la fronto. La ŝovo ( 0o1/0o2 ) alportas la teksturcentron
  // ( kie la steloj, la romboj kaj la butona plateto estas ) al la fronto ( +z ).
  // La maniko ricevas NENIAN ŝovon — ĝiaj motivoj estas spegulaj ĉe la kudro de la
  // tubo, do la kudro restas meze de la motivo.
  t.wrapS = THREE.RepeatWrapping;
  if ( speco !== "maniko" ) t.offset.x = 0o1/0o2;
  vestaTeksajxaStoko.set(klavo, t);
  return t;
}

// --- Folia maniko ---
// kreiFoliaTonditanTubon — Konstruu tubon kies malsupra rando estas tondita en
// ripetatajn foliformajn lobojn. La rando mem sekvas foli-siluetojn ( pintoj
// pendantaj malsupren, V-noĉoj leviĝantaj inter la folioj ) — ne apartaj
// elstarantaj folioj. La geometrio ricevas ankaŭ UV-koordinatojn ( u ĉirkaŭ la
// tubo, v laŭ la alto ), por ke teksturaj aplikoj mapu glate.
//     @param suproR ( number ) - Supra radiuso.
//     @param malsuproR ( number ) - Malsupra radiuso.
//     @param suproY ( number ) - Alto de la supro-ringo.
//     @param bazoY ( number ) - Baza alto de la malsupra rando.
//     @param segmentoj ( number ) - Cirkla rezolucio.
//     @param loboj ( number ) - Kiom da foli-loboj ĉirkaŭ la rando.
//     @param profundo ( number ) - Kiom profunde la foli-pintoj pendas.
//     @param nocho ( number ) - Kiom alte la noĉoj leviĝas en la tubon.
//     @param fermitaSupro ( boolean = false ) - Ĉu fermi la supran ringon per kupolo
//         ( la ŝultro de la maniko ).
//     @returns geometrio ( THREE.BufferGeometry ) - La tondita tubo.
function kreiFoliaTonditanTubon(suproR: number, malsuproR: number, suproY: number,
  bazoY: number, segmentoj: number, loboj: number, profundo: number, nocho: number,
  fermitaSupro = false): THREE.BufferGeometry {
  const q = 0o3/0o4; // folia profilo — akra sed plena pinto
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let i = 0; i <= segmentoj; i++ ) {
    const ang = i / segmentoj * Math.PI * 0o2;
    const kx = Math.cos(ang), kz = Math.sin(ang);
    // Supro ringo.
    pozicioj.push(kx * suproR, suproY, kz * suproR);
    uvoj.push(i / segmentoj, 0);
    // Malsupro ringo — la folia tondo.
    const u = ( ang * loboj / ( Math.PI * 0o2 ) ) % 0o1; // 0 ĉe foli-pinto
    const v = Math.min(u, 0o1 - u) * 0o2;              // 0 pinto, 1 noĉo
    const folio = 0o1 - Math.pow(v, q);                // 1 pinto, 0 noĉo
    const y = bazoY + nocho - ( nocho + profundo ) * folio;
    pozicioj.push(kx * malsuproR, y, kz * malsuproR);
    uvoj.push(i / segmentoj, 1);
  }
  // La pozicioj estas interplektitaj ( supro_i, malsupro_i ), do ĉiu kvadrato
  // ligas la parajn suprojn ( 2i, 2i+2 ) al la neparaj malsuproj ( 2i+1, 2i+3 ).
  for ( let i = 0; i < segmentoj; i++ ) {
    const a = 0o2 * i, b = 0o2 * i + 0o2, c = 0o2 * i + 0o1, d = 0o2 * i + 0o3;
    // Ekstera orientiĝo — la normaloj montru eksteren.
    indeksoj.push(a, b, c, b, d, c);
  }
  // ⟨ La pinto de la maniko estas PLATA sed FERMITA 📃 ⟩ — la malnova ventumilo
  // turniĝis MALĜUSTE: ĝiaj normaloj montris MALSupren, do la fronta flanko estis
  // forĵetita de la bildigilo kaj la ŝultro de la maniko aspektis kiel MALFERMA
  // truo — oni vidis la INTERNON de la tubo ĉe la ŝultro. Nun la ventumilo
  // rondiras la ĝustan vojon ( la normaloj montras supren ), do la pinto estas
  // fermita plato.
  // ⟨ La plato estas la ŝultro mem 📃 ⟩ — ĝia alto ( suproY ) egalas la supran
  // randon de la ĉemiza ŝultro-kovrilo ( vidu kreiInternanSxelon ). Antaŭe la
  // maniko eliris el la ĉemizo 0.0156 SUB la kovila rando, do la ŝultro havis
  // ŝtupon kaj oni povis rigardi en la kavon inter la du tavoloj. Nun la du
  // randoj staras samalte, kaj la maniko legiĝas kiel daŭrigo de la ĉemiza
  // ŝultro ( la ronda disko de la manika pinto ricevas la saman konturon ).
  // ⟨ La pinto de la maniko estas MALALTA KUPOLO 🫧 ⟩ — antaŭe ĝi estis PLATA
  // disko kun la sama radiuso kiel la tubo, do la ŝultro de la brako finiĝis per
  // kvadrata breto, kiu elstaris el la ĉemizo. La plato nun rondiĝas supren per du
  // malgrandaj ringoj kaj pinto, do la deltoido finiĝas per RONDA ŝultro-kapo —
  // la sama form-lingvo kiel la sferoj de la kapo, sed multe pli malalta
  // ( 0.3 · la radiuso ), ĉar la ŝultro ne rajtas ŝveliĝi super la ĉemizan kolumon.
  // La pinto ankaŭ ricevas la saman UV-vicon kiel la tuba pinto, do la teksajxo
  // daŭriĝas sur la kupolon sen kudro.
  if ( !fermitaSupro ) return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
  const kupolAlto = suproR * 0.3;
  const etapoj: [ number, number ][] = [ [ 0.62, 0.55 ], [ 0.30, 0.86 ] ];
  const bazoj: number[] = [];
  for ( const [ rF, yF ] of etapoj ) {
    bazoj.push(pozicioj.length / 0o3);
    for ( let i = 0; i <= segmentoj; i++ ) {
      const ang = i / segmentoj * Math.PI * 0o2;
      pozicioj.push(Math.cos(ang) * suproR * rF, suproY + kupolAlto * yF,
        Math.sin(ang) * suproR * rF);
      uvoj.push(i / segmentoj, 0);
    }
  }
  const pinto = pozicioj.length / 0o3;
  pozicioj.push(0, suproY + kupolAlto, 0);
  uvoj.push(0o1/0o2, 0);
  // ⟨ La ventumiloj montras EKSTEREN 📃 ⟩ — la kupolo mallarĝiĝas supren, do la
  // SUPRA ringo de ĉiu paro estas la « a » de la ventumilo ( la malo de la tubo,
  // kie la malsupra ringo estas la a ). Sen la inversigo la normaloj montrus
  // INTERNEN kaj la tuta ŝultro malaperus.
  for ( let i = 0; i < segmentoj; i++ ) {
    indeksoj.push(bazoj[0] + i, bazoj[0] + i + 0o1, 0o2 * i,
      bazoj[0] + i + 0o1, 0o2 * i + 0o2, 0o2 * i);
    indeksoj.push(bazoj[1] + i, bazoj[1] + i + 0o1, bazoj[0] + i,
      bazoj[1] + i + 0o1, bazoj[0] + i + 0o1, bazoj[0] + i);
    indeksoj.push(bazoj[1] + i + 0o1, bazoj[1] + i, pinto);
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

// ⟨ La maniko 📃 ⟩ — Antaŭe la maniko estis tubo PLUS aparta akcenta ringo
// ( du meshoj por ĉiu brako ). Nun la akcenta bordo de la tondita rando estas
// PENTRITA en la tekston de la tubo ( vestaTeksajxo, parto "maniko" ), do la
// maniko estas unu mesho — kaj la bordo ankaŭ sekvas la foliojn pli fidele ol la
// maldika ringo, ĉar ĝi estas desegnita laŭ la UV-oj de la tubo mem.

// --- Figuro ---
export interface Figuro {
  group: THREE.Group;
  agordiVeston: ( o: Vesto ) => void;
  agordiHaranStilon: ( stilo: Harstilo ) => void;
  agordiHaranKoloron: ( koloro: number ) => void;
  hejmo: THREE.Vector3;
  celo: THREE.Vector3;
  atendo: number;
  rapido: number;
  // ⟨ La figuro havas propran ALTON 📏 ⟩ — la grupo mem estas skaliita per eta
  // faktoro ( vidu HALTO_GAMO kaj konstruiFiguron ), do la mondo havas homojn de
  // malsamaj altoj. La nombro restas ĉi tie por kalkuloj, kiuj bezonas la realan
  // alton de la figuro ( ekzemple etikedo super la kapo aŭ celo de rigardo ).
  alto: number;
  marsoFazo: number;          // akumulita marŝa fazo ( paŝa oscilo )
  movoFaktoro: number;        // 0 = staras, 1 = marŝas ( glata transiro )
  // ⟨ La palpebrumo havas sian propran tempilon 📃 ⟩ — la palpebrumo okazas
  // sendepende de la marŝo ( homo ankaŭ palpebrumas starante ), do ĝi ne povas
  // sekvi la paŝan FAZON — ĝi havas propran horloĝon. Ĉiu figuro ricevas hazardan
  // ekvaloron, do homamaso ne palpebrumas unisone.
  palpebraFazo: number;       // akumulita palpebra tempo ( sekundoj )
  palpebroj: THREE.Object3D;  // la haŭta folio super la okuloj
  kruroj: [ THREE.Object3D, THREE.Object3D ]; // pivot-grupoj [maldekstra, dekstra]
  brakoj: [ THREE.Object3D, THREE.Object3D ]; // pivot-grupoj [maldekstra, dekstra]
  // ⟨ La artikoj 📃 ⟩ — la genuo kaj la kubuto havas siajn proprajn pivot-grupojn
  // sub la kokso kaj la ŝultro, do la figuro fleksas la membrojn anstataŭ svingi
  // ĉiun membron kiel unu rigidan stangon. Vidu kreiKorpanKruropon kaj
  // kreiKorpanBrakon por la disigo de la geometrioj.
  genuoj: [ THREE.Object3D, THREE.Object3D ];
  kubutoj: [ THREE.Object3D, THREE.Object3D ];
  // ⟨ La ŝtofo kaj la kapo kiel animacieblaj partoj 📃 ⟩ — la robo kaj la
  // interna ĉemizo pendas de la zono ( roboGrupo ), la kapo kaj la haroj turniĝas
  // ĉirkaŭ la kolo ( kapoGrupo ), kaj la manikoj svingiĝas iomete MALFRUE
  // kontraŭ siaj brakoj. Sen ili la vestoj estus velditaj al la korpo kaj la
  // marŝo aspektus kiel unu rigida bloko.
  roboGrupo: THREE.Object3D;
  kapoGrupo: THREE.Object3D;
  // ⟨ La ceteraj animacieblaj partoj 📃 ⟩ — la torso ( la zono kiel pivoto, por
  // ke la ŝultroj turniĝu kontraŭ la koksoj kaj la supra korpo kliniĝu antaŭen ),
  // la maleolaj grupoj ( la ruliĝo de la plando ) kaj la har-grupo ( la malfruo de
  // la hararo kontraŭ la kapo ).
  torsoGrupo: THREE.Object3D;
  sxuoj: [ THREE.Object3D, THREE.Object3D ];
  haroGrupo: THREE.Object3D;
  manikoj: THREE.Object3D[];
  // ⟨ La interna ĉemizo havas sian propran pivoton 📃 ⟩ — la ĉemizo sidas en sia
  // propra grupo kies origino estas la ZONO, kaj tiu grupo sidas en la robo-grupo
  // ( la du tavoloj restas unu super la alia ). La geometrio de la ĉemizo estas en
  // la mondaj unuoj, do la mesho mem kompensas per −SASA_Y; sen la grupo la mesha
  // origino estus la GRUNDO kaj turno de la ĉemizo balancus ĝin per 1.5 metra
  // levilo. Kun la grupo la tuko sekvas la paŝon memstare — la mantelo kaj la
  // ĉemizo estas du tavoloj kaj ne pendas egale ( vidu marŝSvingon ).
  internoGrupo: THREE.Object3D;
  // ⟨ La du modeloj 📃 ⟩ — la meshoj de la homa modelo kaj tiuj de la vesto.
  // Vidu la blokon en konstruiFiguron; la du listoj estas ankaŭ markitaj per
  // userData.speco ( "korpo" / "vesto" ).
  korpoj: THREE.Object3D[];
  vestoj: THREE.Object3D[];
}

// ⟪ La anguloj de la malfermaĵo 🚪 ⟫
// rondigiMalfermanAngulon — Rondigu la angulon, kie la rando de la antaŭa
// malfermaĵo renkontas la suban randon de la robo. Tiuj du randoj renkontiĝis per
// proksimume 44°-a angulo, do la fronta rando de la robo finiĝis per PINTO ( la
// stilo volas rondon ). La tri randaj verticoj ĉe la angulo moviĝas sur malgrandan
// arkon — la du tanĝantaj punktoj kaj la mezo de la arko — do la rando kurbiĝas de
// la malfermaĵo en la tukon sen angulo. La arko estas malgranda ( 0.0078 ), do la
// silueto de la robo ne ŝanĝiĝas; nur la angulo mem malaperas.
// ⟨ Kial la verticoj kaj ne la profilo 📃 ⟩ — la leviĝo de la suba rando estas
// funkcio de la AZIMUTO, kaj la azimutoj de la ringo estas egale spacitaj; la
// rando de la malfermaĵo do neniam povas kurbiĝi supren per la profilo sola.
//     @param pozicioj ( number[] ) - La pozicioj de la lofto ( modifiĝas ).
//     @param kolonoj ( number ) - Kiom da kolonoj havas ĉiu ringo.
//     @param flanko ( number ) - +1 la maldekstra rando, −1 la dekstra.
function rondigiMalfermanAngulon(pozicioj: number[], kolonoj: number, flanko: number): void {
  const k = flanko > 0 ? kolonoj : 0;
  const najbaro = flanko > 0 ? kolonoj - 0o1 : 0o1;
  const indekso = ( v: number, kk: number ) => ( v * ( kolonoj + 0o1 ) + kk ) * 0o3;
  const legi = ( v: number, kk: number ) => new THREE.Vector3(pozicioj[indekso(v, kk)],
    pozicioj[indekso(v, kk) + 0o1], pozicioj[indekso(v, kk) + 0o2]);
  const skribi = ( v: number, kk: number, p: THREE.Vector3 ) => {
    pozicioj[indekso(v, kk)] = p.x;
    pozicioj[indekso(v, kk) + 0o1] = p.y;
    pozicioj[indekso(v, kk) + 0o2] = p.z;
  };
  const angulo = legi(0, k), tuko = legi(0, najbaro), rando = legi(0o1, k);
  const lauTuko = tuko.clone().sub(angulo).normalize();     // laŭ la suba rando
  const lauRando = rando.clone().sub(angulo).normalize();   // laŭ la malfermaĵo
  const turno = Math.acos(Math.max(-0o1, Math.min(0o1, lauTuko.dot(lauRando))));
  const duono = ( Math.PI - turno ) * 0o1/0o2;               // la duona angulo de la angulo
  const disto = MALFERMA_RONDO / Math.tan(duono);            // ĝis la tanĝantaj punktoj
  const enen = MALFERMA_RONDO / Math.sin(duono) - MALFERMA_RONDO;
  const mezo = lauTuko.clone().add(lauRando).normalize();
  skribi(0, k, angulo.clone().addScaledVector(mezo, enen));
  skribi(0, najbaro, angulo.clone().addScaledVector(lauTuko, disto));
  skribi(0o1, k, angulo.clone().addScaledVector(lauRando, disto));
}

// kreiMalfermanRobonSxelon — La ekstera ĉemizo, kiel TAVOLO de ringoj ( lofto ).
// Malsame ol la antaŭa konuso, la robo nun estas vera mantelo. La antaŭa parto
// estas MALFERMITA — la du bordoj disiĝas malsupren kaj montras la internan
// ĉemizon — la suba rando leviĝas V-forme ĉe la fronto, la talio pinĉiĝas, la
// brusto reflarĝiĝas kaj la supraĵo FERMIĜAS per ŝultra jugo kaj kolumo ( vidu
// la kolumajn ringojn sube ).
// ⟨ La UV-oj 📃 ⟩ La horizontala koordinato u venas el la SAMA funkcio kiel la
// malfermaĵo — u = 0 estas la fronta centro ( kiu, post la tekstura ŝovo 0o1/0o2,
// troviĝas meze de la kanvaso ), u pligrandiĝas al unu flanko, kaj u = 0o1/0o2
// estas la dorso. La vertikala koordinato estas la altfrakcio, do la motivoj de
// la kanvaso vicigas sin laŭ la mondo.
// ⟨ Kial lofto 📃 ⟩ La malfermaĵo ne eblas per cilindro — la truo antaŭe devas
// esti vera truo, ne pentrita. La lofto ankaŭ portas la pinĉitan talion kaj la
// ruliĝantan kolumon sen aldonaj meshoj.
//     @returns geometrio ( THREE.BufferGeometry ) - La robo, laŭ la mondaj unuoj.
function kreiMalfermanRobonSxelon(): THREE.BufferGeometry {
  // ⟨ La profilo 📃 ⟩ — mola A-linio kun malgranda talia pinĉo. La unua versio
  // havis radiuson 0o30/0o100 ĉe la suba rando — pli larĝa ol la ŝultroj plus la
  // brakoj — do la robo ne legiĝis kiel longa ĉemizo sed kiel vasta mantelo, kaj
  // la granda levo de la antaŭa rando ( 0o3/0o4 ) streĉis la unuajn vicojn en
  // platajn "flugilojn". Nun la profilo malkreskas de 0.254 ĉe la tuko ĝis
  // 0.219 ĉe la kolumo, kaj la lasta vico RULIĜAS la kolumon iomete eksteren —
  // la sama eksteren-kurbiĝanta rando kiel la oraj kadroj de la konstruaĵoj.
  // ⟨ La mantelo NE rajtas engluti la brakojn 📃 ⟩ — ĝi estas la plej LARĜA tavolo,
  // do ĉio, kio estas pli mallarĝa ol ĝi, malaperas. Antaŭe la tuko estis 0.273
  // dum la manumo de la maniko atingis nur 0.242 — la tutaj brakoj estis kaŝitaj
  // malantaŭ la verdaj flankoj de la mantelo kaj la figuro aspektis kiel sako kun
  // kapo. Nun la tuko estas 0.254 kaj la brakoj sidas pli malproksime ( vidu
  // konstruiFiguron ), do la manikoj elstaras el la mantelo kaj la brakoj LEGIĜAS
  // kiel brakoj. La mantelo ankaŭ malaltiĝas nur ĝis 0.39, dum la manikoj finiĝas
  // ĉe 0.61 — la manumoj do estas super la suba rando de la mantelo.
  // ⟨ La kolumo restas sub la ĉemizo 📃 ⟩ — la supra ringo estas 0.211, do ĝi
  // estas iomete PLI MALGRANDA ol la ŝultro-kovrilo de la ĉemizo ( 0.203, vidu
  // kreiInternanSxelon ) super ĝi. Alie la rando de la mantelo elstarus super la
  // ŝultroj kiel tendo kaj la ŝultro de la ĉemizo aspektus kiel ŝtupo.
  // ⟨ La sekco estas ELIPSO 📃 ⟩ — ĉiu radiuso ĉi tie estas la DUONLARĜO; la
  // profundo venas el ROB_PROFUNDO, do la sekco estas elipso — pli larĝa ol
  // profunda, kiel vera korpo ( antaŭe la robo estis rondo ).
  // La interna ĉemizo ( 0.227 malsupre, 0.195 supre ) kaj la torso restas ene kun
  // pli ol 0.027 da spaco sur la tuta alteco, do la tavoloj neniam tuŝiĝas.
  // ⟨ La mantelo devas ĉirkaŭi la svingiĝantajn krurojn 📃 ⟩ — la pantalono sidas
  // je ± 0.075 kun duonlarĝo 0.102, do ĝia ekstera rando atingas 0.177 ĉe la
  // kokso. Dum la paŝo la koksa parto de la pleto svingiĝas proksimume 0.06 antaŭen
  // kaj la mantelo mem ruliĝos malantaŭen; la pantalono do devas resti inter la
  // ĉemizo ( 0.227 ) kaj la mantelo ( 0.254 ).
  // ⟨ La supera duono MALLARĜIĜIS 📃 ⟩ — la tuta mantelo estis 0.25 larĝa ĝis la
  // kolumo, do la manikoj ( la plej ekstera punkto 0.30 ) elstaris nur 0.05 el ĝi
  // kaj la brakoj ne legiĝis kiel brakoj — la figuro aspektis kiel sako sen
  // manikoj. Nun la profilo estas MALLARĜA tra la tuta braka regiono ( 0.207 …
  // 0.227 ) kaj mallarĝiĝas nur malsupre al la tuko ( 0.246 ), do la manikoj
  // elstaras 0.08 … 0.10 — la brakoj legiĝas.
  // ⟨ La tavoloj restas vicigitaj 📃 ⟩ — la interna ĉemizo mallarĝiĝis per la sama
  // mapo ( vidu kreiInternanSxelon ), do la marĝeno inter la du tavoloj restas
  // 0.016 … 0.035 sur la tuta alteco kaj la mantelo neniam eniras la ĉemizon.
  const radiusoj = [ 0o77/0o400, 0o77/0o400, 0o72/0o400, 0o71/0o400, 0o70/0o400,
    0o67/0o400, 0o66/0o400, 0o66/0o400, 0o65/0o400 ];
  const vicoj = radiusoj.length;
  const kolonoj = 0o40;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let v = 0; v < vicoj; v++ ) {
    const t = v / ( vicoj - 0o1 );
    const r = radiusoj[v];
    const duono = malfermaDuono(t);
    for ( let k = 0; k <= kolonoj; k++ ) {
      const u = duono + ( 0o1 - 0o2 * duono ) * ( k / kolonoj );
      const ang = u * Math.PI * 0o2;
      const y = ROB_Y_MALSUPRO + ROB_ALTO * t + robLevigho(ang, t);
      pozicioj.push(Math.sin(ang) * r, y, Math.cos(ang) * r * ROB_PROFUNDO);
      uvoj.push(u, t);
    }
  }
  // ⟨ La supraĵo FERMIĜAS per jugo kaj kolumo 📃 ⟩ — la mantelo finiĝis per
  // VERTIKALA tubo kies lasta ringo estis malfermita cirklo ( 0.207 ), do de supre
  // oni vidis la mantelon kiel malplenan sitelon ĉirkaŭ la kolo — la rando estis
  // rekta tranĉo de cilindro, ne vestaĵo. Nun la tubo fermas sin per SXULTRA JUGO:
  // la ringoj supreniras kaj samtempe MALLARĜIĜAS ĝis la kolo, poste la rando
  // RULIĜAS malsupren kaj reen, do la kolumo havas dikecon kaj randon anstataŭ
  // maldika folio. La kolo ( 0.0898 … 0.1113 ) kaj la kolumo de la ĉemizo ( 0.0703
  // supre de 1.4531 ) sidas komforte ene de la novaj ringoj.
  // ⟨ La jugo restas EKSTERE de la ĉemizo 📃 ⟩ — la ĉemiza ŝultro-kovrilo estas
  // 0.1875 ( ĝis 1.4219 ) kaj ĝia koluma faldo 0.1563 ĉe 1.4453, do la jugo portas
  // 0.0195 … 0.0313 da marĝeno super ĝi. Tiu marĝeno estas bezonata : la robo
  // turniĝas ĉirkaŭ la zono dum la paŝo ( vidu marŝSvingon ) kaj ĝia supraĵo moviĝas
  // ĝis 0.013, dum la ĉemizo pendas de la ŝultra pivoto kaj apenaŭ moviĝas. Kun
  // pli malgranda marĝeno la ĉemiza ŝultro trapikus la jugon ĉe la plej forta
  // kliniĝo de la paŝo.
  // ⟨ La jugo ankaŭ sekvas la manikojn 📃 ⟩ — la ŝultra kupolo de la maniko
  // ( supro 1.443, vidu kreiFoliaTonditanTubon ) atingas 0.0703 de la manika akso,
  // do la ringoj de la jugo ( 0.1914 … 0.1797 ĉe tiuj altoj ) trapasas ĝin kaj
  // restas kaŝitaj ĝis la kupolo finiĝas; nur la plej supra parto de la kolumo
  // leviĝas super la ŝultroj.
  // ⟨ La UV-oj de la kolumo 📃 ⟩ — la jugaj ringoj uzas v = 1, la SAMAN vicon kiel
  // la supra rando de la tubo, do la koluma bendo de la kanvaso daŭriĝas supren
  // tra la tuta jugo sen kudro ( kaj la kubutaj motivoj de la kanvaso ne
  // pligrandiĝas ).
  // [ y, duonlarĝo ] de la jugo kaj de la kolumo, de malsupre supren
  const kolumajRingoj: [ number, number ][] = [
    [ 0o133/0o100, 0o65/0o400 ],   // 1.4219 — la ŝultro ( iomete sub la kovilo )
    [ 0o134/0o100, 0o64/0o400 ],   // 1.4375 — la deklivo
    [ 0o271/0o200, 0o60/0o400 ],   // 1.4453 — la bazo de la kolumo
    [ 0o135/0o100, 0o51/0o400 ],   // 1.4531 — la kolo ( 0.1602, pli larĝa ol la kolo )
    [ 0o273/0o200, 0o47/0o400 ],   // 1.4609 — la koluma deklivo
    [ 0o274/0o200, 0o45/0o400 ],   // 1.46875 — la pinto de la kolumo ( 0.1445 )
    [ 0o273/0o200, 0o51/0o400 ],   // 1.4609 — la faldo RULIĜAS reen ( la dikeco )
  ];
  for ( const [ y, r ] of kolumajRingoj ) {
    for ( let k = 0; k <= kolonoj; k++ ) {
      const ang = k / kolonoj * Math.PI * 0o2;
      pozicioj.push(Math.sin(ang) * r, y, Math.cos(ang) * r * ROB_PROFUNDO);
      uvoj.push(k / kolonoj, 0o1);
    }
  }
  const ĉiujVicoj = vicoj + kolumajRingoj.length;
  for ( let v = 0; v < ĉiujVicoj - 0o1; v++ ) {
    for ( let k = 0; k < kolonoj; k++ ) {
      const a = v * ( kolonoj + 0o1 ) + k, b = a + 0o1;
      const c = a + kolonoj + 0o1, d = c + 0o1;
      indeksoj.push(a, c, b, b, c, d);
    }
  }
  // ⟨ La anguloj de la malfermaĵo RONDIĜAS 📃 ⟩ — la du malsupraj anguloj de la
  // malfermaĵo ( vidu rondigiMalfermanAngulon ).
  for ( const flanko of [ -0o1, 0o1 ] ) rondigiMalfermanAngulon(pozicioj, kolonoj, flanko);
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

// kreiInternanSxelon — La interna ĉemizo, kiel TAVOLO de ringoj ( lofto ), la
// sama konstruo kiel la robo. Antaŭe ĝi estis 0o14-flanka CILINDRO — ĝia supra
// rando estis horizontala tranĉo ĉe la ŝultra linio, do la ĉemizo legiĝis kiel
// tubo kaj la ŝultroj restis nudaj. Nun ĝi havas SURLINION.
// ⟨ La ĉemizo ĉirkaŭas la kolon 📃 ⟩ — la supra parto supreniras super la
// ŝultrojn ( samlarĝe kiel la ŝultroj, do la haŭto neniam trapikas ) kaj finiĝas
// per mallonga kolumo ĉirkaŭ la kolo. La kolumo estas PLI MALLLARĜA ol la roba
// kolumo ( 0.219 ), do la ĉemizo ne ŝveliĝas preter la mantelo — ĝi nur leviĝas
// el ĝi, kiel vera ĉemizo sub mantelo.
// ⟨ La sekco sekvas la robon 📃 ⟩ — la KORPAJ ringoj uzas la saman elipson (
// la profundo 0.75 de la larĝo ) kaj la saman angulan konvencion ( u = 0 ĉe la
// fronto, u = 0o1/0o2 ĉe la dorso ), do la motivoj de la interna kanvaso
// vicigas sin kun la ekstera. Nur la KOLUMO estas preskaŭ RONDA — la kolo mem
// estas cilindro, do ronda kolumo ĉirkaŭas ĝin sen trapiki ĝin antaŭe aŭ
// malantaŭe ( vidu la ringojn en kreiInternanSxelon ).
//     @returns geometrio ( THREE.BufferGeometry ) - La ĉemizo, laŭ la mondaj unuoj.
function kreiInternanSxelon(): THREE.BufferGeometry {
  // [ y, duonlarĝo, profundo ] de la malsupro supren. La KORPAJ ringoj sekvas la
  // torson ( 0.227 malsupre, 0.203 supre ) kun la elipsa profundo ROB_PROFUNDO;
  // la supraj ringoj portas propran profundon, ĉar la kolumo ĉirkaŭas la RONDAN
  // kolon anstataŭ la elipsan torson.
  // ⟨ La subaj ringoj sekvas la NOVAN torson 📃 ⟩ — la talio supreniris al 1.0781
  // kaj la ingveno al 0.8359, do la ringoj de la korpo ( la kokso 0.9297, la
  // talio 1.0781, la brusto 1.2578 ) sekvas la samajn altojn kiel la torso — la
  // ĉemizo do restas egala tavolo super la korpo, nur pli mallonga.
  // ⟨ La ŝultro-kovrilo estas MALLARĜA 📃 ⟩ — ĝi estas 0.203, nome iomete pli ol
  // la duono de la ekstera rando de la maniko ( 0.266, vidu konstruiFiguron ).
  // Antaŭe ĝi estis 0.227, do ĝi preskaŭ atingis la manikon kaj la tuta ŝultro
  // de la brako malaperis SUB la ŝtofon — la brakoj aspektis kiel enfalintaj en
  // la torson. La profundo ( 0.84 ) estas pli granda ol la larĝo de la elipso,
  // ĉar la ŝultro de la korpo estas pli cirkla ol la brusto kaj la mantelo
  // ruliĝas ĉirkaŭ la zono dum ĉiu paŝo ( vidu marŝSwingon ).
  // ⟨ Ankaŭ la ĉemizo MALPLIIĜIS 📃 ⟩ — la mantelo mallarĝiĝis ĝis 0.207 … 0.246,
  // do la ĉemizo sekvis per la sama mapo ( 0.1875 malsupre … 0.1875 supre ) kaj
  // la marĝeno inter la du tavoloj restas 0.016 … 0.035. La ĉemizo restas
  // SUFĈE LARĜA ĉirkaŭ la ŝultroj ( 0.1875 kontraŭ la torso 0.160 ) — la torso
  // ruliĝas ± 0.023 dum la paŝo, do la haŭto ankoraŭ ne trapikas la ŝtofon.
  // ⟨ La kokso kaj la tuko PLILARĜIĜIS 📃 ⟩ — la malsupraj ringoj estas 0.0078
  // pli larĝaj ol antaŭe. La kokso de la figuro estas 0.1914 larĝa ( la kruroj ± 0.09375
  // kun la pantalona radiuso 0.0977 ) kaj la malnova ĉemizo atingis 0.1953 tie — nome
  // nur 0.004 da spaco, do la pantalono trapikis la ĉemizon per 0.034 dum la paŝo ( la
  // kruro puŝas la tukon antaŭen kaj la torso kliniĝas malantaŭen ). La pli larĝa tuko
  // lasas 0.019 da aero ĉe la sama alto, kaj la mantelo ( 0.2188 … 0.2461 ) ankoraŭ
  // restas 0.012 ekstere de ĝi. La supra parto de la ĉemizo NE ŝanĝiĝis — la ŝultroj
  // devas resti mallarĝaj, ĉar la manikoj eliras el sub ili.
  const ringoj: [ number, number, number, number ][] = [
    [ INTERNO_Y_MALSUPRO, 0o70/0o400, ROB_PROFUNDO, 0o1 ],      // 0.578125 — la tuko
    [ 0o3/0o4,            0o66/0o400, ROB_PROFUNDO, 0o1/0o2 ],  // 0.7500
    [ 0o167/0o200,        0o64/0o400, ROB_PROFUNDO, 0 ],        // 0.9297 — la kokso
    [ 0o212/0o200,        0o60/0o400, ROB_PROFUNDO, 0 ],        // 1.0781 — la talio
    [ 0o241/0o200,        0o60/0o400, ROB_PROFUNDO, 0 ],        // 1.2578 — la brusto
    [ 0o131/0o100,        0o60/0o400, ROB_PROFUNDO, 0 ],        // 1.3906 — la ŝultra linio ( ene de la roba kolumo )
    [ 0o132/0o100,        0o60/0o400, 0o33/0o40, 0 ],           // 1.4063 — la ŝultro-kovrilo ( pli RONDA )
    [ 0o133/0o100,        0o60/0o400, 0o33/0o40, 0 ],           // 1.4219 — la rando de la kovrilo ( la maniko eliras ĉi tie )
    [ 0o134/0o100,        0o55/0o400, 0o33/0o40, 0 ],           // 1.4375 — la ŝultra deklivo supren
    [ 0o271/0o200,        0o50/0o400, 0o34/0o40, 0 ],           // 1.4453 — la koluma faldo ( ruliĝas eksteren )
    [ 0o135/0o100,        0o22/0o200, 0o1, 0 ],                 // 1.4531 — la kolumo, nun RONDA
    [ 0o273/0o200,        0o22/0o200, 0o1, 0 ],                 // 1.4609
    [ INTERNO_Y_SUPRO,    0o23/0o200, 0o1, 0 ],                 // 1.46875 — la pinto
  ];
  // ⟨ La tuko estas pli MALALTA antaŭe ol malantaŭe 📃 ⟩ — la interna ĉemizo havas
  // KLINITAN tukon: la rando sidas pli supre antaŭe ( la ventro liberiĝas kaj la
  // pantalono montriĝas tra la antaŭa malfermaĵo de la robo ) kaj pli malalte
  // malantaŭe ( la dorso de la ĉemizo restas longa ), — sed ĝi estas ankoraŭ
  // FERMITA tubo: la interna ĉemizo havas NENIAN antaŭan malfermaĵon, nur la
  // klinitan randon. La lasta kolumno de la tabelo ( p ) diras kiom da la klino
  // ĉiu ringo portas, do nur la du plej malsupraj ringoj klinas sin.
  const TUKA_LEVO = 0o1/0o10;   // 0.1 — kiom la antaŭa tuko estas pli alta ol la malantaŭa
  const tukaLevo = (ang: number, p: number) => TUKA_LEVO * p * ( Math.cos(ang) + 0o1 ) / 0o2;
  // 0o24 kolonoj ( ne 0o20 ) — la kolumo ĉirkaŭas la kolon kun 0.04 … 0.05 da
  // spaco, do pli malalta poligono tranĉus la kolon per siaj kordoj.
  const kolonoj = 0o24;
  const vicoj = ringoj.length;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let v = 0; v < vicoj; v++ ) {
    const [ y, r, prof, p ] = ringoj[v];
    for ( let k = 0; k <= kolonoj; k++ ) {
      const u = k / kolonoj;
      const ang = u * Math.PI * 0o2;
      pozicioj.push(Math.sin(ang) * r, y + tukaLevo(ang, p), Math.cos(ang) * r * prof);
      uvoj.push(u, ( y - INTERNO_Y_MALSUPRO ) / INTERNO_ALTO);
    }
  }
  for ( let v = 0; v + 0o1 < vicoj; v++ ) {
    for ( let k = 0; k < kolonoj; k++ ) {
      const a = v * ( kolonoj + 0o1 ) + k, b = a + 0o1;
      const c = a + kolonoj + 0o1, d = c + 0o1;
      indeksoj.push(a, c, b, b, c, d);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

// ⟨ kreiRondanKeston foriĝis 📃 ⟩ — ĉiu ŝua parto uzas la ringan surfacon de
// kreiBotan kaj la kapo uzas sferojn, do la ekstrudita skatolo ( la malnova
// piedo, la malnova plando kaj la malnova nazo ) ne plu havas uzanton. La
// formo-modulo restas por la ceteraj partoj de la mondo.

// ⟪ La haraj UV-oj 🧵 ⟫
// La hararo estas DU geometrioj ( la ĉapo sur la kranio kaj la kurteno malantaŭe —
// vidu haranGeometrion ), sed ĝi devas legiĝi kiel UNU hararo. Se ĉiu parto portas
// sian propran UV-amplekson, la tufoj de la kurteno larĝiĝas kaj la harfadenoj
// saltas ĉe la linio, kie la kurteno eliras el sub la ĉapo. La mapado do estas
// CILINDRA kaj KOMUNA por la tuta hararo — la azimuto donas u kaj la MONDALTO
// donas v ( la sama konvencio kiel la interna ĉemizo, vidu kreiInternanSxelon ) —,
// do la sama angulo ricevas la saman u sur ambaŭ meshoj kaj la fadeno de la ĉapo
// daŭriĝas sen salto sur la kurtenon.
// ⟨ Kiom da kaheloj 📃 ⟩ — la kapo ĉirkaŭas unu turnon ( ĉirkaŭ 1.19 m ) kun 0o4
// teksturaj kaheloj, do unu kahelo kovras 0.30 m kaj la haro ricevas tufojn de
// proksimume 2.7 mm. La kurteno sidas sur la sama radiuso, do kun la sama mapado
// ĝiaj tufoj havas la saman mondan larĝon kiel tiuj de la ĉapo — antaŭe ĝia
// propra amplekso larĝigis ilin preskaŭ trifoje.
const HARAJ_UV_SUPRO = 0o166/0o100;      // 1.84375 — super la krono de la ĉapo
const HARAJ_UV_MALSUPRO = 0o104/0o100;   // 1.0625 — la malsupra rando de la kurteno
const HARAJ_UV_TURNOJ = 0o4;             // la teksturaj kaheloj ĉirkaŭ unu turno
//     @param ang ( number ) - La azimuto ( 0 antaŭe, pli granda dekstren ).
//     @returns u ( number ) - La horizontala UV de la haro.
function haraU(ang: number): number {
  return ang / ( Math.PI * 0o2 ) * HARAJ_UV_TURNOJ;
}

//     @param y ( number ) - La mondalto de la punkto de la haro.
//     @returns v ( number ) - La vertikala UV ( 0 ĉe la krono, 1 ĉe la rando ).
function haraV(y: number): number {
  return ( HARAJ_UV_SUPRO - y ) / ( HARAJ_UV_SUPRO - HARAJ_UV_MALSUPRO );
}

// kreiHaranKurtenon — Konstruu fleksitan haran kurtenon kiu ĉirkaŭas la
// malantaŭon de la kapo kaj falas ĝis la ŝultroj, kun skalopita ( pinteca )
// malsupra rando kiel harfringo. La kurteno estas pli larĝa sube, do ĝi elstaras
// ekster la roba silueto kaj restas videbla de malantaŭe.
//     @returns geometrio ( THREE.BufferGeometry ) - La har-kurteno, ĉe la kapo.
function kreiHaranKurtenon(): THREE.BufferGeometry {
  const vicoj = 0o20, kolonoj = 0o40;
  // ⟨ La kurteno restas MALANTAŬE 📃 ⟩ — antaŭe ĝi etendiĝis ±90° de la dorso, do
  // ĝiaj plej flankaj punktoj ( x = ± r ) troviĝis ĝuste super la manikoj kaj la
  // haroj trapikis la ŝultrojn. Nun ĝi etendiĝas ±66°, do ĝiaj finoj sidas 0.09
  // malantaŭ la manika akso — la hararo drapiĝas sur la DORSON de la ĉemizo.
  const fiMax = 0o115/0o100;        // radianoj — 1.203, do ±69° de la dorso
  // ⟨ La kurteno estas mallonga bobo 📃 ⟩ — antaŭe ĝi iris ĝis y = 0.94 kaj
  // disfloris al radiuso 0.42, do ĝi estis pli larĝa ol la robo mem kaj la
  // longhara NPC aspektis kiel portanta nigran mantelon. Nun ĝi finiĝas ĉe la
  // ŝultroj ( y = 1.375 ) kun radiuso 0.203 — la haro drapiĝas sur la ŝultrojn,
  // nur iomete ekster la kolumo.
  // ⟨ La supra rando kaŝiĝas en la ĉapo 📃 ⟩ — la ĉapo nun estas ŝelo kiu sekvas
  // la kranion ( vidu kreiHaranĈapon ), do ĝia radiuso ĉe la alto 1.70 estas nur
  // 0.154. La kurteno komenciĝas je 1.703 kun radiuso 0.133, do ĝia supra rando
  // restas INTERNE de la ĉapo kaj la kudro ne videblas.
  // ⟨ La kurteno finiĝas SUPER la kolumo 📃 ⟩ — antaŭe ĝi iris ĝis 1.375 ( sub la
  // kolumo de la ĉemizo 1.4063 kaj de la robo 1.3906 ) kun radiuso 0.172, do ĝia
  // malsupra rando SINKIS en la kolumojn kaj la haroj malaperis en la ŝtofon dum
  // la kapo kliniĝis. Nun ĝi finiĝas ĉe 1.3906 — la pinto de la roba kolumo — kaj
  // ĝia radiuso ( 0.2266 ) estas PLI GRANDA ol tiu kolumo ( 0.2109 ) kaj ol la
  // ŝultro-kovrilo de la ĉemizo ( 0.203 ), do la haroj drapiĝas SUR la kolumoj
  // anstataŭ en ili. Sub tiu alto la kurteno tute ne ekzistas.
  // ⟨ La kurteno estas LONGA kaj FLUA 📃 ⟩ — antaŭe ĝi finiĝis ĉe 1.3906 ( la
  // pinto de la roba kolumo ), do la longhara NPC portis BOBON: la hararo estis
  // tranĉita per preskaŭ horizontala linio ĉe la kolumoj. Nun ĝi falas ĝis
  // 1.0625 — la talio — kaj ĝia malsupra rando ONDAS, do la haroj legiĝas kiel
  // longa fluanta hararo anstataŭ kiel kasko.
  // ⟨ La kurteno sekvas la DORSAN konturon 📃 ⟩ — la haro-grupo sidas 0.094
  // malantaŭ la kapo, sed la mesho mem kompensas tiun ŝovon ( vidu
  // haranGeometrion ), do la geometrio de la kurteno estas jam en la mondaj
  // koordinatoj kaj ĝia akso sidas sur la kap-akso. La kurteno eliras el la
  // harĉapo kaj FALAS malantaŭ la dorso — ĝi neniam trafas la kolumojn nek la
  // mantelon.
  const ySupro = 0o155/0o100, yMalsupro = 0o104/0o100;
  // ⟨ La sekco de la kurteno sekvas la robon 📃 ⟩ — la malantaŭo de la robo NE
  // estas rondo: ĝia sekco estas RONDIGITA ORTANGULO ( duonlarĝo 0.218,
  // duonprofundo 0.175, potenco 3 — mezurite sur la meshoj ). Rondo de radiuso
  // 0.20 restus ekster ĝi nur ĉe la mezo, do la videbla hararo legiĝus kiel
  // mallarĝa vosto. La kurteno do ELVOLVIĜAS de rondo ( ĉe la kranio ) al
  // superelipso ( ĉe la dorso ) kaj kuŝas kiel LARĜA tavolo super la tuta dorso.
  // ⟨ La kurteno ELVOLVIĜAS TIUJ ĈE LA KOLUMO 📃 ⟩ — la hararo eliras el sub la
  // harĉapo ĈE la kranio ( 0.11 ) kaj devas esti pli larĝa ol la mantelo ( 0.188 )
  // jam ĉe la kolumo ( la mondo 1.45 ), nur 0.1 sub la krono. La malnova profilo
  // kreskis per t^0.6, do ĉe la kolumo ĝi estis nur 0.173 — INTERNE de la mantelo
  // kaj la hararo trairis la dorson de la ĉemizo dum la kapo bobis ( la mezurita
  // penetro estis 0.035 ). Nun la kresko estas 1 − ( 1 − t )⁵, kiu preskaŭ
  // kompletas jam ĉe t = 0.2, do la kurteno sidas ekster la ŝtofo ekde la kolumo
  // malsupren kaj restas preskaŭ egallarĝa — kiel vera hararo, kiu disvastiĝas
  // super la ŝultroj kaj poste pendas.
  const larĝMalsupro = 0o100/0o400, profMalsupro = 0o73/0o400;
  // rSupro 0.156 estas pli mallarĝa ol la harĉapo ( 0.188 ), do la supra rando
  // de la kurteno sidas INTERNE de la ĉapo kaj la kudro ne videblas. Kun
  // 0.1875 la du randoj preskaŭ koincidis kaj la kurteno montris sian tranĉitan
  // supran randon kiel du platajn ortangulojn flanke de la vizaĝo.
  const rSupro = 0o11/0o100;

  const pozicioj: number[] = [];
  const normaloj: number[] = [];
  const indeksoj: number[] = [];
  // ⟨ La harfadenaj UV-oj 📃 ⟩ — la kurteno antaŭe havis NENIAJN UV-ojn, do la
  // har-teksajxo specimeniĝis ĉe unu sola punkto kaj la kurteno restis plata
  // koloro dum la ĉapo havis fadenojn. Poste ĝi havis propran u-amplekson
  // ( 0o43/0o100 de turno por ±69° ), kiu tamen estis malĝusta — la tufoj de la
  // kurteno larĝiĝis preskaŭ trifoje kaj la fadenoj saltis ĉe la ĉapo. Nun u kaj v
  // venas el la KOMUNA cilindra mapado super la tuta hararo ( vidu haraU kaj
  // haraV ), do la tufa larĝo kaj la fadena fazo restas la samaj trans la kudro.
  const uvoj: number[] = [];
  for ( let v = 0; v <= vicoj; v++ ) {
    const t = v / vicoj;
    // ⟨ La sekco kreskas NELINIE 📃 ⟩ — la hararo disiĝas super la ŝultroj ( kie
    // la kapo estas larĝa ) kaj poste pendas preskaŭ vertikale, do la profilo
    // estas kurbo anstataŭ konuso. La kvin-pota formo faras la kurbo JENAN :
    // preskaŭ la tuta kresko okazas dum la unua kvinono de la falo ( la ŝultroj ),
    // kaj la cetero pendas egallarĝa. La du duonaksoj de la superelipso kreskas
    // kune, do la sekco restas glata tra la tuta falo.
    const elvolvo = 0o1 - Math.pow( 0o1 - t, 0o5 );
    const larĝoK = rSupro + ( larĝMalsupro - rSupro ) * elvolvo;
    const profoK = rSupro + ( profMalsupro - rSupro ) * elvolvo;
    const potenco = 0o2 + t;
    const y = ySupro + ( yMalsupro - ySupro ) * t;
    for ( let k = 0; k <= kolonoj; k++ ) {
      const fi = -fiMax + k / kolonoj * 0o2 * fiMax;
      // ⟨ La malsupra rando 📃 ⟩ — la mezo ( la dorso ) estas la plej malalta
      // punkto, kaj la du finoj KURBIĜAS SUPRE ( la kvaroncirklo sube ). La
      // hararo do finiĝas per suprenkurba flanko, kiel veraj harfinoj. La sama
      // rando ankaŭ kuntiras la sekcon ĉe la finoj, do la haroj finiĝas KURBE
      // malantaŭ la oreloj.
      const rando = Math.abs(k / kolonoj - 0o1/0o2) * 0o2;   // 0 meze, 1 ĉe la finoj
      // ⟨ La flankoj RONDIĜAS 📃 ⟩ — la levigilo estis rando², kies deklivo ĉe la
      // finoj estas 2, do la malsupra rando renkontis la FLANKAN randon per angulo
      // ( la hararo finiĝis per akra angulo super la ŝultro ). La kvaroncirklo
      // ( 1 − √( 1 − rando² ) ) havas la samajn finpunktojn sed VERTIKALAN
      // deklivon ĉe la finoj, do ĝi kurbiĝas glate en la flankan randon kaj la
      // haroj finiĝas per ronda transiro. Ĝi ankaŭ tenas la mezon pli plata, do la
      // centra pinto restas la sola pinto.
      const supren = 0o1 - Math.sqrt(Math.max(0, 0o1 - rando * rando));
      const tucko = rando * rando;
      // La kurbiĝo 1 − ( 1 − rando )^1.5 havas deklivon ĉe la mezo ( la pinto ) sed
      // nulan deklivon ĉe la finoj ( la glataj flankoj ).
      const pinto = 0o1 - Math.pow( 0o1 - rando, 0o3/0o2 );
      const finoY = ( 0o1/0o10 * supren - 0o1/0o40 * ( 0o1 - pinto ) ) * t;
      // ⟨ La hararo havas FAKSJOJN 📃 ⟩ — la radiuso ondiĝas per kvin molaj loboj,
      // kiuj fortiĝas malsupren ( t ), do la malsupra parto de la kurteno legiĝas
      // kiel faskoj da haro anstataŭ kiel glata konko.
      // ⟨ La faskoj estas MOLAJ 📃 ⟩ — la ondo de la radiuso malaltiĝis de 0.075
      // al 0.04, ĉar kun la pli profunda ondo la silueto montris skallopojn ( kaj
      // la mantelo kovras la plej grandan parton de la kurteno, do oni vidis nur
      // la randon mem ). Nun ĝi nur milde ondigas la staturon.
      const fasko = 0o1 + 0o1/0o25 * t * Math.cos(fi * 0o5);
      // La punkto de la superelipso en la direkto fi — k solvas
      // ( k sin fi / larĝoK )^p + ( k cos fi / profoK )^p = 1, do la sekco estas
      // rondo ĉe p = 2 ( ĉe la kranio ) kaj rondigita ortangulo ĉe p = 3 ( ĉe la
      // dorso ). Unu formulo tenas ambaŭ finojn.
      const s = Math.abs(Math.sin(fi)), ko = Math.abs(Math.cos(fi));
      const kK = 0o1 / Math.pow(Math.pow(s / larĝoK, potenco) + Math.pow(ko / profoK, potenco), 0o1 / potenco);
      const rK = kK * ( 0o1 - 0o3/0o20 * tucko ) * fasko;
      const x = Math.sin(fi) * rK;
      const z = -Math.cos(fi) * rK;
      // ⟨ La finoj LEVIĜAS 📃 ⟩ — la malsupra vico leviĝas 0.1 ĉe la du finoj
      // ( la sama tucko ankaŭ kuntiras la sekcon tie ), do la hararo finiĝas per
      // suprenkurba flanko anstataŭ per akra angulo super la manikoj.
      pozicioj.push(x, y + finoY, z);
      // Ekstera normalo — radiala horizontala direkto, for de la kapo-akso.
      normaloj.push(Math.sin(fi), 0, -Math.cos(fi));
      // La azimuto de la ĉapo estas π − fi ( la kurteno mezuras de la dorso, la
      // ĉapo de la fronto ), do haraU ricevas la SAMAN angulon kiel la ĉapo.
      uvoj.push(haraU(Math.PI - fi), haraV(y + finoY));
    }
  }
  for ( let v = 0; v < vicoj; v++ ) {
    for ( let k = 0; k < kolonoj; k++ ) {
      const a = v * ( kolonoj + 0o1 ) + k, b = a + 0o1;
      const c = a + kolonoj + 0o1, d = c + 0o1;
      indeksoj.push(a, b, d, a, d, c);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { normaloj, uvoj });
}

// ⟨ La flankaj har-strioj estis forigitaj 📃 ⟩ — la malnova kreiHaranFlankon
// konstruis PLATAN rubandon de la tempio ĝis la genuoj. Ĝi ne havis dikecon,
// do la lumo falis egale sur ĝin kaj ĝi legiĝis kiel klingo, ne kiel hartufo
// ( kaj kun la pli longa kurteno ĝi faris du klingojn ĉe la vizaĝo ). La
// kurteno nun ĉirkaŭas pli antaŭen ( fiMax 0o157/0o100 ≈ 100° ) kaj mem kadras
// la vizaĝon per vera kurbiĝanta surfaco, do la apartaj strioj ne plu necesas.

// har-koloroj — malhelbruna ĝis ruĝeta malhelbruna. Ĉiu NPC ricevas propran
// nuancon per hazarda mikso inter la du, por ke la homamaso ne aspektu unuforma.
const harKoloroA = new THREE.Color(0x201810); // malhelbruna
const harKoloroB = new THREE.Color(0x402818); // ruĝeta malhelbruna
const harKoloro = new THREE.Color();            // provizora miksita koloro

// ⟪ La okuloj 👁️ ⟫
// ⟨ La okulaj koloroj 📃 ⟩ — ĉiu paletro havas DU kolorojn kaj la pupilo montras
// ilin en tri horizontalaj bendoj. La meza bendo estas la MIKSO de la du, do la
// okulo transiras de unu nuanco al la alia sen vera gradiento. KNAKEHE permesas nur
// la kolorojn #nmnmnm ( ĉiu kanalo oblo de 8 ), do ankaŭ la mikso RONDIGIĜAS al tiu
// krado — la transira bendo do restas laŭregula.
const okulaKrado = (kanalo: number): number =>
  Math.min(0o370, Math.round(kanalo / 0o10) * 0o10);
function okulaMikso(a: number, b: number): number {
  const mezumo = (sxovo: number): number =>
    okulaKrado(( ( a >> sxovo & 0xff ) + ( b >> sxovo & 0xff ) ) / 0o2);
  return mezumo(0o20) << 0o20 | mezumo(0o10) << 0o10 | mezumo(0);
}
// ⟨ La mezuroj de la okulo 📃 ⟩ — la duonlarĝo kaj la duonalto de la folio. La
// kanvasa pentraĵo kaj la geometrio ( vidu kreiOkulon ) devas uzi la SAMAN
// nombrojn, ĉar la blanka okulglobo pentriĝas per la folia kurbo mem — se la du
// disiĝus, la rando de la blanka areo ne plu kongruus kun la rando de la okulo.
const OKULA_LARĜO = 0o4/0o200;    // 0.03125
const OKULA_ALTO = 0o13/0o1000;   // 0.0215
// La pozicio de la okulo sur la kranio — uzata ankaŭ de la brovoj kaj de la
// okulharoj ( vidu kreiVizaĝajnStrikojn ), do ĝi estas nomita unufoje.
// ⟨ La okuloj LEVIĜIS 📃 ⟩ — kun −0.0547 la okullinio sidis 0.049 SUB la mezo de
// la kranio ( la krono estas ĉe +0.160 kaj la mentono ĉe −0.172 ), do la frunto
// legis kiel du trionoj de la kapo kaj la malsupra vizaĝo etendiĝis. Nun la
// okuloj sidas apud la PLEJ LARĜA ringo de la kranio ( −0.0078 ), kie ili ankaŭ
// devas sidi ĉe vera kapo — la vertikala divido de la kapo estas preskaŭ egala.
// ⟨ La profundo sekvas la kranion 📃 ⟩ — kiam la okuloj leviĝas ili ankaŭ
// antaŭeniras, ĉar la kranio plilarĝiĝas supren; OKULA_DZ do ĉiam estas la
// profundo de la kranio ĉe la nova alto plus la sama eta elstaro, kiun la okulo
// havis antaŭe.
const OKULA_DX = 0o11/0o200;      // 0.0703 — kiom flanken de la kapcentro
const OKULA_DY = -0o13/0o1000;    // −0.0215 — kiom sub la kapcentro
const OKULA_DZ = 0o117/0o1000;    // 0.1543 — kiom antaŭen
// ⟨ La anguloj de la pupilo restas PINTECAJ 📃 ⟩ — la rondigo de la rombo estas
// kvarono de ĉiu rando ( 0.25 ), sed tio legiĝis kiel RONDIGITA KVADRATO, ne kiel
// rombo. 0.1 nur molaĵas la kvar pintojn, do la formo restas rombo.
const OKULA_ANGULO = 0o1/0o10;
// ⟨ La brovoj kaj la okulharoj 📃 ⟩ — la haraj strioj sur la vizaĝo ( vidu
// kreiVizaĝajnStrikojn ). Ili estas GEOMETRIO, ne pentraĵo, ĉar la vizaĝa kanvaso
// estas dividita po okula paletro — brovo pentrita en ĝi havus la saman koloron por
// ĉiuj figuroj. Kiel geometrio ili portas la haran materialon kaj sekvas la
// har-koloron de la figuro.
// La brovo arkas super la okulo, mallarĝiĝas al la finoj kaj kuŝas SUR la krania
// surfaco ( vidu kapaSurfacon ); la okulharoj sekvas la supran arkon de la okula
// folio, iomete super ĝia rimo.
const BROVA_DUONO = 0o21/0o1000;     // 0.0332 — la duonlarĝo de la brovo
const BROVA_ALTO = 0o21/0o1000;      // 0.0332 — super la centro de la okulo
const BROVA_ARko = 0o2/0o1000;       // 0.0039 — kiom la mezo de la brovo leviĝas
const BROVA_KLINO = 0o2/0o1000;      // 0.0039 — kiom la ekstera fino malleviĝas
const BROVA_LARĜO = 0o4/0o1000;      // 0.0078 — la larĝo ( la dikeco de la haro )
const BROVA_DIKECO = 0o2/0o1000;     // 0.0039 — kiom la strio elstaras el la haŭto
const BROVA_LEVO = 0o1/0o1000;       // 0.0020 — do la interna flanko tuŝas la haŭton
const LAŜO_LARĜO = 0o3/0o1000;       // 0.0059 — la larĝo de la okulharoj
const LAŜO_DIKECO = 0o2/0o1000;      // 0.0039
const LAŜO_LEVO = 0o1/0o400;         // 0.0039 — super la rimo de la okulo
const STRIO_STACIOJ = 0o14;          // la stacioj de ĉiu strio
// ⟨ La buŝo 📃 ⟩ — LONGA V sur la malsupra vizaĝo ( vidu kreiBuŝon ). La buŝo
// sidas en la spaco inter la pinto de la nazo ( 0.092 sub la kapcentro ) kaj la
// mentono ( 0.172 ), do la du anguloj leviĝas kaj la mezo malsupreniras — la
// legado de V. La strio estas geometrio kiel la brovoj, sed ĝi NE portas la haran
// materialon : ĝi apartenas al la vizaĝa geometrio ( la okuloj ) kaj montras la
// malhelan angulon de la okula kanvaso per siaj UV-oj ( vidu kreiBuŝon ), do la
// buŝo estas malhela ĉe ĉiu okula paletro sen nova materialo.
const BUŜO_DUONO = 0o26/0o1000;      // 0.0430 — la duonlarĝo ( la direkto de la anguloj )
const BUŜO_ANGULO = -0o64/0o1000;    // −0.1016 — la alto de la anguloj
const BUŜO_MEZO = -0o72/0o1000;      // −0.1133 — la alto de la mezo ( la pinto de la V )
const BUŜO_LARĜO = 0o4/0o1000;       // 0.0078 — la larĝo de la strio meze
const BUŜO_DIKECO = 0o2/0o1000;      // 0.0039 — kiom la strio elstaras el la haŭto
const BUŜO_LEVO = 0o1/0o1000;        // 0.0020 — do la interna flanko tuŝas la haŭton
const BUŜO_STACIOJ = 0o10;           // la stacioj de ĉiu duono de la V
// ⟨ La palpebroj 📃 ⟩ — la figuro palpebrumas per HAŬTA folio super ĉiu okulo,
// kiu SKALIĜAS malsupren super la okulon. La okulo mem NENIAM ŝanĝiĝas, do la
// pupilo kaj la blanka parto restas senkudraj.
// ⟨ La palpebro estas KOPIO de la okulo 📃 ⟩ — ĝi portas la saman folion, la
// saman bazaron kaj la saman kliniĝon kiel la okulo, nur PALPEBRA_GRANDON pli
// grandan. Ĉiu vertico de la palpebro do sidas SAMPROPORCIE ekster la responda
// vertico de la okulo, kaj fermite la folio plene kovras ĝin — ankaŭ ĉe la du
// pintoj, kie ĉiu alia formo lasis strieton de la blanko videbla.
// ⟨ Kial la palpebro SKALIĜAS kaj ne GLITAS 📃 ⟩ — la unuaj provoj estis plataj
// folioj, kiuj glitis malsupren super la okulon. Ili devis sidi plurajn
// okulaltojn super la okulo, do ili ankaŭ kovris la BROVON kaj la vizaĝo
// aspektis kvazaŭ portanta du haŭtajn platojn. La folio anstataŭe havas sian
// pivoton super la okulo kaj nur SKALon malsupren, do malfermite ĝi estas
// preskaŭ nevidebla strio kaj ĝi NENIAM tuŝas la brovon.
// ⟨ Kial la palpebro sidas ANTAŬE 📃 ⟩ — la okulo elstaras el la haŭto, do la
// palpebro devas pasi antaŭ ĝi; alie la okulo trapikus la fermitan palpebron.
const OKULA_DIKO = 0o1/0o200;        // 0.0078 — kiom la okulo elstaras
const PALPEBRA_GRANDO = 0o23/0o20;   // 1.1875 — kiom pli granda ol la okulo
const PALPEBRA_DIKO = 0o1/0o400;     // 0.0039 — kiom antaŭ la okulo. La palpebro
                                     // estas PARALELA al la okulo, do tiu eta
                                     // antaŭeno validas ĉie; se la du diskoj
                                     // estus pli proksimaj la bildigilo batalus
                                     // pri la profundo kaj la okulo montriĝus tra
                                     // la fermita palpebro.
// ⟨ La normalo de la okulo ne estas horizontala 📃 ⟩ — la okuloj sidas sur la
// antaŭa sfero de la vizaĝo, do ilia normalo montras ankaŭ malsupren. Ĉiu
// antaŭeno laŭ tiu normalo do ankaŭ mallevas la punkton, kaj la folio de la
// palpebro devas kompensi tion, alie ĝi ne kuŝus ĝuste sur la folio de la okulo.
// ( La normalo mem kalkuliĝas en vizaĝaBazaro — ĉi tio estas nur ĝia y-parto. )
const OKULA_NORMALA_Y = OKULA_DY / Math.sqrt(
  OKULA_DX * OKULA_DX + OKULA_DY * OKULA_DY + OKULA_DZ * OKULA_DZ );
// ⟨ La linio de la kunpremita palpebro 📃 ⟩ — malfermite la palpebro kunpremiĝas
// al maldika strio. Tiu strio devas sidi en la mallarĝa FENESTRO inter la supra
// rimo de la okulo kaj la okulharoj — supre ĝi trafus la brovon, malsupre ĝi
// lasus haŭtan streĉon sur la okulo. Ĝi mezuriĝas de la okulcentro laŭ la
// vertikala akso, do ĝi sekvas la okulojn se ili iam moviĝos.
const PALPEBRA_STRIO = 0o14/0o1000;  // 0.0234 — super la centro de la okulo
const PALPEBRA_FERMO = 0o1/0o40;     // 0.03125 — la plej malgranda skalo; la
                                     // okulo restas malkovrita kaj la haroj videblaj
const PALPEBRA_INTERVALO = 0o33/0o10;   // 3.375 s — inter du palpebrumoj
const PALPEBRA_DAURO = 0o12/0o100;      // 0.156 s — kiom longe la okulo restas fermita
// okulaRando — La rando de la folio, kiel parto de la kanvasa alto. La folio estas
// la kunigo de du cirklaj arkoj tra ( ±1, 0 ) kaj ( 0, 1 ) en la unuoj de la
// duonlarĝo, do ĝi estas unu kurbo por ĉiuj okuloj — nur la proporcio gravas.
//     @param f ( number ) - −1 … 1 — la pozicio laŭ la larĝo.
//     @returns alto ( number ) - 0 … 0.5 — la duonalto ĉe tiu pozicio.
const OKULA_PROPORCIO = OKULA_ALTO / OKULA_LARĜO;
const OKULA_RADIUSO = ( 0o1 + OKULA_PROPORCIO * OKULA_PROPORCIO ) / ( 0o2 * OKULA_PROPORCIO );
function okulaRando(f: number): number {
  const folio = Math.sqrt(Math.max(0, OKULA_RADIUSO * OKULA_RADIUSO - f * f))
    - ( OKULA_RADIUSO - OKULA_PROPORCIO );
  return folio / ( 0o2 * OKULA_PROPORCIO );
}
// okulaFoliaVojo — La vojo de la tuta folio sur la kanvaso ( la supra arko, poste
// la malsupra ). Ĝi estas uzata dufoje — por la klipo de la okulglobo kaj por la
// laŝ-linio.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param W ( number ) - La larĝo (= alto) de la kanvaso.
function okulaFoliaVojo(k: CanvasRenderingContext2D, W: number): void {
  const PAŜOJ = 0o40;
  k.beginPath();
  for ( let i = 0; i <= PAŜOJ; i++ ) {
    const f = -0o1 + i / PAŜOJ * 0o2;
    const x = ( 0o1/0o2 + f * 0o1/0o2 ) * W;
    const y = ( 0o1/0o2 - okulaRando(f) ) * W;
    if ( i === 0 ) k.moveTo(x, y); else k.lineTo(x, y);
  }
  for ( let i = PAŜOJ; i >= 0; i-- ) {
    const f = -0o1 + i / PAŜOJ * 0o2;
    k.lineTo(( 0o1/0o2 + f * 0o1/0o2 ) * W, ( 0o1/0o2 + okulaRando(f) ) * W);
  }
  k.closePath();
}
// ⟨ La paletroj 📃 ⟩ — viola, bruna, malhelblua kaj malhelflava, ĉiam en paroj. La
// SUPRA bendo estas la malhela duono ( la ombro de la palpebro ), la malsupra la
// pli hela, do la pupilo ricevas profundon anstataŭ esti plata disko.
// ⟨ La unua paletro estas VIOLA kaj ĝi estas la plej ofta 📃 ⟩ — la okuloj de la
// homamaso estis preskaŭ ĉiuj brunaj aŭ malhelbluaj, ĉar la malnova purpuro
// ( 0x381848 ) estis tiom malhela, ke ĝi legis kiel bruno. La unua paletro nun
// portas veran violon ( 0x5c2e8c, heleco 92/140 kontraŭ 72 de la malnova ) kaj
// la elekto sube liveras ĝin al la DUONO de la figuroj — la violaj okuloj estas
// la plej oftaj en la mondo, ne unu el kvar hazardaj nuancoj.
const OKULAJ_PALETROJ: [ number, number ][] = [
  [ 0x5c2e8c, 0x341a52 ],   // viola → malhelviola
  [ 0x402810, 0x381848 ],   // bruna → malhelpurpura
  [ 0x182848, 0x483818 ],   // malhelblua → malhelflava
  [ 0x483818, 0x402810 ],   // malhelflava → bruna
];
// OKULAJ_ELEKTOJ — kiun paletron hazarda figuro ricevas. La paletro 0 ( la viola )
// aperas dufoje pli ofte ol ĉiu el la aliaj, do la plej ofta okulkoloro de la
// mondo estas la viola.
const OKULAJ_ELEKTOJ = [ 0, 0, 0, 1, 2, 3 ];

// okulaRombo — La vojo de la pupilo — rombo kun RONDIGITAJ anguloj. Ĉiu angulo
// estas kvadrata kurbo kiu iras de punkto sur unu rando, tra la angulo mem, al
// punkto sur la sekva rando, do la formo restas rombo kun molaj anguloj anstataŭ
// rombo kun tranĉitaj anguloj.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param cx, cy ( number ) - La centro de la rombo.
//     @param dl, da ( number ) - La duonlarĝo kaj la duonalto.
//     @param angulo ( number ) - Kiom de ĉiu rando apartenas al la angulo.
function okulaRombo(k: CanvasRenderingContext2D, cx: number, cy: number,
  dl: number, da: number, angulo: number): void {
  const anguloj: [ number, number ][] = [ [ 0, -da ], [ dl, 0 ], [ 0, da ], [ -dl, 0 ] ];
  k.beginPath();
  for ( let i = 0; i < 0o4; i++ ) {
    const a = anguloj[i], b = anguloj[( i + 0o1 ) % 0o4 ];
    const post = anguloj[( i + 0o2 ) % 0o4 ];
    const en: [ number, number ] = [ a[0] + ( b[0] - a[0] ) * angulo,
      a[1] + ( b[1] - a[1] ) * angulo ];
    const el: [ number, number ] = [ b[0] + ( post[0] - b[0] ) * angulo,
      b[1] + ( post[1] - b[1] ) * angulo ];
    if ( i === 0 ) k.moveTo(cx + en[0], cy + en[1]);
    else k.lineTo(cx + en[0], cy + en[1]);
    k.quadraticCurveTo(cx + b[0], cy + b[1], cx + el[0], cy + el[1]);
  }
  k.closePath();
}

// okulaTeksajxo — La kanvaso de unu okulo, kaŝmemorita po paletro. La tuta kanvaso
// estas malhela kadro, SUR ĝi sidas la blanka okulglobo kun la palpebra ombro, kaj
// SUR tio la pupilo — rombo kun rondigitaj anguloj, pentrita en tri bendoj. La
// UV-oj de la okula geometrio ampleksas la tutan kanvon, do la rombo sidas meze de
// la folio.
// ⟨ La rombo estas pli mallarĝa ol alta 📃 ⟩ — la UV-oj dismetas la kanvon sur la
// okulon, kiu mem estas pli larĝa ol alta, do rombo 0.375 × 0.4375 sur la kanvaso
// montriĝas kiel preskaŭ egallatera rombo sur la okulo mem.
// ⟨ La pupilo PLIGRANDIĜIS 📃 ⟩ — la malnova rombo ( 0.30 × 0.375 ) lasis tiom da
// blanko, ke la okulo legis kiel blanka folio kun malgranda makulo. Nun la rombo
// estas 0.375 × 0.4375 — ĝi plenigas la okulon kaj restas nur maldika blanka
// rando ĉirkaŭ ĝi. La limo estas la folia kurbo mem ( vidu okulaRandon ): ĉe la
// mezlarĝo la folio ankoraŭ estas plena, do la pintoj de la rombo povas iri
// preskaŭ ĝis la rando, sed la anguloj de la rombo devas resti ene de la kurbo
// ĉe ĉiu larĝo — ĉe 0.5 la pintoj jam tranĉiĝus per la okulaj randoj.
//     @param paletro ( [ number, number ] ) - La du koloroj de la pupilo.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta okula teksturo.
const okulajTeksajxoj = new Map<string, THREE.CanvasTexture>();
function okulaTeksajxo(paletro: [ number, number ]): THREE.CanvasTexture {
  const klavo = paletro.join("-");
  const cacheita = okulajTeksajxoj.get(klavo);
  if ( cacheita ) return cacheita;
  const W = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = W; kanvasa.height = W;
  const k = kanvasa.getContext("2d")!;
  const laŝo = deksesuma(0x100808);
  // ⟨ La kadro 📃 ⟩ — la tuta kanvaso estas malhela antaŭ ĉio. La randoj de la
  // folio ( la anguloj de la okulo ) kaj la laŝ-linio montras ĉi tiun koloron.
  k.fillStyle = laŝo;
  k.fillRect(0, 0, W, W);
  const [ supra, malsupra ] = paletro;
  // ⟨ La blanka parto LUMIĜIS 📃 ⟩ — la palpebra ombro estis 0xc0c0c0 kaj la
  // hela bendo 0xd8d8d8, do la tuta okulo legiĝis griza. Nun ili estas 0xd0d0d0
  // kaj 0xe0e0e0 — la supra ombro ankoraŭ sidas sur la globo, sed la blanko vere
  // BLANKAS.
  const cx = W * 0o1/0o2, cy = W * 0o1/0o2;
  const dl = W * 0o24/0o100, da = W * 0o34/0o100;
  const tri = da * 0o2/0o3;
  // ⟨ La blanka okulglobo 📃 ⟩ — la folio pleniĝas per blanko kaj la supra parto
  // ricevas grizan bendon ( la ombro de la palpebro ). La pupilo sidas SUR la
  // globo. La blanka areo estas KLIPITA per la sama folia kurbo kiel la geometrio,
  // do la okulo havas veran blankan parton kaj ne blankan kvadraton.
  k.save();
  okulaFoliaVojo(k, W);
  k.clip();
  k.fillStyle = "#FFFFFF";
  k.fillRect(0, 0, W, W);
  k.fillStyle = deksesuma(0xd0d0d0);
  k.fillRect(0, 0, W, W * 0o26/0o100);
  k.fillStyle = deksesuma(0xe0e0e0);
  k.fillRect(0, W * 0o26/0o100, W, W * 0o11/0o100);
  k.save();
  okulaRombo(k, cx, cy, dl, da, OKULA_ANGULO);
  k.clip();
  k.fillStyle = deksesuma(supra);
  k.fillRect(0, cy - da, W, tri + 0o1);
  k.fillStyle = deksesuma(okulaMikso(supra, malsupra));
  k.fillRect(0, cy - da + tri, W, tri + 0o1);
  k.fillStyle = deksesuma(malsupra);
  k.fillRect(0, cy - da + tri * 0o2, W, tri + 0o1);
  // ⟨ La luma punkto 📃 ⟩ — malgranda blanka glimo en la supra-maldekstra angulo
  // de la pupilo. Sen ĝi la malhela okulo legiĝas kiel plata makulo, ĉar la mondo
  // lumas la okulojn preskaŭ egale.
  k.fillStyle = "#FFFFFF";
  k.beginPath();
  k.arc(cx - dl * 0o34/0o100, cy - da * 0o44/0o100, dl * 0o26/0o100, 0, Math.PI * 0o2);
  k.fill();
  k.restore();
  k.strokeStyle = laŝo;                         // la konturo de la pupilo
  k.lineWidth = Math.max(0o1, W * 0o1/0o50);
  okulaRombo(k, cx, cy, dl, da, OKULA_ANGULO);
  k.stroke();
  k.restore();
  // ⟨ La laŝ-linio 📃 ⟩ — malhela streko sur la rando de la folio, do la okulo
  // havas palpebron super kaj sub la blanka globo. Ĝi kongruas kun la geometria
  // rando, ĉar ambaŭ venas el okulaRando.
  k.strokeStyle = laŝo;
  k.lineWidth = W * 0o1/0o24;
  k.lineJoin = "round";
  okulaFoliaVojo(k, W);
  k.stroke();
  const t = new THREE.CanvasTexture(kanvasa);
  t.colorSpace = THREE.SRGBColorSpace;
  okulajTeksajxoj.set(klavo, t);
  return t;
}

// okulaMaterialo — La okula materialo de unu paletro ( kaŝmemorita ). La okuloj
// ricevas hazardan paletron po figuro, do la homamaso havas diversajn rigardojn
// sed nur kvar materialojn entute. La materialo portas sian propran teksturon, do
// la har-koloro ne tuŝas la okulojn ( blonda hararo ne faru blondajn okulojn ).
//     @param indekso ( number ) - La indekso de la paletro.
//     @returns materialo ( THREE.MeshStandardMaterial ) - La okula materialo.
const OKULAJ_MATERIALOJ = new Map<number, THREE.MeshStandardMaterial>();
function okulaMaterialo(indekso: number): THREE.MeshStandardMaterial {
  const n = indekso % OKULAJ_PALETROJ.length;
  let m = OKULAJ_MATERIALOJ.get(n);
  if ( !m ) {
    m = new THREE.MeshStandardMaterial({ map: okulaTeksajxo(OKULAJ_PALETROJ[n]),
      roughness: 0o55/0o100 });
    OKULAJ_MATERIALOJ.set(n, m);
  }
  return m;
}

// ungaMaterialo — La materialo de la ungoj ( kaŝmemorita, unu por la tuta mondo ).
// ⟨ Kial aparta materialo 📃 ⟩ — la ungo estas la SAMA haŭto, nur pli hela kaj pli
// brila ( vera ungo estas travidebla kaj la karno sub ĝi lumas tra ĝi ). La
// haŭta materialo estas dividita — ĝi ne portas tekston — do la ungo ne povas
// preni alian koloron el ĝi per UV-oj kiel la buŝo faras. La ungo do estas aparta
// geometrio kun aparta materialo. La materialo mem estas KAŜMEMORITA kaj dividita
// inter ĉiuj figuroj — la ungoj havas neniun variaĵon po figuro.
//     @returns materialo ( THREE.MeshStandardMaterial ) - La unga materialo.
const UNGA_KOLORO = 0x987880;         // pli hela, pli varma kaj pli ruĝeta ol la haŭto
let ungaMaterialoStoko: THREE.MeshStandardMaterial | null = null;
function ungaMaterialo(): THREE.MeshStandardMaterial {
  if ( !ungaMaterialoStoko ) ungaMaterialoStoko = new THREE.MeshStandardMaterial({
    color: UNGA_KOLORO, roughness: 0o25/0o100 });
  return ungaMaterialoStoko;
}

// ⟨ La har-materialoj 📃 ⟩ — kaŝmemoritaj po koloro. La haro nun portas sian
// propran fadenan teksajxon ( kreiHaranTeksajxon ) kaj molan malvarm-bluan
// brilon ( sheen ). Sen la kaŝo ĉiu unuopa NPC konstruus propran materialon — la
// sama programo kaj la sama teksajxo, sed aparta material-objekto por ĉiu. Kun
// la kaŝo la tuta NPC-aro uzas tiom da materialoj, kiom da har-koloroj estas en
// la vido.
// ⟨ La blua brilo 📃 ⟩ La haro multiplikas la teksajxon per la baza koloro, do
// la teksajxo povas nur MALLUMIGI — ĝi neniam povus bluigi brunan haron. La
// sheen-tavolo tamen ALDONAS koloron super la bazo, do ĝi donas la malvarmetan
// bluecan nuancon de malhela haro en la nebula mondo ( la sama malvarmo kiel la
// nebulo kaj la griza ĉielo ).
const HARAJ_MATERIALOJ = new Map<number, THREE.MeshPhysicalMaterial>();
// ⟨ La malvarma bluo 📃 ⟩ — la du finoj de la sheen-koloro. Helaj haroj ricevas
// preskaŭ neŭtralan grizbluan brilon ( haro ne brilu blue ), malhelaj haroj
// ricevas profundan malvarm-bluan. Kun multa sheen la malhela haro legiĝas
// blueca-nigra — la sama malvarmo kiel la nebulo, la griza ĉielo kaj la ombroj de
// la har-teksajxo.
const SHEEN_HELA = new THREE.Color(0xb0bccc);
const SHEEN_MALHELA = new THREE.Color(0x284878);
// ⟨ La blua nuanco 📃 ⟩ — kiom la BAZA koloro de malhela haro moviĝas al la bluo.
// La materialo multiplikas la har-teksajxon per ĉi tiu koloro, do la teksturo
// povas nur MALLUMIGI — ĝi neniam povus bluigi brunan haron. La eta movo de la
// baza koloro ( maksimume 0o1/0o10 ) estas tio, kio permesas al malhela haro
// fariĝi malvarm-blua nuanco sen nova har-koloro en la paletro.
const HARO_BLUO = new THREE.Color(0x18304c);
function haraMaterialo(koloro: number): THREE.MeshPhysicalMaterial {
  let m = HARAJ_MATERIALOJ.get(koloro);
  if ( !m ) {
    // La malheleco de la baza koloro ( 0 hela, 1 preskaŭ nigra ). La valoroj estas
    // en lineara kolor-spaco ( three konvertas la deksesumajn kolorojn ), do la
    // paletro disvastiĝas de proksimume 0.005 ( la nigra ) gxis 0.3 ( la blonda ).
    const koloroO = new THREE.Color(koloro);
    const lumo = koloroO.r * 0o52/0o100 + koloroO.g * 0o143/0o200 + koloroO.b * 0o7/0o100;
    // ⟨ La sojlo gravas 📃 ⟩ — kun sojlo 0.2 la kaŝtana ( 0x583820, lumo 0.055 )
    // ricevis preskaŭ la saman bluon kiel la nigra, do la bruna haro perdis sian
    // varmon. Kun sojlo 0.1 nur la preskaŭ nigraj nuancoj atingas la plenan bluon
    // kaj la mezaj brunoj restas brunaj kun eta malvarmo.
    const malheleco = Math.min(0o1, Math.max(0, 0o1 - lumo / 0o6/0o100));
    m = new THREE.MeshPhysicalMaterial({
      color: koloroO.clone().lerp(HARO_BLUO, malheleco * 0o1/0o10),
      map: kreiHaranTeksajxon(),
      // La malglateco estas sufiĉe alta. kun 0.58 la haro montris grandan
      // spegulan makulon kaj legiĝis kiel polurita plasto. La sheen-tavolo
      // ( malglateco 0.5 ) ankoraŭ donas la molan bluan brilon.
      roughness: 0o55/0o100,
      sheen: 0o4/0o100 + 0o26/0o100 * malheleco,
      sheenColor: SHEEN_HELA.clone().lerp(SHEEN_MALHELA, malheleco),
      sheenRoughness: 0o13/0o20 - 0o1/0o10 * malheleco,
      side: THREE.DoubleSide,
    });
    HARAJ_MATERIALOJ.set(koloro, m);
  }
  return m;
}

// ⟨ La ledaj materialoj 📃 ⟩ — la botoj kaj la akcentaj partoj de la ŝuoj dependas
// nur de la boto-koloro kaj de la akcenta koloro de la vesto, do ili kaŝmemoriĝas
// same kiel la ŝtofaj materialoj. La leda teksajxo ( kreiLederanTeksajxon ) estas
// grizhela kaj multiplikiĝas per la koloro, do unu dividita teksajxo servas ĉiujn
// ŝuojn de la mondo — samtempe kiel map KAJ kiel bumpMap, ĉar la grajno kaj la
// sulkoj reliefiĝu.
// ⟨ La akcenta koloro REVENIS al la ŝuo 📃 ⟩ Dum unu versio la plando estis simple
// mallumigita bota koloro, ĉar la akcentoj de la paletro estas preskaŭ blankaj kaj
// la plando iĝis la plej hela surfaco de la tuta korpo. Nun la akcento denove
// portas la ŝuajn randojn ( la plandon, la randon ĉe la maleolo kaj la kolumon ) —
// la vesto kaj la ŝuo do dividas la saman oran fadenon — kaj la boto mem restas
// bruna ledo, do la kontrasto restas sur la randoj anstataŭ sur la tuta plando.
interface LedajMaterialoj {
  botoM: THREE.MeshStandardMaterial;
  akcentaM: THREE.MeshStandardMaterial;
}
const LEDAJ_MATERIALOJ = new Map<string, LedajMaterialoj>();
function ledajMaterialoj(o: Vesto): LedajMaterialoj {
  const klavo = o.botoj + ":" + o.akcenta;
  let m = LEDAJ_MATERIALOJ.get(klavo);
  if ( !m ) {
    m = {
      botoM: new THREE.MeshStandardMaterial({
        color: o.botoj, map: kreiLederanTeksajxon(), bumpMap: kreiLederanTeksajxon(),
        bumpScale: 0o1/0o50, roughness: 0o33/0o40,
      }),
      akcentaM: new THREE.MeshStandardMaterial({
        color: o.akcenta, map: kreiLederanTeksajxon(),
        bumpMap: kreiLederanTeksajxon(), bumpScale: 0o1/0o400, roughness: 0o63/0o100,
      }),
    };
    LEDAJ_MATERIALOJ.set(klavo, m);
  }
  return m;
}

// ⟨ Komunaj vestaj materialoj 📃 ⟩ — la KVAR teksturitaj vestaj materialoj
// ( interno, supra, pantalono, maniko ) dependas nur de la vesto, ne de la
// figuro — ili cacheiĝas po vesto kaj dividiĝas inter ĉiuj figuroj kun la sama
// vesto. La unuopaj figuroj ŝanĝas nur la map-referon ( agordiVeston ), do
// nenia klonita materialo bezoniĝas. La haŭto, la botoj kaj la haro restas
// po-figuraj ( la haro havas hazardan koloron, kaj la botoj kaj la plandoj
// portas la nuancojn de la vesto ).
// ⟨ La tuka reliefo 📃 ⟩ Ĉiu materialo ankaŭ ricevas la komunan tuk-reliefan
// teksaĵon ( kreiSxtofanBumpanTeksajxon ) kiel bumpMap. Ĝi estas la SAMA
// dividita teksaĵo por ĉiuj vestoj kaj ĉiuj partoj — nenia kroma tekstura
// memoro — kaj ĝi donas la interplekton de la ŝtofo, kiun la ebena koloro sole
// ne povas montri. Antaŭe la vestoj havis neniun reliefon, do la malgrandaj
// figuroj aspektis kiel pentritaj paperfolioj.
interface VestajMaterialoj {
  internoM: THREE.MeshStandardMaterial;
  eksteraM: THREE.MeshStandardMaterial;
  pantalonoM: THREE.MeshStandardMaterial;
  manikoM: THREE.MeshStandardMaterial;
}
const vestajMaterialojStoko = new Map<string, VestajMaterialoj>();
function vestajMaterialoj(o: Vesto): VestajMaterialoj {
  const klavo = o.nomo + "|" + o.ĉefa + "|" + o.akcenta + "|" + o.interno + "|" + o.pantalono;
  let m = vestajMaterialojStoko.get(klavo);
  if ( !m ) {
    const tukO = kreiSxtofanBumpanTeksajxon();
    const vesto = ( speco: string, roughness: number ): THREE.MeshStandardMaterial =>
      new THREE.MeshStandardMaterial({
        map: vestaTeksajxo(o, speco),
        bumpMap: tukO, bumpScale: 0o1/0o400,
        roughness,
        side: THREE.DoubleSide,
      });
    m = {
      internoM: vesto("interno", 0o33/0o40),
      eksteraM: vesto("supra", 0o63/0o100),
      pantalonoM: vesto("pantalono", 0o63/0o100),
      manikoM: vesto("maniko", 0o63/0o100),
    };
    vestajMaterialojStoko.set(klavo, m);
  }
  return m;
}

// ⟨ Konstantaj geometrioj 📃 ⟩ — la figuroj de ĉiuj NPC-oj uzas la SAMAJN
// formojn ( la kapo, la robo, la pantalono, la botoj, la manikoj, la haroj ktp. ),
// do ili konstruiĝas UNUFOJE ĉi tie kaj dividiĝas inter ĉiuj figuroj.
// ⟨ La kunigado 📃 ⟩ La sama materialo neniam bezonas du meshojn. Antaŭe la
// kapo kaj la kolo estis du meshoj, la bota ŝafto kaj la piedo du pliaj, kaj la
// longa hararo kvar ( la ĉapo, la kurteno kaj la du flankaj strioj ). Ĉio, kio
// dividas la materialon, kunfandiĝas en unu geometrion antaŭ la bildigo — la
// desegnaj alvokoj de la tuta NPC-aro malmultiĝas je preskaŭ triono, dum la
// modeloj ricevas PLI da detaloj ( la oreloj, la nazo, la okuloj kaj la manoj
// aldoneblas sen nova mesho ).
// ⟪ La boto 🥾 ⟫ — la plej videbla ŝuo de la figuro. La robo kovras la genuojn
// kaj la botoj portas la tutan videblan kruron, do ilia formo gravas pli ol
// ilia grando. La unua versio estis cilindro kun manumo plus RONDIGITA SKATOLO
// kiel piedo, kaj la plando flosis 0o1/0o20 sub la piedo, do la ŝuo legiĝis kiel
// sitelo sur klakilo. Nun la boto estas du maldensegaj surfacoj konstruitaj el
// SUPERELIPSAJ ringoj — la sama rondigita ortangulo kiel la vojoj, la pordaj
// kadroj kaj la fenestroj de la mondo.

// superelipso — Punkto sur superelipso ( la "squircle" de la urbo ). La
// eksponento regas la akrecon de la anguloj — 0o2 estas elipso, 0o4 preskaŭ
// ortangulo kun rondaj anguloj, 0o10 preskaŭ ortangulo. La botoj uzas ĝin anstataŭ
// cirklo, ĉar la tuta mondo estas konstruita el rondigitaj ortanguloj ( vidu
// S2WENI/Referencoj/Priskribo.md ) kaj cilindra boto legiĝas kiel fremda objekto.
//     @param ang ( number ) - La angulo ( radianoj ).
//     @param a ( number ) - La duonlarĝo ( la x-akso ).
//     @param b ( number ) - La duonprofundo ( la z-akso ).
//     @param n ( number ) - La eksponento de la superelipso.
//     @returns punkto ( [ number, number ] ) - La [ x, z ]-punkto sur la kurbo.
function superelipso(ang: number, a: number, b: number, n: number): [ number, number ] {
  const k = 0o2 / n, ko = Math.cos(ang), si = Math.sin(ang);
  return [ a * Math.sign(ko) * Math.pow(Math.abs(ko), k),
    b * Math.sign(si) * Math.pow(Math.abs(si), k) ];
}

// kreiRinganSurfacon — Kunmetu surfacon el sinsekvaj ringoj. Ĉiu ringo estas
// listo da punktoj ( la sama nombro en ĉiuj ), kaj la funkcio ligas ĉiun ringon al
// la antaŭa per kvadratoj. La ventumilo elektiĝas tiel ke la normaloj montru
// EKSTEREN kiam la ringoj progresas de la "unua" flanko al la "lasta" kaj la
// punktoj rondiras maldekstren ĉirkaŭ la progres-akso ( vidu la du uzantojn —
// kreiBotan — kie la ordo de la ringoj sekvas tiun regulon ).
//     @param ringoj ( [ number, number, number ][][] ) - La ringoj.
//     @returns geometrio ( THREE.BufferGeometry ) - La preta surfaco.
function kreiRinganSurfacon(ringoj: [ number, number, number ][][]): THREE.BufferGeometry {
  const pozicioj: number[] = [], indeksoj: number[] = [];
  const k = ringoj[0].length;
  for ( const ringo of ringoj ) for ( const p of ringo ) pozicioj.push(p[0], p[1], p[2]);
  for ( let v = 0; v + 0o1 < ringoj.length; v++ ) {
    for ( let i = 0; i < k; i++ ) {
      const j = ( i + 0o1 ) % k;
      const a = v * k + i, b = v * k + j;
      const c = ( v + 0o1 ) * k + i, d = ( v + 0o1 ) * k + j;
      indeksoj.push(a, b, c, b, d, c);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj);
}

// kreiArtikanSferon — La artiko de la membroj, kiel sfero ĉe la pivoto. La du
// partoj de disigita membro renkontiĝas per siaj malfermaj randoj; kiam la artiko
// fleksiĝas la randoj disiĝas je kojno, kaj ĉi tiu sfero plenigas ĝin. La sfero
// sidas SUR la pivoto, do la turno ne movas ĝin — ĝi plenigas ĉiun angulon.
// ⟨ Kial sfero kaj ne pli longaj tuboj 📃 ⟩ — la du partoj povus simple interkovri,
// sed iliaj surfacoj tiam preskaŭ koincidus kaj la bildigilo batalus pri la sama
// profundo. La sfero estas la sola formo kiu plenigas truon de iu ajn angulo sen
// koincidaj surfacoj.
// ⟨ Ĝi sidas iomete INTERNE 📃 ⟩ — la sfero estas iomete pli malgranda ol la
// membro ( vidu la alvokantojn ), do rekte ĝi tute malaperas ene de la tubo kaj
// nur la artiko montriĝas: kiam la membro fleksiĝas, la du randoj disiĝas kaj oni
// vidas la artikon en la kavo. Se la sfero elstarus, ĝia ekvatoro trapikus la
// malmult-poligonan tubon per segildenta rando ( la du formoj ne havas la samajn
// flankojn ) — kaj tio legiĝus kiel eraro, ne kiel artiko.
//     @param centro ( [ number, number, number ] ) - La centro ( la pivoto ).
//     @param r ( number ) - La radiuso de la sfero.
//     @param plataĵo ( number ) - Kiom plata la sfero estas laŭ y ( 1 = sfero ).
//     @returns geometrio ( THREE.BufferGeometry ) - La artiko.
function kreiArtikanSferon(centro: [ number, number, number ], r: number,
  plataĵo = 0o1): THREE.BufferGeometry {
  // ⟨ Pli da flankoj ol la tubo 📃 ⟩ — la kavo montras la sferon de proksime, do
  // ĝi bezonas pli da flankoj ol la 0o20-flanka membro, alie la artiko mem aspektas
  // kiel multangulo.
  const sfero = new THREE.SphereGeometry(r, 0o24, 0o14);
  sfero.scale(0o1, plataĵo, 0o1);
  sfero.translate(centro[0], centro[1], centro[2]);
  return sfero;
}

// remapiUVon — Remapu la v-koordinaton de geometrio en novan benson. La maniko
// estas disigita ĉe la kubuto en du partojn, kaj ĉiu parto konstruiĝas per la sama
// funkcio ( kiu ĉiam faras v de 0 ĝis 1 ); sen la remapo la teksajxo de la maniko
// ripetiĝus dufoje kaj la akcenta bordo aperus ankaŭ ĉe la kubuto.
//     @param geometrio ( THREE.BufferGeometry ) - La geometrio ( modifiĝas ).
//     @param v0, v1 ( number ) - La nova benso de la malnova v = 0 kaj v = 1.
//     @returns geometrio ( THREE.BufferGeometry ) - La sama geometrio.
function remapiUVon(geometrio: THREE.BufferGeometry, v0: number, v1: number)
  : THREE.BufferGeometry {
  const uvo = geometrio.getAttribute("uv");
  if ( !uvo ) return geometrio;
  for ( let i = 0; i < uvo.count; i++ ) {
    uvo.setY(i, v0 + ( v1 - v0 ) * uvo.getY(i));
  }
  uvo.needsUpdate = true;
  return geometrio;
}

// kreiBotan — La boto kaj ĝia plando. La mondaj unuoj estas la sama kadro kiel la
// kruro-grupo de la figuro — la ternivelo estas je −0o5/0o20 ( la koksa grupo
// sidas je +0o5/0o20 ), do la malsupro de la plando kuŝas ĝuste sur la tero.
// ⟨ La du surfacoj 📃 ⟩ La ŜTIPO iras de la rando supre ( kie la akcenta manumo
// maleolo, kun vera tibia kurbo ( la suro estas la plej larĝa ringo ) kaj kun
// fina ringo KAŜITA ene de la piedo — la du surfacoj do kunfandiĝas sen videbla
// kudro. La PIEDO konsistas el sekcoj laŭ la LONGO de la ŝuo — ĉiu sekco estas
// superelipso en la XY-ebeno kun plata malsupro ( la plando ) kaj kurba supro, do
// la maleolo altiĝas kaj la pinto de la ŝuo vere malaltiĝas kaj mallarĝiĝas
// anstataŭ finiĝi per vertikala muro.
//     @returns ( { boto, akcentaj } ) - La leda geometrio de la boto kaj la
//         akcenta geometrio ( la plando, ĝia rando, la horizontala konturo sur la
//         piedo kaj la bendo ĉe la supro de la ŝtipo ).
function kreiBotan(): { boto: THREE.BufferGeometry; akcentaj: THREE.BufferGeometry } {
  // ⟨ La tero venas de la GENUO 📃 ⟩ — la tuta bota geometrio mezuriĝas de la
  // genuo ( la mesho sidas ĉe −MALEOLO_Y en la maleola grupo, vidu
  // konstruiFiguron ), do kun la genuo ĉe la mondo 0.5 la tero sidas 0.5 sub la
  // nulo. Antaŭe la kruro estis pli mallonga kaj la tero estis ĉe −0.3125.
  // ⟨ La plando flosas 0.002 super la tero 📃 ⟩ — la malsupro de la plando sidis
  // ĜUSTE sur la tera ebeno ( la sama y ), do la du surfacoj batalis pri la sama
  // profundo ĉe ĉiu paŝo kaj la rando de la ŝuo makuliĝis per batalantaj facetoj.
  // La leveto estas nevidebla ( 2 mm ) kaj ĝi forigas la problemon ankaŭ en la
  // mondo, kie la figuro staras sur la ebeno de la tereno.
  const GRUNDO = -0o1/0o2 + 0.002;     // −0.498 — 2 mm super la tero
  const PLANDA_ALTO = 0o3/0o200;       // 0.0234375 — la dikeco de la plando
  const PLANDA_SUPRO = GRUNDO + PLANDA_ALTO;
  // ⟨ La ledo finiĝas SUB la plando 📃 ⟩ — la malsupro de la leda piedo sidas
  // iomete sub la supraĵo de la plando ( anstataŭ ĝuste sur ĝi ), alie la du
  // surfacoj estas KUNPLANAAJ kaj batalas pri la sama profundo ( z-fighting )
  // ĉe la pinto kaj ĉe la kalkano.
  const LEDA_FUNDO = PLANDA_SUPRO - 0o1/0o100;   // −0.4866 — 0.01 sub la plando
  const K = 0o20;                      // la punktoj ĉirkaŭ ĉiu ringo
  const r = ( i: number ) => i / K * Math.PI * 0o2;

  // ⟨ La V-forma supro 📃 ⟩ — la rando de la ŝtipo NE estas horizontala — la fronto
  // malleviĝas kaj la dorso leviĝas, do la bordo legiĝas kiel V de la flanko kaj
  // la malantaŭa flanko estas pli alta ol la fronta ( la klasika bot-supro ). La
  // kresto mezuriĝas po azimuto — 0 antaŭe, π malantaŭe — kaj ĉiu ringo portas
  // malpliiĝantan parton de ĝi ( la lasta kolono de la tabelo ), do la ŝtipo
  // DEKLINIĜAS anstataŭ turniĝi — la tubo restas vertikala kaj nur ĝia supro
  // dekliniĝas. La akcenta manumo sekvas la saman kreston ( vidu malsupre ).
  // ⟨ La kresto estas SIMETRIA 📃 ⟩ — la ringoj rondiras per ang = 0 ĉe +x ( la
  // flanko ), do la kresto NE rajtas mezuriĝi per la angulo mem — tiel ĝi estus 0 ĉe
  // unu flanko kaj maksimuma ĉe la alia, kaj la rando dekliniĝus flanken anstataŭ
  // malantaŭen. La kresto do venas el sin( ang ) — 1 ĉe la FRONTO ( ang = π/2 ),
  // −1 ĉe la dorso — do la rando estas simetria maldekstre kaj dekstre kaj la V
  // malfermiĝas ĝuste antaŭe.
  const KRESTA = 0o2/0o100;            // 0.03125 — kiom pli alta estas la dorso
  const kresto = (ang: number) => KRESTA * ( 0o1 - Math.sin(ang) ) / 0o2;
  // ⟨ La kvar anguloj 📃 ⟩ — la rando ankaŭ havas malgrandan noĉon ĉe ĉiu el la
  // KVAR anguloj de la superelipso ( la diagonaloj, kie la rondigita ortangulo
  // fakte rondiĝas ) — la absoluta sinuso de la duobla azimuto pintas ĝuste tie kaj
  // nuliĝas sur la aksoj, do alta potenco faras mallarĝan noĉon — la rando ondiĝas
  // kvarfoje anstataŭ havi kvar videblajn dentojn. Ĝi skaliĝas per la sama parto
  // ( p ) kiel la kresto, do la ledo kaj ĝia akcenta rando restas vicigitaj.
  const ANGULA_NOĈO = 0o1/0o100;       // 0.0156 — kiom profunda estas la noĉo
  const angulaNoĉo = (ang: number) =>
    ANGULA_NOĈO * Math.pow(Math.abs(Math.sin(ang * 0o2)), 0o10);
  // ⟨ La ŝtipo 📃 ⟩ — [ alto, duonlarĝo, duonprofundo, la parto de la kresto ].
  // ⟨ La ŝtipo ne disfloras kiel sitelo 📃 ⟩ — la plej larĝa ringo estas la SURO
  // ( la mondo 0.31 ) kaj la talio kaj la maleolo estas pli mallarĝaj ol ĝi, do
  // la ŝtipo sekvas la kruron, kiel luanta boto. Nur la rando ( la faldita
  // manumo, vidu malsupre ) estas iomete pli larĝa.
  // La ringo ĉe la talio estas la lasta kiu portas parton de la kresto ( p = 2/3 ),
  // do la tuta supra parto klinas kune kun la rando kaj la tubo restas vertikala.
  // ⟨ La rando de la ŝtipo LARĜIĜAS 📃 ⟩ — la rando havas 0.09375 × 0.1055, do
  // ĝi estas la plej larĝa parto de la ŝuo ( antaŭe ĝi estis pli mallarĝa ol la
  // suro ). Tio legas kiel faldita bot-manumo.
  // ⟨ La profundo MALLARĜIĜIS 📃 ⟩ — la rando estis 0.1172 profunda, do inter ĝi
  // kaj la pantalono restis 0.042 da aero ĉe la fronto kaj la dorso. La buŝo tial
  // aspektis kiel malfermita truo kaj la ruliĝo de la piedo movis ĝian randon
  // videble. Kun 0.1055 la aero malgrandiĝis al 0.030 kaj la ŝtipo ĉirkaŭas la
  // kruron pli proksime — la rando legiĝas kiel manumo, ne kiel sitelo.
  // ⟨ La ŝtipo MALLONGIĜIS PLU 📃 ⟩ — antaŭe la rando iris ĝis la GENUO ( la mondo
  // 0.52 ), poste al 0.375. Nun ĝi sidas ĉe la mondo 0.3125 ( trikvarone inter la
  // genuo kaj la maleolo ), do la pantalono videblas super la boto kaj la boto
  // legiĝas kiel ŝuo, ne kiel kruringo.
  const RANDO_Y = -0o3/0o16;           // −0.1875 — la rando ( la mondo 0.3125 )
  const RANDO_A = 0o30/0o400;          // 0.09375 — la duonlarĝo de la ŝtipo ĉe la rando
  const RANDO_B = 0o33/0o400;          // 0.1055 — la duonprofundo ĉe la rando
  const stipajRingoj: [ number, number, number, number ][] = [
    [ RANDO_Y,              RANDO_A,        RANDO_B,       0o1     ],   // −0.1875 — la rando ( la mondo 0.3125 )
    [ RANDO_Y - 0o1/0o200,  RANDO_A,        RANDO_B,       0o1     ],   // −0.195 — sub la rando
    [ RANDO_Y - 0o3/0o200,  0o27/0o400,     0o31/0o400,    0o2/0o3 ],   // −0.211 — la talio de la ŝtipo
    [ -0o1/0o4,             0o31/0o400,     0o32/0o400,    0       ],   // −0.25 — la suro ( la mondo 0.25 )
    [ -0o54/0o200,          0o31/0o400,     0o31/0o400,    0       ],   // −0.344 — la maleolo ( la mondo 0.156 )
    [ -0o66/0o200,          0o31/0o400,     0o30/0o400,    0       ],   // −0.422 — ene de la piedo
    [ -0o73/0o200,          0o27/0o400,     0o27/0o400,    0       ],   // −0.461 — profunde ene de la ledo
    [ -0o76/0o200,          0o16/0o400,     0o16/0o400,    0       ],   // −0.484 — en la plandon
  ];
  // ⟨ La ŝtipo FLUAS en la piedon 📃 ⟩ — la du malsupraj ringoj estas same larĝaj
  // kiel la pieda ledo ĉe la maleolo ( 0.0977 kontraŭ 0.1016 ), do la supraĵo de la
  // ŝtipo kaj tiu de la piedo kunfalas en UNU konturon — sen tio la ŝtipo legiĝus
  // kiel tubo enŝovita en pli grandan piedon. Samtempe la ringoj restas sub la
  // supraĵo de la piedo ( la piedo altiĝis al 0.164 ), do la buŝo de la ŝtipo ne
  // malfermiĝas kaj oni ne vidas la internon ( la pantalono aperis tra tia fendo ).
  // ⟨ La ŝtipo PLONĜAS tra la ledo ĝis la plando 📃 ⟩ — kun la malnova fermo la
  // ŝtipo finiĝis 0.016 SUPER la supraĵo de la ledo, do ĝia ferma ventumilo ( plata
  // disko ) videblis kiel ŝtupo inter la tubo kaj la piedo — la boto aspektis kiel
  // du pecoj. Nun la du lastaj ringoj ( 0.0898 kaj 0.0547 duonlarĝaj ) malsupreniras
  // SUB la ledan supraĵon kaj en la plandon mem, kaj la ferma ventumilo kaŝiĝas
  // tie — de la rando ĝis la grundo la boto do estas UNU kontinua formo.
  // ⟨ La fermaj ĉapoj 📃 ⟩ — ringo kun ĉiuj punktoj en la centro kolapsas en
  // ventumilon, do la ĉapo venas el la SAMA kunligo kiel la ceteraj ringoj kaj
  // ĝia ventumilo sekvas la saman regulon ( sen duobla kodo por la ĉapoj ). Sen
  // ili oni vidus en la malfermitajn tubojn — la unua versio havis malfermitan
  // manumon kaj oni povis rigardi interne de la boto.
  const centro = ( y: number, z: number ) => Array.from({ length: K },
    () => [ 0, y, z ] as [ number, number, number ] );
  // ringo — Unu ringo de konko ĉirkaŭ la vertikala akso. La kresto ( p ) levas la
  // punktojn laŭ la azimuto, do la akcentaj bendoj povas sekvi la saman supron
  // kiel la ledo — sen ĝi la kolumo restus horizontala super V-forma rando.
  // ⟨ La manumo ne portas la angulajn noĉojn 📃 ⟩ — la noĉoj apartenas al la leda
  // rando ( la kvar anguloj de la superelipso ). Sur la akcenta manumo ili faris
  // kronon da akraj pintoj super la buŝo de la boto, do oni vidas la ledon tra la
  // fendoj — la manumo lasas la noĉojn al la ŝtipo ( kiu estas kaŝita sub ĝi ).
  const ringo = ( y: number, a: number, b: number, p = 0, noĉoj = true ) =>
    Array.from({ length: K }, ( _, i ) => {
      const ang = r(i);
      const [ x, z ] = superelipso(ang, a, b, 0o4);
      const ondo = kresto(ang) - ( noĉoj ? angulaNoĉo(ang) : 0 );
      return [ x, y + ondo * p, z ] as [ number, number, number ];
    });
  const ŝtipajRingoj = [ centro(stipajRingoj[0][0], 0),
    ...stipajRingoj.map(([ y, a, b, p ]) => ringo(y, a, b, p)),
    centro(stipajRingoj[stipajRingoj.length - 0o1][0], 0) ];
  const ŝtipo = kreiRinganSurfacon(ŝtipajRingoj);

  // ⟨ La piedo estas TRAPEZO 📃 ⟩ — [ z, duonlarĝo, la supro de la sekco ]. La
  // kalkano estas malalta kaj mallarĝa, la maleolo ( z ≈ 0 ) estas la plej alta
  // punkto ( la mondo 0.094 = MALEOLO_Y, la pivoto de la piedo ), kaj la
  // supraĵo restas preskaŭ HORIZONTALA ĝis ĝi malkreskas ĉe la pinto. Antaŭe la
  // pinto mallarĝiĝis al 0.0156 kaj la supraĵo deklivis senĉese malsupren — la
  // ŝuo legiĝis kiel kojno. Nun la lasta sekco estas 0.0547 larĝa ( la sama
  // larĝo kiel la mallongaj flankoj de la superelipso, do la pinto legiĝas kiel
  // RONDIGITA ORTANGULO ) kaj ĝia supro restas 0.0157 super la plando.
  // ⟨ La piedo estas PLI ALTA 📃 ⟩ — la supraĵo de la piedo iris ĝis 0.094 super
  // la grundo ( plata pantoflo ), poste al 0.141. Nun ĝi atingas 0.164 ĉe la
  // maleolo kaj 0.102 ĉe la pinto, do la ledo vere KOVRAS la piedon kaj la boto
  // legiĝas kiel boto — la tuta pieda parto de la ŝuo altiĝis je 0.023, kaj la
  // sekcoj restas ekster la bota ŝtipo ( vidu supre ).
  const piedajSekcoj: [ number, number, number ][] = [
    [ -0o15/0o200, 0o10/0o200, -0o60/0o200 ],   // la kalkano ( la mondo 0.125 )
    [ -0o11/0o200, 0o13/0o200, -0o56/0o200 ],   // −0.086 ( la mondo 0.141 )
    [ -0o5/0o200,  0o14/0o200, -0o54/0o200 ],   // −0.039 ( la mondo 0.156 )
    [  0o1/0o200,  0o15/0o200, -0o53/0o200 ],   // 0.008 — la maleolo ( la plej alta : 0.164 )
    [  0o5/0o200,  0o15/0o200, -0o54/0o200 ],   // 0.039 ( la mondo 0.156 )
    [  0o16/0o200, 0o14/0o200, -0o56/0o200 ],   // 0.125 — la pilko de la piedo
    [  0o22/0o200, 0o13/0o200, -0o60/0o200 ],   // 0.172
    [  0o25/0o200, 0o12/0o200, -0o62/0o200 ],   // 0.203
    [  0o30/0o200, 0o7/0o200,  -0o63/0o200 ],   // 0.234 — la pinto ( LARĜA, restas super la plando )
  ];
  // ⟨ La pinto restas super la plando 📃 ⟩ — la lasta sekco antaŭe falis sub la
  // supran surfacon de la plando, do la sekco renversiĝis kaj la pinto farigxis
  // plata rubando. La supro de la pinto nun restas 0.0157 super la plando.
  // ⟨ La ledo finiĝas sub la plando 📃 ⟩ — la sekcoj mezuriĝas de LEDA_FUNDO ( ne
  // de PLANDA_SUPRO ), do la malsupro de la ledo kaŝiĝas 0.01 en la plandon — la
  // supraĵo ( kiu gravas por la akcenta konturo, vidu suproJe ) ne ŝanĝiĝas.
  const piedajRingoj = [ centro(piedajSekcoj[0][2] / 0o2 + PLANDA_SUPRO / 0o2, piedajSekcoj[0][0]),
    ...piedajSekcoj.map(([ z, a, supro ]) => {
      const hh = ( supro - LEDA_FUNDO ) / 0o2, yc = ( supro + LEDA_FUNDO ) / 0o2;
      return Array.from({ length: K }, ( _, i ) => {
        const [ x, y ] = superelipso(r(i), a, hh, 0o4);
        return [ x, yc + y, z ] as [ number, number, number ];
      });
    }),
    centro(piedajSekcoj[piedajSekcoj.length - 0o1][2] / 0o2 + PLANDA_SUPRO / 0o2,
      piedajSekcoj[piedajSekcoj.length - 0o1][0]) ];
  const piedo = kreiRinganSurfacon(piedajRingoj);


  // ⟨ La plando 📃 ⟩ — ĝi sekvas la SAMAN sekco-liston kiel la piedo, do la du
  // surfacoj neniam povas disiĝi ( la antaŭa versio estis aparta plata skatolo,
  // kaj la piedo flosis super ĝi ). La plando estas nur iomete pli larĝa ( la
  // rando de la ledo ).
  // ⟨ La plando estas EGALDika 📃 ⟩ — antaŭe ĝi dikiĝis je 0.015 ĉe la kalkano
  // kaj ĝiaj malsupraj flankoj kuntiriĝis al 0.85, do la ŝuo staris sur kojno.
  // Nun la plando estas FLATA tabulo kun vertikalaj flankoj — de la flanko la
  // ŝuo estas trapezo, kiel vera plata ŝuo.
  // ⟨ La plando kaj ĝia rando ELSTARAS laŭ la longo 📃 ⟩ — ili uzis la SAMAN
  // sekco-liston kiel la ledo, do iliaj fermaj ventumiloj ( ĉe la pinto kaj ĉe la
  // kalkano ) sidis en la SAMA ebeno kiel tiuj de la ledo. La profundaĵa bufro ne
  // povas apartigi du surfacojn en la sama ebeno, do la pinto de la ŝuo makuliĝis
  // per batalantaj facetoj ( la « ŝu-fundo » videble eniris la akcentan plandon ).
  // Nun ĉiu akcenta parto etendiĝas IOM PLI MALPROKSIMEN ol la ledo ĉe ambaŭ finoj
  // kaj estas iomete pli larĝa, do la ventumiloj de la ledo sidas TUTE INTERNE de
  // la akcenta plando kaj neniuj du surfacoj koincidas.
  const sekcojKunFinoj = ( etendo: number, largxo: number ): [ number, number, number ][] =>
    piedajSekcoj.map(( sect, i ) => [ i === 0 ? sect[0] - etendo
      : i === piedajSekcoj.length - 0o1 ? sect[0] + etendo : sect[0],
      sect[1] + largxo, sect[2] ] as [ number, number, number ] );
  const plandajSekcoj = sekcojKunFinoj(0o1/0o100, 0o3/0o400);   // la plando
  const randajSekcoj = sekcojKunFinoj(0o3/0o400, 0o1/0o200);    // la rando
  const plandaDuono = PLANDA_ALTO / 0o2;
  const plandaYc = ( PLANDA_SUPRO + GRUNDO ) / 0o2;
  const plando = kreiRinganSurfacon([
    centro(plandaYc, plandajSekcoj[0][0]),
    ...plandajSekcoj.map(([ z, a ]) => Array.from({ length: K }, ( _, j ) => {
      const [ x, y ] = superelipso(r(j), a, plandaDuono, 0o4);
      return [ x, plandaYc + y, z ] as [ number, number, number ];
    })),
    centro(plandaYc, plandajSekcoj[plandajSekcoj.length - 0o1][0]),
  ]);
  // ⟨ La rando ĉe la plando ( la "welt" ) 📃 ⟩ — maldika lipo kiu leviĝas el la
  // supraĵo de la plando kaj etendiĝas iomete preter ĝi. Sen ĝi la plando legiĝas
  // kiel aparta tabulo sub la ŝuo; kun ĝi ĝi legiĝas kiel rando ĉirkaŭ la piedo,
  // kaj la akcenta koloro sidas sur la limo inter la ledo kaj la grundo.
  const plandaRando = kreiRinganSurfacon([
    centro(PLANDA_SUPRO, randajSekcoj[0][0]),
    ...randajSekcoj.map(([ z, a ]) => Array.from({ length: K }, ( _, j ) => {
      // ⟨ La lipo ne leviĝas super la piedon 📃 ⟩ — ĝia duona alto estas 0o1/0o200
      // kaj ĝia supro sekvas la sekcon, do ĉe la pinto ( kie la sekco mem estas
      // preskaŭ plata ) la lipo restas SUB la supraĵo de la ledo. Kun pli dika
      // lipo la tuta pinto kovriĝis per la akcenta koloro.
      const [ x, y ] = superelipso(r(j), a + 0o1/0o200, 0o1/0o200, 0o4);
      return [ x, PLANDA_SUPRO + y, z ] as [ number, number, number ];
    })),
    centro(PLANDA_SUPRO, randajSekcoj[randajSekcoj.length - 0o1][0]),
  ]);
  // ⟨ La akcenta HORIZONTALA konturo sur la piedo 📃 ⟩ — antaŭe la akcento de la ŝuo
  // estis bendo ĉirkaŭ la MEZO de la ŝtipo ( meze de la kruro ), poste bendo TRANS la
  // vamfo ( kiu legiĝis kiel vertikala rimeno ), poste preskaŭ RONDA ovalo. La ovalo
  // ankoraŭ legiĝis kiel rimeno, ĉar ĝi ĉirkaŭis la piedon de ĉiu flanko. Nun la
  // desegno estas HORIZONTALA konturo sur la SUPRAĴO de la piedo — RONDIGITA
  // ORTANGULO ( la sama form-lingvo kiel la mondo — vidu formoj.ts ), kiu kuŝas sur
  // la vamfo, LARĜA trans la piedon kaj mallonga laŭ ĝia longo. La du longaj strekoj
  // sekvas la ledon de flanko al flanko kaj la du mallongaj fermas la konturon antaŭe
  // kaj malantaŭe, do de antaŭe kaj de supre oni vidas horizontalan konturon — ne
  // rimenon. Ĝi estas la plej supra tavolo de la piedo kaj sekvas ĝian kurbon.
  // ⟨ Kie la konturo sidas 📃 ⟩ — la sekco de la piedo je ajna z ( interpolo inter la
  // najbaraj sekcoj ) donas la duonlarĝon a kaj la supron; la punkto de la supraĵo je
  // donita x estas | y | = hh ( 1 − ( x / a )⁴ )^( 1/4 ), do la konturo sidas ĝuste sur
  // la ledo kaj neniam flosas super ĝi aŭ sinkas en ĝin.
  const sekcoJe = ( z: number ): [ number, number ] => {
    for ( let i = 0; i + 0o1 < piedajSekcoj.length; i++ ) {
      const a = piedajSekcoj[i], b = piedajSekcoj[i + 0o1];
      if ( z >= a[0] && z <= b[0] ) {
        const t = ( z - a[0] ) / ( b[0] - a[0] );
        return [ a[1] + ( b[1] - a[1] ) * t, a[2] + ( b[2] - a[2] ) * t ];
      }
    }
    const lasta = piedajSekcoj[piedajSekcoj.length - 0o1];
    return [ lasta[1], lasta[2] ];
  };
  // suproJe — La punkto sur la supraĵo de la piedo je ( x, z ) kaj ĝia normalo ( la
  // normalo de la superelipsa sekco, do ĝi montras supren kaj flanken, ne laŭlonge —
  // la deklivo de la piedo laŭ sia longo estas tro malgranda por gravi ).
  const suproJe = ( x: number, z: number ): [ THREE.Vector3, THREE.Vector3 ] => {
    const [ a, supro ] = sekcoJe(z);
    const hh = ( supro - PLANDA_SUPRO ) / 0o2, yc = ( supro + PLANDA_SUPRO ) / 0o2;
    const u = Math.min(Math.abs(x) / a, 0o1);
    const v = Math.pow(Math.max(0, 0o1 - Math.pow(u, 0o4)), 0o1/0o4);
    return [ new THREE.Vector3(x, yc + hh * v, z),
      new THREE.Vector3(Math.sign(x) * Math.pow(u, 0o3) / a, Math.pow(v, 0o3) / hh, 0)
        .normalize() ];
  };
  // ⟨ La konturo iras de la pinto ĝis la kalkano 📃 ⟩ — la ŝtipo estas tubo kiu
  // malsupreniĝas ĝis −0.281 kaj tie fermiĝas, do ĝi ĉirkaŭas la mezan parton de la
  // piedo kaj kaŝas ajnan desegnon tie ( la piedo "elkreskas" el la ŝtipo je
  // | z | ≈ 0.086 ). La konturo do NE plu estas malgranda ortangulo sur la vamfo —
  // ĝi estas MALDika STRIPO kiu iras de la pinto ĝis malantaŭ la ŝtipo. Ĝia
  // malantaŭa parto malaperas en la ŝtipo ( kiel la kudro de vera boto ) kaj tio
  // estas la celo — de antaŭe kaj de flanke oni vidas la du paralelajn strekojn
  // eliri el sub la ŝtipo kaj kuri antaŭen al la pinto, do la akcento legiĝas kiel
  // linio laŭ la tuta longo de la ŝuo anstataŭ kiel ringo sur la vamfo.
  const KONTURO_X = 0o13/0o400;       // 0.0430 — la duonlarĝo ( trans la piedon )
  const KONTURO_Z = 0o37/0o400;       // 0.1211 — la duonlongo ( laŭ la piedo )
  const KONTURO_CENTRO = 0o16/0o400;  // 0.0547 — la centro laŭ la longo de la ŝuo
  const KONTURO_DIKO = 0o3/0o400;     // 0.0117 — la larĝo de la streko
  // ⟨ La streko elstaras pli 📃 ⟩ — kun 0.0039 ĝi estis preskaŭ sur la ledo mem
  // kaj la du surfacoj batalis pri la profundo, kiam la figuro malproksimiĝis
  // ( la profundaĵa bufro de la bildigilo ne plu apartigas ilin ). Nun la streko
  // leviĝas 0.0078 — ankoraŭ mallarĝa, sed klare SUPER la ledo.
  const KONTURO_ALTO = 0o1/0o200;     // 0.0078 — kiom la streko elstaras el la ledo
  const KONTURO_PUNKTOJ = 0o40;       // la punktoj ĉirkaŭ la konturo
  // konturaPunkto — La punkto SUR la supraĵo de la piedo ( kaj ĝia normalo ) je
  // angulo de la konturo. La vojo estas superelipso kun la eksponento 0o4, do
  // RONDIGITA ORTANGULO — la mallongaj flankoj iras preskaŭ rekte trans la piedon kaj
  // la longaj preskaŭ rekte laŭ ĝia longo. La vojo estas esprimata en ( x, z ) kaj la
  // funkcio suproJe levas ĝin al la supraĵo de la ledo.
  const konturaPunkto = ( ang: number ): [ THREE.Vector3, THREE.Vector3 ] => {
    const [ x, z ] = superelipso(ang, KONTURO_X, KONTURO_Z, 0o4);
    return suproJe(x, KONTURO_CENTRO + z);
  };
  const konturajRingoj: [ number, number, number ][][] = [];
  for ( let i = 0; i <= KONTURO_PUNKTOJ; i++ ) {   // la lasta ringo ripetas la unuan
    const ang = i / KONTURO_PUNKTOJ * Math.PI * 0o2;
    const [ punkto, normalo ] = konturaPunkto(ang);
    // ⟨ La kadro de la streko 📃 ⟩ — la direkto laŭ la konturo ( el la najbaraj
    // punktoj de la kurbo ), la normalo de la supraĵo, kaj ilia vektora produto ( la
    // flanko ). La streko do turniĝas kun la kurbo — ĉe la mallongaj flankoj — kie la
    // kurbo iras trans la piedon — la streko sekvas tiun turnon anstataŭ stariĝi kiel
    // muro.
    const [ antauxa ] = konturaPunkto(ang - 0o1/0o20);
    const [ posta ] = konturaPunkto(ang + 0o1/0o20);
    const direkto = posta.clone().sub(antauxa).normalize();
    const flanko = normalo.clone().cross(direkto).normalize();
    const duono = flanko.clone().multiplyScalar(KONTURO_DIKO / 0o2);
    const supren = normalo.clone().multiplyScalar(KONTURO_ALTO);
    const interna = punkto.clone().sub(duono), ekstera = punkto.clone().add(duono);
    // la kvar anguloj de la streko — maldekstre, dekstre, supre, supre maldekstre
    // ( la ordo rondiras maldekstren ĉirkaŭ la progres-akso, kiel la piedo mem ).
    konturajRingoj.push([
      [ interna.x, interna.y, interna.z ],
      [ ekstera.x, ekstera.y, ekstera.z ],
      [ ekstera.x + supren.x, ekstera.y + supren.y, ekstera.z + supren.z ],
      [ interna.x + supren.x, interna.y + supren.y, interna.z + supren.z ],
    ]);
  }
  const piedaRando = kreiRinganSurfacon(konturajRingoj);
  // ⟨ La akcenta MANUMO ĉe la supro 📃 ⟩ — la akcento de la ŝuo estas vera MANUMO
  // ( la rando de la boto faldiĝinta eksteren kaj malsupren ) — ĝi etendiĝas de 0.0078
  // ĝis 0.0391 ( 0.031 alta ) kaj staras 0.0117 preter la leda ŝtipo, do de ĉiu
  // flanko oni klare vidas akcentan bendon ĉe la supro — antaŭe la akcento estis nur
  // 0.0039 elstara lipo, kiu preskaŭ perdiĝis kontraŭ la ledo. Ĝia supra rando sekvas
  // la V-forman kreston kaj la kvar angulojn ( p = 1, same kiel la leda rando sub
  // ĝi ), do la du randoj ondiĝas KUNE. Poste ĝi RULIĜAS INTERNEN ( ĝia interna
  // ringo sidas sur la leda rando mem ) kaj la ĉapo fermas la buŝon de la ŝuo — sen
  // ĝi oni vidus tra la ŝtipo, kaj de supre oni vidas akcentan ringon ĉirkaŭ la
  // pantalono anstataŭ truon.
  // ⟨ La manumo NE duobligas la ledan surfacon 📃 ⟩ — antaŭe ĉi tiu manumo havis
  // du ringojn ĝuste SAMRADIUSE kiel la rando de la leda ŝtipo ( 0.09375 ) kaj
  // nur 0.005 aparte en la alto, kaj ĝia lasta ringo sidadis SUPER la randon de
  // la ŝtipo ( −0.1825 kontraŭ −0.1875 ). La du surfacoj do batalis pri la sama
  // profundo ( z-fighting ) ĉe la tuta rando, kaj super la ŝtipo restis malfermita
  // poŝo, tra kiu oni vidis la pantalonon. Nun la interna ringo estas 0.004 pli
  // MALGRANDA ol la ŝtipo kaj la faldita parto malsupreniras SUB la randon de la
  // ŝtipo ( −0.1925 ), do la ferma ventumilo kaŝiĝas ene de la ŝtipo, kaj la
  // manumo estas nur ronda bendo, kiu elstaras el la ledo.
  const KUF_SUB = RANDO_Y - 0o1/0o50;    // la malsupra rando de la manumo ( 0.02 sub la rando )
  const KUF_SUPRO = RANDO_Y + 0o3/0o200; // ĝia supra rando ( 0.0117 super la rando )
  const KUF_ELSTARO = 0o3/0o400;         // 0.0117 — kiom la manumo elstaras el la ledo
  const krestaRando = kreiRinganSurfacon([
    ringo(KUF_SUB, RANDO_A - 0o1/0o50, RANDO_B - 0o1/0o50, 0o1, false),
    ringo(KUF_SUB, RANDO_A + KUF_ELSTARO, RANDO_B + KUF_ELSTARO, 0o1, false),
    ringo(KUF_SUPRO, RANDO_A + KUF_ELSTARO, RANDO_B + KUF_ELSTARO, 0o1, false),
    ringo(RANDO_Y - 0o1/0o200, RANDO_A - 0o1/0o100, RANDO_B - 0o1/0o100, 0o1, false),
    centro(RANDO_Y - 0o1/0o200, 0),
  ]);
  // ⟨ La kvar akcentaj partoj estas UNU geometrio 📃 ⟩ — la plando, la rando ĉe
  // la plando, la konturo sur la piedo kaj la bendo ĉe la supro portas la saman
  // akcentan materialon, do ili kunfandiĝas kaj la tuta akcento de unu piedo kostas
  // unu desegnan alvokon ( antaŭe la plando mem estis la dua alvoko ).
  const akcentaj = kunfandiGeometriojn([ plando, plandaRando, piedaRando, krestaRando ]);
  aplikiSkatolajnUvojn(akcentaj, 0o2);

  for ( const peco of [ ŝtipo, piedo ] ) aplikiSkatolajnUvojn(peco, 0o2);
  return { boto: kunfandiGeometriojn([ ŝtipo, piedo ]), akcentaj };
}

// KAPA_R — la REFERENCA radiuso de la kapo. La kranio ( vidu kreiKapanKranion )
// nun estas ringa profilo, sed ĝi restas INTERNE de ĉi tiu sfero, kaj la okuloj,
// la har-ĉapo kaj la har-kurteno ĉiuj mezuriĝas de ĝi — unu nombro por la tuta kapo.
const KAPA_R = 0o13/0o100;   // 0.171875
// ⟨ La homa modelo kaj la vesto-modelo 📃 ⟩ La geometrioj apartenas al du grupoj —
// la HOMA modelo ( la kapo, la vizaĝo, la mano, la torso kaj la kruroj — la
// haŭto ) kaj la VESTA modelo ( la robo, la interna ĉemizo, la pantalono, la
// manikoj, la botoj kaj iliaj akcentaj partoj ). Ili dividas neniun geometrion kaj
// ĉiu mesho de la figuro ricevas sian grupon en userData.speco, do la figuro
// ankaŭ portas la du listojn ( korpo kaj vesto ) — la vesto povas kaŝiĝi, ŝanĝiĝi
// aŭ anstataŭiĝi sendepende de la korpo.
let figurajGeometrioj: {
  kapa: THREE.BufferGeometry;       // la kapo, la oreloj, la nazo kaj la kolo ( la haŭto )
  vizaĝo: THREE.BufferGeometry;     // la okuloj ( malhela materialo, dividita )
  vizaĝajStrikoj: THREE.BufferGeometry; // la brovoj kaj la okulharoj ( hara materialo )
  palpebroj: THREE.BufferGeometry;  // la palpebroj ( haŭto, moviĝas dum palpebrumo )
  korpo: THREE.BufferGeometry;      // la torso ( la homa modelo, sub la ĉemizo )
  // ⟨ La membroj venas en DU partojn 📃 ⟩ — la kruro kaj la brako disiĝas ĉe la
  // genuo kaj la kubuto, ĉar ili fleksiĝas tie ( vidu marŝSvingon ). La malsupraj
  // partoj mezuriĝas de la artiko, do iliaj meshoj sidas ĉe la nulo en la artika
  // grupo; la supraj partoj restas en la kadro de la kokso kaj de la ŝultro.
  kruroSupra: THREE.BufferGeometry; // la femuro
  kruroMalsupra: THREE.BufferGeometry; // la tibio plus la patelo
  korpaPiedo: THREE.BufferGeometry; // la homa piedo ( en la maleola grupo de la ŝuo )
  brakoSupra: THREE.BufferGeometry; // la ŝultro kaj la bicepso
  brakoMalsupra: THREE.BufferGeometry; // la antaŭbrako plus la kubuta osto
  mano: THREE.BufferGeometry;       // la manplato, la dikfingro kaj la fingroj
  ungoj: THREE.BufferGeometry;      // la ungoj de la fingroj ( sia materialo )
  interna: THREE.BufferGeometry;    // la interna ĉemizo ( kun la kolumo )
  roba: THREE.BufferGeometry;       // ↓ la vesto-modelo
  pantalonaSupra: THREE.BufferGeometry;
  pantalonaMalsupra: THREE.BufferGeometry;
  boto: THREE.BufferGeometry;       // la bota ŝafto kaj la piedo ( unu materialo )
  akcenta: THREE.BufferGeometry;    // la plando kaj la akcentaj randoj de la ŝuo
  manikaSupra: THREE.BufferGeometry;    // la foli-tondita tubo super la kubuto
  manikaMalsupra: THREE.BufferGeometry; // la tubo sub la kubuto ( la tondita rando )
} | null = null;

// ⟪ La vizaĝaj formoj 👁️ ⟫

// vizaĝaBazaro — La ortonorma bazaro de punkto sur la kapa sfero — la horizontala,
// la vertikala kaj la ekstera normalo. La okuloj kaj la nazo orientiĝas per ĝi, do
// ili kuŝas SUR la vizaĝo ( la supra duono de la kranio sekvas tiun saman sferon ). ( La malnova lenso turniĝis per setFromUnitVectors, kiu
// elektas la plej mallongan turnon — la formo do turniĝis hazarde ĉirkaŭ sia akso
// kaj brovo povis montri flanken. )
//     @param dx, dy, dz ( number ) - La direkto de la kapcentro al la punkto.
//     @returns ( [ horizontala, vertikala, normalo ] ) - La tri aksoj.
function vizaĝaBazaro(dx: number, dy: number, dz: number)
  : [ THREE.Vector3, THREE.Vector3, THREE.Vector3 ] {
  const normalo = new THREE.Vector3(dx, dy, dz).normalize();
  const horizontala = new THREE.Vector3(0, 0o1, 0).cross(normalo).normalize();
  return [ horizontala, normalo.clone().cross(horizontala).normalize(), normalo ];
}

// kreiOkulon — La okulo — FOLIO-forma malhela lenso sur la vizaĝo. La
// formo estas vera folio — du cirklaj arkoj renkontiĝantaj ĉe du akraj pintoj,
// glata kaj plena en la mezo — kaj la okulo elstaras nur kelkajn milimetrojn el la
// kapo, do ĝi legiĝas kiel okulo anstataŭ kiel glubendo. ( La antaŭa okulo estis
// platpremita GLOBO — malhela RONDO sur la vizaĝo. )
//     @param dir ( number ) - -1 maldekstre, +1 dekstre.
//     @param dx, dy, dz ( number ) - La centro, rilate al la kapcentro.
//     @param largho, alto ( number ) - La duonlarĝo kaj la duonalto de la folio.
//     @param klino ( number ) - La turno ĉirkaŭ la normalo ( la interna angulo de
//         okulo sidas pli malalte ol la ekstera, do la rigardo havas direkton ).
//     @returns geometrio ( THREE.BufferGeometry ) - La okulo.
function kreiOkulon(dir: number, dx: number, dy: number, dz: number,
  largho: number, alto: number, klino: number): THREE.BufferGeometry {
  const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(dir * dx, dy, dz);
  // ⟨ La folio bezonas pli da punktoj 📃 ⟩ — kun 0o14 la du pintoj estis precizaj
  // verticoj sed la arko inter ili montris kvar aŭ kvin rektajn randojn, do la
  // okulo legiĝis kiel plurangulo. La folia arko estas glata, do 0o20 punktoj
  // estas la minimumo por ke la rando restu kurba.
  const N = 0o20;                       // la punktoj ĉirkaŭ la folio
  const DIKO = 0o1/0o200;               // 0.0078 — kiom la okulo elstaras
  const bazo = new THREE.Vector3(dir * dx, KAPA_Y + dy, dz);
  const kos = Math.cos(klino), sin = Math.sin(klino);
  const pozicioj: number[] = [];
  // ⟨ La UV-oj montras la pupilon 📃 ⟩ — la kanvaso enhavas la pupilon meze, do
  // ĉiu vertico spegulas sian 2D-lokan ofseton ( rx, ry ) en la kanvon. Sen UV-oj
  // la tuta folio legis la saman angulan punkton kaj la okulo restis unukolora.
  const uvoj: number[] = [];
  // ⟨ Du ringoj kaj la centro 📃 ⟩ — la sama ventumila skemo kiel la nazo — la
  // rando sidas sur la kapo, pli malgranda ringo elstaras iomete, kaj la centro
  // plej multe. Sen la meza ringo la lenso estus plata disko.
  for ( const [ grando, diko ] of [ [ 0o1, 0 ], [ 0o11/0o20, DIKO * 0o7/0o10 ] ] as [ number, number ][] ) {
    // ⟨ La radiuso de la folia arko 📃 ⟩ — la cirklo kiu trapasas la tri punktojn
    // ( ±largho, 0 ) kaj ( 0, alto ). Ĝi estas kalkulita el la SKALITA duonlarĝo
    // kaj duonalto, do la interna ringo estas preciza malgrandigo de la rando.
    const lg = largho * grando, ag = alto * grando;
    const R = ( lg * lg + ag * ag ) / ( 0o2 * ag );
    const Rr = R * R, Rm = R - ag;
    for ( let i = 0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2;
      const k = Math.cos(t), s = Math.sin(t);
      // ⟨ La folio 📃 ⟩ — la malnova profilo estis superelipso kun la eksponento
      // 0o3 anstataŭ 0o2 — ĝi restis preskaŭ same larĝa ĝis la finoj kaj pinĉiĝis
      // nur tie, do la okulo legiĝis kiel ortangulo kun du pintoj. La folio venas
      // el DU CIRKLAJ ARKOJ kiuj renkontiĝas ĉe la du pintoj — la arko trapasas
      // ( ±largho, 0 ) kaj ( 0, alto ) — do la kurbo estas glata kaj plena en la
      // mezo kaj akriĝas nur ĉe la pintoj, kiel folio.
      const fx = lg * k;
      const folio = Math.sqrt(Math.max(0, Rr - fx * fx)) - Rm;
      const py = Math.sign(s) * folio;
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      pozicioj.push(
        bazo.x + horizontala.x * rx + vertikala.x * ry + normalo.x * diko,
        bazo.y + horizontala.y * rx + vertikala.y * ry + normalo.y * diko,
        bazo.z + horizontala.z * rx + vertikala.z * ry + normalo.z * diko);
      uvoj.push(0o1/0o2 + rx / ( 0o2 * largho ), 0o1/0o2 + ry / ( 0o2 * alto ));
    }
  }
  pozicioj.push(bazo.x + normalo.x * DIKO, bazo.y + normalo.y * DIKO, bazo.z + normalo.z * DIKO);
  uvoj.push(0o1/0o2, 0o1/0o2);
  const indeksoj: number[] = [];
  for ( let i = 0; i < N; i++ ) {
    const a = i, b = ( i + 0o1 ) % N, c = N + i, d = N + ( i + 0o1 ) % N;
    indeksoj.push(a, b, c, b, d, c);     // la rando inter la du ringoj
    indeksoj.push(c, d, N * 0o2);        // la ventumilo al la centro
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

// palpebraPivoto — La alto de la pivoto de la palpebroj, rilate al la kapo-grupo.
// La mesho SKALIĜAS malsupren el ĉi tiu linio ( vidu la palpebrumon en
// marŝSvingon ), do la linio estas la strio, al kiu la malfermita palpebro
// kunpremiĝas. La du okuloj sidas je la sama alto, do unu nombro servas ambaŭ kaj
// la tuta palpebraro estas unu mesho.
// ⟨ Kial la pivoto egalas al la strio 📃 ⟩ — PALPEBRA_STRIO ( vidu la konstantojn
// supre ) estas la nura libera nombro de la tuta palpebro — ĉio alia devenas de
// la okulo mem. La folio de la geometrio deŝoviĝas malsupren per levo, kiu
// enhavas OKULA_NORMALA_Y-on; tiu deŝovo kaj la pivoto kune metas la folion ĝuste
// sur la okulcentron kiam la skalo estas 1, kaj ĉe skalo 0 la mesho kolapsas
// ĝuste sur ĉi tiun linion.
//     @returns alto ( number ) - La pivoto, rilate al la kapo-grupo.
function palpebraPivoto(): number {
  return KAPA_Y + OKULA_DY + PALPEBRA_STRIO - KOLO_Y;
}

// kreiPalpebrojn — La palpebroj — du haŭtaj folioj, unu antaŭ ĉiu okulo. Ĉiu folio
// estas la SAMA folia lenso kiel la okulo ( vidu kreiOkulon ), nur PALPEBRA_GRANDON
// pli granda, do ĝi plene kovras la okulon kiam ĝi fermas — la okulharoj kaj la
// pintoj de la okulo neniam restas videblaj.
// ⟨ La palpebro estas PARALELA al la okulo 📃 ⟩ — ĝi ricevas la saman bazaron kaj
// la saman kliniĝon kiel la okulo, do la du folioj restas paralelaj kaj la
// antaŭeno estas egala ĉie. Kun folio GLOBITA sur la kranian surfacon ( kiel la
// brovoj ) la vizaĝo reirus ĉe la anguloj dum la plata okulo restus antaŭe — la
// okulo tiam trapikus la palpebron ĝuste ĉe siaj anguloj.
// ⟨ La alto de la geometrio estas ŝovita 📃 ⟩ — la geometrio mem ne enhavas la
// absolutajn altojn de la kapo ( male ol la okulo, kiu bakas KAPA_Y-on en ĉiun
// verticon ), ĉar skalo devas multipliki la folion kaj ne la tutan kapon. Nur la
// vertikala parto do aperas en la y-koordinato, kaj levo deŝovas la folion
// malsupren tiom, ke la mesho ĉe palpebraPivoto metos ĝin ĝuste sur la okulon.
//     @returns geometrio ( THREE.BufferGeometry ) - La du palpebroj, ĉe la kapo.
function kreiPalpebrojn(): THREE.BufferGeometry {
  const N = 0o20;                      // la punktoj ĉirkaŭ la folio
  const largho = OKULA_LARĜO * PALPEBRA_GRANDO;
  const alto = OKULA_ALTO * PALPEBRA_GRANDO;
  const diko = OKULA_DIKO + PALPEBRA_DIKO;
  // Kiom la folio deŝoviĝas malsupren en la geometrio. La unua parto portas la
  // folion de la pivoto ( la strio ) malsupren al la okulcentro, la dua forprenas
  // la antaŭenon, kiun la normala klineco aldonas al la alto de la folio — sen
  // ĝi la folio sidus 0.0037 tro malalte kaj la fermita okulo montrus okul-sakon.
  const levo = PALPEBRA_STRIO + OKULA_NORMALA_Y * diko;
  const R = ( largho * largho + alto * alto ) / ( 0o2 * alto ), Rr = R * R, Rm = R - alto;
  const partoj: THREE.BufferGeometry[] = [];
  for ( const dir of [ -0o1, 0o1 ] ) {
    const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(dir * OKULA_DX,
      OKULA_DY, OKULA_DZ);
    // ⟨ La klino de la okulo restas 📃 ⟩ — la interna angulo de la fermita okulo
    // devas sidi same kiel tiu de la malfermita, alie la okulo ŝajnus turniĝi dum
    // ĉiu palpebrumo.
    const klino = dir * 0o1/0o10;
    const kos = Math.cos(klino), sin = Math.sin(klino);
    const pozicioj: number[] = [], uvoj: number[] = [], indeksoj: number[] = [];
    for ( let i = 0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2, k = Math.cos(t), s = Math.sin(t);
      const fx = largho * k;
      const folio = Math.sqrt(Math.max(0, Rr - fx * fx)) - Rm;
      const py = Math.sign(s) * folio;
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      pozicioj.push(dir * OKULA_DX + horizontala.x * rx + vertikala.x * ry
        + normalo.x * diko, vertikala.y * ry + normalo.y * diko - levo,
        OKULA_DZ + horizontala.z * rx + vertikala.z * ry + normalo.z * diko);
      uvoj.push(0o1/0o2 + rx / ( 0o2 * largho ), 0o1/0o2 + ry / ( 0o2 * alto ));
    }
    pozicioj.push(dir * OKULA_DX + normalo.x * diko, normalo.y * diko - levo,
      OKULA_DZ + normalo.z * diko);
    uvoj.push(0o1/0o2, 0o1/0o2);
    for ( let i = 0; i < N; i++ ) indeksoj.push(i, ( i + 0o1 ) % N, N);
    partoj.push(kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj }));
  }
  return kunfandiGeometriojn(partoj);
}

// kapaSurfaco — Punkto sur la krania surfaco laŭ direkto, kaj ĝia normalo. La
// kranio estas TAVOLO de elipsoj ( vidu KRANIAJN_RINGOJN ), do la surfaco
// kalkuliĝas per la sama interpolo. La brovoj uzas ĝin por kuŝi SUR la haŭto —
// la malnova brovo estis plata lenso, kiu aŭ flosis antaŭ la vizaĝo aŭ malaperis
// interne de ĝi, ĉar la facetoj de la malalt-poligona kranio sidas interne de la
// ideala sfero.
//     @param dx, dy, dz ( number ) - La direkto de la kapcentro al la punkto.
//     @returns ( [ punkto, normalo ] ) - La punkto sur la haŭto kaj la normalo.
function kapaSurfaco(dx: number, dy: number, dz: number)
  : [ THREE.Vector3, THREE.Vector3 ] {
  let sube = KRANIAJ_RINGOJ[0], supre = KRANIAJ_RINGOJ[KRANIAJ_RINGOJ.length - 0o1];
  for ( let i = 0; i + 0o1 < KRANIAJ_RINGOJ.length; i++ ) {
    if ( dy <= KRANIAJ_RINGOJ[i][0] && dy >= KRANIAJ_RINGOJ[i + 0o1][0] ) {
      sube = KRANIAJ_RINGOJ[i]; supre = KRANIAJ_RINGOJ[i + 0o1];
      break;
    }
  }
  const t = ( sube[0] - dy ) / ( sube[0] - supre[0] || 0o1 );
  const a = sube[1] + ( supre[1] - sube[1] ) * t;
  const b = sube[2] + ( supre[2] - sube[2] ) * t;
  const antaŭen = sube[3] + ( supre[3] - sube[3] ) * t;
  const k = 0o1 / Math.hypot(dx / a, dz / b);
  return [ new THREE.Vector3(dx * k, KAPA_Y + dy, dz * k + antaŭen),
    new THREE.Vector3(dx, dy, dz).normalize() ];
}

// kreiVizaĝanStrikon — Maldika RUBANDO laŭ kurbo sur la vizaĝo. Ĝi estas la
// komuna ilo de la brovoj kaj de la okulharoj — la kurbo, la normalo kaj la larĝo
// venas el la alvokanto. Ĉiu stacio havas kvar angulojn ( plata ortangulo ), do la
// strio legiĝas kiel tufo da haro anstataŭ kiel plata glubendo, kaj ĉiu stacio
// portas sian propran larĝon, do la finoj PINTIĜAS.
//     @param centroj ( THREE.Vector3[] ) - La centroj de la stacioj.
//     @param normaloj ( THREE.Vector3[] ) - La eksteraj normaloj de la stacioj.
//     @param larĝoj ( number[] ) - La larĝo ĉe ĉiu stacio.
//     @param dikeco ( number ) - La dikeco de la rubando.
//     @returns geometrio ( THREE.BufferGeometry ) - La rubando.
function kreiVizaĝanStrikon(centroj: THREE.Vector3[], normaloj: THREE.Vector3[],
  larĝoj: number[], dikeco: number): THREE.BufferGeometry {
  const K = 0o4;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let i = 0; i < centroj.length; i++ ) {
    // ⟨ La larĝa akso venas el la KURBO 📃 ⟩ — la tanĝanto de la stacio ( el la
    // antaŭa kaj la sekva centroj ) kaj ĝia perpendikularo en la vizaĝa ebeno.
    // Sen ĝi la rubando turniĝus kun la kurbo kaj la brovo montrus sian randon.
    const antaŭ = centroj[Math.max(0, i - 0o1)];
    const post = centroj[Math.min(centroj.length - 0o1, i + 0o1)];
    const tanĝanto = post.clone().sub(antaŭ).normalize();
    const normalo = normaloj[i];
    const larĝa = new THREE.Vector3().crossVectors(normalo, tanĝanto).normalize();
    const duonLarĝo = larĝoj[i] * 0o1/0o2, duonDikeco = dikeco * 0o1/0o2;
    for ( const [ sb, sn ] of [ [ 0o1, 0o1 ], [ -0o1, 0o1 ], [ -0o1, -0o1 ], [ 0o1, -0o1 ] ] ) {
      pozicioj.push(centroj[i].x + larĝa.x * sb * duonLarĝo + normalo.x * sn * duonDikeco,
        centroj[i].y + larĝa.y * sb * duonLarĝo + normalo.y * sn * duonDikeco,
        centroj[i].z + larĝa.z * sb * duonLarĝo + normalo.z * sn * duonDikeco);
      // ⟨ La UV-oj montras la har-teksajxon 📃 ⟩ — la strio specimenas la fadenojn
      // LAŬ sia longo; sen UV-oj la tuta brovo legus unu angulan punkton kaj restus
      // plata koloro, dum la hararo mem havus fadenojn.
      uvoj.push(i / ( centroj.length - 0o1 ), 0o1/0o2 + sn * 0o1/0o2);
    }
  }
  for ( let i = 0; i + 0o1 < centroj.length; i++ ) {
    for ( let j = 0; j < K; j++ ) {
      const a = i * K + j, b = i * K + ( j + 0o1 ) % K;
      const c = ( i + 0o1 ) * K + j, d = ( i + 0o1 ) * K + ( j + 0o1 ) % K;
      indeksoj.push(a, b, c, b, d, c);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

// kreiVizaĝajnStrikojn — La brovoj kaj la okulharoj kiel UNU geometrio. Ili portas
// la HARAN materialon ( vidu konstruiFiguron ), do ili estas kolorigitaj kiel la
// hararo de la figuro kaj la brovoj de blondulo estas blondaj. La vipoj sekvas la
// saman kliniĝon kiel la okuloj, do ili restas super la okulo kiam la rigardo
// havas direkton.
//     @returns geometrio ( THREE.BufferGeometry ) - La brovoj kaj la okulharoj.
function kreiVizaĝajnStrikojn(): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  const centro = new THREE.Vector3(0, KAPA_Y, 0);
  for ( const dir of [ -0o1, 0o1 ] ) {
    const klino = dir * 0o1/0o10;
    const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(dir * OKULA_DX, OKULA_DY, OKULA_DZ);
    const bazo = new THREE.Vector3(dir * OKULA_DX, KAPA_Y + OKULA_DY, OKULA_DZ);
    // ⟨ La brovo 📃 ⟩ — arko super la okulo, kun la mezo levita kaj la ekstera
    // fino iomete mallevita ( la rigardo ricevas direkton ).
    const brovCentroj: THREE.Vector3[] = [];
    const brovNormaloj: THREE.Vector3[] = [];
    const brovLarĝoj: number[] = [];
    for ( let i = 0; i <= STRIO_STACIOJ; i++ ) {
      const s = -0o1 + 0o2 * i / STRIO_STACIOJ;
      const p = bazo.clone()
        .addScaledVector(horizontala, s * BROVA_DUONO)
        .addScaledVector(vertikala, BROVA_ALTO + BROVA_ARko * ( 0o1 - s * s ) - BROVA_KLINO * s * dir);
      const [ surfaco, n ] = kapaSurfaco(p.x - centro.x, p.y - centro.y, p.z - centro.z);
      brovCentroj.push(surfaco.addScaledVector(n, BROVA_LEVO)); brovNormaloj.push(n);
      brovLarĝoj.push(BROVA_LARĜO * ( 0o1 - 0o3/0o4 * s * s ));
    }
    partoj.push(kreiVizaĝanStrikon(brovCentroj, brovNormaloj, brovLarĝoj, BROVA_DIKECO));
    // ⟨ La okulharoj 📃 ⟩ — la supra arko de la okula folio. La rimo de la
    // okulo sidas sur la tanĝanta ebeno ( la geometrio de la okulo ) kaj la lenso
    // leviĝas internen, do la haroj kuŝas sur la rimo kaj kovras ĝian randon.
    const laŝCentroj: THREE.Vector3[] = [];
    const laŝNormaloj: THREE.Vector3[] = [];
    const laŝLarĝoj: number[] = [];
    const R = ( OKULA_LARĜO * OKULA_LARĜO + OKULA_ALTO * OKULA_ALTO ) / ( 0o2 * OKULA_ALTO );
    const kos = Math.cos(klino), sin = Math.sin(klino);
    for ( let i = 0; i <= STRIO_STACIOJ; i++ ) {
      const fi = Math.PI * i / STRIO_STACIOJ;
      const fx = OKULA_LARĜO * Math.cos(fi);
      const py = Math.sqrt(Math.max(0, R * R - fx * fx)) - (R - OKULA_ALTO);
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      laŝCentroj.push(bazo.clone()
        .addScaledVector(horizontala, rx)
        .addScaledVector(vertikala, ry)
        .addScaledVector(normalo, LAŜO_LEVO));
      laŝNormaloj.push(normalo.clone());
      const rando = Math.abs(i / STRIO_STACIOJ * 0o2 - 0o1);   // 1 ĉe la finoj
      laŝLarĝoj.push(LAŜO_LARĜO * ( 0o1 - 0o3/0o4 * rando * rando ));
    }
    partoj.push(kreiVizaĝanStrikon(laŝCentroj, laŝNormaloj, laŝLarĝoj, LAŜO_DIKECO));
  }
  return kunfandiGeometriojn(partoj);
}

// kreiBuŝon — La buŝo — LONGA V sur la malsupra vizaĝo. La du brakoj de la V
// venas el la du anguloj malsupren al la mezo, kaj ĉiu brako estas APARTA rubando
// ( vidu kreiVizaĝanStrikon ) — kun unu rubando tra la pinto la larĝa akso de la
// rubando turniĝus je 90° ĉe la angulo kaj la strio tordiĝus en la mezo. La
// punktoj venas el kapaSurfaco, do la buŝo kuŝas SUR la haŭto de la makzelo kaj
// sekvas ĝian kurbiĝon anstataŭ flosi antaŭ la vizaĝo.
// ⟨ La UV-oj montras la MALHELAN angulon 📃 ⟩ — la vizaĝa geometrio portas la
// okulan materialon ( unu el kvar paletroj ) kaj ĉiu okula kanvaso estas malhela
// ( 0x100808 ) krom la blanka folio mem. La buŝo do ricevas la UV-on de la supra
// maldekstra angulo de la kanvaso, kie la folio neniam atingas — la buŝo estas
// malhela ĉe ĉiu paletro sen propra materialo kaj sen plia bildiga alvoko.
//     @returns geometrio ( THREE.BufferGeometry ) - La buŝo, sur la malsupra vizaĝo.
function kreiBuŝon(): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  for ( const dir of [ -0o1, 0o1 ] ) {
    const centroj: THREE.Vector3[] = [];
    const normaloj: THREE.Vector3[] = [];
    const larĝoj: number[] = [];
    for ( let i = 0; i <= BUŜO_STACIOJ; i++ ) {
      const t = i / BUŜO_STACIOJ;
      // ⟨ La anguloj LEVIĜAS kaj la mezo MALSUPRENIRAS 📃 ⟩ — la alto de la strio
      // iras linie de la angulo al la mezo, do la du brakoj estas REKTAJ kaj la
      // buŝo legiĝas kiel V ( kun la rondaj finoj de la rubando ), ne kiel U.
      const [ surfaco, n ] = kapaSurfaco(dir * BUŜO_DUONO * ( 0o1 - t ),
        BUŜO_ANGULO + ( BUŜO_MEZO - BUŜO_ANGULO ) * t, OKULA_DZ);
      centroj.push(surfaco.addScaledVector(n, BUŜO_LEVO));
      normaloj.push(n);
      // ⟨ La strio PINTIĜAS al la anguloj 📃 ⟩ — la larĝo kreskas de kvarono ĝis
      // la plena al la mezo, do la buŝo mallarĝiĝas ĉe la du anguloj kaj la mezo
      // portas la tutan dikecon — sama lingvo kiel la brovoj.
      larĝoj.push(BUŜO_LARĜO * ( 0o1/0o4 + 0o3/0o4 * t ));
    }
    partoj.push(kreiVizaĝanStrikon(centroj, normaloj, larĝoj, BUŜO_DIKECO));
  }
  const geometrio = kunfandiGeometriojn(partoj);
  const uvoj = geometrio.attributes.uv;
  for ( let i = 0; i < uvoj.count; i++ ) uvoj.setXY(i, 0o4/0o100, 0o4/0o100);
  return geometrio;
}

// kreiNazon — La nazo — RONDIGITA TRIANGULO antaŭ la vizaĝo, kun la pinto malsupre
// kaj la ponto supre. La formo venas el la subtena funkcio de triangulo ( la
// intersekto de tri duon-ebonoj ) kun MOLA maksimumo — kun akra maksimumo la
// anguloj estus tranĉaj, kun la mola ili rondiĝas — la sama lingvo kiel la
// rondigitaj skatoloj de la mondo ( vidu S2WENI/Referencoj/Priskribo.md ). La
// pinto ankaŭ elstaras pli ol la ponto, do la nazo kreskas el la vizaĝo anstataŭ
// sidi sur ĝi kiel glata tubero.
//     @returns geometrio ( THREE.BufferGeometry ) - La nazo, sur la vizaĝo.
function kreiNazon(): THREE.BufferGeometry {
  // ⟨ La nazo sidas SUR la vizaĝo 📃 ⟩ — la malnova bazo ( −0.109, 0.164 ) estis
  // 0.025 ANTAŬ la kapo mem, do la tuta nazo flosis en la aero. Nun la bazo sidas
  // sur la krania profilo ( la punkto de la profilo, kies direkto egalas la
  // direkton de la bazo ) — la nazo do elkreskas el la vizaĝo.
  // ⟨ La nazo leviĝis kaj MALGRANDIĜIS 📃 ⟩ — la buŝo bezonas spacon sub la nazo,
  // sed la nazo ( duonalto 0.025, do 0.05 entute ) okupis preskaŭ la tutan mezon
  // de la malsupra vizaĝo kaj la punkto de la nazo preskaŭ tuŝis la menton. La
  // nazo nun sidas pli alte ( 0.0703 anstataŭ 0.0781 ) kaj estas pli malgranda,
  // do inter ĝia pinto kaj la mentono restas 0.08 — vera spaco por buŝo.
  const dy = -0o44/0o1000, dz = 0o122/0o1000;   // −0.0703 / 0.1602 — sur la kranio
  const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(0, dy, dz);
  const bazo = new THREE.Vector3(0, KAPA_Y + dy, dz);
  const ALTO = 0o13/0o1000;                 // 0.0215 — la duonalto de la triangulo
  const anguloj: [ number, number ][] = [
    [ 0, ALTO ], [ -0o1/0o40, -ALTO ], [ 0o1/0o40, -ALTO ] ];
  // ⟨ La subtenaj ebenoj 📃 ⟩ — ĉiu rando de la triangulo difinas ebenon tra la
  // centro; la normalo montras for de la centro kaj la disto estas la radiuso de
  // la rando. La formo en la direkto u estas la plej malgranda disto inter la
  // ebenoj — la preciza triangulo — kaj la mola maksimumo rondigas la angulojn.
  const ebenoj: [ number, number, number ][] = [];   // [ nx, ny, disto ]
  for ( let i = 0; i < 0o3; i++ ) {
    const a = anguloj[i], b = anguloj[( i + 0o1 ) % 0o3 ];
    const rx = b[0] - a[0], ry = b[1] - a[1];
    const longo = Math.hypot(rx, ry);
    let nx = ry / longo, ny = -rx / longo;
    let disto = nx * a[0] + ny * a[1];
    if ( disto < 0 ) { nx = -nx; ny = -ny; disto = -disto; }
    ebenoj.push([ nx, ny, disto ]);
  }
  const N = 0o16;
  const pozicioj: number[] = [];
  for ( const [ grando, faktoro ] of [ [ 0o1, 0o4/0o1000 ], [ 0o11/0o20, 0o11/0o1000 ] ] as [ number, number ][] ) {
    for ( let i = 0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2;
      const ux = Math.cos(t), uy = Math.sin(t);
      let sumo = 0;
      for ( const [ nx, ny, disto ] of ebenoj ) {
        const valoro = ( nx * ux + ny * uy ) / disto;
        if ( valoro > 0 ) sumo += valoro ** 0o4;
      }
      const r = sumo > 0 ? Math.pow(sumo, -0o1/0o4) : 0;
      const px = r * ux, py = r * uy;
      // ⟨ La pinto elstaras pli 📃 ⟩ — la elstaro malkreskas supre, do la ponto
      // de la nazo preskaŭ tuŝas la vizaĝon kaj la pinto elstaras. Sen tio la nazo
      // estus egala tubero de la frunto ĝis la buŝo.
      const f = 0o55/0o100 + 0o45/0o100 * ( 0o1 - ( py / ( 0o2 * ALTO ) + 0o1/0o2 ) );
      const diko = faktoro * f;
      pozicioj.push(
        bazo.x + horizontala.x * px * grando + vertikala.x * py * grando + normalo.x * diko,
        bazo.y + horizontala.y * px * grando + vertikala.y * py * grando + normalo.y * diko,
        bazo.z + horizontala.z * px * grando + vertikala.z * py * grando + normalo.z * diko);
    }
  }
  const pinto = 0o12/0o1000;                // 0.0195 — la elstaro de la pinto ( 10 / 512 )
  pozicioj.push(bazo.x + normalo.x * pinto, bazo.y + normalo.y * pinto,
    bazo.z + normalo.z * pinto);
  const indeksoj: number[] = [];
  for ( let i = 0; i < N; i++ ) {
    const a = i, b = ( i + 0o1 ) % N, c = N + i, d = N + ( i + 0o1 ) % N;
    indeksoj.push(a, b, c, b, d, c);
    indeksoj.push(c, d, N * 0o2);
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj);
}
// ⟪ La krania profilo 🗿 ⟫
// KRANIAJ_RINGOJ — la profilo de la kapo, de la krono malsupren. La tabelo estas
// MODULE-nivela, ĉar ankaŭ la brovoj ( vidu kreiVizaĝajnStrikojn ) devas scii kie
// la haŭto sidas — brovo kiu flosas antaŭ la vizaĝo legiĝas kiel naĝilo. La
// unuaj tri kolonoj estas la duonlarĝo, la duonprofundo kaj la antaŭen-ŝovo de
// ĉiu ringo ( la ringoj mem estas elipsoj en la ( x, z )-ebeno, vidu
// kreiRinganSurfacon ), la unua la alto rilate al la kapcentro.
// [ y, duonlarĝo, duonprofundo, antaŭen-ŝovo ]
const KRANIAJ_RINGOJ: [ number, number, number, number ][] = [
  [  0o122/0o1000, 0o40/0o1000,  0o40/0o1000, 0           ],   // +0.156 — la krono
  [  0o110/0o1000, 0o63/0o1000,  0o63/0o1000, 0           ],   // +0.140
  [  0o71/0o1000,  0o103/0o1000, 0o103/0o1000, 0          ],   // +0.112 — la frunto
  [  0o45/0o1000,  0o117/0o1000, 0o117/0o1000, 0          ],   // +0.072
  [  0o20/0o1000,  0o126/0o1000, 0o126/0o1000, 0          ],   // +0.032
  [ -0o4/0o1000,   0o127/0o1000, 0o127/0o1000, 0          ],   // −0.008 — la plej larĝa
  [ -0o34/0o1000,  0o123/0o1000, 0o123/0o1000, 0          ],   // −0.055 — sub la okuloj
  [ -0o50/0o1000,  0o116/0o1000, 0o121/0o1000, 0          ],   // −0.078 — la makzelo komenciĝas
  [ -0o66/0o1000,  0o77/0o1000,  0o107/0o1000, 0          ],   // −0.105
  [ -0o102/0o1000, 0o56/0o1000,  0o74/0o1000,  0o2/0o1000 ],  // −0.129
  [ -0o114/0o1000, 0o36/0o1000,  0o57/0o1000,  0o5/0o1000 ],  // −0.148
  [ -0o124/0o1000, 0o20/0o1000,  0o41/0o1000,  0o11/0o1000 ], // −0.162 — la mentono
  [ -0o130/0o1000, 0o6/0o1000,   0o22/0o1000,  0o13/0o1000 ], // −0.172 — la pinto
];

// kreiKapanKranion — La kranio — la kapo mem, sen la oreloj, la nazo kaj la kolo.
// ⟨ La kapo havas ANIME-formon 📃 ⟩ — antaŭe ĝi estis sfero, do la vizaĝo havis
// neniun makzelon. Nun la SUPRA duono sekvas la saman sferon ( la okuloj kaj la
// nazo sidas sur ĝi, do ili ne rajtas moviĝi ) kaj la MALSUPRA duono mallarĝiĝas
// malsupren en larĝo dum ĝi konservas sian profundon kaj puŝiĝas antaŭen. Tiel
// naskiĝas la makzelo kaj la pinta mentono de animea kapo — granda kranio kaj
// mallarĝa vizaĝo malsupre.
// ⟨ La kapo ne plu estas sfero 📃 ⟩ — la sekco ankaŭ estas ELIPSO ( la makzelo
// estas pli profunda ol larĝa ) kaj la mentono portas antaŭen-ŝovon, do la kapo
// havas veran profilon. Ĉiuj ringoj restas INTERNE de la malnova sfero, do la
// har-ĉapo ( kiu sekvas tiun sferon, vidu kreiHaranĈapon ) ankoraŭ kovras la
// kranion kun spaco.
//     @returns geometrio ( THREE.BufferGeometry ) - La kranio, ĉe la kapo.
function kreiKapanKranion(): THREE.BufferGeometry {
  const K = 0o20;
  const ringoj = KRANIAJ_RINGOJ;
  const centro = ( y: number, dz: number ) => Array.from({ length: K },
    () => [ 0, KAPA_Y + y, dz ] as [ number, number, number ]);
  return kreiRinganSurfacon([ centro(ringoj[0][0], ringoj[0][3]),
    ...ringoj.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
      const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
      return [ x, KAPA_Y + y, z + dz ] as [ number, number, number ];
    })), centro(ringoj[ringoj.length - 0o1][0], ringoj[ringoj.length - 0o1][3]) ]);
}

// kreiKorpanTorson — La torso de la homa modelo — la koksoj, la brusto kaj la
// ŝultroj kiel unu fermita konko. Ĝi sidas tute INTERNE de la interna ĉemizo
// ( la ĉemizo nun supreniras super la ŝultrojn — vidu kreiInternanSxelon — do ankaŭ
// la ŝultra haŭto estas kaŝita ), kaj ĝi videblas kiam la tuta vesto kaŝiĝas.
// ⟨ La torso havas ANATOMION 📃 ⟩ — antaŭe ĝi estis preskaŭ vertikala tubo kun
// ŝultra flanĝo. Nun ĝi havas la verajn apartaĵojn — la brusto, la talio ( la plej
// mallarĝa ) kaj la koksoj — kaj la trapezio malsupreniras de la kolo al la
// ŝultro tra multaj ringoj, do la kolo elkreskas el deklivo anstataŭ el tranĉita
// plato.
// ⟨ La koksoj kaj la ingveno 📃 ⟩ — la malsupra duono havas la veran pelvon: la
// talio estas la plej mallarĝa ( 0.117 ), la koksoj larĝiĝas malsupren ĝis 0.160
// ĉe 0.578 ( la sama alto, kie la femuroj eniras la torson ), kaj poste la korpo
// FINIĜAS per RONDA ingveno ( la lastaj ringoj malgrandiĝas 0.140 → 0.109 →
// 0.0625 ) anstataŭ per PLATA tranĉo ĉe 0.5. La malnova plata tranĉo aspektis
// kiel mallonga jupo: la torso finiĝis per horizontala disko kaj la kruroj
// eliris sub ĝi. Nun la ingveno kurbiĝas malsupren inter la femuroj, la kruroj
// konverĝas kaj la du formoj kunfandiĝas kiel vera pelvo.
// ⟨ La ŝultron faras la BRAKO 📃 ⟩ — la akromio de la torso estas 0.160, dum la
// deltoido de la brako ( vidu kreiKorpanBrakon ) atingas 0.258. Vera ŝultro
// funkcias same: la torso finiĝas per la trapezio kaj la RONDA deltoido de la
// brako faras la eksteran konturon. Antaŭe la torso mem estis larĝa ( 0.172 ) kaj
// la brako sidadis interne — la du formoj fandis sin en unu blokon kaj la brako
// aspektis enfalinta en la torson.
// ⟨ La brusto estas la PLEJ ANTAŬA punkto 📃 ⟩ — ĉiu ringo portas antaŭen-ŝovon
// ( dz ) de 0.0156 maksimume, kaj la antaŭa rando de la torso neniam iras preter
// 0.125. Antaŭe la ŝultro- kaj brustoringoj portis ŝovon ĝis 0.047, do la plej
// antaŭa punkto de la torso estis la ŝultro ( 0.176 ) — ne nur malreala ( la
// brusto devas elstari, ne la klaviklo ) sed ankaŭ danĝera: la ĉemiza ŝultro-
// kovrilo lasis nur 0.015 da spaco, kaj ĉar la robo ruliĝas ĉirkaŭ la zono dum
// ĉiu paŝo ( vidu marŝSvingon ), la brusto trapikis la ĉemizon ĉe la ŝultro. Nun
// la plej mallarĝa tavolo ( la ĉemizo ) havas pli ol 0.03 da spaco ĉie.
// ⟨ La sekco estas ELIPSO 📃 ⟩ — la eksponento estas 0o2 ( antaŭe 0o3 ). La
// superelipso de la eksponento 0o3 buliĝas 1.07-oble ĉe la diagonaloj, kaj ĉar
// la ĉemizo estas premata al 0.75 en z, ĝuste tiuj diagonalaj punktoj estis la
// plej proksimaj al la ŝtofo — la brusto fakte trapikis la ĉemizon kaj dum la
// marŝa svingo komplete montriĝis. Vra homa torso estas elipso, do la pli simpla
// sekco estas ankaŭ la pli reala.
// ⟨ La spino 📃 ⟩ — ĉiu ringo moviĝas iomete antaŭen aŭ malantaŭen ( la brusto
// antaŭen, la postaĵo malantaŭen ), do la torso havas la etan S-kurbiĝon de
// staranta homo anstataŭ esti tute rekta tubo.
//     @returns geometrio ( THREE.BufferGeometry ) - La torso, en la mondaj unuoj.
function kreiKorpanTorson(): THREE.BufferGeometry {
  const K = 0o20;
  const ringoj: [ number, number, number, number ][] = [   // [ y, a, b, z-ŝovo ]
    [ 0o137/0o100, 0o20/0o400, 0o12/0o400,  0        ],  // 1.4844 — ĝi malaperas en la kolon
    [ 0o136/0o100, 0o22/0o400, 0o14/0o400,  0        ],  // 1.4688
    [ 0o135/0o100, 0o24/0o400, 0o20/0o400,  0        ],  // 1.4531 — la bazo de la kolo
    [ 0o271/0o200, 0o26/0o400, 0o22/0o400,  0        ],  // 1.4453 — la malsupra kolo
    [ 0o134/0o100, 0o32/0o400, 0o24/0o400,  0o2/0o400 ],  // 1.4375 — la trapezio
    [ 0o267/0o200, 0o41/0o400, 0o30/0o400,  0o3/0o400 ],  // 1.4297 — la ŝultra deklivo
    [ 0o133/0o100, 0o51/0o400, 0o34/0o400,  0o4/0o400 ],  // 1.4219 — la ŝultro ( 0.160 — la rando de la brako apudiĝas )
    [ 0o265/0o200, 0o51/0o400, 0o35/0o400,  0o3/0o400 ],  // 1.4141 — la akromio ( la plej larĝa: 0.160 )
    [ 0o132/0o100, 0o47/0o400, 0o35/0o400,  0o3/0o400 ],  // 1.4063 — la deltoido ( mola deklivo malsupren )
    [ 0o263/0o200, 0o44/0o400, 0o35/0o400,  0o2/0o400 ],  // 1.3984 — sub la ŝultroj
    [ 0o131/0o100, 0o43/0o400, 0o36/0o400,  0o2/0o400 ],  // 1.3906 — la supra brusto ( la akselo )
    // ⟨ La suba torso MALPLIIĜIS 📃 ⟩ — antaŭe la talio estis ĉe 0.9531 kaj la
    // ingveno ĉe 0.5, do la torso mezuris 0.98 kaj la kruroj nur 0.31 de la
    // alto. La sama mapo ( la linia kuntiriĝo de la du regionoj ) validas por la
    // ĉemizo kaj por la mantelo, do la tavoloj restas vicigitaj.
    [ 0o256/0o200, 0o43/0o400, 0o36/0o400,  0o3/0o400 ],  // 1.3594 — la brusto ( la plej antaŭa: 0.129 )
    [ 0o241/0o200, 0o42/0o400, 0o35/0o400,  0o2/0o400 ],  // 1.2578 — la malsupra brusto ( pli larĝa ol profunda )
    [ 0o225/0o200, 0o40/0o400, 0o33/0o400,  0o1/0o400 ],  // 1.1641 — la malsupraj ripoj ( la ventro )
    [ 0o212/0o200, 0o36/0o400, 0o32/0o400,  0        ],  // 1.0781 — la talio ( la plej mallarĝa: 0.117, SASA_Y )
    [ 0o204/0o200, 0o40/0o400, 0o33/0o400,  0        ],  // 1.0313 — la kresto de la kokso
    [ 0o175/0o200, 0o44/0o400, 0o35/0o400, -0o1/0o400 ],  // 0.9766 — la kokso
    [ 0o167/0o200, 0o46/0o400, 0o37/0o400, -0o3/0o400 ],  // 0.9297 — la kokso ( la pivoto de la kruroj ) kaj la postaĵo
    // ⟨ La pelvo MALALTIĜAS GLATE 📃 ⟩ — kiam la tuta suba torso kuntiriĝis, la
    // malnova fino ( 0.1367 → 0.0625 dum 0.016 ) igxis platatabula rando supre de
    // la femuroj ( la figuro aspektis kiel en vindotuko ). Nun la pelvo malaltiĝas
    // tra sep ringoj ĝis 0.8047 — meze inter la femuroj, kie la du kruroj jam
    // kuniĝas — do la ingvena V estas glata kiel ĉe vera homo.
    [ 0o161/0o200, 0o51/0o400, 0o37/0o400, -0o4/0o400 ],  // 0.8828 — la femuroj eniras la kokson ( la plej larĝa: 0.160 )
    [ 0o155/0o200, 0o44/0o400, 0o34/0o400,  0        ],  // 0.8516 — la ingveno
    [ 0o153/0o200, 0o37/0o400, 0o27/0o400,  0        ],  // 0.8359
    [ 0o151/0o200, 0o31/0o400, 0o21/0o400,  0        ],  // 0.8203
    [ 0o150/0o200, 0o23/0o400, 0o16/0o400,  0        ],  // 0.8125
    [ 0o147/0o200, 0o15/0o400, 0o11/0o400,  0        ],  // 0.8047 — la RONDA pinto ( inter la femuroj )
  ];
  const centro = ( y: number, dz: number ) => Array.from({ length: K },
    () => [ 0, y, dz ] as [ number, number, number ]);
  return kreiRinganSurfacon([ centro(ringoj[0][0], ringoj[0][3]),
    ...ringoj.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
      const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
      return [ x, y, z + dz ] as [ number, number, number ];
    })), centro(ringoj[ringoj.length - 0o1][0], ringoj[ringoj.length - 0o1][3]) ]);
}

// ⟪ La oreloj 👂 ⟫
// ORELAJ_SEKCOJ — la profilo de la orelo, de la supra rimo malsupren. Ĉiu vico
// estas [ la alto , la antaŭa rando , la malantaŭa rando , la elstaro ] rilate al
// la kapcentro. La lasta nombro estas faktoro de ORELA_KLINO — vera orelo NE
// staras egale for de la kapo laŭ sia tuta alto: la rimo elstaras plej multe
// supre-meze ( la helikso ) kaj la lobo preskaŭ tuŝas la kapon.
// ⟨ Kial PROPRa tabelo 📃 ⟩ — la malnova orelo estis premita GLOBO sur la flanko de
// la kapo, metita per fiksitaj nombroj.
// la kapo. Ĝi havis la ĝustan grandon sed neniun konturon — de antaŭe ĝi aspektis
// kiel tubero kaj de la flanko kiel ronda makulo. Vera orelo estas ŜELO kun
// vertikala konturo ( mallarĝa supre, plej profunda meze, mallarĝiĝanta al la
// lobo ) kaj ĝia antaŭa rando KRESKAS el la vango, dum la rimo staras for de la
// kapo. La tabelo do portas la du randojn de ĉiu sekco, kaj la sekcoj mem estas
// elipsoj en la ( x, z ) ebeno ( vidu kreiOrelon ).
const ORELAJ_SEKCOJ: [ number, number, number, number ][] = [
  [ -0o4/0o1000,  -0o3/0o1000,  -0o10/0o1000, 0o5/0o10  ],   // −0.0078 — la supra rimo
  [ -0o10/0o1000,  0o1/0o1000,  -0o22/0o1000, 0o7/0o10  ],   // −0.0156
  [ -0o17/0o1000,  0o3/0o1000,  -0o27/0o1000, 0o1       ],   // −0.0293 — la plej elstara
  [ -0o26/0o1000,  0o4/0o1000,  -0o30/0o1000, 0o1       ],   // −0.0430 — la plej profunda
  [ -0o36/0o1000,  0o3/0o1000,  -0o26/0o1000, 0o6/0o10  ],   // −0.0586 — sub la mezo
  [ -0o43/0o1000,  0o2/0o1000,  -0o20/0o1000, 0o5/0o10  ],   // −0.0684 — la lobo
  [ -0o47/0o1000,  0o1/0o1000,  -0o10/0o1000, 0o4/0o10  ],   // −0.0762 — la pinto de la lobo
];
// ⟨ La tri profundoj de la orelo 📃 ⟩ — la sekca elipso sola ne sufiĉus, ĉar ĝi
// estas simetria. La orela ŝelo do portas tri pliajn ŝovojn. ORELA_ENIRO tenas la
// ANTAŬAN randon ene de la kranio ( la orelo elkreskas el la haŭto, ĝi ne flosas
// apud ĝi ), ORELA_KLINO puŝas la MALANTAŬAN rimon eksteren ( la vera orelo
// staras for de la kapo ) kaj ORELA_KONKO kavas la EKSTERAN flankon, do la rimo
// legiĝas kiel rando anstataŭ kiel plata disko.
const ORELA_ENIRO = 0o6/0o1000;      // 0.0117 — kiom profunde la antaŭa rando sidas
const ORELA_KLINO = 0o15/0o1000;     // 0.0293 — kiom la malantaŭa rimo elstaras pli
const ORELA_DIKO = 0o4/0o1000;       // 0.0078 — la duondikeco de la orela plato
const ORELA_KONKO = 0o4/0o1000;      // 0.0078 — la profundo de la kavo ( la konko )

// kreiOrelon — La orelo — ŝelo sur la flanko de la kranio.
// ⟨ La sekcoj 📃 ⟩ — ĉiu sekco de la orelo estas elipso en la ( x, z ) ebeno ( la
// dikeco laŭ x, la profundo laŭ z ), kaj laŭ la akso de la orelo ( y ) tiuj
// elipsoj formas ŝelon. La mezo de ĉiu sekco sekvas la surfacon de la kranio (
// vidu kapaSurfacon ), do la orelo sidas SUR la haŭto — la malnova globo estis
// metita per fiksita nombro kaj trapikis la kranion se la kapo iam ŝanĝiĝus.
// ⟨ La ventumiloj 📃 ⟩ — la du pintoj ( supre kaj ĉe la lobo ) fermas la ŝelon per
// ventumilo ĉirkaŭ unu punkto, la sama konstruo kiel la kranio mem ( vidu
// kreiKapanKranion ).
//     @param dir ( number ) - −1 maldekstre, +1 dekstre.
//     @returns geometrio ( THREE.BufferGeometry ) - La orelo ( ĉe la kapo ).
function kreiOrelon(dir: number): THREE.BufferGeometry {
  const K = 0o16;
  // ⟨ La kavo ( la konko ) 📃 ⟩ — ĝi sidas sur la EKSTERA flanko ( kos > 0 ), meze
  // inter la antaŭa kaj la malantaŭa randoj ( 1 − sin² ), do la orelo estas
  // konkava meze kaj la rimo leviĝas ĉirkaŭ ĝi.
  const kavo = (kos: number, sin: number) =>
    Math.max(0, kos) * ( 0o1 - sin * sin );
  // sekco — unu ringo de la orela ŝelo.
  //     [ la alto , la antaŭa rando , la malantaŭa , la elstaro ]
  const sekco = (dy: number, antaŭe: number, malantaŭe: number, elstaro: number)
    : [ number, number, number ][] => {
    const zc = ( antaŭe + malantaŭe ) / 0o2, d = ( antaŭe - malantaŭe ) / 0o2;
    const [ surfaco ] = kapaSurfaco(0o1, dy, zc);
    const xc = surfaco.x - ORELA_ENIRO;
    const klino = ORELA_KLINO * elstaro;
    return Array.from({ length: K }, ( _, i ) => {
      const t = i / K * Math.PI * 0o2;
      const kos = Math.cos(t), sin = Math.sin(t);
      const x = xc + klino * ( 0o1 - sin ) / 0o2
        + ORELA_DIKO * kos - ORELA_KONKO * kavo(kos, sin);
      return [ dir * x, KAPA_Y + dy, zc + d * sin ] as [ number, number, number ];
    });
  };
  // pinto — la ventumila centro, iomete preter la unua aŭ la lasta sekco.
  const pinto = (dy: number, antaŭe: number, malantaŭe: number, elstaro: number)
    : [ number, number, number ][] => {
    const zc = ( antaŭe + malantaŭe ) / 0o2;
    const [ surfaco ] = kapaSurfaco(0o1, dy, zc);
    const x = surfaco.x - ORELA_ENIRO + ORELA_KLINO * elstaro * 0o1/0o2;
    return Array.from({ length: K },
      () => [ dir * x, KAPA_Y + dy, zc ] as [ number, number, number ]);
  };
  // ⟨ La ventumiloj SIDAS ekster la tabelo 📃 ⟩ — la unua kaj la lasta vicoj de la
  // tabelo estas la randoj de la orela karno, do la ventumila punkto sidas iomete
  // preter ili ( 0.0039 ) kaj la orelo finiĝas per mola kupolo anstataŭ per tranĉo.
  const unua = ORELAJ_SEKCOJ[0], lasta = ORELAJ_SEKCOJ[ORELAJ_SEKCOJ.length - 0o1];
  const preter = 0o2/0o1000;           // 0.0039
  return kreiRinganSurfacon([
    pinto(unua[0] + preter, unua[1], unua[2], unua[3]),
    ...ORELAJ_SEKCOJ.map(([ dy, antaŭe, malantaŭe, elstaro ]) =>
      sekco(dy, antaŭe, malantaŭe, elstaro)),
    pinto(lasta[0] - preter, lasta[1], lasta[2], lasta[3]),
  ]);
}

// kreiKorpanKruropon — La kruro de la homa modelo — la femuro kaj la tibio. La
// geometrio mezuriĝas de la GENUO ( la mondo 0.5, la grundo 0.5 sub ĝi );
// la mesho sidas ĉe genuoKompenso en la kruro-grupo, kies pivoto estas nun la
// KOKSO ( vidu konstruiFiguron ). La
// PIEDO estas aparta geometrio ( vidu kreiKorpanPiedon ). Ĝi sidas interne de la pantalono kaj de la boto, do ĝi videblas
// nur se la vestoj kaŝiĝas — sed sen ĝi la homa modelo ne staras sola.
// ⟨ La kruro havas formon 📃 ⟩ — la femuro estas la plej dika ĉe la supro
// ( 0.094 ), la genuo estas la plej mallarĝa ( 0.062 ) kaj la suro pufiĝas
// malsupre ( 0.070 kontraŭ 0.059 ĉe la tibio ), do la kruro legiĝas kiel kruro
// anstataŭ kiel stango. La sekco estas elipso ( la eksponento 0o2, same kiel la
// torso ) — la maleolo estas pli mallarĝa ol profunda, kiel vera maleolo.
// ⟨ La kruro komenciĝas INTERNE de la torso 📃 ⟩ — la plej supra ringo sidas ĉe
// la mondo 0.9297 ( la sama alto kiel la plej larĝa koksa ringo de la torso kaj
// la pivoto de la kruro ), do ĝi malaperas ene de la pelvo — la torso estas
// 0.160 larĝa tie kaj la krura ringo 0.164 ( ± 0.075 + 0.082 = 0.157 ).
// ⟨ La kruro PLILONGIS 📃 ⟩ — antaŭe la geometrio mezuris de la genuo 0.3125
// supren 0.2656 kaj malsupren 0.1875, do la femuro estis 0.25 kaj la tibio 0.31.
// Nun la femuro mezuras 0.43 ( la kokso 0.9297 − la genuo 0.5 ) kaj la tibio 0.41
// ( la genuo − la maleolo 0.09375 ) — la proporcioj de vera homo.
// Ĉiuj ringoj restas ene de la pantalona tubo kaj de la bota ŝtipo kun spaco, do
// la haŭto ne trapikas la ŝtofon aŭ la ledon.
// ⟨ La kruro estas DISIGITA ĉe la genuo 📃 ⟩ — la kruro nun venas en du partojn,
// supre kaj malsupre de la genua ringo, ĉar la figuro fleksas la genuon dum la
// paŝo ( vidu marŝSvingon ) kaj la du partoj turniĝas ĉirkaŭ la genuo aparte. La
// du partoj KUNHAVAS la genuan ringon, do rekte ili sidas rando al rando sen
// fendo, kaj kiam la genuo fleksiĝas la kojno inter ili pleniĝas per la artika
// sfero ( vidu kreiArtikanSferon ), kiu sidas sur la pivoto mem.
//     @returns ( { supra, malsupra } ) - La du partoj de la kruro. La geometrio
//         mezuriĝas de la GENUO, do la « malsupra » parto jam sidas ĉe la pivoto
//         kaj la « supra » parto portas la kompenson en la koksa grupo.
function kreiKorpanKruropon(): { supra: THREE.BufferGeometry; malsupra: THREE.BufferGeometry } {
  const K = 0o20;
  const GENUO = 0o4;                  // la indekso de la genua ringo de la tabelo
  // ⟨ La kruro havas GENUON 📃 ⟩ — antaŭe la genuo estis simple la plej mallarĝa
  // ringo de egala tubo, do la kruro estis konuso sen artiko. Vera genuo estas pli
  // larĝa ol la tibio super ĝi kaj ĝia patelo PUŜIĜAS antaŭen, dum la kavo malantaŭe
  // ( la poplito ) retiriĝas. Nun ĉiu ringo povas porti antaŭen-ŝovon ( la kvara
  // kolumno ), la genuo havas 0.0664 kun +0.0078 antaŭen kaj la ringo sub ĝi
  // −0.0039 malantaŭen — la etan S-kurbiĝon de staranta kruro.
  // ⟨ La suro estas MUSKOLO 📃 ⟩ — la malnova suro estis unu ringo ( 0.0547 larĝa,
  // 0.0664 profunda ) kaj la tibio sub ĝi iris rekte al la maleolo. Nun la
  // gastroknemio havas du ringojn, ĝi PUŜIĜAS malantaŭen ( la ringoj portas
  // negativan ŝovon ) kaj la tibio antaŭe restas plata — la suro do legiĝas kiel
  // muskolo anstataŭ kiel dikaĵo. La ringo tuj sub la genuo ankaŭ MALLARĜIĜIS
  // ( 0.0625 kontraŭ la 0.0703 de la antaŭa versio ) — la antaŭa valoro estis
  // precize egala al la pantalona ringo ĉe la sama alto, do la haŭto kaj la ŝtofo
  // kuntuŝiĝis kaj povis z-fajfi dum la paŝo.
  // ⟨ La supra femuro SEKVAS la pantalonon 📃 ⟩ — la du supraj ringoj maldikiĝis
  // kune kun la pantalono ( vidu kreiPantalonan ), ĉar ili sidas ene de ĝi. La
  // haŭto ĉe la kokso estas 0.0664 kaj ĉe la femuro-supra 0.0859, do la pantalono
  // ( 0.09375 ) restas egale super ĝi sen kuntuŝiĝi — la antaŭa valoro estis 0.09375
  // kontraŭ la nova 0.09375 kaj la du tavoloj z-fajfus dum la paŝo. La videbla
  // femuro komenciĝas malsupre de tio, kie la ĉemizo finiĝas.
  const ringoj: [ number, number, number, number ][] = [    // [ y, a, b, z-ŝovo ] de la kokso malsupren
    [  0o67/0o200, 0o21/0o400, 0o20/0o400,  0           ],   // 0.4297 — ene de la torso ( la kokso estas la pivoto )
    [  0o51/0o200, 0o26/0o400, 0o25/0o400,  0o1/0o400   ],   // 0.3203 — la femuro-supra ( sub la pantalono )
    [  0o30/0o200, 0o26/0o400, 0o25/0o400,  0o1/0o400   ],   // 0.1875 — la meza femuro
    [  0o14/0o200, 0o23/0o400, 0o23/0o400,  0           ],   // 0.0938 — super la genuo
    [  0,          0o21/0o400, 0o21/0o400,  0o2/0o400   ],   // 0 — la GENUO ( la patelo antaŭen )
    [ -0o15/0o200, 0o20/0o400, 0o21/0o400, -0o1/0o400   ],   // −0.1016 — sub la genuo ( la kavo malantaŭen )
    [ -0o27/0o200, 0o17/0o400, 0o21/0o400, -0o1/0o400   ],   // −0.1875 — la gastroknemio komenciĝas
    [ -0o37/0o200, 0o16/0o400, 0o21/0o400, -0o1/0o400   ],   // −0.2422 — la suro ( la plej profunda )
    [ -0o52/0o200, 0o14/0o400, 0o16/0o400, -0o1/0o400   ],   // −0.3438 — la malsupra suro
    [ -0o64/0o200, 0o13/0o400, 0o14/0o400,  0           ],   // −0.4063 — la maleolo ( MALEOLO_Y )
  ];
  const centro = ( y: number, z: number ) => Array.from({ length: K },
    () => [ 0, y, z ] as [ number, number, number ]);
  const vicoj = ringoj.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
    const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
    return [ x, y, z + dz ] as [ number, number, number ];
  }));
  const lasta = ringoj[ringoj.length - 0o1][0];
  const supra = kreiRinganSurfacon([ centro(ringoj[0][0], 0),
    ...vicoj.slice(0, GENUO + 0o1) ]);
  const malsupra = kreiRinganSurfacon([ ...vicoj.slice(GENUO), centro(lasta, 0) ]);
  // ⟨ La patelo 📃 ⟩ — la artika sfero sidas iomete antaŭen, ĉar la genua ringo mem
  // portas antaŭen-ŝovon. La malantaŭa flanko restas ronda, ĉar la poplita kavo
  // apartenas al la suba parto.
  const g = ringoj[GENUO];
  const artiko = kreiArtikanSferon([ 0, 0, g[3] ], g[1] - 0o1/0o1000, 0o7/0o10);
  return { supra, malsupra: kunfandiGeometriojn([ malsupra, artiko ]) };
}

// kreiKorpanBrakon — La brako de la homa modelo — la ŝultro, la kubuto, la
// antaŭbrako kaj la pojno, en la kadro de la braka pivot-grupo ( la ŝultro estas
// la nulo, la pojno je −0.53 ).
// ⟨ La brako MANKIS 📃 ⟩ — la homa modelo havis neniun brakon; la manoj flosis
// en la manikoj kaj, kiam la vesto kaŝiĝis, restis nur la torso kaj du ovoj. Nun
// la brako estas vera konko kiu eniras la manikon — ĝi estas kaŝita de la ŝtofo,
// sed la homa modelo staras sola kaj la maniko RILATAS al la brako interne.
// La sekco estas elipso ( ok-flanka, do malalt-poligona — la brako estas preskaŭ
// tute kaŝita ).
//     @returns ( { supra, malsupra } ) - La du partoj de la brako. La « malsupra »
//         parto mezuriĝas de la KUBUTO, do la mesho sidas ĉe la nulo en la kubuta
//         grupo ( la supra parto restas en la kadro de la ŝultro ).
function kreiKorpanBrakon(): { supra: THREE.BufferGeometry; malsupra: THREE.BufferGeometry } {
  // ⟨ La brako estas RONDA, ne okflanka 📃 ⟩ — kun 0o10 flankoj la sekco estis
  // videble poligona ĉe la ŝultro ( la sola parto de la brako kiun la maniko
  // preskaŭ atingas ). Nun ĝi havas la saman nombron da flankoj kiel la torso
  // ( 0o20 ), do la du formoj kunfandiĝas sen kudro; la brako restas unu mesho en
  // la kaŝita tavolo.
  const K = 0o20;
  // ⟨ La brako havas ARTIKOJN 📃 ⟩ — antaŭe la ringoj nur larĝiĝis kaj
  // mallarĝiĝis, do la brako estis unu longa konuso sen kubuto. Nun ĉiu ringo
  // portas antaŭen-ŝovon ( la kvara kolumno ), kiel la kruro — la bicepso
  // elstaras antaŭen, la kubuto RETIRIĜAS malantaŭen kaj la antaŭbraka muskolo
  // elstaras denove. La olekrano ( la pinta osto malantaŭ la kubuto ) estas pli
  // larĝa ol la ringo super ĝi, do la kubuto legiĝas kiel vera artiko.
  // ⟨ La antaŭbrako MALGRANDIĜIS 📃 ⟩ — la olekrano kaj la antaŭbraka muskolo estis
  // 0.0547 … 0.0566, dum la maniko mallarĝiĝas al 0.0547 ĉe la manumo — la brako
  // do preskaŭ kuntuŝiĝis kun la ŝtofo kaj trapikis ĝin per 0.004 dum ĉiu paŝo
  // ( la manikaj retoj RULIĜAS kontraŭ la brako ). Nun la tri lastaj ringoj estas
  // ĝis 0.0508, do la marĝeno estas 0.005 … 0.010 sur la tuta manika longo.
  // ⟨ La brako 📃 ⟩ — la pojno sidas ĉe −0.6 ( 0.553 de la ŝultro ), la kubuto ĉe
  // −0.34 ( apud la talio ) kaj la fingropintoj finiĝas iomete sub la mezo de la
  // femuro. La deltoido malfermiĝas per KVAR ringoj ( ĝia plej larĝa ringo estas
  // 0.0625 kaj la maniko mezuras 0.0547 … 0.0703, do la brako restas INTERNE ) kaj
  // la pojno PLATIĜAS kaj mallarĝiĝas, do la braka fino kaŝiĝas en la mano anstataŭ
  // montri sian randon super ĝi.
  // ⟨ La ŝultro sidas SUR la torso 📃 ⟩ — la pivoto de la brako estas ± 0.219,
  // do pli malproksime ol la akromio de la torso ( 0.160 ). La plej supraj ringoj
  // de la brako antaŭe estis rondaj ĉirkaŭ la pivoto, do ili flosis 0.02 for de la
  // torso kaj ilia FERMA ventumilo montriĝis kiel plata tranĉaĵo supre de la
  // ŝultro ( oni vidis ĝin kiam la vesto kaŝiĝis ). Nun ĉiu ringo havas ankaŭ
  // FLANKAN ŝovon ( la kvina kolumno ), do la deltoido klinas sin INTERNEN al la
  // torso kaj la du formoj kunfandiĝas ĉe la akselo. La ekstera rando restas ene
  // de la maniko ( la ŝovo plus la duonlarĝo neniam superas 0.07 ).
  // ⟨ La supro de la brako SEKVAS la torson 📃 ⟩ — super la pivoto la maniko ne
  // ekzistas ( ĝi komenciĝas ĉe la pivoto ), do la brako tie estas kovrita nur de
  // la ŝultro de la ĉemizo ( 0.141 … 0.188 ). La unua versio tenis la brakon
  // centre sur la pivoto ankaŭ supre, do ĝi finiĝis per PINTO en la aero apud la
  // ŝultro ( videbla kiam la vesto kaŝiĝis ). Nun la supraj ringoj ŝoviĝas
  // INTERNEN tiom ke ilia ekstera rando sekvas la kranion de la torso — la
  // deltoido do elkreskas el la ŝultro anstataŭ pendi apud ĝi.
  const ringoj: [ number, number, number, number, number ][] = [   // [ y, a, b, dz, centro-x ]
    [  0o14/0o1000,  0o4/0o1000,  0o4/0o1000,  0,          -0o112/0o1000 ], // +0.023 — sur la trapezio
    [  0o10/0o1000,  0o6/0o1000,  0o6/0o1000,  0,          -0o100/0o1000 ], // +0.016
    [  0o4/0o1000,   0o11/0o1000, 0o10/0o1000, 0,          -0o66/0o1000  ], // +0.008 — la deltoido malfermiĝas
    [  0,            0o17/0o1000, 0o16/0o1000, 0,          -0o54/0o1000  ], // 0 — la akromio ( la pivoto )
    [ -0o12/0o1000,  0o25/0o1000, 0o22/0o1000, 0,          -0o40/0o1000  ], // −0.020
    [ -0o15/0o1000,  0o33/0o1000, 0o30/0o1000, 0,          -0o17/0o1000  ], // −0.025
    [ -0o26/0o1000,  0o40/0o1000, 0o34/0o1000, 0,          -0o5/0o1000   ], // −0.043 — la ŝultro ( la plej larĝa )
    [ -0o42/0o1000,  0o37/0o1000, 0o33/0o1000, 0,          -0o2/0o1000   ], // −0.066 — la akselo ( pli mallarĝa ol la deltoido )
    [ -0o103/0o1000, 0o37/0o1000, 0o35/0o1000, 0o2/0o1000,  0            ], // −0.131 — la bicepso ( antaŭen )
    [ -0o160/0o1000, 0o35/0o1000, 0o35/0o1000, 0o3/0o1000,  0           ],  // −0.219
    [ -0o227/0o1000, 0o34/0o1000, 0o34/0o1000, 0o1/0o1000,  0           ],  // −0.295
    [ -0o256/0o1000, 0o33/0o1000, 0o33/0o1000, -0o3/0o1000, 0           ],  // −0.340 — la KUBUTO ( malantaŭen )
    [ -0o277/0o1000, 0o32/0o1000, 0o32/0o1000, -0o2/0o1000, 0           ],  // −0.373 — la olekrano ( la kubuta osto )
    [ -0o334/0o1000, 0o31/0o1000, 0o32/0o1000, 0o1/0o1000,  0           ],  // −0.430 — la antaŭbraka muskolo ( antaŭen )
    [ -0o400/0o1000, 0o30/0o1000, 0o31/0o1000, 0o2/0o1000,  0           ],  // −0.500
    [ -0o437/0o1000, 0o21/0o1000, 0o24/0o1000, 0o2/0o1000,  0           ],  // −0.561 — la pojno ( PLATA )
    [ -0o473/0o1000, 0o10/0o1000, 0o12/0o1000, 0,           0           ],  // −0.600 — kaŝita ene de la mano
  ];
  const centro = ( y: number, dz: number, cx: number ) => Array.from({ length: K },
    () => [ cx, y, dz ] as [ number, number, number ]);
  const vicoj = ringoj.map(([ y, a, b, dz, cx ]) => Array.from({ length: K }, ( _, i ) => {
    const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
    return [ cx + x, y, z + dz ] as [ number, number, number ];
  }));
  // ⟨ La brako estas DISIGITA ĉe la KUBUTO 📃 ⟩ — la sama konstruo kiel la kruro
  // ( vidu kreiKorpanKruropon ). La kruro kaj la brako de la sama figuro fleksiĝas
  // en la sama ritmo, do la du membroj havas la saman strukturon. La kruro
  // mezuriĝas de la genuo kaj tial jam havas sian pivoton ĉe la nulo; la brako
  // mezuriĝas de la ŝultro, do la malsupra parto estas ŜOVITA tien, kie la kubuto
  // estas — la mesho de la antaŭbrako do sidas ĉe y = 0 en sia propra grupo.
  const KUBUTO = 0o13;                // la indekso de la kubuta ringo de la tabelo
  // ( la ringo ĉe −0.3398 = KUBUTO_Y; la olekrano sub ĝi apartenas al la antaŭbrako )
  const lasta = ringoj[ringoj.length - 0o1];
  const supra = kreiRinganSurfacon([ centro(ringoj[0][0], ringoj[0][3], ringoj[0][4]),
    ...vicoj.slice(0, KUBUTO + 0o1) ]);
  const yKubuto = ringoj[KUBUTO][0];
  const malsupra = kreiRinganSurfacon([ ...vicoj.slice(KUBUTO),
    centro(lasta[0], lasta[3], lasta[4]) ]);
  malsupra.translate(0, -yKubuto, 0);
  // ⟨ La kubuta osto 📃 ⟩ — la artika sfero sidas ĉe la olekrano kaj plenigas la
  // kubuton kiam la brako fleksiĝas. Ĝi estas iomete pli malgranda ol la braka
  // ringo, do rekte ĝi malaperas ene de la brako ( vidu kreiArtikanSferon ) — kaj
  // ĝi havas multe da spaco ene de la maniko ( 0.0579 ĉe tiu alto ).
  const kubuto = ringoj[KUBUTO];
  const artiko = kreiArtikanSferon([ 0, 0, kubuto[3] ],
    kubuto[1] - 0o1/0o1000, 0o7/0o10);
  return { supra, malsupra: kunfandiGeometriojn([ malsupra, artiko ]) };
}

// kreiKorpanManon — La mano de la homa modelo, en la kadro de la braka grupo.
// ⟨ Manplato kaj kvin tuboj 📃 ⟩ — unu ŝovita tubo por la manplato kaj unu por
// ĉiu fingro, inkluzive la dikfingron. Ĉiu fingro havas propran longon kaj rondan
// pinton, kaj ĝia baza ringo sidas INTERNE de la manplato, do la formoj
// kunfandiĝas sen fendo.
// ⟨ La proporcioj 📃 ⟩ — la manplato ( la pojno ĝis la fingra linio ) estas 0.072
// longa kaj 0.058 larĝa, la meza fingro 0.064 ( iom malpli ol la manplato, kiel
// ĉe vera mano ), kaj la dikfingro sidas ĉe la rando de la manplato kaj finiĝas
// SUPER la fingra linio. La mano turniĝas −90° ĉirkaŭ y ( vidu konstruiFiguron ),
// do ĝia larĝo iras laŭ la profundo de la brako.
// ⟨ La manoj portas UNGOJN 💅 ⟩ — ĉiu fingropinto nun havas ungon ( vidu la blokon
// sub la dikfingro ). Ĝi estas aparta geometrio, ĉar la ungo estas pli hela kaj
// pli brila ol la haŭto, do ĝi bezonas sian propran materialon; la fingroj mem
// kaj la ungoj tamen legas la SAMAN profilon ( FINGRAJ_SEKCOJ ), do la ungo sidas
// precize sur la dorso de ĉiu pinto.
//     @returns ( { mano, ungoj } ) - La du geometrioj de la mano — la haŭto kaj la
//         ungoj.
function kreiKorpanManon(): { mano: THREE.BufferGeometry; ungoj: THREE.BufferGeometry } {
  const K = 0o20;                    // la flankoj de ĉiu ringo
  const centro = ( y: number, x: number, z = 0 ) => Array.from({ length: K },
    () => [ x, y, z ] as [ number, number, number ]);
  // tubo — ringoj kun elipsa aŭ rondigita-ortangula sekco, fermitaj per
  // ventumiloj ĉe ambaŭ finoj. [ y, centro-x, duonlarĝo, duondikeco, centro-z ]
  // La kvina nombro movas la tutan ringon laŭ la dikeca akso, do la fingroj
  // povas KURBIĝi anstataŭ pendi rekte. La ventumiloj sekvas sian ringon.
  const tubo = ( potenco: number,
    ringoj: [ number, number, number, number, number? ][] ) =>
    kreiRinganSurfacon([ centro(ringoj[0][0], ringoj[0][1], ringoj[0][4]),
      ...ringoj.map(([ y, cx, a, b, cz ]) => Array.from({ length: K }, ( _, i ) => {
        const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, potenco);
        return [ cx + x, y, ( cz ?? 0 ) + z ] as [ number, number, number ];
      })),
      centro(ringoj[ringoj.length - 0o1][0], ringoj[ringoj.length - 0o1][1],
        ringoj[ringoj.length - 0o1][4]) ]);
  // La manplato. La sekco estas ELIPSA ( potenco 0o2 ) kaj pli dika ol antaŭe,
  // do ĝi legiĝas kiel karno anstataŭ kiel plata plato. La plej larĝa ringo
  // tenas la fingran linion, kaj sub ĝi la manplato fermas sin tuj, do la
  // fingroj eliras el larĝa rando kaj neniu kudro videblas inter ili.
  const manplato = tubo(0o2, [
    [  0o54/0o1000, 0, 0o13/0o1000, 0o13/0o1000 ],
    [  0o34/0o1000, 0, 0o23/0o1000, 0o15/0o1000 ],
    [  0o20/0o1000, 0, 0o31/0o1000, 0o17/0o1000 ],
    [ -0o4/0o1000,  0, 0o33/0o1000, 0o17/0o1000 ],
    [ -0o20/0o1000, 0, 0o35/0o1000, 0o16/0o1000 ],
    [ -0o34/0o1000, 0, 0o35/0o1000, 0o15/0o1000 ],
    [ -0o42/0o1000, 0, 0o24/0o1000, 0o11/0o1000 ],
    [ -0o46/0o1000, 0, 0o11/0o1000, 0o6/0o1000  ],
    [ -0o50/0o1000, 0, 0o4/0o1000,  0o3/0o1000  ],
  ]);
  // interpolo — la vico de tabelo ĉe la pozicio k, lineare inter du vicoj. La
  // unua kolumno de ĉiu vico estas la ŝlosilo ( f aŭ y ), la ceteraj la valoroj.
  // ⟨ La ŝlosiloj povas MALSUPRENIRI 📃 ⟩ — la fingra tabelo iras de f = 0 supren,
  // sed la dikfingra tabelo estas skribita per la ALTO, do ĝiaj ŝlosiloj
  // malsupreniras ( de la bazo al la pinto ). La direkto de la ŝlosiloj do
  // mezuriĝas unue — sen tio ĉiu serĉo trovis la UNUAN vicon kaj la ungo de la
  // dikfingro kolapsis al unu alto.
  const interpolo = ( tabelo: number[][], k: number ): number[] => {
    const signo = tabelo[0][0] > tabelo[tabelo.length - 0o1][0] ? -0o1 : 0o1;
    if ( ( k - tabelo[0][0] ) * signo <= 0 ) return tabelo[0];
    for ( let i = 0; i + 0o1 < tabelo.length; i++ ) {
      const v0 = tabelo[i], v1 = tabelo[i + 0o1];
      if ( ( k - v1[0] ) * signo <= 0 ) {
        const t = ( k - v0[0] ) / ( v1[0] - v0[0] );
        return v0.map(( v, j ) => v + ( v1[j] - v ) * t );
      }
    }
    return tabelo[tabelo.length - 0o1];
  };
  // ⟨ La profilo de la fingro 📃 ⟩ — la duonlarĝo kaj la duondikeco laŭ la longo
  // de la fingro ( f = 0 ĉe la bazo, 1 ĉe la pinto ). La tabelo estas UNUOPA —
  // ankaŭ la ungo legas ĝin, do la ungo kuŝas sur la vera dorso de la pinto.
  // ⟨ La fingroj finiĝas per PLATA PULPO 📃 ⟩ — fingropinto ne estas pinto: ĝi
  // restas preskaŭ same larĝa ĝis la lasta dekon ( la pulpo, kiun la ungo kovras )
  // kaj nur poste rondiĝas, dum kvar vicoj ( ne du ), do la pinto estas RONDA
  // anstataŭ plata tranĉo. La pinto do larĝas 0.0117 anstataŭ 0.0039, kaj la ungo
  // ricevas pli larĝan liton el tio mem. La ungo komenciĝas ĉe la sama f kiel
  // antaŭe ( 0.844 ), do la ŝanĝo de la tabelo ne movas la ungojn laŭlonge.
  const FINGRAJ_SEKCOJ: [ number, number, number ][] = [   // [ f, duonlarĝo, duondikeco ]
    [ 0,           0o7/0o1000, 0o7/0o1000 ],
    [ 0o20/0o100,  0o6/0o1000, 0o6/0o1000 ],
    [ 0o42/0o100,  0o6/0o1000, 0o6/0o1000 ],
    [ 0o54/0o100,  0o6/0o1000, 0o5/0o1000 ],
    [ 0o64/0o100,  0o5/0o1000, 0o5/0o1000 ],
    [ 0o72/0o100,  0o5/0o1000, 0o4/0o1000 ],
    [ 0o74/0o100,  0o4/0o1000, 0o3/0o1000 ],
    [ 0o76/0o100,  0o3/0o1000, 0o3/0o1000 ],
    [ 0o1,         0o2/0o1000, 0o2/0o1000 ],
  ];
  const FINGRA_BAZO_Y = -0o30/0o1000;    // −0.0469 — la fingroj eliras el ĉi tie
  const fingraP = ( f: number, pinto: number ) =>
    FINGRA_BAZO_Y + ( pinto - FINGRA_BAZO_Y ) * f;
  const fingraC = ( f: number, bazoX: number, pintoX: number ) =>
    bazoX + ( pintoX - bazoX ) * f;
  // ⟨ La fingroj KURBIĝas antaŭen 📃 ⟩ — la fingroj pendas mole anstataŭ stari
  // rekte kiel kombiloj. La kurbiĝo ankaŭ apartenas al la profilo de la ungo —
  // la ungo nur havas ( x, y, z ) de ĉi tiuj tri funkcioj.
  const fingraZ = ( f: number ) => 0o16/0o1000 * f * f;
  const fingro = ( bazoX: number, pintoX: number, pinto: number ) => tubo(0o2,
    FINGRAJ_SEKCOJ.map(( [ f, a, b ] ) => [ fingraP(f, pinto),
      fingraC(f, bazoX, pintoX), a, b, fingraZ(f) ] as
        [ number, number, number, number, number ]));
  // La kvar fingroj, [ baza-x, pinta-x, la pinto ]. Ili kovras la tutan larĝon
  // de la fingra linio, do la manplato mem ne faras breton flanke, kaj ili
  // etete disiĝas. La meza estas la plej longa, la malgranda la plej mallonga.
  const FINGROJ: [ number, number, number ][] = [
    [ -0o25/0o1000, -0o27/0o1000, -0o124/0o1000 ],
    [ -0o7/0o1000,  -0o10/0o1000, -0o130/0o1000 ],
    [  0o7/0o1000,   0o10/0o1000, -0o125/0o1000 ],
    [  0o25/0o1000,  0o27/0o1000, -0o100/0o1000 ],
  ];
  const fingroj = FINGROJ.map(( [ bazoX, pintoX, pinto ] ) => fingro(bazoX, pintoX, pinto));
  // La dikfingro — el la INTERNO de la manplato, klinita eksteren. Ĝia baza
  // ventumilo sidas ene de la manplato, do ĝi ne aperas kiel kvina fingro.
  // ⟨ La dikfingro estas PULPO kun artiko 📃 ⟩ — vera dikfingro ne estas glata
  // kolbaso: la proksimaj du trionoj mallarĝiĝas ĝis la artiko IP ( tie la haŭto
  // sulkiĝas ), kaj la lasta triono estas preskaŭ SAMA larĝa — la plata pulpo, kiu
  // portas la ungon kaj finiĝas per BLUNTAĴO. La antaŭa tabelo tenis 0.0156 tra la
  // tuta proksima duono ( multe pli dika ol la artiko ) kaj finiĝis per 0.0078, do
  // la dikfingro legiĝis kiel dika tubo kun pinto. Nun la duonlarĝo sekvas la verajn
  // proporciojn — 0.0156 ( la MCP ) · 0.0137 ( la mezo ) · 0.0117 ( la artiko ) ·
  // 0.0117 ( la pulpo ) · 0.0098 · 0.0059 ( la pinto ). La pinto ankaŭ kliniĝas
  // iomete antaŭen ( la kvina kolumno ), kiel ripoza dikfingro, kaj en la pulpo la
  // duonlarĝo ( 0o6 ) superas la duondikecon ( 0o5 ), do la pulpo estas PLATA.
  const DIKFINGRAJ_SEKCOJ: [ number, number, number, number, number ][] = [   // [ y, centro-x, duonlarĝo, duondikeco, centro-z ]
    [  0o16/0o1000, 0o14/0o1000, 0o10/0o1000, 0o10/0o1000, 0 ],
    [ -0o4/0o1000,  0o25/0o1000, 0o10/0o1000, 0o10/0o1000, 0 ],
    [ -0o23/0o1000, 0o32/0o1000, 0o7/0o1000,  0o7/0o1000,  0 ],
    [ -0o31/0o1000, 0o36/0o1000, 0o6/0o1000,  0o6/0o1000,  0o1/0o1000 ],
    [ -0o41/0o1000, 0o42/0o1000, 0o6/0o1000,  0o6/0o1000,  0o1/0o1000 ],
    [ -0o46/0o1000, 0o44/0o1000, 0o6/0o1000,  0o5/0o1000,  0o2/0o1000 ],
    [ -0o52/0o1000, 0o46/0o1000, 0o5/0o1000,  0o4/0o1000,  0o3/0o1000 ],
    [ -0o56/0o1000, 0o47/0o1000, 0o3/0o1000,  0o3/0o1000,  0o4/0o1000 ],
  ];
  const dikfingro = tubo(0o2, DIKFINGRAJ_SEKCOJ);
  const DIKFINGRA_BAZO_Y = DIKFINGRAJ_SEKCOJ[0][0];
  const DIKFINGRA_PINTO_Y = DIKFINGRAJ_SEKCOJ[DIKFINGRAJ_SEKCOJ.length - 0o1][0];
  // ⟨ La dikfingro havas sian propran parametron 📃 ⟩ — la ungo bezonas la akson de
  // la fingro kiel funkcion, do la dikfingra tabelo ricevas f ( 0 ĉe la bazo, 1 ĉe
  // la pinto ) kaj la vicoj estas interpolataj laŭ la alto.
  const dikfingraSekco = ( f: number ): number[] => interpolo(DIKFINGRAJ_SEKCOJ,
    DIKFINGRA_BAZO_Y + ( DIKFINGRA_PINTO_Y - DIKFINGRA_BAZO_Y ) * f);
  // ⟪ La ungoj 💅 ⟫
  // ⟨ Kial la ungo estas LENSO 📃 ⟩ — vera ungo estas maldika plato, kiu kurbiĝas
  // kun la fingro. La ungo do estas malgranda tubo ( kiel la fingroj mem ) kun
  // tre plata sekco. La plato estas GRANDA parto de la fingra pinto ( ĝi kovras
  // preskaŭ la tutan dorson ) kaj ĝi elstaras nur kelkajn milimetrojn, do ĝi
  // legiĝas kiel ungo anstataŭ kiel glubendo.
  const UNGA_ELSTARO = 0o1/0o1000;   // 0.0020 — la baza elstaro ( meze )
  // ⟨ La konturo de vera ungo 📃 ⟩ — preskaŭ ortangulo kun rondaj anguloj, ne
  // folio. Ĉiu vico estas [ la pozicio , la konturo , la elstaro ]. La konturo
  // mezuriĝas de la PLEJ LARĜA vico de la ungo mem ( ne de la fingro ), do la sama
  // tabelo priskribas ĉiun ungon sendepende de ĝia larĝo. La ungo restas larĝa ĝis
  // la kutiklo, kaj ankaŭ la ELSTARO kreskas malsupren — vera ungo sidas glate ĉe
  // la kutiklo ( kie la haŭto ĝin tenas ) kaj LEVIĜAS ĉe la libera rando, kie ĝi
  // apartiĝas de la karno.
  // ⟨ La konturo estas GLATA 📃 ⟩ — antaŭe la tabelo havis nur kvar vicojn, do la
  // konturo kaj la elstaro salte ŝanĝiĝis kaj la plato havis kvar videblajn
  // FALDOJN ( ĝi aspektis kiel faldita papero ). Nun sep vicoj rampigas ilin, do
  // la ungo estas glata kupolo, kiu maldikiĝas ĉe la kutiklo kaj leviĝas ĉe la
  // libera rando.
  const UNGAJ_PROFILO: [ number, number, number ][] = [
    [ 0,           0o6/0o7,   0o1/0o10  ],   // la kutiklo — 0.857 / 0.125
    [ 0o1/0o10,    0o15/0o16, 0o3/0o10  ],
    [ 0o1/0o4,     0o1,       0o6/0o10  ],
    [ 0o1/0o2,     0o1,       0o10/0o10 ],   // la plej larĝa kaj plej dika
    [ 0o3/0o4,     0o1,       0o11/0o10 ],
    [ 0o7/0o10,    0o31/0o32, 0o12/0o10 ],
    [ 1,           0o31/0o32, 0o12/0o10 ],   // la libera rando — plej levita
  ];
  // ⟨ La ungo KURBIĝas laŭlarĝe 📃 ⟩ — vera ungo ne finiĝas per rekta tranĉo: la
  // kutiklo formas arkon AL LA POJNO kaj la libera rando arkon AL LA PINTO, do la
  // centro de ĉiu rando estas pli malproksima ol ĝiaj anguloj. La kurbo estas
  // proporcia al la larĝo de la ungo mem, do la sama nombro taŭgas por la dikfingro
  // kaj por la malgranda fingro.
  const UNGA_KURBO = 0o3/0o10;      // 0.375 — kiom la randoj kurbiĝas
  // ⟨ La ungo KUŜAS sur la fingro 📃 ⟩ — la plato ne estas globeto sur la pinto, ĝi
  // estas ŝelo, kiu sekvas la fingran elipson: ĝia supro sidas ELSTARO super la
  // haŭto, kaj ĝiaj flankaj randoj sidas SUR la haŭto, kie la elipso malaltiĝas. El
  // tio la dikeco de la plato sekvas mem — LARĜA ungo devas esti pli dika ol
  // mallarĝa, ĉar ĝi devas atingi la haŭton ĉe siaj du randoj. Sur dika kaj ronda
  // dikfingro larĝa ungo do ŝvelus kiel globeto anstataŭ kuŝi kiel plato — sed la
  // nova dikfingro estas plata, do lia ungo povas esti larĝa ( vidu larĝoF ).
  const ungaAlto = ( b: number, larĝo: number ) =>
    b * Math.sqrt(Math.max(0, 0o1 - larĝo * larĝo));   // la alto de la flankaj randoj
  const ungaDiko = ( b: number, larĝo: number, elstaro: number ) =>
    b + UNGA_ELSTARO * elstaro - ungaAlto(b, larĝo);   // de la rando ĝis la supro
  // kreiUngon — unu ungo sur la dorso de la pinta parto de unu fingro.
  //     @param akso ( f => [ x, y, z ] ) - La akso de la fingro.
  //     @param sekco ( f => [ duonlarĝo, duondikeco ] ) - La dikeco de la fingro.
  //     @param de, al ( number ) - La limoj de la ungo laŭ la fingro ( 0 … 1 ).
  //     @param dorsa ( [ number, number ] ) - La unuobla dorsa direkto en la
  //         ( x, z ) ebeno ( la dikfingro uzas la saman kiel la fingroj, ĉar
  //         lia akso kuŝas en la ( x, y ) ebeno, do −z estas ĝuste perpendikla ).
  //     @param larĝoF ( number = 0o7/0o10 , optional ) - Kiom de la fingra
  //         duonlarĝo la ungo kovras ĉe sia plej larĝa vico.
  //     @returns geometrio ( THREE.BufferGeometry ) - La ungo.
  const kreiUngon = ( akso: ( f: number ) => [ number, number, number ],
    sekco: ( f: number ) => [ number, number ], de: number, al: number,
    dorsa: [ number, number ], larĝoF = 0o7/0o10 ) => {
    const U = 0o20;                  // la flankoj de la unga sekco
    const [ dx, dz ] = dorsa;
    const lx = -dz, lz = dx;         // la perpendikularo — la larĝa akso
    // la kurbo de la randoj — negativa ĉe la kutiklo, pozitiva ĉe la pinto
    const kurbo = ( larĝo: number, t: number ) => UNGA_KURBO * larĝo * ( 0o2 * t - 0o1 );
    const centro = ( f: number, konturoF: number, t: number ) => {
      const [ x, y, z ] = akso(f);
      const [ a, b ] = sekco(f);
      const s = ungaAlto(b, larĝoF * konturoF);
      const k = kurbo(a * larĝoF * konturoF, t);
      return [ x + dx * s, y - k, z + dz * s ] as [ number, number, number ];
    };
    const ringo = ( f: number, konturoF: number, elstaroF: number, t: number ) => {
      const [ cx, cy, cz ] = centro(f, konturoF, t);
      const [ a, b ] = sekco(f);
      const larĝo = a * larĝoF * konturoF;
      const diko = ungaDiko(b, larĝoF * konturoF, elstaroF);
      const k = kurbo(larĝo, t);
      return Array.from({ length: U }, ( _, i ) => {
        const ang = i / U * Math.PI * 0o2;
        const kos = Math.cos(ang), sin = Math.sin(ang);
        // ⟨ La ringo sekvas la fingron 📃 ⟩ — la larĝa akso kaj la dika akso estas
        // tiuj de la fingro mem ( vidu tubon ), do la ventumiloj de la ungo montras
        // eksteren same kiel tiuj de la fingro. La centro de la ringo antaŭeniras
        // per la kurbo, kaj la anguloj restas sur la vico — tiel la randoj kurbiĝas.
        return [ cx + lx * larĝo * kos - dx * diko * sin, cy + k * kos * kos,
          cz + lz * larĝo * kos - dz * diko * sin ] as [ number, number, number ];
      });
    };
    const ventumilo = ( f: number, konturoF: number, t: number ):
      [ number, number, number ][] => Array.from({ length: U }, () => centro(f, konturoF, t));
    // ⟨ La kutikla ventumilo estas PLATA 📃 ⟩ — ĝi sidas sur la sama alto kiel la
    // unua sekco ( kiel la bazo de la fingroj mem, vidu tubon ), do la ungo finiĝas
    // per rekta rando anstataŭ per pinta tegmento. La libera rando etendas iomete
    // preter la lasta sekco, do ĝi rondiĝas.
    const preter = ( al - de ) * 0o1/0o20;     // 0.0625
    const lasta = UNGAJ_PROFILO[UNGAJ_PROFILO.length - 0o1];
    const fino = 0o1 + preter / ( al - de );   // la parametro de la libera ventumilo
    return kreiRinganSurfacon([
      ventumilo(de, UNGAJ_PROFILO[0][1], 0),
      ...UNGAJ_PROFILO.map(( [ t, konturoF, elstaroF ] ) =>
        ringo(de + ( al - de ) * t, konturoF, elstaroF, t)),
      ventumilo(al + preter, lasta[1], fino) ]);
  };
  // ⟨ La fingraj ungoj 📃 ⟩ — la sama ungo por ĉiu fingro, nur la akso malsamas.
  // La ungo kovras la lastan sesonon de la fingro kaj finiĝas antaŭ la pinto mem,
  // do la karno ĉirkaŭas ĝin kiel ĉe vera fingro. La ungo estas proksimume 1.3-oble
  // pli longa ol larĝa, kiel vera ungo ( la malnova estis duoble tro longa ).
  const UNGA_DE = 0o66/0o100, UNGA_AL = 0o76/0o100;    // 0.844 / 0.969
  const fingraSekco = ( f: number ): [ number, number ] => {
    const vico = interpolo(FINGRAJ_SEKCOJ, f);
    return [ vico[1], vico[2] ];
  };
  const ungoj = [
    ...FINGROJ.map(( [ bazoX, pintoX, pinto ] ) => kreiUngon(
      ( f ) => [ fingraC(f, bazoX, pintoX), fingraP(f, pinto), fingraZ(f) ],
      fingraSekco, UNGA_DE, UNGA_AL, [ 0, -0o1 ] )),
    // ⟨ La ungo de la dikfingro 📃 ⟩ — ĝi estas multe pli MALVARĜA ol la dikfingro
    // mem ( 0.625 de la duonlarĝo ). Tio estas la grava parto: la dikfingra sekco
    // estas preskaŭ ronda, do ungo de 0.875 volvus sin duone malsupren sur la
    // FLANKOJN de la fingro kaj legiĝus kiel ungo sur la flanko. Kun 0.625 la randoj
    // de la plato sidas alte sur la dorso ( 0.78 de la profundo ) kaj la haŭto
    // restas videbla flanke.
    // ⟨ La libera rando atingas la PINTON, sed la ungo restas KONCISA 📃 ⟩ — la
    // plato montriĝis tro longa kiam ĝi etendiĝis de la artiko al la pinto ( 1.6
    // unuojn longa kontraŭ 1.0 larĝa = ovo ). Nun ĝi estas preskaŭ kvadrata ( 1.0
    // je 1.0 , kiel vera dikfingra ungo ) kaj la tuta plato ŝoviĝis MALSupren, al la
    // pinto mem: la libera rando sidas 0.25 unuojn ( du milimetrojn ) antaŭ la pinto,
    // do la ungo finiĝas tie, kie la fingropinto rondiĝas, anstataŭ meze de la
    // falango. La kutiklo ankoraŭ restas sub la artiko IP.
    // Ĝi SIDAS rekte sur la dorso — la dikfingro estas klinita en la ( x, y ) ebeno,
    // do −z restas perpendikla al lia akso kaj la ungo ne devas kliniĝi flanken.
    kreiUngon(( f ) => {
      const vico = dikfingraSekco(f);
      return [ vico[1], vico[0], vico[4] ];
    }, ( f ) => {
      const vico = dikfingraSekco(f);
      return [ vico[2], vico[3] ];
    }, 0o27/0o32, 0o37/0o40, [ 0, -0o1 ], 0o5/0o10),
  ];
  return { mano: kunfandiGeometriojn([ manplato, ...fingroj, dikfingro ]),
    ungoj: kunfandiGeometriojn(ungoj) };
}

// kreiKorpanPiedon — La piedo de la homa modelo, en la sama kadro kiel la BOTO
// ( la genuo estas la nulo, la tero je −0.5 ).
// ⟨ La piedo ruliĝas KUNE kun la ŝuo 📃 ⟩ — ĝi estas aparta geometrio, ĉar ĝi
// sidas en la MALEOLA grupo de la ŝuo ( vidu konstruiFiguron ). Dum la paŝo la boto
// ruliĝas de la kalkano al la pinto; se la nuda piedo restus veldita al la kruro,
// ĝi turniĝus kontraŭ la boto kaj trapikus ĝian pinton ĉe ĉiu paŝo ( la haŭto
// montriĝis kiel hela makulo sur la bota pinto dum la tuta marŝo ).
//     @returns geometrio ( THREE.BufferGeometry ) - La piedo ( la mondaj unuoj ).
function kreiKorpanPiedon(): THREE.BufferGeometry {
  const K = 0o20;
  const centro = ( y: number, z: number ) => Array.from({ length: K },
    () => [ 0, y, z ] as [ number, number, number ]);
  // ⟨ La piedo 📃 ⟩ — sekcoj laŭ la LONGO de la piedo ( la sama konstruo kiel la
  // bota piedo, nur pli mallarĝa kaj pli malalta ), do la homa kruro finiĝas per
  // vera piedo anstataŭ per stumpo. La fundo sidas ĵuste super la plando.
  const FUNDO = -0o74/0o200;                 // −0.4688 — la malsupro, sur la plando
  const sekcoj: [ number, number, number ][] = [   // [ z, duonlarĝo, la supro ]
    [ -0o11/0o200, 0o6/0o200,  -0o72/0o200 ],   // la kalkano ( la mondo 0.047 )
    [ -0o5/0o200,  0o7/0o200,  -0o71/0o200 ],   // la arko
    [  0o1/0o200,  0o10/0o200, -0o70/0o200 ],   // la maleolo ( la mondo 0.0625 )
    [  0o16/0o200, 0o7/0o200,  -0o72/0o200 ],   // la pilko de la piedo
    [  0o25/0o200, 0o5/0o200,  -0o73/0o200 ],   // la fingroj ( sub la bota pinto )
  ];
  // La nudaj piedfingroj restas 0.008 … 0.02 sub la ledaj sekcoj kaj la maleolo
  // 0.031 sub la leda supraĵo, do la nudaj piedoj videblas nur kiam la ŝuoj
  // kaŝiĝas — ili neniam trapikas la ledon.
  const centroP = ( sekco: [ number, number, number ]) =>
    centro(( sekco[2] + FUNDO ) / 0o2, sekco[0]);
  const piedo = kreiRinganSurfacon([ centroP(sekcoj[0]),
    ...sekcoj.map(([ z, a, supro ]) => {
      const hh = ( supro - FUNDO ) / 0o2, yc = ( supro + FUNDO ) / 0o2;
      return Array.from({ length: K }, ( _, i ) => {
        const [ x, y ] = superelipso(i / K * Math.PI * 0o2, a, hh, 0o4);
        return [ x, yc + y, z ] as [ number, number, number ];
      });
    }), centroP(sekcoj[sekcoj.length - 0o1]) ]);
  return piedo;
}

// ⟨ La femuro ne rajtas elstari 📃 ⟩ — la kruroj staras je ± 0.075 de la centro,
// kaj la FEMURO mem estas 0.094 larĝa kaj 0.086 PROFUNDA ĉe la kokso. La antaŭa
// pantalono estis pli malprofunda ol la femuro ( 0.070 ) kaj pinĉiĝis ĝuste ĉe la
// plej dika parto de la kruro, do la haŭto trapikis la ŝtofon ĵuste sub la ĉemiza
// rando kaj videblis kiel hela makulo antaŭ la blua ŝtofo. Nun la tri supraj
// ringoj estas pli profundaj ol la femuro ( 0.098 … 0.102 kontraŭ 0.086 ) kaj la
// profilo malkreskas GLATE — la ŝtofo ĉirkaŭas la kruron sen pinĉiĝo. La koksa
// ringo ( 0.102 ĉe ± 0.075 → 0.177 de la akso ) restas ene de la ĉemiza elipso
// ( 0.226 × 0.170 ) kaj sub la ĉemiza rando.
// kreiPantalonan — La pantalona kruro. Antaŭe ĝi estis 0o14-flanka cilindro
// ( 0.109 supre, 0.0703 malsupre ) — la tuta kruro do legiĝis kiel tubo. Nun ĝi
// estas konko kun la femuro, la genuo kaj la suro, kaj
// ĝia malsupro enŝoviĝas en la botan ŝtipon.
// ⟨ La tuko enŝoviĝas en la boton 📃 ⟩ — la kruro maldikas supren — ĉe la bota rando
// ( 0.03125 ) la tubo estas nur 0.0742 × 0.0742 dum la boto estas 0.0859 × 0.0938,
// do ĝi vere enŝoviĝas en la ŝtipon kaj la rando de la boto restas la plej larĝa
// parto. Tio ankaŭ gravas por la laŭta paŝo — la boto RULIĜAS ĉirkaŭ la maleolo
// ( vidu la ruliĝon en marŝSvingo ) kaj la tubo ne, do ĝi bezonas aeron en la
// direkto de la ruliĝo ( z ). La mallarĝiĝo sidas tute ene de la boto, do ĝi ne
// videblas — kaj la videbla parto ( super la rando ) restas maldika kaj taŭga.
// ⟨ Kiom da aero super la rando 📃 ⟩ — ĉe 0.03125 la tubo ( 0.0742 ) lasas 0.0196
// da aero antaŭe kaj malantaŭe, pli ol la 0.0168 kiujn la ruliĝo postulas — la
// ŝtofo do neniam trapikas la ledon dum la paŝo.
//     @returns ( { supra, malsupra } ) - La du partoj de la pantalona kruro.
function kreiPantalonan(): { supra: THREE.BufferGeometry; malsupra: THREE.BufferGeometry } {
  const K = 0o20;
  // ⟨ La pantalono SEKVI la genuon 📃 ⟩ — la ŝtofo devas ĉirkaŭi la patelon
  // ( vidu kreiKorpanKruropon ), do ĝi havas propran genu-ringon ĉe la sama alto,
  // iomete antaŭenŝovitan. La ringoj ĉirkaŭ ĝi estas pli larĝaj ol la femuro kaj
  // ol la tibio — tiel la pantalono legiĝas kiel ŝtofo, kiu FALDIĜAS super la
  // genuo, anstataŭ kiel egala tubo.
  // ⟨ La kokso MALDIKIĜIS 📃 ⟩ — la du plej supraj ringoj havis radiuson 0.1016
  // ĉe la kokso dum la kruro sub ili estas 0.0859, do la pantalono ŝvelis 0.02 pli
  // larĝe ol la kruro ĝuste tie, kie ĝi devas resti ene de la ĉemizo ( la interna
  // ĉemizo atingas nur 0.2031 ĉe la sama alto ). Dum la paŝo la femuro puŝas la
  // ringon antaŭen 0.042, do la pinta radiuso de la pantalono ( 0.2044 ) superis la
  // ĉemizon je 0.034 kaj la ŝtofo de la kruro trairis la ĉemizon. Nun tiuj du
  // ringoj havas 0.09375 — la koksa tubo nur ĉirkaŭas la kruron ( 0.0664 … 0.0859 )
  // kaj la pinta radiuso falas al 0.1875, do la ĉemizo restas ekstere dum la tuta
  // paŝo. La ŝtofo estas tute kaŝita sub la ĉemizo ĉe tiu alto, do la maldikiĝo ne
  // videblas — la videbla femuro ( la ringo 0.2031 malsupren ) restas dika.
  const ringoj: [ number, number, number, number ][] = [    // [ y, a, b, z-ŝovo ] de la kokso malsupren
    [  0o67/0o200, 0o30/0o400, 0o30/0o400,  0        ],   // 0.4297 — la kokso ( sub la ĉemizo )
    [  0o51/0o200, 0o30/0o400, 0o30/0o400,  0        ],   // 0.3203 — la femuro-supra ( sub la ĉemizo )
    [  0o32/0o200, 0o32/0o400, 0o30/0o400,  0        ],   // 0.2031 — la femuro ( sub la rando )
    [  0o15/0o200, 0o31/0o400, 0o30/0o400,  0        ],   // 0.1016 — super la genuo
    [  0,          0o30/0o400, 0o31/0o400,  0o1/0o100 ],  // 0 — la GENUO ( la ŝtofo antaŭen )
    [ -0o15/0o200, 0o24/0o400, 0o24/0o400, -0o1/0o400 ],  // −0.1016 — la suro ( en la boto )
    [ -0o34/0o200, 0o23/0o400, 0o23/0o400,  0        ],   // −0.2188 — la tibio ( en la boto )
    [ -0o27/0o100, 0o21/0o400, 0o21/0o400,  0        ],   // −0.3594 — profunde ene de la ŝtipo
  ];
  // ⟨ La pantalono eniras PROFUNDE en la boton 📃 ⟩ — la tubo antaŭe finiĝis ĉe
  // −0.2188 ( la mondo 0.281 ), nur 0.031 sub la rando de la boto. La buŝo de la
  // boto do montris la ĝustan pantalonon nur ĉe la rando, kaj kiam la piedo
  // ruliĝis oni vidis la internon de la ŝtipo kaj la ferman ventumilon de la
  // pantalono. Nun la tubo malsupreniras al −0.3594 ( la mondo 0.14 ), do ĝi
  // plenigas la tutan buŝon kaj la ŝtipo ĉiam montras ŝtofon interne.
  const centro = ( y: number ) => Array.from({ length: K },
    () => [ 0, y, 0 ] as [ number, number, number ]);
  const vicoj = ringoj.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
    // ⟨ La sekco estas ELIPSO, ne ortangulo 📃 ⟩ — la eksponento 0o4 donis al la
    // pantalono kvadratajn angulojn, kaj la 45° angulo ( 0.84 · a ) elstaris
    // 0.09 preter la mantelo kaj la ĉemizo dum la paŝo. La ronda sekco havas la
    // saman silueton ( la larĝo kaj la profundo ne ŝanĝiĝas ) sed la anguloj
    // retiriĝas al 0.71 · a, do la ŝtofo restas ene de la mantelo.
    const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
    return [ x, y, z + dz ] as [ number, number, number ];
  }));
  // ⟨ Ankaŭ la pantalono estas DISIGITA ĉe la genuo 📃 ⟩ — ĝi havas genuan ringon
  // ĉe la sama alto kiel la kruro ( vidu kreiKorpanKruropon ), do la du tavoloj
  // fleksiĝas KUNE kaj la genuo de la ŝtofo sekvas la genuon de la karno. La
  // artika sfero de la ŝtofo estas pli granda ol tiu de la kruro, ĉar la
  // pantalono estas pli larĝa — ĝi sidas ene de la mantelo ĉe tiu alto.
  const GENUO = 0o4;
  const lasta = ringoj[ringoj.length - 0o1][0];
  const supra = kreiRinganSurfacon([ centro(ringoj[0][0]),
    ...vicoj.slice(0, GENUO + 0o1) ]);
  const malsupra = kreiRinganSurfacon([ ...vicoj.slice(GENUO), centro(lasta) ]);
  // ⟨ La genuo FALDIĜAS antaŭen 📃 ⟩ — la tuko de pantalono ne faras patelon; ĝi
  // faras faldon. La sfero do estas pli plata ol tiu de la kruro kaj ĝi sidas
  // pli antaŭen, do la genuo legiĝas kiel ŝtofo kiu faldiĝis super la genuo.
  // ⟨ La sfero mezuriĝas per la LARĜO, ne per la profundo 📃 ⟩ — la silueto de la
  // kruro estas ĝia duonlarĝo, kaj la pantalono mallarĝiĝas Tuj sub la genuo
  // ( 0.0938 → 0.0781 en larĝo, sed nur 0.0977 → 0.0938 en profundo ). Sfero
  // egala al la PROFUNDO do elstarus preskaŭ trionon preter la tibio kaj la genuo
  // legiĝus kiel glata pilko. La larĝo plus eta leveto donas la faldon sen la
  // pilko.
  const g = ringoj[GENUO];
  const artiko = kreiArtikanSferon([ 0, 0, g[3] ], g[1] - 0o1/0o1000, 0o7/0o10);
  // ⟨ La UV-oj 📃 ⟩ — kreiRinganSurfacon NE faras UV-ojn, kaj la pantalona kanvaso
  // estas PENTRITA ( la akcenta rimeno, la steloj ). Ĝis nun la tuta tubo legis la
  // saman angulan punkton de la kanvaso ( uv = 0, 0 ) — la desegno do tute ne
  // montriĝis kaj la pantalono aspektis unukolora. Nun u rondiras la tubon kaj v
  // iras de la kokso ( v = 1 — la SUPRA vico de la kanvaso, ĉar la teksturo
  // renversiĝas ) malsupren ĝis la boto ( v = 0 ). La motivoj de la kanvaso tial
  // devas sidi en la videbla bendo — vidu pentriPantalonon.
  // ⟨ La UV-oj estas GLOBALAJ 📃 ⟩ — la vicoj estas numeritaj laŭ la TUTA tabelo
  // ( la kunigita geometrio havis naŭ vicojn ), do la du disigitaj partoj ricevas
  // la samajn v-valorojn kiel antaŭe kaj la teksajxo restas senkudra trans la
  // genuo. Nur la vicoj de ĉiu parto mem estas skribitaj.
  const vicojTutaj = ringoj.length + 0o2;
  const alUvoj = ( geometrio: THREE.BufferGeometry, indeksoj: number[] ) => {
    const uvoj: number[] = [];
    for ( const v of indeksoj ) {
      const vv = 0o1 - v / ( vicojTutaj - 0o1 );
      for ( let i = 0; i < K; i++ ) uvoj.push(i / K, vv);
    }
    geometrio.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(uvoj), 0o2));
    return geometrio;
  };
  const suprajVicoj = Array.from({ length: GENUO + 0o2 }, ( _, i ) => i );
  const malsuprajVicoj = Array.from({ length: vicojTutaj - GENUO - 0o1 },
    ( _, i ) => i + GENUO + 0o1 );
  return { supra: alUvoj(supra, suprajVicoj),
    malsupra: kunfandiGeometriojn([ alUvoj(malsupra, malsuprajVicoj), artiko ]) };
}

function figurajGeometriojn(): NonNullable<typeof figurajGeometrioj> {
  if ( figurajGeometrioj ) return figurajGeometrioj;

  // ⟨ La kapo 📃 ⟩ — la kranio ( vidu kreiKapanKranion ) kun du oreloj kaj la
  // kolo, ĉiuj kunfanditaj en unu geometrion ( ili estas la sama haŭto ).
  const kapo = kreiKapanKranion();
  // ⟨ La kolo MALDIKIĜIS 📃 ⟩ — la malnova kolo estis 0.109 … 0.125, nome 0.22
  // larĝa, dum la kapo estas 0.34. Vera kolo estas proksimume 0.6 de la kapo, do
  // la malnova dika cilindro legis kiel la daŭrigo de la vizaĝo kaj la makzelo
  // neniam havis suban randon. Nun ĝi estas 0.09 … 0.11.
  const kolo = new THREE.CylinderGeometry(0o56/0o1000, 0o71/0o1000, 0o5/0o40, 0o14, 0o1);
  kolo.translate(0, KOLO_Y, 0);
  const kapajPartoj: THREE.BufferGeometry[] = [ kapo, kolo ];
  // ⟨ La oreloj nun estas ŜELOJ 📃 ⟩ — la malnova orelo estis premita GLOBO, do
  // ĝi havis la ĝustan grandon sed neniun konturon. Nun ĉiu orelo estas ŝelo el
  // sekcoj ( vidu kreiOrelon ) — ĝi elkreskas el la vango kaj finiĝas per rimo,
  // kiu staras for de la kapo. La antaŭa rando sidas ene de la kranio, do la du
  // formoj kunfandiĝas sen fendo, kaj la supra rimo restas sub la har-limo ( la
  // haroj pasas 0.008 super la orelo ĉe la flanko — vidu kreiHaranĈapon ).
  for ( const dir of [ -0o1, 0o1 ] ) kapajPartoj.push(kreiOrelon(dir));
  // ⟨ La nazo 📃 ⟩ — rondigita TRIANGULO sur la vizaĝa surfaco ( vidu kreiNazon ).
  // Ĝiaj antaŭaj versioj — skatolo ( kiu sidis tute INTERNE de la kapo kaj neniam
  // videblis ), poste globo ( kiu legiĝis kiel glata tubero ). La triangulo havas
  // la ponton supre, la pinton malsupre kaj la flugilojn flanken, kaj la pinto
  // elstaras pli ol la ponto — la vizaĝo do ricevas profilon sen beko.
  kapajPartoj.push(kreiNazon());
  const kapa = kunfandiGeometriojn(kapajPartoj);

  // ⟨ La vizaĝo 📃 ⟩ — la okuloj kaj la brovoj. Ili sidas PRESKAŬ tute en la
  // kapo ( nur malgranda ĉapo elstaras ), do ili legiĝas kiel okuloj anstataŭ
  // kiel globoj. Aparta geometrio, ĉar ili portas sian propran malhelan
  // materialon — unu dividitan meshon por ĉiuj figuroj.
  // ⟨ La okuloj 📃 ⟩ — almandoj ( vidu kreiOkulon ). Nun ili estas 0o4/0o200 da
  // mondunuoj larĝaj kaj 0o13/0o1000 altaj, do la okulo estas pli LARĜA ol alta —
  // la proporcio de vera okulo. La interna angulo sidas iomete pli malalte ol la
  // ekstera ( la klino ), do la rigardo havas direkton anstataŭ esti plata.
  // ⟨ Kial NENIAJ brovoj 📃 ⟩ — du maldikaj lensoj super la okuloj estis provitaj,
  // sed la facetoj de la kapa sfero estas interne de la ideala sfero ( la krano
  // estas malalt-poligona ), do maldika lenso aŭ flosis super la vizaĝo aŭ
  // malaperis interne de ĝi — la brovoj aspektis kiel du mallumaj naĝiloj. La
  // grandaj malhelaj okuloj mem portas la rigardon, do la brovoj foriĝis.
  const okuloj: THREE.BufferGeometry[] = [
    kreiOkulon(-0o1, OKULA_DX, OKULA_DY, OKULA_DZ, OKULA_LARĜO, OKULA_ALTO, -0o1/0o10),
    kreiOkulon(0o1, OKULA_DX, OKULA_DY, OKULA_DZ, OKULA_LARĜO, OKULA_ALTO, 0o1/0o10),
  ];
  // ⟨ La buŝo ALDONIĜAS al la vizaĝa geometrio 📃 ⟩ — la buŝo portas la saman
  // malhelan materialon kiel la okuloj, do ĝi aliĝas al ilia geometrio anstataŭ
  // fari trian meshon por ĉiu figuro — kaj ĝi restas kolorigita per la okula
  // paletro de la figuro.
  const vizaĝo = kunfandiGeometriojn([ ...okuloj, kreiBuŝon() ]);
  // ⟨ La brovoj kaj la okulharoj 📃 ⟩ — aparta geometrio, ĉar ili portas la HARAN
  // materialon ( la vizaĝa materialo estas dividita po okula paletro, do brovo
  // pentrita en ĝia kanvaso havus la saman koloron por ĉiuj figuroj ).
  const vizaĝajStrikoj = kreiVizaĝajnStrikojn();

  // ⟨ La botoj 📃 ⟩ — la tuta ŝuo ( la ŝtipo kun la ruliĝanta manumo, la piedo
  // kun la malaltiĝanta pinto ) kaj la plando venas el kreiBotan. La plando jam
  // SIDAS sub la piedo kaj la pinto de la boto kongruas kun la tero, do ĉi tie
  // restas nur la geometrio.
  const { boto, akcentaj } = kreiBotan();

  // ⟨ La brako kaj la mano 📃 ⟩ — la brako ( vidu kreiKorpanBrakon ) eniras la
  // manikon kaj finiĝas per la mano ( vidu kreiKorpanManon ). La du manoj uzas la
  // SAMAN geometrion — la spegulado okazas per scale.x en konstruiFiguron, ĉar la
  // dikfingro sidas ĉe la interna flanko.
  const kruro = kreiKorpanKruropon();
  const brako = kreiKorpanBrakon();
  const pantalono = kreiPantalonan();
  // ⟨ La mano kaj la ungoj 📃 ⟩ — la sama geometrio por ambaŭ manoj, sed la ungoj
  // estas aparta geometrio, ĉar ili portas alian materialon ( vidu ungaMaterialon ).
  const manoj = kreiKorpanManon();
  // ⟨ La maniko estas disigita ĉe la KUBUTO 📃 ⟩ — la sama alto kiel la brako ( vidu
  // kreiKorpanBrakon ), do la du partoj de la maniko fleksiĝas kune kun la brako.
  // La radiuso ĉe la kubuto estas la LINIA interpolo inter la ŝultro kaj la
  // manumo, do la du duonoj renkontiĝas per la sama cirklo — ne estas ŝtupo.
  // ⟨ La du duonoj RICEVAS la saman UV-mapadon 📃 ⟩ — la manika kanvaso portas la
  // PENTRITAN akcentan bordon de la tondita rando ( vidu vestaTeksajxon ), kaj ĝi
  // uzas v de 0 ( la ŝultro ) ĝis 1 ( la rando ). Sen la remapo ĉiu duono havus
  // sian propran v de 0 ĝis 1, do la bordo montriĝus ankaŭ ĉe la kubuto kaj la
  // teksajxo ripetiĝus dufoje.
  const MANIKA_SUPRO = 0o11/0o200;      // 0.0703 — la ŝultro
  // ⟨ La manumo nun KOVRAS la manon 📃 ⟩ — la pojno sidas 0.16 sub la kubuto kaj
  // la manŝtono etendiĝas de 0.15 ĝis 0.41 sub ĝi, do la malnova manumo ( 0.0547,
  // finiĝante 0.16 sub la kubuto ) lasis la tutan manon nudan. Nun la manumo estas
  // 0.0781 — iomete pli larĝa ol la ŝultro de la maniko, ĉar la ŝtofo DRAPIĜAS
  // super la manon — kaj la rando pendas 0.25 sub la kubuton, sur la DORSON de la
  // mano, dum la fingroj elstaras. La manŝtono atingas 0.0742 ĉe sia plej larĝa
  // punkto ( 0.30 sub la kubuto ), do la ŝtofo restas 0.004 … 0.008 ekstere de la
  // haŭto sur la tuta vojo malsupren ( mezurite per la verticoj de la manŝtono, kiuj
  // ankaŭ montris la malnovan manikon 0.02 tro mallarĝan super la fingroj ).
  const MANIKA_MALSUPRO = 0o50/0o1000;  // 0.0781 — la manumo ( super la mano )
  const KUBUTA_Y = KUBUTO_Y;                 // −0.3398 — la kubuto ( vidu KUBUTO_Y )
  // ⟨ La manumo pendas 0.25 sub la kubuton 📃 ⟩ — la malsupra rando de la maniko
  // mezuriĝas de la KUBUTO ( ne de la ŝultro ), ĉar la du duonoj renkontiĝas tie.
  const MANUMO_MALSUPRO = 0o1/0o4;           // 0.25 — kiom la rando pendas sub la kubuto
  const MANIKA_BAZO = KUBUTA_Y - MANUMO_MALSUPRO;   // −0.5898 — la manika fina alto
  const KUBUTA_V = KUBUTA_Y / MANIKA_BAZO;   // 0.576 — la kubuto laŭ la manika longo
  // ⟨ La maniko NE mallarĝiĝas plu 📃 ⟩ — la radiuso de la maniko sekvis la saman
  // lerpon kiel la longo ( 0.0597 ĉe la kubuto ), do la maniko mallarĝiĝis ĝuste
  // tie, kie la brako DIKIĜAS — la bicepso estas 0.0644 ( kun sia antaŭena ŝovo )
  // ĉe la sama alto kaj la ŝtofo atingis nur 0.0643, do la haŭto trapikis la
  // manikon per 0.005 dum la tuta paŝo ( mezurite per radioj ĉe azimuto 270, kie la
  // brako estas plej dika ). Nun la manumo estas pli larĝa ol la ŝultro, do la
  // maniko etendiĝas anstataŭ mallarĝiĝi kaj la kubuta radiuso estas 0.0723 — la
  // ŝtofo restas 0.008 ekstere de la bicepso sur la tuta manika longo, kaj la sama
  // radiuso pligrandigas la kubutan sferon ( manikaArtiko ) tiel ke la olekrano
  // ankaŭ restas kovrita.
  const KUBUTA_R = MANIKA_SUPRO + ( MANIKA_MALSUPRO - MANIKA_SUPRO ) * 0o1/0o4;
  const manikaSupra = remapiUVon(kreiFoliaTonditanTubon(MANIKA_SUPRO, KUBUTA_R, 0,
    KUBUTA_Y, 0o60, 0o4, 0, 0, true), 0, KUBUTA_V);
  // ⟨ La folia rando MALPROFUNDIĜIS 📃 ⟩ — la tonditaj loboj pendis 0.125 sub la
  // manumo kaj la noĉoj leviĝis 0.031, do la rando tondiĝis 0.156 — triono de la
  // tuta maniko. La brako estis videbla tra la larĝaj V-fendoj inter la loboj kaj
  // la manumo aspektis TRAPIKITA de la brako. Nun la loboj pendas 0.023, do la
  // rando ondas sen malfermi la brakon.
  // ⟨ La rando MALPLI ONDAS super la mano 📃 ⟩ — la manumo nun finiĝas super la
  // manŝtono, do larĝaj V-noĉoj montrus la haŭton tra la maniko mem. La folioj
  // do pendas nur 0.023 kaj la noĉoj leviĝas 0.016, do la rando restas preskaŭ
  // rekta linio kun mola undeto.
  const malprofundeco = 0o3/0o200;           // 0.0234 — kiom la loboj pendas
  const manikaMalsupra = kreiFoliaTonditanTubon(KUBUTA_R, MANIKA_MALSUPRO, KUBUTA_Y,
    MANIKA_BAZO, 0o60, 0o4, malprofundeco, 0o10/0o1000, false);
  remapiUVon(manikaMalsupra, KUBUTA_V, 0o1);
  manikaMalsupra.translate(0, -KUBUTA_Y, 0);
  // ⟨ La kubuto de la maniko 📃 ⟩ — la maniko havas sian propran artikon, kiel la
  // brako kaj la pantalono. Sen ĝi la kojno inter la du duonoj montrus la HAŬTON
  // de la brako ( la artiko de la brako estas nur 0.002 ene de la ŝtofo ), do la
  // kubuto aspektus kiel truo en la vesto.
  // ⟨ La sfero SIDAS kiel la braka olekrano 📃 ⟩ — la braka kubuto-ringo estas
  // ŝovita 0.0059 MALANTAŬEN ( la olekrano ), do ĝi atingas 0.0577 de la akso dum
  // la sfero de la maniko ( sen ŝovo, radiuso 0.0562 ) atingis nur 0.0562 — la
  // osto trapikis la kubuton de la vesto per mola tubero dum ĉiu flekso. Nun la
  // sfero portas la SAMAN ŝovon kaj la plenan radiuson KUBUTA_R, do la ŝtofo
  // ĉirkaŭas ĝin ĉie.
  const manikaArtiko = kreiArtikanSferon([ 0, 0, -0o3/0o1000 ], KUBUTA_R, 0o7/0o10);
  figurajGeometrioj = {
    // ⟨ La homa modelo 📃 ⟩ — la kapo, la vizaĝo, la torso, la brakoj, la kruroj
    // kaj la manoj.
    kapa,
    vizaĝo,
    vizaĝajStrikoj,
    palpebroj: kreiPalpebrojn(),
    korpo: kreiKorpanTorson(),
    kruroSupra: kruro.supra,
    kruroMalsupra: kruro.malsupra,
    korpaPiedo: kreiKorpanPiedon(),
    brakoSupra: brako.supra,
    brakoMalsupra: brako.malsupra,
    mano: manoj.mano,
    ungoj: manoj.ungoj,
    interna: kreiInternanSxelon(),
    // ⟨ La vesto-modelo 📃 ⟩ — la robo, la pantalono, la manikoj kaj la ŝuoj. La
    // pantalono finiĝas ene de la bota ŝtipo ( vidu kreiPantalonan ), do la du
    // modeloj kunvenas en la ŝuo kaj neniu rando flagras.
    roba: kreiMalfermanRobonSxelon(),
    pantalonaSupra: pantalono.supra,
    pantalonaMalsupra: pantalono.malsupra,
    boto,
    akcenta: akcentaj,
    // ⟨ La maniko mallongiĝis kun la robo 📃 ⟩ — la foli-pintoj antaŭe iris ĝis
    // −0.875 ( la mondo 0.539 ) kaj pendis sub la roba rando kiel vosto. Nun la
    // bazo estas −0.4375 kaj la pintoj finiĝas ĉe −0.5625 ( la mondo 0.859 ) — ili
    // restas 0.35 super la roba rando, kaj la fingropintoj de la mano ( −0.741 )
    // elstaras 0.18 SUB ili.
    // ⟨ La manumo ne plu trapikas la manon 📃 ⟩ — la bazo estis −0.5, do la
    // foli-pintoj pendis ĝis −0.6 kaj la PLEJ LARĜA parto de la mano ( 0.074 de
    // la braka akso, la dikfingra flanko ) trapikis la foliojn dum ĉiu paŝo. La
    // tubo mallongiĝis al la pojno (−0.4375, la foli-pintoj ĝis −0.5625), do la
    // manumo nun finiĝas SUPER la larĝa parto kaj la mankolo aperas nur sube.
    // La manumo restas MALVASTA ( 0.0547 ) — ĝi ĉirkaŭas la pojnon ( 0.033 … 0.047 )
    // kaj kaŝas la malferman buŝon de la tubo.
    manikaSupra,
    manikaMalsupra: kunfandiGeometriojn([ manikaMalsupra, manikaArtiko ]),
  };
  return figurajGeometrioj;
}

// harajGeometrioj — la kunigitaj har-geometrioj po stilo, konstruitaj unufoje.
// Ĉiu stilo iĝas UNU meshon — la ĉapo kaj la kurteno dividas la saman
// har-materialon, do ili povas kunfandiĝi sen perdi ion ( la kurteno ne havas
// UV-ojn, kio ne ĝenas, ĉar la har-materialo ne havas mapon ). Nekonata stilo
// uzas la mallongan ĉapon.
//     @param stilo ( Harstilo ) - La stilo por konstrui ( aŭ preni el la kaŝo ).
//     @returns geometrio ( THREE.BufferGeometry ) - La kunigita har-geometrio.
const HARO_Y = 0o155/0o100;   // 1.703125 — la centro de la har-ĉapo

// kreiHaranĈapon — La har-ĉapo. Kupolo super la kranio kun MALKONSTANTA rando —
// la haroj malsupreniras ĉe la nuko kaj la tempioj kaj altiĝas antaŭe, do la
// frunto videblas. La antaŭa versio estis premiita sfero kun horizontala rando,
// do la haro legiĝis kiel kasko ( aŭ kiel fungo kun la malnova radiuso 0.219 ).
// ⟨ Kial la rando sekvas la kranion 📃 ⟩ La rando malsupreniras malantaŭe je
// 0o11/0o5 radianoj de la poluso, kaj tie la sfera radiuso jam estus INTERNE de la
// kapo — la haro enirus la kranion. La radiuso de ĉiu punkto do estas la MAKSIMUMO
// de la sfera radiuso kaj la krania radiuso ĉe tiu alto ( plus eta spaco ), do la
// ĉapo povas malsupreniri tiom kiom la kapo permesas sen tranĉi en ĝin.
//     @returns geometrio ( THREE.BufferGeometry ) - La ĉapo, ĉe la kapo.
function kreiHaranĈapon(): THREE.BufferGeometry {
  const VICOJ = 0o14, KOLONOJ = 0o24;
  const DIKO_RANDO = 0o6/0o1000;    // 0.0117 — la har-dikeco ĉe la har-limo ( 6 / 512 )
  const DIKO_KRONO = 0o24/0o1000;   // 0.0390 — la har-dikeco ĉe la krono ( 20 / 512 )
  // ⟨ La frunta har-limo LEVIĜIS 📃 ⟩ — kun 1.625 la rando malsupreniris al la
  // mondo 1.615, nur 0.025 super la okuloj, do la brovoj ( vidu
  // kreiVizaĝajnStrikojn ) malaperis sub la hararo.
  // ⟨ La har-limo sekvas la brovojn 📃 ⟩ — la brovoj leviĝis kun la okuloj, do la
  // frunta rando ankaŭ leviĝis — alie la brovoj malaperus sub la fadenoj. Nun la
  // frunta rando sidas ĉe 1.375, do super ĝi staras iom pli da frunto ol la brovoj
  // postulas sed la frunto mem restas pli mallonga ol antaŭe ( la rando kaj la
  // brovoj leviĝis preskaŭ kune ).
  const FI_ANTAUX = 0o26/0o20;      // 1.375 rad — la frunta har-limo
  const FI_MALANTAUX = 0o21/0o10;   // 2.125 rad — la nuka har-limo
  // ⟨ La TEMPLOJ leviĝas 📃 ⟩ — la har-limo malleviĝas antaŭe ( la frunto ) kaj
  // malsupreniras malantaŭe ( la nuko ), sed la FLANKOJ devas resti pli alte ol
  // la mezo. Kiam la okuloj leviĝis, la flankaj fadenoj malsupreniris super ilin
  // kaj la eksteraj anguloj de la okuloj kaj la finoj de la brovoj malaperis sub
  // la hararon. Ĉi tiu levo malaperas ĉe la frunto kaj ĉe la nuko ( sin² ), do
  // tiuj du randoj ne ŝanĝiĝas — nur la temploj altiĝas.
  const TEMPIO = 0o20/0o100;        // 0.25 rad — kiom la temploj leviĝas
  const ONDO = 0o7/0o100;           // 0.109 rad — la profundo de la fadenaj loboj
  const KLUĈO = 0o1/0o20;           // 0.05 — la ondo de la har-dikeco ( la faskoj )
  const pozicioj: number[] = [], uvoj: number[] = [], indeksoj: number[] = [];
  for ( let v = 0; v <= VICOJ; v++ ) {
    const t = v / VICOJ;
    for ( let k = 0; k <= KOLONOJ; k++ ) {
      const ang = k / KOLONOJ * Math.PI * 0o2;
      // ⟨ La har-limo 📃 ⟩ — la latitudo de la rando por ĉi tiu azimuto ( 0
      // antaŭe, π malantaŭe ). Ĝi malleviĝas antaŭe super la okulojn ( la frunton
      // kovras FRINGO ) kaj malsupreniras ĉe la nuko.
      // ⟨ La ondo estas GLATA, ne PINTECA 📃 ⟩ — la kvar loboj de la har-limo
      // antaŭe venis el la ABSOLUTA valoro de la sinuso, kiu havas akrajn kuspojn:
      // la har-limo finiĝis per kvar PINTOJ kaj inter ili per profundaj V-fendoj,
      // do la frunto aspektis kiel dentoj aŭ kiel akra vidvina pinto. Nun la ondo
      // estas simpla kosinuso ( 1 − cos 5·ang ), kiu estas GLATA ĉie kaj havas
      // entjeran periodon ( la kudro malantaŭe restas senrompa ). La har-limo de
      // la haroj do finiĝas per mola, RONDA undeto anstataŭ per akraj dentoj.
      // ⟨ La har-limo RIPETAS la finon de la kurteno 📃 ⟩ — la longa hararo estas
      // DU partoj ( la ĉapo supre, la kurteno malsupre — vidu haranGeometrion ) kaj
      // la malsupra rando de la kurteno ondiĝas per KVIN faskoj, kun la plej
      // malalta fasko malantaŭe ( vidu la faskon en kreiHaranKurtenon ). La har-limo
      // havis KVAR lobojn, do la du partoj de la sama hararo legiĝis kiel du stiloj.
      // Nun ĝi havas kvin lobojn kaj ĝia plej profunda punkto ankaŭ sidas malantaŭe,
      // do la ĉapo portas la saman ritmon kiel la kurteno sub ĝi kaj la kurteno
      // legiĝas kiel la daŭrigo de la ĉapo.
      const fiMax = FI_ANTAUX
        + ( FI_MALANTAUX - FI_ANTAUX ) * ( 0o1 - Math.cos(ang) ) / 0o2
        + ONDO * ( 0o1 - Math.cos(ang * 0o5) ) * 0o1/0o2
        - TEMPIO * Math.sin(ang) * Math.sin(ang);
      const fi = t * fiMax;
      // ⟨ La haro estas SXELO sur la kranio 📃 ⟩ — la punktoj venas el sfero
      // centrita en la kapcentro kun radiuso KAPA_R plus la har-dikeco. Tiel la
      // haro neniam eniras la kapon kaj ĝia dikeco estas regata aparte de la
      // formo. La dikeco malkreskas al la rando, do la haro estas pli dika ĉe la
      // krono ( tie la haroj leviĝas ) kaj plata ĉe la har-limo.
      // ⟨ La faskoj 📃 ⟩ — la har-dikeco ankaŭ ondas ĉirkaŭ la kapo, do la hararo
      // legiĝas kiel pluraj faskoj anstataŭ kiel perfekta ŝelo. La ondo havas
      // entjeran periodon, do la kudro malantaŭe ne rompiĝas.
      // ⟨ La faskoj EŜAS tiujn de la kurteno 📃 ⟩ — la ĉapo mezuras sian angulon de
      // la FRONTO ( ang = 0 ) kaj la kurteno de la DORSO ( fi = 0 ), do la sama
      // kvin-loba ondo aperas ĉe la ĉapo kiel −cos 5·ang : la fasko de la ĉapo kaj
      // la fasko de la kurteno tiam sidas sur la sama meridiano kaj la haro legiĝas
      // kiel unu fasko, kiu daŭriĝas trans la kudro de la du partoj.
      const diko = ( DIKO_RANDO + ( DIKO_KRONO - DIKO_RANDO ) * ( 0o1 - t ) * ( 0o1 - t ) )
        * ( 0o1 - KLUĈO * Math.cos(ang * 0o5) );
      const R = KAPA_R + diko;
      const y = KAPA_Y + R * Math.cos(fi);
      const rTuta = R * Math.sin(fi);
      pozicioj.push(Math.sin(ang) * rTuta, y, Math.cos(ang) * rTuta);
      // La ĉapo uzas la SAMAN cilindran mapadon kiel la kurteno ( vidu haraU kaj
      // haraV ), do la tufo, kiu malsupreniras la ĉapon ĉe iu azimuto, daŭriĝas
      // sur la kurtenon ĉe la sama azimuto — sen salto en la larĝo nek en la fazo.
      uvoj.push(haraU(ang), haraV(y));
    }
  }
  for ( let v = 0; v < VICOJ; v++ ) {
    for ( let k = 0; k < KOLONOJ; k++ ) {
      const a = v * ( KOLONOJ + 0o1 ) + k, b = a + 0o1;
      const c = a + KOLONOJ + 0o1, d = c + 0o1;
      // La ventumilo montras EKSTEREN — la vicoj malsupreniras, do la ordo
      // inversiĝas rilate al la kurteno ( vidu kreiHaranKurtenon ).
      indeksoj.push(a, d, b, a, c, d);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

const harajGeometrioj = new Map<string, THREE.BufferGeometry>();
function haranGeometrion(stilo: Harstilo): THREE.BufferGeometry {
  const cacheita = harajGeometrioj.get(stilo.nomo);
  if ( cacheita ) return cacheita;
  const partoj: THREE.BufferGeometry[] = [];
  // ⟨ La ĉapo estas konko, ne kasko 📃 ⟩ — la radiuso estas 0.188 ( nur iomete
  // pli ol la kranio 0.172 ) kaj la premego 0.625, do la ĉapo sekvas la kranion
  // kaj finiĝas iomete super ĝi.
  partoj.push(kreiHaranĈapon());
  if ( stilo.nomo === "haroLonga" ) {
    // Pli granda ĉapo plus fleksita kurteno kiu ĉirkaŭas la dorson de la kapo
    // ĝis antaŭ la oreloj kaj falas ĝis la ŝultroj kun pinteca fringo.
    partoj.push(kreiHaranKurtenon());
  }
  const geometrio = kunfandiGeometriojn(partoj);
  harajGeometrioj.set(stilo.nomo, geometrio);
  return geometrio;
}

// konstruiFiguron — Konstruu NPC-figuron kun tavoligitaj vestoj, foli-manikoj
// kaj har-stiloj. Ĉiuj har-stiloj estas konstruitaj ( nur la elektita videbla ),
// por ke agordiHaron povu ŝanĝi la stilon poste sen rekonstruado.
//     @param o ( Vesto ) - La vesta objekto por koloroj.
//     @param haroKlavo ( string = "haroMalalta" ) - La ŝlosilo de la elektita
//         har-stilo ( sama kiel la nomo en HARSTILOJ ).
//     @param alto ( number = hazarda ) - La alta faktoro de la figuro. Sen la
//         argumento ĉiu figuro ricevas hazardan valoron en ± HALTO_GAMO, do la
//         homamaso ne estas egala; oni povas doni difinitan valoron por rolulo
//         kun fiksita alto ( aŭ por la ludanto, se ĝia alto gravas ).
export function konstruiFiguron(o: Vesto, haroKlavo = "haroMalalta",
  alto?: number): Figuro {
  const g = new THREE.Group();
  // ⟨ La alto VARIAS iomete 📏 ⟩ — la grupo SKALIĜAS per eta faktoro, do ĉiuj
  // partoj ( la korpo, la vestoj kaj ĉiuj pivot-grupoj ) konservas siajn rilatojn
  // kaj la marŝa animacio restas ĝusta — la turnoj de la animacio estas ANGULOJ,
  // kiuj ne dependas de la skalo, kaj la artikaj altroj ( KUBUTO_Y, la koksoj )
  // skalas kune kun la geometrio, do la mantelo kaj la manikoj ne disiĝas. La
  // origino de la grupo estas ĉe la PIEDOJ, do la figuro restas sur la grundo.
  // ⟨ Kial ne aparta geometrio 📃 ⟩ — skalo kostas nenion kaj la tuta figuro
  // ( inkluzive de la kaŝitaj variantoj de la vesto kaj de la haro ) sekvas ĝin
  // aŭtomate; aparta geometrio por ĉiu alto signifus rekonstrui la kanvasojn.
  const altaFaktoro = alto ?? ( 0o1 + ( Math.random() * 0o2 - 0o1 ) * HALTO_GAMO );
  g.scale.setScalar(altaFaktoro);
  const G = figurajGeometriojn();
  // La haŭto — UNU materialo por la kapo kaj la manoj. La okuloj havas sian
  // propran dividitan malhelan materialon ( VIZAĜO_M ), ĉar la har-koloro ne
  // rajtas tuŝi ilin — blonda hararo ne faru blondajn okulojn.
  const haŭto = new THREE.MeshStandardMaterial({ color: 0x605050, roughness: 0o55/0o100 });
  // La torso de la homa modelo — la brusto kaj la koksoj, kaŝitaj de la interna
  // ĉemizo ( kiu nun supreniras super la ŝultrojn — vidu kreiKorpanTorson ).
  const torso = new THREE.Mesh(G.korpo, haŭto);
  // La kapo jam portas la orelojn, la nazon kaj la kolon — la geometrio estas
  // kunfandita kaj sidas ĉe la gusta mondo-alto, do la mesho ne transformiĝas.
  const kapo = new THREE.Mesh(G.kapa, haŭto);
  // ⟨ Ĉiu figuro ricevas propran okulan paletron 📃 ⟩ — la materialoj estas nur
  // kvar ( vidu okulaMaterialo ), do la homamaso ne kostas pli da teksturoj.
  const vizaĝo = new THREE.Mesh(G.vizaĝo,
    okulaMaterialo(OKULAJ_ELEKTOJ[Math.floor(Math.random() * OKULAJ_ELEKTOJ.length)]));

  // La haro-materialo venas el la kaŝo ( vidu haraMaterialo supre ). La koloro
  // miksiĝas hazarde inter malhelbruna kaj ruĝeta malhelbruna por ĉiu NPC, kaj
  // la materialo mem portas la fadenan teksajxon kaj la malvarmetan brilon.
  harKoloro.lerpColors(harKoloroA, harKoloroB, Math.random());
  const haroM = haraMaterialo(harKoloro.getHex());
  // ⟨ La brovoj kaj la okulharoj portas la HARAN materialon 📃 ⟩ — ili estas
  // kolorigitaj kiel la hararo de la figuro ( kaj agordiHaranKoloron tuŝas ilin
  // kune kun la haroj ). Ili sidas en la kapo-grupo, do ili turniĝas kun la kapo,
  // kaj ili apartenas al la HOMA modelo, do kaŝi la vestojn ne tuŝas ilin.
  const strikoj = new THREE.Mesh(G.vizaĝajStrikoj, haroM);
  strikoj.position.y = -KOLO_Y;
  // ⟨ La palpebroj 📃 ⟩ — du haŭtaj kupoloj super la okuloj ( vidu kreiPalpebrojn ).
  // Ili portas la SAMAN haŭton kiel la kapo, do malfermitaj ili preskaŭ malaperas
  // kontraŭ la vizaĝo — nur ilia antaŭeno super la haŭto montriĝas, kaj tio legiĝas
  // kiel la supra palpebro de la okulo. La mesho GRANDIĜAS malsupren dum la
  // palpebrumo ( vidu marŝSvingon ), do nur ĝia skalo ŝanĝiĝas.
  const palpebroj = new THREE.Mesh(G.palpebroj, haŭto);
  palpebroj.position.y = palpebraPivoto();

  // La vestaj materialoj venas el la komuna cacheo — la sama vesto dividas ilin
  // inter ĉiuj figuroj ( vidu vestajMaterialoj supre ).
  const { internoM, eksteraM, pantalonoM, manikoM } = vestajMaterialoj(o);
  // La botoj kaj la plandoj ankaŭ venas el komuna kaŝo ( vidu ledajMaterialoj ).
  const { botoM, akcentaM } = ledajMaterialoj(o);

  // Interna ĉemizo — iras de la tuko ĝis la kolumo kaj montriĝas tra la antaŭa
  // malfermaĵo de la robo kaj tra ĝiaj eltranĉoj. La malsupro enŝoviĝas iomete
  // sub la roban suban randon ( ROB_Y_MALSUPRO ), por ke neniu koincida rando
  // flagru, kaj la tuta ĉemizo restas INTERNE de la robo. La geometrio jam sidas
  // ĉe la mondaj unuoj kaj portas sian propran elipsan sekcon ( vidu
  // kreiInternanSxelon ), do la mesho nur kompensiĝas per la ŝovo de la pivota
  // grupo — la sama konstruo kiel la robo.
  const interno = new THREE.Mesh(G.interna, internoM);
  interno.position.y = -INTERNO_PIVOTO_Y;
  // Ekstera robo — la malfermita mantelo ( vidu kreiMalfermanRobonSxelon ). La
  // geometrio jam sidas ĉe la mondaj unuoj, do la mesho nur kompensiĝas per la
  // ŝovo de la pivota grupo.
  const ekstera = new THREE.Mesh(G.roba, eksteraM);
  ekstera.position.y = -SASA_Y;
  // ⟨ La tuko svingiĝas ĉe la zono 📃 ⟩ — la robo kaj la interna ĉemizo sidas en
  // komuna grupo kies pivoto estas la ZONO ( ne la grundo ). Vera ŝtofo pendas de
  // la talio kaj svingiĝas malsupre; turno ĉirkaŭ la zono do svingas la tukon
  // ĝuste. La grupo tenas ambaŭ tavolojn KUNE, ĉar ili estas tavoligitaj unu
  // super la alia kaj ne rajtas disiĝi.
  // ⟨ La ĉemizo pendas de la ŜULTROJ 📃 ⟩ — la interna ĉemizo havas sian propran
  // grupon ene de la robo-grupo, sed ĝia pivoto NE estas la zono — ĝi sidas sur la
  // ŝultra linio ( vidu INTERNO_PIVOTO_Y ). La mesho do kompensas per
  // −INTERNO_PIVOTO_Y anstataŭ per −SASA_Y. Turno de la ĉemizo ĉirkaŭ la ŝultroj
  // svingas la tukon 0.84 kaj preskaŭ ne movas la kolumon nek la ŝultrojn — ĝuste
  // kiel ĉemizo, kiu pendas de la ŝultroj. La turnoj ALDONIĜAS al tiuj de la
  // mantelo, do la ĉemizo povas sekvi la paŝon memstare ( vidu marŝSvingon ).
  const roboGrupo = new THREE.Group();
  roboGrupo.position.y = SASA_Y;
  const internoGrupo = new THREE.Group();
  internoGrupo.position.y = INTERNO_PIVOTO_Y - SASA_Y;
  internoGrupo.add(interno);
  roboGrupo.add(internoGrupo, ekstera);

  // ⟨ La kruroj 📃 ⟩ — ĉiu kruro ( pantalono + boto + plando ) sidas en sia
  // propra pivot-grupo ĉe la kokso, por ke la kruroj povu svingiĝi antaŭen kaj
  // malantaŭen dum marŝado. La pivoto estas la x-akso tra la kokso-alto — la
  // sama linio por ambaŭ kruroj, do la grupo restas ĉe x = 0 kaj la partoj
  // portas la ± deklino.
  // ⟨ La pivoto sidas ĉe la KOKSO, ne ĉe la genuo 📃 ⟩ — antaŭe la kruro turniĝis
  // ĉirkaŭ 0.3125 ( la genuo ), do la tuta femuro svingiĝis tiom kiom la piedo kaj
  // la supra parto de la kruro — kiu sidas INTERNE de la ĉemizo — eliris tra la
  // ŝtofo dum ĉiu paŝo ( videbla haŭta makulo ĉe la kokso ). Nun la pivoto estas
  // la kokso ( 0.5625 ) kaj nur la suba kruro svingiĝas, kiel vera marŝo. La kruraj
  // geometrioj mezuriĝas de la genuo, do ĉiu gefilo portas genuoKompenso.
  // ⟨ La pivoto estas la KOKSO, la genuo sidas 0.4297 sub ĝi 📃 ⟩ — la kruraj
  // kaj pantalonaj geometrioj mezuriĝas de la GENUO, do ĉiu gefilo portas la
  // kompenson −0.4297 ( la kokso 0.9297 − la genuo 0.5 ).
  const koksoY = 0o167/0o200;                    // 0.9297 — la kokso ( la pivoto )
  const genuoKompenso = -0o67/0o200;             // −0.4297 — la genuo sub la kokso
  const kruroL = new THREE.Group(); kruroL.position.y = koksoY;
  const kruroR = new THREE.Group(); kruroR.position.y = koksoY;
  // ⟨ La kruroj estas pli proksime al la mezo 📃 ⟩ — antaŭe ± 0.1875. Kun la
  // pantalona radiuso 0.156 la kruroj tiam atingis ± 0.34, do la tuta kruro
  // elstaris TRA la robo ( radiuso 0.234 ĉe tiu alto ) kaj la figuro aspektis
  // kiel portanta mallongajn pantalonojn SUPER la ĉemizo. La kruroj sidas je
  // ± 0.075 kaj la pantalona radiuso ( 0.141 ĉe la kokso ) nun restas INTERNE.
  // ⟨ La pantalono ankaŭ venas en DU partojn 📃 ⟩ — la supra parto sidas ĉi tie ( la
  // koksa grupo ) kaj la malsupra sidas en la genua grupo ( vidu sube ). La du
  // partoj kunhavas la genuan ringon, do la ŝtofo ne havas fendon.
  const pL = new THREE.Mesh(G.pantalonaSupra, pantalonoM); pL.position.set(-0o3/0o40, genuoKompenso, 0);
  const pR = new THREE.Mesh(G.pantalonaSupra, pantalonoM); pR.position.set(0o3/0o40, genuoKompenso, 0);
  // ⟨ La homaj kruroj 📃 ⟩ — sub la pantalono, en la sama pivota grupo. Ili
  // portas la saman haŭton kiel la kapo kaj la manoj, do la homa modelo havas 
  // krurojn ankaŭ kiam la vesto kaŝiĝas. Ili ricevas castShadow = false malsupre,
  // ĉar ili estas tute kaŝitaj de la vesto — la ombra pasumo ne pagas por ili.
  const korpoL = new THREE.Mesh(G.kruroSupra, haŭto); korpoL.position.set(-0o3/0o40, genuoKompenso, 0);
  const korpoR = new THREE.Mesh(G.kruroSupra, haŭto); korpoR.position.set(0o3/0o40, genuoKompenso, 0);
  // ⟨ La GENUO estas aparta grupo 📃 ⟩ — la pivoto sidas ĉe la genuo ( 0.4297 sub
  // la kokso ), kaj la grupo portas la tibion, la pantalonon sub la genuo kaj la
  // tutan ŝuon. Dum la paŝo ĝi turniĝas antaŭen ( la kalkano leviĝas malantaŭen ),
  // do la kruro fleksiĝas kiel vera kruro anstataŭ svingiĝi kiel rigida stango.
  // ⟨ La malsupraj partoj sidas ĉe la NULO 📃 ⟩ — iliaj geometrioj mezuriĝas de la
  // genuo, do la meshoj mem ne portas kompenson; la ŝuo portas la maleol-kompenSON
  // ( vidu MALEOLO_Y ) ĉar la bota geometrio mezuriĝas de la genuo.
  const genuoL = new THREE.Group(); genuoL.position.y = genuoKompenso;
  const genuoR = new THREE.Group(); genuoR.position.y = genuoKompenso;
  const pSubL = new THREE.Mesh(G.pantalonaMalsupra, pantalonoM);
  const pSubR = new THREE.Mesh(G.pantalonaMalsupra, pantalonoM);
  const kSubL = new THREE.Mesh(G.kruroMalsupra, haŭto);
  const kSubR = new THREE.Mesh(G.kruroMalsupra, haŭto);
  pSubL.position.set(-0o3/0o40, 0, 0); pSubR.position.set(0o3/0o40, 0, 0);
  kSubL.position.set(-0o3/0o40, 0, 0); kSubR.position.set(0o3/0o40, 0, 0);
  // ⟨ La homaj piedoj sidas en la ŝuo-grupoj 📃 ⟩ — la kruro finiĝas ĉe la
  // maleolo, kaj la piedo estas aparta mesho en la sama grupo kiel la boto ( kun
  // la sama kompenso -MALEOLO_Y, ĉar la grupo sidas ĉe la maleolo ). Dum la paŝo
  // la boto kaj la nuda piedo ruliĝas KUNE, do la haŭto neniam trapikas la ledon.
  const korpaPiedoL = new THREE.Mesh(G.korpaPiedo, haŭto);
  const korpaPiedoR = new THREE.Mesh(G.korpaPiedo, haŭto);
  korpaPiedoL.position.set(-0o3/0o40, -MALEOLO_Y, 0);
  korpaPiedoR.position.set(0o3/0o40, -MALEOLO_Y, 0);
  // ⟨ La maleolo 📃 ⟩ — la piedo ( la boto kaj la plando ) sidas en sia propra
  // grupo kies pivoto estas la MALEOLO, ne la kokso. Dum marŝado la piedo plantas
  // sin sur la tero kaj ruliĝas de la kalkano al la pinto; sen la aparta pivoto la
  // tuta kruro svingiĝus kiel rigida stango kaj la paŝoj legiĝus kiel glitado.
  // La tuta ŝuo estas UNU geometrio ( la ŝtipo kaj la piedo dividas la ledon ) kaj
  // la plando estas la dua, do ĉiu piedo kostas du desegnajn alvokojn.
  // ⟨ La maleola grupo sidas en la GENUA grupo 📃 ⟩ — antaŭe ĝi pendis de la
  // koksa grupo; nun la genuo estas inter ili, do la ŝuo sekvas la tibion kiam la
  // genuo fleksiĝas. La kompenso restas MALEOLO_Y, ĉar la geometrio de la boto
  // mezuriĝas de la genuo.
  const sxuoL = new THREE.Group(); sxuoL.position.y = MALEOLO_Y;
  const sxuoR = new THREE.Group(); sxuoR.position.y = MALEOLO_Y;
  const bL = new THREE.Mesh(G.boto, botoM);
  const bR = new THREE.Mesh(G.boto, botoM);
  const akcL = new THREE.Mesh(G.akcenta, akcentaM);
  const akcR = new THREE.Mesh(G.akcenta, akcentaM);
  bL.position.set(-0o3/0o40, -MALEOLO_Y, 0);
  bR.position.set(0o3/0o40, -MALEOLO_Y, 0);
  akcL.position.set(-0o3/0o40, -MALEOLO_Y, 0);
  akcR.position.set(0o3/0o40, -MALEOLO_Y, 0);
  sxuoL.add(bL, akcL, korpaPiedoL);
  sxuoR.add(bR, akcR, korpaPiedoR);
  genuoL.add(pSubL, kSubL, sxuoL);
  genuoR.add(pSubR, kSubR, sxuoR);
  kruroL.add(pL, korpoL, genuoL);
  kruroR.add(pR, korpoR, genuoR);

  // ⟨ La brakoj 📃 ⟩ — ĉiu maniko sidas en pivot-grupo ĉe la ŝultro, por ke la
  // brakoj povu svingiĝi kontraŭfaze al la kruroj dum marŝado. La maniko kaj la
  // mano sidas en komunaj subgrupoj, ĉar ili devas kliniĝi KUNE — la klino
  // ( rotation.z ) movas la pojnon 0o1/0o10 da mondunuoj flanken, kaj mano kiu
  // restus malantaŭe videble disiĝus de la tuko.
  // ⟨ La pivoto sidas ĉe la ŝultro-fino 📃 ⟩ — antaŭe la pivoto estis ± 0.156 dum
  // la maniko estis 0.102 dika, do la tubo kovris la duonon de la brusto kaj la
  // brako legiĝis kiel parto de la torso. Nun la maniko estas maldika ( 0.070 )
  // kaj la pivoto estas ± 0.195, do la deltoido atingas 0.258 kaj la maniko
  // eliras el sub la ĉemiza ŝultro-kovrilo ( 0.195 ) je 0.07 — la brako
  // montriĝas ĉe la flanko de la mantelo, kiel vera brako. La INTERNA rando de la
  // deltoido ( 0.133 ) restas ene de la akromio de la torso ( 0.152 ), do la du
  // formoj kunfandiĝas ĉe la ŝultro sen fendo.
  // ⟨ La brakoj sidas PLI MALPROKSIME 📃 ⟩ — mezurite sur la realaj meshoj, la
  // maniko ( 0.0703 duonlarĝa, centro ± 0.195 ) atingis 0.286 dum la robo atingas
  // 0.263 — nur 0.023 da marĝeno, kaj ĉar la robo RULIĜAS ĉirkaŭ la zono dum ĉiu
  // paŝo ( ± 0.023, vidu marŝSwingon ), la maniko duontempe malaperis malantaŭ
  // ĝi. Nun la pivoto estas ± 0.2109, do la maniko atingas 0.301 kaj la marĝeno
  // estas 0.038 — la manikoj restas videblaj dum la tuta paŝo.
  // ⟨ La pivoto iris PLI EKSTEREN 📃 ⟩ — kun la mallarĝigita mantelo ( 0.207 …
  // 0.227 en la braka regiono ) la pivoto ± 0.2188 lasas la manikon elstari
  // 0.078 … 0.10 — la brako legiĝas kiel brako. La INTERNA rando de la maniko
  // ( 0.148 ) restas ene de la ĉemiza ŝultro-kovrilo ( 0.1875 ), do la tubo
  // ankoraŭ eliras el sub la ŝtofo sen fendo.
  const brakoL = new THREE.Group(); brakoL.position.set(-0o70/0o400, 0o265/0o200, 0);
  const brakoR = new THREE.Group(); brakoR.position.set(0o70/0o400, 0o265/0o200, 0);
  const manikoj: THREE.Mesh[] = [];
  const manikajMeshoj: THREE.Mesh[] = [];
  const manoj: THREE.Mesh[] = [];
  const ungoj: THREE.Mesh[] = [];
  const brakoj: THREE.Mesh[] = [];
  const kubutajGrupoj: THREE.Group[] = [];
  for ( const [ brako, dir ] of [ [ brakoL, -0o1 ], [ brakoR, 0o1 ] ] as [ THREE.Group, number ][] ) {
    const klino = new THREE.Group();
    // ⟨ La brako malfermiĝas iomete 📃 ⟩ — la klino 0.045 ( 2.6° ) movas la
    // manikon 0.027 flanken ĉe la pojno. Vera homo staranta tenas la brakojn
    // iomete disigitaj ( la kubutoj ne tuŝas la talion ), kaj ĉi tie ĝi ankaŭ
    // elportas la manumon el la mantelo: la mantelo estas 0.242 ĉe la manuma
    // alto dum la manumo ( 0.1953 + 0.027 + 0.058 ) atingas 0.28.
    klino.rotation.z = dir * 0o27/0o1000;   // 23 / 512 = 0.0449
    const maniko = new THREE.Mesh(G.manikaSupra, manikoM);
    const manikoSub = new THREE.Mesh(G.manikaMalsupra, manikoM);
    const haŭtaBrakо = new THREE.Mesh(G.brakoSupra, haŭto);
    const haŭtaBrakоSub = new THREE.Mesh(G.brakoMalsupra, haŭto);
    const mano = new THREE.Mesh(G.mano, haŭto);
    // ⟨ Ankaŭ la BRAKO speguliĝas 📃 ⟩ — la braka geometrio ne estas simetria
    // rilate al x ( la supraj ringoj ŝoviĝas al la torso por ke la deltoido
    // kunfandiĝu kun la ŝultro ), do ĝi turnus sin al la SAMA flanko ĉe ambaŭ
    // brakoj kaj unu el la du flosus eksteren. La sama negativa skalado kiel la
    // mano spegulas ĝin.
    haŭtaBrakо.scale.x = dir;
    haŭtaBrakоSub.scale.x = dir;
    // ⟨ La dikfingro speguliĝas 📃 ⟩ — la du manoj dividas la saman geometrion, kaj
    // la dikfingro sidas ĉe unu rando de la manplato. Negativa skalado estas afina
    // transformo kun negativa determinanto — three.js inversigas la ventumilon
    // mem, do la normaloj restas eksteren.
    mano.scale.x = dir;
    // ⟨ La manplato rigardas la KOKSON 📃 ⟩ — la geometrio estas plata tabulo
    // kies larĝo iras laŭ x, do sen turno la manplato rigardus antaŭen ( la
    // anatomia pozicio de la brako, kiun staranta homo NE tenas ) kaj la
    // dikfingro elstarus FLANKEN. Turno −90° ĉirkaŭ y ( dir-obla, ĉar la
    // spegulado okazas antaŭe ) metas la manplaton kontraŭ la femuron kaj la
    // dikfingron antaŭen — la natura staranta mano de vera homo.
    mano.rotation.y = -dir * Math.PI / 0o2;
    // ⟨ La ungoj estas GEFILOJ de la mano 📃 ⟩ — ilia geometrio mezuriĝas en la
    // sama loka kadro kiel la manplato, do la spegulado, la turno kaj la alto de la
    // mano validas por ili sen pliaj kalkuloj, kaj kiam la vesto kaŝas la manon la
    // ungoj malaperas kun ĝi ( ili estas ankaŭ en la listo de la homa modelo ).
    const ungo = new THREE.Mesh(G.ungoj, ungaMaterialo());
    ungo.castShadow = false;
    mano.add(ungo);
    ungoj.push(ungo);
    manoj.push(mano);
    brakoj.push(haŭtaBrakо, haŭtaBrakоSub);
    // ⟨ La mano videblas sub la manumo 📃 ⟩ — la manika bazo estas −0.5 (± 0.0625
    // de la folioj), kaj la fingropintoj estas ĉe −0.73, do pli ol duono de la
    // mano elstaras el la manumo. La supra ringo de la manplato (+0.055) restas
    // ene de la maniko kaj de la antaŭbrako, do la formoj kunfandiĝas sen kudro.
    // ⟨ La KUBUTO estas aparta grupo 📃 ⟩ — la sama konstruo kiel la genuo: la
    // pivoto sidas ĉe la kubuto ( KUBUTO_Y sub la ŝultro ), kaj la grupo portas la
    // antaŭbrakon, la manikon sub la kubuto kaj la manon. Dum la paŝo ĝi turniĝas
    // antaŭen, do la brako mole fleksiĝas anstataŭ pendi kiel stango.
    // ⟨ La antaŭbrako kaj la maniko sidas ĉe la NULO 📃 ⟩ — iliaj geometrioj
    // mezuriĝas de la kubuto ( la brako kaj la maniko estas ŝovitaj dum la
    // konstruo, vidu kreiKorpanBrakon kaj figurajGeometriojn ), do la du meshoj
    // ne portas kompenson. Nur la MANO portas ĝin — ĝia geometrio ankoraŭ
    // mezuriĝas de la ŝultro, ĉar la manplato estas aparta geometrio.
    const kubuto = new THREE.Group();
    kubuto.position.y = KUBUTO_Y;
    mano.position.y = -0o36/0o64 - KUBUTO_Y;   // la manplato, sub la pojno
    kubuto.add(haŭtaBrakоSub, manikoSub, mano);
    kubutajGrupoj.push(kubuto);
    klino.add(haŭtaBrakо, maniko, kubuto);
    manikoj.push(maniko);
    manikajMeshoj.push(maniko, manikoSub);
    brako.add(klino);
  }

  // ⟨ Har-stiloj 📃 ⟩
  // Ĉiu stilo estas aparta mesho ( nur la elektita videbla ), por ke
  // agordiHaranStilon povu ŝanĝi la stilon poste sen rekonstrui la geometriojn.
  // La stiloj venas el HARSTILOJ ( la sama listo kiel la vestara UI ), do la
  // ŝlosiloj neniam povas disiĝi. Nekonata ŝlosilo falas reen al la mallonga.
  const haroMeshoj = new Map<string, THREE.Mesh>();
  for ( const stilo of HARSTILOJ ) haroMeshoj.set(stilo.nomo, new THREE.Mesh(haranGeometrion(stilo), haroM));
  const aktivaHaro = haroMeshoj.has(haroKlavo) ? haroKlavo : "haroMalalta";

  // ⟨ La kapo bobas ĉe la kolo 📃 ⟩ — la kapo, la vizaĝo kaj la haroj sidas en
  // komuna grupo kies pivoto estas la kolo. Dum marŝado la kapo etete kliniĝas
  // kontraŭ la paŝoj, kaj la haroj sekvas ĝin — sen la grupo la kapo estus
  // rigida parto de la korpo.
  const kapoGrupo = new THREE.Group();
  kapoGrupo.position.y = KOLO_Y;
  kapo.position.y = -KOLO_Y;
  vizaĝo.position.y = -KOLO_Y;
  kapoGrupo.add(kapo, vizaĝo, strikoj, palpebroj);
  // ⟨ La haroj pendas de la krono 📃 ⟩ — la haroj ricevas sian propran grupon
  // kies pivoto estas la krono ( super la kapo, iomete malantaŭe ). La kapo portas
  // la harojn, sed la haroj ankoraŭ malfruas kontraŭ la kapo — kiam la kapo kli-
  // niĝas aŭ turniĝas, la hararo svingiĝas poste, kaj la longa kurteno balanciĝas
  // dum la paŝoj. Sen la grupo la haroj estus velditaj al la kranio.
  const haroGrupo = new THREE.Group();
  haroGrupo.position.set(0, HARO_Y - KOLO_Y, -0o3/0o40);
  kapoGrupo.add(haroGrupo);
  for ( const [ klavo, mesho ] of haroMeshoj ) {
    mesho.visible = klavo === aktivaHaro;
    mesho.position.set(0, -HARO_Y, 0o3/0o40);
    haroGrupo.add(mesho);
  }

  // ⟨ La torso turniĝas ĉe la zono 📃 ⟩ — la robo, la kapo kaj la brakoj sidas en
  // komuna grupo kies pivoto estas la ZONO. Dum marŝado la ŝultroj turniĝas
  // kontraŭ la koksoj ( la sama kontraŭa ritmo kiel la brakoj kaj la kruroj ) kaj
  // la tuta supra korpo kliniĝas iomete antaŭen — la sama kurbiĝo kiel vera
  // marŝanto. La vestoj sekvas la torso-n turnon, ĉar ili estas ĝiaj gefiloj.
  // La gefiloj konservas siajn mondajn poziciojn per la subtraho de la zono.
  const torsoGrupo = new THREE.Group();
  torsoGrupo.position.y = SASA_Y;
  roboGrupo.position.y = 0;
  torso.position.y = -SASA_Y;
  kapoGrupo.position.y = KOLO_Y - SASA_Y;
  brakoL.position.y = 0o133/0o100 - SASA_Y;
  brakoR.position.y = 0o133/0o100 - SASA_Y;
  torsoGrupo.add(roboGrupo, torso, kapoGrupo, brakoL, brakoR);

  // ⟨ La du modeloj 📃 ⟩ — ĉiu mesho apartenas al la HOMA modelo aŭ al la
  // VESTA modelo. La du listoj estas la sama apartigo en datumoj ( userData.speco )
  // kaj en la interfaco ( fig.korpoj / fig.vestoj ), do ilo aŭ personigo povas
  // kaŝi, anstataŭi aŭ kolorigi unu modelon sen tuŝi la alian — la figuron oni ne
  // devas rekonsrui por tio.
  const korpoj: THREE.Mesh[] = [ kapo, vizaĝo, strikoj, palpebroj, torso, korpoL, korpoR,
    kSubL, kSubR, korpaPiedoL, korpaPiedoR, ...brakoj, manoj[0], manoj[1], ...ungoj,
    ...haroMeshoj.values() ];
  const vestoj: THREE.Mesh[] = [ interno, ekstera, pL, pR, pSubL, pSubR,
    bL, bR, akcL, akcR, ...manikajMeshoj ];
  for ( const m of korpoj ) m.userData.speco = "korpo";
  for ( const m of vestoj ) m.userData.speco = "vesto";

  g.add(torsoGrupo, kruroL, kruroR);
  g.traverse(m => { if ( ( m as THREE.Mesh ).isMesh ) (m as THREE.Mesh).castShadow = true; });
  // ⟨ La kaŝitaj partoj ne ombras 📃 ⟩ — la homa torso kaj la homaj kruroj sidas
  // tute sub la vesto, do ilia ombro estus kaŝita de la vesto mem. La ombra pasumo
  // ( la dua bildigo de la mondo ) ne pagu por ili.
  torso.castShadow = false;
  korpoL.castShadow = false;
  korpoR.castShadow = false;
  kSubL.castShadow = false;
  kSubR.castShadow = false;
  korpaPiedoL.castShadow = false;
  korpaPiedoR.castShadow = false;
  for ( const b of brakoj ) b.castShadow = false;
  manoj[0].castShadow = false;
  manoj[1].castShadow = false;
  for ( const ungo of ungoj ) ungo.castShadow = false;

  const fig: Figuro = {
    group: g,
    alto: altaFaktoro,
    hejmo: new THREE.Vector3(),
    celo: new THREE.Vector3(),
    atendo: 0, rapido: 0o63/0o100,
    marsoFazo: Math.random() * Math.PI * 0o2,
    movoFaktoro: 0,
    palpebraFazo: Math.random() * PALPEBRA_INTERVALO,
    palpebroj,
    kruroj: [ kruroL, kruroR ],
    brakoj: [ brakoL, brakoR ],
    genuoj: [ genuoL, genuoR ],
    kubutoj: [ kubutajGrupoj[0], kubutajGrupoj[1] ],
    roboGrupo,
    kapoGrupo,
    torsoGrupo,
    sxuoj: [ sxuoL, sxuoR ],
    haroGrupo,
    manikoj,
    internoGrupo,
    korpoj,
    vestoj,
    agordiVeston(nova: Vesto) {
      // La vestaj materialoj estas KOMUNAJ ( cacheitaj po vesto kaj dividitaj
      // inter ĉiuj figuroj ), do ili NE mutacieblas ĉi tie — alie ĉiu figuro
      // kun la sama vesto ŝanĝiĝus kune. Anstataŭe la MESH-OJ de ĉi tiu figuro
      // prenas la materialojn de la nova vesto el la cacheo ( nur referoj;
      // neniu kanvaso repentiĝas, neniu needsUpdate sur la teksturoj ).
      const novaVesta = vestajMaterialoj(nova);
      interno.material = novaVesta.internoM;
      ekstera.material = novaVesta.eksteraM;
      pL.material = novaVesta.pantalonoM;
      pR.material = novaVesta.pantalonoM;
      for ( const maniko of manikajMeshoj ) maniko.material = novaVesta.manikoM;
      // Same por la ledo — la materialoj estas kaŝmemoritaj po ( botoj, akcenta ),
      // do la ŝuoj nur prenas la materialojn de la nova vesto.
      const novaLedo = ledajMaterialoj(nova);
      bL.material = novaLedo.botoM; bR.material = novaLedo.botoM;
      akcL.material = novaLedo.akcentaM; akcR.material = novaLedo.akcentaM;
    },
    agordiHaranStilon(stilo: Harstilo) {
      const aktiva = haroMeshoj.has(stilo.nomo) ? stilo.nomo : "haroMalalta";
      for ( const [ klavo, mesho ] of haroMeshoj ) mesho.visible = klavo === aktiva;
    },
    agordiHaranKoloron(koloro: number) {
      // La haro-materialo estas kaŝmemorita po koloro, do ĝi NE mutacieblas ĉi
      // tie — alie ĉiu figuro kun la sama har-koloro ŝanĝiĝus kune. La meshoj
      // nur prenas la materialon de la nova koloro el la kaŝo.
      const nova = haraMaterialo(koloro);
      for ( const mesho of haroMeshoj.values() ) mesho.material = nova;
      // ⟨ La brovoj kaj la okulharoj SEKVE ŝanĝiĝas 📃 ⟩ — la strioj portas la
      // haran materialon, do sen ĉi tiu linio ili restus ĉe la koloro de la
      // konstruo dum la hararo alprenus la novan — la vizaĝo kaj la kapo havus
      // malsamajn kolorojn. La tuta kialo por konstrui la striojn kiel geometrion
      // ( anstataŭ pentri ilin en la vizaĝan kanvon ) estas ĝuste ke ili povu
      // sekvi la har-koloron.
      strikoj.material = nova;
    },
  };
  return fig;
}

// gxisdatigiNpc — Gxisdatigu NPC-pozicion, promenadon kaj ritmon cxiun kadron.
// Dum la figuro moviĝas, la kruroj svingiĝas kontraŭfaze ĉirkaŭ la koksoj kaj
// la brakoj kontraŭe al la samflanka kruro; starante, la brakoj nur balanciĝas
// iomete. Transiroj inter stari kaj marŝi estas glataj ( movoFaktoro ).
//     @param fig ( Figuro ) - La NPC-figuro por animacii.
//     @param deltaTempo ( number ) - Delta tempo en la unuo de la retumila
//         tempigilo ( vidu src/unuoj.ts por la konverto al He ).
//     @param t ( number ) - Malsupra tempo por oscedoj.
//     @param alteco ( funkcio ) - Tera alta funkcio por sekvi la terenon.
//     @param suprajxo ( funkcio ) - La piedebla supraĵo ( la vojoj, dokoj ) —
//         plena ol la tereno. La NPC-oj sekvas ĝin, do ili paŝas SUR la
//         pavimajn vojojn anstataŭ trairi ilin kiel la kruda tero sube.
// marŝSvingo — La komuna marŝa ritmo de ĉiuj figuroj ( ludanto, foraj ludantoj,
// NPC-oj ) — kontraŭfazaj kruroj kaj brakoj plus la eta paŝa bobado. La sama
// ritmo kiel la fotila bobado; movo = 0 donas la silentan sidan/sinkan pozon.
// ⟨ La ŝtofo sekvas la korpon 📃 ⟩ Nun la VESTO ankaŭ animaciiĝas, ne nur la
// membroj. La robo kaj la interna ĉemizo pendas de la zono, do ili svingiĝas
// ĉirkaŭ ĝi — flanken je la paŝa ofteco ( la koksoj alternas ) kaj
// antaŭen-malantaŭen je DUOBLA ofteco ( la genuoj puŝas la tukon dufoje po
// paŝciklo ). La manikoj malfruas kontraŭ siaj brakoj per proksimume kvarono de
// fazo, la kapo bobas duoble, kaj la haroj sekvas la kapon.
// ⟨ Kial la FAZO 📃 ⟩ La funkcio antaŭe ricevis sin(fazo). Malfruo ne esprimas
// per sola sinuso — ĝi bezonas la kosenon, kaj cos = ±√(1−sin²) havas du
// solvojn. La fazo mem do estas la parametro, kaj la sinuso kaj la koseno
// kalkuliĝas ĉi tie.
//     @param fig ( Pick<Figuro, ...> ) - La figuro por animacii.
//     @param fazo ( number ) - La marŝa fazo en radianoj ( ĉiu figuro havas
//         propran ekvaloron, do la homamaso ne paŝas unisone ).
//     @param movo ( number ) - 0 = staras, 1 = marŝas plenrapide.
export function marŝSvingo(
  fig: Pick<Figuro, "group" | "kruroj" | "brakoj" | "genuoj" | "kubutoj"
    | "roboGrupo" | "kapoGrupo" | "internoGrupo"
    | "torsoGrupo" | "sxuoj" | "haroGrupo" | "manikoj" | "palpebroj" | "palpebraFazo">,
  fazo: number, movo: number, deltaTempo = 0o1/0o60
): void {
  const paso = Math.sin(fazo);
  const duobla = Math.sin(fazo * 0o2);
  // ⟨ La kruroj 📃 ⟩ — la kontraŭfaza svingo ĉirkaŭ la koksoj. Pozitiva turno
  // ĉirkaŭ x movas la piedon MALANTAŬEN, do la maldekstra kruro (-sin) antaŭiĝas
  // kiam sin(fazo) = +1.
  // ⟨ La paŝo restas la sama, kvankam la kruroj plilongis 📃 ⟩ — la pivoto
  // supreniris de 0.5625 al 0.9297, do la sama angulo farus 1.65-oble pli longan
  // paŝon. La amplitudo malgrandiĝis de 0.3 al 0.1875, do la piedo svingiĝas la
  // saman distancon kiel antaŭe ( 0.9297 × sin 0.1875 ≈ 0.5625 × sin 0.3 ).
  const svingoKruro = 0o3/0o20 * movo * paso;
  fig.kruroj[0].rotation.x = -svingoKruro;
  fig.kruroj[1].rotation.x = svingoKruro;
  // ⟨ La GENUOJ 📃 ⟩ — la genuo fleksiĝas plej multe tuj post kiam la piedo
  // forlasas la teron ( la kalkano leviĝas malantaŭen ) kaj rektiĝas antaŭ la
  // sekva surmeto. La flekso sekvas la FAZON, ne la angulon de la kokso — kiam la
  // kruro trapasas la korpon moviĝante antaŭen ( sin( p ) tra nulo kun pozitiva
  // deklivo ) la genuo jam rektiĝis. Pozitiva turno movas la piedon malantaŭen, do
  // la flekso estas pozitiva kaj ĝia pinto sidas iomete post la malantaŭa
  // ekstremaĵo de la kruro ( sin( p ) = −1 ).
  // ⟨ La baza flekso 📃 ⟩ — vera genuo neniam tute rektiĝas dum marŝo, do la
  // figuro tenas 0.05 da flekso ankaŭ meze de la paŝo; sen ĝi la kruro legiĝus
  // kiel stango kun artiko. La dekstra kruro uzas la saman funkcion, ŝovitan duone
  // tra la ciklo.
  const fleksoGenuo = ( p: number ) =>
    ( 0o1/0o20 + 0o13/0o40 * Math.max(0, -Math.sin(p - 0o3/0o10)) ) * movo;
  fig.genuoj[0].rotation.x = fleksoGenuo(fazo);
  fig.genuoj[1].rotation.x = fleksoGenuo(fazo + Math.PI);
  // ⟨ La ruliĝo de la plando 📃 ⟩ — la maleolo sekvas la kruron, sed MALFRUE
  // ( 0o7/0o10 radianojn post ĝi ) — la plando plataj ĉe la surmeto, ruliĝas
  // trans la piedon kaj puŝas per la pinto poste. Sen la malfruo la piedo turniĝus
  // KUNE kun la kruro kaj la paŝo legiĝus kiel piedfingra glitado.
  // ⟨ La ruliĝo estas MALGRANDA 📃 ⟩ — la rando de la boto sidas 0.2188 super la
  // maleolo, do la malnova amplitudo 0.09375 movis ĝin 0.021 antaŭen kaj
  // malantaŭen, dum la pantalono restis SENMOVA. La buŝo de la boto do malfermiĝis
  // malegale — la rando ŝajne tranĉis la kruron. Kun 0.039 la rando moviĝas nur
  // 0.0085 kaj la buŝo restas egala, sed la piedo ankoraŭ ruliĝas de la kalkano
  // al la pinto.
  const maleolo = 0o5/0o200 * movo * Math.sin(fazo - 0o7/0o10);
  fig.sxuoj[0].rotation.x = -maleolo;
  fig.sxuoj[1].rotation.x = maleolo;
  // ⟨ La paŝa bobado 📃 ⟩ — la korpo leviĝas kiam unu kruro portas la tutan pezon
  // ( meze de la paŝo ) kaj malleviĝas kiam la kruroj disiĝas. Tio estas DUOBLA
  // ofteco po paŝciklo, do cos(2 × fazo); kun cos(fazo) la korpo levus sin unufoje
  // po paŝo kaj la marŝo legiĝus kiel saltado.
  fig.group.position.y += ( 0o7/0o1000 + 0o7/0o1000 * Math.cos(fazo * 0o2) ) * movo;
  // ⟨ La brakoj 📃 ⟩ — kontraŭe al la samflanka kruro, sed nur ETETE. La mantelo
  // estas FERMITA ŝtofo sen manik-truoj, do la manikoj devas svingiĝi INTERNE de
  // ĝi — kun la malnova amplitudo 0.25 la manumo ( 0.85 sub la ŝultro ) moviĝis
  // 0.34 antaŭen kaj eliris TRA la mantelo kiel folia flugilo. 0.094 lasas la tukon
  // ene, kun spaco ankaŭ por la malfruo de la maniko sube.
  const svingoBrako = 0o4/0o100 * movo * paso;
  fig.brakoj[0].rotation.x = svingoBrako;
  fig.brakoj[1].rotation.x = -svingoBrako;
  // ⟨ La KUBUTOJ 📃 ⟩ — la kubuto neniam estas tute rekta ĉe vivanta homo, do la
  // figuro tenas etan konstantan flekson ankaŭ starante; ĝi iomete pliiĝas meze de
  // la svingo. NEGATIVA turno movas la manon antaŭen ( la brako montras malsupren,
  // do ĝi sekvas la saman regulon kiel la kruro ). La flekso restas MALGRANDA — la
  // maniko pendas apud la mantelo kaj la antaŭbrako ne rajtas eliri tra la ŝtofo.
  const fleksoKubuto = ( p: number ) => -( 0o1/0o25
    + 0o1/0o50 * movo * ( 0o1/0o2 + 0o1/0o2 * Math.sin(p) ) );
  fig.kubutoj[0].rotation.x = fleksoKubuto(fazo);
  fig.kubutoj[1].rotation.x = fleksoKubuto(fazo + Math.PI);
  // ⟨ La torso 📃 ⟩ — la ŝultroj turniĝas kontraŭ la koksoj ( la dekstra ŝultro
  // antaŭiĝas kiam la maldekstra kruro antaŭiĝas ), la supra korpo kliniĝas iomete
  // antaŭen kaj ruliĝas super la plantita piedo. La manikoj kaj la kapo sekvas ĉi
  // tiun turnon, ĉar ili estas gefiloj de la torso-grupo.
  fig.torsoGrupo.rotation.y = -0o4/0o100 * movo * paso;
  fig.torsoGrupo.rotation.x = 0o5/0o100 * movo - 0o1/0o100 * movo * duobla;
  fig.torsoGrupo.rotation.z = -0o3/0o100 * movo * paso;
  // ⟨ La tuko 📃 ⟩ — la pivoto estas la zono, do la turnoj svingas la suban
  // parton de la robo, ne la tutan figuron. La ŝtofo MALFRUAS kontraŭ la korpo,
  // kaj la antaŭen-malantaŭena svingo okazas DUOBLE po ciklo, ĉar ĉiu genuo
  // puŝas la tukon aparte.
  // ⟨ La mantelo pendas PLUMBE 📃 ⟩ — la supra korpo kliniĝas antaŭen ( 0.078 ),
  // sed peza mantelo NE kliniĝas kun la brusto — ĝi pendas de la ŝultroj kaj la
  // tuko restas vertikala. Antaŭe la mantelo sekvis la kliniĝon kaj ĝia tuko ( 0.5
  // sub la zono ) iris 0.047 MALANTAŬEN ĝuste en la kadro, kiam la antaŭa femuro
  // puŝis la pantalonon 0.043 ANTAŬEN — la pantalono do trairis la ĉemizon per
  // 0.034 ( mezurite per radioj kontraŭ la realaj meshoj ). Nun la grupo
  // kontraŭ-turnas duonon de la klino. Plena kontraŭ-turno tro pendigus la tukon
  // antaŭen ( la malantaŭa femuro trairus ), do la duono estas la ekvilibro; la
  // kolumo apenaŭ moviĝas, ĉar ĝi sidas preskaŭ sur la pivoto mem.
  // ⟨ La svingo PLIGRANDIĜIS 📃 ⟩ — forpreninte la klinon de la kalkulo, la svingo
  // povas kreski sen trapiki ion ajn — 0.0234 → 0.0391 flanken kaj antaŭen, 0.0313
  // → 0.0391 turniĝe. La ŝtofo nun videble sekvas la paŝon anstataŭ glaĉi super la
  // korpo; la malnovaj nombroj estis malgrandaj ne ĉar la ŝtofo estis stifa, sed
  // ĉar la klino manĝis la tutan buĝeton de la spaco.
  fig.roboGrupo.rotation.z = 0o4/0o200 * movo * Math.sin(fazo - 0o5/0o10)
    - 0o1/0o2 * fig.torsoGrupo.rotation.z;
  fig.roboGrupo.rotation.x = 0o5/0o200 * movo * Math.sin(fazo * 0o2 - 0o5/0o10)
    - 0o1/0o2 * fig.torsoGrupo.rotation.x;
  fig.roboGrupo.rotation.y = 0o5/0o200 * movo * Math.sin(fazo - 0o6/0o10);
  // ⟨ La ĉemizo sekvas la paŝon 📃 ⟩ — la ĉemizo havas sian propran pivoton sur la
  // ŝultra linio, do ĝiaj turnoj ALDONIĜAS al tiuj de la mantelo kaj la ĉemizo povas
  // sekvi la paŝon memstare.
  // ⟨ La tordo 📃 ⟩ — la kokso de la antaŭa kruro puŝas la tukon antaŭen, do la
  // SAMA flanko de la ĉemizo sekvas ĝin — tio estas turno ĉirkaŭ la vertikala akso,
  // en fazo kun la paŝo ( ne malfrue kiel la mantelo ). La tuko larĝas 0.21, do
  // 0.078 radianoj movas ĝian flankon 0.016 — videbla sekvo sen streĉi la ŝtofon.
  // Turno ĉirkaŭ la vertikala akso NE ŝanĝas la radiuson de la tuko, do la tordo
  // estas la sola sekvo, kiu ne manĝas la aeron inter la tri tavoloj.
  fig.internoGrupo.rotation.y = 0o5/0o100 * movo * paso;
  // ⟨ La torso RULIĜAS super la plantita piedo 📃 ⟩ — la ŝultroj ruliĝas 0.0469
  // flanken kaj kliniĝas 0.078 antaŭen, kaj la tuko de la ĉemizo ( 0.84 sub la pivoto )
  // sekvas ĉiun el tiuj turnoj per 0.84-obla levilo. Mezurite sur la realaj meshoj
  // ( radioj de ekstere ) la surfaco de la ĉemizo ĉe la kokso falis de 0.203 al
  // 0.175 dum la antaŭa femuro svingis al 0.200 — la pantalono trairis la ŝtofon
  // per 0.022. La grupo do PLIGRANDIGAS la ruliĝon per 0.375 kaj kontraŭas la
  // klinon per 0.125 — la plej bona paro el la provitaj, mezurite per radioj de
  // ekstere kontraŭ ĉiuj kvar paroj ( la pantalono antaŭe, la ĉemizo supre kaj
  // malsupre, la torso ).
  // ⟨ La ĉemizo svingiĝas NUR kun la tordo 📃 ⟩ — propra antaŭen-malantaŭena svingo
  // ( la genuoj puŝas la tukon duoble po ciklo ) ankaŭ proviĝis, sed la ĉemizo sidas
  // inter du tavoloj kun nur 0.013 … 0.027 da aero, do ĉiu propra svingo estas
  // PURA PERDO — kun 0.025 la pantalono trairis la ŝtofon per 0.013 anstataŭ 0.001.
  // La mantelo portas la videblan svingon kaj la ĉemizo restas la trankvila tavolo
  // sub ĝi; la tordo jam donas al la tuko sian propran sekvon de la paŝo.
  fig.internoGrupo.rotation.x = -0o1/0o10 * fig.torsoGrupo.rotation.x;
  fig.internoGrupo.rotation.z = 0o3/0o10 * fig.torsoGrupo.rotation.z;
  // ⟨ La manikoj 📃 ⟩ — la ŝtofo malfruas kontraŭ la movo de sia brako. La
  // malfruo antaŭe estis preskaŭ nevidebla ( 0.0078 radianoj, nome 0.005 ĉe la
  // manumo ) — la manikoj legiĝis velditaj al la brakoj. Nun ĝi estas 0.025, do la
  // manumo malfruas proksimume 0.016 kaj la maniko ankoraŭ restas ene de la
  // mantelo dum la tuta paŝo ( la mezurita aero estas 0.03 ).
  fig.manikoj[0].rotation.x = -0o1/0o40 * movo * Math.sin(fazo - 0o5/0o10);
  fig.manikoj[1].rotation.x = 0o1/0o40 * movo * Math.sin(fazo - 0o5/0o10);
  // ⟨ La kapo 📃 ⟩ — unu kapbobo po paŝo ( do duoble po ciklo ), kaj iomete
  // flanken kun la koksoj.
  fig.kapoGrupo.rotation.x = 0o1/0o100 * movo * duobla + 0o1/0o100 * movo;
  fig.kapoGrupo.rotation.z = -0o1/0o100 * movo * paso;
  // ⟨ La haroj 📃 ⟩ — la hararo havas sian propran grupon ĉe la krono, do ĝi
  // malfruas kontraŭ la kapo kaj balanciĝas poste kiam la kapo bobas.
  // ⟨ La svingo estas MALGRANDA 📃 ⟩ — la kurteno pendas ĜUSTE apud la ŝtofo de
  // la mantelo, do ĝi ne havas multe da spaco. Kun la malnova amplitudo 0.06 ĝia
  // malsupra rando iris 0.03 antaŭen kaj eniĝis en la dorson de la ĉemizo dum
  // ĉiu paŝo — la hararo duontempe malaperis. Nun la tuta svingo estas sub 0.04
  // radianoj kaj la kurteno restas ekster la ŝtofo, sed ĝi ankoraŭ balanciĝas.
  fig.haroGrupo.rotation.x = -0o4/0o100 * movo * Math.sin(fazo * 0o2 - 0o7/0o10);
  fig.haroGrupo.rotation.z = 0o3/0o100 * movo * Math.sin(fazo - 0o7/0o10);
  // ⟨ La palpebrumo 📃 ⟩ — la palpebroj havas sian propran horloĝon ( vidu
  // palpebraFazon ), ĉar homo ankaŭ palpebrumas starante. La ciklo estas longa kaj
  // la palpebrumo mem tre mallonga; la sinuso faras la fermon kaj la malfermon
  // GLATAJ, do la okulo ne saltas. La mesho GRANDIĜAS — ĝia skalo iras de la
  // malfermita 0.05 ĝis 1, do la kupolo kreskas el punkto super la okulo kaj
  // kovras ĝin.
  fig.palpebraFazo += deltaTempo;
  const palpebraCiklo = fig.palpebraFazo % PALPEBRA_INTERVALO;
  const fermiteco = palpebraCiklo < PALPEBRA_DAURO
    ? Math.sin(palpebraCiklo / PALPEBRA_DAURO * Math.PI) : 0;
  fig.palpebroj.scale.y = PALPEBRA_FERMO + ( 0o1 - PALPEBRA_FERMO ) * fermiteco;
}

export function gxisdatigiNpc(fig: Figuro, deltaTempo: number, t: number,
  alteco: ( x: number, z: number ) => number,
  suprajxo?: ( x: number, z: number ) => number): void {
  fig.atendo -= deltaTempo;
  if ( fig.atendo <= 0 ) {
    const a = Math.random() * Math.PI * 0o2, hazardaRadiuso = Math.random() * 0o4;
    // Celu la piedeblan supraĵon, ne la krudan terenon — la vojoj estas
    // levitaj platformoj, do supraĵa celo tenas la marŝon sur la pavimon
    // ( la sekva grundo-kvanto tendencas al la pli alta vojo ).
    const cx = fig.hejmo.x + Math.sin(a) * hazardaRadiuso, cz = fig.hejmo.z + Math.cos(a) * hazardaRadiuso;
    const cy = suprajxo ? suprajxo(cx, cz) : alteco(cx, cz);
    fig.celo.set(cx, Number.isFinite(cy) ? Math.max(cy, alteco(cx, cz)) : alteco(cx, cz), cz);
    fig.atendo = 0o3 + Math.random() * 0o4;
  }
  const difX = fig.celo.x - fig.group.position.x, difZ = fig.celo.z - fig.group.position.z;
  const d = Math.hypot(difX, difZ);
  const movas = d > 0o23/0o100;
  // Glata transiro 0..1 inter stari kaj marŝi, por ke la svingoj ne saltu
  // kiam la figuro ekpaŝas aŭ haltas.
  fig.movoFaktoro += ( ( movas ? 0o1 : 0 ) - fig.movoFaktoro ) * Math.min(0o1, deltaTempo * 0o10);
  const movo = fig.movoFaktoro;
  // La marŝa fazo progresas nur dum la figuro moviĝas; pli rapidaj figuroj
  // paŝas pli ofte, kaj ĉiu havas propran fazo-ofseton ( marsoFazo ekvaloro ).
  fig.marsoFazo += deltaTempo * fig.rapido * 0o4 * movo;
  if ( movas ) {
    fig.group.position.x += difX / d * fig.rapido * deltaTempo;
    fig.group.position.z += difZ / d * fig.rapido * deltaTempo;
    // Sekvu la supraĵon ( vojoj + dokoj ) kiam ĝi kuŝas super la tereno —
    // la glata 0o15/0o100-eca blendado transiras la vojajn ramplojn.
    const teroY = alteco(fig.group.position.x, fig.group.position.z);
    const celoY = suprajxo ? Math.max(teroY, suprajxo(fig.group.position.x, fig.group.position.z)) : teroY;
    fig.group.position.y = fig.group.position.y + ( celoY - fig.group.position.y ) * 0o15/0o100;
    fig.group.rotation.y = Math.atan2(difX, difZ);
  }
  // Sta-svingo — eta balancado nur kiam oni staras, por ke la figuro ne ŝtoniĝu.
  fig.group.rotation.z = Math.sin(t * 0o115/0o100 + fig.hejmo.x) * 0o1/0o100 * ( 0o1 - movo );
  // Krura kaj braka svingo plus paŝa bobado — la komuna marŝa ritmo.
  const idlaBrako = Math.sin(t * 0o7 + fig.hejmo.z) * 0o2/0o100 * ( 0o1 - movo );
  marŝSvingo(fig, fig.marsoFazo, movo, deltaTempo);
  fig.brakoj[0].rotation.x += idlaBrako;
  fig.brakoj[1].rotation.x -= idlaBrako;
}
