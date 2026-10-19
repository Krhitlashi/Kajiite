// ≺⧼ ការវាស់សមត្ថភាព bruo2D 📏 ⧽≻
import { bruo2D } from "../../eskekoj/komunajxoj/terenkoloroj.js";

// ⟨ បំណែកដូចដើម ដែលមាន closure ក្នុងមួយហៅ 📃 ⟩
function bruo2DClosure(x: number, z: number): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const h = (xi: number, zi: number): number => {
    let n = (xi * 0x28f0f0 + zi * 0x28d8e8) | 0;
    n = (n ^ (n >>> 0o15)) * 0x48a028;
    return ((n ^ (n >>> 0o20)) >>> 0) / 0o40000000000;
  };
  const a = h(ix, iz), b = h(ix + 1, iz), c = h(ix, iz + 1), d = h(ix + 1, iz + 1);
  const u = fx * fx * (3 - 2 * fx);
  const v = fz * fz * (3 - 2 * fz);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

const N = 0o2000000;

function mezuri(nomo: string, f: (x: number, z: number) => number): number {
  let sumo = 0;
  const t0 = performance.now();
  for (let i = 0; i < N; i++) {
    sumo += f(i * 0.03125, i * 0.015625);
  }
  const dt = performance.now() - t0;
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${nomo} ${dt.toFixed(1)}ms  sum=${sumo.toFixed(3)}`);
  return dt;
}

// ⟨ កម្ដៅ 📃 ⟩
for (let i = 0; i < 0o3; i++) bruo2D(i, i);

const c = mezuri("closure", bruo2DClosure);
const n = mezuri("hoistita", bruo2D);
const c2 = mezuri("closure", bruo2DClosure);
const n2 = mezuri("hoistita", bruo2D);
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) mezo closure=${((c + c2) / 2).toFixed(1)}ms hoistita=${((n + n2) / 2).toFixed(1)}ms`);
