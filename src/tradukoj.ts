// tradukoj.ts — Translation system for Aranis
// Four languages. aih, eo, en, ja
import { gkAlIpa, ipaAlLingvo } from "./sonaj-reguloj.js";

const skakefani: Record<string, Record<string, string>> = {
  aih: {
    // Adjectives go BEFORE the noun for descriptions ( Iikrhia grammar rule ).
    // to signal a fused compound name rather than a mere description.
    "titoloAranis": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞ • j͐ʃɜ ɭʃᴜ ꞁȷ̀ɹ ֭ſɭɹɔ˞",
    "subtitoloUrbo": "j͐ʃɜ ɭʃᴜ ꞁȷ̀ɹ ֭ſɭɹɔ˞ • j͐ʃᴜ ŋᷠɹⰱ ꞁȷ̀ᴜꞇ ſɭᴜ ɭl̀ɹ ɭʃɔ",
    "eniri": "ſɭw ſ̀ȷᴜ",
    "butonoPromeni": "ſɭᴜ ɭʃᴜ",
    "butonoOrbiti": "֭ſɭɹ j͑ʃɔ",
    "butonoVestaro": "ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ j͑ʃɜȝ ɭʃɔ",
    "butonoHelpo": "ſȷɔ ſɭ,ꞇ",
    "titoloTeksilo": "ſɟᴜ j͑ʃ'ᴜ ı],ͷ̗ɔʞ",
    "subtitoloTeksilo": "j͑ʃᴜ ֭ſɭᴜƽ ʌ ſɭ,ɹ ſ̀ȷɔ • ſɟɹ }ʃᴜ ʌ ɭʃᴜ ŋᷠᴜ v j͑ʃɜȝ ɭʃɔ j͑ʃᴜꞇ • ſ͔ɭɔ j͐ʃɔɔ˞ ʌ ᶅſɔ ֭ſɭɹ ｡ ɭʃɜƽ v ֭ſɭᴜ ı],ɔ j͑ʃᴜꞇ",
    "titoloSxargxo": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞",
    "sxargxaSubskribo": "ſɭᶗ‹ɔ ʌ j͑ʃ'ɔ ſןᴜȝ",
    "sxargxaSatalo": "j͑ʃ'ɔ ſןᴜȝ ʌ j͑ʃᴜ ɭʃᴜͷ̗ ⟅",
    "sxargxaTraboj": "ı],ɔ ŋᷠᴜ ʌ ſɭᴜc̗ ɭʃɜ }ʃꞇ ⟅",
    "sxargxaNebulo": "j͐ʃᴜɔ˞ ʌ j͐ʃɜ ɭʃᴜ ʌ ⺓ ʌ ŋᷠᴜ ֭ſɭᴜ ⟅",
    "kompasoNordo": "j͐ʃᴜȝ",
    "regiloOrbito": "֭ſɭɹ j͑ʃɔ • ſɭc̗ᴜ ʃэ ɭʃɔȝ • ſןɔ ʌ ʃэ ɭʃɔȝ",
    "regiloPromeno": "ſɭᴜ ɭʃᴜ • WASD • Shift ſɭᴜ ſɭʞᴜȝ • Spaco ſןw",
    "regiloMovado": "WASD • ſɭᴜ ſɭʞᴜȝ ſɭc̭ᴜ ſɭc̗w",
    "regiloEniri": "E • ſɭw ſ̀ȷᴜ / j͑ʃwc̗ ɭʃᴜ • ſɭw ſ̀ȷᴜ ſɭэ ſɭᴜ ſɭw ʃᴜ",
    "regiloMapo": "M • ſɟᴜ ſᶘɹ }ʃᴜ j͑ʃᴜ ſɭᴜ ſɭw ʃᴜ ſɭэ",
    "regiloEliri": "Escape • j͑ʃwc̗ ɭʃᴜ",
    "regiloSpajroj": "ſןɔ ʌ ſ͕ɭᴜ ʌ ſɭɔ ʌ ʃэ ſɭɔ˞ᴜ ʌ ſɭᴜ ʌ ꞁȷ̀ɹ ʃᴜ • ſɭw ſ̀ȷᴜ",
    "regiloVesto": "ſ̀ȷᴜȝ • ſ̀ȷᴜȝ ſɭw ſ̀ȷᴜ",
    "titoloVojoj": "ſɭэ ֭ſɭэ",
    "subtitoloHelpo": "ſȷɔ ſɭ,ꞇ ʌ ſɭэ ʌ ſɭᴜ ſɭɔ ʌ ʃэ j͐ʃɜ ɭʃᴜ",
    // MAP OF ARANIS • The whole valley from above
    // map = ʃᴜ j͐ʃɹ ı],ᴜ • of(SER,vowel) = j͑ʃɔƣ̋ • Aranis = ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞
    // whole = ꞁȷ̀ɔ ɽ͑ʃ'ɹ ֭ſɭᴜ • valley = j͐ʃɜ ɭʃᴜ • from(Place) = j͐ʃэ ɭl̀э • top = j͑ʃɜ ſɭ,ᴜ
    "titoloMapo": "ʃᴜ j͐ʃɹ ı],ᴜ ʌ j͑ʃɔƣ̋ ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞",
    "subtitoloMapo": "ꞁȷ̀ɔ ɽ͑ʃ'ɹ ֭ſɭᴜ j͐ʃɜ ɭʃᴜ ʌ j͐ʃэ ɭl̀э j͑ʃɜ ſɭ,ᴜ",
    "actEliri": "j͑ʃwc̗ ɭʃᴜ • Esc",
    "eliriKanuo": "j͑ʃwc̗ ɭʃᴜ ʌ j͑ʃɹ ſɭᴜ ɭl̀ɹ",
    "regiloKanuo": "WASD • ſɭɹ j͑ʃɹ ſɭᴜ ɭl̀ɹ ʌ ſɭw ſ̀ȷᴜ",
    "eliri": "j͑ʃwc̗ ɭʃᴜ",
    "eniriKanuo": "ſɭw ſ̀ȷᴜ ʌ j͑ʃɹ ſɭᴜ ɭl̀ɹ",
    // Food action labels
    "actGusti": "ſ͔ɭɔȝ •",
    // Manĝaĵnomoj de la dosiero satalaj-konstruaĵoj.ts
    "manĝFok0": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ • ı],ꞇƽ", "manĝFok1": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ • ſ͕ɭᴜ ɭʃɹ ᶅſᴜ", "manĝFok2": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ • ɭʃɜͷ̗ ı],w",
    "manĝTla0": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ • ɭʃɜ ſɭɹ", "manĝTla1": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ • ɭʃɹƽ", "manĝTla2": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ • j͐ʃᴜ ŋᷠɹⰱ",
    // Gustotekstoj de la dosiero satalaj-konstruaĵoj.ts
    "manĝFok0Flavor": "ſᶘэ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ ｡ ı],ꞇƽ ⟅",
    "manĝFok1Flavor": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ſ͕ɭᴜ ɭʃɹ ᶅſᴜ ⟅",
    "manĝFok2Flavor": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ɭʃɜͷ̗ ı],w ｡ ſ͕ɭᴜ ɭʃɹ ᶅſᴜ ｡ ſ̀ȷɔ ı],ͷ̗ɔʞ ⟅",
    "manĝTla0Flavor": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ſ̀ȷᴜ ſɭɔͷ̗ ｡ ſɭɜ ſᶘɹᶗ‹ ｡ ſᶘᴜ v ſ͔ɭɔ ſןɹ j͑ʃᴜꞇ ⟅",
    "manĝTla1Flavor": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ɭʃɹƽ ｡ ſɟɔ ɭl̀ɹ ｡ ſɭɜ ſᶘɹᶗ‹ ｡ ſᶘᴜ v ſ͔ɭɔ ſןɹ j͑ʃᴜꞇ ⟅",
    "manĝTla2Flavor": "ſᶘᴜ ֭ſɭᴜͷ̗ ｡ ſɭᶗ‹ɹ j͐ʃᴜ ŋᷠɹⰱ ｡ ſɭɜ ſᶘɹᶗ‹ ｡ ſɟɔ ɭl̀ɹ v ֭ſɭᴜ }ʃɔ j͑ʃᴜꞇ ( ſᶘᴜ j͑ʃͷ̗ᴜʞ ꞁȷ̀ᴜꞇ ) ⟅",
    // Building card labels from satalaj-konstruaĵoj.ts TIPARO
    "tipDomo": "ſɭᴜ ſןɹ",
    "tipMangxejo": "ſɭᴜ ſ͔ɭɔȝ",
    "tipKasafeo": "ſɭᴜ j͑ʃᴜ ſȷɔ",
    "tipStacioxipo": "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ",
    "tipTuro": "ſןᴜȝ ᶅſw ſɭɹ",
    "tipSanktejo": "j͑ʃɜ j͑ʃƨɹ",
    // Building card flavor text — ʌ separates complete words; spaces inside
    // dictionary compounds remain ordinary syllable separators.
    "flvDomo": "j͑ʃᴜ j͑ʃ'ɔ ſɭᴜ ſןɹ ⟅",
    "flvMangxejo": "ꞁȷ̀ɹ ſɭꞇ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ʌ j͑ʃᴜ ſ͔ɭɔȝ ⟅",
    "flvKasafeo": "j͑ʃᴜ ſɭɔ˞w j͐ʃ ʌ j͑ʃᴜ j͑ʃᴜ ſȷɔ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ⟅",
    "flvStacioxipo": "j͑ʃᴜ ı],ᴜ ɽ͑ʃ'ᴜȝ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ⟅",
    "flvTuro": "ᶅſw ſɭɹ ʌ ſןᴜȝ ⟅",
    "flvSanktejo": "j͑ʃɜ j͑ʃƨɹ ⟅",
    // Card stats labels from sperto.ts
    "statTieroj": "ɭʃᴜ }ʃɔƽ",
    "statDiamanto": "ſɟꞇȝ ſɭᴜⰱ",
    "statJes": "ſɭɹ ֭ſɭɹ",
    "statNe": "ſɟɔ ֭ſɭɹ",
    "statTipo": "֭ſɭᴜ ı],ɔ",
    "statPozicio": "ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ",
    // WebGL error from scena.ts
    "webglMesagxo": "ſ͕ȷɜ ſɭɹ ɽ͑ʃ'ɔ ʌ WebGL ⟅",
    "webglDetalo": "ɭʃɔ ſ͕ɭᴜƴ ʌ WebGL ⟅ j͑ʃɹƣ̋ ꞁȷ̀ɜ j͐ʃɹ ŋᷠꞇ ʌ ſɟᴜ ֭ſɭᴜ ſȷᴜ v ſɭɹ ſןɹ ⟅",
    "webglReprovi": "ɭʃɜ ŋᷠэ",
    // aria labels from index.html and sperto.ts
    "ariaButKrepusko": "ſןw ſɭɜ ʃɔ j͑ʃƨꞇʞ",
    "ariaDuskRegilo": "ſןw ſɭɜ ʃɔ j͑ʃƨꞇʞ ʌ j͑ʃп́ɔ j͑ʃ'ɔ ŋᷠɹ",
    "ariaButPromeni": "ſɭᴜ ɭʃᴜ",
    "ariaButBruo": "ſȷᴜ ŋᷠᴜʞ",
    "ariaButOrbiti": "֭ſɭɹ j͑ʃɔ",
    "ariaButLingvo": "ſ͔ɭᴜ ᶅſɔ",
    "ariaSupermetaFermi": "}ʃɔƣ̋ ꞁȷ̀ᴜ ſ̀ȷɔ",
    // Informo-panelo — tradukoj poste ( lasita malplena )
    "ariaInformButono": "ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ j͑ʃ'ɜ ſןɹ",
    "titoloInformo": "ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ j͑ʃ'ɜ ſןɹ",
    "subtitoloInformo": "ſןᴜȝ • ŋᷠɜⅎᶗ‹ • ɭ(ᴜͷ̗",
    "tabKonstruajxoj": "ſןᴜȝ",
    "tabMangxajxoj": "ŋᷠɜⅎᶗ‹",
    "tabSpecioj": "ɭ(ᴜͷ̗",
    // Bestoj kaj plantoj de la valo — konservativaj, dictionary-kontrolitaj
    // priskriboj. ʌ disigas kompletajn vortojn; prefiksoj restas kun la bazo.
    "grupoBesto": "ſןᴜ ſ͔ɭᴜ",
    "grupoPlanto": "ı],ᴜ ſ̀ȷɔ",
    "specBeroe": "j͐ʃɹᶗ‹ ſɭw ſןwƽ ꞁȷ̀ᴜꞇ",
    "flvSpecBeroe": "j͐ʃᴜ ֭ſɭᴜƽ ʌ j͐ʃɹᶗ‹",
    "specMnemiopsis": "j͐ʃɹᶗ‹ ſɟᴜ ı],ͷ̗ɔʞ ꞁȷ̀ᴜꞇ",
    "flvSpecMnemiopsis": "ı],ɔ ſɭw ı],ᴜ ʌ j͐ʃɹᶗ‹",
    "specPleŭrobrakia": "j͐ʃɹᶗ‹ j͐ʃᴜ ſןw ֭ſɭᴜ j͑ʃᴜꞇ",
    "flvSpecPleŭrobrakia": "j͑ʃɹ j͐ʃɹᶗ‹",
    "specGlacifiso": "ſ͕ɭᴜ ɭʃɹ ᶅſᴜ",
    "flvSpecGlacifiso": "ᶅſɹ ʌ ſɭᴜ",
    "specMarlaraksxo": "ɭʃɜͷ̗ ı],w",
    "flvSpecMarlaraksxo": "j͑ʃɹ ɭʃɜͷ̗ ı],w",
    // Neĝopetrelo ( ɭʃɔ ŋᷠɔƽ / Pagodroma nivea )
    "specNeĝopetrelo": "ɭʃɔ ŋᷠɔƽ",
    "flvSpecNeĝopetrelo": "}ʃɹ ɭʃᴜ j͑ʃɔ ʌ ſɭэ j͑ʃꞇ j͐ʃ ʌ ı],ᴜ }ʃᴜ j͑ʃᴜꞇ ʌ j͑ʃп́ɔ ᶅſɔ ֭ſɭɹ ʌ ſɭэ ſɭɔ ⟅",
    "specBetulo": "j͐ʃᴜ ŋᷠɹⰱ",
    "flvSpecBetulo": "ſ͔ɭэ ʌ ſɭɔ ֭ſɭw ʌ ſɟɔ ⟅",
    "specLariko": "ɭʃᴜ ſɭɔ˞ᴜͷ̗",
    "flvSpecLariko": "ſɟꞇ ʌ j͑ʃͷ̗ᴜʞ ʌ ſɟɔ ⟅",
    "specHxsxaksxlefo": "ſ̀ȷɔ ı],ͷ̗ɔʞ ֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ",
    "flvSpecHxsxaksxlefo": "֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ ʌ ſ̀ȷɔ ı],ͷ̗ɔʞ ⟅ ꞁȷ̀ɜ j͑ʃ'ᴜ ſᶘᴜ ֭ſɭᴜͷ̗ ⟅",
    "specFiliko": "ı],ᴜ ʃꞇ",
    "flvSpecFiliko": "j͐ʃᴜ̩ᴜ ʌ ı],ᴜ ſ̀ȷɔ ʌ ɭl̀эƣ̋ ꞁȷ̀ɜƴ ⟅",
    "specPurpuraFiliko": "ſ̀ȷɔ ı],ͷ̗ɔʞ ı],ᴜ ʃꞇ j͑ʃᴜꞇ",
    "flvSpecPurpuraFiliko": "ı],ɔ ſɭᴜȝ ʌ ı],ᴜ ʃꞇ j͐ʃ ʌ ꞁȷ̀ɜ ʃэ ᶅſw ſɭɹ ʌ ſ̀ȷɔ ı],ͷ̗ɔʞ ⟅",
    "specLikeno": "ꞁȷ̀ɹ ŋᷠᴜ",
    "flvSpecLikeno": "ſᶘᴜ ſ̀ȷɔ ｡ ꞁȷ̀э ſᶘw ⟅ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃɔ ⟅",
    "specHerbo": "ſȷɔ ſᶘᴜʞ",
    "flvSpecHerbo": "ı],ɔ ſɭᴜȝ ʌ ſȷɔ ſᶘᴜʞ ʌ ֭ſɭɜ ŋᷠᴜ ʌ ı],ᴜ ſ̀ȷɔ ⟅",
    "specMusko": "ſɟэᶗ‹",
    "flvSpecMusko": "ꞁȷ̀ᴜ ſ̀ȷɔƽ ʌ j͐ʃэ j͑ʃɔ ı],ᴜ ſ̀ȷɔ ⟅",
    "specCetkuo": "ſᶘɔ ɭʃƽɹ",
    "flvSpecCetkuo": "ſȷɹʞ ʌ ı],ᴜ ſ̀ȷɔ ⟅",
    "specCakeo": "ſᶘᴜ ſɭɔ",
    "flvSpecCakeo": "ı],ɔ ſɭᴜȝ ʌ }ʃᴜ ɽ͑ʃ'ɹ j͑ʃᴜ ʌ ı],ᴜ ſ̀ȷɔ ⟅",
    "ariaTrako0": "j͑ʃw ſɭʞɹȝ ı ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
    "ariaTrako1": "j͑ʃw ſɭʞɹȝ ɿ ſןᴜ ʃɜƽ ſ͔ɭɹ",
    "ariaTrako2": "j͑ʃw ſɭʞɹȝ ц ɭʃэʞ ɭʃꞇʞ",
    "ariaTrako3": "j͑ʃw ſɭʞɹȝ э j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
    // Canvas alt text
    // Vesta nomoj ( custom names )
    "vestoVerdant": "j͐ʃᴜ̩ᴜ",
    "vestoHearth": "ſ̀ȷwɔ˞",
    "vestoMist": "ſ͔ɭэ",
    "vestoEmber": "ᶅſɔ j͐ʃᴜ",
    "vestoAzure": "ſɟɹ j͑ʃɹƽ",
    "vestoViolet": "ſᶘꞇ }ʃɔ",
    "vestoGilt": "ſɟꞇ",
    "vestoRose": "ᶅſɔ j͐ʃᴜ ſ͔ɭэ",
    "vestoObsidian": "֭ſɭw }ʃᴜ",
    "vestoCyan": "ꞁȷ̀ꞇ j͑ʃɔⅎᶗ‹",
    // Building names from real Iikrhia dictionary words ( Gawekiif )
    "paq0": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ꞇ ŋᷠᴜ }ʃɹ",
    "paq1": "ſɭᴜ ſןɹ",
    "paq2": "ſɭᴜ ᶅſw ſɭɹ",
    "paq3": "ſɭэᴜ̩ ſןɹ",
    "paq4": "ſɭɔⰱ",
    "paq5": "ſɟɹƽ ꞁȷ̀ᴜ }ʃw",
    "paq6": "ɭʃэ ſɭɔȝ",
    "paq7": "ſɟꞇȝ",
    "paq8": "ſɭᴜ ſɟɔ",
    "paq9": "ſȷɹ ŋᷠɹ",
    "paq10": "֭ſɭɹɔ˞",
    "paq11": "ı],ᴜȝ",
    "paq12": "ŋᷠᴜ ֭ſɭᴜ",
    "paq13": "ſᶘꞇ ɭl̀ɔ",
    "paq14": "ɭl̀ᴜ ſ͕ɭɜ",
    "paq15": "j͐ʃᴜ ŋᷠɹⰱ",
    "paq16": "j͑ʃɹ ı],w",
    "paq17": "ſɭэ j͑ʃꞇ",
    "paq18": "j͑ʃɜ ſᶘɹ",
    "paq19": "ſɭɔ }ʃɔ ı],ɜ",
    "paq20": "ſɭɹⰱ",
    "paq21": "ſ͔ɭɹ ɭʃɔ",
    "paq22": "ſɟᴜ ſᶘɔ ɭl̀ɹȝ",
    "paq23": "ſȷwɔ˞",
    "paq24": "ſɟᴜ j͑ʃɜȝ ɭʃɔ",
    "paq25": "ŋᷠɔ ſ̀ȷɔʞ",
    "paq26": "ᶅſɜ ſ͔ɭɜͷ̗",
    "paq27": "ſɭɔ j͐ʃc̭ᴜ",
    "paq28": "}ʃɜ ſɭɜƴ",
    "paq29": "ɭ(ɜ ŋᷠɜ ı],ᴜ",
    "paq30": "ɭ(ɜ ŋᷠɜ ſȷɔ",
    "paq31": "ſɭᴜɘ ꞁȷ̀ᴜ ſɟɔ",
    "paq32": "ſɭᴜ ɭ(ᴜͷ̗",
    "paq33": "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ",
    // Trakonomoj ( trakoN ): derivitaj de la aih-a Gawekiif per la sonaj reguloj.
    "muziko": "j͑ʃп́ꞇ ſɭɔƴ",
    "trako0": "ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
    "trako1": "ſןᴜ ʃɜƽ ſ͔ɭɹ",
    "trako2": "ſɭэ j͐ʃᴜ j͑ʃƨꞇʞ",
    "trako3": "j͐ʃɜ ɭʃᴜ ſɭᴜͷ̗ ɭʃɜ ı],ɔƽ",
  },
  eo: {
    // Proper Esperanto translations for all UI strings
    // IPA-based approximations for custom names
    "titoloAranis": "Aranis • Ĥusa Lotao",
    "subtitoloUrbo": "Ĥusa Lotao • Lamuza Kajteo",
    "eniri": "Eniri",
    "butonoPromeni": "PROMENI",
    "butonoOrbiti": "ORBITI",
    "butonoVestaro": "VESTARO",
    "butonoHelpo": "Helpo",
    "titoloTeksilo": "Teksilo",
    "subtitoloTeksilo": "Longaj ĉemizoj • mallongaj manikoj • ĉefa kaj akcenta",
    "titoloSxargxo": "Araniso",
    "sxargxaSubskribo": "Ŝargado...",
    "sxargxaSatalo": "Konstruado de satalaĵoj",
    "sxargxaTraboj": "Levado de traboj",
    "sxargxaNebulo": "Nebulo fluas tra la valo",
    "kompasoNordo": "N",
    "regiloOrbito": "Orbito • trenu por rigardi • alklaku por notoj",
    "regiloPromeno": "Promeni • WASD moviĝi • Shift por kuri • Spaco por salti",
    "regiloMovado": "WASD moviĝi • rapida piedo",
    "regiloEniri": "E por interagi • eniri konstruaĵon",
    "regiloMapo": "M por mapo",
    "regiloEliri": "Esc por eliri",
    "regiloSpajroj": "Alklaku por legi notojn",
    "regiloVesto": "Vestaro",
    "titoloVojoj": "Vojoj",
    "subtitoloHelpo": "Notoj pri la urbo",
    "titoloMapo": "Mapo de Araniso",
    "subtitoloMapo": "La tuta valo de supre",
    "actEliri": "Esc • Eliri",
    "eliriKanuo": "Eliri kanuon",
    "regiloKanuo": "WASD por direkti",
    "eliri": "Eliri",
    "eniriKanuo": "Eniri kanuon",
    // Food action labels
    "actGusti": "Guŝu •",
    // Manĝaĵnomoj de la dosiero satalaj-konstruaĵoj.ts
    // ( derivitaj de la aih-a Gawekiif per la sonaj reguloj )
    // Gustotekstoj de la dosiero satalaj-konstruaĵoj.ts
    "manĝFok0Flavor": "Pano el likeno kun anasa baozi.",
    "manĝFok1Flavor": "Tsahal-vinagro kaj glacifiŝo.",
    "manĝFok2Flavor": "Tsahal-vinagro, mara araneo, glacifiŝo kaj ŝlefo.",
    "manĝTla0Flavor": "Vinagro, lakto, mento kaj ŝaŭmakvo.",
    "manĝTla1Flavor": "Vinagro, kapsiko, juzuo, mento kaj ŝaŭmakvo.",
    "manĝTla2Flavor": "Vinagro, betula suko, mento kaj bergamota teo.",
    // Building card labels
    // Building flavor text
    "flvDomo": "Domo.",
    "flvMangxejo": "Komuna manĝejo.",
    "flvKasafeo": "Kunvenejo.",
    "flvStacioxipo": "Stacio.",
    "flvTuro": "Nubskrapulo.",
    "flvSanktejo": "Centro.",
    // Card stats
    "statTieroj": "Tavoloj",
    "statDiamanto": "Diamanto",
    "statJes": "Jes",
    "statNe": "Ne",
    "statTipo": "Tipo",
    "statPozicio": "Pozicio",
    // WebGL error
    "webglMesagxo": "Via retumilo ne subtenas WebGL. Ĝisdatigu vian retumilon por sperti la plenan sperton.",
    "webglDetalo": "Araniso postulas WebGL por funkcii. Ĝisdatigu vian retumilon aŭ kontrolu viajn GPU-agordojn.",
    "webglReprovi": "Reprovi",
    // Aria labels
    "ariaButPromeni": "Promeni",
    "ariaButBruo": "Fona bruo",
    "ariaButOrbiti": "Orbito",
    "ariaButLingvo": "Ŝanĝi la lingvon de la urbo",
    "ariaSupermetaFermi": "Fermi",
    // Informo-panelo ( konstruaĵoj • manĝaĵoj • specioj )
    "ariaInformButono": "Malfermi informojn",
    "titoloInformo": "Arazopuo",
    "subtitoloInformo": "Konstruaĵoj • manĝaĵoj • specioj",
    "tabKonstruajxoj": "Konstruaĵoj",
    "tabMangxajxoj": "Manĝaĵoj",
    "tabSpecioj": "Specioj",
    // Bestoj kaj plantoj de la valo ( el bestoj.ts kaj vegetajxo.ts )
    "grupoBesto": "Besto",
    "grupoPlanto": "Planto",
    "specBeroe": "Beroo",
    "flvSpecBeroe": "Longforma kombomeduzo kun ok kombovicoj.",
    "specMnemiopsis": "Mnemiopsiso",
    "flvSpecMnemiopsis": "Ronda kombomeduzo kun kvar buŝaj loboj.",
    "specPleŭrobrakia": "Pleŭrobrakio",
    "flvSpecPleŭrobrakia": "Malgranda ronda kombomeduzo kun du longaj palpoj.",
    "specGlacifiso": "Glacifiso",
    "flvSpecGlacifiso": "Preskaŭ travidebla fiŝo sen hemoglobino.",
    "specMarlaraksxo": "Marlaraksxo",
    "flvSpecMarlaraksxo": "Eta mararaneo kun ok longegaj kruroj.",
    "specNeĝopetrelo": "Neĝopetrelo",
    "flvSpecNeĝopetrelo": "Pura blanka marbirdo glitanta super la lago kaj la rivero.",
    "specBetulo": "Betulo",
    "flvSpecBetulo": "Arbo kun blanka ligno.",
    "specLariko": "Lariko",
    "flvSpecLariko": "Alpina konifero kun aŭtuna orflava pinglaro.",
    "specHxsxaksxlefo": "Ĥŝakŝlefo",
    "flvSpecHxsxaksxlefo": "Purpura laktukarbo kun kurbaj folioj. Uzata por fari vinagron.",
    "specFiliko": "Filiko",
    "flvSpecFiliko": "Verda planto sur la arbara grundo.",
    "specPurpuraFiliko": "Ŝafiŝlefo",
    "flvSpecPurpuraFiliko": "Alta purpura filiko de la ekstera arbaro.",
    "specLikeno": "Likeno",
    "flvSpecLikeno": "Algoj kaj fungo. Iimase.",
    "specHerbo": "Herbo",
    "flvSpecHerbo": "Herbo simila al ciankolora planto.",
    "specMusko": "Musko",
    "flvSpecMusko": "Monteto, kiu fakte estas planto.",
    "specCetkuo": "Cetkuo",
    "flvSpecCetkuo": "Alta senbranĉa skurĝa kano kun strobiloj.",
    "specCakeo": "Cakeo",
    "flvSpecCakeo": "Granda branĉet-kirla ĉevalvosto ĉe la lagrando.",
    // Aria label for dusk toggle
    "ariaButKrepusko": "Ŝalti krepuskan reĝimon",
    "ariaDuskRegilo": "Krepuska nivelo",
    // ariaTrakoN: derivitaj ( prefikso + derivita trakonomo )
    // Canvas alt text
    // Clothing names
    "vestoVerdant": "Verda",
    "vestoHearth": "Bruna",
    "vestoMist": "Blanka",
    "vestoEmber": "Ruĝa",
    "vestoAzure": "Blua",
    "vestoViolet": "Purpura",
    "vestoGilt": "Flava",
    "vestoRose": "Roza",
    "vestoObsidian": "Nigra",
    "vestoCyan": "Cejana",
    // Konstruaĵnomoj ( paqN )
    "muziko": "Muziko",
  },
  en: {
    // Proper English translations for all UI strings
    // Phonetic transcriptions ( of aih ) used only for custom names ( vesto * )
    "titoloAranis": "Aranis • Khiss Lhota",
    "subtitoloUrbo": "Khiss Lhota • Lhammithai Kayitteh",
    "eniri": "Enter",
    "butonoPromeni": "Walk",
    "butonoOrbiti": "Orbit",
    "butonoVestaro": "Wardrobe",
    "butonoHelpo": "Help",
    "titoloTeksilo": "Loom",
    "subtitoloTeksilo": "Long shirts • Short sleeves • Main and accent",
    "titoloSxargxo": "Aranis",
    "sxargxaSubskribo": "Loading",
    "sxargxaSatalo": "Constructing satals",
    "sxargxaTraboj": "Lifting beams",
    "sxargxaNebulo": "Mist flows through the valley",
    "kompasoNordo": "N",
    "regiloOrbito": "Orbit • Drag to look • Click for notes",
    "regiloPromeno": "Walk • WASD to move • Shift to run • Space to jump",
    "regiloMovado": "WASD to move • Fast walk",
    "regiloEniri": "E to interact • Enter building",
    "regiloMapo": "M for map",
    "regiloEliri": "Esc to exit",
    "regiloSpajroj": "Click to read notes",
    "regiloVesto": "Wardrobe",
    "titoloVojoj": "Paths",
    "subtitoloHelpo": "City notes",
    "titoloMapo": "Aranis Map",
    "subtitoloMapo": "The whole valley from above",
    "actEliri": "Esc • Exit",
    "eliriKanuo": "Exit canoe",
    "regiloKanuo": "WASD to steer",
    "eliri": "Exit",
    "eniriKanuo": "Enter canoe",
    // Food action labels
    "actGusti": "Taste •",
    // Manĝaĵnomoj de la dosiero satalaj-konstruaĵoj.ts
    // ( derivitaj de la aih-a Gawekiif per la sonaj reguloj )
    // Gustotekstoj de la dosiero satalaj-konstruaĵoj.ts
    "manĝFok0Flavor": "Lichen bread with duck baozi.",
    "manĝFok1Flavor": "Tsahal vinegar and icefish.",
    "manĝFok2Flavor": "Tsahal vinegar, sea spider, icefish, and shlef.",
    "manĝTla0Flavor": "Vinegar, milk, mint, and sparkling water.",
    "manĝTla1Flavor": "Vinegar, chili, yuzu, mint, and sparkling water.",
    "manĝTla2Flavor": "Vinegar, birch sap, mint, and bergamot tea.",
    // Building card labels
    // Building flavor text
    "flvDomo": "Domo.",
    "flvMangxejo": "Komuna manĝejo.",
    "flvKasafeo": "Kunvenejo.",
    "flvStacioxipo": "Stacio.",
    "flvTuro": "Nubskrapulo.",
    "flvSanktejo": "Centro.",
    // Card stats
    "statTieroj": "Layers",
    "statDiamanto": "Diamond",
    "statJes": "Yes",
    "statNe": "No",
    "statTipo": "Type",
    "statPozicio": "Position",
    // WebGL error
    "webglMesagxo": "Your browser does not support WebGL. Update your browser for the full experience.",
    "webglDetalo": "Aranis requires WebGL to run. Please update your browser or check your GPU settings.",
    "webglReprovi": "Retry",
    // Aria labels
    "ariaButPromeni": "Walk",
    "ariaButBruo": "Background noise",
    "ariaButOrbiti": "Orbit",
    "ariaButLingvo": "Language",
    "ariaSupermetaFermi": "Close",
    // Information panel ( buildings • food • species )
    "ariaInformButono": "Information",
    "titoloInformo": "Aravopii",
    "subtitoloInformo": "Buildings • Food • Species",
    "tabKonstruajxoj": "Buildings",
    "tabMangxajxoj": "Food",
    "tabSpecioj": "Species",
    // The animals and plants of the valley ( from bestoj.ts and vegetajxo.ts )
    "grupoBesto": "Animal",
    "grupoPlanto": "Plant",
    "specBeroe": "Beroe",
    "flvSpecBeroe": "An elongate comb jelly with eight comb rows.",
    "specMnemiopsis": "Mnemiopsis",
    "flvSpecMnemiopsis": "A round comb jelly with four oral lobes.",
    "specPleŭrobrakia": "Pleurobrachia",
    "flvSpecPleŭrobrakia": "A small round comb jelly with two long palps.",
    "specGlacifiso": "Icefish",
    "flvSpecGlacifiso": "A nearly transparent fish without hemoglobin.",
    "specMarlaraksxo": "Sea spider",
    "flvSpecMarlaraksxo": "A tiny sea spider with eight long legs.",
    "specNeĝopetrelo": "Snow petrel",
    "flvSpecNeĝopetrelo": "A pure white seabird gliding over the lake and the river.",
    "specBetulo": "Birch",
    "flvSpecBetulo": "A tree with white wood.",
    "specLariko": "Larch",
    "flvSpecLariko": "An alpine conifer with golden autumn needles.",
    "specHxsxaksxlefo": "Shlef Hshaku",
    "flvSpecHxsxaksxlefo": "A purple lettuce tree with curled leaves. Used to make vinegar.",
    "specFiliko": "Fern",
    "flvSpecFiliko": "A green plant on the forest floor.",
    "specPurpuraFiliko": "Shlef Shawhisu",
    "flvSpecPurpuraFiliko": "A tall purple fern that grows into a large tree.",
    "specLikeno": "Lichen",
    "flvSpecLikeno": "Algae and fungus. Iimase.",
    "specHerbo": "Grass",
    "flvSpecHerbo": "Grass like a cyan plant.",
    "specMusko": "Moss",
    "flvSpecMusko": "A mound that is actually a plant.",
    "specCetkuo": "Tsetkih",
    "flvSpecCetkuo": "A tall unbranched scouring rush with strobili.",
    "specCakeo": "Tsakeh",
    "flvSpecCakeo": "Great branch-whorled horsetails at the lakeshore.",
    // Aria label for dusk toggle
    "ariaButKrepusko": "Dusk",
    "ariaDuskRegilo": "Dusk level",
    // ariaTrakoN: derived ( prefix + derived track name )
    // Canvas alt text
    // Clothing names
    "vestoVerdant": "Green",
    "vestoHearth": "Brown",
    "vestoMist": "White",
    "vestoEmber": "Red",
    "vestoAzure": "Blue",
    "vestoViolet": "Purple",
    "vestoGilt": "Yellow",
    "vestoRose": "Pink",
    "vestoObsidian": "Black",
    "vestoCyan": "Cyan",
    // Building names ( en )
    "muziko": "Music",
  },
  ja: {
    // Proper Japanese translations for all UI strings
    // Phonetic transcriptions ( of aih ) used only for custom names ( vesto * )
    "titoloAranis": "アラニス • ロタ・イーヒス",
    "subtitoloUrbo": "ロタ・イーヒス • カジーテ・セラーミョヴ",
    "eniri": "入る",
    "butonoPromeni": "歩く",
    "butonoOrbiti": "周回",
    "butonoVestaro": "ワードローブ",
    "butonoHelpo": "ヘルプ",
    "titoloTeksilo": "ザ・ルーム",
    "subtitoloTeksilo": "長いシャツ • 短い袖 • メインとアクセント",
    "titoloSxargxo": "アラニス",
    "sxargxaSubskribo": "建設中…",
    "sxargxaSatalo": "サタルを建設中",
    "sxargxaTraboj": "梁を持ち上げ中",
    "sxargxaNebulo": "霧が谷を流れる",
    "kompasoNordo": "北",
    "regiloOrbito": "周回 • ドラッグして見る • クリックでノート",
    "regiloPromeno": "歩く • WASDで移動 • Shiftで走る • Spaceでジャンプ",
    "regiloMovado": "WASDで移動 • 早足",
    "regiloEniri": "Eで操作 • 建物に入る",
    "regiloMapo": "Mで地図",
    "regiloEliri": "Escで出る",
    "regiloSpajroj": "クリックでノートを読む",
    "regiloVesto": "ワードローブ",
    "titoloVojoj": "道",
    "subtitoloHelpo": "街のノート",
    "titoloMapo": "アラニスの地図",
    "subtitoloMapo": "谷全体を上から見る",
    "actEliri": "Esc • 出る",
    "eliriKanuo": "カヌーから出る",
    "regiloKanuo": "WASDで操縦",
    "eliri": "出る",
    "eniriKanuo": "カヌーに乗る",
    // Food action labels
    "actGusti": "味見 •",
    // Manĝaĵnomoj de la dosiero satalaj-konstruaĵoj.ts
    // ( derivitaj de la aih-a Gawekiif per la sonaj reguloj )
    // Gustotekstoj de la dosiero satalaj-konstruaĵoj.ts
    "manĝFok0Flavor": "リケンパンの鴨入り包子。",
    "manĝFok1Flavor": "ツァハラ酢とアイスフィッシュ。",
    "manĝFok2Flavor": "ツァハラ酢、ウミグモ、アイスフィッシュ、シュレフ。",
    "manĝTla0Flavor": "酢、牛乳、ミント、炭酸水。",
    "manĝTla1Flavor": "酢、唐辛子、柚子、ミント、炭酸水。",
    "manĝTla2Flavor": "酢、白樺樹液、ミント、ベルガモット茶。",
    // Building card labels
    // Building flavor text
    "flvDomo": "家。",
    "flvMangxejo": "共同の食事処。",
    "flvKasafeo": "会議室。",
    "flvStacioxipo": "駅。",
    "flvTuro": "超高層建築。",
    "flvSanktejo": "中心。",
    // Card stats
    "statTieroj": "階層",
    "statDiamanto": "ダイヤ",
    "statJes": "有",
    "statNe": "無",
    "statTipo": "種類",
    "statPozicio": "位置",
    // WebGL error
    "webglMesagxo": "お使いのブラウザはWebGLをサポートしていません。ブラウザを更新してください。",
    "webglDetalo": "アラニスはWebGLが必要です。ブラウザを更新するか、GPU設定を確認してください。",
    "webglReprovi": "再試行",
    // Aria labels
    "ariaButPromeni": "歩く",
    "ariaButBruo": "背景ノイズ",
    "ariaButOrbiti": "周回",
    "ariaButLingvo": "言語",
    "ariaSupermetaFermi": "閉じる",
    // 情報パネル ( 建物 • 食べ物 • 種族 )
    "ariaInformButono": "情報を開く",
    "titoloInformo": "情報",
    "subtitoloInformo": "建物 • 食べ物 • 種族",
    "tabKonstruajxoj": "建物",
    "tabMangxajxoj": "食べ物",
    "tabSpecioj": "種族",
    // 谷の動物と植物 ( bestoj.ts と vegetajxo.ts から )
    "grupoBesto": "動物",
    "grupoPlanto": "植物",
    "specBeroe": "ベロー",
    "flvSpecBeroe": "細長い有櫛動物。八列の櫛を持つ。",
    "specMnemiopsis": "ネミオプシス",
    "flvSpecMnemiopsis": "四つの口葉を持つ丸い有櫛動物。",
    "specPleŭrobrakia": "プレウロブラキア",
    "flvSpecPleŭrobrakia": "二本の長い触手を持つ小さな丸い有櫛動物。",
    "specGlacifiso": "氷魚",
    "flvSpecGlacifiso": "ヘモグロビンを持たない、ほぼ透明な魚。",
    "specMarlaraksxo": "ウミグモ",
    "flvSpecMarlaraksxo": "八本の長い脚を持つ小さなウミグモ。",
    "specNeĝopetrelo": "ユキドリ",
    "flvSpecNeĝopetrelo": "湖と川の上を滑空する真っ白な海鳥。",
    "flvSpecBetulo": "白い木材を持つ木。",
    "flvSpecLariko": "秋に黄金色の針葉を持つ高山性の針葉樹。",
    "flvSpecHxsxaksxlefo": "紫色のレタスの木。巻いた葉を持ち、酢作りに使う。",
    "flvSpecFiliko": "森の地面に生える緑の植物。",
    "flvSpecPurpuraFiliko": "外側の森に生える高い紫色のシダ。",
    "flvSpecLikeno": "藻類と菌類。イマセ。",
    "flvSpecHerbo": "シアン色の植物のような草。",
    "flvSpecMusko": "実は植物である小山。",
    "flvSpecCetkuo": "胞子嚢を持つ、高く枝分かれしないトクサ。",
    "flvSpecCakeo": "湖岸に生える、大きく枝が輪生するトクサ。",
    // Aria label for dusk toggle
    "ariaButKrepusko": "夕暮れモードを切り替え",
    "ariaDuskRegilo": "夕暮れのレベル",
    // ariaTrakoN: 派生 ( 接頭辞 + 派生したトラック名 )
    // Canvas alt text
    // Clothing names
    "vestoVerdant": "緑",
    "vestoHearth": "茶色",
    "vestoMist": "白",
    "vestoEmber": "赤",
    "vestoAzure": "青",
    "vestoViolet": "紫",
    "vestoGilt": "黄",
    "vestoRose": "桃色",
    "vestoObsidian": "黒",
    "vestoCyan": "シアン",
    // Konstruaĵnomoj ( paqN )
    "muziko": "音楽",
  },
  km: {
    // Khmer (Cambodian) translations for all UI strings
    // Phonetic approximations in Khmer script for custom names
    "titoloAranis": "អរ៉ានីស • ឡូតា-អ៊ីហ៊ីស",
    "subtitoloUrbo": "ឡូតា-អ៊ីហ៊ីស • កាជីតេ-សេឡាមយ៉ូវ",
    "eniri": "ចូល",
    "butonoPromeni": "ដើរ",
    "butonoOrbiti": "ទស្សនា",
    "butonoVestaro": "សម្លៀកបំពាក់",
    "butonoHelpo": "ជំនួយ",
    "titoloTeksilo": "តម្បាញ",
    "subtitoloTeksilo": "អាវវែង • ដៃខ្លី • ពណ៌ចម្បង និង ពណ៌បន្ទាប់",
    "titoloSxargxo": "អរ៉ានីស",
    "sxargxaSubskribo": "កំពុងសាងសង់",
    "sxargxaSatalo": "ហ្សីហ្គូរ៉ាត់កំពុងឡើង",
    "sxargxaTraboj": "ធ្នឹមឈើកំពុងគ្រាំ",
    "sxargxaNebulo": "អ័ព្ទហូរកាត់ជ្រលង",
    "kompasoNordo": "ជ",
    "regiloOrbito": "ទស្សនា • អូសដើម្បីមើល • ចុចសម្រាប់កំណត់ត្រា",
    "regiloPromeno": "ដើរ • WASD ដើម្បីផ្លាស់ទី • Shift ដើម្បីរត់ • Space ដើម្បីលោត",
    "regiloMovado": "WASD ដើម្បីផ្លាស់ទី • ដើរលឿន",
    "regiloEniri": "E ដើម្បីចូល/ចេញ • ចូលអាគារ",
    "regiloMapo": "M សម្រាប់ផែនទី",
    "regiloEliri": "Escape ដើម្បីចេញ",
    "regiloSpajroj": "ចុចប៉មដើម្បីអានកំណត់ត្រា • ចូល",
    "regiloVesto": "សម្លៀកបំពាក់ • ប្តូរសំលៀកបំពាក់របស់អ្នក",
    "titoloVojoj": "ផ្លូវ",
    "subtitoloHelpo": "កំណត់ត្រាជំនួយអំពីទីក្រុង",
    "titoloMapo": "ផែនទីអារ៉ានីស",
    "subtitoloMapo": "ជ្រលងទាំងមូលពីលើ",
    "actEliri": "ចេញ • Esc",
    "eliriKanuo": "ដើម្បីចេញពីទូក",
    "regiloKanuo": "ការគ្រប់គ្រងទូក • WASD ដើម្បីបង្វែរ",
    "eliri": "ចេញ",
    "eniriKanuo": "ចូលទូក",
    // Food action labels
    "actGusti": "ភ្លក់ •",
    // Manĝaĵnomoj de la dosiero satalaj-konstruaĵoj.ts
    // ( derivitaj de la aih-a Gawekiif per la sonaj reguloj )
    // Gustotekstoj de la dosiero satalaj-konstruaĵoj.ts
    "manĝFok0Flavor": "នំប៉័ងលីខេន មានប៉ាវសាច់ទាខាងក្នុង។",
    "manĝFok1Flavor": "ទឹកខ្មេះត្សាហាល និងត្រីទឹកកក។",
    "manĝFok2Flavor": "ទឹកខ្មេះត្សាហាល ពីងពាងសមុទ្រ ត្រីទឹកកក និងស្លេហ្វ។",
    "manĝTla0Flavor": "ទឹកខ្មេះ ទឹកដោះគោ ជីអង្កាម និងទឹកមានពពុះ។",
    "manĝTla1Flavor": "ទឹកខ្មេះ ម្ទេស យូស៊ុ ជីអង្កាម និងទឹកមានពពុះ។",
    "manĝTla2Flavor": "ទឹកខ្មេះ ទឹកប៊ីច ជីអង្កាម និងតែប៊ឺហ្គាម៉ុត។",
    // Building card labels
    // Building flavor text
    "flvDomo": "ផ្ទះ។",
    "flvMangxejo": "កន្លែងបរិភោគអាហាររួម។",
    "flvKasafeo": "បន្ទប់ប្រជុំ។",
    "flvStacioxipo": "ស្ថានីយ។",
    "flvTuro": "អគារខ្ពស់។",
    "flvSanktejo": "មជ្ឈមណ្ឌល។",
    // Card stats
    "statTieroj": "ជាន់",
    "statDiamanto": "ពេជ្រ",
    "statJes": "បាទ",
    "statNe": "ទេ",
    "statTipo": "ប្រភេទ",
    "statPozicio": "ទីតាំង",
    // WebGL error
    "webglMesagxo": "កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រ WebGL ទេ។ សូមធ្វើបច្ចុប្បន្នភាពកម្មវិធីរុករករបស់អ្នកសម្រាប់បទពិសោធន៍ពេញលេញ។",
    "webglDetalo": "អរ៉ានីស ត្រូវការ WebGL ដើម្បីដំណើរការ។ សូមធ្វើបច្ចុប្បន្នភាពកម្មវិធីរុករករបស់អ្នក ឬពិនិត្យការកំណត់ GPU របស់អ្នក។",
    "webglReprovi": "ព្យាយាមម្តងទៀត",
    // Aria labels
    "ariaButPromeni": "ដើរ",
    "ariaButBruo": "សំឡេងផ្ទៃខាងក្រោយ",
    "ariaButOrbiti": "ទស្សនា",
    "ariaButLingvo": "ភាសា",
    "ariaSupermetaFermi": "បិទ",
    // ផ្ទាំងព័ត៌មាន ( អាគារ • អាហារ • ប្រភេទ )
    "ariaInformButono": "បើកព័ត៌មាន",
    "titoloInformo": "ព័ត៌មាន",
    "subtitoloInformo": "អាគារ • អាហារ • ប្រភេទ",
    "tabKonstruajxoj": "អាគារ",
    "tabMangxajxoj": "អាហារ",
    "tabSpecioj": "ប្រភេទ",
    // សត្វ និងរុក្ខជាតិនៃជ្រលង ( ពី bestoj.ts និង vegetajxo.ts )
    "grupoBesto": "សត្វ",
    "grupoPlanto": "រុក្ខជាតិ",
    "specBeroe": "បេរ៉ូ",
    "flvSpecBeroe": "ចាហួយសិតរាងវែង មានជួរសិតប្រាំបី។",
    "specMnemiopsis": "នេមីអូបស៊ីស",
    "flvSpecMnemiopsis": "ចាហួយសិតរាងមូល មានកំពូលមាត់បួន។",
    "specPleŭrobrakia": "ប្លឿរ៉ូប្រាគីអា",
    "flvSpecPleŭrobrakia": "ចាហួយសិតមូលតូច មានអង់តែនវែងពីរ។",
    "specGlacifiso": "ត្រីទឹកកក",
    "flvSpecGlacifiso": "ត្រីស្ទើរតែថ្លា ដែលគ្មានហេម៉ូក្លូប៊ីន។",
    "specMarlaraksxo": "ពីងពាងសមុទ្រ",
    "flvSpecMarlaraksxo": "ពីងពាងសមុទ្រតូច មានជើងវែងប្រាំបី។",
    "specNeĝopetrelo": "បក្សីព្រិល",
    "flvSpecNeĝopetrelo": "សត្វសមុទ្រពណ៌សសុទ្ធ ហើរពីលើបឹង និងទន្លេ។",
    "flvSpecBetulo": "ដើមឈើដែលមានឈើពណ៌ស។",
    "flvSpecLariko": "ដើមឈើម្ជុលភ្នំ មានម្ជុលពណ៌មាសនៅរដូវស្លឹកឈើជ្រុះ។",
    "flvSpecHxsxaksxlefo": "ដើមសាឡាត់ពណ៌ស្វាយ មានស្លឹករមួល ហើយប្រើធ្វើទឹកខ្មេះ។",
    "flvSpecFiliko": "រុក្ខជាតិពណ៌បៃតងដែលដុះលើដីព្រៃ។",
    "flvSpecPurpuraFiliko": "ហ្វឺនពណ៌ស្វាយខ្ពស់នៅព្រៃខាងក្រៅ។",
    "flvSpecLikeno": "សារាយ និងផ្សិត។ អ៊ីម៉ាសេ។",
    "flvSpecHerbo": "ស្មៅដូចជារុក្ខជាតិពណ៌ស៊ីយ៉ង់។",
    "flvSpecMusko": "គំនរដែលតាមពិតជារុក្ខជាតិ។",
    "flvSpecCetkuo": "រុក្ខជាតិខ្ពស់គ្មានមែក មានកោនគ្រាប់ពូជ។",
    "flvSpecCakeo": "រុក្ខជាតិខ្ពស់មានមែកជុំវិញ ដុះនៅមាត់បឹង។",
    // Aria label for dusk toggle
    "ariaButKrepusko": "ប្តូររបៀបព្រលប់",
    "ariaDuskRegilo": "កម្រិតព្រលប់",
    // ariaTrakoN: បានដកស្រង់ ( បុព្វបទ + ឈ្មោះបទដកស្រង់ )
    // Canvas alt text
    // Clothing names ( phonetic approximations in Khmer script )
    "vestoVerdant": "ពណ៌បៃតង",
    "vestoHearth": "ពណ៌ត្នោត",
    "vestoMist": "ពណ៌ស",
    "vestoEmber": "ពណ៌ក្រហម",
    "vestoAzure": "ពណ៌ខៀវ",
    "vestoViolet": "ពណ៌ស្វាយ",
    "vestoGilt": "ពណ៌លឿង",
    "vestoRose": "ពណ៌ផ្កាឈូក",
    "vestoObsidian": "ពណ៌ខ្មៅ",
    "vestoCyan": "ពណ៌ស៊ីអាន",
    // Konstruaĵnomoj ( paqN )
    "muziko": "តន្ត្រី",
  },
};

const LINGVOJ = ["aih", "eo", "en", "ja", "km",];
let aktivaLingvo = "aih";

// ⟪ Publika API — traduki 📃 ⟫
// Returns the translated string for the active language.
// Falls back to the key itself if not found.
// nomoAih — Nomo de konstruajxo en la gepatra Gawekiif-skribo (por la strat-signoj).
export function nomoAih(klavo: string): string {
  return skakefani.aih[klavo] || klavo;
}

// Konstruaĵnomoj ( paqN ), trakonomoj ( trakoN ), manĝaĵnomoj
// ( manĝFokN / manĝTlaN ) kaj la specifaj plantnomoj ( spec* ) povas esti
// DERIVITAJ de la aih-a Gawekiif per la sonaj reguloj ( src/sonaj-reguloj.ts )
// kiam la aktiva lingvo ne havas propran tekston. En aih la gk-formo estas jam
// la fonto, kaj eo/en konservas siajn eksplicitajn plantnomojn.
// La aria-etikedoj de la trakoj ( ariaTrakoN ) uzas la derivitan trakonomon.
const ARIA_TRAKO_PREFIKSO: Record<string, (n: number) => string> = {
  eo: n => "Elekti trakon " + n + " ",
  en: n => "Select track " + n + " ",
  ja: n => "トラック " + n + " を選択 ",
  km: n => "ជ្រើសរើសបទ " + n + " ",
};
const SPECIFIKAJ_PLANTNOMOJ = new Set([
  "specBetulo", "specLariko", "specHxsxaksxlefo", "specFiliko", "specPurpuraFiliko",
  "specLikeno", "specHerbo", "specMusko", "specCetkuo", "specCakeo",
]);
const KONSTRUAJ_NOMOJ = new Set([
  "tipDomo", "tipMangxejo", "tipKasafeo", "tipStacioxipo", "tipTuro", "tipSanktejo",
]);

function deriviNomon(klavo: string): string | null {
  if (aktivaLingvo === "aih") return null;
  // ariaTrakoN: prefikso ( lingvo-specifa ) + derivita trakonomo.
  // spec*: mankas rekta ja/km-ŝnuro por la specifaj plantnomoj, do ili ankaŭ
  // venas el la aih-formo per la samaj sonaj reguloj.
  const aria = /^ariaTrako(\d+)$/.exec(klavo);
  const bazo = aria ? "trako" + aria[1] : klavo;
  if (!/^(paq|trako|manĝFok|manĝTla)\d+$/.test(bazo) && !SPECIFIKAJ_PLANTNOMOJ.has(bazo) && !KONSTRUAJ_NOMOJ.has(bazo)) return null;
  const aihFormo = skakefani.aih[bazo];
  if (!aihFormo) return null;
  // Manĝaĵnomoj kunhavas "•" disigilon ( nomo • gusto ): derivu ĉiun flankon
  // aparte, por ke la disigilo kaj spacoj postvivu la konverton.
  const nomo = aihFormo
    .split("•")
    .map(p => ipaAlLingvo(gkAlIpa(p.trim()), aktivaLingvo))
    .join(" • ");
  if (!nomo) return null;
  const kap = nomo.charAt(0).toUpperCase() + nomo.slice(1);
  if (aria) {
    const pre = ARIA_TRAKO_PREFIKSO[aktivaLingvo] ?? ARIA_TRAKO_PREFIKSO.eo;
    return pre(parseInt(aria[1]) + 1) + kap;
  }
  return kap;
}

export function traduki(klavo: string): string {
  const vortaro = skakefani[aktivaLingvo] || skakefani.eo;
  const rekta = vortaro[klavo];
  if (rekta !== undefined && rekta !== "") return rekta;
  const derivita = deriviNomon(klavo);
  if (derivita) return derivita;
  return rekta || klavo;
}

// Cxu la nuna lingvo estas la gepatra aih-a? ( Por la vacepu-formato. )
export function cxuAih(): boolean {
  return aktivaLingvo === "aih";
}

// ⟪ Apliki tradukojn al DOM 📃 ⟫
function aplikiSkakefanon(lingvo: string): void {
  aktivaLingvo = lingvo;
  // La skribo-direkto ( .menuPanel / #tosto ) sekvas la lingvon per html[lang=...].
  document.documentElement.lang = lingvo;
  const vortaro = skakefani[lingvo] || skakefani.eo;
  document.querySelectorAll("[data-oskakefani]").forEach(el => {
    const klavo = el.getAttribute("data-oskakefani");
    if (klavo) {
      const traduko = traduki(klavo);
      if (traduko !== klavo) el.textContent = traduko;
    }
  });
  document.querySelectorAll("[data-oskakefani-aria]").forEach(el => {
    const klavo = el.getAttribute("data-oskakefani-aria");
    if (klavo) {
      const traduko = traduki(klavo);
      if (traduko !== klavo) el.setAttribute("aria-label", traduko);
    }
  });
  const butono = document.getElementById("butLingvo");
  if (butono) butono.textContent = lingvo.toUpperCase();
  try { localStorage.setItem("aranis-lingvo", lingvo); } catch { /* private browsing */ }
  // En la aih-a lingvo oni envolvu la vortojn per vacepu ( el la ekstera ſɭɔ j͑ʃ'ɔ }ʃꞇ.js ).
  if (lingvo === "aih" && typeof vacepu === "function") vacepu("aih");
  // Anoncu la ŝanĝon por ke dinamikaj etikedoj ( ekz. la reĝima butono ) refreŝiĝu.
  window.dispatchEvent(new CustomEvent("lingvosxangxo"));
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
