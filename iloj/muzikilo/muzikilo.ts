// ≺⧼ ឧបករណ៍ចាក់ចម្រៀង 🎧 ⧽≻
// ឧបករណ៍នេះចាក់វិលទាំង 0o7 តាមម៉ាស៊ីនលេងតន្ត្រីពិតរបស់ហ្គេម។
// វាបង្កើត AudioContext ដោយខ្លួនឯងនៅពេលអន្តរកម្មដំបូង ហើយបិទការបន្ត
// ស្វ័យប្រវត្តិ ដូច្នេះបទនីមួយៗឈប់ពេលចប់ មិនលោតទៅបទផ្សេងទេ។

import { KANTOJ } from "../../eskekoj/sonoj/muziko/kantoj.js";
import { iniciati, ludi, halti, sxargiTrako, nunaTrako, cxuLudas, progreso, salti, agordiAŭtomatan, nunajInstrumentoj } from "../../eskekoj/sonoj/muziko/ludilo.js";
import { AIH } from "../../kantaoj/lingvo/tradukoj/aih.js";
import { elemento } from "../komunajxoj/dom.js";
import { HE } from "../../eskekoj/sonoj/muziko/vokoj/tempo.js";
import { instrumento } from "../../eskekoj/sonoj/muziko/vokoj/instrumento.js";
import { F, NYAM } from "../../eskekoj/sonoj/muziko/vokoj/skaloj.js";
import type { SonoEvento } from "../../eskekoj/sonoj/muziko/vokoj/tipoj.js";

// ⟨ ហេ ៖ 2^32 ជុំវិញសេស្យូម ១៣៣ គិតជាវិនាទី 📃 ⟩

const baskuliBut = elemento<HTMLButtonElement>("baskuli");
const haltiBut = elemento<HTMLButtonElement>("halti");
const volumo = elemento<HTMLInputElement>("volumo");
const volVal = elemento<HTMLOutputElement>("volVal");
const nunaTitolo = elemento("nunaTitolo");
const nunaInstrs = elemento("nunaInstrs");
const progresoEl = elemento<HTMLInputElement>("progreso");
const tempo = elemento("tempo");
const sekcio = elemento("sekcio");
const trakListo = elemento("trakListo");
const sonListo = elemento("sonListo");

let AC: AudioContext | null = null;
let master: GainNode | null = null;

// ⟨ ប៊ូតុងសាកល្បងនីមួយៗភ្ជាប់នឹងឧបករណ៍របស់វា ដើម្បីប្លែងពេលកំពុងលេងក្នុងបទ 📃 ⟩
const sonButonoj: { i: string; but: HTMLButtonElement }[] = [];
let instrSpanoj: { i: string; el: HTMLSpanElement }[] = [];
let lastInstrTrako = -0o1;

/*បង្កើតប្រព័ន្ធសំឡេងនៅពេលត្រូវការ ៖ ហៅម្តងគ្រប់គ្រាន់
@returns void */
function ensureAudio(): void {
  if ( AC ) {
    if ( AC.state === "suspended" ) AC.resume();
    return;
  }
  const Konstruilo = window.AudioContext ?? ( window as unknown as { webkitAudioContext: typeof AudioContext } ).webkitAudioContext;
  AC = new Konstruilo();
  if ( AC.state === "suspended" ) AC.resume();
  master = AC.createGain();
  master.gain.value = parseFloat(volumo.value);
  master.connect(AC.destination);
  iniciati(AC, master);
}

/*បំប្លែងវិនាទីទៅហេ ជាលេខគោលប្រាំបី
    @param sek ( number ) - រយៈពេលគិតជាវិនាទី
@returns ហេ ( string ) */
function alHe( sek: number ): string {
  return "0o" + Math.round( sek / HE ).toString(8);
}

/* យកឈ្មោះបទពិតពីវចនានុក្រម aih ។ បើគ្មានកូនសោ ត្រឡប់ទៅឈ្មោះក្នុងបញ្ជីវិញ
    @param i ( number ) - លេខសន្ទស្សន៍បទ
@returns ឈ្មោះបទ ( string ) */
function nomoDeTrako( i: number ): string {
  return AIH["muzikTrako" + i] ?? KANTOJ[i].title;
}

// ⟪ បញ្ជីបទ 📃 ⟫

agordiAŭtomatan(false);

const butonoj: HTMLButtonElement[] = [];
KANTOJ.forEach(( k, i ) => {
  const b = document.createElement("button");
  b.className = "trako";
  b.setAttribute("aria-pressed", "false");
  const no = document.createElement("span");
  no.className = "trakoNo";
  no.textContent = k.no;
  const titolo = document.createElement("span");
  titolo.className = "trakoTitolo";
  titolo.textContent = nomoDeTrako(i);
  const meta = document.createElement("span");
  meta.className = "trakoMeta";
  meta.textContent = `${k.instrs.length} ឧបករណ៍ · ${alHe(k.data.dur)} ហេ`;
  b.append(no, titolo, meta);
  b.addEventListener("click", () => {
    ensureAudio();
    sxargiTrako(i);
    ludi();
  });
  trakListo.appendChild(b);
  butonoj.push(b);
});

// ⟪ សាកល្បងសំឡេងឧបករណ៍ 📃 ⟫

interface SonoProvo {
  nomo: string;
  okazaĵo: SonoEvento;
}

/* បញ្ជីឧបករណ៍ ទុកកម្ពស់និងរយៈពេលឱ្យសមនឹងសំឡេងរបស់វា
   ទាំងអស់ឆ្លងកាត់ឧបករណ៍ផ្សាយតែមួយជាមួយសំឡេងក្នុងហ្គេម 📃 */
const SONPROVOJ: SonoProvo[] = [
  { nomo: "siku", okazaĵo: { t: 0, i: "siku", f: F(0o100), d: 0o35/0o100, v: 0o6/0o10 } },
  { nomo: "ocarina", okazaĵo: { t: 0, i: "ocarina", f: F(0o105), d: 0o35/0o100, v: 0o6/0o10 } },
  { nomo: "didj", okazaĵo: { t: 0, i: "didj", f: 0o4425/0o40, d: 0o150/0o100, v: 0o6/0o10 } },
  { nomo: "didj · សូរខ្លី", okazaĵo: { t: 0, i: "didj", f: 0o4425/0o40, d: 0o25/0o100, v: 0o6/0o10, toot: true } },
  { nomo: "guiro", okazaĵo: { t: 0, i: "guiro", f: 0, d: 0o100/0o100, v: 0o6/0o10, cresc: 1 } },
  { nomo: "tjurunga", okazaĵo: { t: 0, i: "tjurunga", f: 0o334, d: 0o6/0o10, v: 0o6/0o10 } },
  { nomo: "slenthem", okazaĵo: { t: 0, i: "slenthem", f: F(0o67), d: 0o2/0o10, v: 0o6/0o10 } },
  { nomo: "inanga", okazaĵo: { t: 0, i: "inanga", f: F(0o64), d: 0o75/0o100, v: 0o6/0o10, dur: 0o75/0o100 } },
  { nomo: "mbira", okazaĵo: { t: 0, i: "mbira", f: F(0o71), d: 0o2/0o10, v: 0o6/0o10 } },
  { nomo: "kiiqflak", okazaĵo: { t: 0, i: "kiiqflak", f: F(NYAM[0o1]), d: HE / 0o2, v: 0o6/0o10 } },
  { nomo: "hiwe", okazaĵo: { t: 0, i: "hiwe", f: F(0o71), d: 0o6/0o10, v: 0o6/0o10 } },
];

SONPROVOJ.forEach(p => {
  const b = document.createElement("button");
  b.textContent = p.nomo;
  b.dataset.instrumento = p.okazaĵo.i;
  b.setAttribute("aria-pressed", "false");
  b.addEventListener("click", () => {
    ensureAudio();
    if ( !AC || !master ) return;
    instrumento(AC, master, p.okazaĵo, AC.currentTime + 0o1/0o40);
  });
  sonListo.appendChild(b);
  sonButonoj.push({ i: p.okazaĵo.i, but: b });
});

// ⟪ ការបញ្ជា 📃 ⟫

baskuliBut.addEventListener("click", () => {
  ensureAudio();
  if ( nunaTrako() < 0 ) sxargiTrako(0);
  ludi();
});

haltiBut.addEventListener("click", () => {
  halti();
});

volumo.addEventListener("input", () => {
  volVal.textContent = volumo.value;
  if ( master && AC ) master.gain.setTargetAtTime(parseFloat(volumo.value), AC.currentTime, 0o1/0o40);
});

// ⟪ ការរំកិលទៅមុខតំណែងក្នុងបទ 📃 ⟫

/* បំប្លែងហេទៅវិនាទី
    @param he ( number ) - រយៈពេលគិតជាហេ
@returns វិនាទី ( number ) */
function alSek( he: number ): number {
  return he * HE;
}

// ⟨ ខណៈអូសគំនូសរំកិល ការធ្វើបច្ចុប្បន្នភាពមិនរំលើងតម្លៃរបស់វាទេ 📃 ⟩
let trenas = false;

progresoEl.addEventListener("input", () => {
  trenas = true;
  const cur = nunaTrako();
  if ( cur < 0 ) return;
  tempo.textContent = `${alHe(alSek(progresoEl.valueAsNumber))} / ${alHe(KANTOJ[cur].data.dur)} ហេ`;
});

progresoEl.addEventListener("change", () => {
  trenas = false;
  const cur = nunaTrako();
  if ( cur < 0 ) return;
  ensureAudio();
  salti(alSek(progresoEl.valueAsNumber));
});

// ⟪ ការធ្វើបច្ចុប្បន្នភាព 📃 ⟫

function ĝisdatigi(): void {
  const cur = nunaTrako();
  const ludas = cxuLudas();
  const aktivaj = new Set(nunajInstrumentoj());
  baskuliBut.textContent = ludas ? "⏸" : "▶";
  butonoj.forEach(( b, i ) => b.setAttribute("aria-pressed", String( i === cur && ludas )));
  for ( const { i, but } of sonButonoj ) {
    const on = aktivaj.has(i);
    but.classList.toggle("aktiva", on);
    but.setAttribute("aria-pressed", String(on));
  }
  if ( cur >= 0 ) {
    const k = KANTOJ[cur];
    const elapsed = progreso();
    nunaTitolo.textContent = `${k.no} · ${nomoDeTrako(cur)}`;
    if ( cur !== lastInstrTrako ) {
      instrSpanoj = k.instrs.map(i => {
        const s = document.createElement("span");
        s.textContent = i;
        s.dataset.instrumento = i;
        return { i, el: s };
      });
      const frag = document.createDocumentFragment();
      instrSpanoj.forEach(( s, idx ) => {
        if ( idx ) frag.append(document.createTextNode(" · "));
        frag.append(s.el);
      });
      nunaInstrs.replaceChildren(frag);
      lastInstrTrako = cur;
    }
    for ( const { i, el } of instrSpanoj ) el.classList.toggle("instrAktiva", aktivaj.has(i));
    const dauxro = Math.max(0o1, Math.round(k.data.dur / HE));
    progresoEl.max = String(dauxro);
    if ( !trenas ) {
      progresoEl.value = String(Math.min(dauxro, Math.round(elapsed / HE)));
      tempo.textContent = `${alHe(elapsed)} / ${alHe(k.data.dur)} ហេ`;
    }
    const sc = k.data.secs.find(s => elapsed >= s.a && elapsed < s.b);
    sekcio.textContent = sc ? sc.n : "";
  } else {
    nunaTitolo.textContent = "—";
    if ( lastInstrTrako !== -0o1 ) {
      instrSpanoj = [];
      nunaInstrs.replaceChildren();
      lastInstrTrako = -0o1;
    }
    if ( !trenas ) {
      progresoEl.value = "0";
      tempo.textContent = `${alHe(0)} / ${alHe(0)} ហេ`;
    }
    sekcio.textContent = "";
  }
  requestAnimationFrame(ĝisdatigi);
}
requestAnimationFrame(ĝisdatigi);