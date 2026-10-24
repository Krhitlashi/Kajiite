// ≺⧼ កម្រិតផ្លូវ 📏 ⧽≻
// ⟨ ផ្លូវសាងសង់ជាជំហានស្មើគ្នា ។ កម្រិតរបស់ជំហានកំណត់ម្តងតាមបណ្តោយផ្លូវទាំងមូល ,
// ដើម្បីឱ្យផ្លូវមានលក្ខណៈបី ៖ មិនកប់ក្នុងដី , មិនលោតខ្ពស់លើសមួយជំហាន ,
// ហើយមិនធ្លាក់ចូលរណ្តៅខ្លីរួចឡើងវិញ ។ 📃 ⟩
import { STUPA_RISERO, surGrid, VOJA_SUPRO_LEVIGXO } from "./mezuroj.js";

// ⟪ ការគំរូ 📏 ⟫
// ⟨ ចម្ងាយរវាងគំរូកម្ពស់ ៖ ជំហានខ្លីបំផុតមួយ ។ 📃 ⟩
export const NIVELA_PASO = 0o1/0o2;

// ⟨ ការរលូនខ្លី ៖ រណ្តៅ និងពំនូកខ្លីជាងចម្ងាយនេះត្រូវរលាយបាត់ ។ 📃 ⟩
export const NIVELA_GLATIGO = 0o6;

// ⟨ ចម្ងាយបញ្ជាក់ការចុះ ៖ ផ្លូវចុះតែពេលដីនៅទាបគ្រប់ចម្ងាយនេះ ។ 📃 ⟩
export const NIVELA_KONFIRMO = 0o10;

// ⟨ ចំណុចឆ្លងកាត់ផ្លូវ ៖ ៗ គែមទាំងសងខាង , ពាក់កណ្តាល , និងកណ្តាល ។ 📃 ⟩
const FLANKAJ = [ -0o1, -0o1/0o2, 0, 0o1/0o2, 0o1 ];

// ⟨ ចំណុចតាមបណ្តោយ ៖ ដើម , កណ្តាល , ចុង ។ 📃 ⟩
const LAUXAJ = [ -0o1/0o2, 0, 0o1/0o2 ];

export interface NivelaProfilo {
  // ⟨ កម្ពស់ផ្ទៃផ្លូវតាមលំដាប់គំរូ ។ 📃 ⟩
  altoj: number[];
  // ⟨ ចម្ងាយតាមបណ្តោយផ្លូវនៃគំរូនីមួយៗ ។ 📃 ⟩
  situoj: number[];
  longo: number;
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
    const fenestroValoroj: number[] = [];
    for ( let j = Math.max(0, i - fenestro); j <= Math.min(n - 0o1, i + fenestro); j++ )
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
  const risero = STUPA_RISERO * ( disto / NIVELA_PASO );
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
  let nivelo = celoj[ 0 ];
  for ( let i = 0; i < celoj.length; i++ ) {
    if ( celoj[ i ] > nivelo ) {
      nivelo = celoj[ i ];
    } else if ( celoj[ i ] <= nivelo - STUPA_RISERO ) {
      let suba = true;
      for ( let j = i + 0o1; j <= Math.min(celoj.length - 0o1, i + konfirmo); j++ )
        if ( celoj[ j ] > nivelo - STUPA_RISERO ) { suba = false; break; }
      if ( suba ) nivelo = Math.max(celoj[ i ], nivelo - STUPA_RISERO);
    }
    altoj.push(nivelo);
  }
  return altoj;
}

// ⟪ ការកំណត់កម្រិត 📏 ⟫
/*កំណត់កម្រិតជំហានតាមបណ្តោយផ្លូវទាំងមូល
    @param punktoj ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param duono ( number ) - កន្លះទទឹងផ្ទៃផ្លូវ
    @param heightFn ( function ) - កម្ពស់ដីដែលផ្លូវដើរ
    @param akvaFn ( function , optional ) - កម្ពស់ទឹកបូកចន្លោះ , ឬ -Infinity
@returns profilo ( NivelaProfilo ) - កម្រិតគ្រប់គំរូ */
export function kreiNivelanProfilon(
  punktoj: readonly ( readonly [ number, number ] )[],
  duono: number,
  heightFn: ( x: number, z: number ) => number,
  akvaFn?: ( x: number, z: number ) => number
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
    return { altoj: [ 0 ], situoj: [ 0 ], longo: 0, altoCxe: () => 0 };
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
    for ( const lauxa of LAUXAJ ) {
      const p = pozicio(s + lauxa * disto);
      mezo = Math.max(mezo, heightFn(p.x, p.z));
      for ( const flanka of FLANKAJ )
        rando = Math.max(rando, heightFn(p.x + p.latX * duono * flanka,
          p.z + p.latZ * duono * flanka));
    }
    centra.push(mezo);
    randoj.push(rando);
    situoj.push(s);
  }
  const fenestro = Math.max(0, Math.round(NIVELA_GLATIGO / disto));
  // ⟨ កម្រិត = គែមរលូន ឬ កណ្តាលដី ៖ មិនកប់កណ្តាលបន្ទាត់ទេ , តែមិនលោតតាមពំនូកគែមខ្លី ។ 📃 ⟩
  const celoj: number[] = [];
  const glataj = glatigiValojn(randoj, fenestro);
  for ( let i = 0; i < glataj.length; i++ ) {
    let celo = Math.max(glataj[ i ], centra[ i ]) + VOJA_SUPRO_LEVIGXO;
    const p = pozicio(situoj[ i ]);
    if ( akvaFn ) {
      const akvo = akvaFn(p.x, p.z);
      if ( akvo > -Infinity ) celo = Math.max(celo, akvo);
    }
    celoj.push(surGrid(celo));
  }
  // ⟨ គម្រោងត្រូវតែងតែនៅលើក្រឡា ៖ បើមិនដូច្នេះទេលេចចេញជំហានតូចៗដែលមើលឃើញ ។ 📃 ⟩
  const altoj = kreiTreadojn(kreiCxramgon(celoj, disto).map(alto => surGrid(alto)), disto);
  const altoCxe = ( s: number ): number => {
    const i = Math.max(0, Math.min(nombro, Math.round(s / disto)));
    return altoj[ i ];
  };
  return { altoj, situoj, longo, altoCxe };
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
