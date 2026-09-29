// ≺⧼ La kradaj tipoj 📐 ⧽≻
// Pura, sendependa modulo ( NENIU three.js, NENIU DOM ) — la komuna krada logiko
// de la ludo ( urbo.ts ) kaj de la terena skulptilo ( iloj/ ). La koordinatoj
// estas RELATIVAJ al la krada centro ( ofseto 0 ).
// La aranĝo ( KradaArangxo ), la ĉela
// tipo ( CellType, KradaĈelo ), la konstruaĵo ( KradaKonstruajxo, AldonaBloko ),
// la voja segmento kaj la sprono ( KradaVojSegmento, KradaSpono ) kaj la tuta
// plano ( KradaPlano ).
export interface KradaArangxo {
  arangxaGrando: number;             // la tavoloj sur ĉiu flanko
  blokaGrando: "unu" | "kvar";       // unu konstruaĵo po ĉelo, aŭ kvar en bloko
  keuxfhxeso?: boolean;              // la kvar keŭfĥesoj ĉirkaŭ la centro ( defaŭlte malŝaltitaj )
  lampoj?: boolean;                  // la kvar-lampa strato-ŝablono ( defaŭlte ŝaltita )
}
export type CellType = "domo" | "turo" | "mangxejo" | "kasafeo" | "sanktejo" | "stacio";
export type KradaĈelo = [ number, number, CellType ];
export interface KradaKonstruajxo {
  x: number; z: number; rot: number; tipo: CellType;
  cx: number; cz: number;            // la ĉelo ( kolumno, vico )
  sub: "centro" | "NE" | "NW" | "SW" | "SE";  // pozicio en la bloko ( unu: "centro" )
  stacia: boolean;                   // la kosmoporda stacio ( unu. norde; kvar. centro )
  ekstra?: boolean;                  // ALDONA bloko ( la skulptilo metas gxin aparte de la krado )
  konektita?: boolean;               // la aldona bloko kunigxas kun la voja reto ( kiel la malnova stacidoma ĉelo )
}

// AldonaBloko — unu EXTRA bloko metita sur la urbon de la terena skulptilo,
// aparte de la krada generado. La koordinatoj estas RELATIVAJ al la krada
// centro ( la sama konvencio kiel la ĉeloj ). La tipo "sanktejo" kun la
// stacia flago farigxas la kosmoporda stacio ( la sxipo flugas super gxi ).
// konektita — la bloko kunigxas kun la voja reto ( ĝia ĉelo aligxas al la
// reto kaj la bloko ricevas spronon ) — la stacio tiel konektigxas al la
// krado kiel la malnova stacidoma ĉelo. Sen gxi la bloko staras sola.
export interface AldonaBloko {
  x: number;
  z: number;
  tipo: CellType;
  rot?: number;
  sub?: KradaKonstruajxo["sub"];
  stacia?: boolean;
  konektita?: boolean;
}

export interface KradaVojSegmento {
  orient: "NS" | "EW";
  poz: number;                       // la fiksa koordinato ( x por NS, z por EW )
  de: number; al: number;            // la intervalo laŭ la alia akso
  stacia?: boolean;                  // ekster-krada vojo ( la stacidoma ringo, la doka avenuo )
}

export interface KradaSpono {
  de: [ number, number ];            // muro-bazo de la pordo
  al: [ number, number ];            // la celo sur la vojo
  konstruajxo: number;               // indekso en konstruaĵoj
}

export interface KradaPlano {
  arangxo: KradaArangxo;
  ĉeloj: KradaĈelo[];
  PASXO: number;
  nordaPinto: number;                // la plej norda vico
  ringoX: number;                    // la vojo inter kolumnoj 0 kaj 1
  ringoSuda: number;                 // la vojo inter la du plej nordaj vicoj
  sudaVojo: number;                  // la plej suda krada vojo
  stacioZ: number;                   // la stacio sidas 24 norde de la pinto ( unu )
  staciaRingaNordo: number;          // la norda flanko de la stacidoma ringo ( unu )
  konstruaĵoj: KradaKonstruajxo[];
  vojoj: KradaVojSegmento[];
  spronoj: KradaSpono[];
  spurXoj: number[];
  spurZoj: number[];
  retoX: number[];
  retoZ: number[];
  lampoj: { x: number; z: number }[];   // la kvar-lampa strato-ŝablono ( malplena se malŝaltita )
}
