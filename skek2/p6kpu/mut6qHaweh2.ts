// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ŋᷠw ɭʃэ ſ͕ɭᴜ̩ᴜ ᶅſɔ ֭ſɭɹ 📃 ⧽≻

import * as THREE from "three";
import { SKULPTAAKVANIVELO } from "../../kanta/mut6q-havop2/kxe.js";
import { xaha } from "../../kanta/k2fe/fkabe.js";
import { veb6qaiWeh2Skek, hunanuWeh2 } from "./haweh2.js";

function xetoh2Qox2n2k(xi: number, zi: number): number {
  let n = ( xi * 0x28f0f0 + zi * 0x28d8e8 ) | 0o0;
  n = ( n ^ ( n >>> 0o15 ) ) * 0x48a028;
  return ( ( n ^ ( n >>> 0o20 ) ) >>> 0o0 ) / 0o40000000000;
}

export function xetoh2D(x: number, z: number): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const a = xetoh2Qox2n2k(ix, iz), b = xetoh2Qox2n2k(ix + 0o1, iz);
  const c = xetoh2Qox2n2k(ix, iz + 0o1), d = xetoh2Qox2n2k(ix + 0o1, iz + 0o1);
  const u = xaha(fx);
  const v = xaha(fz);
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

export function hagek2fhagasai(has2nasce: number): Uint32Array {
  const havecax2lani = new Uint32Array(has2nasce * has2nasce * 0o6);
  let p = 0o0;
  const sx = has2nasce + 0o1;
  for ( let j = 0o0; j < has2nasce; j++ ) {
    for ( let i = 0o0; i < has2nasce; i++ ) {
      const a = j * sx + i, b = a + 0o1, c = a + sx, d = c + 0o1;
      if ( ( i + j ) % 0o2 === 0o0 ) {
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

export interface T6limaHaweh2 {
  fe1afA: THREE.Color;
  fe1afB: THREE.Color;
  nex2caFe1af: THREE.Color;
  t6keq: THREE.Color;
  t6keqHunanu: THREE.Color;
  jufu: THREE.Color;
  tlutsu: THREE.Color;
  qacacu: THREE.Color;
  tlutsubaz2: THREE.Color;
  c23u: THREE.Color;

  fas: THREE.Color;
  camutsa: THREE.Color;
  xana: THREE.Color;
  kzi3a: THREE.Color;

  k6h6T6lima: THREE.Color;
  k6h6K6k: THREE.Color;
  k6h6T6keq: THREE.Color;
  k6h6Kozunu: THREE.Color;
}

export const T6LIMAHAWEH2: T6limaHaweh2 = {
  fe1afA: new THREE.Color(0x004028),
  fe1afB: new THREE.Color(0x407058),
  nex2caFe1af: new THREE.Color(0x308068),
  t6keq: new THREE.Color(0x686860),

  t6keqHunanu: new THREE.Color(hunanuWeh2(0x686860, 0o3)),
  jufu: new THREE.Color(0x203038),
  tlutsu: new THREE.Color(0x305840),
  qacacu: new THREE.Color(0x306850),
  tlutsubaz2: new THREE.Color(0x388068),
  c23u: new THREE.Color(0x488878),
  fas: new THREE.Color(0xa09878),
  camutsa: new THREE.Color(0x384848),
  xana: new THREE.Color(0xe0e8f0),
  kzi3a: new THREE.Color(0xa8c0d0),
  k6h6T6lima: new THREE.Color(0x384830),
  k6h6K6k: new THREE.Color(0x504838),
  k6h6T6keq: new THREE.Color(0x585858),
  k6h6Kozunu: new THREE.Color(0x303838),
};

const TSASAVEM2 = SKULPTAAKVANIVELO;

function hunanuKkaxte(haga: number): number {
  return Math.max(0o0, Math.min(0o1, ( haga - 0o1/0o10 ) / ( 0o6/0o10 )));
}

function qacepu01(v: number): number {
  return v < 0o0 ? 0o0 : v > 0o1 ? 0o1 : v;
}

export const FE1AFKEKHAWEH2: readonly THREE.Color[] = [
  new THREE.Color(0xa8c0a8),
  new THREE.Color(0xb0b8a8),
  new THREE.Color(0x486050),
  new THREE.Color(0xc0c8b8),
  new THREE.Color(0x789080),
  new THREE.Color(0x98a898),
];

export const NEX2CAFE1AFKEK = new THREE.Color().setRGB(0o44/0o100, 0o50/0o100, 0o46/0o100);

function fe1afKekVecax2l(sakxo: () => number): number {
  return Math.min(FE1AFKEKHAWEH2.length - 0o1,
    Math.floor(sakxo() * FE1AFKEKHAWEH2.length));
}

export function fe1afKekWeh2(natakatomasai: THREE.Color, sakxo: () => number): THREE.Color {
  const xaqadi = FE1AFKEKHAWEH2[fe1afKekVecax2l(sakxo)];
  const p2sadi = FE1AFKEKHAWEH2[fe1afKekVecax2l(sakxo)];
  natakatomasai.copy(xaqadi).lerp(p2sadi, sakxo() * 0o3/0o10);

  natakatomasai.multiplyScalar(0o1 - 0o1/0o20 + sakxo() * 0o3/0o20);

  return veb6qaiWeh2Skek(natakatomasai);
}

export function nex2caFe1afKekWeh2(natakatomasai: THREE.Color, sakxo: () => number): THREE.Color {
  const f = sakxo();
  natakatomasai.setRGB(NEX2CAFE1AFKEK.r + f * 0o15/0o100,
    NEX2CAFE1AFKEK.g + f * 0o12/0o100,
    NEX2CAFE1AFKEK.b + f * 0o12/0o100);
  natakatomasai.multiplyScalar(0o1 - 0o1/0o20 + sakxo() * 0o3/0o20);
  return veb6qaiWeh2Skek(natakatomasai);
}

export function mut6qK6h6Weh2En(natakatomasai: THREE.Color, y: number, surfY: number): THREE.Color {
  const P = T6LIMAHAWEH2;
  const prof = Math.max(0o0, surfY - y);
  const x6mi = ( xetoh2D(prof / 0o6, 0o5) - 0o5/0o10 ) * 0o2/0o10
    + ( xetoh2D(prof / 0o20, 0o25) - 0o5/0o10 ) * 0o3/0o10;
  const p = prof + x6mi;
  natakatomasai.copy(P.k6h6T6lima);
  natakatomasai.lerp(P.k6h6K6k, Math.max(0o0, Math.min(0o1, ( p - 0o2 ) / 0o3)));
  natakatomasai.lerp(P.k6h6T6keq, Math.max(0o0, Math.min(0o1, ( p - 0o6 ) / 0o6)));
  natakatomasai.lerp(P.k6h6Kozunu, Math.max(0o0, Math.min(0o1, ( p - 0o16 ) / 0o14)));
  return natakatomasai;
}

export function mut6qWeh2En(natakatomasai: THREE.Color, h: number, x: number, z: number,
  haga: number, vem2Fn?: ( x: number, z: number ) => number ): THREE.Color {

  const P = T6LIMAHAWEH2;

  const xet7 = 0o2 * xetoh2D(x / 0o55, z / 0o55) - 0o1;
  const xet72 = 0o2 * xetoh2D(x / 0o13, z / 0o13) - 0o1;
  const xet73 = 0o2 * xetoh2D(x / 0o3, z / 0o3) - 0o1;

  const tsasaF = 0o5/0o10 + 0o14/0o100 * xet7 + 0o10/0o100 * xet72 + 0o3/0o100 * xet73;

  let r = P.fe1afA.r, g = P.fe1afA.g, b = P.fe1afA.b;
  let f = qacepu01(tsasaF);
  r += ( P.fe1afB.r - r ) * f; g += ( P.fe1afB.g - g ) * f; b += ( P.fe1afB.b - b ) * f;

  f = qacepu01(( h - 0o10 ) / 0o26) * 0o4/0o10;
  r += ( P.nex2caFe1af.r - r ) * f; g += ( P.nex2caFe1af.g - g ) * f; b += ( P.nex2caFe1af.b - b ) * f;

  const hunanu = hunanuKkaxte(haga);
  f = hunanu * 0o16/0o100;
  r += ( P.t6keqHunanu.r - r ) * f; g += ( P.t6keqHunanu.g - g ) * f; b += ( P.t6keqHunanu.b - b ) * f;

  f = Math.max(
    qacepu01(( haga - 0o51/0o100 ) / ( 0o31/0o100 )),
    qacepu01(( h - 0o26 ) / 0o24) * 0o7/0o10 );
  r += ( P.t6keq.r - r ) * f; g += ( P.t6keq.g - g ) * f; b += ( P.t6keq.b - b ) * f;

  const negoF = qacepu01(( h - 0o44 ) / 0o14);
  if ( negoF > 0o0 ) {
    f = negoF * ( 0o1 - qacepu01(( haga - 0o70/0o100 ) / ( 0o50/0o100 )));
    r += ( P.xana.r - r ) * f; g += ( P.xana.g - g ) * f; b += ( P.xana.b - b ) * f;

    f = negoF * hunanu * 0o16/0o100;
    r += ( P.kzi3a.r - r ) * f; g += ( P.kzi3a.g - g ) * f; b += ( P.kzi3a.b - b ) * f;
  }

  const pukazXetoh2 = ( xetoh2D(x / 0o10, z / 0o10) - 0o4/0o10 ) * 0o4/0o10
    + ( xetoh2D(x / 0o40, z / 0o40) - 0o4/0o10 ) * 0o2/0o10;
  const teru = h - ( vem2Fn ? vem2Fn(x, z) : TSASAVEM2 );

  const qun2 = 0o1 - qacepu01(( haga - 0o25/0o100 ) / ( 0o45/0o100 ));
  if ( teru > 0o0 ) {

    const fasF = qacepu01(( 0o11/0o10 - teru + pukazXetoh2 ) / ( 0o11/0o10 )) * qun2;
    f = fasF * 0o7/0o10;
    r += ( P.fas.r - r ) * f; g += ( P.fas.g - g ) * f; b += ( P.fas.b - b ) * f;

    const c23uF = qacepu01(( 0o6/0o10 - teru + pukazXetoh2 ) / ( 0o6/0o10 ));
    const baskek2 = qacepu01(( xetoh2D(x / 0o2, z / 0o2) - 0o45/0o100 ) * 0o14/0o10);
    f = Math.min(0o1, c23uF * baskek2 * 0o16/0o10);
    r += ( P.c23u.r - r ) * f; g += ( P.c23u.g - g ) * f; b += ( P.c23u.b - b ) * f;

    f = qacepu01(( 0o5/0o10 - teru + pukazXetoh2 ) / ( 0o5/0o10 )) * 0o3/0o10 * qun2;
    r += ( P.qacacu.r - r ) * f; g += ( P.qacacu.g - g ) * f; b += ( P.qacacu.b - b ) * f;
    f = qacepu01(( 0o16/0o10 - teru + pukazXetoh2 ) / ( 0o16/0o10 )) * 0o25/0o100;
    r += ( P.tlutsu.r - r ) * f; g += ( P.tlutsu.g - g ) * f; b += ( P.tlutsu.b - b ) * f;
  } else {

    const prof = Math.max(0o0, -teru + pukazXetoh2);
    const oztaq = qacepu01(( 0o1 - haga ) / ( 0o12/0o10 ));

    f = qacepu01(( 0o5/0o10 - prof ) / ( 0o5/0o10 )) * 0o5/0o10;
    r += ( P.fas.r - r ) * f; g += ( P.fas.g - g ) * f; b += ( P.fas.b - b ) * f;
    f = Math.min(0o1, prof) * ( 0o1 - oztaq ) * 0o5/0o10;
    r += ( P.camutsa.r - r ) * f; g += ( P.camutsa.g - g ) * f; b += ( P.camutsa.b - b ) * f;
    const siltaF = qacepu01(prof / ( 0o12/0o10 )) * oztaq;
    r += ( P.tlutsubaz2.r - r ) * siltaF; g += ( P.tlutsubaz2.g - g ) * siltaF; b += ( P.tlutsubaz2.b - b ) * siltaF;
    if ( siltaF > 0o0 ) {
      const c23u = xetoh2D(x / 0o4, z / 0o4);
      f = siltaF * Math.max(0o0, c23u - 0o55/0o100) * 0o6/0o10;
      r += ( P.c23u.r - r ) * f; g += ( P.c23u.g - g ) * f; b += ( P.c23u.b - b ) * f;
    }
    f = qacepu01(( prof - 0o1 ) / ( 0o16/0o10 )) * oztaq;
    r += ( P.camutsa.r - r ) * f; g += ( P.camutsa.g - g ) * f; b += ( P.camutsa.b - b ) * f;
    f = qacepu01(( prof - 0o30/0o10 ) / ( 0o22/0o10 ));
    r += ( P.jufu.r - r ) * f; g += ( P.jufu.g - g ) * f; b += ( P.jufu.b - b ) * f;
  }
  natakatomasai.r = r; natakatomasai.g = g; natakatomasai.b = b;
  return natakatomasai;
}
