// ≺⧼ ការវាស់គោលនយោបាយស៊ុម 📏 ⧽≻
// ⟨ ការធៀបនេះមិនក្លែងធ្វើជាលទ្ធផលឧបករណ៍ពិតទេ ។ វាផ្ញើពេលវេលាជា He
//   ដដែលទៅគោលនយោបាយចាស់ និង ថ្មី ហើយគណនាការងារតាមម៉ូដែលថេរ ។
//   alHe ប្រើតែពេលកំណត់ស៊ុមអេក្រង់ ឬ ការងារគំរូពីខ្នាតខាងក្រៅ ។ 📃 ⟩
import { kreiRultemon } from "../../kantaoj/bildo/rultempo.js";
import { alHe, alOkto, HE_POR_SEKUNDO } from "../../kantaoj/komunajxoj/unuoj.js";

interface Scenaro {
  ksaka: string;
  refreŝaDaŭro: number;
  bazaLaboro: number;
  malmultekosta?: boolean;
  senfokusa?: boolean;
}

interface Rezulto {
  kadrojHe: number;
  laboraParto: number;
  pikselojHe: number;
  p6zukani: number;
  celaKadraDaŭro: number;
}

const DAŬRO = 0o40;
const FIKSITA_PARTO = 0o1 / 0o4;
const ETA_TOLEREMO = alHe(0o1 / 0o1000);
const MALNOVA_MALRAPIDA = alHe(0o1750 / 0o60);
const MALNOVA_RAPIDA = alHe(0o1750 / 0o70);

function laboroDe( bazaLaboro: number, p6zukani: number ): number {
  // ⟨ ផ្នែកស៊ីភីយូថេរ ផ្នែកភីកសែលប្រែតាមការេនៃមាត្រ 📃 ⟩
  return bazaLaboro * ( FIKSITA_PARTO + ( 1 - FIKSITA_PARTO ) * p6zukani * p6zukani );
}

function simuliMalnovan( scenaro: Scenaro ): Rezulto {
  let p6zukani = 1;
  let malrapidaj = 0;
  let rapidaj = 0;
  let antaŭaKadro = -Infinity;
  let libera = 0;
  let bildigitaj = 0;
  let laboro = 0;
  let pikselaLaboro = 0;
  for ( let nun = 0; nun <= DAŬRO; nun += scenaro.refreŝaDaŭro ) {
    if ( nun + ETA_TOLEREMO < libera ) continue;
    const daŭro = antaŭaKadro === -Infinity ? scenaro.refreŝaDaŭro : nun - antaŭaKadro;
    antaŭaKadro = nun;
    // ⟨ ច្បាប់ចាស់រក្សាស៊ុមកំណត់របស់វា ប៉ុន្តែបម្លែងស៊ុមទាំងនោះជា He 📃 ⟩
    if ( daŭro > MALNOVA_MALRAPIDA ) { malrapidaj++; rapidaj = 0; }
    else if ( daŭro < MALNOVA_RAPIDA ) { rapidaj++; malrapidaj = 0; }
    if ( malrapidaj >= 0o14 && p6zukani > 0o6 / 0o10 ) {
      p6zukani = Math.max( 0o6 / 0o10, p6zukani - 0o2 / 0o10 );
      malrapidaj = 0;
    } else if ( rapidaj >= 0o130 && p6zukani < 1 ) {
      p6zukani = Math.min( 1, p6zukani + 0o1 / 0o10 );
      rapidaj = 0;
    }
    const kosto = laboroDe( scenaro.bazaLaboro, p6zukani );
    libera = nun + kosto;
    laboro += kosto;
    pikselaLaboro += p6zukani * p6zukani;
    bildigitaj++;
  }
  return {
    kadrojHe: bildigitaj / DAŬRO,
    laboraParto: laboro / DAŬRO,
    pikselojHe: pikselaLaboro / DAŬRO,
    p6zukani,
    celaKadraDaŭro: scenaro.refreŝaDaŭro,
  };
}

function simuliNovan( scenaro: Scenaro ): Rezulto {
  const rultempo = kreiRultemon({ malmultekosta: scenaro.malmultekosta });
  if ( scenaro.senfokusa ) rultempo.agordiFokuson(false);
  let libera = 0;
  let laboro = 0;
  let pikselaLaboro = 0;
  for ( let nun = 0; nun <= DAŬRO; nun += scenaro.refreŝaDaŭro ) {
    if ( nun + ETA_TOLEREMO < libera || !rultempo.bildigu(nun) ) continue;
    const kosto = laboroDe( scenaro.bazaLaboro, rultempo.p6zukani );
    libera = nun + kosto;
    laboro += kosto;
    pikselaLaboro += rultempo.p6zukani * rultempo.p6zukani;
  }
  return {
    kadrojHe: rultempo.bildigitaj / DAŬRO,
    laboraParto: laboro / DAŬRO,
    pikselojHe: pikselaLaboro / DAŬRO,
    p6zukani: rultempo.p6zukani,
    celaKadraDaŭro: rultempo.celaKadraDaŭro,
  };
}

function raporti( scenaro: Scenaro ): { malnova: Rezulto; sef4: Rezulto } {
  const malnova = simuliMalnovan(scenaro);
  const sef4 = simuliNovan(scenaro);
  const laboraŜparo = ( 1 - sef4.laboraParto / malnova.laboraParto ) * 0o144;
  const malnovaKadraLaboro = malnova.laboraParto / malnova.kadrojHe;
  const novaKadraLaboro = sef4.laboraParto / sef4.kadrojHe;
  const ŝparaTeksto = ( laboraŜparo < 0 ? "-0o" : "0o" )
    + Math.abs(Math.round(laboraŜparo)).toString(0o10) + "%";
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${scenaro.ksaka} | ចាស់ ${alOkto(malnova.kadrojHe)}/He មាត្រ ${alOkto(malnova.p6zukani)} | ថ្មី ${alOkto(sef4.kadrojHe)}/He គោល ${alOkto(1 / sef4.celaKadraDaŭro)}/He រយៈ ${alOkto(sef4.celaKadraDaŭro, 0o3)} He មាត្រ ${alOkto(sef4.p6zukani)} | ការងារ/ស៊ុម ${alOkto(malnovaKadraLaboro, 0o3)} → ${alOkto(novaKadraLaboro, 0o3)} He | ផ្នែកការងារ ${alOkto(malnova.laboraParto)} → ${alOkto(sef4.laboraParto)} | សន្សំ ${ŝparaTeksto} | ភីកសែល/He ${alOkto(malnova.pikselojHe)} → ${alOkto(sef4.pikselojHe)}`);
  return { malnova, sef4 };
}

function certigi( kondiĉo: boolean, mesaĝo: string ): void {
  if ( !kondiĉo ) throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${mesaĝo}`);
}

certigi( alOkto(0o10, 0) === "0o10", "ខ្ទង់គោល 0o10 មិនត្រឹមត្រូវ" );
certigi( alOkto(0o1 / 0o2) === "0o0.40", "ផ្នែកគោល 0o10 មិនត្រឹមត្រូវ" );
certigi( alOkto(-0o1 / 0o2) === "-0o0.40", "ផ្នែកអវិជ្ជមានគោល 0o10 មិនត្រឹមត្រូវ" );

const alta = raporti({ ksaka: "អេក្រង់លឿន", refreŝaDaŭro: alHe(0o1750 / 0o170), bazaLaboro: alHe(0o6) });
certigi( alta.sef4.kadrojHe < alta.malnova.kadrojHe * 0o3 / 0o4,
  "ការកំណត់ស៊ុមមិនបានកាត់ការងារលើអេក្រង់លឿន" );
certigi( alta.sef4.p6zukani === 1, "អេក្រង់លឿនមិនគួរបាត់គុណភាព" );

const neregula = raporti({ ksaka: "អេក្រង់មិនស្ម៾", refreŝaDaŭro: alHe(0o1750 / 0o220), bazaLaboro: alHe(0o6) });
const normalaKadrojHe = 0o74 / HE_POR_SEKUNDO;
certigi( Math.abs(neregula.sef4.kadrojHe - normalaKadrojHe) < normalaKadrojHe * 0o1 / 0o20,
  "ការកំណត់ដំណាក់កាលមិនរក្សាគោលលើអេក្រង់មិនស្ម៾" );
certigi( neregula.sef4.p6zukani === 1, "អេក្រង់មិនស្ម៾មិនគួរបាត់គុណភាព" );

const malpotenca = raporti({ ksaka: "ឧបករណ៍ខ្សោយ", refreŝaDaŭro: alHe(0o1750 / 0o74), bazaLaboro: alHe(0o74), malmultekosta: true });
certigi( malpotenca.sef4.p6zukani < malpotenca.malnova.p6zukani,
  "ឧបករណ៍ខ្សោយត្រូវការមាត្រទាបជាងចាស់" );
certigi( malpotenca.sef4.kadrojHe > malpotenca.malnova.kadrojHe,
  "មាត្រថ្មីមិនបានជួយអត្រាស៊ុម" );

const tridek = raporti({ ksaka: "អេក្រង់យឺត", refreŝaDaŭro: alHe(0o1750 / 0o36), bazaLaboro: alHe(0o24), malmultekosta: true });
certigi( tridek.sef4.p6zukani === 1, "អេក្រង់យឺតមិនគួរត្រូវបានកាត់គុណភាពដោយអត្រារបស់វា" );
certigi( tridek.malnova.p6zukani < 1, "គោលនយោបាយចាស់ត្រូវបង្ហាញបញ្ហាអេក្រង់យឺត" );

const senfokusa = raporti({ ksaka: "ផ្ទាំងគ្មានផ្ទាំងផ្តិត", refreŝaDaŭro: alHe(0o1750 / 0o170), bazaLaboro: alHe(0o6), senfokusa: true });
certigi( senfokusa.sef4.celaKadraDaŭro === HE_POR_SEKUNDO / 0o30,
  "ផ្ទាំងគ្មានផ្ទាំងផ្តិតត្រូវការរយៈពេលវែង" );
certigi( senfokusa.sef4.laboraParto < senfokusa.malnova.laboraParto / 0o4,
  "ផ្ទាំងគ្មានផ្ទាំងផ្តិតមិនបានសន្សំការងារគ្រប់គ្រាន់" );

// ⟨ ស៊ុមវែងមួយតាមស៊ុមខ្លីមួយ មានមធ្យមលើសគោល ទោះស៊ុមវែងមិនជាប់គ្នាក៏ដោយ 📃 ⟩
const alterna = kreiRultemon();
let alternaTempo = 0;
for ( let i = 0; i < 0o100; i++ ) {
  alterna.bildigu(alternaTempo);
  alternaTempo += HE_POR_SEKUNDO / ( i % 0o2 === 0 ? 0o36 : 0o74 );
}
certigi( alterna.p6zukani < 1, "មធ្យមស៊ុមមិនបានរកការលើសទំហំឆ្លាស់" );

// ⟨ ការដេករបស់ប្រព័ន្ធមិនត្រូវកាត់គុណភាព 📃 ⟩
const interrompo = kreiRultemon();
for ( let i = 0; i < 0o200; i++ ) interrompo.bildigu(i * ( HE_POR_SEKUNDO / 0o74 ));
interrompo.bildigu(0o200000);
certigi( interrompo.p6zukani === 1, "ការផ្អាកយូរបានកាត់គុណភាពខុស" );

console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ការសាកល្បងគោលនយោបាយទាំងអស់ជោគជ័យ");
