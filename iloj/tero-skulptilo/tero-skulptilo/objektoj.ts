// ≺⧼ ឧបករណ៍វត្ថុ 🎯 ⧽≻
import * as THREE from "three";
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { MONDO_HALFO, REZ } from "./mezuroj.js";
import { pentri } from "./bako.js";
import { akvaNiveloDe } from "./akvo.js";
import { triaDimensia, teraMesh, objektaGrupo3D, YTROIGO,
  gxisdatigi3DMeshon, gxisdatigi3DnIlon } from "./vido3d.js";
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
import { elemento, elementoj, unua } from "../../komunajxoj/dom.js";
import type { MetitaObjekto } from "../../../kantaoj/mondo/urbo/tipoj.js";

// ⟪ វត្ថុដែលបានដាក់ 📃 ⟫
export let objektoj: MetitaObjekto[] = [];
export let objektaModo = false;
export let objektaIlo = "meti";
export let objektaTrenata = -1;
export let objektoAktiva = "betulo";
export let elektitaObjekto = -1;
const objektoProp: Record<string, number> = { skalo: 1, rotacio: 0, bestospeco: 0, radio: 4, vesto: 0, harstilo: 0, filikaSpeco: 0, stilo: 0 };
const OBJEKTO_SPECOJ: Record<string, { nomo: string; koloro: string }> = {
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

// ⟪ ឆាកដុត 2D របស់វត្ថុ 📃 ⟫
export let objektaGrupo2D: THREE.Group | null = null;
let objektaBakaSceno: THREE.Scene | null = null;
let objektaBakaFotilo: THREE.OrthographicCamera | null = null;
let objektaBakaRenderilo: THREE.WebGLRenderer | null = null;
export let objektaBakaKanvaso: HTMLCanvasElement | null = null;

// ⟪ ការភ្ជាប់ជាមួយកម្មវិធីកែសម្រួល 📃 ⟫
interface ObjektaLigo {
  deltoInterp: ( x: number, z: number ) => number;
  maskoInterp: ( x: number, z: number ) => number;
  vidSkalo: () => number;
  N: number;
  PASO: number;
  X0: number;
  Z0: number;
  ORA_MATERIALO: THREE.MeshStandardMaterial;
  ENIRA_MATERIALO: THREE.MeshStandardMaterial;
  dioritaMaterialo: () => THREE.MeshStandardMaterial;
  momenti: () => void;
  statuso: ( teksto: string ) => void;
  markiSxangxitan: () => void;
  markiDesegnon: () => void;
  gxisdatigiPenikaron: () => void;
  sxaltiIlTabon: ( tabo: string ) => void;
  gxisdatigiAgordojn: () => void;
  gxisdatigiKursoro: () => void;
}
let deltoInterp: ( x: number, z: number ) => number;
let maskoInterp: ( x: number, z: number ) => number;
let vidSkalo: () => number;
let N: number;
let PASO: number;
let X0: number;
let Z0: number;
let ORA_MATERIALO: THREE.MeshStandardMaterial;
let ENIRA_MATERIALO: THREE.MeshStandardMaterial;
let dioritaMaterialo: () => THREE.MeshStandardMaterial;
let momenti: () => void;
let statuso: ( teksto: string ) => void;
let markiSxangxitan: () => void;
let markiDesegnon: () => void;
let gxisdatigiPenikaron: () => void;
let sxaltiIlTabon: ( tabo: string ) => void;
let gxisdatigiAgordojn: () => void;
let gxisdatigiKursoro: () => void;

/* agordiObjektilon គឺការភ្ជាប់តែម្តងជាមួយឯកសារមេ។
    @param k ( ObjektaLigo ) - ការយោងរបស់ឯកសារមេ។ */
export function agordiObjektilon(k: ObjektaLigo): void {
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

// ⟪ អនុគមន៍កំណត់ 📃 ⟫
/* ជំនួសបញ្ជីវត្ថុដែលបានដាក់ទាំងមូល ( ការផ្ទុក ការត្រឡប់វិញ )។
    @param listo ( MetitaObjekto[] ) - បញ្ជីថ្មី។ */
export function agordiObjektojn(listo: MetitaObjekto[]): void { objektoj = Array.isArray(listo) ? listo : []; }
/* ជ្រើសវត្ថុពីបញ្ជី ( -1 = គ្មាន )។
    @param ind ( number ) - លិបិក្រម។ */
export function agordiElektitanObjekton(ind: number): void { elektitaObjekto = ind; }

// ⟪ ឧបករណ៍វត្ថុ 🎯 ⟫
const agordojPanel = elemento<HTMLElement>("agordojPanel");
export const objektoPanel = elemento<HTMLElement>("objektoPanel");
const objektoSpeco = elemento<HTMLSelectElement>("objektoSpeco");
const objektoPropOJ = elemento<HTMLElement>("objektoPropOJ");
const objektoListo = elemento<HTMLElement>("objektoListo");
const koordinatajEl = elemento<HTMLElement>("koordinatoj");
const objektaXEnigo = elemento<HTMLInputElement>("objektaX");
const objektaZEnigo = elemento<HTMLInputElement>("objektaZ");
const objektaMetuBtn = elemento<HTMLButtonElement>("objektaMetu");

/* កូអរដោនេពិភពលោកផ្ទាល់របស់ទ្រនិច ( x, z និងកម្ពស់ដី y ) ដើម្បី
   ឱ្យគេឃើញកន្លែងដែលកំពុងដាក់។
    @param x ( number | null ) - ពិភពលោក x របស់ទ្រនិច។
    @param z ( number | null ) - ពិភពលោក z របស់ទ្រនិច។ */
export function gxisdatigiKoordinatojn(x: number | null, z: number | null): void {
  if ( !koordinatajEl ) return;
  if ( x === null || z === null ) { koordinatajEl.textContent = "—"; return; }
  const h = bazaAlteco(x, z) + deltoInterp(x, z);
  const akva = maskoInterp(x, z) >= 0o1/0o2;
  koordinatajEl.textContent = "x " + x.toFixed(2) + "   z " + z.toFixed(2)
    + "   y " + h.toFixed(2) + ( akva ? "   ( akvo )" : "" );
}

/* ដាក់វត្ថុដែលជ្រើសនៅទីតាំងនោះ ( ជាប់ 0.25 ) ជាមួយលក្ខណៈ
   បច្ចុប្បន្ន។ បញ្ជី និងចំណុច 3D ត្រូវបានធ្វើឱ្យស្រស់ភ្លាមៗ។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។ */
export function metiObjekton(x: number, z: number): void {
  if ( Math.abs(x) > MONDO_HALFO || Math.abs(z) > MONDO_HALFO ) return;
  momenti();
  const o: MetitaObjekto = { x: Math.round(x * 4) / 4, z: Math.round(z * 4) / 4, speco: objektoAktiva };
  const ecoj = o as unknown as Record<string, number>;
  for ( const k of Object.keys(objektoProp) ) ecoj[k] = objektoProp[k];
  if ( o.speco === "kanuo" ) o.stilo = objektoProp.stilo === 1 ? "satala" : "baza";
  objektoj.push(o);
  markiSxangxitan();
  statuso("Nesavitaj ŝanĝoj");
  gxisdatigiObjektoListon();
  rekonstruiObjektojn();
  markiDesegnon();
}

/* លិបិក្រមវត្ថុដែលបានដាក់ជិតបំផុតនៅក្នុងកាំជ្រើស
   ( 8 ភិចសែលអេក្រង់នៅការពង្រីកបច្ចុប្បន្ន ) ឬ -1។ ការចុចលើផែនទីក្នុងឧបករណ៍វត្ថុ
   ជ្រើសវត្ថុជិតបំផុត ជំនួសការដាក់ថ្មី។
    @param wx ( number ) - ពិភពលោក x របស់ការចុច។
    @param wz ( number ) - ពិភពលោក z របស់ការចុច។
@returns លិបិក្រម ឬ -1 ( number )។ */
export function objektoCxePunkto(wx: number, wz: number): number {
  const disto = Math.max(0o5/0o2, 8 / vidSkalo());
  let plej = -1, plejDisto = disto;
  for ( let i = 0; i < objektoj.length; i++ ) {
    const o = objektoj[i];
    const d = Math.hypot(o.x - wx, o.z - wz);
    if ( d < plejDisto ) { plejDisto = d; plej = i; }
  }
  return plej;
}

/* លុបវត្ថុតាមលិបិក្រម ( បញ្ជី ផែនទី និងទិដ្ឋភាព 3D
   ត្រូវបានធ្វើឱ្យស្រស់ ហើយការលុបអាចត្រឡប់វិញបាន )។
    @param i ( number ) - លិបិក្រមក្នុងបញ្ជី។ */
export function forigiObjekton(i: number): void {
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

/* ប្រអប់បញ្ចូល x/z តាមជម្រើស។ ពេលជ្រើសវត្ថុ ពួកវាបង្ហាញកូអរដោនេ
   របស់វា ហើយប៊ូតុងផ្លាស់ទីវា បើមិនដូច្នេះប៊ូតុងដាក់វត្ថុថ្មី
   នៅកូអរដោនេដែលបានវាយ។ */
export function sxargiObjektajnEnigojn(): void {
  if ( !objektaXEnigo ) return;
  if ( elektitaObjekto >= 0 && elektitaObjekto < objektoj.length ) {
    const o = objektoj[elektitaObjekto];
    objektaXEnigo.value = String(o.x);
    objektaZEnigo.value = String(o.z);
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

elementoj<HTMLButtonElement>("#objektaIloj button").forEach(b => {
  b.addEventListener("click", () => {
    objektaIlo = b.dataset.objektaIlo ?? "meti";
    elementoj<HTMLButtonElement>("#objektaIloj button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
objektoSpeco.addEventListener("change", () => {
  objektoAktiva = objektoSpeco.value;
  gxisdatigiObjektoPropOJn();
  rekonstruiObjektanAntauxrigardon();
  markiDesegnon();
});
/* ចាប់វត្ថុសម្រាប់ Movu ✋ ( ការផ្លាស់ទីអាចត្រឡប់វិញបាន ព្រោះប្រវត្តិ
   កត់ត្រាស្ថានភាពនៅពេលចាប់ )។
    @param ind ( number ) - លិបិក្រមរបស់វត្ថុ។
    @param x ( number ) - ពិភពលោក x របស់ការចុច។
    @param z ( number ) - ពិភពលោក z របស់ការចុច។ */
export function komenciObjektanTrenon(ind: number, x: number, z: number): void {
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
/* ធ្វើឱ្យស្រស់ទីតាំងរបស់វត្ថុពេល Movu ✋ ( ជាប់នឹង 0.25 )
   ដោយសាងសង់រូបរាង 3D ឡើងវិញ។
    @param ind ( number ) - លិបិក្រមរបស់វត្ថុ។
    @param x ( number ) - ពិភពលោក x របស់ទ្រនិច។
    @param z ( number ) - ពិភពលោក z របស់ទ្រនិច។ */
export function sxangiObjektanPozicion(ind: number, x: number, z: number): void {
  const o = objektoj[ind];
  o.x = Math.round(x * 4) / 4;
  o.z = Math.round(z * 4) / 4;
  rekonstruiObjektojn();
  markiDesegnon();
}
export function finiObjektanTrenon(): void {
  if ( objektaTrenata < 0 ) return;
  objektaTrenata = -1;
  gxisdatigiObjektoListon();
  sxargiObjektajnEnigojn();
  markiDesegnon();
}

const OBJEKTO_KONSTRUAJXOJ: Record<string, number> = { sanktejo: 1, turo: 1, domo: 1, mangxejo: 1, kasafeo: 1, stacio: 1 };

interface KonstruOpcioj {
  alto?: ( x: number, z: number ) => number;
  sxipaAlto?: number;
}
/* សាងសង់រូបរាង 3D ពិតរបស់វត្ថុដែលបានដាក់មួយ ហើយបន្ថែមវាទៅ
   ក្រុម។
    @param grupo ( THREE.Object3D ) - គោលដៅ ( ក្រុម 2D ក្រុម 3D ឬ
        ការមើលជាមុន )។
    @param o ( MetitaObjekto ) - វត្ថុដែលបានដាក់។
    @param opcioj ( KonstruOpcioj = {} ) - ការជំនួសកម្ពស់។ */
function konstruiObjektonEn(grupo: THREE.Object3D, o: MetitaObjekto, opcioj: KonstruOpcioj = {}): void {
  const temp = new THREE.Scene();
  const h = opcioj.alto ? opcioj.alto : ( x: number, z: number ) => ( bazaAlteco(x, z) + deltoInterp(x, z) ) * YTROIGO;
  const sxipaAlto = opcioj.sxipaAlto !== undefined ? opcioj.sxipaAlto : 0o40 * YTROIGO;
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
    const i = Math.max(0, Math.min(N - 1, Math.floor(( o.x - X0 ) / PASO)));
    const j = Math.max(0, Math.min(N - 1, Math.floor(( o.z - Z0 ) / PASO)));
    const niv = akvaNiveloDe(i, j, o.x, o.z);
    const kanoto = kreiKanoton(temp, o.x, o.z, o.rotacio ?? 0, ORA_MATERIALO,
      niv === null ? h(o.x, o.z) : niv * YTROIGO, o.stilo === "satala" ? "satala" : "baza");
    kanoto.group.position.set(o.x, niv === null ? h(o.x, o.z) : niv * YTROIGO, o.z);
    kanoto.group.rotation.y = o.rotacio ?? 0;
  } else if ( o.speco === "spacosxipo" ) {
    konstruiKrasesxagxon(temp, o.x, sxipaAlto, o.z, ORA_MATERIALO, ENIRA_MATERIALO);
  } else if ( OBJEKTO_KONSTRUAJXOJ[o.speco] ) {
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
    if ( o.speco === "hxeuxfoPlato" ) {
      konstruiPeriferiajnPlatformojn(temp, [ [ o.x, o.z ] ], h, dioritaMaterialo(), kreiAndezitanMaterialon());
      konstruiHxeuxfojn(temp, [ { x: o.x, z: o.z, y: h(o.x, o.z) + 0o4/0o10 - 0o1/0o40, rotacio: o.rotacio ?? Math.PI / 4 } ], dioritaMaterialo(), ORA_MATERIALO);
    } else {
      konstruiHxeuxfojn(temp, [ { x: o.x, z: o.z, y: h(o.x, o.z), rotacio: o.rotacio ?? Math.PI / 4 } ], dioritaMaterialo(), ORA_MATERIALO);
    }
  } else if ( o.speco === "keuxfhxeso" ) {
    konstruiKeuxfhxeso(temp, [ { x: o.x, z: o.z, rot: o.rotacio ?? 0 } ], h, ORA_MATERIALO);
  }
  while ( temp.children.length ) grupo.add(temp.children[0]);
}

function kreiObjektanBakon() {
  if ( objektaBakaRenderilo ) return;
  objektaBakaRenderilo = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  objektaBakaRenderilo.setSize(1024, 1024);
  objektaBakaRenderilo.setClearColor(0x000000, 0);
  objektaBakaFotilo = new THREE.OrthographicCamera(-MONDO_HALFO, MONDO_HALFO, MONDO_HALFO, -MONDO_HALFO, 1, 0o600);
  objektaBakaFotilo.up.set(0, 0, 1);
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

export function rekonstruiObjektojn(): void {
  if ( objektoj.length > 0 ) kreiObjektanBakon();
  if ( objektaGrupo2D && objektaBakaRenderilo && objektaBakaSceno && objektaBakaFotilo ) {
    while ( objektaGrupo2D.children.length ) objektaGrupo2D.remove(objektaGrupo2D.children[0]);
    for ( const o of objektoj ) konstruiObjektonEn(objektaGrupo2D, o);
    objektaBakaRenderilo.render(objektaBakaSceno, objektaBakaFotilo);
  }
  if ( objektaGrupo3D ) {
    while ( objektaGrupo3D.children.length ) objektaGrupo3D.remove(objektaGrupo3D.children[0]);
    for ( const o of objektoj ) konstruiObjektonEn(objektaGrupo3D, o);
  }
}

// ⟨ ការមើលជាមុនរបស់វត្ថុ 📃 ⟩
const objektaAntauxrigardo = elemento<HTMLCanvasElement>("objektaAntauxrigardo");
export let objektaAntauxRenderilo: THREE.WebGLRenderer | null = null;
export let objektaAntauxSceno: THREE.Scene | null = null;
export let objektaAntauxFotilo: THREE.PerspectiveCamera | null = null;
export let objektaAntauxGrupo: THREE.Group | null = null;
function kreiObjektanAntauxrigardon(): void {
  if ( objektaAntauxRenderilo ) return;
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
export function rekonstruiObjektanAntauxrigardon(): void {
  kreiObjektanAntauxrigardon();
  if ( !objektaAntauxGrupo || !objektaAntauxFotilo ) return;
  while ( objektaAntauxGrupo.children.length ) objektaAntauxGrupo.remove(objektaAntauxGrupo.children[0]);
  objektaAntauxGrupo.position.set(0, 0, 0);
  objektaAntauxGrupo.rotation.set(0, 0, 0);
  const o = { x: 0, z: 0, speco: objektoAktiva, skalo: objektoProp.skalo,
    rotacio: objektoProp.rotacio, bestospeco: objektoProp.bestospeco, radio: objektoProp.radio,
    vesto: objektoProp.vesto, harstilo: objektoProp.harstilo, filikaSpeco: objektoProp.filikaSpeco,
    stilo: objektoProp.stilo === 1 ? "satala" : "baza" };
  konstruiObjektonEn(objektaAntauxGrupo, o, { alto: () => 0, sxipaAlto: 0o10 });
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

export function gxisdatigiObjektoListon(): void {
  objektoListo.innerHTML = "";
  if ( objektoj.length === 0 ) {
    const malplena = document.createElement("p");
    malplena.className = "kefhuruq";
    malplena.textContent = "Neniu objekto — klaku sur la mapon por meti.";
    objektoListo.append(malplena);
    return;
  }
  objektoj.forEach(( o, i ) => {
    const vico = document.createElement("sabosuc2w2q");
    const speco = OBJEKTO_SPECOJ[o.speco];
    const nomo = speco ? speco.nomo : o.speco;
    const butono = document.createElement("button");
    butono.textContent = nomo + "  ( " + o.x.toFixed(2) + ", " + o.z.toFixed(2) + " )";
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

export function gxisdatigiObjektoPropOJn(): void {
  const s = objektoAktiva;
  let html = "";
  const glitilo = ( nomo: string, klavo: string, min: number, max: number, paso: number, sufikso: string ): string => {
    const v = objektoProp[klavo];
    return "<label> " + nomo + " <span id=\"propVal_" + klavo + "\"></span>" + ( sufikso || "" )
      + "<input type=\"range\" data-prop=\"" + klavo + "\" min=\"" + min + "\" max=\"" + max
      + "\" step=\"" + paso + "\" value=\"" + v + "\"></label>";
  };
  const elektilo = ( nomo: string, klavo: string, opcioj: string[] ): string => {
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
    html += glitilo("Rotacio", "rotacio", 0, 6.283, 0o1/0o20, " rad");
  } else if ( s === "filiko" ) {
    html += elektilo("Koloro", "filikaSpeco", [ "Verda", "Purpura" ]);
  } else if ( s === "kanuo" ) {
    html += glitilo("Rotacio", "rotacio", -3.2, 3.2, 0o1/0o20, " rad");
    html += elektilo("Stilo", "stilo", OBJEKTO_KANUAJ_STILOJ);
  } else if ( OBJEKTO_KONSTRUAJXOJ[s] || s === "hxeuxfo" || s === "hxeuxfoPlato" || s === "keuxfhxeso" ) {
    html += glitilo("Rotacio", "rotacio", 0, 6.283, 0o1/0o20, " rad");
  }
  objektoPropOJ.innerHTML = html;
  elementoj<HTMLInputElement | HTMLSelectElement>("input[data-prop], select[data-prop]", objektoPropOJ).forEach(el => {
    el.addEventListener("input", () => {
      objektoProp[el.dataset.prop ?? ""] = +el.value;
      gxisdatigiPropValorojn();
    });
    el.addEventListener("change", () => {
      objektoProp[el.dataset.prop ?? ""] = +el.value;
      gxisdatigiPropValorojn();
      rekonstruiObjektanAntauxrigardon();
    });
  });
  gxisdatigiPropValorojn();
}
function gxisdatigiPropValorojn(): void {
  elementoj<HTMLInputElement>("input[type=range]", objektoPropOJ).forEach(el => {
    const sp = unua<HTMLElement>("#propVal_" + String(el.dataset.prop));
    if ( sp ) sp.textContent = ( +el.value ).toFixed(2);
  });
}

/* បើកឧបករណ៍វត្ថុ ( ផ្ទាំង Objektoj 🎯 )។
    @param on ( boolean ) - តើរបៀបត្រូវបើកឬទេ។ */
export function sxaltiObjektojn(on: boolean): void {
  objektaModo = on;
  gxisdatigiPenikaron();
  if ( on ) sxaltiIlTabon("objektoj");
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
