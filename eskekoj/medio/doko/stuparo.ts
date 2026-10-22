// ≺⧼ ជម្រាលជណ្តើរចំណត 📐 ⧽≻

// ⟪ ជណ្តើរស្មើគ្នា 📏 ⟫
// ⟨ ជណ្តើរចំណតចុះពីផ្ទៃចានភ្ជាប់ទៅផ្ទៃចំណត ។ ជំហានទាំងអស់ខ្ពស់ស្មើគ្នា ,
// ហើយកម្រាលរបស់វាក៏ស្មើគ្នាដែរ ។ ដូច្នេះផ្លូវមិនលោតធ្លាក់ខ្លាំងនៅមាត់ច្រាំង ។ 📃 ⟩
export const STUPA_RISERO_DOKA = 0o1/0o2;

// ⟪ ចំណុចជណ្តើរ 📃 ⟫
/*បង្កើតចំណុចជណ្តើរស្មើគ្នាតាមបន្ទាត់ត្រង់
    @param komenco ( [ number , number ] ) - ចំណុចចាប់ផ្តើម
    @param fino ( [ number , number ] ) - ចំណុចបញ្ចប់
    @param nombro ( number ) - ចំនួនជំហាន
@returns punktoj ( [ number , number ] [ ] ) - ចំណុច nombro + 0o1 */
export function kreiStuparajnPunktojn(
  komenco: readonly [ number, number ],
  fino: readonly [ number, number ],
  nombro: number
): [ number, number ][] {
  const pasoj = Math.max(1, Math.round(nombro));
  const punktoj: [ number, number ][] = [];
  for ( let i = 0; i <= pasoj; i++ ) {
    const t = i / pasoj;
    punktoj.push([ komenco[0] + ( fino[0] - komenco[0] ) * t,
      komenco[1] + ( fino[1] - komenco[1] ) * t ]);
  }
  return punktoj;
}

// ⟪ កម្ពស់ជណ្តើរ 📏 ⟫
/*បង្កើតអនុគមន៍កម្ពស់ជណ្តើរស្មើគ្នា
    @param punktoj ( [ number , number ] [ ] ) - ចំណុចជណ្តើរតាមលំដាប់
    @param supro ( number ) - កម្ពស់លើផ្ទៃនៃជំហានដំបូង
    @param risero ( number ) - កម្ពស់ជំហាននីមួយៗ
@returns alto ( function ) - កម្ពស់ថេរតាមជំហាន */
export function kreiStuparanAlton(
  punktoj: readonly ( readonly [ number, number ] )[],
  supro: number,
  risero: number
): ( x: number, z: number ) => number {
  const nombro = punktoj.length - 1;
  if ( nombro < 1 ) return () => supro;
  const longoj: number[] = [];
  let totalo = 0;
  for ( let i = 0; i < nombro; i++ ) {
    const longo = Math.hypot(punktoj[i + 1][0] - punktoj[i][0],
      punktoj[i + 1][1] - punktoj[i][1]);
    longoj.push(longo);
    totalo += longo;
  }
  if ( totalo <= 0 ) return () => supro;
  // ⟨ ជំហានពិត ៖ គម្លាតស្មើគ្នាតាមបណ្តោយបន្ទាត់ 📃 ⟩
  const paso = totalo / nombro;
  return ( x: number, z: number ): number => {
    let plejBona = Infinity, indekso = 0, parametro = 0;
    for ( let i = 0; i < nombro; i++ ) {
      const [ ax, az ] = punktoj[i];
      const [ bx, bz ] = punktoj[i + 1];
      const difX = bx - ax, difZ = bz - az;
      const kvadrato = difX * difX + difZ * difZ;
      const t = kvadrato > 0
        ? Math.max(0, Math.min(1, ( ( x - ax ) * difX + ( z - az ) * difZ ) / kvadrato))
        : 0;
      const px = ax + difX * t, pz = az + difZ * t;
      const disto = ( x - px ) * ( x - px ) + ( z - pz ) * ( z - pz );
      if ( disto < plejBona ) { plejBona = disto; indekso = i; parametro = t; }
    }
    let laux = 0;
    for ( let i = 0; i < indekso; i++ ) laux += longoj[i];
    laux += longoj[indekso] * parametro;
    // ⟨ លេខជំហាន ៖ ចំណុចនៅត្រង់គែមជំហានធ្លាក់ទៅជំហានបន្ទាប់ 📃 ⟩
    const nivelo = Math.min(nombro - 1,
      Math.max(0, Math.floor(laux / paso + 0o1/0o10000000)));
    return supro - nivelo * risero;
  };
}
