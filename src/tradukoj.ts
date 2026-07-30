// tradukoj.ts — Translation system for Aranis
// Four languages: aih, eo, en, ja

const skakefani: Record<string, Record<string, string>> = {
  aih: {
    // Adjectives go BEFORE the noun for descriptions ( Iikrhia grammar rule ).
    // For proper / place names, use POSTPOSITIVE compounding ( noun + adjective )
    // to signal a fused compound name rather than a mere description.
    "p1": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞ · j͐ʃɜ ɭʃᴜ ꞁȷ̀ɹ ֭ſɭɹɔ˞",
    "p2": "j͐ʃɜ ɭʃᴜ ꞁȷ̀ɹ ֭ſɭɹɔ˞ · ſɭᴜ ɭl̀ɹ ɭʃɔ j͑ʃɔ j͐ʃᴜ ŋᷠɹⰱ",
    "p3": "ſɭc̗ᴜ ʃэ ɭʃɔȝ · ſןɔ ſ͕ɭᴜ ſɭɔ ʃэ ɭʃɔȝ · ſɭᴜ ɭʃᴜ ʃэ ɭʃɔȝ · ſןw · E ʃэ ſɭw ſ̀ȷᴜ ſɭэ j͑ʃɹ ſɭᴜ ɭl̀ɹ",
    "p4": "ſɭw ſ̀ȷᴜ",
    "p5": "ſɭᴜ ɭʃᴜ",
    "p6": "֭ſɭɹ j͑ʃɔ ſɭc̗ᴜ ʃэ ɭʃɔȝ",
    "p7": "ſ̀ȷᴜȝ",
    "p8": "}ʃɔƣ̋ ꞁȷ̀ᴜ ſ̀ȷɔ",
    "p9": "ſɭᴜ ɭʃᴜ j͑ʃɔ ſɭᴜ ſᶘɹ }ʃᴜ j͐ʃɜ ɭʃᴜ ꞁȷ̀ɹ ֭ſɭɹɔ˞",
    "pA": "ſɭᴜ ɭʃᴜ j͑ʃɔ ſɭᴜ ſᶘɹ }ʃᴜ ſɭэ ſɭᴜ ſɭэ ƣ̋ꞇ ſɭэ ſɟᴜ",
    "pB": "ſ̀ȷᴜȝ ſɭw ſ̀ȷᴜ",
    "pC": "ſȷɔ ſɭ,ꞇ",
    "pD": "ı],ͷ̗ɔʞ ſɭᴜ ſ͕ɭᴜ ſɭɔ",
    "pE": "ſɭ,ɹ ſ̀ȷɔ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃɔ ꞁȷ̀ɹ ʃᴜ · ŋᷠᴜ j͑ʃɜȝ ɭʃɔ ꞁȷ̀ɹ j͑ʃᴜ · ſɭɔ˞ᴜ ſ͔ɭɔ ſɭɔ ŋᷠᴜ j͑ʃɔ",
    "pF": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞",
    "pG": "j͐ʃɜ ɭʃᴜ ſɭɔƽ",
    "pH": "ſɭᴜ ſ͕ɭᴜ ſɭɔ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ",
    "pI": "j͑ʃ'ᴜ ſɭᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſ͔ɭɔȝ",
    "pJ": "ŋᷠᴜ ſɭэj͑ʃ'ᴜ ſɭᴜ j͐ʃᴜ ſɭэ ƣ̋ꞇ ſɭэ ſɟᴜ",
    "pK": "j͐ʃᴜȝ",
    "pL": "֭ſɭɹ j͑ʃɔ · ſɭc̗ᴜ ʃэ ɭʃɔȝ · ſןɔ ʃэ ɭʃɔȝ",
    "pM": "ſɭᴜ ɭʃᴜ · WASD · Shift ſɭᴜ ſɭʞᴜȝ · Spaco ſןw",
    "pN": "WASD · ſɭᴜ ſɭʞᴜȝ ſɭc̭ᴜ ſɭc̗w",
    "pO": "E · ſɭw ſ̀ȷᴜ/j͑ʃwc̗ · ſɭw ſ̀ȷᴜ ſɭэ ſɭᴜ ſɭw ʃᴜ",
    "pP": "M · ſɟᴜ ſᶘɹ }ʃᴜ j͑ʃᴜ ſɭᴜ ſɭw ʃᴜ ſɭэ",
    "pQ": "Escape · j͑ʃwc̗",
    "pR": "ſןɔ ſ͕ɭᴜ ſɭɔ ʃэ ſɭɔ˞ᴜ ſɭᴜ ꞁȷ̀ɹ ʃᴜ · ſɭw ſ̀ȷᴜ",
    "pS": "ſ̀ȷᴜȝ · ſ̀ȷᴜȝ ſɭw ſ̀ȷᴜ",
    "pT": "ſɭэ ֭ſɭэ j͑ʃɔ j͐ʃɜ ɭʃᴜ",
    "pU": "ſȷɔ ſɭ,ꞇ ſɭэ ſɭᴜ ſɭɔ ʃэ j͐ʃɜ ɭʃᴜ",
    "pV": "E · j͑ʃwc̗ · Esc",
    "pW": "E · j͑ʃwc̗ j͑ʃɹ ſɭᴜ ɭl̀ɹ",
    "pX": "j͑ʃɹ ſɭᴜ ɭl̀ɹ ſɭw ſ̀ȷᴜ · WASD ſɭʞɔƴ",
    "pY": "j͑ʃwc̗",
    "pZ": "ſɭw ſ̀ȷᴜ j͑ʃɹ ſɭᴜ ɭl̀ɹ",
    // Building card labels from zigurato-konstruilo.ts TIPARO
    "tipDomo": "ſɭᴜ ſɭw ʃᴜ ſɭᴜ ſɭw ſɭэ",
    "tipMangxejo": "ſɭᴜ ſ͔ɭɔȝ ſɟᴜ ŋᷠᴜ",
    "tipStacio": "ſɭᴜ ſɭw ʃᴜ ſɭᴜ ſɭʞᴜȝ",
    "tipTuro": "ſɭᴜ ſɭʞᴜȝ ſɭᴜ ſɭw ʃᴜ",
    "tipSanktejo": "ſɭᴜ ſɭw ʃᴜ ſɭᴜ ꞁȷ̀ᴜȝ",
    // Building card flavor text
    "flvDomo": "ſɭᴜ ɭl̀ɹ ɭʃɔ ꞁȷ̀ɹ j͑ʃᴜ ſɭᴜ ſȷɔ ſɭɔ ꞁȷ̀ɹ ſɭᴜ ſɭw ʃᴜ ſɭэ ſɭ͔ɭᴜƽ j͑ʃ'ᴜ ſɭᴜ ſᶘɔ ɭl̀ɹȝ",
    "flvMangxejo": "ſɟᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſ͔ɭɔȝ · ſɟᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſɭw ʃᴜ ŋᷠᴜ ſɭɔƽ ſɭэ ſɟᴜ ſᶘɔ ɭl̀ɹȝ · ſɭɔ˞ᴜ ꞁȷ̀ɹ ſɭэ ſɭᴜ ſɭˬꞇᴜ",
    "flvStacio": "ſɭᴜ ſɭʞᴜȝ ſɭᴜ ɭl̀ɹ ɭʃɔ ſɭᴜ ſɭэ ſᶘɹ j͑ʃᴜꞇ · ſɭэ ſɭᴜ ſɭэ ƣ̋ꞇ ſɭэ j͐ʃɜ ɭʃᴜ ꞁȷ̀ɹ ֭ſɭɹɔ˞",
    "flvTuro": "ſɭᴜ ſɭʞᴜȝ ſɭᴜ ſɭʞɹ ſɟᴜ ſɭᴜ ſ͕ɭᴜ ſɭɔ ſɭэ ſɭᴜ ɭl̀ɹ ɭʃɔ ſɭэ",
    "flvSanktejo": "ſɭᴜ ꞁȷ̀ᴜȝ ſɭᴜ ſ͕ɭᴜ ſɭɔ ſɭᴜ ʃэ ſɭɔ ſɭэ ſᶘɹ ſɭᴜ ſɭʞᴜȝ",
    // Card stats labels from sperto.ts
    "statTieroj": "ſɭᴜ ſ͕ɭᴜ ſɭɔ ſɭᴜ ſɭɔ˞ᴜ",
    "statDiamanto": "ſɯʃ ſɭᴜ ſɭэ",
    "statJes": "j͑ʃᴜ ſɭᴜ",
    "statNe": "ſɭɜ ſɭᴜ j͐ʃᴜ",
    "statTipo": "ſɭᴜ ſɭw ʃᴜ ſɭᴜ ſɭɔ˞ᴜ",
    "statPozicio": "ſɭᴜ ſɭꞇ ſɭᴜ ı],ɹ",
    // WebGL error from scena.ts
    "webglTitolo": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞",
    "webglMesagxo": "ſɟᴜ ſᶘɔ ɭl̀ɹȝ ſɭɜ ſɭw ſ̀ȷᴜ WebGL. ſɭᴜ ſᶘɔ ɭl̀ɹȝ ſɭɜ ſɭᴜ ſɭw ʃᴜ WebGL ʃэ ſɭɔ˞ᴜ ſɭᴜ ꞁȷ̀ɹ ʃᴜ ſɭᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſɭэ ƣ̋ꞇ",
    "webglDetalo": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞ ſɭᴜ ſᶘɔ ɭl̀ɹȝ WebGL ʃэ ſɭᴜ ſɭw ʃᴜ ſɭᴜ ſɭэ ƣ̋ꞇ. ſɟᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſᶘɔ ɭl̀ɹȝ ſɟᴜ ſɭᴜ ŋᷠᴜ GPU",
    "webglReprovi": "ſɭᴜ ɭʃᴜ ſɭэ",
    // aria labels from experience.html
    "ariaButPromeni": "ſɭᴜ ɭʃᴜ ſɭc̭ᴜ ſɭc̗w ſɭᴜ ſɭэ ƣ̋ꞇ",
    "ariaButOrbiti": "֭ſɭɹ j͑ʃɔ ſɭc̗ᴜ ʃэ ɭʃɔȝ ſɭc̭ᴜ ſɭc̗w",
    "ariaButVesti": "ſ̀ȷᴜȝ ſɭw ſ̀ȷᴜ",
    "ariaButHelpi": "ſȷɔ ſɭ,ꞇ",
    "ariaButLingvo": "ſɟᴜ ſᶘɹ }ʃᴜ j͑ʃᴜ ſɭᴜ ſɭɔʞ ſɭᴜ ſɭɹ ſןɹ",
    "ariaSupermetaFermi": "}ʃɔƣ̋ ꞁȷ̀ᴜ ſ̀ȷɔ",
    // Canvas alt text
    "altTitolaSkripto": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞ ſɭᴜ ſ͕ɭᴜ ſɭɔ ſɭᴜ ſɭɔʞ",
    // Vesta nomoj ( custom names )
    "vestoVerdant": "ꞁȷ̀ɹ ŋᷠᴜ j͑ʃɔ ſɭᴜ ſɭw ʃᴜ",
    "vestoHearth": "ſɟᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſɭw ʃᴜ",
    "vestoMist": "ꞁȷ̀ɹ ֭ſɭɹɔ˞ ſɭᴜ ſɭw ʃᴜ",
    "vestoEmber": "ſɭᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſɭw ʃᴜ",
    // Building names from real Iikrhia dictionary words ( Gawekiif )
    "bldg0": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ꞇ ŋᷠᴜ }ʃɹ",
    "bldg1": "ſɭᴜ ſןɹ",
    "bldg2": "ſɭᴜ ᶅſw ſɭɹ",
    "bldg3": "ſɭэᴜ̩ ſןɹ",
    "bldg4": "ſɭɔⰱ",
    "bldg5": "ſɟɹƽ ꞁȷ̀ᴜ }ʃw",
    "bldg6": "ɭʃэ ſɭɔȝ",
    "bldg7": "ſɟꞇȝ",
    "bldg8": "ſɭᴜ ſɟɔ",
    "bldg9": "ſȷɹ ŋᷠɹ",
    "bldg10": "֭ſɭɹɔ˞",
    "bldg11": "ı],ᴜȝ",
    "bldg12": "ŋᷠᴜ ֭ſɭᴜ",
    "bldg13": "ſᶘꞇ ɭl̀ɔ",
    "bldg14": "ɭl̀ᴜ ſ͕ɭɜ",
    "bldg15": "j͐ʃᴜ ŋᷠɹⰱ",
    "bldg16": "j͑ʃɹ ı],w",
    "bldg17": "ſɭэ j͑ʃꞇ",
    "bldg18": "j͑ʃɜ ſᶘɹ",
    "bldg19": "ſɭɔ }ʃɔ ı],ɜ",
    "bldg20": "ſɭɹⰱ",
    "bldg21": "ſ͔ɭɹ ɭʃɔ",
    "bldg22": "ſɟᴜ ſᶘɔ ɭl̀ɹȝ",
    "bldg23": "ſȷwɔ˞",
    "bldg24": "ſɟᴜ j͑ʃɜȝ ɭʃɔ",
    "bldg25": "ŋᷠɔ ſ̀ȷɔʞ",
    "bldg26": "ᶅſɜ ſ͔ɭɜͷ̗",
    "bldg27": "ſɭɔ j͐ʃc̭ᴜ",
    "bldg28": "}ʃɜ ſɭƣ̋ɜƴ",
    "bldg29": "ɭ(ɜ ŋᷠɜ ı],ᴜ",
    "bldg30": "ɭ(ɜ ŋᷠɜ ſȷɔ",
  },
  eo: {
    // Proper Esperanto translations for all UI strings
    // IPA-based approximations for custom names
    "p1": "ARANIS · Ĥota-Ihis",
    "p2": "Ĥota-Ihis · Kajite-Selamjov",
    "p3": "Trenu por rigardi · Alklaku spajron por notoj · Piediru por esplori · Aŭ · E por eniri kanuon",
    "p4": "Eniri",
    "p5": "PROMENI",
    "p6": "ORBITO",
    "p7": "VESTO",
    "p8": "Fermi",
    "p9": "Piedi tra la nebula valo",
    "pA": "Drivi tra la urba nebulo",
    "pB": "Malfermi vestaron",
    "pC": "Helpo",
    "pD": "LA TEKSILO",
    "pE": "Longaj ĉemizoj · mallongaj manikoj · ĉefa kaj akcenta",
    "pF": "ARANIS",
    "pG": "Konstruante...",
    "pH": "La zigurato leviĝas",
    "pI": "Lignaj traboj krakas",
    "pJ": "Nebulo fluas tra la valo",
    "pK": "N",
    "pL": "Orbito · trenu por rigardi · alklaku por notoj",
    "pM": "Promeni · WASD moviĝi · Shift por kuri · Spaco por salti",
    "pN": "WASD moviĝi · rapida piedo",
    "pO": "E por eniri/eliri · eniri konstruaĵon",
    "pP": "M por mapo",
    "pQ": "Escape por eliri",
    "pR": "Alklaku spajrojn por legi notojn · eniri",
    "pS": "VESTO · ŝanĝi vian veston",
    "pT": "VOJOJ DE LA VALO",
    "pU": "Helpaj notoj pri la urbo",
    "pV": "E por eliri · Esc",
    "pW": "E por eliri kanuon",
    "pX": "Kanua regado · WASD direkti",
    "pY": "Eliri",
    "pZ": "Eniri kanuon",
    // Building card labels
    "tipDomo": "Loĝejo",
    "tipMangxejo": "Komuna Tablo",
    "tipStacio": "Stacio",
    "tipTuro": "Turo",
    "tipSanktejo": "Sanktejo",
    // Building flavor text
    "flvDomo": "Kvietaj ĉambroj stakitaj al la nebulo.",
    "flvMangxejo": "Longaj fajrujoj, komunaj bovloj, vaporo kaj rakonto.",
    "flvStacio": "Veturiloj alvenas kaj foriras. La valo larĝiĝas.",
    "flvTuro": "Ŝtupoj tordiĝas supren en lumon.",
    "flvSanktejo": "Oraj teksaĵoj flirtas en la vento.",
    // Card stats
    "statTieroj": "Niveloj",
    "statDiamanto": "Diamanto",
    "statJes": "Jes",
    "statNe": "Ne",
    "statTipo": "Tipo",
    "statPozicio": "Pozicio",
    // WebGL error
    "webglTitolo": "ARANIS",
    "webglMesagxo": "Via retumilo ne subtenas WebGL. Ĝisdatigu vian retumilon por sperti la plenan sperton.",
    "webglDetalo": "Aranis postulas WebGL por funkcii. Ĝisdatigu vian retumilon aŭ kontrolu viajn GPU-agordojn.",
    "webglReprovi": "Reprovi",
    // Aria labels
    "ariaButPromeni": "Promeni tra la nebula valo",
    "ariaButOrbiti": "Orbiti ĉirkaŭ la urbo",
    "ariaButVesti": "Malfermi vestaron",
    "ariaButHelpi": "Helpo",
    "ariaButLingvo": "Ŝanĝi la lingvon de la urbo",
    "ariaSupermetaFermi": "Fermi",
    // Canvas alt text
    "altTitolaSkripto": "Aranis skribita en la zigurata skribo",
    // Clothing names
    "vestoVerdant": "Verdanta Korto — Ĉihes Verdo",
    "vestoHearth": "Fajruja Gardanto — Ĥeles Verda",
    "vestoMist": "Nebula Palto — Ihis Verda",
    "vestoEmber": "Brusta Gardanto — Ĥeles Bruna",
    // Building names ( systematic IPA-based transcription using new py script values:
    //  ⱱ→v c→ĉ ɸ→f x→ĥ ç→ŝ xʲ→ĥj ɬ→l ɟ̆→j θ→t ŋ→nk ɪ̈→i ɑ→a ə→u ɤ→o )
    "bldg0": "Arimani",
    "bldg1": "Kapi",
    "bldg2": "Kavuki",
    "bldg3": "Kaĥpi",
    "bldg4": "Ket",
    "bldg5": "Ĉikanu",
    "bldg6": "Takenk",
    "bldg7": "Ĉink",
    "bldg8": "Kaĉe",
    "bldg9": "Fimi",
    "bldg10": "Ĥis",
    "bldg11": "Ŝank",
    "bldg12": "Maĥa",
    "bldg13": "Cije",
    "bldg14": "Janko",
    "bldg15": "Lamit",
    "bldg16": "Siŝu",
    "bldg17": "Kasi",
    "bldg18": "Soci",
    "bldg19": "Keneŝo",
    "bldg20": "Kit",
    "bldg21": "Ĥjite",
    "bldg22": "Ĉacejink",
    "bldg23": "Fus",
    "bldg24": "Ĉasonkte",
    "bldg25": "Metĥef",
    "bldg26": "Voĥjol",
    "bldg27": "Kelma",
    "bldg28": "Nokroĝ",
    "bldg29": "Somoŝa",
    "bldg30": "Somofe",
  },
  en: {
    // Proper English translations for all UI strings
    // Phonetic transcriptions ( of aih ) used only for custom names ( vesto * )
    "p1": "ARANIS · Lhota-Ihis",
    "p2": "Lhota-Ihis · Kajiite-Selamyov",
    "p3": "Drag to look · Click a spire for notes · Walk to explore · or · E to canoe",
    "p4": "Enter",
    "p5": "WALK",
    "p6": "ORBIT",
    "p7": "WARDROBE",
    "p8": "Close",
    "p9": "Walk through the misty vale",
    "pA": "Drift through the city mist",
    "pB": "Open wardrobe",
    "pC": "Help",
    "pD": "THE LOOM",
    "pE": "Long shirts · short sleeves · main and accent",
    "pF": "ARANIS",
    "pG": "Building...",
    "pH": "The ziggurat rises",
    "pI": "Wooden beams creak",
    "pJ": "Mist flows through the vale",
    "pK": "N",
    "pL": "Orbit · drag to look · click for notes",
    "pM": "Walk · WASD to move · Shift to run · Space to jump",
    "pN": "WASD to move · brisk walk",
    "pO": "E to enter/exit · enter building",
    "pP": "M for map",
    "pQ": "Escape to exit",
    "pR": "Click spires to read notes · enter",
    "pS": "WARDROBE · change your outfit",
    "pT": "PATHS OF THE VALE",
    "pU": "Helpful notes about the city",
    "pV": "E to exit · Esc",
    "pW": "E to exit canoe",
    "pX": "Canoe controls · WASD to steer",
    "pY": "Exit",
    "pZ": "Enter canoe",
    // Building card labels
    "tipDomo": "Lodge",
    "tipMangxejo": "Common Table",
    "tipStacio": "Station",
    "tipTuro": "Tower",
    "tipSanktejo": "Sanctuary",
    // Building flavor text
    "flvDomo": "Quiet rooms stacked into the mist.",
    "flvMangxejo": "Long hearths, common bowls, steam and story.",
    "flvStacio": "Vehicles come and go. The vale widens.",
    "flvTuro": "Stairs twist upward into light.",
    "flvSanktejo": "Golden fabrics flutter in the wind.",
    // Card stats
    "statTieroj": "Tiers",
    "statDiamanto": "Diamond",
    "statJes": "Yes",
    "statNe": "No",
    "statTipo": "Type",
    "statPozicio": "Position",
    // WebGL error
    "webglTitolo": "ARANIS",
    "webglMesagxo": "Your browser does not support WebGL. Update your browser for the full experience.",
    "webglDetalo": "Aranis requires WebGL to run. Please update your browser or check your GPU settings.",
    "webglReprovi": "Retry",
    // Aria labels
    "ariaButPromeni": "Walk through the misty vale",
    "ariaButOrbiti": "Orbit around the city",
    "ariaButVesti": "Open wardrobe",
    "ariaButHelpi": "Help",
    "ariaButLingvo": "Change the city language",
    "ariaSupermetaFermi": "Close",
    // Canvas alt text
    "altTitolaSkripto": "Aranis written in the ziggurat script",
    // Clothing names
    "vestoVerdant": "Ihis Verdan — Verdant Court",
    "vestoHearth": "Kheles Verdan — Hearthguard",
    "vestoMist": "Ihis Verdan — Mistcloak",
    "vestoEmber": "Kheles Brunan — Emberguard",
    // Building names ( systematic IPA-based transcription using new py script values:
    //  ⱱ→w c→ch ɸ→h x→kh ç→sh xʲ→hy ɬ→lh ɟ̆→y θ→th ŋ→ng ɪ̈→ih ɑ→aw ə→uh ɤ→o )
    "bldg0": "Arimanih",
    "bldg1": "Kapih",
    "bldg2": "Kawuhkih",
    "bldg3": "Kawkhpih",
    "bldg4": "Keth",
    "bldg5": "Chihkanuh",
    "bldg6": "Tawkeng",
    "bldg7": "Ching",
    "bldg8": "Kache",
    "bldg9": "Hihmih",
    "bldg10": "Khihs",
    "bldg11": "Shang",
    "bldg12": "Makha",
    "bldg13": "Tsiye",
    "bldg14": "Yango",
    "bldg15": "Lhamihth",
    "bldg16": "Sihshuh",
    "bldg17": "Kawsi",
    "bldg18": "Sotsih",
    "bldg19": "Kenesho",
    "bldg20": "Kihth",
    "bldg21": "Hyihte",
    "bldg22": "Chatseyihng",
    "bldg23": "Huhs",
    "bldg24": "Chasongte",
    "bldg25": "Metleh",
    "bldg26": "Wohyolh",
    "bldg27": "Kelhma",
    "bldg28": "Nokrorh",
    "bldg29": "Somesha",
    "bldg30": "Somohe",
  },
  ja: {
    // Proper Japanese translations for all UI strings
    // Phonetic transcriptions ( of aih ) used only for custom names ( vesto * )
    "p1": "アラニス · ロタ・イーヒス",
    "p2": "ロタ・イーヒス · カジーテ・セラーミョヴ",
    "p3": "ドラッグして見る · 尖塔をクリックでノート · 歩いて探索 · または · Eでカヌー",
    "p4": "入る",
    "p5": "歩く",
    "p6": "周回",
    "p7": "ワードローブ",
    "p8": "閉じる",
    "p9": "霧の谷を歩く",
    "pA": "都市の霧を漂う",
    "pB": "ワードローブを開く",
    "pC": "ヘルプ",
    "pD": "ザ・ルーム",
    "pE": "長いシャツ · 短い袖 · メインとアクセント",
    "pF": "アラニス",
    "pG": "建造中...",
    "pH": "ジッグラトが昇る",
    "pI": "木の梁が軋む",
    "pJ": "霧が谷に流れる",
    "pK": "北",
    "pL": "周回 · ドラッグして見る · クリックでノート",
    "pM": "歩く · WASDで移動 · Shiftで走る · Spaceでジャンプ",
    "pN": "WASDで移動 · 早足",
    "pO": "Eで出入り · 建物に入る",
    "pP": "Mでマップ",
    "pQ": "Escapeで出る",
    "pR": "尖塔をクリックでノート · 入る",
    "pS": "ワードローブ · 服を変える",
    "pT": "谷の小道",
    "pU": "街のヘルプノート",
    "pV": "Eで出る · Esc",
    "pW": "Eでカヌーを出る",
    "pX": "カヌー操作 · WASDで操縦",
    "pY": "出る",
    "pZ": "カヌーに乗る",
    // Building card labels
    "tipDomo": "ロッジ",
    "tipMangxejo": "共有の食卓",
    "tipStacio": "駅",
    "tipTuro": "塔",
    "tipSanktejo": "聖域",
    // Building flavor text
    "flvDomo": "霧の中に積み重なった静かな部屋。",
    "flvMangxejo": "長い暖炉、共通の鉢、蒸気と物語。",
    "flvStacio": "乗り物が行き交う。谷が広がる。",
    "flvTuro": "階段が光の中へとねじれて昇る。",
    "flvSanktejo": "金色の織物が風に揺れる。",
    // Card stats
    "statTieroj": "階層",
    "statDiamanto": "ダイヤ",
    "statJes": "有",
    "statNe": "無",
    "statTipo": "種類",
    "statPozicio": "位置",
    // WebGL error
    "webglTitolo": "アラニス",
    "webglMesagxo": "お使いのブラウザはWebGLをサポートしていません。ブラウザを更新してください。",
    "webglDetalo": "アラニスはWebGLが必要です。ブラウザを更新するか、GPU設定を確認してください。",
    "webglReprovi": "再試行",
    // Aria labels
    "ariaButPromeni": "霧の谷を歩く",
    "ariaButOrbiti": "街の周りを周回",
    "ariaButVesti": "ワードローブを開く",
    "ariaButHelpi": "ヘルプ",
    "ariaButLingvo": "言語を変更",
    "ariaSupermetaFermi": "閉じる",
    // Canvas alt text
    "altTitolaSkripto": "Aranisのジッグラト文字",
    // Clothing names
    "vestoVerdant": "イヒス ヴェルダン — ヴェルダンコート",
    "vestoHearth": "ケレス ヴェルダン — ハースガード",
    "vestoMist": "イヒス ヴェルダン — ミストクローク",
    "vestoEmber": "ケレス ブルナン — エンバーガード",
    // Building names ( IPA→katakana using proper CV syllable combos:
    //  ka→カ ki→キ kɛ→ケ kɤ→コ kɑ→カー ca→チャ ci→チ cɛ→チェ
    //  ta→タ tɛ→テ tɑ→ター m̥a→マ m̥ɛ→メ sa→サ si→シ sɛ→セ
    //  na→ナ nɛ→ネ n̥a→ナ ɬa→ラ ɟ̥̆a→ヤ ɟ̥̆ɛ→イェ ⱱ̥a→ワ  xʲa→ヒャ
    //  pa→パ pɛ→ペ ɸa→ファ θɛ→セ kʂa→クシャ tsa→ツァ tɛ→テ
    //  Remaining IPA tokens mapped individually per MAPO_JA. )
    "bldg0": "アルイマヌンウ",
    "bldg1": "カプウ",
    "bldg2": "カワアクウ",
    "bldg3": "カーホプウ",
    "bldg4": "ケス",
    "bldg5": "チウカヌンア",
    "bldg6": "ターケン",
    "bldg7": "チン",
    "bldg8": "カチェ",
    "bldg9": "フウムウ",
    "bldg10": "ホウス",
    "bldg11": "シャン",
    "bldg12": "マハ",
    "bldg13": "ツィユエ",
    "bldg14": "ヤーンコ",
    "bldg15": "ラムウス",
    "bldg16": "スウシャ",
    "bldg17": "カースウ",
    "bldg18": "ソチウ",
    "bldg19": "ケネショ",
    "bldg20": "クウス",
    "bldg21": "ヒウテ",
    "bldg22": "チャツェユウン",
    "bldg23": "フアス",
    "bldg24": "チャソンテ",
    "bldg25": "メトレフ",
    "bldg26": "ウオヒョラ",
    "bldg27": "ケレマ",
    "bldg28": "ノクショシ",
    "bldg29": "スオモシャ",
    "bldg30": "スオモフェ",
  },
  km: {
    // Khmer (Cambodian) translations for all UI strings
    // Phonetic approximations in Khmer script for custom names
    "p1": "អរ៉ានីស · ឡូតា-អ៊ីហ៊ីស",
    "p2": "ឡូតា-អ៊ីហ៊ីស · កាជីតេ-សេឡាមយ៉ូវ",
    "p3": "អូសដើម្បីមើល · ចុចប៉មសម្រាប់កំណត់ត្រា · ដើរដើម្បីរុករក · ឬ · E សម្រាប់ទូក",
    "p4": "ចូល",
    "p5": "ដើរ",
    "p6": "ទស្សនា",
    "p7": "សម្លៀកបំពាក់",
    "p8": "បិទ",
    "p9": "ដើរកាត់ជ្រលងអ័ព្ទ",
    "pA": "អណ្តែតកាត់អ័ព្ទទីក្រុង",
    "pB": "បើកសម្លៀកបំពាក់",
    "pC": "ជំនួយ",
    "pD": "តម្បាញ",
    "pE": "អាវវែង · ដៃខ្លី · ពណ៌ចម្បង និង ពណ៌បន្ទាប់",
    "pF": "អរ៉ានីស",
    "pG": "កំពុងសាងសង់...",
    "pH": "ហ្សីហ្គូរ៉ាត់កំពុងឡើង",
    "pI": "ធ្នឹមឈើកំពុងគ្រាំ",
    "pJ": "អ័ព្ទហូរកាត់ជ្រលង",
    "pK": "ជ",
    "pL": "ទស្សនា · អូសដើម្បីមើល · ចុចសម្រាប់កំណត់ត្រា",
    "pM": "ដើរ · WASD ដើម្បីផ្លាស់ទី · Shift ដើម្បីរត់ · Space ដើម្បីលោត",
    "pN": "WASD ដើម្បីផ្លាស់ទី · ដើរលឿន",
    "pO": "E ដើម្បីចូល/ចេញ · ចូលអាគារ",
    "pP": "M សម្រាប់ផែនទី",
    "pQ": "Escape ដើម្បីចេញ",
    "pR": "ចុចប៉មដើម្បីអានកំណត់ត្រា · ចូល",
    "pS": "សម្លៀកបំពាក់ · ប្តូរសំលៀកបំពាក់របស់អ្នក",
    "pT": "ផ្លូវនៃជ្រលង",
    "pU": "កំណត់ត្រាជំនួយអំពីទីក្រុង",
    "pV": "E ដើម្បីចេញ · Esc",
    "pW": "E ដើម្បីចេញពីទូក",
    "pX": "ការគ្រប់គ្រងទូក · WASD ដើម្បីបង្វែរ",
    "pY": "ចេញ",
    "pZ": "ចូលទូក",
    // Building card labels
    "tipDomo": "ផ្ទះសំណាក់",
    "tipMangxejo": "តុសាមញ្ញ",
    "tipStacio": "ស្ថានីយ",
    "tipTuro": "ប៉ម",
    "tipSanktejo": "ទីសក្ការៈ",
    // Building flavor text
    "flvDomo": "បន្ទប់ស្ងាត់ៗដាក់តម្រៀបក្នុងអ័ព្ទ។",
    "flvMangxejo": "ចើងរកាភ្លើងវែង ចានសាមញ្ញ ចំហាយនិងរឿងរ៉ាវ។",
    "flvStacio": "យានជំនិះមកនិងទៅ។ ជ្រលងរីកធំ។",
    "flvTuro": "ជណ្តើរបង្វិលឡើងទៅក្នុងពន្លឺ។",
    "flvSanktejo": "ក្រណាត់មាសបក់បោកតាមខ្យល់។",
    // Card stats
    "statTieroj": "ជាន់",
    "statDiamanto": "ពេជ្រ",
    "statJes": "បាទ",
    "statNe": "ទេ",
    "statTipo": "ប្រភេទ",
    "statPozicio": "ទីតាំង",
    // WebGL error
    "webglTitolo": "អរ៉ានីស",
    "webglMesagxo": "កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រ WebGL ទេ។ សូមធ្វើបច្ចុប្បន្នភាពកម្មវិធីរុករករបស់អ្នកសម្រាប់បទពិសោធន៍ពេញលេញ។",
    "webglDetalo": "Aranis ត្រូវការ WebGL ដើម្បីដំណើរការ។ សូមធ្វើបច្ចុប្បន្នភាពកម្មវិធីរុករករបស់អ្នក ឬពិនិត្យការកំណត់ GPU របស់អ្នក។",
    "webglReprovi": "ព្យាយាមម្តងទៀត",
    // Aria labels
    "ariaButPromeni": "ដើរកាត់ជ្រលងអ័ព្ទ",
    "ariaButOrbiti": "ទស្សនាជុំវិញទីក្រុង",
    "ariaButVesti": "បើកសម្លៀកបំពាក់",
    "ariaButHelpi": "ជំនួយ",
    "ariaButLingvo": "ប្តូរភាសាទីក្រុង",
    "ariaSupermetaFermi": "បិទ",
    // Canvas alt text
    "altTitolaSkripto": "អរ៉ានីសសរសេរជាអក្សរហ្សីហ្គូរ៉ាត់",
    // Clothing names ( phonetic approximations in Khmer script )
    "vestoVerdant": "អ៊ីហ៊ីស វែរដាន់ · វែរដាន់កូត",
    "vestoHearth": "ខេឡេស វែរដាន់ · ហាតហ្គាដ",
    "vestoMist": "អ៊ីហ៊ីស វែរដាន់ · មីសខ្លូក",
    "vestoEmber": "ខេឡេស ប្រូណាន់ · អេមបឺហ្គាដ",
    // Building names ( IPA→Khmer using new py script KM_MAP values verbatim:
    //  a→ា ɑ→៏ c→ច ç→ឆ ɛ→េ ə→ឺ ɤ→ុ i→ី ɪ̈→ិ k→ក 
    //  ɬ→ល m→ម m̥→ម n→ន n̥→ន ŋ̥→ង p→ព ɾ̪̥→រ s→ស ʂ→ហ្រ
    //  t→ត θ→ថ tɬ→ត្ល ts→ត្ស x→ហ xʲ→ខ ⱱ̥→វ ɟ̥̆→យ ɸ→ផ
    //  (Initial vowels prefixed with អ per Khmer orthography)
    "bldg0": "អារីមានិ",
    "bldg1": "កាពិ",
    "bldg2": "កាវឺកិ",
    "bldg3": "ក៏ហពិ",
    "bldg4": "កេថ",
    "bldg5": "ចិកានឺ",
    "bldg6": "ត៏កេង",
    "bldg7": "ចីង",
    "bldg8": "កាចេ",
    "bldg9": "ផិមិ",
    "bldg10": "ហិស",
    "bldg11": "ឆាង",
    "bldg12": "មាហា",
    "bldg13": "ត្សីយេ",
    "bldg14": "យាងុ",
    "bldg15": "លាមិថ",
    "bldg16": "សិឆឺ",
    "bldg17": "ក៏សី",
    "bldg18": "សុត្សិ",
    "bldg19": "កេនេឆុ",
    "bldg20": "កិថ",
    "bldg21": "ខិតេ",
    "bldg22": "ចាត្សេយិង",
    "bldg23": "ផឺស",
    "bldg24": "ចាសុងតេ",
    "bldg25": "មេត្លេផ",
    "bldg26": "វុខុល",
    "bldg27": "កេលមា",
    "bldg28": "នុករុហ្រ",
    "bldg29": "ស្សុមុឆា",
    "bldg30": "ស្សុមុផេ",
  },
};

const LINGVOJ = ["aih", "eo", "en", "ja", "km",];
let aktivaLingvo = "aih";

// ⟪ Publika API — traduki 📃 ⟫
// Returns the translated string for the active language.
// Falls back to the key itself if not found.
export function traduki(klavo: string): string {
  const vortaro = skakefani[aktivaLingvo] || skakefani.eo;
  return vortaro[klavo] || klavo;
}

// ⟪ Apliki tradukojn al DOM 📃 ⟫
function aplikiSkakefanon(lingvo: string): void {
  aktivaLingvo = lingvo;
  const vortaro = skakefani[lingvo] || skakefani.eo;
  document.querySelectorAll("[data-oskakefani]").forEach(el => {
    const klavo = el.getAttribute("data-oskakefani");
    if (klavo && vortaro[klavo]) {
      el.textContent = vortaro[klavo];
    }
  });
  document.querySelectorAll("[data-oskakefani-aria]").forEach(el => {
    const klavo = el.getAttribute("data-oskakefani-aria");
    if (klavo && vortaro[klavo]) {
      el.setAttribute("aria-label", vortaro[klavo]);
    }
  });
  const butono = document.getElementById("butLingvo");
  if (butono) butono.textContent = lingvo.toUpperCase();
  try { localStorage.setItem("aranis-lingvo", lingvo); } catch { /* private browsing */ }
}

// ⟪ Sxalti al sekva lingvo 📃 ⟫
function sxaltiLingvon(): void {
  const idx = LINGVOJ.indexOf(aktivaLingvo);
  const sekva = LINGVOJ[(idx + 1) % LINGVOJ.length];
  aplikiSkakefanon(sekva);
}

// ⟪ Detekti preferatan lingvon 📃 ⟫
function detektiLingvon(): string {
  try {
    const konservita = localStorage.getItem("aranis-lingvo");
    if (konservita && LINGVOJ.includes(konservita)) return konservita;
  } catch { /* private browsing */ }
  const lang = (navigator.language || (navigator as any).userLanguage || "").split("-")[0];
  if (lang === "eo" || lang === "ja" || lang === "aih" || lang === "km") return lang;
  return "aih";
}

// ⟪ Inicializi 📃 ⟫
function inicializi(): void {
  aplikiSkakefanon(detektiLingvon());
  document.getElementById("butLingvo")?.addEventListener("click", sxaltiLingvon);
}

// Wait for DOM, then apply translations
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializi);
} else {
  inicializi();
}
