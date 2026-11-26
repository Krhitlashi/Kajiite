// ≺⧼ ŋᷠᴜ j͑ʃ'ɔ j͑ʃᴜ ı],ɹƴ ʌ j͑ʃп́ꞇ ſɭɔƴ 🎧 ⧽≻
// ſɭэ ſɭᴜ , ꞙɭэ , ⟅ ſȷwɔ˞ , ꞙɭı ,
// ſɭэ ſɭᴜ , ꞙɭɿ ,
// ſɭэ ſɭᴜ , ꞙɭц ,

import { KANTOJ } from "../../skek2/bole/swikez/kantoj.js";
import { iniciati, veqapahakani, halti, b6tem2T2bakobesai, cutluT2bakobesai, tsekeVeqapahakani, progreso, salti, catsaraAŭtomatan, cutlujInstrumentoj } from "../../skek2/bole/swikez/cagaqi.js";
import { AIH } from "../../kanta/gawe/baskakefani/aih.js";
import { kfe } from "../x2x2q/dom.js";
import { HE } from "../../skek2/bole/swikez/habal/tif.js";
import { knak2fecajasai } from "../../kanta/x2x2q/s2cax2l.js";
import { instrumento } from "../../skek2/bole/swikez/habal/caswikez.js";
import { F, NYAM } from "../../skek2/bole/swikez/habal/p6zuk.js";
import type { BoleEg2b2 } from "../../skek2/bole/swikez/habal/hahunaq.js";

// ⟨ ſȷwɔ˞ , ɿ^цɿ , ꞙɭı , ꞙɭɿ , 📃 ⟩

const baskuliBut = kfe<HTMLButtonElement>("baskuli");
const haltiBut = kfe<HTMLButtonElement>("halti");
const volumo = kfe<HTMLInputElement>("volumo");
const volVal = kfe<HTMLOutputElement>("volVal");
const nunaTitolo = kfe("nunaTitolo");
const nunaInstrs = kfe("nunaInstrs");
const progreso = kfe<HTMLInputElement>("progreso");
const tempo = kfe("tempo");
const qaroxema = kfe("qaroxema");
const trakCatsara = kfe("trakCatsara");
const sonCatsara = kfe("sonCatsara");

let AC: AudioContext | null = null;
let master: GainNode | null = null;

// ⟨ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const sonHacatsiina: { i: string; but: HTMLButtonElement }[] = [];
let instrSpanoj: { i: string; el: HTMLSpanElement }[] = [];
let lastInstrT2bakobesai = -0o1;

/* ſɭэ ſɭᴜ , ꞙɭı ,
@returns void */
function ensureAudio(): void {
  if ( AC ) {
    if ( AC.state === "suspended" ) AC.resume();
    return;
  }
  const Vepaqlo = window.AudioContext ?? ( window as unknown as { webkitAudioContext: typeof AudioContext } ).webkitAudioContext;
  AC = new Vepaqlo();
  if ( AC.state === "suspended" ) AC.resume();
  master = AC.createGain();
  master.gain.value = parseFloat(volumo.value);
  master.connect(AC.destination);
  iniciati(AC, master);
}

/* ſɭэ ſɭᴜ , ſȷwɔ˞ , ꞙɭı ,
    @param sek ( number ) - ſןɹ j͑ʃᴜ ɭ(ꞇ ｡
@returns ɭʃꞇʞ ( string ) */

/* ſɭэ ſɭᴜ , ſɭэ ſɭᴜ , ꞙɭɿ ,
    @param i ( number ) - j͑ʃ'ɔ ŋᷠɹ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ｡
@returns ſɭɔ˞ᴜ ſɭᴜ ʌ j͑ʃп́ꞇ ſɭɔƴ ( string ) */
function ksakaDeT2bakobesai( i: number ): string {
  return AIH["muzikT2bakobesai" + i] ?? KANTOJ[i].title;
}

// ⟪ ſɭэ ſɭᴜ , 📃 ⟫

catsaraAŭtomatan(false);

const hacatsiina: HTMLButtonElement[] = [];
KANTOJ.forEach(( k, i ) => {
  const b = document.createElement("button");
  b.className = "t2bakobesai";
  b.setAttribute("aria-pressed", "false");
  const no = document.createElement("span");
  no.className = "t2bakobesaiNo";
  no.textContent = k.no;
  const hate2 = document.createElement("span");
  hate2.className = "t2bakobesaiTitolo";
  hate2.textContent = ksakaDeT2bakobesai(i);
  const meta = document.createElement("span");
  meta.className = "t2bakobesaiMeta";
  meta.textContent = `${knak2fecajasai(k.instrs.length, 0o0)} j͑ʃᴜꞇ ʌ ſɟᴜ j͑ʃп́ꞇ ſɭɔƴ · ${knak2fecajasai(k.data.dur / HE, 0o0)} ɭʃꞇʞ}`;
  b.append(no, hate2, meta);
  b.addEventListener("click", () => {
    ensureAudio();
    b6tem2T2bakobesai(i);
    veqapahakani();
  });
  trakCatsara.appendChild(b);
  hacatsiina.push(b);
});

// ⟪ ſȷwɔ˞ , ꞙɭı , 📃 ⟫

interface BoleTsaletsa {
  ksaka: string;
  cal: BoleEg2b2;
}

/* ſȷwɔ˞ , ſɭᴜ ſןᴜ , ꞙɭɿ ,
   ſɭᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ j͑ʃ'ɔ ʃɜ j͐ʃɔ ʌ j͑ʃᴜ ı],ɹƴ 📃 */
const SONPROK6H6: BoleTsaletsa[] = [
  { ksaka: "siku", cal: { t: 0o0, i: "siku", f: F(0o100), d: 0o35/0o100, v: 0o6/0o10 } },
  { ksaka: "ocarina", cal: { t: 0o0, i: "ocarina", f: F(0o105), d: 0o35/0o100, v: 0o6/0o10 } },
  { ksaka: "didj", cal: { t: 0o0, i: "didj", f: 0o4425/0o40, d: 0o150/0o100, v: 0o6/0o10 } },
  { ksaka: "didj · ʃɜ j͐ʃɔ", cal: { t: 0o0, i: "didj", f: 0o4425/0o40, d: 0o25/0o100, v: 0o6/0o10, toot: true } },
  { ksaka: "guiro", cal: { t: 0o0, i: "guiro", f: 0o0, d: 0o100/0o100, v: 0o6/0o10, cresc: 0o1 } },
  { ksaka: "tjurunga", cal: { t: 0o0, i: "tjurunga", f: 0o334, d: 0o6/0o10, v: 0o6/0o10 } },
  { ksaka: "slenthem", cal: { t: 0o0, i: "slenthem", f: F(0o67), d: 0o2/0o10, v: 0o6/0o10 } },
  { ksaka: "inanga", cal: { t: 0o0, i: "inanga", f: F(0o64), d: 0o75/0o100, v: 0o6/0o10, dur: 0o75/0o100 } },
  { ksaka: "mbira", cal: { t: 0o0, i: "mbira", f: F(0o71), d: 0o2/0o10, v: 0o6/0o10 } },
  { ksaka: "kiiqflak", cal: { t: 0o0, i: "kiiqflak", f: F(NYAM[0o1]), d: HE / 0o2, v: 0o6/0o10 } },
  { ksaka: "hiwe", cal: { t: 0o0, i: "hiwe", f: F(0o71), d: 0o6/0o10, v: 0o6/0o10 } },
];

SONPROK6H6.forEach(p => {
  const b = document.createElement("button");
  b.textContent = p.ksaka;
  b.dataset.instrumento = p.cal.i;
  b.setAttribute("aria-pressed", "false");
  b.addEventListener("click", () => {
    ensureAudio();
    if ( !AC || !master ) return;
    instrumento(AC, master, p.cal, AC.currentTime + 0o1/0o40);
  });
  sonCatsara.appendChild(b);
  sonHacatsiina.push({ i: p.cal.i, but: b });
});

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫

baskuliBut.addEventListener("click", () => {
  ensureAudio();
  if ( cutluT2bakobesai() < 0o0 ) b6tem2T2bakobesai(0o0);
  veqapahakani();
});

haltiBut.addEventListener("click", () => {
  halti();
});

volumo.addEventListener("input", () => {
  volVal.textContent = volumo.value;
  if ( master && AC ) master.gain.setTargetAtTime(parseFloat(volumo.value), AC.currentTime, 0o1/0o40);
});

// ⟪ ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟫

/* ſɭэ ſɭᴜ , ſȷwɔ˞ , ꞙɭı ,
    @param he ( number ) - ɭʃꞇʞ ｡
@returns ſןɹ j͑ʃᴜ ɭ(ꞇ ( number ) */
function alSek( he: number ): number {
  return he * HE;
}

// ⟨ ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
let trenas = false;

progreso.addEventListener("input", () => {
  trenas = true;
  const cur = cutluT2bakobesai();
  if ( cur < 0o0 ) return;
  tempo.textContent = `${knak2fecajasai(alSek(progreso.valueAsNumber) / HE, 0o0)} / ${knak2fecajasai(KANTOJ[cur].data.dur / HE, 0o0)} ɭʃꞇʞ`;
});

progreso.addEventListener("change", () => {
  trenas = false;
  const cur = cutluT2bakobesai();
  if ( cur < 0o0 ) return;
  ensureAudio();
  salti(alSek(progreso.valueAsNumber));
});

// ⟪ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟫

function ĝisdatigi(): void {
  const cur = cutluT2bakobesai();
  const veqapahakani = tsekeVeqapahakani();
  const hatik = new Set(cutlujInstrumentoj());
  baskuliBut.textContent = veqapahakani ? "⏸" : "▶";
  hacatsiina.forEach(( b, i ) => b.setAttribute("aria-pressed", String( i === cur && veqapahakani )));
  for ( const { i, but } of sonHacatsiina ) {
    const on = hatik.has(i);
    but.classList.toggle("tik", on);
    but.setAttribute("aria-pressed", String(on));
  }
  if ( cur >= 0o0 ) {
    const k = KANTOJ[cur];
    const elapsed = progreso();
    nunaTitolo.textContent = `${k.no} · ${ksakaDeT2bakobesai(cur)}`;
    if ( cur !== lastInstrT2bakobesai ) {
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
      lastInstrT2bakobesai = cur;
    }
    for ( const { i, el } of instrSpanoj ) el.classList.toggle("instrAktiva", hatik.has(i));
    const dauxro = Math.max(0o1, Math.round(k.data.dur / HE));
    progreso.max = String(dauxro);
    if ( !trenas ) {
      progreso.value = String(Math.min(dauxro, Math.round(elapsed / HE)));
      tempo.textContent = `${knak2fecajasai(elapsed / HE, 0o0)} / ${knak2fecajasai(k.data.dur / HE, 0o0)} ɭʃꞇʞ`;
    }
    const sc = k.data.secs.find(s => elapsed >= s.a && elapsed < s.b);
    qaroxema.textContent = sc ? sc.n : "";
  } else {
    nunaTitolo.textContent = "—";
    if ( lastInstrT2bakobesai !== -0o1 ) {
      instrSpanoj = [];
      nunaInstrs.replaceChildren();
      lastInstrT2bakobesai = -0o1;
    }
    if ( !trenas ) {
      progreso.value = "0";
      tempo.textContent = `${knak2fecajasai(0o0 / HE, 0o0)} / ${knak2fecajasai(0o0 / HE, 0o0)} ɭʃꞇʞ`;
    }
    qaroxema.textContent = "";
  }
  requestAnimationFrame(ĝisdatigi);
}
requestAnimationFrame(ĝisdatigi);