// ≺⧼ អ្នកសង់បន្ថែម 🏗️ ⧽≻
import type { CellType, KradaKonstruajxo, KradaPlano } from "./tipoj.js";
export function aldoniVojon(plano: KradaPlano, orient: "NS" | "EW", poz: number, de: number, al: number, stacia = false): void {
  plano.vojoj.push({ orient, poz, de, al, stacia });
}

export function aldoniBlokon(plano: KradaPlano, x: number, z: number, tipo: CellType | "stacioxipo", rot = 0, sub: KradaKonstruajxo["sub"] = "centro", stacia = false): void {
  plano.konstruaĵoj.push({
    x, z, rot,
    tipo: tipo === "stacioxipo" ? "sanktejo" : tipo,
    cx: Math.round(x / plano.PASXO), cz: Math.round(z / plano.PASXO),
    sub, stacia,
  });
}
