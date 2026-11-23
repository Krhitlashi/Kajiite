// ≺⧼ ſɭɔ ſ͕ɭɜ ı],ᴜ ʌ ſɭɔ˞ᴜͷ̗ ꞁȷ̀ᴜ }ʃꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🧩 ⧽≻
// ប្រៀបធៀបការរលាយចាស់ ( ម្តងមួយគូ ) និងការរលាយថ្មី ( ម្តងតែម្តង ) លើ
// ស្លឹកស្មៅពិត ។
import * as THREE from "three";
import { kunfandiDuGeometriojn, kunfandiGeometriojnSenIndekson }
  from "../../eskekoj/komunajxoj/kunfandajxoj.js";
import { kf2HerbanKlingon } from "../../eskekoj/shalaj-hapudal/vegetajxo/fe1af/klingoj.js";
import { kf2VegetajxanHazardon }
  from "../../eskekoj/shalaj-hapudal/vegetajxo/sakxoXa3e.js";

const NOMBRO_DA_JXUROJ = 0o11;

// ⟨ ដូចក្នុង gazono.ts 📃 ⟩
function s23ohk2sai( geometrioj: THREE.BufferGeometry[] ): THREE.BufferGeometry {
  return geometrioj.slice(1).reduce(( r, g ) => kunfandiDuGeometriojn(r, g), geometrioj[0]);
}

function vepaqKlingojn( kanto: number, aksoj: number, tk2ni: number ): THREE.BufferGeometry[] {
  const hazardo = kf2VegetajxanHazardon(tk2ni);
  const klingoj: THREE.BufferGeometry[] = [];
  const verda = new THREE.Color();
  const seka = new THREE.Color();
  const p2somani = kanto * 0o1/0o2;
  const vepat6ni = kanto / aksoj;
  for ( let iz = 0; iz < aksoj; iz++ ) {
    for ( let ix = 0; ix < aksoj; ix++ ) {
      const rx = -p2somani + ( ix + hazardo() ) * vepat6ni;
      const rz = -p2somani + ( iz + hazardo() ) * vepat6ni;
      const h6kuni = Math.min(1, Math.hypot(rx, rz) / p2somani);
      const tafkaq = Math.atan2(rz, rx);
      const sahakani = 0o14/0o100 + hazardo() * 0o2/0o10;
      const sefini = 0o2/0o100 + hazardo() * 0o2/0o100;
      const elen = sahakani * ( 0o5/0o100 + hazardo() * 0o15/0o100 )
        * ( 0o5/0o10 + h6kuni * 0o5/0o10 );
      const klino = Math.cos(tafkaq) * elen + ( hazardo() - 0o1/0o2 ) * 0o6/0o100 * sahakani;
      const arko = Math.sin(tafkaq) * elen + ( hazardo() - 0o1/0o2 ) * 0o6/0o100 * sahakani;
      const tordo = ( hazardo() - 0o1/0o2 ) * 0o16/0o10;
      const sekaKlingo = hazardo() < 0o1/0o4;
      if ( sekaKlingo ) {
        seka.setRGB(0o21/0o20, 0o33/0o40 + hazardo() * 0o1/0o10, 0o13/0o40 + hazardo() * 0o5/0o40);
      } else {
        verda.setRGB(0o27/0o40 + hazardo() * 0o13/0o40, 0o63/0o100 + hazardo() * 0o11/0o40, 0o5/0o10 + hazardo() * 0o23/0o100);
      }
      const klingo = kf2HerbanKlingon(sahakani, sefini, klino, arko, tordo,
        sekaKlingo ? seka : verda, 0o2, 0o5/0o10);
      klingo.translate(rx, 0, rz);
      klingoj.push(klingo);
    }
  }
  return klingoj;
}

function egala( a: THREE.BufferGeometry, b: THREE.BufferGeometry ): boolean {
  const haksaka = [ "position", "normal", "uv", "color" ];
  for ( const ksaka of haksaka ) {
    const x = a.getAttribute(ksaka), y = b.getAttribute(ksaka);
    if ( ( x === undefined ) !== ( y === undefined ) ) return false;
    if ( x === undefined || y === undefined ) continue;
    if ( x.count !== y.count || x.itemSize !== y.itemSize ) return false;
    const xa = x.array as Float32Array, ya = y.array as Float32Array;
    for ( let i = 0; i < xa.length; i++ ) if ( xa[i] !== ya[i] ) return false;
  }
  return a.index === null && b.index === null;
}

const klingoj = vepaqKlingojn(0o33/0o10, 0o17, 0o2715);
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) បំណែក=${klingoj.length} ស្មើគ្នា=${egala(s23ohk2sai(klingoj), kunfandiGeometriojnSenIndekson(klingoj))}`);

// ⟨ ករណីលាយ ៖ ខ្លះមានពណ៌ ខ្លះគ្មាន 📃 ⟩
const miksitaj = klingoj.map(( g, i ) => {
  if ( i % 0o3 !== 0 ) return g;
  const sen = g.clone();
  sen.deleteAttribute("color");
  return sen;
});
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) លាយស្មើគ្នា=${egala(s23ohk2sai(miksitaj), kunfandiGeometriojnSenIndekson(miksitaj))}`);

let minM = Infinity, minN = Infinity;
for ( let r = 0; r < NOMBRO_DA_JXUROJ; r++ ) {
  const unueSef4 = ( r & 1 ) === 1;
  const t0 = performance.now();
  if ( unueSef4 ) kunfandiGeometriojnSenIndekson(klingoj); else s23ohk2sai(klingoj);
  const t1 = performance.now();
  if ( unueSef4 ) s23ohk2sai(klingoj); else kunfandiGeometriojnSenIndekson(klingoj);
  const t2 = performance.now();
  const dSef4 = unueSef4 ? t1 - t0 : t2 - t1;
  const dS23ohk2sai = unueSef4 ? t2 - t1 : t1 - t0;
  if ( dS23ohk2sai < minM ) minM = dS23ohk2sai;
  if ( dSef4 < minN ) minN = dSef4;
}
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ចាស់=${minM.toFixed(2)}ms ថ្មី=${minN.toFixed(2)}ms លឿន=${(minM / minN).toFixed(1)}x`);
