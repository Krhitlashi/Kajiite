// ≺⧼ ប្រវែងស្ពានតាមបណ្តោយផ្លូវ 🌉 ⧽≻
// ⟨ ស្ពានរត់តាមបន្ទាត់ផ្លូវ , មិនមែនតាមខ្សែត្រង់រវាងចុងទាំងពីរ ។
// ដូច្នេះផ្លូវកោងមិនបានស្ពានឆ្លងកាត់ស្មៅ ។ 📃 ⟩

import { VOJA_BORDA_LARĜO } from "../../../eskekoj/medio/vojoj/mezuroj.js";

export interface PontoTrako {
  ax: number; az: number; ay: number;
  bx: number; bz: number; by: number;
  deko: ( t: number ) => number;
}

export interface PontoProfilo {
  /** កម្ពស់ដីដែលផ្លូវត្រូវការ ៖ ដីធម្មតា ឬលើកលើទឹក */
  alto: ( x: number, z: number ) => number;
  trakoj: PontoTrako[];
}

// ⟨ ចម្ងាយតូចបំផុតដែលនៅតែហៅថាស្ពាន 📃 ⟩
const PONTA_MINIMUMO = 0o2;

// ⟨ ចន្លោះលើសមាត់ទឹក ៖ ជើងស្ពានឈរលើដីរឹង 📃 ⟩
const PONTA_MARĜENO = 0o1;

// ⟨ ខ្សែកោងអនុញ្ញាត ៖ លើសពីនេះបំបែកជាដុំត្រង់ 📃 ⟩
const PONTA_DEKLINO = 0o1 / 0o2;

// ⟪ ទឹកសម្រាប់ស្ពាន 📏 ⟫
// ⟨ ទឹកត្រូវលាតហួសគែមផ្លូវទាំងពីរខាង ។ បើវាគ្រាន់តែប៉ះគែមម្ខាង
// នោះជាផ្លូវកំពង់នៅមាត់ទឹក , មិនមែនស្ពានទេ ។ 📃 ⟩
export const PONTA_BORDA_MARĜENO = 0o4;

/*បង្កើតការសាកល្បងទឹកសម្រាប់ស្ពានមួយ
    @param punktoj ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param larĝo ( number ) - ទទឹងផ្លូវ
    @param cxuAkvo ( function ) - តើចំណុចមួយជាទឹក
@returns testi ( function ) - តើចំណុចមួយជាទឹកឆ្លងកាត់ពេញទទឹង */
export function kreiPontanAkvanTeston(
  punktoj: readonly [ number, number ][],
  larĝo: number,
  cxuAkvo: ( x: number, z: number ) => boolean
): ( x: number, z: number ) => boolean {
  const flanko = Math.max(PONTA_BORDA_MARĜENO, larĝo / 4 + VOJA_BORDA_LARĜO + 1);
  return ( x, z ) => {
    let plejBona = Infinity, nx = 1, nz = 0;
    for ( let i = 0; i < punktoj.length - 1; i++ ) {
      const [ ax, az ] = punktoj[i];
      const [ bx, bz ] = punktoj[i + 1];
      const dx = bx - ax, dz = bz - az;
      const l2 = dx * dx + dz * dz;
      if ( l2 < 0o1/0o1000000 ) continue;
      const t = Math.max(0, Math.min(1, ( ( x - ax ) * dx + ( z - az ) * dz ) / l2));
      const px = ax + dx * t, pz = az + dz * t;
      const disto = ( x - px ) * ( x - px ) + ( z - pz ) * ( z - pz );
      if ( disto < plejBona ) {
        plejBona = disto;
        const longo = Math.sqrt(l2);
        nx = -dz / longo; nz = dx / longo;
      }
    }
    return cxuAkvo(x, z)
      && cxuAkvo(x - nx * flanko, z - nz * flanko)
      && cxuAkvo(x + nx * flanko, z + nz * flanko);
  };
}

/**
 * គណនាប្រវែងស្ពានតាមបណ្តោយផ្លូវ ។
 * @param punktoj ចំណុចផ្លូវ
 * @param larĝo ទទឹងផ្លូវ
 * @param vojaSupro កម្ពស់ផ្ទៃផ្លូវតាមដី
 * @param akvaSupro កម្ពស់ទឹកបូកចន្លោះ , ឬ -Infinity លើដីគោក
 * @param pontaFinAlto កម្ពស់ចានភ្ជាប់នៅចុងផ្លូវ
 */
export function konstruiPontanProfilon(
  punktoj: readonly [ number, number ][],
  larĝo: number,
  vojaSupro: ( x: number, z: number, larĝo: number ) => number,
  akvaSupro: ( x: number, z: number ) => number,
  pontaFinAlto: ( x: number, z: number, larĝo: number ) => number,
  deklivo: number
): PontoProfilo {
  const sekcioj: { ax: number; az: number; dx: number; dz: number; longo: number;
    l2: number; starto: number }[] = [];
  let tuta = 0;
  for ( let i = 0; i < punktoj.length - 1; i++ ) {
    const [ ax, az ] = punktoj[i];
    const [ bx, bz ] = punktoj[i + 1];
    const dx = bx - ax, dz = bz - az;
    const longo = Math.hypot(dx, dz);
    if ( longo < 0o1/0o100 ) continue;
    sekcioj.push({ ax, az, dx, dz, longo, l2: longo * longo, starto: tuta });
    tuta += longo;
  }
  if ( sekcioj.length === 0 || tuta < PONTA_MINIMUMO )
    return { alto: ( x, z ) => vojaSupro(x, z, larĝo), trakoj: [] };

  // ⟨ ចំណុចនៅចម្ងាយមួយតាមបណ្តោយផ្លូវ 📃 ⟩
  const specimenoj = Math.max(0o20, Math.round(tuta * 0o2));
  const deklivoPaso = deklivo * tuta / specimenoj;
  const pX = new Float32Array(specimenoj + 1);
  const pZ = new Float32Array(specimenoj + 1);
  const pozicio = ( s: number ): [ number, number ] => {
    let k = 0;
    while ( k < sekcioj.length - 1 && s > sekcioj[k].starto + sekcioj[k].longo ) k++;
    const sek = sekcioj[k];
    const t = Math.max(0, Math.min(1, ( s - sek.starto ) / sek.longo));
    return [ sek.ax + sek.dx * t, sek.az + sek.dz * t ];
  };
  const deka = new Float32Array(specimenoj + 1);
  const akvo = new Float32Array(specimenoj + 1);
  for ( let i = 0; i <= specimenoj; i++ ) {
    const [ x, z ] = pozicio(tuta * i / specimenoj);
    pX[i] = x; pZ[i] = z;
    deka[i] = vojaSupro(x, z, larĝo);
    akvo[i] = akvaSupro(x, z);
  }
  // ⟨ ចុងផ្លូវភ្ជាប់នឹងចានភ្ជាប់ 📃 ⟩
  akvo[0] = Math.max(akvo[0], pontaFinAlto(pX[0], pZ[0], larĝo));
  akvo[specimenoj] = Math.max(akvo[specimenoj], pontaFinAlto(pX[specimenoj], pZ[specimenoj], larĝo));
  // ⟨ ទឹកជិតខាង ៖ ផ្ទៃស្ពានត្រង់ជាងខ្សែផ្លូវ ៖ យកទឹកជ្រៅបំផុតក្បែរ 📃 ⟩
  {
    const kopio = Float32Array.from(akvo);
    for ( let i = 0; i <= specimenoj; i++ ) {
      let maks = kopio[i];
      for ( let d = 1; d <= 0o2; d++ ) {
        if ( i - d >= 0 ) maks = Math.max(maks, kopio[i - d]);
        if ( i + d <= specimenoj ) maks = Math.max(maks, kopio[i + d]);
      }
      akvo[i] = maks;
    }
  }
  // ⟨ កោណចន្លោះ ៖ ចន្លោះខ្ពស់បំផុតលាតសន្ធឹងចេញតាមជម្រាល 📃 ⟩
  for ( let i = 1; i <= specimenoj; i++ )
    akvo[i] = Math.max(akvo[i], akvo[i - 1] - deklivoPaso);
  for ( let i = specimenoj - 1; i >= 0; i-- )
    akvo[i] = Math.max(akvo[i], akvo[i + 1] - deklivoPaso);
  for ( let i = 0; i <= specimenoj; i++ )
    deka[i] = Math.max(deka[i], akvo[i]);
  // ⟨ ដែនកំណត់ជម្រាល 📃 ⟩
  for ( let i = 1; i <= specimenoj; i++ )
    deka[i] = Math.max(deka[i], deka[i - 1] - deklivoPaso);
  for ( let i = specimenoj - 1; i >= 0; i-- )
    deka[i] = Math.max(deka[i], deka[i + 1] - deklivoPaso);
  const alto = ( x: number, z: number ): number => {
    let plejBona = Infinity, plejS = 0;
    for ( const sek of sekcioj ) {
      const t = Math.max(0, Math.min(1,
        ( ( x - sek.ax ) * sek.dx + ( z - sek.az ) * sek.dz ) / sek.l2));
      const dx = sek.ax + sek.dx * t - x, dz = sek.az + sek.dz * t - z;
      const d = dx * dx + dz * dz;
      if ( d < plejBona ) { plejBona = d; plejS = sek.starto + sek.longo * t; }
    }
    const f = Math.max(0, Math.min(1, plejS / tuta)) * specimenoj;
    const i = Math.min(specimenoj - 1, Math.floor(f));
    return deka[i] + ( deka[i + 1] - deka[i] ) * ( f - i );
  };
  // ⟨ ចំណុចតាមបណ្តោយផ្លូវ ៖ តម្លៃដីដែលបានលើក 📃 ⟩
  const altoJe = ( s: number ): number => {
    const f = Math.max(0, Math.min(1, s / tuta)) * specimenoj;
    const i = Math.min(specimenoj - 1, Math.floor(f));
    return deka[i] + ( deka[i + 1] - deka[i] ) * ( f - i );
  };

  const trakoj: PontoTrako[] = [];
  const aldoniTrakojn = ( s0: number, s1: number ): void => {
    const longo = s1 - s0;
    if ( longo < PONTA_MINIMUMO ) return;
    const a = pozicio(s0), b = pozicio(s1);
    const dx = b[0] - a[0], dz = b[1] - a[1];
    const rekta = Math.hypot(dx, dz);
    if ( rekta < PONTA_MINIMUMO ) return;
    // ⟨ ខ្សែកោងធៀបនឹងខ្សែត្រង់ 📃 ⟩
    let devio = 0;
    for ( let k = 1; k < 0o10; k++ ) {
      const p = pozicio(s0 + longo * k / 0o10);
      const t = Math.max(0, Math.min(1,
        ( ( p[0] - a[0] ) * dx + ( p[1] - a[1] ) * dz ) / ( rekta * rekta )));
      devio = Math.max(devio,
        Math.hypot(p[0] - ( a[0] + dx * t ), p[1] - ( a[1] + dz * t )));
    }
    if ( devio > PONTA_DEKLINO && longo > 0o10 ) {
      // ⟨ បំបែកនៅចំណុចផ្លូវជិតកណ្តាល 📃 ⟩
      const mezo = ( s0 + s1 ) / 0o2;
      let disigo = -1, distanco = Infinity;
      for ( const sek of sekcioj ) {
        if ( sek.starto <= s0 + 0o1/0o100 || sek.starto >= s1 - 0o1/0o100 ) continue;
        const d = Math.abs(sek.starto - mezo);
        if ( d < distanco ) { distanco = d; disigo = sek.starto; }
      }
      if ( disigo > s0 && disigo < s1 ) {
        aldoniTrakojn(s0, disigo);
        aldoniTrakojn(disigo, s1);
        return;
      }
    }
    const ay = altoJe(s0), by = altoJe(s1);
    // ⟨ ផ្ទៃស្ពានដើរតាមកម្ពស់ផ្លូវ ៖ ខ្សែត្រង់មិនកាត់ជ្រុងចុះក្រោម 📃 ⟩
    trakoj.push({ ax: a[0], az: a[1], ay, bx: b[0], bz: b[1], by,
      deko: ( t: number ) => altoJe(s0 + ( s1 - s0 ) * t) });
  };

  let i = 0;
  while ( i <= specimenoj ) {
    if ( akvo[i] === -Infinity ) { i++; continue; }
    let j = i;
    while ( j + 1 <= specimenoj && akvo[j + 1] !== -Infinity ) j++;
    const s0 = Math.max(0, tuta * i / specimenoj - PONTA_MARĜENO);
    const s1 = Math.min(tuta, tuta * j / specimenoj + PONTA_MARĜENO);
    aldoniTrakojn(s0, s1);
    i = j + 1;
  }

  return { alto, trakoj };
}

/** តើផ្លូវមានដែនទឹកវែងគ្រប់គ្រាន់ធ្វើស្ពានឬទេ */
export function havasAkvanTrunkon(
  punktoj: readonly [ number, number ][],
  cxuAkvo: ( x: number, z: number ) => boolean
): boolean {
  let unua = -1, lasta = -1, kalkulo = 0, plejLonga = 0;
  for ( let s = 0; s < punktoj.length - 1; s++ ) {
    const [ ax, az ] = punktoj[s];
    const [ bx, bz ] = punktoj[s + 1];
    const longo = Math.hypot(bx - ax, bz - az);
    const n = Math.max(0o2, Math.round(longo));
    for ( let k = 0; k <= n; k++ ) {
      const t = k / n;
      kalkulo += longo / n;
      if ( !cxuAkvo(ax + ( bx - ax ) * t, az + ( bz - az ) * t) ) { unua = -1; continue; }
      if ( unua < 0 ) unua = kalkulo;
      lasta = kalkulo;
      plejLonga = Math.max(plejLonga, lasta - unua);
    }
  }
  return plejLonga >= 0o4;
}
