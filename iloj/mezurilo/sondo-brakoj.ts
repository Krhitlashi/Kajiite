// ≺⧼ ɭʃꞇƽ ʌ j͐ʃэ ɭ(ᴜ ʌ j͐ʃɹ ŋᷠɔ 🔬 ⧽≻
import "./falsdomo.mjs";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { kf2BazanK6h6Alton } from "../../eskekoj/medio/hak6h6/alto.js";
import { kf2PlataVem2n, kunigajBrakAltoj, plataAltoCxe } from
  "../../eskekoj/medio/hak6h6/haqoxa.js";
import { kf2Brakojn, kunigaPlataVem2 } from "../../eskekoj/medio/hak6h6/hapa12.js";
import { VOJA_DIORITA_DUONO } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { kf2MezuranMondon } from "./komunaj.js";

const mondo = kf2MezuranMondon(false);
const baza = kf2BazanK6h6Alton(alteco);

const celoj: [ number, number ][] = [ [ 0o24, -0o100 ], [ 0o65, -0o44 ], [ 0o70, -0o44 ], [ 0o134, -0o74 ] ];
for ( const [ qx, qz ] of celoj ) {
  console.log(`\nចំណុច ${qx},${qz} ដី ${alteco(qx, qz).toFixed(2)}`);
  for ( const k of mondo.haveb6kek ) {
    const d = Math.hypot(k.x - qx, k.z - qz);
    if ( d > 0o12 ) continue;
    const knece = kf2Brakojn(mondo.mapoj.hac2w2q.get(k.x + "," + k.z) ?? [],
      mondo.mapoj.fermitaj.get(k.x + "," + k.z),
      mondo.mapoj.rotacioj.get(k.x + "," + k.z) ?? 0,
      mondo.mapoj.hap2somani.get(k.x + "," + k.z));
    const hap2somani = knece.map(b => b.p2somani);
    const hal6da = kunigajBrakAltoj(k.x, k.z, knece.map(b => [ b.ux, b.uz ]), hap2somani, baza);
    const vem2 = kunigaPlataVem2(k.x, k.z, knece, mondo.k6h6Alteco);
    console.log(`  ចាន ${k.x.toFixed(1)},${k.z.toFixed(1)} d=${d.toFixed(1)}` +
      ` ដី ${alteco(k.x, k.z).toFixed(2)} វាល ${mondo.k6h6Alteco(k.x, k.z).toFixed(2)}`);
    console.log(`    ដីមាត់ ${hal6da.map(v => v.toFixed(2)).join(" ")}` +
      ` | វាលមាត់ ${vem2.hal6da.map(v => v.toFixed(2)).join(" ")}` +
      ` | កណ្តាល ${vem2.l6da.toFixed(2)}`);
    console.log(`    ទិស ${knece.map(b => `${b.ux.toFixed(2)}/${b.uz.toFixed(2)}`).join(" ")}`);
  }
  for ( const ox of [ -6, -3, 0, 3, 6 ] ) {
    const x2pa: string[] = [];
    for ( const oz of [ -6, -3, 0, 3, 6 ] ) {
      const px = qx + ox, pz = qz + oz;
      x2pa.push(`(${px},${pz}) ${mondo.k6h6Alteco(px, pz).toFixed(1)}/${alteco(px, pz).toFixed(1)}`);
    }
    console.log("  " + x2pa.join("  "));
  }
}
