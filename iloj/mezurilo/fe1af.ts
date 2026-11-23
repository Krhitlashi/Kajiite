// ≺⧼ ſȷɔ ſᶘᴜʞ j͑ʃᴜꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🟩 ⧽≻
// វាលស្មៅស្កេនពិភពលោកទាំងមូលតាមក្រឡា ។ នេះជាការងារធ្ងន់បំផុតមួយ
// នៅពេលចូលពិភពលោក ។ យើងបែងចែករវាង ការស្កេនក្រឡា និង ការសង់ដុំស្មៅ ។
import * as THREE from "three";
import { vepaqHerbanTavolon } from "../../eskekoj/shalaj-hapudal/vegetajxo/fe1af/gazono.js";
import { kf2HerbanMaterialon } from "../../eskekoj/shalaj-hapudal/vegetajxo/fe1af/vento.js";
import { kf2HerbanKlingon } from "../../eskekoj/shalaj-hapudal/vegetajxo/fe1af/klingoj.js";
import { VALAJ_BIOMOJ, EBENAJAJ_BIOMOJ }
  from "../../eskekoj/shalaj-hapudal/vegetajxo/habs2.js";
import { alteco, akvaVem2 } from "../../kantaoj/mondo/tereno.js";
import { SKULPTA_N, SKULPTA_PASO } from "../../kantaoj/tero-datumaro/aktiva.js";

const NOMBRO_DA_JXUROJ = 0o5;
const neniam = (): boolean => false;
const realaFiltro = [ ...VALAJ_BIOMOJ, ...EBENAJAJ_BIOMOJ ];
const malplenaFiltro: readonly never[] = [];

const amplekso = SKULPTA_N * SKULPTA_PASO;
const tabeloj = Math.ceil(amplekso / 0o100);
const krado = Math.round(0o100 / 0o2);
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ទំហំ=${amplekso} ជំហាន=${SKULPTA_PASO} ក្រឡា=${tabeloj * tabeloj * krado * krado}`);

async function kuri( filtro: readonly never[] | readonly string[] ): Promise<THREE.Scene> {
  const qena = new THREE.Scene();
  await vepaqHerbanTavolon(qena, async () => {}, alteco,
    neniam, neniam, neniam, filtro as readonly never[], 0o17);
  return qena;
}

async function mezuri( etikedo: string, filtro: readonly never[] | readonly string[] ): Promise<void> {
  let plejBona = Infinity;
  let meshoj = 0, tufoj = 0;
  for ( let r = 0; r < NOMBRO_DA_JXUROJ; r++ ) {
    const t0 = performance.now();
    const qena = await kuri(filtro);
    const t1 = performance.now();
    if ( t1 - t0 < plejBona ) plejBona = t1 - t0;
    meshoj = qena.children.length;
    tufoj = 0;
    for ( const c of qena.children ) tufoj += ( c as THREE.InstancedMesh ).count;
  }
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${etikedo.padEnd(0o30)} ${plejBona.toFixed(1)}ms ដុំ=${meshoj} ស្មៅ=${tufoj}`);
}

await mezuri("ស្កេនទទេ ( គ្មានស្មៅ )", malplenaFiltro);
await mezuri("ពេញលេញ", realaFiltro);
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) akvaVem2=${akvaVem2(0, 0).toFixed(3)}`);
const materialoA = kf2HerbanMaterialon();
const materialoB = kf2HerbanMaterialon();
if ( materialoA.map !== materialoB.map ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) វាយនភាពស្មៅមិនបានចែករំលែក");
console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) វាយនភាពស្មៅរួមតែមួយ ✅");
const plenaKlingo = kf2HerbanKlingon(0o1, 0o1/0o10, 0o1/0o10, 0o1/0o10, 0,
  new THREE.Color(0x408058), 1, 0o4/0o10, 0o5, true);
const senFundaKlingo = kf2HerbanKlingon(0o1, 0o1/0o10, 0o1/0o10, 0o1/0o10, 0,
  new THREE.Color(0x408058), 1, 0o4/0o10, 0o5, false);
if ( plenaKlingo.getIndex()!.count - senFundaKlingo.getIndex()!.count !== 0o11 ) {
  throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) គូបមូលស្មៅមិនត្រូវបានដកត្រឹមត្រូវ");
}
const normalojA = plenaKlingo.getAttribute("normal").array;
const normalojB = senFundaKlingo.getAttribute("normal").array;
if ( normalojA.length !== normalojB.length || normalojA.some(( v, i ) => v !== normalojB[i]) ) {
  throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) នរម៉ាល់ស្មៅបានប្រែ");
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ស្លឹក ${plenaKlingo.getIndex()!.count / 3} → ${senFundaKlingo.getIndex()!.count / 3} ត្រីកោណ នរម៉ាល់ដដែល ✅`);
