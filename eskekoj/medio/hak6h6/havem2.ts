// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͑ʃ'ɔ ŋᷠɹ 📏 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , ſןɔ˞ᴜƴ , j͑ʃᴜ ſɭ,w , ſןɔ˞ᴜƴ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ꞙɭэ , ⟅ ſɭɜ ſɭ,w , ꞙɭɔ , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭɔ ,
// ꞙɭı , ֭ſɭэ ſɭэ , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , 📃 ⟩
import { VOJA_TERA_KLINO } from "./alto.js";
import { plataAltoCxe, type PlataVem2 } from "./haqoxa.js";
import { rampaKuro, STUPA_RAMPO_KURO, STUPA_RISERO, subGrid, surGrid,
  VOJA_BURIAL_TOLERANCO, VOJA_SUPRO_LEVIGXO, VOJA_TRUA_DUONO } from "./havecax2l.js";

// ⟪ ſןᶗ‹ɔⅎ ſᶘɜ , j͑ʃᴜ ſɭ,w 📏 ⟫
// ⟨ ſןᶗ‹ɔⅎ ſᶘɜ , j͑ʃᴜ ſɭ,w , ֭ſɭэ ſɭw }ʃꞇ , ſןɔ˞ᴜƴ , ſɭэ ſɭᴜ , ꞙɭı ,
// ſןᶗ‹ɔⅎ ſᶘɜ , ꞙɭɿ , ſןɔ˞ᴜƴ , ſɭэ ſɭᴜ , ꞙɭı , ꞙɭı , 📃 ⟩
export const NIVELA_PASO = STUPA_RAMPO_KURO;

// ⟨ ı],ᴜ ֭ſɭᴜ , ꞙɭı ⟩ , ֭ſɭэ ſɭэ , ſןᴜ ſᶘɹ , ֭ſɭэ ſɭw }ʃꞇ , ꞙɭı , ꞙɭı , 📃 ⟩
// ⟨ ꞙɭɩ ꞙɭɿ , 📏 ⟩ , ſɭɜ ſɭ,w , ſןᴜ ſᶘɹ , ꞙɭı , ſɭэ ֭ſɭэ ,
// ꞙɭı , ɭʃɹ ʃᴜ }ʃw , ꞙɭıɔ , ſןᴜ ſᶘɹ , ꞙɭı , ſɭэ ֭ſɭэ , ı],ᴜ ֭ſɭᴜ ,
// ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ , ſɭᴜ ſןᴜ , ꞙɭı , ſɭɜ ſɭ,w , ᶅſɔ ֭ſɭɹ , 📃 ⟩
export const NIVELA_GLATIGO = 0o10;

// ⟨ ſɭɜ ſɭ,w , ꞙɭɿ ⟩ , ſɭэ ֭ſɭэ , ꞙɭɔ , ſɭɜ ſɭ,w , ꞙɭɔ , ֭ſɭэ ſɭw }ʃꞇ , ꞙɭı , 📃 ⟩
export const NIVELA_KONFIRMO = 0o10;

// ⟨ ſןɔ˞ᴜƴ , ֭ſɭэ ſɭw }ʃꞇ , 🦶 ⟩
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ֭ſɭэ ſɭw }ʃꞇ , ⟅ ſןɔ˞ᴜƴ , j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭɿ ,
// ſɭэ ֭ſɭэ , ſɟᴜ ſןᴜ ɭʃэ , ſɭэ ſɭ,w , ꞙɭı , ꞙɭɔ , ſɭэ ֭ſɭэ , ſןɔ˞ᴜƴ ,
// ֭ſɭᴜ ſ͔ɭᴜ , ſɭэ ſɭᴜ , ꞙɭı , ſןɔ˞ᴜƴ , j͑ʃᴜ ſɭ,w , ꞙɭɔ , 📃 ⟩
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ֭ſɭэ ſɭw }ʃꞇ , ⟅ ſןᶗ‹ɔⅎ ſᶘɜ , ֭ſɭэ ſɭw }ʃꞇ , ſɭэ ֭ſɭэ , ꞙɭı ,
// ſןɔ˞ᴜƴ , ꞙɭı , ſןᶗ‹ɔⅎ ſᶘɜ , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭɿ , ꞙɭı / ꞙɭɿ ,
// ſɭɜ ſɭ,w , ֭ſɭᴜ ſ͔ɭᴜ , ꞙɭı , ꞙɭꞟɔ , ſɭэ ֭ſɭэ , ꞙɭı ,
// ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭı , ꞙɭı , 📃 ⟩
export const NIVELA_STUPA_DISTO = STUPA_RAMPO_KURO;

// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , ⟅ ſɭэ ɭʃᴜ , j͑ʃɜ j͑ʃƨɹ , ſɭɹ ſןᴜ 📃 ⟩
const LAUXAJ = [ -0o1/0o2, 0, 0o1/0o2 ];

// ⟪ ֭ſɭэ ſɭэ , j͑ʃ'ɔ ɭʃɔ ŋᷠɹ 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ֭ſɭэ ſɭэ , ꞙɭı , ⟅ ſɭɜ ſɭ,w , j͑ʃ'ɔ ɭʃɔ ſןɹ ,
// ꞙɭı , ſɭэ ֭ſɭэ , ֭ſɭэ ſɭэ , ꞙɭı , ꞙɭɿ , ſɭэ ֭ſɭэ , j͑ʃɜ j͑ʃƨɹ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭɜ ſɭ,w , }ʃɹƽ , ꞙɭɔ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ꞙɭı , j͑ʃ'ɔ ɭʃɔ ſןɹ , ꞙɭı , ſɭэ ֭ſɭэ , ſɭэ ſɭ,w , ꞙɭı ,
// }ʃɹƽ , ꞙɭɔ , ꞙɭı , ſɭэ ֭ſɭэ , }ʃɹƽ , ꞙɭı , 📃 ⟩
// ⟨ ɭʃɜᴜ̩ ɭʃɔ , ֭ſɭэ ſɭw }ʃꞇ , 📏 ⟩ , ɭʃɜᴜ̩ ɭʃɔ , ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭɿ , ꞙɭı ,
// ⟨ ֭ſɭэ ſɭэ , ſɭэ ſɭᴜ , 📃 ⟩ , ɭʃɹ ʃᴜ }ʃw , ꞙɭɔ , ꞙɭı , ſɭэ ֭ſɭэ , ſɭэ ſɭ,w ,
// ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , ſןᶗ‹ɔⅎ ᶘɜ , ɭʃɜᴜ̩ ɭʃɔ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ſɭэ ֭ſɭэ , ſɭэ ſɭ,w , ꞙɭɔ , ɭʃɹ ʃᴜ }ʃw , ꞙɭɿ , ֭ſɭэ ſɭэ , ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟩
export const NIVELA_PLENIGA_DISTO = 0o2;
// ⟨ ſɭэ ֭ſɭэ , ֭ſɭэ ſɭэ , j͑ʃ'ɔ ɭʃɔ ſןɹ , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , 📃 ⟩
export const NIVELA_PLENIGO = 0o1/0o2;

// ⟨ }ʃɹƽ , ſȷƽᴜ ʃɔ , ⟅ ſȷƽᴜ ʃɔ , ꞙɭı , }ʃɹƽ 📃 ⟩ , ſɟᴜ ſןᴜ ɭʃэ ,
// ⟨ ſȷƽᴜ ʃɔ , 📃 ⟩ , ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı , ſɭᴜc̗ ɭʃɜ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ɭʃɜᴜ̩ ɭʃɔ , ꞙɭı , ꞙɭɿ , ſɭэ ֭ſɭэ , ſɟᴜ ſןᴜ ɭʃэ ,
// ꞙɭı , ſɭᴜc̗ ɭʃɜ , ꞙɭɿ , ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
// ſɭэ ֭ſɭэ , ꞙɭɿ , }ʃɹƽ , ꞙɭı , j͑ʃᴜ ſɭ,w , ꞙɭɔ , }ʃɹƽ , ſȷƽᴜ ʃɔ , ꞙɭı ,
// j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const RONDAJ = 0o10;
const RONDAJ_RADIOJ = [ 0o1/0o2, 0o1 ];

export interface NivelaProfilo {
  // ⟨ ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , 📃 ⟩
  hal6da: number[];
  // ⟨ j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ⟅ ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭı , 📃 ⟩
  celoj: number[];
  // ⟨ ֭ſɭэ ſɭw }ʃꞇ , ſɭэ ֭ſɭэ , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , 📃 ⟩
  haxekuxa: number[];
  sahakani: number;
  // ⟨ j͑ʃᴜ ſɭ,w , j͑ʃɜ j͑ʃƨɹ , j͑ʃᴜ ſɭ,w , ſןw ſɭᴜƴ , ı],ᴜ ֭ſɭᴜ , ⟅ ſןɔ˞ᴜƴ ,
  // ɭʃɹ ʃᴜ ſɭɹ ſɟꞇ ʃɔ , ꞙɭı , ɭʃɹ ʃᴜ ſɭɹ ſɟꞇ ʃɔ , ꞙɭɿ , 📃 ⟩
  centraj: number[];
  glataj: number[];
  // ⟨ ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ֭ſɭэ ſɭw }ʃꞇ , ꞙɭı , 📃 ⟩
  altoCxe: ( s: number ) => number;
}

interface Sekcio {
  ax: number;
  az: number;
  dx: number;
  dz: number;
  sahakani: number;
  starto: number;
}

// ⟪ ſɭэ ֭ſɭэ , ꞙɭı , ſɭɹ ſןᴜ 📃 ⟫
/* ſɭэ ֭ſɭэ , ſɭɹ ſןᴜ , ꞙɭı , ֭ſɭэ ſɭw }ʃꞇ , ſɭɹ ſɟꞇ ʃɔ ,
    @param sekcioj ( Sekcio [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı , ɭʃᴜ ſɭᴜƽ ,
    @param sahakani ( number ) - ſɭэ ſɭᴜ , ꞙɭı , ꞙɭı ,
@returns raqa ( function ) - ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭɿ , ſɭɹ ſןᴜ , ꞙɭɿ , */
function kf2Pozician(
  sekcioj: readonly Sekcio[],
  sahakani: number
): ( s: number ) => { x: number; z: number; latX: number; latZ: number } {
  return ( s: number ) => {
    const sek = sekcioj.length === 0 ? null : sekcioj[ 0 ];
    if ( !sek ) return { x: 0, z: 0, latX: 0, latZ: 0 };
    let k = 0;
    while ( k < sekcioj.length - 1 && s > sekcioj[ k ].starto + sekcioj[ k ].sahakani ) k++;
    const nuna = sekcioj[ k ];
    const t = Math.max( 0, Math.min( 1, ( Math.max( 0, Math.min(sahakani, s) ) - nuna.starto ) / nuna.sahakani ));
    const ndx = nuna.dx / nuna.sahakani, ndz = nuna.dz / nuna.sahakani;
    return { x: nuna.ax + nuna.dx * t, z: nuna.az + nuna.dz * t, latX: -ndz, latZ: ndx };
  };
}

// ⟪ ı],ᴜ ֭ſɭᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı 📏 ⟫
/* ı],ᴜ ֭ſɭᴜ , ֭ſɭэ ſɭэ , ſןᴜ ſᶘɹ , ꞙɭı , ꞙɭɿ , ɭʃɹ ʃᴜ }ʃw ,
    @param hatskek2 ( number [ ] ) - j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı ,
    @param fenestro ( number ) - ɭʃɹ ʃᴜ }ʃw , ſɭэ ſɭ,w , ꞙɭı ,
@returns hatskek2 ( number [ ] ) - j͑ʃᴜ ſɭ,w , ı],ᴜ ֭ſɭᴜ , ꞙɭı , */
function glatigiValojn( hatskek2: readonly number[], fenestro: number ): number[] {
  const n = hatskek2.length;
  if ( n < 0o3 || fenestro < 0o1 ) return [ ...hatskek2 ];
  const tseuni: number[] = [];
  // ⟨ ſɟɹ ɭʃᴜ ſɭɹ , ꞙɭı 📏 ⟩ , ɭʃɹ ʃᴜ }ʃw , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭɿ ,
  // ı],ᴜ ֭ſɭᴜ , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭɿ , ſɭэ ֭ſɭэ , ꞙɭı , ſɭэ ſɭᴜ ,
  // ſɭɜ ſɭ,w , ꞙɭı , ſɟɹ ɭʃᴜ ſɭɹ , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭı ,
  // j͑ʃ'ɔ ſɭɹ ſȷɔ , ꞙɭɿ , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , ꞙɭɿ , 📃 ⟩
  const bakaweKatoma = new Float64Array(0o2 * fenestro + 0o1);
  for ( let i = 0; i < n; i++ ) {
    // ⟨ ɭʃɹ ʃᴜ }ʃw , ſȷƽᴜ ʃɔ , 📏 ⟩ , ɭʃɹ ʃᴜ }ʃw , ſɭɹ ſןᴜ , ꞙɭı , ꞙɭɿ ,
    // ꞙɭı , ɭʃɹ ʃᴜ }ʃw , j͑ʃɜ j͑ʃƨɹ , j͑ʃᴜ ſɭ,w , ſɭɹ ſןᴜ , ꞙɭı ,
    // ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ſɭɜ ſɭᴜ , ꞙɭı , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı , 📃 ⟩
    const p2somani = Math.min(fenestro, i, n - 0o1 - i);
    const vem2 = 0o2 * p2somani + 0o1;
    for ( let j = 0; j < vem2; j++ ) bakaweKatoma[ j ] = hatskek2[ i - p2somani + j ];
    const x2pa = bakaweKatoma.subarray(0, vem2);
    x2pa.sort();
    tseuni.push(x2pa[ vem2 >> 1 ]);
  }
  return tseuni;
}

// ⟪ ſןw ſɭᴜƴ , ſןɔ˞ᴜƴ , 📏 ⟫
/* ſןɔ˞ᴜƴ , ſɭэ ſɭ,w , ꞙɭı , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭɿ , ſɭɜ ſɭ,w , ı],ᴜ ֭ſɭᴜ ,
    @param hatskek2 ( number [ ] ) - j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı ,
    @param h6kuni ( number ) - ֭ſɭэ ſɭw }ʃꞇ , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı ,
@returns hatskek2 ( number [ ] ) - j͑ʃᴜ ſɭ,w , ſןw ſɭᴜƴ , ꞙɭı , */
function kf2Cxramgon( hatskek2: readonly number[], h6kuni: number ): number[] {
  const tseuni = [ ...hatskek2 ];
  // ⟨ ֭ſɭᴜ ſ͔ɭᴜ , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ſןɔ˞ᴜƴ , ꞙɭı , ֭ſɭэ ſɭw }ʃꞇ , ꞙɭı ,
  // ſɭэ ֭ſɭэ , ſɟᴜ ſןᴜ ɭʃэ , ꞙɭɔ , ʃw ſɭɹ , ſןᴜ ſᶘɹ , ꞙɭɿ ,
  const risero = STUPA_RISERO * ( h6kuni / NIVELA_STUPA_DISTO );
  for ( let i = 1; i < tseuni.length; i++ )
    tseuni[ i ] = Math.max(tseuni[ i ], tseuni[ i - 0o1 ] - risero);
  for ( let i = tseuni.length - 0o2; i >= 0; i-- )
    tseuni[ i ] = Math.max(tseuni[ i ], tseuni[ i + 0o1 ] - risero);
  return tseuni;
}

// ⟪ ſןɔ˞ᴜƴ , ſɭэ ſɭ,w , 📏 ⟫
/* ſןɔ˞ᴜƴ , j͑ʃᴜ ſɭ,w , ꞙɭı , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , ſɭэ ֭ſɭэ , ſɭэ ſɭ,w ,
    ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭɔ , ſןɔ˞ᴜƴ , ꞙɭı , ֭ſɭэ ſɭw }ʃꞇ , ꞙɭı ,
    ſɭэ ֭ſɭэ , ꞙɭı , ֭ſɭэ ſɭэ , ſןᴜ ſᶘɹ , ꞙɭı , ꞙɭı ,
    @param celoj ( number [ ] ) - j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı ,
    @param h6kuni ( number ) - ֭ſɭэ ſɭw }ʃꞇ , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı ,
@returns hal6da ( number [ ] ) - j͑ʃᴜ ſɭ,w , ſןɔ˞ᴜƴ , ꞙɭı , */
function kf2Treadojn( celoj: readonly number[], h6kuni: number ): number[] {
  const hal6da: number[] = [];
  if ( celoj.length === 0 ) return hal6da;
  const konfirmo = Math.max(1, Math.round(NIVELA_KONFIRMO / h6kuni));
  // ⟨ ſןɔ˞ᴜƴ , ֭ſɭэ ſɭw }ʃꞇ , 🦶 ⟩ , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı ,
  // ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ſɟᴜ ſןᴜ ɭʃэ , ꞙɭɔ , ſןɔ˞ᴜƴ , ꞙɭı ,
  // ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , ꞙɭı / ꞙɭɿ , ſɭэ ֭ſɭэ , ſɟᴜ ſןᴜ ɭʃэ , ꞙɭı ,
  const pasxojInterStupoj = Math.max(1, Math.round(NIVELA_STUPA_DISTO / h6kuni));
  let vem2 = celoj[ 0 ];
  let lastaStupo = -Infinity;
  for ( let i = 0; i < celoj.length; i++ ) {
    if ( celoj[ i ] > vem2 ) {
      // ⟨ ſןɔ˞ᴜƴ , ꞙɭı , 📏 ⟩ , ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭı ,
      // ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭɿ , ꞙɭц , ſןɔ˞ᴜƴ , ꞙɭı ,
      // ſɭэ ֭ſɭэ , ſןɔ˞ᴜƴ , ꞙɭı , ſɟᴜ ſןᴜ ɭʃэ , ſןɔ˞ᴜƴ , ſɭэ ſɭ,w , ꞙɭı ,
      // ſɭɜ ſɭ,w , ſןɔ˞ᴜƴ , ꞙɭı , ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭɔ ,
      // ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭɿ , ꞙɭı , 📃 ⟩
      if ( i - lastaStupo >= pasxojInterStupoj ) {
        vem2 = Math.min(celoj[ i ], vem2 + STUPA_RISERO);
        lastaStupo = i;
      }
    } else if ( celoj[ i ] <= vem2 - STUPA_RISERO && i - lastaStupo >= pasxojInterStupoj ) {
      // ⟨ ſɭэ ֭ſɭэ , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , 📏 ⟩ , ſןᶗ‹ɔⅎ ᶘɜ , ſɭэ ֭ſɭэ , ꞙɭı ,
      // j͑ʃᴜ ſɭ,w , ꞙɭɿ , ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı ,
      // ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭɿ , ꞙɭı ,
      // ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭɿ , ſɭɜ ſɭ,w , ꞙɭı , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı ,
      // ֭ſɭэ ſɭэ , ꞙɭı , j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭɿ , 📃 ⟩
      let superaj = 0, vem2 = 0;
      for ( let j = i + 0o1; j <= Math.min(celoj.length - 0o1, i + konfirmo); j++ ) {
        vem2++;
        if ( celoj[ j ] > vem2 - STUPA_RISERO ) superaj++;
      }
      if ( superaj * 0o2 <= vem2 ) {
        vem2 = Math.max(celoj[ i ], vem2 - STUPA_RISERO);
        lastaStupo = i;
      }
    }
    hal6da.push(vem2);
  }
  return hal6da;
}

// ⟪ ſɭэ ֭ſɭэ , ſɭɹ ſןᴜ , j͑ʃᴜ ſɭ,w , 📏 ⟫
/* ſןɔ˞ᴜƴ , j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , ſɭɹ ſןᴜ , ꞙɭɿ , ſɭᴜ ſןᴜ , ꞙɭı ,
    ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ſɭᴜ ſןᴜ , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı ,
    ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ſɭɜ ſɭᴜ , ꞙɭɔ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɿ ,
    ſןɔ˞ᴜƴ , ꞙɭı , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭɿ , ꞙɭı ,
    ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭɔ , ſןᶗ‹ɔⅎ ᶘɜ , ſɭэ ſɭ,w , ꞙɭı ,
    @param hal6da ( number [ ] ) - j͑ʃᴜ ſɭ,w , ſןɔ˞ᴜƴ , ꞙɭı ,
    @param celoj ( number [ ] ) - j͑ʃᴜ ſɭ,w , ſɭɜ ſɭ,w , ꞙɭı ,
    @param haxekuxa ( number [ ] ) - ſɭэ ֭ſɭэ , ֭ſɭэ ſɭw }ʃꞇ , ꞙɭı ,
    @param sahakani ( number ) - ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ , ꞙɭı , */
function kunveniguFinojn( hal6da: number[], celoj: readonly number[], haxekuxa: readonly number[], sahakani: number ): void {
  if ( hal6da.length < 0o3 ) return;
  const fina = celoj[ celoj.length - 0o1 ];
  const komenca = celoj[ 0 ];
  for ( let i = 0; i < hal6da.length; i++ ) {
    const deStarto = Math.ceil(haxekuxa[ i ] / NIVELA_STUPA_DISTO);
    const deFino = Math.ceil(( sahakani - haxekuxa[ i ] ) / NIVELA_STUPA_DISTO);
    const limo = Math.min(komenca + deStarto * STUPA_RISERO, fina + deFino * STUPA_RISERO);
    if ( hal6da[ i ] > limo ) hal6da[ i ] = Math.max(celoj[ i ], limo);
  }
}

// ⟪ ֭ſɭэ ſɭэ , j͑ʃ'ɔ ɭʃɔ ŋᷠɹ 📏 ⟫
/* ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ֭ſɭэ ſɭэ , ſɭɜ ſɭ,w , j͑ʃ'ɔ ɭʃɔ ſןɹ ,
    @param hatskek2 ( number [ ] ) - j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı ,
    @param fenestro ( number ) - ɭʃɜᴜ̩ ɭʃɔ , ֭ſɭэ ſɭw }ʃꞇ , ꞙɭı ,
@returns hatskek2 ( number [ ] ) - j͑ʃᴜ ſɭ,w , j͑ʃ'ɔ ɭʃɔ ŋᷠɹ , ꞙɭı , */
function pleniguDipojn( hatskek2: readonly number[], fenestro: number ): number[] {
  const n = hatskek2.length;
  const tseuni = [ ...hatskek2 ];
  if ( n < 0o3 || fenestro < 0o1 ) return tseuni;
  for ( let i = 0; i < n; i++ ) {
    // ⟨ ɭʃɜᴜ̩ ɭʃɔ , ꞙɭɿ , 📏 ⟩ , j͑ʃᴜ ſɭ,w , ꞙɭı , ɭʃɹ ʃᴜ }ʃw , ꞙɭı ,
    let maldekstra = -Infinity, dekstra = -Infinity;
    for ( let j = Math.max(0, i - fenestro); j < i; j++ )
      maldekstra = Math.max(maldekstra, hatskek2[ j ]);
    for ( let j = i + 0o1; j <= Math.min(n - 0o1, i + fenestro); j++ )
      dekstra = Math.max(dekstra, hatskek2[ j ]);
    // ⟨ }ʃɹƽ , j͑ʃ'ɔ ɭʃɔ ŋᷠɹ , 📃 ⟩ , ɭʃɜᴜ̩ ɭʃɔ , ꞙɭɿ , ſɭɜ ſɭ,w , ꞙɭı ,
    const limo = Math.min(maldekstra, dekstra);
    if ( limo <= tseuni[ i ] ) continue;
    tseuni[ i ] = Math.min(tseuni[ i ] + NIVELA_PLENIGO, limo);
  }
  return tseuni;
}

// ⟪ j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ 📏 ⟫
/* j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , ſɭɜ ſɭ,w , ֭ſɭᴜ ſ͔ɭᴜ , ſᶘᴜ j͑ʃᴜ ,
    @param celoj ( number [ ] ) - j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı ,
    @param h6kuni ( number ) - ֭ſɭэ ſɭw }ʃꞇ , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı ,
@returns celoj ( number [ ] ) - j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭɿ , */
function celojDeProfilo( celoj: readonly number[], h6kuni: number ): number[] {
  const fenestro = Math.max(0o1, Math.round(NIVELA_PLENIGA_DISTO / h6kuni));
  return pleniguDipojn(celoj.map(l6da => surGrid(l6da)), fenestro);
}

// ⟪ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ⟅ ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
export interface NivelaVeb6kek {
  x: number;
  z: number;
  // ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
  l6da: number;
  // ⟨ j͑ʃᴜ ſɭ,w , ɭʃᴜ ŋᷠᴜ , ⟅ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
  // ɭʃᴜ ŋᷠᴜ , ꞙɭı , j͑ʃᴜ ſɭ,w , ꞙɭı , ſןᶗ‹ɔⅎ ᶘɜ , ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
  // ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ſɭɜ ſɭ,w , ꞙɭɿ , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı , 📃 ⟩
  vem2?: PlataVem2;
}

/* ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭı ,
    @param k ( NivelaVeb6kek ) - ſɭᴜ ſןᴜ , ꞙɭı ,
    @param px, pz ( number ) - ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭɿ ,
    @param d ( number ) - ſɭᴜ ſןᴜ , ֭ſɭэ ſɭw }ʃꞇ , ꞙɭı ,
@returns l6da ( number ) - ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , */
function kunigaAltoCxe(k: NivelaVeb6kek, px: number, pz: number, d: number): number {
  if ( !k.vem2 || k.vem2.hal6da.length === 0 ) return k.l6da;
  return plataAltoCxe(k.vem2, Math.atan2(pz - k.z, px - k.x), d);
}

// ⟪ j͑ʃᴜ ſɭ,w , ſןɔ˞ᴜƴ , 📏 ⟫
/* j͑ʃᴜ ſɭ,w , ſןɔ˞ᴜƴ , ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ , ꞙɭı ,
    @param n2k ( [ number , number ] [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı , ſɭɹ ſןᴜ ,
    @param p2somani ( number ) - ſɭэ ֭ſɭэ , ſɭэ ſɭ,w , ꞙɭı ,
    @param heightFn ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭı ,
    @param akvaFn ( function , optional ) - ſᶘᴜ j͑ʃᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
    @param haveb6kek ( NivelaVeb6kek [ ] , optional ) - ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
@returns s2qena ( NivelaProfilo ) - j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , */
// ⟪ ſɭɜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ɭl̀ɜ ſ͕ɭᴜ 📏 ⟫
// ⟨ ſɭɜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , 📃 ⟩ , ſɭэ ֭ſɭэ , ꞙɭɿ ,
// j͑ʃᴜ ſɭ,w , ſɭᴜ ſןᴜ , ꞙɭı , j͑ʃᴜ ſɭ,w , ꞙɭɿ , ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
// ſɭɜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ , ꞙɭı , ʃw ſɭɹ ,
// ſןᶗ‹ɔⅎ ᶘɜ , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭɿ , ɭl̀ɜ ſ͕ɭᴜ , ꞙɭı , ꞙɭɿ , 📃 ⟩
interface NivelaSpecimeno {
  p2somani: number;
  heightFn: ( x: number, z: number ) => number;
  akvaFn?: ( x: number, z: number ) => number;
  nombro: number;
  h6kuni: number;
  sahakani: number;
  centra: number[];
  randoMaks: number[];
  haxekuxa: number[];
  centraj: number[];
  glataj: number[];
  celojTaj: number[];
  punktojCxe: { x: number; z: number }[];
}

const SPECIMENA_MEMORO =
  new WeakMap<readonly ( readonly [ number, number ] )[], NivelaSpecimeno>();

/* ſɭɜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ſɭэ ֭ſɭэ , ſןw ſɭᴜƴ , ꞙɭı , ⟅ j͑ʃɜ j͑ʃƨɹ ,
    @param n2k ( [ number , number ] [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı , ſɭɹ ſןᴜ ,
    @param p2somani ( number ) - ſɭэ ֭ſɭэ , ſɭэ ſɭ,w , ꞙɭı ,
    @param heightFn ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭı ,
    @param akvaFn ( function , optional ) - ſᶘᴜ j͑ʃᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
@returns specimeno ( NivelaSpecimeno | null ) - null , ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ , ꞙɭɔ , */
function specimeniTeron(
  n2k: readonly ( readonly [ number, number ] )[],
  p2somani: number,
  heightFn: ( x: number, z: number ) => number,
  akvaFn?: ( x: number, z: number ) => number
): NivelaSpecimeno | null {
  const konservita = SPECIMENA_MEMORO.get(n2k);
  if ( konservita && konservita.p2somani === p2somani
    && konservita.heightFn === heightFn && konservita.akvaFn === akvaFn )
    return konservita;
  const sekcioj: Sekcio[] = [];
  let sahakani = 0;
  for ( let i = 0; i < n2k.length - 1; i++ ) {
    const [ ax, az ] = n2k[ i ];
    const [ bx, bz ] = n2k[ i + 0o1 ];
    const dx = bx - ax, dz = bz - az;
    const longo2 = Math.hypot(dx, dz);
    if ( longo2 < 0o1/0o100 ) continue;
    sekcioj.push({ ax, az, dx, dz, sahakani: longo2, starto: sahakani });
    sahakani += longo2;
  }
  if ( sekcioj.length === 0 || sahakani < 0o1/0o100 ) return null;
  const raqa = kf2Pozician(sekcioj, sahakani);
  const nombro = Math.max(1, Math.ceil(sahakani / NIVELA_PASO));
  const h6kuni = sahakani / nombro;
  // ⟨ ſȷƽᴜ ʃɔ , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı 📏 ⟩ , }ʃɹƽ , ſɭᴜ ſɭˬꞇƽ , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı ,
  // ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , ſɭɜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ſɭɜ ſɭ,w , ꞙɭı , 📃 ⟩
  const c2qjOfsetoj: ( readonly [ number, number ] )[] = [];
  for ( const radio of RONDAJ_RADIOJ ) {
    const flanka = p2somani * radio;
    for ( let i = 0; i < RONDAJ; i++ ) {
      const tafkaq = i * Math.PI * 0o2 / RONDAJ;
      c2qjOfsetoj.push([ Math.cos(tafkaq) * flanka, Math.sin(tafkaq) * flanka ]);
    }
  }
  // ⟨ j͑ʃɜ j͑ʃƨɹ , ſɭэ ֭ſɭэ , ꞙɭı , ⟅ ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭı ,
  // j͑ʃᴜ ſɭ,w , ſןw ſɭᴜƴ , ꞙɭɿ , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭɔ , 📃 ⟩
  const centra: number[] = [];
  const randoj: number[] = [];
  const randoMaks: number[] = [];
  const haxekuxa: number[] = [];
  for ( let i = 0; i <= nombro; i++ ) {
    const s = i * h6kuni;
    let sost2 = -Infinity, pukaz = -Infinity;
    let randoSumo = 0, randoNombro = 0, randoPlej = -Infinity;
    for ( const lauxa of LAUXAJ ) {
      const p = raqa(s + lauxa * h6kuni);
      sost2 = Math.max(sost2, heightFn(p.x, p.z));
      // ⟨ ſȷƽᴜ ʃɔ , }ʃɹƽ , ꞙɭı , ⟅ ſɭэ ֭ſɭэ , ꞙɭɿ , ſɭɜ ſɭ,w , ꞙɭı , 📃 ⟩
      // ⟨ j͑ʃɜ j͑ʃƨɹ , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ſȷƽᴜ ʃɔ , ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭı ,
      // ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
      // ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭɜ ſɭ,w ,
      // j͑ʃɜ j͑ʃƨɹ , ſɭɜ ſɭ,w , ⟅ ſɭɜ ſɭ,w , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭı , 📃 ⟩
      for ( const [ ofsX, ofsZ ] of c2qjOfsetoj ) {
        const tero = heightFn(p.x + ofsX, p.z + ofsZ);
        randoSumo += tero;
        randoNombro++;
        if ( tero > randoPlej ) randoPlej = tero;
      }
    }
    pukaz = randoNombro > 0 ? randoSumo / randoNombro : sost2;
    centra.push(sost2);
    randoj.push(pukaz);
    randoMaks.push(randoPlej);
    haxekuxa.push(s);
  }
  const fenestro = Math.max(0, Math.round(NIVELA_GLATIGO / h6kuni));
  // ⟨ j͑ʃᴜ ſɭ,w , ⟅ ſןw ſɭᴜƴ , ı],ᴜ ֭ſɭᴜ , ſɭэ ֭ſɭэ , j͑ʃɜ j͑ʃƨɹ , ſɭɜ ſɭ,w , 📃 ⟩
  // ⟨ j͑ʃɜ j͑ʃƨɹ , ı],ᴜ ֭ſɭᴜ , 📃 ⟩ , ſɭɜ ſɭ,w , ſןᴜ ſᶘɹ , ꞙɭı ,
  // ſɭɜ ſɭ,w , ſןᴜ ſᶘɹ , ſןᶗ‹ɔⅎ ᶘɜ , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
  // ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ſɭэ ſɭ,w , ſןɔ˞ᴜƴ , ꞙɭı , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ,
  // ſןᴜ ſᶘɹ , ſןɔ˞ᴜƴ , ſɭэ ֭ſɭэ , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭı , 📃 ⟩
  const centraj = glatigiValojn(centra, fenestro);
  const glataj = glatigiValojn(randoj, fenestro);
  const celojTaj: number[] = [];
  for ( let i = 0; i < glataj.length; i++ ) {
    let lowak = centraj[ i ];
    if ( centra[ i ] - centraj[ i ] > STUPA_RISERO ) lowak = centra[ i ];
    let celo = Math.max(glataj[ i ], lowak) + VOJA_SUPRO_LEVIGXO;
    const p = raqa(haxekuxa[ i ]);
    if ( akvaFn ) {
      const akvo = akvaFn(p.x, p.z);
      if ( akvo > -Infinity ) celo = Math.max(celo, akvo);
    }
    celojTaj.push(celo);
  }
  const specimeno: NivelaSpecimeno = { p2somani, heightFn, akvaFn, nombro, h6kuni, sahakani,
    centra, randoMaks, haxekuxa, centraj, glataj, celojTaj,
    punktojCxe: haxekuxa.map(s => raqa(s)) };
  SPECIMENA_MEMORO.set(n2k, specimeno);
  return specimeno;
}

export function kf2NivelanProfilon(
  n2k: readonly ( readonly [ number, number ] )[],
  p2somani: number,
  heightFn: ( x: number, z: number ) => number,
  akvaFn?: ( x: number, z: number ) => number,
  haveb6kek?: readonly NivelaVeb6kek[]
): NivelaProfilo {
  const specimeno = specimeniTeron(n2k, p2somani, heightFn, akvaFn);
  if ( !specimeno )
    return { hal6da: [ 0 ], celoj: [ 0 ], haxekuxa: [ 0 ], sahakani: 0,
      centraj: [ 0 ], glataj: [ 0 ], altoCxe: () => 0 };
  const { nombro, h6kuni, sahakani, centra, randoMaks, haxekuxa,
    centraj, glataj, celojTaj, punktojCxe } = specimeno;
  // ⟨ j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , ⟅ ſןɔ˞ᴜƴ , ſɭɜʞ , ꞙɭı , 📃 ⟩
  // ⟨ ֭ſɭэ ſɭэ , j͑ʃ'ɔ ɭʃɔ ſןɹ , ſןɔ˞ᴜƴ , ꞙɭı , 📃 ⟩ , ſɭэ ֭ſɭэ ,
  // }ʃɹƽ , ſɭɜ ſɭᴜ , j͑ʃ'ɔ ɭʃɔ ſןɹ , ſɭɜʞ , ſɭɜ ſɭ,w , ꞙɭı , 📃 ⟩
  const celoj = celojDeProfilo(celojTaj, h6kuni);
  // ⟨ ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭı , 📏 ⟩ , ſןɔ˞ᴜƴ , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ ,
  // j͑ʃᴜ ſɭ,w , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı , ꞙɭı , 📃 ⟩
  const proksimaj: NivelaVeb6kek[] = haveb6kek && haveb6kek.length
    ? haveb6kek.filter(k => punktojCxe.some(p =>
      Math.hypot(p.x - k.x, p.z - k.z) <= VOJA_TRUA_DUONO))
    : [];
  // ⟪ ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭɔ , 📏 ⟫
  // ⟨ ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭɔ , 📃 ⟩ ,
  // ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ſɭɜ ſɭ,w , ꞙɭɔ , ꞙɭɿɔ ,
  // ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭэ , ſןᴜ ſɭᴜƴ , ſɭэ ֭ſɭэ , ꞙɭı ,
  // ſןɔ˞ᴜƴ , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı ,
  // ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭɿɔ , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w ,
  // ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭɔ , j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı ,
  // j͑ʃᴜ ſɭ,w , ſןɔ˞ᴜƴ , ꞙɭı , 📃 ⟩
  // ⟨ ſןw ſɭᴜƴ , ꞙɭɿ , ſɭɜ ſɭ,w , 📏 ⟩ , ſɭɜ ſɭ,w , ſɭэ ſɭ,w , ꞙɭı ,
  // j͑ʃᴜ ſɭ,w , ſןɔ˞ᴜƴ , ꞙɭı , ſןw ſɭᴜƴ , ſɭɜ ſɭ,w , ꞙɭɔ ,
  // ſɭэ ֭ſɭэ , j͑ʃɜ j͑ʃƨɹ , ꞙɭɿ , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
  // ⟨ ſןɔ˞ᴜƴ , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı , 📏 ⟩ , ſןɔ˞ᴜƴ , ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı ,
  // ſɭᴜ ſןᴜ , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı , ſןɔ˞ᴜƴ , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı ,
  // ſןɔ˞ᴜƴ , ꞙɭı , ֭ſɭᴜ ſ͔ɭᴜ , ſɭᴜ ſןᴜ , ſɭᴜ ſɭ,w , ꞙɭı , 📃 ⟩
  const planko = centra.map(( sost2, i ) => {
    const kozuni = surGrid(
      Math.max(sost2, randoMaks[ i ])
        + VOJA_SUPRO_LEVIGXO - VOJA_BURIAL_TOLERANCO);
    let teruni = Infinity;
    for ( const k of proksimaj ) {
      const d = Math.hypot(punktojCxe[ i ].x - k.x, punktojCxe[ i ].z - k.z);
      const ekstera = Math.max(0, d - VOJA_TRUA_DUONO);
      // ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , 📏 ⟩ , ſןɔ˞ᴜƴ , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı ,
      // ֭ſɭᴜ ſ͔ɭᴜ , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ,
      // ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭɿ , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı , 📃 ⟩
      const limo = k.l6da + VOJA_TERA_KLINO * ekstera + STUPA_RISERO;
      if ( limo < teruni ) teruni = limo;
    }
    return Number.isFinite(teruni) ? Math.min(kozuni, subGrid(teruni)) : kozuni;
  });
  for ( let i = 0; i < celoj.length; i++ )
    if ( planko[ i ] > celoj[ i ] ) celoj[ i ] = planko[ i ];
  // ⟪ ſɭᴜ ſןᴜ , ꞙɭı , j͑ʃᴜ ſɭ,w , 📏 ⟫
  // ⟨ ı],ᴜ ֭ſɭᴜ , ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
  // ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ɭʃɹ ʃᴜ }ʃw , ꞙɭɿ , ſɭэ ֭ſɭэ ,
  // ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɔ , ſןɔ˞ᴜƴ , ꞙɭı , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ,
  // ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭᴜ ſןᴜ , ſȷƽᴜ ʃɔ , ꞙɭı ,
  // ſȷƽᴜ ʃɔ , ꞙɭɿ , ſɭэ ֭ſɭэ , ֭ſɭᴜ ſ͔ɭᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
  // j͑ʃᴜ ſɭ,w , j͑ʃɜ ſɭ,ᴜ , ſןɔ˞ᴜƴ , ꞙɭı , 📃 ⟩
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭэ , ſɭэ ֭ſɭэ , ꞙɭı , 📏 ⟩ , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
  // ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɿ ,
  // ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ſɭɜ ſɭ,w , ꞙɭɿ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɿ ,
  // ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı ,
  // ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ſȷƽᴜ ʃɔ , ꞙɭı , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı , 📃 ⟩
  // ⟨ ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ſɭᴜ ſןᴜ , ꞙɭı , 📏 ⟩ , ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı ,
  // ſȷƽᴜ ʃɔ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
  // ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭɿ , ֭ſɭᴜ ſ͔ɭᴜ , ſןɔ˞ᴜƴ , ꞙɭı ,
  if ( proksimaj.length ) {
    for ( let i = 0; i < celoj.length; i++ ) {
      const p = punktojCxe[ i ];
      let psaz = -Infinity, teru = Infinity;
      for ( const k of proksimaj ) {
        const d = Math.hypot(p.x - k.x, p.z - k.z);
        const deRando = VOJA_TERA_KLINO * Math.max(0, d - VOJA_TRUA_DUONO);
        const altoK = kunigaAltoCxe(k, p.x, p.z, d);
        psaz = Math.max(psaz, altoK - deRando);
        teru = Math.min(teru, altoK + deRando);
      }
      // ⟨ j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , 📏 ⟩ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
      // j͑ʃᴜ ſɭ,w , ſɭᴜ ſןᴜ , ꞙɭı , ſןɔ˞ᴜƴ , ſɭɜʞ , ꞙɭı ,
      // ſןɔ˞ᴜƴ , ꞙɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
      // ⟨ j͑ʃᴜ ſɭ,w , ſɭэ ſɭᴜ , 📏 ⟩ , ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭı ,
      // j͑ʃᴜ ſɭ,w , ſɭᴜ ſןᴜ , ꞙɭɿ , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
      // ſןɔ˞ᴜƴ , ꞙɭı , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭɿ , 📃 ⟩
      // ⟨ ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭɔ , 📏 ⟩ , ſןɔ˞ᴜƴ , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı ,
      // ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭэ , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭɔ ,
      // ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭэ , ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭı ,
      // ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭц , ſɭɜ ſɭ,w , ſɭɜ ſɭ,w , 📃 ⟩
      // ⟨ ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
      // ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭɿ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
      // ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı ,
      // ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
      // ⟨ j͑ʃᴜ ſɭ,w , ı],ᴜ ֭ſɭᴜ , 📏 ⟩ , ſןɔ˞ᴜƴ , ꞙɭɿ ,
      // ı],ᴜ ֭ſɭᴜ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
      // ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
      // ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ſןɔ˞ᴜƴ , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı ,
      // ſɭᴜ ſןᴜ , ſ͔ɭᴜ , j͑ʃᴜ ſɭ,w , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı ,
      // j͑ʃᴜ ſɭ,w , ſןᴜ ſᶘɹ , ꞙɭɿ , j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
      const malsupra = surGrid(psaz);
      const supera = subGrid(teru);
      if ( malsupra > supera ) {
        const sost2 = ( psaz + teru ) / 0o2;
        celoj[ i ] = Number.isFinite(sost2)
          ? Math.round(sost2 / STUPA_RISERO) * STUPA_RISERO
          : celoj[ i ];
      } else {
        celoj[ i ] = Math.max(malsupra, Math.min(supera, celoj[ i ]));
      }
    }
  }
  const hal6da = kf2Treadojn(kf2Cxramgon(celoj, h6kuni).map(l6da => surGrid(l6da)), h6kuni);
  kunveniguFinojn(hal6da, celoj, haxekuxa, sahakani);
  // ⟪ ֭ſɭᴜ ſ͔ɭᴜ , ſɭᴜ ſןᴜ 📏 ⟫
  // ⟨ ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , ֭ſɭэ ſɭw }ʃꞇ , ꞙɭı ,
  // ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı ,
  // ſɭᴜ ſןᴜ , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭɿ , 📃 ⟩
  if ( proksimaj.length ) {
    for ( let i = 0; i < hal6da.length; i++ ) {
      const p = punktojCxe[ i ];
      let limo = Infinity;
      for ( const k of proksimaj ) {
        const d = Math.hypot(p.x - k.x, p.z - k.z);
        if ( d > VOJA_TRUA_DUONO + NIVELA_GLATIGO ) continue;
        const havepat6ni = Math.ceil(Math.max(0, d - VOJA_TRUA_DUONO) / NIVELA_STUPA_DISTO);
        const l = kunigaAltoCxe(k, p.x, p.z, d) + havepat6ni * STUPA_RISERO;
        if ( l < limo ) limo = l;
      }
      if ( limo < hal6da[ i ] ) hal6da[ i ] = Math.max(celoj[ i ], limo);
    }
  }
  // ⟨ j͑ʃᴜ ſɭ,w , ſןᴜ ſᶘɹ , 📏 ⟩ , ſןɔ˞ᴜƴ , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭɔ ,
  // ſɭᴜ ſןᴜ , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı , 📃 ⟩
  for ( let i = 0; i < hal6da.length; i++ )
    if ( planko[ i ] > hal6da[ i ] ) hal6da[ i ] = planko[ i ];
  // ⟨ ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭɔ , 📏 ⟩ , ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭı ,
  // ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , ֭ſɭᴜ ſ͔ɭᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
  // ſɭэ ֭ſɭэ , ſןɔ˞ᴜƴ , ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , 📃 ⟩
  const glatigitaj = kf2Cxramgon(hal6da, h6kuni);
  for ( let i = 0; i < hal6da.length; i++ ) hal6da[ i ] = glatigitaj[ i ];
  // ⟪ ֭ſɭᴜ ſ͔ɭᴜ , }ʃɹƽ , ꞙɭɔ , 📏 ⟫
  // ⟨ j͑ʃᴜ ſɭ,w , }ʃɹƽ , ſȷƽᴜ ʃɔ , 📃 ⟩ , ֭ſɭᴜ ſ͔ɭᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
  // j͑ʃᴜ ſɭ,w , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , j͑ʃᴜ ſɭ,w , }ʃɹƽ , ꞙɭı ,
  // }ʃɹƽ , ſȷƽᴜ ʃɔ , j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı ,
  // j͑ʃᴜ ſɭ,w , }ʃɹƽ , ſȷƽᴜ ʃɔ , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı ,
  // ſɭэ ֭ſɭэ , }ʃɹƽ , ſȷƽᴜ ʃɔ , ſןɔ˞ᴜƴ , ꞙɭı , 📃 ⟩
  const turnajHaxekuxa: number[] = [];
  let akumita = 0;
  for ( let k = 0; k < n2k.length - 0o1; k++ ) {
    const ax = n2k[ k ][ 0 ], az = n2k[ k ][ 1 ];
    const bx = n2k[ k + 0o1 ][ 0 ], bz = n2k[ k + 0o1 ][ 1 ];
    const l1 = Math.hypot(bx - ax, bz - az);
    if ( l1 < 0o1 / 0o1000 ) continue;
    akumita += l1;
    if ( k + 0o2 >= n2k.length ) break;
    const cx = n2k[ k + 0o2 ][ 0 ], cz = n2k[ k + 0o2 ][ 1 ];
    const l2 = Math.hypot(cx - bx, cz - bz);
    if ( l2 < 0o1 / 0o1000 ) continue;
    const u1x = ( bx - ax ) / l1, u1z = ( bz - az ) / l1;
    const u2x = ( cx - bx ) / l2, u2z = ( cz - bz ) / l2;
    const turno = Math.abs(Math.atan2(u1x * u2z - u1z * u2x,
      u1x * u2x + u1z * u2z));
    if ( turno > 0o1 / 0o20 ) turnajHaxekuxa.push(akumita);
  }
  if ( turnajHaxekuxa.length > 0 ) {
    const zono = p2somani + STUPA_RISERO;
    const originalaj = [ ...hal6da ];
    const zonoj = turnajHaxekuxa.map(sT => {
      const meza = Math.max(0, Math.min(nombro, Math.round(sT / h6kuni)));
      let a = meza, b = meza;
      while ( a > 0 && Math.abs(haxekuxa[ a - 0o1 ] - sT) <= zono ) a--;
      while ( b < nombro && Math.abs(haxekuxa[ b + 0o1 ] - sT) <= zono ) b++;
      let vem2 = originalaj[ meza ];
      for ( let i = a; i <= b; i++ ) vem2 = Math.max(vem2, planko[ i ]);
      return { a, b, vem2 };
    });
    for ( let i = 0; i < hal6da.length; i++ ) {
      let psaz = -Infinity, teru = Infinity;
      for ( const z of zonoj ) {
        const h6kuni = i < z.a ? z.a - i : i > z.b ? i - z.b : 0;
        const marĝo = h6kuni * STUPA_RISERO;
        psaz = Math.max(psaz, z.vem2 - marĝo);
        teru = Math.min(teru, z.vem2 + marĝo);
      }
      hal6da[ i ] = psaz <= teru
        ? Math.max(psaz, Math.min(teru, originalaj[ i ]))
        : originalaj[ i ];
    }
  }
  // ⟪ ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ , j͑ʃᴜ ſɭ,w , 📏 ⟫
  // ⟨ ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
  // ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ſɭɜ ſɭ,w , ꞙɭɿ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
  // ſɭɜ ſɭ,w , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı ,
  // ſɭᴜ ſןᴜ , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
  // ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ſɭɜ ſɭ,w , ſ͔ɭᴜ }ʃꞇ , ꞙɭı , 📃 ⟩
  if ( proksimaj.length ) {
    for ( let i = 0; i < hal6da.length; i++ ) {
      const p = punktojCxe[ i ];
      let plejMalgranda = Infinity, plata = NaN;
      for ( const k of proksimaj ) {
        const d = Math.hypot(p.x - k.x, p.z - k.z);
        if ( d <= VOJA_TRUA_DUONO && d < plejMalgranda ) {
          plejMalgranda = d;
          plata = k.l6da;
        }
      }
      if ( Number.isFinite(plata) ) hal6da[ i ] = plata;
    }
  }
  const altoCxe = ( s: number ): number => {
    const i = Math.max(0, Math.min(nombro, Math.round(s / h6kuni)));
    return hal6da[ i ];
  };
  return { hal6da, celoj, haxekuxa, sahakani, centraj, glataj, altoCxe };
}

// ⟪ ſɭᴜ ſןᴜ , ſɭэ ſɭ,w , ſ͕ɭɜ ı],ᴜ 📦 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ſɭэ ɭʃᴜ , ꞙɭɿ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ſɭᴜ ſןᴜ , ſɭэ ſɭ,w , j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭᴜ ſןᴜ , ſɭɜ ſɭ,w , ꞙɭı , 📃 ⟩
export interface UnuformaTreado {
  s0: number;
  s1: number;
  altoA: number;
  altoB: number;
}

// ⟪ ſɭᴜ ſןᴜ , ֭ſɭэ ſɭэ , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ſɭэ ſɭ,w , ꞙɭı , ֭ſɭᴜ ſ͔ɭᴜ , ſɭᴜ ſןᴜ , ꞙɭɔ ,
// ſɭᴜ ſןᴜ , ſɭэ ſɭ,w , ſɭэ ֭ſɭэ , ֭ſɭᴜ ſ͔ɭᴜ , j͑ʃɜ j͑ʃƨɹ , ꞙɭı , 📃 ⟩
export interface K6h6Truo {
  s0: number;
  s1: number;
}

// ⟪ ſ͔ɭᴜ }ʃꞇ , ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ , 📏 ⟫
/* ſ͔ɭᴜ }ʃꞇ , ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭı ,
    @param s2qena ( NivelaProfilo ) - ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
    @param truoj ( K6h6Truo [ ] ) - ſɭᴜ ſןᴜ , ֭ſɭэ ſɭэ , ꞙɭı ,
@returns treadoj ( UnuformaTreado [ ] ) - ſɭᴜ ſןᴜ , ֭ſɭᴜ ſ͔ɭᴜ , ꞙɭɿ , */
// ⟨ ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ , 📃 ⟩ , ſɭᴜ ſןᴜ , ſ͔ɭᴜ }ʃꞇ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ɭʃᴜ ſɭᴜƽ , ſɭᴜ ſןᴜ , ֭ſɭэ ſɭэ , ſɭэ ſɭᴜ , ꞙɭı ,
// ɭʃᴜ ſɭᴜƽ , ſɭэ ſɭᴜ , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭı , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ſןɔ˞ᴜƴ , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı , ſ͔ɭᴜ }ʃꞇ , ꞙɭı ,
// j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭэ ſɭᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , ɭʃᴜ ſɭᴜƽ , j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
// ⟨ ſɭэ ſɭᴜ , ſןᴜ ſᶘɹ , 📏 ⟩ , ſןᶗ‹ɔⅎ ᶘɜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ֭ſɭᴜ ſ͔ɭᴜ , ı],ᴜ ֭ſɭᴜ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ı],ᴜ ֭ſɭᴜ , ꞙɭı , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ֭ſɭᴜ ſ͔ɭᴜ , ꞙɭı , ꞙɭɔ , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , ſןw ſɭᴜƴ , 📏 ⟩ , ֭ſɭᴜ ſ͔ɭᴜ , ſɭᴜ ſןᴜ , ꞙɭɔ ,
// ſɭᴜ ſןᴜ , ſןw ſɭᴜƴ , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟩
export function kf2UnuformajnTreadojn( s2qena: NivelaProfilo,
  truoj: readonly K6h6Truo[] = [] ): UnuformaTreado[] {
  const treadoj: UnuformaTreado[] = [];
  const { hal6da, haxekuxa, sahakani } = s2qena;
  const eta = 0o1/0o1000;
  if ( hal6da.length === 0 || sahakani <= eta ) return treadoj;
  const tlunakani = ( s0: number, s1: number, altoA: number, altoB: number ): void => {
    if ( s1 - s0 > eta ) treadoj.push({ s0, s1, altoA, altoB });
  };
  // ⟨ ſɭᴜ ſןᴜ , ֭ſɭэ ſɭэ , ꞙɭɿ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ɭʃᴜ ſɭᴜƽ , ꞙɭɿ ,
  const ordigitaj = truoj
    .filter(t => t.s1 > 0 && t.s0 < sahakani)
    .map(t => ({ s0: Math.max(0, t.s0), s1: Math.min(sahakani, t.s1) }))
    .sort(( p, q ) => p.s0 - q.s0);
  const kunfanditaj: K6h6Truo[] = [];
  for ( const t of ordigitaj ) {
    const z2hak = kunfanditaj[ kunfanditaj.length - 0o1 ];
    if ( z2hak && t.s0 <= z2hak.s1 + eta ) z2hak.s1 = Math.max(z2hak.s1, t.s1);
    else kunfanditaj.push({ ...t });
  }
  const eliroj = kunfanditaj.map(t => t.s1);
  let lastaFino = 0;
  let vem2 = hal6da[ 0 ];
  for ( let i = 1; i < hal6da.length; i++ ) {
    const fala = hal6da[ i ] - vem2;
    if ( Math.abs( fala ) < eta ) { vem2 = hal6da[ i ]; continue; }
    let b = Math.min(sahakani, haxekuxa[ i ]);
    // ⟨ ſɭᴜ ſןᴜ , ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
    // ſɭᴜ ſןᴜ , ſɭɜ ſɭ,w , ꞙɭɔ , ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɔ ,
    // ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı ,
    // ſɭᴜ ſןᴜ , ſןw ſɭᴜƴ , ꞙɭı , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
    for ( const t of kunfanditaj )
      if ( b > t.s0 + eta && b < t.s1 - eta ) { b = t.s0; break; }
    const kuro = rampaKuro( fala );
    let limo = lastaFino;
    for ( const s1 of eliroj )
      if ( s1 < b - eta ) limo = Math.max(limo, s1);
    const saxeni = Math.max( limo, b - kuro );
    const tlakakani = Math.max( b, saxeni + kuro );
    tlunakani( lastaFino, saxeni, vem2, vem2 );
    tlunakani( saxeni, tlakakani, vem2, hal6da[ i ] );
    lastaFino = tlakakani;
    vem2 = hal6da[ i ];
  }
  tlunakani( lastaFino, sahakani, vem2, vem2 );
  return treadoj;
}
