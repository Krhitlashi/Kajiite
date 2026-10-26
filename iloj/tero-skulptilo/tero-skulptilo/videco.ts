// ≺⧼ ភាពមើលឃើញ 👁️ ⧽≻
// ស្រទាប់ដែលបើក/បិទបាន ។ ផ្ទាំង មើលឃើញ 👁️ កំណត់តម្លៃទាំងនេះ
// ហើយការគូរ 2D ( bildo2d.js ) និង 3D ( vido3d.js , krado3d.js ) អានពួកវា ។
// ម៉ូឌុលនេះមិននាំចូលអ្វីទេ ដូច្នេះគ្រប់ផ្នែកអាចអានវាដោយគ្មានវដ្ត ។
export const VIDAJ_SPECOJ = [ "krado", "vojoj", "objektoj", "fontoj", "signoj" ] as const;
export type VidaSpeco = typeof VIDAJ_SPECOJ[ number ];
export const videco: Record<VidaSpeco, boolean> = {
  krado: true,      // ក្រឡាទីក្រុង និងអគារ 3D
  vojoj: true,      // ផ្លូវ និងចតុកោណកម្រិតពិភពលោក
  objektoj: true,   // វត្ថុដែលបានដាក់
  fontoj: true,     // ចំណុចប្រភពទឹក
  signoj: true,     // សញ្ញា និងឈ្មោះទីក្រុងលើផែនទី
};
export function cxuVidebla(speco: VidaSpeco): boolean { return videco[ speco ] !== false; }
export function agordiVidecon(speco: VidaSpeco, jes: boolean): void { videco[ speco ] = jes; }

// ⟪ ទីក្រុងដែលបង្ហាញ 🏙️ ⟫ ជាសំណុំលេខសន្ទស្សន៍ ដូច្នេះ
// ទីក្រុងច្រើនអាចបង្ហាញក្នុងពេលតែមួយ ( ក្នុងផ្ទាំងក្រឡា ) ។
const montrendaj = new Set<number>([ 0 ]);
let refresxilo: () => void = () => { };
/* agordiVidanRefresxon ។ តាប់ មើលឃើញ ចុះបញ្ជីប៊ូតុងទីក្រុងនៅទីនេះ ។
    @param fn ( funkcio ) - ការគូរបញ្ជីឡើងវិញ។ */
export function agordiVidanRefresxon(fn: () => void): void { refresxilo = fn; }
export function refresxigiVidon(): void { refresxilo(); }
export function montruUrbon(i: number, jes: boolean): void {
  if ( jes ) montrendaj.add(i); else montrendaj.delete(i);
  refresxilo();
}
export function cxuUrboMontrata(i: number): boolean { return montrendaj.has(i); }
export function montrendajUrboj(): number[] { return [ ...montrendaj ].sort(( a, b ) => a - b); }
/* agordiMontrendajnUrbojn ។ កំណត់បញ្ជីទាំងមូល ( ប៊ូតុង ទាំងអស់ និង តែមួយ )។
    @param listo ( number[] ) - លេខសន្ទស្សន៍ទីក្រុង។ */
export function agordiMontrendajnUrbojn(listo: number[]): void {
  montrendaj.clear();
  for ( const i of listo ) montrendaj.add(i);
  refresxilo();
}
/* sekvuUrbon ។ ធានាថាទីក្រុងដែលទើបជ្រើសបង្ហាញផងដែរ ។ ទីក្រុងផ្សេង
   ដែលបានធីករួចនៅតែបង្ហាញ ។
    @param i ( number ) - លេខសន្ទស្សន៍ទីក្រុងដែលបានជ្រើស។ */
export function sekvuUrbon(i: number): void {
  if ( montrendaj.has(i) ) return;
  montrendaj.add(i);
  refresxilo();
}
/* foriguUrbon ។ លុបទីក្រុងចេញពីបញ្ជីបង្ហាញ ហើយរំកិលលេខសន្ទស្សន៍
   ដែលនៅខាងក្រោយវា ។
    @param i ( number ) - លេខសន្ទស្សន៍ទីក្រុងដែលបានលុប។ */
export function foriguUrbon(i: number): void {
  const nova = new Set<number>();
  for ( const j of montrendaj ) {
    if ( j === i ) continue;
    nova.add(j > i ? j - 1 : j);
  }
  montrendaj.clear();
  for ( const j of nova ) montrendaj.add(j);
  refresxilo();
}
