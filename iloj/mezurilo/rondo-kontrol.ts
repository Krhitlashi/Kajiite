// ≺⧼ គែមមូលរួម 🌗 ⧽≻
// ⟨ ពិនិត្យថាជង្គង់កន្លែងបត់មិនបន្សល់អាន់ដេហ្ស៊ីតលើឌីអូរីតកណ្តាល ,
// ថាគ្រប់ផ្ទៃមាន uv , ហើយថាចុងចំណតជាពាក់រង្វង់ពេញដូចចុងផ្លូវ ។
// សម្ភារៈមូលដ្ឋានមានពណ៌ខុសគ្នា ដើម្បីដឹងថាកាំរស្មីប៉ះថ្មណា ។ 📃 ⟩
import * as THREE from "three";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import type { VojDifino } from "../../eskekoj/medio/vojoj/tipoj.js";
import { kreiDokanFormon } from "../../eskekoj/medio/doko/formoj.js";

const DIORITO = 0xff0000, ANDEZITO = 0x0000ff;
const TOLERO = 0o1 / 0o1000;
let eraroj = 0;

// ⟪ ជង្គង់កន្លែងបត់ 📐 ⟫
const sceno = new THREE.Scene();
const diorita = new THREE.MeshStandardMaterial({ color: DIORITO });
const andezita = new THREE.MeshStandardMaterial({ color: ANDEZITO });
const defs: VojDifino[] = [ { pts: [ [ -0o12, 0 ], [ 0, 0 ], [ 0, 0o12 ] ],
  w: 0o7 / 0o4, kapoj: true } ];
konstruiVojojn(sceno, defs, () => 0, diorita, andezita, []);
sceno.updateMatrixWorld(true);

const rc = new THREE.Raycaster();
// ⟨ កាំរស្មី CPU មិនអាន polygonOffset ទេ 📏 ⟩ ៖ ផ្ទៃជាន់គ្នាត្រឡប់តាម
// លំដាប់ត្រីកោណ មិនមែនតាមអ្វីដែល GPU គូរ ។ ដូច្នេះរាយគ្រប់ផ្ទៃដែល
// នៅកម្ពស់ដូចគ្នា ហើយពិនិត្យថាមានឌីអូរីតដែរឬទេ ។ សម្ភារៈឌីអូរីត
// មាន polygonOffset ខ្លាំងជាង ដូច្នេះ GPU គូរវានៅមុខជានិច្ច ។ 📃 ⟩
function materialoCxe( x: number, z: number ): string {
  rc.set(new THREE.Vector3(x, 80, z), new THREE.Vector3(0, -1, 0));
  const h = rc.intersectObjects(sceno.children, true);
  if ( !h.length ) return "គ្មាន";
  const supro = h[ 0 ].point.y;
  const samnivelaj = h.filter(t => Math.abs(t.point.y - supro) < TOLERO);
  const nomoj = samnivelaj.map(t => {
    const koloro = ( t.object as THREE.Mesh ).material;
    const hex = Array.isArray(koloro) ? 0 : ( koloro as THREE.MeshStandardMaterial ).color.getHex();
    if ( hex === DIORITO ) return "ឌីអូរីត";
    if ( hex === ANDEZITO ) return "អាន់ដេហ្ស៊ីត";
    return `ផ្សេង ${hex.toString(16)}`;
  });
  if ( nomoj.includes("ឌីអូរីត") ) return "ឌីអូរីត";
  return nomoj[ 0 ] ?? "គ្មាន";
}

const provoj: [ number, number, string ][] = [
  [ -0o1, 0, "ឌីអូរីត" ],
  [ -0o1 / 0o2, 0, "ឌីអូរីត" ],
  [ -0o2, 0, "ឌីអូរីត" ],
  [ 0, 0o1, "ឌីអូរីត" ],
  [ 0, 0o2, "ឌីអូរីត" ],
  [ -0o1, 0o6 / 0o5, "អាន់ដេហ្ស៊ីត" ],
  [ 0o6 / 0o5, 0, "អាន់ដេហ្ស៊ីត" ],
  [ 0o1 / 0o2, -0o1 / 0o2, "ឌីអូរីត" ],
  [ 0o1, -0o1, "អាន់ដេហ្ស៊ីត" ],
];
for ( const [ x, z, atendita ] of provoj ) {
  const ricevita = materialoCxe(x, z);
  if ( ricevita !== atendita ) {
    eraroj++;
    console.log(`⚠ @${x.toFixed(2)},${z.toFixed(2)} ${ricevita} , រំពឹង ${atendita}`);
  }
}
const senUv = sceno.children.filter(o =>
  o instanceof THREE.Mesh && !o.geometry.getAttribute("uv")).length;
if ( senUv > 0 ) eraroj += senUv;
console.log(`ជង្គង់ ៖ ខុស ${eraroj} , គ្មាន uv ${senUv} , Mesh ${sceno.children.length}`);

// ⟪ ចុងចំណតពាក់រង្វង់ពេញ 📐 ⟫
// ⟨ ពាក់រង្វង់មិនមែនជ្រុងតូចពីរ 📏 ⟩ ៖ ចុងត្រូវមានចំណុចជាច្រើន
// លើធ្នូ ហើយចុងបំផុតស្ថិតលើអ័ក្សកណ្តាល ។ 📃 ⟩
const dockaW = 0o16 / 0o10, dockaL = 0o10;
const duonW = dockaW / 0o2, duonL = dockaL / 0o2;
const punktoj = kreiDokanFormon(dockaW, dockaL).getPoints();
let plejY = -Infinity, plejX = 0, arkaj = 0;
for ( const p of punktoj ) {
  if ( p.y > plejY ) { plejY = p.y; plejX = p.x; }
  if ( p.y > duonL - duonW + TOLERO ) arkaj++;
}
const pinta = Math.abs(plejY - duonL) < TOLERO && Math.abs(plejX) < TOLERO;
const ronda = arkaj >= 0o10 && Math.abs(punktoj[ 0 ].x + duonW) < TOLERO;
if ( !pinta || !ronda ) eraroj++;
console.log(`ចុងចំណត ៖ ចំណុចធ្នូ ${arkaj} , ចុង @${plejX.toFixed(2)},${plejY.toFixed(2)}` +
  ` , ពាក់រង្វង់ពេញ ${pinta && ronda ? "បាទ" : "ទេ"}`);
console.log(eraroj === 0 ? "គែមមូលរួម ល្អ" : `គែមមូលរួម ខុស ${eraroj}`);
