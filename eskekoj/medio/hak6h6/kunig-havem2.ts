// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͐ʃэ ɭ(ᴜ ʌ ɭʃᴜ ŋᷠᴜ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ 📏 ⧽≻
// ⟨ ចំណុចភ្ជាប់ត្រូវដឹងកម្ពស់ផ្លូវពិតរបស់ដៃនីមួយៗ ។ មុននេះចានអានវាល
// កម្ពស់រួមតែមួយនៅមាត់ដៃទាំងអស់ , ហើយវាលនោះមានកោណចានរួចហើយ ( វង់ ) ។
// ដូច្នេះគ្រប់ដៃរកឃើញកម្ពស់តែមួយ , ហើយផ្លូវដែលមានកម្ពស់ផ្ទាល់ខ្លួន
// ( ស្ពាន , ជណ្តើរចំណត ) បញ្ចប់ដោយជញ្ជាំងឈរ ។ ឥឡូវផ្លូវនីមួយៗរាយការណ៍
// កម្ពស់ផ្ទៃរបស់វាតាមដៃ , ហើយចានយកកម្រិតរាបតែមួយពីចំណុចទាបបំផុត ។
// ជម្រាលឡើងទៅដៃខ្ពស់ៗស្ថិតនៅលើផ្លូវ , មិនមែនលើចានទេ ។ 📃 ⟩
import { surGrid } from "./havecax2l.js";

// ⟪ កម្ពស់ដៃមួយ 📏 ⟫
export interface BrakaAlto {
  // ⟨ ទិសឯកតាពីចំណុចភ្ជាប់ទៅរកផ្លូវ ។ 📃 ⟩
  ux: number;
  uz: number;
  // ⟨ កម្ពស់ផ្ទៃផ្លូវពិតនៅមាត់ដៃ ( លើក្រឡាជំហាន ) ។ 📃 ⟩
  l6da: number;
  // ⟨ កន្លះទទឹងផ្លូវដែលមកដល់ ។ 📃 ⟩
  p2somani: number;
}

// ⟪ កម្រិតចំណុចភ្ជាប់ 📏 ⟫
export interface KunigaVem2 {
  x: number;
  z: number;
  // ⟨ កម្រិតរាបតែមួយរបស់ចាន ។ គ្រប់ចំណុចលើផ្ទៃចានស្ថិតនៅកម្រិតនេះ ។ 📃 ⟩
  l6da: number;
  // ⟨ កម្ពស់ដែលបានតាមដានតាមដៃនីមួយៗ ។ 📃 ⟩
  knece: BrakaAlto[];
}

export function kunigaKlavo( x: number, z: number ): string {
  return x + "," + z;
}

// ⟨ បញ្ជីរួម 🌐 ⟩ ៖ vepaqHak6h6n បំពេញវាមុនគូរធរណីមាត្រ , ហើយ
// vepaqIntersekcajnHapa12n អានវាពីក្រោយ ។ ដូច vojSuprajxoj , វាជាស្ថានភាព
// នៃការសាងសង់បច្ចុប្បន្ន , មិនមែនទិន្នន័យពិភពលោកអចិន្ត្រៃយ៍ទេ ។ 📃 ⟩
export const kunigajHavem2 = new Map<string, KunigaVem2>();

/*លុបបញ្ជីមុនការសាងសង់ថ្មី
    @returns void */
export function purigiKunigajnHavem2n(): void {
  kunigajHavem2.clear();
}

// ⟪ កម្រិតវេទិកាចំណត ⚓ ⟫
// ⟨ ចំណតត្រូវបានសាងសង់មុនផ្លូវ ព្រោះចុងផ្លូវ និងជណ្តើរចំណតត្រូវការ
// កម្ពស់វេទិកា ។ ដូច្នេះវាចុះឈ្មោះកម្រិតរបស់វានៅទីនេះ ហើយ
// vepaqHak6h6n យកវាធ្វើជាកម្រិតចាននៅចំណុចនោះ ។ បើគ្មានការភ្ជាប់នេះ ,
// ចាននិងវេទិកាគណនាកម្រិតដោយច្បាប់ផ្សេងគ្នា ហើយខុសគ្នាមួយជំហានពេញ
// = ជញ្ជាំងឈរនៅស្នាមដេករវាងផ្លូវនិងចំណត ។ 📃 ⟩
export interface DokaAlto {
  x: number;
  z: number;
  // ⟨ កម្រិតក្រឡាដែលផ្ទៃវេទិកាស្ថិតក្រោមវាតិចតួច ( VOJA_SUPRO_LEVIGXO - VOJA_DIKECO ) ។ 📃 ⟩
  l6da: number;
}

const qakaj2jAltoj: DokaAlto[] = [];

/*ចុះឈ្មោះកម្រិតវេទិកាចំណត
    @param x, z ( number ) - ចំណុចមាត់ដីរបស់ចំណត
    @param l6da ( number ) - កម្រិតក្រឡារបស់ផ្ទៃចំណត
@returns void */
export function registriDokanAlton( x: number, z: number, l6da: number ): void {
  const ekzistanta = qakaj2jAltoj.find(d => Math.hypot(d.x - x, d.z - z) < 0o1/0o20);
  if ( ekzistanta ) { ekzistanta.x = x; ekzistanta.z = z; ekzistanta.l6da = l6da; return; }
  qakaj2jAltoj.push({ x, z, l6da });
}

/*យក និងលុប កម្រិតចំណតដែលបានចុះឈ្មោះសម្រាប់ការសាងសង់នេះ
    @returns ca1ara ( DokaAlto [ ] ) - កម្រិតចំណត */
export function konsumiDokajnAltojn(): DokaAlto[] {
  const kopio = qakaj2jAltoj.map(d => ( { ...d } ));
  qakaj2jAltoj.length = 0;
  return kopio;
}

/*រកកម្រិតចំណតដែលជិតចំណុចមួយ
    @param ca1ara ( DokaAlto [ ] ) - កម្រិតចំណត
    @param x, z ( number ) - ចំណុចភ្ជាប់
@returns l6da ( number | undefined ) - កម្រិតចំណត ឬគ្មាន */
export function qakaj2AltoEl( ca1ara: readonly DokaAlto[], x: number, z: number ): number | undefined {
  let plej = 0o1/0o10, rez: number | undefined;
  for ( const d of ca1ara ) {
    const h6kuni = Math.hypot(d.x - x, d.z - z);
    if ( h6kuni <= plej ) { plej = h6kuni; rez = d.l6da; }
  }
  return rez;
}

/*អានកម្រិតចំណតដោយមិនលុបវា ( សម្រាប់ឧបករណ៍វាស់ )
    @param x, z ( number ) - ចំណុចមាត់ដីរបស់ចំណត
@returns l6da ( number | undefined ) - កម្រិតចំណត ឬគ្មាន */
export function qakaj2AltoCxe( x: number, z: number ): number | undefined {
  return qakaj2AltoEl(qakaj2jAltoj, x, z);
}

/*រកកម្រិតរាបរបស់ចាន , ឬ undefined បើគ្មាន
    @param ca3aq ( string ) - គន្លឹះ "x,z"
@returns l6da ( number | undefined ) - កម្រិតចាន */
export function plataAltoDeVeb6kek( ca3aq: string ): number | undefined {
  return kunigajHavem2.get(ca3aq)?.l6da;
}

/*ជ្រើសកម្រិតរាបរបស់ចានពីកម្ពស់ដៃទាំងអស់
    @param knece ( BrakaAlto [ ] ) - កម្ពស់ដៃដែលបានតាមដាន
    @param rezervo ( number ) - កម្រិតដីដែលចានត្រូវស្ថិតលើ ( មិនកប់ )
@returns l6da ( number ) - កម្រិតចានរាប , បង្គត់លើក្រឡា */
// ⟨ ជិតដីបំផុត 📏 ⟩ ៖ ចានគួរស្មើផ្លូវមួយឬច្រើន ហើយផ្លូវផ្សេងៗឡើង
// ជាជំហានពីចានទៅរកកម្រិតរបស់វា ។ បើយកទាបបំផុតជានិច្ច , ចានលិចក្រោម
// ដីកណ្តាលនៅជម្រាល ។ បើយកខ្ពស់បំផុតវិញ , ចានអណ្តែតលើដី ហើយមុខ
// ចំហៀងរបស់វាក្លាយជាជញ្ជាំងខ្ពស់ជុំវិញ ។ ដូច្នេះយកកម្រិតដៃដែលជិត
// កម្រិតដីបំផុត ហើយមិនដែលទាបជាងដីទេ ។ ស្មើគ្នា យកទាបជាង ដើម្បីឱ្យ
// ផ្លូវខ្ពស់ៗឡើងជាជម្រាលពីចាន ។ 📃 ⟩
export function elektiPlatanAlton( knece: readonly BrakaAlto[], rezervo: number ): number {
  const validaj = knece.map(b => b.l6da).filter(Number.isFinite);
  const tera = surGrid(rezervo);
  if ( validaj.length === 0 ) return tera;
  let elektita = validaj[ 0 ], plejProksima = Infinity;
  for ( const l6da of validaj ) {
    const h6kuni = Math.abs(l6da - tera);
    if ( h6kuni < plejProksima || ( h6kuni === plejProksima && l6da < elektita ) ) {
      plejProksima = h6kuni;
      elektita = l6da;
    }
  }
  return Math.max(surGrid(elektita), tera);
}
