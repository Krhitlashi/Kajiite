// ≺⧼ Menuo 🎛 ⧽≻
// La navigada pop-upo kaj gxia enhavo — la sona butono, la brua butono, la
// traka selektilo, la krepuska regilo kaj la vetera ciklo. Ĉio ĉi estas pura
// fasado super la sonaj kaj la scenaj moduloj; la modulo POSEDAS la krepuskan
// valoron kaj la veteran indekson, kaj la orkestrilo nur donas al gxi la
// elementojn kaj la agojn de la paneloj.
//
// La sono kaj la bruo jam vivas en eskekoj/sonoj/sonoro.js ( plus la muzika
// ludilo ) — la pop-upo nur butonumas ilin. Same la krepusko kaj la vetero
// apartenas al kantaoj/bildo/scena.ts ( aplikiRezimon / aplikiVeteron ).
import { realaKrepusko } from "../ludo/kalendaro.js";
import type { Vetero } from "../bildo/scena.js";

// MenuajOpcioj — la elementoj sur kiuj la menuo auxskultas, plus la agoj de la
// orkestrilo ( la panelaj fermoj ) kaj la sonaj kaj scenaj pordegoj.
export interface MenuajOpcioj {
  navPopUp: HTMLElement;
  navButono: HTMLElement;
  butSonoro: HTMLElement;
  butBruo: HTMLElement;
  butKrepusko: HTMLElement;
  duskRegilo: HTMLInputElement;
  butVetero: HTMLElement;
  veteroEtikedo: HTMLElement;
  vestaro: HTMLElement;
  informo: HTMLElement;
  fermiVestaron: () => void;
  fermiInformon: () => void;
  traduki: ( klavo: string ) => string;
  aplikiVacepu: () => void;
  aplikiRezimon: ( valoro: number ) => void;
  aplikiVeteron: ( vetero: Vetero ) => void;
  sonoro: {
    registriPostAŭdio: ( f: ( aktiva: boolean ) => void ) => void;
    autoKomenci: () => void;
    sxaltiAŭdion: () => boolean;
    cxuAŭdio: () => boolean;
    sxaltiBruon: () => void;
    cxuBruo: () => boolean;
  };
  muziko: {
    nunaTrako: () => number;
    cxuLudas: () => boolean;
    sxargiTrako: ( i: number ) => void;
    ludi: () => void;
  };
}

// Menuo — nur la pop-upa fermo elportas ( la vestejo kaj la panelaj klakoj
// fermas la pop-upon post la propra ago ).
export interface Menuo {
  fermiNaviganPopUp: () => void;
}

export function kreiMenuon( opcioj: MenuajOpcioj ): Menuo {
  const {
    navPopUp, navButono, butSonoro, butBruo, butKrepusko, duskRegilo,
    butVetero, veteroEtikedo, vestaro, informo,
    fermiVestaron, fermiInformon, traduki, aplikiVacepu, aplikiRezimon, aplikiVeteron,
    sonoro, muziko,
  } = opcioj;

  // ⟪ Navigada pop-up 📃 ⟫
  // La butono mem estas la fermilo. 二 fermita · 川 malfermita ( kaj la glifo
  // sekvas la staton ).
  function gxisdatigiNavButonon() {
    navButono.textContent = navPopUp.classList.contains("montri") ? "川" : "二";
    navButono.setAttribute("aria-pressed", String(navPopUp.classList.contains("montri")));
  }
  function sxaltiNaviganPopUp() {
    // Sub plenekrana panelo la pop-up kaŝiĝus malantaŭ ĝi ( ambaŭ z-6 ) —
    // la menu-butono anstataŭe fermas la malfermitan panelon.
    if ( vestaro.classList.contains("montri") ) { fermiVestaron(); return; }
    if ( informo.classList.contains("montri") ) { fermiInformon(); return; }
    navPopUp.classList.toggle("montri");
    gxisdatigiNavButonon();
  }
  function fermiNaviganPopUp() {
    navPopUp.classList.remove("montri");
    gxisdatigiNavButonon();
  }
  navButono.addEventListener("click", sxaltiNaviganPopUp);
  navPopUp.addEventListener("click", ( e ) => {
    if ( e.target === navPopUp ) fermiNaviganPopUp();
  });

  // ⟪ Aŭtomata komenco je unua tuŝo aŭ klako 📃 ⟫
  function gxisdatigiSonoranButonon(aktiva: boolean) {
    butSonoro.setAttribute("aria-pressed", String(aktiva));
    butSonoro.textContent = aktiva ? "♫" : "♬";
    gxisdatigiTrakoButonojn();
  }
  sonoro.registriPostAŭdio(gxisdatigiSonoranButonon);
  document.addEventListener("pointerdown", () => sonoro.autoKomenci(), { once: true });

  // ⟪ Sonora butono 📃 ⟫
  butSonoro.addEventListener("click", () => {
    const aktiva = sonoro.sxaltiAŭdion();
    gxisdatigiSonoranButonon(aktiva);
    fermiNaviganPopUp();
  });

  // ⟪ Brua butono ( fona bruo aparta de la muziko ) 📃 ⟫
  function gxisdatigiBruanButonon() {
    const aktiva = sonoro.cxuBruo();
    butBruo.setAttribute("aria-pressed", String(aktiva));
    butBruo.textContent = aktiva ? "≋" : "≈";
  }
  butBruo.addEventListener("click", () => {
    sonoro.sxaltiBruon();
    gxisdatigiBruanButonon();
    fermiNaviganPopUp();
  });
  gxisdatigiBruanButonon();

  // ⟪ Traka selektilo 📃 ⟫
  function gxisdatigiTrakoButonojn() {
    const nuna = muziko.nunaTrako();
    document.querySelectorAll(".trakaBut").forEach(b => {
      const i = parseInt(( b as HTMLElement ).dataset.trako || "0");
      b.setAttribute("aria-pressed", String(i === nuna && muziko.cxuLudas()));
    });
  }
  document.querySelectorAll(".trakaBut").forEach(b => {
    b.addEventListener("click", () => {
      const i = parseInt(( b as HTMLElement ).dataset.trako || "0");
      const estisLudanta = muziko.cxuLudas();
      muziko.sxargiTrako(i);
      // Ŝargado haltigas la malnovan buson; restartu ĉiufoje kiam la aŭdiosistemo
      // estas ŝaltita.
      if ( estisLudanta || sonoro.cxuAŭdio() ) muziko.ludi();
      gxisdatigiTrakoButonojn();
    });
  });

  // ⟪ Krepuska reĝimo 📃 ⟫
  let krepuskaValoro = Math.round(realaKrepusko() * 0o100) / 0o100;
  // La regilo kaj la butono montru la saman valoron kiel la ĉielo — la ludo
  // komenciĝas kun la reala taglumo, kaj la unua tuŝo de la regilo transprenas.
  duskRegilo.value = String(krepuskaValoro);
  butKrepusko.textContent = krepuskaValoro > 0o4/0o10 ? "☀" : "☽";
  butKrepusko.setAttribute("aria-pressed", String(krepuskaValoro > 0o4/0o10));
  aplikiRezimon(krepuskaValoro);
  butKrepusko.addEventListener("click", () => {
    if ( krepuskaValoro > 0o4/0o10 ) {
      krepuskaValoro = 0;
      duskRegilo.value = "0";
    } else {
      krepuskaValoro = 1;
      duskRegilo.value = "1";
    }
    butKrepusko.textContent = krepuskaValoro > 0o4/0o10 ? "☀" : "☽";
    butKrepusko.setAttribute("aria-pressed", String(krepuskaValoro > 0o4/0o10));
    aplikiRezimon(krepuskaValoro);
    fermiNaviganPopUp();
  });
  duskRegilo.addEventListener("input", () => {
    krepuskaValoro = parseFloat(duskRegilo.value);
    butKrepusko.textContent = krepuskaValoro > 0o4/0o10 ? "☀" : "☽";
    butKrepusko.setAttribute("aria-pressed", String(krepuskaValoro > 0o4/0o10));
    aplikiRezimon(krepuskaValoro);
  });

  // ⟪ Vetero ( nebula · pluva · hajla · nega ) 📃 ⟫
  // Cikla butono apud la krepuska regilo — ĉiu klako ŝanĝas al la sekva vetero.
  // La pluva, la hajla kaj la neĝa vetero ŝaltas la precipitan partiklan
  // sistemon kaj ŝanĝas la atmosferon ( ĉielo, lumoj, nebulo ) en scena.ts.
  const VETERAJ: { kodo: Vetero; glifo: string; klavo: string }[] = [
    { kodo: "nebula", glifo: "☁", klavo: "veteroNebula" },
    { kodo: "pluva", glifo: "☂", klavo: "veteroPluva" },
    { kodo: "hajla", glifo: "⛈", klavo: "veteroHajla" },
    { kodo: "nega", glifo: "❄", klavo: "veteroNega" },
  ];
  let veteraIndekso = 0;
  function gxisdatigiVeteranButonon(): void {
    const v = VETERAJ[veteraIndekso];
    butVetero.textContent = v.glifo;
    butVetero.setAttribute("aria-label", traduki(v.klavo));
    veteroEtikedo.textContent = traduki(v.klavo);
    // La nova etikedo ( aih ) bezonas la vacepu-vortojn.
    aplikiVacepu();
    aplikiVeteron(v.kodo);
  }
  butVetero.addEventListener("click", () => {
    veteraIndekso = ( veteraIndekso + 1 ) % VETERAJ.length;
    gxisdatigiVeteranButonon();
    fermiNaviganPopUp();
  });
  // Kiam la lingvo ŝanĝiĝas, la vetera etikedo refreŝiĝu ( la vetero mem restas ).
  window.addEventListener("lingvosxangxo", gxisdatigiVeteranButonon);
  gxisdatigiVeteranButonon();

  return { fermiNaviganPopUp };
}
