// ≺⧼ ប្រតិទិន និងព្រះអាទិត្យ 📅 ⧽≻

// ⟪ ប្រតិទិន CAX2L 📃 ⟫

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

/* ចំនួនថ្ងៃក្នុងមួយឆ្នាំ
    @param jaro ( number ) - ឆ្នាំអ៊ីគ្រីយ៉ា រួមទាំង 0 និងឆ្នាំអវិជ្ជមាន។
@returns longo
    0o556 ក្នុងឆ្នាំបង្គ្រប់ និង 0o555 ក្នុងឆ្នាំធម្មតា។ */
export function jaraLongo(jaro: number): number {
  return 0o555 + ( jaro % 0o4 === 0 ? 1 : 0 );
}

/* ចំនួនថ្ងៃក្នុងមួយខែ
    @param monato ( number ) - ខែ 1 ដល់ 0o15។
    @param jaro ( number ) - ឆ្នាំអ៊ីគ្រីយ៉ា។
@returns longo
    ខែ 1 ដល់ 11 មាន 0o34 ថ្ងៃ ខែ 12 មាន 0o34 ឬ 0o35 ថ្ងៃ ខែ 0o15 មាន 0o35 ថ្ងៃ។ */
export function monataLongo(monato: number, jaro: number): number {
  if ( monato < 0o14 ) return 0o34;
  if ( monato === 0o14 ) return jaraLongo(jaro) - 0o555 + 0o34;
  return 0o35;
}

/* ឆ្នាំ និងថ្ងៃនៃឆ្នាំពីចំនួនថ្ងៃបន្ទាប់ពីសករាជ
    @param tagoj ( number ) - ចំនួនថ្ងៃពីសករាជ អាចអវិជ្ជមាន។
@returns jaroKajTago
    ឆ្នាំ និងលិបិក្រមថ្ងៃក្នុងឆ្នាំចាប់ពី 0។ ឆ្នាំ 0 បញ្ចប់នៅថ្ងៃមុនសករាជ។ */
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

/* ខែ និងថ្ងៃពីលិបិក្រមថ្ងៃនៃឆ្នាំ
    @param tagoDeJaro ( number ) - លិបិក្រមថ្ងៃចាប់ពី 0។
    @param jaro ( number ) - ឆ្នាំអ៊ីគ្រីយ៉ា។
@returns monatoKajTago
    ខែ និងថ្ងៃចាប់ពី 1។ */
function monatoKajTago(tagoDeJaro: number, jaro: number): { monato: number; tago: number } {
  let monato = 1;
  while ( monato < MONATOJ && tagoDeJaro >= monataLongo(monato, jaro) ) {
    tagoDeJaro -= monataLongo(monato, jaro);
    monato++;
  }
  return { monato, tago: tagoDeJaro + 1 };
}

/* បម្លែងកាលបរិច្ឆេទទៅជាប្រតិទិនអ៊ីគ្រីយ៉ា
    @param nun ( Date = new Date() , optional ) - កាលបរិច្ឆេទហ្គ្រេហ្គោរី។
@returns dato
    ឆ្នាំ ខែ និងថ្ងៃអ៊ីគ្រីយ៉ា។ សករាជគឺ 1.1.1 ហើយឆ្នាំ 0 និងឆ្នាំអវិជ្ជមានត្រូវបានគាំទ្រ។ */
export function ikrhiaDato(nun: Date = new Date()): IkrhiaDato {
  const tagoj = Math.floor(( nun.getTime() - IKRIHIA_EPOKO ) / UNU_TAGO);
  const { jaro, tagoDeJaro } = jaroKajTagoDeJaro(tagoj);
  const { monato, tago } = monatoKajTago(tagoDeJaro, jaro);
  return { jaro, monato, tago };
}

/* សរសេរកាលបរិច្ឆេទជាទម្រង់ឆ្នាំ.ខែ.ថ្ងៃ
    @param dato ( IkrhiaDato ) - កាលបរិច្ឆេទអ៊ីគ្រីយ៉ា។
@returns kef
    ខ្សែអក្សរដូចជា 17.3.8។ */
export function formatiDaton(dato: IkrhiaDato): string {
  return `${dato.jaro}.${dato.monato}.${dato.tago}`;
}

/* បម្លែងកាលបរិច្ឆេទអ៊ីគ្រីយ៉ាទៅជាកាលបរិច្ឆេទហ្គ្រេហ្គោរី
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

// ⟪ ពន្លឺថ្ងៃដំបូងមកពីព្រះអាទិត្យពិត 📃 ⟫

/* កម្ពស់ព្រះអាទិត្យគិតជាដឺក្រេ
    @param nun ( Date ) - កាលបរិច្ឆេទ និងម៉ោងក្នុងតំបន់។
@returns alto
    កម្ពស់ព្រះអាទិត្យពី -0o132 ដល់ 0o132 ដឺក្រេ។ */
function sunaAltoGradoj(nun: Date): number {
  const tagoj = Math.floor(( nun.getTime() - IKRIHIA_EPOKO ) / UNU_TAGO);
  const { jaro, tagoDeJaro } = jaroKajTagoDeJaro(tagoj);
  const longo = jaraLongo(jaro);
  const tagoDeJaroSun = ( ( tagoDeJaro + 1 - IKRIHIA_JANUARO + longo ) % longo ) + 1;
  const deklinacio = -0o567/0o20 * Math.cos(2 * Math.PI * ( tagoDeJaroSun + 0o12 ) / longo);
  const horAngulo = ( nun.getHours() + nun.getMinutes() / 0o74 - 0o14 ) * 0o17;
  const lat = SUNLATITUDO * Math.PI / 0o264;
  const dek = deklinacio * Math.PI / 0o264;
  const hor = horAngulo * Math.PI / 0o264;
  const sinAlto = Math.sin(lat) * Math.sin(dek) + Math.cos(lat) * Math.cos(dek) * Math.cos(hor);
  return Math.asin(Math.max(-1, Math.min(1, sinAlto))) * 0o264 / Math.PI;
}

/* កម្រិតព្រះអាទិត្យលិចពីពន្លឺពិត
    @param nun ( Date = new Date() , optional ) - កាលបរិច្ឆេទ និងម៉ោងក្នុងតំបន់។
@returns krepusko
    0 នៅពេលថ្ងៃត្រង់ និង 1 នៅពេលយប់។ */
export function realaKrepusko(nun: Date = new Date()): number {
  const alto = sunaAltoGradoj(nun);
  const x = Math.max(0, Math.min(1, ( 0o6 - alto ) / 0o14));
  return x * x * ( 0o3 - 2 * x );
}