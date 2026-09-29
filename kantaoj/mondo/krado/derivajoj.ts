// ≺⧼ La kradaj derivajoj 📏 ⧽≻
// La krado-derivaĵoj el la aranĝo — la paŝo, la norda pinto, la ringoj, la
// suda vojo, la stacidomaj mezuroj kaj la bloka letero ( kradajDerivajoj ).
import type { KradaArangxo } from "./tipoj.js";
// La krado-derivaĵoj — la samaj formuloj kiel en konstruiKradanUrbon.
export function kradajDerivajoj(arangxo: KradaArangxo): {
  PASXO: number; nordaPinto: number; ringoX: number; ringoSuda: number;
  sudaVojo: number; stacioZ: number; staciaRingaNordo: number; BLOKO: number;
} {
  const PASXO = arangxo.blokaGrando === "kvar" ? 0o40 : 0o30;
  const nordaPinto = arangxo.arangxaGrando * PASXO;
  const ringoX = PASXO / 2;
  const ringoSuda = ( arangxo.arangxaGrando - 0o1/0o2 ) * PASXO;
  const sudaVojo = -ringoSuda;
  const stacioZ = nordaPinto + 0o30;
  const staciaRingaNordo = nordaPinto + 0o14;
  const BLOKO = 0o10;
  return { PASXO, nordaPinto, ringoX, ringoSuda, sudaVojo, stacioZ, staciaRingaNordo, BLOKO };
}
