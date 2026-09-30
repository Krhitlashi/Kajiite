// ≺⧼ ហុកសកលរបស់ឧបករណ៍ 🔬 ⧽≻
// ហុកកុងសូលរបស់ឧបករណ៍ទាំងពីរ គឺឧបករណ៍ឆ្លាក់ដី និងឧបករណ៍ពិនិត្យពិភពលោក
// ដាក់ការយោងរបស់ពួកវាលើ `window` ដើម្បីឱ្យអាចសួរស្ថានភាពបច្ចុប្បន្ន
// ដោយផ្ទាល់ពីកុងសូល ( គំរូដូចហ្គេម សូមមើល kantaoj/ludo/sperto.ts )។
// ឧបករណ៍ទាំងនេះគ្មានចំណុចប្រទាក់ផ្សេងទេ ដូច្នេះហុកគឺជាវិធីតែមួយ
// ដើម្បីត្រួតពិនិត្យឆាក និងចលនាពីកុងសូល។
// ⟨ ការនាំចូលរបស់ Vite 📃 ⟩ ឧបករណ៍ឆ្លាក់អានឯកសារទិន្នន័យរបស់គ្រប់ផែនទី
// តាម import.meta.glob ( Vite ដោះស្រាយគំរូនៅពេលសាងសង់ )។
interface ImportMeta {
  glob: ( gluboj: string ) => Record<string, () => Promise<any>>;
}

interface Window {
  skulptilo?: Record<string, unknown>;
  inspektilo?: Record<string, unknown>;
  // ⟨ ឧបករណ៍ជ្រើសឯកសារ 📃 ⟩ គឺ File System Access API។ ប្រភេទធម្មតារបស់
  // TypeScript មិនមានពួកវាទេ ( API មានតែក្នុង Chromium ) ដូច្នេះឧបករណ៍
  // ប្រកាសអនុគមន៍ទាំងពីរនៅទីនេះ។ អាគុយម៉ង់ស្រេចចិត្តនៅតែបើកចំហ។
  showSaveFilePicker?: ( opcioj?: Record<string, unknown> ) => Promise<FileSystemFileHandle>;
  showOpenFilePicker?: ( opcioj?: Record<string, unknown> ) => Promise<FileSystemFileHandle[]>;
}
