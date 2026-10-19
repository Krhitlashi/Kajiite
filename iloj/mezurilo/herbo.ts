// ≺⧼ ការវាស់វាលស្មៅ 🟩 ⧽≻
// វាលស្មៅស្កេនពិភពលោកទាំងមូលតាមក្រឡា ។ នេះជាការងារធ្ងន់បំផុតមួយ
// នៅពេលចូលពិភពលោក ។ យើងបែងចែករវាង ការស្កេនក្រឡា និង ការសង់ដុំស្មៅ ។
import * as THREE from "three";
import { konstruiHerbanTavolon } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/gazono.js";
import { VALAJ_BIOMOJ, EBENAJAJ_BIOMOJ }
  from "../../eskekoj/shalaj-specioj/vegetajxo/biomoj.js";
import { alteco, akvaNivelo } from "../../kantaoj/mondo/tereno.js";
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
  const sceno = new THREE.Scene();
  await konstruiHerbanTavolon(sceno, async () => {}, alteco,
    neniam, neniam, neniam, filtro as readonly never[], 0o17);
  return sceno;
}

async function mezuri( etikedo: string, filtro: readonly never[] | readonly string[] ): Promise<void> {
  let plejBona = Infinity;
  let meshoj = 0, tufoj = 0;
  for ( let r = 0; r < NOMBRO_DA_JXUROJ; r++ ) {
    const t0 = performance.now();
    const sceno = await kuri(filtro);
    const t1 = performance.now();
    if ( t1 - t0 < plejBona ) plejBona = t1 - t0;
    meshoj = sceno.children.length;
    tufoj = 0;
    for ( const c of sceno.children ) tufoj += ( c as THREE.InstancedMesh ).count;
  }
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${etikedo.padEnd(0o30)} ${plejBona.toFixed(1)}ms ដុំ=${meshoj} ស្មៅ=${tufoj}`);
}

await mezuri("ស្កេនទទេ ( គ្មានស្មៅ )", malplenaFiltro);
await mezuri("ពេញលេញ", realaFiltro);
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) akvaNivelo=${akvaNivelo(0, 0).toFixed(3)}`);
