// ≺⧼ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ ʌ ſɭэ ֭ſɭэ 🏙️ ⧽≻
import { MONDO_HALFO } from "./havecax2l.js";
import { akvaRezulto, tsekeAkvo } from "./akvo.js";
import { bildilo3d } from "./vido3d.js";
import { vepaqTom6Kradon3D, vepaqTom6Hak6h6n3D } from "./krado3d.js";
import { kf2KradanPlanon } from "../../../kantaoj/mondo/krado/plano.js";
import { validiKradon } from "../../../kantaoj/mondo/krado/validigo.js";
import { aldoniK6h6n } from "../../../kantaoj/mondo/krado/aldonoj.js";
import { superajElDatumo, superojElDatumo } from "../../../kantaoj/mondo/krado/superoj.js";
import type { SkulptaKaxte, SkulptaK6h6, SkulptaPlatqoxa } from "../../../kantaoj/mondo/kaxte/hahunaq.js";
import type { CellType, KradaPlano } from "../../../kantaoj/mondo/krado/hahunaq.js";
import type { K6h6Punkto } from "../../../eskekoj/medio/voj-reto.js";
import { elemento, elementoj } from "../../komunajxoj/dom.js";
import { agordiMontrendajnHakaxten, foriguKaxten, montrendajHakaxte, refresxigiVidon, sekvuKaxten } from "./videco.js";
import { k6h6DuonLargho as retoK6h6DuonLargho, k6h6KunigaDuono as retoK6h6KunigaDuono,
  k6h6Projekcio as retoK6h6Projekcio,
  k6h6Vakox2q as retoK6h6Vakox2q,
  qakaj2Vakox2q as retoQakaj2Vakox2q, qakaj2KonektasK6h6n as qakaj2KonektasK6h6nReto,
  k6h6jKunfandajxoj as retoK6h6jKunfandajxoj,
  konektiQakaj2nAlK6h6 as retoKonektiQakaj2nAlK6h6,
  qakaj2LandaS2nasce as retoQakaj2LandaS2nasce,
  DOKO_PLATFORMA_SEFINI } from "../../../eskekoj/medio/voj-reto.js";

// ⟪ តំណជាមួយកម្មវិធីកែ 📃 ⟫
interface KradaLigo {
  vidCX: () => number;
  vidCZ: () => number;
  vidSkalo: () => number;
  momenti: () => void;
  statuso: ( s2banani: string ) => void;
  markiSxangxitan: () => void;
  markiDesegnon: () => void;
}
let vidCX: () => number;
let vidCZ: () => number;
let vidSkalo: () => number;
let momenti: () => void;
let statuso: ( s2banani: string ) => void;
let markiSxangxitan: () => void;
let markiDesegnon: () => void;

/* agordiKradaron ។ ការភ្ជាប់តែម្តងជាមួយឯកសារមេ។
    @param k ( KradaLigo ) - ឯកសារយោងរបស់ឯកសារមេ។ */
export function agordiKradaron(k: KradaLigo): void {
  vidCX = k.vidCX; vidCZ = k.vidCZ; vidSkalo = k.vidSkalo;
  momenti = k.momenti; statuso = k.statuso;
  markiSxangxitan = k.markiSxangxitan; markiDesegnon = k.markiDesegnon;
}

// ⟪ អនុគមន៍កំណត់ 📃 ⟫
export function agordiHakaxten(ca1ara: SkulptaKaxte[]) { hakaxte = Array.isArray(ca1ara) ? ca1ara : []; }
export function agordiElektitanKaxten(i: number) { elektitaKaxte = i; }
export function agordiElektitanAldonanBlokon(i: number) { elektitaAldonaBloko = i; }
export function agordiHak6h6n(ca1ara: SkulptaK6h6[]) { hak6h6 = Array.isArray(ca1ara) ? ca1ara : []; }
export function agordiHaqakaj2n(ca1ara: SkulptaPlatqoxa[]) { haqakaj2 = Array.isArray(ca1ara) ? ca1ara : []; }

const mapo = elemento<HTMLCanvasElement>("mapo");

export let hakaxte: SkulptaKaxte[] = [];
export let elektitaKaxte = 0;
export let kradoGrandeco = 3;
export let kradoBloko: "unu" | "kvar" = "unu";
export let kradoOfsX = 0, kradoOfsZ = 0;
export let kradoKeuxfhxeso = false;
export let kradoLampoj = true;
export let kradoHunaqElektita: CellType | "automata" = "automata";
export let kradoSuperoj: Map<string, CellType> = new Map();
export let hak6h6: SkulptaK6h6[] = [];
export let haqakaj2: SkulptaPlatqoxa[] = [];

interface SkulptaDatumoj {
  hakaxte?: SkulptaKaxte[];
  hak6h6?: SkulptaK6h6[];
  haqakaj2?: SkulptaPlatqoxa[];
}
/* agordiDatumojn ។ ការផ្ទុកដំបូងរបស់ទិន្នន័យផែនទី។
    @param datumoj ( SkulptaDatumoj ) - ទីក្រុង ផ្លូវ និងកំពង់។ */
export function agordiDatumojn(datumoj: SkulptaDatumoj): void {
  hakaxte = ( datumoj.hakaxte ?? [] ).map(u => ( { ...u } ));
  elektitaKaxte = 0;
  kradoGrandeco = hakaxte[0]?.arangxaGrando ?? 3;
  kradoBloko = hakaxte[0]?.blokaGrando ?? "unu";
  kradoOfsX = hakaxte[0]?.ofsX ?? 0;
  kradoOfsZ = hakaxte[0]?.ofsZ ?? 0;
  kradoKeuxfhxeso = !!hakaxte[0]?.keuxfhxeso;
  kradoLampoj = hakaxte[0]?.lampoj !== false;
  const datumajHak6h6 = datumoj.hak6h6 ?? [];
  hak6h6 = datumajHak6h6.length
    ? datumajHak6h6.map(v => ( { ...v, n2k: v.n2k.map(pp => [ pp[0], pp[1] ] as K6h6Punkto) } ))
    : [ { ksaka: "Kajo", sefini: 0o7/0o2, n2k: [ [ -0o124, -0o140 ], [ -0o70, -0o150 ], [ -0o60, -0o144 ], [ 0, -0o132 ], [ 0o60, -0o120 ], [ 0o70, -0o124 ], [ 0o124, -0o122 ] ] },
        { ksaka: "Avenuo", sefini: 0o7/0o2, n2k: [ [ 0o14, -0o100 ], [ 0o14, -0o130 ] ] } ];
  const datumajHaqakaj2 = datumoj.haqakaj2 ?? [];
  haqakaj2 = datumajHaqakaj2.length
    ? datumajHaqakaj2.map(d => ( { ...d } ))
    : [ { x: -0o60, z: -0o154, profundo: 0o20 }, { x: 0, z: -0o142, profundo: 0o20 }, { x: 0o60, z: -0o130, profundo: 0o20 } ];
  // ⟨ ទីក្រុងទាំងអស់បង្ហាញពីដំបូង 📃 ⟩ ។ ផ្ទាំង មើលឃើញ 👁️ អាចបិទខ្លះ ,
  // តែលំនាំដើមគឺឃើញទាំងអស់ ព្រោះទីក្រុងជារចនាសម្ព័ន្ធពិភពលោក ។
  agordiMontrendajnHakaxten(hakaxte.map(( _, i ) => i));
}

export function sinkronigiSuperojn() {
  const u = hakaxte[elektitaKaxte];
  if ( !u ) return;
  u.superoj = superojElDatumo(kradoSuperoj);
}
let kradaPlanoCache: ReturnType<typeof kf2KradanPlanon> | null = null;
export const kradaro = elemento<HTMLElement>("kradaro");
export const kradoPanel = elemento<HTMLElement>("kradoPanel");
const kaxteElektilo = elemento<HTMLSelectElement>("kaxteElektilo");
const kaxteNomoEl = elemento<HTMLInputElement>("kaxteNomo");
const kaxteAldoniBtn = elemento<HTMLButtonElement>("kaxteAldoni");
const kaxteForigiBtn = elemento<HTMLButtonElement>("kaxteForigi");
const kradoGrandecoEl = elemento<HTMLSelectElement>("kradoGrandeco");
const kradoBlokoEl = elemento<HTMLSelectElement>("kradoBloko");
const kradoOfsXEl = elemento<HTMLInputElement>("kradoOfsX");
const kradoOfsZEl = elemento<HTMLInputElement>("kradoOfsZ");
const kradoKeuxfhxesoEl = elemento<HTMLInputElement>("kradoKeuxfhxeso");
const kradoLampojEl = elemento<HTMLInputElement>("kradoLampoj");
const kradoRestarigiBtn = elemento<HTMLButtonElement>("kradoRestarigi");
const kradoKopiiBtn = elemento<HTMLButtonElement>("kradoKopii");
export let elektitaAldonaBloko = -1;
export let aldonaTrenata = -1;
const aldonaBlokoElektilo = elemento<HTMLSelectElement>("aldonaBlokoElektilo");
const aldonaBlokoHunaqEl = elemento<HTMLSelectElement>("aldonaBlokoHunaq");
const aldonaBlokoXEl = elemento<HTMLInputElement>("aldonaBlokoX");
const aldonaBlokoZEl = elemento<HTMLInputElement>("aldonaBlokoZ");
const aldonaBlokoRotEl = elemento<HTMLInputElement>("aldonaBlokoRot");
const aldonaBlokoStaciaEl = elemento<HTMLInputElement>("aldonaBlokoStacia");
const aldonaBlokoKonektitaEl = elemento<HTMLInputElement>("aldonaBlokoKonektita");
const aldonaBlokoAldoniBtn = elemento<HTMLButtonElement>("aldonaBlokoAldoni");
const aldonaBlokoForigiBtn = elemento<HTMLButtonElement>("aldonaBlokoForigi");
export let elektitaK6h6 = 0;
export let elektitaPunkto = -1;
export let elektitaQakaj2 = 0;
let k6h6Ilo: string = "movu";
type K6h6Celo = { pudal: "punkto"; k6h6: number; n2k: number }
  | { pudal: "qakaj2"; qakaj2: number }
  // ⟨ ចំណុចកំពូលកំពង់ ( ខាងទឹក ) , អូសវាដើម្បីពង្រីក/បង្រួមកំពង់ ។ 📃 ⟩
  | { pudal: "qakaj2Pinto"; qakaj2: number }
  // ⟨ ចំណុចចុងកំពង់ខាងដី , អូសវាដើម្បីផ្លាស់ទី/បង្វិលកំពង់ , ហើយវាជាចំណុច
  // ភ្ជាប់សម្រាប់ផ្លូវ ។ 📃 ⟩
  | { pudal: "qakaj2Lando"; qakaj2: number }
  | { pudal: "k6h6"; k6h6: number };
export let k6h6Trenata: K6h6Celo | null = null;
// ⟨ គោលកំពង់ខាងដី , ជាប់ពេលអូសកំពូល , ដូច្នេះកំពង់រីកចេញទៅទឹក 📃 ⟩
let qakaj2PintaBazo: { x: number; z: number; ax: number; az: number } | null = null;
// ⟨ គោលកំពង់ខាងទឹក , ជាប់ពេលអូសចុងខាងដី , ដូច្នេះចុងទឹកមិនផ្លាស់ទី 📃 ⟩
let qakaj2LandaBazo: { x: number; z: number } | null = null;
// ⟨ ប្រវែងកំពង់តិចបំផុត និងច្រើនបំផុត 📏 ⟩
export const DOKO_PROFUNDO_MIN = 4;
export const DOKO_PROFUNDO_MAKS = 0o44;
/* ចំណុចកំពូលកំពង់ ( ខាងទឹក ) ក្នុងពិភពលោក ។ ខាងដីស្ថិតនៅ + sin/cos
   ដូច្នេះកំពូលស្ថិតនៅ − sin/cos ។
    @param d ( SkulptaPlatqoxa ) - ចតុកោណ។
@returns pinto ( { x , z } ) - ចំណុចកំពូល។ */
export function qakaj2Pinto(d: SkulptaPlatqoxa): { x: number; z: number } {
  const rotacio = d.rotacio ?? 0;
  const duon = ( d.profundo || 0o20 ) / 2;
  return { x: d.x - Math.sin(rotacio) * duon, z: d.z - Math.cos(rotacio) * duon };
}
/* ចំណុចចុងកំពង់ខាងដី ( ខាងផ្លូវ ) ក្នុងពិភពលោក ។ វាជាចំណុចភ្ជាប់ដែល
   ផ្លូវអាចឈប់ត្រង់នោះដោយផ្ទាល់ ។
    @param d ( SkulptaPlatqoxa ) - ចតុកោណ។
@returns pinto ( { x , z } ) - ចំណុចចុងខាងដី។ */
export function qakaj2LandaPinto(d: SkulptaPlatqoxa): { x: number; z: number } {
  const rotacio = d.rotacio ?? 0;
  const duon = ( d.profundo || 0o20 ) / 2;
  return { x: d.x + Math.sin(rotacio) * duon, z: d.z + Math.cos(rotacio) * duon };
}

const k6h6Elektilo = elemento<HTMLSelectElement>("k6h6Elektilo");
const k6h6NomoEl = elemento<HTMLInputElement>("k6h6Nomo");
const k6h6LargxoEl = elemento<HTMLInputElement>("k6h6Largxo");
const k6h6AldoniBtn = elemento<HTMLButtonElement>("k6h6Aldoni");
const k6h6ForigiBtn = elemento<HTMLButtonElement>("k6h6Forigi");
const k6h6KonektiBtn = elemento<HTMLButtonElement>("k6h6Konekti");
const k6h6PunktoElektilo = elemento<HTMLSelectElement>("k6h6PunktoElektilo");
const k6h6PunktoAldoniBtn = elemento<HTMLButtonElement>("k6h6PunktoAldoni");
const k6h6PunktoForigiBtn = elemento<HTMLButtonElement>("k6h6PunktoForigi");
const k6h6PunktoXEl = elemento<HTMLInputElement>("k6h6PunktoX");
const k6h6PunktoZEl = elemento<HTMLInputElement>("k6h6PunktoZ");
const qakaj2Elektilo = elemento<HTMLSelectElement>("qakaj2Elektilo");
const qakaj2XEl = elemento<HTMLInputElement>("qakaj2X");
const qakaj2ZEl = elemento<HTMLInputElement>("qakaj2Z");
const qakaj2ProfundoEl = elemento<HTMLInputElement>("qakaj2Profundo");
const qakaj2RotacioEl = elemento<HTMLInputElement>("qakaj2Rotacio");
const qakaj2AldoniBtn = elemento<HTMLButtonElement>("qakaj2Aldoni");
const qakaj2ForigiBtn = elemento<HTMLButtonElement>("qakaj2Forigi");

export function kradoPlano() {
  if ( !kradaPlanoCache ) {
    const u = hakaxte[elektitaKaxte];
    kradaPlanoCache = kf2KradanPlanon(
      { arangxaGrando: kradoGrandeco, blokaGrando: kradoBloko, lampoj: kradoLampoj },
      kradoSuperoj, u && u.aldonajBlokoj ? u.aldonajBlokoj : []);
    const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
    for ( const v of hak6h6 ) {
      if ( !v.n2k || v.n2k.length < 2 ) continue;
      for ( let i = 0; i < v.n2k.length - 1; i++ ) {
        const a = v.n2k[i], b = v.n2k[i + 1];
        if ( Math.abs(a[0] - b[0]) < 0o10 ** -0o7 ) {
          const haxekuxa = a[0] - ofsX;
          if ( kradaPlanoCache.hak6h6.some(r => r.orient === "NS" && Math.abs(r.haxekuxa - haxekuxa) < 0o10 ** -0o7) )
            aldoniK6h6n(kradaPlanoCache, "NS", haxekuxa,
              Math.min(a[1], b[1]) - ofsZ, Math.max(a[1], b[1]) - ofsZ, true);
        } else if ( Math.abs(a[1] - b[1]) < 0o10 ** -0o7 ) {
          const haxekuxa = a[1] - ofsZ;
          if ( kradaPlanoCache.hak6h6.some(r => r.orient === "EW" && Math.abs(r.haxekuxa - haxekuxa) < 0o10 ** -0o7) )
            aldoniK6h6n(kradaPlanoCache, "EW", haxekuxa,
              Math.min(a[0], b[0]) - ofsX, Math.max(a[0], b[0]) - ofsX, true);
        }
      }
    }
  }
  return kradaPlanoCache;
}
// ⟪ ផែនការរបស់ទីក្រុងណាមួយ 📃 ⟫ ។ ទីក្រុងដែលកំពុងកែប្រើ kradoPlano
// ( ដែលរួមបញ្ចូលផ្លូវកម្រិតពិភពលោក ) , ទីក្រុងផ្សេងទៀតគឺផែនការមូលដ្ឋាន
// របស់ខ្លួន ។ លទ្ធផលត្រូវបានឃ្លាំងទុក ដើម្បីឱ្យការគូរទីក្រុងច្រើនមិនយឺត ។
const kaxtejPlanoj = new Map<number, KradaPlano>();
export function planoDeKaxte(i: number): KradaPlano | null {
  if ( i === elektitaKaxte ) return kradoPlano();
  const u = hakaxte[i];
  if ( !u ) return null;
  let plano = kaxtejPlanoj.get(i);
  if ( !plano ) {
    plano = kf2KradanPlanon(
      { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando, lampoj: u.lampoj !== false },
      superajElDatumo(u.superoj) ?? new Map(), u.aldonajBlokoj ?? []);
    kaxtejPlanoj.set(i, plano);
  }
  return plano;
}
/* vidotajKradoj ។ បញ្ជីទីក្រុងដែលត្រូវគូរជាមួយ ( ជាមួយផែនការ និង
   អុហ្វសិតរបស់ពួកវា ) ។ ផ្ទាំង មើលឃើញ 👁️ ជ្រើសពួកវា ។
    @returns បញ្ជី { vecax2lani, plano, ofsX, ofsZ } ( អារេ )។ */
export function vidotajKradoj() {
  const tseuni: { vecax2lani: number; plano: KradaPlano; ofsX: number; ofsZ: number }[] = [];
  for ( const i of montrendajHakaxte() ) {
    const u = hakaxte[i];
    if ( !u ) continue;
    const plano = planoDeKaxte(i);
    if ( !plano ) continue;
    tseuni.push({ vecax2lani: i, plano, ofsX: u.ofsX, ofsZ: u.ofsZ });
  }
  return tseuni;
}
export function gxisdatigiKradon() {
  kradaPlanoCache = null;
  kaxtejPlanoj.clear();
  kradoPlano();
  gxisdatigiKradajnStatistikojn();
  vepaqTom6Kradon3D();
  // ⟨ ផ្លូវសំណាញ់ក៏ប្រែប្រួលដែរ 📃 ⟩ ។ ផ្លូវរបស់ផែនការ ( និងស្ពរ ) ត្រូវបាន
  // សាងសង់ក្នុងក្រុមផ្លូវ 3D , ដូច្នេះការផ្លាស់ទំហំ ប្លុក ឬអុហ្វសិតត្រូវ
  // ធ្វើឱ្យផ្លូវស្រស់ផង ។
  if ( bildilo3d && !k6h6Trenata ) vepaqTom6Hak6h6n3D();
  markiDesegnon();
}
function gxisdatigiKradajnStatistikojn() {
  const el = elemento<HTMLElement>("kradoStatistikoj");
  if ( !el || !kradaPlanoCache ) return;
  const plano = kradaPlanoCache;
  const problemoj = validiKradon(plano).filter(p => !p.kodo.startsWith("simetrio-"));
  const kozuni = `${plano.haKekkozusai.length} ក្រឡា · ${plano.paqj.length} អគារ · ${plano.hak6h6.length} ផ្លូវ · ${plano.spronoj.length} spronoj`;
  el.textContent = problemoj.length
    ? kozuni + ` , ✗ ${problemoj.length} បញ្ហា , ${problemoj.slice(0, 3).map(p => p.kodo).join(", ")}`
    : kozuni + " , ✓ រចនាសម្ព័ន្ធត្រឹមត្រូវ";
}

export function gxisdatigiKaxteElektilon() {
  kaxteElektilo.innerHTML = "";
  hakaxte.forEach(( u, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = u.ksaka + " ( " + u.ofsX + ", " + u.ofsZ + " )";
    kaxteElektilo.appendChild(o);
  });
  kaxteElektilo.value = String(elektitaKaxte);
  kaxteNomoEl.value = hakaxte[elektitaKaxte]?.ksaka ?? "";
  kaxteForigiBtn.disabled = hakaxte.length <= 1;
  // បញ្ជីទីក្រុងរបស់ផ្ទាំង មើលឃើញ 👁️ តាមដានការបន្ថែម លុប និងឈ្មោះ
  refresxigiVidon();
}

export function elektiKaxten(i: number) {
  elektitaKaxte = Math.max(0, Math.min(hakaxte.length - 1, i));
  const u = hakaxte[elektitaKaxte];
  if ( !u ) return;
  kradoGrandeco = u.arangxaGrando;
  kradoBloko = u.blokaGrando;
  kradoOfsX = u.ofsX;
  kradoOfsZ = u.ofsZ;
  kradoKeuxfhxeso = !!u.keuxfhxeso;
  kradoLampoj = u.lampoj !== false;
  kradoSuperoj = superajElDatumo(u.superoj) ?? new Map();
  kradoGrandecoEl.value = String(kradoGrandeco);
  kradoBlokoEl.value = kradoBloko;
  kradoOfsXEl.value = String(kradoOfsX);
  kradoOfsZEl.value = String(kradoOfsZ);
  kradoKeuxfhxesoEl.checked = kradoKeuxfhxeso;
  kradoLampojEl.checked = kradoLampoj;
  kaxteNomoEl.value = u.ksaka;
  gxisdatigiKaxteElektilon();
  gxisdatigiAldonaBlokojn();
  // ទីក្រុងដែលទើបជ្រើសត្រូវបង្ហាញផងដែរ ប៉ុន្តែទីក្រុងដែលបានធីករួច
  // នៅតែបង្ហាញ ( ដូច្នេះទីក្រុងច្រើនអាចមើលបានក្នុងពេលតែមួយ ) ។
  sekvuKaxten(elektitaKaxte);
  gxisdatigiKradon();
}

function skribiElektitanKaxten() {
  const u = hakaxte[elektitaKaxte];
  if ( !u ) return;
  u.arangxaGrando = kradoGrandeco;
  u.blokaGrando = kradoBloko;
  u.ofsX = kradoOfsX;
  u.ofsZ = kradoOfsZ;
  u.keuxfhxeso = kradoKeuxfhxeso;
  u.lampoj = kradoLampoj;
  sinkronigiSuperojn();
  markiSxangxitan();
}

export function gxisdatigiAldonaBlokojn() {
  if ( !aldonaBlokoElektilo ) return;
  const u = hakaxte[elektitaKaxte];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  aldonaBlokoElektilo.innerHTML = "";
  blokoj.forEach(( b, i: number ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = ( b.stacia ? "ស្ថានីយ" : ALDONA_TIPO_NOMOJ[b.hunaq] || b.hunaq ) + ( b.konektita ? " 🛣️" : "" ) + " ( " + b.x + ", " + b.z + " )";
    aldonaBlokoElektilo.appendChild(o);
  });
  elektitaAldonaBloko = blokoj.length ? Math.max(0, Math.min(blokoj.length - 1, elektitaAldonaBloko)) : -1;
  aldonaBlokoElektilo.value = String(Math.max(0, elektitaAldonaBloko));
  aldonaBlokoForigiBtn.disabled = blokoj.length === 0;
  const b = blokoj[elektitaAldonaBloko];
  if ( b ) {
    aldonaBlokoHunaqEl.value = b.hunaq;
    aldonaBlokoXEl.value = String(b.x);
    aldonaBlokoZEl.value = String(b.z);
    aldonaBlokoRotEl.value = String(b.rot ?? 0);
    aldonaBlokoStaciaEl.checked = !!b.stacia;
    aldonaBlokoKonektitaEl.checked = !!b.konektita;
  }
  markiDesegnon();
}

function skribiAldonanBlokon() {
  const u = hakaxte[elektitaKaxte];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  const b = blokoj[elektitaAldonaBloko];
  if ( !b ) return;
  b.hunaq = aldonaBlokoHunaqEl.value as CellType;
  b.x = Math.round(( parseFloat(aldonaBlokoXEl.value) || 0 ) * 2) / 2;
  b.z = Math.round(( parseFloat(aldonaBlokoZEl.value) || 0 ) * 2) / 2;
  b.rot = parseFloat(aldonaBlokoRotEl.value) || 0;
  b.stacia = aldonaBlokoStaciaEl.checked;
  b.konektita = aldonaBlokoKonektitaEl.checked;
  markiSxangxitan();
}
const ALDONA_TIPO_NOMOJ = { sanktejo: "ទីសក្ការៈ", turo: "ប៉ម", domo: "ផ្ទះ", mangxejo: "អាហារដ្ឋាន", kasafeo: "ហាងកាហ្វេ", stacio: "ស្ថានីយ" };

export function aldonaBlokoCxePunkto(mx: number, mz: number) {
  const u = hakaxte[elektitaKaxte];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  const duonw = mapo.width / 2, duonh = mapo.height / 2;
  const sx = duonw - ( mx - vidCX() ) * vidSkalo();
  const sy = duonh - ( mz - vidCZ() ) * vidSkalo();
  for ( let i = 0; i < blokoj.length; i++ ) {
    const b = blokoj[i];
    const bx = duonw - ( kradoOfsX + b.x - vidCX() ) * vidSkalo();
    const bz = duonh - ( kradoOfsZ + b.z - vidCZ() ) * vidSkalo();
    if ( Math.hypot(bx - sx, bz - sy) < 0o16 ) return i;
  }
  return -1;
}

export function komenciAldonaTrenon(i: number) {
  if ( aldonaTrenata >= 0 ) return;
  momenti();
  aldonaTrenata = i;
  markiSxangxitan();
  statuso("ការផ្លាស់ប្តូរមិនបានរក្សាទុក");
  markiDesegnon();
}
export function sxangiAldonaXekuxan(mx: number, mz: number) {
  const u = hakaxte[elektitaKaxte];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  const b = blokoj[aldonaTrenata];
  if ( !b ) return;
  b.x = Math.round(( mx - kradoOfsX ) * 2) / 2;
  b.z = Math.round(( mz - kradoOfsZ ) * 2) / 2;
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
  markiDesegnon();
}
export function finiAldonaTrenon() {
  if ( aldonaTrenata < 0 ) return;
  aldonaTrenata = -1;
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
  markiDesegnon();
}

export function gxisdatigiK6h6jnHakaman() {
  if ( !k6h6Elektilo ) return;
  kradaPlanoCache = null;
  kaxtejPlanoj.clear();
  if ( bildilo3d && !k6h6Trenata ) vepaqTom6Hak6h6n3D();
  k6h6Elektilo.innerHTML = "";
  hak6h6.forEach(( v, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = ( v.ksaka || "ផ្លូវ" ) + " ( " + v.n2k.length + " pkt )";
    k6h6Elektilo.appendChild(o);
  });
  elektitaK6h6 = Math.max(0, Math.min(hak6h6.length - 1, elektitaK6h6));
  k6h6Elektilo.value = String(elektitaK6h6);
  k6h6ForigiBtn.disabled = hak6h6.length <= 1;
  const v = hak6h6[elektitaK6h6];
  if ( v ) {
    k6h6NomoEl.value = v.ksaka || "";
    k6h6LargxoEl.value = String(v.sefini || 0o7/0o2);
    k6h6PunktoElektilo.innerHTML = "";
    v.n2k.forEach(( p, j: number ) => {
      const o = document.createElement("option");
      o.value = String(j);
      o.textContent = "ចំណុច " + ( j + 1 ) + " ( " + p[0] + ", " + p[1] + " )";
      k6h6PunktoElektilo.appendChild(o);
    });
    elektitaPunkto = Math.max(0, Math.min(v.n2k.length - 1, elektitaPunkto));
    k6h6PunktoElektilo.value = String(elektitaPunkto);
    k6h6PunktoForigiBtn.disabled = v.n2k.length <= 2;
    const p = v.n2k[elektitaPunkto];
    if ( p ) {
      k6h6PunktoXEl.value = String(p[0]);
      k6h6PunktoZEl.value = String(p[1]);
    }
  } else {
    k6h6NomoEl.value = "";
    k6h6LargxoEl.value = "3.5";
    k6h6PunktoElektilo.innerHTML = "";
    k6h6PunktoForigiBtn.disabled = true;
  }
  qakaj2Elektilo.innerHTML = "";
  haqakaj2.forEach(( d, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = "ចតុកោណ " + ( i + 1 ) + " ( " + d.x + ", " + d.z + " )";
    qakaj2Elektilo.appendChild(o);
  });
  elektitaQakaj2 = Math.max(0, Math.min(haqakaj2.length - 1, elektitaQakaj2));
  qakaj2Elektilo.value = String(elektitaQakaj2);
  qakaj2ForigiBtn.disabled = haqakaj2.length <= 1;
  const d = haqakaj2[elektitaQakaj2];
  if ( d ) {
    qakaj2XEl.value = String(d.x);
    qakaj2ZEl.value = String(d.z);
    qakaj2ProfundoEl.value = String(d.profundo || 0o20);
    qakaj2RotacioEl.value = String(d.rotacio ?? 0);
  }
  gxisdatigiK6h6Statistikojn();
}

function skribiK6h6Sekure() {
  const v = hak6h6[elektitaK6h6];
  if ( !v ) return;
  const kopio: SkulptaK6h6 = { ...v, n2k: v.n2k.map(p => [ ...p ] as K6h6Punkto) };
  const kunfandisNe3ak2 = k6h6Vakox2q(v, elektitaK6h6);
  v.ksaka = k6h6NomoEl.value;
  v.sefini = parseFloat(k6h6LargxoEl.value) || 0o7/0o2;
  const p = v.n2k[elektitaPunkto];
  if ( p ) {
    p[0] = parseFloat(k6h6PunktoXEl.value) || 0;
    p[1] = parseFloat(k6h6PunktoZEl.value) || 0;
  }
  if ( p && ( elektitaPunkto === 0 || elektitaPunkto === v.n2k.length - 1 ) ) {
    const najbaro = elektitaPunkto === 0 ? v.n2k[1] : v.n2k[v.n2k.length - 2];
    const algluo = k6h6Algluo(p[0], p[1], elektitaK6h6, najbaro);
    if ( algluo ) {
      p[0] = algluo[0];
      p[1] = algluo[1];
    }
  }
  if ( k6h6Vakox2q(v, elektitaK6h6) && !kunfandisNe3ak2 ) {
    hak6h6[elektitaK6h6] = kopio;
    statuso("ផ្លូវកែត្រូវបានបដិសេធព្រោះត្រួតគ្នា 🛑");
  }
  markiSxangxitan();
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
}

function skribiQakaj2Sekure() {
  const d = haqakaj2[elektitaQakaj2];
  if ( !d ) return;
  const kopio = { ...d };
  const kunfandisNe3ak2 = qakaj2Vakox2q(d, elektitaQakaj2);
  // ការកែរង្វិលដោយដៃ ( វាល រង្វិល ) ស្តាប់តាមអ្វីដែលបានវាយ ។ បើ
  // រង្វិលមិនបានផ្លាស់ប្តូរ ( កែ x, z ឬ ជម្រៅ ) កំពង់ងាកទៅរកទឹក
  // ដោយស្វ័យប្រវត្តី ( ឬតភ្ជាប់ទៅផ្លូវជិត ) ។
  const antaupaRot = d.rotacio ?? 0;
  const sef4Rot = parseFloat(qakaj2RotacioEl.value) || 0;
  const rotacioMano = Math.abs(sef4Rot - antaupaRot) > 0o10 ** -0o12;
  d.x = parseFloat(qakaj2XEl.value) || 0;
  d.z = parseFloat(qakaj2ZEl.value) || 0;
  d.profundo = Math.max(4, parseFloat(qakaj2ProfundoEl.value) || 0o20);
  if ( rotacioMano ) d.rotacio = sef4Rot;
  else orientiQakaj2n(d, elektitaQakaj2);
  if ( qakaj2Vakox2q(d, elektitaQakaj2) && !kunfandisNe3ak2 ) {
    haqakaj2[elektitaQakaj2] = kopio;
    statuso("ចតុកោណកែត្រូវបានបដិសេធព្រោះត្រួតគ្នា 🛑");
  }
  markiSxangxitan();
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
}

function gxisdatigiK6h6Statistikojn() {
  const el = elemento<HTMLElement>("k6h6Statistikoj");
  if ( !el ) return;
  const sahakani = hak6h6.reduce(( s, v ) => s + v.n2k.reduce(( a, p, i: number ) => {
    if ( i === 0 ) return a;
    const q = v.n2k[i - 1];
    return a + Math.hypot(p[0] - q[0], p[1] - q[1]);
  }, 0), 0);
  const kunfandajxoj = k6h6jKunfandajxoj();
  el.textContent = hak6h6.length + " ផ្លូវ ( " + sahakani.toFixed(1) + " un ) · "
    + haqakaj2.length + " ចតុកោណ · " + k6h6Haveb6kek() + " ការភ្ជាប់ 🔗 · "
    + ( kunfandajxoj.totalo ? kunfandajxoj.totalo + " ការត្រួតគ្នា ( "
      + kunfandajxoj.k6h6K6h6 + " ផ្លូវ-ផ្លូវ , " + kunfandajxoj.k6h6Qakaj2
      + " ផ្លូវ-ចតុកោណ , " + kunfandajxoj.qakaj2Qakaj2 + " ចតុកោណ-ចតុកោណ ) ⚠️" : "0 ការត្រួតគ្នា ✓" );
}

function k6h6Haveb6kek() {
  let haveb6kek = 0;
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    const v = hak6h6[vi];
    if ( v.n2k.length < 2 ) continue;
    for ( const pi of [ 0, v.n2k.length - 1 ] ) {
      const p = v.n2k[pi];
      const najbaro = pi === 0 ? v.n2k[1] : v.n2k[v.n2k.length - 2];
      if ( k6h6Algluo(p[0], p[1], vi, najbaro) ) haveb6kek++;
    }
  }
  for ( const d of haqakaj2 ) {
    if ( hak6h6.some(v => qakaj2KonektasK6h6n(d, v)) ) haveb6kek++;
  }
  return haveb6kek;
}

const VOJA_TUSXA_TOLERANCO = 0o1/0o1000;

export function k6h6DuonLargho(v: SkulptaK6h6): number {
  return retoK6h6DuonLargho(v);
}

function k6h6KunigaDuono(v: SkulptaK6h6): number {
  return retoK6h6KunigaDuono(v);
}

export function pontoDuonLargho(v: SkulptaK6h6): number {
  return retoK6h6DuonLargho(v);
}

function k6h6Vakox2q(v: SkulptaK6h6, kromK6h6: number): boolean {
  return retoK6h6Vakox2q(v, hak6h6, haqakaj2, kromK6h6);
}

function qakaj2Vakox2q(d: SkulptaPlatqoxa, kromQakaj2: number, kromK6h6 = -1): boolean {
  return retoQakaj2Vakox2q(d, haqakaj2, hak6h6, kromQakaj2, kromK6h6);
}

function qakaj2KonektasK6h6n(d: SkulptaPlatqoxa, v: SkulptaK6h6): boolean {
  return qakaj2KonektasK6h6nReto(d, v);
}

function k6h6Projekcio(px: number, pz: number, a: K6h6Punkto, b: K6h6Punkto) {
  return retoK6h6Projekcio(px, pz, a, b);
}

function konektiQakaj2nAlK6h6(d: SkulptaPlatqoxa, kromQakaj2: number) {
  const akvas = akvaRezulto ? tsekeAkvo : undefined;
  return retoKonektiQakaj2nAlK6h6(d, hak6h6, haqakaj2, kromQakaj2, akvas);
}

function konektiHaqakaj2nAlHak6h6n() {
  let haveb6kek = 0;
  for ( let di = 0; di < haqakaj2.length; di++ ) {
    if ( konektiQakaj2nAlK6h6(haqakaj2[di], di) ) haveb6kek++;
  }
  return haveb6kek;
}

// ⟨ កំពង់ងាកទៅរកទឹក 📃 ⟩
// កំពង់ងាកខ្លួនឯងទៅរកទឹកដោយស្វ័យប្រវត្តី ។ រង្វង់ទិស ៣០ និងបីរយាង
// ក្នុងទិសនីមួយៗ ផ្ទៀងផ្ទាត់ថាខាងសមុទ្រ ( ទិសផ្ទុយនឹងទិសដី ) ជាទឹក
// ហើយខាងដីនៅពីក្រោយស្ងួត ។ ពិន្ទុច្រើនឈ្នះ ហើយពិន្ទុស្មើគ្នាទុក
// ទិសបច្ចុប្បន្ន ដូច្នេះកំពង់មិនញ័រ ។
const DOKO_AKVA_PASOJ = 0o40;
const DOKO_AKVA_MULTOJ = [ 0o1/0o2, 1, 0o7/0o4, 3, 0o5 ];
const DOKO_AKVA_FLANKOJ = [ -0o3/0o5, 0, 0o3/0o5 ];
function distoAnguloj(a: number, b: number): number {
  const d = Math.abs(a - b) % ( 2 * Math.PI );
  return Math.min(d, 2 * Math.PI - d);
}
function akvaAngulo(d: SkulptaPlatqoxa): number | null {
  if ( !akvaRezulto ) return null;
  const duon = ( d.profundo || 0o20 ) / 2;
  const nuna = d.rotacio ?? 0;
  let plejAngulo = nuna, plejPoento = -Infinity;
  for ( let i = 0; i < DOKO_AKVA_PASOJ; i++ ) {
    const ang = i * 2 * Math.PI / DOKO_AKVA_PASOJ;
    const sx = -Math.sin(ang), sz = -Math.cos(ang);   // ទិសទៅសមុទ្រ
    let poento = 0;
    for ( const mult of DOKO_AKVA_MULTOJ ) {
      const r = duon * mult;
      for ( const kanto of DOKO_AKVA_FLANKOJ ) {
        if ( tsekeAkvo(d.x + sx * r - sz * r * kanto, d.z + sz * r + sx * r * kanto) ) poento += mult;
      }
    }
    if ( !tsekeAkvo(d.x - sx * duon * 0o3, d.z - sz * duon * 0o3) ) poento += 0o1/0o2;
    if ( poento > plejPoento + 0o10 ** -0o12
      || ( Math.abs(poento - plejPoento) <= 0o10 ** -0o12
        && distoAnguloj(ang, nuna) < distoAnguloj(plejAngulo, nuna) ) ) {
      plejPoento = poento;
      plejAngulo = ang;
    }
  }
  return plejPoento > 0 ? plejAngulo : null;
}
/* orientiQakaj2n ។ ងាកកំពង់ឱ្យងាកទៅរកទឹក ។ បើមានផ្លូវជិត វាតភ្ជាប់ខ្លួន
   ទៅផ្លូវ ( ជម្រើសណាមួយនៃសស្រាដែលងាកទៅទឹក ) ដូច្នេះការតភ្ជាប់
   ផ្លូវនៅតែរក្សាទុក ។ បើគ្មានផ្លូវ វាងាកតាមទិសទឹក ។
    @param d ( SkulptaPlatqoxa ) - ចតុកោណ។
    @param kromQakaj2 ( number = -1 ) - ចតុកោណដែលមិនគិត។
@returns តើការងាកត្រូវបានផ្លាស់ប្តូរ ( boolean )។ */
export function orientiQakaj2n(d: SkulptaPlatqoxa, kromQakaj2 = -1): boolean {
  const antaupa = d.rotacio ?? 0;
  if ( konektiQakaj2nAlK6h6(d, kromQakaj2) ) return ( d.rotacio ?? 0 ) !== antaupa;
  const tafkaq = akvaAngulo(d);
  if ( tafkaq === null || Math.abs(tafkaq - antaupa) < 0o10 ** -0o12 ) return false;
  if ( qakaj2Vakox2q({ ...d, rotacio: tafkaq }, kromQakaj2) ) return false;
  d.rotacio = tafkaq;
  return true;
}

function k6h6jKunfandajxoj() {
  return retoK6h6jKunfandajxoj(hak6h6, haqakaj2);
}

export function kaxteCxePunkto(mx: number, mz: number) {
  const duonw = mapo.width / 2, duonh = mapo.height / 2;
  const sx = duonw - ( mx - vidCX() ) * vidSkalo();
  const sy = duonh - ( mz - vidCZ() ) * vidSkalo();
  for ( let i = 0; i < hakaxte.length; i++ ) {
    const u = hakaxte[i];
    const ux = duonw - ( u.ofsX - vidCX() ) * vidSkalo();
    const uz = duonh - ( u.ofsZ - vidCZ() ) * vidSkalo();
    if ( Math.hypot(ux - sx, uz - sy) < 0o14 ) return i;
  }
  return -1;
}

/* តំបន់ប៉ះក្នុងឯកតាពិភពលោកសម្រាប់ចំណុចប៉ះជាភីកសែលអេក្រង់ CSS ។
   ផ្ទាំងគំនូស 900px អាចត្រូវបានបង្ហាញតូចជាង ដូច្នេះ 8px អេក្រង់
   គឺជាចំនួនភីកសែលឧបករណ៍តិចតួច ( មុនទំព័រនេះប្រើភីកសែល
   ខ្នាតផ្ទាំងគំនូស ដូច្នេះការចុចចំណុចពិបាកណាស់ក្នុងបង្អួចតូច )។
    @param r ( number ) - ផ្ទៃប៉ះជាភីកសែលអេក្រង់។
@returns កាំជាឯកតាពិភពលោក ( number )។ */
function tuxaMondo(r: number): number {
  const rekt = mapo.getBoundingClientRect();
  const larghxo = rekt.width || mapo.width;
  return r * ( mapo.width / larghxo ) / vidSkalo();
}
function k6h6CeloCxePunkto(mx: number, mz: number, ignoriPunktojn = false): K6h6Celo | null {
  const r = tuxaMondo(0o10);
  let plej: K6h6Celo | null = null, plejD = r;
  if ( !ignoriPunktojn ) {
    for ( let vi = 0; vi < hak6h6.length; vi++ ) {
      const v = hak6h6[vi];
      for ( let pi = 0; pi < v.n2k.length; pi++ ) {
        const p = v.n2k[pi];
        const d = Math.hypot(p[0] - mx, p[1] - mz);
        if ( d < plejD ) { plejD = d; plej = { pudal: "punkto", k6h6: vi, n2k: pi }; }
      }
    }
    if ( plej ) return plej;
  }
  // ⟨ ចំណុចចុងកំពង់ទាំងពីរ 📃 ⟩ , ខាងទឹក ( អូស = ពង្រីក ) និងខាងដី
  // ( អូស = ផ្លាស់ទី/បង្វិល , ហើយជាចំណុចភ្ជាប់ផ្លូវ ) ។ ជ្រើសចំណុចជិតបំផុត ។
  let plejQakaj2: { pudal: "qakaj2Pinto" | "qakaj2Lando"; qakaj2: number } | null = null;
  let plejQakaj2D = r;
  for ( let di = 0; di < haqakaj2.length; di++ ) {
    for ( const [ pudal, pinto ] of [ [ "qakaj2Pinto", qakaj2Pinto(haqakaj2[di]) ],
      [ "qakaj2Lando", qakaj2LandaPinto(haqakaj2[di]) ] ] as [ "qakaj2Pinto" | "qakaj2Lando", { x: number; z: number } ][] ) {
      const d = Math.hypot(pinto.x - mx, pinto.z - mz);
      if ( d < plejQakaj2D ) { plejQakaj2D = d; plejQakaj2 = { pudal, qakaj2: di }; }
    }
  }
  if ( plejQakaj2 ) return plejQakaj2;
  for ( let di = 0; di < haqakaj2.length; di++ ) {
    const d = haqakaj2[di];
    const prof = d.profundo || 0o20;
    const rotacio = d.rotacio ?? 0;
    const dx = mx - d.x, dz = mz - d.z;
    const lx = dx * Math.cos(rotacio) - dz * Math.sin(rotacio);
    const lz = dx * Math.sin(rotacio) + dz * Math.cos(rotacio);
    if ( Math.abs(lx) < 0o16/0o10 + 0o5/0o2 && Math.abs(lz) < prof / 2 + 0o5/0o2 ) return { pudal: "qakaj2", qakaj2: di };
  }
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    const v = hak6h6[vi];
    for ( let pi = 0; pi < v.n2k.length - 1; pi++ ) {
      const a = v.n2k[pi], b = v.n2k[pi + 1];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const t = Math.max(0, Math.min(1, ( ( mx - a[0] ) * ( b[0] - a[0] ) + ( mz - a[1] ) * ( b[1] - a[1] ) ) / ( l * l )));
      const d = Math.hypot(a[0] + t * ( b[0] - a[0] ) - mx, a[1] + t * ( b[1] - a[1] ) - mz);
      if ( d < ( v.sefini || 0o7/0o2 ) / 2 + 0o3/0o2 + r ) return { pudal: "k6h6", k6h6: vi };
    }
  }
  return null;
}

export function sxangxiK6h6nCelon(mx: number, mz: number) {
  // ឧបករណ៍បន្ថែម មិនគិតពីចំណុចដែលមានរួចទេ ដូច្នេះការចុចលើផ្លូវ
  // ដាក់ចំណុចថ្មី ( ចំណុចទ្វេត្រូវលុបចេញដោយស្វ័យប្រវត្តី ) ។
  const proks = k6h6CeloCxePunkto(mx, mz, k6h6Ilo === "aldoni");
  if ( k6h6Ilo === "forigi" ) {
    if ( proks && proks.pudal === "punkto" ) { forigiK6h6nPunkton(proks.k6h6, proks.n2k); return; }
    statuso("ចុចលើចំណុចផ្លូវដើម្បីលុបវា 📍 ( ផ្លូវមួយត្រូវការចំណុចយ៉ាងតិចពីរ )");
    return;
  }
  if ( k6h6Ilo === "aldoni" ) {
    // បន្ថែមចំណុចនៅទីដែលចុច ។ ចុចលើផ្លូវ = បន្ថែមក្នុងផ្លូវនោះ ។ ចុច
    // កន្លែងទំនេរ = បន្ថែមក្នុងផ្លូវដែលបានជ្រើស ។
    const vi = proks && proks.pudal === "k6h6" ? proks.k6h6 : elektitaK6h6;
    aldoniK6h6nPunkton(vi, mx, mz);
    return;
  }
  if ( proks && proks.pudal === "punkto" ) {
    elektitaK6h6 = proks.k6h6;
    elektitaPunkto = proks.n2k;
    if ( k6h6Ilo === "movu" ) komenciK6h6Trenon({ pudal: "punkto", k6h6: proks.k6h6, n2k: proks.n2k });
  } else if ( proks && proks.pudal === "qakaj2Pinto" ) {
    elektitaQakaj2 = proks.qakaj2;
    if ( k6h6Ilo === "movu" ) komenciK6h6Trenon({ pudal: "qakaj2Pinto", qakaj2: proks.qakaj2 });
  } else if ( proks && proks.pudal === "qakaj2" ) {
    elektitaQakaj2 = proks.qakaj2;
    if ( k6h6Ilo === "movu" ) komenciK6h6Trenon({ pudal: "qakaj2", qakaj2: proks.qakaj2 });
  } else if ( proks && proks.pudal === "k6h6" ) {
    elektitaK6h6 = proks.k6h6;
    elektitaPunkto = -1;
  } else {
    elektitaPunkto = -1;
  }
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
}

function komenciK6h6Trenon(celo: K6h6Celo): void {
  if ( k6h6Trenata ) return;
  momenti();
  qakaj2PintaBazo = null;
  qakaj2LandaBazo = null;
  if ( celo.pudal === "qakaj2Pinto" ) {
    const d = haqakaj2[celo.qakaj2];
    if ( !d ) return;
    // ⟨ គោលដី = ចំណុចកណ្តាល + ប្រវែង/២ ទៅខាងដី ; អ័ក្ស A ទៅខាងទឹក 📃 ⟩
    const rotacio = d.rotacio ?? 0;
    const duon = ( d.profundo || 0o20 ) / 2;
    const sx = Math.sin(rotacio), cz = Math.cos(rotacio);
    qakaj2PintaBazo = { x: d.x + sx * duon, z: d.z + cz * duon, ax: -sx, az: -cz };
  } else if ( celo.pudal === "qakaj2Lando" ) {
    const d = haqakaj2[celo.qakaj2];
    if ( !d ) return;
    // ⟨ គោលទឹក , ចំណុចចុងខាងទឹកនៅស្ថិត , ចុងខាងដីដើរតាមទ្រនិច 📃 ⟩
    const pinto = qakaj2Pinto(d);
    qakaj2LandaBazo = { x: pinto.x, z: pinto.z };
  }
  k6h6Trenata = celo;
  markiSxangxitan();
  statuso("ការផ្លាស់ប្តូរមិនបានរក្សាទុក");
  markiDesegnon();
}

function kradaK6h6Alglu(mx: number, mz: number) {
  // ⟨ ចំណុចប្រសព្វសំណាញ់ 🎯 ⟩ , ការភ្ជាប់ផ្លូវទៅផ្លូវសំណាញ់ត្រូវទៅចំចំណុចប្រសព្វ
  // ( មិនមែនកណ្តាលចម្រៀក ) ដូច្នេះចានភ្ជាប់និងជ្រុងផ្លូវលេចឡើង ។
  const pinto = plejProksimaPinto(kradajPintoj(), mx, mz);
  if (pinto) return [ pinto[0], pinto[1] ];
  const plano = kradoPlano();
  const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
  const pukaz = 0o5/0o2;
  let plej = null, plejD = pukaz;
  for ( const r of plano.hak6h6 ) {
    if ( r.orient === "NS" ) {
      const wx = ofsX + r.haxekuxa;
      const d = Math.abs(mx - wx);
      if ( d < plejD ) { plejD = d; plej = [ wx, Math.round(mz * 2) / 2 ]; }
    } else {
      const wz = ofsZ + r.haxekuxa;
      const d = Math.abs(mz - wz);
      if ( d < plejD ) { plejD = d; plej = [ Math.round(mx * 2) / 2, wz ]; }
    }
  }
  return plej;
}
function kradaS2nasceAlglu(ax: number, az: number, bx: number, bz: number) {
  const plano = kradoPlano();
  const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
  const pukaz = 0o5/0o2;
  const dx = bx - ax, dz = bz - az;
  if ( Math.hypot(dx, dz) < 0o10 ** -0o7 ) return null;
  if ( Math.abs(dx) <= 0o1/0o4 * Math.abs(dz) ) {
    let plej = null, plejD = pukaz;
    for ( const r of plano.hak6h6 ) {
      if ( r.orient !== "NS" ) continue;
      const wx = ofsX + r.haxekuxa;
      const d = Math.max(Math.abs(ax - wx), Math.abs(bx - wx));
      if ( d < plejD ) { plejD = d; plej = wx; }
    }
    if ( plej !== null ) return { linioX: plej, linioZ: null };
  }
  if ( Math.abs(dz) <= 0o1/0o4 * Math.abs(dx) ) {
    let plej = null, plejD = pukaz;
    for ( const r of plano.hak6h6 ) {
      if ( r.orient !== "EW" ) continue;
      const wz = ofsZ + r.haxekuxa;
      const d = Math.max(Math.abs(az - wz), Math.abs(bz - wz));
      if ( d < plejD ) { plejD = d; plej = wz; }
    }
    if ( plej !== null ) return { linioX: null, linioZ: plej };
  }
  return null;
}
// ⟪ ការបិទភ្ជាប់ចំណុច 🎯 ⟫
// ⟨ ចំណុចភ្ជាប់ , មិនមែនគែមផ្លូវ 📃 ⟩ គឺផ្លូវពីរភ្ជាប់គ្នាបានល្អតែពេលចុងជួប
// ចំណុចតែមួយ , ចំណុចប្រសព្វសំណាញ់ទីក្រុង , កំពូលផ្លូវ , ឬមាត់កំពង់ ។
// ការបិទភ្ជាប់ទៅគែមផ្លូវបង្កើតចុងកណ្តាលផ្លូវ ដែលមើលទៅដូចផ្លូវកាត់ ។
const VOJA_PINTA_RANDO = 0o5/0o2;
// ⟨ ការឃ្លាំងទុក , ចំណុចសំណាញ់គឺថេរតាមផែនការ 📃 ⟩ ។ ការគណនាដំបូងគឺ
// O ( ns × ew ) , ដូច្នេះវាត្រូវធ្វើតែម្តងក្នុងមួយផែនការ ( ការអូសហៅវារាល់
// ចលនាកណ្ដុរ ) ។ ផែនការថ្មី = វត្ថុថ្មី , ដូច្នេះ WeakMap គឺជាការឃ្លាំងត្រឹមត្រូវ ។
const kradajPintajKasxoj = new WeakMap<KradaPlano, K6h6Punkto[]>();
/* ចំណុចភ្ជាប់របស់ផែនការមួយ , ធៀបនឹងចំណុចកណ្តាលសំណាញ់
@param plano ( KradaPlano ) - ផែនការ
@returns n2k ( [ number , number ] [ ] ) - ចំណុចមូលដ្ឋាន */
function kradajRelativajPintoj(plano: KradaPlano): K6h6Punkto[] {
  const kasxita = kradajPintajKasxoj.get(plano);
  if (kasxita) return kasxita;
  const arto = new Map<string, K6h6Punkto>();
  const tlunakani = (x: number, z: number): void => {
    const ca3aq = x + "," + z;
    if (!arto.has(ca3aq)) arto.set(ca3aq, [ x, z ]);
  };
  const ns = plano.hak6h6.filter(r => r.orient === "NS");
  const ew = plano.hak6h6.filter(r => r.orient === "EW");
  for (const r of ns) { tlunakani(r.haxekuxa, r.de); tlunakani(r.haxekuxa, r.al); }
  for (const r of ew) { tlunakani(r.de, r.haxekuxa); tlunakani(r.al, r.haxekuxa); }
  for (const a of ns) for (const b of ew) {
    if (b.haxekuxa < a.de - 0o10 ** -0o7 || b.haxekuxa > a.al + 0o10 ** -0o7) continue;
    if (a.haxekuxa < b.de - 0o10 ** -0o7 || a.haxekuxa > b.al + 0o10 ** -0o7) continue;
    tlunakani(a.haxekuxa, b.haxekuxa);
  }
  for (const s of plano.spronoj) {
    tlunakani(s.de[0], s.de[1]);
    tlunakani(s.al[0], s.al[1]);
  }
  const tseuni = [ ...arto.values() ];
  kradajPintajKasxoj.set(plano, tseuni);
  return tseuni;
}
/* ចំណុចភ្ជាប់របស់ផ្លូវសំណាញ់ ( ចុងចម្រៀក , ចំណុចប្រសព្វ , និងចុងស្ពន )
@returns n2k ( [ number , number ] [ ] ) - ចំណុចក្នុងពិភពលោក */
function kradajPintoj(): K6h6Punkto[] {
  const n2k: K6h6Punkto[] = [];
  const viditaj = new Set<string>();
  for (const k of vidotajKradoj()) {
    for (const p of kradajRelativajPintoj(k.plano)) {
      const x = k.ofsX + p[0], z = k.ofsZ + p[1], ca3aq = x + "," + z;
      if (viditaj.has(ca3aq)) continue;
      viditaj.add(ca3aq);
      n2k.push([ x, z ]);
    }
  }
  return n2k;
}
/* គ្រប់ចំណុចដែលផ្លូវអាចបិទភ្ជាប់ （ កំពូលផ្លូវផ្សេង , មាត់កំពង់ , ចំណុចសំណាញ់ ）
@param kromK6h6 ( number = -1 ) - ផ្លូវដែលមិនគិត（ ខ្លួនវា ）
@returns n2k ( [ number , number ] [ ] ) - ចំណុចក្នុងពិភពលោក */
function pintajAlgluoj(kromK6h6 = -1): K6h6Punkto[] {
  const n2k = kradajPintoj();
  const viditaj = new Set<string>(n2k.map(p => p[0] + "," + p[1]));
  const tlunakani = (x: number, z: number): void => {
    const ca3aq = x + "," + z;
    if (viditaj.has(ca3aq)) return;
    viditaj.add(ca3aq);
    n2k.push([ x, z ]);
  };
  for (let vi = 0; vi < hak6h6.length; vi++) {
    if (vi === kromK6h6) continue;
    for (const p of hak6h6[vi].n2k) tlunakani(p[0], p[1]);
  }
  for (const d of haqakaj2) {
    const r = retoQakaj2LandaS2nasce(d);
    tlunakani(r.x, r.z);
  }
  return n2k;
}
/* ចំណុចភ្ជាប់ជិតបំផុតក្នុងរង្វង់បិទភ្ជាប់
@param n2k ( [ number , number ] [ ] ) - បញ្ជីចំណុច
@param mx, mz ( number ) - ទ្រនិច
@returns n2k ( [ number , number ] | null ) - ចំណុចឬ null */
function plejProksimaPinto(n2k: K6h6Punkto[], mx: number, mz: number): K6h6Punkto | null {
  let plej: K6h6Punkto | null = null, plejD = VOJA_PINTA_RANDO;
  for (const p of n2k) {
    const d = Math.hypot(p[0] - mx, p[1] - mz);
    if (d < plejD) { plejD = d; plej = p; }
  }
  return plej;
}

// ⟨ ការតភ្ជាប់ស្វ័យប្រវត្តិនៃផ្លូវ 📃 ⟩
const VOJA_ALGLUA_RANDO = 0o5/0o2;
function k6h6Algluo(mx: number, mz: number, kromK6h6: number, najbaro: K6h6Punkto | null = null) {
  // ⟨ ចំណុចភ្ជាប់ឈ្នះមុន 📃 ⟩ , បើចុងផ្លូវនៅជិតកំពូលផ្លូវផ្សេង , មាត់កំពង់ ,
  // ឬចំណុចប្រសព្វសំណាញ់ ចុងនោះត្រូវទៅចំចំណុចនោះ ។
  const pinto = plejProksimaPinto(pintajAlgluoj(kromK6h6), mx, mz);
  if (pinto) return [ pinto[0], pinto[1] ];
  let plej = null, plejD = Infinity;
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    if ( vi === kromK6h6 ) continue;
    const v = hak6h6[vi];
    const p2somani = k6h6KunigaDuono(v);
    const pukaz = VOJA_ALGLUA_RANDO + p2somani;
    for ( let pi = 0; pi < v.n2k.length - 1; pi++ ) {
      const a = v.n2k[pi], b = v.n2k[pi + 1];
      const projekcio = k6h6Projekcio(mx, mz, a, b);
      if ( !projekcio || projekcio.d > pukaz ) continue;
      const dx = b[0] - a[0], dz = b[1] - a[1], sahakani = Math.hypot(dx, dz);
      const nx = -dz / sahakani, nz = dx / sahakani;
      // ⟨ ចុងជួបចុង 📃 ⟩ ។ បើចំណុចធ្លាក់នៅជិតចុងផ្លូវផ្សេង ( ជ្រុង ឬផ្លូវ
      // បន្តគ្នា ) តភ្ជាប់នៅចុងនោះផ្ទាល់ ជំនួសឱ្យបញ្ជូលទៅគែមដែល
      // ធ្វើឱ្យចុងផ្លូវលោតថ្លេងកណ្តាលទទឹងផ្លូវ ។
      if ( sahakani > 0 ) {
        const finoA = projekcio.t * sahakani <= VOJA_ALGLUA_RANDO;
        const finoB = ( 1 - projekcio.t ) * sahakani <= VOJA_ALGLUA_RANDO;
        if ( finoA || finoB ) {
          const tlakakani = finoA && ( !finoB
            || Math.hypot(a[0] - mx, a[1] - mz) <= Math.hypot(b[0] - mx, b[1] - mz) ) ? a : b;
          const dFino = Math.hypot(tlakakani[0] - mx, tlakakani[1] - mz);
          if ( dFino < plejD ) { plejD = dFino; plej = [ tlakakani[0], tlakakani[1] ]; }
        }
      }
      const flankX = najbaro ? najbaro[0] : mx, flankZ = najbaro ? najbaro[1] : mz;
      const flankoValoro = ( flankX - projekcio.x ) * nx + ( flankZ - projekcio.z ) * nz;
      const kanto = Math.abs(flankoValoro) < VOJA_TUSXA_TOLERANCO
        ? ( ( mx - projekcio.x ) * nx + ( mz - projekcio.z ) * nz >= 0 ? 1 : -1 )
        : ( flankoValoro >= 0 ? 1 : -1 );
      const kandidato = [ projekcio.x + nx * p2somani * kanto, projekcio.z + nz * p2somani * kanto ];
      const kandidataD = Math.hypot(kandidato[0] - mx, kandidato[1] - mz);
      if ( kandidataD < plejD ) { plejD = kandidataD; plej = kandidato; }
    }
  }
  for ( let di = 0; di < haqakaj2.length; di++ ) {
    const d = haqakaj2[di], r = retoQakaj2LandaS2nasce(d);
    const projekcio = k6h6Projekcio(mx, mz, [ r.x - r.dx * DOKO_PLATFORMA_SEFINI / 2, r.z - r.dz * DOKO_PLATFORMA_SEFINI / 2 ],
      [ r.x + r.dx * DOKO_PLATFORMA_SEFINI / 2, r.z + r.dz * DOKO_PLATFORMA_SEFINI / 2 ]);
    if ( !projekcio || projekcio.d > VOJA_ALGLUA_RANDO + DOKO_PLATFORMA_SEFINI / 2 ) continue;
    const kandidataD = Math.hypot(projekcio.x - mx, projekcio.z - mz);
    if ( kandidataD < plejD ) { plejD = kandidataD; plej = [ projekcio.x, projekcio.z ]; }
  }
  return plej;
}

function forigiDuoblajnPunktojn(v: SkulptaK6h6): number {
  let forigitaj = 0;
  for ( let i = v.n2k.length - 1; i > 0 && v.n2k.length > 2; i-- ) {
    const a = v.n2k[i], b = v.n2k[i - 1];
    if ( Math.hypot(a[0] - b[0], a[1] - b[1]) < 0o10 ** -0o7 ) { v.n2k.splice(i, 1); forigitaj++; }
  }
  return forigitaj;
}

function konektiK6h6jnFinojn() {
  let haveb6kek = 0;
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    const v = hak6h6[vi];
    if ( !v.n2k || v.n2k.length < 2 ) continue;
    const z2hak = v.n2k.length - 1;
    for ( const pi of [ 0, z2hak ] ) {
      const p = v.n2k[pi], s23ohk2sai = [ p[0], p[1] ];
      const najbaro = pi === 0 ? v.n2k[1] : v.n2k[z2hak - 1];
      const algluo = k6h6Algluo(p[0], p[1], vi, najbaro);
      if ( !algluo ) continue;
      if ( Math.hypot(algluo[0] - p[0], algluo[1] - p[1]) < 0o10 ** -0o7 ) continue;
      const kiuKunfandisNe3ak2 = k6h6Vakox2q(v, vi);
      p[0] = algluo[0];
      p[1] = algluo[1];
      if ( k6h6Vakox2q(v, vi) && ! kiuKunfandisNe3ak2 ) {
        p[0] = s23ohk2sai[0];
        p[1] = s23ohk2sai[1];
        continue;
      }
      haveb6kek++;
    }
    forigiDuoblajnPunktojn(v);
  }
  return haveb6kek;
}

export function sxangiK6h6Xekuxan(mx: number, mz: number) {
  if ( !k6h6Trenata ) return;
  const c = k6h6Trenata;
  if ( c.pudal === "punkto" ) {
    const v = hak6h6[c.k6h6];
    if ( !v || !v.n2k[c.n2k] ) return;
    const pi = c.n2k;
    const s23ohk2saij = new Map();
    for ( const ni of [ pi - 1, pi, pi + 1 ] ) {
      if ( ni >= 0 && ni < v.n2k.length ) s23ohk2saij.set(ni, [ ...v.n2k[ni] ]);
    }
    const kradaAlgluo = kradaK6h6Alglu(mx, mz);
    const najbaro = pi > 0 ? v.n2k[pi - 1] : v.n2k[1];
    const k6h6 = k6h6Algluo(mx, mz, c.k6h6, najbaro);
    // ⟨ បិទភ្ជាប់ណាជិតជាងគេ 📃 ⟩ ក្រឡាទីក្រុង ឬចុង/គែមផ្លូវផ្សេង ។
    // មុនក្រឡាតែងឈ្នះ ដែលធ្វើឱ្យចំណុចលោតចេញពីផ្លូវដែលកំពុងតភ្ជាប់
    // ពេលមានទាំងពីរនៅជិតគ្នា ។
    const dKrada = kradaAlgluo ? Math.hypot(kradaAlgluo[0] - mx, kradaAlgluo[1] - mz) : Infinity;
    const dK6h6 = k6h6 ? Math.hypot(k6h6[0] - mx, k6h6[1] - mz) : Infinity;
    // ⟨ ចំណុចភ្ជាប់ឈ្នះមុន 📃 ⟩ , ការភ្ជាប់ផ្លូវទៅផ្លូវត្រូវនៅចំចំណុចតែមួយ ។
    // បើខ្សែសំណាញ់ឈ្នះ , ចំណុចលោតចេញពីចំណុចភ្ជាប់ ហើយការភ្ជាប់បាក់ ។
    const pinto = plejProksimaPinto(pintajAlgluoj(c.k6h6), mx, mz);
    let gx, gz;
    if ( pinto ) { gx = pinto[0]; gz = pinto[1]; }
    else if ( kradaAlgluo && dKrada <= dK6h6 ) { gx = kradaAlgluo[0]; gz = kradaAlgluo[1]; }
    else if ( k6h6 ) { gx = k6h6[0]; gz = k6h6[1]; }
    else { gx = Math.round(mx * 2) / 2; gz = Math.round(mz * 2) / 2; }
    let linioX = null, linioZ = null;
    for ( const ni of [ pi - 1, pi + 1 ] ) {
      const n = v.n2k[ni];
      if ( !n ) continue;
      const s = kradaS2nasceAlglu(n[0], n[1], gx, gz);
      if ( !s ) continue;
      if ( s.linioX !== null ) { n[0] = s.linioX; linioX = s.linioX; }
      else { n[1] = s.linioZ; linioZ = s.linioZ; }
    }
    // ⟨ ចំណុចដែលបានបិទភ្ជាប់មិនត្រូវរំកិលទេ 📃 ⟩
    if ( !pinto ) {
      if ( linioX !== null ) gx = linioX;
      if ( linioZ !== null ) gz = linioZ;
    }
    v.n2k[pi] = [ gx, gz ];
    if ( k6h6Vakox2q(v, c.k6h6) ) {
      for ( const [ ni, p ] of s23ohk2saij ) v.n2k[ni] = p;
      statuso("ផ្លូវនោះនឹងត្រួតគ្នានឹងខ្លួនឯង ឬចតុកោណ 🛑");
      return;
    }
    elektitaPunkto = pi;
  } else if ( c.pudal === "qakaj2" ) {
    const d = haqakaj2[c.qakaj2];
    if ( !d ) return;
    const antaupa = { ...d };
    d.x = Math.round(mx * 2) / 2;
    d.z = Math.round(mz * 2) / 2;
    // អូសកំពង់ , តភ្ជាប់ទៅផ្លូវជិត ( ជម្រើសដែលងាកទៅទឹក ) ឬបើគ្មាន
    // ផ្លូវ ងាកទៅរកទឹកដោយស្វ័យប្រវត្តី ។
    orientiQakaj2n(d, c.qakaj2);
    if ( qakaj2Vakox2q(d, c.qakaj2) ) {
      Object.assign(d, antaupa);
      statuso("ចតុកោណនោះនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណ 🛑");
      return;
    }
    elektitaQakaj2 = c.qakaj2;
  } else if ( c.pudal === "qakaj2Pinto" ) {
    const d = haqakaj2[c.qakaj2];
    if ( !d || !qakaj2PintaBazo ) return;
    const antaupa = { ...d };
    // ⟨ កំពូលអូស , ចំណុចដីនៅស្ថិត , កំពូលដើរតាមទ្រនិច , ប្រវែងកំពង់
    // = ចម្ងាយតាមអ័ក្សពីគោលដី ។ ដូច្នេះកំពង់ពង្រីក/បង្រួម ហើយ
    // ចំណុចទឹកផ្លាស់ទីផងដែរ , ដោយមិនលើកចំណុចដីចេញពីច្រាំង ។
    // បង្គត់ទៅ ០.៥ ដូចការអូសដទៃ ។ 📃 ⟩
    const b = qakaj2PintaBazo;
    const t = ( mx - b.x ) * b.ax + ( mz - b.z ) * b.az;
    const prof = Math.round(Math.max(DOKO_PROFUNDO_MIN, Math.min(DOKO_PROFUNDO_MAKS, t)) * 2) / 2;
    d.profundo = prof;
    d.x = Math.round(( b.x + b.ax * prof / 2 ) * 2) / 2;
    d.z = Math.round(( b.z + b.az * prof / 2 ) * 2) / 2;
    if ( qakaj2Vakox2q(d, c.qakaj2) ) {
      Object.assign(d, antaupa);
      statuso("ចតុកោណនោះនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណ 🛑");
      return;
    }
  } else if ( c.pudal === "qakaj2Lando" ) {
    const d = haqakaj2[c.qakaj2];
    if ( !d || !qakaj2LandaBazo ) return;
    const antaupa = { ...d };
    // ⟨ ចុងដីអូស , ចុងទឹកនៅស្ថិត , ចុងដីដើរតាមទ្រនិច , ហើយកំពង់បង្វិលតាម ។
    // ជម្រៅ = ចម្ងាយពីចុងទឹក , ដូច្នេះការអូសក៏ពង្រីក/បង្រួមកំពង់ ។ 📃 ⟩
    const b = qakaj2LandaBazo;
    const dx = mx - b.x, dz = mz - b.z;
    const sahakani = Math.hypot(dx, dz);
    if ( sahakani < 0o1/0o100 ) return;
    const prof = Math.round(Math.max(DOKO_PROFUNDO_MIN, Math.min(DOKO_PROFUNDO_MAKS, sahakani)) * 2) / 2;
    const ux = dx / sahakani, uz = dz / sahakani;
    d.profundo = prof;
    d.rotacio = Math.atan2(ux, uz);
    d.x = Math.round(( b.x + ux * prof / 2 ) * 2) / 2;
    d.z = Math.round(( b.z + uz * prof / 2 ) * 2) / 2;
    if ( qakaj2Vakox2q(d, c.qakaj2) ) {
      Object.assign(d, antaupa);
      statuso("ចតុកោណនោះនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណ 🛑");
      return;
    }
    elektitaQakaj2 = c.qakaj2;
  }
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
}

export function finiK6h6Trenon() {
  if ( !k6h6Trenata ) return;
  if ( k6h6Trenata.pudal === "punkto" ) {
    const v = hak6h6[k6h6Trenata.k6h6];
    if ( v ) forigiDuoblajnPunktojn(v);
  }
  if ( k6h6Trenata.pudal === "qakaj2Pinto" ) {
    // ⟨ កំពង់ថ្មីងាកទៅទឹកវិញ ក្រោយពង្រីក 📃 ⟩ បើការងាកមិនធ្វើឱ្យត្រួតគ្នា ។
    const d = haqakaj2[k6h6Trenata.qakaj2];
    if ( d ) orientiQakaj2n(d, k6h6Trenata.qakaj2);
  }
  qakaj2PintaBazo = null;
  qakaj2LandaBazo = null;
  k6h6Trenata = null;
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
}

/* aldoniK6h6nPunkton ។ បន្ថែមចំណុចមួយក្នុងផ្លូវនៅទីដែលចុច ។ ចំណុចថ្មី
   ដាក់លើផ្លូវ ( ចំណុចគោលលើស៊ីមែនត៍ជិតបំផុត ) ហើយបិទភ្ជាប់ទៅ
   ក្រឡាទីក្រុង ឬផ្លូវ/ចតុកោណផ្សេង បើជិតគោល ដូច្នេះចំណុចនៅតែ
   ស្ថិតលើផ្លូវដែលកំពុងកែ ។
    @param vi ( number ) - លិបិក្រមផ្លូវ។
    @param mx ( number ) - ពិភពលោក x ។
    @param mz ( number ) - ពិភពលោក z ។
@returns តើចំណុចត្រូវបានបន្ថែម ( boolean )។ */
function aldoniK6h6nPunkton(vi: number, mx: number, mz: number): boolean {
  const v = hak6h6[vi];
  if ( !v || !v.n2k ) {
    statuso("មិនមានផ្លូវដែលបានជ្រើសដើម្បីបន្ថែមចំណុចទេ");
    return false;
  }
  const kopio: SkulptaK6h6 = { ...v, n2k: v.n2k.map(p => [ ...p ] as K6h6Punkto) };
  const kunfandisNe3ak2 = k6h6Vakox2q(v, vi);
  // ⟨ ចំណុចដែលបានជ្រើសនៅផ្លូវនេះឬ ? 📃 ⟩ ។ បើមិនដូច្នេះ ការចុចលើផ្លូវផ្សេង
  // នឹងបន្ថែមចំណុចនៅជាប់លិបិក្រមចាស់របស់ផ្លូវមុន ( ចំណុចខុសទីតាំង ) ។
  const elektisCxiTiu = elektitaK6h6 === vi && elektitaPunkto >= 0;
  const elektitaAntaue = elektitaPunkto;
  momenti();
  elektitaK6h6 = vi;
  let nx = Math.round(mx * 2) / 2;
  let nz = Math.round(mz * 2) / 2;
  if ( v.n2k.length < 2 ) {
    v.n2k.push([ nx, nz ]);
    elektitaPunkto = v.n2k.length - 1;
  } else {
    // ⟨ គោលដៅ = ចម្រៀកជាប់នឹងចំណុចដែលជ្រើស , ឬចម្រៀកជិតបំផុត 📃 ⟩
    // ចំណុចថ្មីត្រូវបញ្ចូលជាប់នឹងចំណុចដែលបានជ្រើស ( មុន ឬក្រោយវា ) ,
    // ដូច្នេះការបន្ថែមចំណុចនៅកន្លែងដែលកំពុងកែ ។ បើគ្មានចំណុចជ្រើស ,
    // ចម្រៀកជិតបំផុតនឹងទ្រនិចឈ្នះ ។
    const z2hak = v.n2k.length - 1;
    let plej = 0, plejD = Infinity, plejT = 0;
    const projekcii = ( pi: number ): void => {
      const a = v.n2k[pi], b = v.n2k[pi + 1];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const t = Math.max(0, Math.min(1, ( ( mx - a[0] ) * ( b[0] - a[0] ) + ( mz - a[1] ) * ( b[1] - a[1] ) ) / ( l * l )));
      const d = Math.hypot(a[0] + t * ( b[0] - a[0] ) - mx, a[1] + t * ( b[1] - a[1] ) - mz);
      if ( d < plejD ) { plejD = d; plej = pi; plejT = t; }
    };
    if ( elektisCxiTiu && elektitaAntaue <= z2hak ) {
      // ⟨ ចម្រៀកក្រោយចំណុចដែលជ្រើស , ឬចម្រៀកមុនវាបើវាជាចំណុចចុងក្រោយ 📃 ⟩
      const km = elektitaAntaue < z2hak ? elektitaAntaue : Math.max(0, z2hak - 1);
      plej = km;
      projekcii(km);
      // ⟨ នៅជាប់នឹងចំណុចជ្រើសជានិច្ច 📃 ⟩ , បើការចុចនៅឆ្ងាយពីចម្រៀកនោះ ,
      // ការបញ្ចាំងត្រូវនឹងចុងម្ខាង ( = ចំណុចដែលមានរួច ) ដូច្នេះចំណុចថ្មី
      // មិនត្រូវបានបន្ថែមទេ ។ ដូច្នេះបម្រុងការបញ្ចាំងក្នុងកណ្តាលចម្រៀក ។
      if ( plejT < 0.2 || plejT > 0.8 ) plejT = 0.5;
      plejD = 0;
    } else {
      for ( let pi = 0; pi < z2hak; pi++ ) projekcii(pi);
    }
    const a = v.n2k[plej], b = v.n2k[plej + 1];
    nx = a[0] + plejT * ( b[0] - a[0] );
    nz = a[1] + plejT * ( b[1] - a[1] );
    // ⟨ ការបិទភ្ជាប់ 📃 ⟩ ១ សមានីក្រឡាទីក្រុង ២ ផ្លូវ/ចតុកោណផ្សេង ។
    // បិទភ្ជាប់តែបើជិតគោល ដូច្នេះចំណុចថ្មីមិនលោតចេញពីផ្លូវទេ ។
    const seg = kradaS2nasceAlglu(a[0], a[1], b[0], b[1]);
    if ( seg ) {
      if ( seg.linioX !== null ) {
        a[0] = seg.linioX; b[0] = seg.linioX; nx = seg.linioX;
      } else {
        a[1] = seg.linioZ; b[1] = seg.linioZ; nz = seg.linioZ;
      }
    } else {
      const krada = kradaK6h6Alglu(nx, nz);
      if ( krada && Math.hypot(krada[0] - nx, krada[1] - nz) <= 0o1/0o2 ) {
        nx = krada[0]; nz = krada[1];
      } else {
        const algluo = k6h6Algluo(mx, mz, vi);
        if ( algluo && Math.hypot(algluo[0] - nx, algluo[1] - nz) <= 0o3/0o2 ) {
          nx = algluo[0]; nz = algluo[1];
        }
      }
    }
    nx = Math.round(nx * 2) / 2;
    nz = Math.round(nz * 2) / 2;
    v.n2k.splice(plej + 1, 0, [ nx, nz ]);
    elektitaPunkto = plej + 1;
  }
  if ( k6h6Vakox2q(v, vi) && !kunfandisNe3ak2 ) {
    hak6h6[vi] = kopio;
    elektitaPunkto = Math.min(elektitaPunkto, kopio.n2k.length - 1);
    statuso("ចំណុចថ្មីនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណ 🛑");
    gxisdatigiK6h6jnHakaman();
    markiDesegnon();
    return false;
  }
  forigiDuoblajnPunktojn(v);
  const trovi = v.n2k.findIndex(p => p[0] === nx && p[1] === nz);
  elektitaPunkto = trovi >= 0 ? trovi
    : Math.max(0, Math.min(elektitaPunkto, v.n2k.length - 1));
  const kreskis = v.n2k.length > kopio.n2k.length;
  if ( !kreskis ) statuso("ចំណុចមានរួចហើយនៅទីនោះ");
  if ( JSON.stringify(v.n2k) === JSON.stringify(kopio.n2k) ) {
    gxisdatigiK6h6jnHakaman();
    markiDesegnon();
    return false;
  }
  markiSxangxitan();
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
  return kreskis;
}

function forigiK6h6nPunkton(vi: number, pi: number) {
  const v = hak6h6[vi];
  if ( !v || v.n2k.length <= 2 ) {
    statuso("ផ្លូវត្រូវការចំណុចយ៉ាងតិចពីរ , មិនអាចលុបបានទេ 🚫");
    return;
  }
  momenti();
  v.n2k.splice(pi, 1);
  elektitaK6h6 = vi;
  elektitaPunkto = Math.max(0, pi - 1);
  markiSxangxitan();
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
}

export function sxangxiKradanCelon(mx: number, mz: number) {
  // បើការចុចនៅលើក្រឡារបស់ទីក្រុងផ្សេងដែលកំពុងបង្ហាញ ជ្រើសទីក្រុង
  // នោះជំនួសការកែក្រឡាឆ្ងាយក្នុងទីក្រុងបច្ចុប្បន្ន ។
  for ( const k of vidotajKradoj() ) {
    if ( k.vecax2lani === elektitaKaxte ) continue;
    const kc = Math.round(( mx - k.ofsX ) / k.plano.PASXO);
    const kr = Math.round(( mz - k.ofsZ ) / k.plano.PASXO);
    if ( k.plano.haKekkozusai.some(( [ lc, lr ] ) => lc === kc && lr === kr) ) {
      elektiKaxten(k.vecax2lani);
      statuso("បានជ្រើសទីក្រុង " + ( hakaxte[k.vecax2lani]?.ksaka ?? "" ) + " 🏙️");
      markiDesegnon();
      return;
    }
  }
  const plano = kradoPlano();
  const PASXO = plano.PASXO;
  const c = Math.round(( mx - kradoOfsX ) / PASXO);
  const r = Math.round(( mz - kradoOfsZ ) / PASXO);
  if ( kradoBloko === "kvar" ) {
    const BLOKO = 0o10;
    const cx = kradoOfsX + c * PASXO, cz = kradoOfsZ + r * PASXO;
    let plej = "NE", plejD = Infinity;
    const hatafkaq: [ number, number, string ][] = [ [ BLOKO, BLOKO, "NE" ], [ -BLOKO, BLOKO, "NW" ], [ -BLOKO, -BLOKO, "SW" ], [ BLOKO, -BLOKO, "SE" ] ];
    for ( const [ sx, sz, ksaka ] of hatafkaq ) {
      const d = Math.hypot(mx - ( cx + sx ), mz - ( cz + sz ));
      if ( d < plejD ) { plejD = d; plej = ksaka; }
    }
    const ŝ = c + "," + r + "," + String(plej);
    if ( kradoHunaqElektita === "automata" ) {
      if ( !kradoSuperoj.delete(ŝ) ) return;
    } else {
      if ( Math.abs(c * PASXO + kradoOfsX) > MONDO_HALFO || Math.abs(r * PASXO + kradoOfsZ) > MONDO_HALFO ) return;
      kradoSuperoj.set(ŝ, kradoHunaqElektita);
    }
    sinkronigiSuperojn();
    // ការកែក្រឡាក្នុងប្លុកបួន ត្រូវសម្គាល់ដូចគ្នានឹងប្លុកមួយ ដូច្នេះ
    // ប៊ូតុងរក្សាទុកឃើញការផ្លាស់ប្តូរ ( មុនទំព័រនេះបានត្រឡប់មកវិញ
    // ដោយគ្មានសញ្ញា ហើយការរក្សាទុកឆ្លើយ „គ្មានការផ្លាស់ប្តូរ“ )។
    markiSxangxitan();
    statuso("ការផ្លាស់ប្តូរមិនបានរក្សាទុក");
    gxisdatigiKradon();
    return;
  }
  const ŝ = c + "," + r;
  if ( kradoHunaqElektita === "automata" ) {
    if ( !kradoSuperoj.delete(ŝ) ) return;
  } else {
    if ( Math.abs(c * PASXO + kradoOfsX) > MONDO_HALFO || Math.abs(r * PASXO + kradoOfsZ) > MONDO_HALFO ) return;
    kradoSuperoj.set(ŝ, kradoHunaqElektita);
  }
  sinkronigiSuperojn();
  markiSxangxitan();
  statuso("ការផ្លាស់ប្តូរមិនបានរក្សាទុក");
  gxisdatigiKradon();
}

const KRADAJ_KOLOROJ: Record<string, string> = {
  sanktejo: "#e0b840",
  turo: "#98a8b8",
  domo: "#c08858",
  mangxejo: "#e07050",
  kasafeo: "#6898d8",
  stacio: "#9868e0",
};
/* គូរស្រទាប់ទីក្រុងក្រឡាលើបរិបទ 2D ណាមួយ។
    @param k ( CanvasRenderingContext2D ) - បរិបទ។
    @param plano ( KradaPlano ) - ផែនការក្រឡា។
    @param X ( funkcio ) - ពិភពលោក x ទៅជួរឈរផ្ទាំងគំនូស។
    @param Z ( funkcio ) - ពិភពលោក z ទៅជួរផ្ទាំងគំនូស។
    @param p6zukani ( number ) - ភីកសែលក្នុងមួយឯកតាពិភពលោក។ */
export function k2fKradanTavolon(k: CanvasRenderingContext2D, plano: KradaPlano,
  X: ( x: number ) => number, Z: ( z: number ) => number, p6zukani: number): void {
  k.lineWidth = 0o7/0o2 * p6zukani;
  k.strokeStyle = "rgba(216,216,224,0.9)";
  k.beginPath();
  for ( const v of plano.hak6h6 ) {
    if ( v.orient === "EW" ) { k.moveTo(X(v.de), Z(v.haxekuxa)); k.lineTo(X(v.al), Z(v.haxekuxa)); }
    else { k.moveTo(X(v.haxekuxa), Z(v.de)); k.lineTo(X(v.haxekuxa), Z(v.al)); }
  }
  k.stroke();
  k.lineWidth = Math.max(1, 0o55/0o40 * p6zukani);
  k.strokeStyle = "rgba(255,255,255,0.55)";
  k.beginPath();
  for ( const sp of plano.spronoj ) {
    k.moveTo(X(sp.de[0]), Z(sp.de[1]));
    k.lineTo(X(sp.al[0]), Z(sp.al[1]));
  }
  k.stroke();
  const radu = 0o265/0o40 * p6zukani;
  for ( const b of plano.paqj ) {
    const sx = X(b.x), sy = Z(b.z);
    const weh2 = b.stacia ? KRADAJ_KOLOROJ.stacio : KRADAJ_KOLOROJ[b.hunaq];
    k.fillStyle = weh2;
    k.beginPath();
    for ( let q = 0; q < 4; q++ ) {
      const ang = b.rot + Math.PI / 4 + q * Math.PI / 2;
      const px = sx + Math.cos(ang) * radu;
      const py = sy + Math.sin(ang) * radu;
      if ( q === 0 ) k.moveTo(px, py); else k.lineTo(px, py);
    }
    k.closePath();
    k.fill();
    k.strokeStyle = "rgba(0,0,0,0.35)";
    k.lineWidth = 1;
    k.stroke();
    const pdx = X(b.x + Math.sin(b.rot) * 0o13/0o2);
    const pdz = Z(b.z + Math.cos(b.rot) * 0o13/0o2);
    k.fillStyle = "rgba(255,255,255,0.9)";
    k.beginPath();
    k.arc(pdx, pdz, Math.max(0o3/0o2, 0o115/0o100 * p6zukani), 0, Math.PI * 2);
    k.fill();
  }
}

elementoj<HTMLButtonElement>("#kradaro button").forEach(b => {
  b.addEventListener("click", () => {
    kradoHunaqElektita = ( b.dataset.kradoHunaq as CellType | undefined ) ?? "automata";
    elementoj<HTMLButtonElement>("#kradaro button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
kaxteElektilo.addEventListener("change", () => elektiKaxten(parseInt(kaxteElektilo.value, 0o12) || 0));
kaxteNomoEl.addEventListener("input", () => {
  const u = hakaxte[elektitaKaxte];
  if ( !u ) return;
  u.ksaka = kaxteNomoEl.value;
  gxisdatigiKaxteElektilon();
  markiSxangxitan();
  markiDesegnon();
});
kaxteAldoniBtn.addEventListener("click", () => {
  hakaxte.push({ ksaka: "ទីក្រុងថ្មី", arangxaGrando: 1, blokaGrando: "unu", ofsX: 0o200, ofsZ: -0o200, aldonajBlokoj: [] });
  elektiKaxten(hakaxte.length - 1);
  markiSxangxitan();
  markiDesegnon();
});
kaxteForigiBtn.addEventListener("click", () => {
  if ( hakaxte.length <= 1 ) return;
  foriguKaxten(elektitaKaxte);
  hakaxte.splice(elektitaKaxte, 1);
  elektiKaxten(Math.max(0, elektitaKaxte - 1));
  markiSxangxitan();
  markiDesegnon();
});
kradoGrandecoEl.addEventListener("change", () => { kradoGrandeco = parseInt(kradoGrandecoEl.value, 0o12); skribiElektitanKaxten(); gxisdatigiKradon(); });
kradoBlokoEl.addEventListener("change", () => { kradoBloko = kradoBlokoEl.value as "unu" | "kvar"; skribiElektitanKaxten(); gxisdatigiKradon(); });
kradoOfsXEl.addEventListener("change", () => { kradoOfsX = parseFloat(kradoOfsXEl.value) || 0; skribiElektitanKaxten(); gxisdatigiKaxteElektilon(); gxisdatigiKradon(); });
kradoOfsZEl.addEventListener("change", () => { kradoOfsZ = parseFloat(kradoOfsZEl.value) || 0; skribiElektitanKaxten(); gxisdatigiKaxteElektilon(); gxisdatigiKradon(); });
kradoKeuxfhxesoEl.addEventListener("change", () => { kradoKeuxfhxeso = kradoKeuxfhxesoEl.checked; skribiElektitanKaxten(); gxisdatigiKradon(); });
kradoLampojEl.addEventListener("change", () => { kradoLampoj = kradoLampojEl.checked; skribiElektitanKaxten(); gxisdatigiKradon(); });
aldonaBlokoElektilo.addEventListener("change", () => {
  elektitaAldonaBloko = parseInt(aldonaBlokoElektilo.value, 0o12) || 0;
  gxisdatigiAldonaBlokojn();
  markiDesegnon();
});
aldonaBlokoHunaqEl.addEventListener("change", () => {
  skribiAldonanBlokon();
  const u = hakaxte[elektitaKaxte];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  const b = blokoj[elektitaAldonaBloko];
  if ( b && b.stacia && b.hunaq !== "stacio" ) {
    aldonaBlokoStaciaEl.checked = false;
    skribiAldonanBlokon();
  }
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
});
aldonaBlokoXEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiAldonaBlokojn(); gxisdatigiKradon(); });
aldonaBlokoZEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiAldonaBlokojn(); gxisdatigiKradon(); });
aldonaBlokoRotEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiKradon(); });
aldonaBlokoStaciaEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiAldonaBlokojn(); gxisdatigiKradon(); });
aldonaBlokoKonektitaEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiAldonaBlokojn(); gxisdatigiKradon(); });
aldonaBlokoAldoniBtn.addEventListener("click", () => {
  const u = hakaxte[elektitaKaxte];
  if ( !u ) return;
  momenti();
  if ( !u.aldonajBlokoj ) u.aldonajBlokoj = [];
  const vepat6ni = kradoBloko === "kvar" ? 0o40 : 0o30;
  const stacioZ = kradoBloko === "kvar" ? 0 : kradoGrandeco * vepat6ni + 0o30;
  u.aldonajBlokoj.push({ x: 0, z: stacioZ, hunaq: "stacio", rot: Math.PI, sub: "centro", stacia: true, konektita: true });
  elektitaAldonaBloko = u.aldonajBlokoj.length - 1;
  markiSxangxitan();
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
});
aldonaBlokoForigiBtn.addEventListener("click", () => {
  const u = hakaxte[elektitaKaxte];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  if ( !blokoj.length ) return;
  momenti();
  blokoj.splice(elektitaAldonaBloko, 1);
  elektitaAldonaBloko = Math.max(0, elektitaAldonaBloko - 1);
  markiSxangxitan();
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
});
k6h6Elektilo.addEventListener("change", () => {
  elektitaK6h6 = parseInt(k6h6Elektilo.value, 0o12) || 0;
  elektitaPunkto = -1;
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
});
k6h6NomoEl.addEventListener("input", () => {
  const v = hak6h6[elektitaK6h6];
  if ( !v ) return;
  v.ksaka = k6h6NomoEl.value;
  markiSxangxitan();
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
});
k6h6LargxoEl.addEventListener("change", () => { skribiK6h6Sekure(); });
k6h6PunktoElektilo.addEventListener("change", () => {
  elektitaPunkto = parseInt(k6h6PunktoElektilo.value, 0o12) || 0;
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
});
k6h6PunktoXEl.addEventListener("change", () => { skribiK6h6Sekure(); });
k6h6PunktoZEl.addEventListener("change", () => { skribiK6h6Sekure(); });
k6h6AldoniBtn.addEventListener("click", () => {
  momenti();
  const v = hak6h6[elektitaK6h6];
  const last: K6h6Punkto = v && v.n2k && v.n2k.length ? v.n2k[v.n2k.length - 1] : [ 0, 0 ];
  const sef4: SkulptaK6h6 = { ksaka: "ផ្លូវថ្មី", sefini: 0o7/0o2, n2k: [
    [ Math.round(( last[0] - 0o12 ) * 2) / 2, last[1] ],
    [ Math.round(( last[0] + 0o12 ) * 2) / 2, last[1] ] ] };
  hak6h6.push(sef4);
  if ( k6h6Vakox2q(sef4, hak6h6.length - 1) ) {
    hak6h6.pop();
    statuso("ផ្លូវថ្មីនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណដែលមានស្រាប់ 🛑");
    return;
  }
  elektitaK6h6 = hak6h6.length - 1;
  elektitaPunkto = -1;
  markiSxangxitan();
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
});
k6h6ForigiBtn.addEventListener("click", () => {
  if ( hak6h6.length <= 1 ) return;
  momenti();
  hak6h6.splice(elektitaK6h6, 1);
  elektitaK6h6 = Math.max(0, elektitaK6h6 - 1);
  elektitaPunkto = -1;
  markiSxangxitan();
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
});
k6h6KonektiBtn.addEventListener("click", () => {
  momenti();
  let k6h6jHaveb6kek = 0, movaj = 0, hac2q = 0;
  do {
    movaj = konektiK6h6jnFinojn();
    k6h6jHaveb6kek += movaj;
  } while ( movaj > 0 && ++hac2q < hak6h6.length * 2 );
  const haqakaj2ajHaveb6kek = konektiHaqakaj2nAlHak6h6n();
  movaj = 0;
  hac2q = 0;
  do {
    movaj = konektiK6h6jnFinojn();
    k6h6jHaveb6kek += movaj;
  } while ( movaj > 0 && ++hac2q < hak6h6.length * 2 );
  markiSxangxitan();
  gxisdatigiK6h6jnHakaman();
  gxisdatigiKradon();
  statuso("បានភ្ជាប់ " + k6h6jHaveb6kek + " ចុងផ្លូវ និង " + haqakaj2ajHaveb6kek + " ចតុកោណ 🔗");
  markiDesegnon();
});
k6h6PunktoAldoniBtn.addEventListener("click", () => {
  const v = hak6h6[elektitaK6h6];
  if ( !v ) return;
  momenti();
  // ⟨ បន្ថែមនៅជាប់ចំណុចដែលជ្រើស 📃 ⟩ ។ បើជ្រើសចំណុចកណ្តាល , ចំណុចថ្មី
  // ចូលក្នុងចម្រៀកបន្ទាប់ពីវា ( ពាក់កណ្តាលចម្រៀក ) ។ បើជ្រើសចំណុចចុងក្រោយ ,
  // ចំណុចថ្មីបន្ថែមបន្តទៅមុខ ។ បើគ្មានការជ្រើស , បន្ថែមនៅចុងផ្លូវ ។
  const sel = elektitaPunkto >= 0
    ? Math.max(0, Math.min(elektitaPunkto, v.n2k.length - 1))
    : v.n2k.length - 1;
  const a = v.n2k[sel];
  const b = v.n2k[sel + 1];
  const sef4: K6h6Punkto = b
    ? [ Math.round(( a[0] + b[0] ) ) / 2, Math.round(( a[1] + b[1] ) ) / 2 ]
    : [ Math.round(( a[0] + 0o12 ) * 2) / 2, Math.round(a[1] * 2) / 2 ];
  v.n2k.splice(sel + 1, 0, sef4);
  elektitaPunkto = sel + 1;
  if ( k6h6Vakox2q(v, elektitaK6h6) ) {
    v.n2k.splice(sel + 1, 1);
    elektitaPunkto = sel;
    statuso("ចំណុចថ្មីនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណ 🛑");
  }
  markiSxangxitan();
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
});
k6h6PunktoForigiBtn.addEventListener("click", () => {
  const v = hak6h6[elektitaK6h6];
  if ( !v || v.n2k.length <= 2 ) return;
  momenti();
  v.n2k.splice(elektitaPunkto, 1);
  elektitaPunkto = Math.max(0, elektitaPunkto - 1);
  markiSxangxitan();
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
});
qakaj2Elektilo.addEventListener("change", () => {
  elektitaQakaj2 = parseInt(qakaj2Elektilo.value, 0o12) || 0;
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
});
qakaj2XEl.addEventListener("change", () => { skribiQakaj2Sekure(); });
qakaj2ZEl.addEventListener("change", () => { skribiQakaj2Sekure(); });
qakaj2ProfundoEl.addEventListener("change", () => { skribiQakaj2Sekure(); });
qakaj2RotacioEl.addEventListener("change", () => { skribiQakaj2Sekure(); });
qakaj2AldoniBtn.addEventListener("click", () => {
  momenti();
  const last = haqakaj2[haqakaj2.length - 1];
  const sef4 = { x: last ? Math.round(( last.x + 0o30 ) * 2) / 2 : 0, z: last ? last.z : 0, profundo: 0o20, rotacio: last ? ( last.rotacio ?? 0 ) : 0 };
  haqakaj2.push(sef4);
  const vecax2lani = haqakaj2.length - 1;
  if ( qakaj2Vakox2q(sef4, vecax2lani) ) {
    haqakaj2.pop();
    statuso("ចតុកោណថ្មីនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណ 🛑");
    return;
  }
  orientiQakaj2n(sef4, vecax2lani);
  elektitaQakaj2 = vecax2lani;
  markiSxangxitan();
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
});
qakaj2ForigiBtn.addEventListener("click", () => {
  if ( haqakaj2.length <= 1 ) return;
  momenti();
  haqakaj2.splice(elektitaQakaj2, 1);
  elektitaQakaj2 = Math.max(0, elektitaQakaj2 - 1);
  markiSxangxitan();
  gxisdatigiK6h6jnHakaman();
  markiDesegnon();
});
elementoj<HTMLButtonElement>("#k6h6Iloj button").forEach(b => {
  b.addEventListener("click", () => {
    k6h6Ilo = b.dataset.k6h6Ilo ?? "movu";
    elementoj<HTMLButtonElement>("#k6h6Iloj button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
kradoRestarigiBtn.addEventListener("click", () => { kradoSuperoj.clear(); sinkronigiSuperojn(); markiSxangxitan(); statuso("ការផ្លាស់ប្តូរមិនបានរក្សាទុក"); gxisdatigiKradon(); });
kradoKopiiBtn.addEventListener("click", async() => {
  const u = hakaxte[elektitaKaxte];
  const s2banani = u
    ? `{ ksaka: "${u.ksaka}", arangxaGrando: ${u.arangxaGrando}, blokaGrando: "${u.blokaGrando}", ofsX: ${u.ofsX}, ofsZ: ${u.ofsZ} }`
    : "";
  try {
    await navigator.clipboard.writeText(s2banani);
    statuso("បានចម្លង , " + s2banani);
  } catch {
    statuso("មិនអាចចម្លងស្វ័យប្រវត្តិបាន , ជ្រើសដោយដៃ , " + s2banani);
  }
});

