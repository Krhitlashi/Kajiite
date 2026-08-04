// sonaj-reguloj.ts — Iikrhiaj ( aih ) sonaj reguloj, alportitaj el iloj/sonaj-reguloj.py.
//
// Enhavas ĈIUJN 36 KOMENCAĴ + 45 INTERNAĴ = 81 sign-mapojn de la
// kanonika skrib-konvertilo ( iikrhia-convert.mjs ). Ĉiu mapo havas
// Gawekiif ( gk ), La3os ( latinliterigita ) kaj IPA ( Internacia Fonetika Alfabeto ).
//
// La tradukoj.ts traduk-sistemo uzas ĉi tiun modulon REKTE. La aih-aj ( Gawekiif )
// konstruajx-nomoj estas kanonikaj, kaj ĉiu alia lingva nomo estas derivita ĉi tie
// dum rultempo ( gk → IPA → cela lingvo ) anstataŭ esti mane konvertita.
//
// ⟪ Anglaj ortografiaj reguloj ( en ) 🏴󠁧󠁢󠁥󠁮󠁧󠁿 ⟫
//   · VCV-duobligo — konsonanto inter mallonga vokalo kaj alia vokalo estas
//     duobligita ( VCV → VCCV ), spegulante la anglan "dinner" kontraŭ "diner".
//     Glitoj ( y, w ) NE estas duobligitaj ( "player", ne "playyer" ).
//   · Mallaksaj vokaloj ɪ̈/ə/ɛ ( "ih"/"uh"/"eh" ) — skribitaj kun sia h-markilo
//     defaŭlte; la markilo falas al simpla mallonga vokalo ( "i"/"u"/"e" ) kiam la
//     sekva konsonanto estas duobligita aŭ duopo ( kiu jam signalas la mallongan
//     vokalon. Lhamihth → Lhamith ) aŭ ĉe vort-fina konsonanto ( "it",
//     "but", "pet" ). Antaŭ fina k → ick/uck/eck, antaŭ fina ŋ̥ → ihng/uhng/ehng.
//   · i ( la streĉa vokalo ) — vort-fina "i" restas "i" ( Kapi ); antaŭ vort-fina
//     konsonanto ĝi iĝas "ee" por ke "it" kaj "eet" restu distingaj; antaŭ unuopa
//     konsonanto + vokalo ĝi iĝas "e" ( Tsiye → Tseye ); antaŭ fina k → "eek",
//     antaŭ fina ŋ̥ → "ing".
//   · Vort-fina ɛ konservas sian "eh"-markilon, por ke ĝi ne estu legata kiel silenta magia-e.

// ⟪ KOMENCAĴ ( 36 ) — silab-komencaj konsonantaj formoj 🗣️ ⟫
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

// ⟪ INTERNAĴ ( 45 ) — silab-internaj konsonantoj kaj vokaloj 🗣️ ⟫
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
  // ⟨ Vokal-internoj 🎶 ⟩
  [ "ꞇ", "i", "i" ], [ "ɔ", "e", "ɛ" ], [ "ᴜ", "a", "a" ],
  [ "w", "u", "ə" ], [ "ɹ", "2", "ɪ̈" ], [ "ɜ", "o", "ɤ" ],
  [ "э", "6", "ɑ" ], [ "ɔⅎ", "0", "ɛ̃" ], [ "ɜⅎ", "7", "ɤ̃" ],
  [ "эⅎ", "4", "ɑ̃" ], [ "ᴜꞇ", "ai", "ə" ],
];

// ⟨ Cifereca stenografio 🔢 ⟩
const NUMERA: Record<string, string> = { ts: "1", ii: "2", tl: "3", au: "4", kz: "5", aa: "6", ou: "7", eu: "0" };
const NUMERA_REV: Record<string, string> = {};
for ( const [ v, k ] of Object.entries(NUMERA) ) NUMERA_REV[k] = v;

const ĈIUJ_IPA: string[] = Array.from(
  new Set([...KOMENCAĴ, ...INTERNAĴ].map(([, , ipa]) => ipa).filter(Boolean))
).sort((a, b) => b.length - a.length || (a < b ? -1 : 1));

const ĈIUJ_LA3OS: string[] = Array.from(
  new Set([...KOMENCAĴ, ...INTERNAĴ].map(([, la3]) => la3).filter(Boolean))
).sort((a, b) => b.length - a.length || (a < b ? -1 : 1));

// Gawekiif ( denaska skribo ) ĵetona listo, plej-longa-unue, por gk → IPA.
const ĈIUJ_GK: string[] = Array.from(
  new Set([...KOMENCAĴ, ...INTERNAĴ].map(([gk]) => gk).filter(Boolean))
).sort((a, b) => b.length - a.length || (a < b ? -1 : 1));

function avideKongruigi(teksto: string, tokenaListo: string[]): string[] {
  const ĵetonoj: string[] = [];
  let i = 0;
  while ( i < teksto.length ) {
    let trovita = false;
    for ( const t of tokenaListo ) {
      if ( teksto.startsWith(t, i) ) { ĵetonoj.push(t); i += t.length; trovita = true; break; }
    }
    if ( !trovita ) { ĵetonoj.push(teksto[i]); i++; }
  }
  return ĵetonoj;
}

// ⟪ Lingvaj son-mapaj tabeloj 🌍 ⟫
const MAPO_EO: Record<string, string> = {
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

// ⟨ Japana katakana silabaro — generita programe ⛩️ ⟩
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

// ⟨ Anglaj ortografiaj helpiloj 🇬🇧 ⟩
const ANGLAJ_VOKALOJ = new Set([ "i", "ɛ", "a", "ə", "ɪ̈", "ɤ", "ɑ", "ɛ̃", "ɤ̃", "ɑ̃" ]);
const ANGLAJ_MALFAVORAJ = new Set([ "ɪ̈", "ɛ", "ə", "ɛ̃", "ɤ̃", "ɑ̃" ]);
// Glitoj kies duobligita literumado estas ne-angla ( "player", ne "playyer" ).
const ANGLAJ_GLITOJ = new Set([ "ɟ̥̆", "ⱱ̥" ]);

function duobligi(konsono: string): string {
  return konsono[0] + konsono;
}

/** Transskribu IPA-fonemojn en la anglan kun anglaj ortografiaj reguloj. */
export function anglaKonverti(ipaaTeksto: string): string {
  const ĵetonoj = avideKongruigi(ipaaTeksto, ĈIUJ_IPA);
  const n = ĵetonoj.length;
  const eligo = ĵetonoj.map(t => MAPO_EN[t] ?? t);

  // VCV-duobligo — duobligu konsonanton post mallonga vokalo antaŭ alia vokalo.
  for ( let i = 0; i < n - 2; i++ ) {
    if ( ANGLAJ_MALFAVORAJ.has(ĵetonoj[i]) && !ANGLAJ_VOKALOJ.has(ĵetonoj[i + 1]) && ANGLAJ_VOKALOJ.has(ĵetonoj[i + 2]) ) {
      if ( !ANGLAJ_GLITOJ.has(ĵetonoj[i + 1]) ) eligo[i + 1] = duobligi(eligo[i + 1]);
    }
  }

  // Vokalaj reguloj — mallaksaj vokaloj ɪ̈/ə/ɛ ( "ih"/"uh"/"eh" ) kaj la streĉa i ( "ee" ).
  // Mallaksa vokalo konservas sian h-markilon krom se la sekva konsonanto estas duobligita aŭ
  // duopo ( kiu jam signalas la mallongan vokalon ), aŭ ĉe vort-fina
  // konsonanto ( mallonga "it"/"but"/"pet" ). Fina k → ick/uck/eck; fina ŋ̥ →
  // ihng/uhng/ehng. La streĉa i estas "i", "ee" ĉe vort-fina konsonanto ( "eet" ),
  // kaj "e" antaŭ unuopa konsonanto + vokalo ( Tsiye → Tseye ).
  for ( let i = 0; i < n; i++ ) {
    const t = ĵetonoj[i];
    const lakso = t === "ɪ̈" || t === "ə" || t === "ɛ";
    if ( !lakso && t !== "i" ) continue;
    // Trovu la konsonantan vicon post ĉi tiu vokalo.
    let j = i + 1;
    while ( j < n && !ANGLAJ_VOKALOJ.has(ĵetonoj[j]) ) j++;
    const runLargho = j - i - 1;                 // konsonantoj intere
    const finaKon = j >= n && runLargho > 0;     // la konsonanta vico atingas la vort-finon
    const unuaKon = runLargho > 0 ? ĵetonoj[i + 1] : null;
    const unuaSpel = runLargho > 0 ? eligo[i + 1] : "";
    if ( lakso ) {
      const mark = t === "ɪ̈" ? "ih" : t === "ə" ? "uh" : "eh";
      const mallonga = t === "ɪ̈" ? "i" : t === "ə" ? "u" : "e";
      if ( finaKon && unuaKon === "k" ) { eligo[i] = mallonga; eligo[i + 1] = "ck"; }   // ick/uck/eck
      else if ( finaKon && unuaKon === "ŋ̥" ) { eligo[i] = mark; }                       // ihng/uhng/ehng
      else if ( finaKon ) { eligo[i] = mallonga; }                                      // "it"/"but"/"pet"
      else if ( unuaSpel.length >= 2 ) { eligo[i] = mallonga; }                         // duobligita/duopo
      else { eligo[i] = mark; }                                                       // defaŭlta markilo
    } else { // i ( streĉa )
      if ( finaKon && unuaKon === "k" ) { eligo[i] = "ee"; }                       // eek
      else if ( finaKon && unuaKon === "ŋ̥" ) { eligo[i] = "i"; }                  // ing
      else if ( finaKon ) { eligo[i] = "ee"; }                                     // "eet"
      else if ( runLargho === 1 ) { eligo[i] = "e"; }                              // i-C-V → e ( Tsiye )
      else { eligo[i] = "i"; }                                                   // Kapi
    }
  }
  return eligo.join("");
}

/** Transskribu IPA-fonemojn en celan lingvon ( eo, en, ja, km ). */
export function ipaAlLingvo(ipaaTeksto: string, lingvaKodo: string): string {
  if ( lingvaKodo === "en" ) return anglaKonverti(ipaaTeksto);
  const lingvaMapo: Record<string, string> = { ...(LINGVAJ_MAPOJ[lingvaKodo] ?? {}) };
  let tokenaListo = ĈIUJ_IPA;
  if ( lingvaKodo === "ja" ) {
    // Japane. Kunigu la CV-silab-kombinojn en la mapon kaj ĵetonigu plej-longa-unue.
    Object.assign(lingvaMapo, JA_KV_KOMBOJ);
    tokenaListo = _JA_IPA;
  }
  const ĵetonoj = avideKongruigi(ipaaTeksto, tokenaListo);
  const eligo = ĵetonoj.map(t => lingvaMapo[t] ?? t);
  // Kmere. Vorto ne rajtas komenciĝi per nuda vokalo — prefiksi អ.
  if ( lingvaKodo === "km" && ĵetonoj.length && ANGLAJ_VOKALOJ.has(ĵetonoj[0]) ) {
    eligo.unshift("អ");
  }
  return eligo.join("");
}

/** Konvertu La3os ( kun nombra stenografio ) al IPA-fonema ĉeno. */
export function la3osAlIpa(la3osaTeksto: string): string {
  const trovilo: Record<string, string> = {};
  for ( const [ , la3, ipa ] of [ ...KOMENCAĴ, ...INTERNAĴ ] ) if ( la3 && ipa ) trovilo[la3] = ipa;
  let eksp = "";
  for ( const ĉ of la3osaTeksto ) eksp += NUMERA_REV[ĉ] ?? ĉ;
  return avideKongruigi(eksp, ĈIUJ_LA3OS).map(t => trovilo[t] ?? t).join("");
}

/**
 * Konvertu Gawekiif ( denaska skribo ) rekte al IPA-fonema ĉeno.
 * Spacoj estas silab-apartigiloj en aih-vortoj kaj portas neniun sonon.
 */
export function gkAlIpa(gkaTeksto: string): string {
  const densigita = gkaTeksto.replace(/\s+/g, "");
  const ludo: Record<string, string> = {};
  for ( const [ gk, , ipa ] of [ ...KOMENCAĴ, ...INTERNAĴ ] ) ludo[gk] = ipa;
  return avideKongruigi(densigita, ĈIUJ_GK).map(gk => ludo[gk] ?? gk).join("");
}

// ⟨ Rekta-runa demo — node --experimental-strip-types src/sonaj-reguloj.ts ⟩
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
