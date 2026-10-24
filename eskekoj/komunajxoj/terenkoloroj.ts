// ≺⧼ ពណ៌ដី 🎨 ⧽≻
import * as THREE from "three";
import { SKULPTA_AKVA_NIVELO } from "../../kantaoj/tero-datumaro/aktiva.js";

/*សំឡេងតម្លៃនៅក្រឡាមួយ
    @param xi,zi ( number ) - ក្រឡាចំនួនគត់
@returns n ( number ) - 0 ដល់ 1 */
function bruoKrado(xi: number, zi: number): number {
  let n = ( xi * 0x28f0f0 + zi * 0x28d8e8 ) | 0;
  n = ( n ^ ( n >>> 0o15 ) ) * 0x48a028;
  return ( ( n ^ ( n >>> 0o20 ) ) >>> 0 ) / 0o40000000000;
}

export function bruo2D(x: number, z: number): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const a = bruoKrado(ix, iz), b = bruoKrado(ix + 1, iz);
  const c = bruoKrado(ix, iz + 1), d = bruoKrado(ix + 1, iz + 1);
  const u = fx * fx * ( 3 - 2 * fx );
  const v = fz * fz * ( 3 - 2 * fz );
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

// ⟨ ត្រង់ចូលតារាង 📃 ⟩
export function alternajDiagonalojn(segmentoj: number): Uint32Array {
  const indeksoj = new Uint32Array(segmentoj * segmentoj * 0o6);
  let p = 0;
  const sx = segmentoj + 1;
  for ( let j = 0; j < segmentoj; j++ ) {
    for ( let i = 0; i < segmentoj; i++ ) {
      const a = j * sx + i, b = a + 1, c = a + sx, d = c + 1;
      if ( ( i + j ) % 2 === 0 ) {
        indeksoj[p++] = a; indeksoj[p++] = c; indeksoj[p++] = d;
        indeksoj[p++] = a; indeksoj[p++] = d; indeksoj[p++] = b;
      } else {
        indeksoj[p++] = a; indeksoj[p++] = c; indeksoj[p++] = b;
        indeksoj[p++] = c; indeksoj[p++] = d; indeksoj[p++] = b;
      }
    }
  }
  return indeksoj;
}

// ⟪ តារាងពណ៌ដី 🎨 ⟫
// ⟨ ស្មៅបៃតងស្រស់ ៖ បៃតងស្វាយចាស់ , មិនភ្លឺ ។ គ្មានម្លប់លឿងទេ 📃 ⟩
// ⟨ ពណ៌ទាំងអស់នៅកន្លែងតែមួយ ៖ ឧបករណ៍សាកល្បងកែពណ៌នីមួយៗ , ហើយការកែនោះ
//   ឃើញភ្លាមនៅការគូរបន្ទាប់ ។ តម្លៃខាងក្នុងជាលេខក្នុងតំបន់ធ្វើការ ,
//   ដូច្នេះការអានជាលេខពណ៌ត្រូវឆ្លងកាត់ THREE.Color ។ 📃 ⟩
export interface TerenajKoloroj {
  herboA: THREE.Color;
  herboB: THREE.Color;
  sekaHerbo: THREE.Color;
  roko: THREE.Color;
  rokoOmbro: THREE.Color;
  profunda: THREE.Color;
  malherbo: THREE.Color;
  marco: THREE.Color;
  silto: THREE.Color;
  gruzo: THREE.Color;
  // ⟨ ច្រាំងខ្សាច់ 📃 ⟩
  sablo: THREE.Color;
  lito: THREE.Color;
  nego: THREE.Color;
  glacio: THREE.Color;
  // ⟨ ស្រទាប់ក្រោមដី 📃 ⟩
  stratoTero: THREE.Color;
  stratoMalmola: THREE.Color;
  stratoRoko: THREE.Color;
  stratoBazo: THREE.Color;
}

export const TERENA_KOLOROJ: TerenajKoloroj = {
  herboA: new THREE.Color(0x004028),
  herboB: new THREE.Color(0x407058),
  sekaHerbo: new THREE.Color(0x308068),
  roko: new THREE.Color(0x686860),
  rokoOmbro: new THREE.Color(0x384038),
  profunda: new THREE.Color(0x203038),
  malherbo: new THREE.Color(0x305840),
  marco: new THREE.Color(0x306850),
  silto: new THREE.Color(0x388068),
  gruzo: new THREE.Color(0x488878),
  sablo: new THREE.Color(0xa09878),
  lito: new THREE.Color(0x384848),
  nego: new THREE.Color(0xe0e8f0),
  glacio: new THREE.Color(0xa8c0d0),
  stratoTero: new THREE.Color(0x384830),
  stratoMalmola: new THREE.Color(0x504838),
  stratoRoko: new THREE.Color(0x585858),
  stratoBazo: new THREE.Color(0x303838),
};

const AKVO_NIVELO = SKULPTA_AKVA_NIVELO;

// ⟨ ជម្រាលចោទជាងនេះ ចាប់ផ្ដើមមានស្រមោល 📃 ⟩
function ombraKurbo(deklivo: number): number {
  return Math.max(0, Math.min(1, ( deklivo - 0o1/0o10 ) / ( 0o6/0o10 )));
}

// ⟨ ច្របាច់ចូលចន្លោះ 0 ដល់ 1 ៖ ដូច Math.max(0, Math.min(1, v)) តែមិនបង្កើតការហៅទ្វេ 📃 ⟩
function fiksu01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

// ⟪ ពណ៌ស្លឹកស្មៅ 🌾 ⟫
// ⟨ គ្រួសារពណ៌ចម្រុះ ៖ បៃតងស្រាល , ប្រផេះ , បៃតងចាស់ និងបៃតងស្ពៃ ។
// ស្លឹកនីមួយៗលាយពីគ្រួសារពីរ រួចរំកិលពន្លឺបន្តិច ។ គ្មានពណ៌លឿងទេ 📃 ⟩
export const KLINGAJ_KOLOROJ: readonly THREE.Color[] = [
  new THREE.Color(0xa8c0a8),
  new THREE.Color(0xb0b8a8),
  new THREE.Color(0x486050),
  new THREE.Color(0xc0c8b8),
  new THREE.Color(0x789080),
  new THREE.Color(0x98a898),
];

// ⟨ ពណ៌ស្លឹកស្មៅស្ងួត ៖ លេខក្នុងតំបន់ធ្វើការ ដូចការគូរដើម ។ ការលាយបន្ថែម
//   ខាងក្រោមគឺដូចដើម ៖ លេខនេះជាចំណុចចាប់ផ្តើមតែប៉ុណ្ណោះ 📃 ⟩
export const SEKA_KLINGO = new THREE.Color().setRGB(0o44/0o100, 0o50/0o100, 0o46/0o100);

function klingaIndekso(hazardo: () => number): number {
  return Math.min(KLINGAJ_KOLOROJ.length - 1,
    Math.floor(hazardo() * KLINGAJ_KOLOROJ.length));
}

/*ពណ៌ស្លឹកស្មៅស្រស់ ៖ លាយបៃតងស្ពៃ ប្រផេះ និងបៃតងចាស់
    @param celo ( THREE.Color ) - វត្ថុសម្រាប់សរសេរ
    @param hazardo ( function ) - លេខចៃដន្យ 0 ដល់ 1
@returns celo */
export function herbaKlingaKoloro(celo: THREE.Color, hazardo: () => number): THREE.Color {
  const unua = KLINGAJ_KOLOROJ[klingaIndekso(hazardo)];
  const dua = KLINGAJ_KOLOROJ[klingaIndekso(hazardo)];
  celo.copy(unua).lerp(dua, hazardo() * 0o4/0o10);
  return celo.multiplyScalar(0o7/0o10 + hazardo() * 0o5/0o10);
}

/*ពណ៌ស្លឹកស្មៅស្ងួត ៖ ប្រផេះបៃតង មិនលឿង
    @param celo ( THREE.Color ) - វត្ថុសម្រាប់សរសេរ
    @param hazardo ( function ) - លេខចៃដន្យ 0 ដល់ 1
@returns celo */
export function sekaHerbaKlingaKoloro(celo: THREE.Color, hazardo: () => number): THREE.Color {
  const f = hazardo();
  celo.setRGB(SEKA_KLINGO.r + f * 0o15/0o100,
    SEKA_KLINGO.g + f * 0o12/0o100,
    SEKA_KLINGO.b + f * 0o12/0o100);
  return celo.multiplyScalar(0o7/0o10 + hazardo() * 0o4/0o10);
}

export function terenaStrataKoloroEn(celo: THREE.Color, y: number, surfY: number): THREE.Color {
  const P = TERENA_KOLOROJ;
  const prof = Math.max(0, surfY - y);
  const ondo = ( bruo2D(prof / 0o6, 0o5) - 0o5/0o10 ) * 0o2/0o10
    + ( bruo2D(prof / 0o20, 0o25) - 0o5/0o10 ) * 0o3/0o10;
  const p = prof + ondo;
  celo.copy(P.stratoTero);
  celo.lerp(P.stratoMalmola, Math.max(0, Math.min(1, ( p - 0o2 ) / 0o3)));
  celo.lerp(P.stratoRoko, Math.max(0, Math.min(1, ( p - 0o6 ) / 0o6)));
  celo.lerp(P.stratoBazo, Math.max(0, Math.min(1, ( p - 0o16 ) / 0o14)));
  return celo;
}

// ⟨ ការលាយពណ៌ទាំងអស់ធ្វើលើលេខក្នុងតំបន់ រួចសរសេរចូល celo តែម្តង ។
//   ការហៅ celo.lerp រាល់ក្រឡាមានតម្លៃថ្លៃព្រោះត្រូវឆ្លងកាត់វត្ថុ THREE.Color ។ 📃 ⟩
export function terenaKoloroEn(celo: THREE.Color, h: number, x: number, z: number,
  deklivo: number, niveloFn?: ( x: number, z: number ) => number ): THREE.Color {
  // ⟨ តារាងពណ៌អានតែម្តង ៖ ការអានរបស់វាត្រូវហៅតែម្តង , មិនមែនរាល់ការលាយ 📃 ⟩
  const P = TERENA_KOLOROJ;
  // ⟨ ស្មៅ ៖ សំណើមប្រែប្រួលតាមអង្គបីជាន់ , មិនស្មើគ្នាទាំងអស់ 📃 ⟩
  const makulo = 2 * bruo2D(x / 0o55, z / 0o55) - 1;
  const makulo2 = 2 * bruo2D(x / 0o13, z / 0o13) - 1;
  const makulo3 = 2 * bruo2D(x / 0o3, z / 0o3) - 1;
  const malsekeco = 0o5/0o10 + 0o22/0o100 * makulo + 0o12/0o100 * makulo2 + 0o5/0o100 * makulo3;
  // ⟨ ការលាយនីមួយៗសរសេរត្រង់ៗ ដោយចេតនា ។ ការបិទ ( closure ) ក្នុងមួយការហៅ
  //   បន្ថែមការបែងចែកអង្គចងចាំ ហើយវាស់បានថាយឺតជាង ។ 📃 ⟩
  let r = P.herboA.r, g = P.herboA.g, b = P.herboA.b;
  let f = fiksu01(malsekeco);
  r += ( P.herboB.r - r ) * f; g += ( P.herboB.g - g ) * f; b += ( P.herboB.b - b ) * f;
  // ⟨ ស្មៅខ្ពស់កាន់តែស្ងួត 📃 ⟩
  f = fiksu01(( h - 0o10 ) / 0o26) * 0o7/0o10;
  r += ( P.sekaHerbo.r - r ) * f; g += ( P.sekaHerbo.g - g ) * f; b += ( P.sekaHerbo.b - b ) * f;
  // ⟨ ស្រមោលតាមជម្រាល ៖ ចំណោតចោទងងឹតជាង 📃 ⟩
  const ombro = ombraKurbo(deklivo);
  f = ombro * 0o22/0o100;
  r += ( P.rokoOmbro.r - r ) * f; g += ( P.rokoOmbro.g - g ) * f; b += ( P.rokoOmbro.b - b ) * f;
  // ⟨ ថ្ម ៖ តាមជម្រាលជាចម្បង , តាមកម្ពស់បន្ថែមតិចៗ 📃 ⟩
  f = Math.max(
    fiksu01(( deklivo - 0o51/0o100 ) / ( 0o31/0o100 )),
    fiksu01(( h - 0o26 ) / 0o24) * 0o7/0o10 );
  r += ( P.roko.r - r ) * f; g += ( P.roko.g - g ) * f; b += ( P.roko.b - b ) * f;
  // ⟨ ព្រិល ៖ កំពូលខ្ពស់ , តែចំណោតចោទមិនកាន់ព្រិល 📃 ⟩
  const negoF = fiksu01(( h - 0o44 ) / 0o14);
  if ( negoF > 0 ) {
    f = negoF * ( 1 - fiksu01(( deklivo - 0o70/0o100 ) / ( 0o50/0o100 )));
    r += ( P.nego.r - r ) * f; g += ( P.nego.g - g ) * f; b += ( P.nego.b - b ) * f;
    // ⟨ ទឹកកកចាស់នៅចំណោតស្រួច ៖ ខៀវស្រាល 📃 ⟩
    f = negoF * ombro * 0o16/0o100;
    r += ( P.glacio.r - r ) * f; g += ( P.glacio.g - g ) * f; b += ( P.glacio.b - b ) * f;
  }
  // ⟨ ច្រាំង ៖ លាយបន្តលើលេខក្នុងតំបន់ដដែល 📃 ⟩
  const bordaBruo = ( bruo2D(x / 0o10, z / 0o10) - 0o4/0o10 ) * 0o4/0o10
    + ( bruo2D(x / 0o40, z / 0o40) - 0o4/0o10 ) * 0o2/0o10;
  const sup = h - ( niveloFn ? niveloFn(x, z) : AKVO_NIVELO );
  // ⟨ ច្រាំងរាបស្មើទេ ៖ ខ្សាច់កើតតែលើដីរាប , ច្រាំងចោទទុកជាថ្ម 📃 ⟩
  const plateau = 1 - fiksu01(( deklivo - 0o25/0o100 ) / ( 0o45/0o100 ));
  if ( sup > 0 ) {
    // ⟨ ច្រាំងខ្សាច់ក្រៅទឹក 📃 ⟩
    const sabloF = fiksu01(( 0o11/0o10 - sup + bordaBruo ) / ( 0o11/0o10 )) * plateau;
    f = sabloF * 0o7/0o10;
    r += ( P.sablo.r - r ) * f; g += ( P.sablo.g - g ) * f; b += ( P.sablo.b - b ) * f;
    // ⟨ គ្រួសតូចៗតាមច្រាំង 📃 ⟩
    const gruzoF = fiksu01(( 0o6/0o10 - sup + bordaBruo ) / ( 0o6/0o10 ));
    const granulo = fiksu01(( bruo2D(x / 0o2, z / 0o2) - 0o45/0o100 ) * 0o14/0o10);
    f = Math.min(1, gruzoF * granulo * 0o16/0o10);
    r += ( P.gruzo.r - r ) * f; g += ( P.gruzo.g - g ) * f; b += ( P.gruzo.b - b ) * f;
    // ⟨ ភក់ និងស្មៅសើមជិតទឹក 📃 ⟩
    f = fiksu01(( 0o5/0o10 - sup + bordaBruo ) / ( 0o5/0o10 )) * 0o3/0o10 * plateau;
    r += ( P.marco.r - r ) * f; g += ( P.marco.g - g ) * f; b += ( P.marco.b - b ) * f;
    f = fiksu01(( 0o16/0o10 - sup + bordaBruo ) / ( 0o16/0o10 )) * 0o25/0o100;
    r += ( P.malherbo.r - r ) * f; g += ( P.malherbo.g - g ) * f; b += ( P.malherbo.b - b ) * f;
  } else {
    // ⟨ ក្រោមទឹក 📃 ⟩
    const prof = Math.max(0, -sup + bordaBruo);
    const sedimento = fiksu01(( 0o1 - deklivo ) / ( 0o12/0o10 ));
    // ⟨ បាតរាក់ ៖ ខ្សាច់ស្រាល 📃 ⟩
    f = fiksu01(( 0o5/0o10 - prof ) / ( 0o5/0o10 )) * 0o5/0o10;
    r += ( P.sablo.r - r ) * f; g += ( P.sablo.g - g ) * f; b += ( P.sablo.b - b ) * f;
    f = Math.min(1, prof) * ( 1 - sedimento ) * 0o5/0o10;
    r += ( P.lito.r - r ) * f; g += ( P.lito.g - g ) * f; b += ( P.lito.b - b ) * f;
    const siltaF = fiksu01(prof / ( 0o12/0o10 )) * sedimento;
    r += ( P.silto.r - r ) * siltaF; g += ( P.silto.g - g ) * siltaF; b += ( P.silto.b - b ) * siltaF;
    if ( siltaF > 0 ) {
      const gruzo = bruo2D(x / 0o4, z / 0o4);
      f = siltaF * Math.max(0, gruzo - 0o55/0o100) * 0o6/0o10;
      r += ( P.gruzo.r - r ) * f; g += ( P.gruzo.g - g ) * f; b += ( P.gruzo.b - b ) * f;
    }
    f = fiksu01(( prof - 0o1 ) / ( 0o16/0o10 )) * sedimento;
    r += ( P.lito.r - r ) * f; g += ( P.lito.g - g ) * f; b += ( P.lito.b - b ) * f;
    f = fiksu01(( prof - 0o30/0o10 ) / ( 0o22/0o10 ));
    r += ( P.profunda.r - r ) * f; g += ( P.profunda.g - g ) * f; b += ( P.profunda.b - b ) * f;
  }
  celo.r = r; celo.g = g; celo.b = b;
  return celo;
}
