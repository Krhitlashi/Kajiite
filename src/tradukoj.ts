// tradukoj.ts — Translation system for Aranis
// Four languages. aih, eo, en, ja
import { gkAlIpa, ipaAlLingvo } from "./sonaj-reguloj.js";

const skakefani: Record<string, Record<string, string>> = {
  aih: {
    // Adjectives go BEFORE the noun for descriptions ( Iikrhia grammar rule ).
    // to signal a fused compound name rather than a mere description.
    "titoloAranis": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞ · j͐ʃɜ ɭʃᴜ ꞁȷ̀ɹ ֭ſɭɹɔ˞",
    "subtitoloUrbo": "j͐ʃɜ ɭʃᴜ ꞁȷ̀ɹ ֭ſɭɹɔ˞ · ſɭᴜ ɭl̀ɹ ɭʃɔ j͑ʃɔ j͐ʃᴜ ŋᷠɹⰱ",
    "konsiloEnkonduko": "ſɭc̗ᴜ ʃэ ɭʃɔȝ · ſןɔ ʌ ſ͕ɭᴜ ʌ ſɭɔ ʌ ʃэ ɭʃɔȝ · ſɭᴜ ɭʃᴜ ʌ ʃэ ɭʃɔȝ · ſןw · E ʌ ʃэ ſɭw ſ̀ȷᴜ ʌ ſɭэ j͑ʃɹ ſɭᴜ ɭl̀ɹ",
    "eniri": "ſɭw ſ̀ȷᴜ",
    "butonoPromeni": "ſɭᴜ ɭʃᴜ",
    "butonoOrbiti": "֭ſɭɹ j͑ʃɔ",
    "butonoVestaro": "ſ̀ȷᴜȝ",
    "butonoFermi": "}ʃɔƣ̋ ꞁȷ̀ᴜ ſ̀ȷɔ",
    "priskriboPromeno": "ſɭᴜ ɭʃᴜ ʌ j͑ʃɔ ſɭᴜ ſᶘɹ }ʃᴜ ʌ j͐ʃɜ ɭʃᴜ ʌ ꞁȷ̀ɹ ֭ſɭɹɔ˞",
    "priskriboOrbito": "ſɭᴜ ɭʃᴜ ʌ j͑ʃɔ ſɭᴜ ſᶘɹ }ʃᴜ ʌ ſɭэ ſɭᴜ ʌ ſɭэ ɽ͑ʃ'ꞇ ʌ ſɭэ ſɟᴜ",
    "priskriboVestaro": "ſ̀ȷᴜȝ ſɭw ſ̀ȷᴜ",
    "butonoHelpo": "ſȷɔ ſɭ,ꞇ",
    "titoloTeksilo": "ı],ͷ̗ɔʞ ſɭᴜ ſ͕ɭᴜ ſɭɔ",
    "subtitoloTeksilo": "ſɭ,ɹ ʌ ſ̀ȷɔ ʌ ꞁȷ̀ɹ ŋᷠᴜ ʌ j͑ʃɔ ʌ ꞁȷ̀ɹ ʃᴜ · ŋᷠᴜ j͑ʃɜȝ ʌ ɭʃɔ ꞁȷ̀ɹ j͑ʃᴜ · ſɭɔ˞ᴜ ʌ ſ͔ɭɔ ʌ ſɭɔ ʌ ŋᷠᴜ j͑ʃɔ",
    "titoloSxargxo": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞",
    "sxargxaSubskribo": "j͐ʃɜ ɭʃᴜ ſɭɔƽ",
    "sxargxaSatalo": "j͑ʃᴜ ʃɜƽ ʌ ⺓ ʌ ſɭᴜ ſ͕ɭᴜ ſɭɔ ⟅",
    "sxargxaTraboj": "j͑ʃ'ɔ ſȷэⅎ }ʃɔⅎ ʌ ⺓ ʌ ſɭɔ ֭ſɭw ʌ ı],ᴜȝ ⟅",
    "sxargxaNebulo": "j͐ʃᴜɔ˞ ʌ j͐ʃɜ ɭʃᴜ ʌ ⺓ ʌ ŋᷠᴜ ֭ſɭᴜ ⟅",
    "kompasoNordo": "j͐ʃᴜȝ",
    "regiloOrbito": "֭ſɭɹ j͑ʃɔ · ſɭc̗ᴜ ʃэ ɭʃɔȝ · ſןɔ ʌ ʃэ ɭʃɔȝ",
    "regiloPromeno": "ſɭᴜ ɭʃᴜ · WASD · Shift ſɭᴜ ſɭʞᴜȝ · Spaco ſןw",
    "regiloMovado": "WASD · ſɭᴜ ſɭʞᴜȝ ſɭc̭ᴜ ſɭc̗w",
    "regiloEniri": "E · ſɭw ſ̀ȷᴜ / j͑ʃwc̗ ɭʃᴜ · ſɭw ſ̀ȷᴜ ſɭэ ſɭᴜ ſɭw ʃᴜ",
    "regiloMapo": "M · ſɟᴜ ſᶘɹ }ʃᴜ j͑ʃᴜ ſɭᴜ ſɭw ʃᴜ ſɭэ",
    "regiloEliri": "Escape · j͑ʃwc̗ ɭʃᴜ",
    "regiloSpajroj": "ſןɔ ʌ ſ͕ɭᴜ ʌ ſɭɔ ʌ ʃэ ſɭɔ˞ᴜ ʌ ſɭᴜ ʌ ꞁȷ̀ɹ ʃᴜ · ſɭw ſ̀ȷᴜ",
    "regiloVesto": "ſ̀ȷᴜȝ · ſ̀ȷᴜȝ ſɭw ſ̀ȷᴜ",
    "titoloVojoj": "ſɭэ ʌ ֭ſɭэ ʌ j͑ʃɔ j͐ʃɜ ɭʃᴜ",
    "subtitoloHelpo": "ſȷɔ ſɭ,ꞇ ʌ ſɭэ ʌ ſɭᴜ ſɭɔ ʌ ʃэ j͐ʃɜ ɭʃᴜ",
    // MAP OF ARANIS · The whole vale from above
    // map = ʃᴜ j͐ʃɹ ı],ᴜ · of(SER,vowel) = j͑ʃɔƣ̋ · Aranis = ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞
    // whole = ꞁȷ̀ɔ ɽ͑ʃ'ɹ ֭ſɭᴜ · vale = j͐ʃɜ ɭʃᴜ · from(Place) = j͐ʃэ ɭl̀э · top = j͑ʃɜ ſɭ,ᴜ
    "titoloMapo": "ʃᴜ j͐ʃɹ ı],ᴜ ʌ j͑ʃɔƣ̋ ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞",
    "subtitoloMapo": "ꞁȷ̀ɔ ɽ͑ʃ'ɹ ֭ſɭᴜ j͐ʃɜ ɭʃᴜ ʌ j͐ʃэ ɭl̀э j͑ʃɜ ſɭ,ᴜ",
    "actEliri": "j͑ʃwc̗ ɭʃᴜ · Esc",
    "eliriKanuo": "j͑ʃwc̗ ɭʃᴜ ʌ j͑ʃɹ ſɭᴜ ɭl̀ɹ",
    "regiloKanuo": "j͑ʃɹ ſɭᴜ ɭl̀ɹ ʌ ſɭw ſ̀ȷᴜ · WASD ʌ ſɭʞɔƴ",
    "eliri": "j͑ʃwc̗ ɭʃᴜ",
    "eniriKanuo": "ſɭw ſ̀ȷᴜ ʌ j͑ʃɹ ſɭᴜ ɭl̀ɹ",
    // Food action labels
    "actGusti": "ſ͔ɭɔȝ ·", "actTrinketi": "ſ͔ɭɔȝ ·",
    // Manĝaĵnomoj de la dosiero satalaj-konstruaĵoj.ts
    "manĝFok0": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ · ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ ſᶘэ", "manĝFok1": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ · ſɭɜ ſᶘɹᶗ‹", "manĝFok2": "ſȷɜƽ ꞁȷ̀ɹ ŋᷠᴜ j͑ʃᴜꞇ · ɭʃɹƽ ꞁȷ̀ᴜꞇ",
    "manĝTla0": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ · ɭʃɜ ſɭɹ", "manĝTla1": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ j͐ʃɜ ſɟɹ · j͐ʃɜ ſɟɹ", "manĝTla2": "ſ̀ȷᴜ ɭʃɹ ᶅſᴜ j͐ʃᴜ ŋᷠɹⰱ ſɭᶗ‹ɹ ſɟɔ · ſɭᶗ‹ɹ j͐ʃᴜ ŋᷠɹⰱ",
    // Gustotekstoj de la dosiero satalaj-konstruaĵoj.ts
    "manĝFok0Flavor": "ſɭᴜ ſȷɔ˞ɹ ſᶘэ ꞁȷ̀ɹ ŋᷠᴜ ʌ ŋᷠwȝ ı],ꞇƽ ʌ ſȷэ ſȷɹ j͑ʃ'ɔ ſȷͷ̗ᴜƽ",
    "manĝFok1Flavor": "j͑ʃɹ ɭl̀ᴜ ŋᷠɜ j͑ʃ'ᴜ ı],ᴜ ֭ſɭᴜ ʌ ɭl̀w ŋᷠɜ j͑ʃᴜ ſɟɔƽ · ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɟɔ ſ͔ɭᴜ j͑ʃɔ",
    "manĝFok2Flavor": "֭ſɭw }ʃᴜ ɭʃɹ ſɭʞᴜɔ˞ ſ͔ɭɔ ſןɹ · ſᶘэ ſᶘɔⅎ ı],ɜ ı],ꞇͷ̗",
    "manĝTla0Flavor": "ſᶘᴜ ֭ſɭᴜͷ̗ ʌ ſ̀ȷᴜ ſɭɔͷ̗ ʌ ſɭɜ ſᶘɹᶗ‹ ʌ ɭ(ᴜ̭ꞇ · ɭʃэʞ ſɭɔ˞ɜⅎ",
    "manĝTla1Flavor": "ɭʃэ ſɭᶗ‹ɹ ſɟɔ ʌ ſɭᶗ‹ɹ ſɟɹ ᶅſᴜ · ſɭɜ ſᶘɹᶗ‹",
    "manĝTla2Flavor": "j͐ʃᴜ ŋᷠɹⰱ ſɭᶗ‹ɹ ſɟɔ ſɟɹ ſɟɹɔ˞ · j͐ʃɜ ɭʃᴜ ſȷᴜɔ˞ ᶅſɹ",
    // Building card labels from satalaj-konstruaĵoj.ts TIPARO
    "tipDomo": "ſɭᴜ ſןɹ",
    "tipMangxejo": "ſɭᴜ ſ͔ɭɔȝ",
    "tipKasafeo": "ſɭᴜ j͑ʃᴜ ſȷɔ",
    "tipStacioxipo": "ſɭᴜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ",
    "tipTuro": "ſןᴜȝ ᶅſw ſɭɹ",
    "tipSanktejo": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞",
    // Building card flavor text — ʌ separates complete words; spaces inside
    // dictionary compounds remain ordinary syllable separators.
    "flvDomo": "j͑ʃɜ ɭʃɹȝ ʌ ſ͔ɭɔƽ ʌ ɭʃᴜ }ʃɔƽ ʌ ֭ſɭɹɔ˞",
    "flvMangxejo": "j͑ʃᴜ ֭ſɭᴜƽ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭэ ı],ᴜʞ ʌ ı],ɹ ı],ɹȝ ʌ ꞁȷ̀ᴜ ſᶘɹ · ſȷэ ſȷɹ ʌ j͑ʃɹ ſȷᴜͷ̗",
    "flvKasafeo": "ʃᴜͷ̗ ʌ j͐ʃᴜ ſןɹͷ̗ ʌ j͑ʃᴜ ſȷɔ ʌ j͑ʃw ſɭʞɹȝ",
    "flvStacioxipo": "ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɟɔ ʌ ſɟᴜ }ʃᴜ ʌ ſɟꞇȝ ſɭᴜⰱ ʌ ɭʃᴜ ʃꞇ · ſɭw ſ̀ȷᴜ",
    "flvTuro": "ſȷͷ̗ᴜƽ ֭ſɭƨɔ ʌ ɭʃɜ ı],ɔƽ ʌ ɭʃэʞ",
    "flvSanktejo": "ſɭw ֭ſɭᴜͷ̗ ʌ j͑ʃɜȝ ɭʃɔ ʌ j͑ʃɹ j͑ʃ'ɔ }ʃꞇ ſᶘɜ ֭ſɭꞇ ʌ ſ͔ɭɹ",
    // Card stats labels from sperto.ts
    "statTieroj": "j͑ʃ'ɔ ŋᷠɹ",
    "statDiamanto": "ſɟꞇȝ ſɭᴜⰱ",
    "statJes": "ſɟᴜ",
    "statNe": "ſɭʞɜ",
    "statTipo": "֭ſɭᴜ ı],ɔ",
    "statPozicio": "ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ",
    // WebGL error from scena.ts
    "webglTitolo": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞",
    "webglMesagxo": "ſɟᴜ ſᶘɔ ɭl̀ɹȝ ſɭɜ ſɭw ſ̀ȷᴜ WebGL. ſɭᴜ ſᶘɔ ɭl̀ɹȝ ſɭɜ ſɭᴜ ſɭw ʃᴜ WebGL ʃэ ſɭɔ˞ᴜ ſɭᴜ ꞁȷ̀ɹ ʃᴜ ſɭᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſɭэ ɽ͑ʃ'ꞇ",
    "webglDetalo": "ꞁȷ̀ᴜƣ̋ ꞁȷ̀ᴜ }ʃꞇɔ˞ ſɭᴜ ſᶘɔ ɭl̀ɹȝ WebGL ʃэ ſɭᴜ ſɭw ʃᴜ ſɭᴜ ſɭэ ɽ͑ʃ'ꞇ. ſɟᴜ ſᶘɔ ɭl̀ɹȝ ſɭᴜ ſᶘɔ ɭl̀ɹȝ ſɟᴜ ſɭᴜ ŋᷠᴜ GPU",
    "webglReprovi": "ſɭᴜ ɭʃᴜ ſɭэ",
    // aria labels from index.html and sperto.ts
    "ariaNavButono": "}ʃɹ ɭʃᴜ j͑ʃɔ }ʃw",
    "ariaButInterakti": "ſɭɔ˞ꞇ ɽ͑ʃ'ɹ",
    "ariaButSalti": "ſןw",
    "ariaButSonoro": "ſɟᴜ ſᶘɹ }ʃᴜ j͑ʃᴜ ʃɜ j͑ʃᴜꞇ ʌ ʃɔ",
    "ariaButKrepusko": "ſɟᴜ ſᶘɹ }ʃᴜ j͑ʃᴜ ʃɜ j͑ʃᴜꞇ ʌ ſןw ſɭɜ ʃɔ j͑ʃƨꞇʞ",
    "ariaDuskRegilo": "ſןw ſɭɜ ʃɔ j͑ʃƨꞇʞ ʌ j͑ʃ'ɔ ŋᷠɹ",
    "ariaButPromeni": "ſɭᴜ ɭʃᴜ ʌ ֭ſɭɹɔ˞ ʌ j͐ʃɜ ɭʃᴜ",
    "ariaButBruo": "ſɟᴜ ſᶘɹ }ʃᴜ j͑ʃᴜ ʃɜ j͑ʃᴜꞇ ʌ ꞁȷ̀ɹ ɭʃɹͷ̗ ʌ ʃɔ",
    "ariaButOrbiti": "֭ſɭɹ j͑ʃɔ ʌ ſɭᴜ ɭl̀ɹ ɭʃɔ",
    "ariaButVesti": "ꞁȷ̀ᴜ ſ̀ȷɔ ʌ ſ̀ȷᴜȝ",
    "ariaButHelpi": "ſȷɔ ſɭ,ꞇ",
    "ariaButLingvo": "j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭᴜ ɭl̀ɹ ɭʃɔ ʌ ſ͔ɭᴜ ᶅſɔ",
    "ariaSupermetaFermi": "}ʃɔƣ̋ ꞁȷ̀ᴜ ſ̀ȷɔ",
    // Informo-panelo — tradukoj poste ( lasita malplena )
    "ariaInformButono": "ꞁȷ̀ᴜ ſ̀ȷɔ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ j͑ʃ'ɜ ſןɹ",
    "titoloInformo": "ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ j͑ʃ'ɜ ſןɹ",
    "subtitoloInformo": "ſןᴜȝ · ŋᷠɜⅎᶗ‹ · ɭ(ᴜͷ̗",
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
    "specBetulo": "j͐ʃᴜ ŋᷠɹⰱ",
    "flvSpecBetulo": "ſ͔ɭэ ʌ j͐ʃᴜ ŋᷠɹⰱ",
    "specLariko": "ɭʃᴜ ſɭɔ˞ᴜͷ̗",
    "flvSpecLariko": "ɭʃᴜ ſɭɔ˞ᴜͷ̗",
    "specHxsxaksxlefo": "ı],ͷ̗ɔʞ ֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ",
    "flvSpecHxsxaksxlefo": "ſᶘꞇ }ʃɔ ʌ ſןw }ʃᴜ ſ̀ȷᴜ ſɟɔ",
    "specFiliko": "ı],ᴜ ʃꞇ",
    "flvSpecFiliko": "j͐ʃᴜ̩ᴜ ʌ ɭl̀эƣ̋ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɟɔ ʌ ı],ᴜ ʃꞇ",
    "specPurpuraFiliko": "ı],ͷ̗ɔʞ ı],ᴜ ʃꞇ j͑ʃᴜꞇ",
    "flvSpecPurpuraFiliko": "ᶅſw ſɭɹ ʌ ſᶘꞇ }ʃɔ ʌ ı],ᴜ ʃꞇ",
    "specLikeno": "ꞁȷ̀ɹ ŋᷠᴜ",
    "flvSpecLikeno": "ꞁȷ̀ɹ ŋᷠᴜ ſɟэᶗ‹ ꞁȷ̀ᴜꞇ",
    "specHerbo": "ſȷɔ ſᶘᴜʞ",
    "flvSpecHerbo": "ſȷɔ ſᶘᴜʞ",
    "specMusko": "ſɟэᶗ‹",
    "flvSpecMusko": "ſɟэᶗ‹",
    "specCetkuo": "ſᶘɔ ɭʃƽɹ",
    "flvSpecCetkuo": "ᶅſw ſɭɹ ʌ ſᶘᴜ ſɭɔ",
    "specCakeo": "ſᶘᴜ ſɭɔ",
    "flvSpecCakeo": "j͐ʃɜ ʃɔ ʌ ſᶘᴜ ſɭɔ",
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
    "titoloAranis": "ARANIS · Ĥota-Ihis",
    "subtitoloUrbo": "Ĥota-Ihis · Kajite-Selamjov",
    "konsiloEnkonduko": "Trenu por rigardi · Alklaku spajron por notoj · Piediru por esplori · Aŭ · E por eniri kanuon",
    "eniri": "Eniri",
    "butonoPromeni": "PROMENI",
    "butonoOrbiti": "ORBITI",
    "butonoVestaro": "VESTARO",
    "butonoFermi": "Fermi",
    "priskriboPromeno": "Piedi tra la nebula valo",
    "priskriboOrbito": "Drivi tra la urba nebulo",
    "priskriboVestaro": "Malfermi vestaron",
    "butonoHelpo": "Helpo",
    "titoloTeksilo": "LA TEKSILO",
    "subtitoloTeksilo": "Longaj ĉemizoj · mallongaj manikoj · ĉefa kaj akcenta",
    "titoloSxargxo": "ARANIS",
    "sxargxaSubskribo": "Konstruante...",
    "sxargxaSatalo": "La zigurato leviĝas",
    "sxargxaTraboj": "Lignaj traboj krakas",
    "sxargxaNebulo": "Nebulo fluas tra la valo",
    "kompasoNordo": "N",
    "regiloOrbito": "Orbito · trenu por rigardi · alklaku por notoj",
    "regiloPromeno": "Promeni · WASD moviĝi · Shift por kuri · Spaco por salti",
    "regiloMovado": "WASD moviĝi · rapida piedo",
    "regiloEniri": "E por eniri/eliri · eniri konstruaĵon",
    "regiloMapo": "M por mapo",
    "regiloEliri": "Escape por eliri",
    "regiloSpajroj": "Alklaku spajrojn por legi notojn · eniri",
    "regiloVesto": "VESTO · ŝanĝi vian veston",
    "titoloVojoj": "VOJOJ DE LA VALO",
    "subtitoloHelpo": "Helpaj notoj pri la urbo",
    "titoloMapo": "MAPA DE ARANIS",
    "subtitoloMapo": "La tuta valo de supre",
    "actEliri": "eliri · Esc",
    "eliriKanuo": "por eliri kanuon",
    "regiloKanuo": "Kanua regado · WASD direkti",
    "eliri": "Eliri",
    "eniriKanuo": "Eniri kanuon",
    // Food action labels
    "actGusti": "Guŝu ·", "actTrinketi": "Trinketu ·",
    // Manĝaĵnomoj de la dosiero satalaj-konstruaĵoj.ts
    // ( derivitaj de la aih-a Gawekiif per la sonaj reguloj )
    // Gustotekstoj de la dosiero satalaj-konstruaĵoj.ts
    "manĝFok0Flavor": "Varma likena pano, malrapida anaso, faldon de vaporo.",
    "manĝFok1Flavor": "Malvarma glazuro kontraŭ riĉa viando · la arbaro elspiras.",
    "manĝFok2Flavor": "Malhela pipro mordas · la bulko respondas dolĉe.",
    "manĝTla0Flavor": "Vinagro, lakto, mento, brileto · hela akordo.",
    "manĝTla1Flavor": "Sukero super acido · mento sube.",
    "manĝTla2Flavor": "Betula sudfrosto · la valo en glaso.",
    // Building card labels
    "tipDomo": "Kapuo",
    "tipMangxejo": "Kahxjenko",
    "tipKasafeo": "Kasafeo",
    "tipStacioxipo": "Kosmopordo",
    "tipTuro": "Veuxkupanko",
    "tipSanktejo": "Sanktejo",
    // Building flavor text
    "flvDomo": "Kvietaj ĉambroj stakitaj al la nebulo.",
    "flvMangxejo": "Longaj fajrujoj, komunaj bovloj, vaporo kaj rakonto.",
    "flvKasafeo": "Voĉoj kuniĝas por paroli kaj decidi.",
    "flvStacioxipo": "Super la arbaro la ĉiel-diamanto atendas. Eniru por leviĝi.",
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
    "ariaButBruo": "Ŝalti la fonan bruon",
    "ariaButOrbiti": "Orbiti ĉirkaŭ la urbo",
    "ariaButVesti": "Malfermi vestaron",
    "ariaButHelpi": "Helpo",
    "ariaButLingvo": "Ŝanĝi la lingvon de la urbo",
    "ariaSupermetaFermi": "Fermi",
    // Informo-panelo ( konstruaĵoj · manĝaĵoj · specioj )
    "ariaInformButono": "Malfermi informojn",
    "titoloInformo": "INFORMOJ",
    "subtitoloInformo": "Konstruaĵoj · manĝaĵoj · specioj",
    "tabKonstruajxoj": "KONSTRUAĴOJ",
    "tabMangxajxoj": "MANĜAĴOJ",
    "tabSpecioj": "SPECIOJ",
    // Bestoj kaj plantoj de la valo ( el bestoj.ts kaj vegetajxo.ts )
    "grupoBesto": "BESTO",
    "grupoPlanto": "PLANTO",
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
    "specBetulo": "Betulo",
    "flvSpecBetulo": "La blankŝela betularo de la valo.",
    "specLariko": "Lariko",
    "flvSpecLariko": "Alpina konifero kun aŭtuna orflava pinglaro.",
    "specHxsxaksxlefo": "Ĥŝakŝlefo",
    "flvSpecHxsxaksxlefo": "Purpura laktuk-arbo kun kurbiĝintaj folioj.",
    "specFiliko": "Filiko",
    "flvSpecFiliko": "Verda filiko de la arbara grundo.",
    "specPurpuraFiliko": "Ŝafiŝlefo",
    "flvSpecPurpuraFiliko": "Alta purpura filiko de la ekstera arbaro.",
    "specLikeno": "Likeno",
    "flvSpecLikeno": "Krusta likeno sterniĝanta sur ŝtonoj kaj arboj.",
    "specHerbo": "Herbo",
    "flvSpecHerbo": "Maldensa herbaro inter la arboj.",
    "specMusko": "Musko",
    "flvSpecMusko": "Muska monteto apud la arboj.",
    "specCetkuo": "Cetkuo",
    "flvSpecCetkuo": "Alta senbranĉa skurĝa kano kun strobiloj.",
    "specCakeo": "Cakeo",
    "flvSpecCakeo": "Granda branĉet-kirla ĉevalvosto ĉe la lagrando.",
    // Aria label for dusk toggle
    "ariaButKrepusko": "Ŝalti krepuskan reĝimon",
    "ariaDuskRegilo": "Krepuska nivelo",
    // ariaTrakoN: derivitaj ( prefikso + derivita trakonomo )
    // Canvas alt text
    "altTitolaSkripto": "Aranis skribita en la zigurata skribo",
    // Clothing names
    "vestoVerdant": "Verdanta Korto — Ĉihes Verdo",
    "vestoHearth": "Fajruja Gardanto — Ĥeles Verda",
    "vestoMist": "Nebula Palto — Ihis Verda",
    "vestoEmber": "Brusta Gardanto — Ĥeles Bruna",
    // Konstruaĵnomoj ( paqN ): derivitaj de la aih-a Gawekiif per la sonaj
    // reguloj ( src/sonaj-reguloj.ts ) — nur la intencaj nomoj restas ĉi tie.
    "paq31": "Kapace",
    "paq32": "Kadal",
    "paq33": "Kosmopordo",
    // Trakonomoj ( trakoN ): derivitaj de la aih-a Gawekiif per la sonaj reguloj.
    "muziko": "Muziko",
  },
  en: {
    // Proper English translations for all UI strings
    // Phonetic transcriptions ( of aih ) used only for custom names ( vesto * )
    "titoloAranis": "ARANIS · Lhota-Ihis",
    "subtitoloUrbo": "Lhota-Ihis · Kajiite-Selamyov",
    "konsiloEnkonduko": "Drag to look · Click a spire for notes · Walk to explore · or · E to canoe",
    "eniri": "Enter",
    "butonoPromeni": "WALK",
    "butonoOrbiti": "ORBIT",
    "butonoVestaro": "WARDROBE",
    "butonoFermi": "Close",
    "priskriboPromeno": "Walk through the misty vale",
    "priskriboOrbito": "Drift through the city mist",
    "priskriboVestaro": "Open wardrobe",
    "butonoHelpo": "Help",
    "titoloTeksilo": "THE LOOM",
    "subtitoloTeksilo": "Long shirts · short sleeves · main and accent",
    "titoloSxargxo": "ARANIS",
    "sxargxaSubskribo": "Building...",
    "sxargxaSatalo": "The ziggurat rises",
    "sxargxaTraboj": "Wooden beams creak",
    "sxargxaNebulo": "Mist flows through the vale",
    "kompasoNordo": "N",
    "regiloOrbito": "Orbit · drag to look · click for notes",
    "regiloPromeno": "Walk · WASD to move · Shift to run · Space to jump",
    "regiloMovado": "WASD to move · brisk walk",
    "regiloEniri": "E to enter/exit · enter building",
    "regiloMapo": "M for map",
    "regiloEliri": "Escape to exit",
    "regiloSpajroj": "Click spires to read notes · enter",
    "regiloVesto": "WARDROBE · change your outfit",
    "titoloVojoj": "PATHS OF THE VALE",
    "subtitoloHelpo": "Helpful notes about the city",
    "titoloMapo": "MAP OF ARANIS",
    "subtitoloMapo": "The whole vale from above",
    "actEliri": "exit · Esc",
    "eliriKanuo": "to exit canoe",
    "regiloKanuo": "Canoe controls · WASD to steer",
    "eliri": "Exit",
    "eniriKanuo": "Enter canoe",
    // Food action labels
    "actGusti": "Taste ·", "actTrinketi": "Sip ·",
    // Manĝaĵnomoj de la dosiero satalaj-konstruaĵoj.ts
    // ( derivitaj de la aih-a Gawekiif per la sonaj reguloj )
    // Gustotekstoj de la dosiero satalaj-konstruaĵoj.ts
    "manĝFok0Flavor": "Warm lichen bread, slow duck, a fold of steam.",
    "manĝFok1Flavor": "Cool glaze against rich meat · the forest exhales.",
    "manĝFok2Flavor": "Dark pepper bites · the bun answers sweet.",
    "manĝTla0Flavor": "Vinegar, milk, mint, sparkle · a bright chord.",
    "manĝTla1Flavor": "Amber over acid · mint underneath.",
    "manĝTla2Flavor": "Birch-sap frost · the vale in a glass.",
    // Building card labels
    "tipDomo": "Kappih",
    "tipMangxejo": "Kahyeng",
    "tipKasafeo": "Kahsaffeh",
    "tipStacioxipo": "Kakrhahsesharh",
    "tipTuro": "Pang Wukkih",
    "tipSanktejo": "Sanctuary",
    // Building flavor text
    "flvDomo": "Quiet rooms stacked into the mist.",
    "flvMangxejo": "Long hearths, common bowls, steam and story.",
    "flvKasafeo": "Voices gather to speak and decide.",
    "flvStacioxipo": "Above the forest the sky-diamond waits. Enter to ascend.",
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
    "ariaButBruo": "Toggle background noise",
    "ariaButOrbiti": "Orbit around the city",
    "ariaButVesti": "Open wardrobe",
    "ariaButHelpi": "Help",
    "ariaButLingvo": "Change the city language",
    "ariaSupermetaFermi": "Close",
    // Information panel ( buildings · food · species )
    "ariaInformButono": "Open information",
    "titoloInformo": "INFORMATION",
    "subtitoloInformo": "Buildings · food · species",
    "tabKonstruajxoj": "BUILDINGS",
    "tabMangxajxoj": "FOOD",
    "tabSpecioj": "SPECIES",
    // The animals and plants of the vale ( from bestoj.ts and vegetajxo.ts )
    "grupoBesto": "ANIMAL",
    "grupoPlanto": "PLANT",
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
    "specBetulo": "Birch",
    "flvSpecBetulo": "The white-barked birch of the vale.",
    "specLariko": "Larch",
    "flvSpecLariko": "An alpine conifer with golden autumn needles.",
    "specHxsxaksxlefo": "Shlef Hshaku",
    "flvSpecHxsxaksxlefo": "A purple lettuce-tree with curled leaves. Used to make vinegar.",
    "specFiliko": "Fern",
    "flvSpecFiliko": "A green fern of the forest floor.",
    "specPurpuraFiliko": "Shlef Shawhisu",
    "flvSpecPurpuraFiliko": "A tall purple fern that grows into a large tree.",
    "specLikeno": "Lichen",
    "flvSpecLikeno": "Crusty lichen spreading over stones and trees.",
    "specHerbo": "Grass",
    "flvSpecHerbo": "Sparse grass among the trees.",
    "specMusko": "Moss",
    "flvSpecMusko": "A mossy mound beside the trees.",
    "specCetkuo": "Horsetail",
    "flvSpecCetkuo": "A tall unbranched scouring rush with strobili.",
    "specCakeo": "Tsakeh",
    "flvSpecCakeo": "Great branch-whorled horsetails at the lakeshore.",
    // Aria label for dusk toggle
    "ariaButKrepusko": "Toggle dusk mode",
    "ariaDuskRegilo": "Dusk level",
    // ariaTrakoN: derived ( prefix + derived track name )
    // Canvas alt text
    "altTitolaSkripto": "Aranis written in the ziggurat script",
    // Clothing names
    "vestoVerdant": "Ihis Verdan — Verdant Court",
    "vestoHearth": "Kheles Verdan — Hearthguard",
    "vestoMist": "Ihis Verdan — Mistcloak",
    "vestoEmber": "Kheles Brunan — Emberguard",
    // Building names ( en ): derived AT RUNTIME from the aih Gawekiif via the
    // sound rules ( src/sonaj-reguloj.ts, ported from iloj/sonaj-reguloj.py ) —
    // see deriviEnKonstruajxon() in traduki(). Only deliberate names stay here:
    // bldg31/32 ( garden names ) and bldg33 ( the space station: translated
    // compound, not a transliteration ).
    "paq31": "Kapace",
    "paq32": "Kadal",
    "paq33": "Skygate",
    // Trakonomoj ( trakoN ): derivitaj de la aih-a Gawekiif per la sonaj reguloj.
    "muziko": "Music",
  },
  ja: {
    // Proper Japanese translations for all UI strings
    // Phonetic transcriptions ( of aih ) used only for custom names ( vesto * )
    "titoloAranis": "アラニス · ロタ・イーヒス",
    "subtitoloUrbo": "ロタ・イーヒス · カジーテ・セラーミョヴ",
    "konsiloEnkonduko": "ドラッグして見る · 尖塔をクリックでノート · 歩いて探索 · または · Eでカヌー",
    "eniri": "入る",
    "butonoPromeni": "歩く",
    "butonoOrbiti": "周回",
    "butonoVestaro": "ワードローブ",
    "butonoFermi": "閉じる",
    "priskriboPromeno": "霧の谷を歩く",
    "priskriboOrbito": "都市の霧を漂う",
    "priskriboVestaro": "ワードローブを開く",
    "butonoHelpo": "ヘルプ",
    "titoloTeksilo": "ザ・ルーム",
    "subtitoloTeksilo": "長いシャツ · 短い袖 · メインとアクセント",
    "titoloSxargxo": "アラニス",
    "sxargxaSubskribo": "建造中...",
    "sxargxaSatalo": "ジッグラトが昇る",
    "sxargxaTraboj": "木の梁が軋む",
    "sxargxaNebulo": "霧が谷に流れる",
    "kompasoNordo": "北",
    "regiloOrbito": "周回 · ドラッグして見る · クリックでノート",
    "regiloPromeno": "歩く · WASDで移動 · Shiftで走る · Spaceでジャンプ",
    "regiloMovado": "WASDで移動 · 早足",
    "regiloEniri": "Eで出入り · 建物に入る",
    "regiloMapo": "Mでマップ",
    "regiloEliri": "Escapeで出る",
    "regiloSpajroj": "尖塔をクリックでノート · 入る",
    "regiloVesto": "ワードローブ · 服を変える",
    "titoloVojoj": "谷の小道",
    "subtitoloHelpo": "街のヘルプノート",
    "titoloMapo": "アラニスの地図",
    "subtitoloMapo": "谷全体を上から見る",
    "actEliri": "出る · Esc",
    "eliriKanuo": "カヌーを出る",
    "regiloKanuo": "カヌー操作 · WASDで操縦",
    "eliri": "出る",
    "eniriKanuo": "カヌーに乗る",
    // Food action labels
    "actGusti": "味見 ·", "actTrinketi": "一口 ·",
    // Manĝaĵnomoj de la dosiero satalaj-konstruaĵoj.ts
    // ( derivitaj de la aih-a Gawekiif per la sonaj reguloj )
    // Gustotekstoj de la dosiero satalaj-konstruaĵoj.ts
    "manĝFok0Flavor": "Warm lichen bread, slow duck, a fold of steam.",
    "manĝFok1Flavor": "Cool glaze against rich meat · the forest exhales.",
    "manĝFok2Flavor": "Dark pepper bites · the bun answers sweet.",
    "manĝTla0Flavor": "Vinegar, milk, mint, sparkle · a bright chord.",
    "manĝTla1Flavor": "Amber over acid · mint underneath.",
    "manĝTla2Flavor": "Birch-sap frost · the vale in a glass.",
    // Building card labels
    "tipDomo": "カプオ",
    "tipMangxejo": "カヘンコ",
    "tipKasafeo": "カサフェオ",
    "tipStacioxipo": "宇宙港",
    "tipTuro": "ヴェウクパンコ",
    "tipSanktejo": "聖域",
    // Building flavor text
    "flvDomo": "霧の中に積み重なった静かな部屋。",
    "flvMangxejo": "長い暖炉、共通の鉢、蒸気と物語。",
    "flvKasafeo": "声が集まり、語り、決める。",
    "flvStacioxipo": "森の上で空のダイヤが待つ。入って昇ろう。",
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
    "ariaButBruo": "背景ノイズを切り替え",
    "ariaButOrbiti": "街の周りを周回",
    "ariaButVesti": "ワードローブを開く",
    "ariaButHelpi": "ヘルプ",
    "ariaButLingvo": "言語を変更",
    "ariaSupermetaFermi": "閉じる",
    // 情報パネル ( 建物 · 食べ物 · 種族 )
    "ariaInformButono": "情報を開く",
    "titoloInformo": "情報",
    "subtitoloInformo": "建物 · 食べ物 · 種族",
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
    "flvSpecBetulo": "谷の白樺。",
    "flvSpecLariko": "秋に黄金色の針葉を持つ高山性の針葉樹。",
    "flvSpecHxsxaksxlefo": "紫色のレタスの木。巻いた葉を持ち、酢作りに使う。",
    "flvSpecFiliko": "森の地面に生える緑のシダ。",
    "flvSpecPurpuraFiliko": "外側の森に生える高い紫色のシダ。",
    "flvSpecLikeno": "石や木に広がる硬い地衣。",
    "flvSpecHerbo": "木々の間にまばらに生える草。",
    "flvSpecMusko": "木々のそばの苔むした小山。",
    "flvSpecCetkuo": "胞子嚢を持つ、高く枝分かれしないトクサ。",
    "flvSpecCakeo": "湖岸に生える、大きく枝が輪生するトクサ。",
    // Aria label for dusk toggle
    "ariaButKrepusko": "夕暮れモードを切り替え",
    "ariaDuskRegilo": "夕暮れのレベル",
    // ariaTrakoN: 派生 ( 接頭辞 + 派生したトラック名 )
    // Canvas alt text
    "altTitolaSkripto": "Aranisのジッグラト文字",
    // Clothing names
    "vestoVerdant": "イヒス ヴェルダン — ヴェルダンコート",
    "vestoHearth": "ケレス ヴェルダン — ハースガード",
    "vestoMist": "イヒス ヴェルダン — ミストクローク",
    "vestoEmber": "ケレス ブルナン — エンバーガード",
    // Konstruaĵnomoj ( paqN ): derivitaj de la aih-a Gawekiif per la sonaj
    // reguloj ( src/sonaj-reguloj.ts ) — nur la intencaj nomoj restas ĉi tie.
    "paq31": "カパチェ",
    "paq32": "カダル",
    "paq33": "宇宙門",
    // Trakonomoj ( trakoN ): derivitaj de la aih-a Gawekiif per la sonaj reguloj.
    "muziko": "音楽",
  },
  km: {
    // Khmer (Cambodian) translations for all UI strings
    // Phonetic approximations in Khmer script for custom names
    "titoloAranis": "អរ៉ានីស · ឡូតា-អ៊ីហ៊ីស",
    "subtitoloUrbo": "ឡូតា-អ៊ីហ៊ីស · កាជីតេ-សេឡាមយ៉ូវ",
    "konsiloEnkonduko": "អូសដើម្បីមើល · ចុចប៉មសម្រាប់កំណត់ត្រា · ដើរដើម្បីរុករក · ឬ · E សម្រាប់ទូក",
    "eniri": "ចូល",
    "butonoPromeni": "ដើរ",
    "butonoOrbiti": "ទស្សនា",
    "butonoVestaro": "សម្លៀកបំពាក់",
    "butonoFermi": "បិទ",
    "priskriboPromeno": "ដើរកាត់ជ្រលងអ័ព្ទ",
    "priskriboOrbito": "អណ្តែតកាត់អ័ព្ទទីក្រុង",
    "priskriboVestaro": "បើកសម្លៀកបំពាក់",
    "butonoHelpo": "ជំនួយ",
    "titoloTeksilo": "តម្បាញ",
    "subtitoloTeksilo": "អាវវែង · ដៃខ្លី · ពណ៌ចម្បង និង ពណ៌បន្ទាប់",
    "titoloSxargxo": "អរ៉ានីស",
    "sxargxaSubskribo": "កំពុងសាងសង់...",
    "sxargxaSatalo": "ហ្សីហ្គូរ៉ាត់កំពុងឡើង",
    "sxargxaTraboj": "ធ្នឹមឈើកំពុងគ្រាំ",
    "sxargxaNebulo": "អ័ព្ទហូរកាត់ជ្រលង",
    "kompasoNordo": "ជ",
    "regiloOrbito": "ទស្សនា · អូសដើម្បីមើល · ចុចសម្រាប់កំណត់ត្រា",
    "regiloPromeno": "ដើរ · WASD ដើម្បីផ្លាស់ទី · Shift ដើម្បីរត់ · Space ដើម្បីលោត",
    "regiloMovado": "WASD ដើម្បីផ្លាស់ទី · ដើរលឿន",
    "regiloEniri": "E ដើម្បីចូល/ចេញ · ចូលអាគារ",
    "regiloMapo": "M សម្រាប់ផែនទី",
    "regiloEliri": "Escape ដើម្បីចេញ",
    "regiloSpajroj": "ចុចប៉មដើម្បីអានកំណត់ត្រា · ចូល",
    "regiloVesto": "សម្លៀកបំពាក់ · ប្តូរសំលៀកបំពាក់របស់អ្នក",
    "titoloVojoj": "ផ្លូវនៃជ្រលង",
    "subtitoloHelpo": "កំណត់ត្រាជំនួយអំពីទីក្រុង",
    "titoloMapo": "ផែនទីអារ៉ានីស",
    "subtitoloMapo": "ជ្រលងទាំងមូលពីលើ",
    "actEliri": "ចេញ · Esc",
    "eliriKanuo": "ដើម្បីចេញពីទូក",
    "regiloKanuo": "ការគ្រប់គ្រងទូក · WASD ដើម្បីបង្វែរ",
    "eliri": "ចេញ",
    "eniriKanuo": "ចូលទូក",
    // Food action labels
    "actGusti": "ភ្លក់ ·", "actTrinketi": "ផឹក ·",
    // Manĝaĵnomoj de la dosiero satalaj-konstruaĵoj.ts
    // ( derivitaj de la aih-a Gawekiif per la sonaj reguloj )
    // Gustotekstoj de la dosiero satalaj-konstruaĵoj.ts
    "manĝFok0Flavor": "Warm lichen bread, slow duck, a fold of steam.",
    "manĝFok1Flavor": "Cool glaze against rich meat · the forest exhales.",
    "manĝFok2Flavor": "Dark pepper bites · the bun answers sweet.",
    "manĝTla0Flavor": "Vinegar, milk, mint, sparkle · a bright chord.",
    "manĝTla1Flavor": "Amber over acid · mint underneath.",
    "manĝTla2Flavor": "Birch-sap frost · the vale in a glass.",
    // Building card labels
    "tipDomo": "កាពួ",
    "tipMangxejo": "កាហ្ចេនក៏",
    "tipKasafeo": "កាសាហ្វេអូ",
    "tipStacioxipo": "កំពង់ផែអវកាស",
    "tipTuro": "វ៉េកូប៉ាងកូ",
    "tipSanktejo": "ទីសក្ការៈ",
    // Building flavor text
    "flvDomo": "បន្ទប់ស្ងាត់ៗដាក់តម្រៀបក្នុងអ័ព្ទ។",
    "flvMangxejo": "ចើងរកាភ្លើងវែង ចានសាមញ្ញ ចំហាយនិងរឿងរ៉ាវ។",
    "flvKasafeo": "សំឡេងជួបជុំដើម្បីនិយាយ និងសម្រេចចិត្ត។",
    "flvStacioxipo": "ពេជ្រមេឃរង់ចាំពីលើព្រៃ។ ចូលដើម្បីឡើងទៅ។",
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
    "ariaButBruo": "ប្តូរសំឡេងផ្ទៃខាងក្រោយ",
    "ariaButOrbiti": "ទស្សនាជុំវិញទីក្រុង",
    "ariaButVesti": "បើកសម្លៀកបំពាក់",
    "ariaButHelpi": "ជំនួយ",
    "ariaButLingvo": "ប្តូរភាសាទីក្រុង",
    "ariaSupermetaFermi": "បិទ",
    // ផ្ទាំងព័ត៌មាន ( អាគារ · អាហារ · ប្រភេទ )
    "ariaInformButono": "បើកព័ត៌មាន",
    "titoloInformo": "ព័ត៌មាន",
    "subtitoloInformo": "អាគារ · អាហារ · ប្រភេទ",
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
    "flvSpecBetulo": "ដើមប៊ីចសំបកសនៅជ្រលង។",
    "flvSpecLariko": "ដើមឈើម្ជុលភ្នំ មានម្ជុលពណ៌មាសនៅរដូវស្លឹកឈើជ្រុះ។",
    "flvSpecHxsxaksxlefo": "ដើមសាឡាត់ពណ៌ស្វាយ មានស្លឹករមួល ហើយប្រើធ្វើទឹកខ្មេះ។",
    "flvSpecFiliko": "ហ្វឺនពណ៌បៃតងនៅលើដីព្រៃ។",
    "flvSpecPurpuraFiliko": "ហ្វឺនពណ៌ស្វាយខ្ពស់នៅព្រៃខាងក្រៅ។",
    "flvSpecLikeno": "លីចេនរឹង រាលដាលលើថ្មនិងដើមឈើ។",
    "flvSpecHerbo": "ស្មៅដុះរាយប៉ាយនៅចន្លោះដើមឈើ។",
    "flvSpecMusko": "គំនរស្លែនៅក្បែរដើមឈើ។",
    "flvSpecCetkuo": "រុក្ខជាតិខ្ពស់គ្មានមែក មានកោនគ្រាប់ពូជ។",
    "flvSpecCakeo": "រុក្ខជាតិខ្ពស់មានមែកជុំវិញ ដុះនៅមាត់បឹង។",
    // Aria label for dusk toggle
    "ariaButKrepusko": "ប្តូររបៀបព្រលប់",
    "ariaDuskRegilo": "កម្រិតព្រលប់",
    "ariaTrako0": "ជ្រើសរើសបទ 1 ſןw ſןᴜɔ˞ ɭʃꞇʞ ᶅſɔ",
    // ariaTrakoN: បានដកស្រង់ ( បុព្វបទ + ឈ្មោះបទដកស្រង់ )
    // Canvas alt text
    "altTitolaSkripto": "អរ៉ានីសសរសេរជាអក្សរហ្សីហ្គូរ៉ាត់",
    // Clothing names ( phonetic approximations in Khmer script )
    "vestoVerdant": "អ៊ីហ៊ីស វែរដាន់ · វែរដាន់កូត",
    "vestoHearth": "ខេឡេស វែរដាន់ · ហាតហ្គាដ",
    "vestoMist": "អ៊ីហ៊ីស វែរដាន់ · មីសខ្លូក",
    "vestoEmber": "ខេឡេស ប្រូណាន់ · អេមបឺហ្គាដ",
    // Konstruaĵnomoj ( paqN ): derivitaj de la aih-a Gawekiif per la sonaj
    // reguloj ( src/sonaj-reguloj.ts ) — nur la intencaj nomoj restas ĉi tie.
    "paq31": "កាប៉ាចេ",
    "paq32": "កាដាល",
    "paq33": "ទ្វារមេឃ",
    // Trakonomoj ( trakoN ): derivitaj de la aih-a Gawekiif per la sonaj reguloj.
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

function deriviNomon(klavo: string): string | null {
  if (aktivaLingvo === "aih") return null;
  // ariaTrakoN: prefikso ( lingvo-specifa ) + derivita trakonomo.
  // spec*: mankas rekta ja/km-ŝnuro por la specifaj plantnomoj, do ili ankaŭ
  // venas el la aih-formo per la samaj sonaj reguloj.
  const aria = /^ariaTrako(\d+)$/.exec(klavo);
  const bazo = aria ? "trako" + aria[1] : klavo;
  if (!/^(paq|trako|manĝFok|manĝTla)\d+$/.test(bazo) && !SPECIFIKAJ_PLANTNOMOJ.has(bazo)) return null;
  const aihFormo = skakefani.aih[bazo];
  if (!aihFormo) return null;
  // Manĝaĵnomoj kunhavas "·" disigilon ( nomo · gusto ): derivu ĉiun flankon
  // aparte, por ke la disigilo kaj spacoj postvivu la konverton.
  const nomo = aihFormo
    .split("·")
    .map(p => ipaAlLingvo(gkAlIpa(p.trim()), aktivaLingvo))
    .join(" · ");
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
