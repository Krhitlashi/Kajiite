// ≺⧼ La ĉelaj superoj 🖌️ ⧽≻
// La manaj ĉel-superoj de la terena skulptilo — la legado el la konservita
// datumaro ( superajElDatumo ), la skribado reen ( superojElDatumo ) kaj la
// surmetado al generita krado ( aplikiSuperojn ).
import type { CellType, KradaĈelo } from "./tipoj.js";
// La konataj ĉelaj tipoj — por la filtrado de la konservitaj superoj.
const CXELAJ_TIPOJ: CellType[] = [ "domo", "turo", "mangxejo", "kasafeo", "sanktejo", "stacio" ];

// superajElDatumo — la konservitaj ĉel-superoj ( simpla objekto en
// SKULPTA_URBOJ — la ŝlosiloj "c,r" aux "c,r,SUB" ) kiel Map por
// kreiKradanPlanon kaj konstruiKradanUrbon. Nekonataj tipoj kaj malplenaj
// listoj estas forlasitaj — neniu eksplodo ĉe malnova datumaro.
export function superajElDatumo(datumo?: Record<string, string> | null): Map<string, CellType> | undefined {
  if ( !datumo || typeof datumo !== "object" ) return undefined;
  const mapo = new Map<string, CellType>();
  for ( const ŝ in datumo ) {
    const tipo = datumo[ŝ];
    if ( CXELAJ_TIPOJ.includes(tipo as CellType) ) mapo.set(ŝ, tipo as CellType);
  }
  return mapo.size ? mapo : undefined;
}

// superojElDatumo — la inversa direkto ( Map → simpla objekto ) por la savo
// de la skulptilo. Malplena Map donas undefined — neniu kampo en la dosiero.
export function superojElDatumo(mapo?: Map<string, string> | null): Record<string, string> | undefined {
  if ( !mapo || !mapo.size ) return undefined;
  const datumo: Record<string, string> = {};
  for ( const [ ŝ, tipo ] of mapo ) datumo[ŝ] = tipo;
  return datumo;
}
// aplikiSuperojn — la manaj ĉel-superoj de la terena skulptilo sur la generitan
// kradon. Anstataŭigo de ekzistanta ĉelo ŝanĝas ĝian tipon; nova ŝlosilo ALDONAS
// ĉelon ( la voja reto konstruiĝas ĉirkaŭ ĝi kiel ĉe la generitaj ĉeloj ). La
// sub-ŝlosiloj ( "c,r,NE" ktp ) apartenas al la kvar-bloka sub-redaktado — ili
// ŝanĝas la INDIVIDUAJN konstruaĵojn de la bloko, ne la ĉelan tipon, do ili
// estas ignorataj ĉi tie. La ludo ( urbo.ts ) kaj la terena skulptilo ( la
// plano, kreiKradanPlanon ) uzas la saman helpilon.
//     @param ĉeloj ( KradaĈelo[] ) - La generita krado, redaktata surloke.
//     @param superoj ( Map< string, CellType > ) - La ŝlosilo "c,r" → la tipo.
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
