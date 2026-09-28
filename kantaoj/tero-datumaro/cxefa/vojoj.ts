// ≺⧼ Skulptitaj vojoj 📃 ⧽≻
// Kreita de la terena skulptilo ( iloj/tero-skulptilo/tero-skulptilo.html ).
// ( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) - Ne redaktu mane. La skulptilo reskribas la dosieron.
// La mond-nivelaj vojoj ( la kajo, la avenuo ) kiel polilinioj kun nomo kaj
// larĝo, kaj la dokaj platformoj kun pozicio, profundo kaj turno ( rotacio —
// 0 = la landa rando norde kaj la akva pinto suden, Math.PI = la malo, por la
// malproksima riverbordo ) — redaktataj per la Vojoj sub-langeto de la terena
// skulptilo.
// ⟪ La sudborda kajo 📃 ⟫ — "Suda kajo" spegulas la NORDAN kajon trans la rivero:
// sama longo kaj la sama sinteno al la doko — la vojo pasas laŭ la sudborda
// tereno kaj la doko aliĝas al ĝi laŭ sia TUTA landa flanko ( la vojo kuŝas
// ĉirkaŭ z = -131 ĉe x = 0, kaj la landa rando de la doko estas -132, do la
// vojo kovras ĝin ). Ĝia orienta fino nun daŭriĝas ĝis x = 0o210 = 136 — la
// rivero turniĝas norden tie, do la kajo DEVIAS suden ( z = -121 ) por resti sur
// la seka bordo. Tiu daŭrigo ekzistas pro la SUDA AVENUO ( sube ), kiu aliĝas al
// la kajo kiel T-kunigo, ne ĉe ĝia fino.
// ⟪ La suda avenuo 📃 ⟫ — "Suda avenuo" estas la spegulo de "Avenuo" de la ĉefa
// urbo. La ĉefa urbo etendas sian ringan vojon ( x = ringoX = 0o20 ) SUDEN ĝis
// sia kajo; la suda urbo ( Testa ) estas SUR la suda bordo, do ĝia rivero estas
// NORDE — la sama ringa vojo ( x = ofsX + ringoX = 0o140 = 112 ) nun etendiĝas
// NORDEN el la norda rando de la urbo ( z = -0o260 = -176 ) malsupren al la
// kajo. La vojo do komenciĝas sur la ĉefa nord-suda strato de la urbo mem kaj
// finiĝas sur la ĉefa vojo de la bordo — nek ĉe angulo de la krado nek ĉe
// hazarda flanko de bloko. ( Antaŭe la diagonala "Suda vojo" malsupreniris de la
// doko kaj finiĝis 16 unuojn INTERNE de la urba blokaro, meze de stratosegmento;
// ĝi estis forigita. ) La tuta itinero mezuriĝis sur la tereno — seka kaj milde
// dekliva ( 0.0 → 0.8 ).
// ⟪ La avenuo 📃 ⟫ — "Avenuo" daŭrigas la ĉefan nord-sudan straton de la ĉefa
// urbo ( la unua krada vojo x = ringoX = 0o14 = 12 ) de ĝia plej suda krada
// vojo ( sudaVojo = -0o74 = -60 ) malsupren al la kajo. La unua punkto DEVAS
// sidi GXUSTE sur sudaVojo — la sama valoro, kiun krado.ts uzas por etendi la
// ringan vojon ( kradajDerivajoj ). Se ĝi komenciĝus pli norde ( ekz. -0o60 =
// -48 ), la avenuo kuŝus SUR la krada strato por 0o14 = 12 unuoj kaj la du
// vojoj desegniĝus unu en la alia.
// ⟪ La "Ponto" 📃 ⟫ — la ponto estas VOJO, kiu trapasas la riveron inter du sekaj
// bordoj ( urbo.ts rekonas gxin per la akvo-masko ). GXi kuras en LIBERA akvo,
// oriente de la meza nordkaja doko kaj de la sudborda doko — NE inter ili:
// doko etendigxas de la kajo trans la deklivan bordon en la akvon, do ponto inter
// du dokoj kusxus GXUSTE super iliaj platformoj ( la suda platformo estas 2.4
// unuojn pli alta, kaj gxia plato elstaris tra la deko ). La ponto do estas
// memstara trapasejo, kaj la dokoj restas flanke kiel surterigxajoj por la
// boatoj.
//   · La norda fino ( 24.2833, -84.9949 ) sidas sur la rando de la norda
//     kajo ( tiesa centrolinio estas ĉe ( 24, -83.5941 ) ).
//   · La suda fino ( 23.7575, -124.5451 ) sidas sur la rando de la suda kajo
//     ( tiesa centrolinio estas ĉe ( 24, -126 ) ).
// La deko estas REKTA ( du punktoj ) — gxi finigxas gxuste cxe la voja surfaco de
// ambaux bordoj, sen sxtupo, kaj gxi restas pli ol 5 unuojn super la akvo, do la
// boatoj pasas. La arkon portas la ORA balustrado ( doko.pontaPolSupro ).
export const SKULPTA_VOJOJ = [ { "nomo": "Suda kajo", "larĝo": 0o340/0o100, "punktoj": [ [ -0o110, -0o215 ], [ -0o74, -0o214 ], [ -0o60, -0o213 ], [ -0o44, -0o211 ], [ -0o30, -0o207 ], [ -0o14, -0o205 ], [ 0, -0o203 ], [ 0o14, -0o200 ], [ 0o30, -0o176 ], [ 0o44, -0o174 ], [ 0o60, -0o172 ], [ 0o74, -0o171 ], [ 0o110, -0o170 ], [ 0o124, -0o167 ], [ 0o140, -0o166 ], [ 0o150, -0o171 ], [ 0o160, -0o171 ], [ 0o170, -0o171 ], [ 0o210, -0o171 ] ] }, { "nomo": "Kajo", "larĝo": 0o340/0o100, "punktoj": [ [ -0o124, -0o140 ], [ -0o70, -0o150 ], [ -0o5740/0o100, -0o14340/0o100 ], [ 0o40/0o100, -0o130 ], [ 0o60, -0o117 ], [ 0o70, -0o124 ], [ 0o124, -0o122 ] ] }, { "nomo": "Avenuo", "larĝo": 0o340/0o100, "punktoj": [ [ 0o14, -0o74 ], [ 11.509773716202902, -84.41269461329307 ] ] }, { "nomo": "Suda avenuo", "larĝo": 0o340/0o100, "punktoj": [ [ 0o160, -0o260 ], [ 112, -122.475 ] ] }, { "nomo": "Ponto", "larĝo": 0o340/0o100, "punktoj": [ [ 24.28325227588182, -84.99494256715403 ], [ 23.757511493724596, -124.54506896234759 ] ] } ];
export const SKULPTA_DOKOJ = [ { "x": -46.83527661502611, "z": -108.20003306050623, "profundo": 0o20, "rotacio": -0.48689923181126904 }, { "x": -0.37471677301358186, "z": -96.43596477350853, "profundo": 0o20, "rotacio": -0.2351509697089438 }, { "x": 60.56996762, "z": -91.69383232, "profundo": 0o20, "rotacio": -0.0713076 }, { "x": -0.29322617676125673, "z": -122.827095292955, "profundo": 0o20, "rotacio": 2.896613990462929 } ];
