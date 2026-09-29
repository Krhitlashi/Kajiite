// ≺⧼ La mezuroj de la figuro 📏 ⧽≻
// La mezuroj de la figuro — la samaj nombroj por la geometrio kaj por la
// kanvasaj teksturoj ( konstruiFiguron kaj la pentristoj ). Ĉiu kanvaso montras
// sian vestparton de supre malsupren, do la pentrado bezonas la mondajn limojn
// de la parto; antaŭe tiuj nombroj vivis dise kaj povis disiĝi. La korpaj
// mejloŝtonoj — la mondaj altoj de la maleolo ĝis la krono — ankaŭ vivas ĉi tie.

// ⟪ La mezuroj de la figuro 📏 ⟫ — la SAMaj nombroj por la geometrio kaj por la
// kanvasaj teksturoj. Ĉiu kanvaso montras sian vestparton de SUPRE malsupren
// ( la vico 0 estas la plej supra ), do la pentrado bezonas la mondajn limojn de
// la parto. Antaŭe tiuj nombroj vivis dise ( en la geometrio, en la pentrado kaj
// en la antaŭrigardoj ) kaj povis disiĝi — nun ili estas skribitaj unufoje.
export const ROB_Y_MALSUPRO = 0o7/0o16;                 // 0.4375 — la suba rando de la robo ( sub la genuo )
// ⟨ La robo finiĝas sub la mentono 📃 ⟩ — la kolumo sidas ĉe 1.3906, la kolo
// ( 1.375 ĝis 1.531 ) videblas kaj la rando restas la rando de la ĉemizo. Kun
// pli granda alto la kolumo kovrus la buŝon kaj la mentonon ( la kapo finiĝas ĉe
// 1.453 ) kaj la figuro aspektus kiel en tro larĝa skafandro.
// ⟪ La korpaj mejloŝtonoj 📏 ⟫ — la mondaj altoj, de la grundo supren : la
// maleolo 0.09375, la genuo 0.5, la ingveno 0.8359, la kokso ( la pivoto de la
// kruroj ) 0.9297, la talio ( la pivoto de la tuko ) 1.0781, la ŝultro 1.4219,
// la bazo de la kolo 1.4531, la krono 1.797. La kruroj do mezuras 0.5 de la
// tuta alto — la proporcio de vera homo ( antaŭe 0.31, do la figuro similis al
// stango kun kapo ), la talio sidas je 0.6 kaj la ŝultro je 0.79.
// ⟨ La mantelo PLILONGIĜIS 📃 ⟩ — la kruroj PLILONGIS ( la kokso supreniris de
// 0.5625 al 0.9297, vidu la torso-ringojn ), do la mantela alto ne plu povas esti
// 1 : kun la malnova rando ( 0.3906 ) la mantelo falus ĝis la mezo de la tibio.
// La rando sidas ĉe 0.5469 ( ĝuste super la genuo ) por iom da tempo, sed la
// stilo volas PLI longan mantelon : nun ĝi mezuriĝas de la rando 0.4375 ( 0.0625
// sub la genuo, do meze de la tibio ) ĝis la kolumo 1.390625. Sub ĝi restas
// ankoraŭ 0.125 da videbla pantalono antaŭ la bota rando ( 0.3125 ), do la
// mantelo legiĝas longa sen kaŝi la botojn.
export const ROB_ALTO = 0o75/0o100;                     // 0.953125
// ROB_PROFUNDO — Kiom PROFUNDA estas la robo rilate al sia larĝo. Homo estas pli
// mallarĝa de antaŭe malantaŭen ol dekstre maldekstren, sed la robo estis
// PERFEKTA CIRKLO — de supre ĝi legiĝis kiel granda disko kaj la figuro aspektis
// dika. La tuta vesto do multiplikas la profundecon per ĉi tiu nombro kaj la
// sekco iĝas elipso. La sama nombro validas por la robo kaj por la interna
// ĉemizo, ĉar la du tavoloj devas sekvi la saman sekcon.
// ⟨ 0.8, ne 0.75 📃 ⟩ — la torso mem estas elipso de ĉirkaŭ 0.75 ( larĝo 0.28,
// profundo 0.25 ĉe la brusto ), sed la vesto devas lasi SPACON antaŭ ĝi — la robo
// ruliĝas ĉirkaŭ la zono dum ĉiu paŝo ( vidu marŝSwingon ) kaj glitas antaŭen-
// malantaŭen ĉirkaŭ 0.013 ĉe la ŝultroj. Kun 0.75 la ĉemizo havis nur 0.015 da
// profunda spaco kaj la brusto trapikis ĝin ĉe la rando de la antaŭa malfermaĵo.
export const ROB_PROFUNDO = 0o4/0o5;                    // 0.8 — la profundo rilate al la larĝo
// La interna ĉemizo sekvas la robon — ĝi komenciĝas iomete super la suba rando
// de la robo, kaj supre ĝi NE finiĝas per horizontala tranĉo sed per KOLUMO.
// ⟨ La ĉemizo ĉirkaŭas la kolon 📃 ⟩ — antaŭe ĝia supra rando estis tranĉo ĉe la
// ŝultra linio ( 1.391 ), do la ŝultroj restis nudaj kaj la ĉemizo legiĝis kiel
// tubo sen kolumo. Nun la ŝtofo supreniras super la ŝultrojn kaj finiĝas per
// mallonga kolumo ĉirkaŭ la kolo ( 1.46875, ĝuste sub la mentono ) — la sama
// konstruo kiel vera ĉemizo sub mantelo.
// ⟨ La kolumo estas RONDA 📃 ⟩ — la kolo de la homa modelo estas CILINDRO
// ( 0.125 malsupre, 0.109 supre, vidu la kolon en figurajGeometriojn ), do elipsa
// kolumo ( la profundo 0.75 de la larĝo ) ne povus ĉirkaŭi ĝin: antaŭe kaj
// malantaŭe ĝi trapikus la kolon. La kolumaj ringoj do portas sian propran,
// preskaŭ rondan profundon kaj staras 0.02 … 0.03 for de la kolo ( vidu
// kreiInternanSxelon ) — kolumo kiu tuŝas la haŭton legiĝas kiel kudro.
// La kanvasa pentrado uzas ĉi tiujn limojn
// ( vidu pentriInternan ), do la motivoj restas vicigitaj en la mondo.
// ⟨ La ĉemizo MALLONGIĜIS 📃 ⟩ — antaŭe ĝia tuko sekvis la roban randon ( 0.4475,
// nur 0.01 super ĝi ), do la du tavoloj finiĝis preskaŭ kune kaj la rigardo ne
// apartigis ilin. Nun la tuko sidas ĉe 0.578 — klare SUPER la roba rando ( 0.4375,
// do 0.14 da videbla pantalono inter ili ) — kaj ĝia antaŭa parto leviĝas al
// 0.678 ( vidu TUKA_LEVO ), do tra la antaŭa malfermaĵo de la robo oni vidas la
// internan ĉemizon finiĝi alte kaj la pantalonon sub ĝi.
export const INTERNO_Y_MALSUPRO = 0o45/0o100;                   // 0.578125 — la tuko
export const INTERNO_Y_SUPRO = 0o274/0o200;                     // 1.46875 — la pinto de la kolumo
export const INTERNO_ALTO = INTERNO_Y_SUPRO - INTERNO_Y_MALSUPRO;   // 1.068125
// INTERNO_PIVOTO_Y — La alto de la pivoto de la interna ĉemizo. La ĉemizo pendas
// de la ŜULTROJ, ne de la zono — tiel la tuko svingiĝas 0.84 po radiano dum la
// kolumo kaj la ŝultroj apenaŭ moviĝas. La ŝultro-kovrilo de la ĉemizo estas
// ELIPSO ( 0.1875 larĝe, 0.158 profunde ) dum la ŝultro de la torso estas preskaŭ
// RONDO ( 0.171 en la diagonalo ), do la du formoj kuntuŝiĝas tie — turno ĉirkaŭ la
// zono movus la ŝultrojn 0.33 kaj la ĉemizo trapikus la mantelon per 0.007
// ( vidu marŝSvingon ). La pivoto do sidas sur la ŝultra linio, sur la sama alto
// kiel la lasta kovrila ringo de la ĉemizo.
export const INTERNO_PIVOTO_Y = 0o133/0o100;            // 1.421875 — la ŝultra linio
export const KAPA_Y = 0o15/0o10;                        // 1.625 — la centro de la kapo
// KOLO_Y — la alto de la kolo ( kaj do la pivoto de la kapo-grupo ). La kapo, la
// vizaĝo kaj la haroj turniĝas ĉirkaŭ ĉi tiu punkto, do la kapo povas kliniĝi
// kontraŭ la paŝoj anstataŭ esti rigida parto de la korpo.
export const KOLO_Y = 0o135/0o100;                      // 1.453125 — la bazo de la kolo
export const SASA_Y = 0o212/0o200;                      // 1.078125 — la zono ( la plej mallarĝa torso-ringo )
// MALEOLO_Y — la alto de la maleolo rilate al la koksa grupo de la kruro. La
// piedo turniĝas ĉirkaŭ ĉi tiu punkto dum la paŝo ( la ruliĝo de la plando ), do
// ĝi kongruas kun la plej alta sekco de la bota piedo ( vidu kreiBotan ).
export const MALEOLO_Y = -0o64/0o200;                   // −0.40625 — la genuo ( 0.5 ) supren 0.09375
// KUBUTO_Y — la alto de la kubuto rilate al la ŝultro-pivoto. La brako kaj la
// maniko disiĝas ĉi tie en du partojn ( vidu kreiKorpanBrakon kaj
// figurajGeometriojn ), kaj la antaŭbrako turniĝas ĉirkaŭ ĉi tiu punkto dum la
// paŝo. La sama nombro servas tri lokojn — la disigon de la brako, la disigon de
// la maniko kaj la pivoton de la kubuta grupo — do ĝi estas nomita unufoje.
export const KUBUTO_Y = -0o256/0o1000;                  // −0.3398 — la kubuto
// HALTO_GAMO — kiom la alto de unu figuro povas varii rilate al la baza modelo.
// La homamaso aspektu kiel homoj, ne kiel vico da kopioj de la sama korpo ( des
// pli videble nun, kiam la har-koloro, la har-stilo, la okuloj kaj la vesto jam
// varias ). La vario tamen restu ETA — ± 5 %, do proksimume 9 cm ĉe plenkreskulo:
// pli granda gamo legiĝus kiel infanoj kaj plenkreskuloj miksitaj.
export const HALTO_GAMO = 0o1/0o20;                     // 0.05

// KAPA_R — la REFERENCA radiuso de la kapo. La kranio ( vidu kreiKapanKranion )
// nun estas ringa profilo, sed ĝi restas INTERNE de ĉi tiu sfero, kaj la okuloj,
// la har-ĉapo kaj la har-kurteno ĉiuj mezuriĝas de ĝi — unu nombro por la tuta kapo.
export const KAPA_R = 0o13/0o100;   // 0.171875
