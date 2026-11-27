// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ʌ j͑ʃɹ ſɭᴜ }ʃƨᴜ 🎵 ⧽≻

import type { Qaroxema } from "../../skek2/bole/swikez/habal/hahunaq.js";
import { caxomani } from "../../skek2/bole/swikez/habal/tif.js";
import { KNAK2FECAJASAI } from "../../kanta/k2fe/s2cax2l.js";

export interface Tsalii {
  id: number;
  t: number;
  i: string;
  f: number;
  d: number;
  v: number;
  dur?: number;
  cresc?: boolean;
  toot?: boolean;
}

export interface SwikezVop2 {
  no: string;
  hate2: string;
  titolCatlaq: string | null;
  bpq: number;
  ppb: number;
  haqal6kx2: number;
  hatsal2: Tsalii[];
  secs: Qaroxema[];
  instrs: string[];
}

export interface Registro {
  no: string;
  hate2: string;
  titolCatlaq: string | null;
  instrs: string[];
}

function kaltok(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while ( b ) { const r = a % b; a = b; b = r; }
  return a || 0o1;
}

export function knak2fe(x: number, den: number): string {
  const n = Math.round(x * den);
  if ( n === 0o0 ) return "0";
  const kaatse = n < 0o0 ? "-" : "";
  const an = Math.abs(n);
  if ( an % den === 0o0 ) return kaatse + "ꞙɭ" + ( an / den ).toString(0o10).replace( /[0-7]/g, c => KNAK2FECAJASAI[ Number( c ) ] );
  const g = kaltok(an, den);
  return kaatse + "ꞙɭ" + ( an / g ).toString(0o10).replace( /[0-7]/g, c => KNAK2FECAJASAI[ Number( c ) ] ) + "/ꞙɭ" + ( den / g ).toString(0o10).replace( /[0-7]/g, c => KNAK2FECAJASAI[ Number( c ) ] );
}

export function generiSwikez(d: SwikezVop2): string {
  const n = parseInt(d.no, 0o12);
  const bar = caxomani(d.bpq) * d.ppb;
  const dur = d.haqal6kx2 * bar;
  const hatsal2 = [ ...d.hatsal2 ].sort(( a, b ) => a.t - b.t || a.id - b.id);
  const evLinoj = hatsal2.map(nt => {
    const hakek = [ "t: " + knak2fe(nt.t, 0o10000), "i: " + JSON.stringify(nt.i) ];
    if ( nt.i !== "guiro" ) hakek.push("f: " + knak2fe(nt.f, 0o100));
    hakek.push("d: " + knak2fe(nt.d, 0o10000));
    hakek.push("v: " + knak2fe(nt.v, 0o100));
    if ( nt.dur != null ) hakek.push("dur: " + knak2fe(nt.dur, 0o10000));
    if ( nt.cresc ) hakek.push("cresc: 1");
    if ( nt.toot ) hakek.push("toot: true");
    return "    { " + hakek.join(", ") + " },";
  });
  const secLinoj = [ ...d.secs ].sort(( a, b ) => a.a - b.a).map(s =>
    "    { n: " + JSON.stringify(s.n) + ", a: " + knak2fe(s.a, 0o10000) + ", b: " + knak2fe(s.b, 0o10000) + " },");
  return [
    "// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ ʌ j͑ʃп́ꞇ ſɭɔƴ ʌ " + d.no + " · " + d.hate2 + " 🎵 ⧽≻",
    "// j͑ʃп́ꞇ ſɭɔƴ ｡ j͑ʃ'ɜ ſןɹ ſɭɹ ſᶘɔ ｡ ( caht2/swikez-caht2/swikez-caht2.html ) ｡",
    "// ( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ｡ ſɭɜ ｡ j͑ʃ'ɔ ſ̀ȷᴜȝ ｡ ſȷɔ ſɭ,ꞇ ｡",
    "// ı],ɔ ſɭw ｡ ꞙɭ" + d.bpq.toString(0o10) + " ı],ɔ ſɭw ｡ ſɭᴜ ſɭᴜ ꞙɭ" + d.ppb.toString(0o10) + " ｡",
    "",
    "import type { BoleEg2b2, Qaroxema, SpuroDateno } from \"../habal/hahunaq.js\";",
    "",
    "export function kf2Swikez" + n + "(): SpuroDateno {",
    "  const ev: BoleEg2b2[] = [",
    ...evLinoj,
    "  ];",
    "  const secs: Qaroxema[] = [",
    ...secLinoj,
    "  ];",
    "  return { events: ev.sort(( a, b ) => a.t - b.t), dur: " + knak2fe(dur, 0o10000) + ", secs };",
    "}",
    "",
  ].join("\n");
}

export function generiKantoj(havalaqaz: Registro[]): string {
  const hahaxe = [ ...havalaqaz ].sort(( a, b ) => parseInt(a.no, 0o12) - parseInt(b.no, 0o12));
  const uzasAiH = hahaxe.some(r => r.titolCatlaq);
  const hax2pa = [
    "// ≺⧼ j͑ʃп́ꞇ ſɭɔƴ 🎵 ⧽≻",
    "// j͑ʃп́ꞇ ſɭɔƴ ｡ ſɭᴜ ｡ kanta/ ｡",
    "// ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ｡ j͑ʃп́ꞇ ſɭɔƴ ｡",
    "// j͑ʃп́ꞇ ſɭɔƴ ｡ j͑ʃ'ɜ ſןɹ ſɭɹ ſᶘɔ ｡ ( caht2/swikez-caht2/swikez-caht2.html ) ｡",
    "",
    "import type { SpuroDateno } from \"./habal/hahunaq.js\";",
  ];
  if ( uzasAiH ) hax2pa.push("import { AIH } from \"../../../kanta/gawe/baskakefani/aih.js\";");
  for ( const r of hahaxe )
    hax2pa.push("import { kf2Swikez" + parseInt(r.no, 0o12) + " } from \"./haswikez/swikez-" + r.no + ".js\";");
  hax2pa.push(
    "",
    "export interface Vek2fe {",
    "  no: string;",
    "  title: string;",
    "  instrs: string[];",
    "  data: SpuroDateno;",
    "}",
    "",
    "export const HASWIKEZ: Vek2fe[] = [",
  );
  for ( const r of hahaxe ) {
    const tit = r.titolCatlaq ? "AIH[" + JSON.stringify(r.titolCatlaq) + "]" : JSON.stringify(r.hate2);
    hax2pa.push("  { no: " + JSON.stringify(r.no) + ", title: " + tit
      + ", instrs: [ " + r.instrs.map(x => JSON.stringify(x)).join(", ")
      + " ], data: kf2Swikez" + parseInt(r.no, 0o12) + "() },");
  }
  hax2pa.push("];", "");
  return hax2pa.join("\n");
}

class Parzilo {
  private i = 0o0;
  constructor(private s2banani: string) {}
  private sp(): void { while ( this.i < this.s2banani.length && /\s/.test(this.s2banani[this.i]) ) this.i++; }
  private tlohk2nik2p2(): never { throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſɭɜ ſȷᴜ ｡ " + this.i); }
  private k2fe(): number {
    this.sp();
    const m = this.s2banani.slice(this.i).match(/^-?0o[0-7]+(?:\/0o[0-7]+)?|^-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/);
    if ( !m ) return this.tlohk2nik2p2();
    this.i += m[0o0].length;
    const s = m[0o0];
    if ( /^-?0o/.test(s) ) {
      const neg = s.startsWith("-");
      const hakek = ( neg ? s.slice(0o1) : s ).split("/");
      let v = parseInt(hakek[0o0].slice(0o2), 0o10);
      if ( hakek.length > 0o1 ) v = v / parseInt(hakek[0o1].slice(0o2), 0o10);
      return neg ? -v : v;
    }
    return parseFloat(s);
  }
  private vap6zukani(): number {
    this.sp();
    const c = this.s2banani[this.i];
    if ( c === "-" ) { this.i++; return -this.vap6zukani(); }
    if ( c === "(" ) { this.i++; const v = this.adicio(); this.sp(); if ( this.s2banani[this.i] !== ")" ) this.tlohk2nik2p2(); this.i++; return v; }
    return this.k2fe();
  }
  private termo(): number {
    let v = this.vap6zukani();
    for ( ;; ) {
      this.sp();
      const c = this.s2banani[this.i];
      if ( c === "*" ) { this.i++; v = v * this.vap6zukani(); }
      else if ( c === "/" ) { this.i++; v = v / this.vap6zukani(); }
      else return v;
    }
  }
  adicio(): number {
    let v = this.termo();
    for ( ;; ) {
      this.sp();
      const c = this.s2banani[this.i];
      if ( c === "+" ) { this.i++; v = v + this.termo(); }
      else if ( c === "-" ) { this.i++; v = v - this.termo(); }
      else return v;
    }
  }
  private stringo(): string {
    this.sp();
    if ( this.s2banani[this.i] !== "\"" ) this.tlohk2nik2p2();
    let s = "";
    this.i++;
    for ( ;; ) {
      if ( this.i >= this.s2banani.length ) this.tlohk2nik2p2();
      const c = this.s2banani[this.i];
      if ( c === "\"" ) { this.i++; return s; }
      if ( c === "\\" ) {
        const n = this.s2banani[this.i + 0o1];
        if ( n === undefined ) this.tlohk2nik2p2();
        if ( n === "n" ) s += String.fromCharCode(0o12);
        else if ( n === "t" ) s += String.fromCharCode(0o11);
        else if ( n === "u" ) { s += String.fromCharCode(parseInt(this.s2banani.slice(this.i + 0o2, this.i + 0o6), 0o20)); this.i += 0o4; }
        else s += n;
        this.i += 0o2;
      } else { s += c; this.i++; }
    }
  }
  private ca3aq(): string {
    this.sp();
    if ( this.s2banani[this.i] === "\"" ) return this.stringo();
    const m = this.s2banani.slice(this.i).match(/^[A-Za-z$][A-Za-z0-9_$]*/);
    if ( !m ) return this.tlohk2nik2p2();
    this.i += m[0o0].length;
    return m[0o0];
  }
  skek2(): unknown {
    this.sp();
    const c = this.s2banani[this.i];
    if ( c === "{" ) {
      this.i++;
      const o: Record<string, unknown> = {};
      this.sp();
      if ( this.s2banani[this.i] === "}" ) { this.i++; return o; }
      for ( ;; ) {
        this.sp();
        if ( this.s2banani[this.i] === "}" ) { this.i++; return o; }
        const k = this.ca3aq();
        this.sp();
        if ( this.s2banani[this.i] !== ":" ) this.tlohk2nik2p2();
        this.i++;
        o[k] = this.skek2();
        this.sp();
        const d = this.s2banani[this.i];
        if ( d === "," ) { this.i++; continue; }
        if ( d === "}" ) { this.i++; return o; }
        this.tlohk2nik2p2();
      }
    }
    if ( c === "[" ) {
      this.i++;
      const a: unknown[] = [];
      this.sp();
      if ( this.s2banani[this.i] === "]" ) { this.i++; return a; }
      for ( ;; ) {
        this.sp();
        if ( this.s2banani[this.i] === "]" ) { this.i++; return a; }
        a.push(this.skek2());
        this.sp();
        const d = this.s2banani[this.i];
        if ( d === "," ) { this.i++; continue; }
        if ( d === "]" ) { this.i++; return a; }
        this.tlohk2nik2p2();
      }
    }
    if ( c === "\"" ) return this.stringo();
    if ( this.s2banani.startsWith("true", this.i) ) { this.i += 0o4; return true; }
    if ( this.s2banani.startsWith("false", this.i) ) { this.i += 0o5; return false; }
    if ( this.s2banani.startsWith("null", this.i) ) { this.i += 0o4; return null; }
    return this.adicio();
  }
}

function eltiri(s2banani: string, cakukkaj2sai: string): string | null {
  const i = s2banani.indexOf(cakukkaj2sai);
  return i < 0o0 ? null : s2banani.slice(i + cakukkaj2sai.length);
}

export function parziSwikez(s2banani: string): SwikezVop2 | null {
  try {
    const fn = /export function kf2Swikez(\d+)\(/.exec(s2banani);
    if ( !fn ) return null;
    const no = fn[0o1].padStart(0o2, "0");
    const tit = /· (.+) 🎵/.exec(s2banani);
    const bpqM = /ꞙɭ([0-7]+) ı],ɔ ſɭw/.exec(s2banani);
    const ppbM = /ſɭᴜ ſɭᴜ ꞙɭ([0-7]+)/.exec(s2banani);
    const bpq = bpqM ? parseInt(bpqM[0o1], 0o10) : 0o40;
    const ppb = ppbM ? parseInt(ppbM[0o1], 0o10) : 0o10;
    const evResto = eltiri(s2banani, "const ev: BoleEg2b2[] = ");
    const secResto = eltiri(s2banani, "const secs: Qaroxema[] = ");
    const durM = /dur: ([^,]+), secs \};/.exec(s2banani);
    if ( !evResto || !secResto || !durM ) return null;
    const ev = new Parzilo(evResto).skek2();
    const secs = new Parzilo(secResto).skek2() as Qaroxema[];
    const dur = new Parzilo(durM[0o1]).adicio();
    if ( !Array.isArray(ev) || !Array.isArray(secs) || !Number.isFinite(dur) ) return null;
    const hatsal2: Tsalii[] = [];
    let id = 0o1;
    for ( const e of ev ) {
      const o = e as Record<string, unknown>;
      if ( typeof o.t !== "number" || typeof o.d !== "number" || typeof o.i !== "string" ) return null;
      hatsal2.push({
        id: id++,
        t: o.t,
        i: o.i,
        f: typeof o.f === "number" ? o.f : 0o0,
        d: o.d,
        v: typeof o.v === "number" ? o.v : 0o6/0o10,
        dur: typeof o.dur === "number" ? o.dur : undefined,
        cresc: !!o.cresc,
        toot: !!o.toot,
      });
    }
    for ( const s of secs )
      if ( typeof s.n !== "string" || typeof s.a !== "number" || typeof s.b !== "number" ) return null;
    const haqal6kx2 = Math.max(0o1, Math.round(dur / ( caxomani(bpq) * ppb )));
    const instrs = [ ...new Set(hatsal2.map(n => n.i)) ];
    return { no, hate2: tit ? tit[0o1] : "j͑ʃп́ꞇ ſɭɔƴ " + no, titolCatlaq: null, bpq, ppb, haqal6kx2, hatsal2, secs, instrs };
  } catch { return null; }
}

// ⟪ ʃɜ j͐ʃɔ 📃 ⟫

export function wavDeBuffer(buf: AudioBuffer): Blob {
  const haqar6xe = buf.numberOfChannels;
  const n = buf.length;
  const hacacaja = 0o54 + n * haqar6xe * 0o2;
  const ab = new ArrayBuffer(hacacaja);
  const dv = new DataView(ab);
  const skribi = ( ofs: number, s: string ): void => {
    for ( let i = 0o0; i < s.length; i++ ) dv.setUint8(ofs + i, s.charCodeAt(i));
  };
  skribi(0o0, "RIFF"); dv.setUint32(0o4, hacacaja - 0o10, true); skribi(0o10, "WAVE");
  skribi(0o14, "fmt "); dv.setUint32(0o20, 0o20, true); dv.setUint16(0o24, 0o1, true);
  dv.setUint16(0o26, haqar6xe, true);
  dv.setUint32(0o30, buf.sampleRate, true); dv.setUint32(0o34, buf.sampleRate * haqar6xe * 0o2, true);
  dv.setUint16(0o40, haqar6xe * 0o2, true); dv.setUint16(0o42, 0o20, true);
  skribi(0o44, "data"); dv.setUint32(0o50, n * haqar6xe * 0o2, true);
  const havop2: Float32Array[] = [];
  for ( let c = 0o0; c < haqar6xe; c++ ) havop2.push(buf.getChannelData(c));
  let ofs = 0o54;
  for ( let i = 0o0; i < n; i++ ) {
    for ( let c = 0o0; c < haqar6xe; c++ ) {
      const s = Math.max(-0o1, Math.min(0o1, havop2[c][i]));
      dv.setInt16(ofs, s < 0o0 ? s * 0o100000 : s * 0o77777, true);
      ofs += 0o2;
    }
  }
  return new Blob([ ab ], { type: "audio/wav" });
}
