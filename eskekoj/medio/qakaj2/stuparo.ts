// ≺⧼ j͑ʃɔ ſɟᴜ ſןᴜ ɭʃэ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ j͑ʃᴜꞇ ʌ ֭ſɭᴜ ſ͔ɭᴜ 📐 ⧽≻
import { STUPA_RISERO, VOJA_SUPRO_LEVIGXO } from "../hak6h6/havecax2l.js";

// ⟪ ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı 📏 ⟫
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ſɭᴜ ſןᴜ , ⟅ ſɭᴜ ſןᴜ , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩

// ⟪ ſןɔ˞ᴜƴ , }ʃɹƽ 📃 ⟫
/* ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param saxeni ( [ number , number ] ) - ꞙɭɔ , ꞙɭı ,
    @param tlakakani ( [ number , number ] ) - ꞙɭı , ꞙɭı ,
    @param nombro ( number ) - ꞙɭı , ꞙɭı ,
@returns n2k ( [ number , number ] [ ] ) - }ʃɹƽ , nombro + ꞙɭı */
export function kf2StuparajnPunktojn(
  saxeni: readonly [ number, number ],
  tlakakani: readonly [ number, number ],
  nombro: number
): [ number, number ][] {
  const havepat6ni = Math.max(1, Math.round(nombro));
  const n2k: [ number, number ][] = [];
  for ( let i = 0; i <= havepat6ni; i++ ) {
    const t = i / havepat6ni;
    n2k.push([ saxeni[0] + ( tlakakani[0] - saxeni[0] ) * t,
      saxeni[1] + ( tlakakani[1] - saxeni[1] ) * t ]);
  }
  return n2k;
}

// ⟪ ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı 📏 ⟫
/* ꞙɭı , ꞙɭı , ꞙɭı , STUPA_RISERO ,
    @param falto ( number ) - ꞙɭı , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı ,
@returns nombro ( number ) - ꞙɭı , ꞙɭı , ( ꞙɭɿ , ꞙɭɔ , ꞙɭı ) */
// ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function kalkuliStupanNombron( falto: number ): number {
  return Math.max( 0o2, Math.ceil( falto / STUPA_RISERO ) + 0o1 );
}

// ⟪ ſןɔ˞ᴜƴ , ꞙɭı 📏 ⟫
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , 📃 ⟩ , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı ,
// ꞙɭı , j͑ʃ'ɔ ſɭɹ ſȷɔ * RISERO , ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param n2k ( [ number , number ] [ ] ) - ſןɔ˞ᴜƴ , ꞙɭı ,
    @param teru ( number ) - ꞙɭı , ꞙɭı , ꞙɭı ,
    @param fundo ( number ) - ꞙɭı , ꞙɭı , ( ꞙɭı , ꞙɭı ) ,
@returns l6da ( function ) - ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , */
// ⟪ ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , 📐 ⟫
// ⟨ ꞙɭı , kaxte.ts , krado3d.ts , ꞙɭı , ⟅ ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭɿ , ⟅ ꞙɭı , ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩

export interface DokaStuparo {
  /** ſןɔ˞ᴜƴ , }ʃɹƽ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ */
  n2k: [ number, number ][];
  /** ſןɔ˞ᴜƴ , ꞙɭı , }ʃɹƽ , */
  l6da: ( x: number, z: number ) => number;
  /** ꞙɭı , ꞙɭı , ( ꞙɭı , }ʃɹƽ , ) */
  nombro: number;
}

/* ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ſɭᴜ ſןᴜ ,
    @param saxeni ( [ number , number ] ) - ꞙɭı , ſɭᴜ ſןᴜ ,
    @param tlakakani ( [ number , number ] ) - ꞙɭı , ſɭᴜ ſןᴜ ,
    @param starto ( number ) - ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ,
    @param landejaY ( number ) - ꞙɭı , ſɭᴜ ſןᴜ ,
@returns stuparo ( DokaStuparo | null ) - null , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , */
export function kf2DokanStuparon(
  saxeni: readonly [ number, number ],
  tlakakani: readonly [ number, number ],
  starto: number,
  landejaY: number
): DokaStuparo | null {
  const falto = starto - landejaY;
  // ⟨ ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
  if ( falto <= STUPA_RISERO * 0o1/0o2 ) return null;
  // ⟨ ſןɔ˞ᴜƴ , ꞙɭɿ , ꞙɭɔ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭɿ , ⟅ 📃 ⟩
  const nombro = kalkuliStupanNombron( falto );
  const n2k = kf2StuparajnPunktojn( saxeni, tlakakani, nombro );
  // ⟨ ſɭɜ ſɭ,w , ſɭэ ſɭ,w , 📏 ⟩ , starto , landejaY , ꞙɭı ,
  // kf2StuparanAlton , ꞙɭı , ꞙɭı ,
  //   VOJA_SUPRO_LEVIGXO , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  return {
    n2k,
    nombro,
    l6da: kf2StuparanAlton( n2k, starto - VOJA_SUPRO_LEVIGXO,
      landejaY - VOJA_SUPRO_LEVIGXO ),
  };
}

export function kf2StuparanAlton(
  n2k: readonly ( readonly [ number, number ] )[],
  teru: number,
  fundo?: number
): ( x: number, z: number ) => number {
  const nombro = n2k.length - 1;
  const finaAlteco = fundo ?? teru - nombro * STUPA_RISERO;
  if ( nombro < 1 ) return () => finaAlteco;
  const [ komencoX, komencoZ ] = n2k[0];
  const [ finoX, finoZ ] = n2k[nombro];
  const diferencoX = finoX - komencoX, diferencoZ = finoZ - komencoZ;
  const longoKvadrato = diferencoX * diferencoX + diferencoZ * diferencoZ;
  if ( longoKvadrato <= 0 ) return () => finaAlteco;
  // ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , 📃 ⟩ , ſןɔ˞ᴜƴ , ꞙɭı , j͑ʃ'ɔ ſɭɹ ſȷɔ ,
  // ꞙɭı , ꞙɭı , ( j͑ʃɜ ſɭ,ᴜ - ſןɔ˞ᴜƴ ) / j͑ʃ'ɔ ſɭɹ ſȷɔ , ꞙɭı ,
  // ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭɔ , STUPA_RISERO ,
  // ꞙɭı , j͑ʃ'ɔ ſɭɹ ſȷɔ , ꞙɭı ( ꞙɭɿ , ... ) , ⟅ 📃 ⟩
  if ( fundo !== undefined ) {
    if ( nombro === 1 ) {
      return ( x: number, z: number ): number => {
        let t = ( ( x - komencoX ) * diferencoX + ( z - komencoZ ) * diferencoZ ) / longoKvadrato;
        t = Math.min(1, Math.max(0, t));
        return teru * ( 1 - t ) + finaAlteco * t;
      };
    }
    // ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , 📃 ⟩ , ( j͑ʃ'ɔ ſɭɹ ſȷɔ - ꞙɭı ) , ꞙɭı ,
    // ꞙɭı , ſןɔ˞ᴜƴ , ( ꞙɭɔ , ꞙɭı ) , ꞙɭı ,
    // ꞙɭı , j͑ʃ'ɔ ſɭɹ ſȷɔ , ꞙɭı ,
    // ꞙɭı , ꞙɭı , STUPA_RISERO , ⟅ 📃 ⟩
    const tona = ( teru - finaAlteco ) / ( nombro - 1 );
    return ( x: number, z: number ): number => {
      let t = ( ( x - komencoX ) * diferencoX + ( z - komencoZ ) * diferencoZ ) / longoKvadrato;
      t = Math.min(1, Math.max(0, t));
      const vem2 = Math.min(nombro - 1, Math.max(0, Math.floor(t * nombro)));
      return teru - vem2 * tona;
    };
  }
  // ⟨ ꞙɭɔ , ſןɔ˞ᴜƴ , ꞙɭı , STUPA_RISERO , ꞙɭı , ⟅ 📃 ⟩
  return ( x: number, z: number ): number => {
    let t = ( ( x - komencoX ) * diferencoX + ( z - komencoZ ) * diferencoZ ) / longoKvadrato;
    t = Math.min(1, Math.max(0, t));
    const vem2 = Math.min(nombro - 1, Math.max(0, Math.floor(t * nombro)));
    return teru - vem2 * STUPA_RISERO;
  };
}
