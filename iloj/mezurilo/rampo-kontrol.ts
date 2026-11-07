// ≺⧼ ទំហំជម្រាលផ្លូវ 📏 ⧽≻
// ⟨ សាងសង់ពិភពលោកពិត ហើយវាស់មុខជំហានគ្រប់ប្រអប់ផ្លូវ ។ មុខជំហានទាំងអស់
// ត្រូវមានច្រាំងដូចគ្នា និងប្រវែងសមាមាត្រនឹងកម្ពស់ធ្លាក់ ។ បើមុខណាមួយ
// ត្រូវបង្ហាប់ឱ្យខ្លីជាង rampaKuro , វាឈរដូចជញ្ជាំង ។ 📃 ⟩
import "./falsdomo.mjs";
import * as THREE from "three";
import { konstruiUrbon } from "../../kantaoj/mondo/urbo.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon,
  kreiFenestranMaterialon, kreiOranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { vojSuprajxoj } from "../../eskekoj/medio/vojoj/tipoj.js";
import { rampaKuro, STUPA_RAMPO_KURO, VOJA_STUPA_RAMPO } from "../../eskekoj/medio/vojoj/mezuroj.js";

// ⟪ ច្រាំងអនុញ្ញាត 📏 ⟫
// ⟨ ជម្រាល ១ គឺ ៤៥ ដឺក្រេ ។ លើសតែបន្តិចទុកឱ្យគំរូផ្លូវដែលជាប់គ្នា ។ 📃 ⟩
const DEKLIVO_LIMO = 0o1 / VOJA_STUPA_RAMPO + 0o1 / 0o20;
const KURO_TOLERO = 0o1 / 0o40;

const sceno = new THREE.Scene();
const teksturo = new THREE.Texture();
vojSuprajxoj.length = 0;
await konstruiUrbon(sceno,
  kreiDioritanMaterialon(teksturo), kreiAndezitanMaterialon(teksturo),
  kreiFenestranMaterialon(), kreiOranMaterialon(0xd8b068), () => {});

interface Rampo { fala: number; kuro: number; deklivo: number; x: number; z: number }
const rampoj: Rampo[] = [];
let glataj = 0;
for ( const peco of vojSuprajxoj ) {
  const kuro = Math.hypot(peco.x2 - peco.x1, peco.z2 - peco.z1);
  const fala = Math.abs(peco.y1 - peco.y0);
  if ( fala < 0o1 / 0o1000 || kuro < 0o1 / 0o1000 ) continue;
  // ⟨ ផ្ទៃរលូនរបស់ស្ពានមិនមែនជាជំហានទេ 📃 ⟩ ៖ វារត់តាមធ្នូ , មិនគោរព
  // ច្បាប់ជម្រាលឯកសណ្ឋាន ។ សញ្ញា rampo បែងចែកវាពីមុខជំហានពិត ។
  if ( peco.rampo !== true ) { glataj++; continue; }
  rampoj.push({ fala, kuro, deklivo: fala / kuro,
    x: ( peco.x1 + peco.x2 ) / 0o2, z: ( peco.z1 + peco.z2 ) / 0o2 });
}
rampoj.sort(( p, q ) => q.deklivo - p.deklivo);

// ⟨ បង្ហាប់ 📏 ⟩ ៖ ប្រវែងដែលបាត់បើប្រៀបនឹងច្បាប់ rampaKuro ។
// កាត់ជម្រាលជាពីរចម្រៀករក្សាសមាមាត្រ , ដូច្នេះវាមិនរាប់ជាបង្ហាប់ទេ ។
const troaj = rampoj.filter(r => r.deklivo > DEKLIVO_LIMO);
const premitaj = rampoj.filter(r => rampaKuro(r.fala) - r.kuro > KURO_TOLERO);
const deklivoj = [ ...new Set(rampoj.map(r => r.deklivo.toFixed(0o2))) ].sort();
const plej = rampoj[0];

console.log( `មុខជំហាន ${rampoj.length} , ផ្ទៃរលូន ${glataj} , លើសច្រាំង ${troaj.length}` +
  ` , ច្រាំងខ្ពស់បំផុត ${( plej?.deklivo ?? 0 ).toFixed(2)}` +
  ( plej ? ` @${plej.x.toFixed(1)},${plej.z.toFixed(1)}` : "" ) );
console.log( `ច្រាំងខុសគ្នា ${deklivoj.length} [ ${deklivoj.slice(0, 0o10).join(" ")} ]` +
  ` , ប្រវែងជម្រាលពេញ ${STUPA_RAMPO_KURO.toFixed(2)}` );
console.log( `ជម្រាលបង្ហាប់ ${premitaj.length}` );
for ( const r of troaj.slice(0, 0o10) )
  console.log( `  ជញ្ជាំង ធ្លាក់ ${r.fala.toFixed(2)} រត់ ${r.kuro.toFixed(3)}` +
    ` ច្រាំង ${r.deklivo.toFixed(2)} @${r.x.toFixed(1)},${r.z.toFixed(1)}` );

const bona = troaj.length === 0 && premitaj.length === 0 && rampoj.length > 0;
console.log( bona ? "ទំហំជម្រាល ល្អ" :
  `ទំហំជម្រាល ខុស ${troaj.length + premitaj.length}` );
