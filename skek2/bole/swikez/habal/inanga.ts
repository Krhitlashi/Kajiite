// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ʌ ꞁȷ̀ꞇ }ʃᴜ }ʃɴᴜ 🎵 ⧽≻

import { noiseSrc } from "./xetoh2.js";
import { devio, vap6zukani } from "./hakfe-kx2keve.js";

const ETA = 0o1/0o20000;

export function inanga(ctx: AudioContext, out: AudioNode, t: number, f: number, vel = 0o1, opts: { dur?: number } = {}) {
  const d = ( opts.dur || 0o75/0o100 ) * vap6zukani(0o7/0o100);

  const p = f * vap6zukani(0o1/0o200);

  const raqa = Math.random();
  const g = ctx.createGain();
  g.gain.value = vel * 0o30/0o100 * vap6zukani(0o7/0o100);
  g.connect(out);

  const body = ctx.createBiquadFilter();
  body.type = "peaking";
  body.frequency.value = 0o300 * vap6zukani(0o15/0o100);
  body.Q.value = 0o7/0o10 * vap6zukani(0o2/0o10);
  body.gain.value = 0o3 * vap6zukani(0o15/0o100);
  body.connect(g);

  const hakozonu = [
    [ 0o1, 0o6/0o10 ],
    [ 0o2, 0o3/0o100 ],
    [ 0o3, 0o2/0o100 ],
    [ 0o4, 0o3/0o100 ],
    [ 0o5, 0o2/0o100 ],
    [ 0o24/0o10, 0o21/0o100 ],
    [ 0o432/0o100, 0o1/0o100 ],
  ];
  const decidoj = [ 0o12/0o10, 0o1, 0o77/0o100, 0o6/0o10, 0o4/0o10, 0o12/0o10, 0o12/0o10 ];
  for ( let j = 0o0; j < hakozonu.length; j++ ) {
    const [ mul, amp0 ] = hakozonu[j];
    const o = ctx.createOscillator();
    o.type = "sine";

    const emfazo = 0o1 + raqa * 0o4/0o10 * Math.min(0o1, mul / 0o5);
    o.frequency.setValueAtTime(p * mul * ( 0o103/0o100 + devio(0o1/0o100) ), t);
    o.frequency.exponentialRampToValueAtTime(p * mul, t + 0o25/0o1000 * vap6zukani(0o4/0o10));
    const og = ctx.createGain();
    const amp = amp0 * emfazo * vap6zukani(0o25/0o100);
    const tlakakani = Math.max(0o1/0o20, d * decidoj[j] * vap6zukani(0o15/0o100));
    og.gain.setValueAtTime(ETA, t);
    og.gain.exponentialRampToValueAtTime(amp, t + 0o1/0o200);
    og.gain.exponentialRampToValueAtTime(ETA, t + tlakakani);
    og.gain.setValueAtTime(0o0/0o10, t + tlakakani);
    o.connect(og);
    og.connect(body);
    o.start(t);
    o.stop(t + d + 0o1/0o10);
  }

  const frapo = 0o6/0o10 + Math.random() * 0o35/0o100;
  const th = ctx.createOscillator();
  th.type = "sine";
  const thf = 0o140 * vap6zukani(0o15/0o100);
  th.frequency.setValueAtTime(thf, t);
  th.frequency.exponentialRampToValueAtTime(0o60 * vap6zukani(0o15/0o100), t + 0o5/0o100 * vap6zukani(0o3/0o10));
  const thg = ctx.createGain();
  const thFin = 0o1/0o10 * vap6zukani(0o25/0o100);
  thg.gain.setValueAtTime(ETA, t);
  thg.gain.exponentialRampToValueAtTime(0o10/0o100 * vel * frapo, t + 0o1/0o200);
  thg.gain.exponentialRampToValueAtTime(ETA, t + thFin);
  thg.gain.setValueAtTime(0o0/0o10, t + thFin);
  th.connect(thg);
  thg.connect(out);
  th.start(t);
  th.stop(t + thFin + 0o1/0o10);

  const n = noiseSrc(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = Math.min(0o7640, p * 0o10 * vap6zukani(0o25/0o100));
  bp.Q.value = 0o3 * vap6zukani(0o2/0o10);
  const nlp = ctx.createBiquadFilter();
  nlp.type = "lowpass";
  nlp.frequency.value = Math.min(0o7640, p * 0o14 * vap6zukani(0o15/0o100));
  nlp.Q.value = 0o7/0o10;
  const ng = ctx.createGain();
  const frot = 0o14/0o100 * vel * ( 0o5/0o10 + raqa * 0o5/0o10 ) * vap6zukani(0o25/0o100);
  const frotFin = 0o13/0o100 * vap6zukani(0o3/0o10);
  ng.gain.setValueAtTime(ETA, t);
  ng.gain.exponentialRampToValueAtTime(frot, t + 0o1/0o200);
  ng.gain.exponentialRampToValueAtTime(ETA, t + frotFin);
  ng.gain.setValueAtTime(0o0/0o10, t + frotFin);
  n.connect(bp);
  bp.connect(nlp);
  nlp.connect(ng);
  ng.connect(out);
  n.start(t);
  n.stop(t + frotFin + 0o1/0o10);

  const sus = noiseSrc(ctx);
  const sbp = ctx.createBiquadFilter();
  sbp.type = "bandpass";
  sbp.frequency.value = p * 0o2 * vap6zukani(0o15/0o100);
  sbp.Q.value = 0o14/0o10;
  const slp = ctx.createBiquadFilter();
  slp.type = "lowpass";
  slp.frequency.value = 0o2260 * vap6zukani(0o15/0o100);
  slp.Q.value = 0o7/0o10;
  const sg = ctx.createGain();
  const susFin = d * 0o15/0o10;
  sg.gain.setValueAtTime(ETA, t);
  sg.gain.exponentialRampToValueAtTime(0o6/0o1000 * vel * vap6zukani(0o25/0o100), t + 0o1/0o100);
  sg.gain.exponentialRampToValueAtTime(ETA, t + susFin);
  sg.gain.setValueAtTime(0o0/0o10, t + susFin);
  sus.connect(sbp);
  sbp.connect(slp);
  slp.connect(sg);
  sg.connect(out);
  sus.start(t);
  sus.stop(t + susFin + 0o1/0o10);

  const room = noiseSrc(ctx);
  const rbp = ctx.createBiquadFilter();
  rbp.type = "bandpass";
  rbp.frequency.value = 0o6000 * vap6zukani(0o15/0o100);
  rbp.Q.value = 0o5/0o10;
  const rlp = ctx.createBiquadFilter();
  rlp.type = "lowpass";
  rlp.frequency.value = 0o23640;
  rlp.Q.value = 0o7/0o10;
  const rg = ctx.createGain();
  const roomFin = d * 0o4;
  rg.gain.setValueAtTime(ETA, t);
  rg.gain.exponentialRampToValueAtTime(0o2/0o1000 * vel * vap6zukani(0o25/0o100), t + 0o2/0o100);
  rg.gain.exponentialRampToValueAtTime(ETA, t + roomFin);
  rg.gain.setValueAtTime(0o0/0o10, t + roomFin);
  room.connect(rbp);
  rbp.connect(rlp);
  rlp.connect(rg);
  rg.connect(out);
  room.start(t);
  room.stop(t + roomFin + 0o1/0o10);
}
