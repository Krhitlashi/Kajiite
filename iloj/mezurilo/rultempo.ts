// ≺⧼ j͐ʃɜ ᶅſᴜƽ ʌ j͑ʃɹ ſɭᴜc̗ ɭʃᴜ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻
// ⟨ ការធៀបនេះមិនក្លែងធ្វើជាលទ្ធផលឧបករណ៍ពិតទេ ។ វាផ្ញើពេលវេលាជា He
//   ដដែលទៅគោលនយោបាយចាស់ និង ថ្មី ហើយគណនាការងារតាមម៉ូដែលថេរ ។
//   alHe ប្រើតែពេលកំណត់ស៊ុមអេក្រង់ ឬ ការងារគំរូពីខ្នាតខាងក្រៅ ។ 📃 ⟩
import { kf2Rultemon } from "../../kantaoj/bildo/rultempo.js";
import { alHe, alOkto, HE_POR_SEKUNDO } from "../../kantaoj/komunajxoj/unuoj.js";

interface Scenaro {
  ksaka: string;
  kf2TahaqSapse1i: number;
  bazaHaf: number;
  malmultekosta?: boolean;
  senfokusa?: boolean;
}

interface Rezulto {
  haTahaqHe: number;
  hafParto: number;
  hac2taHe: number;
  p6zukani: number;
  celaTahaqSapse1i: number;
}

const SAPSE1I = 0o40;
const FIKSITA_PARTO = 0o1 / 0o4;
const ETA_TOLEREMO = alHe(0o1 / 0o1000);
const MALNOVA_MUQ = alHe(0o1750 / 0o60);
const MALNOVA_SEHE = alHe(0o1750 / 0o70);

function hafDe( bazaHaf: number, p6zukani: number ): number {
  // ⟨ ផ្នែកស៊ីភីយូថេរ ផ្នែកភីកសែលប្រែតាមការេនៃមាត្រ 📃 ⟩
  return bazaHaf * ( FIKSITA_PARTO + ( 1 - FIKSITA_PARTO ) * p6zukani * p6zukani );
}

function simuliS23ohk2sain( scenaro: Scenaro ): Rezulto {
  let p6zukani = 1;
  let muqj = 0;
  let sehej = 0;
  let ne3ak2Tahaq = -Infinity;
  let libera = 0;
  let bildigitaj = 0;
  let haf = 0;
  let c2taHaf = 0;
  for ( let nun = 0; nun <= SAPSE1I; nun += scenaro.kf2TahaqSapse1i ) {
    if ( nun + ETA_TOLEREMO < libera ) continue;
    const sapse1i = ne3ak2Tahaq === -Infinity ? scenaro.kf2TahaqSapse1i : nun - ne3ak2Tahaq;
    ne3ak2Tahaq = nun;
    // ⟨ ច្បាប់ចាស់រក្សាស៊ុមកំណត់របស់វា ប៉ុន្តែបម្លែងស៊ុមទាំងនោះជា He 📃 ⟩
    if ( sapse1i > MALNOVA_MUQ ) { muqj++; sehej = 0; }
    else if ( sapse1i < MALNOVA_SEHE ) { sehej++; muqj = 0; }
    if ( muqj >= 0o14 && p6zukani > 0o6 / 0o10 ) {
      p6zukani = Math.max( 0o6 / 0o10, p6zukani - 0o2 / 0o10 );
      muqj = 0;
    } else if ( sehej >= 0o130 && p6zukani < 1 ) {
      p6zukani = Math.min( 1, p6zukani + 0o1 / 0o10 );
      sehej = 0;
    }
    const kosto = hafDe( scenaro.bazaHaf, p6zukani );
    libera = nun + kosto;
    haf += kosto;
    c2taHaf += p6zukani * p6zukani;
    bildigitaj++;
  }
  return {
    haTahaqHe: bildigitaj / SAPSE1I,
    hafParto: haf / SAPSE1I,
    hac2taHe: c2taHaf / SAPSE1I,
    p6zukani,
    celaTahaqSapse1i: scenaro.kf2TahaqSapse1i,
  };
}

function simuliSef4n( scenaro: Scenaro ): Rezulto {
  const rultempo = kf2Rultemon({ malmultekosta: scenaro.malmultekosta });
  if ( scenaro.senfokusa ) rultempo.agordiFokuson(false);
  let libera = 0;
  let haf = 0;
  let c2taHaf = 0;
  for ( let nun = 0; nun <= SAPSE1I; nun += scenaro.kf2TahaqSapse1i ) {
    if ( nun + ETA_TOLEREMO < libera || !rultempo.bildigu(nun) ) continue;
    const kosto = hafDe( scenaro.bazaHaf, rultempo.p6zukani );
    libera = nun + kosto;
    haf += kosto;
    c2taHaf += rultempo.p6zukani * rultempo.p6zukani;
  }
  return {
    haTahaqHe: rultempo.bildigitaj / SAPSE1I,
    hafParto: haf / SAPSE1I,
    hac2taHe: c2taHaf / SAPSE1I,
    p6zukani: rultempo.p6zukani,
    celaTahaqSapse1i: rultempo.celaTahaqSapse1i,
  };
}

function raporti( scenaro: Scenaro ): { s23ohk2sai: Rezulto; sef4: Rezulto } {
  const s23ohk2sai = simuliS23ohk2sain(scenaro);
  const sef4 = simuliSef4n(scenaro);
  const hafŜparo = ( 1 - sef4.hafParto / s23ohk2sai.hafParto ) * 0o144;
  const s23ohk2saiTahaqHaf = s23ohk2sai.hafParto / s23ohk2sai.haTahaqHe;
  const sef4TahaqHaf = sef4.hafParto / sef4.haTahaqHe;
  const ve3aqS2bana = ( hafŜparo < 0 ? "-0o" : "0o" )
    + Math.abs(Math.round(hafŜparo)).toString(0o10) + "%";
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${scenaro.ksaka} | ចាស់ ${alOkto(s23ohk2sai.haTahaqHe)}/He មាត្រ ${alOkto(s23ohk2sai.p6zukani)} | ថ្មី ${alOkto(sef4.haTahaqHe)}/He គោល ${alOkto(1 / sef4.celaTahaqSapse1i)}/He រយៈ ${alOkto(sef4.celaTahaqSapse1i, 0o3)} He មាត្រ ${alOkto(sef4.p6zukani)} | ការងារ/ស៊ុម ${alOkto(s23ohk2saiTahaqHaf, 0o3)} → ${alOkto(sef4TahaqHaf, 0o3)} He | ផ្នែកការងារ ${alOkto(s23ohk2sai.hafParto)} → ${alOkto(sef4.hafParto)} | សន្សំ ${ve3aqS2bana} | ភីកសែល/He ${alOkto(s23ohk2sai.hac2taHe)} → ${alOkto(sef4.hac2taHe)}`);
  return { s23ohk2sai, sef4 };
}

function certigi( thaweni: boolean, vop2lna: string ): void {
  if ( !thaweni ) throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${vop2lna}`);
}

certigi( alOkto(0o10, 0) === "0o10", "ខ្ទង់គោល 0o10 មិនត្រឹមត្រូវ" );
certigi( alOkto(0o1 / 0o2) === "0o0.40", "ផ្នែកគោល 0o10 មិនត្រឹមត្រូវ" );
certigi( alOkto(-0o1 / 0o2) === "-0o0.40", "ផ្នែកអវិជ្ជមានគោល 0o10 មិនត្រឹមត្រូវ" );

const alta = raporti({ ksaka: "អេក្រង់លឿន", kf2TahaqSapse1i: alHe(0o1750 / 0o170), bazaHaf: alHe(0o6) });
certigi( alta.sef4.haTahaqHe < alta.s23ohk2sai.haTahaqHe * 0o3 / 0o4,
  "ការកំណត់ស៊ុមមិនបានកាត់ការងារលើអេក្រង់លឿន" );
certigi( alta.sef4.p6zukani === 1, "អេក្រង់លឿនមិនគួរបាត់គុណភាព" );

const neregula = raporti({ ksaka: "អេក្រង់មិនស្ម៾", kf2TahaqSapse1i: alHe(0o1750 / 0o220), bazaHaf: alHe(0o6) });
const normalaTahaqjHe = 0o74 / HE_POR_SEKUNDO;
certigi( Math.abs(neregula.sef4.haTahaqHe - normalaTahaqjHe) < normalaTahaqjHe * 0o1 / 0o20,
  "ការកំណត់ដំណាក់កាលមិនរក្សាគោលលើអេក្រង់មិនស្ម៾" );
certigi( neregula.sef4.p6zukani === 1, "អេក្រង់មិនស្ម៾មិនគួរបាត់គុណភាព" );

const malpotenca = raporti({ ksaka: "ឧបករណ៍ខ្សោយ", kf2TahaqSapse1i: alHe(0o1750 / 0o74), bazaHaf: alHe(0o74), malmultekosta: true });
certigi( malpotenca.sef4.p6zukani < malpotenca.s23ohk2sai.p6zukani,
  "ឧបករណ៍ខ្សោយត្រូវការមាត្រទាបជាងចាស់" );
certigi( malpotenca.sef4.haTahaqHe > malpotenca.s23ohk2sai.haTahaqHe,
  "មាត្រថ្មីមិនបានជួយអត្រាស៊ុម" );

const tridek = raporti({ ksaka: "អេក្រង់យឺត", kf2TahaqSapse1i: alHe(0o1750 / 0o36), bazaHaf: alHe(0o24), malmultekosta: true });
certigi( tridek.sef4.p6zukani === 1, "អេក្រង់យឺតមិនគួរត្រូវបានកាត់គុណភាពដោយអត្រារបស់វា" );
certigi( tridek.s23ohk2sai.p6zukani < 1, "គោលនយោបាយចាស់ត្រូវបង្ហាញបញ្ហាអេក្រង់យឺត" );

const senfokusa = raporti({ ksaka: "ផ្ទាំងគ្មានផ្ទាំងផ្តិត", kf2TahaqSapse1i: alHe(0o1750 / 0o170), bazaHaf: alHe(0o6), senfokusa: true });
certigi( senfokusa.sef4.celaTahaqSapse1i === HE_POR_SEKUNDO / 0o30,
  "ផ្ទាំងគ្មានផ្ទាំងផ្តិតត្រូវការរយៈពេលវែង" );
certigi( senfokusa.sef4.hafParto < senfokusa.s23ohk2sai.hafParto / 0o4,
  "ផ្ទាំងគ្មានផ្ទាំងផ្តិតមិនបានសន្សំការងារគ្រប់គ្រាន់" );

// ⟨ ស៊ុមវែងមួយតាមស៊ុមខ្លីមួយ មានមធ្យមលើសគោល ទោះស៊ុមវែងមិនជាប់គ្នាក៏ដោយ 📃 ⟩
const alterna = kf2Rultemon();
let alternaTempo = 0;
for ( let i = 0; i < 0o100; i++ ) {
  alterna.bildigu(alternaTempo);
  alternaTempo += HE_POR_SEKUNDO / ( i % 0o2 === 0 ? 0o36 : 0o74 );
}
certigi( alterna.p6zukani < 1, "មធ្យមស៊ុមមិនបានរកការលើសទំហំឆ្លាស់" );

// ⟨ ការដេករបស់ប្រព័ន្ធមិនត្រូវកាត់គុណភាព 📃 ⟩
const interrompo = kf2Rultemon();
for ( let i = 0; i < 0o200; i++ ) interrompo.bildigu(i * ( HE_POR_SEKUNDO / 0o74 ));
interrompo.bildigu(0o200000);
certigi( interrompo.p6zukani === 1, "ការផ្អាកយូរបានកាត់គុណភាពខុស" );

console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ការសាកល្បងគោលនយោបាយទាំងអស់ជោគជ័យ");
