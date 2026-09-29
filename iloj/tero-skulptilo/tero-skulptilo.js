// ≺⧼ Terena skulptilo 🔨 ⧽≻
// Staras ekster la ludo ( aparta paĝo en iloj/ ) kaj skulptas la terenon —
// montojn, la riveron, la lagon — kiel la TUTAN terenon ( la natura tavolo en
// tereno.ts estas plata ). La mapo montras nordon supre kaj orienton dekstren
// ( la sama orientiĝo kiel la minimapo de la ludo ). La savo skribas la
// rezulton rekte al kantaoj/tero-datumaro/, kiun la ludo legas kiel la teron.
// La biomo ( tereno.ts ) venas TUTE de la PENTRITA tavolo. akvo ( la masko )
// kaj la pentritaj montaro/valo/ebenaĵo/akvaj-plantoj/ekvizeto
// ( SKULPTA_BIOMOJ ) — NENIU deriva biomo. La biomo-ilo PENTRAS la biomon
// rekte sur la biomo-tavolon, kaj la tero mem NE sxangxigxas. La AKVAJ biomoj
// ( Akvaj plantoj 🌿, Ekvizeto 🌾 ) ekzistas nur sur la akvo — la peniko
// pentras ilin nur en akvaj ĉeloj, kaj la teraj biomoj neniam pentrigxas sur
// akvo. Aŭtomata forigas la pentraĵon cxiu loke — la loko revenas al nenio,
// same kiel loko sen datumoj. La besto-ilo ( Animaloj 🐾, paletro Akvaj bestoj
// 🐟, Petreloj 🕊️ aux NPC-oj 🧍 ) pentras la bestajn zonojn ( la SKULPTA_BESTOJ
// tavolo ) kiel BITOJ — ĉelo povas teni PLURAJN specojn samtempe, do pentri
// la duan sur la unua kombinas ilin. la akvaj bestoj naĝas nur en la pentritaj
// akvaj ĉeloj ( nur akvo ), la petreloj rondflugas super ajna pentrita ĉelo
// ( tero aux akvo ), la NPC-oj piediras nur sur la pentritaj teraj ĉeloj
// ( neniam akvo ). La SAMA ilo forvisxas — sxaltita per Forviŝi 🧽 en la
// paletro, la elektita specio forvisxigxas, la ceteraj restas ( malplena ĉelo
// = nenia besto ). La defaŭltaj lokoj estas bakitaj en la tavolon. La skulptilo montras la biomojn nur dum la biomo-ilo estas
// malfermita kaj la bestajn zonojn nur dum la besto-ilo estas malfermita — la
// besta vido montras NUR la elektitan specion. la montara biomo purpura, la
// vala blu-verda, la ebenaĵo pala helverda, la akvaj plantoj profunda
// blu-verda, la ekvizeto helverda, la nuda akvo sen nuanco, la akvaj-bestaj
// ĉeloj helbluaj, la petrelaj helaj ( kun Aŭtomata ambaŭ montrigxas ), kaj
// nenio aliloke. La akva peniko pentras la maskon kaj eltrancxas la basenon.
// La OBJEKTA ilo ( Objektoj 🎯 — langeto de la ilo-karto ) metas
// INDIVIDUAJN objektojn ( plantojn, bestojn, NPC-ojn ) cxe precizaj pozicioj
// kun ecoj. Gxi havas siajn proprajn sub-ilojn. Meti ➕ ( klako metas; klako
// proksime de metita objekto ELEKTAS gxin ), Movu ✋ ( trenu objekton sur la
// mapo aux la reliefo ) kaj Forigi 🗑️ ( klako forigas ). La panelo montras
// la vivajn koordinatojn de la kursoro, la x/z-enigojn por tajpi precizajn
// koordinatojn kaj la liston de metitaj objektoj ( SKULPTA_OBJEKTOJ ).
//
// Uzado. Kuru npm run dev kaj malfermu /iloj/tero-skulptilo/tero-skulptilo.html
// Maldekstra klako + treno skulptas. Dekstra klako aŭ Shift + treno movas la
// vidon. La rado zomas. Duobla klako resendas la tutan vidon. La ilo Movigi ✋
// permesas treni la vidon per la maldekstra klako — en la 2D-mapo gxi movas
// la mapon, en la 3D-vido gxi turnas la fotilon. WASD aŭ la sagoklavoj movas
// la vidon ankaŭ per la klavaro ( en la 3D-vido Q/E supren/malsupren, Shift
// rapidigas; en la 2D-mapo +/- zomas ). La 3D-vido ( butono Vido ) permesas
// orbiti ( dekstra klako ), movi ( meza klako ) kaj skulpti rekte sur la
// reliefo ( maldekstra
// klako ). Savi skribas rekte al la dosiero per la File System Access API
// ( Chromium ); aliaj retumiloj ricevas elŝuton.
import { bazaAlteco } from "../../kantaoj/mondo/tereno.js";
// La krada interpolo — la komuna kurbo de la ludo ( kantaoj/komunajxoj/interpolo.ts ).
import { katmullRom } from "../../kantaoj/komunajxoj/interpolo.js";
// ⟪ La mapo 📃 ⟫ — la skulptilo redaktas UNU mapon samtempe. La mapoj estas
// sendependaj mondoj ( kantaoj/tero-datumaro/mapoj.ts ); ĉiu havas sian propran
// dosierujon kun la sep datumodosieroj. La registro venas permane ( nur etaj
// datumoj kun la formo de ĉiu mapo ), la datumdosieroj de la elektita mapo
// ŝarĝiĝas per dinamika importo — do nova mapo ne postulas ŝanĝojn ĉi tie.
// La parametro ?mapo=<kodo> elektas la mapon ( la mapo-registruloj uzas ĝin por
// ŝanĝi la mapon sen perdi la nunan staton — ili simple reŝargas la paĝon ).
// La formo de la mondo ( la cirklo, la rondigita kvadrato aŭ la rondigita
// triangulo ) — la sama modulo kiel la ludo ( scena.ts ), do la 2D-mapo, la
// 3D-vido kaj la ludo montras la saman formon kaj la saman randon.
// ⟪ La akvokalkulo 📃 ⟫ — la akvo estas DERIVITA de la fontoj ( la sama modulo
// kiel la ludo, kantaoj/mondo/akvokalkulo.ts ). La ilo ne pentras la maskon: gxi
// metas, movas kaj forigas FONTOJN, kaj la riveroj elfluas, la kavoj plenigxas
// kaj la akva surfaco sekvas la terenon. La malnova pentrita masko restas kiel
// la basenaj semoj ( la basenoj de la antaŭaj mapoj ).
// La fontoj, la kalkulo kaj la specimenaj helpiloj de la akvo logxas en
// tero-skulptilo/akvo.js; cxi tie restas nur la prova funkcio akvoCxe ( la
// vojoj kaj la dokoj legas gxin ).
import { akvoCxe } from "../../kantaoj/mondo/akvokalkulo.js";
import { mapoDatumo, mapoFormo, mapoGrandeco, formajRandaj, agordiDosierojn,
  sxargiDatumaronElKodo, sxargiDosierajnTenilojn } from "./tero-skulptilo/dosieroj.js";
// La datumdosieroj de ĉiuj mapoj — unu globa importo, do aldoni mapon ne
// postulas ŝanĝojn ĉi tie ( Vite malkonstruas import.meta.glob je la konstrno,
// kontraŭe al dinamika importo kun variablo ).
const MAPAJ_MODULOJ = import.meta.glob(
  "../../kantaoj/tero-datumaro/*/{krado,akvo,akvofontoj,biomoj,bestoj,objektoj,urboj,vojoj}.ts");
// preniModulon — la datumdosiero de la nuna mapo.
//     @param nomo ( string ) - "krado" | "akvo" | "biomoj" | "bestoj" | "objektoj" | "urboj" | "vojoj".
//     @returns La modulo de la dosiero.
async function preniModulon(nomo) {
  const sxlosilo = "../../kantaoj/tero-datumaro/" + mapoDatumo.kodo + "/" + nomo + ".ts";
  const sxargxi = MAPAJ_MODULOJ[sxlosilo];
  if ( !sxargxi ) throw new Error("Mankas la datumdosiero " + sxlosilo);
  return await sxargxi();
}
const { SKULPTA_PASO, SKULPTA_N, SKULPTA_ORIGINO, SKULPTA_DELTAJ } = await preniModulon("krado");
const { SKULPTA_AKVA_NIVELO, SKULPTA_AKVA_MASKO } = await preniModulon("akvo");
// La akvofontoj — malnova mapo ne havas la dosieron, do la defaŭlto malplenas
// ( tiam nur la pentrita akva masko estas la basenaj semoj ).
const { SKULPTA_AKVOFONTOJ } = await preniModulon("akvofontoj")
  .catch(() => ( { SKULPTA_AKVOFONTOJ: [] } ));
const { SKULPTA_BIOMOJ } = await preniModulon("biomoj");
const { SKULPTA_BESTOJ } = await preniModulon("bestoj");
// La cetera datumaro en siaj propraj dosieroj — la metitaj objektoj
// ( inkluzive la kanuojn kaj la spacosxipon ), la urboj kaj la vojoj/dokoj.
const { SKULPTA_OBJEKTOJ } = await preniModulon("objektoj");
const { SKULPTA_URBOJ } = await preniModulon("urboj");
const { SKULPTA_VOJOJ, SKULPTA_DOKOJ } = await preniModulon("vojoj");
// La formo kaj grandeco de la nuna mapo — redakteblaj en la mapo-panelo ( la
// ŝango saviĝas al mapoj.ts ).
// La formo de la mondo, la rando-punktoj kaj la mapo-registro logxas en
// tero-skulptilo/dosieroj.js — la redaktilo nur legas ilin.
// la ludo konstruas el KradaArangxo ( kantaoj/mondo/krado.ts — pura modulo, komuna kun
// la testilo iloj/testoj/krado/urbo.ts ). kreiKradanPlanon donas la plenan
// planon ( konstruaĵoj, vojoj, spronoj ) kiel purajn datumojn por desegni;
// validiKradon kontrolas la redaktitan kradon.
import { kreiKradanPlanon } from "../../kantaoj/mondo/krado/plano.js";
import { validiKradon } from "../../kantaoj/mondo/krado/validigo.js";

// La malkodaj funkcioj — la UNU FONTO estas la rultempo de la ludo
// ( kantaoj/tero-datumaro/rultempo.ts ). Antaŭe la samaj funkcioj estis
// kopiitaj ĉi tie Kaj en ŝablono por la savo — tri kopioj kiuj facile
// devojiĝus. La savo ne plu reskribas rultempo.ts, kaj la malkodaj funkcioj
// nun logxas en tero-skulptilo/dosieroj.js ( la legado de la datumaro ).
// La oraj, vitraj kaj dioritaj materialoj — la komunaj materialoj de la ludo.
// La realajn konstruantojn ( la sataloj, la lampoj, la keŭfĥesoj, la arboj )
// kaj la vojajn helpilojn ( la kunfandigxoj, la gluo, la dokoj ) importas nur
// la moduloj, kiuj vere konstruas ilin — vido3d.js, krado3d.js, kradaro.js kaj
// objektoj.js.
import { kreiOranMaterialon, kreiFenestranMaterialon,
  kreiDioritanMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { MONDO, MONDO_HALFO, REZ, mondoxAlPikselo, mondozAlPikselo } from "./tero-skulptilo/mezuroj.js";
import { agordiBakon, bazaCanvas, prerenderiBazon, pentri,
  rekalkuliDeklivojn } from "./tero-skulptilo/bako.js";
// ⟪ La akvo 🌊 ⟫ — la fontoj, la deriva akvokalkulo kaj la specimenaj helpiloj
// de la akvo logxas en iloj/tero-skulptilo/tero-skulptilo/akvo.js. La stato
// ( la fontoj, la elekto, la fluo, la nivelo ) legigxas rekte ( la vivaj ligoj
// de ES-moduloj ); sxangxi gxin eblas nur per la agord-funkcioj de la modulo.
import { agordiAkvon, agordiFontojn, agordiElektitanFonton, agordiFontoTrenatan,
  agordiFluoValoron, agordiAkvanNivelon, agordiAkvoTrenantan, markiAkvonMalpuran,
  fontoj, elektitaFonto, fontoTrenata, akvaRezulto, akvoMalpura, akvoTrenanta,
  akvaNiveloValoro, akvaKavoInterp, teraAlto, cxuAkvo, akvaNiveloEn,
  akvaNiveloProksima, rekalkuliAkvon, akvoSxangxigxis,
  fontoCxePunkto, metiFonton, forigiFonton, komenciFontanTrenon,
  sxangiFontanPozicion, finiFontanTrenon, sxangxiFluonDeElektita,
  deriviFontojnElPentrita } from "./tero-skulptilo/akvo.js";
// ⟪ La 3D-vido 🧊 ⟫ — la sceno, la fotilo, la teraj/akvaj meŝoj, la radia
// trafo kaj la penikoj sur la reliefo logxas en
// iloj/tero-skulptilo/tero-skulptilo/vido3d.js. La stato legigxas rekte ( la
// vivaj ligoj de ES-moduloj ); sxangxas gxin nur la agord-funkcioj de tiu
// modulo. La 2D-kanvaso kaj la 3D-kanvaso alternas ( sxaltiVidon ).
import { agordiVidon, triaDimensia, bildilo3d, sceno3d, fotilo3d, regiloj3d,
  teraMesh, kradaGrupo3D, kradaStaciaGrupo3D, vojaGrupo3D,
  mapo3d, gxisdatigi3DMeshon, gxisdatigi3DnIlon,
  gxisdatigi3DnPostPlena, rekonstruiFontojn3D,
  sxaltiVidon } from "./tero-skulptilo/vido3d.js";
// ⟪ La 3D-aspekto de la urbo 🏙️ ⟫ — la krada urbo ( la VERAJ sataloj de la
// ludo, la keŭfĥesoj, la lampoj ) kaj la mond-nivelaj vojoj kiel reala
// 3D-aspekto logxas en iloj/tero-skulptilo/tero-skulptilo/krado3d.js.
import { agordiKradon3D, krada3DKonstruajxoj, rekonstruiKradon3D,
  rekonstruiVojojn3D } from "./tero-skulptilo/krado3d.js";
// ⟪ La objekta ilo 🎯 ⟫ — la metitaj objektoj ( la stato, la listo, la ecoj,
// la 2D-bake kaj la 3D-antaŭrigardo ) logxas en
// iloj/tero-skulptilo/tero-skulptilo/objektoj.js. La stato legigxas rekte ( la
// vivaj ligoj de ES-moduloj ); sxangxas gxin nur la agord-funkcioj de tiu
// modulo. La mapklako kaj la klavaro de la cefa dosiero alvokas la funkciojn.
import { agordiObjektilon, agordiObjektojn, agordiElektitanObjekton,
  objektoj, objektaModo, objektaIlo, objektaTrenata, elektitaObjekto,
  objektoPanel, objektaBakaKanvaso, objektaAntauxRenderilo, objektaAntauxSceno,
  objektaAntauxFotilo, objektaAntauxGrupo, gxisdatigiKoordinatojn,
  rekonstruiObjektojn, gxisdatigiObjektoListon, gxisdatigiObjektoPropOJn,
  sxaltiObjektojn, sxargiObjektajnEnigojn, rekonstruiObjektanAntauxrigardon,
  objektoCxePunkto, metiObjekton, forigiObjekton, komenciObjektanTrenon,
  sxangiObjektanPozicion, finiObjektanTrenon } from "./tero-skulptilo/objektoj.js";
// ⟪ La Krado-panelo 🏙️ ⟫ — la urboj, la ĉel-redaktado, la aldonaj blokoj, la
// mond-nivelaj vojoj kaj la dokoj logxas en
// iloj/tero-skulptilo/tero-skulptilo/kradaro.js. La stato legigxas rekte ( la
// vivaj ligoj de ES-moduloj ); sxangxas gxin nur la agord-funkcioj.
import { agordiKradaron, agordiDatumojn, agordiUrbojn, agordiElektitanUrbon,
  agordiElektitanAldonanBlokon, agordiVojojn, agordiDokojn,
  urboj, elektitaUrbo, kradoOfsX, kradoOfsZ, kradoTipoElektita, vojoj, dokoj,
  vojaDuonLargho, pontoDuonLargho,
  elektitaAldonaBloko, aldonaTrenata, elektitaVojo, elektitaPunkto, elektitaDoko,
  vojaTrenata, kradaro, kradoPanel, kradoPlano,
  gxisdatigiKradon, gxisdatigiUrboElektilon, elektiUrbon, gxisdatigiAldonaBlokojn,
  aldonaBlokoCxePunkto, komenciAldonaTrenon, sxangiAldonaPozicion, finiAldonaTrenon,
  gxisdatigiVojajnRegilojn, urboCxePunkto, sxangxiVojanCelon, sxangiVojaPozicion,
  finiVojaTrenon, sxangxiKradanCelon,
  desegniKradanTavolon } from "./tero-skulptilo/kradaro.js";
import * as THREE from "three";

// ════════════════════════ La skulpta krado ════════════════════════
const PASO = SKULPTA_PASO;
const N = SKULPTA_N;
const X0 = SKULPTA_ORIGINO[0], Z0 = SKULPTA_ORIGINO[1];
const deltoj = new Float32Array(N * N);       // deltoj en mondo-unuoj
const masko = new Uint8Array(N * N);          // la MALNOVA pentrita akvo ( 0/1 ) — nun nur la basenaj semoj
// La akvofontoj — { x, z, fluo } ( la akvo estas deriva de ili ). La fonta
// stato ( la fontoj, la elekto, la treno, la fluo, la nivelo ) logxas en
// tero-skulptilo/akvo.js — la cefa dosiero legas gxin rekte, kaj sxangxas gxin
// nur per la agord-funkcioj ( agordiFontojn, agordiElektitanFonton, ... ).
agordiFontojn(Array.isArray(SKULPTA_AKVOFONTOJ) ? SKULPTA_AKVOFONTOJ.map(f => ( { ...f } )) : []);
const biomoj = new Uint8Array(N * N);         // pentrita biomo ( 0=aŭtomata, 1=montaro, 2=valo, 3=ebenaĵo, 4=akvaj-plantoj, 5=ekvizeto )
const bestoj = new Uint8Array(N * N);         // pentritaj bestaj zonoj ( 0=aŭtomata, 1=akvaj bestoj, 2=petreloj )
// Metitaj objektoj — la objekta ilo ( APARTA de la penikoj ) metas individuajn
// objektojn ( plantojn, bestojn, NPC-ojn ) cxe precizaj pozicioj kun ecoj. La
// stato ( la listo, la elekto, la sub-ilo, la ecoj ), la 2D-bake kaj la
// 3D-antaŭrigardo logxas en iloj/tero-skulptilo/tero-skulptilo/objektoj.js —
// la cefa dosiero legas ilin rekte, kaj sxangxas ilin nur per la agord-funkcioj
// ( agordiObjektojn, agordiElektitanObjekton ).

const ORA_MATERIALO = kreiOranMaterialon(0xd8b068);
// La pordo de la kosmosxipo — la sama vitro kiel en la ludo ( kreiFenestranMaterialon ).
const ENIRA_MATERIALO = kreiFenestranMaterialon();
// La diorita materialo de la lampoj ( hxeuxfoj ) — unu komuna ekzemplero, kiun
// konstruiHxeuxfojn klonas por la lampaj kolonoj/bovloj ( kiel en la ludo ).
let DIORITA_MATERIALO = null;
function dioritaMaterialo() {
  if ( !DIORITA_MATERIALO ) DIORITA_MATERIALO = kreiDioritanMaterialon();
  return DIORITA_MATERIALO;
}

// ⟪ La formo de la mondo 📃 ⟫ — la randaj punktoj de la formo ( la cirklo, la
// rondigita kvadrato aŭ la rondigita triangulo ) por la 2D-mapo. La formo venas
// de la mapo-registro kaj estas redaktebla en la mapo-panelo.
// La rando-punktoj de la mondo ( formajRandaj ) — dosieroj.js.
// ⟪ La 2D-bako 📃 ⟫ — la mondkanvaso, la ombrado kaj la koloroj logxas en
// tero-skulptilo/bako.js; la mezuroj de la mondkanvaso ( MONDO, MONDO_HALFO,
// REZ ) venas el tero-skulptilo/mezuroj.js. La bako ricevas la skulptan staton
// ĉi tie — la tabelojn, la specimenajn helpilojn kaj la aktivan penikon ( la
// lastaj tri estas FUNKCIOJ, ĉar la stato sxangxigxas dum la uzo ).
agordiBakon({
  deltoj, masko, biomoj, bestoj, N, PASO, X0, Z0,
  deltoInterp, maskoInterp, akvaKavoInterp, akvaNiveloEn, cxuAkvo, akvaNiveloProksima,
  peniko: () => penikoAktiva,
  besto: () => bestoAktiva,
});

// La akvo — la sama unufoja kunligo kiel la bako. La fontoj kaj la deriva
// stato logxas en akvo.js; cxi tie pasas la referencojn kaj la statstatusajn
// fermojn ( la historio, la statusa linio, la desegno kaj la glitilo fluo ).
agordiAkvon({
  masko, deltoj, deltoInterp, N, PASO, X0, Z0, nivelo: SKULPTA_AKVA_NIVELO,
  formo: () => [ mapoFormo, mapoGrandeco ],
  momenti, statuso, gxisdatigiValorojn,
  gxisdatigiAkvajnStatistikojn, rekonstruiFontojn3D,
  gxisdatigiPlenan2Dn, gxisdatigi3DnPostPlena,
  fluoRegilo: () => fluoRegilo,
  markiSxangxitan: () => { sxangxita = true; },
  markiDesegnon: () => { bezonoDesegno = true; },
});

// La 3D-vido — la sama unufoja kunligo kiel la bako kaj la akvo. La sceno kaj
// la meŝoj logxas en vido3d.js; cxi tie pasas la redaktilon ( la penikoj, la
// historio, la statuso, la objektoj kaj la krada aspekto ). La du agordaj
// valoroj ( radiuso, forto ) estas FUNKCIOJ, ĉar ili legas la glitilojn.
agordiVidon({
  deltoj, deltoInterp, N, PASO, X0, Z0,
  formo: () => [ mapoFormo, mapoGrandeco ],
  peniko: () => penikoAktiva, radiuso: () => radiuso(), forto: () => forto(),
  penikoApliki,
  agordiPlatiganCelon: ( v ) => { platigaCelo = v; },
  momenti, statuso,
  markiSxangxitan: () => { sxangxita = true; },
  markiDesegnon: () => { bezonoDesegno = true; },
  cxuMovigi, gxisdatigiKursoro, gxisdatigiKoordinatojn,
  aktivaTabo: () => aktivaTabo, vojojAktiva,
  objektaModo: () => objektaModo, objektaIlo: () => objektaIlo,
  objektaTrenata: () => objektaTrenata,
  objektoCxePunkto, metiObjekton, forigiObjekton,
  komenciObjektanTrenon, sxangiObjektanPozicion, finiObjektanTrenon,
  rekonstruiObjektojn, rekonstruiKradon3D, rekonstruiVojojn3D,
});

// La 3D-aspekto de la urbo — la sama unufoja kunligo kiel la bako, la akvo
// kaj la vido. La veraj sataloj, la keŭfĥesoj, la lampoj kaj la mond-nivelaj
// vojoj logxas en krado3d.js; cxi tie pasas la kradan staton ( la urboj, la
// vojoj, la dokoj, la ofseto, la langeto ), la materialojn kaj la samajn
// helpilojn kiel la bako. La stato sxangxigxas dum la uzo, do gxi legigxas
// per FUNKCIOJ.
agordiKradon3D({
  deltoInterp, pontoDuonLargho, kradoPlano, dioritaMaterialo, vojojAktiva,
  ORA_MATERIALO,
  urboj: () => urboj, elektitaUrbo: () => elektitaUrbo,
  vojoj: () => vojoj, dokoj: () => dokoj,
  kradoOfsX: () => kradoOfsX, kradoOfsZ: () => kradoOfsZ,
  aktivaTabo: () => aktivaTabo,
});

// La objekta ilo — la sama unufoja kunligo kiel la bako, la akvo, la vido kaj
// la krado. La stato, la listo kaj la scenoj logxas en objektoj.js; cxi tie
// pasas la redaktilon ( la historio, la statuso, la langetoj, la kursoro ) kaj
// la komunajn materialojn. La zomo estas FUNKCIO, ĉar gxi sxangxigxas dum la
// uzo kaj gxi estas difinita sube.
agordiObjektilon({
  deltoInterp, maskoInterp, N, PASO, X0, Z0,
  vidSkalo: () => vidSkalo,
  ORA_MATERIALO, ENIRA_MATERIALO, dioritaMaterialo,
  momenti, statuso,
  markiSxangxitan: () => { sxangxita = true; },
  markiDesegnon: () => { bezonoDesegno = true; },
  gxisdatigiPenikaron, sxaltiIlTabon, gxisdatigiAgordojn, gxisdatigiKursoro,
});

// La Krado-panelo — la sama unufoja kunligo kiel la aliiloj. La stato ( la
// urboj, la vojoj, la dokoj ) kaj la tuta panelo logxas en kradaro.js; cxi tie
// pasas la vido ( la centro kaj la zomo ), la historion, la statusan linion kaj
// la du markilojn de la redaktilo. La vido sxangxigxas dum la uzo, do gxi
// legigxas per FUNKCIOJ.
agordiKradaron({
  vidCX: () => vidCX, vidCZ: () => vidCZ, vidSkalo: () => vidSkalo,
  momenti, statuso,
  markiSxangxitan: () => { sxangxita = true; },
  markiDesegnon: () => { bezonoDesegno = true; },
});

// ════════════════════════ Vido kaj eventoj ════════════════════════
const mapo = document.getElementById("mapo");
const mapoKunteksto = mapo.getContext("2d");
// La loka stilfolio ( stiloj.css ) plenigas la larghon — la kursoro kaj
// touch-action estas funkciaj ( penikado kaj trenado sur la kanvaso ).
mapo.style.cursor = "crosshair";
mapo.style.touchAction = "none";
// La vido-ilo Movigi ✋ uzas la saman kanvason — la kursoro ŝanĝigxas per
// gxisdatigiKursoro ( prena mano anstataux celkruco ).
let vidCX = 0, vidCZ = 0, vidSkalo = minimaSkalo();   // mondcentro kaj pikseloj/unuo
// minimaSkalo — la malplej zomo ( la tuta mondo videbla kun larĝa bordo, por
// ke oni povu rigardi iomete preter la randoj ).
function minimaSkalo(){ return Math.min(mapo.width, mapo.height) / ( MONDO + 0o200 ); }
// alpingiVidon — tenu la videblan rektangulon sur la skulpta krado, kun eta
// libereco preter la randoj ( 64 unuoj — oni povas rigardi iomete eksteren ).
function alpingiVidon(){
  const duonw = mapo.width / vidSkalo / 2;
  const duonh = mapo.height / vidSkalo / 2;
  const ekstero = 0o100;
  // Se la vido estas pli larĝa ol la krado plus la libereco, ne ekzistas
  // pozicio kie gxi tute enestas — centru gxin sur la mondo.
  vidCX = duonw >= MONDO_HALFO + ekstero ? 0 : Math.max(-( MONDO_HALFO + ekstero - duonw ), Math.min(MONDO_HALFO + ekstero - duonw, vidCX));
  vidCZ = duonh >= MONDO_HALFO + ekstero ? 0 : Math.max(-( MONDO_HALFO + ekstero - duonh ), Math.min(MONDO_HALFO + ekstero - duonh, vidCZ));
}
let kursoro = null;                             // la lasta musa mondopozicio
let treno = null;                               // { tipo, lastX, lastZ, ... }
let platigaCelo = null;                         // cel-alto por la platiga peniko
let bezonoDesegno = true;

// ════════════════════════ Historio ( malfari/refari ) ════════════════════════
const historio = [];
const refaraHistorio = [];
// statoMomento — la TUTA redaktebla stato por unu historio-paŝo — ankaŭ la
// krado ( la urboj kun iliaj superoj ), la vojoj kaj la dokoj, ne nur la
// tereno kaj la objektoj. La savo kaj la re-parzigo de urboj/vojoj/dokoj
// cirkulas ( cirkuloDeDatumojValidas ), do la profunda JSON-kopio sufiĉas.
function statoMomento(){
  return {
    deltoj: deltoj.slice(), masko: masko.slice(), biomoj: biomoj.slice(), bestoj: bestoj.slice(),
    fontoj: fontoj.map(f => ( { ...f } )), fontaElekto: elektitaFonto,
    objektoj: objektoj.map(o => ( { ...o } )), objektaElekto: elektitaObjekto, nivelo: akvaNiveloValoro,
    urboj: JSON.parse(JSON.stringify(urboj)), elektitaUrbo,
    vojoj: JSON.parse(JSON.stringify(vojoj)), dokoj: JSON.parse(JSON.stringify(dokoj)),
  };
}
function momenti(){
  refaraHistorio.length = 0;
  historio.push(statoMomento());
  if ( historio.length > 0o40 ) historio.shift();
}
function restoriStaton(s) {
  deltoj.set(s.deltoj);
  masko.set(s.masko);
  biomoj.set(s.biomoj);
  bestoj.set(s.bestoj);
  // La akvofontoj kaj la elektita fonto — la akvo rekalkuligxos sube.
  agordiFontojn(s.fontoj ? s.fontoj.map(f => ( { ...f } ) ) : []);
  agordiElektitanFonton(s.fontaElekto ?? -1);
  agordiFontoTrenatan(-1);
  markiAkvonMalpuran();
  agordiObjektojn(s.objektoj ? s.objektoj.slice() : []);
  agordiElektitanObjekton(s.objektaElekto ?? -1);
  if ( s.urboj && s.urboj.length ) agordiUrbojn(s.urboj);
  if ( s.vojoj && s.vojoj.length ) agordiVojojn(s.vojoj);
  if ( s.dokoj && s.dokoj.length ) agordiDokojn(s.dokoj);
  // La krada stato — elektiUrbon ŝargas la urbon ( grandeco, ofseto, la
  // superoj ) en la regilojn kaj rekonstruas la planon.
  agordiElektitanUrbon(Math.max(0, Math.min(s.elektitaUrbo ?? 0, urboj.length - 1)));
  gxisdatigiObjektoListon();
  rekonstruiObjektojn();
  agordiAkvanNivelon(s.nivelo);
  niveloRegilo.value = akvaNiveloValoro;
  gxisdatigiValorojn();
  gxisdatigiUrboElektilon();
  elektiUrbon(elektitaUrbo);
  gxisdatigiVojajnRegilojn();
  // La akvo ( la fontoj kaj la nivelo sxangxigxis ) — rekalkulu kaj redesegnu.
  rekalkuliAkvon();
  sxangxita = true;
}
function malfari(){
  if ( !historio.length ) return;
  refaraHistorio.push(statoMomento());
  restoriStaton(historio.pop());
}
function refari(){
  if ( !refaraHistorio.length ) return;
  historio.push(statoMomento());
  restoriStaton(refaraHistorio.pop());
}

// ════════════════════════ Kradaj samploj ════════════════════════
// La krada interpolo ( katmullRom ). Glata C1 kurbo sen la diagonalaj faldoj de
// la dulineara interpolo — la montodeklivoj ne montras krestojn laŭ la
// krad-diagonaloj. La kurbo venas de la komuna modulo kantaoj/komunajxoj/interpolo.ts, la sama
// kiel la ludo kaj la specioj, do la kopioj ne povas devojiĝi.
// deltoInterp — Dukuba ( Katmull-Rom ) interpolo super la skulpta krado. La
// valoro cxe kradnodoj restas ekzakte la ĉela valoro; inter la nodoj la
// surfaco estas glata C1 — sen la dulinearaj diagonalaj krestoj.
function deltoInterp(x, z) {
  const fx = ( x - X0 ) / PASO;
  const fz = ( z - Z0 ) / PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const cxelo = ( i, j ) => deltoj[Math.max(0, Math.min(N - 1, j)) * N + Math.max(0, Math.min(N - 1, i))];
  const vico = ( j ) => katmullRom(cxelo(i0 - 1, j), cxelo(i0, j), cxelo(i0 + 1, j), cxelo(i0 + 2, j), u);
  return katmullRom(vico(j0 - 1), vico(j0), vico(j0 + 1), vico(j0 + 2), v);
}
function maskoInterp(x, z) {
  const fx = Math.max(0, Math.min(N - 1, ( x - X0 ) / PASO));
  const fz = Math.max(0, Math.min(N - 1, ( z - Z0 ) / PASO));
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const i1 = Math.min(i0 + 1, N - 1), j1 = Math.min(j0 + 1, N - 1);
  const a = masko[j0 * N + i0], b = masko[j0 * N + i1];
  const c = masko[j1 * N + i0], d = masko[j1 * N + i1];
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

function deltoCxelo(ix, iz) {
  const ii = Math.max(0, Math.min(N - 1, ix));
  const jj = Math.max(0, Math.min(N - 1, iz));
  return deltoj[jj * N + ii];
}

// ════════════════════════ Penikoj ════════════════════════
let penikoAktiva = "levi";
let biomoAktiva = 1;           // la sub-peniko de la biomo-ilo ( 1=montaro, 2=valo, 3=ebenaĵo, 4=akvaj-plantoj, 5=ekvizeto, 0=aŭtomata )
let bestoAktiva = 1;           // la sub-peniko de la besto-ilo ( 1=akvaj bestoj, 2=petreloj, 4=NPC-oj )
let bestoForvisxa = false;      // ĉu la besto-ilo FORVIŜAS ( la sama ilo ) anstataŭ pentras
// movigi — la vido-ilo. En la 2D-mapo gxi trenas la mapon, en la 3D-vido gxi
// turnas la fotilon. La peniko-aplikado neniam ricevas gxin — la okazaĵoj
// traktas gxin aparte — sed la aktiva-ilo logiko restas komuna.
function cxuMovigi(){ return penikoAktiva === "movigi"; }
const radiuso = () => +radiusoRegilo.value;
const forto = () => +fortoRegilo.value;

function penikoApliki(cx, cz, r, fortoVal, tipo, tuŝitaj) {
  const ix0 = Math.max(0, Math.floor(( cx - r - X0 ) / PASO));
  const ix1 = Math.min(N - 1, Math.floor(( cx + r - X0 ) / PASO));
  const iz0 = Math.max(0, Math.floor(( cz - r - Z0 ) / PASO));
  const iz1 = Math.min(N - 1, Math.floor(( cz + r - Z0 ) / PASO));
  for ( let iz = iz0; iz <= iz1; iz++ ) {
    const z = Z0 + iz * PASO;
    for ( let ix = ix0; ix <= ix1; ix++ ) {
      const x = X0 + ix * PASO;
      const d = Math.hypot(x - cx, z - cz);
      if ( d > r ) continue;
      const f = 1 - ( d / r ) * ( d / r );       // glata fado al la rando
      const idx = iz * N + ix;
      // Ĉiu ĉelo ricevas la penikon unufoje po penikstreko — la interpolo
      // ( paŝo 0.6 ) alie amasigus la forton gxis ~0o50 oble po rapida treno,
      // kaj unu svingo levis la terenon je dekoj da unuoj. La unua ektuŝo de
      // movigxa peniko cxiam estas la BRUSO-RANDO ( f ≈ 0 ), do la ĉelo
      // registrigxas la plej fortan trafikon ( maksimuma f ), ne la unuan.
      const malnovaF = tuŝitaj.get(idx);
      if ( malnovaF !== undefined && f <= malnovaF ) continue;
      // Apliku nur la INCREMENTON inter la malnova kaj la nova forto — la
      // ĉelo tiam ricevas entute fortoVal × f_maks po streko ( ne la sumon de
      // cxiuj pasantaj aplikaĵoj ). La plata/glata peniko tiel glatigxas per
      // unu eta lerpo po streko anstataŭ tuj plena al la celo.
      const df = malnovaF === undefined ? f : f - malnovaF;
      tuŝitaj.set(idx, f);
      if ( tipo === "levi" ) {
        deltoj[idx] += fortoVal * 2 * df;
      } else if ( tipo === "malsuprenigi" ) {
        deltoj[idx] -= fortoVal * 2 * df;
      } else if ( tipo === "platigi" && platigaCelo !== null ) {
        const nova = platigaCelo - bazaAlteco(x, z);
        deltoj[idx] += ( nova - deltoj[idx] ) * fortoVal * df;
      } else if ( tipo === "glatigi" ) {
        const mezo = ( deltoCxelo(ix - 1, iz) + deltoCxelo(ix + 1, iz)
          + deltoCxelo(ix, iz - 1) + deltoCxelo(ix, iz + 1) ) / 4;
        deltoj[idx] += ( mezo - deltoj[idx] ) * fortoVal * df;
      } else if ( tipo === "forvisxi" ) {
        deltoj[idx] = 0;
        masko[idx] = 0;
      } else if ( tipo === "biomo" ) {
        // La biomo-ilo PENTRAS la biomon rekte sur la biomo-tavolon. La
        // akvaj biomoj ( 4=akvaj-plantoj, 5=ekvizeto ) ekzistas nur SUR la
        // akvo — la peniko pentras ilin nur en akvaj ĉeloj; la teraj biomoj
        // ( 1=montaro, 2=valo, 3=ebenaĵo ) neniam pentrigxas sur akvo.
        // Aŭtomata forigas la pentraĵon cxiu loke. La tero mem NE ŝanĝiĝas.
        const akva = masko[idx] === 1;
        if ( biomoAktiva === 0 ) biomoj[idx] = 0;
        else if ( biomoAktiva >= 4 ? akva : !akva ) biomoj[idx] = biomoAktiva;
      } else if ( tipo === "bestoj" ) {
        // La besto-ilo PENTRAS la bestajn zonojn sur la besta-tavolon kiel
        // BITOJ. 1=akvaj bestoj, 2=petreloj, 4=NPC-oj — ĉelo povas teni
        // PLURAJN samtempe, do pentri la duan specion sur la unua KOMBINAS
        // ilin. La akvaj bestoj naĝas nur en akvo ( akvaj ĉeloj ); la
        // petreloj povas flugi super ajna loko ( tero AUX akvo ); la NPC-oj
        // piediras nur sur tero ( NENIAM sur akvo ). La forviŝo ( la SAMA
        // ilo, sxaltita per la butono Forviŝi 🧽 en la paletro ) forigas NUR
        // la elektitan specion — la ceteraj restas. La tero mem NE ŝanĝiĝas.
        const akva = masko[idx] === 1;
        if ( bestoForvisxa ) bestoj[idx] &= ~bestoAktiva;
        else if ( bestoAktiva === 1 ? akva : bestoAktiva === 4 ? !akva : true ) bestoj[idx] |= bestoAktiva;
      }
      // "movigi" ne estas peniko — la okazaĵoj traktas gxin aparte.
    }
  }
  return { ix0, ix1, iz0, iz1 };
}
function penikoPasxo(cx, cz) {
  const t = treno;
  const disto = Math.hypot(cx - t.lastX, cz - t.lastZ);
  const pasoj = Math.max(1, Math.ceil(disto / 0.6));
  for ( let k = 1; k <= pasoj; k++ ) {
    const px = t.lastX + ( cx - t.lastX ) * k / pasoj;
    const pz = t.lastZ + ( cz - t.lastZ ) * k / pasoj;
    penikoApliki(px, pz, radiuso(), forto(), penikoAktiva, t.tuŝitaj);
  }
  // La malnova punkto antaŭ la gxisdatigo — la pentrado kovru la TUTAN
  // vojon de la stroko, ne nur la nunan punkton ( t.lastX sxangxigxas
  // tuj poste, do max( lastX, cx ) estus cxiam nur cx ).
  const deX = t.lastX, deZ = t.lastZ;
  t.lastX = cx; t.lastZ = cz;
  sxangxita = true;
  // La tereno sxangxigxis — la akvo ( la basenoj, la riveroj, la eltrancxoj )
  // dependas de gxi, do la akvo rekalkuligxos cxe la fino de la penikstreko.
  markiAkvonMalpuran();
  statuso("Nesavitaj ŝanĝoj");
  const r = radiuso();
  const px0 = Math.max(0, Math.min(REZ - 1, mondoxAlPikselo(Math.max(deX, cx) + r + 1)));
  const px1 = Math.max(0, Math.min(REZ - 1, mondoxAlPikselo(Math.min(deX, cx) - r - 1)));
  const py0 = Math.max(0, Math.min(REZ - 1, mondozAlPikselo(Math.max(deZ, cz) + r + 1)));
  const py1 = Math.max(0, Math.min(REZ - 1, mondozAlPikselo(Math.min(deZ, cz) - r - 1)));
  rekalkuliDeklivojn(px0 - 2, py0 - 2, px1 + 2, py1 + 2);
  pentri(px0, py0, px1, py1);
  bezonoDesegno = true;
}

// ════════════════════════ Pentrado ════════════════════════

// La akvo estas NUR la pentrita masko — la sama decido kiel la ludo
// ( tereno.ts — akvo() = skulptitaAkvo() ). La malnova natura ( procedura )
// akvo de la rivero kaj la lago estas bakita EN la maskon de la skulptilo,
// do neniu aparta natura akvo-tavolo plu ekzistas.


// gxisdatigiPlenan2Dn — plena rekalkulado de la ombro kaj de la 2D-bildo.
function gxisdatigiPlenan2Dn(){
  rekalkuliDeklivojn(0, 0, REZ - 1, REZ - 1);
  pentri(0, 0, REZ - 1, REZ - 1);
  bezonoDesegno = true;
}

function desegniVidon(){
  const k = mapoKunteksto;
  const duonw = mapo.width / 2, duonh = mapo.height / 2;
  // Mondo → ekrano. Nordo ( +z ) supre, oriento ( −x ) dekstren — la sama
  // orientiĝo kiel la minimapo de la ludo.
  const sxMondo = ( x ) => duonw - ( x - vidCX ) * vidSkalo;
  const syMondo = ( z ) => duonh - ( z - vidCZ ) * vidSkalo;
  k.imageSmoothingEnabled = true;
  // La ĉiela fono — la sama helblua tono kiel la 3D-vido. La tereno kovras
  // la tutan mondon; la ĉielo videblas ĉe la randoj kaj preter la mondo.
  k.fillStyle = "#a8d0e8";
  k.fillRect(0, 0, mapo.width, mapo.height);
  // La baza kanvaso havas okcidenton maldekstre ( pixel 0 = x +MONDO_HALFO )
  // kaj nordon supre ( pixel 0 = z +MONDO_HALFO ).
  k.drawImage(bazaCanvas, sxMondo(MONDO_HALFO), syMondo(MONDO_HALFO), MONDO * vidSkalo, MONDO * vidSkalo);
  // ⟪ La formo de la mondo 📃 ⟫ — la mondo ne estas la tuta datumkrado. La
  // ekstero de la formo ( la cirklo, la rondigita kvadrato aŭ la rondigita
  // triangulo ) malheliĝas sub hela tavolo — la ludo tute ne havas tiun terenon —
  // kaj la rando ricevas linion, do oni vidas, kie la mondo finiĝas.
  const formoVojo = new Path2D();
  const formoEkstero = new Path2D();
  formoEkstero.rect(0, 0, mapo.width, mapo.height);
  formoVojo.moveTo(sxMondo(formajRandaj[0][0]), syMondo(formajRandaj[0][1]));
  for ( let i = 1; i < formajRandaj.length; i++ ) {
    formoVojo.lineTo(sxMondo(formajRandaj[i][0]), syMondo(formajRandaj[i][1]));
  }
  formoVojo.closePath();
  formoEkstero.addPath(formoVojo);
  k.fillStyle = "rgba(228,236,240,0.74)";
  k.fill(formoEkstero, "evenodd");
  k.strokeStyle = "rgba(255,255,255,0.92)";
  k.lineWidth = 2;
  k.stroke(formoVojo);
  // La metitaj objektoj — la suprajn bake de la VERAJ 3D-meshxoj ( kiel la
  // plena mapo de la ludo ), travidebla super la tereno.
  if ( objektaBakaKanvaso && objektoj.length > 0 ) {
    // La bake havas okcidenton maldekstre ( imgX 0 = x +MONDO_HALFO ) kaj
    // nordon supre — la sama orientiĝo kiel la baza kanvaso, do gxi ankrigxas
    // cxe sxMondo(MONDO_HALFO) kiel la bazo. ( La antaŭa ankro sxMondo(-MONDO_HALFO)
    // metis la bake-tavolon sur la malĝustan flankon — ekster la ekrano cxe
    // granda zomo. )
    k.drawImage(objektaBakaKanvaso,
      sxMondo(MONDO_HALFO), syMondo(MONDO_HALFO), MONDO * vidSkalo, MONDO * vidSkalo);
  }
  // La krada urbo — vojoj, spronoj kaj konstruaĵoj super la tereno.
  // Montriĝas NUR dum la Krado-langeto 🏙️ estas aktiva ( la konstruaĵoj ne
  // montriĝu sur la mapo alie ). La planaj koordinatoj estas relativaj al la
  // krada centro; la ofseto metas la kradon en la mondon.
  if ( aktivaTabo === "krado" ) {
    desegniKradanTavolon(k, kradoPlano(), x => sxMondo(x + kradoOfsX), z => syMondo(z + kradoOfsZ), vidSkalo);
    // La urbaj markiloj — ĉiu urbo de SKULPTA_URBOJ kiel diamanto kun la
    // nomo, la elektita urbo reliefigita. Klako sur markilon elektas la urbon
    // ( la pointerdown de la mapo ). La markiloj estas fiks-ampleksaj sur la
    // ekrano, por resti legeblaj ĉe ajna zomo.
    urboj.forEach(( u, i ) => {
      const sx = sxMondo(u.ofsX), sy = syMondo(u.ofsZ);
      const elektita = i === elektitaUrbo;
      k.fillStyle = elektita ? "rgba(255,214,64,0.95)" : "rgba(255,255,255,0.85)";
      k.beginPath();
      k.moveTo(sx, sy - 7);
      k.lineTo(sx + 7, sy);
      k.lineTo(sx, sy + 7);
      k.lineTo(sx - 7, sy);
      k.closePath();
      k.fill();
      k.strokeStyle = elektita ? "#e0b840" : "rgba(0,0,0,0.5)";
      k.lineWidth = elektita ? 0o5/0o2 : 1;
      k.stroke();
      k.font = "bold 12px sans-serif";
      k.textAlign = "center";
      k.textBaseline = "bottom";
      k.lineWidth = 3;
      k.strokeStyle = "rgba(0,0,0,0.85)";
      k.strokeText(u.nomo, sx, sy - 10);
      k.fillStyle = elektita ? "#f8e8a8" : "#ffffff";
      k.fillText(u.nomo, sx, sy - 10);
    });
    // La dokaj platformoj de la ĉefa urbo — malgrandaj kvadratoj cxe la
    // dokaj x-pozicioj ( la kajo kaj la avenuo montrigxas en la plano ).
    if ( elektitaUrbo === 0 ) {
      for ( const d of dokoj ) {
        const dx = d.x;
        const sx = sxMondo(dx), sy = syMondo(d.z);
        k.fillStyle = "rgba(200,160,80,0.9)";
        k.fillRect(sx - 4, sy - 4, 8, 8);
        k.strokeStyle = "rgba(0,0,0,0.5)";
        k.lineWidth = 1;
        k.strokeRect(sx - 4, sy - 4, 8, 8);
      }
    }
    // La aldonaj blokoj — la elektita bloko reliefigita per ringo ( la
    // konstruajxo mem montrigxas en la plano ). La klako sur la markilon
    // elektas gxin kaj la treno movas gxin.
    const uAld = urboj[elektitaUrbo];
    const aldonaj = uAld && uAld.aldonajBlokoj ? uAld.aldonajBlokoj : [];
    aldonaj.forEach(( b, i ) => {
      const bx = sxMondo(kradoOfsX + b.x), bz = syMondo(kradoOfsZ + b.z);
      if ( i === elektitaAldonaBloko ) {
        k.strokeStyle = "#f8e8a8";
        k.lineWidth = 0o5/0o2;
        k.beginPath();
        k.arc(bx, bz, 9, 0, Math.PI * 2);
        k.stroke();
        k.lineWidth = 1;
      }
    });
    // La keŭfĥesoj — kvar sespintaj steloj ĉirkaŭ la centro ( montriĝas nur
    // kiam la redaktata urbo havas ilin ), same kiel en la 3D-vido.
    if ( uAld && uAld.keuxfhxeso ) {
      const R = 0o10;
      k.fillStyle = "rgba(150,210,220,0.95)";
      k.strokeStyle = "rgba(0,0,0,0.4)";
      k.lineWidth = 1;
      for ( let i = 0; i < 4; i++ ) {
        const a = Math.PI / 4 + i * Math.PI / 2;
        const sx = sxMondo(kradoOfsX + Math.cos(a) * R), sy = syMondo(kradoOfsZ + Math.sin(a) * R);
        k.beginPath();
        for ( let q = 0; q < 6; q++ ) {
          const ang = a + q * Math.PI / 3;
          const px = sx + Math.cos(ang) * 4, py = sy + Math.sin(ang) * 4;
          if ( q === 0 ) k.moveTo(px, py); else k.lineTo(px, py);
        }
        k.closePath();
        k.fill();
        k.stroke();
      }
    }
    // La kradaj strato-lampoj — la kvar-lampa ŝablono ĉirkaŭ la placo-nodoj
    // kaj la kruciĝoj ( la sama geometrio kiel la ludo, de la plano ). Varmaj
    // flavaj punktoj kun hela kerno, kiel la lampo-glowo en la 3D-vido.
    if ( uAld && uAld.lampoj !== false ) {
      const plano = kradoPlano();
      for ( const l of plano.lampoj ) {
        const sx = sxMondo(kradoOfsX + l.x), sy = syMondo(kradoOfsZ + l.z);
        k.fillStyle = "rgba(248,168,72,0.95)";
        k.beginPath();
        k.arc(sx, sy, 2.2, 0, Math.PI * 2);
        k.fill();
        k.fillStyle = "rgba(248,232,184,0.95)";
        k.beginPath();
        k.arc(sx, sy, 1.1, 0, Math.PI * 2);
        k.fill();
      }
    }
  }
  // La Vojoj sub-langeto de la Krado-panelo — la mondaj vojoj kaj dokoj
  // redaktataj sur la mapo, super la krada urbo ( por ke oni povu konekti
  // ilin al la urbo ). La sama aspekto kiel la plena mapo de la ludo —
  // helgrizaj vojoj kun malhelaj andezitaj bordoj kaj la dokaj platformoj.
  if ( vojojAktiva() ) {
    // La vojoj — dikaj polilinioj. La ekstera malhela strio ( la andezita
    // bordo, same larĝo kaj la voja duono ) kaj la hela diorita centro, kun
    // rondaj finoj kiel la ludaj kapoj. La elektita vojo reliefigxas.
    for ( let vi = 0; vi < vojoj.length; vi++ ) {
      const v = vojoj[vi];
      if ( !v.punktoj || v.punktoj.length < 2 ) continue;
      const elektita = vi === elektitaVojo;
      const duono = vojaDuonLargho( v ) * 2;
      const centro = ( v.larĝo || 0o7/0o2 ) / 2;
      const punktoj = v.punktoj.map(p => [ sxMondo(p[0]), syMondo(p[1]) ]);
      const spuro = ( larĝo, koloro ) => {
        k.strokeStyle = koloro;
        k.lineWidth = Math.max(1, larĝo * vidSkalo);
        k.lineCap = "round";
        k.lineJoin = "round";
        k.beginPath();
        punktoj.forEach(( p, i ) => i === 0 ? k.moveTo(p[0], p[1]) : k.lineTo(p[0], p[1]));
        k.stroke();
      };
      spuro(duono, elektita ? "rgba(120,140,120,0.95)" : "rgba(90,98,88,0.9)");
      spuro(centro, elektita ? "rgba(255,232,150,0.95)" : "rgba(216,216,208,0.95)");
      // La punktoj — la elektita punkto reliefigita.
      punktoj.forEach(( p, i ) => {
        const aktiva = elektita && i === elektitaPunkto;
        k.fillStyle = aktiva ? "#f8e8a8" : "rgba(255,255,255,0.9)";
        k.beginPath();
        k.arc(p[0], p[1], aktiva ? 5 : 0o7/0o2, 0, Math.PI * 2);
        k.fill();
        k.strokeStyle = "rgba(0,0,0,0.5)";
        k.lineWidth = 1;
        k.stroke();
      });
    }
    // La dokaj platformoj — la diorita centro kun la andezita kadro ( la
    // samaj mezuroj kiel en doko.ts — larĝo 0o16/0o10, kadro 0o4/0o10 ).
    // ⟨ La turno 📃 ⟩ — la platformo mem estas rektangulo, sed la TURNO ( la
    // sama rotacio kiel en la ludo ) decidas, al kiu flanko la pinto montras,
    // do la desegno turniĝas ĉirkaŭ la doka centro. La monda turno θ iĝas
    // ekrana turno −θ ( la mapo spegulas la x-akson: oriento dekstren = −x ).
    // La pinto ( la akva, rondigita flanko ) portas malgrandan bluan markon,
    // por ke oni vidu la direkton de la doko eĉ kiam la kajo ne montriĝas
    // ( la pinto kuŝas ĉe la loka −z, do SUB la centro sur la mapo ).
    for ( let di = 0; di < dokoj.length; di++ ) {
      const d = dokoj[di];
      const elektita = di === elektitaDoko;
      const w = 0o16/0o10, prof = d.profundo || 16, kadro = 0o4/0o10;
      const rotacio = d.rotacio ?? 0;
      const sxp = sxMondo(d.x), syp = syMondo(d.z);
      k.save();
      k.translate(sxp, syp);
      k.rotate(-rotacio);
      k.fillStyle = elektita ? "rgba(120,140,120,0.95)" : "rgba(90,98,88,0.9)";
      k.fillRect(-( w / 2 + kadro ) * vidSkalo, -( prof / 2 + kadro ) * vidSkalo,
        ( w + 2 * kadro ) * vidSkalo, ( prof + 2 * kadro ) * vidSkalo);
      k.fillStyle = elektita ? "rgba(255,232,150,0.95)" : "rgba(216,216,208,0.95)";
      k.fillRect(-( w / 2 ) * vidSkalo, -( prof / 2 ) * vidSkalo,
        w * vidSkalo, prof * vidSkalo);
      // ⟨ La akva pinto 📃 ⟩ — sago ĉe la akva ( antaŭa ) rando. Sen ĝi doko
      // turnita je π aspektas IDENTE al turnita je 0 ( la platformo estas
      // simetria rektangulo ), do la sago estas la sola signo pri la direkto de
      // la pinto. Ĝi estas desegnita en EKRANaj rastrumeroj ( ne en mond-unuoj ),
      // ĉar la mapo mem estas montrata malgrandigita en la paĝo.
      const pintoY = ( prof / 2 + kadro ) * vidSkalo;
      k.fillStyle = elektita ? "rgba(150,200,240,0.95)" : "rgba(128,170,210,0.9)";
      k.beginPath();
      k.moveTo(0, pintoY + 9);
      k.lineTo(-7, pintoY + 1);
      k.lineTo(7, pintoY + 1);
      k.closePath();
      k.fill();
      k.restore();
    }
  }
  // La penika ringo kaj la centro — ne en la vido-ilo Movigi ✋, nek en la
  // Krado-langeto ( la klako redaktas ĉelon, ne pentras ). En la objekta ilo
  // la ringo havas fiksan malgrandan radiuson ( la objekta piedo ).
  if ( kursoro && !cxuMovigi() && aktivaTabo !== "krado" ){
    const sx2 = sxMondo(kursoro.x);
    const sy2 = syMondo(kursoro.z);
    k.strokeStyle = "rgba(255,255,255,0.8)";
    k.lineWidth = 0o3/0o2;
    k.beginPath();
    k.arc(sx2, sy2, ( objektaModo ? 0o3/0o2 : radiuso() ) * vidSkalo, 0, Math.PI * 2);
    k.stroke();
    k.beginPath();
    k.arc(sx2, sy2, 2, 0, Math.PI * 2);
    k.stroke();
  }
  // La elektita objekto — blanka ringo super la bake.
  if ( elektitaObjekto >= 0 && elektitaObjekto < objektoj.length ) {
    const o = objektoj[elektitaObjekto];
    k.strokeStyle = "#ffffff";
    k.lineWidth = 2;
    k.beginPath();
    k.arc(sxMondo(o.x), syMondo(o.z), 6, 0, Math.PI * 2);
    k.stroke();
  }
  // ⟪ La akvofontoj 📃 ⟫ — la punktoj, de kiuj la akvo elfluas. La mezuro de
  // la punkto sekvas la fluon ( la glitilo ), kaj la elektita fonto havas
  // blankan ringon. La fontoj estas la nura enigo de la akvo — ili montrigxas
  // cxiame, sed la reliefigo estas pli forta dum la akva ilo.
  for ( let i = 0; i < fontoj.length; i++ ) {
    const f = fontoj[i];
    const elektita = i === elektitaFonto;
    const akvaIlo = penikoAktiva === "akvo" || penikoAktiva === "akvoforvisxi";
    const px = sxMondo(f.x), py = syMondo(f.z);
    const r = Math.max(0o7/0o2, ( 1.2 + Math.min(2.4, f.fluo * 0.09) ) * vidSkalo * ( akvaIlo ? 1.25 : 1 ));
    k.beginPath();
    k.arc(px, py, r, 0, Math.PI * 2);
    k.fillStyle = elektita ? "rgba(150,230,255,0.9)" : "rgba(70,170,215,0.78)";
    k.fill();
    k.strokeStyle = elektita ? "#ffffff" : "rgba(240,252,255,0.85)";
    k.lineWidth = elektita ? 0o5/0o2 : 0o3/0o2;
    k.stroke();
    k.beginPath();
    k.arc(px, py, r * 0.35, 0, Math.PI * 2);
    k.fillStyle = "#ffffff";
    k.fill();
  }
}

function buklo(){
  // La klavara movado funkcias en ambaŭ vidoj — gxi ne bezonas la 3D-bildilon.
  moviKlavare();
  // La akvo rekalkuliĝas unufoje po kadro kiam io ŝanĝis ĝin ( la tereno, la
  // fontoj, la nivelo ). Dum FONTA TRENO la kalkulo atendas la finon de la
  // treno — alie ĉiu musmovado rulus la tutan kalkulon ( ~0o50 tikoj, tio
  // estas ~0o5/0o100 He ).
  if ( akvoMalpura && !akvoTrenanta ) rekalkuliAkvon();
  // La vido neniam forlasas la skulptan kradon — ajna treno/zomo/klavera
  // movo estas alpinglita antaux la desegno.
  alpingiVidon();
  if ( bezonoDesegno ) { desegniVidon(); bezonoDesegno = false; }
  if ( triaDimensia && bildilo3d ) {
    regiloj3d.update();
    bildilo3d.render(sceno3d, fotilo3d);
  }
  // La objekta antaŭrigardo — malrapide turniĝanta vido de la elektita speco
  // ( nur dum la objekta ilo estas malfermita — la panelo estas kaŝita alie ).
  if ( objektaAntauxRenderilo && objektaAntauxGrupo && objektaModo ) {
    objektaAntauxGrupo.rotation.y = performance.now() / 1000 * 0.4;
    objektaAntauxRenderilo.render(objektaAntauxSceno, objektaAntauxFotilo);
  }
  requestAnimationFrame(buklo);
}

// ════════════════════════ Klavara movado ════════════════════════
// WASD/aroj movas la fotilon en la 3D-vido ( kaj la mapon en la 2D-vido ),
// Q/E supren/malsupren en la 3D-vido, +/- zomas la 2D-vidon, Shift rapidigas.
// La tenataj klavoj kolektiĝas en la aro kaj aplikiĝas cxiun kadron en
// moviKlavare ( la ludo mem uzas la saman ŝablonon ).
const prematajKlavoj = new Set();
function moviKlavare(){
  if ( !triaDimensia ) {
    // 2D-mapo — WASD/aroj trenas la mapon, +/- zomas.
    const rapido = prematajKlavoj.has("Shift") ? 4 : 1.6;
    const paŝo = rapido / vidSkalo;
    let sxangxo = false;
    // klavoDeKodo jam mapigis la sagoklavojn al w/a/s/d — nur la literoj kaj
    // la zomaj klavoj enestas en la aro.
    if ( prematajKlavoj.has("w") ) { vidCZ += paŝo; sxangxo = true; }
    if ( prematajKlavoj.has("s") ) { vidCZ -= paŝo; sxangxo = true; }
    if ( prematajKlavoj.has("a") ) { vidCX += paŝo; sxangxo = true; }
    if ( prematajKlavoj.has("d") ) { vidCX -= paŝo; sxangxo = true; }
    if ( prematajKlavoj.has("zomi") ) { vidSkalo = Math.min(4, vidSkalo * 1.04); sxangxo = true; }
    if ( prematajKlavoj.has("malzomi") ) { vidSkalo = Math.max(minimaSkalo(), vidSkalo * 0.96); sxangxo = true; }
    if ( sxangxo ) bezonoDesegno = true;
    return;
  }
  if ( !bildilo3d || !regiloj3d ) return;
  // 3D-vido — movu kaj la fotilon kaj la orbitan celon, por ke la vido
  // glitu sen turniĝi. La rapido sekvas la distancon al la celo, do malproksima
  // vido moviĝas pli rapide ol proksima.
  const disto = fotilo3d.position.distanceTo(regiloj3d.target);
  const rapido = ( prematajKlavoj.has("Shift") ? 3 : 1 ) * Math.max(1, disto * 0.02);
  const antaŭen = new THREE.Vector3().subVectors(regiloj3d.target, fotilo3d.position);
  antaŭen.y = 0;
  if ( antaŭen.lengthSq()< 1e-6 ) antaŭen.set(0, 0, -1);
  antaŭen.normalize();
  // La dekstra vektoro — kruco ( antaŭen × supren ) kun Y-supren. ( -fz, 0, fx ).
  const dekstren = new THREE.Vector3(-antaŭen.z, 0, antaŭen.x);
  const movo = new THREE.Vector3();
  if ( prematajKlavoj.has("w") ) movo.addScaledVector(antaŭen, rapido);
  if ( prematajKlavoj.has("s") ) movo.addScaledVector(antaŭen, -rapido);
  if ( prematajKlavoj.has("d") ) movo.addScaledVector(dekstren, rapido);
  if ( prematajKlavoj.has("a") ) movo.addScaledVector(dekstren, -rapido);
  if ( prematajKlavoj.has("e") ) movo.y += rapido * 0.8;
  if ( prematajKlavoj.has("q") ) movo.y -= rapido * 0.8;
  if ( movo.lengthSq()=== 0 ) return;
  regiloj3d.target.add(movo);
  fotilo3d.position.add(movo);
  // Limoj — tenu la celon super la valo ( la krado estas -384..384 ).
  // Limoj — tenu la celon super la krado ( ±MONDO_HALFO ) — la tera meŝo kaj
  // la skulptado finigxas tie.
  regiloj3d.target.x = Math.max(-MONDO_HALFO, Math.min(MONDO_HALFO, regiloj3d.target.x));
  regiloj3d.target.z = Math.max(-MONDO_HALFO, Math.min(MONDO_HALFO, regiloj3d.target.z));
  regiloj3d.target.y = Math.max(-0o40, Math.min(0o300, regiloj3d.target.y));
}

// ════════════════════════ Eventoj ════════════════════════
function mondoDeEvento(e) {
  const rect = mapo.getBoundingClientRect();
  const px = ( e.clientX - rect.left ) * ( mapo.width / rect.width );
  const py = ( e.clientY - rect.top ) * ( mapo.height / rect.height );
  return {
    x: vidCX + ( mapo.width / 2 - px ) / vidSkalo,
    z: vidCZ + ( mapo.height / 2 - py ) / vidSkalo,
  };
}
function gxisdatigiKursoro(){
  // La vido-ilo montras prenan manon; la penikoj kaj la objekta ilo montras celkrucon.
  const prenanta = cxuMovigi() && !objektaModo;
  mapo.style.cursor = prenanta ? "grab" : "crosshair";
  mapo3d.style.cursor = prenanta ? "grab" : "crosshair";
}
mapo.addEventListener("pointerdown", ( e ) => {
  try { mapo.setPointerCapture(e.pointerId); } catch { /* sinteza okazaĵo */ }
  const m = mondoDeEvento(e);
  // Movigi ✋ trenas la mapon per la maldekstra klako; la dekstra kaj Shift
  // trenas cxiame. Dum la tenado la mano "kaptas" la mapon ( la objekta ilo
  // metas objektojn per la maldekstra klako, do gxi ne trenas ).
  if ( e.button === 1 || e.shiftKey || ( e.button === 0 && cxuMovigi() && !objektaModo ) ){
    treno = { tipo: "mov", lastX: e.clientX, lastY: e.clientY };
    if ( cxuMovigi() )mapo.style.cursor = "grabbing";
    e.preventDefault();
    return;
  }
  if ( e.button !== 0 ) return;
  // La Vojoj sub-langeto de la Krado-panelo — la klako elektas/movas
  // punktojn kaj dokojn sur la mapo ( la sub-ilo decidas ); NENIA terena
  // peniko.
  if ( vojojAktiva() ) {
    sxangxiVojanCelon(m.x, m.z);
    return;
  }
  // La Krado-langeto — la klako redaktas la ĉelan tipon ( la paletro
  // elektas la tipon; Aŭtomata ⚙️ resendas al la generita aŭ forigas ).
  // NENIA terena peniko — la krado ne ŝanĝas la teron.
  if ( aktivaTabo === "krado" ) {
    // Klako sur urba markilo elektas la urbon; klako sur ALDONAN blokon
    // elektas gxin ( kaj kaptas gxin por treni ); alie la klako redaktas la
    // ĉelan tipon.
    const u = urboCxePunkto(m.x, m.z);
    if ( u >= 0 ) { elektiUrbon(u); return; }
    const ab = aldonaBlokoCxePunkto(m.x, m.z);
    if ( ab >= 0 ) {
      agordiElektitanAldonanBlokon(ab);
      komenciAldonaTrenon(ab);
      gxisdatigiAldonaBlokojn();
      return;
    }
    sxangxiKradanCelon(m.x, m.z);
    return;
  }
  // La objekta ilo — la sub-ilo decidas la klakon. Meti ➕ metas novan
  // objekton sur libera tero ( kaj ELEKTAS proksiman, la blanka ringo ),
  // Movu ✋ kaptas objekton por treni, Forigi 🗑️ forigas per klako.
  if ( objektaModo ) {
    if ( objektaIlo === "movigi" ) {
      const ind = objektoCxePunkto(m.x, m.z);
      if ( ind >= 0 ) komenciObjektanTrenon(ind, m.x, m.z);
      return;
    }
    if ( objektaIlo === "forigi" ) {
      const ind = objektoCxePunkto(m.x, m.z);
      if ( ind >= 0 ) forigiObjekton(ind);
      return;
    }
    const ind = objektoCxePunkto(m.x, m.z);
    if ( ind >= 0 ) {
      agordiElektitanObjekton(elektitaObjekto === ind ? -1 : ind);
      gxisdatigiObjektoListon();
      sxargiObjektajnEnigojn();
      bezonoDesegno = true;
    } else {
      metiObjekton(m.x, m.z);
    }
    return;
  }
  // ⟪ La akva ilo 📃 ⟫ — gxi ne pentras la maskon: gxi metas, movas kaj
  // forigas FONTOJN ( la akvo fluas de ili ). Klako sur la libera grundo metas
  // novan fonton; klako sur fonto kaptas gxin por treni.
  if ( penikoAktiva === "akvo" ) {
    const ind = fontoCxePunkto(m.x, m.z);
    if ( ind >= 0 ) komenciFontanTrenon(ind, m.x, m.z);
    else metiFonton(m.x, m.z);
    return;
  }
  if ( penikoAktiva === "akvoforvisxi" ) {
    const ind = fontoCxePunkto(m.x, m.z);
    if ( ind >= 0 ) forigiFonton(ind);
    return;
  }
  momenti();
  agordiAkvoTrenantan(true);
  platigaCelo = penikoAktiva === "platigi" ? bazaAlteco(m.x, m.z) + deltoInterp(m.x, m.z) : null;
  treno = { tipo: "peniko", lastX: m.x, lastZ: m.z, tuŝitaj: new Map()};
  penikoPasxo(m.x, m.z);
});
mapo.addEventListener("pointermove", ( e ) => {
  const m = mondoDeEvento(e);
  kursoro = m;
  // La Krado-langeto — la kaptita ALDONA bloko sekvas la kursoron ( algluita
  // al 0.5 ) dum la treno sur la mapo.
  if ( aktivaTabo === "krado" && aldonaTrenata >= 0 ) {
    sxangiAldonaPozicion(m.x, m.z);
    return;
  }
  // La Vojoj sub-langeto — la kaptita punkto/doko sekvas la kursoron
  // ( algluita al 0.5 ) dum Elektu/Movu ✋.
  if ( vojojAktiva() && vojaTrenata ) {
    sxangiVojaPozicion(m.x, m.z);
    return;
  }
  if ( objektaModo ) {
    gxisdatigiKoordinatojn(m.x, m.z);
    // Movu ✋ — la kaptita objekto sekvas la kursoron ( algluita al 0.25 ).
    if ( objektaTrenata >= 0 ) sxangiObjektanPozicion(objektaTrenata, m.x, m.z);
  }
  if ( treno && treno.tipo === "mov" ) {
    const dx = e.clientX - treno.lastX, dy = e.clientY - treno.lastY;
    treno.lastX = e.clientX; treno.lastY = e.clientY;
    vidCX += dx / vidSkalo;
    vidCZ += dy / vidSkalo;
    bezonoDesegno = true;
    return;
  }
  if ( penikoAktiva === "akvo" && fontoTrenata >= 0 ) {
    sxangiFontanPozicion(fontoTrenata, m.x, m.z);
    return;
  }
  if ( treno && treno.tipo === "peniko" ) {
    penikoPasxo(m.x, m.z);
    return;
  }
  bezonoDesegno = true;
});
function finiTrenon(){
  treno = null;
  platigaCelo = null;
  finiObjektanTrenon();
  finiVojaTrenon();
  finiAldonaTrenon();
  finiFontanTrenon();
  agordiAkvoTrenantan(false);
  if ( cxuMovigi() )mapo.style.cursor = "grab";
}
mapo.addEventListener("pointerup", finiTrenon);
mapo.addEventListener("pointercancel", finiTrenon);
mapo.addEventListener("wheel", ( e ) => {
  e.preventDefault();
  const m = mondoDeEvento(e);
  // Glata zomo — la sama eksponenta faktoro kiel la plena mapo de la ludo
  // ( liniaj deltoj de kusenetoj ≈ 0o20 pikseloj po linio ), anstataŭ la
  // troa 1.5-oble po rado-paŝo.
  const delt = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
  const novaSkalo = Math.max(minimaSkalo(), Math.min(4, vidSkalo * Math.exp(-delt * 0o1/0o2000)));
  const rect = mapo.getBoundingClientRect();
  const px = ( e.clientX - rect.left ) * ( mapo.width / rect.width );
  const py = ( e.clientY - rect.top ) * ( mapo.height / rect.height );
  vidCX = m.x + ( px - mapo.width / 2 ) / novaSkalo;
  vidCZ = m.z + ( py - mapo.height / 2 ) / novaSkalo;
  vidSkalo = novaSkalo;
  bezonoDesegno = true;
}, { passive: false });
mapo.addEventListener("dblclick", () => {
  vidCX = 0; vidCZ = 0;
  vidSkalo = minimaSkalo();
  bezonoDesegno = true;
});

// ════════════════════════ Interfaco ════════════════════════
const radiusoRegilo = document.getElementById("radiuso");
const fortoRegilo = document.getElementById("forto");
const niveloRegilo = document.getElementById("akvaNivelo");
let sxangxita = false;
// La sxangxita-flago apartenas al la redaktilo — la moduloj sxangxas gxin
// per ĉi tiuj funkcioj.
function markiSxangxitan() { sxangxita = true; }
function markiSavitan() { sxangxita = false; }
function cxuSxangxita() { return sxangxita; }
function statuso(teksto) {
  document.getElementById("statuso").textContent = teksto;
}
function gxisdatigiValorojn(){
  document.getElementById("radiusoValoro").textContent = radiuso()+ " un";
  document.getElementById("fortoValoro").textContent = forto().toFixed(2);
  // La glitilo sekvas la AKVAN nivelon de la datumaro ( malnova skulptajxo povas
  // havi alian nivelon ol la HTMLa defauxlto ).
  niveloRegilo.value = String(akvaNiveloValoro);
  document.getElementById("niveloValoro").textContent = akvaNiveloValoro + " un";
  document.getElementById("fluoValoro").textContent = fluoRegilo.value
    + ( elektitaFonto >= 0 ? " ( elektita fonto )" : "" );
}
// ⟪ La iloj-langetoj 📃 ⟫ — Tereno 🏔️, Biomo 🎨, Animaloj 🐾 kaj Objektoj 🎯
// estas langetoj de la sama karto. La tereno-langeto tenas la penikojn
// ( levi, malsuprenigi, platigi, glatigi, akvo, forviŝi — la vido-Movigi ✋
// loĝas en la ilo-karto, ekster la langetoj ); la biomo- kaj
// animalo-langetoj tenas siajn paletrojn; la objekto-langeto sxaltas la
// objektan ilon ( la objekto-panelo estas PROPRIA thala-karto, kaj la
// agordoj aperas anstatauxe kiam la objekto-langeto estas fermita ).
const ilTaboj = document.querySelectorAll("#ilTaboj button");
const terenaro = document.getElementById("terenaro");
const biomaro = document.getElementById("biomaro");
const bestaro = document.getElementById("bestaro");
let aktivaTabo = "tereno";
function sxaltiIlTabon(tabo) {
  aktivaTabo = tabo;
  ilTaboj.forEach(b => { if ( b.dataset.iltabo ) b.setAttribute("aria-pressed", String(b.dataset.iltabo === tabo)); });
  // La paneloj estas thala/sabosuc2w2q — la temo donas al ili display.flex,
  // kiu superregus la hidden-atributon, do la kaŝo estas la kobe-klaso.
  terenaro.classList.toggle("kobe", tabo !== "tereno");
  biomaro.classList.toggle("kobe", tabo !== "biomo");
  bestaro.classList.toggle("kobe", tabo !== "animaloj");
  // La ĉel-paletro montriĝas nur en la ĉel-redaktaj sub-langetoj de la
  // Krado-panelo — dum la Vojoj sub-langeto gxi kaŝiĝas.
  kradaro.classList.toggle("kobe", tabo !== "krado" || kradoSubTaboAktiva() === "vojoj");
  kradoPanel.classList.toggle("kobe", tabo !== "krado");
  // La mond-nivelaj vojoj en la 3D-vido — nur dum la Vojoj sub-langeto.
  if ( vojaGrupo3D ) vojaGrupo3D.visible = vojojAktiva();
  // La krada urbo en la 3D-vido — montriĝas nur en la Krado-langeto ( la
  // vojoj en la grupo kaj la konstruaĵoj rekte en la sceno ). La STACIAJ
  // etendaĵoj ( la mond-vojoj kiel kradaj vojoj ) montriĝas kun la krado,
  // sed KAŜIĜAS dum la Vojoj sub-langeto — la VERAJ mond-vojoj montriĝas tie.
  if ( kradaGrupo3D ) kradaGrupo3D.visible = tabo === "krado";
  if ( kradaStaciaGrupo3D ) kradaStaciaGrupo3D.visible = tabo === "krado" && !vojojAktiva();
  krada3DKonstruajxoj.forEach(o => { o.visible = tabo === "krado"; });
  // La terenaj agordoj ( radiuso, forto, nivelo ) estas por la penikoj — la
  // objekto-panelo kaj la krado/vojoj-paneloj havas siajn proprajn kartojn.
  // sxaltiObjektojn administras la agordojn por la objekto-langeto; ĉi tie
  // nur la krado/vojoj ( kaj la ceteraj langetoj revenigas la agordojn ).
  if ( tabo === "krado" ) agordojPanel.classList.add("kobe");
  else if ( tabo !== "objektoj" ) agordojPanel.classList.remove("kobe");
}
// gxisdatigiPenikaron — la aktiva-ilo reliefigo tra la langetoj, la
// tereno-butenoj kaj la vido-Movigi butono ( la objekta ilo sxaltas la
// objekto-langeton ).
function gxisdatigiPenikaron() {
  const moviga = penikoAktiva === "movigi";
  document.querySelectorAll("#terenaro button").forEach(x =>
    x.setAttribute("aria-pressed", String(!objektaModo && x.dataset.peniko === penikoAktiva)));
  movigiIlo.setAttribute("aria-pressed", String(!objektaModo && moviga));
  // Dum la vido-Movigi estas aktiva, NENIU alia ilo restas reliefigita — la
  // movo estas la sola elektita ilo. La paletraj elektoj ( biomo, besto )
  // restas malfermitaj sed ne premitaj.
  document.querySelectorAll("#biomaro button, #bestaro button[data-besto]").forEach(x => {
    const speco = x.dataset.biomo !== undefined ? biomoAktiva : bestoAktiva;
    x.setAttribute("aria-pressed", String(!objektaModo && !moviga && parseInt(x.dataset.biomo !== undefined ? x.dataset.biomo : x.dataset.besto, 10) === speco));
  });
  document.querySelectorAll("#kradaro button").forEach(x =>
    x.setAttribute("aria-pressed", String(x.dataset.kradoTipo === kradoTipoElektita)));
  ilTaboj.forEach(b => {
    if ( !b.dataset.iltabo ) return;   // la vido-Movigi butono ne estas langeto
    const aktiva = objektaModo ? b.dataset.iltabo === "objektoj"
      : moviga ? false
      : aktivaTabo === "krado" ? b.dataset.iltabo === "krado"
      : penikoAktiva === "biomo" ? b.dataset.iltabo === "biomo"
      : penikoAktiva === "bestoj" ? b.dataset.iltabo === "animaloj"
      : b.dataset.iltabo === "tereno";
    b.setAttribute("aria-pressed", String(aktiva));
  });
}
ilTaboj.forEach(b => {
  b.addEventListener("click", () => {
    if ( !b.dataset.iltabo ) return;   // la vido-Movigi butono havas sian propran aganton
    const tabo = b.dataset.iltabo;
    if ( tabo === "objektoj" ) { sxaltiObjektojn(true); return; }
    if ( objektaModo ) sxaltiObjektojn(false);
    if ( tabo === "krado" ) penikoAktiva = "levi";   // la Krado-langeto ne estas peniko
    else if ( tabo === "biomo" ) penikoAktiva = "biomo";
    else if ( tabo === "animaloj" ) penikoAktiva = "bestoj";
    else if ( penikoAktiva === "biomo" || penikoAktiva === "bestoj" ) penikoAktiva = "levi";
    sxaltiIlTabon(tabo);
    gxisdatigiKradon();   // la statistikoj kaj la overlajo ĉiam aktualaj
    if ( tabo === "krado" ) {
      gxisdatigiAldonaBlokojn();
      // Reveninte al la Krado-panelo kun la Vojoj sub-langeto aktiva, la
      // voja regiloj refreŝiĝu.
      if ( kradoSubTaboAktiva() === "vojoj" ) gxisdatigiVojajnRegilojn();
    }
    gxisdatigiPenikaron();
    gxisdatigiAgordojn();
    gxisdatigiKursoro();
    gxisdatigi3DnIlon();
    pentri(0, 0, REZ - 1, REZ - 1);
    bezonoDesegno = true;
    if ( triaDimensia && teraMesh ) gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  });
});
// kradoSubTaboAktiva / vojojAktiva — la aktiva sub-langeto de la Krado-panelo.
// La Vojoj redaktado loĝas EN la Krado-panelo ( sub-langeto, kiel la aldonaj
// blokoj ), sed la vojoj mem restas MOND-nivelaj — ili povos konekti plurajn
// urbojn estonte.
function kradoSubTaboAktiva() {
  const b = document.querySelector('#kradoSubTaboj button[aria-pressed="true"]');
  return b ? b.dataset.kradoSub : null;
}
function vojojAktiva() {
  return aktivaTabo === "krado" && kradoSubTaboAktiva() === "vojoj";
}
// La sub-langetoj de la Krado-panelo — Urboj/Redakti/Aldonaj blokoj/Vojoj
// kaj ( ene de la Vojoj sub-panelo ) Vojoj/Punktoj/Dokoj/Mapaj iloj. Cxiu
// butono havas data-krado-sub aux data-vojo-sub, kaj la sub-paneloj la
// respondan data-*-sub-panel. La statistikoj kaj la Helpo restas ekster la
// langetoj.
function sxaltiSubTabojn(prefikso) {
  const aktiva = document.querySelector(`#${prefikso}SubTaboj button[aria-pressed="true"]`);
  const tabo = aktiva ? aktiva.dataset[prefikso + "Sub"] : null;
  // La panelo estas `kradoPanel` aux `vojojPanel` — la lasta havas duoblan j.
  const panelo = document.getElementById(prefikso + "Panel") || document.getElementById(prefikso + "jPanel");
  panelo.querySelectorAll(`[data-${prefikso}-sub-panel]`).forEach(p => {
    // La sub-paneloj estas ciihii — la temo donas al ili display.flex, kiu
    // superregus la hidden-atributon, do la kaŝo estas la kobe-klaso.
    p.classList.toggle("kobe", p.dataset[prefikso + "SubPanel"] !== tabo);
  });
  // En la Krado-panelo la ĉel-paletro montriĝas nur por la ĉel-redaktaj
  // sub-langetoj — dum la Vojoj sub-langeto gxi kaŝiĝas ( la mapo redaktas
  // vojojn, ne ĉelojn ).
  if ( prefikso === "krado" && aktivaTabo === "krado" ) {
    document.getElementById("kradaro").classList.toggle("kobe", tabo === "vojoj");
    if ( vojaGrupo3D ) vojaGrupo3D.visible = vojojAktiva();
    if ( kradaStaciaGrupo3D ) kradaStaciaGrupo3D.visible = tabo !== "vojoj";
    if ( tabo === "vojoj" ) gxisdatigiVojajnRegilojn();
  }
}
document.querySelectorAll("#kradoSubTaboj button, #vojoSubTaboj button").forEach(b => {
  b.addEventListener("click", () => {
    const prefikso = b.dataset.kradoSub !== undefined ? "krado" : "vojo";
    const tabo = b.dataset[prefikso + "Sub"];
    document.querySelectorAll(`#${prefikso}SubTaboj button`).forEach(x => {
      const v = x.dataset[prefikso + "Sub"];
      if ( v ) x.setAttribute("aria-pressed", String(v === tabo));
    });
    sxaltiSubTabojn(prefikso);
    // La sub-langeto sxangxas la mapan desegnon ( la Vojoj sub-langeto
    // montras la vojojn/dokojn, la ceteraj la ĉelojn ) — necesa redesegno.
    bezonoDesegno = true;
  });
});
sxaltiSubTabojn("krado");
sxaltiSubTabojn("vojo");
// La vido-Movigi butono — la vido-ilo loĝas en la ilo-karto, ekster la
// langetoj. gxi sxaltas la movan reĝimon sen sxangxi la aktivan langeton.
// Alia klako ( aux ajna peniko/langeto ) revenigas la lastan penikon ( kaj
// la lastan langeton, se gxi estis biomo/animaloj ).
const movigiIlo = document.getElementById("movigiIlo");
let lastaPeniko = "levi";
let lastaMovigaTabo = null;
movigiIlo.addEventListener("click", () => {
  if ( objektaModo ) {
    sxaltiObjektojn(false);
    // Ferminte la objekto-panelon, la vido revenas al la tereno-langeto kun
    // la baza peniko ( la objekto-langeto ne havas penikon por reveni, kaj
    // la tereno-langeto postulas terenan penikon ).
    penikoAktiva = "levi";
    sxaltiIlTabon("tereno");
  }
  if ( penikoAktiva === "movigi" ) {
    penikoAktiva = lastaPeniko;
    // La memorita langeto validas nur por la langet-nomaj penikoj ( biomo,
    // bestoj ); la terenaj penikoj apartenas al la tereno-langeto.
    if ( lastaMovigaTabo && ( penikoAktiva === "biomo" || penikoAktiva === "bestoj" ) ) {
      sxaltiIlTabon(lastaMovigaTabo);
    } else if ( penikoAktiva !== "biomo" && penikoAktiva !== "bestoj" ) {
      sxaltiIlTabon("tereno");
    }
    lastaMovigaTabo = null;
  } else {
    // En la biomo-/animalo-langeto la peniko NOMAS la langeton ( biomo,
    // bestoj ) — konservu gxin tia, por ke la langeto restu reliefigita kiam
    // la movo finigxas. La terenaj penikoj revenas al la tereno-langeto.
    lastaPeniko = penikoAktiva;
    lastaMovigaTabo = penikoAktiva === "biomo" || penikoAktiva === "bestoj" ? aktivaTabo : null;
    penikoAktiva = "movigi";
  }
  gxisdatigiPenikaron();
  gxisdatigiAgordojn();
  gxisdatigiKursoro();
  gxisdatigi3DnIlon();
  pentri(0, 0, REZ - 1, REZ - 1);
  bezonoDesegno = true;
  if ( triaDimensia && teraMesh ) gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
});
// La terenaj penikoj — la penikoj de la tereno-langeto ( levi, malsuprenigi,
// platigi, glatigi, akvo, forviŝi ).
document.querySelectorAll("#terenaro button").forEach(b => {
  b.addEventListener("click", () => {
    if ( objektaModo ) sxaltiObjektojn(false);
    penikoAktiva = b.dataset.peniko;
    sxaltiIlTabon("tereno");
    gxisdatigiPenikaron();
    gxisdatigiAgordojn();
    gxisdatigiKursoro();
    gxisdatigi3DnIlon();
    // La biomo-nuanco dependas de la aktiva ilo ( nur la biomo-ilo montras
    // gxin ), do la bazaj koloroj kaj la 3D-tero rekolorigxas tutaj cxe cxiu
    // ilo-sxangxo — desegniVidon nur komponas la bazan kanvason, gxi ne
    // repentras gxin.
    pentri(0, 0, REZ - 1, REZ - 1);
    bezonoDesegno = true;
    if ( triaDimensia && teraMesh ) gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  });
});
// ⟪ Biomaro ( la paletro de la biomo-langeto ) 📃 ⟫ — elektas KIUN biomon
// pentri. La biomo-langeto montras la paletron.
document.querySelectorAll("#biomaro button").forEach(b => {
  b.addEventListener("click", () => {
    biomoAktiva = parseInt(b.dataset.biomo, 10);
    document.querySelectorAll("#biomaro button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    // La nuanco dependas de la elektita biomo — rekolorigu la vidon.
    pentri(0, 0, REZ - 1, REZ - 1);
    bezonoDesegno = true;
    if ( triaDimensia && teraMesh ) gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  });
});
// ⟪ Bestaro ( la paletro de la animalo-langeto ) 📃 ⟫ — elektas KIUN bestan
// zonon pentri. La animalo-langeto montras la paletron.
document.querySelectorAll("#bestaro button[data-besto]").forEach(b => {
  b.addEventListener("click", () => {
    bestoAktiva = parseInt(b.dataset.besto, 10);
    document.querySelectorAll("#bestaro button[data-besto]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    // La vido montras nur la elektitan specion — rekolorigu la vidon.
    pentri(0, 0, REZ - 1, REZ - 1);
    bezonoDesegno = true;
    if ( triaDimensia && teraMesh ) gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  });
});
// La forviŝo — la SAMA ilo kiel la pentrado. sxaltita per Forviŝi 🧽, la
// elektita specio forvisxigxas anstataŭ pentrigxas ( la ceteraj restas ).
const bestoForvisxoBtn = document.getElementById("bestoForvisxo");
bestoForvisxoBtn.addEventListener("click", () => {
  bestoForvisxa = !bestoForvisxa;
  bestoForvisxoBtn.setAttribute("aria-pressed", String(bestoForvisxa));
});

// ════════════════════════ Krado 🏙️ ( la urba krado ) ════════════════════════
// La Krado-panelo ( la urboj, la ĉel-redaktado, la aldonaj blokoj kaj la
// mond-nivelaj vojoj kaj dokoj ) logxas en
// iloj/tero-skulptilo/tero-skulptilo/kradaro.js. La stato ( la urboj, la
// vojoj, la dokoj, la ofseto ) legigxas rekte kaj sxangxigxas nur per la
// agord-funkcioj de tiu modulo. La unua ŝarĝo de la datumaro estas ĉi tie,
// samloke kiel antauxe, por ke la plano estu preta antaux la unua desegno.
agordiDatumojn({
  urboj: SKULPTA_URBOJ, vojoj: SKULPTA_VOJOJ, dokoj: SKULPTA_DOKOJ,
});


const akvaNivelaEtikedo = document.getElementById("akvaNivelaEtikedo");
const akvaFluoEtikedo = document.getElementById("akvaFluoEtikedo");
const fluoRegilo = document.getElementById("akvaFluo");
const akvaStatistikoj = document.getElementById("akvaStatistikoj");
const agordojPanel = document.getElementById("agordojPanel");
// La akvaj agordoj ( la nivelo de la basenoj kaj la fluo de la fontoj )
// montrigxas nur dum la akva ilo estas aktiva.
function gxisdatigiAgordojn() {
  const akva = penikoAktiva === "akvo" || penikoAktiva === "akvoforvisxi";
  for ( const el of [ akvaNivelaEtikedo, niveloRegilo, akvaFluoEtikedo, fluoRegilo, akvaStatistikoj ] ) {
    el.style.display = akva ? "" : "none";
  }
  if ( akva ) gxisdatigiAkvajnStatistikojn();
}
// gxisdatigiAkvajnStatistikojn — kiom da fontoj kaj akvaj celoj la kalkulo
// trovis ( la fontoj estas la enigo — la akvo mem estas deriva ).
function gxisdatigiAkvajnStatistikojn() {
  if ( !akvaStatistikoj ) return;
  const s = akvaRezulto ? akvaRezulto.statistikoj
    : { fontoj: fontoj.length, kanaloj: 0, akvaj: 0, ternoj: 0 };
  const areo = Math.round(s.akvaj * PASO * PASO);
  akvaStatistikoj.textContent = s.fontoj + " fonto" + ( s.fontoj === 1 ? "" : "j" )
    + " · " + s.kanaloj + " kanalaj ĉeloj · " + s.akvaj + " akvaj ĉeloj ( " + areo + " u² )"
    + ( s.ternoj ? " · " + s.ternoj + " montara terno" : "" );
}
gxisdatigiObjektoPropOJn();
rekonstruiObjektanAntauxrigardon();
gxisdatigiObjektoListon();
// Komenca stato — la tereno-langeto aktivas, la agordoj montrigxas ( la
// objekto-panelo fermita ). La objekto-panelo estas thala, kies temo donas
// display.flex ( superregas la hidden-atributon ), do la fermo estas
// eksplicita cxi tie.
objektoPanel.classList.add("kobe");
agordojPanel.classList.remove("kobe");
sxaltiIlTabon("tereno");
gxisdatigiPenikaron();
gxisdatigiAgordojn();
gxisdatigiVojajnRegilojn();
radiusoRegilo.addEventListener("input", () => { gxisdatigiValorojn(); bezonoDesegno = true; });
fortoRegilo.addEventListener("input", gxisdatigiValorojn);
niveloRegilo.addEventListener("pointerdown", momenti);
// La nivelo sxangxas la akvan kalkulon mem ( la basenoj plenigxas al gxi ) —
// do la glitilo rekalkuligas la akvon. Nur la manteno ( change ) rulas la
// kalkulon; dum la treno ( input ) nur la etikedo sekvas, por ke la kalkulo ne
// ruligxu cxiun kadron de la treno.
niveloRegilo.addEventListener("input", () => {
  agordiAkvanNivelon(+niveloRegilo.value);
  gxisdatigiValorojn();
});
niveloRegilo.addEventListener("change", () => { akvoSxangxigxis(); });
// La fluo de la fontoj — kun ELEKTITA fonto la glitilo sxangxas gxian fluon
// ( la rivero plilarghxigxas aux mallarghxigxas ), alie gxi difinas la fluon
// de la venontaj fontoj ( la fonta markilo sur la mapo montras gxin ).
fluoRegilo.addEventListener("pointerdown", momenti);
fluoRegilo.addEventListener("input", () => {
  agordiFluoValoron(+fluoRegilo.value);
  gxisdatigiValorojn();
});
fluoRegilo.addEventListener("change", () => {
  sxangxiFluonDeElektita();
  if ( !( elektitaFonto >= 0 ) ) bezonoDesegno = true;
});
// La ago de la akva ilo — derivu fontojn el la malnova pentrita akvo.
document.getElementById("fontojElPentrita").addEventListener("click", deriviFontojnElPentrita);
document.getElementById("malfari").addEventListener("click", malfari);
document.getElementById("refari").addEventListener("click", refari);
document.getElementById("restarigi").addEventListener("click", () => {
  momenti();
  deltoj.fill(0);
  masko.fill(0);
  biomoj.fill(0);
  bestoj.fill(0);
  agordiFontojn([]);
  agordiElektitanFonton(-1);
  sxangxita = true;
  rekalkuliAkvon();
});
// La klavara movado — la sama ŝablono kiel la ludo. Kolektu la tenatajn
// klavojn kaj lasu moviKlavare apliki ilin cxiun kadron. La klavoj en
// agordaj enigoj ( ekz. la glitiloj ) restas por la enigo mem.
function klavoDeKodo(kodo) {
  switch ( kodo ) {
    case "KeyW": case "ArrowUp": return "w";
    case "KeyA": case "ArrowLeft": return "a";
    case "KeyS": case "ArrowDown": return "s";
    case "KeyD": case "ArrowRight": return "d";
    case "KeyQ": return "q";
    case "KeyE": return "e";
    case "ShiftLeft": case "ShiftRight": return "Shift";
    case "Equal": case "NumpadAdd": return "zomi";
    case "Minus": case "NumpadSubtract": return "malzomi";
    default: return null;
  }
}
window.addEventListener("keydown", ( e ) => {
  if ( ( e.ctrlKey || e.metaKey ) && e.key.toLowerCase()=== "z" ) {
    e.preventDefault();
    if ( e.shiftKey ) refari(); else malfari();
    return;
  }
  if ( ( e.ctrlKey || e.metaKey ) && e.key.toLowerCase()=== "y" ) {
    e.preventDefault();
    refari();
    return;
  }
  // Ne trinku la klavojn, kiam la fokuso estas en enigo aŭ alklakita butono,
  // nek kiam Ctrl estas tenata ( la retumilaj ŝparvojoj restu liberaj ).
  if ( e.ctrlKey || e.metaKey ) return;
  const celo = e.target;
  if ( celo && ( celo.tagName === "INPUT" || celo.tagName === "SELECT" || celo.tagName === "TEXTAREA" ) ) return;
  // En la objekta ilo la klavo Forigi ( aŭ Retropaŝo ) forigas la elektitan
  // objekton — la sama ago kiel la butono Forigi ✕ en la listo.
  if ( objektaModo && elektitaObjekto >= 0
    && ( e.key === "Delete" || e.key === "Backspace" ) ) {
    e.preventDefault();
    forigiObjekton(elektitaObjekto);
    return;
  }
  const klavo = klavoDeKodo(e.code);
  if ( !klavo ) return;
  e.preventDefault();
  prematajKlavoj.add(klavo);
});
window.addEventListener("keyup", ( e ) => {
  const klavo = klavoDeKodo(e.code);
  if ( klavo ) prematajKlavoj.delete(klavo);
});
window.addEventListener("blur", () => prematajKlavoj.clear());

// ════════════════════════ Kodigo kaj dosiero ════════════════════════
// ⟪ Fenestro al la stato 📃 ⟫ — kiel la inspektilo ( window.naturoInspektilo ),
// malgranda aliro por la aliaj iloj kaj por la kontroloj. Gxi ne sxangxas la
// konduton de la skulptilo — nur legas kaj skribas la samajn stato-objektojn.
window.skulptilo = {
  stato: () => ( {
    fontoj: fontoj.map(f => ( { ...f } )),
    fontaElekto: elektitaFonto,
    nivelo: akvaNiveloValoro,
    peniko: penikoAktiva,
    statistikoj: akvaRezulto ? akvaRezulto.statistikoj : null,
    sxangxita,
  } ),
  vido: ( cx, cz, skalo ) => {
    vidCX = cx; vidCZ = cz;
    if ( skalo ) vidSkalo = skalo;
    alpingiVidon();
    bezonoDesegno = true;
  },
  fonto: ( x, z, fluo ) => metiFonton(x, z, fluo),
  forigiFonton: ( ind ) => forigiFonton(ind),
  deriviFontojn: () => deriviFontojnElPentrita(),
  fluo: ( v ) => { agordiFluoValoron(v); fluoRegilo.value = String(v); gxisdatigiValorojn(); },
  nivelo: ( v ) => { agordiAkvanNivelon(v); akvoSxangxigxis(); },
  peniko: ( nomo ) => { penikoAktiva = nomo; gxisdatigiPenikaron(); gxisdatigiAgordojn(); },
  akvo: ( x, z ) => ( { akvo: cxuAkvo(x, z), nivelo: akvaNiveloEn(x, z),
    alto: teraAlto(x, z), sekaAlto: bazaAlteco(x, z) + deltoInterp(x, z) } ),
  vido3d: ( on ) => { sxaltiVidon(!!on); return !!bildilo3d; },
  kamera: ( x, y, z, cx = 0, cy = 0, cz = 0 ) => {
    if ( !fotilo3d || !regiloj3d ) return false;
    fotilo3d.position.set(x, y, z);
    regiloj3d.target.set(cx, cy, cz);
    regiloj3d.update();
    return true;
  },
};

// ⟪ La mapoj kaj la dosieroj 📃 ⟫ — la datumformato, la mapo-registro kaj la
// sep datumdosieroj logxas en tero-skulptilo/dosieroj.js. Ĉi tie restas nur la
// ligo ( la stato de la redaktilo, kiun la modulo legas kaj skribas ) kaj la
// ŝarĝo de la datumaro de la aktiva mapo ( sxargiDatumaronElKodo ).
agordiDosierojn( {
  PASO, N, X0, Z0, deltoj, masko, biomoj, bestoj, historio, refaraHistorio,
  niveloRegilo, statuso, gxisdatigiValorojn, gxisdatigiPlenan2Dn,
  gxisdatigiAkvajnStatistikojn,
  markiSxangxitan: () => { sxangxita = true; },
  markiSavitan: () => { sxangxita = false; },
  cxuSxangxita: () => sxangxita,
  SKULPTA_DELTAJ, SKULPTA_AKVA_MASKO, SKULPTA_BIOMOJ, SKULPTA_BESTOJ,
  SKULPTA_AKVOFONTOJ, SKULPTA_OBJEKTOJ, SKULPTA_URBOJ, SKULPTA_VOJOJ, SKULPTA_DOKOJ,
} );

sxargiDatumaronElKodo();
gxisdatigiValorojn();
sxaltiIlTabon("tereno");
gxisdatigiPenikaron();
gxisdatigiAgordojn();
gxisdatigiKradon();   // la komenca krado — la ĉefa urbo de SKULPTA_URBOJ
prerenderiBazon();
// La akvo — la fontoj kaj la pentrita masko ( la basenaj semoj ) pasas tra la
// akvokalkulo antaux la unua desegno ( la 2D-bake kaj la 3D-vido legas gxin ).
rekalkuliAkvon();
sxargiDosierajnTenilojn();
requestAnimationFrame(buklo);
