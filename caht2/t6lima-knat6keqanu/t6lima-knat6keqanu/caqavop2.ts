// ≺⧼ ʃᴜ j͐ʃɹ ʌ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ 📃 ⧽≻
import { Habal2 } from "../../../kanta/t6lima-havop2/bal2.js";
import manifesto from "../../../kanta/t6lima-havop2/manifesto.json" with { type: "json" };
import { bal2DeS2kanta } from "../../../kanta/t6lima-havop2/mapregulo.js";
import { QOXA, qoxaPukazN2k } from "../../../skek2/x2x2q/mapqoxa.js";
import { dekodiInt16, dekodiMaskon, dekodi3Bit } from "../../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { catsaraHatsiqn, catsaraSukf2qitanTsiqn, catsaraTsiqTrenatan, catsaraAkvanVem2n,
  tsasaVem2Vem2, hatsiq, s2tasTsasaS23ohk2sain, revek2feTsasa } from "./tsasa.js";
import { catsaraHatoxemani, catsaraSukf2qitanOxemanin, tlak2ObjektoCatsara,
  vepaqTom6Hatoxemani, hazace } from "./zacej.js";
import { catsaraHakaxten, catsaraSukf2qitanKaxten, catsaraHak6h6n, catsaraHaqakaj2n, sukf2qiKaxten,
  tlak2K6h6jnHakaman, sinkronigiHatik, hakaxte, hak6h6, haqakaj2, sukf2qitaKaxte } from "./haqox2n2k.js";
import { tlak2Qoxan3D } from "./vido3d.js";
import { kfe } from "../../x2x2q/dom.js";
import { knak2fecajasai, KNAK2FECAJASAI } from "../../../../kanta/x2x2q/s2cax2l.js";
import type { Bal2Qoxa } from "../../../skek2/x2x2q/mapqoxa.js";
import type { Bal2Vop2 } from "../../../kanta/t6lima-havop2/mapregulo.js";
import type { AkvaTsiq } from "./tsasa.js";
import type { Neq2qObjekto, Knat6keqanuKuba, Knat6keqanuK6h6N2k, Knat6keqanuTap2Qoxa } from "../../../kanta/nala/kaxte/hahunaq.js";
import type { K6h6N2k } from "../../../skek2/qatsiike/k6h6-caxlefkakai.js";
import type { HistoriaMomento } from "./kumu.js";

export const bal2S2kanta = new URLSearchParams(location.search).get("bal2");
export const bal2Vop2 = bal2DeS2kanta(bal2S2kanta);
export let bal2Qoxa: Bal2Qoxa = bal2Vop2.qoxa;
export let bal2Pal6: number = bal2Vop2.pal6;
export let bal2Havalaqaz: Bal2Vop2[] = Habal2.map(m => ( { ...m } ));
export let formajHapukaz = qoxaPukazN2k(bal2Qoxa, bal2Pal6, 0o100);

export function knak2fe(skek2: number): string {
  const n = Math.round(skek2 * 0o100);
  if ( n % 0o100 === 0o0 ) {
    const tuta = n / 0o100;
    return knak2fecajasai(tuta, 0o0);
  }
  return ( n < 0o0 ? "-" : "" ) + "ꞙɭ" + Math.abs(n).toString(0o10).replace( /[0-7]/g, c => KNAK2FECAJASAI[ Number( c ) ] ) + "/ꞙɭıɔɔ";
}
export function kaltok(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while ( b ) { const r = a % b; a = b; b = r; }
  return a || 0o1;
}
export function kanc2q(skek2: number): string | null {
  if ( !Number.isFinite(skek2) ) return null;
  const r = skek2 / Math.PI;
  if ( Math.abs(r) < 0o10 ** -0o12 ) return "0";
  for ( let d = 0o1; d <= 0o20; d++ ) {
    const k = Math.round(r * d);
    if ( Math.abs(r - k / d) < 0o10 ** -0o11 ) {
      if ( k === 0o0 ) return "0";
      const g = kaltok(k, d);
      const kk = k / g, dd = d / g;
      const kaatse = kk < 0o0 ? "-" : "";
      const abso = Math.abs(kk);
      if ( dd === 0o1 ) {
        return abso === 0o1 ? kaatse + "Math.PI" : kaatse + abso + " * Math.PI";
      }
      return abso === 0o1 ? kaatse + "Math.PI / " + dd : kaatse + abso + " * Math.PI / " + dd;
    }
  }
  return null;
}
export function knak2feVem2(skek2: number): string {
  if ( !Number.isFinite(skek2) ) return "null";
  if ( skek2 === 0o0 ) return "0";
  const p = kanc2q(skek2);
  if ( p !== null ) return p;
  if ( Number.isInteger(skek2) && Math.abs(skek2) <= 0o7777777777 ) {
    return knak2fecajasai(skek2, 0o0);
  }
  const n64 = skek2 * 0o100;
  if ( Number.isInteger(n64) && Math.abs(n64) <= 0o7777777777 ) {
    return ( n64 < 0o0 ? "-" : "" ) + "ꞙɭ" + Math.abs(n64).toString(0o10).replace( /[0-7]/g, c => KNAK2FECAJASAI[ Number( c ) ] ) + "/ꞙɭıɔɔ";
  }
  return String(skek2);
}
/* ſɭэ ſɭᴜ , ꞙɭı , ⟅ j͑ʃɜ j͑ʃƨɹ , ſɭэ ֭ſɭэ , ſɭэ ſɭᴜ ,
   j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɹ ſȷɔ ( ɭʃэ ɭʃᴜ ꞙɭı ｡ π ) ɭʃɜ ʌ JSON ⟅
    @param skek2 ( unknown ) - ſɭɹ ſȷɔ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ⟅
@returns ſɭɹ ſȷɔ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ( string ) ⟅ */
export function skribiVem2(skek2: unknown): string {
  if ( skek2 === null || skek2 === undefined ) return "null";
  if ( typeof skek2 === "number" ) return knak2feVem2(skek2);
  if ( typeof skek2 === "boolean" ) return skek2 ? "true" : "false";
  if ( typeof skek2 === "string" ) return JSON.stringify(skek2);
  if ( Array.isArray(skek2) ) return "[ " + skek2.map(v => skribiVem2(v)).join(", ") + " ]";
  const zace = skek2 as Record<string, unknown>;
  const hakek: string[] = [];
  for ( const k in zace ) {
    if ( zace[k] === undefined ) continue;
    hakek.push(JSON.stringify(k) + ": " + skribiVem2(zace[k]));
  }
  return "{ " + hakek.join(", ") + " }";
}
/* ſɭɜ ʃɔ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ ſɭэ ſɭᴜ ,
    @param s2banani ( string ) - ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃɹ ɭʃɜ ( ſɟᴜ ｡ ) ⟅
@returns ſɭɹ ſȷɔ ʌ j͑ʃɹ ɭl̀ɹ ( any ) ｡ ſɭɹ ſȷɔ ɭʃᴜ ɭʃᴜ ⟅ */
export function parziVem2(s2banani: string): any {
  let i = 0o0;
  const sp = () => { while ( i < s2banani.length && /\s/.test(s2banani[i]) ) i++; };
  const tlohk2nik2p2 = (): never => { throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſɟᴜ ſɭɹ ſȷɔ ｡ " + i + " ｡ " + s2banani.slice(i, i + 0o40)); };
  function k2fe(): number {
    sp();
    const m = s2banani.slice(i).match(/^-?0o[0-7]+(?:\/0o[0-7]+)?|^-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/);
    if ( !m ) return tlohk2nik2p2();
    i += m[0o0].length;
    const s = m[0o0];
    if ( /^0o/.test(s) ) {
      const neg = s.startsWith("-");
      const lowak = neg ? s.slice(0o1) : s;
      const hakek = lowak.split("/");
      let v = parseInt(hakek[0o0].slice(0o2), 0o10);
      if ( hakek.length > 0o1 ) v = v / parseInt(hakek[0o1].slice(0o2), 0o10);
      return neg ? -v : v;
    }
    return parseFloat(s);
  }
  function vap6zukani(): number {
    sp();
    const c = s2banani[i];
    if ( c === "-" ) { i++; return -vap6zukani(); }
    if ( c === "(" ) { i++; const v = adicio(); sp(); if ( s2banani[i] !== ")" ) tlohk2nik2p2(); i++; return v; }
    if ( s2banani.startsWith("Math.PI", i) ) { i += "Math.PI".length; return Math.PI; }
    return k2fe();
  }
  function termo(): number {
    let v = vap6zukani();
    for ( ;; ) {
      sp();
      const c = s2banani[i];
      if ( c === "*" ) { i++; v = v * vap6zukani(); }
      else if ( c === "/" ) { i++; v = v / vap6zukani(); }
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
    if ( s2banani[i] !== "\"" ) tlohk2nik2p2();
    let s = "";
    i++;
    for ( ;; ) {
      if ( i >= s2banani.length ) tlohk2nik2p2();
      const c = s2banani[i];
      if ( c === "\"" ) { i++; return s; }
      if ( c === "\\" ) {
        const n = s2banani[i + 0o1];
        if ( n === undefined ) tlohk2nik2p2();
        if ( n === "n" ) s += "\n";
        else if ( n === "t" ) s += "\t";
        else if ( n === "r" ) s += "\r";
        else if ( n === "b" ) s += "\b";
        else if ( n === "f" ) s += "\f";
        else if ( n === "u" ) { s += String.fromCharCode(parseInt(s2banani.slice(i + 0o2, i + 0o6), 0o20)); i += 0o4; }
        else s += n;
        i += 0o2;
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
        if ( s2banani[i] !== ":" ) tlohk2nik2p2();
        i++;
        o[k] = skek2();
        sp();
        const d = s2banani[i];
        if ( d === "," ) { i++; continue; }
        if ( d === "}" ) { i++; return o; }
        tlohk2nik2p2();
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
        tlohk2nik2p2();
      }
    }
    if ( c === "\"" ) return stringo();
    if ( s2banani.startsWith("true", i) ) { i += 0o4; return true; }
    if ( s2banani.startsWith("false", i) ) { i += 0o5; return false; }
    if ( s2banani.startsWith("null", i) ) { i += 0o4; return null; }
    return adicio();
  }
  sp();
  const v = skek2();
  sp();
  if ( i !== s2banani.length ) tlohk2nik2p2();
  return v;
}
export function kozunu64DeHacacaja(hacacaja: Uint8Array): string {
  let s2banani = "";
  const k6liq = 0o30000;
  for ( let i = 0o0; i < hacacaja.length; i += k6liq ) {
    s2banani += btoa(String.fromCharCode(...hacacaja.subarray(i, i + k6liq)));
  }
  return s2banani;
}
export function kozunu64DeInt16(hatskek2: Int16Array): string {
  const hacacaja = new Uint8Array(hatskek2.length * 0o2);
  const kix2 = new DataView(hacacaja.buffer);
  for ( let i = 0o0; i < hatskek2.length; i++ ) kix2.setInt16(i * 0o2, hatskek2[i], true);
  return kozunu64DeHacacaja(hacacaja);
}
export function kozunu64DeMasko(maskoHavop2: Uint8Array): string {
  const hacacaja = new Uint8Array(Math.ceil(maskoHavop2.length / 0o10));
  for ( let i = 0o0; i < maskoHavop2.length; i++ ) if ( maskoHavop2[i] ) hacacaja[i >> 0o3] |= 0o1 << ( i & 0o7 );
  return kozunu64DeHacacaja(hacacaja);
}
export function kozunu64DeHabs2(bs2Havop2: Uint8Array): string {
  const hacacaja = new Uint8Array(Math.ceil(( bs2Havop2.length * 0o3 ) / 0o10));
  for ( let i = 0o0; i < bs2Havop2.length; i++ ) {
    const b = i * 0o3;
    hacacaja[b >> 0o3] |= ( bs2Havop2[i] & 0o7 ) << ( b & 0o7 );
    if ( ( b & 0o7 ) > 0o5 ) hacacaja[( b >> 0o3 ) + 0o1] |= ( bs2Havop2[i] & 0o7 ) >> (0o10 - ( b & 0o7 ));
  }
  return kozunu64DeHacacaja(hacacaja);
}
export function kozunu64DeHapaga(pagaHavop2: Uint8Array): string {
  const hacacaja = new Uint8Array(Math.ceil(pagaHavop2.length * 0o3 / 0o10));
  for ( let i = 0o0; i < pagaHavop2.length; i++ ) {
    const b = i * 0o3;
    const v = pagaHavop2[i] & 0o7;
    hacacaja[b >> 0o3] |= v << ( b & 0o7 );
    if ( ( b & 0o7 ) > 0o5 ) hacacaja[( b >> 0o3 ) + 0o1] |= v >> (0o10 - ( b & 0o7 ));
  }
  return kozunu64DeHacacaja(hacacaja);
}
export function kvantigiHal6dan(): Int16Array {
  const kvantigita = new Int16Array(N * N);
  for ( let i = 0o0; i < hal6da.length; i++ ) {
    kvantigita[i] = Math.max(-0o77777, Math.min(0o77777, Math.round(hal6da[i] * 0o20)));
  }
  return kvantigita;
}
export function cirkuloValidas(): boolean {
  try {
    const kvantigita = kvantigiHal6dan();
    const d = dekodiInt16(kozunu64DeInt16(kvantigita));
    const m = dekodiMaskon(kozunu64DeMasko(k6liqani), N * N);
    const b = dekodi3Bit(kozunu64DeHabs2(habs2), N * N);
    const be = dekodi3Bit(kozunu64DeHapaga(hapaga), N * N);
    if ( !d || !m || !b || !be || d.length !== kvantigita.length ) return false;
    for ( let i = 0o0; i < kvantigita.length; i++ ) {
      if ( d[i] !== kvantigita[i] ) return false;
    }
    for ( let i = 0o0; i < k6liqani.length; i++ ) {
      if ( m[i] !== k6liqani[i] ) return false;
    }
    for ( let i = 0o0; i < habs2.length; i++ ) {
      if ( b[i] !== habs2[i] ) return false;
    }
    for ( let i = 0o0; i < hapaga.length; i++ ) {
      if ( be[i] !== hapaga[i] ) return false;
    }
    return true;
  } catch { return false; }
}
export function cirkuloDeHavop2Validas(): boolean {
  try {
    return JSON.stringify(parziVem2(skribiVem2(hazace))) === JSON.stringify(hazace)
      && JSON.stringify(parziVem2(skribiVem2(hatsiq))) === JSON.stringify(hatsiq)
      && JSON.stringify(parziVem2(skribiVem2(hakaxte))) === JSON.stringify(hakaxte)
      && JSON.stringify(parziVem2(skribiVem2(hak6h6))) === JSON.stringify(hak6h6)
      && JSON.stringify(parziVem2(skribiVem2(haqakaj2))) === JSON.stringify(haqakaj2);
  } catch { return false; }
}
// ⟪ ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟫
export const DATUMDOSIEROJ = Object.keys(manifesto.datumaj).map(n => n.replace(/\.ts$/, ""));
export function dosierujo(s2kanta: string): string { return "t6lima-havop2/" + s2kanta + "/"; }
export const bal2Dosierujo = dosierujo(bal2Vop2.s2kanta);
export const DOSIERATITOLO = {
  [bal2Dosierujo + "qox2n2k.ts"]: "// ≺⧼ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ 📃 ⧽≻",
  [bal2Dosierujo + "tsasa.ts"]: "// ≺⧼ ſᶘᴜ j͑ʃᴜ 📃 ⧽≻",
  [bal2Dosierujo + "tsasahatsiq.ts"]: "// ≺⧼ ſᶘꞇȝ 🌊 ⧽≻",
  [bal2Dosierujo + "habs2.ts"]: "// ≺⧼ ʃɔ˞ɹ 📃 ⧽≻",
  [bal2Dosierujo + "hapaga.ts"]: "// ≺⧼ ſןᴜ ſ͔ɭᴜ 📃 ⧽≻",
  [bal2Dosierujo + "hazace.ts"]: "// ≺⧼ j͑ʃƽɔ ſɭɹ ı],ɔ ŋᷠᴜ j͑ʃᴜꞇ 📃 ⧽≻",
  [bal2Dosierujo + "hakaxte.ts"]: "// ≺⧼ ſɭᴜ ı],ƨɔ 📃 ⧽≻",
  [bal2Dosierujo + "hak6h6.ts"]: "// ≺⧼ ſɭэ ֭ſɭэ 📃 ⧽≻",
  "t6lima-havop2/bal2.ts": "// ≺⧼ ʃᴜ j͐ʃɹ 🗺️ ⧽≻",
  "t6lima-havop2/tik.ts": "// ≺⧼ ʃᴜ j͐ʃɹ 📃 ⧽≻",
};
export function generiHacaqavop2(s2kanta: string = bal2Vop2.s2kanta): Record<string, string> {
  const dosierujoDeBal2 = dosierujo(s2kanta);
  sinkronigiHatik();
  const kvantigita = kvantigiHal6dan();
  let hal6daAktivaj = false, maskoAktiva = false, habs2Aktivaj = false, hapagaAktivaj = false;
  for ( let i = 0o0; i < kvantigita.length; i++ ) if ( kvantigita[i] !== 0o0 ) { hal6daAktivaj = true; break; }
  for ( let i = 0o0; i < k6liqani.length; i++ ) if ( k6liqani[i] ) { maskoAktiva = true; break; }
  for ( let i = 0o0; i < habs2.length; i++ ) if ( habs2[i] ) { habs2Aktivaj = true; break; }
  for ( let i = 0o0; i < hapaga.length; i++ ) if ( hapaga[i] ) { hapagaAktivaj = true; break; }
  const delta64 = hal6daAktivaj ? kozunu64DeInt16(kvantigita) : "";
  const masko64 = maskoAktiva ? kozunu64DeMasko(k6liqani) : "";
  const bs264 = habs2Aktivaj ? kozunu64DeHabs2(habs2) : "";
  const paga64 = hapagaAktivaj ? kozunu64DeHapaga(hapaga) : "";
  const tik = hal6daAktivaj || maskoAktiva || habs2Aktivaj || hapagaAktivaj;
  const x2x2qKom = [
    "// ſɟᴜᴜ̩ ɭʃɹ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ( hacaht2/t6lima-knat6keqanu/t6lima-knat6keqanu.html ) ⟅",
    "// ( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ſɭɜ ʃɔ ſɟᴜᴜ̩ ɭʃɹ ɭʃɜ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ⟅",
  ];
  const qox2n2kS2bana = [
    "// ≺⧼ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ 📃 ⧽≻",
    ...x2x2qKom,
    "",
    "// ⟨ ſɭɹ ſןᴜ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ 📃 ⟩ ｡ ſɭᴜ ſןᴜ ｡ ſɭɜ ｡ ſᶘꞇȝ ｡",
    "export const SKULPTAPASO = " + knak2fe(Tona) + ";",
    "export const SKULPTAN = " + knak2fe(N) + ";",
    "export const SKULPTAORIGINO = [ " + knak2fe(X0) + ", " + knak2fe(Z0) + " ];",
    "export const SKULPTAAKTIVA = " + ( tik ? "true" : "false" ) + ";",
    "export const SKULPTADELTAJ = " + JSON.stringify(delta64) + ";",
  ].join("\n");
  const tsasaS2bana = [
    "// ≺⧼ ſᶘᴜ j͑ʃᴜ 📃 ⧽≻",
    ...x2x2qKom,
    "",
    "// ⟨ ſᶘᴜ j͑ʃᴜ ɭʃᴜ 📃 ⟩ ｡ ſᶘꞇȝ ｡",
    "// ( ſᶘᴜ j͑ʃᴜ ｡ ſᶘᴜ j͑ʃᴜ ｡",
    "// ſᶘꞇȝ ʌ kanta/nala/tsasaVek2fe.ts ) ⟅",
    "export const SKULPTAAKVANIVELO = " + knak2fe(tsasaVem2Vem2) + ";",
    "export const SKULPTAAKVAMASKO = " + JSON.stringify(masko64) + ";",
  ].join("\n");
  const tsiqS2bana = [
    "// ≺⧼ ſᶘꞇȝ 🌊 ⧽≻",
    ...x2x2qKom,
    "",
    "// ⟨ ſᶘꞇȝ ɭʃᴜ 📃 ⟩ ｡ ſᶘꞇȝ ｡ ſᶘᴜ j͑ʃᴜ ｡",
    "// ſᶘꞇȝ ſɭɹ ſȷɔ ɭl̀ᴜ j͑ʃᴜ ( kanta/nala/tsasaVek2fe.ts ) ｡",
    "// ſᶘᴜ j͑ʃᴜ ｡ j͑ʃɹ ı],w ɽ͑ʃ'w ⟅ ſᶘꞇȝ ɭʃᴜ - x, z ( }ʃᴜ j͐ʃᴜ",
    "// ) ｡ j͐ʃᴜɔ˞ ( j͐ʃᴜɔ˞ ſɭᴜ = ſɭэ j͑ʃꞇ ſɭɜ ſɟᴜ ) ⟅",
    "export const SKULPTAHAXAIQ = " + skribiVem2(hatsiq) + ";",
  ].join("\n");
  const bs2Dosiero = [
    "// ≺⧼ ʃɔ˞ɹ 📃 ⧽≻",
    ...x2x2qKom,
    "",
    "// ⟨ ſɭɜ ſɭ,w j͑ʃƨɹ 📃 ⟩ ( 0 = ſɭᴜ ſןᴜ ɭʃᴜ ｡ 1 = ſɭƨw ֭ſɭᴜ ｡ 2 = j͐ʃɜ ɭʃᴜ ｡ 3 = ſ͕ɭw }ʃɹ ｡",
    "// 4 = ı],ᴜ ſ̀ȷɔ ʌ ſᶘᴜ j͑ʃᴜ ｡ 5 = ſɭᴜ ſןɹ ɭʃɜ ) ⟅",
    "export const SKULPTABIOMOJ = " + JSON.stringify(bs264) + ";",
  ].join("\n");
  const pagaDosiero = [
    "// ≺⧼ ſןᴜ ſ͔ɭᴜ 📃 ⧽≻",
    ...x2x2qKom,
    "",
    "// ⟨ ſɭɜ ſɭ,w ſןᴜ ſ͔ɭᴜ 📃 ⟩ ( 1 = ſןᴜ ſ͔ɭᴜ ʌ ſᶘᴜ j͑ʃᴜ ｡ 2 = ſᶘɹ ſɭᴜ ｡ 4 = NPC ) ⟅",
    "export const SKULPTABESTOJ = " + JSON.stringify(paga64) + ";",
  ].join("\n");
  const oxemaniS2bana = [
    "// ≺⧼ j͑ʃƽɔ ſɭɹ ı],ɔ ŋᷠᴜ j͑ʃᴜꞇ 📃 ⧽≻",
    ...x2x2qKom,
    "// ſɟᴜᴜ̩ ɭʃɹ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ｡ ſɭᴜ ｡",
    "// 🛶 ｡ 🚀 ｡ 🏮 ｡ ⭐ ｡",
    "// 🏛️ ｡ ſɟᴜ ｡ ſɟᴜ ｡ ⟅",
    "// ſɭɹ ſȷɔ ɭʃᴜ - x, z ( 0.25 ) ｡ ( lam2v | taksal | tlexlefhxakai",
    "// | tlexlefp2sai | t6keq | xabe | akvapaga | temek | npco | qaman2 | turo",
    "// | kap2 | geqqa | kasafeo | ka5asexaz | hxeuxfo | hxeuxfoPa12 | kekufxeso | s2kaj2 | spacosxipo ) ,",
    "// ſɭɜ ｡ j͑ʃɹ j͑ʃᴜ ʃɜ ｡ ſןᴜ ſ͔ɭᴜ ｡ ſɭᴜ ſɭˬꞇƽ ｡ ſɭᴜ ſןɹ ｡ ſᶘꞇȝ ｡",
    "export const SKULPTAOBJEKTOJ = " + skribiVem2(hazace) + ";",
  ].join("\n");
  const kaxteS2bana = [
    "// ≺⧼ ſɭᴜ ı],ƨɔ 📃 ⧽≻",
    ...x2x2qKom,
    "// ſɭᴜ ı],ƨɔ ʌ }ʃᴜ j͐ʃᴜ ｡ ſɭɹ ſןᴜ ｡",
    "// ſɭɹ ſןᴜ ｡ ſɭᴜ ı],ƨɔ ɭʃɜ ŋᷠэ ⟅ ſɭᴜ ı],ƨɔ ｡ ptaluPal6 ｡",
    "// k6liqPal6 ( vakox2qita | kvar ) ｡ ofsX, ofsZ, kekufxeso ( ſɭᴜ ｡",
    "// ſɭɹ ſȷɔ ) ｡ hahufwuk2 ( ſɭᴜ ｡ ) ｡ hateru ( ſןᴜ ɭʃᴜ ʌ ſɭɹ ſןᴜ",
    "// ｡ \"c,r\" ｡ \"c,r,SUB\" → ſɭᴜ ) ｡ tlunakHak6liq",
    "// ( x, z, hunaq, rot, veq6k2, stacia, konektita ) ⟅",
    "export const SKULPTAHAKAXTE = " + skribiVem2(hakaxte) + ";",
  ].join("\n");
  const k6h6S2bana = [
    "// ≺⧼ ſɭэ ֭ſɭэ 📃 ⧽≻",
    ...x2x2qKom,
    "// ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ ( ſɭᴜ ｡ ſɭэ ֭ſɭэ ) ｡",
    "// j͑ʃɔ ſȷꞇ }ʃꞇ ｡ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ ſɭɹ ſȷɔ ｡",
    "// ſɭэ ֭ſɭэ ʌ ſɭᴜ ſןᴜ ｡ ⟅",
    "export const SKULPTAHAKAS2KANTA = " + skribiVem2(hak6h6) + ";",
    "export const SKULPTAHAQAKAJ2 = " + skribiVem2(haqakaj2) + ";",
  ].join("\n");
// ⟪ ſɭэ ſɭᴜ , ſןw ſɭᴜƴ , 📃 ⟫
  const bal2Cu3u = bal2Havalaqaz.find(m => m.s2kanta === bal2Vop2.s2kanta);
  if ( bal2Cu3u ) { bal2Cu3u.qoxa = bal2Qoxa; bal2Cu3u.pal6 = bal2Pal6; }
  const bal2S2bana = [
    "// ≺⧼ ʃᴜ j͐ʃɹ 🗺️ ⧽≻",
    ...x2x2qKom,
    "",
    "// ⟨ ʃᴜ j͐ʃɹ ʌ }ʃᴜ j͐ʃᴜ 📃 ⟩ ｡ ʃᴜ j͐ʃɹ ɭʃᴜ ｡",
    "// ( kanta/t6lima-havop2/<s2kanta>/ ｡ ſɭɹ ſןᴜ ｡ ſᶘᴜ j͑ʃᴜ ｡ ſɭɜ ſɭ,w j͑ʃƨɹ ｡ ſןᴜ ſ͔ɭᴜ ｡",
    "// ſɭɹ ſȷɔ ｡ ſɭᴜ ı],ƨɔ ｡ ſɭэ ֭ſɭэ ) ⟅ ſɭᴜ ſןᴜ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ",
    "// ʃᴜ j͐ʃɹ ɭʃᴜ ｡ ſɭэ ᶗ‹ ｡ ſɭᴜ ｡ }ʃᴜ j͐ʃᴜ ｡",
    "// ʃᴜ j͐ʃɹ ʌ j͑ʃw ſןͷ̗ɔͷ̗ ꞁȷ̀ᴜꞇ ( tik.ts ) ⟅",
    "//",
    "// qoxa ｡ ſɭэ }ʃᴜ ʌ ſ͕ɭɜ ı],ᴜ ( skek2/x2x2q/mapqoxa.ts ) ｡ j͑ʃɹ j͑ʃᴜ ʃɜ (",
    "// ſɭɜ ſɭᴜ ) ｡ ſɭɜ ſɭᴜ ı],ᴜ ｡ ſɭɜ ı],ᴜ ⟅",
    "// pal6 ｡ ſɭэ }ʃᴜ ʌ ſ͕ɭɜ ı],ᴜ ｡ ſɭᴜ ſɭˬꞇƽ ｡",
    "// ſɭэ }ʃᴜ ʌ ſɭɜ ſɭᴜ ı],ᴜ ｡ ſɭɜ ı],ᴜ ⟅",
    "//",
    "// ſɭɹ ſȷɔ ｡ ſɟᴜᴜ̩ ɭʃɹ ｡ kanta/t6lima-havop2/mapregulo.ts ⟅",
    "import type { Bal2Vop2 } from \"./mapregulo.js\";",
    "",
    "export const Habal2: Bal2Vop2[] = [",
    ...bal2Havalaqaz.map(m => "  { s2kanta: " + JSON.stringify(m.s2kanta) + ", ksaka: " + JSON.stringify(m.ksaka)
      + ", tik: " + ( m.tik ? "true" : "false" ) + ", qoxa: " + JSON.stringify(m.qoxa)
      + ", pal6: " + knak2fe(m.pal6) + " },"),
    "];",
  ].join("\n");
  const tikS2kanta = ( bal2Havalaqaz.find(m => m.tik) ?? bal2Havalaqaz[0o0] ).s2kanta;
  const tikS2bana = [
    "// ≺⧼ ʃᴜ j͐ʃɹ 📃 ⧽≻",
    ...x2x2qKom,
    "",
    "// ⟨ ʃᴜ j͐ʃɹ ʌ j͑ʃw ſןͷ̗ɔͷ̗ ꞁȷ̀ᴜꞇ 📃 ⟩ ｡ ʃᴜ j͐ʃɹ ｡",
    "// }ʃᴜ j͐ʃᴜ ɭʃɜ ⟅ ʃᴜ j͐ʃɹ ɭʃᴜ ( bal2.ts ) ｡ ſɟᴜ ｡",
    "// ſɟᴜ ｡ ꞙɭ" + DATUMDOSIEROJ.length.toString(0o10) + " ｡ ſɭᴜ ı],ƨɔ ɭʃɜ ｡",
    "// ( kozu.ts, kaxte.ts, ... ) ｡ ſɭᴜ ſןᴜ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ",
    "// ɭʃɜ ｡ ʃᴜ j͐ʃɹ ʌ j͑ʃw ſןͷ̗ɔͷ̗ ꞁȷ̀ᴜꞇ ⟅",
    ...DATUMDOSIEROJ.map(d => "export * from \"./" + tikS2kanta + "/" + d + ".js\";"),
  ].join("\n");
  return {
    [dosierujoDeBal2 + "qox2n2k.ts"]: qox2n2kS2bana,
    [dosierujoDeBal2 + "tsasa.ts"]: tsasaS2bana,
    [dosierujoDeBal2 + "tsasahatsiq.ts"]: tsiqS2bana,
    [dosierujoDeBal2 + "habs2.ts"]: bs2Dosiero,
    [dosierujoDeBal2 + "hapaga.ts"]: pagaDosiero,
    [dosierujoDeBal2 + "hazace.ts"]: oxemaniS2bana,
    [dosierujoDeBal2 + "hakaxte.ts"]: kaxteS2bana,
    [dosierujoDeBal2 + "hak6h6.ts"]: k6h6S2bana,
    "t6lima-havop2/bal2.ts": bal2S2bana,
    "t6lima-havop2/tik.ts": tikS2bana,
  };
}
export function b6tem2Havop2nElBal2(hacaqavop2: Record<string, string>): boolean {
  const bok = ( ksaka: string ): string | null => {
    const cakukkaj2sai = "export const " + ksaka + " = ";
    for ( const t of Object.values(hacaqavop2) ) {
      const i = t.indexOf(cakukkaj2sai);
      if ( i < 0o0 ) continue;
      const resto = t.slice(i + cakukkaj2sai.length);
      const e = resto.indexOf(";");
      if ( e < 0o0 ) continue;
      return resto.slice(0o0, e).trim();
    }
    return null;
  };
  const oktalaNombro = ( s: string | null ): number | null => {
    if ( s === null ) return null;
    const negativa = s.startsWith("-");
    const lowak = negativa ? s.slice(0o1) : s;
    const hakek = lowak.split("/");
    const numeratoro = parseInt(hakek[0o0].replace(/^0o/, ""), 0o10);
    const denominatoro = hakek.length > 0o1 ? parseInt(hakek[0o1].replace(/^0o/, ""), 0o10) : 0o1;
    const skek2 = numeratoro / denominatoro;
    return negativa ? -skek2 : skek2;
  };
  if ( oktalaNombro(bok("SKULPTAPASO")) !== Tona || oktalaNombro(bok("SKULPTAN")) !== N ) return false;
  const tsiq = bok("SKULPTAORIGINO");
  if ( tsiq ) {
    const hakek = tsiq.replace(/[\[\]]/g, "").split(",");
    if ( hakek.length !== 0o2
      || oktalaNombro(hakek[0o0].trim())!== X0
      || oktalaNombro(hakek[0o1].trim())!== Z0 ) return false;
  }
  const vem22 = oktalaNombro(bok("SKULPTAAKVANIVELO"));
  const malpaku = ( s: string | null ): string | null => ( s === null ? null : s.replace(/^"|"$/g, "") );
  const deltaKruda = malpaku(bok("SKULPTADELTAJ"));
  if ( deltaKruda !== null ) {
    hal6da.fill(0o0);
    const d = dekodiInt16(deltaKruda);
    if ( d ) for ( let i = 0o0; i < hal6da.length && i < d.length; i++ ) hal6da[i] = d[i] / 0o20;
  }
  const maskoKruda = malpaku(bok("SKULPTAAKVAMASKO"));
  if ( maskoKruda !== null ) {
    k6liqani.fill(0o0);
    const m = dekodiMaskon(maskoKruda, N * N);
    if ( m ) k6liqani.set(m);
  }
  const bs2Kruda = malpaku(bok("SKULPTABIOMOJ"));
  if ( bs2Kruda !== null ) {
    habs2.fill(0o0);
    const b = dekodi3Bit(bs2Kruda, N * N);
    if ( b ) habs2.set(b);
  }
  const pagaKruda = malpaku(bok("SKULPTABESTOJ"));
  if ( pagaKruda !== null ) {
    hapaga.fill(0o0);
    const be = dekodi3Bit(pagaKruda, N * N);
    if ( be ) hapaga.set(be);
  }
  const fon = bok("SKULPTAHAXAIQ");
  if ( fon !== null ) {
    try {
      const parzitaj = parziVem2(fon);
      if ( Array.isArray(parzitaj) ) catsaraHatsiqn(parzitaj.map(f => ( {
        x: Number(f && f.x) || 0o0,
        z: Number(f && f.z) || 0o0,
        las: Math.max(0o0, Number(f && f.las) || 0o0),
      } )));
    } catch { }
    catsaraSukf2qitanTsiqn(-0o1);
    catsaraTsiqTrenatan(-0o1);
    tlak2AkvajnHavop2kekai();
  }
  const oj = bok("SKULPTAOBJEKTOJ");
  if ( oj !== null ) {
    try { catsaraHatoxemani(parziVem2(oj) ?? []); } catch { }
    catsaraSukf2qitanOxemanin(-0o1);
    tlak2ObjektoCatsara();
    vepaqTom6Hatoxemani();
  }
  const kas2kanta = bok("SKULPTAHAKAS2KANTA");
  const dok = bok("SKULPTAHAQAKAJ2");
  const uj = bok("SKULPTAHAKAXTE");
  try {
    const parzitaj = uj !== null ? parziVem2(uj) : null;
    if ( parzitaj && Array.isArray(parzitaj) && parzitaj.length ) catsaraHakaxten(parzitaj.map(u => ( {
      ksaka: String(u && u.ksaka !== undefined ? u.ksaka : "ſɭᴜ ı],ƨɔ"),
      ptaluPal6: Number(u && u.ptaluPal6) || 0o1,
      k6liqPal6: u && u.k6liqPal6 === "kvar" ? "kvar" : "vakox2qita",
      ofsX: Number(u && u.ofsX) || 0o0,
      ofsZ: Number(u && u.ofsZ) || 0o0,
      kekufxeso: !!( u && u.kekufxeso ),
      hahufwuk2: !( u && u.hahufwuk2 === false ),
      hateru: u && u.hateru && typeof u.hateru === "object" && !Array.isArray(u.hateru) ? { ...u.hateru } : undefined,
      tlunakHak6liq: Array.isArray(u && u.tlunakHak6liq) ? u.tlunakHak6liq.map(( b: any ) => ( {
        x: Number(b && b.x) || 0o0,
        z: Number(b && b.z) || 0o0,
        hunaq: b && typeof b.hunaq === "string" ? b.hunaq : "qaman2",
        rot: Number(b && b.rot) || 0o0,
        veq6k2: b && typeof b.veq6k2 === "string" ? b.veq6k2 : "sost2",
        stacia: !!( b && b.stacia ),
        konektita: !!( b && b.konektita ),
      } )) : [],
    } )));
  } catch { }
  if ( !hakaxte.length ) catsaraHakaxten([ { ksaka: "Geles", ptaluPal6: 0o3, k6liqPal6: "vakox2qita", ofsX: 0o0, ofsZ: 0o0 } ]);
  catsaraSukf2qitanKaxten(Math.max(0o0, Math.min(sukf2qitaKaxte, hakaxte.length - 0o1)));
  sukf2qiKaxten(sukf2qitaKaxte);
  try {
    const parzV = kas2kanta ? parziVem2(kas2kanta) : null;
    if ( parzV && Array.isArray(parzV) ) catsaraHak6h6n(parzV.map(( v: any ) => ( { ...v, n2k: v.n2k.map(( p: any ) => [ p[0o0], p[0o1] ] as K6h6N2k) } )));
  } catch { }
  try {
    const parz = dok ? parziVem2(dok) : null;
    if ( parz && Array.isArray(parz) ) catsaraHaqakaj2n(parz.map(d => ( { ...d } )));
  } catch { }
  tlak2K6h6jnHakaman();
  if ( vem22 !== null ) {
    catsaraAkvanVem2n(vem22);
    vem2Kama.value = String(tsasaVem2Vem2);
  }
  tlak2Haskek2();
  historio.length = 0o0;
  refaraHistorio.length = 0o0;
  s2tasTsasaS23ohk2sain();
  revek2feTsasa();
  return true;
}
export function b6tem2Havop2nElS2kanta(): void {
  const d = dekodiInt16(SKULPTADELTAJ);
  if ( d ) for ( let i = 0o0; i < hal6da.length && i < d.length; i++ ) hal6da[i] = d[i] / 0o20;
  const m = dekodiMaskon(SKULPTAAKVAMASKO, N * N);
  if ( m ) k6liqani.set(m);
  const b = dekodi3Bit(SKULPTABIOMOJ, N * N);
  if ( b ) habs2.set(b);
  const be = dekodi3Bit(SKULPTABESTOJ, N * N);
  if ( be ) hapaga.set(be);
  try {
    catsaraHatsiqn(Array.isArray(SKULPTAHAXAIQ) ? SKULPTAHAXAIQ.map(f => ( { ...f } )) : []);
  } catch { catsaraHatsiqn([]); }
  catsaraHatoxemani(SKULPTAOBJEKTOJ.map(o => ( { ...o } )));
  catsaraSukf2qitanOxemanin(-0o1);
  tlak2ObjektoCatsara();
  vepaqTom6Hatoxemani();
  try {
    catsaraHakaxten(Array.isArray(SKULPTAHAKAXTE) ? SKULPTAHAKAXTE.map(u => ( { ...u } )) : []);
  } catch { catsaraHakaxten([]); }
  if ( !hakaxte.length ) catsaraHakaxten([ { ksaka: "Geles", ptaluPal6: 0o3, k6liqPal6: "vakox2qita", ofsX: 0o0, ofsZ: 0o0 } ]);
  catsaraSukf2qitanKaxten(0o0);
  sukf2qiKaxten(0o0);
  try {
    if ( SKULPTAHAKAS2KANTA && Array.isArray(SKULPTAHAKAS2KANTA) ) catsaraHak6h6n(SKULPTAHAKAS2KANTA.map(v => ( { ...v, n2k: v.n2k.map(p => [ p[0o0], p[0o1] ] as K6h6N2k) } )));
  } catch { }
  try {
    const parz = SKULPTAHAQAKAJ2;
    if ( parz && Array.isArray(parz) ) catsaraHaqakaj2n(parz.map(d => ( { ...d } )));
  } catch { }
  tlak2K6h6jnHakaman();
}

// ⟪ ſןw ſɭᴜƴ , ſɭэ ſɭᴜ , 📃 ⟫
export let dosierajTenhacaht2: Record<string, FileSystemFileHandle> = {};
/* ſןw ſɭᴜƴ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ ſɭэ ſɭᴜ ,
@returns ſɭᴜ ſɟᴜ ſ͕ɭᴜ ( Promise<IDBDatabase> ) ⟅ */
export function idbH6w6i(): Promise<IDBDatabase> {
  return new Promise(( solvi, rifuzi ) => {
    const peto = indexedDB.open("t6lima-knat6keqanu", 0o1);
    peto.onupgradeneeded = () => { peto.result.createObjectStore("hacakuk"); };
    peto.onsuccess = () => solvi(peto.result);
    peto.onerror = () => rifuzi(peto.error);
  });
}
export async function vetlaqiDosieranCaqaxema(cakuk: FileSystemFileHandle, ksaka: string): Promise<void> {
  try {
    const db = await idbH6w6i();
    await new Promise<void>(( solvi, rifuzi ) => {
      const tx = db.transaction("hacakuk", "readwrite");
      tx.objectStore("hacakuk").put(cakuk, "dosiero:" + ksaka);
      tx.oncomplete = () => solvi();
      tx.onerror = () => rifuzi(tx.error);
    });
  } catch { }
}
export async function b6tem2DosierajnTenhacaht2(): Promise<void> {
  try {
    const db = await idbH6w6i();
    const butiko = db.transaction("hacakuk").objectStore("hacakuk");
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
      if ( t ) dosierajTenhacaht2[ksaka] = t;
    }
  } catch { }
}
export async function forgesiDosieranCaqaxema(ksaka: string): Promise<void> {
  delete dosierajTenhacaht2[ksaka];
  try {
    const db = await idbH6w6i();
    await new Promise<void>(( solvi, rifuzi ) => {
      const tx = db.transaction("hacakuk", "readwrite");
      tx.objectStore("hacakuk").delete("dosiero:" + ksaka);
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
export async function skribiPerCaqaxema(cakuk: FileSystemFileHandle, s2banani: string): Promise<boolean> {
  try {
    const skribilo = await cakuk.createWritable();
    await skribilo.write(s2banani);
    await skribilo.close();
    s2tasSavitan();
    statuso("j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ }ʃᴜ j͐ʃᴜ " + cakuk.name + " ✔️");
    return true;
  } catch { return false; }
}
export async function saviDosieron(): Promise<void> {
  const hacaqavop2 = generiHacaqavop2();
  if ( !cirkuloValidas() || !cirkuloDeHavop2Validas() ){
    statuso("ſɭᴜ ſɭ,w ｡ ſɭɜ j͐ʃɹ ɭʃᴜ");
    return;
  }
  const masukf2q = window.showSaveFilePicker;
  if ( !masukf2q ) {
    for ( const [ ksaka, s2banani ] of Object.entries(hacaqavop2) ) elSxuti(s2banani, ksaka);
    s2tasSavitan();
    statuso("ɭʃɜ ʌ ſɭᴜ ſ͕ɭᴜ ｡ kanta/ ｡ j͑ʃɹ ɭʃɜ j͑ʃᴜᶗ‹");
    return;
  }
  for ( const [ ksaka, s2banani ] of Object.entries(hacaqavop2) ) {
    let cakuk: FileSystemFileHandle | null = dosierajTenhacaht2[ksaka] ?? null;
    if ( cakuk && !await skribiPerCaqaxema(cakuk, s2banani) ) {
      statuso("ſɟᴜ ｡ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ");
      await forgesiDosieranCaqaxema(ksaka);
      cakuk = null;
    }
    if ( !cakuk ) {
      try {
        cakuk = await masukf2q({
          suggestedName: ksaka,
          types: [ { description: "ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ TypeScript", accept: { "text/plain": [ ".ts" ] } } ],
        });
      } catch {
        statuso("ſɭɜ j͐ʃɹ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ｡ j͑ʃ'ɔ ſ̀ȷᴜȝ ｡");
        return;
      }
      if ( !await skribiPerCaqaxema(cakuk, s2banani) ) {
        elSxuti(s2banani, ksaka);
        continue;
      }
      dosierajTenhacaht2[ksaka] = cakuk;
      await vetlaqiDosieranCaqaxema(cakuk, ksaka);
    }
  }
}
export async function sargiDosieron(): Promise<void> {
  const masukf2q = window.showOpenFilePicker;
  if ( !masukf2q ) {
    statuso("ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃɹ ɭʃɜ j͑ʃᴜᶗ‹ ｡ Chromium");
    return;
  }
  try {
    const [ cakuk ] = await masukf2q({
          types: [ { description: "ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ TypeScript", accept: { "text/plain": [ ".ts" ] } } ],
      multiple: false,
    });
    const dosiero = await cakuk.getFile();
    const s2banani = await dosiero.text();
    if ( b6tem2Havop2nElBal2({ [ cakuk.name ]: s2banani }) ) {
      const ksaka = Object.keys(DOSIERATITOLO).find(n => n.split("/").pop() === cakuk.name) ?? cakuk.name;
      await vetlaqiDosieranCaqaxema(cakuk, ksaka);
      dosierajTenhacaht2[ksaka] = cakuk;
      statuso("j͑ʃɹ ɭʃɜ j͑ʃᴜᶗ‹ " + cakuk.name + " 📂");
    } else {
      statuso("ſɟᴜ ｡ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ｡");
    }
  } catch { }
}

// ⟪ ſɭэ ſɭᴜ , ſɭɹ ſןᴜ , 📃 ⟫
export const VETLAQILO = "http://127.0.0.1:4173/";
export async function saviRekteAlDosiero(): Promise<void> {
  if ( !tsekeVasakata() ) {
    statuso("ſɭɜ j͐ʃɹ ɭʃᴜ ｡ ſɭэ }ʃᴜ ʌ ſɟᴜ ✔️");
    return;
  }
  const hacaqavop2 = generiHacaqavop2();
  if ( !cirkuloValidas() || !cirkuloDeHavop2Validas() ){
    statuso("ſɭᴜ ſɭ,w ｡ ſɭɜ j͐ʃɹ ɭʃᴜ");
    return;
  }
  try {
    const respondo = await fetch(VETLAQILO, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ hacaqavop2 }),
    });
    const vop2lna = await respondo.text();
    if ( respondo.ok ) {
      s2tasSavitan();
      statuso("j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ }ʃᴜ j͐ʃᴜ kanta/ ✔️ ( " + vop2lna + " )");
    } else {
      statuso("ſɭᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ " + vop2lna);
    }
  } catch {
    statuso("ſɭᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ npm run vetlaqilo");
  }
}

// ⟪ ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟫
export const bal2Masukf2q = kfe<HTMLSelectElement>("bal2Masukf2q");
export const bal2QoxaMasukf2q = kfe<HTMLSelectElement>("bal2QoxaMasukf2q");
export const bal2Pal6Enigo = kfe<HTMLInputElement>("bal2Pal6");
export const bal2Pal6Vem2 = kfe<HTMLElement>("bal2Pal6Vem2");

export function s2kantaDeKsaka(ksaka: string): string {
  const anstatauxoj: Record<string, string> = { "ĉ": "c", "ĝ": "g", "ĥ": "h", "ĵ": "j", "ŝ": "s", "ŭ": "u", "ä": "a", "ö": "o", "ü": "u" };
  return ksaka.toLowerCase()
    .replace(/[ĉĝĥĵŝŭäöü]/g, c => anstatauxoj[c] ?? c)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0o0, 0o50);
}

export function tlak2Bal2Masukf2q(): void {
  bal2Masukf2q.innerHTML = "";
  for ( const m of bal2Havalaqaz ) {
    const sukf2qani = document.createElement("option");
    sukf2qani.value = m.s2kanta;
  sukf2qani.textContent = m.ksaka + ( m.tik ? " ⭐" : "" ) + ( m.s2kanta === bal2Vop2.s2kanta ? " ( ſɭэ ᶗ‹ )" : "" );
    bal2Masukf2q.appendChild(sukf2qani);
  }
  bal2Masukf2q.value = bal2Vop2.s2kanta;
  bal2QoxaMasukf2q.innerHTML = "";
  for ( const f of QOXA ) {
    const sukf2qani = document.createElement("option");
    sukf2qani.value = f.ruva;
    sukf2qani.textContent = f.ksaka;
    bal2QoxaMasukf2q.appendChild(sukf2qani);
  }
  bal2QoxaMasukf2q.value = bal2Qoxa;
  bal2Pal6Enigo.value = String(Math.round(bal2Pal6));
  bal2Pal6Vem2.textContent = knak2fe(bal2Pal6) + " · " + Math.round(bal2Pal6) + " u";
}

tlak2Bal2Masukf2q();

export function tsiinanusabosaiBal2(s2kanta: string): void {
  if ( s2kanta === bal2Vop2.s2kanta ) return;
  if ( tsekeVasakata() && !confirm("ſɭɜ j͐ʃɹ ɭʃᴜ ｡ ʃᴜ j͐ʃɹ ɭʃɜ ɭʃᴜ ?") ) {
    tlak2Bal2Masukf2q();
    return;
  }
  location.search = "?bal2=" + encodeURIComponent(s2kanta);
}
bal2Masukf2q.addEventListener("change", () => tsiinanusabosaiBal2(bal2Masukf2q.value));

export async function skribiPerVetlaqilo(hacaqavop2: Record<string, string>): Promise<string | null> {
  try {
    const respondo = await fetch(VETLAQILO, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ hacaqavop2 }),
    });
    const vop2lna = await respondo.text();
    if ( respondo.ok ) return vop2lna;
    statuso("ſɭᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ " + vop2lna);
    return null;
  } catch {
    statuso("ſɭᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ ʃᴜ j͐ʃɹ ʌ j͑ʃɔ ſȷэⅎ ｡ ( npm run vetlaqilo )");
    return null;
  }
}

export async function bal2Sef4(): Promise<void> {
  const ksaka = prompt("ſɭɔ˞ᴜ ſɭᴜ ʌ ʃᴜ j͐ʃɹ ʌ j͑ʃɔ ſȷэⅎ", "ſɭᴜ ı],ƨɔ ʌ j͑ʃɔ ſȷэⅎ");
  if ( !ksaka ) return;
  const s2kanta = s2kantaDeKsaka(ksaka);
  if ( !s2kanta ) { statuso("ſɭɔ˞ᴜ ｡ ſɭɹ ſןᴜ ｡"); return; }
  if ( bal2Havalaqaz.some(m => m.s2kanta === s2kanta) ) { statuso("ʃᴜ j͐ʃɹ ɭʃɜ ｡"); return; }
  bal2Havalaqaz.push({ s2kanta, ksaka, tik: false, qoxa: bal2Qoxa, pal6: bal2Pal6 });
  statuso("ɭʃɜ ʌ ʃᴜ j͐ʃɹ " + s2kanta + " …");
  const tseuni = await skribiPerVetlaqilo(generiHacaqavop2(s2kanta));
  if ( !tseuni ) {
    bal2Havalaqaz = bal2Havalaqaz.filter(m => m.s2kanta !== s2kanta);
    tlak2Bal2Masukf2q();
    return;
  }
  statuso("ʃᴜ j͐ʃɹ " + ksaka + " ɭʃɜ ✔️ ｡ ɭʃɜ ʌ ｡");
  location.search = "?bal2=" + encodeURIComponent(s2kanta);
}

export function bal2Alinomi(): void {
  const cutlu = bal2Havalaqaz.find(m => m.s2kanta === bal2Vop2.s2kanta);
  const ksaka = prompt("ſɭɔ˞ᴜ ʌ j͑ʃɔ ſȷэⅎ ʌ ʃᴜ j͐ʃɹ", cutlu ? cutlu.ksaka : bal2Vop2.s2kanta);
  if ( !ksaka ) return;
  if ( cutlu ) cutlu.ksaka = ksaka;
  s2tasVeq6k2itan();
  tlak2Bal2Masukf2q();
  statuso("ſɭɔ˞ᴜ ɭʃɜ ｡ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ bal2.ts");
}

export function bal2H2li(): void {
  if ( bal2Havalaqaz.length <= 0o1 ) { statuso("ʃᴜ j͐ʃɹ ｡ ſɭɜ ʃɔ ſɟᴜᴜ̩ ɭʃɹ"); return; }
  const cutlu = bal2Havalaqaz.find(m => m.s2kanta === bal2Vop2.s2kanta);
  if ( !confirm("ı],ɔ j͑ʃᴜ̭ɔ ɭʃꞇ ʃᴜ j͐ʃɹ „" + ( cutlu ? cutlu.ksaka : bal2Vop2.s2kanta ) + "“ ? ( ſɟᴜ ｡ )") ) return;
  bal2Havalaqaz = bal2Havalaqaz.filter(m => m.s2kanta !== bal2Vop2.s2kanta);
  if ( !bal2Havalaqaz.some(m => m.tik) ) bal2Havalaqaz[0o0].tik = true;
  s2tasVeq6k2itan();
  const ksoz = ( bal2Havalaqaz.find(m => m.tik) ?? bal2Havalaqaz[0o0] ).s2kanta;
  location.search = "?bal2=" + encodeURIComponent(ksoz);
}

export function bal2Sukf2qiAktivan(): void {
  for ( const m of bal2Havalaqaz ) m.tik = m.s2kanta === bal2Vop2.s2kanta;
  s2tasVeq6k2itan();
  tlak2Bal2Masukf2q();
  statuso("ʃᴜ j͐ʃɹ ɭʃɜ ｡ ɭʃᴜ ɭl̀ɹ ɭʃɔ ⭐");
}

export function tlak2Qoxan(): void {
  formajHapukaz = qoxaPukazN2k(bal2Qoxa, bal2Pal6, 0o100);
  bal2Pal6Vem2.textContent = knak2fe(bal2Pal6) + " · " + Math.round(bal2Pal6) + " u";
  s2tasVeq6k2itan();
  tlak2Qoxan3D();
  tlak2L2han2Dn();
  statuso("ſ͕ɭɜ ı],ᴜ " + bal2Qoxa + " ｡ ſןᴜ j͐ʃэ " + Math.round(bal2Pal6)
    + " ｡ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ bal2.ts");
}

bal2QoxaMasukf2q.addEventListener("change", () => {
  bal2Qoxa = bal2QoxaMasukf2q.value as Bal2Qoxa;
  tlak2Qoxan();
});
bal2Pal6Enigo.addEventListener("input", () => {
  bal2Pal6 = Number(bal2Pal6Enigo.value);
  tlak2Qoxan();
});
kfe<HTMLButtonElement>("bal2Sef4").addEventListener("click", bal2Sef4);
kfe<HTMLButtonElement>("bal2Alinomi").addEventListener("click", bal2Alinomi);
kfe<HTMLButtonElement>("bal2H2li").addEventListener("click", bal2H2li);
kfe<HTMLButtonElement>("bal2Aktiva").addEventListener("click", bal2Sukf2qiAktivan);

// ⟪ ſɭэ ɭʃᴜ , 📃 ⟫
kfe<HTMLButtonElement>("savi").addEventListener("click", saviDosieron);
kfe<HTMLButtonElement>("saviRekte").addEventListener("click", saviRekteAlDosiero);
kfe<HTMLButtonElement>("sargi").addEventListener("click", sargiDosieron);

// ⟪ ſɭэ ɭʃᴜ , ſןw ſɭᴜƴ , 📃 ⟫
interface DosieraLigo {
  Tona: number;
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
  tlak2Haskek2: () => void;
  tlak2L2han2Dn: () => void;
  tlak2AkvajnHavop2kekai: () => void;
  s2tasVeq6k2itan: () => void;
  s2tasSavitan: () => void;
  tsekeVasakata: () => boolean;
  SKULPTADELTAJ: string;
  SKULPTAAKVAMASKO: string;
  SKULPTABIOMOJ: string;
  SKULPTABESTOJ: string;
  SKULPTAHAXAIQ: AkvaTsiq[];
  SKULPTAOBJEKTOJ: Neq2qObjekto[];
  SKULPTAHAKAXTE: Knat6keqanuKuba[];
  SKULPTAHAKAS2KANTA: Knat6keqanuK6h6N2k[];
  SKULPTAHAQAKAJ2: Knat6keqanuTap2Qoxa[];
}
export let Tona: number;
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
export let tlak2Haskek2: () => void;
export let tlak2L2han2Dn: () => void;
export let tlak2AkvajnHavop2kekai: () => void;
export let s2tasVeq6k2itan: () => void;
export let s2tasSavitan: () => void;
export let tsekeVasakata: () => boolean;
export let SKULPTADELTAJ: string;
export let SKULPTAAKVAMASKO: string;
export let SKULPTABIOMOJ: string;
export let SKULPTABESTOJ: string;
export let SKULPTAHAXAIQ: AkvaTsiq[];
export let SKULPTAOBJEKTOJ: Neq2qObjekto[];
export let SKULPTAHAKAXTE: Knat6keqanuKuba[];
export let SKULPTAHAKAS2KANTA: Knat6keqanuK6h6N2k[];
export let SKULPTAHAQAKAJ2: Knat6keqanuTap2Qoxa[];
/* ſɭэ ɭʃᴜ , ꞙɭı , ⟅ ſɭэ ſɭᴜ ,
    @param k ( DosieraLigo ) - ſɭᴜ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ｡ */
export function catsaraHacaqavop2(k: DosieraLigo): void {
  ( { Tona, N, X0, Z0, hal6da, k6liqani, habs2, hapaga, historio, refaraHistorio,
    vem2Kama, statuso, tlak2Haskek2, tlak2L2han2Dn,
    tlak2AkvajnHavop2kekai, s2tasVeq6k2itan, s2tasSavitan, tsekeVasakata,
    SKULPTADELTAJ, SKULPTAAKVAMASKO, SKULPTABIOMOJ, SKULPTABESTOJ,
    SKULPTAHAXAIQ, SKULPTAOBJEKTOJ, SKULPTAHAKAXTE, SKULPTAHAKAS2KANTA,
    SKULPTAHAQAKAJ2 } = k );
  tlak2Bal2Masukf2q();
}
