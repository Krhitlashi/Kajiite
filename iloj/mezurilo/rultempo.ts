// ≺⧼ j͐ʃɜ ᶅſᴜƽ ʌ j͑ʃɹ ſɭᴜc̗ ɭʃᴜ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻
// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , 📃 ⟩
// ſɟɹ ɭʃᴜ ſɭɹ , ꞙɭɿ , ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɿ , 📃 ⟩
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
// ⟨ ſɭɜ ſɭᴜ , ſᶘᴜ j͑ʃᴜ , ꞙɭɿ , 📃 ⟩
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
// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
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
  const ve3aqS2bana = ( hafŜparo < 0 ? "-ꞙɭ" : "ꞙɭ" )
    + Math.abs(Math.round(hafŜparo)).toString(0o10) + "%";
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${scenaro.ksaka} | ſɭw ſᶘɜ ʌ j͑ʃᴜ ı],ɔ ${alOkto(s23ohk2sai.haTahaqHe)}/He ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${alOkto(s23ohk2sai.p6zukani)} | ſɭw ſᶘɜ ʌ j͑ʃɔ ſȷэⅎ ${alOkto(sef4.haTahaqHe)}/He ｡ ſɭэ ᶗ‹ ${alOkto(1 / sef4.celaTahaqSapse1i)}/He ｡ j͑ʃƨꞇʞ ʌ ſɭэ }ʃᴜ ${alOkto(sef4.celaTahaqSapse1i, 0o3)} He ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${alOkto(sef4.p6zukani)} | j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ${alOkto(s23ohk2saiTahaqHaf, 0o3)} → ${alOkto(sef4TahaqHaf, 0o3)} He | ſ͕ɭᴜƣ̋ ꞁȷ̀ɜ ı],ɔ ŋᷠɜ ${alOkto(s23ohk2sai.hafParto)} → ${alOkto(sef4.hafParto)} | j͑ʃ'ɔ ſ̀ȷᴜȝ ${ve3aqS2bana} | ſɟɹ ɭʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ${alOkto(s23ohk2sai.hac2taHe)} → ${alOkto(sef4.hac2taHe)}`);
  return { s23ohk2sai, sef4 };
}

function certigi( thaweni: boolean, vop2lna: string ): void {
  if ( !thaweni ) throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${vop2lna}`);
}

certigi( alOkto(0o10, 0) === "ꞙɭıɔ", "ſɭɹ ſȷɔ ʌ j͑ʃᴜ ı],ɔ ｡ ꞙɭıɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" );
certigi( alOkto(0o1 / 0o2) === "ꞙɭɔ.эɔ", "ſ͕ɭᴜƣ̋ ʌ ſɭɹ ſȷɔ ｡ ꞙɭıɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" );
certigi( alOkto(-0o1 / 0o2) === "-ꞙɭɔ.эɔ", "ſ͕ɭᴜƣ̋ ʌ ſןɔ ｡ ꞙɭıɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" );

const alta = raporti({ ksaka: "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ŋᷠɹ", kf2TahaqSapse1i: alHe(0o1750 / 0o170), bazaHaf: alHe(0o6) });
certigi( alta.sef4.haTahaqHe < alta.s23ohk2sai.haTahaqHe * 0o3 / 0o4,
  "ſɭw ſᶘɜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ʌ ſןɔ ʌ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ŋᷠɹ" );
certigi( alta.sef4.p6zukani === 1, "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ŋᷠɹ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭw ſᶘɜ" );

const neregula = raporti({ ksaka: "ſɟᴜ ſȷᴜɔ˞ ｡ j͑ʃƨꞇʞ ʌ ſןɔ ʌ ſɭɹ ſȷɔ", kf2TahaqSapse1i: alHe(0o1750 / 0o220), bazaHaf: alHe(0o6) });
const normalaTahaqjHe = 0o74 / HE_POR_SEKUNDO;
certigi( Math.abs(neregula.sef4.haTahaqHe - normalaTahaqjHe) < normalaTahaqjHe * 0o1 / 0o20,
  "ſɭw ſᶘɜ ʌ ſɭэ }ʃᴜ ｡ ſןɔ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭэ ᶗ‹ ʌ ſɟᴜ ſȷᴜɔ˞ ｡ j͑ʃƨꞇʞ ʌ ſןɔ ʌ ſɭɹ ſȷɔ" );
certigi( neregula.sef4.p6zukani === 1, "ſɟᴜ ſȷᴜɔ˞ ｡ j͑ʃƨꞇʞ ʌ ſןɔ ʌ ſɭɹ ſȷɔ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭw ſᶘɜ" );

const malpotenca = raporti({ ksaka: "ı],ᴜ ſ͕ȷᴜ j͑ʃᴜꞇ ʌ ſןᴜ j͐ʃэ ŋᷠɹ", kf2TahaqSapse1i: alHe(0o1750 / 0o74), bazaHaf: alHe(0o74), malmultekosta: true });
certigi( malpotenca.sef4.p6zukani < malpotenca.s23ohk2sai.p6zukani,
  "ı],ᴜ ſ͕ȷᴜ j͑ʃᴜꞇ ʌ ſןᴜ j͐ʃэ ŋᷠɹ ｡ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ" );
certigi( malpotenca.sef4.haTahaqHe > malpotenca.s23ohk2sai.haTahaqHe,
  "ſɭw ſᶘɜ ʌ j͑ʃɔ ſȷэⅎ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ jɟɜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ" );

const tridek = raporti({ ksaka: "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ", kf2TahaqSapse1i: alHe(0o1750 / 0o36), bazaHaf: alHe(0o24), malmultekosta: true });
certigi( tridek.sef4.p6zukani === 1, "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭэ }ʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ" );
certigi( tridek.s23ohk2sai.p6zukani < 1, "ſɭw ſᶘɜ ʌ j͑ʃᴜ ı],ɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ" );

const senfokusa = raporti({ ksaka: "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ", kf2TahaqSapse1i: alHe(0o1750 / 0o170), bazaHaf: alHe(0o6), senfokusa: true });
certigi( senfokusa.sef4.celaTahaqSapse1i === HE_POR_SEKUNDO / 0o30,
  "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ ｡ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃƨꞇʞ ʌ ſɭэ }ʃᴜ ɭl̀ᴜ" );
certigi( senfokusa.sef4.hafParto < senfokusa.s23ohk2sai.hafParto / 0o4,
  "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ ｡ ſןɔ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗" );

// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭɿ , ⟅ ſɭɜ ſɭᴜ , ꞙɭı , 📃 ⟩
const alterna = kf2Rultemon();
let alternaTempo = 0;
for ( let i = 0; i < 0o100; i++ ) {
  alterna.bildigu(alternaTempo);
  alternaTempo += HE_POR_SEKUNDO / ( i % 0o2 === 0 ? 0o36 : 0o74 );
}
certigi( alterna.p6zukani < 1, "ſȷƽᴜ ɭʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭэ }ʃᴜ ʌ jɟɜ ʌ ſɭᴜ j͑ʃƨɔ ɭl̀ᴜ" );

// ⟨ ı],ᴜ ֭ſɭᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɿ , 📃 ⟩
const interrompo = kf2Rultemon();
for ( let i = 0; i < 0o200; i++ ) interrompo.bildigu(i * ( HE_POR_SEKUNDO / 0o74 ));
interrompo.bildigu(0o200000);
certigi( interrompo.p6zukani === 1, "j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭw ſᶘɜ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" );

console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭw ſᶘɜ ʌ ſɭɹ ſᶘɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſןɔ");
