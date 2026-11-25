// ≺⧼ ſɭэ ֭ſɭэ ʌ ſןᴜ ſᶘɹ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſȷͷ̗ᴜƽ ꞁȷ̀ᴜꞇ ⚓ 🔬 ⧽≻
// ⟨ ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ſɭэ ſɭᴜ , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ ,
// ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭɿ , ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı , 📃 ⟩
//
// ſɭэ ɭʃᴜ , ⟅
//   node hacaht2/vecax2l/vepaqu.mjs qakaj2-joqa
//   node --import ./caht2/vecax2l/ceh2kap2.mjs hacaht2/vecax2l/qakaj2-joqa.mjs
import * as THREE from "three";
import { tikHaqakaj2 } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { l6da, tsasaVem2 } from "../../kanta/nala/t6limaSoza.js";
import { vepaqQakaj2n } from "../../skek2/qatsiike/qakaj2.js";
import { kf2Qakaj2nStuparon } from "../../skek2/qatsiike/qakaj2/hatona.js";
import { vepaqHak6h6n } from "../../skek2/qatsiike/hak6h6.js";
import { vepaqIntersekcajnHapa12n } from "../../skek2/qatsiike/hak6h6/hapa12.js";
import { qakaj2L6daJe, tamc2kHavem2 } from "../../skek2/qatsiike/hak6h6/veb6kek-havem2.js";
import { STUPARISERO, K6H6ATRUAP2SOMANI } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { kf2Vecax2lanNala } from "./x2x2q.js";
import type { Kas2kantaDitlakak } from "../../skek2/qatsiike/hak6h6/hahunaq.js";

const nala = kf2Vecax2lanNala(false);
const HAQAKAJ2 = tikHaqakaj2();
const qena = new THREE.Scene();
const t6g6 = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const t6hna = new THREE.MeshStandardMaterial({ color: 0x999999 });

const dokHatoxemani = HAQAKAJ2.map(D => vepaqQakaj2n(qena, D.x, D.z, D.s2sabo ?? 0,
  nala.k6h6L6da, tsasaVem2, D.jufu, l6da));

const defs: Kas2kantaDitlakak[] = nala.hak6h6.map((v, i) =>
  ( { pts: nala.hascac6[ i ], w: v.sefini / 2, hateruni: true } as Kas2kantaDitlakak ));
// ⟨ ſɟᴜ ſןᴜ ɭʃэ , ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , 📏 ⟩ , ɭʃэ ſɭɔ , ꞙɭɔ ,
// ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ֭ſɭэ ſɭэ , ꞙɭɿ , ꞙɭɿ , 📃 ⟩
for ( let i = 0; i < HAQAKAJ2.length; i++ ) {
  const D = HAQAKAJ2[ i ], dok = dokHatoxemani[ i ];
  if ( dok.capat6aN2kj.length < 0o2 ) continue;
  const r = D.s2sabo ?? 0;
  const landaX = D.x + Math.sin(r) * ( D.jufu / 2 );
  const landaZ = D.z + Math.cos(r) * ( D.jufu / 2 );
  const starto = qakaj2L6daJe(landaX, landaZ) ?? nala.pa12Je(landaX, landaZ);
  const tlakakani = dok.capat6aN2kj[ 1 ];
  const dx = tlakakani[ 0 ] - landaX, dz = tlakakani[ 1 ] - landaZ;
  const sahakani = Math.hypot(dx, dz);
  const saxeni: [ number, number ] = sahakani > K6H6ATRUAP2SOMANI
    ? [ landaX + dx * K6H6ATRUAP2SOMANI / sahakani, landaZ + dz * K6H6ATRUAP2SOMANI / sahakani ]
    : dok.capat6aN2kj[ 0 ];
  const capat6 = kf2Qakaj2nStuparon(saxeni, tlakakani, starto, dok.landejaY);
  if ( !capat6 ) continue;
  defs.push({ pts: capat6.n2k, w: dok.kozunuSefini, capat6: true,
    heightFn: capat6.l6da, t6limaFn: l6da });
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
  rc.set(new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0, -1, 0));
  const h = rc.intersectObjects(qena.children, true);
  return h.length ? h[0].point.y : null;
};

let tutaMaks = 0;
for ( let i = 0; i < HAQAKAJ2.length; i++ ) {
  const D = HAQAKAJ2[ i ];
  const r = D.s2sabo ?? 0, kos = Math.cos(r), sin = Math.sin(r);
  const wx = ( lx: number, lz: number ) => D.x + kos * lx + sin * lz;
  const wz = ( lx: number, lz: number ) => D.z - sin * lx + kos * lz;
  const landX = wx(0, D.jufu / 2), landZ = wz(0, D.jufu / 2);
  const dok = dokHatoxemani[ i ];
  const ca3aq = landX + "," + landZ;
  const reg = tamc2kHavem2.get(ca3aq);
// ⟨ }ʃɹƽ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
  let plosteq: { k: string; n: typeof reg } = { k: "", n: undefined };
  let dist = Infinity;
  for ( const [ k, n ] of tamc2kHavem2 ) {
    const [ qx, qz ] = k.split(",").map(Number);
    const d = Math.hypot(qx - landX, qz - landZ);
    if ( d < dist ) { dist = d; plosteq = { k, n }; }
  }
  console.log(`\n｡ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${i} @(${D.x.toFixed(1)},${D.z.toFixed(1)}) land=(${landX.toFixed(2)},${landZ.toFixed(2)})`);
  console.log(`  kozunuY=${dok.kozunuY.toFixed(3)} landejaY=${dok.landejaY.toFixed(3)}` +
    ` plate=${plosteq.n?.l6da.toFixed(3) ?? "?"} @${plosteq.k} dist=${dist.toFixed(2)}` +
    ` gap=${( dok.kozunuY - ( plosteq.n?.l6da ?? NaN ) ).toFixed(3)} hole=${K6H6ATRUAP2SOMANI.toFixed(2)}`);
  const x2pa: string[] = [];
  let maks = 0, raqa = 0, ne3ak2 = NaN;
  for ( let lz = D.jufu / 2 + 3; lz >= -D.jufu / 2 - 1; lz -= 0.25 ) {
    const yy = y(wx(0, lz), wz(0, lz));
    if ( yy !== null && Number.isFinite(ne3ak2) && Math.abs(yy - ne3ak2) > maks ) {
      maks = Math.abs(yy - ne3ak2); raqa = lz;
    }
    x2pa.push(`${lz.toFixed(2)}:${yy === null ? "--" : yy.toFixed(2)}`);
    ne3ak2 = yy ?? NaN;
  }
  console.log(`  maxJump=${maks.toFixed(3)} @lz=${raqa.toFixed(2)}`);
  console.log(`  ${x2pa.join(" ")}`);
  if ( maks > tutaMaks ) tutaMaks = maks;
}
console.log(`｡ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ${HAQAKAJ2.length} ｡ j͐ʃэ ɭ(ᴜ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${tutaMaks.toFixed(3)}` +
  ` ｡ ſןͷ̗ɜ j͑ʃƨɔȝ ${STUPARISERO.toFixed(3)}` +
  ( tutaMaks > STUPARISERO + 0o1/0o200 ? "  ſ̀ȷᴜ̩ ſɭɹ }ʃꞇ" : "" ));
