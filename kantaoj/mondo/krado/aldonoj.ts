// ≺⧼ La aldonaj konstruantoj 🏗️ ⧽≻
// La konstruantoj por la ekster-kradaj partoj de la plano — vojo ( aldoniVojon )
// kaj bloko ( aldoniBlokon ).
import type { CellType, KradaKonstruajxo, KradaPlano } from "./tipoj.js";
// aldoniVojon — la voja konstruanto ( road builder ). Aldonu vojan segmenton
// al la plano — la doka avenuo kaj aliaj ekster-kradaj vojoj. La segmento
// estas aks-paralela ( NS aŭ EW ), kiel la ceteraj kradaj vojoj; la flago
// stacia markas la ekster-kradajn vojojn, kiujn la kradaj kontroloj ne
// traktas ( la doka avenuo kuŝas for de la ĉeloj ).
//     @param plano ( KradaPlano ) - La plano al kiu aldoni.
//     @param orient ( "NS" | "EW" ) - La orientiĝo.
//     @param poz ( number ) - La fiksa koordinato ( x por NS, z por EW ).
//     @param de, al ( number ) - La intervalo laŭ la alia akso.
//     @param stacia ( boolean = false ) - Ekster-krada vojo ( sen kradaj kontroloj ).
export function aldoniVojon(plano: KradaPlano, orient: "NS" | "EW", poz: number, de: number, al: number, stacia = false): void {
  plano.vojoj.push({ orient, poz, de, al, stacia });
}

// aldoniBlokon — la bloka konstruanto ( block adder ). Aldonu konstruajxon
// ( blokon ) al la plano — la spacosxipa stacio kaj aliaj ekstraj konstruajxoj
// cxe preciza pozicio. La tipo "stacioxipo" farigxas stacia bloko ( la plana
// konvencio — tipo "sanktejo" kun la stacia flago ), kaj la ĉelaj
// koordinatoj derivigxas el la krada pasxo.
//     @param plano ( KradaPlano ) - La plano al kiu aldoni.
//     @param x, z ( number ) - La pozicio ( relativa al la krada centro ).
//     @param tipo ( CellType | "stacioxipo" ) - La konstruajxa tipo.
//     @param rot ( number = 0 ) - La turno.
//     @param sub ( sub = "centro" ) - La pozicio en la bloko.
//     @param stacia ( boolean = false ) - Cxu la bloko estas stacio.
export function aldoniBlokon(plano: KradaPlano, x: number, z: number, tipo: CellType | "stacioxipo", rot = 0, sub: KradaKonstruajxo["sub"] = "centro", stacia = false): void {
  plano.konstruaĵoj.push({
    x, z, rot,
    tipo: tipo === "stacioxipo" ? "sanktejo" : tipo,
    cx: Math.round(x / plano.PASXO), cz: Math.round(z / plano.PASXO),
    sub, stacia,
  });
}
