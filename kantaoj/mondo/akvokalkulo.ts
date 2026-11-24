// ≺⧼ ſᶘᴜ j͑ʃᴜ j͑ʃᴜꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🌊 ⧽≻
import { bikubaSpecimeno } from "../komunajxoj/interpolo.js";

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
  // ⟨ j͐ʃᴜɔ˞ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟩
  // }ʃᴜ j͐ʃᴜ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ , ſᶘᴜ j͑ʃᴜ ʌ j͐ʃᴜɔ˞ ʌ ı],w ɽ͑ʃ'w ⟅ j͑ʃɹ ı],w ɽ͑ʃ'w ⟅
  // ſ͕ɭɜ ı],w ʌ ꞙɭı , j͑ʃɹ ı],w ɽ͑ʃ'w ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ʃɔ ⟅
  // ꞙɭı ſᶘᴜ j͑ʃᴜ ʌ j͐ʃэ ɭ(ᴜ ʌ ɭl̀ᴜ ſ͕ɭɜ , ꞙɭɔ ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɹ ı],w ɽ͑ʃ'w ʌ ɭl̀ᴜ ſ͕ɭɜ ⟅
  naturaFluo?: boolean;
}

export interface AkvaKalkulo {
  k6liqani: Uint8Array;
  havem2: Float32Array;
  kavoj: Float32Array;
  havesukani: Float32Array;
  statistikoj: { hatsiq: number; haqar6xe: number; akvaj: number; ternoj: number };
}

// ⟨ ꞙɭ8 ʌ ſɭɹ ſןᴜ : ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ 📃 ⟩ , ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ɭl̀ᴜ ,
//   ꞙɭı ʌ ſɭɹ ſןᴜ ʌ ſɭᴜ ʌ ſɭᴜ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ , ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ
//   ſɭɜ ʃɔ ʌ }ʃɹƽ 📃 ⟩
const NAJBARAJ_DI = new Int8Array([ -1, 0, 1, -1, 1, -1, 0, 1 ]);
const NAJBARAJ_DJ = new Int8Array([ -1, -1, -1, 0, 0, 1, 1, 1 ]);
const NAJBAROJ = 0o10;

const EPS = 0o1/0o20;

// ⟨ ſןᴜ j͐ʃэ ʌ ſ͕ɭɜ ı],w 📃 ⟩
// ſ͕ɭɜ ı],w ʌ ꞙɭı ʌ ſןᴜ j͐ʃэ , j͑ʃɹ ı],w ɽ͑ʃ'w ꞙɭɔ , ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ſ͕ɭɜ ı],w
// j͑ʃɹ ı],w ɽ͑ʃ'w ʌ ɭl̀ᴜ ſ͕ɭɜ ⟅
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

  // ⟨ ſɭɹ ſןᴜ 📃 ⟩
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
      for ( let q = 0; q < NAJBAROJ; q++ ) {
        const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
        if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) { pukaz[id] = 1; break; }
        if ( !ene[nj * n + ni] ) { pukaz[id] = 1; break; }
      }
    }
  }

  // ⟨ j͐ʃᴜɔ˞ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟩
  const havesukani = new Float32Array(N).fill(Infinity);
  const ca1ara = new Int32Array(N).fill(-1);
  {
    const amaso = new Amaso(N);
    for ( let id = 0; id < N; id++ ) {
      if ( ene[id] && pukaz[id] ) { havesukani[id] = H[id]; amaso.tlunakani(H[id], id); }
    }
    let cak2fe = 0;
    while ( amaso.length > 0 ) {
      amaso.preni();
      const altoNun = amaso.skek2, id = amaso.vecax2lani;
      if ( ca1ara[id] >= 0 ) continue;
      ca1ara[id] = cak2fe++;
      const i = id % n, j = ( id - i ) / n;
      for ( let q = 0; q < NAJBAROJ; q++ ) {
        const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
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
  // ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭɜ ʃɔ j͑ʃɹ ı],w ɽ͑ʃ'w , ſᶘᴜ j͑ʃᴜ ʌ j͐ʃᴜɔ˞ 📃 ⟩
  //   ꞙɭı ʌ ſɭɹ ſןᴜ ʌ }ʃɹƽ , j͑ʃ'ɔ ŋᷠɹ ʌ ſɭᴜ , ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ
  //   }ʃɹƽ ʌ ſ͕ɭɜ ı],w 📃 ⟩
  const basenaX2pa = new Int32Array(N);
  const basenetaX2pa = new Int32Array(N < 0o100 ? 0o100 : N);
  const basenetaVidita = new Uint8Array(N);

  // ⟨ j͐ʃᴜɔ˞ 📃 ⟩
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
    // ⟨ ſɭɹ ſןᴜ ʌ ſɭэ ֭ſɭэ ⟅ ꞙɭɔ }ʃɹƽ ʌ ſᶘᴜ j͑ʃᴜ ʌ ſ͕ɭɜ ı],w 📃 ⟩
    // ſ͕ɭɜ ı],w ʌ ꞙɭı j͐ʃᴜɔ˞ ʌ ꞙɭı 📃 ⟩
    if ( naturaFluo ) pasaVido.fill(0);
    while ( restanta > 0 && tsel2sai++ < N && id >= 0 ) {
      if ( pukaz[id] ) break;
      if ( naturaFluo ) pasaVido[id] = 1;
      // ⟨ ſ͕ɭɜ ı],w ʌ ꞙɭı ʌ ſןᴜ j͐ʃэ ʌ ſɭɜ ſɭ,w 📃 ⟩
      // ſɭɹ ſןᴜ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ʃɔ ⟅ ſ͕ɭɜ ı],w ʌ ſןᴜ j͐ʃэ
      // ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɔ ŋᷠɹ ⟅ ſ͕ɭɜ ı],w ʌ ꞙɭı , ſᶘᴜ j͑ʃᴜ ʌ ſɭэ ֭ſɭэ ⟅
      // ſ͕ɭɜ ı],w ʌ j͑ʃ'ɔ ŋᷠɹ , j͑ʃɹ ı],w ɽ͑ʃ'w ʌ ɭl̀ᴜ ſ͕ɭɜ ⟅ 📃 ⟩
      if ( naturaFluo && H[id] >= vem2 && havesukani[id] > H[id] + EPS ) {
        markiBaseneton(H, k6liqani, havem2, ene, n, id, havesukani[id], basenetaX2pa, basenetaVidita);
      }
      fluo[id] += restanta;
      if ( !k6liqani[id] ) qar6xe[id] = 1;
      const i = id % n, j = ( id - i ) / n;
      let sekv = -1, sekvAlto = H[id];
      let plejFruta = -1, plejFrutaOrdo = ca1ara[id];
      // ⟨ j͐ʃᴜɔ˞ ʌ ſᶘᴜ j͑ʃᴜ , j͑ʃ'ɔ ŋᷠɹ ʌ ſ͕ɭɜ ı],w 📃 ⟩
      // ſɭɹ ſןᴜ ʌ ſᶘᴜ j͑ʃᴜ , j͑ʃ'ɔ ŋᷠɹ ⟅ ſᶘᴜ j͑ʃᴜ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ }ʃɹƽ 📃 ⟩
      // ſɭɜ ſɭ,w ʌ ꞙɭɔ ſ͕ɭɜ ı],w , j͑ʃ'ɔ ŋᷠɹ ʌ j͐ʃэ ɭ(ᴜ ⟅ 📃 ⟩
      let plejMalalta = -1, plejMalaltaInundo = Infinity, plejMalaltaOrdo = Infinity;
      for ( let q = 0; q < NAJBAROJ; q++ ) {
        const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
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
        // ⟨ ꞙɭɔ j͐ʃᴜɔ˞ , ſɭɜ ſɭ,w ʌ ɭʃᴜ ſןɹ ⟅ ſ͕ɭɜ ı],w ʌ ꞙɭı 📃 ⟩
        // ⟨ }ʃᴜ j͐ʃᴜ ʌ ſɭc̗ᴜ , ſ͕ɭɜ ı],w ʌ ꞙɭı j͑ʃɹ ı],w ɽ͑ʃ'w ⟅ }ʃᴜ j͐ʃᴜ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ ,
        // ſᶘᴜ j͑ʃᴜ ʌ ſ͕ɭɜ ı],w ʌ j͑ʃ'ɔ ŋᷠɹ , j͐ʃᴜɔ˞ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟩
        if ( !naturaFluo ) {
          if ( havesukani[id] > H[id] + EPS ) {
            markiBasenon( H, k6liqani, havem2, ene, n, id, havesukani[id], basenaX2pa );
            qar6xe[id] = 0;
          }
          sekv = plejFruta;
        }
        if ( sekv < 0 ) {
          // ⟨ ꞙɭɔ ſɭɹ ſןᴜ , ꞙɭɔ ſ͕ɭɜ ı],w ʌ ɽ͑ʃ'w j͑ʃ'ᴜ ⟅ }ʃᴜ j͐ʃᴜ ʌ ſɭc̗ᴜ ⟅
          // ſ͕ɭɜ ı],w ʌ ꞙɭɔ ſᶘᴜ j͑ʃᴜ 📃 ⟩
          if ( !naturaFluo && !k6liqani[id] ) {
            ternoj++;
            markiTernon( H, k6liqani, havem2, ene, n, id, vem2 );
            qar6xe[id] = 0;
          }
          break;
        }
      }
      if ( H[sekv] < vem2 ) { markiBasenon( H, k6liqani, havem2, ene, n, sekv, vem2, basenaX2pa ); break; }
      id = sekv;
    }
  }

  // ⟨ ſɭэ ֭ſɭэ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟩
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
    for ( let q = 0; q < NAJBAROJ; q++ ) {
      const di = NAJBARAJ_DI[q], dj = NAJBARAJ_DJ[q];
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

  // ⟨ }ʃɹƽ ʌ ſɭэ ֭ſɭэ ʌ ſᶘᴜ j͑ʃᴜ 📃 ⟩
  for ( let id = 0; id < N; id++ ) {
    if ( !k6liqani[id] || kavoj[id] <= 0 || !qar6xe[id] ) continue;
    const fundo = H[id] - kavoj[id];
    const minimumo = fundo + minimumaProfundo * ( 0o3/0o4 );
    if ( havem2[id] < minimumo ) havem2[id] = minimumo;
  }

  // ⟨ ſ͕ɭɜ ı],w 📃 ⟩
  if ( hatk2ni ) {
    for ( let id = 0; id < N; id++ ) {
      if ( hatk2ni[id] && ene[id] && H[id] < vem2 ) markiBasenon( H, k6liqani, havem2, ene, n, id, vem2, basenaX2pa );
    }
  }
  for ( const id of tsiqjCxeloj ) {
    if ( H[id] < vem2 ) markiBasenon( H, k6liqani, havem2, ene, n, id, vem2, basenaX2pa );
  }

  // ⟨ j͑ʃ'ɔ ŋᷠɹ ʌ ꞙɭı ſᶘᴜ j͑ʃᴜ 📃 ⟩
  // ⟨ ſɭɹ ſןᴜ ʌ ꞙɭɔ ſᶘᴜ j͑ʃᴜ , j͑ʃ'ɔ ŋᷠɹ ʌ ꞙɭɔ ſɭɹ ſןᴜ , ſᶘᴜ j͑ʃᴜ
  // ſɭɹ ſןᴜ ʌ ſᶘɹ ſɭɔ , ſᶘᴜ j͑ʃᴜ ʌ ſɭɜ ſɭ,w 📃 ⟩
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
  n: number, saxeni: number, vem2: number, x2pa: Int32Array,
): void {
  if ( H[saxeni] >= vem2 ) return;
  // ⟨ ſ͕ɭɜ ı],w ʌ ſɭᴜ , ꞙɭı }ʃɹƽ 📃 ⟩
  if ( k6liqani[saxeni] && havem2[saxeni] === vem2 ) return;
  let teruni = 0, nar2sa = 0;
  x2pa[nar2sa++] = saxeni;
  k6liqani[saxeni] = 1;
  havem2[saxeni] = vem2;
  while ( teruni < nar2sa ) {
    const id = x2pa[teruni++];
    const i = id % n, j = ( id - i ) / n;
    for ( let q = 0; q < NAJBAROJ; q++ ) {
      const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( k6liqani[nid] || !ene[nid] || H[nid] >= vem2 ) continue;
      k6liqani[nid] = 1;
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
    @param vidita ( Uint8Array ) - ſɭɹ ſןᴜ ʌ ſɭɜ ʃɔ ſɭɜ ʃɔ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ
@returns tem2 ( boolean ) - ſ͕ɭɜ ı],w ʌ ſןᴜ j͐ʃэ , ſᶘᴜ j͑ʃᴜ ʌ ſ͕ɭɜ ı],w */
function markiBaseneton(
  H: Float32Array, k6liqani: Uint8Array, havem2: Float32Array, ene: Uint8Array,
  n: number, saxeni: number, vem2: number, x2pa: Int32Array, vidita: Uint8Array,
): boolean {
  if ( H[saxeni] >= vem2 || k6liqani[saxeni] ) return false;
  let nar2sa = 0;
  x2pa[nar2sa++] = saxeni;
  vidita[saxeni] = 1;
  let troGranda = false;
  for ( let teruni = 0; teruni < nar2sa; teruni++ ) {
    if ( nar2sa >= BASENETO_MAKS ) { troGranda = true; break; }
    const id = x2pa[teruni];
    const i = id % n, j = ( id - i ) / n;
    for ( let q = 0; q < NAJBAROJ; q++ ) {
      const ni = i + NAJBARAJ_DI[q], nj = j + NAJBARAJ_DJ[q];
      if ( ni < 0 || nj < 0 || ni >= n || nj >= n ) continue;
      const nid = nj * n + ni;
      if ( vidita[nid] || k6liqani[nid] || !ene[nid] || H[nid] >= vem2 ) continue;
      vidita[nid] = 1;
      x2pa[nar2sa++] = nid;
    }
  }
  for ( let q = 0; q < nar2sa; q++ ) vidita[x2pa[q]] = 0;
  if ( troGranda ) return false;
  for ( let q = 0; q < nar2sa; q++ ) { const id = x2pa[q]; k6liqani[id] = 1; havem2[id] = vem2; }
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

// ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ 📃 ⟩

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

export function specimenoBikuba( krado: Float32Array,
  n: number, vepat6ni: number, origino: number[], x: number, z: number ): number {
  const fx = ( x - origino[0] ) / vepat6ni, fz = ( z - origino[1] ) / vepat6ni;
  return Math.max(0, bikubaSpecimeno(krado, n, fx, fz));
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
  // ⟨ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭɜ ʃɔ , ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ 📃 ⟩
  // ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ʌ ſɭɹ ſןᴜ 📃 ⟩
  skek2 = 0;
  vecax2lani = 0;

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

  preni(): void {
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
    this.skek2 = skek2;
    this.vecax2lani = vecax2lani;
  }

  private interSxangxi( a: number, b: number ): void {
    const v = this.hatskek2[a]; this.hatskek2[a] = this.hatskek2[b]; this.hatskek2[b] = v;
    const i = this.havecax2lani[a]; this.havecax2lani[a] = this.havecax2lani[b]; this.havecax2lani[b] = i;
  }
}
