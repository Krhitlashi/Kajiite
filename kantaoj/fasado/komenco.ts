// ≺⧼ ការចាប់ផ្តើម 🎬 ⧽≻
import { traduki } from "../lingvo/tradukoj.js";
import type { MondoRecordo } from "./mondoj.js";
import {
  agordiAktivanMondon, certigiCxefanMondon, duobligiMondon,
  forigiMondon, kreiMondon, legiMondojn, montriNomon,
} from "./mondoj.js";

// ⟪ ធាតុ DOM 📃 ⟫
const komenco = document.getElementById("komenco")!;
const mondPagho = document.getElementById("mondPagho")!;
const butAranis = document.getElementById("butAranis")!;
const butMondo = document.getElementById("butMondo")!;
const mondReeniri = document.getElementById("mondReeniri")!;
const sxonoEnigo = document.getElementById("sxonoEnigo") as HTMLInputElement;
const butKreiMondon = document.getElementById("butKreiMondon")!;
const mondListo = document.getElementById("mondListo")!;

// ⟪ ស្ថានភាព 📃 ⟫
let ludata = false;

/*បង្កើតប៊ូតុងតូចមួយក្នុងបញ្ជី
    @param teksto ( string ) - អក្សរបង្ហាញ
    @param klavo ( string ) - សោបកប្រែសម្រាប់ aria
    @param ago ( string ) - សកម្មភាព
    @param id ( string ) - លេខសម្គាល់ពិភពលោក
@return butono */
function kreiButonon( teksto: string, klavo: string, ago: string, id: string ): HTMLButtonElement {
  const butono = document.createElement("button");
  butono.textContent = teksto;
  butono.setAttribute("aria-label", traduki(klavo));
  butono.dataset.ago = ago;
  butono.dataset.id = id;
  return butono;
}

/*បង្កើតបន្ទាត់មួយសម្រាប់ពិភពលោក
    @param mondo ( MondoRecordo ) - កំណត់ត្រា
@return vico */
function kreiVicon( mondo: MondoRecordo ): HTMLElement {
  const vico = document.createElement("ciihii");
  const nomo = document.createElement("p");
  nomo.textContent = montriNomon(mondo);
  const grupo = document.createElement("sabosuc2w2q");
  grupo.appendChild(nomo);
  grupo.appendChild(kreiButonon("步", "ariaMondRestauri", "eni", mondo.id));
  grupo.appendChild(kreiButonon("多", "ariaMondDuobligi", "duobligi", mondo.id));
  grupo.appendChild(kreiButonon("川", "ariaMondForigi", "forigi", mondo.id));
  vico.appendChild(grupo);
  return vico;
}

/*បង្ហាញបញ្ជីពិភពលោកទាំងមូល */
function montriListon(): void {
  const mondoj = legiMondojn();
  mondListo.textContent = "";
  if ( mondoj.length === 0 ) {
    const malplena = document.createElement("p");
    malplena.className = "ksakat2xa";
    malplena.textContent = traduki("mondMalplena");
    mondListo.appendChild(malplena);
    return;
  }
  for ( const mondo of mondoj ) mondListo.appendChild(kreiVicon(mondo));
}

/*ចូលពិភពលោក ហើយផ្ទុកកូដធំដោយស្ងាត់
    @param mondo ( MondoRecordo ) - ពិភពលោកដែលត្រូវចូល */
function eniriMondon( mondo: MondoRecordo ): void {
  if ( ludata ) return;
  ludata = true;
  agordiAktivanMondon(mondo.id);
  komenco.classList.add("finita");
  mondPagho.classList.remove("montri");
  import("../ludo/sperto.js");
}

// ⟪ ប៊ូតុងចូល 📃 ⟫
butAranis.addEventListener("click", () => eniriMondon(certigiCxefanMondon()));

// ⟪ ទំព័របង្កើត និងផ្ទុកពិភពលោក 📃 ⟫
butMondo.addEventListener("click", () => {
  montriListon();
  mondPagho.classList.add("montri");
  sxonoEnigo.focus();
});
mondReeniri.addEventListener("click", () => mondPagho.classList.remove("montri"));
mondPagho.addEventListener("click", ( e ) => {
  if ( e.target === mondPagho ) mondPagho.classList.remove("montri");
});

// ⟪ ការបង្កើតពិភពលោក ( ព័ត៌មានគ្រាប់ពូជមកដល់ក្រោយ ) 📃 ⟫
function kreiElMondon(): void {
  kreiMondon({ smino: sxonoEnigo.value });
  sxonoEnigo.value = "";
  montriListon();
}
butKreiMondon.addEventListener("click", kreiElMondon);
sxonoEnigo.addEventListener("keydown", ( e ) => {
  if ( e.key === "Enter" ) kreiElMondon();
});

// ⟪ សកម្មភាពក្នុងបញ្ជី ( បន្ត · លុប · ចម្លង ) 📃 ⟫
mondListo.addEventListener("click", ( e ) => {
  const celo = ( e.target as HTMLElement ).closest("button");
  if ( !celo ) return;
  const butono = celo as HTMLButtonElement;
  const id = butono.dataset.id || "";
  const ago = butono.dataset.ago || "";
  if ( ago === "eni" ) {
    const mondo = legiMondojn().find(m => m.id === id);
    if ( mondo ) eniriMondon(mondo);
  } else if ( ago === "forigi" ) {
    forigiMondon(id);
    montriListon();
  } else if ( ago === "duobligi" ) {
    duobligiMondon(id);
    montriListon();
  }
});

// ⟪ ការផ្លាស់ភាសា 📃 ⟫
window.addEventListener("lingvosxangxo", montriListon);
