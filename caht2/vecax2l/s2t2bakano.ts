// ≺⧼ j͑ʃɹ ɭʃɹ ʃᴜ ſɭᴜ }ʃɜ 📃 ⧽≻

import * as THREE from "three";
import { bs2, l6da, tsasaVem2, tsasaVem2Tsiike }
  from "../../kanta/nala/mut6q-soza.js";
import { mut6qWeh2En } from "../../skek2/p6kpu/mut6q-haweh2.js";
import { SKULPTAN, SKULPTAPASO, SKULPTAORIGINO } from "../../kanta/mut6q-havop2/kxe.js";
import { tbo, knak2fecajasai } from "../../kanta/k2fe/s2cax2l.js";

const CXELO = 0o2;
const amplexo = SKULPTAN * SKULPTAPASO;
const hacax2l = Math.ceil(amplexo / 0o100);
const qox2n2k = Math.round(0o100 / CXELO);
const N = hacax2l * hacax2l * qox2n2k * qox2n2k;
const unuaK2pa = Math.round(SKULPTAORIGINO[0o0] / CXELO);
const unuaK2paZ = Math.round(SKULPTAORIGINO[0o1] / CXELO);

function tsiicaKp6taf( ix: number, iz: number ): number {
  let h = Math.imul(ix, 0x27d4eb2d) ^ Math.imul(iz, 0x165667b1);
  h = Math.imul(h ^ ( h >>> 0o15 ), 0x2545f491);
  return ( ( h ^ ( h >>> 0o13 ) ) >>> 0o0 ) / 0o4000000000000;
}

const xs = new Float64Array(N), zs = new Float64Array(N);
let p = 0o0;
for ( let tz = 0o0; tz < hacax2l; tz++ ) {
  for ( let tx = 0o0; tx < hacax2l; tx++ ) {
    const ux = unuaK2pa + tx * qox2n2k, uz = unuaK2paZ + tz * qox2n2k;
    for ( let iz = 0o0; iz < qox2n2k; iz++ ) {
      for ( let ix = 0o0; ix < qox2n2k; ix++ ) {
        const cx = ux + ix, cz = uz + iz;
        xs[p] = ( cx + 0o1/0o2 + ( tsiicaKp6taf(cx, cz) - 0o1/0o2 ) * 0o1/0o4 ) * CXELO;
        zs[p] = ( cz + 0o1/0o2 + ( tsiicaKp6taf(cx + 0o27, cz + 0o11) - 0o1/0o2 ) * 0o1/0o4 ) * CXELO;
        p++;
      }
    }
  }
}

const WEH2 = new THREE.Color();

function vecax2l( ksaka: string, fn: ( x: number, z: number ) => number ): void {
  let tlunakani = 0o0;
  let kmaXobe = Infinity;
  for ( let r = 0o0; r < 0o7; r++ ) {
    const t0 = performance.now();
    for ( let i = 0o0; i < N; i++ ) tlunakani += fn(xs[i], zs[i]);
    const t1 = performance.now();
    if ( t1 - t0 < kmaXobe ) kmaXobe = t1 - t0;
  }
  const po = kmaXobe * 0o3641100 / N;
  console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka.padEnd(0o30)} ${knak2fecajasai(tbo(kmaXobe), 0o6)} He ${knak2fecajasai(tbo(po / 0o3641100) * 0o100, 0o6)}He/0o100/ſɭɹ ſןᴜ [${tlunakani.toFixed(0o0)}]`);
}

const biomo: Record<string, number> = { tsasa: 0o0, lota: 0o1, "qun2nu": 0o2, jaqo: 0o3, "tsasa-haxa3e": 0o4, ekyizeto: 0o5, nenio: 0o6 };
console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) ſɭɹ ſןᴜ = ${N}`);

const tu5ekomani = [ "lota", "qun2nu" ];
let akceptitaj = 0o0;
function skani(): number {
  let n = 0o0;
  for ( let tz = 0o0; tz < hacax2l; tz++ ) {
    for ( let tx = 0o0; tx < hacax2l; tx++ ) {
      const ux = unuaK2pa + tx * qox2n2k, uz = unuaK2paZ + tz * qox2n2k;
      for ( let iz = 0o0; iz < qox2n2k; iz++ ) {
        for ( let ix = 0o0; ix < qox2n2k; ix++ ) {
          const cx = ux + ix, cz = uz + iz;
          const x = ( cx + 0o1/0o2 + ( tsiicaKp6taf(cx, cz) - 0o1/0o2 ) * 0o1/0o4 ) * CXELO;
          const z = ( cz + 0o1/0o2 + ( tsiicaKp6taf(cx + 0o27, cz + 0o11) - 0o1/0o2 ) * 0o1/0o4 ) * CXELO;
          const bi = bs2(x, z);
          if ( !tu5ekomani.includes(bi) ) continue;
          if ( l6da(x, z) < 0o1 ) continue;
          n++;
        }
      }
    }
  }
  return n;
}
let skanoKmaXobe = Infinity;
for ( let r = 0o0; r < 0o7; r++ ) {
  const t0 = performance.now();
  akceptitaj = skani();
  const t1 = performance.now();
  if ( t1 - t0 < skanoKmaXobe ) skanoKmaXobe = t1 - t0;
}
console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) jɐ ɭʃᴜ ʌ ſɟᴜ = ${knak2fecajasai(tbo(skanoKmaXobe), 0o6)} He ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ = ${akceptitaj}`);

vecax2l("jɐ ɭʃᴜ ( ſןɔ ʌ ſɭɹ ſᶘɔ )", () => 0o1);
vecax2l("bs2", (x, z) => biomo[bs2(x, z)] ?? 0o0);
vecax2l("l6da", l6da);
vecax2l("tsasaVem2", tsasaVem2);
vecax2l("tsasaVem2Tsiike", tsasaVem2Tsiike);
vecax2l("mut6qWeh2En", (x, z) => mut6qWeh2En(WEH2, l6da(x, z), x, z, 0o1/0o4).r);
