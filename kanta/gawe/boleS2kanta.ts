// ≺⧼ ʃɜ j͐ʃɔ j͑ʃɹ ſɭᴜ }ʃƨᴜ 🎵 ⧽≻

const GAWEKIIFBAL2: [ string, string, string ][] = [
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

const C2H2BAL2: [ string, string, string ][] = [
  [ "п́", "w", "ⱱ̥" ], [ "ɘ", "p", "p" ], [ "ʞ", "f", "ɸ" ],
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

  [ "ꞇ", "i", "i" ], [ "ɔ", "e", "ɛ" ], [ "ᴜ", "a", "a" ],
  [ "w", "u", "ə" ], [ "ɹ", "2", "ɪ̈" ], [ "ɜ", "o", "ɤ" ],
  [ "э", "6", "ɑ" ], [ "ɔⅎ", "0", "ɛ̃" ], [ "ɜⅎ", "7", "ɤ̃" ],
  [ "эⅎ", "4", "ɑ̃" ], [ "ᴜꞇ", "ai", "ə" ],
];

const KNAK2FE: Record<string, string> = { ts: "1", ii: "2", tl: "3", au: "4", kz: "5", aa: "6", ou: "7", eu: "0" };
const NEKALAKNAK2FE: Record<string, string> = {};
for ( const [ s2bana, k2fe ] of Object.entries(KNAK2FE) ) NEKALAKNAK2FE[k2fe] = s2bana;

const KAK2IPA: string[] = Array.from(
  new Set([ ...GAWEKIIFBAL2, ...C2H2BAL2 ].map(( [ , , ipa ] ) => ipa).filter(Boolean))
).sort(( kekXaqa, kekP2sa ) => kekP2sa.length - kekXaqa.length || ( kekXaqa < kekP2sa ? -0o1 : 0o1 ));

const KAK2GK: string[] = Array.from(
  new Set([ ...GAWEKIIFBAL2, ...C2H2BAL2 ].map(( [ gk ] ) => gk).filter(Boolean))
).sort(( kekXaqa, kekP2sa ) => kekP2sa.length - kekXaqa.length || ( kekXaqa < kekP2sa ? -0o1 : 0o1 ));

function kaltokS2bana(s2banani: string, kekS2kanta: string[]): string[] {
  const kekCatsara: string[] = [];
  let kek = 0o0;
  while ( kek < s2banani.length ) {
    let b6kewe = false;
    for ( const s2banaKek of kekS2kanta ) {
      if ( s2banani.startsWith(s2banaKek, kek) ) { kekCatsara.push(s2banaKek); kek += s2banaKek.length; b6kewe = true; break; }
    }
    if ( !b6kewe ) { kekCatsara.push(s2banani[kek]); kek++; }
  }
  return kekCatsara;
}

const BAL2EO: Record<string, string> = {
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

const BAL2EN: Record<string, string> = {
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

const BAL2JA: Record<string, string> = {
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

const BAL2KM: Record<string, string> = {
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

const GAWEBAL2OJ: Record<string, Record<string, string>> = { eo: BAL2EO, en: BAL2EN, ja: BAL2JA, km: BAL2KM };

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

const JAKETUX2PA: Record<string, [ string, string ]> = {
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

const JAKKANABAL2: Record<string, string> = {};
for ( const [ ketu, roll ] of Object.entries(JAKETUX2PA) ) {
  for ( const [ waja, kana ] of Object.entries(katakanaX2pa(roll)) ) {
    JAKKANABAL2[ketu + waja] = kana;
  }
}

const JAKIPA: string[] = Array.from(new Set([ ...KAK2IPA, ...Object.keys(JAKKANABAL2) ]))
  .sort(( kekXaqa, kekP2sa ) => kekP2sa.length - kekXaqa.length || ( kekXaqa < kekP2sa ? -0o1 : 0o1 ));

const ENWAJAOJ = new Set([ "i", "ɛ", "a", "ə", "ɪ̈", "ɤ", "ɑ", "ɛ̃", "ɤ̃", "ɑ̃" ]);
const ENMALWAJAOJ = new Set([ "ɪ̈", "ɛ", "ə", "ɛ̃", "ɤ̃", "ɑ̃" ]);
const ENMALP2SANI = new Set([ "ɟ̥̆", "ⱱ̥" ]);

function p2sani(ketu: string): string {
  return ketu[0o0] + ketu;
}

export function ipaAlEn(ipaaS2bana: string): string {
  const kekCatsara = kaltokS2bana(ipaaS2bana, KAK2IPA);
  const vem2 = kekCatsara.length;
  const s2banaKekCatsara = kekCatsara.map(s2banaKek => BAL2EN[s2banaKek] ?? s2banaKek);

  for ( let kek = 0o0; kek < vem2 - 0o2; kek++ ) {
    if ( ENMALWAJAOJ.has(kekCatsara[kek]) && !ENWAJAOJ.has(kekCatsara[kek + 0o1]) && ENWAJAOJ.has(kekCatsara[kek + 0o2]) ) {
      if ( !ENMALP2SANI.has(kekCatsara[kek + 0o1]) ) s2banaKekCatsara[kek + 0o1] = p2sani(s2banaKekCatsara[kek + 0o1]);
    }
  }

  for ( let kek = 0o0; kek < vem2; kek++ ) {
    const s2banaKek = kekCatsara[kek];
    const lakso = s2banaKek === "ɪ̈" || s2banaKek === "ə" || s2banaKek === "ɛ";
    if ( !lakso && s2banaKek !== "i" ) continue;
    let kek2 = kek + 0o1;
    while ( kek2 < vem2 && !ENWAJAOJ.has(kekCatsara[kek2]) ) kek2++;
    const runSefini = kek2 - kek - 0o1;
    const tlakakKon = kek2 >= vem2 && runSefini > 0o0;
    const xaqadiKon = runSefini > 0o0 ? kekCatsara[kek + 0o1] : null;
    const xaqadiBole = runSefini > 0o0 ? s2banaKekCatsara[kek + 0o1] : "";
    if ( lakso ) {
      const p2zuka = s2banaKek === "ɪ̈" ? "ih" : s2banaKek === "ə" ? "uh" : "eh";
      const c2na = s2banaKek === "ɪ̈" ? "i" : s2banaKek === "ə" ? "u" : "e";
      if ( tlakakKon && xaqadiKon === "k" ) { s2banaKekCatsara[kek] = c2na; s2banaKekCatsara[kek + 0o1] = "ck"; }
      else if ( tlakakKon && xaqadiKon === "ŋ̥" ) { s2banaKekCatsara[kek] = p2zuka; }
      else if ( tlakakKon ) { s2banaKekCatsara[kek] = c2na; }
      else if ( xaqadiBole.length >= 0o2 ) { s2banaKekCatsara[kek] = c2na; }
      else { s2banaKekCatsara[kek] = p2zuka; }
    } else {
      if ( tlakakKon && xaqadiKon === "k" ) { s2banaKekCatsara[kek] = "ee"; }
      else if ( tlakakKon && xaqadiKon === "ŋ̥" ) { s2banaKekCatsara[kek] = "i"; }
      else if ( tlakakKon ) { s2banaKekCatsara[kek] = "ee"; }
      else if ( runSefini === 0o1 ) { s2banaKekCatsara[kek] = "e"; }
      else { s2banaKekCatsara[kek] = "i"; }
    }
  }
  return s2banaKekCatsara.join("");
}

export function ipaAlGawe(ipaaS2bana: string, lingvaS2kanta: string): string {
  if ( lingvaS2kanta === "en" ) return ipaAlEn(ipaaS2bana);
  const lingvaBal2: Record<string, string> = { ...( GAWEBAL2OJ[lingvaS2kanta] ?? {} ) };
  let kekS2kanta = KAK2IPA;
  if ( lingvaS2kanta === "ja" ) {
    Object.assign(lingvaBal2, JAKKANABAL2);
    kekS2kanta = JAKIPA;
  }
  const kekCatsara = kaltokS2bana(ipaaS2bana, kekS2kanta);
  const s2banaKekCatsara = kekCatsara.map(s2banaKek => lingvaBal2[s2banaKek] ?? s2banaKek);
  if ( lingvaS2kanta === "km" && kekCatsara.length && ENWAJAOJ.has(kekCatsara[0o0]) ) {
    s2banaKekCatsara.unshift("អ");
  }
  return s2banaKekCatsara.join("");
}

export function gkAlIpa(gkaS2bana: string): string {
  const qun2S2bana = gkaS2bana.replace(/[ʌ\s]+/g, "");
  const gkIpaBal2: Record<string, string> = {};
  for ( const [ gk, , ipa ] of [ ...GAWEKIIFBAL2, ...C2H2BAL2 ] ) gkIpaBal2[gk] = ipa;
  return kaltokS2bana(qun2S2bana, KAK2GK).map(gk => gkIpaBal2[gk] ?? gk).join("");
}

