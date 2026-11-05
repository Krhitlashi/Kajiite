// ≺⧼ ទម្រង់ផ្លូវ 📐 ⧽≻
import * as THREE from "three";
import { KORNA_ENA_R, KORNA_R, surGrid, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO,
  VOJA_TERA_KLINO, VOJA_TRUA_DUONO, vojaLarghoDuono } from "./mezuroj.js";

// ⟪ កម្ពស់ផ្ទៃផ្លូវ 📏 ⟫
/*កម្ពស់ខ្ពស់បំផុតក្រោមផ្ទៃផ្លូវ តាមដី ។ អានដីជុំវិញផ្លូវទាំងមូល ,
   ដូច្នេះផ្លូវមិនកប់ក្នុងដីខ្ពស់ចំហៀង ។
    @param x, z ( number ) - ចំណុច
    @param larĝo ( number ) - ទទឹងផ្លូវ
    @param heightFn ( function ) - កម្ពស់ដី ឬវាលផ្លូវ
@returns supro ( number ) - កម្ពស់ផ្ទៃផ្លូវ */
export function vojaSupro( x: number, z: number, larĝo: number,
  heightFn: ( x: number, z: number ) => number
): number {
  const duon = vojaLarghoDuono( larĝo );
  let maks = heightFn(x, z);
  for ( let i = 0; i < 0o10; i++ ) {
    const ang = i * Math.PI / 0o4;
    maks = Math.max(maks, heightFn(x + Math.cos(ang) * duon, z + Math.sin(ang) * duon));
  }
  return maks + VOJA_SUPRO_LEVIGXO;
}

/**
 * សាងសង់ផ្នែកផ្លូវជាជំហានរវាងចំណុចផ្លូវពីរ។
 * យកគំរូកម្ពស់ដីរាល់ ~4 ឯកតា ដើម្បីឱ្យផ្លូវបង្កើតជំហានតាមធម្មជាតិ
 * នៅកន្លែងដីជម្រាល ហើយរលូនលើដីរាបស្មើ។
 */
export function kreiArkPunktojn(cx: number, cz: number, r: number, sx: number, sz: number): [ number, number ][] {
  const punktoj: [ number, number ][] = [];
  const pasxoj = 0o40;
  const a0 = sx > 0 ? 0 : Math.PI;
  const a1 = sz > 0 ? Math.PI / 2 : ( sx > 0 ? -Math.PI / 2 : 3 * Math.PI / 2 );
  for ( let i = 0; i <= pasxoj; i++ ) {
    const ang = a0 + ( a1 - a0 ) * ( i / pasxoj );
    punktoj.push([ cx + r * Math.cos(ang), cz + r * Math.sin(ang) ]);
  }
  return punktoj;
}

export function kreiKvaronanRingon(cx: number, cz: number, rEna: number, rEkstera: number, sx: number, sz: number): [ number, number ][] {
  return [ ...kreiArkPunktojn(cx, cz, rEkstera, sx, sz),
    ...kreiArkPunktojn(cx, cz, rEna, sx, sz).reverse() ];
}

function specimeniRotitajn(
  x: number,
  z: number,
  duono: number,
  rotacio: number,
  heightFn: ( x: number, z: number ) => number
): { maksimumo: number; minimumo: number } {
  const kos = Math.cos( rotacio ), sin = Math.sin( rotacio );
  let maksimumo = -Infinity, minimumo = Infinity;
  for ( const lx of [ -duono, duono ] ) for ( const lz of [ -duono, duono ] ) {
    const h = heightFn( x + kos * lx - sin * lz, z + sin * lx + kos * lz );
    maksimumo = Math.max( maksimumo, h );
    minimumo = Math.min( minimumo, h );
  }
  return { maksimumo, minimumo };
}

// ⟨ ហេតុអ្វីអនុគមន៍ដោយឡែក 📃 ⟩
export function plataAltoj(x: number, z: number, rotacio: number,
  heightFn: ( x: number, z: number ) => number
): { supro: number; minimumo: number } {
  const altoj = specimeniRotitajn(x, z, VOJA_EKSTERA_DUONO, rotacio, heightFn);
  return { supro: Math.max( heightFn(x, z), altoj.maksimumo ) + VOJA_SUPRO_LEVIGXO,
    minimumo: altoj.minimumo };
}

// ⟪ កម្រិតផ្លូវនៅចំណុចភ្ជាប់ 📏 ⟫
// ⟨ កម្រិតផ្លូវនៅចំណុចភ្ជាប់ត្រូវដូចកម្រិតផ្លូវដែលឆ្លងចូលមក ដើម្បីកុំឱ្យចានភ្ជាប់លិចទៅផ្លូវ ។
// ការស្ថានភាពនេះជាមូលដ្ឋានដែលប្រើសម្រាបផ្លូវ ចានភ្ជាប់ និងជណ្តើរចំណត ដើម្បីឱ្យពួកគេជាមួយគ្នា ។ 📃 ⟩
// ⟨ គ្រប់ជ្រុង 📃 ⟩ ៖ ចានភ្ជាប់មិនមែនត្រង់ដៃផ្លូវទេ ។ ជ្រុងរវាងដៃពីរក៏ជាផ្ទៃចានដែរ ,
// ដូច្នេះកម្ពស់ត្រូវអានគែមជុំវិញទាំងមូល ។ បើអានតែដៃ , ដីខ្ពស់នៅជ្រុងមួយ
// នៅក្រោមចាន , ហើយដីនោះចាក់ចេញក្រោមចាន ។ 📃 ⟩
// ⟨ ជម្រាលដីសម្រាប់គែម 📏 ⟩ ៖ គែមត្រូវអានដូចវាលកម្ពស់ផ្លូវ ។ ដីដែលឆ្ងាយ r
// ឯកតាអាចឡើងបាន VOJA_TERA_KLINO * r ឯកតា , ដូច្នេះវាត្រូវដកចំនួននោះ
// មុនពេលប្រៀបធៀប ។ មុននេះចានអានគែមឆៅ , ដូច្នេះចាននៅលើជម្រាលរាបស្មើ
// ឡើងដល់កម្ពស់ជើងភ្នំ ហើយផ្លូវដែលចេញពីវាអណ្តែតខ្ពស់លើដីរាប់ឯកតា ,
// ហើយជញ្ជាំងក្រោមវាខ្ពស់ ។ ឥឡូវចាននៅលើជម្រាលស្មើនឹងដីកណ្តាលរបស់វា ,
// ហើយឡើងតែលើដីដែលពិតជាខ្ពស់ជាងជម្រាលនោះ ( ពំនូក , ថ្ម ) ។ 📃 ⟩
export function vojaSuproDeKunigo(
  x: number,
  z: number,
  direktoj: readonly [ number, number ][],
  radiuso: number,
  heightFn: ( x: number, z: number ) => number
): { supro: number; minimumo: number } {
  let maks = heightFn( x, z ), minimumo = maks;
  const konsideru = ( px: number, pz: number, r: number ): void => {
    const h = heightFn( px, pz );
    if ( h - VOJA_TERA_KLINO * r > maks ) maks = h - VOJA_TERA_KLINO * r;
    if ( h < minimumo ) minimumo = h;
  };
  // ⟨ រង្វង់ជុំវិញចាន 📏 ⟩ ៖ គែមចានទាំងមូល , មិនមែនតែមាត់ដៃ ។
  for ( const r of [ radiuso, VOJA_TRUA_DUONO ] ) {
    for ( let i = 0; i < 0o20; i++ ) {
      const angulo = i * Math.PI * 0o2 / 0o20;
      konsideru( x + Math.cos(angulo) * r, z + Math.sin(angulo) * r, r );
    }
  }
  for ( const [ dx, dz ] of direktoj ) {
    const longo = Math.hypot( dx, dz );
    if ( longo < 0o1/0o1000 ) continue;
    const ux = dx / longo, uz = dz / longo;
    const px = -uz * radiuso, pz = ux * radiuso;
    // ⟨ ចំណុចដែលផ្លូវប៉ះចានភ្ជាប់ ៖ កម្រិតផ្លូវត្រូវស្មើគ្នានឹងចានភ្ជាប់នៅចំណុចនេះ ។ 📃 ⟩
    const ex = x + ux * VOJA_TRUA_DUONO, ez = z + uz * VOJA_TRUA_DUONO;
    for ( const f of [ -1, 1 ] ) {
      for ( const [ bx, bz, br ] of [ [ x + px * f, z + pz * f, radiuso ],
        [ ex + px * f, ez + pz * f, Math.hypot(VOJA_TRUA_DUONO, radiuso) ] ] as [ number, number, number ][]) {
        konsideru( bx, bz, br );
      }
    }
  }
  return { supro: maks + VOJA_SUPRO_LEVIGXO, minimumo };
}

// ⟪ កម្ពស់ចានតាមដៃ 📏 ⟫
// ⟨ ចានមួយ កម្ពស់ច្រើន 📃 ⟩ ៖ ចានភ្ជាប់នៅជ្រុងផ្លូវបួន ។ ដីសងខាងខុសកម្រិត ,
// ដូច្នេះមាត់ដៃនីមួយៗមានកម្រិតផ្លូវរៀងខ្លួន ។ បើចានយកកម្រិតខ្ពស់បំផុតតែមួយ ,
// ដៃទាបត្រូវឡើងដល់ចានក្នុងចម្ងាយខ្លី , ហើយក្លាយជាជញ្ជាំងឈរ ។
// ដូច្នេះចានរក្សាកម្ពស់មួយក្នុងមួយដៃ , ហើយផ្ទៃចានលាយរវាងដៃទាំងនោះ ។ 📃 ⟩
// ⟨ អ្នកអានវាលកម្ពស់ដូចគ្នា 📃 ⟩ ៖ ផ្លូវ , ចាន , និងឧបករណ៍វាស់អានតម្លៃនេះតែម្តង ។
// បើអ្នកម្នាក់យកកម្រិតតែមួយ , មាត់ដៃនោះខុសកម្រិតពីអ្នកផ្សេង ។ 📃 ⟩
export interface PlataNivelo {
  // ⟨ កម្ពស់កណ្តាល ៖ ប្រើពេលគ្មានដៃ , និងនៅចំណុចកណ្តាលដែលទិសមិនច្បាស់ ។ 📃 ⟩
  alto: number;
  // ⟨ កម្ពស់មាត់ដៃនីមួយៗ ។ 📃 ⟩
  altoj: readonly number[];
  // ⟨ មុំដៃ , តម្រៀបឡើងលើក្នុងចន្លោះ [ 0 , 2π ) ។ 📃 ⟩
  anguloj: readonly number[];
  // ⟨ កន្លះមុំមាត់ដៃ ៖ ផ្ទៃចានរាបស្មើក្នុងចន្លោះនេះ ។ 📃 ⟩
  duonoj: readonly number[];
}

const DUOBLA_PI = Math.PI * 0o2;
const ANGULA_TOLERO = 0o1 / 0o1000;

/*នាំមុំទៅចន្លោះ 0 ដល់ 2π
    @param angulo ( number ) - មុំរ៉ាដ្យង់
@returns angulo ( number ) - មុំក្នុងចន្លោះ [ 0 , 2π ) */
export function normAngulo(angulo: number): number {
  const r = angulo % DUOBLA_PI;
  return r < 0 ? r + DUOBLA_PI : r;
}

/*មុំខ្លីពី b ទៅ a
    @param a, b ( number ) - មុំរ៉ាដ្យង់
@returns delta ( number ) - មុំក្នុងចន្លោះ ( -π , π ] */
function angulaDif(a: number, b: number): number {
  let d = ( a - b ) % DUOBLA_PI;
  if ( d > Math.PI ) d -= DUOBLA_PI;
  if ( d <= -Math.PI ) d += DUOBLA_PI;
  return d;
}

/*កម្ពស់គែមចានតាមទិស
    @param nivelo ( PlataNivelo ) - កម្ពស់ដៃរបស់ចាន
    @param angulo ( number ) - ទិសពីកណ្តាលចាន
@returns alto ( number ) - កម្ពស់គែមចានតាមទិសនោះ */
// ⟨ មាត់រាប ចន្លោះជម្រាល 📏 ⟩ ៖ តាមទិសមាត់ដៃ , ផ្ទៃចានរាបស្មើនឹងកម្រិតដៃនោះ ,
// ព្រោះផ្ទៃផ្លូវរាបស្មើពេញទទឹង ។ រវាងមាត់ពីរ , ផ្ទៃឡើងចុះរលូន ។
// បើលាយត្រង់ៗ , គែមមាត់មានជ្រុងស្រួច , ហើយឃើញជាខ្សែនៅលើចាន ។ 📃 ⟩
function plataRimo(nivelo: PlataNivelo, angulo: number): number {
  const n = nivelo.altoj.length;
  if ( n === 0 ) return nivelo.alto;
  if ( n === 1 ) return nivelo.altoj[0];
  const a = normAngulo(angulo);
  for ( let i = 0; i < n; i++ ) {
    if ( Math.abs(angulaDif(a, nivelo.anguloj[i])) <= nivelo.duonoj[i] + ANGULA_TOLERO )
      return nivelo.altoj[i];
  }
  for ( let i = 0; i < n; i++ ) {
    const j = ( i + 1 ) % n;
    const komenco = nivelo.anguloj[i] + nivelo.duonoj[i];
    let fino = nivelo.anguloj[j] - nivelo.duonoj[j];
    if ( j === 0 ) fino += DUOBLA_PI;
    if ( fino <= komenco + ANGULA_TOLERO ) continue;
    let q = a;
    if ( q < komenco ) q += DUOBLA_PI;
    if ( q < komenco || q > fino ) continue;
    const t = ( q - komenco ) / ( fino - komenco );
    const glata = t * t * ( 3 - 0o2 * t );
    return nivelo.altoj[i] + ( nivelo.altoj[j] - nivelo.altoj[i] ) * glata;
  }
  // ⟨ មាត់ជាន់គ្នា 📃 ⟩ ៖ ដៃជិតគ្នាពេក , គ្មានចន្លោះលាយ ។ យកដៃជិតបំផុត ។
  let plej = Infinity, rez = nivelo.alto;
  for ( let i = 0; i < n; i++ ) {
    const d = Math.abs(angulaDif(a, nivelo.anguloj[i]));
    if ( d < plej ) { plej = d; rez = nivelo.altoj[i]; }
  }
  return rez;
}

/*កម្ពស់ផ្ទៃចានតាមទិស និងចម្ងាយ
    @param nivelo ( PlataNivelo ) - កម្ពស់ដៃរបស់ចាន
    @param angulo ( number ) - ទិសពីកណ្តាលចាន
    @param distanco ( number , optional ) - ចម្ងាយពីកណ្តាល , ឬ Infinity សម្រាប់គែម
@returns alto ( number ) - កម្ពស់ផ្ទៃចាន */
// ⟨ កណ្តាលមួយ គែមជុំវិញ 📐 ⟩ ៖ ផ្ទៃចានជាកង្ហារពីកណ្តាលទៅគែម ។ កណ្តាលមានកម្ពស់តែមួយ ,
// ដូច្នេះត្រូវលាយពីកណ្តាលទៅគែម ។ បើលោតភ្លាមពីកម្ពស់កណ្តាលទៅកម្ពស់ដៃ ,
// ផ្លូវដែលឆ្លងកណ្តាលឃើញជំហានខ្ពស់មួយនៅចំណុចនោះ ។ 📃 ⟩
export function plataAltoCxe(nivelo: PlataNivelo, angulo: number,
  distanco: number = Infinity): number {
  const rimo = plataRimo(nivelo, angulo);
  if ( !Number.isFinite(distanco) ) return rimo;
  const t = Math.min(1, Math.max(0, distanco / VOJA_TRUA_DUONO));
  return nivelo.alto + ( rimo - nivelo.alto ) * t;
}

/*កម្ពស់ផ្លូវនៅមាត់ដៃនីមួយៗ
    @param x, z ( number ) - ចំណុចកណ្តាលចាន
    @param direktoj ( [ number , number ] [ ] ) - ទិសដៃដៃ
    @param duonoj ( number [ ] ) - កន្លះទទឹងផ្ទៃផ្លូវតាមលំដាប់ដូច direktoj
    @param heightFn ( function ) - វាលកម្ពស់ដី
@returns altoj ( number [ ] ) - កម្ពស់មាត់ដៃលើក្រឡាជំហាន */
// ⟨ អានពេញទទឹងមាត់ 📏 ⟩ ៖ ផ្ទៃផ្លូវរាបស្មើពេញទទឹង , ដូច្នេះកម្រិតមាត់គឺ
// ខ្ពស់បំផុតនៅតាមខ្សែមាត់ ។ បើអានតែកណ្តាល , គែមខ្ពស់ជាងផ្លូវ , ហើយផ្លូវកប់ ។ 📃 ⟩
// ⟨ មាត់អានពីរជាន់ 📏 ⟩ ៖ មាត់ចាននិងមាត់ក្រៅមាត់បន្តិច ។ បើដីឡើងចុះ ,
// ការអានតែមួយជាន់អាចធ្លាក់ក្នុងរណ្តៅតូច , ហើយចាននៅទាបជាងផ្លូវមួយជំហាន ។ 📃 ⟩
export function kunigajBrakAltoj(x: number, z: number,
  direktoj: readonly [ number, number ][], duonoj: readonly number[],
  heightFn: ( x: number, z: number ) => number
): number[] {
  const rez: number[] = [];
  for ( let b = 0; b < direktoj.length; b++ ) {
    const [ dx, dz ] = direktoj[ b ];
    const duono = duonoj[ b ] ?? VOJA_EKSTERA_DUONO;
    const longo = Math.hypot(dx, dz);
    if ( longo < ANGULA_TOLERO ) { rez.push(NaN); continue; }
    const ux = dx / longo, uz = dz / longo;
    const nx = -uz, nz = ux;
    let maks = -Infinity;
    for ( const laux of [ 0o0, 0o1/0o4 ] ) {
      const r = VOJA_TRUA_DUONO + laux;
      for ( const flanko of [ -1, 0, 1 ] ) {
        maks = Math.max(maks,
          heightFn(x + ux * r + nx * flanko * duono, z + uz * r + nz * flanko * duono));
      }
    }
    rez.push(Number.isFinite(maks) ? surGrid(maks) : NaN);
  }
  return rez;
}

/*រៀបកម្ពស់ដៃជាកម្រិតចានតាមទិស
    @param direktoj ( [ number , number ] [ ] ) - ទិសដៃដៃ
    @param duonoj ( number [ ] ) - កន្លះទទឹងផ្លូវតាមលំដាប់
    @param altoj ( number [ ] ) - កម្ពស់មាត់ដៃតាមលំដាប់
    @param fallback ( number ) - កម្ពស់កណ្តាលពេលគ្មានដៃ
@returns nivelo ( PlataNivelo ) - កម្រិតចានតាមទិស */
// ⟨ តម្រៀបតាមមុំ 📐 ⟩ ៖ ការលាយកម្ពស់រវាងដៃពីរត្រូវការមុំតម្រៀបឡើងលើ ។
// ដៃដែលមានមុំស្មើគ្នាត្រូវលុប , ព្រោះចន្លោះរវាងពួកវាសូន្យ ហើយការលាយបែងដោយសូន្យ ។ 📃 ⟩
export function kreiPlataNivelon(
  direktoj: readonly [ number, number ][], duonoj: readonly number[],
  altoj: readonly number[], fallback: number
): PlataNivelo {
  const paroj: { ang: number; alto: number; duono: number }[] = [];
  for ( let b = 0; b < direktoj.length; b++ ) {
    const alto = altoj[ b ];
    const [ dx, dz ] = direktoj[ b ];
    if ( !Number.isFinite(alto) || Math.hypot(dx, dz) < ANGULA_TOLERO ) continue;
    const ang = normAngulo(Math.atan2(dz, dx));
    if ( paroj.some(p => Math.abs(angulaDif(p.ang, ang)) < ANGULA_TOLERO) ) continue;
    const duono = duonoj[ b ] ?? VOJA_EKSTERA_DUONO;
    paroj.push({ ang, alto, duono: Math.atan2(duono, VOJA_TRUA_DUONO) });
  }
  paroj.sort(( p, q ) => p.ang - q.ang);
  if ( paroj.length === 0 )
    return { alto: fallback, altoj: [], anguloj: [], duonoj: [] };
  return {
    alto: paroj.reduce(( s, p ) => s + p.alto, 0 ) / paroj.length,
    altoj: paroj.map(p => p.alto),
    anguloj: paroj.map(p => p.ang),
    duonoj: paroj.map(p => p.duono),
  };
}

export function kreiEnanKornanArkon(sx: number, sz: number, ekstera: number): [ number, number ][] {
  return kreiArkPunktojn(sx * ( ekstera + KORNA_R ), sz * ( ekstera + KORNA_R ), KORNA_ENA_R, -sx, -sz).reverse();
}

export function kreiEksteranKurbanArkon(sx: number, sz: number, ekstera: number): [ number, number ][] {
  return kreiArkPunktojn(sx * ( ekstera + KORNA_R ), sz * ( ekstera + KORNA_R ), KORNA_R, -sx, -sz);
}

export function kreiFormonElPunktoj(punktoj: [ number, number ][]): THREE.Shape {
  const formaj = punktoj.map(p => [ p[0], -p[1] ] as [ number, number ]);
  let areo = 0;
  for ( let i = 0; i < formaj.length; i++ ) {
    const a = formaj[i], b = formaj[( i + 1 ) % formaj.length];
    areo += a[0] * b[1] - b[0] * a[1];
  }
  if ( areo < 0 ) formaj.reverse();
  const formo = new THREE.Shape();
  formo.moveTo(formaj[0][0], formaj[0][1]);
  for ( let i = 1; i < formaj.length; i++ ) formo.lineTo(formaj[i][0], formaj[i][1]);
  formo.closePath();
  return formo;
}

// ⟪ ប្រអប់ផ្លូវតាមដី 📐 ⟫
/*បង្កើតប្រអប់នៃចម្រៀកផ្លូវ ៖ កំពូល និងបាតអាចជម្រាលតាមដីសងខាង
    @param w ( number ) - ទទឹងខ្សែ
    @param l ( number ) - ប្រវែងចម្រៀក
    @param suproj ( [ number , number , number , number ] ) - កម្ពស់កំពូល តាមលំដាប់ ដើមឆ្វេង , ដើមស្តាំ , ចុងឆ្វេង , ចុងស្តាំ
    @param fundoj ( [ number , number , number , number ] ) - កម្ពស់បាត តាមលំដាប់ដូចគ្នា
    @param ofsetoX ( number ) - អុហ្វសិតចំហៀងនៃខ្សែ
@returns geometrio ( BufferGeometry ) - ប្រអប់ដែលមានកម្ពស់ដាច់ខាត */
// ⟨ ហេតុអ្វីកំពូលជម្រាល 📃 ⟩ ៖ ផ្ទៃផ្លូវសំប៉ែត , តែដីជម្រាលចំហៀង ។ បើកំពូលសំប៉ែត ,
// គែមម្ខាងខ្ពស់លើដីច្រើន , ហើយឃើញជាជញ្ជាំងថ្មនៅក្រោមគែមផ្លូវគ្រប់កន្លែង
// ដែលដីជម្រាល ។ កំពូលជម្រាលតាមដីធ្វើឱ្យគែមផ្លូវជិតដី , ដូច្នេះជញ្ជាំងខ្លី ។ 📃 ⟩
// ⟪ មុខចំហៀងឈរ 📐 ⟫
// ⟨ គែមផ្លូវឈរត្រង់ 📏 ⟩ ៖ មុខចំហៀងជាជញ្ជាំងថ្មឈរ , ដូចជណ្តើរថ្ម ។
// ស្មាជម្រាលត្រូវបានដកចេញ ៖ វាធ្វើឱ្យគែមផ្លូវផ្អៀង ហើយផ្លូវមើលទៅធំទូលាយ ។ 📃 ⟩
export function kreiSegmentGeometrion(w: number, l: number,
  suproj: readonly [ number, number, number, number ],
  fundoj: readonly [ number, number, number, number ],
  ofsetoX: number = 0): THREE.BufferGeometry {
  const x0 = -w / 2 + ofsetoX, x1 = w / 2 + ofsetoX;
  const y0 = -l / 2, y1 = l / 2;
  const p: [ number, number, number ][] = [
    [ x0, y0, suproj[ 0 ] ], [ x1, y0, suproj[ 1 ] ],
    [ x1, y1, suproj[ 2 ] ], [ x0, y1, suproj[ 3 ] ],
    [ x0, y0, fundoj[ 0 ] ], [ x1, y0, fundoj[ 1 ] ],
    [ x1, y1, fundoj[ 2 ] ], [ x0, y1, fundoj[ 3 ] ],
  ];
  // ⟨ ត្រីកោណតាមលំដាប់ក្រៅ 📃 ⟩ ៖ កំពូល , បាត , មុខ , ខ្នង , ឆ្វេង , ស្តាំ ។
  // ⟨ UV តាមមុខ 📏 ⟩ ៖ មុននេះ UV ជាទីតាំង ( x , y ) ។ នៅមុខចំហៀង x ថេរ ,
  // ដូច្នេះវាយនភាពត្រូវលាតជាបន្ទាត់មួយ ។ ដូច្នេះជំហានដែលមានមុខខ្ពស់
  // បង្ហាញវាយនភាពលាត ។ ឥឡូវមុខនីមួយៗមាន UV តាមទិសផ្ទៃរបស់វា ៖
  // ផ្ទៃខាងលើ/ក្រោម តាម ( x , y ) , មុខចំហៀង តាម ( បណ្តោយ , កម្ពស់ ) ។ 📃 ⟩
  const kvadratoj: { ind: [ number, number, number, number ]; uv: ( q: [ number, number, number ] ) => [ number, number ] }[] = [
    { ind: [ 0, 1, 2, 3 ], uv: q => [ q[ 0 ], q[ 1 ] ] },
    { ind: [ 4, 7, 6, 5 ], uv: q => [ q[ 0 ], q[ 1 ] ] },
    { ind: [ 0, 4, 5, 1 ], uv: q => [ q[ 0 ], q[ 2 ] ] },
    { ind: [ 3, 2, 6, 7 ], uv: q => [ q[ 0 ], q[ 2 ] ] },
    { ind: [ 0, 3, 7, 4 ], uv: q => [ q[ 1 ], q[ 2 ] ] },
    { ind: [ 1, 5, 6, 2 ], uv: q => [ q[ 1 ], q[ 2 ] ] },
  ];
  const trianguloj: number[] = [];
  const uvDe: (( q: [ number, number, number ] ) => [ number, number ])[] = [];
  for ( const k of kvadratoj ) {
    for ( const t of [ [ 0, 1, 2 ], [ 0, 2, 3 ] ] ) {
      for ( const n of t ) { trianguloj.push(k.ind[ n ]); uvDe.push(k.uv); }
    }
  }
  const pozicioj = new Float32Array(trianguloj.length * 3);
  const uv = new Float32Array(trianguloj.length * 2);
  for ( let i = 0; i < trianguloj.length; i++ ) {
    const q = p[ trianguloj[ i ] ];
    pozicioj[ i * 3 ] = q[ 0 ]; pozicioj[ i * 3 + 1 ] = q[ 1 ]; pozicioj[ i * 3 + 2 ] = q[ 2 ];
    const k = uvDe[ i ](q);
    uv[ i * 2 ] = k[ 0 ]; uv[ i * 2 + 1 ] = k[ 1 ];
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.BufferAttribute(pozicioj, 3));
  geometrio.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  geometrio.computeVertexNormals();
  return geometrio;
}
