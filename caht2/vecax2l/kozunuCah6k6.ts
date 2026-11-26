// ≺⧼ ſןɹ ʌ j͑ʃᴜ ʌ j͑ʃɹ ſɭᴜc̗ ɭʃᴜ 📏 ⧽≻
// ⟨ ſɭɜ ſɭᴜ , ꞙɭэ , ⟅ ı],ᴜ ֭ſɭᴜ , ꞙɭı ,
// j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭэ ſɭᴜ , ꞙɭɿ , ꞙɭı , ꞙɭı , ſɭэ ſɭᴜ ,
// ſɭэ ſɭᴜ , ꞙɭı , ꞙɭı , ꞙɭı , ı],ᴜ ֭ſɭᴜ ,
// ſɭэ ſɭᴜ , ꞙɭэ , 📃 ⟩
import { katmullRom } from "../../kanta/x2x2q/interpolo.js";

// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
export function bruo2DH2y2k( x: number, z: number ): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const h = ( xi: number, zi: number ): number => {
    let n = ( xi * 0x28f0f0 + zi * 0x28d8e8 ) | 0o0;
    n = ( n ^ ( n >>> 0o15 ) ) * 0x48a028;
    return ( ( n ^ ( n >>> 0o20 ) ) >>> 0o0 ) / 0o40000000000;
  };
  const a = h(ix, iz), b = h(ix + 0o1, iz), c = h(ix, iz + 0o1), d = h(ix + 0o1, iz + 0o1);
  const u = fx * fx * ( 0o3 - 0o2 * fx );
  const v = fz * fz * ( 0o3 - 0o2 * fz );
  return a + ( b - a ) * u + ( c - a ) * v + ( a - b - c + d ) * u * v;
}

// ⟨ j͑ʃᴜ ſɭ,w , ſ͕ɭɜ ı],ᴜ , 📃 ⟩
export function bikubaH2y2k( qox2n2k: Float32Array, n: number, vepat6ni: number,
  tsiq: number[], x: number, z: number ): number {
  const fx = ( x - tsiq[0o0] ) / vepat6ni, fz = ( z - tsiq[0o1] ) / vepat6ni;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const val = ( i: number, j: number ): number => {
    const ii = Math.max(0o0, Math.min(n - 0o1, i));
    const jj = Math.max(0o0, Math.min(n - 0o1, j));
    return qox2n2k[jj * n + ii];
  };
  const x2pa = ( j: number ): number =>
    katmullRom(val(i0 - 0o1, j), val(i0, j), val(i0 + 0o1, j), val(i0 + 0o2, j), u);
  return Math.max(0o0, katmullRom(x2pa(j0 - 0o1), x2pa(j0), x2pa(j0 + 0o1), x2pa(j0 + 0o2), v));
}

// ⟨ j͑ʃᴜ ſɭ,w , ſ͕ɭɜ ı],ᴜ , ꞙɭı , 📃 ⟩
export function l6daH2y2k( T: Int16Array, n: number, vepat6ni: number,
  o: number[], x: number, z: number ): number {
  const val = ( i: number, j: number ): number => {
    const ii = Math.max(0o0, Math.min(n - 0o1, i));
    const jj = Math.max(0o0, Math.min(n - 0o1, j));
    return T[jj * n + ii];
  };
  const fx = ( x - o[0o0] ) / vepat6ni, fz = ( z - o[0o1] ) / vepat6ni;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const x2pa = ( j: number ): number =>
    katmullRom(val(i0 - 0o1, j), val(i0, j), val(i0 + 0o1, j), val(i0 + 0o2, j), u);
  return katmullRom(x2pa(j0 - 0o1), x2pa(j0), x2pa(j0 + 0o1), x2pa(j0 + 0o2), v) / 0o20;
}

// ⟨ ı],ᴜ ֭ſɭᴜ , ꞙɭɿ , ⟅ ſɭэ ſɭᴜ , ꞙɭı ,
// j͑ʃᴜ ſɭ,w , ꞙɭı , 📃 ⟩
export function l6daSef4( T: Int16Array, n: number, vepat6ni: number,
  o: number[], x: number, z: number ): number {
  const fk = ( w: number ): number => {
    const n1 = n - 0o1;
    return w < 0o0 ? 0o0 : w > n1 ? n1 : w;
  };
  const fx = ( x - o[0o0] ) / vepat6ni, fz = ( z - o[0o1] ) / vepat6ni;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const c0 = fk(i0 - 0o1), c1 = fk(i0), c2 = fk(i0 + 0o1), c3 = fk(i0 + 0o2);
  const r0 = fk(j0 - 0o1) * n, r1 = fk(j0) * n, r2 = fk(j0 + 0o1) * n, r3 = fk(j0 + 0o2) * n;
  const m = katmullRom(
    katmullRom(T[r0 + c0], T[r0 + c1], T[r0 + c2], T[r0 + c3], u),
    katmullRom(T[r1 + c0], T[r1 + c1], T[r1 + c2], T[r1 + c3], u),
    katmullRom(T[r2 + c0], T[r2 + c1], T[r2 + c2], T[r2 + c3], u),
    katmullRom(T[r3 + c0], T[r3 + c1], T[r3 + c2], T[r3 + c3], u), v);
  return m / 0o20;
}
