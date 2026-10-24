// ≺⧼ គំរូសំឡេង 🗣️ ⧽≻
// ⟨ បោះពុម្ពការបម្លែង Gawekiif -> IPA -> អក្សរឡាតាំង ។
// ឧបករណ៍នេះមិនប៉ះពាល់ដល់ឧបករណ៍វាស់ផ្សេងទេ ៖ មុខងារភាសានៅស្ងៀម ពេលគេហៅ ។ 📃 ⟩
import { gkAlIpa, ipaAlLingvo } from "../../kantaoj/lingvo/sonaj-reguloj.js";

const PROVOJ: [ string, string ][] = [
  [ "paq0", "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ꞇ ŋᷠᴜ }ʃɹ" ],
  [ "paq1", "ſɭᴜ ſןɹ" ],
  [ "paq15", "j͐ʃᴜ ŋᷠɹⰱ" ],
  [ "paq22", "ſɟᴜ ſᶘɔ ɭl̀ɹȝ" ],
  [ "tipTuro", "ſןᴜȝ ᶅſw ſɭɹ" ],
  [ "paq33", "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ" ],
];

for ( const [ nomo, gk ] of PROVOJ ) {
  const ipa = gkAlIpa(gk);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${nomo} gk="${gk}" ipa="${ipa}"`);
  for ( const lg of [ "eo", "en", "ja", "km" ] )
    console.log(`   ( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${lg} ${ipaAlLingvo(ipa, lg)}`);
}
