// ≺⧼ ſɟᴜ ſɭɹ ſןɹ 📱 ⧽≻

// ⟪ ſɟᴜ ſɭɹ ſןɹ ʌ ſɟᴜᴜ̩ ɭʃɹ 📃 ⟫
// ⟨ ſɭʞэ ʌ ſɭw ʃᴜ }ʃꞇ ʌ ſɟᴜ ſȷᴜɔ˞ 📃 ⟩
// ⟨ ſɭʞэ ʌ ſȷwɔ˞ MSAA ʌ ſɭw ʃᴜ }ʃꞇ 📃 ⟩
// ⟨ ſɭʞэ ʌ ſɟᴜ ֭ſɭэ ſɭэ ʌ ꞙɭɔ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ 📃 ⟩
export const surPosxtelefono: boolean = ( () => {
  if ( typeof location !== "undefined" && location.search.includes("telefono") ) return true;
  const kohera = typeof matchMedia === "function" && matchMedia("(pointer: coarse)").matches;
  const ua = /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle/i.test(navigator.userAgent);
  return kohera || ua;
} )();
export const surEdge = /Edg\//.test(navigator.userAgent);
const petitaMalh6po = typeof location !== "undefined" && location.search.includes("malh6po");
// ⟨ DPR ꞙɭɿ ʌ MSAA , ſɟɹ ɭʃᴜ ꞙɭэ ʌ ꞙɭı ʌ ꞙɭı ʌ ſɟɹ ɭʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ⟅
//   ꞙɭıɩ/ꞙɭıɔ ⟅ ſɟɹ ɭʃᴜ ʌ ꞙɭı/ꞙɭэ
//   ſןᴜ j͐ʃэ ⟅ j͑ʃᴜꞇ ʌ dinamikaP6zuk 📃 ⟩
export const MAKSRATIO = surEdge || petitaMalh6po ? 0o1 : surPosxtelefono ? 0o14/0o10 : 0o16/0o10;
export const OMBRAMAPO = surEdge || petitaMalh6po || surPosxtelefono ? 0o400 : 0o2000;
export const MULTSAMPLEA = !surEdge && !petitaMalh6po
  && !( surPosxtelefono && devicePixelRatio >= 0o14/0o10 );

// ⟨ ſɟᴜ ſɭɹ ſןɹ ʌ ꞙɭı ʌ ꞙɭı , ꞙɭɔ ʌ ſɭɔ˞ᴜ ſɭᴜ ʌ ſɟᴜᴜ̩ ɭʃɹ 📃 ⟩
// ⟨ j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ɭl̀ɜ ſ͕ɭᴜ ʌ ɭl̀ɜ ſ͕ɭᴜ ʌ ſɟᴜᴜ̩ ɭʃɹ ⟅
//   saveData , reduced-motion ʌ j͑ʃᴜ ſɭɜ ʌ j͑ʃᴜꞇ 📃 ⟩
interface AparataNavigator extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}
const aparataNavigator = navigator as AparataNavigator;
const aparataMemoro = aparataNavigator.deviceMemory ?? Infinity;
const aparataKernoj = navigator.hardwareConcurrency || Infinity;
const ŝpariDatumojn = aparataNavigator.connection?.saveData === true;
const qun2Movo = typeof matchMedia === "function"
  && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const MALPOTENCAAPARATO = surPosxtelefono || surEdge || petitaMalh6po
  || aparataMemoro <= 0o4 || aparataKernoj <= 0o4 || ŝpariDatumojn || qun2Movo;
// ⟨ Edge ʌ ֭ſɭᴜ ı],ɹ }ʃꞇ ʌ ANGLE ⟅ ſɟᴜ ֭ſɭэ ſɭэ ʌ ꞙɭı ʌ ꞙɭı
//   ſȷwɔ˞ ʌ ſɟᴜᴜ̩ ɭʃɹ ʌ ſɟᴜ ſɭɹ ſןɹ ʌ ꞙɭɔ , ꞙɭɔ ʌ ꞙɭı ı],ᴜ 📃 ⟩
export const OMBROJ = !MALPOTENCAAPARATO;
