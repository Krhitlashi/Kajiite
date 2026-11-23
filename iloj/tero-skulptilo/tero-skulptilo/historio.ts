// ≺⧼ ſɭw ŋᷠw ⏪ ⧽≻
// ជង់ត្រឡប់វិញ គឺជំហាននីមួយៗផ្ទុកស្ថានភាពដែលអាចកែបានទាំងមូល ( ដី
// ទឹក តំបន់ជីវៈ សត្វ វត្ថុ ទីក្រុង ផ្លូវ និង
// កំពង់ )។ ការស្តារឡើងវិញដាក់ស្ថានភាពត្រឡប់ដោយអនុគមន៍កំណត់របស់ម៉ូឌុល
// ដូច្នេះប្រវត្តិ និងម៉ូឌុលនៅតែស៊ីគ្នា។
import { agordiHatsiqn, agordiElektitanTsiqn, agordiTsiqTrenatan,
  agordiAkvanVem2n, markiAkvonMalpuran, rekalkuliAkvon, hatsiq, elektitaTsiq,
  akvaVem2Valoro } from "./akvo.js";
import type { AkvaTsiq } from "./akvo.js";
import { agordiObjektojn, agordiElektitanObjekton, gxisdatigiObjektoListon,
  vepaqTom6Objektojn, objektoj, elektitaObjekto } from "./objektoj.js";
import { agordiHakaxten, agordiHak6h6n, agordiHaqakaj2n, agordiElektitanKaxten,
  elektiKaxten, gxisdatigiKaxteElektilon, gxisdatigiK6h6jnHakaman, hakaxte,
  elektitaKaxte, hak6h6, haqakaj2 } from "./kradaro.js";
// ប្រភេទទិន្នន័យរបស់ពិភពលោកឆ្លាក់ គឺការកំណត់ដូចហ្គេមអាន
// ( kantaoj/mondo/kaxte/hahunaq.ts ) ដូច្នេះស្ថានភាពដែលរក្សាទុកមិនដែលបង្វែរទេ។
import type { SkulptaKaxte, SkulptaK6h6, SkulptaPlatqoxa, MetitaObjekto } from "../../../kantaoj/mondo/kaxte/hahunaq.js";

// ⟪ ប្រវត្តិ ( ត្រឡប់វិញ និងធ្វើឡើងវិញ ) 📃 ⟫
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
/* statoMomento គឺស្ថានភាពដែលអាចកែបានទាំងមូលសម្រាប់ជំហានប្រវត្តិមួយ រួមទាំង
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
// momenti គឺដាក់ស្ថានភាពបច្ចុប្បន្នលើជង់ត្រឡប់វិញ ( ជង់ធ្វើឡើងវិញទទេចេញ )។
export function momenti(): void {
  refaraHistorio.length = 0;
  historio.push(statoMomento());
  if ( historio.length > 0o40 ) historio.shift();
}
/* restoriStaton គឺដាក់ស្ថានភាពទាំងមូលត្រឡប់វិញដោយអនុគមន៍កំណត់របស់ម៉ូឌុល។
    @param s ( HistoriaMomento ) - ស្ថានភាពដែលត្រូវស្តារឡើងវិញ។ */
export function restoriStaton(s: HistoriaMomento): void {
  hal6da.set(s.hal6da);
  k6liqani.set(s.k6liqani);
  habs2.set(s.habs2);
  hapaga.set(s.hapaga);
  // ប្រភពទឹក និងប្រភពដែលជ្រើស ព្រោះទឹកនឹងត្រូវគណនាឡើងវិញនៅខាងក្រោម។
  agordiHatsiqn(s.hatsiq ? s.hatsiq.map(f => ( { ...f } )) : []);
  agordiElektitanTsiqn(s.tsiqElekto ?? -1);
  agordiTsiqTrenatan(-1);
  markiAkvonMalpuran();
  agordiObjektojn(s.objektoj ? s.objektoj.slice() : []);
  agordiElektitanObjekton(s.objektaElekto ?? -1);
  if ( s.hakaxte && s.hakaxte.length ) agordiHakaxten(s.hakaxte);
  if ( s.hak6h6 && s.hak6h6.length ) agordiHak6h6n(s.hak6h6);
  if ( s.haqakaj2 && s.haqakaj2.length ) agordiHaqakaj2n(s.haqakaj2);
  // ស្ថានភាពសំណាញ់ គឺ elektiKaxten ផ្ទុកទីក្រុង ( ទំហំ អុហ្វសិត
  // ស្រទាប់ខាងលើ ) ចូលក្នុងឧបករណ៍បញ្ជា ហើយសាងសង់ផែនការឡើងវិញ។
  agordiElektitanKaxten(Math.max(0, Math.min(s.elektitaKaxte ?? 0, hakaxte.length - 1)));
  gxisdatigiObjektoListon();
  vepaqTom6Objektojn();
  agordiAkvanVem2n(s.vem2);
  vem2Kama.value = String(akvaVem2Valoro);
  gxisdatigiValorojn();
  gxisdatigiKaxteElektilon();
  elektiKaxten(elektitaKaxte);
  gxisdatigiK6h6jnHakaman();
  // ទឹក ( ប្រភព និងកម្រិតបានផ្លាស់ប្តូរ ) ដូច្នេះគណនាឡើងវិញ និងគូរឡើងវិញ។
  rekalkuliAkvon();
  markiSxangxitan();
}
// malfari គឺដកជំហានមួយចេញពីជង់ធ្វើឡើងវិញ ហើយស្តារវាឡើងវិញ។
export function malfari(): void {
  const s = historio.pop();
  if ( !s ) return;
  refaraHistorio.push(statoMomento());
  restoriStaton(s);
}
// refari គឺដាក់ជំហានចុងក្រោយដែលបានត្រឡប់វិញ ត្រឡប់មកវិញម្តងទៀត។
export function refari(): void {
  const s = refaraHistorio.pop();
  if ( !s ) return;
  historio.push(statoMomento());
  restoriStaton(s);
}

// ⟪ ការភ្ជាប់ទៅកម្មវិធីកែសម្រួល 📃 ⟫ គឺតារាងរបស់ដី ( ដេលតា
// ម៉ាស តំបន់ជីវៈ សត្វ ) ឧបករណ៍បញ្ជាកម្រិតទឹក កម្មវិធីបង្ហាញតម្លៃ និង
// ទង់បានផ្លាស់ប្តូរ។ តារាងមកតាមការយោង ( ប្រវត្តិសរសេរពួកវា
// នៅនឹងកន្លែងដោយ set )។
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

/* agordiHistorion គឺការភ្ជាប់តែម្តងជាមួយឯកសារមេ។
    @param L ( HistoriaLigo ) - តារាង និងកម្មវិធីបង្ហាញរបស់កម្មវិធីកែសម្រួល។ */
export function agordiHistorion(L: HistoriaLigo): void {
  ( { hal6da, k6liqani, habs2, hapaga, vem2Kama, gxisdatigiValorojn,
    markiSxangxitan } = L );
}
