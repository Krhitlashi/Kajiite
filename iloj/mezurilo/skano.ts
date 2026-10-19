// ≺⧼ ការវាស់ជំហានស្កេន 🔬 ⧽≻
// វាស់តម្លៃមុខងារនីមួយៗលើក្រឡាទាំងអស់នៃពិភពលោក ។ លេខទាំងនេះបង្ហាញ
// ថាតើផ្នែកណានៃការស្កេនថ្លៃបំផុត ។
import * as THREE from "three";
import { biomo, alteco, akvaNivelo, akvaNiveloProksima }
  from "../../kantaoj/mondo/tereno.js";
import { terenaKoloroEn } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { SKULPTA_N, SKULPTA_PASO, SKULPTA_ORIGINO }
  from "../../kantaoj/tero-datumaro/aktiva.js";

const CXELO = 0o2;
const amplexo = SKULPTA_N * SKULPTA_PASO;
const tabeloj = Math.ceil(amplexo / 0o100);
const krado = Math.round(0o100 / CXELO);
const N = tabeloj * tabeloj * krado * krado;
const unuaCxelo = Math.round(SKULPTA_ORIGINO[0] / CXELO);
const unuaCxeloZ = Math.round(SKULPTA_ORIGINO[1] / CXELO);

function herbaHasho( ix: number, iz: number ): number {
  let h = Math.imul(ix, 0x27d4eb2d) ^ Math.imul(iz, 0x165667b1);
  h = Math.imul(h ^ ( h >>> 0o15 ), 0x2545f491);
  return ( ( h ^ ( h >>> 0o13 ) ) >>> 0 ) / 0o4000000000000;
}

// ⟨ ក្រឡាទាំងអស់ គណនាម្តង 📃 ⟩
const xs = new Float64Array(N), zs = new Float64Array(N);
let p = 0;
for ( let tz = 0; tz < tabeloj; tz++ ) {
  for ( let tx = 0; tx < tabeloj; tx++ ) {
    const ux = unuaCxelo + tx * krado, uz = unuaCxeloZ + tz * krado;
    for ( let iz = 0; iz < krado; iz++ ) {
      for ( let ix = 0; ix < krado; ix++ ) {
        const cx = ux + ix, cz = uz + iz;
        xs[p] = ( cx + 0o1/0o2 + ( herbaHasho(cx, cz) - 0o1/0o2 ) * 0o1/0o4 ) * CXELO;
        zs[p] = ( cz + 0o1/0o2 + ( herbaHasho(cx + 0o27, cz + 0o11) - 0o1/0o2 ) * 0o1/0o4 ) * CXELO;
        p++;
      }
    }
  }
}

const KOLORO = new THREE.Color();

function mezuri( nomo: string, fn: ( x: number, z: number ) => number ): void {
  let sumo = 0;
  let plejBona = Infinity;
  for ( let r = 0; r < 0o7; r++ ) {
    const t0 = performance.now();
    for ( let i = 0; i < N; i++ ) sumo += fn(xs[i], zs[i]);
    const t1 = performance.now();
    if ( t1 - t0 < plejBona ) plejBona = t1 - t0;
  }
  const po = plejBona * 1000000 / N;
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${nomo.padEnd(0o30)} ${plejBona.toFixed(1)}ms ${po.toFixed(0)}ns/ក្រឡា [${sumo.toFixed(0)}]`);
}

const biomajxo: Record<string, number> = { akvo: 0, valo: 1, "ebenaĵo": 2, montaro: 3, "akvaj-plantoj": 4, ekyizeto: 5, nenio: 6 };
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ក្រឡា=${N}`);

// ⟨ ស្កេនទទេ ដូចក្នុងវាលស្មៅ 📃 ⟩
const filtro = [ "valo", "ebenaĵo" ];
let akceptitaj = 0;
function skani(): number {
  let n = 0;
  for ( let tz = 0; tz < tabeloj; tz++ ) {
    for ( let tx = 0; tx < tabeloj; tx++ ) {
      const ux = unuaCxelo + tx * krado, uz = unuaCxeloZ + tz * krado;
      for ( let iz = 0; iz < krado; iz++ ) {
        for ( let ix = 0; ix < krado; ix++ ) {
          const cx = ux + ix, cz = uz + iz;
          const x = ( cx + 0o1/0o2 + ( herbaHasho(cx, cz) - 0o1/0o2 ) * 0o1/0o4 ) * CXELO;
          const z = ( cz + 0o1/0o2 + ( herbaHasho(cx + 0o27, cz + 0o11) - 0o1/0o2 ) * 0o1/0o4 ) * CXELO;
          const bi = biomo(x, z);
          if ( !filtro.includes(bi) ) continue;
          if ( alteco(x, z) < 0o1 ) continue;
          n++;
        }
      }
    }
  }
  return n;
}
let skanoPlejBona = Infinity;
for ( let r = 0; r < 0o7; r++ ) {
  const t0 = performance.now();
  akceptitaj = skani();
  const t1 = performance.now();
  if ( t1 - t0 < skanoPlejBona ) skanoPlejBona = t1 - t0;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ស្កេនដៃ ${skanoPlejBona.toFixed(1)}ms ទទួល=${akceptitaj}`);

mezuri("ទទេ ( គ្មានអ្វី )", () => 1);
mezuri("biomo", (x, z) => biomajxo[biomo(x, z)] ?? 0);
mezuri("alteco", alteco);
mezuri("akvaNivelo", akvaNivelo);
mezuri("akvaNiveloProksima", akvaNiveloProksima);
mezuri("terenaKoloroEn", (x, z) => terenaKoloroEn(KOLORO, alteco(x, z), x, z, 0o1/0o4).r);
