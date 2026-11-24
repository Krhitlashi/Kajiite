// ≺⧼ ſɭэ ֭ſɭэ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſןᴜ ſᶘɹ ʌ j͐ʃэ ɭ(ᴜ 🧪 ⧽≻
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭэ ֭ſɭэ , ꞙɭɿ ,
// ſɭэ ֭ſɭэ , ꞙɭц , 📃 ⟩
import { aktivajHaqakaj2 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { k6h6KunigaDuono } from "../../eskekoj/medio/voj-reto.js";
import { kf2BazanK6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { kf2NivelanProfilon } from "../../eskekoj/medio/hak6h6/havem2.js";
import { VOJA_DIORITA_DUONO,
  VOJA_EKSTERA_DUONO, VOJA_TRUA_DUONO, k6h6LarghoDuono } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { kf2Brakojn, kf2PlatajnPoligonojn } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { akvaFino, kf2MezuranMondon } from "./komunaj.js";
import type { K6h6Punkto } from "../../eskekoj/medio/voj-reto/hahunaq.js";

// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
// ⟨ ſɭэ ᶗ‹ , 📏 ⟩ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
const mondo = kf2MezuranMondon(false);
const VOJOJ = mondo.hak6h6;
const DOKOJ = aktivajHaqakaj2();
const gluitaj = mondo.gluitaj;
const haveb6kek = mondo.haveb6kek;

// ⟪ ſɭᴜ ſןᴜ , ꞙɭı , 📏 ⟫
console.log("<( j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſɟɹƽ )>");
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
let mallarĝaj = 0;
for ( const k of haveb6kek ) {
  let plej = 0, ksaka = "";
  for ( let i = 0; i < VOJOJ.length; i++ ) {
    const p2somani = k6h6KunigaDuono( { n2k: gluitaj[i], sefini: VOJOJ[i].sefini } );
    for ( let s = 0; s < gluitaj[i].length - 1; s++ ) {
      const a = gluitaj[i][s], b = gluitaj[i][s + 1];
      const dx = b[0] - a[0], dz = b[1] - a[1];
      const longo2 = dx * dx + dz * dz;
      if ( longo2 < 0o10 ** -0o12 ) continue;
      const t = Math.max(0, Math.min(1, ( ( k.x - a[0] ) * dx + ( k.z - a[1] ) * dz ) / longo2 ));
      if ( Math.hypot(a[0] + dx * t - k.x, a[1] + dz * t - k.z) > 0o1/0o2 ) continue;
      if ( p2somani > plej ) { plej = p2somani; ksaka = VOJOJ[i].ksaka; }
    }
  }
  if ( plej > VOJA_EKSTERA_DUONO + 0o1/0o100 ) {
    mallarĝaj++;
    console.log(`  ( ${k.x.toFixed(1)}, ${k.z.toFixed(1)} ) ｡ ſɭэ ֭ſɭэ ${ksaka}` +
      ` ｡ ſɭɜc̗ ɭʃɜ ʌ j͑ʃɔ ſȷꞇ }ʃꞇ ${plej.toFixed(2)} ｡ ſןᴜ ſᶘɹ ${VOJA_EKSTERA_DUONO.toFixed(2)}` +
      ` ｡ ſןɔ ${( plej - VOJA_EKSTERA_DUONO ).toFixed(2)}`);
  }
}
console.log(`  ſɟɹƽ ${haveb6kek.length} ｡ ſןᴜ ſᶘɹ ŋᷠɹ ŋᷠɹ ʌ ſɭэ ֭ſɭэ ${mallarĝaj}`);

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɿ , 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
function enaPoligono( px: number, pz: number, pukaz: readonly [ number, number ][]): boolean {
  let ene = false;
  for ( let i = 0, j = pukaz.length - 1; i < pukaz.length; j = i++ ) {
    const [ xi, zi ] = pukaz[i], [ xj, zj ] = pukaz[j];
    if ( ( zi > pz ) !== ( zj > pz )
      && px < ( xj - xi ) * ( pz - zi ) / ( zj - zi ) + xi ) ene = !ene;
  }
  return ene;
}
console.log("<( ᶅſэ ſ͕ɭᴜ ʌ ſןᴜ ſᶘɹ )>");
let malplenaj = 0;
for ( const k of haveb6kek ) {
  const knece = kf2Brakojn(k.direktaj, k.fermitaj, k.rotacio);
  const pa12 = kf2PlatajnPoligonojn(knece);
  for ( const b of knece ) {
    for ( const f of [ -1, 0, 1 ] ) {
      const px = b.ux * VOJA_TRUA_DUONO * 0.98 - b.uz * VOJA_EKSTERA_DUONO * 0.9 * f;
      const pz = b.uz * VOJA_TRUA_DUONO * 0.98 + b.ux * VOJA_EKSTERA_DUONO * 0.9 * f;
      if ( enaPoligono(px, pz, pa12.hateru) || pa12.bandoj.some(r => enaPoligono(px, pz, r)) ) continue;
      malplenaj++;
      console.log(`  ( ${k.x.toFixed(1)}, ${k.z.toFixed(1)} ) ｡ ſɭᴜc̗ ɭʃɜ ${( b.ang * 180 / Math.PI ).toFixed(0)}°`
        + ` ｡ ſɭᴜc̗ ɭʃɜ ${f} ｡ ſןɔ ｡ ſɭᴜc̗ ɭʃɜ ${knece.length}`);
    }
  }
}
console.log(`  ᶅſэ ſ͕ɭᴜ ʌ ſןᴜ ſᶘɹ ʌ ſןɔ ${malplenaj}`);

// ⟪ ſɭэ ֭ſɭэ , ꞙɭц , 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
console.log("<( j͐ʃэ ɭ(ᴜ ʌ ſɭэ ֭ſɭэ )>");
const baza = kf2BazanK6h6Alton(alteco);
const k6h6Alteco = mondo.k6h6Alteco;
let diferencoMaks = 0, diferencoLoko = "";
for ( let i = 0; i < VOJOJ.length; i++ ) {
  const n2k = gluitaj[i];
  let maks = 0, raqa = "", altoMaks = -Infinity, altecoMaks = "";
  for ( let s = 0; s < n2k.length - 1; s++ ) {
    const [ ax, az ] = n2k[s];
    const [ bx, bz ] = n2k[s + 1];
    const sahakani = Math.hypot(bx - ax, bz - az);
    const tonaj = Math.max(1, Math.ceil(sahakani / 0o1/0o2));
    for ( let p = 0; p < tonaj; p++ ) {
      const t = p / tonaj;
      const x = ax + ( bx - ax ) * t, z = az + ( bz - az ) * t;
      const difer = Math.abs(k6h6Alteco(x, z) - baza(x, z));
      if ( difer > maks ) { maks = difer; raqa = x.toFixed(1) + "," + z.toFixed(1); }
      if ( k6h6Alteco(x, z) > altoMaks ) { altoMaks = k6h6Alteco(x, z); altecoMaks = x.toFixed(1) + "," + z.toFixed(1); }
    }
  }
  const difino = kf2NivelanProfilon(n2k, k6h6LarghoDuono( VOJOJ[i].sefini ),
    k6h6Alteco, akvaFino);
  let salto = 0, saltoLoko = "";
  let supremaj = 1;
  for ( let j = 1; j < difino.hal6da.length; j++ ) {
    const d = Math.abs(difino.hal6da[j] - difino.hal6da[j - 1]);
    if ( d > salto ) { salto = d; saltoLoko = difino.haxekuxa[j].toFixed(1); }
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , 📃 ⟩
    if ( difino.hal6da[j] < difino.hal6da[j - 1] ) supremaj++;
  }
  if ( maks > diferencoMaks ) { diferencoMaks = maks; diferencoLoko = raqa; }
  console.log(`  ſɭэ ֭ſɭэ ${i} ${VOJOJ[i].ksaka} ｡ j͑ʃ'ɔ ŋᷠɹ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${maks.toFixed(2)} @${raqa}` +
    ` ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${altoMaks.toFixed(2)} @${altecoMaks}` +
    ` ｡ ɭʃɜ }ʃᴜ ${supremaj} ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${salto.toFixed(2)} @${saltoLoko}`);
}
console.log(`  j͑ʃ'ɔ ŋᷠɹ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${diferencoMaks.toFixed(2)} @${diferencoLoko}`);

// ⟪ ſןɔ˞ᴜƴ , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
console.log("<( ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ )>");
// ⟨ ſɭэ һɔ , ꞙɭɿ , 📃 ⟩
function raqa( n2k: readonly K6h6Punkto[], s: number ) {
  let kur = 0;
  for ( let k = 0; k < n2k.length - 1; k++ ) {
    const a = n2k[k], b = n2k[k + 1];
    const sahakani = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if ( s > kur + sahakani && k < n2k.length - 2 ) { kur += sahakani; continue; }
    const t = sahakani < 0o10 ** -0o12 ? 0 : Math.max(0, Math.min(1, ( s - kur ) / sahakani));
    return { x: a[0] + ( b[0] - a[0] ) * t, z: a[1] + ( b[1] - a[1] ) * t,
      latX: -( b[1] - a[1] ) / sahakani, latZ: ( b[0] - a[0] ) / sahakani };
  }
  const p = n2k[0];
  return { x: p[0], z: p[1], latX: 0, latZ: 0 };
}
let muroMaks = 0, muroLoko = "", muroAkva = false;
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
let teroLiftoMaks = 0, teroLiftoLoko = "", ratĉetoMaks = 0, ratĉetoLoko = "";
for ( let i = 0; i < VOJOJ.length; i++ ) {
  const n2k = gluitaj[i];
  const flanka = k6h6LarghoDuono( VOJOJ[i].sefini );
  const difino = kf2NivelanProfilon(n2k, flanka, k6h6Alteco, akvaFino);
  for ( let j = 0; j < difino.hal6da.length; j++ ) {
    const p = raqa(n2k, difino.haxekuxa[j]);
    let fundo = Infinity;
    for ( const f of [ -1, 0, 1 ] )
      fundo = Math.min(fundo, alteco(p.x + p.latX * flanka * f, p.z + p.latZ * flanka * f));
    const muro = difino.hal6da[j] - fundo;
    if ( muro > muroMaks ) {
      muroMaks = muro;
      muroLoko = p.x.toFixed(1) + "," + p.z.toFixed(1);
      muroAkva = Number.isFinite(akvaFino(p.x, p.z));
    }
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ſןɔ˞ᴜƴ , ꞙɭɔ , 📃 ⟩
    const lifto = baza(p.x, p.z) - fundo;
    const ratĉeto = difino.hal6da[j] - baza(p.x, p.z);
    if ( lifto > teroLiftoMaks ) { teroLiftoMaks = lifto; teroLiftoLoko = p.x.toFixed(1) + "," + p.z.toFixed(1); }
    if ( ratĉeto > ratĉetoMaks ) { ratĉetoMaks = ratĉeto; ratĉetoLoko = p.x.toFixed(1) + "," + p.z.toFixed(1); }
  }
}
console.log(`  j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ʌ ſɭɜ ſɭ,w ${teroLiftoMaks.toFixed(2)} @${teroLiftoLoko}`);
console.log(`  ɭʃɜ }ʃᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${ratĉetoMaks.toFixed(2)} @${ratĉetoLoko}`);
console.log(`  ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${muroMaks.toFixed(2)} @${muroLoko}` +
  ( muroAkva ? " ｡ ſᶘᴜ j͑ʃᴜ ʌ j͑ʃɜ ſɭ,ᴜ" : " ｡ ſɭɜ ſɭ,w ʌ j͑ʃɜ ſɭ,ᴜ" ));
// ⟨ ſןɔ˞ᴜƴ , ꞙɭɿ , 📃 ⟩
{
  const [ mx, mz ] = muroLoko.split(",").map(Number);
  const tero = alteco(mx, mz);
  console.log(`  ʌ ${muroLoko} ｡ ſɭɜ ſɭ,w ${tero.toFixed(2)}` +
    ` ｡ ſɭэ ֭ſɭэ +ꞙɭц ${alteco(mx + 0o4, mz).toFixed(2)} ${alteco(mx - 0o4, mz).toFixed(2)}` +
    ` ｡ ſɭᴜc̗ ɭʃɜ +ꞙɭц ${alteco(mx, mz + 0o4).toFixed(2)} ${alteco(mx, mz - 0o4).toFixed(2)}`);
}

// ⟪ ſןɔ˞ᴜƴ , ꞙɭɩ , 📏 ⟫
// ⟨ ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
console.log("<( ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ )>");
for ( const d of DOKOJ ) {
  const r = d.rotacio ?? 0;
  const lx = d.x + Math.sin(r) * ( d.profundo / 2 );
  const lz = d.z + Math.cos(r) * ( d.profundo / 2 );
  console.log(`  ( ${d.x.toFixed(1)}, ${d.z.toFixed(1)} ) ｡ ᶅſэ ſ͕ɭᴜ ʌ ſɭɜ ſɭ,w baza ${baza(lx, lz).toFixed(2)}` +
    ` ｡ j͑ʃ'ɔ ŋᷠɹ ${k6h6Alteco(lx, lz).toFixed(2)}` +
    ` ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${( k6h6Alteco(lx, lz) - baza(lx, lz) ).toFixed(2)}`);
}
