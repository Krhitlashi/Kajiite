// ≺⧼ ការស៊ើបអង្កេតផ្លូវ 🔬 ⧽≻
// ⟨ ឧបករណ៍តែមួយសម្រាប់ឆ្លើយសំណួរអំពីកម្ពស់ផ្លូវ ។ មុននេះសំណួរនីមួយ ៗ
// មានស្គ្រីបដោយឡែក ( `provo` ដល់ `provo10` ) , ហើយពួកវាចម្លងប្លុកសាងសង់
// ពិភពលោកដូចគ្នា ។ ឥឡូវសំណួរទាំងអស់នៅទីនេះ ៖ ជម្រើសជាពាក្យបញ្ជា ។ 📃 ⟩
//
// ការប្រើ ៖
//   node --import ./iloj/mezurilo/falsdomo.mjs iloj/mezurilo/provo.mjs vojoj
//   node ... provo.mjs profilo 12 [ជំហាន]
//   node ... provo.mjs kruda 12 [ជំហាន]
//   node ... provo.mjs tereno 92 -60 [ជំហាន] [កាំ]
//   node ... provo.mjs punkto 92 -60
//   node ... provo.mjs nivelo
//
// ⟨ ការវាស់ត្រូវអានពិភពលោកតែម្តង 📏 ⟩ ៖ ប្លុកសាងសង់ពិភពលោកនៅក្នុង
// `komunaj.ts` ។ ដូច្នេះជម្រើសទាំងអស់វាស់លើពិភពលោកតែមួយ ,
// ហើយលេខរបស់ពួកវាប្រៀបធៀបគ្នាបាន ។ 📃 ⟩
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { kreiNivelanProfilon } from "../../eskekoj/medio/vojoj/niveloj.js";
import { kreiBazanVojoAlton, VOJA_KUNIGA_RADIUSO,
  VOJA_TERA_KLINO } from "../../eskekoj/medio/vojoj/alto.js";
import { VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO,
  surGrid } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";
import { kreiMezuranMondon, punktoCxe, type MezuraMondo } from "./komunaj.js";

const ordono = process.argv[ 2 ] ?? "vojoj";
const nombro = ( i: number, defaŭlto: number ): number => {
  const v = Number(process.argv[ i ]);
  return Number.isFinite(v) ? v : defaŭlto;
};

// ⟪ ជម្រើស `nivelo` ៖ ប្រវត្តិរូបសាកល្បង 📃 ⟫
// ⟨ មិនអានពិភពលោក 📏 ⟩ ៖ ជម្រើសនេះសាងសង់បន្ទាត់សាកល្បង ,
// ដូច្នេះវារត់លឿន ហើយមិនអាស្រ័យលើគ្រាប់ពូជ ។ 📃 ⟩
function nivelo(): void {
  const punktoj: [ number, number ][] = [ [ 0, 0 ], [ 0o12, 0 ] ];
  const h = ( x: number ): number => x * 0.2;
  const p = kreiNivelanProfilon(punktoj, 1.475, h, undefined, [ { x: 5, z: 0, alto: 4 } ]);
  console.log(`ប្រវែង ${p.longo} , គំរូ ${p.altoj.length}`);
  for ( let i = 0; i < p.altoj.length; i += 4 )
    console.log(`  s ${p.situoj[ i ].toFixed(1)}` +
      ` គម្រោង ${p.celoj[ i ].toFixed(2)} កម្រិត ${p.altoj[ i ].toFixed(2)}`);
}

// ⟨ ពិភពលោកត្រូវការសម្រាប់ជម្រើសផ្សេងទៀត 📃 ⟩
let mondo: MezuraMondo | null = null;
const monda = (): MezuraMondo => ( mondo ??= kreiMezuranMondon() );

// ⟪ ជម្រើស `vojoj` ៖ បញ្ជីផ្លូវ 📃 ⟫
function vojoj(): void {
  const m = monda();
  for ( let i = 0; i < m.vojoj.length; i++ ) {
    const v = m.vojoj[ i ];
    const p = m.profiloDe(i);
    let maks = -Infinity, min = Infinity;
    for ( const h of p.altoj ) { maks = Math.max(maks, h); min = Math.min(min, h); }
    const a = m.gluitaj[ i ][ 0 ];
    const b = m.gluitaj[ i ][ m.gluitaj[ i ].length - 1 ];
    console.log(`${i} ${v.nomo} , ( ${a[0].toFixed(0)},${a[1].toFixed(0)} ) ំ` +
      ` ( ${b[0].toFixed(0)},${b[1].toFixed(0)} ) , ប្រវែង ${p.longo.toFixed(1)} ,` +
      ` ទទឹង ${v.larĝo} , កម្រិត ${min.toFixed(1)} ំ ${maks.toFixed(1)}` +
      ` , ចំណុច ${m.gluitaj[ i ].length}`);
  }
}

// ⟪ ជម្រើស `profilo` ៖ កម្រិតតាមបណ្តោយផ្លូវ 📃 ⟫
function profilo(): void {
  const m = monda();
  const i = nombro(3, 0);
  const v = m.vojoj[ i ];
  if ( !v ) { console.log(`គ្មានផ្លូវ ${i}`); return; }
  const paŝo = nombro(4, 2);
  const p = m.profiloDe(i);
  console.log(`${i} ${v.nomo} , ចំណុច ${m.gluitaj[ i ].length}` +
    ` , ប្រវែង ${p.longo} , ចំណុចភ្ជាប់ ${m.ankroj.length}`);
  console.log("  ចំណុចភ្ជាប់ " + m.ankroj.map(k =>
    `( ${k.x.toFixed(1)},${k.z.toFixed(1)} )=${k.alto}`).join(" "));
  const hako = Math.max(1, Math.round(paŝo / ( p.longo / ( p.altoj.length - 1 ) )));
  const linioj: string[] = [];
  for ( let j = 0; j < p.altoj.length; j += hako ) {
    const q = punktoCxe(m.gluitaj[ i ], p.situoj[ j ]);
    linioj.push(`${p.situoj[ j ].toFixed(0)} ( ${q.x.toFixed(0)},${q.z.toFixed(0)} )` +
      ` ក ${p.altoj[ j ].toFixed(1)} គ ${p.celoj[ j ].toFixed(1)} ដ ${alteco(q.x, q.z).toFixed(1)}`);
  }
  console.log("  " + linioj.join(" | "));
}

// ⟪ ជម្រើស `kruda` ៖ ជំហានគណនាកម្រិត 📃 ⟫
// ⟨ អានពីប្រវត្តិរូបផ្ទាល់ 📏 ⟩ ៖ មុននេះស្គ្រីបគណនាជំហានទាំងនេះឡើងវិញ ,
// ដូច្នេះលេខរបស់វាអាចខុសពីហ្គេម ។ ឥឡូវអាន `centraj` និង `glataj` ពីប្រវត្តិរូប ។ 📃 ⟩
function kruda(): void {
  const m = monda();
  const i = nombro(3, 0);
  const v = m.vojoj[ i ];
  if ( !v ) { console.log(`គ្មានផ្លូវ ${i}`); return; }
  const paŝo = nombro(4, 2);
  const p = m.profiloDe(i);
  const disto = p.longo / ( p.altoj.length - 1 );
  console.log(`ផ្លូវ ${i} ${v.nomo} , ប្រវែង ${p.longo}` +
    ` , គំរូ ${p.altoj.length} , ចន្លោះ ${disto.toFixed(3)}`);
  for ( let j = 0; j < p.altoj.length; j += paŝo ) {
    const q = punktoCxe(m.gluitaj[ i ], p.situoj[ j ]);
    const proksimaj = m.ankroj
      .map(k => ( { k, d: Math.hypot(k.x - q.x, k.z - q.z) } ))
      .sort((a, b) => a.d - b.d).slice(0, 2);
    console.log(`  ${j} s ${p.situoj[ j ].toFixed(2)} ( ${q.x.toFixed(1)},${q.z.toFixed(1)} )` +
      ` ដ ${alteco(q.x, q.z).toFixed(2)} វាល ${m.vojoAlteco(q.x, q.z).toFixed(2)}` +
      ` កណ្ត ${p.centraj[ j ].toFixed(2)} គែម ${p.glataj[ j ].toFixed(2)}` +
      ` គ ${p.celoj[ j ].toFixed(2)} ក ${p.altoj[ j ].toFixed(2)}` +
      ` ចាន ${proksimaj.map(x => `${x.k.alto.toFixed(1)}@${x.d.toFixed(1)}`).join(" ")}`);
  }
}

// ⟪ ជម្រើស `tereno` ៖ កម្ពស់ដីជុំវិញចំណុច 📃 ⟫
function tereno(): void {
  const X = nombro(3, 0), Z = nombro(4, 0);
  const paŝo = nombro(5, 0.5), radio = nombro(6, 3);
  for ( let dz = -radio; dz <= radio + 0o10 ** -0o11; dz += paŝo ) {
    const vico: string[] = [];
    for ( let dx = -radio; dx <= radio + 0o10 ** -0o11; dx += paŝo )
      vico.push(alteco(X + dx, Z + dz).toFixed(1));
    console.log(`${( Z + dz ).toFixed(1)} ${vico.join(" ")}`);
  }
  console.log(`កណ្តាល ${alteco(X, Z).toFixed(2)}`);
}

// ⟪ ជម្រើស `punkto` ៖ ហេតុអ្វីចានខ្ពស់ 📃 ⟫
function punkto(): void {
  const X = nombro(3, 0), Z = nombro(4, 0);
  const m = monda();
  const baza = kreiBazanVojoAlton(alteco);
  console.log(`ចំណុចភ្ជាប់ ${m.ankroj.length}`);
  console.log(`ដី ${alteco(X, Z).toFixed(2)} មូល ${baza(X, Z).toFixed(2)}` +
    ` វាល ${m.vojoAlteco(X, Z).toFixed(2)}`);
  console.log(`ចានពីវាល ${m.platoCxe(X, Z).toFixed(2)}` +
    ` , ចានពីមូល ${surGrid(vojaSuproDeKunigo(X, Z, [], VOJA_EKSTERA_DUONO, baza).supro).toFixed(2)}` +
    ` , ចានពីដី ${surGrid(vojaSuproDeKunigo(X, Z, [], VOJA_EKSTERA_DUONO, alteco).supro).toFixed(2)}`);
  const proksimaj = m.kunigajPunktoj
    .map(([ x, z ]) => ( { x, z, d: Math.hypot(x - X, z - Z) } ))
    .sort((a, b) => a.d - b.d).slice(0, 0o14);
  for ( const k of proksimaj ) {
    const propra = surGrid(vojaSuproDeKunigo(k.x, k.z, [], VOJA_EKSTERA_DUONO, baza).supro)
      - VOJA_SUPRO_LEVIGXO;
    const kon = propra - VOJA_TERA_KLINO * Math.max(0, k.d - VOJA_KUNIGA_RADIUSO);
    console.log(`  ( ${k.x.toFixed(1)},${k.z.toFixed(1)} ) d ${k.d.toFixed(2)}` +
      ` ដី ${alteco(k.x, k.z).toFixed(2)} មូល ${baza(k.x, k.z).toFixed(2)}` +
      ` កំពូល ${propra.toFixed(2)} កោណ ${kon.toFixed(2)}` +
      ` វាល ${m.vojoAlteco(k.x, k.z).toFixed(2)}`);
  }
}

const ordonoj: Record<string, () => void> = {
  vojoj, profilo, kruda, tereno, punkto, nivelo,
};
const elektita = ordonoj[ ordono ];
if ( !elektita ) {
  console.log(`ជម្រើសមិនស្គាល់ "${ordono}" ។ មាន ៖ ${Object.keys(ordonoj).join(" , ")}`);
  process.exitCode = 1;
} else {
  elektita();
}
