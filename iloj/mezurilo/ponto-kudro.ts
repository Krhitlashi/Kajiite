// ≺⧼ ស្នាមដេកស្ពាន និងកន្លែងបត់ 🌉 ⧽≻
// ⟨ សាកល្បងបីយ៉ាងលើឆាកតូច ៖ ជម្រាលឡើងដល់ចានខ្ពស់នៅចុងស្ពាន ,
// គ្មានរន្ធត្រីកោណក្រោមផ្ទៃនៅកន្លែងបត់លើទឹក , និងគ្មានជំហានក្នុងបត់ ។
// ឆាកតូចរត់លឿន មិនចាំបាច់សាងពិភពលោកពិតទេ ។ 📃 ⟩
import "./falsdomo.mjs";
import * as THREE from "three";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import type { VojDifino } from "../../eskekoj/medio/vojoj/tipoj.js";
import { vojSuprajxoj } from "../../eskekoj/medio/vojoj/tipoj.js";
import { kreiNivelanProfilon } from "../../eskekoj/medio/vojoj/niveloj.js";
import { STUPA_RISERO, VOJA_TRUA_DUONO } from "../../eskekoj/medio/vojoj/mezuroj.js";

let eraroj = 0;
const diorito = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const andezito = new THREE.MeshStandardMaterial({ color: 0x0000ff });

// ⟪ ទី ១ ៖ ចុងស្ពានឡើងដល់ចានខ្ពស់ 📏 ⟫
// ⟨ ចានខ្ពស់ ៣ , ផ្ទៃស្ពានធម្មជាតិ ០ ។ ជម្រាលត្រូវលើកផ្លូវឡើង ,
// មិនមែនទុកជញ្ជាំងឈរទេ ។ 📃 ⟩
{
  vojSuprajxoj.length = 0;
  const sceno = new THREE.Scene();
  const defs: VojDifino[] = [
    { pts: [ [ 0, 0 ], [ 0o20, 0 ] ], w: 0o7 / 0o4, kapoj: true,
      glata: true, heightFn: () => 0 },
    { pts: [ [ 0, 0 ], [ 0, 0o10 ] ], w: 0o7 / 0o4, kapoj: true },
  ];
  konstruiVojojn(sceno, defs, () => 0o3, diorito, andezito, [ [ 0, 0 ] ]);
  const apud = vojSuprajxoj.filter(s => Math.abs(s.x1) < VOJA_TRUA_DUONO + 0o1
    && Math.abs(s.z1) < 0o1 / 0o2 && Math.abs(s.x2) < VOJA_TRUA_DUONO + 0o1);
  const meza = vojSuprajxoj.filter(s => s.x1 > 0o10 && s.x1 < 0o14 && Math.abs(s.z1) < 0o1 / 0o2);
  const yApud = apud.length ? Math.max(...apud.map(s => s.y0)) : NaN;
  const yMeza = meza.length ? Math.max(...meza.map(s => s.y0)) : NaN;
  const bona = Number.isFinite(yApud) && Number.isFinite(yMeza)
    && yApud > 0o2 && yMeza < 0o1 && yApud - yMeza > 0o1;
  if ( !bona ) eraroj++;
  console.log(`ចុងស្ពាន ៖ ជិតចាន ${yApud.toFixed(2)} , កណ្តាល ${yMeza.toFixed(2)}` +
    ` , ជម្រាល ${bona ? "ល្អ" : "ខ្វះ"}`);
}

// ⟪ ទី ២ ៖ គ្មានរន្ធក្រោមបត់លើទឹក 📏 ⟫
// ⟨ ទឹកគ្រប់ទី ៖ fundaFn ត្រឡប់ Infinity ហើយជង្គង់ស្តើង ។
// កាំរស្មីចុះពីលើត្រូវប៉ះទាំងផ្ទៃ និងស្រទាប់បិទរន្ធ ។ 📃 ⟩
{
  vojSuprajxoj.length = 0;
  const sceno = new THREE.Scene();
  const defs: VojDifino[] = [ { pts: [ [ -0o10, 0 ], [ 0, 0 ], [ 0, 0o10 ] ],
    w: 0o7 / 0o4, kapoj: true, glata: true,
    heightFn: () => 0o2, grundoFn: () => -0o5 } ];
  konstruiVojojn(sceno, defs, () => -0o5, diorito, andezito, [],
    { akvaFn: () => 0, grundoFn: () => -0o5 });
  sceno.updateMatrixWorld(true);
  const rc = new THREE.Raycaster();
  let plej = 0;
  for ( const [ x, z ] of [ [ 0o1, -0o1 ], [ 0o3 / 0o4, -0o3 / 0o4 ],
    [ 0o6 / 0o5, -0o1 / 0o2 ] ] as [ number, number ][] ) {
    rc.set(new THREE.Vector3(x, 80, z), new THREE.Vector3(0, -1, 0));
    const h = rc.intersectObjects(sceno.children, true);
    if ( h.length > plej ) plej = h.length;
  }
  const bona = plej >= 0o2;
  if ( !bona ) eraroj++;
  console.log(`បត់លើទឹក ៖ ផ្ទៃជាន់គ្នាច្រើនបំផុត ${plej} , បិទរន្ធ ${bona ? "ល្អ" : "ខ្វះ"}`);
}

// ⟪ ទី ៣ ៖ គ្មានជំហានក្នុងបត់ 📏 ⟫
// ⟨ ដីឡើងជាជម្រាល ហើយផ្លូវបត់ ៩០ ដឺក្រេ ។ គ្រប់គំរូក្នុងរង្វង់
// បត់ត្រូវមានកម្រិតដូចគ្នា ។ 📃 ⟩
{
  const pts: [ number, number ][] = [ [ -0o10, 0 ], [ 0, 0 ], [ 0, 0o10 ] ];
  const duono = 0o7 / 0o4 + 0o3 / 0o5;
  const profilo = kreiNivelanProfilon(pts, duono,
    ( x, z ) => 0o1 / 0o2 * ( x + z + 0o10 ), undefined);
  const zono = duono + STUPA_RISERO;
  const turnoS = 0o10;
  const enZono = profilo.altoj.filter(( _a, i ) =>
    Math.abs(profilo.situoj[ i ] - turnoS) <= zono);
  const varias = enZono.length > 0 && Math.max(...enZono) - Math.min(...enZono) > 0o1 / 0o1000;
  if ( varias ) eraroj++;
  console.log(`បត់ ៖ គំរូក្នុងរង្វង់ ${enZono.length} , ខុសកម្រិត ${varias ? "មាន" : "គ្មាន"}`);
}

console.log(eraroj === 0 ? "ស្នាមដេកស្ពាន ល្អ" : `ស្នាមដេកស្ពាន ខុស ${eraroj}`);
