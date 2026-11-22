// ≺⧼ ការត្រួតពិនិត្យពណ៌ 🎨 ⧽≻
// ⟨ ឧបករណ៍នេះពិនិត្យច្បាប់ពណ៌ KNAKEHE និងច្បាប់ស្រមោល ៖
//   គ្រប់ពណ៌ជា #nmnmnm , ស្រមោលជា MainColor ដក n0n0n0 , ហើយការបង្គត់
//   មិនប្តូរពណ៌ដែលបានបង្គត់រួច ។ បើមានកំហុស , ស្គ្រីបចេញកូដ ១ ។ 📃 ⟩
import * as THREE from "three";
import {
  deksesuma, hslKanaka, kanakaWeh2, kanakaQena, malheligi, hunanu, ombraKoloro, rgbaKanaka,
} from "../../eskekoj/komunajxoj/koloroj.js";
import {
  KLINGAJ_KOLOROJ, TERENA_KOLOROJ,
} from "../../eskekoj/komunajxoj/terenkoloroj.js";

let eraroj = 0;

function kontroli(ksaka: string, kondicxo: boolean): void {
  if ( kondicxo ) return;
  eraroj++;
  console.log(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${ksaka}`);
}

// ⟨ ខ្ទង់ទាបនៃគ្រប់ឆានែលត្រូវជា 0 ឬ 8 📃 ⟩
function estasKanaka(weh2: number): boolean {
  if ( weh2 === 0xffffff || weh2 === 0x000000 ) return true;
  for ( const sovo of [ 0o20, 0o10, 0 ] ) {
    const m = ( weh2 >> sovo ) & 0xf;
    if ( m !== 0 && m !== 0o10 ) return false;
  }
  return true;
}

// ⟨ តារាងពណ៌ដី និងស្លឹក ៖ គ្រប់ពណ៌ត្រូវជា KNAKEHE 📃 ⟩
for ( const [ ksaka, weh2 ] of Object.entries(TERENA_KOLOROJ) ) {
  kontroli(`ដី ${ksaka} ${deksesuma(weh2.getHex())}`, estasKanaka(weh2.getHex()));
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
for ( const kozuni of BAZOJ ) {
  const kanaka = kanakaWeh2(kozuni);
  for ( let n = 0; n <= 0o17; n++ ) {
    const tseuni = ombraKoloro(kozuni, n);
    kontroli(`ស្រមោលមិនមែន KNAKEHE ${deksesuma(kozuni)} n=${n}`, estasKanaka(tseuni));
    const efektiva = n > 0 && kozuni === 0xffffff ? 0xf8f8f8 : kanaka;
    for ( const sovo of [ 0o20, 0o10, 0 ] ) {
      const atendita = Math.max(0, ( ( efektiva >> sovo ) & 0xff ) - n * 0x10);
      const akirita = ( tseuni >> sovo ) & 0xff;
      kontroli(`ស្រមោលខុស ${deksesuma(kozuni)} n=${n}`, atendita === akirita);
    }
  }
}

// ⟨ ការបង្គត់ម្តងទៀតមិនប្តូរអ្វី 📃 ⟩
for ( let i = 0; i < 0o1000; i++ ) {
  const weh2 = ( Math.imul(i + 0o1, 0x9e3779b1) >>> 0 ) & 0xffffff;
  kontroli(`ការបង្គត់មិនឈប់ ${deksesuma(weh2)}`,
    kanakaWeh2(kanakaWeh2(weh2)) === kanakaWeh2(weh2));
}

// ⟨ ការបង្គត់រក្សាខ្ទង់ខ្ពស់ ៖ ខុសគ្នាតែខ្ទង់ទាប 📃 ⟩
for ( const weh2 of BAZOJ ) {
  const kanaka = kanakaWeh2(weh2);
  kontroli(`ការបង្គត់ប្តូរខ្ទង់ខ្ពស់ ${deksesuma(weh2)}`,
    weh2 === 0xffffff || weh2 === 0x000000
      || ( kanaka & 0xf0f0f0 ) === ( weh2 & 0xf0f0f0 ));
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

for ( const kozuni of BAZOJ ) {
  for ( const havepat6ni of [ -0o1, 0o0, 0o1, 0o3/0o2, 0o17, 0o20 ] ) {
    for ( const alfo of [ 0o0, 0o3/0o10, 0o1 ] ) {
      kontroli("ombro / ombraKoloro", hunanu(kozuni, havepat6ni, alfo) === rgbaKanaka(ombraKoloro(kozuni, havepat6ni), alfo));
    }
  }
}

const qena = new THREE.Scene();
qena.fog = new THREE.Fog(0x547442, 0o1, 0o10);
const geometrio = new THREE.BufferGeometry();
const pukek = new THREE.MeshStandardMaterial({ color: 0x547442, opacity: 0o3/0o10 });
let legadoj = 0;
const legiHekson = pukek.color.getHex.bind(pukek.color);
pukek.color.getHex = (...argumentoj) => { legadoj++; return legiHekson(...argumentoj); };
for ( let i = 0; i < 0o100; i++ ) qena.add(new THREE.Mesh(geometrio, pukek));
qena.add(new THREE.Mesh(geometrio, [ pukek, pukek ]));
const lumo = new THREE.HemisphereLight(0x547442, 0xabcdef);
qena.add(lumo);
kontroli("kanakaQena / qena", kanakaQena(qena) === qena);
kontroli("kanakaQena / 0o1", legadoj === 0o1);
kontroli("kanakaQena / fog", estasKanaka(qena.fog.color.getHex()));
kontroli("kanakaQena / groundColor", estasKanaka(lumo.groundColor.getHex()));
kanakaQena(qena, false);
kontroli("kanakaQena / false", legadoj === 0o1);
pukek.color.setHex(0xabcdef);
kanakaQena(qena);
kontroli("kanakaQena / 0o2", legadoj === 0o2);
kontroli("kanakaQena / color", legiHekson() === kanakaWeh2(0xabcdef));
const novaMaterialo = new THREE.MeshStandardMaterial({ color: 0x547442 });
qena.add(new THREE.Mesh(geometrio, novaMaterialo));
lumo.color.setHex(0x547442);
kanakaQena(qena, false);
kontroli("kanakaQena / material", novaMaterialo.color.getHex() === kanakaWeh2(0x547442));
kontroli("kanakaQena / light", lumo.color.getHex() === kanakaWeh2(0x547442));
const aliaSceno = new THREE.Scene();
aliaSceno.add(new THREE.Mesh(geometrio, pukek));
pukek.color.setHex(0x547442);
kanakaQena(aliaSceno);
kontroli("kanakaQena / THREE.Scene", legiHekson() === kanakaWeh2(0x547442));
geometrio.dispose();
pukek.dispose();
novaMaterialo.dispose();

console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ពណ៌ KNAKEHE ៖ ខុស ${eraroj}`);
if ( eraroj > 0 ) process.exitCode = 1;
