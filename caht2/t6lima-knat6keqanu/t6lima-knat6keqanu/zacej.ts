// ≺⧼ j͑ʃƽɔ ſɭɹ ı],ɔ ŋᷠᴜ j͑ʃᴜꞇ ʌ ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ 🎯 ⧽≻
import * as THREE from "three";
import { kozonuL6da } from "../../../kanta/nala/t6limaSoza.js";
import { MONDOHALFO, REZ } from "./havecax2l.js";
import { pentri } from "./tsane.js";
import { tsasaVem2De, tsekeTsasaSoza } from "./tsasa.js";
import { triaDimensia, t6limaMesh, oxemaniGrupo3D, YTROIGO,
  tlak23DCakamahan, tlak23DnIlon } from "./vido3d.js";
import { vepaqSatalon } from "../../../skek2/hapaq/satalaj-hapaq.js";
import { TIPAJNIVELOJ } from "../../../skek2/hapaq/satalaj/hahunaq.js";
import { vepaqHxeuxfojn } from "../../../skek2/hapaq/hxeuxfa/hahufwuk2.js";
import { vepaqKekufxeso } from "../../../skek2/w2ta/kubes.js";
import { vepaqKrasesxagxon } from "../../../skek2/hapaq/krasesxagxa-kosmosxipo.js";
import { vepaqQacel2n } from "../../../skek2/pudal/xa3e/halam2v/qacel2.js";
import { vepaqLarikon } from "../../../skek2/pudal/xa3e/hataksal.js";
import { vepaqTlexlefhxakaijn } from "../../../skek2/pudal/xa3e/tlexlefhxakai.js";
import { vepaqTlexlefp2saijn } from "../../../skek2/pudal/xa3e/tlexlefp2sai.js";
import { vepaqNeq2qnRokon } from "../../../skek2/pudal/xa3e/hat6keq.js";
import { vepaqNeq2qnXaben } from "../../../skek2/pudal/xa3e/haxabe.js";
import { vepaqNeq2qnPagan, vepaqNeq2qnTemekn } from "../../../skek2/pudal/hapaga.js";
import { vepaqQoxa } from "../../../skek2/pudal/hamaz.js";
import { kf2S2tani } from "../../../skek2/qatsiike/b6tem2Kas2kanta.js";
import { vepaqPeriferiajnPlathaqoxan } from "../../../skek2/qatsiike/hak6h6/neteruPukaz.js";
import { kf2T6hnaPukek } from "../../../skek2/x2x2q/pukek.js";
import { HASOQTE } from "../../../skek2/hasoqte/hasoqte.js";
import { kfe, hakfe, xaqadi } from "../../x2x2q/dom.js";
import { catsaraTonan, catsaraQatsiiken, kf2GelesTsijen }
  from "../../../skek2/x2x2q/tsije.js";
import type { Neq2qObjekto } from "../../../kanta/nala/kaxte/hahunaq.js";

// ⟪ ſɭɜ ſɭᴜ , ꞙɭı , 📃 ⟫
export let hazace: Neq2qObjekto[] = [];
export let oxemaniModo = false;
export let oxemaniIlo = "neq2q";
export let oxemaniTrenata = -1;
export let oxemaniAktiva = "lam2v";
export let sukf2qitaOxemani = -1;
const oxemaniProp: Record<string, number> = { p6zukani: 1, s2sabo: 0, pagapudal: 0, cabole: 4, soqte: 0, tsaqHaxe: 0, xabePudal: 0, haxe: 0 };
const OBJEKTOSPECOJ: Record<string, { ksaka: string; weh2: string }> = {
  lam2v:       { ksaka: "ſɟɔ j͑ʃɹ ʌ ſɭɜ 🌳",     weh2: "#a8d8a8" },
  taksal:       { ksaka: "ſɟɔ j͑ʃɹ ʌ j͐ʃэ ɭ(ᴜ 🌲",     weh2: "#68a868" },
  tlexlefhxakai: { ksaka: "ı],ᴜ ſ̀ȷɔ 🥬", weh2: "#b880d0" },
  tlexlefp2sai:    { ksaka: "ı],ᴜ ſ̀ȷɔ ʌ ſɟᴜ 🌱",  weh2: "#d8b0e8" },
  t6keq:         { ksaka: "ʃэ ſɭᴜ 🪨",       weh2: "#a0a0a0" },
  xabe:       { ksaka: "ſɭᴜ ſןᴜ 🌿",     weh2: "#70c870" },
  akvapaga:    { ksaka: "ſןᴜ ſ͔ɭᴜ ʌ ſᶘᴜ j͑ʃᴜ 🐟", weh2: "#80d0e8" },
  temek:      { ksaka: "ſᶘɹ ſɭᴜ ɭʃɜ 🕊️",   weh2: "#e8e8e8" },
  npco:         { ksaka: "NPC 🧍",        weh2: "#e0b070" },
  qaman2:     { ksaka: "ſɭᴜ ſɭ,ɔ ŋᷠɹ ɽ͑ʃ'ꞇɔ˞ 🛕",   weh2: "#184038" },
  turo:         { ksaka: "ſɭᴜ ᶅſw ſɭɹ 🏢",       weh2: "#205040" },
  kap2:         { ksaka: "ſɭᴜ ſןɹ 🏠",       weh2: "#184838" },
  geqqa:     { ksaka: "ſɭᴜ ɭʃɜ ʌ ſɭᴜ ɭʃɜ 🍽️",   weh2: "#584028" },
  kasafeo:      { ksaka: "ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɹ ɭʃɜ 🏛️",   weh2: "#d8c898" },
  ka5asexaz:       { ksaka: "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ 🚀",     weh2: "#c8c8c8" },
  hxeuxfo:      { ksaka: "֭ſɭwʞ ᶅſw ſɭɹ 🏮",      weh2: "#d8b068" },
  hxeuxfoPa12: { ksaka: "֭ſɭwʞ ᶅſw ſɭɹ ʌ ſɭэ ŋᷠɹ 🏮", weh2: "#b8c8c8" },
  kekufxeso:   { ksaka: "ſɭᴜ ſןɜ ⭐",   weh2: "#60a0b8" },
  s2kaj2:        { ksaka: "ſᶘᴜ j͑ʃᴜ ｡ ſɭᴜ 🛶",      weh2: "#c8b890" },
  spacosxipo:   { ksaka: "}ʃᴜ j͐ʃᴜ ｡ ſɟᴜ 🚀", weh2: "#d8b068" },
};
const OBJEKTOBESTOSPECOJ = [ "Liixkupukai", "Liixcaxlefai", "Pleŭrobrakia", "Tq2wa", "Tolxu" ];
const OBJEKTOHASOQTE = [ "ſɭɜ ɭʃᴜ", "ſɭэ ſ͕ɭᴜ", "ſɭᴜ ſןɜ", "ſɟᴜ ꞁȷ̀ᴜ", "ſᶘᴜ j͑ʃᴜ", "j͑ʃɹ ı],w", "ſᶘꞇ ɭl̀ɔ", "ſɭɜ ı],ᴜ", "ſɭᴜ ſןᴜ", "ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ" ];
const OBJEKTOKANUAHAAXE = [ "ſɭɜ ſɭᴜ", "ſɭᴜ ſןɜ" ];

// ⟪ ſɭɜ ſɭᴜ , ꞙɭɿ , 📃 ⟫
export let oxemaniGrupo2D: THREE.Group | null = null;
let oxemaniBakaKagani: THREE.Scene | null = null;
let oxemaniBakaCatahaq: THREE.OrthographicCamera | null = null;
let oxemaniBakaMak2f: THREE.WebGLRenderer | null = null;
export let oxemaniBakaP2t6zo: HTMLCanvasElement | null = null;

// ⟪ ſɭɜ ᶗ‹ , ꞙɭц , 📃 ⟫
interface ObjektaLigo {
  l6daInterp: ( x: number, z: number ) => number;
  kix2P6zuk: () => number;
  N: number;
  Tona: number;
  X0: number;
  Z0: number;
  ORAPUKEK: THREE.MeshStandardMaterial;
  ENIRAPUKEK: THREE.MeshStandardMaterial;
  dioritaPukek: () => THREE.MeshStandardMaterial;
  momenti: () => void;
  statuso: ( s2banani: string ) => void;
  s2tasVeq6k2itan: () => void;
  s2tasDesegnon: () => void;
  tlak2Penikaron: () => void;
  tsiinanusabosaiIlCax2l: ( cax2l: string ) => void;
  tlak2Haku1o: () => void;
  tlak2Kursoro: () => void;
}
let l6daInterp: ( x: number, z: number ) => number;
let kix2P6zuk: () => number;
let N: number;
let Tona: number;
let X0: number;
let Z0: number;
let ORAPUKEK: THREE.MeshStandardMaterial;
let ENIRAPUKEK: THREE.MeshStandardMaterial;
let dioritaPukek: () => THREE.MeshStandardMaterial;
let momenti: () => void;
let statuso: ( s2banani: string ) => void;
let s2tasVeq6k2itan: () => void;
let s2tasDesegnon: () => void;
let tlak2Penikaron: () => void;
let tsiinanusabosaiIlCax2l: ( cax2l: string ) => void;
let tlak2Haku1o: () => void;
let tlak2Kursoro: () => void;

/* ſɭɜ ᶗ‹ , ꞙɭэ ,
@param k ( ObjektaLigo ) - ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ */
export function catsaraObjektilon(k: ObjektaLigo): void {
  l6daInterp = k.l6daInterp;
  kix2P6zuk = k.kix2P6zuk;
  N = k.N; Tona = k.Tona; X0 = k.X0; Z0 = k.Z0;
  ORAPUKEK = k.ORAPUKEK; ENIRAPUKEK = k.ENIRAPUKEK;
  dioritaPukek = k.dioritaPukek;
  momenti = k.momenti; statuso = k.statuso;
  s2tasVeq6k2itan = k.s2tasVeq6k2itan; s2tasDesegnon = k.s2tasDesegnon;
  tlak2Penikaron = k.tlak2Penikaron; tsiinanusabosaiIlCax2l = k.tsiinanusabosaiIlCax2l;
  tlak2Haku1o = k.tlak2Haku1o; tlak2Kursoro = k.tlak2Kursoro;
}

// ⟪ ſɭэ ᶗ‹ , ꞙɭɩ , 📃 ⟫
/* ſɭэ ᶗ‹ , ꞙɭꞟ ,
@param ca1ara ( Neq2qObjekto[] ) - j͑ʃƽɔ ſɭɹ ʌ j͑ʃɔ ſȷэⅎ ｡ */
export function catsaraHatoxemani(ca1ara: Neq2qObjekto[]): void { hazace = Array.isArray(ca1ara) ? ca1ara : []; }
/* ſɭэ ᶗ‹ , ꞙɭꞟı ,
@param ind ( number ) - j͑ʃƽɔ ſɭɹ ｡ */
export function catsaraSukf2qitanOxemanin(ind: number): void { sukf2qitaOxemani = ind; }

// ⟪ ſɭэ ᶗ‹ , 🎯 ⟫
const haku1oPanel = kfe<HTMLElement>("haku1oPanel");
export const oxemaniPanel = kfe<HTMLElement>("oxemaniPanel");
const oxemaniPudal = kfe<HTMLSelectElement>("oxemaniPudal");
const oxemaniPropOJ = kfe<HTMLElement>("oxemaniPropOJ");
const oxemaniCatsara = kfe<HTMLElement>("oxemaniCatsara");
const koordinatajEl = kfe<HTMLElement>("haqan2k");
const oxemaniXEnigo = kfe<HTMLInputElement>("oxemaniX");
const oxemaniZEnigo = kfe<HTMLInputElement>("oxemaniZ");
const oxemaniMetuBtn = kfe<HTMLButtonElement>("oxemaniMetu");

/* ſɭэ ᶗ‹ , ꞙɭꞟɿ ,
   ſɭᴜ ſןᴜ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ｡
@param x ( number | null ) - }ʃᴜ j͐ʃᴜ x ʌ ſɭᴜ ｡
@param z ( number | null ) - }ʃᴜ j͐ʃᴜ z ʌ ſɭᴜ ｡ */
export function tlak2Haqan2k(x: number | null, z: number | null): void {
  if ( !koordinatajEl ) return;
  if ( x === null || z === null ) { koordinatajEl.textContent = "⋯"; return; }
  const h = kozonuL6da(x, z) + l6daInterp(x, z);
// ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭɿ , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı ,
  const tsasa = tsekeTsasaSoza(x, z);
  koordinatajEl.textContent = "x " + x.toFixed(2) + "   z " + z.toFixed(2)
    + "   y " + h.toFixed(2) + ( tsasa ? "   ( ſᶘᴜ j͑ʃᴜ )" : "" );
}

/* ſɭэ ᶗ‹ , ꞙɭꞟц , ꞙɭɔ , ꞙɭɿꞟ ,
   ſɭэ ᶗ‹ ｡ 3D ｡ ſᶘᴜ j͐ʃɹ ⟅
@param x ( number ) - }ʃᴜ j͐ʃᴜ x ｡
@param z ( number ) - }ʃᴜ j͐ʃᴜ z ｡ */
export function neq2qObjekton(x: number, z: number): void {
  if ( Math.abs(x) > MONDOHALFO || Math.abs(z) > MONDOHALFO ) return;
  momenti();
  const o: Neq2qObjekto = { x: Math.round(x * 4) / 4, z: Math.round(z * 4) / 4, pudal: oxemaniAktiva };
  const ecoj = o as unknown as Record<string, number>;
  for ( const k of Object.keys(oxemaniProp) ) ecoj[k] = oxemaniProp[k];
  if ( o.pudal === "s2kaj2" ) o.haxe = oxemaniProp.haxe === 1 ? "satala" : "kozunu";
  hazace.push(o);
  s2tasVeq6k2itan();
    statuso("ſɭэ j͐ʃꞇ ｡ ɭʃᴜ");
  tlak2ObjektoCatsara();
  vepaqTom6Hatoxemani();
  s2tasDesegnon();
}

/* ſɭэ ᶗ‹ , ꞙɭıə ,
( ſɭɹ ſןᴜ 8 ｡ ) ｡ -ı ⟅ ſᶘꞇ ı],ɹ ｡
j͑ʃƽɔ ſɭɹ ｡ ſɭᴜ ｡
@param wx ( number ) - }ʃᴜ j͐ʃᴜ x ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ｡
@param wz ( number ) - }ʃᴜ j͐ʃᴜ z ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ｡
@returns j͑ʃƽɔ ſɭɹ ɭʃᴜ -ı ( number ) ｡ */
export function oxemaniJeN2k(wx: number, wz: number): number {
  const h6kuni = Math.max(0o5/0o2, 0o10 / kix2P6zuk());
  let plosteq = -1, kmaDisto = h6kuni;
  for ( let i = 0; i < hazace.length; i++ ) {
    const o = hazace[i];
    const d = Math.hypot(o.x - wx, o.z - wz);
    if ( d < kmaDisto ) { kmaDisto = d; plosteq = i; }
  }
  return plosteq;
}

/* ſɭэ ᶗ‹ , ꞙɭıı ,
   ſɭэ ᶗ‹ ｡ ı],ɔ j͑ʃᴜ̭ɔ ɭʃꞇ ｡ }ʃɔ ſɭᴜ j͐ʃᴜ ) ⟅
@param i ( number ) - j͑ʃƽɔ ſɭɹ ｡ */
export function h2liObjekton(i: number): void {
  momenti();
  hazace.splice(i, 1);
  if ( sukf2qitaOxemani === i ) sukf2qitaOxemani = -1;
  else if ( sukf2qitaOxemani > i ) sukf2qitaOxemani--;
  s2tasVeq6k2itan();
    statuso("ſɭэ j͐ʃꞇ ｡ ɭʃᴜ");
  tlak2ObjektoCatsara();
  b6tem2ObjektajnHap2d2();
  vepaqTom6Hatoxemani();
  s2tasDesegnon();
}

/* ſɭэ ᶗ‹ , ꞙɭıɿ ,
｡ ſɭᴜ ſןᴜ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ｡ ſɟᴜ ᶗ‹ ｡
j͑ʃƽɔ ſɭɹ ｡ */
export function b6tem2ObjektajnHap2d2(): void {
  if ( !oxemaniXEnigo ) return;
  if ( sukf2qitaOxemani >= 0 && sukf2qitaOxemani < hazace.length ) {
    const o = hazace[sukf2qitaOxemani];
    oxemaniXEnigo.value = String(o.x);
    oxemaniZEnigo.value = String(o.z);
      oxemaniMetuBtn.textContent = "ſɟᴜꞁȷ̀ɜ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ➡️";
  } else {
      oxemaniMetuBtn.textContent = "j͑ʃƽɔ ſɭɹ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ➕";
  }
}
oxemaniMetuBtn.addEventListener("click", () => {
  const x = parseFloat(oxemaniXEnigo.value);
  const z = parseFloat(oxemaniZEnigo.value);
    if ( !isFinite(x) || !isFinite(z) ) { statuso("ſɭɜ ſɭᴜ x ｡ z"); return; }
  if ( Math.abs(x) > MONDOHALFO || Math.abs(z) > MONDOHALFO ) {
    statuso("j͑ʃƽɔ ſɭɹ ｡ ɭʃᴜ ɭl̀ɹ ɭʃɔ");
    return;
  }
  if ( sukf2qitaOxemani >= 0 && sukf2qitaOxemani < hazace.length ) {
    momenti();
    const o = hazace[sukf2qitaOxemani];
    o.x = Math.round(x * 4) / 4;
    o.z = Math.round(z * 4) / 4;
    s2tasVeq6k2itan();
    statuso("ſɭᴜ ｡ ſɭэ j͐ʃꞇ ｡ ɭʃᴜ");
    tlak2ObjektoCatsara();
    b6tem2ObjektajnHap2d2();
    vepaqTom6Hatoxemani();
    s2tasDesegnon();
  } else {
    neq2qObjekton(x, z);
  }
});

hakfe<HTMLButtonElement>("#oxemaniHacaht2 button").forEach(b => {
  b.addEventListener("click", () => {
    oxemaniIlo = b.dataset.oxemaniIlo ?? "neq2q";
    hakfe<HTMLButtonElement>("#oxemaniHacaht2 button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
oxemaniPudal.addEventListener("change", () => {
  oxemaniAktiva = oxemaniPudal.value;
  tlak2ObjektoPropOJn();
  vepaqTom6ObjektanAntauxrigardon();
  s2tasDesegnon();
});
/* ſɭэ ᶗ‹ , ꞙɭıц ,
   ſɭэ ᶗ‹ ｡ ſᶘꞇ ı],ɹ ) ⟅
@param ind ( number ) - j͑ʃƽɔ ſɭɹ ｡
@param x ( number ) - }ʃᴜ j͐ʃᴜ x ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ｡
@param z ( number ) - }ʃᴜ j͐ʃᴜ z ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ｡ */
export function saxeiObjektanTrenon(ind: number, x: number, z: number): void {
  if ( oxemaniTrenata >= 0 ) return;
  momenti();
  oxemaniTrenata = ind;
  sukf2qitaOxemani = ind;
  s2tasVeq6k2itan();
    statuso("ſɭэ j͐ʃꞇ ｡ ɭʃᴜ");
  tlak2ObjektoCatsara();
  b6tem2ObjektajnHap2d2();
  sxangiObjektanXekuxan(ind, x, z);
}
/* ſɭэ ᶗ‹ , ꞙɭıэ , ꞙɭɔ , ꞙɭɿꞟ ,
   ſɭэ ᶗ‹ ｡ 3D ｡ ſᶘᴜ j͐ʃɹ ⟅
@param ind ( number ) - j͑ʃƽɔ ſɭɹ ｡
@param x ( number ) - }ʃᴜ j͐ʃᴜ x ʌ ſɭᴜ ｡
@param z ( number ) - }ʃᴜ j͐ʃᴜ z ʌ ſɭᴜ ｡ */
export function sxangiObjektanXekuxan(ind: number, x: number, z: number): void {
  const o = hazace[ind];
  o.x = Math.round(x * 4) / 4;
  o.z = Math.round(z * 4) / 4;
  vepaqTom6Hatoxemani();
  s2tasDesegnon();
}
export function finiObjektanTrenon(): void {
  if ( oxemaniTrenata < 0 ) return;
  oxemaniTrenata = -1;
  tlak2ObjektoCatsara();
  b6tem2ObjektajnHap2d2();
  s2tasDesegnon();
}

const OBJEKTOKONSTRUAJXOJ: Record<string, number> = { qaman2: 1, turo: 1, kap2: 1, geqqa: 1, kasafeo: 1, ka5asexaz: 1 };

interface VepaqHasukf2qani {
  l6da?: ( x: number, z: number ) => number;
  vaknesmiL6da?: number;
}
/* ſɭэ ᶗ‹ , ꞙɭıɩ ,
   ſɭᴜ ｡
@param hate2 ( THREE.Object3D ) - j͑ʃƽɔ ſɭɹ ( 2D ｡ 3D ｡
   ſɭꞇ ı],ɹ ) ⟅
@param o ( Neq2qObjekto ) - j͑ʃƽɔ ſɭɹ ｡
@param hasukf2qani ( VepaqHasukf2qani = {} ) - j͐ʃэ ɭ(ᴜ ｡ */
function vepaqObjektonEn(hate2: THREE.Object3D, o: Neq2qObjekto, hasukf2qani: VepaqHasukf2qani = {}): void {
  const temp = new THREE.Scene();
  const h = hasukf2qani.l6da ? hasukf2qani.l6da : ( x: number, z: number ) => ( kozonuL6da(x, z) + l6daInterp(x, z) ) * YTROIGO;
  const vaknesmiL6da = hasukf2qani.vaknesmiL6da !== undefined ? hasukf2qani.vaknesmiL6da : 0o40 * YTROIGO;
  const s = o.p6zukani ?? 1;
  if ( o.pudal === "lam2v" ) vepaqQacel2n(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.pudal === "taksal" ) vepaqLarikon(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.pudal === "tlexlefhxakai" ) vepaqTlexlefhxakaijn(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.pudal === "tlexlefp2sai" ) vepaqTlexlefp2saijn(temp, [ { x: o.x, z: o.z, h: h(o.x, o.z), s } ]);
  else if ( o.pudal === "t6keq" ) vepaqNeq2qnRokon(temp, o.x, o.z, h, s, o.s2sabo ?? -1);
  else if ( o.pudal === "xabe" ) vepaqNeq2qnXaben(temp, o.x, o.z, h, s, o.xabePudal ?? 0);
  else if ( o.pudal === "akvapaga" ) {
    const i = Math.max(0, Math.min(N - 1, Math.floor(( o.x - X0 ) / Tona)));
    const j = Math.max(0, Math.min(N - 1, Math.floor(( o.z - Z0 ) / Tona)));
    const niv = tsasaVem2De(i, j, o.x, o.z);
    const b = vepaqNeq2qnPagan(temp, o.pagapudal ?? 0, o.x, o.z,
      niv === null ? h(o.x, o.z) : niv * YTROIGO, s);
    if ( b ) { temp.remove(b.hate2); hate2.add(b.hate2); }
  } else if ( o.pudal === "temek" ) {
    const p = vepaqNeq2qnTemekn(temp, o.x, o.z, h, o.cabole ?? 4, s);
    if ( p ) { temp.remove(p.hate2); hate2.add(p.hate2); }
  } else if ( o.pudal === "npco" ) {
    const fig = vepaqQoxa(HASOQTE[( o.soqte ?? 0 ) % HASOQTE.length],
      ( o.tsaqHaxe ?? 0 ) === 1 ? "tsaqSahakani" : "tsaqPsazai");
    fig.group.position.set(o.x, h(o.x, o.z), o.z);
    fig.group.rotation.y = o.s2sabo ?? 0;
    hate2.add(fig.group);
  } else if ( o.pudal === "s2kaj2" ) {
    const i = Math.max(0, Math.min(N - 1, Math.floor(( o.x - X0 ) / Tona)));
    const j = Math.max(0, Math.min(N - 1, Math.floor(( o.z - Z0 ) / Tona)));
    const niv = tsasaVem2De(i, j, o.x, o.z);
    const s2tani = kf2S2tani(temp, o.x, o.z, o.s2sabo ?? 0, ORAPUKEK,
      niv === null ? h(o.x, o.z) : niv * YTROIGO, o.haxe === "satala" ? "satala" : "kozunu");
    s2tani.group.position.set(o.x, niv === null ? h(o.x, o.z) : niv * YTROIGO, o.z);
    s2tani.group.rotation.y = o.s2sabo ?? 0;
  } else if ( o.pudal === "spacosxipo" ) {
    vepaqKrasesxagxon(temp, o.x, vaknesmiL6da, o.z, ORAPUKEK, ENIRAPUKEK);
  } else if ( OBJEKTOKONSTRUAJXOJ[o.pudal] ) {
    const hunaq = o.pudal === "ka5asexaz" ? "ka5asexazxipo" : o.pudal;
    const havem2 = hunaq === "ka5asexazxipo" ? TIPAJNIVELOJ.ka5asexazxipo : hunaq === "qaman2" ? 7 : hunaq === "turo" ? 0o10 : 4;
    const spec = {
      x: o.x, z: o.z, type: hunaq, name: "zace",
      havem2, w: 0o10 * s, d: 0o10 * s,
      b6k61oL6da: hunaq === "ka5asexazxipo" ? 0o155/0o40 : hunaq === "turo" ? 0o30/0o10 : hunaq === "kasafeo" ? 0o155/0o40 : 0o315/0o100,
      rot: o.s2sabo ?? 0, diamond: true, h0: h(o.x, o.z),
      sube: hunaq === "ka5asexazxipo" ? 0 : havem2, b6k61oL6daSub: 0o123/0o40,
    };
    vepaqSatalon(spec, temp, [], h);
  } else if ( o.pudal === "hxeuxfo" || o.pudal === "hxeuxfoPa12" ) {
    if ( o.pudal === "hxeuxfoPa12" ) {
      vepaqPeriferiajnPlathaqoxan(temp, [ [ o.x, o.z ] ], h, dioritaPukek(), kf2T6hnaPukek());
      vepaqHxeuxfojn(temp, [ { x: o.x, z: o.z, y: h(o.x, o.z) + 0o4/0o10 - 0o1/0o40, s2sabo: o.s2sabo ?? Math.PI / 4 } ], dioritaPukek(), ORAPUKEK);
    } else {
      vepaqHxeuxfojn(temp, [ { x: o.x, z: o.z, y: h(o.x, o.z), s2sabo: o.s2sabo ?? Math.PI / 4 } ], dioritaPukek(), ORAPUKEK);
    }
  } else if ( o.pudal === "kekufxeso" ) {
    vepaqKekufxeso(temp, [ { x: o.x, z: o.z, s2sabo: o.s2sabo ?? 0 } ], h, ORAPUKEK);
  }
  while ( temp.children.length ) hate2.add(temp.children[0]);
}

function kf2ObjektanTsanen() {
  if ( oxemaniBakaMak2f ) return;
  oxemaniBakaMak2f = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  catsaraTonan( oxemaniBakaMak2f );
  oxemaniBakaMak2f.setSize(0o2000, 0o2000);
  oxemaniBakaMak2f.setClearColor(0x000000, 0);
  oxemaniBakaCatahaq = new THREE.OrthographicCamera(-MONDOHALFO, MONDOHALFO, MONDOHALFO, -MONDOHALFO, 1, 0o600);
  oxemaniBakaCatahaq.up.set(0, 0, 1);
  oxemaniBakaCatahaq.position.set(0, 0o470, 0);
  oxemaniBakaCatahaq.lookAt(0, 0, 0);
  oxemaniBakaKagani = new THREE.Scene();
// ⟨ ſᶘɹ ſɭᴜ , ſɭэ ſɭw , 📃 ⟩
  kf2GelesTsijen( oxemaniBakaKagani, {
    canaWeh2: 0xb8d8e8, kozuWeh2: 0x384838, canaVem2: 0o35/0o40,
    sotsiiWeh2: 0xf8f0d8, sotsiiVem2: 0o43/0o40,
    sotsiiHaxekuxa: [ -0o400, 0o470, 0o300 ],
    vetem2Weh2: 0x404848, vetem2Vem2: 0o15/0o40,
  } );
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı , 📃 ⟩
  catsaraQatsiiken( oxemaniBakaKagani, oxemaniBakaMak2f, { vem2: 0o1/0o10 } );
  oxemaniGrupo2D = new THREE.Group();
  oxemaniBakaKagani.add(oxemaniGrupo2D);
  oxemaniBakaP2t6zo = oxemaniBakaMak2f.domElement;
}

export function vepaqTom6Hatoxemani(): void {
  if ( hazace.length > 0 ) kf2ObjektanTsanen();
  if ( oxemaniGrupo2D && oxemaniBakaMak2f && oxemaniBakaKagani && oxemaniBakaCatahaq ) {
    while ( oxemaniGrupo2D.children.length ) oxemaniGrupo2D.remove(oxemaniGrupo2D.children[0]);
    for ( const o of hazace ) vepaqObjektonEn(oxemaniGrupo2D, o);
    oxemaniBakaMak2f.render(oxemaniBakaKagani, oxemaniBakaCatahaq);
  }
  if ( oxemaniGrupo3D ) {
    while ( oxemaniGrupo3D.children.length ) oxemaniGrupo3D.remove(oxemaniGrupo3D.children[0]);
    for ( const o of hazace ) vepaqObjektonEn(oxemaniGrupo3D, o);
  }
}

// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
const oxemaniAntauxrigardo = kfe<HTMLCanvasElement>("oxemaniAntauxrigardo");
export let oxemaniNe3ak2Mak2f: THREE.WebGLRenderer | null = null;
export let oxemaniNe3ak2Kagani: THREE.Scene | null = null;
export let oxemaniNe3ak2Catahaq: THREE.PerspectiveCamera | null = null;
export let oxemaniNe3ak2Hate: THREE.Group | null = null;
function kf2ObjektanAntauxrigardon(): void {
  if ( oxemaniNe3ak2Mak2f ) return;
  oxemaniNe3ak2Mak2f = new THREE.WebGLRenderer({ canvas: oxemaniAntauxrigardo, antialias: true, alpha: true });
  catsaraTonan( oxemaniNe3ak2Mak2f );
  oxemaniNe3ak2Mak2f.setClearColor(0x000000, 0);
  oxemaniNe3ak2Kagani = new THREE.Scene();
  oxemaniNe3ak2Catahaq = new THREE.PerspectiveCamera(0o50, 1, 1, 0o764);
  oxemaniNe3ak2Catahaq.position.set(0o20, 0o14, 0o20);
// ⟨ ſᶘɹ ſɭᴜ , ſɭэ ſɭw , 📃 ⟩
  kf2GelesTsijen( oxemaniNe3ak2Kagani, {
    canaWeh2: 0xc8e0f0, kozuWeh2: 0x404840, canaVem2: 0o1,
    sotsiiWeh2: 0xf8f0d8, sotsiiVem2: 0o115/0o100,
    sotsiiHaxekuxa: [ -0o12, 0o24, 0o10 ],
    vetem2Weh2: 0x505858, vetem2Vem2: 0o1/0o2,
  } );
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , 📃 ⟩
  catsaraQatsiiken( oxemaniNe3ak2Kagani, oxemaniNe3ak2Mak2f, { vem2: 0o1/0o4 } );
  oxemaniNe3ak2Hate = new THREE.Group();
  oxemaniNe3ak2Kagani.add(oxemaniNe3ak2Hate);
}
export function vepaqTom6ObjektanAntauxrigardon(): void {
  kf2ObjektanAntauxrigardon();
  if ( !oxemaniNe3ak2Hate || !oxemaniNe3ak2Catahaq ) return;
  while ( oxemaniNe3ak2Hate.children.length ) oxemaniNe3ak2Hate.remove(oxemaniNe3ak2Hate.children[0]);
  oxemaniNe3ak2Hate.position.set(0, 0, 0);
  oxemaniNe3ak2Hate.rotation.set(0, 0, 0);
  const o = { x: 0, z: 0, pudal: oxemaniAktiva, p6zukani: oxemaniProp.p6zukani,
    s2sabo: oxemaniProp.s2sabo, pagapudal: oxemaniProp.pagapudal, cabole: oxemaniProp.cabole,
    soqte: oxemaniProp.soqte, tsaqHaxe: oxemaniProp.tsaqHaxe, xabePudal: oxemaniProp.xabePudal,
    haxe: oxemaniProp.haxe === 1 ? "satala" : "kozunu" };
  vepaqObjektonEn(oxemaniNe3ak2Hate, o, { l6da: () => 0, vaknesmiL6da: 0o10 });
  const kesto = new THREE.Box3().setFromObject(oxemaniNe3ak2Hate);
  const pal6 = kesto.getSize(new THREE.Vector3()).length() || 0o10;
  const sost2 = kesto.getCenter(new THREE.Vector3());
  oxemaniNe3ak2Hate.position.sub(sost2);
  const h6kuni = Math.max(0o14, pal6 * 0o35/0o40);
  oxemaniNe3ak2Catahaq.near = Math.max(1, h6kuni * 0o1/0o20);
  oxemaniNe3ak2Catahaq.far = h6kuni * 0o10 + 0o200;
  oxemaniNe3ak2Catahaq.position.set(h6kuni * 0o63/0o100, h6kuni * 0o25/0o40, h6kuni * 0o63/0o100);
  oxemaniNe3ak2Catahaq.updateProjectionMatrix();
  oxemaniNe3ak2Catahaq.lookAt(0, 0, 0);
}

export function tlak2ObjektoCatsara(): void {
  oxemaniCatsara.innerHTML = "";
  if ( hazace.length === 0 ) {
    const qun2 = document.createElement("p");
    qun2.className = "kefhuruq";
    qun2.textContent = "ſɟᴜ ｡ ʃᴜ j͐ʃɹ ｡ ſɭᴜ ſןᴜ ｡";
    oxemaniCatsara.append(qun2);
    return;
  }
  hazace.forEach(( o, i ) => {
    const x2pa = document.createElement("sabosuc2w2q");
    const pudal = OBJEKTOSPECOJ[o.pudal];
    const ksaka = pudal ? pudal.ksaka : o.pudal;
    const catsiina = document.createElement("button");
    catsiina.textContent = ksaka + "  ( " + o.x.toFixed(2) + ", " + o.z.toFixed(2) + " )";
    catsiina.setAttribute("aria-pressed", String(i === sukf2qitaOxemani));
    catsiina.addEventListener("click", () => {
      sukf2qitaOxemani = sukf2qitaOxemani === i ? -1 : i;
      tlak2ObjektoCatsara();
      b6tem2ObjektajnHap2d2();
      s2tasDesegnon();
    });
    const h2li = document.createElement("button");
      h2li.textContent = "ı],ɔ j͑ʃᴜ̭ɔ ɭʃꞇ ✕";
    h2li.addEventListener("click", () => h2liObjekton(i));
    x2pa.append(catsiina, h2li);
    oxemaniCatsara.append(x2pa);
  });
}

export function tlak2ObjektoPropOJn(): void {
  const s = oxemaniAktiva;
  let html = "";
  const glitilo = ( ksaka: string, ca3aq: string, min: number, max: number, vepat6ni: number, sufikso: string ): string => {
    const v = oxemaniProp[ca3aq];
    return "<label> " + ksaka + " <span id=\"propVal" + ca3aq + "\"></span>" + ( sufikso || "" )
      + "<input type=\"range\" data-prop=\"" + ca3aq + "\" min=\"" + min + "\" max=\"" + max
      + "\" step=\"" + vepat6ni + "\" value=\"" + v + "\"></label>";
  };
  const masukf2q = ( ksaka: string, ca3aq: string, hasukf2qani: string[] ): string => {
    return "<label> " + ksaka + " <select data-prop=\"" + ca3aq + "\">"
      + hasukf2qani.map(( op, i ) => "<option value=\"" + i + "\"" + ( oxemaniProp[ca3aq] === i ? " selected" : "" ) + ">" + op + "</option>").join("")
      + "</select></label>";
  };
  html += glitilo("ſןᴜ j͐ʃэ", "p6zuk", 0o1/0o4, 3, 0o1/0o20, "");
  if ( s === "npco" ) {
  html += glitilo("j͑ʃɹ j͑ʃᴜ ʃɜ", "s2sabo", 0, 0o311/0o40, 0o1/0o20, " rad");
  html += masukf2q("ſɭᴜ ſןɹ", "soqte", OBJEKTOHASOQTE);
  html += masukf2q("ſɭᴜ ſןɹ ｡ ſᶘᴜ", "tsaqHaxe", [ "ſɟᴜ", "ſɟᴜ ᶗ‹" ]);
  } else if ( s === "akvapaga" ) {
  html += masukf2q("ſ͕ɭɜ ı],ᴜ", "pagapudal", OBJEKTOBESTOSPECOJ);
  } else if ( s === "temek" ) {
  html += glitilo("ſɭᴜ ſɭˬꞇƽ", "cabole", 1, 0o24, 0o1/0o2, " un");
  } else if ( s === "t6keq" ) {
  html += glitilo("j͑ʃɹ j͑ʃᴜ ʃɜ", "s2sabo", 0, 0o311/0o40, 0o1/0o20, " rad");
  } else if ( s === "xabe" ) {
  html += masukf2q("ſᶘꞇ ɭl̀ɔ", "xabePudal", [ "ſɭɜ ɭʃᴜ", "j͑ʃɹ ı],w" ]);
  } else if ( s === "s2kaj2" ) {
  html += glitilo("j͑ʃɹ j͑ʃᴜ ʃɜ", "s2sabo", -0o315/0o100, 0o315/0o100, 0o1/0o20, " rad");
  html += masukf2q("ſɭᴜ ſןᴜ ɭʃᴜ", "haxe", OBJEKTOKANUAHAAXE);
  } else if ( OBJEKTOKONSTRUAJXOJ[s] || s === "hxeuxfo" || s === "hxeuxfoPa12" || s === "kekufxeso" ) {
  html += glitilo("j͑ʃɹ j͑ʃᴜ ʃɜ", "s2sabo", 0, 0o311/0o40, 0o1/0o20, " rad");
  }
  oxemaniPropOJ.innerHTML = html;
  hakfe<HTMLInputElement | HTMLSelectElement>("input[data-prop], select[data-prop]", oxemaniPropOJ).forEach(el => {
    el.addEventListener("input", () => {
      oxemaniProp[el.dataset.prop ?? ""] = +el.value;
      tlak2PropHaskek2();
    });
    el.addEventListener("change", () => {
      oxemaniProp[el.dataset.prop ?? ""] = +el.value;
      tlak2PropHaskek2();
      vepaqTom6ObjektanAntauxrigardon();
    });
  });
  tlak2PropHaskek2();
}
function tlak2PropHaskek2(): void {
  hakfe<HTMLInputElement>("input[type=range]", oxemaniPropOJ).forEach(el => {
    const sp = xaqadi<HTMLElement>("#propVal" + String(el.dataset.prop));
    if ( sp ) sp.textContent = ( +el.value ).toFixed(2);
  });
}

/* ſɭэ ᶗ‹ , ꞙɭıꞟ ,
@param on ( boolean ) - ſɭꞇ ı],ɹ ｡ */
export function tsiinanusabosaiHatoxemani(on: boolean): void {
  oxemaniModo = on;
  tlak2Penikaron();
  if ( on ) tsiinanusabosaiIlCax2l("hazace");
  oxemaniPanel.classList.toggle("kobe", !on);
  haku1oPanel.classList.toggle("kobe", on);
  tlak2Haku1o();
  tlak2Kursoro();
  tlak23DnIlon();
  if ( !on ) { tlak2Haqan2k(null, null); sukf2qitaOxemani = -1; tlak2ObjektoCatsara(); }
  b6tem2ObjektajnHap2d2();
  pentri(0, 0, REZ - 1, REZ - 1);
  s2tasDesegnon();
  if ( triaDimensia && t6limaMesh ) tlak23DCakamahan({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
}
