// ≺⧼ ម៉ឺនុយ 🎛 ⧽≻
import { realaKrepusko } from "../ludo/kalendaro.js";
import type { Vetero } from "../bildo/scena/tipoj.js";
import { kreiPanelon } from "./paghoj.js";
import type { Panelo } from "./paghoj.js";
import { sonregiloj } from "./sonregiloj.js";
import { legiAgordon, skribiAgordon } from "../../eskekoj/komunajxoj/agordoj.js";

export interface MenuajOpcioj {
  navPopUp: HTMLElement;
  navButono: HTMLElement;
  butKrepusko: HTMLElement;
  duskRegilo: HTMLInputElement;
  butVetero: HTMLElement;
  veteroEtikedo: HTMLElement;
  butKonserviEliri: HTMLElement;
  konserviEliri: () => void;
  /*តើទំព័រសម្លៀកបំពាក់កំពុងបើកឬទេ ៖ បើបើក ប៊ូតុងម៉ឺនុយបិទវាមុន
      @param cxuVestaroMalfermita ( function ) */
  cxuVestaroMalfermita: () => boolean;
  informo: HTMLElement;
  fermiVestaron: () => void;
  fermiInformon: () => void;
  traduki: ( klavo: string ) => string;
  aplikiVacepu: () => void;
  aplikiRezimon: ( valoro: number ) => void;
  aplikiVeteron: ( vetero: Vetero ) => void;
}

export interface Menuo {
  fermiNaviganPopUp: () => void;
}

export function kreiMenuon( opcioj: MenuajOpcioj ): Menuo {
  const {
    navPopUp, navButono, butKrepusko, duskRegilo,
    butVetero, veteroEtikedo, butKonserviEliri, cxuVestaroMalfermita, informo,
    fermiVestaron, fermiInformon, traduki, aplikiVacepu, aplikiRezimon, aplikiVeteron,
    konserviEliri,
  } = opcioj;

  // ⟪ ផ្ទាំងរុករក ៖ ម៉ឺនុយដូចគ្នានឹងផ្ទាំងលេចឡើងដទៃ , បើកវាបិទម៉ឺនុយផ្សេង 📃 ⟫
  function gxisdatigiNavButonon() {
    const malfermita = navStato.cxuMalfermita();
    navButono.textContent = malfermita ? "川" : "二";
    navButono.setAttribute("aria-pressed", String(malfermita));
  }
  const navStato: Panelo = kreiPanelon("navPopUp", undefined, gxisdatigiNavButonon);
  function sxaltiNaviganPopUp() {
    if ( cxuVestaroMalfermita() ) { fermiVestaron(); return; }
    if ( informo.classList.contains("montri") ) { fermiInformon(); return; }
    if ( navStato.cxuMalfermita() ) navStato.kasxi(); else navStato.malfermi();
  }
  function fermiNaviganPopUp() {
    navStato.fermi();
  }
  navButono.addEventListener("click", sxaltiNaviganPopUp);

  // ⟪ សំឡេង , សំឡេងរំខាន , បទ ៖ ចែករំលែកកូដជាមួយទំព័រការកំណត់ 📃 ⟫
  // ⟨ បិទផ្ទាំងរុករកពេលបិទបើកសំឡេង ឬសំឡេងរំខាន ៖ ចុចបទមិនបិទទេ ដូចមុន 📃 ⟩
  sonregiloj().ligi(navPopUp, ( speco ) => {
    if ( speco !== "trako" ) fermiNaviganPopUp();
  });

  // ⟪ របៀបព្រលប់ 📃 ⟫
  // ⟨ តម្លៃដែលបានរក្សាទុកមានអាទិភាព ។ បើគ្មាន គណនាតាមព្រះអាទិត្យពិត 📃 ⟩
  let krepuskaValoro = 0;
  function aplikiKrepuskon( valoro: number ): void {
    krepuskaValoro = valoro;
    duskRegilo.value = String(valoro);
    const tage = valoro > 0o4/0o10;
    butKrepusko.textContent = tage ? "☀" : "☽";
    butKrepusko.setAttribute("aria-pressed", String(tage));
    aplikiRezimon(valoro);
  }
  butKrepusko.addEventListener("click", () => {
    aplikiKrepuskon(krepuskaValoro > 0o4/0o10 ? 0 : 1);
    skribiAgordon("krepusko", krepuskaValoro);
    fermiNaviganPopUp();
  });
  duskRegilo.addEventListener("input", () => {
    aplikiKrepuskon(parseFloat(duskRegilo.value) || 0);
    skribiAgordon("krepusko", krepuskaValoro);
  });
  const konservitaKrepusko = legiAgordon("krepusko", -0o1);
  aplikiKrepuskon(
    konservitaKrepusko >= 0 && konservitaKrepusko <= 1
      ? konservitaKrepusko
      : Math.round(realaKrepusko() * 0o100) / 0o100
  );

  // ⟪ អាកាសធាតុ ( អ័ព្ទ · ភ្លៀង · ព្រឹល · ព្រិល ) 📃 ⟫
  const VETERAJ: { kodo: Vetero; glifo: string; klavo: string }[] = [
    { kodo: "nebula", glifo: "☁", klavo: "veteroNebula" },
    { kodo: "pluva", glifo: "☂", klavo: "veteroPluva" },
    { kodo: "hajla", glifo: "⛈", klavo: "veteroHajla" },
    { kodo: "nega", glifo: "❄", klavo: "veteroNega" },
  ];
  // ⟨ អាកាសធាតុដែលបានរក្សាទុកមានអាទិភាព ។ បើគ្មាន ចាប់ផ្តើមពីអ័ព្ទ 📃 ⟩
  const konservitaVetero = legiAgordon<string>("vetero", "");
  const konservitaIndekso = VETERAJ.findIndex(v => v.kodo === konservitaVetero);
  let veteraIndekso = konservitaIndekso >= 0 ? konservitaIndekso : 0;
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
    skribiAgordon("vetero", VETERAJ[veteraIndekso].kodo);
    fermiNaviganPopUp();
  });
  window.addEventListener("lingvosxangxo", gxisdatigiVeteranButonon);
  gxisdatigiVeteranButonon();

  // ⟪ ការរក្សាទុក និងការចេញពីពិភពលោក 📃 ⟫
  butKonserviEliri.addEventListener("click", () => konserviEliri());

  return { fermiNaviganPopUp };
}
