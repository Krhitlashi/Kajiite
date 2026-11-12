// ≺⧼ កម្ពស់ផ្លូវ 📏 ⧽≻
// ⟨ ផ្លូវត្រូវមានកម្ពស់តែមួយនៅចំណុចមួយ , ទោះបីជាវាទៅខាងកើតឬខាងជើង ។
// ដូច្នេះកម្ពស់ផ្លូវមិនអាស្រ័យលើទិសដៅរបស់ផ្លូវទេ ៖ វាជាវាលតែមួយលើផែនទី ,
// ហើយផ្លូវគ្រប់ខ្សែអានវាលនោះ ។ ឯកសារនេះជាកន្លែងតែមួយសម្រាប់វាលនោះ ,
// ដូច្នេះហ្គេម , ឆាកសាកល្បង និងឧបករណ៍វាស់អានលេខដូចគ្នា ។ 📃 ⟩
import { surGrid, VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO,
  VOJA_TERA_KLINO, VOJA_TRUA_DUONO } from "./mezuroj.js";
import { kreiPlataNivelon, kunigajBrakAltoj, plataAltoCxe, vojaSuproDeKunigo,
  type PlataNivelo } from "./formoj.js";

export { VOJA_TERA_KLINO };

// ⟪ ចំណុចភ្ជាប់ 📏 ⟫
export interface AltaKunigo {
  x: number;
  z: number;
  direktaj: readonly [ number, number ][];
  // ⟨ កន្លះទទឹងផ្លូវដែលមកដល់ ៖ មាត់ចានត្រូវអានពេញទទឹងនេះ ។ 📃 ⟩
  duono?: number;
}

// ⟪ ជម្រាលដី 📏 ⟫
// ⟨ ជម្រាល VOJA_TERA_KLINO ស្ថិតក្នុង mezuroj.js ៖ ចានភ្ជាប់ក៏អានវាដែរ ។ 📃 ⟩
// ⟨ ជម្រាលត្រូវស្មើនឹងជំហាន 🦶 ⟩ ៖ ផ្លូវឡើងដល់ ០.៥ ក្នុងចម្ងាយ ០.៥ ,
// ដូច្នេះជម្រាលអតិបរមាគឺ ១ ឯកតាក្នុងមួយឯកតា ។ បើកោណចំណុចភ្ជាប់ចុះតែ ០.៥ ,
// ផ្លូវរវាងចានពីរដែលខុសគ្នា ៦ ឯកតាក្នុងចម្ងាយ ១២ មិនអាចចុះដល់ចានទាបបានទេ ,
// ដូច្នេះចានមួយត្រូវលើកខ្ពស់ ហើយផ្លូវអណ្តែតលើដី ។ 📃 ⟩
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
// ⟨ រង្វង់គំរូគណនាម្តង 📏 ⟩ ៖ មុំ និងជម្រាលមិនប្រែប្រួល ។ បើគណនា sin/cos
// រាល់គំរូដែលខកខានឃ្លាំង , វាលផ្លូវចំណាយពេលភាគច្រើនលើត្រីកោណមាត្រ ។ 📃 ⟩
const TERA_OFSETAJ: readonly ( readonly [ number, number, number ] )[] = ( () => {
  const listo: [ number, number, number ][] = [];
  for ( const r of VOJA_TERA_RADII )
    for ( let i = 0; i < VOJA_TERA_ANGULOJ; i++ ) {
      const angulo = i * Math.PI * 0o2 / VOJA_TERA_ANGULOJ;
      listo.push([ Math.cos(angulo) * r, Math.sin(angulo) * r, VOJA_TERA_KLINO * r ]);
    }
  return listo;
} )();

export function kreiBazanVojoAlton(
  alteco: ( x: number, z: number ) => number,
  akvaFn?: ( x: number, z: number ) => number
): ( x: number, z: number ) => number {
  const supero = akvaFn
    ? ( x: number, z: number ): number => Math.max(alteco(x, z), akvaFn(x, z))
    : alteco;
  // ⟨ ឃ្លាំងលេខ មិនមែនខ្សែ 📏 ⟩ ៖ គំរូកម្ពស់ផ្លូវរាប់លានដង ។ ខ្សែ `px + "," + pz`
  // បង្កើតសំរាមមួយរាល់គំរូ , ហើយការ hash ខ្សែយឺតជាងលេខច្រើន ។ ក្រឡាដែលបាន
  // បង្គត់ជាគុណនៃ VOJA_ALTECA_KVANTO ជាលេខគត់ , ដូច្នេះប្រើវាជាសោផ្ទាល់ ។ 📃 ⟩
  const memoro = new Map<number, Map<number, number>>();
  return ( x: number, z: number ): number => {
    const ix = Math.round(x * VOJA_ALTECA_KVANTO);
    const iz = Math.round(z * VOJA_ALTECA_KVANTO);
    let vico = memoro.get(ix);
    if ( vico === undefined ) { vico = new Map(); memoro.set(ix, vico); }
    let milda = vico.get(iz);
    if ( milda === undefined ) {
      const px = ix / VOJA_ALTECA_KVANTO, pz = iz / VOJA_ALTECA_KVANTO;
      milda = supero(px, pz);
      for ( const [ ofsX, ofsZ, falo ] of TERA_OFSETAJ )
        milda = Math.max(milda, supero(px + ofsX, pz + ofsZ) - falo);
      vico.set(iz, milda);
    }
    return Math.max(supero(x, z), milda);
  };
}

// ⟪ ការតម្រឹមនៅចំណុចភ្ជាប់ 📏 ⟫
// ⟨ ចំណុចភ្ជាប់គឺជាកម្រិតមួយសម្រាប់ផ្លូវគ្រប់ខ្សែដែលមកដល់វា ។ ដូច្នេះផ្លូវ
// ត្រូវឡើងដល់កម្រិតនោះនៅជិតវា , ហើយចុះវិញតាមជម្រាលដូចគ្នា ។ បើមិនតម្រឹម ,
// ផ្លូវពីរដែលជួបគ្នាអាចឈរខុសកម្រិត , ហើយចានភ្ជាប់គ្របមិនជិត ។ 📃 ⟩
export const VOJA_KUNIGA_CELO = 0o20;
// ⟨ ចម្ងាយស្វែងរកកោណ ៖ កោណអាចខ្ពស់ជាងដីច្រើន , ដូច្នេះស្វែងរកឆ្ងាយ ។ 📃 ⟩
const KUNIGA_CXELOJ = 0o2;
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
  const unikaj = new Map<string, AltaKunigo>();
  for ( const k of kunigoj ) {
    if ( !Number.isFinite(k.x) || !Number.isFinite(k.z) ) continue;
    unikaj.set(k.x + "," + k.z, k);
  }
  const ankroj = [ ...unikaj.values() ];
  // ⟪ កម្ពស់មាត់ដៃនីមួយៗ 📏 ⟫
  // ⟨ ចានមួយ កម្ពស់មួយក្នុងមួយដៃ 📃 ⟩ ៖ ដីជុំវិញចំណុចភ្ជាប់មិនស្មើគ្នា ។ បើចានមាន
  // កម្ពស់តែមួយ , ដៃទាបត្រូវឡើងដល់កម្រិតខ្ពស់បំផុតក្នុងចម្ងាយមាត់ខ្លី ,
  // ហើយមាត់នោះក្លាយជាជញ្ជាំងឈរ ។ ដូច្នេះកម្ពស់ត្រូវរក្សាតាមដៃ ,
  // ហើយផ្ទៃចានលាយរវាងដៃ ។ 📃 ⟩
  // ⟨ អានវាលមូលដ្ឋាន 📃 ⟩ ៖ វាលផ្លូវមានកោណចានរួចហើយ , ដូច្នេះការអានវានៅមាត់
  // ត្រឡប់កម្រិតចានវិញ ( វង់ ) ។ ដូច្នេះអានដីមូលដ្ឋាន ។ 📃 ⟩
  const brakAltoj: number[][] = ankroj.map(kunigo =>
    kunigajBrakAltoj(kunigo.x, kunigo.z, kunigo.direktaj,
      kunigo.direktaj.map(() => kunigo.duono ?? VOJA_DIORITA_DUONO), bazaVojoAlteco));
  // ⟨ ចានគ្មានដៃ 📃 ⟩ ៖ អានគែមជុំវិញដូចមុន , ហើយប្រើកម្ពស់តែមួយ ។
  const platoj = ankroj.map((kunigo, i) => {
    const validaj = brakAltoj[ i ].filter(Number.isFinite);
    if ( validaj.length ) return Math.max(...validaj);
    return surGrid(vojaSuproDeKunigo(kunigo.x, kunigo.z, kunigo.direktaj,
      VOJA_EKSTERA_DUONO, bazaVojoAlteco).supro - VOJA_SUPRO_LEVIGXO);
  });
  // ⟪ ការតម្រឹមកម្រិតចានជាប់គ្នា 📏 ⟫
  // ⟨ ចានពីរត្រូវឡើងដល់គ្នាបាន 📃 ⟩ ៖ ផ្លូវរវាងចានពីរមានប្រវែង D , ហើយចុងទាំងពីរ
  // ជាមាត់ចាន ។ ដូច្នេះផ្លូវឡើងបានតែ VOJA_TERA_KLINO * ( D - 2 * VOJA_TRUA_DUONO ) ។
  // បើចានខុសកម្រិតច្រើនជាងនោះ , ផ្លូវមិនអាចដល់ចានទាបឬចានខ្ពស់បានទេ ,
  // ហើយវាលោតជាជញ្ជាំងនៅមាត់ចាន ។ ដូច្នេះមាត់ដៃដែលបែររកគ្នាត្រូវលើកឡើង ។
  // ⟨ មាត់មួយៗដោយឡែក 📏 ⟩ ៖ មុននេះការលើកលើកចានទាំងមូល , ដូច្នេះដៃដែលមិន
  // បែររកចាននោះក៏ឡើងដែរ , ហើយមាត់របស់វាខ្ពស់ជាងដី ។ ឥឡូវលើកតែមាត់ដែលបែររក ។ 📃 ⟩
  const KUNIGA_ALTECA_PASOJ = 0o4;
  const BRAKA_TOLERO = Math.cos(Math.PI / 0o10);
  // ⟨ ដៃដែលបែររកចំណុចមួយ 📏 ⟩ ៖ ត្រឡប់លេខដៃ , ឬ -1 បើគ្មានដៃបែររក ។
  const brakaIndekso = ( k: AltaKunigo, tx: number, tz: number ): number => {
    let plej = -1, plejGajno = BRAKA_TOLERO;
    for ( let b = 0; b < k.direktaj.length; b++ ) {
      const [ dx, dz ] = k.direktaj[ b ];
      const longo = Math.hypot(dx, dz);
      if ( longo < 0o1/0o1000 ) continue;
      const gajno = ( dx * tx + dz * tz ) / longo;
      if ( gajno > plejGajno ) { plejGajno = gajno; plej = b; }
    }
    return plej;
  };
  const legi = ( i: number, b: number ): number =>
    b >= 0 && Number.isFinite(brakAltoj[ i ][ b ]) ? brakAltoj[ i ][ b ] : platoj[ i ];
  const skribu = ( i: number, b: number, alto: number ): void => {
    if ( b >= 0 && Number.isFinite(brakAltoj[ i ][ b ]) ) brakAltoj[ i ][ b ] = alto;
    else platoj[ i ] = Math.max(platoj[ i ], alto);
  };
  for ( let paso = 0; paso < KUNIGA_ALTECA_PASOJ; paso++ ) {
    let sxangxo = false;
    for ( let i = 0; i < ankroj.length; i++ ) {
      for ( let j = i + 1; j < ankroj.length; j++ ) {
        const dx = ankroj[ j ].x - ankroj[ i ].x, dz = ankroj[ j ].z - ankroj[ i ].z;
        const disto = Math.hypot(dx, dz);
        if ( disto < 0o1/0o100 ) continue;
        const ux = dx / disto, uz = dz / disto;
        // ⟨ តែចានដែលមានផ្លូវភ្ជាប់ 📃 ⟩ ៖ ចានពីរនៅជិតគ្នាតែគ្មានផ្លូវរវាងគ្នា
        // មិនត្រូវលើកទេ ។ បើលើក , ចាននោះឡើងខ្ពស់លើដីដោយគ្មានហេតុ ,
        // ហើយផ្លូវជុំវិញវាអណ្តែត ។ ដៃរបស់ចានបង្ហាញថាមានផ្លូវទៅរកគ្នា ។ 📃 ⟩
        const bi = brakaIndekso(ankroj[ i ], ux, uz);
        const bj = brakaIndekso(ankroj[ j ], -ux, -uz);
        if ( bi < 0 || bj < 0 ) continue;
        const limo = VOJA_TERA_KLINO * ( disto - 0o2 * VOJA_TRUA_DUONO );
        if ( limo <= 0 ) continue;
        const altI = legi(i, bi), altJ = legi(j, bj);
        if ( altJ - altI > limo ) {
          skribu(i, bi, surGrid(altJ - limo));
          sxangxo = true;
        } else if ( altI - altJ > limo ) {
          skribu(j, bj, surGrid(altI - limo));
          sxangxo = true;
        }
      }
    }
    if ( !sxangxo ) break;
  }
  // ⟪ កម្រិតចានតាមទិស 📏 ⟫
  // ⟨ មួយសម្រាប់អ្នកអានទាំងអស់ 📃 ⟩ ៖ វាល , ចាន , និងការកំណត់កម្រិតផ្លូវអានកម្រិតនេះ
  // តាមអនុគមន៍តែមួយ ។ បើអ្នកម្នាក់គណនាខុស , មាត់ចានខុសកម្រិត ។ 📃 ⟩
  const niveloj: PlataNivelo[] = ankroj.map((kunigo, i) =>
    kreiPlataNivelon(kunigo.direktaj,
      kunigo.direktaj.map(() => kunigo.duono ?? VOJA_DIORITA_DUONO),
      brakAltoj[ i ], platoj[ i ]));
  // ⟨ ក្រឡារាប មិនមែនខ្សែ 📏 ⟩ ៖ ការអានវាលនេះរត់រាល់គំរូផ្លូវ , ហើយមុននេះ
  // វាបង្កើតខ្សែសោមួយរាល់ក្រឡាជិតខាងដែលវាពិនិត្យ ។ ចំណុចភ្ជាប់ទាំងអស់ស្គាល់មុន ,
  // ដូច្នេះក្រឡាត្រូវបានលាតជាអារេមួយតាមព្រំដែនរបស់ពួកវា ។ លេខលិបិក្រមជំនួសការ hash ។ 📃 ⟩
  // ⟨ កម្ពស់ខ្ពស់បំផុតរបស់ចាន 📏 ⟩ ៖ ផ្ទៃចានតាមទិសមិនអាចលើសដៃខ្ពស់បំផុត
  // ឬ កម្ពស់កណ្តាលទេ ។ ដូច្នេះកោណរបស់ចានមួយមានចម្ងាយឈានអតិបរមាដែលស្គាល់មុន ។
  // បើចំណុចនៅឆ្ងាយជាងនោះ , រំលងដោយមិនគណនាមុំ និងផ្ទៃចានទេ ។ 📃 ⟩
  const fontoj: { x: number; z: number; nivelo: PlataNivelo; maksAlto: number }[][] = [];
  let kradoMinX = 0, kradoMinZ = 0, kradoLarĝo = 0, kradoAlto = 0;
  if ( ankroj.length ) {
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for ( const kunigo of ankroj ) {
      const cx = Math.floor(kunigo.x / VOJA_KUNIGA_CELO);
      const cz = Math.floor(kunigo.z / VOJA_KUNIGA_CELO);
      if ( cx < minX ) minX = cx;
      if ( cx > maxX ) maxX = cx;
      if ( cz < minZ ) minZ = cz;
      if ( cz > maxZ ) maxZ = cz;
    }
    kradoMinX = minX; kradoMinZ = minZ;
    kradoLarĝo = maxX - minX + 1; kradoAlto = maxZ - minZ + 1;
    fontoj.length = kradoLarĝo * kradoAlto;
    for ( let i = 0; i < ankroj.length; i++ ) {
      const kunigo = ankroj[ i ];
      const gx = Math.floor(kunigo.x / VOJA_KUNIGA_CELO) - kradoMinX;
      const gz = Math.floor(kunigo.z / VOJA_KUNIGA_CELO) - kradoMinZ;
      const indico = gx + gz * kradoLarĝo;
      const nivelo = niveloj[ i ];
      let maksAlto = nivelo.alto;
      for ( const alto of nivelo.altoj ) if ( alto > maksAlto ) maksAlto = alto;
      ( fontoj[ indico ] ??= [] ).push({ x: kunigo.x, z: kunigo.z, nivelo, maksAlto });
    }
  }
  // ⟨ ទឹកពិត 📃 ⟩ ៖ លើទឹក ផ្លូវមិនត្រូវលើកឡើងដោយកោណចានទេ ។ ចានស្ថិតលើ
  // គោក , ហើយផ្លូវដែលឈប់នៅមាត់ទឹកត្រូវស្ថិតនៅកំពស់ទឹក មិនមែនលើកខ្ពស់
  // ជាជញ្ជាំងលើទឹក ។ កោណនៅតែឡើងលើគោក , ដូច្នេះផ្លូវឡើងដល់ចានបាន ។ 📃 ⟩
  const cxuAkva = akvaFn
    ? ( x: number, z: number ): boolean => akvaFn( x, z ) > -Infinity
    : () => false;
  return ( x, z ) => {
    let alto = bazaVojoAlteco(x, z);
    // ⟨ កោណលើទឹក ៖ រំលង ។ ផ្លូវនៅលើទឹកត្រូវស្មើកម្រិតទឹក ( ព្រោះស្ពាន
    // មានកម្រិតផ្ទាល់ខ្លួន ) , មិនត្រូវលើកដោយចាននៅឆ្ងាយ ។ 📃 ⟩
    const surAkvo = cxuAkva(x, z);
    const cx = Math.floor(x / VOJA_KUNIGA_CELO) - kradoMinX;
    const cz = Math.floor(z / VOJA_KUNIGA_CELO) - kradoMinZ;
    for ( let dx = -KUNIGA_CXELOJ; dx <= KUNIGA_CXELOJ; dx++ ) {
      const gx = cx + dx;
      if ( gx < 0 || gx >= kradoLarĝo ) continue;
      for ( let dz = -KUNIGA_CXELOJ; dz <= KUNIGA_CXELOJ; dz++ ) {
        const gz = cz + dz;
        if ( gz < 0 || gz >= kradoAlto ) continue;
        const listo = fontoj[ gx + gz * kradoLarĝo ];
        if ( listo === undefined ) continue;
        for ( const fonto of listo ) {
          const distanco = Math.hypot(x - fonto.x, z - fonto.z);
          // ⟨ ច្រោះថោកមុន 📏 ⟩ ៖ ក្រឡាជិតខាងមួយអាចមានចានរាប់សិប ។ បើគណនា
          // ផ្ទៃចានតាមទិសសម្រាប់ពួកវាទាំងអស់ , ការអានកម្ពស់មួយចំណាយពេលលើ
          // ចានដែលនៅឆ្ងាយហើយមិនអាចប៉ះផ្លូវបានទេ ។ កម្ពស់ខ្ពស់បំផុតរបស់ចាន
          // ផ្ដល់ចម្ងាយឈានអតិបរមា , ដូច្នេះប្រើវារំលងមុន ។ ការរំលងនេះធំជាង
          // ការរំលងពិតខាងក្រោម , ដូច្នេះលទ្ធផលនៅដូចដើម ។ 📃 ⟩
          if ( distanco > VOJA_KUNIGA_RADIUSO + 0o2 * ( fonto.maksAlto - alto ) ) continue;
          // ⟨ កម្រិតចានតាមទិសដែលផ្លូវមកដល់ 📏 ⟩ ៖ ចានមានកម្ពស់ខុសគ្នាតាមដៃ ,
          // ដូច្នេះកោណត្រូវអានកម្រិតតាមទិសនៃចំណុចនេះ , មិនមែនកម្រិតតែមួយ ។
          // បើអានតែមួយ , ដៃទាបត្រូវឡើងដល់កម្រិតខ្ពស់បំផុត , ហើយមាត់ក្លាយជាជញ្ជាំង ។ 📃 ⟩
          const fontaAlto = plataAltoCxe(fonto.nivelo,
            Math.atan2(z - fonto.z, x - fonto.x), distanco);
          // ⟨ កោណត្រូវរលាយទៅដី មិនកាត់ភ្លាម ៖ ការកាត់ត្រង់ចម្ងាយថេរ
          // បង្កើតជញ្ជាំងឈរខ្ពស់ច្រើនឯកតា ។ ផ្លូវឆ្លងកាត់ជញ្ជាំងនោះ
          // ហើយឃើញកម្រិតលោត ។ ដូច្នេះកោណបន្តចុះរហូតដល់ដី ។ 📃 ⟩
          // ⟨ ការរំលង ៖ កោណដែលទាបជាងកម្រិតបច្ចុប្បន្នមិនអាចលើកវាបានទេ ។ 📃 ⟩
          if ( distanco > VOJA_KUNIGA_RADIUSO + 0o2 * ( fontaAlto - alto ) ) continue;
          // ⟨ លើទឹក កោណមិនលើកទេ ៖ កុំឱ្យផ្លូវអណ្តែតលើទឹក ។ 📃 ⟩
          if ( surAkvo ) continue;
          alto = Math.max(alto, fontaAlto - VOJA_SUPRO_LEVIGXO - VOJA_TERA_KLINO
            * Math.max(0, distanco - VOJA_KUNIGA_RADIUSO));
        }
      }
    }
    return alto;
  };
}
