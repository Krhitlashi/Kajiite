// ≺⧼ Eraro 💥 ⧽≻
// La WebGL-erara tegilo — la sola peco de la sceno, kiu ne bezonas la bildilon.
import { traduki } from "../../lingvo/tradukoj.js";

// montriEraronon — Montru la plenekranan eraran tegilon sur la ŝarĝa kurtino,
// kiam la bildilo ne povas kreiĝi ( WebGL ne havebla aŭ blokita ).
//     @param sxargxaEl ( HTMLElement ) - La ŝarĝa elemento ( ricevas .finita ).
export function montriEraronon(sxargxaEl: HTMLElement): void {
  const d = document.createElement("div");
  // La ekstera stilfolio provizas la plenekranan tegilon ( .sozanu + .er2ha +
  // .a3e ) kaj la tutan tipografion/spacojn de ksakap2sa/p/button — nenia loka
  // CSS, neniaj enliniaj stiloj.
  d.className = "sozanu er2ha a3e";
  d.innerHTML = `<p class="ksakap2sa">${traduki("titoloSxargxo")}</p><p>${traduki("webglMesagxo")}</p><p>${traduki("webglDetalo")}</p><button onclick="location.reload()">${traduki("webglReprovi")}</button>`;
  document.body.appendChild(d);
  sxargxaEl.classList.add("finita");
}
