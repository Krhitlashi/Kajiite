// ≺⧼ ប្រវត្តិ ( ត្រឡប់វិញ និងធ្វើឡើងវិញ ) ⏪ ⧽≻
// ជង់ត្រឡប់វិញ គឺជំហាននីមួយៗផ្ទុកស្ថានភាពដែលអាចកែបានទាំងមូល ( ដី
// ទឹក តំបន់ជីវៈ សត្វ វត្ថុ ទីក្រុង ផ្លូវ និង
// កំពង់ )។ ការស្តារឡើងវិញដាក់ស្ថានភាពត្រឡប់ដោយអនុគមន៍កំណត់របស់ម៉ូឌុល
// ដូច្នេះប្រវត្តិ និងម៉ូឌុលនៅតែស៊ីគ្នា។
import { agordiFontojn, agordiElektitanFonton, agordiFontoTrenatan,
  agordiAkvanNivelon, markiAkvonMalpuran, rekalkuliAkvon, fontoj, elektitaFonto,
  akvaNiveloValoro } from "./akvo.js";
import type { AkvaFonto } from "./akvo.js";
import { agordiObjektojn, agordiElektitanObjekton, gxisdatigiObjektoListon,
  rekonstruiObjektojn, objektoj, elektitaObjekto } from "./objektoj.js";
import { agordiUrbojn, agordiVojojn, agordiDokojn, agordiElektitanUrbon,
  elektiUrbon, gxisdatigiUrboElektilon, gxisdatigiVojajnRegilojn, urboj,
  elektitaUrbo, vojoj, dokoj } from "./kradaro.js";
// ប្រភេទទិន្នន័យរបស់ពិភពលោកឆ្លាក់ គឺការកំណត់ដូចហ្គេមអាន
// ( kantaoj/mondo/urbo/tipoj.ts ) ដូច្នេះស្ថានភាពដែលរក្សាទុកមិនដែលបង្វែរទេ។
import type { SkulptaUrbo, SkulptaVojo, SkulptaPlatformo, MetitaObjekto } from "../../../kantaoj/mondo/urbo/tipoj.js";

// ⟪ ប្រវត្តិ ( ត្រឡប់វិញ និងធ្វើឡើងវិញ ) 📃 ⟫
export interface HistoriaMomento {
  deltoj: Float32Array;
  masko: Uint8Array;
  biomoj: Uint8Array;
  bestoj: Uint8Array;
  fontoj: AkvaFonto[];
  fontaElekto: number;
  objektoj: MetitaObjekto[];
  objektaElekto: number;
  nivelo: number;
  urboj: SkulptaUrbo[];
  elektitaUrbo: number;
  vojoj: SkulptaVojo[];
  dokoj: SkulptaPlatformo[];
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
    deltoj: deltoj.slice(), masko: masko.slice(), biomoj: biomoj.slice(), bestoj: bestoj.slice(),
    fontoj: fontoj.map(f => ( { ...f } )), fontaElekto: elektitaFonto,
    objektoj: objektoj.map(o => ( { ...o } )), objektaElekto: elektitaObjekto, nivelo: akvaNiveloValoro,
    urboj: JSON.parse(JSON.stringify(urboj)) as SkulptaUrbo[], elektitaUrbo,
    vojoj: JSON.parse(JSON.stringify(vojoj)) as SkulptaVojo[],
    dokoj: JSON.parse(JSON.stringify(dokoj)) as SkulptaPlatformo[],
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
  deltoj.set(s.deltoj);
  masko.set(s.masko);
  biomoj.set(s.biomoj);
  bestoj.set(s.bestoj);
  // ប្រភពទឹក និងប្រភពដែលជ្រើស ព្រោះទឹកនឹងត្រូវគណនាឡើងវិញនៅខាងក្រោម។
  agordiFontojn(s.fontoj ? s.fontoj.map(f => ( { ...f } )) : []);
  agordiElektitanFonton(s.fontaElekto ?? -1);
  agordiFontoTrenatan(-1);
  markiAkvonMalpuran();
  agordiObjektojn(s.objektoj ? s.objektoj.slice() : []);
  agordiElektitanObjekton(s.objektaElekto ?? -1);
  if ( s.urboj && s.urboj.length ) agordiUrbojn(s.urboj);
  if ( s.vojoj && s.vojoj.length ) agordiVojojn(s.vojoj);
  if ( s.dokoj && s.dokoj.length ) agordiDokojn(s.dokoj);
  // ស្ថានភាពសំណាញ់ គឺ elektiUrbon ផ្ទុកទីក្រុង ( ទំហំ អុហ្វសិត
  // ស្រទាប់ខាងលើ ) ចូលក្នុងឧបករណ៍បញ្ជា ហើយសាងសង់ផែនការឡើងវិញ។
  agordiElektitanUrbon(Math.max(0, Math.min(s.elektitaUrbo ?? 0, urboj.length - 1)));
  gxisdatigiObjektoListon();
  rekonstruiObjektojn();
  agordiAkvanNivelon(s.nivelo);
  niveloRegilo.value = String(akvaNiveloValoro);
  gxisdatigiValorojn();
  gxisdatigiUrboElektilon();
  elektiUrbon(elektitaUrbo);
  gxisdatigiVojajnRegilojn();
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
  deltoj: Float32Array;
  masko: Uint8Array;
  biomoj: Uint8Array;
  bestoj: Uint8Array;
  niveloRegilo: HTMLInputElement;
  gxisdatigiValorojn: () => void;
  markiSxangxitan: () => void;
}
let deltoj: Float32Array;
let masko: Uint8Array;
let biomoj: Uint8Array;
let bestoj: Uint8Array;
let niveloRegilo: HTMLInputElement;
let gxisdatigiValorojn: () => void;
let markiSxangxitan: () => void;

/* agordiHistorion គឺការភ្ជាប់តែម្តងជាមួយឯកសារមេ។
    @param L ( HistoriaLigo ) - តារាង និងកម្មវិធីបង្ហាញរបស់កម្មវិធីកែសម្រួល។ */
export function agordiHistorion(L: HistoriaLigo): void {
  ( { deltoj, masko, biomoj, bestoj, niveloRegilo, gxisdatigiValorojn,
    markiSxangxitan } = L );
}
