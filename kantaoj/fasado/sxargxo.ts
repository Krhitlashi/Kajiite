// ≺⧼ វាំងននផ្ទុក ⏳ ⧽≻
export interface SargxajOpcioj {
  stango: HTMLElement;
  sxargxaElemento: HTMLElement;
}

export function kreiSargxilon( opcioj: SargxajOpcioj ): { montriSargxon: ( daŭro: number, callback: () => void ) => void } {
  const { stango, sxargxaElemento } = opcioj;
  let sargxaIntervalo: ReturnType<typeof setInterval> | null = null;
  let sxargxaRestorilo: ReturnType<typeof setTimeout> | null = null;

  function montriSargxon(daŭro: number, callback: () => void): void {
    if ( sargxaIntervalo ) { clearInterval(sargxaIntervalo); sargxaIntervalo = null; }
    if ( sxargxaRestorilo ) { clearTimeout(sxargxaRestorilo); sxargxaRestorilo = null; }
    stango.style.setProperty("--តេមិនី", "0");
    sxargxaElemento.style.transition = "opacity .2336092301648s";
    sxargxaElemento.classList.remove("finita");
    let progreso = 0;
    const paŝoj = 0o40;
    sargxaIntervalo = setInterval(() => {
      progreso += 1 / paŝoj;
      stango.style.setProperty("--តេមិនី", `${Math.min(0o1, progreso)}`);
      if ( progreso >= 1 ) {
        if ( sargxaIntervalo ) { clearInterval(sargxaIntervalo); sargxaIntervalo = null; }
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
