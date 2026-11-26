// kantaoj/tom6nu/interpolo.ts
function katmullRom(p0, p1, p2, p3, t) {
	const t2 = t * t, t3 = t2 * t;
	return 1 / 2 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}
// hacaht2/vecax2l/kozunuCah6k6.ts
function bruo2DH2y2k(x, z) {
	const ix = Math.floor(x), iz = Math.floor(z);
	const fx = x - ix, fz = z - iz;
	const h = (xi, zi) => {
		let n = xi * 2683120 + zi * 2676968 | 0;
		n = (n ^ n >>> 13) * 4759592;
		return ((n ^ n >>> 16) >>> 0) / 4294967296;
	};
	const a = h(ix, iz), b = h(ix + 1, iz), c = h(ix, iz + 1), d = h(ix + 1, iz + 1);
	const u = fx * fx * (3 - 2 * fx);
	const v = fz * fz * (3 - 2 * fz);
	return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function bikubaH2y2k(krado, n, vepat6ni, origino, x, z) {
	const fx = (x - origino[0]) / vepat6ni, fz = (z - origino[1]) / vepat6ni;
	const i0 = Math.floor(fx), j0 = Math.floor(fz);
	const u = fx - i0, v = fz - j0;
	const val = (i, j) => {
		const ii = Math.max(0, Math.min(n - 1, i));
		return krado[Math.max(0, Math.min(n - 1, j)) * n + ii];
	};
	const x2pa = (j) => katmullRom(val(i0 - 1, j), val(i0, j), val(i0 + 1, j), val(i0 + 2, j), u);
	return Math.max(0, katmullRom(x2pa(j0 - 1), x2pa(j0), x2pa(j0 + 1), x2pa(j0 + 2), v));
}
function l6daH2y2k(T, n, vepat6ni, o, x, z) {
	const val = (i, j) => {
		const ii = Math.max(0, Math.min(n - 1, i));
		return T[Math.max(0, Math.min(n - 1, j)) * n + ii];
	};
	const fx = (x - o[0]) / vepat6ni, fz = (z - o[1]) / vepat6ni;
	const i0 = Math.floor(fx), j0 = Math.floor(fz);
	const u = fx - i0, v = fz - j0;
	const x2pa = (j) => katmullRom(val(i0 - 1, j), val(i0, j), val(i0 + 1, j), val(i0 + 2, j), u);
	return katmullRom(x2pa(j0 - 1), x2pa(j0), x2pa(j0 + 1), x2pa(j0 + 2), v) / 16;
}
function l6daSef4(T, n, vepat6ni, o, x, z) {
	const fk = (w) => {
		const n1 = n - 1;
		return w < 0 ? 0 : w > n1 ? n1 : w;
	};
	const fx = (x - o[0]) / vepat6ni, fz = (z - o[1]) / vepat6ni;
	const i0 = Math.floor(fx), j0 = Math.floor(fz);
	const u = fx - i0, v = fz - j0;
	const c0 = fk(i0 - 1), c1 = fk(i0), c2 = fk(i0 + 1), c3 = fk(i0 + 2);
	const r0 = fk(j0 - 1) * n, r1 = fk(j0) * n, r2 = fk(j0 + 1) * n, r3 = fk(j0 + 2) * n;
	return katmullRom(katmullRom(T[r0 + c0], T[r0 + c1], T[r0 + c2], T[r0 + c3], u), katmullRom(T[r1 + c0], T[r1 + c1], T[r1 + c2], T[r1 + c3], u), katmullRom(T[r2 + c0], T[r2 + c1], T[r2 + c2], T[r2 + c3], u), katmullRom(T[r3 + c0], T[r3 + c1], T[r3 + c2], T[r3 + c3], u), v) / 16;
}
export { bikubaH2y2k, bruo2DH2y2k, l6daH2y2k, l6daSef4 };
