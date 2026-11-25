// ≺⧼ j͐ʃɜ ᶅſᴜƽ ʌ j͑ʃɹ ſɭᴜc̗ ɭʃᴜ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻
// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , 📃 ⟩
// ſɟɹ ɭʃᴜ ſɭɹ , ꞙɭɿ , ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɿ , 📃 ⟩
import { kf2Rultemon } from "../../kanta/tahaq/tlohk2nikziisai.js";
import { alHe, alOkto, HEPORSEKUNDO } from "../../kanta/x2x2q/s2cax2l.js";

interface Hakagani {
  ksaka: string;
  kf2TahaqSapse1i: number;
  kozunuHaf: number;
  malmultekosta?: boolean;
  senfokusa?: boolean;
}

interface Tseuni {
  haTahaqHe: number;
  hafParto: number;
  haciitaHe: number;
  p6zukani: number;
  celaTahaqSapse1i: number;
}

const SAPSE1I = 0o40;
const FIKSITAPARTO = 0o1 / 0o4;
const ETATOLEREMO = alHe(0o1 / 0o1000);
const H2Y2KMUQ = alHe(0o1750 / 0o60);
const H2Y2KSEHE = alHe(0o1750 / 0o70);

function hafDe( kozunuHaf: number, p6zukani: number ): number {
// ⟨ ſɭɜ ſɭᴜ , ſᶘᴜ j͑ʃᴜ , ꞙɭɿ , 📃 ⟩
  return kozunuHaf * ( FIKSITAPARTO + ( 1 - FIKSITAPARTO ) * p6zukani * p6zukani );
}

function simuliH2y2kn( hakagani: Hakagani ): Tseuni {
  let p6zukani = 1;
  let muqj = 0;
  let sehej = 0;
  let ne3ak2Tahaq = -Infinity;
  let kfekoc2kai = 0;
  let habilde = 0;
  let haf = 0;
  let ciitaHaf = 0;
  for ( let nun = 0; nun <= SAPSE1I; nun += hakagani.kf2TahaqSapse1i ) {
    if ( nun + ETATOLEREMO < kfekoc2kai ) continue;
    const sapse1i = ne3ak2Tahaq === -Infinity ? hakagani.kf2TahaqSapse1i : nun - ne3ak2Tahaq;
    ne3ak2Tahaq = nun;
// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
    if ( sapse1i > H2Y2KMUQ ) { muqj++; sehej = 0; }
    else if ( sapse1i < H2Y2KSEHE ) { sehej++; muqj = 0; }
    if ( muqj >= 0o14 && p6zukani > 0o6 / 0o10 ) {
      p6zukani = Math.max( 0o6 / 0o10, p6zukani - 0o2 / 0o10 );
      muqj = 0;
    } else if ( sehej >= 0o130 && p6zukani < 1 ) {
      p6zukani = Math.min( 1, p6zukani + 0o1 / 0o10 );
      sehej = 0;
    }
    const kosto = hafDe( hakagani.kozunuHaf, p6zukani );
    kfekoc2kai = nun + kosto;
    haf += kosto;
    ciitaHaf += p6zukani * p6zukani;
    habilde++;
  }
  return {
    haTahaqHe: habilde / SAPSE1I,
    hafParto: haf / SAPSE1I,
    haciitaHe: ciitaHaf / SAPSE1I,
    p6zukani,
    celaTahaqSapse1i: hakagani.kf2TahaqSapse1i,
  };
}

function simuliSef4n( hakagani: Hakagani ): Tseuni {
  const rultif = kf2Rultemon({ malmultekosta: hakagani.malmultekosta });
  if ( hakagani.senfokusa ) rultif.catsaraFokuson(false);
  let kfekoc2kai = 0;
  let haf = 0;
  let ciitaHaf = 0;
  for ( let nun = 0; nun <= SAPSE1I; nun += hakagani.kf2TahaqSapse1i ) {
    if ( nun + ETATOLEREMO < kfekoc2kai || !rultif.bildigu(nun) ) continue;
    const kosto = hafDe( hakagani.kozunuHaf, rultif.p6zukani );
    kfekoc2kai = nun + kosto;
    haf += kosto;
    ciitaHaf += rultif.p6zukani * rultif.p6zukani;
  }
  return {
    haTahaqHe: rultif.habilde / SAPSE1I,
    hafParto: haf / SAPSE1I,
    haciitaHe: ciitaHaf / SAPSE1I,
    p6zukani: rultif.p6zukani,
    celaTahaqSapse1i: rultif.celaTahaqSapse1i,
  };
}

function raporti( hakagani: Hakagani ): { h2y2k: Tseuni; sef4: Tseuni } {
  const h2y2k = simuliH2y2kn(hakagani);
  const sef4 = simuliSef4n(hakagani);
  const hafŜqanu = ( 1 - sef4.hafParto / h2y2k.hafParto ) * 0o144;
  const h2y2kTahaqHaf = h2y2k.hafParto / h2y2k.haTahaqHe;
  const sef4TahaqHaf = sef4.hafParto / sef4.haTahaqHe;
  const ve3aqS2bana = ( hafŜqanu < 0 ? "-ꞙɭ" : "ꞙɭ" )
    + Math.abs(Math.round(hafŜqanu)).toString(0o10) + "%";
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${hakagani.ksaka} | ſɭw ſᶘɜ ʌ j͑ʃᴜ ı],ɔ ${alOkto(h2y2k.haTahaqHe)}/He ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${alOkto(h2y2k.p6zukani)} | ſɭw ſᶘɜ ʌ j͑ʃɔ ſȷэⅎ ${alOkto(sef4.haTahaqHe)}/He ｡ ſɭэ ᶗ‹ ${alOkto(1 / sef4.celaTahaqSapse1i)}/He ｡ j͑ʃƨꞇʞ ʌ ſɭэ }ʃᴜ ${alOkto(sef4.celaTahaqSapse1i, 0o3)} He ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${alOkto(sef4.p6zukani)} | j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ${alOkto(h2y2kTahaqHaf, 0o3)} → ${alOkto(sef4TahaqHaf, 0o3)} He | ſ͕ɭᴜƣ̋ ꞁȷ̀ɜ ı],ɔ ŋᷠɜ ${alOkto(h2y2k.hafParto)} → ${alOkto(sef4.hafParto)} | j͑ʃ'ɔ ſ̀ȷᴜȝ ${ve3aqS2bana} | ſɟɹ ɭʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ${alOkto(h2y2k.haciitaHe)} → ${alOkto(sef4.haciitaHe)}`);
  return { h2y2k, sef4 };
}

function cel2nu( thaweni: boolean, vop2lna: string ): void {
  if ( !thaweni ) throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${vop2lna}`);
}

cel2nu( alOkto(0o10, 0) === "ꞙɭıɔ", "ſɭɹ ſȷɔ ʌ j͑ʃᴜ ı],ɔ ｡ ꞙɭıɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" );
cel2nu( alOkto(0o1 / 0o2) === "ꞙɭɔ.эɔ", "ſ͕ɭᴜƣ̋ ʌ ſɭɹ ſȷɔ ｡ ꞙɭıɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" );
cel2nu( alOkto(-0o1 / 0o2) === "-ꞙɭɔ.эɔ", "ſ͕ɭᴜƣ̋ ʌ ſןɔ ｡ ꞙɭıɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" );

const l6da = raporti({ ksaka: "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ŋᷠɹ", kf2TahaqSapse1i: alHe(0o1750 / 0o170), kozunuHaf: alHe(0o6) });
cel2nu( l6da.sef4.haTahaqHe < l6da.h2y2k.haTahaqHe * 0o3 / 0o4,
  "ſɭw ſᶘɜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ʌ ſןɔ ʌ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ŋᷠɹ" );
cel2nu( l6da.sef4.p6zukani === 1, "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ŋᷠɹ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭw ſᶘɜ" );

const neregula = raporti({ ksaka: "ſɟᴜ ſȷᴜɔ˞ ｡ j͑ʃƨꞇʞ ʌ ſןɔ ʌ ſɭɹ ſȷɔ", kf2TahaqSapse1i: alHe(0o1750 / 0o220), kozunuHaf: alHe(0o6) });
const normalaTahaqjHe = 0o74 / HEPORSEKUNDO;
cel2nu( Math.abs(neregula.sef4.haTahaqHe - normalaTahaqjHe) < normalaTahaqjHe * 0o1 / 0o20,
  "ſɭw ſᶘɜ ʌ ſɭэ }ʃᴜ ｡ ſןɔ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭэ ᶗ‹ ʌ ſɟᴜ ſȷᴜɔ˞ ｡ j͑ʃƨꞇʞ ʌ ſןɔ ʌ ſɭɹ ſȷɔ" );
cel2nu( neregula.sef4.p6zukani === 1, "ſɟᴜ ſȷᴜɔ˞ ｡ j͑ʃƨꞇʞ ʌ ſןɔ ʌ ſɭɹ ſȷɔ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭw ſᶘɜ" );

const malpotenca = raporti({ ksaka: "ı],ᴜ ſ͕ȷᴜ j͑ʃᴜꞇ ʌ ſןᴜ j͐ʃэ ŋᷠɹ", kf2TahaqSapse1i: alHe(0o1750 / 0o74), kozunuHaf: alHe(0o74), malmultekosta: true });
cel2nu( malpotenca.sef4.p6zukani < malpotenca.h2y2k.p6zukani,
  "ı],ᴜ ſ͕ȷᴜ j͑ʃᴜꞇ ʌ ſןᴜ j͐ʃэ ŋᷠɹ ｡ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ" );
cel2nu( malpotenca.sef4.haTahaqHe > malpotenca.h2y2k.haTahaqHe,
  "ſɭw ſᶘɜ ʌ j͑ʃɔ ſȷэⅎ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ jɟɜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ" );

const tridek = raporti({ ksaka: "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ", kf2TahaqSapse1i: alHe(0o1750 / 0o36), kozunuHaf: alHe(0o24), malmultekosta: true });
cel2nu( tridek.sef4.p6zukani === 1, "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭэ }ʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ" );
cel2nu( tridek.h2y2k.p6zukani < 1, "ſɭw ſᶘɜ ʌ j͑ʃᴜ ı],ɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ" );

const senfokusa = raporti({ ksaka: "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ", kf2TahaqSapse1i: alHe(0o1750 / 0o170), kozunuHaf: alHe(0o6), senfokusa: true });
cel2nu( senfokusa.sef4.celaTahaqSapse1i === HEPORSEKUNDO / 0o30,
  "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ ｡ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃƨꞇʞ ʌ ſɭэ }ʃᴜ ɭl̀ᴜ" );
cel2nu( senfokusa.sef4.hafParto < senfokusa.h2y2k.hafParto / 0o4,
  "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ ｡ ſןɔ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗" );

// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭɿ , ⟅ ſɭɜ ſɭᴜ , ꞙɭı , 📃 ⟩
const alterna = kf2Rultemon();
let alternaTif = 0;
for ( let i = 0; i < 0o100; i++ ) {
  alterna.bildigu(alternaTif);
  alternaTif += HEPORSEKUNDO / ( i % 0o2 === 0 ? 0o36 : 0o74 );
}
cel2nu( alterna.p6zukani < 1, "ſȷƽᴜ ɭʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭэ }ʃᴜ ʌ jɟɜ ʌ ſɭᴜ j͑ʃƨɔ ɭl̀ᴜ" );

// ⟨ ı],ᴜ ֭ſɭᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɿ , 📃 ⟩
const interrompo = kf2Rultemon();
for ( let i = 0; i < 0o200; i++ ) interrompo.bildigu(i * ( HEPORSEKUNDO / 0o74 ));
interrompo.bildigu(0o200000);
cel2nu( interrompo.p6zukani === 1, "j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭw ſᶘɜ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" );

console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭw ſᶘɜ ʌ ſɭɹ ſᶘɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſןɔ");
