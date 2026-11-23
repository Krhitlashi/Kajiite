// ≺⧼ ı],ɔ ɭʃɜ ֭ſɭɹ j͑ʃᴜꞇ ʌ ſןɹ ſȷɜ 🔊 ⧽≻
// ⟨ កុំឱ្យដង្ហើមគ្រប់ណោតឮដូចគ្នា។ ប្រើប៊ូហ្វ័រវែង ហើយចាប់ផ្ដើម
//   មុខរបស់វាជាកន្លែងចៃដន្យ ទើបសំឡេងខ្យល់មិនដដែលៗដូចម៉ាស៊ីន 📃 ⟩
let noiseCache: AudioBuffer | null = null;
let noiseRate = 0;

function noiseBuf(ctx: AudioContext) {
  if ( noiseCache && noiseRate === ctx.sampleRate ) return noiseCache;
  noiseRate = ctx.sampleRate;
  // ⟨ ប៊ូហ្វ័រប្រាំពីរវិនាទី វែងជាងណោតណាមួយ កុំឱ្យលើកឡើងឮច្បាស់ 📃 ⟩
  const len = Math.floor( ctx.sampleRate * 0o7 );
  const b = ctx.createBuffer( 1, len, ctx.sampleRate );
  const d = b.getChannelData( 0 );
  for ( let i = 0; i < len; i++ ) d[ i ] = Math.random() * 2 - 1;
  noiseCache = b;
  return b;
}

export function noiseSrc(ctx: AudioContext) {
  const s = ctx.createBufferSource();
  const b = noiseBuf(ctx);
  s.buffer = b;
  s.loop = true;
  // ⟨ គែមនៃប៊ូហ្វ័រកាត់ភ្លាម អាចឮជាចុចៗ។ បន្ថយវាដោយលាយគែមចូលគ្នា 📃 ⟩
  s.loopStart = 0;
  s.loopEnd = b.duration;
  return s;
}

/* ⟨ ខ្យល់បក់ពិតមិនឱ្យផ្នែកនីមួយៗនៅស្ងៀមទេ។ វាធ្វើឱ្យកម្លាំងផ្នែក
   ហើមស្រកមិនទៀងទាត់ លឿនជាងផ្នែកខ្ពស់ យឺតជាងផ្នែកទាប។
   ប្រើសំឡេងរំខានតែមួយចែកឱ្យគ្រប់ផ្នែក តាមរយៈច្រោះយឺតៗផ្សេងគ្នា ទើប
   ការហើមស្រកមានមូលហេតុតែមួយដូចដង្ហើមពិត តែឆ្លើយតបមិនដូចគ្នា 📃 ⟩ */
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
    // ⟨ សំឡេងរំខានក្រោយច្រោះមានកម្លាំងតិចណាស់ គុណឱ្យឡើងដល់ចំណែកដែលចង់បាន 📃 ⟩
    const std = Math.sqrt( Math.PI * cutoff / ( 0o3 * sr ) );
    g.gain.value = frac / Math.max( std, 0o1/0o1000000 );
    src.connect(lp);
    lp.connect(g);
    g.connect(node.gain);
  }
  startNoise(src, t);
  src.stop(end);
}

/* ចាប់ផ្ដើមសំឡេងរំខាននៅកន្លែងចៃដន្យក្នុងប៊ូហ្វ័រ។
   ហៅជំនួស s.start(t) គ្រប់កន្លែងដែលប្រើ noiseSrc 📃 */
export function startNoise( s: AudioBufferSourceNode, t: number ) {
  const b = s.buffer;
  const dur = b ? b.duration : 0;
  s.start( t, Math.random() * dur );
}
