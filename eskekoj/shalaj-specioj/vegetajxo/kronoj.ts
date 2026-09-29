// ≺⧼ Kronaj mezuroj 🌳 ⧽≻
// La kronaj radiusoj de la plantoj kaj la konstantoj, kiuj ligas la GEOMETRION
// de la krono al gxia METADO. La kronaj geometrioj estas unu unito altaj, sed
// ilia radiuso dependas de la pingla longo, do la metaj funkcioj skvamas per la
// proporcio inter la dezirita krona radiuso kaj la geometria radiuso — la modelo
// kaj la interspaco ĉiam kongruas.
//
// La krona radiuso servas al la inter-plantaj interspacoj ( la kronoj neniam
// trapenetru unu la alian ). Ĉiu planto portas sian propran radiuson ( r ), kaj
// la kandidato ricevas la specian funkcion de sia metado — malsamaj specioj
// miksiĝas sen super-spacigo de la maldikaj.

// La geometria radiuso de la larika krono, mezurita el la geometrio.
export const KRONA_GEOMETRIA_RADIUSO = 0.49;
// Kiom alta tavolo kompare kun sia larĝo — la geometrio mem jam estas spira
// ( ~1.4× pli alta ol larĝa ), do iomete sub 1 donas la montaran larikan konon.
export const TAVOLA_PROPORCIO = 0o10/0o12;            // 0.8

// La purpuraj filik-trunkaj radiusoj ( supro kaj malsupro ) — uzataj kaj por
// la trunka geometrio kaj por la fronda elir-radiuso, por ke ili ĉiam kongruu.
export const PURPURAJ_TRUNKAJ_RADIOJ = { supro: 0o3/0o20, malsupro: 0o5/0o20 };

// Kiom da libera spaco restu inter la kronaj randoj.
export const KRONA_LIBERO = 0o2;

export const kronaRadiusoBetula = ( s: number ): number => 0o215/0o100 * s + 0o63/0o100;
export const kronaRadiusoLarika = ( s: number ): number => 0o11/0o10 * s + 0o4/0o10;
export const kronaRadiusoHxsxaksxlefa = ( s: number ): number => 0o6/0o10 + 0o1 * s;
// Pussxlefo — fern-granda planto, do nur eta krona libero ( ~0.5 unuoj ).
export const kronaRadiusoPussxlefa = ( s: number ): number => 0o25/0o100 + 0o2 * s;
