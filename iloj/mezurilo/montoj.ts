// ≺⧼ ſɭƨw ֭ſɭᴜ j͑ʃᴜꞇ ʌ j͑ʃᴜ ֭ſɭᴜƽ ꞁȷ̀ᴜ }ʃꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ ⛰️ ⧽≻
// ſןᴜ ᶘɹ , ſɭɜ ſɭ,w , ꞙɭı , ſɭэ ɭʃᴜ , ꞙɭı ,
// ſןɔ˞ᴜƴ , ꞙɭɿ , ⟅ ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭɿ , 📃 ⟩
import * as THREE from "three";
import { bruo2D, terenaKoloroEn, terenaStrataKoloroEn }
  from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { glataPaso } from "../../kantaoj/komunajxoj/interpolo.js";
import { ka5ikH6kuni, NALA_PSAZ_Y } from "../../eskekoj/komunajxoj/mapqoxa.js";
import { aktivaMapo } from "../../kantaoj/tero-datumaro/mapregulo.js";
import { montaraSemoBazo } from "../../kantaoj/tero-datumaro/rultempo.js";

const NOMBRO_DA_JXUROJ = 0o11;
const aktivaMapoDatumoj = aktivaMapo();
const mapoQoxa = aktivaMapoDatumoj.qoxa;
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
  const pukaz = ka5ikH6kuni(mapoQoxa, mapoGrandeco, ang) + h6kuni;
  const x = Math.cos(ang) * pukaz, z = Math.sin(ang) * pukaz;
  const pa = 0o1/0o2000;
  const ra = ka5ikH6kuni(mapoQoxa, mapoGrandeco, ang - pa) + h6kuni;
  const rb = ka5ikH6kuni(mapoQoxa, mapoGrandeco, ang + pa) + h6kuni;
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

interface RingaRezulto { haxekuxa: Float32Array; haweh2: Float32Array; uvaj: Float32Array; havecax2lani: number[] }

/** ſןɔ˞ᴜƴ , ꞙɭı , ⟅ j͑ʃᴜ ſɭ,w , ꞙɭɿ , ꞙɭı , */
function s23ohk2saiRingo( kresto: ( ang: number ) => number, profundo: number, sl: number, sd: number,
  tk2ni: number, p6zukani: ( ang: number ) => number, malproksimo: number ): RingaRezulto {
  const hacel2nu = sl + 1, hax2pa = sd + 1, suprN = hacel2nu * hax2pa;
  const fundo = NALA_PSAZ_Y - 0o4;
  const haxekuxa = new Float32Array(suprN * 2 * 3);
  const haweh2 = new Float32Array(suprN * 2 * 3);
  const uvaj = new Float32Array(suprN * 2 * 2);
  const pasxoProfundo = profundo / sd;
  const pasxoAngulo = 2 * Math.PI * ( mapoGrandeco + 0o100 ) / sl;
  const hal6da = new Float32Array(suprN);
  for ( let v = 0; v < hax2pa; v ++ ) {
    for ( let k = 0; k < hacel2nu; k ++ ) {
      const i = v * hacel2nu + k;
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
      const y = bordo * aligo + montaAlto(x, z, tk2ni) * p6zukani(ang) * s2qena + NALA_PSAZ_Y * fal;
      hal6da[i] = y;
      haxekuxa[i * 3] = x; haxekuxa[i * 3 + 1] = y; haxekuxa[i * 3 + 2] = z;
      const uvx = x / 0o3000 + 0o1/0o2, uvz = z / 0o3000 + 0o1/0o2;
      uvaj[i * 2] = uvx; uvaj[i * 2 + 1] = uvz;
      const b = i + suprN;
      haxekuxa[b * 3] = x; haxekuxa[b * 3 + 1] = fundo; haxekuxa[b * 3 + 2] = z;
      uvaj[b * 2] = uvx; uvaj[b * 2 + 1] = uvz;
    }
  }
  for ( let v = 0; v < hax2pa; v ++ ) {
    for ( let k = 0; k < hacel2nu; k ++ ) {
      const i = v * hacel2nu + k;
      const x = haxekuxa[i * 3], y = hal6da[i], z = haxekuxa[i * 3 + 2];
      const km = ( k + sl - 1 ) % sl, kp = ( k + 1 ) % sl;
      const vm = ( v > 0 ? v - 1 : v ) * hacel2nu + k;
      const vp = ( v < sd ? v + 1 : v ) * hacel2nu + k;
      const dAng = ( hal6da[v * hacel2nu + kp] - hal6da[v * hacel2nu + km] ) / ( 2 * pasxoAngulo );
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
    const a = v * hacel2nu + k, c = a + hacel2nu, d = c + 1;
    if ( ( k + v ) % 2 === 0 ) havecax2lani.push(a, c, d, a, d, a + 1);
    else havecax2lani.push(a, c, a + 1, c, d, a + 1);
  }
  return { haxekuxa, haweh2, uvaj, havecax2lani };
}

/** ſןɔ˞ᴜƴ , ꞙɭɿ , ⟅ j͑ʃᴜ ſɭ,w , ꞙɭɿ , ſɭɜ ſɭᴜ , ꞙɭı , */
function sef4Ringo( kresto: ( ang: number ) => number, profundo: number, sl: number, sd: number,
  tk2ni: number, p6zukani: ( ang: number ) => number, malproksimo: number ): RingaRezulto {
  const hacel2nu = sl + 1, hax2pa = sd + 1, suprN = hacel2nu * hax2pa;
  const fundo = NALA_PSAZ_Y - 0o4;
  const haxekuxa = new Float32Array(suprN * 2 * 3);
  const haweh2 = new Float32Array(suprN * 2 * 3);
  const uvaj = new Float32Array(suprN * 2 * 2);
  const pasxoProfundo = profundo / sd;
  const pasxoAngulo = 2 * Math.PI * ( mapoGrandeco + 0o100 ) / sl;
  const hal6da = new Float32Array(suprN);
// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭɿ , ⟅ ꞙɭı , ꞙɭı , 📃 ⟩
  const kX = new Float64Array(hacel2nu), kZ = new Float64Array(hacel2nu);
  const kNX = new Float64Array(hacel2nu), kNZ = new Float64Array(hacel2nu);
  const kSkalo = new Float64Array(hacel2nu), kBordo = new Float64Array(hacel2nu);
  for ( let k = 0; k < hacel2nu; k ++ ) {
    const ang = k / sl * Math.PI * 0o2;
    const c2q = ringaPunkto(kresto(ang), ang);
    kX[k] = c2q.x; kZ[k] = c2q.z; kNX[k] = c2q.nx; kNZ[k] = c2q.nz;
    kSkalo[k] = p6zukani(ang);
    kBordo[k] = alteco(c2q.x, c2q.z);
  }
  for ( let v = 0; v < hax2pa; v ++ ) {
    const tn = v / sd;
    for ( let k = 0; k < hacel2nu; k ++ ) {
      const i = v * hacel2nu + k;
      const x = kX[k] + kNX[k] * tn * profundo;
      const z = kZ[k] + kNZ[k] * tn * profundo;
      const sost2 = 0o40/0o100 + 0o24/0o100 * bruo2D(x / 0o40 + tk2ni * 0o10, z / 0o40 + tk2ni * 0o30);
      const kr = Math.min(1, tn / sost2);
      const kresko = kr * kr * ( 3 - 2 * kr );
      const fal = glataPaso(sost2, 1, tn);
      const s2qena = kresko * ( 1 - fal );
      const aligo = 1 - glataPaso(0, 0o1/0o4, tn);
      const y = kBordo[k] * aligo + montaAlto(x, z, tk2ni) * kSkalo[k] * s2qena + NALA_PSAZ_Y * fal;
      hal6da[i] = y;
      haxekuxa[i * 3] = x; haxekuxa[i * 3 + 1] = y; haxekuxa[i * 3 + 2] = z;
      const uvx = x / 0o3000 + 0o1/0o2, uvz = z / 0o3000 + 0o1/0o2;
      uvaj[i * 2] = uvx; uvaj[i * 2 + 1] = uvz;
      const b = i + suprN;
      haxekuxa[b * 3] = x; haxekuxa[b * 3 + 1] = fundo; haxekuxa[b * 3 + 2] = z;
      uvaj[b * 2] = uvx; uvaj[b * 2 + 1] = uvz;
    }
  }
  for ( let v = 0; v < hax2pa; v ++ ) {
    for ( let k = 0; k < hacel2nu; k ++ ) {
      const i = v * hacel2nu + k;
      const x = haxekuxa[i * 3], y = hal6da[i], z = haxekuxa[i * 3 + 2];
      const km = ( k + sl - 1 ) % sl, kp = ( k + 1 ) % sl;
      const vm = ( v > 0 ? v - 1 : v ) * hacel2nu + k;
      const vp = ( v < sd ? v + 1 : v ) * hacel2nu + k;
      const dAng = ( hal6da[v * hacel2nu + kp] - hal6da[v * hacel2nu + km] ) / ( 2 * pasxoAngulo );
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
    const a = v * hacel2nu + k, c = a + hacel2nu, d = c + 1;
    if ( ( k + v ) % 2 === 0 ) havecax2lani.push(a, c, d, a, d, a + 1);
    else havecax2lani.push(a, c, a + 1, c, d, a + 1);
  }
  return { haxekuxa, haweh2, uvaj, havecax2lani };
}

function kalkuli( kiu: "s23ohk2sai" | "sef4", montaSemo: number ): RingaRezulto[] {
  const fn = kiu === "s23ohk2sai" ? s23ohk2saiRingo : sef4Ringo;
  return [
    fn(krestaVagado(0o16, 0o10, montaSemo), 0o240, 0o2000, 0o100, montaSemo, krestaAlto(1, montaSemo), 0),
    fn(krestaVagado(0o200, 0o60, montaSemo + 0o40), 0o200, 0o2000, 0o60, montaSemo + 0o20,
      krestaAlto(0o7/0o10, montaSemo + 0o20), 0o35/0o100),
  ];
}

function kontrolsumo( hatseuni: RingaRezulto[] ): string {
  let s = 0;
  for ( const r of hatseuni ) {
    for ( let i = 0; i < r.haxekuxa.length; i++ ) s += r.haxekuxa[i] * ( i % 0o7 );
    for ( let i = 0; i < r.haweh2.length; i++ ) s += r.haweh2[i] * ( i % 0o5 );
    for ( let i = 0; i < r.uvaj.length; i++ ) s += r.uvaj[i];
    for ( let i = 0; i < r.havecax2lani.length; i++ ) s += r.havecax2lani[i];
  }
  return s.toFixed(0o4);
}

const montaSemo = montaraSemoBazo();
const s23ohk2saij = kalkuli("s23ohk2sai", montaSemo);
const sef4 = kalkuli("sef4", montaSemo);
const sumoM = kontrolsumo(s23ohk2saij), sumoN = kontrolsumo(sef4);
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭɹ ſȷɔ ʌ j͑ʃᴜ ı],ɔ=${sumoM} ſɭɹ ſȷɔ ʌ j͑ʃɔ ſȷэⅎ=${sumoN} ${sumoM === sumoN ? "ſɭɹ ſȷɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" : "ſɭɹ ſȷɔ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ"}`);

let minM = Infinity, minN = Infinity;
for ( let r = 0; r < NOMBRO_DA_JXUROJ; r++ ) {
  const unueSef4 = ( r & 1 ) === 1;
  const t0 = performance.now();
  if ( unueSef4 ) kalkuli("sef4", montaSemo); else kalkuli("s23ohk2sai", montaSemo);
  const t1 = performance.now();
  if ( unueSef4 ) kalkuli("s23ohk2sai", montaSemo); else kalkuli("sef4", montaSemo);
  const t2 = performance.now();
  const dSef4 = ( unueSef4 ? t1 - t0 : t2 - t1 );
  const dS23ohk2sai = ( unueSef4 ? t2 - t1 : t1 - t0 );
  if ( dS23ohk2sai < minM ) minM = dS23ohk2sai;
  if ( dSef4 < minN ) minN = dSef4;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) c2q ｡ j͑ʃᴜ ı],ɔ=${minM.toFixed(1)}ms ｡ j͑ʃɔ ſȷэⅎ=${minN.toFixed(1)}ms ｡ j͑ʃƨꞇʞ ŋᷠɹ=${(minM / minN).toFixed(2)}x`);

// ⟨ ſ͕ɭɜ ı],ᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ , ⟅ j͑ʃɜ ſɭ,ᴜ , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , 📃 ⟩
let s23ohk2saijVerticoj = 0, sef4jVerticoj = 0, s23ohk2saijTrianguloj = 0, sef4jTrianguloj = 0;
for ( const [ sl, sd ] of [ [ 0o2000, 0o100 ], [ 0o2000, 0o60 ] ] as const ) {
  const suprN = ( sl + 1 ) * ( sd + 1 );
  s23ohk2saijVerticoj += suprN * 2;
  sef4jVerticoj += suprN + 2 * ( sl + 1 + sd );
  s23ohk2saijTrianguloj += 4 * sl * sd + 4 * ( sl + sd );
  sef4jTrianguloj += 2 * sl * sd + 4 * ( sl + sd );
}
const s23ohk2saijBajtoj = s23ohk2saijVerticoj * 0o40 + s23ohk2saijTrianguloj * 0o14;
const sef4jBajtoj = sef4jVerticoj * 0o40 + sef4jTrianguloj * 0o14;
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭэ }ʃᴜ ʌ ſ͕ɭɜ ı],ᴜ ｡ ſןͷ̗ɜ j͑ʃƨɔȝ=${s23ohk2saijVerticoj} → ${sef4jVerticoj} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ=${s23ohk2saijTrianguloj} → ${sef4jTrianguloj} ｡ ſןᴜ j͐ʃэ=${( s23ohk2saijBajtoj / 0o4000000 ).toFixed(2)} → ${( sef4jBajtoj / 0o4000000 ).toFixed(2)} MiB ｡ j͑ʃ'ɔ ſ̀ȷᴜȝ=${( ( s23ohk2saijBajtoj - sef4jBajtoj ) / 0o4000000 ).toFixed(2)} MiB`);
