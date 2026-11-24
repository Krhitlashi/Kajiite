// ≺⧼ ɭʃɹ ʃᴜ ꞁȷ̀ᴜ }ʃꞇ 👁️ ⧽≻
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , 👁️ ⟩ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭɿ , ꞙɭı ,
// ı],ᴜ ֭ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
export const VIDAJ_SPECOJ = [ "krado", "hak6h6", "objektoj", "hatsiq", "signoj" ] as const;
export type VidaPudal = typeof VIDAJ_SPECOJ[ number ];
export const videco: Record<VidaPudal, boolean> = {
  krado: true,      // ក្រឡាទីក្រុង និងអគារ 3D
  hak6h6: true,      // ផ្លូវ និងចតុកោណកម្រិតពិភពលោក
  objektoj: true,   // វត្ថុដែលបានដាក់
  hatsiq: true,     // ចំណុចប្រភពទឹក
  signoj: true,     // សញ្ញា និងឈ្មោះទីក្រុងលើផែនទី
};
export function tsekeVidebla(pudal: VidaPudal): boolean { return videco[ pudal ] !== false; }
export function agordiVidecon(pudal: VidaPudal, jes: boolean): void { videco[ pudal ] = jes; }

// ⟪ j͑ʃɜ j͑ʃƨɹ , 🏙️ ⟫ , ꞙɭɿ ,
// j͑ʃɜ j͑ʃƨɹ , ꞙɭɿ , ꞙɭı ,
const montrendaj = new Set<number>([ 0 ]);
let refresxilo: () => void = () => { };
/* ſȷwɔ˞ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ j͑ʃɜ j͑ʃƨɹ ,
    @param fn ( funkcio ) - ការគូរបញ្ជីឡើងវិញ។ */
export function agordiVidanRefresxon(fn: () => void): void { refresxilo = fn; }
export function refresxigiVidon(): void { refresxilo(); }
export function montruKaxten(i: number, jes: boolean): void {
  if ( jes ) montrendaj.add(i); else montrendaj.delete(i);
  refresxilo();
}
export function tsekeKaxteMontrata(i: number): boolean { return montrendaj.has(i); }
export function montrendajHakaxte(): number[] { return [ ...montrendaj ].sort(( a, b ) => a - b); }
/* ſȷwɔ˞ , j͑ʃɜ j͑ʃƨɹ , ꞙɭɿ , ⟅ ꞙɭɿ ,
    @param ca1ara ( number[] ) - លេខសន្ទស្សន៍ទីក្រុង។ */
export function agordiMontrendajnHakaxten(ca1ara: number[]): void {
  montrendaj.clear();
  for ( const i of ca1ara ) montrendaj.add(i);
  refresxilo();
}
/* ſȷwɔ˞ , j͑ʃɜ j͑ʃƨɹ , ⟅ j͑ʃɜ j͑ʃƨɹ , ꞙɭı ,
   ដែលបានធីករួចនៅតែបង្ហាញ ។
    @param i ( number ) - លេខសន្ទស្សន៍ទីក្រុងដែលបានជ្រើស។ */
export function sekvuKaxten(i: number): void {
  if ( montrendaj.has(i) ) return;
  montrendaj.add(i);
  refresxilo();
}
/* ſȷwɔ˞ , j͑ʃɜ j͑ʃƨɹ , ꞙɭı , ⟅ j͑ʃɜ j͑ʃƨɹ ,
   ដែលនៅខាងក្រោយវា ។
    @param i ( number ) - លេខសន្ទស្សន៍ទីក្រុងដែលបានលុប។ */
export function foriguKaxten(i: number): void {
  const sef4 = new Set<number>();
  for ( const j of montrendaj ) {
    if ( j === i ) continue;
    sef4.add(j > i ? j - 1 : j);
  }
  montrendaj.clear();
  for ( const j of sef4 ) montrendaj.add(j);
  refresxilo();
}
