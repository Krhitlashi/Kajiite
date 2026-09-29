// ≺⧼ La enirejoj 🚪 ⧽≻
// La porda kurbego ( kreiKadranKurbon ) kaj la enirejo mem ( aldoniEnirejon ).
import * as THREE from "three";
import { MURA_KLINO, rondigitaTrapezaFormo } from "./formoj.js";

// aldoniEnirejon — Uniforma enirejo por cxiuj tipoj. pli malgranda kaj pli plata
// (malpli profunda), sidanta sur la tero, kun ora bevelo cxirkaux la rando.
//     @param flankoj ( number ) - Kiom da pordoj ( la sanktejo havas 4, unu po flanko ).
// Elportita ( export ) ankaŭ por la inspektilo, kiu montras la pordon sola.
// kreiKadranKurbon — La konturo de formo kiel TRIDIMENSIA, FERMITA CurvePath en la
// ebeno z. La tubo de la ora kadro sekvas tiun vojon SEN interpola svingo.
// ⟨ Kial 📃 ⟩ — la malnova kodo prenis cent punktaron el la formo ( getPoints ) kaj
// pasigis gxin tra CatmullRomCurve3. Tiu kurbo interkalkulas sian propran interpolon
// tra la punktoj kaj Svingigxas ekster la formo — cxe la anguloj gi elstaris kiel
// nudoj kaj la tubo montris diskontinuajn helajn makulojn, do la kadro aspektis nek
// glata nek kunligita. Nun la segmentoj de la formo mem estas samplitaj kaj
// kunligitaj per rektaj pecoj, do la kadro kusxas GXUSTE sur la konturo kaj estas
// unu senjunta buklo.
//     @param formo ( THREE.Path ) - La formo de la pordo ( aux la truo ).
//     @param z ( number ) - La ebeno, en kiun la konturo translokigxas.
//     @param sampoj ( number = 0o20 ) - Kiom da pecoj po formo-segmento.
//     @returns putho ( THREE.CurvePath ) - La fermita vojo, sen duobla finpunkto.
export function kreiKadranKurbon(formo: THREE.Path, z: number,
  sampoj = 0o20): THREE.CurvePath<THREE.Vector3> {
  const putho = new THREE.CurvePath<THREE.Vector3>();
  const punktoj: THREE.Vector3[] = [];
  for ( const kurbo of formo.curves ) {
    const partoj = kurbo.getPoints(sampoj);
    for ( let i = 0; i < partoj.length; i++ ) {
      // La unua punkto de ĉiu segmento ripetas la lastan de la antaŭa.
      if ( i === 0 && punktoj.length > 0 ) continue;
      punktoj.push(new THREE.Vector3(partoj[i].x, partoj[i].y, z));
    }
  }
  // La ferma segmento revenas al la unua punkto — tio estas jam la fino de la
  // buklo, do la duobla punkto forfalas ( alie la tubo ricevus degeneran ringon ).
  if ( punktoj.length > 1 && punktoj[0].distanceTo(punktoj[punktoj.length - 1]) < 1e-6 ) punktoj.pop();
  for ( let i = 0; i < punktoj.length - 1; i++ ) putho.add(new THREE.LineCurve3(punktoj[i], punktoj[i + 1]));
  return putho;
}

//     @param flankoj ( number ) - Kiom da flankoj ricevas pordon ( 1 aux 4 ).
//     @param tieroAlto ( number ) - La alto de unu tiero ( por la klino de la
//              muro ). 0 = sen klino ( la inspektilo, kiu montras la pordon sola ).
export function aldoniEnirejon(group: THREE.Group, d: number, kadraMaterialo: THREE.MeshStandardMaterial, eniraMaterialo: THREE.MeshStandardMaterial, flankoj = 1, tieroAlto = 0, nagetoj = false): void {
  const pordGrupo = new THREE.Group();
  const blokoLargho = 0o233/0o100, tw = blokoLargho * 0o45/0o100, eh = 0o11/0o4;
  // ⟨ La kadro estas SIMETRIA 📃 ⟩ — la kvar anguloj ricevas la SAMAN radiuson
  // ( 0o1/0o4 ), do la ora kadro rondigxas egale supre kaj malsupre. La antauxa
  // malsama paro ( pli ronda bazo, pli akra supro ) igis la kadron nesimetria.
  const shape = rondigitaTrapezaFormo(blokoLargho, tw, eh, 0o1/0o4, 0o1/0o4);
  // ⟨ La pordo estas MALDIKA 📃 ⟩ La folio estas 0o7/0o100 ( 0.109375 ) profunda
  // kun eta bevelo ( antaŭe 0o2/0o10 = 0.25 kun 0o5/0o100 da bevelo, do la pordo
  // elstaris 0.31 de la muro kaj aspektis kiel skatolo sur ĝi ).
  // ⟨ Nun PLI LONGA antauxen 📃 ⟩ La folio iris de 0o1/0o20 ( 0.0625 ) al
  // 0o7/0o100 ( 0.109375 ). Nur la FRONTO moviĝas, la malantaŭa faco restas en la
  // muro, do la pordo elstaras 0.125 anstataŭ 0.078. La sama dikeco estas uzata
  // ankaŭ de la kosmosxipa pordo, do la du pordoj restas la sama familio.
  // ⟨ Kial ne 0o3/0o40 📃 ⟩ La unua provo iris nur al 0o3/0o40 ( 0.09375 ). La
  // pliigo estis 0.03125, proksimume 1% de la porda larĝo, kaj oni preskaŭ ne
  // vidis ĝin en la mondo. La ora kadro sekvas mem, ĉar ĝia radio estas la DUONO
  // de la tuta dikeco, do la kadro dikiĝas kune kaj daŭre kovras la tutan pordon.
  const pordDikeco = 0o7/0o100, pordBevelo = 0o1/0o40;
  const pordDikecoTuta = pordDikeco + pordBevelo * 2;
  // La rotacia grupo — la pordo kaj la kadro sidas ene de ĝi, do la KLINO
  // ( malsupre ) turnas ambaŭ kune ĉirkaŭ la linio kie la pordo tuŝas la grundon.
  const klinGrupo = new THREE.Group();
  klinGrupo.position.set(0, 0, d / 2);
  pordGrupo.add(klinGrupo);
  const enirejo = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: pordDikeco, bevelEnabled: true, bevelSize: pordBevelo, bevelThickness: pordBevelo, bevelSegments: 2, curveSegments: 0o20 }), eniraMaterialo);
  // La malantaŭa faco restas iomete EN la muro ( 0o1/0o100 ), do neniu fendo
  // malantaŭ la pordo; la tuta dikeco estas pordDikecoTuta.
  const pordZ = -0o1/0o100;
  enirejo.position.set(0, 0, pordZ); klinGrupo.add(enirejo);
  // ⟨ La kadro KOVRAS la tutan pordon 📃 ⟩ — la tubo kuŝas sur la MEZA ebeno de
  // la folio ( ne antaŭ ĝi ) kaj ĝia radio egalas la DUONON de la tuta dikeco
  // ( la folio kaj ĝiaj du beveloj ), do la ora kadro ĉirkaŭas la tutan
  // eksteran randon de la pordo: malantaŭe, antaŭe kaj flanke. Antaŭe la
  // maldika tubo staris antaŭ la dika folio kaj kovris nur ĝian frontan randon.
  // La kadro sekvas la konturon de la formo MEM ( kreiKadranKurbon ) — ne
  // CatmullRom-interpon tra punktaro — do la tubo kuŝas GXUSTE sur la pordo-formo,
  // sen nudoj kaj sen diskontinuajxoj cxe la anguloj, kaj gi estas unu glata
  // senjunta buklo. La tubo mem estas RONDA ( 0o14 flankoj anstataux 6 ) kaj la
  // sama granda angula radiuso cxe la kvar anguloj ( 0o1/0o4 ) RONDIGAS la kadron.
  const kadraKurbo = kreiKadranKurbon(shape, pordZ + pordDikeco / 2);
  klinGrupo.add(new THREE.Mesh(new THREE.TubeGeometry(kadraKurbo, 0o200, pordDikecoTuta / 2, 0o14, true), kadraMaterialo));
  // ⟨ La pordo KLINIGXAS kun la muro 📃 ⟩ — la muroj mallevigxas INTERNEN je
  // MURA_KLINO dum unu tiera alto, do pordo staranta vertikale nur tusxus la
  // muron per sia baza rando kaj malproksimigxus supren (~0.18 cxe la supro).
  // La pordo nun turnigxas laux la SAMA angulo, do gi restas PARALELA al sia
  // muro sur la tuta alto. La turno okazas ĉirkaŭ la baza linio ( klinGrupo ),
  // do la bazo restas sur la grundo.
  if ( tieroAlto > 0 ) klinGrupo.rotation.x = -Math.atan(MURA_KLINO / tieroAlto);
  // ⟨ La nagxetoj de la centra konstruajxo 📃 ⟩ — po DU triangulaj platoj ĉe ĉiu
  // pordo ( unu maldekstre, unu dekstre ), kiuj LEVIĜAS de la plata bazo kaj
  // tuŝas la oran kadron de la pordo laŭlonge de ĝia klinita flanko — kiel
  // nagxetoj aux sxnuroj, kiuj ligas la pordon al la bazplato. La interna rando
  // de ĉiu triangulo kuŝas GXUSTE sur la porda flanko ( de la baza angulo gxis la
  // malalta fino de la supra ronda angulo ), do la pinto algluiĝas al la kadro
  // sen trapasi ĝin; la ekstera pinto staras sur la ora bazplato ( 2.6 el la
  // mezo, bone ene de la plato je 4.45 ).
  if ( nagetoj ) {
    // ⟨ La nagxetoj estas ETAJ ALETOJ ANTAUXEN 📃 ⟩ — antaŭe ili kuŝis PLATE en la
    // muro-ebeno: grandaj oraj kojnoj disvastiĝantaj flanken de la pordaj supraj
    // anguloj malsupren al la rando de la bazplato. De antaŭe ili legiĝis kiel
    // pentritaj trianguloj SUR la muro, ne kiel parto de la konstruaĵo.
    //
    // Nun ĉiu naĝeto estas ALETO, kiu ELSTARAS ANTAŬEN el la muro — vertikala
    // triangula plato en la ebeno, kiu enhavas la KLINITAN FLANKON de la pordo
    // ( de la baza angulo supren al la supra angulo ) kaj la antaŭan direkton.
    // Ĝia interna rando do kuŝas GXUSTE sur la porda flanko ( la ronda kadra tubo
    // kovras ĝin, same kiel ĉe la malnovaj trianguloj ) kaj ĝia pinto etendiĝas
    // antaŭen ĉe la bazo — ĝi legiĝas kiel alo, kiu portas la pordan kadron.
    //
    // ⟨ Kial la ebeno ne estas simpla vertikala ebeno 📃 ⟩ — la porda flanko
    // DEKLIVAS ( la trapezo mallarĝiĝas supren ), do vertikala plato tuŝus la
    // kadron nur ĉe sia bazo. Nia plato sekvas la deklivon, do ĝi restas
    // algluiĝinta al la kadro la tutan vojon.
    const bazaX = blokoLargho / 2;                         // la porda baza angulo
    const supraX = tw / 2;                                 // la porda supra angulo
    const nagetaDikeco = 0o1/0o20;                         // 0.0625 — pli maldika ol la pordo
    // ⟨ La bazo de la nagxeto restas SUR la bazplato 📃 ⟩ — la antaŭa pinto
    // ( la tria vertico ) elstaras antaŭen je `nagetaProfundo` KAJ supren je
    // sin(klino) · nagetaProfundo ( la pordo klinigxas kun la muro ), dum la ora
    // bazplato finigxas je d/2 + 0o36/0o100 ( 4.36 cxe la sanktejo ). Kun 0.625
    // ( la malnova valoro ) la piedo de la triangulo elstaris 0.29 PREter la
    // randon de la plato kaj sxvebis super la grundo; 0.3 lasas la pinton 0.04
    // ene, do la nagxeto legigxas kiel parto de la bazplato.
    const nagetaProfundo = 0o3/0o10;                       // 0.3 — ene de la bazplato
    // La meza ebeno de la pordo — la sama ebeno kiel la centro de la kadra tubo.
    const zMebl = pordZ + pordDikeco / 2;
    for ( const sX of [ -1, 1 ] ) {
      const malsupra = new THREE.Vector3(sX * bazaX, 0, zMebl);
      const supra = new THREE.Vector3(sX * supraX, eh, zMebl);
      const lauxFlanko = supra.clone().sub(malsupra);
      const longo = lauxFlanko.length();
      const unuo = lauxFlanko.clone().divideScalar(longo);   // laux la porda flanko
      const antauxen = new THREE.Vector3(0, 0, 1);           // antauxen el la muro
      const normalo = new THREE.Vector3().crossVectors(unuo, antauxen).normalize();
      const triangulo = new THREE.Shape();
      triangulo.moveTo(0, 0);
      triangulo.lineTo(longo, 0);
      triangulo.lineTo(0, nagetaProfundo);
      triangulo.closePath();
      const geometrio = new THREE.ExtrudeGeometry(triangulo, { depth: nagetaDikeco, bevelEnabled: false });
      // La plato centriĝas sur la porda flanko ( duone enen, duone eksteren ).
      const matrico = new THREE.Matrix4().makeBasis(unuo, antauxen, normalo);
      matrico.setPosition(malsupra.clone().addScaledVector(normalo, -nagetaDikeco / 2));
      geometrio.applyMatrix4(matrico);
      klinGrupo.add(new THREE.Mesh(geometrio, kadraMaterialo));
    }
  }
  // Turnitaj kopioj — la sama pordo sur cxiu flanko. La kopioj kunhavigas la
  // geometriojn kaj materialojn de la unua, do la multaj pordoj ne kostas aldone.
  // La Y-turno estas la PLI EKSTERA grupo, do cxiu pordo klinigxas enen de sia
  // propra muro ( ne laux unu komuna direkto ).
  for ( let i = 0; i < flankoj; i++ ) {
    const kopio = i === 0 ? pordGrupo : pordGrupo.clone();
    kopio.rotation.y = i * Math.PI / 2;
    group.add(kopio);
  }
}
