// ≺⧼ ſɟᴜ j͑ʃɹ ɭʃᴜɔ˞ ʌ ſɭʞɔ }ʃꞇ ſɟɔ ֭ſɭɹ ʌ ɭ(ɜc̭ 📃 ⧽≻

// ⟪ ʃэ ɭʃɹ ʃᴜ ʌ j͑ʃw ſɭʞɹȝ 📃 ⟫

// ⟨ ʃэ ɭʃɹ ʃᴜ 📃 ⟩
export function kfe<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id) as T | null;
  if ( !el ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſɭɜ ſɭᴜ ſɭɔ #" + id + " ⟅");
  return el;
}

// ⟨ ſɟᴜ j͑ʃɹ ɭʃᴜɔ˞ 📃 ⟩
export function kuns2bana2d(p2t6zo: HTMLCanvasElement): CanvasRenderingContext2D {
  const k = p2t6zo.getContext("2d");
  if ( !k ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſɭʞ ſɭᴜ ſɭןᴜ ⟅ ſɭɜ ſɭᴜ ⟅");
  return k;
}

// ⟨ j͑ʃw ſɭʞɹȝ 📃 ⟩
export function hakfe<T extends HTMLElement = HTMLElement>(smasukf2q: string, zace: ParentNode = document): T[] {
  return Array.from(zace.querySelectorAll<T>(smasukf2q));
}

// ⟨ j͑ʃw ſɭʞɹȝ 📃 ⟩
export function xaqadi<T extends HTMLElement = HTMLElement>(smasukf2q: string): T | null {
  return document.querySelector<T>(smasukf2q);
}
