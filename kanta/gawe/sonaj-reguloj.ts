// ≺⧼ j͑ʃɹ ſɭᴜc̗ ɭʃᴜ ʌ ʃɜ j͐ʃɔ 🗣️ ⧽≻
// ⟪ ſȷwɔ˞ , ſȷwɔ˞ , ⟅ ſȷwɔ˞ , 🏴 ⟫

// ⟪ ſɭэ ɭʃᴜ , ꞙɭɩ , ſɭэ ſɭᴜ , 🗣️ ⟫
const SAXEAĴ: [ string, string, string ][] = [
  [ "ᶅſ", "w", "ⱱ̥" ], [ "ſן", "p", "p" ], [ "ſȷ", "f", "ɸ" ],
  [ "ʃ", "b", "ɸˠ" ], [ "ŋᷠ", "m", "m̥" ], [ "ɽ͑ʃ'", "r", "ɾ̪̥" ],
  [ "j͑ʃ'", "v", "θ" ], [ "ɭʃ", "t", "t" ], [ "ɭ(", "d", "s̪" ],
  [ "ſᶘ", "1", "ts" ], [ "j͑ʃ", "s", "s" ], [ "}ʃ", "n", "n̥" ],
  [ "ſ̀ȷ", "3", "tɬ" ], [ "j͐ʃ", "l", "ɬ" ], [ "ſɭˬ", "5", "kʂ" ],
  [ "ſɭ,", "z", "ʂ" ], [ "ɭl̀", "j", "ɟ̥̆" ], [ "ſɟ", "c", "c" ],
  [ "1],", "x", "ç" ], [ "ſ͕ȷ", "y", "ɲ̥" ], [ "ſ͔ɭ", "g", "xʲ" ],
  [ "ſɭ", "k", "k" ], [ "֭ſɭ", "h", "x" ], [ "ſ͕ɭ", "q", "ŋ̥" ],
  [ "ȏſן", "p'", "ʘ" ], [ "ȏɭʃ'", "v'", "ǀ" ], [ "ȏſ̀ȷ", "l'", "ǁ" ],
  [ "ȏſɟ", "c'", "ǂ" ], [ "ȏɭʃ", "t'", "ǃ" ], [ "ȏŋᷠ", "m'", "ʘ̃" ],
  [ "ȏ}ʃ'", "nv'", "ǀ̃" ], [ "ȏoͩſ̀ȷ", "nl'", "ǁ̃" ], [ "ȏſ͕ȷ", "y'", "ǂ̃" ],
  [ "ȏ}ʃ", "n'", "ǃ̃" ], [ "ꞁȷ̀", "", "" ], [ "⺓", "piise", "pɪ̈sɛ" ],
];

// ⟪ ſɭэ ſɭw , ꞙɭэꞟ , ſɭэ ſɭᴜ , 🗣️ ⟫
const INTERNAĴ: [ string, string, string ][] = [
  [ "п́", "w", "ⱱ̥" ], [ "ɘ", "p", "p" ], [ "ʞ", "f", "ɸ" ],
  [ "ɀ", "b", "ɸˠ" ], [ "c̭", "m", "m̥" ], [ "ƣ̋", "r", "ɾ̪̥" ],
  [ "ⰱ", "v", "θ" ], [ "7", "t", "t" ], [ "ԏ͕", "d", "s̪" ],
  [ "ꝛ̗", "1", "ts" ], [ "0˞", "s", "s" ], [ "c̗", "n", "n̥" ],
  [ "ŋ", "3", "tɬ" ], [ "ͷ̗", "l", "ɬ" ], [ "ɯ", "5", "kʂ" ],
  [ "ƴ", "z", "ʂ" ], [ "ᴎ", "j", "ɟ̥̆" ], [ "ᴜ̭", "c", "c" ],
  [ "ᶗ‹", "x", "ç" ], [ "ⱷ̮̀", "y", "ɲ̥" ], [ "ɴ", "g", "xʲ" ],
  [ "ƽ", "k", "k" ], [ "ᴜ̩", "h", "x" ], [ "ȝ", "q", "ŋ̥" ],
  [ "ɘȏ", "p'", "ʘ" ], [ "ⱷ᷐ȏ", "v'", "ǀ" ], [ "ŋȏ", "l'", "ǁ" ],
  [ "ᴜ̭ȏ", "c'", "ǂ" ], [ "7ȏ", "t'", "ǃ" ], [ "c̭ȏ", "m'", "ʘ̃" ],
  [ "c̏ȏ", "nv'", "ǀ̃" ], [ "ŋoͩȏ", "nl'", "ǁ̃" ], [ "ⱷ̮̀ȏ", "y'", "ǂ̃" ],
  [ "c̗ȏ", "n'", "ǃ̃" ],
// ⟨ ſɭэ ſɭw , 🎶 ⟩
  [ "ꞇ", "i", "i" ], [ "0", "e", "ɛ" ], [ "ᴜ", "a", "a" ],
  [ "w", "u", "ə" ], [ "ɹ", "2", "ɪ̈" ], [ "ɜ", "o", "ɤ" ],
  [ "4", "6", "ɑ" ], [ "0ⅎ", "0", "ɛ̃" ], [ "ɜⅎ", "7", "ɤ̃" ],
  [ "4ⅎ", "4", "ɑ̃" ], [ "ᴜꞇ", "ai", "ə" ],
];

// ⟨ ſȷwɔ˞ , 🔢 ⟩
const NUMERA: Record<string, string> = { ts: "1", ii: "2", tl: "3", au: "4", kz: "5", aa: "6", ou: "7", eu: "0" };
const NUMERAREV: Record<string, string> = {};
for ( const [ v, k ] of Object.entries(NUMERA) ) NUMERAREV[k] = v;

const ĈIUJIPA: string[] = Array.from(
  new Set([ ...SAXEAĴ, ...INTERNAĴ ].map(( [ , , ipa ] ) => ipa).filter(Boolean))
).sort(( a, b ) => b.length - a.length || ( a < b ? -1 : 1 ));

const ĈIUJGK: string[] = Array.from(
  new Set([ ...SAXEAĴ, ...INTERNAĴ ].map(( [ gk ] ) => gk).filter(Boolean))
).sort(( a, b ) => b.length - a.length || ( a < b ? -1 : 1 ));

function avideKongruigi(s2banani: string, tokenaCatsara: string[]): string[] {
  const esxaq: string[] = [];
  let i = 0;
  while ( i < s2banani.length ) {
    let kawake = false;
    for ( const t of tokenaCatsara ) {
      if ( s2banani.startsWith(t, i) ) { esxaq.push(t); i += t.length; kawake = true; break; }
    }
    if ( !kawake ) { esxaq.push(s2banani[i]); i++; }
  }
  return esxaq;
}

// ⟪ ſɭэ ſɭᴜ , ᶗ‹ , 🌍 ⟫
const MAPOEO: Record<string, string> = {
  "ⱱ̥": "v", "p": "p", "ɸ": "f", "ɸˠ": "fĥ",
  "m̥": "m", "ɾ̪̥": "r", "θ": "z", "t": "t", "s̪": "sh",
  "ts": "c", "s": "s", "n̥": "n", "tɬ": "tl", "ɬ": "l",
  "kʂ": "kr", "ʂ": "ĝ", "ɟ̥̆": "j", "c": "ĉ", "ç": "ŝ",
  "ɲ̥": "nj", "xʲ": "ĥj", "k": "k", "x": "ĥ", "ŋ̥": "nk",
  "ʘ": "p", "ǀ": "t", "ǁ": "kl", "ǂ": "ĉ", "ǃ": "t",
  "ʘ̃": "mp", "ǀ̃": "nt", "ǁ̃": "nkl", "ǂ̃": "nĉ", "ǃ̃": "nt",
  "i": "i", "ɛ": "e", "a": "a", "ə": "eŭ", "ɪ̈": "u",
  "ɤ": "o", "ɑ": "aŭ", "ɛ̃": "en", "ɤ̃": "on", "ɑ̃": "an",
  "pɪ̈sɛ": "puse",
};

const MAPOEN: Record<string, string> = {
  "ⱱ̥": "w", "p": "p", "ɸ": "h", "ɸˠ": "f",
  "m̥": "m", "ɾ̪̥": "r", "θ": "th", "t": "t", "s̪": "s",
  "ts": "ts", "s": "s", "n̥": "n", "tɬ": "tl", "ɬ": "lh",
  "kʂ": "krh", "ʂ": "rh", "ɟ̥̆": "y", "c": "ch", "ç": "sh",
  "ɲ̥": "ny", "xʲ": "hy", "k": "k", "x": "kh", "ŋ̥": "ng",
  "ʘ": "p", "ǀ": "tsk", "ǁ": "kl", "ǂ": "k", "ǃ": "t",
  "ʘ̃": "mp", "ǀ̃": "ntsk", "ǁ̃": "nkl", "ǂ̃": "nk", "ǃ̃": "nt",
  "i": "i", "ɛ": "e", "a": "a", "ə": "uh", "ɪ̈": "ih",
  "ɤ": "o", "ɑ": "aw", "ɛ̃": "en", "ɤ̃": "on", "ɑ̃": "an",
  "pɪ̈sɛ": "pisseh",
};

const MAPOJA: Record<string, string> = {
  "ⱱ̥": "ワ", "p": "プ", "ɸ": "フ", "ɸˠ": "フ",
  "m̥": "ム", "ɾ̪̥": "ル", "θ": "ス", "t": "ト", "s̪": "ス",
  "ts": "ツ", "s": "ス", "n̥": "ヌン", "tɬ": "トル", "ɬ": "ラ",
  "kʂ": "クル", "ʂ": "シ", "ɟ̥̆": "ユ", "c": "チ", "ç": "シ",
  "ɲ̥": "ニュ", "xʲ": "ヒ", "k": "ク", "x": "ホ", "ŋ̥": "ン",
  "ʘ": "プ", "ǀ": "ツ", "ǁ": "クル", "ǂ": "ク", "ǃ": "ト",
  "ʘ̃": "ンプ", "ǀ̃": "ンツ", "ǁ̃": "ンクル", "ǂ̃": "ンク", "ǃ̃": "ント",
  "i": "イ", "ɛ": "エ", "a": "ア", "ə": "ア", "ɪ̈": "ウ",
  "ɤ": "オ", "ɑ": "アー", "ɛ̃": "エン", "ɤ̃": "オン", "ɑ̃": "アン",
  "pɪ̈sɛ": "プセ",
};

const MAPOKM: Record<string, string> = {
  "ⱱ̥": "វ", "p": "ព", "ɸ": "ផ", "ɸˠ": "ភ",
  "m̥": "ម", "ɾ̪̥": "រ", "θ": "ថ", "t": "ត", "s̪": "ស្ស",
  "ts": "ត្ស", "s": "ស", "n̥": "ន", "tɬ": "ត្ល", "ɬ": "ល",
  "kʂ": "ក្រ", "ʂ": "ហ្រ", "ɟ̥̆": "យ", "c": "ច", "ç": "ឆ",
  "ɲ̥": "ញ", "xʲ": "ខ", "k": "ក", "x": "ហ", "ŋ̥": "ង",
  "ʘ": "ប", "ǀ": "ទ្ស", "ǁ": "គ្ល", "ǂ": "ជ", "ǃ": "ទ",
  "ʘ̃": "ម្ប", "ǀ̃": "ញ្ជ", "ǁ̃": "ង្ល", "ǂ̃": "ង្ជ", "ǃ̃": "ន្ទ",
  "i": "ី", "ɛ": "េ", "a": "ា", "ə": "ឺ", "ɪ̈": "ិ",
  "ɤ": "ុ", "ɑ": "៏", "ɛ̃": "េំ", "ɤ̃": "ុំ", "ɑ̃": "ំ",
  "pɪ̈sɛ": "ពឺសេ",
};

const LINGVAJMAPOJ: Record<string, Record<string, string>> = { eo: MAPOEO, en: MAPOEN, ja: MAPOJA, km: MAPOKM };

// ⟨ ſɭэ ſɭᴜ , ⛩️ ⟩
const JAGOJŪON: Record<string, Record<string, string>> = {
  k: { a: "カ", i: "キ", ɛ: "ケ", ɤ: "コ" },
  s: { a: "サ", i: "シ", ɛ: "セ", ɤ: "ソ" },
  t: { a: "タ", i: "チ", ɛ: "テ", ɤ: "ト" },
  n: { a: "ナ", i: "ニ", ɛ: "ネ", ɤ: "ノ" },
  h: { a: "ハ", i: "ヒ", ɛ: "ヘ", ɤ: "ホ" },
  m: { a: "マ", i: "ミ", ɛ: "メ", ɤ: "モ" },
  y: { a: "ヤ", i: "イ", ɛ: "イェ", ɤ: "ヨ" },
  r: { a: "ラ", i: "リ", ɛ: "レ", ɤ: "ロ" },
  w: { a: "ワ", i: "ウィ", ɛ: "ウェ", ɤ: "ウオ" },
  p: { a: "パ", i: "ピ", ɛ: "ペ", ɤ: "ポ" },
};

const JAKONSONANTAJRULEROJ: Record<string, [ string, string ]> = {
  k: [ "gojūon", "k" ], c: [ "yōon", "チ" ], t: [ "gojūon", "t" ],
  ɸ: [ "foreign", "フ" ], x: [ "gojūon", "h" ], ç: [ "yōon", "シ" ],
  m: [ "gojūon", "m" ], m̥: [ "gojūon", "m" ], s: [ "gojūon", "s" ],
  n: [ "gojūon", "n" ], n̥: [ "gojūon", "n" ], ɬ: [ "gojūon", "r" ],
  ɟ̥̆: [ "gojūon", "y" ], ⱱ̥: [ "gojūon", "w" ], xʲ: [ "yōon", "ヒ" ],
  p: [ "gojūon", "p" ], θ: [ "gojūon", "s" ], kʂ: [ "kʂ", "ク" ],
  ts: [ "foreign", "ツ" ], ɾ̪̥: [ "gojūon", "r" ], ɲ̥: [ "yōon", "ニ" ],
  tɬ: [ "tɬ", "ト" ],
};

function katakanaX2pa(roll: [ string, string ]): Record<string, string> {
  const [ pudal, kozuni ] = roll;
  let x2pa: Record<string, string>;
  if ( pudal === "gojūon" ) x2pa = { ...JAGOJŪON[kozuni] };
  else if ( pudal === "yōon" ) x2pa = { a: kozuni + "ャ", i: kozuni, ɛ: kozuni + "ェ", ɤ: kozuni + "ョ" };
  else if ( pudal === "foreign" ) x2pa = { a: kozuni + "ァ", i: kozuni + "ィ", ɛ: kozuni + "ェ", ɤ: kozuni + "ォ" };
  else if ( pudal === "kʂ" ) x2pa = { a: kozuni + "シャ", i: kozuni + "シ", ɛ: kozuni + "シェ", ɤ: kozuni + "ショ" };
  else if ( pudal === "tɬ" ) x2pa = { a: kozuni + "ラ", i: kozuni + "リ", ɛ: kozuni + "レ", ɤ: kozuni + "ロ" };
  else x2pa = {};
  x2pa["ɑ"] = x2pa["a"] + "ー";
  return x2pa;
}

const JAKVKOMBOJ: Record<string, string> = {};
for ( const [ kon, roll ] of Object.entries(JAKONSONANTAJRULEROJ) ) {
  for ( const [ vokalo, kana ] of Object.entries(katakanaX2pa(roll)) ) {
    JAKVKOMBOJ[kon + vokalo] = kana;
  }
}

const JAIPA: string[] = Array.from(new Set([ ...ĈIUJIPA, ...Object.keys(JAKVKOMBOJ) ]))
  .sort(( a, b ) => b.length - a.length || ( a < b ? -1 : 1 ));

// ⟨ ſȷwɔ˞ , 🇬🇧 ⟩
const ANGLAJVOKALOJ = new Set([ "i", "ɛ", "a", "ə", "ɪ̈", "ɤ", "ɑ", "ɛ̃", "ɤ̃", "ɑ̃" ]);
const ANGLAJMALFAVORAJ = new Set([ "ɪ̈", "ɛ", "ə", "ɛ̃", "ɤ̃", "ɑ̃" ]);
const ANGLAJGHACAMUTSA = new Set([ "ɟ̥̆", "ⱱ̥" ]);

function duobligi(konsono: string): string {
  return konsono[0] + konsono;
}

/** ſȷwɔ˞ , ſɭɜ ſɭᴜ , ſȷwɔ˞ , ſɭэ ſᶘɹ , ⟅ ſɭɹ ꞇɔʊ , ſɭэ ſɭᴜ , 📃 ⟩ */
export function anglaKonverti(ipaaS2bana: string): string {
  const esxaq = avideKongruigi(ipaaS2bana, ĈIUJIPA);
  const n = esxaq.length;
  const tseuni = esxaq.map(t => MAPOEN[t] ?? t);

  for ( let i = 0; i < n - 2; i++ ) {
    if ( ANGLAJMALFAVORAJ.has(esxaq[i]) && !ANGLAJVOKALOJ.has(esxaq[i + 1]) && ANGLAJVOKALOJ.has(esxaq[i + 2]) ) {
      if ( !ANGLAJGHACAMUTSA.has(esxaq[i + 1]) ) tseuni[i + 1] = duobligi(tseuni[i + 1]);
    }
  }

  for ( let i = 0; i < n; i++ ) {
    const t = esxaq[i];
    const lakso = t === "ɪ̈" || t === "ə" || t === "ɛ";
    if ( !lakso && t !== "i" ) continue;
    let j = i + 1;
    while ( j < n && !ANGLAJVOKALOJ.has(esxaq[j]) ) j++;
    const runSefini = j - i - 1;
    const tlakakKon = j >= n && runSefini > 0;
    const unuaKon = runSefini > 0 ? esxaq[i + 1] : null;
    const unuaSpel = runSefini > 0 ? tseuni[i + 1] : "";
    if ( lakso ) {
      const mark = t === "ɪ̈" ? "ih" : t === "ə" ? "uh" : "eh";
      const c2na = t === "ɪ̈" ? "i" : t === "ə" ? "u" : "e";
      if ( tlakakKon && unuaKon === "k" ) { tseuni[i] = c2na; tseuni[i + 1] = "ck"; }
      else if ( tlakakKon && unuaKon === "ŋ̥" ) { tseuni[i] = mark; }
      else if ( tlakakKon ) { tseuni[i] = c2na; }
      else if ( unuaSpel.length >= 2 ) { tseuni[i] = c2na; }
      else { tseuni[i] = mark; }
    } else {
      if ( tlakakKon && unuaKon === "k" ) { tseuni[i] = "ee"; }
      else if ( tlakakKon && unuaKon === "ŋ̥" ) { tseuni[i] = "i"; }
      else if ( tlakakKon ) { tseuni[i] = "ee"; }
      else if ( runSefini === 1 ) { tseuni[i] = "e"; }
      else { tseuni[i] = "i"; }
    }
  }
  return tseuni.join("");
}

/** ſȷwɔ˞ , ſɭɜ ſɭᴜ , ſȷwɔ˞ , ſɭэ ſᶘɹ , ꞙɭɿ , */
export function ipaAlGawe(ipaaS2bana: string, lingvaS2kanta: string): string {
  if ( lingvaS2kanta === "en" ) return anglaKonverti(ipaaS2bana);
  const lingvaBal2: Record<string, string> = { ...( LINGVAJMAPOJ[lingvaS2kanta] ?? {} ) };
  let tokenaCatsara = ĈIUJIPA;
  if ( lingvaS2kanta === "ja" ) {
    Object.assign(lingvaBal2, JAKVKOMBOJ);
    tokenaCatsara = JAIPA;
  }
  const esxaq = avideKongruigi(ipaaS2bana, tokenaCatsara);
  const tseuni = esxaq.map(t => lingvaBal2[t] ?? t);
  if ( lingvaS2kanta === "km" && esxaq.length && ANGLAJVOKALOJ.has(esxaq[0]) ) {
    tseuni.unshift("អ");
  }
  return tseuni.join("");
}

/**
 * ſȷwɔ˞ , ſɭɜ ſɭᴜ , ſɭɹ ꞇɔʊ , ⟅ ſɭэ ſɭᴜ , ſɭɹ ꞇɔʊ , 📃 ⟩
 * ſɭэ ſɭw , ſןɔ˞ᴜƴ , ꞙɭɿ , ⟅ ſɭэ ſɭw , ſɭэ ſᶘɹ , ꞙɭɔ , 📃 ⟩
 */
export function gkAlIpa(gkaS2bana: string): string {
  const densigita = gkaS2bana.replace(/\s+/g, "");
  const sax2z: Record<string, string> = {};
  for ( const [ gk, , ipa ] of [ ...SAXEAĴ, ...INTERNAĴ ] ) sax2z[gk] = ipa;
  return avideKongruigi(densigita, ĈIUJGK).map(gk => sax2z[gk] ?? gk).join("");
}

// ⟨ ſןᶗ‹ɔⅎ ᶘɜ , ⟅ ſɭэ ɭʃᴜ , ꞙɭı ,
// ı],ᴜ ֭ſɭᴜ , ꞙɭı , 📃 ⟩
