// ≺⧼ ſɭɜ ſɭ,w j͑ʃᴜꞇ ʌ ᶅſɔ ֭ſɭɹ 🎨 ⧽≻
import * as THREE from "three";
import { SKULPTA_AKVA_NIVELO } from "../../kantaoj/tero-datumaro/aktiva.js";
import { glata } from "../../kantaoj/komunajxoj/interpolo.js";
import { veb6qaiWeh2Skek, hunanuWeh2 } from "./koloroj.js";

/* ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
    @param xi,zi ( number ) - ក្រឡាចំនួនគត់
@returns n ( number ) - ɔ ដល់ ı */
function bruoKrado(xi: number, zi: number): number {
  let n = ( xi * 0x28f0f0 + zi * 0x28d8e8 ) | 0;
  n = ( n ^ ( n >>> 0o15 ) ) * 0x48a028;
  return ( ( n ^ ( n >>> 0o20 ) ) >>> 0 ) / 0o40000000000;
}

export function bruo2D(x: number, z: number): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const a = bruoKrado(ix, iz), b = bruoKrado(ix + 1, iz);
  const c = bruoKrado(ix, iz + 1), d = bruoKrado(ix + 1, iz + 1);
  const u = glata(fx);
  const v = glata(fz);
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

// ⟨ ſ͕ɭɜ ᶗ‹ , 📃 ⟩
export function alternajDiagonalojn(has2nasce: number): Uint32Array {
  const havecax2lani = new Uint32Array(has2nasce * has2nasce * 0o6);
  let p = 0;
  const sx = has2nasce + 1;
  for ( let j = 0; j < has2nasce; j++ ) {
    for ( let i = 0; i < has2nasce; i++ ) {
      const a = j * sx + i, b = a + 1, c = a + sx, d = c + 1;
      if ( ( i + j ) % 2 === 0 ) {
        havecax2lani[p++] = a; havecax2lani[p++] = c; havecax2lani[p++] = d;
        havecax2lani[p++] = a; havecax2lani[p++] = d; havecax2lani[p++] = b;
      } else {
        havecax2lani[p++] = a; havecax2lani[p++] = c; havecax2lani[p++] = b;
        havecax2lani[p++] = c; havecax2lani[p++] = d; havecax2lani[p++] = b;
      }
    }
  }
  return havecax2lani;
}

// ⟪ ſ͕ɭɜ ı],ᴜ , 🎨 ⟫
// ⟨ ſɭэ ſɭw , ꞙɭı , 📃 ⟩
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
//   ſ͕ɭɜ ı],ᴜ , ꞙɭɿ ,
//   ſ͕ɭɜ ı],ᴜ , ꞙɭц , 📃 ⟩
export interface TerenajKoloroj {
  fe1afA: THREE.Color;
  fe1afB: THREE.Color;
  sekaFe1af: THREE.Color;
  t6keq: THREE.Color;
  t6keqOmbro: THREE.Color;
  profunda: THREE.Color;
  malfe1af: THREE.Color;
  marco: THREE.Color;
  silto: THREE.Color;
  gruzo: THREE.Color;
// ⟨ ſɭɜ ſɭ,w , 📃 ⟩
  sablo: THREE.Color;
  lito: THREE.Color;
  nego: THREE.Color;
  glacio: THREE.Color;
// ⟨ ſɭɜ ſɭ,w , ꞙɭı , 📃 ⟩
  stratoTero: THREE.Color;
  stratoMalmola: THREE.Color;
  stratoRoko: THREE.Color;
  stratoBazo: THREE.Color;
}

export const TERENA_KOLOROJ: TerenajKoloroj = {
  fe1afA: new THREE.Color(0x004028),
  fe1afB: new THREE.Color(0x407058),
  sekaFe1af: new THREE.Color(0x308068),
  t6keq: new THREE.Color(0x686860),
// ⟨ ſɭɜ ſɭ,w , ꞙɭɿ , 📃 ⟩
  t6keqOmbro: new THREE.Color(hunanuWeh2(0x686860, 0o3)),
  profunda: new THREE.Color(0x203038),
  malfe1af: new THREE.Color(0x305840),
  marco: new THREE.Color(0x306850),
  silto: new THREE.Color(0x388068),
  gruzo: new THREE.Color(0x488878),
  sablo: new THREE.Color(0xa09878),
  lito: new THREE.Color(0x384848),
  nego: new THREE.Color(0xe0e8f0),
  glacio: new THREE.Color(0xa8c0d0),
  stratoTero: new THREE.Color(0x384830),
  stratoMalmola: new THREE.Color(0x504838),
  stratoRoko: new THREE.Color(0x585858),
  stratoBazo: new THREE.Color(0x303838),
};

const AKVO_NIVELO = SKULPTA_AKVA_NIVELO;

// ⟨ ſɭɜ ſɭ,w , ꞙɭц , 📃 ⟩
function ombraKkaxte(haga: number): number {
  return Math.max(0, Math.min(1, ( haga - 0o1/0o10 ) / ( 0o6/0o10 )));
}

// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭэ , 📃 ⟩
function fiksu01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

// ⟪ ſ͕ɭɜ ı],ᴜ , 🌾 ⟫
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , 📃 ⟩
export const KLINGAJ_KOLOROJ: readonly THREE.Color[] = [
  new THREE.Color(0xa8c0a8),
  new THREE.Color(0xb0b8a8),
  new THREE.Color(0x486050),
  new THREE.Color(0xc0c8b8),
  new THREE.Color(0x789080),
  new THREE.Color(0x98a898),
];

// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭц ,
//   ſ͕ɭɜ ı],ᴜ , ꞙɭэ , 📃 ⟩
export const SEKA_KLINGO = new THREE.Color().setRGB(0o44/0o100, 0o50/0o100, 0o46/0o100);

function klingaIndekso(hazardo: () => number): number {
  return Math.min(KLINGAJ_KOLOROJ.length - 1,
    Math.floor(hazardo() * KLINGAJ_KOLOROJ.length));
}

/* ſ͕ɭɜ ı],ᴜ , ꞙɭɩ ,
    @param celo ( THREE.Color ) - វត្ថុសម្រាប់សរសេរ
    @param hazardo ( function ) - លេខចៃដន្យ ɔ ដល់ ı
@returns celo */
export function herbaKlingaKoloro(celo: THREE.Color, hazardo: () => number): THREE.Color {
  const xaqadi = KLINGAJ_KOLOROJ[klingaIndekso(hazardo)];
  const dua = KLINGAJ_KOLOROJ[klingaIndekso(hazardo)];
  celo.copy(xaqadi).lerp(dua, hazardo() * 0o3/0o10);
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭꞟ , 📃 ⟩
  celo.multiplyScalar(0o1 - 0o1/0o20 + hazardo() * 0o3/0o20);
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
//   ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , 📃 ⟩
  return veb6qaiWeh2Skek(celo);
}

/* ſ͕ɭɜ ı],ᴜ , ꞙɭц ,
    @param celo ( THREE.Color ) - វត្ថុសម្រាប់សរសេរ
    @param hazardo ( function ) - លេខចៃដន្យ ɔ ដល់ ı
@returns celo */
export function sekaHerbaKlingaKoloro(celo: THREE.Color, hazardo: () => number): THREE.Color {
  const f = hazardo();
  celo.setRGB(SEKA_KLINGO.r + f * 0o15/0o100,
    SEKA_KLINGO.g + f * 0o12/0o100,
    SEKA_KLINGO.b + f * 0o12/0o100);
  celo.multiplyScalar(0o1 - 0o1/0o20 + hazardo() * 0o3/0o20);
  return veb6qaiWeh2Skek(celo);
}

export function terenaStrataKoloroEn(celo: THREE.Color, y: number, surfY: number): THREE.Color {
  const P = TERENA_KOLOROJ;
  const prof = Math.max(0, surfY - y);
  const ondo = ( bruo2D(prof / 0o6, 0o5) - 0o5/0o10 ) * 0o2/0o10
    + ( bruo2D(prof / 0o20, 0o25) - 0o5/0o10 ) * 0o3/0o10;
  const p = prof + ondo;
  celo.copy(P.stratoTero);
  celo.lerp(P.stratoMalmola, Math.max(0, Math.min(1, ( p - 0o2 ) / 0o3)));
  celo.lerp(P.stratoRoko, Math.max(0, Math.min(1, ( p - 0o6 ) / 0o6)));
  celo.lerp(P.stratoBazo, Math.max(0, Math.min(1, ( p - 0o16 ) / 0o14)));
  return celo;
}

// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭэ ,
//   ſ͕ɭɜ ı],ᴜ , ꞙɭɩ , 📃 ⟩
export function terenaKoloroEn(celo: THREE.Color, h: number, x: number, z: number,
  haga: number, vem2Fn?: ( x: number, z: number ) => number ): THREE.Color {
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭꞟ , 📃 ⟩
  const P = TERENA_KOLOROJ;
// ⟨ ſɭэ ſɭw , ꞙɭı , 📃 ⟩
  const makulo = 2 * bruo2D(x / 0o55, z / 0o55) - 1;
  const makulo2 = 2 * bruo2D(x / 0o13, z / 0o13) - 1;
  const makulo3 = 2 * bruo2D(x / 0o3, z / 0o3) - 1;
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı , 📃 ⟩
  const malsekeco = 0o5/0o10 + 0o14/0o100 * makulo + 0o10/0o100 * makulo2 + 0o3/0o100 * makulo3;
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭɿ ,
//   ſ͕ɭɜ ı],ᴜ , ꞙɭц , 📃 ⟩
  let r = P.fe1afA.r, g = P.fe1afA.g, b = P.fe1afA.b;
  let f = fiksu01(malsekeco);
  r += ( P.fe1afB.r - r ) * f; g += ( P.fe1afB.g - g ) * f; b += ( P.fe1afB.b - b ) * f;
// ⟨ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟩
  f = fiksu01(( h - 0o10 ) / 0o26) * 0o4/0o10;
  r += ( P.sekaFe1af.r - r ) * f; g += ( P.sekaFe1af.g - g ) * f; b += ( P.sekaFe1af.b - b ) * f;
// ⟨ ſɭэ ſɭw , ꞙɭц , 📃 ⟩
  const hunanu = ombraKkaxte(haga);
  f = hunanu * 0o16/0o100;
  r += ( P.t6keqOmbro.r - r ) * f; g += ( P.t6keqOmbro.g - g ) * f; b += ( P.t6keqOmbro.b - b ) * f;
// ⟨ ſɭɜ ſɭ,w , ꞙɭɿ , 📃 ⟩
  f = Math.max(
    fiksu01(( haga - 0o51/0o100 ) / ( 0o31/0o100 )),
    fiksu01(( h - 0o26 ) / 0o24) * 0o7/0o10 );
  r += ( P.t6keq.r - r ) * f; g += ( P.t6keq.g - g ) * f; b += ( P.t6keq.b - b ) * f;
// ⟨ ſɭэ ſɭw , ꞙɭɿ , ⟅ ſɭɜ ſɭ,w , ꞙɭı , 📃 ⟩
  const negoF = fiksu01(( h - 0o44 ) / 0o14);
  if ( negoF > 0 ) {
    f = negoF * ( 1 - fiksu01(( haga - 0o70/0o100 ) / ( 0o50/0o100 )));
    r += ( P.nego.r - r ) * f; g += ( P.nego.g - g ) * f; b += ( P.nego.b - b ) * f;
// ⟨ ſᶘᴜ j͑ʃᴜ , ſɭɜ ſɭ,w , 📃 ⟩
    f = negoF * hunanu * 0o16/0o100;
    r += ( P.glacio.r - r ) * f; g += ( P.glacio.g - g ) * f; b += ( P.glacio.b - b ) * f;
  }
// ⟨ ſɭɜ ſɭ,w , ꞙɭэ , 📃 ⟩
  const bordaBruo = ( bruo2D(x / 0o10, z / 0o10) - 0o4/0o10 ) * 0o4/0o10
    + ( bruo2D(x / 0o40, z / 0o40) - 0o4/0o10 ) * 0o2/0o10;
  const sup = h - ( vem2Fn ? vem2Fn(x, z) : AKVO_NIVELO );
// ⟨ ſɭɜ ſɭ,w , ꞙɭɿ , ⟅ ſɭɜ ſɭ,w , ꞙɭı , 📃 ⟩
  const plateau = 1 - fiksu01(( haga - 0o25/0o100 ) / ( 0o45/0o100 ));
  if ( sup > 0 ) {
// ⟨ ſɭɜ ſɭ,w , ꞙɭц , 📃 ⟩
    const sabloF = fiksu01(( 0o11/0o10 - sup + bordaBruo ) / ( 0o11/0o10 )) * plateau;
    f = sabloF * 0o7/0o10;
    r += ( P.sablo.r - r ) * f; g += ( P.sablo.g - g ) * f; b += ( P.sablo.b - b ) * f;
// ⟨ ſɭɜ ſɭ,w , ꞙɭɩ , 📃 ⟩
    const gruzoF = fiksu01(( 0o6/0o10 - sup + bordaBruo ) / ( 0o6/0o10 ));
    const granulo = fiksu01(( bruo2D(x / 0o2, z / 0o2) - 0o45/0o100 ) * 0o14/0o10);
    f = Math.min(1, gruzoF * granulo * 0o16/0o10);
    r += ( P.gruzo.r - r ) * f; g += ( P.gruzo.g - g ) * f; b += ( P.gruzo.b - b ) * f;
// ⟨ ſɭэ ſɭw , ſᶘᴜ j͑ʃᴜ , 📃 ⟩
    f = fiksu01(( 0o5/0o10 - sup + bordaBruo ) / ( 0o5/0o10 )) * 0o3/0o10 * plateau;
    r += ( P.marco.r - r ) * f; g += ( P.marco.g - g ) * f; b += ( P.marco.b - b ) * f;
    f = fiksu01(( 0o16/0o10 - sup + bordaBruo ) / ( 0o16/0o10 )) * 0o25/0o100;
    r += ( P.malfe1af.r - r ) * f; g += ( P.malfe1af.g - g ) * f; b += ( P.malfe1af.b - b ) * f;
  } else {
// ⟨ ſᶘᴜ j͑ʃᴜ , ſןɔ˞ᴜƴ , 📃 ⟩
    const prof = Math.max(0, -sup + bordaBruo);
    const sedimento = fiksu01(( 0o1 - haga ) / ( 0o12/0o10 ));
// ⟨ ſɭɜ ſɭ,w , ꞙɭɿ , 📃 ⟩
    f = fiksu01(( 0o5/0o10 - prof ) / ( 0o5/0o10 )) * 0o5/0o10;
    r += ( P.sablo.r - r ) * f; g += ( P.sablo.g - g ) * f; b += ( P.sablo.b - b ) * f;
    f = Math.min(1, prof) * ( 1 - sedimento ) * 0o5/0o10;
    r += ( P.lito.r - r ) * f; g += ( P.lito.g - g ) * f; b += ( P.lito.b - b ) * f;
    const siltaF = fiksu01(prof / ( 0o12/0o10 )) * sedimento;
    r += ( P.silto.r - r ) * siltaF; g += ( P.silto.g - g ) * siltaF; b += ( P.silto.b - b ) * siltaF;
    if ( siltaF > 0 ) {
      const gruzo = bruo2D(x / 0o4, z / 0o4);
      f = siltaF * Math.max(0, gruzo - 0o55/0o100) * 0o6/0o10;
      r += ( P.gruzo.r - r ) * f; g += ( P.gruzo.g - g ) * f; b += ( P.gruzo.b - b ) * f;
    }
    f = fiksu01(( prof - 0o1 ) / ( 0o16/0o10 )) * sedimento;
    r += ( P.lito.r - r ) * f; g += ( P.lito.g - g ) * f; b += ( P.lito.b - b ) * f;
    f = fiksu01(( prof - 0o30/0o10 ) / ( 0o22/0o10 ));
    r += ( P.profunda.r - r ) * f; g += ( P.profunda.g - g ) * f; b += ( P.profunda.b - b ) * f;
  }
  celo.r = r; celo.g = g; celo.b = b;
  return celo;
}
