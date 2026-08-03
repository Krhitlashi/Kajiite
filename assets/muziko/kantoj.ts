import type { SonoEvento, Sekcio, SpuroDateno } from "./vokoj.js";
import { F, PENT_E, SLENDRO, SL2, NYAM, PENT_A, mulberry } from "./vokoj.js";

// ─── Reel 01 · Altiplano Dawn · 152 s ────────────────────

function buildTrack1(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = mulberry(8117);
  const e8 = 0.4, bar = 2.4;
  const S = PENT_E;
  const add = (t: number, i: string, f: number, d: number, v: number, x?: Record<string, number | boolean>) =>
    ev.push(Object.assign({ t, i, f, d, v }, x || {}));

  secs.push({ n: "Dawn cadenza", a: 0, b: 14.4 });
  [
    [ 0.6, 7, 1.1 ], [ 2.1, 6, 0.9 ], [ 3.5, 5, 1.4 ], [ 5.3, 6, 0.8 ],
    [ 6.7, 4, 1.2 ], [ 8.3, 5, 1.0 ], [ 9.7, 3, 1.5 ], [ 11.5, 4, 0.9 ], [ 12.7, 2, 1.6 ]
  ].forEach(([t, dg, d]) => add(t as number, "siku", F(S[dg as number]), d as number, 0.8));
  add(13.0, "inanga", F(S[0] - 12), 2.4, 0.7, { dur: 2.4 });

  secs.push({ n: "First light", a: 14.4, b: 62.4 });
  for (let b = 0; b < 20; b++) {
    const t0 = 14.4 + b * bar;
    const arp = [ 0, 2, 1, 3, 2, 4, 3, 1 ];
    for (let k = 0; k < 8; k++) add(t0 + k * e8, "inanga", F(S[arp[k]] - 12), 0.9, 0o4/0o10 + r() * 0.15, { dur: 0.85 });
    [ 0, 1.5, 3, 4.5 ].forEach(p => add(t0 + p * e8, "guiro", 0, 0.05, 0o4/0o10));
    if (b % 4 === 3) add(t0 + 5 * e8, "guiro", 0, 0.7, 0.7, { cresc: 1 });
    if (b % 2 === 0) {
      const ph = mel(r, 16, 3, 9, 5 + Math.floor(r() * 3), 0.72);
      ph.forEach(n => add(t0 + n.p * e8, "siku", F(S[n.d]), n.l * e8 * 0.9, 0.85));
    }
  }

  secs.push({ n: "Ocarina answer", a: 62.4, b: 96 });
  for (let b = 0; b < 14; b++) {
    const t0 = 62.4 + b * bar;
    const arp = [ 0, 3, 2, 4, 3, 2, 1, 2 ];
    for (let k = 0; k < 8; k++) add(t0 + k * e8, "inanga", F(S[arp[k]] - 12), 0.9, 0o4/0o10, { dur: 0.8 });
    for (let k = 0; k < 8; k++) add(t0 + k * e8, "guiro", 0, 0.045, (k % 2) ? 0.35 : 0.6);
    if (b % 2 === 0) {
      const ph = mel(r, 8, 5, 10, 7, 0.8);
      ph.forEach(n => add(t0 + n.p * e8, "ocarina", F(S[n.d]), n.l * e8 * 0.95, 0.8));
    } else {
      const ph = mel(r, 8, 2, 6, 4, 0.7);
      ph.forEach(n => add(t0 + n.p * e8, "siku", F(S[n.d]), n.l * e8 * 0.9, 0.7));
    }
  }

  secs.push({ n: "Güiro break", a: 96, b: 110.4 });
  for (let b = 0; b < 6; b++) {
    const t0 = 96 + b * bar;
    if (b < 4) {
      add(t0, "guiro", 0, 0.95, 0.85, { cresc: 1 });
      for (let k = 0; k < 5; k++) add(t0 + 3 * e8 + k * 0.07, "guiro", 0, 0.05, 0.7);
      add(t0, "inanga", F(S[0] - 12), 1.4, 0.65, { dur: 1.4 });
      add(t0 + 3 * e8, "inanga", F(S[3] - 12), 1.0, 0.6, { dur: 1 });
    } else {
      const div = (b === 4) ? 8 : 16;
      for (let k = 0; k < div; k++) add(t0 + k * bar / div, "guiro", 0, 0.045, 0o4/0o10 + 0.4 * k / div);
      if (b === 5) [ 3, 4, 5, 7 ].forEach((dg, k) => add(t0 + k * e8 * 2, "ocarina", F(S[dg]), e8 * 1.6, 0.6));
    }
  }

  secs.push({ n: "Parallel thirds", a: 110.4, b: 134.4 });
  for (let b = 0; b < 10; b++) {
    const t0 = 110.4 + b * bar;
    const arp = [ 0, 2, 3, 4, 3, 2, 4, 3 ];
    for (let k = 0; k < 8; k++) add(t0 + k * e8, "inanga", F(S[arp[k]] - 12), 0.9, 0.55, { dur: 0.8 });
    [ 0, 1.5, 3, 4.5 ].forEach(p => add(t0 + p * e8, "guiro", 0, 0.05, 0.55));
    if (b % 2 === 0) {
      const ph = mel(r, 16, 4, 9, 6, 0.78);
      ph.forEach(n => {
        add(t0 + n.p * e8, "siku", F(S[n.d]), n.l * e8 * 0.9, 0.85);
        add(t0 + n.p * e8, "ocarina", F(S[Math.max(0, n.d - 2)]), n.l * e8 * 0.9, 0.6);
      });
    }
  }

  secs.push({ n: "Dissolve", a: 134.4, b: 152 });
  add(134.8, "siku", F(S[5]), 3.2, 0o6/0o10);
  add(135.0, "inanga", F(S[0] - 12), 4, 0.6, { dur: 4 });
  add(139.5, "ocarina", F(S[9]), 2.4, 0o4/0o10);
  add(140.2, "inanga", F(S[2] - 12), 3, 0o4/0o10, { dur: 3 });
  add(143.5, "siku", F(S[4]), 3.4, 0.6);
  add(146.8, "guiro", 0, 1.4, 0.6, { cresc: 1 });
  add(147.5, "inanga", F(S[0] - 12), 4.2, 0.55, { dur: 4.2 });
  add(148.5, "siku", F(S[0]), 3.4, 0.55);

  return { events: ev.sort((a, b) => a.t - b.t), dur: 152, secs };
}

// ─── Reel 02 · Circuit of the Whirlwind · 160 s ──────────

function buildTrack2(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = mulberry(2448);
  const beat = 0.625, bar = 2.5, f0 = 72.65;
  const kush = [ 0, 4, 2, 5, 3, 6, 4, 7, 5, 3, 2, 4 ];
  const kuts = [ 3, 6, 5, 2, 7, 4, 6, 1, 5, 2, 4, 0 ];

  secs.push({ n: "Breath of the hollow", a: 0, b: 12.5 });
  ev.push({ t: 0.4, i: "didj", f: f0, d: 12, v: 1 });

  secs.push({ n: "Kushaura", a: 12.5, b: 52.5 });
  ev.push({ t: 12.5, i: "didj", f: f0, d: 40, v: 1 });
  for (let b = 0; b < 16; b++) {
    const t0 = 12.5 + b * bar, pu = bar / 12;
    for (let p = 0; p < 12; p++)
      ev.push({ t: t0 + p * pu, i: "mbira", f: F(NYAM[kush[(p + b * 2) % 12]]), d: 0.9, v: 0.55 + ((p % 3 === 0) ? 0.2 : 0) + r() * 0.08 });
    ev.push({ t: t0, i: "inanga", f: F(NYAM[0] - 12), d: 1.2, v: 0.7, dur: 1.2 });
    ev.push({ t: t0 + bar / 2, i: "inanga", f: F(NYAM[3] - 12), d: 1, v: 0.6, dur: 1 });
  }

  secs.push({ n: "Whirlwind rises", a: 52.5, b: 82.5 });
  ev.push({ t: 52.5, i: "didj", f: f0, d: 30, v: 1 });
  ev.push({ t: 53, i: "bull", f: 220, d: 8, v: 0.8 });
  ev.push({ t: 62, i: "bull", f: 262, d: 9, v: 0.9 });
  ev.push({ t: 72, i: "bull", f: 196, d: 9, v: 1 });
  for (let b = 0; b < 12; b++) {
    const t0 = 52.5 + b * bar, pu = bar / 12;
    for (let p = 0; p < 12; p++) {
      if ((p + b) % 3) continue;
      ev.push({ t: t0 + p * pu + pu / 2, i: "mbira", f: F(NYAM[kuts[p]] + 12), d: 0.9, v: 0o4/0o10 });
    }
    ev.push({ t: t0 + bar / 2, i: "inanga", f: F(NYAM[4] - 12), d: 1, v: 0.6, dur: 1 });
  }

  secs.push({ n: "Toots & embers", a: 82.5, b: 112.5 });
  ev.push({ t: 82.5, i: "didj", f: f0, d: 30, v: 1 });
  for (let b = 0; b < 12; b++) {
    const t0 = 82.5 + b * bar, pu = bar / 12;
    [ 0, 1, 1.5, 2.5 ].forEach(p => ev.push({ t: t0 + p * beat, i: "didj", f: f0 * 2.02, d: 0.28, v: 0.85, toot: true }));
    for (let p = 0; p < 12; p++) ev.push({ t: t0 + p * pu, i: "mbira", f: F(NYAM[kush[p]]), d: 0.9, v: 0.55 });
    ev.push({ t: t0, i: "inanga", f: F(NYAM[0] - 12), d: 1.2, v: 0.65, dur: 1.2 });
  }

  secs.push({ n: "Full circuit", a: 112.5, b: 142.5 });
  ev.push({ t: 112.5, i: "didj", f: f0, d: 30, v: 1 });
  ev.push({ t: 113, i: "bull", f: 327, d: 7, v: 1 });
  ev.push({ t: 121, i: "bull", f: 294, d: 7, v: 1 });
  ev.push({ t: 129, i: "bull", f: 349, d: 7, v: 1 });
  ev.push({ t: 137, i: "bull", f: 262, d: 5.5, v: 1 });
  for (let b = 0; b < 12; b++) {
    const t0 = 112.5 + b * bar, pu = bar / 12;
    for (let p = 0; p < 12; p++) {
      const dg = (b % 2 ? kuts : kush)[p];
      ev.push({ t: t0 + p * pu, i: "mbira", f: F(NYAM[dg] + ((b % 4 > 1) ? 12 : 0)), d: 0.9, v: 0.6 });
    }
    ev.push({ t: t0, i: "inanga", f: F(NYAM[0] - 12), d: 1, v: 0.7, dur: 1 });
    ev.push({ t: t0 + bar / 2, i: "inanga", f: F(NYAM[5] - 12), d: 0.9, v: 0.65, dur: 0.9 });
    if (b % 3 === 2) ev.push({ t: t0 + 3 * beat, i: "didj", f: f0 * 2.02, d: 0o4/0o10, v: 0.9, toot: true });
  }

  secs.push({ n: "Ember fade", a: 142.5, b: 160 });
  ev.push({ t: 142.5, i: "didj", f: f0, d: 16.5, v: 0.9 });
  ev.push({ t: 143, i: "mbira", f: F(NYAM[0]), d: 2, v: 0.6 });
  ev.push({ t: 146, i: "mbira", f: F(NYAM[4]), d: 2, v: 0o4/0o10 });
  ev.push({ t: 150, i: "inanga", f: F(NYAM[0] - 12), d: 3, v: 0.6, dur: 3 });
  ev.push({ t: 156.5, i: "inanga", f: F(NYAM[0] - 12), d: 3, v: 0.55, dur: 3 });

  return { events: ev.sort((a, b) => a.t - b.t), dur: 160, secs };
}

// ─── Reel 03 · Bronze Meridian · 168 s ───────────────────

function buildTrack3(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = mulberry(3361);
  const SL = SLENDRO, bar = 3.375, bal = [ 0, 2, 4, 3, 2, 1, 2, 0 ];

  secs.push({ n: "Ombak opening", a: 0, b: 27 });
  [ [ 1, 2 ], [ 4.5, 4 ], [ 8, 3 ], [ 12, 1 ], [ 16, 2 ], [ 20.5, 0 ], [ 24.5, 0 ] ]
    .forEach(([t, dg]) => ev.push({ t: t as number, i: "slenthem", f: F(SL[dg as number]), d: 1, v: 0.9 }));

  function cycle(t0: number, o: { guiro?: number; ocarina?: number; kotekan?: number }) {
    for (let b = 0; b < 8; b++) {
      const tb = t0 + b * bar;
      ev.push({ t: tb, i: "slenthem", f: F(SL[bal[b]]), d: 1, v: 0.85 });
      if (b === 0) ev.push({ t: tb, i: "slenthem", f: F(SL[0] - 12), d: 1, v: 1 });
      if (o.guiro) {
        ev.push({ t: tb, i: "guiro", d: 0.05, v: 0.4 });
        if (b === 4) ev.push({ t: tb, i: "guiro", d: 0o4/0o10, v: 0.6 });
      }
      if (o.ocarina) {
        const ph = mel(r, 8, 3, 8, 5, 0.7);
        ph.forEach(n => ev.push({ t: tb + n.p * (bar / 8), i: "ocarina", f: F(SL2[n.d]), d: n.l * (bar / 8) * 0.9, v: 0.7 }));
      }
      if (o.kotekan) {
        const pu = bar / 8;
        for (let p = 0; p < 8; p++) {
          const dg = Math.min(9, bal[b] + (p % 2 ? 0 : 3));
          ev.push({ t: tb + p * pu + (p % 2 ? pu / 2 : 0), i: "mbira", f: F(SL2[dg]), d: 1, v: p % 2 ? 0.45 : 0.55 });
        }
      }
    }
  }

  secs.push({ n: "Balungan", a: 27, b: 54 }); cycle(27, { guiro: 1 });
  secs.push({ n: "Song over bronze", a: 54, b: 81 }); cycle(54, { guiro: 1, ocarina: 1 });
  secs.push({ n: "Kotekan interlock", a: 81, b: 108 }); cycle(81, { guiro: 1, kotekan: 1 });
  secs.push({ n: "Full weave", a: 108, b: 135 }); cycle(108, { guiro: 1, ocarina: 1, kotekan: 1 });

  secs.push({ n: "Gong agung", a: 135, b: 168 });
  [ [ 136, 2 ], [ 140.5, 4 ], [ 145, 3 ], [ 149.5, 1 ], [ 153.5, 2 ] ]
    .forEach(([t, dg]) => ev.push({ t: t as number, i: "slenthem", f: F(SL[dg as number]), d: 1, v: 0.8 }));
  ev.push({ t: 141, i: "ocarina", f: F(SL2[7]), d: 2.5, v: 0o4/0o10 });
  ev.push({ t: 157.5, i: "guiro", d: 1.2, v: 0.7, cresc: 1 });
  ev.push({ t: 159, i: "slenthem", f: F(SL[0]), d: 1, v: 1 });
  ev.push({ t: 159.05, i: "slenthem", f: F(SL[0] - 12), d: 1, v: 1 });

  return { events: ev.sort((a, b) => a.t - b.t), dur: 168, secs };
}

// ─── Reel 04 · Trough & Thunder · 176 s ──────────────────

function buildTrack4(): SpuroDateno {
  const ev: SonoEvento[] = [];
  const secs: Sekcio[] = [];
  const r = mulberry(4096);
  const P = PENT_A;
  const beat = 0o74 / 0o160;
  const bar = beat * 4;
  const ost = [ 0, 3, 1, 4, 2, 4, 1, 3 ];

  secs.push({ n: "Trough solo", a: 0, b: 8 * bar });
  for (let b = 0; b < 8; b++) {
    const t0 = b * bar;
    for (let k = 0; k < 8; k++) ev.push({ t: t0 + k * bar / 8, i: "inanga", f: F(P[ost[k]]), d: 1, v: 0.55 + ((k % 4 === 0) ? 0.15 : 0) });
  }

  secs.push({ n: "Sikú descant", a: 8 * bar, b: 28 * bar });
  for (let b = 8; b < 28; b++) {
    const t0 = b * bar;
    for (let k = 0; k < 8; k++) ev.push({ t: t0 + k * bar / 8, i: "inanga", f: F(P[ost[(k + b) % 8]]), d: 1, v: 0.55 });
    if (b >= 12) for (let k = 0; k < 4; k++) ev.push({ t: t0 + k * bar / 4 + bar / 8, i: "guiro", d: 0.05, v: 0o4/0o10 });
    if (b % 2 === 0) {
      const ph = mel(r, 16, 5, 10, 7, 0.66);
      ph.forEach(n => ev.push({ t: t0 + n.p * bar / 8, i: "siku", f: F(P[n.d]), d: n.l * bar / 8 * 0.9, v: 0.8 }));
    }
  }

  secs.push({ n: "Storm swell", a: 28 * bar, b: 48 * bar });
  ev.push({ t: 28 * bar + 0o4/0o10, i: "bull", f: 196, d: 9, v: 0.8 });
  ev.push({ t: 36 * bar, i: "bull", f: 233, d: 10, v: 0.9 });
  ev.push({ t: 44 * bar, i: "bull", f: 174.6, d: 8, v: 0.85 });
  for (let b = 28; b < 48; b++) {
    const t0 = b * bar;
    for (let k = 0; k < 8; k++) ev.push({ t: t0 + k * bar / 8, i: "inanga", f: F(P[ost[k]]), d: 1, v: 0.55 });
    for (let k = 0; k < 4; k++) ev.push({ t: t0 + k * bar / 4, i: "guiro", d: 0.05, v: 0.45 });
    if (b % 4 === 0) ev.push({ t: t0, i: "siku", f: F(P[9]), d: bar * 1.8, v: 0.6 });
    if (b % 4 === 2) ev.push({ t: t0 + bar / 2, i: "siku", f: F(P[7]), d: bar * 1.4, v: 0.55 });
  }

  secs.push({ n: "Hocket", a: 48 * bar, b: 64 * bar });
  for (let b = 48; b < 64; b++) {
    const t0 = b * bar;
    for (let k = 0; k < 8; k++) ev.push({ t: t0 + k * bar / 8, i: "inanga", f: F(P[ost[(k + 3) % 8]]), d: 1, v: 0.55 });
    for (let k = 0; k < 8; k += 2) ev.push({ t: t0 + k * bar / 8, i: "guiro", d: 0.05, v: (k % 4) ? 0.35 : 0.55 });
    if (b % 2 === 0) {
      const ph = mel(r, 8, 5, 9, 6, 0.85);
      ph.forEach(n => {
        if (n.p % 2 === 0) ev.push({ t: t0 + n.p * bar / 8, i: "siku", f: F(P[n.d]), d: bar / 8 * 0.9, v: 0o6/0o10 });
        else ev.push({ t: t0 + n.p * bar / 8, i: "mbira", f: F(P[n.d] + 12), d: 1, v: 0.55 });
      });
    } else {
      for (let k = 0; k < 8; k++) if (r() < 0.6)
        ev.push({ t: t0 + k * bar / 8 + bar / 16, i: "mbira", f: F(P[ost[k]] + 12), d: 1, v: 0o4/0o10 });
    }
  }

  secs.push({ n: "Full sky", a: 64 * bar, b: 76 * bar });
  ev.push({ t: 64 * bar, i: "bull", f: 262, d: 8, v: 1 });
  ev.push({ t: 71 * bar, i: "bull", f: 294, d: 6, v: 0.9 });
  for (let b = 64; b < 76; b++) {
    const t0 = b * bar;
    for (let k = 0; k < 8; k++) ev.push({ t: t0 + k * bar / 8, i: "inanga", f: F(P[ost[k]]), d: 1, v: 0.6 });
    for (let k = 0; k < 8; k += 2) ev.push({ t: t0 + k * bar / 8, i: "guiro", d: 0.05, v: 0o4/0o10 });
    if (b % 2 === 0) {
      const ph = mel(r, 16, 4, 10, 8, 0o6/0o10);
      ph.forEach(n => ev.push({ t: t0 + n.p * bar / 8, i: "siku", f: F(P[n.d]), d: n.l * bar / 8 * 0.9, v: 0.85 }));
    } else {
      for (let k = 0; k < 8; k++) if (r() < 0o4/0o10)
        ev.push({ t: t0 + k * bar / 8, i: "mbira", f: F(P[ost[(k + 5) % 8]] + 12), d: 1, v: 0.55 });
    }
  }

  secs.push({ n: "Coda", a: 76 * bar, b: 176 });
  [ [ 76 * bar + 0o4/0o10, 0, 1.6 ], [ 76 * bar + 2.6, 3, 1.4 ], [ 76 * bar + 4.4, 1, 1.8 ],
   [ 76 * bar + 6.8, 4, 1.6 ], [ 76 * bar + 9.2, 2, 2.2 ], [ 76 * bar + 12.2, 0, 3.4 ] ]
    .forEach(([t, dg, d]) => ev.push({ t: t as number, i: "inanga", f: F(P[dg as number]), d: d as number, v: 0.6 }));
  ev.push({ t: 173.8, i: "inanga", f: F(P[0] - 12), d: 2.4, v: 0.65 });

  return { events: ev.sort((a, b) => a.t - b.t), dur: 176, secs };
}

// ─── Melody helper ───────────────────────────────────────

interface MelNoto { p: number; d: number; l: number }

function mel(r: () => number, slots: number, lo: number, hi: number, start: number, dens: number): MelNoto[] {
  const out: MelNoto[] = [];
  let d = start, i = 0;
  while (i < slots) {
    if (r() < dens) {
      const len = 1 + Math.floor(r() * 3);
      out.push({ p: i, d, l: Math.min(len, slots - i) });
      i += len;
      const st = [-2, -1, -1, 0, 1, 1, 2][Math.floor(r() * 7)];
      d = Math.max(lo, Math.min(hi, d + st));
    } else i++;
  }
  return out;
}

// ─── Track export ────────────────────────────────────────

export interface Kanto {
  no: string;
  title: string;
  instrs: string[];
  data: SpuroDateno;
}

export const KANTOJ: Kanto[] = [
  { no: "01", title: "Altiplano Dawn", instrs: ["siku", "ocarina", "guiro", "inanga"], data: buildTrack1() },
  { no: "02", title: "Circuit of the Whirlwind", instrs: ["didj", "bull", "mbira", "inanga"], data: buildTrack2() },
  { no: "03", title: "Bronze Meridian", instrs: ["slenthem", "mbira", "ocarina", "guiro"], data: buildTrack3() },
  { no: "04", title: "Trough & Thunder", instrs: ["inanga", "siku", "bull", "mbira", "guiro"], data: buildTrack4() },
];
