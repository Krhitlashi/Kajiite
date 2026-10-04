// ≺⧼ ពណ៌ដី 🎨 ⧽≻
import * as THREE from "three";
import { SKULPTA_AKVA_NIVELO } from "../../kantaoj/tero-datumaro/aktiva.js";

export function bruo2D(x: number, z: number): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const h = ( xi: number, zi: number ): number => {
    let n = ( xi * 0x28f0f0 + zi * 0x28d8e8 ) | 0;
    n = ( n ^ ( n >>> 0o15 ) ) * 0x48a028;
    return ( ( n ^ ( n >>> 0o20 ) ) >>> 0 ) / 0o40000000000;
  };
  const a = h(ix, iz), b = h(ix + 1, iz), c = h(ix, iz + 1), d = h(ix + 1, iz + 1);
  const u = fx * fx * ( 3 - 2 * fx );
  const v = fz * fz * ( 3 - 2 * fz );
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

// ⟨ ត្រង់ចូលតារាង 📃 ⟩
export function alternajDiagonalojn(segmentoj: number): Uint32Array {
  const indeksoj = new Uint32Array(segmentoj * segmentoj * 0o6);
  let p = 0;
  const sx = segmentoj + 1;
  for ( let j = 0; j < segmentoj; j++ ) {
    for ( let i = 0; i < segmentoj; i++ ) {
      const a = j * sx + i, b = a + 1, c = a + sx, d = c + 1;
      if ( ( i + j ) % 2 === 0 ) {
        indeksoj[p++] = a; indeksoj[p++] = c; indeksoj[p++] = d;
        indeksoj[p++] = a; indeksoj[p++] = d; indeksoj[p++] = b;
      } else {
        indeksoj[p++] = a; indeksoj[p++] = c; indeksoj[p++] = b;
        indeksoj[p++] = c; indeksoj[p++] = d; indeksoj[p++] = b;
      }
    }
  }
  return indeksoj;
}

// ⟨ ជិតវាលស្មៅបន្តិច 📃 ⟩
const HERBO_A = new THREE.Color(0x506050);
const HERBO_B = new THREE.Color(0x607860);
const LITO = new THREE.Color(0x384848);
const PROFUNDA = new THREE.Color(0x283838);
const SEKHERBO = new THREE.Color(0x787850);
const ROKO = new THREE.Color(0x787868);
const NEGO = new THREE.Color(0xe0e8f0);
const MALHERBO = new THREE.Color(0x405840);
const MARĈO = new THREE.Color(0x404038);
const SILTO = new THREE.Color(0x788878);
const GRUZO = new THREE.Color(0x888888);
const STRATO_TERO = new THREE.Color(0x3c4836);
const STRATO_MALMOLA = new THREE.Color(0x50483c);
const STRATO_ROKO = new THREE.Color(0x585a56);
const STRATO_BAZO = new THREE.Color(0x33383a);

const AKVO_NIVELO = SKULPTA_AKVA_NIVELO;

function bordiKoloron(celo: THREE.Color, h: number, x: number, z: number,
  deklivo: number, niveloFn?: ( x: number, z: number ) => number ): void {
  const bordaBruo = ( bruo2D(x / 0o10, z / 0o10) - 0o4/0o10 ) * 0o4/0o10
    + ( bruo2D(x / 0o40, z / 0o40) - 0o4/0o10 ) * 0o2/0o10;
  const sup = h - ( niveloFn ? niveloFn(x, z) : AKVO_NIVELO );
  if ( sup > 0 ) {
    // ⟨ លើទឹក 📃 ⟩
    const malherbaF = Math.max(0, Math.min(1, ( 0o14/0o10 - sup + bordaBruo ) / ( 0o14/0o10 )));
    const margxaF = Math.max(0, Math.min(1, ( 0o6/0o10 - sup + bordaBruo ) / ( 0o6/0o10 )));
    celo.lerp(MALHERBO, malherbaF * 0o6/0o10);
    celo.lerp(MARĈO, margxaF * 0o7/0o10);
    return;
  }
  // ⟨ ក្រោមទឹក 📃 ⟩
  const prof = Math.max(0, -sup + bordaBruo);
  const sedimento = Math.max(0, Math.min(1, ( 0o1 - deklivo ) / ( 0o12/0o10 )));
  celo.lerp(LITO, Math.min(1, prof) * ( 1 - sedimento ) * 0o5/0o10);
  const siltaF = Math.max(0, Math.min(1, prof / ( 0o12/0o10 ))) * sedimento;
  celo.lerp(SILTO, siltaF);
  if ( siltaF > 0 ) {
    const gruzo = bruo2D(x / 0o4, z / 0o4);
    celo.lerp(GRUZO, siltaF * Math.max(0, gruzo - 0o55/0o100) * 0o6/0o10);
  }
  celo.lerp(LITO, Math.max(0, Math.min(1, ( prof - 0o1 ) / ( 0o16/0o10 ))) * sedimento);
  celo.lerp(PROFUNDA, Math.max(0, Math.min(1, ( prof - 0o30/0o10 ) / ( 0o22/0o10 ))));
}

export function terenaStrataKoloroEn(celo: THREE.Color, y: number, surfY: number): THREE.Color {
  const prof = Math.max(0, surfY - y);
  const ondo = ( bruo2D(prof / 0o6, 0o5) - 0o5/0o10 ) * 0o2/0o10
    + ( bruo2D(prof / 0o20, 0o25) - 0o5/0o10 ) * 0o3/0o10;
  const p = prof + ondo;
  celo.copy(STRATO_TERO);
  celo.lerp(STRATO_MALMOLA, Math.max(0, Math.min(1, ( p - 0o2 ) / 0o3)));
  celo.lerp(STRATO_ROKO, Math.max(0, Math.min(1, ( p - 0o6 ) / 0o6)));
  celo.lerp(STRATO_BAZO, Math.max(0, Math.min(1, ( p - 0o16 ) / 0o14)));
  return celo;
}

export function terenaKoloroEn(celo: THREE.Color, h: number, x: number, z: number,
  deklivo: number, niveloFn?: ( x: number, z: number ) => number ): THREE.Color {
  const t = Math.max(0, Math.min(1,
    0o4/0o10 + 0o2/0o10 * ( 2 * bruo2D(x / 0o60, z / 0o60) - 1 )
    + 0o4/0o100 * ( 2 * bruo2D(x / 0o14, z / 0o14) - 1 )));
  celo.copy(HERBO_A).lerp(HERBO_B, t);
  if ( h > 0o10 ) celo.lerp(SEKHERBO, Math.min(1, ( h - 0o10 ) / 0o10));
  const rokF = Math.max(
    Math.max(0, Math.min(1, ( deklivo - ( 0o45/0o100 ) ) / ( 0o5/0o10 ))),
    Math.max(0, Math.min(1, ( h - 0o22 ) / 0o20 )));
  celo.lerp(ROKO, rokF);
  if ( h > 0o46 ) celo.lerp(NEGO, Math.min(1, ( h - 0o46 ) / 0o10));
  bordiKoloron(celo, h, x, z, deklivo, niveloFn);
  return celo;
}
