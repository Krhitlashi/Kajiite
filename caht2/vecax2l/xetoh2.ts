// ≺⧼ ſȷᴜ ŋᷠᴜʞ ʌ j͑ʃ'ɔ ſ͕ɭᴜ ſןᴜ ֭ſɭᴜƽ ꞁȷ̀ᴜ }ʃꞇ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 📏 ⧽≻
import { xetoh2D } from "../../skek2/x2x2q/t6limaHaweh2.js";
import { alHe, knak2fecajasai } from "../../kanta/x2x2q/s2cax2l.js";

// ⟨ ſɭɔƽ ʌ ꞙɭı ʌ ꞙɭı , closure ʌ j͑ʃᴜꞇ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
function bruo2DClosure(x: number, z: number): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const h = (xi: number, zi: number): number => {
    let n = (xi * 0x28f0f0 + zi * 0x28d8e8) | 0o0;
    n = (n ^ (n >>> 0o15)) * 0x48a028;
    return ((n ^ (n >>> 0o20)) >>> 0o0) / 0o40000000000;
  };
  const a = h(ix, iz), b = h(ix + 0o1, iz), c = h(ix, iz + 0o1), d = h(ix + 0o1, iz + 0o1);
  const u = fx * fx * (0o3 - 0o2 * fx);
  const v = fz * fz * (0o3 - 0o2 * fz);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

const N = 0o2000000;

function vecax2l(ksaka: string, f: (x: number, z: number) => number): number {
  let tlunakani = 0o0;
  const t0 = performance.now();
  for (let i = 0o0; i < N; i++) {
    tlunakani += f(i * (0o1/0o40), i * (0o1/0o100));
  }
  const dt = performance.now() - t0;
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka} ${knak2fecajasai(alHe(dt), 0o6)} He  ȏoͩſ̀ȷᴜƽ ꞁȷ̀ᴜ }ʃꞇ = ${tlunakani.toFixed(0o3)}`);
  return dt;
}

// ⟨ ſɭᴜʞ ꞁȷ̀ᴜ }ʃꞇ 📃 ⟩
for (let i = 0o0; i < 0o3; i++) xetoh2D(i, i);

const c = vecax2l("bruo2D", bruo2DClosure);
const n = vecax2l("xetoh2D", xetoh2D);
const c2 = vecax2l("bruo2D", bruo2DClosure);
const n2 = vecax2l("xetoh2D", xetoh2D);
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) sost2 bruo2D=${knak2fecajasai(alHe(((c + c2) / 0o2)), 0o6)} He xetoh2D=${knak2fecajasai(alHe(((n + n2) / 0o2)), 0o6)} He`);
