// ≺⧼ ការបង្កើតដី ⛰️ ⧽≻
// បង្កើតស្រទាប់ធម្មជាតិទាំងអស់ពីគ្រាប់ពូជតែមួយ ។ ធម្មជាតិនៅទីនេះ គឺ
// កម្ពស់ដី , គ្រាប់អាងទឹក , ជីវតំបន់ , តំបន់សត្វ និងប្រភពទឹក ។ ឯកសារ
// នេះសុទ្ធ ( គ្មាន DOM គ្មានផ្ទុកក្នុងម៉ាស៊ីន ) ដូច្នេះការធ្វើតេស្តខាងក្រៅ
// អាចនាំចូលបាន ។ ឧបករណ៍ឆ្លាក់ដីមិននាំចូលឯកសារនេះទេ ។
import { subSemo } from "./semo.js";
import type { AkvaFonto } from "./akvokalkulo.js";

// ⟨ ឆានែលគ្រាប់ពូជរង 📃 ⟩
// ឆានែលខុសគ្នា គឺស្ទ្រីមចៃដន្យខុសគ្នា ។ បន្ថែមឆានែលថ្មីនៅចុងបញ្ចប់ ។
const KANALO_KONTINENTO = 0o1;
const KANALO_MONTARO = 0o2;
const KANALO_HAKILOJ = 0o3;
const KANALO_ONDETOJ = 0o4;
const KANALO_PLANTOJ = 0o5;
const KANALO_BESTOJ = 0o10;
const KANALO_MONTARA_SEMO = 0o11;
const KANALO_KARAKTERO = 0o12;

// ⟨ ថេរិននៃរូបរាងដី 📃 ⟩
// លេខទាំងនេះកំណត់រូបរាងធម្មតារបស់ពិភពលោក ( ទ្វីប ភ្នំ តំបន់ទំនាប ) ។
const KONTINENTA_SKALO = 0o420;
const MONTARA_SKALO = 0o160;
const HAKILA_SKALO = 0o110;
const ONDETA_SKALO = 0o32;
const KONTINENTA_FORTO = 0o56;
const KONTINENTA_LEVIGXO = 0o2;
const MONTARA_FORTO = 0o44;
const HAKILA_FORTO = 0o14;
const ONDETA_FORTO = 0o10;

// ⟨ ព្រំដែននៃការវាស់វែងទ្វីប 📃 ⟩
// ពាក់កណ្តាលនៃតម្លៃទ្វីបកំណត់កម្រិតដី , ជាយខាងលើកំណត់ព្រំដែនភ្នំ ។
// ការវាស់តាមគ្រាប់ពូជនីមួយៗធានាថាគ្រប់ពិភពលោកមានទាំងភ្នំ និងទឹក ។
const KONTINENTA_MEDIANO = 0o1/0o2;
const MONTARA_KVANTILO = 0o70/0o100;
const MONTARA_SOJL_LO = 0o5/0o100;
const MONTARA_SOJL_HI = 0o10/0o100;
const KARAKTERA_BAZO = 0o7/0o10;
const KARAKTERA_VARIO = 0o6/0o10;

// ⟨ កម្រិតនៃជីវតំបន់ 📃 ⟩
// ជីវតំបន់ , ដូចលំនាំដើមនៃឧបករណ៍ឆ្លាក់ ( 1=ភ្នំ , 2=ជ្រលង , 3=វាលរាប ,
// 4=រុក្ខជាតិទឹក , 5=ហូសេថេល ) ។
const BIOMO_MONTARO = 0o1;
const BIOMO_VALO = 0o2;
const BIOMO_EBENAJXO = 0o3;
const BIOMO_AKVAJ_PLANTOJ = 0o4;
const BIOMO_EKVIZETO = 0o5;
export const BIOMA_MONTA_ALTO = 0o22;
export const BIOMA_VALA_ALTO = 0o4;

// ⟨ ប៊ីតតំបន់សត្វ 📃 ⟩
const BESTO_AKVA = 0o1;
const BESTO_PETRELA = 0o2;
const BESTO_NPC = 0o4;

// ⟨ ថេរិននៃប្រភពទឹក 📃 ⟩
const FONTA_MINIMUMA_ALTO = 0o20;
const FONTA_DISTANCO = 0o40;
const FONTA_KVANTO = 0o24;
const FONTA_FLUO = 0o20;

/*រូបរាងធម្មជាតិដែលបានបង្កើតពីគ្រាប់ពូជ
    @param alteco ( number , x, z ) - កម្ពស់ដីនៅចំណុច
    @param akvaMasko ( Uint8Array ) - គ្រាប់អាង ( ក្រឡាក្រោមកម្រិតទឹក , មួយក្នុងមួយអាង )
    @param biomoj ( Uint8Array ) - ជីវតំបន់ដែលបានគូរ
    @param bestoj ( Uint8Array ) - តំបន់សត្វជាប៊ីត
    @param fontoj ( AkvaFonto[] ) - ប្រភពទឹកនៅកំពូលភ្នំ
    @param montaraSemoBazo ( number ) - គ្រាប់ពូជនៃជួរភ្នំជុំវិញពិភពលោក */
export interface GeneritaTero {
  semo: number;
  alteco: ( x: number, z: number ) => number;
  akvaMasko: Uint8Array;
  biomoj: Uint8Array;
  bestoj: Uint8Array;
  fontoj: AkvaFonto[];
  montaraSemoBazo: number;
}

/*លាយលេខពីរទៅលេខចៃដន្យក្នុងចន្លោះ 0 ដល់ 1
    @param a,b ( number ) - លេខក្រឡាណាមួយ
    @param s ( number ) - គ្រាប់ពូជរង
@returns n ( number ) */
function miksu( a: number, b: number, s: number ): number {
  let n = ( Math.imul(a, 0x1B873593) ^ Math.imul(b, 0x27D4EB2D) ^ s ) | 0;
  n = Math.imul(n ^ ( n >>> 0o15 ), 0x85EBCA6B);
  return ( ( n ^ ( n >>> 0o13 ) ) >>> 0 ) / 0o40000000000;
}

/*សំឡេងតម្លៃរលូនក្នុងពីរវិមាត្រ
    @param x,z ( number ) - កូអរដោនេក្រឡា
    @param s ( number ) - គ្រាប់ពូជរង
@returns n ( number ) - 0 ដល់ 1 */
function bruo( x: number, z: number, s: number ): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const u = fx * fx * ( 3 - 2 * fx );
  const v = fz * fz * ( 3 - 2 * fz );
  const a = miksu(ix, iz, s);
  const b = miksu(ix + 1, iz, s);
  const c = miksu(ix, iz + 1, s);
  const d = miksu(ix + 1, iz + 1, s);
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

/*សំឡេងតម្លៃជាច្រើនជាន់ សម្រាប់រូបរាងស្មើ
    @param x,z ( number ) - កូអរដោនេដែលបានចែកស្កាលរួច
    @param oktoj ( number ) - ចំនួនជាន់
    @param s ( number ) - គ្រាប់ពូជរង
@returns n ( number ) - 0 ដល់ 1 */
function multoblaBruo( x: number, z: number, oktoj: number, s: number ): number {
  let sumo = 0, amplekso = 1, normo = 0, f = 1;
  for ( let i = 0; i < oktoj; i++ ) {
    sumo += amplekso * bruo(x * f, z * f, s + i * 0x51ED27);
    normo += amplekso;
    amplekso *= 0o1/0o2;
    f *= 0o2;
  }
  return sumo / normo;
}

/*សំឡេងតម្លៃកំពូលជាច្រើនជាន់ សម្រាប់ជួរភ្នំ
    @param x,z ( number ) - កូអរដោនេដែលបានចែកស្កាលរួច
    @param oktoj ( number ) - ចំនួនជាន់
    @param s ( number ) - គ្រាប់ពូជរង
@returns n ( number ) - 0 ដល់ 1 */
function kresto( x: number, z: number, oktoj: number, s: number ): number {
  let sumo = 0, amplekso = 1, normo = 0, f = 1;
  for ( let i = 0; i < oktoj; i++ ) {
    const n = bruo(x * f, z * f, s + i * 0x27D4EB2D);
    const k = 1 - Math.abs(2 * n - 1);
    sumo += k * k * amplekso;
    normo += amplekso;
    amplekso *= 0o1/0o2;
    f *= 0o2;
  }
  return sumo / normo;
}

/*ការលាយរលូនរវាងសូន្យ និងមួយ
    @param lo,hi ( number ) - ព្រំដែន
    @param v ( number ) - តម្លៃ
@returns t ( number ) - 0 ដល់ 1 */
function molaPaso( lo: number, hi: number, v: number ): number {
  const t = Math.max(0, Math.min(1, ( v - lo ) / ( hi - lo )));
  return t * t * ( 3 - 2 * t );
}

/*បង្កើតដីទាំងមូលពីគ្រាប់ពូជ
    @param semo ( number ) - លេខគ្រាប់ពូជមេ
    @param n ( number ) - ចំនួនក្រឡាក្នុងមួយជ្រុង
    @param paso ( number ) - ទំហំក្រឡា ( ឯកតាពិភពលោក )
    @param origino ( [ number , number ] ) - កូអរដោនេនៃក្រឡាទីសូន្យ
    @param nivelo ( number ) - កម្រិតទឹក
    @param enFormo ( ( x , z ) => boolean ) - តើចំណុចនៅក្នុងរូបរាងពិភពលោក
        Example. cxuEnFormo(mapo.formo, mapo.grandeco, x, z).
@returns tero ( GeneritaTero ) */
export function generiTeron(
  semo: number,
  n: number,
  paso: number,
  origino: [ number, number ],
  nivelo: number,
  enFormo: ( x: number, z: number ) => boolean,
): GeneritaTero {
  const sKontinento = subSemo(semo, KANALO_KONTINENTO);
  const sMontaro = subSemo(semo, KANALO_MONTARO);
  const sHakiloj = subSemo(semo, KANALO_HAKILOJ);
  const sOndetoj = subSemo(semo, KANALO_ONDETOJ);
  const sPlantoj = subSemo(semo, KANALO_PLANTOJ);
  const sBestoj = subSemo(semo, KANALO_BESTOJ);

  const N = n * n;
  const x0 = origino[0], z0 = origino[1];

  // ⟪ ការវាស់វែងទ្វីប 📃 ⟫
  // ប្រមូលតម្លៃទ្វីបនៅក្នុងរូបរាង រួចរកពាក់កណ្តាល និងជាយខាងលើ ។
  const kontinentoj: number[] = [];
  const ene = new Uint8Array(N);
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      const x = x0 + i * paso, z = z0 + j * paso;
      const id = j * n + i;
      const ena = enFormo(x, z);
      ene[id] = ena ? 1 : 0;
      if ( !ena ) continue;
      kontinentoj.push(multoblaBruo(x / KONTINENTA_SKALO, z / KONTINENTA_SKALO, 0o5, sKontinento));
    }
  }
  kontinentoj.sort(( a, b ) => a - b);
  const mezuroj = kontinentoj.length;
  const mediano = mezuroj > 0 ? kontinentoj[mezuroj >> 1] : KONTINENTA_MEDIANO;
  const sojlo = mezuroj > 0
    ? kontinentoj[Math.floor(mezuroj * MONTARA_KVANTILO)]
    : KONTINENTA_MEDIANO;
  const montoFaktoro = KARAKTERA_BAZO
    + ( subSemo(semo, KANALO_KARAKTERO) % 0o1000 ) / 0o1000 * KARAKTERA_VARIO;

  /*កម្ពស់ដីធម្មជាតិនៅចំណុចណាមួយ
      @param x,z ( number ) - កូអរដោនេពិភពលោក
  @returns y ( number ) - កម្ពស់ជាឯកតាពិភពលោក */
  function alteco( x: number, z: number ): number {
    const kontinento = multoblaBruo(x / KONTINENTA_SKALO, z / KONTINENTA_SKALO, 0o5, sKontinento);
    const montaro = kresto(x / MONTARA_SKALO, z / MONTARA_SKALO, 0o5, sMontaro);
    const hakiloj = multoblaBruo(x / HAKILA_SKALO, z / HAKILA_SKALO, 0o3, sHakiloj) - 0o1/0o2;
    const ondetoj = multoblaBruo(x / ONDETA_SKALO, z / ONDETA_SKALO, 0o4, sOndetoj) - 0o1/0o2;
    const bazo = ( kontinento - mediano ) * KONTINENTA_FORTO + KONTINENTA_LEVIGXO;
    const montaraMasko = molaPaso(sojlo - MONTARA_SOJL_LO, sojlo + MONTARA_SOJL_HI, kontinento);
    return bazo + montaro * montaro * MONTARA_FORTO * montaraMasko * montoFaktoro
      + hakiloj * HAKILA_FORTO + ondetoj * ONDETA_FORTO;
  }

  // ⟪ ក្រឡាកម្ពស់ 📃 ⟫
  const altoj = new Float32Array(N);
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      altoj[j * n + i] = alteco(x0 + i * paso, z0 + j * paso);
    }
  }

  // ⟪ គ្រាប់អាងទឹក 📃 ⟫
  // ក្រឡាក្រោមកម្រិតទឹកត្រូវការគ្រាប់តែមួយក្នុងមួយអាង ។ ជ្រើសក្រឡាដែល
  // គ្មានក្រឡាជិតខាងខាងឆ្វេង ឬខាងលើក្រោមកម្រិត ។ ក្រឡាខាងក្រៅ
  // រូបរាងរាប់ជាដីគោក ដើម្បីកុំឱ្យគ្រាប់ធ្លាក់ចេញពីរូបរាង ។
  const akvaMasko = new Uint8Array(N);
  const sub = ( i: number, j: number ): boolean =>
    i < 0 || j < 0 || i >= n || j >= n ? false : ene[j * n + i] === 1 && altoj[j * n + i] < nivelo;
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      const id = j * n + i;
      if ( !ene[id] || altoj[id] >= nivelo ) continue;
      if ( sub(i - 1, j) || sub(i, j - 1) ) continue;
      akvaMasko[id] = 1;
    }
  }

  // ⟪ ជីវតំបន់ 📃 ⟫
  const biomoj = new Uint8Array(N);
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      const id = j * n + i;
      if ( !ene[id] ) continue;
      const h = altoj[id];
      if ( h < nivelo ) {
        // ⟨ រុក្ខជាតិទឹក , ហូសេថេល 📃 ⟩
        biomoj[id] = bruo(x0 / 0o44 + i, z0 / 0o44 + j, sPlantoj) > 0o1/0o2
          ? BIOMO_AKVAJ_PLANTOJ : BIOMO_EKVIZETO;
        continue;
      }
      if ( h > BIOMA_MONTA_ALTO ) biomoj[id] = BIOMO_MONTARO;
      else if ( h > BIOMA_VALA_ALTO ) biomoj[id] = BIOMO_VALO;
      else biomoj[id] = BIOMO_EBENAJXO;
    }
  }

  // ⟪ តំបន់សត្វ 📃 ⟫
  // ប៊ីត 1=សត្វទឹក , 2=ផេត្រេល , 4=NPC ។ សត្វទឹកកាន់ក្រឡាជិតកម្រិតទឹក ,
  // ផេត្រេលកាន់ភ្នំ និងដីខ្ពស់ , NPC កាន់ដីរាប ។
  const bestoj = new Uint8Array(N);
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      const id = j * n + i;
      if ( !ene[id] ) continue;
      const h = altoj[id];
      if ( h < nivelo + 0o4/0o10 ) { bestoj[id] |= BESTO_AKVA; continue; }
      if ( bruo(i / 0o14, j / 0o14, sBestoj) > 0o70/0o100 ) bestoj[id] |= BESTO_PETRELA;
      const v = ( i > 0 && i < n - 1 ) ? i - 1 : i;
      const w = ( i > 0 && i < n - 1 ) ? i + 1 : i;
      const p = ( j > 0 && j < n - 1 ) ? j - 1 : j;
      const q = ( j > 0 && j < n - 1 ) ? j + 1 : j;
      const deklivo = Math.max(
        Math.abs(altoj[j * n + w] - altoj[j * n + v]),
        Math.abs(altoj[q * n + i] - altoj[p * n + i])) / ( 2 * paso );
      if ( deklivo < 0o30/0o100 && h > nivelo + 0o1 ) bestoj[id] |= BESTO_NPC;
    }
  }

  // ⟪ ប្រភពទឹក 📃 ⟫
  // ប្រភពនៅកំពូលក្នុងរូបរាង , ឆ្ងាយពីគ្នា ។ ទឹកហូរចុះពីពួកវា ។
  const kandidatoj: { id: number; h: number }[] = [];
  for ( let j = 1; j < n - 1; j++ ) {
    for ( let i = 1; i < n - 1; i++ ) {
      const id = j * n + i;
      if ( !ene[id] ) continue;
      const h = altoj[id];
      if ( h < FONTA_MINIMUMA_ALTO ) continue;
      let plej = h;
      for ( let dj = -1; dj <= 1; dj++ ) {
        for ( let di = -1; di <= 1; di++ ) {
          if ( di === 0 && dj === 0 ) continue;
          plej = Math.max(plej, altoj[( j + dj ) * n + i + di]);
        }
      }
      if ( h >= plej ) kandidatoj.push({ id, h });
    }
  }
  kandidatoj.sort(( a, b ) => b.h - a.h);
  const fontoj: AkvaFonto[] = [];
  for ( const k of kandidatoj ) {
    if ( fontoj.length >= FONTA_KVANTO ) break;
    const i = k.id % n, j = ( k.id - i ) / n;
    const x = x0 + i * paso, z = z0 + j * paso;
    let troProksima = false;
    for ( const f of fontoj ) {
      if ( Math.hypot(f.x - x, f.z - z) < FONTA_DISTANCO ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    fontoj.push({ x, z, fluo: FONTA_FLUO });
  }

  // ⟪ គ្រាប់ពូជជួរភ្នំ 📃 ⟩
  const semoBazo = subSemo(semo, KANALO_MONTARA_SEMO);
  const montaraSemoBazo = 0o123/0o100 + ( semoBazo % 0o4000 ) / 0o4000 * 0o100;

  return { semo, alteco, akvaMasko, biomoj, bestoj, fontoj, montaraSemoBazo };
}
