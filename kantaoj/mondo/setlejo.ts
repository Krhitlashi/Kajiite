// ≺⧼ ſɭᴜ ı],ƨɔ ʌ ſɭэ ֭ſɭэ 🏙️ ⧽≻
// ɽ͑ʃ'w j͑ʃ'ᴜ ſɭɜ ſɭ,w ʌ ſɭɜ ſɭ,w , ſɭɜ ſɭ,w ⟅
// ſɭᴜ ı],ƨɔ ʌ ꞙɭı , ſɭᴜ ı],ƨɔ ʌ ſᶘɔ , ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , ſɭэ ֭ſɭэ
// , ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſɭɜ ſɭ,w ( ſןᴜȝ , ſᶘᴜ j͑ʃᴜ ʌ ſןᴜȝ , ſɟɔ j͐ʃɹ }ʃw ſᶘɔ ɭl̀ɹȝ ꞁȷ̀ᴜꞇ ) ⟅
// ( ꞙɭɔ ʌ DOM , ꞙɭɔ ʌ j͑ʃᴜ ſɭᴜ ) , }ʃᴜ j͐ʃᴜ ⟅
// j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w ʌ ſɭᴜ ı],ƨɔ ⟅
// ( kantaoj/mondo/krado ) , ſɟᴜᴜ̩ ɭʃɹ ʌ ſɭc̗ᴜ ⟅
import type { SkulptaKaxte, SkulptaK6h6, SkulptaPlatqoxa,
  MetitaObjekto } from "./kaxte/hahunaq.js";
import type { GeneritaTero } from "./generilo.js";
import { kf2KradanPlanon } from "./krado/plano.js";
import { subSemo } from "./semo.js";

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ ʌ }ʃɹƽ 📃 ⟩
const KANALO_EJOJ = 0o1;
const KANALO_URBOJ = 0o2;
const KANALO_KROMPOJ = 0o3;
const KANALO_ORNAMOJ = 0o4;

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ 📃 ⟩
const EJA_PASXO = 0o40;
const EJA_MARGXENO = 0o400;
const EJA_KRUDEJO = 0o100;
const EJA_DISTANCO_DE_RANDO = 0o240;
const EJA_KRUDA_ALTO = 0o12;
const EJA_SEKURA_PROFUNDO = 0o6;
const EJA_MONTA_LIMO = 0o21;

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ 📃 ⟩
const URBA_PASXO_UNU = 0o30;
const URBA_PASXO_KVAR = 0o40;

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , ſɭэ ֭ſɭэ 📃 ⟩
const DOKA_DISTANCO_MIN = 0o100;
const DOKA_DISTANCO_MAKS = 0o700;
const DOKA_APARTO = 0o200;
const DOKA_KVANTO = 0o3;
const DOKA_PROFUNDO = 0o20;
const DOKA_ALTERANDO = 0o12;

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɟɔ j͐ʃɹ }ʃw ſᶘɔ ɭl̀ɹȝ ꞁȷ̀ᴜꞇ , ſᶘᴜ j͑ʃᴜ ʌ ſןᴜȝ 📃 ⟩
const LAMPA_PASXO = 0o60;
const LAMPA_ALTERANDO = 0o6;
const KANUOTA_DISTANCO = 0o10;

/*ɽ͑ʃ'w j͑ʃ'ᴜ ſɭɜ ſɭ,w ʌ }ʃᴜ j͐ʃᴜ ʌ ꞙɭı
    @param hakaxte ( SkulptaKaxte[] ) - ſɭᴜ ı],ƨɔ , ſɭᴜ ı],ƨɔ ʌ ſᶘɔ
    @param hak6h6 ( SkulptaK6h6[] ) - ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ
    @param haqakaj2 ( SkulptaPlatqoxa[] ) - ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ
    @param objektoj ( MetitaObjekto[] ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſɭɜ ſɭ,w */
export interface GeneritaSetlejo {
  hakaxte: SkulptaKaxte[];
  hak6h6: SkulptaK6h6[];
  haqakaj2: SkulptaPlatqoxa[];
  objektoj: MetitaObjekto[];
}

/*ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ , ɽ͑ʃ'w j͑ʃ'ᴜ ʌ }ʃɹƽ
    @param vem2 ( number ) - j͑ʃ'ɔ ŋᷠɹ ʌ ſᶘᴜ j͑ʃᴜ
    @param enQoxa ( ( x , z ) => boolean ) - }ʃɹƽ ʌ }ʃᴜ j͐ʃᴜ
    @param randoDeQoxa ( ( x , z ) => number ) - j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w */
export interface SetlejajHasukf2qani {
  vem2: number;
  enQoxa: ( x: number, z: number ) => boolean;
  randoDeQoxa: ( x: number, z: number ) => number;
}

// ⟨ ſɭɜ ſɭ,w ʌ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ 📃 ⟩

/*ſɭɜ ſɭ,w ʌ ſɭɜ ſɭ,w ʌ ꞙɭı }ʃɹƽ
    @param tero ( GeneritaTero ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ
    @param x,z ( number ) - }ʃɹƽ ʌ ſɭɜ ſɭ,w
    @param p2somani ( number ) - j͐ʃэ ɭ(ᴜ ʌ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ
@returns krudo ( number ) - ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ j͐ʃэ ɭ(ᴜ */
function krudecoDe(
  tero: GeneritaTero, x: number, z: number, p2somani: number,
): number {
  let plejMalalta = Infinity, plejAlta = -Infinity;
  for ( const [ dx, dz ] of [ [ 0, 0 ], [ p2somani, 0 ], [ -p2somani, 0 ], [ 0, p2somani ], [ 0, -p2somani ],
    [ p2somani, p2somani ], [ -p2somani, p2somani ], [ p2somani, -p2somani ], [ -p2somani, -p2somani ] ] ) {
    const h = tero.alteco(x + dx, z + dz);
    if ( h < plejMalalta ) plejMalalta = h;
    if ( h > plejAlta ) plejAlta = h;
  }
  return plejAlta - plejMalalta;
}

/*}ʃɹƽ ʌ ſɭɜ ſɭ,w , ſᶘᴜ j͑ʃᴜ , ſɭɜ ſɭ,w
    @param tero ( GeneritaTero ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ
    @param vem2 ( number ) - j͑ʃ'ɔ ŋᷠɹ ʌ ſᶘᴜ j͑ʃᴜ
    @param x,z ( number ) - }ʃɹƽ
@returns tsel2sai ( boolean ) */
function surSekuraTero(
  tero: GeneritaTero, vem2: number, x: number, z: number,
): boolean {
  return tero.alteco(x, z) > vem2 + EJA_SEKURA_PROFUNDO
    && Math.max(krudecoDe(tero, x, z, EJA_KRUDEJO), 0) < EJA_KRUDA_ALTO;
}

/*ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃɹƽ ⟅ j͑ʃ'ɔ ŋᷠɹ = }ʃɹƽ , ſɭɜ ſɭ,w , ɭl̀ᴜ ſ͕ɭɜ
    @param tero ( GeneritaTero ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ
    @param hasukf2qani ( SetlejajHasukf2qani ) - ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
    @param x,z ( number ) - }ʃɹƽ
    @param hazardo ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ }ʃɹƽ
@returns n2k ( number ) */
function punktoDeEjo(
  tero: GeneritaTero, hasukf2qani: SetlejajHasukf2qani, x: number, z: number, hazardo: number,
): number {
  const h = tero.alteco(x, z);
  const sup = h - hasukf2qani.vem2;
  const krudo = krudecoDe(tero, x, z, EJA_KRUDEJO);
  let n2k = -krudo * 0o4;
  if ( sup < EJA_SEKURA_PROFUNDO ) n2k -= ( EJA_SEKURA_PROFUNDO - sup ) * 0o12;
  if ( h > EJA_MONTA_LIMO ) n2k -= ( h - EJA_MONTA_LIMO ) * 0o4;
  n2k += hazardo;
  return n2k;
}

/*}ʃɹƽ ʌ ſɭᴜ ı],ƨɔ , ſɭɜ ʃɔ ſɭᴜ ı],ƨɔ
    @param tk2ni ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ }ʃɹƽ
    @param tero ( GeneritaTero ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ
    @param hasukf2qani ( SetlejajHasukf2qani ) - ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
    @param malpermesoj ( [ number , number , number ][] ) - }ʃɹƽ ( x , z , r )
@returns ejo ( { x, z } | null ) */
function trovuEjon(
  tk2ni: number, tero: GeneritaTero, hasukf2qani: SetlejajHasukf2qani,
  malpermesoj: [ number, number, number ][],
): { x: number; z: number } | null {
  const famaf = ( i: number ): number =>
    ( ( subSemo(tk2ni, i) % 0o1000 ) / 0o1000 - 0o1/0o2 ) * 0o4;
  let plejBona: { x: number; z: number } | null = null;
  let plejPunkto = -Infinity;
  let rezervo: { x: number; z: number } | null = null;
  let rezervaPunkto = -Infinity;
  let i = 0;
  for ( let z = -EJA_MARGXENO; z <= EJA_MARGXENO; z += EJA_PASXO ) {
    for ( let x = -EJA_MARGXENO; x <= EJA_MARGXENO; x += EJA_PASXO ) {
      i++;
      if ( !hasukf2qani.enQoxa(x, z) ) continue;
      if ( hasukf2qani.randoDeQoxa(x, z) > -EJA_DISTANCO_DE_RANDO ) continue;
      let proksima = false;
      for ( const [ mx, mz, mr ] of malpermesoj ) {
        if ( Math.hypot(x - mx, z - mz) < mr ) { proksima = true; break; }
      }
      if ( proksima ) continue;
      const tsel2sai = surSekuraTero(tero, hasukf2qani.vem2, x, z);
      const n2k = punktoDeEjo(tero, hasukf2qani, x, z, famaf(i));
      if ( tsel2sai && n2k > plejPunkto ) { plejPunkto = n2k; plejBona = { x, z }; }
      if ( n2k > rezervaPunkto ) { rezervaPunkto = n2k; rezervo = { x, z }; }
    }
  }
  return plejBona ?? rezervo;
}

// ⟨ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ 📃 ⟩
// ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ , ſɭɹ ſןᴜ ⟅
// ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ ( ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , ſɭᴜ ı],ƨɔ ʌ ſᶘɔ ) , }ʃɹƽ ʌ ꞙɭı
// ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ ⟅

/*}ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ , ſɟɹ ᶅſɹȝ ʌ ſɭэ ֭ſɭэ
  }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſɟɹ ᶅſɹȝ ⟅ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ , ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ
  ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭɹ ſןᴜ , ſɟᴜᴜ̩ ɭʃɹ ʌ ſɭc̗ᴜ ( krado/plano.ts ) , }ʃɹƽ ʌ ſɭэ ֭ſɭэ
    @param kaxte ( SkulptaKaxte ) - ſɭᴜ ı],ƨɔ
@returns hatafkaq ( { x, z, liberaj }[] ) - }ʃɹƽ ʌ }ʃᴜ j͐ʃᴜ , ſɟɹ ᶅſɹȝ */
function angulojDeKaxte( kaxte: SkulptaKaxte ): { x: number; z: number; liberaj: [ number, number ][] }[] {
  const plano = kf2KradanPlanon(
    { arangxaGrando: kaxte.arangxaGrando, blokaGrando: kaxte.blokaGrando },
    undefined, kaxte.aldonajBlokoj ?? []);
  const NS = plano.hak6h6.filter(v => v.orient === "NS");
  const EW = plano.hak6h6.filter(v => v.orient === "EW");
  const EPS = 0o1/0o100;
  const hatafkaq: { x: number; z: number; liberaj: [ number, number ][] }[] = [];
  const viditaj = new Set<string>();
  for ( const ns of NS ) {
    for ( const ew of EW ) {
      const lx = ns.haxekuxa, lz = ew.haxekuxa;
      if ( lz < ns.de - EPS || lz > ns.al + EPS ) continue;
      if ( lx < ew.de - EPS || lx > ew.al + EPS ) continue;
      const k = lx + "," + lz;
      if ( viditaj.has(k) ) continue;
      viditaj.add(k);
      // ⟨ ſɭэ ֭ſɭэ ʌ ſɟɹ ᶅſɹȝ ⟅ }ʃɹƽ ʌ ſɟɹ ᶅſɹȝ 📃 ⟩
      const liberaj: [ number, number ][] = [];
      if ( !NS.some(v => Math.abs(v.haxekuxa - lx) < EPS && v.al > lz + EPS) ) liberaj.push([ 0, 1 ]);
      if ( !NS.some(v => Math.abs(v.haxekuxa - lx) < EPS && v.de < lz - EPS) ) liberaj.push([ 0, -1 ]);
      if ( !EW.some(v => Math.abs(v.haxekuxa - lz) < EPS && v.al > lx + EPS) ) liberaj.push([ 1, 0 ]);
      if ( !EW.some(v => Math.abs(v.haxekuxa - lz) < EPS && v.de < lx - EPS) ) liberaj.push([ -1, 0 ]);
      if ( !liberaj.length ) continue;
      hatafkaq.push({ x: kaxte.ofsX + lx, z: kaxte.ofsZ + lz, liberaj });
    }
  }
  return hatafkaq;
}

/*}ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ ⟅ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſɭᴜ ſɭ,w ʌ j͐ʃᴜ
  ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ ʌ ſɟɹ ᶅſɹȝ ⟅ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ function PICKX() { return "ſɭɜ ʃɔ"; }
  ſɟɹ ᶅſɹȝ ʌ ꞙɭı , ſɭэ ֭ſɭэ ʌ ꞙɭı }ʃɹƽ ʌ ſɭэ ֭ſɭэ ⟅
  ( ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ ʌ ſɭᴜ ı],ƨɔ ) }ʃɹƽ ʌ ſɭɜ ʃɔ ⟅ }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ , ſɭэ ֭ſɭэ
    @param hatafkaq ( { x, z, liberaj }[] ) - }ʃɹƽ ʌ ſɭэ ֭ſɭэ
    @param celo ( { x , z } ) - ſɭᴜ ſɭ,w ʌ j͐ʃᴜ
    @param uzitaj ( Set<string> ) - }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſɭɜ ʃɔ ɽ͑ʃ'w j͑ʃ'ᴜ
@returns tafkaq ( { x , z } | null ) - }ʃɹƽ | null */
function komencaAngulo(
  hatafkaq: { x: number; z: number; liberaj: [ number, number ][] }[],
  celo: { x: number; z: number },
  uzitaj: Set<string>,
): { x: number; z: number } | null {
  let plejBona: { x: number; z: number } | null = null;
  let plejBonaLibera: { x: number; z: number } | null = null;
  let plejBonaSef4: { x: number; z: number } | null = null;
  let plejBonaLiberaSef4: { x: number; z: number } | null = null;
  let plejDist = Infinity, plejDistLibera = Infinity;
  let plejDistSef4 = Infinity, plejDistLiberaSef4 = Infinity;
  for ( const a of hatafkaq ) {
    const dx = celo.x - a.x, dz = celo.z - a.z;
    const dist = Math.hypot(dx, dz);
    if ( dist < 0o1 ) continue;
    const sef4 = !uzitaj.has(a.x + "," + a.z);
    if ( dist < plejDist ) { plejDist = dist; plejBona = { x: a.x, z: a.z }; }
    if ( sef4 && dist < plejDistSef4 ) { plejDistSef4 = dist; plejBonaSef4 = { x: a.x, z: a.z }; }
    let libera = false;
    for ( const [ lx, lz ] of a.liberaj ) {
      if ( ( lx * dx + lz * dz ) / dist > 0o1/0o2 ) { libera = true; break; }
    }
    if ( libera && dist < plejDistLibera ) {
      plejDistLibera = dist; plejBonaLibera = { x: a.x, z: a.z };
    }
    if ( libera && sef4 && dist < plejDistLiberaSef4 ) {
      plejDistLiberaSef4 = dist; plejBonaLiberaSef4 = { x: a.x, z: a.z };
    }
  }
  return plejBonaLiberaSef4 ?? plejBonaSef4 ?? plejBonaLibera ?? plejBona;
}

// ⟨ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , ſɭэ ֭ſɭэ 📃 ⟩

/*}ʃɹƽ ʌ ſᶘᴜ j͑ʃᴜ ʌ ſɭᴜ ı],ƨɔ ⟅ }ʃɹƽ ʌ ſᶘᴜ j͑ʃᴜ ⟅ ſɭɹ ſןᴜ ʌ ſᶘᴜ j͑ʃᴜ
  ſɭɹ ſןᴜ ʌ ſɭɜ ſɭ,w ⟅ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ ʌ ſᶘᴜ j͑ʃᴜ ⟅
    @param tero ( GeneritaTero ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ
    @param hasukf2qani ( SetlejajHasukf2qani ) - ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
    @param sost2 ( { x , z } ) - }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ
    @param vepat6ni ( number ) - ſןᴜ j͐ʃэ ʌ ſɭɹ ſןᴜ
@returns hasoza ( { x, z, nx, nz }[] ) - }ʃɹƽ ʌ ſᶘᴜ j͑ʃᴜ , ſɟɹ ᶅſɹȝ */
function troviCxefojn(
  tero: GeneritaTero, hasukf2qani: SetlejajHasukf2qani, sost2: { x: number; z: number }, vepat6ni: number,
): { x: number; z: number; nx: number; nz: number; dist: number }[] {
  const trovajxoj: { x: number; z: number; nx: number; nz: number; dist: number }[] = [];
  const montro = ( x: number, z: number ): number => tero.alteco(x, z) - hasukf2qani.vem2;
  for ( let z = -EJA_MARGXENO; z <= EJA_MARGXENO; z += vepat6ni ) {
    for ( let x = -EJA_MARGXENO; x <= EJA_MARGXENO; x += vepat6ni ) {
      if ( !hasukf2qani.enQoxa(x, z) ) continue;
      if ( montro(x, z) >= -0o1/0o10 ) continue;
      const dist = Math.hypot(x - sost2.x, z - sost2.z);
      if ( dist < DOKA_DISTANCO_MIN || dist > DOKA_DISTANCO_MAKS ) continue;
      // ⟨ ſɟɹ ᶅſɹȝ ʌ ſᶘᴜ j͑ʃᴜ , ſɭɹ ſןᴜ ʌ ſɭɜ ʃɔ ſᶘᴜ j͑ʃᴜ 📃 ⟩
      let nx = 0, nz = 0, akvaj = 0;
      for ( const [ dx, dz ] of [ [ 1, 0 ], [ -1, 0 ], [ 0, 1 ], [ 0, -1 ] ] ) {
        if ( montro(x + dx * vepat6ni, z + dz * vepat6ni) < 0 ) { nx += dx; nz += dz; akvaj++; }
      }
      if ( akvaj === 0 ) continue;
      const sahakani = Math.hypot(nx, nz) || 1;
      trovajxoj.push({ x, z, nx: nx / sahakani, nz: nz / sahakani, dist });
    }
  }
  return trovajxoj;
}

/*ſɭɜ ʃɔ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , }ʃɹƽ ʌ ſɭɜ ſɭ,w
    @param kandidatoj ( { x, z, nx, nz, dist }[] ) - }ʃɹƽ ʌ ſᶘᴜ j͑ʃᴜ
    @param tero ( GeneritaTero ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ
    @param hasukf2qani ( SetlejajHasukf2qani ) - ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
    @param sost2 ( { x , z } ) - }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ
    @param vem2 ( number ) - }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ
@returns elektitaj - }ʃɹƽ ʌ ſɭɜ ʃɔ */
function elektiCxefojn(
  kandidatoj: { x: number; z: number; nx: number; nz: number; dist: number }[],
  tero: GeneritaTero, hasukf2qani: SetlejajHasukf2qani, sost2: { x: number; z: number }, vem2: number,
): { x: number; z: number; nx: number; nz: number }[] {
  const haca1ara = kandidatoj.map(( k ) => {
    // ⟨ ſɭэ ֭ſɭэ ʌ ſɭɜ ſɭ,w , ſɭᴜ ı],ƨɔ ⟅ 📃 ⟩
    const al = Math.hypot(sost2.x - k.x, sost2.z - k.z);
    const havepat6ni = Math.max(0o2, Math.round(al / DOKA_ALTERANDO));
    let akvaj = 0;
    for ( let s = 1; s <= havepat6ni; s++ ) {
      const t = s / havepat6ni;
      if ( tero.alteco(k.x + ( sost2.x - k.x ) * t, k.z + ( sost2.z - k.z ) * t) < hasukf2qani.vem2 ) akvaj++;
    }
    return { k, n2k: -akvaj * 0o10 - k.dist };
  });
  haca1ara.sort(( a, b ) => b.n2k - a.n2k);
  const elektitaj: { x: number; z: number; nx: number; nz: number }[] = [];
  for ( const o of haca1ara ) {
    if ( elektitaj.length >= vem2 ) break;
    const k = o.k;
    let proksima = false;
    for ( const e of elektitaj ) if ( Math.hypot(e.x - k.x, e.z - k.z) < DOKA_APARTO ) { proksima = true; break; }
    if ( proksima ) continue;
    elektitaj.push({ x: k.x, z: k.z, nx: k.nx, nz: k.nz });
  }
  return elektitaj;
}

/*ɽ͑ʃ'w j͑ʃ'ᴜ ſɭɜ ſɭ,w ʌ ſɭɜ ſɭ,w , ɽ͑ʃ'w j͑ʃ'ᴜ
    @param tk2ni ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ɭl̀ᴜ
    @param tero ( GeneritaTero ) - ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ꞙɭı
    @param hasukf2qani ( SetlejajHasukf2qani ) - ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
@returns setlejo ( GeneritaSetlejo ) */
export function generiSetlejon(
  tk2ni: number, tero: GeneritaTero, hasukf2qani: SetlejajHasukf2qani,
): GeneritaSetlejo {
  const sEjoj = subSemo(tk2ni, KANALO_EJOJ);
  const sHakaxte = subSemo(tk2ni, KANALO_URBOJ);
  const sKrompoj = subSemo(tk2ni, KANALO_KROMPOJ);
  const sOrnamoj = subSemo(tk2ni, KANALO_ORNAMOJ);

  const hakaxte: SkulptaKaxte[] = [];
  const hak6h6: SkulptaK6h6[] = [];
  const haqakaj2: SkulptaPlatqoxa[] = [];
  const objektoj: MetitaObjekto[] = [];

  // ⟪ ſɭᴜ ı],ƨɔ ʌ ꞙɭı 📃 ⟫
  const cefa = trovuEjon(sEjoj, tero, hasukf2qani, []);
  if ( !cefa ) return { hakaxte, hak6h6, haqakaj2, objektoj };

  const cefaGrando = 0o2 + sHakaxte % 0o2;
  const cefaPaso = URBA_PASXO_UNU;
  hakaxte.push({
    ksaka: "Geles",
    arangxaGrando: cefaGrando,
    blokaGrando: "unu",
    ofsX: cefa.x,
    ofsZ: cefa.z,
    keuxfhxeso: sHakaxte % 0o3 !== 0,
    lampoj: true,
    // ⟨ ſןᴜȝ ʌ ſɟɹ ᶅſɹȝ ʌ j͐ʃᴜȝ 📃 ⟩
    // ⟨ }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ ( ſɟᴜᴜ̩ ɭʃɹ ʌ ſɭc̗ᴜ ) , }ʃɹƽ ʌ }ʃᴜ j͐ʃᴜ
    // ſɭɹ ſןᴜ ʌ ſɭᴜ ı],ƨɔ 📃 ⟩
    aldonajBlokoj: [
      {
        x: 0, z: ( cefaGrando + 0o1 ) * cefaPaso,
        hunaq: "sanktejo", rot: Math.PI, sub: "centro", stacia: true, konektita: true,
      },
    ],
  });
  objektoj.push({ x: cefa.x, z: cefa.z + ( cefaGrando + 0o1 ) * cefaPaso, pudal: "spacosxipo" });

  // ⟨ ſɭᴜ ı],ƨɔ ʌ ſᶘɔ 📃 ⟫
  if ( sHakaxte % 0o4 === 0o1 ) {
    const dua = trovuEjon(subSemo(tk2ni, KANALO_EJOJ + 0o20), tero, hasukf2qani,
      [ [ cefa.x, cefa.z, 0o400 ] ]);
    if ( dua ) {
      hakaxte.push({
        ksaka: "Dua",
        arangxaGrando: 0o2 + ( sHakaxte >>> 0o4 ) % 0o2,
        blokaGrando: "kvar",
        ofsX: dua.x,
        ofsZ: dua.z,
        keuxfhxeso: false,
        lampoj: true,
        aldonajBlokoj: [],
      });
    }
  }

  // ⟪ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ , ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ 📃 ⟫
  const sost2 = hakaxte[0];
  const hatafkaq = angulojDeKaxte(sost2);
  // ⟨ }ʃɹƽ ʌ ſɭэ ֭ſɭэ , ſɭэ ֭ſɭэ ʌ }ʃɹƽ , ſɭɜ ʃɔ }ʃɹƽ 📃 ⟩
  const uzitajAnguloj = new Set<string>();
  const registri = ( a: { x: number; z: number } ): void => {
    uzitajAnguloj.add(a.x + "," + a.z);
  };
  const hasoza = troviCxefojn(tero, hasukf2qani, { x: sost2.ofsX, z: sost2.ofsZ }, 0o4);
  const cxefoj = elektiCxefojn(hasoza, tero, hasukf2qani, { x: sost2.ofsX, z: sost2.ofsZ },
    DOKA_KVANTO);
  for ( let i = 0; i < cxefoj.length; i++ ) {
    const k = cxefoj[i];
    // ⟨ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ ʌ ſɭɜ ſɭ,w , ſᶘᴜ j͑ʃᴜ 📃 ⟩
    const rotacio = Math.atan2(-k.nx, -k.nz);
    haqakaj2.push({ x: k.x, z: k.z, profundo: DOKA_PROFUNDO, rotacio });
    const landaX = k.x + Math.sin(rotacio) * ( DOKA_PROFUNDO / 0o2 );
    const landaZ = k.z + Math.cos(rotacio) * ( DOKA_PROFUNDO / 0o2 );
    const akvaX = k.x - Math.sin(rotacio) * KANUOTA_DISTANCO;
    const akvaZ = k.z - Math.cos(rotacio) * KANUOTA_DISTANCO;
    // ⟨ ſɭэ ֭ſɭэ ʌ }ʃɹƽ ʌ ſɭэ ֭ſɭэ , ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ ⟅ }ʃɹƽ ʌ ſɭэ ֭ſɭэ
    // ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ ⟅ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ꞙɭɔ , }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ 📃 ⟩
    const saxeni = komencaAngulo(hatafkaq, { x: landaX, z: landaZ }, uzitajAnguloj)
      ?? { x: sost2.ofsX, z: sost2.ofsZ };
    registri(saxeni);
    hak6h6.push({
      ksaka: "Kajo " + ( i + 0o1 ).toString(8),
      sefini: 0o340/0o100,
      n2k: [
        [ saxeni.x, saxeni.z ],
        [ saxeni.x + ( landaX - saxeni.x ) * 0o1/0o4, saxeni.z + ( landaZ - saxeni.z ) * 0o1/0o4 ],
        [ saxeni.x + ( landaX - saxeni.x ) * 0o3/0o4, saxeni.z + ( landaZ - saxeni.z ) * 0o3/0o4 ],
        [ landaX, landaZ ],
      ],
    });
    // ⟨ ſᶘᴜ j͑ʃᴜ ʌ ſןᴜȝ ʌ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ 📃 ⟩
    if ( tero.alteco(akvaX, akvaZ) < hasukf2qani.vem2 ) {
      objektoj.push({ x: akvaX, z: akvaZ, pudal: "kanuo", rotacio: rotacio + Math.PI });
    }
  }

  // ⟪ ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ 📃 ⟫
  // ſɭᴜ ı],ƨɔ ʌ ſᶘɔ , ſɭэ ֭ſɭэ ʌ ſɭᴜ ı],ƨɔ ꞙɭɿ ⟅ ꞙɭɔ , ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ ⟅ }ʃɹƽ
  // ſɭɜ ſɭ,w , ɽ͑ʃ'w j͑ʃ'ᴜ ʌ }ʃɹƽ ʌ ſɭɜ ſɭ,w ⟅
  const ejoDeAvenuo = (): { x: number; z: number } | null => {
    let plejBona: { x: number; z: number } | null = null;
    let plejPunkto = -Infinity;
    for ( let a = 0; a < 0o20; a++ ) {
      const h = subSemo(sKrompoj, a);
      const tafkaq = ( h % 0o1000 ) / 0o1000 * Math.PI * 0o2;
      const h6kuni = 0o300 + ( h >>> 0o10 ) % 0o300;
      const x = sost2.ofsX + Math.cos(tafkaq) * h6kuni;
      const z = sost2.ofsZ + Math.sin(tafkaq) * h6kuni;
      if ( !hasukf2qani.enQoxa(x, z) ) continue;
      if ( hasukf2qani.randoDeQoxa(x, z) > -0o100 ) continue;
      const l6da = tero.alteco(x, z);
      if ( l6da < hasukf2qani.vem2 + EJA_SEKURA_PROFUNDO ) continue;
      if ( l6da > EJA_MONTA_LIMO ) continue;
      // ⟨ ſןᴜ j͐ʃэ ʌ j͑ʃ'ɔ ŋᷠɹ , ſɭɜ ſɭ,w ⟅ 📃 ⟩
      const n2k = h6kuni - l6da * 0o10;
      if ( n2k > plejPunkto ) { plejPunkto = n2k; plejBona = { x, z }; }
    }
    return plejBona;
  };

  const celo = hakaxte.length >= 0o2
    ? { x: hakaxte[1].ofsX, z: hakaxte[1].ofsZ }
    : ejoDeAvenuo();
  if ( celo ) {
    // ⟨ ſɭэ ֭ſɭэ ʌ }ʃᴜ j͐ʃᴜ ʌ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ⟅ }ʃɹƽ ʌ ſɭᴜ ı],ƨɔ 📃 ⟩
    const ekiro = komencaAngulo(hatafkaq, celo, uzitajAnguloj)
      ?? { x: sost2.ofsX, z: sost2.ofsZ };
    registri(ekiro);
    const mezX = ( ekiro.x + celo.x ) / 0o2;
    const mezZ = ( ekiro.z + celo.z ) / 0o2;
    // ⟨ ſɭэ ֭ſɭэ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ 📃 ⟩
    const kanto = ( sKrompoj % 0o2 ) === 0 ? 0o1 : -0o1;
    const bendX = mezX - ( celo.z - ekiro.z ) * 0o3/0o100 * kanto;
    const bendZ = mezZ + ( celo.x - ekiro.x ) * 0o3/0o100 * kanto;
    const n2k: [ number, number ][] = [ [ ekiro.x, ekiro.z ] ];
    for ( const [ bx, bz ] of [ [ mezX, mezZ ], [ bendX, bendZ ] ] ) {
      if ( hasukf2qani.enQoxa(bx, bz) && tero.alteco(bx, bz) >= hasukf2qani.vem2 ) n2k.push([ bx, bz ]);
    }
    n2k.push([ celo.x, celo.z ]);
    hak6h6.push({ ksaka: hakaxte.length >= 0o2 ? "K6h6 inter hakaxte" : "Avenuo", sefini: 0o340/0o100, n2k });
  }

  // ⟪ ſɟɔ j͐ʃɹ }ʃw ſᶘɔ ɭl̀ɹȝ ꞁȷ̀ᴜꞇ ʌ ſɭэ ֭ſɭэ 📃 ⟫
  for ( const k6h6 of hak6h6 ) {
    for ( let i = 0; i + 1 < k6h6.n2k.length; i++ ) {
      const [ ax, az ] = k6h6.n2k[i];
      const [ bx, bz ] = k6h6.n2k[i + 1];
      const sahakani = Math.hypot(bx - ax, bz - az);
      const havepat6ni = Math.max(0o1, Math.round(sahakani / LAMPA_PASXO));
      const nx = -( bz - az ) / ( sahakani || 1 ), nz = ( bx - ax ) / ( sahakani || 1 );
      for ( let s = 0; s <= havepat6ni; s++ ) {
        const t = s / havepat6ni;
        if ( i === 0 && s === 0 ) continue;
        const kanto = ( ( ( s + i ) & 1 ) === 0 ) ? 1 : -1;
        const x = ax + ( bx - ax ) * t + nx * LAMPA_ALTERANDO * kanto;
        const z = az + ( bz - az ) * t + nz * LAMPA_ALTERANDO * kanto;
        if ( !hasukf2qani.enQoxa(x, z) ) continue;
        if ( tero.alteco(x, z) < hasukf2qani.vem2 + 0o1/0o2 ) continue;
        // ⟨ ſɟɔ j͐ʃɹ }ʃw ſᶘɔ ɭl̀ɹȝ ꞁȷ̀ᴜꞇ ʌ ſɭɜ ʃɔ }ʃᴜ j͐ʃᴜ 📃 ⟩
        if ( ( sOrnamoj >>> ( ( s + i * 0o7 ) % 0o10 ) ) % 0o5 === 0 ) continue;
        objektoj.push({ x, z, pudal: "hxeuxfoPa12", rotacio: Math.PI / 0o4 });
      }
    }
  }

  return { hakaxte, hak6h6, haqakaj2, objektoj };
}
