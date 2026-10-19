// ≺⧼ ចំណង់ចំណូលចិត្ត ⚙ ⧽≻
// ការកំណត់របស់អ្នកលេង ( សំឡេង · សំឡេងរំខាន · បទ · ព្រលប់ · អាកាសធាតុ ) ។
// រក្សាទុកក្នុង ( localStorage ) ដូច្នេះការផ្ទុកទំព័រឡើងវិញមិនបាត់ ។
// តម្លៃខុសប្រភេទត្រូវបានមិនយកចិត្តទុកដាក់ ៖ ដូច្នេះទិន្នន័យចាស់មិនបំផ្លាញហ្គេម ។

export type AgordaValoro = boolean | number | string;

const SXLOSILO = "aranis-agordoj";

let memoro: Record<string, AgordaValoro> | null = null;

/*អានតារាងទាំងមូលពីផ្ទុក ។ អានតែម្តង រួចរក្សាក្នុងចងចាំ
@returns tabelo តារាងតម្លៃ ( ទទេ បើគ្មាន ) */
function legiTabelon(): Record<string, AgordaValoro> {
  if ( memoro ) return memoro;
  const tabelo: Record<string, AgordaValoro> = {};
  memoro = tabelo;
  try {
    const kruda = localStorage.getItem(SXLOSILO);
    if ( !kruda ) return tabelo;
    const dato: unknown = JSON.parse(kruda);
    if ( !dato || typeof dato !== "object" ) return tabelo;
    for ( const [ klavo, valoro ] of Object.entries( dato as Record<string, unknown> ) ) {
      if ( typeof valoro === "boolean" || typeof valoro === "number" || typeof valoro === "string" ) {
        if ( typeof valoro === "number" && !Number.isFinite(valoro) ) continue;
        tabelo[klavo] = valoro;
      }
    }
  } catch { /* ផ្ទុកទំនេរ */ }
  return tabelo;
}

/*សរសេរតារាងទាំងមូលទៅផ្ទុក
    @param tabelo ( Record<string, AgordaValoro> ) - តារាងថ្មី */
function skribiTabelon( tabelo: Record<string, AgordaValoro> ): void {
  memoro = tabelo;
  try {
    localStorage.setItem(SXLOSILO, JSON.stringify(tabelo));
  } catch { /* ផ្ទុកទំនេរ */ }
}

/*អានការកំណត់មួយ ។ បើគ្មាន ឬខុសប្រភេទ ត្រឡប់តម្លៃលំនាំដើម
    @param sxlosilo ( string ) - សោការកំណត់
    @param apriora ( AgordaValoro ) - តម្លៃលំនាំដើម
@returns valoro */
export function legiAgordon<T extends AgordaValoro>( sxlosilo: string, apriora: T ): T {
  const valoro = legiTabelon()[sxlosilo];
  if ( valoro === undefined || typeof valoro !== typeof apriora ) return apriora;
  return valoro as T;
}

/*សរសេរការកំណត់មួយ ដោយរក្សាតម្លៃផ្សេងទៀតដដែល
    @param sxlosilo ( string ) - សោការកំណត់
    @param valoro ( AgordaValoro ) - តម្លៃថ្មី */
export function skribiAgordon( sxlosilo: string, valoro: AgordaValoro ): void {
  skribiTabelon({ ...legiTabelon(), [ sxlosilo ]: valoro });
}
