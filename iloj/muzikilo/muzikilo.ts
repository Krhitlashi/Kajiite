// ≺⧼ ឧបករណ៍ចាក់ចម្រៀង 🎧 ⧽≻
// ឧបករណ៍នេះចាក់វិលទាំង 0o7 តាមម៉ាស៊ីនលេងតន្ត្រីពិតរបស់ហ្គេម។
// វាបង្កើត AudioContext ដោយខ្លួនឯងនៅពេលអន្តរកម្មដំបូង ហើយបិទការបន្ត
// ស្វ័យប្រវត្តិ ដូច្នេះបទនីមួយៗឈប់ពេលចប់ មិនលោតទៅបទផ្សេងទេ។

import { KANTOJ } from "../../eskekoj/sonoj/muziko/kantoj.js";
import { iniciati, ludi, halti, sxargiTrako, nunaTrako, cxuLudas, progreso, salti, agordiAŭtomatan } from "../../eskekoj/sonoj/muziko/ludilo.js";
import { AIH } from "../../kantaoj/lingvo/tradukoj/aih.js";
import { elemento } from "../komunajxoj/dom.js";

// ⟨ ហេ ៖ 2^32 ជុំវិញសេស្យូម ១៣៣ គិតជាវិនាទី 📃 ⟩
const HE = 0o40000000000 / 9192631770;

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

let AC: AudioContext | null = null;
let master: GainNode | null = null;

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
  return AIH["trako" + i] ?? KANTOJ[i].title;
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
  baskuliBut.textContent = ludas ? "⏸" : "▶";
  butonoj.forEach(( b, i ) => b.setAttribute("aria-pressed", String( i === cur && ludas )));
  if ( cur >= 0 ) {
    const k = KANTOJ[cur];
    const elapsed = progreso();
    nunaTitolo.textContent = `${k.no} · ${nomoDeTrako(cur)}`;
    nunaInstrs.textContent = k.instrs.join(" · ");
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
    nunaInstrs.textContent = "";
    if ( !trenas ) {
      progresoEl.value = "0";
      tempo.textContent = `${alHe(0)} / ${alHe(0)} ហេ`;
    }
    sekcio.textContent = "";
  }
  requestAnimationFrame(ĝisdatigi);
}
requestAnimationFrame(ĝisdatigi);