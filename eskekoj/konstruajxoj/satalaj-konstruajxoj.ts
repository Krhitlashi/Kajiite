// ≺⧼ Satalaj konstruaĵoj 🏛️ ⧽≻
// Sxtupajramidaj konstruajxoj. verdaj/oraj domoj (kapuo), brunaj/becxaj mangxejoj
// (kahxjenko), becxaj kasafeoj (kunvenoĉambroj) kun oraj pilieroj.
// La zigurato nomigxas satal ( j͑ʃᴜ ɭʃᴜͷ̗ ) en Iikrhia. noma formo. satalo.
import * as THREE from "three";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";
import { kreiOranMaterialon, kreiPordanMaterialon } from "../komunajxoj/materialoj.js";
import { kreiRondigitanRektangulanFormon } from "../komunajxoj/formoj.js";
import { aldoniManĝtablon, LIGNA_KOLORO } from "../mebloj/tabloj.js";
import { aldoniEnirejon } from "./satalaj/enirejo.js";
import { aldoniPilolFenestron, fenestraMargxeno, fenestraMaterialo } from "./satalaj/fenestroj.js";
import { kreiKlinoTavolon, MURA_KLINO } from "./satalaj/formoj.js";
import { aldoniDiamantanSpegulon, aldoniTavolanRandon } from "./satalaj/ornamoj.js";
import { aldoniKadranTubon } from "./satalaj/pilieroj.js";
import { konstruajxaMaterialo, TIPARO, type KonstruSpec } from "./satalaj/tipoj.js";
import { aldoniSteleanSignon } from "./satalaj/vitro.js";

// konstruiSatalon — Konstruu sxton-sxtupan piramidon (satalon) el specifaj tieroj kaj sub-teroj.
//     @param spec ( KonstruSpec ) - Konstruajxa specifo kun grandeco, tipo, nombro da tieroj.
//     @param sceno ( THREE.Scene ) - Sceno al kiu aldoni la konstruajxon.
//     @param selektajxoj ( THREE.Mesh[] ) - Listo de muso-selektajxoj por aldoni la murojn.
// ⟨ Kaŝmemoro de la tavolaj geometrioj 📃 ⟩ — la mur-tavoloj kaj la oraj framoj
// dependas NUR de ( tipo, tavoloj, larĝo, profundo, tavol-alto ). La krado havas
// dekojn da IDENTAJ konstruaĵoj, do ili dividas la saman kunfanditan geometrion
// anstataŭ resxovi la tutan tavolan buklon por ĉiu kopio — la plej peza parto de
// la urba konstruado. La geometrio estas nur LEGATA poste ( la kunfando kaj la
// spegulo klonas ĝin ), do la dividado estas sekura.
const tavolajKashmemoroj = new Map<string, { muroj: THREE.BufferGeometry; kadroj: THREE.BufferGeometry }>();
function tavolajGeometrioj(w: number, d: number, tiers: number, tieroAlto: number, estasStacio: boolean): { muroj: THREE.BufferGeometry; kadroj: THREE.BufferGeometry } {
  const supraLargho = estasStacio ? w * 0o5/0o10 : Math.max(0o215/0o100, w * 0o23/0o100);
  const supraProfundo = estasStacio ? d * 0o5/0o10 : Math.max(0o20/0o10, d * 0o23/0o100);
  const malpliiX = ( w / 2 - supraLargho / 2 ) / Math.max(1, tiers - 1);
  const malpliiZ = ( d / 2 - supraProfundo / 2 ) / Math.max(1, tiers - 1);
  const klino = MURA_KLINO;
  const murajGeometrioj: THREE.BufferGeometry[] = [], kadrajGeometrioj: THREE.BufferGeometry[] = [];
  for ( let i = 0; i < tiers; i++ ) {
    const hw = w / 2 - i * malpliiX, hd = d / 2 - i * malpliiZ, y = i * tieroAlto;
    const tavolo = kreiKlinoTavolon(hw, hd, hw - klino, hd - klino, tieroAlto);
    tavolo.translate(0, y + tieroAlto / 2, 0); murajGeometrioj.push(tavolo);
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) aldoniKadranTubon(kadrajGeometrioj, sX * hw, sZ * hd, y, y + tieroAlto, sX, sZ, true, klino);
    aldoniTavolanRandon(kadrajGeometrioj, hw, hd, y, klino, tieroAlto);
  }
  return { muroj: kunfandiGeometriojn(murajGeometrioj), kadroj: kunfandiGeometriojn(kadrajGeometrioj) };
}
function preniTavolajnGeometriojn(typeKey: string, w: number, d: number, tiers: number, tieroAlto: number): { muroj: THREE.BufferGeometry; kadroj: THREE.BufferGeometry } {
  const klavo = typeKey + "|" + tiers + "|" + w + "|" + d + "|" + tieroAlto;
  let g = tavolajKashmemoroj.get(klavo);
  if ( !g ) {
    g = tavolajGeometrioj(w, d, tiers, tieroAlto, typeKey === "stacioxipo");
    tavolajKashmemoroj.set(klavo, g);
  }
  return g;
}
export function konstruiSatalon(spec: KonstruSpec, sceno: THREE.Scene, selektajxoj: THREE.Mesh[]): THREE.Group {
  const { niveloj: tiers, tieroAlto, w, d, type: typeKey, name } = spec;
  const sube = spec.sube || 0;
  // Kaj la kosmopordo kaj la generalaj stacioj havas pli similajn tavolojn
  // (pli milda deklivo, malpli granda interspaco inter etagxoj).
  const estasStacio = typeKey === "stacioxipo";
  const supraLargho = estasStacio ? w * 0o5/0o10 : Math.max(0o215/0o100, w * 0o23/0o100);
  const supraProfundo = estasStacio ? d * 0o5/0o10 : Math.max(0o20/0o10, d * 0o23/0o100);
  const malpliiX = ( w / 2 - supraLargho / 2 ) / Math.max(1, tiers - 1), malpliiZ = ( d / 2 - supraProfundo / 2 ) / Math.max(1, tiers - 1);
  const T = TIPARO[typeKey] || TIPARO.domo;
  const muraKoloro = T.wall, kadraKoloro = T.frame;
  // Klinitaj muroj. cxiu tavolo estas trapezoida (supro pli mallargxa ol bazo).
  const klino = MURA_KLINO;
  // La kunfanditaj mur- kaj fram-geometrioj venas el la kaŝmemoro ( muroj +
  // kadroj ) — identaj konstruaĵoj dividas ilin.
  const tavolaj = preniTavolajnGeometriojn(typeKey, w, d, tiers, tieroAlto);
  // NENIUJ sub-teraj muroj/pilieroj por la ekstera konstruajxo — la sub-teraj
  // niveloj estas konstruataj nur de la interno ( eniriInternon konstruas siajn
  // proprajn murojn/plankojn por ĉiu sub-tera etaĝo laux spec.sube ). Entombigita
  // ekstera strukturo aperus kiel duobla konstruajxo ene de la sub-teraj ĉambroj.
  // spec.sube/tieroAltoSub restas en la spec, por ke la interno povu kongrui.

  const group = new THREE.Group();
  // La konstruajxaj materialoj estas KOMUNAJ — po ( tipo, koloro ) cacheitaj
  // je la modulo-nivelo. Antaŭe ĉiu el la ĉirkaŭ kvardek konstruaĵoj kreis siajn
  // proprajn murajn/kadrajn/enirajn materialojn — la sama malgranda aro da
  // ( koloro, roughness ) kombinaĵoj ripete. La materialoj ne estas mutaciataj
  // poste ( la koloroj estas fiksitaj laŭ tipo ), do la dividado estas sekura.
  const muraMaterialo = konstruajxaMaterialo("muro" + muraKoloro + ( typeKey === "kasafeo" ? "k" : "" ),
    () => new THREE.MeshStandardMaterial({ color: muraKoloro, roughness: typeKey === "kasafeo" ? 0o41/0o100 : 0o3/0o4, metalness: 0, envMapIntensity: 0 }));
  const kadraMaterialo = konstruajxaMaterialo("kadro" + kadraKoloro,
    () => kreiOranMaterialon(kadraKoloro));
  // ⟨ La pordo uzas la MURON mem 📃 ⟩ La folio ricevas kopion de la mura
  // materialo kun malheleigita koloro ( kreiPordanMaterialon faras tion ), do la
  // pordo havas la saman surfacon kiel sia muro, kun ĝia roughness, ĝia metalness
  // kaj eĉ ĝiaj teksajxoj, kaj la mura koloro restas rekonebla. La cache-ŝlosilo
  // inkluzivas la koloron, do la materialoj restas dividitaj inter la
  // konstruaĵoj de la sama muro-koloro.
  //
  // ⟨ La VITRAJ pordoj 📃 ⟩ — la kunvenejo ( kasafeo ) kaj la stacidomo
  // ( stacioxipo ) ricevas la VITRON de iliaj propraj fenestraj vicoj anstataŭ
  // muran koloron, same kiel la kosmoŝipo ( kiu havas sian propran vitran eniran
  // materialon en scena.ts ). Temas pri la sama triopo, kiu jam portas la LONGAn
  // pilol-fenestran vicon — do la tri vitro-plenaj konstruaĵoj de la mondo ankaŭ
  // havas vitrajn pordojn, dum la ŝtonaj domoj, turoj kaj sanktejoj restas kun
  // siaj mur-koloraj pordoj.
  const vitraPordo = typeKey === "kasafeo" || typeKey === "stacioxipo";
  const eniraMaterialo = vitraPordo
    ? fenestraMaterialo()
    : konstruajxaMaterialo("eniro" + muraKoloro, () => kreiPordanMaterialon(muraMaterialo));

  const muroj = new THREE.Mesh(tavolaj.muroj, muraMaterialo);
  muroj.castShadow = muroj.receiveShadow = true;
  muroj.userData = { spec, buildingType: T };
  selektajxoj.push(muroj);
  group.add(muroj);
  group.add(new THREE.Mesh(tavolaj.kadroj, kadraMaterialo));

  // Uniforma enirejo por cxiuj tipoj — reuzebla komponanto. La sanktejo ricevas
  // pordojn sur CXIUJ kvar flankoj ( turnitaj kopioj de la sama pordo ).
  // La centra konstruajxo ( sanktejo ) ricevas la nagxetojn ce siaj pordoj — la
  // triangulaj platoj, kiuj levigxas de la baza plato al la porda kadro.
  aldoniEnirejon(group, d, kadraMaterialo, eniraMaterialo,
    typeKey === "sanktejo" ? 4 : 1, tieroAlto, typeKey === "sanktejo");

  if ( typeKey === "sanktejo" ) {
    const pintajxo = new THREE.Mesh(new THREE.ConeGeometry(supraLargho * 0o43/0o100, 0o63/0o40, 4).rotateY(Math.PI / 4), kadraMaterialo);
    pintajxo.position.y = tiers * tieroAlto + 0o63/0o100; pintajxo.castShadow = true; group.add(pintajxo);
  }

  if ( typeKey === "stacioxipo" ) {
    // Kosmoporda stacio. blanka lancx-aprono cxirkaux la bazo kun oraj kvadrataj
    // bendoj SUR la aprono. La aprono estas 0o3/0o40 alta je y=0o1/0o100, do gxia supro
    // estas je 0o1/0o20 — la oraj bendoj sidas je y=0o7/0o100 (0o1/0o100 libero super la
    // apron-supro), alie iliaj facoj koincidus kun la aprono kaj flagretus
    // (z-fighting).
    // Rondigita lancx-aprono. kvadrata formo kun rondigitaj anguloj, 0o3/0o40 alta.
    // La ekstrudo kusxas plata (rotaciita X), do la dikeco farigxas vertikala.
    const apronFormo = kreiRondigitanRektangulanFormon(w + 4, d + 4, 0o10/0o10);
    const apronGeo = new THREE.ExtrudeGeometry(apronFormo, { depth: 0o3/0o40, bevelEnabled: false, curveSegments: 0o10 });
    apronGeo.rotateX(-Math.PI / 2);
    apronGeo.translate(0, -0o1/0o40, 0);
    const apron = new THREE.Mesh(apronGeo, muraMaterialo);
    apron.receiveShadow = true; group.add(apron);
    for ( const sZ of [ -1, 1 ] ) {
      const b1 = new THREE.BoxGeometry(w + 4, 0o1/0o20, 0o5/0o20); b1.translate(0, 0o7/0o100, sZ * ( d / 2 + 0o4/0o10 )); group.add(new THREE.Mesh(b1, kadraMaterialo));
    }
    for ( const sX of [ -1, 1 ] ) {
      const b2 = new THREE.BoxGeometry(0o5/0o20, 0o1/0o20, d + 4); b2.translate(sX * ( w / 2 + 0o4/0o10 ), 0o7/0o100, 0); group.add(new THREE.Mesh(b2, kadraMaterialo));
    }
    // Kvar lancx-pilieroj cxe la apronaj anguloj kun brilaj pintoj.
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      const piliero = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o10, 0o3/0o20, 0o7/0o4, 6), kadraMaterialo);
      piliero.position.set(sX * ( w / 2 + 0o15/0o10 ), 0o7/0o10, sZ * ( d / 2 + 0o15/0o10 )); piliero.castShadow = true; group.add(piliero);
      const brilo = new THREE.Mesh(new THREE.SphereGeometry(0o5/0o40, 0o10, 0o6), eniraMaterialo);
      brilo.position.set(sX * ( w / 2 + 0o15/0o10 ), 0o7/0o4 + 0o5/0o40, sZ * ( d / 2 + 0o15/0o10 )); group.add(brilo);
    }
    // Malgranda ora lancx-ringo sur la tegmento, sub la sxipo.
    const roofY = tiers * tieroAlto;
    const ringo = new THREE.Mesh(new THREE.RingGeometry(0o15/0o20, 0o23/0o20, 0o40).rotateX(-Math.PI / 2), kadraMaterialo);
    ringo.position.y = roofY + 0o1/0o40; group.add(ringo);
  }

  // ⟨ La eksteraj fenestroj sur ĈIUJ kvar flankoj 📃 ⟩ — la sama LONGA
  // pilol-fenestra vico kiel la kosmosxipo ( kiun oni vidas fluganta super la
  // stacidomo ): unu fenestro po faco po tavolo.
  // ⟨ La regulo 📃 ⟩ — fenestro sur ĉiu faco de ĉiu tavolo, KROM kie estas
  // pordo: la fronta faco ( f = 0, +z ) de la teretaĝo havas la enirejon, kaj la
  // sanktejo havas pordon sur ĉiu el la kvar flankoj de sia teretaĝo. La tavolaj
  // muroj kliniĝas, sed la sama `klino` regas ĉiujn konstruaĵojn, do la sama
  // helpilo metu la fenestrojn.
  //
  // ⟨ NENIAJ eksteraj fenestroj — la domoj, la mangxejoj, la turoj kaj la
  // sanktejo 📃 ⟩ — tiuj kvar tipoj estas SOLIDAJ de la strato: la tavolaj muroj
  // portas nur la muron kaj la oran framon. La INTERNA fenestro ( aldoniLongan-
  // fenestron en internoj.ts ) restas, do la loĝanto vidas eksteren tra sia
  // propria fenestro dum la pasanto vidas nur muron — la unudirekta vitro de la
  // realaj urboj.
  // ⟨ La sanktejo 📃 ⟩ — ĝi perdis sian eksteran vicon lastmomente laux peto de
  // uzanto. Ĝi estas la CENTRA konstruajxo ( la kerno de la krado ), kaj ĝia
  // fasado montras la oran signon kaj la muron; la blanka fenestr-vico de la
  // stacidomo kaj de la kosmosxipo restas la sola luma vico de la urbo.
  // ⟨ La kunvenejo ( kasafeo ) 📃 ⟩ — nur ĝi kaj la stacidomo montras sian
  // internon al la strato: la kunvenejo estas publika halo, kaj la stacidomo mem
  // estas spegulo de la kosmosxipa fenestr-vico. La loĝejoj, la restoracioj, la
  // altaj turoj kaj nun ankaŭ la sanktejo estas privataj/funkciaj — iliaj
  // fasadoj montras muron kaj la oran signon, ne la internon.
  const senEksterajFenestroj = typeKey === "domo" || typeKey === "mangxejo"
    || typeKey === "turo" || typeKey === "sanktejo";
  if ( !senEksterajFenestroj ) {
    const fenAlto = Math.min(0o5/0o10, tieroAlto * 0o23/0o100);
    const vitro = fenestraMaterialo();
    // ⟨ UNU marĝena nombro por la tuta konstruaĵo 📃 ⟩ La nombro estas kalkulita
    // unufoje ( fenestraMargxeno ) kaj ĉiuj tavoloj uzas ĝin TIEL, sen multipliko
    // aux divido per sia propra faco. La libera spaco ĉe la anguloj estas do la
    // sama nombro ĉien kaj ĝi VIDEBIAS. La fenestra alto ne ŝanĝiĝas, do la
    // fenestroj mallongiĝas precize per la sama kvanto, kiun mallongiĝas la tavoloj.
    const facoLarga = Math.min(w / 2, d / 2) - klino / 2;
    const fenMargxeno = fenestraMargxeno(facoLarga);
    for ( let i = 0; i < tiers; i++ ) {
      const hwT = w / 2 - i * malpliiX, hdT = d / 2 - i * malpliiZ;
      const faco = Math.min(hwT, hdT) - klino / 2;
      // ⟨ Tavolo tro mallarĝa 📃 ⟩ Se la sama marĝeno ne lasas lokon por
      // horizontala fenestro, la tavolo ricevas VERTIKALAN fenestron — la tavola
      // alto donas la longan mezuron. Nur se eĉ la mallonga mezuro ne enirus
      // ( la vitro kun la bendo ), la tavolo restas sen fenestro.
      const horizontala = faco * 2 - fenMargxeno * 2 >= fenAlto;
      if ( !horizontala && faco < fenAlto * 0o1/0o2 + 0o1/0o10 ) continue;
      const yC = i * tieroAlto + tieroAlto / 2;
      for ( let f = 0; f < 4; f++ ) {
        // Neniu fenestro sur la teretaĝa fronto — tie estas la pordo.
        if ( i === 0 && f === 0 ) continue;
        aldoniPilolFenestron(group, kadraMaterialo, vitro, f, yC, faco,
          klino, tieroAlto, fenAlto, false, horizontala ? fenMargxeno : undefined,
          !horizontala);
      }
    }
  }

  // Uniforma 3D stela signo por cxiuj konstruajxoj — reuzebla komponanto.
  aldoniSteleanSignon(group, name, typeKey, w, d);

  // Eksteraj tabloj — la SAMA tablo/segxo-aseto kiel la internaj mangxejo-
  // tabloj ( aldoniManĝtablon el la mebloj-modulo ), en la sama bruna ligna
  // koloro kiel la internaj tabloj. Nur la SOLAJ konstruajxoj ( la skulptitaj
  // objektoj ) ricevas ilin — la kvar-blokaj krado-konstruajxoj ( fixed
  // "kvar" ) staras tuj apud la vojo kaj la tabloj falus en gxin. Ili iras en
  // apartan grupon ALDONITAN POST la diamanta spegulo ( vidu sube ), por ke
  // la spegulo neniam reflektu ilin — la renversitaj kopioj elstaris el la
  // grundo sur la deklivoj.
  const eksterajTabloj = typeKey === "mangxejo" && spec.fixed !== "kvar" ? new THREE.Group() : null;
  if ( eksterajTabloj ) {
    const lignaMaterialo = konstruajxaMaterialo("ligno",
      () => new THREE.MeshStandardMaterial({ color: LIGNA_KOLORO, roughness: 0o41/0o100, metalness: 0o11/0o100 }));
    for ( let i = -1; i <= 1; i += 2 ) {
      const tx = i * 5, tz = d / 2 + 3;
      // La tablo kun la kvar benkoj cxirkaux gxi — la sama manĝa arangxo kiel
      // en la internaj mangxejoj ( aldoniManĝtablon el la mebloj-modulo ), kun
      // la sama ligna kaj ora rando ( kadraMaterialo ).
      aldoniManĝtablon(eksterajTabloj, tx, tz, 0, lignaMaterialo, kadraMaterialo);
    }
  }
  // Flankaj pordoj forigitaj laux peto de uzanto
  // Stacia platformo forigita laux peto de uzanto
  // La ora bazplato restas nur sur la sanktejo ( la speciala centra konstruajxo )
  // — la normalaj konstruajxoj ( domo/turo/mangxejo/kasafeo ) ne havas gxin.
  if ( sube > 0 && typeKey === "sanktejo" ) {
    // Rondigita ora bazplato — kvadrata kadro kun RONDIGITAJ anguloj cxirkaux la
    // piedo de la konstruajxo ( la malnovaj kvar rektaj stangoj formis akrajn
    // angulojn ).
    // ⟨ La bazo estas PLI PLATA 📃 ⟩ — la antaŭa plato altis 0.297 kaj estis
    // centrita je 0.094, do gxi elstaris 0.24 super la grundo kiel sojlo. Nun gxi
    // estas 0.125 alta kaj kusxas SUR la grundo ( de 0 gxis 0.125 ), do la tuta
    // bazajxo legigxas kiel plata oro-bordita plato, ne kiel stupo.
    const kadroW = w + 0o72/0o100, kadroD = d + 0o72/0o100;  // ekstera rando je d/2 + 0o35/0o100
    const dikeco = 0o1/0o2;                                  // 0.5 — sama kiel la malnova stango
    // 0.5 — modesta rondigo. la kadra angulo atingas la diagonalajn angulpilierojn
    // ( la malnova 1.0 fortrancxis la kadron sub la pilieroj ).
    const rAnguloj = 0o1/0o2;
    const platoAlto = 0o1/0o10;                              // 0.125 — plata
    const kadroFormo = kreiRondigitanRektangulanFormon(kadroW, kadroD, rAnguloj);
    // La ena truo estas la sama rondigita kvadrato, pli malgranda je la dikeco,
    // kun la MALA ( CW ) ventumilo — kiel la porda truo en internoj.ts, por ke
    // Earcut rekonu gxin kiel truon ( neniu normaligo en triangulateShape ).
    const ena = kreiRondigitanRektangulanFormon(
      kadroW - dikeco * 2, kadroD - dikeco * 2, Math.max(0o1/0o20, rAnguloj - dikeco)
).getPoints(0o40);
    kadroFormo.holes.push(new THREE.Path(ena.reverse()));
    const kadroGeo = new THREE.ExtrudeGeometry(kadroFormo, { depth: platoAlto, bevelEnabled: false, curveSegments: 0o40 });
    // Plata ( rotaciita X ) — la dikeco farigxas vertikala, kaj la plato kusxas
    // rekte sur la grundo ( gxia bazo je y = 0 ).
    kadroGeo.rotateX(-Math.PI / 2);
    group.add(new THREE.Mesh(kadroGeo, kadraMaterialo));
  }

  group.position.set(spec.x, spec.h0 || 0, spec.z);
  group.rotation.y = spec.rot;
  sceno.add(group);
  if ( spec.diamond ) aldoniDiamantanSpegulon(sceno, spec, group, w);
  // La tabloj post la spegulo — la spegulo klonas la grupon ĝis nun, do la
  // tabloj restas unuflankaj ( nenia renversita kopio sub la grundo ).
  if ( eksterajTabloj ) group.add(eksterajTabloj);
  return group;
}
