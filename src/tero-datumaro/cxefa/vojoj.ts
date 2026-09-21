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
// ⟪ La "Ponto" 📃 ⟫ — la ponto estas VOJO, kiu trapasas la riveron inter du sekaj
// bordoj ( urbo.ts rekonas gxin per la akvo-masko ). GXi kuras en LIBERA akvo,
// oriente de la meza nordkaja doko kaj de la sudborda doko — NE inter ili:
// doko etendigxas de la kajo trans la deklivan bordon en la akvon, do ponto inter
// du dokoj kusxus GXUSTE super iliaj platformoj ( la suda platformo estas 2.4
// unuojn pli alta, kaj gxia plato elstaris tra la deko ). La ponto do estas
// memstara trapasejo, kaj la dokoj restas flanke kiel surterigxajoj por la
// boatoj.
//   · La norda fino ( 0o30, -0o12340/0o100 ) = ( 24, -83.5 ) sidas sur la norda
//     kajo ( gxia centro tie estas z = -83.55 ).
//   · La suda fino ( 0o30, -0o176 ) = ( 24, -126 ) sidas sur la suda kajo.
// La deko estas REKTA ( du punktoj ) — gxi finigxas gxuste cxe la voja surfaco de
// ambaux bordoj, sen sxtupo, kaj gxi restas pli ol 5 unuojn super la akvo, do la
// boatoj pasas. La arkon portas la ORA balustrado ( doko.pontaPolSupro ).
export const SKULPTA_VOJOJ = [ { "nomo": "Suda kajo", "larĝo": 0o340/0o100, "punktoj": [ [ -0o110, -0o215 ], [ -0o74, -0o214 ], [ -0o60, -0o213 ], [ -0o44, -0o211 ], [ -0o30, -0o207 ], [ -0o14, -0o205 ], [ 0, -0o203 ], [ 0o14, -0o200 ], [ 0o30, -0o176 ], [ 0o44, -0o174 ], [ 0o60, -0o172 ], [ 0o74, -0o171 ], [ 0o110, -0o170 ], [ 0o124, -0o167 ], [ 0o140, -0o166 ], [ 0o150, -0o171 ], [ 0o160, -0o171 ], [ 0o170, -0o171 ], [ 0o210, -0o171 ] ] }, { "nomo": "Kajo", "larĝo": 0o340/0o100, "punktoj": [ [ -0o124, -0o140 ], [ -0o70, -0o150 ], [ -0o5740/0o100, -0o14340/0o100 ], [ 0o40/0o100, -0o130 ], [ 0o60, -0o117 ], [ 0o70, -0o124 ], [ 0o124, -0o122 ] ] }, { "nomo": "Avenuo", "larĝo": 0o340/0o100, "punktoj": [ [ 0o14, -0o60 ], [ 0o14, -0o127 ] ] }, { "nomo": "Suda avenuo", "larĝo": 0o340/0o100, "punktoj": [ [ 0o160, -0o260 ], [ 0o160, -0o171 ] ] }, { "nomo": "Ponto", "larĝo": 0o340/0o100, "punktoj": [ [ 0o30, -0o12340/0o100 ], [ 0o30, -0o176 ] ] } ];
export const SKULPTA_DOKOJ = [ { "x": -0o60, "z": -0o152, "profundo": 0o20, "rotacio": 0 }, { "x": 0, "z": -0o142, "profundo": 0o20, "rotacio": 0 }, { "x": 0o60, "z": -0o130, "profundo": 0o20, "rotacio": 0 }, { "x": 0, "z": -0o174, "profundo": 0o20, "rotacio": Math.PI } ];
