// ≺⧼ ſɭэ ֭ſɭэ ʌ ֭ſɭᴜ ɭʃɜ }ʃᴜ 🛣️ ⧽≻

import { STUPARISERO, K6H6AKMARL6DA } from "../hak6h6/havecax2l.js";

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

export function vek2feStupanNombron( fl6da: number ): number {
  return Math.max( 0o2, Math.ceil( fl6da / STUPARISERO ) + 0o1 );
}

export interface Qakaj2Stuparo {

  n2k: [ number, number ][];

  l6da: ( x: number, z: number ) => number;

  k2fe: number;
}

export function kf2Qakaj2nStuparon(
  saxeni: readonly [ number, number ],
  tlakakani: readonly [ number, number ],
  starto: number,
  landejaY: number
): Qakaj2Stuparo | null {
  const fl6da = starto - landejaY;

  if ( fl6da <= STUPARISERO * 0o1/0o2 ) return null;

  const k2fe = vek2feStupanNombron( fl6da );
  const n2k = kf2StuparajnHan2kn( saxeni, tlakakani, k2fe );

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

  if ( psaz !== undefined ) {
    if ( k2fe === 0o1 ) {
      return ( x: number, z: number ): number => {
        let t = ( ( x - saxeoX ) * diferencoX + ( z - saxeoZ ) * diferencoZ ) / sahakaniKvadrato;
        t = Math.min(0o1, Math.max(0o0, t));
        return teru * ( 0o1 - t ) + tlakakL6da * t;
      };
    }

    const tona = ( teru - tlakakL6da ) / ( k2fe - 0o1 );
    return ( x: number, z: number ): number => {
      let t = ( ( x - saxeoX ) * diferencoX + ( z - saxeoZ ) * diferencoZ ) / sahakaniKvadrato;
      t = Math.min(0o1, Math.max(0o0, t));
      const vem2 = Math.min(k2fe - 0o1, Math.max(0o0, Math.floor(t * k2fe)));
      return teru - vem2 * tona;
    };
  }

  return ( x: number, z: number ): number => {
    let t = ( ( x - saxeoX ) * diferencoX + ( z - saxeoZ ) * diferencoZ ) / sahakaniKvadrato;
    t = Math.min(0o1, Math.max(0o0, t));
    const vem2 = Math.min(k2fe - 0o1, Math.max(0o0, Math.floor(t * k2fe)));
    return teru - vem2 * STUPARISERO;
  };
}
