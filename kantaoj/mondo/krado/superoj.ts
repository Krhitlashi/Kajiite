// ≺⧼ ɭʃᴜ }ʃɔƽ 🖌️ ⧽≻
import type { CellType, KradaK2pa } from "./hahunaq.js";
const CXELAJ_TIPOJ: CellType[] = [ "domo", "turo", "mangxejo", "kasafeo", "sanktejo", "stacio" ];

export function superajElDatumo(datumo?: Record<string, string> | null): Map<string, CellType> | undefined {
  if ( !datumo || typeof datumo !== "object" ) return undefined;
  const mapo = new Map<string, CellType>();
  for ( const ŝ in datumo ) {
    const hunaq = datumo[ŝ];
    if ( CXELAJ_TIPOJ.includes(hunaq as CellType) ) mapo.set(ŝ, hunaq as CellType);
  }
  return mapo.size ? mapo : undefined;
}

export function superojElDatumo(mapo?: Map<string, string> | null): Record<string, string> | undefined {
  if ( !mapo || !mapo.size ) return undefined;
  const datumo: Record<string, string> = {};
  for ( const [ ŝ, hunaq ] of mapo ) datumo[ŝ] = hunaq;
  return datumo;
}
export function aplikiSuperojn(haKekkozusai: KradaK2pa[], superoj?: Map< string, CellType >): void {
  if ( !superoj ) return;
  for ( const [ ŝ, hunaq ] of superoj ) {
    const hakek = ŝ.split(",");
    if ( hakek.length !== 2 ) continue;
    const [ c, r ] = hakek.map(Number);
    const ind = haKekkozusai.findIndex(( [ lc, lr ] ) => lc === c && lr === r);
    if ( ind >= 0 ) haKekkozusai[ind] = [ c, r, hunaq ];
    else haKekkozusai.push([ c, r, hunaq ]);
  }
}
