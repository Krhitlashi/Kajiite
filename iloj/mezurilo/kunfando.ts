// ≺⧼ ការវាស់ការរលាយធរណីមាត្រ 🧩 ⧽≻
// ប្រៀបធៀបការរលាយចាស់ ( ម្តងមួយគូ ) និងការរលាយថ្មី ( ម្តងតែម្តង ) លើ
// ស្លឹកស្មៅពិត ។
import * as THREE from "three";
import { kunfandiDuGeometriojn, kunfandiGeometriojnSenIndekson }
  from "../../eskekoj/komunajxoj/kunfandajxoj.js";
import { kreiHerbanKlingon } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/klingoj.js";
import { kreiVegetajxanHazardon }
  from "../../eskekoj/shalaj-specioj/vegetajxo/hazardoj.js";

const NOMBRO_DA_JXUROJ = 0o11;

// ⟨ ដូចក្នុង gazono.ts 📃 ⟩
function malnova( geometrioj: THREE.BufferGeometry[] ): THREE.BufferGeometry {
  return geometrioj.slice(1).reduce(( r, g ) => kunfandiDuGeometriojn(r, g), geometrioj[0]);
}

function konstruiKlingojn( flanko: number, aksoj: number, semo: number ): THREE.BufferGeometry[] {
  const hazardo = kreiVegetajxanHazardon(semo);
  const klingoj: THREE.BufferGeometry[] = [];
  const verda = new THREE.Color();
  const seka = new THREE.Color();
  const duono = flanko * 0o1/0o2;
  const pasxo = flanko / aksoj;
  for ( let iz = 0; iz < aksoj; iz++ ) {
    for ( let ix = 0; ix < aksoj; ix++ ) {
      const rx = -duono + ( ix + hazardo() ) * pasxo;
      const rz = -duono + ( iz + hazardo() ) * pasxo;
      const disto = Math.min(1, Math.hypot(rx, rz) / duono);
      const angulo = Math.atan2(rz, rx);
      const longo = 0o14/0o100 + hazardo() * 0o2/0o10;
      const largho = 0o2/0o100 + hazardo() * 0o2/0o100;
      const elen = longo * ( 0o5/0o100 + hazardo() * 0o15/0o100 )
        * ( 0o5/0o10 + disto * 0o5/0o10 );
      const klino = Math.cos(angulo) * elen + ( hazardo() - 0o1/0o2 ) * 0o6/0o100 * longo;
      const arko = Math.sin(angulo) * elen + ( hazardo() - 0o1/0o2 ) * 0o6/0o100 * longo;
      const tordo = ( hazardo() - 0o1/0o2 ) * 0o16/0o10;
      const sekaKlingo = hazardo() < 0o1/0o4;
      if ( sekaKlingo ) {
        seka.setRGB(0o21/0o20, 0o33/0o40 + hazardo() * 0o1/0o10, 0o13/0o40 + hazardo() * 0o5/0o40);
      } else {
        verda.setRGB(0o27/0o40 + hazardo() * 0o13/0o40, 0o63/0o100 + hazardo() * 0o11/0o40, 0o5/0o10 + hazardo() * 0o23/0o100);
      }
      const klingo = kreiHerbanKlingon(longo, largho, klino, arko, tordo,
        sekaKlingo ? seka : verda, 0o2, 0o5/0o10);
      klingo.translate(rx, 0, rz);
      klingoj.push(klingo);
    }
  }
  return klingoj;
}

function egala( a: THREE.BufferGeometry, b: THREE.BufferGeometry ): boolean {
  const nomoj = [ "position", "normal", "uv", "color" ];
  for ( const nomo of nomoj ) {
    const x = a.getAttribute(nomo), y = b.getAttribute(nomo);
    if ( ( x === undefined ) !== ( y === undefined ) ) return false;
    if ( x === undefined || y === undefined ) continue;
    if ( x.count !== y.count || x.itemSize !== y.itemSize ) return false;
    const xa = x.array as Float32Array, ya = y.array as Float32Array;
    for ( let i = 0; i < xa.length; i++ ) if ( xa[i] !== ya[i] ) return false;
  }
  return a.index === null && b.index === null;
}

const klingoj = konstruiKlingojn(0o33/0o10, 0o17, 0o2715);
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) បំណែក=${klingoj.length} ស្មើគ្នា=${egala(malnova(klingoj), kunfandiGeometriojnSenIndekson(klingoj))}`);

// ⟨ ករណីលាយ ៖ ខ្លះមានពណ៌ ខ្លះគ្មាន 📃 ⟩
const miksitaj = klingoj.map(( g, i ) => {
  if ( i % 0o3 !== 0 ) return g;
  const sen = g.clone();
  sen.deleteAttribute("color");
  return sen;
});
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) លាយស្មើគ្នា=${egala(malnova(miksitaj), kunfandiGeometriojnSenIndekson(miksitaj))}`);

let minM = Infinity, minN = Infinity;
for ( let r = 0; r < NOMBRO_DA_JXUROJ; r++ ) {
  const unueNova = ( r & 1 ) === 1;
  const t0 = performance.now();
  if ( unueNova ) kunfandiGeometriojnSenIndekson(klingoj); else malnova(klingoj);
  const t1 = performance.now();
  if ( unueNova ) malnova(klingoj); else kunfandiGeometriojnSenIndekson(klingoj);
  const t2 = performance.now();
  const dNova = unueNova ? t1 - t0 : t2 - t1;
  const dMalnova = unueNova ? t2 - t1 : t1 - t0;
  if ( dMalnova < minM ) minM = dMalnova;
  if ( dNova < minN ) minN = dNova;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ចាស់=${minM.toFixed(2)}ms ថ្មី=${minN.toFixed(2)}ms លឿន=${(minM / minN).toFixed(1)}x`);
