import { Kanto, KANTOJ } from "./kantoj.js";
import { instrumento } from "./vokoj.js";
import type { SonoEvento, Sekcio } from "./vokoj.js";

// ─── Player state ────────────────────────────────────────

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

// ─── Private helpers ─────────────────────────────────────

function makeIR(ctx: AudioContext, dur: number, decay: number): AudioBuffer {
  const rate = ctx.sampleRate;
  const len = Math.floor(rate * dur);
  const buf = ctx.createBuffer(2, len, rate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++)
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}

function stopBus() {
  const b = L.bus;
  if (b && L.ctx) {
    b.gain.cancelScheduledValues(L.ctx.currentTime);
    b.gain.setValueAtTime(Math.max(0.0001, b.gain.value), L.ctx.currentTime);
    b.gain.linearRampToValueAtTime(0.0001, L.ctx.currentTime + 0.12);
    setTimeout(() => { try { b.disconnect(); } catch (_) { /* ok */ } }, 450);
  }
  L.bus = null;
  L.revSend = null;
}

function scheduleTick() {
  if (L.timer) clearInterval(L.timer);
  L.timer = setInterval(tick, 80);
}

function tick() {
  if (!L.ctx || !L.events) return;
  const elapsed = L.ctx.currentTime - L.startAt;
  const horizon = elapsed + (document.hidden ? 1.6 : 4/8);

  while (L.idx < L.events.length && L.events[L.idx].t < horizon) {
    const e = L.events[L.idx++];
    const at = L.startAt + e.t;
    if (at < L.ctx.currentTime - 0.03) continue;
    const g = L.ctx.createGain();
    g.gain.value = 1;
    instrumento(L.ctx, g, e, at);
    if (L.bus) g.connect(L.bus);
    if (L.revSend) g.connect(L.revSend);
  }

  if (elapsed >= L.dur + 1.2) finish();
}

function finish() {
  if (L.timer) clearInterval(L.timer);
  L.playing = false;
  stopBus();
  const next = (L.cur + 1) % KANTOJ.length;
  setTimeout(() => {
    if (!L.playing) {
      sxargi(next);
      ludi();
    }
  }, 700);
}

function sxargi(i: number) {
  if (L.playing) {
    if (L.timer) clearInterval(L.timer);
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

// ─── Public API ──────────────────────────────────────────

/** Initialise the music player with a shared AudioContext and master gain. */
export function iniciati(ctx: AudioContext, master: GainNode) {
  L.ctx = ctx;
  L.master = master;

  // Reverb
  if (!L.reverb) {
    L.reverb = ctx.createConvolver();
    L.reverb.buffer = makeIR(ctx, 3.0, 2.4);
  }
}

/** Start or resume playback. */
export function ludi() {
  if (!L.ctx) return;
  if (L.cur < 0) sxargi(0);
  if (L.playing) { paŭzi(); return; }

  const T = KANTOJ[L.cur];

  L.bus = L.ctx.createGain();
  L.bus.gain.setValueAtTime(0.0001, L.ctx.currentTime);
  L.bus.gain.linearRampToValueAtTime(0.35, L.ctx.currentTime + 0.15);
  if (L.master) L.bus.connect(L.master);

  L.revSend = L.ctx.createGain();
  L.revSend.gain.value = 0.30;
  if (L.reverb) {
    L.revSend.connect(L.reverb);
    L.reverb.connect(L.master!);
  }

  if (L.pausedAt != null) {
    L.startAt = L.ctx.currentTime + 0.1 - L.pausedAt;
    while (L.idx < L.events!.length && L.events![L.idx].t < L.pausedAt - 0.02) L.idx++;
    L.pausedAt = null;
  } else {
    L.startAt = L.ctx.currentTime + 0.1;
    L.idx = 0;
  }

  L.playing = true;
  scheduleTick();
}

/** Pause playback. */
export function paŭzi() {
  if (!L.playing || !L.ctx) return;
  L.pausedAt = Math.min(L.dur, Math.max(0, L.ctx.currentTime - L.startAt));
  if (L.timer) clearInterval(L.timer);
  L.playing = false;
  stopBus();
}

/** Stop playback and reset. */
export function halti() {
  if (L.playing) {
    if (L.timer) clearInterval(L.timer);
    L.playing = false;
  }
  stopBus();
  L.pausedAt = null;
  L.idx = 0;
}

/** Whether music is currently playing. */
export function cxuLudas(): boolean {
  return L.playing;
}

/** Load a specific track by index. */
export function sxargiTrako(i: number) {
  if (i < 0 || i >= KANTOJ.length) return;
  sxargi(i);
}

/** Get the current track index. */
export function nunaTrako(): number {
  return L.cur;
}

/** Get total number of tracks. */
export function nombroDaTrakoj(): number {
  return KANTOJ.length;
}
