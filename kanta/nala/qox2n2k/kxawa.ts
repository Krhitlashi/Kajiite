// ≺⧼ ſɭɔ }ʃɹȝ 🔷 ⧽≻
import type { CellType, KradaArangxo, KradaK2pa } from "./hahunaq.js";
export function kf2Qox2n2k(ptalu: KradaArangxo): KradaK2pa[] {
  const n = ptalu.ptaluPal6;
  const haKekkozusai: KradaK2pa[] = [];
  if ( n === 1 ) {
    for ( const [ x, z ] of [ [ 0, 1 ], [ 0, -1 ], [ -1, 0 ], [ 1, 0 ] ] ) haKekkozusai.push([ x, z, "kasafeo" ]);
    haKekkozusai.push([ 0, 0, "qaman2" ]);
    return haKekkozusai;
  }
  for ( let z = n; z >= -n; z-- ) {
    for ( let x = -n; x <= n; x++ ) {
      if ( x === 0 && z === 0 ) { haKekkozusai.push([ 0, 0, "qaman2" ]); continue; }
      if ( enQox2n2k(n, x, z) ) {
        haKekkozusai.push([ x, z, hunaqDeT2q2(Math.max(Math.abs(x), Math.abs(z)), x, z) ]);
      }
    }
  }
  return haKekkozusai;
}

function enQox2n2k(n: number, x: number, z: number): boolean {
  return Math.abs(x) + Math.abs(z) <= n + 1;
}

export function hunaqDeT2q2(r: number, x: number, z: number): CellType {
  if ( r === 0 ) return "qaman2";
  if ( r === 1 ) return Math.abs(x) === Math.abs(z) ? "geqqa" : "kasafeo";
  if ( r === 2 ) return Math.min(Math.abs(x), Math.abs(z)) === 0 ? "turo" : "kap2";
  if ( r === 3 ) {
    if ( Math.abs(x) + Math.abs(z) === 5 ) {
      return ( x * z > 0 ) === ( Math.abs(x) > Math.abs(z) ) ? "kasafeo" : "geqqa";
    }
    return "kap2";
  }
  return Math.min(Math.abs(x), Math.abs(z)) === 0 ? "turo" : "kap2";
}

export function xafanitapuDeCelo(cx: number, cz: number): number {
  const ax = Math.abs(cx), az = Math.abs(cz);
  if ( ax === az ) {
    if ( cx > 0 && cz > 0 ) return 0;
    if ( cx < 0 && cz > 0 ) return 1;
    if ( cx < 0 && cz < 0 ) return 2;
    return 3;
  }
  if ( az > ax ) return cz > 0 ? 0 : 2;
  return cx > 0 ? 3 : 1;
}

export function hunaqDeK6liq(kozuni: CellType, cx: number, cz: number, ox: number, oz: number): CellType {
  if ( kozuni === "qaman2" ) return kozuni;
  if ( kozuni === "ka5asexaz" ) return "ka5asexaz";
  if ( kozuni === "kap2" ) return "kap2";
  const kozunuHahunaq: CellType[] = kozuni === "turo"
    ? [ "kap2", "turo", "kasafeo", "turo" ]
    : [ "kasafeo", "geqqa", "kasafeo", "geqqa" ];
  const xafanitapu = xafanitapuDeCelo(cx, cz);
  const i = ox > 0 ? ( oz > 0 ? 0 : 3 ) : ( oz > 0 ? 1 : 2 );
  return kozunuHahunaq[( i - xafanitapu + 4 ) % 4];
}
