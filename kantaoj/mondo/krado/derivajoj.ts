// ≺⧼ j͑ʃɔ ſȷэⅎ }ʃw 📏 ⧽≻
import type { KradaArangxo } from "./hahunaq.js";
export function kradajDerivajoj(arangxo: KradaArangxo): {
  PASXO: number; nordaPinto: number; ringoX: number; ringoSuda: number;
  sudaK6h6: number; stacioZ: number; staciaRingaNordo: number; BLOKO: number;
} {
  const PASXO = arangxo.blokaGrando === "kvar" ? 0o40 : 0o30;
  const nordaPinto = arangxo.arangxaGrando * PASXO;
  const ringoX = PASXO / 2;
  const ringoSuda = ( arangxo.arangxaGrando - 0o1/0o2 ) * PASXO;
  const sudaK6h6 = -ringoSuda;
  const stacioZ = nordaPinto + 0o30;
  const staciaRingaNordo = nordaPinto + 0o14;
  const BLOKO = 0o10;
  return { PASXO, nordaPinto, ringoX, ringoSuda, sudaK6h6, stacioZ, staciaRingaNordo, BLOKO };
}
