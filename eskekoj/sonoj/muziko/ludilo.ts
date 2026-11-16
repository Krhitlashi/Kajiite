// ≺⧼ ឧបករណ៍លេង 🎧 ⧽≻

import { KANTOJ } from "./kantoj.js";
import { instrumento } from "./vokoj/instrumento.js";
import type { SonoEvento, Sekcio } from "./vokoj/tipoj.js";
import { vefalKu1o, ve3aqKu1o } from "../../komunajxoj/agordoj.js";

// ⟪ ស្ថានភាពឧបករណ៍លេង 📃 ⟫

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

// ⟨ បទចុងក្រោយដែលបានជ្រើស ៖ ផ្ទុកពីការកំណត់ , កាត់ឱ្យស្ថិតក្នុងជួរបទ 📃 ⟩
const KONSERVITA_TRAKO = vefalKu1o("trako", -0o1);
const KOMENCA_TRAKO = KONSERVITA_TRAKO >= 0 && KONSERVITA_TRAKO < KANTOJ.length ? KONSERVITA_TRAKO : -0o1;

const L: LudiloStato = {
  ctx: null, bus: null, revSend: null, reverb: null,
  cur: KOMENCA_TRAKO, idx: 0, events: null, dur: 0, secs: null,
  playing: false, startAt: 0, pausedAt: null, timer: null, master: null,
  aktivaj: [],
};

// ⟪ តំបន់តន្ត្រី 📃 ⟫

const URBAJ_TRAKOJ = [ 4, 5, 6, 7 ];
const MONDAJ_TRAKOJ = [ 0, 1, 2, 3 ];
let enUrbo = false;
// ⟨ ការបន្តស្វ័យប្រវត្តិ ៖ ហ្គេមបន្តទៅបទបន្ទាប់ , ឧបករណ៍ចាក់អាចបិទបាន 📃 ⟩
let aŭtomata = true;
// ⟨ ភ្ជាប់ reverb ទៅ master តែម្ដង កុំឱ្យច្រើនដងពេលចាក់បទថ្មី 📃 ⟩
let reverbKonektita = false;

function hazardaEl( listo: number[] ): number {
  return listo[Math.floor(Math.random() * listo.length)];
}

/*រយៈពេលដែលឧបករណ៍នៅតែឮ សម្រាប់បង្ហាញឧបករណ៍កំពុងលេង
   @param e ( SonoEvento ) - ព្រឹត្តិការណ៍សំឡេង
@returns វិនាទី ( number ) */
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
    default:         return d;
  }
}

/*ជ្រើសបទបន្ទាប់តាមតំបន់ ៖ ក្នុងក្រុងបទក្រុង , ក្រៅក្រុងបទពិភពលោក
@returns sekva ( number ) */
function sekvaTrako(): number {
  if ( enUrbo ) return hazardaEl(URBAJ_TRAKOJ);
  return hazardaEl(MONDAJ_TRAKOJ);
}

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

// ⟪ API សាធារណៈ 📃 ⟫

/** ចាប់ផ្តើមកម្មវិធីចាក់តន្ត្រីដោយ AudioContext រួម និង master gain។ */
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
  if ( L.reverb ) L.revSend.connect(L.reverb);

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

/*ឧបករណ៍ដែលកំពុងឮពេលនេះ ។ ប្រើសម្រាប់ប្លែងប៊ូតុងសាកល្បងសំឡេងក្នុង muzikilo 📃 */
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

/** ផ្ទុកបទជាក់លាក់តាមសន្ទស្សន៍។ */
export function sxargiTrako(i: number) {
  if ( i < 0 || i >= KANTOJ.length ) return;
  sxargi(i);
  ve3aqKu1o("trako", i);
}

/** ទទួលសន្ទស្សន៍បទបច្ចុប្បន្ន។ */
export function nunaTrako(): number {
  return L.cur;
}

/** ទទួលពេលកន្លងផ្ទុកនៃបទបច្ចុប្បន្នគិតជាវិនាទី។ ឈប់រាប់ពេលផ្អាក។ */
export function progreso(): number {
  if ( !L.ctx ) return 0;
  if ( !L.playing ) return L.pausedAt ?? 0;
  return Math.min(L.dur, Math.max(0, L.ctx.currentTime - L.startAt));
}

/*លោតទៅពេលជាក់លាក់ក្នុងបទបច្ចុប្បន្ន ។ បើកំពុងចាក់ វាបន្តចាក់ពីទីនោះ បើផ្អាក វាចងចាំទីនោះ
    @param sek ( number ) - ពេលគិតជាវិនាទី */
export function salti( sek: number ): void {
  if ( !L.ctx || !L.events || L.cur < 0 ) return;
  const celo = Math.min(L.dur, Math.max(0, sek));
  const ludis = L.playing;
  if ( L.timer ) clearInterval(L.timer);
  L.playing = false;
  stopBus();
  L.pausedAt = celo;
  if ( ludis ) ludi();
}

/*កំណត់ការបន្តស្វ័យប្រវត្តិ ៖ បើបិទ បទឈប់ពេលចប់ មិនលោតទៅបទបន្ទាប់
    @param on ( boolean ) - តើត្រូវបន្តស្វ័យប្រវត្តិឬទេ */
export function agordiAŭtomatan( on: boolean ): void {
  aŭtomata = on;
}

/*កំណត់តំបន់តន្ត្រី ៖ ក្នុងក្រុង ឬពិភពលោក ។ ប្តូរបទភ្លាមបើកំពុងចាក់ ហើយបទបច្ចុប្បន្នមិនសមនឹងតំបន់ថ្មី
    @param urbo ( boolean ) - តើអ្នកលេងកំពុងនៅក្នុងក្រុងឬទេ */
export function agordiMuzikanLokon( urbo: boolean ) {
  if ( urbo === enUrbo ) return;
  enUrbo = urbo;
  if ( !L.playing ) return;
  const permesitaj = urbo ? URBAJ_TRAKOJ : MONDAJ_TRAKOJ;
  if ( permesitaj.includes(L.cur) ) return;
  sxargi(sekvaTrako());
  ludi();
}
