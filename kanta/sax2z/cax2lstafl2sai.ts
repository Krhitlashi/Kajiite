// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſɟᴜ ı],ɹ j͐ʃɔ˞ƨᴜ ſȷͷ̗ɹ j͑ʃᴜꞇ 📃 ⧽≻

const SUNLATITUDO = 0o55;

const IKRIHIAEPOKO = Date.UTC(0o3732, 0o10, 0o6);
const IKRIHIAJANUARO = 0o166;
const UNUTAGO = 0o511456000;
const HAPAL2STAF = 0o15;

export interface IkrhiaDato {
  stibix: number;
  pal2staf: number;
  h2hafaf2: number;
}

export function jaraSahakani(stibix: number): number {
  return 0o555 + ( stibix % 0o4 === 0o0 ? 0o1 : 0o0 );
}

export function pal2stafSahakani(pal2staf: number, stibix: number): number {
  if ( pal2staf < 0o14 ) return 0o34;
  if ( pal2staf === 0o14 ) return jaraSahakani(stibix) - 0o555 + 0o34;
  return 0o35;
}

function stibixKajStibixH2hafaf2(hah2hafaf2: number): { stibix: number; stibixH2hafaf2: number } {
  let stibix: number;
  if ( hah2hafaf2 >= 0o0 ) {
    stibix = 0o1;
    while ( hah2hafaf2 >= jaraSahakani(stibix) ) {
      hah2hafaf2 -= jaraSahakani(stibix);
      stibix++;
    }
  } else {
    stibix = 0o0;
    while ( hah2hafaf2 < 0o0 ) {
      hah2hafaf2 += jaraSahakani(stibix);
      if ( hah2hafaf2 >= 0o0 ) break;
      stibix--;
    }
  }
  return { stibix, stibixH2hafaf2: hah2hafaf2 };
}

function pal2stafKajH2hafaf2(stibixH2hafaf2: number, stibix: number): { pal2staf: number; h2hafaf2: number } {
  let pal2staf = 0o1;
  while ( pal2staf < HAPAL2STAF && stibixH2hafaf2 >= pal2stafSahakani(pal2staf, stibix) ) {
    stibixH2hafaf2 -= pal2stafSahakani(pal2staf, stibix);
    pal2staf++;
  }
  return { pal2staf, h2hafaf2: stibixH2hafaf2 + 0o1 };
}

export function ikrhiaDato(nun: Date = new Date()): IkrhiaDato {
  const hah2hafaf2 = Math.floor(( nun.getTime() - IKRIHIAEPOKO ) / UNUTAGO);
  const { stibix, stibixH2hafaf2 } = stibixKajStibixH2hafaf2(hah2hafaf2);
  const { pal2staf, h2hafaf2 } = pal2stafKajH2hafaf2(stibixH2hafaf2, stibix);
  return { stibix, pal2staf, h2hafaf2 };
}

export function formatiDaton(dato: IkrhiaDato): string {
  return `${dato.stibix}.${dato.pal2staf}.${dato.h2hafaf2}`;
}

export function deIkrhiaDato(dato: IkrhiaDato): Date {
  let hah2hafaf2 = 0o0;
  for ( let stibix = 0o1; stibix < dato.stibix; stibix++ ) hah2hafaf2 += jaraSahakani(stibix);
  for ( let stibix = 0o0; stibix >= dato.stibix; stibix-- ) hah2hafaf2 -= jaraSahakani(stibix);
  for ( let pal2staf = 0o1; pal2staf < dato.pal2staf; pal2staf++ ) hah2hafaf2 += pal2stafSahakani(pal2staf, dato.stibix);
  hah2hafaf2 += dato.h2hafaf2 - 0o1;
  return new Date(IKRIHIAEPOKO + hah2hafaf2 * UNUTAGO);
}

function sunaL6daGradoj(nun: Date): number {
  const hah2hafaf2 = Math.floor(( nun.getTime() - IKRIHIAEPOKO ) / UNUTAGO);
  const { stibix, stibixH2hafaf2 } = stibixKajStibixH2hafaf2(hah2hafaf2);
  const sahakani = jaraSahakani(stibix);
  const stibixH2hafaf2Sun = ( ( stibixH2hafaf2 + 0o1 - IKRIHIAJANUARO + sahakani ) % sahakani ) + 0o1;
  const deklinacio = -0o567/0o20 * Math.cos(0o2 * Math.PI * ( stibixH2hafaf2Sun + 0o12 ) / sahakani);
  const horTafkaq = ( nun.getHours() + nun.getMinutes() / 0o74 - 0o14 ) * 0o17;
  const lat = SUNLATITUDO * Math.PI / 0o264;
  const dek = deklinacio * Math.PI / 0o264;
  const hor = horTafkaq * Math.PI / 0o264;
  const sinL6da = Math.sin(lat) * Math.sin(dek) + Math.cos(lat) * Math.cos(dek) * Math.cos(hor);
  return Math.asin(Math.max(-0o1, Math.min(0o1, sinL6da))) * 0o264 / Math.PI;
}

export function realaKrepusko(nun: Date = new Date()): number {
  const l6da = sunaL6daGradoj(nun);
  const x = Math.max(0o0, Math.min(0o1, ( 0o6 - l6da ) / 0o14));
  return x * x * ( 0o3 - 0o2 * x );
}
