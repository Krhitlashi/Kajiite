// ≺⧼ j͑ʃᴜ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ ʌ ſȷɔ ſɭ,ꞇ ꞁȷ̀ᴜ }ʃꞇ 🧪 ⧽≻
// ⟨ ឧបករណ៍វាស់ទាំងអស់អានដីដូចហ្គេម ។ អនុគមន៍ទូទៅនៅទីនេះតែម្តង ,
// ដើម្បីកុំឱ្យស្គ្រីបនីមួយ ៗ មានច្បាប់ផ្ទាល់ខ្លួន ។ 📃 ⟩
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

// ⟪ ទឹកពិត 📏 ⟫
// ⟨ ទឹកត្រូវមានផ្ទៃលើដី ៖ មិនមែនត្រឹមដែនទឹកឆ្លាក់ទេ ។ 📃 ⟩
// ⟨ ដូចហ្គេម 📏 ⟩ ៖ ហ្គេមមិនទាមទារម៉ាសទឹកឆ្លាក់ទេ ។ ពិភពលោកមានគ្រាប់ពូជ
// មានទន្លេធម្មជាតិដោយគ្មានម៉ាសឆ្លាក់ , ដូច្នេះបើឧបករណ៍វាស់ទាមទារម៉ាសនោះ ,
// វានឹងវាស់ខុសពីហ្គេម ៖ ផ្លូវឆ្លងទន្លេមិនត្រូវបានចាត់ជាស្ពាន ,
// ហើយការវាស់រាយការធ្លាក់ក្នុងទឹកជាកំហុសផ្លូវ ។ 📃 ⟩
export function tsekeVeraAkvo( x: number, z: number ): boolean {
  return alteco(x, z) < akvaVem2(x, z) - 0o1/0o200;
}

// ⟨ កម្ពស់ផ្ទៃទឹកបូកចន្លោះ , ឬ -Infinity លើដីគោក ។ 📃 ⟩
export function akvaFino( x: number, z: number ): number {
  return tsekeVeraAkvo(x, z) ? akvaVem2(x, z) + VOJA_AKVA_KLARANCO : -Infinity;
}

// ⟪ កម្ពស់ផ្លូវតាមដី 📏 ⟫
// ⟨ រូបមន្តតែមួយនៅ haqoxa.js 📃 ⟩ ៖ ឧបករណ៍វាស់មិនមានច្បាប់ផ្ទាល់ខ្លួនទេ ។
export function k6h6Supro( x: number, z: number, sefini: number ): number {
  return k6h6SuproBaza(x, z, sefini, alteco);
}

/*កម្ពស់ផ្លូវនៅចុង ដែលត្រូវដូចចានភ្ជាប់ជិតបំផុត
    @param x, z ( number ) - ចំណុចចុងផ្លូវ
    @param sefini ( number ) - ទទឹងផ្លូវ
    @param haveb6kek ( [ number , number ] [ ] ) - ចំណុចចានភ្ជាប់
@returns teru ( number ) - កម្ពស់ផ្ទៃផ្លូវ */
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

// ⟪ ពិភពលោកសម្រាប់ការវាស់ 🌍 ⟫
// ⟨ ស្គ្រិបវាស់គ្រប់គ្រាន់ចាប់ផ្តើមដោយប្លុកដូចគ្នា ៖ ទីក្រុងក្រឡា , ការទាញចុងផ្លូវ ,
// ចំណុចភ្ជាប់ , វាលកម្ពស់ , និងកម្រិតផ្លូវ ។ មុននេះប្លុកនេះចម្លងក្នុងស្គ្រីបដប់ឯកសារ ,
// ហើយពួកវាខុសគ្នាបន្តិចម្តងៗ ៖ ដូច្នេះការវាស់ពីរបានលេខខុសគ្នាលើពិភពលោកតែមួយ ។
// ឥឡូវនៅទីនេះតែម្តង ។ 📃 ⟩
// ⟨ ដៃចានភ្ជាប់ក៏ត្រូវដូចហ្គេម 📃 ⟩ ៖ ហ្គេមគណនាកម្រិតចានពីដៃពិត ( `kf2Brakojn` ) ,
// មិនមែនពីទិសដៃទទេទេ ។ បើឧបករណ៍វាស់ប្រើទិសដៃទទេ , កម្រិតចានខុស ,
// ហើយការវាស់រាយការជញ្ជាំងក្លែងក្លាយ ។ 📃 ⟩
export interface KunigajMapoj {
  fermitaj: Map<string, [ number, number ]>;
  rotacioj: Map<string, number>;
  hac2w2q: Map<string, [ number, number ][]>;
  hap2somani: Map<string, number>;
}

export interface MezuraMondo {
  // ⟨ ឆាកសាកល្បង ៖ ធរណីមាត្រផ្លូវសាងសង់នៅទីនេះ ។ 📃 ⟩
  qena: THREE.Scene;
  // ⟨ ផ្លូវសាងសង់ដោយដៃ ( មិនមែនក្រឡា ) ។ 📃 ⟩
  hak6h6: SkulptaK6h6[];
  // ⟨ ចុងផ្លូវដែលបានទាញទៅចានភ្ជាប់ ។ 📃 ⟩
  gluitaj: K6h6Punkto[][];
  // ⟨ ចំណុចភ្ជាប់ និងចំណុចរបស់វា ។ 📃 ⟩
  haveb6kek: K6h6RetoVeb6kek[];
  kunigajPunktoj: [ number, number ][];
  // ⟨ កម្ពស់ចានភ្ជាប់តាមចំណុច ។ 📃 ⟩
  ankroj: NivelaVeb6kek[];
  // ⟨ វាលកម្ពស់ផ្លូវ និងវាលមូលដ្ឋាន ។ 📃 ⟩
  k6h6Alteco: ( x: number, z: number ) => number;
  bazaK6h6Alteco: ( x: number, z: number ) => number;
  // ⟨ កម្រិតចានភ្ជាប់នៅចំណុចមួយ ។ 📃 ⟩
  pa12Cxe: ( x: number, z: number ) => number;
  // ⟨ ទទឹងពេញនៃផ្លូវ ( ស្ពានធំជាងផ្លូវ ) ។ 📃 ⟩
  larghoDe: ( i: number ) => number;
  // ⟨ កម្រិតផ្លូវពេញលេញតាមលំដាប់ ។ 📃 ⟩
  profiloDe: ( i: number ) => NivelaProfilo;
  // ⟨ ដៃ/ការបិទ/ការបង្វិល/ទទឹង របស់ចានភ្ជាប់នីមួយៗ ។ 📃 ⟩
  mapoj: KunigajMapoj;
}

// ⟨ កម្ពស់ចានភ្ជាប់ ៖ អានវាលកម្ពស់ដែលផ្លូវអាន ។ 📃 ⟩
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
  // ⟨ កម្រិតចានរាបដូចហ្គេម 📏 ⟩ បើ vepaqHak6h6n បានតាមដានកម្ពស់ផ្លូវ
  // តាមដៃរួចហើយ , អានកម្រិតដែលវាជ្រើស ។ បើគ្មាន ( ឧបករណ៍ដែលមិនគូរ
  // ធរណីមាត្រ ) , យកកម្រិតដីដូចអនុគមន៍បម្រុងរបស់ហ្គេម ។ កុំយកមធ្យមដៃចាស់ ,
  // វាធ្វើឱ្យប្រវត្តិរូបឧបករណ៍ខុសពីផ្លូវពិត ។ 📃 ⟩
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

/*សាងសង់ពិភពលោកតាមលំដាប់ដូចហ្គេម
    @param kunKradaj ( boolean , optional ) - បញ្ចូលទីក្រុងក្រឡាផង
@returns mondo ( MezuraMondo ) - ទិន្នន័យទាំងអស់ដែលការវាស់ត្រូវការ */
export function kf2MezuranMondon( kunKradaj: boolean = true ): MezuraMondo {
  const qena = new THREE.Scene();
  const hak6h6 = aktivajHak6h6().filter(v => v.n2k.length >= 2);
  const haqakaj2 = aktivajHaqakaj2();

  // ⟪ ទីក្រុងក្រឡា ៖ ចំណុចភ្ជាប់របស់វា 📃 ⟫
  const kradajHaveb6kek: [ number, number ][] = [];
  const kradajPunktoj: [ number, number ][][] = [];
  const kradajRetajHak6h6: K6h6RetoK6h6[] = [];
  // ⟨ ការបិទជ្រុងរបស់ទីក្រុងក្រឡា 📃 ⟩ ៖ ចំណុចក្រឡាគ្មានទិសដៃ , ដូច្នេះ
  // ចានរបស់វាសាងសង់ពីជ្រុងបិទ ។ បើឧបករណ៍វាស់មិនអានការបិទទាំងនោះ ,
  // ចានក្រឡាក្លាយជាប្រសព្វបួនជ្រុង , ហើយការវាស់មិនឃើញបញ្ហាពិត ។ 📃 ⟩
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

  // ⟪ ការទាញចុងផ្លូវ ៖ ដូច `vepaqKaxten` 📃 ⟫
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

  // ⟪ វាលកម្ពស់ និងកម្រិតចាន ៖ ដូច `vepaqKaxten` 📃 ⟫
  const k21eHaveb6kek: [ number, number ][] =
    [ ...kradajHaveb6kek, ...haveb6kek.map(k => [ k.x, k.z ] as [ number, number ]) ];
  const bazaK6h6Alteco = kf2BazanK6h6Alton(alteco);
  // ⟨ ដៃពីផ្លូវទាំងអស់ 📏 ⟩ ៖ ដូច `vepaqKaxten` ។ ចំណុចក្រឡាក៏ទទួលដៃពីផ្លូវក្រឡាដែរ ,
  // បើមិនដូច្នេះការវាស់មិនឃើញកម្រិតតាមដៃដែលហ្គេមប្រើ ។ 📃 ⟩
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
  // ⟨ ផ្ទឃ្លាំងទឹក 📃 ⟩ ៖ បញ្ជូនផ្ទឃ្លាំងទឹកទៅវាលផ្លូវ ដូច kaxte.ts ។
  const kunigajDuonoj = new Map<string, number>(haveb6kek.map(k => [ k.x + "," + k.z, k.p2somani ]));
  const k6h6Alteco = kf2K6h6Alton(alteco, k21eHaveb6kek.map(([ x, z ]) =>
    ( { x, z, direktaj: derivitajBrakoj.get(x + "," + z) ?? [],
      p2somani: kunigajDuonoj.get(x + "," + z) ?? VOJA_DIORITA_DUONO } )), akvaFino);
  // ⟨ ដៃរបស់ចានភ្ជាប់ ៖ ដូច `vepaqKaxten` 📃 ⟩ ។ ចំណុចក្រឡាមានតែការបិទជ្រុង ,
  // ចំណុចផ្លូវមានទិសដៃពិត ។ ចុងផ្លូវដែលមកដល់ចំណុចក្រឡាបើកជ្រុងនោះ ។ 📃 ⟩
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
  // ⟨ គ្មាន vem2 តាមទិស 📏 ⟩ ៖ ហ្គេមប្រើចានរាបតែមួយកម្រិត , ហើយ
  // kf2NivelanProfilon អានតែ `l6da` ។ បញ្ជូន vem2 ចាស់ធ្វើឱ្យឧបករណ៍វាស់
  // ឃើញកម្រិតខុសពីផ្លូវដែលបានសាងសង់ ។ 📃 ⟩
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

/*ចម្ងាយទៅចំណុចភ្ជាប់ជិតបំផុត
    @param kunigajPunktoj ( [ number , number ] [ ] ) - ចំណុចភ្ជាប់
    @param x, z ( number ) - ចំណុច
@returns h6kuni ( number ) - ចម្ងាយ , ឬ Infinity បើគ្មាន */
export function distoAlVeb6kek( kunigajPunktoj: readonly [ number, number ][],
  x: number, z: number ): number {
  let plej = Infinity;
  for ( const [ kx, kz ] of kunigajPunktoj )
    plej = Math.min(plej, Math.hypot(kx - x, kz - z));
  return plej;
}

/*ចំណុចនៅចម្ងាយមួយតាមបណ្តោយបន្ទាត់ផ្លូវ
    @param n2k ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param s ( number ) - ចម្ងាយតាមបណ្តោយ
    @param eps ( number = 0o10 ** -0o11 , optional ) - កម្រិតប្រវែងអប្បបរមា
@returns n2k ( { x , z } ) - ចំណុច */
// ⟨ ឧបករណ៍ខ្លះប្រើកម្រិតខុសគ្នាសម្រាប់ផ្នែកខ្លីបំផុត ។ ពីមុនគ្រប់ឧបករណ៍
//   ចម្លងអនុគមន៍ទាំងមូលដើម្បីប្តូរតែលេខមួយ ។ ឥឡូវអនុគមន៍មួយ
//   ហើយឧបករណ៍នីមួយៗបញ្ជូនកម្រិតរបស់ខ្លួន ។ 📃 ⟩
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
