import * as THREE from "three";

export const weh2Ruva = ( weh2: number ): string => "#" + weh2.toString(0o20).padStart(0o6, "0");

export function veb6qaiWeh2(weh2: number): number {
  if ( weh2 === 0xffffff || weh2 === 0x000000 ) return weh2;
  return weh2 & 0xf8f8f8;
}

export function veb6qaiWeh2Ruva(weh2: number): string {
  return weh2Ruva(veb6qaiWeh2(weh2));
}

// ᶅſɔ ֭ſɭɹ Linear → sRGB → KNAKEHE → Linear.
export function veb6qaiWeh2Skek(weh2: THREE.Color): THREE.Color {
  const heks = weh2.getHex();
  const celHeks = veb6qaiWeh2(heks);
  if ( celHeks !== heks ) weh2.setHex(celHeks);
  return weh2;
}

const WEH2_KSAKA = [ "color", "emissive", "sheenColor", "specularColor", "attenuationColor" ] as const;
const pukekHax2ni = new WeakSet<THREE.Material>();

function veb6qaiPukek(pukek: THREE.Material): void {
  const skek = pukek as THREE.Material & Record<string, unknown>;
  for ( const ksaka of WEH2_KSAKA ) {
    const weh2 = skek[ksaka];
    if ( weh2 instanceof THREE.Color ) veb6qaiWeh2Skek(weh2);
  }
  if ( typeof skek.opacity === "number" ) skek.opacity = veb6qaiW2d2(skek.opacity);
}

// ⟪ ſɟᴜ ſ͕ɭᴜ ı],ɔ ŋᷠᴜ 📃 ⟫
type Caqaxema = ( pukek: THREE.Material ) => void;

function kf2Caqaxema(l2ha: boolean): Caqaxema {
  const hax2ni = l2ha ? new WeakSet<THREE.Material>() : pukekHax2ni;
  return ( pukek: THREE.Material ): void => {
    if ( hax2ni.has(pukek) ) return;
    veb6qaiPukek(pukek);
    hax2ni.add(pukek);
    if ( l2ha ) pukekHax2ni.add(pukek);
  };
}

function kataZace(zace: THREE.Object3D, caqaxema: Caqaxema): void {
  zace.traverse(( skek ) => {
    const objekto = skek as THREE.Object3D & {
      isLight?: boolean; groundColor?: THREE.Color;
      material?: THREE.Material | THREE.Material[];
    };
    if ( objekto.isLight ) {
      veb6qaiWeh2Skek(( skek as THREE.Light ).color);
      if ( objekto.groundColor instanceof THREE.Color ) veb6qaiWeh2Skek(objekto.groundColor);
    }
    const pukek = objekto.material;
    if ( !pukek ) return;
    if ( Array.isArray(pukek) ) {
      for ( const ero of pukek ) caqaxema(ero);
    } else {
      caqaxema(pukek);
    }
  });
}

// ⟪ j͑ʃɔ ſȷэⅎ ʌ ſ͕ɭɔ }ʃᴜ ʌ j͑ʃƽɔƽ 📃 ⟫
const kol2saiVeb6qai: THREE.Object3D[] = [];
const akezaiVeb6qaiZace = new WeakSet<THREE.Object3D>();
let saxesai = false;

/* j͑ʃᴜ ı],ɔ ʌ j͑ʃ'ɔ ʃэ ſ͕ɭᴜꞇ ⟅
@returns void */
export function saxeVeb6qai(): void {
  if ( saxesai ) return;
  saxesai = true;
  const xaqadi = THREE.Object3D.prototype.add as unknown as
    ( this: THREE.Object3D, ...objektoj: THREE.Object3D[] ) => THREE.Object3D;
  const spurita = function ( this: THREE.Object3D,
    ...objektoj: THREE.Object3D[] ): THREE.Object3D {
    for ( let i = 0; i < objektoj.length; i++ ) kol2saiVeb6qai.push(objektoj[i]);
    return xaqadi.apply(this, objektoj);
  };
  THREE.Object3D.prototype.add = spurita as typeof THREE.Object3D.prototype.add;
}

export function veb6qaiQena(qena: THREE.Scene, l2ha = true): THREE.Scene {
  if ( qena.fog ) veb6qaiWeh2Skek(qena.fog.color);
  kataZace(qena, kf2Caqaxema(l2ha));
  // ⟪ ſɭᴜ ɭʃᴜ ʌ ſɭ,ᴜ ſɟɔ 📃 ⟫
  kol2saiVeb6qai.length = 0;
  return qena;
}

/* ſɭᴜ }ʃᴜ ſɭᴜ ʌ j͑ʃɔ ſȷэⅎ ʌ ſ͕ɭɔ }ʃᴜ ʌ j͑ʃƽɔƽ ⟅
    @param qena ( THREE.Scene ) - ſɭᴜ }ʃᴜ ſɭᴜ ʌ ſ͕ɭɔ }ʃᴜ ⟅
@returns void */
export function veb6qaiSef4Qena(qena: THREE.Scene): void {
  if ( qena.fog ) veb6qaiWeh2Skek(qena.fog.color);
  if ( kol2saiVeb6qai.length === 0 ) return;
  const hazace = kol2saiVeb6qai.splice(0, kol2saiVeb6qai.length);
  const caqaxema = kf2Caqaxema(false);
  for ( let i = 0; i < hazace.length; i++ ) {
    const zace = hazace[i];
    // ⟪ ſɭ,ᴜ ſɟɔ 📃 ⟫
    if ( akezaiVeb6qaiZace.has(zace) ) continue;
    akezaiVeb6qaiZace.add(zace);
    kataZace(zace, caqaxema);
  }
}

function veb6qaiWeh2Kek(kek: number): number {
  return kek & 0xf8;
}

export function veb6qaiW2d2(alfo: number): number {
  const cacaja = Math.round(Math.max(0o0, Math.min(0o1, alfo)) * 0xff);
  if ( cacaja <= 0o0 ) return 0o0;
  if ( cacaja >= 0xff ) return 0o1;
  return veb6qaiWeh2Kek(cacaja) / 0xff;
}

export function veb6qaiCss(css: string): string {
  const s2banani = css.trim();
  const kongruo = /^rgba?\(([^)]+)\)$/i.exec(s2banani);
  if ( kongruo ) {
    const hakek = kongruo[0o1].split(",").map(ero => ero.trim());
    const r = veb6qaiWeh2Kek(Math.max(0o0, Math.min(0xff, Math.round(Number(hakek[0o0])))));
    const g = veb6qaiWeh2Kek(Math.max(0o0, Math.min(0xff, Math.round(Number(hakek[0o1])))));
    const b = veb6qaiWeh2Kek(Math.max(0o0, Math.min(0xff, Math.round(Number(hakek[0o2])))));
    const alfo = hakek[0o3] === undefined ? 0o1 : veb6qaiW2d2(Number(hakek[0o3]));
    return `rgba(${r},${g},${b},${alfo})`;
  }
  const h6 = /^#([0-9a-f]{6})$/i.exec(s2banani);
  if ( h6 ) return veb6qaiWeh2Ruva(parseInt(h6[0o1], 0o20));
  const h8 = /^#([0-9a-f]{6})([0-9a-f]{2})$/i.exec(s2banani);
  if ( h8 ) {
    const weh2 = veb6qaiWeh2(parseInt(h8[0o1], 0o20));
    const alfo = veb6qaiW2d2(parseInt(h8[0o2], 0o20) / 0xff);
    return `rgba(${( weh2 >> 0o20 ) & 0xff},${( weh2 >> 0o10 ) & 0xff},${weh2 & 0xff},${alfo})`;
  }
  const h3 = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(s2banani);
  if ( h3 ) {
    const r = parseInt(h3[0o1] + h3[0o1], 0o20);
    const g = parseInt(h3[0o2] + h3[0o2], 0o20);
    const b = parseInt(h3[0o3] + h3[0o3], 0o20);
    return veb6qaiWeh2Ruva(( r << 0o20 ) | ( g << 0o10 ) | b);
  }
  return css;
}

export function kf2Veb6qaiKs2bu(): void {
  if ( typeof CanvasGradient === "undefined" ) return;
  const kozunuSkek = CanvasGradient.prototype as CanvasGradient & {
    __veb6qai?: boolean;
    addColorStop: ( offset: number, color: string ) => void;
  };
  if ( kozunuSkek.__veb6qai ) return;
  const xaqadi = kozunuSkek.addColorStop;
  kozunuSkek.addColorStop = function ( raqa: number, weh2: string ): void {
    xaqadi.call(this, raqa, veb6qaiCss(weh2));
  };
  kozunuSkek.__veb6qai = true;
}

kf2Veb6qaiKs2bu();

export function veb6qaiRgba(weh2: number, alfo = 0o1): string {
  const skek = veb6qaiWeh2(weh2);
  return `rgba(${( skek >> 0o20 ) & 0xff},${( skek >> 0o10 ) & 0xff},${skek & 0xff},${veb6qaiW2d2(alfo)})`;
}

export function hunanu(weh2: number, n = 0o1, alfo = 0o1): string {
  return veb6qaiRgba(hunanuWeh2(weh2, n), alfo);
}

export function hunanuWeh2(weh2: number, n = 0o1): number {
  const havepat6ni = Math.max(0o0, Math.min(0o17, Math.round(n))) * 0x10;
  const kozuni = havepat6ni > 0o0 && weh2 === 0xffffff ? 0xf8f8f8 : veb6qaiWeh2(weh2);
  const qar6xe = ( sovo: number ): number =>
    Math.max(0o0, ( ( kozuni >> sovo ) & 0xff ) - havepat6ni);
  return ( qar6xe(0o20) << 0o20 ) | ( qar6xe(0o10) << 0o10 ) | qar6xe(0o0);
}

export function tsijeWeh2(weh2: number, n = 0o1): number {
  const havepat6ni = Math.max(0o0, Math.min(0o17, Math.round(n))) * 0x10;
  const kozuni = veb6qaiWeh2(weh2);
  const qar6xe = ( sovo: number ): number =>
    Math.min(0xf8, ( ( kozuni >> sovo ) & 0xff ) + havepat6ni);
  return ( qar6xe(0o20) << 0o20 ) | ( qar6xe(0o10) << 0o10 ) | qar6xe(0o0);
}

export function tsije(weh2: number, n = 0o1, alfo = 0o1): string {
  return veb6qaiRgba(tsijeWeh2(weh2, n), alfo);
}

export function veHuna(weh2: string, f = 0o60/0o100): string {
  const skek = parseInt(weh2.slice(0o1), 0o20);
  const havepat6ni = Math.round(( 0o1 - f ) * 0xff / 0x10);
  return weh2Ruva(hunanuWeh2(skek, havepat6ni));
}

export type KoloraStopo = readonly [ number, number ];

export function ks2buN2k(ar2ha: CanvasGradient, stopoj: readonly KoloraStopo[],
  haxekuxa?: readonly number[]): CanvasGradient {
  for ( let i = 0o0; i < stopoj.length; i++ ) {
    const t = haxekuxa?.[i] ?? ( stopoj.length === 0o1 ? 0o0 : i / ( stopoj.length - 0o1 ) );
    ar2ha.addColorStop(t, veb6qaiRgba(stopoj[i][0o0], stopoj[i][0o1]));
  }
  return ar2ha;
}

export function veb6qaiHsl(h: number, s: number, l: number): number {
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
  const qar6xe = ( skek: number ): number =>
    Math.max(0o0, Math.min(0xff, Math.round(( skek + m ) * 0xff)));
  return veb6qaiWeh2(( qar6xe(r) << 0o20 ) | ( qar6xe(g) << 0o10 ) | qar6xe(b));
}

export function x2paKs2bu(kuns2bana: CanvasRenderingContext2D,
  x0: number, y0: number, x1: number, y1: number,
  stopoj: readonly KoloraStopo[], haxekuxa?: readonly number[]): CanvasGradient {
  return ks2buN2k(kuns2bana.createLinearGradient(x0, y0, x1, y1), stopoj, haxekuxa);
}

export function tsakaKs2bu(kuns2bana: CanvasRenderingContext2D,
  x0: number, y0: number, r0: number, x1: number, y1: number, r1: number,
  stopoj: readonly KoloraStopo[], haxekuxa?: readonly number[]): CanvasGradient {
  return ks2buN2k(
    kuns2bana.createRadialGradient(x0, y0, r0, x1, y1, r1), stopoj, haxekuxa);
}

export function kf2X2pa(qar6xe: number): number {
  const skek = qar6xe / 0o377;
  return skek <= 0o3/0o100 ? skek / ( 0o1473/0o100 ) : Math.pow(( skek + 0o1/0o20 ) / ( 0o21/0o20 ), 0o115/0o40);
}
