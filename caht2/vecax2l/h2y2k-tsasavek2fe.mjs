// kantaoj/hax2x2q/interpolo.ts
function katmullRom(p0, p1, p2, p3, t) {
	const t2 = t * t, t3 = t2 * t;
	return 1 / 2 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}
// hacaht2/vecax2l/h2y2k-tsasavek2fe.ts
const NAJBAROJ = [
	[-1, -1],
	[0, -1],
	[1, -1],
	[-1, 0],
	[1, 0],
	[-1, 1],
	[0, 1],
	[1, 1]
];
const EPS = 1 / 16;
const BASENETO_MAKS = 24;
function vek2feTsasan(n, vepat6ni, origino, l6da, enQoxa, fontoj, hatk2ni, haku1o) {
	const N = n * n;
	const x0 = origino[0], z0 = origino[1];
	const vem2 = haku1o.vem2;
	const profundoMaks = haku1o.profundoMaks ?? 6 / 8;
	const fluoSkalo = haku1o.fluoSkalo ?? 8;
	const minimumaProfundo = haku1o.minimumaProfundo ?? 1 / 32;
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
		for (const [di, dj] of NAJBAROJ) {
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
		const amaso = new Amaso(N);
		for (let id = 0; id < N; id++) if (ene[id] && pukaz[id]) {
			havesukani[id] = H[id];
			amaso.tlunakani(H[id], id);
		}
		let cak2fe = 0;
		while (amaso.length > 0) {
			const [l6daNun, id] = amaso.bok();
			if (ca1ara[id] >= 0) continue;
			ca1ara[id] = cak2fe++;
			const i = id % n, j = (id - i) / n;
			for (const [di, dj] of NAJBAROJ) {
				const ni = i + di, nj = j + dj;
				if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
				const nid = nj * n + ni;
				if (!ene[nid] || ca1ara[nid] >= 0) continue;
				const sef4 = Math.max(H[nid], l6daNun);
				if (sef4 < havesukani[nid]) {
					havesukani[nid] = sef4;
					amaso.tlunakani(sef4, nid);
				}
			}
		}
	}
	const k6liqani = new Uint8Array(N);
	const havem2 = new Float32Array(N).fill(NaN);
	const kak6h6 = new Float32Array(N);
	const fluo = new Float32Array(N);
	const qar6xe = new Uint8Array(N);
	const tsofFluo = haku1o.tsofFluo === true;
	const pasaVido = new Uint8Array(N);
	let ternoj = 0;
	const fontajCxeloj = [];
	for (const fonto of fontoj) {
		const fi = Math.round((fonto.x - x0) / vepat6ni);
		const fj = Math.round((fonto.z - z0) / vepat6ni);
		if (fi < 0 || fj < 0 || fi >= n || fj >= n) continue;
		const saxeni = fj * n + fi;
		if (!ene[saxeni]) continue;
		const restanta = Math.max(0, fonto.fluo);
		if (restanta > 0) fontajCxeloj.push(saxeni);
		let id = saxeni;
		let tsel2sai = 0;
		if (tsofFluo) pasaVido.fill(0);
		while (restanta > 0 && tsel2sai++ < N && id >= 0) {
			if (pukaz[id]) break;
			if (tsofFluo) pasaVido[id] = 1;
			if (tsofFluo && H[id] >= vem2 && havesukani[id] > H[id] + EPS) markiBaseneton(H, k6liqani, havem2, ene, n, id, havesukani[id]);
			fluo[id] += restanta;
			if (!k6liqani[id]) qar6xe[id] = 1;
			const i = id % n, j = (id - i) / n;
			let pana = -1, panaL6da = H[id];
			let kmaFruta = -1, kmaFrutaOrdo = ca1ara[id];
			let kmaPsazai = -1, kmaPsazaiInundo = Infinity, kmaPsazaiOrdo = Infinity;
			for (const [di, dj] of NAJBAROJ) {
				const ni = i + di, nj = j + dj;
				if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
				const nid = nj * n + ni;
				if (!ene[nid]) continue;
				if (tsofFluo) {
					if (pasaVido[nid]) continue;
					if (havesukani[nid] < kmaPsazaiInundo || havesukani[nid] === kmaPsazaiInundo && ca1ara[nid] < kmaPsazaiOrdo) {
						kmaPsazaiInundo = havesukani[nid];
						kmaPsazaiOrdo = ca1ara[nid];
						kmaPsazai = nid;
					}
					continue;
				}
				if (H[nid] < panaL6da - EPS) {
					panaL6da = H[nid];
					pana = nid;
				}
				if (ca1ara[nid] >= 0 && ca1ara[nid] < kmaFrutaOrdo) {
					kmaFrutaOrdo = ca1ara[nid];
					kmaFruta = nid;
				}
			}
			if (tsofFluo) pana = kmaPsazai;
			if (pana < 0) {
				if (!tsofFluo) {
					if (havesukani[id] > H[id] + EPS) {
						markiBasenon(H, k6liqani, havem2, ene, n, id, havesukani[id]);
						qar6xe[id] = 0;
					}
					pana = kmaFruta;
				}
				if (pana < 0) {
					if (!tsofFluo && !k6liqani[id]) {
						ternoj++;
						markiTernon(H, k6liqani, havem2, ene, n, id, vem2);
						qar6xe[id] = 0;
					}
					break;
				}
			}
			if (H[pana] < vem2) {
				markiBasenon(H, k6liqani, havem2, ene, n, pana, vem2);
				break;
			}
			id = pana;
		}
	}
	for (let id = 0; id < N; id++) {
		if (!qar6xe[id] || k6liqani[id] || H[id] < vem2) continue;
		const profundo0 = profundoMaks * (1 - Math.exp(-fluo[id] / fluoSkalo));
		const profundo = Math.min(profundo0, Math.max(0, H[id] - vem2));
		if (profundo < minimumaProfundo) continue;
		kak6h6[id] = profundo;
		const soza = H[id] - profundo * (1 / 4);
		havem2[id] = soza;
		k6liqani[id] = 1;
		const larghxo = profundo / profundoMaks;
		const i = id % n, j = (id - i) / n;
		for (const [di, dj] of NAJBAROJ) {
			const ni = i + di, nj = j + dj;
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
			const nid = nj * n + ni;
			if (!ene[nid] || !qar6xe[nid] || k6liqani[nid] || H[nid] < vem2) continue;
			const kav = profundo * (di === 0 || dj === 0 ? 1 / 2 : 1 / 16) * larghxo;
			if (H[nid] - kav >= soza) continue;
			if (kav > kak6h6[nid]) kak6h6[nid] = kav;
			if (Number.isNaN(havem2[nid]) || havem2[nid] > soza) havem2[nid] = soza;
			k6liqani[nid] = 1;
		}
	}
	for (let id = 0; id < N; id++) {
		if (!k6liqani[id] || kak6h6[id] <= 0 || !qar6xe[id]) continue;
		const minimumo = H[id] - kak6h6[id] + minimumaProfundo * (3 / 4);
		if (havem2[id] < minimumo) havem2[id] = minimumo;
	}
	if (hatk2ni) {
		for (let id = 0; id < N; id++) if (hatk2ni[id] && ene[id] && H[id] < vem2) markiBasenon(H, k6liqani, havem2, ene, n, id, vem2);
	}
	for (const id of fontajCxeloj) if (H[id] < vem2) markiBasenon(H, k6liqani, havem2, ene, n, id, vem2);
	if (tsofFluo) {
		for (let id = 0; id < N; id++) if (!k6liqani[id]) havem2[id] = H[id] - 1 / 4;
	}
	let akvaj = 0, haqar6xe = 0;
	for (let id = 0; id < N; id++) if (k6liqani[id]) {
		akvaj++;
		if (kak6h6[id] > 0) haqar6xe++;
	}
	return {
		k6liqani,
		havem2,
		kak6h6,
		havesukani,
		havop2kekai: {
			fontoj: fontoj.length,
			haqar6xe,
			akvaj,
			ternoj
		}
	};
}
function markiBasenon(H, k6liqani, havem2, ene, n, saxeni, vem2) {
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
		for (const [di, dj] of NAJBAROJ) {
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
function markiBaseneton(H, k6liqani, havem2, ene, n, saxeni, vem2) {
	if (H[saxeni] >= vem2 || k6liqani[saxeni]) return false;
	const x2pa = [saxeni];
	const viditaj = /* @__PURE__ */ new Set([saxeni]);
	for (let teruni = 0; teruni < x2pa.length; teruni++) {
		if (x2pa.length >= BASENETO_MAKS) return false;
		const id = x2pa[teruni];
		const i = id % n, j = (id - i) / n;
		for (const [di, dj] of NAJBAROJ) {
			const ni = i + di, nj = j + dj;
			if (ni < 0 || nj < 0 || ni >= n || nj >= n) continue;
			const nid = nj * n + ni;
			if (viditaj.has(nid) || k6liqani[nid] || !ene[nid] || H[nid] >= vem2) continue;
			viditaj.add(nid);
			x2pa.push(nid);
		}
	}
	for (const id of x2pa) {
		k6liqani[id] = 1;
		havem2[id] = vem2;
	}
	return true;
}
function markiTernon(H, k6liqani, havem2, ene, n, saxeni, vem2) {
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
function px01oDulineara(krado, n, vepat6ni, origino, x, z) {
	const fx = (x - origino[0]) / vepat6ni, fz = (z - origino[1]) / vepat6ni;
	const i0 = Math.floor(fx), j0 = Math.floor(fz);
	if (i0 < 0 || j0 < 0 || i0 + 1 >= n || j0 + 1 >= n) return 0;
	const u = fx - i0, v = fz - j0;
	const a = krado[j0 * n + i0], b = krado[j0 * n + i0 + 1];
	const c = krado[(j0 + 1) * n + i0], d = krado[(j0 + 1) * n + i0 + 1];
	return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}
function fiksuKradon(v, n) {
	const n1 = n - 1;
	return v < 0 ? 0 : v > n1 ? n1 : v;
}
function px01oBikuba(krado, n, vepat6ni, origino, x, z) {
	const fx = (x - origino[0]) / vepat6ni, fz = (z - origino[1]) / vepat6ni;
	const i0 = Math.floor(fx), j0 = Math.floor(fz);
	const u = fx - i0, v = fz - j0;
	const c0 = fiksuKradon(i0 - 1, n), c1 = fiksuKradon(i0, n);
	const c2 = fiksuKradon(i0 + 1, n), c3 = fiksuKradon(i0 + 2, n);
	const r0 = fiksuKradon(j0 - 1, n) * n, r1 = fiksuKradon(j0, n) * n;
	const r2 = fiksuKradon(j0 + 1, n) * n, r3 = fiksuKradon(j0 + 2, n) * n;
	return Math.max(0, katmullRom(katmullRom(krado[r0 + c0], krado[r0 + c1], krado[r0 + c2], krado[r0 + c3], u), katmullRom(krado[r1 + c0], krado[r1 + c1], krado[r1 + c2], krado[r1 + c3], u), katmullRom(krado[r2 + c0], krado[r2 + c1], krado[r2 + c2], krado[r2 + c3], u), katmullRom(krado[r3 + c0], krado[r3 + c1], krado[r3 + c2], krado[r3 + c3], u), v));
}
function tsasaCxe(tseuni, n, vepat6ni, origino, x, z) {
	return px01oDulineara(tseuni.k6liqani, n, vepat6ni, origino, x, z) >= 1 / 2;
}
function vem2Cxe(tseuni, n, vepat6ni, origino, x, z, r = 1) {
	const fx = (x - origino[0]) / vepat6ni, fz = (z - origino[1]) / vepat6ni;
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
	return vem2Proksima(tseuni, n, vepat6ni, origino, x, z, r);
}
function vem2Proksima(tseuni, n, vepat6ni, origino, x, z, r = 1) {
	const ic = Math.round((x - origino[0]) / vepat6ni);
	const jc = Math.round((z - origino[1]) / vepat6ni);
	for (let c2q = 0; c2q <= r; c2q++) for (let dj = -c2q; dj <= c2q; dj++) for (let di = -c2q; di <= c2q; di++) {
		if (c2q > 0 && Math.abs(di) !== c2q && Math.abs(dj) !== c2q) continue;
		const i = ic + di, j = jc + dj;
		if (i < 0 || j < 0 || i >= n || j >= n) continue;
		const vem2 = tseuni.havem2[j * n + i];
		if (!Number.isNaN(vem2)) return vem2;
	}
	return NaN;
}
function haplosteqDeTsasa(tseuni, n, vepat6ni, origino, libero = 2) {
	let imin = n, imax = -1, jmin = n, jmax = -1;
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) if (tseuni.k6liqani[j * n + i]) {
		if (i < imin) imin = i;
		if (i > imax) imax = i;
		if (j < jmin) jmin = j;
		if (j > jmax) jmax = j;
	}
	if (imax < 0) return null;
	return {
		x0: origino[0] + (imin - libero) * vepat6ni,
		z0: origino[1] + (jmin - libero) * vepat6ni,
		x1: origino[0] + (imax + 1 + libero) * vepat6ni,
		z1: origino[1] + (jmax + 1 + libero) * vepat6ni
	};
}
var Amaso = class {
	hatskek2;
	havecax2lani;
	length = 0;
	constructor(vanekalani) {
		this.hatskek2 = new Float32Array(vanekalani + 1);
		this.havecax2lani = new Int32Array(vanekalani + 1);
	}
	tlunakani(skek2, vecax2lani) {
		let c = this.length++;
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
		this.length--;
		if (this.length > 0) {
			this.hatskek2[0] = this.hatskek2[this.length];
			this.havecax2lani[0] = this.havecax2lani[this.length];
			let p = 0;
			for (;;) {
				const l = 2 * p + 1, r = l + 1;
				let m = p;
				if (l < this.length && this.hatskek2[l] < this.hatskek2[m]) m = l;
				if (r < this.length && this.hatskek2[r] < this.hatskek2[m]) m = r;
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
export { tsasaCxe, vek2feTsasan, haplosteqDeTsasa, px01oBikuba, px01oDulineara, vem2Cxe, vem2Proksima };
