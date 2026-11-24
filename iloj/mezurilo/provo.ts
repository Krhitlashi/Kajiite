// ≺⧼ ſɭэ ֭ſɭэ ʌ j͐ʃɹ ŋᷠɔ 🔬 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ſɭэ ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
//
// ſɭᴜ ſןᴜ ,
//   node --import ./iloj/mezurilo/falsdomo.mjs iloj/mezurilo/provo.mjs hak6h6
//   ꞙɭı , ꞙɭɿ ,
//   ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭɿ ,
//   ſɭᴜ ſןᴜ , ꞙɭɿ , ꞙɭɩɔ ,
//   node ... provo.mjs n2k 92 -ɩɔ
//   node ... provo.mjs vem2
//
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📏 ⟩ ,
// ſɭэ ſɭᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
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

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , 📏 ⟩ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
function vem2(): void {
  const n2k: [ number, number ][] = [ [ 0, 0 ], [ 0o12, 0 ] ];
  const h = ( x: number ): number => x * 0.2;
  const p = kf2NivelanProfilon(n2k, 1.475, h, undefined, [ { x: 5, z: 0, l6da: 4 } ]);
  console.log(`ſɭэ }ʃᴜ ${p.sahakani} ｡ ſᶘᴜ j͐ʃɹ ${p.hal6da.length}`);
  for ( let i = 0; i < p.hal6da.length; i += 4 )
    console.log(`  s ${p.haxekuxa[ i ].toFixed(1)}` +
      ` ｡ ſɭэ ֭ſɭэ ʌ j͑ʃ'ɔ ŋᷠɹ ${p.celoj[ i ].toFixed(2)} ｡ j͑ʃ'ɔ ŋᷠɹ ${p.hal6da[ i ].toFixed(2)}`);
}

// ⟨ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟩
let mondo: MezuraMondo | null = null;
const monda = (): MezuraMondo => ( mondo ??= kf2MezuranMondon() );

// ⟪ ſɭэ ֭ſɭэ , 📃 ⟫
function hak6h6(): void {
  const m = monda();
  for ( let i = 0; i < m.hak6h6.length; i++ ) {
    const v = m.hak6h6[ i ];
    const p = m.profiloDe(i);
    let maks = -Infinity, min = Infinity;
    for ( const h of p.hal6da ) { maks = Math.max(maks, h); min = Math.min(min, h); }
    const a = m.gluitaj[ i ][ 0 ];
    const b = m.gluitaj[ i ][ m.gluitaj[ i ].length - 1 ];
    console.log(`${i} ${v.ksaka} ｡ ( ${a[0].toFixed(0)},${a[1].toFixed(0)} ) ｡` +
      ` ( ${b[0].toFixed(0)},${b[1].toFixed(0)} ) ｡ ſɭэ }ʃᴜ ${p.sahakani.toFixed(1)} ｡` +
      ` j͑ʃɔ ſȷꞇ }ʃꞇ ${v.sefini} ｡ j͑ʃ'ɔ ŋᷠɹ ${min.toFixed(1)} ｡ ${maks.toFixed(1)}` +
      ` ｡ }ʃɹƽ ${m.gluitaj[ i ].length}`);
  }
}

// ⟪ ſɭэ ֭ſɭэ , ꞙɭı , 📃 ⟫
function s2qena(): void {
  const m = monda();
  const i = nombro(3, 0);
  const v = m.hak6h6[ i ];
  if ( !v ) { console.log(`ſןɔ ʌ ſɭэ ֭ſɭэ ${i}`); return; }
  const tona = nombro(4, 2);
  const p = m.profiloDe(i);
  console.log(`${i} ${v.ksaka} ｡ }ʃɹƽ ${m.gluitaj[ i ].length}` +
    ` ｡ ſɭэ }ʃᴜ ${p.sahakani} ｡ ſɟɹƽ ${m.ankroj.length}`);
  console.log("  ſɟɹƽ " + m.ankroj.map(k =>
    `( ${k.x.toFixed(1)},${k.z.toFixed(1)} )=${k.l6da}`).join(" "));
  const hako = Math.max(1, Math.round(tona / ( p.sahakani / ( p.hal6da.length - 1 ) )));
  const linioj: string[] = [];
  for ( let j = 0; j < p.hal6da.length; j += hako ) {
    const q = punktoCxe(m.gluitaj[ i ], p.haxekuxa[ j ]);
    linioj.push(`${p.haxekuxa[ j ].toFixed(0)} ( ${q.x.toFixed(0)},${q.z.toFixed(0)} )` +
      ` ｡ j͑ʃ'ɔ ŋᷠɹ ${p.hal6da[ j ].toFixed(1)} ｡ }ʃɹƽ ʌ j͑ʃ'ɔ ŋᷠɹ ${p.celoj[ j ].toFixed(1)} ｡ ſɭɜ ſɭ,w ${alteco(q.x, q.z).toFixed(1)}`);
  }
  console.log("  " + linioj.join(" | "));
}

// ⟪ ſɭэ ֭ſɭэ , ꞙɭɿ , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , 📏 ⟩ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
function kruda(): void {
  const m = monda();
  const i = nombro(3, 0);
  const v = m.hak6h6[ i ];
  if ( !v ) { console.log(`ſןɔ ʌ ſɭэ ֭ſɭэ ${i}`); return; }
  const tona = nombro(4, 2);
  const p = m.profiloDe(i);
  const h6kuni = p.sahakani / ( p.hal6da.length - 1 );
  console.log(`ſɭэ ֭ſɭэ ${i} ${v.ksaka} ｡ ſɭэ }ʃᴜ ${p.sahakani}` +
    ` ｡ ſᶘᴜ j͐ʃɹ ${p.hal6da.length} ｡ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ${h6kuni.toFixed(3)}`);
  for ( let j = 0; j < p.hal6da.length; j += tona ) {
    const q = punktoCxe(m.gluitaj[ i ], p.haxekuxa[ j ]);
    const proksimaj = m.ankroj
      .map(k => ( { k, d: Math.hypot(k.x - q.x, k.z - q.z) } ))
      .sort((a, b) => a.d - b.d).slice(0, 2);
    console.log(`  ${j} s ${p.haxekuxa[ j ].toFixed(2)} ( ${q.x.toFixed(1)},${q.z.toFixed(1)} )` +
      ` ｡ ſɭɜ ſɭ,w ${alteco(q.x, q.z).toFixed(2)} ｡ ᶅſɔ ɽ͑ʃ'ɔ ${m.k6h6Alteco(q.x, q.z).toFixed(2)}` +
      ` ｡ j͑ʃɜ j͑ʃƨɹ ${p.centraj[ j ].toFixed(2)} ｡ ſןw ſɭᴜƴ ${p.glataj[ j ].toFixed(2)}` +
      ` ｡ }ʃɹƽ ʌ j͑ʃ'ɔ ŋᷠɹ ${p.celoj[ j ].toFixed(2)} ｡ j͑ʃ'ɔ ŋᷠɹ ${p.hal6da[ j ].toFixed(2)}` +
      ` ｡ ſןᴜ ſᶘɹ ${proksimaj.map(x => `${x.k.l6da.toFixed(1)}@${x.d.toFixed(1)}`).join(" ")}`);
  }
}

// ⟪ ſɭɜ ſɭ,w , ꞙɭı , 📃 ⟫
function tereno(): void {
  const X = nombro(3, 0), Z = nombro(4, 0);
  const tona = nombro(5, 0.5), radio = nombro(6, 3);
  for ( let dz = -radio; dz <= radio + 0o10 ** -0o11; dz += tona ) {
    const x2pa: string[] = [];
    for ( let dx = -radio; dx <= radio + 0o10 ** -0o11; dx += tona )
      x2pa.push(alteco(X + dx, Z + dz).toFixed(1));
    console.log(`${( Z + dz ).toFixed(1)} ${x2pa.join(" ")}`);
  }
  console.log(`j͑ʃɜ j͑ʃƨɹ ${alteco(X, Z).toFixed(2)}`);
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
function n2k(): void {
  const X = nombro(3, 0), Z = nombro(4, 0);
  const m = monda();
  const baza = kf2BazanK6h6Alton(alteco);
  console.log(`ſɟɹƽ ${m.ankroj.length}`);
  console.log(`ſɭɜ ſɭ,w ${alteco(X, Z).toFixed(2)} ｡ ɭl̀ᴜȝ ſןᴜ ɭʃɔ ${baza(X, Z).toFixed(2)}` +
    ` ｡ ᶅſɔ ɽ͑ʃ'ɔ ${m.k6h6Alteco(X, Z).toFixed(2)}`);
  console.log(`ſןᴜ ſᶘɹ ʌ ᶅſɔ ɽ͑ʃ'ɔ ${m.pa12Cxe(X, Z).toFixed(2)}` +
    ` ｡ ſןᴜ ſᶘɹ ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ ${surGrid(k6h6SuproDeVeb6kek(X, Z, [], VOJA_EKSTERA_DUONO, baza).hateru).toFixed(2)}` +
    ` ｡ ſןᴜ ſᶘɹ ʌ ſɭɜ ſɭ,w ${surGrid(k6h6SuproDeVeb6kek(X, Z, [], VOJA_EKSTERA_DUONO, alteco).hateru).toFixed(2)}`);
  const proksimaj = m.kunigajPunktoj
    .map(([ x, z ]) => ( { x, z, d: Math.hypot(x - X, z - Z) } ))
    .sort((a, b) => a.d - b.d).slice(0, 0o14);
  for ( const k of proksimaj ) {
    const propra = surGrid(k6h6SuproDeVeb6kek(k.x, k.z, [], VOJA_EKSTERA_DUONO, baza).hateru)
      - VOJA_SUPRO_LEVIGXO;
    const kon = propra - VOJA_TERA_KLINO * Math.max(0, k.d - VOJA_KUNIGA_RADIUSO);
    console.log(`  ( ${k.x.toFixed(1)},${k.z.toFixed(1)} ) d ${k.d.toFixed(2)}` +
      ` ｡ ſɭɜ ſɭ,w ${alteco(k.x, k.z).toFixed(2)} ｡ ɭl̀ᴜȝ ſןᴜ ɭʃɔ ${baza(k.x, k.z).toFixed(2)}` +
      ` ｡ ſןͷ̗ɜ j͑ʃƨɔȝ ${propra.toFixed(2)} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ ${kon.toFixed(2)}` +
      ` ｡ ᶅſɔ ɽ͑ʃ'ɔ ${m.k6h6Alteco(k.x, k.z).toFixed(2)}`);
  }
}

const ordonoj: Record<string, () => void> = {
  hak6h6, s2qena, kruda, tereno, n2k, vem2,
};
const elektita = ordonoj[ ordono ];
if ( !elektita ) {
  console.log(`ſɭэ ɭʃɜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ "${ordono}" ⟅ ſɭɹ ſᶘɔ ｡ ${Object.keys(ordonoj).join(" , ")}`);
  process.exitCode = 1;
} else {
  elektita();
}
