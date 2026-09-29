// ≺⧼ La larikoj 🌲 ⧽≻
// La alpaj larikoj ( Larix lyallii ) de la valo kaj la montaro — la konusa
// pingla krono ( konstruiLarikanFoliaranGeometrion ) kaj la instancigilo
// ( konstruiLarikon ). La trunko venas el la komuna ilo ( trunkoj.ts ).
import * as THREE from "three";
import { kreiLarikanFoliaranTeksajxon } from "../../komunajxoj/teksajxoj/larika-foliaro.js";
import { kreiLarikanSxelanTeksajxon } from "../../komunajxoj/teksajxoj/larika-sxelo.js";
import { kreiLarikanSxelanBumpanTeksajxon } from "../../komunajxoj/teksajxoj/larika-sxelo-bumpo.js";
import { kunfandiGeometriojnSenIndekson } from "../../komunajxoj/kunfandajxoj.js";
import { KRONA_GEOMETRIA_RADIUSO, TAVOLA_PROPORCIO, kronaRadiusoLarika } from "./kronoj.js";
import { kreiKlinoQuaternionon, kreiPoziciilon, hazardaKoloro, kreiVegetajxanHazardon } from "./hazardoj.js";
import type { ArboMetado } from "./metado.js";
import { kreiTrunkanGeometrion } from "./trunkoj.js";

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
  const eksteraR = ( t: number ): number => 0o1/0o2 * Math.pow(1 - t, 0o7/0o10) + 0.02;
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
  const hazardaGenerilo = kreiVegetajxanHazardon(33718);
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
      helo * ( 0.95 + hazardaGenerilo() * 0o1/0o20 ),
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
    const kronaRadiuso = Math.min(0o3/0o4 * kronaRadiusoLarika(t.s), 0.27 * h);
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
