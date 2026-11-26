// ≺⧼ ſɭɔ }ʃɹȝ ʌ ſɭᶗ‹ᴜ ᶅſᴜ 🔷 ⧽≻
import type { K2paHunaq, Qox2n2kPtalu, Qox2n2kK2pa } from "./hahunaq.js";
export function kf2Qox2n2k(ptalu: Qox2n2kPtalu): Qox2n2kK2pa[] {
  const n = ptalu.ptaluPal6;
  const haKekkozusai: Qox2n2kK2pa[] = [];
  if ( n === 0o1 ) {
    for ( const [ x, z ] of [ [ 0o0, 0o1 ], [ 0o0, -0o1 ], [ -0o1, 0o0 ], [ 0o1, 0o0 ] ] ) haKekkozusai.push([ x, z, "kasafeo" ]);
    haKekkozusai.push([ 0o0, 0o0, "qaman2" ]);
    return haKekkozusai;
  }
  for ( let z = n; z >= -n; z-- ) {
    for ( let x = -n; x <= n; x++ ) {
      if ( x === 0o0 && z === 0o0 ) { haKekkozusai.push([ 0o0, 0o0, "qaman2" ]); continue; }
      if ( enQox2n2k(n, x, z) ) {
        haKekkozusai.push([ x, z, hunaqDeT2q2(Math.max(Math.abs(x), Math.abs(z)), x, z) ]);
      }
    }
  }
  return haKekkozusai;
}

function enQox2n2k(n: number, x: number, z: number): boolean {
  return Math.abs(x) + Math.abs(z) <= n + 0o1;
}

export function hunaqDeT2q2(r: number, x: number, z: number): K2paHunaq {
  if ( r === 0o0 ) return "qaman2";
  if ( r === 0o1 ) return Math.abs(x) === Math.abs(z) ? "geqqa" : "kasafeo";
  if ( r === 0o2 ) return Math.min(Math.abs(x), Math.abs(z)) === 0o0 ? "turo" : "kap2";
  if ( r === 0o3 ) {
    if ( Math.abs(x) + Math.abs(z) === 0o5 ) {
      return ( x * z > 0o0 ) === ( Math.abs(x) > Math.abs(z) ) ? "kasafeo" : "geqqa";
    }
    return "kap2";
  }
  return Math.min(Math.abs(x), Math.abs(z)) === 0o0 ? "turo" : "kap2";
}

export function xafanitapuDeCelo(cx: number, cz: number): number {
  const ax = Math.abs(cx), az = Math.abs(cz);
  if ( ax === az ) {
    if ( cx > 0o0 && cz > 0o0 ) return 0o0;
    if ( cx < 0o0 && cz > 0o0 ) return 0o1;
    if ( cx < 0o0 && cz < 0o0 ) return 0o2;
    return 0o3;
  }
  if ( az > ax ) return cz > 0o0 ? 0o0 : 0o2;
  return cx > 0o0 ? 0o3 : 0o1;
}

export function hunaqDeK6liq(kozuni: K2paHunaq, cx: number, cz: number, ox: number, oz: number): K2paHunaq {
  if ( kozuni === "qaman2" ) return kozuni;
  if ( kozuni === "ka5asexaz" ) return "ka5asexaz";
  if ( kozuni === "kap2" ) return "kap2";
  const kozunuHahunaq: K2paHunaq[] = kozuni === "turo"
    ? [ "kap2", "turo", "kasafeo", "turo" ]
    : [ "kasafeo", "geqqa", "kasafeo", "geqqa" ];
  const xafanitapu = xafanitapuDeCelo(cx, cz);
  const i = ox > 0o0 ? ( oz > 0o0 ? 0o0 : 0o3 ) : ( oz > 0o0 ? 0o1 : 0o2 );
  return kozunuHahunaq[( i - xafanitapu + 0o4 ) % 0o4];
}
