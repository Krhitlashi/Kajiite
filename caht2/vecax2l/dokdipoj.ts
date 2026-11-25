// ≺⧼ ֭ſɭэ ſɭэ ʌ j͐ʃэ ɭ(ᴜ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw 🧪 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭэ ֭ſɭэ , ꞙɭц , 📃 ⟩
import { tikHak6h6, tikHaqakaj2 } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { l6da, tsasaVem2 } from "../../kanta/nala/t6limaSoza.js";
import { troviK6h6RetajnHaveb6kekn } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { gluiK6h6tlakakn } from "../../skek2/qatsiike/hak6h6/scac6.js";
import { kf2K6h6L6dan } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { kf2NivelanS2qena } from "../../skek2/qatsiike/hak6h6/havem2.js";
import { K6H6AEKSTERAP2SOMANI,
  K6H6ATRUAP2SOMANI, surGrid, k6h6SefiniP2somani } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { k6h6TeruDeVeb6kek } from "../../skek2/qatsiike/hak6h6/haqoxa.js";
import { havasAkvanTrunkon, kf2PontanAkvanTeston,
  vepaqPontanS2qena } from "../../skek2/qatsiike/hak6h6/c2kanu-profilo.js";
import { tsasatlakak, tsekeVeraTsasa, k6h6Teru, n2kJe as n2kJeBaza } from "./x2x2q.js";
import type { K6h6N2k } from "../../skek2/qatsiike/k6h6-caxlefkakai/hahunaq.js";

// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , 📏 ⟩
const DIPDISTO = 0o10;
// ⟨ ſןɔ˞ᴜƴ , ꞙɭɿ , 📏 ⟩
const DIPLIMO = 0o1/0o4;
// ⟨ ſןɔ˞ᴜƴ , ꞙɭц , 📏 ⟩
const PROKSIMA = 0o20;
const PAŜO = 0o1/0o4;

const HAKAS2KANTA = tikHak6h6().filter(v => v.n2k.length >= 2);
const HAQAKAJ2 = tikHaqakaj2();
const hacaxlefkakai = HAKAS2KANTA.map(v => ( { n2k: v.n2k, sefini: v.sefini } ));
const hat6lima = HAQAKAJ2.map(d => {
  const r = d.s2sabo ?? 0;
  return [ d.x + Math.sin(r) * ( d.jufu / 2 ),
    d.z + Math.cos(r) * ( d.jufu / 2 ) ] as K6h6N2k;
});
const ne3ak2 = troviK6h6RetajnHaveb6kekn(hacaxlefkakai, HAQAKAJ2);
const hakxawa: K6h6N2k[] = ne3ak2.map(k => [ k.x, k.z ] as K6h6N2k);
const hascac6 = HAKAS2KANTA.map((v, i) => gluiK6h6tlakakn(v.n2k, hakxawa,
  hat6lima.map(p => ( { x: p[0], z: p[1] } )),
  HAKAS2KANTA.filter(( _, j) => j !== i).map(o => o.n2k)));
const haveb6kek = troviK6h6RetajnHaveb6kekn(
  HAKAS2KANTA.map((v, i) => ( { n2k: hascac6[i], sefini: v.sefini } )), HAQAKAJ2);
const k6h6L6da = kf2K6h6L6dan(l6da, haveb6kek);

// ⟨ ſɭᴜ ſןᴜ , 📏 ⟩ , ſɭɜ ſɭ,w , ꞙɭı , 📃 ⟩
const hab6qaiQafej2 = new Map<string, number>();
const pa12Je = ( x: number, z: number ): number => {
  const ca3aq = x + "," + z;
  let l6da = hab6qaiQafej2.get(ca3aq);
  if ( l6da === undefined ) {
    l6da = surGrid(k6h6TeruDeVeb6kek(x, z, [], K6H6AEKSTERAP2SOMANI, k6h6L6da).hateru);
    hab6qaiQafej2.set(ca3aq, l6da);
  }
  return l6da;
};
const hacakukkaj2sai = haveb6kek.map(k => ( { x: k.x, z: k.z, l6da: pa12Je(k.x, k.z) } ));

// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫
/* ſɭᴜ ſןᴜ , ꞙɭı ,
    @param x, z ( number ) - ſ̀ȷᴜ ſɭᴜƽ ʌ ſɭэ ֭ſɭэ
    @param sefini ( number ) - j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſɭэ ֭ſɭэ
@returns l6da ( number ) - j͐ʃэ ɭ(ᴜ ʌ ſןᴜ ſᶘɹ */
function pontaFinL6da( x: number, z: number, sefini: number ): number {
  let kmaTsiike: typeof haveb6kek[number] | null = null, kmaC2na = Infinity;
  for ( const k of haveb6kek ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < kmaC2na ) { kmaC2na = d; kmaTsiike = k; }
  }
  if ( kmaTsiike && kmaC2na < K6H6AEKSTERAP2SOMANI + K6H6ATRUAP2SOMANI )
    return k6h6TeruDeVeb6kek(kmaTsiike.x, kmaTsiike.z, kmaTsiike.c2w2qa,
      K6H6AEKSTERAP2SOMANI, k6h6L6da).hateru;
  return k6h6Teru(x, z, sefini);
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
interface K6h6Teru {
  l6da: ( x: number, z: number ) => number;
  sost2cel2sai: boolean;
  tsasaStarto: number;
  tsasatlakak: number;
}

/* ſɭᴜ ſןᴜ , ꞙɭɿ ,
    @param i ( number ) - ſɭɹ ſȷɔ ʌ ſɭэ ֭ſɭэ
@returns teru ( K6h6Teru ) - j͐ʃэ ɭ(ᴜ ʌ j͑ʃᴜ ｡ ſᶘᴜ j͑ʃᴜ ʌ ſɭw */
function teruDeK6h6( i: number ): K6h6Teru {
  const n2k = hascac6[i];
  const sefini = HAKAS2KANTA[i].c2kanuSefini ?? HAKAS2KANTA[i].sefini;
  const tsekePontaTsasa = kf2PontanAkvanTeston(n2k, sefini, tsekeVeraTsasa);
  const sost2cel2sai = havasAkvanTrunkon(n2k, tsekePontaTsasa);
  if ( sost2cel2sai ) {
    const s2qena = vepaqPontanS2qena(n2k, sefini, k6h6Teru,
      ( x, z ) => tsekePontaTsasa(x, z) ? tsasaVem2(x, z) : -Infinity,
      pontaFinL6da, l6da);
    const t2bakobesai = s2qena.t2bakobesai[0];
    const tsasaStarto = t2bakobesai
      ? h6kuniDe(n2k, t2bakobesai.ax, t2bakobesai.az) : 0;
    const tsasatlakak = t2bakobesai
      ? h6kuniDe(n2k, t2bakobesai.bx, t2bakobesai.bz) : 0;
    return {
      l6da: ( x, z ) => s2qena.l6da(x, z),
      sost2cel2sai, tsasaStarto, tsasatlakak };
  }
  const s2qena = kf2NivelanS2qena(n2k, k6h6SefiniP2somani( sefini ),
    k6h6L6da, tsasatlakak, hacakukkaj2sai);
  return { l6da: ( x, z ) => s2qena.l6daJe(h6kuniDe(n2k, x, z)),
    sost2cel2sai, tsasaStarto: 0, tsasatlakak: s2qena.sahakani };
}

// ⟪ ſɭэ ֭ſɭэ , 📏 ⟫
/* ſɭэ ֭ſɭэ , ꞙɭı ,
    @param n2k ( [ number , number ] [ ] ) - }ʃɹƽ ʌ ſɭэ ֭ſɭэ
    @param x, z ( number ) - }ʃɹƽ
@returns s ( number ) - ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭэ ֭ſɭэ */
function h6kuniDe( n2k: readonly K6h6N2k[], x: number, z: number ): number {
  let kur = 0, kmaXobe = Infinity, kmaS = 0;
  for ( let k = 0; k < n2k.length - 1; k++ ) {
    const a = n2k[k], b = n2k[k + 1];
    const dx = b[0] - a[0], dz = b[1] - a[1];
    const l2 = dx * dx + dz * dz;
    const sahakani = Math.sqrt(l2);
    if ( sahakani < 0o10 ** -0o6 ) continue;
    const t = Math.max(0, Math.min(1, ( ( x - a[0] ) * dx + ( z - a[1] ) * dz ) / l2));
    const d = Math.hypot(a[0] + dx * t - x, a[1] + dz * t - z);
    if ( d < kmaXobe ) { kmaXobe = d; kmaS = kur + sahakani * t; }
    kur += sahakani;
  }
  return kmaS;
}

// ⟪ ſɭэ ֭ſɭэ , 📃 ⟫
/* ſɭэ ֭ſɭэ , ꞙɭɿ ,
    @param n2k ( [ number , number ] [ ] ) - }ʃɹƽ ʌ ſɭэ ֭ſɭэ
    @param s ( number ) - ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭэ ֭ſɭэ
@returns p ( { x , z } ) - }ʃɹƽ */
// ⟨ ı],ᴜ ֭ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
const n2kJe = ( n2k: readonly K6h6N2k[], s: number ): { x: number; z: number } =>
  n2kJeBaza( n2k, s, 0o10 ** -0o6 );

// ⟪ ſןɔ˞ᴜƴ , 📏 ⟫
/* ſןɔ˞ᴜƴ , ꞙɭı ,
    @param hateru ( { x , z , y } [ ] ) - j͐ʃэ ɭ(ᴜ ʌ j͑ʃɜ ſɭ,ᴜ ʌ j͑ʃ'ɜ ſɭᴜ j͑ʃп́ꞇ
@returns dipo ( { jufu , x , z , s } | null ) - ֭ſɭэ ſɭэ ɭl̀w ſȷw ɭl̀ᴜ */
function kmaProfundaDipo(
  hateru: readonly { x: number; z: number; y: number; s: number }[]
): { jufu: number; x: number; z: number; s: number } | null {
  let dipo: { jufu: number; x: number; z: number; s: number } | null = null;
  for ( let i = 1; i < hateru.length - 1; i++ ) {
    let maldekstra = -Infinity, dekstra = -Infinity;
    for ( let j = i - 1; j >= 0; j-- ) {
      if ( hateru[i].s - hateru[j].s > DIPDISTO ) break;
      maldekstra = Math.max(maldekstra, hateru[j].y);
    }
    for ( let j = i + 1; j < hateru.length; j++ ) {
      if ( hateru[j].s - hateru[i].s > DIPDISTO ) break;
      dekstra = Math.max(dekstra, hateru[j].y);
    }
    const jufu = Math.min(maldekstra, dekstra) - hateru[i].y;
    if ( jufu > ( dipo?.jufu ?? 0 ) )
      dipo = { jufu, x: hateru[i].x, z: hateru[i].z, s: hateru[i].s };
  }
  return dipo;
}

// ⟪ ſןɔ˞ᴜƴ , 📏 ⟫
/* ſןɔ˞ᴜƴ , ꞙɭɿ ,
    @param x, z ( number ) - }ʃɹƽ
@returns h6kuni ( number ) - ֭ſɭэ ſɭw }ʃꞇ ｡ ſןɔ ｡ Infinity ｡ ſɭᴜ ｡ ſןɔ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ */
function distoAlLandon( x: number, z: number ): number {
  let plosteq = Infinity;
  for ( const p of hat6lima ) plosteq = Math.min(plosteq, Math.hypot(p[0] - x, p[1] - z));
  return plosteq;
}

let difektaj = 0, jufu = 0;
for ( let i = 0; i < HAKAS2KANTA.length; i++ ) {
  const teru = teruDeK6h6(i);
  const n2k = hascac6[i];
  let sahakani = 0;
  for ( let k = 0; k < n2k.length - 1; k++ )
    sahakani += Math.hypot(n2k[k + 1][0] - n2k[k][0], n2k[k + 1][1] - n2k[k][1]);
  const hateru: { x: number; z: number; y: number; s: number }[] = [];
  const k2fe = Math.max(1, Math.ceil(sahakani / PAŜO));
  for ( let k = 0; k <= k2fe; k++ ) {
    const s = sahakani * k / k2fe;
    const p = n2kJe(n2k, s);
    hateru.push({ x: p.x, z: p.z, y: teru.l6da(p.x, p.z), s });
  }
  const dipo = kmaProfundaDipo(hateru);
  const kaatse = teru.sost2cel2sai ? "ſɟɹƽ ꞁȷ̀ᴜ }ʃw" : "ſɭэ ֭ſɭэ";
  if ( !dipo ) {
    console.log(`  ${kaatse} ${i} ${HAKAS2KANTA[i].ksaka} ｡ ſןɔ ʌ ֭ſɭэ ſɭэ ｡ ſɭэ }ʃᴜ ${sahakani.toFixed(1)}`);
    continue;
  }
  const t6lima = distoAlLandon(dipo.x, dipo.z);
// ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭɿ , 📃 ⟩
  const tsasa = teru.sost2cel2sai
    ? Math.min(Math.abs(dipo.s - teru.tsasaStarto), Math.abs(dipo.s - teru.tsasatlakak))
    : Infinity;
  const tsiike = Math.min(t6lima, tsasa) < PROKSIMA;
  if ( dipo.jufu > DIPLIMO && tsiike ) difektaj++;
  if ( dipo.jufu > jufu ) jufu = dipo.jufu;
  console.log(`  ${kaatse} ${i} ${HAKAS2KANTA[i].ksaka} ｡ ֭ſɭэ ſɭэ ${dipo.jufu.toFixed(3)}` +
    ` @${dipo.x.toFixed(1)},${dipo.z.toFixed(1)} s=${dipo.s.toFixed(1)}` +
    ` ｡ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${t6lima === Infinity ? "-" : t6lima.toFixed(1)}` +
    ` ｡ ᶅſэ ſ͕ɭᴜ ʌ ſᶘᴜ j͑ʃᴜ ${tsasa === Infinity ? "-" : tsasa.toFixed(1)}` +
    ( dipo.jufu > DIPLIMO && tsiike ? "  ⚠" : "" ));
}
console.log(`ſɭэ ֭ſɭэ ${HAKAS2KANTA.length} ｡ ֭ſɭэ ſɭэ ʌ ſᶘɹ ſɭɔ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ｡ ɭl̀ᴜ ʌ ſןͷ̗ɜ j͑ʃƨɔȝ ${difektaj}` +
  ` ｡ ֭ſɭэ ſɭэ ɭl̀w ſȷw ɭl̀ᴜ ${jufu.toFixed(3)}`);

// ⟪ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭɿ , 📏 ⟫
// ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
console.log("<( ſ̀ȷᴜ ſɭᴜƽ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw )>");
for ( let i = 0; i < HAKAS2KANTA.length; i++ ) {
  const teru = teruDeK6h6(i);
  if ( !teru.sost2cel2sai ) continue;
  const n2k = hascac6[i];
  const xaqadi = n2k[0], z2hak = n2k[ n2k.length - 1 ];
  const sefini = HAKAS2KANTA[i].c2kanuSefini ?? HAKAS2KANTA[i].sefini;
  const dezirata0 = pontaFinL6da(xaqadi[0], xaqadi[1], sefini);
  const dezirata1 = pontaFinL6da(z2hak[0], z2hak[1], sefini);
  console.log(`  ${i} ${HAKAS2KANTA[i].ksaka}` +
    ` ｡ j͑ʃᴜ ı],ɔ ${teru.l6da(xaqadi[0], xaqadi[1]).toFixed(3)} ｡ ſןᴜ ſᶘɹ ${dezirata0.toFixed(3)}` +
    ` ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${( teru.l6da(xaqadi[0], xaqadi[1]) - dezirata0 ).toFixed(3)}` +
    ` ｡ ſ̀ȷᴜ ſɭᴜƽ ${teru.l6da(z2hak[0], z2hak[1]).toFixed(3)} ｡ ſןᴜ ſᶘɹ ${dezirata1.toFixed(3)}` +
    ` ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${( teru.l6da(z2hak[0], z2hak[1]) - dezirata1 ).toFixed(3)}`);
}
