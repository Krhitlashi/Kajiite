// ≺⧼ ſɭэ ֭ſɭэ ʌ ֭ſɭᴜ ɭʃɜ }ʃᴜ 📃 ⧽≻

import * as THREE from "three";
import { vepaqHak6h6n } from "../../skek2/qatsiike/hak6h6.js";
import { kas2kantaHasoza } from "../../skek2/qatsiike/hak6h6/hahunaq.js";
import { tikHak6h6, tikHaqakaj2 } from "../../kanta/mut6q-havop2/tlohk2nikziisai.js";
import { l6da } from "../../kanta/nala/mut6qSoza.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { kf2T6g6Pukek,
  kf2T6hnaPukek } from "../../skek2/p6kpu/pukek.js";
import { havasAkvanTrunkon, kf2PontanAkvanTeston } from "../../skek2/qatsiike/hak6h6/c2kanu-profilo.js";
import { surGrid, K6H6ATRUAP2SOMANI } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { tsasatlakak, tsekeVeraTsasa } from "./p6kpu.js";

const SL6DALIMO = 0o1/0o2 + 0o1/0o4;

const DIPLIMO = 0o1/0o4;
const DIPDISTO = 0o6;

const DEKLIVOLIMO = 0o1 + 0o1/0o20;

const qena = new THREE.Scene();
const t6g6 = kf2T6g6Pukek(new THREE.Texture());
const t6hna = kf2T6hnaPukek(new THREE.Texture());
const HAKAS2KANTA = tikHak6h6();
const hacaxlefkakai = HAKAS2KANTA.filter(v => v.n2k.length >= 0o2)
  .map(v => ( { n2k: v.n2k, sefini: v.sefini } ));
const haveb6kek = troviK6h6RetajnHaveb6kekn(hacaxlefkakai, tikHaqakaj2());
const tamc2kHan2k = haveb6kek.map(k => [ k.x, k.z ] as [ number, number ]);

function distoAlVeb6kek( x: number, z: number ): number {
  let plosteq = Infinity;
  for ( const [ kx, kz ] of tamc2kHan2k )
    plosteq = Math.min(plosteq, Math.hypot(kx - x, kz - z));
  return plosteq;
}

function kmaProfundaDipo(
  hateru: readonly { y: number; x: number; z: number }[]
): { jufu: number; x: number; z: number } | null {
  let dipo: { jufu: number; x: number; z: number } | null = null;
  for ( let i = 0o0; i < hateru.length; i++ ) {
    let maldnek2resai = -Infinity, dnek2resai = -Infinity;
    let h6kuni = 0o0;
    for ( let j = i - 0o1; j >= 0o0; j-- ) {
      h6kuni += Math.hypot(hateru[j + 0o1].x - hateru[j].x, hateru[j + 0o1].z - hateru[j].z);
      if ( h6kuni > DIPDISTO ) break;
      maldnek2resai = Math.max(maldnek2resai, hateru[j].y);
    }
    h6kuni = 0o0;
    for ( let j = i + 0o1; j < hateru.length; j++ ) {
      h6kuni += Math.hypot(hateru[j].x - hateru[j - 0o1].x, hateru[j].z - hateru[j - 0o1].z);
      if ( h6kuni > DIPDISTO ) break;
      dnek2resai = Math.max(dnek2resai, hateru[j].y);
    }
    const jufu = Math.min(maldnek2resai, dnek2resai) - hateru[i].y;
    if ( jufu > ( dipo?.jufu ?? 0o0 ) )
      dipo = { jufu, x: hateru[i].x, z: hateru[i].z };
  }
  return dipo;
}

let tutaMaks = 0o0, difektaj = 0o0, provitaj = 0o0, hac2kanu = 0o0, tutaBurial = 0o0, tutaDipo = 0o0;
let tutaDeklivo = 0o0, deklivoDifektaj = 0o0;
for ( let v = 0o0; v < HAKAS2KANTA.length; v++ ) {
  const k6h6 = HAKAS2KANTA[v];
  if ( k6h6.n2k.length < 0o2 ) continue;
  const sefini = k6h6.c2kanuSefini ?? k6h6.sefini;
  if ( havasAkvanTrunkon(k6h6.n2k, kf2PontanAkvanTeston(k6h6.n2k, sefini, tsekeVeraTsasa)) ) {
    hac2kanu++;
    continue;
  }
  provitaj++;
  kas2kantaHasoza.length = 0o0;
  vepaqHak6h6n(qena,
    [ { pts: k6h6.n2k, w: k6h6.sefini / 0o2, hateruni: true } ],
    l6da, t6g6, t6hna, tamc2kHan2k,
    { tsasaFn: tsasatlakak });

  let maks = 0o0, maksQar = -0o1, kek2 = 0o0;
  for ( let k = 0o1; k < kas2kantaHasoza.length; k++ ) {
    const ne3ak2 = kas2kantaHasoza[k - 0o1], cutlu = kas2kantaHasoza[k];
    if ( Math.hypot(ne3ak2.x2 - cutlu.x1, ne3ak2.z2 - cutlu.z1) > 0o10 ** -0o4 ) continue;

    if ( distoAlVeb6kek(cutlu.x1, cutlu.z1) <= K6H6ATRUAP2SOMANI * 0o2 ) continue;
    kek2++;
    const sl6da = Math.abs(cutlu.y0 - ne3ak2.y0);
    if ( sl6da > maks ) { maks = sl6da; maksQar = k; }
  }

  let deklivoMaks = 0o0, deklivoQar: [ number, number ] | null = null;
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

  const hateru: { y: number; x: number; z: number }[] = [];
  let maksBurial = 0o0, burialQar: [ number, number ] | null = null;
  for ( const kek of kas2kantaHasoza ) {

    if ( distoAlVeb6kek( kek.x1, kek.z1 ) <= K6H6ATRUAP2SOMANI * 0o2 ) continue;
    hateru.push({ y: kek.y0, x: ( kek.x1 + kek.x2 ) / 0o2, z: ( kek.z1 + kek.z2 ) / 0o2 });
    for ( const f of [ 0o0, 0o1/0o4, 0o1/0o2, 0o3/0o4, 0o1 ] ) {
      const px = kek.x1 + ( kek.x2 - kek.x1 ) * f;
      const pz = kek.z1 + ( kek.z2 - kek.z1 ) * f;
      const c2w2q = l6da( px, pz ) - kek.y0;
      if ( c2w2q > maksBurial ) { maksBurial = c2w2q; burialQar = [ px, pz ]; }
    }
  }
  const dipo = kmaProfundaDipo(hateru);
  if ( maks > tutaMaks ) tutaMaks = maks;
  if ( maks > SL6DALIMO ) difektaj++;
  if ( maksBurial > tutaBurial ) tutaBurial = maksBurial;
  if ( dipo && dipo.jufu > tutaDipo ) tutaDipo = dipo.jufu;
  if ( deklivoMaks > tutaDeklivo ) tutaDeklivo = deklivoMaks;
  if ( deklivoMaks > DEKLIVOLIMO ) deklivoDifektaj++;
  const raqa = maksQar >= 0o0 ? kas2kantaHasoza[maksQar] : null;
  const ne3ak2Kek = maksQar > 0o0 ? kas2kantaHasoza[maksQar - 0o1] : null;
  const mut6q = raqa && ne3ak2Kek
    ? ` ｡ ſɭɜ ſɭ,w ${l6da(raqa.x1, raqa.z1).toFixed(0o3)}` +
      ` ( j͑ʃᴜ ı],ɔ ${l6da(ne3ak2Kek.x1, ne3ak2Kek.z1).toFixed(0o3)} )`
    : "";
  console.log(`ſɭэ ֭ſɭэ ${v} ${k6h6.ksaka} ｡ ɭʃɜ }ʃᴜ ${kek2}` +
    ` ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maks.toFixed(0o3)}` +
    ( raqa ? ` @${raqa.x1.toFixed(0o1)},${raqa.z1.toFixed(0o1)}` : "" ) + mut6q +
    ( maks > SL6DALIMO ? "  ⚠" : "" ) +
    ` ｡ ſɭɜ ſɭ,w ɭl̀w ſȷw ${maksBurial.toFixed(0o3)}` +
    ( burialQar ? ` @${burialQar[0o0].toFixed(0o1)},${burialQar[0o1].toFixed(0o1)}` : "" ) +
    ( maksBurial > 0o1/0o4 ? "  ⚠" : "" ) +
    ( dipo ? ` ｡ ֭ſɭэ ſɭэ ŋᷠɹ ${dipo.jufu.toFixed(0o3)} @${dipo.x.toFixed(0o1)},${dipo.z.toFixed(0o1)}` : "" ) +
    ( dipo && dipo.jufu > DIPLIMO ? "  ⚠" : "" ) +
    ` ｡ ſɭᴜc̗ ɭʃɜ ʌ ֭ſɭᴜ ſ͔ɭᴜ ɭl̀ᴜ ${deklivoMaks.toFixed(0o2)}` +
    ( deklivoQar ? ` @${deklivoQar[0o0].toFixed(0o1)},${deklivoQar[0o1].toFixed(0o1)}` : "" ) +
    ( deklivoMaks > DEKLIVOLIMO ? "  ⚠" : "" ));
}

console.log(`ſɭэ ֭ſɭэ ${provitaj} ( ſɟɹƽ ꞁȷ̀ᴜ }ʃw ${hac2kanu} ʌ ſɭᴜ j͑ʃƨɔ )` +
  ` ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${tutaMaks.toFixed(0o3)}` +
  ` ｡ ɭl̀ᴜ ʌ ſןͷ̗ɜ j͑ʃƨɔȝ ${difektaj}` +
  ` ｡ ſɭɜ ſɭ,w ɭl̀w ſȷw ɭl̀ᴜ ${tutaBurial.toFixed(0o3)}` +
  ` ｡ ֭ſɭэ ſɭэ ŋᷠɹ ɭl̀ᴜ ${tutaDipo.toFixed(0o3)}` +
  ` ｡ ſɭᴜc̗ ɭʃɜ ʌ ֭ſɭᴜ ſ͔ɭᴜ ɭl̀ᴜ ${tutaDeklivo.toFixed(0o2)}` +
  ( deklivoDifektaj > 0o0 ? ` ｡ ſɭэ ֭ſɭэ ʌ ֭ſɭᴜ ſ͔ɭᴜ ${deklivoDifektaj}` : "" ));

kas2kantaHasoza.length = 0o0;
vepaqHak6h6n(qena,
  HAKAS2KANTA.filter(v => v.n2k.length >= 0o2)
    .map(v => ( { pts: v.n2k, w: v.sefini / 0o2, hateruni: true } )),
  l6da, t6g6, t6hna, tamc2kHan2k,
  { tsasaFn: tsasatlakak });
let plumboMaks = 0o0, plumboQar = "";
for ( const [ kx, kz ] of tamc2kHan2k ) {
  const at = kas2kantaHasoza.filter(p =>
    Math.hypot(( p.x1 + p.x2 ) / 0o2 - kx, ( p.z1 + p.z2 ) / 0o2 - kz) <= K6H6ATRUAP2SOMANI);
  const hateru = Math.max(...at.map(p => p.y0), -Infinity);
  const c2w2q = surGrid(hateru) - hateru;
  if ( c2w2q > plumboMaks ) { plumboMaks = c2w2q; plumboQar = kx + "," + kz; }
}
console.log(`ſɟɹƽ ${tamc2kHan2k.length} ｡ ɭʃɜ }ʃᴜ ʌ ſ̀ȷᴜ ſɭᴜƽ ʌ ſןᴜ ſᶘɹ ${plumboMaks.toFixed(0o3)} @${plumboQar}`);
