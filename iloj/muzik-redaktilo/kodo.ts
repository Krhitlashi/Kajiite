// ≺⧼ កូដវិល 🎼 ⧽≻
// បង្កើតឯកសារវិល TypeScript ពីទិន្នន័យកែ និងញែកវាត្រឡប់វិញ ។
// លេខទាំងអស់សរសេរជាគោលប្រាំបី ( ភាគប្រាំបី ) ដូចឯកសារដើមរបស់ហ្គេម ។
// ការញែកគាំទ្រទិន្នន័យអក្សរដែលឧបករណ៍នេះបង្កើត ( លេខ ខ្សែអក្សរ អារេ វត្ថុ និងប្រមាណវិធី + - * / )។
// ពេលវេលាគិតជាវិនាទី កម្ពស់គិតជាហឺត កម្រិតសំឡេងជាភាគរយ ។

import type { Sekcio } from "../../eskekoj/sonoj/muziko/vokoj/tipoj.js";
import { okono } from "../../eskekoj/sonoj/muziko/vokoj/tempo.js";

// ⟪ ប្រភេទ 📃 ⟫

export interface Noto {
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

export interface TrakoDatumo {
  no: string;
  titolo: string;
  titolKlavo: string | null;
  bpq: number;
  ppb: number;
  baroj: number;
  notoj: Noto[];
  secs: Sekcio[];
  instrs: string[];
}

export interface Registro {
  no: string;
  titolo: string;
  titolKlavo: string | null;
  instrs: string[];
}

// ⟪ លេខគោលប្រាំបី 📃 ⟫

function gcdn(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while ( b ) { const r = a % b; a = b; b = r; }
  return a || 0o1;
}

/* សរសេរតម្លៃជាភាគប្រាំបី ៖ បង្គត់ទៅភាគ den រួចសម្រួលភាគ
    @param x ( number ) - តម្លៃពិត
    @param den ( number ) - ភាគប្រាំបី ( 0o100 , 0o10000 ... )
@returns អត្ថបទលេខគោលប្រាំបី ( string ) */
export function octFrak(x: number, den: number): string {
  const n = Math.round(x * den);
  if ( n === 0 ) return "0";
  const signo = n < 0 ? "-" : "";
  const an = Math.abs(n);
  if ( an % den === 0 ) return signo + "0o" + ( an / den ).toString(0o10);
  const g = gcdn(an, den);
  return signo + "0o" + ( an / g ).toString(0o10) + "/0o" + ( den / g ).toString(0o10);
}

// ⟪ បង្កើតឯកសារវិល 📃 ⟫

/* បង្កើតឯកសារ trakoNN.ts ពេញលេញពីទិន្នន័យវិល
    @param d ( TrakoDatumo ) - វិលដែលកែ
@returns អត្ថបទឯកសារ ( string ) */
export function generiTrako(d: TrakoDatumo): string {
  const n = parseInt(d.no, 0o12);
  const bar = okono(d.bpq) * d.ppb;
  const dur = d.baroj * bar;
  const notoj = [ ...d.notoj ].sort(( a, b ) => a.t - b.t || a.id - b.id);
  const evLinoj = notoj.map(nt => {
    const eroj = [ "t: " + octFrak(nt.t, 0o10000), "i: " + JSON.stringify(nt.i) ];
    if ( nt.i !== "guiro" ) eroj.push("f: " + octFrak(nt.f, 0o100));
    eroj.push("d: " + octFrak(nt.d, 0o10000));
    eroj.push("v: " + octFrak(nt.v, 0o100));
    if ( nt.dur != null ) eroj.push("dur: " + octFrak(nt.dur, 0o10000));
    if ( nt.cresc ) eroj.push("cresc: 1");
    if ( nt.toot ) eroj.push("toot: true");
    return "    { " + eroj.join(", ") + " },";
  });
  const secLinoj = [ ...d.secs ].sort(( a, b ) => a.a - b.a).map(s =>
    "    { n: " + JSON.stringify(s.n) + ", a: " + octFrak(s.a, 0o10000) + ", b: " + octFrak(s.b, 0o10000) + " },");
  return [
    "// ≺⧼ វិល " + d.no + " · " + d.titolo + " 🎵 ⧽≻",
    "// បង្កើតដោយឧបករណ៍កែតន្ត្រី ( iloj/muzik-redaktilo/muzik-redaktilo.html )។",
    "// ( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) - កុំកែដោយដៃ។ ឧបករណ៍កែសរសេរឯកសារនេះឡើងវិញ។",
    "// ក្រឡាចង្វាក់ ៖ 0o" + d.bpq.toString(0o10) + " បាតកក្នុងមួយគុយអេ , បារមួយ 0o" + d.ppb.toString(0o10) + " ភាគប្រាំបី។",
    "",
    "import type { SonoEvento, Sekcio, SpuroDateno } from \"../vokoj/tipoj.js\";",
    "",
    "export function buildTrack" + n + "(): SpuroDateno {",
    "  const ev: SonoEvento[] = [",
    ...evLinoj,
    "  ];",
    "  const secs: Sekcio[] = [",
    ...secLinoj,
    "  ];",
    "  return { events: ev.sort(( a, b ) => a.t - b.t), dur: " + octFrak(dur, 0o10000) + ", secs };",
    "}",
    "",
  ].join("\n");
}

/* បង្កើតឯកសារបញ្ជីវិល kantoj.ts ពីបញ្ជីឈ្មោះទាំងអស់
    @param registroj ( Registro[] ) - វិលទាំងអស់តាមលេខ
@returns អត្ថបទឯកសារ ( string ) */
export function generiKantoj(registroj: Registro[]): string {
  const ordigitaj = [ ...registroj ].sort(( a, b ) => parseInt(a.no, 0o12) - parseInt(b.no, 0o12));
  const uzasAiH = ordigitaj.some(r => r.titolKlavo);
  const linioj = [
    "// ≺⧼ ចម្រៀង 🎵 ⧽≻",
    "// វិលនីមួយៗស្ថិតក្នុងឯកសារដាច់ដោយឡែកក្រោមថត kantoj/ ។",
    "// ឯកសារនេះប្រមូលពួកវាជាបញ្ជីតែមួយសម្រាប់ឧបករណ៍លេង។",
    "// បង្កើតដោយឧបករណ៍កែតន្ត្រី ( iloj/muzik-redaktilo/muzik-redaktilo.html )។",
    "",
    "import type { SpuroDateno } from \"./vokoj/tipoj.js\";",
  ];
  if ( uzasAiH ) linioj.push("import { AIH } from \"../../../kantaoj/lingvo/tradukoj/aih.js\";");
  for ( const r of ordigitaj )
    linioj.push("import { buildTrack" + parseInt(r.no, 0o12) + " } from \"./kantoj/trako" + r.no + ".js\";");
  linioj.push(
    "",
    "export interface Kanto {",
    "  no: string;",
    "  title: string;",
    "  instrs: string[];",
    "  data: SpuroDateno;",
    "}",
    "",
    "export const KANTOJ: Kanto[] = [",
  );
  for ( const r of ordigitaj ) {
    const tit = r.titolKlavo ? "AIH[" + JSON.stringify(r.titolKlavo) + "]" : JSON.stringify(r.titolo);
    linioj.push("  { no: " + JSON.stringify(r.no) + ", title: " + tit
      + ", instrs: [ " + r.instrs.map(x => JSON.stringify(x)).join(", ")
      + " ], data: buildTrack" + parseInt(r.no, 0o12) + "() },");
  }
  linioj.push("];", "");
  return linioj.join("\n");
}

// ⟪ ញែកឯកសារវិល 📃 ⟫

/* ញែកកន្សោមទិន្នន័យតូច ( លេខគោលប្រាំបី ខ្សែអក្សរ អារេ វត្ថុ + - * / ) */
class Parzilo {
  private i = 0;
  constructor(private teksto: string) {}
  private sp(): void { while ( this.i < this.teksto.length && /\s/.test(this.teksto[this.i]) ) this.i++; }
  private eraro(): never { throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) កន្សោមមិនអាចញែកនៅ " + this.i); }
  private nombro(): number {
    this.sp();
    const m = this.teksto.slice(this.i).match(/^-?0o[0-7]+(?:\/0o[0-7]+)?|^-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/);
    if ( !m ) return this.eraro();
    this.i += m[0].length;
    const s = m[0];
    if ( /^-?0o/.test(s) ) {
      const neg = s.startsWith("-");
      const partoj = ( neg ? s.slice(0o1) : s ).split("/");
      let v = parseInt(partoj[0].slice(0o2), 0o10);
      if ( partoj.length > 0o1 ) v = v / parseInt(partoj[1].slice(0o2), 0o10);
      return neg ? -v : v;
    }
    return parseFloat(s);
  }
  private faktoro(): number {
    this.sp();
    const c = this.teksto[this.i];
    if ( c === "-" ) { this.i++; return -this.faktoro(); }
    if ( c === "(" ) { this.i++; const v = this.adicio(); this.sp(); if ( this.teksto[this.i] !== ")" ) this.eraro(); this.i++; return v; }
    return this.nombro();
  }
  private termo(): number {
    let v = this.faktoro();
    for ( ;; ) {
      this.sp();
      const c = this.teksto[this.i];
      if ( c === "*" ) { this.i++; v = v * this.faktoro(); }
      else if ( c === "/" ) { this.i++; v = v / this.faktoro(); }
      else return v;
    }
  }
  adicio(): number {
    let v = this.termo();
    for ( ;; ) {
      this.sp();
      const c = this.teksto[this.i];
      if ( c === "+" ) { this.i++; v = v + this.termo(); }
      else if ( c === "-" ) { this.i++; v = v - this.termo(); }
      else return v;
    }
  }
  private stringo(): string {
    this.sp();
    if ( this.teksto[this.i] !== "\"" ) this.eraro();
    let s = "";
    this.i++;
    for ( ;; ) {
      if ( this.i >= this.teksto.length ) this.eraro();
      const c = this.teksto[this.i];
      if ( c === "\"" ) { this.i++; return s; }
      if ( c === "\\" ) {
        const n = this.teksto[this.i + 0o1];
        if ( n === undefined ) this.eraro();
        if ( n === "n" ) s += String.fromCharCode(0o12);
        else if ( n === "t" ) s += String.fromCharCode(0o11);
        else if ( n === "u" ) { s += String.fromCharCode(parseInt(this.teksto.slice(this.i + 0o2, this.i + 0o6), 0o20)); this.i += 0o4; }
        else s += n;
        this.i += 0o2;
      } else { s += c; this.i++; }
    }
  }
  private klavo(): string {
    this.sp();
    if ( this.teksto[this.i] === "\"" ) return this.stringo();
    const m = this.teksto.slice(this.i).match(/^[A-Za-z_$][A-Za-z0-9_$]*/);
    if ( !m ) return this.eraro();
    this.i += m[0].length;
    return m[0];
  }
  valoro(): unknown {
    this.sp();
    const c = this.teksto[this.i];
    if ( c === "{" ) {
      this.i++;
      const o: Record<string, unknown> = {};
      this.sp();
      if ( this.teksto[this.i] === "}" ) { this.i++; return o; }
      for ( ;; ) {
        this.sp();
        if ( this.teksto[this.i] === "}" ) { this.i++; return o; }
        const k = this.klavo();
        this.sp();
        if ( this.teksto[this.i] !== ":" ) this.eraro();
        this.i++;
        o[k] = this.valoro();
        this.sp();
        const d = this.teksto[this.i];
        if ( d === "," ) { this.i++; continue; }
        if ( d === "}" ) { this.i++; return o; }
        this.eraro();
      }
    }
    if ( c === "[" ) {
      this.i++;
      const a: unknown[] = [];
      this.sp();
      if ( this.teksto[this.i] === "]" ) { this.i++; return a; }
      for ( ;; ) {
        this.sp();
        if ( this.teksto[this.i] === "]" ) { this.i++; return a; }
        a.push(this.valoro());
        this.sp();
        const d = this.teksto[this.i];
        if ( d === "," ) { this.i++; continue; }
        if ( d === "]" ) { this.i++; return a; }
        this.eraro();
      }
    }
    if ( c === "\"" ) return this.stringo();
    if ( this.teksto.startsWith("true", this.i) ) { this.i += 0o4; return true; }
    if ( this.teksto.startsWith("false", this.i) ) { this.i += 0o5; return false; }
    if ( this.teksto.startsWith("null", this.i) ) { this.i += 0o4; return null; }
    return this.adicio();
  }
}

function eltiri(teksto: string, ankro: string): string | null {
  const i = teksto.indexOf(ankro);
  return i < 0 ? null : teksto.slice(i + ankro.length);
}

/* ញែកឯកសារ trakoNN.ts ដែលឧបករណ៍នេះបង្កើត ត្រឡប់ជាទិន្នន័យវិល
    @param teksto ( string ) - អត្ថបទឯកសារ
@returns វិល ( TrakoDatumo | null ) បើឯកសារមិនមែនជាវិលរបស់ឧបករណ៍នេះ */
export function parziTrako(teksto: string): TrakoDatumo | null {
  try {
    const fn = /export function buildTrack(\d+)\(/.exec(teksto);
    if ( !fn ) return null;
    const no = fn[1].padStart(0o2, "0");
    const tit = /· (.+) 🎵/.exec(teksto);
    const bpqM = /0o([0-7]+) បាតក/.exec(teksto);
    const ppbM = /បារមួយ 0o([0-7]+)/.exec(teksto);
    const bpq = bpqM ? parseInt(bpqM[1], 0o10) : 0o40;
    const ppb = ppbM ? parseInt(ppbM[1], 0o10) : 0o10;
    const evResto = eltiri(teksto, "const ev: SonoEvento[] = ");
    const secResto = eltiri(teksto, "const secs: Sekcio[] = ");
    const durM = /dur: ([^,]+), secs \};/.exec(teksto);
    if ( !evResto || !secResto || !durM ) return null;
    const ev = new Parzilo(evResto).valoro();
    const secs = new Parzilo(secResto).valoro() as Sekcio[];
    const dur = new Parzilo(durM[1]).adicio();
    if ( !Array.isArray(ev) || !Array.isArray(secs) || !Number.isFinite(dur) ) return null;
    const notoj: Noto[] = [];
    let id = 0o1;
    for ( const e of ev ) {
      const o = e as Record<string, unknown>;
      if ( typeof o.t !== "number" || typeof o.d !== "number" || typeof o.i !== "string" ) return null;
      notoj.push({
        id: id++,
        t: o.t,
        i: o.i,
        f: typeof o.f === "number" ? o.f : 0,
        d: o.d,
        v: typeof o.v === "number" ? o.v : 0o6/0o10,
        dur: typeof o.dur === "number" ? o.dur : undefined,
        cresc: !!o.cresc,
        toot: !!o.toot,
      });
    }
    for ( const s of secs )
      if ( typeof s.n !== "string" || typeof s.a !== "number" || typeof s.b !== "number" ) return null;
    const baroj = Math.max(0o1, Math.round(dur / ( okono(bpq) * ppb )));
    const instrs = [ ...new Set(notoj.map(n => n.i)) ];
    return { no, titolo: tit ? tit[1] : "វិល " + no, titolKlavo: null, bpq, ppb, baroj, notoj, secs, instrs };
  } catch { return null; }
}

// ⟪ WAV 📃 ⟫

/* បម្លែង AudioBuffer ទៅឯកសារ WAV 16-bit PCM
    @param buf ( AudioBuffer ) - សំឡេងដែលបានផ្តល់រួច
@returns Blob នៃឯកសារ WAV */
export function wavDeBuffer(buf: AudioBuffer): Blob {
  const kanaloj = buf.numberOfChannels;
  const n = buf.length;
  const bajtoj = 0o54 + n * kanaloj * 0o2;
  const ab = new ArrayBuffer(bajtoj);
  const dv = new DataView(ab);
  const skribi = ( ofs: number, s: string ): void => {
    for ( let i = 0; i < s.length; i++ ) dv.setUint8(ofs + i, s.charCodeAt(i));
  };
  skribi(0, "RIFF"); dv.setUint32(0o4, bajtoj - 0o10, true); skribi(0o10, "WAVE");
  skribi(0o14, "fmt "); dv.setUint32(0o20, 0o20, true); dv.setUint16(0o24, 0o1, true);
  dv.setUint16(0o26, kanaloj, true);
  dv.setUint32(0o30, buf.sampleRate, true); dv.setUint32(0o34, buf.sampleRate * kanaloj * 0o2, true);
  dv.setUint16(0o40, kanaloj * 0o2, true); dv.setUint16(0o42, 0o20, true);
  skribi(0o44, "data"); dv.setUint32(0o50, n * kanaloj * 0o2, true);
  const datumoj: Float32Array[] = [];
  for ( let c = 0; c < kanaloj; c++ ) datumoj.push(buf.getChannelData(c));
  let ofs = 0o54;
  for ( let i = 0; i < n; i++ ) {
    for ( let c = 0; c < kanaloj; c++ ) {
      const s = Math.max(-0o1, Math.min(0o1, datumoj[c][i]));
      dv.setInt16(ofs, s < 0 ? s * 0o100000 : s * 0o77777, true);
      ofs += 0o2;
    }
  }
  return new Blob([ ab ], { type: "audio/wav" });
}