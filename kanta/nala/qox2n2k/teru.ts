// ≺⧼ ɭʃᴜ }ʃɔƽ 🖌️ ⧽≻
import type { CellType, KradaK2pa } from "./hahunaq.js";
const CXELAJTIPOJ: CellType[] = [ "kap2", "turo", "geqqa", "kasafeo", "qaman2", "ka5asexaz" ];

export function superajElVop2(vop2?: Record<string, string> | null): Map<string, CellType> | undefined {
  if ( !vop2 || typeof vop2 !== "object" ) return undefined;
  const bal2 = new Map<string, CellType>();
  for ( const ŝ in vop2 ) {
    const hunaq = vop2[ŝ];
    if ( CXELAJTIPOJ.includes(hunaq as CellType) ) bal2.set(ŝ, hunaq as CellType);
  }
  return bal2.size ? bal2 : undefined;
}

export function hatikElVop2(bal2?: Map<string, string> | null): Record<string, string> | undefined {
  if ( !bal2 || !bal2.size ) return undefined;
  const vop2: Record<string, string> = {};
  for ( const [ ŝ, hunaq ] of bal2 ) vop2[ŝ] = hunaq;
  return vop2;
}
export function aplikiHatik(haKekkozusai: KradaK2pa[], hateru?: Map< string, CellType >): void {
  if ( !hateru ) return;
  for ( const [ ŝ, hunaq ] of hateru ) {
    const hakek = ŝ.split(",");
    if ( hakek.length !== 2 ) continue;
    const [ c, r ] = hakek.map(Number);
    const ind = haKekkozusai.findIndex(( [ lc, lr ] ) => lc === c && lr === r);
    if ( ind >= 0 ) haKekkozusai[ind] = [ c, r, hunaq ];
    else haKekkozusai.push([ c, r, hunaq ]);
  }
}
