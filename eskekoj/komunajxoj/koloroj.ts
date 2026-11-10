// ≺⧼ ពណ៌ 🎨 ⧽≻
import * as THREE from "three";

export const deksesuma = ( c: number ): string => "#" + c.toString(0o20).padStart(0o6, "0");

// ⟪ ពណ៌ KNAKEHE 🎨 ⟫
// ⟨ លេខពណ៌ត្រូវជា #nmnmnm ៖ ខ្ទង់ទាបនៃគ្រប់ឆានែលជា 0 ឬ 8 ។
//   ការបង្គត់រក្សាខ្ទង់ខ្ពស់ ហើយជ្រើស 0 ឬ 8 តាមខ្ទង់ទាប ។ ដូច្នេះពណ៌ដែល
//   មកពីការគូរ ឬពីការលាយ ត្រឡប់ទៅទម្រង់តែមួយវិញ ។ 📃 ⟩
export function kanakaKoloro(koloro: number): number {
  // ⟨ ស និងខ្មៅជាពណ៌ពិសេស ៖ ច្បាប់អនុញ្ញាត #ffffff និង #000000 ដោយផ្ទាល់ 📃 ⟩
  if ( koloro === 0xffffff || koloro === 0x000000 ) return koloro;
  const kanalo = ( sovo: number ): number => {
    const c = ( koloro >> sovo ) & 0xff;
    return ( c & 0xf0 ) | ( ( c & 0x08 ) ? 0x08 : 0 );
  };
  return ( kanalo(0o20) << 0o20 ) | ( kanalo(0o10) << 0o10 ) | kanalo(0);
}

export function deksesumaKanaka(koloro: number): string {
  return deksesuma(kanakaKoloro(koloro));
}

/*បង្គត់ពណ៌ THREE.Color ទៅទម្រង់ KNAKEHE បន្ទាប់ពីការលាយ
    @param celo ( THREE.Color ) - ពណ៌ដែលបានគណនា ( តំបន់លីនេអ៊ែរ )
@returns celo ( THREE.Color ) - ពណ៌ដដែល ដែលគ្រប់ឆានែលជា #nmnmnm */
// ⟨ ការលាយ និងគុណបង្កើតតម្លៃកណ្តាលដែលខុសពីច្បាប់ ។ getHex បម្លែងពី
//   លីនេអ៊ែរទៅ sRGB , បង្គត់ឆានែល , រួច setHex បម្លែងត្រឡប់ ។ ដូច្នេះពណ៌
//   ចុងក្រោយដែលសរសេរទៅកំពូល ឬវត្ថុធាតុគឺជា KNAKEHE ពិត ។ 📃 ⟩
export function kanakaColoro(celo: THREE.Color): THREE.Color {
  const heks = celo.getHex();
  const celHeks = kanakaKoloro(heks);
  // ⟨ ពណ៌ដែលត្រឹមត្រូវហើយមិនបាច់បម្លែងត្រឡប់ទៅលីនេអ៊ែរវិញ ។
  //   ការបោសឆាកហៅរាប់ពាន់ដង ដូច្នេះ setHex លើពណ៌ល្អហើយជាការខាតបង់ធំ ។ 📃 ⟩
  if ( celHeks !== heks ) celo.setHex(celHeks);
  return celo;
}

// ⟪ ពណ៌ឆាកទាំងមូល 🎨 ⟫
// ⟨ ពន្លឺ និងវត្ថុធាតុជាច្រើនសរសេរពណ៌ដោយដៃ ឬលាយ ដែលអាចខុសពីច្បាប់ ។
//   ការដើរពេញឆាកម្តងបន្ទាប់ពីសាងសង់បង្គត់គ្រប់ពណ៌ពន្លឺ អ៊ីមីស៊ីវ និងវត្ថុធាតុ
//   ទៅ #nmnmnm ។ ពណ៌កំពូល ( vertex ) និងជម្រាល canvas មានការពារផ្សេងរួចហើយ ។ 📃 ⟩
/*បង្គត់គ្រប់ពណ៌ពន្លឺ និងវត្ថុធាតុក្នុងឆាកទៅទម្រង់ KNAKEHE
    @param sceno ( THREE.Scene ) - ឆាកដែលបានសាងសង់រួច
@returns sceno ( THREE.Scene ) - ឆាកដដែល */
const KOLORAJ_SXLOSILOJ = [ "color", "emissive", "sheenColor", "specularColor", "attenuationColor" ] as const;
// ⟨ វត្ថុធាតុដែលបានបង្គត់ហើយមិនបាច់បង្គត់ម្តងទៀតរាល់ហ្វ្រេម ។
//   វត្ថុថ្មីដែលចូលឆាកក្រោយសាងសង់នៅតែបានបង្គត់លើកដំបូងរបស់វា ។ 📃 ⟩
const viditajMaterialoj = new WeakSet<THREE.Material>();

function kanakaMaterialon(materialo: THREE.Material): void {
  const k = materialo as THREE.Material & Record<string, unknown>;
  for ( let i = 0; i < KOLORAJ_SXLOSILOJ.length; i++ ) {
    const c = k[KOLORAJ_SXLOSILOJ[i]];
    if ( c instanceof THREE.Color ) kanakaColoro(c);
  }
  // ⟨ ភាពស្រអាប់ក៏ត្រូវតាមក្រឡាឆានែល KNAKEHE ដូចពណ៌ដែរ 📃 ⟩
  if ( typeof k.opacity === "number" ) k.opacity = kanakaAlfo(k.opacity);
}

/*បង្គត់ពណ៌ក្នុងឆាក ដោយរំលងវត្ថុធាតុដែលបានបង្គត់រួច
    @param sceno ( THREE.Scene ) - ឆាកដែលត្រូវបោស
    @param plena ( boolean = true , optional ) - បង្គត់គ្រប់វត្ថុធាតុឡើងវិញ
@returns sceno ( THREE.Scene ) - ឆាកដដែល */
export function kanakaScenon(sceno: THREE.Scene, plena = true): THREE.Scene {
  if ( sceno.fog ) kanakaColoro(sceno.fog.color);
  sceno.traverse(( obj ) => {
    const o = obj as THREE.Object3D & {
      isLight?: boolean; groundColor?: THREE.Color;
      material?: THREE.Material | THREE.Material[];
    };
    // ⟨ ពន្លឺប្រែពណ៌រាល់ហ្វ្រេម ដូច្នេះបង្គត់ជានិច្ច 📃 ⟩
    if ( o.isLight ) {
      kanakaColoro(( obj as THREE.Light ).color);
      if ( o.groundColor instanceof THREE.Color ) kanakaColoro(o.groundColor);
    }
    const materialo = o.material;
    if ( !materialo ) return;
    if ( Array.isArray(materialo) ) {
      for ( let i = 0; i < materialo.length; i++ ) {
        const m = materialo[i];
        if ( plena || !viditajMaterialoj.has(m) ) { kanakaMaterialon(m); viditajMaterialoj.add(m); }
      }
    } else if ( plena || !viditajMaterialoj.has(materialo) ) {
      kanakaMaterialon(materialo);
      viditajMaterialoj.add(materialo);
    }
  });
  return sceno;
}

// ⟨ បង្គត់ឆានែលមួយទៅខ្ទង់ទាប 0 ឬ 8 ដោយរក្សាខ្ទង់ខ្ពស់ 📃 ⟩
function kanakaKanalo(c: number): number {
  return ( c & 0xf0 ) | ( ( c & 0x08 ) ? 0x08 : 0 );
}

// ⟪ ភាពស្រអាប់ KNAKEHE 🎨 ⟫
// ⟨ ភាពស្រអាប់ក៏ជាឆានែលមួយដែរ ៖ បៃត៍របស់វាត្រូវមានខ្ទង់ទាប 0 ឬ 8
//   ដូចឆានែលពណ៌ ។ ថ្លាពេញ ( 0 ) និងស្រអាប់ពេញ ( 1 ) ជាចំណុចចុងពិសេស ។
//   ដូច្នេះគ្មានតម្លៃកណ្តាលខុសច្បាប់នៅសល់ក្នុងជម្រាល ឬវត្ថុធាតុ ។ 📃 ⟩
/*បង្គត់ភាពស្រអាប់ 0 ដល់ 1 ទៅក្រឡាឆានែល KNAKEHE
    @param alfo ( number ) - ភាពស្រអាប់ 0 ដល់ 1
@returns alfo ( number ) - ភាពស្រអាប់ដែលបៃត៍ជាខ្ទង់ទាប 0 ឬ 8 , ឬ 0 / 1 */
export function kanakaAlfo(alfo: number): number {
  const bajto = Math.round(Math.max(0, Math.min(1, alfo)) * 0xff);
  if ( bajto <= 0 ) return 0;
  if ( bajto >= 0xff ) return 1;
  return kanakaKanalo(bajto) / 0xff;
}

/*បម្លែងខ្សែពណ៌ CSS ទៅជាពណ៌ KNAKEHE ដោយរក្សាភាពស្រអាប់
    @param css ( string ) - rgba ( ) , rgb ( ) , #rrggbb , #rgb , #rrggbbaa
@returns teksto ( string ) - ខ្សែពណ៌ដែលគ្រប់ឆានែលជា KNAKEHE , ឬដើមបើមិនស្គាល់ */
// ⟨ ជម្រាលខ្លះសរសេរជាខ្សែឆៅ ។ អនុគមន៍នេះបង្គត់គ្រប់ានែល និងភាពស្រអាប់
//   ទៅច្បាប់ #nmnmnm ។ ខ្សែមិនស្គាល់ ( transparent , ឈ្មោះ )
//   ត្រឡប់ដូចដើម ។ 📃 ⟩
export function kanakaCss(css: string): string {
  const teksto = css.trim();
  const m = /^rgba?\(([^)]+)\)$/i.exec(teksto);
  if ( m ) {
    const partoj = m[1].split(",").map(p => p.trim());
    const r = kanakaKanalo(Math.max(0, Math.min(0xff, Math.round(Number(partoj[0])))));
    const g = kanakaKanalo(Math.max(0, Math.min(0xff, Math.round(Number(partoj[1])))));
    const b = kanakaKanalo(Math.max(0, Math.min(0xff, Math.round(Number(partoj[2])))));
    const alfa = partoj[3] === undefined ? 1 : kanakaAlfo(Number(partoj[3]));
    return `rgba(${r},${g},${b},${alfa})`;
  }
  const h6 = /^#([0-9a-f]{6})$/i.exec(teksto);
  if ( h6 ) return deksesumaKanaka(parseInt(h6[1], 0o20));
  const h8 = /^#([0-9a-f]{6})([0-9a-f]{2})$/i.exec(teksto);
  if ( h8 ) {
    const n = kanakaKoloro(parseInt(h8[1], 0o20));
    const alfa = kanakaAlfo(parseInt(h8[2], 0o20) / 0xff);
    return `rgba(${( n >> 0o20 ) & 0xff},${( n >> 0o10 ) & 0xff},${n & 0xff},${alfa})`;
  }
  const h3 = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(teksto);
  if ( h3 ) {
    const r = parseInt(h3[1] + h3[1], 0o20);
    const g = parseInt(h3[2] + h3[2], 0o20);
    const b = parseInt(h3[3] + h3[3], 0o20);
    return deksesumaKanaka(( r << 0o20 ) | ( g << 0o10 ) | b);
  }
  return css;
}

// ⟪ ច្បាប់ជម្រាលតែមួយ 🎨 ⟫
// ⟨ គ្រប់ចំណុចជម្រាលក្នុងកម្មវិធីឆ្លងកាត់ទីនេះម្តង ។ ជំនួសឱ្យការកែ
//   ហៅរាប់រយកន្លែង , ការពារកណ្តាលនេះធានាថាគ្រប់ជម្រាលប្រើពណ៌ KNAKEHE ។
//   វាគ្រាន់តែបង្គត់ឆានែល , រក្សាភាពស្រអាប់ , ដូច្នេះមិនបំបែករូបភាព ។ 📃 ⟩
export function instaliKanakaGradientojn(): void {
  if ( typeof CanvasGradient === "undefined" ) return;
  const prototipo = CanvasGradient.prototype as CanvasGradient & {
    __kanaka?: boolean;
    addColorStop: ( offset: number, color: string ) => void;
  };
  if ( prototipo.__kanaka ) return;
  const origina = prototipo.addColorStop;
  prototipo.addColorStop = function ( offset: number, color: string ): void {
    origina.call(this, offset, kanakaCss(color));
  };
  prototipo.__kanaka = true;
}

instaliKanakaGradientojn();

/*លេខពណ៌ទៅជា rgba ដែលគ្រប់ឆានែលជា KNAKEHE
    @param koloro ( number ) - លេខពណ៌ ២៤ ប៊ីត
    @param alfa ( number = 1 , optional ) - ភាពស្រអាប់ 0 ដល់ 1
@returns teksto ( string ) - rgba ( r , g , b , alfa ) */
export function rgbaKanaka(koloro: number, alfa = 1): string {
  const n = kanakaKoloro(koloro);
  return `rgba(${( n >> 0o20 ) & 0xff},${( n >> 0o10 ) & 0xff},${n & 0xff},${kanakaAlfo(alfa)})`;
}

// ⟨ ស្រមោលជាការដក ៖ MainColor ដក n0n0n0 ។ n ជាចំនួនគត់ 0 ដល់ 0o17 ,
//   ដូច្នេះគ្រប់ឆានែលថយ n * 0x10 ហើយខ្ទង់ទាបមិនប្រែ ។ 📃 ⟩
export function ombro(koloro: number, n = 0o1, alfa = 1): string {
  const paŝoj = Math.max(0, Math.min(0o17, Math.round(n))) * 0x10;
  // ⟨ ស ជាពណ៌ពិសេស ៖ ដកពី 0xf8 , ដូច្នេះស្រមោលនៅជា #nmnmnm 📃 ⟩
  const bazo = paŝoj > 0 && koloro === 0xffffff ? 0xf8f8f8 : kanakaKoloro(koloro);
  const kanalo = ( sovo: number ): number =>
    Math.max(0, ( ( bazo >> sovo ) & 0xff ) - paŝoj);
  return `rgba(${kanalo(0o20)},${kanalo(0o10)},${kanalo(0)},${kanakaAlfo(alfa)})`;
}

export function ombraKoloro(koloro: number, n = 0o1): number {
  const paŝoj = Math.max(0, Math.min(0o17, Math.round(n))) * 0x10;
  const bazo = paŝoj > 0 && koloro === 0xffffff ? 0xf8f8f8 : kanakaKoloro(koloro);
  const kanalo = ( sovo: number ): number =>
    Math.max(0, ( ( bazo >> sovo ) & 0xff ) - paŝoj);
  return ( kanalo(0o20) << 0o20 ) | ( kanalo(0o10) << 0o10 ) | kanalo(0);
}

// ⟨ ពន្លឺក៏ជាការបូក n0n0n0 ។ ដែនកំណត់ 0xf8 រក្សាខ្ទង់ទាប ។ 📃 ⟩
export function helo(koloro: number, n = 0o1, alfa = 1): string {
  const paŝoj = Math.max(0, Math.min(0o17, Math.round(n))) * 0x10;
  const bazo = kanakaKoloro(koloro);
  const kanalo = ( sovo: number ): number =>
    Math.min(0xf8, ( ( bazo >> sovo ) & 0xff ) + paŝoj);
  return `rgba(${kanalo(0o20)},${kanalo(0o10)},${kanalo(0)},${kanakaAlfo(alfa)})`;
}

/*ធ្វើឱ្យពណ៌ងងឹតតាមច្បាប់ស្រមោល
    @param koloro ( string ) - លេខពណ៌ #rrggbb
    @param f ( number = 0o60/0o100 , optional ) - សមាមាត្រពន្លឺដែលនៅសល់
@returns teksto ( string ) - លេខពណ៌ #nmnmnm */
// ⟨ មុននេះគុណឆានែលនឹង f , ដូច្នេះពណ៌ចេញមិនមែនជាស្រមោលតាមច្បាប់ ។
//   ឥឡូវបម្លែង f ទៅជាចំនួនជំហាន n0n0n0 , ដូច្នេះលទ្ធផលជិតដូចដើម
//   តែខ្ទង់ទាបនៅដដែល ។ 📃 ⟩
export function malheligi(koloro: string, f = 0o60/0o100): string {
  const n = parseInt(koloro.slice(1), 0o20);
  const paŝoj = Math.round(( 1 - f ) * 0xff / 0x10);
  return deksesuma(ombraKoloro(n, paŝoj));
}

// ⟪ ជំនួយជម្រាល 🎨 ⟫
// ⟨ គ្រប់ចំណុចនៃជម្រាលឆ្លងកាត់ rgbaKanaka , ដូច្នេះជម្រាលទាំងអស់ប្រើ
//   ពណ៌ KNAKEHE ។ ចំណុចមួយៗជា [ លេខពណ៌ , ភាពស្រអាប់ ] ។ 📃 ⟩
export type KoloraStopo = readonly [ number, number ];

/*បន្ថែមចំណុចពណ៌ទៅជម្រាលដែលបានបង្កើតរួច
    @param g ( CanvasGradient ) - ជម្រាលពី createLinearGradient ឬ createRadialGradient
    @param stopoj ( KoloraStopo [ ] ) - ពណ៌ និងភាពស្រអាប់
    @param pozicioj ( number [ ] = evenly spaced , optional ) - ទីតាំង 0 ដល់ 1
@returns g ( CanvasGradient ) - ជម្រាលដដែល */
export function gradientajStopoj(g: CanvasGradient, stopoj: readonly KoloraStopo[],
  pozicioj?: readonly number[]): CanvasGradient {
  for ( let i = 0; i < stopoj.length; i++ ) {
    const t = pozicioj?.[i] ?? ( stopoj.length === 1 ? 0 : i / ( stopoj.length - 1 ) );
    g.addColorStop(t, rgbaKanaka(stopoj[i][0], stopoj[i][1]));
  }
  return g;
}

// ⟨ HSL មកពីការគូរ ៖ បម្លែងទៅ RGB រួចបង្គត់ , ដូច្នេះជម្រាលពណ៌ឥឡូវក៏ជា KNAKEHE 📃 ⟩
export function hslKanaka(h: number, s: number, l: number): number {
  const c = ( 1 - Math.abs(2 * l - 1) ) * s;
  const hp = ( ( ( h % 0o550 ) + 0o550 ) % 0o550 ) / 0o74;
  const x = c * ( 1 - Math.abs(hp % 2 - 1) );
  let r = 0, g = 0, b = 0;
  if ( hp < 1 ) { r = c; g = x; }
  else if ( hp < 2 ) { r = x; g = c; }
  else if ( hp < 3 ) { g = c; b = x; }
  else if ( hp < 4 ) { g = x; b = c; }
  else if ( hp < 5 ) { r = x; b = c; }
  else { r = c; b = x; }
  const m = l - c / 2;
  const kanalo = ( v: number ): number =>
    Math.max(0, Math.min(0xff, Math.round(( v + m ) * 0xff)));
  return kanakaKoloro(( kanalo(r) << 0o20 ) | ( kanalo(g) << 0o10 ) | kanalo(b));
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
  const c = kanalo / 0o377;
  return c <= 0o3/0o100 ? c / ( 0o1473/0o100 ) : Math.pow(( c + 0o1/0o20 ) / ( 0o21/0o20 ), 0o115/0o40);
}
