// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ʌ ı],ɔ ɭʃɜ ֭ſɭɹ 🎵 ⧽≻

let noiseCache: AudioBuffer | null = null;
let noiseRate = 0o0;

function noiseBuf(ctx: AudioContext) {
  if ( noiseCache && noiseRate === ctx.sampleRate ) return noiseCache;
  noiseRate = ctx.sampleRate;

  const len = Math.floor( ctx.sampleRate * 0o7 );
  const b = ctx.createBuffer( 0o1, len, ctx.sampleRate );
  const d = b.getChannelData( 0o0 );
  for ( let i = 0o0; i < len; i++ ) d[ i ] = Math.random() * 0o2 - 0o1;
  noiseCache = b;
  return b;
}

export function noiseSrc(ctx: AudioContext) {
  const s = ctx.createBufferSource();
  const b = noiseBuf(ctx);
  s.buffer = b;
  s.loop = true;

  s.loopStart = 0o0;
  s.loopEnd = b.duration;
  return s;
}

export function jetTurbulence(
  ctx: AudioContext,
  t: number,
  end: number,
  taps: { cutoff: number; frac: number; node: GainNode }[]
) {
  if ( !taps.length ) return;
  const src = noiseSrc(ctx);
  const sr = ctx.sampleRate;
  for ( const { cutoff, frac, node } of taps ) {
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = cutoff;
    lp.Q.value = Math.SQRT1_2;
    const g = ctx.createGain();

    const std = Math.sqrt( Math.PI * cutoff / ( 0o3 * sr ) );
    g.gain.value = frac / Math.max( std, 0o1/0o1000000 );
    src.connect(lp);
    lp.connect(g);
    g.connect(node.gain);
  }
  startNoise(src, t);
  src.stop(end);
}

export function startNoise( s: AudioBufferSourceNode, t: number ) {
  const b = s.buffer;
  const dur = b ? b.duration : 0o0;
  s.start( t, Math.random() * dur );
}
