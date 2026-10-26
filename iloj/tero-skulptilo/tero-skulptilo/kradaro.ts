// ≺⧼ ទីក្រុងក្រឡា និងផ្លូវ 🏙️ ⧽≻
import { MONDO_HALFO } from "./mezuroj.js";
import { akvaRezulto, cxuAkvo } from "./akvo.js";
import { bildilo3d } from "./vido3d.js";
import { rekonstruiKradon3D, rekonstruiVojojn3D } from "./krado3d.js";
import { kreiKradanPlanon } from "../../../kantaoj/mondo/krado/plano.js";
import { validiKradon } from "../../../kantaoj/mondo/krado/validigo.js";
import { aldoniVojon } from "../../../kantaoj/mondo/krado/aldonoj.js";
import { superajElDatumo, superojElDatumo } from "../../../kantaoj/mondo/krado/superoj.js";
import type { SkulptaUrbo, SkulptaVojo, SkulptaPlatformo } from "../../../kantaoj/mondo/urbo/tipoj.js";
import type { CellType, KradaPlano } from "../../../kantaoj/mondo/krado/tipoj.js";
import type { VojaPunkto } from "../../../eskekoj/medio/voj-reto.js";
import { elemento, elementoj } from "../../komunajxoj/dom.js";
import { agordiMontrendajnUrbojn, foriguUrbon, montrendajUrboj, refresxigiVidon, sekvuUrbon } from "./videco.js";
import { vojaDuonLargho as retoVojaDuonLargho, vojaKunigaDuono as retoVojaKunigaDuono,
  pontoDuonLargho as retoPontoDuonLargho, vojaProjekcio as retoVojaProjekcio,
  vojoKunfandiĝas as retoVojoKunfandiĝas,
  dokoKunfandiĝas as retoDokoKunfandiĝas, dokoKonektasVojon as dokoKonektasVojonReto,
  vojajKunfandajxoj as retoVojajKunfandajxoj,
  konektiDokonAlVojo as retoKonektiDokonAlVojo,
  dokoLandaSegmento as retoDokoLandaSegmento,
  DOKO_PLATFORMA_LARĜO } from "../../../eskekoj/medio/voj-reto.js";

// ⟪ តំណជាមួយកម្មវិធីកែ 📃 ⟫
interface KradaLigo {
  vidCX: () => number;
  vidCZ: () => number;
  vidSkalo: () => number;
  momenti: () => void;
  statuso: ( teksto: string ) => void;
  markiSxangxitan: () => void;
  markiDesegnon: () => void;
}
let vidCX: () => number;
let vidCZ: () => number;
let vidSkalo: () => number;
let momenti: () => void;
let statuso: ( teksto: string ) => void;
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
export function agordiUrbojn(listo: SkulptaUrbo[]) { urboj = Array.isArray(listo) ? listo : []; }
export function agordiElektitanUrbon(i: number) { elektitaUrbo = i; }
export function agordiElektitanAldonanBlokon(i: number) { elektitaAldonaBloko = i; }
export function agordiVojojn(listo: SkulptaVojo[]) { vojoj = Array.isArray(listo) ? listo : []; }
export function agordiDokojn(listo: SkulptaPlatformo[]) { dokoj = Array.isArray(listo) ? listo : []; }

const mapo = elemento<HTMLCanvasElement>("mapo");

export let urboj: SkulptaUrbo[] = [];
export let elektitaUrbo = 0;
export let kradoGrandeco = 3;
export let kradoBloko: "unu" | "kvar" = "unu";
export let kradoOfsX = 0, kradoOfsZ = 0;
export let kradoKeuxfhxeso = false;
export let kradoLampoj = true;
export let kradoTipoElektita: CellType | "automata" = "automata";
export let kradoSuperoj: Map<string, CellType> = new Map();
export let vojoj: SkulptaVojo[] = [];
export let dokoj: SkulptaPlatformo[] = [];

interface SkulptaDatumoj {
  urboj?: SkulptaUrbo[];
  vojoj?: SkulptaVojo[];
  dokoj?: SkulptaPlatformo[];
}
/* agordiDatumojn ។ ការផ្ទុកដំបូងរបស់ទិន្នន័យផែនទី។
    @param datumoj ( SkulptaDatumoj ) - ទីក្រុង ផ្លូវ និងកំពង់។ */
export function agordiDatumojn(datumoj: SkulptaDatumoj): void {
  urboj = ( datumoj.urboj ?? [] ).map(u => ( { ...u } ));
  elektitaUrbo = 0;
  kradoGrandeco = urboj[0]?.arangxaGrando ?? 3;
  kradoBloko = urboj[0]?.blokaGrando ?? "unu";
  kradoOfsX = urboj[0]?.ofsX ?? 0;
  kradoOfsZ = urboj[0]?.ofsZ ?? 0;
  kradoKeuxfhxeso = !!urboj[0]?.keuxfhxeso;
  kradoLampoj = urboj[0]?.lampoj !== false;
  const datumajVojoj = datumoj.vojoj ?? [];
  vojoj = datumajVojoj.length
    ? datumajVojoj.map(v => ( { ...v, punktoj: v.punktoj.map(pp => [ pp[0], pp[1] ] as VojaPunkto) } ))
    : [ { nomo: "Kajo", larĝo: 0o7/0o2, punktoj: [ [ -0o124, -0o140 ], [ -0o70, -0o150 ], [ -0o60, -0o144 ], [ 0, -0o132 ], [ 0o60, -0o120 ], [ 0o70, -0o124 ], [ 0o124, -0o122 ] ] },
        { nomo: "Avenuo", larĝo: 0o7/0o2, punktoj: [ [ 0o14, -0o100 ], [ 0o14, -0o130 ] ] } ];
  const datumajDokoj = datumoj.dokoj ?? [];
  dokoj = datumajDokoj.length
    ? datumajDokoj.map(d => ( { ...d } ))
    : [ { x: -0o60, z: -0o154, profundo: 0o20 }, { x: 0, z: -0o142, profundo: 0o20 }, { x: 0o60, z: -0o130, profundo: 0o20 } ];
  // ⟨ ទីក្រុងទាំងអស់បង្ហាញពីដំបូង 📃 ⟩ ។ ផ្ទាំង មើលឃើញ 👁️ អាចបិទខ្លះ ,
  // តែលំនាំដើមគឺឃើញទាំងអស់ ព្រោះទីក្រុងជារចនាសម្ព័ន្ធពិភពលោក ។
  agordiMontrendajnUrbojn(urboj.map(( _, i ) => i));
}

export function sinkronigiSuperojn() {
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  u.superoj = superojElDatumo(kradoSuperoj);
}
let kradaPlanoCache: ReturnType<typeof kreiKradanPlanon> | null = null;
export const kradaro = elemento<HTMLElement>("kradaro");
export const kradoPanel = elemento<HTMLElement>("kradoPanel");
const urboElektilo = elemento<HTMLSelectElement>("urboElektilo");
const urboNomoEl = elemento<HTMLInputElement>("urboNomo");
const urboAldoniBtn = elemento<HTMLButtonElement>("urboAldoni");
const urboForigiBtn = elemento<HTMLButtonElement>("urboForigi");
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
const aldonaBlokoTipoEl = elemento<HTMLSelectElement>("aldonaBlokoTipo");
const aldonaBlokoXEl = elemento<HTMLInputElement>("aldonaBlokoX");
const aldonaBlokoZEl = elemento<HTMLInputElement>("aldonaBlokoZ");
const aldonaBlokoRotEl = elemento<HTMLInputElement>("aldonaBlokoRot");
const aldonaBlokoStaciaEl = elemento<HTMLInputElement>("aldonaBlokoStacia");
const aldonaBlokoKonektitaEl = elemento<HTMLInputElement>("aldonaBlokoKonektita");
const aldonaBlokoAldoniBtn = elemento<HTMLButtonElement>("aldonaBlokoAldoni");
const aldonaBlokoForigiBtn = elemento<HTMLButtonElement>("aldonaBlokoForigi");
export let elektitaVojo = 0;
export let elektitaPunkto = -1;
export let elektitaDoko = 0;
let vojaIlo: string = "movu";
type VojaCelo = { speco: "punkto"; vojo: number; punkto: number }
  | { speco: "doko"; doko: number }
  // ⟨ ចំណុចកំពូលកំពង់ ( ខាងទឹក ) ៖ អូសវាដើម្បីពង្រីក/បង្រួមកំពង់ ។ 📃 ⟩
  | { speco: "dokoPinto"; doko: number }
  // ⟨ ចំណុចចុងកំពង់ខាងដី ៖ អូសវាដើម្បីផ្លាស់ទី/បង្វិលកំពង់ , ហើយវាជាចំណុច
  // ភ្ជាប់សម្រាប់ផ្លូវ ។ 📃 ⟩
  | { speco: "dokoLando"; doko: number }
  | { speco: "vojo"; vojo: number };
export let vojaTrenata: VojaCelo | null = null;
// ⟨ គោលកំពង់ខាងដី ៖ ជាប់ពេលអូសកំពូល , ដូច្នេះកំពង់រីកចេញទៅទឹក 📃 ⟩
let dokoPintaBazo: { x: number; z: number; ax: number; az: number } | null = null;
// ⟨ គោលកំពង់ខាងទឹក ៖ ជាប់ពេលអូសចុងខាងដី , ដូច្នេះចុងទឹកមិនផ្លាស់ទី 📃 ⟩
let dokoLandaBazo: { x: number; z: number } | null = null;
// ⟨ ប្រវែងកំពង់តិចបំផុត និងច្រើនបំផុត 📏 ⟩
export const DOKO_PROFUNDO_MIN = 4;
export const DOKO_PROFUNDO_MAKS = 0o44;
/* ចំណុចកំពូលកំពង់ ( ខាងទឹក ) ក្នុងពិភពលោក ។ ខាងដីស្ថិតនៅ + sin/cos
   ដូច្នេះកំពូលស្ថិតនៅ − sin/cos ។
    @param d ( SkulptaPlatformo ) - ចតុកោណ។
@returns pinto ( { x , z } ) - ចំណុចកំពូល។ */
export function dokoPinto(d: SkulptaPlatformo): { x: number; z: number } {
  const rotacio = d.rotacio ?? 0;
  const duon = ( d.profundo || 0o20 ) / 2;
  return { x: d.x - Math.sin(rotacio) * duon, z: d.z - Math.cos(rotacio) * duon };
}
/* ចំណុចចុងកំពង់ខាងដី ( ខាងផ្លូវ ) ក្នុងពិភពលោក ។ វាជាចំណុចភ្ជាប់ដែល
   ផ្លូវអាចឈប់ត្រង់នោះដោយផ្ទាល់ ។
    @param d ( SkulptaPlatformo ) - ចតុកោណ។
@returns pinto ( { x , z } ) - ចំណុចចុងខាងដី។ */
export function dokoLandaPinto(d: SkulptaPlatformo): { x: number; z: number } {
  const rotacio = d.rotacio ?? 0;
  const duon = ( d.profundo || 0o20 ) / 2;
  return { x: d.x + Math.sin(rotacio) * duon, z: d.z + Math.cos(rotacio) * duon };
}

const vojoElektilo = elemento<HTMLSelectElement>("vojoElektilo");
const vojoNomoEl = elemento<HTMLInputElement>("vojoNomo");
const vojoLargxoEl = elemento<HTMLInputElement>("vojoLargxo");
const vojoAldoniBtn = elemento<HTMLButtonElement>("vojoAldoni");
const vojoForigiBtn = elemento<HTMLButtonElement>("vojoForigi");
const vojoKonektiBtn = elemento<HTMLButtonElement>("vojoKonekti");
const vojoPunktoElektilo = elemento<HTMLSelectElement>("vojoPunktoElektilo");
const vojoPunktoAldoniBtn = elemento<HTMLButtonElement>("vojoPunktoAldoni");
const vojoPunktoForigiBtn = elemento<HTMLButtonElement>("vojoPunktoForigi");
const vojoPunktoXEl = elemento<HTMLInputElement>("vojoPunktoX");
const vojoPunktoZEl = elemento<HTMLInputElement>("vojoPunktoZ");
const dokoElektilo = elemento<HTMLSelectElement>("dokoElektilo");
const dokoXEl = elemento<HTMLInputElement>("dokoX");
const dokoZEl = elemento<HTMLInputElement>("dokoZ");
const dokoProfundoEl = elemento<HTMLInputElement>("dokoProfundo");
const dokoRotacioEl = elemento<HTMLInputElement>("dokoRotacio");
const dokoAldoniBtn = elemento<HTMLButtonElement>("dokoAldoni");
const dokoForigiBtn = elemento<HTMLButtonElement>("dokoForigi");

export function kradoPlano() {
  if ( !kradaPlanoCache ) {
    const u = urboj[elektitaUrbo];
    kradaPlanoCache = kreiKradanPlanon(
      { arangxaGrando: kradoGrandeco, blokaGrando: kradoBloko, lampoj: kradoLampoj },
      kradoSuperoj, u && u.aldonajBlokoj ? u.aldonajBlokoj : []);
    const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
    for ( const v of vojoj ) {
      if ( !v.punktoj || v.punktoj.length < 2 ) continue;
      for ( let i = 0; i < v.punktoj.length - 1; i++ ) {
        const a = v.punktoj[i], b = v.punktoj[i + 1];
        if ( Math.abs(a[0] - b[0]) < 1e-6 ) {
          const poz = a[0] - ofsX;
          if ( kradaPlanoCache.vojoj.some(r => r.orient === "NS" && Math.abs(r.poz - poz) < 1e-6) )
            aldoniVojon(kradaPlanoCache, "NS", poz,
              Math.min(a[1], b[1]) - ofsZ, Math.max(a[1], b[1]) - ofsZ, true);
        } else if ( Math.abs(a[1] - b[1]) < 1e-6 ) {
          const poz = a[1] - ofsZ;
          if ( kradaPlanoCache.vojoj.some(r => r.orient === "EW" && Math.abs(r.poz - poz) < 1e-6) )
            aldoniVojon(kradaPlanoCache, "EW", poz,
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
const urbajPlanoj = new Map<number, KradaPlano>();
export function planoDeUrbo(i: number): KradaPlano | null {
  if ( i === elektitaUrbo ) return kradoPlano();
  const u = urboj[i];
  if ( !u ) return null;
  let plano = urbajPlanoj.get(i);
  if ( !plano ) {
    plano = kreiKradanPlanon(
      { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando, lampoj: u.lampoj !== false },
      superajElDatumo(u.superoj) ?? new Map(), u.aldonajBlokoj ?? []);
    urbajPlanoj.set(i, plano);
  }
  return plano;
}
/* vidotajKradoj ។ បញ្ជីទីក្រុងដែលត្រូវគូរជាមួយ ( ជាមួយផែនការ និង
   អុហ្វសិតរបស់ពួកវា ) ។ ផ្ទាំង មើលឃើញ 👁️ ជ្រើសពួកវា ។
    @returns បញ្ជី { indekso, plano, ofsX, ofsZ } ( អារេ )។ */
export function vidotajKradoj() {
  const rezulto: { indekso: number; plano: KradaPlano; ofsX: number; ofsZ: number }[] = [];
  for ( const i of montrendajUrboj() ) {
    const u = urboj[i];
    if ( !u ) continue;
    const plano = planoDeUrbo(i);
    if ( !plano ) continue;
    rezulto.push({ indekso: i, plano, ofsX: u.ofsX, ofsZ: u.ofsZ });
  }
  return rezulto;
}
export function gxisdatigiKradon() {
  kradaPlanoCache = null;
  urbajPlanoj.clear();
  kradoPlano();
  gxisdatigiKradajnStatistikojn();
  rekonstruiKradon3D();
  // ⟨ ផ្លូវសំណាញ់ក៏ប្រែប្រួលដែរ 📃 ⟩ ។ ផ្លូវរបស់ផែនការ ( និងស្ពរ ) ត្រូវបាន
  // សាងសង់ក្នុងក្រុមផ្លូវ 3D , ដូច្នេះការផ្លាស់ទំហំ ប្លុក ឬអុហ្វសិតត្រូវ
  // ធ្វើឱ្យផ្លូវស្រស់ផង ។
  if ( bildilo3d && !vojaTrenata ) rekonstruiVojojn3D();
  markiDesegnon();
}
function gxisdatigiKradajnStatistikojn() {
  const el = elemento<HTMLElement>("kradoStatistikoj");
  if ( !el || !kradaPlanoCache ) return;
  const plano = kradaPlanoCache;
  const problemoj = validiKradon(plano).filter(p => !p.kodo.startsWith("simetrio-"));
  const bazo = `${plano.ĉeloj.length} ក្រឡា · ${plano.konstruaĵoj.length} អគារ · ${plano.vojoj.length} ផ្លូវ · ${plano.spronoj.length} spronoj`;
  el.textContent = problemoj.length
    ? bazo + ` , ✗ ${problemoj.length} បញ្ហា , ${problemoj.slice(0, 3).map(p => p.kodo).join(", ")}`
    : bazo + " , ✓ រចនាសម្ព័ន្ធត្រឹមត្រូវ";
}

export function gxisdatigiUrboElektilon() {
  urboElektilo.innerHTML = "";
  urboj.forEach(( u, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = u.nomo + " ( " + u.ofsX + ", " + u.ofsZ + " )";
    urboElektilo.appendChild(o);
  });
  urboElektilo.value = String(elektitaUrbo);
  urboNomoEl.value = urboj[elektitaUrbo]?.nomo ?? "";
  urboForigiBtn.disabled = urboj.length <= 1;
  // បញ្ជីទីក្រុងរបស់ផ្ទាំង មើលឃើញ 👁️ តាមដានការបន្ថែម លុប និងឈ្មោះ
  refresxigiVidon();
}

export function elektiUrbon(i: number) {
  elektitaUrbo = Math.max(0, Math.min(urboj.length - 1, i));
  const u = urboj[elektitaUrbo];
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
  urboNomoEl.value = u.nomo;
  gxisdatigiUrboElektilon();
  gxisdatigiAldonaBlokojn();
  // ទីក្រុងដែលទើបជ្រើសត្រូវបង្ហាញផងដែរ ប៉ុន្តែទីក្រុងដែលបានធីករួច
  // នៅតែបង្ហាញ ( ដូច្នេះទីក្រុងច្រើនអាចមើលបានក្នុងពេលតែមួយ ) ។
  sekvuUrbon(elektitaUrbo);
  gxisdatigiKradon();
}

function skribiElektitanUrbon() {
  const u = urboj[elektitaUrbo];
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
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  aldonaBlokoElektilo.innerHTML = "";
  blokoj.forEach(( b, i: number ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = ( b.stacia ? "ស្ថានីយ" : ALDONA_TIPO_NOMOJ[b.tipo] || b.tipo ) + ( b.konektita ? " 🛣️" : "" ) + " ( " + b.x + ", " + b.z + " )";
    aldonaBlokoElektilo.appendChild(o);
  });
  elektitaAldonaBloko = blokoj.length ? Math.max(0, Math.min(blokoj.length - 1, elektitaAldonaBloko)) : -1;
  aldonaBlokoElektilo.value = String(Math.max(0, elektitaAldonaBloko));
  aldonaBlokoForigiBtn.disabled = blokoj.length === 0;
  const b = blokoj[elektitaAldonaBloko];
  if ( b ) {
    aldonaBlokoTipoEl.value = b.tipo;
    aldonaBlokoXEl.value = String(b.x);
    aldonaBlokoZEl.value = String(b.z);
    aldonaBlokoRotEl.value = String(b.rot ?? 0);
    aldonaBlokoStaciaEl.checked = !!b.stacia;
    aldonaBlokoKonektitaEl.checked = !!b.konektita;
  }
  markiDesegnon();
}

function skribiAldonanBlokon() {
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  const b = blokoj[elektitaAldonaBloko];
  if ( !b ) return;
  b.tipo = aldonaBlokoTipoEl.value as CellType;
  b.x = Math.round(( parseFloat(aldonaBlokoXEl.value) || 0 ) * 2) / 2;
  b.z = Math.round(( parseFloat(aldonaBlokoZEl.value) || 0 ) * 2) / 2;
  b.rot = parseFloat(aldonaBlokoRotEl.value) || 0;
  b.stacia = aldonaBlokoStaciaEl.checked;
  b.konektita = aldonaBlokoKonektitaEl.checked;
  markiSxangxitan();
}
const ALDONA_TIPO_NOMOJ = { sanktejo: "ទីសក្ការៈ", turo: "ប៉ម", domo: "ផ្ទះ", mangxejo: "អាហារដ្ឋាន", kasafeo: "ហាងកាហ្វេ", stacio: "ស្ថានីយ" };

export function aldonaBlokoCxePunkto(mx: number, mz: number) {
  const u = urboj[elektitaUrbo];
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
export function sxangiAldonaPozicion(mx: number, mz: number) {
  const u = urboj[elektitaUrbo];
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

export function gxisdatigiVojajnRegilojn() {
  if ( !vojoElektilo ) return;
  kradaPlanoCache = null;
  urbajPlanoj.clear();
  if ( bildilo3d && !vojaTrenata ) rekonstruiVojojn3D();
  vojoElektilo.innerHTML = "";
  vojoj.forEach(( v, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = ( v.nomo || "ផ្លូវ" ) + " ( " + v.punktoj.length + " pkt )";
    vojoElektilo.appendChild(o);
  });
  elektitaVojo = Math.max(0, Math.min(vojoj.length - 1, elektitaVojo));
  vojoElektilo.value = String(elektitaVojo);
  vojoForigiBtn.disabled = vojoj.length <= 1;
  const v = vojoj[elektitaVojo];
  if ( v ) {
    vojoNomoEl.value = v.nomo || "";
    vojoLargxoEl.value = String(v.larĝo || 0o7/0o2);
    vojoPunktoElektilo.innerHTML = "";
    v.punktoj.forEach(( p, j: number ) => {
      const o = document.createElement("option");
      o.value = String(j);
      o.textContent = "ចំណុច " + ( j + 1 ) + " ( " + p[0] + ", " + p[1] + " )";
      vojoPunktoElektilo.appendChild(o);
    });
    elektitaPunkto = Math.max(0, Math.min(v.punktoj.length - 1, elektitaPunkto));
    vojoPunktoElektilo.value = String(elektitaPunkto);
    vojoPunktoForigiBtn.disabled = v.punktoj.length <= 2;
    const p = v.punktoj[elektitaPunkto];
    if ( p ) {
      vojoPunktoXEl.value = String(p[0]);
      vojoPunktoZEl.value = String(p[1]);
    }
  } else {
    vojoNomoEl.value = "";
    vojoLargxoEl.value = "3.5";
    vojoPunktoElektilo.innerHTML = "";
    vojoPunktoForigiBtn.disabled = true;
  }
  dokoElektilo.innerHTML = "";
  dokoj.forEach(( d, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = "ចតុកោណ " + ( i + 1 ) + " ( " + d.x + ", " + d.z + " )";
    dokoElektilo.appendChild(o);
  });
  elektitaDoko = Math.max(0, Math.min(dokoj.length - 1, elektitaDoko));
  dokoElektilo.value = String(elektitaDoko);
  dokoForigiBtn.disabled = dokoj.length <= 1;
  const d = dokoj[elektitaDoko];
  if ( d ) {
    dokoXEl.value = String(d.x);
    dokoZEl.value = String(d.z);
    dokoProfundoEl.value = String(d.profundo || 0o20);
    dokoRotacioEl.value = String(d.rotacio ?? 0);
  }
  gxisdatigiVojaStatistikojn();
}

function skribiVojoSekure() {
  const v = vojoj[elektitaVojo];
  if ( !v ) return;
  const kopio: SkulptaVojo = { ...v, punktoj: v.punktoj.map(p => [ ...p ] as VojaPunkto) };
  const kunfandisAntaŭ = vojoKunfandiĝas(v, elektitaVojo);
  v.nomo = vojoNomoEl.value;
  v.larĝo = parseFloat(vojoLargxoEl.value) || 0o7/0o2;
  const p = v.punktoj[elektitaPunkto];
  if ( p ) {
    p[0] = parseFloat(vojoPunktoXEl.value) || 0;
    p[1] = parseFloat(vojoPunktoZEl.value) || 0;
  }
  if ( p && ( elektitaPunkto === 0 || elektitaPunkto === v.punktoj.length - 1 ) ) {
    const najbaro = elektitaPunkto === 0 ? v.punktoj[1] : v.punktoj[v.punktoj.length - 2];
    const algluo = vojaAlgluo(p[0], p[1], elektitaVojo, najbaro);
    if ( algluo ) {
      p[0] = algluo[0];
      p[1] = algluo[1];
    }
  }
  if ( vojoKunfandiĝas(v, elektitaVojo) && !kunfandisAntaŭ ) {
    vojoj[elektitaVojo] = kopio;
    statuso("ផ្លូវកែត្រូវបានបដិសេធព្រោះត្រួតគ្នា 🛑");
  }
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

function skribiDokoSekure() {
  const d = dokoj[elektitaDoko];
  if ( !d ) return;
  const kopio = { ...d };
  const kunfandisAntaŭ = dokoKunfandiĝas(d, elektitaDoko);
  // ការកែរង្វិលដោយដៃ ( វាល រង្វិល ) ស្តាប់តាមអ្វីដែលបានវាយ ។ បើ
  // រង្វិលមិនបានផ្លាស់ប្តូរ ( កែ x, z ឬ ជម្រៅ ) កំពង់ងាកទៅរកទឹក
  // ដោយស្វ័យប្រវត្តី ( ឬតភ្ជាប់ទៅផ្លូវជិត ) ។
  const antaupaRot = d.rotacio ?? 0;
  const novaRot = parseFloat(dokoRotacioEl.value) || 0;
  const rotacioMano = Math.abs(novaRot - antaupaRot) > 1e-9;
  d.x = parseFloat(dokoXEl.value) || 0;
  d.z = parseFloat(dokoZEl.value) || 0;
  d.profundo = Math.max(4, parseFloat(dokoProfundoEl.value) || 0o20);
  if ( rotacioMano ) d.rotacio = novaRot;
  else orientiDokon(d, elektitaDoko);
  if ( dokoKunfandiĝas(d, elektitaDoko) && !kunfandisAntaŭ ) {
    dokoj[elektitaDoko] = kopio;
    statuso("ចតុកោណកែត្រូវបានបដិសេធព្រោះត្រួតគ្នា 🛑");
  }
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

function gxisdatigiVojaStatistikojn() {
  const el = elemento<HTMLElement>("vojaStatistikoj");
  if ( !el ) return;
  const longo = vojoj.reduce(( s, v ) => s + v.punktoj.reduce(( a, p, i: number ) => {
    if ( i === 0 ) return a;
    const q = v.punktoj[i - 1];
    return a + Math.hypot(p[0] - q[0], p[1] - q[1]);
  }, 0), 0);
  const kunfandajxoj = vojajKunfandajxoj();
  el.textContent = vojoj.length + " ផ្លូវ ( " + longo.toFixed(1) + " un ) · "
    + dokoj.length + " ចតុកោណ · " + vojaKunigoj() + " ការភ្ជាប់ 🔗 · "
    + ( kunfandajxoj.totalo ? kunfandajxoj.totalo + " ការត្រួតគ្នា ( "
      + kunfandajxoj.vojoVojo + " ផ្លូវ-ផ្លូវ , " + kunfandajxoj.vojoDoko
      + " ផ្លូវ-ចតុកោណ , " + kunfandajxoj.dokoDoko + " ចតុកោណ-ចតុកោណ ) ⚠️" : "0 ការត្រួតគ្នា ✓" );
}

function vojaKunigoj() {
  let kunigoj = 0;
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    const v = vojoj[vi];
    if ( v.punktoj.length < 2 ) continue;
    for ( const pi of [ 0, v.punktoj.length - 1 ] ) {
      const p = v.punktoj[pi];
      const najbaro = pi === 0 ? v.punktoj[1] : v.punktoj[v.punktoj.length - 2];
      if ( vojaAlgluo(p[0], p[1], vi, najbaro) ) kunigoj++;
    }
  }
  for ( const d of dokoj ) {
    if ( vojoj.some(v => dokoKonektasVojon(d, v)) ) kunigoj++;
  }
  return kunigoj;
}

const VOJA_TUSXA_TOLERANCO = 0o1/0o1000;

export function vojaDuonLargho(v: SkulptaVojo): number {
  return retoVojaDuonLargho(v);
}

function vojaKunigaDuono(v: SkulptaVojo): number {
  return retoVojaKunigaDuono(v);
}

export function pontoDuonLargho(v: SkulptaVojo): number {
  return retoPontoDuonLargho(v);
}

function vojoKunfandiĝas(v: SkulptaVojo, kromVojo: number): boolean {
  return retoVojoKunfandiĝas(v, vojoj, dokoj, kromVojo);
}

function dokoKunfandiĝas(d: SkulptaPlatformo, kromDoko: number, kromVojo = -1): boolean {
  return retoDokoKunfandiĝas(d, dokoj, vojoj, kromDoko, kromVojo);
}

function dokoKonektasVojon(d: SkulptaPlatformo, v: SkulptaVojo): boolean {
  return dokoKonektasVojonReto(d, v);
}

function vojaProjekcio(px: number, pz: number, a: VojaPunkto, b: VojaPunkto) {
  return retoVojaProjekcio(px, pz, a, b);
}

function konektiDokonAlVojo(d: SkulptaPlatformo, kromDoko: number) {
  const akvas = akvaRezulto ? cxuAkvo : undefined;
  return retoKonektiDokonAlVojo(d, vojoj, dokoj, kromDoko, akvas);
}

function konektiDokojnAlVojojn() {
  let kunigoj = 0;
  for ( let di = 0; di < dokoj.length; di++ ) {
    if ( konektiDokonAlVojo(dokoj[di], di) ) kunigoj++;
  }
  return kunigoj;
}

// ⟨ កំពង់ងាកទៅរកទឹក 📃 ⟫
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
function akvaAngulo(d: SkulptaPlatformo): number | null {
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
      for ( const flanko of DOKO_AKVA_FLANKOJ ) {
        if ( cxuAkvo(d.x + sx * r - sz * r * flanko, d.z + sz * r + sx * r * flanko) ) poento += mult;
      }
    }
    if ( !cxuAkvo(d.x - sx * duon * 0o3, d.z - sz * duon * 0o3) ) poento += 0o1/0o2;
    if ( poento > plejPoento + 1e-9
      || ( Math.abs(poento - plejPoento) <= 1e-9
        && distoAnguloj(ang, nuna) < distoAnguloj(plejAngulo, nuna) ) ) {
      plejPoento = poento;
      plejAngulo = ang;
    }
  }
  return plejPoento > 0 ? plejAngulo : null;
}
/* orientiDokon ។ ងាកកំពង់ឱ្យងាកទៅរកទឹក ។ បើមានផ្លូវជិត វាតភ្ជាប់ខ្លួន
   ទៅផ្លូវ ( ជម្រើសណាមួយនៃសស្រាដែលងាកទៅទឹក ) ដូច្នេះការតភ្ជាប់
   ផ្លូវនៅតែរក្សាទុក ។ បើគ្មានផ្លូវ វាងាកតាមទិសទឹក ។
    @param d ( SkulptaPlatformo ) - ចតុកោណ។
    @param kromDoko ( number = -1 ) - ចតុកោណដែលមិនគិត។
@returns តើការងាកត្រូវបានផ្លាស់ប្តូរ ( boolean )។ */
export function orientiDokon(d: SkulptaPlatformo, kromDoko = -1): boolean {
  const antaupa = d.rotacio ?? 0;
  if ( konektiDokonAlVojo(d, kromDoko) ) return ( d.rotacio ?? 0 ) !== antaupa;
  const angulo = akvaAngulo(d);
  if ( angulo === null || Math.abs(angulo - antaupa) < 1e-9 ) return false;
  if ( dokoKunfandiĝas({ ...d, rotacio: angulo }, kromDoko) ) return false;
  d.rotacio = angulo;
  return true;
}

function vojajKunfandajxoj() {
  return retoVojajKunfandajxoj(vojoj, dokoj);
}

export function urboCxePunkto(mx: number, mz: number) {
  const duonw = mapo.width / 2, duonh = mapo.height / 2;
  const sx = duonw - ( mx - vidCX() ) * vidSkalo();
  const sy = duonh - ( mz - vidCZ() ) * vidSkalo();
  for ( let i = 0; i < urboj.length; i++ ) {
    const u = urboj[i];
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
function vojaCeloCxePunkto(mx: number, mz: number, ignoriPunktojn = false): VojaCelo | null {
  const r = tuxaMondo(0o10);
  let plej: VojaCelo | null = null, plejD = r;
  if ( !ignoriPunktojn ) {
    for ( let vi = 0; vi < vojoj.length; vi++ ) {
      const v = vojoj[vi];
      for ( let pi = 0; pi < v.punktoj.length; pi++ ) {
        const p = v.punktoj[pi];
        const d = Math.hypot(p[0] - mx, p[1] - mz);
        if ( d < plejD ) { plejD = d; plej = { speco: "punkto", vojo: vi, punkto: pi }; }
      }
    }
    if ( plej ) return plej;
  }
  // ⟨ ចំណុចចុងកំពង់ទាំងពីរ 📃 ⟩ ៖ ខាងទឹក ( អូស = ពង្រីក ) និងខាងដី
  // ( អូស = ផ្លាស់ទី/បង្វិល , ហើយជាចំណុចភ្ជាប់ផ្លូវ ) ។ ជ្រើសចំណុចជិតបំផុត ។
  let plejDoko: { speco: "dokoPinto" | "dokoLando"; doko: number } | null = null;
  let plejDokoD = r;
  for ( let di = 0; di < dokoj.length; di++ ) {
    for ( const [ speco, pinto ] of [ [ "dokoPinto", dokoPinto(dokoj[di]) ],
      [ "dokoLando", dokoLandaPinto(dokoj[di]) ] ] as [ "dokoPinto" | "dokoLando", { x: number; z: number } ][] ) {
      const d = Math.hypot(pinto.x - mx, pinto.z - mz);
      if ( d < plejDokoD ) { plejDokoD = d; plejDoko = { speco, doko: di }; }
    }
  }
  if ( plejDoko ) return plejDoko;
  for ( let di = 0; di < dokoj.length; di++ ) {
    const d = dokoj[di];
    const prof = d.profundo || 0o20;
    const rotacio = d.rotacio ?? 0;
    const dx = mx - d.x, dz = mz - d.z;
    const lx = dx * Math.cos(rotacio) - dz * Math.sin(rotacio);
    const lz = dx * Math.sin(rotacio) + dz * Math.cos(rotacio);
    if ( Math.abs(lx) < 0o16/0o10 + 0o5/0o2 && Math.abs(lz) < prof / 2 + 0o5/0o2 ) return { speco: "doko", doko: di };
  }
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    const v = vojoj[vi];
    for ( let pi = 0; pi < v.punktoj.length - 1; pi++ ) {
      const a = v.punktoj[pi], b = v.punktoj[pi + 1];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const t = Math.max(0, Math.min(1, ( ( mx - a[0] ) * ( b[0] - a[0] ) + ( mz - a[1] ) * ( b[1] - a[1] ) ) / ( l * l )));
      const d = Math.hypot(a[0] + t * ( b[0] - a[0] ) - mx, a[1] + t * ( b[1] - a[1] ) - mz);
      if ( d < ( v.larĝo || 0o7/0o2 ) / 2 + 0o3/0o2 + r ) return { speco: "vojo", vojo: vi };
    }
  }
  return null;
}

export function sxangxiVojanCelon(mx: number, mz: number) {
  // ឧបករណ៍បន្ថែម មិនគិតពីចំណុចដែលមានរួចទេ ដូច្នេះការចុចលើផ្លូវ
  // ដាក់ចំណុចថ្មី ( ចំណុចទ្វេត្រូវលុបចេញដោយស្វ័យប្រវត្តី ) ។
  const proks = vojaCeloCxePunkto(mx, mz, vojaIlo === "aldoni");
  if ( vojaIlo === "forigi" ) {
    if ( proks && proks.speco === "punkto" ) { forigiVojanPunkton(proks.vojo, proks.punkto); return; }
    statuso("ចុចលើចំណុចផ្លូវដើម្បីលុបវា 📍 ( ផ្លូវមួយត្រូវការចំណុចយ៉ាងតិចពីរ )");
    return;
  }
  if ( vojaIlo === "aldoni" ) {
    // បន្ថែមចំណុចនៅទីដែលចុច ។ ចុចលើផ្លូវ = បន្ថែមក្នុងផ្លូវនោះ ។ ចុច
    // កន្លែងទំនេរ = បន្ថែមក្នុងផ្លូវដែលបានជ្រើស ។
    const vi = proks && proks.speco === "vojo" ? proks.vojo : elektitaVojo;
    aldoniVojanPunkton(vi, mx, mz);
    return;
  }
  if ( proks && proks.speco === "punkto" ) {
    elektitaVojo = proks.vojo;
    elektitaPunkto = proks.punkto;
    if ( vojaIlo === "movu" ) komenciVojaTrenon({ speco: "punkto", vojo: proks.vojo, punkto: proks.punkto });
  } else if ( proks && proks.speco === "dokoPinto" ) {
    elektitaDoko = proks.doko;
    if ( vojaIlo === "movu" ) komenciVojaTrenon({ speco: "dokoPinto", doko: proks.doko });
  } else if ( proks && proks.speco === "doko" ) {
    elektitaDoko = proks.doko;
    if ( vojaIlo === "movu" ) komenciVojaTrenon({ speco: "doko", doko: proks.doko });
  } else if ( proks && proks.speco === "vojo" ) {
    elektitaVojo = proks.vojo;
    elektitaPunkto = -1;
  } else {
    elektitaPunkto = -1;
  }
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

function komenciVojaTrenon(celo: VojaCelo): void {
  if ( vojaTrenata ) return;
  momenti();
  dokoPintaBazo = null;
  dokoLandaBazo = null;
  if ( celo.speco === "dokoPinto" ) {
    const d = dokoj[celo.doko];
    if ( !d ) return;
    // ⟨ គោលដី = ចំណុចកណ្តាល + ប្រវែង/២ ទៅខាងដី ; អ័ក្ស A ទៅខាងទឹក 📃 ⟩
    const rotacio = d.rotacio ?? 0;
    const duon = ( d.profundo || 0o20 ) / 2;
    const sx = Math.sin(rotacio), cz = Math.cos(rotacio);
    dokoPintaBazo = { x: d.x + sx * duon, z: d.z + cz * duon, ax: -sx, az: -cz };
  } else if ( celo.speco === "dokoLando" ) {
    const d = dokoj[celo.doko];
    if ( !d ) return;
    // ⟨ គោលទឹក ៖ ចំណុចចុងខាងទឹកនៅស្ថិត , ចុងខាងដីដើរតាមទ្រនិច 📃 ⟩
    const pinto = dokoPinto(d);
    dokoLandaBazo = { x: pinto.x, z: pinto.z };
  }
  vojaTrenata = celo;
  markiSxangxitan();
  statuso("ការផ្លាស់ប្តូរមិនបានរក្សាទុក");
  markiDesegnon();
}

function kradaVojaAlglu(mx: number, mz: number) {
  // ⟨ ចំណុចប្រសព្វសំណាញ់ 🎯 ⟩ ៖ ការភ្ជាប់ផ្លូវទៅផ្លូវសំណាញ់ត្រូវទៅចំចំណុចប្រសព្វ
  // ( មិនមែនកណ្តាលចម្រៀក ) ដូច្នេះចានភ្ជាប់និងជ្រុងផ្លូវលេចឡើង ។
  const pinto = plejProksimaPinto(kradajPintoj(), mx, mz);
  if (pinto) return [ pinto[0], pinto[1] ];
  const plano = kradoPlano();
  const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
  const rando = 0o5/0o2;
  let plej = null, plejD = rando;
  for ( const r of plano.vojoj ) {
    if ( r.orient === "NS" ) {
      const wx = ofsX + r.poz;
      const d = Math.abs(mx - wx);
      if ( d < plejD ) { plejD = d; plej = [ wx, Math.round(mz * 2) / 2 ]; }
    } else {
      const wz = ofsZ + r.poz;
      const d = Math.abs(mz - wz);
      if ( d < plejD ) { plejD = d; plej = [ Math.round(mx * 2) / 2, wz ]; }
    }
  }
  return plej;
}
function kradaSegmentoAlglu(ax: number, az: number, bx: number, bz: number) {
  const plano = kradoPlano();
  const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
  const rando = 0o5/0o2;
  const dx = bx - ax, dz = bz - az;
  if ( Math.hypot(dx, dz) < 1e-6 ) return null;
  if ( Math.abs(dx) <= 0o1/0o4 * Math.abs(dz) ) {
    let plej = null, plejD = rando;
    for ( const r of plano.vojoj ) {
      if ( r.orient !== "NS" ) continue;
      const wx = ofsX + r.poz;
      const d = Math.max(Math.abs(ax - wx), Math.abs(bx - wx));
      if ( d < plejD ) { plejD = d; plej = wx; }
    }
    if ( plej !== null ) return { linioX: plej, linioZ: null };
  }
  if ( Math.abs(dz) <= 0o1/0o4 * Math.abs(dx) ) {
    let plej = null, plejD = rando;
    for ( const r of plano.vojoj ) {
      if ( r.orient !== "EW" ) continue;
      const wz = ofsZ + r.poz;
      const d = Math.max(Math.abs(az - wz), Math.abs(bz - wz));
      if ( d < plejD ) { plejD = d; plej = wz; }
    }
    if ( plej !== null ) return { linioX: null, linioZ: plej };
  }
  return null;
}
// ⟪ ការបិទភ្ជាប់ចំណុច 🎯 ⟫
// ⟨ ចំណុចភ្ជាប់ , មិនមែនគែមផ្លូវ 📃 ⟩ គឺផ្លូវពីរភ្ជាប់គ្នាបានល្អតែពេលចុងជួប
// ចំណុចតែមួយ ៖ ចំណុចប្រសព្វសំណាញ់ទីក្រុង , កំពូលផ្លូវ , ឬមាត់កំពង់ ។
// ការបិទភ្ជាប់ទៅគែមផ្លូវបង្កើតចុងកណ្តាលផ្លូវ ដែលមើលទៅដូចផ្លូវកាត់ ។
const VOJA_PINTA_RANDO = 0o5/0o2;
// ⟨ ការឃ្លាំងទុក ៖ ចំណុចសំណាញ់គឺថេរតាមផែនការ 📃 ⟩ ។ ការគណនាដំបូងគឺ
// O ( ns × ew ) , ដូច្នេះវាត្រូវធ្វើតែម្តងក្នុងមួយផែនការ ( ការអូសហៅវារាល់
// ចលនាកណ្ដុរ ) ។ ផែនការថ្មី = វត្ថុថ្មី , ដូច្នេះ WeakMap គឺជាការឃ្លាំងត្រឹមត្រូវ ។
const kradajPintajKasxoj = new WeakMap<KradaPlano, VojaPunkto[]>();
/* ចំណុចភ្ជាប់របស់ផែនការមួយ , ធៀបនឹងចំណុចកណ្តាលសំណាញ់
@param plano ( KradaPlano ) - ផែនការ
@returns punktoj ( [ number , number ] [ ] ) - ចំណុចមូលដ្ឋាន */
function kradajRelativajPintoj(plano: KradaPlano): VojaPunkto[] {
  const kasxita = kradajPintajKasxoj.get(plano);
  if (kasxita) return kasxita;
  const arto = new Map<string, VojaPunkto>();
  const aldoni = (x: number, z: number): void => {
    const klavo = x + "," + z;
    if (!arto.has(klavo)) arto.set(klavo, [ x, z ]);
  };
  const ns = plano.vojoj.filter(r => r.orient === "NS");
  const ew = plano.vojoj.filter(r => r.orient === "EW");
  for (const r of ns) { aldoni(r.poz, r.de); aldoni(r.poz, r.al); }
  for (const r of ew) { aldoni(r.de, r.poz); aldoni(r.al, r.poz); }
  for (const a of ns) for (const b of ew) {
    if (b.poz < a.de - 1e-6 || b.poz > a.al + 1e-6) continue;
    if (a.poz < b.de - 1e-6 || a.poz > b.al + 1e-6) continue;
    aldoni(a.poz, b.poz);
  }
  for (const s of plano.spronoj) {
    aldoni(s.de[0], s.de[1]);
    aldoni(s.al[0], s.al[1]);
  }
  const rezulto = [ ...arto.values() ];
  kradajPintajKasxoj.set(plano, rezulto);
  return rezulto;
}
/* ចំណុចភ្ជាប់របស់ផ្លូវសំណាញ់ ( ចុងចម្រៀក , ចំណុចប្រសព្វ , និងចុងស្ពន )
@returns punktoj ( [ number , number ] [ ] ) - ចំណុចក្នុងពិភពលោក */
function kradajPintoj(): VojaPunkto[] {
  const punktoj: VojaPunkto[] = [];
  const viditaj = new Set<string>();
  for (const k of vidotajKradoj()) {
    for (const p of kradajRelativajPintoj(k.plano)) {
      const x = k.ofsX + p[0], z = k.ofsZ + p[1], klavo = x + "," + z;
      if (viditaj.has(klavo)) continue;
      viditaj.add(klavo);
      punktoj.push([ x, z ]);
    }
  }
  return punktoj;
}
/* គ្រប់ចំណុចដែលផ្លូវអាចបិទភ្ជាប់ （ កំពូលផ្លូវផ្សេង , មាត់កំពង់ , ចំណុចសំណាញ់ ）
@param kromVojo ( number = -1 ) - ផ្លូវដែលមិនគិត（ ខ្លួនវា ）
@returns punktoj ( [ number , number ] [ ] ) - ចំណុចក្នុងពិភពលោក */
function pintajAlgluoj(kromVojo = -1): VojaPunkto[] {
  const punktoj = kradajPintoj();
  const viditaj = new Set<string>(punktoj.map(p => p[0] + "," + p[1]));
  const aldoni = (x: number, z: number): void => {
    const klavo = x + "," + z;
    if (viditaj.has(klavo)) return;
    viditaj.add(klavo);
    punktoj.push([ x, z ]);
  };
  for (let vi = 0; vi < vojoj.length; vi++) {
    if (vi === kromVojo) continue;
    for (const p of vojoj[vi].punktoj) aldoni(p[0], p[1]);
  }
  for (const d of dokoj) {
    const r = retoDokoLandaSegmento(d);
    aldoni(r.x, r.z);
  }
  return punktoj;
}
/* ចំណុចភ្ជាប់ជិតបំផុតក្នុងរង្វង់បិទភ្ជាប់
@param punktoj ( [ number , number ] [ ] ) - បញ្ជីចំណុច
@param mx, mz ( number ) - ទ្រនិច
@returns punkto ( [ number , number ] | null ) - ចំណុចឬ null */
function plejProksimaPinto(punktoj: VojaPunkto[], mx: number, mz: number): VojaPunkto | null {
  let plej: VojaPunkto | null = null, plejD = VOJA_PINTA_RANDO;
  for (const p of punktoj) {
    const d = Math.hypot(p[0] - mx, p[1] - mz);
    if (d < plejD) { plejD = d; plej = p; }
  }
  return plej;
}

// ⟨ ការតភ្ជាប់ស្វ័យប្រវត្តិនៃផ្លូវ 📃 ⟩
const VOJA_ALGLUA_RANDO = 0o5/0o2;
function vojaAlgluo(mx: number, mz: number, kromVojo: number, najbaro: VojaPunkto | null = null) {
  // ⟨ ចំណុចភ្ជាប់ឈ្នះមុន 📃 ⟩ ៖ បើចុងផ្លូវនៅជិតកំពូលផ្លូវផ្សេង , មាត់កំពង់ ,
  // ឬចំណុចប្រសព្វសំណាញ់ ចុងនោះត្រូវទៅចំចំណុចនោះ ។
  const pinto = plejProksimaPinto(pintajAlgluoj(kromVojo), mx, mz);
  if (pinto) return [ pinto[0], pinto[1] ];
  let plej = null, plejD = Infinity;
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    if ( vi === kromVojo ) continue;
    const v = vojoj[vi];
    const duono = vojaKunigaDuono(v);
    const rando = VOJA_ALGLUA_RANDO + duono;
    for ( let pi = 0; pi < v.punktoj.length - 1; pi++ ) {
      const a = v.punktoj[pi], b = v.punktoj[pi + 1];
      const projekcio = vojaProjekcio(mx, mz, a, b);
      if ( !projekcio || projekcio.d > rando ) continue;
      const dx = b[0] - a[0], dz = b[1] - a[1], longo = Math.hypot(dx, dz);
      const nx = -dz / longo, nz = dx / longo;
      // ⟨ ចុងជួបចុង ⟩ ។ បើចំណុចធ្លាក់នៅជិតចុងផ្លូវផ្សេង ( ជ្រុង ឬផ្លូវ
      // បន្តគ្នា ) តភ្ជាប់នៅចុងនោះផ្ទាល់ ជំនួសឱ្យបញ្ជូលទៅគែមដែល
      // ធ្វើឱ្យចុងផ្លូវលោតថ្លេងកណ្តាលទទឹងផ្លូវ ។
      if ( longo > 0 ) {
        const finoA = projekcio.t * longo <= VOJA_ALGLUA_RANDO;
        const finoB = ( 1 - projekcio.t ) * longo <= VOJA_ALGLUA_RANDO;
        if ( finoA || finoB ) {
          const fino = finoA && ( !finoB
            || Math.hypot(a[0] - mx, a[1] - mz) <= Math.hypot(b[0] - mx, b[1] - mz) ) ? a : b;
          const dFino = Math.hypot(fino[0] - mx, fino[1] - mz);
          if ( dFino < plejD ) { plejD = dFino; plej = [ fino[0], fino[1] ]; }
        }
      }
      const flankX = najbaro ? najbaro[0] : mx, flankZ = najbaro ? najbaro[1] : mz;
      const flankoValoro = ( flankX - projekcio.x ) * nx + ( flankZ - projekcio.z ) * nz;
      const flanko = Math.abs(flankoValoro) < VOJA_TUSXA_TOLERANCO
        ? ( ( mx - projekcio.x ) * nx + ( mz - projekcio.z ) * nz >= 0 ? 1 : -1 )
        : ( flankoValoro >= 0 ? 1 : -1 );
      const kandidato = [ projekcio.x + nx * duono * flanko, projekcio.z + nz * duono * flanko ];
      const kandidataD = Math.hypot(kandidato[0] - mx, kandidato[1] - mz);
      if ( kandidataD < plejD ) { plejD = kandidataD; plej = kandidato; }
    }
  }
  for ( let di = 0; di < dokoj.length; di++ ) {
    const d = dokoj[di], r = retoDokoLandaSegmento(d);
    const projekcio = vojaProjekcio(mx, mz, [ r.x - r.dx * DOKO_PLATFORMA_LARĜO / 2, r.z - r.dz * DOKO_PLATFORMA_LARĜO / 2 ],
      [ r.x + r.dx * DOKO_PLATFORMA_LARĜO / 2, r.z + r.dz * DOKO_PLATFORMA_LARĜO / 2 ]);
    if ( !projekcio || projekcio.d > VOJA_ALGLUA_RANDO + DOKO_PLATFORMA_LARĜO / 2 ) continue;
    const kandidataD = Math.hypot(projekcio.x - mx, projekcio.z - mz);
    if ( kandidataD < plejD ) { plejD = kandidataD; plej = [ projekcio.x, projekcio.z ]; }
  }
  return plej;
}

function forigiDuoblajnPunktojn(v: SkulptaVojo): number {
  let forigitaj = 0;
  for ( let i = v.punktoj.length - 1; i > 0 && v.punktoj.length > 2; i-- ) {
    const a = v.punktoj[i], b = v.punktoj[i - 1];
    if ( Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-6 ) { v.punktoj.splice(i, 1); forigitaj++; }
  }
  return forigitaj;
}

function konektiVojajnFinojn() {
  let kunigoj = 0;
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    const v = vojoj[vi];
    if ( !v.punktoj || v.punktoj.length < 2 ) continue;
    const lasta = v.punktoj.length - 1;
    for ( const pi of [ 0, lasta ] ) {
      const p = v.punktoj[pi], malnova = [ p[0], p[1] ];
      const najbaro = pi === 0 ? v.punktoj[1] : v.punktoj[lasta - 1];
      const algluo = vojaAlgluo(p[0], p[1], vi, najbaro);
      if ( !algluo ) continue;
      if ( Math.hypot(algluo[0] - p[0], algluo[1] - p[1]) < 1e-6 ) continue;
      const kiuKunfandisAntaŭ = vojoKunfandiĝas(v, vi);
      p[0] = algluo[0];
      p[1] = algluo[1];
      if ( vojoKunfandiĝas(v, vi) && ! kiuKunfandisAntaŭ ) {
        p[0] = malnova[0];
        p[1] = malnova[1];
        continue;
      }
      kunigoj++;
    }
    forigiDuoblajnPunktojn(v);
  }
  return kunigoj;
}

export function sxangiVojaPozicion(mx: number, mz: number) {
  if ( !vojaTrenata ) return;
  const c = vojaTrenata;
  if ( c.speco === "punkto" ) {
    const v = vojoj[c.vojo];
    if ( !v || !v.punktoj[c.punkto] ) return;
    const pi = c.punkto;
    const malnovaj = new Map();
    for ( const ni of [ pi - 1, pi, pi + 1 ] ) {
      if ( ni >= 0 && ni < v.punktoj.length ) malnovaj.set(ni, [ ...v.punktoj[ni] ]);
    }
    const kradaAlgluo = kradaVojaAlglu(mx, mz);
    const najbaro = pi > 0 ? v.punktoj[pi - 1] : v.punktoj[1];
    const voja = vojaAlgluo(mx, mz, c.vojo, najbaro);
    // ⟨ បិទភ្ជាប់ណាជិតជាងគេ ⟩ — ក្រឡាទីក្រុង ឬចុង/គែមផ្លូវផ្សេង ។
    // មុនក្រឡាតែងឈ្នះ ដែលធ្វើឱ្យចំណុចលោតចេញពីផ្លូវដែលកំពុងតភ្ជាប់
    // ពេលមានទាំងពីរនៅជិតគ្នា ។
    const dKrada = kradaAlgluo ? Math.hypot(kradaAlgluo[0] - mx, kradaAlgluo[1] - mz) : Infinity;
    const dVoja = voja ? Math.hypot(voja[0] - mx, voja[1] - mz) : Infinity;
    // ⟨ ចំណុចភ្ជាប់ឈ្នះមុន 📃 ⟩ ៖ ការភ្ជាប់ផ្លូវទៅផ្លូវត្រូវនៅចំចំណុចតែមួយ ។
    // បើខ្សែសំណាញ់ឈ្នះ , ចំណុចលោតចេញពីចំណុចភ្ជាប់ ហើយការភ្ជាប់បាក់ ។
    const pinto = plejProksimaPinto(pintajAlgluoj(c.vojo), mx, mz);
    let gx, gz;
    if ( pinto ) { gx = pinto[0]; gz = pinto[1]; }
    else if ( kradaAlgluo && dKrada <= dVoja ) { gx = kradaAlgluo[0]; gz = kradaAlgluo[1]; }
    else if ( voja ) { gx = voja[0]; gz = voja[1]; }
    else { gx = Math.round(mx * 2) / 2; gz = Math.round(mz * 2) / 2; }
    let linioX = null, linioZ = null;
    for ( const ni of [ pi - 1, pi + 1 ] ) {
      const n = v.punktoj[ni];
      if ( !n ) continue;
      const s = kradaSegmentoAlglu(n[0], n[1], gx, gz);
      if ( !s ) continue;
      if ( s.linioX !== null ) { n[0] = s.linioX; linioX = s.linioX; }
      else { n[1] = s.linioZ; linioZ = s.linioZ; }
    }
    // ⟨ ចំណុចដែលបានបិទភ្ជាប់មិនត្រូវរំកិលទេ 📃 ⟩
    if ( !pinto ) {
      if ( linioX !== null ) gx = linioX;
      if ( linioZ !== null ) gz = linioZ;
    }
    v.punktoj[pi] = [ gx, gz ];
    if ( vojoKunfandiĝas(v, c.vojo) ) {
      for ( const [ ni, p ] of malnovaj ) v.punktoj[ni] = p;
      statuso("ផ្លូវនោះនឹងត្រួតគ្នានឹងខ្លួនឯង ឬចតុកោណ 🛑");
      return;
    }
    elektitaPunkto = pi;
  } else if ( c.speco === "doko" ) {
    const d = dokoj[c.doko];
    if ( !d ) return;
    const antaupa = { ...d };
    d.x = Math.round(mx * 2) / 2;
    d.z = Math.round(mz * 2) / 2;
    // អូសកំពង់ ៖ តភ្ជាប់ទៅផ្លូវជិត ( ជម្រើសដែលងាកទៅទឹក ) ឬបើគ្មាន
    // ផ្លូវ ងាកទៅរកទឹកដោយស្វ័យប្រវត្តី ។
    orientiDokon(d, c.doko);
    if ( dokoKunfandiĝas(d, c.doko) ) {
      Object.assign(d, antaupa);
      statuso("ចតុកោណនោះនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណ 🛑");
      return;
    }
    elektitaDoko = c.doko;
  } else if ( c.speco === "dokoPinto" ) {
    const d = dokoj[c.doko];
    if ( !d || !dokoPintaBazo ) return;
    const antaupa = { ...d };
    // ⟨ កំពូលអូស ៖ ចំណុចដីនៅស្ថិត , កំពូលដើរតាមទ្រនិច , ប្រវែងកំពង់
    // = ចម្ងាយតាមអ័ក្សពីគោលដី ។ ដូច្នេះកំពង់ពង្រីក/បង្រួម ហើយ
    // ចំណុចទឹកផ្លាស់ទីផងដែរ , ដោយមិនលើកចំណុចដីចេញពីច្រាំង ។
    // បង្គត់ទៅ ០.៥ ដូចការអូសដទៃ ។ 📃 ⟩
    const b = dokoPintaBazo;
    const t = ( mx - b.x ) * b.ax + ( mz - b.z ) * b.az;
    const prof = Math.round(Math.max(DOKO_PROFUNDO_MIN, Math.min(DOKO_PROFUNDO_MAKS, t)) * 2) / 2;
    d.profundo = prof;
    d.x = Math.round(( b.x + b.ax * prof / 2 ) * 2) / 2;
    d.z = Math.round(( b.z + b.az * prof / 2 ) * 2) / 2;
    if ( dokoKunfandiĝas(d, c.doko) ) {
      Object.assign(d, antaupa);
      statuso("ចតុកោណនោះនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណ 🛑");
      return;
    }
  } else if ( c.speco === "dokoLando" ) {
    const d = dokoj[c.doko];
    if ( !d || !dokoLandaBazo ) return;
    const antaupa = { ...d };
    // ⟨ ចុងដីអូស ៖ ចុងទឹកនៅស្ថិត , ចុងដីដើរតាមទ្រនិច , ហើយកំពង់បង្វិលតាម ។
    // ជម្រៅ = ចម្ងាយពីចុងទឹក , ដូច្នេះការអូសក៏ពង្រីក/បង្រួមកំពង់ ។ 📃 ⟩
    const b = dokoLandaBazo;
    const dx = mx - b.x, dz = mz - b.z;
    const longo = Math.hypot(dx, dz);
    if ( longo < 0o1/0o100 ) return;
    const prof = Math.round(Math.max(DOKO_PROFUNDO_MIN, Math.min(DOKO_PROFUNDO_MAKS, longo)) * 2) / 2;
    const ux = dx / longo, uz = dz / longo;
    d.profundo = prof;
    d.rotacio = Math.atan2(ux, uz);
    d.x = Math.round(( b.x + ux * prof / 2 ) * 2) / 2;
    d.z = Math.round(( b.z + uz * prof / 2 ) * 2) / 2;
    if ( dokoKunfandiĝas(d, c.doko) ) {
      Object.assign(d, antaupa);
      statuso("ចតុកោណនោះនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណ 🛑");
      return;
    }
    elektitaDoko = c.doko;
  }
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

export function finiVojaTrenon() {
  if ( !vojaTrenata ) return;
  if ( vojaTrenata.speco === "punkto" ) {
    const v = vojoj[vojaTrenata.vojo];
    if ( v ) forigiDuoblajnPunktojn(v);
  }
  if ( vojaTrenata.speco === "dokoPinto" ) {
    // ⟨ កំពង់ថ្មីងាកទៅទឹកវិញ ក្រោយពង្រីក 📃 ⟩ បើការងាកមិនធ្វើឱ្យត្រួតគ្នា ។
    const d = dokoj[vojaTrenata.doko];
    if ( d ) orientiDokon(d, vojaTrenata.doko);
  }
  dokoPintaBazo = null;
  dokoLandaBazo = null;
  vojaTrenata = null;
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

/* aldoniVojanPunkton ។ បន្ថែមចំណុចមួយក្នុងផ្លូវនៅទីដែលចុច ។ ចំណុចថ្មី
   ដាក់លើផ្លូវ ( ចំណុចគោលលើស៊ីមែនត៍ជិតបំផុត ) ហើយបិទភ្ជាប់ទៅ
   ក្រឡាទីក្រុង ឬផ្លូវ/ចតុកោណផ្សេង បើជិតគោល ដូច្នេះចំណុចនៅតែ
   ស្ថិតលើផ្លូវដែលកំពុងកែ ។
    @param vi ( number ) - លិបិក្រមផ្លូវ។
    @param mx ( number ) - ពិភពលោក x ។
    @param mz ( number ) - ពិភពលោក z ។
@returns តើចំណុចត្រូវបានបន្ថែម ( boolean )។ */
function aldoniVojanPunkton(vi: number, mx: number, mz: number): boolean {
  const v = vojoj[vi];
  if ( !v || !v.punktoj ) {
    statuso("មិនមានផ្លូវដែលបានជ្រើសដើម្បីបន្ថែមចំណុចទេ");
    return false;
  }
  const kopio: SkulptaVojo = { ...v, punktoj: v.punktoj.map(p => [ ...p ] as VojaPunkto) };
  const kunfandisAntaŭ = vojoKunfandiĝas(v, vi);
  // ⟨ ចំណុចដែលបានជ្រើសនៅផ្លូវនេះឬ ? 📃 ⟩ ។ បើមិនដូច្នេះ ការចុចលើផ្លូវផ្សេង
  // នឹងបន្ថែមចំណុចនៅជាប់លិបិក្រមចាស់របស់ផ្លូវមុន ( ចំណុចខុសទីតាំង ) ។
  const elektisCxiTiu = elektitaVojo === vi && elektitaPunkto >= 0;
  const elektitaAntaue = elektitaPunkto;
  momenti();
  elektitaVojo = vi;
  let nx = Math.round(mx * 2) / 2;
  let nz = Math.round(mz * 2) / 2;
  if ( v.punktoj.length < 2 ) {
    v.punktoj.push([ nx, nz ]);
    elektitaPunkto = v.punktoj.length - 1;
  } else {
    // ⟨ គោលដៅ = ចម្រៀកជាប់នឹងចំណុចដែលជ្រើស , ឬចម្រៀកជិតបំផុត ⟩
    // ចំណុចថ្មីត្រូវបញ្ចូលជាប់នឹងចំណុចដែលបានជ្រើស ( មុន ឬក្រោយវា ) ,
    // ដូច្នេះការបន្ថែមចំណុចនៅកន្លែងដែលកំពុងកែ ។ បើគ្មានចំណុចជ្រើស ,
    // ចម្រៀកជិតបំផុតនឹងទ្រនិចឈ្នះ ។
    const lasta = v.punktoj.length - 1;
    let plej = 0, plejD = Infinity, plejT = 0;
    const projekcii = ( pi: number ): void => {
      const a = v.punktoj[pi], b = v.punktoj[pi + 1];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const t = Math.max(0, Math.min(1, ( ( mx - a[0] ) * ( b[0] - a[0] ) + ( mz - a[1] ) * ( b[1] - a[1] ) ) / ( l * l )));
      const d = Math.hypot(a[0] + t * ( b[0] - a[0] ) - mx, a[1] + t * ( b[1] - a[1] ) - mz);
      if ( d < plejD ) { plejD = d; plej = pi; plejT = t; }
    };
    if ( elektisCxiTiu && elektitaAntaue <= lasta ) {
      // ⟨ ចម្រៀកក្រោយចំណុចដែលជ្រើស , ឬចម្រៀកមុនវាបើវាជាចំណុចចុងក្រោយ ⟩
      const km = elektitaAntaue < lasta ? elektitaAntaue : Math.max(0, lasta - 1);
      plej = km;
      projekcii(km);
      // ⟨ នៅជាប់នឹងចំណុចជ្រើសជានិច្ច 📃 ⟩ ៖ បើការចុចនៅឆ្ងាយពីចម្រៀកនោះ ,
      // ការបញ្ចាំងត្រូវនឹងចុងម្ខាង ( = ចំណុចដែលមានរួច ) ដូច្នេះចំណុចថ្មី
      // មិនត្រូវបានបន្ថែមទេ ។ ដូច្នេះបម្រុងការបញ្ចាំងក្នុងកណ្តាលចម្រៀក ។
      if ( plejT < 0.2 || plejT > 0.8 ) plejT = 0.5;
      plejD = 0;
    } else {
      for ( let pi = 0; pi < lasta; pi++ ) projekcii(pi);
    }
    const a = v.punktoj[plej], b = v.punktoj[plej + 1];
    nx = a[0] + plejT * ( b[0] - a[0] );
    nz = a[1] + plejT * ( b[1] - a[1] );
    // ⟨ ការបិទភ្ជាប់ ⟩ ១ សមានីក្រឡាទីក្រុង ២ ផ្លូវ/ចតុកោណផ្សេង ។
    // បិទភ្ជាប់តែបើជិតគោល ដូច្នេះចំណុចថ្មីមិនលោតចេញពីផ្លូវទេ ។
    const seg = kradaSegmentoAlglu(a[0], a[1], b[0], b[1]);
    if ( seg ) {
      if ( seg.linioX !== null ) {
        a[0] = seg.linioX; b[0] = seg.linioX; nx = seg.linioX;
      } else {
        a[1] = seg.linioZ; b[1] = seg.linioZ; nz = seg.linioZ;
      }
    } else {
      const krada = kradaVojaAlglu(nx, nz);
      if ( krada && Math.hypot(krada[0] - nx, krada[1] - nz) <= 0o1/0o2 ) {
        nx = krada[0]; nz = krada[1];
      } else {
        const algluo = vojaAlgluo(mx, mz, vi);
        if ( algluo && Math.hypot(algluo[0] - nx, algluo[1] - nz) <= 0o3/0o2 ) {
          nx = algluo[0]; nz = algluo[1];
        }
      }
    }
    nx = Math.round(nx * 2) / 2;
    nz = Math.round(nz * 2) / 2;
    v.punktoj.splice(plej + 1, 0, [ nx, nz ]);
    elektitaPunkto = plej + 1;
  }
  if ( vojoKunfandiĝas(v, vi) && !kunfandisAntaŭ ) {
    vojoj[vi] = kopio;
    elektitaPunkto = Math.min(elektitaPunkto, kopio.punktoj.length - 1);
    statuso("ចំណុចថ្មីនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណ 🛑");
    gxisdatigiVojajnRegilojn();
    markiDesegnon();
    return false;
  }
  forigiDuoblajnPunktojn(v);
  const trovi = v.punktoj.findIndex(p => p[0] === nx && p[1] === nz);
  elektitaPunkto = trovi >= 0 ? trovi
    : Math.max(0, Math.min(elektitaPunkto, v.punktoj.length - 1));
  const kreskis = v.punktoj.length > kopio.punktoj.length;
  if ( !kreskis ) statuso("ចំណុចមានរួចហើយនៅទីនោះ");
  if ( JSON.stringify(v.punktoj) === JSON.stringify(kopio.punktoj) ) {
    gxisdatigiVojajnRegilojn();
    markiDesegnon();
    return false;
  }
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
  return kreskis;
}

function forigiVojanPunkton(vi: number, pi: number) {
  const v = vojoj[vi];
  if ( !v || v.punktoj.length <= 2 ) {
    statuso("ផ្លូវត្រូវការចំណុចយ៉ាងតិចពីរ , មិនអាចលុបបានទេ 🚫");
    return;
  }
  momenti();
  v.punktoj.splice(pi, 1);
  elektitaVojo = vi;
  elektitaPunkto = Math.max(0, pi - 1);
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

export function sxangxiKradanCelon(mx: number, mz: number) {
  // បើការចុចនៅលើក្រឡារបស់ទីក្រុងផ្សេងដែលកំពុងបង្ហាញ ជ្រើសទីក្រុង
  // នោះជំនួសការកែក្រឡាឆ្ងាយក្នុងទីក្រុងបច្ចុប្បន្ន ។
  for ( const k of vidotajKradoj() ) {
    if ( k.indekso === elektitaUrbo ) continue;
    const kc = Math.round(( mx - k.ofsX ) / k.plano.PASXO);
    const kr = Math.round(( mz - k.ofsZ ) / k.plano.PASXO);
    if ( k.plano.ĉeloj.some(( [ lc, lr ] ) => lc === kc && lr === kr) ) {
      elektiUrbon(k.indekso);
      statuso("បានជ្រើសទីក្រុង " + ( urboj[k.indekso]?.nomo ?? "" ) + " 🏙️");
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
    const anguloj: [ number, number, string ][] = [ [ BLOKO, BLOKO, "NE" ], [ -BLOKO, BLOKO, "NW" ], [ -BLOKO, -BLOKO, "SW" ], [ BLOKO, -BLOKO, "SE" ] ];
    for ( const [ sx, sz, nomo ] of anguloj ) {
      const d = Math.hypot(mx - ( cx + sx ), mz - ( cz + sz ));
      if ( d < plejD ) { plejD = d; plej = nomo; }
    }
    const ŝ = c + "," + r + "," + String(plej);
    if ( kradoTipoElektita === "automata" ) {
      if ( !kradoSuperoj.delete(ŝ) ) return;
    } else {
      if ( Math.abs(c * PASXO + kradoOfsX) > MONDO_HALFO || Math.abs(r * PASXO + kradoOfsZ) > MONDO_HALFO ) return;
      kradoSuperoj.set(ŝ, kradoTipoElektita);
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
  if ( kradoTipoElektita === "automata" ) {
    if ( !kradoSuperoj.delete(ŝ) ) return;
  } else {
    if ( Math.abs(c * PASXO + kradoOfsX) > MONDO_HALFO || Math.abs(r * PASXO + kradoOfsZ) > MONDO_HALFO ) return;
    kradoSuperoj.set(ŝ, kradoTipoElektita);
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
    @param skalo ( number ) - ភីកសែលក្នុងមួយឯកតាពិភពលោក។ */
export function desegniKradanTavolon(k: CanvasRenderingContext2D, plano: KradaPlano,
  X: ( x: number ) => number, Z: ( z: number ) => number, skalo: number): void {
  k.lineWidth = 0o7/0o2 * skalo;
  k.strokeStyle = "rgba(218,218,228,0.9)";
  k.beginPath();
  for ( const v of plano.vojoj ) {
    if ( v.orient === "EW" ) { k.moveTo(X(v.de), Z(v.poz)); k.lineTo(X(v.al), Z(v.poz)); }
    else { k.moveTo(X(v.poz), Z(v.de)); k.lineTo(X(v.poz), Z(v.al)); }
  }
  k.stroke();
  k.lineWidth = Math.max(1, 0o55/0o40 * skalo);
  k.strokeStyle = "rgba(255,255,255,0.55)";
  k.beginPath();
  for ( const sp of plano.spronoj ) {
    k.moveTo(X(sp.de[0]), Z(sp.de[1]));
    k.lineTo(X(sp.al[0]), Z(sp.al[1]));
  }
  k.stroke();
  const radu = 0o265/0o40 * skalo;
  for ( const b of plano.konstruaĵoj ) {
    const sx = X(b.x), sy = Z(b.z);
    const koloro = b.stacia ? KRADAJ_KOLOROJ.stacio : KRADAJ_KOLOROJ[b.tipo];
    k.fillStyle = koloro;
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
    k.arc(pdx, pdz, Math.max(0o3/0o2, 0o115/0o100 * skalo), 0, Math.PI * 2);
    k.fill();
  }
}

elementoj<HTMLButtonElement>("#kradaro button").forEach(b => {
  b.addEventListener("click", () => {
    kradoTipoElektita = ( b.dataset.kradoTipo as CellType | undefined ) ?? "automata";
    elementoj<HTMLButtonElement>("#kradaro button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
urboElektilo.addEventListener("change", () => elektiUrbon(parseInt(urboElektilo.value, 0o12) || 0));
urboNomoEl.addEventListener("input", () => {
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  u.nomo = urboNomoEl.value;
  gxisdatigiUrboElektilon();
  markiSxangxitan();
  markiDesegnon();
});
urboAldoniBtn.addEventListener("click", () => {
  urboj.push({ nomo: "ទីក្រុងថ្មី", arangxaGrando: 1, blokaGrando: "unu", ofsX: 0o200, ofsZ: -0o200, aldonajBlokoj: [] });
  elektiUrbon(urboj.length - 1);
  markiSxangxitan();
  markiDesegnon();
});
urboForigiBtn.addEventListener("click", () => {
  if ( urboj.length <= 1 ) return;
  foriguUrbon(elektitaUrbo);
  urboj.splice(elektitaUrbo, 1);
  elektiUrbon(Math.max(0, elektitaUrbo - 1));
  markiSxangxitan();
  markiDesegnon();
});
kradoGrandecoEl.addEventListener("change", () => { kradoGrandeco = parseInt(kradoGrandecoEl.value, 0o12); skribiElektitanUrbon(); gxisdatigiKradon(); });
kradoBlokoEl.addEventListener("change", () => { kradoBloko = kradoBlokoEl.value as "unu" | "kvar"; skribiElektitanUrbon(); gxisdatigiKradon(); });
kradoOfsXEl.addEventListener("change", () => { kradoOfsX = parseFloat(kradoOfsXEl.value) || 0; skribiElektitanUrbon(); gxisdatigiUrboElektilon(); gxisdatigiKradon(); });
kradoOfsZEl.addEventListener("change", () => { kradoOfsZ = parseFloat(kradoOfsZEl.value) || 0; skribiElektitanUrbon(); gxisdatigiUrboElektilon(); gxisdatigiKradon(); });
kradoKeuxfhxesoEl.addEventListener("change", () => { kradoKeuxfhxeso = kradoKeuxfhxesoEl.checked; skribiElektitanUrbon(); gxisdatigiKradon(); });
kradoLampojEl.addEventListener("change", () => { kradoLampoj = kradoLampojEl.checked; skribiElektitanUrbon(); gxisdatigiKradon(); });
aldonaBlokoElektilo.addEventListener("change", () => {
  elektitaAldonaBloko = parseInt(aldonaBlokoElektilo.value, 0o12) || 0;
  gxisdatigiAldonaBlokojn();
  markiDesegnon();
});
aldonaBlokoTipoEl.addEventListener("change", () => {
  skribiAldonanBlokon();
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  const b = blokoj[elektitaAldonaBloko];
  if ( b && b.stacia && b.tipo !== "stacio" ) {
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
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  momenti();
  if ( !u.aldonajBlokoj ) u.aldonajBlokoj = [];
  const pasxo = kradoBloko === "kvar" ? 0o40 : 0o30;
  const stacioZ = kradoBloko === "kvar" ? 0 : kradoGrandeco * pasxo + 0o30;
  u.aldonajBlokoj.push({ x: 0, z: stacioZ, tipo: "stacio", rot: Math.PI, sub: "centro", stacia: true, konektita: true });
  elektitaAldonaBloko = u.aldonajBlokoj.length - 1;
  markiSxangxitan();
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
});
aldonaBlokoForigiBtn.addEventListener("click", () => {
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  if ( !blokoj.length ) return;
  momenti();
  blokoj.splice(elektitaAldonaBloko, 1);
  elektitaAldonaBloko = Math.max(0, elektitaAldonaBloko - 1);
  markiSxangxitan();
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
});
vojoElektilo.addEventListener("change", () => {
  elektitaVojo = parseInt(vojoElektilo.value, 0o12) || 0;
  elektitaPunkto = -1;
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
vojoNomoEl.addEventListener("input", () => {
  const v = vojoj[elektitaVojo];
  if ( !v ) return;
  v.nomo = vojoNomoEl.value;
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
vojoLargxoEl.addEventListener("change", () => { skribiVojoSekure(); });
vojoPunktoElektilo.addEventListener("change", () => {
  elektitaPunkto = parseInt(vojoPunktoElektilo.value, 0o12) || 0;
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
vojoPunktoXEl.addEventListener("change", () => { skribiVojoSekure(); });
vojoPunktoZEl.addEventListener("change", () => { skribiVojoSekure(); });
vojoAldoniBtn.addEventListener("click", () => {
  momenti();
  const v = vojoj[elektitaVojo];
  const last: VojaPunkto = v && v.punktoj && v.punktoj.length ? v.punktoj[v.punktoj.length - 1] : [ 0, 0 ];
  const nova: SkulptaVojo = { nomo: "ផ្លូវថ្មី", larĝo: 0o7/0o2, punktoj: [
    [ Math.round(( last[0] - 0o12 ) * 2) / 2, last[1] ],
    [ Math.round(( last[0] + 0o12 ) * 2) / 2, last[1] ] ] };
  vojoj.push(nova);
  if ( vojoKunfandiĝas(nova, vojoj.length - 1) ) {
    vojoj.pop();
    statuso("ផ្លូវថ្មីនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណដែលមានស្រាប់ 🛑");
    return;
  }
  elektitaVojo = vojoj.length - 1;
  elektitaPunkto = -1;
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
vojoForigiBtn.addEventListener("click", () => {
  if ( vojoj.length <= 1 ) return;
  momenti();
  vojoj.splice(elektitaVojo, 1);
  elektitaVojo = Math.max(0, elektitaVojo - 1);
  elektitaPunkto = -1;
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
vojoKonektiBtn.addEventListener("click", () => {
  momenti();
  let vojajKunigoj = 0, movaj = 0, rondoj = 0;
  do {
    movaj = konektiVojajnFinojn();
    vojajKunigoj += movaj;
  } while ( movaj > 0 && ++rondoj < vojoj.length * 2 );
  const dokojajKunigoj = konektiDokojnAlVojojn();
  movaj = 0;
  rondoj = 0;
  do {
    movaj = konektiVojajnFinojn();
    vojajKunigoj += movaj;
  } while ( movaj > 0 && ++rondoj < vojoj.length * 2 );
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  gxisdatigiKradon();
  statuso("បានភ្ជាប់ " + vojajKunigoj + " ចុងផ្លូវ និង " + dokojajKunigoj + " ចតុកោណ 🔗");
  markiDesegnon();
});
vojoPunktoAldoniBtn.addEventListener("click", () => {
  const v = vojoj[elektitaVojo];
  if ( !v ) return;
  momenti();
  // ⟨ បន្ថែមនៅជាប់ចំណុចដែលជ្រើស 📃 ⟩ ។ បើជ្រើសចំណុចកណ្តាល , ចំណុចថ្មី
  // ចូលក្នុងចម្រៀកបន្ទាប់ពីវា ( ពាក់កណ្តាលចម្រៀក ) ។ បើជ្រើសចំណុចចុងក្រោយ ,
  // ចំណុចថ្មីបន្ថែមបន្តទៅមុខ ។ បើគ្មានការជ្រើស , បន្ថែមនៅចុងផ្លូវ ។
  const sel = elektitaPunkto >= 0
    ? Math.max(0, Math.min(elektitaPunkto, v.punktoj.length - 1))
    : v.punktoj.length - 1;
  const a = v.punktoj[sel];
  const b = v.punktoj[sel + 1];
  const nova: VojaPunkto = b
    ? [ Math.round(( a[0] + b[0] ) ) / 2, Math.round(( a[1] + b[1] ) ) / 2 ]
    : [ Math.round(( a[0] + 0o12 ) * 2) / 2, Math.round(a[1] * 2) / 2 ];
  v.punktoj.splice(sel + 1, 0, nova);
  elektitaPunkto = sel + 1;
  if ( vojoKunfandiĝas(v, elektitaVojo) ) {
    v.punktoj.splice(sel + 1, 1);
    elektitaPunkto = sel;
    statuso("ចំណុចថ្មីនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណ 🛑");
  }
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
vojoPunktoForigiBtn.addEventListener("click", () => {
  const v = vojoj[elektitaVojo];
  if ( !v || v.punktoj.length <= 2 ) return;
  momenti();
  v.punktoj.splice(elektitaPunkto, 1);
  elektitaPunkto = Math.max(0, elektitaPunkto - 1);
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
dokoElektilo.addEventListener("change", () => {
  elektitaDoko = parseInt(dokoElektilo.value, 0o12) || 0;
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
dokoXEl.addEventListener("change", () => { skribiDokoSekure(); });
dokoZEl.addEventListener("change", () => { skribiDokoSekure(); });
dokoProfundoEl.addEventListener("change", () => { skribiDokoSekure(); });
dokoRotacioEl.addEventListener("change", () => { skribiDokoSekure(); });
dokoAldoniBtn.addEventListener("click", () => {
  momenti();
  const last = dokoj[dokoj.length - 1];
  const nova = { x: last ? Math.round(( last.x + 0o30 ) * 2) / 2 : 0, z: last ? last.z : 0, profundo: 0o20, rotacio: last ? ( last.rotacio ?? 0 ) : 0 };
  dokoj.push(nova);
  const indekso = dokoj.length - 1;
  if ( dokoKunfandiĝas(nova, indekso) ) {
    dokoj.pop();
    statuso("ចតុកោណថ្មីនឹងត្រួតគ្នានឹងផ្លូវ ឬចតុកោណ 🛑");
    return;
  }
  orientiDokon(nova, indekso);
  elektitaDoko = indekso;
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
dokoForigiBtn.addEventListener("click", () => {
  if ( dokoj.length <= 1 ) return;
  momenti();
  dokoj.splice(elektitaDoko, 1);
  elektitaDoko = Math.max(0, elektitaDoko - 1);
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
elementoj<HTMLButtonElement>("#vojaIloj button").forEach(b => {
  b.addEventListener("click", () => {
    vojaIlo = b.dataset.vojaIlo ?? "movu";
    elementoj<HTMLButtonElement>("#vojaIloj button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
kradoRestarigiBtn.addEventListener("click", () => { kradoSuperoj.clear(); sinkronigiSuperojn(); markiSxangxitan(); statuso("ការផ្លាស់ប្តូរមិនបានរក្សាទុក"); gxisdatigiKradon(); });
kradoKopiiBtn.addEventListener("click", async() => {
  const u = urboj[elektitaUrbo];
  const teksto = u
    ? `{ nomo: "${u.nomo}", arangxaGrando: ${u.arangxaGrando}, blokaGrando: "${u.blokaGrando}", ofsX: ${u.ofsX}, ofsZ: ${u.ofsZ} }`
    : "";
  try {
    await navigator.clipboard.writeText(teksto);
    statuso("បានចម្លង , " + teksto);
  } catch {
    statuso("មិនអាចចម្លងស្វ័យប្រវត្តិបាន , ជ្រើសដោយដៃ , " + teksto);
  }
});

