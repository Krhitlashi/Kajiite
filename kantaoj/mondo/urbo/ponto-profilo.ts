// ≺⧼ ប្រវែងស្ពានតាមបណ្តោយផ្លូវ 🌉 ⧽≻
// ⟨ ស្ពានរត់តាមបន្ទាត់ផ្លូវ , មិនមែនតាមខ្សែត្រង់រវាងចុងទាំងពីរ ៗ ។
// ដូច្នេះផ្លូវកោងមិនបានស្ពានឆ្លងកាត់ស្មៅ ៗ 📃 ⟩

import { VOJA_BORDA_LARĜO, VOJA_DIKECO } from "../../../eskekoj/medio/vojoj/mezuroj.js";
import { ANGULA_PROVOLIRO } from "../../../eskekoj/medio/vojoj/bufroj.js";

export interface PontoTrako {
  ax: number; az: number;
  bx: number; bz: number;
  deko: ( t: number ) => number;
}

export interface PontoProfilo {
  /** កម្ពស់ផ្ទៃផ្លូវ ៖ ដីធម្មតា , ឬធ្នូស្ពានលើទឹក */
  alto: ( x: number, z: number ) => number;
  /** កម្ពស់បាតផ្លូវ ៖ ដីសម្រាប់ផ្លូវធម្មតា , ឬផ្ទៃខាងក្រោមធ្នូស្ពាន */
  grundo: ( x: number, z: number ) => number;
  trakoj: PontoTrako[];
}

// ⟨ ចម្ងាយតូចបំផុតដែលនៅតែហៅថាស្ពាន 📃 ⟩
const PONTA_MINIMUMO = 0o2;

// ⟨ កម្ពស់ប៉ោងខ្ពស់បំផុតលើទឹក 📃 ⟩
const PONTA_AKVA_ARKECO = 0o4;

// ⟨ ទឹកសម្រាប់ស្ពាន 📏 ⟩
// ⟨ ទឹកត្រូវលាតហួសគែមផ្លូវទាំងសងខាង ។ បើវាគ្រាន់តែប៉ះគែមម្ខាង
// នោះជាផ្លូវកំពង់នៅមាត់ទឹក , មិនមែនស្ពានទេ ៗ 📃 ⟩
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

// ⟪ ដែនទឹកវែងបំផុត 📏 ⟫
/*រកដែនទឹកវែងបំផុតតាមគំរូ
    @param akvo ( Float32Array ) - កម្ពស់ទឹក , ឬ -Infinity លើដីគោក
@returns dejo ( { start , end } | null ) - លេខគំរូចាប់ផ្តើម និងបញ្ចប់ */
function plejLonganAkvanDejon( akvo: Float32Array ): { start: number; end: number } | null {
  let dejo: { start: number; end: number } | null = null;
  let starto = -1;
  for ( let i = 0; i <= akvo.length; i++ ) {
    const enAkvo = i < akvo.length && akvo[i] > -Infinity;
    if ( enAkvo && starto < 0 ) starto = i;
    if ( !enAkvo && starto >= 0 ) {
      const largo = i - starto;
      if ( !dejo || largo > dejo.end - dejo.start ) dejo = { start: starto, end: i - 0o1 };
      starto = -1;
    }
  }
  return dejo;
}

/*គណនាប្រវែងស្ពានតាមបណ្តោយផ្លូវ ៗ
    @param punktoj ( [ number , number ] [ ] ) - ចំណុចផ្លូវ
    @param larĝo ( number ) - ទទឹងផ្លូវ
    @param vojaSupro ( function ) - កម្ពស់ផ្ទៃផ្លូវតាមដី
    @param akvaSupro ( function ) - កម្ពស់ទឹកបូកចន្លោះ , ឬ -Infinity លើដីគោក
    @param pontaFinAlto ( function ) - កម្ពស់ចានភ្ជាប់នៅចុងផ្លូវ
    @param alteco ( function , optional ) - កម្ពស់ដីធម្មតា
@returns profilo ( PontoProfilo ) - កម្ពស់ផ្ទៃ , កម្ពស់បាត , និងធ្នូ */
export function konstruiPontanProfilon(
  punktoj: readonly [ number, number ][],
  larĝo: number,
  vojaSupro: ( x: number, z: number, larĝo: number ) => number,
  akvaSupro: ( x: number, z: number ) => number,
  pontaFinAlto: ( x: number, z: number, larĝo: number ) => number,
  alteco?: ( x: number, z: number ) => number
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
    return {
      alto: ( x, z ) => vojaSupro(x, z, larĝo),
      grundo: ( x, z ) => ( alteco ? alteco(x, z) : vojaSupro(x, z, larĝo) ),
      trakoj: []
    };

  // ⟨ ចំណុចនៅចម្ងាយមួយតាមបណ្តោយផ្លូវ 📃 ⟩
  const specimenoj = Math.max(0o20, Math.round(tuta * 0o2));
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
    deka[i] = vojaSupro(x, z, larĝo);
    akvo[i] = akvaSupro(x, z);
  }

  const startAlto = pontaFinAlto(...pozicio(0), larĝo);
  const finoAlto = pontaFinAlto(...pozicio(tuta), larĝo);
  const akvaDejo = plejLonganAkvanDejon(akvo);
  // ⟨ ខ្សែត្រង់រវាងច្រាំងទាំងពីរ ៖ ធ្នូត្រូវបន្ថែមលើខ្សែនេះ ។ 📃 ⟩
  for ( let i = 0; i <= specimenoj; i++ ) {
    const t = i / specimenoj;
    const glata = t * t * ( 0o3 - 0o2 * t );
    deka[i] = startAlto + ( finoAlto - startAlto ) * glata;
  }
  if ( akvaDejo ) {
    // ⟨ ធ្នូតែមួយរលូន ៖ សូន្យនៅច្រាំងទាំងពីរ , ខ្ពស់បំផុតនៅកណ្តាល ,
    // ហើយខ្ពស់លើផ្ទៃទឹកគ្រប់កន្លែង ។ 📃 ⟩
    let manko = 0;
    for ( let i = 0; i <= specimenoj; i++ )
      if ( akvo[i] > -Infinity ) manko = Math.max(manko, akvo[i] - deka[i]);
    const akvaLongo = tuta * ( akvaDejo.end - akvaDejo.start ) / specimenoj;
    const arkeĉo = Math.max(manko, Math.min(PONTA_AKVA_ARKECO, akvaLongo * 0o1/0o10));
    for ( let i = 0; i <= specimenoj; i++ ) {
      const t = i / specimenoj;
      const arka = ( 0o1 - Math.cos(Math.PI * 0o2 * t) ) / 0o2;
      deka[i] += arkeĉo * arka;
    }
  }

  const sPorPunkto = ( x: number, z: number ): number => {
    let plejBona = Infinity, plejS = 0;
    for ( const sek of sekcioj ) {
      const t = Math.max(0, Math.min(1,
        ( ( x - sek.ax ) * sek.dx + ( z - sek.az ) * sek.dz ) / sek.l2));
      const dx = sek.ax + sek.dx * t - x, dz = sek.az + sek.dz * t - z;
      const d = dx * dx + dz * dz;
      if ( d < plejBona ) { plejBona = d; plejS = sek.starto + sek.longo * t; }
    }
    return plejS;
  };

  const altoJe = ( s: number ): number => {
    const f = Math.max(0, Math.min(1, s / tuta)) * specimenoj;
    const i = Math.min(specimenoj - 1, Math.floor(f));
    return deka[i] + ( deka[i + 1] - deka[i] ) * ( f - i );
  };

  const alto = ( x: number, z: number ): number => altoJe(sPorPunkto(x, z));

  const sStart = akvaDejo ? tuta * akvaDejo.start / specimenoj : -1;
  const sEnd = akvaDejo ? tuta * akvaDejo.end / specimenoj : -1;
  const grundo = ( x: number, z: number ): number => {
    if ( !alteco ) return alto(x, z);
    if ( sStart < 0 ) return alteco(x, z);
    const s = sPorPunkto(x, z);
    // ⟨ នៅលើធ្នូស្ពាន ៖ បាតផ្លូវស្តើង , ហើយតួធ្នូកាន់វា ។ 📃 ⟩
    if ( s >= sStart - 0o1/0o100 && s <= sEnd + 0o1/0o100 )
      return altoJe(s) - VOJA_DIKECO + ANGULA_PROVOLIRO - 0o1/0o200;
    // ⟨ នៅលើផ្លូវចូល ៖ បាតអង់ដេស៊ីតចុះដល់ដី ។ 📃 ⟩
    return alteco(x, z);
  };

  const trakoj: PontoTrako[] = [];
  if ( akvaDejo ) {
    const a = pozicio(sStart), b = pozicio(sEnd);
    trakoj.push({ ax: a[0], az: a[1], bx: b[0], bz: b[1],
      deko: ( t: number ) => altoJe(sStart + ( sEnd - sStart ) * t) });
  }
  return { alto, grundo, trakoj };
}

/*តើផ្លូវមានដែនទឹកវែងគ្រប់គ្រាន់ធ្វើស្ពានឬទេ
    @param punktoj ( [ number , number ] [ ] ) - បន្ទាត់ផ្លូវ
    @param cxuAkvo ( function ) - តើចំណុចមួយជាទឹកឆ្លងកាត់ពេញទទឹង
@returns havas ( boolean ) - តើមានដែនទឹកវែងល្មម */
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
