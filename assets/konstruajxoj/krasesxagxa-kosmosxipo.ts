// ≺⧼ Krasesxagxa kosmosxipo 🚀 ⧽≻
// Ciel-rombo ciela transporto de ornaveth-v2
// La kosmosxipo nomigxas kzasexaz ( ſɭˬᴜ j͑ʃɔ ı],ᴜƴ ) en Iikrhia. noma formo. krasesxagxo.
// 5 tieroj supren, 5 malsupren (spegulitaj), LONGAs horizontalaj RONDIGITAJ fenestroj
// sur cxiu nivelo krom la centra ( kie la pordoj estas ); flosas libere sen soklo aux signo
import * as THREE from "three";
import { aldoniKadranTubon, kreiKlinoTavolon, kreiKadranKurbon,
  aldoniPilolFenestron, fenestraMargxeno } from "./satalaj-konstruajxoj.js";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";
import { kreiFenestranMaterialon } from "../komunajxoj/materialoj.js";

// ⟨ La duporda formo 📃 ⟩ — la enirejo de la kosmosxipo havas la SAMajn mezurojn
// kiel DU konstruajxaj pordoj ( aldoniEnirejon en satalaj-konstruajxoj ), unu el
// ili spegulita vertikale kaj stakigita super la alia. La du pordoj kunigxas cxe
// siaj LARGXAJ bazoj, do la formo estas alta pordo kies plej LARGXA parto estas la
// MEZO — gi mallargxigxas al la du finoj. Tiel gi spegulas la silueton de la sxipo
// mem ( kiu same estas plej largxa cxe la centro kaj pintigxas supren kaj
// malsupren ), kaj cxiu duono legigxas kiel vera pordo — la supra staranta, la
// malsupra gia spegulo.
//
// ⟨ Kial ne sablohorlogxo 📃 ⟩ — la unua versio kunigis la du pordojn cxe iliaj
// MALLARFXAJ finoj. Tio montrigxis malgusta duoble. Unue la sxipo staras duone
// sub la grundo, do oni vidas nur la SUPRAN duonon de la pordo, kaj kun la talio
// meze tiu videbla duono estis pordo renversita ( mallargxa malsupre, largxa
// supre ). Due la talio mem kontrauxdiris la silueton de la sxipo.  Kun la bazoj
// kune, la videbla supra duono estas tute normala pordo — largxa bazo malsupre,
// mallargxa supro supre.
//
// La largho estas la largho de la bazo de UNU pordo ( 0o233/0o100 ), la alto estas
// la alto de DU ( 2 × 0o11/0o4 ), kaj la kvar anguloj ricevas la SAMAN radiuson
// kiel la pordokadro ( 0o1/0o4 ). La konturo estas SIMETRIA duoble — spegulita
// horizontale ( y → -y ) kaj vertikale ( x → -x ) — do la du pordoj vere legigxas
// kiel speguloj de la sama pordo. La formo estas centrita je y = 0 ( kiel la
// malnova rombo ), do la pordo restas centrita sur la spegula centro de la sxipo,
// kaj la konturo movigxas kontrauxhorlogxe, kiel la ekstera pordo ( la sama
// konvencio por Earcut ).
//     @param blokoLargho ( number ) - La largho de la bazo de UNU pordo.
//     @param tw ( number ) - La largho de la mallargxa supro de UNU pordo.
//     @param eh ( number ) - La alto de UNU pordo ( la duono de la tuta formo ).
//     @param r ( number ) - La rondigita angulo cxe la kvar anguloj.
// @returns formo
function rondigitaDupordaFormo(blokoLargho: number, tw: number, eh: number,
  r: number): THREE.Shape {
  const s = new THREE.Shape();
  const hb = blokoLargho / 2, ht = tw / 2;
  // La deklivo de la pordaj flankoj — la sama kiel cxe la konstruajxa pordo.
  const sl = ( hb - ht ) / eh;
  const d = sl * r;
  // La malsupra fino — la mallargxa supro de la malsupra ( spegulita ) pordo.
  s.moveTo(-ht + r, -eh);
  s.lineTo(ht - r, -eh);
  s.quadraticCurveTo(ht, -eh, ht + d, -eh + r);
  // La flanko de la malsupra pordo — gi plilarghigxas supren al la bazo.
  s.lineTo(hb - d, -r);
  // La MEZO — la du bazoj de la pordoj kunigxas kaj la formo estas plej largxa.
  s.quadraticCurveTo(hb, 0, hb - d, r);
  // La flanko de la supra pordo — gi mallargxigxas supren al la pinto.
  s.lineTo(ht + d, eh - r);
  s.quadraticCurveTo(ht, eh, ht - r, eh);
  s.lineTo(-ht + r, eh);
  s.quadraticCurveTo(-ht, eh, -ht - d, eh - r);
  s.lineTo(-hb + d, r);
  s.quadraticCurveTo(-hb, 0, -hb + d, -r);
  s.lineTo(-ht - d, -eh + r);
  s.quadraticCurveTo(-ht, -eh, -ht + r, -eh);
  s.closePath();
  return s;
}

export interface Krasesxagxo {
  group: THREE.Group;
  windows: THREE.Mesh[];
  pordaPozicio: THREE.Vector3;
  doorDir: THREE.Vector3;
}

// konstruiKrasesxagxon — Konstruu la kosmosxipon kun DUPORDAJ enirejoj ( du spegulitaj pordoj stakigitaj ) kaj LONGAs horizontalaj rondigitaj fenestroj.
export function konstruiKrasesxagxon(sceno: THREE.Scene,
  x: number, y: number, z: number,
  oraMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial
): Krasesxagxo {
  const group = new THREE.Group();
  const tieroAlto = 0o163/0o40, up = 5, down = up, hw0 = 4;
  const ins = ( 4 - 0o123/0o100 ) / 4;
  const face = Math.atan2(-x, -z);

  const muraMaterialo = new THREE.MeshStandardMaterial({
    color: 0x184838, roughness: 0o33/0o100, metalness: 0o5/0o100, envMapIntensity: 0o23/0o40,
  });
  // ⟨ La sama vitro kiel la urbo 📃 ⟩ La ŝipo antaŭe havis sian propran vitron
  // kun alia nuanco ( 0x082828 kaj pli forta emisio ), do la fenestroj de la ŝipo
  // kaj tiuj de la konstruaĵoj ne vere aspektis kiel la sama materialo. Nun la
  // difino venas el la komuna fabriko. La instanco tamen restas propra, ĉar la
  // flugo pulsas ĝian emision ( animaciiKrasesxagxon ) kaj la pulso ne rajtas
  // tuŝi la fenestrojn de la tuta urbo.
  const fenestraMaterialo = kreiFenestranMaterialon();

  const murajGeometrioj: THREE.BufferGeometry[] = [];
  const kadrajGeometrioj: THREE.BufferGeometry[] = [];

  // La sxipo reuzas la KONSTRUAJX-tavolojn ( klinitaj trapezoidoj ) — CXiUJ tavoloj
  // klinigxas kiel la konstruajxoj (la uzanto petis saman tavol-tipon kiel la
  // konstruajxoj). La klinitaj tavoloj ricevas klinitajn pilierojn (klino), kaj la
  // renversitaj subaj pilieroj montras siajn foliojn pinton-malsupren ( folio defaŭlte = true ).
  const klino = 0o5/0o20;
  // Suprenaj tieroj — samaj diamantaj angul-pilieroj kiel la konstruajxoj.
  // Cxiuj tavoloj klinigxas (trapezoidoj) kiel la konstruajxoj — la uzanto petis
  // la saman tavol-tipon por la tuta sxipo.
  for ( let i = 0; i < up; i++ ) {
    const hw = hw0 - i * ins;
    const yB = i * tieroAlto, yT = yB + tieroAlto;
    murajGeometrioj.push(kreiKlinoTavolon(hw, hw, hw - klino, hw - klino, tieroAlto).translate(0, yB + tieroAlto / 2, 0));
    for ( const a of [ -1, 1 ] ) for ( const b of [ -1, 1 ] ) {
      aldoniKadranTubon(kadrajGeometrioj, a * hw, b * hw, yB, yT, a, b, true, klino);
    }
  }
  // Malsuprenaj tieroj — la PRECIZA vertikala spegulo de la supraj ( samaj largxoj,
  // samaj klinoj, inverse ). La suba duono spegulas la supran, do la sxipo aspektas
  // spegulita ambauxflanke de la centro. La klinitaj tavoloj klinigxas inverse
  // (pli largxaj supre, pinton suben).
  for ( let j = 1; j <= down; j++ ) {
    const hw = hw0 - ( j - 1 ) * ins;
    const yTop = -( j - 1 ) * tieroAlto, yBot = -j * tieroAlto;
    murajGeometrioj.push(kreiKlinoTavolon(hw - klino, hw - klino, hw, hw, tieroAlto).translate(0, ( yTop + yBot ) / 2, 0));
    for ( const a of [ -1, 1 ] ) for ( const b of [ -1, 1 ] ) {
      aldoniKadranTubon(kadrajGeometrioj, a * hw, b * hw, yBot, yTop, a, b, false, klino);
    }
  }

  const muroj = new THREE.Mesh(kunfandiGeometriojn(murajGeometrioj), muraMaterialo);
  muroj.castShadow = true;
  group.add(muroj);
  group.add(new THREE.Mesh(kunfandiGeometriojn(kadrajGeometrioj), oraMaterialo));

  // La dupordaj enirejoj sur CxIUJ 4 flankoj, CENTRITAJ je y=0 ( la spegula
  // centro de la sxipo ). La pordoj speguligxas supren kaj suben, kaj la centraj
  // tavoloj (kie la pordoj estas) ricevas neniun fenestron.
  const pordFormo = rondigitaDupordaFormo(0o233/0o100, 0o233/0o100 * 0o45/0o100, 0o11/0o4, 0o1/0o4);
  // ⟨ La pordo havas la SAMAN dikecon kiel la konstruajxa 📃 ⟩ Antaŭe la
  // kosmosxipa pordo estis bloko 0.6 profunda, do ĝi elstaris kiel kofro sur la
  // sxipo, kaj la ora kadro flosis aparte antaŭ ĝi. Nun la folio estas
  // 0o7/0o100 ( 0.109375 ) kun la sama eta bevelo ( 0o1/0o40 ) kiel aldoniEnirejon
  // en satalaj-konstruajxoj.ts, do la kosmosxipa pordo kaj la konstruajxa pordo
  // apartenas al la sama dikeco.
  const pordDikeco = 0o7/0o100, pordBevelo = 0o1/0o40;
  const pordDikecoTuta = pordDikeco + pordBevelo * 2;
  // ⟨ Kie sidas la porda ebeno 📃 ⟩ La muroj KLINIGXAS, pli mallargxaj ju pli for
  // de la centro, do la fronta faco de la sxipo estas kresto kiu elstaras plej
  // multe cxe la talio ( y=0 ). Plata plato povas kusxi gxuste sur unu sola alto,
  // do ni metu ĝin cxe la talion. Tie ĝi entombiĝas 0.046875 en la muron, same
  // kiel la konstruajxa pordo entombiĝas 0.046875 en sian muron, kaj ĝi elstaras
  // 0.125 de la sxipo, same kiel la doma pordo.
  const pordaRadiuso = hw0 - 0o1/0o100;
  for ( let f = 0; f < 4; f++ ) {
    const enirejaGeometrio = new THREE.ExtrudeGeometry(pordFormo, {
      depth: pordDikeco, bevelEnabled: true, bevelSize: pordBevelo, bevelThickness: pordBevelo,
      bevelSegments: 2, curveSegments: 0o20,
    });
    const enirejaMreto = new THREE.Mesh(enirejaGeometrio, eniraMaterialo);
    enirejaMreto.rotation.y = f * Math.PI / 2;
    enirejaMreto.position.set(Math.sin(f * Math.PI / 2) * pordaRadiuso, 0,
      Math.cos(f * Math.PI / 2) * pordaRadiuso);
    group.add(enirejaMreto);

    // ⟨ La ora konturo 📃 ⟩ La tubo sekvas la konturon de la formo MEM
    // ( kreiKadranKurbon ) kaj estas RONDA ( 0o14 flankoj ). Nun ĝi kuŝas sur la
    // MEZA ebeno de la folio kaj ĝia radio egalas la DUONON de la tuta dikeco, do
    // la kadro ĉirkaŭas la tutan eksteran randon de la pordo, antaŭe, malantaŭe
    // kaj flanke. Antaŭe la tubo sidis en aparta ebeno 0.044 antaŭ la fronta faco
    // de la folio, do ĝi nur premis sin sur tiun facon anstataŭ ĉirkaŭi la randon.
    const kadraKurbo = kreiKadranKurbon(pordFormo, pordDikeco / 2);
    const ornamo = new THREE.Mesh(new THREE.TubeGeometry(kadraKurbo, 0o200, pordDikecoTuta / 2, 0o14, true),
      oraMaterialo);
    ornamo.rotation.y = f * Math.PI / 2;
    ornamo.position.set(Math.sin(f * Math.PI / 2) * pordaRadiuso, 0,
      Math.cos(f * Math.PI / 2) * pordaRadiuso);
    group.add(ornamo);
  }

  // ⟨ La fenestroj 📃 ⟩ — unu LONGAs horizontala pilol-fenestro po faco po
  // tavolo, sur ĉiu tavolo KROM la centraj ( i=0 kaj j=1 ), kie la pordoj estas.
  // Ĉiuj tavoloj klinigxas ( kiel la konstruaĵoj ), do ĉiuj fenestroj estas
  // klinitaj. La meto ( la radia bazo ĉe la fenestra SUBO kaj la klino de la
  // monto-grupo ) estas dividita kun la konstruaĵoj — vidu
  // aldoniPilolFenestron en satalaj-konstruajxoj.ts. La antaŭa kodo metis la
  // grupon ĉe la fenestra subo sed per la radiuso ĉe la fenestra CENTRO, do ĉiuj
  // supraj fenestroj entombiĝis 0.0115 en la muron ( kaj la subaj flosis 0.043
  // eksteren ) — la fenestroj tute ne montriĝis.
  // ⟨ La fenestroj de la sxipo estas iom pli grandaj 📃 ⟩ — la sxipo estas la
  // plej GRANDA objekto de la mondo kaj oni vidas gxin de malproksime kaj de
  // supre, dum la konstruajxojn oni alproksimigxas piede. Kun la sama fenestra
  // mezuro kiel la domoj la fenestroj de la sxipo perdis sin en la muroj. Do la
  // fenestra alto levigxis per okono ( 0o11/0o10 = 9/8, t.e. 12.5% ) kaj la
  // margxeno restas tri kvaronoj ( 0o3/0o4 ) de la konstruajxa — la fenestro
  // farigxis pli longa KAJ pli alta, sed restas la sama pilolo.
  const fenAlto = Math.min(0o5/0o10, tieroAlto * 0o23/0o100) * 0o11/0o10;
  const niveloj: { y: number; faco: number; suba: boolean }[] = [];
  for ( let i = 1; i < up; i++ ) {
    niveloj.push({ y: i * tieroAlto + tieroAlto / 2, faco: hw0 - i * ins - klino / 2, suba: false });
  }
  // Subaj fenestroj — precizaj speguloj de la supraj ( samaj facoj, INVERSA klino ).
  for ( let j = 2; j <= down; j++ ) {
    niveloj.push({ y: -j * tieroAlto + tieroAlto / 2, faco: hw0 - ( j - 1 ) * ins - klino / 2, suba: true });
  }
  // ⟨ UNU marĝena nombro por la tuta sxipo 📃 ⟩ Kiel ĉe la konstruaĵoj, la nombro
  // estas kalkulita unufoje ( fenestraMargxeno ) kaj ĉiuj niveloj uzas ĝin TIEL,
  // sen multipliko per sia propra ringo. La libera spaco ĉe la anguloj estas la
  // sama nombro ĉien, la fenestra alto ne ŝanĝiĝas, kaj la pinto-ringoj restas sen
  // fenestro ( same kiel la pinta tavolo de la kunvenejo ).
  const facoPlejLarga = hw0 - ins - klino / 2;
  // Tri kvaronoj de la konstruajxa margxeno — vidu la noton pri la fenestra
  // alto supre: la pli mallarĝa interspaco igas la fenestron pli longa, do la
  // sama pilolo plenigas pli multe de la faco sur la sxipo ol sur la domoj.
  const fenMargxeno = fenestraMargxeno(facoPlejLarga) * 0o3/0o4;
  const fenestrajMretoj: THREE.Mesh[] = [];
  for ( const lv of niveloj ) {
    // ⟨ Ringo tro mallarĝa 📃 ⟩ Same kiel ĉe la konstruaĵoj — la pintaj ringoj
    // ricevas VERTIKALAN fenestron, ĉar horizontala ne plu enirus kun la sama
    // marĝeno. La ringa alto donas la longan mezuron.
    const horizontala = lv.faco * 2 - fenMargxeno * 2 >= fenAlto;
    if ( !horizontala && lv.faco < fenAlto * 0o1/0o2 + 0o1/0o10 ) continue;
    for ( let f = 0; f < 4; f++ ) {
      fenestrajMretoj.push(aldoniPilolFenestron(group, oraMaterialo, fenestraMaterialo,
        f, lv.y, lv.faco, klino, tieroAlto, fenAlto, lv.suba,
        horizontala ? fenMargxeno : undefined, !horizontala));
    }
  }

  // Neniu soklo, bazplato aux brila ringo — sxipo flosas libere
  // ( la surflanka signo estas forigita laux peto )

  // Porda pozicio — centrita je la pordo ( y=0 )
  const dir = new THREE.Vector3(Math.sin(face), 0, Math.cos(face));
  const pordaPozicio = new THREE.Vector3(dir.x * ( hw0 + 0o20/0o10 ), 0,
    dir.z * ( hw0 + 0o20/0o10 ));

  group.position.set(x, y, z);
  sceno.add(group);

  return { group, windows: fenestrajMretoj, pordaPozicio, doorDir: dir.clone() };
}

// animaciiKrasesxagxon — Animaciu la kosmosxipon. oscilado, rotacio, fenestra pulsado.
export function animaciiKrasesxagxon(ship: Krasesxagxo,
  t: number,
  isFlying: boolean
): void {
  if ( !isFlying ) {
    // Absoluta bazo, ne kumulado — alie la sinusa oscilo drivus la sxipon
    // supren/malsupren je dekoj da unuoj dum longaj sesioj.
    if ( ship.group.userData.bazaY === undefined ) {
      ship.group.userData.bazaY = ship.group.position.y;
    }
    ship.group.position.y = ( ship.group.userData.bazaY as number ) + Math.sin(t * 0o23/0o100) * 0o1/0o20;
  }
  ship.group.rotation.y += 0o0/0o10;
  ship.group.rotation.z = Math.sin(t * 0o2/0o10) * 0o1/0o40;

  // Pulso de fenestroj dum flugo. La pulso SUPERREGAS la bazan emision de la
  // komuna vitro ( 0o3/0o20 ) dum la flugo, do la ŝipo vere lumiĝas supren.
  if ( isFlying ) {
    const pulso = 0o23/0o100 + 0o15/0o100 * Math.sin(t * 3);
    const fenestraMaterialo = ship.windows[0]?.material as THREE.MeshStandardMaterial;
    if ( fenestraMaterialo ) {
      fenestraMaterialo.emissiveIntensity = 0o15/0o40 + pulso;
    }
  }
}

// komenciFlugon — Komencu la flugan animacion de la sxipo supren.
export function komenciFlugon(ship: Krasesxagxo,
  onProgress: ( pct: number ) => void,
  onComplete: () => void
): () => void {
  const dauxro = 0o40/0o10;
  const komencaTempo = performance.now() / 0o1740;
  const komencaY = ship.group.position.y;
  const celaY = komencaY + 0o110;
  let nuligita = false;

  function tiktako() {
    if ( nuligita ) { ship.group.position.y = komencaY; return; }
    const pasinta = performance.now() / 0o1740 - komencaTempo;
    const t = Math.min(1, pasinta / dauxro);
    const mildigita = t < 0o4/0o10 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    ship.group.position.y = komencaY + ( celaY - komencaY ) * mildigita;
    ship.group.rotation.y += 0o3/0o100;
    onProgress(mildigita);

    if ( t < 1 ) {
      requestAnimationFrame(tiktako);
    } else {
      onComplete();
      ship.group.position.y = komencaY;
    }
  }

  requestAnimationFrame(tiktako);
  return () => { nuligita = true; };
}
