// kantaoj/mondo/ruva.ts
function subSemo(tk2ni, qar6xe) {
	let h = tk2ni + Math.imul(qar6xe + 1, 2654435761) | 0;
	h ^= h >>> 14;
	h = Math.imul(h, 2246822519);
	h ^= h >>> 11;
	return h >>> 0;
}
// kantaoj/tom6nu/interpolo.ts
function glata(t) {
	return t * t * (3 - 2 * t);
}
function glataPaso(lo, hi, v) {
	return glata(Math.max(0, Math.min(1, (v - lo) / (hi - lo))));
}
// kantaoj/mondo/casacakakcasai.ts
const KANALO_KONTINENTO = 1;
const KANALO_JAQO = 2;
const KANALO_HAKHACAHT2 = 3;
const KANALO_ONDETOJ = 4;
const KANALO_PLANTOJ = 5;
const KANALO_BESTOJ = 8;
const KANALO_MONTARA_SEMO = 9;
const KANALO_KARAKT6LIMA = 10;
const KONTINENTA_SKALO = 272;
const MONTARA_SKALO = 112;
const HAKILA_SKALO = 72;
const ONDETA_SKALO = 26;
const KONTINENTA_FORTO = 46;
const KONTINENTA_L6DA = 2;
const MONTARA_FORTO = 36;
const HAKILA_FORTO = 12;
const ONDETA_FORTO = 8;
const KONTINENTA_MEDIANO = 1 / 2;
const MONTARA_KVANTILO = 56 / 64;
const MONTARA_SOJL_LO = 5 / 64;
const MONTARA_SOJL_HI = 8 / 64;
const KARAKTERA_BAZO = 7 / 8;
const KARAKTERA_VARIO = 6 / 8;
const BIOMO_JAQO = 1;
const BIOMO_VALO = 2;
const BIOMO_EBENAJXO = 3;
const BIOMO_AKVAJ_PLANTOJ = 4;
const BIOMO_EKVIZETO = 5;
const BESTO_AKVA = 1;
const BESTO_PETRELA = 2;
const BESTO_NPC = 4;
const FONTA_MINIMUMA_L6DA = 16;
const FONTA_DISTANCO = 32;
const FONTA_KVANTO = 20;
const FONTA_FLUO = 16;
function miksu(a, b, s) {
	let n = Math.imul(a, 461845907) ^ Math.imul(b, 668265261) ^ s | 0;
	n = Math.imul(n ^ n >>> 13, 2246822507);
	return ((n ^ n >>> 11) >>> 0) / 4294967296;
}
function famaf(x, z, s) {
	const ix = Math.floor(x), iz = Math.floor(z);
	const fx = x - ix, fz = z - iz;
	const u = glata(fx);
	const v = glata(fz);
	const a = miksu(ix, iz, s);
	const b = miksu(ix + 1, iz, s);
	const c = miksu(ix, iz + 1, s);
	const d = miksu(ix + 1, iz + 1, s);
	return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function multoblaBruo(x, z, oktoj, s) {
	let tlunakani = 0, amplekso = 1, normo = 0, f = 1;
	for (let i = 0; i < oktoj; i++) {
		tlunakani += amplekso * famaf(x * f, z * f, s + i * 5369127);
		normo += amplekso;
		amplekso *= 1 / 2;
		f *= 2;
	}
	return tlunakani / normo;
}
function kresto(x, z, oktoj, s) {
	let tlunakani = 0, amplekso = 1, normo = 0, f = 1;
	for (let i = 0; i < oktoj; i++) {
		const n = famaf(x * f, z * f, s + i * 668265261);
		const k = 1 - Math.abs(2 * n - 1);
		tlunakani += k * k * amplekso;
		normo += amplekso;
		amplekso *= 1 / 2;
		f *= 2;
	}
	return tlunakani / normo;
}
function generiT6liman(tk2ni, n, vepat6ni, origino, vem2, enQoxa) {
	const sKontinento = subSemo(tk2ni, KANALO_KONTINENTO);
	const sJaqo = subSemo(tk2ni, KANALO_JAQO);
	const sHakhacaht2 = subSemo(tk2ni, KANALO_HAKHACAHT2);
	const sOndetoj = subSemo(tk2ni, KANALO_ONDETOJ);
	const sPlantoj = subSemo(tk2ni, KANALO_PLANTOJ);
	const sHapaga = subSemo(tk2ni, KANALO_BESTOJ);
	const N = n * n;
	const x0 = origino[0], z0 = origino[1];
	const kontinentoj = [];
	const kontinentajHaskek2 = new Float64Array(N);
	const ene = new Uint8Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
		const id = j * n + i;
		const ena = enQoxa(x, z);
		ene[id] = ena ? 1 : 0;
		if (!ena) continue;
		const kontinento = multoblaBruo(x / KONTINENTA_SKALO, z / KONTINENTA_SKALO, 5, sKontinento);
		kontinentajHaskek2[id] = kontinento;
		kontinentoj.push(kontinento);
	}
	kontinentoj.sort((a, b) => a - b);
	const havecax2l = kontinentoj.length;
	const mediano = havecax2l > 0 ? kontinentoj[havecax2l >> 1] : KONTINENTA_MEDIANO;
	const plosteq = havecax2l > 0 ? kontinentoj[Math.floor(havecax2l * MONTARA_KVANTILO)] : KONTINENTA_MEDIANO;
	const montoFaktoro = KARAKTERA_BAZO + subSemo(tk2ni, KANALO_KARAKT6LIMA) % 512 / 512 * KARAKTERA_VARIO;
	function l6daElKontinento(x, z, kontinento) {
		const jaqo = kresto(x / MONTARA_SKALO, z / MONTARA_SKALO, 5, sJaqo);
		const hakhacaht2 = multoblaBruo(x / HAKILA_SKALO, z / HAKILA_SKALO, 3, sHakhacaht2) - 1 / 2;
		const ondetoj = multoblaBruo(x / ONDETA_SKALO, z / ONDETA_SKALO, 4, sOndetoj) - 1 / 2;
		const kozuni = (kontinento - mediano) * KONTINENTA_FORTO + KONTINENTA_L6DA;
		const jaqoMasko = glataPaso(plosteq - MONTARA_SOJL_LO, plosteq + MONTARA_SOJL_HI, kontinento);
		return kozuni + jaqo * jaqo * MONTARA_FORTO * jaqoMasko * montoFaktoro + hakhacaht2 * HAKILA_FORTO + ondetoj * ONDETA_FORTO;
	}
	function l6da(x, z) {
		return l6daElKontinento(x, z, multoblaBruo(x / KONTINENTA_SKALO, z / KONTINENTA_SKALO, 5, sKontinento));
	}
	const hal6da = new Float32Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
		hal6da[id] = ene[id] ? l6daElKontinento(x, z, kontinentajHaskek2[id]) : l6da(x, z);
	}
	const akvaMasko = new Uint8Array(N);
	const sub = (i, j) => i < 0 || j < 0 || i >= n || j >= n ? false : ene[j * n + i] === 1 && hal6da[j * n + i] < vem2;
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id] || hal6da[id] >= vem2) continue;
		if (sub(i - 1, j) || sub(i, j - 1)) continue;
		akvaMasko[id] = 1;
	}
	const habs2 = new Uint8Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		const h = hal6da[id];
		if (h < vem2) {
			habs2[id] = famaf(x0 / 36 + i, z0 / 36 + j, sPlantoj) > 1 / 2 ? BIOMO_AKVAJ_PLANTOJ : BIOMO_EKVIZETO;
			continue;
		}
		if (h > 18) habs2[id] = BIOMO_JAQO;
		else if (h > 4) habs2[id] = BIOMO_VALO;
		else habs2[id] = BIOMO_EBENAJXO;
	}
	const hapaga = new Uint8Array(N);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		const h = hal6da[id];
		if (h < vem2 + 4 / 8) {
			hapaga[id] |= BESTO_AKVA;
			continue;
		}
		if (famaf(i / 12, j / 12, sHapaga) > 56 / 64) hapaga[id] |= BESTO_PETRELA;
		const v = i > 0 && i < n - 1 ? i - 1 : i;
		const w = i > 0 && i < n - 1 ? i + 1 : i;
		const p = j > 0 && j < n - 1 ? j - 1 : j;
		const q = j > 0 && j < n - 1 ? j + 1 : j;
		if (Math.max(Math.abs(hal6da[j * n + w] - hal6da[j * n + v]), Math.abs(hal6da[q * n + i] - hal6da[p * n + i])) / (2 * vepat6ni) < 24 / 64 && h > vem2 + 1) hapaga[id] |= BESTO_NPC;
	}
	const kandidatoj = [];
	for (let j = 1; j < n - 1; j++) for (let i = 1; i < n - 1; i++) {
		const id = j * n + i;
		if (!ene[id]) continue;
		const h = hal6da[id];
		if (h < FONTA_MINIMUMA_L6DA) continue;
		let kma = h;
		for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
			if (di === 0 && dj === 0) continue;
			kma = Math.max(kma, hal6da[(j + dj) * n + i + di]);
		}
		if (h >= kma) kandidatoj.push({
			id,
			h
		});
	}
	kandidatoj.sort((a, b) => b.h - a.h);
	const hatsiq = [];
	for (const k of kandidatoj) {
		if (hatsiq.length >= FONTA_KVANTO) break;
		const i = k.id % n, j = (k.id - i) / n;
		const x = x0 + i * vepat6ni, z = z0 + j * vepat6ni;
		let troProksima = false;
		for (const f of hatsiq) if (Math.hypot(f.x - x, f.z - z) < FONTA_DISTANCO) {
			troProksima = true;
			break;
		}
		if (troProksima) continue;
		hatsiq.push({
			x,
			z,
			fluo: FONTA_FLUO
		});
	}
	return {
		semo: tk2ni,
		l6da,
		akvaMasko,
		habs2,
		hapaga,
		hatsiq,
		jaqoSemoBazo: 83 / 64 + subSemo(tk2ni, KANALO_MONTARA_SEMO) % 2048 / 2048 * 64
	};
}
// kantaoj/mut6q-havop2/geles/krado.ts
const SKULPTA_ORIGINO = [-384, -384];
// kantaoj/mut6q-havop2/geles/tsasa.ts
const SKULPTA_AKVA_NIVELO = -288 / 64;
// eskekoj/tom6nu/mapqoxa.ts
const TAFKAQ_PAL6 = 3 / 8;
function qoxaPal6(qoxa, pal6) {
	return qoxa === "c2q" ? pal6 : pal6 * TAFKAQ_PAL6;
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
function pukazX2x2qKa5ik(tltani) {
	const n = tltani.length;
	const p6kpu = [];
	const haka5ik = [];
	for (let i = 0; i < n; i++) {
		const a = tltani[i], b = tltani[(i + 1) % n];
		const mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2;
		const d = Math.hypot(mx, mz) || 1;
		p6kpu.push([mx / d, mz / d]);
		haka5ik.push(d);
	}
	return {
		p6kpu,
		haka5ik
	};
}
function pukazBsej2kuq(p6kpu, haka5ik, x, z) {
	for (let i = 0; i < p6kpu.length; i++) if (p6kpu[i][0] * x + p6kpu[i][1] * z > haka5ik[i] + 1 / 512) return false;
	return true;
}
function ka5ikH6kuni(qoxa, pal6, tafkaq) {
	if (qoxa === "c2q") return pal6;
	const ux = Math.cos(tafkaq), uz = Math.sin(tafkaq);
	const rc = qoxaPal6(qoxa, pal6);
	const tltani = qoxaTltani(qoxa, pal6);
	const { p6kpu, haka5ik } = pukazX2x2qKa5ik(tltani);
	const bsej2kuq = qoxaBsej2kuq(qoxa, pal6);
	let kma = 0;
	for (let i = 0; i < tltani.length; i++) {
		const a = tltani[i], b = tltani[(i + 1) % tltani.length];
		const dx = b[0] - a[0], dz = b[1] - a[1];
		const determinanto = ux * dz - uz * dx;
		if (Math.abs(determinanto) < 8 ** -10) continue;
		const t = (a[0] * dz - a[1] * dx) / determinanto;
		if (t > kma && pukazBsej2kuq(p6kpu, haka5ik, ux * t, uz * t)) kma = t;
	}
	for (const p of bsej2kuq) {
		const projekcio = ux * p[0] + uz * p[1];
		const sub = projekcio * projekcio - (p[0] * p[0] + p[1] * p[1]) + rc * rc;
		if (sub < 0) continue;
		const t = projekcio + Math.sqrt(sub);
		if (t > kma && pukazBsej2kuq(p6kpu, haka5ik, ux * t, uz * t)) kma = t;
	}
	return kma;
}
function h6kuniQoxa(qoxa, pal6, x, z) {
	const r = Math.hypot(x, z);
	if (r < 8 ** -10) return -ka5ikH6kuni(qoxa, pal6, 0);
	return r - ka5ikH6kuni(qoxa, pal6, Math.atan2(z, x));
}
function bsej2kuqQoxa(qoxa, pal6, x, z) {
	return h6kuniQoxa(qoxa, pal6, x, z) <= 0;
}
// kantaoj/mut6q-havop2/bal2.ts
const MAPOJ = [{
	kodo: "cxefa",
	ksaka: "Geles mapo",
	aktiva: true,
	qoxa: "c2q",
	grandeco: 384
}];
// kantaoj/mut6q-havop2/bal2S2kanta.ts
function aktivaMapo() {
	return MAPOJ.find((m) => m.aktiva) ?? MAPOJ[0];
}
// hacaht2/vecax2l/casacakakcasai.ts
const mapo = aktivaMapo();
const NOMBRO_DA_JXUROJ = 9;
let kamasumo = 0;
function kuri() {
	const mut6q = generiT6liman(342391, 192, 4, SKULPTA_ORIGINO, SKULPTA_AKVA_NIVELO, (x, z) => bsej2kuqQoxa(mapo.qoxa, mapo.grandeco, x, z));
	let tlunakani = 0;
	for (let i = 0; i < mut6q.akvaMasko.length; i += 9) tlunakani += mut6q.akvaMasko[i] + mut6q.habs2[i] * 3 + mut6q.hapaga[i] * 7;
	for (let i = 0; i < 64; i++) tlunakani += mut6q.l6da(SKULPTA_ORIGINO[0] + i * 3, SKULPTA_ORIGINO[1] + i * 5);
	return tlunakani;
}
kamasumo = kuri();
const tempoj = [];
for (let r = 0; r < NOMBRO_DA_JXUROJ; r++) {
	const t0 = performance.now();
	kamasumo = kuri();
	tempoj.push(performance.now() - t0);
}
tempoj.sort((a, b) => a - b);
console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ʌ ſɟɔȝ mediano=${tempoj[tempoj.length >> 1].toFixed(1)}ms min=${tempoj[0].toFixed(1)}ms kamasumo=${kamasumo.toFixed(4)}`);
export {};
