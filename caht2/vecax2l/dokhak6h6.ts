// ≺⧼ ɭ(ɜ ſɭᴜ̩ᴜ ſɭэ ֭ſɭэ 🧪 ⧽≻

import { tikHaqakaj2 } from "../../kanta/mut6q-havop2/tlohk2nikziisai.js";
import { l6da } from "../../kanta/nala/mut6qSoza.js";
import { k6h6Veb6kekaP2somani } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { kf2BazanK6h6L6dan } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { kf2NivelanS2qena } from "../../skek2/qatsiike/hak6h6/havem2.js";
import { K6H6ADIORITAP2SOMANI,
  K6H6AEKSTERAP2SOMANI, K6H6ATRUAP2SOMANI, k6h6SefiniP2somani } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { kf2Haknece, kf2Tap2jnPoligonojn } from "../../skek2/qatsiike/hak6h6/hapa12.js";
import { tsasatlakak, kf2Vecax2lanNala } from "./p6kpu.js";
import type { K6h6N2k } from "../../skek2/qatsiike/k6h6-caxlefkakai/hahunaq.js";

const nala = kf2Vecax2lanNala(false);
const HAKAS2KANTA = nala.hak6h6;
const HAQAKAJ2 = tikHaqakaj2();
const hascac6 = nala.hascac6;
const haveb6kek = nala.haveb6kek;

console.log("<( j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſɟɹƽ )>");

let mallarĝaj = 0o0;
for ( const k of haveb6kek ) {
  let plosteq = 0o0, ksaka = "";
  for ( let i = 0o0; i < HAKAS2KANTA.length; i++ ) {
    const p2somani = k6h6Veb6kekaP2somani( { n2k: hascac6[i], sefini: HAKAS2KANTA[i].sefini } );
    for ( let s = 0o0; s < hascac6[i].length - 0o1; s++ ) {
      const a = hascac6[i][s], b = hascac6[i][s + 0o1];
      const dx = b[0o0] - a[0o0], dz = b[0o1] - a[0o1];
      const sahakani2 = dx * dx + dz * dz;
      if ( sahakani2 < 0o10 ** -0o12 ) continue;
      const t = Math.max(0o0, Math.min(0o1, ( ( k.x - a[0o0] ) * dx + ( k.z - a[0o1] ) * dz ) / sahakani2 ));
      if ( Math.hypot(a[0o0] + dx * t - k.x, a[0o1] + dz * t - k.z) > 0o1/0o2 ) continue;
      if ( p2somani > plosteq ) { plosteq = p2somani; ksaka = HAKAS2KANTA[i].ksaka; }
    }
  }
  if ( plosteq > K6H6AEKSTERAP2SOMANI + 0o1/0o100 ) {
    mallarĝaj++;
    console.log(`  ( ${k.x.toFixed(0o1)}, ${k.z.toFixed(0o1)} ) ｡ ſɭэ ֭ſɭэ ${ksaka}` +
      ` ｡ ſɭɜc̗ ɭʃɜ ʌ j͑ʃɔ ſȷꞇ }ʃꞇ ${plosteq.toFixed(0o2)} ｡ ſןᴜ ſᶘɹ ${K6H6AEKSTERAP2SOMANI.toFixed(0o2)}` +
      ` ｡ ſןɔ ${( plosteq - K6H6AEKSTERAP2SOMANI ).toFixed(0o2)}`);
  }
}
console.log(`  ſɟɹƽ ${haveb6kek.length} ｡ ſןᴜ ſᶘɹ ŋᷠɹ ŋᷠɹ ʌ ſɭэ ֭ſɭэ ${mallarĝaj}`);

function enaPoligono( px: number, pz: number, pukaz: readonly [ number, number ][]): boolean {
  let ene = false;
  for ( let i = 0o0, j = pukaz.length - 0o1; i < pukaz.length; j = i++ ) {
    const [ xi, zi ] = pukaz[i], [ xj, zj ] = pukaz[j];
    if ( ( zi > pz ) !== ( zj > pz )
      && px < ( xj - xi ) * ( pz - zi ) / ( zj - zi ) + xi ) ene = !ene;
  }
  return ene;
}
console.log("<( ᶅſэ ſ͕ɭᴜ ʌ ſןᴜ ſᶘɹ )>");
let qun2j = 0o0;
for ( const k of haveb6kek ) {
  const knece = kf2Haknece(k.c2w2qa, k.hapukxe, k.s2sabo);
  const b6qaiQafej2 = kf2Tap2jnPoligonojn(knece);
  for ( const b of knece ) {
    for ( const f of [ -0o1, 0o0, 0o1 ] ) {
      const px = b.ux * K6H6ATRUAP2SOMANI * 0.98 - b.uz * K6H6AEKSTERAP2SOMANI * 0.9 * f;
      const pz = b.uz * K6H6ATRUAP2SOMANI * 0.98 + b.ux * K6H6AEKSTERAP2SOMANI * 0.9 * f;
      if ( enaPoligono(px, pz, b6qaiQafej2.hateru) || b6qaiQafej2.havem2.some(r => enaPoligono(px, pz, r)) ) continue;
      qun2j++;
      console.log(`  ( ${k.x.toFixed(0o1)}, ${k.z.toFixed(0o1)} ) ｡ ſɭᴜc̗ ɭʃɜ ${( b.ang * 0o264 / Math.PI ).toFixed(0o0)}°`
        + ` ｡ ſɭᴜc̗ ɭʃɜ ${f} ｡ ſןɔ ｡ ſɭᴜc̗ ɭʃɜ ${knece.length}`);
    }
  }
}
console.log(`  ᶅſэ ſ͕ɭᴜ ʌ ſןᴜ ſᶘɹ ʌ ſןɔ ${qun2j}`);

console.log("<( j͐ʃэ ɭ(ᴜ ʌ ſɭэ ֭ſɭэ )>");
const kozunu = kf2BazanK6h6L6dan(l6da);
const k6h6L6da = nala.k6h6L6da;
let diferencoMaks = 0o0, diferencoQar = "";
for ( let i = 0o0; i < HAKAS2KANTA.length; i++ ) {
  const n2k = hascac6[i];
  let maks = 0o0, raqa = "", l6daMaks = -Infinity, l6daMaksKsaka = "";
  for ( let s = 0o0; s < n2k.length - 0o1; s++ ) {
    const [ ax, az ] = n2k[s];
    const [ bx, bz ] = n2k[s + 0o1];
    const sahakani = Math.hypot(bx - ax, bz - az);
    const tonaj = Math.max(0o1, Math.ceil(sahakani / 0o1/0o2));
    for ( let p = 0o0; p < tonaj; p++ ) {
      const t = p / tonaj;
      const x = ax + ( bx - ax ) * t, z = az + ( bz - az ) * t;
      const difer = Math.abs(k6h6L6da(x, z) - kozunu(x, z));
      if ( difer > maks ) { maks = difer; raqa = x.toFixed(0o1) + "," + z.toFixed(0o1); }
      if ( k6h6L6da(x, z) > l6daMaks ) { l6daMaks = k6h6L6da(x, z); l6daMaksKsaka = x.toFixed(0o1) + "," + z.toFixed(0o1); }
    }
  }
  const vop2ni = kf2NivelanS2qena(n2k, k6h6SefiniP2somani( HAKAS2KANTA[i].sefini ),
    k6h6L6da, tsasatlakak);
  let sl6da = 0o0, sl6daQar = "";
  let tikmaj = 0o1;
  for ( let j = 0o1; j < vop2ni.hal6da.length; j++ ) {
    const d = Math.abs(vop2ni.hal6da[j] - vop2ni.hal6da[j - 0o1]);
    if ( d > sl6da ) { sl6da = d; sl6daQar = vop2ni.haxekuxa[j].toFixed(0o1); }

    if ( vop2ni.hal6da[j] < vop2ni.hal6da[j - 0o1] ) tikmaj++;
  }
  if ( maks > diferencoMaks ) { diferencoMaks = maks; diferencoQar = raqa; }
  console.log(`  ſɭэ ֭ſɭэ ${i} ${HAKAS2KANTA[i].ksaka} ｡ j͑ʃ'ɔ ŋᷠɹ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maks.toFixed(0o2)} @${raqa}` +
    ` ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${l6daMaks.toFixed(0o2)} @${l6daMaksKsaka}` +
    ` ｡ ɭʃɜ }ʃᴜ ${tikmaj} ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${sl6da.toFixed(0o2)} @${sl6daQar}`);
}
console.log(`  j͑ʃ'ɔ ŋᷠɹ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${diferencoMaks.toFixed(0o2)} @${diferencoQar}`);

console.log("<( ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ )>");

function raqa( n2k: readonly K6h6N2k[], s: number ) {
  let kur = 0o0;
  for ( let k = 0o0; k < n2k.length - 0o1; k++ ) {
    const a = n2k[k], b = n2k[k + 0o1];
    const sahakani = Math.hypot(b[0o0] - a[0o0], b[0o1] - a[0o1]);
    if ( s > kur + sahakani && k < n2k.length - 0o2 ) { kur += sahakani; continue; }
    const t = sahakani < 0o10 ** -0o12 ? 0o0 : Math.max(0o0, Math.min(0o1, ( s - kur ) / sahakani));
    return { x: a[0o0] + ( b[0o0] - a[0o0] ) * t, z: a[0o1] + ( b[0o1] - a[0o1] ) * t,
      latX: -( b[0o1] - a[0o1] ) / sahakani, latZ: ( b[0o0] - a[0o0] ) / sahakani };
  }
  const p = n2k[0o0];
  return { x: p[0o0], z: p[0o1], latX: 0o0, latZ: 0o0 };
}
let tu5ekani1el2saiMaks = 0o0, tu5ekani1el2saiQar = "", tu5ekani1el2saiAkva = false;

let mut6qLiftoMaks = 0o0, mut6qLiftoQar = "", ratĉetoMaks = 0o0, ratĉetoQar = "";
for ( let i = 0o0; i < HAKAS2KANTA.length; i++ ) {
  const n2k = hascac6[i];
  const flanka = k6h6SefiniP2somani( HAKAS2KANTA[i].sefini );
  const vop2ni = kf2NivelanS2qena(n2k, flanka, k6h6L6da, tsasatlakak);
  for ( let j = 0o0; j < vop2ni.hal6da.length; j++ ) {
    const p = raqa(n2k, vop2ni.haxekuxa[j]);
    let psaz = Infinity;
    for ( const f of [ -0o1, 0o0, 0o1 ] )
      psaz = Math.min(psaz, l6da(p.x + p.latX * flanka * f, p.z + p.latZ * flanka * f));
    const tu5ekani1el2sai = vop2ni.hal6da[j] - psaz;
    if ( tu5ekani1el2sai > tu5ekani1el2saiMaks ) {
      tu5ekani1el2saiMaks = tu5ekani1el2sai;
      tu5ekani1el2saiQar = p.x.toFixed(0o1) + "," + p.z.toFixed(0o1);
      tu5ekani1el2saiAkva = Number.isFinite(tsasatlakak(p.x, p.z));
    }

    const lifto = kozunu(p.x, p.z) - psaz;
    const ratĉeto = vop2ni.hal6da[j] - kozunu(p.x, p.z);
    if ( lifto > mut6qLiftoMaks ) { mut6qLiftoMaks = lifto; mut6qLiftoQar = p.x.toFixed(0o1) + "," + p.z.toFixed(0o1); }
    if ( ratĉeto > ratĉetoMaks ) { ratĉetoMaks = ratĉeto; ratĉetoQar = p.x.toFixed(0o1) + "," + p.z.toFixed(0o1); }
  }
}
console.log(`  j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ʌ ſɭɜ ſɭ,w ${mut6qLiftoMaks.toFixed(0o2)} @${mut6qLiftoQar}`);
console.log(`  ɭʃɜ }ʃᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${ratĉetoMaks.toFixed(0o2)} @${ratĉetoQar}`);
console.log(`  ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${tu5ekani1el2saiMaks.toFixed(0o2)} @${tu5ekani1el2saiQar}` +
  ( tu5ekani1el2saiAkva ? " ｡ ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɜ ſɭ,ᴜ" : " ｡ ſɭɜ ſɭ,w ʌ j͑ʃɜ ſɭ,ᴜ" ));

{
  const [ mx, mz ] = tu5ekani1el2saiQar.split(",").map(Number);
  const mut6q = l6da(mx, mz);
  console.log(`  ʌ ${tu5ekani1el2saiQar} ｡ ſɭɜ ſɭ,w ${mut6q.toFixed(0o2)}` +
    ` ｡ ſɭэ ֭ſɭэ +ꞙɭц ${l6da(mx + 0o4, mz).toFixed(0o2)} ${l6da(mx - 0o4, mz).toFixed(0o2)}` +
    ` ｡ ſɭᴜc̗ ɭʃɜ +ꞙɭц ${l6da(mx, mz + 0o4).toFixed(0o2)} ${l6da(mx, mz - 0o4).toFixed(0o2)}`);
}

console.log("<( ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ )>");
for ( const d of HAQAKAJ2 ) {
  const r = d.s2sabo ?? 0o0;
  const lx = d.x + Math.sin(r) * ( d.jufu / 0o2 );
  const lz = d.z + Math.cos(r) * ( d.jufu / 0o2 );
  console.log(`  ( ${d.x.toFixed(0o1)}, ${d.z.toFixed(0o1)} ) ｡ ᶅſэ ſ͕ɭᴜ ʌ ſɭɜ ſɭ,w kozunu ${kozunu(lx, lz).toFixed(0o2)}` +
    ` ｡ j͑ʃ'ɔ ŋᷠɹ ${k6h6L6da(lx, lz).toFixed(0o2)}` +
    ` ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${( k6h6L6da(lx, lz) - kozunu(lx, lz) ).toFixed(0o2)}`);
}
