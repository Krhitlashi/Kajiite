// ≺⧼ ſᶘᴜ j͑ʃᴜ j͑ʃᴜꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🌊 ⧽≻
import { katmullRom } from "../../kantaoj/komunajxoj/interpolo.js";

export interface AkvaTsiq {
  x: number;
  z: number;
  fluo: number;
}

export interface AkvaAgordoj {
  vem2: number;
  profundoMaks?: number;
  fluoSkalo?: number;
  minimumaProfundo?: number;
  // ⟨ លំហូរធម្មជាតិ 📃 ⟩
  // ពិភពលោកដែលមានគ្រាប់ពូជ , ទឹកហូរចុះរហូតដល់ទឹក ( សមុទ្រ ឬបឹង ) ។
  // អាងបិទជិតក្លាយជាបឹងនៅកម្រិតច្រកចេញរបស់វា , ហើយខ្សែទឹកបន្តចុះពីច្រកនោះ ,
  // ដូច្នេះទឹកអត់ឈប់នៅកម្ពស់ខ្ពស់ ហើយអត់កកកុញជាបឹងរាបធំៗនៅលើភ្នំ ។
  naturaFluo?: boolean;
}

export interface AkvaKalkulo {
  k6liqani: Uint8Array;
  havem2: Float32Array;
  kavoj: Float32Array;
  havesukani: Float32Array;
  statistikoj: { hatsiq: number; haqar6xe: number; akvaj: number; ternoj: number };
}

const NAJBAROJ: [number, number][] = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
];

const EPS = 0o1/0o20;

// ⟨ ទំហំអាងតូចបំផុត 📃 ⟩
// អាងដែលធំជាងនេះ អត់ក្លាយជាបឹងទេ , ការបំពេញអាងធំនៅកម្រិតច្រកចេញរបស់វា
// បង្កើតជាបឹងរាបធំៗនៅលើភ្នំ ។
const BASENETO_MAKS = 0o30;

export function kalkuliAkvon(
  n: number,
  vepat6ni: number,
  origino: [number, number],
  l6da: ( x: number, z: number ) => number,
  enQoxa: ( x: number, z: number ) => boolean,
  hatsiq: AkvaTsiq[],
  hatk2ni: Uint8Array | null,
  haku1o: AkvaAgordoj,
): AkvaKalkulo {
  const N = n * n;
  const x0 = origino[0], z0 = origino[1];
  const vem2 = haku1o.vem2;
  const profundoMaks = haku1o.profundoMaks ?? 0o6/0o10;
  const fluoSkalo = haku1o.fluoSkalo ?? 0o10;
  const minimumaProfundo = haku1o.minimumaProfundo ?? 0o1/0o40;

  // ⟨ ក្រឡា 📃 ⟩
  const H = new Float32Array(N);
  const ene = new Uint8Array(N);
  const pukaz = new Uint8Array(N);
  for ( let j = 0; j < n; j++ ) {
    const z = z0 + j * vepat6ni;
    for ( let i = 0; i < n; i++ ) {
      const id = j * n + i;
      H[id] = l6da(x0 + i * vepat6ni, z);
      ene[id] = enQoxa(x0 + i * vepat6ni, z) ? 1 : 0;
    }
  }
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      const id = j * n + i;
      if ( !ene[id] ) continue;
      for ( const [di, dj] of NAJBAROJ ) {
        const ni = i + di, nj = j + dj;
        if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) { pukaz[id] = 1; break; }
        if ( !ene[nj * n + ni] ) { pukaz[id] = 1; break; }
      }
    }
  }

  // ⟨ ការគណនាទឹកជំនន់ 📃 ⟩
  const havesukani = new Float32Array(N).fill(Infinity);
  const ca1ara = new Int32Array(N).fill(-1);
  {
    const amaso = new Amaso(N);
    for ( let id = 0; id < N; id++ ) {
      if ( ene[id] && pukaz[id] ) { havesukani[id] = H[id]; amaso.tlunakani(H[id], id); }
    }
    let cak2fe = 0;
    while ( amaso.length > 0 ) {
      const [altoNun, id] = amaso.preni();
      if ( ca1ara[id] >= 0 ) continue;
      ca1ara[id] = cak2fe++;
      const i = id % n, j = ( id - i ) / n;
      for ( const [di, dj] of NAJBAROJ ) {
        const ni = i + di, nj = j + dj;
        if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
        const nid = nj * n + ni;
        if ( !ene[nid] || ca1ara[nid] >= 0 ) continue;
        const sef4 = Math.max(H[nid], altoNun);
        if ( sef4 < havesukani[nid] ) { havesukani[nid] = sef4; amaso.tlunakani(sef4, nid); }
      }
    }
  }

  const k6liqani = new Uint8Array(N);
  const havem2 = new Float32Array(N).fill(NaN);
  const kavoj = new Float32Array(N);
  const fluo = new Float32Array(N);
  const qar6xe = new Uint8Array(N);
  const naturaFluo = haku1o.naturaFluo === true;
  const pasaVido = new Uint8Array(N);

  // ⟨ លំហូរ 📃 ⟩
  let ternoj = 0;
  const tsiqjCxeloj: number[] = [];
  for ( const tsiq of hatsiq ) {
    const fi = Math.round(( tsiq.x - x0 ) / vepat6ni );
    const fj = Math.round(( tsiq.z - z0 ) / vepat6ni );
    if ( fi < 0 || fj < 0 || fi >= n || fj >= n ) continue;
    const saxeni = fj * n + fi;
    if ( !ene[saxeni] ) continue;
    const restanta = Math.max(0, tsiq.fluo);
    if ( restanta > 0 ) tsiqjCxeloj.push(saxeni);
    let id = saxeni;
    let tsel2sai = 0;
    // ⟨ ក្រឡាដែលផ្លូវនេះបានឆ្លងកាត់ ។ កុំត្រឡប់ទៅវិញ , បើអត់ទេ ទឹកនឹងវិល
    // ក្នុងអាងបិទទៅវិញទៅមក ។ 📃 ⟩
    if ( naturaFluo ) pasaVido.fill(0);
    while ( restanta > 0 && tsel2sai++ < N && id >= 0 ) {
      if ( pukaz[id] ) break;
      if ( naturaFluo ) pasaVido[id] = 1;
      // ⟨ អាងបិទជិតតូចនៅលើគោក 📃 ⟩
      // ក្រឡានេះនៅក្រោមកម្រិតច្រកចេញរបស់អាង ។ បើអាងតូច ទឹកកកកុញជាស្រះតូច
      // ដែលមានផ្ទៃស្មើនឹងកម្រិតច្រកនោះ ។ បើអាងធំ ទឹកឆ្លងកាត់វា ព្រោះការបំពេញ
      // អាងធំនឹងបង្កើតជាបឹងរាបធំៗនៅលើភ្នំ ( ដែលមិនធម្មជាតិ ) ។ 📃
      if ( naturaFluo && H[id] >= vem2 && havesukani[id] > H[id] + EPS ) {
        markiBaseneton(H, k6liqani, havem2, ene, n, id, havesukani[id]);
      }
      fluo[id] += restanta;
      if ( !k6liqani[id] ) qar6xe[id] = 1;
      const i = id % n, j = ( id - i ) / n;
      let sekv = -1, sekvAlto = H[id];
      let plejFruta = -1, plejFrutaOrdo = ca1ara[id];
      // ⟨ លំហូរធម្មជាតិ , ធ្លាក់តាមកម្រិតដែលបានបំពេញ ។ លំដាប់បង្ហូរជាការបំបែក
      // ស្មើ , ក្នុងអាងដែលលិចទឹក ក្រឡាទាំងអស់មានកម្រិតដូចគ្នា ដូច្នេះទឹកទៅ
      // រកច្រកចេញតាមលំដាប់ ។ ផ្ទៃដីក្រៅអាងមានកម្រិតស្មើកម្ពស់ដី ។ 📃 ⟩
      let plejMalalta = -1, plejMalaltaInundo = Infinity, plejMalaltaOrdo = Infinity;
      for ( const [di, dj] of NAJBAROJ ) {
        const ni = i + di, nj = j + dj;
        if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
        const nid = nj * n + ni;
        if ( !ene[nid] ) continue;
        if ( naturaFluo ) {
          if ( pasaVido[nid] ) continue;
          if ( havesukani[nid] < plejMalaltaInundo
            || ( havesukani[nid] === plejMalaltaInundo && ca1ara[nid] < plejMalaltaOrdo ) ) {
            plejMalaltaInundo = havesukani[nid]; plejMalaltaOrdo = ca1ara[nid]; plejMalalta = nid;
          }
          continue;
        }
        if ( H[nid] < sekvAlto - EPS ) { sekvAlto = H[nid]; sekv = nid; }
        if ( ca1ara[nid] >= 0 && ca1ara[nid] < plejFrutaOrdo ) { plejFrutaOrdo = ca1ara[nid]; plejFruta = nid; }
      }
      if ( naturaFluo ) sekv = plejMalalta;
      if ( sekv < 0 ) {
        // ⟨ គ្មានជម្រាលចុះ , ដីរាប ឬអាងបិទ 📃 ⟩
        // ⟨ ពិភពលោកដែលបានឆ្លាក់ , អាងបិទក្លាយជាបឹង ។ ពិភពលោកដែលមានគ្រាប់ពូជ ,
        // ទឹកឆ្លងកាត់អាងតាមលំដាប់បង្ហូរ ដើម្បីចេញតាមច្រកទាបបំផុត ហើយបន្តហូរចុះ 📃 ⟩
        if ( !naturaFluo ) {
          if ( havesukani[id] > H[id] + EPS ) {
            markiBasenon( H, k6liqani, havem2, ene, n, id, havesukani[id] );
            qar6xe[id] = 0;
          }
          sekv = plejFruta;
        }
        if ( sekv < 0 ) {
          // ⟨ គ្មានក្រឡាបន្ត , កុំបង្កើតស្រះក្លែងក្លាយ ។ ពិភពលោកដែលបានឆ្លាក់រក្សា
          // ស្រះបន្ថែមដើម្បីកុំឱ្យទឹកបាត់ ។ 📃 ⟩
          if ( !naturaFluo && !k6liqani[id] ) {
            ternoj++;
            markiTernon( H, k6liqani, havem2, ene, n, id, vem2 );
            qar6xe[id] = 0;
          }
          break;
        }
      }
      if ( H[sekv] < vem2 ) { markiBasenon( H, k6liqani, havem2, ene, n, sekv, vem2 ); break; }
      id = sekv;
    }
  }

  // ⟨ ប្រឡាយ 📃 ⟩
  for ( let id = 0; id < N; id++ ) {
    if ( !qar6xe[id] || k6liqani[id] || H[id] < vem2 ) continue;
    const profundo0 = profundoMaks * ( 1 - Math.exp(-fluo[id] / fluoSkalo) );
    const profundo = Math.min(profundo0, Math.max(0, H[id] - vem2));
    if ( profundo < minimumaProfundo ) continue;
    kavoj[id] = profundo;
    const soza = H[id] - profundo * ( 0o1/0o4 );
    havem2[id] = soza;
    k6liqani[id] = 1;
    const larghxo = profundo / profundoMaks;
    const i = id % n, j = ( id - i ) / n;
    for ( const [di, dj] of NAJBAROJ ) {
      const ni = i + di, nj = j + dj;
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( !ene[nid] || !qar6xe[nid] || k6liqani[nid] || H[nid] < vem2 ) continue;
      const orta = di === 0 || dj === 0;
      const kav = profundo * ( orta ? 0o1/0o2 : 0o1/0o20 ) * larghxo;
      if ( H[nid] - kav >= soza ) continue;
      if ( kav > kavoj[nid] ) kavoj[nid] = kav;
      if ( Number.isNaN(havem2[nid]) || havem2[nid] > soza ) havem2[nid] = soza;
      k6liqani[nid] = 1;
    }
  }

  // ⟨ ផ្ទៃប្រឡាយ 📃 ⟩
  for ( let id = 0; id < N; id++ ) {
    if ( !k6liqani[id] || kavoj[id] <= 0 || !qar6xe[id] ) continue;
    const fundo = H[id] - kavoj[id];
    const minimumo = fundo + minimumaProfundo * ( 0o3/0o4 );
    if ( havem2[id] < minimumo ) havem2[id] = minimumo;
  }

  // ⟨ អាង 📃 ⟩
  if ( hatk2ni ) {
    for ( let id = 0; id < N; id++ ) {
      if ( hatk2ni[id] && ene[id] && H[id] < vem2 ) markiBasenon( H, k6liqani, havem2, ene, n, id, vem2 );
    }
  }
  for ( const id of tsiqjCxeloj ) {
    if ( H[id] < vem2 ) markiBasenon( H, k6liqani, havem2, ene, n, id, vem2 );
  }

  // ⟨ កម្រិតនៃក្រឡាគោក 📃 ⟩
  // ⟨ ក្រឡាដែលគ្មានទឹកទទួលកម្រិតក្រោមដីបន្តិច ។ បើអត់ទេ កម្រិតទឹករបស់ក្រឡា
  // ជិតខាងលាតសន្ធឹងលើដីគោក ហើយទឹកលេចឡើងជាសន្លឹកអណ្តែត ។ 📃 ⟩
  if ( naturaFluo ) {
    for ( let id = 0; id < N; id++ ) {
      if ( !k6liqani[id] ) havem2[id] = H[id] - 0o1/0o4;
    }
  }

  let akvaj = 0, haqar6xe = 0;
  for ( let id = 0; id < N; id++ ) {
    if ( k6liqani[id] ) {
      akvaj++;
      if ( kavoj[id] > 0 ) haqar6xe++;
    }
  }
  return { k6liqani, havem2, kavoj, havesukani, statistikoj: { hatsiq: hatsiq.length, haqar6xe, akvaj, ternoj } };
}

function markiBasenon(
  H: Float32Array, k6liqani: Uint8Array, havem2: Float32Array, ene: Uint8Array,
  n: number, saxeni: number, vem2: number,
): void {
  if ( H[saxeni] >= vem2 ) return;
  // ⟨ ស្រះនេះបានបំពេញរួចហើយ ។ កុំចំណាយពេលម្តងទៀត 📃 ⟩
  if ( k6liqani[saxeni] && havem2[saxeni] === vem2 ) return;
  const x2pa = new Int32Array(n * n);
  let teruni = 0, nar2sa = 0;
  x2pa[nar2sa++] = saxeni;
  k6liqani[saxeni] = 1;
  havem2[saxeni] = vem2;
  while ( teruni < nar2sa ) {
    const id = x2pa[teruni++];
    const i = id % n, j = ( id - i ) / n;
    for ( const [di, dj] of NAJBAROJ ) {
      const ni = i + di, nj = j + dj;
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( k6liqani[nid] || !ene[nid] || H[nid] >= vem2 ) continue;
      k6liqani[nid] = 1;
      havem2[nid] = vem2;
      x2pa[nar2sa++] = nid;
    }
  }
}

/*បំពេញអាងបិទជិតតូចមួយជាស្រះ
    @param H,k6liqani,havem2,ene ( typed arrays ) - ក្រឡាដី និងលទ្ធផល
    @param n ( number ) - ចំនួនក្រឡាក្នុងមួយជ្រុង
    @param saxeni ( number ) - ក្រឡាដែលចាប់ផ្តើម
    @param vem2 ( number ) - កម្រិតទឹករបស់ស្រះ
@returns tem2 ( boolean ) - ពិត បើអាងតូចល្មម ហើយបានបំពេញ */
function markiBaseneton(
  H: Float32Array, k6liqani: Uint8Array, havem2: Float32Array, ene: Uint8Array,
  n: number, saxeni: number, vem2: number,
): boolean {
  if ( H[saxeni] >= vem2 || k6liqani[saxeni] ) return false;
  const x2pa: number[] = [ saxeni ];
  const viditaj = new Set<number>([ saxeni ]);
  for ( let teruni = 0; teruni < x2pa.length; teruni++ ) {
    if ( x2pa.length >= BASENETO_MAKS ) return false;
    const id = x2pa[teruni];
    const i = id % n, j = ( id - i ) / n;
    for ( const [ di, dj ] of NAJBAROJ ) {
      const ni = i + di, nj = j + dj;
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( viditaj.has(nid) || k6liqani[nid] || !ene[nid] || H[nid] >= vem2 ) continue;
      viditaj.add(nid);
      x2pa.push(nid);
    }
  }
  for ( const id of x2pa ) { k6liqani[id] = 1; havem2[id] = vem2; }
  return true;
}

function markiTernon(
  H: Float32Array, k6liqani: Uint8Array, havem2: Float32Array, ene: Uint8Array,
  n: number, saxeni: number, vem2: number,
): void {
  const soza = Math.max(H[saxeni] + 0o1/0o10, vem2);
  const i0 = saxeni % n, j0 = ( saxeni - i0 ) / n;
  for ( let dj = -1; dj <= 1; dj++ ) {
    for ( let di = -1; di <= 1; di++ ) {
      const ni = i0 + di, nj = j0 + dj;
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( !ene[nid] || H[nid] > soza ) continue;
      k6liqani[nid] = 1;
      havem2[nid] = soza;
    }
  }
}

// ⟨ ជំនួយគំរូ 📃 ⟩

export function specimenoDulineara( krado: Float32Array | Uint8Array,
  n: number, vepat6ni: number, origino: number[], x: number, z: number ): number {
  const fx = ( x - origino[0] ) / vepat6ni, fz = ( z - origino[1] ) / vepat6ni;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  if ( i0 < 0 || j0 < 0 || i0 + 1 >= n || j0 + 1 >= n ) return 0;
  const u = fx - i0, v = fz - j0;
  const a = krado[j0 * n + i0], b = krado[j0 * n + i0 + 1];
  const c = krado[( j0 + 1 ) * n + i0], d = krado[( j0 + 1 ) * n + i0 + 1];
  return a * ( 1 - u ) * ( 1 - v ) + b * u * ( 1 - v ) + c * ( 1 - u ) * v + d * u * v;
}

/*ច្របាច់លេខក្រឡាចូលក្នុងដែនតារាង
    @param v ( number ) - លេខក្រឡាដែលអាចហួសដែន
    @param n ( number ) - ចំនួនក្រឡាក្នុងមួយជ្រុង
@returns i ( number ) - ក្រឡាក្នុងដែន 0 ដល់ n-1 */
function fiksuKradon( v: number, n: number ): number {
  const n1 = n - 1;
  return v < 0 ? 0 : v > n1 ? n1 : v;
}

export function specimenoBikuba( krado: Float32Array,
  n: number, vepat6ni: number, origino: number[], x: number, z: number ): number {
  const fx = ( x - origino[0] ) / vepat6ni, fz = ( z - origino[1] ) / vepat6ni;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  // ⟨ ជួរឈរ និងជួរដេកដែលបានច្របាច់ ៖ គណនាម្តង ប្រើច្រើន 📃 ⟩
  // ជៀសវាងការបង្កើត closure រាល់ពេលហៅ ព្រោះមុខងារនេះរត់រាល់កំពូលដី ។
  const c0 = fiksuKradon(i0 - 1, n), c1 = fiksuKradon(i0, n);
  const c2 = fiksuKradon(i0 + 1, n), c3 = fiksuKradon(i0 + 2, n);
  const r0 = fiksuKradon(j0 - 1, n) * n, r1 = fiksuKradon(j0, n) * n;
  const r2 = fiksuKradon(j0 + 1, n) * n, r3 = fiksuKradon(j0 + 2, n) * n;
  return Math.max(0, katmullRom(
    katmullRom(krado[r0 + c0], krado[r0 + c1], krado[r0 + c2], krado[r0 + c3], u),
    katmullRom(krado[r1 + c0], krado[r1 + c1], krado[r1 + c2], krado[r1 + c3], u),
    katmullRom(krado[r2 + c0], krado[r2 + c1], krado[r2 + c2], krado[r2 + c3], u),
    katmullRom(krado[r3 + c0], krado[r3 + c1], krado[r3 + c2], krado[r3 + c3], u),
    v));
}

export function akvoCxe( tseuni: AkvaKalkulo, n: number, vepat6ni: number,
  origino: number[], x: number, z: number ): boolean {
  return specimenoDulineara(tseuni.k6liqani, n, vepat6ni, origino, x, z) >= 0o1/0o2;
}

export function vem2Cxe( tseuni: AkvaKalkulo, n: number, vepat6ni: number,
  origino: number[], x: number, z: number, r = 0o1 ): number {
  const fx = ( x - origino[0] ) / vepat6ni, fz = ( z - origino[1] ) / vepat6ni;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  let tlunakani = 0, s2karanu = 0;
  for ( let k = 0; k < 4; k++ ) {
    const i = i0 + ( k & 1 ), j = j0 + ( k >> 1 );
    if ( i < 0 || j < 0 || i >= n || j >= n ) continue;
    const vem2 = tseuni.havem2[j * n + i];
    if ( Number.isNaN(vem2) ) continue;
    const w = ( k & 1 ? u : 1 - u ) * ( k >> 1 ? v : 1 - v );
    tlunakani += vem2 * w;
    s2karanu += w;
  }
  if ( s2karanu > 0 ) return tlunakani / s2karanu;
  return vem2Proksima(tseuni, n, vepat6ni, origino, x, z, r);
}

export function vem2Proksima( tseuni: AkvaKalkulo, n: number, vepat6ni: number,
  origino: number[], x: number, z: number, r = 0o1 ): number {
  const ic = Math.round(( x - origino[0] ) / vepat6ni );
  const jc = Math.round(( z - origino[1] ) / vepat6ni );
  for ( let c2q = 0; c2q <= r; c2q++ ) {
    for ( let dj = -c2q; dj <= c2q; dj++ ) {
      for ( let di = -c2q; di <= c2q; di++ ) {
        if ( c2q > 0 && Math.abs(di) !== c2q && Math.abs(dj) !== c2q ) continue;
        const i = ic + di, j = jc + dj;
        if ( i < 0 || j < 0 || i >= n || j >= n ) continue;
        const vem2 = tseuni.havem2[j * n + i];
        if ( !Number.isNaN(vem2) ) return vem2;
      }
    }
  }
  return NaN;
}

export function limojDeAkvo( tseuni: AkvaKalkulo, n: number, vepat6ni: number,
  origino: number[], libero = 0o2 ): { x0: number; z0: number; x1: number; z1: number } | null {
  let imin = n, imax = -1, jmin = n, jmax = -1;
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      if ( tseuni.k6liqani[j * n + i] ) {
        if ( i < imin ) imin = i;
        if ( i > imax ) imax = i;
        if ( j < jmin ) jmin = j;
        if ( j > jmax ) jmax = j;
      }
    }
  }
  if ( imax < 0 ) return null;
  return {
    x0: origino[0] + ( imin - libero ) * vepat6ni,
    z0: origino[1] + ( jmin - libero ) * vepat6ni,
    x1: origino[0] + ( imax + 1 + libero ) * vepat6ni,
    z1: origino[1] + ( jmax + 1 + libero ) * vepat6ni,
  };
}

class Amaso {
  private hatskek2: Float32Array;
  private havecax2lani: Int32Array;
  length = 0;

  constructor( vanekalani: number ) {
    this.hatskek2 = new Float32Array(vanekalani + 1);
    this.havecax2lani = new Int32Array(vanekalani + 1);
  }

  tlunakani( skek2: number, vecax2lani: number ): void {
    let c = this.length++;
    this.hatskek2[c] = skek2;
    this.havecax2lani[c] = vecax2lani;
    while ( c > 0 ) {
      const p = ( c - 1 ) >> 1;
      if ( this.hatskek2[p] <= this.hatskek2[c] ) break;
      this.interSxangxi(p, c);
      c = p;
    }
  }

  preni(): [number, number] {
    const skek2 = this.hatskek2[0], vecax2lani = this.havecax2lani[0];
    this.length--;
    if ( this.length > 0 ) {
      this.hatskek2[0] = this.hatskek2[this.length];
      this.havecax2lani[0] = this.havecax2lani[this.length];
      let p = 0;
      for ( ;; ) {
        const l = 2 * p + 1, r = l + 1;
        let m = p;
        if ( l < this.length && this.hatskek2[l] < this.hatskek2[m] ) m = l;
        if ( r < this.length && this.hatskek2[r] < this.hatskek2[m] ) m = r;
        if ( m === p ) break;
        this.interSxangxi(p, m);
        p = m;
      }
    }
    return [skek2, vecax2lani];
  }

  private interSxangxi( a: number, b: number ): void {
    const v = this.hatskek2[a]; this.hatskek2[a] = this.hatskek2[b]; this.hatskek2[b] = v;
    const i = this.havecax2lani[a]; this.havecax2lani[a] = this.havecax2lani[b]; this.havecax2lani[b] = i;
  }
}
