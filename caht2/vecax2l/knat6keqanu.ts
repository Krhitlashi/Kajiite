// ≺⧼ ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ʌ ſɭɜ ſɭ,w ʌ ſ͕ɭɔ }ʃᴜ ʌ j͑ʃɔ }ʃᴜȝ }ʃꞇ 📏 ⧽≻
// ⟨ ſɟᴜ ſȷᴜɔ˞ ʌ ſɭᴜc̗ ɭʃɜ ʌ ꞙɭц ʌ ſɟᴜᴜ̩ ɭʃɹ ⟅ j͐ʃэ ɭ(ᴜ ꞙɭɿэ/ꞙɭıɔ ʌ ſɭэ ֭ſɭэ ( ꞙɭэ/ꞙɭıɔ )
// ꞙɭɔ ⟅ ſɭэ ֭ſɭэ ʌ j͑ʃ'ƽɹʞ ʌ ſɭɜ ſɭ,w , ꞙɭɔ ʌ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ 📃 ⟩
import { tikHak6h6 } from "../../kanta/t6lima-havop2/tlohk2nikziisai.js";
import { l6da } from "../../kanta/nala/t6limaSoza.js";
import { kf2NivelanS2qena } from "../../skek2/qatsiike/hak6h6/havem2.js";
import { K6H6ABORDASEFINI } from "../../skek2/qatsiike/hak6h6/havecax2l.js";

const YTROIGO = 0o24 / 0o10; // ɿ.ꞟ , ſɭɹ ʌ hacaht2/t6lima-knat6keqanu/t6lima-knat6keqanu/kix23d.ts
const HAKAS2KANTA = tikHak6h6().filter(v => v.n2k.length >= 0o2);

for (let i = 0o0; i < HAKAS2KANTA.length; i++) {
  const v = HAKAS2KANTA[i] as any;
  const p2somani = (v.c2kanuSefini ?? v.sefini) / 0o4 + K6H6ABORDASEFINI;
  const n2k = v.n2k as [ number, number ][];
  const p = kf2NivelanS2qena(n2k, p2somani, (x, z) => l6da(x, z) * YTROIGO);
  let teru = 0o0, psaz = 0o0, hidden = 0o0, tlunakani = 0o0;
  for (let j = 0o0; j < p.hal6da.length; j++) {
    const s = p.haxekuxa[j];
    let kur = 0o0, q: [ number, number ] = n2k[ 0o0 ];
    for (let k = 0o0; k < n2k.length - 0o1; k++) {
      const [ x1, z1 ] = n2k[ k ], [ x2, z2 ] = n2k[ k + 0o1 ];
      const lo = Math.hypot(x2 - x1, z2 - z1);
      if (s <= kur + lo || k === n2k.length - 0o2) {
        const t = lo < 0o10 ** -0o12 ? 0o0 : Math.max(0o0, Math.min(0o1, ( s - kur ) / lo));
        q = [ x1 + ( x2 - x1 ) * t, z1 + ( z2 - z1 ) * t ];
        break;
      }
      kur += lo;
    }
    const d = p.hal6da[j] - l6da(q[0o0], q[0o1]) * YTROIGO;
    tlunakani += d;
    if (d > 0o0) teru++; else { psaz++; if (-d > 0o1/0o2) hidden++; }
  }
  console.log(`${i} ${v.ksaka} ｡ ſɭɜ ſɭ,w ${teru} ｡ ſɭɜ ſɭ,w ʌ ꞙɭɔ ${psaz} ｡ ſɭɜ ſɭ,w ʌ ꞙɭı ${hidden}` +
    ` / ${p.hal6da.length} , ſȷƽᴜ ɭʃᴜ ${(tlunakani / p.hal6da.length).toFixed(0o2)}`);
}
