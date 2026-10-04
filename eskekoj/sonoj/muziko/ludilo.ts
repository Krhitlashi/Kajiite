// ≺⧼ ឧបករណ៍លេង 🎧 ⧽≻

import { KANTOJ } from "./kantoj.js";
import { instrumento } from "./vokoj/instrumento.js";
import type { SonoEvento, Sekcio } from "./vokoj/tipoj.js";

// ⟪ ស្ថានភាពឧបករណ៍លេង 📃 ⟫

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
}

const L: LudiloStato = {
  ctx: null, bus: null, revSend: null, reverb: null,
  cur: -1, idx: 0, events: null, dur: 0, secs: null,
  playing: false, startAt: 0, pausedAt: null, timer: null, master: null,
};

// ⟪ ជំនួយឯកជន 📃 ⟫

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
    if ( L.bus ) g.connect(L.bus);
    if ( L.revSend ) g.connect(L.revSend);
  }

  if ( elapsed >= L.dur + 0o115/0o100 ) finish();
}

function finish() {
  if ( L.timer ) clearInterval(L.timer);
  L.playing = false;
  stopBus();
  const next = ( L.cur + 1 ) % KANTOJ.length;
  setTimeout(() => {
    if ( !L.playing ) {
      sxargi(next);
      ludi();
    }
  }, 0o1274);
}

function hazardaTrako(): number {
  return Math.min(KANTOJ.length - 1, Math.floor(Math.random() * KANTOJ.length));
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
  const T = KANTOJ[i];
  L.events = T.data.events;
  L.dur = T.data.dur;
  L.secs = T.data.secs;
}

// ⟪ API សាធារណៈ 📃 ⟫

/** ចាប់ផ្តើមកម្មវិធីចាក់តន្ត្រីដោយ AudioContext រួម និង master gain។ */
export function iniciati(ctx: AudioContext, master: GainNode) {
  L.ctx = ctx;
  L.master = master;

  if ( !L.reverb ) {
    L.reverb = ctx.createConvolver();
    L.reverb.buffer = makeIR(ctx, 0o30/0o10, 0o115/0o40);
  }
}

/** ចាប់ផ្តើម ឬបន្តការចាក់។ ការចាប់ផ្តើមដំបូងជ្រើសរើសរឹតចៃដន្យ។ */
export function ludi() {
  if ( !L.ctx ) return;
  if ( L.cur < 0 ) sxargi(hazardaTrako());
  if ( L.playing ) { paŭzi(); return; }

  L.bus = L.ctx.createGain();
  L.bus.gain.setValueAtTime(0o0/0o10, L.ctx.currentTime);
  L.bus.gain.linearRampToValueAtTime(0o13/0o40, L.ctx.currentTime + 0o5/0o40);
  if ( L.master ) L.bus.connect(L.master);

  L.revSend = L.ctx.createGain();
  L.revSend.gain.value = 0o23/0o100;
  if ( L.reverb ) {
    L.revSend.connect(L.reverb);
    L.reverb.connect(L.master!);
  }

  if ( L.pausedAt != null ) {
    L.startAt = L.ctx.currentTime + 0o1/0o10 - L.pausedAt;
    while ( L.idx < L.events!.length && L.events![L.idx].t < L.pausedAt - 0o1/0o100 ) L.idx++;
    L.pausedAt = null;
  } else {
    L.startAt = L.ctx.currentTime + 0o1/0o10;
    L.idx = 0;
  }

  L.playing = true;
  scheduleTick();
}

/** ផ្អាកការចាក់។ */
export function paŭzi() {
  if ( !L.playing || !L.ctx ) return;
  L.pausedAt = Math.min(L.dur, Math.max(0, L.ctx.currentTime - L.startAt));
  if ( L.timer ) clearInterval(L.timer);
  L.playing = false;
  stopBus();
}

/** បញ្ឈប់ការចាក់ និងកំណត់ឡើងវិញ។ */
export function halti() {
  if ( L.playing ) {
    if ( L.timer ) clearInterval(L.timer);
    L.playing = false;
  }
  stopBus();
  L.pausedAt = null;
  L.idx = 0;
}

/** តើតន្ត្រីកំពុងចាក់ឬទេ។ */
export function cxuLudas(): boolean {
  return L.playing;
}

/** ផ្ទុកបទជាក់លាក់តាមសន្ទស្សន៍។ */
export function sxargiTrako(i: number) {
  if ( i < 0 || i >= KANTOJ.length ) return;
  sxargi(i);
}

/** ទទួលសន្ទស្សន៍បទបច្ចុប្បន្ន។ */
export function nunaTrako(): number {
  return L.cur;
}
