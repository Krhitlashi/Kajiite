"""
≺⧼ iikrhia_sound_rules.py — Complete Iikrhia ( aih ) Sound Mapping System 🎵 ⧽≻

Contains ALL 36 KOMENCAĴ + 45 INTERNAĴ = 81 character mappings from the
canonical writing converter ( iikrhia-convert.mjs ). Each mapping has Gawekiif ( gk ), La3os ( romanized ),
and IPA ( International Phonetic Alphabet ).

Edit the LINGVAJ_MAPOJ dict below to adjust how each Iikrhia phoneme
is approximated in each target language.

⟪ Usage 📖 ⟫
    python iikrhia_sound_rules.py <mode> <text> [language_code]

⟪ Modes 🎛️ ⟫
    ipa_al_lingvo  — IPA phonemes to target language approximation
    la3os_al_ipa — La3os shorthand to IPA phonemes
    listigi      — show all 81 character mappings

⟪ Examples 💡 ⟫
    python iikrhia_sound_rules.py ipa_al_lingvo "veto" eo
    python iikrhia_sound_rules.py ipa_al_lingvo "takeng" en
    python iikrhia_sound_rules.py la3os_al_ipa "weto"
    python iikrhia_sound_rules.py listigi
"""

import sys

# ⟪ KOMENCAĴ ( 36 ) — syllable-leading consonant forms 🗣️ ⟫
# Source. canonical converter iikrhia-convert.mjs
KOMENCAĴ = [
    ("ᶅſ", "w", "ⱱ̥"),  ("ſן", "p", "p"),   ("ſȷ", "f", "ɸ"),
    ("ʃ", "b", "ɸˠ"),    ("ŋᷠ", "m", "m̥"),  ("ɽ͑ʃ'", "r", "ɾ̪̥"),
    ("j͑ʃ'", "v", "θ"),  ("ɭʃ", "t", "t"),   ("ɭ(", "d", "s̪"),
    ("ſᶘ", "1", "ts"),   ("j͑ʃ", "s", "s"),  ("}ʃ", "n", "n̥"),
    ("ſ̀ȷ", "3", "tɬ"),   ("j͐ʃ", "l", "ɬ"),  ("ſɭˬ", "5", "kʂ"),
    ("ſɭ,", "z", "ʂ"),   ("ɭl̀", "j", "ɟ̥̆"), ("ſɟ", "c", "c"),
    ("ı],", "x", "ç"),   ("ſ͕ȷ", "y", "ɲ̥"), ("ſ͔ɭ", "g", "xʲ"),
    ("ſɭ", "k", "k"),    ("֭ſɭ", "h", "x"),  ("ſ͕ɭ", "q", "ŋ̥"),
    ("ȏſן", "p'", "ʘ"),  ("ȏɭʃ'", "v'", "ǀ"),("ȏſ̀ȷ", "l'", "ǁ"),
    ("ȏſɟ", "c'", "ǂ"),  ("ȏɭʃ", "t'", "ǃ"), ("ȏŋᷠ", "m'", "ʘ̃"),
    ("ȏ}ʃ'", "nv'", "ǀ̃"),("ȏoͩſ̀ȷ", "nl'", "ǁ̃"),("ȏſ͕ȷ", "y'", "ǂ̃"),
    ("ȏ}ʃ", "n'", "ǃ̃"), ("ꞁȷ̀", "", ""),    ("⺓", "piise", "pɪ̈sɛ"),
]

# ⟪ INTERNAĴ ( 45 ) — syllable-internal consonants & vowels 🗣️ ⟫
INTERNAĴ = [
    ("п́", "w", "ⱱ̥"),   ("ɘ", "p", "p"),    ("ʞ", "f", "ɸ"),
    ("ɀ", "b", "ɸˠ"),   ("c̭", "m", "m̥"),   ("ƣ̋", "r", "ɾ̪̥"),
    ("ⰱ", "v", "θ"),    ("ƨ", "t", "t"),    ("ԏ͕", "d", "s̪"),
    ("ꝛ̗", "1", "ts"),  ("ɔ˞", "s", "s"),   ("c̗", "n", "n̥"),
    ("ŋ", "3", "tɬ"),   ("ͷ̗", "l", "ɬ"),   ("ɯ", "5", "kʂ"),
    ("ƴ", "z", "ʂ"),    ("ᴎ", "j", "ɟ̥̆"),  ("ᴜ̭", "c", "c"),
    ("ᶗ‹", "x", "ç"),   ("ⱷ̮̀", "y", "ɲ̥"), ("ɴ", "g", "xʲ"),
    ("ƽ", "k", "k"),    ("ᴜ̩", "h", "x"),   ("ȝ", "q", "ŋ̥"),
    ("ɘȏ", "p'", "ʘ"),  ("ⱷ᷐ȏ", "v'", "ǀ"),("ŋȏ", "l'", "ǁ"),
    ("ᴜ̭ȏ", "c'", "ǂ"), ("ƨȏ", "t'", "ǃ"), ("c̭ȏ", "m'", "ʘ̃"),
    ("c̏ȏ", "nv'", "ǀ̃"),("ŋoͩȏ", "nl'", "ǁ̃"),("ⱷ̮̀ȏ", "y'", "ǂ̃"),
    ("c̗ȏ", "n'", "ǃ̃"),
    # ⟨ Vowel internals 🎶 ⟩
    ("ꞇ", "i", "i"),   ("ɔ", "e", "ɛ"),   ("ᴜ", "a", "a"),
    ("w", "u", "ə"),   ("ɹ", "2", "ɪ̈"),  ("ɜ", "o", "ɤ"),
    ("э", "6", "ɑ"),   ("ɔⅎ", "0", "ɛ̃"), ("ɜⅎ", "7", "ɤ̃"),
    ("эⅎ", "4", "ɑ̃"), ("ᴜꞇ", "ai", "ə"),
]

# ⟨ Numerical shorthand 🔢 ⟩
NUMERA = {"ts": "1", "ii": "2", "tl": "3", "au": "4", "kz": "5", "aa": "6", "ou": "7", "eu": "0"}
NUMERA_REV = {v: k for k, v in NUMERA.items()}

# ⟨ IPA token list ( longest-first for greedy matching ) 🔤 ⟩

# ⟨ Collect all unique IPA tokens from both KOMENCAĴ and INTERNAĴ 💠 ⟩
ĈIUJ_IPA = sorted(
    set(ipa for (_, _, ipa) in KOMENCAĴ + INTERNAĴ if ipa),
    key=lambda x: (-len(x), x)
)

# ⟨ Also collect all La3os tokens for reverse conversion 🔄 ⟩
ĈIUJ_LA3OS = sorted(
    set(la3 for (_, la3, _) in KOMENCAĴ + INTERNAĴ if la3),
    key=lambda x: (-len(x), x)
)

def vastigi_numeran(text):
    """Expand numerical shorthand digits to full La3os forms."""
    result = []
    for ch in text:
        result.append(NUMERA_REV.get(ch, ch))
    return "".join(result)

def avide_kongruigi(text, token_list):
    """Greedy longest-first token matching: split text into known tokens."""
    tokens = []
    i = 0
    while ( i < len(text) ):
        matched = False
        for t in token_list:
            if ( text[i:].startswith(t) ):
                tokens.append(t)
                i += len(t)
                matched = True
                break
        if ( not matched ):
            tokens.append(text[i])
            i += 1
    return tokens

# ⟪ Language Sound-Mapping Tables 🌍 ⟫
#
# Each Iikrhia IPA phoneme maps to the closest phoneme/letter
# in the target language. Edit these dicts to adjust approximations.

MAPO_EO = {
    # ⟨ Consonants 🔊 ⟩
    "ⱱ̥": "v", "p": "p", "ɸ": "f", "ɸˠ": "f",
    "m̥": "m", "ɾ̪̥": "r", "θ": "t", "t": "t", "s̪": "s",
    "ts": "c", "s": "s", "n̥": "n", "tɬ": "tĥ", "ɬ": "l",
    "kʂ": "kr", "ʂ": "ĝ", "ɟ̥̆": "j", "c": "ĉ", "ç": "ŝ",
    "ɲ̥": "nj", "xʲ": "ĥj", "k": "k", "x": "ĥ", "ŋ̥": "nk",
    # ⟨ Clicks ( use closest non-click consonants ) 👆 ⟩
    "ʘ": "p", "ǀ": "t", "ǁ": "kl", "ǂ": "ĉ", "ǃ": "t",
    "ʘ̃": "mp", "ǀ̃": "nt", "ǁ̃": "nkl", "ǂ̃": "nĉ", "ǃ̃": "nt",
    # ⟨ Vowels 🎶 ⟩
    "i": "i", "ɛ": "e", "a": "a", "ə": "u", "ɪ̈": "i",
    "ɤ": "o", "ɑ": "a", "ɛ̃": "en", "ɤ̃": "on", "ɑ̃": "an",
    # ⟨ Special topic marker ( ⺓ piise ) — multi-syllable Ⓜ️ ⟩
    "pɪ̈sɛ": "puse",
}

MAPO_EN = {
    "ⱱ̥": "w", "p": "p", "ɸ": "h", "ɸˠ": "f",
    "m̥": "m", "ɾ̪̥": "r", "θ": "th", "t": "t", "s̪": "s",
    "ts": "ts", "s": "s", "n̥": "n", "tɬ": "tl", "ɬ": "lh",
    "kʂ": "krh", "ʂ": "rh", "ɟ̥̆": "y", "c": "ch", "ç": "sh",
    "ɲ̥": "ny", "xʲ": "hy", "k": "k", "x": "kh", "ŋ̥": "ng",
    "ʘ": "p", "ǀ": "tsk", "ǁ": "kl", "ǂ": "k", "ǃ": "t",
    "ʘ̃": "mp", "ǀ̃": "ntsk", "ǁ̃": "nkl", "ǂ̃": "nk", "ǃ̃": "nt",
    "i": "i", "ɛ": "e", "a": "a", "ə": "uh", "ɪ̈": "ih",
    "ɤ": "o", "ɑ": "aw", "ɛ̃": "en", "ɤ̃": "on", "ɑ̃": "an",
    # ⟨ Special topic marker ( ⺓ piise ) — multi-syllable Ⓜ️ ⟩
    "pɪ̈sɛ": "pisseh",
}

MAPO_JA = {
    "ⱱ̥": "ワ", "p": "プ", "ɸ": "フ", "ɸˠ": "フ",
    "m̥": "ム", "ɾ̪̥": "ル", "θ": "ス", "t": "ト", "s̪": "ス",
    "ts": "ツ", "s": "ス", "n̥": "ヌン", "tɬ": "トル", "ɬ": "ラ",
    "kʂ": "クル", "ʂ": "シ", "ɟ̥̆": "ユ", "c": "チ", "ç": "シ",
    "ɲ̥": "ニュ", "xʲ": "ヒ", "k": "ク", "x": "ホ", "ŋ̥": "ン",
    "ʘ": "プ", "ǀ": "ツ", "ǁ": "クル", "ǂ": "ク", "ǃ": "ト",
    "ʘ̃": "ンプ", "ǀ̃": "ンツ", "ǁ̃": "ンクル", "ǂ̃": "ンク", "ǃ̃": "ント",
    "i": "イ", "ɛ": "エ", "a": "ア", "ə": "ア", "ɪ̈": "ウ",
    "ɤ": "オ", "ɑ": "アー", "ɛ̃": "エン", "ɤ̃": "オン", "ɑ̃": "アン",
    # ⟨ Special topic marker ( ⺓ piise ) — multi-syllable Ⓜ️ ⟩
    "pɪ̈sɛ": "プセ",
}

MAPO_KM = {
    "ⱱ̥": "វ", "p": "ព", "ɸ": "ផ", "ɸˠ": "ភ",
    "m̥": "ម", "ɾ̪̥": "រ", "θ": "ថ", "t": "ត", "s̪": "ស្ស",
    "ts": "ត្ស", "s": "ស", "n̥": "ន", "tɬ": "ត្ល", "ɬ": "ល",
    "kʂ": "ក្រ", "ʂ": "ហ្រ", "ɟ̥̆": "យ", "c": "ច", "ç": "ឆ",
    "ɲ̥": "ញ", "xʲ": "ខ", "k": "ក", "x": "ហ", "ŋ̥": "ង",
    "ʘ": "ប", "ǀ": "ទ្ស", "ǁ": "គ្ល", "ǂ": "ជ", "ǃ": "ទ",
    "ʘ̃": "ម្ប", "ǀ̃": "ញ្ជ", "ǁ̃": "ង្ល", "ǂ̃": "ង្ជ", "ǃ̃": "ន្ទ",
    "i": "ី", "ɛ": "េ", "a": "ា", "ə": "ឺ", "ɪ̈": "ិ",
    "ɤ": "ុ", "ɑ": "៏", "ɛ̃": "េំ", "ɤ̃": "ុំ", "ɑ̃": "ំ",
    # ⟨ Special topic marker ( ⺓ piise ) — multi-syllable Ⓜ️ ⟩
    "pɪ̈sɛ": "ពឺសេ",
}

LINGVAJ_MAPOJ = {"eo": MAPO_EO, "en": MAPO_EN, "ja": MAPO_JA, "km": MAPO_KM}

# ⟪ Conversion engine ⚙️ ⟫

# ⟨ Japanese CV syllable combos for proper katakana 🈳 ⟩
# Each consonant + vowel pair maps to a single katakana character,
# rather than separate consonant + vowel characters ( e.g. ka → カ vs k + a → ク + ア ).
JA_KV_KOMBOJ = {
    # ⟨ Standard kana: consonant + IPA vowel → single kana 🈳 ⟩
    # k ( base ク ku )
    "ka": "カ", "ki": "キ", "kɛ": "ケ", "kɤ": "コ", "kɑ": "カー",
    # c ( base チ chi )
    "ca": "チャ", "ci": "チ", "cɛ": "チェ", "cɤ": "チョ",
    # t ( base ト to )
    "ta": "タ", "tɛ": "テ", "tɤ": "ト", "tɑ": "ター",
    # ɸ ( base フ fu )
    "ɸa": "ファ", "ɸɛ": "フェ", "ɸi": "フィ", "ɸɤ": "フォ",
    # x ( base ホ ho )
    "xa": "ハ", "xi": "ヒ", "xɛ": "ヘ", "xɤ": "ホ", "xɑ": "ハー",
    # ç ( base シ shi )
    "ça": "シャ", "çɛ": "シェ", "çi": "シ", "çɤ": "ショ",
    # m / m̥ ( base ム mu )
    "ma": "マ", "mi": "ミ", "mɛ": "メ", "mɤ": "モ", "mɑ": "マー",
    "m̥a": "マ", "m̥ɛ": "メ", "m̥ɤ": "モ",
    # s ( base ス su )
    "sa": "サ", "si": "シ", "sɛ": "セ", "sɤ": "ソ", "sɑ": "サー",
    # n / n̥ ( base ヌ nu )
    "na": "ナ", "ni": "ニ", "nɛ": "ネ", "nɤ": "ノ", "nɑ": "ナー",
    "n̥a": "ナ", "n̥ɛ": "ネ", "n̥ɤ": "ノ",
    # ɬ ( base ラ ra )
    "ɬa": "ラ", "ɬɛ": "レ", "ɬɤ": "ロ",
    # ɟ̥̆ ( base ユ yu )
    "ɟ̥̆a": "ヤ", "ɟ̥̆ɛ": "イェ", "ɟ̥̆ɤ": "ヨ", "ɟ̥̆ɑ": "ヤー",
    # ⱱ̥ ( base ワ wa )
    "ⱱ̥a": "ワ", "ⱱ̥ɛ": "ウェ", "ⱱ̥ɤ": "ウオ",
    # xʲ ( base ヒ hi )
    "xʲa": "ヒャ", "xʲɛ": "ヒェ", "xʲɤ": "ヒョ",
    # p ( base プ pu )
    "pa": "パ", "pɛ": "ペ", "pɤ": "ポ",
    # θ ( base ス su )
    "θa": "サ", "θɛ": "セ", "θi": "シ", "θɤ": "ソ",
    # kʂ ( base ク+シ )
    "kʂa": "クシャ", "kʂɛ": "クシェ", "kʂɤ": "クショ",
    # ts ( base ツ tsu )
    "tsa": "ツァ", "tsɛ": "ツェ", "tsi": "ツィ", "tsɤ": "ツオ",
    # ɾ̪̥ ( base ル ru )
    "ɾ̪̥a": "ラ", "ɾ̪̥ɛ": "レ", "ɾ̪̥ɤ": "ロ",
    # ɲ̥ ( base ニュ nyu )
    "ɲ̥a": "ニャ", "ɲ̥ɛ": "ニェ", "ɲ̥ɤ": "ニョ",
    # tɬ ( base ト+ル )
    "tɬa": "トラ", "tɬɛ": "トレ", "tɬɤ": "トロ",
}

# ⟨ Build Japanese-specific IPA token list ( CV combos + single phonemes ) 🈳 ⟩
_JA_IPA = sorted(
    set(list(ĈIUJ_IPA) + list(JA_KV_KOMBOJ.keys())),
    key=lambda x: (-len(x), x)
)

def ipa_al_lingvo(ipa_text, lang_code):
    """Transcribe IPA phonemes into the target language."""
    lang_map = dict(LINGVAJ_MAPOJ.get(lang_code, {}))
    # Merge CV syllable combos into the map for Japanese ( e.g. ka → カ not クア )
    if ( lang_code == "ja" ):
        lang_map.update(JA_KV_KOMBOJ)
        token_list = _JA_IPA
    else:
        token_list = ĈIUJ_IPA
    tokens = avide_kongruigi(ipa_text, token_list)
    out = []
    for t in tokens:
        out.append(lang_map.get(t, t))
    return "".join(out)

def la3os_al_ipa(la3os_text):
    """Convert La3os (with numerical shorthand) to IPA phoneme string."""
    expanded = vastigi_numeran(la3os_text)
    tokens = avide_kongruigi(expanded, ĈIUJ_LA3OS)
    # ⟨ Build lookup. La3os → IPA 🔍 ⟩
    lookup = {}
    for _, la3, ipa in KOMENCAĴ + INTERNAĴ:
        if la3 and ipa:
            lookup[la3] = ipa
    out = []
    for t in tokens:
        out.append(lookup.get(t, t))
    return "".join(out)

def listigi_mapojn(mapping_type=None):
    """Print all character mappings. Pass 'komencajxoj', 'internajxoj', or None (all)."""
    sources = []
    if mapping_type is None or mapping_type == "komencajxoj":
        sources.append(("KOMENCAĴ", KOMENCAĴ))
    if mapping_type is None or mapping_type == "internajxoj":
        sources.append(("INTERNAĴ", INTERNAĴ))

    print(f"{'Type':<10} {'Gawekiif':<16} {'La3os':<8} {'IPA':<12}")
    print("-" * 46)
    for ( label, data ) in sources:
        for ( gk, la3, ipa ) in data:
            print(f"{label:<10} {gk:<16} {la3:<8} {ipa:<12}")
    print()

    # ⟨ Also show language mapping coverage 📊 ⟩
    print("=" * 46)
    print("LANGUAGE MAP COVERAGE")
    print("=" * 46)
    all_ipa = sorted(set(ipa for _, _, ipa in KOMENCAĴ + INTERNAĴ if ipa))
    for ( lang_code, lang_map ) in LINGVAJ_MAPOJ.items():
        covered = sum(1 for ipa in all_ipa if ipa in lang_map)
        missing = [ipa for ipa in all_ipa if ipa not in lang_map]
        print(f"\n{lang_code}: {covered}/{len(all_ipa)} phonemes mapped")
        if missing:
            print(f"  Missing: {', '.join(missing)}")

def cli_ipa_al_lingvo():
    """CLI entry point for ipa_al_lingvo mode."""
    if len(sys.argv) < 4:
        print("Usage: python iikrhia_sound_rules.py ipa_al_lingvo <ipa_string> <language_code>")
        print("Languages: eo, en, ja, km")
        sys.exit(1)
    ipa_text = sys.argv[2]
    lang_code = sys.argv[3].lower()
    if lang_code not in LINGVAJ_MAPOJ:
        print(f"Unknown language '{lang_code}'. Choose from: {', '.join(LINGVAJ_MAPOJ.keys())}")
        sys.exit(1)
    result = ipa_al_lingvo(ipa_text, lang_code)
    print(result)

def cli_la3os_al_ipa():
    """CLI entry point for la3os_al_ipa mode."""
    if len(sys.argv) < 3:
        print("Usage: python iikrhia_sound_rules.py la3os_al_ipa <la3os_string>")
        sys.exit(1)
    la3os_text = sys.argv[2]
    result = la3os_al_ipa(la3os_text)
    print(result)

def cli_listigi():
    """CLI entry point for listigi mode."""
    kind = sys.argv[2] if len(sys.argv) > 2 else None
    if kind and kind not in ("komencajxoj", "internajxoj", "all"):
        print("Usage: python iikrhia_sound_rules.py listigi [komencajxoj|internajxoj|all]")
        sys.exit(1)
    listigi_mapojn(kind if kind != "all" else None)

def demonstracio():
    """Show a demo of all language transcriptions for every building name."""
    building_names = {
        "bldg0":  "ⱱɛtɤ",
        "bldg11": "çaŋ",
        "bldg15": "ɬamɪ̈θ",
        "bldg22": "catsɛɟ̆ɪ̈ŋ",
    }
    print(f"{'Name':<8} {'IPA':<16} {'eo':<12} {'en':<12} {'ja':<12} {'km':<12}")
    print("-" * 72)
    for ( name, ipa ) in building_names.items():
        eo = ipa_al_lingvo(ipa, "eo")
        en = ipa_al_lingvo(ipa, "en")
        ja = ipa_al_lingvo(ipa, "ja")
        km = ipa_al_lingvo(ipa, "km")
        print(f"{name:<8} {ipa:<16} {eo:<12} {en:<12} {ja:<12} {km:<12}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(0)

    mode = sys.argv[1].lower()

    if mode == "ipa_al_lingvo":
        cli_ipa_al_lingvo()
    elif mode == "la3os_al_ipa":
        cli_la3os_al_ipa()
    elif mode == "listigi":
        cli_listigi()
    elif mode == "demo":
        demonstracio()
    else:
        print(f"Unknown mode '{mode}'")
        print(__doc__)
        sys.exit(1)

# ⟨ end of iikrhia_sound_rules.py 🏁 ⟩
