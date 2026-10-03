// ≺⧼ ទឹក 🌊 ⧽≻
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { distancoDeFormo } from "../../../eskekoj/komunajxoj/mapformo.js";
import { kalkuliAkvon, akvoCxe, niveloCxe, niveloProksima,
  specimenoDulineara } from "../../../kantaoj/mondo/akvokalkulo.js";
import type { AkvaFonto, AkvaKalkulo } from "../../../kantaoj/mondo/akvokalkulo.js";
import type { MapFormo } from "../../../eskekoj/komunajxoj/mapformo.js";
export type { AkvaFonto };

// ⟪ ស្ថានភាពទឹក 📃 ⟫
export let fontoj: AkvaFonto[] = [];
export let elektitaFonto = -1;
export let fontoTrenata = -1;
export let fluoValoro = 0o6;
export let akvaRezulto: AkvaKalkulo | null = null;
export let akvoMalpura = true;
export let akvoTrenanta = false;
export let akvaNiveloValoro = 0;

// ⟨ ការភ្ជាប់ទៅកម្មវិធីកែសម្រួល 📃 ⟩
interface AkvaLigo {
  masko: Uint8Array;
  deltoj: Float32Array;
  deltoInterp: ( x: number, z: number ) => number;
  N: number;
  PASO: number;
  X0: number;
  Z0: number;
  nivelo: number;
  formo: () => [ MapFormo, number ];
  momenti: () => void;
  statuso: ( teksto: string ) => void;
  fluoRegilo: () => HTMLInputElement;
  gxisdatigiValorojn: () => void;
  gxisdatigiAkvajnStatistikojn: () => void;
  rekonstruiFontojn3D: () => void;
  gxisdatigiPlenan2Dn: () => void;
  gxisdatigi3DnPostPlena: () => void;
  markiSxangxitan: () => void;
  markiDesegnon: () => void;
}
let masko: Uint8Array;
let deltoj: Float32Array;
let deltoInterp: ( x: number, z: number ) => number;
let N: number;
let PASO: number;
let X0: number;
let Z0: number;
let ORIGINO: [ number, number ] = [ 0, 0 ];
let formo: () => [ MapFormo, number ];
let momenti: () => void;
let statuso: ( teksto: string ) => void;
let fluoRegilo: () => HTMLInputElement;
let gxisdatigiValorojn: () => void;
let gxisdatigiAkvajnStatistikojn: () => void;
let rekonstruiFontojn3D: () => void;
let gxisdatigiPlenan2Dn: () => void;
let gxisdatigi3DnPostPlena: () => void;
let markiSxangxitan: () => void;
let markiDesegnon: () => void;

/* agordiAkvon គឺការភ្ជាប់តែម្តងជាមួយឯកសារមេ។ តារាង ( ម៉ាស
   និងដេលតា ) មិនដែលចាត់ចែងឡើងវិញទេ ដូច្នេះការយោងនៅតែត្រឹមត្រូវពេញ
   វគ្គ។ រូបរាងពិភពលោកត្រូវបានអានដោយអនុគមន៍ ព្រោះវាផ្លាស់ប្តូរ
   នៅក្នុងបន្ទះផែនទី ហើយអនុគមន៍គូរមកជាក្លូសៀ ព្រោះស្ថានភាពរបស់ពួកវា
   ( ការសរសេរស្ថានភាព តម្រូវការគូរ ) ស្ថិតនៅក្នុងឯកសារមេ។
    @param k ( AkvaLigo ) - ការយោងរបស់ឯកសារមេ។ */
export function agordiAkvon(k: AkvaLigo): void {
  masko = k.masko; deltoj = k.deltoj; deltoInterp = k.deltoInterp;
  N = k.N; PASO = k.PASO; X0 = k.X0; Z0 = k.Z0;
  ORIGINO = [ X0, Z0 ];
  akvaNiveloValoro = k.nivelo;
  formo = k.formo;
  momenti = k.momenti; statuso = k.statuso; fluoRegilo = k.fluoRegilo;
  gxisdatigiValorojn = k.gxisdatigiValorojn;
  gxisdatigiAkvajnStatistikojn = k.gxisdatigiAkvajnStatistikojn;
  rekonstruiFontojn3D = k.rekonstruiFontojn3D;
  gxisdatigiPlenan2Dn = k.gxisdatigiPlenan2Dn;
  gxisdatigi3DnPostPlena = k.gxisdatigi3DnPostPlena;
  markiSxangxitan = k.markiSxangxitan; markiDesegnon = k.markiDesegnon;
}

// ⟪ អនុគមន៍កំណត់ 📃 ⟫
export function agordiFontojn(listo: AkvaFonto[]): void { fontoj = listo; }
export function agordiElektitanFonton(ind: number): void { elektitaFonto = ind; }
export function agordiFontoTrenatan(ind: number): void { fontoTrenata = ind; }
export function agordiFluoValoron(v: number): void { fluoValoro = v; }
export function agordiAkvanNivelon(v: number): void { akvaNiveloValoro = v; }
export function agordiAkvoTrenantan(b: boolean): void { akvoTrenanta = b; }
export function markiAkvonMalpuran() { akvoMalpura = true; }

// ⟨ ឧបករណ៍ជំនួយទឹក 📃 ⟩
/* ព្រែកកាត់របស់ទឹក ( គ្រែទន្លេដែលទឹកកាត់ )។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
@returns ព្រែកកាត់គិតជាឯកតាពិភពលោក ( number )។ */
export function akvaKavoInterp(x: number, z: number): number {
  if ( !akvaRezulto ) return 0;
  return specimenoDulineara(akvaRezulto.kavoj, N, PASO, ORIGINO, x, z);
}
/* ដីដែលមើលឃើញ គឺមូលដ្ឋានប្រូសេឌូរ៉ាល់ ដេលតាដែលឆ្លាក់ និង
   ព្រែកកាត់របស់ទឹក ( ផលបូកដូច alteco() ក្នុង tereno.ts )។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
@returns កម្ពស់ដី ( number )។ */
export function teraAlto(x: number, z: number): number {
  return bazaAlteco(x, z) + deltoInterp(x, z) - akvaKavoInterp(x, z);
}
/* តើចំណុចជាទឹក ( ម៉ាសដេរីវេ )។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
@returns តើជាទឹក ( boolean )។ */
export function cxuAkvo(x: number, z: number): boolean {
  return !!akvaRezulto && akvoCxe(akvaRezulto, N, PASO, ORIGINO, x, z);
}
/* Y នៃផ្ទៃទឹក ឬ null។ ទន្លេហូរចុះ រីឯអាងគឺ
   រាបស្មើ ដូច្នេះក្រឡាទឹកនីមួយៗផ្ទុកកម្រិតរបស់វា។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
@returns Y នៃផ្ទៃ ( number | null )។ */
export function akvaNiveloEn(x: number, z: number): number | null {
  if ( !akvaRezulto ) return null;
  const v = niveloCxe(akvaRezulto, N, PASO, ORIGINO, x, z, 0o1);
  return Number.isNaN(v) ? null : v;
}
/* កម្រិតទឹកជិតបំផុត ( រហូតពីរក្រឡា ) ឬកម្រិតទឹក
   ដែលបានកំណត់។ ស្រទាប់ច្រាំងទន្លេត្រូវការវា។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
@returns កម្រិត ( number )។ */
export function akvaNiveloProksima(x: number, z: number): number {
  if ( !akvaRezulto ) return akvaNiveloValoro;
  const v = niveloProksima(akvaRezulto, N, PASO, ORIGINO, x, z, 0o2);
  return Number.isNaN(v) ? akvaNiveloValoro : v;
}
/* កម្រិតទឹកសម្រាប់ក្រឡាសំណាញ់ ( i, j ) នៅ ( x, z )។ ម៉ាសដែល
   គូរដោយជក់សម្រេច តាមច្បាប់របស់ហ្គេម បើមិនដូច្នេះគ្មានអ្វីទេ។
    @param i ( number ) - ជួរឈរសំណាញ់។
    @param j ( number ) - ជួរសំណាញ់។
    @param _x ( number ) - ពិភពលោក x ( មិនអាន ព្រោះកម្រិតមកពីសំណាញ់ )។
    @param _z ( number ) - ពិភពលោក z ( មិនអាន ព្រោះកម្រិតមកពីសំណាញ់ )។
@returns កម្រិត ឬ null ( number | null )។ */
export function akvaNiveloDe(i: number, j: number, _x: number, _z: number): number | null {
  if ( !akvaRezulto || akvaRezulto.masko[j * N + i] !== 1 ) return null;
  const nivelo = akvaRezulto.niveloj[j * N + i];
  return Number.isNaN(nivelo) ? akvaNiveloValoro : nivelo;
}
/* រត់ការគណនាទឹក។ ដីគឺដីស្ងួត ( ដេលតាដោយគ្មាន
   ព្រែកកាត់ ) បើមិនដូច្នេះការគណនានឹងធ្វើព្រែកកាត់របស់ខ្លួនឡើងវិញ ហើយប្រឡាយ
   នឹងជ្រៅគ្មានទីបញ្ចប់។ */
export function rekalkuliAkvon(): void {
  akvoMalpura = false;
  const [ fl, fg ] = formo();
  akvaRezulto = kalkuliAkvon(N, PASO, ORIGINO,
    ( x, z ) => bazaAlteco(x, z) + deltoInterp(x, z),
    ( x, z ) => distancoDeFormo(fl, fg, x, z) <= 0,
    fontoj, masko,
    { nivelo: akvaNiveloValoro });
  gxisdatigiAkvajnStatistikojn();
  rekonstruiFontojn3D();
  gxisdatigiPlenan2Dn();
  gxisdatigi3DnPostPlena();
}
/* អ្វីមួយបានផ្លាស់ប្តូរទឹក ( ដី ប្រភព កម្រិត )។ រង្វិលជុំ
   គណនាឡើងវិញម្តងក្នុងមួយស៊ុម ( ប៉ុន្តែមិនមែនពេលអូសប្រភព ព្រោះពេលនោះការគណនា
   នឹងរង់ចាំចុងបញ្ចប់នៃការអូស )។ */
export function akvoSxangxigxis(): void {
  akvoMalpura = true;
  markiSxangxitan();
}

// ⟨ ប្រភពទឹក 📃 ⟩
const FONTA_GLUO = 0o1/0o4;
function algluiFonton(v: number): number { return Math.round(v / FONTA_GLUO) * FONTA_GLUO; }
/* លិបិក្រមរបស់ប្រភពជិតបំផុតទៅចំណុច ( គិតជាឯកតាពិភពលោក ) ឬ -1
   បើគ្មានណាមួយនៅក្នុងកាំ។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
    @param r ( number = 0o10 ) - កាំស្វែងរក។
@returns លិបិក្រម ឬ -1 ( number )។ */
export function fontoCxePunkto(x: number, z: number, r = 0o10): number {
  let plejBona = -1, plejBonaD = r;
  for ( let i = 0; i < fontoj.length; i++ ) {
    const d = Math.hypot(fontoj[i].x - x, fontoj[i].z - z);
    if ( d < plejBonaD ) { plejBonaD = d; plejBona = i; }
  }
  return plejBona;
}
/* ប្រភពថ្មីនៅចំណុច ជាមួយលំហូររបស់គ្រាប់រំកិល។
    @param x ( number ) - ពិភពលោក x។
    @param z ( number ) - ពិភពលោក z។
    @param fluo ( number = fluoValoro ) - លំហូររបស់ប្រភពថ្មី។ */
export function metiFonton(x: number, z: number, fluo: number = fluoValoro): void {
  momenti();
  fontoj.push({ x: algluiFonton(x), z: algluiFonton(z), fluo });
  elektitaFonto = fontoj.length - 1;
  statuso("បានដាក់ប្រភព ( លំហូរ " + fluoValoro + " ) , ទឹកហូរចុះក្រោម");
  akvoSxangxigxis();
  markiDesegnon();
}
/* លុបប្រភព ( ទឹករបស់វាបាត់ )។
    @param ind ( number ) - លិបិក្រមរបស់ប្រភព។ */
export function forigiFonton(ind: number): void {
  if ( ind < 0 || ind >= fontoj.length ) return;
  momenti();
  fontoj.splice(ind, 1);
  elektitaFonto = -1;
  fontoTrenata = -1;
  statuso("ប្រភពត្រូវបានលុប");
  akvoSxangxigxis();
  markiDesegnon();
}
// ⟨ ការអូសប្រភព 📃 ⟩
export function komenciFontanTrenon(ind: number, x: number, z: number): void {
  momenti();
  elektitaFonto = ind;
  fontoTrenata = ind;
  akvoTrenanta = true;
  fluoValoro = fontoj[ind].fluo;
  fluoRegilo().value = String(fluoValoro);
  gxisdatigiValorojn();
  sxangiFontanPozicion(ind, x, z);
}
export function sxangiFontanPozicion(ind: number, x: number, z: number): void {
  if ( ind < 0 || ind >= fontoj.length ) return;
  fontoj[ind].x = algluiFonton(x);
  fontoj[ind].z = algluiFonton(z);
  akvoSxangxigxis();
  markiDesegnon();
}
export function finiFontanTrenon(): void {
  if ( fontoTrenata < 0 ) return;
  fontoTrenata = -1;
  akvoTrenanta = false;
  akvoSxangxigxis();
  statuso("ប្រភព " + ( elektitaFonto + 1 ) + " បានផ្លាស់ទី , ទឹកធ្វើឱ្យស្រស់ឡើងវិញ");
}
/* គ្រាប់រំកិលលំហូរពេលប្រើឧបករណ៍ប្រភព គឺបើមានប្រភពជ្រើស វាផ្លាស់ប្តូរ
   លំហូររបស់វា បើមិនដូច្នេះវាកំណត់លំហូររបស់ប្រភពបន្ទាប់។ */
export function sxangxiFluonDeElektita(): void {
  if ( elektitaFonto >= 0 && elektitaFonto < fontoj.length ) {
    fontoj[elektitaFonto].fluo = fluoValoro;
    akvoSxangxigxis();
  }
}

// ⟨ ប្រភពចេញពីទឹកដែលគូរដោយជក់ 📃 ⟩
/* ទាញប្រភពចេញពីទឹកចាស់ដែលគូរដោយជក់។
@returns ប្រភពដែលបានដាក់ គោលដៅស្ងួតដែលនៅសល់ និងការគ្របដណ្តប់ ( object )។ */
export function deriviFontojnElPentrita(): { fontoj: AkvaFonto[]; sekaj: number; kovro: number } {
  const H = new Float32Array(N * N);
  let profundaj = 0;
  for ( let id = 0; id < N * N; id++ ) {
    if ( !masko[id] ) continue;
    const ix = id % N, iz = ( id - ix ) / N;
    H[id] = bazaAlteco(X0 + ix * PASO, Z0 + iz * PASO) + deltoj[id];
    if ( H[id] > akvaNiveloValoro + 0o1/0o2 ) profundaj++;
  }
  const novaj: AkvaFonto[] = [];
  let sekaj = 0, antauxa = -0o1, malsukcesoj = 0;
  const [ fl, fg ] = formo();
  for ( let ripeto = 0; ripeto < 0o14 && malsukcesoj < 0o3; ripeto++ ) {
    const rez = kalkuliAkvon(N, PASO, ORIGINO,
      ( x, z ) => bazaAlteco(x, z) + deltoInterp(x, z),
      ( x, z ) => distancoDeFormo(fl, fg, x, z) <= 0,
      fontoj.concat(novaj), masko, { nivelo: akvaNiveloValoro });
    const sekajCxeloj = [];
    sekaj = 0;
    for ( let id = 0; id < N * N; id++ ) {
      if ( !masko[id] ) continue;
      if ( H[id] <= akvaNiveloValoro + 0o1/0o2 ) continue;
      const ix = id % N, iz = ( id - ix ) / N;
      const x = X0 + ix * PASO, z = Z0 + iz * PASO;
      if ( distancoDeFormo(fl, fg, x, z) > 0 ) continue;
      if ( akvoCxe(rez, N, PASO, ORIGINO, x, z) ) continue;
      sekaj++;
      sekajCxeloj.push(id);
    }
    if ( sekaj <= 0o2 || !sekajCxeloj.length ) break;
    sekajCxeloj.sort(( a, b ) => H[b] - H[a]);
    let elektita = -1;
    for ( const id of sekajCxeloj ) {
      const ix = id % N, iz = ( id - ix ) / N;
      const fx = algluiFonton(X0 + ix * PASO), fz = algluiFonton(Z0 + iz * PASO);
      let jamTie = false;
      for ( const f of fontoj ) if ( Math.hypot(f.x - fx, f.z - fz) < 0o14 ) { jamTie = true; break; }
      if ( jamTie ) continue;
      for ( const f of novaj ) if ( Math.hypot(f.x - fx, f.z - fz) < 0o14 ) { jamTie = true; break; }
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
        if ( masko[nz * N + nx] ) najbaraj++;
      }
    }
    const larghxo = Math.max(1, najbaraj / 0o5);
    novaj.push({ x: algluiFonton(X0 + ix * PASO), z: algluiFonton(Z0 + iz * PASO),
      fluo: Math.max(0o4, Math.min(0o40, Math.round(larghxo * 0o6))) });
    malsukcesoj = novaj.length > 1 && sekaj >= antauxa ? malsukcesoj + 1 : 0;
    antauxa = sekaj;
  }
  if ( novaj.length ) {
    momenti();
    for ( const f of novaj ) fontoj.push(f);
    elektitaFonto = fontoj.length - 1;
    fluoValoro = fontoj[elektitaFonto].fluo;
    fluoRegilo().value = String(fluoValoro);
    akvoSxangxigxis();
    gxisdatigiValorojn();
    markiDesegnon();
  }
  const kovro = profundaj ? Math.round(( 0o1 - sekaj / profundaj ) * 0o144) : 0o144;
  statuso(novaj.length
    ? novaj.length + " ប្រភពបានដាក់ , ទឹកហូរចុះក្រោម"
      + ( kovro < 0o144 ? " ( ប្រភពតូចៗមិនគ្របដណ្តប់ទឹកចាស់ដែលបានគូរទាំងអស់ទេ )" : "" )
    : ( profundaj ? "ទឹកហូររួចហើយ , មិនត្រូវការប្រភព ( ទឹកដែលបានគូរគឺជាអាង )"
      : "រកមិនឃើញទឹកដែលបានគូរ" ));
  return { fontoj: novaj, sekaj, kovro };
}
