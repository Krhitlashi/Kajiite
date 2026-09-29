// ≺⧼ Urbo 🏙️ ⧽≻
// Urba konstruo. konstruajxoj, vojoj, placoj, lampoj, vegetajxo, nebulo, akvo kaj kanuoj.
// Modula krada sistemo — vojoj kaj konstruajxaj pozicioj derivitaj de kradaj parametroj.
import * as THREE from "three";
import { konstruiKradanUrbon } from "./urbo/krada-urbo.js";
import { konstruiMetitajnObjektojn } from "./urbo/metitaj.js";
import { kreiLampAldonilon } from "./urbo/lampoj.js";
import type { NebulaSistemo, UrbaSistemo, SkulptaUrbo,
  SkulptaVojo, SkulptaPlatformo, MetitaObjekto } from "./urbo/tipoj.js";
import { RiverData, konstruiRiveron,
  konstruiRiveronNordan, konstruiLagon, konstruiSkulptitanAkvon } from "../../eskekoj/medio/akvo.js";
import { konstruiBestojn, konstruiPetrelojn } from "../../eskekoj/shalaj-specioj/bestoj.js";
import type { VojDifino } from "../../eskekoj/medio/vojoj/tipoj.js";
import { superajElDatumo } from "./krado/superoj.js";
import { Kanoto } from "../../eskekoj/medio/transporto.js";
import type { Figuro, Vesto } from "../../eskekoj/shalaj-specioj/homoj.js";
import type { InternaSistemo } from "../../eskekoj/konstruajxoj/internoj/tipoj.js";
import { akvo, alteco, riveroZ, RIVERA_DUONLARĜO, LAGO_X, LAGO_RZ, RIVERA_BUŜO_X, riveraAkvaNivelo, lagoZ, lagoNivelo, lagoRadio,
  akvaNivelo, riveroNordOrientaX, riveraNordOrientaNivelo, RIVERA_NORDORIENTA_FONTO_Z, RIVERA_NORDORIENTA_DUONLARĜO, RIVERA_NORDORIENTA_BUŜO_Z, skulptitaAkvo, skulptaAkvaLimoj, akvaMeshNivelo, SKULPTA_PASO, SKULPTA_AKTIVA } from "./tereno.js";
import { SKULPTA_OBJEKTOJ, SKULPTA_URBOJ, SKULPTA_VOJOJ,
  SKULPTA_DOKOJ, SKULPTA_N, SKULPTA_ORIGINO } from "../tero-datumaro/aktiva.js";
import { konstruiHxsxaksxlefojn } from "../../eskekoj/shalaj-specioj/vegetajxo/hxsxaksxlefo.js";
import { konstruiPussxlefojn } from "../../eskekoj/shalaj-specioj/vegetajxo/pussxlefo.js";
import { konstruiArbaron } from "../../eskekoj/shalaj-specioj/vegetajxo/betuloj/arbaro.js";
import { konstruiLarikon } from "../../eskekoj/shalaj-specioj/vegetajxo/larikoj.js";
import { konstruiFiguron } from "../../eskekoj/shalaj-specioj/homoj.js";
import { VESTOJ } from "../../eskekoj/vestaro/vestoj.js";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { konstruiIntersekcajnPlatojn } from "../../eskekoj/medio/vojoj/platoj.js";
import { kreiNebulanTeksajxon } from "../../eskekoj/komunajxoj/teksajxoj/nebulo.js";
import { kronaRadiusoLarika,
  kronaRadiusoHxsxaksxlefa } from "../../eskekoj/shalaj-specioj/vegetajxo/kronoj.js";
import { VALAJ_BIOMOJ, EBENAJAJ_BIOMOJ,
  MONTAJ_BIOMOJ, EKVIZETO_BIOMOJ } from "../../eskekoj/shalaj-specioj/vegetajxo/biomoj.js";
import { metiArbojn, metiMontajnArbojn,
  metiPussxlefojn, metiArbojnCxirkauLagon } from "../../eskekoj/shalaj-specioj/vegetajxo/metoj.js";
import { konstruiLikenojn,
  konstruiTrunkajnLikenojn } from "../../eskekoj/shalaj-specioj/vegetajxo/likenoj.js";
import { konstruiMusxajnMontetojn } from "../../eskekoj/shalaj-specioj/vegetajxo/muskoj.js";
import { konstruiFalintajnTrunkojn } from "../../eskekoj/shalaj-specioj/vegetajxo/falintaj-trunkoj.js";
import { konstruiCetkuojn, konstruiCakeojn } from "../../eskekoj/shalaj-specioj/vegetajxo/ekvizetoj.js";
import { konstruiHerbon,
  konstruiHerbonCxirkauLagon } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/tufoj.js";
import { konstruiHerbanTavolon } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/gazono.js";
import { plataAltoj } from "../../eskekoj/medio/vojoj/formoj.js";
import { KORNA_R, VOJA_BORDA_LARĜO,
  VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { konstruiPeriferiajnPlatformojn } from "../../eskekoj/medio/vojoj/periferio.js";
import { konstruiDokon } from "../../eskekoj/medio/doko.js";
import { PONT_FINA_LEVIGXO, pontaDeko, konstruiPonton } from "../../eskekoj/medio/doko/ponto.js";
import { troviVojaRetajnKunigojn, VojaRetoVojo, VojaRetoKunigo } from "../../eskekoj/medio/voj-reto.js";
import { surPosxtelefono } from "../bildo/scena/aparato.js";
import { skulptitaBesto } from "../tero-datumaro/rultempo.js";
import { konstruiHxeuxfojn } from "../../eskekoj/konstruajxoj/hxeuxfa/lampoj.js";
import { konstruiFilikojn } from "../../eskekoj/shalaj-specioj/vegetajxo/filikoj.js";
import { konstruiPurpurajnPlantojn,
  konstruiPurpurajnFilikojn, konstruiAltajnPurpurajnFilikojn } from "../../eskekoj/shalaj-specioj/vegetajxo/purpuraj.js";
import { konstruiLikenSxtonojn } from "../../eskekoj/shalaj-specioj/vegetajxo/rokoj.js";
import { konstruiMontajnSubkreskajxojn,
  konstruiLaganSubkreskajxojn } from "../../eskekoj/shalaj-specioj/vegetajxo/subkreskajxoj.js";
import { konstruiMontajnRokojn } from "../../eskekoj/shalaj-specioj/vegetajxo/rokoj.js";
import { kreiPussxlefojnBerojn } from "../../eskekoj/mebloj/mangxajxoj/beroj.js";
import { kreiInternanSistemon } from "../../eskekoj/konstruajxoj/internoj/sistemo.js";

export async function konstruiUrbon(
  sceno: THREE.Scene,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial,
  raportiProgreson?: ( procento: number ) => void
): Promise<UrbaSistemo> {
  // ⟪ Ŝarĝa progreso 📃 ⟫ — la konstruado cedas inter sekcioj, por ke la
  // ŝarĝa stango vere moviĝu kaj la paĝo restu respondema dum lanĉo.
  const jesi = (): Promise<void> => new Promise(r => setTimeout(r, 0));
  const STAGOJ = 12;
  let stago = 0;
  const raporti = async (): Promise<void> => {
    stago = Math.min(STAGOJ, stago + 1);
    raportiProgreson?.(stago / STAGOJ);
    await jesi();
  };
  // ⟨ La pecetoj de la konstruado 📃 ⟩ — `jesi` ankaŭ vokiĝas INTER la sekcioj,
  // ne nur inter ili. La kialo estas la malhelpa tasko: retumilo plenumas unu
  // senĉesan JavaScript-blokon ĝis la fino, do sekcio kiu konstruas 0o2000
  // herbotufojn blokis la ĉefan trakon por la tuta daŭro — la ŝarĝa stango
  // haltis, la enkonduka kamera drivo frostis, la langeto ne respondis. Kun
  // cedoj inter la pezaj konstruiloj ĉiu bloko restas mallonga ( la cedo mem
  // kostas malpli ol 0o1/0o200 He — la tempigila krampo de la retumiloj ), do la
  // stango kaj la enkonduko daŭre moviĝas kaj la progreso aperas pli frue.
  // La vico de la cedoj sekvas la PESON de la konstruiloj: la arb- kaj
  // herbo-metantoj ( la multaj specimenoj kun la ekskludaj provoj ) ricevas
  // cedon post ĉiu grupo, la malpezaj ( likenoj, musko ) nur grupe.

  // ═══════════════════════════════════════════════════════════
  // Urba krado — DIAMANTA kruca aranĝo kun kvar-flanka simetrio. La
  // nordo/sudo egalas la oriento/okcidento. Ĉiu flanko havas `arangxaGrando`
  // tavolojn da konstruaĵoj ( la nuna urbo estas 3 ). La tipoj laŭ ringo —
  //  · RINGO 0 ( centro ) = la centra konstruaĵo ( sanktejo ) aŭ la stacio.
  //  · RINGO 1 ( rekte apud ) = kasafeoj ( kunvenoĉambroj ) kaj mangxejoj.
  //  · RINGO 2 ( poste ) = altaj turoj ( veuxkupanko ).
  //  · RINGO 3+ ( ekstera ) = domoj ( kapuo ).
  //
  //  V = veuxkupanko (alta turo), D = domo, M = mangxejo, K = kasafeo, W = sanktejo
  //
  //       | − | − | D | D | D | − | − |   z=3 (tria tavolo — domoj)
  //       | − | V | V | V | − |   z=2 (dua tavolo — turoj)
  //       | D | V | M | K | M | V | D |   z=1 (unua tavolo — la aliaj tipoj)
  //       | D | V | K | W | K | V | D |   z=0 (centro)
  //       | D | V | M | K | M | V | D |   z=-1 (unua tavolo — la aliaj tipoj)
  //       | − | V | V | V | − |   z=-2 (dua tavolo — turoj)
  //       | − | − | D | D | D | − | − |   z=-3 (tria tavolo — domoj)
  // ═══════════════════════════════════════════════════════════
  // La urboj de SKULPTA_URBOJ ( la terena skulptilo ) — la cefa urbo
  // ( unu-bloka, grandeco 3 ) cxe la centro, kaj la testa kvar-bloka urbo
  // ( grandeco 2 ) trans la rivero. Cxiu urbo konstruigxas cxe sia ofseto.
  // La unua urbo estas la CEFA — la spacosxipo, la doka avenuo kaj la
  // keuxfhxesoj apartenas al gxi.
  // Se la listo mankas aŭ malplenas ( malnova datumaro ), la ludo konstruas
  // la defaŭltan ĉefan urbon — neniam urbo sen la cefa.
  const urboListo: SkulptaUrbo[] = SKULPTA_URBOJ.length
    ? ( SKULPTA_URBOJ as SkulptaUrbo[] )
    : [ { nomo: "Ĉefa", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ];
  const urboj = urboListo.map(u => konstruiKradanUrbon(sceno,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando, keuxfhxeso: !!u.keuxfhxeso, lampoj: u.lampoj !== false },
    [ u.ofsX, u.ofsZ ], oraMaterialo,
    u.aldonajBlokoj ?? [], superajElDatumo(u.superoj)));
  const cefa = urboj[0];
  await raporti();

  // La kunigitaj kradaj rezultoj — la mond-nivelaj partoj ( rivero, dokoj,
  // vegetajxo ) uzas ĉi tiujn por la ekskludoj kaj la kolizioj.
  const konstruSpecoj = urboj.flatMap(r => r.konstruSpecoj);
  const kolizioj = urboj.flatMap(r => r.kolizioj);
  const selektajxoj = urboj.flatMap(r => r.selektajxoj);
  const konstruGrupoj = urboj.flatMap(r => r.konstruGrupoj);
  const placajNodoj = urboj.flatMap(r => r.placajNodoj);
  const keuxfhxesoLokoj = urboj.flatMap(r => r.keuxfhxesoLokoj);
  // ⟨ La voja reto de la KRADo — kiel DATUMOJ 📃 ⟩ — la kradaj urboj liveras
  // siajn difinojn, kunigajn punktojn kaj fermitajn direktojn anstataŭ
  // konstrui ilin. Ni kunigas ilin ĉi tie kun la skulptitaj mondvojoj ( la
  // kajo, la avenuo, la ponto, la doko-ŝtuparoj ) sube kaj konstruas la TUTAN
  // reton per unu voko ( vidu "Unu reto, unu konstruado" ).
  const kradajDifinoj: VojDifino[] = urboj.flatMap(r => r.vojDifinoj);
  const kradajKunigoj: [ number, number ][] = urboj.flatMap(r => r.kunigajPunktoj);
  const kradajFermitaj = new Map<string, [ number, number ]>(urboj.flatMap(r => [ ...r.kunigajFermitaj ]));
  // ⟪ Rivero 📃 ⟫
  // La ribono etendiĝas okcidenten ĝis la nova mondrando ( x ≤ 0o600 ),
  // do la rivero aspektas longa kaj solviĝas en la nebulon anstataŭ halti ĉe la
  // urbo-rondo. Oriente ( -x sur la norda mapo ) ĝi enfluas la lagon. La ribono
  // finiĝas ĉe la lagbordo ( RIVERA_BUŜO_X ) kaj mallarĝiĝas glate al punkto,
  // dum la akvonivelo krampiĝas al la laga nivelo — neniu duobla surfaco aŭ
  // paŝo ĉe la buŝo. La tereno-profundo ( alteco ) koloriĝas la akvon laŭ la fundo.
  // ⟪ La akvo de la skulptita tereno 📃 ⟫ — la rivero, la lago kaj la
  // nordorienta rivereto estas BAKITAJ en la akva maskon ( la skulptilo ). La
  // maska meshxo ( skulptaAkvo ) estas la akvo; la proceduraj ribonaj/lagaj
  // meshxoj konstruigxas nur sen skulptita datumaro ( SKULPTA_AKTIVA = false ),
  // kiel sekurkopio. La rivercentraj/lagrandaj helpiloj restas por la dokoj,
  // la kanuoj, la pontoj kaj la kanua fiziko, kiuj sekvas la saman geometrion.
  const riverData: RiverData | null = SKULPTA_AKTIVA ? null
    : konstruiRiveron(sceno, riveroZ, riveraAkvaNivelo, RIVERA_DUONLARĜO, 0o600, RIVERA_BUŜO_X, 0o110, alteco);
  const riveroNordOrienta: RiverData | null = SKULPTA_AKTIVA ? null
    : konstruiRiveronNordan(sceno, riveroNordOrientaX, riveraNordOrientaNivelo,
        RIVERA_NORDORIENTA_DUONLARĜO, RIVERA_NORDORIENTA_FONTO_Z, RIVERA_NORDORIENTA_BUŜO_Z, 0o60, alteco);
  const lago: RiverData | null = SKULPTA_AKTIVA ? null
    : konstruiLagon(sceno, LAGO_X, lagoZ(), lagoRadio, lagoNivelo(), alteco);

  // ⟪ La DERIVITA akvo ( la akvokalkulo ) 📃 ⟫ — la akvo venas de la fontoj
  // ( tero-datumaro/<mapo>/akvofontoj.ts ) kaj de la akvokalkulo; la masko
  // limigas la meshxon al la akva zono, kaj la surfaco sekvas la nivelan kampon
  // ( la riveroj malsupreniras, la basenoj restas plataj ). Nenio konstruigas se
  // ne estas akvo.
  const limojSkulptaj = skulptaAkvaLimoj();
  const skulptaAkvo: RiverData | null = limojSkulptaj
    ? konstruiSkulptitanAkvon(sceno, limojSkulptaj.x0, limojSkulptaj.z0,
        limojSkulptaj.x1, limojSkulptaj.z1, SKULPTA_PASO, skulptitaAkvo,
        akvaMeshNivelo, alteco)
    : null;

  // ⟪ Dokoj — alirejoj laŭ la riverbordo 📃 ⟫
  // La dokoj venas de SKULPTA_DOKOJ ( la terena skulptilo ) — ĉiu platformo
  // havas sian mondan pozicion ( x, z ) kaj profundon. La ludo konstruas la
  // dokojn rekte el la datumoj.
  const DOKOJ = SKULPTA_DOKOJ as SkulptaPlatformo[];
  const dokoKolizioj: { x: number; z: number; w: number; d: number; rot: number; y: number }[] = [];
  // La alto de la LANDa rando de ĉiu doko ( la kaja nivelo ) — la kajo, la
  // lampoj kaj la pontaj finoj legas ĝin, dum la kolizioj venas el la sekcioj.
  const dokoLandajAltoj: number[] = [];
  // ⟨ La doko-ŝtuparoj kiel VOJOJ 📃 ⟩ — ĉiu doko liveras la polilinion de sia
  // malsupreniro al la akvo; ĝi aliĝas al la voja reto kiel ORDINARA voja
  // difino kun `stuparo: true` ( vidu la sekcion de vojDifinoj sube ). Tiel la
  // ŝtupoj generiĝas per la voja maŝinaro — la sama diorita centro kaj andezitaj
  // randoj kiel ĉiu strato — kaj ili ŝTUPAS anstataŭ kurbiĝi.
  const dokoStuparoj: VojDifino[] = [];
  for ( let i = 0; i < DOKOJ.length; i++ ) {
    const rotacio = DOKOJ[i].rotacio ?? 0;
    const doko = konstruiDokon(sceno, DOKOJ[i].x, DOKOJ[i].z, rotacio, alteco, akvaNivelo, DOKOJ[i].profundo);
    // ⟨ Unu kolizio po SEKCIO 📃 ⟩ — la doko malsupreniras al la akvo per
    // ŝtuparo, do ĝi liveras la landejon kaj unu sekcion po ŝtupo. La fiziko
    // legas ĉiun kiel ordinaran rektangulan platformon kun ebena supro; la
    // ŝtupoj estas pli malaltaj ol 0o1/0o4, do la promenanto supreniras ilin.
    const kos = Math.cos(rotacio), sin = Math.sin(rotacio);
    for ( const s of doko.sekcioj ) {
      dokoKolizioj.push({ x: DOKOJ[i].x + kos * s.lx + sin * s.lz,
        z: DOKOJ[i].z - sin * s.lx + kos * s.lz, w: s.w, d: s.d, rot: rotacio, y: s.y });
    }
    dokoLandajAltoj.push(doko.platformY);
    if ( doko.stuparajPunktoj.length >= 2 ) {
      // ⟨ La plafono 📃 ⟩ — super la kaja nivelo la tereno estas kaptita, do la
      // plej alta ŝtupo restas samnivele kun la kajo ( kaj kun la vojo, kiu
      // alvenas tien ) anstataŭ supreniri la strandon.
      const plafono = doko.stuparaSupro;
      dokoStuparoj.push({ pts: doko.stuparajPunktoj, w: doko.platformWidth, stuparo: true,
        heightFn: ( sx, sz ) => Math.min(alteco(sx, sz), plafono) });
    }
  }
  // ⟪ Pontoj 📃 ⟫ — Ponto estas VOJO, kiu trapasas akvon inter du sekaj bordoj
  // ( vidu pontaTrunko sube ) — la ludo rekonas ĝin kaj aldonas tion, kion la
  // voja rubando ne povas: la OREn balustradon kaj la andezitan arkon malsupre.
  //
  // ⟨ Kial la dokoj NE plu difinas la ponton 📃 ⟩ — la ponto devenis de paro da
  // dokoj rigardantaj unu la alian ( de LANDbordo al LANDbordo ). Sed la dokoj
  // estas platformoj etenditaj de la kajo trans la deklivan bordon en la akvon,
  // do ili kuŝas ĜUSTE sub tiu deko: la platforma supro elstaris tra la ponto
  // ( la suda doko estas 2.4 unuojn pli alta ol la norda, do rekta deko trapasis
  // ĝian platon ) kaj la dokaj kadroj aperis interne de la ponto. La ponto nun
  // estas memstara TRAPASEJO en libera akvo, kaj la dokoj restas flanke kiel
  // surteriĝejoj por la boatoj.
  const dokaLandaj = DOKOJ.map(( d, i ) => {
    const rotacio = d.rotacio ?? 0;
    return { x: d.x + Math.sin(rotacio) * ( d.profundo / 2 ),
      z: d.z + Math.cos(rotacio) * ( d.profundo / 2 ), y: dokoLandajAltoj[i] + PONT_FINA_LEVIGXO };
  });
  await raporti();

  // ⟪ Kajo kaj doka avenuo ( la ĉefa urbo ) 📃 ⟫ — la ĉefaj vojoj de la kradaj
  // urboj konstruiĝas en konstruiKradanUrbon; ĉi tiuj estas la mond-nivelaj
  // vojoj de la ĉefa urbo, kiuj venas de SKULPTA_VOJOJ ( la terena skulptilo
  // — polilinioj kiujn la Vojoj-langeto redaktas ).
  // La doko-ŝtuparoj ( dokoStuparoj supren ) estas ordinaraj difinoj en la sama
  // listo — la voja konstruilo faras ilin per la sama sekco kiel la stratoj.
  const vojDifinoj: VojDifino[] = [ ...dokoStuparoj ];

  // ⟪ Kio estas ponto 📃 ⟩ — vojo, kies AMBAŬ finaj punktoj sidas sur SEKA tero
  // ( ili estas la alirejoj sur la bordoj ) kaj kiu pasas sufiĉe da akvo inter
  // ili ( almenaŭ 0o2/0o5 de la specimenoj laŭ la rektaj linioj ), estas
  // TRAPASEJO — ponto, ne bordo-vojo. La deko ricevas REKTAN supran funkcion
  // anstataŭ la terena ( la riverfundo estas 3–9 unuojn sub la akvo, do la voja
  // rubando dronus ) kaj la ponto ricevas la balustradon kaj la andezitan arkon.
  //
  // La deko finiĝas GXUSTE ĉe la surfaco de la kuniga plato sub sia fino ( vidu
  // pontaFinAlto sube — la plato kaj la ponto legas la SAMAN formulon ), do la
  // ponto daŭrigas la kajon sen ŝtupo. Kajo-vojoj — kiuj sekvas la akvon sed
  // restas sur la tero — havas 0 specimenojn da akvo, do ili neniam fariĝas
  // pontoj.
  // ⟨ Du etapoj 📃 ⟩ — la trunkodetekto ( ĉu vojo ESTAS ponto ) dependas nur de
  // la tereno kaj de la akvo, dum la FINAJ altoj bezonas la kunigojn. La
  // kunigoj siavice dependas nur de la polilinioj kaj de iliaj larĝoj, do ili
  // kalkuliĝas inter la du etapoj ( vidu sube ).
  //
  // Atentu: ponto legiĝas kiel UNU REKTA spano inter siaj du finoj, do desegnu
  // ĝin per du punktoj.
  function pontaTrunko( vojo: SkulptaVojo ): { ax: number; az: number; bx: number; bz: number } | null {
    if ( vojo.punktoj.length < 2 ) return null;
    const [ ax, az ] = vojo.punktoj[0];
    const [ bx, bz ] = vojo.punktoj[vojo.punktoj.length - 1];
    if ( skulptitaAkvo(ax, az) || skulptitaAkvo(bx, bz) ) return null;
    const difX = bx - ax, difZ = bz - az;
    const longo = Math.hypot(difX, difZ);
    if ( longo < 0o10 ) return null;   // 8 — tro mallonga por ponto
    const specimenoj = Math.max(0o10, Math.round(longo));
    let akvaj = 0;
    for ( let i = 0; i <= specimenoj; i++ ) {
      const t = i / specimenoj;
      if ( skulptitaAkvo(ax + difX * t, az + difZ * t) ) akvaj++;
    }
    if ( akvaj / ( specimenoj + 1 ) < 0o2/0o5 ) return null;   // 0.4
    return { ax, az, bx, bz };
  }
  // pontaFinAlto — La mondo-alto de la SURFACO de la ponto ĉe unu el siaj finoj.
  // Ordinare tio estas la tereno sub la fino ( vidu vojaSupro ).
  // ⟨ La kuniga plato super la fino 📃 ⟩ — sed ĉiu ponto alvenas SUR kunigan
  // platon ( la kunigo de la kajo, la avenuo aŭ la krada strato, kiun la ponto
  // renkontas ). La plato estas la sola videbla supraĵo tie kaj ĝi SIDAS PLI
  // ALTE ol la tereno — ĝi leviĝas ĝis la maksimuma angula alto de sia tuta
  // kvadrato ( vidu konstruiIntersekcajnPlatojn ). La ponto-finaj punktoj de
  // la datumoj sidas ĉe la RANDO de la vojo, do la specimenado ĉirkaŭ la fino
  // atingas nur duonon de la deklivo — la deko finiĝus gxis 0.4 unuojn sub la
  // plato kaj la ponto ŝajnus duone enfosita ĉe siaj surterigxejoj. Se kunigo
  // kusxas super la fino, ni do legas GXUSTE la platajn altojn — unu formulo,
  // du legantoj ( vidu plataAltoj ) — kaj la deko renkontas la platon sen ŝtupo.
  function pontaFinAlto( x: number, z: number, larĝo: number ): number {
    let plejProksima: VojaRetoKunigo | null = null, plejMallonga = Infinity;
    for ( const k of vojajKunigoj ) {
      const d = Math.hypot(k.x - x, k.z - z);
      if ( d < plejMallonga ) { plejMallonga = d; plejProksima = k; }
    }
    if ( plejProksima && plejMallonga < VOJA_EKSTERA_DUONO + KORNA_R )
      return plataAltoj(plejProksima.x, plejProksima.z, plejProksima.rotacio, alteco).supro;
    return vojaSupro(x, z, larĝo);
  }
  // vojaSupro — La mondo-alto de la SURFACO de vojo ĉe sia fino. La voja
  // konstruilo prenas la MAKSIMUMON de la du flankaj anguloj de la rubando ( je
  // ± la ekstera duon-larĝo ⊥ al la vojo ) kaj aldonas VOJA_SUPRO_LEVIGXO. La
  // ponto bezonas la saman nivelon, do ĝi specimenas la saman cirklon — ok
  // punktoj anstataŭ du, por ke la fino kongruu ankaŭ kun vojo, kiu trapasas
  // alidirekte ( la kajo ⊥ al la ponto ), sen ŝtupo.
  function vojaSupro( x: number, z: number, larĝo: number ): number {
    const duon = larĝo / 4 + VOJA_BORDA_LARĜO;   // la ekstera duon-larĝo de vojo ( vidu kreiVojajnBendojn )
    let maks = alteco(x, z);
    for ( let i = 0; i < 0o10; i++ ) {
      const ang = i * Math.PI / 4;
      maks = Math.max(maks, alteco(x + Math.cos(ang) * duon, z + Math.sin(ang) * duon));
    }
    // La ponto NE rondigas siajn altojn — la deka supro devas kuŝi ekzakte sur
    // la arko ( pontaDeko ), alie la deko finiĝus frakcio sub aŭ super la arko
    // kaj la abutmentoj montriĝus kiel ŝtupoj ( aŭ la deko dronus ).
    return maks + VOJA_SUPRO_LEVIGXO;
  }

  // La pontoj, kiujn vojoj vere kovris — ili ricevas la balustradon kaj la arkon.
  const pontaVojoj: { ax: number; az: number; ay: number; bx: number; bz: number; by: number; w: number }[] = [];

  // Konstruu ĉiun vojon el SKULPTA_VOJOJ. La skulptilo redaktas ilin kiel
  // poliliniojn kun larĝo; la ludo konstruas ilin per konstruiVojojn.
  const vojajRetajVojoj: VojaRetoVojo[] = [];
  // ⟨ Unua etapo — la ponto-larĝoj 📃 ⟩ — la kunigoj ( kaj do la pontaj
  // surterigxejoj ) bezonas la POLILINIOJN kaj iliajn larĝojn, ne la altojn. La
  // larĝo de ponto povas malsami ( pontoLarĝo ), kaj la kuniga reto legas ĝin,
  // do la unua etapo liveras ĝin. La trunkodetekto ankaŭ apartenas ĉi tien —
  // ĝi dependas nur de la tereno kaj de la akvo.
  const pontajTrunkoj: ({ ax: number; az: number; bx: number; bz: number } | null)[] = [];
  for ( const vojo of SKULPTA_VOJOJ as SkulptaVojo[] ) {
    // La indeksoj de la du listoj restas samaj — ankaŭ la tro mallongaj
    // polilinioj ricevas sian `null`, do la dua etapo povas legi pontajTrunkoj[i].
    const trunko = vojo.punktoj.length < 2 ? null : pontaTrunko(vojo);
    pontajTrunkoj.push(trunko);
    if ( vojo.punktoj.length < 2 ) continue;
    const vojaLarĝo = trunko ? ( vojo.pontoLarĝo ?? vojo.larĝo ) : vojo.larĝo;
    vojajRetajVojoj.push( { punktoj: vojo.punktoj, larĝo: vojaLarĝo } );
  }
  // ⟨ La kunigoj inter la etapo 📃 ⟩ — la reto nun estas kompleta, do trovi la
  // kunigojn ne plu bezonas ion ajn de la dua etapo. Ili liveras la platajn
  // centrojn, la rotaciojn, la fermitajn direktojn — kaj la altojn, kiujn la
  // pontaj finoj legas ( pontaFinAlto ).
  const vojajKunigoj = troviVojaRetajnKunigojn( vojajRetajVojoj, DOKOJ );
  const vojajKunigoPunktoj = vojajKunigoj.map( k => [ k.x, k.z ] as [ number, number ] );
  const vojajFermitaj = new Map( vojajKunigoj.map( k => [ k.x + "," + k.z, k.fermitaj ] ) );
  const vojajRotacioj = new Map( vojajKunigoj.map( k => [ k.x + "," + k.z, k.rotacio ] ) );
  // ⟨ La VERAJ brakoj de ĉiu kunigo 📃 ⟩ — la plata konstruilo alineas siajn
  // angulojn laŭ la brakoj mem ( vidu konstruiIntersekcajnPlatojn ), do la
  // oblikvaj brakoj de la skulptitaj vojoj ( la avenuo renkontas la kajon je
  // 0o10 gradoj ) ne plu tralikigxas en la rondigitan kornon. La krada urbo
  // ne havas ĉi tiun mapon — ties brakoj ĉiam kuŝas sur la aksoj, do la aksa
  // kadro de la plato estas ekzakta por gxi.
  const vojajDirektoj = new Map( vojajKunigoj.map( k => [ k.x + "," + k.z, k.direktaj ] ) );
  // ⟨ Dua etapo — la difinoj 📃 ⟩ — nun la pontaj finaj altoj povas legi la
  // kunigajn platojn, do ĉiu vojo ricevas sian difinon ( kaj la pontoj la
  // balustradon kaj la arkon ).
  for ( let vojaIndekso = 0; vojaIndekso < ( SKULPTA_VOJOJ as SkulptaVojo[] ).length; vojaIndekso++ ) {
    const vojo = ( SKULPTA_VOJOJ as SkulptaVojo[] )[vojaIndekso];
    if ( vojo.punktoj.length < 2 ) continue;
    const trunko = pontajTrunkoj[vojaIndekso];
    let ponto: { ax: number; az: number; ay: number; bx: number; bz: number; by: number } | null = null;
    const vojaLarĝo = trunko ? ( vojo.pontoLarĝo ?? vojo.larĝo ) : vojo.larĝo;
    if ( trunko ) ponto = { ...trunko, ay: pontaFinAlto(trunko.ax, trunko.az, vojaLarĝo),
      by: pontaFinAlto(trunko.bx, trunko.bz, vojaLarĝo) };
    let pontaHeight: (( x: number, z: number ) => number) | undefined;
    if ( ponto ) {
      const difX = ponto.bx - ponto.ax, difZ = ponto.bz - ponto.az;
      const kvadrato = difX * difX + difZ * difZ;
      pontaHeight = ( x, z ) => {
        const t = Math.max(0, Math.min(1, ( ( x - ponto.ax ) * difX + ( z - ponto.az ) * difZ ) / kvadrato));
        return pontaDeko(t, ponto.ay, ponto.by) - VOJA_SUPRO_LEVIGXO;
      };
    }
    if ( ponto ) pontaVojoj.push({ ...ponto, w: vojaLarĝo });
    // ⟨ Unu difino po vojo 📃 ⟩ — la tuta polilinio en unu difino, do la unua
    // kaj la lasta punktoj estas la veraj voj-finoj ( konstruiVojojn rondigas
    // ilin aux­tomate ). Aparta difino po segmento rompus la vojon meze kaj
    // rondigus cxiun kubuton kiel finon.
    const difino: VojDifino = { pts: vojo.punktoj, w: vojaLarĝo / 2, kapoj: true };
    // ⟨ Nur la ponta deko restas glata 📃 ⟩ — la ponto estas REKTA trabo, kaj ĝia
    // balustrado kaj arko ( konstruiPonton ) sekvas la saman rektan linion, do la
    // deko NE ŝtupas ( `glata: true` ). Ĉiuj ordinaraj vojoj — inkluzive la vojoj
    // AL la ponto — ŝtupas nature laŭ la tereno.
    if ( pontaHeight ) { difino.heightFn = pontaHeight; difino.glata = true; }
    vojDifinoj.push(difino);
  }
  // La doka LANDa rando — la rando kie la vojo ( aŭ la tero ) renkontas ĉiun
  // platformon, por la lampoj kaj la ĉapoj. La turno decidas al kiu flanko la
  // rando kuŝas ( 0 = norde, Math.PI = sude — la malproksima riverbordo ).
  const dockaLandaRando: [ number, number ][] =
    dokaLandaj.map(p => [ p.x, p.z ] as [ number, number ]);
  // La DOKAJ landrandoj ricevas NENIUN ĉapon. La kajo-vojo daŭriĝas ĝis la
  // eniranguloj de la NORDBAJNAJ dokaj platformoj ( SKULPTA_VOJOJ ) — tiuj
  // dokoj estas vojaj etendoj, do la platforma diorito mem rondigas la
  // transiron kaj la voja andezita bordo daŭriĝas kiel la doka andezita kadro.
  // ( La MALPROKSIMA-KRANTA doko — la turnita, sur la suda riverbordo — havas
  // neniun vojon: ĝi estas surterigxejo por la boatoj, ne etendo de la kajo. )
  // La malnovaj duonrondaj kapoj ĉi tie kuŝis SUR la doko mem kaj montris la
  // karakterizan arkon interne de ĉiu doko — la terena skulptilo ilustras la
  // dokojn kiel purajn dioritajn platformojn kun nur la andezita kadro, do la
  // kapoj kongruis nenion. La du kajo-FINAĴOJ tamen tenas siajn rondigitajn
  // ĉapojn ( malsupre ) — ili estas veraj voj-finaĵoj sur la tereno, ne dokaj
  // enirejoj.
  // ⟨ Unu reto, unu konstruado 📃 ⟩ — ĉiuj vojoj de la mondo ( la kradaj
  // stratoj, la spronoj de ĉiuj konstruaĵoj, la doko-ŝtuparoj kaj la
  // skulptitaj mondvojoj ) en UNU listo, kun ĉiuj iliaj kunigaj punktoj. Ĉiu
  // kunigo do ricevas sian truon en ĉiuj vojoj kaj sian ununuran platon —
  // inkluzive la kunigojn INTER la du retoj ( sprono al la kajo, la avenuo al
  // la krada ringa vojo ). Antaŭe la krado kaj la mondo konstruiĝis aparte, do
  // ĉiu tia kunigo restis sen truo kaj la du vojoj kuŝis unu en la alia.
  const ĉiujDifinoj: VojDifino[] = [ ...kradajDifinoj, ...vojDifinoj ];
  const ĉiujKunigoj: [ number, number ][] = [ ...kradajKunigoj, ...vojajKunigoPunktoj ];
  const ĉiujFermitaj = new Map<string, [ number, number ]>([ ...kradajFermitaj, ...vojajFermitaj ]);
  const ĉefajVojSpecimenoj = konstruiVojojn(sceno, ĉiujDifinoj, alteco, dioritaMaterialo, andezitaMaterialo, ĉiujKunigoj );
  konstruiIntersekcajnPlatojn( sceno, ĉiujKunigoj, alteco, dioritaMaterialo, andezitaMaterialo, ĉiujFermitaj, vojajRotacioj, vojajDirektoj );
  // La APOGAĴOJ de la pontoj — la balustrado SUR la deko kaj la andezita arko SUB ĝi.
  for ( const p of pontaVojoj )
    konstruiPonton(sceno, p.ax, p.az, p.ay, p.bx, p.bz, p.by, p.w, alteco, skulptitaAkvo, andezitaMaterialo, oraMaterialo);

  // Lamp-nodoj por la kajo — la samaj lampaj ŝablonoj kiel la krada reto.
  // NENIU ĉap-mesho konstruiĝas ĉe ĉi tiuj nodoj. La vojoj mem jam plenigas
  // ĉiun nodon. La nodoj restas nur por la lampoj.
  placajNodoj.push([ -0o124, -0o140 ]);
  placajNodoj.push([ 0o124, -0o122 ]);
  // La dokaj landrandoj — kie la kajo renkontas ĉiun platformon, la rando-nodo
  // markas la enirejon ( lampoj ).
  for ( const [ dx, dz ] of dockaLandaRando ) placajNodoj.push([ dx, dz ]);
  // La kvar-lampa ŝablono ĉirkaŭ la kaja placo-nodo ( la samaj ofsetoj kiel la
  // krada reto — la kradaj nodoj ricevas ilin en konstruiKradanUrbon ).
  const dokaPlacajNodoj: [ number, number ][] = [ [ -0o124, -0o140 ], [ 0o124, -0o122 ], ...dockaLandaRando ];

  // Rondigitaj ĉapoj — konstruiVojojn detektas la liberajn voj-finojn
  // aux­tomate ( la unua kaj la lasta punktoj de ĉiu difino ekster la kunigaj
  // truoj ), do la du kajo-finaĵoj kaj la aliaj skulptitaj finoj rondiĝas sen
  // mana listo. NENIU ĉapo ĉe la dokaj landrandoj ( vidu la noton super
  // konstruiVojojn ): la kajo-vojo daŭriĝas ĝis la eniranguloj kaj la
  // platforma diorito mem rondigas la transiron.
  await raporti();

  // ⟪ Lampoj 📃 ⟫ — la kradaj lampaj lokoj ( ambaŭ urboj ) kaj la kaja
  // placo-nodo en UNU sistemo. La mondaj plat-lampoj ( la arbar-randaj, lagaj
  // kaj montaj lampoj sur la diamantaj platformoj ) estas OBJEKTOJ de
  // SKULPTA_OBJEKTOJ ( hxeuxfoPlato ) — movitaj el la kodo al la datumaro,
  // redakteblaj per la terena skulptilo.
  const lampLokoj: { x: number; z: number; y: number; rotacio?: number }[] = urboj.flatMap(r => r.lampLokoj);
  const addLamp = kreiLampAldonilon(konstruSpecoj, lampLokoj);
  // La kvar-lampa ŝablono ĉirkaŭ la kaja placo-nodo ( la samaj ofsetoj kiel la
  // krada reto — la kradaj nodoj ricevas ilin en konstruiKradanUrbon ).
  for ( const [ aX, aZ ] of dokaPlacajNodoj ) {
    for ( const [ dx, dz ] of [ [ -0o21/0o10, -0o21/0o10 ], [ 0o21/0o10, -0o21/0o10 ], [ -0o21/0o10, 0o21/0o10 ], [ 0o21/0o10, 0o21/0o10 ] ] ) addLamp(aX + dx, aZ + dz);
  }

  // Lampoj kiel OBJEKTOJ ( la terena skulptilo ) — la metitaj hxeuxfoj de
  // SKULPTA_OBJEKTOJ aliĝas al la SAMA lampa sistemo kiel la kradaj/kajaj
  // lampoj. la flamoj animiĝas kune ( sperto.ts vokas unu
  // animaciiFlammojn ) kaj la kolizioj aldoniĝas. La nuda lampo sidas rekte
  // sur la tero; la varianto hxeuxfoPlato staras sur la rondigita diamanta
  // plato ( la sama platformo kiel la antaŭaj mapaj lampoj ) kaj ricevas la
  // saman levitan bazon kiel la malnovaj plat-lampoj.
  for ( const o of SKULPTA_OBJEKTOJ ) {
    if ( o.speco === "hxeuxfo" ) {
      lampLokoj.push({ x: o.x, z: o.z, y: alteco(o.x, o.z) + 0o1/0o40, rotacio: o.rotacio });
    } else if ( o.speco === "hxeuxfoPlato" ) {
      konstruiPeriferiajnPlatformojn(sceno, [ [ o.x, o.z ] ], alteco, dioritaMaterialo, andezitaMaterialo);
      lampLokoj.push({ x: o.x, z: o.z, y: alteco(o.x, o.z) + 0o4/0o10 - 0o1/0o40, rotacio: o.rotacio });
    }
  }

  const lampSistemo = konstruiHxeuxfojn(sceno, lampLokoj, dioritaMaterialo, oraMaterialo);
  // Lampaj kolizioj — malgrandaj cirkloj ĉirkaŭ ĉiu lampa kolono.
  for ( const l of lampLokoj ) kolizioj.push({ x: l.x, z: l.z, r: 0o5/0o10 });
  await raporti();

  // ⟪ Vegetajxo 📃 ⟫
  // La rivero/lago estas la skulptita akvo ( la masko ) — la plantoj restas
  // ekster la akvo, kien ajn la skulptilo pentris gxin.
  const ekskluziviRiveron = ( x: number, z: number ) => akvo(x, z);
  // La kunigitaj vojspecimenoj ( ambaŭ kradaj urboj + la spronoj + la kajo/
  // avenuo ) — la vegetajxo evitas ĉiujn vojojn de ambaŭ urboj.
  // La specimensampado de la UNU konstruado jam kovras ĉiujn vojojn — la
  // kradajn stratojn, la spronojn kaj la skulptitajn mondvojojn.
  const vojSpecimenoj = ĉefajVojSpecimenoj;
  // ⟪ Krada indekso por la voja ekskludo 📃 ⟫ — ĉelo-krado por ke la vegetajxo
  // ne skanu ĉiun vojspecimenon por ĉiu kandidata arbo ( O(1) anstataŭ O(n) ).
  const VOJA_ĈELO = 0o10;
  const vojaKrado = new Map<number, THREE.Vector3[]>();
  for ( const p of vojSpecimenoj ) {
    const kx = Math.floor(p.x / VOJA_ĈELO), kz = Math.floor(p.z / VOJA_ĈELO);
    const klavo = kx * 0o100000 + kz;
    let ĉelo = vojaKrado.get(klavo);
    if ( !ĉelo ) { ĉelo = []; vojaKrado.set(klavo, ĉelo); }
    ĉelo.push(p);
  }
  const ekskluziviVojojn = ( x: number, z: number, m: number ) => {
    // Krada sercxo anstataux la lineara skanado de cxuj vojspecimenoj.
    const r = Math.ceil(m / VOJA_ĈELO) + 1;
    const bx = Math.floor(x / VOJA_ĈELO), bz = Math.floor(z / VOJA_ĈELO);
    const m2 = m * m;
    for ( let dx = -r; dx <= r; dx++ ) {
      for ( let dz = -r; dz <= r; dz++ ) {
        const ĉelo = vojaKrado.get(( bx + dx ) * 0o100000 + ( bz + dz ));
        if ( !ĉelo ) continue;
        for ( const p of ĉelo ) {
          const ddx = x - p.x, ddz = z - p.z;
          if ( ddx * ddx + ddz * ddz < m2 ) return true;
        }
      }
    }
    // La lampaj diamantaj platformoj ( la hxeuxfoPlato-objektoj de la
    // datumaro — la eksaj periferiaj/lagaj/montaj plat-lampoj ) estas
    // pavimitaj restlokoj — neniu planto aperu sur ili.
    for ( const o of SKULPTA_OBJEKTOJ ) {
      if ( o.speco !== "hxeuxfoPlato" ) continue;
      if ( Math.hypot(x - o.x, z - o.z) < m + 3 ) return true;
    }
    // La keŭfĥesoj staras en la herbejo — neniu planto tra ili.
    // ⟨ Malgranda rando 📃 ⟩ — la strukturo estas mallarĝa ( R = 0.49, 3.6 alta ),
    // sed la ekskludo estis 2.5 unuojn PLI granda ol la marĝeno de la vokanto. Ĉe
    // la malalta herbo ( m = 2 ) tio forprenis diskon de 9 unuoj da diametro ĉirkaŭ
    // ĉiu el la kvar keŭfĥesoj ĉe la anguloj de la centra sanktejo — la anguloj de
    // la centra konstruaĵo restis sen herbo, dum la gazono finiĝis malproksime de
    // la strukturoj. Nun la ekskludo estas nur iomete pli granda ol la disko de la
    // makulo mem ( 1.35 ), do la herbo kreskas ĝis la piedo de ĉiu strukturo.
    for ( const l of keuxfhxesoLokoj ) if ( Math.hypot(x - l.x, z - l.z) < m + 0o1/0o2 ) return true;
    return false;
  };
  const ekskluziviKonstruajxon = ( x: number, z: number, m: number ) => {
    for ( const s of konstruSpecoj ) if ( Math.hypot(x - s.x, z - s.z) < s.w * 0o23/0o40 + m ) return true;
    return false;
  };
  // Betuloj ( arbara periferio ) — la arbaro plenigas la TUTAN valan biomon
  // ( la arbareroj de tereno.ts ). La metado specimenas uniforme tra la tuta
  // mondo kaj la biomo-filtrilo ( VALAJ_BIOMOJ = la arbareroj ) tenas la
  // arbojn en la valaj zonoj — tiel nenia vala loko restas malplena, kaj la
  // malplenaj lokoj ekster la arbareroj estas la ebenaĵa biomo. La inter-arba
  // distanco estas malgranda, por ke la arbaro legiĝu kiel vera arbaro.
  const arboj = metiArbojn(alteco, 0o1400, 0o600, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o53104, [], 0o10, undefined, VALAJ_BIOMOJ);
  const betulajTrunkoj = konstruiArbaron(sceno, arboj);

  // Larikoj — miksitaj kun betuloj por pli diversa arbaro
  // La inter-arba distanco estas malgranda, por ke la larikoj vere aperu
  // inter la betuloj — tro granda liberspaco lasis preskaŭ neniun lokon.
  const larikoj = metiArbojn(alteco, 0o700, 0o600, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o53114, arboj, 0o10, kronaRadiusoLarika, VALAJ_BIOMOJ);
  const larikajTrunkoj = konstruiLarikon(sceno, larikoj);

  // Ĥŝakŝlefoj ( ı],ͷ̗ɔʞ ֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ ) — purpuraj laktuk-arboj, 3–5
  // tavoloj de kvar grandaj kurbiĝintaj folioj kaj segmenta ŝelo
  const hxsxaksxlefoj = metiArbojn(alteco, 0o400, 0o600, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o62445, [ ...arboj, ...larikoj ], 0o10, kronaRadiusoHxsxaksxlefa, VALAJ_BIOMOJ);
  const hxsxaksxlefojTrunkoj = konstruiHxsxaksxlefojn(sceno, hxsxaksxlefoj);

  // Trunkaj likenoj — tridimensiaj krustaj buloj sur iuj arbotrunkoj. La
  // trunkaj matricoj jam donas la realan pozicion/kliniĝon de ĉiu arbo, do
  // la likenoj sidas ĝuste sur la ŝelo sen ripeto de la hazardaj vokoj.
  konstruiTrunkajnLikenojn(sceno, [ betulajTrunkoj, larikajTrunkoj, hxsxaksxlefojTrunkoj ]);
  await raporti();

  // Filikoj — pli da kvanto, apud arboj kaj vojoj
  konstruiFilikojn(sceno, 0o400, alteco, arboj, vojSpecimenoj, ekskluziviRiveron, ekskluziviVojojn, VALAJ_BIOMOJ);
  await jesi();

  // Purpuraj plantoj — ringo de koloro ĉe la urba rando, kie la vojoj dissolvigas en arbaron
  konstruiPurpurajnPlantojn(sceno, 0o200, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, VALAJ_BIOMOJ);
  await jesi();

  // Purpuraj filikoj — pli altaj violetaj frondoj kiel en Four Groves
  konstruiPurpurajnFilikojn(sceno, 0o200, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, VALAJ_BIOMOJ);
  await jesi();
  // Altaj purpuraj filikoj — la arboformaj, kun la arba listo por ke ili ne
  // kresku en la trunkojn/kronojn de la jam metitaj betuloj, larikoj kaj
  // Ĥŝakŝlefoj.
  konstruiAltajnPurpurajnFilikojn(sceno, 0o100, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    [ ...arboj, ...larikoj, ...hxsxaksxlefoj ], VALAJ_BIOMOJ);
  await jesi();

  // Liken-sxtonoj — en la arbaro; la metitaj pozicioj ankoras la likenojn.
  // ⟨ Solidaj sxtonoj 📃 ⟩ — ili aldonas koliziojn, do ili evitu ankaŭ la
  // konstruajxojn ( ne nur la vojojn kaj la akvon ).
  const likenSxtonoj = konstruiLikenSxtonojn(sceno, 0o60, alteco, ekskluziviRiveron,
    ekskluziviVojojn, ekskluziviKonstruajxon);
  await jesi();

  // Likeno — krustaj makuloj sur la grundo apud arboj kaj sxtonoj
  konstruiLikenojn(sceno, 0o200, alteco, [ ...arboj, ...larikoj, ...hxsxaksxlefoj ], likenSxtonoj,
    ekskluziviRiveron, ekskluziviVojojn, false, ekskluziviKonstruajxon);

  // Herbo — densa herbtapiso en la arbaro kaj randoj
  konstruiHerbon(sceno, 0o1170, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, VALAJ_BIOMOJ);
  await jesi();

  // ⟪ La herba tavolo 📃 ⟫ — la malalta herbo de la TUTA mondo. Gxi ALDONIGXAS
  // al la malnova herbo, ne anstatauxas gxin: la malnovaj tufoj restas la altaj,
  // disaj herberoj de la arbaro kaj de la ebenaĵo ( vidu konstruiHerbon ), dum
  // ĉi tiu krado metas malaltan, KONTINUAN gazonon sub ili — sen ĝi la grundo
  // videblas inter la malnovaj tufoj. La tabuloj de la krado kaj la mallonga
  // fada distanco ( vidu konstruiHerbanTavolon ) tenas la laboron de la GPU
  // malgranda — nur la tabuloj apud la ludanto atingas la bildilon.
  await konstruiHerbanTavolon(sceno, jesi, alteco, ekskluziviRiveron, ekskluziviVojojn,
    ekskluziviKonstruajxon, [ ...VALAJ_BIOMOJ, ...EBENAJAJ_BIOMOJ ],
    surPosxtelefono ? 0o5/0o10 : 0o10/0o10);

  // ⟪ Ebenaĵo 📃 ⟫ — la malalta grundo ekster la arbareroj. Nur etaj plantoj
  // kreskas tie ( herbo kaj purpuraj plantoj, dense ) — neniaj arboj, neniaj
  // filikoj. La biomo-filtrilo ( EBENAJAJ_BIOMOJ ) tenas ilin en la ebenaĵa
  // biomo; la arbareroj kaj la akvo restas liberaj, kaj la lokoj sen biomo
  // ( aŭtomata / nenio ) ricevas NENION — la ebenaĵo estas la plantohava
  // malalta grundo, kontraste al la nuda aŭtomata.
  await jesi();
  konstruiHerbon(sceno, 0o2000, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, EBENAJAJ_BIOMOJ);
  konstruiPurpurajnPlantojn(sceno, 0o1000, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, EBENAJAJ_BIOMOJ);
  await jesi();

  // Musko montetoj — apud arboj tra la arbaro
  konstruiMusxajnMontetojn(sceno, 0o200, alteco, arboj, ekskluziviRiveron, ekskluziviVojojn,
    ekskluziviKonstruajxon);
  await jesi();

  // Falintaj trunkoj — en la densa arbaro ( la konstruanto redonas la
  // centrojn kaj la piedajn randojn por la kolizioj de la supra bloko )
  const falintajTrunkoj = konstruiFalintajnTrunkojn(sceno, 0o40, alteco, arboj, ekskluziviRiveron,
    ekskluziviVojojn, ekskluziviKonstruajxon);
  await jesi();

  // Cetkuoj ( ſᶘɔ ɭʃƽɹ / Equisetum praealtum ) — la altaj senbranĉaj skuraj
  // kanoj kun strobiloj, laŭ la riverbordoj ( la lago estas akvo, do neniu
  // planto ene de la lagdisko )
  // La kanoj kreskas nur en la EKVIZETA biomo ( la pentrita ekvizeta zono sur
  // la akvo ) — la riverbendo kaj la lagrando de la skulptita masko.
  konstruiCetkuojn(sceno, 0o110, alteco, riveroZ,
    ( x: number, z: number ) => ekskluziviKonstruajxon(x, z, 3), ekskluziviVojojn, EKVIZETO_BIOMOJ);
  await raporti();

  // ⟪ Vegetaĵo ĉirkaŭ la lago 📃 ⟫ — la lago sidas malproksime oriente
  // ( dist ~236 ), ekster la radiuso de la urba arbaro, do ĝiaj bordoj
  // restis nudaj. Ringo da betuloj kaj larikoj sekvas la ondigitan lagrandon
  // ( lagoRadio ), sur la sekaj bordoj ekster la lagrando; herbo kovras la
  // bordon kaj kareksoj staras ĉe la akvo. La orienta malseka kavo restas
  // malplena ( akvaNivelo kontrolas la sekecon ). La ĉef-arbaraj arboj estas
  // ankaŭ evitu-ankroj, por ke la ringo ne kunpremu la urban arbaron.
  const lagArboj = metiArbojnCxirkauLagon(alteco, 0o60, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53120, [ ...arboj, ...larikoj ], 0o10,
    undefined, VALAJ_BIOMOJ);
  const lagTrunkoj = konstruiArbaron(sceno, lagArboj);
  await jesi();
  const lagLarikoj = metiArbojnCxirkauLagon(alteco, 0o40, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53121, [ ...lagArboj, ...arboj, ...larikoj ], 0o10,
    kronaRadiusoLarika, VALAJ_BIOMOJ);
  const lagLarikajTrunkoj = konstruiLarikon(sceno, lagLarikoj);
  // Ĥŝakŝlefoj — purpuraj laktuk-arboj miksitaj en la lagringon, por ke la
  // lagbordo ricevu la saman specan diversecon kiel la ĉef-arbaro.
  const lagHxsxaksxlefoj = metiArbojnCxirkauLagon(alteco, 0o30, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53126, [ ...lagArboj, ...lagLarikoj, ...arboj, ...larikoj ], 0o10,
    kronaRadiusoHxsxaksxlefa, VALAJ_BIOMOJ);
  const lagHxsxaksxlefojTrunkoj = konstruiHxsxaksxlefojn(sceno, lagHxsxaksxlefoj);
  await jesi();
  // Trunkaj likenoj ankaux sur la lag-arboj ( nova semo por malsamaj buloj )
  konstruiTrunkajnLikenojn(sceno, [ lagTrunkoj, lagLarikajTrunkoj, lagHxsxaksxlefojTrunkoj ], 0o62452);
  konstruiHerbonCxirkauLagon(sceno, 0o300, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53122);
  // Cakeoj ( ſᶘᴜ ſɭɔ / Equisetum telmateia ) — la grandaj branĉet-kirlaj
  // ĉevalvostoj, kareksa rando ĉe la lagrando, kie la bordo estas malseka
  // ( ne pli ol ~2 unuojn super la akvonivelo ). La sama EKVIZETA biomo kiel
  // la cetkuoj — la du ekvizetaj specioj kreskas nur en la pentrita zono.
  konstruiCakeojn(sceno, 0o110, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviKonstruajxon, ekskluziviVojojn, 11605, EKVIZETO_BIOMOJ);
  // Subkreskajxo cxirkaux la lago — cxiuj malgrandaj plantoj ( verdaj filikoj,
  // malaltaj purpuraj plantoj, purpuraj filikoj, herbotufoj, musko-montetoj
  // kaj likenaj makuloj ) sekvas la ondigitan lagrandon kaj klasterigxas
  // cxirkaux la lagaj arboj, sur la sekaj bordoj.
  konstruiLaganSubkreskajxojn(sceno, 0o470, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    [ ...lagArboj, ...lagLarikoj, ...lagHxsxaksxlefoj ], [ ...lagArboj, ...lagLarikoj, ...lagHxsxaksxlefoj ],
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53134, VALAJ_BIOMOJ);
  await raporti();

  // ⟪ Montara vegetajxo 📃 ⟫ — la norda montaro ( montaroNorda en tereno.ts )
  // ricevas alpan larikaron sur la deklivoj, betulojn pli sube, kaj rokojn
  // kaj likenojn sur la krestoj. La arboj sidas nur sur piedeblaj deklivoj sub
  // la arbolinio ( metiMontajnArbojn filtras la krutajn murojn kaj la altajn
  // pintojn ), do la montaro restas transirebla tra la selo. La montaj arboj
  // evitas la urban arbaron kaj la suda fado dissolvas la montaran arbaron en
  // la valan, por ke la du zonoj kuniĝu nature sen kudro; la arbolinia fado
  // kaj la spron-silueta x-envelopo rompas la rektangulan bordon de la arbaro.
  // La betuloj sidas ĉe la piedo, en la transira zono inter la valo kaj la
  // montaraj deklivoj; la larikoj kovras la tutan monton, ambaŭflanke de la
  // kresto, sub la arbolinio.
  const montajBetuloj = metiMontajnArbojn(alteco, 0o100, 0o210, 0o270,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53132,
    [ ...arboj, ...larikoj ], 0o10, undefined, 0, 0o340, MONTAJ_BIOMOJ);
  const montajBetulaTrunkoj = konstruiArbaron(sceno, montajBetuloj);
  const montajLarikoj = metiMontajnArbojn(alteco, 0o200, 0o260, 0o420,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53130,
    [ ...montajBetuloj, ...arboj, ...larikoj ], 0o10, kronaRadiusoLarika, 0, 0o340, MONTAJ_BIOMOJ);
  const montajLarikaTrunkoj = konstruiLarikon(sceno, montajLarikoj);
  await jesi();
  const montajRokoj = konstruiMontajnRokojn(sceno, 0o100, alteco, ekskluziviRiveron, ekskluziviVojojn,
    undefined, 0, 0o340, 0o260, 0o160, MONTAJ_BIOMOJ, ekskluziviKonstruajxon);
  // Likenoj sur la montaro — grupigitaj ĉirkaŭ la montaj arboj kaj rokoj,
  // kun la samaj spur-siluetaj formoj kaj alta disdono kiel la rokoj.
  konstruiLikenojn(sceno, 0o150, alteco, [ ...montajLarikoj, ...montajBetuloj ], montajRokoj,
    ekskluziviRiveron, ekskluziviVojojn, true, ekskluziviKonstruajxon);
  // Trunkaj likenoj sur la montaj larikoj kaj betuloj.
  konstruiTrunkajnLikenojn(sceno, [ montajLarikaTrunkoj, montajBetulaTrunkoj ], 0o62453);

  // ⟪ Vegetaĵo de la nordorienta monto 📃 ⟫ — la nova monto oriente-norde de la
  // lago ( montaroNordOrienta, centro ≈ -0o350,0o114 ) ricevas sian propran
  // malgrandan larikaron kaj rokojn. La samaj montaj helpiloj ( kun cx/xDuono
  // parametroj ) metu la arbojn laŭ la spur-silueta envelopo de ĉi tiu monto,
  // sub la arbolinio, kaj la rokojn sur la pintoj kaj supraj deklivoj.
  const neBetuloj = metiMontajnArbojn(alteco, 0o40, 0o40, 0o140,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53135,
    [ ...arboj, ...larikoj ], 0o10, undefined, -0o350, 0o64, MONTAJ_BIOMOJ);
  const neBetulaTrunkoj = konstruiArbaron(sceno, neBetuloj);
  const neLarikoj = metiMontajnArbojn(alteco, 0o60, 0o40, 0o160,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53140,
    [ ...neBetuloj, ...montajBetuloj, ...montajLarikoj, ...arboj, ...larikoj ], 0o10, kronaRadiusoLarika,
    -0o350, 0o64, MONTAJ_BIOMOJ);
  const neLarikaTrunkoj = konstruiLarikon(sceno, neLarikoj);
  const neRokoj = konstruiMontajnRokojn(sceno, 0o40, alteco, ekskluziviRiveron, ekskluziviVojojn,
    624513, -0o350, 0o64, 0o40, 0o100, MONTAJ_BIOMOJ, ekskluziviKonstruajxon);
  konstruiLikenojn(sceno, 0o60, alteco, [ ...neLarikoj, ...neBetuloj ], neRokoj,
    ekskluziviRiveron, ekskluziviVojojn, true, ekskluziviKonstruajxon);
  konstruiTrunkajnLikenojn(sceno, [ neLarikaTrunkoj, neBetulaTrunkoj ], 0o62450);
  // Subkreskajxo — verdaj filikoj, malaltaj purpuraj plantoj, purpuraj
  // filikoj, herbotufoj, musko-montetoj kaj likenoj tra la tutaj betulaj kaj
  // larikaj arbaroj ( valaj kaj montaj ). La plantoj klasterigxas cxirkaux la
  // arboj — gxuste ekster la kronoj — kaj la cetero sekvas la montan
  // spur-siluetan envelopon, do la subkreskajxo kovras kaj la valajn kaj la
  // montajn arbarojn. Cxiuj arboj estas evitu-ankroj, por ke neniu planto
  // kresku en la trunkojn aŭ kronojn, kaj la konstruajxoj estas ekskluditaj.
  konstruiMontajnSubkreskajxojn(sceno, 0o3000, alteco,
    [ ...arboj, ...larikoj, ...montajLarikoj, ...montajBetuloj ],
    [ ...arboj, ...larikoj, ...hxsxaksxlefoj, ...montajLarikoj, ...montajBetuloj ],
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53133, MONTAJ_BIOMOJ);
  await jesi();

  // Pussxlefoj ( ſ̀ȷɔ ı],ͷ̗ɔʞ ſןɹɔ˞ ꞁȷ̀ᴜꞇ / Pusŝlefo ) — fern-grandaj purpuraj
  // laktukaj plantoj, etaj Ĥŝakŝlefoj kun travideblaj manĝeblaj beroj. Ilia
  // metado estas la plant-spawn de la skulptita tereno — la biomo ( tereno.ts )
  // elektas la densecon laŭ la alto. plena sur la montaroj ( la natura hejmo
  // de la planto ), malofta en la valo, nula super la arbolinio. La ber-klastroj
  // estas manĝaĵobjektoj, kiujn la ludanto povas kolekti.
  const pussxlefoj = metiPussxlefojn(alteco, 0o200, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o62450, [ ...arboj, ...larikoj, ...hxsxaksxlefoj, ...montajLarikoj, ...montajBetuloj,
      ...neLarikoj, ...neBetuloj ]);
  konstruiPussxlefojn(sceno, pussxlefoj);
  const pussxlefoBeroj = kreiPussxlefojnBerojn(sceno, pussxlefoj);
  await raporti();

  // ⟪ Nebulaj makuloj 📃 ⟫ — UNU GPU-punktsistemo ( antaŭe ĉirkaŭ 0o70
  // individuaj SpriteMaterial-oj — unu shader-programo kaj unu draw-call po
  // sprajto ). La makuloj restas ankrigitaj al la mondo; la orienten-driva
  // movo kun la ĉirkaŭvolvo ( la malnova ±0o160-volvo ) okazas en la vertica
  // shadero, kaj la per-punkta semo/grando/opakeco konservas la VARIOJN de
  // la malnovaj sprajtoj — la sama konstrua modelo kiel la veteraj
  // sistemoj de scena.ts.
  const nebulSistemo = ( (): NebulaSistemo => {
    const nebulaTeksajxo = kreiNebulanTeksajxon();
    // Fiksitaj makuloj ĉirkaŭ la urbo ( la malnovaj dek manifoldaj lokoj ).
    const fiksitaj: number[][] = [
      [ -0o110, -0o110, 0o24/0o10, 0o60, 0o5/0o40 ], [ -0o40, -0o110, 0o215/0o100, 0o60, 0o3/0o20 ],
      [ 0o30, -0o110, 0o263/0o100, 0o60, 0o5/0o40 ], [ 0o70, -0o100, 0o115/0o40, 0o40, 0o5/0o40 ],
      [ -0o60, -0o60, 0o163/0o100, 0o40, 0o11/0o100 ], [ -0o110, 0o40, 0o63/0o40, 0o30, 0o3/0o40 ],
      [ 0o110, -0o60, 0o163/0o100, 0o30, 0o3/0o40 ], [ -0o70, 0o110, 0o14/0o10, 0o30, 0o3/0o40 ],
      [ 0o100, 0o110, 0o155/0o100, 0o30, 0o5/0o100 ], [ -0o130, 0o10, 0o55/0o40, 0o30, 0o1/0o10 ],
    ];
    const N = fiksitaj.length + 0o60;
    const pozicioj = new Float32Array(N * 3);
    const semoj = new Float32Array(N);
    const grandoj = new Float32Array(N);
    const opakecoj = new Float32Array(N);
    const rapidoj = new Float32Array(N);
    for ( let i = 0; i < N; i++ ) {
      let x, z, y, skalo, op, rapido;
      if ( i < fiksitaj.length ) {
        [ x, z, y, skalo, op ] = fiksitaj[i];
        rapido = 0o15/0o40 + Math.random() * 0o10/0o10;
      } else {
        // La hazarda ringo — la sama disdono kiel la malnovaj 0o60 sprajtoj.
        const a = Math.random() * Math.PI * 2;
        const r = 0o130 + Math.random() * 0o300;
        x = Math.cos(a) * r; z = Math.sin(a) * r;
        y = alteco(x, z) + 0o4/0o10 + Math.random() * 3;
        skalo = 0o60 + Math.random() * 0o130;
        op = 0o1/0o10 + Math.random() * 0o5/0o40;
        rapido = 0o15/0o100 + Math.random() * 0o4/0o10;
      }
      pozicioj[i * 3] = x; pozicioj[i * 3 + 1] = y; pozicioj[i * 3 + 2] = z;
      grandoj[i] = skalo;
      opakecoj[i] = op;
      rapidoj[i] = rapido;
      semoj[i] = Math.random();
    }
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.BufferAttribute(pozicioj, 3));
    geometrio.setAttribute("aSeed", new THREE.BufferAttribute(semoj, 1));
    geometrio.setAttribute("aGrando", new THREE.BufferAttribute(grandoj, 1));
    geometrio.setAttribute("aOpakeco", new THREE.BufferAttribute(opakecoj, 1));
    geometrio.setAttribute("aRapido", new THREE.BufferAttribute(rapidoj, 1));
    const uTime = { value: 0 };
    const materialo = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, fog: false,
      uniforms: {
        uTime,
        uMap: { value: nebulaTeksajxo },
      },
      vertexShader: `
        uniform float uTime;
        attribute float aSeed;
        attribute float aGrando;
        attribute float aOpakeco;
        attribute float aRapido;
        varying float vOpakeco;
        void main() {
          // Orienten-driva movo kun la ĉirkaŭvolvo ( la malnova volvo je
          // ±0o160 — mod() ĉirkaŭvolvas sen la CPU-pozicia ĝisdatigo ).
          vec3 p = position;
          float falo = uTime * aRapido;
          p.x = mod(p.x + falo + 160.0, 320.0) - 160.0;
          vOpakeco = aOpakeco;
          vec4 mv = viewMatrix * vec4(p, 1.0);
          // Mondo-grando → pikseloj ( la sama konverta formulo kiel la neĝo ).
          gl_PointSize = aGrando * ( 100.0 / -mv.z );
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        varying float vOpakeco;
        void main() {
          vec4 tex = texture2D(uMap, gl_PointCoord);
          gl_FragColor = vec4(tex.rgb, tex.a * vOpakeco);
        }
      `,
    });
    const punktoj = new THREE.Points(geometrio, materialo);
    punktoj.frustumCulled = false;
    sceno.add(punktoj);
    return { punktoj, uTime };
  } )();
  await raporti();

  // ⟪ Ktenoforoj 📃 ⟫
  // Travideblaj kombuloj ( Beroe, Mnemiopsis, Pleŭrobrakia ) naĝas en la rivero,
  // evitante la dokojn. Ilia animacio okazas en sperto.ts ( gxisdatigiBestojn ).
  const bestoj = konstruiBestojn(sceno, 0o30, riveroZ, riveraAkvaNivelo,
    { x: LAGO_X, z: lagoZ(), r: LAGO_RZ, nivelo: lagoNivelo() });

  // ⟨ Solida vegetaĵo 📃 ⟩ — nur la trunkoj, rokoj kaj falintaj trunkoj estas
  // solidoj ( la foliaro kaj la herbo restas traireblaj ). Ĉiu speco kalkulas
  // sian propran piedan radiuson ĉi tie — la konstruantoj uzas fiksitajn
  // geometriojn, do la radiusoj kongruas kun la vizaĝa larĝo per konstruo.
  const trunkaR = 0o5/0o20;           // la malsupra radiuso de la trunka cilindro ( betulo · lariko · ĥŝakŝlefo )
  for ( const t of arboj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of larikoj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of hxsxaksxlefoj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  // La montaraj, nordorient-montaj kaj lag-ringaj arboj — la samaj trunkoj.
  for ( const t of montajBetuloj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of montajLarikoj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of neBetuloj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of neLarikoj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of lagArboj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of lagLarikoj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  for ( const t of lagHxsxaksxlefoj ) kolizioj.push({ x: t.x, z: t.z, r: trunkaR });
  // Likenaj kaj montaraj rokoj — la instancigita ikosaedro havas radiuson = skalo.
  for ( const r of likenSxtonoj ) kolizioj.push({ x: r.x, z: r.z, r: r.s });
  for ( const r of montajRokoj ) kolizioj.push({ x: r.x, z: r.z, r: r.s });
  for ( const r of neRokoj ) kolizioj.push({ x: r.x, z: r.z, r: r.s });
  // Falintaj trunkoj — kreu la saman mult-angulan ringon, kiun la konstruanto
  // metas per sia Eulera rotacio ( la cilindro kuŝas trans la grundo ).
  const fTrunkoj = falintajTrunkoj as [ number, number ][][];
  for ( const ringo of fTrunkoj ) {
    for ( let k = 0; k < ringo.length; k++ ) {
      const [ x, z ] = ringo[k];
      kolizioj.push({ x, z, r: 0o3/0o20 });
    }
  }

  // ⟪ Neĝopetreloj 📃 ⟫
  // Pure blankaj marbirdoj ( ſᶘᴜ ſȷᴜ ſɭэ ſɭɔ / Pagodroma nivea ) rondflugas
  // super la biomoj — triono super la montara biomo ( la neĝaj pintoj ), la
  // cetero super la vala lago kaj rivero. Ilia animacio okazas en sperto.ts
  // ( gxisdatigiPetrelojn ).
  const petreloj = konstruiPetrelojn(sceno, 0o20, alteco);
  await raporti();

  // ⟪ NPC-agordo 📃 ⟫ — la vestoj vivas en eskekoj/vestaro/vestoj.ts ( VESTOJ );
  // tiu ĉi modulo nur alinomas ilin por la urba sistemo.
  const VESTA_LISTO: Vesto[] = VESTOJ;

  // NPC-oj laux la pentrita NPC-tavolo ( la skulptilo ) — la ĉeloj kun bito 4
  // de SKULPTA_BESTOJ, kiel mondaj pozicioj. La NPC-oj piediras nur sur tero.
  // la akvaj ĉeloj kaj la konstruajxoj estas ekskluditaj. La defaŭltaj lokoj
  // ( la urbo ) estas bakitaj en la tavolon; malplena zono = neniuj NPC-oj.
  const npcZonoj: { x: number; z: number }[] = [];
  for ( let j = 0; j < SKULPTA_N; j++ ) {
    for ( let i = 0; i < SKULPTA_N; i++ ) {
      const x = SKULPTA_ORIGINO[0] + i * SKULPTA_PASO;
      const z = SKULPTA_ORIGINO[1] + j * SKULPTA_PASO;
      if ( ( skulptitaBesto(x, z) & 4 ) === 0 ) continue;
      if ( akvo(x, z) ) continue;
      npcZonoj.push({ x, z });
    }
  }

  const NPCLOKOJ: [ number, number ][] = [];
  const npcoj: Figuro[] = [];
  // Provo-rezerva buklo. hazarda ĉelo; se la loko falas sur konstruajxon aux
  // akvon ( kun la jittero ), provu alian — la kvanto plenigxas tiel longe kiel
  // ekzistas validaj ĉeloj.
  let provoj = 0;
  while ( npcoj.length < 0o230 && provoj < 0o2000 && npcZonoj.length > 0 ) {
    provoj++;
    const loko = npcZonoj[( Math.random() * npcZonoj.length ) | 0];
    const sX = loko.x + ( Math.random() - 0o1/0o2 ) * 0o3;
    const sZ = loko.z + ( Math.random() - 0o1/0o2 ) * 0o3;
    if ( ekskluziviRiveron(sX, sZ) || ekskluziviKonstruajxon(sX, sZ, 3) ) continue;
    const fig = konstruiFiguron(VESTA_LISTO[npcoj.length % VESTA_LISTO.length], Math.random() < 0o1/0o4 ? "haroLonga" : "haroMalalta");
    const h = alteco(sX, sZ);
    fig.group.position.set(sX, h, sZ);
    fig.hejmo.set(sX, h, sZ);
    fig.celo.set(sX, h, sZ);
    fig.atendo = Math.random() * 4;
    fig.rapido = 0o55/0o100 + Math.random() * 0o4/0o10;
    sceno.add(fig.group);
    npcoj.push(fig);
    NPCLOKOJ.push([ sX, sZ ]);
  }
  await raporti();

  // ⟪ Metitaj objektoj ( la objekta ilo de la skulptilo ) 📃 ⟫ — la
  // individuaj objektoj de SKULPTA_OBJEKTOJ. plantoj cxe siaj precizaj
  // pozicioj, akvaj bestoj kaj petreloj en la animaci-sistemojn ( ili naĝas/
  // flugas cxe la ankro ), NPC-oj en la npc-aron, kaj la kanuoj 🛶 kaj la
  // spacosxipo 🚀 kiel la ceteraj objektoj.
  const kanuoj: Kanoto[] = [];
  const xipo = konstruiMetitajnObjektojn(sceno, SKULPTA_OBJEKTOJ as MetitaObjekto[],
    alteco, akvo, akvaNivelo, bestoj, petreloj, npcoj, kanuoj, oraMaterialo, eniraMaterialo,
    selektajxoj);
  // La sxipa interno flosas CE LA SXIPO ( ne sur la tero ). Marku la cefan
  // stacion per la fluga alteco, por ke eniri la spacosxipon teleportu al la
  // supro kie gxi estas. Sen sxipa objekto la stacio restas sur la tero.
  const stacioSxipo = cefa.konstruSpecoj.find(s => s.type === "stacioxipo");
  if ( stacioSxipo && xipo ) stacioSxipo.flugoY = xipo.group.position.y;
  await raporti();

  // ⟪ Interna sistemo 📃 ⟫
  const internaSistemo: InternaSistemo = kreiInternanSistemon();

  return {
    konstruSpecoj, kolizioj, dokoKolizioj, selektajxoj, konstruGrupoj,
    vojSpecimenoj, placajNodoj,    riverData, riveroNordOrienta, lago, skulptaAkvo, bestoj, petreloj, lampSistemo,
    nebulSistemo, kanuoj, pussxlefoBeroj, npcoj, internaSistemo, xipo, vojDifinoj: ĉiujDifinoj, vojDuonLargho: ( _g: number ) => 0o7/0o10,
    NPCLOKOJ, VESTA_LISTO,
  };
}
