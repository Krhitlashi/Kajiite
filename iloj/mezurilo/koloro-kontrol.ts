// ≺⧼ ការត្រួតពិនិត្យពណ៌ 🎨 ⧽≻
// ⟨ ឧបករណ៍នេះពិនិត្យច្បាប់ពណ៌ KNAKEHE និងច្បាប់ស្រមោល ៖
//   គ្រប់ពណ៌ជា #nmnmnm , ស្រមោលជា MainColor ដក n0n0n0 , ហើយការបង្គត់
//   មិនប្តូរពណ៌ដែលបានបង្គត់រួច ។ បើមានកំហុស , ស្គ្រីបចេញកូដ ១ ។ 📃 ⟩
import {
  deksesuma, hslKanaka, kanakaKoloro, malheligi, ombraKoloro, rgbaKanaka,
} from "../../eskekoj/komunajxoj/koloroj.js";
import {
  KLINGAJ_KOLOROJ, TERENA_KOLOROJ,
} from "../../eskekoj/komunajxoj/terenkoloroj.js";

let eraroj = 0;

function kontroli(nomo: string, kondicxo: boolean): void {
  if ( kondicxo ) return;
  eraroj++;
  console.log(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${nomo}`);
}

// ⟨ ខ្ទង់ទាបនៃគ្រប់ឆានែលត្រូវជា 0 ឬ 8 📃 ⟩
function estasKanaka(koloro: number): boolean {
  if ( koloro === 0xffffff || koloro === 0x000000 ) return true;
  for ( const sovo of [ 0o20, 0o10, 0 ] ) {
    const m = ( koloro >> sovo ) & 0xf;
    if ( m !== 0 && m !== 0o10 ) return false;
  }
  return true;
}

// ⟨ តារាងពណ៌ដី និងស្លឹក ៖ គ្រប់ពណ៌ត្រូវជា KNAKEHE 📃 ⟩
for ( const [ nomo, koloro ] of Object.entries(TERENA_KOLOROJ) ) {
  kontroli(`ដី ${nomo} ${deksesuma(koloro.getHex())}`, estasKanaka(koloro.getHex()));
}
for ( let i = 0; i < KLINGAJ_KOLOROJ.length; i++ ) {
  kontroli(`ស្លឹក ${i} ${deksesuma(KLINGAJ_KOLOROJ[i].getHex())}`,
    estasKanaka(KLINGAJ_KOLOROJ[i].getHex()));
}

// ⟨ ស្រមោលថ្មត្រូវមកពីថ្ម ៖ roko ដក ៣ ជំហាន 📃 ⟩
kontroli("rokoOmbro មិនមកពី roko",
  TERENA_KOLOROJ.rokoOmbro.getHex() === ombraKoloro(TERENA_KOLOROJ.roko.getHex(), 0o3));

// ⟨ ច្បាប់ស្រមោល ៖ គ្រប់ឆានែលថយ n * 0x10 , មិនថយក្រោម 0 📃 ⟩
const BAZOJ = [ 0x686860, 0x486838, 0xffffff, 0x000000, 0xa8c0a8, 0x547442 ];
for ( const bazo of BAZOJ ) {
  const kanaka = kanakaKoloro(bazo);
  for ( let n = 0; n <= 0o17; n++ ) {
    const rezulto = ombraKoloro(bazo, n);
    kontroli(`ស្រមោលមិនមែន KNAKEHE ${deksesuma(bazo)} n=${n}`, estasKanaka(rezulto));
    const efektiva = n > 0 && bazo === 0xffffff ? 0xf8f8f8 : kanaka;
    for ( const sovo of [ 0o20, 0o10, 0 ] ) {
      const atendita = Math.max(0, ( ( efektiva >> sovo ) & 0xff ) - n * 0x10);
      const akirita = ( rezulto >> sovo ) & 0xff;
      kontroli(`ស្រមោលខុស ${deksesuma(bazo)} n=${n}`, atendita === akirita);
    }
  }
}

// ⟨ ការបង្គត់ម្តងទៀតមិនប្តូរអ្វី 📃 ⟩
for ( let i = 0; i < 0o1000; i++ ) {
  const koloro = ( Math.imul(i + 0o1, 0x9e3779b1) >>> 0 ) & 0xffffff;
  kontroli(`ការបង្គត់មិនឈប់ ${deksesuma(koloro)}`,
    kanakaKoloro(kanakaKoloro(koloro)) === kanakaKoloro(koloro));
}

// ⟨ ការបង្គត់រក្សាខ្ទង់ខ្ពស់ ៖ ខុសគ្នាតែខ្ទង់ទាប 📃 ⟩
for ( const koloro of BAZOJ ) {
  const kanaka = kanakaKoloro(koloro);
  kontroli(`ការបង្គត់ប្តូរខ្ទង់ខ្ពស់ ${deksesuma(koloro)}`,
    koloro === 0xffffff || koloro === 0x000000
      || ( kanaka & 0xf0f0f0 ) === ( koloro & 0xf0f0f0 ));
}

// ⟨ malheligi ត្រូវជាស្រមោលដក មិនមែនគុណ 📃 ⟩
const malhela = malheligi("#686860", 0o6/0o10);
kontroli("malheligi មិនមែន KNAKEHE", estasKanaka(parseInt(malhela.slice(1), 0o20)));
kontroli("malheligi មិនមែនការដក",
  malhela === deksesuma(ombraKoloro(0x686860, Math.round(0o2/0o10 * 0xff / 0x10))));

// ⟨ HSL ត្រូវបម្លែងទៅ RGB រួចបង្គត់ ៖ ក្រហម , បៃតង , ខៀវ 📃 ⟩
for ( const h of [ 0, 0o170, 0o360 ] ) {
  kontroli(`hslKanaka មិនមែន KNAKEHE ${h}`,
    estasKanaka(hslKanaka(h, 0o7/0o10, 0o72/0o100)));
}
const rugxa = hslKanaka(0, 0o7/0o10, 0o72/0o100);
kontroli("hslKanaka ក្រហមខុស", ( ( rugxa >> 0o20 ) & 0xff ) > ( ( rugxa >> 0o10 ) & 0xff ));

// ⟨ rgbaKanaka ត្រូវបញ្ចេញឆានែល KNAKEHE 📃 ⟩
const rgba = rgbaKanaka(0x547442, 0o5/0o10);
const nombroj = rgba.match(/\d+/g)?.slice(0, 0o3).map(Number) ?? [];
const kanalaKanaka = ( c: number ): boolean => ( c & 0xf ) === 0 || ( c & 0xf ) === 0o10;
kontroli("rgbaKanaka មានឆានែលខុស",
  nombroj.length === 0o3 && nombroj.every(kanalaKanaka));

console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ពណ៌ KNAKEHE ៖ ខុស ${eraroj}`);
if ( eraroj > 0 ) process.exitCode = 1;
