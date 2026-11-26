import { strict } from "node:assert";
import { test } from "node:test";
// eskekoj/tom6nu/kutso.ts
function kf2Ku1o(ksaka) {
	let hax2ni = null;
	let ve3aqai = false;
	function vefalCax2l() {
		if (hax2ni) return hax2ni;
		const cax2l = Object.create(null);
		hax2ni = cax2l;
		try {
			const ne1anesai = localStorage.getItem(ksaka);
			if (!ne1anesai) return cax2l;
			const skek = JSON.parse(ne1anesai);
			if (!skek || typeof skek !== "object" || Array.isArray(skek)) return cax2l;
			for (const [ku1oKsaka, ku1oSkek] of Object.entries(skek)) if (typeof ku1oSkek === "boolean" || typeof ku1oSkek === "string" || typeof ku1oSkek === "number" && Number.isFinite(ku1oSkek)) cax2l[ku1oKsaka] = ku1oSkek;
		} catch {}
		return cax2l;
	}
	function vefalKu1o(ku1oKsaka, taj2) {
		const skek = vefalCax2l()[ku1oKsaka];
		return skek === void 0 || typeof skek !== typeof taj2 ? taj2 : skek;
	}
	function ve3aqKu1o(ku1oKsaka, skek) {
		const cax2l = vefalCax2l();
		if (!Object.is(cax2l[ku1oKsaka], skek)) {
			cax2l[ku1oKsaka] = skek;
			ve3aqai = true;
		}
		if (!ve3aqai) return;
		try {
			localStorage.setItem(ksaka, JSON.stringify(cax2l));
			ve3aqai = false;
		} catch {}
	}
	return {
		vefalKu1o,
		ve3aqKu1o
	};
}
const { vefalKu1o, ve3aqKu1o } = kf2Ku1o("aranis-haku1o");
// eskekoj/tom6nu/hazardo.ts
function kf2SakxoRuva(ruva, santaKozuni, p6zukKozuni, pliigo) {
	let skek = ruva >>> 0;
	return () => {
		skek = skek + pliigo | 0;
		let kox2qai = Math.imul(skek ^ skek >>> santaKozuni, 1 | skek);
		kox2qai = kox2qai + Math.imul(kox2qai ^ kox2qai >>> 7, p6zukKozuni | kox2qai) ^ kox2qai;
		return ((kox2qai ^ kox2qai >>> 12) >>> 0) / 4294967296;
	};
}
function kf2Sakxo(ruva, pliigo = 1831565813) {
	return kf2SakxoRuva(ruva, 16, 64, pliigo);
}
function kf2SakxoKlasika(ruva, pliigo = 1831565813) {
	return kf2SakxoRuva(ruva, 15, 61, pliigo);
}
// hacaht2/vecax2l/p6kpu-kama.ts
test("ku1o / persistence, caching, namespaces and unavailable storage", () => {
	const xaqadi = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
	const hax2ni = /* @__PURE__ */ new Map();
	let legadoj = 0;
	let skriboj = 0;
	let malsukcesi = false;
	Object.defineProperty(globalThis, "localStorage", {
		configurable: true,
		value: {
			getItem(ksaka) {
				legadoj++;
				return hax2ni.get(ksaka) ?? null;
			},
			setItem(ksaka, skek) {
				skriboj++;
				if (malsukcesi) throw new Error("quota");
				hax2ni.set(ksaka, skek);
			}
		}
	});
	try {
		hax2ni.set("aranis-haku1o", JSON.stringify({
			sonoro: false,
			trako: 2
		}));
		strict.equal(vefalKu1o("sonoro", true), false);
		strict.equal(vefalKu1o("trako", -1), 2);
		strict.equal(legadoj, 1);
		ve3aqKu1o("sonoro", false);
		strict.equal(skriboj, 0);
		ve3aqKu1o("sonoro", true);
		strict.equal(skriboj, 1);
		strict.deepEqual(JSON.parse(hax2ni.get("aranis-haku1o")), {
			sonoro: true,
			trako: 2
		});
		const xaqadi = kf2Ku1o("xaqadi");
		const dua = kf2Ku1o("dua");
		xaqadi.ve3aqKu1o("trako", 3);
		dua.ve3aqKu1o("trako", 4);
		strict.equal(xaqadi.vefalKu1o("trako", -1), 3);
		strict.equal(dua.vefalKu1o("trako", -1), 4);
		strict.equal(kf2Ku1o("xaqadi").vefalKu1o("trako", -1), 3);
		strict.equal(xaqadi.vefalKu1o("trako", "apriora"), "apriora");
		hax2ni.set("filtrita", "{\"xobe\":false,\"nombro\":2,\"s2bana\":\"\",\"nula\":null,\"aro\":[],\"objekto\":{},\"senfina\":1e999,\"__proto__\":\"propra\"}");
		const filtrita = kf2Ku1o("filtrita");
		strict.equal(filtrita.vefalKu1o("xobe", true), false);
		strict.equal(filtrita.vefalKu1o("nombro", 0), 2);
		strict.equal(filtrita.vefalKu1o("s2bana", "apriora"), "");
		for (const ksaka of [
			"nula",
			"aro",
			"objekto",
			"senfina",
			"constructor",
			"toString"
		]) strict.equal(filtrita.vefalKu1o(ksaka, "apriora"), "apriora");
		strict.equal(filtrita.vefalKu1o("__proto__", "apriora"), "propra");
		filtrita.ve3aqKu1o("__proto__", "sef4");
		strict.equal(JSON.parse(hax2ni.get("filtrita")).__proto__, "sef4");
		for (const kruda of [
			"{",
			"null",
			"[]",
			"[1,2]",
			"true",
			"42",
			"\"s2bana\""
		]) {
			hax2ni.set("rompita", kruda);
			const rompita = kf2Ku1o("rompita");
			strict.equal(rompita.vefalKu1o("0", "apriora"), "apriora");
			rompita.ve3aqKu1o("xobe", true);
			strict.deepEqual(JSON.parse(hax2ni.get("rompita")), { xobe: true });
		}
		malsukcesi = true;
		const provizora = kf2Ku1o("provizora");
		provizora.ve3aqKu1o("sonoro", false);
		strict.equal(provizora.vefalKu1o("sonoro", true), false);
		strict.equal(hax2ni.has("provizora"), false);
		malsukcesi = false;
		provizora.ve3aqKu1o("sonoro", false);
		strict.deepEqual(JSON.parse(hax2ni.get("provizora")), { sonoro: false });
		const antauaj = skriboj;
		provizora.ve3aqKu1o("sonoro", false);
		strict.equal(skriboj, antauaj);
		Object.defineProperty(globalThis, "localStorage", {
			configurable: true,
			get() {
				throw new Error("SecurityError");
			}
		});
		const senStokado = kf2Ku1o("sen-stokado");
		strict.equal(senStokado.vefalKu1o("sonoro", true), true);
		senStokado.ve3aqKu1o("sonoro", false);
		strict.equal(senStokado.vefalKu1o("sonoro", true), false);
	} finally {
		if (xaqadi) Object.defineProperty(globalThis, "localStorage", xaqadi);
		else Reflect.deleteProperty(globalThis, "localStorage");
	}
});
test("sakxo / preserved sequences, custom increments and independent generators", () => {
	const hapx01o = [
		[
			kf2Sakxo,
			0,
			void 0,
			[
				2346270044,
				3287765106,
				632847469,
				3876904306
			]
		],
		[
			kf2Sakxo,
			1,
			void 0,
			[
				3468013031,
				2052987402,
				2765660418,
				806325440
			]
		],
		[
			kf2Sakxo,
			-1,
			void 0,
			[
				222327173,
				610865140,
				561332082,
				919339756
			]
		],
		[
			kf2Sakxo,
			42,
			1,
			[
				3536222,
				4031636,
				4097598,
				4642825
			]
		],
		[
			kf2SakxoKlasika,
			0,
			void 0,
			[
				1144121326,
				1416504,
				959130913,
				628048481
			]
		],
		[
			kf2SakxoKlasika,
			1,
			void 0,
			[
				2693750960,
				11747376,
				2265753781,
				4213864758
			]
		],
		[
			kf2SakxoKlasika,
			-1,
			void 0,
			[
				3849728436,
				813854647,
				3074206770,
				4053874014
			]
		],
		[
			kf2SakxoKlasika,
			42,
			1,
			[
				3425321,
				3907558,
				4138028,
				4672790
			]
		]
	];
	for (const [kf2, tk2ni, pliigo, atenditaj] of hapx01o) {
		const sakxo = kf2(tk2ni, pliigo);
		strict.deepEqual(atenditaj.map(() => sakxo() * 4294967296), atenditaj);
		const xaqadi = kf2(tk2ni, pliigo);
		const dua = kf2(tk2ni, pliigo);
		const volvita = kf2(tk2ni + 4294967296, pliigo);
		for (let i = 0; i < 512; i++) {
			const skek = xaqadi();
			strict.equal(skek, dua());
			strict.equal(skek, volvita());
			strict.ok(skek >= 0 && skek < 1);
		}
	}
});
export {};
