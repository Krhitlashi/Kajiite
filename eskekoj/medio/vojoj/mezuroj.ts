// ≺⧼ La mezuroj de la vojoj 📏 ⧽≻
// La mezursistemo de la vojoj — la dikeco, la supraj levigxoj, la duonoj de la
// diorita centro kaj de la andezita bordo kaj la radiusoj de la rondigitaj
// kornoj. La formoj ( formoj.ts ), la bendoj ( bufroj.ts ), la segmentoj
// ( segmentoj.ts ), la platoj ( platoj.ts ), la ĉapoj ( kapoj.ts ) kaj la
// platformoj ( periferio.ts ) ĉiuj legas ĉi tiujn nombrojn, do ili restas en
// unu loko kaj ne povas disiĝi.

// ⟪ La mezursistemo de la vojoj 📏 ⟫ — ĉiu longo en la voja mondo estas en la
// longounuo de CAX2L ( vidu S2WENI/CAX2L.md ). La mondo havas UNU longounuon,
// 0o100 Peu ( la koda unuo de la tereno kaj de la kradoj ), kaj la komentoj
// donas la Peu-valoron kiam ĝi helpas legi la nombron. 0o1 Peu estas la plej
// malgranda mezuro, kiun oni bezonas ĉi tie — la dikeco de fadeno de la
// teksajxoj, la harareto de la polygonOffset-margxenoj.
//
// VOJA_DIKECO — La dikeco de la voja plato: kiom alte la voja rubando staras
// super la tereno, tio estas kiom alta estas la videbla andezita rando de la
// flanko. La malnova valoro estis 0o2/0o10 ( 0o20 Peu ) — la stratoj aspektis
// kiel levitaj estradoj kun alta sxtonsxirmo, kaj sur deklivoj la rando sxajnis
// MURETO. Nun 0o5/0o100 ( 0o5 Peu ): la rubando kusxas preskaux sur la tereno,
// la rando legigxas kiel maldika sxirmo, kaj la vojo mem sxajnas PLI PLATA.
// ⟨ La vojoj kaj la plataĵoj kunhavas ĝin 📃 ⟩ — la kruciĝaj platoj, la arkaj
// kaj la ĉapoj uzas la SAMAN nivelon ( VOJA_SUPRO_LEVIGXO ), alie ili starus
// super la vojoj aŭ malgarus sub ili.
export const VOJA_DIKECO = 0o5/0o100;

// VOJA_SUPRO_LEVIGXO — Kiom la SURFACO de vojo kusxas super la heightFn, kiun
// gxi ricevas: la eta klareco super la tereno ( 0o1/0o100 ) kaj la dikeco de la
// rubando ( VOJA_DIKECO ). Aliaj moduloj importas gxin, kiam iliaj propraj suproj
// devas kongrui kun vojo — la ponta heightFn ( urbo.ts ) subtrahas gxin, do la
// ponta deko finigxas GXUSTE cxe la renkontajxaj platformaj suproj.
export const VOJA_SUPRO_LEVIGXO = 0o1/0o100 + VOJA_DIKECO;

// VOJA_EKSTERA_DUONO — La duon-larĝo de la voja spuro ( la diorita centro
// plus la andezita bordo sur ĉiu flanko ) — la rando de la vojo kaj samtempe
// la duon-larĝo de ĉiu kuniga plato. VOJA_DIORITA_DUONO — la rando de la
// diorita centro, VOJA_BORDA_LARĜO — la andezita bordo inter la du. La tri
// valoroj venas el la bendo-difinoj ( kreiVojajnBendojn ), do la plato kaj la
// vojoj finiĝas ĉe la samaj linioj kaj la transiro restas senfenda.
export const VOJA_DIORITA_DUONO = 0o7/0o10;
export const VOJA_BORDA_LARĜO = 0o3/0o5;
export const VOJA_EKSTERA_DUONO = VOJA_DIORITA_DUONO + VOJA_BORDA_LARĜO;

// KORNA_R — La UNUFORMA radiuso de la ekstera kurbo en la DU-braka kvadranto
// ( per kreiEksteranKurbanArkon ). Gxi egalas la andezitan bordon, do la kurbo
// restas tangenta al la vojaj eksteraj randoj.
// KORNA_ENA_R — La radiuso de la ena diorita rando ( per kreiEnanKornanArkon ).
// Gxi estas KORNA_R plus la borda largxo, do ambaux arkoj estas SAMCENTRAJ
// ( centro O ekster la plato ) kaj la andezita strio inter ili havas uniforman
// largxon ( la bordon ) en la tuta korno. Ambaux radiusoj validas en cxiuj
// kvar kvadrantoj, do la kvarvoja krucigxo, la T-kunigo kaj la L-kornero
// kunhavas unu arkoparon.
export const KORNA_R = VOJA_BORDA_LARĜO;
export const KORNA_ENA_R = VOJA_BORDA_LARĜO + KORNA_R;

// VOJA_TRUA_DUONO — La duon-longo de la vojaj truoj cxirkaux cxiu kunigo
// ( la vojoj haltas cxe gxia rando ). Gxi estas la plata duono plus la korna
// radiuso, do la truoj atingas la tangentopunktojn de la rondigitaj kornoj
// ( S1 kaj E1 ) kaj la plataj stumpoj plenigas ilin gxis la vojaj randoj.
export const VOJA_TRUA_DUONO = VOJA_EKSTERA_DUONO + KORNA_R;
