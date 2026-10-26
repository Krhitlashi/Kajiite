// ≺⧼ កម្ពស់ផ្លូវ 📏 ⧽≻
// ⟨ ផ្លូវត្រូវមានកម្ពស់តែមួយនៅចំណុចមួយ , ទោះបីជាវាទៅខាងកើតឬខាងជើង ។
// ដូច្នេះកម្ពស់ផ្លូវមិនអាស្រ័យលើទិសដៅរបស់ផ្លូវទេ ៖ វាជាវាលតែមួយលើផែនទី ,
// ហើយផ្លូវគ្រប់ខ្សែអានវាលនោះ ។ ឯកសារនេះជាកន្លែងតែមួយសម្រាប់វាលនោះ ,
// ដូច្នេះហ្គេម , ឆាកសាកល្បង និងឧបករណ៍វាស់អានលេខដូចគ្នា ។ 📃 ⟩
import { surGrid, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO,
  VOJA_TRUA_DUONO } from "./mezuroj.js";
import { vojaSuproDeKunigo } from "./formoj.js";

// ⟪ ចំណុចភ្ជាប់ 📏 ⟫
export interface AltaKunigo {
  x: number;
  z: number;
  direktaj: readonly [ number, number ][];
}

// ⟪ ជម្រាលដី 📏 ⟫
// ⟨ radius តូច និងជម្រាលចោទ ៖ ផ្លូវគិតតែដីខ្ពស់ក្នុងរង្វង់ ៤ ឯកតា ។ បើមិនដូច្នេះ
// ភ្នំមួយឆ្ងាយ ១៥ ឯកតាលើកផ្លូវទាំងរង្វង់ ហើយផ្លូវដើរខ្ពស់លើដីរាបដោយមិនចុះ ។ 📃 ⟩
export const VOJA_TERA_KLINO = 0o1/0o2;
// ⟨ រង្វង់តូច 📃 ⟩ ៖ មុននេះដល់ ៤ ឯកតា ។ ដីជម្រាល ១ ឯកតាក្នុងមួយឯកតា ំ ក្នុង ៤ ឯកតា
// ាំ លើកផ្លូវដល់ ២ ឯកតា ។ ផ្លូវទទឹង ៣.៤ មានកន្លះ ២.៣៥ , ដូច្នេះរង្វង់ ២ ឯកតាគ្រប់គ្រាន់
// ការពារការកាត់ចូលថ្មជិត , ហើយមិនលើកផ្លូវលើស ។ 📃 ⟩
export const VOJA_TERA_RADII = [ 0o1/0o2, 0o1, 0o2 ];
export const VOJA_TERA_ANGULOJ = 0o20;
export const VOJA_ALTECA_KVANTO = 0o4;

// ⟪ វាលកម្ពស់ដី 📏 ⟫
/*បង្កើតវាលកម្ពស់ផ្លូវតាមដី ។ វាលនេះស្មើគ្នាគ្រប់ទិស ៖ គ្មានអ័ក្សណាមួយមានភាពពិសេស
    @param alteco ( function ) - កម្ពស់ដី
    @param akvaFn ( function , optional ) - កម្ពស់ទឹកបូកចន្លោះ , ឬ -Infinity
@returns bazaVojoAlteco ( function ) - កម្ពស់ដីដែលផ្លូវអាន */
// ⟨ ទឹកក៏ជាដី 📃 ⟩ ។ ផ្លូវលើទឹកឈរលើផ្ទៃទឹក , មិនមែនលើបាតទឹកទេ ។ បើវាលនេះ
// មិនដឹងពីទឹក , ចានភ្ជាប់ ចំណត និងចុងផ្លូវគណនាពីបាតទឹក , ដូច្នេះពួកវា
// លិចក្រោមផ្លូវរាប់ឯកតា , ហើយជញ្ជាំងខាងក្រោមខ្ពស់ទទេ ។ 📃 ⟩
export function kreiBazanVojoAlton(
  alteco: ( x: number, z: number ) => number,
  akvaFn?: ( x: number, z: number ) => number
): ( x: number, z: number ) => number {
  const supero = akvaFn
    ? ( x: number, z: number ): number => Math.max(alteco(x, z), akvaFn(x, z))
    : alteco;
  const memoro = new Map<string, number>();
  return ( x: number, z: number ): number => {
    const px = Math.round(x * VOJA_ALTECA_KVANTO) / VOJA_ALTECA_KVANTO;
    const pz = Math.round(z * VOJA_ALTECA_KVANTO) / VOJA_ALTECA_KVANTO;
    const klavo = px + "," + pz;
    let milda = memoro.get(klavo);
    if ( milda === undefined ) {
      milda = supero(px, pz);
      for ( const r of VOJA_TERA_RADII ) {
        for ( let i = 0; i < VOJA_TERA_ANGULOJ; i++ ) {
          const angulo = i * Math.PI * 0o2 / VOJA_TERA_ANGULOJ;
          milda = Math.max(milda,
            supero(px + Math.cos(angulo) * r, pz + Math.sin(angulo) * r) - VOJA_TERA_KLINO * r);
        }
      }
      memoro.set(klavo, milda);
    }
    return Math.max(supero(x, z), milda);
  };
}

// ⟪ ការតម្រឹមនៅចំណុចភ្ជាប់ 📏 ⟫
// ⟨ ចំណុចភ្ជាប់គឺជាកម្រិតមួយសម្រាប់ផ្លូវគ្រប់ខ្សែដែលមកដល់វា ។ ដូច្នេះផ្លូវ
// ត្រូវឡើងដល់កម្រិតនោះនៅជិតវា , ហើយចុះវិញតាមជម្រាលដូចគ្នា ។ បើមិនតម្រឹម ,
// ផ្លូវពីរដែលជួបគ្នាអាចឈរខុសកម្រិត , ហើយចានភ្ជាប់គ្របមិនជិត ។ 📃 ⟩
export const VOJA_KUNIGA_RAMPO = 0o10;
export const VOJA_KUNIGA_CELO = 0o20;
export const VOJA_KUNIGA_RADIUSO = Math.hypot(VOJA_TRUA_DUONO, VOJA_EKSTERA_DUONO);

// ⟪ វាលរួម , ដី និងចំណុចភ្ជាប់ 📏 ⟫
/*បង្កើតវាលកម្ពស់ផ្លូវពេញលេញ ៖ ដី បូកការតម្រឹមចំណុចភ្ជាប់
    @param alteco ( function ) - កម្ពស់ដី
    @param kunigoj ( AltaKunigo [ ] ) - ចំណុចភ្ជាប់ទាំងអស់
    @param akvaFn ( function , optional ) - កម្ពស់ទឹកបូកចន្លោះ , ឬ -Infinity
@returns vojoAlteco ( function ) - កម្ពស់ផ្លូវ */
export function kreiVojoAlton(
  alteco: ( x: number, z: number ) => number,
  kunigoj: readonly AltaKunigo[],
  akvaFn?: ( x: number, z: number ) => number
): ( x: number, z: number ) => number {
  const bazaVojoAlteco = kreiBazanVojoAlton(alteco, akvaFn);
  const fontoj = new Map<string, { x: number; z: number; alto: number }[]>();
  const unikaj = new Map<string, AltaKunigo>();
  for ( const k of kunigoj ) {
    if ( !Number.isFinite(k.x) || !Number.isFinite(k.z) ) continue;
    unikaj.set(k.x + "," + k.z, k);
  }
  for ( const kunigo of unikaj.values() ) {
    const alto = surGrid(vojaSuproDeKunigo(kunigo.x, kunigo.z, kunigo.direktaj,
      VOJA_EKSTERA_DUONO, bazaVojoAlteco).supro) - VOJA_SUPRO_LEVIGXO;
    const ĉelaKlavo = Math.floor(kunigo.x / VOJA_KUNIGA_CELO) + ","
      + Math.floor(kunigo.z / VOJA_KUNIGA_CELO);
    const listo = fontoj.get(ĉelaKlavo) ?? [];
    listo.push({ x: kunigo.x, z: kunigo.z, alto });
    fontoj.set(ĉelaKlavo, listo);
  }
  return ( x, z ) => {
    let alto = bazaVojoAlteco(x, z);
    const cx = Math.floor(x / VOJA_KUNIGA_CELO), cz = Math.floor(z / VOJA_KUNIGA_CELO);
    for ( let dx = -0o1; dx <= 0o1; dx++ ) {
      for ( let dz = -0o1; dz <= 0o1; dz++ ) {
        for ( const fonto of fontoj.get(( cx + dx ) + "," + ( cz + dz )) ?? [] ) {
          const distanco = Math.hypot(x - fonto.x, z - fonto.z);
          if ( distanco > VOJA_KUNIGA_RADIUSO + VOJA_KUNIGA_RAMPO ) continue;
          alto = Math.max(alto, fonto.alto - VOJA_TERA_KLINO
            * Math.max(0, distanco - VOJA_KUNIGA_RADIUSO));
        }
      }
    }
    return alto;
  };
}
