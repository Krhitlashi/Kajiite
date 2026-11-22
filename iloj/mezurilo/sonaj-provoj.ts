// ≺⧼ គំរូសំឡេង 🗣️ ⧽≻
// ⟨ បោះពុម្ពការបម្លែង Gawekiif -> IPA -> អក្សរឡាតាំង ។
// ឧបករណ៍នេះមិនប៉ះពាល់ដល់ឧបករណ៍វាស់ផ្សេងទេ ៖ មុខងារភាសានៅស្ងៀម ពេលគេហៅ ។ 📃 ⟩
import { gkAlIpa, ipaAlLingvo } from "../../kantaoj/lingvo/sonaj-reguloj.js";

const PROVOJ: [ string, string ][] = [
  [ "konstruNomo0", "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ꞇ ŋᷠᴜ }ʃɹ" ],
  [ "konstruNomo1", "ſɭᴜ ſןɹ" ],
  [ "konstruNomo15", "j͐ʃᴜ ŋᷠɹⰱ" ],
  [ "konstruNomo22", "ſɟᴜ ſᶘɔ ɭl̀ɹȝ" ],
  [ "konstruTipoTuro", "ſןᴜȝ ᶅſw ſɭɹ" ],
  [ "konstruNomo33", "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ" ],
];

for ( const [ ksaka, gk ] of PROVOJ ) {
  const ipa = gkAlIpa(gk);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka} gk="${gk}" ipa="${ipa}"`);
  for ( const lg of [ "eo", "en", "ja", "km" ] )
    console.log(`   ( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${lg} ${ipaAlLingvo(ipa, lg)}`);
}
