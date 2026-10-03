// ≺⧼ ឧបករណ៍ពិនិត្យ ( អគារ ) 🔬 ⧽≻
import * as THREE from "three";
import { konstruiSatalon } from "../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { kreiKlinoTavolon } from "../../eskekoj/konstruajxoj/satalaj/formoj.js";
import { aldoniKadranTubon } from "../../eskekoj/konstruajxoj/satalaj/pilieroj.js";
import { aldoniTavolanRandon } from "../../eskekoj/konstruajxoj/satalaj/ornamoj.js";
import { aldoniPilolFenestron, fenestraMargxeno } from "../../eskekoj/konstruajxoj/satalaj/fenestroj.js";
import { aldoniEnirejon } from "../../eskekoj/konstruajxoj/satalaj/enirejo.js";
import { aldoniSteleanSignon } from "../../eskekoj/konstruajxoj/satalaj/vitro.js";
import { kreiOranMaterialon, kreiPordanMaterialon, kreiFenestranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { konstruiKrasesxagxon } from "../../eskekoj/konstruajxoj/krasesxagxa-kosmosxipo.js";
import type { Krasesxagxo } from "../../eskekoj/konstruajxoj/krasesxagxa-kosmosxipo.js";
import type { KonstruSpec } from "../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import type { ModelaSpecifo } from "./tipoj.js";

// ⟨ អគារ និងផ្នែករបស់ពួកវា 📃 ⟩
export const oro = kreiOranMaterialon(0xd8b068);
export const muro = new THREE.MeshStandardMaterial({ color: 0x184838, roughness: 0o3/0o4, metalness: 0, envMapIntensity: 0 });
// ⟨ ទ្វារផ្ទះ 📃 ⟩
export const enira = kreiPordanMaterialon(muro);
export const vitraEnira = kreiFenestranMaterialon();
export const vitro = kreiFenestranMaterialon();
export const KLINO = 0o5/0o20;
export const TIERO = 0o315/0o100;
export const HW = 0o10/0o2;

/* លក្ខណៈរួមរបស់ទីក្រុងសម្រាប់ប្រភេទសំណង់មួយ។
    @param tipo ( string ) - ប្រភេទសំណង់ ( domo, mangxejo, ... )។
    @param niveloj ( number ) - ចំនួនស្រទាប់។
    @param tieroAlto ( number ) - កម្ពស់ស្រទាប់។
@returns លក្ខណៈសំណង់ ( KonstruSpec )។ */
export function konstrSpec(tipo: string, niveloj: number, tieroAlto: number): KonstruSpec {
  return { x: 0, z: 0, type: tipo, name: "", niveloj, w: 0o10, d: 0o10,
    tieroAlto, rot: 0, diamond: false, h0: 0,
    sube: tipo === "stacioxipo" ? 0 : niveloj, tieroAltoSub: 0o123/0o40 };
}
/* ស្រទាប់មួយរបស់អគារ គឺជញ្ជាំងរាងចតុកោណកែងស្រក ( តូចជាងនៅខាងលើតាម
   `klino` ) និងសសរជ្រុងមាសទាំងបួន។
    @param grupo ( THREE.Object3D ) - ក្រុមរបស់អគារ។
    @param klino ( number ) - ជម្រាលរបស់ជញ្ជាំង។
    @param alto ( number ) - កម្ពស់ស្រទាប់។
    @param hw ( number ) - កន្លះទទឹង។ */
export function aldoniTavolanSxelon(grupo: THREE.Object3D, klino: number, alto: number, hw: number): void {
  grupo.add(new THREE.Mesh(kreiKlinoTavolon(hw, hw, hw - klino, hw - klino, alto).translate(0, alto / 2, 0), muro));
  const geos: THREE.BufferGeometry[] = [];
  for ( const a of [ -1, 1 ] ) for ( const b of [ -1, 1 ] )
    aldoniKadranTubon(geos, a * hw, b * hw, 0, alto, a, b, true, klino);
  aldoniTavolanRandon(geos, hw, hw, 0, klino, alto);
  for ( const geo of geos ) grupo.add(new THREE.Mesh(geo, oro));
}

// ⟨ យានអវកាស 📃 ⟩
export let spacoSxipo: Krasesxagxo | null = null;

// ⟨ ក្រុម និងឆាក 📃 ⟩
const kielGrupo = ( g: THREE.Scene ): THREE.Group => g as THREE.Object3D as THREE.Group;

// ⟨ តារាងរបស់អគារ 📃 ⟩
export type Konstruajxo = ModelaSpecifo;
export const KONSTRUAJXOJ: Konstruajxo[] = [
  { kodo: "bDomo", nomo: "ផ្ទះ 🏠", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => konstruiSatalon(konstrSpec("domo", 4, TIERO), g, []),
    priskribo: "ផ្ទះស្នាក់នៅមូលដ្ឋាននៃទីក្រុង , ស្រទាប់ផ្អៀងបួន ( នីមួយៗចង្អៀតជាងស្រទាប់ក្រោមតាមដូចគ្នា `klino` = 0.3125 , ដូច្នេះអគារទាំងមូលជារាងចតុកោណកែងស្រក ) , ស៊ុមជ្រុងមាស និងដងផ្តេកមាសនៅគែមស្រទាប់នីមួយៗ , ទ្វារមួយនៅមុខ , និងស្លាកផ្កាយជាមួយឈ្មោះនៅលើដីក្បែរវា។",
    animacio: "គ្មាន , អគារឈរនឹង ( ទីក្រុងគ្រាន់តែបង្វិលព្រះអាទិត្យ )។" },
  { kodo: "bMangxejo", nomo: "អាហារដ្ឋាន 🍲", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => konstruiSatalon(konstrSpec("mangxejo", 4, TIERO), g, []),
    priskribo: "អាហារដ្ឋានរួម , គ្រោងស្រទាប់បួនដូចគ្នានឹងផ្ទះ ( w = d = 8, tieroAlto 3.203 ) , ប៉ុន្តែជាមួយពណ៌ជញ្ជាំងត្នោត ( 0x584028 ) និងស៊ុមភ្លឺ។ នៅក្នុងពិភពលោក វាក៏ទទួលតុបរិភោគខាងក្រៅជាមួយកៅអីមុខទ្វារ ( ឧបករណ៍ទុកពួកវាចោល ព្រោះពួកវាជារបស់ម៉ូឌុលគ្រឿងសង្ហារឹម )។",
    animacio: "គ្មាន , អគារឈរនឹង។" },
  { kodo: "bKasafeo", nomo: "កន្លែងប្រជុំ ☕", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => konstruiSatalon(konstrSpec("kasafeo", 4, 0o155/0o40), g, []),
    priskribo: "កន្លែងប្រជុំ , គ្រោងស្រទាប់បួនដូចគ្នា ប៉ុន្តែស្រទាប់ខ្ពស់ជាង ( 3.406 ) និងជញ្ជាំងពណ៌ក្រែម ( 0xd8c898 )។ វាជាអគារដំបូងជាមួយជួរបង្អួចថ្នាំវែង , បង្អួចផ្តេកមួយក្នុងមួយមុខក្នុងមួយស្រទាប់ ( មុខជាន់ផ្ទាល់ដីនៅទទេសម្រាប់ទ្វារ ) , នីមួយៗជាមួយគែមថ្នាំមាស។ កញ្ចក់ថ្លា ( opacity 0.7 ) ជាមួយការបញ្ចេញពន្លឺផ្ទាល់ខ្លួន ដូច្នេះបង្អួចភ្លឺពេលព្រលប់។",
    animacio: "គ្មាន , អគារឈរនឹង។" },
  { kodo: "bStacio", nomo: "ស្ថានីយ 🚀", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => konstruiSatalon(konstrSpec("stacioxipo", 3, 0o155/0o40), g, []),
    priskribo: "ស្ថានីយ ដែលយានអវកាសហោះពីលើ។ ស្រទាប់បីជាមួយជម្រាលស្រាលជាងផ្ទះ ( ទទឹងខាងលើជាកន្លះនៃទទឹងមូលដ្ឋាន ជំនួស 0.2969 ដង ) , ជញ្ជាំងប្រផេះភ្លឺ ( 0xc8c8c8 ) , ផ្ទាំងថ្មជុំវិញបាតជាមួយឆ្នូតការ៉េមាស , សសរលំពែងបួនជាមួយចុងភ្លឺនៅជ្រុងផ្ទាំង , និងចិញ្ចៀនមាសលើដំបូល។ ជួរបង្អួចថ្នាំដូចគ្នានឹងកន្លែងប្រជុំ , ហើយដូចវា ទ្វាររបស់វាជាកញ្ចក់ដូចគ្នា ( មិនមែនពណ៌ជញ្ជាំង )។",
    animacio: "គ្មាន , អគារឈរនឹង។" },
  { kodo: "spacosxipo", nomo: "យានអវកាស 🛸", indekso: -1, konstruajxo: true, kosmosxipo: true,
    konstruu: ( g ) => { spacoSxipo = konstruiKrasesxagxon(g, 0, 0, 0, oro, vitraEnira); },
    priskribo: "យានអវកាស ដែលអណ្តែតពីលើស្ថានីយនៃទីក្រុងមេ , ឧបករណ៍សាងសង់ដូចគ្នានឹងក្នុងពិភពលោក ( konstruiKrasesxagxon )។ ស្រទាប់ផ្អៀងដប់ ( ប្រាំឡើងលើ ប្រាំចុះក្រោម ) ឆ្លុះជុំវិញកណ្តាល ដូច្នេះវាស៊ីមេទ្រីបង្វិលផ្ដេក , ស៊ុមជ្រុងមាស និងដងផ្តេកមាសនៅគែមស្រទាប់នីមួយៗ , បង្អួចថ្នាំផ្តេកវែងនៅស្រទាប់នីមួយៗលើកលែងស្រទាប់កណ្តាល , ហើយនៅជ្រុងទាំងបួន ច្រកចូលទ្វារពីរ , ទ្វារឆ្លុះពីរភ្ជាប់តាមចង្កេះ ជាមួយវណ្ឌវង្កបំពង់មាសមូល។ ⟨ ទ្វារយានអវកាស 📃 ⟩ វាមានកម្រាស់ដូចគ្នានឹងទ្វារអគារ ( ស្លឹក 0.109375 ជាមួយ bevel ដូចគ្នា ) , ដូច្នេះវាលយចេញ 0.125 ពីយាន ជំនួស 0.6 , ហើយបំពង់មាសដេកលើប្លង់កណ្តាលនៃស្លឹកជាមួយកាំពាក់កណ្តាលកម្រាស់ទាំងមូល ដូច្នេះវាព័ទ្ធជុំវិញគែមខាងក្រៅទាំងមូល។ ⟨ ទ្វារជាកញ្ចក់ 📃 ⟩ ខុសពីទ្វារអគារ ( ដែលទទួលកំណែខ្មៅជាងនៃពណ៌ជញ្ជាំងខ្លួន ) , យានប្រើកញ្ចក់ដូចគ្នានឹងបង្អួច ( កញ្ចក់ថ្លាខ្មៅជាមួយការបញ្ចេញពន្លឺបៃតងខៀវ ) , ដូច្នេះទ្វារជារបស់គ្រួសារកញ្ចក់ដូចគ្នានឹងជួរបង្អួច។ ជញ្ជាំងពណ៌បៃតងខ្មៅ ( 0x184838 ) , កញ្ចក់បង្អួចបញ្ចេញពន្លឺ ( វាភ្លឺពេលព្រលប់ )។",
    animacio: "ការអណ្តែតបញ្ឈរស្រាល ( ±0.05 ឯកតា ) និងការវិលថ្មមៗទៅពីរចំហៀង , ឥរិយាបថគ្មានហោះរបស់ពិភពលោក។ ការលោតរបស់បង្អួចលេចឡើងតែពេលហោះ ( komenciFlugon )។" },
  { kodo: "bTuro", nomo: "អគារខ្ពស់ 🏙️", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => konstruiSatalon(konstrSpec("turo", 0o10, 0o30/0o10), g, []),
    priskribo: "អគារខ្ពស់ , អគារខ្ពស់បំផុត , ស្រទាប់ប្រាំបីលើផ្ទៃមូលដ្ឋានដូចគ្នា 8×8 , នីមួយៗខ្ពស់ 3.0 ឯកតា , ដូច្នេះប៉មទាំងមូលខ្ពស់ 24 ឯកតា។ ការថយចុះក្នុងមួយស្រទាប់ដូចផ្ទះ ដូច្នេះវាបញ្ចប់ដោយចុងស្តើងវែង។",
    animacio: "គ្មាន , អគារឈរនឹង។" },
  { kodo: "bSanktejo", nomo: "ទីសក្ការៈ ⛩️", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => konstruiSatalon(konstrSpec("sanktejo", 7, TIERO), g, []),
    priskribo: "ទីសក្ការៈ , ស្រទាប់ប្រាំពីរ និងទ្វារបួន ( មួយលើជ្រុងនីមួយៗ , ដូច្នេះអគារស៊ីមេទ្រីបង្វិលបួនដង ) , បញ្ចប់ដោយចុងសាជីមាសជំនួសដំបូលរាបស្មើ។ វាជាអគារតែមួយគត់ជាមួយផ្ទាំងមូលដ្ឋានមាស , ឥឡូវរាបស្មើ ( ខ្ពស់ 0.125 ដេកត្រង់លើដី , ពីមុនកម្រិតខ្ពស់ 0.297 ) , និងតែមួយគត់ជាមួយស្លាប , នៅទ្វារនីមួយៗមានផ្ទាំងមាសត្រីកោណពីរដែលបែរមុខទៅមុខ , ពួកវាដេកក្នុងប្លង់ទ្វារ ហើយលាតពីជ្រុងខាងលើនៃស៊ុមទ្វារចុះទៅគែមក្រោមនៃផ្ទាំងមូលដ្ឋានមាស , ហើយគែមខាងក្នុងរបស់ពួកវាតាមជ្រុងផ្អៀងនៃទ្វារ។ ដូច្នេះលក្ខណៈនេះរក្សា `sube` លើសពីសូន្យ។",
    animacio: "គ្មាន , អគារឈរនឹង។" },
  // ⟨ ផ្នែកទាំងឡាយ 📃 ⟩
  { kodo: "pPiliero", nomo: "សសរជ្រុង 🏛️", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => {
      const geos: THREE.BufferGeometry[] = [];
      aldoniKadranTubon(geos, 0, 0, 0, TIERO, 1, 1, true, KLINO);
      for ( const geo of geos ) g.add(new THREE.Mesh(geo, oro));
    },
    priskribo: "សសរជ្រុងមាសមួយរបស់អគារ , ឯកោ។ ដងស្របនឹងជញ្ជាំងផ្អៀង , វាផ្អៀងចូលក្នុងតាមជញ្ជាំង ដូច្នេះចន្លោះរវាងសសរ និងជញ្ជាំងដូចគ្នាពេញផ្លូវ។ នៅខាងលើ ចុងបោលចេញក្រៅ លើជ្រុងខាងលើនៃស្រទាប់។ ផ្នែកពេជ្ររក្សាចុងបួនតាមអង្កត់ទ្រូងជ្រុង , ដូច្នេះសិរីខាងមុខមើលចេញក្រៅ ហើយនៅលើអ័ក្សសសរ។ ពេលបោល ផ្នែករួមតូចដល់មួយភាគប្រាំបីនៃទទឹងក្នុងអ័ក្សទាំងពីរ ដូច្នេះវានៅជាការ៉េ ហើយសសរបញ្ចប់ដោយចុងពិត។ នៅបាត សសរទៅត្រង់ចុះក្រោម។",
    animacio: "គ្មាន , ផ្នែកឈរនឹង។" },
  { kodo: "pTavolo", nomo: "ស្រទាប់ 🧱", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => aldoniTavolanSxelon(g, KLINO, TIERO, HW),
    priskribo: "ស្រទាប់មួយនៃគ្រោងអគារ , ជញ្ជាំងរាងចតុកោណកែងស្រក ( kreiKlinoTavolon , ខាងលើចង្អៀតតាម `klino` ) ជាមួយសសរជ្រុងមាសបួន , ដូច្នេះគេឃើញសសរក្បែរជញ្ជាំងក្នុងបរិបទពិតរបស់វា។",
    animacio: "គ្មាន , ផ្នែកឈរនឹង។" },
  { kodo: "pFenestro", nomo: "បង្អួចថ្នាំ 🪟", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => {
      aldoniTavolanSxelon(g, KLINO, TIERO, HW);
      aldoniPilolFenestron(kielGrupo(g), oro, vitro, 0, TIERO / 2, HW - KLINO / 2, KLINO, TIERO,
        0o5/0o10, false, fenestraMargxeno(HW - KLINO / 2));
    },
    priskribo: "បង្អួចថ្នាំផ្តេកវែង ( កញ្ចក់ និងគែមមាសផ្កាយ ) លើស្រទាប់មួយ។ ក្រុមភ្នំអង្គុយនៅបាតបង្អួចតាមកាំជញ្ជាំងនៅទីនោះ ( fenestraSubFaco ) មិនមែនតាមកាំនៅកណ្តាលបង្អួចទេ , ហើយផ្អៀងតាមជម្រាលជញ្ជាំង ដូច្នេះបង្អួចដេករាបស្មើលើជញ្ជាំងផ្អៀង។ ⟨ ស៊ុមផ្កាយ 📃 ⟩ កញ្ចក់ជាថ្នាំសាមញ្ញ ប៉ុន្តែស៊ុមមាសជាផ្ទាំងរាបស្មើពេញលេញជាមួយចុងបួន , មួយនៅខាងចុងទាំងពីរ និងមួយនៅកណ្តាលគែមលើ និងក្រោម។ ផ្ទាំងជាវណ្ឌវង្កផ្កាយបំពេញ ដែលគេកាត់កញ្ចក់ចេញ។ គែមលើ និងក្រោមនៃស៊ុមនៅស្របនឹងកញ្ចក់រហូតជិតកណ្តាល , ហើយមានតែទីនោះពួកវាកោងទៅចុង និងត្រឡប់មកវិញ។ ជ្រុងនីមួយៗនៃវណ្ឌវង្កត្រូវបានបង្គត់បន្ថែមដោយការកាត់ Bézier តូច ( rondigiKonturon ) ដូច្នេះស៊ុមគ្មានគែមដាច់។ ⟨ ប្រវែង និងគែម 📃 ⟩ គែម ( fenestraMargxeno ) ជាលេខតែមួយសម្រាប់អគារទាំងមូល គណនាពីស្រទាប់ធំបំផុត និងតូចបំផុត , ហើយស្រទាប់នីមួយៗទទួលវាដូចគ្នាបេះបិទ។ កម្ពស់បង្អួចមិនផ្លាស់ប្តូរពីស្រទាប់មួយទៅស្រទាប់មួយ , មានតែប្រវែង។ ស្រទាប់ដែលជាមួយគែមដូចគ្នាលែងមានកន្លែងសម្រាប់បង្អួចយ៉ាងហោចណាស់វែងដូចកម្ពស់ នៅគ្មានបង្អួច។ ⟨ កញ្ចក់ 📃 ⟩ វាជានិយមន័យរួមដូចគ្នានឹងក្នុងពិភពលោក ( kreiFenestranMaterialon ) ជាមួយ roughness 0.109375 , ដូច្នេះមេឃ និងចង្កៀងឆ្លុះយ៉ាងច្បាស់លើផ្ទាំង , ហើយការបញ្ចេញពន្លឺបៃតងខៀវនៅមើលឃើញពេលយប់។",
    animacio: "គ្មាន , ផ្នែកឈរនឹង។" },
  { kodo: "pEnirejo", nomo: "ច្រកចូល 🚪", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => aldoniEnirejon(kielGrupo(g), 0o10, oro, enira, 1, TIERO),
    priskribo: "ទ្វារគ្រប់ប្រភេទ ( នៅទីនេះពណ៌ផ្ទះ ) , ត្រពេសូមូលជាមួយ bevel មាសតូច ដែលដេកស្ទើរលើជញ្ជាំង , ស្លឹកក្រាស់ 0.109375 ( ពីមុន 0.0625 , និងមុននោះ 0.25 ) ហើយលយចេញ 0.125 ទៅមុខ , ហើយស៊ុមបំពង់មាសព័ទ្ធជុំវិញគែមខាងក្រៅទាំងមូល។ ⟨ ស្លឹកជាជញ្ជាំងខ្លួន 📃 ⟩ វាជាច្បាប់ចម្លងនៃវត្ថុជញ្ជាំងខ្លួនជាមួយពណ៌ខ្មៅ ( kreiPordanMaterialon ) , ដូច្នេះទ្វារមានផ្ទៃដូចជញ្ជាំងខ្លួន , ជាមួយ roughness , metalness , ការឆ្លុះ និងវាយនភាពរបស់វា។ ការខ្មៅជាការដក 0x08 នៅឆានែលនីមួយៗ ( ដូចពណ៌ 0x080808 ) , ដូច្នេះទ្វារអាហារដ្ឋានខ្សាច់លែងមើលទៅដូចផ្ទះបៃតង ហើយប្រភេទនីមួយៗនៅស្គាល់តាមពណ៌ខ្លួន។ ⟨ ហេតុអ្វីតែ 0x08 📃 ⟩ ការដក 0x10 ធ្វើឱ្យទ្វារអគារខ្មៅស្ទើរខ្មៅទាំងស្រុង , ដូច្នេះអគារកណ្តាលមើលទៅដូចគ្មានពណ៌ទ្វារអ្វីទាំងអស់ , ជាមួយ 0x08 ទ្វារនៅខ្មៅជាងដែលមើលឃើញ និងនៅស្គាល់ជាពណ៌ជញ្ជាំង។ ទ្វារកញ្ចក់បីជាករណីលើកលែង , កន្លែងប្រជុំ , ស្ថានីយ និងយានអវកាសប្រើកញ្ចក់បង្អួចជំនួសពណ៌ជញ្ជាំង។ វាឈរលើដីនៅមុខ ហើយផ្អៀងតាមជញ្ជាំង ( 4.5° នៅកម្ពស់ស្រទាប់ផ្ទះ ) , ទ្វារនៅស្របនឹងជញ្ជាំងខ្លួន។ ទីសក្ការៈទទួលច្បាប់ចម្លងបួន , មួយលើជ្រុងនីមួយៗ , នីមួយៗផ្អៀងចូលក្នុងជញ្ជាំងខ្លួន។",
    animacio: "គ្មាន , ផ្នែកឈរនឹង។" },
  { kodo: "pSigno", nomo: "ស្លាកសញ្ញា 🪧", indekso: -1, konstruajxo: true,
    konstruu: ( g ) => aldoniSteleanSignon(kielGrupo(g), "", "domo", 0o10, 0o10),
    priskribo: "ស្លាកផ្កាយ 3D ជាមួយឈ្មោះអគារ ក្បែរទ្វារ។ ផ្ទាំងជាកញ្ចក់កក ( MeshPhysicalMaterial ជាមួយ `transmission` 0.35 និង `roughness` 0.5 ) , ផ្ទៃខាងក្រោយមើលឃើញតាមវា ប៉ុន្តែស្រអាប់ , គេមិនស្គាល់វត្ថុខាងក្រោយទេ មានតែចំណុចពណ៌ទន់។ វត្ថុនេះត្រូវការជាន់ស្រទាប់ដោយឡែកនៃឆាក ( `transmissionResolutionScale` 0.25 )។ ផ្ទាំងតាមថ្ងៃ និងយប់តាមពណ៌មូលដ្ឋានរបស់វា , ក្នុងគំរូរូបវន្តនៃ three ពណ៌នោះក៏ចម្រាញ់ពន្លឺឆ្លងកាត់ , ដូច្នេះសពេលថ្ងៃ = កញ្ចក់កក , ខ្មៅពេលយប់ = ផ្ទាំងខ្មៅរឹង ( ជាមួយការបញ្ចេញពន្លឺតិចតួច )។ ផ្ទៃមិនស៊ីមេទ្រី , ជ្រុងមូលធំនៅឆ្វេង , តូចនៅស្តាំ , ជ្រុងក្រោមត្រង់។ អក្សរ Gawekiif ( ឈ្មោះ ឬឈ្មោះប្រភេទសម្រាប់អគារគ្មានឈ្មោះ ) អង្គុយលើវណ្ឌវង្កដូចគ្នានឹងផ្ទាំង តែពីរបីមីលីម៉ែត្រមុខផ្ទៃវា។ shader តូចមួយគូរវា ដោយអានអក្សរជាម៉ាស ហើយបន្ថែមទឹកថ្នាំលឿង និងវណ្ឌវង្ក , ទឹកថ្នាំស្ងាត់លឿងពេលថ្ងៃ និងលឿងស្លេកពេលយប់ , ខណៈវណ្ឌវង្កទៅទិសផ្ទុយ , សពេលថ្ងៃ ខ្មៅពេលយប់ , ដូច្នេះអក្សរនៅអានបានលើផ្ទៃទាំងពីរ។",
    animacio: "គ្មាន , ផ្នែកឈរនឹង។" },
];

