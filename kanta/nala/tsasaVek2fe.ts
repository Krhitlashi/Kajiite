// ≺⧼ ſᶘᴜ j͑ʃᴜ j͑ʃᴜꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🌊 ⧽≻
import { bikubaPx01o } from "../x2x2q/interpolo.js";

export interface AkvaTsiq {
  x: number;
  z: number;
  las: number;
}

export interface AkvaHaku1o {
  vem2: number;
  jufuMaks?: number;
  lasP6zuk?: number;
  minimumaProfundo?: number;
  // ⟨ j͐ʃᴜɔ˞ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟩
  // }ʃᴜ j͐ʃᴜ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ , ſᶘᴜ j͑ʃᴜ ʌ j͐ʃᴜɔ˞ ʌ ı],w ɽ͑ʃ'w ⟅ j͑ʃɹ ı],w ɽ͑ʃ'w ⟅
  // ſ͕ɭɜ ı],w ʌ ꞙɭı , j͑ʃɹ ı],w ɽ͑ʃ'w ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ʃɔ ⟅
  // ꞙɭı ſᶘᴜ j͑ʃᴜ ʌ j͐ʃэ ɭ(ᴜ ʌ ɭl̀ᴜ ſ͕ɭɜ , ꞙɭɔ ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɹ ı],w ɽ͑ʃ'w ʌ ɭl̀ᴜ ſ͕ɭɜ ⟅
  tsofLas?: boolean;
}

export interface AkvaKek2 {
  k6liqani: Uint8Array;
  havem2: Float32Array;
  hah6k6: Float32Array;
  havesukani: Float32Array;
  vop2kekai: { hatsiq: number; haqar6xe: number; hatsasa: number; hat6lima: number };
}

// ⟨ ꞙɭ8 ʌ ſɭɹ ſןᴜ : ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ 📃 ⟩ , ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ɭl̀ᴜ ,
//   ꞙɭı ʌ ſɭɹ ſןᴜ ʌ ſɭᴜ ʌ ſɭᴜ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ , ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ
//   ſɭɜ ʃɔ ʌ }ʃɹƽ 📃 ⟩
const NAJBARAJDI = new Int8Array([ -0o1, 0o0, 0o1, -0o1, 0o1, -0o1, 0o0, 0o1 ]);
const NAJBARAJDJ = new Int8Array([ -0o1, -0o1, -0o1, 0o0, 0o0, 0o1, 0o1, 0o1 ]);
const NAJBAROJ = 0o10;

const EPS = 0o1/0o20;

// ⟨ ſןᴜ j͐ʃэ ʌ ſ͕ɭɜ ı],w 📃 ⟩
// ſ͕ɭɜ ı],w ʌ ꞙɭı ʌ ſןᴜ j͐ʃэ , j͑ʃɹ ı],w ɽ͑ʃ'w ꞙɭɔ , ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ſ͕ɭɜ ı],w
// j͑ʃɹ ı],w ɽ͑ʃ'w ʌ ɭl̀ᴜ ſ͕ɭɜ ⟅
const BASENETOMAKS = 0o30;

export function vek2feTsasa(
  n: number,
  vepat6ni: number,
  tsiq: [number, number],
  l6da: ( x: number, z: number ) => number,
  enQoxa: ( x: number, z: number ) => boolean,
  hatsiq: AkvaTsiq[],
  hatk2ni: Uint8Array | null,
  haku1o: AkvaHaku1o,
): AkvaKek2 {
  const N = n * n;
  const x0 = tsiq[0o0], z0 = tsiq[0o1];
  const vem2 = haku1o.vem2;
  const jufuMaks = haku1o.jufuMaks ?? 0o6/0o10;
  const lasP6zuk = haku1o.lasP6zuk ?? 0o10;
  const minimumaProfundo = haku1o.minimumaProfundo ?? 0o1/0o40;

  // ⟨ ſɭɹ ſןᴜ 📃 ⟩
  const H = new Float32Array(N);
  const ene = new Uint8Array(N);
  const pukaz = new Uint8Array(N);
  for ( let j = 0o0; j < n; j++ ) {
    const z = z0 + j * vepat6ni;
    for ( let i = 0o0; i < n; i++ ) {
      const id = j * n + i;
      H[id] = l6da(x0 + i * vepat6ni, z);
      ene[id] = enQoxa(x0 + i * vepat6ni, z) ? 0o1 : 0o0;
    }
  }
  for ( let j = 0o0; j < n; j++ ) {
    for ( let i = 0o0; i < n; i++ ) {
      const id = j * n + i;
      if ( !ene[id] ) continue;
      for ( let q = 0o0; q < NAJBAROJ; q++ ) {
        const ni = i + NAJBARAJDI[q], nj = j + NAJBARAJDJ[q];
        if ( ni < 0o0 || nj < 0o0 || ni >= n || nj >= n ) { pukaz[id] = 0o1; break; }
        if ( !ene[nj * n + ni] ) { pukaz[id] = 0o1; break; }
      }
    }
  }

  // ⟨ j͐ʃᴜɔ˞ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟩
  const havesukani = new Float32Array(N).fill(Infinity);
  const ca1ara = new Int32Array(N).fill(-0o1);
  {
    const amaso = new Amaso(N);
    for ( let id = 0o0; id < N; id++ ) {
      if ( ene[id] && pukaz[id] ) { havesukani[id] = H[id]; amaso.tlunakani(H[id], id); }
    }
    let cak2fe = 0o0;
    while ( amaso.sahakani > 0o0 ) {
      amaso.bok();
      const l6daNun = amaso.skek2, id = amaso.vecax2lani;
      if ( ca1ara[id] >= 0o0 ) continue;
      ca1ara[id] = cak2fe++;
      const i = id % n, j = ( id - i ) / n;
      for ( let q = 0o0; q < NAJBAROJ; q++ ) {
        const ni = i + NAJBARAJDI[q], nj = j + NAJBARAJDJ[q];
        if ( ni < 0o0 || nj < 0o0 || ni >= n || nj >= n ) continue;
        const nid = nj * n + ni;
        if ( !ene[nid] || ca1ara[nid] >= 0o0 ) continue;
        const sef4 = Math.max(H[nid], l6daNun);
        if ( sef4 < havesukani[nid] ) { havesukani[nid] = sef4; amaso.tlunakani(sef4, nid); }
      }
    }
  }

  const k6liqani = new Uint8Array(N);
  const havem2 = new Float32Array(N).fill(NaN);
  const hah6k6 = new Float32Array(N);
  const las = new Float32Array(N);
  const qar6xe = new Uint8Array(N);
  const tsofLas = haku1o.tsofLas === true;
  const pasaVido = new Uint8Array(N);
  // ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭɜ ʃɔ j͑ʃɹ ı],w ɽ͑ʃ'w , ſᶘᴜ j͑ʃᴜ ʌ j͐ʃᴜɔ˞ 📃 ⟩
  //   ꞙɭı ʌ ſɭɹ ſןᴜ ʌ }ʃɹƽ , j͑ʃ'ɔ ŋᷠɹ ʌ ſɭᴜ , ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ
  //   }ʃɹƽ ʌ ſ͕ɭɜ ı],w 📃 ⟩
  const basenaX2pa = new Int32Array(N);
  const basenetaX2pa = new Int32Array(N < 0o100 ? 0o100 : N);
  const basenetaVidita = new Uint8Array(N);

  // ⟨ j͐ʃᴜɔ˞ 📃 ⟩
  let hat6lima = 0o0;
  const tsiqjHak2pa: number[] = [];
  for ( const tsiq of hatsiq ) {
    const fi = Math.round(( tsiq.x - x0 ) / vepat6ni );
    const fj = Math.round(( tsiq.z - z0 ) / vepat6ni );
    if ( fi < 0o0 || fj < 0o0 || fi >= n || fj >= n ) continue;
    const saxeni = fj * n + fi;
    if ( !ene[saxeni] ) continue;
    const restanta = Math.max(0o0, tsiq.las);
    if ( restanta > 0o0 ) tsiqjHak2pa.push(saxeni);
    let id = saxeni;
    let tsel2sai = 0o0;
    // ⟨ ſɭɹ ſןᴜ ʌ ſɭэ ֭ſɭэ ⟅ ꞙɭɔ }ʃɹƽ ʌ ſᶘᴜ j͑ʃᴜ ʌ ſ͕ɭɜ ı],w 📃 ⟩
    // ſ͕ɭɜ ı],w ʌ ꞙɭı j͐ʃᴜɔ˞ ʌ ꞙɭı 📃 ⟩
    if ( tsofLas ) pasaVido.fill(0o0);
    while ( restanta > 0o0 && tsel2sai++ < N && id >= 0o0 ) {
      if ( pukaz[id] ) break;
      if ( tsofLas ) pasaVido[id] = 0o1;
      // ⟨ ſ͕ɭɜ ı],w ʌ ꞙɭı ʌ ſןᴜ j͐ʃэ ʌ ſɭɜ ſɭ,w 📃 ⟩
      // ſɭɹ ſןᴜ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ʃɔ ⟅ ſ͕ɭɜ ı],w ʌ ſןᴜ j͐ʃэ
      // ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɔ ŋᷠɹ ⟅ ſ͕ɭɜ ı],w ʌ ꞙɭı , ſᶘᴜ j͑ʃᴜ ʌ ſɭэ ֭ſɭэ ⟅
      // ſ͕ɭɜ ı],w ʌ j͑ʃ'ɔ ŋᷠɹ , j͑ʃɹ ı],w ɽ͑ʃ'w ʌ ɭl̀ᴜ ſ͕ɭɜ ⟅ 📃 ⟩
      if ( tsofLas && H[id] >= vem2 && havesukani[id] > H[id] + EPS ) {
        s2tasBaseneton(H, k6liqani, havem2, ene, n, id, havesukani[id], basenetaX2pa, basenetaVidita);
      }
      las[id] += restanta;
      if ( !k6liqani[id] ) qar6xe[id] = 0o1;
      const i = id % n, j = ( id - i ) / n;
      let pana = -0o1, panaL6da = H[id];
      let kmaFruta = -0o1, kmaFrutaOrdo = ca1ara[id];
      // ⟨ j͐ʃᴜɔ˞ ʌ ſᶘᴜ j͑ʃᴜ , j͑ʃ'ɔ ŋᷠɹ ʌ ſ͕ɭɜ ı],w 📃 ⟩
      // ſɭɹ ſןᴜ ʌ ſᶘᴜ j͑ʃᴜ , j͑ʃ'ɔ ŋᷠɹ ⟅ ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ }ʃɹƽ 📃 ⟩
      // ſɭɜ ſɭ,w ʌ ꞙɭɔ ſ͕ɭɜ ı],w , j͑ʃ'ɔ ŋᷠɹ ʌ j͐ʃэ ɭ(ᴜ ⟅ 📃 ⟩
      let kmaPsazai = -0o1, kmaPsazaiInundo = Infinity, kmaPsazaiOrdo = Infinity;
      for ( let q = 0o0; q < NAJBAROJ; q++ ) {
        const ni = i + NAJBARAJDI[q], nj = j + NAJBARAJDJ[q];
        if ( ni < 0o0 || nj < 0o0 || ni >= n || nj >= n ) continue;
        const nid = nj * n + ni;
        if ( !ene[nid] ) continue;
        if ( tsofLas ) {
          if ( pasaVido[nid] ) continue;
          if ( havesukani[nid] < kmaPsazaiInundo
            || ( havesukani[nid] === kmaPsazaiInundo && ca1ara[nid] < kmaPsazaiOrdo ) ) {
            kmaPsazaiInundo = havesukani[nid]; kmaPsazaiOrdo = ca1ara[nid]; kmaPsazai = nid;
          }
          continue;
        }
        if ( H[nid] < panaL6da - EPS ) { panaL6da = H[nid]; pana = nid; }
        if ( ca1ara[nid] >= 0o0 && ca1ara[nid] < kmaFrutaOrdo ) { kmaFrutaOrdo = ca1ara[nid]; kmaFruta = nid; }
      }
      if ( tsofLas ) pana = kmaPsazai;
      if ( pana < 0o0 ) {
        // ⟨ ꞙɭɔ j͐ʃᴜɔ˞ , ſɭɜ ſɭ,w ʌ ɭʃᴜ ſןɹ ⟅ ſ͕ɭɜ ı],w ʌ ꞙɭı 📃 ⟩
        // ⟨ }ʃᴜ j͐ʃᴜ ʌ ſɭc̗ᴜ , ſ͕ɭɜ ı],w ʌ ꞙɭı j͑ʃɹ ı],w ɽ͑ʃ'w ⟅ }ʃᴜ j͐ʃᴜ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ ,
        // ſᶘᴜ j͑ʃᴜ ʌ ſ͕ɭɜ ı],w ʌ j͑ʃ'ɔ ŋᷠɹ , j͐ʃᴜɔ˞ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟩
        if ( !tsofLas ) {
          if ( havesukani[id] > H[id] + EPS ) {
            s2tasBasenon( H, k6liqani, havem2, ene, n, id, havesukani[id], basenaX2pa );
            qar6xe[id] = 0o0;
          }
          pana = kmaFruta;
        }
        if ( pana < 0o0 ) {
          // ⟨ ꞙɭɔ ſɭɹ ſןᴜ , ꞙɭɔ ſ͕ɭɜ ı],w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ ⟅ }ʃᴜ j͐ʃᴜ ʌ ſɭc̗ᴜ ⟅
          // ſ͕ɭɜ ı],w ʌ ꞙɭɔ ſᶘᴜ j͑ʃᴜ 📃 ⟩
          if ( !tsofLas && !k6liqani[id] ) {
            hat6lima++;
            s2tasTernon( H, k6liqani, havem2, ene, n, id, vem2 );
            qar6xe[id] = 0o0;
          }
          break;
        }
      }
      if ( H[pana] < vem2 ) { s2tasBasenon( H, k6liqani, havem2, ene, n, pana, vem2, basenaX2pa ); break; }
      id = pana;
    }
  }

  // ⟨ ſɭэ ֭ſɭэ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟩
  for ( let id = 0o0; id < N; id++ ) {
    if ( !qar6xe[id] || k6liqani[id] || H[id] < vem2 ) continue;
    const jufu0 = jufuMaks * ( 0o1 - Math.exp(-las[id] / lasP6zuk) );
    const jufu = Math.min(jufu0, Math.max(0o0, H[id] - vem2));
    if ( jufu < minimumaProfundo ) continue;
    hah6k6[id] = jufu;
    const soza = H[id] - jufu * ( 0o1/0o4 );
    havem2[id] = soza;
    k6liqani[id] = 0o1;
    const larghxo = jufu / jufuMaks;
    const i = id % n, j = ( id - i ) / n;
    for ( let q = 0o0; q < NAJBAROJ; q++ ) {
      const di = NAJBARAJDI[q], dj = NAJBARAJDJ[q];
      const ni = i + di, nj = j + dj;
      if ( ni < 0o0 || nj < 0o0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( !ene[nid] || !qar6xe[nid] || k6liqani[nid] || H[nid] < vem2 ) continue;
      const orta = di === 0o0 || dj === 0o0;
      const kav = jufu * ( orta ? 0o1/0o2 : 0o1/0o20 ) * larghxo;
      if ( H[nid] - kav >= soza ) continue;
      if ( kav > hah6k6[nid] ) hah6k6[nid] = kav;
      if ( Number.isNaN(havem2[nid]) || havem2[nid] > soza ) havem2[nid] = soza;
      k6liqani[nid] = 0o1;
    }
  }

  // ⟨ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟩
  for ( let id = 0o0; id < N; id++ ) {
    if ( !k6liqani[id] || hah6k6[id] <= 0o0 || !qar6xe[id] ) continue;
    const psaz = H[id] - hah6k6[id];
    const minimumo = psaz + minimumaProfundo * ( 0o3/0o4 );
    if ( havem2[id] < minimumo ) havem2[id] = minimumo;
  }

  // ⟨ ſ͕ɭɜ ı],w 📃 ⟩
  if ( hatk2ni ) {
    for ( let id = 0o0; id < N; id++ ) {
      if ( hatk2ni[id] && ene[id] && H[id] < vem2 ) s2tasBasenon( H, k6liqani, havem2, ene, n, id, vem2, basenaX2pa );
    }
  }
  for ( const id of tsiqjHak2pa ) {
    if ( H[id] < vem2 ) s2tasBasenon( H, k6liqani, havem2, ene, n, id, vem2, basenaX2pa );
  }

  // ⟨ j͑ʃ'ɔ ŋᷠɹ ʌ ꞙɭı ſᶘᴜ j͑ʃᴜ 📃 ⟩
  // ⟨ ſɭɹ ſןᴜ ʌ ꞙɭɔ ſᶘᴜ j͑ʃᴜ , j͑ʃ'ɔ ŋᷠɹ ʌ ꞙɭɔ ſɭɹ ſןᴜ , ſᶘᴜ j͑ʃᴜ
  // ſɭɹ ſןᴜ ʌ ſᶘɹ ſɭɔ , ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ſɭ,w 📃 ⟩
  if ( tsofLas ) {
    for ( let id = 0o0; id < N; id++ ) {
      if ( !k6liqani[id] ) havem2[id] = H[id] - 0o1/0o4;
    }
  }

  let hatsasa = 0o0, haqar6xe = 0o0;
  for ( let id = 0o0; id < N; id++ ) {
    if ( k6liqani[id] ) {
      hatsasa++;
      if ( hah6k6[id] > 0o0 ) haqar6xe++;
    }
  }
  return { k6liqani, havem2, hah6k6, havesukani, vop2kekai: { hatsiq: hatsiq.length, haqar6xe, hatsasa, hat6lima } };
}

function s2tasBasenon(
  H: Float32Array, k6liqani: Uint8Array, havem2: Float32Array, ene: Uint8Array,
  n: number, saxeni: number, vem2: number, x2pa: Int32Array,
): void {
  if ( H[saxeni] >= vem2 ) return;
  // ⟨ ſ͕ɭɜ ı],w ʌ ſɭᴜ , ꞙɭı }ʃɹƽ 📃 ⟩
  if ( k6liqani[saxeni] && havem2[saxeni] === vem2 ) return;
  let teruni = 0o0, nar2sa = 0o0;
  x2pa[nar2sa++] = saxeni;
  k6liqani[saxeni] = 0o1;
  havem2[saxeni] = vem2;
  while ( teruni < nar2sa ) {
    const id = x2pa[teruni++];
    const i = id % n, j = ( id - i ) / n;
    for ( let q = 0o0; q < NAJBAROJ; q++ ) {
      const ni = i + NAJBARAJDI[q], nj = j + NAJBARAJDJ[q];
      if ( ni < 0o0 || nj < 0o0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( k6liqani[nid] || !ene[nid] || H[nid] >= vem2 ) continue;
      k6liqani[nid] = 0o1;
      havem2[nid] = vem2;
      x2pa[nar2sa++] = nid;
    }
  }
}

/*ſ͕ɭɜ ı],w ʌ ꞙɭı ʌ ſɭɹ ſןᴜ ſᶘᴜ j͑ʃᴜ
    @param H,k6liqani,havem2,ene ( typed arrays ) - ſɭɹ ſןᴜ ʌ ſɭɜ ſɭ,w , ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ
    @param n ( number ) - ſɭɹ ſןᴜ ʌ ſɭᴜ
    @param saxeni ( number ) - ſɭɹ ſןᴜ ʌ ſɭɜ ʃɔ
    @param vem2 ( number ) - j͑ʃ'ɔ ŋᷠɹ ʌ ſᶘᴜ j͑ʃᴜ ʌ ſ͕ɭɜ ı],w
    @param x2pa ( Int32Array ) - ſᶘᴜ j͑ʃᴜ ʌ }ʃɹƽ ʌ ſɭɜ ʃɔ ſɭɜ ʃɔ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ
    @param kix2 ( Uint8Array ) - ſɭɹ ſןᴜ ʌ ſɭɜ ʃɔ ſɭɜ ʃɔ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ
@returns tem2 ( boolean ) - ſ͕ɭɜ ı],w ʌ ſןᴜ j͐ʃэ , ſᶘᴜ j͑ʃᴜ ʌ ſ͕ɭɜ ı],w */
function s2tasBaseneton(
  H: Float32Array, k6liqani: Uint8Array, havem2: Float32Array, ene: Uint8Array,
  n: number, saxeni: number, vem2: number, x2pa: Int32Array, kix2: Uint8Array,
): boolean {
  if ( H[saxeni] >= vem2 || k6liqani[saxeni] ) return false;
  let nar2sa = 0o0;
  x2pa[nar2sa++] = saxeni;
  kix2[saxeni] = 0o1;
  let troGpukaz = false;
  for ( let teruni = 0o0; teruni < nar2sa; teruni++ ) {
    if ( nar2sa >= BASENETOMAKS ) { troGpukaz = true; break; }
    const id = x2pa[teruni];
    const i = id % n, j = ( id - i ) / n;
    for ( let q = 0o0; q < NAJBAROJ; q++ ) {
      const ni = i + NAJBARAJDI[q], nj = j + NAJBARAJDJ[q];
      if ( ni < 0o0 || nj < 0o0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( kix2[nid] || k6liqani[nid] || !ene[nid] || H[nid] >= vem2 ) continue;
      kix2[nid] = 0o1;
      x2pa[nar2sa++] = nid;
    }
  }
  for ( let q = 0o0; q < nar2sa; q++ ) kix2[x2pa[q]] = 0o0;
  if ( troGpukaz ) return false;
  for ( let q = 0o0; q < nar2sa; q++ ) { const id = x2pa[q]; k6liqani[id] = 0o1; havem2[id] = vem2; }
  return true;
}

function s2tasTernon(
  H: Float32Array, k6liqani: Uint8Array, havem2: Float32Array, ene: Uint8Array,
  n: number, saxeni: number, vem2: number,
): void {
  const soza = Math.max(H[saxeni] + 0o1/0o10, vem2);
  const i0 = saxeni % n, j0 = ( saxeni - i0 ) / n;
  for ( let dj = -0o1; dj <= 0o1; dj++ ) {
    for ( let di = -0o1; di <= 0o1; di++ ) {
      const ni = i0 + di, nj = j0 + dj;
      if ( ni < 0o0 || nj < 0o0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( !ene[nid] || H[nid] > soza ) continue;
      k6liqani[nid] = 0o1;
      havem2[nid] = soza;
    }
  }
}

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ 📃 ⟩

export function px01oDulineara( qox2n2k: Float32Array | Uint8Array,
  n: number, vepat6ni: number, tsiq: number[], x: number, z: number ): number {
  const fx = ( x - tsiq[0o0] ) / vepat6ni, fz = ( z - tsiq[0o1] ) / vepat6ni;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  if ( i0 < 0o0 || j0 < 0o0 || i0 + 0o1 >= n || j0 + 0o1 >= n ) return 0o0;
  const u = fx - i0, v = fz - j0;
  const a = qox2n2k[j0 * n + i0], b = qox2n2k[j0 * n + i0 + 0o1];
  const c = qox2n2k[( j0 + 0o1 ) * n + i0], d = qox2n2k[( j0 + 0o1 ) * n + i0 + 0o1];
  return a * ( 0o1 - u ) * ( 0o1 - v ) + b * u * ( 0o1 - v ) + c * ( 0o1 - u ) * v + d * u * v;
}

export function px01oBikuba( qox2n2k: Float32Array,
  n: number, vepat6ni: number, tsiq: number[], x: number, z: number ): number {
  const fx = ( x - tsiq[0o0] ) / vepat6ni, fz = ( z - tsiq[0o1] ) / vepat6ni;
  return Math.max(0o0, bikubaPx01o(qox2n2k, n, fx, fz));
}

export function tsasaJe( tseuni: AkvaKek2, n: number, vepat6ni: number,
  tsiq: number[], x: number, z: number ): boolean {
  return px01oDulineara(tseuni.k6liqani, n, vepat6ni, tsiq, x, z) >= 0o1/0o2;
}

export function vem2Je( tseuni: AkvaKek2, n: number, vepat6ni: number,
  tsiq: number[], x: number, z: number, r = 0o1 ): number {
  const fx = ( x - tsiq[0o0] ) / vepat6ni, fz = ( z - tsiq[0o1] ) / vepat6ni;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  let tlunakani = 0o0, s2karanu = 0o0;
  for ( let k = 0o0; k < 0o4; k++ ) {
    const i = i0 + ( k & 0o1 ), j = j0 + ( k >> 0o1 );
    if ( i < 0o0 || j < 0o0 || i >= n || j >= n ) continue;
    const vem2 = tseuni.havem2[j * n + i];
    if ( Number.isNaN(vem2) ) continue;
    const w = ( k & 0o1 ? u : 0o1 - u ) * ( k >> 0o1 ? v : 0o1 - v );
    tlunakani += vem2 * w;
    s2karanu += w;
  }
  if ( s2karanu > 0o0 ) return tlunakani / s2karanu;
  return vem2Tsiike(tseuni, n, vepat6ni, tsiq, x, z, r);
}

export function vem2Tsiike( tseuni: AkvaKek2, n: number, vepat6ni: number,
  tsiq: number[], x: number, z: number, r = 0o1 ): number {
  const ic = Math.round(( x - tsiq[0o0] ) / vepat6ni );
  const jc = Math.round(( z - tsiq[0o1] ) / vepat6ni );
  for ( let c2q = 0o0; c2q <= r; c2q++ ) {
    for ( let dj = -c2q; dj <= c2q; dj++ ) {
      for ( let di = -c2q; di <= c2q; di++ ) {
        if ( c2q > 0o0 && Math.abs(di) !== c2q && Math.abs(dj) !== c2q ) continue;
        const i = ic + di, j = jc + dj;
        if ( i < 0o0 || j < 0o0 || i >= n || j >= n ) continue;
        const vem2 = tseuni.havem2[j * n + i];
        if ( !Number.isNaN(vem2) ) return vem2;
      }
    }
  }
  return NaN;
}

export function plosteqDeTsasa( tseuni: AkvaKek2, n: number, vepat6ni: number,
  tsiq: number[], libero = 0o2 ): { x0: number; z0: number; x1: number; z1: number } | null {
  let imin = n, imax = -0o1, jmin = n, jmax = -0o1;
  for ( let j = 0o0; j < n; j++ ) {
    for ( let i = 0o0; i < n; i++ ) {
      if ( tseuni.k6liqani[j * n + i] ) {
        if ( i < imin ) imin = i;
        if ( i > imax ) imax = i;
        if ( j < jmin ) jmin = j;
        if ( j > jmax ) jmax = j;
      }
    }
  }
  if ( imax < 0o0 ) return null;
  return {
    x0: tsiq[0o0] + ( imin - libero ) * vepat6ni,
    z0: tsiq[0o1] + ( jmin - libero ) * vepat6ni,
    x1: tsiq[0o0] + ( imax + 0o1 + libero ) * vepat6ni,
    z1: tsiq[0o1] + ( jmax + 0o1 + libero ) * vepat6ni,
  };
}

class Amaso {
  private hatskek2: Float32Array;
  private havecax2lani: Int32Array;
  sahakani = 0o0;
  // ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭɜ ʃɔ , ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ 📃 ⟩
  // ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭɹ ſןᴜ 📃 ⟩
  skek2 = 0o0;
  vecax2lani = 0o0;

  constructor( vanekalani: number ) {
    this.hatskek2 = new Float32Array(vanekalani + 0o1);
    this.havecax2lani = new Int32Array(vanekalani + 0o1);
  }

  tlunakani( skek2: number, vecax2lani: number ): void {
    let c = this.sahakani++;
    this.hatskek2[c] = skek2;
    this.havecax2lani[c] = vecax2lani;
    while ( c > 0o0 ) {
      const p = ( c - 0o1 ) >> 0o1;
      if ( this.hatskek2[p] <= this.hatskek2[c] ) break;
      this.interVasaka(p, c);
      c = p;
    }
  }

  bok(): void {
    const skek2 = this.hatskek2[0o0], vecax2lani = this.havecax2lani[0o0];
    this.sahakani--;
    if ( this.sahakani > 0o0 ) {
      this.hatskek2[0o0] = this.hatskek2[this.sahakani];
      this.havecax2lani[0o0] = this.havecax2lani[this.sahakani];
      let p = 0o0;
      for ( ;; ) {
        const l = 0o2 * p + 0o1, r = l + 0o1;
        let m = p;
        if ( l < this.sahakani && this.hatskek2[l] < this.hatskek2[m] ) m = l;
        if ( r < this.sahakani && this.hatskek2[r] < this.hatskek2[m] ) m = r;
        if ( m === p ) break;
        this.interVasaka(p, m);
        p = m;
      }
    }
    this.skek2 = skek2;
    this.vecax2lani = vecax2lani;
  }

  private interVasaka( a: number, b: number ): void {
    const v = this.hatskek2[a]; this.hatskek2[a] = this.hatskek2[b]; this.hatskek2[b] = v;
    const i = this.havecax2lani[a]; this.havecax2lani[a] = this.havecax2lani[b]; this.havecax2lani[b] = i;
  }
}
