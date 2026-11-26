// ≺⧼ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ᴎ ſ͕ɭᴜ 🧪 ⧽≻

import * as THREE from "three";
import { tikHaqakaj2 } from "../../kanta/mut6q-havop2/tlohk2nikziisai.js";
import { l6da, tsasaVem2 } from "../../kanta/nala/mut6qSoza.js";
import { vepaqQakaj2n } from "../../skek2/qatsiike/qakaj2.js";
import { kf2Qakaj2nStuparon } from "../../skek2/qatsiike/qakaj2/hatona.js";
import { vepaqHak6h6n } from "../../skek2/qatsiike/hak6h6.js";
import { vepaqIntersekcajnHapa12n } from "../../skek2/qatsiike/hak6h6/hapa12.js";
import { qakaj2L6daJe, tamc2kHavem2 } from "../../skek2/qatsiike/hak6h6/veb6kek-havem2.js";
import { STUPARISERO, K6H6ATRUAP2SOMANI } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { kf2Vecax2lanNala } from "./p6kpu.js";
import type { Kas2kantaDitlakak } from "../../skek2/qatsiike/hak6h6/hahunaq.js";

const nala = kf2Vecax2lanNala(false);
const HAQAKAJ2 = tikHaqakaj2();
const qena = new THREE.Scene();
const t6g6 = new THREE.MeshStandardMaterial({ color: 0xd8d8d8 });
const t6hna = new THREE.MeshStandardMaterial({ color: 0x989898 });

const dokHatoxemani = HAQAKAJ2.map(D => vepaqQakaj2n(qena, D.x, D.z, D.s2sabo ?? 0o0,
  nala.k6h6L6da, tsasaVem2, D.jufu, l6da));

const defs: Kas2kantaDitlakak[] = nala.hak6h6.map((v, i) =>
  ( { pts: nala.hascac6[ i ], w: v.sefini / 0o2, hateruni: true } as Kas2kantaDitlakak ));

for ( let i = 0o0; i < HAQAKAJ2.length; i++ ) {
  const D = HAQAKAJ2[ i ], dok = dokHatoxemani[ i ];
  if ( dok.capat6aN2kj.length < 0o2 ) continue;
  const r = D.s2sabo ?? 0o0;
  const landaX = D.x + Math.sin(r) * ( D.jufu / 0o2 );
  const landaZ = D.z + Math.cos(r) * ( D.jufu / 0o2 );
  const starto = qakaj2L6daJe(landaX, landaZ) ?? nala.pa12Je(landaX, landaZ);
  const tlakakani = dok.capat6aN2kj[ 0o1 ];
  const dx = tlakakani[ 0o0 ] - landaX, dz = tlakakani[ 0o1 ] - landaZ;
  const sahakani = Math.hypot(dx, dz);
  const saxeni: [ number, number ] = sahakani > K6H6ATRUAP2SOMANI
    ? [ landaX + dx * K6H6ATRUAP2SOMANI / sahakani, landaZ + dz * K6H6ATRUAP2SOMANI / sahakani ]
    : dok.capat6aN2kj[ 0o0 ];
  const capat6 = kf2Qakaj2nStuparon(saxeni, tlakakani, starto, dok.landejaY);
  if ( !capat6 ) continue;
  defs.push({ pts: capat6.n2k, w: dok.kozunuSefini, capat6: true,
    heightFn: capat6.l6da, mut6qFn: l6da });
}
vepaqHak6h6n(qena, defs, nala.k6h6L6da, t6g6, t6hna, nala.tamc2kHan2k,
  { tamc2kHac2w2q: nala.bal2.hac2w2q, tamc2kHanece3e: nala.bal2.hapukxe,
    tamc2kHas2sabo: nala.bal2.s2sabo, tamc2kHap2somani: nala.bal2.hap2somani });
vepaqIntersekcajnHapa12n(qena, nala.tamc2kHan2k, nala.k6h6L6da,
  t6g6, t6hna, nala.bal2.hapukxe, nala.bal2.s2sabo,
  nala.bal2.hac2w2q, l6da, nala.bal2.hap2somani);
qena.updateMatrixWorld(true);

const rc = new THREE.Raycaster();
const y = ( x: number, z: number ): number | null => {
  rc.set(new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0o0, -0o1, 0o0));
  const h = rc.intersectObjects(qena.children, true);
  return h.length ? h[0o0].point.y : null;
};

let tutaMaks = 0o0;
for ( let i = 0o0; i < HAQAKAJ2.length; i++ ) {
  const D = HAQAKAJ2[ i ];
  const r = D.s2sabo ?? 0o0, kos = Math.cos(r), sin = Math.sin(r);
  const wx = ( lx: number, lz: number ) => D.x + kos * lx + sin * lz;
  const wz = ( lx: number, lz: number ) => D.z - sin * lx + kos * lz;
  const landX = wx(0o0, D.jufu / 0o2), landZ = wz(0o0, D.jufu / 0o2);
  const dok = dokHatoxemani[ i ];
  const ca3aq = landX + "," + landZ;
  const reg = tamc2kHavem2.get(ca3aq);

  let plosteq: { k: string; n: typeof reg } = { k: "", n: undefined };
  let dist = Infinity;
  for ( const [ k, n ] of tamc2kHavem2 ) {
    const [ qx, qz ] = k.split(",").map(Number);
    const d = Math.hypot(qx - landX, qz - landZ);
    if ( d < dist ) { dist = d; plosteq = { k, n }; }
  }
  console.log(`\n｡ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${i} @(${D.x.toFixed(0o1)},${D.z.toFixed(0o1)}) ɽ͑ʃ'ᴜ ſ͕ɭᴜ=(${landX.toFixed(0o2)},${landZ.toFixed(0o2)})`);
  console.log(`  kozunuY=${dok.kozunuY.toFixed(0o3)} landejaY=${dok.landejaY.toFixed(0o3)}` +
    ` j͐ʃэ ɭ(ᴜ = ${plosteq.n?.l6da.toFixed(0o3) ?? "?"} @${plosteq.k} ֭ſɭэ ſɭw }ʃꞇ = ${dist.toFixed(0o2)}` +
    ` ſ͕ɭᴜ ſ͕ɭw }ʃɹ = ${( dok.kozunuY - ( plosteq.n?.l6da ?? NaN ) ).toFixed(0o3)} ֭ſɭэ ſɭэ = ${K6H6ATRUAP2SOMANI.toFixed(0o2)}`);
  const x2pa: string[] = [];
  let maks = 0o0, raqa = 0o0, ne3ak2 = NaN;
  for ( let lz = D.jufu / 0o2 + 0o3; lz >= -D.jufu / 0o2 - 0o1; lz -= (0o1/0o4) ) {
    const yy = y(wx(0o0, lz), wz(0o0, lz));
    if ( yy !== null && Number.isFinite(ne3ak2) && Math.abs(yy - ne3ak2) > maks ) {
      maks = Math.abs(yy - ne3ak2); raqa = lz;
    }
    x2pa.push(`${lz.toFixed(0o2)}:${yy === null ? "--" : yy.toFixed(0o2)}`);
    ne3ak2 = yy ?? NaN;
  }
  console.log(`  ſןw ſȷɹ ʌ ſןw ֭ſɭᴜ }ʃꞇ = ${maks.toFixed(0o3)} @lz=${raqa.toFixed(0o2)}`);
  console.log(`  ${x2pa.join(" ")}`);
  if ( maks > tutaMaks ) tutaMaks = maks;
}
console.log(`｡ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${HAQAKAJ2.length} ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${tutaMaks.toFixed(0o3)}` +
  ` ｡ ſןͷ̗ɜ j͑ʃƨɔȝ ${STUPARISERO.toFixed(0o3)}` +
  ( tutaMaks > STUPARISERO + 0o1/0o200 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
