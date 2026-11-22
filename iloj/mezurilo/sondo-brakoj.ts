// ≺⧼ ស៊ើបកម្ពស់ដៃ 🔬 ⧽≻
import "./falsdomo.mjs";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { kreiBazanVojoAlton } from "../../eskekoj/medio/vojoj/alto.js";
import { kreiPlataNivelon, kunigajBrakAltoj, plataAltoCxe } from
  "../../eskekoj/medio/vojoj/formoj.js";
import { kreiBrakojn, kunigaPlataNivelo } from "../../eskekoj/medio/vojoj/platoj.js";
import { VOJA_DIORITA_DUONO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { kreiMezuranMondon } from "./komunaj.js";

const mondo = kreiMezuranMondon(false);
const baza = kreiBazanVojoAlton(alteco);

const celoj: [ number, number ][] = [ [ 0o24, -0o100 ], [ 0o65, -0o44 ], [ 0o70, -0o44 ], [ 0o134, -0o74 ] ];
for ( const [ qx, qz ] of celoj ) {
  console.log(`\nចំណុច ${qx},${qz} ដី ${alteco(qx, qz).toFixed(2)}`);
  for ( const k of mondo.kunigoj ) {
    const d = Math.hypot(k.x - qx, k.z - qz);
    if ( d > 0o12 ) continue;
    const knece = kreiBrakojn(mondo.mapoj.hac2w2q.get(k.x + "," + k.z) ?? [],
      mondo.mapoj.fermitaj.get(k.x + "," + k.z),
      mondo.mapoj.rotacioj.get(k.x + "," + k.z) ?? 0,
      mondo.mapoj.hap2somani.get(k.x + "," + k.z));
    const hap2somani = knece.map(b => b.p2somani);
    const hal6da = kunigajBrakAltoj(k.x, k.z, knece.map(b => [ b.ux, b.uz ]), hap2somani, baza);
    const vem2 = kunigaPlataNivelo(k.x, k.z, knece, mondo.vojoAlteco);
    console.log(`  ចាន ${k.x.toFixed(1)},${k.z.toFixed(1)} d=${d.toFixed(1)}` +
      ` ដី ${alteco(k.x, k.z).toFixed(2)} វាល ${mondo.vojoAlteco(k.x, k.z).toFixed(2)}`);
    console.log(`    ដីមាត់ ${hal6da.map(v => v.toFixed(2)).join(" ")}` +
      ` | វាលមាត់ ${vem2.hal6da.map(v => v.toFixed(2)).join(" ")}` +
      ` | កណ្តាល ${vem2.l6da.toFixed(2)}`);
    console.log(`    ទិស ${knece.map(b => `${b.ux.toFixed(2)}/${b.uz.toFixed(2)}`).join(" ")}`);
  }
  for ( const ox of [ -6, -3, 0, 3, 6 ] ) {
    const vico: string[] = [];
    for ( const oz of [ -6, -3, 0, 3, 6 ] ) {
      const px = qx + ox, pz = qz + oz;
      vico.push(`(${px},${pz}) ${mondo.vojoAlteco(px, pz).toFixed(1)}/${alteco(px, pz).toFixed(1)}`);
    }
    console.log("  " + vico.join("  "));
  }
}
