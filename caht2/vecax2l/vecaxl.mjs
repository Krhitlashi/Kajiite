// ../../kanta/nala/ruva.ts
function subRuva(tk2ni, qar6xe) {
	let h = tk2ni + Math.imul(qar6xe + 1, 2654435761) | 0;
	h ^= h >>> 14;
	h = Math.imul(h, 2246822519);
	h ^= h >>> 11;
	return h >>> 0;
}
// ../../kanta/k2fe/fkabe.ts
function xaha(t) {
	return t * t * (3 - 2 * t);
}
function glataTona(lo, hi, v) {
	return xaha(Math.max(0, Math.min(1, (v - lo) / (hi - lo))));
}
// ../../kanta/nala/casacakakcasai.ts
const KANALOKONTINENTO = 1;
const KANALOJaqo = 2;
const KANALOHAKHACAHT2 = 3;
const KANALOONDETOJ = 4;
const KANALOPLANTOJ = 5;
const KANALOBESTOJ = 8;
const KANALOMONTARASEMO = 9;
const KANALOKARAKT6LIMA = 10;
const KONTINENTASKALO = 272;
const JAQOSAHAKANI = 112;
const HAKILASKALO = 72;
const ONDETASKALO = 26;
const KONTINENTAFORTO = 46;
const KONTINENTAL6DA = 2;
const JAQOFORTO = 36;
const HAKILAFORTO = 12;
const ONDETAFORTO = 8;
const KONTINENTAMEDIANO = 1 / 2;
const MONTARAKVANTILO = 56 / 64;
const MONTARASOJLLO = 5 / 64;
const MONTARASOJLHI = 8 / 64;
const KARAKTERABAZO = 7 / 8;
const KARAKTERAVARIO = 6 / 8;
const BIOMOJAQO = 1;
const BIOMOVALO = 2;
const BIOMOEBENAJXO = 3;
const BIOMOAKVAJPLANTOJ = 4;
const BIOMOEKVIZETO = 5;
const BESTOAKVA = 1;
const BESTOPETRELA = 2;
const BESTONPC = 4;
const FONTAMINIMUMAL6DA = 16;
const FONTADISTANCO = 32;
const FONTAKVANTO = 20;
const FONTAFLUO = 16;
function miksu(a, b, s) {
	let n = Math.imul(a, 461845907) ^ Math.imul(b, 668265261) ^ s | 0;
	n = Math.imul(n ^ n >>> 13, 2246822507);
	return ((n ^ n >>> 11) >>> 0) / 4294967296;
}
function famaf(x, z, s) {
	const ix = Math.floor(x), iz = Math.floor(z);
	const fx = x - ix, fz = z - iz;
	const u = xaha(fx);
	const v = xaha(fz);
	const a = miksu(ix, iz, s);
	const b = miksu(ix + 1, iz, s);
	const c = miksu(ix, iz + 1, s);
	const d = miksu(ix + 1, iz + 1, s);
	return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function multoblaBruo(x, z, oktoj, s) {
	let tlunakani = 0, s2karanu = 1, xiix2q = 0, f = 1;
	for (let i = 0; i < oktoj; i++) {
		tlunakani += s2karanu * famaf(x * f, z * f, s + i * 5369127);
		xiix2q += s2karanu;
		s2karanu *= 1 / 2;
		f *= 2;
	}
	return tlunakani / xiix2q;
}
function kresto(x, z, oktoj, s) {
	let tlunakani = 0, s2karanu = 1, xiix2q = 0, f = 1;
	for (let i = 0; i < oktoj; i++) {
		const n = famaf(x * f, z * f, s + i * 668265261);
		const k = 1 - Math.abs(2 * n - 1);
		tlunakani += k * k * s2karanu;
		xiix2q += s2karanu;
		s2karanu *= 1 / 2;
		f *= 2;
	}
	return tlunakani / xiix2q;
}
function generiT6liman(tk2ni, n, vepat6ni, tsiq, vem2, enQoxa) {
	const sKontinento = subRuva(tk2ni, KANALOKONTINENTO);
	const sJaqo = subRuva(tk2ni, KANALOJaqo);
	const sHakhacaht2 = subRuva(tk2ni, KANALOHAKHACAHT2);
	const sOndetoj = subRuva(tk2ni, KANALOONDETOJ);
	const sPlantoj = subRuva(tk2ni, KANALOPLANTOJ);
	const sHapaga = subRuva(tk2ni, KANALOBESTOJ);
	const N = n * n;
	const x0 = tsiq[0], z0 = tsiq[1];
	const kontinentoj = [];
	const kontinentajHevem2 = new Float64Array(N);
	const ene = new Uint8Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
		const id = j * n + i;
		const ena = enQoxa(x, z);
		ene[id] = ena ? 1 : 0;
		if (!ena) continue;
		const kontinento = multoblaBruo(x / KONTINENTASKALO, z / KONTINENTASKALO, 5, sKontinento);
		kontinentajHevem2[id] = kontinento;
		kontinentoj.push(kontinento);
	}
	kontinentoj.sort((a, b) => a - b);
	const havecax2l = kontinentoj.length;
	const mediano = havecax2l > 0 ? kontinentoj[havecax2l >> 1] : KONTINENTAMEDIANO;
	const plosteq = havecax2l > 0 ? kontinentoj[Math.floor(havecax2l * MONTARAKVANTILO)] : KONTINENTAMEDIANO;
	const montoVap6zukani = KARAKTERABAZO + subRuva(tk2ni, KANALOKARAKT6LIMA) % 512 / 512 * KARAKTERAVARIO;
	function l6daElKontinento(x, z, kontinento) {
		const jaqo = kresto(x / JAQOSAHAKANI, z / JAQOSAHAKANI, 5, sJaqo);
		const hakhacaht2 = multoblaBruo(x / HAKILASKALO, z / HAKILASKALO, 3, sHakhacaht2) - 1 / 2;
		const ondetoj = multoblaBruo(x / ONDETASKALO, z / ONDETASKALO, 4, sOndetoj) - 1 / 2;
		const kozuni = (kontinento - mediano) * KONTINENTAFORTO + KONTINENTAL6DA;
		const jaqoMasko = glataTona(plosteq - MONTARASOJLLO, plosteq + MONTARASOJLHI, kontinento);
		return kozuni + jaqo * jaqo * JAQOFORTO * jaqoMasko * montoVap6zukani + hakhacaht2 * HAKILAFORTO + ondetoj * ONDETAFORTO;
	}
	function l6da(x, z) {
		return l6daElKontinento(x, z, multoblaBruo(x / KONTINENTASKALO, z / KONTINENTASKALO, 5, sKontinento));
	}
	const hal6da = new Float32Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
		hal6da[id] = ene[id] ? l6daElKontinento(x, z, kontinentajHevem2[id]) : l6da(x, z);
	}
	const tsasaMasko = new Uint8Array(N);
	const c2w2q = (i, j) => i < 0 || j < 0 || i >= n || j >= n ? false : ene[j * n + i] === 1 && hal6da[j * n + i] < vem2;
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id] || hal6da[id] >= vem2) continue;
		if (c2w2q(i - 1, j) || c2w2q(i, j - 1)) continue;
		tsasaMasko[id] = 1;
	}
	const habs2 = new Uint8Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		const h = hal6da[id];
		if (h < vem2) {
			habs2[id] = famaf(x0 / 36 + i, z0 / 36 + j, sPlantoj) > 1 / 2 ? BIOMOAKVAJPLANTOJ : BIOMOEKVIZETO;
			continue;
		}
		if (h > 18) habs2[id] = BIOMOJAQO;
		else if (h > 4) habs2[id] = BIOMOVALO;
		else habs2[id] = BIOMOEBENAJXO;
	}
	const hapaga = new Uint8Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		const h = hal6da[id];
		if (h < vem2 + 4 / 8) {
			hapaga[id] |= BESTOAKVA;
			continue;
		}
		if (famaf(i / 12, j / 12, sHapaga) > 56 / 64) hapaga[id] |= BESTOPETRELA;
		const v = i > 0 && i < n - 1 ? i - 1 : i;
		const w = i > 0 && i < n - 1 ? i + 1 : i;
		const p = j > 0 && j < n - 1 ? j - 1 : j;
		const q = j > 0 && j < n - 1 ? j + 1 : j;
		if (Math.max(Math.abs(hal6da[j * n + w] - hal6da[j * n + v]), Math.abs(hal6da[q * n + i] - hal6da[p * n + i])) / (2 * vepat6ni) < 24 / 64 && h > vem2 + 1) hapaga[id] |= BESTONPC;
	}
	const hakandidato = [];
	for (let j = 1; j < n - 1; j++) for (let i = 1; i < n - 1; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		const h = hal6da[id];
		if (h < FONTAMINIMUMAL6DA) continue;
		let plosteq = h;
		for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
			if (di === 0 && dj === 0) continue;
			plosteq = Math.max(plosteq, hal6da[(j + dj) * n + i + di]);
		}
		if (h >= plosteq) hakandidato.push({
			id,
			h
		});
	}
	hakandidato.sort((a, b) => b.h - a.h);
	const hatsiq = [];
	for (const k of hakandidato) {
		if (hatsiq.length >= FONTAKVANTO) break;
		const i = k.id % n, j = (k.id - i) / n;
		const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
		let troTsiike = false;
		for (const f of hatsiq) if (Math.hypot(f.x - x, f.z - z) < FONTADISTANCO) {
			troTsiike = true;
			break;
		}
		if (troTsiike) continue;
		hatsiq.push({
			x,
			z,
			las: FONTAFLUO
		});
	}
	return {
		ruva: tk2ni,
		l6da,
		tsasaMasko,
		habs2,
		hapaga,
		hatsiq,
		jaqoRuvaKozunu: 83 / 64 + subRuva(tk2ni, KANALOMONTARASEMO) % 2048 / 2048 * 64
	};
}
// ../../kanta/mut6q-havop2/geles/qox2n2k.ts
const SKULPTAORIGINO = [-384, -384];
// ../../kanta/mut6q-havop2/geles/tsasa.ts
const SKULPTAAKVANIVELO = -288 / 64;
// ../../skek2/p6kpu/mapqoxa.ts
const TAFKAQPAL6 = 3 / 8;
function qoxaPal6(qoxa, pal6) {
	return qoxa === "c2q" ? pal6 : pal6 * TAFKAQPAL6;
}
function qoxaTltani(qoxa, pal6) {
	if (qoxa === "c2q") return [];
	if (qoxa === "qotawa") return [
		[pal6, pal6],
		[-pal6, pal6],
		[-pal6, -pal6],
		[pal6, -pal6]
	];
	const h = pal6 * Math.sqrt(3) / 2;
	return [
		[0, pal6],
		[-h, -pal6 / 2],
		[h, -pal6 / 2]
	];
}
function qoxaBsej2kuq(qoxa, pal6) {
	const rc = qoxaPal6(qoxa, pal6);
	const santaKozuni = qoxa === "qotawa" ? rc * Math.SQRT2 : 2 * rc;
	return qoxaTltani(qoxa, pal6).map((p) => {
		const d = Math.hypot(p[0], p[1]) || 1;
		return [p[0] * (1 - santaKozuni / d), p[1] * (1 - santaKozuni / d)];
	});
}
function pukazXiix2qKa5ik(tltani) {
	const n = tltani.length;
	const xiix2q = [];
	const haka5ik = [];
	for (let i = 0; i < n; i++) {
		const a = tltani[i], b = tltani[(i + 1) % n];
		const mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2;
		const d = Math.hypot(mx, mz) || 1;
		xiix2q.push([mx / d, mz / d]);
		haka5ik.push(d);
	}
	return {
		xiix2q,
		haka5ik
	};
}
function pukazBsej2kuq(xiix2q, haka5ik, x, z) {
	for (let i = 0; i < xiix2q.length; i++) if (xiix2q[i][0] * x + xiix2q[i][1] * z > haka5ik[i] + 1 / 512) return false;
	return true;
}
function ka5ikH6kuni(qoxa, pal6, tafkaq) {
	if (qoxa === "c2q") return pal6;
	const ux = Math.cos(tafkaq), uz = Math.sin(tafkaq);
	const rc = qoxaPal6(qoxa, pal6);
	const tltani = qoxaTltani(qoxa, pal6);
	const { xiix2q, haka5ik } = pukazXiix2qKa5ik(tltani);
	const c2h2 = qoxaBsej2kuq(qoxa, pal6);
	let plosteq = 0;
	for (let i = 0; i < tltani.length; i++) {
		const a = tltani[i], b = tltani[(i + 1) % tltani.length];
		const dx = b[0] - a[0], dz = b[1] - a[1];
		const determinanto = ux * dz - uz * dx;
		if (Math.abs(determinanto) < 8 ** -10) continue;
		const t = (a[0] * dz - a[1] * dx) / determinanto;
		if (t > plosteq && pukazBsej2kuq(xiix2q, haka5ik, ux * t, uz * t)) plosteq = t;
	}
	for (const p of c2h2) {
		const phaka = ux * p[0] + uz * p[1];
		const c2w2q = phaka * phaka - (p[0] * p[0] + p[1] * p[1]) + rc * rc;
		if (c2w2q < 0) continue;
		const t = phaka + Math.sqrt(c2w2q);
		if (t > plosteq && pukazBsej2kuq(xiix2q, haka5ik, ux * t, uz * t)) plosteq = t;
	}
	return plosteq;
}
function h6kuniQoxa(qoxa, pal6, x, z) {
	const r = Math.hypot(x, z);
	if (r < 8 ** -10) return -ka5ikH6kuni(qoxa, pal6, 0);
	return r - ka5ikH6kuni(qoxa, pal6, Math.atan2(z, x));
}
function bsej2kuqQoxa(qoxa, pal6, x, z) {
	return h6kuniQoxa(qoxa, pal6, x, z) <= 0;
}
// ../../kanta/mut6q-havop2/bal2.ts
const Habal2 = [{
	s2kanta: "geles",
	ksaka: "Geles bal2",
	kxe: true,
	qoxa: "c2q",
	pal6: 384
}];
// ../../kanta/mut6q-havop2/bal2S2kanta.ts
function kxeBal2() {
	return Habal2.find((m) => m.kxe) ?? Habal2[0];
}
const HEKEBAR6Q = 9192631770 / 4294967296 / 1e3;
function tbo(bar6q) {
	return bar6q * HEKEBAR6Q;
}
const KNAK2FECAJASAI = "ɔıɿцэꞟɩƨ";
function knak2fecajasai(k2fe, kuxa = 2) {
	const neni = k2fe < 0;
	const k2feSa = 8 ** kuxa;
	const xekuxa = Math.round(Math.abs(k2fe) * k2feSa);
	const k2feXa = Math.floor(xekuxa / k2feSa);
	const okef = kuxa === 0 ? "" : "." + (xekuxa % k2feSa).toString(8).padStart(kuxa, "0").replace(/[0-7]/g, (okef) => KNAK2FECAJASAI[Number(okef)]);
	return (neni ? "-" : "") + "ꞙɭ" + k2feXa.toString(8).replace(/[0-7]/g, (okef) => KNAK2FECAJASAI[Number(okef)]) + okef;
}
// vecaxl.ts
const bal2 = kxeBal2();
const NOMBRODAJXUROJ = 9;
let kamasumo = 0;
function kuri() {
	const mut6q = generiT6liman(342391, 192, 4, SKULPTAORIGINO, SKULPTAAKVANIVELO, (x, z) => bsej2kuqQoxa(bal2.qoxa, bal2.pal6, x, z));
	let tlunakani = 0;
	for (let i = 0; i < mut6q.tsasaMasko.length; i += 9) tlunakani += mut6q.tsasaMasko[i] + mut6q.habs2[i] * 3 + mut6q.hapaga[i] * 7;
	for (let i = 0; i < 64; i++) tlunakani += mut6q.l6da(SKULPTAORIGINO[0] + i * 3, SKULPTAORIGINO[1] + i * 5);
	return tlunakani;
}
kamasumo = kuri();
const tif = [];
for (let r = 0; r < NOMBRODAJXUROJ; r++) {
	const t0 = performance.now();
	kamasumo = kuri();
	tif.push(performance.now() - t0);
}
tif.sort((a, b) => a - b);
console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ｡ ſȷƽᴜ ɭʃᴜ }ʃw = ${knak2fecajasai(tbo(tif[tif.length >> 1]), 6)} He ſɭc̭ᴜ ŋᷠɹ ŋᷠɹ = ${knak2fecajasai(tbo(tif[0]), 6)} He ȏoͩſ̀ȷᴜƽ ꞁȷ̀ᴜ }ʃꞇ = ${kamasumo.toFixed(4)}`);
export {};
