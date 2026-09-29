// ≺⧼ La noiza bufro 🔊 ⧽≻
// La duaranga noiz-fonto de la voĉoj — unu komuna bufro por la tuta paĝo
// ( noiseCache, noiseBuf ) kaj la buferfontoj, kiujn la voĉoj miksas en sin
// ( noiseSrc ).
let noiseCache: AudioBuffer | null = null;

function noiseBuf(ctx: AudioContext) {
  if ( noiseCache ) return noiseCache;
  const len = ctx.sampleRate * 2;
  const b = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = b.getChannelData(0);
  for ( let i = 0; i < len; i++ ) d[i] = Math.random() * 2 - 1;
  noiseCache = b;
  return b;
}

export function noiseSrc(ctx: AudioContext) {
  const s = ctx.createBufferSource();
  s.buffer = noiseBuf(ctx);
  s.loop = true;
  return s;
}
