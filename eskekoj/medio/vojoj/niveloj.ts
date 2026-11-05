// ≺⧼ កម្រិតផ្លូវ 📏 ⧽≻
// ⟨ ផ្លូវសាងសង់ជាជំហានស្មើគ្នា ។ កម្រិតរបស់ជំហានកំណត់ម្តងតាមបណ្តោយផ្លូវទាំងមូល ,
// ដើម្បីឱ្យផ្លូវមានលក្ខណៈបី ៖ មិនកប់ក្នុងដី , មិនលោតខ្ពស់លើសមួយជំហាន ,
// ហើយមិនធ្លាក់ចូលរណ្តៅខ្លីរួចឡើងវិញ ។ 📃 ⟩
import { VOJA_TERA_KLINO } from "./alto.js";
import { plataAltoCxe, type PlataNivelo } from "./formoj.js";
import { STUPA_RISERO, subGrid, surGrid, VOJA_SUPRO_LEVIGXO, VOJA_TRUA_DUONO } from "./mezuroj.js";

// ⟪ ការគំរូ 📏 ⟫
// ⟨ ចម្ងាយរវាងគំរូកម្ពស់ ៖ ជំហានខ្លីបំផុតមួយ ។ 📃 ⟩
export const NIVELA_PASO = 0o1/0o2;

// ⟨ ការរលូនខ្លី ៖ រណ្តៅ និងពំនូកខ្លីជាងចម្ងាយនេះត្រូវរលាយបាត់ ។ 📃 ⟩
// ⟨ ធំជាងមុន 📏 ⟩ ៖ មុននេះ ៦ ។ ដីមានពំនូកតូចគ្រប់កន្លែង , ដូច្នេះផ្លូវឡើងចុះ
// ញាក់ ។ បង្អួច ៨ រលាយពំនូកទាំងនោះ , ហើយផ្លូវរាបស្មើជាង ។ មុខចំហៀងដែល
// ខ្ពស់ជាងមុនបន្តិចត្រូវបានគ្របដោយស្មាជម្រាល ។ 📃 ⟩
export const NIVELA_GLATIGO = 0o10;

// ⟨ ចម្ងាយបញ្ជាក់ការចុះ ៖ ផ្លូវចុះតែពេលដីទាបនៅភាគច្រើននៃចម្ងាយនេះ ។ 📃 ⟩
export const NIVELA_KONFIRMO = 0o10;

// ⟨ ចម្ងាយអប្បបរមារវាងជំហាន 🦶 ⟩
// ⟨ ជំហានមួយរាល់ចម្ងាយនេះ ៖ ជំហានខ្ពស់ ០.៥ មិនអាចដាក់ជាប់គ្នាបានទេ ,
// បើមិនដូច្នេះផ្លូវលោតឡើង/ចុះដូចជណ្តើរឈរ ។ ដូច្នេះផ្លូវឡើងជាជម្រាលវែង
// ជាងមុន ហើយគ្មានជំហានខ្ពស់លោតភ្លាមៗទេ ។ 📃 ⟩
// ⟨ ជំហានមួយរាល់ចម្ងាយនេះ ៖ ស្មើនឹងចម្ងាយគំរូ ( NIVELA_PASO ) , ដូច្នេះផ្លូវចុះបាន
// មួយជំហានក្នុងមួយគំរូ ។ មុននេះជំហានមួយរាល់ ១ ឯកតា , ដូច្នេះផ្លូវចុះបានតែ ០.៥
// ក្នុងមួយឯកតា ។ ជម្រាលដីច្រើនចោទជាងនោះ , ដូច្នេះផ្លូវអណ្តែតខ្ពស់លើដីរាប់សិបឯកតា
// ហើយជញ្ជាំងក្រោមវាខ្ពស់ទទេ ។ ឥឡូវផ្លូវតាមដីបានដល់ ១ ឯកតាក្នុងមួយឯកតា ។ 📃 ⟩
export const NIVELA_STUPA_DISTO = 0o1/0o2;

// ⟨ ចំណុចតាមបណ្តោយ ៖ ដើម , កណ្តាល , ចុង ។ 📃 ⟩
const LAUXAJ = [ -0o1/0o2, 0, 0o1/0o2 ];

// ⟪ ការបំពេញរណ្តៅរាក់ 📏 ⟫
// ⟨ ផ្លូវមិនចុះចូលរណ្តៅរាក់ទេ ៖ វាបំពេញវាដោយដីធម្មតា ។
// បើផ្លូវចុះចូលរណ្តៅហើយឡើងវិញ , អ្នកឃើញកំពូលរណ្តៅទាំងសងខាង
// ហើយផ្លូវលិចនៅកណ្តាល ។ នៅជិតចំណត និងស្ពាន ដីមានជ្រុងទាបបែបនេះច្រើន ,
// ដូច្នេះផ្លូវមើលទៅដូចលិច ។ ការបំពេញមានកំណត់ ៖ ផ្លូវលើកខ្លួនឯង
// តែប៉ុណ្ណោះ ។ ជ្រុងជ្រៅជាងនោះនៅតែជាជ្រុងពិត , ដូច្នេះផ្លូវឆ្លងកាត់វា ។ 📃 ⟩
// ⟨ ចម្ងាយស្វែងរកស្មា 📏 ⟩ ៖ ស្មាគឺជាដីខ្ពស់នៅសងខាងរណ្តៅ ។
// ⟨ រណ្តៅត្រូវខ្លី 📃 ⟩ ៖ បើបង្អួចធំ , ផ្លូវលើកខ្លួនលើរណ្តៅធំ ។ ការលើកមួយ
// បន្ថែមលើកមួយទៀត ព្រោះគំរូនីមួយៗឃើញស្មាខ្ពស់ , ដូច្នេះផ្លូវរាបស្មើវែង
// ហើយធ្លាក់ចុះភ្លាមនៅចុងរបស់វា ។ បង្អួច ២ ឯកតាបំពេញតែរណ្តៅតូច ។ 📃 ⟩
export const NIVELA_PLENIGA_DISTO = 0o2;
// ⟨ ជម្រៅដែលផ្លូវអាចបំពេញបាន ៖ មួយជំហាន ។ ផ្លូវមិនឡើងខ្ពស់លើដីដើម្បីបំពេញទេ ។ 📃 ⟩
export const NIVELA_PLENIGO = 0o1/0o2;

// ⟨ ចំណុចជុំវិញ ៖ រង្វង់ជុំវិញចំណុចមួយ ។ ប្រើសម្រាប់ជើងផ្លូវ ។
// ហេតុអ្វីរង្វង់ 📃 ⟩ ៖ មុននេះគែមផ្លូវគំរូតាមចំហៀងផ្លូវតែមួយទិស ។
// ដូច្នេះផ្លូវដេកកើត/លិចអានតែជើងខាងជើងនិងខាងត្បូង , រីឯផ្លូវឈរ
// អានតែជើងខាងកើតនិងខាងលិច ។ នៅដីជម្រាលមិនស្មើ , ផ្លូវពីរនៅកន្លែងតែមួយ
// បានកម្ពស់ខុសគ្នា ។ ឥឡូវជើងផ្លូវជារង្វង់ ៖ កម្ពស់អាស្រ័យតែលើទីតាំង , មិនអាស្រ័យ
// លើទិសដៅផ្លូវទេ ។ 📃 ⟩
const RONDAJ = 0o10;
const RONDAJ_RADIOJ = [ 0o1/0o2, 0o1 ];

export interface NivelaProfilo {
  // ⟨ កម្ពស់ផ្ទៃផ្លូវតាមលំដាប់គំរូ ។ 📃 ⟩
  altoj: number[];
  // ⟨ គម្រោងកម្ពស់មុនជំហាន ៖ ដីដែលផ្លូវគួរឈរ ។ ប្រើសម្រាប់វាស់ ។ 📃 ⟩
  celoj: number[];
  // ⟨ ចម្ងាយតាមបណ្តោយផ្លូវនៃគំរូនីមួយៗ ។ 📃 ⟩
  situoj: number[];
  longo: number;
  // ⟨ កម្ពស់កណ្តាលដី និងកម្ពស់គែមរលូន ៖ ជំហានក្នុងការគណនា ។
  // ឧបករណ៍វាស់អានពួកវា ដើម្បីកុំឱ្យគណនាឡើងវិញខុសពីហ្គេម ។ 📃 ⟩
  centraj: number[];
  glataj: number[];
  // ⟨ កម្ពស់ផ្ទៃផ្លូវនៅចម្ងាយមួយ ។ 📃 ⟩
  altoCxe: ( s: number ) => number;
}

interface Sekcio {
  ax: number;
  az: number;
  dx: number;
  dz: number;
  longo: number;
  starto: number;
}

// ⟪ ចំណុចលើបន្ទាត់ផ្លូវ 📃 ⟫
/*បង្កើតអនុគមន៍រកចំណុចតាមចម្ងាយ
    @param sekcioj ( Sekcio [ ] ) - ចម្រៀកត្រង់នៃផ្លូវ
    @param longo ( number ) - ប្រវែងសរុប
@returns pozicio ( function ) - ចំណុច X Z និងទិសឆ្លងកាត់ */
function kreiPozician(
  sekcioj: readonly Sekcio[],
  longo: number
): ( s: number ) => { x: number; z: number; latX: number; latZ: number } {
  return ( s: number ) => {
    const sek = sekcioj.length === 0 ? null : sekcioj[ 0 ];
    if ( !sek ) return { x: 0, z: 0, latX: 0, latZ: 0 };
    let k = 0;
    while ( k < sekcioj.length - 1 && s > sekcioj[ k ].starto + sekcioj[ k ].longo ) k++;
    const nuna = sekcioj[ k ];
    const t = Math.max( 0, Math.min( 1, ( Math.max( 0, Math.min(longo, s) ) - nuna.starto ) / nuna.longo ));
    const ndx = nuna.dx / nuna.longo, ndz = nuna.dz / nuna.longo;
    return { x: nuna.ax + nuna.dx * t, z: nuna.az + nuna.dz * t, latX: -ndz, latZ: ndx };
  };
}

// ⟪ ការរលូនកម្រិតខ្លី 📏 ⟫
/*លុបរណ្តៅ និងពំនូកខ្លីៗ ៖ កម្រិតរត់រលូន , មិនលោតឡើងចុះក្នុងចម្ងាយខ្លី
    @param valoroj ( number [ ] ) - កម្ពស់គំរូតាមលំដាប់
    @param fenestro ( number ) - កន្លះទទឹងនៃការរលូនគិតជាគំរូ
@returns valoroj ( number [ ] ) - កម្ពស់ដែលបានរលូន */
function glatigiValojn( valoroj: readonly number[], fenestro: number ): number[] {
  const n = valoroj.length;
  if ( n < 0o3 || fenestro < 0o1 ) return [ ...valoroj ];
  const rezulto: number[] = [];
  for ( let i = 0; i < n; i++ ) {
    // ⟨ បង្អួចស៊ីមេទ្រី 📏 ⟩ ៖ បង្អួចត្រូវខ្លីនៅជិតចុង ។ បើវាលាតដល់ចុង ,
    // វាមានតែខាងក្នុង , ដូច្នេះមេដ្យានទាញកម្ពស់ចុងទៅខាងក្នុងផ្លូវ ។
    // នៅដីជម្រាល ផ្លូវក៏ខ្ពស់ជាងចានភ្ជាប់មួយជំហាន , ហើយមាត់ក្លាយជាជញ្ជាំងឈរ ។ 📃 ⟩
    const duono = Math.min(fenestro, i, n - 0o1 - i);
    const fenestroValoroj: number[] = [];
    for ( let j = i - duono; j <= i + duono; j++ )
      fenestroValoroj.push(valoroj[ j ]);
    fenestroValoroj.sort(( p, q ) => p - q);
    rezulto.push(fenestroValoroj[ fenestroValoroj.length >> 1 ]);
  }
  return rezulto;
}

// ⟪ ច្រាំងនៃការឡើងចុះ 📏 ⟫
/*កំណត់ការឡើងចុះមិនលើសមួយជំហានក្នុងមួយគំរូ ៖ ផ្លូវឡើងដោយរលូន , មិនលោតច្រាំងខ្ពស់
    @param valoroj ( number [ ] ) - កម្ពស់គំរូ
    @param disto ( number ) - ចម្ងាយរវាងគំរូ
@returns valoroj ( number [ ] ) - កម្ពស់ដែលមានច្រាំង */
function kreiCxramgon( valoroj: readonly number[], disto: number ): number[] {
  const rezulto = [ ...valoroj ];
  // ⟨ ជម្រាលអតិបរមា 📏 ⟩ ៖ ការឡើង/ចុះមិនលើសមួយជំហានក្នុងចម្ងាយ NIVELA_STUPA_DISTO ,
  // ដូច្នេះកំពូលថ្មខ្ពស់ខ្លីមិនបង្កើតជណ្តើរឈរ ។
  const risero = STUPA_RISERO * ( disto / NIVELA_STUPA_DISTO );
  for ( let i = 1; i < rezulto.length; i++ )
    rezulto[ i ] = Math.max(rezulto[ i ], rezulto[ i - 0o1 ] - risero);
  for ( let i = rezulto.length - 0o2; i >= 0; i-- )
    rezulto[ i ] = Math.max(rezulto[ i ], rezulto[ i + 0o1 ] - risero);
  return rezulto;
}

// ⟪ ជំហានស្មើគ្នា 📏 ⟫
/*បង្កើតជំហានពីគម្រោងកម្ពស់ ៖ ផ្លូវឡើងភ្លាមពេលដីខ្ពស់ជាង ( មិនកប់ដី ) ,
    តែចុះតែពេលដីទាបជាងមួយជំហាន និងនៅទាបគ្រប់ចម្ងាយបញ្ជាក់
    ដូច្នេះផ្លូវមិនធ្លាក់ចុះរួចឡើងវិញក្នុងចម្ងាយខ្លីទេ ។
    @param celoj ( number [ ] ) - គម្រោងកម្ពស់ដែលបានបង្គត់
    @param disto ( number ) - ចម្ងាយរវាងគំរូ
@returns altoj ( number [ ] ) - កម្រិតជំហាន */
function kreiTreadojn( celoj: readonly number[], disto: number ): number[] {
  const altoj: number[] = [];
  if ( celoj.length === 0 ) return altoj;
  const konfirmo = Math.max(1, Math.round(NIVELA_KONFIRMO / disto));
  // ⟨ ចម្ងាយអប្បបរមារវាងជំហាន 🦶 ⟩ ៖ មួយជំហានក្នុងចម្ងាយ NIVELA_STUPA_DISTO ,
  // ដូច្នេះការចុះមិនលឿនជាងការគ្រោងទេ ។ បើមិនដូច្នេះ ការចុះមួយជំហាន
  // ក្នុងមួយគំរូ ( ០.៥ ) ហើយផ្លូវធ្លាក់ដូចជណ្តើរឈរ ។
  const pasxojInterStupoj = Math.max(1, Math.round(NIVELA_STUPA_DISTO / disto));
  let nivelo = celoj[ 0 ];
  let lastaStupo = -Infinity;
  for ( let i = 0; i < celoj.length; i++ ) {
    if ( celoj[ i ] > nivelo ) {
      // ⟨ ឡើងមួយជំហាន 📏 ⟩ ៖ មុននេះផ្លូវលោតឡើងភ្លាមដល់កម្រិតដី ។ ដីឡើងច្រើន
      // ក្នុងមួយគំរូ , ដូច្នេះជំហានខ្លះខ្ពស់ពីរឬបីដងជាងជំហានផ្សេង , ហើយផ្លូវ
      // មើលទៅមិនស្មើ ។ ឥឡូវឡើងមួយជំហានដូចចុះ , ដូច្នេះជណ្តើរមានជំហានស្មើគ្នា ។
      // បើដីឡើងលឿនជាងមួយជំហានក្នុងមួយជំហានចម្ងាយ , ផ្លូវកាត់ចូលដីបន្តិច
      // ( ដូចផ្លូវកាត់ភ្នំ ) , តែវាឡើងតាមក្រោយ ។ 📃 ⟩
      if ( i - lastaStupo >= pasxojInterStupoj ) {
        nivelo = Math.min(celoj[ i ], nivelo + STUPA_RISERO);
        lastaStupo = i;
      }
    } else if ( celoj[ i ] <= nivelo - STUPA_RISERO && i - lastaStupo >= pasxojInterStupoj ) {
      // ⟨ ភាគច្រើនជំនួសទាំងអស់ 📏 ⟩ ៖ មុននេះគ្រប់គំរូក្នុងបង្អួចត្រូវទាប ។
      // គម្រោងនៅលើក្រឡាលោតរវាងកម្រិតពីរ ហើយទឹកតូចៗលើកវាមួយជំហាន ,
      // ដូច្នេះគំរូខ្ពស់មួយរារាំងការចុះគ្រប់បង្អួច , ហើយផ្លូវនៅខ្ពស់
      // រាប់សិបឯកតាលើដីដែលចុះ ។ ឥឡូវគំរូភាគច្រើនត្រូវទាប ៖ រណ្តៅខ្លី
      // នៅតែមិនចុះ ( វាជាភាគតិច ) , តែជម្រាលវែង និងរណ្តៅធំចុះបាន ។ 📃 ⟩
      let superaj = 0, kvanto = 0;
      for ( let j = i + 0o1; j <= Math.min(celoj.length - 0o1, i + konfirmo); j++ ) {
        kvanto++;
        if ( celoj[ j ] > nivelo - STUPA_RISERO ) superaj++;
      }
      if ( superaj * 0o2 <= kvanto ) {
        nivelo = Math.max(celoj[ i ], nivelo - STUPA_RISERO);
        lastaStupo = i;
      }
    }
    altoj.push(nivelo);
  }
  return altoj;
}

// ⟪ ការឈានដល់កម្រិតចុងផ្លូវ 📏 ⟫
/*នាំកម្រិតជំហានទៅរកកម្រិតគោលនៅចុងទាំងពីរ ៖ ផ្លូវមិនលោតកម្ពស់នៅមាត់ចានភ្ជាប់
    ទេ ។ ការឡើងគឺភ្លាម , តែការចុះរង់ចាំការបញ្ជាក់ , ដូច្នេះផ្លូវដែលចុះពីលើភ្នំ
    អាចនៅខ្ពស់ជាងកម្រិតគោលនៅចុងរបស់វា ។ ការកែនេះអនុញ្ញាតឱ្យចុះបាន
    មួយជំហានរៀងរាល់ NIVELA_STUPA_DISTO ពីចុងម្ខាងៗ , តែមិនចុះក្រោមគម្រោងដី
    ( celoj ) ទេ , ដូច្នេះផ្លូវមិនកប់ក្នុងដី ។ លទ្ធផលនៅលើក្រឡាដូចមុន ។
    @param altoj ( number [ ] ) - កម្រិតជំហាន ( កែនៅនឹងកន្លែង )
    @param celoj ( number [ ] ) - គម្រោងកម្ពស់ដី
    @param situoj ( number [ ] ) - ចម្ងាយតាមបណ្តោយផ្លូវ
    @param longo ( number ) - ប្រវែងផ្លូវសរុប */
function kunveniguFinojn( altoj: number[], celoj: readonly number[], situoj: readonly number[], longo: number ): void {
  if ( altoj.length < 0o3 ) return;
  const fina = celoj[ celoj.length - 0o1 ];
  const komenca = celoj[ 0 ];
  for ( let i = 0; i < altoj.length; i++ ) {
    const deStarto = Math.ceil(situoj[ i ] / NIVELA_STUPA_DISTO);
    const deFino = Math.ceil(( longo - situoj[ i ] ) / NIVELA_STUPA_DISTO);
    const limo = Math.min(komenca + deStarto * STUPA_RISERO, fina + deFino * STUPA_RISERO);
    if ( altoj[ i ] > limo ) altoj[ i ] = Math.max(celoj[ i ], limo);
  }
}

// ⟪ ការបំពេញរណ្តៅរាក់ 📏 ⟫
/*លើកកម្រិតផ្លូវលើរណ្តៅរាក់ ដើម្បីកុំឱ្យផ្លូវចុះហើយឡើងវិញ
    @param valoroj ( number [ ] ) - គម្រោងកម្រិតតាមលំដាប់
    @param fenestro ( number ) - ចម្ងាយស្វែងរកស្មាគិតជាគំរូ
@returns valoroj ( number [ ] ) - កម្រិតដែលបានបំពេញ */
function pleniguDipojn( valoroj: readonly number[], fenestro: number ): number[] {
  const n = valoroj.length;
  const rezulto = [ ...valoroj ];
  if ( n < 0o3 || fenestro < 0o1 ) return rezulto;
  for ( let i = 0; i < n; i++ ) {
    // ⟨ ស្មាឆ្វេង និងស្មាស្តាំ 📏 ⟩ ៖ ខ្ពស់បំផុតក្នុងចម្ងាយ fenestro
    let maldekstra = -Infinity, dekstra = -Infinity;
    for ( let j = Math.max(0, i - fenestro); j < i; j++ )
      maldekstra = Math.max(maldekstra, valoroj[ j ]);
    for ( let j = i + 0o1; j <= Math.min(n - 0o1, i + fenestro); j++ )
      dekstra = Math.max(dekstra, valoroj[ j ]);
    // ⟨ បំពេញតែជ្រុង ៖ ស្មាទាំងពីរខ្ពស់ជាងចំណុចនេះ 📃 ⟩
    const limo = Math.min(maldekstra, dekstra);
    if ( limo <= rezulto[ i ] ) continue;
    rezulto[ i ] = Math.min(rezulto[ i ] + NIVELA_PLENIGO, limo);
  }
  return rezulto;
}

// ⟪ គម្រោងកម្រិត 📏 ⟫
/*កំណត់គម្រោងកម្រិតចុងក្រោយ ៖ ដី , ជម្រាល , ទឹក និងរណ្តៅរាក់
    @param celoj ( number [ ] ) - គម្រោងដើម ( មិនទាន់ក្រឡា )
    @param disto ( number ) - ចម្ងាយរវាងគំរូ
@returns celoj ( number [ ] ) - គម្រោងលើក្រឡា */
function celojDeProfilo( celoj: readonly number[], disto: number ): number[] {
  const fenestro = Math.max(0o1, Math.round(NIVELA_PLENIGA_DISTO / disto));
  return pleniguDipojn(celoj.map(alto => surGrid(alto)), fenestro);
}

// ⟪ ចំណុចភ្ជាប់សម្រាប់កម្រិត 📏 ⟫
// ⟨ កម្រិតចានភ្ជាប់ ៖ ផ្លូវត្រូវឡើងដល់កម្រិតនេះនៅចំណុចនេះ ។ 📃 ⟩
export interface NivelaKunigo {
  x: number;
  z: number;
  // ⟨ កម្ពស់កំពូលចានភ្ជាប់ ។ 📃 ⟩
  alto: number;
  // ⟨ កម្ពស់តាមដៃ ៖ ចានមិនមានកម្ពស់តែមួយទេ ។ ដៃនីមួយៗមានកម្រិតផ្លូវរៀងខ្លួន ,
  // ដូច្នេះការកំណត់កម្រិតត្រូវអានកម្រិតតាមទិសនៃគំរូ ។ បើអានតែ `alto` ,
  // ផ្លូវខាងទាបត្រូវឡើងដល់កម្រិតខ្ពស់បំផុត , ហើយមាត់ក្លាយជាជញ្ជាំង ។ 📃 ⟩
  nivelo?: PlataNivelo;
}

/*កម្ពស់ចានតាមទិសនៃចំណុចមួយ
    @param k ( NivelaKunigo ) - ចំណុចភ្ជាប់
    @param px, pz ( number ) - ចំណុចផ្លូវ
    @param d ( number ) - ចម្ងាយពីចំណុចភ្ជាប់
@returns alto ( number ) - កម្ពស់ចានដែលផ្លូវមកដល់ */
function kunigaAltoCxe(k: NivelaKunigo, px: number, pz: number, d: number): number {
  if ( !k.nivelo || k.nivelo.altoj.length === 0 ) return k.alto;
  return plataAltoCxe(k.nivelo, Math.atan2(pz - k.z, px - k.x), d);
}

// ⟪ ការកំណត់កម្រិត 📏 ⟫
/*កំណត់កម្រិតជំហានតាមបណ្តោយផ្លូវទាំងមូល
    @param punktoj ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param duono ( number ) - កន្លះទទឹងផ្ទៃផ្លូវ
    @param heightFn ( function ) - កម្ពស់ដីដែលផ្លូវដើរ
    @param akvaFn ( function , optional ) - កម្ពស់ទឹកបូកចន្លោះ , ឬ -Infinity
    @param kunigoj ( NivelaKunigo [ ] , optional ) - ចំណុចភ្ជាប់ដែលផ្លូវត្រូវឡើងដល់
@returns profilo ( NivelaProfilo ) - កម្រិតគ្រប់គំរូ */
export function kreiNivelanProfilon(
  punktoj: readonly ( readonly [ number, number ] )[],
  duono: number,
  heightFn: ( x: number, z: number ) => number,
  akvaFn?: ( x: number, z: number ) => number,
  kunigoj?: readonly NivelaKunigo[]
): NivelaProfilo {
  const sekcioj: Sekcio[] = [];
  let longo = 0;
  for ( let i = 0; i < punktoj.length - 1; i++ ) {
    const [ ax, az ] = punktoj[ i ];
    const [ bx, bz ] = punktoj[ i + 0o1 ];
    const dx = bx - ax, dz = bz - az;
    const longo2 = Math.hypot(dx, dz);
    if ( longo2 < 0o1/0o100 ) continue;
    sekcioj.push({ ax, az, dx, dz, longo: longo2, starto: longo });
    longo += longo2;
  }
  if ( sekcioj.length === 0 || longo < 0o1/0o100 )
    return { altoj: [ 0 ], celoj: [ 0 ], situoj: [ 0 ], longo: 0,
      centraj: [ 0 ], glataj: [ 0 ], altoCxe: () => 0 };
  const pozicio = kreiPozician(sekcioj, longo);
  const nombro = Math.max(1, Math.ceil(longo / NIVELA_PASO));
  const disto = longo / nombro;
  // ⟨ កណ្តាលបន្ទាត់ ៖ ជាន់ដីដែលផ្លូវត្រូវឈរ ។ គែមទាំងពីរជាប់ជម្រាល ,
  // ដូច្នេះគែមខ្ពស់ៗខ្លីៗមិនត្រូវលើកកម្រិតផ្លូវទាំងមូលទេ ។ 📃 ⟩
  const centra: number[] = [];
  const randoj: number[] = [];
  const situoj: number[] = [];
  for ( let i = 0; i <= nombro; i++ ) {
    const s = i * disto;
    let mezo = -Infinity, rando = -Infinity;
    let randoSumo = 0, randoNombro = 0;
    for ( const lauxa of LAUXAJ ) {
      const p = pozicio(s + lauxa * disto);
      mezo = Math.max(mezo, heightFn(p.x, p.z));
      // ⟨ រង្វង់ជុំវិញចំណុច ៖ គ្មានទិសពិសេស , ដូច្នេះផ្លូវគ្រប់ទិសអានដីដូចគ្នា 📃 ⟩
      // ⟨ មធ្យម មិនមែនខ្ពស់បំផុត 📏 ⟩ ៖ មុននេះរង្វង់យកដីខ្ពស់បំផុត ។ ផ្លូវដែលរត់
      // តាមជម្រាលមានដីខ្ពស់នៅខាងម្ខាង , ដូច្នេះកម្ពស់ខ្ពស់នោះលើកផ្លូវទាំងមូល ,
      // ហើយផ្លូវអណ្តែតលើដីខាងទាបរាប់សិបឯកតា ដោយមិនចុះ ។ មធ្យមយកកម្រិត
      // កណ្តាលនៃដីក្រោមផ្លូវ ៖ ខាងខ្ពស់កាត់ចូល , ខាងទាបបំពេញ , ដូចផ្លូវពិត ។ 📃 ⟩
      for ( const radio of RONDAJ_RADIOJ ) {
        const flanka = duono * radio;
        for ( let i = 0; i < RONDAJ; i++ ) {
          const angulo = i * Math.PI * 0o2 / RONDAJ;
          randoSumo += heightFn(p.x + Math.cos(angulo) * flanka,
            p.z + Math.sin(angulo) * flanka);
          randoNombro++;
        }
      }
    }
    rando = randoNombro > 0 ? randoSumo / randoNombro : mezo;
    centra.push(mezo);
    randoj.push(rando);
    situoj.push(s);
  }
  const fenestro = Math.max(0, Math.round(NIVELA_GLATIGO / disto));
  // ⟨ កម្រិត = គែមរលូន ឬ កណ្តាលដី ៖ មិនកប់កណ្តាលបន្ទាត់ទេ , តែមិនលោតតាមពំនូកគែមខ្លី ។ 📃 ⟩
  // ⟨ កណ្តាលក៏រលូនដែរ 📃 ⟩ ៖ មុននេះកណ្តាលជាតម្លៃឆៅ ។ ដីមានពំនូកតូចគ្រប់កន្លែង ,
  // ដូច្នេះពំនូកមួយគំរូលើកផ្លូវភ្លាម , ហើយផ្លូវចុះវិញយឺត ។ ដូច្នេះកម្ពស់ផ្លូវ
  // ទទឹងឡើងជាលំដាប់ , ហើយជញ្ជាំងក្រោមវាខ្ពស់ ។ ពំនូកដែលលើសដោយជំហានពេញ
  // នៅតែលើកផ្លូវ , ដូច្នេះផ្លូវមិនកាត់ចូលថ្មទេ ។ 📃 ⟩
  const centraj = glatigiValojn(centra, fenestro);
  const celojTaj: number[] = [];
  const glataj = glatigiValojn(randoj, fenestro);
  for ( let i = 0; i < glataj.length; i++ ) {
    let kerno = centraj[ i ];
    if ( centra[ i ] - centraj[ i ] > STUPA_RISERO ) kerno = centra[ i ];
    let celo = Math.max(glataj[ i ], kerno) + VOJA_SUPRO_LEVIGXO;
    const p = pozicio(situoj[ i ]);
    if ( akvaFn ) {
      const akvo = akvaFn(p.x, p.z);
      if ( akvo > -Infinity ) celo = Math.max(celo, akvo);
    }
    celojTaj.push(celo);
  }
  // ⟨ គម្រោងត្រូវតែងតែនៅលើក្រឡា ៖ បើមិនដូច្នេះទេលេចចេញជំហានតូចៗដែលមើលឃើញ ។ 📃 ⟩
  // ⟨ រណ្តៅរាក់ត្រូវបំពេញមុនការកំណត់ជំហាន 📃 ⟩ ៖ បើមិនដូច្នេះ ផ្លូវចុះចូល
  // ជ្រុងហើយឡើងវិញ ។ ការបំពេញធ្វើលើគម្រោង , ដូច្នេះស្មានៅតែជាដីពិត ។ 📃 ⟩
  const celoj = celojDeProfilo(celojTaj, disto);
  // ⟪ ចំណុចភ្ជាប់ត្រូវឈរលើចាន 📏 ⟫
  // ⟨ ការរលូនខ្លី និងការកំណត់ជំហាន លុបកំពូលតូចរបស់ចំណុចភ្ជាប់ ,
  // ព្រោះកំពូលនោះខ្លីជាងបង្អួច ។ ដូច្នេះផ្លូវនៅមាត់ចានទាបជាងចានច្រើនជំហាន ,
  // ហើយមាត់ក្លាយជាជញ្ជាំងឈរ ។ ម្យ៉ាងទៀត ការលើកដើម្បីបំពេញរណ្តៅអាចលើកផ្លូវ
  // ខ្ពស់ជាងចាន ។ ដូច្នេះក្នុងរង្វង់ចាន ផ្លូវត្រូវស្មើនឹងចាន ,
  // ហើយក្រៅរង្វង់ ផ្លូវឡើងចុះបានតែតាមជម្រាលអតិបរមា ។
  // កម្រិតកំពូលនិងបាតជាប់គ្នា , ដូច្នេះមិនកើតជំហានថ្មីទេ ។ 📃 ⟩
  // ⟨ ចានតែប៉ុណ្ណោះដែលផ្លូវនេះភ្ជាប់ 📏 ⟩ ៖ កោណរបស់ចានលាតគ្មានទីបញ្ចប់ ។
  // បើគិតចានទាំងអស់ , ចានខ្ពស់មួយនៅឆ្ងាយលើកផ្លូវនៅមាត់ចានទាប ,
  // ហើយចានទាបមួយនៅឆ្ងាយទាញផ្លូវចុះក្រោមមាត់ចានខ្ពស់ ។ ទាំងពីរធ្វើឱ្យមាត់
  // ខុសកម្រិតពីចានមួយជំហាន ហើយក្លាយជាជញ្ជាំង ។ ផ្លូវភ្ជាប់តែចានដែលវាដើរ
  // កាត់ក្នុងរង្វង់របស់វា , ដូច្នេះកោណគួរមកពីចានទាំងនោះតែប៉ុណ្ណោះ ។ 📃 ⟩
  // ⟨ កោណចាប់ពីមាត់ចាន 📏 ⟩ ៖ ផ្លូវចេញពីចាននៅ VOJA_TRUA_DUONO , ដូចគ្នានឹង
  // ការតម្រឹមកម្រិតចានក្នុង alto.ts ។ បើកោណចាប់ពីរង្វង់ធំជាងនេះ ,
  // ផ្លូវខ្វះចម្ងាយឡើងរវាងចានពីរ , ហើយមាត់ចានទាបជាងចានមួយជំហាន ។ 📃 ⟩
  const punktojCxe: { x: number; z: number }[] = situoj.map(s => pozicio(s));
  const proksimaj: NivelaKunigo[] = kunigoj && kunigoj.length
    ? kunigoj.filter(k => punktojCxe.some(p =>
      Math.hypot(p.x - k.x, p.z - k.z) <= VOJA_TRUA_DUONO))
    : [];
  if ( proksimaj.length ) {
    for ( let i = 0; i < celoj.length; i++ ) {
      const p = punktojCxe[ i ];
      let suba = -Infinity, supra = Infinity;
      for ( const k of proksimaj ) {
        const d = Math.hypot(p.x - k.x, p.z - k.z);
        const deRando = VOJA_TERA_KLINO * Math.max(0, d - VOJA_TRUA_DUONO);
        const altoK = kunigaAltoCxe(k, p.x, p.z, d);
        suba = Math.max(suba, altoK - deRando);
        supra = Math.min(supra, altoK + deRando);
      }
      // ⟨ គម្រោងនៅលើក្រឡាជានិច្ច 📏 ⟩ ៖ កម្រិតចានមិនស្មើក្រឡាទេ , ដូច្នេះការកំណត់
      // ខាងលើអាចទុកតម្លៃចន្លោះ ។ កម្រិតចន្លោះបង្កើតជំហានតូចៗមិនស្មើ ,
      // ហើយជំហានធំមួយលេចឡើងពេលបង្គត់ជាប់គ្នា ។ 📃 ⟩
      // ⟨ ការបង្គត់មានទិស 📏 ⟩ ៖ ព្រំដែនខាងលើបង្គត់ចុះ , ព្រំដែនខាងក្រោមបង្គត់ឡើង ។
      // បើបង្គត់ព្រំដែនខាងលើឡើង , ផ្លូវឡើងលើសចានកន្លះជំហាននៅជាប់មាត់ចាន ,
      // ហើយជំហាននោះក្លាយជាជញ្ជាំងខ្លីដែលមិនចាំបាច់ ។ 📃 ⟩
      // ⟨ ការទាញចុះមិនកប់ផ្លូវ 📏 ⟩ ៖ កំពូលជាកោណរបស់ចាន , ដូច្នេះការទាញចុះ
      // មិនធ្លាក់ក្រោមកម្រិតដែលផ្លូវអាចចុះពីចានបានទេ ។ បើទាញដល់ទីបំផុត ,
      // ផ្លូវស្ថិតក្នុងដី , ហើយដីគ្របវា ។ ការកាត់មួយជំហានចូលជម្រាល
      // មើលទៅដូចផ្លូវកាត់ជើងភ្នំ , តែផ្លូវនៅតែឃើញ ។ 📃 ⟩
      // ⟨ កំពូលឈ្នះបាត 📏 ⟩ ៖ ការកំណត់បាតត្រូវធ្វើមុន , ការកំណត់កំពូលត្រូវធ្វើក្រោយ ។
      // បើបាតធ្វើក្រោយ , ចានខ្ពស់មួយនៅឆ្ងាយលើកផ្លូវនៅមាត់ចានទាប ,
      // ហើយផ្លូវឈប់ខ្ពស់ជាងចាននោះមួយជំហាន ។ មាត់ក្លាយជាជញ្ជាំងឈរ
      // ដោយគ្មានជម្រាលឡើង ។ កំពូលក្រោយធានាថាផ្លូវដល់កម្រិតចាននៅមាត់ជានិច្ច ។ 📃 ⟩
      // ⟨ ការបង្គត់មិនញ័រ 📏 ⟩ ៖ មុននេះបាតបង្គត់ឡើង រួចកំពូលបង្គត់ចុះ ដោយ
      // ប្រើព្រំដែនដដែល ។ នៅមាត់ចាន កោណស្តើងជាងមួយជំហាន ( suba ≈ supra ,
      // តម្លៃមិននៅលើក្រឡា ព្រោះផ្ទៃចានជាជម្រាល ) , ដូច្នេះបង្គត់ទាំងពីរប្រយុទ្ធគ្នា ៖
      // ទីមួយលើកផ្លូវឡើង ទីពីរទាញវាចុះវិញ ។ ផ្លូវឈប់ទាបជាងមាត់ចានមួយជំហាន ,
      // ហើយគ្មានជម្រាលឡើងទៅដៃខ្ពស់ៗ = ជញ្ជាំងឈរ ។ ឥឡូវគណនាព្រំដែនទាំងពីរ
      // មុនកែតម្លៃ ៖ បើវាជាន់គ្នា យកក្រឡាដែលជិតផ្ទៃចានបំផុត ។ 📃 ⟩
      const malsupra = surGrid(suba);
      const supera = subGrid(supra);
      if ( malsupra > supera ) {
        const mezo = ( suba + supra ) / 0o2;
        celoj[ i ] = Number.isFinite(mezo)
          ? Math.round(mezo / STUPA_RISERO) * STUPA_RISERO
          : celoj[ i ];
      } else {
        celoj[ i ] = Math.max(malsupra, Math.min(supera, celoj[ i ]));
      }
    }
  }
  const altoj = kreiTreadojn(kreiCxramgon(celoj, disto).map(alto => surGrid(alto)), disto);
  kunveniguFinojn(altoj, celoj, situoj, longo);
  // ⟪ ជម្រាលចូលចាន 📏 ⟫
  // ⟨ ជំហានចុះរកចានតាមល្បឿនមួយជំហានក្នុងមួយជំហានចម្ងាយ ។
  // បើមិនដូច្នេះ ផ្លូវរង់ចាំការបញ្ជាក់មុនការចុះ , ដូច្នេះកម្រិតខ្ពស់នៅជាប់មាត់ចាន
  // ហើយមាត់ក្លាយជាជញ្ជាំង ។ ការចុះនេះទាបជាងគម្រោងបាន , តែមិនទាបជាងគម្រោងទេ ។ 📃 ⟩
  if ( proksimaj.length ) {
    for ( let i = 0; i < altoj.length; i++ ) {
      const p = punktojCxe[ i ];
      let limo = Infinity;
      for ( const k of proksimaj ) {
        const d = Math.hypot(p.x - k.x, p.z - k.z);
        if ( d > VOJA_TRUA_DUONO + NIVELA_GLATIGO ) continue;
        const pasoj = Math.ceil(Math.max(0, d - VOJA_TRUA_DUONO) / NIVELA_STUPA_DISTO);
        const l = kunigaAltoCxe(k, p.x, p.z, d) + pasoj * STUPA_RISERO;
        if ( l < limo ) limo = l;
      }
      if ( limo < altoj[ i ] ) altoj[ i ] = Math.max(celoj[ i ], limo);
    }
  }
  const altoCxe = ( s: number ): number => {
    const i = Math.max(0, Math.min(nombro, Math.round(s / disto)));
    return altoj[ i ];
  };
  return { altoj, celoj, situoj, longo, centraj, glataj, altoCxe };
}

// ⟪ បំណែកកម្រិត 📃 ⟫
export interface NivelaPeco {
  s0: number;
  s1: number;
  alto: number;
}

/*បំបែកចម្រៀកផ្លូវជាបំណែកដែលមានកម្រិតថេរ
    @param profilo ( NivelaProfilo ) - កម្រិតផ្លូវ
    @param s0 ( number ) - ចម្ងាយចាប់ផ្តើម
    @param s1 ( number ) - ចម្ងាយបញ្ចប់
@returns pecoj ( NivelaPeco [ ] ) - បំណែកតាមលំដាប់ */
export function kreiNivelajnPecojn(
  profilo: NivelaProfilo,
  s0: number,
  s1: number
): NivelaPeco[] {
  const pecoj: NivelaPeco[] = [];
  if ( s1 - s0 < 0o1/0o1000 ) return pecoj;
  let komenco = s0;
  let alto = profilo.altoCxe(s0);
  for ( let i = 0; i < profilo.altoj.length; i++ ) {
    const s = profilo.situoj[ i ];
    if ( s <= s0 + 0o1/0o1000 || s >= s1 - 0o1/0o1000 ) continue;
    const nuna = profilo.altoj[ i ];
    if ( nuna === alto ) continue;
    pecoj.push({ s0: komenco, s1: s, alto });
    komenco = s;
    alto = nuna;
  }
  pecoj.push({ s0: komenco, s1, alto });
  return pecoj;
}
