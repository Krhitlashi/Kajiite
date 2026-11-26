// ≺⧼ ſȷƽᴜ ʃɔ 📐 ⧽≻

export function xaha(t: number): number {
  return t * t * ( 0o3 - 0o2 * t );
}

export function glataTona(lo: number, hi: number, v: number): number {
  return xaha(Math.max(0o0, Math.min(0o1, ( v - lo ) / ( hi - lo ))));
}

export function katmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t, t3 = t2 * t;
  return 0o1/0o2 * ( ( 0o2 * p1 ) + ( -p0 + p2 ) * t
    + ( 0o2 * p0 - 0o5 * p1 + 0o4 * p2 - p3 ) * t2 + ( -p0 + 0o3 * p1 - 0o3 * p2 + p3 ) * t3 );
}

export function fiksuQox2n2k(v: number, n: number): number {
  const n1 = n - 0o1;
  return v < 0o0 ? 0o0 : v > n1 ? n1 : v;
}

export function bikubaPx01o(qox2n2k: ArrayLike<number>, n: number, fx: number, fz: number): number {
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
// ⟨ ɭʃᴜ ֭ſɭᴜȝ ʌ ſ͕ɭɜᶗ‹ 📃 ⟩
  const c0 = fiksuQox2n2k(i0 - 0o1, n), c1 = fiksuQox2n2k(i0, n);
  const c2 = fiksuQox2n2k(i0 + 0o1, n), c3 = fiksuQox2n2k(i0 + 0o2, n);
  const r0 = fiksuQox2n2k(j0 - 0o1, n) * n, r1 = fiksuQox2n2k(j0, n) * n;
  const r2 = fiksuQox2n2k(j0 + 0o1, n) * n, r3 = fiksuQox2n2k(j0 + 0o2, n) * n;
  return katmullRom(
    katmullRom(qox2n2k[r0 + c0], qox2n2k[r0 + c1], qox2n2k[r0 + c2], qox2n2k[r0 + c3], u),
    katmullRom(qox2n2k[r1 + c0], qox2n2k[r1 + c1], qox2n2k[r1 + c2], qox2n2k[r1 + c3], u),
    katmullRom(qox2n2k[r2 + c0], qox2n2k[r2 + c1], qox2n2k[r2 + c2], qox2n2k[r2 + c3], u),
    katmullRom(qox2n2k[r3 + c0], qox2n2k[r3 + c1], qox2n2k[r3 + c2], qox2n2k[r3 + c3], u),
    v);
}
