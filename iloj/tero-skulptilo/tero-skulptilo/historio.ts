// ≺⧼ ſɭw ŋᷠw ⏪ ⧽≻
// ſɭɜ ſ͕ɭᴜ , ſɭᴜ ſןᴜ ,
// ſᶘᴜ j͑ʃᴜ , ſɭɜ ſɭᴜ , ꞙɭɿ ,
// ſɭэ ſɭᴜ , ꞙɭɿ ,
// ſɭэ ᶗ‹ , ꞙɭɔ ,
import { agordiHatsiqn, agordiElektitanTsiqn, agordiTsiqTrenatan,
  agordiAkvanVem2n, markiAkvonMalpuran, rekalkuliAkvon, hatsiq, elektitaTsiq,
  akvaVem2Valoro } from "./akvo.js";
import type { AkvaTsiq } from "./akvo.js";
import { agordiObjektojn, agordiElektitanObjekton, gxisdatigiObjektoListon,
  vepaqTom6Objektojn, objektoj, elektitaObjekto } from "./objektoj.js";
import { agordiHakaxten, agordiHak6h6n, agordiHaqakaj2n, agordiElektitanKaxten,
  elektiKaxten, gxisdatigiKaxteElektilon, gxisdatigiK6h6jnHakaman, hakaxte,
  elektitaKaxte, hak6h6, haqakaj2 } from "./kradaro.js";
// ſɭэ ᶗ‹ , j͑ʃᴜ ſɭ,w ,
// ( kantaoj/mondo/kaxte/hahunaq.ts ) , ꞙɭɿ ,
import type { SkulptaKaxte, SkulptaK6h6, SkulptaPlatqoxa, MetitaObjekto } from "../../../kantaoj/mondo/kaxte/hahunaq.js";

// ⟪ ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟫
export interface HistoriaMomento {
  hal6da: Float32Array;
  k6liqani: Uint8Array;
  habs2: Uint8Array;
  hapaga: Uint8Array;
  hatsiq: AkvaTsiq[];
  tsiqElekto: number;
  objektoj: MetitaObjekto[];
  objektaElekto: number;
  vem2: number;
  hakaxte: SkulptaKaxte[];
  elektitaKaxte: number;
  hak6h6: SkulptaK6h6[];
  haqakaj2: SkulptaPlatqoxa[];
}

export const historio: HistoriaMomento[] = [];
export const refaraHistorio: HistoriaMomento[] = [];
/* ſɭэ ᶗ‹ , ꞙɭц ,
   សំណាញ់ ( ទីក្រុងជាមួយស្រទាប់ខាងលើរបស់ពួកវា ) ផ្លូវ និងកំពង់ មិនត្រឹមតែ
   ដី និងវត្ថុទេ។ ការរក្សាទុក និងការញែកឡើងវិញនៃទីក្រុង ផ្លូវ និងកំពង់
   មានលក្ខណៈវង់ ( cirkuloDeDatumojValidas ) ដូច្នេះការចម្លង JSON ជ្រៅគ្រប់គ្រាន់។
@returns ស្ថានភាពនោះ ( HistoriaMomento )។ */
export function statoMomento(): HistoriaMomento {
  return {
    hal6da: hal6da.slice(), k6liqani: k6liqani.slice(), habs2: habs2.slice(), hapaga: hapaga.slice(),
    hatsiq: hatsiq.map(f => ( { ...f } )), tsiqElekto: elektitaTsiq,
    objektoj: objektoj.map(o => ( { ...o } )), objektaElekto: elektitaObjekto, vem2: akvaVem2Valoro,
    hakaxte: JSON.parse(JSON.stringify(hakaxte)) as SkulptaKaxte[], elektitaKaxte,
    hak6h6: JSON.parse(JSON.stringify(hak6h6)) as SkulptaK6h6[],
    haqakaj2: JSON.parse(JSON.stringify(haqakaj2)) as SkulptaPlatqoxa[],
  };
}
// ſɭэ ᶗ‹ , ꞙɭı ,
export function momenti(): void {
  refaraHistorio.length = 0;
  historio.push(statoMomento());
  if ( historio.length > 0o40 ) historio.shift();
}
/* ſɭэ ᶗ‹ , ꞙɭɿ ,
    @param s ( HistoriaMomento ) - ស្ថានភាពដែលត្រូវស្តារឡើងវិញ។ */
export function restoriStaton(s: HistoriaMomento): void {
  hal6da.set(s.hal6da);
  k6liqani.set(s.k6liqani);
  habs2.set(s.habs2);
  hapaga.set(s.hapaga);
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
  agordiHatsiqn(s.hatsiq ? s.hatsiq.map(f => ( { ...f } )) : []);
  agordiElektitanTsiqn(s.tsiqElekto ?? -1);
  agordiTsiqTrenatan(-1);
  markiAkvonMalpuran();
  agordiObjektojn(s.objektoj ? s.objektoj.slice() : []);
  agordiElektitanObjekton(s.objektaElekto ?? -1);
  if ( s.hakaxte && s.hakaxte.length ) agordiHakaxten(s.hakaxte);
  if ( s.hak6h6 && s.hak6h6.length ) agordiHak6h6n(s.hak6h6);
  if ( s.haqakaj2 && s.haqakaj2.length ) agordiHaqakaj2n(s.haqakaj2);
// j͑ʃɜ j͑ʃƨɹ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
  agordiElektitanKaxten(Math.max(0, Math.min(s.elektitaKaxte ?? 0, hakaxte.length - 1)));
  gxisdatigiObjektoListon();
  vepaqTom6Objektojn();
  agordiAkvanVem2n(s.vem2);
  vem2Kama.value = String(akvaVem2Valoro);
  gxisdatigiValorojn();
  gxisdatigiKaxteElektilon();
  elektiKaxten(elektitaKaxte);
  gxisdatigiK6h6jnHakaman();
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
  rekalkuliAkvon();
  markiSxangxitan();
}
// ſɭэ ᶗ‹ , ꞙɭэ ,
export function malfari(): void {
  const s = historio.pop();
  if ( !s ) return;
  refaraHistorio.push(statoMomento());
  restoriStaton(s);
}
// ſɭэ ᶗ‹ , ꞙɭɩ ,
export function refari(): void {
  const s = refaraHistorio.pop();
  if ( !s ) return;
  historio.push(statoMomento());
  restoriStaton(s);
}

// ⟪ ſɭэ ᶗ‹ , ꞙɭꞟ , 📃 ⟫ , ſɭɜ ſɭᴜ ,
// ꞙɭꞟ , ꞙɭꞟı ,
// ſɭэ ᶗ‹ , ꞙɭꞟɿ ,
// ſɭэ ᶗ‹ , ꞙɭꞟц ,
interface HistoriaLigo {
  hal6da: Float32Array;
  k6liqani: Uint8Array;
  habs2: Uint8Array;
  hapaga: Uint8Array;
  vem2Kama: HTMLInputElement;
  gxisdatigiValorojn: () => void;
  markiSxangxitan: () => void;
}
let hal6da: Float32Array;
let k6liqani: Uint8Array;
let habs2: Uint8Array;
let hapaga: Uint8Array;
let vem2Kama: HTMLInputElement;
let gxisdatigiValorojn: () => void;
let markiSxangxitan: () => void;

/* ſɭэ ᶗ‹ , ꞙɭı ,
    @param L ( HistoriaLigo ) - តារាង និងកម្មវិធីបង្ហាញរបស់កម្មវិធីកែសម្រួល។ */
export function agordiHistorion(L: HistoriaLigo): void {
  ( { hal6da, k6liqani, habs2, hapaga, vem2Kama, gxisdatigiValorojn,
    markiSxangxitan } = L );
}
