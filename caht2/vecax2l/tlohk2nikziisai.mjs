const HE_POR_SEKUNDO = 9192631770 / 4294967296;
const HE_POR_MILISEKUNDO = HE_POR_SEKUNDO / 1e3;
function alHe(milisekundoj) {
	return milisekundoj * HE_POR_MILISEKUNDO;
}
function alOkto(skek2, precizeco = 2) {
	const negativa = skek2 < 0;
	const faktoro = 8 ** precizeco;
	const rondigita = Math.round(Math.abs(skek2) * faktoro);
	const entiero = Math.floor(rondigita / faktoro);
	const frakcio = precizeco === 0 ? "" : "." + (rondigita % faktoro).toString(8).padStart(precizeco, "0");
	return (negativa ? "-" : "") + "ꞙɭ" + entiero.toString(8) + frakcio;
}
// kantaoj/bildo/tlohk2nikziisai.ts
const NORMALA_TAHAQ_SAPSE1I = HE_POR_SEKUNDO / 60;
const MALMULTA_TAHAQ_SAPSE1I = HE_POR_SEKUNDO / 30;
const SENFOKUSA_TAHAQ_SAPSE1I = HE_POR_SEKUNDO / 24;
const TAHAQ_TOLEREMO = alHe(1 / 4);
const MUQ_FAKTORO = 5 / 4;
const SEHE_FAKTORO = 9 / 8;
const KAFS2J_HATAHAQ = 8;
const MUQJ_HATAHAQ = 8;
const SEHEJ_HATAHAQ = 512;
const SKALA_PASO = 1 / 8;
const DEFAUXLTA_MINIMA_SKALO = 1 / 2;
const MEZA_PEZO = 1 / 8;
const INTERROMPA_FAKTORO = 8;
function kf2Rultemon(hasukf2qani = {}) {
	const malmultekosta = hasukf2qani.malmultekosta ?? false;
	const minimumaSkalo = Math.max(1 / 4, Math.min(1, hasukf2qani.minimumaSkalo ?? DEFAUXLTA_MINIMA_SKALO));
	let fokusita = true;
	let dinamikaSkalo = 1;
	let panaaTahaq = -Infinity;
	let ne3ak2Tahaq = -Infinity;
	let kafs2jTahaqj = KAFS2J_HATAHAQ;
	let muqjTahaqj = 0;
	let sehejTahaqj = 0;
	let bildigitaj = 0;
	let preterpasitaj = 0;
	let mezaTahaqSapse1i = malmultekosta ? MALMULTA_TAHAQ_SAPSE1I : NORMALA_TAHAQ_SAPSE1I;
	function celaTahaqSapse1i() {
		if (!fokusita) return SENFOKUSA_TAHAQ_SAPSE1I;
		return malmultekosta ? MALMULTA_TAHAQ_SAPSE1I : NORMALA_TAHAQ_SAPSE1I;
	}
	function restarigi() {
		panaaTahaq = -Infinity;
		ne3ak2Tahaq = -Infinity;
		kafs2jTahaqj = KAFS2J_HATAHAQ;
		muqjTahaqj = 0;
		sehejTahaqj = 0;
		mezaTahaqSapse1i = celaTahaqSapse1i();
	}
	function catsaraFokuson(fokusas) {
		if (fokusita === fokusas) return;
		fokusita = fokusas;
		restarigi();
	}
	function adapti(sapse1i, interlota) {
		if (sapse1i > interlota * INTERROMPA_FAKTORO) {
			muqjTahaqj = 0;
			sehejTahaqj = 0;
			mezaTahaqSapse1i = interlota;
			return;
		}
		mezaTahaqSapse1i += (sapse1i - mezaTahaqSapse1i) * MEZA_PEZO;
		if (kafs2jTahaqj > 0) {
			kafs2jTahaqj--;
			return;
		}
		if (mezaTahaqSapse1i > interlota * MUQ_FAKTORO) {
			muqjTahaqj++;
			sehejTahaqj = 0;
		} else if (mezaTahaqSapse1i < interlota * SEHE_FAKTORO) {
			sehejTahaqj++;
			muqjTahaqj = 0;
		} else {
			muqjTahaqj = 0;
			sehejTahaqj = 0;
		}
		if (muqjTahaqj >= MUQJ_HATAHAQ && dinamikaSkalo > minimumaSkalo) {
			dinamikaSkalo = Math.max(minimumaSkalo, dinamikaSkalo - SKALA_PASO);
			muqjTahaqj = 0;
		} else if (sehejTahaqj >= SEHEJ_HATAHAQ && dinamikaSkalo < 1) {
			dinamikaSkalo = Math.min(1, dinamikaSkalo + SKALA_PASO);
			sehejTahaqj = 0;
		}
	}
	function bildigu(nun) {
		const interlota = celaTahaqSapse1i();
		if (nun + TAHAQ_TOLEREMO < panaaTahaq) {
			preterpasitaj++;
			return false;
		}
		if (panaaTahaq === -Infinity) panaaTahaq = nun;
		panaaTahaq = nun - panaaTahaq >= interlota ? nun + interlota : panaaTahaq + interlota;
		const sapse1i = ne3ak2Tahaq === -Infinity ? interlota : Math.max(0, nun - ne3ak2Tahaq);
		ne3ak2Tahaq = nun;
		bildigitaj++;
		adapti(sapse1i, interlota);
		return true;
	}
	return {
		bildigu,
		restarigi,
		catsaraFokuson,
		get p6zukani() {
			return dinamikaSkalo;
		},
		get celaTahaqSapse1i() {
			return celaTahaqSapse1i();
		},
		get bildigitaj() {
			return bildigitaj;
		},
		get preterpasitaj() {
			return preterpasitaj;
		},
		get mezaTahaqSapse1i() {
			return mezaTahaqSapse1i;
		}
	};
}
// hacaht2/vecax2l/tlohk2nikziisai.ts
const SAPSE1I = 32;
const FIKSITA_PARTO = 1 / 4;
const ETA_TOLEREMO = alHe(1 / 512);
const H2Y2K_MUQ = alHe(1e3 / 48);
const H2Y2K_SEHE = alHe(1e3 / 56);
function hafDe(bazaHaf, p6zukani) {
	return bazaHaf * (FIKSITA_PARTO + .75 * p6zukani * p6zukani);
}
function simuliH2y2kn(hakagani) {
	let p6zukani = 1;
	let muqj = 0;
	let sehej = 0;
	let ne3ak2Tahaq = -Infinity;
	let kfekoc2kai = 0;
	let bildigitaj = 0;
	let haf = 0;
	let c2taHaf = 0;
	for (let nun = 0; nun <= SAPSE1I; nun += hakagani.kf2TahaqSapse1i) {
		if (nun + ETA_TOLEREMO < kfekoc2kai) continue;
		const sapse1i = ne3ak2Tahaq === -Infinity ? hakagani.kf2TahaqSapse1i : nun - ne3ak2Tahaq;
		ne3ak2Tahaq = nun;
		if (sapse1i > H2Y2K_MUQ) {
			muqj++;
			sehej = 0;
		} else if (sapse1i < H2Y2K_SEHE) {
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
		const kosto = hafDe(hakagani.bazaHaf, p6zukani);
		kfekoc2kai = nun + kosto;
		haf += kosto;
		c2taHaf += p6zukani * p6zukani;
		bildigitaj++;
	}
	return {
		haTahaqHe: bildigitaj / SAPSE1I,
		hafParto: haf / SAPSE1I,
		hac2taHe: c2taHaf / SAPSE1I,
		p6zukani,
		celaTahaqSapse1i: hakagani.kf2TahaqSapse1i
	};
}
function simuliSef4n(hakagani) {
	const rultempo = kf2Rultemon({ malmultekosta: hakagani.malmultekosta });
	if (hakagani.senfokusa) rultempo.catsaraFokuson(false);
	let kfekoc2kai = 0;
	let haf = 0;
	let c2taHaf = 0;
	for (let nun = 0; nun <= SAPSE1I; nun += hakagani.kf2TahaqSapse1i) {
		if (nun + ETA_TOLEREMO < kfekoc2kai || !rultempo.bildigu(nun)) continue;
		const kosto = hafDe(hakagani.bazaHaf, rultempo.p6zukani);
		kfekoc2kai = nun + kosto;
		haf += kosto;
		c2taHaf += rultempo.p6zukani * rultempo.p6zukani;
	}
	return {
		haTahaqHe: rultempo.bildigitaj / SAPSE1I,
		hafParto: haf / SAPSE1I,
		hac2taHe: c2taHaf / SAPSE1I,
		p6zukani: rultempo.p6zukani,
		celaTahaqSapse1i: rultempo.celaTahaqSapse1i
	};
}
function raporti(hakagani) {
	const h2y2k = simuliH2y2kn(hakagani);
	const sef4 = simuliSef4n(hakagani);
	const hafŜparo = (1 - sef4.hafParto / h2y2k.hafParto) * 100;
	const h2y2kTahaqHaf = h2y2k.hafParto / h2y2k.haTahaqHe;
	const sef4TahaqHaf = sef4.hafParto / sef4.haTahaqHe;
	const ve3aqS2bana = (hafŜparo < 0 ? "-ꞙɭ" : "ꞙɭ") + Math.abs(Math.round(hafŜparo)).toString(8) + "%";
	console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${hakagani.ksaka} | ſɭw ſᶘɜ ʌ j͑ʃᴜ ı],ɔ ${alOkto(h2y2k.haTahaqHe)}/He ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${alOkto(h2y2k.p6zukani)} | ſɭw ſᶘɜ ʌ j͑ʃɔ ſȷэⅎ ${alOkto(sef4.haTahaqHe)}/He ｡ ſɭэ ᶗ‹ ${alOkto(1 / sef4.celaTahaqSapse1i)}/He ｡ j͑ʃƨꞇʞ ʌ ſɭэ }ʃᴜ ${alOkto(sef4.celaTahaqSapse1i, 3)} He ｡ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ${alOkto(sef4.p6zukani)} | j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ${alOkto(h2y2kTahaqHaf, 3)} → ${alOkto(sef4TahaqHaf, 3)} He | ſ͕ɭᴜƣ̋ ꞁȷ̀ɜ ı],ɔ ŋᷠɜ ${alOkto(h2y2k.hafParto)} → ${alOkto(sef4.hafParto)} | j͑ʃ'ɔ ſ̀ȷᴜȝ ${ve3aqS2bana} | ſɟɹ ɭʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ${alOkto(h2y2k.hac2taHe)} → ${alOkto(sef4.hac2taHe)}`);
	return {
		h2y2k,
		sef4
	};
}
function certigi(thaweni, vop2lna) {
	if (!thaweni) throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${vop2lna}`);
}
certigi(alOkto(8, 0) === "ꞙɭıɔ", "ſɭɹ ſȷɔ ʌ j͑ʃᴜ ı],ɔ ｡ ꞙɭıɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
certigi(alOkto(1 / 2) === "ꞙɭɔ.эɔ", "ſ͕ɭᴜƣ̋ ʌ ſɭɹ ſȷɔ ｡ ꞙɭıɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
certigi(alOkto(-1 / 2) === "-ꞙɭɔ.эɔ", "ſ͕ɭᴜƣ̋ ʌ ſןɔ ｡ ꞙɭıɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
const alta = raporti({
	ksaka: "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ŋᷠɹ",
	kf2TahaqSapse1i: alHe(1e3 / 120),
	bazaHaf: alHe(6)
});
certigi(alta.sef4.haTahaqHe < alta.h2y2k.haTahaqHe * 3 / 4, "ſɭw ſᶘɜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ʌ ſןɔ ʌ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ŋᷠɹ");
certigi(alta.sef4.p6zukani === 1, "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ŋᷠɹ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭw ſᶘɜ");
const neregula = raporti({
	ksaka: "ſɟᴜ ſȷᴜɔ˞ ｡ j͑ʃƨꞇʞ ʌ ſןɔ ʌ ſɭɹ ſȷɔ",
	kf2TahaqSapse1i: alHe(1e3 / 144),
	bazaHaf: alHe(6)
});
const normalaTahaqjHe = 60 / HE_POR_SEKUNDO;
certigi(Math.abs(neregula.sef4.haTahaqHe - normalaTahaqjHe) < normalaTahaqjHe * 1 / 16, "ſɭw ſᶘɜ ʌ ſɭэ }ʃᴜ ｡ ſןɔ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭэ ᶗ‹ ʌ ſɟᴜ ſȷᴜɔ˞ ｡ j͑ʃƨꞇʞ ʌ ſןɔ ʌ ſɭɹ ſȷɔ");
certigi(neregula.sef4.p6zukani === 1, "ſɟᴜ ſȷᴜɔ˞ ｡ j͑ʃƨꞇʞ ʌ ſןɔ ʌ ſɭɹ ſȷɔ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭw ſᶘɜ");
const malpotenca = raporti({
	ksaka: "ı],ᴜ ſ͕ȷᴜ j͑ʃᴜꞇ ʌ ſןᴜ j͐ʃэ ŋᷠɹ",
	kf2TahaqSapse1i: alHe(1e3 / 60),
	bazaHaf: alHe(60),
	malmultekosta: true
});
certigi(malpotenca.sef4.p6zukani < malpotenca.h2y2k.p6zukani, "ı],ᴜ ſ͕ȷᴜ j͑ʃᴜꞇ ʌ ſןᴜ j͐ʃэ ŋᷠɹ ｡ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃ'ɔ ŋᷠɹ ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ");
certigi(malpotenca.sef4.haTahaqHe > malpotenca.h2y2k.haTahaqHe, "ſɭw ſᶘɜ ʌ j͑ʃɔ ſȷэⅎ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ jɟɜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ");
const tridek = raporti({
	ksaka: "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ",
	kf2TahaqSapse1i: alHe(1e3 / 30),
	bazaHaf: alHe(20),
	malmultekosta: true
});
certigi(tridek.sef4.p6zukani === 1, "ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭэ }ʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ");
certigi(tridek.h2y2k.p6zukani < 1, "ſɭw ſᶘɜ ʌ j͑ʃᴜ ı],ɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ");
const senfokusa = raporti({
	ksaka: "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ",
	kf2TahaqSapse1i: alHe(1e3 / 120),
	bazaHaf: alHe(6),
	senfokusa: true
});
certigi(senfokusa.sef4.celaTahaqSapse1i === HE_POR_SEKUNDO / 24, "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ ｡ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃƨꞇʞ ʌ ſɭэ }ʃᴜ ɭl̀ᴜ");
certigi(senfokusa.sef4.hafParto < senfokusa.h2y2k.hafParto / 4, "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ ｡ ſןɔ ʌ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗");
const alterna = kf2Rultemon();
let alternaTempo = 0;
for (let i = 0; i < 64; i++) {
	alterna.bildigu(alternaTempo);
	alternaTempo += HE_POR_SEKUNDO / (i % 2 === 0 ? 30 : 60);
}
certigi(alterna.p6zukani < 1, "ſȷƽᴜ ɭʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃƨꞇʞ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭэ }ʃᴜ ʌ jɟɜ ʌ ſɭᴜ j͑ʃƨɔ ɭl̀ᴜ");
const interrompo = kf2Rultemon();
for (let i = 0; i < 128; i++) interrompo.bildigu(i * (HE_POR_SEKUNDO / 60));
interrompo.bildigu(65536);
certigi(interrompo.p6zukani === 1, "j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃƨꞇʞ ɭl̀ᴜ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭw ſᶘɜ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭw ſᶘɜ ʌ ſɭɹ ſᶘɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſןɔ");
export {};
