// ≺⧼ j͑ʃ'ɔ ſןᴜȝ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɭɜ ſɭ,w ⛰️ ⧽≻
// ɽ͑ʃ'w j͑ʃ'ᴜ ſɭɜ ſɭ,w ʌ ſɭɜ ſɭ,w , }ʃᴜ j͐ʃᴜ
// j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w , ſᶘᴜ j͑ʃᴜ ʌ ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ſɭ,w , j͑ʃɘɹ ʌ j͑ʃᴜ ʃɭ,ᴜ
// , ɭl̀ᴜ ſ͕ɭɜ ʌ ſɭɜ ſɭ,w , ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ſɭ,w . 
// ſ͕ɭᴜ ʌ ꞙɭɔ ( ꞙɭɔ ʌ DOM ) , }ʃᴜ j͐ʃᴜ ⟅
import { subSemo } from "./semo.js";
import { glata, glataPaso } from "../komunajxoj/interpolo.js";
import type { AkvaTsiq } from "./akvokalkulo.js";

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ 📃 ⟩
// ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭᴜ , ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſɭᴜ ı],ᴜ ſȷᴜ ı],ɹ ſ̀ȷw ⟅ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ꞙɭı ⟅
const KANALO_KONTINENTO = 0o1;
const KANALO_MONTARO = 0o2;
const KANALO_HAKILOJ = 0o3;
const KANALO_ONDETOJ = 0o4;
const KANALO_PLANTOJ = 0o5;
const KANALO_BESTOJ = 0o10;
const KANALO_MONTARA_SEMO = 0o11;
const KANALO_KARAKTERO = 0o12;

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭɜ ſɭ,w 📃 ⟩
// ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ ( ſɭɜ ſɭ,w , ɭl̀ᴜ ſ͕ɭɜ , j͐ʃɜ ɭʃᴜ , ᶅſɔ ɽ͑ʃ'ɔ ) ⟅
const KONTINENTA_SKALO = 0o420;
const MONTARA_SKALO = 0o160;
const HAKILA_SKALO = 0o110;
const ONDETA_SKALO = 0o32;
const KONTINENTA_FORTO = 0o56;
const KONTINENTA_LEVIGXO = 0o2;
const MONTARA_FORTO = 0o44;
const HAKILA_FORTO = 0o14;
const ONDETA_FORTO = 0o10;

// ⟨ j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w 📃 ⟩
// j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w ʌ ſɭɜ ſɭ,w , ɭl̀ᴜ ſ͕ɭɜ ʌ j͑ʃ'ɔ ŋᷠɹ ⟅
// ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſɭɜ ſɭ,w , }ʃᴜ j͐ʃᴜ ʌ ɭl̀ᴜ ſ͕ɭɜ , ſᶘᴜ j͑ʃᴜ ⟅
const KONTINENTA_MEDIANO = 0o1/0o2;
const MONTARA_KVANTILO = 0o70/0o100;
const MONTARA_SOJL_LO = 0o5/0o100;
const MONTARA_SOJL_HI = 0o10/0o100;
const KARAKTERA_BAZO = 0o7/0o10;
const KARAKTERA_VARIO = 0o6/0o10;

// ⟨ j͑ʃ'ɔ ŋᷠɹ ʌ j͑ʃɘɹ ʌ j͑ʃᴜ ʃɭ,ᴜ 📃 ⟩
// j͑ʃɘɹ ʌ j͑ʃᴜ ʃɭ,ᴜ ( ꞙɭı = ɭl̀ᴜ ſ͕ɭɜ , ꞙɭɿ = j͐ʃɜ ɭʃᴜ , ꞙɭц = ᶅſɔ ɽ͑ʃ'ɔ ,
// ꞙɭэ = ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ſɭ,w , ꞙɭꞟ = ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɹ ı],w ɽ͑ʃ'w ) ⟅
const BIOMO_MONTARO = 0o1;
const BIOMO_VALO = 0o2;
const BIOMO_EBENAJXO = 0o3;
const BIOMO_AKVAJ_PLANTOJ = 0o4;
const BIOMO_EKVIZETO = 0o5;
export const BIOMA_MONTA_ALTO = 0o22;
export const BIOMA_VALA_ALTO = 0o4;

// ⟨ ſɭɹ ſןᴜ ʌ ɭl̀ᴜ ſ͕ɭɜ 📃 ⟩
const BESTO_AKVA = 0o1;
const BESTO_PETRELA = 0o2;
const BESTO_NPC = 0o4;

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ſɭ,w 📃 ⟩
const FONTA_MINIMUMA_ALTO = 0o20;
const FONTA_DISTANCO = 0o40;
const FONTA_KVANTO = 0o24;
const FONTA_FLUO = 0o20;

/*ſɭɜ ſɭ,w ʌ ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ
    @param alteco ( number , x, z ) - j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w ʌ }ʃɹƽ
    @param akvaMasko ( Uint8Array ) - ſ͕ɭɜ ı],w ( ſɭɹ ſןᴜ ʌ ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɔ ŋᷠɹ )
    @param habs2 ( Uint8Array ) - j͑ʃɘɹ ʌ j͑ʃᴜ ʃɭ,ᴜ
    @param hapaga ( Uint8Array ) - ſɭɹ ſןᴜ ʌ ſɭɜ ſɭ,w ʌ ɭl̀ᴜ ſ͕ɭɜ
    @param hatsiq ( AkvaTsiq[] ) - ſᶘᴜ j͑ʃᴜ ʌ }ʃɹƽ ʌ ɭl̀ᴜ ſ͕ɭɜ
    @param montaraSemoBazo ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ɭl̀ᴜ ſ͕ɭɜ ʌ }ʃᴜ j͐ʃᴜ */
export interface GeneritaTero {
  semo: number;
  alteco: ( x: number, z: number ) => number;
  akvaMasko: Uint8Array;
  habs2: Uint8Array;
  hapaga: Uint8Array;
  hatsiq: AkvaTsiq[];
  montaraSemoBazo: number;
}

/*ſɭᴜ ſɭᴜ ꞙɭɿ }ʃɹƽ ⟅ ꞙɭı
    @param a,b ( number ) - ſɭɹ ſןᴜ ʌ }ʃɹƽ
    @param s ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſᶘɔ
@returns n ( number ) */
function miksu( a: number, b: number, s: number ): number {
  let n = ( Math.imul(a, 0x1B873593) ^ Math.imul(b, 0x27D4EB2D) ^ s ) | 0;
  n = Math.imul(n ^ ( n >>> 0o15 ), 0x85EBCA6B);
  return ( ( n ^ ( n >>> 0o13 ) ) >>> 0 ) / 0o40000000000;
}

/*ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃɹƽ ʌ ꞙɭɿ ʌ }ʃɹƽ
    @param x,z ( number ) - ſɭɹ ſןᴜ ʌ }ʃɹƽ
    @param s ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ }ʃɹƽ
@returns n ( number ) - ꞙɭɔ ⟅ ꞙɭı */
function famaf( x: number, z: number, s: number ): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const u = glata(fx);
  const v = glata(fz);
  const a = miksu(ix, iz, s);
  const b = miksu(ix + 1, iz, s);
  const c = miksu(ix, iz + 1, s);
  const d = miksu(ix + 1, iz + 1, s);
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

/*ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃɹƽ ʌ ɭl̀ᴜ ſ͕ɭɜ , ɭl̀ᴜ ſ͕ɭɜ ʌ j͐ʃэ ɭ(ᴜ
    @param x,z ( number ) - ſɭɹ ſןᴜ ʌ }ʃɹƽ ʌ ſןᴜ j͐ʃэ
    @param oktoj ( number ) - ſɭɹ ſןᴜ ʌ ɭl̀ᴜ ſ͕ɭɜ
    @param s ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ }ʃɹƽ
@returns n ( number ) - ꞙɭɔ ⟅ ꞙɭı */
function multoblaBruo( x: number, z: number, oktoj: number, s: number ): number {
  let tlunakani = 0, amplekso = 1, normo = 0, f = 1;
  for ( let i = 0; i < oktoj; i++ ) {
    tlunakani += amplekso * famaf(x * f, z * f, s + i * 0x51ED27);
    normo += amplekso;
    amplekso *= 0o1/0o2;
    f *= 0o2;
  }
  return tlunakani / normo;
}

/*ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ }ʃɹƽ ʌ ɭl̀ᴜ ſ͕ɭɜ , ɭl̀ᴜ ſ͕ɭɜ ʌ ɭl̀ᴜ ſ͕ɭɜ
    @param x,z ( number ) - ſɭɹ ſןᴜ ʌ }ʃɹƽ ʌ ſןᴜ j͐ʃэ
    @param oktoj ( number ) - ſɭɹ ſןᴜ ʌ ɭl̀ᴜ ſ͕ɭɜ
    @param s ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ }ʃɹƽ
@returns n ( number ) - ꞙɭɔ ⟅ ꞙɭı */
function kresto( x: number, z: number, oktoj: number, s: number ): number {
  let tlunakani = 0, amplekso = 1, normo = 0, f = 1;
  for ( let i = 0; i < oktoj; i++ ) {
    const n = famaf(x * f, z * f, s + i * 0x27D4EB2D);
    const k = 1 - Math.abs(2 * n - 1);
    tlunakani += k * k * amplekso;
    normo += amplekso;
    amplekso *= 0o1/0o2;
    f *= 0o2;
  }
  return tlunakani / normo;
}

/*ɽ͑ʃ'w j͑ʃ'ᴜ ſɭɜ ſɭ,w ʌ ſɭɜ ſɭ,w
    @param tk2ni ( number ) - ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ɭl̀ᴜ
    @param n ( number ) - ſɭɹ ſןᴜ ʌ ſɭᴜ
    @param vepat6ni ( number ) - ſןᴜ j͐ʃэ ʌ ſɭɹ ſןᴜ
    @param origino ( [ number , number ] ) - }ʃɹƽ ʌ ꞙɭɔ ſɭɹ ſןᴜ
    @param vem2 ( number ) - j͑ʃ'ɔ ŋᷠɹ ʌ ſᶘᴜ j͑ʃᴜ
    @param enQoxa ( ( x , z ) => boolean ) - }ʃɹƽ ʌ }ʃᴜ j͐ʃᴜ
        Example. bsej2kuqQoxa(mapo.qoxa, mapo.grandeco, x, z).
@returns tero ( GeneritaTero ) */
export function generiTeron(
  tk2ni: number,
  n: number,
  vepat6ni: number,
  origino: [ number, number ],
  vem2: number,
  enQoxa: ( x: number, z: number ) => boolean,
): GeneritaTero {
  const sKontinento = subSemo(tk2ni, KANALO_KONTINENTO);
  const sMontaro = subSemo(tk2ni, KANALO_MONTARO);
  const sHakiloj = subSemo(tk2ni, KANALO_HAKILOJ);
  const sOndetoj = subSemo(tk2ni, KANALO_ONDETOJ);
  const sPlantoj = subSemo(tk2ni, KANALO_PLANTOJ);
  const sHapaga = subSemo(tk2ni, KANALO_BESTOJ);

  const N = n * n;
  const x0 = origino[0], z0 = origino[1];

  // ⟪ j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w 📃 ⟫
  // j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w , ſɭɜ ſɭ,w ʌ j͑ʃ'ɔ ŋᷠɹ , ɭl̀ᴜ ſ͕ɭɜ ⟅
  const kontinentoj: number[] = [];
  const kontinentajValoroj = new Float64Array(N);
  const ene = new Uint8Array(N);
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
      const id = j * n + i;
      const ena = enQoxa(x, z);
      ene[id] = ena ? 1 : 0;
      if ( !ena ) continue;
      const kontinento = multoblaBruo(x / KONTINENTA_SKALO, z / KONTINENTA_SKALO, 0o5, sKontinento);
      kontinentajValoroj[id] = kontinento;
      kontinentoj.push(kontinento);
    }
  }
  kontinentoj.sort(( a, b ) => a - b);
  const havecax2l = kontinentoj.length;
  const mediano = havecax2l > 0 ? kontinentoj[havecax2l >> 1] : KONTINENTA_MEDIANO;
  const plosteq = havecax2l > 0
    ? kontinentoj[Math.floor(havecax2l * MONTARA_KVANTILO)]
    : KONTINENTA_MEDIANO;
  const montoFaktoro = KARAKTERA_BAZO
    + ( subSemo(tk2ni, KANALO_KARAKTERO) % 0o1000 ) / 0o1000 * KARAKTERA_VARIO;

  /*j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w ʌ j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w
      @param x,z ( number ) - }ʃɹƽ ʌ }ʃᴜ j͐ʃᴜ
      @param kontinento ( number ) - j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w ʌ }ʃɹƽ
  @returns y ( number ) - j͐ʃэ ɭ(ᴜ ʌ }ʃᴜ j͐ʃᴜ */
  function altecoElKontinento( x: number, z: number, kontinento: number ): number {
    const montaro = kresto(x / MONTARA_SKALO, z / MONTARA_SKALO, 0o5, sMontaro);
    const hakiloj = multoblaBruo(x / HAKILA_SKALO, z / HAKILA_SKALO, 0o3, sHakiloj) - 0o1/0o2;
    const ondetoj = multoblaBruo(x / ONDETA_SKALO, z / ONDETA_SKALO, 0o4, sOndetoj) - 0o1/0o2;
    const kozuni = ( kontinento - mediano ) * KONTINENTA_FORTO + KONTINENTA_LEVIGXO;
    const montaraMasko = glataPaso(plosteq - MONTARA_SOJL_LO, plosteq + MONTARA_SOJL_HI, kontinento);
    return kozuni + montaro * montaro * MONTARA_FORTO * montaraMasko * montoFaktoro
      + hakiloj * HAKILA_FORTO + ondetoj * ONDETA_FORTO;
  }

  /*j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w ʌ }ʃɹƽ ʌ ꞙɭı
      @param x,z ( number ) - }ʃɹƽ ʌ }ʃᴜ j͐ʃᴜ
  @returns y ( number ) - j͐ʃэ ɭ(ᴜ ʌ }ʃᴜ j͐ʃᴜ */
  function alteco( x: number, z: number ): number {
    const kontinento = multoblaBruo(x / KONTINENTA_SKALO, z / KONTINENTA_SKALO, 0o5, sKontinento);
    return altecoElKontinento(x, z, kontinento);
  }

  // ⟪ ſɭɹ ſןᴜ ʌ j͐ʃэ ɭ(ᴜ 📃 ⟫
  // ⟨ j͐ʃэ ɭ(ᴜ ʌ ſɭɜ ſɭ,w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ
  //   ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſɭɹ ſןᴜ 📃 ⟩
  const hal6da = new Float32Array(N);
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      const id = j * n + i;
      const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
      hal6da[id] = ene[id]
        ? altecoElKontinento(x, z, kontinentajValoroj[id])
        : alteco(x, z);
    }
  }

  // ⟪ ſ͕ɭɜ ı],w 📃 ⟫
  // ſɭɹ ſןᴜ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ſᶘᴜ j͑ʃᴜ , ſ͕ɭɜ ı],w ʌ ꞙɭı ⟅ ſɭɜ ʃɔ ſɭɹ ſןᴜ ʌ
  // ꞙɭɔ ſɭɹ ſןᴜ ʌ ſɭɹ ſןᴜ ʌ ſɟƨᴜ ŋᷠᴜ j͑ʃᴜꞇ ⟅ ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɔ ŋᷠɹ
  // ſɭɹ ſןᴜ ʌ ſɭɜ ſɭ,w , ꞙɭı ſ͕ɭɜ ı],w ʌ ſɭɜ ſɭ,w ⟅
  const akvaMasko = new Uint8Array(N);
  const sub = ( i: number, j: number ): boolean =>
    i < 0 || j < 0 || i >= n || j >= n ? false : ene[j * n + i] === 1 && hal6da[j * n + i] < vem2;
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      const id = j * n + i;
      if ( !ene[id] || hal6da[id] >= vem2 ) continue;
      if ( sub(i - 1, j) || sub(i, j - 1) ) continue;
      akvaMasko[id] = 1;
    }
  }

  // ⟪ j͑ʃɘɹ ʌ j͑ʃᴜ ʃɭ,ᴜ 📃 ⟫
  const habs2 = new Uint8Array(N);
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      const id = j * n + i;
      if ( !ene[id] ) continue;
      const h = hal6da[id];
      if ( h < vem2 ) {
        // ⟨ ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ſɭ,w , ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɹ ı],w ɽ͑ʃ'w 📃 ⟩
        habs2[id] = famaf(x0 / 0o44 + i, z0 / 0o44 + j, sPlantoj) > 0o1/0o2
          ? BIOMO_AKVAJ_PLANTOJ : BIOMO_EKVIZETO;
        continue;
      }
      if ( h > BIOMA_MONTA_ALTO ) habs2[id] = BIOMO_MONTARO;
      else if ( h > BIOMA_VALA_ALTO ) habs2[id] = BIOMO_VALO;
      else habs2[id] = BIOMO_EBENAJXO;
    }
  }

  // ⟪ ſɭɹ ſןᴜ ʌ ɭl̀ᴜ ſ͕ɭɜ 📃 ⟫
  // ꞙɭı = ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ſɭ,w , ꞙɭɿ = ɭl̀ᴜ ſ͕ɭɜ ʌ ſɭɜ ſɭ,w , ꞙɭэ = NPC ⟅ ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ſɭ,w , j͑ʃ'ɔ ŋᷠɹ ʌ ſᶘᴜ j͑ʃᴜ ,
  // ɭl̀ᴜ ſ͕ɭɜ ʌ ſɭɜ ſɭ,w , ɭl̀ᴜ ſ͕ɭɜ , NPC , ſɭɜ ſɭ,w ʌ ᶅſɔ ɽ͑ʃ'ɔ ⟅
  const hapaga = new Uint8Array(N);
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      const id = j * n + i;
      if ( !ene[id] ) continue;
      const h = hal6da[id];
      if ( h < vem2 + 0o4/0o10 ) { hapaga[id] |= BESTO_AKVA; continue; }
      if ( famaf(i / 0o14, j / 0o14, sHapaga) > 0o70/0o100 ) hapaga[id] |= BESTO_PETRELA;
      const v = ( i > 0 && i < n - 1 ) ? i - 1 : i;
      const w = ( i > 0 && i < n - 1 ) ? i + 1 : i;
      const p = ( j > 0 && j < n - 1 ) ? j - 1 : j;
      const q = ( j > 0 && j < n - 1 ) ? j + 1 : j;
      const haga = Math.max(
        Math.abs(hal6da[j * n + w] - hal6da[j * n + v]),
        Math.abs(hal6da[q * n + i] - hal6da[p * n + i])) / ( 2 * vepat6ni );
      if ( haga < 0o30/0o100 && h > vem2 + 0o1 ) hapaga[id] |= BESTO_NPC;
    }
  }

  // ⟪ ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ſɭ,w ʌ }ʃɹƽ 📃 ⟫
  // ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ſɭ,w ʌ ɭl̀ᴜ ſ͕ɭɜ , ſᶘᴜ j͑ʃᴜ ʌ j͐ʃᴜɔ˞ 📃 ⟩
  const kandidatoj: { id: number; h: number }[] = [];
  for ( let j = 1; j < n - 1; j++ ) {
    for ( let i = 1; i < n - 1; i++ ) {
      const id = j * n + i;
      if ( !ene[id] ) continue;
      const h = hal6da[id];
      if ( h < FONTA_MINIMUMA_ALTO ) continue;
      let plej = h;
      for ( let dj = -1; dj <= 1; dj++ ) {
        for ( let di = -1; di <= 1; di++ ) {
          if ( di === 0 && dj === 0 ) continue;
          plej = Math.max(plej, hal6da[( j + dj ) * n + i + di]);
        }
      }
      if ( h >= plej ) kandidatoj.push({ id, h });
    }
  }
  kandidatoj.sort(( a, b ) => b.h - a.h);
  const hatsiq: AkvaTsiq[] = [];
  for ( const k of kandidatoj ) {
    if ( hatsiq.length >= FONTA_KVANTO ) break;
    const i = k.id % n, j = ( k.id - i ) / n;
    const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
    let troProksima = false;
    for ( const f of hatsiq ) {
      if ( Math.hypot(f.x - x, f.z - z) < FONTA_DISTANCO ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    hatsiq.push({ x, z, fluo: FONTA_FLUO });
  }

  // ⟪ ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ɭl̀ᴜ ſ͕ɭɜ 📃 ⟫
  const semoBazo = subSemo(tk2ni, KANALO_MONTARA_SEMO);
  const montaraSemoBazo = 0o123/0o100 + ( semoBazo % 0o4000 ) / 0o4000 * 0o100;

  return { semo: tk2ni, alteco, akvaMasko, habs2, hapaga, hatsiq, montaraSemoBazo };
}
