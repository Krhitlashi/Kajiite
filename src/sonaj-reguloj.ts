// sonaj-reguloj.ts — Iikrhia ( aih ) sound rules, ported from iloj/sonaj-reguloj.py.
//
// Contains ALL 36 KOMENCAĴ + 45 INTERNAĴ = 81 character mappings from the
// canonical writing converter ( iikrhia-convert.mjs ). Each mapping has
// Gawekiif ( gk ), La3os ( romanized ), and IPA ( International Phonetic Alphabet ).
//
// The tradukoj.ts translation system uses this module DIRECTLY: the aih ( Gawekiif )
// building names are canonical, and every other language's name is derived here
// at runtime ( gk → IPA → target language ) instead of being hand-converted.
//
// ⟪ English orthography rules ( en ) 🏴󠁧󠁢󠁥󠁮󠁧󠁿 ⟫
//   · VCV doubling — a consonant between a short vowel and another vowel is
//     doubled ( VCV → VCCV ), mirroring English "dinner" vs "diner". Glides
//     ( y, w ) are NOT doubled ( "player", not "playyer" ).
//   · Lax vowels ɪ̈/ə/ɛ ( "ih"/"uh"/"eh" ) — written with their h-marker by
//     default; the marker drops to a plain short vowel ( "i"/"u"/"e" ) when the
//     following consonant is doubled or a digraph ( which already signals the
//     short vowel: Lhamihth → Lhamith ) or at a word-final consonant ( "it",
//     "but", "pet" ). Before final k → ick/uck/eck, before final ŋ̥ → ihng/uhng/ehng.
//   · i ( the tense vowel ) — word-final "i" stays "i" ( Kapi ); before a
//     word-final consonant it becomes "ee" so "it" and "eet" stay distinct;
//     before a single consonant + vowel it becomes "e" ( Tsiye → Tseye );
//     before final k → "eek", before final ŋ̥ → "ing".
//   · Word-final ɛ keeps its "eh" marker, so it is not read as a silent magic-e.

// ⟪ KOMENCAĴ ( 36 ) — syllable-leading consonant forms 🗣️ ⟫
const KOMENCAĴ: [string, string, string][] = [
  [ "ᶅſ", "w", "ⱱ̥" ], [ "ſן", "p", "p" ], [ "ſȷ", "f", "ɸ" ],
  [ "ʃ", "b", "ɸˠ" ], [ "ŋᷠ", "m", "m̥" ], [ "ɽ͑ʃ'", "r", "ɾ̪̥" ],
  [ "j͑ʃ'", "v", "θ" ], [ "ɭʃ", "t", "t" ], [ "ɭ(", "d", "s̪" ],
  [ "ſᶘ", "1", "ts" ], [ "j͑ʃ", "s", "s" ], [ "}ʃ", "n", "n̥" ],
  [ "ſ̀ȷ", "3", "tɬ" ], [ "j͐ʃ", "l", "ɬ" ], [ "ſɭˬ", "5", "kʂ" ],
  [ "ſɭ,", "z", "ʂ" ], [ "ɭl̀", "j", "ɟ̥̆" ], [ "ſɟ", "c", "c" ],
  [ "ı],", "x", "ç" ], [ "ſ͕ȷ", "y", "ɲ̥" ], [ "ſ͔ɭ", "g", "xʲ" ],
  [ "ſɭ", "k", "k" ], [ "֭ſɭ", "h", "x" ], [ "ſ͕ɭ", "q", "ŋ̥" ],
  [ "ȏſן", "p'", "ʘ" ], [ "ȏɭʃ'", "v'", "ǀ" ], [ "ȏſ̀ȷ", "l'", "ǁ" ],
  [ "ȏſɟ", "c'", "ǂ" ], [ "ȏɭʃ", "t'", "ǃ" ], [ "ȏŋᷠ", "m'", "ʘ̃" ],
  [ "ȏ}ʃ'", "nv'", "ǀ̃" ], [ "ȏoͩſ̀ȷ", "nl'", "ǁ̃" ], [ "ȏſ͕ȷ", "y'", "ǂ̃" ],
  [ "ȏ}ʃ", "n'", "ǃ̃" ], [ "ꞁȷ̀", "", "" ], [ "⺓", "piise", "pɪ̈sɛ" ],
];

// ⟪ INTERNAĴ ( 45 ) — syllable-internal consonants & vowels 🗣️ ⟫
const INTERNAĴ: [string, string, string][] = [
  [ "п́", "w", "ⱱ̥" ], [ "ɘ", "p", "p" ], [ "ʞ", "f", "ɸ" ],
  [ "ɀ", "b", "ɸˠ" ], [ "c̭", "m", "m̥" ], [ "ƣ̋", "r", "ɾ̪̥" ],
  [ "ⰱ", "v", "θ" ], [ "ƨ", "t", "t" ], [ "ԏ͕", "d", "s̪" ],
  [ "ꝛ̗", "1", "ts" ], [ "ɔ˞", "s", "s" ], [ "c̗", "n", "n̥" ],
  [ "ŋ", "3", "tɬ" ], [ "ͷ̗", "l", "ɬ" ], [ "ɯ", "5", "kʂ" ],
  [ "ƴ", "z", "ʂ" ], [ "ᴎ", "j", "ɟ̥̆" ], [ "ᴜ̭", "c", "c" ],
  [ "ᶗ‹", "x", "ç" ], [ "ⱷ̮̀", "y", "ɲ̥" ], [ "ɴ", "g", "xʲ" ],
  [ "ƽ", "k", "k" ], [ "ᴜ̩", "h", "x" ], [ "ȝ", "q", "ŋ̥" ],
  [ "ɘȏ", "p'", "ʘ" ], [ "ⱷ᷐ȏ", "v'", "ǀ" ], [ "ŋȏ", "l'", "ǁ" ],
  [ "ᴜ̭ȏ", "c'", "ǂ" ], [ "ƨȏ", "t'", "ǃ" ], [ "c̭ȏ", "m'", "ʘ̃" ],
  [ "c̏ȏ", "nv'", "ǀ̃" ], [ "ŋoͩȏ", "nl'", "ǁ̃" ], [ "ⱷ̮̀ȏ", "y'", "ǂ̃" ],
  [ "c̗ȏ", "n'", "ǃ̃" ],
  // ⟨ Vowel internals 🎶 ⟩
  [ "ꞇ", "i", "i" ], [ "ɔ", "e", "ɛ" ], [ "ᴜ", "a", "a" ],
  [ "w", "u", "ə" ], [ "ɹ", "2", "ɪ̈" ], [ "ɜ", "o", "ɤ" ],
  [ "э", "6", "ɑ" ], [ "ɔⅎ", "0", "ɛ̃" ], [ "ɜⅎ", "7", "ɤ̃" ],
  [ "эⅎ", "4", "ɑ̃" ], [ "ᴜꞇ", "ai", "ə" ],
];

// ⟨ Numerical shorthand 🔢 ⟩
const NUMERA: Record<string, string> = { ts: "1", ii: "2", tl: "3", au: "4", kz: "5", aa: "6", ou: "7", eu: "0" };
const NUMERA_REV: Record<string, string> = {};
for (const [v, k] of Object.entries(NUMERA)) NUMERA_REV[k] = v;

const ĈIUJ_IPA: string[] = Array.from(
  new Set([...KOMENCAĴ, ...INTERNAĴ].map(([, , ipa]) => ipa).filter(Boolean))
).sort((a, b) => b.length - a.length || (a < b ? -1 : 1));

const ĈIUJ_LA3OS: string[] = Array.from(
  new Set([...KOMENCAĴ, ...INTERNAĴ].map(([, la3]) => la3).filter(Boolean))
).sort((a, b) => b.length - a.length || (a < b ? -1 : 1));

// Gawekiif ( native script ) token list, longest-first, for gk → IPA.
const ĈIUJ_GK: string[] = Array.from(
  new Set([...KOMENCAĴ, ...INTERNAĴ].map(([gk]) => gk).filter(Boolean))
).sort((a, b) => b.length - a.length || (a < b ? -1 : 1));

function avideKongruigi(text: string, tokenList: string[]): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < text.length) {
    let matched = false;
    for (const t of tokenList) {
      if (text.startsWith(t, i)) { tokens.push(t); i += t.length; matched = true; break; }
    }
    if (!matched) { tokens.push(text[i]); i++; }
  }
  return tokens;
}

// ⟪ Language Sound-Mapping Tables 🌍 ⟫
const MAPO_EO: Record<string, string> = {
  "ⱱ̥": "v", "p": "p", "ɸ": "f", "ɸˠ": "f",
  "m̥": "m", "ɾ̪̥": "r", "θ": "z", "t": "t", "s̪": "s",
  "ts": "c", "s": "s", "n̥": "n", "tɬ": "tl", "ɬ": "l",
  "kʂ": "kr", "ʂ": "ĝ", "ɟ̥̆": "j", "c": "ĉ", "ç": "ŝ",
  "ɲ̥": "nj", "xʲ": "ĥj", "k": "k", "x": "ĥ", "ŋ̥": "nk",
  "ʘ": "p", "ǀ": "t", "ǁ": "kl", "ǂ": "ĉ", "ǃ": "t",
  "ʘ̃": "mp", "ǀ̃": "nt", "ǁ̃": "nkl", "ǂ̃": "nĉ", "ǃ̃": "nt",
  "i": "i", "ɛ": "e", "a": "a", "ə": "eŭ", "ɪ̈": "u",
  "ɤ": "o", "ɑ": "aŭ", "ɛ̃": "en", "ɤ̃": "on", "ɑ̃": "an",
  "pɪ̈sɛ": "puse",
};

const MAPO_EN: Record<string, string> = {
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

const MAPO_JA: Record<string, string> = {
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

const MAPO_KM: Record<string, string> = {
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

const LINGVAJ_MAPOJ: Record<string, Record<string, string>> = { eo: MAPO_EO, en: MAPO_EN, ja: MAPO_JA, km: MAPO_KM };

// ⟨ Japanese katakana syllabary — generated programmatically ⛩️ ⟩
const JA_GOJŪON: Record<string, Record<string, string>> = {
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

const JA_KONSONANTAJ_RULEROJ: Record<string, [string, string]> = {
  k: [ "gojūon", "k" ], c: [ "yōon", "チ" ], t: [ "gojūon", "t" ],
  ɸ: [ "foreign", "フ" ], x: [ "gojūon", "h" ], ç: [ "yōon", "シ" ],
  m: [ "gojūon", "m" ], m̥: [ "gojūon", "m" ], s: [ "gojūon", "s" ],
  n: [ "gojūon", "n" ], n̥: [ "gojūon", "n" ], ɬ: [ "gojūon", "r" ],
  ɟ̥̆: [ "gojūon", "y" ], ⱱ̥: [ "gojūon", "w" ], xʲ: [ "yōon", "ヒ" ],
  p: [ "gojūon", "p" ], θ: [ "gojūon", "s" ], kʂ: [ "kʂ", "ク" ],
  ts: [ "foreign", "ツ" ], ɾ̪̥: [ "gojūon", "r" ], ɲ̥: [ "yōon", "ニ" ],
  tɬ: [ "tɬ", "ト" ],
};

function katakanaVico(kon: string, rulo: [string, string]): Record<string, string> {
  const [speco, bazo] = rulo;
  let vico: Record<string, string>;
  if (speco === "gojūon") vico = { ...JA_GOJŪON[bazo] };
  else if (speco === "yōon") vico = { a: bazo + "ャ", i: bazo, ɛ: bazo + "ェ", ɤ: bazo + "ョ" };
  else if (speco === "foreign") vico = { a: bazo + "ァ", i: bazo + "ィ", ɛ: bazo + "ェ", ɤ: bazo + "ォ" };
  else if (speco === "kʂ") vico = { a: bazo + "シャ", i: bazo + "シ", ɛ: bazo + "シェ", ɤ: bazo + "ショ" };
  else if (speco === "tɬ") vico = { a: bazo + "ラ", i: bazo + "リ", ɛ: bazo + "レ", ɤ: bazo + "ロ" };
  else vico = {};
  vico["ɑ"] = vico["a"] + "ー";
  return vico;
}

const JA_KV_KOMBOJ: Record<string, string> = {};
for (const [kon, rulo] of Object.entries(JA_KONSONANTAJ_RULEROJ)) {
  for (const [vokalo, kana] of Object.entries(katakanaVico(kon, rulo))) {
    JA_KV_KOMBOJ[kon + vokalo] = kana;
  }
}

const _JA_IPA: string[] = Array.from(new Set([...ĈIUJ_IPA, ...Object.keys(JA_KV_KOMBOJ)]))
  .sort((a, b) => b.length - a.length || (a < b ? -1 : 1));

// ⟨ English orthographic helpers 🇬🇧 ⟩
const ANGLAJ_VOKALOJ = new Set([ "i", "ɛ", "a", "ə", "ɪ̈", "ɤ", "ɑ", "ɛ̃", "ɤ̃", "ɑ̃" ]);
const ANGLAJ_MALFAVORAJ = new Set([ "ɪ̈", "ɛ", "ə", "ɛ̃", "ɤ̃", "ɑ̃" ]);
// Glides whose doubled spelling is un-English ( "player", not "playyer" ).
const ANGLAJ_GLITOJ = new Set([ "ɟ̥̆", "ⱱ̥" ]);

function duobligi(konsono: string): string {
  return konsono[0] + konsono;
}

/** Transcribe IPA phonemes into English with English-orthography rules. */
export function anglaKonverti(ipaText: string): string {
  const tokens = avideKongruigi(ipaText, ĈIUJ_IPA);
  const n = tokens.length;
  const eligo = tokens.map(t => MAPO_EN[t] ?? t);

  // VCV doubling — double a consonant after a short vowel before another vowel.
  for (let i = 0; i < n - 2; i++) {
    if (ANGLAJ_MALFAVORAJ.has(tokens[i]) && !ANGLAJ_VOKALOJ.has(tokens[i + 1]) && ANGLAJ_VOKALOJ.has(tokens[i + 2])) {
      if (!ANGLAJ_GLITOJ.has(tokens[i + 1])) eligo[i + 1] = duobligi(eligo[i + 1]);
    }
  }

  // Vowel rules — lax vowels ɪ̈/ə/ɛ ( "ih"/"uh"/"eh" ) and the tense i ( "ee" ).
  // A lax vowel keeps its h-marker unless the following consonant is doubled or
  // a digraph ( which already signals the short vowel ), or at a word-final
  // consonant ( short "it"/"but"/"pet" ). Final k → ick/uck/eck; final ŋ̥ →
  // ihng/uhng/ehng. The tense i is "i", "ee" at a word-final consonant ( "eet" ),
  // and "e" before a single consonant + vowel ( Tsiye → Tseye ).
  for (let i = 0; i < n; i++) {
    const t = tokens[i];
    const lakso = t === "ɪ̈" || t === "ə" || t === "ɛ";
    if (!lakso && t !== "i") continue;
    // Find the consonant run after this vowel.
    let j = i + 1;
    while (j < n && !ANGLAJ_VOKALOJ.has(tokens[j])) j++;
    const runLargho = j - i - 1;                 // consonants between
    const finaKon = j >= n && runLargho > 0;     // consonant run reaches word end
    const unuaKon = runLargho > 0 ? tokens[i + 1] : null;
    const unuaSpel = runLargho > 0 ? eligo[i + 1] : "";
    if (lakso) {
      const mark = t === "ɪ̈" ? "ih" : t === "ə" ? "uh" : "eh";
      const mallonga = t === "ɪ̈" ? "i" : t === "ə" ? "u" : "e";
      if (finaKon && unuaKon === "k") { eligo[i] = mallonga; eligo[i + 1] = "ck"; }   // ick/uck/eck
      else if (finaKon && unuaKon === "ŋ̥") { eligo[i] = mark; }                       // ihng/uhng/ehng
      else if (finaKon) { eligo[i] = mallonga; }                                      // "it"/"but"/"pet"
      else if (unuaSpel.length >= 2) { eligo[i] = mallonga; }                         // doubled/digraph
      else { eligo[i] = mark; }                                                       // default marker
    } else { // i ( tense )
      if (finaKon && unuaKon === "k") { eligo[i] = "ee"; }                       // eek
      else if (finaKon && unuaKon === "ŋ̥") { eligo[i] = "i"; }                  // ing
      else if (finaKon) { eligo[i] = "ee"; }                                     // "eet"
      else if (runLargho === 1) { eligo[i] = "e"; }                              // i-C-V → e ( Tsiye )
      else { eligo[i] = "i"; }                                                   // Kapi
    }
  }
  return eligo.join("");
}

/** Transcribe IPA phonemes into a target language ( eo, en, ja, km ). */
export function ipaAlLingvo(ipaText: string, langCode: string): string {
  if (langCode === "en") return anglaKonverti(ipaText);
  const langMap: Record<string, string> = { ...(LINGVAJ_MAPOJ[langCode] ?? {}) };
  let tokenList = ĈIUJ_IPA;
  if (langCode === "ja") {
    // Japanese: merge the CV syllable combos into the map and tokenize longest-first.
    Object.assign(langMap, JA_KV_KOMBOJ);
    tokenList = _JA_IPA;
  }
  const tokens = avideKongruigi(ipaText, tokenList);
  const eligo = tokens.map(t => langMap[t] ?? t);
  // Khmer: a word may not start with a bare vowel — prefix អ.
  if (langCode === "km" && tokens.length && ANGLAJ_VOKALOJ.has(tokens[0])) {
    eligo.unshift("អ");
  }
  return eligo.join("");
}

/** Convert La3os ( with numerical shorthand ) to an IPA phoneme string. */
export function la3osAlIpa(la3osText: string): string {
  const lookup: Record<string, string> = {};
  for (const [, la3, ipa] of [...KOMENCAĴ, ...INTERNAĴ]) if (la3 && ipa) lookup[la3] = ipa;
  let exp = "";
  for (const ch of la3osText) exp += NUMERA_REV[ch] ?? ch;
  return avideKongruigi(exp, ĈIUJ_LA3OS).map(t => lookup[t] ?? t).join("");
}

/**
 * Convert Gawekiif ( native script ) directly to an IPA phoneme string.
 * Spaces are syllable separators in aih words and carry no sound.
 */
export function gkAlIpa(gkText: string): string {
  const densigita = gkText.replace(/\s+/g, "");
  const ludo: Record<string, string> = {};
  for (const [gk, , ipa] of [...KOMENCAĴ, ...INTERNAĴ]) ludo[gk] = ipa;
  return avideKongruigi(densigita, ĈIUJ_GK).map(gk => ludo[gk] ?? gk).join("");
}

// ⟨ Direct-run demo: node --experimental-strip-types src/sonaj-reguloj.ts ⟩
if ((import.meta as unknown as { main?: boolean }).main) {
  const provoj: [string, string][] = [
    [ "paq0", "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ꞇ ŋᷠᴜ }ʃɹ" ],
    [ "paq1", "ſɭᴜ ſןɹ" ],
    [ "paq15", "j͐ʃᴜ ŋᷠɹⰱ" ],
    [ "paq22", "ſɟᴜ ſᶘɔ ɭl̀ɹȝ" ],
    [ "tipTuro", "ſןᴜȝ ᶅſw ſɭɹ" ],
    [ "paq33", "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ" ],
  ];
  for (const [nomo, gk] of provoj) {
    const ipa = gkAlIpa(gk);
    console.log(`${nomo}: gk="${gk}" ipa="${ipa}"`);
    for (const lg of [ "eo", "en", "ja", "km" ]) {
      console.log(`   ${lg}: ${ipaAlLingvo(ipa, lg)}`);
    }
  }
}
