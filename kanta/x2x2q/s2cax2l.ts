// ≺⧼ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻

// ⟪ ſɭɜ ſɭᴜ , 📃 ⟫
// ſɭɜ ſɭᴜ , ꞙɭı ,

const CEZIAFREKVENCO = 0o104373066732;
const TORIAFREKVENCO = 0o71330627035345422;
const LUMRAPIDO = 0o2167474112;
const ATOMAMASUNUO = 0o2325145304344 / 0o1131664625026503304364046121044000000000000;
const SUKF2QRONVOLTO = 0o13737643172 / 0o10047716274370450046042000000000;
const BOLCMANAKONSTANTO = 0o5210451 / 0o120617017534665620574524000000000;

// ⟪ ſɭэ ſɭᴜ , 🕛 ⟫

// ſɭэ ſɭᴜ , ɿ^цɿ , ꞙɭı ,
export const HEPORSEKUNDO = CEZIAFREKVENCO / 0o40000000000;
export const HEPORMILISEKUNDO = HEPORSEKUNDO / 0o1750;
export const SEKUNDOJPOHE = 0o40000000000 / CEZIAFREKVENCO;
// ſɭэ ſɭᴜ , ɩэ^ц , ɿ^цɿ , ꞙɭɿ ,
export const SEKUNDOJPOHETORIA = 0o1000000 * 0o40000000000 / TORIAFREKVENCO;
export const SEKUNDOJPOQE = 0o100 * SEKUNDOJPOHE;
export const SEKUNDOJPOHAQE = 0o100 * SEKUNDOJPOQE;
export const SEKUNDOJPOSHE = 0o100 * SEKUNDOJPOHAQE;
export const SEKUNDOJPOSQE = 0o100 * SEKUNDOJPOSHE;
export const SEKUNDOJPOSHAQE = 0o100 * SEKUNDOJPOSQE;

// ⟪ ſɭэ ſɭw , 📏 ⟫

// ſɭэ ſɭw , ꞙɭı ,
export const METROJPOPEU = LUMRAPIDO / ( 0o2 * CEZIAFREKVENCO );
export const KVADRATAJMETROJPOPIISPEU = METROJPOPEU ** 0o2;
export const KUBAJMETROJPOTIIXPEU = METROJPOPEU ** 0o3;

// ⟪ ſɭᴜ ſןᴜ , ⚖️ ⟫

// ſɭᴜ ſןᴜ , ɿ^88 , ꞙɭı ,
export const KILOGRAMOJPOSOK = 0o200 * 0o10 ** 0o33 * ATOMAMASUNUO;
// ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
export const JULOJPOSSACA = KILOGRAMOJPOSOK * METROJPOPEU ** 0o2 / SEKUNDOJPOHE ** 0o2;

// ⟪ ſɭэ ſɭw , 🌡️ ⟫

// ſɭэ ſɭw , ꞙɭɿ ,
export const KELVINOJPOHIA = SUKF2QRONVOLTO / 0o10000 / BOLCMANAKONSTANTO;

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫

/* ſɭэ ſɭᴜ , ſɭэ ſɭᴜ ,
    @param milisekundoj ( number ) - ចំនួនមិល្លីវិនាទី។
@returns he
    ចំនួនហេ។ */
export function alHe(milisekundoj: number): number {
  return milisekundoj * HEPORMILISEKUNDO;
}

/* ſɭэ ſɭᴜ , ꞙɭıɔ ,
    @param skek2 ( number ) - តម្លៃដែលត្រូវសរសេរ
    @param precizeco ( number = ꞙɭɿ ) - ចំនួនខ្ទង់ក្រោយចុច
@returns s2banani */
export function alOkto( skek2: number, precizeco = 0o2 ): string {
  const negativa = skek2 < 0;
  const vap6zukani = 0o10 ** precizeco;
  const rondigita = Math.round(Math.abs(skek2) * vap6zukani);
  const enb6k61o = Math.floor(rondigita / vap6zukani);
  const doma = precizeco === 0 ? ""
    : "." + ( rondigita % vap6zukani ).toString(0o10).padStart(precizeco, "0");
  return ( negativa ? "-" : "" ) + "ꞙɭ" + enb6k61o.toString(0o10) + doma;
}

// ⟪ ſɭᴜ ſןᴜ , 📇 ⟫

type Dimensio = "tif" | "sahakani" | "areo" | "volumeno" | "maso" | "energio" | "temperaturo";

interface Unuo {
  dimensio: Dimensio;
  vap6zukani: number;
}

// ſɭэ ſɭᴜ , ꞙɭɿ ,
const UNUOJ: Record<string, Unuo> = {
  he: { dimensio: "tif", vap6zukani: SEKUNDOJPOHE },
  hetoria: { dimensio: "tif", vap6zukani: SEKUNDOJPOHETORIA },
  qe: { dimensio: "tif", vap6zukani: SEKUNDOJPOQE },
  haqe: { dimensio: "tif", vap6zukani: SEKUNDOJPOHAQE },
  she: { dimensio: "tif", vap6zukani: SEKUNDOJPOSHE },
  sqe: { dimensio: "tif", vap6zukani: SEKUNDOJPOSQE },
  shaqe: { dimensio: "tif", vap6zukani: SEKUNDOJPOSHAQE },
  s: { dimensio: "tif", vap6zukani: 1 },
  min: { dimensio: "tif", vap6zukani: 0o74 },
  h: { dimensio: "tif", vap6zukani: 0o7020 },
  h2hafaf2: { dimensio: "tif", vap6zukani: 0o250600 },
  peu: { dimensio: "sahakani", vap6zukani: METROJPOPEU },
  m: { dimensio: "sahakani", vap6zukani: 1 },
  cm: { dimensio: "sahakani", vap6zukani: 1 / 0o144 },
  km: { dimensio: "sahakani", vap6zukani: 0o1750 },
  piispeu: { dimensio: "areo", vap6zukani: KVADRATAJMETROJPOPIISPEU },
  m2: { dimensio: "areo", vap6zukani: 1 },
  tiixpeu: { dimensio: "volumeno", vap6zukani: KUBAJMETROJPOTIIXPEU },
  l: { dimensio: "volumeno", vap6zukani: 1 / 0o1750 },
  m3: { dimensio: "volumeno", vap6zukani: 1 },
  sok: { dimensio: "maso", vap6zukani: KILOGRAMOJPOSOK },
  kg: { dimensio: "maso", vap6zukani: 1 },
  g: { dimensio: "maso", vap6zukani: 1 / 0o1750 },
  ssaca: { dimensio: "energio", vap6zukani: JULOJPOSSACA },
  j: { dimensio: "energio", vap6zukani: 1 },
  hia: { dimensio: "temperaturo", vap6zukani: KELVINOJPOHIA },
  k: { dimensio: "temperaturo", vap6zukani: 1 },
};

/* ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param skek2 ( number ) - តម្លៃដើម។
    @param de ( string ) - ឈ្មោះឯកតាដើម ដូចជា he ឬ s។
    @param al ( string ) - ឈ្មោះឯកតាចុងក្រោយ ដូចជា peu ឬ m។
@returns vem2Al
    តម្លៃដែលបម្លែងរួច។ ឯកតាមិនស្គាល់ ឬវិមាត្រមិនត្រូវគ្នា បោះកំហុស។ */
export function konvertiUnuon(skek2: number, de: string, al: string): number {
  const unuoDe = UNUOJ[de.toLowerCase()];
  const unuoAl = UNUOJ[al.toLowerCase()];
  if ( !unuoDe || !unuoAl ) throw new Error(`ឯកតាមិនស្គាល់ ${!unuoDe ? de : al}`);
  if ( unuoDe.dimensio !== unuoAl.dimensio ) {
    throw new Error(`វិមាត្រមិនត្រូវគ្នា ${unuoDe.dimensio} និង ${unuoAl.dimensio}`);
  }
  return skek2 * unuoDe.vap6zukani / unuoAl.vap6zukani;
}