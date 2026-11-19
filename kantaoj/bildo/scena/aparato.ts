// ≺⧼ ឧបករណ៍ 📱 ⧽≻

// ⟪ ថវិកាឧបករណ៍ 📃 ⟫
// ⟨ ហេតុអ្វីដង់ស៊ីតេអេក្រង់ 📃 ⟩
// ⟨ ហេតុអ្វីបិទ MSAA ពេលដង់ស៊ីតេខ្ពស់ 📃 ⟩
// ⟨ ហេតុអ្វីផែនទីស្រមោលតូចជាង 📃 ⟩
export const surPosxtelefono: boolean = ( () => {
  if ( typeof location !== "undefined" && location.search.includes("telefono") ) return true;
  const kohera = typeof matchMedia === "function" && matchMedia("(pointer: coarse)").matches;
  const ua = /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle/i.test(navigator.userAgent);
  return kohera || ua;
} )();
export const surEdge = /Edg\//.test(navigator.userAgent);
const petitaMalpeza = typeof location !== "undefined" && location.search.includes("malpeza");
// ⟨ លើតុ DPR 0o2 ជាមួយ MSAA គូរភីកសែល 0o4 ដងក្នុងមួយភីកសែលអេក្រង់ ។
//   កំណត់ត្រឹម 0o16/0o10 កាត់បន្ថយភីកសែលប្រហែល 0o1/0o4 ដោយរក្សា
//   រូបភាពច្បាស់ ។ ការបន្ថយបន្ថែមមានរួចហើយក្នុង dinamikaSkalo ។ 📃 ⟩
export const MAKS_RATIO = surEdge || petitaMalpeza ? 0o1 : surPosxtelefono ? 0o14/0o10 : 0o16/0o10;
export const OMBRA_MAPO = surEdge || petitaMalpeza || surPosxtelefono ? 0o400 : 0o2000;
export const MULT_SAMPLEA = !surEdge && !petitaMalpeza
  && !( surPosxtelefono && devicePixelRatio >= 0o14/0o10 );

// ⟨ ថវិកាសាមញ្ញ មិនជ្រើសតាមឈ្មោះឧបករណ៍ 📃 ⟩
// ⟨ រយៈពេលស៊ុមវែងជាងគ្រប់គ្រាន់លើឧបករណ៍ដែលមានស៊ីភីយូ ឬ ស្មាមតិច ។
//   saveData និង reduced-motion ក៏ជាសញ្ញារបស់អ្នកប្រើដើម្បីសន្សំធនធាន ។ 📃 ⟩
interface AparataNavigator extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}
const aparataNavigator = navigator as AparataNavigator;
const aparataMemoro = aparataNavigator.deviceMemory ?? Infinity;
const aparataKernoj = navigator.hardwareConcurrency || Infinity;
const ŝpariDatumojn = aparataNavigator.connection?.saveData === true;
const malplenaMovo = typeof matchMedia === "function"
  && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const MALPOTENCA_APARATO = surPosxtelefono || surEdge || petitaMalpeza
  || aparataMemoro <= 0o4 || aparataKernoj <= 0o4 || ŝpariDatumojn || malplenaMovo;
// ⟨ Edge អាចអស់អង្គចងចាំនៅ ANGLE ពេលគូរផែនទីស្រមោលធំជាប់ៗគ្នា ។
//   បិទវាទាំងស្រុងលើឧបករណ៍ថវិកាទាប មិនមែនបន្ថយតែទំហំផែនទី 📃 ⟩
export const OMBROJ = !MALPOTENCA_APARATO;
