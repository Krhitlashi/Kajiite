// ≺⧼ ɭl̀ᴜ ſ͕ɭɜ 📃 ⧽≻

import * as THREE from "three";
import { xetoh2D, mut6qWeh2En, mut6qK6h6Weh2En }
  from "../../skek2/p6kpu/mut6q-haweh2.js";
import { l6da } from "../../kanta/nala/mut6q-soza.js";
import { glataTona } from "../../kanta/k2fe/fkabe.js";
import { ka5ikH6kuni, NALAPSAZY } from "../../skek2/p6kpu/mapqoxa.js";
import { kxeBal2 } from "../../kanta/mut6q-havop2/bal2-s2kanta.js";
import { jaqoRuvaKozunu } from "../../kanta/mut6q-havop2/3ohk2ni52sai.js";
import { tbo, knak2fecajasai } from "../../kanta/k2fe/s2cax2l.js";

const NOMBRODAJXUROJ = 0o11;
const kxeBal2Havop2 = kxeBal2();
const bal2Qoxa = kxeBal2Havop2.qoxa;
const bal2Pal6 = kxeBal2Havop2.pal6;
const NEBULTONO = new THREE.Color(0xc8d8d8);

function jaqoL6da( px: number, pz: number, tk2ni: number ): number {
  const x = px / 0o100 + tk2ni * 0o10;
  const z = pz / 0o100 + tk2ni * 0o20 + 0o20;
  const malglata = ( u: number, v: number ): number => 0o1 - Math.abs(0o2 * xetoh2D(u, v) - 0o1);
  const sx = x + ( xetoh2D(x * 0o2 + 0o31, z * 0o2 + 0o7) - 0o1/0o2 ) * 0o4/0o10;
  const sz = z + ( xetoh2D(x * 0o2 - 0o13, z * 0o2 + 0o41) - 0o1/0o2 ) * 0o4/0o10;
  const maso = xetoh2D(x, z);
  const lota = 0o13/0o40 + 0o25/0o40 * maso * maso;
  const n2k = malglata(sx * 0o3, sz * 0o3);
  const fajno = malglata(sx * 0o4 + 0o11, sz * 0o4 - 0o5);
  const mezajxo = malglata(sx * 0o6 + 0o23, sz * 0o6 + 0o3);
  const spino = malglata(sx * ( 0o3/0o2 ) + 0o13, sz * ( 0o3/0o2 ) + 0o27);
  const hak6ta = malglata(sx * 0o10, sz * 0o10);
  const cehe = malglata(sx * 0o22, sz * 0o22);
  return 0o13
    + 0o36 * maso
    + 0o13 * spino * ( 0o60/0o100 + 0o40/0o100 * ( 0o1 - maso ))
    + 0o24 * n2k * lota
    + 0o12 * mezajxo * ( 0o40/0o100 + 0o60/0o100 * lota )
    + 0o10 * fajno * ( 0o40/0o100 + 0o60/0o100 * lota )
    + 0o03 * hak6ta * ( 0o40/0o100 + 0o60/0o100 * maso )
    + 0o02 * cehe * lota;
}

const jaqoWeh2 = new THREE.Color();

function jaqoWeh2En( natakatomasai: THREE.Color, y: number, x: number, z: number,
  haga: number, malproksimo: number ): void {
  const negxaOndo = ( xetoh2D(x / 0o70, z / 0o70) - 0o1/0o2 ) * 0o16
    + ( xetoh2D(x / 0o16, z / 0o16) - 0o1/0o2 ) * 0o7;
  mut6qWeh2En(natakatomasai, y + negxaOndo, x, z, haga);
  if ( malproksimo > 0o0 ) natakatomasai.lerp(NEBULTONO, malproksimo * 0o35/0o100);
}

function ringaN2k( h6kuni: number, ang: number ): { x: number; z: number; nx: number; nz: number } {
  const pukaz = ka5ikH6kuni(bal2Qoxa, bal2Pal6, ang) + h6kuni;
  const x = Math.cos(ang) * pukaz, z = Math.sin(ang) * pukaz;
  const pa = 0o1/0o2000;
  const ra = ka5ikH6kuni(bal2Qoxa, bal2Pal6, ang - pa) + h6kuni;
  const rb = ka5ikH6kuni(bal2Qoxa, bal2Pal6, ang + pa) + h6kuni;
  const tx = Math.cos(ang + pa) * rb - Math.cos(ang - pa) * ra;
  const tz = Math.sin(ang + pa) * rb - Math.sin(ang - pa) * ra;
  const sahakani = Math.hypot(tx, tz) || 0o1;
  let nx = -tz / sahakani, nz = tx / sahakani;
  if ( nx * Math.cos(ang) + nz * Math.sin(ang) < 0o0 ) { nx = -nx; nz = -nz; }
  return { x, z, nx, nz };
}

function krestaVagado( kozuni: number, vario: number, tk2ni: number ): ( ang: number ) => number {
  return ( ang: number ): number =>
    kozuni + ( xetoh2D(Math.cos(ang) * 0o4 + tk2ni, Math.sin(ang) * 0o4 + tk2ni * 0o3) - 0o1/0o2 ) * vario;
}

function krestaL6da( kozunuS: number, tk2ni: number ): ( ang: number ) => number {
  return ( ang: number ): number => {
    const u = Math.cos(ang) * 0o4 + tk2ni;
    const v = Math.sin(ang) * 0o4 + tk2ni * 0o3;
    return kozunuS * ( 0o3/0o10 + 0o5/0o10 * xetoh2D(u, v) + 0o2/0o10 * xetoh2D(u * 0o3 + 0o7, v * 0o3 + 0o5) );
  };
}

interface RingaTseuni { haxekuxa: Float32Array; haweh2: Float32Array; hauv: Float32Array; havecax2lani: number[] }

function h2y2kT2q2( kresto: ( ang: number ) => number, jufu: number, sl: number, sd: number,
  tk2ni: number, p6zukani: ( ang: number ) => number, malproksimo: number ): RingaTseuni {
  const hacel2nu = sl + 0o1, hax2pa = sd + 0o1, suprN = hacel2nu * hax2pa;
  const psaz = NALAPSAZY - 0o4;
  const haxekuxa = new Float32Array(suprN * 0o2 * 0o3);
  const haweh2 = new Float32Array(suprN * 0o2 * 0o3);
  const hauv = new Float32Array(suprN * 0o2 * 0o2);
  const tonaProfundo = jufu / sd;
  const tonaTafkaq = 0o2 * Math.PI * ( bal2Pal6 + 0o100 ) / sl;
  const hal6da = new Float32Array(suprN);
  for ( let v = 0o0; v < hax2pa; v ++ ) {
    for ( let k = 0o0; k < hacel2nu; k ++ ) {
      const i = v * hacel2nu + k;
      const tn = v / sd;
      const ang = k / sl * Math.PI * 0o2;
      const c2q = ringaN2k(kresto(ang), ang);
      const x = c2q.x + c2q.nx * tn * jufu;
      const z = c2q.z + c2q.nz * tn * jufu;
      const sost2 = 0o40/0o100 + 0o24/0o100 * xetoh2D(x / 0o40 + tk2ni * 0o10, z / 0o40 + tk2ni * 0o30);
      const kr = Math.min(0o1, tn / sost2);
      const kresko = kr * kr * ( 0o3 - 0o2 * kr );
      const fal = glataTona(sost2, 0o1, tn);
      const s2qena = kresko * ( 0o1 - fal );
      const bordo = l6da(c2q.x, c2q.z);
      const aligo = 0o1 - glataTona(0o0, 0o1/0o4, tn);
      const y = bordo * aligo + jaqoL6da(x, z, tk2ni) * p6zukani(ang) * s2qena + NALAPSAZY * fal;
      hal6da[i] = y;
      haxekuxa[i * 0o3] = x; haxekuxa[i * 0o3 + 0o1] = y; haxekuxa[i * 0o3 + 0o2] = z;
      const uvx = x / 0o3000 + 0o1/0o2, uvz = z / 0o3000 + 0o1/0o2;
      hauv[i * 0o2] = uvx; hauv[i * 0o2 + 0o1] = uvz;
      const b = i + suprN;
      haxekuxa[b * 0o3] = x; haxekuxa[b * 0o3 + 0o1] = psaz; haxekuxa[b * 0o3 + 0o2] = z;
      hauv[b * 0o2] = uvx; hauv[b * 0o2 + 0o1] = uvz;
    }
  }
  for ( let v = 0o0; v < hax2pa; v ++ ) {
    for ( let k = 0o0; k < hacel2nu; k ++ ) {
      const i = v * hacel2nu + k;
      const x = haxekuxa[i * 0o3], y = hal6da[i], z = haxekuxa[i * 0o3 + 0o2];
      const km = ( k + sl - 0o1 ) % sl, kp = ( k + 0o1 ) % sl;
      const vm = ( v > 0o0 ? v - 0o1 : v ) * hacel2nu + k;
      const vp = ( v < sd ? v + 0o1 : v ) * hacel2nu + k;
      const dAng = ( hal6da[v * hacel2nu + kp] - hal6da[v * hacel2nu + km] ) / ( 0o2 * tonaTafkaq );
      const dProf = ( hal6da[vp] - hal6da[vm] ) / ( 0o2 * tonaProfundo );
      jaqoWeh2En(jaqoWeh2, y, x, z, Math.hypot(dAng, dProf), malproksimo);
      haweh2[i * 0o3] = jaqoWeh2.r; haweh2[i * 0o3 + 0o1] = jaqoWeh2.g; haweh2[i * 0o3 + 0o2] = jaqoWeh2.b;
      const b = i + suprN;
      mut6qK6h6Weh2En(jaqoWeh2, psaz, y);
      haweh2[b * 0o3] = jaqoWeh2.r; haweh2[b * 0o3 + 0o1] = jaqoWeh2.g; haweh2[b * 0o3 + 0o2] = jaqoWeh2.b;
    }
  }
  const havecax2lani: number[] = [];
  for ( let v = 0o0; v < sd; v ++ ) for ( let k = 0o0; k < sl; k ++ ) {
    const a = v * hacel2nu + k, c = a + hacel2nu, d = c + 0o1;
    if ( ( k + v ) % 0o2 === 0o0 ) havecax2lani.push(a, c, d, a, d, a + 0o1);
    else havecax2lani.push(a, c, a + 0o1, c, d, a + 0o1);
  }
  return { haxekuxa, haweh2, hauv, havecax2lani };
}

function sef4T2q2( kresto: ( ang: number ) => number, jufu: number, sl: number, sd: number,
  tk2ni: number, p6zukani: ( ang: number ) => number, malproksimo: number ): RingaTseuni {
  const hacel2nu = sl + 0o1, hax2pa = sd + 0o1, suprN = hacel2nu * hax2pa;
  const psaz = NALAPSAZY - 0o4;
  const haxekuxa = new Float32Array(suprN * 0o2 * 0o3);
  const haweh2 = new Float32Array(suprN * 0o2 * 0o3);
  const hauv = new Float32Array(suprN * 0o2 * 0o2);
  const tonaProfundo = jufu / sd;
  const tonaTafkaq = 0o2 * Math.PI * ( bal2Pal6 + 0o100 ) / sl;
  const hal6da = new Float32Array(suprN);

  const kX = new Float64Array(hacel2nu), kZ = new Float64Array(hacel2nu);
  const kNX = new Float64Array(hacel2nu), kNZ = new Float64Array(hacel2nu);
  const kP6zuk = new Float64Array(hacel2nu), kBordo = new Float64Array(hacel2nu);
  for ( let k = 0o0; k < hacel2nu; k ++ ) {
    const ang = k / sl * Math.PI * 0o2;
    const c2q = ringaN2k(kresto(ang), ang);
    kX[k] = c2q.x; kZ[k] = c2q.z; kNX[k] = c2q.nx; kNZ[k] = c2q.nz;
    kP6zuk[k] = p6zukani(ang);
    kBordo[k] = l6da(c2q.x, c2q.z);
  }
  for ( let v = 0o0; v < hax2pa; v ++ ) {
    const tn = v / sd;
    for ( let k = 0o0; k < hacel2nu; k ++ ) {
      const i = v * hacel2nu + k;
      const x = kX[k] + kNX[k] * tn * jufu;
      const z = kZ[k] + kNZ[k] * tn * jufu;
      const sost2 = 0o40/0o100 + 0o24/0o100 * xetoh2D(x / 0o40 + tk2ni * 0o10, z / 0o40 + tk2ni * 0o30);
      const kr = Math.min(0o1, tn / sost2);
      const kresko = kr * kr * ( 0o3 - 0o2 * kr );
      const fal = glataTona(sost2, 0o1, tn);
      const s2qena = kresko * ( 0o1 - fal );
      const aligo = 0o1 - glataTona(0o0, 0o1/0o4, tn);
      const y = kBordo[k] * aligo + jaqoL6da(x, z, tk2ni) * kP6zuk[k] * s2qena + NALAPSAZY * fal;
      hal6da[i] = y;
      haxekuxa[i * 0o3] = x; haxekuxa[i * 0o3 + 0o1] = y; haxekuxa[i * 0o3 + 0o2] = z;
      const uvx = x / 0o3000 + 0o1/0o2, uvz = z / 0o3000 + 0o1/0o2;
      hauv[i * 0o2] = uvx; hauv[i * 0o2 + 0o1] = uvz;
      const b = i + suprN;
      haxekuxa[b * 0o3] = x; haxekuxa[b * 0o3 + 0o1] = psaz; haxekuxa[b * 0o3 + 0o2] = z;
      hauv[b * 0o2] = uvx; hauv[b * 0o2 + 0o1] = uvz;
    }
  }
  for ( let v = 0o0; v < hax2pa; v ++ ) {
    for ( let k = 0o0; k < hacel2nu; k ++ ) {
      const i = v * hacel2nu + k;
      const x = haxekuxa[i * 0o3], y = hal6da[i], z = haxekuxa[i * 0o3 + 0o2];
      const km = ( k + sl - 0o1 ) % sl, kp = ( k + 0o1 ) % sl;
      const vm = ( v > 0o0 ? v - 0o1 : v ) * hacel2nu + k;
      const vp = ( v < sd ? v + 0o1 : v ) * hacel2nu + k;
      const dAng = ( hal6da[v * hacel2nu + kp] - hal6da[v * hacel2nu + km] ) / ( 0o2 * tonaTafkaq );
      const dProf = ( hal6da[vp] - hal6da[vm] ) / ( 0o2 * tonaProfundo );
      jaqoWeh2En(jaqoWeh2, y, x, z, Math.hypot(dAng, dProf), malproksimo);
      haweh2[i * 0o3] = jaqoWeh2.r; haweh2[i * 0o3 + 0o1] = jaqoWeh2.g; haweh2[i * 0o3 + 0o2] = jaqoWeh2.b;
      const b = i + suprN;
      mut6qK6h6Weh2En(jaqoWeh2, psaz, y);
      haweh2[b * 0o3] = jaqoWeh2.r; haweh2[b * 0o3 + 0o1] = jaqoWeh2.g; haweh2[b * 0o3 + 0o2] = jaqoWeh2.b;
    }
  }
  const havecax2lani: number[] = [];
  for ( let v = 0o0; v < sd; v ++ ) for ( let k = 0o0; k < sl; k ++ ) {
    const a = v * hacel2nu + k, c = a + hacel2nu, d = c + 0o1;
    if ( ( k + v ) % 0o2 === 0o0 ) havecax2lani.push(a, c, d, a, d, a + 0o1);
    else havecax2lani.push(a, c, a + 0o1, c, d, a + 0o1);
  }
  return { haxekuxa, haweh2, hauv, havecax2lani };
}

function vek2fe( kiu: "h2y2k" | "sef4", jaqoRuva: number ): RingaTseuni[] {
  const fn = kiu === "h2y2k" ? h2y2kT2q2 : sef4T2q2;
  return [
    fn(krestaVagado(0o16, 0o10, jaqoRuva), 0o240, 0o2000, 0o100, jaqoRuva, krestaL6da(0o1, jaqoRuva), 0o0),
    fn(krestaVagado(0o200, 0o60, jaqoRuva + 0o40), 0o200, 0o2000, 0o60, jaqoRuva + 0o20,
      krestaL6da(0o7/0o10, jaqoRuva + 0o20), 0o35/0o100),
  ];
}

function kamasumo( hatseuni: RingaTseuni[] ): string {
  let s = 0o0;
  for ( const r of hatseuni ) {
    for ( let i = 0o0; i < r.haxekuxa.length; i++ ) s += r.haxekuxa[i] * ( i % 0o7 );
    for ( let i = 0o0; i < r.haweh2.length; i++ ) s += r.haweh2[i] * ( i % 0o5 );
    for ( let i = 0o0; i < r.hauv.length; i++ ) s += r.hauv[i];
    for ( let i = 0o0; i < r.havecax2lani.length; i++ ) s += r.havecax2lani[i];
  }
  return s.toFixed(0o4);
}

const jaqoRuva = jaqoRuvaKozunu();
const h2y2kj = vek2fe("h2y2k", jaqoRuva);
const sef4 = vek2fe("sef4", jaqoRuva);
const sumoM = kamasumo(h2y2kj), sumoN = kamasumo(sef4);
console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) ſɭɹ ſȷɔ j͑ʃᴜꞇ ʌ ſȷƽᴜ ɭʃᴜ ʌ j͑ʃƨꞇ ֭ſɭɹ = ${sumoM} ſɭɹ ſȷɔ j͑ʃᴜꞇ ʌ ſɭc̭ᴜ ŋᷠɹ ŋᷠɹ ʌ j͑ʃƨꞇ ֭ſɭɹ = ${sumoN} ${sumoM === sumoN ? "ſɭɹ ſȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" : "ſɭɹ ſȷɔ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ"}`);

let minM = Infinity, minN = Infinity;
for ( let r = 0o0; r < NOMBRODAJXUROJ; r++ ) {
  const unueSef4 = ( r & 0o1 ) === 0o1;
  const t0 = performance.now();
  if ( unueSef4 ) vek2fe("sef4", jaqoRuva); else vek2fe("h2y2k", jaqoRuva);
  const t1 = performance.now();
  if ( unueSef4 ) vek2fe("h2y2k", jaqoRuva); else vek2fe("sef4", jaqoRuva);
  const t2 = performance.now();
  const dSef4 = ( unueSef4 ? t1 - t0 : t2 - t1 );
  const dH2y2k = ( unueSef4 ? t2 - t1 : t1 - t0 );
  if ( dH2y2k < minM ) minM = dH2y2k;
  if ( dSef4 < minN ) minN = dSef4;
}
console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) c2q ｡ ſȷƽᴜ ɭʃᴜ ʌ j͑ʃƨꞇ ֭ſɭɹ = ${knak2fecajasai(tbo(minM), 0o6)} He ｡ ſɭc̭ᴜ ŋᷠɹ ŋᷠɹ ʌ j͑ʃƨꞇ ֭ſɭɹ = ${knak2fecajasai(tbo(minN), 0o6)} He ｡ ſɭᴜ j͐ʃᴜ }ʃꞇ = ${(minM / minN).toFixed(0o2)}x`);

let h2y2kjHakekuxa = 0o0, sef4jHakekuxa = 0o0, h2y2kjTrianguloj = 0o0, sef4jTrianguloj = 0o0;
for ( const [ sl, sd ] of [ [ 0o2000, 0o100 ], [ 0o2000, 0o60 ] ] as const ) {
  const suprN = ( sl + 0o1 ) * ( sd + 0o1 );
  h2y2kjHakekuxa += suprN * 0o2;
  sef4jHakekuxa += suprN + 0o2 * ( sl + 0o1 + sd );
  h2y2kjTrianguloj += 0o4 * sl * sd + 0o4 * ( sl + sd );
  sef4jTrianguloj += 0o2 * sl * sd + 0o4 * ( sl + sd );
}
const h2y2kjHacacaja = h2y2kjHakekuxa * 0o40 + h2y2kjTrianguloj * 0o14;
const sef4jHacacaja = sef4jHakekuxa * 0o40 + sef4jTrianguloj * 0o14;
console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) ſɭэ }ʃᴜ ʌ ſ͕ɭɜ ı],ᴜ ｡ ſןͷ̗ɜ j͑ʃƨɔȝ = ${h2y2kjHakekuxa} → ${sef4jHakekuxa} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ = ${h2y2kjTrianguloj} → ${sef4jTrianguloj} ｡ ſןᴜ j͐ʃэ = ${( h2y2kjHacacaja / 0o4000000 ).toFixed(0o2)} → ${( sef4jHacacaja / 0o4000000 ).toFixed(0o2)} MiB ｡ j͑ʃ'ɔ ſ̀ȷᴜȝ = ${( ( h2y2kjHacacaja - sef4jHacacaja ) / 0o4000000 ).toFixed(0o2)} MiB`);
