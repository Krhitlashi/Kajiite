// ≺⧼ អ្នកសង់បន្ថែម 🏗️ ⧽≻
import type { KradaPlano } from "./tipoj.js";
export function aldoniVojon(plano: KradaPlano, orient: "NS" | "EW", poz: number, de: number, al: number, stacia = false): void {
  plano.vojoj.push({ orient, poz, de, al, stacia });
}
