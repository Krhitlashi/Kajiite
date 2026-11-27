// ≺⧼ ʃᴜ j͐ʃɹ ʌ ֭ſɭᴜ ſ͕ɭɜ ı],ɹ }ʃɹƽ 🗺️ ⧽≻

import { MONDOHALFO } from "./havecax2l.js";
import { tsasaTseuni, tsekeTsasa } from "./1asa.js";
import { tona3d } from "./vido3d.js";
import { vepaqTom6Qox2n2kn3D, vepaqTom6Hak6h6n3D } from "./qox2n2k3d.js";
import { kf2Qox2n2kB6vakantan } from "../../../kanta/nala/qox2n2k/b6vakanta.js";
import { validiQox2n2k } from "../../../kanta/nala/qox2n2k/senaq-1ale1a.js";
import { tlunakK6h6n } from "../../../kanta/nala/qox2n2k/3unakani.js";
import { superajElVop2, hatikElVop2 } from "../../../kanta/nala/qox2n2k/teru.js";
import type { Knat6keqanuKuba, Knat6keqanuK6h6N2k, Knat6keqanuTap2Qoxa } from "../../../kanta/nala/kaxte/hahunaq.js";
import type { K2paHunaq, Qox2n2kB6vakanta } from "../../../kanta/nala/qox2n2k/hahunaq.js";
import type { K6h6N2k } from "../../../skek2/qa12ke/k6h6-caxlefkakai.js";
import { kfe, hakfe } from "../../cas2tas/dom.js";
import { catsaraLaqazendajnHakaxten, h2luKaxten, laqazendajHakaxte, refresxigiVidon, panauKaxten } from "./kix2-ka5ik.js";
import { k6h6P2somaniSefini as caxlefkakaiK6h6P2somaniSefini, k6h6Veb6kekaP2somani as caxlefkakaiK6h6Veb6kekaP2somani,
  k6h6Phaka as caxlefkakaiK6h6Projekcio,
  k6h6Vakox2q as caxlefkakaiK6h6Vakox2q,
  qakaj2Vakox2q as caxlefkakaiQakaj2Vakox2q, qakaj2KonektasK6h6n as qakaj2KonektasK6h6nCaxlefkakai,
  k6h6jHakox2qo as caxlefkakaiK6h6jHakox2qj,
  konektiQakaj2nAlK6h6 as caxlefkakaiKonektiQakaj2nAlK6h6,
  qakaj2LandaS2nasce as caxlefkakaiQakaj2LandaS2nasce,
  QAKAJ2KOZUNUASEFINI } from "../../../skek2/qa12ke/k6h6-caxlefkakai.js";

interface KradaLigo {
  vidCX: () => number;
  vidCZ: () => number;
  kix2P6zuk: () => number;
  momenti: () => void;
  statuso: ( s2banani: string ) => void;
  s2tasVeq6k2itan: () => void;
  s2tasDesegnon: () => void;
}
let vidCX: () => number;
let vidCZ: () => number;
let kix2P6zuk: () => number;
let momenti: () => void;
let statuso: ( s2banani: string ) => void;
let s2tasVeq6k2itan: () => void;
let s2tasDesegnon: () => void;

export function catsaraHaqox2n2kn(k: KradaLigo): void {
  vidCX = k.vidCX; vidCZ = k.vidCZ; kix2P6zuk = k.kix2P6zuk;
  momenti = k.momenti; statuso = k.statuso;
  s2tasVeq6k2itan = k.s2tasVeq6k2itan; s2tasDesegnon = k.s2tasDesegnon;
}

export function catsaraHakaxten(ca1ara: Knat6keqanuKuba[]) { hakaxte = Array.isArray(ca1ara) ? ca1ara : []; }
export function catsaraSukf2qitanKaxten(i: number) { sukf2qitaKaxte = i; }
export function catsaraSukf2qitanAldonanBlokon(i: number) { sukf2qitaNek2resaiK6liq = i; }
export function catsaraHak6h6n(ca1ara: Knat6keqanuK6h6N2k[]) { hak6h6 = Array.isArray(ca1ara) ? ca1ara : []; }
export function catsaraHaqakaj2n(ca1ara: Knat6keqanuTap2Qoxa[]) { haqakaj2 = Array.isArray(ca1ara) ? ca1ara : []; }

const bal2 = kfe<HTMLCanvasElement>("bal2");

export let hakaxte: Knat6keqanuKuba[] = [];
export let sukf2qitaKaxte = 0o0;
export let qox2n2kPal6 = 0o3;
export let qox2n2kK6liq: "vakox2qita" | "kvar" = "vakox2qita";
export let qox2n2kOfsX = 0o0, qox2n2kOfsZ = 0o0;
export let qox2n2kKekufxeso = false;
export let qox2n2kHahufwuk2 = true;
export let qox2n2kHunaqSukf2qita: K2paHunaq | "automata" = "automata";
export let qox2n2kHatik: Map<string, K2paHunaq> = new Map();
export let hak6h6: Knat6keqanuK6h6N2k[] = [];
export let haqakaj2: Knat6keqanuTap2Qoxa[] = [];

interface Knat6keqanuHavop2 {
  hakaxte?: Knat6keqanuKuba[];
  hak6h6?: Knat6keqanuK6h6N2k[];
  haqakaj2?: Knat6keqanuTap2Qoxa[];
}

export function catsaraDatumojn(havop2: Knat6keqanuHavop2): void {
  hakaxte = ( havop2.hakaxte ?? [] ).map(u => ( { ...u } ));
  sukf2qitaKaxte = 0o0;
  qox2n2kPal6 = hakaxte[0o0]?.ptaluPal6 ?? 0o3;
  qox2n2kK6liq = hakaxte[0o0]?.k6liqPal6 ?? "vakox2qita";
  qox2n2kOfsX = hakaxte[0o0]?.ofsX ?? 0o0;
  qox2n2kOfsZ = hakaxte[0o0]?.ofsZ ?? 0o0;
  qox2n2kKekufxeso = !!hakaxte[0o0]?.kekufxeso;
  qox2n2kHahufwuk2 = hakaxte[0o0]?.hahufwuk2 !== false;
  const datumajHak6h6 = havop2.hak6h6 ?? [];
  hak6h6 = datumajHak6h6.length
    ? datumajHak6h6.map(v => ( { ...v, n2k: v.n2k.map(pp => [ pp[0o0], pp[0o1] ] as K6h6N2k) } ))
    : [ { ksaka: "Cutfa", sefini: 0o7/0o2, n2k: [ [ -0o124, -0o140 ], [ -0o70, -0o150 ], [ -0o60, -0o144 ], [ 0o0, -0o132 ], [ 0o60, -0o120 ], [ 0o70, -0o124 ], [ 0o124, -0o122 ] ] },
        { ksaka: "Avenuo", sefini: 0o7/0o2, n2k: [ [ 0o14, -0o100 ], [ 0o14, -0o130 ] ] } ];
  const datumajHaqakaj2 = havop2.haqakaj2 ?? [];
  haqakaj2 = datumajHaqakaj2.length
    ? datumajHaqakaj2.map(d => ( { ...d } ))
    : [ { x: -0o60, z: -0o154, jufu: 0o20 }, { x: 0o0, z: -0o142, jufu: 0o20 }, { x: 0o60, z: -0o130, jufu: 0o20 } ];

  catsaraLaqazendajnHakaxten(hakaxte.map(( _, i ) => i));
}

export function sinkronigiHatik() {
  const u = hakaxte[sukf2qitaKaxte];
  if ( !u ) return;
  u.hateru = hatikElVop2(qox2n2kHatik);
}
let qox2n2kPlanoCache: ReturnType<typeof kf2Qox2n2kB6vakantan> | null = null;
export const haqox2n2k = kfe<HTMLElement>("haqox2n2k");
export const qox2n2kPanel = kfe<HTMLElement>("qox2n2kPanel");
const kaxteMasukf2q = kfe<HTMLSelectElement>("kaxteMasukf2q");
const kaxteKsakaEl = kfe<HTMLInputElement>("kaxteKsaka");
const kaxteAldoniBtn = kfe<HTMLButtonElement>("kaxteAldoni");
const kaxteH2liBtn = kfe<HTMLButtonElement>("kaxteH2li");
const qox2n2kPal6El = kfe<HTMLSelectElement>("qox2n2kPal6");
const qox2n2kK6liqEl = kfe<HTMLSelectElement>("qox2n2kK6liq");
const qox2n2kOfsXEl = kfe<HTMLInputElement>("qox2n2kOfsX");
const qox2n2kOfsZEl = kfe<HTMLInputElement>("qox2n2kOfsZ");
const qox2n2kKekufxesoEl = kfe<HTMLInputElement>("qox2n2kKekufxeso");
const qox2n2kHahufwuk2El = kfe<HTMLInputElement>("qox2n2kHahufwuk2");
const qox2n2kRestarigiBtn = kfe<HTMLButtonElement>("qox2n2kRestarigi");
const qox2n2kKopiiBtn = kfe<HTMLButtonElement>("qox2n2kKopii");
export let sukf2qitaNek2resaiK6liq = -0o1;
export let tlunakTrenata = -0o1;
const tlunakK6liqMasukf2q = kfe<HTMLSelectElement>("tlunakK6liqMasukf2q");
const tlunakK6liqHunaqEl = kfe<HTMLSelectElement>("tlunakK6liqHunaq");
const tlunakK6liqXEl = kfe<HTMLInputElement>("tlunakK6liqX");
const tlunakK6liqZEl = kfe<HTMLInputElement>("tlunakK6liqZ");
const tlunakK6liqRotEl = kfe<HTMLInputElement>("tlunakK6liqRot");
const tlunakK6liqStaciaEl = kfe<HTMLInputElement>("tlunakK6liqStacia");
const tlunakK6liqKonektitaEl = kfe<HTMLInputElement>("tlunakK6liqKonektita");
const tlunakK6liqAldoniBtn = kfe<HTMLButtonElement>("tlunakK6liqAldoni");
const tlunakK6liqH2liBtn = kfe<HTMLButtonElement>("tlunakK6liqH2li");
export let sukf2qitaK6h6 = 0o0;
export let sukf2qitaN2k = -0o1;
export let sukf2qitaQakaj2 = 0o0;
let k6h6Ilo: string = "movu";
type K6h6Celo = { pudal: "n2k"; k6h6: number; n2k: number }
  | { pudal: "qakaj2"; qakaj2: number }

  | { pudal: "qakaj2N2k"; qakaj2: number }

  | { pudal: "qakaj2Lando"; qakaj2: number }
  | { pudal: "k6h6"; k6h6: number };
export let k6h6Trenata: K6h6Celo | null = null;

let qakaj2PintaKozunu: { x: number; z: number; ax: number; az: number } | null = null;

let qakaj2LandaKozunu: { x: number; z: number } | null = null;

export const QAKAJ2PROFUNDOMIN = 0o4;
export const QAKAJ2PROFUNDOMAKS = 0o44;

export function qakaj2N2k(d: Knat6keqanuTap2Qoxa): { x: number; z: number } {
  const s2sabo = d.s2sabo ?? 0o0;
  const p2somani = ( d.jufu || 0o20 ) / 0o2;
  return { x: d.x - Math.sin(s2sabo) * p2somani, z: d.z - Math.cos(s2sabo) * p2somani };
}

export function qakaj2LandaCet2(d: Knat6keqanuTap2Qoxa): { x: number; z: number } {
  const s2sabo = d.s2sabo ?? 0o0;
  const p2somani = ( d.jufu || 0o20 ) / 0o2;
  return { x: d.x + Math.sin(s2sabo) * p2somani, z: d.z + Math.cos(s2sabo) * p2somani };
}

const k6h6Masukf2q = kfe<HTMLSelectElement>("k6h6Masukf2q");
const k6h6KsakaEl = kfe<HTMLInputElement>("k6h6Ksaka");
const k6h6LargxoEl = kfe<HTMLInputElement>("k6h6Largxo");
const k6h6AldoniBtn = kfe<HTMLButtonElement>("k6h6Aldoni");
const k6h6H2liBtn = kfe<HTMLButtonElement>("k6h6H2li");
const k6h6KonektiBtn = kfe<HTMLButtonElement>("k6h6Konekti");
const k6h6N2kMasukf2q = kfe<HTMLSelectElement>("k6h6N2kMasukf2q");
const k6h6N2kAldoniBtn = kfe<HTMLButtonElement>("k6h6N2kAldoni");
const k6h6N2kH2liBtn = kfe<HTMLButtonElement>("k6h6N2kH2li");
const k6h6N2kXEl = kfe<HTMLInputElement>("k6h6N2kX");
const k6h6N2kZEl = kfe<HTMLInputElement>("k6h6N2kZ");
const qakaj2Masukf2q = kfe<HTMLSelectElement>("qakaj2Masukf2q");
const qakaj2XEl = kfe<HTMLInputElement>("qakaj2X");
const qakaj2ZEl = kfe<HTMLInputElement>("qakaj2Z");
const qakaj2ProfundoEl = kfe<HTMLInputElement>("qakaj2Profundo");
const qakaj2S2saboEl = kfe<HTMLInputElement>("qakaj2S2sabo");
const qakaj2AldoniBtn = kfe<HTMLButtonElement>("qakaj2Aldoni");
const qakaj2H2liBtn = kfe<HTMLButtonElement>("qakaj2H2li");

export function qox2n2kPlano() {
  if ( !qox2n2kPlanoCache ) {
    const u = hakaxte[sukf2qitaKaxte];
    qox2n2kPlanoCache = kf2Qox2n2kB6vakantan(
      { ptaluPal6: qox2n2kPal6, k6liqPal6: qox2n2kK6liq, hahufwuk2: qox2n2kHahufwuk2 },
      qox2n2kHatik, u && u.tlunakHak6liq ? u.tlunakHak6liq : []);
    const ofsX = qox2n2kOfsX, ofsZ = qox2n2kOfsZ;
    for ( const v of hak6h6 ) {
      if ( !v.n2k || v.n2k.length < 0o2 ) continue;
      for ( let i = 0o0; i < v.n2k.length - 0o1; i++ ) {
        const a = v.n2k[i], b = v.n2k[i + 0o1];
        if ( Math.abs(a[0o0] - b[0o0]) < 0o10 ** -0o7 ) {
          const haxekuxa = a[0o0] - ofsX;
          if ( qox2n2kPlanoCache.hak6h6.some(r => r.kanto === "NS" && Math.abs(r.haxekuxa - haxekuxa) < 0o10 ** -0o7) )
            tlunakK6h6n(qox2n2kPlanoCache, "NS", haxekuxa,
              Math.min(a[0o1], b[0o1]) - ofsZ, Math.max(a[0o1], b[0o1]) - ofsZ, true);
        } else if ( Math.abs(a[0o1] - b[0o1]) < 0o10 ** -0o7 ) {
          const haxekuxa = a[0o1] - ofsZ;
          if ( qox2n2kPlanoCache.hak6h6.some(r => r.kanto === "EW" && Math.abs(r.haxekuxa - haxekuxa) < 0o10 ** -0o7) )
            tlunakK6h6n(qox2n2kPlanoCache, "EW", haxekuxa,
              Math.min(a[0o0], b[0o0]) - ofsX, Math.max(a[0o0], b[0o0]) - ofsX, true);
        }
      }
    }
  }
  return qox2n2kPlanoCache;
}

const kaxtejPlanoj = new Map<number, Qox2n2kB6vakanta>();
export function b6vakantaDeKaxte(i: number): Qox2n2kB6vakanta | null {
  if ( i === sukf2qitaKaxte ) return qox2n2kPlano();
  const u = hakaxte[i];
  if ( !u ) return null;
  let b6vakanta = kaxtejPlanoj.get(i);
  if ( !b6vakanta ) {
    b6vakanta = kf2Qox2n2kB6vakantan(
      { ptaluPal6: u.ptaluPal6, k6liqPal6: u.k6liqPal6, hahufwuk2: u.hahufwuk2 !== false },
      superajElVop2(u.hateru) ?? new Map(), u.tlunakHak6liq ?? []);
    kaxtejPlanoj.set(i, b6vakanta);
  }
  return b6vakanta;
}

export function vidotajHaqox2n2k() {
  const tseuni: { vecax2lani: number; b6vakanta: Qox2n2kB6vakanta; ofsX: number; ofsZ: number }[] = [];
  for ( const i of laqazendajHakaxte() ) {
    const u = hakaxte[i];
    if ( !u ) continue;
    const b6vakanta = b6vakantaDeKaxte(i);
    if ( !b6vakanta ) continue;
    tseuni.push({ vecax2lani: i, b6vakanta, ofsX: u.ofsX, ofsZ: u.ofsZ });
  }
  return tseuni;
}
export function tlak2Qox2n2k() {
  qox2n2kPlanoCache = null;
  kaxtejPlanoj.clear();
  qox2n2kPlano();
  tlak2KradajnHavop2kekai();
  vepaqTom6Qox2n2kn3D();

  if ( tona3d && !k6h6Trenata ) vepaqTom6Hak6h6n3D();
  s2tasDesegnon();
}
function tlak2KradajnHavop2kekai() {
  const el = kfe<HTMLElement>("qox2n2kHavop2kekai");
  if ( !el || !qox2n2kPlanoCache ) return;
  const b6vakanta = qox2n2kPlanoCache;
  const hajeqani = validiQox2n2k(b6vakanta).filter(p => !p.s2kanta.startsWith("simetrio-"));
  const kozuni = `${b6vakanta.haKekkozusai.length} ſɭɹ ſןᴜ · ${b6vakanta.paqj.length} ſɭᴜ ſןɹ · ${b6vakanta.hak6h6.length} ſɭэ ֭ſɭэ · ${b6vakanta.hatohtanu.length} hatohtanu`;
  el.textContent = hajeqani.length
    ? kozuni + ` , ✗ ${hajeqani.length} ſɭᴜ ſɭ,w , ${hajeqani.slice(0o0, 0o3).map(p => p.s2kanta).join(", ")}`
    : kozuni + " , ✓ ſɭᴜ ſןɜ ｡";
}

export function tlak2KaxteMasukf2q() {
  kaxteMasukf2q.innerHTML = "";
  hakaxte.forEach(( u, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = u.ksaka + " ( " + u.ofsX + ", " + u.ofsZ + " )";
    kaxteMasukf2q.appendChild(o);
  });
  kaxteMasukf2q.value = String(sukf2qitaKaxte);
  kaxteKsakaEl.value = hakaxte[sukf2qitaKaxte]?.ksaka ?? "";
  kaxteH2liBtn.disabled = hakaxte.length <= 0o1;

  refresxigiVidon();
}

export function sukf2qiKaxten(i: number) {
  sukf2qitaKaxte = Math.max(0o0, Math.min(hakaxte.length - 0o1, i));
  const u = hakaxte[sukf2qitaKaxte];
  if ( !u ) return;
  qox2n2kPal6 = u.ptaluPal6;
  qox2n2kK6liq = u.k6liqPal6;
  qox2n2kOfsX = u.ofsX;
  qox2n2kOfsZ = u.ofsZ;
  qox2n2kKekufxeso = !!u.kekufxeso;
  qox2n2kHahufwuk2 = u.hahufwuk2 !== false;
  qox2n2kHatik = superajElVop2(u.hateru) ?? new Map();
  qox2n2kPal6El.value = String(qox2n2kPal6);
  qox2n2kK6liqEl.value = qox2n2kK6liq;
  qox2n2kOfsXEl.value = String(qox2n2kOfsX);
  qox2n2kOfsZEl.value = String(qox2n2kOfsZ);
  qox2n2kKekufxesoEl.checked = qox2n2kKekufxeso;
  qox2n2kHahufwuk2El.checked = qox2n2kHahufwuk2;
  kaxteKsakaEl.value = u.ksaka;
  tlak2KaxteMasukf2q();
  tlak2AldonaHak6liq();

  panauKaxten(sukf2qitaKaxte);
  tlak2Qox2n2k();
}

function skribiSukf2qitanKaxten() {
  const u = hakaxte[sukf2qitaKaxte];
  if ( !u ) return;
  u.ptaluPal6 = qox2n2kPal6;
  u.k6liqPal6 = qox2n2kK6liq;
  u.ofsX = qox2n2kOfsX;
  u.ofsZ = qox2n2kOfsZ;
  u.kekufxeso = qox2n2kKekufxeso;
  u.hahufwuk2 = qox2n2kHahufwuk2;
  sinkronigiHatik();
  s2tasVeq6k2itan();
}

export function tlak2AldonaHak6liq() {
  if ( !tlunakK6liqMasukf2q ) return;
  const u = hakaxte[sukf2qitaKaxte];
  const hak6liq = u && u.tlunakHak6liq ? u.tlunakHak6liq : [];
  tlunakK6liqMasukf2q.innerHTML = "";
  hak6liq.forEach(( b, i: number ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = ( b.kuk ? "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ" : ALDONATIPONOMOJ[b.hunaq] || b.hunaq ) + ( b.c2k ? " 🛣️" : "" ) + " ( " + b.x + ", " + b.z + " )";
    tlunakK6liqMasukf2q.appendChild(o);
  });
  sukf2qitaNek2resaiK6liq = hak6liq.length ? Math.max(0o0, Math.min(hak6liq.length - 0o1, sukf2qitaNek2resaiK6liq)) : -0o1;
  tlunakK6liqMasukf2q.value = String(Math.max(0o0, sukf2qitaNek2resaiK6liq));
  tlunakK6liqH2liBtn.disabled = hak6liq.length === 0o0;
  const b = hak6liq[sukf2qitaNek2resaiK6liq];
  if ( b ) {
    tlunakK6liqHunaqEl.value = b.hunaq;
    tlunakK6liqXEl.value = String(b.x);
    tlunakK6liqZEl.value = String(b.z);
    tlunakK6liqRotEl.value = String(b.rot ?? 0o0);
    tlunakK6liqStaciaEl.checked = !!b.kuk;
    tlunakK6liqKonektitaEl.checked = !!b.c2k;
  }
  s2tasDesegnon();
}

function skribiAldonanBlokon() {
  const u = hakaxte[sukf2qitaKaxte];
  const hak6liq = u && u.tlunakHak6liq ? u.tlunakHak6liq : [];
  const b = hak6liq[sukf2qitaNek2resaiK6liq];
  if ( !b ) return;
  b.hunaq = tlunakK6liqHunaqEl.value as K2paHunaq;
  b.x = Math.round(( parseFloat(tlunakK6liqXEl.value) || 0o0 ) * 0o2) / 0o2;
  b.z = Math.round(( parseFloat(tlunakK6liqZEl.value) || 0o0 ) * 0o2) / 0o2;
  b.rot = parseFloat(tlunakK6liqRotEl.value) || 0o0;
  b.kuk = tlunakK6liqStaciaEl.checked;
  b.c2k = tlunakK6liqKonektitaEl.checked;
  s2tasVeq6k2itan();
}
const ALDONATIPONOMOJ = { qaman2: "ſɭᴜ ſɭ,ɔ ŋᷠɹ ɽ͑ʃ'ꞇɔ˞", turo: "ſɭᴜ ᶅſw ſɭɹ", kap2: "ſɭᴜ ſןɹ", geqqa: "ſɭᴜ ɭʃɜ ʌ ſɭᴜ ɭʃɜ", kasafeo: "ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɹ ɭʃɜ", ka5asexaz: "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ" };

export function tlunakK6liqJeN2k(mx: number, mz: number) {
  const u = hakaxte[sukf2qitaKaxte];
  const hak6liq = u && u.tlunakHak6liq ? u.tlunakHak6liq : [];
  const duonw = bal2.width / 0o2, duonh = bal2.height / 0o2;
  const sx = duonw - ( mx - vidCX() ) * kix2P6zuk();
  const sy = duonh - ( mz - vidCZ() ) * kix2P6zuk();
  for ( let i = 0o0; i < hak6liq.length; i++ ) {
    const b = hak6liq[i];
    const bx = duonw - ( qox2n2kOfsX + b.x - vidCX() ) * kix2P6zuk();
    const bz = duonh - ( qox2n2kOfsZ + b.z - vidCZ() ) * kix2P6zuk();
    if ( Math.hypot(bx - sx, bz - sy) < 0o16 ) return i;
  }
  return -0o1;
}

export function saxeiAldonaTrenon(i: number) {
  if ( tlunakTrenata >= 0o0 ) return;
  momenti();
  tlunakTrenata = i;
  s2tasVeq6k2itan();
  statuso("ſɭэ j͐ʃꞇ ｡ ɭʃᴜ");
  s2tasDesegnon();
}
export function sxangiAldonaXekuxan(mx: number, mz: number) {
  const u = hakaxte[sukf2qitaKaxte];
  const hak6liq = u && u.tlunakHak6liq ? u.tlunakHak6liq : [];
  const b = hak6liq[tlunakTrenata];
  if ( !b ) return;
  b.x = Math.round(( mx - qox2n2kOfsX ) * 0o2) / 0o2;
  b.z = Math.round(( mz - qox2n2kOfsZ ) * 0o2) / 0o2;
  tlak2AldonaHak6liq();
  tlak2Qox2n2k();
  s2tasDesegnon();
}
export function finiAldonaTrenon() {
  if ( tlunakTrenata < 0o0 ) return;
  tlunakTrenata = -0o1;
  tlak2AldonaHak6liq();
  tlak2Qox2n2k();
  s2tasDesegnon();
}

export function tlak2K6h6jnHakaman() {
  if ( !k6h6Masukf2q ) return;
  qox2n2kPlanoCache = null;
  kaxtejPlanoj.clear();
  if ( tona3d && !k6h6Trenata ) vepaqTom6Hak6h6n3D();
  k6h6Masukf2q.innerHTML = "";
  hak6h6.forEach(( v, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = ( v.ksaka || "ſɭэ ֭ſɭэ" ) + " ( " + v.n2k.length + " pkt )";
    k6h6Masukf2q.appendChild(o);
  });
  sukf2qitaK6h6 = Math.max(0o0, Math.min(hak6h6.length - 0o1, sukf2qitaK6h6));
  k6h6Masukf2q.value = String(sukf2qitaK6h6);
  k6h6H2liBtn.disabled = hak6h6.length <= 0o1;
  const v = hak6h6[sukf2qitaK6h6];
  if ( v ) {
    k6h6KsakaEl.value = v.ksaka || "";
    k6h6LargxoEl.value = String(v.sefini || 0o7/0o2);
    k6h6N2kMasukf2q.innerHTML = "";
    v.n2k.forEach(( p, j: number ) => {
      const o = document.createElement("option");
      o.value = String(j);
      o.textContent = "}ʃɹƽ " + ( j + 0o1 ) + " ( " + p[0o0] + ", " + p[0o1] + " )";
      k6h6N2kMasukf2q.appendChild(o);
    });
    sukf2qitaN2k = Math.max(0o0, Math.min(v.n2k.length - 0o1, sukf2qitaN2k));
    k6h6N2kMasukf2q.value = String(sukf2qitaN2k);
    k6h6N2kH2liBtn.disabled = v.n2k.length <= 0o2;
    const p = v.n2k[sukf2qitaN2k];
    if ( p ) {
      k6h6N2kXEl.value = String(p[0o0]);
      k6h6N2kZEl.value = String(p[0o1]);
    }
  } else {
    k6h6KsakaEl.value = "";
    k6h6LargxoEl.value = "3.5";
    k6h6N2kMasukf2q.innerHTML = "";
    k6h6N2kH2liBtn.disabled = true;
  }
  qakaj2Masukf2q.innerHTML = "";
  haqakaj2.forEach(( d, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = "ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ " + ( i + 0o1 ) + " ( " + d.x + ", " + d.z + " )";
    qakaj2Masukf2q.appendChild(o);
  });
  sukf2qitaQakaj2 = Math.max(0o0, Math.min(haqakaj2.length - 0o1, sukf2qitaQakaj2));
  qakaj2Masukf2q.value = String(sukf2qitaQakaj2);
  qakaj2H2liBtn.disabled = haqakaj2.length <= 0o1;
  const d = haqakaj2[sukf2qitaQakaj2];
  if ( d ) {
    qakaj2XEl.value = String(d.x);
    qakaj2ZEl.value = String(d.z);
    qakaj2ProfundoEl.value = String(d.jufu || 0o20);
    qakaj2S2saboEl.value = String(d.s2sabo ?? 0o0);
  }
  tlak2K6h6Havop2kekai();
}

function skribiK6h6Sekure() {
  const v = hak6h6[sukf2qitaK6h6];
  if ( !v ) return;
  const kopio: Knat6keqanuK6h6N2k = { ...v, n2k: v.n2k.map(p => [ ...p ] as K6h6N2k) };
  const kox2qisNe3ak2 = k6h6Vakox2q(v, sukf2qitaK6h6);
  v.ksaka = k6h6KsakaEl.value;
  v.sefini = parseFloat(k6h6LargxoEl.value) || 0o7/0o2;
  const p = v.n2k[sukf2qitaN2k];
  if ( p ) {
    p[0o0] = parseFloat(k6h6N2kXEl.value) || 0o0;
    p[0o1] = parseFloat(k6h6N2kZEl.value) || 0o0;
  }
  if ( p && ( sukf2qitaN2k === 0o0 || sukf2qitaN2k === v.n2k.length - 0o1 ) ) {
    const tsiike = sukf2qitaN2k === 0o0 ? v.n2k[0o1] : v.n2k[v.n2k.length - 0o2];
    const algluo = k6h6Algluo(p[0o0], p[0o1], sukf2qitaK6h6, tsiike);
    if ( algluo ) {
      p[0o0] = algluo[0o0];
      p[0o1] = algluo[0o1];
    }
  }
  if ( k6h6Vakox2q(v, sukf2qitaK6h6) && !kox2qisNe3ak2 ) {
    hak6h6[sukf2qitaK6h6] = kopio;
    statuso("ſɭэ ֭ſɭэ ｡ ſɭɜ j͐ʃɹ ｡ 🛑");
  }
  s2tasVeq6k2itan();
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
}

function skribiQakaj2Sekure() {
  const d = haqakaj2[sukf2qitaQakaj2];
  if ( !d ) return;
  const kopio = { ...d };
  const kox2qisNe3ak2 = qakaj2Vakox2q(d, sukf2qitaQakaj2);

  const antaupaRot = d.s2sabo ?? 0o0;
  const sef4Rot = parseFloat(qakaj2S2saboEl.value) || 0o0;
  const s2saboMano = Math.abs(sef4Rot - antaupaRot) > 0o10 ** -0o12;
  d.x = parseFloat(qakaj2XEl.value) || 0o0;
  d.z = parseFloat(qakaj2ZEl.value) || 0o0;
  d.jufu = Math.max(0o4, parseFloat(qakaj2ProfundoEl.value) || 0o20);
  if ( s2saboMano ) d.s2sabo = sef4Rot;
  else orientiQakaj2n(d, sukf2qitaQakaj2);
  if ( qakaj2Vakox2q(d, sukf2qitaQakaj2) && !kox2qisNe3ak2 ) {
    haqakaj2[sukf2qitaQakaj2] = kopio;
    statuso("ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ ſɭэ ֭ſɭэ ｡ 🛑");
  }
  s2tasVeq6k2itan();
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
}

function tlak2K6h6Havop2kekai() {
  const el = kfe<HTMLElement>("k6h6Havop2kekai");
  if ( !el ) return;
  const sahakani = hak6h6.reduce(( s, v ) => s + v.n2k.reduce(( a, p, i: number ) => {
    if ( i === 0o0 ) return a;
    const q = v.n2k[i - 0o1];
    return a + Math.hypot(p[0o0] - q[0o0], p[0o1] - q[0o1]);
  }, 0o0), 0o0);
  const hakox2qo = k6h6jHakox2qo();
  el.textContent = hak6h6.length + " ſɭэ ֭ſɭэ ( " + sahakani.toFixed(0o1) + " un ) · "
    + haqakaj2.length + " ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ · " + k6h6Haveb6kek() + " ſɟɹƽ 🔗 · "
    + ( hakox2qo.totalo ? hakox2qo.totalo + " ſɭɜ j͐ʃɹ ( "
      + hakox2qo.k6h6K6h6 + " ſɭэ ֭ſɭэ ŋᷠɹ , " + hakox2qo.k6h6Qakaj2
      + " ſɭэ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ , " + hakox2qo.qakaj2Qakaj2 + " ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ŋᷠɹ ) ⚠️" : "0 ſɭɜ j͐ʃɹ ✓" );
}

function k6h6Haveb6kek() {
  let haveb6kek = 0o0;
  for ( let vi = 0o0; vi < hak6h6.length; vi++ ) {
    const v = hak6h6[vi];
    if ( v.n2k.length < 0o2 ) continue;
    for ( const pi of [ 0o0, v.n2k.length - 0o1 ] ) {
      const p = v.n2k[pi];
      const tsiike = pi === 0o0 ? v.n2k[0o1] : v.n2k[v.n2k.length - 0o2];
      if ( k6h6Algluo(p[0o0], p[0o1], vi, tsiike) ) haveb6kek++;
    }
  }
  for ( const d of haqakaj2 ) {
    if ( hak6h6.some(v => qakaj2KonektasK6h6n(d, v)) ) haveb6kek++;
  }
  return haveb6kek;
}

const K6H6ATUSXATOLERANCO = 0o1/0o1000;

export function k6h6P2somaniSefini(v: Knat6keqanuK6h6N2k): number {
  return caxlefkakaiK6h6P2somaniSefini(v);
}

function k6h6Veb6kekaP2somani(v: Knat6keqanuK6h6N2k): number {
  return caxlefkakaiK6h6Veb6kekaP2somani(v);
}

export function c2kanuP2somaniSefini(v: Knat6keqanuK6h6N2k): number {
  return caxlefkakaiK6h6P2somaniSefini(v);
}

function k6h6Vakox2q(v: Knat6keqanuK6h6N2k, kromK6h6: number): boolean {
  return caxlefkakaiK6h6Vakox2q(v, hak6h6, haqakaj2, kromK6h6);
}

function qakaj2Vakox2q(d: Knat6keqanuTap2Qoxa, kromQakaj2: number, kromK6h6 = -0o1): boolean {
  return caxlefkakaiQakaj2Vakox2q(d, haqakaj2, hak6h6, kromQakaj2, kromK6h6);
}

function qakaj2KonektasK6h6n(d: Knat6keqanuTap2Qoxa, v: Knat6keqanuK6h6N2k): boolean {
  return qakaj2KonektasK6h6nCaxlefkakai(d, v);
}

function k6h6Projekcio(px: number, pz: number, a: K6h6N2k, b: K6h6N2k) {
  return caxlefkakaiK6h6Projekcio(px, pz, a, b);
}

function konektiQakaj2nAlK6h6(d: Knat6keqanuTap2Qoxa, kromQakaj2: number) {
  const tsasa = tsasaTseuni ? tsekeTsasa : undefined;
  return caxlefkakaiKonektiQakaj2nAlK6h6(d, hak6h6, haqakaj2, kromQakaj2, tsasa);
}

function konektiHaqakaj2nAlHak6h6n() {
  let haveb6kek = 0o0;
  for ( let di = 0o0; di < haqakaj2.length; di++ ) {
    if ( konektiQakaj2nAlK6h6(haqakaj2[di], di) ) haveb6kek++;
  }
  return haveb6kek;
}

const QAKAJ2AKVAPASOJ = 0o40;
const QAKAJ2AKVAMULTOJ = [ 0o1/0o2, 0o1, 0o7/0o4, 0o3, 0o5 ];
const QAKAJ2AKVAFLANKOJ = [ -0o3/0o5, 0o0, 0o3/0o5 ];
function distoHatafkaq(a: number, b: number): number {
  const d = Math.abs(a - b) % ( 0o2 * Math.PI );
  return Math.min(d, 0o2 * Math.PI - d);
}
function tsasaTafkaq(d: Knat6keqanuTap2Qoxa): number | null {
  if ( !tsasaTseuni ) return null;
  const p2somani = ( d.jufu || 0o20 ) / 0o2;
  const cutlu = d.s2sabo ?? 0o0;
  let kmaTafkaq = cutlu, kmaPoento = -Infinity;
  for ( let i = 0o0; i < QAKAJ2AKVAPASOJ; i++ ) {
    const ang = i * 0o2 * Math.PI / QAKAJ2AKVAPASOJ;
    const sx = -Math.sin(ang), sz = -Math.cos(ang);
    let poento = 0o0;
    for ( const mult of QAKAJ2AKVAMULTOJ ) {
      const r = p2somani * mult;
      for ( const vek2fe of QAKAJ2AKVAFLANKOJ ) {
        if ( tsekeTsasa(d.x + sx * r - sz * r * vek2fe, d.z + sz * r + sx * r * vek2fe) ) poento += mult;
      }
    }
    if ( !tsekeTsasa(d.x - sx * p2somani * 0o3, d.z - sz * p2somani * 0o3) ) poento += 0o1/0o2;
    if ( poento > kmaPoento + 0o10 ** -0o12
      || ( Math.abs(poento - kmaPoento) <= 0o10 ** -0o12
        && distoHatafkaq(ang, cutlu) < distoHatafkaq(kmaTafkaq, cutlu) ) ) {
      kmaPoento = poento;
      kmaTafkaq = ang;
    }
  }
  return kmaPoento > 0o0 ? kmaTafkaq : null;
}

export function orientiQakaj2n(d: Knat6keqanuTap2Qoxa, kromQakaj2 = -0o1): boolean {
  const antaupa = d.s2sabo ?? 0o0;
  if ( konektiQakaj2nAlK6h6(d, kromQakaj2) ) return ( d.s2sabo ?? 0o0 ) !== antaupa;
  const tafkaq = tsasaTafkaq(d);
  if ( tafkaq === null || Math.abs(tafkaq - antaupa) < 0o10 ** -0o12 ) return false;
  if ( qakaj2Vakox2q({ ...d, s2sabo: tafkaq }, kromQakaj2) ) return false;
  d.s2sabo = tafkaq;
  return true;
}

function k6h6jHakox2qo() {
  return caxlefkakaiK6h6jHakox2qj(hak6h6, haqakaj2);
}

export function kaxteJeN2k(mx: number, mz: number) {
  const duonw = bal2.width / 0o2, duonh = bal2.height / 0o2;
  const sx = duonw - ( mx - vidCX() ) * kix2P6zuk();
  const sy = duonh - ( mz - vidCZ() ) * kix2P6zuk();
  for ( let i = 0o0; i < hakaxte.length; i++ ) {
    const u = hakaxte[i];
    const ux = duonw - ( u.ofsX - vidCX() ) * kix2P6zuk();
    const uz = duonh - ( u.ofsZ - vidCZ() ) * kix2P6zuk();
    if ( Math.hypot(ux - sx, uz - sy) < 0o14 ) return i;
  }
  return -0o1;
}

function tuxaNala(r: number): number {
  const rekt = bal2.getBoundingClientRect();
  const sefini = rekt.width || bal2.width;
  return r * ( bal2.width / sefini ) / kix2P6zuk();
}
function k6h6CeloJeN2k(mx: number, mz: number, s2tonaHan2kn = false): K6h6Celo | null {
  const r = tuxaNala(0o10);
  let plosteq: K6h6Celo | null = null, kmaD = r;
  if ( !s2tonaHan2kn ) {
    for ( let vi = 0o0; vi < hak6h6.length; vi++ ) {
      const v = hak6h6[vi];
      for ( let pi = 0o0; pi < v.n2k.length; pi++ ) {
        const p = v.n2k[pi];
        const d = Math.hypot(p[0o0] - mx, p[0o1] - mz);
        if ( d < kmaD ) { kmaD = d; plosteq = { pudal: "n2k", k6h6: vi, n2k: pi }; }
      }
    }
    if ( plosteq ) return plosteq;
  }

  let kmaQakaj2: { pudal: "qakaj2N2k" | "qakaj2Lando"; qakaj2: number } | null = null;
  let kmaQakaj2D = r;
  for ( let di = 0o0; di < haqakaj2.length; di++ ) {
    for ( const [ pudal, n2k ] of [ [ "qakaj2N2k", qakaj2N2k(haqakaj2[di]) ],
      [ "qakaj2Lando", qakaj2LandaCet2(haqakaj2[di]) ] ] as [ "qakaj2N2k" | "qakaj2Lando", { x: number; z: number } ][] ) {
      const d = Math.hypot(n2k.x - mx, n2k.z - mz);
      if ( d < kmaQakaj2D ) { kmaQakaj2D = d; kmaQakaj2 = { pudal, qakaj2: di }; }
    }
  }
  if ( kmaQakaj2 ) return kmaQakaj2;
  for ( let di = 0o0; di < haqakaj2.length; di++ ) {
    const d = haqakaj2[di];
    const prof = d.jufu || 0o20;
    const s2sabo = d.s2sabo ?? 0o0;
    const dx = mx - d.x, dz = mz - d.z;
    const lx = dx * Math.cos(s2sabo) - dz * Math.sin(s2sabo);
    const lz = dx * Math.sin(s2sabo) + dz * Math.cos(s2sabo);
    if ( Math.abs(lx) < 0o16/0o10 + 0o5/0o2 && Math.abs(lz) < prof / 0o2 + 0o5/0o2 ) return { pudal: "qakaj2", qakaj2: di };
  }
  for ( let vi = 0o0; vi < hak6h6.length; vi++ ) {
    const v = hak6h6[vi];
    for ( let pi = 0o0; pi < v.n2k.length - 0o1; pi++ ) {
      const a = v.n2k[pi], b = v.n2k[pi + 0o1];
      const l = Math.hypot(b[0o0] - a[0o0], b[0o1] - a[0o1]) || 0o1;
      const t = Math.max(0o0, Math.min(0o1, ( ( mx - a[0o0] ) * ( b[0o0] - a[0o0] ) + ( mz - a[0o1] ) * ( b[0o1] - a[0o1] ) ) / ( l * l )));
      const d = Math.hypot(a[0o0] + t * ( b[0o0] - a[0o0] ) - mx, a[0o1] + t * ( b[0o1] - a[0o1] ) - mz);
      if ( d < ( v.sefini || 0o7/0o2 ) / 0o2 + 0o3/0o2 + r ) return { pudal: "k6h6", k6h6: vi };
    }
  }
  return null;
}

export function vasakaK6h6nCelon(mx: number, mz: number) {

  const proks = k6h6CeloJeN2k(mx, mz, k6h6Ilo === "tlunak");
  if ( k6h6Ilo === "h2li" ) {
    if ( proks && proks.pudal === "n2k" ) { h2liK6h6nPunkton(proks.k6h6, proks.n2k); return; }
    statuso("}ʃɹƽ ʌ ſɭэ ֭ſɭэ ｡ 📍 ( ſɭэ ֭ſɭэ ｡ ſɭɜ )");
    return;
  }
  if ( k6h6Ilo === "tlunak" ) {

    const vi = proks && proks.pudal === "k6h6" ? proks.k6h6 : sukf2qitaK6h6;
    tlunakK6h6nPunkton(vi, mx, mz);
    return;
  }
  if ( proks && proks.pudal === "n2k" ) {
    sukf2qitaK6h6 = proks.k6h6;
    sukf2qitaN2k = proks.n2k;
    if ( k6h6Ilo === "movu" ) saxeiK6h6Trenon({ pudal: "n2k", k6h6: proks.k6h6, n2k: proks.n2k });
  } else if ( proks && proks.pudal === "qakaj2N2k" ) {
    sukf2qitaQakaj2 = proks.qakaj2;
    if ( k6h6Ilo === "movu" ) saxeiK6h6Trenon({ pudal: "qakaj2N2k", qakaj2: proks.qakaj2 });
  } else if ( proks && proks.pudal === "qakaj2" ) {
    sukf2qitaQakaj2 = proks.qakaj2;
    if ( k6h6Ilo === "movu" ) saxeiK6h6Trenon({ pudal: "qakaj2", qakaj2: proks.qakaj2 });
  } else if ( proks && proks.pudal === "k6h6" ) {
    sukf2qitaK6h6 = proks.k6h6;
    sukf2qitaN2k = -0o1;
  } else {
    sukf2qitaN2k = -0o1;
  }
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
}

function saxeiK6h6Trenon(natakatomasai: K6h6Celo): void {
  if ( k6h6Trenata ) return;
  momenti();
  qakaj2PintaKozunu = null;
  qakaj2LandaKozunu = null;
  if ( natakatomasai.pudal === "qakaj2N2k" ) {
    const d = haqakaj2[natakatomasai.qakaj2];
    if ( !d ) return;

    const s2sabo = d.s2sabo ?? 0o0;
    const p2somani = ( d.jufu || 0o20 ) / 0o2;
    const sx = Math.sin(s2sabo), cz = Math.cos(s2sabo);
    qakaj2PintaKozunu = { x: d.x + sx * p2somani, z: d.z + cz * p2somani, ax: -sx, az: -cz };
  } else if ( natakatomasai.pudal === "qakaj2Lando" ) {
    const d = haqakaj2[natakatomasai.qakaj2];
    if ( !d ) return;

    const n2k = qakaj2N2k(d);
    qakaj2LandaKozunu = { x: n2k.x, z: n2k.z };
  }
  k6h6Trenata = natakatomasai;
  s2tasVeq6k2itan();
  statuso("ſɭэ j͐ʃꞇ ｡ ɭʃᴜ");
  s2tasDesegnon();
}

function qox2n2kK6h6Alglu(mx: number, mz: number) {

  const n2k = kmaTsiikeCet2(qox2n2kCet2j(), mx, mz);
  if (n2k) return [ n2k[0o0], n2k[0o1] ];
  const b6vakanta = qox2n2kPlano();
  const ofsX = qox2n2kOfsX, ofsZ = qox2n2kOfsZ;
  const pukaz = 0o5/0o2;
  let plosteq = null, kmaD = pukaz;
  for ( const r of b6vakanta.hak6h6 ) {
    if ( r.kanto === "NS" ) {
      const wx = ofsX + r.haxekuxa;
      const d = Math.abs(mx - wx);
      if ( d < kmaD ) { kmaD = d; plosteq = [ wx, Math.round(mz * 0o2) / 0o2 ]; }
    } else {
      const wz = ofsZ + r.haxekuxa;
      const d = Math.abs(mz - wz);
      if ( d < kmaD ) { kmaD = d; plosteq = [ Math.round(mx * 0o2) / 0o2, wz ]; }
    }
  }
  return plosteq;
}
function qox2n2kS2nasceAlglu(ax: number, az: number, bx: number, bz: number) {
  const b6vakanta = qox2n2kPlano();
  const ofsX = qox2n2kOfsX, ofsZ = qox2n2kOfsZ;
  const pukaz = 0o5/0o2;
  const dx = bx - ax, dz = bz - az;
  if ( Math.hypot(dx, dz) < 0o10 ** -0o7 ) return null;
  if ( Math.abs(dx) <= 0o1/0o4 * Math.abs(dz) ) {
    let plosteq = null, kmaD = pukaz;
    for ( const r of b6vakanta.hak6h6 ) {
      if ( r.kanto !== "NS" ) continue;
      const wx = ofsX + r.haxekuxa;
      const d = Math.max(Math.abs(ax - wx), Math.abs(bx - wx));
      if ( d < kmaD ) { kmaD = d; plosteq = wx; }
    }
    if ( plosteq !== null ) return { linioX: plosteq, linioZ: null };
  }
  if ( Math.abs(dz) <= 0o1/0o4 * Math.abs(dx) ) {
    let plosteq = null, kmaD = pukaz;
    for ( const r of b6vakanta.hak6h6 ) {
      if ( r.kanto !== "EW" ) continue;
      const wz = ofsZ + r.haxekuxa;
      const d = Math.max(Math.abs(az - wz), Math.abs(bz - wz));
      if ( d < kmaD ) { kmaD = d; plosteq = wz; }
    }
    if ( plosteq !== null ) return { linioX: null, linioZ: plosteq };
  }
  return null;
}

const K6H6APINTARANDO = 0o5/0o2;

const qox2n2kPintajKobeoj = new WeakMap<Qox2n2kB6vakanta, K6h6N2k[]>();

function qox2n2kRelativajCet2j(b6vakanta: Qox2n2kB6vakanta): K6h6N2k[] {
  const hidden = qox2n2kPintajKobeoj.get(b6vakanta);
  if (hidden) return hidden;
  const arto = new Map<string, K6h6N2k>();
  const tlunakani = (x: number, z: number): void => {
    const ca3aq = x + "," + z;
    if (!arto.has(ca3aq)) arto.set(ca3aq, [ x, z ]);
  };
  const ns = b6vakanta.hak6h6.filter(r => r.kanto === "NS");
  const ew = b6vakanta.hak6h6.filter(r => r.kanto === "EW");
  for (const r of ns) { tlunakani(r.haxekuxa, r.l6); tlunakani(r.haxekuxa, r.sai); }
  for (const r of ew) { tlunakani(r.l6, r.haxekuxa); tlunakani(r.sai, r.haxekuxa); }
  for (const a of ns) for (const b of ew) {
    if (b.haxekuxa < a.l6 - 0o10 ** -0o7 || b.haxekuxa > a.sai + 0o10 ** -0o7) continue;
    if (a.haxekuxa < b.l6 - 0o10 ** -0o7 || a.haxekuxa > b.sai + 0o10 ** -0o7) continue;
    tlunakani(a.haxekuxa, b.haxekuxa);
  }
  for (const s of b6vakanta.hatohtanu) {
    tlunakani(s.l6[0o0], s.l6[0o1]);
    tlunakani(s.sai[0o0], s.sai[0o1]);
  }
  const tseuni = [ ...arto.values() ];
  qox2n2kPintajKobeoj.set(b6vakanta, tseuni);
  return tseuni;
}

function qox2n2kCet2j(): K6h6N2k[] {
  const n2k: K6h6N2k[] = [];
  const hakix2 = new Set<string>();
  for (const k of vidotajHaqox2n2k()) {
    for (const p of qox2n2kRelativajCet2j(k.b6vakanta)) {
      const x = k.ofsX + p[0o0], z = k.ofsZ + p[0o1], ca3aq = x + "," + z;
      if (hakix2.has(ca3aq)) continue;
      hakix2.add(ca3aq);
      n2k.push([ x, z ]);
    }
  }
  return n2k;
}

function pintajAlgluoj(kromK6h6 = -0o1): K6h6N2k[] {
  const n2k = qox2n2kCet2j();
  const hakix2 = new Set<string>(n2k.map(p => p[0o0] + "," + p[0o1]));
  const tlunakani = (x: number, z: number): void => {
    const ca3aq = x + "," + z;
    if (hakix2.has(ca3aq)) return;
    hakix2.add(ca3aq);
    n2k.push([ x, z ]);
  };
  for (let vi = 0o0; vi < hak6h6.length; vi++) {
    if (vi === kromK6h6) continue;
    for (const p of hak6h6[vi].n2k) tlunakani(p[0o0], p[0o1]);
  }
  for (const d of haqakaj2) {
    const r = caxlefkakaiQakaj2LandaS2nasce(d);
    tlunakani(r.x, r.z);
  }
  return n2k;
}

function kmaTsiikeCet2(n2k: K6h6N2k[], mx: number, mz: number): K6h6N2k | null {
  let plosteq: K6h6N2k | null = null, kmaD = K6H6APINTARANDO;
  for (const p of n2k) {
    const d = Math.hypot(p[0o0] - mx, p[0o1] - mz);
    if (d < kmaD) { kmaD = d; plosteq = p; }
  }
  return plosteq;
}

const K6H6AALGLUARANDO = 0o5/0o2;
function k6h6Algluo(mx: number, mz: number, kromK6h6: number, tsiike: K6h6N2k | null = null) {

  const n2k = kmaTsiikeCet2(pintajAlgluoj(kromK6h6), mx, mz);
  if (n2k) return [ n2k[0o0], n2k[0o1] ];
  let plosteq = null, kmaD = Infinity;
  for ( let vi = 0o0; vi < hak6h6.length; vi++ ) {
    if ( vi === kromK6h6 ) continue;
    const v = hak6h6[vi];
    const p2somani = k6h6Veb6kekaP2somani(v);
    const pukaz = K6H6AALGLUARANDO + p2somani;
    for ( let pi = 0o0; pi < v.n2k.length - 0o1; pi++ ) {
      const a = v.n2k[pi], b = v.n2k[pi + 0o1];
      const phaka = k6h6Projekcio(mx, mz, a, b);
      if ( !phaka || phaka.d > pukaz ) continue;
      const dx = b[0o0] - a[0o0], dz = b[0o1] - a[0o1], sahakani = Math.hypot(dx, dz);
      const nx = -dz / sahakani, nz = dx / sahakani;

      if ( sahakani > 0o0 ) {
        const tlakakA = phaka.t * sahakani <= K6H6AALGLUARANDO;
        const tlakakB = ( 0o1 - phaka.t ) * sahakani <= K6H6AALGLUARANDO;
        if ( tlakakA || tlakakB ) {
          const tlakakani = tlakakA && ( !tlakakB
            || Math.hypot(a[0o0] - mx, a[0o1] - mz) <= Math.hypot(b[0o0] - mx, b[0o1] - mz) ) ? a : b;
          const dtlakak = Math.hypot(tlakakani[0o0] - mx, tlakakani[0o1] - mz);
          if ( dtlakak < kmaD ) { kmaD = dtlakak; plosteq = [ tlakakani[0o0], tlakakani[0o1] ]; }
        }
      }
      const flankX = tsiike ? tsiike[0o0] : mx, flankZ = tsiike ? tsiike[0o1] : mz;
      const flankoVem2 = ( flankX - phaka.x ) * nx + ( flankZ - phaka.z ) * nz;
      const vek2fe = Math.abs(flankoVem2) < K6H6ATUSXATOLERANCO
        ? ( ( mx - phaka.x ) * nx + ( mz - phaka.z ) * nz >= 0o0 ? 0o1 : -0o1 )
        : ( flankoVem2 >= 0o0 ? 0o1 : -0o1 );
      const kandidato = [ phaka.x + nx * p2somani * vek2fe, phaka.z + nz * p2somani * vek2fe ];
      const kandidataD = Math.hypot(kandidato[0o0] - mx, kandidato[0o1] - mz);
      if ( kandidataD < kmaD ) { kmaD = kandidataD; plosteq = kandidato; }
    }
  }
  for ( let di = 0o0; di < haqakaj2.length; di++ ) {
    const d = haqakaj2[di], r = caxlefkakaiQakaj2LandaS2nasce(d);
    const phaka = k6h6Projekcio(mx, mz, [ r.x - r.dx * QAKAJ2KOZUNUASEFINI / 0o2, r.z - r.dz * QAKAJ2KOZUNUASEFINI / 0o2 ],
      [ r.x + r.dx * QAKAJ2KOZUNUASEFINI / 0o2, r.z + r.dz * QAKAJ2KOZUNUASEFINI / 0o2 ]);
    if ( !phaka || phaka.d > K6H6AALGLUARANDO + QAKAJ2KOZUNUASEFINI / 0o2 ) continue;
    const kandidataD = Math.hypot(phaka.x - mx, phaka.z - mz);
    if ( kandidataD < kmaD ) { kmaD = kandidataD; plosteq = [ phaka.x, phaka.z ]; }
  }
  return plosteq;
}

function h2liDuoblajnHan2kn(v: Knat6keqanuK6h6N2k): number {
  let hane3unak = 0o0;
  for ( let i = v.n2k.length - 0o1; i > 0o0 && v.n2k.length > 0o2; i-- ) {
    const a = v.n2k[i], b = v.n2k[i - 0o1];
    if ( Math.hypot(a[0o0] - b[0o0], a[0o1] - b[0o1]) < 0o10 ** -0o7 ) { v.n2k.splice(i, 0o1); hane3unak++; }
  }
  return hane3unak;
}

function konektiK6h6jntlakakjn() {
  let haveb6kek = 0o0;
  for ( let vi = 0o0; vi < hak6h6.length; vi++ ) {
    const v = hak6h6[vi];
    if ( !v.n2k || v.n2k.length < 0o2 ) continue;
    const z2hak = v.n2k.length - 0o1;
    for ( const pi of [ 0o0, z2hak ] ) {
      const p = v.n2k[pi], h2y2k = [ p[0o0], p[0o1] ];
      const tsiike = pi === 0o0 ? v.n2k[0o1] : v.n2k[z2hak - 0o1];
      const algluo = k6h6Algluo(p[0o0], p[0o1], vi, tsiike);
      if ( !algluo ) continue;
      if ( Math.hypot(algluo[0o0] - p[0o0], algluo[0o1] - p[0o1]) < 0o10 ** -0o7 ) continue;
      const kiuKunfandisNe3ak2 = k6h6Vakox2q(v, vi);
      p[0o0] = algluo[0o0];
      p[0o1] = algluo[0o1];
      if ( k6h6Vakox2q(v, vi) && ! kiuKunfandisNe3ak2 ) {
        p[0o0] = h2y2k[0o0];
        p[0o1] = h2y2k[0o1];
        continue;
      }
      haveb6kek++;
    }
    h2liDuoblajnHan2kn(v);
  }
  return haveb6kek;
}

export function sxangiK6h6Xekuxan(mx: number, mz: number) {
  if ( !k6h6Trenata ) return;
  const c = k6h6Trenata;
  if ( c.pudal === "n2k" ) {
    const v = hak6h6[c.k6h6];
    if ( !v || !v.n2k[c.n2k] ) return;
    const pi = c.n2k;
    const h2y2kj = new Map();
    for ( const ni of [ pi - 0o1, pi, pi + 0o1 ] ) {
      if ( ni >= 0o0 && ni < v.n2k.length ) h2y2kj.set(ni, [ ...v.n2k[ni] ]);
    }
    const qox2n2kAlgluo = qox2n2kK6h6Alglu(mx, mz);
    const tsiike = pi > 0o0 ? v.n2k[pi - 0o1] : v.n2k[0o1];
    const k6h6 = k6h6Algluo(mx, mz, c.k6h6, tsiike);

    const dKrada = qox2n2kAlgluo ? Math.hypot(qox2n2kAlgluo[0o0] - mx, qox2n2kAlgluo[0o1] - mz) : Infinity;
    const dK6h6 = k6h6 ? Math.hypot(k6h6[0o0] - mx, k6h6[0o1] - mz) : Infinity;

    const n2k = kmaTsiikeCet2(pintajAlgluoj(c.k6h6), mx, mz);
    let gx, gz;
    if ( n2k ) { gx = n2k[0o0]; gz = n2k[0o1]; }
    else if ( qox2n2kAlgluo && dKrada <= dK6h6 ) { gx = qox2n2kAlgluo[0o0]; gz = qox2n2kAlgluo[0o1]; }
    else if ( k6h6 ) { gx = k6h6[0o0]; gz = k6h6[0o1]; }
    else { gx = Math.round(mx * 0o2) / 0o2; gz = Math.round(mz * 0o2) / 0o2; }
    let linioX = null, linioZ = null;
    for ( const ni of [ pi - 0o1, pi + 0o1 ] ) {
      const n = v.n2k[ni];
      if ( !n ) continue;
      const s = qox2n2kS2nasceAlglu(n[0o0], n[0o1], gx, gz);
      if ( !s ) continue;
      if ( s.linioX !== null ) { n[0o0] = s.linioX; linioX = s.linioX; }
      else { n[0o1] = s.linioZ; linioZ = s.linioZ; }
    }

    if ( !n2k ) {
      if ( linioX !== null ) gx = linioX;
      if ( linioZ !== null ) gz = linioZ;
    }
    v.n2k[pi] = [ gx, gz ];
    if ( k6h6Vakox2q(v, c.k6h6) ) {
      for ( const [ ni, p ] of h2y2kj ) v.n2k[ni] = p;
      statuso("ſɭэ ֭ſɭэ ｡ ſɭɜ j͐ʃɹ ｡ 🛑");
      return;
    }
    sukf2qitaN2k = pi;
  } else if ( c.pudal === "qakaj2" ) {
    const d = haqakaj2[c.qakaj2];
    if ( !d ) return;
    const antaupa = { ...d };
    d.x = Math.round(mx * 0o2) / 0o2;
    d.z = Math.round(mz * 0o2) / 0o2;

    orientiQakaj2n(d, c.qakaj2);
    if ( qakaj2Vakox2q(d, c.qakaj2) ) {
      Object.assign(d, antaupa);
      statuso("ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ ſɭэ ֭ſɭэ ｡ 🛑");
      return;
    }
    sukf2qitaQakaj2 = c.qakaj2;
  } else if ( c.pudal === "qakaj2N2k" ) {
    const d = haqakaj2[c.qakaj2];
    if ( !d || !qakaj2PintaKozunu ) return;
    const antaupa = { ...d };

    const b = qakaj2PintaKozunu;
    const t = ( mx - b.x ) * b.ax + ( mz - b.z ) * b.az;
    const prof = Math.round(Math.max(QAKAJ2PROFUNDOMIN, Math.min(QAKAJ2PROFUNDOMAKS, t)) * 0o2) / 0o2;
    d.jufu = prof;
    d.x = Math.round(( b.x + b.ax * prof / 0o2 ) * 0o2) / 0o2;
    d.z = Math.round(( b.z + b.az * prof / 0o2 ) * 0o2) / 0o2;
    if ( qakaj2Vakox2q(d, c.qakaj2) ) {
      Object.assign(d, antaupa);
      statuso("ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ ſɭэ ֭ſɭэ ｡ 🛑");
      return;
    }
  } else if ( c.pudal === "qakaj2Lando" ) {
    const d = haqakaj2[c.qakaj2];
    if ( !d || !qakaj2LandaKozunu ) return;
    const antaupa = { ...d };

    const b = qakaj2LandaKozunu;
    const dx = mx - b.x, dz = mz - b.z;
    const sahakani = Math.hypot(dx, dz);
    if ( sahakani < 0o1/0o100 ) return;
    const prof = Math.round(Math.max(QAKAJ2PROFUNDOMIN, Math.min(QAKAJ2PROFUNDOMAKS, sahakani)) * 0o2) / 0o2;
    const ux = dx / sahakani, uz = dz / sahakani;
    d.jufu = prof;
    d.s2sabo = Math.atan2(ux, uz);
    d.x = Math.round(( b.x + ux * prof / 0o2 ) * 0o2) / 0o2;
    d.z = Math.round(( b.z + uz * prof / 0o2 ) * 0o2) / 0o2;
    if ( qakaj2Vakox2q(d, c.qakaj2) ) {
      Object.assign(d, antaupa);
      statuso("ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ ſɭэ ֭ſɭэ ｡ 🛑");
      return;
    }
    sukf2qitaQakaj2 = c.qakaj2;
  }
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
}

export function finiK6h6Trenon() {
  if ( !k6h6Trenata ) return;
  if ( k6h6Trenata.pudal === "n2k" ) {
    const v = hak6h6[k6h6Trenata.k6h6];
    if ( v ) h2liDuoblajnHan2kn(v);
  }
  if ( k6h6Trenata.pudal === "qakaj2N2k" ) {

    const d = haqakaj2[k6h6Trenata.qakaj2];
    if ( d ) orientiQakaj2n(d, k6h6Trenata.qakaj2);
  }
  qakaj2PintaKozunu = null;
  qakaj2LandaKozunu = null;
  k6h6Trenata = null;
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
}

function tlunakK6h6nPunkton(vi: number, mx: number, mz: number): boolean {
  const v = hak6h6[vi];
  if ( !v || !v.n2k ) {
    statuso("ſɭэ ֭ſɭэ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ｡");
    return false;
  }
  const kopio: Knat6keqanuK6h6N2k = { ...v, n2k: v.n2k.map(p => [ ...p ] as K6h6N2k) };
  const kox2qisNe3ak2 = k6h6Vakox2q(v, vi);

  const sukf2qisCxiTiu = sukf2qitaK6h6 === vi && sukf2qitaN2k >= 0o0;
  const sukf2qitaAntaue = sukf2qitaN2k;
  momenti();
  sukf2qitaK6h6 = vi;
  let nx = Math.round(mx * 0o2) / 0o2;
  let nz = Math.round(mz * 0o2) / 0o2;
  if ( v.n2k.length < 0o2 ) {
    v.n2k.push([ nx, nz ]);
    sukf2qitaN2k = v.n2k.length - 0o1;
  } else {

    const z2hak = v.n2k.length - 0o1;
    let plosteq = 0o0, kmaD = Infinity, kmaT = 0o0;
    const projekcii = ( pi: number ): void => {
      const a = v.n2k[pi], b = v.n2k[pi + 0o1];
      const l = Math.hypot(b[0o0] - a[0o0], b[0o1] - a[0o1]) || 0o1;
      const t = Math.max(0o0, Math.min(0o1, ( ( mx - a[0o0] ) * ( b[0o0] - a[0o0] ) + ( mz - a[0o1] ) * ( b[0o1] - a[0o1] ) ) / ( l * l )));
      const d = Math.hypot(a[0o0] + t * ( b[0o0] - a[0o0] ) - mx, a[0o1] + t * ( b[0o1] - a[0o1] ) - mz);
      if ( d < kmaD ) { kmaD = d; plosteq = pi; kmaT = t; }
    };
    if ( sukf2qisCxiTiu && sukf2qitaAntaue <= z2hak ) {

      const km = sukf2qitaAntaue < z2hak ? sukf2qitaAntaue : Math.max(0o0, z2hak - 0o1);
      plosteq = km;
      projekcii(km);

      if ( kmaT < 0.2 || kmaT > 0.8 ) kmaT = (0o1/0o2);
      kmaD = 0o0;
    } else {
      for ( let pi = 0o0; pi < z2hak; pi++ ) projekcii(pi);
    }
    const a = v.n2k[plosteq], b = v.n2k[plosteq + 0o1];
    nx = a[0o0] + kmaT * ( b[0o0] - a[0o0] );
    nz = a[0o1] + kmaT * ( b[0o1] - a[0o1] );

    const seg = qox2n2kS2nasceAlglu(a[0o0], a[0o1], b[0o0], b[0o1]);
    if ( seg ) {
      if ( seg.linioX !== null ) {
        a[0o0] = seg.linioX; b[0o0] = seg.linioX; nx = seg.linioX;
      } else {
        a[0o1] = seg.linioZ; b[0o1] = seg.linioZ; nz = seg.linioZ;
      }
    } else {
      const qox2n2k = qox2n2kK6h6Alglu(nx, nz);
      if ( qox2n2k && Math.hypot(qox2n2k[0o0] - nx, qox2n2k[0o1] - nz) <= 0o1/0o2 ) {
        nx = qox2n2k[0o0]; nz = qox2n2k[0o1];
      } else {
        const algluo = k6h6Algluo(mx, mz, vi);
        if ( algluo && Math.hypot(algluo[0o0] - nx, algluo[0o1] - nz) <= 0o3/0o2 ) {
          nx = algluo[0o0]; nz = algluo[0o1];
        }
      }
    }
    nx = Math.round(nx * 0o2) / 0o2;
    nz = Math.round(nz * 0o2) / 0o2;
    v.n2k.splice(plosteq + 0o1, 0o0, [ nx, nz ]);
    sukf2qitaN2k = plosteq + 0o1;
  }
  if ( k6h6Vakox2q(v, vi) && !kox2qisNe3ak2 ) {
    hak6h6[vi] = kopio;
    sukf2qitaN2k = Math.min(sukf2qitaN2k, kopio.n2k.length - 0o1);
    statuso("}ʃɹƽ ʌ j͑ʃɔ ſȷэⅎ ｡ ſɭэ ֭ſɭэ ｡ 🛑");
    tlak2K6h6jnHakaman();
    s2tasDesegnon();
    return false;
  }
  h2liDuoblajnHan2kn(v);
  const trovi = v.n2k.findIndex(p => p[0o0] === nx && p[0o1] === nz);
  sukf2qitaN2k = trovi >= 0o0 ? trovi
    : Math.max(0o0, Math.min(sukf2qitaN2k, v.n2k.length - 0o1));
  const kreskis = v.n2k.length > kopio.n2k.length;
  if ( !kreskis ) statuso("}ʃɹƽ ｡ ſɟᴜ ｡");
  if ( JSON.stringify(v.n2k) === JSON.stringify(kopio.n2k) ) {
    tlak2K6h6jnHakaman();
    s2tasDesegnon();
    return false;
  }
  s2tasVeq6k2itan();
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
  return kreskis;
}

function h2liK6h6nPunkton(vi: number, pi: number) {
  const v = hak6h6[vi];
  if ( !v || v.n2k.length <= 0o2 ) {
    statuso("ſɭэ ֭ſɭэ ｡ ſɭɜ ｡ 🚫");
    return;
  }
  momenti();
  v.n2k.splice(pi, 0o1);
  sukf2qitaK6h6 = vi;
  sukf2qitaN2k = Math.max(0o0, pi - 0o1);
  s2tasVeq6k2itan();
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
}

export function vasakaKradanCelon(mx: number, mz: number) {

  for ( const k of vidotajHaqox2n2k() ) {
    if ( k.vecax2lani === sukf2qitaKaxte ) continue;
    const kc = Math.round(( mx - k.ofsX ) / k.b6vakanta.TONA);
    const kr = Math.round(( mz - k.ofsZ ) / k.b6vakanta.TONA);
    if ( k.b6vakanta.haKekkozusai.some(( [ lc, lr ] ) => lc === kc && lr === kr) ) {
      sukf2qiKaxten(k.vecax2lani);
      statuso("ſɭᴜ ı],ƨɔ " + ( hakaxte[k.vecax2lani]?.ksaka ?? "" ) + " 🏙️");
      s2tasDesegnon();
      return;
    }
  }
  const b6vakanta = qox2n2kPlano();
  const TONA = b6vakanta.TONA;
  const c = Math.round(( mx - qox2n2kOfsX ) / TONA);
  const r = Math.round(( mz - qox2n2kOfsZ ) / TONA);
  if ( qox2n2kK6liq === "kvar" ) {
    const K6LIQ = 0o10;
    const cx = qox2n2kOfsX + c * TONA, cz = qox2n2kOfsZ + r * TONA;
    let plosteq = "NE", kmaD = Infinity;
    const hatafkaq: [ number, number, string ][] = [ [ K6LIQ, K6LIQ, "NE" ], [ -K6LIQ, K6LIQ, "NW" ], [ -K6LIQ, -K6LIQ, "SW" ], [ K6LIQ, -K6LIQ, "SE" ] ];
    for ( const [ sx, sz, ksaka ] of hatafkaq ) {
      const d = Math.hypot(mx - ( cx + sx ), mz - ( cz + sz ));
      if ( d < kmaD ) { kmaD = d; plosteq = ksaka; }
    }
    const ŝ = c + "," + r + "," + String(plosteq);
    if ( qox2n2kHunaqSukf2qita === "automata" ) {
      if ( !qox2n2kHatik.delete(ŝ) ) return;
    } else {
      if ( Math.abs(c * TONA + qox2n2kOfsX) > MONDOHALFO || Math.abs(r * TONA + qox2n2kOfsZ) > MONDOHALFO ) return;
      qox2n2kHatik.set(ŝ, qox2n2kHunaqSukf2qita);
    }
    sinkronigiHatik();

    s2tasVeq6k2itan();
    statuso("ſɭэ j͐ʃꞇ ｡ ɭʃᴜ");
    tlak2Qox2n2k();
    return;
  }
  const ŝ = c + "," + r;
  if ( qox2n2kHunaqSukf2qita === "automata" ) {
    if ( !qox2n2kHatik.delete(ŝ) ) return;
  } else {
    if ( Math.abs(c * TONA + qox2n2kOfsX) > MONDOHALFO || Math.abs(r * TONA + qox2n2kOfsZ) > MONDOHALFO ) return;
    qox2n2kHatik.set(ŝ, qox2n2kHunaqSukf2qita);
  }
  sinkronigiHatik();
  s2tasVeq6k2itan();
  statuso("ſɭэ j͐ʃꞇ ｡ ɭʃᴜ");
  tlak2Qox2n2k();
}

const KRADAJHAWEH2: Record<string, string> = {
  qaman2: "#e0b840",
  turo: "#98a8b8",
  kap2: "#c08858",
  geqqa: "#e07050",
  kasafeo: "#6898d8",
  ka5asexaz: "#9868e0",
};

export function k2fKradanTavolon(k: CanvasRenderingContext2D, b6vakanta: Qox2n2kB6vakanta,
  X: ( x: number ) => number, Z: ( z: number ) => number, p6zukani: number): void {
  k.lineWidth = 0o7/0o2 * p6zukani;
  k.strokeStyle = "rgba(216,216,224,0.9)";
  k.beginPath();
  for ( const v of b6vakanta.hak6h6 ) {
    if ( v.kanto === "EW" ) { k.moveTo(X(v.l6), Z(v.haxekuxa)); k.lineTo(X(v.sai), Z(v.haxekuxa)); }
    else { k.moveTo(X(v.haxekuxa), Z(v.l6)); k.lineTo(X(v.haxekuxa), Z(v.sai)); }
  }
  k.stroke();
  k.lineWidth = Math.max(0o1, 0o55/0o40 * p6zukani);
  k.strokeStyle = "rgba(255,255,255,0.55)";
  k.beginPath();
  for ( const sp of b6vakanta.hatohtanu ) {
    k.moveTo(X(sp.l6[0o0]), Z(sp.l6[0o1]));
    k.lineTo(X(sp.sai[0o0]), Z(sp.sai[0o1]));
  }
  k.stroke();
  const radu = 0o265/0o40 * p6zukani;
  for ( const b of b6vakanta.paqj ) {
    const sx = X(b.x), sy = Z(b.z);
    const weh2 = b.kuk ? KRADAJHAWEH2.ka5asexaz : KRADAJHAWEH2[b.hunaq];
    k.fillStyle = weh2;
    k.beginPath();
    for ( let q = 0o0; q < 0o4; q++ ) {
      const ang = b.rot + Math.PI / 0o4 + q * Math.PI / 0o2;
      const px = sx + Math.cos(ang) * radu;
      const py = sy + Math.sin(ang) * radu;
      if ( q === 0o0 ) k.moveTo(px, py); else k.lineTo(px, py);
    }
    k.closePath();
    k.fill();
    k.strokeStyle = "rgba(0,0,0,0.35)";
    k.lineWidth = 0o1;
    k.stroke();
    const pdx = X(b.x + Math.sin(b.rot) * 0o13/0o2);
    const pdz = Z(b.z + Math.cos(b.rot) * 0o13/0o2);
    k.fillStyle = "rgba(255,255,255,0.9)";
    k.beginPath();
    k.arc(pdx, pdz, Math.max(0o3/0o2, 0o115/0o100 * p6zukani), 0o0, Math.PI * 0o2);
    k.fill();
  }
}

hakfe<HTMLButtonElement>("#haqox2n2k button").forEach(b => {
  b.addEventListener("click", () => {
    qox2n2kHunaqSukf2qita = ( b.dataset.qox2n2kHunaq as K2paHunaq | undefined ) ?? "automata";
    hakfe<HTMLButtonElement>("#haqox2n2k button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
kaxteMasukf2q.addEventListener("change", () => sukf2qiKaxten(parseInt(kaxteMasukf2q.value, 0o12) || 0o0));
kaxteKsakaEl.addEventListener("input", () => {
  const u = hakaxte[sukf2qitaKaxte];
  if ( !u ) return;
  u.ksaka = kaxteKsakaEl.value;
  tlak2KaxteMasukf2q();
  s2tasVeq6k2itan();
  s2tasDesegnon();
});
kaxteAldoniBtn.addEventListener("click", () => {
  hakaxte.push({ ksaka: "ſɭᴜ ı],ƨɔ ʌ j͑ʃɔ ſȷэⅎ", ptaluPal6: 0o1, k6liqPal6: "vakox2qita", ofsX: 0o200, ofsZ: -0o200, tlunakHak6liq: [] });
  sukf2qiKaxten(hakaxte.length - 0o1);
  s2tasVeq6k2itan();
  s2tasDesegnon();
});
kaxteH2liBtn.addEventListener("click", () => {
  if ( hakaxte.length <= 0o1 ) return;
  h2luKaxten(sukf2qitaKaxte);
  hakaxte.splice(sukf2qitaKaxte, 0o1);
  sukf2qiKaxten(Math.max(0o0, sukf2qitaKaxte - 0o1));
  s2tasVeq6k2itan();
  s2tasDesegnon();
});
qox2n2kPal6El.addEventListener("change", () => { qox2n2kPal6 = parseInt(qox2n2kPal6El.value, 0o12); skribiSukf2qitanKaxten(); tlak2Qox2n2k(); });
qox2n2kK6liqEl.addEventListener("change", () => { qox2n2kK6liq = qox2n2kK6liqEl.value as "vakox2qita" | "kvar"; skribiSukf2qitanKaxten(); tlak2Qox2n2k(); });
qox2n2kOfsXEl.addEventListener("change", () => { qox2n2kOfsX = parseFloat(qox2n2kOfsXEl.value) || 0o0; skribiSukf2qitanKaxten(); tlak2KaxteMasukf2q(); tlak2Qox2n2k(); });
qox2n2kOfsZEl.addEventListener("change", () => { qox2n2kOfsZ = parseFloat(qox2n2kOfsZEl.value) || 0o0; skribiSukf2qitanKaxten(); tlak2KaxteMasukf2q(); tlak2Qox2n2k(); });
qox2n2kKekufxesoEl.addEventListener("change", () => { qox2n2kKekufxeso = qox2n2kKekufxesoEl.checked; skribiSukf2qitanKaxten(); tlak2Qox2n2k(); });
qox2n2kHahufwuk2El.addEventListener("change", () => { qox2n2kHahufwuk2 = qox2n2kHahufwuk2El.checked; skribiSukf2qitanKaxten(); tlak2Qox2n2k(); });
tlunakK6liqMasukf2q.addEventListener("change", () => {
  sukf2qitaNek2resaiK6liq = parseInt(tlunakK6liqMasukf2q.value, 0o12) || 0o0;
  tlak2AldonaHak6liq();
  s2tasDesegnon();
});
tlunakK6liqHunaqEl.addEventListener("change", () => {
  skribiAldonanBlokon();
  const u = hakaxte[sukf2qitaKaxte];
  const hak6liq = u && u.tlunakHak6liq ? u.tlunakHak6liq : [];
  const b = hak6liq[sukf2qitaNek2resaiK6liq];
  if ( b && b.kuk && b.hunaq !== "ka5asexaz" ) {
    tlunakK6liqStaciaEl.checked = false;
    skribiAldonanBlokon();
  }
  tlak2AldonaHak6liq();
  tlak2Qox2n2k();
});
tlunakK6liqXEl.addEventListener("change", () => { skribiAldonanBlokon(); tlak2AldonaHak6liq(); tlak2Qox2n2k(); });
tlunakK6liqZEl.addEventListener("change", () => { skribiAldonanBlokon(); tlak2AldonaHak6liq(); tlak2Qox2n2k(); });
tlunakK6liqRotEl.addEventListener("change", () => { skribiAldonanBlokon(); tlak2Qox2n2k(); });
tlunakK6liqStaciaEl.addEventListener("change", () => { skribiAldonanBlokon(); tlak2AldonaHak6liq(); tlak2Qox2n2k(); });
tlunakK6liqKonektitaEl.addEventListener("change", () => { skribiAldonanBlokon(); tlak2AldonaHak6liq(); tlak2Qox2n2k(); });
tlunakK6liqAldoniBtn.addEventListener("click", () => {
  const u = hakaxte[sukf2qitaKaxte];
  if ( !u ) return;
  momenti();
  if ( !u.tlunakHak6liq ) u.tlunakHak6liq = [];
  const vepat6ni = qox2n2kK6liq === "kvar" ? 0o40 : 0o30;
  const ka5asexazZ = qox2n2kK6liq === "kvar" ? 0o0 : qox2n2kPal6 * vepat6ni + 0o30;
  u.tlunakHak6liq.push({ x: 0o0, z: ka5asexazZ, hunaq: "ka5asexaz", rot: Math.PI, c2w2q: "sost2", kuk: true, c2k: true });
  sukf2qitaNek2resaiK6liq = u.tlunakHak6liq.length - 0o1;
  s2tasVeq6k2itan();
  tlak2AldonaHak6liq();
  tlak2Qox2n2k();
});
tlunakK6liqH2liBtn.addEventListener("click", () => {
  const u = hakaxte[sukf2qitaKaxte];
  const hak6liq = u && u.tlunakHak6liq ? u.tlunakHak6liq : [];
  if ( !hak6liq.length ) return;
  momenti();
  hak6liq.splice(sukf2qitaNek2resaiK6liq, 0o1);
  sukf2qitaNek2resaiK6liq = Math.max(0o0, sukf2qitaNek2resaiK6liq - 0o1);
  s2tasVeq6k2itan();
  tlak2AldonaHak6liq();
  tlak2Qox2n2k();
});
k6h6Masukf2q.addEventListener("change", () => {
  sukf2qitaK6h6 = parseInt(k6h6Masukf2q.value, 0o12) || 0o0;
  sukf2qitaN2k = -0o1;
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
});
k6h6KsakaEl.addEventListener("input", () => {
  const v = hak6h6[sukf2qitaK6h6];
  if ( !v ) return;
  v.ksaka = k6h6KsakaEl.value;
  s2tasVeq6k2itan();
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
});
k6h6LargxoEl.addEventListener("change", () => { skribiK6h6Sekure(); });
k6h6N2kMasukf2q.addEventListener("change", () => {
  sukf2qitaN2k = parseInt(k6h6N2kMasukf2q.value, 0o12) || 0o0;
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
});
k6h6N2kXEl.addEventListener("change", () => { skribiK6h6Sekure(); });
k6h6N2kZEl.addEventListener("change", () => { skribiK6h6Sekure(); });
k6h6AldoniBtn.addEventListener("click", () => {
  momenti();
  const v = hak6h6[sukf2qitaK6h6];
  const last: K6h6N2k = v && v.n2k && v.n2k.length ? v.n2k[v.n2k.length - 0o1] : [ 0o0, 0o0 ];
  const sef4: Knat6keqanuK6h6N2k = { ksaka: "ſɭэ ֭ſɭэ ʌ j͑ʃɔ ſȷэⅎ", sefini: 0o7/0o2, n2k: [
    [ Math.round(( last[0o0] - 0o12 ) * 0o2) / 0o2, last[0o1] ],
    [ Math.round(( last[0o0] + 0o12 ) * 0o2) / 0o2, last[0o1] ] ] };
  hak6h6.push(sef4);
  if ( k6h6Vakox2q(sef4, hak6h6.length - 0o1) ) {
    hak6h6.pop();
    statuso("ſɭэ ֭ſɭэ ʌ j͑ʃɔ ſȷэⅎ ｡ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ 🛑");
    return;
  }
  sukf2qitaK6h6 = hak6h6.length - 0o1;
  sukf2qitaN2k = -0o1;
  s2tasVeq6k2itan();
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
});
k6h6H2liBtn.addEventListener("click", () => {
  if ( hak6h6.length <= 0o1 ) return;
  momenti();
  hak6h6.splice(sukf2qitaK6h6, 0o1);
  sukf2qitaK6h6 = Math.max(0o0, sukf2qitaK6h6 - 0o1);
  sukf2qitaN2k = -0o1;
  s2tasVeq6k2itan();
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
});
k6h6KonektiBtn.addEventListener("click", () => {
  momenti();
  let k6h6jHaveb6kek = 0o0, hamov = 0o0, hac2q = 0o0;
  do {
    hamov = konektiK6h6jntlakakjn();
    k6h6jHaveb6kek += hamov;
  } while ( hamov > 0o0 && ++hac2q < hak6h6.length * 0o2 );
  const haqakaj2ajHaveb6kek = konektiHaqakaj2nAlHak6h6n();
  hamov = 0o0;
  hac2q = 0o0;
  do {
    hamov = konektiK6h6jntlakakjn();
    k6h6jHaveb6kek += hamov;
  } while ( hamov > 0o0 && ++hac2q < hak6h6.length * 0o2 );
  s2tasVeq6k2itan();
  tlak2K6h6jnHakaman();
  tlak2Qox2n2k();
  statuso("ſɟɹƽ " + k6h6jHaveb6kek + " ſɭэ ֭ſɭэ ｡ " + haqakaj2ajHaveb6kek + " ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ 🔗");
  s2tasDesegnon();
});
k6h6N2kAldoniBtn.addEventListener("click", () => {
  const v = hak6h6[sukf2qitaK6h6];
  if ( !v ) return;
  momenti();

  const sel = sukf2qitaN2k >= 0o0
    ? Math.max(0o0, Math.min(sukf2qitaN2k, v.n2k.length - 0o1))
    : v.n2k.length - 0o1;
  const a = v.n2k[sel];
  const b = v.n2k[sel + 0o1];
  const sef4: K6h6N2k = b
    ? [ Math.round(( a[0o0] + b[0o0] ) ) / 0o2, Math.round(( a[0o1] + b[0o1] ) ) / 0o2 ]
    : [ Math.round(( a[0o0] + 0o12 ) * 0o2) / 0o2, Math.round(a[0o1] * 0o2) / 0o2 ];
  v.n2k.splice(sel + 0o1, 0o0, sef4);
  sukf2qitaN2k = sel + 0o1;
  if ( k6h6Vakox2q(v, sukf2qitaK6h6) ) {
    v.n2k.splice(sel + 0o1, 0o1);
    sukf2qitaN2k = sel;
    statuso("}ʃɹƽ ʌ j͑ʃɔ ſȷэⅎ ｡ ſɭэ ֭ſɭэ ｡ 🛑");
  }
  s2tasVeq6k2itan();
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
});
k6h6N2kH2liBtn.addEventListener("click", () => {
  const v = hak6h6[sukf2qitaK6h6];
  if ( !v || v.n2k.length <= 0o2 ) return;
  momenti();
  v.n2k.splice(sukf2qitaN2k, 0o1);
  sukf2qitaN2k = Math.max(0o0, sukf2qitaN2k - 0o1);
  s2tasVeq6k2itan();
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
});
qakaj2Masukf2q.addEventListener("change", () => {
  sukf2qitaQakaj2 = parseInt(qakaj2Masukf2q.value, 0o12) || 0o0;
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
});
qakaj2XEl.addEventListener("change", () => { skribiQakaj2Sekure(); });
qakaj2ZEl.addEventListener("change", () => { skribiQakaj2Sekure(); });
qakaj2ProfundoEl.addEventListener("change", () => { skribiQakaj2Sekure(); });
qakaj2S2saboEl.addEventListener("change", () => { skribiQakaj2Sekure(); });
qakaj2AldoniBtn.addEventListener("click", () => {
  momenti();
  const last = haqakaj2[haqakaj2.length - 0o1];
  const sef4 = { x: last ? Math.round(( last.x + 0o30 ) * 0o2) / 0o2 : 0o0, z: last ? last.z : 0o0, jufu: 0o20, s2sabo: last ? ( last.s2sabo ?? 0o0 ) : 0o0 };
  haqakaj2.push(sef4);
  const vecax2lani = haqakaj2.length - 0o1;
  if ( qakaj2Vakox2q(sef4, vecax2lani) ) {
    haqakaj2.pop();
    statuso("ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ j͑ʃɔ ſȷэⅎ ｡ ſɭэ ֭ſɭэ ｡ 🛑");
    return;
  }
  orientiQakaj2n(sef4, vecax2lani);
  sukf2qitaQakaj2 = vecax2lani;
  s2tasVeq6k2itan();
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
});
qakaj2H2liBtn.addEventListener("click", () => {
  if ( haqakaj2.length <= 0o1 ) return;
  momenti();
  haqakaj2.splice(sukf2qitaQakaj2, 0o1);
  sukf2qitaQakaj2 = Math.max(0o0, sukf2qitaQakaj2 - 0o1);
  s2tasVeq6k2itan();
  tlak2K6h6jnHakaman();
  s2tasDesegnon();
});
hakfe<HTMLButtonElement>("#k6h6Hacaht2 button").forEach(b => {
  b.addEventListener("click", () => {
    k6h6Ilo = b.dataset.k6h6Ilo ?? "movu";
    hakfe<HTMLButtonElement>("#k6h6Hacaht2 button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
qox2n2kRestarigiBtn.addEventListener("click", () => { qox2n2kHatik.clear(); sinkronigiHatik(); s2tasVeq6k2itan(); statuso("ſɭэ j͐ʃꞇ ｡ ɭʃᴜ"); tlak2Qox2n2k(); });
qox2n2kKopiiBtn.addEventListener("click", async() => {
  const u = hakaxte[sukf2qitaKaxte];
  const s2banani = u
    ? `{ ksaka: "${u.ksaka}", ptaluPal6: ${u.ptaluPal6}, k6liqPal6: "${u.k6liqPal6}", ofsX: ${u.ofsX}, ofsZ: ${u.ofsZ} }`
    : "";
  try {
    await navigator.clipboard.writeText(s2banani);
    statuso("ſɟw ɭʃᴜ ｡ " + s2banani);
  } catch {
    statuso("ſɟw ɭʃᴜ ｡ ſɭɜ ſɭᴜ ｡ " + s2banani);
  }
});

