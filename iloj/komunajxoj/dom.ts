// ≺⧼ ឧបករណ៍ជំនួយ DOM រួម 🪟 ⧽≻
// ឧបករណ៍ក្នុង iloj/ អាន id ថេរពីទំព័រ HTML រៀងៗខ្លួន។ ការហៅ
// document.getElementById ធម្មតាត្រឡប់ HTMLElement | null ដូច្នេះគ្រប់ការប្រើ
// ត្រូវការការត្រួតពិនិត្យដោយឡែក ប៉ុន្តែ id ដែលបាត់គឺជាកំហុសក្នុងកម្មវិធី
// ( ទំព័រ និងស្គ្រីបផ្លាស់ប្តូរជាមួយគ្នា ) មិនមែនជាស្ថានភាពពេលដំណើរការទេ។
// ឧបករណ៍ជំនួយទាំងនេះត្រឡប់ធាតុ ឬបោះកំហុសច្បាស់លាស់ភ្លាមៗ ហើយពួកវារក្សា
// ប្រភេទពិត ( HTMLInputElement, HTMLCanvasElement, ... ) ដើម្បីឱ្យការអានបន្ត
// ( .value, .checked, .getContext ) ត្រូវបានត្រួតពិនិត្យដោយកម្មវិធីបំប្លែងប្រភេទ។

// ⟪ ធាតុនីមួយៗ 📃 ⟫

/* យកធាតុតាម id របស់វា។
    @param id ( string ) - id របស់ធាតុក្នុងទំព័រ។
@returns ធាតុនោះ ( T )។ */
export function elemento<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id) as T | null;
  if ( !el ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) បាត់ធាតុ #" + id + " ក្នុងទំព័រ");
  return el;
}

/* កុងតេក្ស 2D របស់ផ្ទាំងគំនូរ ព្រោះឧបករណ៍គូរលើវាជាប្រចាំ ដូច្នេះវា
   ត្រូវតែមាន។
    @param kanvaso ( HTMLCanvasElement ) - ផ្ទាំងគំនូរ។
@returns កុងតេក្ស 2D ( CanvasRenderingContext2D )។ */
export function kunteksto2d(kanvaso: HTMLCanvasElement): CanvasRenderingContext2D {
  const k = kanvaso.getContext("2d");
  if ( !k ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) បរិបទ 2D នៃផ្ទាំងគំនូរមិនអាចប្រើបាន");
  return k;
}

// ⟪ បញ្ជី និងធាតុដែលអាចជ្រើស 📃 ⟫

/* ធាតុទាំងអស់ដែលត្រូវនឹងអ្នកជ្រើស។
    @param selektilo ( string ) - អ្នកជ្រើស CSS ណាមួយ។
    @param radiko ( ParentNode = document ) - កន្លែងស្វែងរក។
@returns ធាតុដែលត្រូវនឹង ( T[] )។ */
export function elementoj<T extends HTMLElement = HTMLElement>(selektilo: string, radiko: ParentNode = document): T[] {
  return Array.from(radiko.querySelectorAll<T>(selektilo));
}

/* ធាតុដំបូងដែលត្រូវនឹង ឬ null។ ប្រើវាតែពេលធាតុអាចបាត់បាន
   បើមិនដូច្នេះទេ elemento រក្សាកិច្ចសន្យា id។
    @param selektilo ( string ) - អ្នកជ្រើស CSS ណាមួយ។
@returns ធាតុដំបូងដែលត្រូវនឹង ( T | null )។ */
export function unua<T extends HTMLElement = HTMLElement>(selektilo: string): T | null {
  return document.querySelector<T>(selektilo);
}
