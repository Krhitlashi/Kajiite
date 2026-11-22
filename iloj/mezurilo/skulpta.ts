// ≺⧼ ការប្រៀបធៀបឆាកឆ្លាក់ដី 📏 ⧽≻
// ⟨ ឆាក 3D របស់ឧបករណ៍ឆ្លាក់ដីបំផ្លើសកម្ពស់ ២.៥ ដង , តែថេរផ្លូវ ( ជំហាន ០.៥ )
// មិនបំផ្លើសទេ ។ ដូច្នេះផ្លូវនៅទីនោះលិចក្នុងដី , ហើយគ្មានជញ្ជាំងចំហៀង ។ 📃 ⟩
import { aktivajVojoj } from "../../kantaoj/tero-datumaro/rultempo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { kreiNivelanProfilon } from "../../eskekoj/medio/vojoj/niveloj.js";
import { VOJA_BORDA_LARĜO } from "../../eskekoj/medio/vojoj/mezuroj.js";

const YTROIGO = 0o24 / 0o10; // 2.5 , ដូច iloj/tero-skulptilo/tero-skulptilo/vido3d.ts
const VOJOJ = aktivajVojoj().filter(v => v.n2k.length >= 2);

for (let i = 0; i < VOJOJ.length; i++) {
  const v = VOJOJ[i] as any;
  const p2somani = (v.pontoLarĝo ?? v.sefini) / 4 + VOJA_BORDA_LARĜO;
  const n2k = v.n2k as [ number, number ][];
  const p = kreiNivelanProfilon(n2k, p2somani, (x, z) => alteco(x, z) * YTROIGO);
  let supero = 0, subo = 0, kasxita = 0, tlunakani = 0;
  for (let j = 0; j < p.hal6da.length; j++) {
    const s = p.situoj[j];
    let kur = 0, q: [ number, number ] = n2k[ 0 ];
    for (let k = 0; k < n2k.length - 1; k++) {
      const [ x1, z1 ] = n2k[ k ], [ x2, z2 ] = n2k[ k + 1 ];
      const lo = Math.hypot(x2 - x1, z2 - z1);
      if (s <= kur + lo || k === n2k.length - 2) {
        const t = lo < 0o10 ** -0o12 ? 0 : Math.max(0, Math.min(1, ( s - kur ) / lo));
        q = [ x1 + ( x2 - x1 ) * t, z1 + ( z2 - z1 ) * t ];
        break;
      }
      kur += lo;
    }
    const d = p.hal6da[j] - alteco(q[0], q[1]) * YTROIGO;
    tlunakani += d;
    if (d > 0) supero++; else { subo++; if (-d > 0o1/0o2) kasxita++; }
  }
  console.log(`${i} ${v.ksaka} : លើដី ${supero} , ក្រោមដី ${subo} , កប់លើសមួយជំហាន ${kasxita}` +
    ` / ${p.hal6da.length} , មធ្យម ${(tlunakani / p.hal6da.length).toFixed(2)}`);
}
