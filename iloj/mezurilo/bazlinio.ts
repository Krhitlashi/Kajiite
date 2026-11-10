// ≺⧼ ច្បាប់ចាស់សម្រាប់ A/B 📏 ⧽≻
// ⟨ ច្បាប់ទាំងបួនជាច្បាប់ត្រជាក់ ។ verifiki ពិនិត្យថាកូដហ្គេមបច្ចុប្បន្ន
//   ផ្តល់លេខដូចគ្នា ហើយ komparo វាស់ល្បឿនធៀបនឹងច្បាប់ដដែល ។ ពីមុន
//   ឯកសារទាំងពីរចម្លងច្បាប់ទាំងនេះដោយឡែក ។ ឥឡូវមានតែមួយកន្លែង ។
//   កុំនាំចូលម៉ូឌុលហ្គេមបច្ចុប្បន្នមកទីនេះ ។ បើច្បាប់ហ្គេមប្រែ ច្បាប់
//   នៅទីនេះត្រូវនៅដដែល ទើប A/B នៅមានន័យ ។ 📃 ⟩
import { katmullRom } from "../../kantaoj/komunajxoj/interpolo.js";

// ⟨ កំណែចាស់របស់ bruo2D 📃 ⟩
export function bruo2DMalnova( x: number, z: number ): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const h = ( xi: number, zi: number ): number => {
    let n = ( xi * 0x28f0f0 + zi * 0x28d8e8 ) | 0;
    n = ( n ^ ( n >>> 0o15 ) ) * 0x48a028;
    return ( ( n ^ ( n >>> 0o20 ) ) >>> 0 ) / 0o40000000000;
  };
  const a = h(ix, iz), b = h(ix + 1, iz), c = h(ix, iz + 1), d = h(ix + 1, iz + 1);
  const u = fx * fx * ( 3 - 2 * fx );
  const v = fz * fz * ( 3 - 2 * fz );
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

// ⟨ កំណែចាស់របស់ specimenoBikuba 📃 ⟩
export function bikubaMalnova( krado: Float32Array, n: number, paso: number,
  origino: number[], x: number, z: number ): number {
  const fx = ( x - origino[0] ) / paso, fz = ( z - origino[1] ) / paso;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const val = ( i: number, j: number ): number => {
    const ii = Math.max(0, Math.min(n - 1, i));
    const jj = Math.max(0, Math.min(n - 1, j));
    return krado[jj * n + ii];
  };
  const vico = ( j: number ): number =>
    katmullRom(val(i0 - 1, j), val(i0, j), val(i0 + 1, j), val(i0 + 2, j), u);
  return Math.max(0, katmullRom(vico(j0 - 1), vico(j0), vico(j0 + 1), vico(j0 + 2), v));
}

// ⟨ កំណែចាស់របស់ skulptaDelta 📃 ⟩
export function deltoMalnova( T: Int16Array, n: number, paso: number,
  o: number[], x: number, z: number ): number {
  const val = ( i: number, j: number ): number => {
    const ii = Math.max(0, Math.min(n - 1, i));
    const jj = Math.max(0, Math.min(n - 1, j));
    return T[jj * n + ii];
  };
  const fx = ( x - o[0] ) / paso, fz = ( z - o[1] ) / paso;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const vico = ( j: number ): number =>
    katmullRom(val(i0 - 1, j), val(i0, j), val(i0 + 1, j), val(i0 + 2, j), u);
  return katmullRom(vico(j0 - 1), vico(j0), vico(j0 + 1), vico(j0 + 2), v) / 0o20;
}

// ⟨ កំណែដែលមានតារាងជាប់គ្នា ។ komparo ធ្លាប់សរសេរ fk ជាអនុគមន៍
//   ខ្លីជាងនេះ តែលេខដូចគ្នាបេះបិទ ។ 📃 ⟩
export function deltoNova( T: Int16Array, n: number, paso: number,
  o: number[], x: number, z: number ): number {
  const fk = ( w: number ): number => {
    const n1 = n - 1;
    return w < 0 ? 0 : w > n1 ? n1 : w;
  };
  const fx = ( x - o[0] ) / paso, fz = ( z - o[1] ) / paso;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const c0 = fk(i0 - 1), c1 = fk(i0), c2 = fk(i0 + 1), c3 = fk(i0 + 2);
  const r0 = fk(j0 - 1) * n, r1 = fk(j0) * n, r2 = fk(j0 + 1) * n, r3 = fk(j0 + 2) * n;
  const m = katmullRom(
    katmullRom(T[r0 + c0], T[r0 + c1], T[r0 + c2], T[r0 + c3], u),
    katmullRom(T[r1 + c0], T[r1 + c1], T[r1 + c2], T[r1 + c3], u),
    katmullRom(T[r2 + c0], T[r2 + c1], T[r2 + c2], T[r2 + c3], u),
    katmullRom(T[r3 + c0], T[r3 + c1], T[r3 + c2], T[r3 + c3], u), v);
  return m / 0o20;
}
