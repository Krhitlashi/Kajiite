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

export interface Brako {
  ang: number;
  ux: number;
  uz: number;
  nx: number;
  nz: number;
  // ⟨ កន្លះទទឹងផ្លូវពិត 🛣️ ⟩ ៖ ចានត្រូវធំល្មមនឹងផ្លូវដែលចូលមក , មិនមែន
  // តាមតម្លៃថេរទេ ។ បើចានតូចជាងផ្លូវ , ស្មាងងឹតរបស់ផ្លូវលាតចេញហួសចាន ,
  // ហើយឃើញជាខ្សែងងឹតកាត់ចំណុចភ្ជាប់ ។ 📃 ⟩
  duono: number;
  // ⟨ កន្លះទទឹងរួមស្មា 📏 ⟩ ៖ កំពូលបូកស្មា ។
  ekstera: number;
}

// ⟪ មុំធម្មតា 📐 ⟫
/*នាំមុំទៅចន្លោះ 0 ដល់ 2π
    @param angulo ( number ) - មុំរ៉ាដ្យង់
@returns angulo ( number ) - មុំក្នុងចន្លោះ [ 0 , 2π ) */
function normAng(angulo: number): number {
  const r = angulo % DUOBLA_PI;
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
    @param direktoj ( [ number , number ] [ ] ) - ទិសដៅដៃ
@returns brakoj ( Brako [ ] ) - ដៃតម្រៀបតាមមុំ */
function brakojElDirektoj(direktoj: readonly [ number, number ][], duono: number): Brako[] {
  const rez: Brako[] = [];
  const ekstera = duono + VOJA_BORDA_LARĜO;
  for ( const [ dx, dz ] of direktoj ) {
    const longo = Math.hypot(dx, dz);
    if ( longo < ANGULA_TOLERO ) continue;
    const ux = dx / longo, uz = dz / longo;
    const ang = normAng(Math.atan2(uz, ux));
    if ( rez.some(b => samaAng(b.ang, ang)) ) continue;
    rez.push({ ang, ux, uz, nx: -uz, nz: ux, duono, ekstera });
  }
  rez.sort(( a, b ) => a.ang - b.ang);
  return rez;
}

// ⟪ ដៃពីការបិទជ្រុង 📏 ⟫
/*បង្កើតដៃពីព័ត៌មានបិទជ្រុង នៅពេលគ្មានទិសដៅពិត
    @param ferma ( [ number , number ] ) - ជ្រុងបិទ ( អ័ក្ស x និង z )
    @param rotacio ( number ) - មុំបង្វិលនៃចាន
@returns brakoj ( Brako [ ] ) - ដៃតាមអ័ក្ស */
function brakojElFermitaj(ferma: [ number, number ], rotacio: number, duono: number): Brako[] {
  const kos = Math.cos(rotacio), sin = Math.sin(rotacio);
  const lokaj: [ number, number ][] = [];
  if ( ferma[0] !== 1 ) lokaj.push([ 1, 0 ]);
  if ( ferma[0] !== -1 ) lokaj.push([ -1, 0 ]);
  if ( ferma[1] !== 1 ) lokaj.push([ 0, 1 ]);
  if ( ferma[1] !== -1 ) lokaj.push([ 0, -1 ]);
  return brakojElDirektoj(lokaj.map(([ lx, lz ]) =>
    [ kos * lx - sin * lz, sin * lx + kos * lz ] as [ number, number ]), duono);
}

// ⟪ កាំនៃបន្ទះផ្លូវ 📏 ⟫
/*រកចម្ងាយរហូតដល់គែមបន្ទះផ្លូវតាមមុំមួយ
    @param brako ( Brako ) - ដៃផ្លូវ
    @param duono ( number ) - កន្លះទទឹងបន្ទះ
    @param angulo ( number ) - មុំសម្រាប់ស្កេន
@returns radiuso ( number ) - ចម្ងាយតាមរង្វង់ , ឬ 0 បើខាងក្រោយ */
function bendoRadiuso(brako: Brako, duono: number, angulo: number): number {
  const rel = normAng(angulo - brako.ang);
  const laux = Math.cos(rel);
  if ( laux <= ANGULA_TOLERO ) return 0;
  const flanko = Math.abs(Math.sin(rel));
  const fino = VOJA_TRUA_DUONO / laux;
  const rando = flanko > ANGULA_TOLERO ? duono / flanko : Infinity;
  return Math.min(fino, rando);
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
    @param unua, dua ( Brako ) - ដៃជាប់គ្នា
    @param delta ( number ) - មុំរវាងដៃតាមទិសវិញ្ញាណ
@returns fileto ( Fileto | null ) - ធ្នូ , ឬ null បើជ្រុងចង្អៀតពេក */
function filetoPor(unua: Brako, dua: Brako, delta: number): Fileto | null {
  if ( delta >= Math.PI - ANGULA_TOLERO ) return null;
  const det = unua.ux * dua.uz - unua.uz * dua.ux;
  if ( det <= ANGULA_TOLERO ) return null;
  const cx = ( VOJA_TRUA_DUONO * dua.uz - unua.uz * VOJA_TRUA_DUONO ) / det;
  const cz = ( unua.ux * VOJA_TRUA_DUONO - VOJA_TRUA_DUONO * dua.ux ) / det;
  // ⟨ ចម្ងាយតាមណរម៉ាល់ 📏 ⟩ ៖ បើតូចជាងគែមខាងក្រៅ , ដៃទាំងពីរជាន់គ្នា ,
  // ដូច្នេះសហជីវនៃបន្ទះគ្របគ្រាន់ហើយ ។ ការបង្កើតធ្នូនៅទីនោះនឹងកាត់ចូលផ្លូវ ។ 📃 ⟩
  const t = ( cx - unua.ux * VOJA_TRUA_DUONO ) * unua.nx
    + ( cz - unua.uz * VOJA_TRUA_DUONO ) * unua.nz;
  if ( t <= unua.ekstera + ANGULA_TOLERO ) return null;
  const rTop = t - unua.duono;
  const rOut = t - unua.ekstera;
  if ( rTop <= ANGULA_TOLERO || rOut <= ANGULA_TOLERO ) return null;
  const p0x = unua.ux * VOJA_TRUA_DUONO + unua.nx * unua.duono;
  const p0z = unua.uz * VOJA_TRUA_DUONO + unua.nz * unua.duono;
  const p1x = dua.ux * VOJA_TRUA_DUONO - dua.nx * dua.duono;
  const p1z = dua.uz * VOJA_TRUA_DUONO - dua.nz * dua.duono;
  const phi0 = Math.atan2(p0z - cz, p0x - cx);
  const phi1 = Math.atan2(p1z - cz, p1x - cx);
  return { cx, cz, rTop, rOut, phi0, delta: angulaDiferenco(phi1, phi0) };
}

// ⟪ កាំនៃធ្នូ 📏 ⟫
/*រកចម្ងាយតាមរង្វង់ដល់ធ្នូ , បើកាំរង្វង់កាត់ធ្នូនោះ
    @param fileto ( Fileto ) - ធ្នូជ្រុង
    @param r ( number ) - កាំធ្នូ
    @param angulo ( number ) - មុំស្កេន
@returns radiuso ( number ) - ចម្ងាយ , ឬ 0 បើមិនប៉ះ */
function filetaRadiuso(fileto: Fileto, r: number, angulo: number): number {
  const kos = Math.cos(angulo), sin = Math.sin(angulo);
  const projekcio = fileto.cx * kos + fileto.cz * sin;
  const kvadrato = fileto.cx * fileto.cx + fileto.cz * fileto.cz - r * r;
  const diskriminanto = projekcio * projekcio - kvadrato;
  if ( diskriminanto < 0 ) return 0;
  const radiko = Math.sqrt(diskriminanto);
  // ⟨ កាត់ពីរចំណុច 📏 ⟩ ៖ ធ្នូបែរទៅរកជ្រុងខាងក្នុង , ដូច្នេះចំណុចជិតគឺជាគែមចាន ។
  // ចំណុចឆ្ងាយនៅខាងក្រៅធ្នូ , ដូច្នេះយកតែចំណុចដែលនៅលើធ្នូ ។ បើយកចំណុចឆ្ងាយ ,
  // ចាននឹងលាតហួសធ្នូ ឬគ្មានធ្នូទាល់តែសោះ , ហើយជ្រុងក្លាយជាស្រួច ។ 📃 ⟩
  for ( const lambda of [ projekcio - radiko, projekcio + radiko ] ) {
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
function kapoRadiuso(brakoj: readonly Brako[], angulo: number): number {
  let kapo = Infinity;
  for ( const brako of brakoj ) {
    const rel = normAng(angulo - brako.ang);
    const laux = Math.cos(rel);
    if ( laux <= ANGULA_TOLERO ) continue;
    const fino = VOJA_TRUA_DUONO / laux;
    const flanko = Math.abs(Math.sin(rel));
    const rando = flanko > ANGULA_TOLERO ? brako.ekstera / flanko : Infinity;
    if ( fino <= rando + ANGULA_TOLERO && fino < kapo ) kapo = fino;
  }
  return kapo;
}

// ⟪ កាំគែមខាងលើ និងខាងក្រៅ 📏 ⟫
function suproRadiuso(brakoj: readonly Brako[], fileto: Fileto | null, angulo: number): number {
  let r = VOJA_DIORITA_DUONO;
  for ( const brako of brakoj ) {
    r = Math.max(r, brako.duono);
    r = Math.max(r, bendoRadiuso(brako, brako.duono, angulo));
  }
  if ( fileto ) r = Math.max(r, filetaRadiuso(fileto, fileto.rTop, angulo));
  return r;
}

function eksteraRadiuso(brakoj: readonly Brako[], fileto: Fileto | null, angulo: number): number {
  let r = VOJA_EKSTERA_DUONO;
  for ( const brako of brakoj ) {
    r = Math.max(r, brako.ekstera);
    r = Math.max(r, bendoRadiuso(brako, brako.ekstera, angulo));
  }
  if ( fileto ) r = Math.max(r, filetaRadiuso(fileto, fileto.rOut, angulo));
  return r;
}

// ⟪ គំរូមុំក្នុងចន្លោះ 📐 ⟫
/*បង្កើតបញ្ជីមុំគំរូរវាងមុំពីរ , ដោយរួមមុំបំបែកទាំងអស់
    @param a0, a1 ( number ) - មុំដើម និងចុង ( a1 > a0 )
    @param rompoj ( number [ ] ) - មុំដែលគែមប្តូរទម្រង់
@returns anguloj ( number [ ] ) - មុំគំរូតាមលំដាប់ */
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
    @param direktoj ( [ number , number ] [ ] ) - ទិសដៅដៃពិត
    @param ferma ( [ number , number ] | undefined ) - ជ្រុងបិទ
    @param rotacio ( number ) - មុំបង្វិលនៃចាន
@returns brakoj ( Brako [ ] ) - ដៃតម្រៀបតាមមុំ */
export function kreiBrakojn(direktoj: readonly [ number, number ][],
  ferma: [ number, number ] | undefined, rotacio: number,
  duono: number = VOJA_DIORITA_DUONO): Brako[] {
  const brakoj = brakojElDirektoj(direktoj, duono);
  if ( brakoj.length ) return brakoj;
  // ⟨ គ្មានព័ត៌មានដៃ 📃 ⟩ ៖ បើគ្មានទិសដៃ និងគ្មានការបិទជ្រុង ( ឧ. ចំណុចក្រឡាដែលការបិទ
  // ត្រូវលុប ព្រោះផ្លូវភ្ជាប់មកដល់ ) សន្មតជាប្រសព្វបួនជ្រុង ។ ចានមូលតូចមិនគ្រប់ទេ ,
  // ព្រោះផ្លូវកាត់រន្ធនៅ VOJA_TRUA_DUONO , ដូច្នេះរន្ធរង្វង់នៅមាត់ផ្លូវនឹងនៅទទេ ។ 📃 ⟩
  return brakojElFermitaj(ferma ?? [ 0, 0 ], rotacio, duono);
}

// ⟪ ពហុកោណចានភ្ជាប់ 🔲 ⟫
export interface PlatajPoligonoj {
  supraj: [ number, number ][];
  bandoj: [ number, number ][][];
  // ⟨ មុំ និងកាំនៃគែមកំពូល តាមលំដាប់ដូច `supraj` ។ ចានមិនរាបស្មើទេ ,
  // ដូច្នេះកម្ពស់ត្រូវគណនាតាមមុំនៃចំណុចនីមួយៗ ។ 📃 ⟩
  anguloj: number[];
  rs: number[];
  re: number[];
}

/*សាងសង់ពហុកោណកំពូល និងបន្ទះគែមរបស់ចានភ្ជាប់
    @param brakoj ( readonly Brako [ ] ) - ដៃរបស់ចាន
@returns poligonoj ( PlatajPoligonoj ) - ពហុកោណក្នុងកូអរដោនេមូលដ្ឋាន */
export function kreiPlatajnPoligonojn(brakoj: readonly Brako[]): PlatajPoligonoj {
  // ⟨ មុំបំបែក 📐 ⟩ ៖ មុំដែលគែមបន្ទះប្តូរពីមាត់ទៅចំហៀង ។
  const rompoj: number[] = [];
  for ( const brako of brakoj ) {
    for ( const duono of [ brako.duono, brako.ekstera ] ) {
      const ofseto = Math.atan(duono / VOJA_TRUA_DUONO);
      rompoj.push(normAng(brako.ang + ofseto), normAng(brako.ang - ofseto));
    }
  }
  const n = brakoj.length;
  const supraj: [ number, number ][] = [];
  const bandoj: [ number, number ][][] = [];
  const anguloj: number[] = [];
  const rsListo: number[] = [];
  const reListo: number[] = [];
  for ( let i = 0; i < n; i++ ) {
    const a0 = brakoj[i].ang;
    const a1 = i + 1 < n ? brakoj[i + 1].ang : brakoj[0].ang + DUOBLA_PI;
    const delta = a1 - a0;
    const fileto = filetoPor(brakoj[i], brakoj[( i + 1 ) % n], delta);
    const angulojGapListo = angulojGap(a0, a1, rompoj);
    const suprajGap: [ number, number ][] = [];
    const bendoGap: { rs: number; re: number; kos: number; sin: number; angulo: number }[] = [];
    for ( const angulo of angulojGapListo ) {
      // ⟨ កាត់តាមមាត់ផ្លូវ 📏 ⟩ ៖ គែមក្រៅមិនលាតហួសបន្ទាត់កាត់ផ្លូវទេ ។
      // កំពូលក៏កាត់ដែរ , ព្រោះជ្រុងផ្លូវមួយចូលក្នុងបន្ទះផ្លូវផ្សេងនៅមុំទ្រេត ។ 📃 ⟩
      const limito = Math.min(eksteraRadiuso(brakoj, fileto, angulo),
        kapoRadiuso(brakoj, angulo));
      const rs = Math.min(suproRadiuso(brakoj, fileto, angulo), limito);
      const re = limito;
      const kos = Math.cos(angulo), sin = Math.sin(angulo);
      suprajGap.push([ kos * rs, sin * rs ]);
      bendoGap.push({ rs, re, kos, sin, angulo });
    }
    for ( let j = 0; j < suprajGap.length; j++ ) {
      if ( i > 0 && j === 0 ) continue;
      if ( i + 1 === n && j === suprajGap.length - 1 ) continue;
      supraj.push(suprajGap[j]);
      anguloj.push(bendoGap[j].angulo);
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
      let fino = j;
      while ( fino + 1 < bendoGap.length && larghaj[fino + 1] ) fino++;
      const unua = Math.max(0, j - 1);
      const lasta = Math.min(bendoGap.length - 1, fino + 1);
      j = fino + 1;
      if ( lasta - unua < 2 ) continue;
      const eksteraj: [ number, number ][] = [];
      const internaj: [ number, number ][] = [];
      for ( let k = unua; k <= lasta; k++ ) {
        const b = bendoGap[k];
        eksteraj.push([ b.kos * b.re, b.sin * b.re ]);
        internaj.push([ b.kos * b.rs, b.sin * b.rs ]);
      }
      bandoj.push([ ...eksteraj, ...internaj.slice(1, -1).reverse() ]);
    }
  }
  return { supraj, bandoj, anguloj, rs: rsListo, re: reListo };
}

// ⟪ កម្រិតចានភ្ជាប់ពីដៃ 📏 ⟫
/*គណនាកម្រិតកំពូលចានភ្ជាប់ពីដៃដែលបានដោះស្រាយរួច ។ ផ្លូវ និងចានត្រូវប្រើ
   អនុគមន៍នេះដូចគ្នា ។ បើផ្លូវអានពីទិសដៃឆៅ ហើយចានអានពីដៃសំយោគ ( ពេលទិសដៃទទេ ) ,
   កម្រិតខុសគ្នាមួយជំហាន , ហើយឃើញជាជញ្ជាំងឈរ ។
    @param x, z ( number ) - ពិភពលោក
    @param brakoj ( readonly Brako [ ] ) - ដៃចាន
    @param heightFn ( function ) - កម្ពស់វាល
@returns supro ( number ) - កម្រិតកំពូលដែលបានបង្គត់ទៅក្រឡាជំហាន */
export function kunigaPlataAlto(x: number, z: number, brakoj: readonly Brako[],
  heightFn: ( x: number, z: number ) => number): number {
  const direktoj = brakoj.map(b => [ b.ux, b.uz ] as [ number, number ]);
  // ⟨ កាំអានកម្រិតនៅតែថេរ 📏 ⟩ ៖ ទទឹងចានធំជាងមុន , តែកាំអានកម្រិតមិនប្តូរទេ ។
  // ការប្តូរកាំនឹងប្តូរកម្ពស់ផ្លូវទាំងអស់ , ដែលជាការប្តូរធំហួសពីបញ្ហាគែមចាន ។ 📃 ⟩
  // ⟨ លុបការបង្គត់ឡើងក្រោយ 📃 ⟩ ៖ កម្រិតកំពូលមានរួចជា VOJA_SUPRO_LEVIGXO ,
  // ដូច្នេះបង្គត់លើ `maks` ជាកម្រិតដែលចានអាន ។ 📃 ⟩
  // ⟨ មាត់ចានក៏ជាដី 📏 ⟩ ៖ vojaSuproDeKunigo អានត្រឹមកាំ VOJA_EKSTERA_DUONO ,
  // តែផ្លូវចាប់ផ្តើមនៅ VOJA_TRUA_DUONO ។ នៅជម្រាល ដីនៅមាត់ខ្ពស់ជាងដី
  // កណ្តាលច្រើន , ដូច្នេះចានទាបពេក ហើយផ្លូវដែលមិនកប់ត្រូវលោតឡើងភ្លាមៗ
  // ពីចាន = ជញ្ជាំងឈរ ។ អានកម្ពស់ដីនៅមាត់ដៃនីមួយៗ ហើយយកខ្ពស់បំផុត ។
  // អ្នកគណនាចាន អ្នកគណនាផ្លូវ និងឧបករណ៍វាស់ ទាំងអស់ហៅអនុគមន៍តែមួយនេះ ។ 📃 ⟩
  const randaj = kunigajBrakAltoj(x, z, direktoj, brakoj.map(b => b.duono), heightFn)
    .filter(Number.isFinite);
  const randaSupro = randaj.length ? Math.max(...randaj) : -Infinity;
  return Math.max(
    surGrid(vojaSuproDeKunigo(x, z, direktoj, VOJA_EKSTERA_DUONO, heightFn).supro
      - VOJA_SUPRO_LEVIGXO),
    randaSupro );
}

// ⟪ កម្រិតចានតាមដៃ 📏 ⟫
// ⟨ ចានមួយ កម្ពស់ច្រើន 📃 ⟩ ៖ ចានមិនមានកម្ពស់តែមួយទេ ។ ដៃនីមួយៗមកពីដីរៀងខ្លួន ,
// ដូច្នេះមាត់ដៃមានកម្រិតផ្លូវរៀងខ្លួន ។ ការអានវាលនៅមាត់ដៃត្រឡប់កម្រិតមាត់នោះ ,
// ព្រោះវាលបង្កប់កម្រិតចានតាមទិសរួចហើយ ។ 📃 ⟩
export function kunigaPlataNivelo(x: number, z: number, brakoj: readonly Brako[],
  heightFn: ( x: number, z: number ) => number): PlataNivelo {
  const direktoj = brakoj.map(b => [ b.ux, b.uz ] as [ number, number ]);
  const duonoj = brakoj.map(b => b.duono);
  const altoj = kunigajBrakAltoj(x, z, direktoj, duonoj, heightFn)
    .map(alto => Number.isFinite(alto) ? alto : NaN);
  const fallback = kunigaPlataAlto(x, z, brakoj, heightFn);
  return kreiPlataNivelon(direktoj, duonoj, altoj, fallback);
}

export function konstruiIntersekcajnPlatojn(sceno: THREE.Scene,
  punktoj: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  fermitaj: Map<string, [ number, number ]> = new Map(),
  rotacioj: Map<string, number> = new Map(),
  direktoj: Map<string, [ number, number ][]> = new Map(),
  grundoFn: ( x: number, z: number ) => number = heightFn,
  duonoj: Map<string, number> = new Map()
): void {
  if ( punktoj.length === 0 ) return;
  // ⟨ លំដាប់ជម្រៅ 📏 ⟩ ៖ ស្មាងងឹត ( borda ) មិនត្រូវគូរលើកំពូលភ្លឺរបស់ផ្លូវទេ ។
  //   ពីមុនស្មាចាននៅ (-4,-5) ជិតជាងកំពូលផ្លូវ (-2,-4) , ដូច្នេះនៅកន្លែងជាន់គ្នា
  //   ស្មាងងឹតឈ្នះ ហើយលេចជាខ្សែងងឹតកាត់ផ្លូវ ។ ឥឡូវស្មាចាននៅក្រោយកំពូលទាំងពីរ ។ 📃 ⟩
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -3, -2, -1, -3);
  const bufroj = kreiGeometriajnBufrojn();
  for ( const [ x, z ] of punktoj ) {
    const klavo = x + "," + z;
    const brakoj = kreiBrakojn(direktoj.get(klavo) ?? [], fermitaj.get(klavo),
      rotacioj.get(klavo) ?? 0, duonoj.get(klavo) ?? VOJA_DIORITA_DUONO);
    // ⟪ ចានរាបតែមួយកម្រិត 📏 ⟫
    // ⟨ កម្ពស់មកពីផ្លូវពិត 📃 ⟩ ៖ konstruiVojojn បានតាមដានកម្ពស់ផ្លូវតាមដៃ
    // នីមួយៗ ហើយជ្រើសកម្រិតចានពីដៃទាបបំផុត ។ ចានទាំងមូលរាបស្មើនៅកម្រិត
    // នោះ , គ្មានកង្ហារជម្រាល , គ្មានស្នាមកាត់កណ្តាល , គ្មានជ្រុងលើក ។
    // ផ្លូវខ្ពស់ៗឡើងជាជំហានពីចានទៅរកកម្រិតរបស់វា ។ 📃 ⟩
    const reg = kunigajNiveloj.get(klavo);
    const plataAlto = reg ? reg.alto
      : surGrid(kunigaPlataNivelo(x, z, brakoj, heightFn).alto);
    const poligonoj = kreiPlatajnPoligonojn(brakoj);
    const kvanto = poligonoj.supraj.length;
    if ( kvanto < 3 ) continue;
    const eksterajPozicioj: [ number, number ][] = poligonoj.anguloj.map((angulo, k) =>
      [ Math.cos(angulo) * poligonoj.re[k], Math.sin(angulo) * poligonoj.re[k] ]);
    // ⟨ បាតតាមដី 📏 ⟩ ៖ ចានជាបន្ទះស្តើងដែលតាមដី , មិនមែនប្លុកថ្មខ្ពស់ ។
    // បាតអានដីត្រង់កាំខាងក្រៅ ( ជាកន្លែងដែលមុខចំហៀងឈរ ) មិនមែនកាំខាងក្នុង ។ 📃 ⟩
    const malsupraj = eksterajPozicioj.map(p =>
      Math.min(plataAlto, grundoFn(x + p[0], z + p[1])) - ANGULA_PROVOLIRO);
    const centroMalsupra = Math.min(plataAlto - ANGULA_PROVOLIRO, ...malsupraj);
    // ⟨ បណ្តោយគែមសម្រាប់ uv 📏 ⟩ ៖ មុខចំហៀងជាជញ្ជាំងឈរ ។ បើ uv តាម ( x , z ) ,
    // វាយនភាពលាតជាបន្ទាត់មួយ ។ ដូច្នេះមុខចំហៀងប្រើ ( បណ្តោយគែម , កម្ពស់ ) ។ 📃 ⟩
    const arkoj: number[] = [ 0 ];
    for ( let k = 1; k < kvanto; k++ )
      arkoj.push(arkoj[k - 0o1] + Math.max(0,
        poligonoj.anguloj[k] - poligonoj.anguloj[k - 0o1]) * poligonoj.re[k]);
    const tutaArko = arkoj[kvanto - 0o1] + Math.max(0,
      poligonoj.anguloj[0] + DUOBLA_PI - poligonoj.anguloj[kvanto - 0o1]) * poligonoj.re[0];
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
    const punkto = ( k: number, r: number, y: number ): P3 =>
      [ x + Math.cos(poligonoj.anguloj[k]) * r, y, z + Math.sin(poligonoj.anguloj[k]) * r ];
    const centroSupraP: P3 = [ x, plataAlto, z ];
    const centroBazo: P3 = [ x, centroMalsupra, z ];
    for ( let k = 0; k < kvanto; k++ ) {
      const k2 = ( k + 1 ) % kvanto;
      const arko2 = k2 === 0 ? tutaArko : arkoj[k2];
      const ena = punkto(k, poligonoj.rs[k], plataAlto);
      const ena2 = punkto(k2, poligonoj.rs[k2], plataAlto);
      const ekstera = punkto(k, poligonoj.re[k], plataAlto);
      const ekstera2 = punkto(k2, poligonoj.re[k2], plataAlto);
      const uEna = plana(ena), uEna2 = plana(ena2),
        uEkstera = plana(ekstera), uEkstera2 = plana(ekstera2);
      // ⟨ កំពូល ៖ កង្ហារពីកណ្តាល 📐 ⟩ ។
      tri(suprajPozicioj, suprajUV, centroSupraP, ena2, ena,
        plana(centroSupraP), uEna2, uEna);
      // ⟨ បន្ទះខាងក្រៅ ៖ ចិញ្ចៀនរាបនៅកម្រិតចាន 📐 ⟩ ។
      tri(bordajPozicioj, bordajUV, ena, ena2, ekstera2, uEna, uEna2, uEkstera2);
      tri(bordajPozicioj, bordajUV, ena, ekstera2, ekstera, uEna, uEkstera2, uEkstera);
      // ⟨ មុខចំហៀង ៖ ពីបាតដល់កំពូល 📐 ⟩ ។
      const bazo = punkto(k, poligonoj.re[k], malsupraj[k]);
      const bazo2 = punkto(k2, poligonoj.re[k2], malsupraj[k2]);
      const ua = flanka(bazo, arkoj[k]), ue = flanka(ekstera, arkoj[k]),
        ue2 = flanka(ekstera2, arko2), ub2 = flanka(bazo2, arko2);
      tri(bordajPozicioj, bordajUV, bazo, ekstera, ekstera2, ua, ue, ue2);
      tri(bordajPozicioj, bordajUV, bazo, ekstera2, bazo2, ua, ue2, ub2);
      // ⟨ បាត ៖ បិទប្រអប់ 📐 ⟩ ។
      tri(suprajPozicioj, suprajUV, centroBazo, bazo, bazo2,
        plana(centroBazo), plana(bazo), plana(bazo2));
    }
    // ⟨ វាយនភាពត្រឡប់មកវិញ 🪨 ⟩ ៖ មុននេះធរណីមាត្រមានតែ position និង normal , គ្មាន uv ។
    // សម្ភារៈមាន map , ដូច្នេះគ្រប់ចំណុចអាន uv ( 0 , 0 ) ហើយចានក្លាយជាពណ៌ប្រផេះរាប ។
    // ឥឡូវផ្ទៃរាបប្រើ uv តាម ( x , z ) ពិភពលោក ហើយមុខចំហៀងប្រើ uv តាមគែម និងកម្ពស់ ។ 📃 ⟩
    const alglui = ( pozicioj: number[], uv: number[],
      materialo: THREE.MeshStandardMaterial ): void => {
      if ( pozicioj.length < 0o11 ) return;
      const geometrio = new THREE.BufferGeometry();
      geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
      geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      geometrio.computeVertexNormals();
      bufroj.aldoni(geometrio, materialo, new THREE.Matrix4());
    };
    alglui(suprajPozicioj, suprajUV, supraMaterialo);
    alglui(bordajPozicioj, bordajUV, bordaMaterialo);
  }
  bufroj.kunigi(sceno, false);
}
