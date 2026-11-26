// ≺⧼ ɭʃᴜ }ʃɔƽ ʌ ɭʃɔ ɽ͑ʃ'w 🖌️ ⧽≻
import type { K2paHunaq, Qox2n2kK2pa } from "./hahunaq.js";
const CANAHUNAQ: K2paHunaq[] = [ "kap2", "turo", "geqqa", "kasafeo", "qaman2", "ka5asexaz" ];

export function superajElVop2(vop2?: Record<string, string> | null): Map<string, K2paHunaq> | undefined {
  if ( !vop2 || typeof vop2 !== "object" ) return undefined;
  const bal2 = new Map<string, K2paHunaq>();
  for ( const ca3aq in vop2 ) {
    const hunaq = vop2[ca3aq];
    if ( CANAHUNAQ.includes(hunaq as K2paHunaq) ) bal2.set(ca3aq, hunaq as K2paHunaq);
  }
  return bal2.size ? bal2 : undefined;
}

export function hatikElVop2(bal2?: Map<string, string> | null): Record<string, string> | undefined {
  if ( !bal2 || !bal2.size ) return undefined;
  const vop2: Record<string, string> = {};
  for ( const [ ca3aq, hunaq ] of bal2 ) vop2[ca3aq] = hunaq;
  return vop2;
}
export function k2reiHatik(haKekkozusai: Qox2n2kK2pa[], hateru?: Map< string, K2paHunaq >): void {
  if ( !hateru ) return;
  for ( const [ ca3aq, hunaq ] of hateru ) {
    const hakek = ca3aq.split(",");
    if ( hakek.length !== 0o2 ) continue;
    const [ c, r ] = hakek.map(Number);
    const ind = haKekkozusai.findIndex(( [ lc, lr ] ) => lc === c && lr === r);
    if ( ind >= 0o0 ) haKekkozusai[ind] = [ c, r, hunaq ];
    else haKekkozusai.push([ c, r, hunaq ]);
  }
}
