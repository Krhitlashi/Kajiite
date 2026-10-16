// ≺⧼ ការចាប់ផ្តើម 🎬 ⧽≻
import { traduki } from "../lingvo/tradukoj.js";
import { hazardaSemo, semoEnBazo8 } from "../mondo/semo.js";
import { sxaltiAŭdion, cxuAŭdio, sxaltiBruon, cxuBruo, autoKomenci, registriPostAŭdio } from "../../eskekoj/sonoj/sonoro.js";
import type { MondoRecordo } from "./mondoj.js";
import {
  agordiAktivanMondon, certigiCxefanMondon, duobligiMondon,
  forigiMondon, kreiMondon, legiMondojn, montriNomon,
} from "./mondoj.js";
// ⟨ ទំព័រដើម ( ព័ត៌មាន · ការកំណត់ · សម្លៀកបំពាក់ ) ត្រូវបានភ្ជាប់ដោយការនាំចូលនេះ 📃 ⟩
import "./hejmpaghoj.js";
import { kreiPaghon, fermiCxiujnPaghojn } from "./paghoj.js";

// ⟪ ធាតុ DOM 📃 ⟫
const komenco = document.getElementById("komenco")!;
const butAranis = document.getElementById("butAranis")!;
const butMondo = document.getElementById("butMondo")!;
const sxonoEnigo = document.getElementById("sxonoEnigo") as HTMLInputElement;
const butKreiMondon = document.getElementById("butKreiMondon")!;
const mondListo = document.getElementById("mondListo")!;
const butAgordoj = document.getElementById("butAgordoj")!;
const butAgordLingvo = document.getElementById("butAgordLingvo");

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
  fermiCxiujnPaghojn();
  import("../ludo/sperto.js");
}

// ⟪ ប៊ូតុងចូល 📃 ⟫
butAranis.addEventListener("click", () => eniriMondon(certigiCxefanMondon()));

// ⟪ ទំព័របង្កើត និងផ្ទុកពិភពលោក 📃 ⟫
const mondPagho = kreiPaghon("mondPagho", () => {
  montriListon();
  sxonoEnigo.focus();
});
butMondo.addEventListener("click", () => mondPagho.malfermi());

// ⟪ ការបង្កើតពិភពលោក 📃 ⟫
// គ្រាប់ពូជទទេបង្កើតគ្រាប់ពូជចៃដន្យ ដើម្បីឱ្យគ្រប់ពិភពលោកដែលបានបង្កើត
// មានដីផ្ទាល់ខ្លួន ។ ពិភពលោកចម្បង ( គ្មានគ្រាប់ពូជ ) ប្រើដីដែលឆ្លាក់ដោយដៃ ។
function kreiElMondon(): void {
  const skribita = sxonoEnigo.value.trim();
  kreiMondon({ smino: skribita || semoEnBazo8(hazardaSemo()) });
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

// ⟪ ម៉ឺនុយការកំណត់ដាច់ដោយឡែក , ពេញអេក្រង់ដោយគ្មានផ្ទាំងលេចឡើង 📃 ⟫
const butAgordSonoro = document.getElementById("butAgordSonoro");
const butAgordBruo = document.getElementById("butAgordBruo");

function gxisdatigiAgordSonoron(aktiva: boolean): void {
  if ( !butAgordSonoro ) return;
  butAgordSonoro.setAttribute("aria-pressed", String(aktiva));
}

function gxisdatigiAgordBruon(): void {
  if ( !butAgordBruo ) return;
  butAgordBruo.setAttribute("aria-pressed", String(cxuBruo()));
}

const agordPagho = kreiPaghon("agordPagho", () => {
  gxisdatigiAgordSonoron(cxuAŭdio());
  gxisdatigiAgordBruon();
  ( butAgordLingvo as HTMLButtonElement | null )?.focus();
});

butAgordoj.addEventListener("click", () => agordPagho.malfermi());

butAgordSonoro?.addEventListener("click", () => {
  gxisdatigiAgordSonoron(sxaltiAŭdion());
});
butAgordBruo?.addEventListener("click", () => {
  sxaltiBruon();
  gxisdatigiAgordBruon();
});
registriPostAŭdio(gxisdatigiAgordSonoron);
document.addEventListener("pointerdown", () => autoKomenci(), { once: true });
gxisdatigiAgordSonoron(cxuAŭdio());
gxisdatigiAgordBruon();
