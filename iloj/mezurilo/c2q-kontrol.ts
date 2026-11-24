// ≺⧼ ſɟꞇ ʃɔ ſןw ſɭᴜƴ 🌗 ⧽≻
// ⟨ ſɟᴜ ſןᴜ ɭʃэ , }ʃɹƽ , ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ ,
// ꞙɭı , ſɭэ ſɭᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
import * as THREE from "three";
import { vepaqHak6h6n } from "../../eskekoj/medio/hak6h6.js";
import type { VojDifino } from "../../eskekoj/medio/hak6h6/hahunaq.js";
import { kf2DokanQoxan } from "../../eskekoj/medio/qakaj2/haqoxa.js";

const DIORITO = 0xff0000, ANDEZITO = 0x0000ff;
const TOLERO = 0o1 / 0o1000;
let eraroj = 0;

// ⟪ }ʃɹƽ , ſɭᴜ ſןᴜ , 📐 ⟫
const qena = new THREE.Scene();
const diorita = new THREE.MeshStandardMaterial({ color: DIORITO });
const andezita = new THREE.MeshStandardMaterial({ color: ANDEZITO });
const defs: VojDifino[] = [ { pts: [ [ -0o12, 0 ], [ 0, 0 ], [ 0, 0o12 ] ],
  w: 0o7 / 0o4, hateruni: true } ];
vepaqHak6h6n(qena, defs, () => 0, diorita, andezita, []);
qena.updateMatrixWorld(true);

const rc = new THREE.Raycaster();
// ⟨ ſɭɹ ſןᴜ , ſɭᴜ ſןᴜ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı ,
// ꞙɭı , ⟅ ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ſןᴜ ᶘɹ , ꞙɭı , 📃 ⟩
function materialoCxe( x: number, z: number ): string {
  rc.set(new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0, -1, 0));
  const h = rc.intersectObjects(qena.children, true);
  if ( !h.length ) return "ſןɔ";
  const teru = h[ 0 ].point.y;
  const samvem2j = h.filter(t => Math.abs(t.point.y - teru) < TOLERO);
  const ksaka = samvem2j.map(t => {
    const weh2 = ( t.object as THREE.Mesh ).material;
    const hex = Array.isArray(weh2) ? 0 : ( weh2 as THREE.MeshStandardMaterial ).color.getHex();
    if ( hex === DIORITO ) return "ʃэ ſɭᴜ ɔ";
    if ( hex === ANDEZITO ) return "ʃэ ſɭᴜ ı";
    return `ʃэ ſɭᴜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ${hex.toString(16)}`;
  });
  if ( ksaka.includes("ʃэ ſɭᴜ ɔ") ) return "ʃэ ſɭᴜ ɔ";
  return ksaka[ 0 ] ?? "ſןɔ";
}

const provoj: [ number, number, string ][] = [
  [ -0o1, 0, "ʃэ ſɭᴜ ɔ" ],
  [ -0o1 / 0o2, 0, "ʃэ ſɭᴜ ɔ" ],
  [ -0o2, 0, "ʃэ ſɭᴜ ɔ" ],
  [ 0, 0o1, "ʃэ ſɭᴜ ɔ" ],
  [ 0, 0o2, "ʃэ ſɭᴜ ɔ" ],
  [ -0o1, 0o6 / 0o5, "ʃэ ſɭᴜ ı" ],
  [ 0o6 / 0o5, 0, "ʃэ ſɭᴜ ı" ],
  [ 0o1 / 0o2, -0o1 / 0o2, "ʃэ ſɭᴜ ɔ" ],
  [ 0o1, -0o1, "ʃэ ſɭᴜ ı" ],
];
for ( const [ x, z, atendita ] of provoj ) {
  const ricevita = materialoCxe(x, z);
  if ( ricevita !== atendita ) {
    eraroj++;
    console.log(`⚠ @${x.toFixed(2)},${z.toFixed(2)} ${ricevita} ｡ ſɭэ ᶗ‹ ${atendita}`);
  }
}
const senUv = qena.children.filter(o =>
  o instanceof THREE.Mesh && !o.geometry.getAttribute("uv")).length;
if ( senUv > 0 ) eraroj += senUv;
console.log(`ſɟɹƽ ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${eraroj} ｡ ſןɔ ʌ uv ${senUv} ｡ Mesh ${qena.children.length}`);

// ⟪ ſɭᴜ ſןᴜ , ſȷƽᴜ ʃɔ , 📐 ⟫
// ⟨ ſȷƽᴜ ʃɔ , }ʃɹƽ , ꞙɭɿ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɟᴜ ſןᴜ ɭʃэ , ſɭɹ ſןᴜ , ꞙɭı , 📃 ⟩
const dockaW = 0o16 / 0o10, dockaL = 0o10;
const duonW = dockaW / 0o2, duonL = dockaL / 0o2;
const n2k = kf2DokanQoxan(dockaW, dockaL).getPoints();
let plejY = -Infinity, plejX = 0, arkaj = 0;
for ( const p of n2k ) {
  if ( p.y > plejY ) { plejY = p.y; plejX = p.x; }
  if ( p.y > duonL - duonW + TOLERO ) arkaj++;
}
const pinta = Math.abs(plejY - duonL) < TOLERO && Math.abs(plejX) < TOLERO;
const c2q = arkaj >= 0o10 && Math.abs(n2k[ 0 ].x + duonW) < TOLERO;
if ( !pinta || !c2q ) eraroj++;
console.log(`ſ̀ȷᴜ ſɭᴜƽ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ }ʃɹƽ ʌ ſȷƽᴜ ʃɔ ${arkaj} ｡ ſ̀ȷᴜ ſɭᴜƽ @${plejX.toFixed(2)},${plejY.toFixed(2)}` +
  ` ｡ ſɭᴜ ʌ ſȷƽᴜ ʃɔ ſɭɹ ſᶘɔ ${pinta && c2q ? "j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" : "ſןɔ"}`);
console.log(eraroj === 0 ? "ſɟɹƽ ʌ ſȷƽᴜ ʃɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" : `ſɟɹƽ ʌ ſȷƽᴜ ʃɔ ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${eraroj}`);
