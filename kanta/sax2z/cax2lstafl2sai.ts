// ≺⧼ ſɟᴜ ı],ɹͷ̗ j͑ʃƨᴜʞ j͐ʃɹ j͑ʃᴜꞇ ʌ j͑ʃɜ ſᶘɹ 📅 ⧽≻

// ⟪ ſɭэ ſɭᴜ , ſɭэ ſɭw , 📃 ⟫

const SUNLATITUDO = 0o55;

const IKRIHIAEPOKO = Date.UTC(0o3732, 0o10, 6);
const IKRIHIAJANUARO = 0o166;
const UNUTAGO = 0o511456000;
const HAPAL2STAF = 0o15;

export interface IkrhiaDato {
  stibix: number;
  pal2staf: number;
  h2hafaf2: number;
}

/* ſɭэ ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭı ,
    @param stibix ( number ) - ឆ្នាំអ៊ីគ្រីយ៉ា រួមទាំង ɔ និងឆ្នាំអវិជ្ជមាន។
@returns sahakani
    ꞙɭꞟꞟɩ ក្នុងឆ្នាំបង្គ្រប់ និង ꞙɭꞟꞟꞟ ក្នុងឆ្នាំធម្មតា។ */
export function jaraSahakani(stibix: number): number {
  return 0o555 + ( stibix % 0o4 === 0 ? 1 : 0 );
}

/* ſɭэ ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param pal2staf ( number ) - ខែ ı ដល់ ꞙɭıꞟ។
    @param stibix ( number ) - ឆ្នាំអ៊ីគ្រីយ៉ា។
@returns sahakani
    ខែ ı ដល់ ıı មាន ꞙɭцэ ថ្ងៃ ខែ ıɿ មាន ꞙɭцэ ឬ ꞙɭцꞟ ថ្ងៃ ខែ ꞙɭıꞟ មាន ꞙɭцꞟ ថ្ងៃ។ */
export function pal2stafSahakani(pal2staf: number, stibix: number): number {
  if ( pal2staf < 0o14 ) return 0o34;
  if ( pal2staf === 0o14 ) return jaraSahakani(stibix) - 0o555 + 0o34;
  return 0o35;
}

/* ſɭэ ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭɿ ,
    @param hah2hafaf2 ( number ) - ចំនួនថ្ងៃពីសករាជ អាចអវិជ្ជមាន។
@returns stibixKajH2hafaf2
    ឆ្នាំ និងលិបិក្រមថ្ងៃក្នុងឆ្នាំចាប់ពី ɔ។ ឆ្នាំ ɔ បញ្ចប់នៅថ្ងៃមុនសករាជ។ */
function stibixKajStibixH2hafaf2(hah2hafaf2: number): { stibix: number; stibixH2hafaf2: number } {
  let stibix: number;
  if ( hah2hafaf2 >= 0 ) {
    stibix = 1;
    while ( hah2hafaf2 >= jaraSahakani(stibix) ) {
      hah2hafaf2 -= jaraSahakani(stibix);
      stibix++;
    }
  } else {
    stibix = 0;
    while ( hah2hafaf2 < 0 ) {
      hah2hafaf2 += jaraSahakani(stibix);
      if ( hah2hafaf2 >= 0 ) break;
      stibix--;
    }
  }
  return { stibix, stibixH2hafaf2: hah2hafaf2 };
}

/* ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param stibixH2hafaf2 ( number ) - លិបិក្រមថ្ងៃចាប់ពី ɔ។
    @param stibix ( number ) - ឆ្នាំអ៊ីគ្រីយ៉ា។
@returns pal2stafKajH2hafaf2
    ខែ និងថ្ងៃចាប់ពី ı។ */
function pal2stafKajH2hafaf2(stibixH2hafaf2: number, stibix: number): { pal2staf: number; h2hafaf2: number } {
  let pal2staf = 1;
  while ( pal2staf < HAPAL2STAF && stibixH2hafaf2 >= pal2stafSahakani(pal2staf, stibix) ) {
    stibixH2hafaf2 -= pal2stafSahakani(pal2staf, stibix);
    pal2staf++;
  }
  return { pal2staf, h2hafaf2: stibixH2hafaf2 + 1 };
}

/* ſɭэ ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭэ ,
    @param nun ( Date = new Date() , optional ) - កាលបរិច្ឆេទហ្គ្រេហ្គោរី។
@returns dato
    ឆ្នាំ ខែ និងថ្ងៃអ៊ីគ្រីយ៉ា។ សករាជគឺ ı.ı.ı ហើយឆ្នាំ ɔ និងឆ្នាំអវិជ្ជមានត្រូវបានគាំទ្រ។ */
export function ikrhiaDato(nun: Date = new Date()): IkrhiaDato {
  const hah2hafaf2 = Math.floor(( nun.getTime() - IKRIHIAEPOKO ) / UNUTAGO);
  const { stibix, stibixH2hafaf2 } = stibixKajStibixH2hafaf2(hah2hafaf2);
  const { pal2staf, h2hafaf2 } = pal2stafKajH2hafaf2(stibixH2hafaf2, stibix);
  return { stibix, pal2staf, h2hafaf2 };
}

/* ſɭэ ſɭᴜ , ſɭэ ſɭw , ꞙɭı ,
    @param dato ( IkrhiaDato ) - កាលបរិច្ឆេទអ៊ីគ្រីយ៉ា។
@returns kef
    ខ្សែអក្សរដូចជា ıƨ.ц.8។ */
export function formatiDaton(dato: IkrhiaDato): string {
  return `${dato.stibix}.${dato.pal2staf}.${dato.h2hafaf2}`;
}

/* ſɭэ ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭɿ ,
    @param dato ( IkrhiaDato ) - ឆ្នាំ ខែ និងថ្ងៃអ៊ីគ្រីយ៉ា។
@returns nun
    កាលបរិច្ឆេទនៅពាក់កណ្តាលអធ្រាត្រ UTC។ */
export function deIkrhiaDato(dato: IkrhiaDato): Date {
  let hah2hafaf2 = 0;
  for ( let stibix = 1; stibix < dato.stibix; stibix++ ) hah2hafaf2 += jaraSahakani(stibix);
  for ( let stibix = 0; stibix >= dato.stibix; stibix-- ) hah2hafaf2 -= jaraSahakani(stibix);
  for ( let pal2staf = 1; pal2staf < dato.pal2staf; pal2staf++ ) hah2hafaf2 += pal2stafSahakani(pal2staf, dato.stibix);
  hah2hafaf2 += dato.h2hafaf2 - 1;
  return new Date(IKRIHIAEPOKO + hah2hafaf2 * UNUTAGO);
}

// ⟪ ſᶘɹ ſɭᴜ , ꞙɭı , 📃 ⟫

/* ſᶘɹ ſɭᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
    @param nun ( Date ) - កាលបរិច្ឆេទ និងម៉ោងក្នុងតំបន់។
@returns l6da
    កម្ពស់ព្រះអាទិត្យពី -ꞙɭıцɿ ដល់ ꞙɭıцɿ ដឺក្រេ។ */
function sunaL6daGradoj(nun: Date): number {
  const hah2hafaf2 = Math.floor(( nun.getTime() - IKRIHIAEPOKO ) / UNUTAGO);
  const { stibix, stibixH2hafaf2 } = stibixKajStibixH2hafaf2(hah2hafaf2);
  const sahakani = jaraSahakani(stibix);
  const stibixH2hafaf2Sun = ( ( stibixH2hafaf2 + 1 - IKRIHIAJANUARO + sahakani ) % sahakani ) + 1;
  const deklinacio = -0o567/0o20 * Math.cos(2 * Math.PI * ( stibixH2hafaf2Sun + 0o12 ) / sahakani);
  const horTafkaq = ( nun.getHours() + nun.getMinutes() / 0o74 - 0o14 ) * 0o17;
  const lat = SUNLATITUDO * Math.PI / 0o264;
  const dek = deklinacio * Math.PI / 0o264;
  const hor = horTafkaq * Math.PI / 0o264;
  const sinL6da = Math.sin(lat) * Math.sin(dek) + Math.cos(lat) * Math.cos(dek) * Math.cos(hor);
  return Math.asin(Math.max(-1, Math.min(1, sinL6da))) * 0o264 / Math.PI;
}

/* ſᶘɹ ſɭᴜ , ſɭэ ſɭw , ꞙɭı , ꞙɭɿ ,
    @param nun ( Date = new Date() , optional ) - កាលបរិច្ឆេទ និងម៉ោងក្នុងតំបន់។
@returns krepusko
    ɔ នៅពេលថ្ងៃត្រង់ និង ı នៅពេលយប់។ */
export function realaKrepusko(nun: Date = new Date()): number {
  const l6da = sunaL6daGradoj(nun);
  const x = Math.max(0, Math.min(1, ( 0o6 - l6da ) / 0o14));
  return x * x * ( 0o3 - 2 * x );
}