// tradukoj.ts — Translation system for Aranis
// Four languages. aih, eo, en, ja

const skakefani: Record<string, Record<string, string>> = {
  aih: {
    // Adjectives go BEFORE the noun for descriptions ( Iikrhia grammar rule ).
    // to signal a fused compound name rather than a mere description.
    "p1": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞ · j͐ʃɜ ɭʃᴜ ꞁȷ̀ɹ ֭ſɭɹɔ˞",
    "p2": "j͐ʃɜ ɭʃᴜ ꞁȷ̀ɹ ֭ſɭɹɔ˞ · ſɭᴜ ɭl̀ɹ ɭʃɔ j͑ʃɔ j͐ʃᴜ ŋᷠɹⰱ",
    "p3": "ſɭc̗ᴜ ʃэ ɭʃɔȝ · ſןɔ ʌ ſ͕ɭᴜ ʌ ſɭɔ ʌ ʃэ ɭʃɔȝ · ſɭᴜ ɭʃᴜ ʌ ʃэ ɭʃɔȝ · ſןw · E ʌ ʃэ ſɭw ſ̀ȷᴜ ʌ ſɭэ j͑ʃɹ ſɭᴜ ɭl̀ɹ",
    "p4": "ſɭw ſ̀ȷᴜ",
    "p5": "ſɭᴜ ɭʃᴜ",
    "p6": "֭ſɭɹ j͑ʃɔ",
    "p7": "ſ̀ȷᴜȝ",
    "p8": "}ʃɔƣ̋ ꞁȷ̀ᴜ ſ̀ȷɔ",
    "p9": "ſɭᴜ ɭʃᴜ ʌ j͑ʃɔ ſɭᴜ ſᶘɹ }ʃᴜ ʌ j͐ʃɜ ɭʃᴜ ʌ ꞁȷ̀ɹ ֭ſɭɹɔ˞",
    "pA": "ſɭᴜ ɭʃᴜ ʌ j͑ʃɔ ſɭᴜ ſᶘɹ }ʃᴜ ʌ ſɭэ ſɭᴜ ʌ ſɭэ ɽ͑ʃ'ꞇ ʌ ſɭэ ſɟᴜ",
    "pB": "ſ̀ȷᴜȝ ſɭw ſ̀ȷᴜ",
    "pC": "ſȷɔ ſɭ,ꞇ",
    "pD": "ı],ͷ̗ɔʞ ſɭᴜ ſ͕ɭᴜ ſɭɔ",
    "pE": "ſɭ,ɹ ʌ ſ̀ȷɔ ʌ ꞁȷ̀ɹ ŋᷠᴜ ʌ j͑ʃɔ ʌ ꞁȷ̀ɹ ʃᴜ · ŋᷠᴜ j͑ʃɜȝ ʌ ɭʃɔ ꞁȷ̀ɹ j͑ʃᴜ · ſɭɔ˞ᴜ ʌ ſ͔ɭɔ ʌ ſɭɔ ʌ ŋᷠᴜ j͑ʃɔ",
    "pF": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞",
    "pG": "j͐ʃɜ ɭʃᴜ ſɭɔƽ",
    "pH": "j͑ʃᴜ ʃɜƽ ʌ ⺓ ʌ ſɭᴜ ſ͕ɭᴜ ſɭɔ ⟅",
    "pI": "j͑ʃ'ɔ ſȷэⅎ }ʃɔⅎ ʌ ⺓ ʌ ſɭɔ ֭ſɭw ʌ ı],ᴜȝ ⟅",
    "pJ": "j͐ʃᴜɔ˞ ʌ j͐ʃɜ ɭʃᴜ ʌ ⺓ ʌ ŋᷠᴜ ֭ſɭᴜ ⟅",
    "pK": "j͐ʃᴜȝ",
    "pL": "֭ſɭɹ ʌ j͑ʃɔ · ſɭc̗ᴜ ʃэ ɭʃɔȝ · ſןɔ ʌ ʃэ ɭʃɔȝ",
    "pM": "ſɭᴜ ɭʃᴜ · WASD · Shift ſɭᴜ ſɭʞᴜȝ · Spaco ſןw",
    "pN": "WASD · ſɭᴜ ſɭʞᴜȝ ſɭc̭ᴜ ſɭc̗w",
    "pO": "E · ſɭw ſ̀ȷᴜ/j͑ʃwc̗ · ſɭw ſ̀ȷᴜ ſɭэ ſɭᴜ ſɭw ʃᴜ",
    "pP": "M · ſɟᴜ ſᶘɹ }ʃᴜ j͑ʃᴜ ſɭᴜ ſɭw ʃᴜ ſɭэ",
    "pQ": "Escape · j͑ʃwc̗",
    "pR": "ſןɔ ʌ ſ͕ɭᴜ ʌ ſɭɔ ʌ ʃэ ſɭɔ˞ᴜ ʌ ſɭᴜ ʌ ꞁȷ̀ɹ ʃᴜ · ſɭw ſ̀ȷᴜ",
    "pS": "ſ̀ȷᴜȝ · ſ̀ȷᴜȝ ſɭw ſ̀ȷᴜ",
    "pT": "ſɭэ ʌ ֭ſɭэ ʌ j͑ʃɔ j͐ʃɜ ɭʃᴜ",
    "pU": "ſȷɔ ſɭ,ꞇ ʌ ſɭэ ʌ ſɭᴜ ſɭɔ ʌ ʃэ j͐ʃɜ ɭʃᴜ",
    "actEliri": "j͑ʃwc̗ · Esc",
    "pW": "j͑ʃwc̗ ʌ j͑ʃɹ ſɭᴜ ɭl̀ɹ",
    "pX": "j͑ʃɹ ſɭᴜ ɭl̀ɹ ʌ ſɭw ſ̀ȷᴜ · WASD ʌ ſɭʞɔƴ",
    "pY": "j͑ʃwc̗",
    "pZ": "ſɭw ſ̀ȷᴜ ʌ j͑ʃɹ ſɭᴜ ɭl̀ɹ",
    // Food action labels
    "actGusti": "ſ͔ɭɔȝ ·", "actTrinketi": "ſ͔ɭɔȝ ·",
    // Stair action labels
    "actSxtupSupren": "j͑ʃ'ɔ ɭl̀ᴜ ſ͕ɭɜ",
    "actSxtupMalsupren": "j͑ʃ'ɔ ſןɔ˞ᴜƴ",
    // Manĝaĵnomoj de la dosiero zigurato-konstruilo.ts
    "manĝFok0": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ · ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ ſᶘэ", "manĝFok1": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ · ſɭɜ ſᶘɹᶗ‹", "manĝFok2": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ · ɭʃɹƽ ꞁȷ̀ᴜꞇ",
    "manĝTla0": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ · ɭʃɜ ſɭɹ", "manĝTla1": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ j͐ʃɜ ſɟɹ · j͐ʃɜ ſɟɹ", "manĝTla2": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ j͐ʃᴜ ŋᷠɹⰱ ſɭᶗ‹ɹ ſɟɔ · ſɭᶗ‹ɹ j͐ʃᴜ ŋᷠɹⰱ",
    // Gustotekstoj de la dosiero zigurato-konstruilo.ts
    "manĝFok0Flavor": "ſɭᴜ ſȷɔ˞ɹ ſᶘэ ꞁȷ̀ɹ ŋᷠᴜ ʌ ŋᷠwȝ ı],ꞇƽ ʌ ſȷэ ſȷɹ j͑ʃ'ɔ ſȷͷ̗ᴜƽ",
    "manĝFok1Flavor": "j͑ʃɹ ɭl̀ᴜ ŋᷠɜ j͑ʃ'ᴜ ı],ᴜ ֭ſɭᴜ ʌ ɭl̀w ŋᷠɜ j͑ʃᴜ ſɟɔƽ · ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɟɔ ſ͔ɭᴜ j͑ʃɔ",
    "manĝFok2Flavor": "֭ſɭw }ʃᴜ ɭʃɹ ſɭʞᴜɔ˞ ſ͔ɭɔ ſןɹ · ſᶘэ ſᶘɔⅎ ı],ɜ ı],ꞇͷ̗",
    "manĝTla0Flavor": "ſᶘᴜ ֭ſɭᴜͷ̗ ʌ ſ̀ȷᴜ ſɭɔͷ̗ ʌ ſɭɜ ſᶘɹᶗ‹ ʌ ɭ(ᴜ̭ꞇ · ɭʃэʞ ſɭɔ˞ɜⅎ",
    "manĝTla1Flavor": "ɭʃэ ſɭᶗ‹ɹ ſɟɔ ʌ ſɭᶗ‹ɹ ſɟɹ ᶅſᴜ · ſɭɜ ſᶘɹᶗ‹",
    "manĝTla2Flavor": "j͐ʃᴜ ŋᷠɹⰱ ſɭᶗ‹ɹ ſɟɔ ſɟɹ ſɟɹɔ˞ · j͐ʃɜ ɭʃᴜ ſȷᴜɔ˞ ᶅſɹ",
    // Building card labels from zigurato-konstruilo.ts TIPARO
    "tipDomo": "ſɭᴜ ſɭw ʃᴜ ſɭᴜ ſɭw ſɭэ",
    "tipMangxejo": "ſɭᴜ ſ͔ɭɔȝ ſɟᴜ ŋᷠᴜ",
    "tipStacio": "ſɭᴜ ſɭw ʃᴜ ſɭᴜ ſɭʞᴜȝ",
    "tipTuro": "ſɭᴜ ſɭʞᴜȝ ſɭᴜ ſɭw ʃᴜ",
    "tipSanktejo": "ſɭᴜ ſɭw ʃᴜ ſɭᴜ ꞁȷ̀ᴜȝ",
    // Building card flavor text
    "flvDomo": "ſɭᴜ ɭl̀ɹ ɭʃɔ ꞁȷ̀ɹ j͑ʃᴜ ſɭᴜ ſȷɔ ſɭɔ ꞁȷ̀ɹ ſɭᴜ ſɭw ʃᴜ ſɭэ ſɭ͔ɭᴜƽ j͑ʃ'ᴜ ſɭᴜ ſᶘɔ ɭl̀ɹȝ",
    "flvMangxejo": "ſɟᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſ͔ɭɔȝ · ſɟᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſɭw ʃᴜ ŋᷠᴜ ſɭɔƽ ſɭэ ſɟᴜ ſᶘɔ ɭl̀ɹȝ · ſɭɔ˞ᴜ ꞁȷ̀ɹ ſɭэ ſɭᴜ ſɭˬꞇᴜ",
    "flvStacio": "ſɭᴜ ſɭʞᴜȝ ſɭᴜ ɭl̀ɹ ɭʃɔ ſɭᴜ ſɭэ ſᶘɹ j͑ʃᴜꞇ · ſɭэ ſɭᴜ ſɭэ ɽ͑ʃ'ꞇ ſɭэ j͐ʃɜ ɭʃᴜ ꞁȷ̀ɹ ֭ſɭɹɔ˞",
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
    "webglMesagxo": "ſɟᴜ ſᶘɔ ɭl̀ɹȝ ſɭɜ ſɭw ſ̀ȷᴜ WebGL. ſɭᴜ ſᶘɔ ɭl̀ɹȝ ſɭɜ ſɭᴜ ſɭw ʃᴜ WebGL ʃэ ſɭɔ˞ᴜ ſɭᴜ ꞁȷ̀ɹ ʃᴜ ſɭᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſɭэ ɽ͑ʃ'ꞇ",
    "webglDetalo": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞ ſɭᴜ ſᶘɔ ɭl̀ɹȝ WebGL ʃэ ſɭᴜ ſɭw ʃᴜ ſɭᴜ ſɭэ ɽ͑ʃ'ꞇ. ſɟᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſᶘɔ ɭl̀ɹȝ ſɟᴜ ſɭᴜ ŋᷠᴜ GPU",
    "webglReprovi": "ſɭᴜ ɭʃᴜ ſɭэ",
    // aria labels from experience.html
    "ariaButSonoro": "ſɟᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſɭэ",
    "ariaButPromeni": "ſɭᴜ ɭʃᴜ ſɭc̭ᴜ ſɭc̗w ſɭᴜ ſɭэ ɽ͑ʃ'ꞇ",
    "ariaButOrbiti": "֭ſɭɹ j͑ʃɔ ſɭc̗ᴜ ʃэ ɭʃɔȝ ſɭc̭ᴜ ſɭc̗w",
    "ariaButVesti": "ſ̀ȷᴜȝ ſɭw ſ̀ȷᴜ",
    "ariaButHelpi": "ſȷɔ ſɭ,ꞇ",
    "ariaButLingvo": "ſɟᴜ ſᶘɹ }ʃᴜ j͑ʃᴜ ſɭᴜ ſɭɔʞ ſɭᴜ ſɭɹ ſןɹ",
    "ariaSupermetaFermi": "}ʃɔƣ̋ ꞁȷ̀ᴜ ſ̀ȷɔ",
    "ariaTrako0": "j͑ʃw ſɭʞɹȝ ı ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
    "ariaTrako1": "j͑ʃw ſɭʞɹȝ ɿ ſןᴜ ʃɜƽ ſ͔ɭɹ",
    "ariaTrako2": "j͑ʃw ſɭʞɹȝ ц ɭʃэʞ ɭʃꞇʞ",
    "ariaTrako3": "j͑ʃw ſɭʞɹȝ э j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
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
    "bldg28": "}ʃɜ ſɭɜƴ",
    "bldg29": "ɭ(ɜ ŋᷠɜ ı],ᴜ",
    "bldg30": "ɭ(ɜ ŋᷠɜ ſȷɔ",
    // Track names
    "muziko": "j͑ʃп́ꞇ ſɭɔƴ",
    "trako0": "ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
    "trako1": "ſןᴜ ʃɜƽ ſ͔ɭɹ",
    "trako2": "ſɭэ j͐ʃᴜ j͑ʃƨꞇʞ",
    "trako3": "j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
  },
  eo: {
    // Proper Esperanto translations for all UI strings
    // IPA-based approximations for custom names
    "p1": "ARANIS · Ĥota-Ihis",
    "p2": "Ĥota-Ihis · Kajite-Selamjov",
    "p3": "Trenu por rigardi · Alklaku spajron por notoj · Piediru por esplori · Aŭ · E por eniri kanuon",
    "p4": "Eniri",
    "p5": "PROMENI",
    "p6": "ORBITI",
    "p7": "VESTARO",
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
    "actEliri": "eliri · Esc",
    "pW": "por eliri kanuon",
    "pX": "Kanua regado · WASD direkti",
    "pY": "Eliri",
    "pZ": "Eniri kanuon",
    // Food action labels
    "actGusti": "Guŝu ·", "actTrinketi": "Trinketu ·",
    // Stair action labels
    "actSxtupSupren": "Supreniri la ŝtuparon",
    "actSxtupMalsupren": "Malsupreniri la ŝtuparon",
    // Manĝaĵnomoj de la dosiero zigurato-konstruilo.ts
    "manĝFok0": "fokumaseŭ · Lichen Crust", "manĝFok1": "fokumaseŭ · Mint Glaze", "manĝFok2": "fokumaseŭ · Peppered",
    "manĝTla0": "tlatuva · Classic", "manĝTla1": "tlatuva · Honeyed", "manĝTla2": "tlatuva · Iced Birch-sap",
    // Gustotekstoj de la dosiero zigurato-konstruilo.ts
    "manĝFok0Flavor": "Varma likena pano, malrapida anaso, faldon de vaporo.",
    "manĝFok1Flavor": "Malvarma glazuro kontraŭ riĉa viando · la arbaro elspiras.",
    "manĝFok2Flavor": "Malhela pipro mordas · la bulko respondas dolĉe.",
    "manĝTla0Flavor": "Vinagro, lakto, mento, brileto · hela akordo.",
    "manĝTla1Flavor": "Sukero super acido · mento sube.",
    "manĝTla2Flavor": "Betula sudfrosto · la valo en glaso.",
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
    // Aria label for dusk toggle
    "ariaButKrepusko": "Ŝalti krepuskan reĝimon",
    "ariaTrako0": "Elekti trakon 1 ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
    "ariaTrako1": "Elekti trakon 2 ſןᴜ ʃɜƽ ſ͔ɭɹ",
    "ariaTrako2": "Elekti trakon 3 ſɭэ j͐ʃпᴜ j͑ʃƨꞇʞ ɭʃc ɭ̀ʃı",
    "ariaTrako3": "Elekti trakon 4 j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
    // Canvas alt text
    "altTitolaSkripto": "Aranis skribita en la zigurata skribo",
    // Clothing names
    "vestoVerdant": "Verdanta Korto — Ĉihes Verdo",
    "vestoHearth": "Fajruja Gardanto — Ĥeles Verda",
    "vestoMist": "Nebula Palto — Ihis Verda",
    "vestoEmber": "Brusta Gardanto — Ĥeles Bruna",
    // Building names ( systematic IPA-based transcription using new py script values.
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
    // Track names
    "muziko": "Muziko",
    "trako0": "ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
    "trako1": "ſןᴜ ʃɜƽ ſ͔ɭɹ",
    "trako2": "ſɭэ j͐ʃпᴜ j͑ʃƨꞇʞ ɭʃc ɭ̀ʃı",
    "trako3": "j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
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
    "actEliri": "exit · Esc",
    "pW": "to exit canoe",
    "pX": "Canoe controls · WASD to steer",
    "pY": "Exit",
    "pZ": "Enter canoe",
    // Food action labels
    "actGusti": "Taste ·", "actTrinketi": "Sip ·",
    // Stair action labels
    "actSxtupSupren": "Climb the stairs",
    "actSxtupMalsupren": "Descend the stairs",
    // Manĝaĵnomoj de la dosiero zigurato-konstruilo.ts
    "manĝFok0": "hokihmasuh · Lichen Crust", "manĝFok1": "hokihmasuh · Mint Glaze", "manĝFok2": "hokihmasuh · Peppered",
    "manĝTla0": "tlatihwa · Classic", "manĝTla1": "tlatihwa · Honeyed", "manĝTla2": "tlatihwa · Iced Birch-sap",
    // Gustotekstoj de la dosiero zigurato-konstruilo.ts
    "manĝFok0Flavor": "Warm lichen bread, slow duck, a fold of steam.",
    "manĝFok1Flavor": "Cool glaze against rich meat · the forest exhales.",
    "manĝFok2Flavor": "Dark pepper bites · the bun answers sweet.",
    "manĝTla0Flavor": "Vinegar, milk, mint, sparkle · a bright chord.",
    "manĝTla1Flavor": "Amber over acid · mint underneath.",
    "manĝTla2Flavor": "Birch-sap frost · the vale in a glass.",
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
    // Aria label for dusk toggle
    "ariaButKrepusko": "Toggle dusk mode",
    "ariaTrako0": "Select track 1 ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
    "ariaTrako1": "Select track 2 ſןᴜ ʃɜƽ ſ͔ɭɹ",
    "ariaTrako2": "Select track 3 ſɭэ j͐ʃпᴜ j͑ʃƨꞇʞ ɭʃc ɭ̀ʃı",
    "ariaTrako3": "Select track 4 j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
    // Canvas alt text
    "altTitolaSkripto": "Aranis written in the ziggurat script",
    // Clothing names
    "vestoVerdant": "Ihis Verdan — Verdant Court",
    "vestoHearth": "Kheles Verdan — Hearthguard",
    "vestoMist": "Ihis Verdan — Mistcloak",
    "vestoEmber": "Kheles Brunan — Emberguard",
    // Building names ( systematic IPA-based transcription using new py script values.
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
    // Track names
    "muziko": "Music",
    "trako0": "ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
    "trako1": "ſןᴜ ʃɜƽ ſ͔ɭɹ",
    "trako2": "ſɭэ j͐ʃпᴜ j͑ʃƨꞇʞ ɭʃc ɭ̀ʃı",
    "trako3": "j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
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
    "actEliri": "出る · Esc",
    "pW": "カヌーを出る",
    "pX": "カヌー操作 · WASDで操縦",
    "pY": "出る",
    "pZ": "カヌーに乗る",
    // Food action labels
    "actGusti": "味見 ·", "actTrinketi": "一口 ·",
    // Stair action labels
    "actSxtupSupren": "階段を上る",
    "actSxtupMalsupren": "階段を下りる",
    // Manĝaĵnomoj de la dosiero zigurato-konstruilo.ts
    "manĝFok0": "フォクウマスア · Lichen Crust", "manĝFok1": "フォクウマスア · Mint Glaze", "manĝFok2": "フォクウマスア · Peppered",
    "manĝTla0": "トラトウワ · Classic", "manĝTla1": "トラトウワ · Honeyed", "manĝTla2": "トラトウワ · Iced Birch-sap",
    // Gustotekstoj de la dosiero zigurato-konstruilo.ts
    "manĝFok0Flavor": "Warm lichen bread, slow duck, a fold of steam.",
    "manĝFok1Flavor": "Cool glaze against rich meat · the forest exhales.",
    "manĝFok2Flavor": "Dark pepper bites · the bun answers sweet.",
    "manĝTla0Flavor": "Vinegar, milk, mint, sparkle · a bright chord.",
    "manĝTla1Flavor": "Amber over acid · mint underneath.",
    "manĝTla2Flavor": "Birch-sap frost · the vale in a glass.",
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
    // Aria label for dusk toggle
    "ariaButKrepusko": "夕暮れモードを切り替え",
    "ariaTrako0": "トラック 1 を選択 ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
    "ariaTrako1": "トラック 2 を選択 ſןᴜ ʃɜƽ ſ͔ɭɹ",
    "ariaTrako2": "トラック 3 を選択 ſɭэ j͐ʃпᴜ j͑ʃƨꞇʞ ɭʃc ɭ̀ʃı",
    "ariaTrako3": "トラック 4 を選択 j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
    // Canvas alt text
    "altTitolaSkripto": "Aranisのジッグラト文字",
    // Clothing names
    "vestoVerdant": "イヒス ヴェルダン — ヴェルダンコート",
    "vestoHearth": "ケレス ヴェルダン — ハースガード",
    "vestoMist": "イヒス ヴェルダン — ミストクローク",
    "vestoEmber": "ケレス ブルナン — エンバーガード",
    // Building names ( IPA→katakana using proper CV syllable combos.
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
    // Track names
    "muziko": "音楽",
    "trako0": "ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
    "trako1": "ſןᴜ ʃɜƽ ſ͔ɭɹ",
    "trako2": "ſɭэ j͐ʃпᴜ j͑ʃƨꞇʞ ɭʃc ɭ̀ʃı",
    "trako3": "j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
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
    "actEliri": "ចេញ · Esc",
    "pW": "ដើម្បីចេញពីទូក",
    "pX": "ការគ្រប់គ្រងទូក · WASD ដើម្បីបង្វែរ",
    "pY": "ចេញ",
    "pZ": "ចូលទូក",
    // Food action labels
    "actGusti": "ភ្លក់ ·", "actTrinketi": "ផឹក ·",
    // Stair action labels
    "actSxtupSupren": "ឡើងជណ្តើរ",
    "actSxtupMalsupren": "ចុះជណ្តើរ",
    // Manĝaĵnomoj de la dosiero zigurato-konstruilo.ts
    "manĝFok0": "ផុកិមាសឺ · Lichen Crust", "manĝFok1": "ផុកិមាសឺ · Mint Glaze", "manĝFok2": "ផុកិមាសឺ · Peppered",
    "manĝTla0": "ត្លាតិវា · Classic", "manĝTla1": "ត្លាតិវា · Honeyed", "manĝTla2": "ត្លាតិវា · Iced Birch-sap",
    // Gustotekstoj de la dosiero zigurato-konstruilo.ts
    "manĝFok0Flavor": "Warm lichen bread, slow duck, a fold of steam.",
    "manĝFok1Flavor": "Cool glaze against rich meat · the forest exhales.",
    "manĝFok2Flavor": "Dark pepper bites · the bun answers sweet.",
    "manĝTla0Flavor": "Vinegar, milk, mint, sparkle · a bright chord.",
    "manĝTla1Flavor": "Amber over acid · mint underneath.",
    "manĝTla2Flavor": "Birch-sap frost · the vale in a glass.",
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
    // Aria label for dusk toggle
    "ariaButKrepusko": "ប្តូររបៀបព្រលប់",
    "ariaTrako0": "ជ្រើសរើសបទ 1 ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
    "ariaTrako1": "ជ្រើសរើសបទ 2 ſןᴜ ʃɜƽ ſ͔ɭɹ",
    "ariaTrako2": "ជ្រើសរើសបទ 3 ſɭэ j͐ʃпᴜ j͑ʃƨꞇʞ ɭʃc ɭ̀ʃı",
    "ariaTrako3": "ជ្រើសរើសបទ 4 j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
    // Canvas alt text
    "altTitolaSkripto": "អរ៉ានីសសរសេរជាអក្សរហ្សីហ្គូរ៉ាត់",
    // Clothing names ( phonetic approximations in Khmer script )
    "vestoVerdant": "អ៊ីហ៊ីស វែរដាន់ · វែរដាន់កូត",
    "vestoHearth": "ខេឡេស វែរដាន់ · ហាតហ្គាដ",
    "vestoMist": "អ៊ីហ៊ីស វែរដាន់ · មីសខ្លូក",
    "vestoEmber": "ខេឡេស ប្រូណាន់ · អេមបឺហ្គាដ",
    // Building names ( IPA→Khmer using new py script KM_MAP values verbatim.
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
    // Track names
    "muziko": "តន្ត្រី",
    "trako0": "ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
    "trako1": "ſןᴜ ʃɜƽ ſ͔ɭɹ",
    "trako2": "ſɭэ j͐ʃпᴜ j͑ʃƨꞇʞ ɭʃc ɭ̀ʃı",
    "trako3": "j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
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
