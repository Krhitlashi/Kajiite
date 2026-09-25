// ≺⧼ Unuoj 📏 ⧽≻
// La mezurunuoj de CAX2L ( vidu S2WENI/CAX2L.md ) kaj la faktoroj, kiuj ligas
// ilin al la unuoj, en kiuj la kodo mem devas labori.
//
// ⟪ La regulo 📃 ⟫ — la kodo laboras per sia propra unuo, ĉar performance.now()
// donas milisekundojn kaj la tereno estas konstruata per la kodunuoj de la
// kradoj. ĈIU nombro, kiun homo legas — la komentoj, la surmetaĵo de la
// statistiko — estas esprimata en la unuoj de CAX2L per la faktoroj malsupre.
// Metra nombro ne restas ie ajn en la projekto.
//
// ⟨ Peu 📏 ⟩ — la longounuo de CAX2L ( la rapideco de la lumo oble la longtempo
// de He, duonigita ). La mondo havas UNU longounuon, la kodunuon de la tereno
// kaj de la kradoj, kaj tiu kodunuo valoras 0o100 Peu. Tiel 1 Peu, la dikeco
// de fadeno de la teksajxoj, estas la plej malgranda mezuro, kiun la mondo
// bezonas. La komentuoj de la terenaj kaj vojaj moduloj simple nombras la Peuojn
// rekte ( 0o2/0o100 kodunuoj = 0o2 Peu ), ĉar tiu rilato estas difino, ne
// kalkulo.
export const PEU_POR_KODUNUO = 0o100;

// ⟨ He 📏 ⟩ — la tempounuo de CAX2L, 2^32 cikloj de cezio 133 ( vidu
// S2WENI/CAX2L.md ). La retumilo mezuras per milisekundoj, do tiuj ĉi du
// faktoroj konvertas ambaŭdirekte. 0o1750 estas 1000 — la nombro da
// milisekundoj en sekundo.
export const HE_POR_SEKUNDO = 9192631770 / 4294967296;
export const HE_POR_MILISEKUNDO = HE_POR_SEKUNDO / 0o1750;

// alPeu — Konvertu kodunuojn en Peuojn.
//     @param kodunuoj ( number ) - La longo en la kodunuoj de la tereno.
//     @returns la sama longo en Peuoj.
export function alPeu(kodunuoj: number): number {
  return kodunuoj * PEU_POR_KODUNUO;
}

// alHe — Konvertu milisekundojn ( performance.now ) en He.
//     @param milisekundoj ( number ) - La tempo en la unuo de la retumilo.
//     @returns la sama tempo en He.
export function alHe(milisekundoj: number): number {
  return milisekundoj * HE_POR_MILISEKUNDO;
}
