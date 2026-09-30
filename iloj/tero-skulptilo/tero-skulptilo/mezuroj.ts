// ≺⧼ រង្វាស់ 📏 ⧽≻
// ធរណីមាត្ររបស់ផ្ទាំងគំនូរពិភពលោក គឺទទឹងពិភពលោក គុណភាពភិចសែល និង
// ការបំប្លែងរវាងពិភពលោក និងភិចសែល។ ការដុត 2D ( bako.js ) ទិដ្ឋភាព និង
// ព្រឹត្តិការណ៍ប្រើវា។ ផែនទីបង្ហាញខាងជើងនៅខាងលើ និងខាងកើតនៅខាងស្តាំ
// គឺការតម្រង់ទិសដូចផែនទីតូចរបស់ហ្គេម។
export const MONDO = 0o1400;                           // 768 គឺទទឹងពិភពលោក [ -384, 384 )
export const MONDO_HALFO = 0o600;                      // 384 ។ ពាក់កណ្តាលទទឹងពិភពលោក
export const REZ = 0o1400;                             // 768 គឺភិចសែលលើផ្ទាំងគំនូរពិភពលោក

// KradaRektangulo គឺចតុកោណកែងរបស់សំណាញ់ ដែលជក់ ឬការធ្វើបច្ចុប្បន្នភាព 3D បានប៉ះ
// ( លេខក្រឡាសំណាញ់ ix0..ix1 និង iz0..iz1 )។
export interface KradaRektangulo {
  ix0: number;
  ix1: number;
  iz0: number;
  iz1: number;
}

/* ពិភពលោក x ទៅភិចសែលរបស់ផ្ទាំងគំនូរ ( ខាងកើតនៅខាងស្តាំ )។
    @param x ( number ) - ពិភពលោក x។
@returns ជួរឈររបស់ផ្ទាំងគំនូរ ( number )។ */
export function mondoxAlPikselo(x: number): number { return Math.round(( MONDO_HALFO - x ) / MONDO * REZ); }

/* ពិភពលោក z ទៅភិចសែលរបស់ផ្ទាំងគំនូរ ( ខាងជើងនៅខាងលើ ដូច្នេះអ័ក្ស z ត្រឡប់ )។
    @param z ( number ) - ពិភពលោក z។
@returns ជួររបស់ផ្ទាំងគំនូរ ( number )។ */
export function mondozAlPikselo(z: number): number { return Math.round(( MONDO_HALFO - z ) / MONDO * REZ); }
