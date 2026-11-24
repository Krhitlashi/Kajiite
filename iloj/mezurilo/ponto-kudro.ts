// ≺⧼ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ʌ ſȷͷ̗ᴜƽ ꞁȷ̀ᴜꞇ 🌉 ⧽≻
// ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭц , ⟅ ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ſᶘᴜ j͑ʃᴜ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭэ ſɭᴜ , ſןɔ˞ᴜƴ , ꞙɭɔ , 📃 ⟩
import "./falsdomo.mjs";
import * as THREE from "three";
import { vepaqHak6h6n } from "../../eskekoj/medio/hak6h6.js";
import type { VojDifino } from "../../eskekoj/medio/hak6h6/hahunaq.js";
import { vojSuprajxoj } from "../../eskekoj/medio/hak6h6/hahunaq.js";
import { kf2NivelanProfilon } from "../../eskekoj/medio/hak6h6/havem2.js";
import { STUPA_RISERO, VOJA_TRUA_DUONO } from "../../eskekoj/medio/hak6h6/havecax2l.js";

let eraroj = 0;
const t6g6 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const t6hna = new THREE.MeshStandardMaterial({ color: 0x0000ff });

// ⟪ ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭı , 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭц , ſɭᴜ ſןᴜ , ꞙɭɔ ,
// ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
{
  vojSuprajxoj.length = 0;
  const qena = new THREE.Scene();
  const defs: VojDifino[] = [
    { pts: [ [ 0, 0 ], [ 0o20, 0 ] ], w: 0o7 / 0o4, hateruni: true,
      glata: true, heightFn: () => 0 },
    { pts: [ [ 0, 0 ], [ 0, 0o10 ] ], w: 0o7 / 0o4, hateruni: true },
  ];
  vepaqHak6h6n(qena, defs, () => 0o3, t6g6, t6hna, [ [ 0, 0 ] ]);
  const apud = vojSuprajxoj.filter(s => Math.abs(s.x1) < VOJA_TRUA_DUONO + 0o1
    && Math.abs(s.z1) < 0o1 / 0o2 && Math.abs(s.x2) < VOJA_TRUA_DUONO + 0o1);
  const meza = vojSuprajxoj.filter(s => s.x1 > 0o10 && s.x1 < 0o14 && Math.abs(s.z1) < 0o1 / 0o2);
  const yApud = apud.length ? Math.max(...apud.map(s => s.y0)) : NaN;
  const yMeza = meza.length ? Math.max(...meza.map(s => s.y0)) : NaN;
  const bona = Number.isFinite(yApud) && Number.isFinite(yMeza)
    && yApud > 0o2 && yMeza < 0o1 && yApud - yMeza > 0o1;
  if ( !bona ) eraroj++;
  console.log(`ſ̀ȷᴜ ſɭᴜƽ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ｡ ſᶘɹ ſɭɔ ʌ ſןᴜ ſᶘɹ ${yApud.toFixed(2)} ｡ j͑ʃɜ j͑ʃƨɹ ${yMeza.toFixed(2)}` +
    ` ｡ ֭ſɭᴜ ſ͔ɭᴜ ${bona ? "j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" : "ſןɔ"}`);
}

// ⟪ ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ , ſᶘᴜ j͑ʃᴜ , 📏 ⟫
// ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ ,
//   }ʃɹƽ , ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
{
  vojSuprajxoj.length = 0;
  const qena = new THREE.Scene();
  const defs: VojDifino[] = [ { pts: [ [ -0o10, 0 ], [ 0, 0 ], [ 0, 0o10 ] ],
    w: 0o7 / 0o4, hateruni: true, glata: true,
    heightFn: () => 0o2, grundoFn: () => -0o5 } ];
  vepaqHak6h6n(qena, defs, () => -0o5, t6g6, t6hna, [],
    { akvaFn: () => 0, grundoFn: () => -0o5 });
  qena.updateMatrixWorld(true);
  const rc = new THREE.Raycaster();
  let plej = 0;
  for ( const [ x, z ] of [ [ 0o1, -0o1 ], [ 0o3 / 0o4, -0o3 / 0o4 ],
    [ 0o6 / 0o5, -0o1 / 0o2 ] ] as [ number, number ][] ) {
    rc.set(new THREE.Vector3(x, 0o120, z), new THREE.Vector3(0, -1, 0));
    const h = rc.intersectObjects(qena.children, true);
    if ( h.length > plej ) plej = h.length;
  }
  const bona = plej >= 0o2;
  if ( !bona ) eraroj++;
  console.log(`ſɭᴜ j͑ʃƨɔ ɭl̀ᴜ ʌ ſᶘᴜ j͑ʃᴜ ｡ j͑ʃɜ ſɭ,ᴜ ɭl̀ᴜ ſןᴜ }ʃᴜ ɔı ${plej} ｡ ſןw ſɭᶗ‹ɔ ʌ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ${bona ? "j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" : "ſןɔ"}`);
}

// ⟪ ꞙɭц , ⟅ ſןɔ˞ᴜƴ , }ʃɹƽ , 📏 ⟫
// ⟨ ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ , }ʃɹƽ ,
//   ſןᶗ‹ɔⅎ ᶘɜ , j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
{
  const pts: [ number, number ][] = [ [ -0o10, 0 ], [ 0, 0 ], [ 0, 0o10 ] ];
  const p2somani = 0o7 / 0o4 + 0o3 / 0o5;
  const s2qena = kf2NivelanProfilon(pts, p2somani,
    ( x, z ) => 0o1 / 0o2 * ( x + z + 0o10 ), undefined);
  const zono = p2somani + STUPA_RISERO;
  const turnoS = 0o10;
  const enZono = s2qena.hal6da.filter(( _a, i ) =>
    Math.abs(s2qena.haxekuxa[ i ] - turnoS) <= zono);
  const varias = enZono.length > 0 && Math.max(...enZono) - Math.min(...enZono) > 0o1 / 0o1000;
  if ( varias ) eraroj++;
  console.log(`ſɭᴜ j͑ʃƨɔ ｡ ſᶘᴜ j͐ʃɔ ſᶘᴜ ʌ j͑ʃᴜ ʌ j͑ʃɜ j͑ʃᴜ ${enZono.length} ｡ j͑ʃ'ɔ ŋᷠɹ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${varias ? "j͑ʃw ſןͷ̗ɔͷ̗ ꞁȷ̀ᴜꞇ" : "ſןɔ"}`);
}

console.log(eraroj === 0 ? "ſɟɹƽ ꞁȷ̀ᴜ }ʃw ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" : `ſɟɹƽ ꞁȷ̀ᴜ }ʃw ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${eraroj}`);
