// ≺⧼ ſɭэ ֭ſɭэ ʌ j͐ʃɹ ŋᷠɔ 🔬 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ſɭэ ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
//
// ſɭᴜ ſןᴜ ,
//   node --import ./caht2/vecax2l/ceh2kap2.mjs hacaht2/vecax2l/tsaletsa.mjs hak6h6
//   ꞙɭı , ꞙɭɿ ,
//   ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭɿ ,
//   ſɭᴜ ſןᴜ , ꞙɭɿ , ꞙɭɩɔ ,
//   node ... tsaletsa.mjs n2k 92 -ɩɔ
//   node ... tsaletsa.mjs vem2
//
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📏 ⟩ ,
// ſɭэ ſɭᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
import { l6da } from "../../kanta/nala/t6limaSoza.js";
import { kf2NivelanS2qena } from "../../skek2/qatsiike/hak6h6/havem2.js";
import { kf2BazanK6h6L6dan, K6H6AVEB6KEKARADIUSO,
  K6H6ATERAKLINO } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { K6H6AEKSTERAP2SOMANI, K6H6AKMARL6DA,
  surGrid } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { k6h6TeruDeVeb6kek } from "../../skek2/qatsiike/hak6h6/haqoxa.js";
import { kf2Vecax2lanNala, n2kJe, type Vecax2laNala } from "./x2x2q.js";

const ordono = process.argv[ 2 ] ?? "hak6h6";
const k2fe = ( i: number, defaŭlto: number ): number => {
  const v = Number(process.argv[ i ]);
  return Number.isFinite(v) ? v : defaŭlto;
};

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , 📏 ⟩ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
function vem2(): void {
  const n2k: [ number, number ][] = [ [ 0, 0 ], [ 0o12, 0 ] ];
  const h = ( x: number ): number => x * 0.2;
  const p = kf2NivelanS2qena(n2k, 1.475, h, undefined, [ { x: 5, z: 0, l6da: 4 } ]);
  console.log(`ſɭэ }ʃᴜ ${p.sahakani} ｡ ſᶘᴜ j͐ʃɹ ${p.hal6da.length}`);
  for ( let i = 0; i < p.hal6da.length; i += 4 )
    console.log(`  s ${p.haxekuxa[ i ].toFixed(1)}` +
      ` ｡ ſɭэ ֭ſɭэ ʌ j͑ʃ'ɔ ŋᷠɹ ${p.hakxawa[ i ].toFixed(2)} ｡ j͑ʃ'ɔ ŋᷠɹ ${p.hal6da[ i ].toFixed(2)}`);
}

// ⟨ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟩
let nala: Vecax2laNala | null = null;
const nalan = (): Vecax2laNala => ( nala ??= kf2Vecax2lanNala() );

// ⟪ ſɭэ ֭ſɭэ , 📃 ⟫
function hak6h6(): void {
  const m = nalan();
  for ( let i = 0; i < m.hak6h6.length; i++ ) {
    const v = m.hak6h6[ i ];
    const p = m.s2qenaDe(i);
    let maks = -Infinity, min = Infinity;
    for ( const h of p.hal6da ) { maks = Math.max(maks, h); min = Math.min(min, h); }
    const a = m.hascac6[ i ][ 0 ];
    const b = m.hascac6[ i ][ m.hascac6[ i ].length - 1 ];
    console.log(`${i} ${v.ksaka} ｡ ( ${a[0].toFixed(0)},${a[1].toFixed(0)} ) ｡` +
      ` ( ${b[0].toFixed(0)},${b[1].toFixed(0)} ) ｡ ſɭэ }ʃᴜ ${p.sahakani.toFixed(1)} ｡` +
      ` j͑ʃɔ ſȷꞇ }ʃꞇ ${v.sefini} ｡ j͑ʃ'ɔ ŋᷠɹ ${min.toFixed(1)} ｡ ${maks.toFixed(1)}` +
      ` ｡ }ʃɹƽ ${m.hascac6[ i ].length}`);
  }
}

// ⟪ ſɭэ ֭ſɭэ , ꞙɭı , 📃 ⟫
function s2qena(): void {
  const m = nalan();
  const i = k2fe(3, 0);
  const v = m.hak6h6[ i ];
  if ( !v ) { console.log(`ſןɔ ʌ ſɭэ ֭ſɭэ ${i}`); return; }
  const tona = k2fe(4, 2);
  const p = m.s2qenaDe(i);
  console.log(`${i} ${v.ksaka} ｡ }ʃɹƽ ${m.hascac6[ i ].length}` +
    ` ｡ ſɭэ }ʃᴜ ${p.sahakani} ｡ ſɟɹƽ ${m.hacakukkaj2sai.length}`);
  console.log("  ſɟɹƽ " + m.hacakukkaj2sai.map(k =>
    `( ${k.x.toFixed(1)},${k.z.toFixed(1)} )=${k.l6da}`).join(" "));
  const hako = Math.max(1, Math.round(tona / ( p.sahakani / ( p.hal6da.length - 1 ) )));
  const hax2pa: string[] = [];
  for ( let j = 0; j < p.hal6da.length; j += hako ) {
    const q = n2kJe(m.hascac6[ i ], p.haxekuxa[ j ]);
    hax2pa.push(`${p.haxekuxa[ j ].toFixed(0)} ( ${q.x.toFixed(0)},${q.z.toFixed(0)} )` +
      ` ｡ j͑ʃ'ɔ ŋᷠɹ ${p.hal6da[ j ].toFixed(1)} ｡ }ʃɹƽ ʌ j͑ʃ'ɔ ŋᷠɹ ${p.hakxawa[ j ].toFixed(1)} ｡ ſɭɜ ſɭ,w ${l6da(q.x, q.z).toFixed(1)}`);
  }
  console.log("  " + hax2pa.join(" | "));
}

// ⟪ ſɭэ ֭ſɭэ , ꞙɭɿ , 📃 ⟫
// ⟨ ſɭᴜ ſןᴜ , 📏 ⟩ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
function kruda(): void {
  const m = nalan();
  const i = k2fe(3, 0);
  const v = m.hak6h6[ i ];
  if ( !v ) { console.log(`ſןɔ ʌ ſɭэ ֭ſɭэ ${i}`); return; }
  const tona = k2fe(4, 2);
  const p = m.s2qenaDe(i);
  const h6kuni = p.sahakani / ( p.hal6da.length - 1 );
  console.log(`ſɭэ ֭ſɭэ ${i} ${v.ksaka} ｡ ſɭэ }ʃᴜ ${p.sahakani}` +
    ` ｡ ſᶘᴜ j͐ʃɹ ${p.hal6da.length} ｡ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ${h6kuni.toFixed(3)}`);
  for ( let j = 0; j < p.hal6da.length; j += tona ) {
    const q = n2kJe(m.hascac6[ i ], p.haxekuxa[ j ]);
    const tsiike = m.hacakukkaj2sai
      .map(k => ( { k, d: Math.hypot(k.x - q.x, k.z - q.z) } ))
      .sort((a, b) => a.d - b.d).slice(0, 2);
    console.log(`  ${j} s ${p.haxekuxa[ j ].toFixed(2)} ( ${q.x.toFixed(1)},${q.z.toFixed(1)} )` +
      ` ｡ ſɭɜ ſɭ,w ${l6da(q.x, q.z).toFixed(2)} ｡ ᶅſɔ ɽ͑ʃ'ɔ ${m.k6h6L6da(q.x, q.z).toFixed(2)}` +
      ` ｡ j͑ʃɜ j͑ʃƨɹ ${p.centraj[ j ].toFixed(2)} ｡ ſןw ſɭᴜƴ ${p.glataj[ j ].toFixed(2)}` +
      ` ｡ }ʃɹƽ ʌ j͑ʃ'ɔ ŋᷠɹ ${p.hakxawa[ j ].toFixed(2)} ｡ j͑ʃ'ɔ ŋᷠɹ ${p.hal6da[ j ].toFixed(2)}` +
      ` ｡ ſןᴜ ſᶘɹ ${tsiike.map(x => `${x.k.l6da.toFixed(1)}@${x.d.toFixed(1)}`).join(" ")}`);
  }
}

// ⟪ ſɭɜ ſɭ,w , ꞙɭı , 📃 ⟫
function kozu(): void {
  const X = k2fe(3, 0), Z = k2fe(4, 0);
  const tona = k2fe(5, 0.5), cabole = k2fe(6, 3);
  for ( let dz = -cabole; dz <= cabole + 0o10 ** -0o11; dz += tona ) {
    const x2pa: string[] = [];
    for ( let dx = -cabole; dx <= cabole + 0o10 ** -0o11; dx += tona )
      x2pa.push(l6da(X + dx, Z + dz).toFixed(1));
    console.log(`${( Z + dz ).toFixed(1)} ${x2pa.join(" ")}`);
  }
  console.log(`j͑ʃɜ j͑ʃƨɹ ${l6da(X, Z).toFixed(2)}`);
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
function n2k(): void {
  const X = k2fe(3, 0), Z = k2fe(4, 0);
  const m = nalan();
  const kozunu = kf2BazanK6h6L6dan(l6da);
  console.log(`ſɟɹƽ ${m.hacakukkaj2sai.length}`);
  console.log(`ſɭɜ ſɭ,w ${l6da(X, Z).toFixed(2)} ｡ ɭl̀ᴜȝ ſןᴜ ɭʃɔ ${kozunu(X, Z).toFixed(2)}` +
    ` ｡ ᶅſɔ ɽ͑ʃ'ɔ ${m.k6h6L6da(X, Z).toFixed(2)}`);
  console.log(`ſןᴜ ſᶘɹ ʌ ᶅſɔ ɽ͑ʃ'ɔ ${m.pa12Je(X, Z).toFixed(2)}` +
    ` ｡ ſןᴜ ſᶘɹ ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ ${surGrid(k6h6TeruDeVeb6kek(X, Z, [], K6H6AEKSTERAP2SOMANI, kozunu).hateru).toFixed(2)}` +
    ` ｡ ſןᴜ ſᶘɹ ʌ ſɭɜ ſɭ,w ${surGrid(k6h6TeruDeVeb6kek(X, Z, [], K6H6AEKSTERAP2SOMANI, l6da).hateru).toFixed(2)}`);
  const tsiike = m.tamc2kHan2k
    .map(([ x, z ]) => ( { x, z, d: Math.hypot(x - X, z - Z) } ))
    .sort((a, b) => a.d - b.d).slice(0, 0o14);
  for ( const k of tsiike ) {
    const propra = surGrid(k6h6TeruDeVeb6kek(k.x, k.z, [], K6H6AEKSTERAP2SOMANI, kozunu).hateru)
      - K6H6AKMARL6DA;
    const kon = propra - K6H6ATERAKLINO * Math.max(0, k.d - K6H6AVEB6KEKARADIUSO);
    console.log(`  ( ${k.x.toFixed(1)},${k.z.toFixed(1)} ) d ${k.d.toFixed(2)}` +
      ` ｡ ſɭɜ ſɭ,w ${l6da(k.x, k.z).toFixed(2)} ｡ ɭl̀ᴜȝ ſןᴜ ɭʃɔ ${kozunu(k.x, k.z).toFixed(2)}` +
      ` ｡ ſןͷ̗ɜ j͑ʃƨɔȝ ${propra.toFixed(2)} ｡ ſ͕ɭɜ ɭʃɹ ı],ɔ ${kon.toFixed(2)}` +
      ` ｡ ᶅſɔ ɽ͑ʃ'ɔ ${m.k6h6L6da(k.x, k.z).toFixed(2)}`);
  }
}

const ordonoj: Record<string, () => void> = {
  hak6h6, s2qena, kruda, kozu, n2k, vem2,
};
const sukf2qita = ordonoj[ ordono ];
if ( !sukf2qita ) {
  console.log(`ſɭэ ɭʃɜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ "${ordono}" ⟅ ſɭɹ ſᶘɔ ｡ ${Object.keys(ordonoj).join(" , ")}`);
  process.exitCode = 1;
} else {
  sukf2qita();
}
