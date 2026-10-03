// ≺⧼ La betula arbaro 🌲 ⧽≻
// La instancigita betularo — la blanka trunko ( la komuna trunko el trunkoj.ts ),
// la ok kronaj kusenoj en tri ringoj kaj la videblaj branĉoj ( konstruiArbaron ).
// La kronaj geometrioj venas el foliaro.ts.
import * as THREE from "three";
import { kreiBetulanFoliaranTeksajxon } from "../../../komunajxoj/teksajxoj/betula-foliaro.js";
import { kreiBetulanFoliaranBumpanTeksajxon } from "../../../komunajxoj/teksajxoj/betula-foliaro-bumpo.js";
import { kreiBetulanFolianTeksajxon } from "../../../komunajxoj/teksajxoj/betula-folio.js";
import { kreiSxelanTeksajxon } from "../../../komunajxoj/teksajxoj/sxelo.js";
import { kreiSxelanBumpanTeksajxon } from "../../../komunajxoj/teksajxoj/sxelo-bumpo.js";
import { kreiKlinoQuaternionon, kreiPoziciilon, hazardaKoloro, kreiVegetajxanHazardon } from "../hazardoj.js";
import { type ArboMetado } from "../metado.js";
import { kreiTrunkanGeometrion } from "../trunkoj.js";
import { konstruiBetulanFoliaranGeometrion } from "./foliaro.js";

// konstruiArbaron — Konstruu instancigitajn arbojn (trunkoj kaj foliaroj) en la sceno.
export function konstruiArbaron(sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kreiVegetajxanHazardon(77531);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const sxelaBumpo = kreiSxelanBumpanTeksajxon();
  // La betula trunko — maldika kaj glata, kun radika larĝiĝo.
  const trunkaGeometrio = kreiTrunkanGeometrion(0o3/0o10, 0o7/0o40, 0o3/0o10 * 1.42, 0o13);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, bumpMap: sxelaBumpo, bumpScale: 0o6/0o10, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return trunkoj;

  const kronaGeometrioj = konstruiBetulanFoliaranGeometrion();
  // ⟨ Duflanka foliaro 📃 ⟩ — la folikartoj estas PLATAJ ( unu triangula
  // ventumilo ĉe ĉiu flanko de la kuseno ), do kun la defaŭlta FrontSide nur
  // la duono de la folioj estis videbla el iu ajn direkto kaj la krono aspektis
  // maldensa kaj plata. Duflanke ĉiu karteto lumas de ambaŭ flankoj — la sama
  // geometrio nun donas preskaŭ duoblan foliaron.
  // ⟨ La folia reliefo 📃 ⟩ — la kusenoj estas ARoj da glataj sferoj, do
  // proksime ili aspektis kiel verdaj balonoj. Kun bump-teksaĵo ( folietoj,
  // vejnoj kaj malhelaj interspacoj ) la sama sfera maso legiĝas kiel foliaro
  // — la reliefo portas la foliojn, kiujn la geometrio ne povas porti.
  // ⟨ La tekstura skalo 📃 ⟩ — la foliara teksajxo montras ĉirkaŭ cent foliojn,
  // kaj ĉiu kusen-sfero portas la TUTAN teksajxon sur sia malgranda surfaco: la
  // cent folioj fariĝis du-tri rastrumeroj, kiujn la okulo legas kiel unu glatan
  // verdan mason. Kun 2.4× ripeto la folioj havas sian veran grandecon sur la
  // kuseno, kaj la kuseno legiĝas kiel foliaro anstataŭ kiel pilko. La teksaĵoj
  // estas klonoj — la originalo estas kundividita ( sxovu ) kaj uzata ankaŭ de
  // la muska kaj betulaj materialoj.
  // ⟨ La ripeto 📃 ⟩ — la kusena kerno estas nun UNU bulo de ~0.55 en la
  // geometria spaco ( ~1.4 unuoj en la mondo, kun la skalo de la kuseno ), do
  // la ripeto devas esti tia, ke la folioj de la kanvaso havu sian veran
  // grandecon sur ĝi. Ĉe 3× ripeto ĉiu el la ~100 folioj de la kanvaso estas
  // ĉirkaŭ 5 centonoj de unuo — sama skalo kiel la folikartoj mem — kaj la
  // kerno legiĝas kiel ombro de folimaso, ne kiel kolorŝmiraĵo.
  const masaTeksajxo = kreiBetulanFoliaranTeksajxon().clone();
  masaTeksajxo.repeat.set(3, 3);
  masaTeksajxo.needsUpdate = true;
  const masaBumpo = kreiBetulanFoliaranBumpanTeksajxon().clone();
  masaBumpo.repeat.set(3, 3);
  masaBumpo.needsUpdate = true;
  // ⟨ vertexColors 📃 ⟩ — la per-vertaj nuancoj de la pufoj ( vidu kunTinto
  // en konstruiBetulanFoliaranGeometrion ) venas de ĉi tiu flago.
  const kronaMaterialo = new THREE.MeshStandardMaterial({
    map: masaTeksajxo, color: 0xffffff, roughness: 0o35/0o40,
    bumpMap: masaBumpo, bumpScale: 0o12/0o10,
    vertexColors: true,
    side: THREE.DoubleSide,
  });
  // ⟨ La unuopaj folioj 📃 ⟩ — la folikartoj ricevas SIAN propran teksaĵon
  // ( unu betula folio kun travidebla fono ) kaj alphaTest, do ili montriĝas
  // kiel veraj folioj anstataŭ kiel verdaj pecoj de la foliara teksaĵo.
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiBetulanFolianTeksajxon(), color: 0xffffff, roughness: 0o35/0o40,
    alphaTest: 0o45/0o100, vertexColors: true, side: THREE.DoubleSide,
  });
  // Bonsajeca krono. Ses apartaj "nubaj kusenoj" po arbo, ĉiu sidiĝanta sur
  // videbla branĉo — malsimetriaj, je malsamaj altoj kaj radiusoj, kun
  // malplenoj inter ili, kiel ĉe bonsajo.
  const PADOJ = 0o10;
  const kronoj = new THREE.InstancedMesh(kronaGeometrioj.maso, kronaMaterialo, arboj.length * PADOJ);
  const folioj = new THREE.InstancedMesh(kronaGeometrioj.folioj, foliaMaterialo, arboj.length * PADOJ);
  // ⟨ La folikartoj estas DETALO 📃 ⟩ — ĉiu kuseno portas ~600 unuopajn
  // folikartojn ( 4744 trianguloj po instanco ), kaj la granda instanca skalo
  // levis la limon de la tavolo al la MAKSIMUMO de la vidlimo ( 0o220 unuoj ) —
  // do la tuta foliaro de 768 betuloj estis desegnata ĝis preskaŭ tute blanka
  // nebulo. La folikartoj NE portas la silueton de la arbo ( tion faras la
  // kusena maso, kiu restas ĝis 0o220 ); ili estas la supraĵa detalo vidata de
  // proksime. Je 0o120 ( 80 ) unuoj la nebulo jam kovras 0o9/0o10 ( 90% ) kaj la
  // perdo de la kartoj ne videblas. Mallevu aŭ levu ĉi tiun nombron por ŝanĝi la
  // kompromison inter akreco kaj rapido.
  folioj.userData.vidlimo = 0o120;   // 80 unuoj
  // ⟨ ⟨ Pli etaj pecoj — la vera kaŭzo 📃 ⟩ ⟩ — la limo sola NE sufiĉis. La
  // tavolo etendiĝas trans la tutan arbaron ( pli ol 0o1000 unuoj ), do la
  // disdivido donis al ĝi pecajn ĉelojn de ~0o200 ( 128 ) unuoj: ĉiu peco havis
  // limigan radiuson de ~0o100, kaj la vidlimo aldonas tiun radiuson ( la
  // objekto ne malaperu dum parto de ĝi estas ankoraŭ videbla ) — la folikartoj
  // estis do desegnataj ĝis ~0o260 ( 176 ) unuoj, pli ol duoble la celitaj
  // 0o120. Kun propra ĉelo de 0o50 ( 40 ) unuoj la aldonita radiuso falas al
  // ~0o34 kaj la limo denove signifas tion, kion ĝi diras.
  // ⟨ Mezurite 📃 ⟩ — ĉe la urba vidpunkto la folikartaj trianguloj falis de
  // 12.5M al 0.7M ( el 17.9M al 13.4M en la tuta kadro ) kaj la kadro de 39.0
  // al 29.2 ms ( -25% ). Ĉe proksima betularo la ŝanĝo apenaŭ rimarkeblas — la
  // kartoj tie estas legitime proksimaj.
  folioj.userData.vidlimaCelo = 0o50;
  const brancxoGeometrio = new THREE.CylinderGeometry(0o3/0o100, 0o5/0o100, 1, 5);
  const brancxoj = new THREE.InstancedMesh(brancxoGeometrio, trunkaMaterialo, arboj.length * PADOJ);

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  // ⟨ La du paledroj 📃 ⟩ — la folikartoj kaj ilia kusena kerno ne povas
  // havi la saman koloron: la kartoj ESTAS la foliaro ( verdaj, helaj, kun
  // la suno tra ili ) kaj la kerno estas la ombro INTER la folioj. Antaŭe ambaŭ
  // ricevis la saman palan verdon, do la kerno montriĝis kiel aro da HELAJ
  // verdaj pilkoj ĝuste tie, kie oni atendas mallumon — la plej videbla kaŭzo
  // de la aspekto "la folioj estas pilkoj".
  // La folikartoj — preskaŭ blankaj nuancoj ( la verdo venas de la folia
  // teksaĵo kaj de la per-vertaj nuancoj; la instanca koloro nur MODIFAS ĝin ).
  const paletroFolioj = [ 0xeef4dc, 0xe2ecc6, 0xf6f8ea, 0xd6e4b8, 0xe8f0d2 ];
  // ⟨ La kerno ne estu NIGRA 📃 ⟩ — la unua versio uzis tre profundan verdon
  // ( 0x38522f ), kaj ĉar la kerno ankaŭ ĵetas sian propran ombron sur sin,
  // la interno de ĉiu kuseno montriĝis preskaŭ nigra kun videblaj facetoj —
  // la okulo legas nigran poliedron, ne ombron de foliaro. Nun la kerno estas
  // meza malhela verdo, kiu sub la ombro faliĝas gxuste en la tonon de profunda
  // foliombro.
  const paletroMaso = [ 0x51703f, 0x476437, 0x5b7a48, 0x3f5a33, 0x4d6b3d ];

  arboj.forEach(( t, i ) => {
    const h = 0o64/0o10 + t.s * 0o44/0o10;
    // Eta klino rompas la uniformecon — la betuloj ne staras perfekte rekte.
    const Q = kreiKlinoQuaternionon(hazardaGenerilo, 0o2/0o20, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Q);

    // ⟨ La trunko finiĝas EN la krono 📃 ⟩ — la trunko iris ĝis la plena alto
    // h, sed la plej alta kuseno sidas je 0.92 h kaj larĝas nur ~0.3, do la
    // blanka trunkopinto elstaris SUPER la foliaron kiel fosto. Nun la trunko
    // finiĝas je 0.90 h, profunde en la pinta kuseno, kie la folioj ĝin kaŝas
    // — kiel ĉe vera betulo, kie la ĉefa ŝoso perdiĝas en la krono.
    const trunkaAlto = h * 0.9;
    M.compose(pozicio(new THREE.Vector3(0, trunkaAlto / 2, 0)), Q, new THREE.Vector3(1, trunkaAlto, 1));
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
    // ⟨ La kronaj kusenoj 📃 ⟩ — ok kusenoj en TRI ringoj plus pinto, ne ses
    // kusenoj dise sur la trunko. Antaŭe la kusenoj staris en unu vertikala
    // vico kun grandaj malplenoj inter si, do la krono montriĝis kiel ŝtuparo
    // da apartaj verdaj pilkoj kun NUdaj trunko-segmentoj inter ili. Nun la
    // ringoj interkovriĝas vertikale kaj horizontale, do la ok kusenoj
    // kunfandiĝas en UNU kontinuan, iomete konusan kronon ( betula krono estas
    // pli larĝa ĉe la bazo kaj mallarĝiĝas supren ), kun la trunketo videbla
    // nur tra la maldensaj randoj.
    // ⟨ La formo de la krono 📃 ⟩ — la antaŭa aranĝo mallarĝiĝis unuforme de
    // malsupre supren ( fr 0.58 → 0.18 ), kio estas la profilo de KONUSO: la
    // betuloj aspektis kiel pingloarboj. Vera betula krono estas OVO — mallarĝa
    // ĉe la malsupra fino, plej larĝa ĉirkaŭ du trionoj de sia alto, kaj
    // rondiĝanta al pinto. La ok kusenoj nun sekvas tiun profilon, kaj la
    // malsupra zono estas pli mallarĝa, do pli da trunko restas videbla sub la
    // krono, kiel ĉe vera paperbetulo.
    const padBazoj = [
      // Malsupra zono — mallarĝa, la unua etaĝo de la krono.
      { a: 0o1/0o2, fy: 0.48, fr: 0.36, s: 1.30 },
      { a: 3.7, fy: 0.51, fr: 0.40, s: 1.35 },
      // La plej larĝa zono — ĉirkaŭ du trionoj de la alto.
      { a: 1.9, fy: 0.63, fr: 0.58, s: 1.42 },
      { a: 5.1, fy: 0.62, fr: 0.55, s: 1.34 },
      { a: 0.2, fy: 0.70, fr: 0.52, s: 1.30 },
      { a: 3.0, fy: 0.74, fr: 0.46, s: 1.36 },
      // Supra zono kaj la pinta kuseno.
      { a: 1.3, fy: 0.84, fr: 0.34, s: 1.25 },
      { a: 4.2, fy: 0.92, fr: 0.20, s: 1.30 },
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
      kronoj.setColorAt(idx, hazardaKoloro(hazardaGenerilo, C, paletroMaso));
      // La folikartoj sidas en la SAMA loka spaco kiel la kusena maso, do ili
      // ricevas la saman matricon — sed SIAN propran, multe pli helan koloron.
      folioj.setMatrixAt(idx, M);
      folioj.setColorAt(idx, hazardaKoloro(hazardaGenerilo, C, paletroFolioj));

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
  folioj.instanceMatrix.needsUpdate = true;
  // ⟨ La nomoj 📃 ⟩ — la betulaj tavoloj nomiĝas kiel la gazonaj tabuloj
  // ( herbaTavolo ), do la diagnozaj iloj kaj la vidlima statistiko povas
  // apartigi ilin unu de la alia.
  trunkoj.name = "betulaTrunko";
  kronoj.name = "betulaKrono";
  folioj.name = "betulaFolio";
  brancxoj.name = "betulaBrancxo";
  brancxoj.instanceMatrix.needsUpdate = true;
  if ( trunkoj.instanceColor ) trunkoj.instanceColor.needsUpdate = true;
  if ( kronoj.instanceColor ) kronoj.instanceColor.needsUpdate = true;
  if ( folioj.instanceColor ) folioj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = kronoj.castShadow = brancxoj.castShadow = true;
  // La unuopaj folioj NE ĵetas ombron — folikartoj kun alphaTest farus truajn,
  // tremajn ombrojn sur la teron kaj la ombra mapo duobliĝus por la tuta krono.
  folioj.castShadow = false;
  sceno.add(trunkoj, kronoj, folioj, brancxoj);
  return trunkoj;
}
