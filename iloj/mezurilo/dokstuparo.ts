// ≺⧼ ជណ្តើរចំណត និងចានភ្ជាប់ 🔬 ⧽≻
// ⟨ ជណ្តើរចំណតចាប់ផ្តើមនៅមាត់ចានភ្ជាប់ ។ បើកម្ពស់ជំហានទីមួយគណនាពីចំណុចផ្សេង ,
// ជណ្តើរធ្លាក់ក្រោមចាន , ហើយអ្នកឃើញរណ្តៅនៅមាត់ចំណត ។ ស្គ្រីបនេះសាងសង់ចំណតពិត ,
// ហើយប្រៀបធៀបជំហានទីមួយនឹងចាន , និងជំហានចុងក្រោយនឹងមាត់ចំណត ។ 📃 ⟩
import * as THREE from "three";
import { aktivajVojoj, aktivajDokoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco, akvaNivelo } from "../../kantaoj/mondo/tereno.js";
import { troviVojaRetajnKunigojn } from "../../eskekoj/medio/voj-reto.js";
import { gluiVojaFinon } from "../../kantaoj/mondo/urbo/gluado.js";
import { kreiVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { VOJA_BORDA_LARĜO, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO,
  VOJA_TRUA_DUONO, STUPA_RISERO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { konstruiDokon } from "../../eskekoj/medio/doko.js";
import type { VojaPunkto } from "../../eskekoj/medio/voj-reto/tipoj.js";

const sceno = new THREE.Scene();
const VOJOJ = aktivajVojoj().filter(v => v.punktoj.length >= 2);
const DOKOJ = aktivajDokoj();
const landoj = DOKOJ.map(d => {
  const r = d.rotacio ?? 0;
  return [ d.x + Math.sin(r) * ( d.profundo / 2 ), d.z + Math.cos(r) * ( d.profundo / 2 ) ] as VojaPunkto;
});
const antaŭaj = troviVojaRetajnKunigojn(
  VOJOJ.map(v => ( { punktoj: v.punktoj, larĝo: v.larĝo } )), DOKOJ);
const gluitaj = VOJOJ.map((v, i) => gluiVojaFinon(v.punktoj,
  antaŭaj.map(k => [ k.x, k.z ] as VojaPunkto),
  landoj.map(p => ( { x: p[0], z: p[1] } )),
  VOJOJ.filter((_, j) => j !== i).map(o => o.punktoj)));
const kunigoj = troviVojaRetajnKunigojn(
  VOJOJ.map((v, i) => ( { punktoj: gluitaj[i], larĝo: v.larĝo } )), DOKOJ);
const vojoAlteco = kreiVojoAlton(alteco, kunigoj);

function proksima( x: number, z: number, limo: number ) {
  let plej = Infinity, p: typeof kunigoj[number] | null = null;
  for ( const k of kunigoj ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < plej ) { plej = d; p = k; }
  }
  return plej < limo ? p : null;
}
function finAlto( x: number, z: number, larĝo: number ): number {
  const k = proksima(x, z, VOJA_TRUA_DUONO);
  if ( k ) return vojaSuproDeKunigo(k.x, k.z, k.direktaj, VOJA_EKSTERA_DUONO, vojoAlteco).supro;
  const duon = larĝo / 4 + VOJA_BORDA_LARĜO;
  let maks = vojoAlteco(x, z);
  for ( let i = 0; i < 0o10; i++ ) {
    const ang = i * Math.PI / 4;
    maks = Math.max(maks, vojoAlteco(x + Math.cos(ang) * duon, z + Math.sin(ang) * duon));
  }
  return maks + VOJA_SUPRO_LEVIGXO;
}

for ( let i = 0; i < DOKOJ.length; i++ ) {
  const d = DOKOJ[i];
  const r = d.rotacio ?? 0;
  // ⟨ សាងសង់ចំណតដូចហ្គេម 📃 ⟩
  const doko = konstruiDokon(sceno, d.x, d.z, r, vojoAlteco, akvaNivelo, d.profundo, alteco);
  if ( doko.stuparajPunktoj.length < 2 ) {
    console.log(`  ចំណត ${i} ៖ គ្មានជណ្តើរ , វេទិកា ${doko.platformY.toFixed(2)} , មាត់ចំណត ${doko.landejaY.toFixed(2)}`);
    continue;
  }
  const landaX = d.x + Math.sin(r) * ( d.profundo / 2 );
  const landaZ = d.z + Math.cos(r) * ( d.profundo / 2 );
  const larĝo = doko.platformWidth;
  const starto = finAlto(landaX, landaZ, larĝo);
  const falto = starto - doko.landejaY;
  const nombro = Math.max(1, Math.round(falto / STUPA_RISERO));
  // ⟨ ចំណុចចាប់ផ្តើមក្រោយការផ្លាស់ ៖ នៅមាត់ចានភ្ជាប់ 📃 ⟩
  const kunigo = proksima(landaX, landaZ, VOJA_TRUA_DUONO);
  let komenco = doko.stuparajPunktoj[0];
  if ( kunigo ) {
    const dx = doko.stuparajPunktoj[1][0] - kunigo.x, dz = doko.stuparajPunktoj[1][1] - kunigo.z;
    const longo = Math.hypot(dx, dz);
    if ( longo > VOJA_TRUA_DUONO )
      komenco = [ kunigo.x + dx * VOJA_TRUA_DUONO / longo, kunigo.z + dz * VOJA_TRUA_DUONO / longo ];
  }
  const plato = kunigo
    ? vojaSuproDeKunigo(kunigo.x, kunigo.z, kunigo.direktaj, VOJA_EKSTERA_DUONO, vojoAlteco).supro
    : NaN;
  const startoStuparo = finAlto(komenco[0], komenco[1], larĝo);
  const unua = starto - STUPA_RISERO;
  const lasta = unua - ( nombro - 1 ) * STUPA_RISERO;
  console.log(`  ចំណត ${i} ( ${d.x.toFixed(1)}, ${d.z.toFixed(1)} )` +
    ` ៖ ចាន ${Number.isNaN(plato) ? "-" : plato.toFixed(3)}` +
    ` , មាត់ដី ${starto.toFixed(3)} , ជណ្តើរ ${startoStuparo.toFixed(3)}` +
    ` , ជំហាន ${nombro} , លើ ${unua.toFixed(3)} , ក្រោម ${lasta.toFixed(3)}` +
    ` , មាត់ចំណត ${doko.landejaY.toFixed(3)} , ចុងខុស ${( lasta - doko.landejaY ).toFixed(3)}` +
    ` , ជំហានទីមួយក្រោមចាន ${( plato - unua ).toFixed(3)}` +
    ` , វេទិកា ${doko.platformY.toFixed(2)} , ចម្ងាយ ${Math.hypot(komenco[0] - doko.stuparajPunktoj[0][0],
      komenco[1] - doko.stuparajPunktoj[0][1]).toFixed(2)}`);
}
