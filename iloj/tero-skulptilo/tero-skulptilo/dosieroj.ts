// ≺⧼ ʃᴜ j͐ʃɹ ʌ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ 📃 ⧽≻
import { MAPOJ } from "../../../kantaoj/tero-datumaro/mapoj.js";
import manifesto from "../../../kantaoj/tero-datumaro/manifesto.json" with { type: "json" };
import { mapoDeKodo } from "../../../kantaoj/tero-datumaro/mapregulo.js";
import { QOXA, qoxaPukazN2k } from "../../../eskekoj/komunajxoj/mapqoxa.js";
import { dekodiInt16, dekodiMaskon, dekodi3Bit } from "../../../kantaoj/tero-datumaro/rultempo.js";
import { agordiHatsiqn, agordiElektitanTsiqn, agordiTsiqTrenatan, agordiAkvanVem2n,
  akvaVem2Valoro, hatsiq, markiAkvonMalpuran, rekalkuliAkvon } from "./akvo.js";
import { agordiObjektojn, agordiElektitanObjekton, gxisdatigiObjektoListon,
  vepaqTom6Objektojn, objektoj } from "./objektoj.js";
import { agordiHakaxten, agordiElektitanKaxten, agordiHak6h6n, agordiHaqakaj2n, elektiKaxten,
  gxisdatigiK6h6jnHakaman, sinkronigiSuperojn, hakaxte, hak6h6, haqakaj2, elektitaKaxte } from "./kradaro.js";
import { gxisdatigiQoxan3D } from "./vido3d.js";
import { elemento } from "../../komunajxoj/dom.js";
import type { Bal2Qoxa } from "../../../eskekoj/komunajxoj/mapqoxa.js";
import type { MapoDatumo } from "../../../kantaoj/tero-datumaro/mapregulo.js";
import type { AkvaTsiq } from "./akvo.js";
import type { MetitaObjekto, SkulptaKaxte, SkulptaK6h6, SkulptaPlatqoxa } from "../../../kantaoj/mondo/kaxte/hahunaq.js";
import type { K6h6Punkto } from "../../../eskekoj/medio/voj-reto.js";
import type { HistoriaMomento } from "./historio.js";

export const mapoKodo = new URLSearchParams(location.search).get("mapo");
export const mapoDatumo = mapoDeKodo(mapoKodo);
export let mapoQoxa: Bal2Qoxa = mapoDatumo.qoxa;
export let mapoGrandeco: number = mapoDatumo.grandeco;
export let mapojRegistroj: MapoDatumo[] = MAPOJ.map(m => ( { ...m } ));
export let formajRandaj = qoxaPukazN2k(mapoQoxa, mapoGrandeco, 0o100);

export function oktala(skek2: number): string {
  const n = Math.round(skek2 * 0o100);
  if ( n % 0o100 === 0 ) {
    const tuta = n / 0o100;
    return ( tuta < 0 ? "-" : "" ) + "ꞙɭ" + Math.abs(tuta).toString(0o10);
  }
  return ( n < 0 ? "-" : "" ) + "ꞙɭ" + Math.abs(n).toString(0o10) + "/ꞙɭıɔɔ";
}
export function gcdn(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while ( b ) { const r = a % b; a = b; b = r; }
  return a || 1;
}
export function piFrakcio(skek2: number): string | null {
  if ( !Number.isFinite(skek2) ) return null;
  const r = skek2 / Math.PI;
  if ( Math.abs(r) < 0o10 ** -0o12 ) return "0";
  for ( let d = 1; d <= 0o20; d++ ) {
    const k = Math.round(r * d);
    if ( Math.abs(r - k / d) < 0o10 ** -0o11 ) {
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
export function formatiNombron(skek2: number): string {
  if ( !Number.isFinite(skek2) ) return "null";
  if ( skek2 === 0 ) return "0";
  const p = piFrakcio(skek2);
  if ( p !== null ) return p;
  if ( Number.isInteger(skek2) && Math.abs(skek2) <= 0o7777777777 ) {
    return ( skek2 < 0 ? "-" : "" ) + "ꞙɭ" + Math.abs(skek2).toString(0o10);
  }
  const n64 = skek2 * 0o100;
  if ( Number.isInteger(n64) && Math.abs(n64) <= 0o7777777777 ) {
    return ( n64 < 0 ? "-" : "" ) + "ꞙɭ" + Math.abs(n64).toString(0o10) + "/ꞙɭıɔɔ";
  }
  return String(skek2);
}
/* ſɭэ ſɭᴜ , ꞙɭı , ⟅ j͑ʃɜ j͑ʃƨɹ , ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ ,
   j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɹ ſȷɔ ( ɭʃэ ɭʃᴜ ꞙɭı ｡ π ) ɭʃɜ ʌ JSON ⟅
    @param skek2 ( unknown ) - ſɭɹ ſȷɔ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ⟅
@returns ſɭɹ ſȷɔ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ( string ) ⟅ */
export function skribiValoron(skek2: unknown): string {
  if ( skek2 === null || skek2 === undefined ) return "null";
  if ( typeof skek2 === "number" ) return formatiNombron(skek2);
  if ( typeof skek2 === "boolean" ) return skek2 ? "true" : "false";
  if ( typeof skek2 === "string" ) return JSON.stringify(skek2);
  if ( Array.isArray(skek2) ) return "[ " + skek2.map(v => skribiValoron(v)).join(", ") + " ]";
  const objekto = skek2 as Record<string, unknown>;
  const eroj: string[] = [];
  for ( const k in objekto ) {
    if ( objekto[k] === undefined ) continue;
    eroj.push(JSON.stringify(k) + ": " + skribiValoron(objekto[k]));
  }
  return "{ " + eroj.join(", ") + " }";
}
/* ſɭɜ ʃɔ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ ſɭэ ſɭᴜ ,
    @param s2banani ( string ) - ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃɹ ɭʃɜ ( ſɟᴜ ｡ ) ⟅
@returns ſɭɹ ſȷɔ ʌ j͑ʃɹ ɭl̀ɹ ( any ) ｡ ſɭɹ ſȷɔ ɭʃᴜ ɭʃᴜ ⟅ */
export function parziValoron(s2banani: string): any {
  let i = 0;
  const sp = () => { while ( i < s2banani.length && /\s/.test(s2banani[i]) ) i++; };
  const eraro = (): never => { throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſɟᴜ ſɭɹ ſȷɔ ｡ " + i + " , " + s2banani.slice(i, i + 0o40)); };
  function nombro(): number {
    sp();
    const m = s2banani.slice(i).match(/^-?0o[0-7]+(?:\/0o[0-7]+)?|^-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/);
    if ( !m ) return eraro();
    i += m[0].length;
    const s = m[0];
    if ( /^0o/.test(s) ) {
      const neg = s.startsWith("-");
      const lowak = neg ? s.slice(1) : s;
      const hakek = lowak.split("/");
      let v = parseInt(hakek[0].slice(2), 0o10);
      if ( hakek.length > 1 ) v = v / parseInt(hakek[1].slice(2), 0o10);
      return neg ? -v : v;
    }
    return parseFloat(s);
  }
  function faktoro(): number {
    sp();
    const c = s2banani[i];
    if ( c === "-" ) { i++; return -faktoro(); }
    if ( c === "(" ) { i++; const v = adicio(); sp(); if ( s2banani[i] !== ")" ) eraro(); i++; return v; }
    if ( s2banani.startsWith("Math.PI", i) ) { i += "Math.PI".length; return Math.PI; }
    return nombro();
  }
  function termo(): number {
    let v = faktoro();
    for ( ;; ) {
      sp();
      const c = s2banani[i];
      if ( c === "*" ) { i++; v = v * faktoro(); }
      else if ( c === "/" ) { i++; v = v / faktoro(); }
      else return v;
    }
  }
  function adicio(): number {
    let v = termo();
    for ( ;; ) {
      sp();
      const c = s2banani[i];
      if ( c === "+" ) { i++; v = v + termo(); }
      else if ( c === "-" ) { i++; v = v - termo(); }
      else return v;
    }
  }
  function stringo(): string {
    sp();
    if ( s2banani[i] !== "\"" ) eraro();
    let s = "";
    i++;
    for ( ;; ) {
      if ( i >= s2banani.length ) eraro();
      const c = s2banani[i];
      if ( c === "\"" ) { i++; return s; }
      if ( c === "\\" ) {
        const n = s2banani[i + 1];
        if ( n === undefined ) eraro();
        if ( n === "n" ) s += "\n";
        else if ( n === "t" ) s += "\t";
        else if ( n === "r" ) s += "\r";
        else if ( n === "b" ) s += "\b";
        else if ( n === "f" ) s += "\f";
        else if ( n === "u" ) { s += String.fromCharCode(parseInt(s2banani.slice(i + 2, i + 6), 0o20)); i += 4; }
        else s += n;
        i += 2;
      } else { s += c; i++; }
    }
  }
  function skek2(): unknown {
    sp();
    const c = s2banani[i];
    if ( c === "{" ) {
      i++;
      const o: Record<string, unknown> = {};
      sp();
      if ( s2banani[i] === "}" ) { i++; return o; }
      for ( ;; ) {
        sp();
        if ( s2banani[i] === "}" ) { i++; return o; }
        const k = stringo();
        sp();
        if ( s2banani[i] !== ":" ) eraro();
        i++;
        o[k] = skek2();
        sp();
        const d = s2banani[i];
        if ( d === "," ) { i++; continue; }
        if ( d === "}" ) { i++; return o; }
        eraro();
      }
    }
    if ( c === "[" ) {
      i++;
      const a: unknown[] = [];
      sp();
      if ( s2banani[i] === "]" ) { i++; return a; }
      for ( ;; ) {
        sp();
        if ( s2banani[i] === "]" ) { i++; return a; }
        a.push(skek2());
        sp();
        const d = s2banani[i];
        if ( d === "," ) { i++; continue; }
        if ( d === "]" ) { i++; return a; }
        eraro();
      }
    }
    if ( c === "\"" ) return stringo();
    if ( s2banani.startsWith("true", i) ) { i += 4; return true; }
    if ( s2banani.startsWith("false", i) ) { i += 5; return false; }
    if ( s2banani.startsWith("null", i) ) { i += 4; return null; }
    return adicio();
  }
  sp();
  const v = skek2();
  sp();
  if ( i !== s2banani.length ) eraro();
  return v;
}
export function bazo64DeBajtoj(bajtoj: Uint8Array): string {
  let s2banani = "";
  const bloko = 0o30000;
  for ( let i = 0; i < bajtoj.length; i += bloko ) {
    s2banani += btoa(String.fromCharCode(...bajtoj.subarray(i, i + bloko)));
  }
  return s2banani;
}
export function bazo64DeInt16(hatskek2: Int16Array): string {
  const bajtoj = new Uint8Array(hatskek2.length * 2);
  const vido = new DataView(bajtoj.buffer);
  for ( let i = 0; i < hatskek2.length; i++ ) vido.setInt16(i * 2, hatskek2[i], true);
  return bazo64DeBajtoj(bajtoj);
}
export function bazo64DeMasko(maskoDatumoj: Uint8Array): string {
  const bajtoj = new Uint8Array(Math.ceil(maskoDatumoj.length / 0o10));
  for ( let i = 0; i < maskoDatumoj.length; i++ ) if ( maskoDatumoj[i] ) bajtoj[i >> 3] |= 1 << ( i & 7 );
  return bazo64DeBajtoj(bajtoj);
}
export function bazo64DeHabs2(bs2Datumoj: Uint8Array): string {
  const bajtoj = new Uint8Array(Math.ceil(( bs2Datumoj.length * 3 ) / 0o10));
  for ( let i = 0; i < bs2Datumoj.length; i++ ) {
    const b = i * 3;
    bajtoj[b >> 3] |= ( bs2Datumoj[i] & 7 ) << ( b & 7 );
    if ( ( b & 7 ) > 5 ) bajtoj[( b >> 3 ) + 1] |= ( bs2Datumoj[i] & 7 ) >> (0o10 - ( b & 7 ));
  }
  return bazo64DeBajtoj(bajtoj);
}
export function bazo64DeHapaga(pagaDatumoj: Uint8Array): string {
  const bajtoj = new Uint8Array(Math.ceil(pagaDatumoj.length * 3 / 0o10));
  for ( let i = 0; i < pagaDatumoj.length; i++ ) {
    const b = i * 3;
    const v = pagaDatumoj[i] & 7;
    bajtoj[b >> 3] |= v << ( b & 7 );
    if ( ( b & 7 ) > 5 ) bajtoj[( b >> 3 ) + 1] |= v >> (0o10 - ( b & 7 ));
  }
  return bazo64DeBajtoj(bajtoj);
}
export function kvantigiHal6dan(): Int16Array {
  const kvantigita = new Int16Array(N * N);
  for ( let i = 0; i < hal6da.length; i++ ) {
    kvantigita[i] = Math.max(-0o77777, Math.min(0o77777, Math.round(hal6da[i] * 0o20)));
  }
  return kvantigita;
}
export function cirkuloValidas(): boolean {
  try {
    const kvantigita = kvantigiHal6dan();
    const d = dekodiInt16(bazo64DeInt16(kvantigita));
    const m = dekodiMaskon(bazo64DeMasko(k6liqani), N * N);
    const b = dekodi3Bit(bazo64DeHabs2(habs2), N * N);
    const be = dekodi3Bit(bazo64DeHapaga(hapaga), N * N);
    if ( !d || !m || !b || !be || d.length !== kvantigita.length ) return false;
    for ( let i = 0; i < kvantigita.length; i++ ) {
      if ( d[i] !== kvantigita[i] ) return false;
    }
    for ( let i = 0; i < k6liqani.length; i++ ) {
      if ( m[i] !== k6liqani[i] ) return false;
    }
    for ( let i = 0; i < habs2.length; i++ ) {
      if ( b[i] !== habs2[i] ) return false;
    }
    for ( let i = 0; i < hapaga.length; i++ ) {
      if ( be[i] !== hapaga[i] ) return false;
    }
    return true;
  } catch { return false; }
}
export function cirkuloDeDatumojValidas(): boolean {
  try {
    return JSON.stringify(parziValoron(skribiValoron(objektoj))) === JSON.stringify(objektoj)
      && JSON.stringify(parziValoron(skribiValoron(hatsiq))) === JSON.stringify(hatsiq)
      && JSON.stringify(parziValoron(skribiValoron(hakaxte))) === JSON.stringify(hakaxte)
      && JSON.stringify(parziValoron(skribiValoron(hak6h6))) === JSON.stringify(hak6h6)
      && JSON.stringify(parziValoron(skribiValoron(haqakaj2))) === JSON.stringify(haqakaj2);
  } catch { return false; }
}
// ⟪ ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟫
export const DATUMDOSIEROJ = Object.keys(manifesto.datumaj).map(n => n.replace(/\.ts$/, ""));
export function dosierujo(kodo: string): string { return "tero-datumaro/" + kodo + "/"; }
export const mapoDosierujo = dosierujo(mapoDatumo.kodo);
export const DOSIERA_TITOLO = {
  [mapoDosierujo + "krado.ts"]: "// ≺⧼ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ 📃 ⧽≻",
  [mapoDosierujo + "akvo.ts"]: "// ≺⧼ ſᶘᴜ j͑ʃᴜ 📃 ⧽≻",
  [mapoDosierujo + "akvohatsiq.ts"]: "// ≺⧼ ſᶘꞇȝ 🌊 ⧽≻",
  [mapoDosierujo + "habs2.ts"]: "// ≺⧼ ʃɔ˞ɹ 📃 ⧽≻",
  [mapoDosierujo + "hapaga.ts"]: "// ≺⧼ ſןᴜ ſ͔ɭᴜ 📃 ⧽≻",
  [mapoDosierujo + "objektoj.ts"]: "// ≺⧼ j͑ʃƽɔ ſɭɹ ı],ɔ ŋᷠᴜ j͑ʃᴜꞇ 📃 ⧽≻",
  [mapoDosierujo + "hakaxte.ts"]: "// ≺⧼ ſɭᴜ ı],ƨɔ 📃 ⧽≻",
  [mapoDosierujo + "hak6h6.ts"]: "// ≺⧼ ſɭэ ֭ſɭэ 📃 ⧽≻",
  "tero-datumaro/mapoj.ts": "// ≺⧼ ʃᴜ j͐ʃɹ 🗺️ ⧽≻",
  "tero-datumaro/aktiva.ts": "// ≺⧼ ʃᴜ j͐ʃɹ 📃 ⧽≻",
};
export function generiDosierojn(kodo: string = mapoDatumo.kodo): Record<string, string> {
  const dosierujoDeMapo = dosierujo(kodo);
  sinkronigiSuperojn();
  const kvantigita = kvantigiHal6dan();
  let hal6daAktivaj = false, maskoAktiva = false, habs2Aktivaj = false, hapagaAktivaj = false;
  for ( let i = 0; i < kvantigita.length; i++ ) if ( kvantigita[i] !== 0 ) { hal6daAktivaj = true; break; }
  for ( let i = 0; i < k6liqani.length; i++ ) if ( k6liqani[i] ) { maskoAktiva = true; break; }
  for ( let i = 0; i < habs2.length; i++ ) if ( habs2[i] ) { habs2Aktivaj = true; break; }
  for ( let i = 0; i < hapaga.length; i++ ) if ( hapaga[i] ) { hapagaAktivaj = true; break; }
  const delta64 = hal6daAktivaj ? bazo64DeInt16(kvantigita) : "";
  const masko64 = maskoAktiva ? bazo64DeMasko(k6liqani) : "";
  const bs264 = habs2Aktivaj ? bazo64DeHabs2(habs2) : "";
  const paga64 = hapagaAktivaj ? bazo64DeHapaga(hapaga) : "";
  const aktiva = hal6daAktivaj || maskoAktiva || habs2Aktivaj || hapagaAktivaj;
  const komunajKom = [
    "// ſɟᴜᴜ̩ ɭʃɹ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ( iloj/tero-skulptilo/tero-skulptilo.html ) ⟅",
    "// ( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ſɭɜ ʃɔ ſɟᴜᴜ̩ ɭʃɹ ɭʃɜ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ⟅",
  ];
  const kradoS2bana = [
    "// ≺⧼ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ ſɭɹ ſןᴜ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ 📃 ⟩ ｡ ſɭᴜ ſןᴜ ｡ ſɭɜ ｡ ſᶘꞇȝ ｡",
    "export const SKULPTA_PASO = " + oktala(PASO) + ";",
    "export const SKULPTA_N = " + oktala(N) + ";",
    "export const SKULPTA_ORIGINO = [ " + oktala(X0) + ", " + oktala(Z0) + " ];",
    "export const SKULPTA_AKTIVA = " + ( aktiva ? "true" : "false" ) + ";",
    "export const SKULPTA_DELTAJ = " + JSON.stringify(delta64) + ";",
  ].join("\n");
  const akvoS2bana = [
    "// ≺⧼ ſᶘᴜ j͑ʃᴜ 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ ſᶘᴜ j͑ʃᴜ ɭʃᴜ 📃 ⟩ ｡ ſᶘꞇȝ ｡",
    "// ( ſᶘᴜ j͑ʃᴜ ｡ ſᶘᴜ j͑ʃᴜ ｡",
    "// ſᶘꞇȝ ʌ kantaoj/mondo/akvokalkulo.ts ) ⟅",
    "export const SKULPTA_AKVA_NIVELO = " + oktala(akvaVem2Valoro) + ";",
    "export const SKULPTA_AKVA_MASKO = " + JSON.stringify(masko64) + ";",
  ].join("\n");
  const tsiqS2bana = [
    "// ≺⧼ ſᶘꞇȝ 🌊 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ ſᶘꞇȝ ɭʃᴜ 📃 ⟩ ｡ ſᶘꞇȝ ｡ ſᶘᴜ j͑ʃᴜ ｡",
    "// ſᶘꞇȝ ſɭɹ ſȷɔ ɭl̀ᴜ j͑ʃᴜ ( kantaoj/mondo/akvokalkulo.ts ) ｡",
    "// ſᶘᴜ j͑ʃᴜ ｡ j͑ʃɹ ı],w ɽ͑ʃ'w ⟅ ſᶘꞇȝ ɭʃᴜ - x, z ( }ʃᴜ j͐ʃᴜ",
    "// ) ｡ j͐ʃᴜɔ˞ ( j͐ʃᴜɔ˞ ſɭᴜ = ſɭэ j͑ʃꞇ ſɭɜ ſɟᴜ ) ⟅",
    "export const SKULPTA_HAXAIQ = " + skribiValoron(hatsiq) + ";",
  ].join("\n");
  const bs2Dosiero = [
    "// ≺⧼ ʃɔ˞ɹ 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ ſɭɜ ſɭ,w j͑ʃƨɹ 📃 ⟩ ( 0 = ſɭᴜ ſןᴜ ɭʃᴜ ｡ 1 = ſɭƨw ֭ſɭᴜ ｡ 2 = j͐ʃɜ ɭʃᴜ ｡ 3 = ſ͕ɭw }ʃɹ ｡",
    "// 4 = ı],ᴜ ſ̀ȷɔ ʌ ſᶘᴜ j͑ʃᴜ ｡ 5 = ſɭᴜ ſןɹ ɭʃɜ ) ⟅",
    "export const SKULPTA_BIOMOJ = " + JSON.stringify(bs264) + ";",
  ].join("\n");
  const pagaDosiero = [
    "// ≺⧼ ſןᴜ ſ͔ɭᴜ 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ ſɭɜ ſɭ,w ſןᴜ ſ͔ɭᴜ 📃 ⟩ ( 1 = ſןᴜ ſ͔ɭᴜ ʌ ſᶘᴜ j͑ʃᴜ ｡ 2 = ſᶘɹ ſɭᴜ ｡ 4 = NPC ) ⟅",
    "export const SKULPTA_BESTOJ = " + JSON.stringify(paga64) + ";",
  ].join("\n");
  const objektoS2bana = [
    "// ≺⧼ j͑ʃƽɔ ſɭɹ ı],ɔ ŋᷠᴜ j͑ʃᴜꞇ 📃 ⧽≻",
    ...komunajKom,
    "// ſɟᴜᴜ̩ ɭʃɹ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ｡ ſɭᴜ ｡",
    "// 🛶 ｡ 🚀 ｡ 🏮 ｡ ⭐ ｡",
    "// 🏛️ ｡ ſɟᴜ ｡ ſɟᴜ ｡ ⟅",
    "// ſɭɹ ſȷɔ ɭʃᴜ - x, z ( 0.25 ) ｡ ( lam2v | taksal | tlexlefhxakai",
    "// | tlexlefp2sai | t6keq | xabe | akvapaga | temek | npco | sanktejo | turo",
    "// | domo | mangxejo | kasafeo | stacio | hxeuxfo | hxeuxfoPa12 | keuxfhxeso | kanuo | spacosxipo ) ,",
    "// ſɭɜ ｡ j͑ʃɹ j͑ʃᴜ ʃɜ ｡ ſןᴜ ſ͔ɭᴜ ｡ ſɭᴜ ſɭˬꞇƽ ｡ ſɭᴜ ſןɹ ｡ ſᶘꞇȝ ｡",
    "export const SKULPTA_OBJEKTOJ = " + skribiValoron(objektoj) + ";",
  ].join("\n");
  const kaxteS2bana = [
    "// ≺⧼ ſɭᴜ ı],ƨɔ 📃 ⧽≻",
    ...komunajKom,
    "// ſɭᴜ ı],ƨɔ ʌ }ʃᴜ j͐ʃᴜ ｡ ſɭɹ ſןᴜ ｡",
    "// ſɭɹ ſןᴜ ｡ ſɭᴜ ı],ƨɔ ɭʃɜ ŋᷠэ ⟅ ſɭᴜ ı],ƨɔ ｡ arangxaGrando ｡",
    "// blokaGrando ( unu | kvar ) ｡ ofsX, ofsZ, keuxfhxeso ( ſɭᴜ ｡",
    "// ſɭɹ ſȷɔ ) ｡ lampoj ( ſɭᴜ ｡ ) ｡ superoj ( ſןᴜ ɭʃᴜ ʌ ſɭɹ ſןᴜ",
    "// ｡ \"c,r\" ｡ \"c,r,SUB\" → ſɭᴜ ) ｡ aldonajBlokoj",
    "// ( x, z, hunaq, rot, sub, stacia, konektita ) ⟅",
    "export const SKULPTA_URBOJ = " + skribiValoron(hakaxte) + ";",
  ].join("\n");
  const k6h6S2bana = [
    "// ≺⧼ ſɭэ ֭ſɭэ 📃 ⧽≻",
    ...komunajKom,
    "// ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ ( ſɭᴜ ｡ ſɭэ ֭ſɭэ ) ｡",
    "// j͑ʃɔ ſȷꞇ }ʃꞇ ｡ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ ſɭɹ ſȷɔ ｡",
    "// ſɭэ ֭ſɭэ ʌ ſɭᴜ ſןᴜ ｡ ⟅",
    "export const SKULPTA_VOJOJ = " + skribiValoron(hak6h6) + ";",
    "export const SKULPTA_DOKOJ = " + skribiValoron(haqakaj2) + ";",
  ].join("\n");
// ⟪ ſɭэ ſɭᴜ , ſןw ſɭᴜƴ , 📃 ⟫
  const mapoNuna = mapojRegistroj.find(m => m.kodo === mapoDatumo.kodo);
  if ( mapoNuna ) { mapoNuna.qoxa = mapoQoxa; mapoNuna.grandeco = mapoGrandeco; }
  const mapojS2bana = [
    "// ≺⧼ ʃᴜ j͐ʃɹ 🗺️ ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ ʃᴜ j͐ʃɹ ʌ }ʃᴜ j͐ʃᴜ 📃 ⟩ ｡ ʃᴜ j͐ʃɹ ɭʃᴜ ｡",
    "// ( kantaoj/tero-datumaro/<kodo>/ ｡ ſɭɹ ſןᴜ ｡ ſᶘᴜ j͑ʃᴜ ｡ ſɭɜ ſɭ,w j͑ʃƨɹ ｡ ſןᴜ ſ͔ɭᴜ ｡",
    "// ſɭɹ ſȷɔ ｡ ſɭᴜ ı],ƨɔ ｡ ſɭэ ֭ſɭэ ) ⟅ ſɭᴜ ſןᴜ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ",
    "// ʃᴜ j͐ʃɹ ɭʃᴜ ｡ ſɭэ ᶗ‹ ｡ ſɭᴜ ｡ }ʃᴜ j͐ʃᴜ ｡",
    "// ʃᴜ j͐ʃɹ ʌ j͑ʃw ſןͷ̗ɔͷ̗ ꞁȷ̀ᴜꞇ ( aktiva.ts ) ⟅",
    "//",
    "// qoxa ｡ ſɭэ }ʃᴜ ʌ ſ͕ɭɜ ı],ᴜ ( eskekoj/komunajxoj/mapqoxa.ts ) ｡ j͑ʃɹ j͑ʃᴜ ʃɜ (",
    "// ſɭɜ ſɭᴜ ) ｡ ſɭɜ ſɭᴜ ı],ᴜ ｡ ſɭɜ ı],ᴜ ⟅",
    "// grandeco ｡ ſɭэ }ʃᴜ ʌ ſ͕ɭɜ ı],ᴜ ｡ ſɭᴜ ſɭˬꞇƽ ｡",
    "// ſɭэ }ʃᴜ ʌ ſɭɜ ſɭᴜ ı],ᴜ ｡ ſɭɜ ı],ᴜ ⟅",
    "//",
    "// ſɭɹ ſȷɔ ｡ ſɟᴜᴜ̩ ɭʃɹ ｡ kantaoj/tero-datumaro/mapregulo.ts ⟅",
    "import type { MapoDatumo } from \"./mapregulo.js\";",
    "",
    "export const MAPOJ: MapoDatumo[] = [",
    ...mapojRegistroj.map(m => "  { kodo: " + JSON.stringify(m.kodo) + ", ksaka: " + JSON.stringify(m.ksaka)
      + ", aktiva: " + ( m.aktiva ? "true" : "false" ) + ", qoxa: " + JSON.stringify(m.qoxa)
      + ", grandeco: " + oktala(m.grandeco) + " },"),
    "];",
  ].join("\n");
  const aktivaKodo = ( mapojRegistroj.find(m => m.aktiva) ?? mapojRegistroj[0] ).kodo;
  const aktivaS2bana = [
    "// ≺⧼ ʃᴜ j͐ʃɹ 📃 ⧽≻",
    ...komunajKom,
    "",
    "// ⟨ ʃᴜ j͐ʃɹ ʌ j͑ʃw ſןͷ̗ɔͷ̗ ꞁȷ̀ᴜꞇ 📃 ⟩ ｡ ʃᴜ j͐ʃɹ ｡",
    "// }ʃᴜ j͐ʃᴜ ɭʃɜ ⟅ ʃᴜ j͐ʃɹ ɭʃᴜ ( mapoj.ts ) ｡ ſɟᴜ ｡",
    "// ſɟᴜ ｡ ꞙɭ" + DATUMDOSIEROJ.length.toString(0o10) + " ｡ ſɭᴜ ı],ƨɔ ɭʃɜ ｡",
    "// ( tereno.ts, kaxte.ts, ... ) ｡ ſɭᴜ ſןᴜ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ",
    "// ɭʃɜ ｡ ʃᴜ j͐ʃɹ ʌ j͑ʃw ſןͷ̗ɔͷ̗ ꞁȷ̀ᴜꞇ ⟅",
    ...DATUMDOSIEROJ.map(d => "export * from \"./" + aktivaKodo + "/" + d + ".js\";"),
  ].join("\n");
  return {
    [dosierujoDeMapo + "krado.ts"]: kradoS2bana,
    [dosierujoDeMapo + "akvo.ts"]: akvoS2bana,
    [dosierujoDeMapo + "akvohatsiq.ts"]: tsiqS2bana,
    [dosierujoDeMapo + "habs2.ts"]: bs2Dosiero,
    [dosierujoDeMapo + "hapaga.ts"]: pagaDosiero,
    [dosierujoDeMapo + "objektoj.ts"]: objektoS2bana,
    [dosierujoDeMapo + "hakaxte.ts"]: kaxteS2bana,
    [dosierujoDeMapo + "hak6h6.ts"]: k6h6S2bana,
    "tero-datumaro/mapoj.ts": mapojS2bana,
    "tero-datumaro/aktiva.ts": aktivaS2bana,
  };
}
export function sxargiDatumaronElMapo(dosieroj: Record<string, string>): boolean {
  const preni = ( ksaka: string ): string | null => {
    const ankro = "export const " + ksaka + " = ";
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
    const lowak = negativa ? s.slice(1) : s;
    const hakek = lowak.split("/");
    const numeratoro = parseInt(hakek[0].replace(/^0o/, ""), 0o10);
    const denominatoro = hakek.length > 1 ? parseInt(hakek[1].replace(/^0o/, ""), 0o10) : 1;
    const skek2 = numeratoro / denominatoro;
    return negativa ? -skek2 : skek2;
  };
  if ( oktalaNombro(preni("SKULPTA_PASO")) !== PASO || oktalaNombro(preni("SKULPTA_N")) !== N ) return false;
  const origino = preni("SKULPTA_ORIGINO");
  if ( origino ) {
    const eroj = origino.replace(/[\[\]]/g, "").split(",");
    if ( eroj.length !== 2
      || oktalaNombro(eroj[0].trim())!== X0
      || oktalaNombro(eroj[1].trim())!== Z0 ) return false;
  }
  const vem22 = oktalaNombro(preni("SKULPTA_AKVA_NIVELO"));
  const malpaku = ( s: string | null ): string | null => ( s === null ? null : s.replace(/^"|"$/g, "") );
  const deltaKruda = malpaku(preni("SKULPTA_DELTAJ"));
  if ( deltaKruda !== null ) {
    hal6da.fill(0);
    const d = dekodiInt16(deltaKruda);
    if ( d ) for ( let i = 0; i < hal6da.length && i < d.length; i++ ) hal6da[i] = d[i] / 0o20;
  }
  const maskoKruda = malpaku(preni("SKULPTA_AKVA_MASKO"));
  if ( maskoKruda !== null ) {
    k6liqani.fill(0);
    const m = dekodiMaskon(maskoKruda, N * N);
    if ( m ) k6liqani.set(m);
  }
  const bs2Kruda = malpaku(preni("SKULPTA_BIOMOJ"));
  if ( bs2Kruda !== null ) {
    habs2.fill(0);
    const b = dekodi3Bit(bs2Kruda, N * N);
    if ( b ) habs2.set(b);
  }
  const pagaKruda = malpaku(preni("SKULPTA_BESTOJ"));
  if ( pagaKruda !== null ) {
    hapaga.fill(0);
    const be = dekodi3Bit(pagaKruda, N * N);
    if ( be ) hapaga.set(be);
  }
  const fon = preni("SKULPTA_HAXAIQ");
  if ( fon !== null ) {
    try {
      const parzitaj = parziValoron(fon);
      if ( Array.isArray(parzitaj) ) agordiHatsiqn(parzitaj.map(f => ( {
        x: Number(f && f.x) || 0,
        z: Number(f && f.z) || 0,
        fluo: Math.max(0, Number(f && f.fluo) || 0),
      } )));
    } catch { }
    agordiElektitanTsiqn(-1);
    agordiTsiqTrenatan(-1);
    gxisdatigiAkvajnStatistikojn();
  }
  const oj = preni("SKULPTA_OBJEKTOJ");
  if ( oj !== null ) {
    try { agordiObjektojn(parziValoron(oj) ?? []); } catch { }
    agordiElektitanObjekton(-1);
    gxisdatigiObjektoListon();
    vepaqTom6Objektojn();
  }
  const voj = preni("SKULPTA_VOJOJ");
  const dok = preni("SKULPTA_DOKOJ");
  const uj = preni("SKULPTA_URBOJ");
  try {
    const parzitaj = uj !== null ? parziValoron(uj) : null;
    if ( parzitaj && Array.isArray(parzitaj) && parzitaj.length ) agordiHakaxten(parzitaj.map(u => ( {
      ksaka: String(u && u.ksaka !== undefined ? u.ksaka : "ſɭᴜ ı],ƨɔ"),
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
        hunaq: b && typeof b.hunaq === "string" ? b.hunaq : "sanktejo",
        rot: Number(b && b.rot) || 0,
        sub: b && typeof b.sub === "string" ? b.sub : "centro",
        stacia: !!( b && b.stacia ),
        konektita: !!( b && b.konektita ),
      } )) : [],
    } )));
  } catch { }
  if ( !hakaxte.length ) agordiHakaxten([ { ksaka: "Geles", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ]);
  agordiElektitanKaxten(Math.max(0, Math.min(elektitaKaxte, hakaxte.length - 1)));
  elektiKaxten(elektitaKaxte);
  try {
    const parzV = voj ? parziValoron(voj) : null;
    if ( parzV && Array.isArray(parzV) ) agordiHak6h6n(parzV.map(( v: any ) => ( { ...v, n2k: v.n2k.map(( p: any ) => [ p[0], p[1] ] as K6h6Punkto) } )));
  } catch { }
  try {
    const parz = dok ? parziValoron(dok) : null;
    if ( parz && Array.isArray(parz) ) agordiHaqakaj2n(parz.map(d => ( { ...d } )));
  } catch { }
  gxisdatigiK6h6jnHakaman();
  if ( vem22 !== null ) {
    agordiAkvanVem2n(vem22);
    vem2Kama.value = String(akvaVem2Valoro);
  }
  gxisdatigiValorojn();
  historio.length = 0;
  refaraHistorio.length = 0;
  markiAkvonMalpuran();
  rekalkuliAkvon();
  return true;
}
export function sxargiDatumaronElKodo(): void {
  const d = dekodiInt16(SKULPTA_DELTAJ);
  if ( d ) for ( let i = 0; i < hal6da.length && i < d.length; i++ ) hal6da[i] = d[i] / 0o20;
  const m = dekodiMaskon(SKULPTA_AKVA_MASKO, N * N);
  if ( m ) k6liqani.set(m);
  const b = dekodi3Bit(SKULPTA_BIOMOJ, N * N);
  if ( b ) habs2.set(b);
  const be = dekodi3Bit(SKULPTA_BESTOJ, N * N);
  if ( be ) hapaga.set(be);
  try {
    agordiHatsiqn(Array.isArray(SKULPTA_HAXAIQ) ? SKULPTA_HAXAIQ.map(f => ( { ...f } )) : []);
  } catch { agordiHatsiqn([]); }
  agordiObjektojn(SKULPTA_OBJEKTOJ.map(o => ( { ...o } )));
  agordiElektitanObjekton(-1);
  gxisdatigiObjektoListon();
  vepaqTom6Objektojn();
  try {
    agordiHakaxten(Array.isArray(SKULPTA_URBOJ) ? SKULPTA_URBOJ.map(u => ( { ...u } )) : []);
  } catch { agordiHakaxten([]); }
  if ( !hakaxte.length ) agordiHakaxten([ { ksaka: "Geles", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ]);
  agordiElektitanKaxten(0);
  elektiKaxten(0);
  try {
    if ( SKULPTA_VOJOJ && Array.isArray(SKULPTA_VOJOJ) ) agordiHak6h6n(SKULPTA_VOJOJ.map(v => ( { ...v, n2k: v.n2k.map(p => [ p[0], p[1] ] as K6h6Punkto) } )));
  } catch { }
  try {
    const parz = SKULPTA_DOKOJ;
    if ( parz && Array.isArray(parz) ) agordiHaqakaj2n(parz.map(d => ( { ...d } )));
  } catch { }
  gxisdatigiK6h6jnHakaman();
}

// ⟪ ſןw ſɭᴜƴ , ſɭэ ſɭᴜ , 📃 ⟫
export let dosierajTeniloj: Record<string, FileSystemFileHandle> = {};
/* ſןw ſɭᴜƴ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ ſɭэ ſɭᴜ ,
@returns ſɭᴜ ſɟᴜ ſ͕ɭᴜ ( Promise<IDBDatabase> ) ⟅ */
export function idbMalfermi(): Promise<IDBDatabase> {
  return new Promise(( solvi, rifuzi ) => {
    const peto = indexedDB.open("tero-skulptilo", 1);
    peto.onupgradeneeded = () => { peto.result.createObjectStore("teniloj"); };
    peto.onsuccess = () => solvi(peto.result);
    peto.onerror = () => rifuzi(peto.error);
  });
}
export async function konserviDosieranTenilon(tenilo: FileSystemFileHandle, ksaka: string): Promise<void> {
  try {
    const db = await idbMalfermi();
    await new Promise<void>(( solvi, rifuzi ) => {
      const tx = db.transaction("teniloj", "readwrite");
      tx.objectStore("teniloj").put(tenilo, "dosiero:" + ksaka);
      tx.oncomplete = () => solvi();
      tx.onerror = () => rifuzi(tx.error);
    });
  } catch { }
}
export async function sxargiDosierajnTenilojn(): Promise<void> {
  try {
    const db = await idbMalfermi();
    const butiko = db.transaction("teniloj").objectStore("teniloj");
    const ca3aq = await new Promise<IDBValidKey[]>(( solvi ) => {
      const peto = butiko.getAllKeys();
      peto.onsuccess = () => solvi(peto.result || []);
      peto.onerror = () => solvi([]);
    });
    for ( const k of ca3aq ) {
      const ksaka = String(k).replace(/^dosiero:/, "");
      const t = await new Promise<FileSystemFileHandle | null>(( solvi ) => {
        const peto = butiko.get(k);
        peto.onsuccess = () => solvi(peto.result || null);
        peto.onerror = () => solvi(null);
      });
      if ( t ) dosierajTeniloj[ksaka] = t;
    }
  } catch { }
}
export async function forgesiDosieranTenilon(ksaka: string): Promise<void> {
  delete dosierajTeniloj[ksaka];
  try {
    const db = await idbMalfermi();
    await new Promise<void>(( solvi, rifuzi ) => {
      const tx = db.transaction("teniloj", "readwrite");
      tx.objectStore("teniloj").delete("dosiero:" + ksaka);
      tx.oncomplete = () => solvi();
      tx.onerror = () => rifuzi(tx.error);
    });
  } catch { }
}
export function elSxuti(s2banani: string, ksaka: string): void {
  const blobo = new Blob([ s2banani ], { type: "text/plain" });
  const url = URL.createObjectURL(blobo);
  const a = document.createElement("a");
  a.href = url;
  a.download = ksaka;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0o4000);
}
export async function skribiPerTenilo(tenilo: FileSystemFileHandle, s2banani: string): Promise<boolean> {
  try {
    const skribilo = await tenilo.createWritable();
    await skribilo.write(s2banani);
    await skribilo.close();
    markiSavitan();
    statuso("j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ }ʃᴜ j͐ʃᴜ " + tenilo.name + " ✔️");
    return true;
  } catch { return false; }
}
export async function saviDosieron(): Promise<void> {
  const dosieroj = generiDosierojn();
  if ( !cirkuloValidas() || !cirkuloDeDatumojValidas() ){
    statuso("ſɭᴜ ſɭ,w ｡ ſɭɜ j͐ʃɹ ɭʃᴜ");
    return;
  }
  const elektilo = window.showSaveFilePicker;
  if ( !elektilo ) {
    for ( const [ ksaka, s2banani ] of Object.entries(dosieroj) ) elSxuti(s2banani, ksaka);
    markiSavitan();
    statuso("ɭʃɜ ʌ ſɭᴜ ſ͕ɭᴜ ｡ kantaoj/ ｡ j͑ʃɹ ɭʃɜ j͑ʃᴜᶗ‹");
    return;
  }
  for ( const [ ksaka, s2banani ] of Object.entries(dosieroj) ) {
    let tenilo: FileSystemFileHandle | null = dosierajTeniloj[ksaka] ?? null;
    if ( tenilo && !await skribiPerTenilo(tenilo, s2banani) ) {
      statuso("ſɟᴜ ｡ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ");
      await forgesiDosieranTenilon(ksaka);
      tenilo = null;
    }
    if ( !tenilo ) {
      try {
        tenilo = await elektilo({
          suggestedName: ksaka,
          types: [ { description: "ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ TypeScript", accept: { "text/plain": [ ".ts" ] } } ],
        });
      } catch {
        statuso("ſɭɜ j͐ʃɹ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ｡ j͑ʃ'ɔ ſ̀ȷᴜȝ ｡");
        return;
      }
      if ( !await skribiPerTenilo(tenilo, s2banani) ) {
        elSxuti(s2banani, ksaka);
        continue;
      }
      dosierajTeniloj[ksaka] = tenilo;
      await konserviDosieranTenilon(tenilo, ksaka);
    }
  }
}
export async function sargiDosieron(): Promise<void> {
  const elektilo = window.showOpenFilePicker;
  if ( !elektilo ) {
    statuso("ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃɹ ɭʃɜ j͑ʃᴜᶗ‹ ｡ Chromium");
    return;
  }
  try {
    const [ tenilo ] = await elektilo({
          types: [ { description: "ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ TypeScript", accept: { "text/plain": [ ".ts" ] } } ],
      multiple: false,
    });
    const dosiero = await tenilo.getFile();
    const s2banani = await dosiero.text();
    if ( sxargiDatumaronElMapo({ [ tenilo.name ]: s2banani }) ) {
      const ksaka = Object.keys(DOSIERA_TITOLO).find(n => n.split("/").pop() === tenilo.name) ?? tenilo.name;
      await konserviDosieranTenilon(tenilo, ksaka);
      dosierajTeniloj[ksaka] = tenilo;
      statuso("j͑ʃɹ ɭʃɜ j͑ʃᴜᶗ‹ " + tenilo.name + " 📂");
    } else {
      statuso("ſɟᴜ ｡ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ｡");
    }
  } catch { }
}

// ⟪ ſɭэ ſɭᴜ , ſɭɹ ſןᴜ , 📃 ⟫
export const KONSERVILO = "http://127.0.0.1:4173/";
export async function saviRekteAlDosiero(): Promise<void> {
  if ( !tsekeSxangxita() ) {
    statuso("ſɭɜ j͐ʃɹ ɭʃᴜ ｡ ſɭэ }ʃᴜ ʌ ſɟᴜ ✔️");
    return;
  }
  const dosieroj = generiDosierojn();
  if ( !cirkuloValidas() || !cirkuloDeDatumojValidas() ){
    statuso("ſɭᴜ ſɭ,w ｡ ſɭɜ j͐ʃɹ ɭʃᴜ");
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
      statuso("j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ }ʃᴜ j͐ʃᴜ kantaoj/ ✔️ ( " + mesagxo + " )");
    } else {
      statuso("ſɭᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ " + mesagxo);
    }
  } catch {
    statuso("ſɭᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ npm run konservilo");
  }
}

// ⟪ ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟫
export const mapoElektilo = elemento<HTMLSelectElement>("mapoElektilo");
export const mapoQoxaElektilo = elemento<HTMLSelectElement>("mapoQoxaElektilo");
export const mapoGrandecoEnigo = elemento<HTMLInputElement>("mapoGrandeco");
export const mapoGrandecoValoro = elemento<HTMLElement>("mapoGrandecoValoro");

export function kodoDeNomo(ksaka: string): string {
  const anstatauxoj: Record<string, string> = { "ĉ": "c", "ĝ": "g", "ĥ": "h", "ĵ": "j", "ŝ": "s", "ŭ": "u", "ä": "a", "ö": "o", "ü": "u" };
  return ksaka.toLowerCase()
    .replace(/[ĉĝĥĵŝŭäöü]/g, c => anstatauxoj[c] ?? c)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 0o50);
}

export function gxisdatigiMapajnElektilojn(): void {
  mapoElektilo.innerHTML = "";
  for ( const m of mapojRegistroj ) {
    const sukf2qani = document.createElement("option");
    sukf2qani.value = m.kodo;
  sukf2qani.textContent = m.ksaka + ( m.aktiva ? " ⭐" : "" ) + ( m.kodo === mapoDatumo.kodo ? " ( ſɭэ ᶗ‹ )" : "" );
    mapoElektilo.appendChild(sukf2qani);
  }
  mapoElektilo.value = mapoDatumo.kodo;
  mapoQoxaElektilo.innerHTML = "";
  for ( const f of QOXA ) {
    const sukf2qani = document.createElement("option");
    sukf2qani.value = f.ruva;
    sukf2qani.textContent = f.ksaka;
    mapoQoxaElektilo.appendChild(sukf2qani);
  }
  mapoQoxaElektilo.value = mapoQoxa;
  mapoGrandecoEnigo.value = String(Math.round(mapoGrandeco));
  mapoGrandecoValoro.textContent = oktala(mapoGrandeco) + " · " + Math.round(mapoGrandeco) + " u";
}

gxisdatigiMapajnElektilojn();

export function sxaltiMapon(kodo: string): void {
  if ( kodo === mapoDatumo.kodo ) return;
  if ( tsekeSxangxita() && !confirm("ſɭɜ j͐ʃɹ ɭʃᴜ ｡ ʃᴜ j͐ʃɹ ɭʃɜ ɭʃᴜ ?") ) {
    gxisdatigiMapajnElektilojn();
    return;
  }
  location.search = "?mapo=" + encodeURIComponent(kodo);
}
mapoElektilo.addEventListener("change", () => sxaltiMapon(mapoElektilo.value));

export async function skribiPerKonservilo(dosieroj: Record<string, string>): Promise<string | null> {
  try {
    const respondo = await fetch(KONSERVILO, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ dosieroj }),
    });
    const mesagxo = await respondo.text();
    if ( respondo.ok ) return mesagxo;
    statuso("ſɭᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ " + mesagxo);
    return null;
  } catch {
    statuso("ſɭᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ ʃᴜ j͐ʃɹ ʌ j͑ʃɔ ſȷэⅎ ｡ ( npm run konservilo )");
    return null;
  }
}

export async function mapoSef4(): Promise<void> {
  const ksaka = prompt("ſɭɔ˞ᴜ ſɭᴜ ʌ ʃᴜ j͐ʃɹ ʌ j͑ʃɔ ſȷэⅎ", "ſɭᴜ ı],ƨɔ ʌ j͑ʃɔ ſȷэⅎ");
  if ( !ksaka ) return;
  const kodo = kodoDeNomo(ksaka);
  if ( !kodo ) { statuso("ſɭɔ˞ᴜ ｡ ſɭɹ ſןᴜ ｡"); return; }
  if ( mapojRegistroj.some(m => m.kodo === kodo) ) { statuso("ʃᴜ j͐ʃɹ ɭʃɜ ｡"); return; }
  mapojRegistroj.push({ kodo, ksaka, aktiva: false, qoxa: mapoQoxa, grandeco: mapoGrandeco });
  statuso("ɭʃɜ ʌ ʃᴜ j͐ʃɹ " + kodo + " …");
  const tseuni = await skribiPerKonservilo(generiDosierojn(kodo));
  if ( !tseuni ) {
    mapojRegistroj = mapojRegistroj.filter(m => m.kodo !== kodo);
    gxisdatigiMapajnElektilojn();
    return;
  }
  statuso("ʃᴜ j͐ʃɹ " + ksaka + " ɭʃɜ ✔️ ｡ ɭʃɜ ʌ ｡");
  location.search = "?mapo=" + encodeURIComponent(kodo);
}

export function mapoAlinomi(): void {
  const nuna = mapojRegistroj.find(m => m.kodo === mapoDatumo.kodo);
  const ksaka = prompt("ſɭɔ˞ᴜ ʌ j͑ʃɔ ſȷэⅎ ʌ ʃᴜ j͐ʃɹ", nuna ? nuna.ksaka : mapoDatumo.kodo);
  if ( !ksaka ) return;
  if ( nuna ) nuna.ksaka = ksaka;
  markiSxangxitan();
  gxisdatigiMapajnElektilojn();
  statuso("ſɭɔ˞ᴜ ɭʃɜ ｡ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ mapoj.ts");
}

export function mapoForigi(): void {
  if ( mapojRegistroj.length <= 1 ) { statuso("ʃᴜ j͐ʃɹ ｡ ſɭɜ ʃɔ ſɟᴜᴜ̩ ɭʃɹ"); return; }
  const nuna = mapojRegistroj.find(m => m.kodo === mapoDatumo.kodo);
  if ( !confirm("ı],ɔ j͑ʃᴜ̭ɔ ɭʃꞇ ʃᴜ j͐ʃɹ „" + ( nuna ? nuna.ksaka : mapoDatumo.kodo ) + "“ ? ( ſɟᴜ ｡ )") ) return;
  mapojRegistroj = mapojRegistroj.filter(m => m.kodo !== mapoDatumo.kodo);
  if ( !mapojRegistroj.some(m => m.aktiva) ) mapojRegistroj[0].aktiva = true;
  markiSxangxitan();
  const sekva = ( mapojRegistroj.find(m => m.aktiva) ?? mapojRegistroj[0] ).kodo;
  location.search = "?mapo=" + encodeURIComponent(sekva);
}

export function mapoElektiAktivan(): void {
  for ( const m of mapojRegistroj ) m.aktiva = m.kodo === mapoDatumo.kodo;
  markiSxangxitan();
  gxisdatigiMapajnElektilojn();
  statuso("ʃᴜ j͐ʃɹ ɭʃɜ ｡ ɭʃᴜ ɭl̀ɹ ɭʃɔ ⭐");
}

export function gxisdatigiQoxan(): void {
  formajRandaj = qoxaPukazN2k(mapoQoxa, mapoGrandeco, 0o100);
  mapoGrandecoValoro.textContent = oktala(mapoGrandeco) + " · " + Math.round(mapoGrandeco) + " u";
  markiSxangxitan();
  gxisdatigiQoxan3D();
  gxisdatigiPlenan2Dn();
  statuso("ſ͕ɭɜ ı],ᴜ " + mapoQoxa + " ｡ ſןᴜ j͐ʃэ " + Math.round(mapoGrandeco)
    + " ｡ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ mapoj.ts");
}

mapoQoxaElektilo.addEventListener("change", () => {
  mapoQoxa = mapoQoxaElektilo.value as Bal2Qoxa;
  gxisdatigiQoxan();
});
mapoGrandecoEnigo.addEventListener("input", () => {
  mapoGrandeco = Number(mapoGrandecoEnigo.value);
  gxisdatigiQoxan();
});
elemento<HTMLButtonElement>("mapoSef4").addEventListener("click", mapoSef4);
elemento<HTMLButtonElement>("mapoAlinomi").addEventListener("click", mapoAlinomi);
elemento<HTMLButtonElement>("mapoForigi").addEventListener("click", mapoForigi);
elemento<HTMLButtonElement>("mapoAktiva").addEventListener("click", mapoElektiAktivan);

// ⟪ ſɭэ ɭʃᴜ , 📃 ⟫
elemento<HTMLButtonElement>("savi").addEventListener("click", saviDosieron);
elemento<HTMLButtonElement>("saviRekte").addEventListener("click", saviRekteAlDosiero);
elemento<HTMLButtonElement>("sargi").addEventListener("click", sargiDosieron);

// ⟪ ſɭэ ɭʃᴜ , ſןw ſɭᴜƴ , 📃 ⟫
interface DosieraLigo {
  PASO: number;
  N: number;
  X0: number;
  Z0: number;
  hal6da: Float32Array;
  k6liqani: Uint8Array;
  habs2: Uint8Array;
  hapaga: Uint8Array;
  historio: HistoriaMomento[];
  refaraHistorio: HistoriaMomento[];
  vem2Kama: HTMLInputElement;
  statuso: ( s2banani: string ) => void;
  gxisdatigiValorojn: () => void;
  gxisdatigiPlenan2Dn: () => void;
  gxisdatigiAkvajnStatistikojn: () => void;
  markiSxangxitan: () => void;
  markiSavitan: () => void;
  tsekeSxangxita: () => boolean;
  SKULPTA_DELTAJ: string;
  SKULPTA_AKVA_MASKO: string;
  SKULPTA_BIOMOJ: string;
  SKULPTA_BESTOJ: string;
  SKULPTA_HAXAIQ: AkvaTsiq[];
  SKULPTA_OBJEKTOJ: MetitaObjekto[];
  SKULPTA_URBOJ: SkulptaKaxte[];
  SKULPTA_VOJOJ: SkulptaK6h6[];
  SKULPTA_DOKOJ: SkulptaPlatqoxa[];
}
export let PASO: number;
export let N: number;
export let X0: number;
export let Z0: number;
export let hal6da: Float32Array;
export let k6liqani: Uint8Array;
export let habs2: Uint8Array;
export let hapaga: Uint8Array;
export let historio: HistoriaMomento[];
export let refaraHistorio: HistoriaMomento[];
export let vem2Kama: HTMLInputElement;
export let statuso: ( s2banani: string ) => void;
export let gxisdatigiValorojn: () => void;
export let gxisdatigiPlenan2Dn: () => void;
export let gxisdatigiAkvajnStatistikojn: () => void;
export let markiSxangxitan: () => void;
export let markiSavitan: () => void;
export let tsekeSxangxita: () => boolean;
export let SKULPTA_DELTAJ: string;
export let SKULPTA_AKVA_MASKO: string;
export let SKULPTA_BIOMOJ: string;
export let SKULPTA_BESTOJ: string;
export let SKULPTA_HAXAIQ: AkvaTsiq[];
export let SKULPTA_OBJEKTOJ: MetitaObjekto[];
export let SKULPTA_URBOJ: SkulptaKaxte[];
export let SKULPTA_VOJOJ: SkulptaK6h6[];
export let SKULPTA_DOKOJ: SkulptaPlatqoxa[];
/* ſɭэ ɭʃᴜ , ꞙɭı , ⟅ ſɭэ ſɭᴜ ,
    @param k ( DosieraLigo ) - ſɭᴜ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ｡ */
export function agordiDosierojn(k: DosieraLigo): void {
  ( { PASO, N, X0, Z0, hal6da, k6liqani, habs2, hapaga, historio, refaraHistorio,
    vem2Kama, statuso, gxisdatigiValorojn, gxisdatigiPlenan2Dn,
    gxisdatigiAkvajnStatistikojn, markiSxangxitan, markiSavitan, tsekeSxangxita,
    SKULPTA_DELTAJ, SKULPTA_AKVA_MASKO, SKULPTA_BIOMOJ, SKULPTA_BESTOJ,
    SKULPTA_HAXAIQ, SKULPTA_OBJEKTOJ, SKULPTA_URBOJ, SKULPTA_VOJOJ,
    SKULPTA_DOKOJ } = k );
  gxisdatigiMapajnElektilojn();
}
