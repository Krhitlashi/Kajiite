// ≺⧼ ផែនទី និងឯកសារ 📃 ⧽≻
// ទម្រង់ទិន្នន័យ និងឯកសាររបស់ឧបករណ៍ឆ្លាក់ដី គឺកូដលេខ
// ( លេខគោលប្រាំបី ប្រភាគ π base64 ) បញ្ជីផែនទី ( tero-datumaro/mapoj.ts
// និងទ្វារ aktiva.ts ) រូបរាងពិភពលោក និងការអាន និងការសរសេរ
// ឯកសារទិន្នន័យទាំងប្រាំពីររបស់ផែនទី។ ស្ថានភាពកម្មវិធីកែសម្រួល ( ដេលតា ម៉ាស
// តំបន់ជីវៈ សត្វ ប្រវត្តិ និងកម្មវិធីបង្ហាញ ) មកតាម agordiDosierojn ព្រោះ
// ម៉ូឌុលអាន និងសរសេរពួកវាដូចម៉ូឌុលផ្សេងទៀត។
import { MAPOJ } from "../../../kantaoj/tero-datumaro/mapoj.js";
import { mapoDeKodo } from "../../../kantaoj/tero-datumaro/mapregulo.js";
import { FORMOJ, formajRandPunktoj } from "../../../eskekoj/komunajxoj/mapformo.js";
import { dekodiInt16, dekodiMaskon, dekodiBiomon, dekodiBestojn } from "../../../kantaoj/tero-datumaro/rultempo.js";
import { agordiFontojn, agordiElektitanFonton, agordiFontoTrenatan, agordiAkvanNivelon,
  akvaNiveloValoro, fontoj, markiAkvonMalpuran, rekalkuliAkvon } from "./akvo.js";
import { agordiObjektojn, agordiElektitanObjekton, gxisdatigiObjektoListon,
  rekonstruiObjektojn, objektoj } from "./objektoj.js";
import { agordiUrbojn, agordiElektitanUrbon, agordiVojojn, agordiDokojn, elektiUrbon,
  gxisdatigiVojajnRegilojn, sinkronigiSuperojn, urboj, vojoj, dokoj, elektitaUrbo } from "./kradaro.js";
import { gxisdatigiFormon3D } from "./vido3d.js";
import { elemento } from "../../komunajxoj/dom.js";
import type { MapFormo } from "../../../eskekoj/komunajxoj/mapformo.js";
import type { MapoDatumo } from "../../../kantaoj/tero-datumaro/mapregulo.js";
import type { AkvaFonto } from "./akvo.js";
import type { MetitaObjekto, SkulptaUrbo, SkulptaVojo, SkulptaPlatformo } from "../../../kantaoj/mondo/urbo/tipoj.js";
import type { VojaPunkto } from "../../../eskekoj/medio/voj-reto.js";
import type { HistoriaMomento } from "./historio.js";

// ផែនទីអាសយដ្ឋាន ( ?mapo=<kodo> ) គឺបញ្ជី រូបរាងពិភពលោក និង
// ចំណុចគែមនៃរូបរាង។ ហ្គេមខ្លួនឯងអានទ្វារ aktiva.ts។
export const mapoKodo = new URLSearchParams(location.search).get("mapo");
export const mapoDatumo = mapoDeKodo(mapoKodo);
export let mapoFormo: MapFormo = mapoDatumo.formo;
export let mapoGrandeco: number = mapoDatumo.grandeco;
export let mapojRegistroj: MapoDatumo[] = MAPOJ.map(m => ( { ...m } ));
export let formajRandaj = formajRandPunktoj(mapoFormo, mapoGrandeco, 0o100);

export function oktala(valoro: number): string {
  const n = Math.round(valoro * 0o100);
  if ( n % 0o100 === 0 ) {
    const tuta = n / 0o100;
    return ( tuta < 0 ? "-" : "" ) + "0o" + Math.abs(tuta).toString(8);
  }
  return ( n < 0 ? "-" : "" ) + "0o" + Math.abs(n).toString(8) + "/0o100";
}
// gcdn គឺភាគរយរួមធំបំផុត ( សម្រាប់ធ្វើឱ្យប្រភាគ π សាមញ្ញ )។
export function gcdn(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while ( b ) { const r = a % b; a = b; b = r; }
  return a || 1;
}
// piFrakcio គឺតើតម្លៃជាប្រភាគ π ពិត ( Math.PI, Math.PI/2,
// 3*Math.PI/4, ... ) ឬទេ។ ត្រឡប់អត្ថបទនៃកន្សោមពិត ឬ null។
export function piFrakcio(valoro: number): string | null {
  if ( !Number.isFinite(valoro) ) return null;
  const r = valoro / Math.PI;
  if ( Math.abs(r) < 1e-9 ) return "0";
  for ( let d = 1; d <= 0o20; d++ ) {
    const k = Math.round(r * d);
    if ( Math.abs(r - k / d) < 1e-7 ) {
      if ( k === 0 ) return "0";
      const g = gcdn(k, d);
      const kk = k / g, dd = d / g;
      const signo = kk < 0 ? "-" : "";
      const abso = Math.abs(kk);
      if ( dd === 1 ) {
        return abso === 1 ? signo + "Math.PI" : signo + abso + " * Math.PI";
      }
      return abso === 1 ? signo + "Math.PI / " + dd : signo + abso + " * Math.PI / " + dd;
    }
  }
  return null;
}
// formatiNombron គឺរចនាប័ទ្មលេខរបស់ទិន្នន័យ។ ចំនួនគត់ជា
// លេខគោលប្រាំបី ( 0o140 ជំនួស 96 ) ការបង្វិលជាប្រភាគ π ពិត
// ( Math.PI / 2 ជំនួស 1.5707963267948966 ) ហើយ 1/64 ជា
// ប្រភាគគោលប្រាំបី ( 0o340/0o100 ជំនួស 3.5 )។ មានតែសំណល់ចំនួនទសភាគ
// ( ឧទាហរណ៍ z របស់កំពង់ដែលគណនាដោយខ្លួនឯង ) ដែលនៅជាទសភាគ។
export function formatiNombron(valoro: number): string {
  if ( !Number.isFinite(valoro) ) return "null";
  if ( valoro === 0 ) return "0";
  const p = piFrakcio(valoro);
  if ( p !== null ) return p;
  if ( Number.isInteger(valoro) && Math.abs(valoro) <= 0o7777777777 ) {
    return ( valoro < 0 ? "-" : "" ) + "0o" + Math.abs(valoro).toString(8);
  }
  const n64 = valoro * 0o100;
  if ( Number.isInteger(n64) && Math.abs(n64) <= 0o7777777777 ) {
    return ( n64 < 0 ? "-" : "" ) + "0o" + Math.abs(n64).toString(8) + "/0o100";
  }
  return String(valoro);
}
/* សរសេរតម្លៃទិន្នន័យ ( ទីក្រុង ផ្លូវ កំពង់ វត្ថុ ) តាម
   រចនាប័ទ្មលេខរបស់ឯកសារ ( គោលប្រាំបី ប្រភាគ π ) ជំនួស JSON។
    @param valoro ( unknown ) - តម្លៃដែលត្រូវសរសេរ។
@returns អត្ថបទនៃតម្លៃ ( string )។ */
export function skribiValoron(valoro: unknown): string {
  if ( valoro === null || valoro === undefined ) return "null";
  if ( typeof valoro === "number" ) return formatiNombron(valoro);
  if ( typeof valoro === "boolean" ) return valoro ? "true" : "false";
  if ( typeof valoro === "string" ) return JSON.stringify(valoro);
  if ( Array.isArray(valoro) ) return "[ " + valoro.map(v => skribiValoron(v)).join(", ") + " ]";
  const objekto = valoro as Record<string, unknown>;
  const eroj: string[] = [];
  for ( const k in objekto ) {
    if ( objekto[k] === undefined ) continue;
    eroj.push(JSON.stringify(k) + ": " + skribiValoron(objekto[k]));
  }
  return "{ " + eroj.join(", ") + " }";
}
// parziValoron គឺកម្មវិធីញែកកន្សោមតូចសម្រាប់ទិន្នន័យរបស់ឧបករណ៍ឆ្លាក់។
// ការរក្សាទុកសរសេរលេខជាគោលប្រាំបី ( 0o300 ) និងការបង្វិលជា
// ប្រភាគ π ពិត ( Math.PI / 2, 3 * Math.PI / 4 ) ដែល JSON.parse
// មិនអាចអានបាន ដូច្នេះការផ្ទុកឯកសារប្រើកម្មវិធីញែកនេះ។
// ( JSON ផ្ទាល់ក៏អាចញែកបាន ព្រោះវាជាផ្នែករងនៃវេយ្យាករណ៍ )។
/* កម្មវិធីញែកកន្សោមតូចសម្រាប់ទិន្នន័យរបស់ឧបករណ៍ឆ្លាក់។
    @param teksto ( string ) - កន្សោម ( ខ្លឹមសារដើមនៃឯកសារ )។
@returns តម្លៃដែលបានញែក ( any ) ព្រោះលទ្ធផលជាទិន្នន័យឌីណាមិក។ */
export function parziValoron(teksto: string): any {
  let i = 0;
  const sp = () => { while ( i < teksto.length && /\s/.test(teksto[i]) ) i++; };
  const eraro = (): never => { throw new Error("Ne-analizebla esprimo ĉe " + i + ": " + teksto.slice(i, i + 0o40)); };
  function nombro(): number {
    sp();
    const m = teksto.slice(i).match(/^-?0o[0-7]+(?:\/0o[0-7]+)?|^-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/);
    if ( !m ) return eraro();
    i += m[0].length;
    const s = m[0];
    if ( /^0o/.test(s) ) {
      const neg = s.startsWith("-");
      const kerno = neg ? s.slice(1) : s;
      const partoj = kerno.split("/");
      let v = parseInt(partoj[0].slice(2), 8);
      if ( partoj.length > 1 ) v = v / parseInt(partoj[1].slice(2), 8);
      return neg ? -v : v;
    }
    return parseFloat(s);
  }
  function faktoro(): number {
    sp();
    const c = teksto[i];
    if ( c === "-" ) { i++; return -faktoro(); }
    if ( c === "(" ) { i++; const v = adicio(); sp(); if ( teksto[i] !== ")" ) eraro(); i++; return v; }
    if ( teksto.startsWith("Math.PI", i) ) { i += "Math.PI".length; return Math.PI; }
    return nombro();
  }
  function termo(): number {
    let v = faktoro();
    for ( ;; ) {
      sp();
      const c = teksto[i];
      if ( c === "*" ) { i++; v = v * faktoro(); }
      else if ( c === "/" ) { i++; v = v / faktoro(); }
      else return v;
    }
  }
  function adicio(): number {
    let v = termo();
    for ( ;; ) {
      sp();
      const c = teksto[i];
      if ( c === "+" ) { i++; v = v + termo(); }
      else if ( c === "-" ) { i++; v = v - termo(); }
      else return v;
    }
  }
  function stringo(): string {
    sp();
    if ( teksto[i] !== "\"" ) eraro();
    let s = "";
    i++;
    for ( ;; ) {
      if ( i >= teksto.length ) eraro();
      const c = teksto[i];
      if ( c === "\"" ) { i++; return s; }
      if ( c === "\\" ) {
        const n = teksto[i + 1];
        if ( n === undefined ) eraro();
        if ( n === "n" ) s += "\n";
        else if ( n === "t" ) s += "\t";
        else if ( n === "r" ) s += "\r";
        else if ( n === "b" ) s += "\b";
        else if ( n === "f" ) s += "\f";
        else if ( n === "u" ) { s += String.fromCharCode(parseInt(teksto.slice(i + 2, i + 6), 16)); i += 4; }
        else s += n;
        i += 2;
      } else { s += c; i++; }
    }
  }
  function valoro(): unknown {
    sp();
    const c = teksto[i];
    if ( c === "{" ) {
      i++;
      const o: Record<string, unknown> = {};
      sp();
      if ( teksto[i] === "}" ) { i++; return o; }
      for ( ;; ) {
        sp();
        // ក្បៀសបន្ទាប់ ( { ... , } ) គឺសញ្ញាបិទបញ្ចប់វត្ថុ។
        if ( teksto[i] === "}" ) { i++; return o; }
        const k = stringo();
        sp();
        if ( teksto[i] !== ":" ) eraro();
        i++;
        o[k] = valoro();
        sp();
        const d = teksto[i];
        if ( d === "," ) { i++; continue; }
        if ( d === "}" ) { i++; return o; }
        eraro();
      }
    }
    if ( c === "[" ) {
      i++;
      const a: unknown[] = [];
      sp();
      if ( teksto[i] === "]" ) { i++; return a; }
      for ( ;; ) {
        sp();
        // ក្បៀសបន្ទាប់ ( [ ... , ] ) គឺសញ្ញាបិទបញ្ចប់អារេ។
        if ( teksto[i] === "]" ) { i++; return a; }
        a.push(valoro());
        sp();
        const d = teksto[i];
        if ( d === "," ) { i++; continue; }
        if ( d === "]" ) { i++; return a; }
        eraro();
      }
    }
    if ( c === "\"" ) return stringo();
    if ( teksto.startsWith("true", i) ) { i += 4; return true; }
    if ( teksto.startsWith("false", i) ) { i += 5; return false; }
    if ( teksto.startsWith("null", i) ) { i += 4; return null; }
    return adicio();
  }
  sp();
  const v = valoro();
  sp();
  if ( i !== teksto.length ) eraro();
  return v;
}
export function bazo64DeBajtoj(bajtoj: Uint8Array): string {
  // ប្លុកជាពហុគុណនៃ 3 ( 0o30000 = 12288 ) ដើម្បីឱ្យ btoa មិនបញ្ចូល
  // សញ្ញាបំពេញ ( "=" ) នៅកណ្តាល ព្រោះវានឹងធ្វើឱ្យខ្សែអក្សរទាំងមូលខូច។
  let teksto = "";
  const bloko = 0o30000;
  for ( let i = 0; i < bajtoj.length; i += bloko ) {
    teksto += btoa(String.fromCharCode(...bajtoj.subarray(i, i + bloko)));
  }
  return teksto;
}
export function bazo64DeInt16(valoroj: Int16Array): string {
  const bajtoj = new Uint8Array(valoroj.length * 2);
  const vido = new DataView(bajtoj.buffer);
  for ( let i = 0; i < valoroj.length; i++ ) vido.setInt16(i * 2, valoroj[i], true);
  return bazo64DeBajtoj(bajtoj);
}
export function bazo64DeMasko(maskoDatumoj: Uint8Array): string {
  const bajtoj = new Uint8Array(Math.ceil(maskoDatumoj.length / 8));
  for ( let i = 0; i < maskoDatumoj.length; i++ ) if ( maskoDatumoj[i] ) bajtoj[i >> 3] |= 1 << ( i & 7 );
  return bazo64DeBajtoj(bajtoj);
}
export function bazo64DeBiomoj(biomoDatumoj: Uint8Array): string {
  // 3 ប៊ីតក្នុងមួយក្រឡា ( 0=ស្វ័យប្រវត្តិ, 1=ភ្នំ, 2=ជ្រលង, 3=វាលរាប,
  // 4=រុក្ខជាតិទឹក, 5=ekvizeto ) គឺប្រាំបីក្រឡាក្នុងបីបៃ។
  const bajtoj = new Uint8Array(Math.ceil(( biomoDatumoj.length * 3 ) / 8));
  for ( let i = 0; i < biomoDatumoj.length; i++ ) {
    const b = i * 3;
    bajtoj[b >> 3] |= ( biomoDatumoj[i] & 7 ) << ( b & 7 );
    if ( ( b & 7 ) > 5 ) bajtoj[( b >> 3 ) + 1] |= ( biomoDatumoj[i] & 7 ) >> (8 - ( b & 7 ));
  }
  return bazo64DeBajtoj(bajtoj);
}
export function bazo64DeBestoj(bestoDatumoj: Uint8Array): string {
  // 3 ប៊ីតក្នុងមួយក្រឡា ( ប៊ីត 1=សត្វទឹក, 2=បក្សីព្រិល, 4=NPC ) គឺប្រាំបី
  // ក្រឡាក្នុងបីបៃ។
  const bajtoj = new Uint8Array(Math.ceil(bestoDatumoj.length * 3 / 8));
  for ( let i = 0; i < bestoDatumoj.length; i++ ) {
    const b = i * 3;
    const v = bestoDatumoj[i] & 7;
    bajtoj[b >> 3] |= v << ( b & 7 );
    if ( ( b & 7 ) > 5 ) bajtoj[( b >> 3 ) + 1] |= v >> (8 - ( b & 7 ));
  }
  return bazo64DeBajtoj(bajtoj);
}
// kvantigiDeltojn គឺការបរិមាណរួម ( ភាពជាក់លាក់ 1/16 ឯកតា កំណត់ក្នុង
// ដែន int16 ) សម្រាប់ទាំងការសរសេរ និងការត្រួតពិនិត្យខ្លួនឯង ដើម្បីឱ្យទាំងពីរត្រូវគ្នាជានិច្ច។
export function kvantigiDeltojn(): Int16Array {
  const kvantigita = new Int16Array(N * N);
  for ( let i = 0; i < deltoj.length; i++ ) {
    kvantigita[i] = Math.max(-32767, Math.min(32767, Math.round(deltoj[i] * 16)));
  }
  return kvantigita;
}
// cirkuloValidas គឺការត្រួតពិនិត្យខ្លួនឯងមុនការសរសេរ។ វាកូដទិន្នន័យដោយអនុគមន៍
// ដូចការរក្សាទុក ហើយឌីកូដវាម្តងទៀត ដោយប្រៀបធៀបនឹងដើម។
// នេះចាប់បានរាល់ការខូចក្នុងការកូដ ( ឧទាហរណ៍ ប្លុកកាត់ លំដាប់
// បៃខុស ) មុនពេលវាឈានដល់ឯកសារ។
export function cirkuloValidas(): boolean {
  try {
    const kvantigita = kvantigiDeltojn();
    const d = dekodiInt16(bazo64DeInt16(kvantigita));
    const m = dekodiMaskon(bazo64DeMasko(masko), N * N);
    const b = dekodiBiomon(bazo64DeBiomoj(biomoj), N * N);
    const be = dekodiBestojn(bazo64DeBestoj(bestoj), N * N);
    if ( !d || !m || !b || !be || d.length !== kvantigita.length ) return false;
    for ( let i = 0; i < kvantigita.length; i++ ) {
      if ( d[i] !== kvantigita[i] ) return false;
    }
    for ( let i = 0; i < masko.length; i++ ) {
      if ( m[i] !== masko[i] ) return false;
    }
    for ( let i = 0; i < biomoj.length; i++ ) {
      if ( b[i] !== biomoj[i] ) return false;
    }
    for ( let i = 0; i < bestoj.length; i++ ) {
      if ( be[i] !== bestoj[i] ) return false;
    }
    return true;
  } catch { return false; }
}
// cirkuloDeDatumojValidas គឺការត្រួតពិនិត្យខ្លួនឯងដូចគ្នាសម្រាប់វត្ថុ ទីក្រុង និង
// ផ្លូវ កំពង់។ ការធ្វើសេរៀល ( skribiValoron ) និងការញែកឡើងវិញ ( parziValoron )
// ត្រូវតែត្រឡប់ទិន្នន័យដូចគ្នា បើមិនដូច្នេះការរក្សាទុកនឹងសរសេរឯកសារខូច។
export function cirkuloDeDatumojValidas(): boolean {
  try {
    return JSON.stringify(parziValoron(skribiValoron(objektoj))) === JSON.stringify(objektoj)
      && JSON.stringify(parziValoron(skribiValoron(fontoj))) === JSON.stringify(fontoj)
      && JSON.stringify(parziValoron(skribiValoron(urboj))) === JSON.stringify(urboj)
      && JSON.stringify(parziValoron(skribiValoron(vojoj))) === JSON.stringify(vojoj)
      && JSON.stringify(parziValoron(skribiValoron(dokoj))) === JSON.stringify(dokoj);
  } catch { return false; }
}
// ចំណងជើងឯកសារ គឺឯកសារទិន្នន័យនីមួយៗចាប់ផ្តើមដោយសញ្ញារបស់វា ដែល
// ម៉ាស៊ីនមេរក្សាទុកពិនិត្យ ( ដូច្នេះគ្មានខ្លឹមសារបរទេសត្រូវសរសេរចូល kantaoj/ )។
// rultempo.ts លែងត្រូវសរសេរដោយការរក្សាទុកទៀតទេ ព្រោះវាជាម៉ូឌុលរួមដែល
// អនុគមន៍របស់វាត្រូវបាននាំចូលដោយឧបករណ៍ឆ្លាក់ ( សូមមើលការនាំចូល tero-datumaro/rultempo )។
// ⟪ ផែនទីទាំងឡាយ 📃 ⟫ គឺផែនទីនីមួយៗមានឯកសារទិន្នន័យប្រាំពីររបស់វានៅក្នុងថត
// ផ្ទាល់ខ្លួន ( tero-datumaro/<kodo>/ )។ សញ្ញារបស់ឯកសារនៅដដែល រីឯម៉ាស៊ីនមេ
// រក្សាទុកពិនិត្យសញ្ញារបស់ឯកសារនីមួយៗដែលត្រូវសរសេរ ដូច្នេះ
// ឈ្មោះថតអាចជាផែនទីណាមួយក្នុងបញ្ជី។
export const DATUMDOSIEROJ = [ "krado", "akvo", "akvofontoj", "biomoj", "bestoj", "objektoj", "urboj", "vojoj" ];
// dosierujo គឺថតរបស់ផែនទីក្នុង kantaoj/ ( បញ្ចប់ដោយ "/" ជានិច្ច )។
export function dosierujo(kodo: string): string { return "tero-datumaro/" + kodo + "/"; }
export const mapoDosierujo = dosierujo(mapoDatumo.kodo);
export const DOSIERA_TITOLO = {
  [mapoDosierujo + "krado.ts"]: "// ≺⧼ Skulptita krado 📃 ⧽≻",
  [mapoDosierujo + "akvo.ts"]: "// ≺⧼ Skulptita akvo 📃 ⧽≻",
  [mapoDosierujo + "akvofontoj.ts"]: "// ≺⧼ Skulptitaj akvofontoj",
  [mapoDosierujo + "biomoj.ts"]: "// ≺⧼ Skulptitaj biomoj 📃 ⧽≻",
  [mapoDosierujo + "bestoj.ts"]: "// ≺⧼ Skulptitaj bestoj 📃 ⧽≻",
  [mapoDosierujo + "objektoj.ts"]: "// ≺⧼ Skulptitaj objektoj 📃 ⧽≻",
  [mapoDosierujo + "urboj.ts"]: "// ≺⧼ Skulptitaj urboj 📃 ⧽≻",
  [mapoDosierujo + "vojoj.ts"]: "// ≺⧼ Skulptitaj vojoj 📃 ⧽≻",
  "tero-datumaro/mapoj.ts": "// ≺⧼ Mapoj 🗺️ ⧽≻",
  "tero-datumaro/aktiva.ts": "// ≺⧼ Aktiva mapo 📃 ⧽≻",
};
// ទិន្នន័យរស់នៅក្នុងឯកសារផ្ទាល់ខ្លួន ( សំណាញ់ ទឹក តំបន់ជីវៈ សត្វ
// វត្ថុ ទីក្រុង និងផ្លូវ កំពង់ ដោយឡែក ) ដូច្នេះការរក្សាទុកបង្កើតផែនទី
// ឯកសារទាំងមូលក្នុង kantaoj/tero-datumaro/ ( rultempo.ts លែងត្រូវសរសេរទៀតទេ )។
export function generiDosierojn(kodo: string = mapoDatumo.kodo): Record<string, string> {
  const dosierujoDeMapo = dosierujo(kodo);
  sinkronigiSuperojn();   // ស្រទាប់ក្រឡាផ្ទាល់ទៅទិន្នន័យទីក្រុង មុនការសរសេរ
  const kvantigita = kvantigiDeltojn();
  // ទង់សកម្មដោយឡែក ព្រោះការផ្លាស់ប្តូរតែទឹកមិនគួរធ្វើឱ្យឯកសារហើម
  // ដោយដេលតាសូន្យ 32 KB ហើយផ្ទុយមកវិញក៏ដូចគ្នា។
  let deltojAktivaj = false, maskoAktiva = false, biomojAktivaj = false, bestojAktivaj = false;
  for ( let i = 0; i < kvantigita.length; i++ ) if ( kvantigita[i] !== 0 ) { deltojAktivaj = true; break; }
  for ( let i = 0; i < masko.length; i++ ) if ( masko[i] ) { maskoAktiva = true; break; }
  for ( let i = 0; i < biomoj.length; i++ ) if ( biomoj[i] ) { biomojAktivaj = true; break; }
  for ( let i = 0; i < bestoj.length; i++ ) if ( bestoj[i] ) { bestojAktivaj = true; break; }
  const delta64 = deltojAktivaj ? bazo64DeInt16(kvantigita) : "";
  const masko64 = maskoAktiva ? bazo64DeMasko(masko) : "";
  const biomo64 = biomojAktivaj ? bazo64DeBiomoj(biomoj) : "";
  const besto64 = bestojAktivaj ? bazo64DeBestoj(bestoj) : "";
  const aktiva = deltojAktivaj || maskoAktiva || biomojAktivaj || bestojAktivaj;
  const komunajKom = [
    "// Kreita de la terena skulptilo ( iloj/tero-skulptilo/tero-skulptilo.html ).",
    "// ( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) - Ne redaktu mane. La skulptilo reskribas la dosieron.",
  ];
  const kradoTeksto = [
    "// ≺⧼ Skulptita krado 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ La skulpta krado 📃 ⟩ — la paŝo, grandeco, origino, aktiva-flago kaj la deltoj.",
    "export const SKULPTA_PASO = " + oktala(PASO) + ";",
    "export const SKULPTA_N = " + oktala(N) + ";",
    "export const SKULPTA_ORIGINO = [ " + oktala(X0) + ", " + oktala(Z0) + " ];",
    "export const SKULPTA_AKTIVA = " + ( aktiva ? "true" : "false" ) + ";",
    "export const SKULPTA_DELTAJ = " + JSON.stringify(delta64) + ";",
  ].join("\n");
  const akvoTeksto = [
    "// ≺⧼ Skulptita akvo 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ La akva tavolo 📃 ⟩ — la nivelo de la basenoj kaj la MALNOVA pentrita",
    "// akva masko ( nun nur la basenaj semoj — la akvo mem estas DERIVITA de la",
    "// fontoj per kantaoj/mondo/akvokalkulo.ts ).",
    "export const SKULPTA_AKVA_NIVELO = " + oktala(akvaNiveloValoro) + ";",
    "export const SKULPTA_AKVA_MASKO = " + JSON.stringify(masko64) + ";",
  ].join("\n");
  // ប្រភពទឹក គឺការបញ្ចូលទឹក ព្រោះទន្លេហូរចេញពីពួកវា រណ្តៅ
  // ពេញ ហើយប្រឡាយត្រូវបានកាត់។ ប្រភពនីមួយៗមាន x, z និងលំហូរ។
  const fontoTeksto = [
    "// ≺⧼ Skulptitaj akvofontoj 🌊 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ La akvofontoj 📃 ⟩ — la fontoj de la akvo. La akvo ne plu pentrigxas:",
    "// gxi fluas de cxi tiuj punktoj malsupren laux la tereno ( kantaoj/mondo/akvokalkulo.ts ),",
    "// plenigante la kavojn kaj eltrancxante la kanalojn. Cxiu fonto - x, z ( mondaj",
    "// unuoj ) kaj fluo ( pli granda fluo = pli profunda kaj pli larghxa rivero ).",
    "export const SKULPTA_AKVOFONTOJ = " + skribiValoron(fontoj) + ";",
  ].join("\n");
  const biomoDosiero = [
    "// ≺⧼ Skulptitaj biomoj 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ La biomo-tavolo 📃 ⟩ ( 0=aŭtomata, 1=montaro, 2=valo, 3=ebenaĵo,",
    "// 4=akvaj-plantoj, 5=ekvizeto ).",
    "export const SKULPTA_BIOMOJ = " + JSON.stringify(biomo64) + ";",
  ].join("\n");
  const bestoDosiero = [
    "// ≺⧼ Skulptitaj bestoj 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ La besta-tavolo 📃 ⟩ ( bitoj 1=akvaj bestoj, 2=petreloj, 4=NPC-oj ).",
    "export const SKULPTA_BESTOJ = " + JSON.stringify(besto64) + ";",
  ].join("\n");
  // វត្ថុដែលបានដាក់ ជាមួយរចនាប័ទ្មលេខដូចទិន្នន័យផ្សេងទៀត។
  const objektoTeksto = [
    "// ≺⧼ Skulptitaj objektoj 📃 ⧽≻",
    ...komunajKom,
    "// La metitaj objektoj de la objekta ilo de la terena skulptilo — la kanuoj",
    "// 🛶, la spacosxipo 🚀, la lampoj 🏮, la keuxfhxesoj ⭐ kaj la individuaj",
    "// konstruajxoj 🏛️ estas ankaŭ objektoj. Malplena = neniu objekto.",
    "// Cxiu objekto - x, z ( 0.25-algluita ), speco ( betulo | lariko | hxsxaksxlefo",
    "// | pussxlefo | roko | filiko | akvabesto | petrelo | npco | sanktejo | turo",
    "// | domo | mangxejo | kasafeo | stacio | hxeuxfo | hxeuxfoPlato | keuxfhxeso | kanuo | spacosxipo ),",
    "// skalo, rotacio, bestospeco, radio, vesto, harstilo, filikaSpeco, stilo.",
    "export const SKULPTA_OBJEKTOJ = " + skribiValoron(objektoj) + ";",
  ].join("\n");
  const urboTeksto = [
    "// ≺⧼ Skulptitaj urboj 📃 ⧽≻",
    ...komunajKom,
    "// La urboj de la mondo — la kradaj arangxoj kaj ofsetoj redaktataj per la",
    "// Krado-langeto. La unua urbo estas la cefa. Cxiu urbo - nomo, arangxaGrando,",
    "// blokaGrando ( unu | kvar ), ofsX, ofsZ, keuxfhxeso ( la kvar anguloj ĉirkaŭ",
    "// la centro ), lampoj ( la kvar-lampa strato-ŝablono ), superoj ( la manaj",
    "// ĉel-superoj — \"c,r\" kaj \"c,r,SUB\" → tipo ) kaj aldonajBlokoj",
    "// ( x, z, tipo, rot, sub, stacia, konektita ).",
    "export const SKULPTA_URBOJ = " + skribiValoron(urboj) + ";",
  ].join("\n");
  const vojoTeksto = [
    "// ≺⧼ Skulptitaj vojoj 📃 ⧽≻",
    ...komunajKom,
    "// La mond-nivelaj vojoj ( la kajo, la avenuo ) kiel polilinioj kun nomo kaj",
    "// larĝo, kaj la dokaj platformoj kun pozicio kaj profundo — redaktataj per",
    "// la Vojoj sub-langeto de la terena skulptilo.",
    "export const SKULPTA_VOJOJ = " + skribiValoron(vojoj) + ";",
    "export const SKULPTA_DOKOJ = " + skribiValoron(dokoj) + ";",
  ].join("\n");
  // ⟪ បញ្ជីផែនទី និងទ្វារ 📃 ⟫ គឺ mapoj.ts កាន់បញ្ជីផែនទី
  // ( ជាមួយរូបរាងរបស់ផែនទីនីមួយៗ ) ហើយ aktiva.ts នាំចេញឡើងវិញនូវទិន្នន័យរបស់
  // ផែនទីសកម្មសម្រាប់ហ្គេម។ ទាំងពីរត្រូវសរសេរឡើងវិញរាល់ការរក្សាទុក ដូច្នេះការជ្រើសផែនទី
  // សកម្មផ្សេង ឬការផ្លាស់ប្តូររូបរាងគឺគ្រប់គ្រាន់ ( ព្រោះហ្គេមអានទ្វារនោះ )។
  const mapoNuna = mapojRegistroj.find(m => m.kodo === mapoDatumo.kodo);
  if ( mapoNuna ) { mapoNuna.formo = mapoFormo; mapoNuna.grandeco = mapoGrandeco; }
  const mapojTeksto = [
    "// ≺⧼ Mapoj 🗺️ ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ La mapoj de la mondo 📃 ⟩ — ĉiu mapo estas SENDEPENDA mondo kun siaj propraj",
    "// datumoj ( kantaoj/tero-datumaro/<kodo>/ — la krado, la akvo, la biomoj, la bestoj,",
    "// la metitaj objektoj, la urboj kaj la vojoj/dokoj ). La terena skulptilo",
    "// elektas la mapon, redaktas ĝin kaj skribas la datumojn de tiu mapo; la ludo",
    "// legas la mapon markitan per aktiva ( tra la pordo aktiva.ts ).",
    "//",
    "// formo — la formo de la tereno ( eskekoj/komunajxoj/mapformo.ts ): la cirklo ( la",
    "// defaŭlto ), la rondigita kvadrato aŭ la rondigita triangulo.",
    "// grandeco — la duon-grando de la formo en mondo-unuoj: la radiuso de la cirklo,",
    "// la duon-larĝo de la kvadrato aŭ la cirkumradiuso de la triangulo.",
    "//",
    "// La tipo kaj la helpiloj loĝas en kantaoj/tero-datumaro/mapregulo.ts.",
    "import type { MapoDatumo } from \"./mapregulo.js\";",
    "",
    "export const MAPOJ: MapoDatumo[] = [",
    ...mapojRegistroj.map(m => "  { kodo: " + JSON.stringify(m.kodo) + ", nomo: " + JSON.stringify(m.nomo)
      + ", aktiva: " + ( m.aktiva ? "true" : "false" ) + ", formo: " + JSON.stringify(m.formo)
      + ", grandeco: " + oktala(m.grandeco) + " },"),
    "];",
  ].join("\n");
  const aktivaKodo = ( mapojRegistroj.find(m => m.aktiva) ?? mapojRegistroj[0] ).kodo;
  const aktivaTeksto = [
    "// ≺⧼ Aktiva mapo 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ La datumoj de la aktiva mapo 📃 ⟩ — la pordo al la datumoj de la mapo, kiun",
    "// la ludo legas. La mapoj estas SENDEPENDAJ mondoj ( mapoj.ts ); ĉi tiu dosiero",
    "// re-eksportas la sep datumdosierojn de UNU el ili, do la tuta ludo importas unu",
    "// konatan pordon ( tereno.ts, urbo.ts, ... ) kaj neniam dosierujon. La skulptilo",
    "// reskribas ĝin kiam ĝi ŝanĝas la aktivan mapon.",
    ...DATUMDOSIEROJ.map(d => "export * from \"./" + aktivaKodo + "/" + d + ".js\";"),
  ].join("\n");
  return {
    [dosierujoDeMapo + "krado.ts"]: kradoTeksto,
    [dosierujoDeMapo + "akvo.ts"]: akvoTeksto,
    [dosierujoDeMapo + "akvofontoj.ts"]: fontoTeksto,
    [dosierujoDeMapo + "biomoj.ts"]: biomoDosiero,
    [dosierujoDeMapo + "bestoj.ts"]: bestoDosiero,
    [dosierujoDeMapo + "objektoj.ts"]: objektoTeksto,
    [dosierujoDeMapo + "urboj.ts"]: urboTeksto,
    [dosierujoDeMapo + "vojoj.ts"]: vojoTeksto,
    "tero-datumaro/mapoj.ts": mapojTeksto,
    "tero-datumaro/aktiva.ts": aktivaTeksto,
  };
}
// sxargiDatumaronElMapo គឺផ្ទុកទិន្នន័យពីផែនទីឯកសារ
// ( { nomo. teksto } គឺឯកសារដែលបានបង្កើត ឬឯកសារមួយដែលបានជ្រើស )។ ថេរនីមួយៗ
// ត្រូវបានរកនៅក្នុងឯកសារទាំងអស់ដែលបានផ្តល់ ដូច្នេះទម្រង់ចាស់ដែលមានតែ
// ឯកសារមួយ ( ថេរទាំងអស់ក្នុង tero-datumo.ts ) នៅតែផ្ទុកបាន។
export function sxargiDatumaronElMapo(dosieroj: Record<string, string>): boolean {
  const preni = ( nomo: string ): string | null => {
    const ankro = "export const " + nomo + " = ";
    for ( const t of Object.values(dosieroj) ) {
      const i = t.indexOf(ankro);
      if ( i < 0 ) continue;
      const resto = t.slice(i + ankro.length);
      const e = resto.indexOf(";");
      if ( e < 0 ) continue;
      return resto.slice(0, e).trim();
    }
    return null;
  };
  const oktalaNombro = ( s: string | null ): number | null => {
    if ( s === null ) return null;
    const negativa = s.startsWith("-");
    const kerno = negativa ? s.slice(1) : s;
    const partoj = kerno.split("/");
    const numeratoro = parseInt(partoj[0].replace(/^0o/, ""), 8);
    const denominatoro = partoj.length > 1 ? parseInt(partoj[1].replace(/^0o/, ""), 8) : 1;
    const valoro = numeratoro / denominatoro;
    return negativa ? -valoro : valoro;
  };
  if ( oktalaNombro(preni("SKULPTA_PASO")) !== PASO || oktalaNombro(preni("SKULPTA_N")) !== N ) return false;
  const origino = preni("SKULPTA_ORIGINO");
  if ( origino ) {
    const eroj = origino.replace(/[\[\]]/g, "").split(",");
    if ( eroj.length !== 2
      || oktalaNombro(eroj[0].trim())!== X0
      || oktalaNombro(eroj[1].trim())!== Z0 ) return false;
  }
  const nivelo2 = oktalaNombro(preni("SKULPTA_AKVA_NIVELO"));
  const malpaku = ( s: string | null ): string | null => ( s === null ? null : s.replace(/^"|"$/g, "") );
  // ស្រទាប់នីមួយៗផ្ទុកតែពេលសោរបស់វាមានក្នុងឯកសារដែល
  // បានផ្តល់ ដូច្នេះការផ្ទុកឯកសារស្រទាប់មួយ ( ឧទាហរណ៍ biomoj.ts ) លែង
  // លុបស្រទាប់ផ្សេង វត្ថុ ឬទីក្រុងទៀតទេ។
  const deltaKruda = malpaku(preni("SKULPTA_DELTAJ"));
  if ( deltaKruda !== null ) {
    deltoj.fill(0);
    const d = dekodiInt16(deltaKruda);
    if ( d ) for ( let i = 0; i < deltoj.length && i < d.length; i++ ) deltoj[i] = d[i] / 16;
  }
  const maskoKruda = malpaku(preni("SKULPTA_AKVA_MASKO"));
  if ( maskoKruda !== null ) {
    masko.fill(0);
    const m = dekodiMaskon(maskoKruda, N * N);
    if ( m ) masko.set(m);
  }
  const biomoKruda = malpaku(preni("SKULPTA_BIOMOJ"));
  if ( biomoKruda !== null ) {
    biomoj.fill(0);
    const b = dekodiBiomon(biomoKruda, N * N);
    if ( b ) biomoj.set(b);
  }
  const bestoKruda = malpaku(preni("SKULPTA_BESTOJ"));
  if ( bestoKruda !== null ) {
    bestoj.fill(0);
    const be = dekodiBestojn(bestoKruda, N * N);
    if ( be ) bestoj.set(be);
  }
  // ប្រភពទឹក គឺទឹកខ្លួនឯងជាដេរីវេ ( ព្រោះប្រភពជាការបញ្ចូល )។
  const fon = preni("SKULPTA_AKVOFONTOJ");
  if ( fon !== null ) {
    try {
      const parzitaj = parziValoron(fon);
      if ( Array.isArray(parzitaj) ) agordiFontojn(parzitaj.map(f => ( {
        x: Number(f && f.x) || 0,
        z: Number(f && f.z) || 0,
        fluo: Math.max(0, Number(f && f.fluo) || 0),
      } )));
    } catch { }
    agordiElektitanFonton(-1);
    agordiFontoTrenatan(-1);
    gxisdatigiAkvajnStatistikojn();
  }
  const oj = preni("SKULPTA_OBJEKTOJ");
  if ( oj !== null ) {
    try { agordiObjektojn(parziValoron(oj) ?? []); } catch { }
    agordiElektitanObjekton(-1);
    gxisdatigiObjektoListon();
    rekonstruiObjektojn();
  }
  const voj = preni("SKULPTA_VOJOJ");
  const dok = preni("SKULPTA_DOKOJ");
  const uj = preni("SKULPTA_URBOJ");
  try {
    const parzitaj = uj !== null ? parziValoron(uj) : null;
    if ( parzitaj && Array.isArray(parzitaj) && parzitaj.length ) agordiUrbojn(parzitaj.map(u => ( {
      nomo: String(u && u.nomo !== undefined ? u.nomo : "Urbo"),
      arangxaGrando: Number(u && u.arangxaGrando) || 1,
      blokaGrando: u && u.blokaGrando === "kvar" ? "kvar" : "unu",
      ofsX: Number(u && u.ofsX) || 0,
      ofsZ: Number(u && u.ofsZ) || 0,
      keuxfhxeso: !!( u && u.keuxfhxeso ),
      lampoj: !( u && u.lampoj === false ),
      superoj: u && u.superoj && typeof u.superoj === "object" && !Array.isArray(u.superoj) ? { ...u.superoj } : undefined,
      aldonajBlokoj: Array.isArray(u && u.aldonajBlokoj) ? u.aldonajBlokoj.map(( b: any ) => ( {
        x: Number(b && b.x) || 0,
        z: Number(b && b.z) || 0,
        tipo: b && typeof b.tipo === "string" ? b.tipo : "sanktejo",
        rot: Number(b && b.rot) || 0,
        sub: b && typeof b.sub === "string" ? b.sub : "centro",
        stacia: !!( b && b.stacia ),
        konektita: !!( b && b.konektita ),
      } )) : [],
    } )));
  } catch { }
  if ( !urboj.length ) agordiUrbojn([ { nomo: "Ĉefa", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ]);
  agordiElektitanUrbon(Math.max(0, Math.min(elektitaUrbo, urboj.length - 1)));
  elektiUrbon(elektitaUrbo);
  // ផ្លូវ កំពង់ និងយានអវកាស គឺលក្ខណៈកម្រិតពិភពលោករបស់ទីក្រុងមេ។
  try {
    const parzV = voj ? parziValoron(voj) : null;
    if ( parzV && Array.isArray(parzV) ) agordiVojojn(parzV.map(( v: any ) => ( { ...v, punktoj: v.punktoj.map(( p: any ) => [ p[0], p[1] ] as VojaPunkto) } )));
  } catch { }
  try {
    const parz = dok ? parziValoron(dok) : null;
    if ( parz && Array.isArray(parz) ) agordiDokojn(parz.map(d => ( { ...d } )));
  } catch { }
  gxisdatigiVojajnRegilojn();
  if ( nivelo2 !== null ) {
    agordiAkvanNivelon(nivelo2);
    niveloRegilo.value = String(akvaNiveloValoro);
  }
  gxisdatigiValorojn();
  historio.length = 0;
  refaraHistorio.length = 0;
  // ទឹក គឺប្រភពដែលបានផ្ទុក និងកម្រិតដែលគណនាទឹកឡើងវិញ ( ការគណនា
  // ខ្លួនឯងគូរផែនទី 2D និងទិដ្ឋភាព 3D ឡើងវិញ )។
  markiAkvonMalpuran();
  rekalkuliAkvon();
  return true;
}
export function sxargiDatumaronElKodo(): void {
  const d = dekodiInt16(SKULPTA_DELTAJ);
  if ( d ) for ( let i = 0; i < deltoj.length && i < d.length; i++ ) deltoj[i] = d[i] / 16;
  const m = dekodiMaskon(SKULPTA_AKVA_MASKO, N * N);
  if ( m ) masko.set(m);
  const b = dekodiBiomon(SKULPTA_BIOMOJ, N * N);
  if ( b ) biomoj.set(b);
  const be = dekodiBestojn(SKULPTA_BESTOJ, N * N);
  if ( be ) bestoj.set(be);
  // ប្រភពទឹករបស់ផែនទីសកម្ម ( ព្រោះផែនទីចាស់គ្មានឯកសារនោះ )។
  try {
    agordiFontojn(Array.isArray(SKULPTA_AKVOFONTOJ) ? SKULPTA_AKVOFONTOJ.map(f => ( { ...f } )) : []);
  } catch { agordiFontojn([]); }
  agordiObjektojn(SKULPTA_OBJEKTOJ.map(o => ( { ...o } )));
  agordiElektitanObjekton(-1);
  gxisdatigiObjektoListon();
  rekonstruiObjektojn();
  // ទីក្រុង គឺការតំរង់សំណាញ់ និងអុហ្វសិតរបស់ SKULPTA_URBOJ។ តម្លៃលំនាំដើម
  // ជាទីក្រុងមេ បើបញ្ជីបាត់ ឬទទេ។
  try {
    agordiUrbojn(Array.isArray(SKULPTA_URBOJ) ? SKULPTA_URBOJ.map(u => ( { ...u } )) : []);
  } catch { agordiUrbojn([]); }
  if ( !urboj.length ) agordiUrbojn([ { nomo: "Ĉefa", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ]);
  agordiElektitanUrbon(0);
  elektiUrbon(0);
  // ផ្លូវ កំពង់ និងយានអវកាស គឺលក្ខណៈកម្រិតពិភពលោករបស់ទីក្រុងមេ។
  try {
    if ( SKULPTA_VOJOJ && Array.isArray(SKULPTA_VOJOJ) ) agordiVojojn(SKULPTA_VOJOJ.map(v => ( { ...v, punktoj: v.punktoj.map(p => [ p[0], p[1] ] as VojaPunkto) } )));
  } catch { }
  try {
    const parz = SKULPTA_DOKOJ;
    if ( parz && Array.isArray(parz) ) agordiDokojn(parz.map(d => ( { ...d } )));
  } catch { }
  gxisdatigiVojajnRegilojn();
}

// ⟪ ចំណុចកាន់ឯកសារ ( File System Access API ) 📃 ⟫ ដែលចងចាំក្នុង IndexedDB
// ដើម្បីឱ្យការរក្សាទុកបន្ទាប់សរសេរដោយផ្ទាល់ដោយគ្មានការជ្រើស។ ទិន្នន័យរស់នៅក្នុង
// ឯកសារបួន ដូច្នេះឈ្មោះនីមួយៗមានចំណុចកាន់ដែលបានចងចាំរបស់វា។
export let dosierajTeniloj: Record<string, FileSystemFileHandle> = {};   // ឈ្មោះ ( "tero-datumaro/krado.ts" ... ) → ចំណុចកាន់
/* បើកឃ្លាំងចំណុចកាន់របស់ IndexedDB ( ដែលចំណុចកាន់ឯកសារត្រូវបានចងចាំ )។
@returns មូលដ្ឋានទិន្នន័យ ( Promise<IDBDatabase> )។ */
export function idbMalfermi(): Promise<IDBDatabase> {
  return new Promise(( solvi, rifuzi ) => {
    const peto = indexedDB.open("tero-skulptilo", 1);
    peto.onupgradeneeded = () => { peto.result.createObjectStore("teniloj"); };
    peto.onsuccess = () => solvi(peto.result);
    peto.onerror = () => rifuzi(peto.error);
  });
}
export async function konserviDosieranTenilon(tenilo: FileSystemFileHandle, nomo: string): Promise<void> {
  try {
    const db = await idbMalfermi();
    await new Promise<void>(( solvi, rifuzi ) => {
      const tx = db.transaction("teniloj", "readwrite");
      tx.objectStore("teniloj").put(tenilo, "dosiero:" + nomo);
      tx.oncomplete = () => solvi();
      tx.onerror = () => rifuzi(tx.error);
    });
  } catch { }
}
export async function sxargiDosierajnTenilojn(): Promise<void> {
  try {
    const db = await idbMalfermi();
    const butiko = db.transaction("teniloj").objectStore("teniloj");
    const klavoj = await new Promise<IDBValidKey[]>(( solvi ) => {
      const peto = butiko.getAllKeys();
      peto.onsuccess = () => solvi(peto.result || []);
      peto.onerror = () => solvi([]);
    });
    for ( const k of klavoj ) {
      const nomo = String(k).replace(/^dosiero:/, "");
      const t = await new Promise<FileSystemFileHandle | null>(( solvi ) => {
        const peto = butiko.get(k);
        peto.onsuccess = () => solvi(peto.result || null);
        peto.onerror = () => solvi(null);
      });
      if ( t ) dosierajTeniloj[nomo] = t;
    }
  } catch { }
}
export async function forgesiDosieranTenilon(nomo: string): Promise<void> {
  delete dosierajTeniloj[nomo];
  try {
    const db = await idbMalfermi();
    await new Promise<void>(( solvi, rifuzi ) => {
      const tx = db.transaction("teniloj", "readwrite");
      tx.objectStore("teniloj").delete("dosiero:" + nomo);
      tx.oncomplete = () => solvi();
      tx.onerror = () => rifuzi(tx.error);
    });
  } catch { }
}
export function elSxuti(teksto: string, nomo: string): void {
  const blobo = new Blob([ teksto ], { type: "text/plain" });
  const url = URL.createObjectURL(blobo);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomo;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0o4000);
}
// skribiPerTenilo គឺព្យាយាមសរសេរទិន្នន័យដោយចំណុចកាន់ដែលបានជ្រើស។ ត្រឡប់
// ថាតើការសរសេរជោគជ័យ ព្រោះការបរាជ័យ ( ឧទាហរណ៍ ឯកសារដែលបានលុប ឬផ្លាស់ទី )
// ត្រូវបានចាត់ចែងដោយ saviDosieron ដែលប្រគល់ការជ្រើសឡើងវិញ ឬទាញយកវា។
export async function skribiPerTenilo(tenilo: FileSystemFileHandle, teksto: string): Promise<boolean> {
  try {
    const skribilo = await tenilo.createWritable();
    await skribilo.write(teksto);
    await skribilo.close();
    markiSavitan();
    statuso("Savite rekte al " + tenilo.name + " ✔️");
    return true;
  } catch { return false; }
}
export async function saviDosieron(): Promise<void> {
  const dosieroj = generiDosierojn();
  // ការត្រួតពិនិត្យខ្លួនឯងមុនការសរសេរ ព្រោះបើការកូដមិនវិលជុំ
  // ( ការឌីកូដអត្ថបទដែលត្រូវរក្សាទុកត្រឡប់ដី ឬទិន្នន័យផ្សេង ) មិនត្រូវសរសេរ
  // ឯកសារខូចឡើយ។
  if ( !cirkuloValidas() || !cirkuloDeDatumojValidas() ){
    statuso("La datumaro ne validas — savo nuligita");
    return;
  }
  const elektilo = window.showSaveFilePicker;
  if ( !elektilo ) {
    // បើគ្មានឧបករណ៍ជ្រើសឯកសារ គឺទាញយកឯកសារទាំងបួន។
    for ( const [ nomo, teksto ] of Object.entries(dosieroj) ) elSxuti(teksto, nomo);
    markiSavitan();
    statuso("Elsxutite. Metu la dosierojn al kantaoj/ kaj reŝargu la ludon");
    return;
  }
  // ឯកសារនីមួយៗមានចំណុចកាន់ដែលបានចងចាំរបស់វា ( ឬការជ្រើសថ្មី )។
  for ( const [ nomo, teksto ] of Object.entries(dosieroj) ) {
    let tenilo: FileSystemFileHandle | null = dosierajTeniloj[nomo] ?? null;
    if ( tenilo && !await skribiPerTenilo(tenilo, teksto) ) {
      statuso("La memorita dosiero ne plu haveblas — elektu denove");
      await forgesiDosieranTenilon(nomo);
      tenilo = null;
    }
    if ( !tenilo ) {
      try {
        tenilo = await elektilo({
          suggestedName: nomo,
          types: [ { description: "TypeScript datumaro", accept: { "text/plain": [ ".ts" ] } } ],
        });
      } catch {
        statuso("La elekto nuligita — ŝanĝoj restas nesavitaj");
        return;
      }
      if ( !await skribiPerTenilo(tenilo, teksto) ) {
        // ទោះបីការជ្រើសថ្មីបរាជ័យ ក៏មិនត្រូវបាត់ទិន្នន័យឡើយ ដូច្នេះវាទាញយកវា។
        elSxuti(teksto, nomo);
        continue;
      }
      dosierajTeniloj[nomo] = tenilo;
      await konserviDosieranTenilon(tenilo, nomo);
    }
  }
}
export async function sargiDosieron(): Promise<void> {
  const elektilo = window.showOpenFilePicker;
  if ( !elektilo ) {
    statuso("La dosier-ŝarĝo bezonas Chromium-on");
    return;
  }
  try {
    const [ tenilo ] = await elektilo({
      types: [ { description: "TypeScript datumaro", accept: { "text/plain": [ ".ts" ] } } ],
      multiple: false,
    });
    const dosiero = await tenilo.getFile();
    const teksto = await dosiero.text();
    if ( sxargiDatumaronElMapo({ [ tenilo.name ]: teksto }) ) {
      // ចងចាំចំណុចកាន់ក្រោមឈ្មោះឯកសារពេញ ( សោដូចគ្នាដែល
      // ការរក្សាទុកប្រើ ) ព្រោះពីមុនឈ្មោះខ្លីមិនដែលត្រូវគ្នា ហើយ
      // ចំណុចកាន់ដែលបានចងចាំមិនដែលត្រូវបានប្រើឡើងវិញ។
      const nomo = Object.keys(DOSIERA_TITOLO).find(n => n.split("/").pop() === tenilo.name) ?? tenilo.name;
      await konserviDosieranTenilon(tenilo, nomo);
      dosierajTeniloj[nomo] = tenilo;
      statuso("Ŝargite el " + tenilo.name + " 📂");
    } else {
      statuso("La dosiero ne estas skulpta datumaro");
    }
  } catch { }
}

// ⟪ ការរក្សាទុកផ្ទាល់ទៅ kantaoj/tero-datumaro 📃 ⟫
// ម៉ាស៊ីនមេរក្សាទុក ( servilo/konservilo.mjs, npm run konservilo ) ទទួល
// ឯកសារដែលបានបង្កើតតាម POST ហើយសរសេរពួកវាផ្ទាល់ទៅ
// kantaoj/tero-datumaro/ ដោយគ្មានឧបករណ៍ជ្រើសឯកសារ និងគ្មានការទាញយក។ បើម៉ាស៊ីនមេមិន
// ដំណើរការ ប៊ូតុងបង្ហាញការណែនាំ ជំនួសការបរាជ័យស្ងាត់។
export const KONSERVILO = "http://127.0.0.1:4173/";
export async function saviRekteAlDosiero(): Promise<void> {
  // គ្មានការផ្លាស់ប្តូរ គឺមិនសរសេរ ( ព្រោះការសរសេរនឹងផ្លាស់ប្តូរពេលកែប្រែ ហើយ
  // បើកហ្គេមឡើងវិញដោយ HMR ដោយគ្មានហេតុ )។
  if ( !cxuSxangxita() ) {
    statuso("Neniu ŝanĝo — la tereno jam estas en la dosieroj ✔️");
    return;
  }
  const dosieroj = generiDosierojn();
  if ( !cirkuloValidas() || !cirkuloDeDatumojValidas() ){
    statuso("La datumaro ne validas — savo nuligita");
    return;
  }
  try {
    const respondo = await fetch(KONSERVILO, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ dosieroj }),
    });
    const mesagxo = await respondo.text();
    if ( respondo.ok ) {
      markiSavitan();
      statuso("Savite rekte al kantaoj/ ✔️ ( " + mesagxo + " )");
    } else {
      statuso("La konservilo rifuzis: " + mesagxo);
    }
  } catch {
    statuso("La konserva servilo ne kuras — kuru: npm run konservilo");
  }
}

// ⟪ ផែនទីទាំងឡាយ 📃 ⟫
// បន្ទះផែនទីជ្រើសផែនទីដែលកំពុងកែ ( ផែនទីនីមួយៗជាពិភពលោកឯករាជ្យ
// ជាមួយឯកសារទិន្នន័យប្រាំពីរផ្ទាល់ខ្លួន ) បង្កើតផែនទីថ្មី ប្តូរឈ្មោះ លុប
// ជ្រើសផែនទីសកម្ម ( ផែនទីដែលហ្គេមអាន ) និងកែ
// រូបរាង និងទំហំពិភពលោក។ ទិន្នន័យផែនទីត្រូវបានផ្ទុកដោយ
// ការនាំចូលឌីណាមិក ដូច្នេះការជ្រើសផែនទីផ្សេងផ្ទុកទំព័រឡើងវិញដោយ ?mapo=<kodo> ព្រោះ
// ការផ្លាស់ប្តូរដែលមិនបានរក្សាទុករបស់ផែនទីបច្ចុប្បន្នត្រូវចាត់ចែងជាមុន ( ឧបករណ៍
// សួរ )។ បញ្ជីផែនទី ( mapoj.ts ) និងទ្វារ ( aktiva.ts ) ត្រូវបានរក្សាទុក
// ដោយប៊ូតុងដូចគ្នានឹងដី។
export const mapoElektilo = elemento<HTMLSelectElement>("mapoElektilo");
export const mapoFormoElektilo = elemento<HTMLSelectElement>("mapoFormoElektilo");
export const mapoGrandecoEnigo = elemento<HTMLInputElement>("mapoGrandeco");
export const mapoGrandecoValoro = elemento<HTMLElement>("mapoGrandecoValoro");

// kodoDeNomo គឺឈ្មោះថតរបស់ផែនទីពីឈ្មោះ។ ច្បាប់ដូច
// ម៉ាស៊ីនមេរក្សាទុកទទួល ( អក្សរតូច លេខ និងសញ្ញាដក 40 តួ )។
export function kodoDeNomo(nomo: string): string {
  const anstatauxoj: Record<string, string> = { "ĉ": "c", "ĝ": "g", "ĥ": "h", "ĵ": "j", "ŝ": "s", "ŭ": "u", "ä": "a", "ö": "o", "ü": "u" };
  return nomo.toLowerCase()
    .replace(/[ĉĝĥĵŝŭäöü]/g, c => anstatauxoj[c] ?? c)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}

// gxisdatigiMapajnElektilojn គឺបំពេញឧបករណ៍ជ្រើសផែនទី និងឧបករណ៍ជ្រើសរូបរាង
// ដោយបញ្ជីបច្ចុប្បន្ន និងតម្លៃបច្ចុប្បន្ន។
export function gxisdatigiMapajnElektilojn(): void {
  mapoElektilo.innerHTML = "";
  for ( const m of mapojRegistroj ) {
    const opcio = document.createElement("option");
    opcio.value = m.kodo;
    opcio.textContent = m.nomo + ( m.aktiva ? " ⭐" : "" ) + ( m.kodo === mapoDatumo.kodo ? " ( nun redaktata )" : "" );
    mapoElektilo.appendChild(opcio);
  }
  mapoElektilo.value = mapoDatumo.kodo;
  mapoFormoElektilo.innerHTML = "";
  for ( const f of FORMOJ ) {
    const opcio = document.createElement("option");
    opcio.value = f.kodo;
    opcio.textContent = f.nomo;
    mapoFormoElektilo.appendChild(opcio);
  }
  mapoFormoElektilo.value = mapoFormo;
  mapoGrandecoEnigo.value = String(Math.round(mapoGrandeco));
  mapoGrandecoValoro.textContent = oktala(mapoGrandeco) + " · " + Math.round(mapoGrandeco) + " u";
}

gxisdatigiMapajnElektilojn();

// sxaltiMapon គឺប្តូរផែនទីដែលកំពុងកែ ( ផ្ទុកឡើងវិញដោយ ?mapo=<kodo> )។
export function sxaltiMapon(kodo: string): void {
  if ( kodo === mapoDatumo.kodo ) return;
  if ( cxuSxangxita() && !confirm("Nesavitaj ŝanĝoj en ĉi tiu mapo — forlasi ilin?") ) {
    gxisdatigiMapajnElektilojn();
    return;
  }
  location.search = "?mapo=" + encodeURIComponent(kodo);
}
mapoElektilo.addEventListener("change", () => sxaltiMapon(mapoElektilo.value));

// skribiPerKonservilo គឺសរសេរឯកសារដោយម៉ាស៊ីនមេរក្សាទុក។ ផែនទីថ្មី
// ត្រូវការវា ដើម្បីបង្កើតឯកសារទិន្នន័យប្រាំពីរ ( ម៉ាស៊ីនមេក៏ពិនិត្យ
// សញ្ញាដែរ ដូច្នេះគ្មានអ្វីបរទេសត្រូវសរសេរចូល kantaoj/ )។
//     @returns ការឆ្លើយតបរបស់ម៉ាស៊ីនមេ ឬ null ពេលការសរសេរបរាជ័យ។
export async function skribiPerKonservilo(dosieroj: Record<string, string>): Promise<string | null> {
  try {
    const respondo = await fetch(KONSERVILO, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ dosieroj }),
    });
    const mesagxo = await respondo.text();
    if ( respondo.ok ) return mesagxo;
    statuso("La konservilo rifuzis: " + mesagxo);
    return null;
  } catch {
    statuso("La konserva servilo ne kuras — nova mapo bezonas ĝin ( npm run konservilo )");
    return null;
  }
}

// mapoNova គឺផែនទីថ្មី ដែលចាប់ផ្តើមជាច្បាប់ចម្លងនៃផែនទីបច្ចុប្បន្ន ( ទិន្នន័យរបស់
// ផែនទីបច្ចុប្បន្នត្រូវសរសេរទៅថតថ្មី ជាមួយបញ្ជីផែនទី )។ បន្ទាប់មក
// ឧបករណ៍ប្តូរទៅផែនទីថ្មី ( ផ្ទុកឡើងវិញ )។
export async function mapoNova(): Promise<void> {
  const nomo = prompt("Nomo de la nova mapo", "Nova mapo");
  if ( !nomo ) return;
  const kodo = kodoDeNomo(nomo);
  if ( !kodo ) { statuso("La nomo ne donas dosierujan nomon — uzu literojn aŭ ciferojn"); return; }
  if ( mapojRegistroj.some(m => m.kodo === kodo) ) { statuso("Mapo kun tiu dosieruja nomo jam ekzistas"); return; }
  mapojRegistroj.push({ kodo, nomo, aktiva: false, formo: mapoFormo, grandeco: mapoGrandeco });
  statuso("Kreanta la mapon " + kodo + " …");
  const rezulto = await skribiPerKonservilo(generiDosierojn(kodo));
  if ( !rezulto ) {
    mapojRegistroj = mapojRegistroj.filter(m => m.kodo !== kodo);
    gxisdatigiMapajnElektilojn();
    return;
  }
  statuso("La mapo " + nomo + " kreita ✔️ — ŝaltante al ĝi");
  location.search = "?mapo=" + encodeURIComponent(kodo);
}

// mapoAlinomi គឺប្តូរឈ្មោះដែលបង្ហាញ ( ថតនៅដដែល ដូច្នេះ
// ទិន្នន័យមិនផ្លាស់ទី )។
export function mapoAlinomi(): void {
  const nuna = mapojRegistroj.find(m => m.kodo === mapoDatumo.kodo);
  const nomo = prompt("Nova nomo de la mapo", nuna ? nuna.nomo : mapoDatumo.kodo);
  if ( !nomo ) return;
  if ( nuna ) nuna.nomo = nomo;
  markiSxangxitan();
  gxisdatigiMapajnElektilojn();
  statuso("La nomo ŝanĝita — savu por skribi ĝin al mapoj.ts");
}

// mapoForigi គឺលុបផែនទីចេញពីបញ្ជី។ ឯកសារទិន្នន័យនៅសល់លើ
// ឌីស ( ឧបករណ៍មិនលុបឯកសារ ) ដូច្នេះផែនទីអាចត្រឡប់មកវិញដោយដៃ។
export function mapoForigi(): void {
  if ( mapojRegistroj.length <= 1 ) { statuso("La lasta mapo ne forigeblas"); return; }
  const nuna = mapojRegistroj.find(m => m.kodo === mapoDatumo.kodo);
  if ( !confirm("Forigi la mapon „" + ( nuna ? nuna.nomo : mapoDatumo.kodo ) + "“ el la registro? ( la dosieroj restas )") ) return;
  mapojRegistroj = mapojRegistroj.filter(m => m.kodo !== mapoDatumo.kodo);
  if ( !mapojRegistroj.some(m => m.aktiva) ) mapojRegistroj[0].aktiva = true;
  markiSxangxitan();
  const sekva = ( mapojRegistroj.find(m => m.aktiva) ?? mapojRegistroj[0] ).kodo;
  location.search = "?mapo=" + encodeURIComponent(sekva);
}

// mapoAktiva គឺជ្រើសផែនទីដែលហ្គេមអាន។ ទ្វារ aktiva.ts
// ត្រូវសរសេរឡើងវិញពេលរក្សាទុក។
export function mapoElektiAktivan(): void {
  for ( const m of mapojRegistroj ) m.aktiva = m.kodo === mapoDatumo.kodo;
  markiSxangxitan();
  gxisdatigiMapajnElektilojn();
  statuso("Ĉi tiu mapo estos la mapo de la ludo post la savo ⭐");
}

// gxisdatigiFormon គឺរូបរាង ឬទំហំពិភពលោកបានផ្លាស់ប្តូរ។ ផែនទី 2D
// ទិដ្ឋភាព 3D និង ( ក្រោយការរក្សាទុក ) ហ្គេមក៏បង្ហាញរូបរាងថ្មីដែរ។
export function gxisdatigiFormon(): void {
  formajRandaj = formajRandPunktoj(mapoFormo, mapoGrandeco, 0o100);
  mapoGrandecoValoro.textContent = oktala(mapoGrandeco) + " · " + Math.round(mapoGrandeco) + " u";
  markiSxangxitan();
  gxisdatigiFormon3D();
  gxisdatigiPlenan2Dn();
  statuso("Formo " + mapoFormo + ", grandeco " + Math.round(mapoGrandeco)
    + " — savu por skribi ĝin al mapoj.ts");
}

mapoFormoElektilo.addEventListener("change", () => {
  mapoFormo = mapoFormoElektilo.value as MapFormo;
  gxisdatigiFormon();
});
mapoGrandecoEnigo.addEventListener("input", () => {
  mapoGrandeco = Number(mapoGrandecoEnigo.value);
  gxisdatigiFormon();
});
elemento<HTMLButtonElement>("mapoNova").addEventListener("click", mapoNova);
elemento<HTMLButtonElement>("mapoAlinomi").addEventListener("click", mapoAlinomi);
elemento<HTMLButtonElement>("mapoForigi").addEventListener("click", mapoForigi);
elemento<HTMLButtonElement>("mapoAktiva").addEventListener("click", mapoElektiAktivan);

// ⟪ ការចាប់ផ្តើម 📃 ⟫
elemento<HTMLButtonElement>("savi").addEventListener("click", saviDosieron);
elemento<HTMLButtonElement>("saviRekte").addEventListener("click", saviRekteAlDosiero);
elemento<HTMLButtonElement>("sargi").addEventListener("click", sargiDosieron);

// ⟪ ការភ្ជាប់ទៅកម្មវិធីកែសម្រួល 📃 ⟫ គឺស្ថានភាព និងឧបករណ៍ជំនួយរបស់ម៉ូឌុលមេ។
// តារាង និងប្រវត្តិមកតាមការយោង ( ព្រោះម៉ូឌុលសរសេរពួកវា
// នៅនឹងកន្លែង ) រីឯអ្វីផ្សេងទៀតតាមការយោងទៅអនុគមន៍ផ្ទាល់ខ្លួនរបស់កម្មវិធីកែសម្រួល។
interface DosieraLigo {
  PASO: number;
  N: number;
  X0: number;
  Z0: number;
  deltoj: Float32Array;
  masko: Uint8Array;
  biomoj: Uint8Array;
  bestoj: Uint8Array;
  historio: HistoriaMomento[];
  refaraHistorio: HistoriaMomento[];
  niveloRegilo: HTMLInputElement;
  statuso: ( teksto: string ) => void;
  gxisdatigiValorojn: () => void;
  gxisdatigiPlenan2Dn: () => void;
  gxisdatigiAkvajnStatistikojn: () => void;
  markiSxangxitan: () => void;
  markiSavitan: () => void;
  cxuSxangxita: () => boolean;
  SKULPTA_DELTAJ: string;
  SKULPTA_AKVA_MASKO: string;
  SKULPTA_BIOMOJ: string;
  SKULPTA_BESTOJ: string;
  SKULPTA_AKVOFONTOJ: AkvaFonto[];
  SKULPTA_OBJEKTOJ: MetitaObjekto[];
  SKULPTA_URBOJ: SkulptaUrbo[];
  SKULPTA_VOJOJ: SkulptaVojo[];
  SKULPTA_DOKOJ: SkulptaPlatformo[];
}
export let PASO: number;
export let N: number;
export let X0: number;
export let Z0: number;
export let deltoj: Float32Array;
export let masko: Uint8Array;
export let biomoj: Uint8Array;
export let bestoj: Uint8Array;
export let historio: HistoriaMomento[];
export let refaraHistorio: HistoriaMomento[];
export let niveloRegilo: HTMLInputElement;
export let statuso: ( teksto: string ) => void;
export let gxisdatigiValorojn: () => void;
export let gxisdatigiPlenan2Dn: () => void;
export let gxisdatigiAkvajnStatistikojn: () => void;
export let markiSxangxitan: () => void;
export let markiSavitan: () => void;
export let cxuSxangxita: () => boolean;
export let SKULPTA_DELTAJ: string;
export let SKULPTA_AKVA_MASKO: string;
export let SKULPTA_BIOMOJ: string;
export let SKULPTA_BESTOJ: string;
export let SKULPTA_AKVOFONTOJ: AkvaFonto[];
export let SKULPTA_OBJEKTOJ: MetitaObjekto[];
export let SKULPTA_URBOJ: SkulptaUrbo[];
export let SKULPTA_VOJOJ: SkulptaVojo[];
export let SKULPTA_DOKOJ: SkulptaPlatformo[];
/* ការភ្ជាប់តែម្តងជាមួយឯកសារមេ។
    @param k ( DosieraLigo ) - ការភ្ជាប់របស់ម៉ូឌុលមេ។ */
export function agordiDosierojn(k: DosieraLigo): void {
  ( { PASO, N, X0, Z0, deltoj, masko, biomoj, bestoj, historio, refaraHistorio,
    niveloRegilo, statuso, gxisdatigiValorojn, gxisdatigiPlenan2Dn,
    gxisdatigiAkvajnStatistikojn, markiSxangxitan, markiSavitan, cxuSxangxita,
    SKULPTA_DELTAJ, SKULPTA_AKVA_MASKO, SKULPTA_BIOMOJ, SKULPTA_BESTOJ,
    SKULPTA_AKVOFONTOJ, SKULPTA_OBJEKTOJ, SKULPTA_URBOJ, SKULPTA_VOJOJ,
    SKULPTA_DOKOJ } = k );
  gxisdatigiMapajnElektilojn();
}
