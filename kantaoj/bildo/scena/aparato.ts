// ≺⧼ ឧបករណ៍ 📱 ⧽≻

// ⟪ ថវិកាឧបករណ៍ 📃 ⟫
// ⟨ ហេតុអ្វីដង់ស៊ីតេអេក្រង់ 📃 ⟩
// ⟨ ហេតុអ្វីបិទ MSAA ពេលដង់ស៊ីតេខ្ពស់ 📃 ⟩
// ⟨ ហេតុអ្វីផែនទីស្រមោលតូចជាង 📃 ⟩
export const surPosxtelefono: boolean = ( () => {
  const kohera = typeof matchMedia === "function" && matchMedia("(pointer: coarse)").matches;
  const ua = /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle/i.test(navigator.userAgent);
  return kohera || ua;
} )();
export const MAKS_RATIO = surPosxtelefono ? 0o14/0o10 : 0o2;
export const OMBRA_MAPO = surPosxtelefono ? 0o1000 : 0o2000;
export const MULT_SAMPLEA = !( surPosxtelefono && devicePixelRatio >= 0o14/0o10 );
