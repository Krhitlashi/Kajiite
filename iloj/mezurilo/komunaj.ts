// ≺⧼ ជំនួយរួមសម្រាប់ការវាស់ 🧪 ⧽≻
// ⟨ ឧបករណ៍វាស់ទាំងអស់អានដីដូចហ្គេម ។ អនុគមន៍ទូទៅនៅទីនេះតែម្តង ,
// ដើម្បីកុំឱ្យស្គ្រីបនីមួយ ៗ មានច្បាប់ផ្ទាល់ខ្លួន ។ 📃 ⟩
import * as THREE from "three";
import { alteco, akvaNivelo } from "../../kantaoj/mondo/tereno.js";
import { aktivajVojoj, aktivajDokoj, aktivajUrboj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { konstruiKradanUrbon } from "../../kantaoj/mondo/urbo/krada-urbo.js";
import type { SkulptaVojo } from "../../kantaoj/mondo/urbo/tipoj.js";
import { gluiVojaFinon } from "../../kantaoj/mondo/urbo/gluado.js";
import { troviVojaRetajnKunigojn, type VojaRetoKunigo,
  type VojaRetoVojo } from "../../eskekoj/medio/voj-reto.js";
import type { VojaPunkto } from "../../eskekoj/medio/voj-reto/tipoj.js";
import { kreiBazanVojoAlton, kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { kreiNivelanProfilon, type NivelaKunigo,
  type NivelaProfilo } from "../../eskekoj/medio/vojoj/niveloj.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { kreiOranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { VOJA_AKVA_KLARANCO, VOJA_BORDA_LARĜO, VOJA_EKSTERA_DUONO,
  VOJA_SUPRO_LEVIGXO, KORNA_R, surGrid } from "../../eskekoj/medio/vojoj/mezuroj.js";

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
/*កម្ពស់ខ្ពស់បំផុតក្រោមផ្ទៃផ្លូវ តាមដី
    @param x, z ( number ) - ចំណុច
    @param larĝo ( number ) - ទទឹងផ្លូវ
@returns supro ( number ) - កម្ពស់ផ្ទៃផ្លូវ */
export function vojaSupro( x: number, z: number, larĝo: number ): number {
  const duon = larĝo / 4 + VOJA_BORDA_LARĜO;
  let maks = alteco(x, z);
  for ( let i = 0; i < 0o10; i++ ) {
    const ang = i * Math.PI / 4;
    maks = Math.max(maks, alteco(x + Math.cos(ang) * duon, z + Math.sin(ang) * duon));
  }
  return maks + VOJA_SUPRO_LEVIGXO;
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
// ⟨ ស្គ្រីបវាស់គ្រប់គ្រាន់ចាប់ផ្តើមដោយប្លុកដូចគ្នា ៖ ទីក្រុងក្រឡា , ការទាញចុងផ្លូវ ,
// ចំណុចភ្ជាប់ , វាលកម្ពស់ , និងកម្រិតផ្លូវ ។ មុននេះប្លុកនេះចម្លងក្នុងស្គ្រីបដប់ឯកសារ ,
// ហើយពួកវាខុសគ្នាបន្តិចម្តងៗ ៖ ដូច្នេះការវាស់ពីរបានលេខខុសគ្នាលើពិភពលោកតែមួយ ។
// ឥឡូវនៅទីនេះតែម្តង ។ 📃 ⟩
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
}

// ⟨ កម្ពស់ចានភ្ជាប់ ៖ អានវាលកម្ពស់ដែលផ្លូវអាន ។ 📃 ⟩
function kreiPlatanFunkcion(
  vojoAlteco: ( x: number, z: number ) => number
): ( x: number, z: number ) => number {
  const memoro = new Map<string, number>();
  return ( x, z ) => {
    const klavo = x + "," + z;
    let alto = memoro.get(klavo);
    if ( alto === undefined ) {
      alto = surGrid(vojaSuproDeKunigo(x, z, [], VOJA_EKSTERA_DUONO, vojoAlteco).supro);
      memoro.set(klavo, alto);
    }
    return alto;
  };
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
  if ( kunKradaj ) {
    const oro = kreiOranMaterialon(0xd8b45a);
    const urboj = aktivajUrboj().length ? aktivajUrboj()
      : [ { nomo: "Ĉefa", arangxaGrando: 4, blokaGrando: "unu", ofsX: 8, ofsZ: 0 } ];
    for ( const u of urboj ) {
      const urbo = konstruiKradanUrbon(sceno,
        { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando as never,
          keuxfhxeso: false, lampoj: false },
        [ u.ofsX, u.ofsZ ], oro, ( u as { aldonajBlokoj?: never[] } ).aldonajBlokoj ?? []);
      kradajKunigoj.push(...urbo.kunigajPunktoj);
      for ( const d of urbo.vojDifinoj ) kradajPunktoj.push(d.pts);
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
  const vojoAlteco = kreiVojoAlton(alteco,
    [ ...kradajKunigoj.map(([ x, z ]) => ( { x, z, direktaj: [] as [ number, number ][] } )),
      ...kunigoj ]);
  const platoCxe = kreiPlatanFunkcion(vojoAlteco);
  const ankroj: NivelaKunigo[] =
    ĉiujKunigoj.map(([ x, z ]) => ( { x, z, alto: platoCxe(x, z) } ));

  const larghoDe = ( i: number ): number => {
    const v = vojoj[ i ];
    return v.pontoLarĝo ?? v.larĝo;
  };
  const profiloDe = ( i: number ): NivelaProfilo =>
    kreiNivelanProfilon(gluitaj[ i ], larghoDe(i) / 4 + VOJA_BORDA_LARĜO,
      vojoAlteco, akvaFino, ankroj);

  return { sceno, vojoj, gluitaj, kunigoj, kunigajPunktoj: ĉiujKunigoj, ankroj,
    vojoAlteco, bazaVojoAlteco, platoCxe, larghoDe, profiloDe };
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
      const t = lo < 0o1/0o1000000000 ? 0 : Math.max(0, Math.min(1, ( s - akum ) / lo));
      return { x: x1 + ( x2 - x1 ) * t, z: z1 + ( z2 - z1 ) * t };
    }
    akum += lo;
  }
  const q = punktoj[ punktoj.length - 1 ];
  return { x: q[ 0 ], z: q[ 1 ] };
}
