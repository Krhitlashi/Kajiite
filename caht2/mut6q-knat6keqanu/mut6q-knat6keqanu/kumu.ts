// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſɭw ŋᷠw 📃 ⧽≻

import { catsaraHatsiqn, catsaraSukf2qitanTsiqn, catsaraTsiqTrenatan,
  catsaraAkvanVem2n, s2tasTsasaS23ohk2sain, revek2feTsasa, hatsiq, sukf2qitaTsiq,
  tsasaVem2Vem2 } from "./1asa.js";
import type { LasTsiq } from "./1asa.js";
import { catsaraHatoxemani, catsaraSukf2qitanOxemanin, tlak2ObjektoCatsara,
  vepaqTom6Hatoxemani, hazace, sukf2qitaOxemani } from "./zacej.js";
import { catsaraHakaxten, catsaraHak6h6n, catsaraHaqakaj2n, catsaraSukf2qitanKaxten,
  sukf2qiKaxten, tlak2KaxteMasukf2q, tlak2K6h6jnHakaman, hakaxte,
  sukf2qitaKaxte, hak6h6, haqakaj2 } from "./haqox2n2k.js";

import type { Knat6keqanuKuba, Knat6keqanuK6h6N2k, Knat6keqanuTap2Qoxa, Neq2qObjekto } from "../../../kanta/nala/kaxte/hahunaq.js";

export interface HistoriaMomento {
  hal6da: Float32Array;
  k6liqani: Uint8Array;
  habs2: Uint8Array;
  hapaga: Uint8Array;
  hatsiq: LasTsiq[];
  tsiqSukf2qo: number;
  hazace: Neq2qObjekto[];
  oxemaniSukf2qo: number;
  vem2: number;
  hakaxte: Knat6keqanuKuba[];
  sukf2qitaKaxte: number;
  hak6h6: Knat6keqanuK6h6N2k[];
  haqakaj2: Knat6keqanuTap2Qoxa[];
}

export const historio: HistoriaMomento[] = [];
export const refaraHistorio: HistoriaMomento[] = [];

export function s2k61oMomento(): HistoriaMomento {
  return {
    hal6da: hal6da.slice(), k6liqani: k6liqani.slice(), habs2: habs2.slice(), hapaga: hapaga.slice(),
    hatsiq: hatsiq.map(f => ( { ...f } )), tsiqSukf2qo: sukf2qitaTsiq,
    hazace: hazace.map(o => ( { ...o } )), oxemaniSukf2qo: sukf2qitaOxemani, vem2: tsasaVem2Vem2,
    hakaxte: JSON.parse(JSON.stringify(hakaxte)) as Knat6keqanuKuba[], sukf2qitaKaxte,
    hak6h6: JSON.parse(JSON.stringify(hak6h6)) as Knat6keqanuK6h6N2k[],
    haqakaj2: JSON.parse(JSON.stringify(haqakaj2)) as Knat6keqanuTap2Qoxa[],
  };
}

export function momenti(): void {
  refaraHistorio.length = 0o0;
  historio.push(s2k61oMomento());
  if ( historio.length > 0o40 ) historio.shift();
}

export function restoriS2k61o(s: HistoriaMomento): void {
  hal6da.set(s.hal6da);
  k6liqani.set(s.k6liqani);
  habs2.set(s.habs2);
  hapaga.set(s.hapaga);

  catsaraHatsiqn(s.hatsiq ? s.hatsiq.map(f => ( { ...f } )) : []);
  catsaraSukf2qitanTsiqn(s.tsiqSukf2qo ?? -0o1);
  catsaraTsiqTrenatan(-0o1);
  s2tasTsasaS23ohk2sain();
  catsaraHatoxemani(s.hazace ? s.hazace.slice() : []);
  catsaraSukf2qitanOxemanin(s.oxemaniSukf2qo ?? -0o1);
  if ( s.hakaxte && s.hakaxte.length ) catsaraHakaxten(s.hakaxte);
  if ( s.hak6h6 && s.hak6h6.length ) catsaraHak6h6n(s.hak6h6);
  if ( s.haqakaj2 && s.haqakaj2.length ) catsaraHaqakaj2n(s.haqakaj2);

  catsaraSukf2qitanKaxten(Math.max(0o0, Math.min(s.sukf2qitaKaxte ?? 0o0, hakaxte.length - 0o1)));
  tlak2ObjektoCatsara();
  vepaqTom6Hatoxemani();
  catsaraAkvanVem2n(s.vem2);
  vem2Kama.value = String(tsasaVem2Vem2);
  tlak2Haskek2();
  tlak2KaxteMasukf2q();
  sukf2qiKaxten(sukf2qitaKaxte);
  tlak2K6h6jnHakaman();

  revek2feTsasa();
  s2tasVeq6k2itan();
}

export function malfari(): void {
  const s = historio.pop();
  if ( !s ) return;
  refaraHistorio.push(s2k61oMomento());
  restoriS2k61o(s);
}

export function refari(): void {
  const s = refaraHistorio.pop();
  if ( !s ) return;
  historio.push(s2k61oMomento());
  restoriS2k61o(s);
}

interface HistoriaLigo {
  hal6da: Float32Array;
  k6liqani: Uint8Array;
  habs2: Uint8Array;
  hapaga: Uint8Array;
  vem2Kama: HTMLInputElement;
  tlak2Haskek2: () => void;
  s2tasVeq6k2itan: () => void;
}
let hal6da: Float32Array;
let k6liqani: Uint8Array;
let habs2: Uint8Array;
let hapaga: Uint8Array;
let vem2Kama: HTMLInputElement;
let tlak2Haskek2: () => void;
let s2tasVeq6k2itan: () => void;

export function catsaraHistorion(L: HistoriaLigo): void {
  ( { hal6da, k6liqani, habs2, hapaga, vem2Kama, tlak2Haskek2,
    s2tasVeq6k2itan } = L );
}
