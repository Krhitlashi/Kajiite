// ≺⧼ La objekta ilo 🎯 ⧽≻
// La objekta ilo — APARTA de la penikoj. gxi metas INDIVIDUajn objektojn
// ( plantojn, bestojn, NPC-ojn ) cxe precizaj pozicioj kun ecoj, anstataŭ
// pentri tavolon. La stato ( la metitaj objektoj, la elektita, la sub-ilo ),
// la 2D-bake-sceno ( la suprajna vido por la mapo ) kaj la 3D-antaŭrigardo
// logxas cxi tie; la cefa dosiero legas la staton rekte ( la vivaj ligoj de
// ES-moduloj ) kaj sxangxas gxin per la agord-funkcioj. La VERAJ 3D-meshxoj
// de la metitaj objektoj sidas en la sceno ( objektaGrupo3D — vido3d.js ).
import * as THREE from "three";
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { MONDO_HALFO, REZ } from "./mezuroj.js";
import { pentri } from "./bako.js";
import { akvaNiveloDe } from "./akvo.js";
import { triaDimensia, teraMesh, objektaGrupo3D, YTROIGO,
  gxisdatigi3DMeshon, gxisdatigi3DnIlon } from "./vido3d.js";
// La realaj konstruantoj de la ludo — la objekta ilo konstruas la VERAN
// aspekton de cxiu metita objekto, ne kolorajn kestojn.
import { konstruiSatalon } from "../../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { konstruiHxeuxfojn } from "../../../eskekoj/konstruajxoj/hxeuxfa/lampoj.js";
import { konstruiKeuxfhxeso } from "../../../eskekoj/mebloj/keuxfhxeso.js";
import { konstruiKrasesxagxon } from "../../../eskekoj/konstruajxoj/krasesxagxa-kosmosxipo.js";
import { konstruiArbaron } from "../../../eskekoj/shalaj-specioj/vegetajxo/betuloj/arbaro.js";
import { konstruiLarikon } from "../../../eskekoj/shalaj-specioj/vegetajxo/larikoj.js";
import { konstruiHxsxaksxlefojn } from "../../../eskekoj/shalaj-specioj/vegetajxo/hxsxaksxlefo.js";
import { konstruiPussxlefojn } from "../../../eskekoj/shalaj-specioj/vegetajxo/pussxlefo.js";
import { konstruiMetitanRokon } from "../../../eskekoj/shalaj-specioj/vegetajxo/rokoj.js";
import { konstruiMetitanFilikon } from "../../../eskekoj/shalaj-specioj/vegetajxo/filikoj.js";
import { konstruiMetitanBeston, konstruiMetitanPetrelon } from "../../../eskekoj/shalaj-specioj/bestoj.js";
import { konstruiFiguron } from "../../../eskekoj/shalaj-specioj/homoj.js";
import { kreiKanoton } from "../../../eskekoj/medio/transporto.js";
import { konstruiPeriferiajnPlatformojn } from "../../../eskekoj/medio/vojoj/periferio.js";
import { kreiAndezitanMaterialon } from "../../../eskekoj/komunajxoj/materialoj.js";
import { VESTOJ } from "../../../eskekoj/vestaro/vestoj.js";

// ⟪ La metitaj objektoj 📃 ⟫ — la objekta ilo ( APARTA de la penikoj ) metas
// individuajn objektojn ( plantojn, bestojn, NPC-ojn ) cxe precizaj pozicioj
// kun ecoj.
export let objektoj = [];               // { x, z, speco, skalo?, rotacio?, bestospeco?, radio?, vesto?, harstilo?, filikaSpeco? }
export let objektaModo = false;         // ĉu la objekta ilo estas aktiva ( anstataŭ peniko )
export let objektaIlo = "meti";         // la sub-ilo de la objekta ilo. meti ➕ / movigi ✋ / forigi 🗑️
export let objektaTrenata = -1;         // indekso de la trenata objekto ( Movu ✋ )
export let objektoAktiva = "betulo";    // la elektita speco
export let elektitaObjekto = -1;        // indekso en la listo ( reliefigo sur la mapo )
const objektoProp = { skalo: 1, rotacio: 0, bestospeco: 0, radio: 4, vesto: 0, harstilo: 0, filikaSpeco: 0, stilo: 0 };
const OBJEKTO_SPECOJ = {
  betulo:       { nomo: "Betulo 🌳",     koloro: "#a8d8a8" },
  lariko:       { nomo: "Lariko 🌲",     koloro: "#68a868" },
  hxsxaksxlefo: { nomo: "Ĥŝakŝlefo 🥬", koloro: "#b880d0" },
  pussxlefo:    { nomo: "Pussxlefo 🌱",  koloro: "#d8b0e8" },
  roko:         { nomo: "Roko 🪨",       koloro: "#a0a0a0" },
  filiko:       { nomo: "Filiko 🌿",     koloro: "#70c870" },
  akvabesto:    { nomo: "Akva besto 🐟", koloro: "#80d0e8" },
  petrelo:      { nomo: "Petrelo 🕊️",   koloro: "#e8e8e8" },
  npco:         { nomo: "NPC 🧍",        koloro: "#e0b070" },
  sanktejo:     { nomo: "Sanktejo 🛕",   koloro: "#184038" },
  turo:         { nomo: "Turo 🏢",       koloro: "#205040" },
  domo:         { nomo: "Domo 🏠",       koloro: "#184838" },
  mangxejo:     { nomo: "Manĝejo 🍽️",   koloro: "#584028" },
  kasafeo:      { nomo: "Kasafeo 🏛️",   koloro: "#d8c898" },
  stacio:       { nomo: "Stacio 🚀",     koloro: "#c8c8c8" },
  hxeuxfo:      { nomo: "Lampo 🏮",      koloro: "#d8b068" },
  hxeuxfoPlato: { nomo: "Lampo kun plato 🏮", koloro: "#b8c8c8" },
  keuxfhxeso:   { nomo: "Keŭfĥeso ⭐",   koloro: "#60a0b8" },
  kanuo:        { nomo: "Kanuo 🛶",      koloro: "#c8b890" },
  spacosxipo:   { nomo: "Spacosxipo 🚀", koloro: "#d8b068" },
};
const OBJEKTO_BESTOSPECOJ = [ "Beroe", "Mnemiopsis", "Pleŭrobrakia", "Glacifiso", "Marlaraksxo" ];
const OBJEKTO_VESTOJ = [ "Verdant", "Hearth", "Mist", "Ember", "Azure", "Violet", "Gilt", "Rose", "Obsidian", "Cyan" ];
const OBJEKTO_KANUAJ_STILOJ = [ "Baza", "Satala" ];

// ⟪ La objekta bake-sceno 2D 📃 ⟫ — la suprajna vido de la metitaj objektoj
// por la 2D-mapo, kiel la plena mapo de la ludo. La VERAJ 3D-meshxoj sidas en
// la sceno — tiu aspekto ( objektaGrupo3D ) kaj la tuta 3D-vido logxas en
// iloj/tero-skulptilo/tero-skulptilo/vido3d.js.
export let objektaGrupo2D = null;
let objektaBakaSceno = null;
let objektaBakaFotilo = null;
let objektaBakaRenderilo = null;
export let objektaBakaKanvaso = null;

// ⟪ La ligo kun la redaktilo 📃 ⟫ — la referencoj de la cefa dosiero, ligitaj
// unufoje per agordiObjektilon. La stato de la redaktilo ( la zomo, la
// historio, la statusa linio, la desegno ) kaj la komunaj materialoj pasas
// tiel. La zomo sxangxigxas dum la uzo, do gxi legigxas per FUNKCIO.
let deltoInterp, maskoInterp, vidSkalo, N, PASO, X0, Z0;
let ORA_MATERIALO, ENIRA_MATERIALO, dioritaMaterialo;
let momenti, statuso, markiSxangxitan, markiDesegnon;
let gxisdatigiPenikaron, sxaltiIlTabon, gxisdatigiAgordojn, gxisdatigiKursoro;

// agordiObjektilon — la unufoja kunligo kun la ĉefa dosiero.
//     @param k ( object ) - La referencoj de la ĉefa dosiero.
export function agordiObjektilon(k) {
  deltoInterp = k.deltoInterp; maskoInterp = k.maskoInterp;
  vidSkalo = k.vidSkalo;
  N = k.N; PASO = k.PASO; X0 = k.X0; Z0 = k.Z0;
  ORA_MATERIALO = k.ORA_MATERIALO; ENIRA_MATERIALO = k.ENIRA_MATERIALO;
  dioritaMaterialo = k.dioritaMaterialo;
  momenti = k.momenti; statuso = k.statuso;
  markiSxangxitan = k.markiSxangxitan; markiDesegnon = k.markiDesegnon;
  gxisdatigiPenikaron = k.gxisdatigiPenikaron; sxaltiIlTabon = k.sxaltiIlTabon;
  gxisdatigiAgordojn = k.gxisdatigiAgordojn; gxisdatigiKursoro = k.gxisdatigiKursoro;
}

// ⟪ La agord-funkcioj 📃 ⟫ — la solaj skriboj al la stato de la objektoj el
// la cefa dosiero. La listo kaj la elekto legigxas rekte; nur tiu, kiu
// anstatauxigas ilin ( sxargxo, malfaro ), uzas ĉi tiujn.
export function agordiObjektojn(listo) { objektoj = Array.isArray(listo) ? listo : []; }
export function agordiElektitanObjekton(ind) { elektitaObjekto = ind; }

// ════════════════════════ La objekta ilo 🎯 ════════════════════════
// La panelo montras la elektitan specon, la ecojn, la vivajn koordinatojn de
// la kursoro kaj la liston de metitaj objektoj. La objekta panelo kaj la
// agordoj estas du thala-kartoj, kiuj alternas.
const agordojPanel = document.getElementById("agordojPanel");
export const objektoPanel = document.getElementById("objektoPanel");
const objektoSpeco = document.getElementById("objektoSpeco");
const objektoPropOJ = document.getElementById("objektoPropOJ");
const objektoListo = document.getElementById("objektoListo");
const koordinatajEl = document.getElementById("koordinatoj");
const objektaXEnigo = document.getElementById("objektaX");
const objektaZEnigo = document.getElementById("objektaZ");
const objektaMetuBtn = document.getElementById("objektaMetu");

// gxisdatigiKoordinatojn — la vivaj mondaj koordinatoj de la kursoro ( x, z
// kaj la tera alto y ), por ke oni vidu, KIE oni metas.
export function gxisdatigiKoordinatojn(x, z) {
  if ( !koordinatajEl ) return;
  if ( x === null || z === null ) { koordinatajEl.textContent = "—"; return; }
  const h = bazaAlteco(x, z) + deltoInterp(x, z);
  const akva = maskoInterp(x, z) >= 0o1/0o2;
  koordinatajEl.textContent = "x " + x.toFixed(2) + "   z " + z.toFixed(2)
    + "   y " + h.toFixed(2) + ( akva ? "   ( akvo )" : "" );
}

// metiObjekton — metu la elektitan objekton cxe la pozicio ( 0.25-algluita )
// kun la nunaj ecoj. La listo kaj la 3D-punktoj gxisdatigxas tuj.
export function metiObjekton(x, z) {
  if ( Math.abs(x) > MONDO_HALFO || Math.abs(z) > MONDO_HALFO ) return;
  momenti();
  const o = { x: Math.round(x * 4) / 4, z: Math.round(z * 4) / 4, speco: objektoAktiva };
  for ( const k of Object.keys(objektoProp) ) o[k] = objektoProp[k];
  // La kanua stilo estas stringo en la datumaro ( "baza" | "satala" ),
  // la elektilo tenas indekson.
  if ( o.speco === "kanuo" ) o.stilo = objektoProp.stilo === 1 ? "satala" : "baza";
  objektoj.push(o);
  markiSxangxitan();
  statuso("Nesavitaj ŝanĝoj");
  gxisdatigiObjektoListon();
  rekonstruiObjektojn();
  markiDesegnon();
}

// objektoCxePunkto — la indekso de la plej proksima metita objekto ene de la
// elektada radiuso ( 8 ekranpikseloj je la nuna zomo ), aux -1. La mapklako
// en la objekta ilo ELEKTAS proksiman objekton anstataŭ meti novan.
export function objektoCxePunkto(wx, wz) {
  const disto = Math.max(0o5/0o2, 8 / vidSkalo());
  let plej = -1, plejDisto = disto;
  for ( let i = 0; i < objektoj.length; i++ ) {
    const o = objektoj[i];
    const d = Math.hypot(o.x - wx, o.z - wz);
    if ( d < plejDisto ) { plejDisto = d; plej = i; }
  }
  return plej;
}

// forigiObjekton — forigu la objekton je la indekso ( la listo, la mapo kaj
// la 3D-vido gxisdatigxas; la forigo estas malfarebla ).
export function forigiObjekton(i) {
  momenti();
  objektoj.splice(i, 1);
  if ( elektitaObjekto === i ) elektitaObjekto = -1;
  else if ( elektitaObjekto > i ) elektitaObjekto--;
  markiSxangxitan();
  statuso("Nesavitaj ŝanĝoj");
  gxisdatigiObjektoListon();
  sxargiObjektajnEnigojn();
  rekonstruiObjektojn();
  markiDesegnon();
}

// sxargiObjektajnEnigojn — la x/z-enigoj sekvas la elekton. elektinte
// objekton ili montras gxiajn koordinatojn kaj la butono movas gxin;
// alie la butono metas novan objekton cxe la tajpitaj koordinatoj.
export function sxargiObjektajnEnigojn() {
  if ( !objektaXEnigo ) return;
  if ( elektitaObjekto >= 0 && elektitaObjekto < objektoj.length ) {
    const o = objektoj[elektitaObjekto];
    objektaXEnigo.value = o.x;
    objektaZEnigo.value = o.z;
    objektaMetuBtn.textContent = "Movu elektitan ➡️";
  } else {
    objektaMetuBtn.textContent = "Meti ĉe koordinatoj ➕";
  }
}
objektaMetuBtn.addEventListener("click", () => {
  const x = parseFloat(objektaXEnigo.value);
  const z = parseFloat(objektaZEnigo.value);
  if ( !isFinite(x) || !isFinite(z) ) { statuso("Enigu nombrojn por x kaj z"); return; }
  if ( Math.abs(x) > MONDO_HALFO || Math.abs(z) > MONDO_HALFO ) {
    statuso("La koordinatoj estas ekster la mondo");
    return;
  }
  if ( elektitaObjekto >= 0 && elektitaObjekto < objektoj.length ) {
    // Movu la elektitan objekton al la tajpitaj koordinatoj.
    momenti();
    const o = objektoj[elektitaObjekto];
    o.x = Math.round(x * 4) / 4;
    o.z = Math.round(z * 4) / 4;
    markiSxangxitan();
    statuso("Objekto movita — nesavitaj ŝanĝoj");
    gxisdatigiObjektoListon();
    sxargiObjektajnEnigojn();
    rekonstruiObjektojn();
    markiDesegnon();
  } else {
    metiObjekton(x, z);
  }
});

// La sub-iloj de la objekta ilo — Meti ➕ ( klako metas aŭ elektas ), Movu ✋
// ( trenu por movi objekton sur la mapo ) kaj Forigi 🗑️ ( klako forigas ).
document.querySelectorAll("#objektaIloj button").forEach(b => {
  b.addEventListener("click", () => {
    objektaIlo = b.dataset.objektaIlo;
    document.querySelectorAll("#objektaIloj button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
// La speco-elektilo — elekti specon rekonstruas la ecojn kaj la antaŭrigardon.
objektoSpeco.addEventListener("change", () => {
  objektoAktiva = objektoSpeco.value;
  gxisdatigiObjektoPropOJn();
  rekonstruiObjektanAntauxrigardon();
  markiDesegnon();
});
// komenciObjektanTrenon — kaptu objekton por Movu ✋ ( la movo estas
// malfarebla — la historio momentigxas cxe la kapto ).
export function komenciObjektanTrenon(ind, x, z) {
  if ( objektaTrenata >= 0 ) return;
  momenti();
  objektaTrenata = ind;
  elektitaObjekto = ind;
  markiSxangxitan();
  statuso("Nesavitaj ŝanĝoj");
  gxisdatigiObjektoListon();
  sxargiObjektajnEnigojn();
  sxangiObjektanPozicion(ind, x, z);
}
// sxangiObjektanPozicion — gxisdatigu la pozicion de objekto dum Movu ✋
// ( algluita al 0.25 ), rekonstruante la 3D-aspektojn.
export function sxangiObjektanPozicion(ind, x, z) {
  const o = objektoj[ind];
  o.x = Math.round(x * 4) / 4;
  o.z = Math.round(z * 4) / 4;
  rekonstruiObjektojn();
  markiDesegnon();
}
export function finiObjektanTrenon() {
  if ( objektaTrenata < 0 ) return;
  objektaTrenata = -1;
  gxisdatigiObjektoListon();
  sxargiObjektajnEnigojn();
  markiDesegnon();
}

// La konstruajxaj objektoj ( la objekta ilo metas individuajn satalojn ) —
// la samaj specoj kiel la krada paletro.
const OBJEKTO_KONSTRUAJXOJ = { sanktejo: 1, turo: 1, domo: 1, mangxejo: 1, kasafeo: 1, stacio: 1 };

// konstruiObjektonEn — konstruu la VERAN 3D-aspekton de unu metita objekto
// ( la samaj konstruantoj kiel la ludo ) kaj aldonu gxin al la grupo. La
// konstruantoj aldonas al sceno, do temp-sceno kolektas la meshxojn, kiuj
// transigxas al la grupo. La tera alto estas la troigita 3D-alto ( YTROIGO ),
// por ke la objektoj sidu sur la reliefo de la 3D-vido. La opcio { alto }
// anstatauxigas la teran alton ( la antaŭrigardo uzas nulan alton ) kaj
// { sxipaAlto } la spacosxipan flug-alton ( la antaŭrigardo montras gxin pli
// proksime al la grundo, por ke gxi enkadrigxos).
function konstruiObjektonEn(grupo, o, opcioj) {
  const temp = new THREE.Scene();
  const h = opcioj && opcioj.alto ? opcioj.alto : ( x, z ) => ( bazaAlteco(x, z) + deltoInterp(x, z) ) * YTROIGO;
  const sxipaAlto = opcioj && opcioj.sxipaAlto !== undefined ? opcioj.sxipaAlto : 0o40 * YTROIGO;
  const s = o.skalo ?? 1;
  if ( o.speco === "betulo" ) konstruiArbaron(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.speco === "lariko" ) konstruiLarikon(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.speco === "hxsxaksxlefo" ) konstruiHxsxaksxlefojn(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.speco === "pussxlefo" ) konstruiPussxlefojn(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.speco === "roko" ) konstruiMetitanRokon(temp, o.x, o.z, h, s, o.rotacio ?? -1);
  else if ( o.speco === "filiko" ) konstruiMetitanFilikon(temp, o.x, o.z, h, s, o.filikaSpeco ?? 0);
  else if ( o.speco === "akvabesto" ) {
    const i = Math.max(0, Math.min(N - 1, Math.floor(( o.x - X0 ) / PASO)));
    const j = Math.max(0, Math.min(N - 1, Math.floor(( o.z - Z0 ) / PASO)));
    const niv = akvaNiveloDe(i, j, o.x, o.z);
    const b = konstruiMetitanBeston(temp, o.bestospeco ?? 0, o.x, o.z,
      niv === null ? h(o.x, o.z) : niv * YTROIGO, s);
    if ( b ) { temp.remove(b.grupo); grupo.add(b.grupo); }
  } else if ( o.speco === "petrelo" ) {
    const p = konstruiMetitanPetrelon(temp, o.x, o.z, h, o.radio ?? 4, s);
    if ( p ) { temp.remove(p.grupo); grupo.add(p.grupo); }
  } else if ( o.speco === "npco" ) {
    const fig = konstruiFiguron(VESTOJ[( o.vesto ?? 0 ) % VESTOJ.length],
      ( o.harstilo ?? 0 ) === 1 ? "haroLonga" : "haroMalalta");
    fig.group.position.set(o.x, h(o.x, o.z), o.z);
    fig.group.rotation.y = o.rotacio ?? 0;
    grupo.add(fig.group);
  } else if ( o.speco === "kanuo" ) {
    // La kanuo flosas sur la akvosurfaco ( la troigita nivelo en la 3D-vido ).
    const i = Math.max(0, Math.min(N - 1, Math.floor(( o.x - X0 ) / PASO)));
    const j = Math.max(0, Math.min(N - 1, Math.floor(( o.z - Z0 ) / PASO)));
    const niv = akvaNiveloDe(i, j, o.x, o.z);
    // kreiKanoton aldonas la grupon cxe la ORIGINO — la ludo pozicias gxin dum
    // la animacio ( animaciiKanoton ). La statika bake/3D-vido bezonas la
    // eksplicitan pozicion, alie CXIUJ kanuoj stakigxus cxe ( 0, 0 ).
    const kanoto = kreiKanoton(temp, o.x, o.z, o.rotacio ?? 0, ORA_MATERIALO,
      niv === null ? h(o.x, o.z) : niv * YTROIGO, o.stilo === "satala" ? "satala" : "baza");
    kanoto.group.position.set(o.x, niv === null ? h(o.x, o.z) : niv * YTROIGO, o.z);
    kanoto.group.rotation.y = o.rotacio ?? 0;
  } else if ( o.speco === "spacosxipo" ) {
    // La sxipo flosas alte super la stacio — la troigita alteco en la 3D-vido,
    // kaj la bake suprajn vido montras gxin sendepende de la alteco.
    konstruiKrasesxagxon(temp, o.x, sxipaAlto, o.z, ORA_MATERIALO, ENIRA_MATERIALO);
  } else if ( OBJEKTO_KONSTRUAJXOJ[o.speco] ) {
    // La individuaj konstruajxoj ( sataloj ) — la samaj specoj kiel la krada
    // paletro ( stacio kiel stacioxipo ), kun la samaj tavoloj kaj altoj kiel
    // en urbo.ts. La skalo multiplikas la piedon 8×8.
    const tipo = o.speco === "stacio" ? "stacioxipo" : o.speco;
    const niveloj = tipo === "stacioxipo" ? 3 : tipo === "sanktejo" ? 7 : tipo === "turo" ? 0o10 : 4;
    const spec = {
      x: o.x, z: o.z, type: tipo, name: "objekto",
      niveloj, w: 0o10 * s, d: 0o10 * s,
      tieroAlto: tipo === "stacioxipo" ? 0o155/0o40 : tipo === "turo" ? 0o30/0o10 : tipo === "kasafeo" ? 0o155/0o40 : 0o315/0o100,
      rot: o.rotacio ?? 0, diamond: true, h0: h(o.x, o.z),
      sube: tipo === "stacioxipo" ? 0 : niveloj, tieroAltoSub: 0o123/0o40,
    };
    konstruiSatalon(spec, temp, []);
  } else if ( o.speco === "hxeuxfo" || o.speco === "hxeuxfoPlato" ) {
    // La lampo — unu hxeuxfo sur la tero ( la samaj kolonoj/bovloj/flamoj kiel
    // la kradaj lampoj, kun la komuna diorita materialo ). La varianto
    // hxeuxfoPlato staras sur la rondigita diamanta plato ( la sama platformo
    // kiel la lampoj de la mapo — diorita centro kun andezita ringo ), do la
    // lampo ricevas la saman levitan bazon kiel la ludaj plat-lampoj.
    if ( o.speco === "hxeuxfoPlato" ) {
      konstruiPeriferiajnPlatformojn(temp, [ [ o.x, o.z ] ], h, dioritaMaterialo(), kreiAndezitanMaterialon());
      konstruiHxeuxfojn(temp, [ { x: o.x, z: o.z, y: h(o.x, o.z) + 0o4/0o10 - 0o1/0o40, rotacio: o.rotacio ?? Math.PI / 4 } ], dioritaMaterialo(), ORA_MATERIALO);
    } else {
      konstruiHxeuxfojn(temp, [ { x: o.x, z: o.z, y: h(o.x, o.z), rotacio: o.rotacio ?? Math.PI / 4 } ], dioritaMaterialo(), ORA_MATERIALO);
    }
  } else if ( o.speco === "keuxfhxeso" ) {
    // La keuxfhxeso — unu starfrukta strukturo kun ses oraj ripoj.
    konstruiKeuxfhxeso(temp, [ { x: o.x, z: o.z, rot: o.rotacio ?? 0 } ], h, ORA_MATERIALO);
  }
  while ( temp.children.length ) grupo.add(temp.children[0]);
}

// kreiObjektanBakon — la bake-renderilo por la 2D-mapo. Suprajn ortografia
// fotilo ( nordo supre, kiel la plena mapo de la ludo ) kun propra lumo,
// rendras la verajn meshxojn en travideblan kanvason ( objektaBakaKanvaso ).
function kreiObjektanBakon() {
  if ( objektaBakaRenderilo ) return;
  objektaBakaRenderilo = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  objektaBakaRenderilo.setSize(1024, 1024);
  objektaBakaRenderilo.setClearColor(0x000000, 0);
  objektaBakaFotilo = new THREE.OrthographicCamera(-MONDO_HALFO, MONDO_HALFO, MONDO_HALFO, -MONDO_HALFO, 1, 0o600);
  objektaBakaFotilo.up.set(0, 0, 1);   // nordo supre
  objektaBakaFotilo.position.set(0, 0o470, 0);
  objektaBakaFotilo.lookAt(0, 0, 0);
  objektaBakaSceno = new THREE.Scene();
  objektaBakaSceno.add(new THREE.HemisphereLight(0xb8d8e8, 0x384838, 0.9));
  const suno = new THREE.DirectionalLight(0xf8f0d8, 1.1);
  suno.position.set(-0o400, 0o470, 0o300);
  objektaBakaSceno.add(suno);
  objektaBakaSceno.add(new THREE.AmbientLight(0x404848, 0.4));
  objektaGrupo2D = new THREE.Group();
  objektaBakaSceno.add(objektaGrupo2D);
  objektaBakaKanvaso = objektaBakaRenderilo.domElement;
}

// rekonstruiObjektojn — rekonstruu la VERAJN 3D-meshxojn de cxiuj metitaj
// objektoj ( post meto, forigo, malfari/refari aux sxargxo ). la 2D-grupo
// bakigxas suprajn por la mapo, la 3D-grupo refresxigas la 3D-vidon.
export function rekonstruiObjektojn() {
  if ( objektoj.length > 0 ) kreiObjektanBakon();
  if ( objektaGrupo2D ) {
    while ( objektaGrupo2D.children.length ) objektaGrupo2D.remove(objektaGrupo2D.children[0]);
    for ( const o of objektoj ) konstruiObjektonEn(objektaGrupo2D, o);
    objektaBakaRenderilo.render(objektaBakaSceno, objektaBakaFotilo);
  }
  if ( objektaGrupo3D ) {
    while ( objektaGrupo3D.children.length ) objektaGrupo3D.remove(objektaGrupo3D.children[0]);
    for ( const o of objektoj ) konstruiObjektonEn(objektaGrupo3D, o);
  }
}

// ⟨ Objekta antaŭrigardo 📃 ⟩ — la 3D-antaŭrigardo, malgranda orbitanta vido
// de la elektita speco en la objekto-panelo. La SAMA konstruanto kiel la
// mapo/bake ( konstruiObjektonEn kun nula tera alto kaj la ŝipo pli proksime
// al la grundo ), centre enkadrigita kaj turniĝanta malrapide ĉiukadre.
const objektaAntauxrigardo = document.getElementById("objektaAntauxrigardo");
export let objektaAntauxRenderilo = null;
export let objektaAntauxSceno = null;
export let objektaAntauxFotilo = null;
export let objektaAntauxGrupo = null;
function kreiObjektanAntauxrigardon() {
  if ( objektaAntauxRenderilo || !objektaAntauxrigardo ) return;
  objektaAntauxRenderilo = new THREE.WebGLRenderer({ canvas: objektaAntauxrigardo, antialias: true, alpha: true });
  objektaAntauxRenderilo.setClearColor(0x000000, 0);
  objektaAntauxSceno = new THREE.Scene();
  objektaAntauxFotilo = new THREE.PerspectiveCamera(40, 1, 1, 500);
  objektaAntauxFotilo.position.set(16, 12, 16);
  objektaAntauxSceno.add(new THREE.HemisphereLight(0xc8e0f0, 0x404840, 1.0));
  const suno = new THREE.DirectionalLight(0xf8f0d8, 1.2);
  suno.position.set(-10, 20, 8);
  objektaAntauxSceno.add(suno);
  objektaAntauxSceno.add(new THREE.AmbientLight(0x505858, 0o1/0o2));
  objektaAntauxGrupo = new THREE.Group();
  objektaAntauxSceno.add(objektaAntauxGrupo);
}
// rekonstruiObjektanAntauxrigardon — konstruu la elektitan specon en la
// antaŭrigardon, centru ĝin kaj enkadrigu la fotilon.
export function rekonstruiObjektanAntauxrigardon() {
  kreiObjektanAntauxrigardon();
  if ( !objektaAntauxGrupo ) return;
  // Neniu forigo de la geometrioj/materialoj — la objektoj dividas la
  // komunajn materialojn ( ORA_MATERIALO ), kiel rekonstruiObjektojn faras.
  while ( objektaAntauxGrupo.children.length ) objektaAntauxGrupo.remove(objektaAntauxGrupo.children[0]);
  objektaAntauxGrupo.position.set(0, 0, 0);
  objektaAntauxGrupo.rotation.set(0, 0, 0);
  const o = { x: 0, z: 0, speco: objektoAktiva, skalo: objektoProp.skalo,
    rotacio: objektoProp.rotacio, bestospeco: objektoProp.bestospeco, radio: objektoProp.radio,
    vesto: objektoProp.vesto, harstilo: objektoProp.harstilo, filikaSpeco: objektoProp.filikaSpeco,
    stilo: objektoProp.stilo === 1 ? "satala" : "baza" };
  konstruiObjektonEn(objektaAntauxGrupo, o, { alto: () => 0, sxipaAlto: 0o10 });
  // Enkadrigu — la fotilo rigardas la keston de la objekto; la grupo
  // translokiĝas por ke la objekto turniĝu ĉirkaŭ sia propra centro.
  const kesto = new THREE.Box3().setFromObject(objektaAntauxGrupo);
  const grandeco = kesto.getSize(new THREE.Vector3()).length() || 0o10;
  const mezo = kesto.getCenter(new THREE.Vector3());
  objektaAntauxGrupo.position.sub(mezo);
  const disto = Math.max(0o14, grandeco * 0.9);
  objektaAntauxFotilo.near = Math.max(1, disto * 0o1/0o20);
  objektaAntauxFotilo.far = disto * 0o10 + 0o200;
  objektaAntauxFotilo.position.set(disto * 0.8, disto * 0.65, disto * 0.8);
  objektaAntauxFotilo.updateProjectionMatrix();
  objektaAntauxFotilo.lookAt(0, 0, 0);
}

// gxisdatigiObjektoListon — la listo de metitaj objektoj. elektu por
// reliefigi sur la mapo, forigu por forigi.
export function gxisdatigiObjektoListon() {
  objektoListo.innerHTML = "";
  if ( objektoj.length === 0 ) {
    const malplena = document.createElement("p");
    malplena.className = "kefhuruq";
    malplena.textContent = "Neniu objekto — klaku sur la mapon por meti.";
    objektoListo.append(malplena);
    return;
  }
  objektoj.forEach(( o, i ) => {
    // sabosuc2w2q — la tema horizontalo por butonoj ( kiel la traka vico de
    // la ludo ). la elekt-buteno kaj Forigi ✕ en unu vico.
    const vico = document.createElement("sabosuc2w2q");
    const speco = OBJEKTO_SPECOJ[o.speco];
    const nomo = speco ? speco.nomo : o.speco;
    const butono = document.createElement("button");
    butono.textContent = nomo + "  ( " + o.x.toFixed(2) + ", " + o.z.toFixed(2) + " )";
    // La elektita objekto montrigxas per la ekzistanta premata-stilo
    // ( button[aria-pressed=true] ) — neniu enlinia stilo.
    butono.setAttribute("aria-pressed", String(i === elektitaObjekto));
    butono.addEventListener("click", () => {
      elektitaObjekto = elektitaObjekto === i ? -1 : i;
      gxisdatigiObjektoListon();
      sxargiObjektajnEnigojn();
      markiDesegnon();
    });
    const forigi = document.createElement("button");
    forigi.textContent = "Forigi ✕";
    forigi.addEventListener("click", () => forigiObjekton(i));
    vico.append(butono, forigi);
    objektoListo.append(vico);
  });
}

// gxisdatigiObjektoPropOJn — la ecoj de la elektita speco ( skalo por cxiuj;
// rotacio/vesto/harstilo por NPC-oj; speco por akvaj bestoj; flugradiuso por
// petreloj ). Rekonstruita cxe speco-sxangxo.
export function gxisdatigiObjektoPropOJn() {
  const s = objektoAktiva;
  let html = "";
  const glitilo = ( nomo, klavo, min, max, paso, sufikso ) => {
    const v = objektoProp[klavo];
    return "<label> " + nomo + " <span id=\"propVal_" + klavo + "\"></span>" + ( sufikso || "" )
      + "<input type=\"range\" data-prop=\"" + klavo + "\" min=\"" + min + "\" max=\"" + max
      + "\" step=\"" + paso + "\" value=\"" + v + "\"></label>";
  };
  const elektilo = ( nomo, klavo, opcioj ) => {
    return "<label> " + nomo + " <select data-prop=\"" + klavo + "\">"
      + opcioj.map(( op, i ) => "<option value=\"" + i + "\"" + ( objektoProp[klavo] === i ? " selected" : "" ) + ">" + op + "</option>").join("")
      + "</select></label>";
  };
  html += glitilo("Skalo", "skalo", 0o1/0o4, 3, 0o1/0o20, "");
  if ( s === "npco" ) {
    html += glitilo("Rotacio", "rotacio", 0, 6.283, 0o1/0o20, " rad");
    html += elektilo("Vesto", "vesto", OBJEKTO_VESTOJ);
    html += elektilo("Harstilo", "harstilo", [ "Mallonga", "Longa" ]);
  } else if ( s === "akvabesto" ) {
    html += elektilo("Speco", "bestospeco", OBJEKTO_BESTOSPECOJ);
  } else if ( s === "petrelo" ) {
    html += glitilo("Flugradiuso", "radio", 1, 20, 0o1/0o2, " un");
  } else if ( s === "roko" ) {
    // La rokaj varioj — la grandeco kaj la turno ( la tono kaj la formo
    // hazardas cxe cxiu meto, kiel la montaraj rokoj ).
    html += glitilo("Rotacio", "rotacio", 0, 6.283, 0o1/0o20, " rad");
  } else if ( s === "filiko" ) {
    // La filika vario — verda aux purpura ( la purpuraj filikoj de la valo ).
    html += elektilo("Koloro", "filikaSpeco", [ "Verda", "Purpura" ]);
  } else if ( s === "kanuo" ) {
    // La kanua turno povas esti negativa ( la flosdirekto sur la rivero ).
    html += glitilo("Rotacio", "rotacio", -3.2, 3.2, 0o1/0o20, " rad");
    html += elektilo("Stilo", "stilo", OBJEKTO_KANUAJ_STILOJ);
  } else if ( OBJEKTO_KONSTRUAJXOJ[s] || s === "hxeuxfo" || s === "hxeuxfoPlato" || s === "keuxfhxeso" ) {
    // La konstruajxoj, la lampoj kaj la keuxfhxesoj turnigxas — la pordo / la
    // ripoj alfrontas la elektitan direkton.
    html += glitilo("Rotacio", "rotacio", 0, 6.283, 0o1/0o20, " rad");
  }
  // La spacosxipo havas neniun aldonan econ — gxi ĉiam flosas super la stacio.
  objektoPropOJ.innerHTML = html;
  objektoPropOJ.querySelectorAll("input[data-prop], select[data-prop]").forEach(el => {
    el.addEventListener("input", () => {
      objektoProp[el.dataset.prop] = +el.value;
      gxisdatigiPropValorojn();
    });
    el.addEventListener("change", () => {
      objektoProp[el.dataset.prop] = +el.value;
      gxisdatigiPropValorojn();
      // La antaŭrigardo sekvas la liberigitajn ecojn ( skalo, rotacio ).
      rekonstruiObjektanAntauxrigardon();
    });
  });
  gxisdatigiPropValorojn();
}
function gxisdatigiPropValorojn() {
  objektoPropOJ.querySelectorAll("input[type=range]").forEach(el => {
    const sp = document.getElementById("propVal_" + el.dataset.prop);
    if ( sp ) sp.textContent = ( +el.value ).toFixed(2);
  });
}

// sxaltiObjektojn — sxaltu la objektan ilon ( la langeto Objektoj 🎯 ). gxi
// malaktivigas la penikojn, montras la objekto-panelon en la suba karto kaj
// sxaltas la objekto-reĝimon ( la sub-ilo Meti ➕ / Movu ✋ / Forigi 🗑️ decidas
// la klakon ).
export function sxaltiObjektojn(on) {
  objektaModo = on;
  gxisdatigiPenikaron();
  if ( on ) sxaltiIlTabon("objektoj");
  // La objekto-panelo aperas NUR kiam la objekto-langeto estas sxaltita;
  // alie la agordoj montrigxas ( ambaŭ estas thala-kartoj — la temo donas
  // display.flex, do la montro estas eksplicita per la enlinia stilo ).
  objektoPanel.classList.toggle("kobe", !on);
  agordojPanel.classList.toggle("kobe", on);
  gxisdatigiAgordojn();
  gxisdatigiKursoro();
  gxisdatigi3DnIlon();
  if ( !on ) { gxisdatigiKoordinatojn(null, null); elektitaObjekto = -1; gxisdatigiObjektoListon(); }
  sxargiObjektajnEnigojn();
  pentri(0, 0, REZ - 1, REZ - 1);
  markiDesegnon();
  if ( triaDimensia && teraMesh ) gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
}
