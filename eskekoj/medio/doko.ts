// ≺⧼ Doko ⚓ ⧽≻
// Vojaj etendoj, kiuj malsupreniras al la akvo per ŝtuparo
import * as THREE from "three";
import { kreiAndezitanTeksajxon } from "../komunajxoj/teksajxoj/andezito.js";
import { kreiDioritanTeksajxon } from "../komunajxoj/teksajxoj/diorito.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon } from "../komunajxoj/materialoj.js";
import { VOJA_DIKECO } from "./vojoj/mezuroj.js";
import { kreiDokanEksteranFormon, kreiDokanFormon, kreiDokanKadron } from "./doko/formoj.js";
import { DOKO_KADRA_LARĜO, DOKO_PLATFORMA_LARĜO, type DokaSekcio, type Doko } from "./doko/tipoj.js";

// konstruiDokon — Konstruas unu dokon en la scenon. La doko havas du partojn.
//   · la LANDEJA PLATFORMO ( la akva flanko ) — diorita platformo kun la sama
//     stila andezita kadro kiel ĉe la vojoj, kaj la PLENA andezita subkonstruo;
//     ĝia supro staras nur 0o3/0o20 super la akvosurfaco, do boatoj kaj naĝantoj
//     atingas ĝin,
//   · la ŜTUPARO — de la landejo supren ĝis la kaja nivelo, ŝtupo post ŝtupo.
//     La ŝtupoj NE estas aparta geometrio de ĉi tiu modulo — la doko raportas
//     nur la polilinion ( stuparajPunktoj ) kaj urbo.ts aldonas ĝin al la vojaj
//     difinoj kun `stuparo: true`, do la voja konstruilo faras ilin per la sama
//     diorita/andezita sekco kiel ĉiu strato.
//
// ⟨ Kial ŝtuparo, ne ebena platformo 📃 ⟩ — la kajo-vojo kuras laŭ la SUPRO de la
// riverbordo, 3–5 unuojn super la akvo ( tiom profundas la rivera kanalo ). Doko
// kiu simple daŭrigus tiun ebenon trans la akvon starus 3–5 unuojn super la
// akvosurfaco — tro alte por rivera surteriĝejo, kaj ĝia subkonstruo fariĝus
// ses-unua muro. La doko do MALKRESKAS al la akvo — la landa rando restas ĝuste ĉe
// la voja nivelo ( la kajo alvenas sen ŝtupo ) kaj la akva pinto malsupreniras
// per ŝtupoj al la landejo super la akvo.
//
// ⟨ Unu ebena krado por la fiziko 📃 ⟩ — la kolizia modelo ( kantaoj/ludo/sperto.ts )
// traktas ĉiun doko-sekcion kiel REKTANGULAN platformon kun ebena supro, do la
// doko raportas la landejon kiel sekcion. La ŝtupoj venas kiel vojaj surfacoj,
// kaj ilia riso restas malpli alta ol 0o1/0o4, do la promenanto supreniras la
// ŝtuparon sen blokiĝi.
//
//   @param sceno ( THREE.Scene ) - La sceno.
//   @param x, z ( number ) - La monda pozicio de la doka centro.
//   @param direkto ( number ) - La rotacio ĉirkaŭ Y; la akva pinto montras laux -Z.
//   @param heightFn ( funkcio ) - La terena alto.
//   @param waterFn ( funkcio ) - La akvosurfaca alto ( la landejo staras super ĝi ).
//   @param profundo ( number = 0o14 ) - La doka longo ( la platforma profundo ).
//   @returns doko ( Doko ) - La grupo, la mezuroj kaj la piedireblaj sekcioj.
export function konstruiDokon(
  sceno: THREE.Scene,
  x: number,
  z: number,
  direkto: number,
  heightFn: ( x: number, z: number ) => number,
  waterFn: ( x: number, z: number ) => number,
  profundo = 0o14
): Doko {
  const group = new THREE.Group();
  const vojaLargho = DOKO_PLATFORMA_LARĜO;
  const platformDepth = profundo;
  // ⟨ La sama dikeco kiel la vojoj 📃 ⟩ — la plej alta ŝtupo estas voja etendo,
  // do ĝia planko staras same alte super la tereno kiel la voja rubando. Kun la
  // malnova voja dikeco ili kongruis; kiam la vojoj maldikiĝis, la doko devis
  // sekvi — alie ĉiu kajo havus 0o12-Peuan ŝtupon ĉe la eniro.
  const dikeco = VOJA_DIKECO;
  // Rondigita fronto — la akva pinto de la doko.
  const antaŭaRadiuso = 0o4/0o10;
  const dioritaTeksajxo = kreiDioritanTeksajxon();
  const andezitaTeksajxo = kreiAndezitanTeksajxon();
  const diorito = kreiDioritanMaterialon(dioritaTeksajxo);
  const andezito = kreiAndezitanMaterialon(andezitaTeksajxo);
  // ⟨ Du komunaj nombroj 📃 ⟩ — la kadra strio kaj kiom la kadro staras sub la
  // platformo. La kadro, la subkonstruo kaj la ŝtupoj ĉiuj legas ilin, do ili ne
  // povas disiriĝi se unu el ili ŝanĝiĝas.
  const kadraStrio = DOKO_KADRA_LARĜO;
  const kadraMalsupro = -0o1/0o40;
  // La ekstera duon-larĝo de la kadro — ankaŭ la larĝo de la ŝtupoj.
  const plenaDuono = vojaLargho / 2 + kadraStrio;
  // Harareto pli ol la kadro, por ke la apudaj facoj ne z-flagru.
  const plenaProud = 0o1/0o500;
  // ⟨ La sojloj de la ŝtupoj 📃 ⟩ — la riso de la ŝtuparo ( vidu sube ) restas
  // sub DU sojloj de la fiziko ( kantaoj/ludo/sperto.ts ). SolviDokanKolizion blokas
  // punktojn pli ol 0o1/0o4 sub sekcia supro, kaj la piedirado komencas FALON
  // super 0o1/0o23/0o100 — do 0o1/0o5 promenatas glate ambauxdirekte.

  const duonL = platformDepth / 2;
  const cosR = Math.cos(direkto), sinR = Math.sin(direkto);
  // La loka ( x, z ) → monda transformo — la tereno kaj la akvo legiĝas per ĝi.
  const mondaX = ( lx: number, lz: number ) => x + cosR * lx + sinR * lz;
  const mondaZ = ( lx: number, lz: number ) => z - sinR * lx + cosR * lz;

  // La tereno sub la doko deklivas malsupren al la rivero. Levu la dokon al la
  // terena alto ĉe ĝia LANDa (malantaŭa, ne-akva) rando, por ke la malantaŭo ne
  // enfosigu en la deklivan bordon — kaj la vojoj (kiuj sekvas la terenon)
  // renkontu la dokon ĉe la sama alto.
  const landX = x + sinR * duonL, landZ = z + cosR * duonL;
  let vojaY = heightFn(x, z);
  for ( const ofseto of [ -0o6/0o10, 0, 0o6/0o10 ] ) {
    vojaY = Math.max(vojaY, heightFn(landX + cosR * ofseto, landZ - sinR * ofseto));
  }

  // ⟨ La landeja platformo 📃 ⟩ — unu plata platformo ( kun la kadro kaj la
  // plena subkonstruo ) je la dirita alto. centroZ estas la loka z de ĝia
  // centro, do ĝia akva pinto kuŝas je centroZ - longo/2.
  const aldoniLandejon = ( centroZ: number, longo: number, supro: number ): void => {
    const bazo = supro - dikeco;   // la loka y de la platforma malsupro
    // La platformo — mallarĝa rekta etendo de la vojo kun rondigita akva pinto.
    const surfacaGeometrio = new THREE.ExtrudeGeometry(
      kreiDokanFormon(vojaLargho, longo, antaŭaRadiuso),
      { depth: dikeco, bevelEnabled: false }
    );
    surfacaGeometrio.rotateX(-Math.PI / 2);
    const surfaco = new THREE.Mesh(surfacaGeometrio, diorito);
    surfaco.position.set(0, bazo, centroZ);
    surfaco.castShadow = surfaco.receiveShadow = true;
    group.add(surfaco);

    // Andezita kadro ( konstanta strio ĉirkaŭ la perimetro ) kun malalta
    // bordero levita super la deko — samstila kiel la voja andezita rando.
    const rando = new THREE.Mesh(
      kreiDokanKadron(vojaLargho, longo, antaŭaRadiuso, kadraStrio, dikeco + 0o1/0o20),
      andezito
    );
    rando.position.set(0, bazo + kadraMalsupro, centroZ);
    rando.castShadow = rando.receiveShadow = true;
    group.add(rando);

    // ⟨ LA PLENA SUBKONSTRUO 📃 ⟩ — antaŭe la platformo staris sur kvar REKTAJ
    // konusaj fostoj, poste sur UNU andezita arko. Nun la doko havas neniun
    // malfermon. La spaco sub la platformo estas PLENIGITA per andezito — unu
    // solida maso de la platforma malsupro ĝis sub la terenon. Legite de la
    // flanko, la doko aspektas kiel la ponto ( konstruiPonton ) kun sia arko
    // plenigita. La sama andezita strato de la voja rando daŭriĝas malsupren kaj
    // atingas la grundon.
    // ⟨ Unu konturo, du uzoj 📃 ⟩ — la maso uzas la SAMAN plan-formon kiel la
    // kadro ( kreiDokanEksteranFormon ), do ĝiaj flankaj facoj kuŝas en la ebeno
    // de la ekstera rando de la kadro kaj la du ne povas disiriĝi.
    const plenaSupro = bazo - 0o1/0o200;   // glutas la kadran lipon malsupre
    // La plej profunda tereno sub la PLENA plano de la landejo — la maso
    // etendiĝas 0o1/0o4 sub ĝin, do ĝi estas enfosigita ĉie — nek malfermo nek
    // ŝvebanta rando povas aperi super ajna deklivo.
    let teraPlejProfunda = Infinity;
    for ( const lz of [ -longo / 0o2 - kadraStrio, -longo / 0o4, 0, longo / 0o4, longo / 0o2 ] ) {
      for ( const lx of [ -plenaDuono, 0, plenaDuono ] ) {
        teraPlejProfunda = Math.min(teraPlejProfunda,
          heightFn(mondaX(lx, centroZ + lz), mondaZ(lx, centroZ + lz)) - vojaY);
      }
    }
    // ⟨ Kiam plenigebla spaco ne ekzistas 📃 ⟩ — se la tereno restas super la
    // malsupro de la kadro ĉie sub la landejo, ĝi sidas rekte sur la grundo ( aŭ
    // enfosigita en ĝin ) kaj la maso estus tute kaŝita; tiam ĝi restas sen
    // subkonstruo, kiel la doko antaŭe restis sen fostoj.
    if ( teraPlejProfunda < bazo + kadraMalsupro ) {
      const plenaMalsupro = teraPlejProfunda - 0o1/0o4;
      const plenaGeometrio = new THREE.ExtrudeGeometry(
        kreiDokanEksteranFormon(vojaLargho, longo, antaŭaRadiuso, kadraStrio + plenaProud),
        { depth: plenaSupro - plenaMalsupro, bevelEnabled: false }
      );
      plenaGeometrio.rotateX(-Math.PI / 2);
      const plenaMaso = new THREE.Mesh(plenaGeometrio, andezito);
      plenaMaso.position.set(0, plenaMalsupro, centroZ);
      plenaMaso.castShadow = plenaMaso.receiveShadow = true;
      group.add(plenaMaso);
    }
  };

  // ⟨ La landeja alto 📃 ⟩ — la supro de la landejo ( la akva parto de la doko )
  // staras 0o3/0o20 super la akvosurfaco, alte sufiĉe por ne esti inundita,
  // malalte sufiĉe por ke naĝanto ĉe la surfaco povu supreniri sur ĝin
  // ( solviDokanKolizion blokas nur punktojn pli ol 0o1/0o4 sub sekcia supro )
  // kaj por ke kanoto povu alligiĝi al la rando.
  const landejaLocala = waterFn(x, z) - vojaY + 0o3/0o20;
  // La sama specimenado kiel la voja konstruilo ( kaj kiel la ŝtuparoj sube ),
  // la MAKSIMUMO de la du flankaj anguloj je ± ( w/2 + 0o1/0o2 ) — la ekstera
  // rando de la voja sekco. La landejo kaj la ŝtupoj devas mezuri la terenon per
  // la SAMA okulo, alie la kunigxo inter ili ricevas plian ŝtupon.
  const flankaDuono = vojaLargho / 2 + 0o1/0o2;
  const aksaSupra = ( lz: number ): number => Math.max(
    heightFn(mondaX(flankaDuono, lz), mondaZ(flankaDuono, lz)),
    heightFn(mondaX(-flankaDuono, lz), mondaZ(-flankaDuono, lz)));
  // ⟨ Kie la ŝtuparo komencigxas 📃 ⟩ — la punkto, kie la aksa tereno LEVIGXAS super
  // la landejan supron, la strando eliras el la akvo kaj la ŝtupoj komencigxas.
  const landejaMinimumo = 0o3;
  const landejaMaksimumo = platformDepth * 0o3/0o4;
  let stuparaZ0 = -duonL + landejaMaksimumo;
  for ( let lz = -duonL; lz < -duonL + landejaMaksimumo; lz += 0o1/0o4 ) {
    if ( aksaSupra(lz) - vojaY > landejaLocala ) { stuparaZ0 = lz; break; }
  }
  // ⟨ Kaj kiam tiu rando estas tro proksima 📃 ⟩ — sur kruta bordo la strando
  // eliras el la akvo preskaux ĉe la doko-pinto mem, kaj duon-unua landejo estus
  // tro mallonga por sidi sur gxi aux alligi kanoton. Tiam la landejo ELSTARAS
  // preter la doko-plano, super la akvon mem — vera kajo etendigxas ĝis la akvo,
  // ne ĝis la seka tero. La ŝtuparo do restas sur la strando, kaj la landejo
  // ĉiam longas inter 0o3 unuoj kaj 0o3/0o4 de la doko-longo.
  const landejaZ0 = Math.min(stuparaZ0, -duonL + landejaMaksimumo);
  const landejaLongo = Math.max(landejaMinimumo, landejaZ0 + duonL);
  const landejaCentroZ = landejaZ0 - landejaLongo / 2;
  const sekcioj: DokaSekcio[] = [];
  // La ŝtuparoj de la doko — ORDINARAJ vojaj difinoj por la voja konstruilo
  // ( urbo.ts aldonas ilin kun `stuparo: true` ). Vidu la komenton sube.
  const stuparajPunktoj: [ number, number ][] = [];

  if ( landejaLocala >= dikeco ) {
    // ⟨ Doko ĉe ( aŭ sub ) la akvosurfaco 📃 ⟩ — la akvo jam estas ĉe la kaja
    // nivelo, do malalta landejo ne haveblas kaj la tuta platformo restas ebena
    // je la kaja nivelo — la konduto antaŭ la landejo.
    aldoniLandejon(0, platformDepth, dikeco);
    sekcioj.push({ lx: 0, lz: 0, w: plenaDuono * 2, d: platformDepth, y: vojaY + dikeco });
  } else {
    aldoniLandejon(landejaCentroZ, landejaLongo, landejaLocala);
    sekcioj.push({ lx: 0, lz: landejaCentroZ, w: plenaDuono * 2, d: landejaLongo,
      y: vojaY + landejaLocala });

    // ⟨ LA ŜTUPARO KIEL ORDINARA VOJO 📃 ⟩ — la malsupreniro de la kaja nivelo al
    // la landejo NE estas aparta strukturo. Ĝi estas ordinara voja difino, kiun
    // la voja konstruilo ( eskekoj/medio/vojoj.ts ) konstruas kun `stuparo: true`
    // — la SAMA diorita centro kaj la SAMAJ andezitaj randoj kiel ĉiu strato,
    // kaj PLATAJ ŝtupoj kun vertikalaj risoj anstataŭ dekliva rubando. Tiel la
    // doko kaj la kajo legigxas kiel unu vojreto, kaj la ŝtupoj "ŝtupas"
    // anstataŭ kurbigxi.
    //   · La randoj de la ŝtupoj elektigxas per la TERENO. La sekva rando estas
    //     tie, kie la tereno jam malaltigxas je STUPA_ALTIGXO, do la risoj
    //     sekvas la deklivon, restas Egalaj, kaj restas sub la sojloj de la
    //     fiziko ( 0o1/0o4 blokas supreniron, 0o1/0o23/0o100 komencas falon
    //     malsupren — do 0o1/0o5 promenatas glate ambauxdirekte ).
    //   · La unua punkto kusxas 0o3/0o2 unuojn SUPER la landa rando ( sur la
    //     kajo mem ), por ke la plej alta ŝtupo kunŝovigxu kun la kaja vojo sen
    //     breĉo; la tereno tie estas kaptita je la kaja nivelo ( stuparaSupra ).
    const STUPA_ALTIGXO = 0o3/0o20;     // la dezirata riso, sub la sojloj supre
    const STUPA_PASO = 0o1/0o20;        // la specimen-paŝo de la terena serĉo
    const STUPA_LONGO_MAKS = 0o3;       // la plej longa ŝtupo ( ebena tereno )
    // La kaja nivelo estas la SUPRo de la ŝtuparo. Super gxi la alteco estas
    // kaptita, do la plej alta ŝtupo restas plata laux la kajo.
    const stuparaSupra = ( lz: number ): number => Math.min(vojaY, aksaSupra(lz));
    let lz = duonL + 0o3/0o2;
    let nivelo = stuparaSupra(lz);
    stuparajPunktoj.push([ mondaX(0, lz), mondaZ(0, lz) ]);
    while ( lz > landejaZ0 + STUPA_PASO ) {
      let rando = Math.max(landejaZ0, lz - STUPA_LONGO_MAKS);
      for ( let testo = lz - STUPA_PASO; testo > rando + STUPA_PASO; testo -= STUPA_PASO ) {
        if ( stuparaSupra(testo) <= nivelo - STUPA_ALTIGXO ) { rando = testo; break; }
      }
      rando = Math.max(landejaZ0, rando);
      stuparajPunktoj.push([ mondaX(0, rando), mondaZ(0, rando) ]);
      lz = rando;
      nivelo = stuparaSupra(lz);
    }
    // La lasta rando — la rando de la landejo mem.
    if ( lz > landejaZ0 + 0o1/0o100 ) {
      stuparajPunktoj.push([ mondaX(0, landejaZ0), mondaZ(0, landejaZ0) ]);
    }
  }

  group.position.set(x, vojaY, z);
  group.rotation.y = direkto;
  sceno.add(group);

  // La LANDa rando de la doko kusxas je vojaY + dikeco — la sama alto kiel la
  // voja surfaco tie, do la kajo alvenas sen ŝtupo.
  return { group, x, z, platformWidth: vojaLargho, platformDepth,
    platformY: vojaY + dikeco, sekcioj, stuparajPunktoj, stuparaSupro: vojaY };
}
