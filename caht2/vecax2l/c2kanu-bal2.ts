// ≺⧼ ſɟɹ ſɭᴜ }ʃw ʌ ʃᴜ j͐ʃɹ 📃 ⧽≻

import "./ceh2kap2.mjs";
import * as THREE from "three";
import { vepaqHak6h6n } from "../../skek2/qatsiike/hak6h6.js";
import type { Kas2kantaDitlakak } from "../../skek2/qatsiike/hak6h6/hahunaq.js";
import { kas2kantaHasoza } from "../../skek2/qatsiike/hak6h6/hahunaq.js";
import { kf2NivelanS2qena } from "../../skek2/qatsiike/hak6h6/havem2.js";
import { STUPARISERO, K6H6ATRUAP2SOMANI } from "../../skek2/qatsiike/hak6h6/havecax2l.js";

let hatlohk2nik2p2 = 0o0;
const t6g6 = new THREE.MeshStandardMaterial({ color: 0xf80000 });
const t6hna = new THREE.MeshStandardMaterial({ color: 0x0000f8 });

{
  kas2kantaHasoza.length = 0o0;
  const qena = new THREE.Scene();
  const defs: Kas2kantaDitlakak[] = [
    { pts: [ [ 0o0, 0o0 ], [ 0o20, 0o0 ] ], w: 0o7 / 0o4, hateruni: true,
      xaha: true, heightFn: () => 0o0 },
    { pts: [ [ 0o0, 0o0 ], [ 0o0, 0o10 ] ], w: 0o7 / 0o4, hateruni: true },
  ];
  vepaqHak6h6n(qena, defs, () => 0o3, t6g6, t6hna, [ [ 0o0, 0o0 ] ]);
  const apud = kas2kantaHasoza.filter(s => Math.abs(s.x1) < K6H6ATRUAP2SOMANI + 0o1
    && Math.abs(s.z1) < 0o1 / 0o2 && Math.abs(s.x2) < K6H6ATRUAP2SOMANI + 0o1);
  const meza = kas2kantaHasoza.filter(s => s.x1 > 0o10 && s.x1 < 0o14 && Math.abs(s.z1) < 0o1 / 0o2);
  const yApud = apud.length ? Math.max(...apud.map(s => s.y0)) : NaN;
  const yMeza = meza.length ? Math.max(...meza.map(s => s.y0)) : NaN;
  const xobe = Number.isFinite(yApud) && Number.isFinite(yMeza)
    && yApud > 0o2 && yMeza < 0o1 && yApud - yMeza > 0o1;
  if ( !xobe ) hatlohk2nik2p2++;
  console.log(`ſ̀ȷᴜ ſɭᴜƽ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ｡ ſᶘɹ ſɭɔ ʌ ſןᴜ ſᶘɹ ${yApud.toFixed(0o2)} ｡ j͑ʃɜ j͑ʃƨɹ ${yMeza.toFixed(0o2)}` +
    ` ｡ ֭ſɭᴜ ſ͔ɭᴜ ${xobe ? "j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" : "ſןɔ"}`);
}

{
  kas2kantaHasoza.length = 0o0;
  const qena = new THREE.Scene();
  const defs: Kas2kantaDitlakak[] = [ { pts: [ [ -0o10, 0o0 ], [ 0o0, 0o0 ], [ 0o0, 0o10 ] ],
    w: 0o7 / 0o4, hateruni: true, xaha: true,
    heightFn: () => 0o2, mut6qFn: () => -0o5 } ];
  vepaqHak6h6n(qena, defs, () => -0o5, t6g6, t6hna, [],
    { tsasaFn: () => 0o0, mut6qFn: () => -0o5 });
  qena.updateMatrixWorld(true);
  const rc = new THREE.Raycaster();
  let plosteq = 0o0;
  for ( const [ x, z ] of [ [ 0o1, -0o1 ], [ 0o3 / 0o4, -0o3 / 0o4 ],
    [ 0o6 / 0o5, -0o1 / 0o2 ] ] as [ number, number ][] ) {
    rc.set(new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0o0, -0o1, 0o0));
    const h = rc.intersectObjects(qena.children, true);
    if ( h.length > plosteq ) plosteq = h.length;
  }
  const xobe = plosteq >= 0o2;
  if ( !xobe ) hatlohk2nik2p2++;
  console.log(`ſɭᴜ j͑ʃƨɔ ɭl̀ᴜ ʌ ſᶘᴜ j͑ʃᴜ ｡ j͑ʃɜ ſɭ,ᴜ ɭl̀ᴜ ſןᴜ }ʃᴜ ɔı ${plosteq} ｡ ſןw ſɭᶗ‹ɔ ʌ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ${xobe ? "j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" : "ſןɔ"}`);
}

{
  const pts: [ number, number ][] = [ [ -0o10, 0o0 ], [ 0o0, 0o0 ], [ 0o0, 0o10 ] ];
  const p2somani = 0o7 / 0o4 + 0o3 / 0o5;
  const s2qena = kf2NivelanS2qena(pts, p2somani,
    ( x, z ) => 0o1 / 0o2 * ( x + z + 0o10 ), undefined);
  const iix = p2somani + STUPARISERO;
  const turnoS = 0o10;
  const enIix = s2qena.hal6da.filter(( a, i ) =>
    Math.abs(s2qena.haxekuxa[ i ] - turnoS) <= iix);
  const varias = enIix.length > 0o0 && Math.max(...enIix) - Math.min(...enIix) > 0o1 / 0o1000;
  if ( varias ) hatlohk2nik2p2++;
  console.log(`ſɭᴜ j͑ʃƨɔ ｡ ſᶘᴜ j͐ʃɔ ſᶘᴜ ʌ j͑ʃᴜ ʌ j͑ʃɜ j͑ʃᴜ ${enIix.length} ｡ j͑ʃ'ɔ ŋᷠɹ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${varias ? "j͑ʃw ſןͷ̗ɔͷ̗ ꞁȷ̀ᴜꞇ" : "ſןɔ"}`);
}

console.log(hatlohk2nik2p2 === 0o0 ? "ſɟɹƽ ꞁȷ̀ᴜ }ʃw ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" : `ſɟɹƽ ꞁȷ̀ᴜ }ʃw ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${hatlohk2nik2p2}`);
