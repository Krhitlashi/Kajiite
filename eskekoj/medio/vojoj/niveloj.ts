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

// ⟨ ចំណុចជុំវិញ ៖ រង្វង់ជុំវិញចំណុចមួយ ។ ប្រើសម្រាប់ជើងផ្លូវ ។
// ហេតុអ្វីរង្វង់ 📃 ⟩ ៖ មុននេះគែមផ្លូវគំរូតាមចំហៀងផ្លូវតែមួយទិស ។
// ដូច្នេះផ្លូវដេកកើត/លិចអានតែជើងខាងជើងនិងខាងត្បូង , រីឯផ្លូវឈរ
// អានតែជើងខាងកើតនិងខាងលិច ។ នៅដីជម្រាលមិនស្មើ , ផ្លូវពីរនៅកន្លែងតែមួយ
// បានកម្ពស់ខុសគ្នា ។ ឥឡូវជើងផ្លូវជារង្វង់ ៖ កម្ពស់អាស្រ័យតែលើទីតាំង , មិនអាស្រ័យ
// លើទិសដៅផ្លូវទេ ។ 📃 ⟩
const RONDAJ = 0o10;
const RONDAJ_RADIOJ = [ 0o1/0o2, 0o1 ];

// ⟨ ចំណុចតាមបណ្តោយ ៖ ដើម , កណ្តាល , ចុង ។ 📃 ⟩

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
      nivelo = celoj[ i ];
      lastaStupo = i;
    } else if ( celoj[ i ] <= nivelo - STUPA_RISERO && i - lastaStupo >= pasxojInterStupoj ) {
      let suba = true;
      for ( let j = i + 0o1; j <= Math.min(celoj.length - 0o1, i + konfirmo); j++ )
        if ( celoj[ j ] > nivelo - STUPA_RISERO ) { suba = false; break; }
      if ( suba ) {
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
      // ⟨ រង្វង់ជុំវិញចំណុច ៖ គ្មានទិសពិសេស , ដូច្នេះផ្លូវគ្រប់ទិសអានដីដូចគ្នា 📃 ⟩
      for ( const radio of RONDAJ_RADIOJ ) {
        for ( let i = 0; i < RONDAJ; i++ ) {
          const angulo = i * Math.PI * 0o2 / RONDAJ;
          rando = Math.max(rando, heightFn(p.x + Math.cos(angulo) * duono * radio,
            p.z + Math.sin(angulo) * duono * radio));
        }
      }
    }
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
  const celoj: number[] = [];
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
    celoj.push(surGrid(celo));
  }
  // ⟨ គម្រោងត្រូវតែងតែនៅលើក្រឡា ៖ បើមិនដូច្នេះទេលេចចេញជំហានតូចៗដែលមើលឃើញ ។ 📃 ⟩
  const altoj = kreiTreadojn(kreiCxramgon(celoj, disto).map(alto => surGrid(alto)), disto);
  kunveniguFinojn(altoj, celoj, situoj, longo);
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
