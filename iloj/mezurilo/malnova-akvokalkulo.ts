// ≺⧼ ការគណនាទឹក 🌊 ⧽≻
import { katmullRom } from "../../kantaoj/komunajxoj/interpolo.js";

export interface AkvaFonto {
  x: number;
  z: number;
  fluo: number;
}

export interface AkvaAgordoj {
  nivelo: number;
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
  masko: Uint8Array;
  niveloj: Float32Array;
  kavoj: Float32Array;
  inundoj: Float32Array;
  statistikoj: { fontoj: number; kanaloj: number; akvaj: number; ternoj: number };
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
  paso: number,
  origino: [number, number],
  alto: ( x: number, z: number ) => number,
  enFormo: ( x: number, z: number ) => boolean,
  fontoj: AkvaFonto[],
  semoj: Uint8Array | null,
  agordoj: AkvaAgordoj,
): AkvaKalkulo {
  const N = n * n;
  const x0 = origino[0], z0 = origino[1];
  const nivelo = agordoj.nivelo;
  const profundoMaks = agordoj.profundoMaks ?? 0o6/0o10;
  const fluoSkalo = agordoj.fluoSkalo ?? 0o10;
  const minimumaProfundo = agordoj.minimumaProfundo ?? 0o1/0o40;

  // ⟨ ក្រឡា 📃 ⟩
  const H = new Float32Array(N);
  const ene = new Uint8Array(N);
  const rando = new Uint8Array(N);
  for ( let j = 0; j < n; j++ ) {
    const z = z0 + j * paso;
    for ( let i = 0; i < n; i++ ) {
      const id = j * n + i;
      H[id] = alto(x0 + i * paso, z);
      ene[id] = enFormo(x0 + i * paso, z) ? 1 : 0;
    }
  }
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      const id = j * n + i;
      if ( !ene[id] ) continue;
      for ( const [di, dj] of NAJBAROJ ) {
        const ni = i + di, nj = j + dj;
        if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) { rando[id] = 1; break; }
        if ( !ene[nj * n + ni] ) { rando[id] = 1; break; }
      }
    }
  }

  // ⟨ ការគណនាទឹកជំនន់ 📃 ⟩
  const inundoj = new Float32Array(N).fill(Infinity);
  const ordo = new Int32Array(N).fill(-1);
  {
    const amaso = new Amaso(N);
    for ( let id = 0; id < N; id++ ) {
      if ( ene[id] && rando[id] ) { inundoj[id] = H[id]; amaso.aldoni(H[id], id); }
    }
    let kalkulilo = 0;
    while ( amaso.length > 0 ) {
      const [altoNun, id] = amaso.preni();
      if ( ordo[id] >= 0 ) continue;
      ordo[id] = kalkulilo++;
      const i = id % n, j = ( id - i ) / n;
      for ( const [di, dj] of NAJBAROJ ) {
        const ni = i + di, nj = j + dj;
        if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
        const nid = nj * n + ni;
        if ( !ene[nid] || ordo[nid] >= 0 ) continue;
        const nova = Math.max(H[nid], altoNun);
        if ( nova < inundoj[nid] ) { inundoj[nid] = nova; amaso.aldoni(nova, nid); }
      }
    }
  }

  const masko = new Uint8Array(N);
  const niveloj = new Float32Array(N).fill(NaN);
  const kavoj = new Float32Array(N);
  const fluo = new Float32Array(N);
  const kanalo = new Uint8Array(N);
  const naturaFluo = agordoj.naturaFluo === true;
  const pasaVido = new Uint8Array(N);

  // ⟨ លំហូរ 📃 ⟩
  let ternoj = 0;
  const fontajCxeloj: number[] = [];
  for ( const fonto of fontoj ) {
    const fi = Math.round(( fonto.x - x0 ) / paso );
    const fj = Math.round(( fonto.z - z0 ) / paso );
    if ( fi < 0 || fj < 0 || fi >= n || fj >= n ) continue;
    const starto = fj * n + fi;
    if ( !ene[starto] ) continue;
    const restanta = Math.max(0, fonto.fluo);
    if ( restanta > 0 ) fontajCxeloj.push(starto);
    let id = starto;
    let sekuraj = 0;
    // ⟨ ក្រឡាដែលផ្លូវនេះបានឆ្លងកាត់ ។ កុំត្រឡប់ទៅវិញ , បើអត់ទេ ទឹកនឹងវិល
    // ក្នុងអាងបិទទៅវិញទៅមក ។ 📃 ⟩
    if ( naturaFluo ) pasaVido.fill(0);
    while ( restanta > 0 && sekuraj++ < N && id >= 0 ) {
      if ( rando[id] ) break;
      if ( naturaFluo ) pasaVido[id] = 1;
      // ⟨ អាងបិទជិតតូចនៅលើគោក 📃 ⟩
      // ក្រឡានេះនៅក្រោមកម្រិតច្រកចេញរបស់អាង ។ បើអាងតូច ទឹកកកកុញជាស្រះតូច
      // ដែលមានផ្ទៃស្មើនឹងកម្រិតច្រកនោះ ។ បើអាងធំ ទឹកឆ្លងកាត់វា ព្រោះការបំពេញ
      // អាងធំនឹងបង្កើតជាបឹងរាបធំៗនៅលើភ្នំ ( ដែលមិនធម្មជាតិ ) ។ 📃
      if ( naturaFluo && H[id] >= nivelo && inundoj[id] > H[id] + EPS ) {
        markiBaseneton(H, masko, niveloj, ene, n, id, inundoj[id]);
      }
      fluo[id] += restanta;
      if ( !masko[id] ) kanalo[id] = 1;
      const i = id % n, j = ( id - i ) / n;
      let sekv = -1, sekvAlto = H[id];
      let plejFruta = -1, plejFrutaOrdo = ordo[id];
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
          if ( inundoj[nid] < plejMalaltaInundo
            || ( inundoj[nid] === plejMalaltaInundo && ordo[nid] < plejMalaltaOrdo ) ) {
            plejMalaltaInundo = inundoj[nid]; plejMalaltaOrdo = ordo[nid]; plejMalalta = nid;
          }
          continue;
        }
        if ( H[nid] < sekvAlto - EPS ) { sekvAlto = H[nid]; sekv = nid; }
        if ( ordo[nid] >= 0 && ordo[nid] < plejFrutaOrdo ) { plejFrutaOrdo = ordo[nid]; plejFruta = nid; }
      }
      if ( naturaFluo ) sekv = plejMalalta;
      if ( sekv < 0 ) {
        // ⟨ គ្មានជម្រាលចុះ , ដីរាប ឬអាងបិទ 📃 ⟩
        // ⟨ ពិភពលោកដែលបានឆ្លាក់ , អាងបិទក្លាយជាបឹង ។ ពិភពលោកដែលមានគ្រាប់ពូជ ,
        // ទឹកឆ្លងកាត់អាងតាមលំដាប់បង្ហូរ ដើម្បីចេញតាមច្រកទាបបំផុត ហើយបន្តហូរចុះ 📃 ⟩
        if ( !naturaFluo ) {
          if ( inundoj[id] > H[id] + EPS ) {
            markiBasenon( H, masko, niveloj, ene, n, id, inundoj[id] );
            kanalo[id] = 0;
          }
          sekv = plejFruta;
        }
        if ( sekv < 0 ) {
          // ⟨ គ្មានក្រឡាបន្ត , កុំបង្កើតស្រះក្លែងក្លាយ ។ ពិភពលោកដែលបានឆ្លាក់រក្សា
          // ស្រះបន្ថែមដើម្បីកុំឱ្យទឹកបាត់ ។ 📃 ⟩
          if ( !naturaFluo && !masko[id] ) {
            ternoj++;
            markiTernon( H, masko, niveloj, ene, n, id, nivelo );
            kanalo[id] = 0;
          }
          break;
        }
      }
      if ( H[sekv] < nivelo ) { markiBasenon( H, masko, niveloj, ene, n, sekv, nivelo ); break; }
      id = sekv;
    }
  }

  // ⟨ ប្រឡាយ 📃 ⟩
  for ( let id = 0; id < N; id++ ) {
    if ( !kanalo[id] || masko[id] || H[id] < nivelo ) continue;
    const profundo0 = profundoMaks * ( 1 - Math.exp(-fluo[id] / fluoSkalo) );
    const profundo = Math.min(profundo0, Math.max(0, H[id] - nivelo));
    if ( profundo < minimumaProfundo ) continue;
    kavoj[id] = profundo;
    const surfaco = H[id] - profundo * ( 0o1/0o4 );
    niveloj[id] = surfaco;
    masko[id] = 1;
    const larghxo = profundo / profundoMaks;
    const i = id % n, j = ( id - i ) / n;
    for ( const [di, dj] of NAJBAROJ ) {
      const ni = i + di, nj = j + dj;
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( !ene[nid] || !kanalo[nid] || masko[nid] || H[nid] < nivelo ) continue;
      const orta = di === 0 || dj === 0;
      const kav = profundo * ( orta ? 0o1/0o2 : 0o1/0o20 ) * larghxo;
      if ( H[nid] - kav >= surfaco ) continue;
      if ( kav > kavoj[nid] ) kavoj[nid] = kav;
      if ( Number.isNaN(niveloj[nid]) || niveloj[nid] > surfaco ) niveloj[nid] = surfaco;
      masko[nid] = 1;
    }
  }

  // ⟨ ផ្ទៃប្រឡាយ 📃 ⟩
  for ( let id = 0; id < N; id++ ) {
    if ( !masko[id] || kavoj[id] <= 0 || !kanalo[id] ) continue;
    const fundo = H[id] - kavoj[id];
    const minimumo = fundo + minimumaProfundo * ( 0o3/0o4 );
    if ( niveloj[id] < minimumo ) niveloj[id] = minimumo;
  }

  // ⟨ អាង 📃 ⟩
  if ( semoj ) {
    for ( let id = 0; id < N; id++ ) {
      if ( semoj[id] && ene[id] && H[id] < nivelo ) markiBasenon( H, masko, niveloj, ene, n, id, nivelo );
    }
  }
  for ( const id of fontajCxeloj ) {
    if ( H[id] < nivelo ) markiBasenon( H, masko, niveloj, ene, n, id, nivelo );
  }

  // ⟨ កម្រិតនៃក្រឡាគោក 📃 ⟩
  // ⟨ ក្រឡាដែលគ្មានទឹកទទួលកម្រិតក្រោមដីបន្តិច ។ បើអត់ទេ កម្រិតទឹករបស់ក្រឡា
  // ជិតខាងលាតសន្ធឹងលើដីគោក ហើយទឹកលេចឡើងជាសន្លឹកអណ្តែត ។ 📃 ⟩
  if ( naturaFluo ) {
    for ( let id = 0; id < N; id++ ) {
      if ( !masko[id] ) niveloj[id] = H[id] - 0o1/0o4;
    }
  }

  let akvaj = 0, kanaloj = 0;
  for ( let id = 0; id < N; id++ ) {
    if ( masko[id] ) {
      akvaj++;
      if ( kavoj[id] > 0 ) kanaloj++;
    }
  }
  return { masko, niveloj, kavoj, inundoj, statistikoj: { fontoj: fontoj.length, kanaloj, akvaj, ternoj } };
}

function markiBasenon(
  H: Float32Array, masko: Uint8Array, niveloj: Float32Array, ene: Uint8Array,
  n: number, starto: number, nivelo: number,
): void {
  if ( H[starto] >= nivelo ) return;
  // ⟨ ស្រះនេះបានបំពេញរួចហើយ ។ កុំចំណាយពេលម្តងទៀត 📃 ⟩
  if ( masko[starto] && niveloj[starto] === nivelo ) return;
  const vico = new Int32Array(n * n);
  let kapo = 0, vosto = 0;
  vico[vosto++] = starto;
  masko[starto] = 1;
  niveloj[starto] = nivelo;
  while ( kapo < vosto ) {
    const id = vico[kapo++];
    const i = id % n, j = ( id - i ) / n;
    for ( const [di, dj] of NAJBAROJ ) {
      const ni = i + di, nj = j + dj;
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( masko[nid] || !ene[nid] || H[nid] >= nivelo ) continue;
      masko[nid] = 1;
      niveloj[nid] = nivelo;
      vico[vosto++] = nid;
    }
  }
}

/*បំពេញអាងបិទជិតតូចមួយជាស្រះ
    @param H,masko,niveloj,ene ( typed arrays ) - ក្រឡាដី និងលទ្ធផល
    @param n ( number ) - ចំនួនក្រឡាក្នុងមួយជ្រុង
    @param starto ( number ) - ក្រឡាដែលចាប់ផ្តើម
    @param nivelo ( number ) - កម្រិតទឹករបស់ស្រះ
@returns plenigita ( boolean ) - ពិត បើអាងតូចល្មម ហើយបានបំពេញ */
function markiBaseneton(
  H: Float32Array, masko: Uint8Array, niveloj: Float32Array, ene: Uint8Array,
  n: number, starto: number, nivelo: number,
): boolean {
  if ( H[starto] >= nivelo || masko[starto] ) return false;
  const vico: number[] = [ starto ];
  const viditaj = new Set<number>([ starto ]);
  for ( let kapo = 0; kapo < vico.length; kapo++ ) {
    if ( vico.length >= BASENETO_MAKS ) return false;
    const id = vico[kapo];
    const i = id % n, j = ( id - i ) / n;
    for ( const [ di, dj ] of NAJBAROJ ) {
      const ni = i + di, nj = j + dj;
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( viditaj.has(nid) || masko[nid] || !ene[nid] || H[nid] >= nivelo ) continue;
      viditaj.add(nid);
      vico.push(nid);
    }
  }
  for ( const id of vico ) { masko[id] = 1; niveloj[id] = nivelo; }
  return true;
}

function markiTernon(
  H: Float32Array, masko: Uint8Array, niveloj: Float32Array, ene: Uint8Array,
  n: number, starto: number, nivelo: number,
): void {
  const surfaco = Math.max(H[starto] + 0o1/0o10, nivelo);
  const i0 = starto % n, j0 = ( starto - i0 ) / n;
  for ( let dj = -1; dj <= 1; dj++ ) {
    for ( let di = -1; di <= 1; di++ ) {
      const ni = i0 + di, nj = j0 + dj;
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( !ene[nid] || H[nid] > surfaco ) continue;
      masko[nid] = 1;
      niveloj[nid] = surfaco;
    }
  }
}

// ⟨ ជំនួយគំរូ 📃 ⟩

export function specimenoDulineara( krado: Float32Array | Uint8Array,
  n: number, paso: number, origino: number[], x: number, z: number ): number {
  const fx = ( x - origino[0] ) / paso, fz = ( z - origino[1] ) / paso;
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
  n: number, paso: number, origino: number[], x: number, z: number ): number {
  const fx = ( x - origino[0] ) / paso, fz = ( z - origino[1] ) / paso;
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

export function akvoCxe( rezulto: AkvaKalkulo, n: number, paso: number,
  origino: number[], x: number, z: number ): boolean {
  return specimenoDulineara(rezulto.masko, n, paso, origino, x, z) >= 0o1/0o2;
}

export function niveloCxe( rezulto: AkvaKalkulo, n: number, paso: number,
  origino: number[], x: number, z: number, r = 0o1 ): number {
  const fx = ( x - origino[0] ) / paso, fz = ( z - origino[1] ) / paso;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  let sumo = 0, pezo = 0;
  for ( let k = 0; k < 4; k++ ) {
    const i = i0 + ( k & 1 ), j = j0 + ( k >> 1 );
    if ( i < 0 || j < 0 || i >= n || j >= n ) continue;
    const nivelo = rezulto.niveloj[j * n + i];
    if ( Number.isNaN(nivelo) ) continue;
    const w = ( k & 1 ? u : 1 - u ) * ( k >> 1 ? v : 1 - v );
    sumo += nivelo * w;
    pezo += w;
  }
  if ( pezo > 0 ) return sumo / pezo;
  return niveloProksima(rezulto, n, paso, origino, x, z, r);
}

export function niveloProksima( rezulto: AkvaKalkulo, n: number, paso: number,
  origino: number[], x: number, z: number, r = 0o1 ): number {
  const ic = Math.round(( x - origino[0] ) / paso );
  const jc = Math.round(( z - origino[1] ) / paso );
  for ( let ringo = 0; ringo <= r; ringo++ ) {
    for ( let dj = -ringo; dj <= ringo; dj++ ) {
      for ( let di = -ringo; di <= ringo; di++ ) {
        if ( ringo > 0 && Math.abs(di) !== ringo && Math.abs(dj) !== ringo ) continue;
        const i = ic + di, j = jc + dj;
        if ( i < 0 || j < 0 || i >= n || j >= n ) continue;
        const nivelo = rezulto.niveloj[j * n + i];
        if ( !Number.isNaN(nivelo) ) return nivelo;
      }
    }
  }
  return NaN;
}

export function limojDeAkvo( rezulto: AkvaKalkulo, n: number, paso: number,
  origino: number[], libero = 0o2 ): { x0: number; z0: number; x1: number; z1: number } | null {
  let imin = n, imax = -1, jmin = n, jmax = -1;
  for ( let j = 0; j < n; j++ ) {
    for ( let i = 0; i < n; i++ ) {
      if ( rezulto.masko[j * n + i] ) {
        if ( i < imin ) imin = i;
        if ( i > imax ) imax = i;
        if ( j < jmin ) jmin = j;
        if ( j > jmax ) jmax = j;
      }
    }
  }
  if ( imax < 0 ) return null;
  return {
    x0: origino[0] + ( imin - libero ) * paso,
    z0: origino[1] + ( jmin - libero ) * paso,
    x1: origino[0] + ( imax + 1 + libero ) * paso,
    z1: origino[1] + ( jmax + 1 + libero ) * paso,
  };
}

class Amaso {
  private valoroj: Float32Array;
  private indeksoj: Int32Array;
  length = 0;

  constructor( kapacito: number ) {
    this.valoroj = new Float32Array(kapacito + 1);
    this.indeksoj = new Int32Array(kapacito + 1);
  }

  aldoni( valoro: number, indekso: number ): void {
    let c = this.length++;
    this.valoroj[c] = valoro;
    this.indeksoj[c] = indekso;
    while ( c > 0 ) {
      const p = ( c - 1 ) >> 1;
      if ( this.valoroj[p] <= this.valoroj[c] ) break;
      this.interSxangxi(p, c);
      c = p;
    }
  }

  preni(): [number, number] {
    const valoro = this.valoroj[0], indekso = this.indeksoj[0];
    this.length--;
    if ( this.length > 0 ) {
      this.valoroj[0] = this.valoroj[this.length];
      this.indeksoj[0] = this.indeksoj[this.length];
      let p = 0;
      for ( ;; ) {
        const l = 2 * p + 1, r = l + 1;
        let m = p;
        if ( l < this.length && this.valoroj[l] < this.valoroj[m] ) m = l;
        if ( r < this.length && this.valoroj[r] < this.valoroj[m] ) m = r;
        if ( m === p ) break;
        this.interSxangxi(p, m);
        p = m;
      }
    }
    return [valoro, indekso];
  }

  private interSxangxi( a: number, b: number ): void {
    const v = this.valoroj[a]; this.valoroj[a] = this.valoroj[b]; this.valoroj[b] = v;
    const i = this.indeksoj[a]; this.indeksoj[a] = this.indeksoj[b]; this.indeksoj[b] = i;
  }
}
