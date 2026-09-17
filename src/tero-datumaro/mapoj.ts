// ≺⧼ Mapoj 🗺️ ⧽≻
// Kreita de la terena skulptilo ( iloj/tero-skulptilo/tero-skulptilo.html ).
// ( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) - Ne redaktu mane. La skulptilo reskribas la dosieron.

// ⟨ La mapoj de la mondo 📃 ⟩ — ĉiu mapo estas SENDEPENDA mondo kun siaj propraj
// datumoj ( src/tero-datumaro/<kodo>/ — la krado, la akvo, la biomoj, la bestoj,
// la metitaj objektoj, la urboj kaj la vojoj/dokoj ). La terena skulptilo
// elektas la mapon, redaktas ĝin kaj skribas la datumojn de tiu mapo; la ludo
// legas la mapon markitan per aktiva ( tra la pordo aktiva.ts, kiun la skulptilo
// reskribas kune kun la mapo ).
//
// formo — la formo de la tereno ( assets/komunajxoj/mapformo.ts ): la cirklo ( la
// defaŭlto ), la rondigita kvadrato aŭ la rondigita triangulo.
// grandeco — la duon-grando de la formo en mondo-unuoj: la radiuso de la cirklo,
// la duon-larĝo de la kvadrato aŭ la cirkumradiuso de la triangulo.
//
// La tipo kaj la helpiloj loĝas en src/tero-datumaro/mapregulo.ts.
import type { MapoDatumo } from "./mapregulo.js";

export const MAPOJ: MapoDatumo[] = [
  { kodo: "cxefa", nomo: "Ĉefa mapo", aktiva: true, formo: "rondo", grandeco: 0o600 },
];
