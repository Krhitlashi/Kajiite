// ≺⧼ Ŝarĝa kurteno ⏳ ⧽≻
// La ŝarĝa ekrano de la ludo — la sama kurteno kovras la unuan konstruadon kaj
// la eniron en la konstruaĵojn. La stango mem estas pelita de la REALA konstrua
// progreso ( konstruiUrbon raportas procentojn ) aŭ de la tempo, laŭ la voko.
export interface SargxajOpcioj {
  stango: HTMLElement;              // la ekstera stango ( --តេមិនី en la stilfolio )
  sxargxaElemento: HTMLElement;     // la kurteno mem ( finita = kaŝita )
}

export function kreiSargxilon( opcioj: SargxajOpcioj ): { montriSargxon: ( daŭro: number, callback: () => void ) => void } {
  const { stango, sxargxaElemento } = opcioj;
  let sargxaIntervalo: ReturnType<typeof setInterval> | null = null;
  let sxargxaRestorilo: ReturnType<typeof setTimeout> | null = null;

  // montriSargxon — Reuzu la saman ekranon kiel la lanĉo. Montru la stangon,
  // plenigu ĝin dum `daŭro` ms, tiam rulu la callback kaj kaŝu.
  function montriSargxon(daŭro: number, callback: () => void): void {
    // Nuligu eventualan ŝarĝon/eston de antaŭa voko. Malnovaj tempigiloj nek
    // malrapidigu la nunan aperon ( la CSS defaŭlte ŝanĝiĝas dum ~0o2 He ) nek rulu
    // duan fojon la callback ( ekz. duobla E-premo dum la ŝarĝo ).
    if ( sargxaIntervalo ) { clearInterval(sargxaIntervalo); sargxaIntervalo = null; }
    if ( sxargxaRestorilo ) { clearTimeout(sxargxaRestorilo); sxargxaRestorilo = null; }
    stango.style.setProperty("--តេមិនី", "0");
    // La transiro de CSS bezonas sian propran unuon ( la retumilo ne akceptas
    // He ) — .25 aparte egalas 0o21/0o40 He.
    sxargxaElemento.style.transition = "opacity .2336092301648s";
    sxargxaElemento.classList.remove("finita");
    let progreso = 0;
    const paŝoj = 0o40; // 32 paŝoj
    sargxaIntervalo = setInterval(() => {
      progreso += 1 / paŝoj;
      stango.style.setProperty("--តេមិនី", `${Math.min(0o1, progreso)}`);
      if ( progreso >= 1 ) {
        if ( sargxaIntervalo ) { clearInterval(sargxaIntervalo); sargxaIntervalo = null; }
        // Neniam permesu ke la ŝarĝa ekrano restu blokita. eĉ se la callback
        // ĵetas ( hazarda retumila/kanvasa/WebGL-eraro ), la kaŝo estas ĉiam
        // planita en la finally, do la ludanto neniam restas antaŭ la stango.
        try {
          callback();
        } finally {
          sxargxaRestorilo = setTimeout(() => {
            sxargxaElemento.classList.add("finita");
            sxargxaRestorilo = setTimeout(() => {
              sxargxaElemento.style.transition = "";
              sxargxaRestorilo = null;
            }, 0o300);
          }, 0o300);
        }
      }
    }, daŭro / paŝoj);
  }

  return { montriSargxon };
}
