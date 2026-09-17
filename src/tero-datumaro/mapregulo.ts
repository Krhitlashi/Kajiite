// Mapregulo — la reguloj de la mapoj. La LISTO de la mapoj estas datumaro
// ( src/tero-datumaro/mapoj.ts, kiun la terena skulptilo reskribas ), kaj la
// tipo kaj la helpiloj estas permane skribitaj ĉi tie — do la skulptilo skribas
// nur la datumojn kaj la interfaco restas en unu loko.
//
// Ĉiu mapo estas SENDEPENDA mondo kun sia propra dosierujo
// ( src/tero-datumaro/<kodo>/ — la krado, la akvo, la biomoj, la bestoj, la
// metitaj objektoj, la urboj kaj la vojoj/dokoj ). La ludo legas la mapon
// markitan per aktiva tra la pordo src/tero-datumaro/aktiva.ts, kiun la
// skulptilo reskribas kune kun la datumoj.
import type { MapFormo } from "../../assets/komunajxoj/mapformo.js";
import { MAPOJ } from "./mapoj.js";

export interface MapoDatumo {
  kodo: string;        // la dosieruja nomo ( nur literoj, ciferoj kaj streketoj )
  nomo: string;        // la nomo, kiun la iloj montras
  aktiva?: boolean;    // ĉu la ludo legas ĉi tiun mapon
  formo: MapFormo;     // la formo de la tereno
  grandeco: number;    // la duon-grando de la formo ( mondo-unuoj )
}

export { MAPOJ };

// aktivaMapo — la mapo, kiun la ludo legas. La unua markita per aktiva, alie la
// unua en la listo.
//     @returns La aktiva mapo ( la listo ĉiam havas almenaŭ unu mapon ).
export function aktivaMapo(): MapoDatumo {
  return MAPOJ.find(m => m.aktiva) ?? MAPOJ[0];
}

// mapoDeKodo — la mapo kun tiu kodo, alie la aktiva mapo.
//     @param kodo ( string ) - La dosieruja nomo de la mapo.
//     @returns La mapo.
export function mapoDeKodo(kodo: string | null | undefined): MapoDatumo {
  if ( !kodo ) return aktivaMapo();
  return MAPOJ.find(m => m.kodo === kodo) ?? aktivaMapo();
}
