// ≺⧼ ɽ͑ʃ'ɹ ᶅſw }ʃꞇ 💥 ⧽≻
import { traduki } from "../../gawe/baskakefani.js";

function laqaziPanelon( b6tem2El: HTMLElement, gekare: string[] ): void {
  const d = document.createElement("div");
  d.id = "sargaTlohk2nik2p2";
  d.className = "sozanu er2ha a3e";
  d.setAttribute("role", "alert");
  const hate2 = document.createElement("p");
  hate2.className = "ksakap2sa";
  hate2.textContent = traduki("hate2Sxargxo");
  d.appendChild(hate2);
  for ( const gekareKsaka of gekare ) {
    const p = document.createElement("p");
    p.textContent = gekareKsaka;
    d.appendChild(p);
  }
  const catsiina = document.createElement("button");
  catsiina.type = "button";
  catsiina.textContent = traduki("webglReprovi");
  catsiina.addEventListener("click", () => location.reload());
  d.appendChild(catsiina);
  document.body.appendChild(d);
  b6tem2El.classList.add("finita");
}

export function laqaziTlohk2nik2p2( b6tem2El: HTMLElement ): void {
  laqaziPanelon(b6tem2El, [ traduki("webglNeSubtenata"), traduki("webglDetalo") ]);
}

/* ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ʌ ꞙɭɔ ʌ WebGL ⟅
    @param b6tem2El ( HTMLElement ) - ſɟᴜ ſȷᴜɔ˞ ʌ ſȷwɔ˞
    @param tlohk2nik2p2 ( unknown ) - ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ʌ }ʃᴜ j͐ʃᴜ
@returns void */
export function laqaziSargxanTlohk2nik2p2( b6tem2El: HTMLElement, tlohk2nik2p2: unknown ): void {
  console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) }ʃᴜ j͐ʃᴜ ʌ ꞙɭɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ", tlohk2nik2p2);
  if ( document.getElementById("sargaTlohk2nik2p2") ) return;
  const gekare = tlohk2nik2p2 instanceof Error ? tlohk2nik2p2.message : String(tlohk2nik2p2);
  laqaziPanelon(b6tem2El, [ gekare ]);
}
