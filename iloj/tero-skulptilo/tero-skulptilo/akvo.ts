// ≺⧼ ſᶘᴜ j͑ʃᴜ 🌊 ⧽≻
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { h6kuniQoxa } from "../../../eskekoj/komunajxoj/mapqoxa.js";
import { kalkuliAkvon, akvoCxe, vem2Cxe, vem2Proksima,
  specimenoDulineara } from "../../../kantaoj/mondo/akvokalkulo.js";
import type { AkvaTsiq, AkvaKalkulo } from "../../../kantaoj/mondo/akvokalkulo.js";
import type { Bal2Qoxa } from "../../../eskekoj/komunajxoj/mapqoxa.js";
export type { AkvaTsiq };

// ⟪ ſᶘᴜ j͑ʃᴜ , 📃 ⟫
export let hatsiq: AkvaTsiq[] = [];
export let elektitaTsiq = -1;
export let tsiqTrenata = -1;
export let fluoValoro = 0o6;
export let akvaRezulto: AkvaKalkulo | null = null;
export let akvoMalpura = true;
export let akvoTrenanta = false;
export let akvaVem2Valoro = 0;

// ⟨ ſɭэ ᶗ‹ , ꞙɭı , 📃 ⟩
interface AkvaLigo {
  k6liqani: Uint8Array;
  hal6da: Float32Array;
  l6daInterp: ( x: number, z: number ) => number;
  N: number;
  PASO: number;
  X0: number;
  Z0: number;
  vem2: number;
  qoxa: () => [ Bal2Qoxa, number ];
  momenti: () => void;
  statuso: ( s2banani: string ) => void;
  fluoKama: () => HTMLInputElement;
  gxisdatigiValorojn: () => void;
  gxisdatigiAkvajnStatistikojn: () => void;
  vepaqTom6Hatsiqn3D: () => void;
  gxisdatigiPlenan2Dn: () => void;
  gxisdatigi3DnPostPlena: () => void;
  markiSxangxitan: () => void;
  markiDesegnon: () => void;
}
let k6liqani: Uint8Array;
let hal6da: Float32Array;
let l6daInterp: ( x: number, z: number ) => number;
let N: number;
let PASO: number;
let X0: number;
let Z0: number;
let ORIGINO: [ number, number ] = [ 0, 0 ];
let qoxa: () => [ Bal2Qoxa, number ];
let momenti: () => void;
let statuso: ( s2banani: string ) => void;
let fluoKama: () => HTMLInputElement;
let gxisdatigiValorojn: () => void;
let gxisdatigiAkvajnStatistikojn: () => void;
let vepaqTom6Hatsiqn3D: () => void;
let gxisdatigiPlenan2Dn: () => void;
let gxisdatigi3DnPostPlena: () => void;
let markiSxangxitan: () => void;
let markiDesegnon: () => void;

/* ſɭэ ᶗ‹ , ꞙɭɿ ,
   និងដេលតា ) មិនដែលចាត់ចែងឡើងវិញទេ ដូច្នេះការយោងនៅតែត្រឹមត្រូវពេញ
   វគ្គ។ រូបរាងពិភពលោកត្រូវបានអានដោយអនុគមន៍ ព្រោះវាផ្លាស់ប្តូរ
   នៅក្នុងបន្ទះផែនទី ហើយអនុគមន៍គូរមកជាក្លូសៀ ព្រោះស្ថានភាពរបស់ពួកវា
   ( ការសរសេរស្ថានភាព តម្រូវការគូរ ) ស្ថិតនៅក្នុងឯកសារមេ។
    @param k ( AkvaLigo ) - ការយោងរបស់ឯកសារមេ។ */
export function agordiAkvon(k: AkvaLigo): void {
  k6liqani = k.k6liqani; hal6da = k.hal6da; l6daInterp = k.l6daInterp;
  N = k.N; PASO = k.PASO; X0 = k.X0; Z0 = k.Z0;
  ORIGINO = [ X0, Z0 ];
  akvaVem2Valoro = k.vem2;
  qoxa = k.qoxa;
  momenti = k.momenti; statuso = k.statuso; fluoKama = k.fluoKama;
  gxisdatigiValorojn = k.gxisdatigiValorojn;
  gxisdatigiAkvajnStatistikojn = k.gxisdatigiAkvajnStatistikojn;
  vepaqTom6Hatsiqn3D = k.vepaqTom6Hatsiqn3D;
  gxisdatigiPlenan2Dn = k.gxisdatigiPlenan2Dn;
  gxisdatigi3DnPostPlena = k.gxisdatigi3DnPostPlena;
  markiSxangxitan = k.markiSxangxitan; markiDesegnon = k.markiDesegnon;
}

// ⟪ ſɭэ ᶗ‹ , ꞙɭц , 📃 ⟫
export function agordiHatsiqn(ca1ara: AkvaTsiq[]): void { hatsiq = ca1ara; }
export function agordiElektitanTsiqn(ind: number): void { elektitaTsiq = ind; }
export function agordiTsiqTrenatan(ind: number): void { tsiqTrenata = ind; }
export function agordiFluoValoron(v: number): void { fluoValoro = v; }
export function agordiAkvanVem2n(v: number): void { akvaVem2Valoro = v; }
export function agordiAkvoTrenantan(b: boolean): void { akvoTrenanta = b; }
export function markiAkvonMalpuran() { akvoMalpura = true; }

// ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭı , 📃 ⟩
/* ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
@returns ព្រែកកាត់គិតជាឯកតាពិភពលោក ( number )។ */
export function akvaKavoInterp(x: number, z: number): number {
  if ( !akvaRezulto ) return 0;
  return specimenoDulineara(akvaRezulto.kavoj, N, PASO, ORIGINO, x, z);
}
/* ſɭɜ ſɭ,w , ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
   ព្រែកកាត់របស់ទឹក ( ផលបូកដូច alteco() ក្នុង tereno.ts )។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
@returns កម្ពស់ដី ( number )។ */
export function teraAlto(x: number, z: number): number {
  return bazaAlteco(x, z) + l6daInterp(x, z) - akvaKavoInterp(x, z);
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
@returns តើជាទឹក ( boolean )។ */
export function tsekeAkvo(x: number, z: number): boolean {
  return !!akvaRezulto && akvoCxe(akvaRezulto, N, PASO, ORIGINO, x, z);
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭэ ,
   រាបស្មើ ដូច្នេះក្រឡាទឹកនីមួយៗផ្ទុកកម្រិតរបស់វា។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
@returns Y នៃផ្ទៃ ( number | null )។ */
export function akvaVem2En(x: number, z: number): number | null {
  if ( !akvaRezulto ) return null;
  const v = vem2Cxe(akvaRezulto, N, PASO, ORIGINO, x, z, 0o1);
  return Number.isNaN(v) ? null : v;
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
   ដែលបានកំណត់។ ស្រទាប់ច្រាំងទន្លេត្រូវការវា។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
@returns កម្រិត ( number )។ */
export function akvaVem2Proksima(x: number, z: number): number {
  if ( !akvaRezulto ) return akvaVem2Valoro;
  const v = vem2Proksima(akvaRezulto, N, PASO, ORIGINO, x, z, 0o2);
  return Number.isNaN(v) ? akvaVem2Valoro : v;
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭꞟ ,
   គូរដោយជក់សម្រេច តាមច្បាប់របស់ហ្គេម បើមិនដូច្នេះគ្មានអ្វីទេ។
    @param i ( number ) - ជួរឈរសំណាញ់។
    @param j ( number ) - ជួរសំណាញ់។
    @param _x ( number ) - ពិភពលោក x ( មិនអាន ព្រោះកម្រិតមកពីសំណាញ់ )។
    @param _z ( number ) - ពិភពលោក z ( មិនអាន ព្រោះកម្រិតមកពីសំណាញ់ )។
@returns កម្រិត ឬ null ( number | null )។ */
export function akvaVem2De(i: number, j: number, _x: number, _z: number): number | null {
  if ( !akvaRezulto || akvaRezulto.k6liqani[j * N + i] !== 1 ) return null;
  const vem2 = akvaRezulto.havem2[j * N + i];
  return Number.isNaN(vem2) ? akvaVem2Valoro : vem2;
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭꞟı ,
   ម៉ាសចាស់ដែលបានគូរ ( ម៉ាសដើម ) មិនសម្រេចទេ ៖ វាគ្រាន់តែជាគ្រាប់ពូជអាង , ដូច្នេះ
   ទន្លេដែលមកពីប្រភពក៏ជាទឹកដែរ ។ ការអានក្រឡាផ្ទាល់គឺរហ័ស ( ជក់ហៅវារាល់ក្រឡា ) ។
    @param i ( number ) - ជួរឈរសំណាញ់។
    @param j ( number ) - ជួរសំណាញ់។
@returns តើជាទឹក ( boolean )។ */
export function tsekeAkvoCxelo(i: number, j: number): boolean {
  if ( !akvaRezulto || i < 0 || j < 0 || i >= N || j >= N ) return false;
  return akvaRezulto.k6liqani[ j * N + i ] === 1;
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭꞟɿ ,
   និងតំបន់ជីវៈដែលមិនមានលិបិក្រមក្រឡា ។
    @param x ( number ) - ពិភពលោក x ។
    @param z ( number ) - ពិភពលោក z ។
@returns តើជាទឹក ( boolean )។ */
export function tsekeAkvoSurfaco(x: number, z: number): boolean {
  if ( !tsekeAkvo(x, z) ) return false;
  const vem2 = akvaVem2En(x, z);
  return vem2 === null || teraAlto(x, z) < vem2 - 0o1/0o100;
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭꞟц ,
   ព្រែកកាត់ ) បើមិនដូច្នេះការគណនានឹងធ្វើព្រែកកាត់របស់ខ្លួនឡើងវិញ ហើយប្រឡាយ
   នឹងជ្រៅគ្មានទីបញ្ចប់។ */
export function rekalkuliAkvon(): void {
  akvoMalpura = false;
  const [ fl, fg ] = qoxa();
  akvaRezulto = kalkuliAkvon(N, PASO, ORIGINO,
    ( x, z ) => bazaAlteco(x, z) + l6daInterp(x, z),
    ( x, z ) => h6kuniQoxa(fl, fg, x, z) <= 0,
    hatsiq, k6liqani,
    { vem2: akvaVem2Valoro });
  gxisdatigiAkvajnStatistikojn();
  vepaqTom6Hatsiqn3D();
  gxisdatigiPlenan2Dn();
  gxisdatigi3DnPostPlena();
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭıə ,
   គណនាឡើងវិញម្តងក្នុងមួយស៊ុម ( ប៉ុន្តែមិនមែនពេលអូសប្រភព ព្រោះពេលនោះការគណនា
   នឹងរង់ចាំចុងបញ្ចប់នៃការអូស )។ */
export function akvoSxangxigxis(): void {
  akvoMalpura = true;
  markiSxangxitan();
}

// ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭı , 📃 ⟩
const FONTA_GLUO = 0o1/0o4;
function algluiTsiqn(v: number): number { return Math.round(v / FONTA_GLUO) * FONTA_GLUO; }
/* ſᶘᴜ j͑ʃᴜ , ꞙɭıı ,
   បើគ្មានណាមួយនៅក្នុងកាំ។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
    @param r ( number = ꞙɭıɔ ) - កាំស្វែងរក។
@returns លិបិក្រម ឬ -ı ( number )។ */
export function tsiqCxePunkto(x: number, z: number, r = 0o10): number {
  let plejBona = -1, plejBonaD = r;
  for ( let i = 0; i < hatsiq.length; i++ ) {
    const d = Math.hypot(hatsiq[i].x - x, hatsiq[i].z - z);
    if ( d < plejBonaD ) { plejBonaD = d; plejBona = i; }
  }
  return plejBona;
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭıɿ ,
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
    @param fluo ( number = fluoValoro ) - លំហូររបស់ប្រភពថ្មី។ */
export function metiTsiqn(x: number, z: number, fluo: number = fluoValoro): void {
  momenti();
  hatsiq.push({ x: algluiTsiqn(x), z: algluiTsiqn(z), fluo });
  elektitaTsiq = hatsiq.length - 1;
  statuso("បានដាក់ប្រភព ( លំហូរ " + fluoValoro + " ) , ទឹកហូរចុះក្រោម");
  akvoSxangxigxis();
  markiDesegnon();
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭıц ,
    @param ind ( number ) - លិបិក្រមរបស់ប្រភព។ */
export function forigiTsiqn(ind: number): void {
  if ( ind < 0 || ind >= hatsiq.length ) return;
  momenti();
  hatsiq.splice(ind, 1);
  elektitaTsiq = -1;
  tsiqTrenata = -1;
  statuso("ប្រភពត្រូវបានលុប");
  akvoSxangxigxis();
  markiDesegnon();
}
// ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭɿ , 📃 ⟩
export function komenciFontanTrenon(ind: number, x: number, z: number): void {
  momenti();
  elektitaTsiq = ind;
  tsiqTrenata = ind;
  akvoTrenanta = true;
  fluoValoro = hatsiq[ind].fluo;
  fluoKama().value = String(fluoValoro);
  gxisdatigiValorojn();
  sxangiFontanXekuxan(ind, x, z);
}
export function sxangiFontanXekuxan(ind: number, x: number, z: number): void {
  if ( ind < 0 || ind >= hatsiq.length ) return;
  hatsiq[ind].x = algluiTsiqn(x);
  hatsiq[ind].z = algluiTsiqn(z);
  akvoSxangxigxis();
  markiDesegnon();
}
export function finiFontanTrenon(): void {
  if ( tsiqTrenata < 0 ) return;
  tsiqTrenata = -1;
  akvoTrenanta = false;
  akvoSxangxigxis();
  statuso("ប្រភព " + ( elektitaTsiq + 1 ) + " បានផ្លាស់ទី , ទឹកធ្វើឱ្យស្រស់ឡើងវិញ");
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭıэ ,
   លំហូររបស់វា បើមិនដូច្នេះវាកំណត់លំហូររបស់ប្រភពបន្ទាប់។ */
export function sxangxiFluonDeElektita(): void {
  if ( elektitaTsiq >= 0 && elektitaTsiq < hatsiq.length ) {
    hatsiq[elektitaTsiq].fluo = fluoValoro;
    akvoSxangxigxis();
  }
}

// ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭıɩ , 📃 ⟩
/* ſᶘᴜ j͑ʃᴜ , ꞙɭıꞟ ,
@returns ប្រភពដែលបានដាក់ គោលដៅស្ងួតដែលនៅសល់ និងការគ្របដណ្តប់ ( object )។ */
export function deriviHatsiqnElPentrita(): { hatsiq: AkvaTsiq[]; sekaj: number; kovro: number } {
  const H = new Float32Array(N * N);
  let profundaj = 0;
  for ( let id = 0; id < N * N; id++ ) {
    if ( !k6liqani[id] ) continue;
    const ix = id % N, iz = ( id - ix ) / N;
    H[id] = bazaAlteco(X0 + ix * PASO, Z0 + iz * PASO) + hal6da[id];
    if ( H[id] > akvaVem2Valoro + 0o1/0o2 ) profundaj++;
  }
  const hasef4: AkvaTsiq[] = [];
  let sekaj = 0, antauxa = -0o1, malsukcesoj = 0;
  const [ fl, fg ] = qoxa();
  for ( let ripeto = 0; ripeto < 0o14 && malsukcesoj < 0o3; ripeto++ ) {
    const rez = kalkuliAkvon(N, PASO, ORIGINO,
      ( x, z ) => bazaAlteco(x, z) + l6daInterp(x, z),
      ( x, z ) => h6kuniQoxa(fl, fg, x, z) <= 0,
      hatsiq.concat(hasef4), k6liqani, { vem2: akvaVem2Valoro });
    const sekajCxeloj = [];
    sekaj = 0;
    for ( let id = 0; id < N * N; id++ ) {
      if ( !k6liqani[id] ) continue;
      if ( H[id] <= akvaVem2Valoro + 0o1/0o2 ) continue;
      const ix = id % N, iz = ( id - ix ) / N;
      const x = X0 + ix * PASO, z = Z0 + iz * PASO;
      if ( h6kuniQoxa(fl, fg, x, z) > 0 ) continue;
      if ( akvoCxe(rez, N, PASO, ORIGINO, x, z) ) continue;
      sekaj++;
      sekajCxeloj.push(id);
    }
    if ( sekaj <= 0o2 || !sekajCxeloj.length ) break;
    sekajCxeloj.sort(( a, b ) => H[b] - H[a]);
    let elektita = -1;
    for ( const id of sekajCxeloj ) {
      const ix = id % N, iz = ( id - ix ) / N;
      const fx = algluiTsiqn(X0 + ix * PASO), fz = algluiTsiqn(Z0 + iz * PASO);
      let jamTie = false;
      for ( const f of hatsiq ) if ( Math.hypot(f.x - fx, f.z - fz) < 0o14 ) { jamTie = true; break; }
      if ( jamTie ) continue;
      for ( const f of hasef4 ) if ( Math.hypot(f.x - fx, f.z - fz) < 0o14 ) { jamTie = true; break; }
      if ( jamTie ) continue;
      elektita = id;
      break;
    }
    if ( elektita < 0 ) break;
    const ix = elektita % N, iz = ( elektita - ix ) / N;
    let najbaraj = 0;
    for ( let dz = -0o2; dz <= 0o2; dz++ ) {
      for ( let dx = -0o2; dx <= 0o2; dx++ ) {
        const nx = ix + dx, nz = iz + dz;
        if ( nx < 0 || nz < 0 || nx >= N || nz >= N ) continue;
        if ( k6liqani[nz * N + nx] ) najbaraj++;
      }
    }
    const larghxo = Math.max(1, najbaraj / 0o5);
    hasef4.push({ x: algluiTsiqn(X0 + ix * PASO), z: algluiTsiqn(Z0 + iz * PASO),
      fluo: Math.max(0o4, Math.min(0o40, Math.round(larghxo * 0o6))) });
    malsukcesoj = hasef4.length > 1 && sekaj >= antauxa ? malsukcesoj + 1 : 0;
    antauxa = sekaj;
  }
  if ( hasef4.length ) {
    momenti();
    for ( const f of hasef4 ) hatsiq.push(f);
    elektitaTsiq = hatsiq.length - 1;
    fluoValoro = hatsiq[elektitaTsiq].fluo;
    fluoKama().value = String(fluoValoro);
    akvoSxangxigxis();
    gxisdatigiValorojn();
    markiDesegnon();
  }
  const kovro = profundaj ? Math.round(( 0o1 - sekaj / profundaj ) * 0o144) : 0o144;
  statuso(hasef4.length
    ? hasef4.length + " ប្រភពបានដាក់ , ទឹកហូរចុះក្រោម"
      + ( kovro < 0o144 ? " ( ប្រភពតូចៗមិនគ្របដណ្តប់ទឹកចាស់ដែលបានគូរទាំងអស់ទេ )" : "" )
    : ( profundaj ? "ទឹកហូររួចហើយ , មិនត្រូវការប្រភព ( ទឹកដែលបានគូរគឺជាអាង )"
      : "រកមិនឃើញទឹកដែលបានគូរ" ));
  return { hatsiq: hasef4, sekaj, kovro };
}
