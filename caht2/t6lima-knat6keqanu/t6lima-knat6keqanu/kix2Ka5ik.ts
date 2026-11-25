// ≺⧼ ɭʃɹ ʃᴜ ꞁȷ̀ᴜ }ʃꞇ 👁️ ⧽≻
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , 👁️ ⟩ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭɿ , ꞙɭı ,
// ı],ᴜ ֭ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
export const VIDAJSPECOJ = [ "qox2n2k", "hak6h6", "hazace", "hatsiq", "hakaatse" ] as const;
export type VidaPudal = typeof VIDAJSPECOJ[ number ];
export const videco: Record<VidaPudal, boolean> = {
  qox2n2k: true,      // ក្រឡាទីក្រុង និងអគារ 3D
  hak6h6: true,      // ផ្លូវ និងចតុកោណកម្រិតពិភពលោក
  hazace: true,   // វត្ថុដែលបានដាក់
  hatsiq: true,     // ចំណុចប្រភពទឹក
  hakaatse: true,     // សញ្ញា និងឈ្មោះទីក្រុងលើផែនទី
};
export function tsekeVidebla(pudal: VidaPudal): boolean { return videco[ pudal ] !== false; }
export function catsaraVidecon(pudal: VidaPudal, jes: boolean): void { videco[ pudal ] = jes; }

// ⟪ j͑ʃɜ j͑ʃƨɹ , 🏙️ ⟫ , ꞙɭɿ ,
// j͑ʃɜ j͑ʃƨɹ , ꞙɭɿ , ꞙɭı ,
const laqazi = new Set<number>([ 0 ]);
let refresxilo: () => void = () => { };
/* ſȷwɔ˞ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ j͑ʃɜ j͑ʃƨɹ ,
    @param fn ( funkcio ) - ការគូរបញ្ជីឡើងវិញ។ */
export function catsaraVidanRefresxon(fn: () => void): void { refresxilo = fn; }
export function refresxigiVidon(): void { refresxilo(); }
export function laqazuKaxten(i: number, jes: boolean): void {
  if ( jes ) laqazi.add(i); else laqazi.delete(i);
  refresxilo();
}
export function tsekeKaxteLaqazata(i: number): boolean { return laqazi.has(i); }
export function laqazendajHakaxte(): number[] { return [ ...laqazi ].sort(( a, b ) => a - b); }
/* ſȷwɔ˞ , j͑ʃɜ j͑ʃƨɹ , ꞙɭɿ , ⟅ ꞙɭɿ ,
    @param ca1ara ( number[] ) - លេខសន្ទស្សន៍ទីក្រុង។ */
export function catsaraLaqazendajnHakaxten(ca1ara: number[]): void {
  laqazi.clear();
  for ( const i of ca1ara ) laqazi.add(i);
  refresxilo();
}
/* ſȷwɔ˞ , j͑ʃɜ j͑ʃƨɹ , ⟅ j͑ʃɜ j͑ʃƨɹ , ꞙɭı ,
   ដែលបានធីករួចនៅតែបង្ហាញ ។
    @param i ( number ) - លេខសន្ទស្សន៍ទីក្រុងដែលបានជ្រើស។ */
export function panauKaxten(i: number): void {
  if ( laqazi.has(i) ) return;
  laqazi.add(i);
  refresxilo();
}
/* ſȷwɔ˞ , j͑ʃɜ j͑ʃƨɹ , ꞙɭı , ⟅ j͑ʃɜ j͑ʃƨɹ ,
   ដែលនៅខាងក្រោយវា ។
    @param i ( number ) - លេខសន្ទស្សន៍ទីក្រុងដែលបានលុប។ */
export function h2luKaxten(i: number): void {
  const sef4 = new Set<number>();
  for ( const j of laqazi ) {
    if ( j === i ) continue;
    sef4.add(j > i ? j - 1 : j);
  }
  laqazi.clear();
  for ( const j of sef4 ) laqazi.add(j);
  refresxilo();
}
