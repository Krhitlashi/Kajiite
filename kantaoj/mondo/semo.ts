// ≺⧼ គ្រាប់ពូជ 🎲 ⧽≻
// បំប្លែងអក្សរគ្រាប់ពូជទៅលេខ 32 ប៊ីត ហើយបំបែកវាទៅជាស្ទ្រីម
// ដោយឡែក។ ឯកសារនេះសុទ្ធ ( គ្មាន DOM , គ្មានផ្ទុកក្នុងម៉ាស៊ីន ) ដូច្នេះ
// ឧបករណ៍ខាងក្រៅ និងការធ្វើតេស្តអាចនាំចូលបាន ។

// ⟨ ថេរិន FNV ់ 📃 ⟩
const FNV_KOMENCO = 0x811C9DC5;
const FNV_PLIIGO = 0x01000193;

/*ញែកលេខគ្រាប់ពូជចេញពីអក្សរណាមួយ
    @param teksto ( string ) - អក្សរគ្រាប់ពូជ
        Example. semoDeTeksto("kajiite").
@returns semo ( number ) - លេខ 32 ប៊ីត មិនអវិជ្ជមាន */
export function semoDeTeksto( teksto: string ): number {
  let h = FNV_KOMENCO;
  for ( let i = 0; i < teksto.length; i++ ) {
    h ^= teksto.charCodeAt(i);
    h = Math.imul(h, FNV_PLIIGO);
  }
  // ⟨ ការលាយចុងក្រោយ , ដើម្បីកុំឱ្យអក្សរជិតគ្នាបង្កើតលេខជិតគ្នា 📃 ⟩
  h ^= h >>> 0o15;
  h = Math.imul(h, 0x2545F491);
  h ^= h >>> 0o13;
  return h >>> 0;
}

/*បង្ហាញគ្រាប់ពូជជាលេខមូលដ្ឋានប្រាំបី
    @param semo ( number ) - លេខគ្រាប់ពូជ
@returns teksto ( string ) */
export function semoEnBazo8( semo: number ): string {
  return ( semo >>> 0 ).toString(8);
}

/*បំបែកគ្រាប់ពូជមេទៅជាគ្រាប់ពូជរងតាមឆានែល
    @param semo ( number ) - គ្រាប់ពូជមេ
    @param kanalo ( number ) - លេខឆានែល , ខុសគ្នាបង្កើតស្ទ្រីមខុសគ្នា
@returns semo ( number ) - គ្រាប់ពូជរង លេខ 32 ប៊ីត */
export function subSemo( semo: number, kanalo: number ): number {
  let h = ( semo + Math.imul(kanalo + 0o1, 0x9E3779B1) ) | 0;
  h ^= h >>> 0o16;
  h = Math.imul(h, 0x85EBCA77);
  h ^= h >>> 0o13;
  return h >>> 0;
}

/*បង្កើតគ្រាប់ពូជចៃដន្យថ្មីសម្រាប់ពិភពលោកថ្មី
@returns semo ( number ) - លេខ 32 ប៊ីត */
export function hazardaSemo(): number {
  return ( Math.random() * 0o40000000000 ) >>> 0;
}
