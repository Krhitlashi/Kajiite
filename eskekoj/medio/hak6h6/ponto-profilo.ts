// ≺⧼ ſɟɹƽ ꞁȷ̀ᴜ }ʃw j͑ʃᴜꞇ ʌ j͑ʃᴜ ֭ſɭᴜƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɭэ ֭ſɭэ j͑ʃᴜꞇ 🌉 ⧽≻
// ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ֭ſɭэ , ſȷƽᴜ ʃɔ , ⟅ ⟩
//   ſɭэ ֭ſɭэ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ʃɜ ſןɹ , ⟅ 📃 ⟩

import { VOJA_DIKECO, surGrid, k6h6LarghoDuono } from "./havecax2l.js";
import { ANGULA_PROVOLIRO } from "./habakaweKatoma.js";

export interface PontoTrako {
  ax: number; az: number;
  bx: number; bz: number;
  deko: ( t: number ) => number;
}

export interface PontoProfilo {
  /** ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ , ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſᶘᴜ j͑ʃᴜ */
  l6da: ( x: number, z: number ) => number;
  /** ſɭɜ ɭʃᴜ , ſɭэ ֭ſɭэ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw */
  grundo: ( x: number, z: number ) => number;
  trakoj: PontoTrako[];
}

// ⟨ ſɭᴜ ſןᴜ , ſȷƽᴜ ʃɔ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı 📃 ⟩
const PONTA_MINIMUMO = 0o2;

// ⟨ ſᶘᴜ j͑ʃᴜ , ſȷƽᴜ ʃɔ , ꞙɭı 📃 ⟩
const PONTA_AKVA_ARKECO = 0o4;

// ⟨ ſᶘᴜ j͑ʃᴜ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw 📏 ⟩
// ⟨ ſᶘᴜ j͑ʃᴜ , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭɔ , ⟅ ꞙɭı ,
//   ſɭэ ֭ſɭэ , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ⟅ 📃 ⟩
export const PONTA_BORDA_MARĜENO = 0o4;

/* ſᶘᴜ j͑ʃᴜ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
    @param n2k ( [ number , number ] [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param sefini ( number ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param tsekeAkvo ( function ) - ſᶘᴜ j͑ʃᴜ , ꞙɭɔ , ꞙɭı ,
@returns testi ( function ) - ſᶘᴜ j͑ʃᴜ , ꞙɭı , */
export function kf2PontanAkvanTeston(
  n2k: readonly [ number, number ][],
  sefini: number,
  tsekeAkvo: ( x: number, z: number ) => boolean
): ( x: number, z: number ) => boolean {
  const kanto = Math.max( PONTA_BORDA_MARĜENO, k6h6LarghoDuono( sefini ) + 0o1 );
  return ( x, z ) => {
    let plejBona = Infinity, nx = 1, nz = 0;
    for ( let i = 0; i < n2k.length - 1; i++ ) {
      const [ ax, az ] = n2k[i];
      const [ bx, bz ] = n2k[i + 1];
      const dx = bx - ax, dz = bz - az;
      const l2 = dx * dx + dz * dz;
      if ( l2 < 0o10 ** -0o6 ) continue;
      const t = Math.max(0, Math.min(1, ( ( x - ax ) * dx + ( z - az ) * dz ) / l2));
      const px = ax + dx * t, pz = az + dz * t;
      const h6kuni = ( x - px ) * ( x - px ) + ( z - pz ) * ( z - pz );
      if ( h6kuni < plejBona ) {
        plejBona = h6kuni;
        const sahakani = Math.sqrt(l2);
        nx = -dz / sahakani; nz = dx / sahakani;
      }
    }
    return tsekeAkvo(x, z)
      && tsekeAkvo(x - nx * kanto, z - nz * kanto)
      && tsekeAkvo(x + nx * kanto, z + nz * kanto);
  };
}

// ⟪ ſᶘᴜ j͑ʃᴜ , ſȷƽᴜ ʃɔ , ꞙɭı 📏 ⟫
/* ꞙɭı , ſᶘᴜ j͑ʃᴜ , ſȷƽᴜ ʃɔ ,
    @param akvo ( Float32Array ) - ſᶘᴜ j͑ʃᴜ , ꞙɭı , -Infinity ,
@returns dejo ( { start , end } | null ) - ꞙɭı , ꞙɭı , */
function plejLonganAkvanDejon( akvo: Float32Array ): { start: number; end: number } | null {
  let dejo: { start: number; end: number } | null = null;
  let saxeni = -1;
  for ( let i = 0; i <= akvo.length; i++ ) {
    const enAkvo = i < akvo.length && akvo[i] > -Infinity;
    if ( enAkvo && saxeni < 0 ) saxeni = i;
    if ( !enAkvo && saxeni >= 0 ) {
      const largo = i - saxeni;
      if ( !dejo || largo > dejo.end - dejo.start ) dejo = { start: saxeni, end: i - 0o1 };
      saxeni = -1;
    }
  }
  return dejo;
}

/* ſɭэ ֭ſɭэ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
    @param n2k ( [ number , number ] [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param sefini ( number ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param k6h6Supro ( function ) - ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ ,
    @param akvaSupro ( function ) - ſᶘᴜ j͑ʃᴜ , ꞙɭı , -Infinity ,
    @param pontaFinAlto ( function ) - ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ ,
    @param alteco ( function , optional ) - ſɭɜ ſɭ,w , ſɭэ ſɭ,w ,
@returns s2qena ( PontoProfilo ) - ſɭɜ ſɭ,w , ſɭɜ ɭʃᴜ , ſȷƽᴜ ʃɔ */
export function vepaqPontanProfilon(
  n2k: readonly [ number, number ][],
  sefini: number,
  k6h6Supro: ( x: number, z: number, sefini: number ) => number,
  akvaSupro: ( x: number, z: number ) => number,
  pontaFinAlto: ( x: number, z: number, sefini: number ) => number,
  alteco?: ( x: number, z: number ) => number,
  mezajAnkoroj?: readonly { s: number; l6da: number }[]
): PontoProfilo {
  const sekcioj: { ax: number; az: number; dx: number; dz: number; sahakani: number;
    l2: number; starto: number }[] = [];
  let tuta = 0;
  for ( let i = 0; i < n2k.length - 1; i++ ) {
    const [ ax, az ] = n2k[i];
    const [ bx, bz ] = n2k[i + 1];
    const dx = bx - ax, dz = bz - az;
    const sahakani = Math.hypot(dx, dz);
    if ( sahakani < 0o1/0o100 ) continue;
    sekcioj.push({ ax, az, dx, dz, sahakani, l2: sahakani * sahakani, starto: tuta });
    tuta += sahakani;
  }
  if ( sekcioj.length === 0 || tuta < PONTA_MINIMUMO )
    return {
      l6da: ( x, z ) => k6h6Supro(x, z, sefini),
      grundo: ( x, z ) => ( alteco ? alteco(x, z) : k6h6Supro(x, z, sefini) ),
      trakoj: []
    };

  // ⟨ ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const specimenoj = Math.max(0o20, Math.round(tuta * 0o2));
  const raqa = ( s: number ): [ number, number ] => {
    let k = 0;
    while ( k < sekcioj.length - 1 && s > sekcioj[k].starto + sekcioj[k].sahakani ) k++;
    const sek = sekcioj[k];
    const t = Math.max(0, Math.min(1, ( s - sek.starto ) / sek.sahakani));
    return [ sek.ax + sek.dx * t, sek.az + sek.dz * t ];
  };
  const deka = new Float32Array(specimenoj + 1);
  const akvo = new Float32Array(specimenoj + 1);
  for ( let i = 0; i <= specimenoj; i++ ) {
    const [ x, z ] = raqa(tuta * i / specimenoj);
    deka[i] = k6h6Supro(x, z, sefini);
    akvo[i] = akvaSupro(x, z);
  }

  const startAlto = pontaFinAlto(...raqa(0), sefini);
  const finoAlto = pontaFinAlto(...raqa(tuta), sefini);
  const akvaDejo = plejLonganAkvanDejon(akvo);
  // ⟨ ſɭэ ſɭ,w , ſȷƽᴜ ʃɔ , ꞙɭɔ , ꞙɭı , 📏 ⟩
  // ⟨ ſᶘɔ ʌ ꞙɭı 📃 ⟩ , ꞙɭı , ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı ,
  //   ſɭэ ֭ſɭэ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ſɭ,w , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅
  //   ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſᶘᴜ j͑ʃᴜ , ⟅ 📃 ⟩
  // ⟨ ꞙɭı , ꞙɭı , ⟅ ſȷƽᴜ ʃɔ , ꞙɭı , ⟅ 📃 ⟩
  const ankoroj: { s: number; delta: number }[] = [
    { s: 0, delta: startAlto - deka[ 0 ] }
  ];
  if ( mezajAnkoroj ) {
    for ( const a of mezajAnkoroj ) {
      const idx = Math.max(0, Math.min(specimenoj, Math.round(a.s / tuta * specimenoj)));
      ankoroj.push({ s: a.s, delta: a.l6da - deka[ idx ] });
    }
  }
  ankoroj.push({ s: tuta, delta: finoAlto - deka[ specimenoj ] });
  ankoroj.sort(( a, b ) => a.s - b.s);
  for ( let i = 0; i <= specimenoj; i++ ) {
    const s = tuta * i / specimenoj;
    let j = 0;
    while ( j < ankoroj.length - 2 && ankoroj[ j + 1 ].s <= s ) j++;
    const a0 = ankoroj[ j ], a1 = ankoroj[ j + 1 ];
    const t = a1.s > a0.s ? ( s - a0.s ) / ( a1.s - a0.s ) : 0;
    deka[ i ] += a0.delta + ( a1.delta - a0.delta ) * t;
  }
  if ( akvaDejo ) {
    // ⟪ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſȷƽᴜ ʃɔ 🌉 ⟫
    // ⟨ ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    // ⟨ ſᶘɔ ʌ ꞙɭı 📃 ⟩ , ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
    //   ſɭɜ ſɭ,w , ꞙɭı , ꞙɭı , ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ,
    //   ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı , ꞙɭı ,
    //   ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
    const dejo = Math.max(1, akvaDejo.end - akvaDejo.start);
    const bordoA = Math.max(0, akvaDejo.start - 0o1);
    const bordoB = Math.min(specimenoj, akvaDejo.end + 0o1);
    // ⟨ ſɭɜ ſɭ,w , ſןɔ˞ᴜƴ , ꞙɭɔ ʌ ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw ,
    //   ſɭᴜ ſןᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
    deka[ bordoA ] = surGrid(deka[ bordoA ]);
    deka[ bordoB ] = surGrid(deka[ bordoB ]);
    const bankoA = deka[ bordoA ], bankoB = deka[ bordoB ];
    const akvaLongo = tuta * dejo / specimenoj;
    // ⟨ ſȷƽᴜ ʃɔ , ſᶘᴜ j͑ʃᴜ , ꞙɭı 📃 ⟩
    let arkeĉo = PONTA_AKVA_ARKECO * 0o1/0o10;
    for ( let i = akvaDejo.start; i <= akvaDejo.end; i++ ) {
      if ( akvo[ i ] <= -Infinity ) continue;
      const f = ( i - akvaDejo.start ) / dejo;
      const banko = bankoA + ( bankoB - bankoA ) * f;
      arkeĉo = Math.max(arkeĉo, akvo[ i ] - banko);
    }
    // ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ſȷƽᴜ ʃɔ , ꞙɭı 📃 ⟩
    //   ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ⟅ ſȷƽᴜ ʃɔ , ſᶘᴜ j͑ʃᴜ ,
    arkeĉo = Math.min(arkeĉo, Math.max(PONTA_AKVA_ARKECO * 0o1/0o10, akvaLongo * 0o1/0o10));
    // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , 📃 ⟩
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    for ( let i = akvaDejo.start; i <= akvaDejo.end; i++ ) {
      const f = ( i - akvaDejo.start ) / dejo;
      const banko = bankoA + ( bankoB - bankoA ) * f;
      deka[ i ] = banko + arkeĉo * Math.sin(Math.PI * f) * Math.sin(Math.PI * f);
    }
  }

  const sPorPunkto = ( x: number, z: number ): number => {
    let plejBona = Infinity, plejS = 0;
    for ( const sek of sekcioj ) {
      const t = Math.max(0, Math.min(1,
        ( ( x - sek.ax ) * sek.dx + ( z - sek.az ) * sek.dz ) / sek.l2));
      const dx = sek.ax + sek.dx * t - x, dz = sek.az + sek.dz * t - z;
      const d = dx * dx + dz * dz;
      if ( d < plejBona ) { plejBona = d; plejS = sek.starto + sek.sahakani * t; }
    }
    return plejS;
  };

  const altoJe = ( s: number ): number => {
    const f = Math.max(0, Math.min(1, s / tuta)) * specimenoj;
    const i = Math.min(specimenoj - 1, Math.floor(f));
    return deka[i] + ( deka[i + 1] - deka[i] ) * ( f - i );
  };

  const l6da = ( x: number, z: number ): number => altoJe(sPorPunkto(x, z));

  const sStart = akvaDejo ? tuta * akvaDejo.start / specimenoj : -1;
  const sEnd = akvaDejo ? tuta * akvaDejo.end / specimenoj : -1;
  const grundo = ( x: number, z: number ): number => {
    if ( !alteco ) return l6da(x, z);
    if ( sStart < 0 ) return alteco(x, z);
    const s = sPorPunkto(x, z);
    // ⟨ ſȷƽᴜ ʃɔ , ſɭэ ֭ſɭэ , ⟅ ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    if ( s >= sStart - 0o1/0o100 && s <= sEnd + 0o1/0o100 )
      return altoJe(s) - VOJA_DIKECO + ANGULA_PROVOLIRO - 0o1/0o200;
    // ⟨ ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭı , ⟅ 📃 ⟩
    return alteco(x, z);
  };

  const trakoj: PontoTrako[] = [];
  if ( akvaDejo ) {
    const a = raqa(sStart), b = raqa(sEnd);
    trakoj.push({ ax: a[0], az: a[1], bx: b[0], bz: b[1],
      deko: ( t: number ) => altoJe(sStart + ( sEnd - sStart ) * t) });
  }
  return { l6da, grundo, trakoj };
}

/* ſɭэ ֭ſɭэ , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ſȷƽᴜ ʃɔ ,
    @param n2k ( [ number , number ] [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param tsekeAkvo ( function ) - ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
@returns havas ( boolean ) - ſɭэ ֭ſɭэ , ſᶘᴜ j͑ʃᴜ , ꞙɭı , */
export function havasAkvanTrunkon(
  n2k: readonly [ number, number ][],
  tsekeAkvo: ( x: number, z: number ) => boolean
): boolean {
  let xaqadi = -1, z2hak = -1, kalkulo = 0, plejLonga = 0;
  for ( let s = 0; s < n2k.length - 1; s++ ) {
    const [ ax, az ] = n2k[s];
    const [ bx, bz ] = n2k[s + 1];
    const sahakani = Math.hypot(bx - ax, bz - az);
    const n = Math.max(0o2, Math.round(sahakani));
    for ( let k = 0; k <= n; k++ ) {
      const t = k / n;
      kalkulo += sahakani / n;
      if ( !tsekeAkvo(ax + ( bx - ax ) * t, az + ( bz - az ) * t) ) { xaqadi = -1; continue; }
      if ( xaqadi < 0 ) xaqadi = kalkulo;
      z2hak = kalkulo;
      plejLonga = Math.max(plejLonga, z2hak - xaqadi);
    }
  }
  return plejLonga >= 0o4;
}
