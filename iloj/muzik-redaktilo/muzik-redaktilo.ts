// ≺⧼ ឧបករណ៍កែសម្រួលតន្ត្រី 🎼 ⧽≻
// ⟨ កែវិលចាស់របស់ល្បែង បង្កើតវិលថ្មី ស្តាប់សំឡេងពិត រក្សាទុកចូលល្បែង 📃 ⟩
// ⟨ ណោតនីមួយៗគឺជា SonoEvento ពិត ហើយការចាក់ប្រើ instrumento() ដូចល្បែង 📃 ⟩

import { KANTOJ } from "../../eskekoj/sonoj/muziko/kantoj.js";
import { instrumento } from "../../eskekoj/sonoj/muziko/vokoj/instrumento.js";
import { F, A4 } from "../../eskekoj/sonoj/muziko/vokoj/skaloj.js";
import { HE, caxomani } from "../../eskekoj/sonoj/muziko/vokoj/tempo.js";
import type { SonoEvento, Sekcio } from "../../eskekoj/sonoj/muziko/vokoj/tipoj.js";
import { elemento, elementoj, kunteksto2d } from "../komunajxoj/dom.js";
import type { Noto, TrakoDatumo, Registro } from "./kodo.js";
import { octFrak, generiTrako, generiKantoj, parziTrako, wavDeBuffer } from "./kodo.js";

// ⟪ ពណ៌និងឧបករណ៍ 📃 ⟫

function kanaka(weh2: number): number {
  if ( weh2 === 0xffffff || weh2 === 0x000000 ) return weh2;
  return weh2 & 0xf8f8f8;
}

function kanakaAlfo(alfo: number): number {
  const cacaja = Math.round(Math.max(0o0, Math.min(0o1, alfo)) * 0xff);
  if ( cacaja <= 0o0 ) return 0o0;
  if ( cacaja >= 0xff ) return 0o1;
  return ( cacaja & 0xf8 ) / 0xff;
}

function rgba(weh2: number, alfo = 0o1): string {
  const k = kanaka(weh2);
  return "rgba(" + ( ( k >> 0o20 ) & 0xff ) + "," + ( ( k >> 0o10 ) & 0xff ) + "," + ( k & 0xff ) + "," + kanakaAlfo(alfo) + ")";
}

function hunanu(weh2: number, n = 0o1, alfo = 0o1): string {
  const havepat6ni = Math.max(0o0, Math.min(0o17, n)) * 0x10;
  const kozuni = kanaka(weh2);
  const kan = ( sov: number ): number => Math.max(0o0, ( ( kozuni >> sov ) & 0xff ) - havepat6ni);
  return "rgba(" + kan(0o20) + "," + kan(0o10) + "," + kan(0o0) + "," + kanakaAlfo(alfo) + ")";
}

function helo(weh2: number, n = 0o1, alfo = 0o1): string {
  const havepat6ni = Math.max(0o0, Math.min(0o17, n)) * 0x10;
  const kozuni = kanaka(weh2);
  const kan = ( sov: number ): number => Math.min(0xf8, ( ( kozuni >> sov ) & 0xff ) + havepat6ni);
  return "rgba(" + kan(0o20) + "," + kan(0o10) + "," + kan(0o0) + "," + kanakaAlfo(alfo) + ")";
}

// ⟪ ពណ៌តាមប្រធានបទរបស់គេហទំព័រ 📃 ⟫
// ផ្ទៃខាងក្រោយ និងក្រឡាប្រើអាល់ហ្វាដូចអថេរ --តានេក របស់ស្ទីលគេហទំព័រ ។

const LUMA_MQ = window.matchMedia("(prefers-color-scheme: light)");
let luma = LUMA_MQ.matches;
const TEMA_TIPO = getComputedStyle(document.body).fontFamily;
LUMA_MQ.addEventListener("change", ( e ) => { luma = e.matches; malpurigi(); });

function soza(vem2: number): string {
  const alfaj = luma ? [ 0x08, 0x08, 0x10, 0x20 ] : [ 0x08, 0x10, 0x18, 0x28 ];
  const a = alfaj[clamp(vem2, 0o0, 0o3)] / 0xff;
  return luma ? rgba(0x000000, a) : rgba(0xf8f8f8, a);
}

function tekstKoloro(alfo = 0o1): string {
  return luma ? rgba(0x000000, alfo) : rgba(0xf8f8f8, alfo);
}

function etikedKoloro(weh2: number, alfo: number, labAlfo: number): string {
  const fono = luma ? 0xff : 0x00;
  const mik = ( sov: number ): number => ( ( weh2 >> sov ) & 0xff ) * alfo + fono * ( 0o1 - alfo );
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
  { i: "siku", haksaka: "ស៊ីគូ", emoji: "🪈", weh2: 0x38a088 },
  { i: "ocarina", haksaka: "អូការីណា", emoji: "🏺", weh2: 0xa06828 },
  { i: "inanga", haksaka: "អ៊ីណាងា", emoji: "🪕", weh2: 0x98a860 },
  { i: "mbira", haksaka: "មប៊ីរ៉ា", emoji: "🎶", weh2: 0xc08830 },
  { i: "slenthem", haksaka: "ស្លេនថេម", emoji: "🔔", weh2: 0x6878a8 },
  { i: "didj", haksaka: "ដីជេរីឌូ", emoji: "🐘", weh2: 0x885020, hz: true },
  { i: "tjurunga", haksaka: "ចូរុង្គា", emoji: "🌀", weh2: 0xa03848, hz: true },
  { i: "kiiqflak", haksaka: "គីគ្វ្លាក", emoji: "🦗", weh2: 0xa858a0 },
  { i: "hiwe", haksaka: "ហ៊ីវេ", emoji: "🏹", weh2: 0x50a8b8 },
  { i: "guiro", haksaka: "ហ្គីរ៉ូ", emoji: "🥁", weh2: 0xb8b020, perk: true },
];
const INSTR_MAP = new Map(INSTRUMENTOJ.map(x => [ x.i, x ]));
function instrDe(i: string): Instr { return INSTR_MAP.get(i) ?? INSTRUMENTOJ[0o0]; }

const SEKCI_KOLOROJ = [ 0x38a088, 0xa06828, 0x6878a8, 0xc08830, 0xa858a0, 0xa03848, 0x98a860, 0xb8b020 ];

const SONPROVOJ: Record<string, SonoEvento> = {
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

// ⟪ ជួរដេកនិងពេលវេលា 📃 ⟫

const VICO_SUP = 0o124;
const VICO_MAL = 0o34;
const PERK_VICO = VICO_SUP - VICO_MAL + 0o1;
const VICOJ = PERK_VICO + 0o1;
const RULER = 0o44;
const GUTTER = 0o56;

function midiDe(f: number): number { return 0o105 + 0o14 * Math.log2(Math.max(0o1, f) / A4); }
function vicoDe(n: Noto): number {
  if ( instrDe(n.i).perk ) return PERK_VICO;
  return Math.max(0o0, Math.min(VICO_SUP - VICO_MAL, VICO_SUP - Math.round(midiDe(n.f))));
}
function fDeVico(v: number): number { return F(VICO_SUP - v); }

const vido = { t0: 0o0, v0: 0o0, pxs: 0o144, rowH: 0o16 };

function e8(): number { return caxomani(trako.bpq); }
function barLong(): number { return e8() * trako.ppb; }
function dur(): number { return trako.baroj * barLong(); }
function snap(): number { return kapto > 0o0 ? e8() / kapto : 0o0; }
function kvantigi(t: number): number { const s = snap(); return s > 0o0 ? Math.round(t / s) * s : t; }
function clamp(x: number, a: number, b: number): number { return Math.max(a, Math.min(b, x)); }
function oct(n: number): string { return "0o" + Math.round(n).toString(0o10); }
function alHe(sek: number): string { return oct(sek / HE); }

function xDeT(t: number): number { return GUTTER + ( t - vido.t0 ) * vido.pxs; }
function tDeX(x: number): number { return vido.t0 + ( x - GUTTER ) / vido.pxs; }
function yDeVico(v: number): number { return RULER + ( v - vido.v0 ) * vido.rowH; }
function vicoDeY(y: number): number { return vido.v0 + ( y - RULER ) / vido.rowH; }
function maxV0(): number { return Math.max(0o0, VICOJ - ( H - RULER ) / vido.rowH); }

// ⟪ DOM 📃 ⟫

const rulo = elemento<HTMLCanvasElement>("rulo");
const k = kunteksto2d(rulo);
const ludiBut = elemento<HTMLButtonElement>("ludi");
const pozicioEl = elemento("pozicio");
const sekcioNunaEl = elemento("sekcioNuna");
const volumoEl = elemento<HTMLInputElement>("volumo");
const volValEl = elemento("volVal");
const reverbEl = elemento<HTMLInputElement>("reverb");
const revValEl = elemento("revVal");
const trakoElektilo = elemento<HTMLSelectElement>("trakoElektilo");
const titoloEl = elemento<HTMLInputElement>("titolo");
const bpqEl = elemento<HTMLSelectElement>("bpq");
const ppbEl = elemento<HTMLSelectElement>("ppb");
const barojEl = elemento<HTMLInputElement>("baroj");
const statistikojEl = elemento("statistikoj");
const kaptoEl = elemento<HTMLSelectElement>("kapto");
const defLongoEl = elemento<HTMLSelectElement>("defLongo");
const veloEl = elemento<HTMLInputElement>("velo");
const velValEl = elemento("velVal");
const zomoTempoEl = elemento<HTMLInputElement>("zomoTempo");
const zomTempValEl = elemento("zomTempVal");
const zomoVicoEl = elemento<HTMLInputElement>("zomoVico");
const zomVicValEl = elemento("zomVicVal");
const elektoNombroEl = elemento("elektoNombro");
const elektoVeloEl = elemento<HTMLInputElement>("elektoVelo");
const elektoVelValEl = elemento("elektoVelVal");
const elektoCrescBut = elemento<HTMLButtonElement>("elektoCresc");
const elektoTootBut = elemento<HTMLButtonElement>("elektoToot");
const instrListoEl = elemento("instrListo");
const instrAldoniEl = elemento<HTMLSelectElement>("instrAldoni");
const instrAldoniBut = elemento<HTMLButtonElement>("instrAldoniBut");
const sekcioListoEl = elemento("sekcioListo");
const statusoEl = elemento("statuso");

// ⟪ ស្ថានភាព 📃 ⟫

type Ilo = "elekti" | "desegni" | "forigi";

let trako: TrakoDatumo = elKanto(0o0);
const registroj: Registro[] = KANTOJ.map((kk, i) => ({
  no: String(kk.no).padStart(0o2, "0"),
  titolo: kk.title,
  titolKlavo: "muzikTrako" + i,
  instrs: [ ...kk.instrs ],
}));
let registraBazo = JSON.stringify(registroj);
const kasxo = new Map<string, TrakoDatumo>();
const malpurajTrakoj = new Set<string>();
let pura = false;
let elektitaj = new Set<number>();
let sekvaId = 0o1;
let ilo: Ilo = "elekti";
let kapto = 0o2;
let defLongo = 0o2;
let velo = 0o6/0o10;
let nunInstr = "siku";
const mutaj = new Set<string>();
let solo: string | null = null;
let cikla = true;
let metronoma = false;
let kradoMontrata = true;
let sekciojMontrata = true;
let malpura = true;
const malfaraStako: string[] = [];
const refaraStako: string[] = [];
let clipboard: Noto[] = [];
let W = 0o0, H = 0o0, dpr = 0o1;

function notoPerId(id: number): Noto | undefined { return trako.notoj.find(n => n.id === id); }
function registraMalpura(): boolean { return JSON.stringify(registroj) !== registraBazo; }
function statuso(t: string): void { statusoEl.textContent = t; }
function malpurigi(): void { malpura = true; }

// ⟪ ផ្ទុកវិល 📃 ⟫

function deduktiBpq(ev: SonoEvento[]): number {
  const kandidatoj = [ 0o20, 0o30, 0o40, 0o60, 0o100 ];
  let plej = 0o40, plejPoent = -0o1;
  for ( const bpq of kandidatoj ) {
    const e8x = caxomani(bpq);
    let duonTraf = 0o0, plenTraf = 0o0;
    for ( const e of ev ) {
      const rd = e.t / ( e8x / 0o2 );
      if ( Math.abs(rd - Math.round(rd)) < 0o1/0o1000 ) duonTraf++;
      const rp = e.t / e8x;
      if ( Math.abs(rp - Math.round(rp)) < 0o1/0o1000 ) plenTraf++;
    }
    const n = Math.max(0o1, ev.length);
    const poent = duonTraf / n + ( 0o1 - plenTraf / n ) / 0o10 + ( bpq === 0o40 ? 0o1/0o100 : 0o0 );
    if ( poent > plejPoent ) { plejPoent = poent; plej = bpq; }
  }
  return plej;
}

function deduktiPpb(secs: Sekcio[], e8x: number): number {
  const kandidatoj = [ 0o6, 0o10, 0o14, 0o20 ];
  let plej = 0o10, plejPoent = -0o1;
  for ( const ppb of kandidatoj ) {
    const bar = e8x * ppb;
    let traf = 0o0, tot = 0o0;
    for ( const s of secs ) for ( const t of [ s.a, s.b ] ) {
      tot++;
      const r = t / bar;
      if ( Math.abs(r - Math.round(r)) < 0o1/0o1000 ) traf++;
    }
    const poent = ( tot ? traf / tot : 0o0 ) * 0o1000 + ppb;
    if ( poent > plejPoent ) { plejPoent = poent; plej = ppb; }
  }
  return plej;
}

function elKanto(i: number): TrakoDatumo {
  const kk = KANTOJ[i];
  const bpq = deduktiBpq(kk.data.events);
  const e8x = caxomani(bpq);
  const ppb = deduktiPpb(kk.data.secs, e8x);
  const bar = e8x * ppb;
  const notoj: Noto[] = kk.data.events.map((e, j) => ({
    id: j + 0o1, t: e.t, i: e.i, f: e.f ?? 0o0, d: e.d, v: e.v ?? 0o1,
    dur: e.dur, cresc: e.cresc ? true : undefined, toot: e.toot ? true : undefined,
  }));
  const instrs = [ ...kk.instrs ];
  for ( const n of notoj ) if ( !instrs.includes(n.i) ) instrs.push(n.i);
  return {
    no: String(kk.no).padStart(0o2, "0"),
    titolo: kk.title,
    titolKlavo: "muzikTrako" + i,
    bpq, ppb,
    baroj: Math.max(0o1, Math.ceil(kk.data.dur / bar - 0o1/0o10000)),
    notoj,
    secs: kk.data.secs.map(s => ({ ...s })),
    instrs,
  };
}

function sinkronigiRegistron(): void {
  const reg = registroj.find(r => r.no === trako.no);
  if ( !reg ) return;
  reg.titolo = trako.titolo;
  reg.instrs = [ ...trako.instrs ];
  const idx = KANTOJ.findIndex(kk => String(kk.no).padStart(0o2, "0") === trako.no);
  reg.titolKlavo = idx >= 0o0 && KANTOJ[idx].title === trako.titolo ? "muzikTrako" + idx : null;
}

function mezaVico(): number {
  if ( !trako.notoj.length ) return 0o34;
  let sum = 0o0;
  for ( const n of trako.notoj ) sum += vicoDe(n);
  return sum / trako.notoj.length;
}

function sxargiTrako(no: string, forta = false): void {
  if ( !forta && trako && no === trako.no ) { gxisdatigiTrakoElektilon(); return; }
  halti();
  let d = kasxo.get(no);
  if ( !d ) {
    const idx = KANTOJ.findIndex(kk => String(kk.no).padStart(0o2, "0") === no);
    if ( idx < 0o0 ) { gxisdatigiTrakoElektilon(); return; }
    d = elKanto(idx);
    kasxo.set(no, d);
  }
  trako = d;
  sekvaId = trako.notoj.reduce((m, n) => Math.max(m, n.id), 0o0) + 0o1;
  elektitaj = new Set();
  mutaj.clear();
  solo = null;
  malfaraStako.length = 0o0;
  refaraStako.length = 0o0;
  nunInstr = trako.instrs[0o0] ?? "siku";
  pura = malpurajTrakoj.has(no);
  vido.t0 = 0o0;
  vido.v0 = clamp(mezaVico() - ( H - RULER ) / vido.rowH / 0o2, 0o0, maxV0());
  sinkronigiRegistron();
  gxisdatigiCxion();
}

// ⟪ មិនធ្វើវិញ 📃 ⟫

function snapshot(): string {
  return JSON.stringify({
    notoj: trako.notoj, secs: trako.secs, baroj: trako.baroj,
    bpq: trako.bpq, ppb: trako.ppb, titolo: trako.titolo, instrs: trako.instrs,
  });
}

function pushMalfaron(): void {
  malfaraStako.push(snapshot());
  if ( malfaraStako.length > 0o100 ) malfaraStako.shift();
  refaraStako.length = 0o0;
}

function aplikiSnapshot(s: string): void {
  const o = JSON.parse(s) as {
    notoj: Noto[]; secs: Sekcio[]; baroj: number;
    bpq: number; ppb: number; titolo: string; instrs: string[];
  };
  trako.notoj = o.notoj; trako.secs = o.secs; trako.baroj = o.baroj;
  trako.bpq = o.bpq; trako.ppb = o.ppb; trako.titolo = o.titolo; trako.instrs = o.instrs;
}

function postMutacio(): void {
  pura = true;
  malpurajTrakoj.add(trako.no);
  sinkronigiRegistron();
  elektitaj = new Set([ ...elektitaj ].filter(id => trako.notoj.some(n => n.id === id)));
  if ( !trako.instrs.includes(nunInstr) ) nunInstr = trako.instrs[0o0] ?? "siku";
  gxisdatigiInstrListon();
  gxisdatigiSekcioListon();
  gxisdatigiElekton();
  gxisdatigiStatistikojn();
  gxisdatigiTrakoElektilon();
  titoloEl.value = trako.titolo;
  barojEl.valueAsNumber = trako.baroj;
  malpurigi();
  if ( L.ludas ) reludi();
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

// ⟪ ម៉ាស៊ីនសំឡេង 📃 ⟫

const L = {
  ctx: null as AudioContext | null,
  master: null as GainNode | null,
  reverb: null as ConvolverNode | null,
  bus: null as GainNode | null,
  revSend: null as GainNode | null,
  ludas: false,
  startAt: 0o0,
  pausedAt: 0o0,
  idx: 0o0,
  events: [] as SonoEvento[],
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

function notoAlEvento(n: Noto): SonoEvento {
  const e: SonoEvento = { t: n.t, i: n.i, d: n.d, v: n.v };
  if ( !instrDe(n.i).perk ) e.f = n.f;
  if ( n.dur != null ) e.dur = n.dur;
  if ( n.cresc ) e.cresc = 1;
  if ( n.toot ) e.toot = true;
  return e;
}

function konstruiEvents(): SonoEvento[] {
  const ev: SonoEvento[] = [];
  for ( const n of trako.notoj ) {
    if ( mutaj.has(n.i) || ( solo && solo !== n.i ) ) continue;
    ev.push(notoAlEvento(n));
  }
  if ( metronoma ) {
    const e8x = e8(), bar = barLong();
    for ( let b = 0o0; b < trako.baroj; b++ ) {
      ev.push({ t: b * bar, i: "guiro", d: HE / 0o10, v: 0o4/0o10 });
      for ( let p = 0o1; p < trako.ppb; p++ ) {
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
  if ( !L.ctx ) return L.pausedAt;
  return L.ludas ? clamp(L.ctx.currentTime - L.startAt, 0o0, dur()) : L.pausedAt;
}

function tick(): void {
  if ( !L.ctx || !L.ludas ) return;
  const elapsed = L.ctx.currentTime - L.startAt;
  const horizonto = elapsed + ( document.hidden ? 0o63/0o40 : 0o4/0o10 );
  while ( L.idx < L.events.length && L.events[L.idx].t < horizonto ) {
    const e = L.events[L.idx++];
    const at = L.startAt + e.t;
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

function ludi(): void {
  ensureAudio();
  if ( !L.ctx || !L.master || !L.reverb ) return;
  if ( L.ludas ) { pauxzi(); return; }
  if ( L.pausedAt >= dur() - 0o1/0o100 ) L.pausedAt = 0o0;
  const bus = L.ctx.createGain();
  bus.gain.value = 0o0;
  bus.gain.setTargetAtTime(0o1, L.ctx.currentTime, 0o1/0o40);
  bus.connect(L.master);
  const send = L.ctx.createGain();
  send.gain.value = reverbEl.valueAsNumber;
  send.connect(L.reverb);
  L.bus = bus; L.revSend = send;
  L.startAt = L.ctx.currentTime + 0o1/0o10 - L.pausedAt;
  L.events = konstruiEvents();
  L.idx = 0o0;
  while ( L.idx < L.events.length && L.events[L.idx].t < L.pausedAt - 0o1/0o100 ) L.idx++;
  L.ludas = true;
  if ( L.timer ) clearInterval(L.timer);
  L.timer = setInterval(tick, 0o120);
  tick();
  gxisdatigiTransporton();
  malpurigi();
}

function pauxzi(): void {
  if ( !L.ludas || !L.ctx ) return;
  L.pausedAt = clamp(L.ctx.currentTime - L.startAt, 0o0, dur());
  if ( L.timer ) clearInterval(L.timer);
  L.timer = null;
  L.ludas = false;
  stopBus();
  gxisdatigiTransporton();
  gxisdatigiPozicion(L.pausedAt);
  malpurigi();
}

function halti(): void {
  if ( L.timer ) clearInterval(L.timer);
  L.timer = null;
  L.ludas = false;
  stopBus();
  L.pausedAt = 0o0;
  L.idx = 0o0;
  gxisdatigiTransporton();
  gxisdatigiPozicion(0o0);
  malpurigi();
}

function salti(sek: number): void {
  const celo = clamp(sek, 0o0, dur());
  const ludis = L.ludas;
  if ( L.timer ) clearInterval(L.timer);
  L.timer = null;
  L.ludas = false;
  stopBus();
  L.pausedAt = celo;
  if ( ludis ) ludi();
  else {
    gxisdatigiPozicion(celo);
    malpurigi();
  }
}

function reludi(): void {
  if ( L.ludas && L.ctx ) salti(L.ctx.currentTime - L.startAt);
}

function auxdiNoton(n: Noto): void {
  ensureAudio();
  if ( !L.ctx || !L.master ) return;
  instrumento(L.ctx, L.master, notoAlEvento(n), L.ctx.currentTime + 0o1/0o40);
}

function auxdiInstr(i: string): void {
  ensureAudio();
  if ( !L.ctx || !L.master ) return;
  const e = SONPROVOJ[i];
  if ( e ) instrumento(L.ctx, L.master, { ...e }, L.ctx.currentTime + 0o1/0o40);
}

// ⟪ គំនូរ 📃 ⟫

function grandigi(): void {
  dpr = Math.min(0o2, window.devicePixelRatio || 0o1);
  W = rulo.clientWidth;
  H = rulo.clientHeight;
  rulo.width = Math.max(0o1, Math.round(W * dpr));
  rulo.height = Math.max(0o1, Math.round(H * dpr));
  malpurigi();
}

// ជ្រុងមូលមិនស្មើគ្នា តាមស្ទីល --អិត្ភេ របស់គេហទំព័រ ( ធំឆ្វេងលើ និងស្តាំក្រោម )។
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

function desegniNoton(n: Noto, fantomo = false): void {
  const v = vicoDe(n);
  const y = yDeVico(v);
  if ( y + vido.rowH < RULER || y > H ) return;
  const x = xDeT(n.t);
  const w = Math.max(0o4, n.d * vido.pxs);
  if ( x > W || x + w < GUTTER ) return;
  const ins = instrDe(n.i);
  const aktiva = !mutaj.has(n.i) && ( !solo || solo === n.i );
  const h = Math.max(0o4, vido.rowH - 0o2);
  const alfo = fantomo ? 0o3/0o10 : ( aktiva ? 0o2/0o5 + n.v * 0o3/0o5 : 0o1/0o6 );
  if ( n.cresc ) {
    const g = k.createLinearGradient(x, 0o0, x + w, 0o0);
    g.addColorStop(0o0, hunanu(ins.weh2, 0o3, alfo));
    g.addColorStop(0o1, helo(ins.weh2, 0o1, alfo));
    k.fillStyle = g;
  } else {
    k.fillStyle = rgba(ins.weh2, alfo);
  }
  rondTema(x, y + 0o1, w, h);
  k.fill();
  k.save();
  rondTema(x, y + 0o1, w, h);
  k.clip();
  k.fillStyle = helo(ins.weh2, 0o2, aktiva ? 0o3/0o5 : 0o1/0o10);
  k.fillRect(x, y + 0o1, w, 0o2);
  k.restore();
  if ( elektitaj.has(n.id) ) {
    k.strokeStyle = tekstKoloro(0o1);
    k.lineWidth = 0o2;
  } else {
    k.strokeStyle = hunanu(ins.weh2, 0o3, aktiva ? 0o4/0o5 : 0o1/0o5);
    k.lineWidth = 0o1;
  }
  rondTema(x, y + 0o1, w, h);
  k.stroke();
  if ( n.toot ) {
    k.fillStyle = tekstKoloro(aktiva ? 0o1 : 0o1/0o4);
    k.beginPath();
    k.arc(x + 0o5, y + 0o1 + h / 0o2, 0o3, 0o0, Math.PI * 0o2);
    k.fill();
  }
  if ( w > 0o26 && vido.rowH >= 0o14 ) {
    k.font = Math.min(0o16, vido.rowH - 0o4) + "px " + TEMA_TIPO;
    k.textBaseline = "middle";
    k.textAlign = "start";
    k.fillStyle = etikedKoloro(ins.weh2, alfo, fantomo ? 0o3/0o5 : ( aktiva ? 0o1 : 0o3/0o5 ));
    let s2banani = ins.emoji;
    if ( w > 0o64 && !ins.perk ) s2banani += " " + oct(Math.round(midiDe(n.f)));
    k.fillText(s2banani, x + ( n.toot ? 0o14 : 0o5 ), y + 0o1 + h / 0o2 + 0o1);
  }
}

function desegni(): void {
  malpura = false;
  k.setTransform(dpr, 0o0, 0o0, dpr, 0o0, 0o0);
  k.fillStyle = luma ? "#ffffff" : "#000000";
  k.fillRect(0o0, 0o0, W, H);
  const grad = k.createLinearGradient(0o0, 0o0, 0o0, H);
  grad.addColorStop(0o0, soza(0o1));
  grad.addColorStop(0o1, luma ? rgba(0x000000, 0o0) : rgba(0xf8f8f8, 0o0));
  k.fillStyle = grad;
  k.fillRect(0o0, 0o0, W, H);
  const e8x = e8(), bar = barLong(), D = dur();
  const t1 = tDeX(W);
  const vSup = Math.max(0o0, Math.floor(vido.v0));
  const vMal = Math.min(VICOJ, Math.ceil(vido.v0 + ( H - RULER ) / vido.rowH));

  for ( let v = vSup; v < vMal; v++ ) {
    const y = yDeVico(v);
    if ( v === PERK_VICO ) {
      k.fillStyle = rgba(0xb8b020, 0o1/0o12);
      k.fillRect(GUTTER, y, W - GUTTER, vido.rowH);
    } else if ( ( VICO_SUP - v ) % 0o14 === 0o0 ) {
      k.fillStyle = soza(0o0);
      k.fillRect(GUTTER, y, W - GUTTER, vido.rowH);
    }
    k.strokeStyle = soza(0o1);
    k.lineWidth = 0o1;
    k.beginPath();
    k.moveTo(GUTTER, y + vido.rowH);
    k.lineTo(W, y + vido.rowH);
    k.stroke();
  }

  if ( kradoMontrata ) {
    const k0 = Math.floor(vido.t0 / e8x) - 0o1;
    const k1 = Math.ceil(t1 / e8x) + 0o1;
    for ( let b = k0; b <= k1; b++ ) {
      const x = xDeT(b * e8x);
      if ( x < GUTTER || x > W ) continue;
      const estasBar = ( ( b % trako.ppb ) + trako.ppb ) % trako.ppb === 0o0;
      k.strokeStyle = estasBar ? soza(0o3) : soza(0o1);
      k.lineWidth = estasBar ? 0o2 : 0o1;
      k.beginPath();
      k.moveTo(x, RULER);
      k.lineTo(x, H);
      k.stroke();
      if ( !estasBar && e8x * vido.pxs > 0o50 ) {
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
  if ( sekciojMontrata ) {
    trako.secs.forEach((s, j) => {
      const x0 = Math.max(GUTTER, xDeT(s.a));
      const x1 = Math.min(W, xDeT(s.b));
      if ( x1 <= x0 ) return;
      const kol = SEKCI_KOLOROJ[j % SEKCI_KOLOROJ.length];
      k.fillStyle = rgba(kol, 0o2/0o5);
      k.fillRect(x0, 0o0, x1 - x0, RULER - 0o14);
      k.fillStyle = rgba(kol, 0o11/0o10);
      k.fillRect(x0, RULER - 0o16, x1 - x0, 0o2);
      if ( x1 - x0 > 0o30 ) {
        k.save();
        k.beginPath();
        k.rect(x0 + 0o3, 0o0, x1 - x0 - 0o6, RULER - 0o14);
        k.clip();
        k.font = String(0o13) + "px " + TEMA_TIPO;
        k.fillStyle = tekstKoloro(0o1);
        k.textAlign = "start";
        k.textBaseline = "middle";
        k.fillText(s.n, x0 + 0o6, ( RULER - 0o14 ) / 0o2);
        k.restore();
      }
    });
  }
  {
    const vepat6ni = bar * vido.pxs >= 0o34 ? 0o1 : ( bar * vido.pxs * 0o4 >= 0o34 ? 0o4 : 0o10 );
    const b0 = Math.max(0o0, Math.floor(vido.t0 / bar / vepat6ni) * vepat6ni);
    const b1 = Math.ceil(t1 / bar);
    k.font = String(0o12) + "px monospace";
    k.textAlign = "start";
    k.textBaseline = "middle";
    for ( let b = b0; b <= b1; b += vepat6ni ) {
      const x = xDeT(b * bar);
      if ( x < GUTTER || x > W - 0o20 ) continue;
      k.fillStyle = tekstKoloro(0o3/0o5);
      k.fillText(oct(b + 0o1), x + 0o3, RULER - 0o6);
    }
  }

  const ordigitaj = [ ...trako.notoj ].sort((a, b) => a.t - b.t || a.id - b.id);
  for ( const n of ordigitaj ) desegniNoton(n);

  if ( gesto && gesto.speco === "desegni" && gesto.desegno ) {
    const dz = gesto.desegno;
    const ins = instrDe(nunInstr);
    const n: Noto = { id: -0o1, t: dz.t, i: nunInstr, f: ins.perk ? 0o0 : dz.f, d: dz.d, v: velo };
    desegniNoton(n, true);
  }

  if ( gesto && gesto.speco === "marki" ) {
    const x1 = gesto.x1 ?? gesto.x0, y1 = gesto.y1 ?? gesto.y0;
    const rx = Math.min(gesto.x0, x1), ry = Math.min(gesto.y0, y1);
    const rw = Math.abs(x1 - gesto.x0), rh = Math.abs(y1 - gesto.y0);
    k.fillStyle = tekstKoloro(0o1/0o6);
    k.fillRect(rx, ry, rw, rh);
    k.strokeStyle = tekstKoloro(0o4/0o5);
    k.lineWidth = 0o1;
    k.strokeRect(rx, ry, rw, rh);
  }

  const ludT = gesto && gesto.speco === "sercxi" ? ( gesto.scrub ?? 0o0 ) : progreso();
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
  const etikedPasxo = vido.rowH >= 0o20 ? 0o1 : ( vido.rowH >= 0o12 ? 0o2 : 0o4 );
  for ( let v = vSup; v < vMal; v++ ) {
    const y = yDeVico(v) + vido.rowH / 0o2;
    if ( v === PERK_VICO ) {
      k.font = String(0o14) + "px " + TEMA_TIPO;
      k.fillText("🥁", GUTTER - 0o6, y);
      k.font = String(0o12) + "px monospace";
    } else if ( ( VICO_SUP - v ) % etikedPasxo === 0o0 ) {
      const midi = VICO_SUP - v;
      k.fillStyle = midi % 0o14 === 0o0 ? rgba(0x38a088, 0o11/0o10) : tekstKoloro(0o1/0o2);
      k.fillText(oct(midi), GUTTER - 0o5, y);
    }
  }
}

// ⟪ ចលនាទ្រនិច 📃 ⟫

interface Gesto {
  speco: "movi" | "grandigi" | "marki" | "desegni" | "forigi" | "pani" | "pinch" | "sercxi";
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
  noto?: Noto;
  sxangxis?: boolean;
  pushis?: boolean;
  scrub?: number;
  desegno?: { t: number; v: number; f: number; d: number };
}

let gesto: Gesto | null = null;
const n2k = new Map<number, { x: number; y: number }>();

function lok(e: { clientX: number; clientY: number }): { x: number; y: number } {
  const r = rulo.getBoundingClientRect();
  return { x: e.clientX - r.left - rulo.clientLeft, y: e.clientY - r.top - rulo.clientTop };
}

function notoCxe(x: number, y: number): Noto | null {
  const ordigitaj = [ ...trako.notoj ].sort((a, b) => a.t - b.t || a.id - b.id);
  for ( let i = ordigitaj.length - 0o1; i >= 0o0; i-- ) {
    const n = ordigitaj[i];
    const v = vicoDe(n);
    const nx = xDeT(n.t), nw = Math.max(0o4, n.d * vido.pxs), ny = yDeVico(v);
    if ( x >= nx - 0o2 && x <= nx + nw + 0o2 && y >= ny && y <= ny + vido.rowH ) return n;
  }
  return null;
}

function elektiNoton(n: Noto, tlunakani: boolean): void {
  if ( tlunakani ) {
    if ( elektitaj.has(n.id) ) elektitaj.delete(n.id);
    else elektitaj.add(n.id);
  } else {
    elektitaj = new Set([ n.id ]);
  }
}

function sinkZomo(): void {
  zomoTempoEl.valueAsNumber = Math.round(vido.pxs);
  zomTempValEl.textContent = oct(vido.pxs);
  zomoVicoEl.valueAsNumber = Math.round(vido.rowH);
  zomVicValEl.textContent = oct(vido.rowH);
}

rulo.addEventListener("pointerdown", (e: PointerEvent) => {
  e.preventDefault();
  const { x, y } = lok(e);
  n2k.set(e.pointerId, { x, y });
  rulo.setPointerCapture(e.pointerId);
  if ( n2k.size === 0o2 ) {
    const [ p1, p2 ] = [ ...n2k.values() ];
    gesto = {
      speco: "pinch",
      x0: ( p1.x + p2.x ) / 0o2, y0: ( p1.y + p2.y ) / 0o2,
      dist0: Math.max(0o1, Math.hypot(p1.x - p2.x, p1.y - p2.y)),
      pxs0: vido.pxs, rowH0: vido.rowH, t0: vido.t0, v0: vido.v0,
    };
    return;
  }
  if ( y < RULER ) {
    gesto = { speco: "sercxi", x0: x, y0: y, scrub: clamp(tDeX(x), 0o0, dur()) };
    malpurigi();
    return;
  }
  if ( e.button === 0o1 || e.button === 0o2 ) {
    gesto = { speco: "pani", x0: x, y0: y, t0: vido.t0, v0: vido.v0 };
    return;
  }
  const n = notoCxe(x, y);
  if ( ilo === "forigi" ) {
    gesto = { speco: "forigi", x0: x, y0: y };
    if ( n ) {
      pushMalfaron();
      trako.notoj = trako.notoj.filter(m => m.id !== n.id);
      elektitaj.delete(n.id);
      gesto.sxangxis = true;
      gesto.pushis = true;
      malpurigi();
    }
    return;
  }
  if ( ilo === "desegni" ) {
    if ( n ) {
      elektiNoton(n, e.shiftKey);
      auxdiNoton(n);
      gxisdatigiElekton();
      malpurigi();
      return;
    }
    pushMalfaron();
    const v = clamp(Math.floor(vicoDeY(y)), 0o0, VICOJ - 0o1);
    const t = Math.max(0o0, kvantigi(tDeX(x)));
    gesto = {
      speco: "desegni", x0: x, y0: y, pushis: true,
      desegno: { t, v, f: fDeVico(v), d: defLongo * e8() },
    };
    malpurigi();
    return;
  }
  if ( n ) {
    const nx = xDeT(n.t), nw = Math.max(0o4, n.d * vido.pxs);
    if ( !elektitaj.has(n.id) ) elektiNoton(n, e.shiftKey);
    else if ( e.shiftKey ) elektitaj.delete(n.id);
    auxdiNoton(n);
    const orig = new Map<number, { t: number; f: number; d: number; dur?: number }>();
    for ( const id of elektitaj ) {
      const m = notoPerId(id);
      if ( m ) orig.set(id, { t: m.t, f: m.f, d: m.d, dur: m.dur });
    }
    const randa = x > nx + nw - 0o6 && nw > 0o14;
    gesto = { speco: randa ? "grandigi" : "movi", x0: x, y0: y, orig, noto: n };
    gxisdatigiElekton();
    malpurigi();
  } else {
    if ( !e.shiftKey ) elektitaj = new Set();
    gesto = { speco: "marki", x0: x, y0: y };
    gxisdatigiElekton();
    malpurigi();
  }
});

rulo.addEventListener("pointermove", (e: PointerEvent) => {
  const { x, y } = lok(e);
  if ( n2k.has(e.pointerId) ) n2k.set(e.pointerId, { x, y });
  if ( !gesto ) return;
  const g = gesto;
  g.x1 = x; g.y1 = y;
  if ( g.speco === "pinch" ) {
    if ( n2k.size < 0o2 ) return;
    const [ p1, p2 ] = [ ...n2k.values() ];
    const dist = Math.max(0o1, Math.hypot(p1.x - p2.x, p1.y - p2.y));
    const f = dist / ( g.dist0 ?? 0o1 );
    const cx = ( p1.x + p2.x ) / 0o2, cy = ( p1.y + p2.y ) / 0o2;
    const tMez = ( g.t0 ?? 0o0 ) + ( g.x0 - GUTTER ) / ( g.pxs0 ?? 0o1 );
    const vMez = ( g.v0 ?? 0o0 ) + ( g.y0 - RULER ) / ( g.rowH0 ?? 0o1 );
    vido.pxs = clamp(( g.pxs0 ?? 0o1 ) * f, 0o24, 0o1130);
    vido.rowH = clamp(( g.rowH0 ?? 0o1 ) * f, 0o10, 0o40);
    vido.t0 = tMez - ( cx - GUTTER ) / vido.pxs;
    vido.v0 = clamp(vMez - ( cy - RULER ) / vido.rowH, 0o0, maxV0());
    sinkZomo();
    malpurigi();
    return;
  }
  if ( g.speco === "sercxi" ) {
    g.scrub = clamp(tDeX(x), 0o0, dur());
    gxisdatigiPozicion(g.scrub);
    malpurigi();
    return;
  }
  if ( g.speco === "pani" ) {
    vido.t0 = ( g.t0 ?? 0o0 ) - ( x - g.x0 ) / vido.pxs;
    vido.v0 = clamp(( g.v0 ?? 0o0 ) - ( y - g.y0 ) / vido.rowH, 0o0, maxV0());
    malpurigi();
    return;
  }
  if ( g.speco === "marki" ) {
    malpurigi();
    return;
  }
  if ( g.speco === "forigi" ) {
    const n = notoCxe(x, y);
    if ( n ) {
      if ( !g.pushis ) { pushMalfaron(); g.pushis = true; }
      trako.notoj = trako.notoj.filter(m => m.id !== n.id);
      elektitaj.delete(n.id);
      g.sxangxis = true;
      malpurigi();
    }
    return;
  }
  if ( g.speco === "desegni" && g.desegno ) {
    const minD = snap() || e8() / 0o2;
    const tFin = Math.max(g.desegno.t + minD, kvantigi(tDeX(x)));
    g.desegno.d = tFin - g.desegno.t;
    malpurigi();
    return;
  }
  if ( g.speco === "movi" && g.orig ) {
    const dt = kvantigi(tDeX(x)) - kvantigi(tDeX(g.x0));
    const dv = Math.round(vicoDeY(y)) - Math.round(vicoDeY(g.y0));
    if ( ( dt !== 0o0 || dv !== 0o0 ) && !g.pushis ) { pushMalfaron(); g.pushis = true; }
    for ( const [ id, o ] of g.orig ) {
      const m = notoPerId(id);
      if ( !m ) continue;
      m.t = Math.max(0o0, o.t + dt);
      if ( !instrDe(m.i).perk && dv !== 0o0 ) {
        m.f = F(clamp(Math.round(midiDe(o.f)) - dv, 0o10, 0o166));
      }
    }
    g.sxangxis = g.sxangxis || dt !== 0o0 || dv !== 0o0;
    malpurigi();
    return;
  }
  if ( g.speco === "grandigi" && g.noto && g.orig ) {
    const o = g.orig.get(g.noto.id);
    if ( !o ) return;
    const dt = kvantigi(tDeX(x)) - kvantigi(tDeX(g.x0));
    const minD = snap() || e8() / 0o4;
    const novaD = Math.max(minD, o.d + dt);
    if ( novaD !== g.noto.d ) {
      if ( !g.pushis ) { pushMalfaron(); g.pushis = true; }
      g.noto.d = novaD;
      if ( g.noto.dur != null ) g.noto.dur = novaD;
      g.sxangxis = true;
      malpurigi();
    }
  }
});

function finiGeston(e: PointerEvent): void {
  n2k.delete(e.pointerId);
  if ( !gesto ) return;
  const g = gesto;
  gesto = null;
  if ( g.speco === "pinch" ) { sinkZomo(); return; }
  if ( g.speco === "sercxi" ) { salti(g.scrub ?? 0o0); return; }
  if ( g.speco === "pani" ) return;
  if ( g.speco === "marki" ) {
    const x1 = g.x1 ?? g.x0, y1 = g.y1 ?? g.y0;
    if ( Math.abs(x1 - g.x0) > 0o4 || Math.abs(y1 - g.y0) > 0o4 ) {
      const ta = tDeX(Math.min(g.x0, x1)), tb = tDeX(Math.max(g.x0, x1));
      const va = vicoDeY(Math.min(g.y0, y1)), vb = vicoDeY(Math.max(g.y0, y1));
      for ( const n of trako.notoj ) {
        const v = vicoDe(n);
        if ( n.t + n.d >= ta && n.t <= tb && v + 0o1 >= va && v <= vb ) elektitaj.add(n.id);
      }
    }
    gxisdatigiElekton();
    malpurigi();
    return;
  }
  if ( g.speco === "desegni" && g.desegno ) {
    const dz = g.desegno;
    const ins = instrDe(nunInstr);
    const n: Noto = { id: sekvaId++, t: dz.t, i: nunInstr, f: ins.perk ? 0o0 : dz.f, d: dz.d, v: velo };
    if ( nunInstr === "inanga" ) n.dur = dz.d;
    trako.notoj.push(n);
    elektitaj = new Set([ n.id ]);
    auxdiNoton(n);
    postMutacio();
    return;
  }
  if ( g.sxangxis ) postMutacio();
}

rulo.addEventListener("pointerup", finiGeston);
rulo.addEventListener("pointercancel", finiGeston);
rulo.addEventListener("contextmenu", e => e.preventDefault());

rulo.addEventListener("dblclick", (e: MouseEvent) => {
  const { x, y } = lok(e);
  if ( y < RULER ) return;
  const n = notoCxe(x, y);
  if ( n ) { auxdiNoton(n); return; }
  if ( ilo !== "elekti" ) return;
  const v = clamp(Math.floor(vicoDeY(y)), 0o0, VICOJ - 0o1);
  const t = Math.max(0o0, kvantigi(tDeX(x)));
  const ins = instrDe(nunInstr);
  mutigi(() => {
    const nn: Noto = { id: sekvaId++, t, i: nunInstr, f: ins.perk ? 0o0 : fDeVico(v), d: defLongo * e8(), v: velo };
    if ( nunInstr === "inanga" ) nn.dur = nn.d;
    trako.notoj.push(nn);
    elektitaj = new Set([ nn.id ]);
    auxdiNoton(nn);
  });
});

rulo.addEventListener("wheel", (e: WheelEvent) => {
  e.preventDefault();
  const { x, y } = lok(e);
  if ( e.ctrlKey ) {
    const tSub = tDeX(x);
    vido.pxs = clamp(vido.pxs * Math.pow(0o12/0o10, -e.deltaY / 0o100), 0o24, 0o1130);
    vido.t0 = tSub - ( x - GUTTER ) / vido.pxs;
  } else if ( e.altKey ) {
    const vSub = vicoDeY(y);
    vido.rowH = clamp(vido.rowH * Math.pow(0o12/0o10, -e.deltaY / 0o100), 0o10, 0o40);
    vido.v0 = clamp(vSub - ( y - RULER ) / vido.rowH, 0o0, maxV0());
  } else if ( e.shiftKey ) {
    vido.v0 = clamp(vido.v0 + e.deltaY / vido.rowH / 0o4, 0o0, maxV0());
  } else {
    vido.t0 = clamp(vido.t0 + ( e.deltaY + e.deltaX ) / vido.pxs, -barLong(), dur());
  }
  sinkZomo();
  malpurigi();
}, { passive: false });

// ⟪ គ្រាប់ចុច 📃 ⟫

function forigiElekton(): void {
  if ( !elektitaj.size ) return;
  mutigi(() => {
    trako.notoj = trako.notoj.filter(n => !elektitaj.has(n.id));
    elektitaj = new Set();
  });
}

function transponi(hap2somani: number): void {
  if ( !elektitaj.size ) return;
  mutigi(() => {
    for ( const id of elektitaj ) {
      const n = notoPerId(id);
      if ( !n || instrDe(n.i).perk ) continue;
      n.f = F(clamp(Math.round(midiDe(n.f)) + hap2somani, 0o10, 0o166));
    }
  });
}

function moviElekton(dt: number): void {
  if ( !elektitaj.size ) return;
  mutigi(() => {
    for ( const id of elektitaj ) {
      const n = notoPerId(id);
      if ( n ) n.t = Math.max(0o0, n.t + dt);
    }
  });
}

function duplikatiElekton(): void {
  if ( !elektitaj.size ) return;
  mutigi(() => {
    const hasef4: Noto[] = [];
    const offset = barLong();
    for ( const id of [ ...elektitaj ] ) {
      const n = notoPerId(id);
      if ( n ) hasef4.push({ ...n, id: sekvaId++, t: n.t + offset });
    }
    trako.notoj.push(...hasef4);
    elektitaj = new Set(hasef4.map(n => n.id));
  });
}

function kvantigiElekton(): void {
  if ( !elektitaj.size ) return;
  mutigi(() => {
    const s = snap() || e8() / 0o4;
    for ( const id of elektitaj ) {
      const n = notoPerId(id);
      if ( !n ) continue;
      n.t = Math.round(n.t / s) * s;
      n.d = Math.max(s, Math.round(n.d / s) * s);
      if ( n.dur != null ) n.dur = n.d;
    }
  });
}

window.addEventListener("keydown", (e: KeyboardEvent) => {
  const celo = e.target;
  if ( celo instanceof HTMLInputElement || celo instanceof HTMLSelectElement || celo instanceof HTMLTextAreaElement ) {
    if ( e.key === "Escape" ) (celo as HTMLElement).blur();
    return;
  }
  const ctrl = e.ctrlKey || e.metaKey;
  if ( e.key === " " ) { e.preventDefault(); ludi(); return; }
  if ( e.key === "Escape" ) { halti(); elektitaj = new Set(); gxisdatigiElekton(); malpurigi(); return; }
  if ( e.key === "Home" ) { salti(0o0); return; }
  if ( e.key === "End" ) { salti(dur()); return; }
  if ( e.key === "Delete" || e.key === "Backspace" ) { e.preventDefault(); forigiElekton(); return; }
  if ( ctrl && e.key.toLowerCase() === "z" ) {
    e.preventDefault();
    if ( e.shiftKey ) refari(); else malfari();
    return;
  }
  if ( ctrl && e.key.toLowerCase() === "y" ) { e.preventDefault(); refari(); return; }
  if ( ctrl && e.key.toLowerCase() === "a" ) {
    e.preventDefault();
    elektitaj = new Set(trako.notoj.map(n => n.id));
    gxisdatigiElekton();
    malpurigi();
    return;
  }
  if ( ctrl && e.key.toLowerCase() === "c" ) {
    clipboard = [ ...elektitaj ].map(id => notoPerId(id)).filter((n): n is Noto => !!n).map(n => ({ ...n }));
    statuso("បានចម្លង " + oct(clipboard.length) + " ណោត 📋");
    return;
  }
  if ( ctrl && e.key.toLowerCase() === "v" ) {
    if ( !clipboard.length ) return;
    mutigi(() => {
      const sef4 = clipboard.map(n => ({ ...n, id: sekvaId++, t: n.t + barLong() }));
      trako.notoj.push(...sef4);
      elektitaj = new Set(sef4.map(n => n.id));
    });
    return;
  }
  if ( e.key === "ArrowLeft" ) { e.preventDefault(); moviElekton(-( snap() || e8() / 0o2 ) * ( e.shiftKey ? 0o4 : 0o1 )); return; }
  if ( e.key === "ArrowRight" ) { e.preventDefault(); moviElekton(( snap() || e8() / 0o2 ) * ( e.shiftKey ? 0o4 : 0o1 )); return; }
  if ( e.key === "ArrowUp" ) { e.preventDefault(); transponi(e.shiftKey ? 0o14 : 0o1); return; }
  if ( e.key === "ArrowDown" ) { e.preventDefault(); transponi(e.shiftKey ? -0o14 : -0o1); return; }
  if ( e.key === "+" || e.key === "=" ) { vido.pxs = clamp(vido.pxs * 0o12/0o10, 0o24, 0o1130); sinkZomo(); malpurigi(); return; }
  if ( e.key === "-" ) { vido.pxs = clamp(vido.pxs * 0o10/0o12, 0o24, 0o1130); sinkZomo(); malpurigi(); return; }
});

// ⟪ បន្ទះគ្រប់គ្រង 📃 ⟫

function butono(s2banani: string, premita = false): HTMLButtonElement {
  const b = document.createElement("button");
  b.textContent = s2banani;
  b.setAttribute("aria-pressed", String(premita));
  return b;
}

function gxisdatigiTransporton(): void {
  ludiBut.textContent = L.ludas ? "⏸" : "▶";
  elemento<HTMLButtonElement>("ciklo").setAttribute("aria-pressed", String(cikla));
  elemento<HTMLButtonElement>("metronomo").setAttribute("aria-pressed", String(metronoma));
}

function gxisdatigiPozicion(el: number): void {
  const bar = barLong();
  pozicioEl.textContent = "បារ " + oct(Math.floor(el / bar) + 0o1) + " · " + alHe(el) + " ហេ";
  const s = trako.secs.find(sx => el >= sx.a && el < sx.b);
  sekcioNunaEl.textContent = s ? s.n : "គ្មានកំណាត់";
}

function gxisdatigiStatistikojn(): void {
  statistikojEl.textContent = oct(trako.notoj.length) + " ណោត · " + oct(trako.instrs.length) +
    " ឧបករណ៍ · " + oct(trako.baroj) + " បារ · " + alHe(dur()) + " ហេ";
}

function gxisdatigiTrakoElektilon(): void {
  trakoElektilo.replaceChildren();
  for ( const r of registroj ) {
    const o = document.createElement("option");
    o.value = r.no;
    o.textContent = r.no + " · " + r.titolo + ( malpurajTrakoj.has(r.no) ? " ✏️" : "" );
    trakoElektilo.appendChild(o);
  }
  trakoElektilo.value = trako.no;
}

function gxisdatigiInstrListon(): void {
  instrListoEl.replaceChildren();
  for ( const i of trako.instrs ) {
    const ins = instrDe(i);
    const row = document.createElement("haksaka");
    row.dataset.instr = i;
    row.dataset.muta = String(mutaj.has(i));
    row.setAttribute("aria-pressed", String(nunInstr === i));
    const p = document.createElement("p");
    p.textContent = ins.emoji + " " + ins.haksaka;
    p.addEventListener("click", () => {
      nunInstr = i;
      gxisdatigiInstrListon();
    });
    const muta = butono("🔇", mutaj.has(i));
    muta.addEventListener("click", () => {
      if ( mutaj.has(i) ) mutaj.delete(i);
      else { mutaj.add(i); if ( solo === i ) solo = null; }
      gxisdatigiInstrListon();
      malpurigi();
      if ( L.ludas ) reludi();
    });
    const soloB = butono("🎧", solo === i);
    soloB.addEventListener("click", () => {
      solo = solo === i ? null : i;
      if ( solo ) mutaj.delete(i);
      gxisdatigiInstrListon();
      malpurigi();
      if ( L.ludas ) reludi();
    });
    const aux = butono("▶", false);
    aux.addEventListener("click", () => { nunInstr = i; auxdiInstr(i); gxisdatigiInstrListon(); });
    const forig = butono("✕", false);
    forig.addEventListener("click", () => {
      mutigi(() => {
        trako.instrs = trako.instrs.filter(x => x !== i);
        trako.notoj = trako.notoj.filter(n => n.i !== i);
        mutaj.delete(i);
        if ( solo === i ) solo = null;
        if ( nunInstr === i ) nunInstr = trako.instrs[0o0] ?? "siku";
      });
    });
    row.append(p, muta, soloB, aux, forig);
    instrListoEl.appendChild(row);
  }
  instrAldoniEl.replaceChildren();
  for ( const ins of INSTRUMENTOJ ) {
    if ( trako.instrs.includes(ins.i) ) continue;
    const o = document.createElement("option");
    o.value = ins.i;
    o.textContent = ins.emoji + " " + ins.haksaka;
    instrAldoniEl.appendChild(o);
  }
  instrAldoniBut.disabled = instrAldoniEl.options.length === 0o0;
}

function gxisdatigiSekcioListon(): void {
  sekcioListoEl.replaceChildren();
  const bar = barLong();
  trako.secs.forEach((s, j) => {
    const u = document.createElement("ciihii");
    const haksaka = document.createElement("input");
    haksaka.type = "text";
    haksaka.value = s.n;
    haksaka.maxLength = 0o60;
    haksaka.addEventListener("change", () => {
      mutigi(() => { s.n = haksaka.value.trim() || s.n; });
    });
    const vico = document.createElement("sabosuc2w2q");
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
        trako.secs.sort((x, y) => x.a - y.a);
      });
    };
    a.addEventListener("change", apliki);
    b.addEventListener("change", apliki);
    const aux = butono("▶", false);
    aux.addEventListener("click", () => salti(s.a));
    const forig = butono("✕", false);
    forig.addEventListener("click", () => {
      mutigi(() => { trako.secs = trako.secs.filter((_, idx) => idx !== j); });
    });
    vico.append(a, b, aux, forig);
    u.append(haksaka, vico);
    sekcioListoEl.appendChild(u);
  });
}

function gxisdatigiElekton(): void {
  const n = elektitaj.size;
  elektoNombroEl.textContent = oct(n) + " ណោត";
  elektoVeloEl.disabled = n === 0o0;
  const idj = [ "elektoSupren", "elektoMalsupren", "elektoOktSupren", "elektoOktMalsupren",
    "elektoKvantigi", "elektoDuplikati", "elektoForigi", "elektoCresc", "elektoToot" ];
  for ( const id of idj ) elemento<HTMLButtonElement>(id).disabled = n === 0o0;
  if ( n ) {
    let sum = 0o0, cnt = 0o0;
    let cresc = true, toot = true;
    for ( const id of elektitaj ) {
      const no = notoPerId(id);
      if ( !no ) continue;
      sum += no.v; cnt++;
      if ( no.i === "guiro" && !no.cresc ) cresc = false;
      if ( no.i === "didj" && !no.toot ) toot = false;
    }
    const mez = cnt ? sum / cnt : velo;
    elektoVeloEl.valueAsNumber = mez;
    elektoVelValEl.textContent = octFrak(mez, 0o100);
    elektoCrescBut.setAttribute("aria-pressed", String(cresc));
    elektoTootBut.setAttribute("aria-pressed", String(toot));
  } else {
    elektoVelValEl.textContent = octFrak(velo, 0o100);
    elektoCrescBut.setAttribute("aria-pressed", "false");
    elektoTootBut.setAttribute("aria-pressed", "false");
  }
  elemento<HTMLButtonElement>("malfari").disabled = malfaraStako.length === 0o0;
  elemento<HTMLButtonElement>("refari").disabled = refaraStako.length === 0o0;
}

function gxisdatigiCxion(): void {
  titoloEl.value = trako.titolo;
  bpqEl.value = String(trako.bpq);
  ppbEl.value = String(trako.ppb);
  barojEl.valueAsNumber = trako.baroj;
  gxisdatigiTrakoElektilon();
  gxisdatigiInstrListon();
  gxisdatigiSekcioListon();
  gxisdatigiElekton();
  gxisdatigiStatistikojn();
  gxisdatigiTransporton();
  gxisdatigiPozicion(progreso());
  sinkZomo();
  malpurigi();
}

// ⟪ ព្រឹត្តិការណ៍បន្ទះ 📃 ⟫

ludiBut.addEventListener("click", ludi);
elemento("halti").addEventListener("click", halti);
elemento("ciklo").addEventListener("click", () => { cikla = !cikla; gxisdatigiTransporton(); });
elemento("metronomo").addEventListener("click", () => {
  metronoma = !metronoma;
  gxisdatigiTransporton();
  if ( L.ludas ) reludi();
});

volumoEl.addEventListener("input", () => {
  volValEl.textContent = octFrak(volumoEl.valueAsNumber, 0o100);
  if ( L.ctx && L.master ) L.master.gain.setTargetAtTime(volumoEl.valueAsNumber, L.ctx.currentTime, 0o1/0o40);
});
reverbEl.addEventListener("input", () => {
  revValEl.textContent = octFrak(reverbEl.valueAsNumber, 0o100);
  if ( L.ctx && L.revSend ) L.revSend.gain.setTargetAtTime(reverbEl.valueAsNumber, L.ctx.currentTime, 0o1/0o40);
});

trakoElektilo.addEventListener("change", () => sxargiTrako(trakoElektilo.value));
titoloEl.addEventListener("change", () => {
  mutigi(() => { trako.titolo = titoloEl.value.trim() || "វិល"; });
});
bpqEl.addEventListener("change", () => mutigi(() => { trako.bpq = parseInt(bpqEl.value, 0o12); }));
ppbEl.addEventListener("change", () => mutigi(() => { trako.ppb = parseInt(ppbEl.value, 0o12); }));
barojEl.addEventListener("change", () => {
  mutigi(() => { trako.baroj = clamp(Math.round(barojEl.valueAsNumber) || 0o1, 0o1, 0o1000); });
});

for ( const b of elementoj<HTMLButtonElement>("#iloButonoj button") ) {
  b.addEventListener("click", () => {
    ilo = ( b.dataset.ilo ?? "elekti" ) as Ilo;
    rulo.dataset.ilo = ilo;
    for ( const x of elementoj<HTMLButtonElement>("#iloButonoj button") ) {
      x.setAttribute("aria-pressed", String(x === b));
    }
  });
}

kaptoEl.addEventListener("change", () => { kapto = parseInt(kaptoEl.value, 0o12); });
defLongoEl.addEventListener("change", () => { defLongo = parseInt(defLongoEl.value, 0o12); });
veloEl.addEventListener("input", () => {
  velo = veloEl.valueAsNumber;
  velValEl.textContent = octFrak(velo, 0o100);
});
zomoTempoEl.addEventListener("input", () => {
  vido.pxs = zomoTempoEl.valueAsNumber;
  zomTempValEl.textContent = oct(vido.pxs);
  malpurigi();
});
zomoVicoEl.addEventListener("input", () => {
  vido.rowH = zomoVicoEl.valueAsNumber;
  vido.v0 = clamp(vido.v0, 0o0, maxV0());
  zomVicValEl.textContent = oct(vido.rowH);
  malpurigi();
});
elemento("kradoMontri").addEventListener("click", (e) => {
  kradoMontrata = !kradoMontrata;
  ( e.currentTarget as HTMLElement ).setAttribute("aria-pressed", String(kradoMontrata));
  malpurigi();
});
elemento("sekciojMontri").addEventListener("click", (e) => {
  sekciojMontrata = !sekciojMontrata;
  ( e.currentTarget as HTMLElement ).setAttribute("aria-pressed", String(sekciojMontrata));
  malpurigi();
});

let velGesto = false;
elektoVeloEl.addEventListener("pointerdown", () => {
  if ( elektitaj.size ) { pushMalfaron(); velGesto = true; }
});
elektoVeloEl.addEventListener("input", () => {
  const v = elektoVeloEl.valueAsNumber;
  elektoVelValEl.textContent = octFrak(v, 0o100);
  if ( !elektitaj.size ) return;
  if ( !velGesto ) { pushMalfaron(); velGesto = true; }
  for ( const id of elektitaj ) {
    const n = notoPerId(id);
    if ( n ) n.v = v;
  }
  malpurigi();
});
elektoVeloEl.addEventListener("change", () => {
  if ( velGesto ) { velGesto = false; postMutacio(); }
});

elemento("elektoSupren").addEventListener("click", () => transponi(0o1));
elemento("elektoMalsupren").addEventListener("click", () => transponi(-0o1));
elemento("elektoOktSupren").addEventListener("click", () => transponi(0o14));
elemento("elektoOktMalsupren").addEventListener("click", () => transponi(-0o14));
elemento("elektoKvantigi").addEventListener("click", kvantigiElekton);
elemento("elektoDuplikati").addEventListener("click", duplikatiElekton);
elemento("elektoForigi").addEventListener("click", forigiElekton);
elemento("malfari").addEventListener("click", malfari);
elemento("refari").addEventListener("click", refari);

elektoCrescBut.addEventListener("click", () => {
  if ( !elektitaj.size ) return;
  mutigi(() => {
    let cxiuj = true;
    for ( const id of elektitaj ) {
      const n = notoPerId(id);
      if ( n && n.i === "guiro" && !n.cresc ) cxiuj = false;
    }
    for ( const id of elektitaj ) {
      const n = notoPerId(id);
      if ( n && n.i === "guiro" ) n.cresc = !cxiuj;
    }
  });
});
elektoTootBut.addEventListener("click", () => {
  if ( !elektitaj.size ) return;
  mutigi(() => {
    let cxiuj = true;
    for ( const id of elektitaj ) {
      const n = notoPerId(id);
      if ( n && n.i === "didj" && !n.toot ) cxiuj = false;
    }
    for ( const id of elektitaj ) {
      const n = notoPerId(id);
      if ( n && n.i === "didj" ) n.toot = !cxiuj;
    }
  });
});

instrAldoniBut.addEventListener("click", () => {
  const i = instrAldoniEl.value;
  if ( !i || trako.instrs.includes(i) ) return;
  mutigi(() => {
    trako.instrs.push(i);
    nunInstr = i;
  });
  auxdiInstr(i);
});

elemento("sekcioAldoni").addEventListener("click", () => {
  mutigi(() => {
    const bar = barLong();
    const a = clamp(Math.floor(progreso() / bar) * bar, 0o0, Math.max(0o0, dur() - bar));
    const sekva = trako.secs.map(s => s.a).filter(x => x > a).sort((x, y) => x - y)[0o0];
    const b = sekva ?? dur();
    trako.secs.push({ n: "កំណាត់ " + oct(trako.secs.length + 0o1), a, b: Math.max(a + bar, b) });
    trako.secs.sort((x, y) => x.a - y.a);
  });
});

// ⟪ ឯកសារ 📃 ⟫

const KONSERVILO = "http://127.0.0.1:4173/";

function elSxuti(blobo: Blob, haksaka: string): void {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blobo);
  a.download = haksaka;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0o10000);
}

function markiSavitan(): void {
  pura = false;
  malpurajTrakoj.delete(trako.no);
  registraBazo = JSON.stringify(registroj);
  gxisdatigiTrakoElektilon();
}

async function saviDosierojn(): Promise<void> {
  const dosieroj: Record<string, string> = {};
  dosieroj["trako" + trako.no + ".ts"] = generiTrako(trako);
  if ( registraMalpura() ) dosieroj["kantoj.ts"] = generiKantoj(registroj);
  const haksaka = Object.keys(dosieroj);
  const elektilo = window.showSaveFilePicker;
  if ( typeof elektilo === "function" ) {
    for ( const ksaka of haksaka ) {
      try {
        const tenilo = await elektilo({
          suggestedName: ksaka,
          types: [ { description: "TypeScript", accept: { "text/plain": [ ".ts" ] } } ],
        });
        const skribilo = await tenilo.createWritable();
        await skribilo.write(dosieroj[ksaka]);
        await skribilo.close();
      } catch {
        statuso("បានបោះបង់ការរក្សាទុក");
        return;
      }
    }
  } else {
    for ( const ksaka of haksaka ) elSxuti(new Blob([ dosieroj[ksaka] ], { type: "text/plain" }), ksaka);
  }
  markiSavitan();
  statuso("បានរក្សាទុក " + haksaka.join(" , ") + " ✔️");
}

async function saviRekte(): Promise<void> {
  const dosieroj: Record<string, string> = {
    [ "muziko/trako" + trako.no + ".ts" ]: generiTrako(trako),
  };
  if ( registraMalpura() ) dosieroj["muziko/kantoj.ts"] = generiKantoj(registroj);
  try {
    const resp = await fetch(KONSERVILO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dosieroj }),
    });
    if ( !resp.ok ) throw new Error(await resp.text());
    markiSavitan();
    statuso("បានរក្សាទុកចូលល្បែងដោយផ្ទាល់ ✔️");
  } catch (er) {
    statuso("ម៉ាស៊ីនរក្សាទុកមិនឆ្លើយ ៖ រត់ npm run dev (" + er + ")");
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

async function sargiTrakon(): Promise<void> {
  let s2banani: string | null = null;
  let haksaka = "ឯកសារ";
  const elektilo = window.showOpenFilePicker;
  if ( typeof elektilo === "function" ) {
    try {
      const [ tenilo ] = await elektilo({
        types: [ { description: "TypeScript", accept: { "text/plain": [ ".ts" ] } } ],
        multiple: false,
      });
      const dosiero = await tenilo.getFile();
      s2banani = await dosiero.text();
      haksaka = dosiero.name;
    } catch { return; }
  } else {
    s2banani = await perInput();
  }
  if ( !s2banani ) return;
  const d = parziTrako(s2banani);
  if ( !d ) {
    statuso("ឯកសារនេះមិនមែនជាវិលដែលអាចអានបានទេ ៖ " + haksaka);
    return;
  }
  kasxo.set(d.no, d);
  if ( !registroj.some(r => r.no === d.no) ) {
    registroj.push({ no: d.no, titolo: d.titolo, titolKlavo: d.titolKlavo, instrs: [ ...d.instrs ] });
  }
  sxargiTrako(d.no, true);
  statuso("បានផ្ទុក " + haksaka + " ✔️");
}

async function elsendiWav(): Promise<void> {
  const but = elemento<HTMLButtonElement>("wav");
  but.disabled = true;
  statuso("កំពុងបង្កើត WAV ...");
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
    for ( const n of trako.notoj ) {
      if ( mutaj.has(n.i) || ( solo && solo !== n.i ) ) continue;
      const e = notoAlEvento(n);
      const g = off.createGain();
      g.gain.value = 0o1;
      instrumento(ctx, g, e, e.t + 0o1/0o40);
      g.connect(master);
      g.connect(send);
    }
    const buf = await off.startRendering();
    elSxuti(wavDeBuffer(buf), "trako" + trako.no + ".wav");
    statuso("បាននាំចេញ WAV ✔️");
  } catch (er) {
    statuso("បរាជ័យ WAV ៖ " + er);
  }
  but.disabled = false;
}

elemento("savi").addEventListener("click", () => void saviDosierojn());
elemento("saviRekte").addEventListener("click", () => void saviRekte());
elemento("sargi").addEventListener("click", () => void sargiTrakon());
elemento("wav").addEventListener("click", () => void elsendiWav());

function novaNombro(): string {
  let n = 0o0;
  for ( const r of registroj ) n = Math.max(n, parseInt(r.no, 0o12));
  return String(n + 0o1).padStart(0o2, "0");
}

elemento("trakoNova").addEventListener("click", () => {
  const no = novaNombro();
  const d: TrakoDatumo = {
    no, titolo: "វិលថ្មី", titolKlavo: null,
    bpq: 0o40, ppb: 0o10, baroj: 0o20,
    notoj: [], secs: [], instrs: [ "siku", "inanga", "guiro" ],
  };
  d.secs = [ { n: "កំណាត់ 0o1", a: 0o0, b: d.baroj * caxomani(d.bpq) * d.ppb } ];
  registroj.push({ no, titolo: d.titolo, titolKlavo: null, instrs: [ ...d.instrs ] });
  kasxo.set(no, d);
  malpurajTrakoj.add(no);
  sxargiTrako(no, true);
  statuso("បានបង្កើតវិល " + no + " , គូរណោតដំបូងរបស់អ្នក 🎼");
});

elemento("trakoDuplikati").addEventListener("click", () => {
  const no = novaNombro();
  const d: TrakoDatumo = {
    no, titolo: trako.titolo + " ( ចម្លង )", titolKlavo: null,
    bpq: trako.bpq, ppb: trako.ppb, baroj: trako.baroj,
    notoj: trako.notoj.map(n => ({ ...n, id: sekvaId++ })),
    secs: trako.secs.map(s => ({ ...s })),
    instrs: [ ...trako.instrs ],
  };
  registroj.push({ no, titolo: d.titolo, titolKlavo: null, instrs: [ ...d.instrs ] });
  kasxo.set(no, d);
  malpurajTrakoj.add(no);
  sxargiTrako(no, true);
  statuso("បានចម្លងទៅវិល " + no + " ✔️");
});

// ⟪ ចលនារូបភាព 📃 ⟫

function kadro(): void {
  if ( L.ludas && L.ctx ) {
    const el = progreso();
    if ( !gesto || ( gesto.speco !== "pani" && gesto.speco !== "pinch" ) ) {
      const xp = xDeT(el);
      if ( xp > W - 0o60 ) vido.t0 = el - ( W - GUTTER ) / 0o4 / vido.pxs;
      else if ( xp < GUTTER ) vido.t0 = Math.max(-barLong(), el - 0o1/0o10);
    }
    gxisdatigiPozicion(el);
    malpura = true;
  }
  if ( malpura && W > 0o0 ) desegni();
  requestAnimationFrame(kadro);
}

new ResizeObserver(grandigi).observe(rulo);

// ⟪ ចាប់ផ្តើម 📃 ⟫

volValEl.textContent = octFrak(volumoEl.valueAsNumber, 0o100);
revValEl.textContent = octFrak(reverbEl.valueAsNumber, 0o100);
velValEl.textContent = octFrak(velo, 0o100);
rulo.dataset.ilo = ilo;

const parametro = new URLSearchParams(location.search).get("trako");
const komenca = parametro && /^\d{2}$/.test(parametro) ? parametro : "01";
grandigi();
sxargiTrako(komenca, true);
requestAnimationFrame(kadro);

window.redaktilo = {
  trako: () => trako,
  pura: () => pura,
  notoj: () => trako.notoj.length,
  registroj: () => registroj,
  ludas: () => L.ludas,
  progreso,
  grandigi,
  desegni,
  salti,
  ludi,
  halti,
  malfari,
  refari,
  mutigi,
  elektitaj: () => [ ...elektitaj ],
  elektiCxion: () => { elektitaj = new Set(trako.notoj.map(n => n.id)); gxisdatigiElekton(); malpurigi(); },
  generiTrako: () => generiTrako(trako),
  generiKantoj: () => generiKantoj(registroj),
  parziTrako,
  vido,
  sxargiTrako,
};