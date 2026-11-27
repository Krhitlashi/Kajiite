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
// caht2/vecax2l/k61e.ts
const T2BAK2P2 = "( ɭʃɹ ʃᴜ ſɭɹ ſןɹ )";
const B6TENANI = "( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ )";
const KEF3OHK2NI = "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )";
function k2fTitolo(titolo) {
	return `<( ${titolo} )>`;
}
const STIH2 = "j͑ʃƨꞇ ֭ſɭɹ";
const FKATASTIH2 = "ſȷƽᴜ ɭʃᴜ j͑ʃƨꞇ ֭ſɭɹ";
const KMAM2M2STIH2 = "ſɭc̭ᴜ ŋᷠɹ ŋᷠɹ j͑ʃƨꞇ ֭ſɭɹ";
const KALANI = "ſɭᴜ j͐ʃᴜ }ʃꞇ";
const SEHENI = "j͑ʃɔ ֭ſɭɔ }ʃꞇ";
const NLAKANI = "ȏoͩſ̀ȷᴜƽ ꞁȷ̀ᴜ }ʃꞇ";
const KANAQ = "ſןw ſɭᴜ }ʃᴜȝ";
const VEQ6K2 = "}ʃɔ ȏoͩſ̀ȷᴜ }ʃꞇ";
const VOP2LNA = "ſɭɹ ſȷɔ";
function knak2(n2k, kefn2k = 2) {
	return knak2fecajasai(n2k, kefn2k);
}
function heKef(n2k) {
	return `${knak2fecajasai(tbo(n2k), 6)} He`;
}
function k2fStih2(ksaka, tif, kefn2k = 20) {
	tif.sort((a, b) => a - b);
	console.log(`${T2BAK2P2} ${ksaka.padEnd(kefn2k)} ｡ ${FKATASTIH2} ｡ ${heKef(tif[tif.length >> 1])} ｡ ${KMAM2M2STIH2} ｡ ${heKef(tif[0])}`);
}
function k2fStih2Nlakani(ksaka, tif, nlakani, kefn2k = 16) {
	tif.sort((a, b) => a - b);
	console.log(`${T2BAK2P2} ${ksaka.padEnd(kefn2k)} ｡ ${FKATASTIH2} ｡ ${heKef(tif[tif.length >> 1])} ｡ ${KMAM2M2STIH2} ｡ ${heKef(tif[0])} ｡ ${NLAKANI} ｡ ${knak2(nlakani)}`);
}
function k2fKanaq(ksaka, tifSef4, tifH2y2k, nlakaniSef4, nlakaniH2y2k, kefn2k = 0) {
	tifSef4.sort((a, b) => a - b);
	tifH2y2k.sort((a, b) => a - b);
	const fkataSef4 = tifSef4[tifSef4.length >> 1], fkataH2y2k = tifH2y2k[tifH2y2k.length >> 1];
	const kmam2m2Sef4 = Math.min(...tifSef4), kmam2m2H2y2k = Math.min(...tifH2y2k);
	const kanaq = nlakaniSef4 === nlakaniH2y2k ? KANAQ : VEQ6K2;
	const kapo = kefn2k > 0 ? ksaka.padEnd(kefn2k) : ksaka;
	console.log(`${T2BAK2P2} ${kapo} ｡ ${FKATASTIH2} ｡ ${heKef(fkataH2y2k)} ｡ ${KMAM2M2STIH2} ｡ ${heKef(fkataSef4)} ｡ ${KALANI} ｡ ${knak2(fkataH2y2k / fkataSef4)} ｡ ${SEHENI} ｡ ${knak2(kmam2m2H2y2k / kmam2m2Sef4)} ｡ ${kanaq}`);
}
function k2fKmaNlakani(ksaka, kmaXobe, nlakani, kefn2k = 24) {
	console.log(`${T2BAK2P2} ${ksaka.padEnd(kefn2k)} ｡ ${KMAM2M2STIH2} ｡ ${heKef(kmaXobe)} ｡ ${NLAKANI} ｡ ${knak2(nlakani)}`);
}
function k2fSeheni(ksaka, kmaXobe, q6n2k, kefn2k = 24) {
	console.log(`${T2BAK2P2} ${ksaka.padEnd(kefn2k)} ｡ ${KMAM2M2STIH2} ｡ ${heKef(kmaXobe)} ｡ ${SEHENI} ｡ ${knak2(q6n2k / kmaXobe * 1e6, 6)} ｡ He`);
}
export { B6TENANI, FKATASTIH2, KALANI, KANAQ, KEF3OHK2NI, KMAM2M2STIH2, NLAKANI, SEHENI, STIH2, T2BAK2P2, VEQ6K2, VOP2LNA, heKef, k2fKanaq, k2fKmaNlakani, k2fSeheni, k2fStih2, k2fStih2Nlakani, k2fTitolo, knak2 };
