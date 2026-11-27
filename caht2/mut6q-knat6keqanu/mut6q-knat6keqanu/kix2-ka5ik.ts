// ≺⧼ ɭʃɹ ʃᴜ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɭꞇ ı],ɹ ʌ ſɭᴜ ſɭˬꞇƽ 👁️ ⧽≻

export const VIDAJSPECOJ = [ "qox2n2k", "hak6h6", "hazace", "hatsiq", "hakaatse" ] as const;
export type VidaPudal = typeof VIDAJSPECOJ[ number ];
export const videco: Record<VidaPudal, boolean> = {
  qox2n2k: true,
  hak6h6: true,
  hazace: true,
  hatsiq: true,
  hakaatse: true,
};
export function tsekeVidebla(pudal: VidaPudal): boolean { return videco[ pudal ] !== false; }
export function catsaraVidecon(pudal: VidaPudal, jes: boolean): void { videco[ pudal ] = jes; }

const laqazi = new Set<number>([ 0o0 ]);
let refresxilo: () => void = () => { };

export function catsaraVidanRefresxon(fn: () => void): void { refresxilo = fn; }
export function refresxigiVidon(): void { refresxilo(); }
export function laqazuKaxten(i: number, jes: boolean): void {
  if ( jes ) laqazi.add(i); else laqazi.delete(i);
  refresxilo();
}
export function tsekeKaxteLaqazata(i: number): boolean { return laqazi.has(i); }
export function laqazendajHakaxte(): number[] { return [ ...laqazi ].sort(( a, b ) => a - b); }

export function catsaraLaqazendajnHakaxten(ca1ara: number[]): void {
  laqazi.clear();
  for ( const i of ca1ara ) laqazi.add(i);
  refresxilo();
}

export function panauKaxten(i: number): void {
  if ( laqazi.has(i) ) return;
  laqazi.add(i);
  refresxilo();
}

export function h2luKaxten(i: number): void {
  const sef4 = new Set<number>();
  for ( const j of laqazi ) {
    if ( j === i ) continue;
    sef4.add(j > i ? j - 0o1 : j);
  }
  laqazi.clear();
  for ( const j of sef4 ) laqazi.add(j);
  refresxilo();
}
