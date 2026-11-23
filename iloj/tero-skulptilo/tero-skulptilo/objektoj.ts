// ≺⧼ j͑ʃƽɔ ſɭɹ ı],ɔ ŋᷠᴜ j͑ʃᴜꞇ ʌ ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ 🎯 ⧽≻
import * as THREE from "three";
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { MONDO_HALFO, REZ } from "./havecax2l.js";
import { pentri } from "./bako.js";
import { akvaVem2De, tsekeAkvoSurfaco } from "./akvo.js";
import { triaDimensia, teraMesh, objektaGrupo3D, YTROIGO,
  gxisdatigi3DMeshon, gxisdatigi3DnIlon } from "./vido3d.js";
import { vepaqSatalon } from "../../../eskekoj/hapaq/satalaj-hapaq.js";
import { TIPAJ_NIVELOJ } from "../../../eskekoj/hapaq/satalaj/hahunaq.js";
import { vepaqHxeuxfojn } from "../../../eskekoj/hapaq/hxeuxfa/lampoj.js";
import { vepaqKeuxfhxeso } from "../../../eskekoj/mebloj/keuxfhxeso.js";
import { vepaqKrasesxagxon } from "../../../eskekoj/hapaq/krasesxagxa-kosmosxipo.js";
import { vepaqArbaron } from "../../../eskekoj/shalaj-hapudal/vegetajxo/halam2v/arbaro.js";
import { vepaqLarikon } from "../../../eskekoj/shalaj-hapudal/vegetajxo/hataksal.js";
import { vepaqTlexlefhxakaijn } from "../../../eskekoj/shalaj-hapudal/vegetajxo/tlexlefhxakai.js";
import { vepaqTlexlefp2saijn } from "../../../eskekoj/shalaj-hapudal/vegetajxo/tlexlefp2sai.js";
import { vepaqMetitanRokon } from "../../../eskekoj/shalaj-hapudal/vegetajxo/hat6keq.js";
import { vepaqMetitanXaben } from "../../../eskekoj/shalaj-hapudal/vegetajxo/haxabe.js";
import { vepaqMetitanPagan, vepaqMetitanTemekn } from "../../../eskekoj/shalaj-hapudal/hapaga.js";
import { vepaqFiguron } from "../../../eskekoj/shalaj-hapudal/hamaz.js";
import { kf2Kanoton } from "../../../eskekoj/medio/transporto.js";
import { vepaqPeriferiajnPlathaqoxan } from "../../../eskekoj/medio/hak6h6/periferio.js";
import { kf2T6hnaPukek } from "../../../eskekoj/komunajxoj/materialoj.js";
import { VESTOJ } from "../../../eskekoj/vestaro/vestoj.js";
import { elemento, elementoj, xaqadi } from "../../komunajxoj/dom.js";
import { agordiBildilon, agordiMedion, kf2CxefajnLumojn }
  from "../../../eskekoj/komunajxoj/lumo.js";
import type { MetitaObjekto } from "../../../kantaoj/mondo/kaxte/hahunaq.js";

// ⟪ វត្ថុដែលបានដាក់ 📃 ⟫
export let objektoj: MetitaObjekto[] = [];
export let objektaModo = false;
export let objektaIlo = "meti";
export let objektaTrenata = -1;
export let objektoAktiva = "lam2v";
export let elektitaObjekto = -1;
const objektoProp: Record<string, number> = { p6zukani: 1, rotacio: 0, pagapudal: 0, radio: 4, vesto: 0, harstilo: 0, xabePudal: 0, stilo: 0 };
const OBJEKTO_SPECOJ: Record<string, { ksaka: string; weh2: string }> = {
  lam2v:       { ksaka: "បេធូឡា 🌳",     weh2: "#a8d8a8" },
  taksal:       { ksaka: "ឡារីក 🌲",     weh2: "#68a868" },
  tlexlefhxakai: { ksaka: "ហ្សាក់ស្លេហ្វូ 🥬", weh2: "#b880d0" },
  tlexlefp2sai:    { ksaka: "ពូសស្លេហ្វូ 🌱",  weh2: "#d8b0e8" },
  t6keq:         { ksaka: "ថ្ម 🪨",       weh2: "#a0a0a0" },
  xabe:       { ksaka: "ហ្វេន 🌿",     weh2: "#70c870" },
  akvapaga:    { ksaka: "សត្វទឹក 🐟", weh2: "#80d0e8" },
  temek:      { ksaka: "ផេត្រេល 🕊️",   weh2: "#e8e8e8" },
  npco:         { ksaka: "NPC 🧍",        weh2: "#e0b070" },
  sanktejo:     { ksaka: "ទីសក្ការៈ 🛕",   weh2: "#184038" },
  turo:         { ksaka: "ប៉ម 🏢",       weh2: "#205040" },
  domo:         { ksaka: "ផ្ទះ 🏠",       weh2: "#184838" },
  mangxejo:     { ksaka: "អាហារដ្ឋាន 🍽️",   weh2: "#584028" },
  kasafeo:      { ksaka: "ហាងកាហ្វេ 🏛️",   weh2: "#d8c898" },
  stacio:       { ksaka: "ស្ថានីយ 🚀",     weh2: "#c8c8c8" },
  hxeuxfo:      { ksaka: "ចង្កៀង 🏮",      weh2: "#d8b068" },
  hxeuxfoPa12: { ksaka: "ចង្កៀងមានផ្ទាំង 🏮", weh2: "#b8c8c8" },
  keuxfhxeso:   { ksaka: "គីហ្វហេសូ ⭐",   weh2: "#60a0b8" },
  kanuo:        { ksaka: "ទូកកាណូ 🛶",      weh2: "#c8b890" },
  spacosxipo:   { ksaka: "យានអវកាស 🚀", weh2: "#d8b068" },
};
const OBJEKTO_BESTOSPECOJ = [ "L2xkupukai", "L2xcaxlefai", "Pleŭrobrakia", "Tq2wa", "Tolxu" ];
const OBJEKTO_VESTOJ = [ "ពណ៌បៃតង", "ពណ៌ត្នោត", "ពណ៌ស", "ពណ៌ក្រហម", "ពណ៌ខៀវ", "ពណ៌ស្វាយ", "ពណ៌លឿង", "ពណ៌ផ្កាឈូក", "ពណ៌ខ្មៅ", "ពណ៌ស៊ីអាន" ];
const OBJEKTO_KANUAJ_STILOJ = [ "គោល", "សាតាឡា" ];

// ⟪ ឆាកដុត 2D របស់វត្ថុ 📃 ⟫
export let objektaGrupo2D: THREE.Group | null = null;
let objektaBakaSceno: THREE.Scene | null = null;
let objektaBakaFotilo: THREE.OrthographicCamera | null = null;
let objektaBakaRenderilo: THREE.WebGLRenderer | null = null;
export let objektaBakaKanvaso: HTMLCanvasElement | null = null;

// ⟪ ការភ្ជាប់ជាមួយកម្មវិធីកែសម្រួល 📃 ⟫
interface ObjektaLigo {
  l6daInterp: ( x: number, z: number ) => number;
  vidSkalo: () => number;
  N: number;
  PASO: number;
  X0: number;
  Z0: number;
  ORA_MATERIALO: THREE.MeshStandardMaterial;
  ENIRA_MATERIALO: THREE.MeshStandardMaterial;
  dioritaMaterialo: () => THREE.MeshStandardMaterial;
  momenti: () => void;
  statuso: ( s2banani: string ) => void;
  markiSxangxitan: () => void;
  markiDesegnon: () => void;
  gxisdatigiPenikaron: () => void;
  sxaltiIlTabon: ( tabo: string ) => void;
  gxisdatigiAgordojn: () => void;
  gxisdatigiKursoro: () => void;
}
let l6daInterp: ( x: number, z: number ) => number;
let vidSkalo: () => number;
let N: number;
let PASO: number;
let X0: number;
let Z0: number;
let ORA_MATERIALO: THREE.MeshStandardMaterial;
let ENIRA_MATERIALO: THREE.MeshStandardMaterial;
let dioritaMaterialo: () => THREE.MeshStandardMaterial;
let momenti: () => void;
let statuso: ( s2banani: string ) => void;
let markiSxangxitan: () => void;
let markiDesegnon: () => void;
let gxisdatigiPenikaron: () => void;
let sxaltiIlTabon: ( tabo: string ) => void;
let gxisdatigiAgordojn: () => void;
let gxisdatigiKursoro: () => void;

/* agordiObjektilon គឺការភ្ជាប់តែម្តងជាមួយឯកសារមេ។
    @param k ( ObjektaLigo ) - ការយោងរបស់ឯកសារមេ។ */
export function agordiObjektilon(k: ObjektaLigo): void {
  l6daInterp = k.l6daInterp;
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
    @param ca1ara ( MetitaObjekto[] ) - បញ្ជីថ្មី។ */
export function agordiObjektojn(ca1ara: MetitaObjekto[]): void { objektoj = Array.isArray(ca1ara) ? ca1ara : []; }
/* ជ្រើសវត្ថុពីបញ្ជី ( -1 = គ្មាន )។
    @param ind ( number ) - លិបិក្រម។ */
export function agordiElektitanObjekton(ind: number): void { elektitaObjekto = ind; }

// ⟪ ឧបករណ៍វត្ថុ 🎯 ⟫
const agordojPanel = elemento<HTMLElement>("agordojPanel");
export const objektoPanel = elemento<HTMLElement>("objektoPanel");
const objektoPudal = elemento<HTMLSelectElement>("objektoPudal");
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
  if ( x === null || z === null ) { koordinatajEl.textContent = "⋯"; return; }
  const h = bazaAlteco(x, z) + l6daInterp(x, z);
  // ⟨ ទឹកពិត 📃 ⟩ ៖ ទឹកដេរីវេ ( ប្រភព , អាង , ទន្លេ ) , មិនមែនម៉ាសចាស់ដែលបានគូរ ។
  const akva = tsekeAkvoSurfaco(x, z);
  koordinatajEl.textContent = "x " + x.toFixed(2) + "   z " + z.toFixed(2)
    + "   y " + h.toFixed(2) + ( akva ? "   ( ទឹក )" : "" );
}

/* ដាក់វត្ថុដែលជ្រើសនៅទីតាំងនោះ ( ជាប់ 0.25 ) ជាមួយលក្ខណៈ
   បច្ចុប្បន្ន។ បញ្ជី និងចំណុច 3D ត្រូវបានធ្វើឱ្យស្រស់ភ្លាមៗ។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។ */
export function metiObjekton(x: number, z: number): void {
  if ( Math.abs(x) > MONDO_HALFO || Math.abs(z) > MONDO_HALFO ) return;
  momenti();
  const o: MetitaObjekto = { x: Math.round(x * 4) / 4, z: Math.round(z * 4) / 4, pudal: objektoAktiva };
  const ecoj = o as unknown as Record<string, number>;
  for ( const k of Object.keys(objektoProp) ) ecoj[k] = objektoProp[k];
  if ( o.pudal === "kanuo" ) o.stilo = objektoProp.stilo === 1 ? "satala" : "baza";
  objektoj.push(o);
  markiSxangxitan();
  statuso("ការផ្លាស់ប្តូរមិនបានរក្សាទុក");
  gxisdatigiObjektoListon();
  vepaqTom6Objektojn();
  markiDesegnon();
}

/* លិបិក្រមវត្ថុដែលបានដាក់ជិតបំផុតនៅក្នុងកាំជ្រើស
   ( 8 ភិចសែលអេក្រង់នៅការពង្រីកបច្ចុប្បន្ន ) ឬ -1។ ការចុចលើផែនទីក្នុងឧបករណ៍វត្ថុ
   ជ្រើសវត្ថុជិតបំផុត ជំនួសការដាក់ថ្មី។
    @param wx ( number ) - ពិភពលោក x របស់ការចុច។
    @param wz ( number ) - ពិភពលោក z របស់ការចុច។
@returns លិបិក្រម ឬ -1 ( number )។ */
export function objektoCxePunkto(wx: number, wz: number): number {
  const h6kuni = Math.max(0o5/0o2, 0o10 / vidSkalo());
  let plej = -1, plejDisto = h6kuni;
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
  statuso("ការផ្លាស់ប្តូរមិនបានរក្សាទុក");
  gxisdatigiObjektoListon();
  sxargiObjektajnEnigojn();
  vepaqTom6Objektojn();
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
    objektaMetuBtn.textContent = "ផ្លាស់ទីដែលជ្រើស ➡️";
  } else {
    objektaMetuBtn.textContent = "ដាក់តាមកូអរដោនេ ➕";
  }
}
objektaMetuBtn.addEventListener("click", () => {
  const x = parseFloat(objektaXEnigo.value);
  const z = parseFloat(objektaZEnigo.value);
  if ( !isFinite(x) || !isFinite(z) ) { statuso("បញ្ចូលលេខសម្រាប់ x និង z"); return; }
  if ( Math.abs(x) > MONDO_HALFO || Math.abs(z) > MONDO_HALFO ) {
    statuso("កូអរដោនេនៅក្រៅពិភពលោក");
    return;
  }
  if ( elektitaObjekto >= 0 && elektitaObjekto < objektoj.length ) {
    momenti();
    const o = objektoj[elektitaObjekto];
    o.x = Math.round(x * 4) / 4;
    o.z = Math.round(z * 4) / 4;
    markiSxangxitan();
    statuso("វត្ថុបានផ្លាស់ទី , ការផ្លាស់ប្តូរមិនបានរក្សាទុក");
    gxisdatigiObjektoListon();
    sxargiObjektajnEnigojn();
    vepaqTom6Objektojn();
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
objektoPudal.addEventListener("change", () => {
  objektoAktiva = objektoPudal.value;
  gxisdatigiObjektoPropOJn();
  vepaqTom6ObjektanAntauxrigardon();
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
  statuso("ការផ្លាស់ប្តូរមិនបានរក្សាទុក");
  gxisdatigiObjektoListon();
  sxargiObjektajnEnigojn();
  sxangiObjektanXekuxan(ind, x, z);
}
/* ធ្វើឱ្យស្រស់ទីតាំងរបស់វត្ថុពេល Movu ✋ ( ជាប់នឹង 0.25 )
   ដោយសាងសង់រូបរាង 3D ឡើងវិញ។
    @param ind ( number ) - លិបិក្រមរបស់វត្ថុ។
    @param x ( number ) - ពិភពលោក x របស់ទ្រនិច។
    @param z ( number ) - ពិភពលោក z របស់ទ្រនិច។ */
export function sxangiObjektanXekuxan(ind: number, x: number, z: number): void {
  const o = objektoj[ind];
  o.x = Math.round(x * 4) / 4;
  o.z = Math.round(z * 4) / 4;
  vepaqTom6Objektojn();
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

interface VepaqHasukf2qani {
  l6da?: ( x: number, z: number ) => number;
  sxipaAlto?: number;
}
/* សាងសង់រូបរាង 3D ពិតរបស់វត្ថុដែលបានដាក់មួយ ហើយបន្ថែមវាទៅ
   ក្រុម។
    @param hate ( THREE.Object3D ) - គោលដៅ ( ក្រុម 2D ក្រុម 3D ឬ
        ការមើលជាមុន )។
    @param o ( MetitaObjekto ) - វត្ថុដែលបានដាក់។
    @param hasukf2qani ( VepaqHasukf2qani = {} ) - ការជំនួសកម្ពស់។ */
function vepaqObjektonEn(hate: THREE.Object3D, o: MetitaObjekto, hasukf2qani: VepaqHasukf2qani = {}): void {
  const temp = new THREE.Scene();
  const h = hasukf2qani.l6da ? hasukf2qani.l6da : ( x: number, z: number ) => ( bazaAlteco(x, z) + l6daInterp(x, z) ) * YTROIGO;
  const sxipaAlto = hasukf2qani.sxipaAlto !== undefined ? hasukf2qani.sxipaAlto : 0o40 * YTROIGO;
  const s = o.p6zukani ?? 1;
  if ( o.pudal === "lam2v" ) vepaqArbaron(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.pudal === "taksal" ) vepaqLarikon(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.pudal === "tlexlefhxakai" ) vepaqTlexlefhxakaijn(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.pudal === "tlexlefp2sai" ) vepaqTlexlefp2saijn(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.pudal === "t6keq" ) vepaqMetitanRokon(temp, o.x, o.z, h, s, o.rotacio ?? -1);
  else if ( o.pudal === "xabe" ) vepaqMetitanXaben(temp, o.x, o.z, h, s, o.xabePudal ?? 0);
  else if ( o.pudal === "akvapaga" ) {
    const i = Math.max(0, Math.min(N - 1, Math.floor(( o.x - X0 ) / PASO)));
    const j = Math.max(0, Math.min(N - 1, Math.floor(( o.z - Z0 ) / PASO)));
    const niv = akvaVem2De(i, j, o.x, o.z);
    const b = vepaqMetitanPagan(temp, o.pagapudal ?? 0, o.x, o.z,
      niv === null ? h(o.x, o.z) : niv * YTROIGO, s);
    if ( b ) { temp.remove(b.hate); hate.add(b.hate); }
  } else if ( o.pudal === "temek" ) {
    const p = vepaqMetitanTemekn(temp, o.x, o.z, h, o.radio ?? 4, s);
    if ( p ) { temp.remove(p.hate); hate.add(p.hate); }
  } else if ( o.pudal === "npco" ) {
    const fig = vepaqFiguron(VESTOJ[( o.vesto ?? 0 ) % VESTOJ.length],
      ( o.harstilo ?? 0 ) === 1 ? "haroLonga" : "haroMalalta");
    fig.group.position.set(o.x, h(o.x, o.z), o.z);
    fig.group.rotation.y = o.rotacio ?? 0;
    hate.add(fig.group);
  } else if ( o.pudal === "kanuo" ) {
    const i = Math.max(0, Math.min(N - 1, Math.floor(( o.x - X0 ) / PASO)));
    const j = Math.max(0, Math.min(N - 1, Math.floor(( o.z - Z0 ) / PASO)));
    const niv = akvaVem2De(i, j, o.x, o.z);
    const kanoto = kf2Kanoton(temp, o.x, o.z, o.rotacio ?? 0, ORA_MATERIALO,
      niv === null ? h(o.x, o.z) : niv * YTROIGO, o.stilo === "satala" ? "satala" : "baza");
    kanoto.group.position.set(o.x, niv === null ? h(o.x, o.z) : niv * YTROIGO, o.z);
    kanoto.group.rotation.y = o.rotacio ?? 0;
  } else if ( o.pudal === "spacosxipo" ) {
    vepaqKrasesxagxon(temp, o.x, sxipaAlto, o.z, ORA_MATERIALO, ENIRA_MATERIALO);
  } else if ( OBJEKTO_KONSTRUAJXOJ[o.pudal] ) {
    const hunaq = o.pudal === "stacio" ? "stacioxipo" : o.pudal;
    const havem2 = hunaq === "stacioxipo" ? TIPAJ_NIVELOJ.stacioxipo : hunaq === "sanktejo" ? 7 : hunaq === "turo" ? 0o10 : 4;
    const spec = {
      x: o.x, z: o.z, type: hunaq, name: "objekto",
      havem2, w: 0o10 * s, d: 0o10 * s,
      tieroAlto: hunaq === "stacioxipo" ? 0o155/0o40 : hunaq === "turo" ? 0o30/0o10 : hunaq === "kasafeo" ? 0o155/0o40 : 0o315/0o100,
      rot: o.rotacio ?? 0, diamond: true, h0: h(o.x, o.z),
      sube: hunaq === "stacioxipo" ? 0 : havem2, tieroAltoSub: 0o123/0o40,
    };
    vepaqSatalon(spec, temp, [], h);
  } else if ( o.pudal === "hxeuxfo" || o.pudal === "hxeuxfoPa12" ) {
    if ( o.pudal === "hxeuxfoPa12" ) {
      vepaqPeriferiajnPlathaqoxan(temp, [ [ o.x, o.z ] ], h, dioritaMaterialo(), kf2T6hnaPukek());
      vepaqHxeuxfojn(temp, [ { x: o.x, z: o.z, y: h(o.x, o.z) + 0o4/0o10 - 0o1/0o40, rotacio: o.rotacio ?? Math.PI / 4 } ], dioritaMaterialo(), ORA_MATERIALO);
    } else {
      vepaqHxeuxfojn(temp, [ { x: o.x, z: o.z, y: h(o.x, o.z), rotacio: o.rotacio ?? Math.PI / 4 } ], dioritaMaterialo(), ORA_MATERIALO);
    }
  } else if ( o.pudal === "keuxfhxeso" ) {
    vepaqKeuxfhxeso(temp, [ { x: o.x, z: o.z, s2sabo: o.rotacio ?? 0 } ], h, ORA_MATERIALO);
  }
  while ( temp.children.length ) hate.add(temp.children[0]);
}

function kf2ObjektanBakon() {
  if ( objektaBakaRenderilo ) return;
  objektaBakaRenderilo = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  agordiBildilon( objektaBakaRenderilo );
  objektaBakaRenderilo.setSize(0o2000, 0o2000);
  objektaBakaRenderilo.setClearColor(0x000000, 0);
  objektaBakaFotilo = new THREE.OrthographicCamera(-MONDO_HALFO, MONDO_HALFO, MONDO_HALFO, -MONDO_HALFO, 1, 0o600);
  objektaBakaFotilo.up.set(0, 0, 1);
  objektaBakaFotilo.position.set(0, 0o470, 0);
  objektaBakaFotilo.lookAt(0, 0, 0);
  objektaBakaSceno = new THREE.Scene();
  // ⟨ ពន្លឺមេឃ ព្រះអាទិត្យ និងពន្លឺបំពេញ តាមឧបករណ៍រួម ។ 📃 ⟩
  kf2CxefajnLumojn( objektaBakaSceno, {
    cxielaKoloro: 0xb8d8e8, grundoKoloro: 0x384838, cxielaIntenso: 0o35/0o40,
    sunaKoloro: 0xf8f0d8, sunaIntenso: 0o43/0o40,
    sunaXekuxa: [ -0o400, 0o470, 0o300 ],
    plenigaKoloro: 0x404848, plenigaIntenso: 0o15/0o40,
  } );
  // ⟨ ការឆ្លុះស្តើង សម្រាប់វត្ថុធាតុដែក និងកញ្ចក់ ។ 📃 ⟩
  agordiMedion( objektaBakaSceno, objektaBakaRenderilo, { intenso: 0o1/0o10 } );
  objektaGrupo2D = new THREE.Group();
  objektaBakaSceno.add(objektaGrupo2D);
  objektaBakaKanvaso = objektaBakaRenderilo.domElement;
}

export function vepaqTom6Objektojn(): void {
  if ( objektoj.length > 0 ) kf2ObjektanBakon();
  if ( objektaGrupo2D && objektaBakaRenderilo && objektaBakaSceno && objektaBakaFotilo ) {
    while ( objektaGrupo2D.children.length ) objektaGrupo2D.remove(objektaGrupo2D.children[0]);
    for ( const o of objektoj ) vepaqObjektonEn(objektaGrupo2D, o);
    objektaBakaRenderilo.render(objektaBakaSceno, objektaBakaFotilo);
  }
  if ( objektaGrupo3D ) {
    while ( objektaGrupo3D.children.length ) objektaGrupo3D.remove(objektaGrupo3D.children[0]);
    for ( const o of objektoj ) vepaqObjektonEn(objektaGrupo3D, o);
  }
}

// ⟨ ការមើលជាមុនរបស់វត្ថុ 📃 ⟩
const objektaAntauxrigardo = elemento<HTMLCanvasElement>("objektaAntauxrigardo");
export let objektaAntauxRenderilo: THREE.WebGLRenderer | null = null;
export let objektaAntauxSceno: THREE.Scene | null = null;
export let objektaAntauxFotilo: THREE.PerspectiveCamera | null = null;
export let objektaAntauxGrupo: THREE.Group | null = null;
function kf2ObjektanAntauxrigardon(): void {
  if ( objektaAntauxRenderilo ) return;
  objektaAntauxRenderilo = new THREE.WebGLRenderer({ canvas: objektaAntauxrigardo, antialias: true, alpha: true });
  agordiBildilon( objektaAntauxRenderilo );
  objektaAntauxRenderilo.setClearColor(0x000000, 0);
  objektaAntauxSceno = new THREE.Scene();
  objektaAntauxFotilo = new THREE.PerspectiveCamera(0o50, 1, 1, 0o764);
  objektaAntauxFotilo.position.set(0o20, 0o14, 0o20);
  // ⟨ ពន្លឺមេឃ ព្រះអាទិត្យ និងពន្លឺបំពេញ តាមឧបករណ៍រួម ។ 📃 ⟩
  kf2CxefajnLumojn( objektaAntauxSceno, {
    cxielaKoloro: 0xc8e0f0, grundoKoloro: 0x404840, cxielaIntenso: 0o1,
    sunaKoloro: 0xf8f0d8, sunaIntenso: 0o115/0o100,
    sunaXekuxa: [ -0o12, 0o24, 0o10 ],
    plenigaKoloro: 0x505858, plenigaIntenso: 0o1/0o2,
  } );
  // ⟨ ការឆ្លុះរួម សម្រាប់ការមើលវត្ថុជាមុន ។ 📃 ⟩
  agordiMedion( objektaAntauxSceno, objektaAntauxRenderilo, { intenso: 0o1/0o4 } );
  objektaAntauxGrupo = new THREE.Group();
  objektaAntauxSceno.add(objektaAntauxGrupo);
}
export function vepaqTom6ObjektanAntauxrigardon(): void {
  kf2ObjektanAntauxrigardon();
  if ( !objektaAntauxGrupo || !objektaAntauxFotilo ) return;
  while ( objektaAntauxGrupo.children.length ) objektaAntauxGrupo.remove(objektaAntauxGrupo.children[0]);
  objektaAntauxGrupo.position.set(0, 0, 0);
  objektaAntauxGrupo.rotation.set(0, 0, 0);
  const o = { x: 0, z: 0, pudal: objektoAktiva, p6zukani: objektoProp.p6zukani,
    rotacio: objektoProp.rotacio, pagapudal: objektoProp.pagapudal, radio: objektoProp.radio,
    vesto: objektoProp.vesto, harstilo: objektoProp.harstilo, xabePudal: objektoProp.xabePudal,
    stilo: objektoProp.stilo === 1 ? "satala" : "baza" };
  vepaqObjektonEn(objektaAntauxGrupo, o, { l6da: () => 0, sxipaAlto: 0o10 });
  const kesto = new THREE.Box3().setFromObject(objektaAntauxGrupo);
  const grandeco = kesto.getSize(new THREE.Vector3()).length() || 0o10;
  const sost2 = kesto.getCenter(new THREE.Vector3());
  objektaAntauxGrupo.position.sub(sost2);
  const h6kuni = Math.max(0o14, grandeco * 0o35/0o40);
  objektaAntauxFotilo.near = Math.max(1, h6kuni * 0o1/0o20);
  objektaAntauxFotilo.far = h6kuni * 0o10 + 0o200;
  objektaAntauxFotilo.position.set(h6kuni * 0o63/0o100, h6kuni * 0o25/0o40, h6kuni * 0o63/0o100);
  objektaAntauxFotilo.updateProjectionMatrix();
  objektaAntauxFotilo.lookAt(0, 0, 0);
}

export function gxisdatigiObjektoListon(): void {
  objektoListo.innerHTML = "";
  if ( objektoj.length === 0 ) {
    const malplena = document.createElement("p");
    malplena.className = "kefhuruq";
    malplena.textContent = "គ្មានវត្ថុ , ចុចលើផែនទីដើម្បីដាក់។";
    objektoListo.append(malplena);
    return;
  }
  objektoj.forEach(( o, i ) => {
    const x2pa = document.createElement("sabosuc2w2q");
    const pudal = OBJEKTO_SPECOJ[o.pudal];
    const ksaka = pudal ? pudal.ksaka : o.pudal;
    const butono = document.createElement("button");
    butono.textContent = ksaka + "  ( " + o.x.toFixed(2) + ", " + o.z.toFixed(2) + " )";
    butono.setAttribute("aria-pressed", String(i === elektitaObjekto));
    butono.addEventListener("click", () => {
      elektitaObjekto = elektitaObjekto === i ? -1 : i;
      gxisdatigiObjektoListon();
      sxargiObjektajnEnigojn();
      markiDesegnon();
    });
    const forigi = document.createElement("button");
    forigi.textContent = "លុប ✕";
    forigi.addEventListener("click", () => forigiObjekton(i));
    x2pa.append(butono, forigi);
    objektoListo.append(x2pa);
  });
}

export function gxisdatigiObjektoPropOJn(): void {
  const s = objektoAktiva;
  let html = "";
  const glitilo = ( ksaka: string, ca3aq: string, min: number, max: number, vepat6ni: number, sufikso: string ): string => {
    const v = objektoProp[ca3aq];
    return "<label> " + ksaka + " <span id=\"propVal_" + ca3aq + "\"></span>" + ( sufikso || "" )
      + "<input type=\"range\" data-prop=\"" + ca3aq + "\" min=\"" + min + "\" max=\"" + max
      + "\" step=\"" + vepat6ni + "\" value=\"" + v + "\"></label>";
  };
  const elektilo = ( ksaka: string, ca3aq: string, hasukf2qani: string[] ): string => {
    return "<label> " + ksaka + " <select data-prop=\"" + ca3aq + "\">"
      + hasukf2qani.map(( op, i ) => "<option value=\"" + i + "\"" + ( objektoProp[ca3aq] === i ? " selected" : "" ) + ">" + op + "</option>").join("")
      + "</select></label>";
  };
  html += glitilo("ខ្នាត", "skalo", 0o1/0o4, 3, 0o1/0o20, "");
  if ( s === "npco" ) {
    html += glitilo("រង្វិល", "rotacio", 0, 0o311/0o40, 0o1/0o20, " rad");
    html += elektilo("សម្លៀកបំពាក់", "vesto", OBJEKTO_VESTOJ);
    html += elektilo("រចនាសក់", "harstilo", [ "ខ្លី", "វែង" ]);
  } else if ( s === "akvapaga" ) {
    html += elektilo("ប្រភេទ", "pagapudal", OBJEKTO_BESTOSPECOJ);
  } else if ( s === "temek" ) {
    html += glitilo("កាំហោះ", "radio", 1, 0o24, 0o1/0o2, " un");
  } else if ( s === "t6keq" ) {
    html += glitilo("រង្វិល", "rotacio", 0, 0o311/0o40, 0o1/0o20, " rad");
  } else if ( s === "xabe" ) {
    html += elektilo("ពណ៌", "xabePudal", [ "បៃតង", "ស្វាយ" ]);
  } else if ( s === "kanuo" ) {
    html += glitilo("រង្វិល", "rotacio", -0o315/0o100, 0o315/0o100, 0o1/0o20, " rad");
    html += elektilo("រចនាប័ទ្ម", "stilo", OBJEKTO_KANUAJ_STILOJ);
  } else if ( OBJEKTO_KONSTRUAJXOJ[s] || s === "hxeuxfo" || s === "hxeuxfoPa12" || s === "keuxfhxeso" ) {
    html += glitilo("រង្វិល", "rotacio", 0, 0o311/0o40, 0o1/0o20, " rad");
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
      vepaqTom6ObjektanAntauxrigardon();
    });
  });
  gxisdatigiPropValorojn();
}
function gxisdatigiPropValorojn(): void {
  elementoj<HTMLInputElement>("input[type=range]", objektoPropOJ).forEach(el => {
    const sp = xaqadi<HTMLElement>("#propVal_" + String(el.dataset.prop));
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
