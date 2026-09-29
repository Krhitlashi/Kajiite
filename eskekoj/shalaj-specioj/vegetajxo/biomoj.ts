// ≺⧼ Biomaj aroj 🌍 ⧽≻
// La specoj ↔ biomoj ( kiu kreskas kie ) — la kontrolo de la planto-spawno.
// Ĉiu speco apartenas al unu aŭ pluraj biomoj ( tereno.ts ). La metaj funkcioj
// ricevas la biomo-liston de la vokanto ( urbo.ts ), kiu uzas la komunajn arojn
// sube — ŝanĝu la aron por ŝanĝi, kie la speco kreskas.
//   · valo — la arbareroj ( la arbaro plenigas la tutan biomon ).
//   · ebenaĵo — la malalta grundo ekster la arbareroj ( nur kelkaj etaj
//     plantoj. herbo kaj purpuraj plantoj ).
//   · montaro — la alpa zono ( Pussxlefo, rokoj, montaj arboj ).
//   · akvaj-plantoj — la akvaj plantoj ( la ĝenerala akva zono ) kreskas nur
//     en la pentritaj akvaj zonoj.
//   · ekvizeto — la DU ekvizetaj specioj ( cetkuoj / Equisetum praealtum kaj
//     cakeoj / Equisetum telmateia ) kreskas nur en la pentrita e kvizeta
//     zono, sur la akvo.
import { type Biomo } from "../../../kantaoj/mondo/tereno.js";

export const VALAJ_BIOMOJ: readonly Biomo[] = [ "valo" ];
export const EBENAJAJ_BIOMOJ: readonly Biomo[] = [ "ebenaĵo" ];
export const MONTAJ_BIOMOJ: readonly Biomo[] = [ "montaro" ];
export const EKVIZETO_BIOMOJ: readonly Biomo[] = [ "ekvizeto" ];
