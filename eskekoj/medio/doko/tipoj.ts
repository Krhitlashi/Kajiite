// ≺⧼ La dokaj tipoj ⚓ ⧽≻
// La larĝoj de la doko kaj la datumaj tipoj — unu piedirebla sekcio ( DokaSekcio )
// kaj la tuta doko ( Doko ) kun siaj platformaj mezuroj kaj la ŝtupara polilinio.
import * as THREE from "three";

export const DOKO_PLATFORMA_LARĜO = 0o16/0o10;
export const DOKO_KADRA_LARĜO = 0o4/0o10;

// DokaSekcio — unu EBENA, piedirebla parto de la doko, la LANDEJO ( la akva
// parto ). La fiziko ( kantaoj/ludo/sperto.ts ) traktas ĉiun sekcion kiel rektangulan
// platformon kun ebena supro. La ŝtuparo NE estas sekcio — ĝi estas ordinara
// voja difino ( vidu stuparajPunktoj ), do la voja konstruilo faras ĝiajn
// platajn ŝtupojn kaj la fiziko traktas ilin kiel vojajn surfacojn.
// La koordinatoj estas LOKAJ ( la doka kadro — lx laŭ la larĝo, lz laŭ la longo,
// +lz al la landa rando ), kaj urbo.ts transformas ilin per la doka rotacio.
export interface DokaSekcio {
  lx: number;
  lz: number;
  w: number;
  d: number;
  // Monda Y de la sekcia supro ( por kolizio. Staro SUR la doko ).
  y: number;
}

export interface Doko {
  group: THREE.Group;
  x: number;
  z: number;
  platformWidth: number;
  platformDepth: number;
  // Monda Y de la LANDa rando — la kaja nivelo, kie la vojo renkontas la dokon.
  platformY: number;
  // La piedireblaj sekcioj ( la landejo ) por la kolizioj. La ŜTUPOJ ne venas
  // el ĉi tie — ili estas ordinaraj vojaj strioj ( vojSuprajxoj ), ĉar la
  // ŝtuparo mem estas vojo ( vidu stuparajPunktoj ).
  sekcioj: DokaSekcio[];
  // La polilinio de la ŝtuparo, en MONDAJ koordinatoj — de 0o3/0o2 unuoj super
  // la landa rando ( sur la kajo ) malsupren gxis la landeja rando. urbo.ts gin
  // aldonas al la vojaj difinoj kun `stuparo: true`, do la voja konstruilo
  // faras la ŝtupojn ( diorita centro + andezitaj randoj ). Malplena kiam la
  // doko estas tute ĉe ( aŭ sub ) la akvosurfaco.
  stuparajPunktoj: [ number, number ][];
  // La plej alta alto, kiun la ŝtuparo rajtas alpreni — la kaja nivelo ( vojaY ).
  // urbo.ts pasas gxin al la voja difino kiel plafonon de la heightFn, do la
  // plej alta ŝtupo kusxas sama alte kiel la kajo anstataŭ sekvi la terenon
  // pli supre ( la strando super la doko).
  stuparaSupro: number;
}
