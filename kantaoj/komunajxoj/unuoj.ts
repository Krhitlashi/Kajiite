// ≺⧼ ឯកតា 📏 ⧽≻

// ⟪ ថេររូបវិទ្យា 📃 ⟫
// តម្លៃទាំងនេះជានិយមន័យ SI ដូច្នេះសរសេរជាផលធៀបចំនួនគត់

const CEZIA_FREKVENCO = 0o104373066732;
const TORIA_FREKVENCO = 0o71330627035345422;
const LUMRAPIDO = 0o2167474112;
const ATOMA_MASUNUO = 0o2325145304344 / 0o1131664625026503304364046121044000000000000;
const ELEKTRONVOLTO = 0o13737643172 / 0o10047716274370450046042000000000;
const BOLCMANA_KONSTANTO = 0o5210451 / 0o120617017534665620574524000000000;

// ⟪ ច្បាប់ហ្គេម 📃 ⟫

// ⟨ ភឺរ 📏 ⟩
export const PEU_POR_KODUNUO = 0o100;

// ⟪ ពេលវេលា 🕛 ⟫

// ហេ គឺ 2^32 វដ្តសេស្យូម 133
export const HE_POR_SEKUNDO = CEZIA_FREKVENCO / 0o40000000000;
export const HE_POR_MILISEKUNDO = HE_POR_SEKUNDO / 0o1750;
export const SEKUNDOJ_PO_HE = 0o40000000000 / CEZIA_FREKVENCO;
// ហេថូរៀម គឺ 64^3 × 2^32 វដ្តថូរៀម 229
export const SEKUNDOJ_PO_HE_TORIA = 0o1000000 * 0o40000000000 / TORIA_FREKVENCO;
export const SEKUNDOJ_PO_QE = 0o100 * SEKUNDOJ_PO_HE;
export const SEKUNDOJ_PO_HAQE = 0o100 * SEKUNDOJ_PO_QE;
export const SEKUNDOJ_PO_SHE = 0o100 * SEKUNDOJ_PO_HAQE;
export const SEKUNDOJ_PO_SQE = 0o100 * SEKUNDOJ_PO_SHE;
export const SEKUNDOJ_PO_SHAQE = 0o100 * SEKUNDOJ_PO_SQE;

// ⟪ វិមាត្រ 📏 ⟫

// ភឺរ គឺពាក់កណ្តាលចម្ងាយដែលពន្លឺធ្វើដំណើរក្នុងវដ្តសេស្យូមមួយ
export const METROJ_PO_PEU = LUMRAPIDO / ( 0o2 * CEZIA_FREKVENCO );
export const KVADRATAJ_METROJ_PO_PIISPEU = METROJ_PO_PEU ** 0o2;
export const KUBAJ_METROJ_PO_TIIXPEU = METROJ_PO_PEU ** 0o3;

// ⟪ ម៉ាស់ និងថាមពល ⚖️ ⟫

// សុក គឺ 2^88 ម៉ាស់អាតូមឯកតា
export const KILOGRAMOJ_PO_SOK = 0o200000000000000000000000000000 * ATOMA_MASUNUO;
// សសាច គឺ សុក × ភឺរ^2 / ហេ^2
export const JULOJ_PO_SSACA = KILOGRAMOJ_PO_SOK * METROJ_PO_PEU ** 0o2 / SEKUNDOJ_PO_HE ** 0o2;

// ⟪ សីតុណ្ហភាព 🌡️ ⟫

// ហ៊ា គឺ eV / 2^12 ចែកនឹងថេរបុលស្មាន ជាមាត្រដ្ឋានលីនេអ៊ែរគ្មានចំណុចចាប់ផ្តើម
export const KELVINOJ_PO_HIA = ELEKTRONVOLTO / 0o10000 / BOLCMANA_KONSTANTO;

// ⟪ បម្លែង 📃 ⟫

/* បម្លែងឯកតាកូដទៅជាភឺរហ្គេម
    @param kodunuoj ( number ) - ចំនួនឯកតាកូដ។
@returns peu
    ចំនួនភឺរហ្គេម មិនមែនភឺររូបវិទ្យាទេ។ */
export function alPeu(kodunuoj: number): number {
  return kodunuoj * PEU_POR_KODUNUO;
}

/* បម្លែងមិល្លីវិនាទីទៅជាហេ
    @param milisekundoj ( number ) - ចំនួនមិល្លីវិនាទី។
@returns he
    ចំនួនហេ។ */
export function alHe(milisekundoj: number): number {
  return milisekundoj * HE_POR_MILISEKUNDO;
}

// ⟪ តារាងឯកតា 📇 ⟫

type Dimensio = "tempo" | "longo" | "areo" | "volumeno" | "maso" | "energio" | "temperaturo";

interface Unuo {
  dimensio: Dimensio;
  faktoro: number;
}

// ថេរខាងក្រោមគិតជាឯកតា SI ក្នុងមួយឯកតាដើម
const UNUOJ: Record<string, Unuo> = {
  he: { dimensio: "tempo", faktoro: SEKUNDOJ_PO_HE },
  he_toria: { dimensio: "tempo", faktoro: SEKUNDOJ_PO_HE_TORIA },
  qe: { dimensio: "tempo", faktoro: SEKUNDOJ_PO_QE },
  haqe: { dimensio: "tempo", faktoro: SEKUNDOJ_PO_HAQE },
  she: { dimensio: "tempo", faktoro: SEKUNDOJ_PO_SHE },
  sqe: { dimensio: "tempo", faktoro: SEKUNDOJ_PO_SQE },
  shaqe: { dimensio: "tempo", faktoro: SEKUNDOJ_PO_SHAQE },
  s: { dimensio: "tempo", faktoro: 1 },
  min: { dimensio: "tempo", faktoro: 0o74 },
  h: { dimensio: "tempo", faktoro: 0o7020 },
  tago: { dimensio: "tempo", faktoro: 0o250600 },
  peu: { dimensio: "longo", faktoro: METROJ_PO_PEU },
  m: { dimensio: "longo", faktoro: 1 },
  cm: { dimensio: "longo", faktoro: 1 / 0o144 },
  km: { dimensio: "longo", faktoro: 0o1750 },
  piispeu: { dimensio: "areo", faktoro: KVADRATAJ_METROJ_PO_PIISPEU },
  m2: { dimensio: "areo", faktoro: 1 },
  tiixpeu: { dimensio: "volumeno", faktoro: KUBAJ_METROJ_PO_TIIXPEU },
  l: { dimensio: "volumeno", faktoro: 1 / 0o1750 },
  m3: { dimensio: "volumeno", faktoro: 1 },
  sok: { dimensio: "maso", faktoro: KILOGRAMOJ_PO_SOK },
  kg: { dimensio: "maso", faktoro: 1 },
  g: { dimensio: "maso", faktoro: 1 / 0o1750 },
  ssaca: { dimensio: "energio", faktoro: JULOJ_PO_SSACA },
  j: { dimensio: "energio", faktoro: 1 },
  hia: { dimensio: "temperaturo", faktoro: KELVINOJ_PO_HIA },
  k: { dimensio: "temperaturo", faktoro: 1 },
};

/* បម្លែងតម្លៃរវាងឯកតាពីរក្នុងវិមាត្រតែមួយ
    @param valoro ( number ) - តម្លៃដើម។
    @param de ( string ) - ឈ្មោះឯកតាដើម ដូចជា he ឬ s។
    @param al ( string ) - ឈ្មោះឯកតាចុងក្រោយ ដូចជា peu ឬ m។
@returns valoroAl
    តម្លៃដែលបម្លែងរួច។ ឯកតាមិនស្គាល់ ឬវិមាត្រមិនត្រូវគ្នា បោះកំហុស។ */
export function konvertiUnuon(valoro: number, de: string, al: string): number {
  const unuoDe = UNUOJ[de.toLowerCase()];
  const unuoAl = UNUOJ[al.toLowerCase()];
  if ( !unuoDe || !unuoAl ) throw new Error(`ឯកតាមិនស្គាល់ ${!unuoDe ? de : al}`);
  if ( unuoDe.dimensio !== unuoAl.dimensio ) {
    throw new Error(`វិមាត្រមិនត្រូវគ្នា ${unuoDe.dimensio} និង ${unuoAl.dimensio}`);
  }
  return valoro * unuoDe.faktoro / unuoAl.faktoro;
}