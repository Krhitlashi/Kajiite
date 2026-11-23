// ≺⧼ j͑ʃɹ ɭʃɜ j͑ʃᴜᶗ‹ ꞁȷ̀ᴜ }ʃꞇ ⏳ ⧽≻
export interface SargxajHasukf2qani {
  stango: HTMLElement;
  sxargxaElemento: HTMLElement;
}

export function kf2Sargxilon( hasukf2qani: SargxajHasukf2qani ): { montriSargxon: ( sahakani: number, callback: () => void ) => void } {
  const { stango, sxargxaElemento } = hasukf2qani;
  let sargxaIntervalo: ReturnType<typeof setInterval> | null = null;
  let sxargxaRestorilo: ReturnType<typeof setTimeout> | null = null;

  function montriSargxon(sahakani: number, callback: () => void): void {
    if ( sargxaIntervalo ) { clearInterval(sargxaIntervalo); sargxaIntervalo = null; }
    if ( sxargxaRestorilo ) { clearTimeout(sxargxaRestorilo); sxargxaRestorilo = null; }
    stango.style.setProperty("--តេមិនី", "0");
    sxargxaElemento.style.transition = "opacity .2336092301648s";
    sxargxaElemento.classList.remove("finita");
    let progreso = 0;
    const tonaj = 0o40;
    sargxaIntervalo = setInterval(() => {
      progreso += 1 / tonaj;
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
    }, sahakani / tonaj);
  }

  return { montriSargxon };
}
