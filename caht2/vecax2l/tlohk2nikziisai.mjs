const HEKE = 9192631770 / 4294967296;
const HEKEBAR6Q = HEKE / 1e3;
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
// ../../kanta/tahaq/tlohk2nikziisai.ts
const AMALTAHAQSAPSE1I = HEKE / 60;
const VAHASATAHAQSAPSE1I = HEKE / 30;
const QUN2KSABATAHAQSAPSE1I = HEKE / 24;
const TAHAQPLOSTEQ = tbo(1 / 4);
const MUQVEM2 = 5 / 4;
const SEHEVEM2 = 9 / 8;
const KAFS2JHATAHAQ = 8;
const MUQJHATAHAQ = 8;
const SEHEJHATAHAQ = 512;
const PAL6TBO = 1 / 8;
const SAXEPAL6MIN = 1 / 2;
const SOST2VEM2 = 1 / 8;
const TAHAQ3AKAKVEM2 = 8;
function kf2Rultemon(hasukf2qani = {}) {
	const malmultekosta = hasukf2qani.malmultekosta ?? false;
	const saxeP6zuk = Math.max(1 / 4, Math.min(1, hasukf2qani.saxeP6zuk ?? SAXEPAL6MIN));
	let ksabita = true;
	let sakP6zuk = 1;
	let sakTahaq = -Infinity;
	let xaqadiTahaq = -Infinity;
	let kafs2jTahaqVek2fe = KAFS2JHATAHAQ;
	let muqjTahaqVek2fe = 0;
	let sehejTahaqVek2fe = 0;
	let habilde = 0;
	let preterpasitaj = 0;
	let mezaTahaqSapse1i = malmultekosta ? VAHASATAHAQSAPSE1I : AMALTAHAQSAPSE1I;
	function celaTahaqSapse1i() {
		if (!ksabita) return QUN2KSABATAHAQSAPSE1I;
		return malmultekosta ? VAHASATAHAQSAPSE1I : AMALTAHAQSAPSE1I;
	}
	function restarigi() {
		sakTahaq = -Infinity;
		xaqadiTahaq = -Infinity;
		kafs2jTahaqVek2fe = KAFS2JHATAHAQ;
		muqjTahaqVek2fe = 0;
		sehejTahaqVek2fe = 0;
		mezaTahaqSapse1i = celaTahaqSapse1i();
	}
	function catsaraFokuson(ksaba2s2) {
		if (ksabita === ksaba2s2) return;
		ksabita = ksaba2s2;
		restarigi();
	}
	function xesaka(sapse1i, interlota) {
		if (sapse1i > interlota * TAHAQ3AKAKVEM2) {
			muqjTahaqVek2fe = 0;
			sehejTahaqVek2fe = 0;
			mezaTahaqSapse1i = interlota;
			return;
		}
		mezaTahaqSapse1i += (sapse1i - mezaTahaqSapse1i) * SOST2VEM2;
		if (kafs2jTahaqVek2fe > 0) {
			kafs2jTahaqVek2fe--;
			return;
		}
		if (mezaTahaqSapse1i > interlota * MUQVEM2) {
			muqjTahaqVek2fe++;
			sehejTahaqVek2fe = 0;
		} else if (mezaTahaqSapse1i < interlota * SEHEVEM2) {
			sehejTahaqVek2fe++;
			muqjTahaqVek2fe = 0;
		} else {
			muqjTahaqVek2fe = 0;
			sehejTahaqVek2fe = 0;
		}
		if (muqjTahaqVek2fe >= MUQJHATAHAQ && sakP6zuk > saxeP6zuk) {
			sakP6zuk = Math.max(saxeP6zuk, sakP6zuk - PAL6TBO);
			muqjTahaqVek2fe = 0;
		} else if (sehejTahaqVek2fe >= SEHEJHATAHAQ && sakP6zuk < 1) {
			sakP6zuk = Math.min(1, sakP6zuk + PAL6TBO);
			sehejTahaqVek2fe = 0;
		}
	}
	function bildigu(cal) {
		const interlota = celaTahaqSapse1i();
		if (cal + TAHAQPLOSTEQ < sakTahaq) {
			preterpasitaj++;
			return false;
		}
		if (sakTahaq === -Infinity) sakTahaq = cal;
		sakTahaq = cal - sakTahaq >= interlota ? cal + interlota : sakTahaq + interlota;
		const sapse1i = xaqadiTahaq === -Infinity ? interlota : Math.max(0, cal - xaqadiTahaq);
		xaqadiTahaq = cal;
		habilde++;
		xesaka(sapse1i, interlota);
		return true;
	}
	return {
		bildigu,
		restarigi,
		catsaraFokuson,
		get p6zukani() {
			return sakP6zuk;
		},
		get celaTahaqSapse1i() {
			return celaTahaqSapse1i();
		},
		get habilde() {
			return habilde;
		},
		get preterpasitaj() {
			return preterpasitaj;
		},
		get mezaTahaqSapse1i() {
			return mezaTahaqSapse1i;
		}
	};
}
// tlohk2nikziisai.ts
const SAPSE1I = 32;
const FIKSITAPARTO = 1 / 4;
const ETATOLEREMO = tbo(1 / 512);
const H2Y2KMUQ = tbo(1e3 / 48);
const H2Y2KSEHE = tbo(1e3 / 56);
function hafDe(kozunuHaf, p6zukani) {
	return kozunuHaf * (FIKSITAPARTO + .75 * p6zukani * p6zukani);
}
function simuliH2y2kn(hakagani) {
	let p6zukani = 1;
	let muqj = 0;
	let sehej = 0;
	let ne3ak2Tahaq = -Infinity;
	let kfekoc2kai = 0;
	let habilde = 0;
	let haf = 0;
	let ciitaHaf = 0;
	for (let nun = 0; nun <= SAPSE1I; nun += hakagani.kf2TahaqSapse1i) {
		if (nun + ETATOLEREMO < kfekoc2kai) continue;
		const sapse1i = ne3ak2Tahaq === -Infinity ? hakagani.kf2TahaqSapse1i : nun - ne3ak2Tahaq;
		ne3ak2Tahaq = nun;
		if (sapse1i > H2Y2KMUQ) {
			muqj++;
			sehej = 0;
		} else if (sapse1i < H2Y2KSEHE) {
			sehej++;
			muqj = 0;
		}
		if (muqj >= 12 && p6zukani > 6 / 8) {
			p6zukani = Math.max(6 / 8, p6zukani - 2 / 8);
			muqj = 0;
		} else if (sehej >= 88 && p6zukani < 1) {
			p6zukani = Math.min(1, p6zukani + 1 / 8);
			sehej = 0;
		}
		const kosto = hafDe(hakagani.kozunuHaf, p6zukani);
		kfekoc2kai = nun + kosto;
		haf += kosto;
		ciitaHaf += p6zukani * p6zukani;
		habilde++;
	}
	return {
		haTahaqHe: habilde / SAPSE1I,
		hafParto: haf / SAPSE1I,
		haciitaHe: ciitaHaf / SAPSE1I,
		p6zukani,
		celaTahaqSapse1i: hakagani.kf2TahaqSapse1i
	};
}
function simuliSef4n(hakagani) {
	const rultif = kf2Rultemon({ malmultekosta: hakagani.malmultekosta });
	if (hakagani.senfokusa) rultif.catsaraFokuson(false);
	let kfekoc2kai = 0;
	let haf = 0;
	let ciitaHaf = 0;
	for (let nun = 0; nun <= SAPSE1I; nun += hakagani.kf2TahaqSapse1i) {
		if (nun + ETATOLEREMO < kfekoc2kai || !rultif.bildigu(nun)) continue;
		const kosto = hafDe(hakagani.kozunuHaf, rultif.p6zukani);
		kfekoc2kai = nun + kosto;
		haf += kosto;
		ciitaHaf += rultif.p6zukani * rultif.p6zukani;
	}
	return {
		haTahaqHe: rultif.habilde / SAPSE1I,
		hafParto: haf / SAPSE1I,
		haciitaHe: ciitaHaf / SAPSE1I,
		p6zukani: rultif.p6zukani,
		celaTahaqSapse1i: rultif.celaTahaqSapse1i
	};
}
function raporti(hakagani) {
	const h2y2k = simuliH2y2kn(hakagani);
	const sef4 = simuliSef4n(hakagani);
	const hafŜqanu = (1 - sef4.hafParto / h2y2k.hafParto) * 100;
	const h2y2kTahaqHaf = h2y2k.hafParto / h2y2k.haTahaqHe;
	const sef4TahaqHaf = sef4.hafParto / sef4.haTahaqHe;
	const ve3aqS2bana = (hafŜqanu < 0 ? "-ꞙɭ" : "ꞙɭ") + Math.abs(Math.round(hafŜqanu)).toString(8) + "%";
	console.log(`( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) ${hakagani.ksaka} | ſɭw ſᶘɜ ʌ j͑ʃᴜ ı],ɔ ${knak2fecajasai(h2y2k.haTahaqHe)}/He ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${knak2fecajasai(h2y2k.p6zukani)} | ſɭw ſᶘɜ ʌ ſɭc̭ᴜ ŋᷠɹ ŋᷠɹ ʌ j͑ʃƨꞇ ֭ſɭɹ ${knak2fecajasai(sef4.haTahaqHe)}/He ｡ ſɭэ ᶗ‹ ${knak2fecajasai(1 / sef4.celaTahaqSapse1i)}/He ｡ j͑ʃƨꞇʞ ʌ ſɭэ }ʃᴜ ${knak2fecajasai(sef4.celaTahaqSapse1i, 3)} He ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${knak2fecajasai(sef4.p6zukani)} | j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ${knak2fecajasai(h2y2kTahaqHaf, 3)} → ${knak2fecajasai(sef4TahaqHaf, 3)} He | ſ͕ɭᴜƣ̋ ꞁȷ̀ɜ ı],ɔ ŋᷠɜ ${knak2fecajasai(h2y2k.hafParto)} → ${knak2fecajasai(sef4.hafParto)} | j͑ʃ'ɔ ſ̀ȷᴜȝ ${ve3aqS2bana} | ſɟɹ ɭʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ${knak2fecajasai(h2y2k.haciitaHe)} → ${knak2fecajasai(sef4.haciitaHe)}`);
	return {
		h2y2k,
		sef4
	};
}
function cel2nu(thaweni, vop2lna) {
	if (!thaweni) throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${vop2lna}`);
}
cel2nu(knak2fecajasai(8, 0) === "ꞙɭıɔ", "ſɭɹ ſȷɔ ʌ j͑ʃᴜ ı],ɔ ｡ ꞙɭıɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
cel2nu(knak2fecajasai(1 / 2) === "ꞙɭɔ.эɔ", "ſ͕ɭᴜƣ̋ ʌ ſɭɹ ſȷɔ ｡ ꞙɭıɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
cel2nu(knak2fecajasai(-1 / 2) === "-ꞙɭɔ.эɔ", "ſ͕ɭᴜƣ̋ ʌ ſןɔ ｡ ꞙɭıɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
const l6da = raporti({
	ksaka: "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ŋᷠɹ",
	kf2TahaqSapse1i: tbo(1e3 / 120),
	kozunuHaf: tbo(6)
});
cel2nu(l6da.sef4.haTahaqHe < l6da.h2y2k.haTahaqHe * 3 / 4, "ſɭw ſᶘɜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ʌ ſןɔ ʌ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ŋᷠɹ");
cel2nu(l6da.sef4.p6zukani === 1, "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ŋᷠɹ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭw ſᶘɜ");
const neregula = raporti({
	ksaka: "ſɟᴜ ſȷᴜɔ˞ ｡ j͑ʃƨꞇʞ ʌ ſןɔ ʌ ſɭɹ ſȷɔ",
	kf2TahaqSapse1i: tbo(1e3 / 144),
	kozunuHaf: tbo(6)
});
const normalaTahaqjHe = 60 / HEKE;
cel2nu(Math.abs(neregula.sef4.haTahaqHe - normalaTahaqjHe) < normalaTahaqjHe * 1 / 16, "ſɭw ſᶘɜ ʌ ſɭэ }ʃᴜ ｡ ſןɔ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭэ ᶗ‹ ʌ ſɟᴜ ſȷᴜɔ˞ ｡ j͑ʃƨꞇʞ ʌ ſןɔ ʌ ſɭɹ ſȷɔ");
cel2nu(neregula.sef4.p6zukani === 1, "ſɟᴜ ſȷᴜɔ˞ ｡ j͑ʃƨꞇʞ ʌ ſןɔ ʌ ſɭɹ ſȷɔ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭw ſᶘɜ");
const malpotenca = raporti({
	ksaka: "ı],ᴜ ſ͕ȷᴜ j͑ʃᴜꞇ ʌ ſןᴜ j͐ʃэ ŋᷠɹ",
	kf2TahaqSapse1i: tbo(1e3 / 60),
	kozunuHaf: tbo(60),
	malmultekosta: true
});
cel2nu(malpotenca.sef4.p6zukani < malpotenca.h2y2k.p6zukani, "ı],ᴜ ſ͕ȷᴜ j͑ʃᴜꞇ ʌ ſןᴜ j͐ʃэ ŋᷠɹ ｡ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ");
cel2nu(malpotenca.sef4.haTahaqHe > malpotenca.h2y2k.haTahaqHe, "ſɭw ſᶘɜ ʌ ſɭc̭ᴜ ŋᷠɹ ŋᷠɹ ʌ j͑ʃƨꞇ ֭ſɭɹ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ jɟɜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ");
const tridek = raporti({
	ksaka: "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ",
	kf2TahaqSapse1i: tbo(1e3 / 30),
	kozunuHaf: tbo(20),
	malmultekosta: true
});
cel2nu(tridek.sef4.p6zukani === 1, "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭэ }ʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ");
cel2nu(tridek.h2y2k.p6zukani < 1, "ſɭw ſᶘɜ ʌ j͑ʃᴜ ı],ɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ");
const senfokusa = raporti({
	ksaka: "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ",
	kf2TahaqSapse1i: tbo(1e3 / 120),
	kozunuHaf: tbo(6),
	senfokusa: true
});
cel2nu(senfokusa.sef4.celaTahaqSapse1i === HEKE / 24, "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ ｡ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃƨꞇʞ ʌ ſɭэ }ʃᴜ ɭl̀ᴜ");
cel2nu(senfokusa.sef4.hafParto < senfokusa.h2y2k.hafParto / 4, "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ ｡ ſןɔ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗");
const alterna = kf2Rultemon();
let alternaTif = 0;
for (let i = 0; i < 64; i++) {
	alterna.bildigu(alternaTif);
	alternaTif += HEKE / (i % 2 === 0 ? 30 : 60);
}
cel2nu(alterna.p6zukani < 1, "ſȷƽᴜ ɭʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭэ }ʃᴜ ʌ jɟɜ ʌ ſɭᴜ j͑ʃƨɔ ɭl̀ᴜ");
const interrompo = kf2Rultemon();
for (let i = 0; i < 128; i++) interrompo.bildigu(i * (HEKE / 60));
interrompo.bildigu(65536);
cel2nu(interrompo.p6zukani === 1, "j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭw ſᶘɜ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
console.log("( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) ſɭw ſᶘɜ ʌ ſɭɹ ſᶘɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſןɔ");
export {};
