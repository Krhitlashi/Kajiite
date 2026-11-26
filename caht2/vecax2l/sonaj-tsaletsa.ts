// ≺⧼ j͑ʃɜ }ʃᴜ ɭl̀ꝛ̗ j͐ʃɔ ſᶘᴜ 🧪 ⧽≻

import { gkAlIpa, ipaAlGawe } from "../../kanta/gawe/boleS2kanta.js";

const PROK6H6: [ string, string ][] = [
  [ "vepaqNomo0", "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ꞇ ŋᷠᴜ }ʃɹ" ],
  [ "vepaqNomo1", "ſɭᴜ ſןɹ" ],
  [ "vepaqNomo15", "j͐ʃᴜ ŋᷠɹⰱ" ],
  [ "vepaqNomo22", "ſɟᴜ ſᶘɔ ɭl̀ɹȝ" ],
  [ "vepaqHunaqTuro", "ſןᴜȝ ᶅſw ſɭɹ" ],
  [ "vepaqNomo33", "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ" ],
];

for ( const [ ksaka, gk ] of PROK6H6 ) {
  const ipa = gkAlIpa(gk);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka} gk="${gk}" ipa="${ipa}"`);
  for ( const lg of [ "eo", "en", "ja", "km" ] )
    console.log(`   ( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${lg} ${ipaAlGawe(ipa, lg)}`);
}
