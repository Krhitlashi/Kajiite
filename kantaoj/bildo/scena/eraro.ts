// ≺⧼ កំហុស 💥 ⧽≻
import { traduki } from "../../lingvo/tradukoj.js";

export function montriEraronon(sxargxaEl: HTMLElement): void {
  const d = document.createElement("div");
  d.className = "sozanu er2ha a3e";
  d.innerHTML = `<p class="ksakap2sa">${traduki("titoloSxargxo")}</p><p>${traduki("webglMesagxo")}</p><p>${traduki("webglDetalo")}</p><button onclick="location.reload()">${traduki("webglReprovi")}</button>`;
  document.body.appendChild(d);
  sxargxaEl.classList.add("finita");
}
