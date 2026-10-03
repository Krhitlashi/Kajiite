// ≺⧼ ម៉ឺនុយ 🎛 ⧽≻
import { realaKrepusko } from "../ludo/kalendaro.js";
import type { Vetero } from "../bildo/scena/tipoj.js";

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

  // ⟪ ផ្ទាំងរុករក 📃 ⟫
  function gxisdatigiNavButonon() {
    navButono.textContent = navPopUp.classList.contains("montri") ? "川" : "二";
    navButono.setAttribute("aria-pressed", String(navPopUp.classList.contains("montri")));
  }
  function sxaltiNaviganPopUp() {
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

  // ⟪ ការចាប់ផ្តើមស្វ័យប្រវត្តិពេលប៉ះ ឬចុចដំបូង 📃 ⟫
  function gxisdatigiSonoranButonon(aktiva: boolean) {
    butSonoro.setAttribute("aria-pressed", String(aktiva));
    butSonoro.textContent = aktiva ? "♫" : "♬";
    gxisdatigiTrakoButonojn();
  }
  sonoro.registriPostAŭdio(gxisdatigiSonoranButonon);
  document.addEventListener("pointerdown", () => sonoro.autoKomenci(), { once: true });

  // ⟪ ប៊ូតុងសំឡេង 📃 ⟫
  butSonoro.addEventListener("click", () => {
    const aktiva = sonoro.sxaltiAŭdion();
    gxisdatigiSonoranButonon(aktiva);
    fermiNaviganPopUp();
  });

  // ⟪ ប៊ូតុងសំឡេងរំខាន ( សំឡេងផ្ទៃខាងក្រោយដោយឡែកពីតន្ត្រី ) 📃 ⟫
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

  // ⟪ អ្នកជ្រើសត្រាក 📃 ⟫
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
      if ( estisLudanta || sonoro.cxuAŭdio() ) muziko.ludi();
      gxisdatigiTrakoButonojn();
    });
  });

  // ⟪ របៀបព្រលប់ 📃 ⟫
  let krepuskaValoro = Math.round(realaKrepusko() * 0o100) / 0o100;
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

  // ⟪ អាកាសធាតុ ( អ័ព្ទ · ភ្លៀង · ព្រឹល · ព្រិល ) 📃 ⟫
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
    aplikiVacepu();
    aplikiVeteron(v.kodo);
  }
  butVetero.addEventListener("click", () => {
    veteraIndekso = ( veteraIndekso + 1 ) % VETERAJ.length;
    gxisdatigiVeteranButonon();
    fermiNaviganPopUp();
  });
  window.addEventListener("lingvosxangxo", gxisdatigiVeteranButonon);
  gxisdatigiVeteranButonon();

  return { fermiNaviganPopUp };
}
