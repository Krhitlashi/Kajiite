// ≺⧼ ſɭᴜ ı],ƨɔ ʌ ſɭэ ֭ſɭэ 🏙️ ⧽≻
// ɽ͑ʃ'w j͑ʃ'ᴜ ſɭɜ ſɭ,w ʌ ſɭɜ ſɭ,w , ſɭɜ ſɭ,w ⟅
// ſɭᴜ ı],ƨɔ ʌ ꞙɭı , ſɭᴜ ı],ƨɔ ʌ ſᶘɔ , ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , ſɭэ ֭ſɭэ
// , ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſɭɜ ſɭ,w ( ſןᴜȝ , ſᶘᴜ j͑ʃᴜ ʌ ſןᴜȝ , ſɟɔ j͐ʃɹ }ʃw ſᶘɔ ɭl̀ɹȝ ꞁȷ̀ᴜꞇ ) ⟅
// ( ꞙɭɔ ʌ DOM , ꞙɭɔ ʌ j͑ʃᴜ ſɭᴜ ) , }ʃᴜ j͐ʃᴜ ⟅
// j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w ʌ ſɭᴜ ı],ƨɔ ⟅
// ( kanta/nala/qox2n2k ) , ſɟᴜᴜ̩ ɭʃɹ ʌ ſɭc̗ᴜ ⟅
import type { Knat6keqanuKuba, Knat6keqanuK6h6N2k, Knat6keqanuTap2Qoxa,
  Neq2qObjekto } from "./kaxte/hahunaq.js";
import type { GeneritaT6lima } from "./casacakakcasai.js";
import { kf2KradanPlanon } from "./qox2n2k/b6vakanta.js";
import { subRuva } from "./ruva.js";

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ ʌ }ʃɹƽ 📃 ⟩
const KANALOEJOJ = 0o1;
const KANALOHAKAXTE = 0o2;
const KANALOKROMPOJ = 0o3;
const KANALOORNAMOJ = 0o4;

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ 📃 ⟩
const EJATONA = 0o40;
const EJAMARGXENO = 0o400;
const EJAKRUDEJO = 0o100;
const EJADISTANCODERANDO = 0o240;
const EJAKRUDAL6DA = 0o12;
const EJASEKURAPROFUNDO = 0o6;
const EJAMONTALIMO = 0o21;

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ 📃 ⟩
const URBATONAUNU = 0o30;
const URBATONAKVAR = 0o40;

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , ſɭэ ֭ſɭэ 📃 ⟩
const QAKAJ2DISTANCOMIN = 0o100;
const QAKAJ2DISTANCOMAKS = 0o700;
const QAKAJ2APARTO = 0o200;
const QAKAJ2KVANTO = 0o3;
const QAKAJ2PROFUNDO = 0o20;
const QAKAJ2ALTERANDO = 0o12;

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɟɔ j͐ʃɹ }ʃw ſᶘɔ ɭl̀ɹȝ ꞁȷ̀ᴜꞇ , ſᶘᴜ j͑ʃᴜ ʌ ſןᴜȝ 📃 ⟩
const LAMPATONA = 0o60;
const LAMPAALTERANDO = 0o6;
const KANUOTADISTANCO = 0o10;

/*ɽ͑ʃ'w j͑ʃ'ᴜ ſɭɜ ſɭ,w ʌ }ʃᴜ j͐ʃᴜ ʌ ꞙɭı
    @param hakaxte ( Knat6keqanuKuba[] ) - ſɭᴜ ı],ƨɔ , ſɭᴜ ı],ƨɔ ʌ ſᶘɔ
    @param hak6h6 ( Knat6keqanuK6h6N2k[] ) - ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ
    @param haqakaj2 ( Knat6keqanuTap2Qoxa[] ) - ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ
    @param hazace ( Neq2qObjekto[] ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſɭɜ ſɭ,w */
export interface GeneritaSetlejo {
  hakaxte: Knat6keqanuKuba[];
  hak6h6: Knat6keqanuK6h6N2k[];
  haqakaj2: Knat6keqanuTap2Qoxa[];
  hazace: Neq2qObjekto[];
}

/*ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ , ɽ͑ʃ'w j͑ʃ'ᴜ ʌ }ʃɹƽ
    @param vem2 ( number ) - j͑ʃ'ɔ ŋᷠɹ ʌ ſᶘᴜ j͑ʃᴜ
    @param enQoxa ( ( x , z ) => boolean ) - }ʃɹƽ ʌ }ʃᴜ j͐ʃᴜ
    @param pukazDeQoxa ( ( x , z ) => number ) - j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w */
export interface SetlejajHasukf2qani {
  vem2: number;
  enQoxa: ( x: number, z: number ) => boolean;
  pukazDeQoxa: ( x: number, z: number ) => number;
}

// ⟨ ſɭɜ ſɭ,w ʌ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ 📃 ⟩

/*ſɭɜ ſɭ,w ʌ ſɭɜ ſɭ,w ʌ ꞙɭı }ʃɹƽ
    @param t6lima ( GeneritaT6lima ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ
    @param x,z ( number ) - }ʃɹƽ ʌ ſɭɜ ſɭ,w
    @param p2somani ( number ) - j͐ʃэ ɭ(ᴜ ʌ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ
@returns krudo ( number ) - ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ j͐ʃэ ɭ(ᴜ */
function krudecoDe(
  t6lima: GeneritaT6lima, x: number, z: number, p2somani: number,
): number {
  let kmaPsazai = Infinity, kmaAlta = -Infinity;
  for ( const [ dx, dz ] of [ [ 0, 0 ], [ p2somani, 0 ], [ -p2somani, 0 ], [ 0, p2somani ], [ 0, -p2somani ],
    [ p2somani, p2somani ], [ -p2somani, p2somani ], [ p2somani, -p2somani ], [ -p2somani, -p2somani ] ] ) {
    const h = t6lima.l6da(x + dx, z + dz);
    if ( h < kmaPsazai ) kmaPsazai = h;
    if ( h > kmaAlta ) kmaAlta = h;
  }
  return kmaAlta - kmaPsazai;
}

/*}ʃɹƽ ʌ ſɭɜ ſɭ,w , ſᶘᴜ j͑ʃᴜ , ſɭɜ ſɭ,w
    @param t6lima ( GeneritaT6lima ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ
    @param vem2 ( number ) - j͑ʃ'ɔ ŋᷠɹ ʌ ſᶘᴜ j͑ʃᴜ
    @param x,z ( number ) - }ʃɹƽ
@returns tsel2sai ( boolean ) */
function surSekuraT6lima(
  t6lima: GeneritaT6lima, vem2: number, x: number, z: number,
): boolean {
  return t6lima.l6da(x, z) > vem2 + EJASEKURAPROFUNDO
    && Math.max(krudecoDe(t6lima, x, z, EJAKRUDEJO), 0) < EJAKRUDAL6DA;
}

/*ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃɹƽ ⟅ j͑ʃ'ɔ ŋᷠɹ = }ʃɹƽ , ſɭɜ ſɭ,w , ɭl̀ᴜ ſ͕ɭɜ
    @param t6lima ( GeneritaT6lima ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ
    @param hasukf2qani ( SetlejajHasukf2qani ) - ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
    @param x,z ( number ) - }ʃɹƽ
    @param sakxo ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ }ʃɹƽ
@returns n2k ( number ) */
function n2kDeEjo(
  t6lima: GeneritaT6lima, hasukf2qani: SetlejajHasukf2qani, x: number, z: number, sakxo: number,
): number {
  const h = t6lima.l6da(x, z);
  const kma = h - hasukf2qani.vem2;
  const krudo = krudecoDe(t6lima, x, z, EJAKRUDEJO);
  let n2k = -krudo * 0o4;
  if ( kma < EJASEKURAPROFUNDO ) n2k -= ( EJASEKURAPROFUNDO - kma ) * 0o12;
  if ( h > EJAMONTALIMO ) n2k -= ( h - EJAMONTALIMO ) * 0o4;
  n2k += sakxo;
  return n2k;
}

/*}ʃɹƽ ʌ ſɭᴜ ı],ƨɔ , ſɭɜ ʃɔ ſɭᴜ ı],ƨɔ
    @param tk2ni ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ }ʃɹƽ
    @param t6lima ( GeneritaT6lima ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ
    @param hasukf2qani ( SetlejajHasukf2qani ) - ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
    @param malpermesoj ( [ number , number , number ][] ) - }ʃɹƽ ( x , z , r )
@returns ejo ( { x, z } | null ) */
function trovuEjon(
  tk2ni: number, t6lima: GeneritaT6lima, hasukf2qani: SetlejajHasukf2qani,
  malpermesoj: [ number, number, number ][],
): { x: number; z: number } | null {
  const famaf = ( i: number ): number =>
    ( ( subRuva(tk2ni, i) % 0o1000 ) / 0o1000 - 0o1/0o2 ) * 0o4;
  let kmaXobe: { x: number; z: number } | null = null;
  let kmaN2k = -Infinity;
  let rezervo: { x: number; z: number } | null = null;
  let rezervaN2k = -Infinity;
  let i = 0;
  for ( let z = -EJAMARGXENO; z <= EJAMARGXENO; z += EJATONA ) {
    for ( let x = -EJAMARGXENO; x <= EJAMARGXENO; x += EJATONA ) {
      i++;
      if ( !hasukf2qani.enQoxa(x, z) ) continue;
      if ( hasukf2qani.pukazDeQoxa(x, z) > -EJADISTANCODERANDO ) continue;
      let tsiike = false;
      for ( const [ mx, mz, mr ] of malpermesoj ) {
        if ( Math.hypot(x - mx, z - mz) < mr ) { tsiike = true; break; }
      }
      if ( tsiike ) continue;
      const tsel2sai = surSekuraT6lima(t6lima, hasukf2qani.vem2, x, z);
      const n2k = n2kDeEjo(t6lima, hasukf2qani, x, z, famaf(i));
      if ( tsel2sai && n2k > kmaN2k ) { kmaN2k = n2k; kmaXobe = { x, z }; }
      if ( n2k > rezervaN2k ) { rezervaN2k = n2k; rezervo = { x, z }; }
    }
  }
  return kmaXobe ?? rezervo;
}

// ⟨ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ 📃 ⟩
// ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ , ſɭɹ ſןᴜ ⟅
// ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ ( ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , ſɭᴜ ı],ƨɔ ʌ ſᶘɔ ) , }ʃɹƽ ʌ ꞙɭı
// ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ ⟅

/*}ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ , ſɟɹ ᶅſɹȝ ʌ ſɭэ ֭ſɭэ
  }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſɟɹ ᶅſɹȝ ⟅ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ , ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ
  ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭɹ ſןᴜ , ſɟᴜᴜ̩ ɭʃɹ ʌ ſɭc̗ᴜ ( qox2n2k/b6vakanta.ts ) , }ʃɹƽ ʌ ſɭэ ֭ſɭэ
    @param kaxte ( Knat6keqanuKuba ) - ſɭᴜ ı],ƨɔ
@returns hatafkaq ( { x, z, kfekoc2kaij }[] ) - }ʃɹƽ ʌ }ʃᴜ j͐ʃᴜ , ſɟɹ ᶅſɹȝ */
function hatafkaqDeKaxte( kaxte: Knat6keqanuKuba ): { x: number; z: number; kfekoc2kaij: [ number, number ][] }[] {
  const b6vakanta = kf2KradanPlanon(
    { ptaluPal6: kaxte.ptaluPal6, k6liqPal6: kaxte.k6liqPal6 },
    undefined, kaxte.tlunakHak6liq ?? []);
  const NS = b6vakanta.hak6h6.filter(v => v.orient === "NS");
  const EW = b6vakanta.hak6h6.filter(v => v.orient === "EW");
  const EPS = 0o1/0o100;
  const hatafkaq: { x: number; z: number; kfekoc2kaij: [ number, number ][] }[] = [];
  const hakix2 = new Set<string>();
  for ( const ns of NS ) {
    for ( const ew of EW ) {
      const lx = ns.haxekuxa, lz = ew.haxekuxa;
      if ( lz < ns.de - EPS || lz > ns.al + EPS ) continue;
      if ( lx < ew.de - EPS || lx > ew.al + EPS ) continue;
      const k = lx + "," + lz;
      if ( hakix2.has(k) ) continue;
      hakix2.add(k);
      // ⟨ ſɭэ ֭ſɭэ ʌ ſɟɹ ᶅſɹȝ ⟅ }ʃɹƽ ʌ ſɟɹ ᶅſɹȝ 📃 ⟩
      const kfekoc2kaij: [ number, number ][] = [];
      if ( !NS.some(v => Math.abs(v.haxekuxa - lx) < EPS && v.al > lz + EPS) ) kfekoc2kaij.push([ 0, 1 ]);
      if ( !NS.some(v => Math.abs(v.haxekuxa - lx) < EPS && v.de < lz - EPS) ) kfekoc2kaij.push([ 0, -1 ]);
      if ( !EW.some(v => Math.abs(v.haxekuxa - lz) < EPS && v.al > lx + EPS) ) kfekoc2kaij.push([ 1, 0 ]);
      if ( !EW.some(v => Math.abs(v.haxekuxa - lz) < EPS && v.de < lx - EPS) ) kfekoc2kaij.push([ -1, 0 ]);
      if ( !kfekoc2kaij.length ) continue;
      hatafkaq.push({ x: kaxte.ofsX + lx, z: kaxte.ofsZ + lz, kfekoc2kaij });
    }
  }
  return hatafkaq;
}

/*}ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ ⟅ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſɭᴜ ſɭ,w ʌ j͐ʃᴜ
  ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ ʌ ſɟɹ ᶅſɹȝ ⟅ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ function PICKX() { return "ſɭɜ ʃɔ"; }
  ſɟɹ ᶅſɹȝ ʌ ꞙɭı , ſɭэ ֭ſɭэ ʌ ꞙɭı }ʃɹƽ ʌ ſɭэ ֭ſɭэ ⟅
  ( ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ ʌ ſɭᴜ ı],ƨɔ ) }ʃɹƽ ʌ ſɭɜ ʃɔ ⟅ }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ , ſɭэ ֭ſɭэ
    @param hatafkaq ( { x, z, kfekoc2kaij }[] ) - }ʃɹƽ ʌ ſɭэ ֭ſɭэ
    @param natakatomasai ( { x , z } ) - ſɭᴜ ſɭ,w ʌ j͐ʃᴜ
    @param uzitaj ( Set<string> ) - }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſɭɜ ʃɔ ɽ͑ʃ'w j͑ʃ'ᴜ
@returns tafkaq ( { x , z } | null ) - }ʃɹƽ | null */
function saxeaTafkaq(
  hatafkaq: { x: number; z: number; kfekoc2kaij: [ number, number ][] }[],
  natakatomasai: { x: number; z: number },
  uzitaj: Set<string>,
): { x: number; z: number } | null {
  let kmaXobe: { x: number; z: number } | null = null;
  let kmaXobeKfekoc2kai: { x: number; z: number } | null = null;
  let kmaXobeSef4: { x: number; z: number } | null = null;
  let kmaXobeKfekoc2kaiSef4: { x: number; z: number } | null = null;
  let kmaDist = Infinity, kmaDistKfekoc2kai = Infinity;
  let kmaDistSef4 = Infinity, kmaDistKfekoc2kaiSef4 = Infinity;
  for ( const a of hatafkaq ) {
    const dx = natakatomasai.x - a.x, dz = natakatomasai.z - a.z;
    const dist = Math.hypot(dx, dz);
    if ( dist < 0o1 ) continue;
    const sef4 = !uzitaj.has(a.x + "," + a.z);
    if ( dist < kmaDist ) { kmaDist = dist; kmaXobe = { x: a.x, z: a.z }; }
    if ( sef4 && dist < kmaDistSef4 ) { kmaDistSef4 = dist; kmaXobeSef4 = { x: a.x, z: a.z }; }
    let kfekoc2kai = false;
    for ( const [ lx, lz ] of a.kfekoc2kaij ) {
      if ( ( lx * dx + lz * dz ) / dist > 0o1/0o2 ) { kfekoc2kai = true; break; }
    }
    if ( kfekoc2kai && dist < kmaDistKfekoc2kai ) {
      kmaDistKfekoc2kai = dist; kmaXobeKfekoc2kai = { x: a.x, z: a.z };
    }
    if ( kfekoc2kai && sef4 && dist < kmaDistKfekoc2kaiSef4 ) {
      kmaDistKfekoc2kaiSef4 = dist; kmaXobeKfekoc2kaiSef4 = { x: a.x, z: a.z };
    }
  }
  return kmaXobeKfekoc2kaiSef4 ?? kmaXobeSef4 ?? kmaXobeKfekoc2kai ?? kmaXobe;
}

// ⟨ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , ſɭэ ֭ſɭэ 📃 ⟩

/*}ʃɹƽ ʌ ſᶘᴜ j͑ʃᴜ ʌ ſɭᴜ ı],ƨɔ ⟅ }ʃɹƽ ʌ ſᶘᴜ j͑ʃᴜ ⟅ ſɭɹ ſןᴜ ʌ ſᶘᴜ j͑ʃᴜ
  ſɭɹ ſןᴜ ʌ ſɭɜ ſɭ,w ⟅ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ ʌ ſᶘᴜ j͑ʃᴜ ⟅
    @param t6lima ( GeneritaT6lima ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ
    @param hasukf2qani ( SetlejajHasukf2qani ) - ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
    @param sost2 ( { x , z } ) - }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ
    @param vepat6ni ( number ) - ſןᴜ j͐ʃэ ʌ ſɭɹ ſןᴜ
@returns hasoza ( { x, z, nx, nz }[] ) - }ʃɹƽ ʌ ſᶘᴜ j͑ʃᴜ , ſɟɹ ᶅſɹȝ */
function troviCxefojn(
  t6lima: GeneritaT6lima, hasukf2qani: SetlejajHasukf2qani, sost2: { x: number; z: number }, vepat6ni: number,
): { x: number; z: number; nx: number; nz: number; dist: number }[] {
  const trovajxoj: { x: number; z: number; nx: number; nz: number; dist: number }[] = [];
  const laqazo = ( x: number, z: number ): number => t6lima.l6da(x, z) - hasukf2qani.vem2;
  for ( let z = -EJAMARGXENO; z <= EJAMARGXENO; z += vepat6ni ) {
    for ( let x = -EJAMARGXENO; x <= EJAMARGXENO; x += vepat6ni ) {
      if ( !hasukf2qani.enQoxa(x, z) ) continue;
      if ( laqazo(x, z) >= -0o1/0o10 ) continue;
      const dist = Math.hypot(x - sost2.x, z - sost2.z);
      if ( dist < QAKAJ2DISTANCOMIN || dist > QAKAJ2DISTANCOMAKS ) continue;
      // ⟨ ſɟɹ ᶅſɹȝ ʌ ſᶘᴜ j͑ʃᴜ , ſɭɹ ſןᴜ ʌ ſɭɜ ʃɔ ſᶘᴜ j͑ʃᴜ 📃 ⟩
      let nx = 0, nz = 0, tsasa = 0;
      for ( const [ dx, dz ] of [ [ 1, 0 ], [ -1, 0 ], [ 0, 1 ], [ 0, -1 ] ] ) {
        if ( laqazo(x + dx * vepat6ni, z + dz * vepat6ni) < 0 ) { nx += dx; nz += dz; tsasa++; }
      }
      if ( tsasa === 0 ) continue;
      const sahakani = Math.hypot(nx, nz) || 1;
      trovajxoj.push({ x, z, nx: nx / sahakani, nz: nz / sahakani, dist });
    }
  }
  return trovajxoj;
}

/*ſɭɜ ʃɔ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , }ʃɹƽ ʌ ſɭɜ ſɭ,w
    @param hakandidato ( { x, z, nx, nz, dist }[] ) - }ʃɹƽ ʌ ſᶘᴜ j͑ʃᴜ
    @param t6lima ( GeneritaT6lima ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ
    @param hasukf2qani ( SetlejajHasukf2qani ) - ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
    @param sost2 ( { x , z } ) - }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ
    @param vem2 ( number ) - }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ
@returns hasukf2qita - }ʃɹƽ ʌ ſɭɜ ʃɔ */
function sukf2qiCxefojn(
  hakandidato: { x: number; z: number; nx: number; nz: number; dist: number }[],
  t6lima: GeneritaT6lima, hasukf2qani: SetlejajHasukf2qani, sost2: { x: number; z: number }, vem2: number,
): { x: number; z: number; nx: number; nz: number }[] {
  const haca1ara = hakandidato.map(( k ) => {
    // ⟨ ſɭэ ֭ſɭэ ʌ ſɭɜ ſɭ,w , ſɭᴜ ı],ƨɔ ⟅ 📃 ⟩
    const al = Math.hypot(sost2.x - k.x, sost2.z - k.z);
    const havepat6ni = Math.max(0o2, Math.round(al / QAKAJ2ALTERANDO));
    let hatsasa = 0;
    for ( let s = 1; s <= havepat6ni; s++ ) {
      const t = s / havepat6ni;
      if ( t6lima.l6da(k.x + ( sost2.x - k.x ) * t, k.z + ( sost2.z - k.z ) * t) < hasukf2qani.vem2 ) hatsasa++;
    }
    return { k, n2k: -hatsasa * 0o10 - k.dist };
  });
  haca1ara.sort(( a, b ) => b.n2k - a.n2k);
  const hasukf2qita: { x: number; z: number; nx: number; nz: number }[] = [];
  for ( const o of haca1ara ) {
    if ( hasukf2qita.length >= vem2 ) break;
    const k = o.k;
    let tsiike = false;
    for ( const e of hasukf2qita ) if ( Math.hypot(e.x - k.x, e.z - k.z) < QAKAJ2APARTO ) { tsiike = true; break; }
    if ( tsiike ) continue;
    hasukf2qita.push({ x: k.x, z: k.z, nx: k.nx, nz: k.nz });
  }
  return hasukf2qita;
}

/*ɽ͑ʃ'w j͑ʃ'ᴜ ſɭɜ ſɭ,w ʌ ſɭɜ ſɭ,w , ɽ͑ʃ'w j͑ʃ'ᴜ
    @param tk2ni ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ɭl̀ᴜ
    @param t6lima ( GeneritaT6lima ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ꞙɭı
    @param hasukf2qani ( SetlejajHasukf2qani ) - ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
@returns setlejo ( GeneritaSetlejo ) */
export function generiSetlejon(
  tk2ni: number, t6lima: GeneritaT6lima, hasukf2qani: SetlejajHasukf2qani,
): GeneritaSetlejo {
  const sEjoj = subRuva(tk2ni, KANALOEJOJ);
  const sHakaxte = subRuva(tk2ni, KANALOHAKAXTE);
  const sKrompoj = subRuva(tk2ni, KANALOKROMPOJ);
  const sOrnamoj = subRuva(tk2ni, KANALOORNAMOJ);

  const hakaxte: Knat6keqanuKuba[] = [];
  const hak6h6: Knat6keqanuK6h6N2k[] = [];
  const haqakaj2: Knat6keqanuTap2Qoxa[] = [];
  const hazace: Neq2qObjekto[] = [];

  // ⟪ ſɭᴜ ı],ƨɔ ʌ ꞙɭı 📃 ⟫
  const cefa = trovuEjon(sEjoj, t6lima, hasukf2qani, []);
  if ( !cefa ) return { hakaxte, hak6h6, haqakaj2, hazace };

  const cefaGpukaz = 0o2 + sHakaxte % 0o2;
  const cefaTona = URBATONAUNU;
  hakaxte.push({
    ksaka: "Geles",
    ptaluPal6: cefaGpukaz,
    k6liqPal6: "vakox2qita",
    ofsX: cefa.x,
    ofsZ: cefa.z,
    kekufxeso: sHakaxte % 0o3 !== 0,
    hahufwuk2: true,
    // ⟨ ſןᴜȝ ʌ ſɟɹ ᶅſɹȝ ʌ j͐ʃᴜȝ 📃 ⟩
    // ⟨ }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ ( ſɟᴜᴜ̩ ɭʃɹ ʌ ſɭc̗ᴜ ) , }ʃɹƽ ʌ }ʃᴜ j͐ʃᴜ
    // ſɭɹ ſןᴜ ʌ ſɭᴜ ı],ƨɔ 📃 ⟩
    tlunakHak6liq: [
      {
        x: 0, z: ( cefaGpukaz + 0o1 ) * cefaTona,
        hunaq: "qaman2", rot: Math.PI, veq6k2: "sost2", stacia: true, konektita: true,
      },
    ],
  });
  hazace.push({ x: cefa.x, z: cefa.z + ( cefaGpukaz + 0o1 ) * cefaTona, pudal: "spacosxipo" });

  // ⟨ ſɭᴜ ı],ƨɔ ʌ ſᶘɔ 📃 ⟫
  if ( sHakaxte % 0o4 === 0o1 ) {
    const p2sadi = trovuEjon(subRuva(tk2ni, KANALOEJOJ + 0o20), t6lima, hasukf2qani,
      [ [ cefa.x, cefa.z, 0o400 ] ]);
    if ( p2sadi ) {
      hakaxte.push({
        ksaka: "Dua",
        ptaluPal6: 0o2 + ( sHakaxte >>> 0o4 ) % 0o2,
        k6liqPal6: "kvar",
        ofsX: p2sadi.x,
        ofsZ: p2sadi.z,
        kekufxeso: false,
        hahufwuk2: true,
        tlunakHak6liq: [],
      });
    }
  }

  // ⟪ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ 📃 ⟫
  const sost2 = hakaxte[0];
  const hatafkaq = hatafkaqDeKaxte(sost2);
  // ⟨ }ʃɹƽ ʌ ſɭэ ֭ſɭэ , ſɭэ ֭ſɭэ ʌ }ʃɹƽ , ſɭɜ ʃɔ }ʃɹƽ 📃 ⟩
  const uzitajHatafkaq = new Set<string>();
  const registri = ( a: { x: number; z: number } ): void => {
    uzitajHatafkaq.add(a.x + "," + a.z);
  };
  const hasoza = troviCxefojn(t6lima, hasukf2qani, { x: sost2.ofsX, z: sost2.ofsZ }, 0o4);
  const cxefoj = sukf2qiCxefojn(hasoza, t6lima, hasukf2qani, { x: sost2.ofsX, z: sost2.ofsZ },
    QAKAJ2KVANTO);
  for ( let i = 0; i < cxefoj.length; i++ ) {
    const k = cxefoj[i];
    // ⟨ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ ʌ ſɭɜ ſɭ,w , ſᶘᴜ j͑ʃᴜ 📃 ⟩
    const s2sabo = Math.atan2(-k.nx, -k.nz);
    haqakaj2.push({ x: k.x, z: k.z, jufu: QAKAJ2PROFUNDO, s2sabo });
    const landaX = k.x + Math.sin(s2sabo) * ( QAKAJ2PROFUNDO / 0o2 );
    const landaZ = k.z + Math.cos(s2sabo) * ( QAKAJ2PROFUNDO / 0o2 );
    const tsasaX = k.x - Math.sin(s2sabo) * KANUOTADISTANCO;
    const tsasaZ = k.z - Math.cos(s2sabo) * KANUOTADISTANCO;
    // ⟨ ſɭэ ֭ſɭэ ʌ }ʃɹƽ ʌ ſɭэ ֭ſɭэ , ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ ⟅ }ʃɹƽ ʌ ſɭэ ֭ſɭэ
    // ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ ⟅ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ꞙɭɔ , }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ 📃 ⟩
    const saxeni = saxeaTafkaq(hatafkaq, { x: landaX, z: landaZ }, uzitajHatafkaq)
      ?? { x: sost2.ofsX, z: sost2.ofsZ };
    registri(saxeni);
    hak6h6.push({
      ksaka: "Cutfa " + ( i + 0o1 ).toString(8),
      sefini: 0o340/0o100,
      n2k: [
        [ saxeni.x, saxeni.z ],
        [ saxeni.x + ( landaX - saxeni.x ) * 0o1/0o4, saxeni.z + ( landaZ - saxeni.z ) * 0o1/0o4 ],
        [ saxeni.x + ( landaX - saxeni.x ) * 0o3/0o4, saxeni.z + ( landaZ - saxeni.z ) * 0o3/0o4 ],
        [ landaX, landaZ ],
      ],
    });
    // ⟨ ſᶘᴜ j͑ʃᴜ ʌ ſןᴜȝ ʌ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ 📃 ⟩
    if ( t6lima.l6da(tsasaX, tsasaZ) < hasukf2qani.vem2 ) {
      hazace.push({ x: tsasaX, z: tsasaZ, pudal: "s2kaj2", s2sabo: s2sabo + Math.PI });
    }
  }

  // ⟪ ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ 📃 ⟫
  // ſɭᴜ ı],ƨɔ ʌ ſᶘɔ , ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ ꞙɭɿ ⟅ ꞙɭɔ , ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ ⟅ }ʃɹƽ
  // ſɭɜ ſɭ,w , ɽ͑ʃ'w j͑ʃ'ᴜ ʌ }ʃɹƽ ʌ ſɭɜ ſɭ,w ⟅
  const ejoDeAvenuo = (): { x: number; z: number } | null => {
    let kmaXobe: { x: number; z: number } | null = null;
    let kmaN2k = -Infinity;
    for ( let a = 0; a < 0o20; a++ ) {
      const h = subRuva(sKrompoj, a);
      const tafkaq = ( h % 0o1000 ) / 0o1000 * Math.PI * 0o2;
      const h6kuni = 0o300 + ( h >>> 0o10 ) % 0o300;
      const x = sost2.ofsX + Math.cos(tafkaq) * h6kuni;
      const z = sost2.ofsZ + Math.sin(tafkaq) * h6kuni;
      if ( !hasukf2qani.enQoxa(x, z) ) continue;
      if ( hasukf2qani.pukazDeQoxa(x, z) > -0o100 ) continue;
      const l6da = t6lima.l6da(x, z);
      if ( l6da < hasukf2qani.vem2 + EJASEKURAPROFUNDO ) continue;
      if ( l6da > EJAMONTALIMO ) continue;
      // ⟨ ſןᴜ j͐ʃэ ʌ j͑ʃ'ɔ ŋᷠɹ , ſɭɜ ſɭ,w ⟅ 📃 ⟩
      const n2k = h6kuni - l6da * 0o10;
      if ( n2k > kmaN2k ) { kmaN2k = n2k; kmaXobe = { x, z }; }
    }
    return kmaXobe;
  };

  const natakatomasai = hakaxte.length >= 0o2
    ? { x: hakaxte[1].ofsX, z: hakaxte[1].ofsZ }
    : ejoDeAvenuo();
  if ( natakatomasai ) {
    // ⟨ ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ ʌ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ⟅ }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ 📃 ⟩
    const ekiro = saxeaTafkaq(hatafkaq, natakatomasai, uzitajHatafkaq)
      ?? { x: sost2.ofsX, z: sost2.ofsZ };
    registri(ekiro);
    const mezX = ( ekiro.x + natakatomasai.x ) / 0o2;
    const mezZ = ( ekiro.z + natakatomasai.z ) / 0o2;
    // ⟨ ſɭэ ֭ſɭэ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ 📃 ⟩
    const vek2fe = ( sKrompoj % 0o2 ) === 0 ? 0o1 : -0o1;
    const bendX = mezX - ( natakatomasai.z - ekiro.z ) * 0o3/0o100 * vek2fe;
    const bendZ = mezZ + ( natakatomasai.x - ekiro.x ) * 0o3/0o100 * vek2fe;
    const n2k: [ number, number ][] = [ [ ekiro.x, ekiro.z ] ];
    for ( const [ bx, bz ] of [ [ mezX, mezZ ], [ bendX, bendZ ] ] ) {
      if ( hasukf2qani.enQoxa(bx, bz) && t6lima.l6da(bx, bz) >= hasukf2qani.vem2 ) n2k.push([ bx, bz ]);
    }
    n2k.push([ natakatomasai.x, natakatomasai.z ]);
    hak6h6.push({ ksaka: hakaxte.length >= 0o2 ? "K6h6 inter hakaxte" : "Avenuo", sefini: 0o340/0o100, n2k });
  }

  // ⟪ ſɟɔ j͐ʃɹ }ʃw ſᶘɔ ɭl̀ɹȝ ꞁȷ̀ᴜꞇ ʌ ſɭэ ֭ſɭэ 📃 ⟫
  for ( const k6h6 of hak6h6 ) {
    for ( let i = 0; i + 1 < k6h6.n2k.length; i++ ) {
      const [ ax, az ] = k6h6.n2k[i];
      const [ bx, bz ] = k6h6.n2k[i + 1];
      const sahakani = Math.hypot(bx - ax, bz - az);
      const havepat6ni = Math.max(0o1, Math.round(sahakani / LAMPATONA));
      const nx = -( bz - az ) / ( sahakani || 1 ), nz = ( bx - ax ) / ( sahakani || 1 );
      for ( let s = 0; s <= havepat6ni; s++ ) {
        const t = s / havepat6ni;
        if ( i === 0 && s === 0 ) continue;
        const vek2fe = ( ( ( s + i ) & 1 ) === 0 ) ? 1 : -1;
        const x = ax + ( bx - ax ) * t + nx * LAMPAALTERANDO * vek2fe;
        const z = az + ( bz - az ) * t + nz * LAMPAALTERANDO * vek2fe;
        if ( !hasukf2qani.enQoxa(x, z) ) continue;
        if ( t6lima.l6da(x, z) < hasukf2qani.vem2 + 0o1/0o2 ) continue;
        // ⟨ ſɟɔ j͐ʃɹ }ʃw ſᶘɔ ɭl̀ɹȝ ꞁȷ̀ᴜꞇ ʌ ſɭɜ ʃɔ }ʃᴜ j͐ʃᴜ 📃 ⟩
        if ( ( sOrnamoj >>> ( ( s + i * 0o7 ) % 0o10 ) ) % 0o5 === 0 ) continue;
        hazace.push({ x, z, pudal: "hxeuxfoPa12", s2sabo: Math.PI / 0o4 });
      }
    }
  }

  return { hakaxte, hak6h6, haqakaj2, hazace };
}
