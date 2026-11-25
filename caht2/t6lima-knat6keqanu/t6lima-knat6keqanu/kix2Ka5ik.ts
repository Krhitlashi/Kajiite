// ≺⧼ ɭʃɹ ʃᴜ ꞁȷ̀ᴜ }ʃꞇ 👁️ ⧽≻
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , 👁️ ⟩ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭɿ , ꞙɭı ,
// ı],ᴜ ֭ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
export const VIDAJSPECOJ = [ "qox2n2k", "hak6h6", "hazace", "hatsiq", "hakaatse" ] as const;
export type VidaPudal = typeof VIDAJSPECOJ[ number ];
export const videco: Record<VidaPudal, boolean> = {
  qox2n2k: true,      // ſɭᴜ ı],ƨɔ ſɭɹ ſןᴜ ｡ ſɭᴜ ſןɹ 3D
  hak6h6: true,      // ſɭэ ֭ſɭэ ｡ ʃᴜ j͐ʃɹ ｡ ſɭэ j͐ʃꞇȝ
  hazace: true,   // j͑ʃƽɔ ſɭɹ ｡ j͑ʃᴜ j͑ʃᴜ ｡
  hatsiq: true,     // }ʃɹƽ ｡ ſᶘꞇȝ ｡
  hakaatse: true,     // ſɭᴜ ı],ƨɔ ｡ ſɭɔ˞ᴜ ſɭᴜ ｡ ʃᴜ j͐ʃɹ ｡
};
export function tsekeVidebla(pudal: VidaPudal): boolean { return videco[ pudal ] !== false; }
export function catsaraVidecon(pudal: VidaPudal, jes: boolean): void { videco[ pudal ] = jes; }

// ⟪ j͑ʃɜ j͑ʃƨɹ , 🏙️ ⟫ , ꞙɭɿ ,
// j͑ʃɜ j͑ʃƨɹ , ꞙɭɿ , ꞙɭı ,
const laqazi = new Set<number>([ 0 ]);
let refresxilo: () => void = () => { };
/* ſȷwɔ˞ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ j͑ʃɜ j͑ʃƨɹ ,
    @param fn ( funkcio ) - ſɭɹʞ ｡ j͑ʃᴜ j͑ʃᴜ ｡ */
export function catsaraVidanRefresxon(fn: () => void): void { refresxilo = fn; }
export function refresxigiVidon(): void { refresxilo(); }
export function laqazuKaxten(i: number, jes: boolean): void {
  if ( jes ) laqazi.add(i); else laqazi.delete(i);
  refresxilo();
}
export function tsekeKaxteLaqazata(i: number): boolean { return laqazi.has(i); }
export function laqazendajHakaxte(): number[] { return [ ...laqazi ].sort(( a, b ) => a - b); }
/* ſȷwɔ˞ , j͑ʃɜ j͑ʃƨɹ , ꞙɭɿ , ⟅ ꞙɭɿ ,
    @param ca1ara ( number[] ) - ſɭᴜ ı],ƨɔ ｡ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ｡ */
export function catsaraLaqazendajnHakaxten(ca1ara: number[]): void {
  laqazi.clear();
  for ( const i of ca1ara ) laqazi.add(i);
  refresxilo();
}
/* ſȷwɔ˞ , j͑ʃɜ j͑ʃƨɹ , ⟅ j͑ʃɜ j͑ʃƨɹ , ꞙɭı ,
   j͑ʃᴜ j͑ʃᴜ ｡ ſɭᴜ ｡
    @param i ( number ) - j͑ʃw ſɭʞɹȝ ｡ ſɭᴜ ı],ƨɔ ｡ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ｡ */
export function panauKaxten(i: number): void {
  if ( laqazi.has(i) ) return;
  laqazi.add(i);
  refresxilo();
}
/* ſȷwɔ˞ , j͑ʃɜ j͑ʃƨɹ , ꞙɭı , ⟅ j͑ʃɜ j͑ʃƨɹ ,
   ſɭᴜ ｡ ſɭɹ ｡
    @param i ( number ) - ֭ſɭɹͷ̗ ｡ ſɭᴜ ı],ƨɔ ｡ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ｡ */
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
