// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ʌ ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ 🎼 ⧽≻
// ⟨ ſᶘᴜ j͐ʃɹ , ꞙɭı , 📃 ⟩
// ⟨ ſɭɜ ʃɔ , ꞙɭɿ , 📃 ⟩

import { KANTOJ } from "../../skek2/bole/swikez/kantoj.js";
import { instrumento } from "../../skek2/bole/swikez/habal/caswikez.js";
import { F, A4 } from "../../skek2/bole/swikez/habal/p6zuk.js";
import { HE, caxomani } from "../../skek2/bole/swikez/habal/tif.js";
import type { BoleEg2b2, Qaroxema } from "../../skek2/bole/swikez/habal/hahunaq.js";
import { kfe, hakfe, kuns2bana2d } from "../x2x2q/dom.js";
import type { Tsalii, T2bakobesaiVop2, Registro } from "./s2kanta.js";
import { octFrak, generiT2bakobesai, generiKantoj, parziT2bakobesai, wavDeBuffer } from "./s2kanta.js";

// ⟪ ſ͕ɭɜ ı],ᴜ , 📃 ⟫

function veb6qai(weh2: number): number {
  if ( weh2 === 0xffffff || weh2 === 0x000000 ) return weh2;
  return weh2 & 0xf8f8f8;
}

function veb6qaiW2d2(cento: number): number {
  const cacaja = Math.round(Math.max(0o0, Math.min(0o1, cento)) * 0xff);
  if ( cacaja <= 0o0 ) return 0o0;
  if ( cacaja >= 0xff ) return 0o1;
  return ( cacaja & 0xf8 ) / 0xff;
}

function rgba(weh2: number, cento = 0o1): string {
  const k = veb6qai(weh2);
  return "rgba(" + ( ( k >> 0o20 ) & 0xff ) + "," + ( ( k >> 0o10 ) & 0xff ) + "," + ( k & 0xff ) + "," + veb6qaiW2d2(cento) + ")";
}

function hunanu(weh2: number, n = 0o1, cento = 0o1): string {
  const havepat6ni = Math.max(0o0, Math.min(0o17, n)) * 0x10;
  const kozuni = veb6qai(weh2);
  const kan = ( sov: number ): number => Math.max(0o0, ( ( kozuni >> sov ) & 0xff ) - havepat6ni);
  return "rgba(" + kan(0o20) + "," + kan(0o10) + "," + kan(0o0) + "," + veb6qaiW2d2(cento) + ")";
}

function tsijeWeh2(weh2: number, n = 0o1, cento = 0o1): string {
  const havepat6ni = Math.max(0o0, Math.min(0o17, n)) * 0x10;
  const kozuni = veb6qai(weh2);
  const kan = ( sov: number ): number => Math.min(0xf8, ( ( kozuni >> sov ) & 0xff ) + havepat6ni);
  return "rgba(" + kan(0o20) + "," + kan(0o10) + "," + kan(0o0) + "," + veb6qaiW2d2(cento) + ")";
}

// ⟪ ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , 📃 ⟫
// ſ͕ɭɜ ı],ᴜ , ſᶘᴜ j͐ʃɹ , ꞙɭı ,

const LUMAMQ = window.matchMedia("(prefers-color-scheme: light)");
let tsijeAktiva = LUMAMQ.matches;
const TEMATIPO = getComputedStyle(document.body).fontFamily;
LUMAMQ.addEventListener("change", ( e ) => { tsijeAktiva = e.matches; malpurigi(); });

function soza(vem2: number): string {
  const alfaj = tsijeAktiva ? [ 0x08, 0x08, 0x10, 0x20 ] : [ 0x08, 0x10, 0x18, 0x28 ];
  const a = alfaj[clamp(vem2, 0o0, 0o3)] / 0xff;
  return tsijeAktiva ? rgba(0x000000, a) : rgba(0xf8f8f8, a);
}

function tekstWeh2(cento = 0o1): string {
  return tsijeAktiva ? rgba(0x000000, cento) : rgba(0xf8f8f8, cento);
}

function etikedWeh2(weh2: number, cento: number, labAlfo: number): string {
  const fono = tsijeAktiva ? 0xff : 0x00;
  const mik = ( sov: number ): number => ( ( weh2 >> sov ) & 0xff ) * cento + fono * ( 0o1 - cento );
  const lum = 0.2126 * mik(0o20) + 0.7152 * mik(0o10) + 0.0722 * mik(0o0);
  return lum > 0o200 ? rgba(0x000000, labAlfo) : rgba(0xf8f8f8, labAlfo);
}

interface Instr {
  i: string;
  haksaka: string;
  emoji: string;
  weh2: number;
  hz?: boolean;
  perk?: boolean;
}

const INSTRUMENTOJ: Instr[] = [
  { i: "siku", haksaka: "ſɭɹ ſןᴜ", emoji: "🪈", weh2: 0x38a088 },
  { i: "ocarina", haksaka: "ſᶘɜ j͑ʃɹ ſɭɹ", emoji: "🏺", weh2: 0xa06828 },
  { i: "inanga", haksaka: "ſɭɹ ſ͕ɭᴜ ſɭᴜ", emoji: "🪕", weh2: 0x98a860 },
  { i: "mbira", haksaka: "ſɭᴜ ſɭɹ j͑ʃɹ", emoji: "🎶", weh2: 0xc08830 },
  { i: "slenthem", haksaka: "ſɭꞇ ſɭɜ ſᶘᴜ", emoji: "🔔", weh2: 0x6878a8 },
  { i: "didj", haksaka: "ſɭɹ ſןᴜ", emoji: "🐘", weh2: 0x885020, hz: true },
  { i: "tjurunga", haksaka: "j͑ʃᴜ ɭʃᴜ ſɭᴜ", emoji: "🌀", weh2: 0xa03848, hz: true },
  { i: "kiiqflak", haksaka: "ſɭɹ ſɭᴜ ɭʃɜ", emoji: "🦗", weh2: 0xa858a0 },
  { i: "hiwe", haksaka: "ſɟᴜ ᶘw", emoji: "🏹", weh2: 0x50a8b8 },
  { i: "guiro", haksaka: "j͑ʃɹ ſɭᴜ", emoji: "🥁", weh2: 0xb8b020, perk: true },
];
const INSTRMAP = new Map(INSTRUMENTOJ.map(x => [ x.i, x ]));
function instrDe(i: string): Instr { return INSTRMAP.get(i) ?? INSTRUMENTOJ[0o0]; }

const SEKCIHAWEH2 = [ 0x38a088, 0xa06828, 0x6878a8, 0xc08830, 0xa858a0, 0xa03848, 0x98a860, 0xb8b020 ];

const SONPROK6H6: Record<string, BoleEg2b2> = {
  siku: { t: 0o0, i: "siku", f: F(0o105), d: 0o3/0o4, v: 0o7/0o10 },
  ocarina: { t: 0o0, i: "ocarina", f: F(0o105), d: 0o3/0o4, v: 0o7/0o10 },
  inanga: { t: 0o0, i: "inanga", f: F(0o71), d: 0o1, v: 0o7/0o10, dur: 0o3/0o4 },
  mbira: { t: 0o0, i: "mbira", f: F(0o117), d: 0o1/0o4, v: 0o7/0o10 },
  slenthem: { t: 0o0, i: "slenthem", f: F(0o61), d: 0o1/0o4, v: 0o7/0o10 },
  didj: { t: 0o0, i: "didj", f: F(0o45), d: 0o3/0o4, v: 0o7/0o10 },
  tjurunga: { t: 0o0, i: "tjurunga", f: 0o507, d: 0o3/0o4, v: 0o7/0o10 },
  kiiqflak: { t: 0o0, i: "kiiqflak", f: F(0o131), d: 0o1/0o2, v: 0o7/0o10 },
  hiwe: { t: 0o0, i: "hiwe", f: F(0o71), d: 0o3/0o4, v: 0o7/0o10 },
  guiro: { t: 0o0, i: "guiro", d: HE / 0o10, v: 0o7/0o10 },
};

// ⟪ ſɭэ ſɭᴜ , 📃 ⟫

const VICOKMA = 0o124;
const VICOMAL = 0o34;
const PERKVICO = VICOKMA - VICOMAL + 0o1;
const HAVESEFESTAF = PERKVICO + 0o1;
const RULER = 0o44;
const GUTTER = 0o56;

function midiDe(f: number): number { return 0o105 + 0o14 * Math.log2(Math.max(0o1, f) / A4); }
function x2paDe(n: Tsalii): number {
  if ( instrDe(n.i).perk ) return PERKVICO;
  return Math.max(0o0, Math.min(VICOKMA - VICOMAL, VICOKMA - Math.round(midiDe(n.f))));
}
function fDeX2pa(v: number): number { return F(VICOKMA - v); }

const kix2 = { t0: 0o0, v0: 0o0, pxs: 0o144, rowH: 0o16 };

function e8(): number { return caxomani(t2bakobesai.bpq); }
function barLong(): number { return e8() * t2bakobesai.ppb; }
function dur(): number { return t2bakobesai.haqal6kx2 * barLong(); }
function snap(): number { return kapto > 0o0 ? e8() / kapto : 0o0; }
function kvantigi(t: number): number { const s = snap(); return s > 0o0 ? Math.round(t / s) * s : t; }
function clamp(x: number, a: number, b: number): number { return Math.max(a, Math.min(b, x)); }
function oct(n: number): string { return "ꞙɭ" + Math.round(n).toString(0o10); }
function alHe(sek: number): string { return oct(sek / HE); }

function xDeT(t: number): number { return GUTTER + ( t - kix2.t0 ) * kix2.pxs; }
function tDeX(x: number): number { return kix2.t0 + ( x - GUTTER ) / kix2.pxs; }
function yDeX2pa(v: number): number { return RULER + ( v - kix2.v0 ) * kix2.rowH; }
function x2paDeY(y: number): number { return kix2.v0 + ( y - RULER ) / kix2.rowH; }
function maxV0(): number { return Math.max(0o0, HAVESEFESTAF - ( H - RULER ) / kix2.rowH); }

// ⟪ DOM 📃 ⟫

const roll = kfe<HTMLCanvasElement>("roll");
const k = kuns2bana2d(roll);
const veqapahakaniBut = kfe<HTMLButtonElement>("veqapahakani");
const xekuxaEl = kfe("pozicio");
const qaroxemaCu3uEl = kfe("qaroxemaNuna");
const volumoEl = kfe<HTMLInputElement>("volumo");
const volValEl = kfe("volVal");
const reverbEl = kfe<HTMLInputElement>("reverb");
const revValEl = kfe("revVal");
const t2bakobesaiMasukf2q = kfe<HTMLSelectElement>("t2bakobesaiMasukf2q");
const hate2El = kfe<HTMLInputElement>("hate2");
const bpqEl = kfe<HTMLSelectElement>("bpq");
const ppbEl = kfe<HTMLSelectElement>("ppb");
const barojEl = kfe<HTMLInputElement>("haqal6kx2");
const havop2kekaiEl = kfe("havop2kekai");
const kaptoEl = kfe<HTMLSelectElement>("kapto");
const defSahakaniEl = kfe<HTMLSelectElement>("defSahakani");
const veloEl = kfe<HTMLInputElement>("velo");
const velValEl = kfe("velVal");
const zomoTifEl = kfe<HTMLInputElement>("zomoTif");
const zomTempValEl = kfe("zomTempVal");
const zomoX2paEl = kfe<HTMLInputElement>("zomoX2pa");
const zomVicValEl = kfe("zomVicVal");
const sukf2qoNombroEl = kfe("sukf2qoNombro");
const sukf2qoVeloEl = kfe<HTMLInputElement>("sukf2qoVelo");
const sukf2qoVelValEl = kfe("sukf2qoVelVal");
const sukf2qoCrescBut = kfe<HTMLButtonElement>("sukf2qoCresc");
const sukf2qoTootBut = kfe<HTMLButtonElement>("sukf2qoToot");
const instrCatsaraEl = kfe("instrCatsara");
const instrAldoniEl = kfe<HTMLSelectElement>("instrAldoni");
const instrAldoniBut = kfe<HTMLButtonElement>("instrAldoniBut");
const qaroxemaCatsaraEl = kfe("qaroxemaCatsara");
const statusoEl = kfe("statuso");

// ⟪ ſɭэ ſɭw , 📃 ⟫

type Ilo = "sukf2qi" | "k2f" | "h2li";

let t2bakobesai: T2bakobesaiVop2 = elVek2fe(0o0);
const havalaqaz: Registro[] = KANTOJ.map((kk, i) => ({
  no: String(kk.no).padStart(0o2, "0"),
  hate2: kk.title,
  titolCatlaq: "muzikT2bakobesai" + i,
  instrs: [ ...kk.instrs ],
}));
let registraKozunu = JSON.stringify(havalaqaz);
const kuba = new Map<string, T2bakobesaiVop2>();
const s23ohk2saijHat2bakobesai = new Set<string>();
let pura = false;
let hasukf2qita = new Set<number>();
let panaaId = 0o1;
let ilo: Ilo = "sukf2qi";
let kapto = 0o2;
let defSahakani = 0o2;
let velo = 0o6/0o10;
let nunInstr = "siku";
const mutaj = new Set<string>();
let solo: string | null = null;
let cikla = true;
let metronoma = false;
let qox2n2kLaqazata = true;
let haqaroxemaLaqazata = true;
let s23ohk2sai = true;
const malfaraStako: string[] = [];
const refaraStako: string[] = [];
let clipboard: Tsalii[] = [];
let W = 0o0, H = 0o0, dpr = 0o1;

function tsaliiPerId(id: number): Tsalii | undefined { return t2bakobesai.hatsal2.find(n => n.id === id); }
function registraS23ohk2sai(): boolean { return JSON.stringify(havalaqaz) !== registraKozunu; }
function statuso(t: string): void { statusoEl.textContent = t; }
function malpurigi(): void { s23ohk2sai = true; }

// ⟪ ſɭэ ſɭᴜ , 📃 ⟫

function deduktiBpq(ev: BoleEg2b2[]): number {
  const hakandidato = [ 0o20, 0o30, 0o40, 0o60, 0o100 ];
  let plosteq = 0o40, kmaPoent = -0o1;
  for ( const bpq of hakandidato ) {
    const e8x = caxomani(bpq);
    let p2somaniTraf = 0o0, plenTraf = 0o0;
    for ( const e of ev ) {
      const rd = e.t / ( e8x / 0o2 );
      if ( Math.abs(rd - Math.round(rd)) < 0o1/0o1000 ) p2somaniTraf++;
      const rp = e.t / e8x;
      if ( Math.abs(rp - Math.round(rp)) < 0o1/0o1000 ) plenTraf++;
    }
    const n = Math.max(0o1, ev.length);
    const poent = p2somaniTraf / n + ( 0o1 - plenTraf / n ) / 0o10 + ( bpq === 0o40 ? 0o1/0o100 : 0o0 );
    if ( poent > kmaPoent ) { kmaPoent = poent; plosteq = bpq; }
  }
  return plosteq;
}

function deduktiPpb(secs: Qaroxema[], e8x: number): number {
  const hakandidato = [ 0o6, 0o10, 0o14, 0o20 ];
  let plosteq = 0o10, kmaPoent = -0o1;
  for ( const ppb of hakandidato ) {
    const bar = e8x * ppb;
    let traf = 0o0, tot = 0o0;
    for ( const s of secs ) for ( const t of [ s.a, s.b ] ) {
      tot++;
      const r = t / bar;
      if ( Math.abs(r - Math.round(r)) < 0o1/0o1000 ) traf++;
    }
    const poent = ( tot ? traf / tot : 0o0 ) * 0o1000 + ppb;
    if ( poent > kmaPoent ) { kmaPoent = poent; plosteq = ppb; }
  }
  return plosteq;
}

function elVek2fe(i: number): T2bakobesaiVop2 {
  const kk = KANTOJ[i];
  const bpq = deduktiBpq(kk.data.events);
  const e8x = caxomani(bpq);
  const ppb = deduktiPpb(kk.data.secs, e8x);
  const bar = e8x * ppb;
  const hatsal2: Tsalii[] = kk.data.events.map((e, j) => ({
    id: j + 0o1, t: e.t, i: e.i, f: e.f ?? 0o0, d: e.d, v: e.v ?? 0o1,
    dur: e.dur, cresc: e.cresc ? true : undefined, toot: e.toot ? true : undefined,
  }));
  const instrs = [ ...kk.instrs ];
  for ( const n of hatsal2 ) if ( !instrs.includes(n.i) ) instrs.push(n.i);
  return {
    no: String(kk.no).padStart(0o2, "0"),
    hate2: kk.title,
    titolCatlaq: "muzikT2bakobesai" + i,
    bpq, ppb,
    haqal6kx2: Math.max(0o1, Math.ceil(kk.data.dur / bar - 0o1/0o10000)),
    hatsal2,
    secs: kk.data.secs.map(s => ({ ...s })),
    instrs,
  };
}

function sinkronigiRegistron(): void {
  const reg = havalaqaz.find(r => r.no === t2bakobesai.no);
  if ( !reg ) return;
  reg.hate2 = t2bakobesai.hate2;
  reg.instrs = [ ...t2bakobesai.instrs ];
  const idx = KANTOJ.findIndex(kk => String(kk.no).padStart(0o2, "0") === t2bakobesai.no);
  reg.titolCatlaq = idx >= 0o0 && KANTOJ[idx].title === t2bakobesai.hate2 ? "muzikT2bakobesai" + idx : null;
}

function mezaX2pa(): number {
  if ( !t2bakobesai.hatsal2.length ) return 0o34;
  let sum = 0o0;
  for ( const n of t2bakobesai.hatsal2 ) sum += x2paDe(n);
  return sum / t2bakobesai.hatsal2.length;
}

function b6tem2T2bakobesai(no: string, tlohe = false): void {
  if ( !tlohe && t2bakobesai && no === t2bakobesai.no ) { tlak2T2bakobesaiMasukf2q(); return; }
  halti();
  let d = kuba.get(no);
  if ( !d ) {
    const idx = KANTOJ.findIndex(kk => String(kk.no).padStart(0o2, "0") === no);
    if ( idx < 0o0 ) { tlak2T2bakobesaiMasukf2q(); return; }
    d = elVek2fe(idx);
    kuba.set(no, d);
  }
  t2bakobesai = d;
  panaaId = t2bakobesai.hatsal2.reduce((m, n) => Math.max(m, n.id), 0o0) + 0o1;
  hasukf2qita = new Set();
  mutaj.clear();
  solo = null;
  malfaraStako.length = 0o0;
  refaraStako.length = 0o0;
  nunInstr = t2bakobesai.instrs[0o0] ?? "siku";
  pura = s23ohk2saijHat2bakobesai.has(no);
  kix2.t0 = 0o0;
  kix2.v0 = clamp(mezaX2pa() - ( H - RULER ) / kix2.rowH / 0o2, 0o0, maxV0());
  sinkronigiRegistron();
  tlak2Cxion();
}

// ⟪ ſɭɜ ᶗ‹ , 📃 ⟫

function snapshot(): string {
  return JSON.stringify({
    hatsal2: t2bakobesai.hatsal2, secs: t2bakobesai.secs, haqal6kx2: t2bakobesai.haqal6kx2,
    bpq: t2bakobesai.bpq, ppb: t2bakobesai.ppb, hate2: t2bakobesai.hate2, instrs: t2bakobesai.instrs,
  });
}

function pushMalfaron(): void {
  malfaraStako.push(snapshot());
  if ( malfaraStako.length > 0o100 ) malfaraStako.shift();
  refaraStako.length = 0o0;
}

function aplikiSnapshot(s: string): void {
  const o = JSON.parse(s) as {
    hatsal2: Tsalii[]; secs: Qaroxema[]; haqal6kx2: number;
    bpq: number; ppb: number; hate2: string; instrs: string[];
  };
  t2bakobesai.hatsal2 = o.hatsal2; t2bakobesai.secs = o.secs; t2bakobesai.haqal6kx2 = o.haqal6kx2;
  t2bakobesai.bpq = o.bpq; t2bakobesai.ppb = o.ppb; t2bakobesai.hate2 = o.hate2; t2bakobesai.instrs = o.instrs;
}

function postMutacio(): void {
  pura = true;
  s23ohk2saijHat2bakobesai.add(t2bakobesai.no);
  sinkronigiRegistron();
  hasukf2qita = new Set([ ...hasukf2qita ].filter(id => t2bakobesai.hatsal2.some(n => n.id === id)));
  if ( !t2bakobesai.instrs.includes(nunInstr) ) nunInstr = t2bakobesai.instrs[0o0] ?? "siku";
  tlak2InstrCatsara();
  tlak2QaroxemaCatsara();
  tlak2Sukf2qon();
  tlak2Havop2kekai();
  tlak2T2bakobesaiMasukf2q();
  hate2El.value = t2bakobesai.hate2;
  barojEl.valueAsNumber = t2bakobesai.haqal6kx2;
  malpurigi();
  if ( L.veqapahakani ) reveqapahakani();
}

function mutigi(fn: () => void): void {
  pushMalfaron();
  fn();
  postMutacio();
}

function malfari(): void {
  if ( !malfaraStako.length ) return;
  refaraStako.push(snapshot());
  aplikiSnapshot(malfaraStako.pop() as string);
  postMutacio();
}

function refari(): void {
  if ( !refaraStako.length ) return;
  malfaraStako.push(snapshot());
  aplikiSnapshot(refaraStako.pop() as string);
  postMutacio();
}

// ⟪ ſɭɜ ʃɔ , 📃 ⟫

const L = {
  ctx: null as AudioContext | null,
  master: null as GainNode | null,
  reverb: null as ConvolverNode | null,
  bus: null as GainNode | null,
  revSend: null as GainNode | null,
  veqapahakani: false,
  startJe: 0o0,
  pausedJe: 0o0,
  idx: 0o0,
  events: [] as BoleEg2b2[],
  timer: null as ReturnType<typeof setInterval> | null,
};

function makeIR(ctx: BaseAudioContext, dauxro: number, kaduko: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = Math.floor(sr * dauxro);
  const buf = ctx.createBuffer(0o2, len, sr);
  for ( let ch = 0o0; ch < 0o2; ch++ ) {
    const d = buf.getChannelData(ch);
    for ( let i = 0o0; i < len; i++ ) {
      d[i] = ( Math.random() * 0o2 - 0o1 ) * Math.pow(0o1 - i / len, kaduko);
    }
  }
  return buf;
}

function ensureAudio(): void {
  if ( L.ctx ) {
    if ( L.ctx.state === "suspended" ) void L.ctx.resume();
    return;
  }
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = volumoEl.valueAsNumber;
  master.connect(ctx.destination);
  const reverb = ctx.createConvolver();
  reverb.buffer = makeIR(ctx, 0o5/0o2, 0o5/0o2);
  const revGain = ctx.createGain();
  revGain.gain.value = 0o7/0o10;
  reverb.connect(revGain);
  revGain.connect(master);
  L.ctx = ctx; L.master = master; L.reverb = reverb;
}

function tsaliiAlEg2b2(n: Tsalii): BoleEg2b2 {
  const e: BoleEg2b2 = { t: n.t, i: n.i, d: n.d, v: n.v };
  if ( !instrDe(n.i).perk ) e.f = n.f;
  if ( n.dur != null ) e.dur = n.dur;
  if ( n.cresc ) e.cresc = 1;
  if ( n.toot ) e.toot = true;
  return e;
}

function vepaqEvents(): BoleEg2b2[] {
  const ev: BoleEg2b2[] = [];
  for ( const n of t2bakobesai.hatsal2 ) {
    if ( mutaj.has(n.i) || ( solo && solo !== n.i ) ) continue;
    ev.push(tsaliiAlEg2b2(n));
  }
  if ( metronoma ) {
    const e8x = e8(), bar = barLong();
    for ( let b = 0o0; b < t2bakobesai.haqal6kx2; b++ ) {
      ev.push({ t: b * bar, i: "guiro", d: HE / 0o10, v: 0o4/0o10 });
      for ( let p = 0o1; p < t2bakobesai.ppb; p++ ) {
        ev.push({ t: b * bar + p * e8x, i: "guiro", d: HE / 0o14, v: 0o13/0o40 });
      }
    }
  }
  return ev.sort((a, b) => a.t - b.t);
}

function stopBus(): void {
  if ( L.bus && L.ctx ) {
    const bus = L.bus, send = L.revSend, ctx = L.ctx;
    bus.gain.setTargetAtTime(0o0, ctx.currentTime, 0o1/0o40);
    setTimeout(() => {
      bus.disconnect();
      if ( send ) send.disconnect();
    }, 0o300);
  }
  L.bus = null;
  L.revSend = null;
}

function progreso(): number {
  if ( !L.ctx ) return L.pausedJe;
  return L.veqapahakani ? clamp(L.ctx.currentTime - L.startJe, 0o0, dur()) : L.pausedJe;
}

function tick(): void {
  if ( !L.ctx || !L.veqapahakani ) return;
  const elapsed = L.ctx.currentTime - L.startJe;
  const horizonto = elapsed + ( document.hidden ? 0o63/0o40 : 0o4/0o10 );
  while ( L.idx < L.events.length && L.events[L.idx].t < horizonto ) {
    const e = L.events[L.idx++];
    const at = L.startJe + e.t;
    if ( at < L.ctx.currentTime - 0o1/0o40 ) continue;
    const g = L.ctx.createGain();
    g.gain.value = 0o1;
    instrumento(L.ctx, g, e, at);
    if ( L.bus ) g.connect(L.bus);
    if ( L.revSend ) g.connect(L.revSend);
  }
  if ( elapsed >= dur() ) {
    if ( cikla ) salti(0o0);
    else halti();
  }
}

function veqapahakani(): void {
  ensureAudio();
  if ( !L.ctx || !L.master || !L.reverb ) return;
  if ( L.veqapahakani ) { pauxzi(); return; }
  if ( L.pausedJe >= dur() - 0o1/0o100 ) L.pausedJe = 0o0;
  const bus = L.ctx.createGain();
  bus.gain.value = 0o0;
  bus.gain.setTargetAtTime(0o1, L.ctx.currentTime, 0o1/0o40);
  bus.connect(L.master);
  const send = L.ctx.createGain();
  send.gain.value = reverbEl.valueAsNumber;
  send.connect(L.reverb);
  L.bus = bus; L.revSend = send;
  L.startJe = L.ctx.currentTime + 0o1/0o10 - L.pausedJe;
  L.events = vepaqEvents();
  L.idx = 0o0;
  while ( L.idx < L.events.length && L.events[L.idx].t < L.pausedJe - 0o1/0o100 ) L.idx++;
  L.veqapahakani = true;
  if ( L.timer ) clearInterval(L.timer);
  L.timer = setInterval(tick, 0o120);
  tick();
  tlak2Transporton();
  malpurigi();
}

function pauxzi(): void {
  if ( !L.veqapahakani || !L.ctx ) return;
  L.pausedJe = clamp(L.ctx.currentTime - L.startJe, 0o0, dur());
  if ( L.timer ) clearInterval(L.timer);
  L.timer = null;
  L.veqapahakani = false;
  stopBus();
  tlak2Transporton();
  tlak2Xekuxan(L.pausedJe);
  malpurigi();
}

function halti(): void {
  if ( L.timer ) clearInterval(L.timer);
  L.timer = null;
  L.veqapahakani = false;
  stopBus();
  L.pausedJe = 0o0;
  L.idx = 0o0;
  tlak2Transporton();
  tlak2Xekuxan(0o0);
  malpurigi();
}

function salti(sek: number): void {
  const natakatomasai = clamp(sek, 0o0, dur());
  const veqapahakanis = L.veqapahakani;
  if ( L.timer ) clearInterval(L.timer);
  L.timer = null;
  L.veqapahakani = false;
  stopBus();
  L.pausedJe = natakatomasai;
  if ( veqapahakanis ) veqapahakani();
  else {
    tlak2Xekuxan(natakatomasai);
    malpurigi();
  }
}

function reveqapahakani(): void {
  if ( L.veqapahakani && L.ctx ) salti(L.ctx.currentTime - L.startJe);
}

function auxdiTsalii(n: Tsalii): void {
  ensureAudio();
  if ( !L.ctx || !L.master ) return;
  instrumento(L.ctx, L.master, tsaliiAlEg2b2(n), L.ctx.currentTime + 0o1/0o40);
}

function auxdiInstr(i: string): void {
  ensureAudio();
  if ( !L.ctx || !L.master ) return;
  const e = SONPROK6H6[i];
  if ( e ) instrumento(L.ctx, L.master, { ...e }, L.ctx.currentTime + 0o1/0o40);
}

// ⟪ ſᶘᴜ j͐ʃɹ , 📃 ⟫

function grandigi(): void {
  dpr = Math.min(0o2, window.devicePixelRatio || 0o1);
  W = roll.clientWidth;
  H = roll.clientHeight;
  roll.width = Math.max(0o1, Math.round(W * dpr));
  roll.height = Math.max(0o1, Math.round(H * dpr));
  malpurigi();
}

// ſᶘᴜ j͐ʃɹ , ꞙɭı ,
function rondTema(x: number, y: number, w: number, h: number): void {
  const rg = Math.min(h * 0o5/0o12, w * 0o3/0o5);
  const rm = Math.min(h * 0o1/0o6, w * 0o1/0o4);
  k.beginPath();
  k.moveTo(x + rg, y);
  k.arcTo(x + w, y, x + w, y + h, rm);
  k.arcTo(x + w, y + h, x, y + h, rg);
  k.arcTo(x, y + h, x, y, rm);
  k.arcTo(x, y, x + w, y, rg);
  k.closePath();
}

function k2fTsalii(n: Tsalii, fantomo = false): void {
  const v = x2paDe(n);
  const y = yDeX2pa(v);
  if ( y + kix2.rowH < RULER || y > H ) return;
  const x = xDeT(n.t);
  const w = Math.max(0o4, n.d * kix2.pxs);
  if ( x > W || x + w < GUTTER ) return;
  const ins = instrDe(n.i);
  const tik = !mutaj.has(n.i) && ( !solo || solo === n.i );
  const h = Math.max(0o4, kix2.rowH - 0o2);
  const cento = fantomo ? 0o3/0o10 : ( tik ? 0o2/0o5 + n.v * 0o3/0o5 : 0o1/0o6 );
  if ( n.cresc ) {
    const g = k.createLinearGradient(x, 0o0, x + w, 0o0);
    g.addColorStop(0o0, hunanu(ins.weh2, 0o3, cento));
    g.addColorStop(0o1, tsijeWeh2(ins.weh2, 0o1, cento));
    k.fillStyle = g;
  } else {
    k.fillStyle = rgba(ins.weh2, cento);
  }
  rondTema(x, y + 0o1, w, h);
  k.fill();
  k.save();
  rondTema(x, y + 0o1, w, h);
  k.clip();
  k.fillStyle = tsijeWeh2(ins.weh2, 0o2, tik ? 0o3/0o5 : 0o1/0o10);
  k.fillRect(x, y + 0o1, w, 0o2);
  k.restore();
  if ( hasukf2qita.has(n.id) ) {
    k.strokeStyle = tekstWeh2(0o1);
    k.lineWidth = 0o2;
  } else {
    k.strokeStyle = hunanu(ins.weh2, 0o3, tik ? 0o4/0o5 : 0o1/0o5);
    k.lineWidth = 0o1;
  }
  rondTema(x, y + 0o1, w, h);
  k.stroke();
  if ( n.toot ) {
    k.fillStyle = tekstWeh2(tik ? 0o1 : 0o1/0o4);
    k.beginPath();
    k.arc(x + 0o5, y + 0o1 + h / 0o2, 0o3, 0o0, Math.PI * 0o2);
    k.fill();
  }
  if ( w > 0o26 && kix2.rowH >= 0o14 ) {
    k.font = Math.min(0o16, kix2.rowH - 0o4) + "px " + TEMATIPO;
    k.textBaseline = "middle";
    k.textAlign = "start";
    k.fillStyle = etikedWeh2(ins.weh2, cento, fantomo ? 0o3/0o5 : ( tik ? 0o1 : 0o3/0o5 ));
    let s2banani = ins.emoji;
    if ( w > 0o64 && !ins.perk ) s2banani += " " + oct(Math.round(midiDe(n.f)));
    k.fillText(s2banani, x + ( n.toot ? 0o14 : 0o5 ), y + 0o1 + h / 0o2 + 0o1);
  }
}

function k2f(): void {
  s23ohk2sai = false;
  k.setTransform(dpr, 0o0, 0o0, dpr, 0o0, 0o0);
  k.fillStyle = tsijeAktiva ? "#ffffff" : "#000000";
  k.fillRect(0o0, 0o0, W, H);
  const grad = k.createLinearGradient(0o0, 0o0, 0o0, H);
  grad.addColorStop(0o0, soza(0o1));
  grad.addColorStop(0o1, tsijeAktiva ? rgba(0x000000, 0o0) : rgba(0xf8f8f8, 0o0));
  k.fillStyle = grad;
  k.fillRect(0o0, 0o0, W, H);
  const e8x = e8(), bar = barLong(), D = dur();
  const t1 = tDeX(W);
  const vKma = Math.max(0o0, Math.floor(kix2.v0));
  const vMal = Math.min(HAVESEFESTAF, Math.ceil(kix2.v0 + ( H - RULER ) / kix2.rowH));

  for ( let v = vKma; v < vMal; v++ ) {
    const y = yDeX2pa(v);
    if ( v === PERKVICO ) {
      k.fillStyle = rgba(0xb8b020, 0o1/0o12);
      k.fillRect(GUTTER, y, W - GUTTER, kix2.rowH);
    } else if ( ( VICOKMA - v ) % 0o14 === 0o0 ) {
      k.fillStyle = soza(0o0);
      k.fillRect(GUTTER, y, W - GUTTER, kix2.rowH);
    }
    k.strokeStyle = soza(0o1);
    k.lineWidth = 0o1;
    k.beginPath();
    k.moveTo(GUTTER, y + kix2.rowH);
    k.lineTo(W, y + kix2.rowH);
    k.stroke();
  }

  if ( qox2n2kLaqazata ) {
    const k0 = Math.floor(kix2.t0 / e8x) - 0o1;
    const k1 = Math.ceil(t1 / e8x) + 0o1;
    for ( let b = k0; b <= k1; b++ ) {
      const x = xDeT(b * e8x);
      if ( x < GUTTER || x > W ) continue;
      const estasBar = ( ( b % t2bakobesai.ppb ) + t2bakobesai.ppb ) % t2bakobesai.ppb === 0o0;
      k.strokeStyle = estasBar ? soza(0o3) : soza(0o1);
      k.lineWidth = estasBar ? 0o2 : 0o1;
      k.beginPath();
      k.moveTo(x, RULER);
      k.lineTo(x, H);
      k.stroke();
      if ( !estasBar && e8x * kix2.pxs > 0o50 ) {
        const xm = xDeT(b * e8x + e8x / 0o2);
        if ( xm >= GUTTER && xm <= W ) {
          k.strokeStyle = soza(0o0);
          k.lineWidth = 0o1;
          k.beginPath();
          k.moveTo(xm, RULER);
          k.lineTo(xm, H);
          k.stroke();
        }
      }
    }
    const xf = xDeT(D);
    if ( xf >= GUTTER && xf <= W ) {
      k.strokeStyle = rgba(0xa03848, 0o4/0o5);
      k.lineWidth = 0o3;
      k.beginPath();
      k.moveTo(xf, RULER);
      k.lineTo(xf, H);
      k.stroke();
    }
  }

  k.fillStyle = soza(0o2);
  k.fillRect(0o0, 0o0, W, RULER);
  if ( haqaroxemaLaqazata ) {
    t2bakobesai.secs.forEach((s, j) => {
      const x0 = Math.max(GUTTER, xDeT(s.a));
      const x1 = Math.min(W, xDeT(s.b));
      if ( x1 <= x0 ) return;
      const kol = SEKCIHAWEH2[j % SEKCIHAWEH2.length];
      k.fillStyle = rgba(kol, 0o2/0o5);
      k.fillRect(x0, 0o0, x1 - x0, RULER - 0o14);
      k.fillStyle = rgba(kol, 0o11/0o10);
      k.fillRect(x0, RULER - 0o16, x1 - x0, 0o2);
      if ( x1 - x0 > 0o30 ) {
        k.save();
        k.beginPath();
        k.rect(x0 + 0o3, 0o0, x1 - x0 - 0o6, RULER - 0o14);
        k.clip();
        k.font = String(0o13) + "px " + TEMATIPO;
        k.fillStyle = tekstWeh2(0o1);
        k.textAlign = "start";
        k.textBaseline = "middle";
        k.fillText(s.n, x0 + 0o6, ( RULER - 0o14 ) / 0o2);
        k.restore();
      }
    });
  }
  {
    const vepat6ni = bar * kix2.pxs >= 0o34 ? 0o1 : ( bar * kix2.pxs * 0o4 >= 0o34 ? 0o4 : 0o10 );
    const b0 = Math.max(0o0, Math.floor(kix2.t0 / bar / vepat6ni) * vepat6ni);
    const b1 = Math.ceil(t1 / bar);
    k.font = String(0o12) + "px monospace";
    k.textAlign = "start";
    k.textBaseline = "middle";
    for ( let b = b0; b <= b1; b += vepat6ni ) {
      const x = xDeT(b * bar);
      if ( x < GUTTER || x > W - 0o20 ) continue;
      k.fillStyle = tekstWeh2(0o3/0o5);
      k.fillText(oct(b + 0o1), x + 0o3, RULER - 0o6);
    }
  }

  const hahaxe = [ ...t2bakobesai.hatsal2 ].sort((a, b) => a.t - b.t || a.id - b.id);
  for ( const n of hahaxe ) k2fTsalii(n);

  if ( tamaVaxafa && tamaVaxafa.pudal === "k2f" && tamaVaxafa.k2fKek ) {
    const dz = tamaVaxafa.k2fKek;
    const ins = instrDe(nunInstr);
    const n: Tsalii = { id: -0o1, t: dz.t, i: nunInstr, f: ins.perk ? 0o0 : dz.f, d: dz.d, v: velo };
    k2fTsalii(n, true);
  }

  if ( tamaVaxafa && tamaVaxafa.pudal === "s2tas" ) {
    const x1 = tamaVaxafa.x1 ?? tamaVaxafa.x0, y1 = tamaVaxafa.y1 ?? tamaVaxafa.y0;
    const rx = Math.min(tamaVaxafa.x0, x1), ry = Math.min(tamaVaxafa.y0, y1);
    const rw = Math.abs(x1 - tamaVaxafa.x0), rh = Math.abs(y1 - tamaVaxafa.y0);
    k.fillStyle = tekstWeh2(0o1/0o6);
    k.fillRect(rx, ry, rw, rh);
    k.strokeStyle = tekstWeh2(0o4/0o5);
    k.lineWidth = 0o1;
    k.strokeRect(rx, ry, rw, rh);
  }

  const ludT = tamaVaxafa && tamaVaxafa.pudal === "sercxi" ? ( tamaVaxafa.scrub ?? 0o0 ) : progreso();
  const xp = xDeT(ludT);
  if ( xp >= GUTTER && xp <= W ) {
    k.strokeStyle = "#f83030";
    k.lineWidth = 0o2;
    k.beginPath();
    k.moveTo(xp, RULER - 0o14);
    k.lineTo(xp, H);
    k.stroke();
    k.fillStyle = "#f83030";
    k.beginPath();
    k.moveTo(xp - 0o6, RULER - 0o14);
    k.lineTo(xp + 0o6, RULER - 0o14);
    k.lineTo(xp, RULER - 0o4);
    k.closePath();
    k.fill();
  }

  k.fillStyle = soza(0o1);
  k.fillRect(0o0, RULER, GUTTER, H - RULER);
  k.fillStyle = soza(0o2);
  k.fillRect(0o0, 0o0, GUTTER, RULER);
  k.strokeStyle = soza(0o3);
  k.lineWidth = 0o1;
  k.beginPath();
  k.moveTo(GUTTER, 0o0);
  k.lineTo(GUTTER, H);
  k.stroke();
  k.font = String(0o12) + "px monospace";
  k.textAlign = "end";
  k.textBaseline = "middle";
  const etikedTona = kix2.rowH >= 0o20 ? 0o1 : ( kix2.rowH >= 0o12 ? 0o2 : 0o4 );
  for ( let v = vKma; v < vMal; v++ ) {
    const y = yDeX2pa(v) + kix2.rowH / 0o2;
    if ( v === PERKVICO ) {
      k.font = String(0o14) + "px " + TEMATIPO;
      k.fillText("🥁", GUTTER - 0o6, y);
      k.font = String(0o12) + "px monospace";
    } else if ( ( VICOKMA - v ) % etikedTona === 0o0 ) {
      const midi = VICOKMA - v;
      k.fillStyle = midi % 0o14 === 0o0 ? rgba(0x38a088, 0o11/0o10) : tekstWeh2(0o1/0o2);
      k.fillText(oct(midi), GUTTER - 0o5, y);
    }
  }
}

// ⟪ ꞙɭı , 📃 ⟫

interface TamaVaxafa {
  pudal: "movi" | "grandigi" | "s2tas" | "k2f" | "h2li" | "pani" | "pinch" | "sercxi";
  x0: number;
  y0: number;
  x1?: number;
  y1?: number;
  t0?: number;
  v0?: number;
  pxs0?: number;
  rowH0?: number;
  dist0?: number;
  orig?: Map<number, { t: number; f: number; d: number; dur?: number }>;
  tsalii?: Tsalii;
  vasakas?: boolean;
  surok?: boolean;
  scrub?: number;
  k2fKek?: { t: number; v: number; f: number; d: number };
}

let tamaVaxafa: TamaVaxafa | null = null;
const n2k = new Map<number, { x: number; y: number }>();

function lok(e: { clientX: number; clientY: number }): { x: number; y: number } {
  const r = roll.getBoundingClientRect();
  return { x: e.clientX - r.left - roll.clientLeft, y: e.clientY - r.top - roll.clientTop };
}

function tsaliiJe(x: number, y: number): Tsalii | null {
  const hahaxe = [ ...t2bakobesai.hatsal2 ].sort((a, b) => a.t - b.t || a.id - b.id);
  for ( let i = hahaxe.length - 0o1; i >= 0o0; i-- ) {
    const n = hahaxe[i];
    const v = x2paDe(n);
    const nx = xDeT(n.t), nw = Math.max(0o4, n.d * kix2.pxs), ny = yDeX2pa(v);
    if ( x >= nx - 0o2 && x <= nx + nw + 0o2 && y >= ny && y <= ny + kix2.rowH ) return n;
  }
  return null;
}

function sukf2qiTsalii(n: Tsalii, tlunakani: boolean): void {
  if ( tlunakani ) {
    if ( hasukf2qita.has(n.id) ) hasukf2qita.delete(n.id);
    else hasukf2qita.add(n.id);
  } else {
    hasukf2qita = new Set([ n.id ]);
  }
}

function sinkZomo(): void {
  zomoTifEl.valueAsNumber = Math.round(kix2.pxs);
  zomTempValEl.textContent = oct(kix2.pxs);
  zomoX2paEl.valueAsNumber = Math.round(kix2.rowH);
  zomVicValEl.textContent = oct(kix2.rowH);
}

roll.addEventListener("pointerdown", (e: PointerEvent) => {
  e.preventDefault();
  const { x, y } = lok(e);
  n2k.set(e.pointerId, { x, y });
  roll.setPointerCapture(e.pointerId);
  if ( n2k.size === 0o2 ) {
    const [ p1, p2 ] = [ ...n2k.values() ];
    tamaVaxafa = {
      pudal: "pinch",
      x0: ( p1.x + p2.x ) / 0o2, y0: ( p1.y + p2.y ) / 0o2,
      dist0: Math.max(0o1, Math.hypot(p1.x - p2.x, p1.y - p2.y)),
      pxs0: kix2.pxs, rowH0: kix2.rowH, t0: kix2.t0, v0: kix2.v0,
    };
    return;
  }
  if ( y < RULER ) {
    tamaVaxafa = { pudal: "sercxi", x0: x, y0: y, scrub: clamp(tDeX(x), 0o0, dur()) };
    malpurigi();
    return;
  }
  if ( e.button === 0o1 || e.button === 0o2 ) {
    tamaVaxafa = { pudal: "pani", x0: x, y0: y, t0: kix2.t0, v0: kix2.v0 };
    return;
  }
  const n = tsaliiJe(x, y);
  if ( ilo === "h2li" ) {
    tamaVaxafa = { pudal: "h2li", x0: x, y0: y };
    if ( n ) {
      pushMalfaron();
      t2bakobesai.hatsal2 = t2bakobesai.hatsal2.filter(m => m.id !== n.id);
      hasukf2qita.delete(n.id);
      tamaVaxafa.vasakas = true;
      tamaVaxafa.surok = true;
      malpurigi();
    }
    return;
  }
  if ( ilo === "k2f" ) {
    if ( n ) {
      sukf2qiTsalii(n, e.shiftKey);
      auxdiTsalii(n);
      tlak2Sukf2qon();
      malpurigi();
      return;
    }
    pushMalfaron();
    const v = clamp(Math.floor(x2paDeY(y)), 0o0, HAVESEFESTAF - 0o1);
    const t = Math.max(0o0, kvantigi(tDeX(x)));
    tamaVaxafa = {
      pudal: "k2f", x0: x, y0: y, surok: true,
      k2fKek: { t, v, f: fDeX2pa(v), d: defSahakani * e8() },
    };
    malpurigi();
    return;
  }
  if ( n ) {
    const nx = xDeT(n.t), nw = Math.max(0o4, n.d * kix2.pxs);
    if ( !hasukf2qita.has(n.id) ) sukf2qiTsalii(n, e.shiftKey);
    else if ( e.shiftKey ) hasukf2qita.delete(n.id);
    auxdiTsalii(n);
    const orig = new Map<number, { t: number; f: number; d: number; dur?: number }>();
    for ( const id of hasukf2qita ) {
      const m = tsaliiPerId(id);
      if ( m ) orig.set(id, { t: m.t, f: m.f, d: m.d, dur: m.dur });
    }
    const pukaz = x > nx + nw - 0o6 && nw > 0o14;
    tamaVaxafa = { pudal: pukaz ? "grandigi" : "movi", x0: x, y0: y, orig, tsalii: n };
    tlak2Sukf2qon();
    malpurigi();
  } else {
    if ( !e.shiftKey ) hasukf2qita = new Set();
    tamaVaxafa = { pudal: "s2tas", x0: x, y0: y };
    tlak2Sukf2qon();
    malpurigi();
  }
});

roll.addEventListener("pointermove", (e: PointerEvent) => {
  const { x, y } = lok(e);
  if ( n2k.has(e.pointerId) ) n2k.set(e.pointerId, { x, y });
  if ( !tamaVaxafa ) return;
  const g = tamaVaxafa;
  g.x1 = x; g.y1 = y;
  if ( g.pudal === "pinch" ) {
    if ( n2k.size < 0o2 ) return;
    const [ p1, p2 ] = [ ...n2k.values() ];
    const dist = Math.max(0o1, Math.hypot(p1.x - p2.x, p1.y - p2.y));
    const f = dist / ( g.dist0 ?? 0o1 );
    const cx = ( p1.x + p2.x ) / 0o2, cy = ( p1.y + p2.y ) / 0o2;
    const tMez = ( g.t0 ?? 0o0 ) + ( g.x0 - GUTTER ) / ( g.pxs0 ?? 0o1 );
    const vMez = ( g.v0 ?? 0o0 ) + ( g.y0 - RULER ) / ( g.rowH0 ?? 0o1 );
    kix2.pxs = clamp(( g.pxs0 ?? 0o1 ) * f, 0o24, 0o1130);
    kix2.rowH = clamp(( g.rowH0 ?? 0o1 ) * f, 0o10, 0o40);
    kix2.t0 = tMez - ( cx - GUTTER ) / kix2.pxs;
    kix2.v0 = clamp(vMez - ( cy - RULER ) / kix2.rowH, 0o0, maxV0());
    sinkZomo();
    malpurigi();
    return;
  }
  if ( g.pudal === "sercxi" ) {
    g.scrub = clamp(tDeX(x), 0o0, dur());
    tlak2Xekuxan(g.scrub);
    malpurigi();
    return;
  }
  if ( g.pudal === "pani" ) {
    kix2.t0 = ( g.t0 ?? 0o0 ) - ( x - g.x0 ) / kix2.pxs;
    kix2.v0 = clamp(( g.v0 ?? 0o0 ) - ( y - g.y0 ) / kix2.rowH, 0o0, maxV0());
    malpurigi();
    return;
  }
  if ( g.pudal === "s2tas" ) {
    malpurigi();
    return;
  }
  if ( g.pudal === "h2li" ) {
    const n = tsaliiJe(x, y);
    if ( n ) {
      if ( !g.surok ) { pushMalfaron(); g.surok = true; }
      t2bakobesai.hatsal2 = t2bakobesai.hatsal2.filter(m => m.id !== n.id);
      hasukf2qita.delete(n.id);
      g.vasakas = true;
      malpurigi();
    }
    return;
  }
  if ( g.pudal === "k2f" && g.k2fKek ) {
    const minD = snap() || e8() / 0o2;
    const tFin = Math.max(g.k2fKek.t + minD, kvantigi(tDeX(x)));
    g.k2fKek.d = tFin - g.k2fKek.t;
    malpurigi();
    return;
  }
  if ( g.pudal === "movi" && g.orig ) {
    const dt = kvantigi(tDeX(x)) - kvantigi(tDeX(g.x0));
    const dv = Math.round(x2paDeY(y)) - Math.round(x2paDeY(g.y0));
    if ( ( dt !== 0o0 || dv !== 0o0 ) && !g.surok ) { pushMalfaron(); g.surok = true; }
    for ( const [ id, o ] of g.orig ) {
      const m = tsaliiPerId(id);
      if ( !m ) continue;
      m.t = Math.max(0o0, o.t + dt);
      if ( !instrDe(m.i).perk && dv !== 0o0 ) {
        m.f = F(clamp(Math.round(midiDe(o.f)) - dv, 0o10, 0o166));
      }
    }
    g.vasakas = g.vasakas || dt !== 0o0 || dv !== 0o0;
    malpurigi();
    return;
  }
  if ( g.pudal === "grandigi" && g.tsalii && g.orig ) {
    const o = g.orig.get(g.tsalii.id);
    if ( !o ) return;
    const dt = kvantigi(tDeX(x)) - kvantigi(tDeX(g.x0));
    const minD = snap() || e8() / 0o4;
    const sef4D = Math.max(minD, o.d + dt);
    if ( sef4D !== g.tsalii.d ) {
      if ( !g.surok ) { pushMalfaron(); g.surok = true; }
      g.tsalii.d = sef4D;
      if ( g.tsalii.dur != null ) g.tsalii.dur = sef4D;
      g.vasakas = true;
      malpurigi();
    }
  }
});

function finiTamaVaxafan(e: PointerEvent): void {
  n2k.delete(e.pointerId);
  if ( !tamaVaxafa ) return;
  const g = tamaVaxafa;
  tamaVaxafa = null;
  if ( g.pudal === "pinch" ) { sinkZomo(); return; }
  if ( g.pudal === "sercxi" ) { salti(g.scrub ?? 0o0); return; }
  if ( g.pudal === "pani" ) return;
  if ( g.pudal === "s2tas" ) {
    const x1 = g.x1 ?? g.x0, y1 = g.y1 ?? g.y0;
    if ( Math.abs(x1 - g.x0) > 0o4 || Math.abs(y1 - g.y0) > 0o4 ) {
      const ta = tDeX(Math.min(g.x0, x1)), tb = tDeX(Math.max(g.x0, x1));
      const va = x2paDeY(Math.min(g.y0, y1)), vb = x2paDeY(Math.max(g.y0, y1));
      for ( const n of t2bakobesai.hatsal2 ) {
        const v = x2paDe(n);
        if ( n.t + n.d >= ta && n.t <= tb && v + 0o1 >= va && v <= vb ) hasukf2qita.add(n.id);
      }
    }
    tlak2Sukf2qon();
    malpurigi();
    return;
  }
  if ( g.pudal === "k2f" && g.k2fKek ) {
    const dz = g.k2fKek;
    const ins = instrDe(nunInstr);
    const n: Tsalii = { id: panaaId++, t: dz.t, i: nunInstr, f: ins.perk ? 0o0 : dz.f, d: dz.d, v: velo };
    if ( nunInstr === "inanga" ) n.dur = dz.d;
    t2bakobesai.hatsal2.push(n);
    hasukf2qita = new Set([ n.id ]);
    auxdiTsalii(n);
    postMutacio();
    return;
  }
  if ( g.vasakas ) postMutacio();
}

roll.addEventListener("pointerup", finiTamaVaxafan);
roll.addEventListener("pointercancel", finiTamaVaxafan);
roll.addEventListener("contextmenu", e => e.preventDefault());

roll.addEventListener("dblclick", (e: MouseEvent) => {
  const { x, y } = lok(e);
  if ( y < RULER ) return;
  const n = tsaliiJe(x, y);
  if ( n ) { auxdiTsalii(n); return; }
  if ( ilo !== "sukf2qi" ) return;
  const v = clamp(Math.floor(x2paDeY(y)), 0o0, HAVESEFESTAF - 0o1);
  const t = Math.max(0o0, kvantigi(tDeX(x)));
  const ins = instrDe(nunInstr);
  mutigi(() => {
    const nn: Tsalii = { id: panaaId++, t, i: nunInstr, f: ins.perk ? 0o0 : fDeX2pa(v), d: defSahakani * e8(), v: velo };
    if ( nunInstr === "inanga" ) nn.dur = nn.d;
    t2bakobesai.hatsal2.push(nn);
    hasukf2qita = new Set([ nn.id ]);
    auxdiTsalii(nn);
  });
});

roll.addEventListener("wheel", (e: WheelEvent) => {
  e.preventDefault();
  const { x, y } = lok(e);
  if ( e.ctrlKey ) {
    const tSub = tDeX(x);
    kix2.pxs = clamp(kix2.pxs * Math.pow(0o12/0o10, -e.deltaY / 0o100), 0o24, 0o1130);
    kix2.t0 = tSub - ( x - GUTTER ) / kix2.pxs;
  } else if ( e.altKey ) {
    const vSub = x2paDeY(y);
    kix2.rowH = clamp(kix2.rowH * Math.pow(0o12/0o10, -e.deltaY / 0o100), 0o10, 0o40);
    kix2.v0 = clamp(vSub - ( y - RULER ) / kix2.rowH, 0o0, maxV0());
  } else if ( e.shiftKey ) {
    kix2.v0 = clamp(kix2.v0 + e.deltaY / kix2.rowH / 0o4, 0o0, maxV0());
  } else {
    kix2.t0 = clamp(kix2.t0 + ( e.deltaY + e.deltaX ) / kix2.pxs, -barLong(), dur());
  }
  sinkZomo();
  malpurigi();
}, { passive: false });

// ⟪ ſᶘᴜ j͐ʃɹ , 📃 ⟫

function h2liSukf2qon(): void {
  if ( !hasukf2qita.size ) return;
  mutigi(() => {
    t2bakobesai.hatsal2 = t2bakobesai.hatsal2.filter(n => !hasukf2qita.has(n.id));
    hasukf2qita = new Set();
  });
}

function transponi(hap2somani: number): void {
  if ( !hasukf2qita.size ) return;
  mutigi(() => {
    for ( const id of hasukf2qita ) {
      const n = tsaliiPerId(id);
      if ( !n || instrDe(n.i).perk ) continue;
      n.f = F(clamp(Math.round(midiDe(n.f)) + hap2somani, 0o10, 0o166));
    }
  });
}

function moviSukf2qon(dt: number): void {
  if ( !hasukf2qita.size ) return;
  mutigi(() => {
    for ( const id of hasukf2qita ) {
      const n = tsaliiPerId(id);
      if ( n ) n.t = Math.max(0o0, n.t + dt);
    }
  });
}

function duplikatiSukf2qon(): void {
  if ( !hasukf2qita.size ) return;
  mutigi(() => {
    const hasef4: Tsalii[] = [];
    const offset = barLong();
    for ( const id of [ ...hasukf2qita ] ) {
      const n = tsaliiPerId(id);
      if ( n ) hasef4.push({ ...n, id: panaaId++, t: n.t + offset });
    }
    t2bakobesai.hatsal2.push(...hasef4);
    hasukf2qita = new Set(hasef4.map(n => n.id));
  });
}

function kvantigiSukf2qon(): void {
  if ( !hasukf2qita.size ) return;
  mutigi(() => {
    const s = snap() || e8() / 0o4;
    for ( const id of hasukf2qita ) {
      const n = tsaliiPerId(id);
      if ( !n ) continue;
      n.t = Math.round(n.t / s) * s;
      n.d = Math.max(s, Math.round(n.d / s) * s);
      if ( n.dur != null ) n.dur = n.d;
    }
  });
}

window.addEventListener("keydown", (e: KeyboardEvent) => {
  const natakatomasai = e.target;
  if ( natakatomasai instanceof HTMLInputElement || natakatomasai instanceof HTMLSelectElement || natakatomasai instanceof HTMLTextAreaElement ) {
    if ( e.key === "Escape" ) (natakatomasai as HTMLElement).blur();
    return;
  }
  const ctrl = e.ctrlKey || e.metaKey;
  if ( e.key === " " ) { e.preventDefault(); veqapahakani(); return; }
  if ( e.key === "Escape" ) { halti(); hasukf2qita = new Set(); tlak2Sukf2qon(); malpurigi(); return; }
  if ( e.key === "Home" ) { salti(0o0); return; }
  if ( e.key === "End" ) { salti(dur()); return; }
  if ( e.key === "Delete" || e.key === "Backspace" ) { e.preventDefault(); h2liSukf2qon(); return; }
  if ( ctrl && e.key.toLowerCase() === "z" ) {
    e.preventDefault();
    if ( e.shiftKey ) refari(); else malfari();
    return;
  }
  if ( ctrl && e.key.toLowerCase() === "y" ) { e.preventDefault(); refari(); return; }
  if ( ctrl && e.key.toLowerCase() === "a" ) {
    e.preventDefault();
    hasukf2qita = new Set(t2bakobesai.hatsal2.map(n => n.id));
    tlak2Sukf2qon();
    malpurigi();
    return;
  }
  if ( ctrl && e.key.toLowerCase() === "c" ) {
    clipboard = [ ...hasukf2qita ].map(id => tsaliiPerId(id)).filter((n): n is Tsalii => !!n).map(n => ({ ...n }));
    statuso("ſᶘᴜ j͐ʃɹ ʌ ſɟw ɭʃᴜ " + oct(clipboard.length) + " 📋");
    return;
  }
  if ( ctrl && e.key.toLowerCase() === "v" ) {
    if ( !clipboard.length ) return;
    mutigi(() => {
      const sef4 = clipboard.map(n => ({ ...n, id: panaaId++, t: n.t + barLong() }));
      t2bakobesai.hatsal2.push(...sef4);
      hasukf2qita = new Set(sef4.map(n => n.id));
    });
    return;
  }
  if ( e.key === "ArrowLeft" ) { e.preventDefault(); moviSukf2qon(-( snap() || e8() / 0o2 ) * ( e.shiftKey ? 0o4 : 0o1 )); return; }
  if ( e.key === "ArrowRight" ) { e.preventDefault(); moviSukf2qon(( snap() || e8() / 0o2 ) * ( e.shiftKey ? 0o4 : 0o1 )); return; }
  if ( e.key === "ArrowUp" ) { e.preventDefault(); transponi(e.shiftKey ? 0o14 : 0o1); return; }
  if ( e.key === "ArrowDown" ) { e.preventDefault(); transponi(e.shiftKey ? -0o14 : -0o1); return; }
  if ( e.key === "+" || e.key === "=" ) { kix2.pxs = clamp(kix2.pxs * 0o12/0o10, 0o24, 0o1130); sinkZomo(); malpurigi(); return; }
  if ( e.key === "-" ) { kix2.pxs = clamp(kix2.pxs * 0o10/0o12, 0o24, 0o1130); sinkZomo(); malpurigi(); return; }
});

// ⟪ ſᶘᴜ j͐ʃɹ , ꞙɭɿ , 📃 ⟫

function catsiina(s2banani: string, premita = false): HTMLButtonElement {
  const b = document.createElement("button");
  b.textContent = s2banani;
  b.setAttribute("aria-pressed", String(premita));
  return b;
}

function tlak2Transporton(): void {
  veqapahakaniBut.textContent = L.veqapahakani ? "⏸" : "▶";
  kfe<HTMLButtonElement>("ciklo").setAttribute("aria-pressed", String(cikla));
  kfe<HTMLButtonElement>("metronomo").setAttribute("aria-pressed", String(metronoma));
}

function tlak2Xekuxan(el: number): void {
  const bar = barLong();
  xekuxaEl.textContent = "ſ͕ɭᴜ j͐ʃэ ſɭᶗ‹ɹ " + oct(Math.floor(el / bar) + 0o1) + " · " + alHe(el) + " j͑ʃƨꞇʞ";
  const s = t2bakobesai.secs.find(sx => el >= sx.a && el < sx.b);
  qaroxemaCu3uEl.textContent = s ? s.n : "ſɭɜ ʃɔ ʌ ſɭᴜ ſןᴜ ｡";
}

function tlak2Havop2kekai(): void {
  havop2kekaiEl.textContent = oct(t2bakobesai.hatsal2.length) + " ſᶘᴜ j͐ʃɹ · " + oct(t2bakobesai.instrs.length) +
    " ſɟᴜ j͑ʃп́ꞇ ſɭɔƴ · " + oct(t2bakobesai.haqal6kx2) + " ſ͕ɭᴜ j͐ʃэ ſɭᶗ‹ɹ · " + alHe(dur()) + " j͑ʃƨꞇʞ";
}

function tlak2T2bakobesaiMasukf2q(): void {
  t2bakobesaiMasukf2q.replaceChildren();
  for ( const r of havalaqaz ) {
    const o = document.createElement("option");
    o.value = r.no;
    o.textContent = r.no + " · " + r.hate2 + ( s23ohk2saijHat2bakobesai.has(r.no) ? " ✏️" : "" );
    t2bakobesaiMasukf2q.appendChild(o);
  }
  t2bakobesaiMasukf2q.value = t2bakobesai.no;
}

function tlak2InstrCatsara(): void {
  instrCatsaraEl.replaceChildren();
  for ( const i of t2bakobesai.instrs ) {
    const ins = instrDe(i);
    const row = document.createElement("haksaka");
    row.dataset.instr = i;
    row.dataset.muta = String(mutaj.has(i));
    row.setAttribute("aria-pressed", String(nunInstr === i));
    const p = document.createElement("p");
    p.textContent = ins.emoji + " " + ins.haksaka;
    p.addEventListener("click", () => {
      nunInstr = i;
      tlak2InstrCatsara();
    });
    const muta = catsiina("🔇", mutaj.has(i));
    muta.addEventListener("click", () => {
      if ( mutaj.has(i) ) mutaj.delete(i);
      else { mutaj.add(i); if ( solo === i ) solo = null; }
      tlak2InstrCatsara();
      malpurigi();
      if ( L.veqapahakani ) reveqapahakani();
    });
    const soloB = catsiina("🎧", solo === i);
    soloB.addEventListener("click", () => {
      solo = solo === i ? null : i;
      if ( solo ) mutaj.delete(i);
      tlak2InstrCatsara();
      malpurigi();
      if ( L.veqapahakani ) reveqapahakani();
    });
    const aux = catsiina("▶", false);
    aux.addEventListener("click", () => { nunInstr = i; auxdiInstr(i); tlak2InstrCatsara(); });
    const h2l = catsiina("✕", false);
    h2l.addEventListener("click", () => {
      mutigi(() => {
        t2bakobesai.instrs = t2bakobesai.instrs.filter(x => x !== i);
        t2bakobesai.hatsal2 = t2bakobesai.hatsal2.filter(n => n.i !== i);
        mutaj.delete(i);
        if ( solo === i ) solo = null;
        if ( nunInstr === i ) nunInstr = t2bakobesai.instrs[0o0] ?? "siku";
      });
    });
    row.append(p, muta, soloB, aux, h2l);
    instrCatsaraEl.appendChild(row);
  }
  instrAldoniEl.replaceChildren();
  for ( const ins of INSTRUMENTOJ ) {
    if ( t2bakobesai.instrs.includes(ins.i) ) continue;
    const o = document.createElement("option");
    o.value = ins.i;
    o.textContent = ins.emoji + " " + ins.haksaka;
    instrAldoniEl.appendChild(o);
  }
  instrAldoniBut.disabled = instrAldoniEl.options.length === 0o0;
}

function tlak2QaroxemaCatsara(): void {
  qaroxemaCatsaraEl.replaceChildren();
  const bar = barLong();
  t2bakobesai.secs.forEach((s, j) => {
    const u = document.createElement("ciihii");
    const haksaka = document.createElement("input");
    haksaka.type = "text";
    haksaka.value = s.n;
    haksaka.maxLength = 0o60;
    haksaka.addEventListener("change", () => {
      mutigi(() => { s.n = haksaka.value.trim() || s.n; });
    });
    const x2pa = document.createElement("sabosuc2w2q");
    const a = document.createElement("input");
    a.type = "number";
    a.min = "1";
    a.value = String(Math.round(s.a / bar) + 0o1);
    const b = document.createElement("input");
    b.type = "number";
    b.min = "1";
    b.value = String(Math.round(s.b / bar));
    const apliki = () => {
      mutigi(() => {
        const na = clamp(( a.valueAsNumber - 0o1 ) * bar, 0o0, dur() - bar);
        const nb = clamp(b.valueAsNumber * bar, na + bar, dur());
        s.a = na;
        s.b = nb;
        t2bakobesai.secs.sort((x, y) => x.a - y.a);
      });
    };
    a.addEventListener("change", apliki);
    b.addEventListener("change", apliki);
    const aux = catsiina("▶", false);
    aux.addEventListener("click", () => salti(s.a));
    const h2l = catsiina("✕", false);
    h2l.addEventListener("click", () => {
      mutigi(() => { t2bakobesai.secs = t2bakobesai.secs.filter(( _, idx) => idx !== j); });
    });
    x2pa.append(a, b, aux, h2l);
    u.append(haksaka, x2pa);
    qaroxemaCatsaraEl.appendChild(u);
  });
}

function tlak2Sukf2qon(): void {
  const n = hasukf2qita.size;
  sukf2qoNombroEl.textContent = oct(n) + " ſᶘᴜ j͐ʃɹ";
  sukf2qoVeloEl.disabled = n === 0o0;
  const idj = [ "sukf2qoTikn", "sukf2qoMaltikn", "sukf2qoOktTikn", "sukf2qoOktMaltikn",
    "sukf2qoKvantigi", "sukf2qoDuplikati", "sukf2qoH2li", "sukf2qoCresc", "sukf2qoToot" ];
  for ( const id of idj ) kfe<HTMLButtonElement>(id).disabled = n === 0o0;
  if ( n ) {
    let sum = 0o0, cnt = 0o0;
    let cresc = true, toot = true;
    for ( const id of hasukf2qita ) {
      const no = tsaliiPerId(id);
      if ( !no ) continue;
      sum += no.v; cnt++;
      if ( no.i === "guiro" && !no.cresc ) cresc = false;
      if ( no.i === "didj" && !no.toot ) toot = false;
    }
    const mez = cnt ? sum / cnt : velo;
    sukf2qoVeloEl.valueAsNumber = mez;
    sukf2qoVelValEl.textContent = octFrak(mez, 0o100);
    sukf2qoCrescBut.setAttribute("aria-pressed", String(cresc));
    sukf2qoTootBut.setAttribute("aria-pressed", String(toot));
  } else {
    sukf2qoVelValEl.textContent = octFrak(velo, 0o100);
    sukf2qoCrescBut.setAttribute("aria-pressed", "false");
    sukf2qoTootBut.setAttribute("aria-pressed", "false");
  }
  kfe<HTMLButtonElement>("malfari").disabled = malfaraStako.length === 0o0;
  kfe<HTMLButtonElement>("refari").disabled = refaraStako.length === 0o0;
}

function tlak2Cxion(): void {
  hate2El.value = t2bakobesai.hate2;
  bpqEl.value = String(t2bakobesai.bpq);
  ppbEl.value = String(t2bakobesai.ppb);
  barojEl.valueAsNumber = t2bakobesai.haqal6kx2;
  tlak2T2bakobesaiMasukf2q();
  tlak2InstrCatsara();
  tlak2QaroxemaCatsara();
  tlak2Sukf2qon();
  tlak2Havop2kekai();
  tlak2Transporton();
  tlak2Xekuxan(progreso());
  sinkZomo();
  malpurigi();
}

// ⟪ ſᶘᴜ j͐ʃɹ , ꞙɭц , 📃 ⟫

veqapahakaniBut.addEventListener("click", veqapahakani);
kfe("halti").addEventListener("click", halti);
kfe("ciklo").addEventListener("click", () => { cikla = !cikla; tlak2Transporton(); });
kfe("metronomo").addEventListener("click", () => {
  metronoma = !metronoma;
  tlak2Transporton();
  if ( L.veqapahakani ) reveqapahakani();
});

volumoEl.addEventListener("input", () => {
  volValEl.textContent = octFrak(volumoEl.valueAsNumber, 0o100);
  if ( L.ctx && L.master ) L.master.gain.setTargetAtTime(volumoEl.valueAsNumber, L.ctx.currentTime, 0o1/0o40);
});
reverbEl.addEventListener("input", () => {
  revValEl.textContent = octFrak(reverbEl.valueAsNumber, 0o100);
  if ( L.ctx && L.revSend ) L.revSend.gain.setTargetAtTime(reverbEl.valueAsNumber, L.ctx.currentTime, 0o1/0o40);
});

t2bakobesaiMasukf2q.addEventListener("change", () => b6tem2T2bakobesai(t2bakobesaiMasukf2q.value));
hate2El.addEventListener("change", () => {
  mutigi(() => { t2bakobesai.hate2 = hate2El.value.trim() || "ſɭɜ ʃɔ"; });
});
bpqEl.addEventListener("change", () => mutigi(() => { t2bakobesai.bpq = parseInt(bpqEl.value, 0o12); }));
ppbEl.addEventListener("change", () => mutigi(() => { t2bakobesai.ppb = parseInt(ppbEl.value, 0o12); }));
barojEl.addEventListener("change", () => {
  mutigi(() => { t2bakobesai.haqal6kx2 = clamp(Math.round(barojEl.valueAsNumber) || 0o1, 0o1, 0o1000); });
});

for ( const b of hakfe<HTMLButtonElement>("#iloHacatsiina button") ) {
  b.addEventListener("click", () => {
    ilo = ( b.dataset.ilo ?? "sukf2qi" ) as Ilo;
    roll.dataset.ilo = ilo;
    for ( const x of hakfe<HTMLButtonElement>("#iloHacatsiina button") ) {
      x.setAttribute("aria-pressed", String(x === b));
    }
  });
}

kaptoEl.addEventListener("change", () => { kapto = parseInt(kaptoEl.value, 0o12); });
defSahakaniEl.addEventListener("change", () => { defSahakani = parseInt(defSahakaniEl.value, 0o12); });
veloEl.addEventListener("input", () => {
  velo = veloEl.valueAsNumber;
  velValEl.textContent = octFrak(velo, 0o100);
});
zomoTifEl.addEventListener("input", () => {
  kix2.pxs = zomoTifEl.valueAsNumber;
  zomTempValEl.textContent = oct(kix2.pxs);
  malpurigi();
});
zomoX2paEl.addEventListener("input", () => {
  kix2.rowH = zomoX2paEl.valueAsNumber;
  kix2.v0 = clamp(kix2.v0, 0o0, maxV0());
  zomVicValEl.textContent = oct(kix2.rowH);
  malpurigi();
});
kfe("qox2n2kLaqazi").addEventListener("click", (e) => {
  qox2n2kLaqazata = !qox2n2kLaqazata;
  ( e.currentTarget as HTMLElement ).setAttribute("aria-pressed", String(qox2n2kLaqazata));
  malpurigi();
});
kfe("haqaroxemaLaqazi").addEventListener("click", (e) => {
  haqaroxemaLaqazata = !haqaroxemaLaqazata;
  ( e.currentTarget as HTMLElement ).setAttribute("aria-pressed", String(haqaroxemaLaqazata));
  malpurigi();
});

let velTamaVaxafa = false;
sukf2qoVeloEl.addEventListener("pointerdown", () => {
  if ( hasukf2qita.size ) { pushMalfaron(); velTamaVaxafa = true; }
});
sukf2qoVeloEl.addEventListener("input", () => {
  const v = sukf2qoVeloEl.valueAsNumber;
  sukf2qoVelValEl.textContent = octFrak(v, 0o100);
  if ( !hasukf2qita.size ) return;
  if ( !velTamaVaxafa ) { pushMalfaron(); velTamaVaxafa = true; }
  for ( const id of hasukf2qita ) {
    const n = tsaliiPerId(id);
    if ( n ) n.v = v;
  }
  malpurigi();
});
sukf2qoVeloEl.addEventListener("change", () => {
  if ( velTamaVaxafa ) { velTamaVaxafa = false; postMutacio(); }
});

kfe("sukf2qoTikn").addEventListener("click", () => transponi(0o1));
kfe("sukf2qoMaltikn").addEventListener("click", () => transponi(-0o1));
kfe("sukf2qoOktTikn").addEventListener("click", () => transponi(0o14));
kfe("sukf2qoOktMaltikn").addEventListener("click", () => transponi(-0o14));
kfe("sukf2qoKvantigi").addEventListener("click", kvantigiSukf2qon);
kfe("sukf2qoDuplikati").addEventListener("click", duplikatiSukf2qon);
kfe("sukf2qoH2li").addEventListener("click", h2liSukf2qon);
kfe("malfari").addEventListener("click", malfari);
kfe("refari").addEventListener("click", refari);

sukf2qoCrescBut.addEventListener("click", () => {
  if ( !hasukf2qita.size ) return;
  mutigi(() => {
    let cxiuj = true;
    for ( const id of hasukf2qita ) {
      const n = tsaliiPerId(id);
      if ( n && n.i === "guiro" && !n.cresc ) cxiuj = false;
    }
    for ( const id of hasukf2qita ) {
      const n = tsaliiPerId(id);
      if ( n && n.i === "guiro" ) n.cresc = !cxiuj;
    }
  });
});
sukf2qoTootBut.addEventListener("click", () => {
  if ( !hasukf2qita.size ) return;
  mutigi(() => {
    let cxiuj = true;
    for ( const id of hasukf2qita ) {
      const n = tsaliiPerId(id);
      if ( n && n.i === "didj" && !n.toot ) cxiuj = false;
    }
    for ( const id of hasukf2qita ) {
      const n = tsaliiPerId(id);
      if ( n && n.i === "didj" ) n.toot = !cxiuj;
    }
  });
});

instrAldoniBut.addEventListener("click", () => {
  const i = instrAldoniEl.value;
  if ( !i || t2bakobesai.instrs.includes(i) ) return;
  mutigi(() => {
    t2bakobesai.instrs.push(i);
    nunInstr = i;
  });
  auxdiInstr(i);
});

kfe("qaroxemaAldoni").addEventListener("click", () => {
  mutigi(() => {
    const bar = barLong();
    const a = clamp(Math.floor(progreso() / bar) * bar, 0o0, Math.max(0o0, dur() - bar));
    const ksoz = t2bakobesai.secs.map(s => s.a).filter(x => x > a).sort((x, y) => x - y)[0o0];
    const b = ksoz ?? dur();
    t2bakobesai.secs.push({ n: "ſɭɜ ʃɔ ʌ ſɭᴜ ſןᴜ " + oct(t2bakobesai.secs.length + 0o1), a, b: Math.max(a + bar, b) });
    t2bakobesai.secs.sort((x, y) => x.a - y.a);
  });
});

// ⟪ ſɭэ ᶗ‹ , 📃 ⟫

const VETLAQILO = "http://127.0.0.1:4173/";

function elSxuti(blobo: Blob, haksaka: string): void {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blobo);
  a.download = haksaka;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0o10000);
}

function s2tasSavitan(): void {
  pura = false;
  s23ohk2saijHat2bakobesai.delete(t2bakobesai.no);
  registraKozunu = JSON.stringify(havalaqaz);
  tlak2T2bakobesaiMasukf2q();
}

async function saviHacaqavop2(): Promise<void> {
  const hacaqavop2: Record<string, string> = {};
  hacaqavop2["t2bakobesai" + t2bakobesai.no + ".ts"] = generiT2bakobesai(t2bakobesai);
  if ( registraS23ohk2sai() ) hacaqavop2["kantoj.ts"] = generiKantoj(havalaqaz);
  const haksaka = Object.keys(hacaqavop2);
  const masukf2q = window.showSaveFilePicker;
  if ( typeof masukf2q === "function" ) {
    for ( const ksaka of haksaka ) {
      try {
        const cakuk = await masukf2q({
          suggestedName: ksaka,
          types: [ { description: "TypeScript", accept: { "text/plain": [ ".ts" ] } } ],
        });
        const skribilo = await cakuk.createWritable();
        await skribilo.write(hacaqavop2[ksaka]);
        await skribilo.close();
      } catch {
        statuso("ſɭɜ j͐ʃɹ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ");
        return;
      }
    }
  } else {
    for ( const ksaka of haksaka ) elSxuti(new Blob([ hacaqavop2[ksaka] ], { type: "text/plain" }), ksaka);
  }
  s2tasSavitan();
  statuso("j͑ʃ'ɔ ſ̀ȷᴜȝ " + haksaka.join(" ｡ ") + " ✔️");
}

async function saviRekte(): Promise<void> {
  const hacaqavop2: Record<string, string> = {
    [ "muziko/t2bakobesai" + t2bakobesai.no + ".ts" ]: generiT2bakobesai(t2bakobesai),
  };
  if ( registraS23ohk2sai() ) hacaqavop2["muziko/kantoj.ts"] = generiKantoj(havalaqaz);
  try {
    const resp = await fetch(VETLAQILO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hacaqavop2 }),
    });
    if ( !resp.ok ) throw new Error(await resp.text());
    s2tasSavitan();
    statuso("j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭᴜ ſןᴜ ʌ j͑ʃᴜ ı],ɹƴ ✔️");
  } catch (er) {
    statuso("ſ̀ȷᴜ ｡ npm run dev (" + er + ")");
  }
}

function perInput(): Promise<string | null> {
  return new Promise<string | null>((solvi) => {
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = ".ts,text/plain";
    inp.addEventListener("change", () => {
      const f = inp.files?.[0o0];
      if ( !f ) { solvi(null); return; }
      void f.text().then(solvi);
    });
    inp.click();
  });
}

async function sargiT2bakobesai(): Promise<void> {
  let s2banani: string | null = null;
  let haksaka = "ſɟᴜ ｡";
  const masukf2q = window.showOpenFilePicker;
  if ( typeof masukf2q === "function" ) {
    try {
      const [ cakuk ] = await masukf2q({
        types: [ { description: "TypeScript", accept: { "text/plain": [ ".ts" ] } } ],
        multiple: false,
      });
      const dosiero = await cakuk.getFile();
      s2banani = await dosiero.text();
      haksaka = dosiero.name;
    } catch { return; }
  } else {
    s2banani = await perInput();
  }
  if ( !s2banani ) return;
  const d = parziT2bakobesai(s2banani);
  if ( !d ) {
    statuso("ſɟᴜ ｡ ſɭɜ ʃɔ ʌ ſɟᴜ ｡ " + haksaka);
    return;
  }
  kuba.set(d.no, d);
  if ( !havalaqaz.some(r => r.no === d.no) ) {
    havalaqaz.push({ no: d.no, hate2: d.hate2, titolCatlaq: d.titolCatlaq, instrs: [ ...d.instrs ] });
  }
  b6tem2T2bakobesai(d.no, true);
  statuso("ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃɹ ɭʃɜ j͑ʃᴜᶗ‹ " + haksaka + " ✔️");
}

async function elsendiWav(): Promise<void> {
  const but = kfe<HTMLButtonElement>("wav");
  but.disabled = true;
  statuso("j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ WAV ...");
  try {
    const sr = 0o126104;
    const D = dur() + 0o4;
    const off = new OfflineAudioContext(0o2, Math.ceil(D * sr), sr);
    const ctx = off as unknown as AudioContext;
    const master = off.createGain();
    master.gain.value = volumoEl.valueAsNumber;
    master.connect(off.destination);
    const reverb = off.createConvolver();
    reverb.buffer = makeIR(off, 0o5/0o2, 0o5/0o2);
    const revGain = off.createGain();
    revGain.gain.value = 0o7/0o10;
    reverb.connect(revGain);
    revGain.connect(master);
    const send = off.createGain();
    send.gain.value = reverbEl.valueAsNumber;
    send.connect(reverb);
    for ( const n of t2bakobesai.hatsal2 ) {
      if ( mutaj.has(n.i) || ( solo && solo !== n.i ) ) continue;
      const e = tsaliiAlEg2b2(n);
      const g = off.createGain();
      g.gain.value = 0o1;
      instrumento(ctx, g, e, e.t + 0o1/0o40);
      g.connect(master);
      g.connect(send);
    }
    const buf = await off.startRendering();
    elSxuti(wavDeBuffer(buf), "t2bakobesai" + t2bakobesai.no + ".wav");
    statuso("}ʃɔ ſ͕ɭɹȝ ʌ WAV ✔️");
  } catch (er) {
    statuso("WAV ｡ " + er);
  }
  but.disabled = false;
}

kfe("savi").addEventListener("click", () => void saviHacaqavop2());
kfe("saviRekte").addEventListener("click", () => void saviRekte());
kfe("sargi").addEventListener("click", () => void sargiT2bakobesai());
kfe("wav").addEventListener("click", () => void elsendiWav());

function sef4Nombro(): string {
  let n = 0o0;
  for ( const r of havalaqaz ) n = Math.max(n, parseInt(r.no, 0o12));
  return String(n + 0o1).padStart(0o2, "0");
}

kfe("t2bakobesaiSef4").addEventListener("click", () => {
  const no = sef4Nombro();
  const d: T2bakobesaiVop2 = {
    no, hate2: "j͑ʃɔ ſȷэⅎ ʌ ſɭɜ ʃɔ", titolCatlaq: null,
    bpq: 0o40, ppb: 0o10, haqal6kx2: 0o20,
    hatsal2: [], secs: [], instrs: [ "siku", "inanga", "guiro" ],
  };
  d.secs = [ { n: "ſɭɜ ʃɔ ʌ ſɭᴜ ſןᴜ ꞙɭı", a: 0o0, b: d.haqal6kx2 * caxomani(d.bpq) * d.ppb } ];
  havalaqaz.push({ no, hate2: d.hate2, titolCatlaq: null, instrs: [ ...d.instrs ] });
  kuba.set(no, d);
  s23ohk2saijHat2bakobesai.add(no);
  b6tem2T2bakobesai(no, true);
  statuso("j͑ʃɔ ſȷэⅎ ʌ ſɭɜ ʃɔ " + no + " ｡ ſᶘᴜ j͐ʃɹ ɭʃᴜ 🎼");
});

kfe("t2bakobesaiDuplikati").addEventListener("click", () => {
  const no = sef4Nombro();
  const d: T2bakobesaiVop2 = {
    no, hate2: t2bakobesai.hate2 + " ( ſɟw ɭʃᴜ )", titolCatlaq: null,
    bpq: t2bakobesai.bpq, ppb: t2bakobesai.ppb, haqal6kx2: t2bakobesai.haqal6kx2,
    hatsal2: t2bakobesai.hatsal2.map(n => ({ ...n, id: panaaId++ })),
    secs: t2bakobesai.secs.map(s => ({ ...s })),
    instrs: [ ...t2bakobesai.instrs ],
  };
  havalaqaz.push({ no, hate2: d.hate2, titolCatlaq: null, instrs: [ ...d.instrs ] });
  kuba.set(no, d);
  s23ohk2saijHat2bakobesai.add(no);
  b6tem2T2bakobesai(no, true);
  statuso("ſɭɜ ʃɔ ʌ ſɟw ɭʃᴜ " + no + " ✔️");
});

// ⟪ ſᶘᴜ j͐ʃɹ , ꞙɭэ , 📃 ⟫

function joqa(): void {
  if ( L.veqapahakani && L.ctx ) {
    const el = progreso();
    if ( !tamaVaxafa || ( tamaVaxafa.pudal !== "pani" && tamaVaxafa.pudal !== "pinch" ) ) {
      const xp = xDeT(el);
      if ( xp > W - 0o60 ) kix2.t0 = el - ( W - GUTTER ) / 0o4 / kix2.pxs;
      else if ( xp < GUTTER ) kix2.t0 = Math.max(-barLong(), el - 0o1/0o10);
    }
    tlak2Xekuxan(el);
    s23ohk2sai = true;
  }
  if ( s23ohk2sai && W > 0o0 ) k2f();
  requestAnimationFrame(joqa);
}

new ResizeObserver(grandigi).observe(roll);

// ⟪ ſɭэ ɭʃᴜ , ꞙɭɩ , 📃 ⟫

volValEl.textContent = octFrak(volumoEl.valueAsNumber, 0o100);
revValEl.textContent = octFrak(reverbEl.valueAsNumber, 0o100);
velValEl.textContent = octFrak(velo, 0o100);
roll.dataset.ilo = ilo;

const parametro = new URLSearchParams(location.search).get("t2bakobesai");
const saxea = parametro && /^\d{2}$/.test(parametro) ? parametro : "01";
grandigi();
b6tem2T2bakobesai(saxea, true);
requestAnimationFrame(joqa);

window.redaktilo = {
  t2bakobesai: () => t2bakobesai,
  pura: () => pura,
  hatsal2: () => t2bakobesai.hatsal2.length,
  havalaqaz: () => havalaqaz,
  veqapahakani: () => L.veqapahakani,
  progreso,
  grandigi,
  k2f,
  salti,
  veqapahakani,
  halti,
  malfari,
  refari,
  mutigi,
  hasukf2qita: () => [ ...hasukf2qita ],
  sukf2qiCxion: () => { hasukf2qita = new Set(t2bakobesai.hatsal2.map(n => n.id)); tlak2Sukf2qon(); malpurigi(); },
  generiT2bakobesai: () => generiT2bakobesai(t2bakobesai),
  generiKantoj: () => generiKantoj(havalaqaz),
  parziT2bakobesai,
  kix2,
  b6tem2T2bakobesai,
};