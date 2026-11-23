// ≺⧼ ſɭэ ֭ſɭэ ʌ j͐ʃɹ ŋᷠɔ 🔬 ⧽≻
// ⟨ ឧបករណ៍តែមួយសម្រាប់ឆ្លើយសំណួរអំពីកម្ពស់ផ្លូវ ។ មុននេះសំណួរនីមួយ ៗ
// មានស្គ្រីបដោយឡែក ( `provo` ដល់ `provo10` ) , ហើយពួកវាចម្លងប្លុកសាងសង់
// ពិភពលោកដូចគ្នា ។ ឥឡូវសំណួរទាំងអស់នៅទីនេះ ៖ ជម្រើសជាពាក្យបញ្ជា ។ 📃 ⟩
//
// ការប្រើ ៖
//   node --import ./iloj/mezurilo/falsdomo.mjs iloj/mezurilo/provo.mjs hak6h6
//   node ... provo.mjs s2qena 12 [ជំហាន]
//   node ... provo.mjs kruda 12 [ជំហាន]
//   node ... provo.mjs tereno 92 -60 [ជំហាន] [កាំ]
//   node ... provo.mjs n2k 92 -60
//   node ... provo.mjs vem2
//
// ⟨ ការវាស់ត្រូវអានពិភពលោកតែម្តង 📏 ⟩ ៖ ប្លុកសាងសង់ពិភពលោកនៅក្នុង
// `komunaj.ts` ។ ដូច្នេះជម្រើសទាំងអស់វាស់លើពិភពលោកតែមួយ ,
// ហើយលេខរបស់ពួកវាប្រៀបធៀបគ្នាបាន ។ 📃 ⟩
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { kf2NivelanProfilon } from "../../eskekoj/medio/hak6h6/havem2.js";
import { kf2BazanK6h6Alton, VOJA_KUNIGA_RADIUSO,
  VOJA_TERA_KLINO } from "../../eskekoj/medio/hak6h6/alto.js";
import { VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO,
  surGrid } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { k6h6SuproDeVeb6kek } from "../../eskekoj/medio/hak6h6/haqoxa.js";
import { kf2MezuranMondon, punktoCxe, type MezuraMondo } from "./komunaj.js";

const ordono = process.argv[ 2 ] ?? "hak6h6";
const nombro = ( i: number, defaŭlto: number ): number => {
  const v = Number(process.argv[ i ]);
  return Number.isFinite(v) ? v : defaŭlto;
};

// ⟪ ជម្រើស `vem2` ៖ ប្រវត្តិរូបសាកល្បង 📃 ⟫
// ⟨ មិនអានពិភពលោក 📏 ⟩ ៖ ជម្រើសនេះសាងសង់បន្ទាត់សាកល្បង ,
// ដូច្នេះវារត់លឿន ហើយមិនអាស្រ័យលើគ្រាប់ពូជ ។ 📃 ⟩
function vem2(): void {
  const n2k: [ number, number ][] = [ [ 0, 0 ], [ 0o12, 0 ] ];
  const h = ( x: number ): number => x * 0.2;
  const p = kf2NivelanProfilon(n2k, 1.475, h, undefined, [ { x: 5, z: 0, l6da: 4 } ]);
  console.log(`ប្រវែង ${p.sahakani} , គំរូ ${p.hal6da.length}`);
  for ( let i = 0; i < p.hal6da.length; i += 4 )
    console.log(`  s ${p.haxekuxa[ i ].toFixed(1)}` +
      ` គម្រោង ${p.celoj[ i ].toFixed(2)} កម្រិត ${p.hal6da[ i ].toFixed(2)}`);
}

// ⟨ ពិភពលោកត្រូវការសម្រាប់ជម្រើសផ្សេងទៀត 📃 ⟩
let mondo: MezuraMondo | null = null;
const monda = (): MezuraMondo => ( mondo ??= kf2MezuranMondon() );

// ⟪ ជម្រើស `hak6h6` ៖ បញ្ជីផ្លូវ 📃 ⟫
function hak6h6(): void {
  const m = monda();
  for ( let i = 0; i < m.hak6h6.length; i++ ) {
    const v = m.hak6h6[ i ];
    const p = m.profiloDe(i);
    let maks = -Infinity, min = Infinity;
    for ( const h of p.hal6da ) { maks = Math.max(maks, h); min = Math.min(min, h); }
    const a = m.gluitaj[ i ][ 0 ];
    const b = m.gluitaj[ i ][ m.gluitaj[ i ].length - 1 ];
    console.log(`${i} ${v.ksaka} , ( ${a[0].toFixed(0)},${a[1].toFixed(0)} ) ំ` +
      ` ( ${b[0].toFixed(0)},${b[1].toFixed(0)} ) , ប្រវែង ${p.sahakani.toFixed(1)} ,` +
      ` ទទឹង ${v.sefini} , កម្រិត ${min.toFixed(1)} ំ ${maks.toFixed(1)}` +
      ` , ចំណុច ${m.gluitaj[ i ].length}`);
  }
}

// ⟪ ជម្រើស `s2qena` ៖ កម្រិតតាមបណ្តោយផ្លូវ 📃 ⟫
function s2qena(): void {
  const m = monda();
  const i = nombro(3, 0);
  const v = m.hak6h6[ i ];
  if ( !v ) { console.log(`គ្មានផ្លូវ ${i}`); return; }
  const tona = nombro(4, 2);
  const p = m.profiloDe(i);
  console.log(`${i} ${v.ksaka} , ចំណុច ${m.gluitaj[ i ].length}` +
    ` , ប្រវែង ${p.sahakani} , ចំណុចភ្ជាប់ ${m.ankroj.length}`);
  console.log("  ចំណុចភ្ជាប់ " + m.ankroj.map(k =>
    `( ${k.x.toFixed(1)},${k.z.toFixed(1)} )=${k.l6da}`).join(" "));
  const hako = Math.max(1, Math.round(tona / ( p.sahakani / ( p.hal6da.length - 1 ) )));
  const linioj: string[] = [];
  for ( let j = 0; j < p.hal6da.length; j += hako ) {
    const q = punktoCxe(m.gluitaj[ i ], p.haxekuxa[ j ]);
    linioj.push(`${p.haxekuxa[ j ].toFixed(0)} ( ${q.x.toFixed(0)},${q.z.toFixed(0)} )` +
      ` ក ${p.hal6da[ j ].toFixed(1)} គ ${p.celoj[ j ].toFixed(1)} ដ ${alteco(q.x, q.z).toFixed(1)}`);
  }
  console.log("  " + linioj.join(" | "));
}

// ⟪ ជម្រើស `kruda` ៖ ជំហានគណនាកម្រិត 📃 ⟫
// ⟨ អានពីប្រវត្តិរូបផ្ទាល់ 📏 ⟩ ៖ មុននេះស្គ្រីបគណនាជំហានទាំងនេះឡើងវិញ ,
// ដូច្នេះលេខរបស់វាអាចខុសពីហ្គេម ។ ឥឡូវអាន `centraj` និង `glataj` ពីប្រវត្តិរូប ។ 📃 ⟩
function kruda(): void {
  const m = monda();
  const i = nombro(3, 0);
  const v = m.hak6h6[ i ];
  if ( !v ) { console.log(`គ្មានផ្លូវ ${i}`); return; }
  const tona = nombro(4, 2);
  const p = m.profiloDe(i);
  const h6kuni = p.sahakani / ( p.hal6da.length - 1 );
  console.log(`ផ្លូវ ${i} ${v.ksaka} , ប្រវែង ${p.sahakani}` +
    ` , គំរូ ${p.hal6da.length} , ចន្លោះ ${h6kuni.toFixed(3)}`);
  for ( let j = 0; j < p.hal6da.length; j += tona ) {
    const q = punktoCxe(m.gluitaj[ i ], p.haxekuxa[ j ]);
    const proksimaj = m.ankroj
      .map(k => ( { k, d: Math.hypot(k.x - q.x, k.z - q.z) } ))
      .sort((a, b) => a.d - b.d).slice(0, 2);
    console.log(`  ${j} s ${p.haxekuxa[ j ].toFixed(2)} ( ${q.x.toFixed(1)},${q.z.toFixed(1)} )` +
      ` ដ ${alteco(q.x, q.z).toFixed(2)} វាល ${m.k6h6Alteco(q.x, q.z).toFixed(2)}` +
      ` កណ្ត ${p.centraj[ j ].toFixed(2)} គែម ${p.glataj[ j ].toFixed(2)}` +
      ` គ ${p.celoj[ j ].toFixed(2)} ក ${p.hal6da[ j ].toFixed(2)}` +
      ` ចាន ${proksimaj.map(x => `${x.k.l6da.toFixed(1)}@${x.d.toFixed(1)}`).join(" ")}`);
  }
}

// ⟪ ជម្រើស `tereno` ៖ កម្ពស់ដីជុំវិញចំណុច 📃 ⟫
function tereno(): void {
  const X = nombro(3, 0), Z = nombro(4, 0);
  const tona = nombro(5, 0.5), radio = nombro(6, 3);
  for ( let dz = -radio; dz <= radio + 0o10 ** -0o11; dz += tona ) {
    const x2pa: string[] = [];
    for ( let dx = -radio; dx <= radio + 0o10 ** -0o11; dx += tona )
      x2pa.push(alteco(X + dx, Z + dz).toFixed(1));
    console.log(`${( Z + dz ).toFixed(1)} ${x2pa.join(" ")}`);
  }
  console.log(`កណ្តាល ${alteco(X, Z).toFixed(2)}`);
}

// ⟪ ជម្រើស `n2k` ៖ ហេតុអ្វីចានខ្ពស់ 📃 ⟫
function n2k(): void {
  const X = nombro(3, 0), Z = nombro(4, 0);
  const m = monda();
  const baza = kf2BazanK6h6Alton(alteco);
  console.log(`ចំណុចភ្ជាប់ ${m.ankroj.length}`);
  console.log(`ដី ${alteco(X, Z).toFixed(2)} មូល ${baza(X, Z).toFixed(2)}` +
    ` វាល ${m.k6h6Alteco(X, Z).toFixed(2)}`);
  console.log(`ចានពីវាល ${m.pa12Cxe(X, Z).toFixed(2)}` +
    ` , ចានពីមូល ${surGrid(k6h6SuproDeVeb6kek(X, Z, [], VOJA_EKSTERA_DUONO, baza).hateru).toFixed(2)}` +
    ` , ចានពីដី ${surGrid(k6h6SuproDeVeb6kek(X, Z, [], VOJA_EKSTERA_DUONO, alteco).hateru).toFixed(2)}`);
  const proksimaj = m.kunigajPunktoj
    .map(([ x, z ]) => ( { x, z, d: Math.hypot(x - X, z - Z) } ))
    .sort((a, b) => a.d - b.d).slice(0, 0o14);
  for ( const k of proksimaj ) {
    const propra = surGrid(k6h6SuproDeVeb6kek(k.x, k.z, [], VOJA_EKSTERA_DUONO, baza).hateru)
      - VOJA_SUPRO_LEVIGXO;
    const kon = propra - VOJA_TERA_KLINO * Math.max(0, k.d - VOJA_KUNIGA_RADIUSO);
    console.log(`  ( ${k.x.toFixed(1)},${k.z.toFixed(1)} ) d ${k.d.toFixed(2)}` +
      ` ដី ${alteco(k.x, k.z).toFixed(2)} មូល ${baza(k.x, k.z).toFixed(2)}` +
      ` កំពូល ${propra.toFixed(2)} កោណ ${kon.toFixed(2)}` +
      ` វាល ${m.k6h6Alteco(k.x, k.z).toFixed(2)}`);
  }
}

const ordonoj: Record<string, () => void> = {
  hak6h6, s2qena, kruda, tereno, n2k, vem2,
};
const elektita = ordonoj[ ordono ];
if ( !elektita ) {
  console.log(`ជម្រើសមិនស្គាល់ "${ordono}" ។ មាន ៖ ${Object.keys(ordonoj).join(" , ")}`);
  process.exitCode = 1;
} else {
  elektita();
}
