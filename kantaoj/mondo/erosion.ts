// ≺⧼ ការសំណឹកដី ⛰️ ⧽≻
// បំប្លែងដីឆៅទៅជាដីដែលមានបណ្តាញទន្លេ ។ ទឹករត់តាមជម្រាល ចាក់ចុះជ្រលង
// ហើយដីជម្រាលខ្ពស់រលូនចុះ ។ ឯកសារនេះសុទ្ធ ( គ្មាន DOM គ្មានផ្ទុកក្នុងម៉ាស៊ីន )
// ដូច្នេះការបង្កើតពិភពលោក និងឧបករណ៍ខាងក្រៅអាចនាំចូលបាន ។

// ⟨ ក្រឡាជិតខាង 📃 ⟩
const NAJBAROJ: [ number, number ][] = [
  [ -1, -1 ], [ 0, -1 ], [ 1, -1 ], [ -1, 0 ], [ 1, 0 ], [ -1, 1 ], [ 0, 1 ], [ 1, 1 ],
];

/*ក្រឡាដីដែលការសំណឹកធ្វើការលើវា
    @param n ( number ) - ចំនួនក្រឡាក្នុងមួយជ្រុង
    @param paso ( number ) - ទំហំក្រឡា ជាឯកតាពិភពលោក
    @param ene ( Uint8Array ) - ក្រឡានៅក្នុងរូបរាង
    @param rando ( Uint8Array ) - ក្រឡាដែលជាប់នឹងគែមរូបរាង */
export interface TerenaKrado {
  n: number;
  paso: number;
  ene: Uint8Array;
  rando: Uint8Array;
}

/*វាលលំហូរទឹកនៃដីមួយ
    @param plenaj ( Float32Array ) - កម្ពស់ដែលបានបំពេញអាង ។ គ្មានអាងបិទ
    @param ordo ( Int32Array ) - លំដាប់នៃការហូរចេញពីគែម ។ តូចមុន
    @param malsupren ( Int32Array ) - ក្រឡាបន្តចុះ , -1 បើគ្មាន
    @param akumulo ( Float32Array ) - ចំនួនក្រឡាដែលបង្ហូរកាត់ក្រឡានេះ */
export interface FluoKampo {
  plenaj: Float32Array;
  ordo: Int32Array;
  malsupren: Int32Array;
  akumulo: Float32Array;
}

/*ជង់តូចសម្រាប់ការបំពេញអាង ។ យកកម្ពស់តូចបំផុតមុន
@returns amaso */
function kreiHeapon(): {
  longo: () => number; aldoni: ( d: number, id: number ) => void;
  preni: () => [ number, number ];
} {
  const amaso: [ number, number ][] = [];
  return {
    longo: () => amaso.length,
    aldoni( d: number, id: number ): void {
      amaso.push([ d, id ]);
      let c = amaso.length - 1;
      while ( c > 0 ) {
        const p = ( c - 1 ) >> 1;
        if ( amaso[p][0] <= amaso[c][0] ) break;
        const t = amaso[p]; amaso[p] = amaso[c]; amaso[c] = t; c = p;
      }
    },
    preni(): [ number, number ] {
      const unua = amaso[0], lasta = amaso.pop()!;
      if ( amaso.length ) {
        amaso[0] = lasta;
        let p = 0;
        for (;;) {
          const l = 2 * p + 1, r = l + 1;
          let m = p;
          if ( l < amaso.length && amaso[l][0] < amaso[m][0] ) m = l;
          if ( r < amaso.length && amaso[r][0] < amaso[m][0] ) m = r;
          if ( m === p ) break;
          const t = amaso[p]; amaso[p] = amaso[m]; amaso[m] = t; p = m;
        }
      }
      return unua;
    },
  };
}

/*បំពេញអាងបិទ ។ ក្រឡានៅគែមរូបរាងជាច្រកចេញ ។ ក្រឡាដែលជាប់គាំងត្រូវលើក
  ដល់កម្ពស់ច្រកចេញរបស់វា ដូច្នេះទឹករកផ្លូវចេញបានគ្រប់ក្រឡា ។
    @param altoj ( Float32Array ) - កម្ពស់ដី
    @param krado ( TerenaKrado ) - ក្រឡាដី
@returns kampo ( { plenaj , ordo } ) - កម្ពស់ដែលបានបំពេញ និងលំដាប់ */
export function pleniguDepresojn( altoj: Float32Array, krado: TerenaKrado ):
  { plenaj: Float32Array; ordo: Int32Array } {
  const { n, ene, rando } = krado;
  const N2 = n * n;
  const plenaj = new Float32Array(N2).fill(Infinity);
  const ordo = new Int32Array(N2).fill(-1);
  const amaso = kreiHeapon();
  for ( let id = 0; id < N2; id++ ) {
    if ( !ene[id] || !rando[id] ) continue;
    plenaj[id] = altoj[id];
    amaso.aldoni(altoj[id], id);
  }
  let kalkulilo = 0;
  while ( amaso.longo() > 0 ) {
    const [ , id ] = amaso.preni();
    if ( ordo[id] >= 0 ) continue;
    ordo[id] = kalkulilo++;
    const i = id % n, j = ( id - i ) / n;
    for ( const [ di, dj ] of NAJBAROJ ) {
      const ni = i + di, nj = j + dj;
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( !ene[nid] || ordo[nid] >= 0 ) continue;
      const nova = Math.max(altoj[nid], plenaj[id]);
      if ( nova < plenaj[nid] ) {
        plenaj[nid] = nova;
        amaso.aldoni(nova, nid);
      }
    }
  }
  return { plenaj, ordo };
}

/*ក្រឡាបន្តចុះ ។ ជម្រាលខ្លាំងបំផុត ។ លើដីស្មើ ៖ ទៅរកលំដាប់តូចមុន
    @param plenaj ( Float32Array ) - កម្ពស់ដែលបានបំពេញ
    @param ordo ( Int32Array ) - លំដាប់នៃការហូរចេញ
    @param krado ( TerenaKrado ) - ក្រឡាដី
@returns malsupren ( Int32Array ) - ក្រឡាបន្ត , -1 បើគ្មាន */
export function kalkuliMalsupren( plenaj: Float32Array, ordo: Int32Array,
  krado: TerenaKrado ): Int32Array {
  const { n, ene } = krado;
  const malsupren = new Int32Array(n * n).fill(-1);
  for ( let id = 0; id < n * n; id++ ) {
    if ( !ene[id] ) continue;
    const i = id % n, j = ( id - i ) / n;
    let elektita = -1, elektitaAlto = Infinity, elektitaOrdo = Infinity;
    let plejOrda = -1, plejOrdaOrdo = Infinity;
    for ( const [ di, dj ] of NAJBAROJ ) {
      const ni = i + di, nj = j + dj;
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( !ene[nid] ) continue;
      const o = ordo[nid] >= 0 ? ordo[nid] : Infinity;
      // ⟨ ក្រឡាទាបបំផុត ។ បើកម្ពស់ស្មើ យកលំដាប់តូចមុន 📃 ⟩
      if ( plenaj[nid] < plenaj[id] - 1e-9 ) {
        if ( plenaj[nid] < elektitaAlto - 1e-9
          || ( Math.abs(plenaj[nid] - elektitaAlto) <= 1e-9 && o < elektitaOrdo ) ) {
          elektitaAlto = plenaj[nid]; elektitaOrdo = o; elektita = nid;
        }
      }
      if ( o < plejOrdaOrdo ) { plejOrdaOrdo = o; plejOrda = nid; }
    }
    if ( elektita >= 0 ) malsupren[id] = elektita;
    else if ( plejOrda >= 0 && plejOrdaOrdo < ordo[id] ) malsupren[id] = plejOrda;
  }
  return malsupren;
}

/*ក្រឡាទាំងអស់តម្រៀបតាមកម្ពស់ចុះ ។ ប្រើសម្រាប់បូកផ្ទៃរងបង្ហូរ
    @param plenaj ( Float32Array ) - កម្ពស់ដែលបានបំពេញ
    @param ene ( Uint8Array ) - ក្រឡានៅក្នុងរូបរាង
@returns vicordo ( Int32Array ) - លេខក្រឡា ខ្ពស់មុន */
export function vicordigu( plenaj: Float32Array, ene: Uint8Array ): Int32Array {
  const listo: number[] = [];
  for ( let id = 0; id < ene.length; id++ ) if ( ene[id] ) listo.push(id);
  listo.sort(( a, b ) => plenaj[b] - plenaj[a] );
  return Int32Array.from(listo);
}

/*ផ្ទៃរងបង្ហូរ ។ ចាប់ផ្តើមមួយក្រឡា រួចបូកចុះតាមក្រឡាបន្ត
    @param vicordo ( Int32Array ) - លំដាប់ក្រឡា ខ្ពស់មុន
    @param malsupren ( Int32Array ) - ក្រឡាបន្តចុះ ។ ទំហំរបស់វាជាទំហំក្រឡា
@returns akumulo ( Float32Array ) - ចំនួនក្រឡាដែលបង្ហូរកាត់ */
export function kalkuliAkumulon( vicordo: Int32Array, malsupren: Int32Array ): Float32Array {
  const akumulo = new Float32Array(malsupren.length);
  for ( let k = 0; k < vicordo.length; k++ ) {
    const id = vicordo[k];
    akumulo[id] += 1;
    const m = malsupren[id];
    if ( m >= 0 ) akumulo[m] += akumulo[id];
  }
  return akumulo;
}

/*វាលលំហូរទឹកទាំងមូល ។ បំពេញអាង រួចរកទិសចុះ រួចបូកផ្ទៃរងបង្ហូរ
    @param altoj ( Float32Array ) - កម្ពស់ដី
    @param krado ( TerenaKrado ) - ក្រឡាដី
@returns kampo ( FluoKampo ) - វាលលំហូរ */
export function kalkuliFluoKampon( altoj: Float32Array, krado: TerenaKrado ): FluoKampo {
  const { plenaj, ordo } = pleniguDepresojn(altoj, krado);
  const malsupren = kalkuliMalsupren(plenaj, ordo, krado);
  const akumulo = kalkuliAkumulon(vicordigu(plenaj, krado.ene), malsupren);
  return { plenaj, ordo, malsupren, akumulo };
}

/*ចាក់ជ្រលងទន្លេ ។ ជម្រៅអាស្រ័យលើផ្ទៃរងបង្ហូរ និងជម្រាល ។ ដូចសំណឹកធម្មជាតិ
    @param altoj ( Float32Array ) - កម្ពស់ដី ។ ដីត្រូវបានកែក្នុងអង្គចងចាំ
    @param kampo ( FluoKampo ) - វាលលំហូរ
    @param krado ( TerenaKrado ) - ក្រឡាដី
    @param opcioj ( object ) - ការកំណត់
        forto ( number ) - កម្រិតនៃការចាក់
        eksponento ( number ) - ឥទ្ធិពលនៃផ្ទៃរងបង្ហូរ
        minimumaAkumulo ( number ) - ផ្ទៃរងបង្ហូរតិចបំផុតដែលចាក់
        maksimumaForigo ( number ) - ជម្រៅច្រើនបំផុតក្នុងមួយជុំ
@returns forigita ( number ) - ផលបូកដែលបានចាក់ចេញ */
export function gravuriValojn( altoj: Float32Array, kampo: FluoKampo, krado: TerenaKrado,
  opcioj: { forto: number; eksponento: number; minimumaAkumulo: number; maksimumaForigo: number } ):
  number {
  const { n, paso, ene } = krado;
  const { malsupren, akumulo } = kampo;
  let forigita = 0;
  for ( let id = 0; id < n * n; id++ ) {
    if ( !ene[id] ) continue;
    const m = malsupren[id];
    if ( m < 0 ) continue;
    const pli = akumulo[id] - opcioj.minimumaAkumulo;
    if ( pli <= 0 ) continue;
    const i = id % n, j = ( id - i ) / n;
    const mi = m % n, mj = ( m - mi ) / n;
    const dist = Math.hypot(mi - i, mj - j) * paso;
    const deklivo = ( altoj[id] - altoj[m] ) / dist;
    if ( deklivo <= 0 ) continue;
    const pezo = Math.pow(pli / opcioj.minimumaAkumulo, opcioj.eksponento);
    let forigo = opcioj.forto * pezo * deklivo;
    // ⟨ កុំឱ្យជ្រលងខ្ពស់ជាងក្រឡាខាងក្រោម ។ ពាក់កណ្តាលនៃភាពខុសគ្នា 📃 ⟩
    forigo = Math.min(forigo, opcioj.maksimumaForigo, 0o1/0o2 * ( altoj[id] - altoj[m] ));
    if ( forigo <= 0 ) continue;
    altoj[id] -= forigo;
    forigita += forigo;
  }
  return forigita;
}

/*ដីរអិលចុះ ។ ជម្រាលខ្ពស់ជាងមុំកំណត់ត្រូវរាបស្មើ
    @param altoj ( Float32Array ) - កម្ពស់ដី ។ ដីត្រូវបានកែក្នុងអង្គចងចាំ
    @param krado ( TerenaKrado ) - ក្រឡាដី
    @param opcioj ( object ) - ការកំណត់
        maksimumaDeklivo ( number ) - ជម្រាលខ្ពស់បំផុតដែលអនុញ្ញាត
        ripetoj ( number ) - ចំនួនជុំ
        forto ( number ) - ចំណែកនៃដីដែលរអិល
@returns movita ( number ) - ផលបូកដីដែលបានផ្លាស់ */
export function limiguDeklivojn( altoj: Float32Array, krado: TerenaKrado,
  opcioj: { maksimumaDeklivo: number; ripetoj: number; forto: number } ): number {
  const { n, paso, ene } = krado;
  const N2 = n * n;
  const aldonoj = new Float32Array(N2);
  let movita = 0;
  for ( let ripeto = 0; ripeto < opcioj.ripetoj; ripeto++ ) {
    aldonoj.fill(0);
    for ( let id = 0; id < N2; id++ ) {
      if ( !ene[id] ) continue;
      const i = id % n, j = ( id - i ) / n;
      let plejMalalta = altoj[id], m = -1;
      for ( const [ di, dj ] of NAJBAROJ ) {
        const ni = i + di, nj = j + dj;
        if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
        const nid = nj * n + ni;
        if ( !ene[nid] ) continue;
        if ( altoj[nid] < plejMalalta ) { plejMalalta = altoj[nid]; m = nid; }
      }
      if ( m < 0 ) continue;
      const mi = m % n, mj = ( m - mi ) / n;
      const dist = Math.hypot(mi - i, mj - j) * paso;
      const deklivo = ( altoj[id] - altoj[m] ) / dist;
      if ( deklivo <= opcioj.maksimumaDeklivo ) continue;
      const troo = ( deklivo - opcioj.maksimumaDeklivo ) * dist * opcioj.forto;
      if ( troo <= 0 ) continue;
      aldonoj[id] -= troo * 0o1/0o2;
      aldonoj[m] += troo * 0o1/0o2;
      movita += troo;
    }
    for ( let id = 0; id < N2; id++ ) if ( aldonoj[id] !== 0 ) altoj[id] += aldonoj[id];
  }
  return movita;
}

/*សំណឹកពេញលេញ ។ ចាក់ជ្រលង រួចរាបស្មើជម្រាល ។ ធ្វើច្រើនជុំ
    @param altoj ( Float32Array ) - កម្ពស់ដី ។ ដីត្រូវបានកែក្នុងអង្គចងចាំ
    @param krado ( TerenaKrado ) - ក្រឡាដី
    @param opcioj ( object ) - ការកំណត់
        ripetoj ( number ) - ចំនួនជុំនៃសំណឹក
        forto ( number ) - កម្រិតនៃការចាក់ជ្រលង
        eksponento ( number ) - ឥទ្ធិពលនៃផ្ទៃរងបង្ហូរ
        minimumaAkumulo ( number ) - ផ្ទៃរងបង្ហូរតិចបំផុតដែលចាក់
        maksimumaForigo ( number ) - ជម្រៅច្រើនបំផុតក្នុងមួយជុំ
        maksimumaDeklivo ( number ) - ជម្រាលខ្ពស់បំផុតដែលអនុញ្ញាត
        glatigajRipetoj ( number ) - ចំនួនជុំនៃការរាបស្មើជម្រាល
@returns kampo ( FluoKampo ) - វាលលំហូរចុងក្រោយ */
export function erodiuTeron( altoj: Float32Array, krado: TerenaKrado, opcioj: {
  ripetoj: number; forto: number; eksponento: number; minimumaAkumulo: number;
  maksimumaForigo: number; maksimumaDeklivo: number; glatigajRipetoj: number;
} ): FluoKampo {
  let kampo = kalkuliFluoKampon(altoj, krado);
  for ( let ripeto = 0; ripeto < opcioj.ripetoj; ripeto++ ) {
    gravuriValojn(altoj, kampo, krado, {
      forto: opcioj.forto,
      eksponento: opcioj.eksponento,
      minimumaAkumulo: opcioj.minimumaAkumulo,
      maksimumaForigo: opcioj.maksimumaForigo,
    });
    limiguDeklivojn(altoj, krado, {
      maksimumaDeklivo: opcioj.maksimumaDeklivo,
      ripetoj: opcioj.glatigajRipetoj,
      forto: 0o1/0o4,
    });
    kampo = kalkuliFluoKampon(altoj, krado);
  }
  return kampo;
}

/*ចំណែកដីដែលទឹករត់ទៅដល់ទឹក ឬចេញក្រៅរូបរាង
    @param altoj ( Float32Array ) - កម្ពស់ដី
    @param malsupren ( Int32Array ) - ក្រឡាបន្តចុះ
    @param krado ( TerenaKrado ) - ក្រឡាដី
    @param nivelo ( number ) - កម្រិតទឹក
@returns rezulto ( { drenitaj , lando , senEliro } ) - ការរាប់ */
export function kalkuliDrenadon( altoj: Float32Array, malsupren: Int32Array,
  krado: TerenaKrado, nivelo: number ):
  { drenitaj: number; lando: number; senEliro: number } {
  const { n, ene } = krado;
  const N2 = n * n;
  const stato = new Int8Array(N2); // 0 មិនដឹង , 1 ដល់ទឹក , 2 ជាប់គាំង
  const vojo: number[] = [];
  let drenitaj = 0, lando = 0, senEliro = 0;
  for ( let id = 0; id < N2; id++ ) {
    if ( !ene[id] || altoj[id] < nivelo ) continue;
    lando++;
    vojo.length = 0;
    let kuranta = id, fino = 0;
    while (kuranta >= 0) {
      if ( stato[kuranta] !== 0 ) { fino = stato[kuranta]; break; }
      if ( altoj[kuranta] < nivelo || krado.rando[kuranta] ) { fino = 1; break; }
      const m = malsupren[kuranta];
      if ( m < 0 ) { fino = 2; break; }
      vojo.push(kuranta);
      kuranta = m;
      if ( vojo.length > N2 ) { fino = 2; break; }
    }
    if ( fino === 0 ) fino = 2;
    for ( const v of vojo ) stato[v] = fino;
    if ( fino === 1 ) drenitaj++; else senEliro++;
  }
  return { drenitaj, lando, senEliro };
}
