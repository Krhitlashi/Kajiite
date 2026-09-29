// ≺⧼ La ponto 🌉 ⧽≻
// La pontoj inter la dokaj landbordoj — la dekaj altoj ( PONT_DEKA_DIKECO,
// PONT_FINA_LEVIGXO, pontaDeko, pontaPolSupro ) kaj la supraĵoj mem
// ( konstruiPonton — la ora balustrado kaj la andezita arko sub la deko ).
import * as THREE from "three";
import { aldoniKadranTubon } from "../../konstruajxoj/satalaj/pilieroj.js";
import { kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { VOJA_BORDA_LARĜO, VOJA_DIKECO } from "../vojoj/mezuroj.js";

// PONT_DEKA_DIKECO — La dikeco de la ponta deko — la sama kiel ĉiuj vojoj
// ( VOJA_DIKECO ), ĉar la deko MEM estas voja rubando ( vidu malsupre ).
// ⟨ Importita, ne kopiita 📃 ⟩ — la valoro venas rekte el la voja modulo. Antaŭe
// ĝi estis kopio de la tiutempa voja dikeco ( 0o2/0o10 ); kiam la vojoj
// maldikiĝis al 0o5/0o100, la ponto restus dika lampiro 0o20 Peu super la
// platformoj — ŝtupo ĉe ĉiu ponto-fino. Tiel la du valoroj restas unu.
export const PONT_DEKA_DIKECO = VOJA_DIKECO;

// PONT_FINA_LEVIGXO — Kiom la SUFACO de la deko staras super la platforma
// supro ĉe ĉiu FINO de la ponto. GXi egalas la dekan dikecon, do la malsupro de
// la rubando kuŝas GXUSTE sur la platforma supro — la ponto sidas sur la dokoj
// ( kaj sur la kajo-vojoj, kiuj kuras laŭ iliaj landbordoj ), sen ŝtupo kaj sen
// z-flagro.
export const PONT_FINA_LEVIGXO = PONT_DEKA_DIKECO;

// PONT_POL_LEVIGXO — Kiom la ORA balustrado LEVIGXAS super sia baza alto ĉe la
// KRONO de la ponto. La deko mem estas REKTA ( la ponto estas simpla rekta
// trabo inter la du bordoj ); la arkon portas la balustrado — la fostoj altiĝas
// kaj malaltiĝas laŭ sinusoido, do la supra trabo svingiĝas supren meze de la
// ponto. ⟨ La boata klareco 📃 ⟩ — la akvo sidas je -4.5, kaj la REKTA deko
// restas pli ol 4.2 unuojn super gxi tra la tuta rivero ( la kanoto altas 0.78 ),
// dum la fostaj paroj restas flanke de la naviga kanalo.
export const PONT_POL_LEVIGXO = 0o3/0o2;

// pontaDeko — La SURFACO de la ponto je la parametro t ( 0 = la unua fino, 1 =
// la dua ). La deko estas REKTA linio inter la du finaj suproj — neniu arko en
// la veturebla surfaco, do la ponto legigxas kiel rekta trabo.
//     @param t ( number ) - La pozicio laŭ la ponto ( 0..1 ).
//     @param ay, by ( number ) - La altoj de la du finoj ( la platformaj suproj
//              plus PONT_FINA_LEVIGXO ).
//     @returns y ( number ) - La mondo-alto de la veturebla surfaco.
export function pontaDeko(t: number, ay: number, by: number): number {
  return ay + ( by - ay ) * t;
}

// pontaPolSupro — La mondo-alto de la SUPRO de balustrada fosto je la parametro
// t, se gxi staras sur la deko je alto dekaY. La fostaj suproj sekvas la dekan
// nivelon PLUS sinusan levigxon, do la supra trabo arkas supren meze de la ponto
// dum la fostoj mem altigxas — la sama sinusa profilo ĉe ambaŭ finoj ( nula
// deklivo-sxangxo ), do la balustrado eniras la bordon glate.
//     @param t ( number ) - La pozicio laŭ la ponto ( 0..1 ).
//     @param dekaY ( number ) - La alto de la deka surfaco je t.
//     @param polAlto ( number ) - La baza alto de la fosto super la deko.
//     @param levigxo ( number = PONT_POL_LEVIGXO ) - La levigxo ĉe la krono.
//     @returns y ( number ) - La mondo-alto de la fosto-supro.
export function pontaPolSupro(t: number, dekaY: number, polAlto: number,
  levigxo = PONT_POL_LEVIGXO): number {
  return dekaY + polAlto + levigxo * Math.sin(Math.PI * t);
}

// konstruiPonton — La SUPRAĴOJ de ponto inter du dokaj LANDbordoj. La veturebla
// SURFACO kaj la andezitaj randoj mem venas de la voja reto — la mond-nivela
// vojo "Ponto" ricevas la REKTAN supran funkcion ( pontaDeko ) en urbo.ts, do la
// voja rubando estas la rekta deko. Ĉi tiu funkcio aldonas tion, kion la vojo ne
// povas:
//   · la ORA balustrado — fostoj en la SAMA stilo kiel la angulaj pilieroj de la
//     konstruajxoj ( la sama diamanta sekco, la sama talona hoko supre, la sama
//     ora materialo — aldoniKadranTubon kun fora = 0 ), plus ora trabo laŭ iliaj
//     suproj. La ponto do legiĝas kiel parto de la urbo, ne kiel fremda peco.
//   · la ANDEZITA ARKO sub la deko — UNU PLENA andezita maso, ekstrudita tra la
//     tuta larĝo de la deko kaj la tuta spano, kun UNU malfermo super la akvo.
//     Ĝiaj flankaj facoj kuŝas en la ebeno de la eksteraj randoj de la voja
//     andezita bendo, do la arko legiĝas kiel daŭrigo de tiu bendo malsupren, kaj
//     la maso estas PLENA gxis la du finoj ( la abutmentoj ). ( Antaŭe: vico da
//     rektaj konusaj fostoj, poste maldika arko tra la tuta spano. )
//     @param ax, az, ay ( number ) - La unua doka pinto kaj la alto de gxia platformo.
//     @param bx, bz, by ( number ) - La dua doka pinto kaj gxia platformo-alto.
//     @param largho ( number ) - La largho de la VOJO de la ponto. La deko mem
//              estas largho/2 plus la du andezitaj flank-bendoj ( 0o1/0o2 ĉiu ) —
//              la sama formulo kiel en kreiVojajnBendojn de la voja modulo.
//     @param heightFn ( funkcio ) - La terena alto ( por la piedoj de la arko ).
//     @param cxuAkvo ( funkcio ) - Ĉu la punkto estas akvo. La arko malfermiĝas
//              super la akvo, ne super la tuta spano: la samo akvo-masko, kiun la
//              ponto-detekto uzis ( urbo.ts pasas skulptitaAkvo ), do la arko kaj
//              la detekto konsentas.
//     @param andezitaMaterialo, oraMaterialo ( materialoj ) - La dokaj kaj la
//              konstruajxaj materialoj ( la ponto kunhavigas ambaŭ familiojn ).
export function konstruiPonton(
  sceno: THREE.Scene,
  ax: number, az: number, ay: number,
  bx: number, bz: number, by: number,
  largho: number,
  heightFn: ( x: number, z: number ) => number,
  cxuAkvo: ( x: number, z: number ) => boolean,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial
): void {
  const longo = Math.hypot(bx - ax, bz - az);
  if ( longo < 0o1/0o10 ) return;
  const direkto = Math.atan2(bx - ax, bz - az);
  // ⟨ La larĝo de la DEKO 📃 ⟩ — la voja modulo konstruas la rubandon el TRI
  // bendoj ( kreiVojajnBendojn ): diorita centro de `w` kaj du andezitaj flankoj de
  // 0o1/0o2 ĉiu, kie w = larĝo/2 ( urbo.ts pasigas la DUON-larĝon al
  // konstruiVojojn ). La TUTA duon-larĝo de la deko estas do larĝo/4 + 0o1/0o2 —
  // NE larĝo/2 ( la malnova kalkulo ), ĉe la ponto de la ĉefa urbo ( larĝo 0o340/
  // 0o100 = 3.5 ): 1.375 anstataŭ 1.75. La malnova nombro metis la orajn fostojn
  // 0.275 EKSTER la deka rando kaj la andezitajn fostojn tute ekster la deko —
  // la subtenoj pendis en la aero apud la ponto anstataŭ sub ĝi.
  // duon — la TUTA duon-larĝo de la deko. La arka maso malsupre estas ekstrudita
  // gxuste tra gxi, do la arko finigxas en la sama ebeno kiel la ekstera rando de la
  // voja andezita bendo.
  const duon = largho / 4 + VOJA_BORDA_LARĜO;
  // ⟨ La arka maso estas harareto PLI LARĜA ol la deko 📃 ⟩ — la maso estas
  // ekstrudita 0o1/0o500 ( 0o1/0o5 Peu ) preter la rando de la deko, do ĝiaj flankaj
  // facoj estas la VIDEBlaj facoj ĉe la rando: la rando-faco de la voja rubando
  // ( la sama ebeno ) restas malantaŭe, kaj la andezito de la arko kovras la randon
  // de la deko — vidu la supran komenton pri la profilo.
  const masaDuono = duon + 0o1/0o500;
  // La fosto-linio — sur la andezita flank-bendo, iomete ENEN de ĝia mezo. La
  // andezita bendo iras de larĝo/4 ( la rando de la diorito ) ĝis larĝo/4 + 0o1/0o2
  // ( la rando de la deko ); je + 0o1/0o10 la tuta fosto — la diamanta sekco KAJ la
  // talona hoko supre — restas sur la deko.
  const bendoX = largho / 4 + 0o1/0o10;
  const grupo = new THREE.Group();
  grupo.position.set(ax, 0, az);
  grupo.rotation.y = direkto;
  const cosR = Math.cos(direkto), sinR = Math.sin(direkto);
  // La loka ( x, z ) → monda transformo — la fostoj bezonas la teren-alton.
  const mondaX = (lx: number, lz: number) => ax + cosR * lx + sinR * lz;
  const mondaZ = (lx: number, lz: number) => az - sinR * lx + cosR * lz;
  // La voja rubando dikegas VOJA_DIKECO, do la malsupro de la deko.
  const dekaDikeco = PONT_DEKA_DIKECO;
  const arko = (t: number) => pontaDeko(t, ay, by);
  // ⟨ La ORA balustrado 📃 ⟩ — fostoj en la piliera stilo sur ambaŭ flankoj de
  // la deko. La fostoj sekvas la arkon ( ĉiu staras sur la deko je sia propra
  // loko ) kaj iliaj hokoj svingiĝas ENEN, super la vojon ( vidu sube ).
  const polAlto = 0o13/0o20;            // 0.8125 — la balustrada alto super la deko
  // Kiom da fostoj po flanko — la SAMA ritmo (~2.5-unua interspaco) sendepende de
  // la ponta longo, do longa ponto ne ricevas maldensan balustradon.
  const poloj = Math.max(0o5, Math.round(longo / 0o25/0o10) + 1);
  const polX = bendoX;                  // Sur la andezita flank-bendo de la deko.
  const geos: THREE.BufferGeometry[] = [];
  for ( const sX of [ -1, 1 ] ) {
    for ( let i = 0; i < poloj; i++ ) {
      const t = i / ( poloj - 1 );
      const lz = longo * t;
      const bazo = arko(t) - 0o1/0o100;   // Iom en la deko — neniu z-flagro.
      // La fosto altigxas al la arka balustrada linio, do gxia propra alto
      // kreskas meze de la ponto ( pontaPolSupro ).
      const supro = pontaPolSupro(t, bazo, polAlto);
      // ⟨ La hoko svingiĝas ENEN 📃 ⟩ — antaŭe la talona hoko de ĉiu fosto
      // svingiĝis EKSTEREN, super la akvon, kaj la pinto de la fosto elstaris
      // preter la deka rando. Nun ĝi svingiĝas enen, super la vojon: la TUTA fosto
      // — la bazo, la sekco kaj la hoko — sidas sur la deko.
      aldoniKadranTubon(geos, sX * polX, lz, bazo, supro, -sX, 0, true, 0, true, 0);
    }
    // La ora trabo laŭ la suproj de la fostoj — glata tubo, kiu sekvas la ARKON
    // de la balustrado ( ne de la deko ): gxi svingigxas supren meze de la ponto.
    const traboPunktoj: THREE.Vector3[] = [];
    const trabajSekcioj = poloj * 2;
    for ( let i = 0; i <= trabajSekcioj; i++ ) {
      const t = i / trabajSekcioj;
      traboPunktoj.push(new THREE.Vector3(sX * polX, pontaPolSupro(t, arko(t), polAlto), longo * t));
    }
    const trabaKurbo = new THREE.CatmullRomCurve3(traboPunktoj, false, "centripetal", 0);
    const trabo = new THREE.Mesh(
      new THREE.TubeGeometry(trabaKurbo, trabajSekcioj, 0o1/0o20, 0o10, false), oraMaterialo);
    trabo.castShadow = true;
    grupo.add(trabo);
  }
  const balustrado = new THREE.Mesh(kunfandiGeometriojn(geos), oraMaterialo);
  balustrado.castShadow = true;
  grupo.add(balustrado);
  // ⟨ LA ANDEZITA ARKO 📃 ⟩ — UNU, PLENA arko de bordo al bordo. Antaŭe la ponto
  // havis vicon da REKTAJ konusaj fostoj ( la samaj kiel la dokaj fostoj )
  // malsuprenirantaj en la akvon, poste vicon da maldikaj tubaj arkoj; nun ĝi
  // estas unu SOLIDA andezita maso kun unu sola arka malfermo tra ĝi.
  //
  // ⟨ Kial ĝi aspektas kiel daŭrigo de la vojo 📃 ⟩ — la maso estas ekstrudita
  // trans la TUTA larĝo de la deko ( 2 × masaDuono, hararete pli ol la deko ), do
  // ĝiaj du flankaj facoj staras en la ebeno de la EKSTERAJ randoj de la andezitaj
  // flank-bendoj de la vojo ( x = ± duon ) kaj iomete antaŭe. De flanke oni vidas
  // unu kontinuan andezitan strion — la surfaco de la vojo, la rando de la deko kaj
  // la malsupren kurba arko — sen ia lipo inter ili.
  //
  // ⟨ Unu malfermo super la AKVO 📃 ⟩ — la arko havas nur UNU malfermon, kaj gxi
  // staras tie, kie la ponto vere trapasas akvon: la kurbo levigxas el la akvo
  // mem. Antaŭe la arko etendiĝis la TUTAN spanon, sed la ponto estas multe pli
  // longa ol la rivero ( ĉe la ĉefa ponto: spano 42.5, akvo 18.8 en la mezo ) —
  // do la videbla malfermo estis ~27 unuojn larĝa kaj 4.2 altaj: larĝa, preskaŭ
  // plata fendo anstataŭ arko, kaj la maso sub la deko estis nur maldika bendo
  // gxis la tero. Nun la intradoso havas sian propran, pli mallarĝan spanon ( la
  // akva amplekso plus marĝeno ), do la malfermo estas RONDA arko en la sama
  // proporcio kiel la doka ( levigxo → 0o1/0o4 de sia propra spano ).
  //
  // ⟨ La ponta flanko estas andezito supren gxis la vojo 📃 ⟩ — la maso altiĝas ĝis
  // la SURFACO de la vojo kaj ĝia malsupro sekvas la terenon ( vidu sube ), do la
  // mason oni vidas kiel MURON de la pinta surfaco malsupren ĝis la grundo tra la
  // tuta spano, kun la arka malfermo en ĝi — la andezito de la arko estas la rando
  // de la deko mem, kaj ĝi kurbiĝas en la arkon, kiel la kadro de la doko
  // daŭriĝas malsupren al la platformo. Antauxe la maso finiĝis ĉe la malsupro de
  // la rubando ( la 0o5-Peua rando de la deko restis super la ŝtono kiel
  // lipo ) kaj ĝia malsupro kuŝis sur unu profunda nivelo ( apud la bordoj videblis
  // nur tiu maldika bendo ).
  //
  // ⟨ La krono kaj la ringo 📃 ⟩ — la krono sidas unu rondikan dikecon sub la
  // deka malsupro ( la dikeco de la andezita bendo, do la bendo legiĝas kiel la
  // sama strato, nur kurba ), same kiel ĉe la doko. La kanoto ( alta 0.78 ) pasas
  // sub gxi facile, kaj NENIU fosto staras en la akvo.
  const ringaDikeco = 0o1/0o2;
  const kronoY = arko(0o1/0o2) - dekaDikeco - ringaDikeco;
  // ⟨ KIE LA AKVO — kaj kie la tereno plej malaltas 📃 ⟩ — oni specimenas la
  // pontan linion: la akvaj specimenoj donas la amplekson de la rivero ( tiun
  // saman akvon, kiun la ponto-detekto uzis, do la du konsentas ), kaj la tereno
  // donas la plej profundan punkton sub la ponto. La tereno specimeniĝas ankaŭ
  // flanke ( ± masaDuono ), ĉar la deklivo povas malaltiĝi flanken.
  const specimenoj = Math.max(0o10, Math.round(longo));
  let akvoUnua = -1, akvoLasta = -1;
  let teraFino = Infinity;
  for ( let i = 0; i <= specimenoj; i++ ) {
    const lz = longo * i / specimenoj;
    if ( cxuAkvo(mondaX(0, lz), mondaZ(0, lz)) ) {
      if ( akvoUnua < 0 ) akvoUnua = i;
      akvoLasta = i;
    }
    for ( const lx of [ -bendoX, 0, bendoX ] )
      teraFino = Math.min(teraFino, heightFn(mondaX(lx, lz), mondaZ(lx, lz)));
  }
  // La arka spano: de la unua akva specimeno gxis la lasta, plus malgranda
  // marĝeno ( 0o1/0o20 = 5% de la ponto po flanko ), do la arko iomete superas la
  // akvon kaj gxiaj piedoj staras en la borda deklivo. Se la ponto ne trapasas
  // akvon ( aux la akvo kovras preskaŭ ĉion ), la arko restas la tuta spano — la
  // malnova konduto, kiu ĉiam validas.
  const arkMarĝeno = 0o1/0o20;
  let arkaT0 = 0, arkaT1 = 1;
  if ( akvoUnua >= 0 ) {
    arkaT0 = Math.max(0, akvoUnua / specimenoj - arkMarĝeno);
    arkaT1 = Math.min(1, akvoLasta / specimenoj + arkMarĝeno);
  }
  if ( arkaT1 - arkaT0 < 0o1/0o10 ) { arkaT0 = 0; arkaT1 = 1; }   // tro malvasta
  const arkaLongo = ( arkaT1 - arkaT0 ) * longo;
  // ⟨ La levigxo de la arko 📃 ⟩ — 0o1/0o4 de GXIA PROPRA spano ( la klasika
  // segmenta arko de la malnovaj sxtonpontoj ). Ĉe mallarĝa arko tiu levigxo estas
  // malgranda, do la pli profunda el la du reguloj venkas: la piedoj ankaŭ devas
  // resti sub la plej malalta tereno sub la ponto, ĉar la kurbo devas ENFOSIGXI
  // mem ĉe la arka piedo — nur tiel la malfermo aperas EL LA GRUNDO ( la mason
  // finas la kurbo super la tereno kaj la tereno mem sub ĝi ), anstataŭ pendi
  // super ĝi kiel tranĉita faco en la aero.
  // ( La akvo mem ne bezonas apartan regulon: akvo kuŝas SUPER la riverfundo, do
  // piedoj sub la fundo estas aŭtomate sub la akva surfaco. )
  let piedoY = kronoY - arkaLongo * 0o1/0o4;
  piedoY = Math.min(piedoY, teraFino - 0o1/0o2);
  // La intradoso — la videbla arka kurbo. Kvadrata Beziero: ĝi trafas la kronon
  // ĝuste meze de SIA spano ( y(½) = kronoY ) kaj staras vertikale super ĝi, do la
  // malfermo estas glata arko sen angulo ĉe la supro.
  const intradoso = (t: number) => piedoY + ( kronoY - piedoY ) * ( 1 - Math.pow(2 * t - 1, 2) );
  // La profilo: la malsupro de la deko supre, la arka kurbo malsupre, kaj la du
  // finaj facoj ( vertikalaj ) ĉe la bordoj — tiuj kuŝas en la tero, ĉar la vojo
  // sidas sur la bordo ĝuste tie.
  // ⟨ La supro de la maso — la SURFACO de la vojo, ne ĝia malsupro 📃 ⟩ — antaŭe
  // la maso finiĝis ĉe la malsupro de la voja rubando, do la 0o5-Peua rando de
  // la rubando ( la andezita bendo de la vojo ) staris SUPER la ŝtono kiel aparta
  // lipo — io pendanta super la arko. Nun la maso altiĝas ĝis la surfaco mem ( 0o1/
  // 0o200 sub ĝi, por ke la du supraj facoj ne z-flagru ), do la andezito de la arko
  // estas tio, kion oni vidas ĉe la rando de la deko de la pinta surfaco ĝis la
  // grundo: NENIO pendas super la ŝtono. La pinta surfaco mem ne ŝanĝiĝas — la
  // rubando plu estas la piedirebla vojo, kaj la maso finiĝas 1/128 sub ĝi.
  const suproDe = (z: number) => arko(z / longo) - 0o1/0o200;
  const arkaZ0 = arkaT0 * longo, arkaZ1 = arkaT1 * longo;
  // ⟨ La MALSUPRO sekvas la terenon 📃 ⟩ — la malsupro de la maso ne plu kuŝas sur
  // unu profunda nivelo ( la piedoj ), kiel ĝi faris antauxe: tiam la maso estis
  // profunda bloko ENFOSIGITA en la bordoj, kaj de flanke oni vidis nur la maldikan
  // bendo de la deko — la ponta flanko NE estis kovrita per andezito gxis la
  // grundo. Nun la malsupro sekvas la terenon je 0o1/0o4 sub ĝi, do la maso estas
  // MURo de la dek-rando malsupren ĝis la grundo tra la tuta ponto: la rando de la
  // vojo daŭriĝas malsupren kaj kurbiĝas en la arkon, gxuste kiel la kadro de la
  // doko daŭriĝas malsupren ĝis la doko-grundo. La flankaj specimenoj uzas la SAMAN
  // radiuson kiel la voja supro, do la tereno tie estas garantiite sub la supro de
  // la maso kaj la profilo neniam renversiĝas.
  const teraMalsupra = 0o1/0o4;   // kiom la maso enfosigxas sub la terenon
  const teraLaterala = (z: number) => Math.min(
    heightFn(mondaX(-masaDuono, z), mondaZ(-masaDuono, z)),
    heightFn(mondaX(0, z), mondaZ(0, z)),
    heightFn(mondaX(masaDuono, z), mondaZ(masaDuono, z)));
  // La malsupro de la maso je z: la tereno — aux la arka kurbo, kie tiu estas
  // super la tereno ( tie estas la MALFERMO, do la maso finigxas per la kurbo ).
  const sube = (z: number) => {
    const tera = teraLaterala(z) - teraMalsupra;
    if ( z <= arkaZ0 || z >= arkaZ1 ) return tera;
    return Math.max(tera, intradoso(( z - arkaZ0 ) / ( arkaZ1 - arkaZ0 )));
  };
  const formo = new THREE.Shape();
  formo.moveTo(0, suproDe(0));
  formo.lineTo(0, sube(0));
  // La malsupro: densa specimenado ( 0o40 = 32 punktoj ) — la facetingo de la
  // kurbo restas sub 0o2/0o100 unuoj, dum la geometrio restas malgranda.
  const subajPunktoj = 0o40;
  for ( let i = 1; i <= subajPunktoj; i++ ) {
    const z = longo * i / subajPunktoj;
    formo.lineTo(z, sube(z));
  }
  formo.lineTo(longo, suproDe(longo));
  formo.closePath();
  const arkaGeometrio = new THREE.ExtrudeGeometry(formo, { depth: masaDuono * 2, bevelEnabled: false });
  // La profilo vivas en la ( z, y ) ebeno kaj la ekstrudo iras laux +Z de la
  // profilo — tiu estas la larĝa akso de la ponto. Turnu gxin kaj centru la mason.
  arkaGeometrio.rotateY(-Math.PI / 2);
  arkaGeometrio.translate(masaDuono, 0, 0);
  const arkaMaso = new THREE.Mesh(arkaGeometrio, andezitaMaterialo);
  arkaMaso.castShadow = arkaMaso.receiveShadow = true;
  grupo.add(arkaMaso);
  sceno.add(grupo);
}
