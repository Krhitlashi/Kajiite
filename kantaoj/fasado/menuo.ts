// ≺⧼ }ʃɹ ɭʃᴜ }ʃw 🎛 ⧽≻
import { realaKrepusko } from "../ludo/kalendaro.js";
import type { Vetero } from "../bildo/scena/hahunaq.js";
import { kf2Staton } from "./paghoj.js";
import type { Stato } from "./paghoj.js";
import { sonhakama } from "./sonhakama.js";
import { vefalKu1o, ve3aqKu1o } from "../../eskekoj/komunajxoj/agordoj.js";

export interface MenuajHasukf2qani {
  navPopUp: HTMLElement;
  navButono: HTMLElement;
  butKrepusko: HTMLElement;
  duskKama: HTMLInputElement;
  butVetero: HTMLElement;
  veteroEtikedo: HTMLElement;
  butKonserviEliri: HTMLElement;
  konserviEliri: () => void;
  /*តើទំព័រសម្លៀកបំពាក់កំពុងបើកឬទេ ៖ បើបើក ប៊ូតុងម៉ឺនុយបិទវាមុន
      @param tsekeVestaroMalfermita ( function ) */
  tsekeVestaroMalfermita: () => boolean;
  inqoxa: HTMLElement;
  fermiVestaron: () => void;
  fermiInqoxan: () => void;
  traduki: ( ca3aq: string ) => string;
  aplikiVacepu: () => void;
  aplikiRezimon: ( skek2: number ) => void;
  aplikiVeteron: ( vetero: Vetero ) => void;
}

export interface Menuo {
  fermiNaviganPopUp: () => void;
}

export function kf2Menuon( hasukf2qani: MenuajHasukf2qani ): Menuo {
  const {
    navPopUp, navButono, butKrepusko, duskKama,
    butVetero, veteroEtikedo, butKonserviEliri, tsekeVestaroMalfermita, inqoxa,
    fermiVestaron, fermiInqoxan, traduki, aplikiVacepu, aplikiRezimon, aplikiVeteron,
    konserviEliri,
  } = hasukf2qani;

  // ⟪ ផ្ទាំងរុករក ៖ ម៉ឺនុយដូចគ្នានឹងផ្ទាំងលេចឡើងដទៃ , បើកវាបិទម៉ឺនុយផ្សេង 📃 ⟫
  function gxisdatigiNavButonon() {
    const malfermita = navStato.tsekeMalfermita();
    navButono.textContent = malfermita ? "川" : "二";
    navButono.setAttribute("aria-pressed", String(malfermita));
  }
  const navStato: Stato = kf2Staton("navPopUp", undefined, gxisdatigiNavButonon);
  function sxaltiNaviganPopUp() {
    if ( tsekeVestaroMalfermita() ) { fermiVestaron(); return; }
    if ( inqoxa.classList.contains("montri") ) { fermiInqoxan(); return; }
    if ( navStato.tsekeMalfermita() ) navStato.kasxi(); else navStato.malfermi();
  }
  function fermiNaviganPopUp() {
    navStato.fermi();
  }
  navButono.addEventListener("click", sxaltiNaviganPopUp);

  // ⟪ សំឡេង , សំឡេងរំខាន , បទ ៖ ចែករំលែកកូដជាមួយទំព័រការកំណត់ 📃 ⟫
  // ⟨ បិទផ្ទាំងរុករកពេលបិទបើកសំឡេង ឬសំឡេងរំខាន ៖ ចុចបទមិនបិទទេ ដូចមុន 📃 ⟩
  sonhakama().ligi(navPopUp, ( pudal ) => {
    if ( pudal !== "trako" ) fermiNaviganPopUp();
  });

  // ⟪ របៀបព្រលប់ 📃 ⟫
  // ⟨ តម្លៃដែលបានរក្សាទុកមានអាទិភាព ។ បើគ្មាន គណនាតាមព្រះអាទិត្យពិត 📃 ⟩
  // ⟨ aplikiRezimon លាយពី tago ទៅ krepusko តាម t , ដូច្នេះ 0 ជាថ្ងៃ ហើយ 1 ជាព្រលប់ ។
  //   រូបតំណាងបង្ហាញស្ថានភាពបច្ចុប្បន្ន , ចំណែក aria-pressed ប្រាប់ថារបៀបព្រលប់បើកឬទេ ។ 📃 ⟩
  let krepuskaValoro = 0;
  function aplikiKrepuskon( skek2: number ): void {
    krepuskaValoro = skek2;
    duskKama.value = String(skek2);
    const nokte = skek2 > 0o4/0o10;
    butKrepusko.textContent = nokte ? "☽" : "☀";
    butKrepusko.setAttribute("aria-pressed", String(nokte));
    aplikiRezimon(skek2);
  }
  butKrepusko.addEventListener("click", () => {
    aplikiKrepuskon(krepuskaValoro > 0o4/0o10 ? 0 : 1);
    ve3aqKu1o("krepusko", krepuskaValoro);
    fermiNaviganPopUp();
  });
  duskKama.addEventListener("input", () => {
    aplikiKrepuskon(parseFloat(duskKama.value) || 0);
    ve3aqKu1o("krepusko", krepuskaValoro);
  });
  const konservitaKrepusko = vefalKu1o("krepusko", -0o1);
  aplikiKrepuskon(
    konservitaKrepusko >= 0 && konservitaKrepusko <= 1
      ? konservitaKrepusko
      : Math.round(realaKrepusko() * 0o100) / 0o100
  );

  // ⟪ អាកាសធាតុ ( អ័ព្ទ · ភ្លៀង · ព្រឹល · ព្រិល ) 📃 ⟫
  const VETERAJ: { kodo: Vetero; glifo: string; ca3aq: string }[] = [
    { kodo: "nebula", glifo: "☁", ca3aq: "veteroNebula" },
    { kodo: "pluva", glifo: "☂", ca3aq: "veteroPluva" },
    { kodo: "hajla", glifo: "⛈", ca3aq: "veteroHajla" },
    { kodo: "nega", glifo: "❄", ca3aq: "veteroNega" },
  ];
  // ⟨ អាកាសធាតុដែលបានរក្សាទុកមានអាទិភាព ។ បើគ្មាន ចាប់ផ្តើមពីអ័ព្ទ 📃 ⟩
  const konservitaVetero = vefalKu1o<string>("vetero", "");
  const konservitaIndekso = VETERAJ.findIndex(v => v.kodo === konservitaVetero);
  let veteraIndekso = konservitaIndekso >= 0 ? konservitaIndekso : 0;
  function gxisdatigiVeteranButonon(): void {
    const v = VETERAJ[veteraIndekso];
    butVetero.textContent = v.glifo;
    butVetero.setAttribute("aria-label", traduki(v.ca3aq));
    veteroEtikedo.textContent = traduki(v.ca3aq);
    aplikiVacepu();
    aplikiVeteron(v.kodo);
  }
  butVetero.addEventListener("click", () => {
    veteraIndekso = ( veteraIndekso + 1 ) % VETERAJ.length;
    gxisdatigiVeteranButonon();
    ve3aqKu1o("vetero", VETERAJ[veteraIndekso].kodo);
    fermiNaviganPopUp();
  });
  window.addEventListener("lingvosxangxo", gxisdatigiVeteranButonon);
  gxisdatigiVeteranButonon();

  // ⟪ ការរក្សាទុក និងការចេញពីពិភពលោក 📃 ⟫
  butKonserviEliri.addEventListener("click", () => konserviEliri());

  return { fermiNaviganPopUp };
}
