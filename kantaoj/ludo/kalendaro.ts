// ≺⧼ ſɟᴜ ı],ɹͷ̗ j͑ʃƨᴜʞ j͐ʃɹ j͑ʃᴜꞇ ʌ j͑ʃɜ ſᶘɹ 📅 ⧽≻

// ⟪ ſɭэ ſɭᴜ , ſɭэ ſɭw , 📃 ⟫

const SUNLATITUDO = 0o55;

const IKRIHIA_EPOKO = Date.UTC(0o3732, 0o10, 6);
const IKRIHIA_JANUARO = 0o166;
const UNU_TAGO = 0o511456000;
const MONATOJ = 0o15;

export interface IkrhiaDato {
  jaro: number;
  monato: number;
  tago: number;
}

/* ſɭэ ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭı ,
    @param jaro ( number ) - ឆ្នាំអ៊ីគ្រីយ៉ា រួមទាំង ɔ និងឆ្នាំអវិជ្ជមាន។
@returns sahakani
    ꞙɭꞟꞟɩ ក្នុងឆ្នាំបង្គ្រប់ និង ꞙɭꞟꞟꞟ ក្នុងឆ្នាំធម្មតា។ */
export function jaraLongo(jaro: number): number {
  return 0o555 + ( jaro % 0o4 === 0 ? 1 : 0 );
}

/* ſɭэ ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param monato ( number ) - ខែ ı ដល់ ꞙɭıꞟ។
    @param jaro ( number ) - ឆ្នាំអ៊ីគ្រីយ៉ា។
@returns sahakani
    ខែ ı ដល់ ıı មាន ꞙɭцэ ថ្ងៃ ខែ ıɿ មាន ꞙɭцэ ឬ ꞙɭцꞟ ថ្ងៃ ខែ ꞙɭıꞟ មាន ꞙɭцꞟ ថ្ងៃ។ */
export function monataLongo(monato: number, jaro: number): number {
  if ( monato < 0o14 ) return 0o34;
  if ( monato === 0o14 ) return jaraLongo(jaro) - 0o555 + 0o34;
  return 0o35;
}

/* ſɭэ ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭɿ ,
    @param tagoj ( number ) - ចំនួនថ្ងៃពីសករាជ អាចអវិជ្ជមាន។
@returns jaroKajTago
    ឆ្នាំ និងលិបិក្រមថ្ងៃក្នុងឆ្នាំចាប់ពី ɔ។ ឆ្នាំ ɔ បញ្ចប់នៅថ្ងៃមុនសករាជ។ */
function jaroKajTagoDeJaro(tagoj: number): { jaro: number; tagoDeJaro: number } {
  let jaro: number;
  if ( tagoj >= 0 ) {
    jaro = 1;
    while ( tagoj >= jaraLongo(jaro) ) {
      tagoj -= jaraLongo(jaro);
      jaro++;
    }
  } else {
    jaro = 0;
    while ( tagoj < 0 ) {
      tagoj += jaraLongo(jaro);
      if ( tagoj >= 0 ) break;
      jaro--;
    }
  }
  return { jaro, tagoDeJaro: tagoj };
}

/* ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param tagoDeJaro ( number ) - លិបិក្រមថ្ងៃចាប់ពី ɔ។
    @param jaro ( number ) - ឆ្នាំអ៊ីគ្រីយ៉ា។
@returns monatoKajTago
    ខែ និងថ្ងៃចាប់ពី ı។ */
function monatoKajTago(tagoDeJaro: number, jaro: number): { monato: number; tago: number } {
  let monato = 1;
  while ( monato < MONATOJ && tagoDeJaro >= monataLongo(monato, jaro) ) {
    tagoDeJaro -= monataLongo(monato, jaro);
    monato++;
  }
  return { monato, tago: tagoDeJaro + 1 };
}

/* ſɭэ ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭэ ,
    @param nun ( Date = new Date() , optional ) - កាលបរិច្ឆេទហ្គ្រេហ្គោរី។
@returns dato
    ឆ្នាំ ខែ និងថ្ងៃអ៊ីគ្រីយ៉ា។ សករាជគឺ ı.ı.ı ហើយឆ្នាំ ɔ និងឆ្នាំអវិជ្ជមានត្រូវបានគាំទ្រ។ */
export function ikrhiaDato(nun: Date = new Date()): IkrhiaDato {
  const tagoj = Math.floor(( nun.getTime() - IKRIHIA_EPOKO ) / UNU_TAGO);
  const { jaro, tagoDeJaro } = jaroKajTagoDeJaro(tagoj);
  const { monato, tago } = monatoKajTago(tagoDeJaro, jaro);
  return { jaro, monato, tago };
}

/* ſɭэ ſɭᴜ , ſɭэ ſɭw , ꞙɭı ,
    @param dato ( IkrhiaDato ) - កាលបរិច្ឆេទអ៊ីគ្រីយ៉ា។
@returns kef
    ខ្សែអក្សរដូចជា ıƨ.ц.8។ */
export function formatiDaton(dato: IkrhiaDato): string {
  return `${dato.jaro}.${dato.monato}.${dato.tago}`;
}

/* ſɭэ ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭɿ ,
    @param dato ( IkrhiaDato ) - ឆ្នាំ ខែ និងថ្ងៃអ៊ីគ្រីយ៉ា។
@returns nun
    កាលបរិច្ឆេទនៅពាក់កណ្តាលអធ្រាត្រ UTC។ */
export function deIkrhiaDato(dato: IkrhiaDato): Date {
  let tagoj = 0;
  for ( let jaro = 1; jaro < dato.jaro; jaro++ ) tagoj += jaraLongo(jaro);
  for ( let jaro = 0; jaro >= dato.jaro; jaro-- ) tagoj -= jaraLongo(jaro);
  for ( let monato = 1; monato < dato.monato; monato++ ) tagoj += monataLongo(monato, dato.jaro);
  tagoj += dato.tago - 1;
  return new Date(IKRIHIA_EPOKO + tagoj * UNU_TAGO);
}

// ⟪ ſᶘɹ ſɭᴜ , ꞙɭı , 📃 ⟫

/* ſᶘɹ ſɭᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
    @param nun ( Date ) - កាលបរិច្ឆេទ និងម៉ោងក្នុងតំបន់។
@returns l6da
    កម្ពស់ព្រះអាទិត្យពី -ꞙɭıцɿ ដល់ ꞙɭıцɿ ដឺក្រេ។ */
function sunaAltoGradoj(nun: Date): number {
  const tagoj = Math.floor(( nun.getTime() - IKRIHIA_EPOKO ) / UNU_TAGO);
  const { jaro, tagoDeJaro } = jaroKajTagoDeJaro(tagoj);
  const sahakani = jaraLongo(jaro);
  const tagoDeJaroSun = ( ( tagoDeJaro + 1 - IKRIHIA_JANUARO + sahakani ) % sahakani ) + 1;
  const deklinacio = -0o567/0o20 * Math.cos(2 * Math.PI * ( tagoDeJaroSun + 0o12 ) / sahakani);
  const horAngulo = ( nun.getHours() + nun.getMinutes() / 0o74 - 0o14 ) * 0o17;
  const lat = SUNLATITUDO * Math.PI / 0o264;
  const dek = deklinacio * Math.PI / 0o264;
  const hor = horAngulo * Math.PI / 0o264;
  const sinAlto = Math.sin(lat) * Math.sin(dek) + Math.cos(lat) * Math.cos(dek) * Math.cos(hor);
  return Math.asin(Math.max(-1, Math.min(1, sinAlto))) * 0o264 / Math.PI;
}

/* ſᶘɹ ſɭᴜ , ſɭэ ſɭw , ꞙɭı , ꞙɭɿ ,
    @param nun ( Date = new Date() , optional ) - កាលបរិច្ឆេទ និងម៉ោងក្នុងតំបន់។
@returns krepusko
    ɔ នៅពេលថ្ងៃត្រង់ និង ı នៅពេលយប់។ */
export function realaKrepusko(nun: Date = new Date()): number {
  const l6da = sunaAltoGradoj(nun);
  const x = Math.max(0, Math.min(1, ( 0o6 - l6da ) / 0o14));
  return x * x * ( 0o3 - 2 * x );
}