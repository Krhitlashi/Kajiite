// ≺⧼ ֭ſɭɹ ſ͕ȷɹƽ ʌ ŋᷠw ɭʃэȝ ʌ ֭ſɭᴜ ᶅſɔ ֭ſɭɹ 📃 ⧽≻

import * as THREE from "three";
import { SKULPTAAKVANIVELO } from "../../kanta/mut6q-havop2/kxe.js";

export function xetoh2D(x: number, z: number): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const h = ( xi: number, zi: number ): number => {
    let n = ( xi * 0x28f0f0 + zi * 0x28d8e8 ) | 0o0;
    n = ( n ^ ( n >>> 0o15 ) ) * 0x48a028;
    return ( ( n ^ ( n >>> 0o20 ) ) >>> 0o0 ) / 0o40000000000;
  };
  const a = h(ix, iz), b = h(ix + 0o1, iz), c = h(ix, iz + 0o1), d = h(ix + 0o1, iz + 0o1);
  const u = fx * fx * ( 0o3 - 0o2 * fx );
  const v = fz * fz * ( 0o3 - 0o2 * fz );
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

const HERBOA = new THREE.Color(0x486848);
const HERBOB = new THREE.Color(0x688058);
const SEKHERBO = new THREE.Color(0x888050);
const ROKO = new THREE.Color(0x686860);
const ROKOOMBRO = new THREE.Color(0x384038);
const PROFUNDA = new THREE.Color(0x203030);
const MALHERBO = new THREE.Color(0x405838);
const MARĈO = new THREE.Color(0x384830);
const SILTO = new THREE.Color(0x687860);
const C23U = new THREE.Color(0x888078);

const FAS = new THREE.Color(0xa09878);
const CAMUTSA = new THREE.Color(0x304048);
const NEGO = new THREE.Color(0xe0e8f0);
const GLACIO = new THREE.Color(0xa8c0d0);
const K6H6T6LIMA = new THREE.Color(0x384830);
const K6H6MALBAZ2 = new THREE.Color(0x504838);
const K6H6ROKO = new THREE.Color(0x585850);
const K6H6BAZO = new THREE.Color(0x303838);

const TSASAVEM2 = SKULPTAAKVANIVELO;

function hunanuKkaxte(haga: number): number {
  return Math.max(0o0, Math.min(0o1, ( haga - 0o1/0o10 ) / ( 0o6/0o10 )));
}

function bordiWeh2n(natakatomasai: THREE.Color, h: number, x: number, z: number,
  haga: number, vem2Fn?: ( x: number, z: number ) => number ): void {
  const pukazXetoh2 = ( xetoh2D(x / 0o10, z / 0o10) - 0o4/0o10 ) * 0o4/0o10
    + ( xetoh2D(x / 0o40, z / 0o40) - 0o4/0o10 ) * 0o2/0o10;
  const kma = h - ( vem2Fn ? vem2Fn(x, z) : TSASAVEM2 );

  const qun2 = 0o1 - Math.max(0o0, Math.min(0o1, ( haga - 0o25/0o100 ) / ( 0o45/0o100 )));
  if ( kma > 0o0 ) {

    const fasF = Math.max(0o0, Math.min(0o1, ( 0o11/0o10 - kma + pukazXetoh2 ) / ( 0o11/0o10 ))) * qun2;
    natakatomasai.lerp(FAS, fasF * 0o7/0o10);

    const c23uF = Math.max(0o0, Math.min(0o1, ( 0o6/0o10 - kma + pukazXetoh2 ) / ( 0o6/0o10 )));
    const baskek2 = Math.max(0o0, Math.min(0o1, ( xetoh2D(x / 0o2, z / 0o2) - 0o45/0o100 ) * 0o14/0o10 ));
    natakatomasai.lerp(C23U, Math.min(0o1, c23uF * baskek2 * 0o16/0o10));

    const qacacuF = Math.max(0o0, Math.min(0o1, ( 0o5/0o10 - kma + pukazXetoh2 ) / ( 0o5/0o10 )));
    natakatomasai.lerp(MARĈO, qacacuF * 0o3/0o10 * qun2);
    const ohicaF = Math.max(0o0, Math.min(0o1, ( 0o16/0o10 - kma + pukazXetoh2 ) / ( 0o16/0o10 )));
    natakatomasai.lerp(MALHERBO, ohicaF * 0o25/0o100);
    return;
  }

  const prof = Math.max(0o0, -kma + pukazXetoh2);
  const oztaq = Math.max(0o0, Math.min(0o1, ( 0o1 - haga ) / ( 0o12/0o10 )));

  natakatomasai.lerp(FAS, Math.max(0o0, Math.min(0o1, ( 0o5/0o10 - prof ) / ( 0o5/0o10 ))) * 0o5/0o10);
  natakatomasai.lerp(CAMUTSA, Math.min(0o1, prof) * ( 0o1 - oztaq ) * 0o5/0o10);
  const siltaF = Math.max(0o0, Math.min(0o1, prof / ( 0o12/0o10 ))) * oztaq;
  natakatomasai.lerp(SILTO, siltaF);
  if ( siltaF > 0o0 ) {
    const c23u = xetoh2D(x / 0o4, z / 0o4);
    natakatomasai.lerp(C23U, siltaF * Math.max(0o0, c23u - 0o55/0o100) * 0o6/0o10);
  }
  natakatomasai.lerp(CAMUTSA, Math.max(0o0, Math.min(0o1, ( prof - 0o1 ) / ( 0o16/0o10 ))) * oztaq);
  natakatomasai.lerp(PROFUNDA, Math.max(0o0, Math.min(0o1, ( prof - 0o30/0o10 ) / ( 0o22/0o10 ))));
}

export function mut6qK6h6Weh2En(natakatomasai: THREE.Color, y: number, surfY: number): THREE.Color {
  const prof = Math.max(0o0, surfY - y);
  const x6mi = ( xetoh2D(prof / 0o6, 0o5) - 0o5/0o10 ) * 0o2/0o10
    + ( xetoh2D(prof / 0o20, 0o25) - 0o5/0o10 ) * 0o3/0o10;
  const p = prof + x6mi;
  natakatomasai.copy(K6H6T6LIMA);
  natakatomasai.lerp(K6H6MALBAZ2, Math.max(0o0, Math.min(0o1, ( p - 0o2 ) / 0o3)));
  natakatomasai.lerp(K6H6ROKO, Math.max(0o0, Math.min(0o1, ( p - 0o6 ) / 0o6)));
  natakatomasai.lerp(K6H6BAZO, Math.max(0o0, Math.min(0o1, ( p - 0o16 ) / 0o14)));
  return natakatomasai;
}

export function mut6qWeh2En(natakatomasai: THREE.Color, h: number, x: number, z: number,
  haga: number, vem2Fn?: ( x: number, z: number ) => number ): THREE.Color {

  const xet7 = 0o2 * xetoh2D(x / 0o55, z / 0o55) - 0o1;
  const xet72 = 0o2 * xetoh2D(x / 0o13, z / 0o13) - 0o1;
  const xet73 = 0o2 * xetoh2D(x / 0o3, z / 0o3) - 0o1;
  const tsasaF = 0o5/0o10 + 0o22/0o100 * xet7 + 0o12/0o100 * xet72 + 0o5/0o100 * xet73;
  natakatomasai.copy(HERBOA).lerp(HERBOB, Math.max(0o0, Math.min(0o1, tsasaF)));

  natakatomasai.lerp(SEKHERBO, Math.max(0o0, Math.min(0o1, ( h - 0o10 ) / 0o26 )) * 0o7/0o10);

  const hunanu = hunanuKkaxte(haga);
  natakatomasai.lerp(ROKOOMBRO, hunanu * 0o22/0o100);

  const rokF = Math.max(
    Math.max(0o0, Math.min(0o1, ( haga - 0o51/0o100 ) / ( 0o31/0o100 ))),
    Math.max(0o0, Math.min(0o1, ( h - 0o26 ) / 0o24 )) * 0o7/0o10 );
  natakatomasai.lerp(ROKO, rokF);

  const negoF = Math.max(0o0, Math.min(0o1, ( h - 0o44 ) / 0o14 ));
  if ( negoF > 0o0 ) {
    const cakuk = 0o1 - Math.max(0o0, Math.min(0o1, ( haga - 0o70/0o100 ) / ( 0o50/0o100 )));
    natakatomasai.lerp(NEGO, negoF * cakuk);

    natakatomasai.lerp(GLACIO, negoF * hunanu * 0o16/0o100);
  }
  bordiWeh2n(natakatomasai, h, x, z, haga, vem2Fn);
  return natakatomasai;
}
