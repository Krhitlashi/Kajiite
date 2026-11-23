// ≺⧼ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ j͑ʃᴜꞇ ʌ ſɟᴜ ſןᴜ ɭʃэ ʌ j͑ʃᴜ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſןᴜ ſᶘɹ 🔬 ⧽≻
// ⟨ ជណ្តើរចំណតចាប់ផ្តើមនៅមាត់ចានភ្ជាប់ ។ បើកម្ពស់ជំហានទីមួយគណនាពីចំណុចផ្សេង ,
// ជណ្តើរធ្លាក់ក្រោមចាន , ហើយអ្នកឃើញរណ្តៅនៅមាត់ចំណត ។ ស្គ្រីបនេះសាងសង់ចំណតពិត ,
// ហើយប្រៀបធៀបជំហានទីមួយនឹងចាន , និងជំហានចុងក្រោយនឹងមាត់ចំណត ។ 📃 ⟩
import * as THREE from "three";
import { aktivajHak6h6, aktivajHaqakaj2 } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaVem2 } from "../../kantaoj/mondo/tereno.js";
import { troviK6h6RetajnHaveb6kekn } from "../../eskekoj/medio/voj-reto.js";
import { gluiK6h6Finon } from "../../eskekoj/medio/hak6h6/gluado.js";
import { kf2K6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { k6h6SuproDeVeb6kek } from "../../eskekoj/medio/hak6h6/haqoxa.js";
import { VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO,
  VOJA_TRUA_DUONO, k6h6LarghoDuono } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { vepaqQakaj2n } from "../../eskekoj/medio/qakaj2.js";
import { kf2DokanStuparon } from "../../eskekoj/medio/qakaj2/stuparo.js";
import { qakaj2AltoCxe } from "../../eskekoj/medio/hak6h6/kunig-havem2.js";
import type { K6h6Punkto } from "../../eskekoj/medio/voj-reto/hahunaq.js";

const qena = new THREE.Scene();
const VOJOJ = aktivajHak6h6().filter(v => v.n2k.length >= 2);
const DOKOJ = aktivajHaqakaj2();
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return [ d.x + Math.sin(r) * ( d.profundo / 2 ), d.z + Math.cos(r) * ( d.profundo / 2 ) ] as K6h6Punkto;
});
const ne3ak2 = troviK6h6RetajnHaveb6kekn(
  VOJOJ.map(v => ( { n2k: v.n2k, sefini: v.sefini } )), DOKOJ);
const gluitaj = VOJOJ.map((v, i) => gluiK6h6Finon(v.n2k,
  ne3ak2.map(k => [ k.x, k.z ] as K6h6Punkto),
  landoj.map(p => ( { x: p[0], z: p[1] } )),
  VOJOJ.filter((_, j) => j !== i).map(o => o.n2k)));
const haveb6kek = troviK6h6RetajnHaveb6kekn(
  VOJOJ.map((v, i) => ( { n2k: gluitaj[i], sefini: v.sefini } )), DOKOJ);
const k6h6Alteco = kf2K6h6Alton(alteco, haveb6kek);

function proksima( x: number, z: number, limo: number ) {
  let plej = Infinity, p: typeof haveb6kek[number] | null = null;
  for ( const k of haveb6kek ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < plej ) { plej = d; p = k; }
  }
  return plej < limo ? p : null;
}
function finAlto( x: number, z: number, sefini: number ): number {
  const k = proksima(x, z, VOJA_TRUA_DUONO);
  if ( k ) return k6h6SuproDeVeb6kek(k.x, k.z, k.direktaj, VOJA_EKSTERA_DUONO, k6h6Alteco).hateru;
  const duon = k6h6LarghoDuono( sefini );
  let maks = k6h6Alteco(x, z);
  for ( let i = 0; i < 0o10; i++ ) {
    const ang = i * Math.PI / 4;
    maks = Math.max(maks, k6h6Alteco(x + Math.cos(ang) * duon, z + Math.sin(ang) * duon));
  }
  return maks + VOJA_SUPRO_LEVIGXO;
}

for ( let i = 0; i < DOKOJ.length; i++ ) {
  const d = DOKOJ[i];
  const r = d.rotacio ?? 0;
  // ⟨ សាងសង់ចំណតដូចហ្គេម 📃 ⟩
  const qakaj2 = vepaqQakaj2n(qena, d.x, d.z, r, k6h6Alteco, akvaVem2, d.profundo, alteco);
  if ( qakaj2.stuparajPunktoj.length < 2 ) {
    console.log(`  ចំណត ${i} ៖ គ្មានជណ្តើរ , វេទិកា ${qakaj2.platformY.toFixed(2)} , មាត់ចំណត ${qakaj2.landejaY.toFixed(2)}`);
    continue;
  }
  const landaX = d.x + Math.sin(r) * ( d.profundo / 2 );
  const landaZ = d.z + Math.cos(r) * ( d.profundo / 2 );
  const sefini = qakaj2.platformWidth;
  // ⟨ អានកម្រិតចានដែលបានចុះឈ្មោះ 📏 ⟩ ៖ ដូច pontaFinAlto ក្នុងហ្គេម ។ 📃 ⟩
  const starto = qakaj2AltoCxe(landaX, landaZ) ?? finAlto(landaX, landaZ, sefini);
  // ⟨ ចំណុចចាប់ផ្តើមក្រោយការផ្លាស់ ៖ នៅមាត់ចានភ្ជាប់ 📃 ⟩
  const veb6kek = proksima(landaX, landaZ, VOJA_TRUA_DUONO);
  let saxeni = qakaj2.stuparajPunktoj[0];
  const tlakakani = qakaj2.stuparajPunktoj[1];
  if ( veb6kek ) {
    const dx = tlakakani[0] - veb6kek.x, dz = tlakakani[1] - veb6kek.z;
    const sahakani = Math.hypot(dx, dz);
    if ( sahakani > VOJA_TRUA_DUONO )
      saxeni = [ veb6kek.x + dx * VOJA_TRUA_DUONO / sahakani, veb6kek.z + dz * VOJA_TRUA_DUONO / sahakani ];
  }
  // ⟨ ហៅអនុគមន៍តែមួយដូចហ្គេម 📏 ⟩ ៖ កុំគណនាលេខជំហានដោយច្បាប់ផ្សេង ។ 📃 ⟩
  const stuparo = kf2DokanStuparon(saxeni, tlakakani, starto, qakaj2.landejaY);
  if ( !stuparo ) {
    console.log(`  ចំណត ${i} ៖ គ្មានជណ្តើរ , វេទិកា ${qakaj2.landejaY.toFixed(3)}`);
    continue;
  }
  const xaqadi = stuparo.l6da(saxeni[0], saxeni[1]) + VOJA_SUPRO_LEVIGXO;
  const z2hak = stuparo.l6da(tlakakani[0], tlakakani[1]) + VOJA_SUPRO_LEVIGXO;
  console.log(`  ចំណត ${i} ( ${d.x.toFixed(1)}, ${d.z.toFixed(1)} )` +
    ` ៖ ចាន ${starto.toFixed(3)} , ជំហាន ${stuparo.nombro}` +
    ` , លើ ${xaqadi.toFixed(3)} , ក្រោម ${z2hak.toFixed(3)}` +
    ` , មាត់ចំណត ${qakaj2.landejaY.toFixed(3)}` +
    ` , ចុងខុស ${( z2hak - qakaj2.landejaY ).toFixed(3)}` +
    ` , ក្បាលខុស ${( starto - xaqadi ).toFixed(3)}` +
    ` , ចម្ងាយ ${Math.hypot(saxeni[0] - qakaj2.stuparajPunktoj[0][0],
      saxeni[1] - qakaj2.stuparajPunktoj[0][1]).toFixed(2)}`);
}
