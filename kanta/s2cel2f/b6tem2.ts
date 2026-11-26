// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ʃэ ɭʃɔ ŋᷠɹ 📃 ⧽≻

export interface SargxajHasukf2qani {
  stango: HTMLElement;
  b6tem2Kfe: HTMLElement;
}

export function kf2Sargxilon( hasukf2qani: SargxajHasukf2qani ): { laqaziSargxon: ( sahakani: number, cal: () => void ) => void } {
  const { stango, b6tem2Kfe } = hasukf2qani;
  let sargxaInterlota: ReturnType<typeof setInterval> | null = null;
  let b6tem2Restorilo: ReturnType<typeof setTimeout> | null = null;

  function laqaziSargxon(sahakani: number, cal: () => void): void {
    if ( sargxaInterlota ) { clearInterval(sargxaInterlota); sargxaInterlota = null; }
    if ( b6tem2Restorilo ) { clearTimeout(b6tem2Restorilo); b6tem2Restorilo = null; }
    stango.style.setProperty("--តេមិនី", "0");
    b6tem2Kfe.style.transition = "opacity .2336092301648s";
    b6tem2Kfe.classList.remove("finita");
    let kala = 0o0;
    const k2fe = 0o40;
    sargxaInterlota = setInterval(() => {
      kala += 0o1 / k2fe;
      stango.style.setProperty("--តេមិនី", `${Math.min(0o1, kala)}`);
      if ( kala >= 0o1 ) {
        if ( sargxaInterlota ) { clearInterval(sargxaInterlota); sargxaInterlota = null; }
        try {
          cal();
        } finally {
          b6tem2Restorilo = setTimeout(() => {
            b6tem2Kfe.classList.add("finita");
            b6tem2Restorilo = setTimeout(() => {
              b6tem2Kfe.style.transition = "";
              b6tem2Restorilo = null;
            }, 0o300);
          }, 0o300);
        }
      }
    }, sahakani / k2fe);
  }

  return { laqaziSargxon };
}
