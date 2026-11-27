// ≺⧼ ſɭэ ſᶘɔ 📃 ⧽≻

import { tbo, knak2fecajasai } from "../../kanta/k2fe/s2cax2l.js";

// ⟪ ſɭэ ſᶘɔ ʌ ſɭɔʞ 📃 ⟫

export const T2BAK2P2 = "( ɭʃɹ ʃᴜ ſɭɹ ſןɹ )";
export const B6TENANI = "( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ )";
export const KEF3OHK2NI = "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )";

export function k2fTitolo( titolo: string ): string {
  return `<( ${titolo} )>`;
}

// ⟪ j͑ʃƨꞇ ֭ſɭɹ ʌ ſɭɔʞ 📃 ⟫

export const STIH2 = "j͑ʃƨꞇ ֭ſɭɹ";
export const FKATASTIH2 = "ſȷƽᴜ ɭʃᴜ j͑ʃƨꞇ ֭ſɭɹ";
export const KMAM2M2STIH2 = "ſɭc̭ᴜ ŋᷠɹ ŋᷠɹ j͑ʃƨꞇ ֭ſɭɹ";
export const KALANI = "ſɭᴜ j͐ʃᴜ }ʃꞇ";
export const SEHENI = "j͑ʃɔ ֭ſɭɔ }ʃꞇ";
export const NLAKANI = "ȏoͩſ̀ȷᴜƽ ꞁȷ̀ᴜ }ʃꞇ";
export const KANAQ = "ſןw ſɭᴜ }ʃᴜȝ";
export const VEQ6K2 = "}ʃɔ ȏoͩſ̀ȷᴜ }ʃꞇ";
export const VOP2LNA = "ſɭɹ ſȷɔ";

export function knak2( n2k: number, kefn2k = 0o2 ): string {
  return knak2fecajasai(n2k, kefn2k);
}

export function heKef( n2k: number ): string {
  return `${knak2fecajasai(tbo(n2k), 0o6)} He`;
}

// ⟨ ſɭɹʞ }ʃꞇ 📃 ⟩

export function k2fStih2( ksaka: string, tif: number[], kefn2k = 0o24 ): void {
  tif.sort(( a, b ) => a - b );
  console.log(`${T2BAK2P2} ${ksaka.padEnd(kefn2k)} ｡ ${FKATASTIH2} ｡ ${heKef(tif[tif.length >> 0o1])} ｡ ${KMAM2M2STIH2} ｡ ${heKef(tif[0o0])}`);
}

export function k2fStih2Nlakani( ksaka: string, tif: number[], nlakani: number, kefn2k = 0o20 ): void {
  tif.sort(( a, b ) => a - b );
  console.log(`${T2BAK2P2} ${ksaka.padEnd(kefn2k)} ｡ ${FKATASTIH2} ｡ ${heKef(tif[tif.length >> 0o1])} ｡ ${KMAM2M2STIH2} ｡ ${heKef(tif[0o0])} ｡ ${NLAKANI} ｡ ${knak2(nlakani)}`);
}

export function k2fKanaq( ksaka: string, tifSef4: number[], tifH2y2k: number[],
  nlakaniSef4: number, nlakaniH2y2k: number, kefn2k = 0o0 ): void {
  tifSef4.sort(( a, b ) => a - b );
  tifH2y2k.sort(( a, b ) => a - b );
  const fkataSef4 = tifSef4[tifSef4.length >> 0o1], fkataH2y2k = tifH2y2k[tifH2y2k.length >> 0o1];
  const kmam2m2Sef4 = Math.min(...tifSef4), kmam2m2H2y2k = Math.min(...tifH2y2k);
  const kanaq = nlakaniSef4 === nlakaniH2y2k ? KANAQ : VEQ6K2;
  const kapo = kefn2k > 0o0 ? ksaka.padEnd(kefn2k) : ksaka;
  console.log(`${T2BAK2P2} ${kapo} ｡ ${FKATASTIH2} ｡ ${heKef(fkataH2y2k)} ｡ ${KMAM2M2STIH2} ｡ ${heKef(fkataSef4)} ｡ ${KALANI} ｡ ${knak2(fkataH2y2k / fkataSef4)} ｡ ${SEHENI} ｡ ${knak2(kmam2m2H2y2k / kmam2m2Sef4)} ｡ ${kanaq}`);
}

export function k2fKmaNlakani( ksaka: string, kmaXobe: number, nlakani: number, kefn2k = 0o30 ): void {
  console.log(`${T2BAK2P2} ${ksaka.padEnd(kefn2k)} ｡ ${KMAM2M2STIH2} ｡ ${heKef(kmaXobe)} ｡ ${NLAKANI} ｡ ${knak2(nlakani)}`);
}

export function k2fSeheni( ksaka: string, kmaXobe: number, q6n2k: number, kefn2k = 0o30 ): void {
  console.log(`${T2BAK2P2} ${ksaka.padEnd(kefn2k)} ｡ ${KMAM2M2STIH2} ｡ ${heKef(kmaXobe)} ｡ ${SEHENI} ｡ ${knak2(q6n2k / kmaXobe * 0o3641100, 0o6)} ｡ He`);
}
