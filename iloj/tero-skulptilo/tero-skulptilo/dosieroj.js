// ≺⧼ La mapoj kaj la dosieroj 📃 ⧽≻
// La datumformato kaj la dosieroj de la terena skulptilo — la nombro-kodo
// ( ok-taloj, π-frakcioj, base64 ), la mapo-registro ( tero-datumaro/mapoj.ts
// kaj la pordo aktiva.ts ), la formo de la mondo kaj la legado kaj skribado de
// la sep datumdosieroj de mapo. La stato de la redaktilo ( la deltoj, la masko,
// la biomoj, la bestoj, la historio kaj la montriloj ) venas per agordiDosierojn
// — la modulo legas kaj skribas ilin same kiel la ceteraj moduloj.
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

// La mapo de la adreso ( ?mapo=<kodo> ) — la registro, la formo de la mondo kaj
// la rando-punktoj de la formo. La ludo mem legas la pordon aktiva.ts.
export const mapoKodo = new URLSearchParams(location.search).get("mapo");
export const mapoDatumo = mapoDeKodo(mapoKodo);
export let mapoFormo = mapoDatumo.formo;
export let mapoGrandeco = mapoDatumo.grandeco;
export let mapojRegistroj = MAPOJ.map(m => ( { ...m } ));
export let formajRandaj = formajRandPunktoj(mapoFormo, mapoGrandeco, 0o100);

export function oktala(valoro) {
  const n = Math.round(valoro * 0o100);
  if ( n % 0o100 === 0 ) {
    const tuta = n / 0o100;
    return ( tuta < 0 ? "-" : "" ) + "0o" + Math.abs(tuta).toString(8);
  }
  return ( n < 0 ? "-" : "" ) + "0o" + Math.abs(n).toString(8) + "/0o100";
}
// gcdn — la plej granda komuna divizoro ( por simpligi la π-frakciojn ).
export function gcdn(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while ( b ) { const r = a % b; a = b; b = r; }
  return a || 1;
}
// piFrakcio — ĉu la valoro estas ekzakta π-frakcio ( Math.PI, Math.PI/2,
// 3*Math.PI/4, ... )? Revenu la tekston de la ekzakta esprimo, aux null.
export function piFrakcio(valoro) {
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
// formatiNombron — la nombro-stilo de la datumaro. tutaj nombroj kiel
// ok-taloj ( 0o140 anstataux 96 ), turnoj kiel ekzaktaj π-frakcioj
// ( Math.PI / 2 anstataux 1.5707963267948966 ), 1/64-oj kiel ok-talaj
// frakcioj ( 0o340/0o100 anstataux 3.5 ). Nur la ceteraj glit-komoj ( ekz.
// la sin-kalkulitaj dokaj z ) restas dekumaj.
export function formatiNombron(valoro) {
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
// skribiValoron — skribu datuman valoron ( urbojn, vojojn, dokojn, objektojn )
// en la nombro-stilon de la dosiero ( ok-taloj, π-frakcioj ) anstataux JSON.
export function skribiValoron(valoro) {
  if ( valoro === null || valoro === undefined ) return "null";
  const t = typeof valoro;
  if ( t === "number" ) return formatiNombron(valoro);
  if ( t === "boolean" ) return valoro ? "true" : "false";
  if ( t === "string" ) return JSON.stringify(valoro);
  if ( Array.isArray(valoro) ) return "[ " + valoro.map(skribiValoron).join(", ") + " ]";
  const eroj = [];
  for ( const k in valoro ) {
    if ( valoro[k] === undefined ) continue;
    eroj.push(JSON.stringify(k) + ": " + skribiValoron(valoro[k]));
  }
  return "{ " + eroj.join(", ") + " }";
}
// parziValoron — malgranda esprimo-analizilo por la datumaro de la skulptilo.
// La savo skribas la nombrojn kiel ok-talojn ( 0o300 ) kaj la turnojn kiel
// ekzaktajn π-frakciojn ( Math.PI / 2, 3 * Math.PI / 4 ) — JSON.parse ne
// povas legi tiun sintakson, do la dosier-sxargxo uzas cxi tiun analizilon.
// ( JSON mem ankaux parseblas — gxi estas subaro de la gramatiko. )
export function parziValoron(teksto) {
  let i = 0;
  const sp = () => { while ( i < teksto.length && /\s/.test(teksto[i]) ) i++; };
  const eraro = () => { throw new Error("Ne-analizebla esprimo ĉe " + i + ": " + teksto.slice(i, i + 0o40)); };
  function nombro() {
    sp();
    const m = teksto.slice(i).match(/^-?0o[0-7]+(?:\/0o[0-7]+)?|^-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/);
    if ( !m ) eraro();
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
  function faktoro() {
    sp();
    const c = teksto[i];
    if ( c === "-" ) { i++; return -faktoro(); }
    if ( c === "(" ) { i++; const v = adicio(); sp(); if ( teksto[i] !== ")" ) eraro(); i++; return v; }
    if ( teksto.startsWith("Math.PI", i) ) { i += "Math.PI".length; return Math.PI; }
    return nombro();
  }
  function termo() {
    let v = faktoro();
    for ( ;; ) {
      sp();
      const c = teksto[i];
      if ( c === "*" ) { i++; v = v * faktoro(); }
      else if ( c === "/" ) { i++; v = v / faktoro(); }
      else return v;
    }
  }
  function adicio() {
    let v = termo();
    for ( ;; ) {
      sp();
      const c = teksto[i];
      if ( c === "+" ) { i++; v = v + termo(); }
      else if ( c === "-" ) { i++; v = v - termo(); }
      else return v;
    }
  }
  function stringo() {
    sp();
    if ( teksto[i] !== '"' ) eraro();
    let s = "";
    i++;
    for ( ;; ) {
      if ( i >= teksto.length ) eraro();
      const c = teksto[i];
      if ( c === '"' ) { i++; return s; }
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
  function valoro() {
    sp();
    const c = teksto[i];
    if ( c === "{" ) {
      i++;
      const o = {};
      sp();
      if ( teksto[i] === "}" ) { i++; return o; }
      for ( ;; ) {
        sp();
        // Posta komo ( { ... , } ) — la ferma krampo fermas la objekton.
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
      const a = [];
      sp();
      if ( teksto[i] === "]" ) { i++; return a; }
      for ( ;; ) {
        sp();
        // Posta komo ( [ ... , ] ) — la ferma krampo fermas la aron.
        if ( teksto[i] === "]" ) { i++; return a; }
        a.push(valoro());
        sp();
        const d = teksto[i];
        if ( d === "," ) { i++; continue; }
        if ( d === "]" ) { i++; return a; }
        eraro();
      }
    }
    if ( c === '"' ) return stringo();
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
export function bazo64DeBajtoj(bajtoj) {
  // La bloko estas oblo de 3 ( 0o30000 = 12288 ), por ke btoa ne enmetu
  // padding-signojn ( "=" ) en la mezo — ili rompus la tutan ĉenon.
  let teksto = "";
  const bloko = 0o30000;
  for ( let i = 0; i < bajtoj.length; i += bloko ) {
    teksto += btoa(String.fromCharCode.apply(null, bajtoj.subarray(i, i + bloko)));
  }
  return teksto;
}
export function bazo64DeInt16(valoroj) {
  const bajtoj = new Uint8Array(valoroj.length * 2);
  const vido = new DataView(bajtoj.buffer);
  for ( let i = 0; i < valoroj.length; i++ ) vido.setInt16(i * 2, valoroj[i], true);
  return bazo64DeBajtoj(bajtoj);
}
export function bazo64DeMasko(maskoDatumoj) {
  const bajtoj = new Uint8Array(Math.ceil(maskoDatumoj.length / 8));
  for ( let i = 0; i < maskoDatumoj.length; i++ ) if ( maskoDatumoj[i] ) bajtoj[i >> 3] |= 1 << ( i & 7 );
  return bazo64DeBajtoj(bajtoj);
}
export function bazo64DeBiomoj(biomoDatumoj) {
  // 3 bitoj po cxelo ( 0=aŭtomata, 1=montaro, 2=valo, 3=ebenaĵo,
  // 4=akvaj-plantoj, 5=ekvizeto ) — ok cxeloj po tri bajtoj.
  const bajtoj = new Uint8Array(Math.ceil(( biomoDatumoj.length * 3 ) / 8));
  for ( let i = 0; i < biomoDatumoj.length; i++ ) {
    const b = i * 3;
    bajtoj[b >> 3] |= ( biomoDatumoj[i] & 7 ) << ( b & 7 );
    if ( ( b & 7 ) > 5 ) bajtoj[( b >> 3 ) + 1] |= ( biomoDatumoj[i] & 7 ) >> (8 - ( b & 7 ));
  }
  return bazo64DeBajtoj(bajtoj);
}
export function bazo64DeBestoj(bestoDatumoj) {
  // 3 bitoj po cxelo ( bitoj 1=akvaj bestoj, 2=petreloj, 4=NPC-oj ) — ok
  // cxeloj po tri bajtoj.
  const bajtoj = new Uint8Array(Math.ceil(bestoDatumoj.length * 3 / 8));
  for ( let i = 0; i < bestoDatumoj.length; i++ ) {
    const b = i * 3;
    const v = bestoDatumoj[i] & 7;
    bajtoj[b >> 3] |= v << ( b & 7 );
    if ( ( b & 7 ) > 5 ) bajtoj[( b >> 3 ) + 1] |= v >> (8 - ( b & 7 ));
  }
  return bazo64DeBajtoj(bajtoj);
}
// kvantigiDeltojn — la komuna kvantigo ( 1/16-unua precizeco, limigita al la
// int16-gamo ) por la skribo KAJ la memkontrolo, por ke ambaŭ ĉiam kongruu.
export function kvantigiDeltojn(){
  const kvantigita = new Int16Array(N * N);
  for ( let i = 0; i < deltoj.length; i++ ) {
    kvantigita[i] = Math.max(-32767, Math.min(32767, Math.round(deltoj[i] * 16)));
  }
  return kvantigita;
}
// cirkuloValidas — antaŭ-skriba memkontrolo. kodigu la datumaron per la samaj
// funkcioj kiel la savo kaj malkodigu ĝin denove, komparante kun la originalo.
// Ĉi tio kaptas ĉian koruptiĝon en la kodigo ( ekz. tranĉita bloko, erara
// bajto-ordo ) antaŭ ol ĝi atingas la dosieron.
export function cirkuloValidas(){
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
// cirkuloDeDatumojValidas — la sama memkontrolo por la objektoj, urboj kaj
// vojoj/dokoj. la seriigo ( skribiValoron ) kaj la re-parzigo ( parziValoron )
// devas redoni la saman datumaron, alie la savo skribus koruptitan dosieron.
export function cirkuloDeDatumojValidas() {
  try {
    return JSON.stringify(parziValoron(skribiValoron(objektoj))) === JSON.stringify(objektoj)
      && JSON.stringify(parziValoron(skribiValoron(fontoj))) === JSON.stringify(fontoj)
      && JSON.stringify(parziValoron(skribiValoron(urboj))) === JSON.stringify(urboj)
      && JSON.stringify(parziValoron(skribiValoron(vojoj))) === JSON.stringify(vojoj)
      && JSON.stringify(parziValoron(skribiValoron(dokoj))) === JSON.stringify(dokoj);
  } catch { return false; }
}
// La dosieraj titoloj — ĉiu datumodosiero komenciĝas per sia markilo, kiun la
// konserva servilo kontrolas ( neniu fremda enhavo skribiĝas en kantaoj/ ).
// rultempo.ts NE plu skribiĝas de la savo — ĝi estas la komuna modulo kies
// funkciojn la skulptilo importas ( vidu la importon de tero-datumaro/rultempo ).
// ⟪ La mapoj 📃 ⟫ — ĉiu mapo havas siajn sep datumodosierojn en sia propra
// dosierujo ( tero-datumaro/<kodo>/ ). La markiloj de la dosieroj restas la
// samaj; la konserva servilo kontrolas la markilon de ĉiu skribota dosiero, do
// la dosieruja nomo povas esti ajna mapo de la registro.
export const DATUMDOSIEROJ = [ "krado", "akvo", "akvofontoj", "biomoj", "bestoj", "objektoj", "urboj", "vojoj" ];
// dosierujo — la dosierujo de mapo en kantaoj/ ( ĉiam finiĝas per "/" ).
export function dosierujo(kodo) { return "tero-datumaro/" + kodo + "/"; }
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
// La datumoj vivas en PROPRAJ dosieroj ( la krado, akvo, biomoj, bestoj, la
// objektoj, la urboj kaj la vojoj/dokoj aparte ) — la savo produktas la tutan
// mapon de dosieroj en kantaoj/tero-datumaro/ ( rultempo.ts ne plu skribiĝas ).
export function generiDosierojn(kodo = mapoDatumo.kodo){
  const dosierujoDeMapo = dosierujo(kodo);
  sinkronigiSuperojn();   // la vivaj ĉel-superoj al la urbo-datumo antaŭ la skribo
  const kvantigita = kvantigiDeltojn();
  // Apartaj aktiva-flagoj — akvo-nuraj ŝanĝoj ne devas ŝveligi la dosieron
  // per 32 KB da nulaj deltoj, kaj inverse.
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
  // La akvofontoj — la enigo de la akvo: la riveroj elfluas de ili, la kavoj
  // plenigxas, la kanaloj eltrancxigxas. Cxiu fonto - x, z kaj fluo.
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
  // La metitaj objektoj — la sama nombro-stilo kiel la cetera datumaro.
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
  // ⟪ La mapo-registro kaj la pordo 📃 ⟫ — mapoj.ts tenas la liston de la mapoj
  // ( kun la formo de ĉiu mapo ) kaj aktiva.ts re-eksportas la datumojn de la
  // AKTIVA mapo por la ludo. Ambaŭ reskribiĝas ĉe ĉiu savo, do elekti alian
  // aktivan mapon aŭ ŝanĝi la formon sufiĉas ( la ludo legas la pordon ).
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
// sxargiDatumaronElMapo — sxargu la datumaron el la mapo de dosieroj
// ( { nomo. teksto } — la generitaj dosieroj aux unu elektita dosiero ). Cxiu
// konstanto sercxigxas en CXIUJ donitaj dosieroj, do la malnova unu-dosiera
// formato ( cxiuj konstantoj en tero-datumo.ts ) ankoraŭ sxargxas.
export function sxargiDatumaronElMapo(dosieroj) {
  const preni = ( nomo ) => {
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
  const oktalaNombro = ( s ) => {
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
  const malpaku = ( s ) => ( s === null ? null : s.replace(/^"|"$/g, "") );
  // Cxiu tavolo ŝarĝigxas NUR kiam ĝia ŝlosilo ekzistas en la donitaj
  // dosieroj — la ŝargo de unu tavolo-dosiero ( ekz. biomoj.ts ) ne plu
  // forviŝas la ceterajn tavolojn, la objektojn aŭ la urbojn.
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
  // La akvofontoj — la akvo mem estas deriva ( la fontoj estas la enigo ).
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
      aldonajBlokoj: Array.isArray(u && u.aldonajBlokoj) ? u.aldonajBlokoj.map(b => ( {
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
  // La vojoj, dokoj kaj spacoŝipo — la mondaj trajtoj de la ĉefa urbo.
  try {
    const parzV = voj ? parziValoron(voj) : null;
    if ( parzV && Array.isArray(parzV) ) agordiVojojn(parzV.map(v => ( { ...v, punktoj: v.punktoj.map(p => [ p[0], p[1] ]) } )));
  } catch { }
  try {
    const parz = dok ? parziValoron(dok) : null;
    if ( parz && Array.isArray(parz) ) agordiDokojn(parz.map(d => ( { ...d } )));
  } catch { }
  gxisdatigiVojajnRegilojn();
  if ( nivelo2 !== null ) {
    agordiAkvanNivelon(nivelo2);
    niveloRegilo.value = akvaNiveloValoro;
  }
  gxisdatigiValorojn();
  historio.length = 0;
  refaraHistorio.length = 0;
  // La akvo — la sxargxitaj fontoj kaj la nivelo rekalkuligas la akvon ( la
  // kalkulo mem redesegnas la 2D-mapon kaj la 3D-vidon ).
  markiAkvonMalpuran();
  rekalkuliAkvon();
  return true;
}
export function sxargiDatumaronElKodo(){
  const d = dekodiInt16(SKULPTA_DELTAJ);
  if ( d ) for ( let i = 0; i < deltoj.length && i < d.length; i++ ) deltoj[i] = d[i] / 16;
  const m = dekodiMaskon(SKULPTA_AKVA_MASKO, N * N);
  if ( m ) masko.set(m);
  const b = dekodiBiomon(SKULPTA_BIOMOJ, N * N);
  if ( b ) biomoj.set(b);
  const be = dekodiBestojn(SKULPTA_BESTOJ, N * N);
  if ( be ) bestoj.set(be);
  // La akvofontoj de la aktiva mapo ( malnova mapo ne havas la dosieron ).
  try {
    agordiFontojn(Array.isArray(SKULPTA_AKVOFONTOJ) ? SKULPTA_AKVOFONTOJ.map(f => ( { ...f } ) ) : []);
  } catch { agordiFontojn([]); }
  agordiObjektojn(SKULPTA_OBJEKTOJ.map(o => ( { ...o } )));
  agordiElektitanObjekton(-1);
  gxisdatigiObjektoListon();
  rekonstruiObjektojn();
  // La urboj — la kradaj aranĝoj kaj ofsetoj de SKULPTA_URBOJ. La defaŭlto
  // estas la ĉefa urbo, se la listo mankas aŭ malplenas.
  try {
    agordiUrbojn(Array.isArray(SKULPTA_URBOJ) ? SKULPTA_URBOJ.map(u => ( { ...u } )) : []);
  } catch { agordiUrbojn([]); }
  if ( !urboj.length ) agordiUrbojn([ { nomo: "Ĉefa", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ]);
  agordiElektitanUrbon(0);
  elektiUrbon(0);
  // La vojoj, dokoj kaj spacoŝipo — la mondaj trajtoj de la ĉefa urbo.
  try {
    if ( SKULPTA_VOJOJ && Array.isArray(SKULPTA_VOJOJ) ) agordiVojojn(SKULPTA_VOJOJ.map(v => ( { ...v, punktoj: v.punktoj.map(p => [ p[0], p[1] ]) } )));
  } catch { }
  try {
    const parz = SKULPTA_DOKOJ;
    if ( parz && Array.isArray(parz) ) agordiDokojn(parz.map(d => ( { ...d } )));
  } catch { }
  gxisdatigiVojajnRegilojn();
}

// ⟪ Dosiera tenilo ( File System Access API ) 📃 ⟫ — rememorita en IndexedDB,
// por ke la sekva savo skribu rekte sen elekto. La datumoj vivas en kvar
// dosieroj, do ĉiu nomo havas sian propran memoritan tenilon.
export let dosierajTeniloj = {};      // nomo ( "tero-datumaro/krado.ts" ... ) → tenilo
export function idbMalfermi(){
  return new Promise(( solvi, rifuzi ) => {
    const peto = indexedDB.open("tero-skulptilo", 1);
    peto.onupgradeneeded = () => { peto.result.createObjectStore("teniloj"); };
    peto.onsuccess = () => solvi(peto.result);
    peto.onerror = () => rifuzi(peto.error);
  });
}
export async function konserviDosieranTenilon(tenilo, nomo) {
  try {
    const db = await idbMalfermi();
    await new Promise(( solvi, rifuzi ) => {
      const tx = db.transaction("teniloj", "readwrite");
      tx.objectStore("teniloj").put(tenilo, "dosiero:" + nomo);
      tx.oncomplete = solvi;
      tx.onerror = () => rifuzi(tx.error);
    });
  } catch { }
}
export async function sxargiDosierajnTenilojn(){
  try {
    const db = await idbMalfermi();
    const butiko = db.transaction("teniloj").objectStore("teniloj");
    const klavoj = await new Promise(( solvi ) => {
      const peto = butiko.getAllKeys();
      peto.onsuccess = () => solvi(peto.result || []);
      peto.onerror = () => solvi([]);
    });
    for ( const k of klavoj ) {
      const nomo = String(k).replace(/^dosiero:/, "");
      const t = await new Promise(( solvi ) => {
        const peto = butiko.get(k);
        peto.onsuccess = () => solvi(peto.result || null);
        peto.onerror = () => solvi(null);
      });
      if ( t ) dosierajTeniloj[nomo] = t;
    }
  } catch { }
}
export async function forgesiDosieranTenilon(nomo){
  delete dosierajTeniloj[nomo];
  try {
    const db = await idbMalfermi();
    await new Promise(( solvi, rifuzi ) => {
      const tx = db.transaction("teniloj", "readwrite");
      tx.objectStore("teniloj").delete("dosiero:" + nomo);
      tx.oncomplete = solvi;
      tx.onerror = () => rifuzi(tx.error);
    });
  } catch { }
}
export function elSxuti(teksto, nomo) {
  const blobo = new Blob([ teksto ], { type: "text/plain" });
  const url = URL.createObjectURL(blobo);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomo;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0o4000);
}
// skribiPerTenilo — provu skribi la datumaron per la elektita tenilo. Revenu
// ĉu la skribo sukcesis — la malsukceso ( ekz. forigita aŭ movita dosiero )
// estas pritraktata de saviDosieron, kiu reprenas la elekton aŭ elŝutas.
export async function skribiPerTenilo(tenilo, teksto) {
  try {
    const skribilo = await tenilo.createWritable();
    await skribilo.write(teksto);
    await skribilo.close();
    markiSavitan();
    statuso("Savite rekte al " + tenilo.name + " ✔️");
    return true;
  } catch { return false; }
}
export async function saviDosieron(){
  const dosieroj = generiDosierojn();
  // Antaŭ-skriba memkontrolo — se la kodigo ne cirkulas ( la malkodigo de la
  // savota teksto redonas alian terenon aux datumaron ), ne skribu koruptitan
  // dosieron.
  if ( !cirkuloValidas() || !cirkuloDeDatumojValidas() ){
    statuso("La datumaro ne validas — savo nuligita");
    return;
  }
  if ( !window.showSaveFilePicker ) {
    // Sen dosier-elektilo — elŝutu ĉiujn kvar dosierojn.
    for ( const [ nomo, teksto ] of Object.entries(dosieroj) ) elSxuti(teksto, nomo);
    markiSavitan();
    statuso("Elsxutite. Metu la dosierojn al kantaoj/ kaj reŝargu la ludon");
    return;
  }
  // Cxiu dosiero havas sian propran memoritan tenilon ( aŭ novan elekton ).
  for ( const [ nomo, teksto ] of Object.entries(dosieroj) ) {
    let tenilo = dosierajTeniloj[nomo];
    if ( tenilo && !await skribiPerTenilo(tenilo, teksto) ) {
      statuso("La memorita dosiero ne plu haveblas — elektu denove");
      await forgesiDosieranTenilon(nomo);
      tenilo = null;
    }
    if ( !tenilo ) {
      try {
        tenilo = await window.showSaveFilePicker({
          suggestedName: nomo,
          types: [ { description: "TypeScript datumaro", accept: { "text/plain": [ ".ts" ] } } ],
        });
      } catch {
        statuso("La elekto nuligita — ŝanĝoj restas nesavitaj");
        return;
      }
      if ( !await skribiPerTenilo(tenilo, teksto) ) {
        // Eĉ la nova elekto malsukcesis — neniam perdu la datumon. elŝutu.
        elSxuti(teksto, nomo);
        continue;
      }
      dosierajTeniloj[nomo] = tenilo;
      await konserviDosieranTenilon(tenilo, nomo);
    }
  }
}
export async function sargiDosieron(){
  if ( !window.showOpenFilePicker ) {
    statuso("La dosier-ŝarĝo bezonas Chromium-on");
    return;
  }
  try {
    const [ tenilo ] = await window.showOpenFilePicker({
      types: [ { description: "TypeScript datumaro", accept: { "text/plain": [ ".ts" ] } } ],
      multiple: false,
    });
    const dosiero = await tenilo.getFile();
    const teksto = await dosiero.text();
    if ( sxargiDatumaronElMapo({ [ tenilo.name ]: teksto }) ) {
      // Memoru la tenilon sub la PLENA dosier-nomo ( la sama ŝlosilo kiun
      // la savo uzas ) — antaŭe la mallonga nomo neniam kongruis kaj la
      // memorita tenilo estis neniam reuzita.
      const nomo = Object.keys(DOSIERA_TITOLO).find(n => n.split("/").pop() === tenilo.name) ?? tenilo.name;
      await konserviDosieranTenilon(tenilo, nomo);
      dosierajTeniloj[nomo] = tenilo;
      statuso("Ŝargite el " + tenilo.name + " 📂");
    } else {
      statuso("La dosiero ne estas skulpta datumaro");
    }
  } catch { }
}

// ════════════════════════ Rekta savo al kantaoj/tero-datumaro ════════════════════════
// La konserva servilo ( servilo/konservilo.mjs, npm run konservilo ) ricevas
// la generitan dosierojn per POST kaj skribas ilin rekte al
// kantaoj/tero-datumaro/ — sen dosier-elektilo kaj sen elŝuto. Se la servilo ne
// kuras, la butono montras instrukcion anstataŭ silente malsukcesi.
export const KONSERVILO = "http://127.0.0.1:4173/";
export async function saviRekteAlDosiero(){
  // Neniu ŝanĝo — ne skribu ( la skribo sxangxus la modif-tempon kaj
  // restartigus la ludon per HMR sen kialo ).
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

// ════════════════════════ La mapoj ════════════════════════
// La mapo-panelo elektas la REDAKTATAN mapon ( ĉiu mapo estas sendependa mondo
// kun siaj propraj sep datumdosieroj ), kreas novan mapon, alinomas, forigas,
// elektas la AKTIVAN mapon ( la mapon, kiun la ludo legas ) kaj redaktas la
// formon kaj la grandecon de la mondo. La datumoj de la mapo estas ŝarĝitaj per
// dinamika importo, do elekti alian mapon reŝargas la paĝon per ?mapo=<kodo> —
// la nesavitaj ŝanĝoj de la nuna mapo devas esti pritraktataj antaŭe ( la ilo
// demandas ). La mapo-registro ( mapoj.ts ) kaj la pordo ( aktiva.ts ) saviĝas
// per la samaj butonoj kiel la tereno.
export const mapoElektilo = document.getElementById("mapoElektilo");
export const mapoFormoElektilo = document.getElementById("mapoFormoElektilo");
export const mapoGrandecoEnigo = document.getElementById("mapoGrandeco");
export const mapoGrandecoValoro = document.getElementById("mapoGrandecoValoro");

// kodoDeNomo — la dosieruja nomo de mapo el la nomo. La samaj reguloj kiel la
// konserva servilo akceptas ( minuskloj, ciferoj kaj streketoj, 40 signoj ).
export function kodoDeNomo(nomo) {
  const anstatauxoj = { "ĉ": "c", "ĝ": "g", "ĥ": "h", "ĵ": "j", "ŝ": "s", "ŭ": "u", "ä": "a", "ö": "o", "ü": "u" };
  return nomo.toLowerCase()
    .replace(/[ĉĝĥĵŝŭäöü]/g, c => anstatauxoj[c] ?? c)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}

// gxisdatigiMapajnElektilojn — plenigu la mapo-elektilon kaj la formo-elektilon
// per la nuna registro kaj la nunaj valoroj.
export function gxisdatigiMapajnElektilojn() {
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

// sxaltiMapon — ŝanĝu la redaktatan mapon ( reŝargo kun ?mapo=<kodo> ).
export function sxaltiMapon(kodo) {
  if ( kodo === mapoDatumo.kodo ) return;
  if ( cxuSxangxita() && !confirm("Nesavitaj ŝanĝoj en ĉi tiu mapo — forlasi ilin?") ) {
    gxisdatigiMapajnElektilojn();
    return;
  }
  location.search = "?mapo=" + encodeURIComponent(kodo);
}
mapoElektilo.addEventListener("change", () => sxaltiMapon(mapoElektilo.value));

// skribiPerKonservilo — skribu dosierojn per la konserva servilo. Nova mapo
// bezonas ĝin por krei siajn sep datumdosierojn ( la servilo ankaŭ kontrolas la
// markilojn, do nenio fremda skribiĝas en kantaoj/ ).
//     @returns La respondo de la servilo, aŭ null kiam la skribo malsukcesis.
export async function skribiPerKonservilo(dosieroj) {
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

// mapoNova — nova mapo, kiu komenciĝas kiel kopio de la nuna ( la datumoj de la
// nuna mapo skribiĝas al la nova dosierujo, kune kun la mapo-registro ). Poste
// la ilo ŝaltas al la nova mapo ( reŝargo ).
export async function mapoNova() {
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

// mapoAlinomi — ŝanĝu la montratan nomon ( la dosierujo restas la sama, do la
// datumoj ne moviĝas ).
export function mapoAlinomi() {
  const nuna = mapojRegistroj.find(m => m.kodo === mapoDatumo.kodo);
  const nomo = prompt("Nova nomo de la mapo", nuna ? nuna.nomo : mapoDatumo.kodo);
  if ( !nomo ) return;
  if ( nuna ) nuna.nomo = nomo;
  markiSxangxitan();
  gxisdatigiMapajnElektilojn();
  statuso("La nomo ŝanĝita — savu por skribi ĝin al mapoj.ts");
}

// mapoForigi — forigu la mapon el la registro. La datumdosieroj RESTAS sur la
// disko ( la ilo ne forigas dosierojn ), do la mapo povas reveni mane.
export function mapoForigi() {
  if ( mapojRegistroj.length <= 1 ) { statuso("La lasta mapo ne forigeblas"); return; }
  const nuna = mapojRegistroj.find(m => m.kodo === mapoDatumo.kodo);
  if ( !confirm("Forigi la mapon „" + ( nuna ? nuna.nomo : mapoDatumo.kodo ) + "“ el la registro? ( la dosieroj restas )") ) return;
  mapojRegistroj = mapojRegistroj.filter(m => m.kodo !== mapoDatumo.kodo);
  if ( !mapojRegistroj.some(m => m.aktiva) ) mapojRegistroj[0].aktiva = true;
  markiSxangxitan();
  const sekva = ( mapojRegistroj.find(m => m.aktiva) ?? mapojRegistroj[0] ).kodo;
  location.search = "?mapo=" + encodeURIComponent(sekva);
}

// mapoAktiva — elektu la mapon, kiun la LUDO legas. La pordo aktiva.ts
// reskribiĝas ĉe la savo.
export function mapoElektiAktivan() {
  for ( const m of mapojRegistroj ) m.aktiva = m.kodo === mapoDatumo.kodo;
  markiSxangxitan();
  gxisdatigiMapajnElektilojn();
  statuso("Ĉi tiu mapo estos la mapo de la ludo post la savo ⭐");
}

// gxisdatigiFormon — la formo aŭ la grandeco de la mondo ŝanĝiĝis. La 2D-mapo,
// la 3D-vido kaj ( post la savo ) ankaŭ la ludo montras la novan formon.
export function gxisdatigiFormon() {
  formajRandaj = formajRandPunktoj(mapoFormo, mapoGrandeco, 0o100);
  mapoGrandecoValoro.textContent = oktala(mapoGrandeco) + " · " + Math.round(mapoGrandeco) + " u";
  markiSxangxitan();
  gxisdatigiFormon3D();
  gxisdatigiPlenan2Dn();
  statuso("Formo " + mapoFormo + ", grandeco " + Math.round(mapoGrandeco)
    + " — savu por skribi ĝin al mapoj.ts");
}

mapoFormoElektilo.addEventListener("change", () => {
  mapoFormo = mapoFormoElektilo.value;
  gxisdatigiFormon();
});
mapoGrandecoEnigo.addEventListener("input", () => {
  mapoGrandeco = Number(mapoGrandecoEnigo.value);
  gxisdatigiFormon();
});
document.getElementById("mapoNova").addEventListener("click", mapoNova);
document.getElementById("mapoAlinomi").addEventListener("click", mapoAlinomi);
document.getElementById("mapoForigi").addEventListener("click", mapoForigi);
document.getElementById("mapoAktiva").addEventListener("click", mapoElektiAktivan);

// ════════════════════════ Komenco ════════════════════════
document.getElementById("savi").addEventListener("click", saviDosieron);
document.getElementById("saviRekte").addEventListener("click", saviRekteAlDosiero);
document.getElementById("sargi").addEventListener("click", sargiDosieron);

// ⟪ La ligo al la redaktilo 📃 ⟫ — la stato kaj la helpiloj de la ĉefa modulo.
// La tabeloj kaj la historio venas per referenco ( la modulo skribas ilin
// surloke ), la cetero per referenco al la propra funkcio de la redaktilo.
//     @param k ( object ) - la ligoj de la ĉefa modulo.
export let PASO, N, X0, Z0, deltoj, masko, biomoj, bestoj, historio, refaraHistorio,
  niveloRegilo, statuso, gxisdatigiValorojn, gxisdatigiPlenan2Dn,
  gxisdatigiAkvajnStatistikojn, markiSxangxitan, markiSavitan, cxuSxangxita;
export let SKULPTA_DELTAJ, SKULPTA_AKVA_MASKO, SKULPTA_BIOMOJ, SKULPTA_BESTOJ,
  SKULPTA_AKVOFONTOJ, SKULPTA_OBJEKTOJ, SKULPTA_URBOJ, SKULPTA_VOJOJ, SKULPTA_DOKOJ;
export function agordiDosierojn(k) {
  ( { PASO, N, X0, Z0, deltoj, masko, biomoj, bestoj, historio, refaraHistorio,
    niveloRegilo, statuso, gxisdatigiValorojn, gxisdatigiPlenan2Dn,
    gxisdatigiAkvajnStatistikojn, markiSxangxitan, markiSavitan, cxuSxangxita,
    SKULPTA_DELTAJ, SKULPTA_AKVA_MASKO, SKULPTA_BIOMOJ, SKULPTA_BESTOJ,
    SKULPTA_AKVOFONTOJ, SKULPTA_OBJEKTOJ, SKULPTA_URBOJ, SKULPTA_VOJOJ,
    SKULPTA_DOKOJ } = k );
  gxisdatigiMapajnElektilojn();
}
