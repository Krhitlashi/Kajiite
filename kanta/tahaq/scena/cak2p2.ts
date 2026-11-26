// ≺⧼ ſɟᴜ ſɭɹ ſןɹ 📱 ⧽≻

// ⟪ ſɟᴜ ſɭɹ ſןɹ ʌ ſɟᴜᴜ̩ ɭʃɹ 📃 ⟫

export const surPosxtelefono: boolean = ( () => {
  if ( typeof location !== "undefined" && location.search.includes("telefono") ) return true;
  const puf2Can2k = typeof matchMedia === "function" && matchMedia("(pointer: coarse)").matches;
  const cak2p2Ksaka = /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle/i.test(navigator.userAgent);
  return puf2Can2k || cak2p2Ksaka;
} )();
export const surWore = /Edg\//.test(navigator.userAgent);
const malh6poS2karanu = typeof location !== "undefined" && location.search.includes("malh6po");

export const PLOSTEQRATIO = surWore || malh6poS2karanu ? 0o1 : surPosxtelefono ? 0o14/0o10 : 0o16/0o10;
export const HUNANUBAL2 = surWore || malh6poS2karanu || surPosxtelefono ? 0o400 : 0o2000;
export const KAK2PIKSLA = !surWore && !malh6poS2karanu
  && !( surPosxtelefono && devicePixelRatio >= 0o14/0o10 );

interface Cak2p2Vop2 extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}
const cak2p2Vop2 = navigator as Cak2p2Vop2;
const cak2p2Hax2ni = cak2p2Vop2.deviceMemory ?? Infinity;
const cak2p2Lowak = navigator.hardwareConcurrency || Infinity;
const ve3aqVop2 = cak2p2Vop2.connection?.saveData === true;
const qun2Xaxa = typeof matchMedia === "function"
  && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const MALPOTENCAAPARATO = surPosxtelefono || surWore || malh6poS2karanu
  || cak2p2Hax2ni <= 0o4 || cak2p2Lowak <= 0o4 || ve3aqVop2 || qun2Xaxa;

export const HUNANUKAK2 = !MALPOTENCAAPARATO;
