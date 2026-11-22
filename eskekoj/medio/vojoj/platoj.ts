// ≺⧼ ចានភ្ជាប់ 🔲 ⧽≻
import * as THREE from "three";
import { ANGULA_PROVOLIRO, kreiGeometriajnBufrojn, kreiVojojnMaterialojn } from "./bufroj.js";
import { kreiPlataNivelon, kunigajBrakAltoj, vojaSuproDeKunigo,
  type PlataNivelo } from "./formoj.js";
import { kunigajNiveloj } from "./kunig-niveloj.js";
import { surGrid, VOJA_BORDA_LARĜO, VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO,
  VOJA_SUPRO_LEVIGXO, VOJA_TRUA_DUONO } from "./mezuroj.js";

// ⟪ មុំនៃចានភ្ជាប់ 🧭 ⟫
// ⟨ ចានភ្ជាប់ធ្វើតាមទិសដៃពិត ។ មុននេះវាបែងជាបួនជ្រុងតាមអ័ក្ស ,
// ដូច្នេះផ្លូវដែលកាត់តាមមុំ ៤៥ ឬ ១៣០ ដឺក្រេ មិនត្រូវនឹងជ្រុងចាន ,
// ហើយលេចចន្លោះ ឬគែមលើស ។ ឥឡូវចានជាសហជីវនៃបន្ទះផ្លូវទាំងអស់
// បូករង្វង់កណ្តាល , ហើយជ្រុងរវាងដៃពីរត្រូវបំពេញដោយធ្នូមូល ។ 📃 ⟩
const DUOBLA_PI = Math.PI * 0o2;
// ⟨ ជំហានមុំ 📏 ⟩ ៖ គ្រប់គ្រងភាពរលូននៃគែម ។ ១/៣២ រ៉ាដ្យង់គឺតូចល្មម ។
const ANGULA_PASXO = 0o1 / 0o40;
const ANGULA_TOLERO = 0o1 / 0o1000;

export interface Knece {
  ang: number;
  ux: number;
  uz: number;
  nx: number;
  nz: number;
  // ⟨ កន្លះទទឹងផ្លូវពិត 🛣️ ⟩ ៖ ចានត្រូវធំល្មមនឹងផ្លូវដែលចូលមក , មិនមែន
  // តាមតម្លៃថេរទេ ។ បើចានតូចជាងផ្លូវ , ស្មាងងឹតរបស់ផ្លូវលាតចេញហួសចាន ,
  // ហើយឃើញជាខ្សែងងឹតកាត់ចំណុចភ្ជាប់ ។ 📃 ⟩
  p2somani: number;
  // ⟨ កន្លះទទឹងរួមស្មា 📏 ⟩ ៖ កំពូលបូកស្មា ។
  ekstera: number;
}

// ⟪ មុំធម្មតា 📐 ⟫
/*នាំមុំទៅចន្លោះ 0 ដល់ 2π
    @param tafkaq ( number ) - មុំរ៉ាដ្យង់
@returns tafkaq ( number ) - មុំក្នុងចន្លោះ [ 0 , 2π ) */
function normAng(tafkaq: number): number {
  const r = tafkaq % DUOBLA_PI;
  return r < 0 ? r + DUOBLA_PI : r;
}

// ⟪ មុំស្មើគ្នា 📐 ⟫
/*ពិនិត្យថាមុំពីរជិតគ្នាលើរង្វង់
    @param a, b ( number ) - មុំរ៉ាដ្យង់
@returns sama ( boolean ) - ពិតបើខុសគ្នាតិចជាង ANGULA_TOLERO */
function samaAng(a: number, b: number): boolean {
  const d = Math.abs(normAng(a) - normAng(b));
  return Math.min(d, DUOBLA_PI - d) < ANGULA_TOLERO;
}

// ⟪ ដៃពីទិសដៅ 📏 ⟫
/*បំប្លែងទិសដៅទៅជាដៃដែលមានមុំ និងណរម៉ាល់
    @param hac2w2q ( [ number , number ] [ ] ) - ទិសដៅដៃ
@returns knece ( Knece [ ] ) - ដៃតម្រៀបតាមមុំ */
function brakojElDirektoj(hac2w2q: readonly [ number, number ][], p2somani: number): Knece[] {
  const rez: Knece[] = [];
  const ekstera = p2somani + VOJA_BORDA_LARĜO;
  for ( const [ dx, dz ] of hac2w2q ) {
    const sahakani = Math.hypot(dx, dz);
    if ( sahakani < ANGULA_TOLERO ) continue;
    const ux = dx / sahakani, uz = dz / sahakani;
    const ang = normAng(Math.atan2(uz, ux));
    if ( rez.some(b => samaAng(b.ang, ang)) ) continue;
    rez.push({ ang, ux, uz, nx: -uz, nz: ux, p2somani, ekstera });
  }
  rez.sort(( a, b ) => a.ang - b.ang);
  return rez;
}

// ⟪ ដៃពីការបិទជ្រុង 📏 ⟫
/*បង្កើតដៃពីព័ត៌មានបិទជ្រុង នៅពេលគ្មានទិសដៅពិត
    @param ferma ( [ number , number ] ) - ជ្រុងបិទ ( អ័ក្ស x និង z )
    @param rotacio ( number ) - មុំបង្វិលនៃចាន
@returns knece ( Knece [ ] ) - ដៃតាមអ័ក្ស */
function brakojElFermitaj(ferma: [ number, number ], rotacio: number, p2somani: number): Knece[] {
  const kos = Math.cos(rotacio), sin = Math.sin(rotacio);
  const lokaj: [ number, number ][] = [];
  if ( ferma[0] !== 1 ) lokaj.push([ 1, 0 ]);
  if ( ferma[0] !== -1 ) lokaj.push([ -1, 0 ]);
  if ( ferma[1] !== 1 ) lokaj.push([ 0, 1 ]);
  if ( ferma[1] !== -1 ) lokaj.push([ 0, -1 ]);
  return brakojElDirektoj(lokaj.map(([ lx, lz ]) =>
    [ kos * lx - sin * lz, sin * lx + kos * lz ] as [ number, number ]), p2somani);
}

// ⟪ កាំនៃបន្ទះផ្លូវ 📏 ⟫
/*រកចម្ងាយរហូតដល់គែមបន្ទះផ្លូវតាមមុំមួយ
    @param knece ( Knece ) - ដៃផ្លូវ
    @param p2somani ( number ) - កន្លះទទឹងបន្ទះ
    @param tafkaq ( number ) - មុំសម្រាប់ស្កេន
@returns ka5ik ( number ) - ចម្ងាយតាមរង្វង់ , ឬ 0 បើខាងក្រោយ */
function bendoRadiuso(knece: Knece, p2somani: number, tafkaq: number): number {
  const rel = normAng(tafkaq - knece.ang);
  const laux = Math.cos(rel);
  if ( laux <= ANGULA_TOLERO ) return 0;
  const kanto = Math.abs(Math.sin(rel));
  const tlakakani = VOJA_TRUA_DUONO / laux;
  const pukaz = kanto > ANGULA_TOLERO ? p2somani / kanto : Infinity;
  return Math.min(tlakakani, pukaz);
}

// ⟪ ធ្នូជ្រុង 📐 ⟫
interface Fileto {
  cx: number;
  cz: number;
  rTop: number;
  rOut: number;
  phi0: number;
  delta: number;
}

// ⟪ មុំខ្លី 📐 ⟫
/*នាំភាពខុសគ្នាមុំទៅចន្លោះ ( -π , π ]
    @param a, b ( number ) - មុំរ៉ាដ្យង់
@returns delta ( number ) - មុំខ្លីពី b ទៅ a */
function angulaDiferenco(a: number, b: number): number {
  let d = ( a - b ) % DUOBLA_PI;
  if ( d > Math.PI ) d -= DUOBLA_PI;
  if ( d <= -Math.PI ) d += DUOBLA_PI;
  return d;
}

// ⟪ ធ្នូរវាងដៃពីរ 📏 ⟫
/*បង្កើតធ្នូមូលដែលបំពេញជ្រុងរវាងដៃពីរ ។ មជ្ឈមណ្ឌលជាចំណុចប្រសព្វ
    នៃបន្ទាត់មាត់ដៃទាំងពីរ , ដូច្នេះធ្នូប៉ះបន្ទាត់ចំហៀងដៃដោយរលូន ។
    @param xaqadi, dua ( Knece ) - ដៃជាប់គ្នា
    @param delta ( number ) - មុំរវាងដៃតាមទិសវិញ្ញាណ
@returns fileto ( Fileto | null ) - ធ្នូ , ឬ null បើជ្រុងចង្អៀតពេក */
function filetoPor(xaqadi: Knece, dua: Knece, delta: number): Fileto | null {
  if ( delta >= Math.PI - ANGULA_TOLERO ) return null;
  const det = xaqadi.ux * dua.uz - xaqadi.uz * dua.ux;
  if ( det <= ANGULA_TOLERO ) return null;
  const cx = ( VOJA_TRUA_DUONO * dua.uz - xaqadi.uz * VOJA_TRUA_DUONO ) / det;
  const cz = ( xaqadi.ux * VOJA_TRUA_DUONO - VOJA_TRUA_DUONO * dua.ux ) / det;
  // ⟨ ចម្ងាយតាមណរម៉ាល់ 📏 ⟩ ៖ បើតូចជាងគែមខាងក្រៅ , ដៃទាំងពីរជាន់គ្នា ,
  // ដូច្នេះសហជីវនៃបន្ទះគ្របគ្រាន់ហើយ ។ ការបង្កើតធ្នូនៅទីនោះនឹងកាត់ចូលផ្លូវ ។ 📃 ⟩
  const t = ( cx - xaqadi.ux * VOJA_TRUA_DUONO ) * xaqadi.nx
    + ( cz - xaqadi.uz * VOJA_TRUA_DUONO ) * xaqadi.nz;
  if ( t <= xaqadi.ekstera + ANGULA_TOLERO ) return null;
  const rTop = t - xaqadi.p2somani;
  const rOut = t - xaqadi.ekstera;
  if ( rTop <= ANGULA_TOLERO || rOut <= ANGULA_TOLERO ) return null;
  const p0x = xaqadi.ux * VOJA_TRUA_DUONO + xaqadi.nx * xaqadi.p2somani;
  const p0z = xaqadi.uz * VOJA_TRUA_DUONO + xaqadi.nz * xaqadi.p2somani;
  const p1x = dua.ux * VOJA_TRUA_DUONO - dua.nx * dua.p2somani;
  const p1z = dua.uz * VOJA_TRUA_DUONO - dua.nz * dua.p2somani;
  const phi0 = Math.atan2(p0z - cz, p0x - cx);
  const phi1 = Math.atan2(p1z - cz, p1x - cx);
  return { cx, cz, rTop, rOut, phi0, delta: angulaDiferenco(phi1, phi0) };
}

// ⟪ កាំនៃធ្នូ 📏 ⟫
/*រកចម្ងាយតាមរង្វង់ដល់ធ្នូ , បើកាំរង្វង់កាត់ធ្នូនោះ
    @param fileto ( Fileto ) - ធ្នូជ្រុង
    @param r ( number ) - កាំធ្នូ
    @param tafkaq ( number ) - មុំស្កេន
@returns ka5ik ( number ) - ចម្ងាយ , ឬ 0 បើមិនប៉ះ */
function filetaRadiuso(fileto: Fileto, r: number, tafkaq: number): number {
  const kos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
  const projekcio = fileto.cx * kos + fileto.cz * sin;
  const kvadrato = fileto.cx * fileto.cx + fileto.cz * fileto.cz - r * r;
  const diskriminanto = projekcio * projekcio - kvadrato;
  if ( diskriminanto < 0 ) return 0;
  const zace = Math.sqrt(diskriminanto);
  // ⟨ កាត់ពីរចំណុច 📏 ⟩ ៖ ធ្នូបែរទៅរកជ្រុងខាងក្នុង , ដូច្នេះចំណុចជិតគឺជាគែមចាន ។
  // ចំណុចឆ្ងាយនៅខាងក្រៅធ្នូ , ដូច្នេះយកតែចំណុចដែលនៅលើធ្នូ ។ បើយកចំណុចឆ្ងាយ ,
  // ចាននឹងលាតហួសធ្នូ ឬគ្មានធ្នូទាល់តែសោះ , ហើយជ្រុងក្លាយជាស្រួច ។ 📃 ⟩
  for ( const lambda of [ projekcio - zace, projekcio + zace ] ) {
    if ( lambda <= 0 ) continue;
    const phi = Math.atan2(sin * lambda - fileto.cz, kos * lambda - fileto.cx);
    const rel = angulaDiferenco(phi, fileto.phi0);
    if ( fileto.delta >= 0 ) {
      if ( rel < -ANGULA_TOLERO || rel > fileto.delta + ANGULA_TOLERO ) continue;
    } else {
      if ( rel > ANGULA_TOLERO || rel < fileto.delta - ANGULA_TOLERO ) continue;
    }
    return lambda;
  }
  return 0;
}

// ⟨ កាំមាត់ផ្លូវ 📏 ⟩ ៖ ចម្ងាយដែលបន្ទាត់កាត់ផ្លូវស្ថិតនៅ ។
// ផ្លូវកាត់ត្រង់នៅ VOJA_TRUA_DUONO , ដូច្នេះចានមិនត្រូវលាតហួសបន្ទាត់នេះទេ ,
// បើមិនដូច្នេះគែមចាននិងស្មាផ្លូវជាន់គ្នានៅមុំទ្រេត ។ បើបន្ទាត់កាត់នៅក្រៅ
// ជ្រុងផ្លូវវិញ ( ធ្នូតូច ) , ដៃនោះមិនកាត់ទេ ។ 📃 ⟩
function kapoRadiuso(haknece: readonly Knece[], tafkaq: number): number {
  let teruni = Infinity;
  for ( const knece of haknece ) {
    const rel = normAng(tafkaq - knece.ang);
    const laux = Math.cos(rel);
    if ( laux <= ANGULA_TOLERO ) continue;
    const tlakakani = VOJA_TRUA_DUONO / laux;
    const kanto = Math.abs(Math.sin(rel));
    const pukaz = kanto > ANGULA_TOLERO ? knece.ekstera / kanto : Infinity;
    if ( tlakakani <= pukaz + ANGULA_TOLERO && tlakakani < teruni ) teruni = tlakakani;
  }
  return teruni;
}

// ⟪ កាំគែមខាងលើ និងខាងក្រៅ 📏 ⟫
function suproRadiuso(haknece: readonly Knece[], fileto: Fileto | null, tafkaq: number): number {
  let r = VOJA_DIORITA_DUONO;
  for ( const knece of haknece ) {
    r = Math.max(r, knece.p2somani);
    r = Math.max(r, bendoRadiuso(knece, knece.p2somani, tafkaq));
  }
  if ( fileto ) r = Math.max(r, filetaRadiuso(fileto, fileto.rTop, tafkaq));
  return r;
}

function eksteraRadiuso(haknece: readonly Knece[], fileto: Fileto | null, tafkaq: number): number {
  let r = VOJA_EKSTERA_DUONO;
  for ( const knece of haknece ) {
    r = Math.max(r, knece.ekstera);
    r = Math.max(r, bendoRadiuso(knece, knece.ekstera, tafkaq));
  }
  if ( fileto ) r = Math.max(r, filetaRadiuso(fileto, fileto.rOut, tafkaq));
  return r;
}

// ⟪ គំរូមុំក្នុងចន្លោះ 📐 ⟫
/*បង្កើតបញ្ជីមុំគំរូរវាងមុំពីរ , ដោយរួមមុំបំបែកទាំងអស់
    @param a0, a1 ( number ) - មុំដើម និងចុង ( a1 > a0 )
    @param rompoj ( number [ ] ) - មុំដែលគែមប្តូរទម្រង់
@returns hatafkaq ( number [ ] ) - មុំគំរូតាមលំដាប់ */
function angulojGap(a0: number, a1: number, rompoj: readonly number[]): number[] {
  const enaj: number[] = [ a0, a1 ];
  for ( const r of rompoj ) {
    for ( const b of [ r - DUOBLA_PI, r, r + DUOBLA_PI ] ) {
      if ( b > a0 + ANGULA_TOLERO && b < a1 - ANGULA_TOLERO ) enaj.push(b);
    }
  }
  enaj.sort(( a, b ) => a - b);
  const rez: number[] = [ enaj[0] ];
  for ( let i = 1; i < enaj.length; i++ ) {
    const p0 = enaj[i - 1], p1 = enaj[i];
    if ( p1 - p0 < ANGULA_TOLERO ) continue;
    const n = Math.max(1, Math.ceil(( p1 - p0 ) / ANGULA_PASXO));
    for ( let k = 1; k <= n; k++ ) rez.push(p0 + ( p1 - p0 ) * k / n);
  }
  if ( rez.length < 3 ) rez.push(( a0 + a1 ) / 2);
  return rez;
}

// ⟪ ដៃចានភ្ជាប់ 📏 ⟫
/*រកដៃពិតរបស់ចំណុចភ្ជាប់ ។ បើគ្មានទិសដៃ , សន្មតជាប្រសព្វបួនជ្រុង
    @param hac2w2q ( [ number , number ] [ ] ) - ទិសដៅដៃពិត
    @param ferma ( [ number , number ] | undefined ) - ជ្រុងបិទ
    @param rotacio ( number ) - មុំបង្វិលនៃចាន
@returns knece ( Knece [ ] ) - ដៃតម្រៀបតាមមុំ */
export function kreiBrakojn(hac2w2q: readonly [ number, number ][],
  ferma: [ number, number ] | undefined, rotacio: number,
  p2somani: number = VOJA_DIORITA_DUONO): Knece[] {
  const haknece = brakojElDirektoj(hac2w2q, p2somani);
  if ( haknece.length ) return haknece;
  // ⟨ គ្មានព័ត៌មានដៃ 📃 ⟩ ៖ បើគ្មានទិសដៃ និងគ្មានការបិទជ្រុង ( ឧ. ចំណុចក្រឡាដែលការបិទ
  // ត្រូវលុប ព្រោះផ្លូវភ្ជាប់មកដល់ ) សន្មតជាប្រសព្វបួនជ្រុង ។ ចានមូលតូចមិនគ្រប់ទេ ,
  // ព្រោះផ្លូវកាត់រន្ធនៅ VOJA_TRUA_DUONO , ដូច្នេះរន្ធរង្វង់នៅមាត់ផ្លូវនឹងនៅទទេ ។ 📃 ⟩
  return brakojElFermitaj(ferma ?? [ 0, 0 ], rotacio, p2somani);
}

// ⟪ ពហុកោណចានភ្ជាប់ 🔲 ⟫
export interface PlatajPoligonoj {
  hateru: [ number, number ][];
  bandoj: [ number, number ][][];
  // ⟨ មុំ និងកាំនៃគែមកំពូល តាមលំដាប់ដូច `hateru` ។ ចានមិនរាបស្មើទេ ,
  // ដូច្នេះកម្ពស់ត្រូវគណនាតាមមុំនៃចំណុចនីមួយៗ ។ 📃 ⟩
  hatafkaq: number[];
  rs: number[];
  re: number[];
}

/*សាងសង់ពហុកោណកំពូល និងបន្ទះគែមរបស់ចានភ្ជាប់
    @param knece ( readonly Knece [ ] ) - ដៃរបស់ចាន
@returns poligonoj ( PlatajPoligonoj ) - ពហុកោណក្នុងកូអរដោនេមូលដ្ឋាន */
export function kreiPlatajnPoligonojn(haknece: readonly Knece[]): PlatajPoligonoj {
  // ⟨ មុំបំបែក 📐 ⟩ ៖ មុំដែលគែមបន្ទះប្តូរពីមាត់ទៅចំហៀង ។
  const rompoj: number[] = [];
  for ( const knece of haknece ) {
    for ( const p2somani of [ knece.p2somani, knece.ekstera ] ) {
      const ofseto = Math.atan(p2somani / VOJA_TRUA_DUONO);
      rompoj.push(normAng(knece.ang + ofseto), normAng(knece.ang - ofseto));
    }
  }
  const n = haknece.length;
  const hateru: [ number, number ][] = [];
  const bandoj: [ number, number ][][] = [];
  const hatafkaq: number[] = [];
  const rsListo: number[] = [];
  const reListo: number[] = [];
  for ( let i = 0; i < n; i++ ) {
    const a0 = haknece[i].ang;
    const a1 = i + 1 < n ? haknece[i + 1].ang : haknece[0].ang + DUOBLA_PI;
    const delta = a1 - a0;
    const fileto = filetoPor(haknece[i], haknece[( i + 1 ) % n], delta);
    const angulojGapListo = angulojGap(a0, a1, rompoj);
    const suprajGap: [ number, number ][] = [];
    const bendoGap: { rs: number; re: number; kos: number; sin: number; tafkaq: number }[] = [];
    for ( const tafkaq of angulojGapListo ) {
      // ⟨ កាត់តាមមាត់ផ្លូវ 📏 ⟩ ៖ គែមក្រៅមិនលាតហួសបន្ទាត់កាត់ផ្លូវទេ ។
      // កំពូលក៏កាត់ដែរ , ព្រោះជ្រុងផ្លូវមួយចូលក្នុងបន្ទះផ្លូវផ្សេងនៅមុំទ្រេត ។ 📃 ⟩
      const limito = Math.min(eksteraRadiuso(haknece, fileto, tafkaq),
        kapoRadiuso(haknece, tafkaq));
      const rs = Math.min(suproRadiuso(haknece, fileto, tafkaq), limito);
      const re = limito;
      const kos = Math.cos(tafkaq), sin = Math.sin(tafkaq);
      suprajGap.push([ kos * rs, sin * rs ]);
      bendoGap.push({ rs, re, kos, sin, tafkaq });
    }
    for ( let j = 0; j < suprajGap.length; j++ ) {
      if ( i > 0 && j === 0 ) continue;
      if ( i + 1 === n && j === suprajGap.length - 1 ) continue;
      hateru.push(suprajGap[j]);
      hatafkaq.push(bendoGap[j].tafkaq);
      rsListo.push(bendoGap[j].rs);
      reListo.push(bendoGap[j].re);
    }
    // ⟨ បន្ទះខាងក្រៅ 📏 ⟩ ៖ ខ្សែក្រៅទៅមុខ , ខ្សែក្នុងត្រឡប់ក្រោយ ។
    // ត្រង់ណាដែលខ្សែទាំងពីរជាប់គ្នា ( មាត់ដៃ ឬបន្ទាត់កាត់ ) បន្ទះមានទទឹងសូន្យ ។
    // បើយកចំណុចស្មើគ្នាច្រើនចូល , ពហុកោណកាត់ខ្លួនឯង ហើយការបំបែកត្រីកោណចេញខុស ។
    // ដូច្នេះយកតែចន្លោះដែលមានទទឹង បូកជ្រុងម្ខាងម្នាក់ ដើម្បីបិទចុងឱ្យជាប់ ។ 📃 ⟩
    const larghaj = bendoGap.map(b => b.re - b.rs > ANGULA_TOLERO);
    let j = 0;
    while ( j < bendoGap.length ) {
      if ( !larghaj[j] ) { j++; continue; }
      let tlakakani = j;
      while ( tlakakani + 1 < bendoGap.length && larghaj[tlakakani + 1] ) tlakakani++;
      const xaqadi = Math.max(0, j - 1);
      const z2hak = Math.min(bendoGap.length - 1, tlakakani + 1);
      j = tlakakani + 1;
      if ( z2hak - xaqadi < 2 ) continue;
      const eksteraj: [ number, number ][] = [];
      const internaj: [ number, number ][] = [];
      for ( let k = xaqadi; k <= z2hak; k++ ) {
        const b = bendoGap[k];
        eksteraj.push([ b.kos * b.re, b.sin * b.re ]);
        internaj.push([ b.kos * b.rs, b.sin * b.rs ]);
      }
      bandoj.push([ ...eksteraj, ...internaj.slice(1, -1).reverse() ]);
    }
  }
  return { hateru, bandoj, hatafkaq, rs: rsListo, re: reListo };
}

// ⟪ កម្រិតចានភ្ជាប់ពីដៃ 📏 ⟫
/*គណនាកម្រិតកំពូលចានភ្ជាប់ពីដៃដែលបានដោះស្រាយរួច ។ ផ្លូវ និងចានត្រូវប្រើ
   អនុគមន៍នេះដូចគ្នា ។ បើផ្លូវអានពីទិសដៃឆៅ ហើយចានអានពីដៃសំយោគ ( ពេលទិសដៃទទេ ) ,
   កម្រិតខុសគ្នាមួយជំហាន , ហើយឃើញជាជញ្ជាំងឈរ ។
    @param x, z ( number ) - ពិភពលោក
    @param knece ( readonly Knece [ ] ) - ដៃចាន
    @param heightFn ( function ) - កម្ពស់វាល
@returns teru ( number ) - កម្រិតកំពូលដែលបានបង្គត់ទៅក្រឡាជំហាន */
export function kunigaPlataAlto(x: number, z: number, knece: readonly Knece[],
  heightFn: ( x: number, z: number ) => number): number {
  const hac2w2q = knece.map(b => [ b.ux, b.uz ] as [ number, number ]);
  // ⟨ កាំអានកម្រិតនៅតែថេរ 📏 ⟩ ៖ ទទឹងចានធំជាងមុន , តែកាំអានកម្រិតមិនប្តូរទេ ។
  // ការប្តូរកាំនឹងប្តូរកម្ពស់ផ្លូវទាំងអស់ , ដែលជាការប្តូរធំហួសពីបញ្ហាគែមចាន ។ 📃 ⟩
  // ⟨ លុបការបង្គត់ឡើងក្រោយ 📃 ⟩ ៖ កម្រិតកំពូលមានរួចជា VOJA_SUPRO_LEVIGXO ,
  // ដូច្នេះបង្គត់លើ `maks` ជាកម្រិតដែលចានអាន ។ 📃 ⟩
  // ⟨ មាត់ចានក៏ជាដី 📏 ⟩ ៖ vojaSuproDeKunigo អានត្រឹមកាំ VOJA_EKSTERA_DUONO ,
  // តែផ្លូវចាប់ផ្តើមនៅ VOJA_TRUA_DUONO ។ នៅជម្រាល ដីនៅមាត់ខ្ពស់ជាងដី
  // កណ្តាលច្រើន , ដូច្នេះចានទាបពេក ហើយផ្លូវដែលមិនកប់ត្រូវលោតឡើងភ្លាមៗ
  // ពីចាន = ជញ្ជាំងឈរ ។ អានកម្ពស់ដីនៅមាត់ដៃនីមួយៗ ហើយយកខ្ពស់បំផុត ។
  // អ្នកគណនាចាន អ្នកគណនាផ្លូវ និងឧបករណ៍វាស់ ទាំងអស់ហៅអនុគមន៍តែមួយនេះ ។ 📃 ⟩
  const randaj = kunigajBrakAltoj(x, z, hac2w2q, knece.map(b => b.p2somani), heightFn)
    .filter(Number.isFinite);
  const randaSupro = randaj.length ? Math.max(...randaj) : -Infinity;
  return Math.max(
    surGrid(vojaSuproDeKunigo(x, z, hac2w2q, VOJA_EKSTERA_DUONO, heightFn).hateru
      - VOJA_SUPRO_LEVIGXO),
    randaSupro );
}

// ⟪ កម្រិតចានតាមដៃ 📏 ⟫
// ⟨ ចានមួយ កម្ពស់ច្រើន 📃 ⟩ ៖ ចានមិនមានកម្ពស់តែមួយទេ ។ ដៃនីមួយៗមកពីដីរៀងខ្លួន ,
// ដូច្នេះមាត់ដៃមានកម្រិតផ្លូវរៀងខ្លួន ។ ការអានវាលនៅមាត់ដៃត្រឡប់កម្រិតមាត់នោះ ,
// ព្រោះវាលបង្កប់កម្រិតចានតាមទិសរួចហើយ ។ 📃 ⟩
export function kunigaPlataNivelo(x: number, z: number, knece: readonly Knece[],
  heightFn: ( x: number, z: number ) => number): PlataNivelo {
  const hac2w2q = knece.map(b => [ b.ux, b.uz ] as [ number, number ]);
  const hap2somani = knece.map(b => b.p2somani);
  const hal6da = kunigajBrakAltoj(x, z, hac2w2q, hap2somani, heightFn)
    .map(l6da => Number.isFinite(l6da) ? l6da : NaN);
  const fallback = kunigaPlataAlto(x, z, knece, heightFn);
  return kreiPlataNivelon(hac2w2q, hap2somani, hal6da, fallback);
}

export function konstruiIntersekcajnPlatojn(qena: THREE.Scene,
  n2k: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  fermitaj: Map<string, [ number, number ]> = new Map(),
  rotacioj: Map<string, number> = new Map(),
  hac2w2q: Map<string, [ number, number ][]> = new Map(),
  grundoFn: ( x: number, z: number ) => number = heightFn,
  hap2somani: Map<string, number> = new Map()
): void {
  if ( n2k.length === 0 ) return;
  // ⟨ លំដាប់ជម្រៅ 📏 ⟩ ៖ ស្មាងងឹត ( borda ) មិនត្រូវគូរលើកំពូលភ្លឺរបស់ផ្លូវទេ ។
  //   ពីមុនស្មាចាននៅ (-4,-5) ជិតជាងកំពូលផ្លូវ (-2,-4) , ដូច្នេះនៅកន្លែងជាន់គ្នា
  //   ស្មាងងឹតឈ្នះ ហើយលេចជាខ្សែងងឹតកាត់ផ្លូវ ។ ឥឡូវស្មាចាននៅក្រោយកំពូលទាំងពីរ ។ 📃 ⟩
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -3, -2, -1, -3);
  const bufroj = kreiGeometriajnBufrojn();
  for ( const [ x, z ] of n2k ) {
    const ca3aq = x + "," + z;
    const knece = kreiBrakojn(hac2w2q.get(ca3aq) ?? [], fermitaj.get(ca3aq),
      rotacioj.get(ca3aq) ?? 0, hap2somani.get(ca3aq) ?? VOJA_DIORITA_DUONO);
    // ⟪ ចានរាបតែមួយកម្រិត 📏 ⟫
    // ⟨ កម្ពស់មកពីផ្លូវពិត 📃 ⟩ ៖ konstruiVojojn បានតាមដានកម្ពស់ផ្លូវតាមដៃ
    // នីមួយៗ ហើយជ្រើសកម្រិតចានពីដៃទាបបំផុត ។ ចានទាំងមូលរាបស្មើនៅកម្រិត
    // នោះ , គ្មានកង្ហារជម្រាល , គ្មានស្នាមកាត់កណ្តាល , គ្មានជ្រុងលើក ។
    // ផ្លូវខ្ពស់ៗឡើងជាជំហានពីចានទៅរកកម្រិតរបស់វា ។ 📃 ⟩
    const reg = kunigajNiveloj.get(ca3aq);
    const plataAlto = reg ? reg.l6da
      : surGrid(kunigaPlataNivelo(x, z, knece, heightFn).l6da);
    const poligonoj = kreiPlatajnPoligonojn(knece);
    const vem2 = poligonoj.hateru.length;
    if ( vem2 < 3 ) continue;
    const eksterajPozicioj: [ number, number ][] = poligonoj.hatafkaq.map((tafkaq, k) =>
      [ Math.cos(tafkaq) * poligonoj.re[k], Math.sin(tafkaq) * poligonoj.re[k] ]);
    // ⟨ បាតតាមដី 📏 ⟩ ៖ ចានជាបន្ទះស្តើងដែលតាមដី , មិនមែនប្លុកថ្មខ្ពស់ ។
    // បាតអានដីត្រង់កាំខាងក្រៅ ( ជាកន្លែងដែលមុខចំហៀងឈរ ) មិនមែនកាំខាងក្នុង ។ 📃 ⟩
    const malsupraj = eksterajPozicioj.map(p =>
      Math.min(plataAlto, grundoFn(x + p[0], z + p[1])) - ANGULA_PROVOLIRO);
    const centroMalsupra = Math.min(plataAlto - ANGULA_PROVOLIRO, ...malsupraj);
    // ⟨ បណ្តោយគែមសម្រាប់ uv 📏 ⟩ ៖ មុខចំហៀងជាជញ្ជាំងឈរ ។ បើ uv តាម ( x , z ) ,
    // វាយនភាពលាតជាបន្ទាត់មួយ ។ ដូច្នេះមុខចំហៀងប្រើ ( បណ្តោយគែម , កម្ពស់ ) ។ 📃 ⟩
    const arkoj: number[] = [ 0 ];
    for ( let k = 1; k < vem2; k++ )
      arkoj.push(arkoj[k - 0o1] + Math.max(0,
        poligonoj.hatafkaq[k] - poligonoj.hatafkaq[k - 0o1]) * poligonoj.re[k]);
    const tutaArko = arkoj[vem2 - 0o1] + Math.max(0,
      poligonoj.hatafkaq[0] + DUOBLA_PI - poligonoj.hatafkaq[vem2 - 0o1]) * poligonoj.re[0];
    // ⟨ សាងសង់ជាបួនផ្នែក 🧱 ⟩ ៖ កំពូល , បន្ទះខាងក្រៅ , មុខចំហៀង , និងបាត ។ 📃 ⟩
    type P3 = [ number, number, number ];
    type UV = [ number, number ];
    const suprajPozicioj: number[] = [], suprajUV: number[] = [];
    const bordajPozicioj: number[] = [], bordajUV: number[] = [];
    const tri = ( pozicioj: number[], uv: number[], a: P3, b: P3, c: P3,
      ua: UV, ub: UV, uc: UV ): void => {
      pozicioj.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
      uv.push(ua[0], ua[1], ub[0], ub[1], uc[0], uc[1]);
    };
    const plana = ( p: P3 ): UV => [ p[0], p[2] ];
    const flanka = ( p: P3, arko: number ): UV => [ arko, p[1] ];
    const n2k = ( k: number, r: number, y: number ): P3 =>
      [ x + Math.cos(poligonoj.hatafkaq[k]) * r, y, z + Math.sin(poligonoj.hatafkaq[k]) * r ];
    const centroSupraP: P3 = [ x, plataAlto, z ];
    const centroBazo: P3 = [ x, centroMalsupra, z ];
    for ( let k = 0; k < vem2; k++ ) {
      const k2 = ( k + 1 ) % vem2;
      const arko2 = k2 === 0 ? tutaArko : arkoj[k2];
      const ena = n2k(k, poligonoj.rs[k], plataAlto);
      const ena2 = n2k(k2, poligonoj.rs[k2], plataAlto);
      const ekstera = n2k(k, poligonoj.re[k], plataAlto);
      const ekstera2 = n2k(k2, poligonoj.re[k2], plataAlto);
      const uEna = plana(ena), uEna2 = plana(ena2),
        uEkstera = plana(ekstera), uEkstera2 = plana(ekstera2);
      // ⟨ កំពូល ៖ កង្ហារពីកណ្តាល 📐 ⟩ ។
      tri(suprajPozicioj, suprajUV, centroSupraP, ena2, ena,
        plana(centroSupraP), uEna2, uEna);
      // ⟨ បន្ទះខាងក្រៅ ៖ ចិញ្ចៀនរាបនៅកម្រិតចាន 📐 ⟩ ។
      tri(bordajPozicioj, bordajUV, ena, ena2, ekstera2, uEna, uEna2, uEkstera2);
      tri(bordajPozicioj, bordajUV, ena, ekstera2, ekstera, uEna, uEkstera2, uEkstera);
      // ⟨ មុខចំហៀង ៖ ពីបាតដល់កំពូល 📐 ⟩ ។
      const kozuni = n2k(k, poligonoj.re[k], malsupraj[k]);
      const bazo2 = n2k(k2, poligonoj.re[k2], malsupraj[k2]);
      const ua = flanka(kozuni, arkoj[k]), ue = flanka(ekstera, arkoj[k]),
        ue2 = flanka(ekstera2, arko2), ub2 = flanka(bazo2, arko2);
      tri(bordajPozicioj, bordajUV, kozuni, ekstera, ekstera2, ua, ue, ue2);
      tri(bordajPozicioj, bordajUV, kozuni, ekstera2, bazo2, ua, ue2, ub2);
      // ⟨ បាត ៖ បិទប្រអប់ 📐 ⟩ ។
      tri(suprajPozicioj, suprajUV, centroBazo, kozuni, bazo2,
        plana(centroBazo), plana(kozuni), plana(bazo2));
    }
    // ⟨ វាយនភាពត្រឡប់មកវិញ 🪨 ⟩ ៖ មុននេះធរណីមាត្រមានតែ position និង normal , គ្មាន uv ។
    // សម្ភារៈមាន map , ដូច្នេះគ្រប់ចំណុចអាន uv ( 0 , 0 ) ហើយចានក្លាយជាពណ៌ប្រផេះរាប ។
    // ឥឡូវផ្ទៃរាបប្រើ uv តាម ( x , z ) ពិភពលោក ហើយមុខចំហៀងប្រើ uv តាមគែម និងកម្ពស់ ។ 📃 ⟩
    const alglui = ( pozicioj: number[], uv: number[],
      pukek: THREE.MeshStandardMaterial ): void => {
      if ( pozicioj.length < 0o11 ) return;
      const geometrio = new THREE.BufferGeometry();
      geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
      geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      geometrio.computeVertexNormals();
      bufroj.tlunakani(geometrio, pukek, new THREE.Matrix4());
    };
    alglui(suprajPozicioj, suprajUV, supraMaterialo);
    alglui(bordajPozicioj, bordajUV, bordaMaterialo);
  }
  bufroj.kunigi(qena, false);
}
