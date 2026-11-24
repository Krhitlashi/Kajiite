// ≺⧼ j͑ʃ'ɔ j͑ʃᴜ ı],ɹƴ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ 🎧 ⧽≻

import { KANTOJ } from "./kantoj.js";
import { instrumento } from "./vokoj/instrumento.js";
import type { SonoEvento, Sekcio } from "./vokoj/hahunaq.js";
import { vefalKu1o, ve3aqKu1o } from "../../komunajxoj/agordoj.js";

// ⟪ ſɟᴜᴜ̩ ɭʃɹ ʌ ſᶘᴜ j͐ʃɹ , ſɭᴜ ſןᴜ 📃 ⟫

interface AktivaNoto {
  i: string;
  de: number;
  gxis: number;
}

interface LudiloStato {
  ctx: AudioContext | null;
  bus: GainNode | null;
  revSend: GainNode | null;
  reverb: ConvolverNode | null;
  cur: number;
  idx: number;
  events: SonoEvento[] | null;
  dur: number;
  secs: Sekcio[] | null;
  playing: boolean;
  startAt: number;
  pausedAt: number | null;
  timer: ReturnType<typeof setInterval> | null;
  master: GainNode | null;
  aktivaj: AktivaNoto[];
}

// ⟨ j͑ʃп́ꞇ ſɭɔƴ , j͑ʃ'ɔ ŋᷠɹ ⟅ ſɭᴜ ſןᴜ ʌ j͑ʃ'ɔ ŋᷠɹ , ꞙɭɔ ⟅ ⟩
const KONSERVITA_TRAKO = vefalKu1o("trako", -0o1);
const KOMENCA_TRAKO = KONSERVITA_TRAKO >= 0 && KONSERVITA_TRAKO < KANTOJ.length ? KONSERVITA_TRAKO : -0o1;

const L: LudiloStato = {
  ctx: null, bus: null, revSend: null, reverb: null,
  cur: KOMENCA_TRAKO, idx: 0, events: null, dur: 0, secs: null,
  playing: false, startAt: 0, pausedAt: null, timer: null, master: null,
  aktivaj: [],
};

// ⟪ j͑ʃп́ꞇ ſɭɔƴ ʌ ſɭэ ſɭ,w 📃 ⟫

const URBAJ_TRAKOJ = [ 4, 5, 6, 7 ];
const MONDAJ_TRAKOJ = [ 0, 1, 2, 3 ];
let enKaxte = false;
// ⟨ ꞙɭı j͑ʃп́ꞇ ſɭɔƴ , ꞙɭɿ , ſɟᴜᴜ̩ ɭʃɹ ꞙɭɔ ꞙɭı ⟅ ⟩
let aŭtomata = true;
// ⟨ ᶅſɜ ֭ſɭᴜ , ſ̀ȷɜ ֭ſɭɔ ʌ ʃɜ j͐ʃɔ , ꞙɭı , ꞙɭɔ ꞙɭɿ ⟅ ⟩
let reverbKonektita = false;

function hazardaEl( ca1ara: number[] ): number {
  return ca1ara[Math.floor(Math.random() * ca1ara.length)];
}

/* ſɭᴜ ſןᴜ ʌ ſɟᴜᴜ̩ ɭʃɹ , j͑ʃᴜ ſɭᴜ ɭʃɹ , ſɭᴜ ſןᴜ ʌ ʃɜ j͐ʃɔ
   @param e ( SonoEvento ) - ſɭᴜ ſןᴜ ʌ ʃɜ j͐ʃɔ
@returns ſɭᴜ ſןᴜ ( number ) */
function notLongo( e: SonoEvento ): number {
  const d = e.dur ?? e.d ?? 0o1;
  switch ( e.i ) {
    case "slenthem": return 0o223/0o40;
    case "mbira":    return 0o155/0o100;
    case "inanga":   return d * 0o15/0o10;
    case "siku":     return d * 0o3;
    case "ocarina":  return d + 0o23/0o100;
    case "kiiqflak": return d + 0o1/0o10;
    case "guiro":    return d + 0o3/0o100;
    case "hiwe":     return d + 0o7/0o10;
    default:         return d;
  }
}

/* j͑ʃп́ꞇ ſɭɔƴ , ſɭэ ſɭ,w , j͑ʃп́ꞇ ſɭɔƴ ʌ ſɭᴜ , ꞙɭı
@returns sekva ( number ) */
function sekvaTrako(): number {
  if ( enKaxte ) return hazardaEl(URBAJ_TRAKOJ);
  return hazardaEl(MONDAJ_TRAKOJ);
}

// ⟪ ſɭᴜ ſןᴜ , ſɟᴜᴜ̩ ɭʃɹ 📃 ⟫

function makeIR(ctx: AudioContext, dur: number, decay: number): AudioBuffer {
  const rate = ctx.sampleRate;
  const len = Math.floor(rate * dur);
  const buf = ctx.createBuffer(2, len, rate);
  for ( let c = 0; c < 2; c++ ) {
    const d = buf.getChannelData(c);
    for ( let i = 0; i < len; i++ )
      d[i] = ( Math.random() * 2 - 1 ) * Math.pow(1 - i / len, decay);
  }
  return buf;
}

function stopBus() {
  const b = L.bus;
  if ( b && L.ctx ) {
    b.gain.cancelScheduledValues(L.ctx.currentTime);
    b.gain.setValueAtTime(Math.max(0o0/0o10, b.gain.value), L.ctx.currentTime);
    b.gain.linearRampToValueAtTime(0o0/0o10, L.ctx.currentTime + 0o1/0o10);
    setTimeout(() => { try { b.disconnect(); } catch ( _ ) { /* ok */ } }, 0o702);
  }
  L.bus = null;
  L.revSend = null;
  L.aktivaj.length = 0;
}

function scheduleTick() {
  if ( L.timer ) clearInterval(L.timer);
  L.timer = setInterval(tick, 0o120);
}

function tick() {
  if ( !L.ctx || !L.events ) return;
  const elapsed = L.ctx.currentTime - L.startAt;
  const horizon = elapsed + ( document.hidden ? 0o63/0o40 : 0o4/0o10 );

  while ( L.idx < L.events.length && L.events[L.idx].t < horizon ) {
    const e = L.events[L.idx++];
    const at = L.startAt + e.t;
    if ( at < L.ctx.currentTime - 0o1/0o40 ) continue;
    const g = L.ctx.createGain();
    g.gain.value = 1;
    instrumento(L.ctx, g, e, at);
    L.aktivaj.push({ i: e.i, de: at, gxis: at + notLongo(e) });
    if ( L.bus ) g.connect(L.bus);
    if ( L.revSend ) g.connect(L.revSend);
  }

  if ( elapsed >= L.dur + 0o115/0o100 ) finish();
}

function finish() {
  if ( L.timer ) clearInterval(L.timer);
  L.playing = false;
  stopBus();
  if ( !aŭtomata ) return;
  const next = sekvaTrako();
  setTimeout(() => {
    if ( !L.playing ) {
      sxargi(next);
      ludi();
    }
  }, 0o1274);
}

function hazardaTrako(): number {
  return sekvaTrako();
}

function sxargi(i: number) {
  if ( L.playing ) {
    if ( L.timer ) clearInterval(L.timer);
    L.playing = false;
    stopBus();
  }
  L.pausedAt = null;
  L.cur = i;
  L.idx = 0;
  L.aktivaj = [];
  const T = KANTOJ[i];
  L.events = T.data.events;
  L.dur = T.data.dur;
  L.secs = T.data.secs;
}

// ⟪ ʃɜ j͐ʃɔ ʌ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭᴜ ɭʃɹ 📃 ⟫

/** j͑ʃᴜ ı],ɔ , j͑ʃп́ꞇ ſɭɔƴ , ſ̀ȷɜ ֭ſɭɔ ʌ ʃɜ j͐ʃɔ , ꞙɭı ⟅ */
export function iniciati(ctx: AudioContext, master: GainNode) {
  L.ctx = ctx;
  L.master = master;

  if ( !L.reverb ) {
    L.reverb = ctx.createConvolver();
    L.reverb.buffer = makeIR(ctx, 0o30/0o10, 0o115/0o40);
  }
  if ( !reverbKonektita && L.reverb ) {
    L.reverb.connect(master);
    reverbKonektita = true;
  }
}

/** j͑ʃᴜ ı],ɔ , j͑ʃп́ꞇ ſɭɔƴ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭᶗ‹ɜ ⟅ */
export function ludi() {
  if ( !L.ctx ) return;
  if ( L.cur < 0 ) sxargi(hazardaTrako());
  else if ( !L.events ) sxargi(L.cur);
  if ( L.playing ) { paŭzi(); return; }

  L.bus = L.ctx.createGain();
  L.bus.gain.setValueAtTime(0o0/0o10, L.ctx.currentTime);
  L.bus.gain.linearRampToValueAtTime(0o13/0o40, L.ctx.currentTime + 0o5/0o40);
  if ( L.master ) L.bus.connect(L.master);

  L.revSend = L.ctx.createGain();
  L.revSend.gain.value = 0o23/0o100;
  if ( L.reverb ) L.revSend.connect(L.reverb);

  if ( L.pausedAt != null ) {
    L.startAt = L.ctx.currentTime + 0o1/0o10 - L.pausedAt;
// ⟨ ſɭᴜ ſןᴜ ʌ ʃɜ j͐ʃɔ , ꞙɭı , ꞙɭɿ , ſɭɜ j͐ʃɹ ⟅ ⟩
    L.idx = 0;
    while ( L.idx < L.events!.length && L.events![L.idx].t < L.pausedAt - 0o1/0o100 ) L.idx++;
    L.pausedAt = null;
  } else {
    L.startAt = L.ctx.currentTime + 0o1/0o10;
    L.idx = 0;
  }

  L.playing = true;
  scheduleTick();
  tick();
}

/** ſɭɜ j͐ʃɹ , j͑ʃп́ꞇ ſɭɔƴ , ꞙɭı ⟅ */
export function paŭzi() {
  if ( !L.playing || !L.ctx ) return;
  L.pausedAt = Math.min(L.dur, Math.max(0, L.ctx.currentTime - L.startAt));
  if ( L.timer ) clearInterval(L.timer);
  L.playing = false;
  stopBus();
}

/** ſɭɜ j͐ʃɹ , j͑ʃп́ꞇ ſɭɔƴ , ſɭᴜ ſןᴜ ⟅ */
export function halti() {
  if ( L.playing ) {
    if ( L.timer ) clearInterval(L.timer);
    L.playing = false;
  }
  stopBus();
  L.pausedAt = null;
  L.idx = 0;
}

/** j͑ʃп́ꞇ ſɭɔƴ , j͑ʃᴜ ſɭᴜ ɭʃɹ , ꞙɭı ⟅ */
export function tsekeLudas(): boolean {
  return L.playing;
}

/* ſɟᴜᴜ̩ ɭʃɹ ꞙɭı , j͑ʃᴜ ı],ɔ , ſɭᴜ ſןᴜ , ꞙɭı 📃 */
export function nunajInstrumentoj(): string[] {
  if ( !L.ctx || !L.playing ) return [];
  const now = L.ctx.currentTime;
  if ( L.aktivaj.length ) L.aktivaj = L.aktivaj.filter( a => a.gxis >= now );
  const nunaj = new Set<string>();
  for ( const a of L.aktivaj ) {
    if ( a.de <= now ) nunaj.add( a.i );
  }
  return [ ...nunaj ];
}

/** j͑ʃп́ꞇ ſɭɔƴ , ꞙɭı , j͑ʃ'ɔ ŋᷠɹ ⟅ */
export function sxargiTrako(i: number) {
  if ( i < 0 || i >= KANTOJ.length ) return;
  sxargi(i);
  ve3aqKu1o("trako", i);
}

/** j͑ʃп́ꞇ ſɭɔƴ , ꞙɭı , j͑ʃ'ɔ ŋᷠɹ , j͑ʃᴜ ſɭᴜ ɭʃɹ ⟅ */
export function nunaTrako(): number {
  return L.cur;
}

/** j͑ʃп́ꞇ ſɭɔƴ , j͑ʃᴜ ı],ɔ , ſɭᴜ ſןᴜ , ſɭɜ j͐ʃɹ ⟅ */
export function progreso(): number {
  if ( !L.ctx ) return 0;
  if ( !L.playing ) return L.pausedAt ?? 0;
  return Math.min(L.dur, Math.max(0, L.ctx.currentTime - L.startAt));
}

/* j͑ʃп́ꞇ ſɭɔƴ , j͑ʃᴜ ı],ɔ , ꞙɭı , ꞙɭɿ ꞙɭı , ꞙɭı
   @param sek ( number ) - j͑ʃᴜ ı],ɔ ⟅ */
export function salti( sek: number ): void {
  if ( !L.ctx || L.cur < 0 ) return;
  if ( !L.events ) sxargi(L.cur);
  if ( !L.events ) return;
  const celo = Math.min(L.dur, Math.max(0, sek));
  const ludis = L.playing;
  if ( L.timer ) clearInterval(L.timer);
  L.playing = false;
  stopBus();
  L.pausedAt = celo;
  if ( ludis ) ludi();
}

/* j͑ʃп́ꞇ ſɭɔƴ , ꞙɭı , ꞙɭɔ , j͑ʃп́ꞇ ſɭɔƴ , ꞙɭɿ , ꞙɭı
   @param on ( boolean ) - ꞙɭı j͑ʃп́ꞇ ſɭɔƴ ⟅ */
export function agordiAŭtomatan( on: boolean ): void {
  aŭtomata = on;
}

/* j͑ʃп́ꞇ ſɭɔƴ ʌ ſɭэ ſɭ,w , ſɭᴜ ı],ƨɔ , ꞙɭı , j͑ʃп́ꞇ ſɭɔƴ ꞙɭɿ
   @param kaxte ( boolean ) - ſɭᴜ ı],ƨɔ ꞙɭı ⟅ */
export function agordiMuzikanLokon( kaxte: boolean ) {
  if ( kaxte === enKaxte ) return;
  enKaxte = kaxte;
  if ( !L.playing ) return;
  const permesitaj = kaxte ? URBAJ_TRAKOJ : MONDAJ_TRAKOJ;
  if ( permesitaj.includes(L.cur) ) return;
  sxargi(sekvaTrako());
  ludi();
}
