// ≺⧼ ជម្រាលជណ្តើរចំណត 📐 ⧽≻
import { STUPA_RISERO } from "../vojoj/mezuroj.js";

// ⟪ ជណ្តើរស្មើគ្នា 📏 ⟫
// ⟨ ជណ្តើរចំណតចុះពីផ្ទៃចានភ្ជាប់ទៅផ្ទៃចំណត ។ ជំហានទាំងអស់ខ្ពស់ស្មើគ្នា ,
// ហើយកម្រាលរបស់វាក៏ស្មើគ្នាដែរ ។ ដូច្នេះផ្លូវមិនលោតធ្លាក់ខ្លាំងនៅមាត់ច្រាំង ។ 📃 ⟩

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
/* បង្កើតអនុគមន៍កម្ពស់តាមបន្ទាត់ជណ្តើរត្រង់
    @param punktoj ( [ number , number ] [ ] ) - ចំណុចជណ្តើរតាមលំដាប់
    @param supro ( number ) - កម្ពស់លើផ្ទៃនៃជំហានដំបូង
@returns alto ( function ) - កម្ពស់ថេរតាមជំហាន */
export function kreiStuparanAlton(
  punktoj: readonly ( readonly [ number, number ] )[],
  supro: number
): ( x: number, z: number ) => number {
  const nombro = punktoj.length - 1;
  if ( nombro < 1 ) return () => supro;
  const [ komencoX, komencoZ ] = punktoj[0];
  const [ finoX, finoZ ] = punktoj[nombro];
  const diferencoX = finoX - komencoX, diferencoZ = finoZ - komencoZ;
  const longoKvadrato = diferencoX * diferencoX + diferencoZ * diferencoZ;
  if ( longoKvadrato <= 0 ) return () => supro;
  return ( x: number, z: number ): number => {
    const t = ( ( x - komencoX ) * diferencoX + ( z - komencoZ ) * diferencoZ ) / longoKvadrato;
    const nivelo = Math.min(nombro - 1,
      Math.max(0, Math.floor(t * nombro + 0o1/0o10000000)));
    return supro - nivelo * STUPA_RISERO;
  };
}
