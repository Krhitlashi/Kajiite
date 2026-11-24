// ≺⧼ ſȷɔ ſᶘᴜʞ j͑ʃᴜꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🟩 ⧽≻
// ſᶘɜ , j͑ʃᴜ ſɭ,w , ſɭɜ ſɭ,w , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭɜ ſɭ,w , ſɭэ ſɭᴜ , ꞙɭэ , ⟅ ſᶘɜ , ſɭэ ſɭᴜ , ꞙɭı , ſ͕ɭɜ ı],ᴜ , ꞙɭı , 📃 ⟩
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
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſןᴜ j͐ʃэ=${amplekso} ｡ ɭʃɜ }ʃᴜ=${SKULPTA_PASO} ｡ ſɭɹ ſןᴜ=${tabeloj * tabeloj * krado * krado}`);

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
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${etikedo.padEnd(0o30)} ${plejBona.toFixed(1)}ms ｡ ſɭw ʃᴜ=${meshoj} ｡ ſȷɔ ſᶘᴜʞ=${tufoj}`);
}

await mezuri("jɐ ɭʃᴜ ( ſןɔ ʌ ſȷɔ ſᶘᴜʞ )", malplenaFiltro);
await mezuri("ſɭɹ ſᶘɔ", realaFiltro);
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) akvaVem2=${akvaVem2(0, 0).toFixed(3)}`);
const materialoA = kf2HerbanMaterialon();
const materialoB = kf2HerbanMaterialon();
if ( materialoA.map !== materialoB.map ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) j͐ʃƽɜ ʌ ſȷɔ ſᶘᴜʞ ｡ ſןɔ ʌ ſɟw ɭʃᴜ");
console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) j͐ʃƽɜ ʌ ſȷɔ ſᶘᴜʞ ｡ ſɟw ɭʃᴜ ｡ ſɭɹ ſᶘɔ ✅");
const plenaKlingo = kf2HerbanKlingon(0o1, 0o1/0o10, 0o1/0o10, 0o1/0o10, 0,
  new THREE.Color(0x408058), 1, 0o4/0o10, 0o5, true);
const senFundaKlingo = kf2HerbanKlingon(0o1, 0o1/0o10, 0o1/0o10, 0o1/0o10, 0,
  new THREE.Color(0x408058), 1, 0o4/0o10, 0o5, false);
if ( plenaKlingo.getIndex()!.count - senFundaKlingo.getIndex()!.count !== 0o11 ) {
  throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſɭw ʃᴜ ʌ ſȷɔ ſᶘᴜʞ ｡ ſןɔ ʌ }ʃɔ ſ̀ȷw }ʃᴜƽ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
}
const normalojA = plenaKlingo.getAttribute("normal").array;
const normalojB = senFundaKlingo.getAttribute("normal").array;
if ( normalojA.length !== normalojB.length || normalojA.some(( v, i ) => v !== normalojB[i]) ) {
  throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſɟɹ ᶅſɹȝ ʌ ſȷɔ ſᶘᴜʞ ｡ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ");
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſȷɔ ſᶘᴜʞ ${plenaKlingo.getIndex()!.count / 3} → ${senFundaKlingo.getIndex()!.count / 3} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ ｡ ſɟɹ ᶅſɹȝ ｡ ſɭɹ ſᶘɔ ✅`);
