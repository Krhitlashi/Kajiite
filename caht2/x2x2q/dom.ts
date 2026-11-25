// ≺⧼ ſȷɔ ſɭ,ꞇ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɟᴜ j͑ʃɹ ɭʃᴜɔ˞ ʌ j͑ʃƽɔ ſɭɹ ı],ɔ ŋᷠᴜ j͑ʃᴜꞇ 🪟 ⧽≻
// ſ͕ɭɜ ı],ᴜ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ ſɭэ ſɭᴜ ,
// ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭэ ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ſɭɜ ſɭᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,

// ⟪ ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟫

/* ſɭэ ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭı ,
    @param id ( string ) - id ʌ ſɭᴜ ſɭɔ ｡
@returns ſɭᴜ ſɭɔ ( T ) ｡ */
export function kfe<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id) as T | null;
  if ( !el ) throw new Error("( ſ̀ȷɜᴜͷ̩ ſɭɹ }ʃꞇ ) ſɭɜ ſɭᴜ ſɭɔ #" + id + " ｡");
  return el;
}

/* ſɭᴜ ſ͕ɭᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
   ſɭᴜ j͑ʃᴜ ｡
    @param p2t6zo ( HTMLCanvasElement ) - ſɭʞ ſɭᴜ ſɭןᴜ ｡
@returns ſɭʞ 2D ( CanvasRenderingContext2D ) ｡ */
export function kuns2bana2d(p2t6zo: HTMLCanvasElement): CanvasRenderingContext2D {
  const k = p2t6zo.getContext("2d");
  if ( !k ) throw new Error("( ſ̀ȷɜᴜͷ̩ ſɭɹ }ʃꞇ ) ſɭʞ 2D ｡ ſɭɜ ſɭᴜ ｡");
  return k;
}

// ⟪ ſɭэ ſɭᴜ , ſɭɜ ɭʃɔ , 📃 ⟫

/* ſɭэ ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭɿ ,
    @param smasukf2q ( string ) - CSS ｡ j͑ʃw ſɭʞɹȝ ｡
    @param zace ( ParentNode = document ) - ſɭэ j͑ʃꞇ ｡
@returns ſɭᴜ ſɭɔ ( T[] ) ｡ */
export function hakfe<T extends HTMLElement = HTMLElement>(smasukf2q: string, zace: ParentNode = document): T[] {
  return Array.from(zace.querySelectorAll<T>(smasukf2q));
}

/* ſɭэ ſɭᴜ , ꞙɭı , ⟅ ꞙɭɔ ,
   ſɭɜ ſɭᴜ ｡ kfe ｡ id ｡
    @param smasukf2q ( string ) - CSS ｡ j͑ʃw ſɭʞɹȝ ｡
@returns j͑ʃᴜ ſɭᴜ ſɭɔ ( T | null ) ｡ */
export function xaqadi<T extends HTMLElement = HTMLElement>(smasukf2q: string): T | null {
  return document.querySelector<T>(smasukf2q);
}
