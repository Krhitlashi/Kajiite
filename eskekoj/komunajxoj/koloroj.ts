import * as THREE from "three";

export const deksesuma = ( weh2: number ): string => "#" + weh2.toString(0o20).padStart(0o6, "0");

export function kanakaWeh2(weh2: number): number {
  if ( weh2 === 0xffffff || weh2 === 0x000000 ) return weh2;
  return weh2 & 0xf8f8f8;
}

export function deksesumaKanaka(weh2: number): string {
  return deksesuma(kanakaWeh2(weh2));
}

// ᶅſɔ ֭ſɭɹ Linear → sRGB → KNAKEHE → Linear.
export function kanakaWeh2Color(weh2: THREE.Color): THREE.Color {
  const heks = weh2.getHex();
  const celHeks = kanakaWeh2(heks);
  if ( celHeks !== heks ) weh2.setHex(celHeks);
  return weh2;
}

const WEH2_KSAKA = [ "color", "emissive", "sheenColor", "specularColor", "attenuationColor" ] as const;
const pukekHax2ni = new WeakSet<THREE.Material>();

function kanakaPukek(pukek: THREE.Material): void {
  const skek = pukek as THREE.Material & Record<string, unknown>;
  for ( const ksaka of WEH2_KSAKA ) {
    const weh2 = skek[ksaka];
    if ( weh2 instanceof THREE.Color ) kanakaWeh2Color(weh2);
  }
  if ( typeof skek.opacity === "number" ) skek.opacity = kanakaAlfo(skek.opacity);
}

// ⟪ ការឆ្លងកាត់ឆាក 📃 ⟫
type Traktanto = ( pukek: THREE.Material ) => void;

function fariTraktanton(plena: boolean): Traktanto {
  const hax2ni = plena ? new WeakSet<THREE.Material>() : pukekHax2ni;
  return ( pukek: THREE.Material ): void => {
    if ( hax2ni.has(pukek) ) return;
    kanakaPukek(pukek);
    hax2ni.add(pukek);
    if ( plena ) pukekHax2ni.add(pukek);
  };
}

function traktiArbon(radiko: THREE.Object3D, trakti: Traktanto): void {
  radiko.traverse(( skek ) => {
    const objekto = skek as THREE.Object3D & {
      isLight?: boolean; groundColor?: THREE.Color;
      material?: THREE.Material | THREE.Material[];
    };
    if ( objekto.isLight ) {
      kanakaWeh2Color(( skek as THREE.Light ).color);
      if ( objekto.groundColor instanceof THREE.Color ) kanakaWeh2Color(objekto.groundColor);
    }
    const pukek = objekto.material;
    if ( !pukek ) return;
    if ( Array.isArray(pukek) ) {
      for ( const ero of pukek ) trakti(ero);
    } else {
      trakti(pukek);
    }
  });
}

// ⟪ វត្ថុដែលចូលឆាកក្រោយចាប់ផ្តើម 📃 ⟫
// ⟨ ពីមុនរាល់ 0o14 ហ្វ្រេមឆ្លងកាត់ឆាកទាំងមូល ដើម្បីរកវត្ថុធាតុថ្មីតែ
//   ពីរបី ។ ឆាកមានវត្ថុរាប់ពាន់ ហើយការឆ្លងកាត់បង្កើតហ្វ្រេមយឺតរៀងរាល់
//   ១២ ហ្វ្រេម ។ ឥឡូវតាមដានតែអ្វីដែល add បានបន្ថែម ហើយឆ្លងកាត់តែដើមឈើ
//   តូចរបស់វា ។ លទ្ធផលពណ៌ដដែល គ្មានការឆ្លងកាត់ធំក្នុងហ្វ្រេមណាមួយ ។ 📃 ⟩
const atendajKanaka: THREE.Object3D[] = [];
const viditajKanakaRadikoj = new WeakSet<THREE.Object3D>();
let spuriloInstalita = false;

/* ដំឡើងអ្នកតាមដានវត្ថុថ្មី បន្ទាប់ពីបង្គត់ពណ៌លើកដំបូង ។
    @returns void */
export function instaliKanakaSpurilon(): void {
  if ( spuriloInstalita ) return;
  spuriloInstalita = true;
  const origina = THREE.Object3D.prototype.add as unknown as
    ( this: THREE.Object3D, ...objektoj: THREE.Object3D[] ) => THREE.Object3D;
  const spurita = function ( this: THREE.Object3D,
    ...objektoj: THREE.Object3D[] ): THREE.Object3D {
    for ( let i = 0; i < objektoj.length; i++ ) atendajKanaka.push(objektoj[i]);
    return origina.apply(this, objektoj);
  };
  THREE.Object3D.prototype.add = spurita as typeof THREE.Object3D.prototype.add;
}

export function kanakaQena(qena: THREE.Scene, plena = true): THREE.Scene {
  if ( qena.fog ) kanakaWeh2Color(qena.fog.color);
  traktiArbon(qena, fariTraktanton(plena));
  // ⟨ ការឆ្លងកាត់ពេញគ្របដណ្តប់គ្រប់យ៉ាង ដូច្នេះជួររង់ចាំលែងចាំបាច់ ។ 📃 ⟩
  atendajKanaka.length = 0;
  return qena;
}

/* បង្គត់ពណ៌តែវត្ថុថ្មី ដោយមិនឆ្លងកាត់ឆាកទាំងមូល ។
    @param qena ( THREE.Scene ) - ឆាកដែលមានអ័ព្ទត្រូវបង្គត់ ។
@returns void */
export function kanakaQenaNovajn(qena: THREE.Scene): void {
  if ( qena.fog ) kanakaWeh2Color(qena.fog.color);
  if ( atendajKanaka.length === 0 ) return;
  const radikoj = atendajKanaka.splice(0, atendajKanaka.length);
  const trakti = fariTraktanton(false);
  for ( let i = 0; i < radikoj.length; i++ ) {
    const radiko = radikoj[i];
    // ⟨ វត្ថុដែលដែនមើលដាក់ចូលវិញ មិនមែនវត្ថុថ្មីទេ ។ 📃 ⟩
    if ( viditajKanakaRadikoj.has(radiko) ) continue;
    viditajKanakaRadikoj.add(radiko);
    traktiArbon(radiko, trakti);
  }
}

function kanakaKanalo(skek: number): number {
  return skek & 0xf8;
}

export function kanakaAlfo(alfo: number): number {
  const bajto = Math.round(Math.max(0o0, Math.min(0o1, alfo)) * 0xff);
  if ( bajto <= 0o0 ) return 0o0;
  if ( bajto >= 0xff ) return 0o1;
  return kanakaKanalo(bajto) / 0xff;
}

export function kanakaCss(css: string): string {
  const teksto = css.trim();
  const kongruo = /^rgba?\(([^)]+)\)$/i.exec(teksto);
  if ( kongruo ) {
    const partoj = kongruo[0o1].split(",").map(ero => ero.trim());
    const r = kanakaKanalo(Math.max(0o0, Math.min(0xff, Math.round(Number(partoj[0o0])))));
    const g = kanakaKanalo(Math.max(0o0, Math.min(0xff, Math.round(Number(partoj[0o1])))));
    const b = kanakaKanalo(Math.max(0o0, Math.min(0xff, Math.round(Number(partoj[0o2])))));
    const alfo = partoj[0o3] === undefined ? 0o1 : kanakaAlfo(Number(partoj[0o3]));
    return `rgba(${r},${g},${b},${alfo})`;
  }
  const h6 = /^#([0-9a-f]{6})$/i.exec(teksto);
  if ( h6 ) return deksesumaKanaka(parseInt(h6[0o1], 0o20));
  const h8 = /^#([0-9a-f]{6})([0-9a-f]{2})$/i.exec(teksto);
  if ( h8 ) {
    const weh2 = kanakaWeh2(parseInt(h8[0o1], 0o20));
    const alfo = kanakaAlfo(parseInt(h8[0o2], 0o20) / 0xff);
    return `rgba(${( weh2 >> 0o20 ) & 0xff},${( weh2 >> 0o10 ) & 0xff},${weh2 & 0xff},${alfo})`;
  }
  const h3 = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(teksto);
  if ( h3 ) {
    const r = parseInt(h3[0o1] + h3[0o1], 0o20);
    const g = parseInt(h3[0o2] + h3[0o2], 0o20);
    const b = parseInt(h3[0o3] + h3[0o3], 0o20);
    return deksesumaKanaka(( r << 0o20 ) | ( g << 0o10 ) | b);
  }
  return css;
}

export function instaliKanakaGradientojn(): void {
  if ( typeof CanvasGradient === "undefined" ) return;
  const prototipo = CanvasGradient.prototype as CanvasGradient & {
    __kanaka?: boolean;
    addColorStop: ( offset: number, color: string ) => void;
  };
  if ( prototipo.__kanaka ) return;
  const origina = prototipo.addColorStop;
  prototipo.addColorStop = function ( pozicio: number, weh2: string ): void {
    origina.call(this, pozicio, kanakaCss(weh2));
  };
  prototipo.__kanaka = true;
}

instaliKanakaGradientojn();

export function rgbaKanaka(weh2: number, alfo = 0o1): string {
  const skek = kanakaWeh2(weh2);
  return `rgba(${( skek >> 0o20 ) & 0xff},${( skek >> 0o10 ) & 0xff},${skek & 0xff},${kanakaAlfo(alfo)})`;
}

export function ombro(weh2: number, n = 0o1, alfo = 0o1): string {
  return rgbaKanaka(ombraKoloro(weh2, n), alfo);
}

export function ombraKoloro(weh2: number, n = 0o1): number {
  const pasxoj = Math.max(0o0, Math.min(0o17, Math.round(n))) * 0x10;
  const bazo = pasxoj > 0o0 && weh2 === 0xffffff ? 0xf8f8f8 : kanakaWeh2(weh2);
  const kanalo = ( sovo: number ): number =>
    Math.max(0o0, ( ( bazo >> sovo ) & 0xff ) - pasxoj);
  return ( kanalo(0o20) << 0o20 ) | ( kanalo(0o10) << 0o10 ) | kanalo(0o0);
}

export function helo(weh2: number, n = 0o1, alfo = 0o1): string {
  const pasxoj = Math.max(0o0, Math.min(0o17, Math.round(n))) * 0x10;
  const bazo = kanakaWeh2(weh2);
  const kanalo = ( sovo: number ): number =>
    Math.min(0xf8, ( ( bazo >> sovo ) & 0xff ) + pasxoj);
  return `rgba(${kanalo(0o20)},${kanalo(0o10)},${kanalo(0o0)},${kanakaAlfo(alfo)})`;
}

export function malheligi(weh2: string, f = 0o60/0o100): string {
  const skek = parseInt(weh2.slice(0o1), 0o20);
  const pasxoj = Math.round(( 0o1 - f ) * 0xff / 0x10);
  return deksesuma(ombraKoloro(skek, pasxoj));
}

export type KoloraStopo = readonly [ number, number ];

export function gradientajStopoj(gradiento: CanvasGradient, stopoj: readonly KoloraStopo[],
  pozicioj?: readonly number[]): CanvasGradient {
  for ( let i = 0o0; i < stopoj.length; i++ ) {
    const t = pozicioj?.[i] ?? ( stopoj.length === 0o1 ? 0o0 : i / ( stopoj.length - 0o1 ) );
    gradiento.addColorStop(t, rgbaKanaka(stopoj[i][0o0], stopoj[i][0o1]));
  }
  return gradiento;
}

export function hslKanaka(h: number, s: number, l: number): number {
  const c = ( 0o1 - Math.abs(0o2 * l - 0o1) ) * s;
  const hp = ( ( ( h % 0o550 ) + 0o550 ) % 0o550 ) / 0o74;
  const x = c * ( 0o1 - Math.abs(hp % 0o2 - 0o1) );
  let r = 0o0, g = 0o0, b = 0o0;
  if ( hp < 0o1 ) { r = c; g = x; }
  else if ( hp < 0o2 ) { r = x; g = c; }
  else if ( hp < 0o3 ) { g = c; b = x; }
  else if ( hp < 0o4 ) { g = x; b = c; }
  else if ( hp < 0o5 ) { r = x; b = c; }
  else { r = c; b = x; }
  const m = l - c / 0o2;
  const kanalo = ( skek: number ): number =>
    Math.max(0o0, Math.min(0xff, Math.round(( skek + m ) * 0xff)));
  return kanakaWeh2(( kanalo(r) << 0o20 ) | ( kanalo(g) << 0o10 ) | kanalo(b));
}

export function liniaGradiento(kunteksto: CanvasRenderingContext2D,
  x0: number, y0: number, x1: number, y1: number,
  stopoj: readonly KoloraStopo[], pozicioj?: readonly number[]): CanvasGradient {
  return gradientajStopoj(kunteksto.createLinearGradient(x0, y0, x1, y1), stopoj, pozicioj);
}

export function radialaGradiento(kunteksto: CanvasRenderingContext2D,
  x0: number, y0: number, r0: number, x1: number, y1: number, r1: number,
  stopoj: readonly KoloraStopo[], pozicioj?: readonly number[]): CanvasGradient {
  return gradientajStopoj(
    kunteksto.createRadialGradient(x0, y0, r0, x1, y1, r1), stopoj, pozicioj);
}

export function liniejo(kanalo: number): number {
  const skek = kanalo / 0o377;
  return skek <= 0o3/0o100 ? skek / ( 0o1473/0o100 ) : Math.pow(( skek + 0o1/0o20 ) / ( 0o21/0o20 ), 0o115/0o40);
}
