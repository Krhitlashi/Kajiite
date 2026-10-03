// ≺⧼ ឧបករណ៍ពិនិត្យ ( ទិន្នន័យ ) 🔬 ⧽≻
import * as THREE from "three";
import { konstruiArbaron } from "../../eskekoj/shalaj-specioj/vegetajxo/betuloj/arbaro.js";
import { konstruiLarikon } from "../../eskekoj/shalaj-specioj/vegetajxo/larikoj.js";
import { konstruiFilikojn } from "../../eskekoj/shalaj-specioj/vegetajxo/filikoj.js";
import { konstruiPurpurajnPlantojn, konstruiPurpurajnFilikojn, konstruiAltajnPurpurajnFilikojn } from "../../eskekoj/shalaj-specioj/vegetajxo/purpuraj.js";
import { konstruiHxsxaksxlefojn } from "../../eskekoj/shalaj-specioj/vegetajxo/hxsxaksxlefo.js";
import { konstruiPussxlefojn } from "../../eskekoj/shalaj-specioj/vegetajxo/pussxlefo.js";
import { konstruiMetitanRokon, konstruiLikenSxtonojn } from "../../eskekoj/shalaj-specioj/vegetajxo/rokoj.js";
import { konstruiLikenojn, konstruiTrunkajnLikenojn } from "../../eskekoj/shalaj-specioj/vegetajxo/likenoj.js";
import { konstruiMontajnSubkreskajxojn, konstruiLaganSubkreskajxojn } from "../../eskekoj/shalaj-specioj/vegetajxo/subkreskajxoj.js";
import { konstruiMusxajnMontetojn } from "../../eskekoj/shalaj-specioj/vegetajxo/muskoj.js";
import { konstruiFalintajnTrunkojn } from "../../eskekoj/shalaj-specioj/vegetajxo/falintaj-trunkoj.js";
import { konstruiCetkuojn, konstruiCakeojn } from "../../eskekoj/shalaj-specioj/vegetajxo/ekvizetoj.js";
import { konstruiHerbon } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/tufoj.js";
import type { ModelaSpecifo } from "./tipoj.js";

// ⟨ ឧបករណ៍ជំនួយសម្រាប់រុក្ខជាតិ និងថ្ម 📃 ⟩
export const nulaAlto = () => 0;
export const neniom = () => false;
// ⟨ កំណត់ការបែងចែកឱ្យជាប់ 📃 ⟩
export const nurApud = ( radiuso: number ) => ( x: number, z: number ): boolean => Math.hypot(x, z) > radiuso;
export const nurApudPunkto = ( cx: number, cz: number, radiuso: number ) => ( x: number, z: number ): boolean => Math.hypot(x - cx, z - cz) > radiuso;
export const malproksimaAnkro = [ { x: 0o100, z: 0, h: 0, s: 1, r: 0 } ];
export const montaAlto = () => 0o24;
export const ankrArboj = [ { x: 0, z: 0, h: 0, s: 0o3/0o10 } ];
/* ដាក់ក្រុមនៅកណ្តាល គឺក្រុមទាំងមូលផ្លាស់ទីដូច្នេះចំណុចកណ្តាលនៃ
   គំរូស្ថិតលើដើមកំណើត ហើយគោលរបស់ពួកវានៅលើដី។
    @param grupo ( THREE.Object3D ) - ក្រុមដែលត្រូវដាក់នៅកណ្តាល។ */
export const centri = ( grupo: THREE.Object3D ): void => {
  grupo.updateMatrixWorld(true);
  const skatolo = new THREE.Box3().setFromObject(grupo);
  const centro = skatolo.getCenter(new THREE.Vector3());
  // ⟨ ហេតុអ្វីត្រូវរុញកូន មិនមែនក្រុម 📃 ⟩
  for ( const filo of grupo.children ) {
    filo.position.x -= centro.x;
    filo.position.y -= skatolo.min.y;
    filo.position.z -= centro.z;
  }
  grupo.updateMatrixWorld(true);
};

// ⟨ ប្រភេទទាំងឡាយ 📃 ⟩
export type Specio = ModelaSpecifo;
export const SPECOJ: Specio[] = [
  { kodo: "beroe", nomo: "Beroe 🥒", indekso: 0, grandeco: 0o12/0o10,
    akva: true,
    priskribo: "តេណូផូរគ្មានតង់តាក។ ជែលរាងផ្លែត្រសក់ដែលមានមាត់ធំនៅប៉ូលក្រោម , បំពង់ក និងក្រពះមើលឃើញតាមខ្លួនថ្លា , សារធាតុរអិលលេបប្រម៉ោយផ្សេងទៀត។",
    animacio: "ល្ងាចខ្លាំងយឺត ( ខ្លួនជែលរីក និងរួម ) , ជួរប្រម៉ោយឥន្ធនូប្រាំបីក្នុងរលកមេតាក្រូន , ហើយបបូរមាត់បើកនៅចុងការច្របាច់នីមួយៗ។" },
  { kodo: "mnemiopsis", nomo: "Mnemiopsis 🍈", indekso: 1, grandeco: 0o12/0o10,
    akva: true,
    priskribo: "សត្វសមុទ្ររាងមូលធំ មានបបូរមាត់ធំពីរ ( ផ្ទាំងលយចេញមានគែមរលកសេរី ) និងត្រចៀកតូចបួន , រាបស្មើជាង Beroe។ តង់តាករបស់វាថយចុះ ដូចវ័យពេញវ័យ។",
    animacio: "ល្ងាចស្រាលរហ័ស , បបូរបើក និងបិទដូចមាត់ , ហើយតង់តាកតូចអូសទៅក្រោយ។" },
  { kodo: "pleurobrakia", nomo: "Pleŭrobrakia 🍇", indekso: 2, grandeco: 0o12/0o10,
    akva: true,
    priskribo: "ធុងផ្លែទំពាំងបាយជូរសមុទ្រ , ស្ទើរជាស្វ៊ែរ , មានសរីរាង្គតុល្យភាពនៅកំពូល , ស្រទាប់ពីរលើពាក់កណ្តាលខាងលើ និងតង់តាកវែងខ្លាំងពីរដែលមានរោមចំហៀង។",
    animacio: "ល្ងាចមធ្យម , តង់តាកទាំងពីររង្គោះទៅក្រោយ , ហើយស្រទាប់ , សរីរាង្គតុល្យភាព និងបបូរមាត់តាមល្ងាចនៃខ្លួន។" },
  { kodo: "glacifiso", nomo: "ត្រីទឹកកក 🐟", indekso: 3, grandeco: 0o12/0o10,
    akva: true,
    priskribo: "ត្រីក្តៅថ្លាពីទឹកត្រជាក់។ ក្បាលធំ , ព្រុយខ្នងទីពីរទាបវែង , ព្រុយគូទ និងព្រុយក្រោមរាងផ្លិតធំទូលាយ។",
    animacio: "ខ្លួនរលកជាខ្សែបីចម្រៀក , ប៉ុន្តែត្រីហែលយឺតដោយព្រុយក្រោមនៅមុខបាត។" },
  { kodo: "marlaraksxo", nomo: "ពីងពាងសមុទ្រ 🕷️", indekso: 4, grandeco: 0o12/0o10,
    akva: true,
    priskribo: "ពីងពាងសមុទ្រតូច មានជើងវែងប្រាំបី និងសំបកឈីទីន ( ចិញ្ចៀនចម្រៀក និងដុំ )។ ខ្លួនវាតូច , ជើងទាំងប្រាំបីដេកលើយន្តហោះតែមួយ។",
    animacio: "ការដើរមេតាក្រូនឆ្លាស់ , ត្រគាកបោសជើងជុំវិញអ័ក្សឈររបស់សត្វ ហើយជង្គង់បត់ពេលលើកជើង។" },
  // ⟨ រុក្ខជាតិ ស្លែ និងថ្ម 📃 ⟩
  { kodo: "betulo", nomo: "បេធូឡា 🌳", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiArbaron(g, [ { x: 0, z: 0, h: 0, s: 1 } ]),
    priskribo: "បេធូឡាក្រដាស , ដើមសជាមួយចំណុចខ្មៅ និងផ្នែកឫសរីក , និងមកុដរាងស៊ុតពីខ្នើយប្រាំបី នីមួយៗលើមែកដែលមើលឃើញ។ ក្នុងចិត្តនៃខ្នើយនីមួយៗមានស្នូលខ្មៅមិនទៀងទាត់ , វាជាស្រមោលចន្លោះស្លឹក មិនមែនវត្ថុមើលឃើញទេ , ហើយជុំវិញវាមានស្លឹកនីមួយៗជាកាតតូចជាមួយវាយនភាពស្លឹកតែមួយ ( គែមធ្មេញរណារ , សរសៃ , ដង ) និង alphaTest , ដូច្នេះស្លឹកនីមួយៗបង្ហាញរូបរាងពិត។ ក្រដាសនីមួយៗមានពណ៌ផ្ទាល់ខ្លួន ( vertexColors ) ហើយវិលជុំវិញអ័ក្សវែងរបស់វា ដូច្នេះស្លឹកមិនស្មើៗគ្នា។",
    animacio: "គ្មាន , ដើមឈើឈរនឹង ( រុក្ខជាតិគ្មានចលនាក្នុងហ្គេម )។" },
  // ⟨ ដើមលើចំនួនបី 📃 ⟩
  { kodo: "lariko", nomo: "ឡារីក 🌲", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiLarikon(g, [
      { x: -0o3/0o2, z: 0.4, h: 0, s: 0.45 },
      { x: 0o1/0o10, z: -0o1/0o2, h: 0, s: 0.72 },
      { x: 1.7, z: 0.3, h: 0, s: 1 }]),
    priskribo: "ឡារីកអាល់ផ្លូ , ដើមប្រផេះជាមួយផ្នែកឫសរីក , មែកស្តើងស្ងួតខ្លះលើដើមក្រោម , និងកំពូលម្ជុលពណ៌មាសរដូវស្លឹកឈើជ្រុះ , ស្រទាប់ 3 ទៅ 4 នៃស្ពឺកោណពីផ្លិតម្ជុល។ ប្រភេទនេះមានកម្ពស់ចៃដន្យខ្លាំង ( 1.4 ដល់ 9.8 ឯកតា ) , ហើយដើម និងមកុដសមស្របនឹងកម្ពស់ , ឧបករណ៍បង្ហាញបីក្នុងចំណោមពួកវា។",
    animacio: "គ្មាន , ដើមឈើឈរនឹង ( រុក្ខជាតិគ្មានចលនាក្នុងហ្គេម )។" },
  { kodo: "hxsxak", nomo: "ហ្សាក់ស្លេហ្វូ 🥬", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiHxsxaksxlefojn(g, [ { x: 0, z: 0, h: 0, s: 1 } ]),
    priskribo: "ដើមបៃតងស្វាយ , ដើមខ្ពស់ជាមួយស្រទាប់ 3 ទៅ 5 នៃស្លឹកកោងធំបួន។ ស្រទាប់នីមួយៗមានចានសំបកដែលបើកឡើងលើនិងចេញក្រៅ , ស្លឹកលយចេញពីខាងក្នុងចាន , ហើយស្លឹកក្រោមនៃស្រទាប់នីមួយៗខ្លីជាង និងជិតដើមជាង។ លើស្រទាប់ស្លឹកចុងក្រោយ រុក្ខជាតិបញ្ចប់ដោយមកុដចុងនៃស្រទាប់ស្លឹកបួន ដែលបន្ថយឡើងលើរហូតដល់ពន្លកតូច , ស្រទាប់ចុងក្រោយអង្គុយលើកំពូលដើមដែលមូលទៅជាកោណតូចជំនួសផ្ទាំងកាត់រាបស្មើ។",
    animacio: "គ្មាន , រុក្ខជាតិឈរនឹង ( រុក្ខជាតិគ្មានចលនាក្នុងហ្គេម )។" },
  { kodo: "pussx", nomo: "ពូសស្លេហ្វូ 🌿", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiPussxlefojn(g, [ { x: 0, z: 0, h: 0, s: 1 } ]),
    priskribo: "ហ្សាក់ស្លេហ្វូតូចដូចហ្វេន , ដើមស្វាយខ្លី , ស្រទាប់ 1 ទៅ 2 នៃស្លឹកបៃតងដូចគ្នា និងចានសំបកមួយនៅស្រទាប់ទីមួយ។ ចានខ្ពស់ 20% នៃរុក្ខជាតិ ដូច្នេះវាមិនលាក់ស្លឹកទេ។ រុក្ខជាតិបញ្ចប់ដោយស្រទាប់មកុដចុងបី ដែលបន្ថយឡើងលើរហូតដល់ពន្លកលើកំពូលដើមមូល , មិនមែនដងទទេ ឬថាសរាបស្មើទេ។ ផ្លែឈើថ្លាដែលអាចបរិភោគបានរបស់វាកើតឡើងដោយឡែក ( mangxajxoj.ts )។",
    animacio: "គ្មាន , រុក្ខជាតិឈរនឹង ( រុក្ខជាតិគ្មានចលនាក្នុងហ្គេម )។" },
  { kodo: "filiko", nomo: "ហ្វេន 🌿", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiFilikojn(g, 1, nulaAlto, [], [], neniom, neniom),
    priskribo: "ហ្វេនជ្រលង , គុម្ពពិតបីវិមាត្រនៃស្លឹកកោង 9 ( លែងជាកាតឆ្លងពីរ )។ ស្លឹកនីមួយៗជាខ្សែដែលមានសរសៃកណ្តាលលើក និងវាយនភាពហ្វេន , ស្លឹកប្រឡាក់មួយជាមួយស្លឹកតូច 28 គូ , ឆ្នូតគែមខ្មៅ និងសរសៃកណ្តាល។ ស្លឹកលយចេញពីដី , បើកចេញក្រៅ ហើយចុងរបស់វាធ្លាក់ក្រោមទម្ងន់ខ្លួន។ ឧបករណ៍បង្ហាញគំរូមួយ ( ហ្គេមដាក់រាប់រយ )។",
    animacio: "គ្មាន , រុក្ខជាតិឈរនឹង។" },
  { kodo: "purpuraFiliko", nomo: "ហ្វេនស្វាយ 🪻", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiPurpurajnFilikojn(g, 1, nulaAlto, neniom, neniom, neniom),
    priskribo: "ហ្វេនស្វាយខ្ពស់ជាងពីគែមព្រៃ , គុម្ពពិតបីវិមាត្រនៃស្លឹកកោង 11 ( លែងជាប្លង់ឆ្លងបួន ) , ជាមួយវាយនភាពស្លឹកស្វាយប្រឡាក់ និងមាត្រដ្ឋានធំជាងហ្វេនជ្រលង។",
    animacio: "គ្មាន , រុក្ខជាតិឈរនឹង។" },
  { kodo: "purpuraPlanto", nomo: "រុក្ខជាតិស្វាយ 🪻", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiPurpurajnPlantojn(g, 1, nulaAlto, neniom, neniom, neniom),
    priskribo: "រុក្ខជាតិស្វាយទាបក្រាស់ , តូចបំផុតក្នុងចំណោមរុក្ខជាតិស្វាយ , ដែលនៅគែមព្រៃ និងវាលស្មៅ។",
    animacio: "គ្មាន , រុក្ខជាតិឈរនឹង។" },
  { kodo: "altaPurpuraFiliko", nomo: "ហ្វេនស្វាយខ្ពស់ 🌴", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiAltajnPurpurajnFilikojn(g, 1, nulaAlto, neniom, neniom, neniom),
    priskribo: "ហ្វេនស្វាយខ្ពស់បំផុត , ដើមជាមួយមកុដស្លឹក ( រូបមកុដខុសគ្នាបីក្នុងក្រុមពិភពលោក )។",
    animacio: "គ្មាន , រុក្ខជាតិឈរនឹង។" },
  { kodo: "herbo", nomo: "ស្មៅ 🌱", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiHerbon(g, 1, nulaAlto, neniom, neniom, neniom),
    priskribo: "សំណុំស្មៅ , កាតបីនៅ 60° ( ពីរនឹងបង្ហាញគែមទទេ 45° ) ជាមួយវាយនភាពស្មៅ , ស្លឹកស្តើងប្រហែល 60 ផ្អៀង , ខ្លះស្ងួតពណ៌លឿងនៅចន្លោះ និងស្រមោលឫសទន់។ សំណុំនីមួយៗក៏ទទួលផ្អៀងផ្ទាល់ខ្លួន និងកម្ពស់មិនទៀងទាត់។ ឧបករណ៍បង្ហាញសំណុំមួយ ( ហ្គេមដាក់រាប់ពាន់ )។",
    animacio: "គ្មាន , រុក្ខជាតិឈរនឹង។" },
  { kodo: "musxo", nomo: "ភ្នំស្លែ 🟢", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiMusxajnMontetojn(g, 1, nulaAlto, [], neniom, neniom),
    priskribo: "ភ្នំស្លែ , គម្របពីខ្សែស្លែបត់រាប់រយ ( វែងជាងនៅកណ្តាល ) , ដែលបង្កើតជាដុំទន់ដោយគ្មានខ្នើយមូលរាបស្មើ។",
    animacio: "គ្មាន , រុក្ខជាតិឈរនឹង។" },
  { kodo: "falintaTrunko", nomo: "ដើមឈើដួល 🪵", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiFalintajnTrunkojn(g, 1, nulaAlto, [], neniom, neniom),
    priskribo: "ដើមបេធូឡាដួល , ដេកលើដី , ជាមួយសំបកបេធូឡា និងគល់មែក។ វាក៏ដើរតួជាយុថ្កាសម្រាប់លីគែនដើមឈើ។",
    animacio: "គ្មាន , រុក្ខជាតិឈរនឹង។" },
  { kodo: "cetkuo", nomo: "ហូសេថេល 🌾", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiCetkuojn(g, 1, nulaAlto, nulaAlto, neniom, neniom),
    priskribo: "ហូសេថេល ( Equisetum praealtum ) , ដងឈរពីចម្រៀក 11 ជាមួយឆ្អឹងជំនីជ្រៅប្រាំបី , ស្រទាប់មានធ្មេញប្រាំបីនៅសន្លាក់ ( ធ្មេញមួយក្នុងមួយឆ្អឹងជំនី ) និងក្បាលស្រកានៅកំពូល។ រុក្ខជាតិទាំងមូលប្រើមាត្រដ្ឋានតែមួយ ដូច្នេះឆ្អឹងជំនី , ស្រទាប់ និងធ្មេញរក្សាសមាមាត្រ។",
    animacio: "គ្មាន , រុក្ខជាតិឈរនឹង។" },
  { kodo: "cakeo", nomo: "ហូសេថេលទឹក 🪷", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiCakeojn(g, 1, nulaAlto, 0, 0, () => 6, nulaAlto, neniom, neniom),
    priskribo: "ហូសេថេលទឹក ( Equisetum telmateia ) , កន្ទុយសេះធំនៃគែមបឹង , ដងមានស្រទាប់ ដែលនៅសន្លាក់នីមួយៗចេញកួរមែកតូច។ មែកតូចនីមួយៗមានចម្រៀកពីរ , ចេញស្ទើរផ្តេក , លើកនៅចុង និងផ្ទុកសន្លាក់តូចនៅកណ្តាល , ហើយកួរវែងបំផុតនៅកណ្តាលដង។",
    animacio: "គ្មាន , រុក្ខជាតិឈរនឹង។" },
  { kodo: "lagajPlantoj", nomo: "រុក្ខជាតិតូចបឹង 🐸", indekso: -1, grandeco: 1,
    akva: false,
    konstruu: ( g ) => konstruiLaganSubkreskajxojn(g, 0o30, nulaAlto, 0, 0, () => 6,
      nulaAlto, ankrArboj, ankrArboj, nurApud(0o6), neniom, neniom),
    priskribo: "ល្បាយរុក្ខជាតិទាបជុំវិញបឹង , ដប់រូបរាងជាមួយស្លឹក និងវាយនភាពផ្សេងៗ , នីមួយៗក្នុងសំណាញ់ខ្លួន។ ឧបករណ៍បង្ហាញចំណុចតូចមួយពីល្បាយ ( ហ្គេមដាក់រាប់ពាន់ )។",
    animacio: "គ្មាន , រុក្ខជាតិឈរនឹង។" },
  { kodo: "montajPlantoj", nomo: "រុក្ខជាតិតូចភ្នំ ⛰️", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiMontajnSubkreskajxojn(g, 0o40, montaAlto,
      malproksimaAnkro, malproksimaAnkro, nurApudPunkto(0o100, 0, 0o10), neniom, neniom),
    priskribo: "រុក្ខជាតិអាល់ផ្លូទាប , សំណុំស្ងួត និងគុម្ពតូចរវាងថ្មភ្នំ និងពូសស្លេហ្វូ។ ឧបករណ៍បង្ហាញក្រុមមួយ ( ហ្គេមដាក់រាប់ពាន់ )។",
    animacio: "គ្មាន , រុក្ខជាតិឈរនឹង។" },
  { kodo: "likenoj", nomo: "លីគែនដី 🫧", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiLikenojn(g, 0o24, nulaAlto, malproksimaAnkro, [],
      nurApudPunkto(0o100, 0, 0o10), neniom, false),
    priskribo: "រូបរាងលីគែនបីក្នុងប្រភេទតែមួយ , គុម្ព , ស្លឹករាបស្មើ ( ថាសសំបក ) និងរោមចៀម។ គ្រាប់ជ្រើសរូបរាងសម្រាប់ចំណុចនីមួយៗ ដូច្នេះឧបករណ៍បង្ហាញចំណុចជាច្រើននៃរូបរាងទាំងបី។",
    animacio: "គ្មាន , លីគែនឈរនឹង។" },
  { kodo: "likenSxtonoj", nomo: "ថ្មលីគែន 🪨", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiLikenSxtonojn(g, 1, nulaAlto, neniom, neniom),
    priskribo: "ថ្មតូចជាមួយក្តារពណ៌ថ្មបៃតង , ខ្នើយដែលលីគែនដីប្រមូលខ្លួនជុំវិញ។",
    animacio: "គ្មាន , ថ្មឈរនឹង។" },
  { kodo: "trunkajLikenoj", nomo: "លីគែនដើមឈើ 🍃", indekso: -1, grandeco: 1,    akva: false, konstruu: ( g ) => { const trunkoj = konstruiArbaron(g, [ { x: 0, z: 0, h: 0, s: 0o7/0o20 } ]); konstruiTrunkajnLikenojn(g, [ trunkoj ]); },
    priskribo: "ដុំលីគែនលើដើមឈើ , ដុំពកជាមួយវាយនភាពលីគែនដូចកាវបិទ។ ឧបករណ៍បង្ហាញពួកវាលើដើមបេធូឡាតូច ព្រោះពួកវាត្រូវការដើមដើម្បីអង្គុយ។",
    animacio: "គ្មាន , លីគែនឈរនឹង។" },
  { kodo: "roko", nomo: "ថ្ម 🪨", indekso: -1, grandeco: 1,
    akva: false, konstruu: ( g ) => konstruiMetitanRokon(g, 0, 0, nulaAlto, 1),
    priskribo: "ដុំថ្មមួយ , អ៊ីកូសាអ៊ីដ្រូនជាមួយការបែងចែកមួយ ( មុខ 80 ) , កំពូលរបស់វាត្រូវបានរុញដោយរលករលូន , ដូច្នេះថ្មមិនទៀងទាត់ប៉ុន្តែមូល ដូចថ្មរមៀល។ ផ្ទៃផ្ទុកវាយនភាពថ្មខ្លួន ( គ្រាប់ , ស្នាមប្រេះ , សរសៃកវាត ) និងចម្លាក់ពាក់ព័ន្ធ , ហើយពណ៌ខ្ចីស្ទើរស , ពណ៌មកពីវាយនភាព។",
    animacio: "គ្មាន , ថ្មឈរនឹង។" },
  { kodo: "montajRokoj", nomo: "ថ្មភ្នំ ⛰️", indekso: -1, grandeco: 1,
    akva: false,
    // ⟨ ហេតុអ្វីមិនប្រើឧបករណ៍សាងសង់បែងចែក 📃 ⟩
    konstruu: ( g ) => { konstruiMetitanRokon(g, -1.1, 0.4, nulaAlto, 0o12/0o20, 0, 0o7);
      konstruiMetitanRokon(g, 1.2, -0.9, nulaAlto, 0o15/0o20, 0, 0o40);
      konstruiMetitanRokon(g, 0o1/0o10, 1.3, nulaAlto, 0o1, 0, 0o71); },
    priskribo: "ដុំថ្មនៃតំបន់អាល់ផ្លូ , រូបរាងបីខុសគ្នា ( គ្រាប់បីនៃរលកតែមួយ ) , នីមួយៗជាមួយមាត្រដ្ឋានមិនស្មើ ដូច្នេះភ្នំមិនបង្ហាញថ្មតែមួយស្ទួន។",
    animacio: "គ្មាន , ថ្មឈរនឹង។" },
  { kodo: "petrelo", nomo: "ផេត្រេលព្រិល 🕊️", indekso: -1, grandeco: 0o4,
    akva: false, petrelo: true,
    priskribo: "ផេត្រេលព្រិល ( Pagodroma nivea ) , បក្សីសមុទ្រសទាំងស្រុងជាមួយចុងស្លាបខ្មៅ , ចំពុះកោងច្រមុះបំពង់ និងចំណុចខ្មៅមុខភ្នែក។",
    animacio: "ស្លាបពីរចម្រៀក , ដៃ និងកំភួនញ័រនៅកែងដៃពិត , ចុងយឺតមួយភាគបួននៃការវាយ ហើយកន្ទុយបក់។ ការវាយមកជាការផ្ទុះរវាងការហោះរអិល។" },
];

