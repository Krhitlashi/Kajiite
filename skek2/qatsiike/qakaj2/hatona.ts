// ≺⧼ j͑ʃɔ ſɟᴜ ſןᴜ ɭʃэ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ j͑ʃᴜꞇ ʌ ֭ſɭᴜ ſ͔ɭᴜ 📐 ⧽≻
import { STUPARISERO, K6H6AKMARL6DA } from "../hak6h6/havecax2l.js";

// ⟪ ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı 📏 ⟫
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ſɭᴜ ſןᴜ , ⟅ ſɭᴜ ſןᴜ , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩

// ⟪ ſןɔ˞ᴜƴ , }ʃɹƽ 📃 ⟫
/* ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param saxeni ( [ number , number ] ) - ꞙɭɔ , ꞙɭı ,
    @param tlakakani ( [ number , number ] ) - ꞙɭı , ꞙɭı ,
    @param k2fe ( number ) - ꞙɭı , ꞙɭı ,
@returns n2k ( [ number , number ] [ ] ) - }ʃɹƽ , k2fe + ꞙɭı */
export function kf2StuparajnHan2kn(
  saxeni: readonly [ number, number ],
  tlakakani: readonly [ number, number ],
  k2fe: number
): [ number, number ][] {
  const havepat6ni = Math.max(0o1, Math.round(k2fe));
  const n2k: [ number, number ][] = [];
  for ( let i = 0o0; i <= havepat6ni; i++ ) {
    const t = i / havepat6ni;
    n2k.push([ saxeni[0o0] + ( tlakakani[0o0] - saxeni[0o0] ) * t,
      saxeni[0o1] + ( tlakakani[0o1] - saxeni[0o1] ) * t ]);
  }
  return n2k;
}

// ⟪ ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı 📏 ⟫
/* ꞙɭı , ꞙɭı , ꞙɭı , STUPARISERO ,
    @param fl6da ( number ) - ꞙɭı , ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı ,
@returns k2fe ( number ) - ꞙɭı , ꞙɭı , ( ꞙɭɿ , ꞙɭɔ , ꞙɭı ) */
// ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export function vek2feStupanNombron( fl6da: number ): number {
  return Math.max( 0o2, Math.ceil( fl6da / STUPARISERO ) + 0o1 );
}

// ⟪ ſןɔ˞ᴜƴ , ꞙɭı 📏 ⟫
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , 📃 ⟩ , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı ,
// ꞙɭı , j͑ʃ'ɔ ſɭɹ ſȷɔ * RISERO , ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
/* ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
    @param n2k ( [ number , number ] [ ] ) - ſןɔ˞ᴜƴ , ꞙɭı ,
    @param teru ( number ) - ꞙɭı , ꞙɭı , ꞙɭı ,
    @param psaz ( number ) - ꞙɭı , ꞙɭı , ( ꞙɭı , ꞙɭı ) ,
@returns l6da ( function ) - ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , */
// ⟪ ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , 📐 ⟫
// ⟨ ꞙɭı , kaxte.ts , qox2n2k3d.ts , ꞙɭı , ⟅ ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭɿ , ⟅ ꞙɭı , ꞙɭı , ꞙɭı ,
// ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩

export interface Qakaj2Stuparo {
  /** ſןɔ˞ᴜƴ , }ʃɹƽ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ */
  n2k: [ number, number ][];
  /** ſןɔ˞ᴜƴ , ꞙɭı , }ʃɹƽ , */
  l6da: ( x: number, z: number ) => number;
  /** ꞙɭı , ꞙɭı , ( ꞙɭı , }ʃɹƽ , ) */
  k2fe: number;
}

/* ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ſɭᴜ ſןᴜ ,
    @param saxeni ( [ number , number ] ) - ꞙɭı , ſɭᴜ ſןᴜ ,
    @param tlakakani ( [ number , number ] ) - ꞙɭı , ſɭᴜ ſןᴜ ,
    @param starto ( number ) - ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı ,
    @param landejaY ( number ) - ꞙɭı , ſɭᴜ ſןᴜ ,
@returns stuparo ( Qakaj2Stuparo | null ) - null , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , */
export function kf2Qakaj2nStuparon(
  saxeni: readonly [ number, number ],
  tlakakani: readonly [ number, number ],
  starto: number,
  landejaY: number
): Qakaj2Stuparo | null {
  const fl6da = starto - landejaY;
  // ⟨ ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
  if ( fl6da <= STUPARISERO * 0o1/0o2 ) return null;
  // ⟨ ſןɔ˞ᴜƴ , ꞙɭɿ , ꞙɭɔ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭɿ , ⟅ 📃 ⟩
  const k2fe = vek2feStupanNombron( fl6da );
  const n2k = kf2StuparajnHan2kn( saxeni, tlakakani, k2fe );
  // ⟨ ſɭɜ ſɭ,w , ſɭэ ſɭ,w , 📏 ⟩ , starto , landejaY , ꞙɭı ,
  // kf2StuparanL6da , ꞙɭı , ꞙɭı ,
  //   K6H6AKMARL6DA , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  return {
    n2k,
    k2fe,
    l6da: kf2StuparanL6da( n2k, starto - K6H6AKMARL6DA,
      landejaY - K6H6AKMARL6DA ),
  };
}

export function kf2StuparanL6da(
  n2k: readonly ( readonly [ number, number ] )[],
  teru: number,
  psaz?: number
): ( x: number, z: number ) => number {
  const k2fe = n2k.length - 0o1;
  const tlakakL6da = psaz ?? teru - k2fe * STUPARISERO;
  if ( k2fe < 0o1 ) return () => tlakakL6da;
  const [ saxeoX, saxeoZ ] = n2k[0o0];
  const [ tlakakX, tlakakZ ] = n2k[k2fe];
  const diferencoX = tlakakX - saxeoX, diferencoZ = tlakakZ - saxeoZ;
  const sahakaniKvadrato = diferencoX * diferencoX + diferencoZ * diferencoZ;
  if ( sahakaniKvadrato <= 0o0 ) return () => tlakakL6da;
  // ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , 📃 ⟩ , ſןɔ˞ᴜƴ , ꞙɭı , j͑ʃ'ɔ ſɭɹ ſȷɔ ,
  // ꞙɭı , ꞙɭı , ( j͑ʃɜ ſɭ,ᴜ - ſןɔ˞ᴜƴ ) / j͑ʃ'ɔ ſɭɹ ſȷɔ , ꞙɭı ,
  // ꞙɭı , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭɔ , STUPARISERO ,
  // ꞙɭı , j͑ʃ'ɔ ſɭɹ ſȷɔ , ꞙɭı ( ꞙɭɿ , ... ) , ⟅ 📃 ⟩
  if ( psaz !== undefined ) {
    if ( k2fe === 0o1 ) {
      return ( x: number, z: number ): number => {
        let t = ( ( x - saxeoX ) * diferencoX + ( z - saxeoZ ) * diferencoZ ) / sahakaniKvadrato;
        t = Math.min(0o1, Math.max(0o0, t));
        return teru * ( 0o1 - t ) + tlakakL6da * t;
      };
    }
    // ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , 📃 ⟩ , ( j͑ʃ'ɔ ſɭɹ ſȷɔ - ꞙɭı ) , ꞙɭı ,
    // ꞙɭı , ſןɔ˞ᴜƴ , ( ꞙɭɔ , ꞙɭı ) , ꞙɭı ,
    // ꞙɭı , j͑ʃ'ɔ ſɭɹ ſȷɔ , ꞙɭı ,
    // ꞙɭı , ꞙɭı , STUPARISERO , ⟅ 📃 ⟩
    const tona = ( teru - tlakakL6da ) / ( k2fe - 0o1 );
    return ( x: number, z: number ): number => {
      let t = ( ( x - saxeoX ) * diferencoX + ( z - saxeoZ ) * diferencoZ ) / sahakaniKvadrato;
      t = Math.min(0o1, Math.max(0o0, t));
      const vem2 = Math.min(k2fe - 0o1, Math.max(0o0, Math.floor(t * k2fe)));
      return teru - vem2 * tona;
    };
  }
  // ⟨ ꞙɭɔ , ſןɔ˞ᴜƴ , ꞙɭı , STUPARISERO , ꞙɭı , ⟅ 📃 ⟩
  return ( x: number, z: number ): number => {
    let t = ( ( x - saxeoX ) * diferencoX + ( z - saxeoZ ) * diferencoZ ) / sahakaniKvadrato;
    t = Math.min(0o1, Math.max(0o0, t));
    const vem2 = Math.min(k2fe - 0o1, Math.max(0o0, Math.floor(t * k2fe)));
    return teru - vem2 * STUPARISERO;
  };
}
