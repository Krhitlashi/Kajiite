// ≺⧼ Aktiva mapo 📃 ⧽≻
// Kreita de la terena skulptilo ( iloj/tero-skulptilo/tero-skulptilo.html ).
// ( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) - Ne redaktu mane. La skulptilo reskribas la dosieron.

// ⟨ La datumoj de la aktiva mapo 📃 ⟩ — la pordo al la datumoj de la mapo, kiun
// la ludo legas. La mapoj estas SENDEPENDAJ mondoj ( src/tero-datumaro/mapoj.ts );
// ĉiu mapo havas sian propran dosierujon kun la krado, la akvo, la biomoj, la
// bestoj, la metitaj objektoj, la urboj kaj la vojoj/dokoj. Ĉi tiu dosiero
// re-eksportas la dosierojn de UNU el ili, do la tuta ludo importas unu konatan
// pordon ( tereno.ts, urbo.ts, ... ) kaj neniam dosierujon.
//
// La skulptilo reskribas ĉi tiun dosieron kiam ĝi ŝanĝas la aktivan mapon ( la
// mapon markitan per aktiva en mapoj.ts ).
export * from "./cxefa/krado.js";
export * from "./cxefa/akvo.js";
export * from "./cxefa/biomoj.js";
export * from "./cxefa/bestoj.js";
export * from "./cxefa/objektoj.js";
export * from "./cxefa/urboj.js";
export * from "./cxefa/vojoj.js";
