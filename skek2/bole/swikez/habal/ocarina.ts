// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ʌ ꞁȷ̀ɜ ſɟᴜ ɽ͑ʃ'ꞇ }ʃᴜ 🎵 ⧽≻

import { noiseSrc, startNoise, jetTurbulence } from "./xetoh2.js";
import { devio, vap6zukani } from "./hakfeKx2keve.js";

const ETA = 0o1/0o20000;

export function ocarina(ctx: AudioContext, out: AudioNode, t: number, dur: number, f: number, vel = 0o1) {
  const p = f * vap6zukani(0o1/0o1000);

  const atako = 0o5/0o100 * vap6zukani(0o1/0o10);
  const tlakakani = 0o6/0o100 * vap6zukani(0o1/0o10);
  const g = ctx.createGain(), pk = 0o24/0o100 * vel;
  g.gain.setValueAtTime(0o0/0o10, t);
  g.gain.linearRampToValueAtTime(pk * 0o7/0o10, t + atako * 0o4/0o10);
  g.gain.linearRampToValueAtTime(pk, t + atako);
  g.gain.linearRampToValueAtTime(pk * 0o16/0o20, t + dur);
  g.gain.linearRampToValueAtTime(0o0/0o10, t + dur + tlakakani);
  g.connect(out);

  const tonoj: [ number, number, number, number ][] = [
    [ 0o1, 0o1, 0o3, 0o2/0o100 ],
    [ 0o2, 0o7/0o1000, 0o5, 0o3/0o100 ],
    [ 0o3, 0o3/0o1000, 0o7, 0o3/0o100 ],
    [ 0o4, 0o2/0o10000, 0o12, 0o4/0o100 ],
    [ 0o5, 0o1/0o20000, 0o15, 0o4/0o100 ],
    [ 0o6, 0o1/0o40000, 0o21, 0o5/0o100 ],
    [ 0o7, 0o1/0o40000, 0o25, 0o5/0o100 ],
    [ 0o10, 0o1/0o40000, 0o31, 0o5/0o100 ],
  ];

  const ts = ctx.createGain();
  ts.gain.value = 0o1;
  const osc: OscillatorNode[] = [];
  const turbTaps: { cutoff: number; frac: number; node: GainNode }[] = [];

  const saxeni = 0o1 + devio(0o2/0o1000);
  const drivo = 0o1 + devio(0o3/0o1000);
  const falo = 0o177/0o200;
  for ( const [ mul, amp0, cutoff, frac ] of tonoj ) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(p * mul * saxeni, t);
    o.frequency.exponentialRampToValueAtTime(p * mul, t + 0o6/0o100);
    o.frequency.exponentialRampToValueAtTime(p * mul * drivo, t + dur);
    o.frequency.exponentialRampToValueAtTime(p * mul * falo, t + dur + tlakakani);
    const og = ctx.createGain();
    og.gain.value = amp0 * vap6zukani(0o3/0o10);
    const am = ctx.createGain();
    am.gain.value = 0o1;
    o.connect(og);
    og.connect(am);
    am.connect(ts);
    turbTaps.push({ cutoff, frac: frac * vap6zukani(0o2/0o100), node: am });
    o.start(t);
    o.stop(t + dur + tlakakani + 0o1/0o100);
    osc.push(o);
  }

  const vib = ctx.createOscillator();
  vib.frequency.value = 0o55/0o10 * vap6zukani(0o1/0o10);

  const vwob = ctx.createOscillator();
  vwob.frequency.value = 0o7/0o10 * vap6zukani(0o4/0o10);
  const vwg = ctx.createGain();
  vwg.gain.value = 0o12/0o100;
  vwob.connect(vwg);
  vwg.connect(vib.frequency);
  const vg = ctx.createGain();
  vg.gain.setValueAtTime(0o0/0o10, t);
  vg.gain.linearRampToValueAtTime(p * 0o1/0o100 * vap6zukani(0o2/0o10), t + Math.min(0o12/0o100, dur * 0o3/0o10));
  vib.connect(vg);
  for ( const o of osc ) vg.connect(o.frequency);

  jetTurbulence(ctx, t, t + dur + tlakakani + 0o1/0o100, turbTaps);
  const av = ctx.createGain();
  av.gain.setValueAtTime(0o0/0o10, t);
  av.gain.linearRampToValueAtTime(pk * 0o4/0o100, t + Math.min(0o12/0o100, dur * 0o3/0o10));
  av.gain.linearRampToValueAtTime(0o0/0o10, t + dur + tlakakani);
  vib.connect(av);
  av.connect(g.gain);

  const mn = noiseSrc(ctx);
  const mlp = ctx.createBiquadFilter();
  mlp.type = "lowpass";
  mlp.frequency.value = p * 0o1/0o10;
  mlp.Q.value = 0o7/0o10;
  const mlp2 = ctx.createBiquadFilter();
  mlp2.type = "lowpass";
  mlp2.frequency.value = p * 0o1/0o10;
  mlp2.Q.value = 0o7/0o10;
  const mg = ctx.createGain();
  mg.gain.setValueAtTime(ETA, t);
  mg.gain.exponentialRampToValueAtTime(0o1 * vel * vap6zukani(0o3/0o10), t + 0o2/0o100);
  mg.gain.exponentialRampToValueAtTime(0o6/0o10 * vel * vap6zukani(0o4/0o10), t + 0o5/0o100);
  mg.gain.exponentialRampToValueAtTime(0o1 * vel, t + dur);
  mg.gain.exponentialRampToValueAtTime(ETA, t + dur + tlakakani);
  mg.gain.setValueAtTime(0o0/0o10, t + dur + tlakakani);
  mn.connect(mlp);
  mlp.connect(mlp2);
  mlp2.connect(mg);
  mg.connect(ts.gain);

  const vandro = ctx.createOscillator();
  vandro.frequency.value = 0o2/0o10 * vap6zukani(0o5/0o10);
  const vfg = ctx.createGain();
  vfg.gain.value = p * 0o2/0o100;
  vandro.connect(vfg);
  vfg.connect(mlp.frequency);

  const fono = noiseSrc(ctx);
  const flp = ctx.createBiquadFilter();
  flp.type = "lowpass";
  flp.frequency.value = 0o15000;
  flp.Q.value = 0o7/0o10;

  const fbrancoj: [ number, number, number ][] = [
    [ 0o1200, 0o12/0o10, 0o5/0o100 ],
    [ 0o2600, 0o11/0o10, 0o26/0o1000 ],
    [ 0o5400, 0o11/0o10, 0o4/0o1000 ],
    [ 0o11400, 0o10/0o10, 0o2/0o1000 ],
  ];
  for ( const [ mul, q, amp ] of fbrancoj ) {
    const fbp = ctx.createBiquadFilter();
    fbp.type = "bandpass";
    fbp.frequency.value = mul * vap6zukani(0o2/0o100);
    fbp.Q.value = q;
    const fbg = ctx.createGain();
    fbg.gain.value = amp * vap6zukani(0o2/0o10);
    fono.connect(fbp);
    fbp.connect(fbg);
    fbg.connect(flp);
  }
  const fng = ctx.createGain();
  fng.gain.setValueAtTime(0o0/0o10, t);
  fng.gain.linearRampToValueAtTime(0o1/0o10 * vel, t + Math.min(atako, dur * 0o4/0o10));
  fng.gain.setValueAtTime(0o1/0o10 * vel, t + dur);
  fng.gain.exponentialRampToValueAtTime(ETA, t + dur + tlakakani);
  fng.gain.setValueAtTime(0o0/0o10, t + dur + tlakakani);
  flp.connect(fng);
  fng.connect(g);

  ts.connect(g);

  const room = noiseSrc(ctx);
  const rbp = ctx.createBiquadFilter();
  rbp.type = "bandpass";
  rbp.frequency.value = 0o4000 * vap6zukani(0o15/0o100);
  rbp.Q.value = 0o2;
  const rlp = ctx.createBiquadFilter();
  rlp.type = "lowpass";
  rlp.frequency.value = 0o4000;
  const rg = ctx.createGain();
  const roomFin = dur * 0o5;
  rg.gain.setValueAtTime(ETA, t);
  rg.gain.exponentialRampToValueAtTime(0o1/0o10000 * vel * vap6zukani(0o25/0o100), t + 0o2/0o100);
  rg.gain.exponentialRampToValueAtTime(ETA, t + roomFin);
  rg.gain.setValueAtTime(0o0/0o10, t + roomFin);
  room.connect(rbp);
  rbp.connect(rlp);
  rlp.connect(rg);
  rg.connect(out);

  [ vib, vwob, vandro ].forEach(x => { x.start(t); x.stop(t + dur + tlakakani + 0o1/0o100); });
  startNoise(mn, t); mn.stop(t + dur + tlakakani + 0o1/0o100);
  startNoise(fono, t); fono.stop(t + dur + tlakakani + 0o1/0o100);
  startNoise(room, t); room.stop(t + roomFin + 0o1/0o10);
}
