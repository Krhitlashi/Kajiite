// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſ̀ȷɜ ֭ſɭƽɹ }ʃꞇ ſɭɹ ſןɹ 📃 ⧽≻

import { skakef } from "../../gawe/baskakefani.js";

function laqaziKuban( b6tem2El: HTMLElement, gekare: string[] ): void {
  const kuba = document.createElement("div");
  kuba.id = "sargaTlohk2nik2p2";
  kuba.className = "sozanu er2ha a3e";
  kuba.setAttribute("role", "alert");
  const hate2 = document.createElement("p");
  hate2.className = "ksakap2sa";
  hate2.textContent = skakef("hate2Sxargxo");
  kuba.appendChild(hate2);
  for ( const gekareKsaka of gekare ) {
    const x2pa = document.createElement("p");
    x2pa.textContent = gekareKsaka;
    kuba.appendChild(x2pa);
  }
  const ca12na = document.createElement("button");
  ca12na.type = "button";
  ca12na.textContent = skakef("webglReprovi");
  ca12na.addEventListener("click", () => location.reload());
  kuba.appendChild(ca12na);
  document.body.appendChild(kuba);
  b6tem2El.classList.add("finita");
}

export function laqaziTlohk2nik2p2( b6tem2El: HTMLElement ): void {
  laqaziKuban(b6tem2El, [ skakef("webglNeSubtenata"), skakef("webglDetalo") ]);
}

export function laqaziSargxanTlohk2nik2p2( b6tem2El: HTMLElement, tlohk2nik2p2: unknown ): void {
  console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) }ʃᴜ j͐ʃᴜ ʌ ꞙɭɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ", tlohk2nik2p2);
  if ( document.getElementById("sargaTlohk2nik2p2") ) return;
  const gekare = tlohk2nik2p2 instanceof Error ? tlohk2nik2p2.message : String(tlohk2nik2p2);
  laqaziKuban(b6tem2El, [ gekare ]);
}
