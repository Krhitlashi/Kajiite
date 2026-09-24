// ≺⧼ Marlaraksxo 🕷️ ⧽≻
// La eta longkrura mara araneo de la riverfundo ( Pycnogonida ).
//
// ⟨ Kial la kruroj aspektis rompitaj 📃 ⟩ — la malnova modelo konstruis ĉiun
// kruro-segmenton per permanaj rotateZ-anguloj EN LA LOKA KADRO de sia kokso.
// Tiu kadro ne speguliĝas inter la flankoj, do la tibio de unu flanko fleksiĝis
// supren kaj la kruroj pendis en la aero — la besto staris sur kvar kruroj kaj
// la aliaj kvar ŝvebis. Nun ĉiu segmento naskiĝas INTER du artpunktoj en la
// korpa kadro ( kreiTubon ), do la du flankoj estas veraj speguloj kaj ĉiuj ok
// piedoj kuŝas sur unu grundebeno.
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { kreiKanvasanTeksajxon } from "../komunajxoj/teksajxoj.js";
import type { Besto, SpecoMalneto } from "./speco-tipoj.js";

// kreiKutiklanTeksajxon — La ĥitina ŝelo de la marlaraksxo: koloro kaj reliefo
// el la SAMA desegno ( kiel ĉe la ĝelo de la ktenoforoj kaj la plumaro de la
// petrelo ), do la koloro kaj la reliefo ĉiam kongruas.
//
// La UV-mapo de la cilindroj iras ĉirkaŭe ( u ) kaj LAŬLONGE ( v ), do la
// malhelaj RINGOJ de la segmentoj — la plej videbla trajto de ĥitino — estas
// horizontalaj linioj, kaj la etaj tuberoj ( la sensiloj de la ŝelo ) estas
// punktetoj. Antaŭe la marlaraksxo estis tute plata koloro, do la kruroj
// aspektis kiel plastaj bastonetoj.
function kreiKutiklanTeksajxon(): { koloro: THREE.CanvasTexture; reliefo: THREE.CanvasTexture } {
  const s = 0o200; // 128
  const desegnu = (reliefo: boolean) => kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = reliefo ? "rgb(128,128,128)" : "rgb(214,182,142)";
    kunteksto.fillRect(0, 0, s, s);
    // La segmentaj ringoj — la artikoj de la ŝelo. Ili estas pli malhelaj
    // ( pli profundaj ) en la reliefa mapo.
    for ( let i = 0; i < 0o6; i++ ) {
      const y = ( i + 0o1/0o2 ) / 0o6 * s;
      kunteksto.strokeStyle = reliefo ? "rgba(70,70,70,0.55)" : "rgba(146,112,76,0.8)";
      kunteksto.lineWidth = s * 0.014;
      kunteksto.beginPath();
      kunteksto.moveTo(0, y);
      kunteksto.lineTo(s, y);
      kunteksto.stroke();
    }
    // La etaj tuberoj kaj la poroj de la ĥitino.
    for ( let i = 0; i < 0o300; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0.6 + Math.random() * 1.1;
      kunteksto.fillStyle = reliefo
        ? ( Math.random() < 0o1/0o2 ? "rgba(200,200,200,0.5)" : "rgba(80,80,80,0.45)" )
        : ( Math.random() < 0o1/0o2 ? "rgba(238,214,178,0.5)" : "rgba(168,132,94,0.45)" );
      kunteksto.beginPath();
      kunteksto.arc(x, y, r, 0, Math.PI * 2);
      kunteksto.fill();
    }
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping });
  return { koloro: desegnu(false), reliefo: desegnu(true) };
}

// Reuzataj matematikaj objektoj por la marŝa animacio — la kruroj ne bezonas
// krei novajn vektorojn aŭ kvaternionojn ĉiukadre.
const kruroBataAkso = new THREE.Vector3(0, 1, 0);
const kruroBataKvaterniono = new THREE.Quaternion();

const supren = new THREE.Vector3(0, 1, 0);

// kreiTubon — Segmento inter du punktoj de la nuna kadro ( la kruro, la
// rostro ). La cilindro naskiĝas laŭ +y, do ĝi turniĝas al la segmenta direkto
// kaj transloĝiĝas al la mezpunkto.
//     @param de ( Vector3 ) - La komenca punkto de la segmento.
//     @param al ( Vector3 ) - La fina punkto de la segmento.
//     @param rDe ( number ) - La radiuso ĉe la komenco.
//     @param rAl ( number ) - La radiuso ĉe la fino.
//     @returns La geometrio de la segmento.
function kreiTubon(de: THREE.Vector3, al: THREE.Vector3,
  rDe: number, rAl: number): THREE.BufferGeometry {
  const delto = new THREE.Vector3().subVectors(al, de);
  const geometrio = new THREE.CylinderGeometry(rAl, rDe, delto.length(), 0o6);
  geometrio.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(
    supren, delto.normalize()));
  geometrio.translate(( de.x + al.x ) / 0o2, ( de.y + al.y ) / 0o2, ( de.z + al.z ) / 0o2);
  return geometrio;
}

// kreiArtikon — La globeto kiu kovras la kuniĝon de du segmentoj ( la kokso,
// la genuo, la maleolo ). Sen ĝi la plata fino de la cilindro montriĝas kiel
// fendo en la artiko.
//     @param punkto ( Vector3 ) - La centro de la artiko.
//     @param r ( number ) - La radiuso de la globeto.
//     @returns La geometrio de la artiko.
function kreiArtikon(punkto: THREE.Vector3, r: number): THREE.BufferGeometry {
  return new THREE.SphereGeometry(r, 0o6, 0o5).translate(punkto.x, punkto.y, punkto.z);
}

// konstruiMarlaraksxanMalneton — Marlaraksxo ( Pycnogonida ). Eta korpo kun
// ok longegaj, maldikaj kruroj ( kvar paroj ) kaj malgranda rostro. Ili
// marŝas sur la riverfundo ( mergo metas ilin profunde sub la surfacon ).
export function konstruiMarlaraksxanMalneton(): SpecoMalneto {
  const grupo = new THREE.Group();
  const kutiklo = kreiKutiklanTeksajxon();
  const korpaMaterialo = new THREE.MeshStandardMaterial({
    color: 0xd8b890, transparent: true, opacity: 0o3/0o4,
    depthWrite: false, side: THREE.DoubleSide, roughness: 0o1/0o2,
    map: kutiklo.koloro, bumpMap: kutiklo.reliefo, bumpScale: 0o1/0o50,
  });
  // ⟨ La trunko 📃 ⟩ — UNU glata tubo laŭ ±z kun kvar malaltaj ripoj, kiuj
  // montras la segmentojn. Antaŭe la trunko estis kvar apartaj sferoj: ili
  // estis tiom malgrandaj, ke ili NE interkovris ( la centroj staris 0.125
  // dise kaj ĉiu sfero longas 0.125 ), do la korpo aspektis kiel kvar
  // disigitaj globoj kaj la besto rompita. Vera marlaraksxo havas etan,
  // glatan, iomete platigitan tubon.
  const zSegmentoj = [ 0o12/0o100, 0o2/0o100, -0o4/0o100, -0o12/0o100 ];
  const trunkajPunktoj = [
    new THREE.Vector3(0, 0, -0o14/0o100),
    new THREE.Vector3(0, 0o1/0o200, -0o7/0o100),
    new THREE.Vector3(0, 0o1/0o100, 0),
    new THREE.Vector3(0, 0o1/0o200, 0o7/0o100),
    new THREE.Vector3(0, 0, 0o14/0o100),
  ];
  const trunkaMesho = new THREE.Mesh(mergeGeometries([
    kreiTubon(trunkajPunktoj[0], trunkajPunktoj[1], 0o30/0o1000, 0o44/0o1000),
    kreiTubon(trunkajPunktoj[1], trunkajPunktoj[2], 0o44/0o1000, 0o50/0o1000),
    kreiTubon(trunkajPunktoj[2], trunkajPunktoj[3], 0o50/0o1000, 0o46/0o1000),
    kreiTubon(trunkajPunktoj[3], trunkajPunktoj[4], 0o46/0o1000, 0o32/0o1000),
    kreiArtikon(trunkajPunktoj[0], 0o30/0o1000),
    kreiArtikon(trunkajPunktoj[4], 0o32/0o1000),
    ...zSegmentoj.map(z => new THREE.SphereGeometry(0o50/0o1000, 0o10, 0o6)
      .scale(0o1, 0o17/0o20, 0o1/0o4).translate(0, 0o1/0o100, z)),
  ])!, korpaMaterialo);
  // La trunko estas iomete platigita dorsoventrale, kiel ĉe vera marlaraksxo.
  trunkaMesho.scale.set(0o1, 0o17/0o20, 0o1);
  trunkaMesho.name = "korpo";
  grupo.add(trunkaMesho);

  // ⟨ La flankaj elstaraĵoj 📃 ⟩ — ĉe vera marlaraksxo la kruroj NE kreskas
  // rekte el la trunko: ĉiu paro sidas sur flanka elstaraĵo ( „lateral
  // process“ ). La malgrandaj globetoj ankaŭ kovras la kuniĝon de la kokso kaj
  // la trunko, do la femuroj ne ŝajnas esti gluitaj sur la dorson.
  for ( const k of [ 0, 0o1, 0o2, 0o3 ] ) {
    for ( const s of [ 0o1, -0o1 ] ) {
      const elstaraĵo = new THREE.Mesh(
        new THREE.SphereGeometry(0o4/0o100, 0o10, 0o6), korpaMaterialo);
      elstaraĵo.scale.set(0o14/0o10, 0o1, 0o6/0o10);
      elstaraĵo.position.set(s * 0o6/0o100, -0o1/0o100, zSegmentoj[k]);
      grupo.add(elstaraĵo);
    }
  }

  // La rostro ( proboscido ) — longa suĉtubo antaŭen, iomete malsupren, kun
  // malhela pinto. gxi estas la plej rekonebla organo de la marlaraksxoj: vera
  // proboscido longas preskaŭ same kiel la trunko kaj mallarĝiĝas al pinto.
  // Ĝi estas UNU kunfandita geometrio — antaŭe la tubo kaj la malhela pinto
  // estis du apartaj meshoj kaj la pinto ŝvebis 0.09 unuojn antaŭ la tubo, do
  // ĝi aspektis kiel eraro en la modelo.
  // ⟨ La dikecoj 📃 ⟩ — atentu la okupajn nombrojn. 0o16/0o100 estas 14/64
  // ( 0.219 ), NE 0.16 — la malnova rostro estis kono kun baza radiuso 0.22,
  // duoble pli dika ol la tuta korpo, kaj la kruroj ankoraŭ pli dikaj.
  const rostrajPunktoj = [
    new THREE.Vector3(0, -0o1/0o100, 0o16/0o100),
    new THREE.Vector3(0, -0o6/0o100, 0o30/0o100),
    new THREE.Vector3(0, -0o12/0o100, 0o44/0o100),
  ];
  const rostro = new THREE.Mesh(mergeGeometries([
    kreiTubon(rostrajPunktoj[0], rostrajPunktoj[1], 0o32/0o1000, 0o26/0o1000),
    kreiTubon(rostrajPunktoj[1], rostrajPunktoj[2], 0o26/0o1000, 0o20/0o1000),
    kreiArtikon(rostrajPunktoj[2], 0o20/0o1000),
  ])!, korpaMaterialo);
  rostro.name = "rostro";
  grupo.add(rostro);
  // La malhela pinto finiĝas per RONDA buŝo ( la buŝmalfermo de la proboscido ),
  // ne per plata tranĉaĵo de cilindro.
  const buŝaPunkto = new THREE.Vector3(0, -0o16/0o100, 0o50/0o100);
  const rostropinto = new THREE.Mesh(mergeGeometries([
    kreiTubon(rostrajPunktoj[2], buŝaPunkto, 0o20/0o1000, 0o11/0o1000),
    kreiArtikon(buŝaPunkto, 0o11/0o1000),
  ])!, new THREE.MeshStandardMaterial({ color: 0x584838, roughness: 0o3/0o4,
    map: kutiklo.koloro, bumpMap: kutiklo.reliefo, bumpScale: 0o1/0o50 }));
  rostropinto.name = "rostropinto";
  grupo.add(rostropinto);

  // La okultubero — eta kupolo sur la trunko kun KVAR okuloj ( du paroj ),
  // kiel ĉe vera marlaraksxo. Antaŭe la besto havis neniajn okulojn.
  const okulaMaterialo = new THREE.MeshStandardMaterial({ color: 0x18202a, roughness: 0o1/0o4 });
  const tubero = new THREE.Mesh(new THREE.SphereGeometry(0o5/0o100, 0o10, 0o6), korpaMaterialo);
  tubero.scale.set(1, 0o4/0o5, 0o6/0o10);
  tubero.position.set(0, 0o7/0o100, 0o1/0o12);
  grupo.add(tubero);
  for ( const sx of [ 0o1, -0o1 ] ) {
    for ( const sz of [ 0o1, -0o1 ] ) {
      const okulo = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o100, 0o6, 0o4), okulaMaterialo);
      okulo.position.set(sx * 0o3/0o100, 0o5/0o100, 0o1/0o12 + sz * 0o2/0o100);
      grupo.add(okulo);
    }
  }

  // La abdomeno — eta tubo malantaŭen-supren, kie malplenigas la digesto.
  const abdomeno = new THREE.Mesh(
    new THREE.CylinderGeometry(0o3/0o100, 0o2/0o100, 0o10/0o100, 0o6), korpaMaterialo);
  abdomeno.rotation.x = -Math.PI / 0o2 - 0o3/0o10;
  abdomeno.position.set(0, 0o3/0o100, -0o1/0o6);
  grupo.add(abdomeno);

  // La ovigeroj — du etaj segmentitaj piedetoj sub la rostro, per kiuj la
  // virseksaj marlaraksxoj portas la ovojn. Bela kaj tre karakteriza detalo.
  for ( const s of [ 0o1, -0o1 ] ) {
    const ovigero = new THREE.Mesh(
      new THREE.CylinderGeometry(0o1/0o100, 0o2/0o100, 0o12/0o100, 0o6), korpaMaterialo);
    ovigero.rotation.x = Math.PI / 0o2 - 0o1/0o2;
    ovigero.rotation.z = -s * 0o2/0o10;
    ovigero.position.set(s * 0o5/0o100, -0o5/0o100, 0o12/0o100);
    grupo.add(ovigero);
  }

  // ⟨ La kruroj 📃 ⟩ — Ok longegaj maldikaj kruroj kun KLARe videblaj artikoj.
  // Ĉiu kruro havas DU artikojn en DU grupoj — la kokson ( la grupo „kruro“ )
  // kaj la genuon ( la grupo „genuo“ ene de ĝi ); vera marlaraksxo fleksas la
  // genuon ĉe ĉiu paŝo, kaj la animacio faras tion ( vidu gxisdatigiBestojn ).
  //
  // ⟨ Kial la artikoj estas PUNKTOJ 📃 ⟩ — ĉiu segmento inter du punktoj de la
  // korpa kadro ( la kokso, la genuo, la maleolo, la ungego ) per kreiTubon. La
  // antaŭa modelo konstruis la tibion per permanaj rotateZ-anguloj EN LA LOKA
  // kadro de la kokso — kaj tiu kadro NE speguliĝas mem: la loka +x montras
  // malsupren-eksteren dekstre kaj supren-internen maldekstre. Tial unu flanko
  // de la kruroj leviĝis en la aeron kaj la besto aspektis rompita. La punktoj
  // estas la samaj en ambaŭ flankoj ( nur la x-signo ŝanĝiĝas ), do la kruroj
  // nun estas VERE spegulaj.
  //
  // ⟨ Kial la genuoj estas egalaj 📃 ⟩ — la disvastiĝo antaŭen-malantaŭen eniris
  // la FEMURAN direkton, do la antaŭaj kaj malantaŭaj genuoj estis pli malaltaj
  // ol la mezaj kaj la piedoj finiĝis je malsamaj altoj: la besto staris sur
  // kvar kruroj kaj la ceteraj pendis en la aero. La genuoj nun ĉiuj sidas je
  // la sama alto ( y = 0.578 ) kaj ĉiuj ok piedoj kuŝas sur UNU ebeno
  // ( y = -0.45 ), en ventiladoro antaŭen-malantaŭen.
  //
  // La ORIGINO de ĉiu grupo SIDAS ĉe sia artiko, do la animacio rotacias la
  // grupojn rekte — nenia re-centriga kalkulo.
  const kruraMaterialo = new THREE.MeshStandardMaterial({
    color: 0xd8b890, map: kutiklo.koloro,
    bumpMap: kutiklo.reliefo, bumpScale: 0o1/0o50,
    transparent: false, opacity: 1,
    // La akvo ne skribas profundon ( depthWrite false en akvo.ts ), do la
    // kruroj restas videblaj tra la travidebla akvo — sed konstruaĵoj ( kiuj
    // skribas profundon ) nun ĝuste kovras ilin, anstataŭ lasi ilin brili tra
    // la muroj ( tio okazis kiam depthTest estis malŝaltita ).
    depthWrite: true, depthTest: true, side: THREE.DoubleSide,
    roughness: 0o1/0o2, emissive: 0x382818, emissiveIntensity: 0o1/0o10,
  });
  // ⟨ La artikaj punktoj 📃 ⟩ — la koksoj, la genuoj kaj la piedoj de la kvar
  // paroj, de antaŭe malantaŭen. La genuoj altas unuforme ( y = 0.578 ) kaj la
  // piedoj kuŝas sur la grundo ( y = -0.45 ); la antaŭa kaj la malantaŭa paroj
  // malproksimiĝas antaŭen kaj malantaŭen, do la kruroj formas ventilatoron.
  const koksojZ = [ 0o12/0o100, 0o2/0o100, -0o4/0o100, -0o12/0o100 ];
  const genuojZ = [ 0o24/0o100, 0o5/0o100, -0o5/0o100, -0o24/0o100 ];
  const piedojZ = [ 0o46/0o100, 0o20/0o100, -0o20/0o100, -0o46/0o100 ];
  const piedojX = [ 0o44/0o100, 0o62/0o100, 0o62/0o100, 0o44/0o100 ];
  const GENUA_X = 0o40/0o100, GENUA_Y = 0o37/0o100, PIEDA_Y = -0o45/0o100;
  for ( let k = 0; k < 0o4; k++ ) {
    for ( const s of [ 0o1, -0o1 ] ) {
      // La kokso sidas sur la trunka segmento de la paro.
      const kokso = new THREE.Vector3(s * 0o5/0o100, -0o2/0o100, koksojZ[k]);
      const genuo = new THREE.Vector3(s * GENUA_X, GENUA_Y, genuojZ[k]);
      const piedo = new THREE.Vector3(s * piedojX[k], PIEDA_Y, piedojZ[k]);
      // La maleolo — la dua artiko de la tibio, iomete super la rekta linio
      // inter la genuo kaj la piedo, do la lasta segmento malsupreniras pli
      // krute ol la tibio kaj la kruro montras DU videblajn fleksojn.
      const maleolo = new THREE.Vector3().lerpVectors(genuo, piedo, 0o5/0o10);
      maleolo.y += 0o5/0o100;
      // La ungego — la malhela ungo daŭrigas la lastan segmenton.
      const ungego = new THREE.Vector3().subVectors(piedo, maleolo)
        .setLength(0o12/0o100).add(piedo);
      const kruro = new THREE.Group();
      kruro.name = "kruro";
      kruro.renderOrder = 6;
      // ⟨ La flanko 📃 ⟩ — la animacio bezonas scii, ĉu la kruro staras maldekstre
      // aŭ dekstre: la genua flekso kaj la paŝa bato speguliĝas per la kontraûa
      // signo ( vidu gxisdatigiBestojn ).
      kruro.userData.flanko = s;
      kruro.position.copy(kokso);
      // ⟨ La krura skalo 📃 ⟩ — la malneto estas konstruata en veraj korpaj
      // unuoj ( la kruroj longas ~5 fojojn la korpon ), kaj la tuta kruro
      // malgrandiĝas unuforme je 0.75 — tiel la besto restas rekonebla en la
      // rivero sen ŝanĝi la korpajn mezurojn.
      kruro.scale.setScalar(0o6/0o10);

      // La femuro — de la kokso ( la grupo-origino ) ĝis la alta genuo. La
      // koksa globeto kovras la kuniĝon de la femuro kaj la korpo.
      const femuro = new THREE.Mesh(mergeGeometries([
        kreiTubon(new THREE.Vector3(), new THREE.Vector3().subVectors(genuo, kokso),
          0o13/0o1000, 0o10/0o1000),
        kreiArtikon(new THREE.Vector3(), 0o20/0o1000),
      ])!, kruraMaterialo);
      femuro.name = "femuro";
      kruro.add(femuro);

      // La genuo — la dua artiko. La tibio, la maleolo, la tarso kaj la ungego
      // sidas ene de la grupo ( ili moviĝas KUNE ), kaj la grupo mem restas sen
      // rotacio, do la animacio povas skribi la angulon rekte ( vidu
      // gxisdatigiBestojn ).
      const genuoGrupo = new THREE.Group();
      genuoGrupo.name = "genuo";
      genuoGrupo.position.subVectors(genuo, kokso);
      const loka = new THREE.Vector3();
      const lokaMaleolo = new THREE.Vector3().subVectors(maleolo, genuo);
      const lokaPiedo = new THREE.Vector3().subVectors(piedo, genuo);
      const lokaUngoTip = new THREE.Vector3().subVectors(ungego, genuo);
      const partoj: THREE.BufferGeometry[] = [
        kreiArtikon(loka, 0o15/0o1000),
        kreiTubon(loka, lokaMaleolo, 0o10/0o1000, 0o6/0o1000),
        kreiArtikon(lokaMaleolo, 0o7/0o1000),
        kreiTubon(lokaMaleolo, lokaPiedo, 0o6/0o1000, 0o5/0o1000),
        kreiTubon(lokaPiedo, lokaUngoTip, 0o5/0o1000, 0o1/0o1000),
      ];
      const tibiaMesho = new THREE.Mesh(mergeGeometries(partoj)!, kruraMaterialo);
      tibiaMesho.name = "tibio";
      genuoGrupo.add(tibiaMesho);
      kruro.add(genuoGrupo);
      // La baza pozo estas konservata en la malneto; la efektiva klono ricevas
      // sian propran typed-kvaternionon en konstruiBestojn ( userData ne taŭgas
      // por THREE.Quaternion, ĉar Object3D.clone serialigas ĝin al JSON ).
      grupo.add(kruro);
    }
  }

  return { malneto: grupo, platigxo: new THREE.Vector3(0o1, 0o1, 0o1), supro: 0o1/0o10, speco: "marlaraksxo", mergo: 0o2 };
}

// gxisdatigiMarlaraksxon — alterna metakrona paŝado: kontraŭaj kruroj
// laboras kune, la apudaj paroj postrestas, la kokso balaas la piedon ĉirkaŭ
// la VERTIKALA akso de la besto kaj la genuo fleksiĝas dum la levo.
export function gxisdatigiMarlaraksxon(b: Besto, t: number): void {
  const subtila = Math.sin(t * 0o1/0o2 + b.phase * 0o3);
  // Alterna metakrona paŝado. kontraŭaj kruroj laboras kune, dum la
  // apuda paro iom postrestas. Tio aspektas kiel marŝo, ne kiel ok
  // identaj pendoloj. La fazo de la flankoj estas kontraŭa, kaj tiu de
  // la kvar laŭlongaj paroj estas iomete disvastigita por pli glata ondo.
  let i = 0;
  for ( const bazaro of b.bazajKruroj ) {
    const paro = Math.floor(i / 2);
    const flanko = i % 2;
    const fazo = t * 0o33/0o10 + b.phase + paro * 0o7/0o10 + flanko * Math.PI;
    const paŝo = Math.sin(fazo);
    // La kruro antaŭen svingiĝas dum la piedo estas sur la grundo;
    // ĉe la reveno ĝi iom leviĝas kaj retroiras pli rapide.
    const levo = Math.max(0, Math.sin(fazo + Math.PI * 0o1/0o4));
    const svingo = paŝo * 0o14/0o100 + Math.sin(fazo * 2) * 0o3/0o100;
    // ⟨ La bato 📃 ⟩ — rotacio ĉirkaŭ la VERTIKALA akso de la besto: la kokso
    // balaas la piedon antaŭen-malantaŭen, kiel ĉe vera araneo. La sama turno
    // ĉirkaŭ +y movas la DEKSTRAN piedon malantaŭen kaj la MALDEKSTRAN
    // antaŭen ( la piedoj sidas sur kontraŭaj flankoj de la akso ), do la
    // signo speguliĝas per flanko. La malnova bato turniĝis ĉirkaŭ la loka
    // z-akso de la kokso — tiu akso estis laŭ la korpo, do la kruroj ruliĝis
    // anstataŭ paŝi.
    kruroBataKvaterniono.setFromAxisAngle(kruroBataAkso, -bazaro.flanko * svingo);
    bazaro.kruro.quaternion.copy(kruroBataKvaterniono).multiply(bazaro.q);

    // ⟨ La genuo 📃 ⟩ — la kruro nun ARTIKIĜAS. Dum la levo ( la piedo estas
    // en la aero ) la genuo fleksiĝas kaj la tarso kuntiriĝas sub la korpon;
    // antaŭ la surteriĝo ĝi rektiĝas, kaj ĉe la puŝo la kruro restas preskaŭ
    // rekta. Malgranda konstanta flekso ( 0o1/0o40 ) tenas la genuon videbla
    // ankaŭ ĉe la puŝo. La antaŭa kruro estis unu rigida bastono kiu svingiĝis
    // ĉe la kokso — ĝi havis genuon en la nomo, sed ne en la movo.
    if ( bazaro.genuo ) {
      const flekso = levo * 0o2/0o5 + Math.max(0, paŝo) * 0o10/0o100;
      bazaro.genuo.rotation.z = -bazaro.flanko * ( 0o1/0o40 + flekso );
    }
    i++;
  }
  // Malgranda kontraŭbalanco de la korpo helpas la longajn krurojn
  // "porti" la beston dum la alternaj paŝoj.
  b.grupo.rotation.x = subtila * 0o2/0o100 + Math.sin(t * 0o33/0o10 + b.phase) * 0o1/0o100;
  b.grupo.rotation.z = Math.cos(t * 0o33/0o10 + b.phase) * 0o1/0o100;
}
