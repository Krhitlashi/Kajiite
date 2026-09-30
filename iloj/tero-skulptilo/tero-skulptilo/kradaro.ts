// ≺⧼ ទីក្រុងក្រឡា និងផ្លូវ 🏙️ ⧽≻
// ផ្ទាំងក្រឡាបង្ហាញ និងកែសម្រួលក្រឡាទីក្រុងដូចគ្នាដែលហ្គេម
// សាងសង់ពី KradaArangxo ព្រមទាំងផ្លូវ និងកំពង់នៅកម្រិតពិភពលោក។ ផ្នែកទាំងពីរ
// គឺឧបករណ៍តែមួយ ។ ក្រឡា ភ្ជាប់ ទៅផ្លូវពិភពលោក ( ផ្លូវក្រឡារបស់ស្ថានី )
// ហើយផ្លូវ បិទភ្ជាប់ ទៅបណ្តាញក្រឡា ដូច្នេះវាមិនញែកចេញពីគ្នា។
// ស្ថានភាពអានដោយផ្ទាល់ ( តំណរស់របស់ ES module ) មានតែ
// អនុគមន៍កំណត់ ( agordiDatumojn, agordiUrbojn, agordiVojojn, ... ) ទេដែលកែវា។
import { MONDO_HALFO } from "./mezuroj.js";
import { akvaRezulto, cxuAkvo } from "./akvo.js";
import { bildilo3d } from "./vido3d.js";
import { rekonstruiKradon3D, rekonstruiVojojn3D } from "./krado3d.js";
// ម៉ូឌុលក្រឡាសុទ្ធដូចគ្នានឹងហ្គេម ( kantaoj/mondo/krado.ts )។
import { kreiKradanPlanon } from "../../../kantaoj/mondo/krado/plano.js";
import { validiKradon } from "../../../kantaoj/mondo/krado/validigo.js";
import { aldoniVojon } from "../../../kantaoj/mondo/krado/aldonoj.js";
import { superajElDatumo, superojElDatumo } from "../../../kantaoj/mondo/krado/superoj.js";
// ប្រភេទទិន្នន័យរបស់ពិភពលោកឆ្លាក់ ។ ដូចគ្នានឹងអ្វីដែលហ្គេមអាន
// ( kantaoj/mondo/urbo/tipoj.ts )។
import type { SkulptaUrbo, SkulptaVojo, SkulptaPlatformo } from "../../../kantaoj/mondo/urbo/tipoj.js";
import type { CellType, KradaPlano } from "../../../kantaoj/mondo/krado/tipoj.js";
import type { VojaPunkto } from "../../../eskekoj/medio/voj-reto.js";
import { elemento, elementoj } from "../../komunajxoj/dom.js";
// ជំនួយការផ្លូវរបស់ហ្គេម ( ការលាយបញ្ចូល កំពង់ ការបិទភ្ជាប់ )។
import { vojaDuonLargho as retoVojaDuonLargho, vojaKunigaDuono as retoVojaKunigaDuono,
  pontoDuonLargho as retoPontoDuonLargho, vojaProjekcio as retoVojaProjekcio,
  vojoKunfandiĝas as retoVojoKunfandiĝas,
  dokoKunfandiĝas as retoDokoKunfandiĝas, dokoKonektasVojon as dokoKonektasVojonReto,
  vojajKunfandajxoj as retoVojajKunfandajxoj, plejProximaVojo as retoPlejProximaVojo,
  konektiDokonAlVojo as retoKonektiDokonAlVojo,
  dokoLandaSegmento as retoDokoLandaSegmento,
  DOKO_PLATFORMA_LARĜO } from "../../../eskekoj/medio/voj-reto.js";

// ⟪ តំណជាមួយកម្មវិធីកែ 📃 ⟫ ។ ឯកសារយោងរបស់ឯកសារមេ ភ្ជាប់គ្នា
// ម្តងដោយ agordiKradaron។ ទិដ្ឋភាព ( ចំណុចកណ្តាល និងការពង្រីក )
// ផ្លាស់ប្តូរពេលប្រើ ដូច្នេះវាអានតាម FUNKCIOJ។
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

// ⟪ អនុគមន៍កំណត់ 📃 ⟫ ។ ការសរសេរតែមួយគត់ទៅស្ថានភាពទីក្រុង និង
// ផ្លូវពីឯកសារមេ ( ការផ្ទុកផែនទី ការត្រឡប់ក្រោយ និងការរក្សាទុក
// មុនៗ )។ បញ្ជីអានដោយផ្ទាល់។
export function agordiUrbojn(listo: SkulptaUrbo[]) { urboj = Array.isArray(listo) ? listo : []; }
export function agordiElektitanUrbon(i: number) { elektitaUrbo = i; }
export function agordiElektitanAldonanBlokon(i: number) { elektitaAldonaBloko = i; }
export function agordiVojojn(listo: SkulptaVojo[]) { vojoj = Array.isArray(listo) ? listo : []; }
export function agordiDokojn(listo: SkulptaPlatformo[]) { dokoj = Array.isArray(listo) ? listo : []; }

// ផ្ទាំងគំនូសរបស់ផែនទី 2D ។ ស្រទាប់ក្រឡាគូរលើវា។
const mapo = elemento<HTMLCanvasElement>("mapo");

// ════════════════════════ ក្រឡា 🏙️ ( ក្រឡាទីក្រុង ) ════════════════════════
// ផ្ទាំងក្រឡាបង្ហាញ និងកែសម្រួលក្រឡាទីក្រុងដូចគ្នាដែលហ្គេម
// សាងសង់ពី KradaArangxo ( kantaoj/mondo/urbo.ts → kantaoj/mondo/krado.ts ។ ម៉ូឌុល
// សុទ្ធដូចគ្នា )។ អគារបង្ហាញ តែ ពេលផ្ទាំងនេះសកម្មប៉ុណ្ណោះ ។
// ក្នុង 2D លើផែនទី ( desegniKradanTavolon ) និងជារូបរាង 3D ពិតក្នុង
// ទិដ្ឋភាព 3D ( rekonstruiKradon3D ។ អគារ ពិត របស់ហ្គេម រូបរាងនោះ
// ស្ថិតនៅ tero-skulptilo/krado3d.js )។ ការកំណត់
// ផ្លាស់ប្តូរការតំឡើង ( ទំហំ ប្លុក ) និងតម្រុយ បន្ទះពណ៌
// ជ្រើសប្រភេទសម្រាប់ការកែដោយចុច ហើយសំណពីលើ ( Mapo "c,r" → ប្រភេទ )
// ផ្លាស់ប្តូរ ឬបន្ថែមក្រឡាដោយដៃ។
// ទីក្រុង ។ ការតំឡើងក្រឡា និងតម្រុយរបស់ SKULPTA_URBOJ ( បញ្ជីដូចគ្នា
// ដែលហ្គេមសាងសង់ )។ កម្មវិធីជ្រើសទីក្រុងក្នុងផ្ទាំងក្រឡាជ្រើស
// ទីក្រុងសម្រាប់កែ ការផ្លាស់ប្តូរត្រូវសរសេរត្រឡប់ទៅទីក្រុង និងរក្សាទុកទៅ
// ឯកសារទិន្នន័យ ( generiDosierojn សរសេរ SKULPTA_URBOJ ទៅ kantaoj/tero-datumaro/urboj.ts )។
export let urboj: SkulptaUrbo[] = [];  // ការតំឡើងក្រឡា និងតម្រុយ ( SKULPTA_URBOJ )
export let elektitaUrbo = 0;            // ទីក្រុងដែលបានជ្រើស ( ទីមួយគឺមេ )
export let kradoGrandeco = 3;           // arangxaGrando ( 1 ĝis 6 ) ។ ទំហំរៀបចំក្រឡា
export let kradoBloko: "unu" | "kvar" = "unu";   // blokaGrando ( "unu" | "kvar" ) ។ ទំហំប្លុកក្រឡា
export let kradoOfsX = 0, kradoOfsZ = 0;   // តម្រុយនៃចំណុចកណ្តាលក្រឡា
export let kradoKeuxfhxeso = false;     // keŭfĥesoj ជុំវិញចំណុចកណ្តាល
export let kradoLampoj = true;          // គំរូផ្លូវបួនចង្កៀង ( បើកតាមលំនាំដើម )
export let kradoTipoElektita: CellType | "automata" = "automata";   // បន្ទះពណ៌ ( "automata" = ប្រភេទដែលបង្កើត )
export let kradoSuperoj: Map<string, CellType> = new Map();   // "c,r" → ប្រភេទ ( unu ) ឬ "c,r,SUB" → ប្រភេទ ( kvar )
export let vojoj: SkulptaVojo[] = [];   // ផ្លូវកម្រិតពិភពលោក ( SKULPTA_VOJOJ )
export let dokoj: SkulptaPlatformo[] = [];   // កំពង់ ( SKULPTA_DOKOJ )

// agordiDatumojn ។ ការផ្ទុកដំបូងរបស់ទិន្នន័យ ( ទីក្រុង ផ្លូវ
// និងកំពង់នៃផែនទី )។ តម្លៃលំនាំដើម ( កំពង់ធំ មហាវិថី និងកំពង់ទាំងបី )
// មានសុពលភាព ពេលផែនទីគ្មានផ្លូវសោះ ។ ដូចផែនទីចាស់។
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
    : [ { nomo: "Kajo", larĝo: 0o7/0o2, punktoj: [ [ -84, -96 ], [ -56, -104 ], [ -48, -100 ], [ 0, -90 ], [ 48, -80 ], [ 56, -84 ], [ 84, -82 ] ] },
        { nomo: "Avenuo", larĝo: 0o7/0o2, punktoj: [ [ 12, -64 ], [ 12, -88 ] ] } ];
  const datumajDokoj = datumoj.dokoj ?? [];
  dokoj = datumajDokoj.length
    ? datumajDokoj.map(d => ( { ...d } ))
    : [ { x: -48, z: -108, profundo: 16 }, { x: 0, z: -98, profundo: 16 }, { x: 48, z: -88, profundo: 16 } ];
}

// sinkronigiSuperojn ។ សំណពីលើក្រឡារស់ ទៅទិន្នន័យទីក្រុងដែលរក្សាទុក
// ( ការរក្សាទុកសរសេរពួកវាទៅ SKULPTA_URBOJ ហើយហ្គេមអនុវត្តពួកវា )។
export function sinkronigiSuperojn() {
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  u.superoj = superojElDatumo(kradoSuperoj);
}
let kradaPlanoCache: ReturnType<typeof kreiKradanPlanon> | null = null;
// កំពង់ និងផ្លូវជាលក្ខណៈពិភពលោករបស់ទីក្រុងមេ ( SKULPTA_DOKOJ
// និង SKULPTA_VOJOJ ក្នុង kantaoj/tero-datumaro/vojoj.ts ) កែតាម
// ផ្ទាំងរងផ្លូវនៃផ្ទាំងក្រឡា។ យានអវកាស និងទូកកាណូ
// ជាវត្ថុ ( SKULPTA_OBJEKTOJ ) ។ កែ
// ដោយឧបករណ៍វត្ថុ មិនមែនតាមផ្ទាំងរងផ្លូវទៀតទេ។
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
// ប្លុកបន្ថែម ។ សំណង់បន្ថែមរបស់ទីក្រុងដែលកំពុងកែ
// ( ស្ថានីយានអវកាសរបស់ទីក្រុងមេគឺមួយ ) ដាក់ដោយឡែកពី
// ការបង្កើតក្រឡា។ ប្លុកដែលបានជ្រើស និងការអូសលើផែនទី។
export let elektitaAldonaBloko = -1;
export let aldonaTrenata = -1;             // លេខលំដាប់នៃប្លុកបន្ថែមដែលកំពុងអូស
const aldonaBlokoElektilo = elemento<HTMLSelectElement>("aldonaBlokoElektilo");
const aldonaBlokoTipoEl = elemento<HTMLSelectElement>("aldonaBlokoTipo");
const aldonaBlokoXEl = elemento<HTMLInputElement>("aldonaBlokoX");
const aldonaBlokoZEl = elemento<HTMLInputElement>("aldonaBlokoZ");
const aldonaBlokoRotEl = elemento<HTMLInputElement>("aldonaBlokoRot");
const aldonaBlokoStaciaEl = elemento<HTMLInputElement>("aldonaBlokoStacia");
const aldonaBlokoKonektitaEl = elemento<HTMLInputElement>("aldonaBlokoKonektita");
const aldonaBlokoAldoniBtn = elemento<HTMLButtonElement>("aldonaBlokoAldoni");
const aldonaBlokoForigiBtn = elemento<HTMLButtonElement>("aldonaBlokoForigi");
// ផ្ទាំងរងផ្លូវនៃផ្ទាំងក្រឡា ។ ផ្លូវ ចំណុច កំពង់ ដែលបានជ្រើស និង
// ឧបករណ៍រងលើផែនទី។ លក្ខណៈពិភពលោក ( ផ្លូវ កំពង់ ) កែនៅទីនេះ
// ប៉ុន្តែនៅតែជាកម្រិតពិភពលោក ( ដើម្បីឱ្យវាភ្ជាប់ទីក្រុងច្រើនបាននៅអនាគត )។
export let elektitaVojo = 0;          // លេខលំដាប់ក្នុង vojoj
export let elektitaPunkto = -1;       // ចំណុចនៃផ្លូវដែលបានជ្រើស ( -1 = គ្មាន )
export let elektitaDoko = 0;          // លេខលំដាប់ក្នុង dokoj
let vojaIlo: string = "movu";          // "movu" | "aldoni" | "forigi" ។ ឧបករណ៍កែផ្លូវ
// VojaCelo ។ គោលដៅនៃផ្ទាំងរងផ្លូវក្រោមការចុច ( ចំណុច
// កំពង់ ឬផ្លូវខ្លួនឯង )។
type VojaCelo = { speco: "punkto"; vojo: number; punkto: number }
  | { speco: "doko"; doko: number }
  | { speco: "vojo"; vojo: number };
export let vojaTrenata: VojaCelo | null = null;

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

// kradoPlano ។ ផែនការបច្ចុប្បន្នជាមួយសំណពីលើ។ ការកែក្រឡាមានសុពលភាព
// ភ្លាម។ ផ្លូវ សាខា និងអគារគណនាឡើងវិញជុំវិញក្រឡាដែលបានផ្លាស់ប្តូរ ឬ
// បន្ថែម ។ តក្កដូចគ្នានឹងហ្គេម។ ប្លុក បន្ថែម របស់
// ទីក្រុងដែលកំពុងកែ ( ស្ថានីយានអវកាស និងសំណង់បន្ថែមផ្សេងទៀត )
// មកពីទិន្នន័យទីក្រុង ( aldonajBlokoj ) ។ ដោយឡែកពីការបង្កើតក្រឡា។
// ពេលទីក្រុងមេត្រូវបានជ្រើស អ្នកសាងសង់ផ្លូវ ( aldoniVojon )
// បន្ថែមមហាវិថីកំពង់ ។ ផ្លូវកម្រិតពិភពលោករបស់ទីក្រុងមេ។
export function kradoPlano() {
  if ( !kradaPlanoCache ) {
    const u = urboj[elektitaUrbo];
    kradaPlanoCache = kreiKradanPlanon(
      { arangxaGrando: kradoGrandeco, blokaGrando: kradoBloko, lampoj: kradoLampoj },
      kradoSuperoj, u && u.aldonajBlokoj ? u.aldonajBlokoj : []);
    // ផ្លូវកម្រិតពិភពលោក ភ្ជាប់ ទៅបណ្តាញក្រឡា ។ ចម្រៀក
    // ស្របអ័ក្សលើ បន្ទាត់ ដូចគ្នានឹងផ្លូវក្រឡាដែលមានស្រាប់ ( ទីតាំង
    // ស្មើគ្នា ) ត្រូវបានបន្ថែមជាផ្លូវក្រឡារបស់ស្ថានី។ បន្ទាប់មកក្រឡាបង្ហាញ
    // ពួកវាជាផ្នែកបន្ថែមរបស់ខ្លួន ( ស្រទាប់ជាន់លើ 2D ទិដ្ឋភាព 3D និង
    // សាខាឈានដល់ពួកវា ) ។ មហាវិថីរបស់ទីក្រុងមេគឺជាឧទាហរណ៍។
    // វាបន្តផ្លូវ NS នៅ x=12 ទៅត្បូងដល់កំពង់។
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
export function gxisdatigiKradon() {
  // ផែនការមក តែងតែ ពី kradoPlano ។ អ្នកសាងសង់តែមួយគត់ ( វាបន្ថែម
  // ដំបងផ្លូវតភ្ជាប់ផងដែរ )។ ពីមុនអនុគមន៍នេះសាងសង់
  // ដោយគ្មានដំបង ហើយពួកវាបាត់នៅរាល់ការកែក្រឡា។
  kradaPlanoCache = null;
  kradoPlano();
  gxisdatigiKradajnStatistikojn();
  rekonstruiKradon3D();
  markiDesegnon();
}
function gxisdatigiKradajnStatistikojn() {
  const el = elemento<HTMLElement>("kradoStatistikoj");
  if ( !el || !kradaPlanoCache ) return;
  const plano = kradaPlanoCache;
  // ការត្រួតពិនិត្យស៊ីមេទ្រីមានសុពលភាពតែចំពោះក្រឡាដែល បង្កើត ។ ការកែ
  // ដោយដៃធ្វើឱ្យវាបែកដោយចេតនា ( ក្រឡាមួយផ្លាស់ប្តូរ មិនមែនកញ្ចក់
  // ទាំងបួន )។ ស្ថិតិបង្ហាញបញ្ហារចនាសម្ព័ន្ធ។
  const problemoj = validiKradon(plano).filter(p => !p.kodo.startsWith("simetrio-"));
  const bazo = `${plano.ĉeloj.length} ĉeloj · ${plano.konstruaĵoj.length} konstruaĵoj · ${plano.vojoj.length} vojoj · ${plano.spronoj.length} spronoj`;
  el.textContent = problemoj.length
    ? bazo + ` — ✗ ${problemoj.length} problemo(j): ${problemoj.slice(0, 3).map(p => p.kodo).join(", ")}`
    : bazo + " — ✓ strukture validas";
}

// gxisdatigiUrboElektilon ។ សាងសង់កម្មវិធីជ្រើសទីក្រុងឡើងវិញពីទីក្រុង។ ជម្រើស
// នីមួយៗបង្ហាញឈ្មោះ និងតម្រុយ ទីក្រុងដែលបានជ្រើសនៅតែជ្រើស។
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
}

// elektiUrbon ។ ផ្ទុកទីក្រុង ( ទំហំ ប្លុក តម្រុយ ឈ្មោះ ) ទៅ
// កម្មវិធីកែ ហើយបង្ហាញក្រឡារបស់វា។ សំណពីលើ ( ការផ្លាស់ប្តូរក្រឡាដោយដៃ )
// នៅដដែល ។ ការកែក្រឡាជាកម្មសិទ្ធិរបស់ទីក្រុងដែលកំពុងកែ។
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
  // សំណពីលើក្រឡារបស់ទីក្រុង នេះ ។ ការកែរបស់ផ្ទាំងក្រឡាមិន
  // រួមគ្នារវាងទីក្រុងទេ។
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
  gxisdatigiKradon();
}

// skribiElektitanUrbon ។ សរសេរកម្មវិធីកែបច្ចុប្បន្នត្រឡប់ទៅទីក្រុង
// ដែលបានជ្រើស ហើយសម្គាល់ទិន្នន័យថាបានផ្លាស់ប្តូរ ( ការរក្សាទុកសរសេរទីក្រុងទៅ
// SKULPTA_URBOJ )។
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

// gxisdatigiAldonaBlokojn ។ ផ្ទុកប្លុកបន្ថែមរបស់ទីក្រុងដែលកំពុងកែ
// ទៅក្នុងកម្មវិធីកែ ( ប្លុកដែលបានជ្រើសនៅតែជ្រើស )។
export function gxisdatigiAldonaBlokojn() {
  if ( !aldonaBlokoElektilo ) return;
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  aldonaBlokoElektilo.innerHTML = "";
  blokoj.forEach(( b, i: number ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = ( b.stacia ? "Stacio" : ALDONA_TIPO_NOMOJ[b.tipo] || b.tipo ) + ( b.konektita ? " 🛣️" : "" ) + " ( " + b.x + ", " + b.z + " )";
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

// skribiAldonanBlokon ។ អានកម្មវិធីកែទៅប្លុកបន្ថែមដែលបានជ្រើស ហើយ
// សម្គាល់ទិន្នន័យថាបានផ្លាស់ប្តូរ ( ការរក្សាទុកសរសេរទីក្រុងទៅ SKULPTA_URBOJ )។
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
const ALDONA_TIPO_NOMOJ = { sanktejo: "Sanktejo", turo: "Turo", domo: "Domo", mangxejo: "Manĝejo", kasafeo: "Kasafeo", stacio: "Stacio" };

// aldonaBlokoCxePunkto ។ លេខលំដាប់នៃប្លុកបន្ថែមដែលសញ្ញារបស់វាគ្របដណ្តប់
// ចំណុចពិភពលោក ( ផ្អែកលើអេក្រង់ ដូចសញ្ញាទីក្រុង ) ឬ -1។
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
    if ( Math.hypot(bx - sx, bz - sy) < 14 ) return i;
  }
  return -1;
}

// komenciAldonaTrenon ។ ចាប់ប្លុកបន្ថែមដើម្បីផ្លាស់ទីវាលើផែនទី ( ការផ្លាស់ទី
// អាចត្រឡប់វិញ ។ ប្រវត្តិថតរូបនៅពេលចាប់ )។
export function komenciAldonaTrenon(i: number) {
  if ( aldonaTrenata >= 0 ) return;
  momenti();
  aldonaTrenata = i;
  markiSxangxitan();
  statuso("Nesavitaj ŝanĝoj");
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

// gxisdatigiVojajnRegilojn ។ ផ្ទុកផ្លូវ ចំណុច កំពង់ និងកប៉ាល់
// ទៅក្នុងកម្មវិធីកែនៃផ្ទាំងរងផ្លូវ ( ដែលបានជ្រើសនៅតែជ្រើស )។
export function gxisdatigiVojajnRegilojn() {
  if ( !vojoElektilo ) return;
  // ផែនការក្រឡាអាស្រ័យលើផ្លូវកម្រិតពិភពលោក ( ដំបងតភ្ជាប់ ) ។
  // រាល់ការផ្លាស់ប្តូរនៅទីនេះធ្វើឱ្យឃ្លាំងសម្ងាត់ចាស់។ ផ្លូវ 3D សាងសង់ឡើងវិញនៅរាល់
  // ការផ្លាស់ប្តូរ ប៉ុន្តែ មិន ពេលអូស ( ផែនទី 2D បង្ហាញការអូសរស់ ទិដ្ឋភាព 3D
  // ធ្វើឱ្យស្រស់នៅចុងបញ្ចប់ )។
  kradaPlanoCache = null;
  if ( bildilo3d && !vojaTrenata ) rekonstruiVojojn3D();
  vojoElektilo.innerHTML = "";
  vojoj.forEach(( v, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = ( v.nomo || "Vojo" ) + " ( " + v.punktoj.length + " pkt )";
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
      o.textContent = "Punkto " + ( j + 1 ) + " ( " + p[0] + ", " + p[1] + " )";
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
    o.textContent = "Doko " + ( i + 1 ) + " ( " + d.x + ", " + d.z + " )";
    dokoElektilo.appendChild(o);
  });
  elektitaDoko = Math.max(0, Math.min(dokoj.length - 1, elektitaDoko));
  dokoElektilo.value = String(elektitaDoko);
  dokoForigiBtn.disabled = dokoj.length <= 1;
  const d = dokoj[elektitaDoko];
  if ( d ) {
    dokoXEl.value = String(d.x);
    dokoZEl.value = String(d.z);
    dokoProfundoEl.value = String(d.profundo || 16);
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
    statuso("Tajlita vojo estis malakceptita pro interkovrido 🛑");
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
  d.x = parseFloat(dokoXEl.value) || 0;
  d.z = parseFloat(dokoZEl.value) || 0;
  d.profundo = Math.max(4, parseFloat(dokoProfundoEl.value) || 16);
  d.rotacio = parseFloat(dokoRotacioEl.value) || 0;
  konektiDokonAlVojo(d, elektitaDoko);
  if ( dokoKunfandiĝas(d, elektitaDoko) && !kunfandisAntaŭ ) {
    dokoj[elektitaDoko] = kopio;
    statuso("Tajlita doko estis malakceptita pro interkovrido 🛑");
  }
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

// gxisdatigiVojaStatistikojn ។ ជួរស្ថិតិផ្លូវ ( ចំនួន និងប្រវែង )។
function gxisdatigiVojaStatistikojn() {
  const el = elemento<HTMLElement>("vojaStatistikoj");
  if ( !el ) return;
  const longo = vojoj.reduce(( s, v ) => s + v.punktoj.reduce(( a, p, i: number ) => {
    if ( i === 0 ) return a;
    const q = v.punktoj[i - 1];
    return a + Math.hypot(p[0] - q[0], p[1] - q[1]);
  }, 0), 0);
  const kunfandajxoj = vojajKunfandajxoj();
  el.textContent = vojoj.length + " vojoj ( " + longo.toFixed(1) + " un ) · "
    + dokoj.length + " dokoj · " + vojaKunigoj() + " kunigoj 🔗 · "
    + ( kunfandajxoj.totalo ? kunfandajxoj.totalo + " interkovridoj ( "
      + kunfandajxoj.vojoVojo + " vojo-vojo, " + kunfandajxoj.vojoDoko
      + " vojo-doko, " + kunfandajxoj.dokoDoko + " doko-doko ) ⚠️" : "0 interkovridoj ✓" );
}

// vojaKunigoj ។ ចំនួនចុងផ្លូវដែលអង្គុយលើ ផ្លូវផ្សេង ( កំពូល ឬចម្រៀក )។
// ស្ថិតិបង្ហាញថាតើបណ្តាញពិតជាតភ្ជាប់ ។ បើគ្មានការបិទភ្ជាប់
// ផ្លូវមើលទៅភ្ជាប់លើផែនទី ប៉ុន្តែទុកចន្លោះប្រហោងក្នុងហ្គេម។
//     @returns kunigoj ( number ) - ចំនួនចុងដែលបានតភ្ជាប់។
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

function plejProximaVojo(px: number, pz: number, kromVojo = -1) {
  return retoPlejProximaVojo(px, pz, vojoj, kromVojo);
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

function vojajKunfandajxoj() {
  return retoVojajKunfandajxoj(vojoj, dokoj);
}

// urboCxePunkto ។ លេខលំដាប់នៃទីក្រុងដែលសញ្ញារបស់វាគ្របដណ្តប់ចំណុចពិភពលោក
// ( ប្រៀបធៀបលើអេក្រង់ )។ -1 បើគ្មាន។ ការបំប្លែងពិភពលោក → អេក្រង់ ដូចគ្នា
// ដូចក្នុង desegniVidon។
export function urboCxePunkto(mx: number, mz: number) {
  const duonw = mapo.width / 2, duonh = mapo.height / 2;
  const sx = duonw - ( mx - vidCX() ) * vidSkalo();
  const sy = duonh - ( mz - vidCZ() ) * vidSkalo();
  for ( let i = 0; i < urboj.length; i++ ) {
    const u = urboj[i];
    const ux = duonw - ( u.ofsX - vidCX() ) * vidSkalo();
    const uz = duonh - ( u.ofsZ - vidCZ() ) * vidSkalo();
    if ( Math.hypot(ux - sx, uz - sy) < 12 ) return i;
  }
  return -1;
}

// vojaCeloCxePunkto ។ គោលដៅនៃផ្ទាំងរងផ្លូវក្រោមចំណុចពិភពលោក
// ឬ null។ លំដាប់ជ្រើស ។ ចំណុចនៃផ្លូវមុនគេ ( ជិតបំផុត
// ក្នុងកាំអេក្រង់ ) បន្ទាប់មកកំពង់ ហើយបន្ទាត់ផ្លូវ
// ( ចម្រៀកជិតបំផុត ) ចុងក្រោយ។
function vojaCeloCxePunkto(mx: number, mz: number): VojaCelo | null {
  const r = 8 / vidSkalo();
  let plej: VojaCelo | null = null, plejD = r;
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    const v = vojoj[vi];
    for ( let pi = 0; pi < v.punktoj.length; pi++ ) {
      const p = v.punktoj[pi];
      const d = Math.hypot(p[0] - mx, p[1] - mz);
      if ( d < plejD ) { plejD = d; plej = { speco: "punkto", vojo: vi, punkto: pi }; }
    }
  }
  if ( plej ) return plej;
  // កំពង់ ។ ចំណុចត្រូវបំប្លែងទៅក្នុងស៊ុម មូលដ្ឋាន របស់កំពង់ ( ការបង្វិល
  // បញ្ច្រាស ) ដូច្នេះវេទិកាដែលបង្វិលក៏ត្រូវចាប់តាមផ្ទៃពិតរបស់វា។
  for ( let di = 0; di < dokoj.length; di++ ) {
    const d = dokoj[di];
    const prof = d.profundo || 16;
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

// sxangxiVojanCelon ។ ការកែដោយចុចលើផែនទី 2D ក្នុងផ្ទាំងរងផ្លូវ
// នៃផ្ទាំងក្រឡា។
// ឧបករណ៍រងសម្រេច។ ជ្រើស/ផ្លាស់ទី ✋ ជ្រើសចំណុច កំពង់ ជិតបំផុត
// ឬកប៉ាល់ ( ហើយចាប់វាដើម្បីអូស ) ការចុចលើបន្ទាត់ផ្លូវ
// ជ្រើសផ្លូវ។ បន្ថែមចំណុច ➕ បញ្ចូលចំណុចទៅផ្លូវដែលបានជ្រើស។
// លុបចំណុច 🗑️ លុបចំណុចជិតបំផុត។
export function sxangxiVojanCelon(mx: number, mz: number) {
  const proks = vojaCeloCxePunkto(mx, mz);
  if ( vojaIlo === "forigi" ) {
    if ( proks && proks.speco === "punkto" ) forigiVojanPunkton(proks.vojo, proks.punkto);
    return;
  }
  if ( proks && proks.speco === "punkto" ) {
    elektitaVojo = proks.vojo;
    elektitaPunkto = proks.punkto;
    if ( vojaIlo === "movu" ) komenciVojaTrenon({ speco: "punkto", vojo: proks.vojo, punkto: proks.punkto });
  } else if ( proks && proks.speco === "doko" ) {
    elektitaDoko = proks.doko;
    if ( vojaIlo === "movu" ) komenciVojaTrenon({ speco: "doko", doko: proks.doko });
  } else if ( proks && proks.speco === "vojo" ) {
    elektitaVojo = proks.vojo;
    elektitaPunkto = -1;
  } else if ( vojaIlo === "aldoni" ) {
    aldoniVojanPunkton(mx, mz);
    return;
  } else {
    elektitaPunkto = -1;
  }
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

// komenciVojaTrenon ។ ចាប់ចំណុច កំពង់ ឬកប៉ាល់សម្រាប់ ជ្រើស/ផ្លាស់ទី ✋
// ( ការផ្លាស់ទីអាចត្រឡប់វិញ ។ ប្រវត្តិថតរូបនៅពេលចាប់ )។
function komenciVojaTrenon(celo: VojaCelo): void {
  if ( vojaTrenata ) return;
  momenti();
  vojaTrenata = celo;
  markiSxangxitan();
  statuso("Nesavitaj ŝanĝoj");
  markiDesegnon();
}

// sxangiVojaPozicion ។ ធ្វើឱ្យទីតាំងរបស់គោលដៅដែលកំពុងអូស ( បិទភ្ជាប់
// នឹង 0.5 ) ថ្មី ពេល ជ្រើស/ផ្លាស់ទី ✋។
// kradaVojaAlglu ។ បន្ទាត់ផ្លូវក្រឡាជិតបំផុត ( បណ្តាញផ្លូវរបស់
// ទីក្រុងបច្ចុប្បន្ន ) នៅចំណុចពិភពលោក ឬ null។ ផ្លូវ NS។ បន្ទាត់ឈរ នៅ x
// ថេរ ផ្លូវ EW។ ផ្ដេក នៅ z ថេរ។ ការអូសចំណុចផ្លូវបិទភ្ជាប់ទៅ
// បន្ទាត់ក្នុងរង្វង់គែម ដើម្បីឱ្យផ្លូវ ភ្ជាប់ ទៅក្រឡា។
function kradaVojaAlglu(mx: number, mz: number) {
  const plano = kradoPlano();
  const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
  const rando = 0o5/0o2;
  let plej = null, plejD = rando;
  for ( const r of plano.vojoj ) {
    if ( r.orient === "NS" ) {
      const wx = ofsX + r.poz;
      const d = Math.abs(mx - wx);
      // កូអរដោនេសេរីនៅលើក្រឡា 0.5 ដូចគ្នានឹងចំណុចផ្សេងទៀត។
      // គ្មាន ដែនកំណត់លាតសន្ធឹង។ ចំណុចអាចរអិលលើបន្ទាត់ហួស
      // ចន្លោះទីក្រុងផងដែរ ។ ផ្លូវបន្ទាប់មក បន្ត បន្ទាត់ក្រឡា ( មហាវិថី
      // ភាគខាងត្បូងនៃទីក្រុងមេគឺជាឧទាហរណ៍ ) ហើយ ភ្ជាប់ ទៅក្រឡា។
      if ( d < plejD ) { plejD = d; plej = [ wx, Math.round(mz * 2) / 2 ]; }
    } else {
      const wz = ofsZ + r.poz;
      const d = Math.abs(mz - wz);
      if ( d < plejD ) { plejD = d; plej = [ Math.round(mx * 2) / 2, wz ]; }
    }
  }
  return plej;
}
// kradaSegmentoAlglu ។ ចម្រៀកទាំងមូល A→B បិទភ្ជាប់ទៅបណ្តាញផ្លូវ
// ក្រឡា។ បើចម្រៀកស្ទើរតែស្របនឹងបន្ទាត់ផ្លូវក្រឡា ហើយរាល់
// ចំណុចរបស់វានៅក្នុងគែមបិទភ្ជាប់ ( 2.5 ) នៃបន្ទាត់នោះ វារអិល
// លើបន្ទាត់ ។ ចុងទាំងពីរត្រង់ជួរគ្នា ដូច្នេះចម្រៀក ភ្ជាប់ ទៅ
// ក្រឡា ( មិនមែនតែចំណុចចុងមួយ )។ ត្រឡប់ { linioX } ឬ { linioZ } (
// ទីតាំងពិភពលោកនៃបន្ទាត់ ) ឬ null។
function kradaSegmentoAlglu(ax: number, az: number, bx: number, bz: number) {
  const plano = kradoPlano();
  const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
  const rando = 0o5/0o2;
  const dx = bx - ax, dz = bz - az;
  if ( Math.hypot(dx, dz) < 1e-6 ) return null;
  // NS ។ ចម្រៀកស្ទើរតែឈរ ( មុំទៅបញ្ឈរ ≤ ~14° )
  // ជិតបន្ទាត់ NS។ គ្មាន ដែនកំណត់លាតសន្ធឹង។ ចម្រៀកអាចរអិលលើ
  // បន្ទាត់ហួសចន្លោះទីក្រុងផងដែរ ហើយបន្ទាប់មក បន្ត បន្ទាត់
  // ក្រឡា ( ដូចការបិទភ្ជាប់ចំណុចចុង )។
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
  // EW ។ ចម្រៀកស្ទើរតែផ្ដេកជិតបន្ទាត់ EW។
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
// ⟨ ការតភ្ជាប់ស្វ័យប្រវត្តិនៃផ្លូវ 📃 ⟩ ។ ផ្លូវ ភ្ជាប់ គ្នាទៅវិញទៅមក ដើម្បី
// កុំឱ្យអ្នកសាងសង់វាយកូអរដោនេដូចគ្នាពីរដង និងដើម្បីកុំឱ្យផ្លូវ
// ត្រួតគ្នាដោយឆ្នូតជិតខាងពាក់កណ្តាល។ ការបិទភ្ជាប់ស្វែងរកលើ ផ្លូវ
// កម្រិតពិភពលោកផ្សេងទៀត ហើយត្រឡប់ចំណុចពិភពលោក ដែលចំណុចកំពុងអូស
// គួរអង្គុយ។
//   · VERTICO ។ បើផ្លូវផ្សេងមានកំពូលក្នុងគែម ចំណុចអង្គុយ
//     ចំ លើវា ។ ផ្លូវពីរបន្ទាប់មក ចែក ចំណុចដូចគ្នា ( ការតភ្ជាប់ពិតពី
//     ចុងទៅចុង ឬពីចុងទៅមុំ ដូចមហាវិថីនៅកំពង់ )។
//   · SEGMENTO ។ បើមិនដូច្នេះ បើចំណុចនៅជិត បន្ទាត់កណ្តាល នៃផ្លូវផ្សេង វា
//     អង្គុយលើការបញ្ចាំង ។ ផ្លូវបន្ទាប់មកភ្ជាប់នៅ កណ្តាល នៃផ្លូវផ្សេង (
//     ការតភ្ជាប់រាង T នៃស្ពានទៅកំពង់ខាងជើង )។ ការតភ្ជាប់អង្គុយចំលើ
//     បន្ទាត់ មិនមែនលើក្រឡា 0.5 ។ ដូច្នេះផ្លូវពីរមិនអាចធ្លាក់ពាក់កណ្តាលបាន។
// ផ្លូវ ដូចគ្នា មិនដែលបិទភ្ជាប់នឹងខ្លួនឯង ។ ចម្រៀករបស់វាផ្ទាល់គឺជាផ្លូវ
// ខ្លួនឯង ហើយចំណុចលើពួកវាមិនមែនជាការតភ្ជាប់ទេ។
//     @param mx, mz ( number ) - ចំណុចពិភពលោករបស់កណ្ដុរ។
//     @param kromVojo ( number ) - លេខលំដាប់ផ្លូវដែលកំពុងអូស។
//     @returns punkto ( [ number, number ] | null ) - ចំណុចតភ្ជាប់។
const VOJA_ALGLUA_RANDO = 0o5/0o2;
function vojaAlgluo(mx: number, mz: number, kromVojo: number, najbaro: VojaPunkto | null = null) {
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

// forigiDuoblajnPunktojn ។ លុបចំណុចតជាប់គ្នាដែលអង្គុយលើទីតាំង
// ដូចគ្នា។ ការតភ្ជាប់ចុងពីរ ( ឬការអូសចំណុចលើអ្នកជិតខាងរបស់វា )
// ទុកចំណុចស្ទួន ដែលបង្កើតចម្រៀក សូន្យ ។ ម៉ូឌុលផ្លូវគូរ
// វាជាថ្នេរមើលឃើញ ហើយពហុបន្ទាត់រាយការណ៍ប្រវែងក្លែងក្លាយ។
//     @param v ( object ) - ផ្លូវ ( ចំណុចផ្លាស់ប្តូរនៅនឹងកន្លែង )។
//     @returns forigitaj ( number ) - ចំនួនចំណុចដែលបានលុប។
function forigiDuoblajnPunktojn(v: SkulptaVojo): number {
  let forigitaj = 0;
  for ( let i = v.punktoj.length - 1; i > 0 && v.punktoj.length > 2; i-- ) {
    const a = v.punktoj[i], b = v.punktoj[i - 1];
    if ( Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-6 ) { v.punktoj.splice(i, 1); forigitaj++; }
  }
  return forigitaj;
}

// konektiVojajnFinojn ។ តភ្ជាប់ចុង ទាំងពីរ នៃរាល់ផ្លូវជាមួយផ្លូវផ្សេងទៀត
// ( កំពូល ឬចម្រៀក ) បើពួកវានៅក្នុងគែមបិទភ្ជាប់ ហើយលុប
// ចំណុចស្ទួន។ មានតែ ចុង ទេដែលផ្លាស់ទី ។ កណ្តាល និងរូបរាងរបស់រាល់ផ្លូវ
// នៅដូចអ្វីដែលអ្នកសាងសង់បានគូរ។
//     @returns kunigoj ( number ) - ចំនួនចុងដែលអង្គុយលើផ្លូវផ្សេង។
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
    // ការបិទភ្ជាប់ តាមលំដាប់កម្លាំង ។ បណ្តាញក្រឡាមុនគេ ( ផ្លូវ
    // ភ្ជាប់ ទៅទីក្រុង ) បន្ទាប់មក ផ្លូវ កម្រិតពិភពលោកផ្សេងទៀត ( ផ្លូវ
    // ភ្ជាប់ គ្នាទៅវិញទៅមក ) ចុងក្រោយក្រឡា 0.5 សេរី។
    const kradaAlgluo = kradaVojaAlglu(mx, mz);
    let gx, gz;
    if ( kradaAlgluo ) {
      gx = kradaAlgluo[0];
      gz = kradaAlgluo[1];
    } else {
      const najbaro = pi === 0 ? v.punktoj[1] : v.punktoj[v.punktoj.length - 2];
      const voja = vojaAlgluo(mx, mz, c.vojo, najbaro);
      if ( voja ) { gx = voja[0]; gz = voja[1]; }
      else { gx = Math.round(mx * 2) / 2; gz = Math.round(mz * 2) / 2; }
    }
    // ការបិទភ្ជាប់ ចម្រៀក ។ បើចម្រៀកជិតខាង ( najbaro → ចំណុចកំពុងអូស )
    // ស្ទើរតែស្របនឹងបន្ទាត់ផ្លូវក្រឡា ហើយជិត អ្នកជិតខាងក៏
    // រអិលលើបន្ទាត់។ ចម្រៀកទាំងមូលបន្ទាប់មកត្រង់ជួរគ្នា ហើយ ភ្ជាប់
    // ទៅក្រឡា ( មិនមែនតែចំណុចចុង )។ ពេលចម្រៀកពីររអិល ចំណុច
    // មកដល់ចំណុចប្រសព្វនៃបន្ទាត់។
    let linioX = null, linioZ = null;
    for ( const ni of [ pi - 1, pi + 1 ] ) {
      const n = v.punktoj[ni];
      if ( !n ) continue;
      const s = kradaSegmentoAlglu(n[0], n[1], gx, gz);
      if ( !s ) continue;
      if ( s.linioX !== null ) { n[0] = s.linioX; linioX = s.linioX; }
      else { n[1] = s.linioZ; linioZ = s.linioZ; }
    }
    if ( linioX !== null ) gx = linioX;
    if ( linioZ !== null ) gz = linioZ;
    v.punktoj[pi] = [ gx, gz ];
    if ( vojoKunfandiĝas(v, c.vojo) ) {
      for ( const [ ni, p ] of malnovaj ) v.punktoj[ni] = p;
      statuso("Tiu vojo interkovrus sin aŭ dokon 🛑");
      return;
    }
    elektitaPunkto = pi;
  } else if ( c.speco === "doko" ) {
    const d = dokoj[c.doko];
    if ( !d ) return;
    const kandidato = { ...d, x: Math.round(mx * 2) / 2, z: Math.round(mz * 2) / 2 };
    const projekcio = plejProximaVojo(kandidato.x, kandidato.z);
    const rando = ( kandidato.profundo || 16 ) / 2 + VOJA_ALGLUA_RANDO;
    if ( projekcio && projekcio.d <= rando ) {
      kandidato.rotacio = Math.atan2(-projekcio.dz, projekcio.dx);
      const duonZ = ( kandidato.profundo || 16 ) / 2;
      kandidato.x = projekcio.x - Math.sin(kandidato.rotacio) * duonZ;
      kandidato.z = projekcio.z - Math.cos(kandidato.rotacio) * duonZ;
    }
    if ( dokoKunfandiĝas(kandidato, c.doko) ) {
      statuso("Tiu doko interkovrus vojon aŭ dokon 🛑");
      return;
    }
    d.x = kandidato.x;
    d.z = kandidato.z;
    if ( kandidato.rotacio !== undefined ) d.rotacio = kandidato.rotacio;
    elektitaDoko = c.doko;
  }
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

export function finiVojaTrenon() {
  if ( !vojaTrenata ) return;
  // ការអូសបានបញ្ចប់ ។ ចំណុចដែលបានតភ្ជាប់នៅលើផ្លូវផ្សេង ហើយ
  // ចំណុចស្ទួនដែលអាចមាន ( អូសលើអ្នកជិតខាងខ្លួនឯង ) ត្រូវលុប។
  if ( vojaTrenata.speco === "punkto" ) {
    const v = vojoj[vojaTrenata.vojo];
    if ( v ) forigiDuoblajnPunktojn(v);
  }
  vojaTrenata = null;
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

// aldoniVojanPunkton ។ បញ្ចូលចំណុចទៅផ្លូវដែលបានជ្រើសនៅពេលចុច
// ( លើចម្រៀកជិតបំផុត ។ ចំណុចបែងចែកចម្រៀក បើ
// ផ្លូវមានចំណុចតែមួយ ចំណុចថ្មីដាក់នៅពេលចុចខ្លួនឯង )។
function aldoniVojanPunkton(mx: number, mz: number) {
  const v = vojoj[elektitaVojo];
  if ( !v ) return;
  const kopio: SkulptaVojo = { ...v, punktoj: v.punktoj.map(p => [ ...p ] as VojaPunkto) };
  const kunfandisAntaŭ = vojoKunfandiĝas(v, elektitaVojo);
  momenti();
  // ការចុចបិទភ្ជាប់ទៅបណ្តាញផ្លូវក្រឡា បើវាជិតបន្ទាត់
  // ផ្លូវក្រឡា ។ ចំណុចថ្មីបន្ទាប់មក ភ្ជាប់ ផ្លូវទៅក្រឡា
  // ( ដូចការអូសចំណុចក្នុង ជ្រើស/ផ្លាស់ទី ✋ )។
  const algluo = kradaVojaAlglu(mx, mz);
  const gx = algluo ? algluo[0] : mx, gz = algluo ? algluo[1] : mz;
  if ( v.punktoj.length < 2 ) {
    v.punktoj.push([ Math.round(gx * 2) / 2, Math.round(gz * 2) / 2 ]);
    elektitaPunkto = v.punktoj.length - 1;
  } else {
    let plej = 0, plejD = Infinity, plejT = 0;
    for ( let pi = 0; pi < v.punktoj.length - 1; pi++ ) {
      const a = v.punktoj[pi], b = v.punktoj[pi + 1];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const t = Math.max(0, Math.min(1, ( ( gx - a[0] ) * ( b[0] - a[0] ) + ( gz - a[1] ) * ( b[1] - a[1] ) ) / ( l * l )));
      const d = Math.hypot(a[0] + t * ( b[0] - a[0] ) - gx, a[1] + t * ( b[1] - a[1] ) - gz);
      if ( d < plejD ) { plejD = d; plej = pi; plejT = t; }
    }
    const a = v.punktoj[plej], b = v.punktoj[plej + 1];
    // ការបិទភ្ជាប់ ចម្រៀក ។ បើចម្រៀកដែលបែងចែក ( a→b ) ស្ទើរតែ
    // ស្របនឹងបន្ទាត់ផ្លូវក្រឡា ហើយជិត ចម្រៀកទាំងមូល រអិលលើ
    // បន្ទាត់។ a, b និងចំណុចថ្មីត្រង់ជួរគ្នា ដូច្នេះចម្រៀក ( និង
    // ចម្រៀកពាក់កណ្តាលថ្មីពីរ ) ភ្ជាប់ ទៅក្រឡា។
    const seg = kradaSegmentoAlglu(a[0], a[1], b[0], b[1]);
    let nx, nz;
    if ( seg ) {
      if ( seg.linioX !== null ) {
        a[0] = seg.linioX; b[0] = seg.linioX;
        nx = seg.linioX;
        nz = Math.round(( a[1] + plejT * ( b[1] - a[1] ) ) * 2) / 2;
      } else {
        a[1] = seg.linioZ; b[1] = seg.linioZ;
        nz = seg.linioZ;
        nx = Math.round(( a[0] + plejT * ( b[0] - a[0] ) ) * 2) / 2;
      }
    } else {
      // ចំណុចដែលបានបិទភ្ជាប់នៅ លើ បន្ទាត់ក្រឡា បើមិនដូច្នេះការបញ្ចាំងលើ
      // ចម្រៀក ( បិទភ្ជាប់ 0.5 )។
      nx = algluo ? gx : Math.round(( a[0] + plejT * ( b[0] - a[0] ) ) * 2) / 2;
      nz = algluo ? gz : Math.round(( a[1] + plejT * ( b[1] - a[1] ) ) * 2) / 2;
    }
    v.punktoj.splice(plej + 1, 0, [ nx, nz ]);
    elektitaPunkto = plej + 1;
  }
  if ( vojoKunfandiĝas(v, elektitaVojo) && !kunfandisAntaŭ ) {
    vojoj[elektitaVojo] = kopio;
    elektitaPunkto = Math.min(elektitaPunkto, kopio.punktoj.length - 1);
    statuso("Nova punkto interkovrus vojon aŭ dokon 🛑");
    gxisdatigiVojajnRegilojn();
    markiDesegnon();
    return;
  }
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

// forigiVojanPunkton ។ លុបចំណុច ( ផ្លូវនៅសល់យ៉ាងតិច 2 )។
function forigiVojanPunkton(vi: number, pi: number) {
  const v = vojoj[vi];
  if ( !v || v.punktoj.length <= 2 ) return;
  momenti();
  v.punktoj.splice(pi, 1);
  elektitaVojo = vi;
  elektitaPunkto = Math.max(0, pi - 1);
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

// sxangxiKradanCelon ។ ការកែដោយចុចលើផែនទី 2D។ ប្រភេទបន្ទះពណ៌ដែលបានជ្រើស
// ដាក់លើក្រឡា ( ឬ បន្ថែម ក្រឡាថ្មីនៅទីតាំងចុច ) ក្រឡា
// Aŭtomata ⚙️ លុបសំណពីលើ ។ ក្រឡាត្រឡប់ទៅប្រភេទដែលបង្កើត ឬ
// លុបចេញ បើវាត្រូវបានបន្ថែម។
export function sxangxiKradanCelon(mx: number, mz: number) {
  const plano = kradoPlano();
  const PASXO = plano.PASXO;
  const c = Math.round(( mx - kradoOfsX ) / PASXO);
  const r = Math.round(( mz - kradoOfsZ ) / PASXO);
  // ក្រឡាប្លុកបួន ។ ការចុចផ្លាស់ប្តូរសំណង់ បុគ្គល (
  // ប្លុករង ) ក្រោមកណ្ដុរ មិនមែនប្លុកទាំងមូល។ ទីតាំងរងគឺ
  // ជ្រុងជិតបំផុត ( NE, NW, SW, SE នៅ ±BLOKO ។ 8 )។
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
      if ( !kradoSuperoj.delete(ŝ) ) return;   // គ្មានសំណពីលើរង ។ គ្មានអ្វីផ្លាស់ប្តូរ
    } else {
      // ដែនកំណត់ ។ ក្រឡាអាចលាតសន្ធឹងបានត្រឹមគែមពិភពលោកប៉ុណ្ណោះ។
      if ( Math.abs(c * PASXO + kradoOfsX) > MONDO_HALFO || Math.abs(r * PASXO + kradoOfsZ) > MONDO_HALFO ) return;
      kradoSuperoj.set(ŝ, kradoTipoElektita);
    }
    sinkronigiSuperojn();
    gxisdatigiKradon();
    return;
  }
  const ŝ = c + "," + r;
  if ( kradoTipoElektita === "automata" ) {
    if ( !kradoSuperoj.delete(ŝ) ) return;   // គ្មានសំណពីលើ ។ គ្មានអ្វីផ្លាស់ប្តូរ
  } else {
    // ដែនកំណត់ ។ ក្រឡាអាចលាតសន្ធឹងបានត្រឹមគែមពិភពលោកប៉ុណ្ណោះ។
    if ( Math.abs(c * PASXO + kradoOfsX) > MONDO_HALFO || Math.abs(r * PASXO + kradoOfsZ) > MONDO_HALFO ) return;
    kradoSuperoj.set(ŝ, kradoTipoElektita);
  }
  sinkronigiSuperojn();
  markiSxangxitan();
  statuso("Nesavitaj ŝanĝoj");
  gxisdatigiKradon();
}

// desegniKradanTavolon ។ ទីក្រុងក្រឡាលើបរិបទណាមួយ។ ផ្លូវ ( ឆ្នូត
// ធំទូលាយ ) សាខា ( បន្ទាត់ស្តើង ) និងអគារ ( ការ៉េបង្វិល
// តាមការបង្វិល ជាមួយចំណុចទ្វារពណ៌ស ។ ទ្វារ និងអគារ
// ប្លុកបួនដែលបង្វិលមើលឃើញ )។ X/Z បំប្លែងកូអរដោនេផែនការ
// ( ធៀបនឹងចំណុចកណ្តាលក្រឡា ) ទៅភីកសែល skalo គឺភីកសែលក្នុងមួយ
// ឯកតាពិភពលោក។ ស្រទាប់គូរលើផែនទី 2D ( ជាមួយទិដ្ឋភាព និង
// តម្រុយ )។
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
  // ផ្លូវ ។ ចម្រៀកដូចគ្នានឹងហ្គេម ( ទទឹងពេញ 3.5 )។
  k.lineWidth = 0o7/0o2 * skalo;
  k.strokeStyle = "rgba(218,218,228,0.9)";
  k.beginPath();
  for ( const v of plano.vojoj ) {
    if ( v.orient === "EW" ) { k.moveTo(X(v.de), Z(v.poz)); k.lineTo(X(v.al), Z(v.poz)); }
    else { k.moveTo(X(v.poz), Z(v.de)); k.lineTo(X(v.poz), Z(v.al)); }
  }
  k.stroke();
  // សាខា ។ ផ្លូវតូចទ្វារ ( ស្តើង )។
  k.lineWidth = Math.max(1, 1.4 * skalo);
  k.strokeStyle = "rgba(255,255,255,0.55)";
  k.beginPath();
  for ( const sp of plano.spronoj ) {
    k.moveTo(X(sp.de[0]), Z(sp.de[1]));
    k.lineTo(X(sp.al[0]), Z(sp.al[1]));
  }
  k.stroke();
  // អគារ ។ ការ៉េ ( 8×8 ) បង្វិលតាមការបង្វិល ទ្វារជា
  // ចំណុចពណ៌សនៅចម្ងាយទ្វារ។
  const radu = 5.657 * skalo;   // អង្កត់ទ្រូងពាក់កណ្តាលនៃ 8×8
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
    k.arc(pdx, pdz, Math.max(0o3/0o2, 1.2 * skalo), 0, Math.PI * 2);
    k.fill();
  }
}

// បន្ទះពណ៌ ។ ជ្រើសប្រភេទសម្រាប់ការកែដោយចុច។ Aŭtomata ⚙️ (
// លំនាំដើម ) ត្រឡប់ក្រឡាទៅប្រភេទដែលបង្កើត ឬលុបអ្វីដែលបន្ថែម។
elementoj<HTMLButtonElement>("#kradaro button").forEach(b => {
  b.addEventListener("click", () => {
    kradoTipoElektita = ( b.dataset.kradoTipo as CellType | undefined ) ?? "automata";
    elementoj<HTMLButtonElement>("#kradaro button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
// កម្មវិធីជ្រើសទីក្រុង ។ ជ្រើសទីក្រុងផ្ទុកការតំឡើងរបស់វាទៅកម្មវិធីកែ។
urboElektilo.addEventListener("change", () => elektiUrbon(parseInt(urboElektilo.value, 10) || 0));
urboNomoEl.addEventListener("input", () => {
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  u.nomo = urboNomoEl.value;
  gxisdatigiUrboElektilon();
  markiSxangxitan();
  markiDesegnon();
});
urboAldoniBtn.addEventListener("click", () => {
  urboj.push({ nomo: "Nova urbo", arangxaGrando: 1, blokaGrando: "unu", ofsX: 0o200, ofsZ: -0o200, aldonajBlokoj: [] });
  elektiUrbon(urboj.length - 1);
  markiSxangxitan();
  markiDesegnon();
});
urboForigiBtn.addEventListener("click", () => {
  if ( urboj.length <= 1 ) return;
  urboj.splice(elektitaUrbo, 1);
  elektiUrbon(Math.max(0, elektitaUrbo - 1));
  markiSxangxitan();
  markiDesegnon();
});
// ការកំណត់ ។ រាល់ការផ្លាស់ប្តូរសាងសង់ផែនការឡើងវិញភ្លាម ហើយសរសេរត្រឡប់ទៅ
// ទីក្រុងដែលបានជ្រើស ( ការរក្សាទុកសរសេរទីក្រុងទៅ SKULPTA_URBOJ )។
kradoGrandecoEl.addEventListener("change", () => { kradoGrandeco = parseInt(kradoGrandecoEl.value, 10); skribiElektitanUrbon(); gxisdatigiKradon(); });
kradoBlokoEl.addEventListener("change", () => { kradoBloko = kradoBlokoEl.value as "unu" | "kvar"; skribiElektitanUrbon(); gxisdatigiKradon(); });
kradoOfsXEl.addEventListener("change", () => { kradoOfsX = parseFloat(kradoOfsXEl.value) || 0; skribiElektitanUrbon(); gxisdatigiUrboElektilon(); gxisdatigiKradon(); });
kradoOfsZEl.addEventListener("change", () => { kradoOfsZ = parseFloat(kradoOfsZEl.value) || 0; skribiElektitanUrbon(); gxisdatigiUrboElektilon(); gxisdatigiKradon(); });
kradoKeuxfhxesoEl.addEventListener("change", () => { kradoKeuxfhxeso = kradoKeuxfhxesoEl.checked; skribiElektitanUrbon(); gxisdatigiKradon(); });
kradoLampojEl.addEventListener("change", () => { kradoLampoj = kradoLampojEl.checked; skribiElektitanUrbon(); gxisdatigiKradon(); });
// ប្លុកបន្ថែម ។ រាល់ការផ្លាស់ប្តូរសរសេរប្លុកត្រឡប់ទៅទីក្រុង ( ការរក្សាទុក
// សរសេរទីក្រុងទៅ SKULPTA_URBOJ ) ហើយសាងសង់ផែនការឡើងវិញភ្លាម។
aldonaBlokoElektilo.addEventListener("change", () => {
  elektitaAldonaBloko = parseInt(aldonaBlokoElektilo.value, 10) || 0;
  gxisdatigiAldonaBlokojn();
  markiDesegnon();
});
aldonaBlokoTipoEl.addEventListener("change", () => {
  skribiAldonanBlokon();
  // ស្ថានី 🚀 ( stacia ) និងប្រភេទត្រូវគ្នា ។ ប្រភេទក្រៅ "stacio" បិទ
  // ទង់ស្ថានី ( ទង់ធ្វើឱ្យប្លុកក្លាយជាប្រភេទស្ថានី ហើយលាក់
  // ប្រភេទដែលបានជ្រើស )។ ទិន្នន័យចាស់ ( sanktejo + stacia ) នៅ
  // មិនប៉ះពាល់ រហូតដល់ប្រភេទពិតជាត្រូវបានផ្លាស់ប្តូរ។
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
// ផ្ទាំងរងផ្លូវ ។ រាល់ការផ្លាស់ប្តូរសរសេរទិន្នន័យ ហើយសម្គាល់ឯកសារ
// ថាបានផ្លាស់ប្តូរ ( ការរក្សាទុកសរសេរ SKULPTA_VOJOJ និង SKULPTA_DOKOJ )។
vojoElektilo.addEventListener("change", () => {
  elektitaVojo = parseInt(vojoElektilo.value, 10) || 0;
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
  elektitaPunkto = parseInt(vojoPunktoElektilo.value, 10) || 0;
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
vojoPunktoXEl.addEventListener("change", () => { skribiVojoSekure(); });
vojoPunktoZEl.addEventListener("change", () => { skribiVojoSekure(); });
vojoAldoniBtn.addEventListener("click", () => {
  momenti();
  const v = vojoj[elektitaVojo];
  const last: VojaPunkto = v && v.punktoj && v.punktoj.length ? v.punktoj[v.punktoj.length - 1] : [ 0, 0 ];
  const nova: SkulptaVojo = { nomo: "Nova vojo", larĝo: 0o7/0o2, punktoj: [
    [ Math.round(( last[0] - 10 ) * 2) / 2, last[1] ],
    [ Math.round(( last[0] + 10 ) * 2) / 2, last[1] ] ] };
  vojoj.push(nova);
  if ( vojoKunfandiĝas(nova, vojoj.length - 1) ) {
    vojoj.pop();
    statuso("Nova vojo interkovrus ekzistan vojon aŭ dokon 🛑");
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
// „ភ្ជាប់ទាំងអស់ 🔗“ ។ ការចុចមួយតភ្ជាប់ចុងនៃផ្លូវទាំងអស់ ( បណ្តាញ
// ទាំងមូល មិនមែនតែអ្វីដែលបានជ្រើស ) ហើយលុបចំណុចស្ទួន។ ប្រវត្តិ
// ថតរូបម្តង ដូច្នេះការតភ្ជាប់ទាំងមូលអាចត្រឡប់វិញដោយ Ctrl+Z មួយ។
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
  statuso("Konektitaj " + vojajKunigoj + " voj-finoj kaj " + dokojajKunigoj + " dokoj 🔗");
  markiDesegnon();
});
vojoPunktoAldoniBtn.addEventListener("click", () => {
  const v = vojoj[elektitaVojo];
  if ( !v ) return;
  momenti();
  const last = v.punktoj[v.punktoj.length - 1];
  v.punktoj.push([ Math.round(( last[0] + 10 ) * 2) / 2, Math.round(last[1] * 2) / 2 ]);
  elektitaPunkto = v.punktoj.length - 1;
  if ( vojoKunfandiĝas(v, elektitaVojo) ) {
    v.punktoj.pop();
    elektitaPunkto = v.punktoj.length - 1;
    statuso("Nova punkto interkovrus vojon aŭ dokon 🛑");
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
  elektitaDoko = parseInt(dokoElektilo.value, 10) || 0;
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
  const nova = { x: last ? Math.round(( last.x + 24 ) * 2) / 2 : 0, z: last ? last.z : 0, profundo: 16, rotacio: last ? ( last.rotacio ?? 0 ) : 0 };
  dokoj.push(nova);
  const indekso = dokoj.length - 1;
  if ( dokoKunfandiĝas(nova, indekso) ) {
    dokoj.pop();
    statuso("Nova doko interkovrus vojon aŭ dokon 🛑");
    return;
  }
  konektiDokonAlVojo(nova, indekso);
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
kradoRestarigiBtn.addEventListener("click", () => { kradoSuperoj.clear(); sinkronigiSuperojn(); markiSxangxitan(); statuso("Nesavitaj ŝanĝoj"); gxisdatigiKradon(); });
kradoKopiiBtn.addEventListener("click", async() => {
  const u = urboj[elektitaUrbo];
  const teksto = u
    ? `{ nomo: "${u.nomo}", arangxaGrando: ${u.arangxaGrando}, blokaGrando: "${u.blokaGrando}", ofsX: ${u.ofsX}, ofsZ: ${u.ofsZ} }`
    : "";
  try {
    await navigator.clipboard.writeText(teksto);
    statuso("Kopiita: " + teksto);
  } catch {
    statuso("Ne eblis kopii aŭtomate — elektu mane: " + teksto);
  }
});

// កម្រិតទឹកជាកម្មសិទ្ធិរបស់ជក់ទឹក 🌊 ។ វាបង្ហាញក្នុង
// ការកំណត់តែពេលឧបករណ៍ទឹកសកម្ម ( មិនជាមួយឧបករណ៍ផ្សេង )។
