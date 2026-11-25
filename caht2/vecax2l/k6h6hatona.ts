// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͐ʃэ ɭ(ᴜ ʌ ſןw ֭ſɭᴜ }ʃꞇ 🧪 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , ſןɔ˞ᴜƴ , ꞙɭı ,
// ſןɔ˞ᴜƴ , ſɭэ ſɭᴜ , ꞙɭɿ ,
// ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭц , 📃 ⟩
import * as THREE from "three";
import { vepaqHak6h6n } from "../../skek2/qatsiike/hak6h6.js";
import { kas2kantaHasoza } from "../../skek2/qatsiike/hak6h6/hahunaq.js";
import { tikHak6h6, tikHaqakaj2 } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { l6da } from "../../kanta/nala/t6limaSoza.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { kf2T6g6Pukek,
  kf2T6hnaPukek } from "../../skek2/x2x2q/pukek.js";
import { havasAkvanTrunkon, kf2PontanAkvanTeston } from "../../skek2/qatsiike/hak6h6/c2kanu-profilo.js";
import { surGrid, K6H6ATRUAP2SOMANI } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { tsasatlakak, tsekeVeraTsasa } from "./x2x2q.js";

// ⟨ ſןɔ˞ᴜƴ , ꞙɭɿ , 📏 ⟩
const SL6DALIMO = 0o1/0o2 + 0o1/0o4;

// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , 📃 ⟩
const DIPLIMO = 0o1/0o4;
const DIPDISTO = 0o6;

// ⟨ ſןɔ˞ᴜƴ , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭꞟɔ ,
const DEKLIVOLIMO = 0o1 + 0o1/0o20;

const qena = new THREE.Scene();
const t6g6 = kf2T6g6Pukek(new THREE.Texture());
const t6hna = kf2T6hnaPukek(new THREE.Texture());
const HAKAS2KANTA = tikHak6h6();
const hacaxlefkakai = HAKAS2KANTA.filter(v => v.n2k.length >= 2)
  .map(v => ( { n2k: v.n2k, sefini: v.sefini } ));
const haveb6kek = troviK6h6RetajnHaveb6kekn(hacaxlefkakai, tikHaqakaj2());
const tamc2kHan2k = haveb6kek.map(k => [ k.x, k.z ] as [ number, number ]);

// ⟪ ſןɔ˞ᴜƴ , ſɭэ ſɭᴜ , 📏 ⟫
/* ſןɔ˞ᴜƴ , ſɭэ ſɭᴜ , ꞙɭı ,
    @param x, z ( number ) - }ʃɹƽ
@returns h6kuni ( number ) - ֭ſɭэ ſɭw }ʃꞇ ｡ ſןɔ ｡ Infinity ｡ ſɭᴜ ｡ */
function distoAlVeb6kek( x: number, z: number ): number {
  let plosteq = Infinity;
  for ( const [ kx, kz ] of tamc2kHan2k )
    plosteq = Math.min(plosteq, Math.hypot(kx - x, kz - z));
  return plosteq;
}

// ⟪ ſןɔ˞ᴜƴ , 📏 ⟫
/* ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , ꞙɭı ,
    @param hateru ( { y , x , z } [ ] ) - j͐ʃэ ɭ(ᴜ ʌ j͑ʃɜ ſɭ,ᴜ ʌ j͑ʃ'ɜ ſ͕ɭᴜ j͑ʃп́ꞇ
@returns dipo ( { jufu , x , z } | null ) - ֭ſɭэ ſɭэ ɭl̀w ſȷw ɭl̀ᴜ */
function kmaProfundaDipo(
  hateru: readonly { y: number; x: number; z: number }[]
): { jufu: number; x: number; z: number } | null {
  let dipo: { jufu: number; x: number; z: number } | null = null;
  for ( let i = 0; i < hateru.length; i++ ) {
    let maldekstra = -Infinity, dekstra = -Infinity;
    let h6kuni = 0;
    for ( let j = i - 1; j >= 0; j-- ) {
      h6kuni += Math.hypot(hateru[j + 1].x - hateru[j].x, hateru[j + 1].z - hateru[j].z);
      if ( h6kuni > DIPDISTO ) break;
      maldekstra = Math.max(maldekstra, hateru[j].y);
    }
    h6kuni = 0;
    for ( let j = i + 1; j < hateru.length; j++ ) {
      h6kuni += Math.hypot(hateru[j].x - hateru[j - 1].x, hateru[j].z - hateru[j - 1].z);
      if ( h6kuni > DIPDISTO ) break;
      dekstra = Math.max(dekstra, hateru[j].y);
    }
    const jufu = Math.min(maldekstra, dekstra) - hateru[i].y;
    if ( jufu > ( dipo?.jufu ?? 0 ) )
      dipo = { jufu, x: hateru[i].x, z: hateru[i].z };
  }
  return dipo;
}

let tutaMaks = 0, difektaj = 0, provitaj = 0, hac2kanu = 0, tutaBurial = 0, tutaDipo = 0;
let tutaDeklivo = 0, deklivoDifektaj = 0;
for ( let v = 0; v < HAKAS2KANTA.length; v++ ) {
  const k6h6 = HAKAS2KANTA[v];
  if ( k6h6.n2k.length < 2 ) continue;
  const sefini = k6h6.c2kanuSefini ?? k6h6.sefini;
  if ( havasAkvanTrunkon(k6h6.n2k, kf2PontanAkvanTeston(k6h6.n2k, sefini, tsekeVeraTsasa)) ) {
    hac2kanu++;
    continue;
  }
  provitaj++;
  kas2kantaHasoza.length = 0;
  vepaqHak6h6n(qena,
    [ { pts: k6h6.n2k, w: k6h6.sefini / 2, hateruni: true } ],
    l6da, t6g6, t6hna, tamc2kHan2k,
    { tsasaFn: tsasatlakak });
// ⟨ ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , 📃 ⟩
  let maks = 0, maksQar = -1, kek2 = 0;
  for ( let k = 1; k < kas2kantaHasoza.length; k++ ) {
    const ne3ak2 = kas2kantaHasoza[k - 1], cutlu = kas2kantaHasoza[k];
    if ( Math.hypot(ne3ak2.x2 - cutlu.x1, ne3ak2.z2 - cutlu.z1) > 0o10 ** -0o4 ) continue;
// ⟨ ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , 📃 ⟩
    if ( distoAlVeb6kek(cutlu.x1, cutlu.z1) <= K6H6ATRUAP2SOMANI * 0o2 ) continue;
    kek2++;
    const sl6da = Math.abs(cutlu.y0 - ne3ak2.y0);
    if ( sl6da > maks ) { maks = sl6da; maksQar = k; }
  }
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭꞟɔ , 📃 ⟩
// ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭꞟɔ ,
  let deklivoMaks = 0, deklivoQar: [ number, number ] | null = null;
  for ( const kek of kas2kantaHasoza ) {
    const sl6da = Math.abs(kek.y1 - kek.y0);
    if ( sl6da < 0o1/0o1000 ) continue;
    const sahakaniKek = Math.hypot(kek.x2 - kek.x1, kek.z2 - kek.z1);
    if ( sahakaniKek < 0o1/0o1000 ) continue;
    const haga = sl6da / sahakaniKek;
    if ( haga > deklivoMaks ) {
      deklivoMaks = haga;
      deklivoQar = [ ( kek.x1 + kek.x2 ) / 0o2, ( kek.z1 + kek.z2 ) / 0o2 ];
    }
  }
// ⟨ ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , 📃 ⟩
  const hateru: { y: number; x: number; z: number }[] = [];
  let maksBurial = 0, burialQar: [ number, number ] | null = null;
  for ( const kek of kas2kantaHasoza ) {
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , 📃 ⟩
    if ( distoAlVeb6kek( kek.x1, kek.z1 ) <= K6H6ATRUAP2SOMANI * 0o2 ) continue;
    hateru.push({ y: kek.y0, x: ( kek.x1 + kek.x2 ) / 2, z: ( kek.z1 + kek.z2 ) / 2 });
    for ( const f of [ 0, 0o1/0o4, 0o1/0o2, 0o3/0o4, 1 ] ) {
      const px = kek.x1 + ( kek.x2 - kek.x1 ) * f;
      const pz = kek.z1 + ( kek.z2 - kek.z1 ) * f;
      const veq6k2 = l6da( px, pz ) - kek.y0;
      if ( veq6k2 > maksBurial ) { maksBurial = veq6k2; burialQar = [ px, pz ]; }
    }
  }
  const dipo = kmaProfundaDipo(hateru);
  if ( maks > tutaMaks ) tutaMaks = maks;
  if ( maks > SL6DALIMO ) difektaj++;
  if ( maksBurial > tutaBurial ) tutaBurial = maksBurial;
  if ( dipo && dipo.jufu > tutaDipo ) tutaDipo = dipo.jufu;
  if ( deklivoMaks > tutaDeklivo ) tutaDeklivo = deklivoMaks;
  if ( deklivoMaks > DEKLIVOLIMO ) deklivoDifektaj++;
  const raqa = maksQar >= 0 ? kas2kantaHasoza[maksQar] : null;
  const ne3ak2Kek = maksQar > 0 ? kas2kantaHasoza[maksQar - 1] : null;
  const t6lima = raqa && ne3ak2Kek
    ? ` ｡ ſɭɜ ſɭ,w ${l6da(raqa.x1, raqa.z1).toFixed(3)}` +
      ` ( j͑ʃᴜ ı],ɔ ${l6da(ne3ak2Kek.x1, ne3ak2Kek.z1).toFixed(3)} )`
    : "";
  console.log(`ſɭэ ֭ſɭэ ${v} ${k6h6.ksaka} ｡ ɭʃɜ }ʃᴜ ${kek2}` +
    ` ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maks.toFixed(3)}` +
    ( raqa ? ` @${raqa.x1.toFixed(1)},${raqa.z1.toFixed(1)}` : "" ) + t6lima +
    ( maks > SL6DALIMO ? "  ⚠" : "" ) +
    ` ｡ ſɭɜ ſɭ,w ɭl̀w ſȷw ${maksBurial.toFixed(3)}` +
    ( burialQar ? ` @${burialQar[0].toFixed(1)},${burialQar[1].toFixed(1)}` : "" ) +
    ( maksBurial > 0o1/0o4 ? "  ⚠" : "" ) +
    ( dipo ? ` ｡ ֭ſɭэ ſɭэ ŋᷠɹ ${dipo.jufu.toFixed(3)} @${dipo.x.toFixed(1)},${dipo.z.toFixed(1)}` : "" ) +
    ( dipo && dipo.jufu > DIPLIMO ? "  ⚠" : "" ) +
    ` ｡ ſɭᴜc̗ ɭʃɜ ʌ ֭ſɭᴜ ſ͔ɭᴜ ɭl̀ᴜ ${deklivoMaks.toFixed(2)}` +
    ( deklivoQar ? ` @${deklivoQar[0].toFixed(1)},${deklivoQar[1].toFixed(1)}` : "" ) +
    ( deklivoMaks > DEKLIVOLIMO ? "  ⚠" : "" ));
}

// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
console.log(`ſɭэ ֭ſɭэ ${provitaj} ( ſɟɹƽ ꞁȷ̀ᴜ }ʃw ${hac2kanu} ʌ ſɭᴜ j͑ʃƨɔ )` +
  ` ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${tutaMaks.toFixed(3)}` +
  ` ｡ ɭl̀ᴜ ʌ ſןͷ̗ɜ j͑ʃƨɔȝ ${difektaj}` +
  ` ｡ ſɭɜ ſɭ,w ɭl̀w ſȷw ɭl̀ᴜ ${tutaBurial.toFixed(3)}` +
  ` ｡ ֭ſɭэ ſɭэ ŋᷠɹ ɭl̀ᴜ ${tutaDipo.toFixed(3)}` +
  ` ｡ ſɭᴜc̗ ɭʃɜ ʌ ֭ſɭᴜ ſ͔ɭᴜ ɭl̀ᴜ ${tutaDeklivo.toFixed(2)}` +
  ( deklivoDifektaj > 0 ? ` ｡ ſɭэ ֭ſɭэ ʌ ֭ſɭᴜ ſ͔ɭᴜ ${deklivoDifektaj}` : "" ));

// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı , 📃 ⟩
kas2kantaHasoza.length = 0;
vepaqHak6h6n(qena,
  HAKAS2KANTA.filter(v => v.n2k.length >= 2)
    .map(v => ( { pts: v.n2k, w: v.sefini / 2, hateruni: true } )),
  l6da, t6g6, t6hna, tamc2kHan2k,
  { tsasaFn: tsasatlakak });
let plumboMaks = 0, plumboQar = "";
for ( const [ kx, kz ] of tamc2kHan2k ) {
  const at = kas2kantaHasoza.filter(p =>
    Math.hypot(( p.x1 + p.x2 ) / 2 - kx, ( p.z1 + p.z2 ) / 2 - kz) <= K6H6ATRUAP2SOMANI);
  const hateru = Math.max(...at.map(p => p.y0), -Infinity);
  const veq6k2 = surGrid(hateru) - hateru;
  if ( veq6k2 > plumboMaks ) { plumboMaks = veq6k2; plumboQar = kx + "," + kz; }
}
console.log(`ſɟɹƽ ${tamc2kHan2k.length} ｡ ɭʃɜ }ʃᴜ ʌ ſ̀ȷᴜ ſɭᴜƽ ʌ ſןᴜ ſᶘɹ ${plumboMaks.toFixed(3)} @${plumboQar}`);
