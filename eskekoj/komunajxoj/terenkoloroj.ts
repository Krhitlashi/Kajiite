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

// ⟨ ក្ដៅជាងមុនបន្តិច , ដើម្បីកុំឱ្យស្លេកពេកក្នុងអ័ព្ទ 📃 ⟩
const HERBO_A = new THREE.Color(0x4e6949);
const HERBO_B = new THREE.Color(0x6f8558);
const SEKHERBO = new THREE.Color(0x8b8756);
const ROKO = new THREE.Color(0x6e6a60);
const ROKO_OMBRO = new THREE.Color(0x3f453e);
const PROFUNDA = new THREE.Color(0x203535);
const MALHERBO = new THREE.Color(0x435b3f);
const MARĈO = new THREE.Color(0x3e4a35);
const SILTO = new THREE.Color(0x6c7e67);
const GRUZO = new THREE.Color(0x8b8578);
// ⟨ ច្រាំងខ្សាច់ 📃 ⟩
const SABLO = new THREE.Color(0xa79a7c);
const LITO = new THREE.Color(0x37474a);
const NEGO = new THREE.Color(0xe4ebf2);
const GLACIO = new THREE.Color(0xafc4d2);
const STRATO_TERO = new THREE.Color(0x3c4836);
const STRATO_MALMOLA = new THREE.Color(0x50483c);
const STRATO_ROKO = new THREE.Color(0x585a56);
const STRATO_BAZO = new THREE.Color(0x33383a);

const AKVO_NIVELO = SKULPTA_AKVA_NIVELO;

// ⟨ ជម្រាលចោទជាងនេះ ចាប់ផ្ដើមមានស្រមោល 📃 ⟩
function ombraKurbo(deklivo: number): number {
  return Math.max(0, Math.min(1, ( deklivo - 0o1/0o10 ) / ( 0o6/0o10 )));
}

function bordiKoloron(celo: THREE.Color, h: number, x: number, z: number,
  deklivo: number, niveloFn?: ( x: number, z: number ) => number ): void {
  const bordaBruo = ( bruo2D(x / 0o10, z / 0o10) - 0o4/0o10 ) * 0o4/0o10
    + ( bruo2D(x / 0o40, z / 0o40) - 0o4/0o10 ) * 0o2/0o10;
  const sup = h - ( niveloFn ? niveloFn(x, z) : AKVO_NIVELO );
  // ⟨ ច្រាំងរាបស្មើទេ ៖ ខ្សាច់កើតតែលើដីរាប , ច្រាំងចោទទុកជាថ្ម 📃 ⟩
  const plateau = 1 - Math.max(0, Math.min(1, ( deklivo - 0o25/0o100 ) / ( 0o45/0o100 )));
  if ( sup > 0 ) {
    // ⟨ ច្រាំងខ្សាច់ក្រៅទឹក 📃 ⟩
    const sabloF = Math.max(0, Math.min(1, ( 0o11/0o10 - sup + bordaBruo ) / ( 0o11/0o10 ))) * plateau;
    celo.lerp(SABLO, sabloF * 0o7/0o10);
    // ⟨ គ្រួសតូចៗតាមច្រាំង 📃 ⟩
    const gruzoF = Math.max(0, Math.min(1, ( 0o6/0o10 - sup + bordaBruo ) / ( 0o6/0o10 )));
    const granulo = Math.max(0, Math.min(1, ( bruo2D(x / 0o2, z / 0o2) - 0o45/0o100 ) * 0o14/0o10 ));
    celo.lerp(GRUZO, Math.min(1, gruzoF * granulo * 0o16/0o10));
    // ⟨ ភក់ និងស្មៅសើមជិតទឹក 📃 ⟩
    const marcoF = Math.max(0, Math.min(1, ( 0o5/0o10 - sup + bordaBruo ) / ( 0o5/0o10 )));
    celo.lerp(MARĈO, marcoF * 0o3/0o10 * plateau);
    const malherbaF = Math.max(0, Math.min(1, ( 0o16/0o10 - sup + bordaBruo ) / ( 0o16/0o10 )));
    celo.lerp(MALHERBO, malherbaF * 0o25/0o100);
    return;
  }
  // ⟨ ក្រោមទឹក 📃 ⟩
  const prof = Math.max(0, -sup + bordaBruo);
  const sedimento = Math.max(0, Math.min(1, ( 0o1 - deklivo ) / ( 0o12/0o10 )));
  // ⟨ បាតរាក់ ៖ ខ្សាច់ស្រាល 📃 ⟩
  celo.lerp(SABLO, Math.max(0, Math.min(1, ( 0o5/0o10 - prof ) / ( 0o5/0o10 ))) * 0o5/0o10);
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
  // ⟨ ស្មៅ ៖ សំណើមប្រែប្រួលតាមអង្គបីជាន់ , មិនស្មើគ្នាទាំងអស់ 📃 ⟩
  const makulo = 2 * bruo2D(x / 0o55, z / 0o55) - 1;
  const makulo2 = 2 * bruo2D(x / 0o13, z / 0o13) - 1;
  const makulo3 = 2 * bruo2D(x / 0o3, z / 0o3) - 1;
  const malsekeco = 0o5/0o10 + 0o22/0o100 * makulo + 0o12/0o100 * makulo2 + 0o5/0o100 * makulo3;
  celo.copy(HERBO_A).lerp(HERBO_B, Math.max(0, Math.min(1, malsekeco)));
  // ⟨ ស្មៅខ្ពស់កាន់តែស្ងួត 📃 ⟩
  celo.lerp(SEKHERBO, Math.max(0, Math.min(1, ( h - 0o10 ) / 0o26 )) * 0o7/0o10);
  // ⟨ ស្រមោលតាមជម្រាល ៖ ចំណោតចោទងងឹតជាង 📃 ⟩
  const ombro = ombraKurbo(deklivo);
  celo.lerp(ROKO_OMBRO, ombro * 0o22/0o100);
  // ⟨ ថ្ម ៖ តាមជម្រាលជាចម្បង , តាមកម្ពស់បន្ថែមតិចៗ 📃 ⟩
  const rokF = Math.max(
    Math.max(0, Math.min(1, ( deklivo - 0o51/0o100 ) / ( 0o31/0o100 ))),
    Math.max(0, Math.min(1, ( h - 0o26 ) / 0o24 )) * 0o7/0o10 );
  celo.lerp(ROKO, rokF);
  // ⟨ ព្រិល ៖ កំពូលខ្ពស់ , តែចំណោតចោទមិនកាន់ព្រិល 📃 ⟩
  const negoF = Math.max(0, Math.min(1, ( h - 0o44 ) / 0o14 ));
  if ( negoF > 0 ) {
    const tenilo = 1 - Math.max(0, Math.min(1, ( deklivo - 0o70/0o100 ) / ( 0o50/0o100 )));
    celo.lerp(NEGO, negoF * tenilo);
    // ⟨ ទឹកកកចាស់នៅចំណោតស្រួច ៖ ខៀវស្រាល 📃 ⟩
    celo.lerp(GLACIO, negoF * ombro * 0o16/0o100);
  }
  bordiKoloron(celo, h, x, z, deklivo, niveloFn);
  return celo;
}
