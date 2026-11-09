// ≺⧼ ជំនួយរួមសម្រាប់ការវាស់ 🧪 ⧽≻
// ⟨ ឧបករណ៍វាស់ទាំងអស់អានដីដូចហ្គេម ។ អនុគមន៍ទូទៅនៅទីនេះតែម្តង ,
// ដើម្បីកុំឱ្យស្គ្រីបនីមួយ ៗ មានច្បាប់ផ្ទាល់ខ្លួន ។ 📃 ⟩
import * as THREE from "three";
import { alteco, akvaNivelo } from "../../kantaoj/mondo/tereno.js";
import { aktivajVojoj, aktivajDokoj, aktivajUrboj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { konstruiKradanUrbon } from "../../kantaoj/mondo/urbo/krada-urbo.js";
import type { SkulptaVojo } from "../../kantaoj/mondo/urbo/tipoj.js";
import { gluiVojaFinon } from "../../eskekoj/medio/vojoj/gluado.js";
import { troviVojaRetajnKunigojn, kunigajBrakojElVojoj, type VojaRetoKunigo,
  type VojaRetoVojo } from "../../eskekoj/medio/voj-reto.js";
import type { VojaPunkto } from "../../eskekoj/medio/voj-reto/tipoj.js";
import { kreiBazanVojoAlton, kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { kreiNivelanProfilon, type NivelaKunigo,
  type NivelaProfilo } from "../../eskekoj/medio/vojoj/niveloj.js";
import { vojaSupro as vojaSuproBaza, vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { kreiBrakojn, kunigaPlataAlto, kunigaPlataNivelo } from "../../eskekoj/medio/vojoj/platoj.js";
import { plataAltoDeKunigo } from "../../eskekoj/medio/vojoj/kunig-niveloj.js";
import { kreiOranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { VOJA_AKVA_KLARANCO, VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO,
  KORNA_R, surGrid, vojaLarghoDuono } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { type PlataNivelo } from "../../eskekoj/medio/vojoj/formoj.js";

// ⟪ ទឹកពិត 📏 ⟫
// ⟨ ទឹកត្រូវមានផ្ទៃលើដី ៖ មិនមែនត្រឹមដែនទឹកឆ្លាក់ទេ ។ 📃 ⟩
// ⟨ ដូចហ្គេម 📏 ⟩ ៖ ហ្គេមមិនទាមទារម៉ាសទឹកឆ្លាក់ទេ ។ ពិភពលោកមានគ្រាប់ពូជ
// មានទន្លេធម្មជាតិដោយគ្មានម៉ាសឆ្លាក់ , ដូច្នេះបើឧបករណ៍វាស់ទាមទារម៉ាសនោះ ,
// វានឹងវាស់ខុសពីហ្គេម ៖ ផ្លូវឆ្លងទន្លេមិនត្រូវបានចាត់ជាស្ពាន ,
// ហើយការវាស់រាយការធ្លាក់ក្នុងទឹកជាកំហុសផ្លូវ ។ 📃 ⟩
export function cxuVeraAkvo( x: number, z: number ): boolean {
  return alteco(x, z) < akvaNivelo(x, z) - 0o1/0o200;
}

// ⟨ កម្ពស់ផ្ទៃទឹកបូកចន្លោះ , ឬ -Infinity លើដីគោក ។ 📃 ⟩
export function akvaFino( x: number, z: number ): number {
  return cxuVeraAkvo(x, z) ? akvaNivelo(x, z) + VOJA_AKVA_KLARANCO : -Infinity;
}

// ⟪ កម្ពស់ផ្លូវតាមដី 📏 ⟫
// ⟨ រូបមន្តតែមួយនៅ formoj.js 📃 ⟩ ៖ ឧបករណ៍វាស់មិនមានច្បាប់ផ្ទាល់ខ្លួនទេ ។
export function vojaSupro( x: number, z: number, larĝo: number ): number {
  return vojaSuproBaza(x, z, larĝo, alteco);
}

/*កម្ពស់ផ្លូវនៅចុង ដែលត្រូវដូចចានភ្ជាប់ជិតបំផុត
    @param x, z ( number ) - ចំណុចចុងផ្លូវ
    @param larĝo ( number ) - ទទឹងផ្លូវ
    @param kunigoj ( [ number , number ] [ ] ) - ចំណុចចានភ្ជាប់
@returns supro ( number ) - កម្ពស់ផ្ទៃផ្លូវ */
export function pontaFinAlto( x: number, z: number, larĝo: number,
  kunigoj: readonly { x: number; z: number; direktaj: [ number, number ][] }[] ): number {
  let plejProksima: { x: number; z: number; direktaj: [ number, number ][] } | null = null;
  let plejMallonga = Infinity;
  for ( const k of kunigoj ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < plejMallonga ) { plejMallonga = d; plejProksima = k; }
  }
  if ( plejProksima && plejMallonga < VOJA_EKSTERA_DUONO + KORNA_R )
    return vojaSuproDeKunigo(plejProksima.x, plejProksima.z, plejProksima.direktaj,
      VOJA_EKSTERA_DUONO, alteco).supro;
  return vojaSupro(x, z, larĝo);
}

// ⟪ ពិភពលោកសម្រាប់ការវាស់ 🌍 ⟫
// ⟨ ស្គ្រិបវាស់គ្រប់គ្រាន់ចាប់ផ្តើមដោយប្លុកដូចគ្នា ៖ ទីក្រុងក្រឡា , ការទាញចុងផ្លូវ ,
// ចំណុចភ្ជាប់ , វាលកម្ពស់ , និងកម្រិតផ្លូវ ។ មុននេះប្លុកនេះចម្លងក្នុងស្គ្រីបដប់ឯកសារ ,
// ហើយពួកវាខុសគ្នាបន្តិចម្តងៗ ៖ ដូច្នេះការវាស់ពីរបានលេខខុសគ្នាលើពិភពលោកតែមួយ ។
// ឥឡូវនៅទីនេះតែម្តង ។ 📃 ⟩
// ⟨ ដៃចានភ្ជាប់ក៏ត្រូវដូចហ្គេម 📃 ⟩ ៖ ហ្គេមគណនាកម្រិតចានពីដៃពិត ( `kreiBrakojn` ) ,
// មិនមែនពីទិសដៃទទេទេ ។ បើឧបករណ៍វាស់ប្រើទិសដៃទទេ , កម្រិតចានខុស ,
// ហើយការវាស់រាយការជញ្ជាំងក្លែងក្លាយ ។ 📃 ⟩
export interface KunigajMapoj {
  fermitaj: Map<string, [ number, number ]>;
  rotacioj: Map<string, number>;
  direktoj: Map<string, [ number, number ][]>;
  duonoj: Map<string, number>;
}

export interface MezuraMondo {
  // ⟨ ឆាកសាកល្បង ៖ ធរណីមាត្រផ្លូវសាងសង់នៅទីនេះ ។ 📃 ⟩
  sceno: THREE.Scene;
  // ⟨ ផ្លូវសាងសង់ដោយដៃ ( មិនមែនក្រឡា ) ។ 📃 ⟩
  vojoj: SkulptaVojo[];
  // ⟨ ចុងផ្លូវដែលបានទាញទៅចានភ្ជាប់ ។ 📃 ⟩
  gluitaj: VojaPunkto[][];
  // ⟨ ចំណុចភ្ជាប់ និងចំណុចរបស់វា ។ 📃 ⟩
  kunigoj: VojaRetoKunigo[];
  kunigajPunktoj: [ number, number ][];
  // ⟨ កម្ពស់ចានភ្ជាប់តាមចំណុច ។ 📃 ⟩
  ankroj: NivelaKunigo[];
  // ⟨ វាលកម្ពស់ផ្លូវ និងវាលមូលដ្ឋាន ។ 📃 ⟩
  vojoAlteco: ( x: number, z: number ) => number;
  bazaVojoAlteco: ( x: number, z: number ) => number;
  // ⟨ កម្រិតចានភ្ជាប់នៅចំណុចមួយ ។ 📃 ⟩
  platoCxe: ( x: number, z: number ) => number;
  // ⟨ ទទឹងពេញនៃផ្លូវ ( ស្ពានធំជាងផ្លូវ ) ។ 📃 ⟩
  larghoDe: ( i: number ) => number;
  // ⟨ កម្រិតផ្លូវពេញលេញតាមលំដាប់ ។ 📃 ⟩
  profiloDe: ( i: number ) => NivelaProfilo;
  // ⟨ ដៃ/ការបិទ/ការបង្វិល/ទទឹង របស់ចានភ្ជាប់នីមួយៗ ។ 📃 ⟩
  mapoj: KunigajMapoj;
}

// ⟨ កម្ពស់ចានភ្ជាប់ ៖ អានវាលកម្ពស់ដែលផ្លូវអាន ។ 📃 ⟩
function kreiPlatanFunkcion(
  vojoAlteco: ( x: number, z: number ) => number,
  mapoj: KunigajMapoj
): { platoCxe: ( x: number, z: number ) => number;
  niveloCxe: ( x: number, z: number ) => PlataNivelo } {
  const memoro = new Map<string, PlataNivelo>();
  const niveloCxe = ( x: number, z: number ): PlataNivelo => {
    const klavo = x + "," + z;
    let nivelo = memoro.get(klavo);
    if ( nivelo === undefined ) {
      const brakoj = kreiBrakojn(mapoj.direktoj.get(klavo) ?? [],
        mapoj.fermitaj.get(klavo), mapoj.rotacioj.get(klavo) ?? 0,
        mapoj.duonoj.get(klavo));
      nivelo = kunigaPlataNivelo(x, z, brakoj, vojoAlteco);
      memoro.set(klavo, nivelo);
    }
    return nivelo;
  };
  // ⟨ កម្រិតចានរាបដូចហ្គេម 📏 ⟩ បើ konstruiVojojn បានតាមដានកម្ពស់ផ្លូវ
  // តាមដៃរួចហើយ , អានកម្រិតដែលវាជ្រើស ។ បើគ្មាន ( ឧបករណ៍ដែលមិនគូរ
  // ធរណីមាត្រ ) , យកកម្រិតដីដូចអនុគមន៍បម្រុងរបស់ហ្គេម ។ កុំយកមធ្យមដៃចាស់ ,
  // វាធ្វើឱ្យប្រវត្តិរូបឧបករណ៍ខុសពីផ្លូវពិត ។ 📃 ⟩
  const platoCxe = ( x: number, z: number ): number => {
    const klavo = x + "," + z;
    const registrita = plataAltoDeKunigo(klavo);
    if ( registrita !== undefined ) return registrita;
    const brakoj = kreiBrakojn(mapoj.direktoj.get(klavo) ?? [],
      mapoj.fermitaj.get(klavo), mapoj.rotacioj.get(klavo) ?? 0,
      mapoj.duonoj.get(klavo));
    return kunigaPlataAlto(x, z, brakoj, vojoAlteco);
  };
  return { platoCxe, niveloCxe };
}

/*សាងសង់ពិភពលោកតាមលំដាប់ដូចហ្គេម
    @param kunKradaj ( boolean , optional ) - បញ្ចូលទីក្រុងក្រឡាផង
@returns mondo ( MezuraMondo ) - ទិន្នន័យទាំងអស់ដែលការវាស់ត្រូវការ */
export function kreiMezuranMondon( kunKradaj: boolean = true ): MezuraMondo {
  const sceno = new THREE.Scene();
  const vojoj = aktivajVojoj().filter(v => v.punktoj.length >= 2);
  const dokoj = aktivajDokoj();

  // ⟪ ទីក្រុងក្រឡា ៖ ចំណុចភ្ជាប់របស់វា 📃 ⟫
  const kradajKunigoj: [ number, number ][] = [];
  const kradajPunktoj: [ number, number ][][] = [];
  const kradajRetajVojoj: VojaRetoVojo[] = [];
  // ⟨ ការបិទជ្រុងរបស់ទីក្រុងក្រឡា 📃 ⟩ ៖ ចំណុចក្រឡាគ្មានទិសដៃ , ដូច្នេះ
  // ចានរបស់វាសាងសង់ពីជ្រុងបិទ ។ បើឧបករណ៍វាស់មិនអានការបិទទាំងនោះ ,
  // ចានក្រឡាក្លាយជាប្រសព្វបួនជ្រុង , ហើយការវាស់មិនឃើញបញ្ហាពិត ។ 📃 ⟩
  const kradajFermitaj = new Map<string, [ number, number ]>();
  if ( kunKradaj ) {
    const oro = kreiOranMaterialon(0xd8b45a);
    const urboj = aktivajUrboj().length ? aktivajUrboj()
      : [ { nomo: "Ĉefa", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ];
    for ( const u of urboj ) {
      const urbo = konstruiKradanUrbon(sceno,
        { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando as never,
          keuxfhxeso: false, lampoj: false },
        [ u.ofsX, u.ofsZ ], oro, ( u as { aldonajBlokoj?: never[] } ).aldonajBlokoj ?? []);
      kradajKunigoj.push(...urbo.kunigajPunktoj);
      for ( const d of urbo.vojDifinoj ) {
        kradajPunktoj.push(d.pts);
        kradajRetajVojoj.push( { punktoj: d.pts, larĝo: 0o2 * d.w } );
      }
      for ( const [ klavo, f ] of urbo.kunigajFermitaj ) kradajFermitaj.set(klavo, f);
    }
  }

  // ⟪ ការទាញចុងផ្លូវ ៖ ដូច `konstruiUrbon` 📃 ⟫
  const landoj = dokoj.map(d => {
    const r = d.rotacio ?? 0;
    return { x: d.x + Math.sin(r) * ( d.profundo / 2 ),
      z: d.z + Math.cos(r) * ( d.profundo / 2 ) };
  });
  const retaj: VojaRetoVojo[] = vojoj.map(v => ( { punktoj: v.punktoj, larĝo: v.larĝo } ));
  const antauxaj = troviVojaRetajnKunigojn(retaj, dokoj);
  const celojGluaj: [ number, number ][] =
    [ ...kradajKunigoj, ...antauxaj.map(k => [ k.x, k.z ] as [ number, number ]) ];
  const gluitaj = vojoj.map((v, i) => gluiVojaFinon(v.punktoj, celojGluaj, landoj,
    [ ...kradajPunktoj, ...vojoj.filter((_, j) => j !== i).map(o => o.punktoj) ]));
  const kunigoj = troviVojaRetajnKunigojn(
    vojoj.map((v, i) => ( { punktoj: gluitaj[ i ], larĝo: v.larĝo } )), dokoj);

  // ⟪ វាលកម្ពស់ និងកម្រិតចាន ៖ ដូច `konstruiUrbon` 📃 ⟫
  const ĉiujKunigoj: [ number, number ][] =
    [ ...kradajKunigoj, ...kunigoj.map(k => [ k.x, k.z ] as [ number, number ]) ];
  const bazaVojoAlteco = kreiBazanVojoAlton(alteco);
  // ⟨ ដៃពីផ្លូវទាំងអស់ 📏 ⟩ ៖ ដូច `konstruiUrbon` ។ ចំណុចក្រឡាក៏ទទួលដៃពីផ្លូវក្រឡាដែរ ,
  // បើមិនដូច្នេះការវាស់មិនឃើញកម្រិតតាមដៃដែលហ្គេមប្រើ ។ 📃 ⟩
  const ĉiujRetajVojoj: VojaRetoVojo[] = [
    ...kradajRetajVojoj,
    ...vojoj.map(( v, i ) => ( { punktoj: gluitaj[ i ], larĝo: v.larĝo } )) ];
  const derivitajBrakoj = kunigajBrakojElVojoj(ĉiujKunigoj, ĉiujRetajVojoj);
  for ( const k of kunigoj ) {
    const klavo = k.x + "," + k.z;
    const listo = derivitajBrakoj.get(klavo) ?? [];
    for ( const d of k.direktaj )
      if ( !listo.some( u => u[0] * d[0] + u[1] * d[1] > 0o1 - 0o1/0o1000 ) ) listo.push(d);
    derivitajBrakoj.set(klavo, listo);
    k.direktaj = listo;
  }
  // ⟨ ផ្ទឃ្លាំងទឹក 📃 ⟩ ៖ បញ្ជូនផ្ទឃ្លាំងទឹកទៅវាលផ្លូវ ដូច urbo.ts ។
  const kunigajDuonoj = new Map<string, number>(kunigoj.map(k => [ k.x + "," + k.z, k.duono ]));
  const vojoAlteco = kreiVojoAlton(alteco, ĉiujKunigoj.map(([ x, z ]) =>
    ( { x, z, direktaj: derivitajBrakoj.get(x + "," + z) ?? [],
      duono: kunigajDuonoj.get(x + "," + z) ?? VOJA_DIORITA_DUONO } )), akvaFino);
  // ⟨ ដៃរបស់ចានភ្ជាប់ ៖ ដូច `konstruiUrbon` 📃 ⟩ ។ ចំណុចក្រឡាមានតែការបិទជ្រុង ,
  // ចំណុចផ្លូវមានទិសដៃពិត ។ ចុងផ្លូវដែលមកដល់ចំណុចក្រឡាបើកជ្រុងនោះ ។ 📃 ⟩
  const mapoj: KunigajMapoj = {
    fermitaj: new Map<string, [ number, number ]>([
      ...kradajFermitaj,
      ...kunigoj.map(k => [ k.x + "," + k.z, k.fermitaj ] as [ string, [ number, number ] ]) ]),
    rotacioj: new Map<string, number>(kunigoj.map(k => [ k.x + "," + k.z, k.rotacio ])),
    direktoj: new Map<string, [ number, number ][]>(derivitajBrakoj),
    duonoj: new Map<string, number>(kunigoj.map(k => [ k.x + "," + k.z, k.duono ])),
  };
  for ( const v of vojoj ) {
    if ( v.punktoj.length < 0o2 ) continue;
    for ( const p of [ v.punktoj[0], v.punktoj[v.punktoj.length - 1] ] )
      mapoj.fermitaj.delete(p[0] + "," + p[1]);
  }
  const { platoCxe } = kreiPlatanFunkcion(vojoAlteco, mapoj);
  // ⟨ គ្មាន nivelo តាមទិស 📏 ⟩ ៖ ហ្គេមប្រើចានរាបតែមួយកម្រិត , ហើយ
  // kreiNivelanProfilon អានតែ `alto` ។ បញ្ជូន nivelo ចាស់ធ្វើឱ្យឧបករណ៍វាស់
  // ឃើញកម្រិតខុសពីផ្លូវដែលបានសាងសង់ ។ 📃 ⟩
  const ankroj: NivelaKunigo[] = ĉiujKunigoj.map(([ x, z ]) =>
    ( { x, z, alto: platoCxe(x, z) } ));

  const larghoDe = ( i: number ): number => {
    const v = vojoj[ i ];
    return v.pontoLarĝo ?? v.larĝo;
  };
  const profiloDe = ( i: number ): NivelaProfilo =>
    kreiNivelanProfilon(gluitaj[ i ], vojaLarghoDuono( larghoDe(i) ),
      vojoAlteco, akvaFino, ankroj);

  return { sceno, vojoj, gluitaj, kunigoj, kunigajPunktoj: ĉiujKunigoj, ankroj,
    vojoAlteco, bazaVojoAlteco, platoCxe, larghoDe, profiloDe, mapoj };
}

/*ចម្ងាយទៅចំណុចភ្ជាប់ជិតបំផុត
    @param kunigajPunktoj ( [ number , number ] [ ] ) - ចំណុចភ្ជាប់
    @param x, z ( number ) - ចំណុច
@returns disto ( number ) - ចម្ងាយ , ឬ Infinity បើគ្មាន */
export function distoAlKunigo( kunigajPunktoj: readonly [ number, number ][],
  x: number, z: number ): number {
  let plej = Infinity;
  for ( const [ kx, kz ] of kunigajPunktoj )
    plej = Math.min(plej, Math.hypot(kx - x, kz - z));
  return plej;
}

/*ចំណុចនៅចម្ងាយមួយតាមបណ្តោយបន្ទាត់ផ្លូវ
    @param punktoj ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param s ( number ) - ចម្ងាយតាមបណ្តោយ
@returns punkto ( { x , z } ) - ចំណុច */
export function punktoCxe( punktoj: readonly ( readonly [ number, number ] )[],
  s: number ): { x: number; z: number } {
  let akum = 0;
  for ( let k = 0; k < punktoj.length - 1; k++ ) {
    const [ x1, z1 ] = punktoj[ k ], [ x2, z2 ] = punktoj[ k + 1 ];
    const lo = Math.hypot(x2 - x1, z2 - z1);
    if ( s <= akum + lo || k === punktoj.length - 2 ) {
      const t = lo < 0o10 ** -0o11 ? 0 : Math.max(0, Math.min(1, ( s - akum ) / lo));
      return { x: x1 + ( x2 - x1 ) * t, z: z1 + ( z2 - z1 ) * t };
    }
    akum += lo;
  }
  const q = punktoj[ punktoj.length - 1 ];
  return { x: q[ 0 ], z: q[ 1 ] };
}
