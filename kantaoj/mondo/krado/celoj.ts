// ≺⧼ ſɭɔ }ʃɹȝ 🔷 ⧽≻
import type { CellType, KradaArangxo, KradaK2pa } from "./hahunaq.js";
export function kf2Kradon(arangxo: KradaArangxo): KradaK2pa[] {
  const n = arangxo.arangxaGrando;
  const haKekkozusai: KradaK2pa[] = [];
  if ( n === 1 ) {
    for ( const [ x, z ] of [ [ 0, 1 ], [ 0, -1 ], [ -1, 0 ], [ 1, 0 ] ] ) haKekkozusai.push([ x, z, "kasafeo" ]);
    haKekkozusai.push([ 0, 0, "sanktejo" ]);
    return haKekkozusai;
  }
  for ( let z = n; z >= -n; z-- ) {
    for ( let x = -n; x <= n; x++ ) {
      if ( x === 0 && z === 0 ) { haKekkozusai.push([ 0, 0, "sanktejo" ]); continue; }
      if ( enKrado(n, x, z) ) {
        haKekkozusai.push([ x, z, hunaqDeRingo(Math.max(Math.abs(x), Math.abs(z)), x, z) ]);
      }
    }
  }
  return haKekkozusai;
}

function enKrado(n: number, x: number, z: number): boolean {
  return Math.abs(x) + Math.abs(z) <= n + 1;
}

export function hunaqDeRingo(r: number, x: number, z: number): CellType {
  if ( r === 0 ) return "sanktejo";
  if ( r === 1 ) return Math.abs(x) === Math.abs(z) ? "mangxejo" : "kasafeo";
  if ( r === 2 ) return Math.min(Math.abs(x), Math.abs(z)) === 0 ? "turo" : "domo";
  if ( r === 3 ) {
    if ( Math.abs(x) + Math.abs(z) === 5 ) {
      return ( x * z > 0 ) === ( Math.abs(x) > Math.abs(z) ) ? "kasafeo" : "mangxejo";
    }
    return "domo";
  }
  return Math.min(Math.abs(x), Math.abs(z)) === 0 ? "turo" : "domo";
}

export function fazoDeCelo(cx: number, cz: number): number {
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

export function hunaqDeBloko(kozuni: CellType, cx: number, cz: number, ox: number, oz: number): CellType {
  if ( kozuni === "sanktejo" ) return kozuni;
  if ( kozuni === "stacio" ) return "stacio";
  if ( kozuni === "domo" ) return "domo";
  const bazoHahunaq: CellType[] = kozuni === "turo"
    ? [ "domo", "turo", "kasafeo", "turo" ]
    : [ "kasafeo", "mangxejo", "kasafeo", "mangxejo" ];
  const fazo = fazoDeCelo(cx, cz);
  const i = ox > 0 ? ( oz > 0 ? 0 : 3 ) : ( oz > 0 ? 1 : 2 );
  return bazoHahunaq[( i - fazo + 4 ) % 4];
}
