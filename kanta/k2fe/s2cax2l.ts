// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📃 ⧽≻

const KFEKACO = 0o104373066732;
const KFEXAT2P2 = 0o71330627035345422;
const GESEHENI = 0o2167474112;
const HTUHU = 0o2325145304344 / 0o1131664625026503304364046121044000000000000;
const SACAK2FE = 0o13737643172 / 0o10047716274370450046042000000000;
const K2FEBOLC = 0o5210451 / 0o120617017534665620574524000000000;

export const HEKE = KFEKACO / 0o40000000000;
export const HEKEBAR6Q = HEKE / 0o1750;
export const HEKE1ELU = 0o40000000000 / KFEKACO;

export const HEKE1ELUKFEXAT2P2 = 0o1000000 * 0o40000000000 / KFEXAT2P2;
export const QUHE1ELU = 0o100 * HEKE1ELU;
export const HAQUHE1ELU = 0o100 * QUHE1ELU;
export const SHE1ELU = 0o100 * HAQUHE1ELU;
export const SQE1ELU = 0o100 * SHE1ELU;
export const SHAQE1ELU = 0o100 * SQE1ELU;

export const SAHAKANI = GESEHENI / ( 0o2 * KFEKACO );
export const SAHAKANI2 = SAHAKANI ** 0o2;
export const SAHAKANI3 = SAHAKANI ** 0o3;

export const HTUHUPUF2 = 0o200 * 0o10 ** 0o33 * HTUHU;

export const SACA = HTUHUPUF2 * SAHAKANI ** 0o2 / HEKE1ELU ** 0o2;

export const XAFANIKFENISAI = SACAK2FE / 0o10000 / K2FEBOLC;

export function tbo(bar6q: number): number {
  return bar6q * HEKEBAR6Q;
}

export const KNAK2FECAJASAI = "ɔıɿцэꞟɩƨ";

export function knak2fecajasai( k2fe: number, kuxa = 0o2 ): string {
  const neni = k2fe < 0o0;
  const k2feSa = 0o10 ** kuxa;
  const xekuxa = Math.round(Math.abs(k2fe) * k2feSa);
  const k2feXa = Math.floor(xekuxa / k2feSa);
  const okef = kuxa === 0o0 ? ""
    : "." + ( xekuxa % k2feSa ).toString(0o10).padStart(kuxa, "0").replace( /[0-7]/g, okef => KNAK2FECAJASAI[ Number( okef ) ] );
  return ( neni ? "-" : "" ) + "ꞙɭ" + k2feXa.toString(0o10).replace( /[0-7]/g, okef => KNAK2FECAJASAI[ Number( okef ) ] ) + okef;
}

type kanto = "stih2" | "sahakani" | "raqa" | "naxo" | "htuhu" | "saca" | "xafanikfenisai";

interface S2cax2l {
  kanto: kanto;
  k2fe: number;
}

const s2cax2l: Record<string, S2cax2l> = {
  he: { kanto: "stih2", k2fe: HEKE1ELU },
  hetoria: { kanto: "stih2", k2fe: HEKE1ELUKFEXAT2P2 },
  qe: { kanto: "stih2", k2fe: QUHE1ELU },
  haqe: { kanto: "stih2", k2fe: HAQUHE1ELU },
  she: { kanto: "stih2", k2fe: SHE1ELU },
  sqe: { kanto: "stih2", k2fe: SQE1ELU },
  shaqe: { kanto: "stih2", k2fe: SHAQE1ELU },
  s: { kanto: "stih2", k2fe: 0o1 },
  min: { kanto: "stih2", k2fe: 0o74 },
  h: { kanto: "stih2", k2fe: 0o7020 },
  h2hafaf2: { kanto: "stih2", k2fe: 0o250600 },
  peu: { kanto: "sahakani", k2fe: SAHAKANI },
  m: { kanto: "sahakani", k2fe: 0o1 },
  cm: { kanto: "sahakani", k2fe: 0o1 / 0o144 },
  km: { kanto: "sahakani", k2fe: 0o1750 },
  piispeu: { kanto: "raqa", k2fe: SAHAKANI2 },
  m2: { kanto: "raqa", k2fe: 0o1 },
  tiixpeu: { kanto: "naxo", k2fe: SAHAKANI3 },
  l: { kanto: "naxo", k2fe: 0o1 / 0o1750 },
  m3: { kanto: "naxo", k2fe: 0o1 },
  sok: { kanto: "htuhu", k2fe: HTUHUPUF2 },
  kg: { kanto: "htuhu", k2fe: 0o1 },
  g: { kanto: "htuhu", k2fe: 0o1 / 0o1750 },
  ssaca: { kanto: "saca", k2fe: SACA },
  j: { kanto: "saca", k2fe: 0o1 },
  hia: { kanto: "xafanikfenisai", k2fe: XAFANIKFENISAI },
  k: { kanto: "xafanikfenisai", k2fe: 0o1 },
};

export function tboS2cax2l(k2fe: number, l6: string, sa: string): number {
  const s2cax2lL6 = s2cax2l[l6.toLowerCase()];
  const s2cax2lSa = s2cax2l[sa.toLowerCase()];
  if ( !s2cax2lL6 || !s2cax2lSa ) throw new Error(`ſɭɜ ſȷᴜ ${!s2cax2lL6 ? l6 : sa}`);
  if ( s2cax2lL6.kanto !== s2cax2lSa.kanto ) {
    throw new Error(`ſɭɜ ſȷᴜ ${s2cax2lL6.kanto} ⟅ ${s2cax2lSa.kanto}`);
  }
  return k2fe * s2cax2lL6.k2fe / s2cax2lSa.k2fe;
}
