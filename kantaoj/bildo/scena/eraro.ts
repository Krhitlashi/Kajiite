// ≺⧼ ɽ͑ʃ'ɹ ᶅſw }ʃꞇ 💥 ⧽≻
import { traduki } from "../../lingvo/tradukoj.js";

function montriPanelon( sxargxaEl: HTMLElement, detaloj: string[] ): void {
  const d = document.createElement("div");
  d.id = "sargaEraro";
  d.className = "sozanu er2ha a3e";
  d.setAttribute("role", "alert");
  const titolo = document.createElement("p");
  titolo.className = "ksakap2sa";
  titolo.textContent = traduki("titoloSxargxo");
  d.appendChild(titolo);
  for ( const detalo of detaloj ) {
    const p = document.createElement("p");
    p.textContent = detalo;
    d.appendChild(p);
  }
  const butono = document.createElement("button");
  butono.type = "button";
  butono.textContent = traduki("webglReprovi");
  butono.addEventListener("click", () => location.reload());
  d.appendChild(butono);
  document.body.appendChild(d);
  sxargxaEl.classList.add("finita");
}

export function montriEraronon( sxargxaEl: HTMLElement ): void {
  montriPanelon(sxargxaEl, [ traduki("webglNeSubtenata"), traduki("webglDetalo") ]);
}

/* ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ʌ ꞙɭɔ ʌ WebGL ⟅
    @param sxargxaEl ( HTMLElement ) - ſɟᴜ ſȷᴜɔ˞ ʌ ſȷwɔ˞
    @param eraro ( unknown ) - ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
@returns void */
export function montriSargxanEraron( sxargxaEl: HTMLElement, eraro: unknown ): void {
  console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) }ʃᴜ j͐ʃᴜ ʌ ꞙɭɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ", eraro);
  if ( document.getElementById("sargaEraro") ) return;
  const detalo = eraro instanceof Error ? eraro.message : String(eraro);
  montriPanelon(sxargxaEl, [ detalo ]);
}
