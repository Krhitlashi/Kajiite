// ≺⧼ ជម្រាលជណ្តើរចំណត 📐 ⧽≻
import { STUPA_RISERO, VOJA_SUPRO_LEVIGXO } from "../vojoj/mezuroj.js";

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

// ⟪ ចំនួនកថាប៉ាសជណ្តើរ 📏 ⟫
/*គណនាចំនួនកថាប៉ាស ដើម្បីឱ្យជំហាននីមួយៗមិនខ្ពស់ជាង STUPA_RISERO
    @param falto ( number ) - កម្ពស់សរុបដែលជណ្តើរចុះ
@returns nombro ( number ) - ចំនួនកថាប៉ាស ( យ៉ាងតិច ២ , ព្រោះកថាប៉ាសតែមួយរាបទាំងស្រុង ) */
// ⟨ កន្លែងតែមួយសម្រាប់គ្រប់ជណ្តើរ 📃 ⟩ ៖ ចំណត , ឧបករណ៍វាស់ , និងការត្រួតពិនិត្យ
// ធ្លាប់គណនារូបមន្តនេះដោយឡែក ។ បើរូបមន្តខុសគ្នា , ជណ្តើរតែមួយមាន
// ចំនួនកថាប៉ាសខុសគ្នាតាមកន្លែងសាងសង់ ។ 📃 ⟩
export function kalkuliStupanNombron( falto: number ): number {
  return Math.max( 0o2, Math.ceil( falto / STUPA_RISERO ) + 0o1 );
}

// ⟪ កម្ពស់ជណ្តើរ 📏 ⟫
// ⟨ ជំហានចុងក្រោយដល់ផ្ទៃចំណត 📃 ⟩ ៖ បើ fundo ត្រូវបានផ្តល់ , ជំហានចុងក្រោយចុះដល់កម្ពស់នោះ
// ជំនួសការធ្លាក់ nombro * RISERO ដែលអាចលើសផ្ទៃចំណត ។ ដូច្នេះជណ្តើរតភ្ជាប់ចានភ្ជាប់
// ទៅផ្ទៃចំណតដោយគ្មានជញ្ជាំង ។ 📃 ⟩
/* បង្កើតអនុគមន៍កម្ពស់តាមបន្ទាត់ជណ្តើរត្រង់
    @param punktoj ( [ number , number ] [ ] ) - ចំណុចជណ្តើរតាមលំដាប់
    @param supro ( number ) - កម្ពស់លើផ្ទៃនៃជំហានដំបូង
    @param fundo ( number ) - កម្ពស់ផ្ទៃចំណត ( ចំណុចចុងក្រោយ ) , បើបញ្ចេញនឹងជំហានចុងក្រោយចុះដល់នោះ
@returns alto ( function ) - កម្ពស់ថេរតាមជំហាន */
// ⟪ ជណ្តើរចំណតពីចានភ្ជាប់ 📐 ⟫
// ⟨ ប្លុកនេះធ្លាប់ចម្លងក្នុង urbo.ts , krado3d.ts , និងឧបករណ៍វាស់ ។ ច្បាប់ចម្លងខុសគ្នា
// បន្តិចម្តងៗ ( ខ្លះគ្មានការបង្ខំពីរកថាប៉ាស ) , ដូច្នេះជណ្តើរតែមួយអាចខុសកម្ពស់
// នៅក្នុងផ្ទៃផ្សេងគ្នា ។ ឥឡូវគ្រប់កន្លែងហៅអនុគមន៍តែមួយនេះ ។ 📃 ⟩

export interface DokaStuparo {
  /** ចំណុចជំហាន ៖ មាត់ចានភ្ជាប់ ដល់ មាត់ចំណត */
  punktoj: [ number, number ][];
  /** កម្ពស់ជំហានតាមចំណុច */
  alto: ( x: number, z: number ) => number;
  /** ចំនួនកថាប៉ាស ( ចន្លោះរវាងចំណុច ) */
  nombro: number;
}

/*បង្កើតជណ្តើរចំណតមួយ ពីកម្ពស់ចានភ្ជាប់ចុះដល់ផ្ទៃចំណត
    @param komenco ( [ number , number ] ) - មាត់ចានភ្ជាប់
    @param fino ( [ number , number ] ) - មាត់ចំណត
    @param starto ( number ) - កម្ពស់ផ្ទៃចានភ្ជាប់
    @param landejaY ( number ) - កម្ពស់ផ្ទៃចំណត
@returns stuparo ( DokaStuparo | null ) - null បើចំណតទាបពេក , គ្មានជណ្តើរត្រូវការ */
export function kreiDokanStuparon(
  komenco: readonly [ number, number ],
  fino: readonly [ number, number ],
  starto: number,
  landejaY: number
): DokaStuparo | null {
  const falto = starto - landejaY;
  // ⟨ ចំណតស្មើផ្លូវ ៖ គ្មានជណ្តើរ , រាបស្មើ 📃 ⟩
  if ( falto <= STUPA_RISERO * 0o1/0o2 ) return null;
  // ⟨ ជណ្តើរត្រូវមានយ៉ាងតិចពីរកថាប៉ាស ៖ កថាប៉ាសតែមួយរាបទាំងស្រុង ,
  // ដូច្នេះមាត់ចំណតក្លាយជាជញ្ជាំងឈរ ។ បង្ខំឱ្យយ៉ាងតិចពីរ ។ 📃 ⟩
  const nombro = kalkuliStupanNombron( falto );
  const punktoj = kreiStuparajnPunktojn( komenco, fino, nombro );
  // ⟨ កម្ពស់ផ្ទៃ មិនមែនកម្ពស់ដី 📏 ⟩ ៖ starto និង landejaY ជាកម្ពស់
  // ផ្ទៃដែលឃើញ ។ kreiStuparanAlton ត្រឡប់កម្ពស់ដី ដែលអនុគមន៍សាងសង់
  // បន្ថែម VOJA_SUPRO_LEVIGXO វិញ ។ ដូច្នេះទាំងពីរត្រូវដកវាចេញ , បើមិន
  // ដូច្នេះកថាប៉ាសចុងក្រោយខ្ពស់ជាងវេទិកាហើយលេចជាបបូរមាត់តូច ។ 📃 ⟩
  return {
    punktoj,
    nombro,
    alto: kreiStuparanAlton( punktoj, starto - VOJA_SUPRO_LEVIGXO,
      landejaY - VOJA_SUPRO_LEVIGXO ),
  };
}

export function kreiStuparanAlton(
  punktoj: readonly ( readonly [ number, number ] )[],
  supro: number,
  fundo?: number
): ( x: number, z: number ) => number {
  const nombro = punktoj.length - 1;
  const finaAlteco = fundo ?? supro - nombro * STUPA_RISERO;
  if ( nombro < 1 ) return () => finaAlteco;
  const [ komencoX, komencoZ ] = punktoj[0];
  const [ finoX, finoZ ] = punktoj[nombro];
  const diferencoX = finoX - komencoX, diferencoZ = finoZ - komencoZ;
  const longoKvadrato = diferencoX * diferencoX + diferencoZ * diferencoZ;
  if ( longoKvadrato <= 0 ) return () => finaAlteco;
  // ⟨ ជំហានស្មើៗរាបដល់ផ្ទៃចំណត 📃 ⟩ ៖ បើ fundo មាន , ចែកកម្ពស់សរុបជា nombro
  // ជំហានស្មើៗ ដូច្នេះជំហាននីមួយៗមានកម្ពស់ ( supro - fundo ) / nombro ហើយជំហានចុង
  // បញ្ចប់នៅកម្ពស់ fundo ដោយគ្មានជញ្ជាំង ។ កម្ពស់ជំហានតែងតិចជាង STUPA_RISERO
  // ព្រោះអ្នកហៅផ្តល់ nombro គ្រប់គ្រាន់ ( Math.max( 0o2 , ... ) ) ។ 📃 ⟩
  if ( fundo !== undefined ) {
    if ( nombro === 1 ) {
      return ( x: number, z: number ): number => {
        let t = ( ( x - komencoX ) * diferencoX + ( z - komencoZ ) * diferencoZ ) / longoKvadrato;
        t = Math.min(1, Math.max(0, t));
        return supro * ( 1 - t ) + finaAlteco * t;
      };
    }
    // ⟨ ជំហានចុងស្មើនឹងផ្ទៃចំណត 📃 ⟩ ៖ ចែកកម្ពស់សរុបជា ( nombro - 0o1 ) ជំហាន
    // ដូច្នេះជំហានចុងក្រោយរាបនៅកម្ពស់ fundo ពិត ( មិនមែនចំណុចកណ្តាល ) ។ អ្នកហៅ
    // ផ្តល់ nombro គ្រប់គ្រាន់ ( kalkuliStupanNombron( falto ) )
    // ដូច្នេះជំហាននីមួយៗតូចជាង STUPA_RISERO ។ 📃 ⟩
    const paŝo = ( supro - finaAlteco ) / ( nombro - 1 );
    return ( x: number, z: number ): number => {
      let t = ( ( x - komencoX ) * diferencoX + ( z - komencoZ ) * diferencoZ ) / longoKvadrato;
      t = Math.min(1, Math.max(0, t));
      const nivelo = Math.min(nombro - 1, Math.max(0, Math.floor(t * nombro)));
      return supro - nivelo * paŝo;
    };
  }
  // ⟨ គ្មាន fundo ៖ ជំហានកម្ពស់ STUPA_RISERO ថេរ ។ 📃 ⟩
  return ( x: number, z: number ): number => {
    let t = ( ( x - komencoX ) * diferencoX + ( z - komencoZ ) * diferencoZ ) / longoKvadrato;
    t = Math.min(1, Math.max(0, t));
    const nivelo = Math.min(nombro - 1, Math.max(0, Math.floor(t * nombro)));
    return supro - nivelo * STUPA_RISERO;
  };
}
