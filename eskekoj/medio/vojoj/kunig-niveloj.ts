// ≺⧼ កម្ពស់ផ្លូវតាមដៃនៅចំណុចភ្ជាប់ 📏 ⧽≻
// ⟨ ចំណុចភ្ជាប់ត្រូវដឹងកម្ពស់ផ្លូវពិតរបស់ដៃនីមួយៗ ។ មុននេះចានអានវាល
// កម្ពស់រួមតែមួយនៅមាត់ដៃទាំងអស់ , ហើយវាលនោះមានកោណចានរួចហើយ ( វង់ ) ។
// ដូច្នេះគ្រប់ដៃរកឃើញកម្ពស់តែមួយ , ហើយផ្លូវដែលមានកម្ពស់ផ្ទាល់ខ្លួន
// ( ស្ពាន , ជណ្តើរចំណត ) បញ្ចប់ដោយជញ្ជាំងឈរ ។ ឥឡូវផ្លូវនីមួយៗរាយការណ៍
// កម្ពស់ផ្ទៃរបស់វាតាមដៃ , ហើយចានយកកម្រិតរាបតែមួយពីចំណុចទាបបំផុត ។
// ជម្រាលឡើងទៅដៃខ្ពស់ៗស្ថិតនៅលើផ្លូវ , មិនមែនលើចានទេ ។ 📃 ⟩
import { surGrid } from "./mezuroj.js";

// ⟪ កម្ពស់ដៃមួយ 📏 ⟫
export interface BrakaAlto {
  // ⟨ ទិសឯកតាពីចំណុចភ្ជាប់ទៅរកផ្លូវ ។ 📃 ⟩
  ux: number;
  uz: number;
  // ⟨ កម្ពស់ផ្ទៃផ្លូវពិតនៅមាត់ដៃ ( លើក្រឡាជំហាន ) ។ 📃 ⟩
  alto: number;
  // ⟨ កន្លះទទឹងផ្លូវដែលមកដល់ ។ 📃 ⟩
  duono: number;
}

// ⟪ កម្រិតចំណុចភ្ជាប់ 📏 ⟫
export interface KunigaNivelo {
  x: number;
  z: number;
  // ⟨ កម្រិតរាបតែមួយរបស់ចាន ។ គ្រប់ចំណុចលើផ្ទៃចានស្ថិតនៅកម្រិតនេះ ។ 📃 ⟩
  alto: number;
  // ⟨ កម្ពស់ដែលបានតាមដានតាមដៃនីមួយៗ ។ 📃 ⟩
  brakoj: BrakaAlto[];
}

export function kunigaKlavo( x: number, z: number ): string {
  return x + "," + z;
}

// ⟨ បញ្ជីរួម 🌐 ⟩ ៖ konstruiVojojn បំពេញវាមុនគូរធរណីមាត្រ , ហើយ
// konstruiIntersekcajnPlatojn អានវាពីក្រោយ ។ ដូច vojSuprajxoj , វាជាស្ថានភាព
// នៃការសាងសង់បច្ចុប្បន្ន , មិនមែនទិន្នន័យពិភពលោកអចិន្ត្រៃយ៍ទេ ។ 📃 ⟩
export const kunigajNiveloj = new Map<string, KunigaNivelo>();

/*លុបបញ្ជីមុនការសាងសង់ថ្មី
    @returns void */
export function purigiKunigajnNivelojn(): void {
  kunigajNiveloj.clear();
}

// ⟪ កម្រិតវេទិកាចំណត ⚓ ⟫
// ⟨ ចំណតត្រូវបានសាងសង់មុនផ្លូវ ព្រោះចុងផ្លូវ និងជណ្តើរចំណតត្រូវការ
// កម្ពស់វេទិកា ។ ដូច្នេះវាចុះឈ្មោះកម្រិតរបស់វានៅទីនេះ ហើយ
// konstruiVojojn យកវាធ្វើជាកម្រិតចាននៅចំណុចនោះ ។ បើគ្មានការភ្ជាប់នេះ ,
// ចាននិងវេទិកាគណនាកម្រិតដោយច្បាប់ផ្សេងគ្នា ហើយខុសគ្នាមួយជំហានពេញ
// = ជញ្ជាំងឈរនៅស្នាមដេករវាងផ្លូវនិងចំណត ។ 📃 ⟩
export interface DokaAlto {
  x: number;
  z: number;
  // ⟨ កម្រិតក្រឡាដែលផ្ទៃវេទិកាស្ថិតក្រោមវាតិចតួច ( VOJA_SUPRO_LEVIGXO - VOJA_DIKECO ) ។ 📃 ⟩
  alto: number;
}

const dokajAltoj: DokaAlto[] = [];

/*ចុះឈ្មោះកម្រិតវេទិកាចំណត
    @param x, z ( number ) - ចំណុចមាត់ដីរបស់ចំណត
    @param alto ( number ) - កម្រិតក្រឡារបស់ផ្ទៃចំណត
@returns void */
export function registriDokanAlton( x: number, z: number, alto: number ): void {
  const ekzistanta = dokajAltoj.find(d => Math.hypot(d.x - x, d.z - z) < 0o1/0o20);
  if ( ekzistanta ) { ekzistanta.x = x; ekzistanta.z = z; ekzistanta.alto = alto; return; }
  dokajAltoj.push({ x, z, alto });
}

/*យក និងលុប កម្រិតចំណតដែលបានចុះឈ្មោះសម្រាប់ការសាងសង់នេះ
    @returns listo ( DokaAlto [ ] ) - កម្រិតចំណត */
export function konsumiDokajnAltojn(): DokaAlto[] {
  const kopio = dokajAltoj.map(d => ( { ...d } ));
  dokajAltoj.length = 0;
  return kopio;
}

/*រកកម្រិតចំណតដែលជិតចំណុចមួយ
    @param listo ( DokaAlto [ ] ) - កម្រិតចំណត
    @param x, z ( number ) - ចំណុចភ្ជាប់
@returns alto ( number | undefined ) - កម្រិតចំណត ឬគ្មាន */
export function dokaAltoEl( listo: readonly DokaAlto[], x: number, z: number ): number | undefined {
  let plej = 0o1/0o10, rez: number | undefined;
  for ( const d of listo ) {
    const distanco = Math.hypot(d.x - x, d.z - z);
    if ( distanco <= plej ) { plej = distanco; rez = d.alto; }
  }
  return rez;
}

/*អានកម្រិតចំណតដោយមិនលុបវា ( សម្រាប់ឧបករណ៍វាស់ )
    @param x, z ( number ) - ចំណុចមាត់ដីរបស់ចំណត
@returns alto ( number | undefined ) - កម្រិតចំណត ឬគ្មាន */
export function dokaAltoCxe( x: number, z: number ): number | undefined {
  return dokaAltoEl(dokajAltoj, x, z);
}

/*រកកម្រិតរាបរបស់ចាន , ឬ undefined បើគ្មាន
    @param klavo ( string ) - គន្លឹះ "x,z"
@returns alto ( number | undefined ) - កម្រិតចាន */
export function plataAltoDeKunigo( klavo: string ): number | undefined {
  return kunigajNiveloj.get(klavo)?.alto;
}

/*ជ្រើសកម្រិតរាបរបស់ចានពីកម្ពស់ដៃទាំងអស់
    @param brakoj ( BrakaAlto [ ] ) - កម្ពស់ដៃដែលបានតាមដាន
    @param rezervo ( number ) - កម្រិតដីដែលចានត្រូវស្ថិតលើ ( មិនកប់ )
@returns alto ( number ) - កម្រិតចានរាប , បង្គត់លើក្រឡា */
// ⟨ ជិតដីបំផុត 📏 ⟩ ៖ ចានគួរស្មើផ្លូវមួយឬច្រើន ហើយផ្លូវផ្សេងៗឡើង
// ជាជំហានពីចានទៅរកកម្រិតរបស់វា ។ បើយកទាបបំផុតជានិច្ច , ចានលិចក្រោម
// ដីកណ្តាលនៅជម្រាល ។ បើយកខ្ពស់បំផុតវិញ , ចានអណ្តែតលើដី ហើយមុខ
// ចំហៀងរបស់វាក្លាយជាជញ្ជាំងខ្ពស់ជុំវិញ ។ ដូច្នេះយកកម្រិតដៃដែលជិត
// កម្រិតដីបំផុត ហើយមិនដែលទាបជាងដីទេ ។ ស្មើគ្នា យកទាបជាង ដើម្បីឱ្យ
// ផ្លូវខ្ពស់ៗឡើងជាជម្រាលពីចាន ។ 📃 ⟩
export function elektiPlatanAlton( brakoj: readonly BrakaAlto[], rezervo: number ): number {
  const validaj = brakoj.map(b => b.alto).filter(Number.isFinite);
  const tera = surGrid(rezervo);
  if ( validaj.length === 0 ) return tera;
  let elektita = validaj[ 0 ], plejProksima = Infinity;
  for ( const alto of validaj ) {
    const distanco = Math.abs(alto - tera);
    if ( distanco < plejProksima || ( distanco === plejProksima && alto < elektita ) ) {
      plejProksima = distanco;
      elektita = alto;
    }
  }
  return Math.max(surGrid(elektita), tera);
}
