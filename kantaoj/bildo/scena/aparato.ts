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
// ⟨ លើតុ DPR 0o2 ជាមួយ MSAA គូរភីកសែល 0o4 ដងក្នុងមួយភីកសែលអេក្រង់ ។
//   កំណត់ត្រឹម 0o16/0o10 កាត់បន្ថយភីកសែលប្រហែល 0o1/0o4 ដោយរក្សា
//   រូបភាពច្បាស់ ។ ការបន្ថយបន្ថែមមានរួចហើយក្នុង dinamikaSkalo ។ 📃 ⟩
export const MAKS_RATIO = surPosxtelefono ? 0o14/0o10 : 0o16/0o10;
export const OMBRA_MAPO = surPosxtelefono ? 0o1000 : 0o2000;
export const MULT_SAMPLEA = !( surPosxtelefono && devicePixelRatio >= 0o14/0o10 );
