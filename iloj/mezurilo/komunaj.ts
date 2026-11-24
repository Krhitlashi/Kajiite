// ≺⧼ j͑ʃᴜ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ ʌ ſȷɔ ſɭ,ꞇ ꞁȷ̀ᴜ }ʃꞇ 🧪 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ꞙɭɿ , 📃 ⟩
import * as THREE from "three";
import { alteco, akvaVem2 } from "../../kantaoj/mondo/tereno.js";
import { aktivajHak6h6, aktivajHaqakaj2, aktivajHakaxte } from "../../kantaoj/tero-datumaro/rultempo.js";
import { vepaqKradanKaxten } from "../../kantaoj/mondo/kaxte/krada-kaxte.js";
import type { SkulptaK6h6 } from "../../kantaoj/mondo/kaxte/hahunaq.js";
import { gluiK6h6Finon } from "../../eskekoj/medio/hak6h6/gluado.js";
import { troviK6h6RetajnHaveb6kekn, kunigajBrakojElHak6h6, type K6h6RetoVeb6kek,
  type K6h6RetoK6h6 } from "../../eskekoj/medio/voj-reto.js";
import type { K6h6Punkto } from "../../eskekoj/medio/voj-reto/hahunaq.js";
import { kf2BazanK6h6Alton, kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { kf2NivelanProfilon, type NivelaVeb6kek,
  type NivelaProfilo } from "../../eskekoj/medio/hak6h6/havem2.js";
import { k6h6Supro as k6h6SuproBaza, k6h6SuproDeVeb6kek } from "../../eskekoj/medio/hak6h6/haqoxa.js";
import { kf2Brakojn, kunigaPlataAlto, kunigaPlataVem2 } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { plataAltoDeVeb6kek } from "../../eskekoj/medio/hak6h6/kunig-havem2.js";
import { kf2KuhalPukek } from "../../eskekoj/komunajxoj/materialoj.js";
import { VOJA_AKVA_KLARANCO, VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO,
  KORNA_R, surGrid, k6h6LarghoDuono } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { type PlataVem2 } from "../../eskekoj/medio/hak6h6/haqoxa.js";

// ⟪ ſᶘᴜ j͑ʃᴜ , 📏 ⟫
// ⟨ ſᶘᴜ j͑ʃᴜ , ſɭɜ ſɭ,w , 📃 ⟩
// ⟨ ſɭɜ ſɭ,w , 📏 ⟩ , ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
// ſɭэ ֭ſɭэ , ꞙɭц ,
// ſɭэ ֭ſɭэ , ꞙɭэ , 📃 ⟩
export function tsekeVeraAkvo( x: number, z: number ): boolean {
  return alteco(x, z) < akvaVem2(x, z) - 0o1/0o200;
}

// ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭɩ , 📃 ⟩
export function akvaFino( x: number, z: number ): number {
  return tsekeVeraAkvo(x, z) ? akvaVem2(x, z) + VOJA_AKVA_KLARANCO : -Infinity;
}

// ⟪ ſɭэ ֭ſɭэ , 📏 ⟫
// ⟨ ſɭэ ֭ſɭэ , ꞙɭɩ , 📃 ⟩
export function k6h6Supro( x: number, z: number, sefini: number ): number {
  return k6h6SuproBaza(x, z, sefini, alteco);
}

/* ſɭэ ֭ſɭэ , ꞙɭı ,
@param x, z ( number ) - }ʃɹƽ ʌ ſ̀ȷᴜ ſɭᴜƽ ʌ ſɭэ ֭ſɭэ
@param sefini ( number ) - j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſɭэ ֭ſɭэ
@param haveb6kek ( [ number , number ] [ ] ) - }ʃɹƽ ʌ ſɟɹƽ
@returns teru ( number ) - j͐ʃэ ɭ(ᴜ ʌ j͑ʃɜ ſɭ,ᴜ ʌ ſɭэ ֭ſɭэ */
export function pontaFinAlto( x: number, z: number, sefini: number,
  haveb6kek: readonly { x: number; z: number; direktaj: [ number, number ][] }[] ): number {
  let plejProksima: { x: number; z: number; direktaj: [ number, number ][] } | null = null;
  let plejMallonga = Infinity;
  for ( const k of haveb6kek ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < plejMallonga ) { plejMallonga = d; plejProksima = k; }
  }
  if ( plejProksima && plejMallonga < VOJA_EKSTERA_DUONO + KORNA_R )
    return k6h6SuproDeVeb6kek(plejProksima.x, plejProksima.z, plejProksima.direktaj,
      VOJA_EKSTERA_DUONO, alteco).hateru;
  return k6h6Supro(x, z, sefini);
}

// ⟪ ſɭэ ſɭw , 🌍 ⟫
// ⟨ ſɭэ ſɭw , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɩ , 📃 ⟩
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
export interface KunigajMapoj {
  fermitaj: Map<string, [ number, number ]>;
  rotacioj: Map<string, number>;
  hac2w2q: Map<string, [ number, number ][]>;
  hap2somani: Map<string, number>;
}

export interface MezuraMondo {
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , 📃 ⟩
  qena: THREE.Scene;
// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , 📃 ⟩
  hak6h6: SkulptaK6h6[];
// ⟨ ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , 📃 ⟩
  gluitaj: K6h6Punkto[][];
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
  haveb6kek: K6h6RetoVeb6kek[];
  kunigajPunktoj: [ number, number ][];
// ⟨ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
  ankroj: NivelaVeb6kek[];
// ⟨ ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
  k6h6Alteco: ( x: number, z: number ) => number;
  bazaK6h6Alteco: ( x: number, z: number ) => number;
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɩ , 📃 ⟩
  pa12Cxe: ( x: number, z: number ) => number;
// ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ֭ſɭэ , 📃 ⟩
  larghoDe: ( i: number ) => number;
// ⟨ ſɭэ ֭ſɭэ , ꞙɭɿ , 📃 ⟩
  profiloDe: ( i: number ) => NivelaProfilo;
// ⟨ ſɭᴜ ſןᴜ , ꞙɭꞟ , 📃 ⟩
  mapoj: KunigajMapoj;
}

// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
function kf2PlatanFunkcion(
  k6h6Alteco: ( x: number, z: number ) => number,
  mapoj: KunigajMapoj
): { pa12Cxe: ( x: number, z: number ) => number;
  vem2Cxe: ( x: number, z: number ) => PlataVem2 } {
  const memoro = new Map<string, PlataVem2>();
  const vem2Cxe = ( x: number, z: number ): PlataVem2 => {
    const ca3aq = x + "," + z;
    let vem2 = memoro.get(ca3aq);
    if ( vem2 === undefined ) {
      const knece = kf2Brakojn(mapoj.hac2w2q.get(ca3aq) ?? [],
        mapoj.fermitaj.get(ca3aq), mapoj.rotacioj.get(ca3aq) ?? 0,
        mapoj.hap2somani.get(ca3aq));
      vem2 = kunigaPlataVem2(x, z, knece, k6h6Alteco);
      memoro.set(ca3aq, vem2);
    }
    return vem2;
  };
// ⟨ j͑ʃᴜ ſɭ,w , ſɭᴜ ſןᴜ , 📏 ⟩
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
  const pa12Cxe = ( x: number, z: number ): number => {
    const ca3aq = x + "," + z;
    const registrita = plataAltoDeVeb6kek(ca3aq);
    if ( registrita !== undefined ) return registrita;
    const knece = kf2Brakojn(mapoj.hac2w2q.get(ca3aq) ?? [],
      mapoj.fermitaj.get(ca3aq), mapoj.rotacioj.get(ca3aq) ?? 0,
      mapoj.hap2somani.get(ca3aq));
    return kunigaPlataAlto(x, z, knece, k6h6Alteco);
  };
  return { pa12Cxe, vem2Cxe };
}

/* ſɭэ ſɭw , ꞙɭı ,
@param kunKradaj ( boolean , optional ) - j͑ʃ'ᴜ ſȷᴜ ｡ ſɭᴜ ı],ƨɔ ｡ ſɭɹ ſןᴜ ｡
@returns mondo ( MezuraMondo ) - j͑ʃ'ɜ ſןɹ ｡ ſɭɹ ſᶘɔ ｡ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ｡ ſɭэ ᶗ‹ */
export function kf2MezuranMondon( kunKradaj: boolean = true ): MezuraMondo {
  const qena = new THREE.Scene();
  const hak6h6 = aktivajHak6h6().filter(v => v.n2k.length >= 2);
  const haqakaj2 = aktivajHaqakaj2();

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
  const kradajHaveb6kek: [ number, number ][] = [];
  const kradajPunktoj: [ number, number ][][] = [];
  const kradajRetajHak6h6: K6h6RetoK6h6[] = [];
// ⟨ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ , 📃 ⟩
  const kradajFermitaj = new Map<string, [ number, number ]>();
  if ( kunKradaj ) {
    const oro = kf2KuhalPukek(0xd8b45a);
    const hakaxte = aktivajHakaxte().length ? aktivajHakaxte()
      : [ { ksaka: "Geles", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ];
    for ( const u of hakaxte ) {
      const kaxte = vepaqKradanKaxten(qena,
        { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando as never,
          keuxfhxeso: false, lampoj: false },
        [ u.ofsX, u.ofsZ ], oro, ( u as { aldonajBlokoj?: never[] } ).aldonajBlokoj ?? []);
      kradajHaveb6kek.push(...kaxte.kunigajPunktoj);
      for ( const d of kaxte.vojDifinoj ) {
        kradajPunktoj.push(d.pts);
        kradajRetajHak6h6.push( { n2k: d.pts, sefini: 0o2 * d.w } );
      }
      for ( const [ ca3aq, f ] of kaxte.kunigajFermitaj ) kradajFermitaj.set(ca3aq, f);
    }
  }

// ⟪ ſɭэ ֭ſɭэ , ꞙɭɿ , 📃 ⟫
  const landoj = haqakaj2.map(d => {
    const r = d.rotacio ?? 0;
    return { x: d.x + Math.sin(r) * ( d.profundo / 2 ),
      z: d.z + Math.cos(r) * ( d.profundo / 2 ) };
  });
  const retaj: K6h6RetoK6h6[] = hak6h6.map(v => ( { n2k: v.n2k, sefini: v.sefini } ));
  const antauxaj = troviK6h6RetajnHaveb6kekn(retaj, haqakaj2);
  const celojGluaj: [ number, number ][] =
    [ ...kradajHaveb6kek, ...antauxaj.map(k => [ k.x, k.z ] as [ number, number ]) ];
  const gluitaj = hak6h6.map((v, i) => gluiK6h6Finon(v.n2k, celojGluaj, landoj,
    [ ...kradajPunktoj, ...hak6h6.filter((_, j) => j !== i).map(o => o.n2k) ]));
  const haveb6kek = troviK6h6RetajnHaveb6kekn(
    hak6h6.map((v, i) => ( { n2k: gluitaj[ i ], sefini: v.sefini } )), haqakaj2);

// ⟪ ſɭɜ ſɭ,w , ꞙɭц , 📃 ⟫
  const k21eHaveb6kek: [ number, number ][] =
    [ ...kradajHaveb6kek, ...haveb6kek.map(k => [ k.x, k.z ] as [ number, number ]) ];
  const bazaK6h6Alteco = kf2BazanK6h6Alton(alteco);
// ⟨ ſɭэ ֭ſɭэ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ , 📃 ⟩
  const k21eRetajHak6h6: K6h6RetoK6h6[] = [
    ...kradajRetajHak6h6,
    ...hak6h6.map(( v, i ) => ( { n2k: gluitaj[ i ], sefini: v.sefini } )) ];
  const derivitajBrakoj = kunigajBrakojElHak6h6(k21eHaveb6kek, k21eRetajHak6h6);
  for ( const k of haveb6kek ) {
    const ca3aq = k.x + "," + k.z;
    const ca1ara = derivitajBrakoj.get(ca3aq) ?? [];
    for ( const d of k.direktaj )
      if ( !ca1ara.some( u => u[0] * d[0] + u[1] * d[1] > 0o1 - 0o1/0o1000 ) ) ca1ara.push(d);
    derivitajBrakoj.set(ca3aq, ca1ara);
    k.direktaj = ca1ara;
  }
// ⟨ ſᶘᴜ j͑ʃᴜ , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı ,
  const kunigajDuonoj = new Map<string, number>(haveb6kek.map(k => [ k.x + "," + k.z, k.p2somani ]));
  const k6h6Alteco = kf2K6h6Alton(alteco, k21eHaveb6kek.map(([ x, z ]) =>
    ( { x, z, direktaj: derivitajBrakoj.get(x + "," + z) ?? [],
      p2somani: kunigajDuonoj.get(x + "," + z) ?? VOJA_DIORITA_DUONO } )), akvaFino);
// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
  const mapoj: KunigajMapoj = {
    fermitaj: new Map<string, [ number, number ]>([
      ...kradajFermitaj,
      ...haveb6kek.map(k => [ k.x + "," + k.z, k.fermitaj ] as [ string, [ number, number ] ]) ]),
    rotacioj: new Map<string, number>(haveb6kek.map(k => [ k.x + "," + k.z, k.rotacio ])),
    hac2w2q: new Map<string, [ number, number ][]>(derivitajBrakoj),
    hap2somani: new Map<string, number>(haveb6kek.map(k => [ k.x + "," + k.z, k.p2somani ])),
  };
  for ( const v of hak6h6 ) {
    if ( v.n2k.length < 0o2 ) continue;
    for ( const p of [ v.n2k[0], v.n2k[v.n2k.length - 1] ] )
      mapoj.fermitaj.delete(p[0] + "," + p[1]);
  }
  const { pa12Cxe } = kf2PlatanFunkcion(k6h6Alteco, mapoj);
// ⟨ ꞙɭı , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ , 📃 ⟩
  const ankroj: NivelaVeb6kek[] = k21eHaveb6kek.map(([ x, z ]) =>
    ( { x, z, l6da: pa12Cxe(x, z) } ));

  const larghoDe = ( i: number ): number => {
    const v = hak6h6[ i ];
    return v.pontoSefini ?? v.sefini;
  };
  const profiloDe = ( i: number ): NivelaProfilo =>
    kf2NivelanProfilon(gluitaj[ i ], k6h6LarghoDuono( larghoDe(i) ),
      k6h6Alteco, akvaFino, ankroj);

  return { qena, hak6h6, gluitaj, haveb6kek, kunigajPunktoj: k21eHaveb6kek, ankroj,
    k6h6Alteco, bazaK6h6Alteco, pa12Cxe, larghoDe, profiloDe, mapoj };
}

/* ſɭэ ֭ſɭэ , ꞙɭɿ ,
@param kunigajPunktoj ( [ number , number ] [ ] ) - }ʃɹƽ ʌ ſɟɹƽ
@param x, z ( number ) - }ʃɹƽ
@returns h6kuni ( number ) - ֭ſɭэ ſɭw }ʃꞇ ｡ ſןɔ ｡ Infinity ｡ ſɭᴜ ｡ */
export function distoAlVeb6kek( kunigajPunktoj: readonly [ number, number ][],
  x: number, z: number ): number {
  let plej = Infinity;
  for ( const [ kx, kz ] of kunigajPunktoj )
    plej = Math.min(plej, Math.hypot(kx - x, kz - z));
  return plej;
}

/* ſɭэ ֭ſɭэ , ꞙɭц ,
@param n2k ( [ number , number ] [ ] ) - }ʃɹƽ ʌ ſɭэ ֭ſɭэ
@param s ( number ) - ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭэ ֭ſɭэ
@param eps ( number = ꞙɭıɔ ** -ꞙɭıı , optional ) - j͑ʃ'ɔ ŋᷠɹ ｡ ſɭэ }ʃᴜ ｡ ſןᴜ ſɭw
@returns n2k ( { x , z } ) - }ʃɹƽ */
// ⟨ ſɭᴜ ſןᴜ , ꞙɭэ ,
//   ſɭᴜ ſןᴜ , ꞙɭɩ ,
//   ſɭᴜ ſןᴜ , ꞙɭꞟ , 📃 ⟩
export function punktoCxe( n2k: readonly ( readonly [ number, number ] )[],
  s: number, eps = 0o10 ** -0o11 ): { x: number; z: number } {
  let akum = 0;
  for ( let k = 0; k < n2k.length - 1; k++ ) {
    const [ x1, z1 ] = n2k[ k ], [ x2, z2 ] = n2k[ k + 1 ];
    const lo = Math.hypot(x2 - x1, z2 - z1);
    if ( s <= akum + lo || k === n2k.length - 2 ) {
      const t = lo < eps ? 0 : Math.max(0, Math.min(1, ( s - akum ) / lo));
      return { x: x1 + ( x2 - x1 ) * t, z: z1 + ( z2 - z1 ) * t };
    }
    akum += lo;
  }
  const q = n2k[ n2k.length - 1 ];
  return { x: q[ 0 ], z: q[ 1 ] };
}
