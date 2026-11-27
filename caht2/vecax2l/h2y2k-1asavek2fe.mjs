// kanta/k2fe/fkabe.ts
function katmullRom(p0, p1, p2, p3, t) {
	const t2 = t * t, t3 = t2 * t;
	return 1 / 2 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}
// caht2/vecax2l/h2y2k-1asavek2fe.ts
const SIRAQPAL6 = [
	[-1, -1],
	[0, -1],
	[1, -1],
	[-1, 0],
	[1, 0],
	[-1, 1],
	[0, 1],
	[1, 1]
];
const M2M2 = 1 / 16;
const QOXUPUF2 = 24;
function vek2feTsasa(n, vepat6ni, tsiq, l6da, enQoxa, hatsiq, hatk2ni, haku1o) {
	const N = n * n;
	const x0 = tsiq[0], z0 = tsiq[1];
	const vem2 = haku1o.vem2;
	const jufuPuf2 = haku1o.jufuPuf2 ?? 6 / 8;
	const lasP6zuk = haku1o.lasP6zuk ?? 8;
	const m2m2Jufu = haku1o.m2m2Jufu ?? 1 / 32;
	const H = new Float32Array(N);
	const ene = new Uint8Array(N);
	const pukaz = new Uint8Array(N);
	for (let j = 0; j < n; j++) {
		const z = z0 + j * vepat6ni;
		for (let i = 0; i < n; i++) {
			const id = j * n + i;
			H[id] = l6da(x0 + i * vepat6ni, z);
			ene[id] = enQoxa(x0 + i * vepat6ni, z) ? 1 : 0;
		}
	}
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		for (const [di, dj] of SIRAQPAL6) {
			const ni = i + di, nj = j + dj;
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) {
				pukaz[id] = 1;
				break;
			}
			if (!ene[nj * n + ni]) {
				pukaz[id] = 1;
				break;
			}
		}
	}
	const havesukani = new Float32Array(N).fill(Infinity);
	const ca1ara = new Int32Array(N).fill(-1);
	{
		const kom2 = new Kom2(N);
		for (let id = 0; id < N; id++) if (ene[id] && pukaz[id]) {
			havesukani[id] = H[id];
			kom2.tlunakani(H[id], id);
		}
		let cak2fe = 0;
		while (kom2.sahakani > 0) {
			const [l6daNun, id] = kom2.bok();
			if (ca1ara[id] >= 0) continue;
			ca1ara[id] = cak2fe++;
			const i = id % n, j = (id - i) / n;
			for (const [di, dj] of SIRAQPAL6) {
				const ni = i + di, nj = j + dj;
				if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
				const nid = nj * n + ni;
				if (!ene[nid] || ca1ara[nid] >= 0) continue;
				const sef4 = Math.max(H[nid], l6daNun);
				if (sef4 < havesukani[nid]) {
					havesukani[nid] = sef4;
					kom2.tlunakani(sef4, nid);
				}
			}
		}
	}
	const k6liqani = new Uint8Array(N);
	const havem2 = new Float32Array(N).fill(NaN);
	const hah6k6 = new Float32Array(N);
	const las = new Float32Array(N);
	const qar6xe = new Uint8Array(N);
	const tsofLas = haku1o.tsofLas === true;
	const pasaVido = new Uint8Array(N);
	let hat6lima = 0;
	const tsiqjHak2pa = [];
	for (const tsiq of hatsiq) {
		const fi = Math.round((tsiq.x - x0) / vepat6ni);
		const fj = Math.round((tsiq.z - z0) / vepat6ni);
		if (fi < 0 || fj < 0 || fi >= n || fj >= n) continue;
		const saxeni = fj * n + fi;
		if (!ene[saxeni]) continue;
		const kukLas = Math.max(0, tsiq.las);
		if (kukLas > 0) tsiqjHak2pa.push(saxeni);
		let id = saxeni;
		let tsel2sai = 0;
		if (tsofLas) pasaVido.fill(0);
		while (kukLas > 0 && tsel2sai++ < N && id >= 0) {
			if (pukaz[id]) break;
			if (tsofLas) pasaVido[id] = 1;
			if (tsofLas && H[id] >= vem2 && havesukani[id] > H[id] + M2M2) s2tasQoxunM2M2(H, k6liqani, havem2, ene, n, id, havesukani[id]);
			las[id] += kukLas;
			if (!k6liqani[id]) qar6xe[id] = 1;
			const i = id % n, j = (id - i) / n;
			let pana = -1, panaL6da = H[id];
			let kmaFruta = -1, kmaFrutaOrdo = ca1ara[id];
			let kmaPsazai = -1, kmaPsazaiInundo = Infinity, kmaPsazaiOrdo = Infinity;
			for (const [di, dj] of SIRAQPAL6) {
				const ni = i + di, nj = j + dj;
				if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
				const nid = nj * n + ni;
				if (!ene[nid]) continue;
				if (tsofLas) {
					if (pasaVido[nid]) continue;
					if (havesukani[nid] < kmaPsazaiInundo || havesukani[nid] === kmaPsazaiInundo && ca1ara[nid] < kmaPsazaiOrdo) {
						kmaPsazaiInundo = havesukani[nid];
						kmaPsazaiOrdo = ca1ara[nid];
						kmaPsazai = nid;
					}
					continue;
				}
				if (H[nid] < panaL6da - M2M2) {
					panaL6da = H[nid];
					pana = nid;
				}
				if (ca1ara[nid] >= 0 && ca1ara[nid] < kmaFrutaOrdo) {
					kmaFrutaOrdo = ca1ara[nid];
					kmaFruta = nid;
				}
			}
			if (tsofLas) pana = kmaPsazai;
			if (pana < 0) {
				if (!tsofLas) {
					if (havesukani[id] > H[id] + M2M2) {
						s2tasQoxun(H, k6liqani, havem2, ene, n, id, havesukani[id]);
						qar6xe[id] = 0;
					}
					pana = kmaFruta;
				}
				if (pana < 0) {
					if (!tsofLas && !k6liqani[id]) {
						hat6lima++;
						s2tasTernon(H, k6liqani, havem2, ene, n, id, vem2);
						qar6xe[id] = 0;
					}
					break;
				}
			}
			if (H[pana] < vem2) {
				s2tasQoxun(H, k6liqani, havem2, ene, n, pana, vem2);
				break;
			}
			id = pana;
		}
	}
	for (let id = 0; id < N; id++) {
		if (!qar6xe[id] || k6liqani[id] || H[id] < vem2) continue;
		const jufu0 = jufuPuf2 * (1 - Math.exp(-las[id] / lasP6zuk));
		const jufu = Math.min(jufu0, Math.max(0, H[id] - vem2));
		if (jufu < m2m2Jufu) continue;
		hah6k6[id] = jufu;
		const soza = H[id] - jufu * (1 / 4);
		havem2[id] = soza;
		k6liqani[id] = 1;
		const sefini = jufu / jufuPuf2;
		const i = id % n, j = (id - i) / n;
		for (const [di, dj] of SIRAQPAL6) {
			const ni = i + di, nj = j + dj;
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
			const nid = nj * n + ni;
			if (!ene[nid] || !qar6xe[nid] || k6liqani[nid] || H[nid] < vem2) continue;
			const kav = jufu * (di === 0 || dj === 0 ? 1 / 2 : 1 / 16) * sefini;
			if (H[nid] - kav >= soza) continue;
			if (kav > hah6k6[nid]) hah6k6[nid] = kav;
			if (Number.isNaN(havem2[nid]) || havem2[nid] > soza) havem2[nid] = soza;
			k6liqani[nid] = 1;
		}
	}
	for (let id = 0; id < N; id++) {
		if (!k6liqani[id] || hah6k6[id] <= 0 || !qar6xe[id]) continue;
		const m2m2 = H[id] - hah6k6[id] + m2m2Jufu * (3 / 4);
		if (havem2[id] < m2m2) havem2[id] = m2m2;
	}
	if (hatk2ni) {
		for (let id = 0; id < N; id++) if (hatk2ni[id] && ene[id] && H[id] < vem2) s2tasQoxun(H, k6liqani, havem2, ene, n, id, vem2);
	}
	for (const id of tsiqjHak2pa) if (H[id] < vem2) s2tasQoxun(H, k6liqani, havem2, ene, n, id, vem2);
	if (tsofLas) {
		for (let id = 0; id < N; id++) if (!k6liqani[id]) havem2[id] = H[id] - 1 / 4;
	}
	let hatsasa = 0, haqar6xe = 0;
	for (let id = 0; id < N; id++) if (k6liqani[id]) {
		hatsasa++;
		if (hah6k6[id] > 0) haqar6xe++;
	}
	return {
		k6liqani,
		havem2,
		hah6k6,
		havesukani,
		vop2kekai: {
			hatsiq: hatsiq.length,
			haqar6xe,
			hatsasa,
			hat6lima
		}
	};
}
function s2tasQoxun(H, k6liqani, havem2, ene, n, saxeni, vem2) {
	if (H[saxeni] >= vem2) return;
	if (k6liqani[saxeni] && havem2[saxeni] === vem2) return;
	const x2pa = new Int32Array(n * n);
	let teruni = 0, nar2sa = 0;
	x2pa[nar2sa++] = saxeni;
	k6liqani[saxeni] = 1;
	havem2[saxeni] = vem2;
	while (teruni < nar2sa) {
		const id = x2pa[teruni++];
		const i = id % n, j = (id - i) / n;
		for (const [di, dj] of SIRAQPAL6) {
			const ni = i + di, nj = j + dj;
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
			const nid = nj * n + ni;
			if (k6liqani[nid] || !ene[nid] || H[nid] >= vem2) continue;
			k6liqani[nid] = 1;
			havem2[nid] = vem2;
			x2pa[nar2sa++] = nid;
		}
	}
}
function s2tasQoxunM2M2(H, k6liqani, havem2, ene, n, saxeni, vem2) {
	if (H[saxeni] >= vem2 || k6liqani[saxeni]) return false;
	const x2pa = [saxeni];
	const hakix2 = /* @__PURE__ */ new Set([saxeni]);
	for (let teruni = 0; teruni < x2pa.length; teruni++) {
		if (x2pa.length >= QOXUPUF2) return false;
		const id = x2pa[teruni];
		const i = id % n, j = (id - i) / n;
		for (const [di, dj] of SIRAQPAL6) {
			const ni = i + di, nj = j + dj;
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
			const nid = nj * n + ni;
			if (hakix2.has(nid) || k6liqani[nid] || !ene[nid] || H[nid] >= vem2) continue;
			hakix2.add(nid);
			x2pa.push(nid);
		}
	}
	for (const id of x2pa) {
		k6liqani[id] = 1;
		havem2[id] = vem2;
	}
	return true;
}
function s2tasTernon(H, k6liqani, havem2, ene, n, saxeni, vem2) {
	const soza = Math.max(H[saxeni] + 1 / 8, vem2);
	const i0 = saxeni % n, j0 = (saxeni - i0) / n;
	for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
		const ni = i0 + di, nj = j0 + dj;
		if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
		const nid = nj * n + ni;
		if (!ene[nid] || H[nid] > soza) continue;
		k6liqani[nid] = 1;
		havem2[nid] = soza;
	}
}
function px01oX2pa2(qox2n2k, n, vepat6ni, tsiq, x, z) {
	const fx = (x - tsiq[0]) / vepat6ni, fz = (z - tsiq[1]) / vepat6ni;
	const i0 = Math.floor(fx), j0 = Math.floor(fz);
	if (i0 < 0 || j0 < 0 || i0 + 1 >= n || j0 + 1 >= n) return 0;
	const u = fx - i0, v = fz - j0;
	const a = qox2n2k[j0 * n + i0], b = qox2n2k[j0 * n + i0 + 1];
	const c = qox2n2k[(j0 + 1) * n + i0], d = qox2n2k[(j0 + 1) * n + i0 + 1];
	return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}
function fiksuQox2n2k(v, n) {
	const n1 = n - 1;
	return v < 0 ? 0 : v > n1 ? n1 : v;
}
function px01oBikuba(qox2n2k, n, vepat6ni, tsiq, x, z) {
	const fx = (x - tsiq[0]) / vepat6ni, fz = (z - tsiq[1]) / vepat6ni;
	const i0 = Math.floor(fx), j0 = Math.floor(fz);
	const u = fx - i0, v = fz - j0;
	const c0 = fiksuQox2n2k(i0 - 1, n), c1 = fiksuQox2n2k(i0, n);
	const c2 = fiksuQox2n2k(i0 + 1, n), c3 = fiksuQox2n2k(i0 + 2, n);
	const r0 = fiksuQox2n2k(j0 - 1, n) * n, r1 = fiksuQox2n2k(j0, n) * n;
	const r2 = fiksuQox2n2k(j0 + 1, n) * n, r3 = fiksuQox2n2k(j0 + 2, n) * n;
	return Math.max(0, katmullRom(katmullRom(qox2n2k[r0 + c0], qox2n2k[r0 + c1], qox2n2k[r0 + c2], qox2n2k[r0 + c3], u), katmullRom(qox2n2k[r1 + c0], qox2n2k[r1 + c1], qox2n2k[r1 + c2], qox2n2k[r1 + c3], u), katmullRom(qox2n2k[r2 + c0], qox2n2k[r2 + c1], qox2n2k[r2 + c2], qox2n2k[r2 + c3], u), katmullRom(qox2n2k[r3 + c0], qox2n2k[r3 + c1], qox2n2k[r3 + c2], qox2n2k[r3 + c3], u), v));
}
function tsasaJe(tseuni, n, vepat6ni, tsiq, x, z) {
	return px01oX2pa2(tseuni.k6liqani, n, vepat6ni, tsiq, x, z) >= 1 / 2;
}
function vem2Je(tseuni, n, vepat6ni, tsiq, x, z, r = 1) {
	const fx = (x - tsiq[0]) / vepat6ni, fz = (z - tsiq[1]) / vepat6ni;
	const i0 = Math.floor(fx), j0 = Math.floor(fz);
	const u = fx - i0, v = fz - j0;
	let tlunakani = 0, s2karanu = 0;
	for (let k = 0; k < 4; k++) {
		const i = i0 + (k & 1), j = j0 + (k >> 1);
		if (i < 0 || j < 0 || i >= n || j >= n) continue;
		const vem2 = tseuni.havem2[j * n + i];
		if (Number.isNaN(vem2)) continue;
		const w = (k & 1 ? u : 1 - u) * (k >> 1 ? v : 1 - v);
		tlunakani += vem2 * w;
		s2karanu += w;
	}
	if (s2karanu > 0) return tlunakani / s2karanu;
	return vem2Tsiike(tseuni, n, vepat6ni, tsiq, x, z, r);
}
function vem2Tsiike(tseuni, n, vepat6ni, tsiq, x, z, r = 1) {
	const ic = Math.round((x - tsiq[0]) / vepat6ni);
	const jc = Math.round((z - tsiq[1]) / vepat6ni);
	for (let c2q = 0; c2q <= r; c2q++) for (let dj = -c2q; dj <= c2q; dj++) for (let di = -c2q; di <= c2q; di++) {
		if (c2q > 0 && Math.abs(di) !== c2q && Math.abs(dj) !== c2q) continue;
		const i = ic + di, j = jc + dj;
		if (i < 0 || j < 0 || i >= n || j >= n) continue;
		const vem2 = tseuni.havem2[j * n + i];
		if (!Number.isNaN(vem2)) return vem2;
	}
	return NaN;
}
function plosteqDeTsasa(tseuni, n, vepat6ni, tsiq, qaqun2 = 2) {
	let imin = n, imax = -1, jmin = n, jmax = -1;
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) if (tseuni.k6liqani[j * n + i]) {
		if (i < imin) imin = i;
		if (i > imax) imax = i;
		if (j < jmin) jmin = j;
		if (j > jmax) jmax = j;
	}
	if (imax < 0) return null;
	return {
		x0: tsiq[0] + (imin - qaqun2) * vepat6ni,
		z0: tsiq[1] + (jmin - qaqun2) * vepat6ni,
		x1: tsiq[0] + (imax + 1 + qaqun2) * vepat6ni,
		z1: tsiq[1] + (jmax + 1 + qaqun2) * vepat6ni
	};
}
var Kom2 = class {
	hatskek2;
	havecax2lani;
	sahakani = 0;
	constructor(vanekalani) {
		this.hatskek2 = new Float32Array(vanekalani + 1);
		this.havecax2lani = new Int32Array(vanekalani + 1);
	}
	tlunakani(skek2, vecax2lani) {
		let c = this.sahakani++;
		this.hatskek2[c] = skek2;
		this.havecax2lani[c] = vecax2lani;
		while (c > 0) {
			const p = c - 1 >> 1;
			if (this.hatskek2[p] <= this.hatskek2[c]) break;
			this.interVasaka(p, c);
			c = p;
		}
	}
	bok() {
		const skek2 = this.hatskek2[0], vecax2lani = this.havecax2lani[0];
		this.sahakani--;
		if (this.sahakani > 0) {
			this.hatskek2[0] = this.hatskek2[this.sahakani];
			this.havecax2lani[0] = this.havecax2lani[this.sahakani];
			let p = 0;
			for (;;) {
				const l = 2 * p + 1, r = l + 1;
				let m = p;
				if (l < this.sahakani && this.hatskek2[l] < this.hatskek2[m]) m = l;
				if (r < this.sahakani && this.hatskek2[r] < this.hatskek2[m]) m = r;
				if (m === p) break;
				this.interVasaka(p, m);
				p = m;
			}
		}
		return [skek2, vecax2lani];
	}
	interVasaka(a, b) {
		const v = this.hatskek2[a];
		this.hatskek2[a] = this.hatskek2[b];
		this.hatskek2[b] = v;
		const i = this.havecax2lani[a];
		this.havecax2lani[a] = this.havecax2lani[b];
		this.havecax2lani[b] = i;
	}
};
export { plosteqDeTsasa, px01oBikuba, px01oX2pa2, tsasaJe, vek2feTsasa, vem2Je, vem2Tsiike };
