// ≺⧼ ɽ͑ʃ'w j͑ʃ'ᴜ 🎲 ⧽≻
// បំប្លែងអក្សរគ្រាប់ពូជទៅលេខ 32 ប៊ីត ហើយបំបែកវាទៅជាស្ទ្រីម
// ដោយឡែក។ ឯកសារនេះសុទ្ធ ( គ្មាន DOM , គ្មានផ្ទុកក្នុងម៉ាស៊ីន ) ដូច្នេះ
// ឧបករណ៍ខាងក្រៅ និងការធ្វើតេស្តអាចនាំចូលបាន ។

// ⟨ ថេរិន FNV ់ 📃 ⟩
const FNV_KOMENCO = 0x811C9DC5;
const FNV_PLIIGO = 0x01000193;

/*ញែកលេខគ្រាប់ពូជចេញពីអក្សរណាមួយ
    @param s2banani ( string ) - អក្សរគ្រាប់ពូជ
        Example. semoDeS2bana("kajiite").
@returns tk2ni ( number ) - លេខ 32 ប៊ីត មិនអវិជ្ជមាន */
export function semoDeS2bana( s2banani: string ): number {
  let h = FNV_KOMENCO;
  for ( let i = 0; i < s2banani.length; i++ ) {
    h ^= s2banani.charCodeAt(i);
    h = Math.imul(h, FNV_PLIIGO);
  }
  // ⟨ ការលាយចុងក្រោយ , ដើម្បីកុំឱ្យអក្សរជិតគ្នាបង្កើតលេខជិតគ្នា 📃 ⟩
  h ^= h >>> 0o15;
  h = Math.imul(h, 0x2545F491);
  h ^= h >>> 0o13;
  return h >>> 0;
}

/*បង្ហាញគ្រាប់ពូជជាលេខមូលដ្ឋានប្រាំបី
    @param tk2ni ( number ) - លេខគ្រាប់ពូជ
@returns s2banani ( string ) */
export function semoEnBazo8( tk2ni: number ): string {
  return ( tk2ni >>> 0 ).toString(8);
}

/*បំបែកគ្រាប់ពូជមេទៅជាគ្រាប់ពូជរងតាមឆានែល
    @param tk2ni ( number ) - គ្រាប់ពូជមេ
    @param qar6xe ( number ) - លេខឆានែល , ខុសគ្នាបង្កើតស្ទ្រីមខុសគ្នា
@returns tk2ni ( number ) - គ្រាប់ពូជរង លេខ 32 ប៊ីត */
export function subSemo( tk2ni: number, qar6xe: number ): number {
  let h = ( tk2ni + Math.imul(qar6xe + 0o1, 0x9E3779B1) ) | 0;
  h ^= h >>> 0o16;
  h = Math.imul(h, 0x85EBCA77);
  h ^= h >>> 0o13;
  return h >>> 0;
}

/*បង្កើតគ្រាប់ពូជចៃដន្យថ្មីសម្រាប់ពិភពលោកថ្មី
@returns tk2ni ( number ) - លេខ 32 ប៊ីត */
export function hazardaSemo(): number {
  return ( Math.random() * 0o40000000000 ) >>> 0;
}
