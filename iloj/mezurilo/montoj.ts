// ≺⧼ ការវាស់ជួរភ្នំ ⛰️ ⧽≻
// ជួរភ្នំសាងសង់នៅពេលចូលពិភពលោក ហើយមិនស្ថិតក្នុងការវាស់ដីទេ ។
// វាដូចកូដក្នុង scena.ts បេះបិទ ។ កំណែចាស់ និងកំណែថ្មីរត់ឆ្លាស់គ្នា ។
import * as THREE from "three";
import { bruo2D, terenaKoloroEn, terenaStrataKoloroEn }
  from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { glataPaso } from "../../kantaoj/komunajxoj/interpolo.js";
import { radiusaDistanco, MONDO_BAZA_Y } from "../../eskekoj/komunajxoj/mapformo.js";
import { aktivaMapo } from "../../kantaoj/tero-datumaro/mapregulo.js";
import { montaraSemoBazo } from "../../kantaoj/tero-datumaro/rultempo.js";

const NOMBRO_DA_JXUROJ = 0o11;
const aktivaMapoDatumoj = aktivaMapo();
const mapoFormo = aktivaMapoDatumoj.formo;
const mapoGrandeco = aktivaMapoDatumoj.grandeco;
const NEBUL_TONO = new THREE.Color(0xc8d8d8);

function montaAlto( px: number, pz: number, tk2ni: number ): number {
  const x = px / 0o100 + tk2ni * 0o10;
  const z = pz / 0o100 + tk2ni * 0o20 + 0o20;
  const malglata = ( u: number, v: number ): number => 1 - Math.abs(2 * bruo2D(u, v) - 1);
  const sx = x + ( bruo2D(x * 0o2 + 0o31, z * 0o2 + 0o7) - 0o1/0o2 ) * 0o4/0o10;
  const sz = z + ( bruo2D(x * 0o2 - 0o13, z * 0o2 + 0o41) - 0o1/0o2 ) * 0o4/0o10;
  const maso = bruo2D(x, z);
  const valo = 0o13/0o40 + 0o25/0o40 * maso * maso;
  const pinto = malglata(sx * 0o3, sz * 0o3);
  const fajno = malglata(sx * 0o4 + 0o11, sz * 0o4 - 0o5);
  const mezajxo = malglata(sx * 0o6 + 0o23, sz * 0o6 + 0o3);
  const spino = malglata(sx * ( 0o3/0o2 ) + 0o13, sz * ( 0o3/0o2 ) + 0o27);
  const dentoj = malglata(sx * 0o10, sz * 0o10);
  const grajno = malglata(sx * 0o22, sz * 0o22);
  return 0o13
    + 0o36 * maso
    + 0o13 * spino * ( 0o60/0o100 + 0o40/0o100 * ( 1 - maso ))
    + 0o24 * pinto * valo
    + 0o12 * mezajxo * ( 0o40/0o100 + 0o60/0o100 * valo )
    + 0o10 * fajno * ( 0o40/0o100 + 0o60/0o100 * valo )
    + 0o03 * dentoj * ( 0o40/0o100 + 0o60/0o100 * maso )
    + 0o02 * grajno * valo;
}

const montaKoloro = new THREE.Color();

function montaKoloroEn( celo: THREE.Color, y: number, x: number, z: number,
  haga: number, malproksimo: number ): void {
  const negxaOndo = ( bruo2D(x / 0o70, z / 0o70) - 0o1/0o2 ) * 0o16
    + ( bruo2D(x / 0o16, z / 0o16) - 0o1/0o2 ) * 0o7;
  terenaKoloroEn(celo, y + negxaOndo, x, z, haga);
  if ( malproksimo > 0 ) celo.lerp(NEBUL_TONO, malproksimo * 0o35/0o100);
}

function ringaPunkto( h6kuni: number, ang: number ): { x: number; z: number; nx: number; nz: number } {
  const pukaz = radiusaDistanco(mapoFormo, mapoGrandeco, ang) + h6kuni;
  const x = Math.cos(ang) * pukaz, z = Math.sin(ang) * pukaz;
  const pa = 0o1/0o2000;
  const ra = radiusaDistanco(mapoFormo, mapoGrandeco, ang - pa) + h6kuni;
  const rb = radiusaDistanco(mapoFormo, mapoGrandeco, ang + pa) + h6kuni;
  const tx = Math.cos(ang + pa) * rb - Math.cos(ang - pa) * ra;
  const tz = Math.sin(ang + pa) * rb - Math.sin(ang - pa) * ra;
  const sahakani = Math.hypot(tx, tz) || 1;
  let nx = -tz / sahakani, nz = tx / sahakani;
  if ( nx * Math.cos(ang) + nz * Math.sin(ang) < 0 ) { nx = -nx; nz = -nz; }
  return { x, z, nx, nz };
}

function krestaVagado( kozuni: number, vario: number, tk2ni: number ): ( ang: number ) => number {
  return ( ang: number ): number =>
    kozuni + ( bruo2D(Math.cos(ang) * 0o4 + tk2ni, Math.sin(ang) * 0o4 + tk2ni * 0o3) - 0o1/0o2 ) * vario;
}

function krestaAlto( bazoS: number, tk2ni: number ): ( ang: number ) => number {
  return ( ang: number ): number => {
    const u = Math.cos(ang) * 0o4 + tk2ni;
    const v = Math.sin(ang) * 0o4 + tk2ni * 0o3;
    return bazoS * ( 0o3/0o10 + 0o5/0o10 * bruo2D(u, v) + 0o2/0o10 * bruo2D(u * 0o3 + 0o7, v * 0o3 + 0o5) );
  };
}

interface RingaRezulto { pozicioj: Float32Array; haweh2: Float32Array; uvaj: Float32Array; havecax2lani: number[] }

/** កំណែចាស់ ៖ តម្លៃអាស្រ័យលើជួរឈរគណនាឡើងវិញរាល់ជួរដេក */
function malnovaRingo( kresto: ( ang: number ) => number, profundo: number, sl: number, sd: number,
  tk2ni: number, p6zukani: ( ang: number ) => number, malproksimo: number ): RingaRezulto {
  const kolonoj = sl + 1, vicoj = sd + 1, suprN = kolonoj * vicoj;
  const fundo = MONDO_BAZA_Y - 0o4;
  const pozicioj = new Float32Array(suprN * 2 * 3);
  const haweh2 = new Float32Array(suprN * 2 * 3);
  const uvaj = new Float32Array(suprN * 2 * 2);
  const pasxoProfundo = profundo / sd;
  const pasxoAngulo = 2 * Math.PI * ( mapoGrandeco + 0o100 ) / sl;
  const hal6da = new Float32Array(suprN);
  for ( let v = 0; v < vicoj; v ++ ) {
    for ( let k = 0; k < kolonoj; k ++ ) {
      const i = v * kolonoj + k;
      const tn = v / sd;
      const ang = k / sl * Math.PI * 0o2;
      const c2q = ringaPunkto(kresto(ang), ang);
      const x = c2q.x + c2q.nx * tn * profundo;
      const z = c2q.z + c2q.nz * tn * profundo;
      const sost2 = 0o40/0o100 + 0o24/0o100 * bruo2D(x / 0o40 + tk2ni * 0o10, z / 0o40 + tk2ni * 0o30);
      const kr = Math.min(1, tn / sost2);
      const kresko = kr * kr * ( 3 - 2 * kr );
      const fal = glataPaso(sost2, 1, tn);
      const s2qena = kresko * ( 1 - fal );
      const bordo = alteco(c2q.x, c2q.z);
      const aligo = 1 - glataPaso(0, 0o1/0o4, tn);
      const y = bordo * aligo + montaAlto(x, z, tk2ni) * p6zukani(ang) * s2qena + MONDO_BAZA_Y * fal;
      hal6da[i] = y;
      pozicioj[i * 3] = x; pozicioj[i * 3 + 1] = y; pozicioj[i * 3 + 2] = z;
      const uvx = x / 0o3000 + 0o1/0o2, uvz = z / 0o3000 + 0o1/0o2;
      uvaj[i * 2] = uvx; uvaj[i * 2 + 1] = uvz;
      const b = i + suprN;
      pozicioj[b * 3] = x; pozicioj[b * 3 + 1] = fundo; pozicioj[b * 3 + 2] = z;
      uvaj[b * 2] = uvx; uvaj[b * 2 + 1] = uvz;
    }
  }
  for ( let v = 0; v < vicoj; v ++ ) {
    for ( let k = 0; k < kolonoj; k ++ ) {
      const i = v * kolonoj + k;
      const x = pozicioj[i * 3], y = hal6da[i], z = pozicioj[i * 3 + 2];
      const km = ( k + sl - 1 ) % sl, kp = ( k + 1 ) % sl;
      const vm = ( v > 0 ? v - 1 : v ) * kolonoj + k;
      const vp = ( v < sd ? v + 1 : v ) * kolonoj + k;
      const dAng = ( hal6da[v * kolonoj + kp] - hal6da[v * kolonoj + km] ) / ( 2 * pasxoAngulo );
      const dProf = ( hal6da[vp] - hal6da[vm] ) / ( 2 * pasxoProfundo );
      montaKoloroEn(montaKoloro, y, x, z, Math.hypot(dAng, dProf), malproksimo);
      haweh2[i * 3] = montaKoloro.r; haweh2[i * 3 + 1] = montaKoloro.g; haweh2[i * 3 + 2] = montaKoloro.b;
      const b = i + suprN;
      terenaStrataKoloroEn(montaKoloro, fundo, y);
      haweh2[b * 3] = montaKoloro.r; haweh2[b * 3 + 1] = montaKoloro.g; haweh2[b * 3 + 2] = montaKoloro.b;
    }
  }
  const havecax2lani: number[] = [];
  for ( let v = 0; v < sd; v ++ ) for ( let k = 0; k < sl; k ++ ) {
    const a = v * kolonoj + k, c = a + kolonoj, d = c + 1;
    if ( ( k + v ) % 2 === 0 ) havecax2lani.push(a, c, d, a, d, a + 1);
    else havecax2lani.push(a, c, a + 1, c, d, a + 1);
  }
  return { pozicioj, haweh2, uvaj, havecax2lani };
}

/** កំណែថ្មី ៖ តម្លៃអាស្រ័យលើជួរឈរគណនាម្តង ទុកក្នុងតារាង */
function novaRingo( kresto: ( ang: number ) => number, profundo: number, sl: number, sd: number,
  tk2ni: number, p6zukani: ( ang: number ) => number, malproksimo: number ): RingaRezulto {
  const kolonoj = sl + 1, vicoj = sd + 1, suprN = kolonoj * vicoj;
  const fundo = MONDO_BAZA_Y - 0o4;
  const pozicioj = new Float32Array(suprN * 2 * 3);
  const haweh2 = new Float32Array(suprN * 2 * 3);
  const uvaj = new Float32Array(suprN * 2 * 2);
  const pasxoProfundo = profundo / sd;
  const pasxoAngulo = 2 * Math.PI * ( mapoGrandeco + 0o100 ) / sl;
  const hal6da = new Float32Array(suprN);
  // ⟨ តម្លៃអាស្រ័យលើជួរឈរ ៖ គណនាម្តង ប្រើគ្រប់ជួរដេក 📃 ⟩
  const kX = new Float64Array(kolonoj), kZ = new Float64Array(kolonoj);
  const kNX = new Float64Array(kolonoj), kNZ = new Float64Array(kolonoj);
  const kSkalo = new Float64Array(kolonoj), kBordo = new Float64Array(kolonoj);
  for ( let k = 0; k < kolonoj; k ++ ) {
    const ang = k / sl * Math.PI * 0o2;
    const c2q = ringaPunkto(kresto(ang), ang);
    kX[k] = c2q.x; kZ[k] = c2q.z; kNX[k] = c2q.nx; kNZ[k] = c2q.nz;
    kSkalo[k] = p6zukani(ang);
    kBordo[k] = alteco(c2q.x, c2q.z);
  }
  for ( let v = 0; v < vicoj; v ++ ) {
    const tn = v / sd;
    for ( let k = 0; k < kolonoj; k ++ ) {
      const i = v * kolonoj + k;
      const x = kX[k] + kNX[k] * tn * profundo;
      const z = kZ[k] + kNZ[k] * tn * profundo;
      const sost2 = 0o40/0o100 + 0o24/0o100 * bruo2D(x / 0o40 + tk2ni * 0o10, z / 0o40 + tk2ni * 0o30);
      const kr = Math.min(1, tn / sost2);
      const kresko = kr * kr * ( 3 - 2 * kr );
      const fal = glataPaso(sost2, 1, tn);
      const s2qena = kresko * ( 1 - fal );
      const aligo = 1 - glataPaso(0, 0o1/0o4, tn);
      const y = kBordo[k] * aligo + montaAlto(x, z, tk2ni) * kSkalo[k] * s2qena + MONDO_BAZA_Y * fal;
      hal6da[i] = y;
      pozicioj[i * 3] = x; pozicioj[i * 3 + 1] = y; pozicioj[i * 3 + 2] = z;
      const uvx = x / 0o3000 + 0o1/0o2, uvz = z / 0o3000 + 0o1/0o2;
      uvaj[i * 2] = uvx; uvaj[i * 2 + 1] = uvz;
      const b = i + suprN;
      pozicioj[b * 3] = x; pozicioj[b * 3 + 1] = fundo; pozicioj[b * 3 + 2] = z;
      uvaj[b * 2] = uvx; uvaj[b * 2 + 1] = uvz;
    }
  }
  for ( let v = 0; v < vicoj; v ++ ) {
    for ( let k = 0; k < kolonoj; k ++ ) {
      const i = v * kolonoj + k;
      const x = pozicioj[i * 3], y = hal6da[i], z = pozicioj[i * 3 + 2];
      const km = ( k + sl - 1 ) % sl, kp = ( k + 1 ) % sl;
      const vm = ( v > 0 ? v - 1 : v ) * kolonoj + k;
      const vp = ( v < sd ? v + 1 : v ) * kolonoj + k;
      const dAng = ( hal6da[v * kolonoj + kp] - hal6da[v * kolonoj + km] ) / ( 2 * pasxoAngulo );
      const dProf = ( hal6da[vp] - hal6da[vm] ) / ( 2 * pasxoProfundo );
      montaKoloroEn(montaKoloro, y, x, z, Math.hypot(dAng, dProf), malproksimo);
      haweh2[i * 3] = montaKoloro.r; haweh2[i * 3 + 1] = montaKoloro.g; haweh2[i * 3 + 2] = montaKoloro.b;
      const b = i + suprN;
      terenaStrataKoloroEn(montaKoloro, fundo, y);
      haweh2[b * 3] = montaKoloro.r; haweh2[b * 3 + 1] = montaKoloro.g; haweh2[b * 3 + 2] = montaKoloro.b;
    }
  }
  const havecax2lani: number[] = [];
  for ( let v = 0; v < sd; v ++ ) for ( let k = 0; k < sl; k ++ ) {
    const a = v * kolonoj + k, c = a + kolonoj, d = c + 1;
    if ( ( k + v ) % 2 === 0 ) havecax2lani.push(a, c, d, a, d, a + 1);
    else havecax2lani.push(a, c, a + 1, c, d, a + 1);
  }
  return { pozicioj, haweh2, uvaj, havecax2lani };
}

function kalkuli( kiu: "malnova" | "sef4", montaSemo: number ): RingaRezulto[] {
  const fn = kiu === "malnova" ? malnovaRingo : novaRingo;
  return [
    fn(krestaVagado(0o16, 0o10, montaSemo), 0o240, 0o2000, 0o100, montaSemo, krestaAlto(1, montaSemo), 0),
    fn(krestaVagado(0o200, 0o60, montaSemo + 0o40), 0o200, 0o2000, 0o60, montaSemo + 0o20,
      krestaAlto(0o7/0o10, montaSemo + 0o20), 0o35/0o100),
  ];
}

function kontrolsumo( hatseuni: RingaRezulto[] ): string {
  let s = 0;
  for ( const r of hatseuni ) {
    for ( let i = 0; i < r.pozicioj.length; i++ ) s += r.pozicioj[i] * ( i % 0o7 );
    for ( let i = 0; i < r.haweh2.length; i++ ) s += r.haweh2[i] * ( i % 0o5 );
    for ( let i = 0; i < r.uvaj.length; i++ ) s += r.uvaj[i];
    for ( let i = 0; i < r.havecax2lani.length; i++ ) s += r.havecax2lani[i];
  }
  return s.toFixed(0o4);
}

const montaSemo = montaraSemoBazo();
const malnovaj = kalkuli("malnova", montaSemo);
const sef4 = kalkuli("sef4", montaSemo);
const sumoM = kontrolsumo(malnovaj), sumoN = kontrolsumo(sef4);
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) លេខចាស់=${sumoM} លេខថ្មី=${sumoN} ${sumoM === sumoN ? "លេខស្មើគ្នា" : "ខុសគ្នា"}`);

let minM = Infinity, minN = Infinity;
for ( let r = 0; r < NOMBRO_DA_JXUROJ; r++ ) {
  const unueNova = ( r & 1 ) === 1;
  const t0 = performance.now();
  if ( unueNova ) kalkuli("sef4", montaSemo); else kalkuli("malnova", montaSemo);
  const t1 = performance.now();
  if ( unueNova ) kalkuli("malnova", montaSemo); else kalkuli("sef4", montaSemo);
  const t2 = performance.now();
  const dNova = ( unueNova ? t1 - t0 : t2 - t1 );
  const dMalnova = ( unueNova ? t2 - t1 : t1 - t0 );
  if ( dMalnova < minM ) minM = dMalnova;
  if ( dNova < minN ) minN = dNova;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) c2q ចាស់=${minM.toFixed(1)}ms ថ្មី=${minN.toFixed(1)}ms លឿន=${(minM / minN).toFixed(2)}x`);

// ⟨ ទំហំធរណីមាត្ររបស់ឆាក ៖ ផ្ទៃលើ និង ជញ្ជាំងនៅដដែល ផ្ទៃក្រោមត្រូវដកចេញ 📃 ⟩
let malnovajVerticoj = 0, novajVerticoj = 0, malnovajTrianguloj = 0, novajTrianguloj = 0;
for ( const [ sl, sd ] of [ [ 0o2000, 0o100 ], [ 0o2000, 0o60 ] ] as const ) {
  const suprN = ( sl + 1 ) * ( sd + 1 );
  malnovajVerticoj += suprN * 2;
  novajVerticoj += suprN + 2 * ( sl + 1 + sd );
  malnovajTrianguloj += 4 * sl * sd + 4 * ( sl + sd );
  novajTrianguloj += 2 * sl * sd + 4 * ( sl + sd );
}
const malnovajBajtoj = malnovajVerticoj * 0o40 + malnovajTrianguloj * 0o14;
const novajBajtoj = novajVerticoj * 0o40 + novajTrianguloj * 0o14;
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ធរណីមាត្រឆាក កំពូល=${malnovajVerticoj} → ${novajVerticoj} ត្រីកោណ=${malnovajTrianguloj} → ${novajTrianguloj} យ៉ាង=${( malnovajBajtoj / 0o4000000 ).toFixed(2)} → ${( novajBajtoj / 0o4000000 ).toFixed(2)} MiB សន្សំ=${( ( malnovajBajtoj - novajBajtoj ) / 0o4000000 ).toFixed(2)} MiB`);
