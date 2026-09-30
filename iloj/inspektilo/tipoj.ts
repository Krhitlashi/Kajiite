// ≺⧼ ឧបករណ៍ពិនិត្យ ( ប្រភេទ ) 🔬 ⧽≻
// លក្ខណៈរួមរបស់គំរូ គឺប្រភេទធម្មជាតិ ( SPECOJ ) និងអគារ ( KONSTRUAJXOJ )
// មានវាលដូចគ្នាសម្រាប់បញ្ជី ការពិពណ៌នា និងឧបករណ៍សាងសង់ ដូច្នេះឧបករណ៍
// គ្រប់គ្រងពួកវាដោយប្រភេទតែមួយ។
import type * as THREE from "three";

// ⟨ លក្ខណៈគំរូ 📃 ⟩ គឺ kodo ( លេខសម្គាល់ក្នុងប៊ូតុង ) nomo ( ស្លាក
// ជាមួយអេម៉ូជី ) indekso ( លិបិក្រមសត្វក្នុងហ្គេម ឬ -1 ) grandeco (
// មាត្រដ្ឋានគំរូ ) និង akva ( តើផ្ទៃទឹកបង្ហាញ )។ ឧបករណ៍សាងសង់ទទួល
// ធុង គឺឧបករណ៍សាងសង់របស់ហ្គេមប្រកាសឆាក រីឯឧបករណ៍ផ្តល់ក្រុម។ ទង់ទាំងបី
// ( petrelo, kosmosxipo, konstruajxo ) ជ្រើសរើសរបៀបចាត់ចែងចលនា។
export interface ModelaSpecifo {
  kodo: string;
  nomo: string;
  indekso: number;
  grandeco?: number;
  akva?: boolean;
  petrelo?: boolean;
  kosmosxipo?: boolean;
  konstruajxo?: boolean;
  konstruu?: ( g: THREE.Scene ) => void;
  priskribo: string;
  animacio: string;
}
