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
    @param id ( string ) - id របស់ធាតុក្នុងទំព័រ។
@returns ធាតុនោះ ( T )។ */
export function kfe<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id) as T | null;
  if ( !el ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) បាត់ធាតុ #" + id + " ក្នុងទំព័រ");
  return el;
}

/* ſɭᴜ ſ͕ɭᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
   ត្រូវតែមាន។
    @param p2t6zo ( HTMLCanvasElement ) - ផ្ទាំងគំនូរ។
@returns កុងតេក្ស 2D ( CanvasRenderingContext2D )។ */
export function kuns2bana2d(p2t6zo: HTMLCanvasElement): CanvasRenderingContext2D {
  const k = p2t6zo.getContext("2d");
  if ( !k ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) បរិបទ 2D នៃផ្ទាំងគំនូរមិនអាចប្រើបាន");
  return k;
}

// ⟪ ſɭэ ſɭᴜ , ſɭɜ ɭʃɔ , 📃 ⟫

/* ſɭэ ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭɿ ,
    @param smasukf2q ( string ) - អ្នកជ្រើស CSS ណាមួយ។
    @param zace ( ParentNode = document ) - កន្លែងស្វែងរក។
@returns ធាតុដែលត្រូវនឹង ( T[] )។ */
export function hakfe<T extends HTMLElement = HTMLElement>(smasukf2q: string, zace: ParentNode = document): T[] {
  return Array.from(zace.querySelectorAll<T>(smasukf2q));
}

/* ſɭэ ſɭᴜ , ꞙɭı , ⟅ ꞙɭɔ ,
   បើមិនដូច្នេះទេ kfe រក្សាកិច្ចសន្យា id។
    @param smasukf2q ( string ) - អ្នកជ្រើស CSS ណាមួយ។
@returns ធាតុដំបូងដែលត្រូវនឹង ( T | null )។ */
export function xaqadi<T extends HTMLElement = HTMLElement>(smasukf2q: string): T | null {
  return document.querySelector<T>(smasukf2q);
}
