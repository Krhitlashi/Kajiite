// ≺⧼ ស្រទាប់លើក្រឡា 🖌️ ⧽≻
import type { CellType, KradaĈelo } from "./tipoj.js";
const CXELAJ_TIPOJ: CellType[] = [ "domo", "turo", "mangxejo", "kasafeo", "sanktejo", "stacio" ];

export function superajElDatumo(datumo?: Record<string, string> | null): Map<string, CellType> | undefined {
  if ( !datumo || typeof datumo !== "object" ) return undefined;
  const mapo = new Map<string, CellType>();
  for ( const ŝ in datumo ) {
    const tipo = datumo[ŝ];
    if ( CXELAJ_TIPOJ.includes(tipo as CellType) ) mapo.set(ŝ, tipo as CellType);
  }
  return mapo.size ? mapo : undefined;
}

export function superojElDatumo(mapo?: Map<string, string> | null): Record<string, string> | undefined {
  if ( !mapo || !mapo.size ) return undefined;
  const datumo: Record<string, string> = {};
  for ( const [ ŝ, tipo ] of mapo ) datumo[ŝ] = tipo;
  return datumo;
}
export function aplikiSuperojn(ĉeloj: KradaĈelo[], superoj?: Map< string, CellType >): void {
  if ( !superoj ) return;
  for ( const [ ŝ, tipo ] of superoj ) {
    const partoj = ŝ.split(",");
    if ( partoj.length !== 2 ) continue;
    const [ c, r ] = partoj.map(Number);
    const ind = ĉeloj.findIndex(( [ lc, lr ] ) => lc === c && lr === r);
    if ( ind >= 0 ) ĉeloj[ind] = [ c, r, tipo ];
    else ĉeloj.push([ c, r, tipo ]);
  }
}
