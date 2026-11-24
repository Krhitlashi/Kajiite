// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ֭ſɭᴜ ſ͔ɭᴜ ʌ ſןᴜ j͐ʃэ 📏 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı , ⟅ ſɭэ ſɭᴜ , j͑ʃᴜ ſɭ,w ,
// ſɭɜ ſɭ,w , ꞙɭɿ , ſɭɜ ſɭ,w , ꞙɭı ,
// j͑ʃᴜ ſɭ,w , ꞙɭı , ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭı , 📃 ⟩
import "./falsdomo.mjs";
import * as THREE from "three";
import { vepaqKaxten } from "../../kantaoj/mondo/kaxte.js";
import { kf2T6g6Pukek, kf2T6hnaPukek,
  kf2Cah6k6Pukek, kf2KuhalPukek } from "../../eskekoj/komunajxoj/materialoj.js";
import { vojSuprajxoj } from "../../eskekoj/medio/hak6h6/hahunaq.js";
import { rampaKuro, STUPA_RAMPO_KURO, VOJA_STUPA_RAMPO } from "../../eskekoj/medio/hak6h6/havecax2l.js";

// ⟪ ֭ſɭᴜ ſ͔ɭᴜ , ꞙɭı , 📏 ⟫
// ⟨ ſןɔ˞ᴜƴ , ꞙɭı , ⟅ ꞙɭɿ , ꞙɭı , ꞙɭı , 📃 ⟩
const DEKLIVO_LIMO = 0o1 / VOJA_STUPA_RAMPO + 0o1 / 0o20;
const KURO_TOLERO = 0o1 / 0o40;

const qena = new THREE.Scene();
const teksturo = new THREE.Texture();
vojSuprajxoj.length = 0;
await vepaqKaxten(qena,
  kf2T6g6Pukek(teksturo), kf2T6hnaPukek(teksturo),
  kf2Cah6k6Pukek(), kf2KuhalPukek(0xd8b068), () => {});

interface Rampo { fala: number; kuro: number; haga: number; x: number; z: number }
const rampoj: Rampo[] = [];
let glataj = 0;
for ( const kek of vojSuprajxoj ) {
  const kuro = Math.hypot(kek.x2 - kek.x1, kek.z2 - kek.z1);
  const fala = Math.abs(kek.y1 - kek.y0);
  if ( fala < 0o1 / 0o1000 || kuro < 0o1 / 0o1000 ) continue;
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ſɭ,w , 📃 ⟩ , ſȷƽᴜ ʃɔ , ꞙɭı ,
// ſɭэ ɭʃᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
  if ( kek.rampo !== true ) { glataj++; continue; }
  rampoj.push({ fala, kuro, haga: fala / kuro,
    x: ( kek.x1 + kek.x2 ) / 0o2, z: ( kek.z1 + kek.z2 ) / 0o2 });
}
rampoj.sort(( p, q ) => q.haga - p.haga);

// ⟨ ſɭэ ſɭᴜ , j͑ʃᴜ ſɭ,w , 📏 ⟩ , ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭэ ſɭᴜ , ꞙɭɿ , ꞙɭı , ꞙɭı , 📃 ⟩
const troaj = rampoj.filter(r => r.haga > DEKLIVO_LIMO);
const premitaj = rampoj.filter(r => rampaKuro(r.fala) - r.kuro > KURO_TOLERO);
const haga = [ ...new Set(rampoj.map(r => r.haga.toFixed(0o2))) ].sort();
const plej = rampoj[0];

console.log( `ſɭᴜc̗ ɭʃɜ ʌ ɭʃɜ }ʃᴜ ${rampoj.length} ｡ j͑ʃɜ ſɭ,ᴜ ı],ᴜ ֭ſɭᴜ ${glataj} ｡ ɭl̀ᴜ ʌ ſןw ſɭᴜƴ ʌ ɭʃɜ }ʃᴜ ${troaj.length}` +
  ` ｡ ſןw ſɭᴜƴ ɭl̀ᴜ ſןͷ̗ɜ j͑ʃƨɔȝ ${( plej?.haga ?? 0 ).toFixed(2)}` +
  ( plej ? ` @${plej.x.toFixed(1)},${plej.z.toFixed(1)}` : "" ) );
console.log( `ſןw ſɭᴜƴ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${haga.length} [ ${haga.slice(0, 0o10).join(" ")} ]` +
  ` ｡ ſɭэ }ʃᴜ ʌ ֭ſɭᴜ ſ͔ɭᴜ ʌ ſɭɹ ſᶘɔ ${STUPA_RAMPO_KURO.toFixed(2)}` );
console.log( `֭ſɭᴜ ſ͔ɭᴜ ʌ j͑ʃɔ ſȷꞇ }ʃꞇ ŋᷠɹ ${premitaj.length}` );
for ( const r of troaj.slice(0, 0o10) )
  console.log( `  ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ſᶘɔ j͐ʃɹ j͑ʃᴜꞇ ｡ j͐ʃᴜɔ˞ ${r.fala.toFixed(2)} ｡ ſɭэ ɭʃᴜ ${r.kuro.toFixed(3)}` +
    ` ｡ ſןw ſɭᴜƴ ${r.haga.toFixed(2)} @${r.x.toFixed(1)},${r.z.toFixed(1)}` );

const bona = troaj.length === 0 && premitaj.length === 0 && rampoj.length > 0;
console.log( bona ? "ſןᴜ j͐ʃэ ʌ ֭ſɭᴜ ſ͔ɭᴜ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ" :
  `ſןᴜ j͐ʃэ ʌ ֭ſɭᴜ ſ͔ɭᴜ ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${troaj.length + premitaj.length}` );
