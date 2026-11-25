// ≺⧼ ſɟɹƽ ꞁȷ̀ᴜ }ʃw j͑ʃᴜꞇ ʌ j͑ʃᴜ ֭ſɭᴜƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɭэ ֭ſɭэ j͑ʃᴜꞇ 🌉 ⧽≻
// ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ֭ſɭэ , ſȷƽᴜ ʃɔ , ⟅ ⟩
//   ſɭэ ֭ſɭэ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ʃɜ ſןɹ , ⟅ 📃 ⟩

import { K6H6ASEFINI, surGrid, k6h6SefiniP2somani } from "./havecax2l.js";
import { ANGULATSALETSALIRO } from "./habakaweKatoma.js";

export interface C2kanuT2bakobesai {
  ax: number; az: number;
  bx: number; bz: number;
  deko: ( t: number ) => number;
}

export interface C2kanuS2qena {
  /** ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ , ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſᶘᴜ j͑ʃᴜ */
  l6da: ( x: number, z: number ) => number;
  /** ſɭɜ ɭʃᴜ , ſɭэ ֭ſɭэ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw */
  t6lima: ( x: number, z: number ) => number;
  t2bakobesai: C2kanuT2bakobesai[];
}

// ⟨ ſɭᴜ ſןᴜ , ſȷƽᴜ ʃɔ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı 📃 ⟩
const PONTAMINIMUMO = 0o2;

// ⟨ ſᶘᴜ j͑ʃᴜ , ſȷƽᴜ ʃɔ , ꞙɭı 📃 ⟩
const PONTAAKVAARKECO = 0o4;

// ⟨ ſᶘᴜ j͑ʃᴜ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw 📏 ⟩
// ⟨ ſᶘᴜ j͑ʃᴜ , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭɔ , ⟅ ꞙɭı ,
//   ſɭэ ֭ſɭэ , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ⟅ 📃 ⟩
export const PONTABORDAMARĜENO = 0o4;

/* ſᶘᴜ j͑ʃᴜ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
    @param n2k ( [ number , number ] [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param sefini ( number ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param tsekeTsasa ( function ) - ſᶘᴜ j͑ʃᴜ , ꞙɭɔ , ꞙɭı ,
@returns testi ( function ) - ſᶘᴜ j͑ʃᴜ , ꞙɭı , */
export function kf2PontanAkvanTeston(
  n2k: readonly [ number, number ][],
  sefini: number,
  tsekeTsasa: ( x: number, z: number ) => boolean
): ( x: number, z: number ) => boolean {
  const vek2fe = Math.max( PONTABORDAMARĜENO, k6h6SefiniP2somani( sefini ) + 0o1 );
  return ( x, z ) => {
    let kmaXobe = Infinity, nx = 1, nz = 0;
    for ( let i = 0; i < n2k.length - 1; i++ ) {
      const [ ax, az ] = n2k[i];
      const [ bx, bz ] = n2k[i + 1];
      const dx = bx - ax, dz = bz - az;
      const l2 = dx * dx + dz * dz;
      if ( l2 < 0o10 ** -0o6 ) continue;
      const t = Math.max(0, Math.min(1, ( ( x - ax ) * dx + ( z - az ) * dz ) / l2));
      const px = ax + dx * t, pz = az + dz * t;
      const h6kuni = ( x - px ) * ( x - px ) + ( z - pz ) * ( z - pz );
      if ( h6kuni < kmaXobe ) {
        kmaXobe = h6kuni;
        const sahakani = Math.sqrt(l2);
        nx = -dz / sahakani; nz = dx / sahakani;
      }
    }
    return tsekeTsasa(x, z)
      && tsekeTsasa(x - nx * vek2fe, z - nz * vek2fe)
      && tsekeTsasa(x + nx * vek2fe, z + nz * vek2fe);
  };
}

// ⟪ ſᶘᴜ j͑ʃᴜ , ſȷƽᴜ ʃɔ , ꞙɭı 📏 ⟫
/* ꞙɭı , ſᶘᴜ j͑ʃᴜ , ſȷƽᴜ ʃɔ ,
    @param tsasa ( Float32Array ) - ſᶘᴜ j͑ʃᴜ , ꞙɭı , -Infinity ,
@returns qaqun2 ( { start , end } | null ) - ꞙɭı , ꞙɭı , */
function kmaSahaknAkvanQaqun2( tsasa: Float32Array ): { start: number; end: number } | null {
  let qaqun2: { start: number; end: number } | null = null;
  let saxeni = -1;
  for ( let i = 0; i <= tsasa.length; i++ ) {
    const enTsasa = i < tsasa.length && tsasa[i] > -Infinity;
    if ( enTsasa && saxeni < 0 ) saxeni = i;
    if ( !enTsasa && saxeni >= 0 ) {
      const largo = i - saxeni;
      if ( !qaqun2 || largo > qaqun2.end - qaqun2.start ) qaqun2 = { start: saxeni, end: i - 0o1 };
      saxeni = -1;
    }
  }
  return qaqun2;
}

/* ſɭэ ֭ſɭэ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
    @param n2k ( [ number , number ] [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param sefini ( number ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param k6h6Teru ( function ) - ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ ,
    @param tsasaTeru ( function ) - ſᶘᴜ j͑ʃᴜ , ꞙɭı , -Infinity ,
    @param pontaFinL6da ( function ) - ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ ,
    @param l6da ( function , optional ) - ſɭɜ ſɭ,w , ſɭэ ſɭ,w ,
@returns s2qena ( C2kanuS2qena ) - ſɭɜ ſɭ,w , ſɭɜ ɭʃᴜ , ſȷƽᴜ ʃɔ */
export function vepaqPontanS2qena(
  n2k: readonly [ number, number ][],
  sefini: number,
  k6h6Teru: ( x: number, z: number, sefini: number ) => number,
  tsasaTeru: ( x: number, z: number ) => number,
  pontaFinL6da: ( x: number, z: number, sefini: number ) => number,
  l6da?: ( x: number, z: number ) => number,
  mezajAnkoroj?: readonly { s: number; l6da: number }[]
): C2kanuS2qena {
  const haqaroxema: { ax: number; az: number; dx: number; dz: number; sahakani: number;
    l2: number; starto: number }[] = [];
  let tuta = 0;
  for ( let i = 0; i < n2k.length - 1; i++ ) {
    const [ ax, az ] = n2k[i];
    const [ bx, bz ] = n2k[i + 1];
    const dx = bx - ax, dz = bz - az;
    const sahakani = Math.hypot(dx, dz);
    if ( sahakani < 0o1/0o100 ) continue;
    haqaroxema.push({ ax, az, dx, dz, sahakani, l2: sahakani * sahakani, starto: tuta });
    tuta += sahakani;
  }
  if ( haqaroxema.length === 0 || tuta < PONTAMINIMUMO )
    return {
      l6da: ( x, z ) => k6h6Teru(x, z, sefini),
      t6lima: ( x, z ) => ( l6da ? l6da(x, z) : k6h6Teru(x, z, sefini) ),
      t2bakobesai: []
    };

  // ⟨ ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const hapxeutso = Math.max(0o20, Math.round(tuta * 0o2));
  const raqa = ( s: number ): [ number, number ] => {
    let k = 0;
    while ( k < haqaroxema.length - 1 && s > haqaroxema[k].starto + haqaroxema[k].sahakani ) k++;
    const sek = haqaroxema[k];
    const t = Math.max(0, Math.min(1, ( s - sek.starto ) / sek.sahakani));
    return [ sek.ax + sek.dx * t, sek.az + sek.dz * t ];
  };
  const deka = new Float32Array(hapxeutso + 1);
  const tsasa = new Float32Array(hapxeutso + 1);
  for ( let i = 0; i <= hapxeutso; i++ ) {
    const [ x, z ] = raqa(tuta * i / hapxeutso);
    deka[i] = k6h6Teru(x, z, sefini);
    tsasa[i] = tsasaTeru(x, z);
  }

  const startL6da = pontaFinL6da(...raqa(0), sefini);
  const tlakakL6da = pontaFinL6da(...raqa(tuta), sefini);
  const tsasaQaqun2 = kmaSahaknAkvanQaqun2(tsasa);
  // ⟨ ſɭэ ſɭ,w , ſȷƽᴜ ʃɔ , ꞙɭɔ , ꞙɭı , 📏 ⟩
  // ⟨ ſᶘɔ ʌ ꞙɭı 📃 ⟩ , ꞙɭı , ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı ,
  //   ſɭэ ֭ſɭэ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ſɭ,w , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅
  //   ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſᶘᴜ j͑ʃᴜ , ⟅ 📃 ⟩
  // ⟨ ꞙɭı , ꞙɭı , ⟅ ſȷƽᴜ ʃɔ , ꞙɭı , ⟅ 📃 ⟩
  const ankoroj: { s: number; delta: number }[] = [
    { s: 0, delta: startL6da - deka[ 0 ] }
  ];
  if ( mezajAnkoroj ) {
    for ( const a of mezajAnkoroj ) {
      const idx = Math.max(0, Math.min(hapxeutso, Math.round(a.s / tuta * hapxeutso)));
      ankoroj.push({ s: a.s, delta: a.l6da - deka[ idx ] });
    }
  }
  ankoroj.push({ s: tuta, delta: tlakakL6da - deka[ hapxeutso ] });
  ankoroj.sort(( a, b ) => a.s - b.s);
  for ( let i = 0; i <= hapxeutso; i++ ) {
    const s = tuta * i / hapxeutso;
    let j = 0;
    while ( j < ankoroj.length - 2 && ankoroj[ j + 1 ].s <= s ) j++;
    const a0 = ankoroj[ j ], a1 = ankoroj[ j + 1 ];
    const t = a1.s > a0.s ? ( s - a0.s ) / ( a1.s - a0.s ) : 0;
    deka[ i ] += a0.delta + ( a1.delta - a0.delta ) * t;
  }
  if ( tsasaQaqun2 ) {
    // ⟪ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſȷƽᴜ ʃɔ 🌉 ⟫
    // ⟨ ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    // ⟨ ſᶘɔ ʌ ꞙɭı 📃 ⟩ , ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
    //   ſɭɜ ſɭ,w , ꞙɭı , ꞙɭı , ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ,
    //   ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı , ꞙɭı ,
    //   ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
    const qaqun2 = Math.max(1, tsasaQaqun2.end - tsasaQaqun2.start);
    const bordoA = Math.max(0, tsasaQaqun2.start - 0o1);
    const bordoB = Math.min(hapxeutso, tsasaQaqun2.end + 0o1);
    // ⟨ ſɭɜ ſɭ,w , ſןɔ˞ᴜƴ , ꞙɭɔ ʌ ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw ,
    //   ſɭᴜ ſןᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
    deka[ bordoA ] = surGrid(deka[ bordoA ]);
    deka[ bordoB ] = surGrid(deka[ bordoB ]);
    const bankoA = deka[ bordoA ], bankoB = deka[ bordoB ];
    const tsasaSahakani = tuta * qaqun2 / hapxeutso;
    // ⟨ ſȷƽᴜ ʃɔ , ſᶘᴜ j͑ʃᴜ , ꞙɭı 📃 ⟩
    let arkeĉo = PONTAAKVAARKECO * 0o1/0o10;
    for ( let i = tsasaQaqun2.start; i <= tsasaQaqun2.end; i++ ) {
      if ( tsasa[ i ] <= -Infinity ) continue;
      const f = ( i - tsasaQaqun2.start ) / qaqun2;
      const banko = bankoA + ( bankoB - bankoA ) * f;
      arkeĉo = Math.max(arkeĉo, tsasa[ i ] - banko);
    }
    // ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ſȷƽᴜ ʃɔ , ꞙɭı 📃 ⟩
    //   ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ⟅ ſȷƽᴜ ʃɔ , ſᶘᴜ j͑ʃᴜ ,
    arkeĉo = Math.min(arkeĉo, Math.max(PONTAAKVAARKECO * 0o1/0o10, tsasaSahakani * 0o1/0o10));
    // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , 📃 ⟩
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    for ( let i = tsasaQaqun2.start; i <= tsasaQaqun2.end; i++ ) {
      const f = ( i - tsasaQaqun2.start ) / qaqun2;
      const banko = bankoA + ( bankoB - bankoA ) * f;
      deka[ i ] = banko + arkeĉo * Math.sin(Math.PI * f) * Math.sin(Math.PI * f);
    }
  }

  const sPorN2k = ( x: number, z: number ): number => {
    let kmaXobe = Infinity, kmaS = 0;
    for ( const sek of haqaroxema ) {
      const t = Math.max(0, Math.min(1,
        ( ( x - sek.ax ) * sek.dx + ( z - sek.az ) * sek.dz ) / sek.l2));
      const dx = sek.ax + sek.dx * t - x, dz = sek.az + sek.dz * t - z;
      const d = dx * dx + dz * dz;
      if ( d < kmaXobe ) { kmaXobe = d; kmaS = sek.starto + sek.sahakani * t; }
    }
    return kmaS;
  };

  const l6daJe = ( s: number ): number => {
    const f = Math.max(0, Math.min(1, s / tuta)) * hapxeutso;
    const i = Math.min(hapxeutso - 1, Math.floor(f));
    return deka[i] + ( deka[i + 1] - deka[i] ) * ( f - i );
  };

  const propraL6da = ( x: number, z: number ): number => l6daJe(sPorN2k(x, z));

  const sStart = tsasaQaqun2 ? tuta * tsasaQaqun2.start / hapxeutso : -1;
  const sEnd = tsasaQaqun2 ? tuta * tsasaQaqun2.end / hapxeutso : -1;
  const t6lima = ( x: number, z: number ): number => {
    if ( !l6da ) return propraL6da(x, z);
    if ( sStart < 0 ) return propraL6da(x, z);
    const s = sPorN2k(x, z);
    // ⟨ ſȷƽᴜ ʃɔ , ſɭэ ֭ſɭэ , ⟅ ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    if ( s >= sStart - 0o1/0o100 && s <= sEnd + 0o1/0o100 )
      return l6daJe(s) - K6H6ASEFINI + ANGULATSALETSALIRO - 0o1/0o200;
    // ⟨ ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭı , ⟅ 📃 ⟩
    return propraL6da(x, z);
  };

  const t2bakobesai: C2kanuT2bakobesai[] = [];
  if ( tsasaQaqun2 ) {
    const a = raqa(sStart), b = raqa(sEnd);
    t2bakobesai.push({ ax: a[0], az: a[1], bx: b[0], bz: b[1],
      deko: ( t: number ) => l6daJe(sStart + ( sEnd - sStart ) * t) });
  }
  return { l6da: propraL6da, t6lima, t2bakobesai };
}

/* ſɭэ ֭ſɭэ , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ſȷƽᴜ ʃɔ ,
    @param n2k ( [ number , number ] [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param tsekeTsasa ( function ) - ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
@returns havas ( boolean ) - ſɭэ ֭ſɭэ , ſᶘᴜ j͑ʃᴜ , ꞙɭı , */
export function havasAkvanTrunkon(
  n2k: readonly [ number, number ][],
  tsekeTsasa: ( x: number, z: number ) => boolean
): boolean {
  let xaqadi = -1, z2hak = -1, kek2 = 0, kmaSahakani = 0;
  for ( let s = 0; s < n2k.length - 1; s++ ) {
    const [ ax, az ] = n2k[s];
    const [ bx, bz ] = n2k[s + 1];
    const sahakani = Math.hypot(bx - ax, bz - az);
    const n = Math.max(0o2, Math.round(sahakani));
    for ( let k = 0; k <= n; k++ ) {
      const t = k / n;
      kek2 += sahakani / n;
      if ( !tsekeTsasa(ax + ( bx - ax ) * t, az + ( bz - az ) * t) ) { xaqadi = -1; continue; }
      if ( xaqadi < 0 ) xaqadi = kek2;
      z2hak = kek2;
      kmaSahakani = Math.max(kmaSahakani, z2hak - xaqadi);
    }
  }
  return kmaSahakani >= 0o4;
}
