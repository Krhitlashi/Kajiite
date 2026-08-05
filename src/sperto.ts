// Aranis — immersive city experience (orchestrator)
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { kreiKanoton, animaciiKanoton, gxisdatigiKanotanFizikon, Kanoto } from "../assets/medio/transporto.js";
import { VESTOJ, kreiVestanAntauxrigardon } from "../assets/vestaro/vestoj.js";
import { animaciiFlammojn } from "../assets/konstruajxoj/hxeuxfa-lampo.js";
import { gxisdatigiAkvon, cxuEnAkvo } from "../assets/medio/akvo.js";
import { gxisdatigiBestojn, gxisdatigiPetrelojn } from "../assets/shalaj-specioj/bestoj.js";
import { gxisdatigiNpc } from "../assets/shalaj-specioj/homoj.js";

import { eniriInternon, eliriInternon as eliriElInterno, gxisdatigiInternon, heliksaAltecxo } from "../assets/konstruajxoj/internoj.js";
import { animaciiKrasesxagxon } from "../assets/konstruajxoj/krasesxagxa-kosmosxipo.js";
import { TIPARO, KonstruSpec } from "../assets/konstruajxoj/satalaj-konstruajxoj.js";
import { MangxajxItemo, FOKS, TLAS } from "../assets/mebloj/mangxajxoj.js";
import { riveroZ, alteco, RIVERA_DUONLARĜO, LAGO_X, lagoZ, lagoNivelo, lagoRadio, cxuEnLago, akvaNivelo, riveraAkvaNivelo,
  riveroNordOrientaX, riveraNordOrientaNivelo, RIVERA_NORDORIENTA_DUONLARĜO, cxuEnNordorientaRivero } from "./tereno.js";
import { kreiScenon, ScenaSistemo } from "./scena.js";
import type { UrbaSistemo } from "./urbo.js";
import { konstruiUrbon } from "./urbo.js";
import { traduki, cxuAih } from "./tradukoj.js";
import { sxaltiAŭdion, cxuAŭdio, sxaltiBruon, cxuBruo, sfx, rumble, autoKomenci, registriPostAŭdio } from "../assets/sonoj/sonoro.js";
import { ludi, sxargiTrako, nunaTrako, cxuLudas } from "../assets/sonoj/muziko/ludilo.js";

// ⟪ DOM-elementoj 📃 ⟫
const kanvaso = document.getElementById("sceno") as HTMLCanvasElement;
const kartoElemento = document.getElementById("karto")!;
const kartoNomo = document.getElementById("kartoNomo")!;
const kartoChip = document.getElementById("kartoChip")!;
const kartoStatistikoj = document.getElementById("kartoStatistikoj")!;
const kartoFlavor = document.getElementById("kartoFlavor")!;
const kartoEniri = document.getElementById("kartoEniri")!;
const promptoElemento = document.getElementById("prompto")!;
const supermeta = document.getElementById("supermeta")!;
const vestaVico = document.getElementById("vestaVico")!;
const sxargxaElemento = document.getElementById("sxargxo")!;
const stangoPlenigo = document.getElementById("stangoPlenigo")!;
const sxargxaTitolo = document.getElementById("sxargxaTitolo")!;
const nadlo = document.getElementById("nadlo")!;
const kompaso = document.getElementById("kompaso")!;
const miniKanvaso = document.getElementById("minimapaKanvaso") as HTMLCanvasElement;
const vinjeto = document.getElementById("vinjeto")!;
const retikulo = document.getElementById("retikulo")!;
const balailo = document.getElementById("balailo")!;
const svingo = document.getElementById("svingo")!;
const fxVarma = document.getElementById("fxVarma")!;
const fxMenta = document.getElementById("fxMenta")!;
const tosto = document.getElementById("tosto")!;

// ⟪ Poŝtelefonaj elementoj 📃 ⟫
const navPopUp = document.getElementById("navPopUp")!;
const navButono = document.getElementById("navButono")!;
const butSonoro = document.getElementById("butSonoro")!;
const butRezimo = document.getElementById("butRezimo")!;
const butBruo = document.getElementById("butBruo")!;
const mobJoystickZono = document.getElementById("mobJoystickZono")!;
const mobJoystickBazo = document.getElementById("mobJoystickBazo")!;
const mobJoystickTenilo = document.getElementById("mobJoystickTenilo")!;
const mobButInterakti = document.getElementById("mobButInterakti")!;
const mobButSalti = document.getElementById("mobButSalti")!;

// ⟪ Informo-panelaj elementoj 📃 ⟫
const informButono = document.getElementById("informButono")!;
const informo = document.getElementById("informo")!;
const konstruaListo = document.getElementById("konstruaListo")!;
const mangxaListo = document.getElementById("mangxaListo")!;
const speciaListo = document.getElementById("speciaListo")!;

// ⟪ Stirstanga stato 📃 ⟫
let joystickAktiva = false;
let joystickID = -1;
const JOYSTICK_R = 0o50;

// ⟪ Sonora stato 📃 ⟫
let pauxzaPaŝo = 0; // step sound cooldown counter

// ⟪ Krei scenon kaj urbon 📃 ⟫
const scena: ScenaSistemo = kreiScenon(kanvaso, sxargxaElemento);
const { bildilo, fotilo, sceno, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, aplikiRezimon } = scena;

const urbo: UrbaSistemo = await konstruiUrbon(sceno, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, (p) => {
  stangoPlenigo.style.blockSize = `${Math.round(p * 100)}%`;
  const novaTitolo = p > 0o33/0o40 ? traduki("sxargxaNebulo") : p > 0o23/0o40 ? traduki("sxargxaTraboj") : p > 0o23/0o100 ? traduki("sxargxaSatalo") : null;
  if (novaTitolo !== null && sxargxaTitolo.textContent !== novaTitolo) {
    sxargxaTitolo.textContent = novaTitolo;
    if (cxuAih() && typeof vacepu === "function") vacepu("aih");
  }
});
const {
  konstruSpecoj, kolizioj, dokoKolizioj, selektajxoj,
  riverData, riveroNordOrienta, lago, bestoj, petreloj, lampSistemo, nebuloj, kanuoj, npcoj, internaSistemo, xipo,
} = urbo;

// ⟪ Orbit-regiloj 📃 ⟫
const regiloj = new OrbitControls(fotilo, bildilo.domElement);
regiloj.target.set(0, 2, 0);
regiloj.enableDamping = true;
regiloj.dampingFactor = 0o5/0o100;
regiloj.maxPolarAngle = Math.PI * 0o37/0o100;
regiloj.minDistance = 0o10;
regiloj.maxDistance = 0o334;
regiloj.update();

// ⟪ Stato 📃 ⟫
let rezimo: "orbit" | "walk" | "interior" = "orbit";
let antauxaRezimo: "orbit" | "walk" | null = null;
let surKanoto: Kanoto | null = null;
let elektitaSpec: KonstruSpec | null = null;
let plejProksimaPordo: KonstruSpec | null = null;
// Angulo de la pordo tra kiu la ludanto eniros ( la centra sanktejo havas 4 ).
let aktivaPordaAngulo = 0;
let plejProksimaManĝaĵo: MangxajxItemo | null = null;
// Kontinua vindo de la helika ŝtuparo (nulo = ne sur la spiralo).
let sxtupaTurno: number | null = null;
// Antauxa frac-valoro de la spiralo ( 0..1 ) — por mezuri la SIGNAN angulan
// delton trans la 2π-rivolon ( la frac salto 1→0 ne farigxu turno-salto ).
let antauxaHeliksaFrac = 0;
let direkto = 0, klinigxo = -0o1/0o20;
const ludantaPozicio = new THREE.Vector3(0, 0o5/0o40, 0o44);
let rapidoY = 0, estasSurTERENO = false;
const klavoj: Record<string, boolean> = {};
let mobSprinto = false;
let oscilo = 0;
// ĉu la ludanto naĝis en la antaŭa kadro — por la plaŭda sono ĉe eniro en la akvon
let estisNaĝanta = false;
// Ĉu la poŝtelefona saltbutono estas tenata — tenante ĝin ( aŭ Spacon ) la
// naĝanto supreniras al la surfaco tiel longe kiel ĝi estas premita;
// depremite la korpo remergiĝas al la kutima mergo.
let mobSaltiTenata = false;
let tostaTempilo: ReturnType<typeof setTimeout> | null = null;

// ⟪ Dinamika rezolucio 📃 ⟫ — sub ŝarĝo la bildiga skalo malkreskas paŝe ( ĝis
// 60% de la baza pixelRatio ) kaj revenas kiam la kadroj denove estas rapidaj.
let dinamikaSkalo = 1;
let malrapidajKadroj = 0, rapidajKadroj = 0;


// ⟪ Navigada pop-up 📃 ⟫
// La butono mem estas la fermilo. 二 fermita · 川 malfermita ( kaj la glifo sekvas la staton ).
function gxisdatigiNavButonon() {
  navButono.textContent = navPopUp.classList.contains("montri") ? "川" : "二";
  navButono.setAttribute("aria-pressed", String(navPopUp.classList.contains("montri")));
}
function sxaltiNaviganPopUp() {
  navPopUp.classList.toggle("montri");
  gxisdatigiNavButonon();
}
function fermiNaviganPopUp() {
  navPopUp.classList.remove("montri");
  gxisdatigiNavButonon();
}
navButono.addEventListener("click", sxaltiNaviganPopUp);
navPopUp.addEventListener("click", (e) => {
  if (e.target === navPopUp) fermiNaviganPopUp();
});

// ⟪ Informo-panelo ( konstruaĵoj · manĝaĵoj · specioj ) 📃 ⟫
// La butono (书) malfermas panelon kun tri langetoj. Alklaki konstruaĵon
// enfokusigas ĝin en orbito kaj montras la konatan karton; manĝaĵoj kaj
// specioj montras sian informon en la sama karto ( sen la Eniri-butono ).
function gxisdatigiInformButonon() {
  informButono.setAttribute("aria-pressed", String(informo.classList.contains("montri")));
}
function sxaltiInformon() {
  informo.classList.toggle("montri");
  gxisdatigiInformButonon();
  if (informo.classList.contains("montri")) {
    gxisdatigiInformanAltecon();
    plenigiInformon();
  }
}
function fermiInformon() {
  informo.classList.remove("montri");
  gxisdatigiInformButonon();
}
informButono.addEventListener("click", sxaltiInformon);
informo.addEventListener("click", (e) => {
  if (e.target === informo) fermiInformon();
});

// ⟪ Poŝtelefona panelo. La alto sekvu la VIDEBlan vidon 📃 ⟫
// Sur reala poŝtelefono la fiksita #informo estas mezurata kontraŭ la GRANDA
// vido ( la komenca enhava bloko, kiu supozas la kaŝitan retumilan strion ),
// do la panelo etendiĝas sub la videbla rando — superflua rulumo kaj enhavo
// ne kongrua al la ekrano. La VisualViewport-a alto sekvas la striojn rekte
// ( neniu vh/vw bezonas ), do ni agordas la alton en px per ĉi tiu mezurado.
let informaAlteco = "";
function gxisdatigiInformanAltecon(): void {
  const vido = (window.visualViewport ? window.visualViewport.height : window.innerHeight) || window.innerHeight;
  const stiloj = getComputedStyle(document.documentElement);
  const sat = parseFloat(stiloj.getPropertyValue("--sat")) || 0;
  const sab = parseFloat(stiloj.getPropertyValue("--sab")) || 0;
  // La samaj deirpunktoj kiel la CSS-insetoj. 0o110px supere ( la informa strio ), 0o20px sube.
  const nova = `${Math.max(0, vido - 0o110 - sat - 0o20 - sab)}px`;
  if (nova !== informaAlteco) {
    informaAlteco = nova;
    informo.style.blockSize = nova;
  }
}
window.addEventListener("resize", gxisdatigiInformanAltecon);
window.addEventListener("orientationchange", gxisdatigiInformanAltecon);
window.visualViewport?.addEventListener("resize", gxisdatigiInformanAltecon);
window.visualViewport?.addEventListener("scroll", gxisdatigiInformanAltecon);
gxisdatigiInformanAltecon();

function sxaltiInformanTabon(tabo: string) {
  document.querySelectorAll("#informTaboj button").forEach(b => {
    b.setAttribute("aria-pressed", String((b as HTMLElement).dataset.tabo === tabo));
  });
  document.querySelectorAll("#informo .informSekcio").forEach(s => {
    const sekcio = s as HTMLElement;
    sekcio.style.display = sekcio.dataset.sekcio === tabo ? "" : "none";
  });
}
document.querySelectorAll("#informTaboj button").forEach(b => {
  const tabo = (b as HTMLElement).dataset.tabo || "konstruajxoj";
  b.addEventListener("click", () => sxaltiInformanTabon(tabo));
});
// Marku la komencan langeton kiel aktiva ( la unua sekcio estas videbla defaŭlte ).
sxaltiInformanTabon("konstruajxoj");
// Kiam la lingvo ŝanĝiĝas dum la panelo estas malfermita, replenu la listojn
// ( sama ŝablono kiel la rezima butono ).
window.addEventListener("lingvosxangxo", () => {
  if (informo.classList.contains("montri")) plenigiInformon();
});

function plenigiKonstruaListon() {
  konstruaListo.innerHTML = "";
  for (const spec of konstruSpecoj) {
    const bt = TIPARO[spec.type] || TIPARO.domo;
    const card = document.createElement("ciihii");
    card.className = "vestaKardo aih";
    const tipo = document.createElement("span");
    tipo.className = "peco";
    tipo.style.background = bt.chip;
    tipo.textContent = traduki(bt.labelKey);
    const nomo = document.createElement("p");
    nomo.className = "vn";
    nomo.textContent = traduki(spec.name);
    card.append(tipo, nomo);
    card.addEventListener("click", () => enfokusigiKonstruajxon(spec, bt));
    konstruaListo.appendChild(card);
  }
}

function plenigiMangxaListon() {
  mangxaListo.innerHTML = "";
  for (const f of [...FOKS, ...TLAS]) {
    const nomKlavo = "manĝ" + f.key.charAt(0).toUpperCase() + f.key.slice(1);
    const card = document.createElement("ciihii");
    card.className = "vestaKardo aih";
    const nomo = document.createElement("p");
    nomo.className = "vn";
    nomo.textContent = traduki(nomKlavo);
    const gusto = document.createElement("p");
    gusto.className = "gusto";
    gusto.textContent = traduki(nomKlavo + "Flavor");
    card.append(nomo, gusto);
    card.addEventListener("click", () => montriManĝanKarton(nomKlavo));
    mangxaListo.appendChild(card);
  }
}

// Speciaj datumoj — la bestoj kaj plantoj de la valo ( ne plu vestoj ).
//     key       - traduka klavo por la nomo.
//     flavorKey - traduka klavo por la gusto.
//     grupo     - "besto" aŭ "planto" ( la ĉipo-etikedo ).
//     col       - koloro de la ĉipo ( la sama kiel la 3D-specio ).
interface SpeciaDatumo {
  key: string;
  flavorKey: string;
  grupo: "besto" | "planto";
  col: string;
}
const SPECIOJ: SpeciaDatumo[] = [
  // Bestoj de la rivero kaj lago kaj de la ĉielo ( ĉiuj el bestoj.ts )
  { key: "specBeroe", flavorKey: "flvSpecBeroe", grupo: "besto", col: "#e8d8e080" },
  { key: "specMnemiopsis", flavorKey: "flvSpecMnemiopsis", grupo: "besto", col: "#d8e8f080" },
  { key: "specPleŭrobrakia", flavorKey: "flvSpecPleŭrobrakia", grupo: "besto", col: "#d8f0e880" },
  { key: "specGlacifiso", flavorKey: "flvSpecGlacifiso", grupo: "besto", col: "#d0e8e880" },
  { key: "specMarlaraksxo", flavorKey: "flvSpecMarlaraksxo", grupo: "besto", col: "#c8b09080" },
  { key: "specNeĝopetrelo", flavorKey: "flvSpecNeĝopetrelo", grupo: "besto", col: "#f0f4f680" },
  // Plantoj de la betularo ( el vegetajxo.ts )
  { key: "specBetulo", flavorKey: "flvSpecBetulo", grupo: "planto", col: "#a0b88880" },
  { key: "specLariko", flavorKey: "flvSpecLariko", grupo: "planto", col: "#c8b85880" },
  { key: "specHxsxaksxlefo", flavorKey: "flvSpecHxsxaksxlefo", grupo: "planto", col: "#a868c880" },
  { key: "specFiliko", flavorKey: "flvSpecFiliko", grupo: "planto", col: "#78a86880" },
  { key: "specPurpuraFiliko", flavorKey: "flvSpecPurpuraFiliko", grupo: "planto", col: "#9858b880" },
  { key: "specLikeno", flavorKey: "flvSpecLikeno", grupo: "planto", col: "#b8b08880" },
  { key: "specHerbo", flavorKey: "flvSpecHerbo", grupo: "planto", col: "#88a85880" },
  { key: "specMusko", flavorKey: "flvSpecMusko", grupo: "planto", col: "#68884880" },
  { key: "specCetkuo", flavorKey: "flvSpecCetkuo", grupo: "planto", col: "#78986880" },
  { key: "specCakeo", flavorKey: "flvSpecCakeo", grupo: "planto", col: "#68885880" },
];

function plenigiSpeciaListon() {
  speciaListo.innerHTML = "";
  for (const spec of SPECIOJ) {
    const card = document.createElement("ciihii");
    card.className = "vestaKardo aih";
    const chipo = document.createElement("span");
    chipo.className = "peco";
    chipo.style.background = spec.col;
    chipo.textContent = traduki(spec.grupo === "besto" ? "grupoBesto" : "grupoPlanto");
    const nomo = document.createElement("p");
    nomo.className = "vn";
    nomo.textContent = traduki(spec.key);
    const gusto = document.createElement("p");
    gusto.className = "gusto";
    const flavor = traduki(spec.flavorKey);
    // En aih la speciaj gustoj estas provizore malplenaj — montru malplenan linion.
    gusto.textContent = flavor === spec.flavorKey ? "" : flavor;
    card.append(chipo, nomo, gusto);
    card.addEventListener("click", () => montriSpecianKarton(spec));
    speciaListo.appendChild(card);
  }
}

function plenigiInformon() {
  plenigiKonstruaListon();
  plenigiMangxaListon();
  plenigiSpeciaListon();
  aplikiVacepu();
}

// montriNeEnireblanKarton — Montru informon ( manĝaĵo/specio ) en la sama
// karto kiel konstruaĵoj, sed sen la Eniri-butono.
function montriNeEnireblanKarton(nomo: string, chipo: string, koloro: string, flavorKlavo: string) {
  elektitaSpec = null;
  kartoNomo.textContent = nomo;
  kartoChip.textContent = chipo;
  kartoChip.style.background = koloro;
  kartoStatistikoj.innerHTML = "";
  const flavor = traduki(flavorKlavo);
  // En aih la speciaj gustoj estas provizore malplenaj — montru malplenan linion.
  kartoFlavor.textContent = flavor === flavorKlavo ? "" : flavor;
  kartoEniri.style.display = "none";
  kartoElemento.classList.add("montri");
  aplikiVacepu();
}
function montriManĝanKarton(nomKlavo: string) {
  montriNeEnireblanKarton(traduki(nomKlavo), traduki("tabMangxajxoj"), "#78c8a880", nomKlavo + "Flavor");
}
function montriSpecianKarton(spec: SpeciaDatumo) {
  montriNeEnireblanKarton(
    traduki(spec.key),
    traduki(spec.grupo === "besto" ? "grupoBesto" : "grupoPlanto"),
    spec.col,
    spec.flavorKey
  );
}

// enfokusigiKonstruajxon — Integriĝo kun la ekzistanta orbit-sistemo. Iru al
// orbito, enfokusigu la konstruaĵon kaj montru ĝian karton ( kiel klako en orbito ).
function enfokusigiKonstruajxon(spec: KonstruSpec, bt: { labelKey: string; chip: string; flavorKey: string; wall: number; frame: number }) {
  fermiInformon();
  if (rezimo === "interior") return;
  if (rezimo === "walk") sxaltiRezimon();
  regiloj.enabled = true;
  const h0 = spec.h0 || 0;
  regiloj.target.set(spec.x, h0 + 0o14, spec.z);
  fotilo.position.set(spec.x, h0 + 0o20, spec.z + 0o14);
  regiloj.update();
  montriKarton(spec, bt);
  gxisdatigiRetikulon();
}

// ⟪ Aŭtomata komenco je unua tuŝo/klako 📃 ⟫
function gxisdatigiSonoranButonon(aktiva: boolean) {
  butSonoro.setAttribute("aria-pressed", String(aktiva));
  butSonoro.textContent = aktiva ? "♫" : "♬";
  gxisdatigiTrakoButonojn();
}
registriPostAŭdio(gxisdatigiSonoranButonon);
document.addEventListener("pointerdown", () => autoKomenci(), { once: true });

// ⟪ Tuŝekrano. La kontroloj aperu je tuŝo kaj kaŝiĝu post senaktiveco 📃 ⟫
let tuŝaTempilo = 0;
function montriTuŝajnKontrolojn(): void {
  document.body.classList.add("tuŝa");
  if (tuŝaTempilo) window.clearTimeout(tuŝaTempilo);
  // Post 3 sekundoj sen tuŝo la kontroloj malaperas ( la sekva tuŝo revenigas ilin ).
  tuŝaTempilo = window.setTimeout(() => {
    // Ne kaŝu dum la stirstango estas tenata. Touchend eble ne alvenas sur kaŝita zono.
    if (joystickAktiva) { montriTuŝajnKontrolojn(); return; }
    document.body.classList.remove("tuŝa");
  }, 0o5670);
}
function montriTuŝajnSeTuŝa(e: PointerEvent): void {
  if (e.pointerType === "touch") montriTuŝajnKontrolojn();
}
document.addEventListener("touchstart", montriTuŝajnKontrolojn);
document.addEventListener("touchmove", montriTuŝajnKontrolojn);
document.addEventListener("touchend", montriTuŝajnKontrolojn);
document.addEventListener("pointerdown", montriTuŝajnSeTuŝa);

// ⟪ Sonora butono 📃 ⟫
if (butSonoro) {
  butSonoro.addEventListener("click", () => {
    const aktiva = sxaltiAŭdion();
    gxisdatigiSonoranButonon(aktiva);
    fermiNaviganPopUp();
  });
}

// ⟪ Brua butono ( fona bruo aparta de la muziko ) 📃 ⟫
function gxisdatigiBruanButonon() {
  const aktiva = cxuBruo();
  butBruo.setAttribute("aria-pressed", String(aktiva));
  butBruo.textContent = aktiva ? "≋" : "≈";
}
butBruo.addEventListener("click", () => {
  sxaltiBruon();
  gxisdatigiBruanButonon();
  fermiNaviganPopUp();
});
gxisdatigiBruanButonon();

// ⟪ Traka selektilo 📃 ⟫
function gxisdatigiTrakoButonojn() {
  const nuna = nunaTrako();
  document.querySelectorAll(".trakaBut").forEach(b => {
    const i = parseInt((b as HTMLElement).dataset.trako || "0");
    b.setAttribute("aria-pressed", String(i === nuna && cxuLudas()));
  });
}
document.querySelectorAll(".trakaBut").forEach(b => {
  b.addEventListener("click", () => {
    const i = parseInt((b as HTMLElement).dataset.trako || "0");
    const estisLudanta = cxuLudas();
    sxargiTrako(i);
    // Loading stops the old bus; restart whenever the audio system is enabled.
    if (estisLudanta || cxuAŭdio()) ludi();
    gxisdatigiTrakoButonojn();
  });
});

// ⟪ Krepuska reĝimo 📃 ⟫
let krepuskaValoro = 0;
const butKrepusko = document.getElementById("butKrepusko")!;
const duskRegilo = document.getElementById("duskRegilo") as HTMLInputElement;
butKrepusko.setAttribute("aria-pressed", String(krepuskaValoro > 0o4/0o10));
aplikiRezimon(0);
butKrepusko.addEventListener("click", () => {
  if (krepuskaValoro > 0o4/0o10) {
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

// ⟪ Vacepu. Envolvi la vortojn de la flosantaj kartoj en la aih-a lingvo. ⟫
function aplikiVacepu(): void {
  if (cxuAih() && typeof vacepu === "function") vacepu("aih");
}

// ⟪ Tosta sistemo 📃 ⟫
function montriTost(mesagxo: string, daŭro = 0o4230) {
  if (tostaTempilo) clearTimeout(tostaTempilo);
  tosto.innerHTML = mesagxo;
  // La aih-a noto bezonas la vacepu-vortojn post cxiu gxisdatigo.
  aplikiVacepu();
  tosto.classList.add("montri");
  tostaTempilo = setTimeout(() => tosto.classList.remove("montri"), daŭro);
}

// La prompto sxangxigxas cxiun kadron. Envolvu nur kiam la teksto vere sxangxigxis.
let lastPromptaHTML = "";
function agordiPrompton(html: string): void {
  if (lastPromptaHTML === html) return;
  lastPromptaHTML = html;
  promptoElemento.innerHTML = html;
  aplikiVacepu();
}

// ⟪ Balaila transiro 📃 ⟫
function fariBalailon(callback: () => void, daŭro = 0o1130) {
  balailo.classList.add("montri");
  setTimeout(() => {
    callback();
    setTimeout(() => { balailo.classList.remove("montri"); }, 0o310);
  }, daŭro / 2);
}

// ⟪ Svingo kaj kolor-efikoj 📃 ⟫
function pulsiEfikon() {
  svingo.classList.remove("iru");
  void svingo.offsetWidth;
  svingo.classList.add("iru");
  fxVarma.classList.remove("fxPulso");
  void fxVarma.offsetWidth;
  fxVarma.classList.add("fxPulso");
  setTimeout(() => {
    fxMenta.classList.remove("fxPulso");
    void fxMenta.offsetWidth;
    fxMenta.classList.add("fxPulso");
  }, 0o310);
}

// ⟪ Enigo 📃 ⟫
window.addEventListener("keydown", e => {
  klavoj[e.code] = true;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) e.preventDefault();
  if (e.code === "KeyE" && !e.repeat) proviInterakti();
  if (e.code === "KeyM" && !e.repeat) sxaltiRezimon();
  if (e.code === "Escape") {
    if (informo.classList.contains("montri")) fermiInformon();
    else if (mapoMalfermita) fermiMapon();
    else if (rezimo === "interior") eliriInternon();
  }
  if (e.code === "Space" && rezimo === "walk" && estasSurTERENO && !surKanoto) { rapidoY = 0o74/0o10; estasSurTERENO = false; }
});
window.addEventListener("keyup", e => { klavoj[e.code] = false; });

// Reset key states when the window loses focus so keys don't get stuck "on"
const resetiKlfojn = () => { for (const k in klavoj) klavoj[k] = false; };
window.addEventListener("blur", resetiKlfojn);
window.addEventListener("visibilitychange", () => { if (document.hidden) resetiKlfojn(); });
document.addEventListener("pointerlockchange", () => { if (!document.pointerLockElement) resetiKlfojn(); });

// ⟪ Poŝtelefona stirstango ( virtuala joystick ) 📃 ⟫
function gxisdatigiJoystick(klientoX: number, klientoY: number) {
  const recto = mobJoystickBazo.getBoundingClientRect();
  const cx = recto.left + recto.width / 2;
  const cy = recto.top + recto.height / 2;
  let dx = klientoX - cx;
  let dy = klientoY - cy;
  const dist = Math.hypot(dx, dy);
  if (dist > JOYSTICK_R) { dx = (dx / dist) * JOYSTICK_R; dy = (dy / dist) * JOYSTICK_R; }
  // Move thumb
  mobJoystickTenilo.style.transform = `translate(${dx}px, ${dy}px)`;
  // Map joystick to WASD keys
  const normX = dx / JOYSTICK_R;
  const normY = dy / JOYSTICK_R;
  klavoj.KeyA = normX < -0o2/0o10;
  klavoj.KeyD = normX > 0o2/0o10;
  klavoj.KeyW = normY < -0o2/0o10;
  klavoj.KeyS = normY > 0o2/0o10;
  // Forkuri. Puŝu la tenilon preter 0o3/0o4 de la radio ( la mezo restas normala piedirado ).
  const devio = Math.min(1, dist / JOYSTICK_R);
  mobSprinto = devio > 0o3/0o4;
  mobJoystickBazo.classList.toggle("sprinto", mobSprinto);
}
function resetiJoystick() {
  klavoj.KeyA = false; klavoj.KeyD = false;
  klavoj.KeyW = false; klavoj.KeyS = false;
  mobSprinto = false;
  mobJoystickBazo.classList.remove("sprinto");
  mobJoystickTenilo.style.transform = "translate(0px, 0px)";
  mobJoystickBazo.classList.remove("aktiva");
  mobJoystickTenilo.classList.remove("aktiva");
}

mobJoystickZono.addEventListener("touchstart", (e) => {
  if (joystickAktiva) return;
  // Stirstango funkcias en cxiuj rezimoj (promenado, interno kaj orbirado).
  const tosxo = e.changedTouches[0];
  joystickID = tosxo.identifier;
  joystickAktiva = true;
  mobJoystickBazo.classList.add("aktiva");
  mobJoystickTenilo.classList.add("aktiva");
  gxisdatigiJoystick(tosxo.clientX, tosxo.clientY);
  e.preventDefault();
}, { passive: false });

mobJoystickZono.addEventListener("touchmove", (e) => {
  if (!joystickAktiva) return;
  for (let i = 0; i < e.changedTouches.length; i++) {
    if (e.changedTouches[i].identifier === joystickID) {
      gxisdatigiJoystick(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
      e.preventDefault();
      break;
    }
  }
}, { passive: false });

mobJoystickZono.addEventListener("touchend", (e) => {
  for (let i = 0; i < e.changedTouches.length; i++) {
    if (e.changedTouches[i].identifier === joystickID) {
      joystickAktiva = false;
      joystickID = -1;
      resetiJoystick();
      e.preventDefault();
      break;
    }
  }
}, { passive: false });

mobJoystickZono.addEventListener("touchcancel", (e) => {
  joystickAktiva = false;
  joystickID = -1;
  resetiJoystick();
  e.preventDefault();
}, { passive: false });

// ⟪ Poŝtelefona rigarda kontrolo per tuŝo 📃 ⟫
let tuŝaRigardaID = -1;
let lastTouchX = 0, lastTouchY = 0;

kanvaso.addEventListener("touchstart", (e) => {
  if (rezimo !== "walk" && rezimo !== "interior") return;
  if (tuŝaRigardaID >= 0) return;
  // Don't capture if touch is on joystick or action buttons
  const t = e.changedTouches[0];
  const el = document.elementFromPoint(t.clientX, t.clientY);
  if (el && (el === mobJoystickZono || el === mobJoystickBazo || mobJoystickZono.contains(el) || el.classList.contains("mobBut") || el.closest("#mobButaroj") || el.closest("#kompaso"))) {
    return;
  }
  tuŝaRigardaID = t.identifier;
  lastTouchX = t.clientX;
  lastTouchY = t.clientY;
}, { passive: true });

kanvaso.addEventListener("touchmove", (e) => {
  if (tuŝaRigardaID < 0) return;
  if (rezimo !== "walk" && rezimo !== "interior") return;
  for (let i = 0; i < e.changedTouches.length; i++) {
    const t = e.changedTouches[i];
    if (t.identifier === tuŝaRigardaID) {
      const dx = t.clientX - lastTouchX;
      const dy = t.clientY - lastTouchY;
      direkto -= dx * 0o1/0o400;
      klinigxo -= dy * 0o1/0o400;
      klinigxo = Math.max(-0o135/0o100, Math.min(0o135/0o100, klinigxo));
      lastTouchX = t.clientX;
      lastTouchY = t.clientY;
      e.preventDefault();
      break;
    }
  }
}, { passive: false });

kanvaso.addEventListener("touchend", (e) => {
  for (let i = 0; i < e.changedTouches.length; i++) {
    if (e.changedTouches[i].identifier === tuŝaRigardaID) {
      tuŝaRigardaID = -1;
      break;
    }
  }
}, { passive: true });

kanvaso.addEventListener("touchcancel", () => {
  tuŝaRigardaID = -1;
}, { passive: true });

// ⟪ Poŝtelefonaj agbutonoj 📃 ⟫
// La E-butono aperas nur kiam estas proksima interagebla — same kiel la prompto
// ( #prompto.montri ). Observilo konservas la du en sinsekvo, do cxiu sxangxo de
// la prompta stato ( pordo/kanuo/mangxajxo/eliro ) sxaltas ankaux la butonon.
const gxisdatigiInteragbutonon = () => {
  mobButInterakti.classList.toggle("montri", promptoElemento.classList.contains("montri"));
};
new MutationObserver(gxisdatigiInteragbutonon).observe(promptoElemento, { attributes: true, attributeFilter: ["class"] });
gxisdatigiInteragbutonon();
mobButInterakti.addEventListener("touchstart", (e) => {
  e.preventDefault();
  proviInterakti();
});
mobButSalti.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (rezimo === "walk" && !surKanoto) {
    mobSaltiTenata = true;
    if (estasSurTERENO) { rapidoY = 0o74/0o10; estasSurTERENO = false; }
  }
});
mobButSalti.addEventListener("touchend", () => { mobSaltiTenata = false; });
mobButSalti.addEventListener("touchcancel", () => { mobSaltiTenata = false; });

// ⟪ Retikula kontrolo 📃 ⟫
function gxisdatigiRetikulon() {
  retikulo.classList.toggle("montri", rezimo === "orbit");
}

// ⟪ Konstruajxa karto 📃 ⟫
function montriKarton(spec: KonstruSpec, bt: { labelKey: string; chip: string; flavorKey: string; wall: number; frame: number }) {
  elektitaSpec = spec;
  // Restarigu la Eniri-butonon ( montriNeEnireblanKarton kaŝas ĝin ).
  kartoEniri.style.display = "";
  kartoNomo.textContent = traduki(spec.name);
  const btLabelo = traduki(bt.labelKey);
  kartoChip.textContent = btLabelo;
  kartoChip.style.background = bt.chip;
  kartoStatistikoj.innerHTML = `<b>${traduki("statTieroj")}</b> ${spec.niveloj} · <b>${traduki("statDiamanto")}</b> ${spec.sube ? traduki("statJes") + " (" + spec.sube + ")" : traduki("statNe")}<br><b>${traduki("statTipo")}</b> ${btLabelo} · <b>${traduki("statPozicio")}</b> X${Math.round(spec.x)} Z${Math.round(spec.z)}`;
  kartoFlavor.textContent = traduki(bt.flavorKey);
  kartoElemento.classList.add("montri");
  kartoEniri.onclick = () => eniriKonstruajxon(spec, bt);
  // La nova karto-enhavo bezonas la vacepu-vortojn ( aih ).
  aplikiVacepu();
}
function kasxiKarton() {
  elektitaSpec = null;
  kartoElemento.classList.remove("montri");
}

// ⟪ Klaku por elekti 📃 ⟫
const radioRestilo = new THREE.Raycaster();
kanvaso.addEventListener("click", (e) => {
  if (rezimo !== "orbit") return;
  const muso = new THREE.Vector2((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  radioRestilo.setFromCamera(muso, fotilo);
  const trafoj = radioRestilo.intersectObjects(selektajxoj);
  if (trafoj.length > 0) {
    const data = trafoj[0].object.userData;
    if (data && data.spec) montriKarton(data.spec, data.buildingType);
  } else {
    kasxiKarton();
  }
});

// ⟪ Ekstera sceno dum interno 📃 ⟫ — kaŝu la tutan eksteran mondon ( konstruaĵojn,
// arbaron, terenon, akvon ), sed tenu la ĉielon kaj la lumojn. La internoj havas
// siajn proprajn lumojn, kaj la supra etaĝo estas malferma al la ĉielo.
let kaŝitajEksteraj: { o: THREE.Object3D; antauxa: boolean }[] = [];
function kasxiEksteron(): void {
  if (kaŝitajEksteraj.length > 0) return;
  const tenataj = new Set<THREE.Object3D>([
    scena.cxielo, scena.hemiLumo, scena.suna, scena.suna.target, scena.sunaSprajto,
  ]);
  for (const o of sceno.children) {
    if (tenataj.has(o) || o === internaSistemo.currentGroup) continue;
    // Konservu la antaŭan videblon, por ne revivigi objektojn kaŝitajn de aliaj kaŭzoj.
    kaŝitajEksteraj.push({ o, antauxa: o.visible });
    o.visible = false;
  }
}
function restarigiEksteron(): void {
  for (const { o, antauxa } of kaŝitajEksteraj) o.visible = antauxa;
  kaŝitajEksteraj = [];
}

// ⟪ Interna vido 📃 ⟫
function eniriKonstruajxon(spec: KonstruSpec, bt: { labelKey: string; flavorKey: string }, pordaAngulo = 0) {
  sxtupaTurno = null;
  // Request pointer lock synchronously while user gesture is still active
  if (document.pointerLockElement !== kanvaso) kanvaso.requestPointerLock();
  if (cxuAŭdio()) sfx.door();
  pulsiEfikon();
  montriSargxon(0o400, () => {
    antauxaRezimo = rezimo as "orbit" | "walk";
    try {
      rezimo = "interior";
      elektitaSpec = spec;
      const enirPunkto = eniriInternon(internaSistemo, spec, dioritaMaterialo, andezitaMaterialo, oraMaterialo, eniraMaterialo, sceno, pordaAngulo);
      kasxiEksteron();
      const specX = spec.x, specZ = spec.z;
      // La spacosxipa interno flosas ĉe la sxipo (flugoY) — la enira punkto estas
      // ĉe la supro kie la sxipo vere estas, ne sur la tero.
      const specH0 = spec.flugoY ?? (spec.h0 || 0);
      const rot = spec.rot || 0;
      const cosR = Math.cos(rot), sinR = Math.sin(rot);
      const eX = enirPunkto.x, eZ = enirPunkto.z;
      const wX = specX + cosR * eX - sinR * eZ;
      const wZ = specZ + sinR * eX + cosR * eZ;
      fotilo.position.set(wX, specH0 + enirPunkto.y, wZ);
      fotilo.lookAt(specX, specH0 + 1, specZ);
      direkto = enirPunkto.direkto + rot;
      klinigxo = 0;
      ludantaPozicio.set(wX, specH0 + enirPunkto.y, wZ);
      estasSurTERENO = true;
      rapidoY = 0;
      regiloj.enabled = false;
      // Hide the card but DON'T clear elektitaSpec (needed for interior movement)
      kartoElemento.classList.remove("montri");
      montriTost(traduki("eniri") + " " + traduki(spec.name));
      gxisdatigiRetikulon();
    } catch (eraro) {
      // Se la interno ne konstruigxis ( hazarda retumila/kanvasa eraro ), ne
      // lasu la ludanton duone en la interno. reen al la antaŭa reĝimo kaj
      // forigu eventualan partan internon. La ŝarĝa ekrano malaperas ĉiuokaze
      // ( la finally en montriSargxon ).
      console.error("Eniro en la konstruajxon malsukcesis:", eraro);
      eliriElInterno(internaSistemo, sceno);
      restarigiEksteron();
      rezimo = antauxaRezimo || "orbit";
      antauxaRezimo = null;
      regiloj.enabled = rezimo === "orbit";
      // En orbito la muso estas legata per clientX/Y, ne per movementX/Y — se la
      // montra-seruro restus aktiva, la orbito ne plu respondus al la muso.
      if ( rezimo === "orbit" && document.pointerLockElement === kanvaso ) document.exitPointerLock();
      gxisdatigiRezimanButonon();
      gxisdatigiRetikulon();
    }
  });
}
function eliriInternon() {
  sxtupaTurno = null;
  eliriElInterno(internaSistemo, sceno);
  restarigiEksteron();
  if (cxuAŭdio()) sfx.door();
  pulsiEfikon();
  fariBalailon(() => {
    // Restore previous mode (walk or orbit)
    const estasWalk = antauxaRezimo === "walk";
    rezimo = antauxaRezimo || "orbit";
    antauxaRezimo = null;
    const speco = elektitaSpec;
    if (estasWalk) {
      regiloj.enabled = false;
      if (speco && speco.type === "stacioxipo") {
        // El la sxipo (supre) — surgrundigu apud la kosmoporda stacio.
        const rot = speco.rot || 0;
        const pordX = speco.x + Math.sin(rot) * (speco.d / 2 + 0o14/0o10);
        const pordZ = speco.z + Math.cos(rot) * (speco.d / 2 + 0o14/0o10);
        ludantaPozicio.set(pordX, alteco(pordX, pordZ), pordZ);
        fotilo.position.set(pordX, alteco(pordX, pordZ) + 0o65/0o40, pordZ);
        direkto = rot;
      } else {
        // Set up walking state from current camera position (near building door)
        direkto = fotilo.rotation.y;
        ludantaPozicio.set(fotilo.position.x, alteco(fotilo.position.x, fotilo.position.z), fotilo.position.z);
        fotilo.position.y = ludantaPozicio.y + 0o65/0o40;
      }
      estasSurTERENO = true;
    } else {
      regiloj.enabled = true;
      if (speco) {
        if (speco.type === "stacioxipo") {
          // En orbito. Movu la fotilon malsupren al la stacio ( ne restu ĉe la sxipo ).
          regiloj.target.set(speco.x, (speco.h0 || 0) + 0o14, speco.z);
          fotilo.position.set(speco.x, (speco.h0 || 0) + 0o20, speco.z + 0o14);
        } else {
          regiloj.target.set(speco.x, speco.h0! + 0o14, speco.z);
        }
        regiloj.update();
      }
    }
    gxisdatigiRezimanButonon();
    gxisdatigiRetikulon();
  });
}

// ⟪ Rezima ŝaltilo 📃 ⟫
// Unu butono montras la nunan reĝimon kaj ŝaltas al la alia per klako.
function gxisdatigiRezimanButonon() {
  butRezimo.textContent = traduki(rezimo === "walk" ? "butonoPromeni" : "butonoOrbiti");
  butRezimo.setAttribute("aria-pressed", String(rezimo === "walk"));
  butRezimo.setAttribute("aria-label", traduki(rezimo === "walk" ? "ariaButPromeni" : "ariaButOrbiti"));
  // La nova etikedo ( aih ) bezonas la vacepu-vortojn.
  aplikiVacepu();
}
// Kiam la lingvo ŝanĝiĝas, la dinamika etikedo refreŝiĝu.
window.addEventListener("lingvosxangxo", gxisdatigiRezimanButonon);

function sxaltiRezimon() {
  if (rezimo === "interior") { eliriInternon(); return; }
  if (surKanoto) { surKanoto = null; ludantaPozicio.set(fotilo.position.x, 0o155/0o100, fotilo.position.z); }
  if (cxuAŭdio()) sfx.chime();
  rezimo = rezimo === "orbit" ? "walk" : "orbit";
  gxisdatigiRezimanButonon();
  gxisdatigiRetikulon();
  if (rezimo === "walk") {
    regiloj.enabled = false;
    direkto = Math.atan2(fotilo.position.x - regiloj.target.x, fotilo.position.z - regiloj.target.z);
    ludantaPozicio.set(fotilo.position.x, alteco(fotilo.position.x, fotilo.position.z), fotilo.position.z);
    estasSurTERENO = true;
  } else {
    // Malplenigu la promen-reziman staton por ke E en orbito movu vertikale
    plejProksimaPordo = null;
    promptoElemento.classList.remove("montri");
    regiloj.enabled = true;
    regiloj.target.copy(ludantaPozicio).add(new THREE.Vector3(0, 4, 0));
    fotilo.position.copy(ludantaPozicio).add(new THREE.Vector3(0, 4, 0o14));
  }
}
butRezimo.addEventListener("click", () => {
  sxaltiRezimon();
  // En orbito enfokusigu la elektitan konstruaĵon (kiel antaŭe la ORBITI-butono).
  if (rezimo === "orbit" && elektitaSpec) {
    regiloj.target.set(elektitaSpec.x, elektitaSpec.h0! + 0o14, elektitaSpec.z);
    regiloj.update();
  }
});
gxisdatigiRezimanButonon();

// ⟪ Vestaro 📃 ⟫
document.getElementById("butVesti")!.addEventListener("click", () => {
  vestaVico.innerHTML = "";
  VESTOJ.forEach((o, i) => {
    const card = document.createElement("ciihii");
    card.className = "vestaKardo aih";
    const kanvasa = kreiVestanAntauxrigardon(o);
    card.appendChild(kanvasa);
    const nomo = document.createElement("p");
    nomo.className = "vn"; nomo.textContent = traduki(o.nomo);
    card.appendChild(nomo);
    card.addEventListener("click", () => {
      supermeta.classList.remove("montri");
      montriTost(traduki(o.nomo));
    });
    vestaVico.appendChild(card);
  });
  supermeta.classList.add("montri");
  // La novaj vestaj kartoj bezonas la vacepu-vortojn ( aih ).
  aplikiVacepu();
});
supermeta.addEventListener("click", (e) => {
  if (e.target === supermeta) supermeta.classList.remove("montri");
});
document.getElementById("supermetaFermi")!.addEventListener("click", () => {
  supermeta.classList.remove("montri");
});

// ⟪ Helpo 📃 ⟫
document.getElementById("butHelpi")!.addEventListener("click", () => {
  document.getElementById("supermetaTitolo")!.textContent = traduki("titoloVojoj");
  document.getElementById("supermetaSupra")!.textContent = traduki("subtitoloHelpo");
  vestaVico.innerHTML = `<div class="statistikoj helpa-listo">
    <b>Orbit</b> · ${traduki("regiloOrbito")}<br>
    <b>Walk</b> · ${traduki("regiloPromeno")}<br>
    <b>WASD</b> · ${traduki("regiloMovado")}<br>
    <b>E</b> · ${traduki("regiloEniri")}<br>
    <b>M</b> · ${traduki("regiloMapo")}<br>
    <b>Escape</b> · ${traduki("regiloEliri")}<br>
    <b>Click spires</b> · ${traduki("regiloSpajroj")}<br>
    <b>WARD</b> · ${traduki("regiloVesto")}
  </div>`;
  supermeta.classList.add("montri");
  // La helpa listo bezonas la vacepu-vortojn ( aih ).
  aplikiVacepu();
});

// ⟪ Interagu (E-klavo) 📃 ⟫
function proviInterakti() {
  if (rezimo === "interior") {
    if (plejProksimaManĝaĵo && !plejProksimaManĝaĵo.dead) { konsumi(plejProksimaManĝaĵo); return; }
    eliriInternon(); return;
  }
  if (surKanoto) {
    const exit = eliriKanoton(surKanoto);
    ludantaPozicio.set(exit.x, 0o155/0o100, exit.z);
    surKanoto = null;
    promptoElemento.classList.remove("montri");
    montriTost(traduki("eliri"));
    return;
  }
  // En orbita reximo E movas la fotilon vertikale, do la pordo/kanuo
  // interago validas nur dum promenado (ne kun malnovaj statoj).
  if (plejProksimaPordo && rezimo === "walk") {
    const bt = TIPARO[plejProksimaPordo.type] || TIPARO.domo;
    eniriKonstruajxon(plejProksimaPordo, bt, aktivaPordaAngulo);
    return;
  }
  let plejProksima: Kanoto | null = null;
  let minDistanco = 6;
  for (const c of kanuoj) {
    const d = Math.hypot(c.x - ludantaPozicio.x, c.z - ludantaPozicio.z);
    if (d < minDistanco) { minDistanco = d; plejProksima = c; }
  }
  if (plejProksima) {
    surKanoto = plejProksima;
    plejProksima.vx = plejProksima.vz = 0;
    promptoElemento.classList.remove("montri");
    montriTost(traduki("regiloKanuo"));
    if (cxuAŭdio()) sfx.splash();
  }
}
function eliriKanoton(c: Kanoto): { x: number; z: number } {
  const fortoX = -Math.sin(c.direkto), fortoZ = -Math.cos(c.direkto);
  const bona = (x: number, z: number) => !cxuEnAkvo(x, z, riveroZ, RIVERA_DUONLARĜO) && !cxuEnLago(x, z)
    && !cxuEnNordorientaRivero(x, z) && !enDoko(x, z, 0o3/0o10);
  let exitX = c.x + fortoX * 6, exitZ = c.z + fortoZ * 6;
  if (!bona(exitX, exitZ)) {
    // Serĉu sekan, ne-dokan punkton — ĉe kreskantaj distancoj por eviti la
    // (maloftan) kazon ke ĉiuj proksimaj kandidatoj falas sur dokon.
    const anguloj = [0, Math.PI/4, -Math.PI/4, Math.PI/2, -Math.PI/2, Math.PI*0o3/0o4, -Math.PI*0o3/0o4, Math.PI];
    for ( const radio of [ 6, 11, 16 ] ) {
      let trovita = false;
      for (const a of anguloj) {
        const ax = c.x + Math.sin(c.direkto + a) * radio;
        const az = c.z + Math.cos(c.direkto + a) * radio;
        if (bona(ax, az)) { exitX = ax; exitZ = az; trovita = true; break; }
      }
      if (trovita) break;
    }
  }
  return { x: exitX, z: exitZ };
}

function konsumi(item: MangxajxItemo) {
  if (!item || item.dead) return;
  item.dead = true;
  const f = item.f, isFok = item.key.startsWith("fok"), m = item.mesh;
  const start = performance.now();
  (function ŝrumpi() {
    const t = (performance.now() - start) / 480;
    m.scale.setScalar(Math.max(0o1/0o2000, 1 - t));
    if (t < 1) requestAnimationFrame(ŝrumpi); else m.visible = false;
  })();
  if (isFok) sfx.crunch(); else sfx.sip();
  const foodKey = "manĝ" + f.key.charAt(0).toUpperCase() + f.key.slice(1);
  montriTost("<i>" + traduki(foodKey) + "</i><br>" + traduki(foodKey + "Flavor"));
  const fx = document.getElementById(isFok ? "fxVarma" : "fxMenta")!;
  fx.classList.remove("fxPulso");
  void fx.offsetWidth;
  fx.classList.add("fxPulso");
}

function solviKolizion(x: number, z: number): { x: number; z: number } {
  for (let pass = 0; pass < 3; pass++) {
    let pusxoX = 0, pusxoZ = 0;
    let hit = false;
    for (const c of kolizioj) {
      const difX = x + pusxoX - c.x, difZ = z + pusxoZ - c.z;
      const d = Math.hypot(difX, difZ);
      const min = c.r + 0o4/0o10;
      if ( d < min && d > 0o1/0o20000 ) {
        const pen = min - d;
        pusxoX += (difX / d) * pen;
        pusxoZ += (difZ / d) * pen;
        hit = true;
      }
    }
    x += pusxoX;
    z += pusxoZ;
    if (!hit) break;
  }
  return { x, z };
}

// enDoko — Cxu punkto estas ene de doka platformo (kun randa marĝeno)?
function enDoko(x: number, z: number, marge: number): boolean {
  for (const d of dokoKolizioj) {
    const cosR = Math.cos(d.rot), sinR = Math.sin(d.rot);
    const lx = (x - d.x) * cosR + (z - d.z) * sinR;
    const lz = -(x - d.x) * sinR + (z - d.z) * cosR;
    if (Math.abs(lx) < d.w / 2 + marge && Math.abs(lz) < d.d / 2 + marge) return true;
  }
  return false;
}

// dokaSuproY — Se la punkto staras super doka platformo, redonu la mondan Y de
// la platforma supro; alie -Infinity. La tereno sub la doko deklivas al la
// rivero, do sen ĉi tio la promenanto enfandus en la platformon.
function dokaSuproY(x: number, z: number): number {
  let y = -Infinity;
  for (const d of dokoKolizioj) {
    const cosR = Math.cos(d.rot), sinR = Math.sin(d.rot);
    const lx = (x - d.x) * cosR + (z - d.z) * sinR;
    const lz = -(x - d.x) * sinR + (z - d.z) * cosR;
    if (Math.abs(lx) < d.w / 2 && Math.abs(lz) < d.d / 2) y = Math.max(y, d.y);
  }
  return y;
}

// solviDokanKolizion — Rektangula kolizio kun la dokaj platformoj. Oni rajtas
// stari SUR la doko ( supre ), sed ne eniri sub gxin. Nur punktoj sub la platforma
// supro (d.y) estas elpusxataj. marge = radiuso de la ento (ludanto 0o3/0o10, kanuo 0o5/0o4).
function solviDokanKolizion(x: number, z: number, y: number, marge = 0o3/0o10): { x: number; z: number } {
  let rx = x, rz = z;
  for (let pass = 0; pass < 3; pass++) {
    let puŝoX = 0, puŝoZ = 0;
    let hit = false;
    for (const d of dokoKolizioj) {
      const cosR = Math.cos(d.rot), sinR = Math.sin(d.rot);
      const dx = rx - d.x, dz = rz - d.z;
      const lx = dx * cosR + dz * sinR;
      const lz = -dx * sinR + dz * cosR;
      const hw = d.w / 2 + marge, hd = d.d / 2 + marge;
      if (Math.abs(lx) < hw && Math.abs(lz) < hd && y < d.y - 0o1/0o4) {
        const penX = hw - Math.abs(lx), penZ = hd - Math.abs(lz);
        let plx = 0, plz = 0;
        if (penX < penZ) plx = (lx >= 0 ? 1 : -1) * penX;
        else plz = (lz >= 0 ? 1 : -1) * penZ;
        // Reen al monda spaco (rotaciita kadro)
        puŝoX += plx * cosR - plz * sinR;
        puŝoZ += plx * sinR + plz * cosR;
        hit = true;
      }
    }
    rx += puŝoX;
    rz += puŝoZ;
    if (!hit) break;
  }
  return { x: rx, z: rz };
}

// ⟪ Minimapo — la kompaso fariĝas radara mapo; klako malfermas la plenan vidon 📃 ⟫
// La mapo estas BAKITA unufoje en 2D-kanvason ( post la konstruado ), do la
// ĉiukadra kosto estas nur kelkaj drawImage — nenia dua WebGL-bildilo, nenia
// ĉiukadra sceno-submeto, neniaj shader-rekompiloj. La markilo, kanuoj kaj
// NPC-oj desegniĝas super la bakita tavolo ĉiukadre.
let mapoMalfermita = false;
let plenaKanvaso: HTMLCanvasElement | null = null;
let plenaKunteksto: CanvasRenderingContext2D | null = null;
let bakitaMapo: HTMLCanvasElement | null = null;
// La map-centro ( ludanto aŭ fotila celo ) — ĝisdatigita ĉiukadre en animacii.
let mapX = 0, mapZ = 0;

const RADARA_DUONO = 0o30;   // duon-larĝo de la radara mapo ( mondaj unuoj )
const PLENA_DUONO = 0o460;   // duon-larĝo de la plena mapo — la tuta valo
const MINA_DUONO = 0o10;     // plej proksima zomo de la plena mapo
const MAXA_DUONO = 0o500;    // plej malproksima zomo de la plena mapo
const MAPA_BAKA_DUONO = 0o1274; // 700 — kovras la tutan promeneblan mondon ( pan + zomo )
const MAPA_BAKA_REZ = 0o5000;   // 2560² — kompromiso inter akreco kaj memoro
let plenaDuono = PLENA_DUONO; // nuna duon-larĝo ( zomo ) de la plena mapo
let mapaPanX = 0;            // tirado. Horizontala forpreno de la sekv-punkto
let mapaPanZ = 0;            // tirado. Vertikala forpreno de la sekv-punkto

// Baki la scenon de supre en 2D-kanvason — unufoje, post la konstruado. La
// moviĝantaj objektoj ( kanuoj, NPC-oj, bestoj ) estas kaŝitaj dum la bake kaj
// desegnitas poste kiel 2D-supertavoloj.
function bakiMapon(): HTMLCanvasElement | null {
  try {
    const rez = MAPA_BAKA_REZ, duono = MAPA_BAKA_DUONO;
    const rt = new THREE.WebGLRenderTarget(rez, rez, {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
    });
    const mapFotilo = new THREE.OrthographicCamera(-duono, duono, duono, -duono, 1, 0o240);
    mapFotilo.up.set(0, 0, 1); // mapo-supro = nordo ( +z )
    mapFotilo.position.set(0, 0o130, 0);
    mapFotilo.lookAt(0, 0, 0);
    const kaŝitaj: THREE.Object3D[] = [];
    for (const n of npcoj) { kaŝitaj.push(n.group); n.group.visible = false; }
    for (const c of kanuoj) { kaŝitaj.push(c.group); c.group.visible = false; }
    for (const b of bestoj.bestoj) { kaŝitaj.push(b.grupo); b.grupo.visible = false; }
    for (const p of petreloj.petreloj) { kaŝitaj.push(p.grupo); p.grupo.visible = false; }
    const nebulo = sceno.fog;
    sceno.fog = null;
    const ombroj = bildilo.shadowMap.enabled;
    bildilo.shadowMap.enabled = false;
    try {
      bildilo.setRenderTarget(rt);
      bildilo.render(sceno, mapFotilo);
      bildilo.setRenderTarget(null);
    } finally {
      sceno.fog = nebulo;
      bildilo.shadowMap.enabled = ombroj;
      for (const o of kaŝitaj) o.visible = true;
    }
    const buf = new Uint8Array(rez * rez * 4);
    bildilo.readRenderTargetPixels(rt, 0, 0, rez, rez, buf);
    rt.dispose();
    const bildo = new ImageData(new Uint8ClampedArray(rez * rez * 4), rez, rez);
    // WebGL legas de la malsupro — renversu la vicojn por ke nordo estu supre.
    for (let y = 0; y < rez; y++) {
      const fonta = (rez - 1 - y) * rez * 4;
      bildo.data.set(buf.subarray(fonta, fonta + rez * 4), y * rez * 4);
    }
    const kanvasa = document.createElement("canvas");
    kanvasa.width = kanvasa.height = rez;
    kanvasa.getContext("2d")!.putImageData(bildo, 0, 0);
    return kanvasa;
  } catch (e) {
    console.warn("Mapa bakado ne havebla:", e);
    return null;
  }
}

// Desegnu la bakitan tavolon por vido centrita je ( cx, cz ) kun duon-larĝoj ( hw, hh ).
function desegniMapanTavolon(ctx: CanvasRenderingContext2D, fonto: HTMLCanvasElement, cx: number, cz: number, hw: number, hh: number, w: number, h: number): void {
  const rez = MAPA_BAKA_REZ, duono = MAPA_BAKA_DUONO;
  // La fonto havas nordon supre ( +z → malgranda y ) kaj orienton dekstren ( +x ).
  const sx = (cx - hw + duono) / (2 * duono) * rez;
  const sy = (duono - (cz + hh)) / (2 * duono) * rez;
  const sw = (2 * hw) / (2 * duono) * rez;
  const sh = (2 * hh) / (2 * duono) * rez;
  ctx.drawImage(fonto, sx, sy, sw, sh, 0, 0, w, h);
}

// La ora markilo — sago turnita laŭ la rigarda direkto.
function desegniMarkilon(ctx: CanvasRenderingContext2D, w: number, h: number, cx: number, cz: number, hw: number, hh: number): void {
  const px = (mapX - (cx - hw)) / (2 * hw) * w;
  const py = ((cz + hh) - mapZ) / (2 * hh) * h;
  const fx = rezimo === "walk" ? -Math.sin(direkto) : regiloj.target.x - fotilo.position.x;
  const fz = rezimo === "walk" ? -Math.cos(direkto) : regiloj.target.z - fotilo.position.z;
  const ang = Math.atan2(-fz, fx) + Math.PI / 2;
  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(ang);
  ctx.fillStyle = "#d8b068";
  ctx.strokeStyle = "#0a1814";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, -0o5); ctx.lineTo(0o7/0o2, 0o11/0o2); ctx.lineTo(-0o7/0o2, 0o11/0o2); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.restore();
}

// Kanuoj kaj NPC-oj kiel malgrandaj punktoj sur la mapo.
function desegniMovantajnPunktojn(ctx: CanvasRenderingContext2D, w: number, h: number, cx: number, cz: number, hw: number, hh: number): void {
  const punkto = (x: number, z: number, koloro: string) => {
    const px = (x - (cx - hw)) / (2 * hw) * w;
    const py = ((cz + hh) - z) / (2 * hh) * h;
    if (px < -3 || px > w + 3 || py < -3 || py > h + 3) return;
    ctx.fillStyle = koloro;
    ctx.beginPath(); ctx.arc(px, py, 0o14/0o10, 0, Math.PI * 2); ctx.fill();
  };
  for (const c of kanuoj) punkto(c.x, c.z, "#e8d8b0");
  for (const n of npcoj) punkto(n.group.position.x, n.group.position.z, "#b8b0a0");
}

// La radara mapo ( 0o200 × 0o200 ) — la bakita tavolo ĉirkaŭ la ludanto.
const radaraKunteksto = miniKanvaso.getContext("2d");
function desegniRadaron(): void {
  const ctx = radaraKunteksto;
  if (!ctx || !bakitaMapo) return;
  desegniMapanTavolon(ctx, bakitaMapo, mapX, mapZ, RADARA_DUONO, RADARA_DUONO, 0o200, 0o200);
  desegniMarkilon(ctx, 0o200, 0o200, mapX, mapZ, RADARA_DUONO, RADARA_DUONO);
  desegniMovantajnPunktojn(ctx, 0o200, 0o200, mapX, mapZ, RADARA_DUONO, RADARA_DUONO);
}

// La plena mapo — plenekrana 2D-kanvaso kun pan/zoom.
function desegniPlenanMapon(): void {
  if (!plenaKanvaso || !plenaKunteksto || !bakitaMapo) return;
  const kanvasa = plenaKanvaso;
  const ctx = plenaKunteksto;
  const w = kanvasa.clientWidth || innerWidth;
  const h = kanvasa.clientHeight || innerHeight;
  if (kanvasa.width !== w || kanvasa.height !== h) { kanvasa.width = w; kanvasa.height = h; }
  ctx.fillStyle = "#0a1814";
  ctx.fillRect(0, 0, w, h);
  const aspekto = w / h;
  const hw = plenaDuono * aspekto, hh = plenaDuono;
  desegniMapanTavolon(ctx, bakitaMapo, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh, w, h);
  desegniMarkilon(ctx, w, h, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh);
  desegniMovantajnPunktojn(ctx, w, h, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh);
}

// La kompaso malfermas la plenan vidon. Plenekrana kanvaso rekte en #supermeta.
function malfermiMapon(): void {
  if (mapoMalfermita) return;
  if (!bakitaMapo) { console.warn("Plena mapo ne havebla ( bakado malsukcesis )"); return; }
  if (!plenaKanvaso) {
    const kanvasa = document.createElement("canvas");
    kanvasa.id = "plenaKanvaso";
    // Plenekrana 2D-kanvaso. La CSS plenigas la tutan #supermeta ( inset 0 ).
    // la grandeco sekvas la vidon ĉiukadre ( desegniPlenanMapon ).
    kanvasa.width = innerWidth;
    kanvasa.height = innerHeight;
    plenaKanvaso = kanvasa;
    plenaKunteksto = kanvasa.getContext("2d");
    if (!plenaKunteksto) { console.warn("Plena mapo ne havebla ( 2D-kunteksto )"); plenaKanvaso = null; return; }
    // Zomo. Rado ( labortablo ) kaj pinĉo ( tuŝo ). La duon-larĝo de la vido
    // ŝanĝiĝas; la ludanta markilo restas centrita dum la zomo.
    kanvasa.addEventListener("wheel", (e) => {
      e.preventDefault();
      // Normaligu la radan unuon. Liniaj deltoj ( iuj kusenetoj ) ≈ 0o20 pikseloj.
      const delt = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      plenaDuono = Math.max(MINA_DUONO, Math.min(MAXA_DUONO, plenaDuono * Math.exp(delt * 0o1/0o2000)));
    }, { passive: false });
    // Pinĉa zomo. Zorgu ankaŭ se tria fingro aliĝas aŭ forlasas meze. Tiri ( unu
    // fingro/muso ) movas la vidcentron; post pinĉo la restanta fingro daŭre tiras.
    const punktoj = new Map<number, { x: number; y: number }>();
    let pinĉaDistanco = 0;
    let tirantaId: number | null = null;
    let lastaX = 0, lastaY = 0;
    const distancoInter = () => {
      const [a, b] = [...punktoj.values()];
      return Math.hypot(a.x - b.x, a.y - b.y);
    };
    const agordiPinĉanBazon = () => {
      if (punktoj.size >= 2) {
        const du = [...punktoj.values()].slice(0, 2);
        pinĉaDistanco = Math.hypot(du[0].x - du[1].x, du[0].y - du[1].y);
      } else {
        pinĉaDistanco = 0;
      }
    };
    // Pikseloj → mondaj unuoj. La mapo estas nedistorĉita ( samaj skvamoj en ambaŭ
    // aksoj ), do unu konverta faktoro sufiĉas. Limigu la tiradon al la maksimuma
    // zomo, por ke la mapo ne perdiĝu tute.
    // Tiri la mapon kiel paperon. Tiri orienten ( +dx ) movu la vidon okcidenten,
    // por ke la enhavo sekvu la fingron ( la Z-akso jam sekvas la fingron ).
    const tiriPans = (dx: number, dy: number) => {
      const pp = (2 * plenaDuono) / (kanvasa.clientHeight || innerHeight);
      mapaPanX = Math.max(-MAXA_DUONO, Math.min(MAXA_DUONO, mapaPanX - dx * pp));
      mapaPanZ = Math.max(-MAXA_DUONO, Math.min(MAXA_DUONO, mapaPanZ + dy * pp));
    };
    kanvasa.addEventListener("pointerdown", (e) => {
      punktoj.set(e.pointerId, { x: e.clientX, y: e.clientY });
      agordiPinĉanBazon();
      if (punktoj.size === 1) {
        tirantaId = e.pointerId;
        lastaX = e.clientX; lastaY = e.clientY;
      }
    });
    kanvasa.addEventListener("pointermove", (e) => {
      if (!punktoj.has(e.pointerId)) return;
      punktoj.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (punktoj.size >= 2 && pinĉaDistanco > 0) {
        const nova = distancoInter();
        plenaDuono = Math.max(MINA_DUONO, Math.min(MAXA_DUONO, plenaDuono * pinĉaDistanco / nova));
        pinĉaDistanco = nova;
        tirantaId = null; // la pinĉo anstataŭas la tiradon
      } else if (punktoj.size === 1 && e.pointerId === tirantaId) {
        tiriPans(e.clientX - lastaX, e.clientY - lastaY);
        lastaX = e.clientX; lastaY = e.clientY;
      }
    });
    const forigiPunkton = (e: PointerEvent) => {
      punktoj.delete(e.pointerId);
      agordiPinĉanBazon();
      // Se post la forigo restas unu fingro, daŭrigu tiri per ĝi.
      if (punktoj.size === 1) {
        const restanta = [...punktoj.entries()][0];
        tirantaId = restanta[0];
        lastaX = restanta[1].x; lastaY = restanta[1].y;
      } else {
        tirantaId = null;
      }
    };
    kanvasa.addEventListener("pointerup", forigiPunkton);
    kanvasa.addEventListener("pointercancel", forigiPunkton);
    // Duobla klako revenigas la mapon al la ludanto.
    kanvasa.addEventListener("dblclick", () => { mapaPanX = 0; mapaPanZ = 0; });
  }
  plenaDuono = PLENA_DUONO; // ĉiu malfermo rekomencas de la tuta valo
  mapaPanX = 0; mapaPanZ = 0; // ...kaj sen tirado
  document.getElementById("supermetaTitolo")!.textContent = traduki("titoloMapo");
  document.getElementById("supermetaSupra")!.textContent = traduki("subtitoloMapo");
  vestaVico.innerHTML = "";
  supermeta.appendChild(plenaKanvaso);
  supermeta.classList.add("mapo");
  mapoMalfermita = true;
  kompaso.setAttribute("aria-pressed", "true");
  supermeta.classList.add("montri");
  aplikiVacepu();
}
function fermiMapon(): void {
  mapoMalfermita = false;
  kompaso.setAttribute("aria-pressed", "false");
  supermeta.classList.remove("mapo");
  supermeta.classList.remove("montri");
  plenaKanvaso?.remove();
  plenaKanvaso = null;
  plenaKunteksto = null;
}
kompaso.addEventListener("click", malfermiMapon);
kompaso.addEventListener("keydown", (e) => {
  if (e.code === "Enter" || e.code === "Space") { e.preventDefault(); malfermiMapon(); }
});
// Fermo. La ekzistanta ✕ kaj la skrim-klako jam forigas .montri; jen nia stato.
supermeta.addEventListener("click", (e) => {
  if (mapoMalfermita && (e.target === supermeta || (e.target as HTMLElement).id === "supermetaFermi")) fermiMapon();
});

// La radara mapo ekde lanĉo — baku la statikan scenon unufoje ( la urbo kaj
// arbaro jam estas konstruitaj ). La 2D-tavoloj desegniĝas ĉiukadre.
miniKanvaso.width = miniKanvaso.height = 0o200;
bakitaMapo = bakiMapon();
// La ŝarĝa ekrano finiĝas nur kiam ĉio estas preta ( konstruado + bakado ).
sxargxaElemento.classList.add("finita");
gxisdatigiRetikulon();

// ⟪ Animacio 📃 ⟫
const horlogxo = new THREE.Timer();
function animacii() {
  requestAnimationFrame(animacii);
  // Timer ( anstataux la malnova Clock ) — update() devas voki cxiun kadron
  // antaux la legado de getDelta()/getElapsed().
  horlogxo.update();
  const krudaDt = horlogxo.getDelta();
  const deltaTempo = Math.min(krudaDt, 0o3/0o100);
  const t = horlogxo.getElapsed();

  // Reskaligi — dinamika rezolucio. Sub ŝarĝo la skalo malkreskas paŝe kaj
  // revenas kiam la kadroj denove estas rapidaj.
  const w = innerWidth, h = innerHeight;
  // Malrapida < 0o60fps, rapida > 0o72fps. La rapida sojlo estas atingebla ankaŭ
  // sur 60Hz-ekrano ( kadroj ≈ 1/0o74s < 1/0o72s ), por ke la rezolucio povu reveni.
  if (krudaDt > 1 / 0o60) { malrapidajKadroj++; rapidajKadroj = 0; }
  else if (krudaDt < 1 / 0o70) { rapidajKadroj++; malrapidajKadroj = 0; }
  if (malrapidajKadroj >= 0o40 && dinamikaSkalo > 0o6/0o10) { dinamikaSkalo = Math.max(0o6/0o10, dinamikaSkalo - 0o1/0o10); malrapidajKadroj = 0; }
  else if (rapidajKadroj >= 0o130 && dinamikaSkalo < 1) { dinamikaSkalo = Math.min(1, dinamikaSkalo + 0o1/0o10); rapidajKadroj = 0; }
  const aktivaRatio = Math.min(devicePixelRatio, 2) * dinamikaSkalo;
  if (kanvaso.width !== Math.floor(w * aktivaRatio) || kanvaso.height !== Math.floor(h * aktivaRatio)) {
    fotilo.aspect = w / h; fotilo.updateProjectionMatrix();
    bildilo.setPixelRatio(aktivaRatio);
    bildilo.setSize(w, h);
  }

  // Flamoj
  animaciiFlammojn(lampSistemo, t);
  // Akva animacio
  gxisdatigiAkvon(riverData, t);
  gxisdatigiAkvon(riveroNordOrienta, t);
  gxisdatigiAkvon(lago, t);
  // Ktenoforoj — naĝado kaj pulso en la rivero
  gxisdatigiBestojn(bestoj, t);
  // Neĝopetreloj — rondflugado kaj flugil-batado super la lago kaj la rivero
  gxisdatigiPetrelojn(petreloj, t);
  // Krasesxagxo — oscila flosado super la kosmopordo
  animaciiKrasesxagxon(xipo, t, false);

  // Promena reximo
  if (rezimo === "walk" && !surKanoto) {
    let movX = (klavoj.KeyD || klavoj.ArrowRight ? 1 : 0) - (klavoj.KeyA || klavoj.ArrowLeft ? 1 : 0);
    let movZ = (klavoj.KeyW || klavoj.ArrowUp ? 1 : 0) - (klavoj.KeyS || klavoj.ArrowDown ? 1 : 0);
    const longo = Math.hypot(movX, movZ);
    if (longo > 1) { movX /= longo; movZ /= longo; }
    const sprinto = klavoj.ShiftLeft || klavoj.ShiftRight || mobSprinto;
    const rapido = sprinto ? 0o124/0o10 : 0o255/0o40;
    const fortoX = -Math.sin(direkto), fortoZ = -Math.cos(direkto);
    const radX = Math.cos(direkto), radZ = -Math.sin(direkto);
    let novaX = ludantaPozicio.x + (fortoX * movZ + radX * movX) * rapido * deltaTempo;
    let novaZ = ludantaPozicio.z + (fortoZ * movZ + radZ * movX) * rapido * deltaTempo;
    // La mapo etendiĝas orienten ( -x ) ĝis la fora lagbordo ( x ≈ -0o220, z ≈
    // -0o211 ) kaj suden ĝis la dokoj ( z ≈ -0o154 ). Norden ĝi etendiĝas ĝis
    // la norda deklivo de la piedirebla montaro ( la limo z ≈ 0o440 atingas la
    // montaron, kiu etendiĝas ĝis 0o444 ), do la ludanto povas grimpi trans la
    // selo kaj malsupreniri la nordan flankon antaŭ la maprando. La malnova limo
    // z ≥ -0o128 staris kiel nevidebla muro en la mezo de la doka vojo.
    novaX = Math.max(-0o440, Math.min(0o440, novaX));
    novaZ = Math.max(-0o340, Math.min(0o440, novaZ));

    const r = solviKolizion(novaX, novaZ);
    // Dokoj. Bloku eniron SUB la platformon ( sur-gxin piedirado restas libera )
    const rd = solviDokanKolizion(r.x, r.z, ludantaPozicio.y);
    ludantaPozicio.x = rd.x; ludantaPozicio.z = rd.z;
    const moving = Math.min(1, longo);

    const teraY = Math.max(alteco(ludantaPozicio.x, ludantaPozicio.z), dokaSuproY(ludantaPozicio.x, ludantaPozicio.z));
    const enLago = cxuEnLago(ludantaPozicio.x, ludantaPozicio.z);
    const enNordorienta = cxuEnNordorientaRivero(ludantaPozicio.x, ludantaPozicio.z);
    const enAkvo = enLago || enNordorienta || cxuEnAkvo(ludantaPozicio.x, ludantaPozicio.z, riveroZ, RIVERA_DUONLARĜO);
    const akvoY = enAkvo ? akvaNivelo(ludantaPozicio.x, ludantaPozicio.z) : -999;
    // Naĝado estas la AŬTOMATA movo sub la akvosurfaco. Tuj kiam la tereno
    // subeniras sub la akvonivelo, la ludanto mergiĝas kaj naĝas — neniu
    // interago ( E ) aŭ transiro necesas. La sekaj bordo-strioj ene de la
    // (pli larĝa) akvo-zono restas piedireblaj anstataŭ naĝeblaj.
    const akvaProfundo = akvoY - teraY;   // > 0 = tereno sub la surfaco
    // ( la lasta kondiĉo tenas saltantajn enirantojn. Ili naĝu nur kiam ili jam
    //   alproksimiĝis al la surfaco, ne dum la falo de alta bordo )
    const naĝas = enAkvo && akvaProfundo > 0 && ludantaPozicio.y < akvoY + 0o6/0o10;

    if (naĝas) {
      // Profunda akvo — subakva naĝado. La korpo mergiĝas ĝis la okuloj ĉe la
      // ondsurfaco ( la ondeto donas la naĝan balancadon ). En malprofunda akvo
      // la celo restas ĉe la fundo, do la ludanto vadadas kun kapo super la akvo.
      // NAĜA_MERGO. La maksimuma mergo ( 0o2 ≈ 2 unuoj ) tenas la fotilon iomete
      // sub la surfaco — ĉi tiu valoro agordas la forton de la "subakva" efekto.
      // La saltbutono ( Spaco aŭ la poŝtelefona butono ) donas suprenan impulson:
      // tenante ĝin la naĝanto supreniras al la surfaco, la okulojn ĝuste ĉe la
      // akvonivelo; la impulso forfadas kaj la korpo remergiĝas al la kutima mergo.
      const NAĜA_MERGO = 0o2;
      const mergo = Math.min(akvaProfundo, NAĜA_MERGO);
      // Tenante la saltbutonon ( Spaco aŭ la poŝtelefona butono ) la naĝanto
      // supreniras al la surfaco TIOM LONGE kiom ĝi estas premita; depremite
      // la korpo remergiĝas al la kutima mergo.
      const suprenas = klavoj.Space || mobSaltiTenata;
      if (suprenas) {
        ludantaPozicio.y += 0o6 * deltaTempo;
        // Ne supren trans la surfacon — la okuloj haltas ĝuste ĉe la akvonivelo.
        const supraLim = akvoY - 0o1/0o20 + Math.sin(t * 2 + ludantaPozicio.x * 0o1/0o10) * 0o1/0o20;
        if (ludantaPozicio.y > supraLim) ludantaPozicio.y = supraLim;
      } else {
        const naĝaY = akvoY - mergo + Math.sin(t * 2 + ludantaPozicio.x * 0o1/0o10) * 0o1/0o20;
        ludantaPozicio.y += (naĝaY - ludantaPozicio.y) * 0o1/0o10;
      }
      rapidoY = 0;
      estasSurTERENO = false;
      if (!estisNaĝanta && cxuAŭdio()) sfx.splash();
    } else if (enAkvo && !estasSurTERENO && ludantaPozicio.y < teraY) {
      // Malprofunda bordo — glate surgrimpu el la naĝado anstataŭ fali sub la fundon.
      ludantaPozicio.y += (teraY - ludantaPozicio.y) * 0o1/0o4;
      if (ludantaPozicio.y >= teraY - 0o1/0o100) { ludantaPozicio.y = teraY; estasSurTERENO = true; rapidoY = 0; }
    } else if (estasSurTERENO) {
      if (ludantaPozicio.y > teraY + 0o23/0o100) {
        estasSurTERENO = false;
      } else {
        ludantaPozicio.y = teraY;
      }
      rapidoY = 0;
    } else {
      rapidoY -= 0o22 * deltaTempo;
      ludantaPozicio.y += rapidoY * deltaTempo;
      if (ludantaPozicio.y <= teraY) {
        const falis = rapidoY < -3 && cxuAŭdio();
        ludantaPozicio.y = teraY;
        rapidoY = 0;
        estasSurTERENO = true;
        if (falis) sfx.crunch();
      }
    }
    estisNaĝanta = naĝas;

    oscilo += moving * rapido * deltaTempo * 0o14/0o10;
    // Dum naĝado la paŝa balancado estas mallaŭtigita — la ondeto jam movas la vidon.
    const bobAmplo = naĝas ? 0o1/0o100 : 0o3/0o100;
    fotilo.position.set(
      ludantaPozicio.x,
      ludantaPozicio.y + 0o65/0o40 + Math.sin(oscilo * 2) * bobAmplo * moving,
      ludantaPozicio.z
    );
    fotilo.rotation.set(klinigxo, direkto, 0);

    // Paŝaj sonoj ( ĉiun ~0o15/0o40 sekundojn dum movado ) — dum naĝado la silento regas.
    if (!naĝas) {
      pauxzaPaŝo += moving * deltaTempo;
      if ( pauxzaPaŝo > 0o15/0o40 && cxuAŭdio() ) {
        sfx.step();
        pauxzaPaŝo = 0;
      }
    }

    // Detekti pordojn kaj kanuojn. La centra sanktejo havas pordojn sur CXiUJ
    // kvar flankoj — la plej proksima pordo decidas tra kiu eniri.
    let proksimaPordo: KonstruSpec | null = null;
    let proksimaPordoDist = 3;
    for (const s of konstruSpecoj) {
      if (s.x === 0 && s.z === 0) {
        for ( let k = 0; k < 4; k++ ) {
          const a = k * Math.PI / 2;
          const pordoX = s.x + Math.sin(a) * (s.d / 2 + 0o14/0o10);
          const pordoZ = s.z + Math.cos(a) * (s.d / 2 + 0o14/0o10);
          const d = Math.hypot(ludantaPozicio.x - pordoX, ludantaPozicio.z - pordoZ);
          if (d < proksimaPordoDist) { proksimaPordoDist = d; proksimaPordo = s; aktivaPordaAngulo = a; }
        }
        continue;
      }
      const difX = Math.sin(s.rot || 0), difZ = Math.cos(s.rot || 0);
      const pordoX = s.x + difX * (s.d / 2 + 0o14/0o10), pordoZ = s.z + difZ * (s.d / 2 + 0o14/0o10);
      const d = Math.hypot(ludantaPozicio.x - pordoX, ludantaPozicio.z - pordoZ);
      if (d < proksimaPordoDist) { proksimaPordoDist = d; proksimaPordo = s; aktivaPordaAngulo = 0; }
    }
    plejProksimaPordo = proksimaPordo;
    let proksimaKanuo: Kanoto | null = null;
    let proksimaKanuoDist = 6;
    for (const c of kanuoj) {
      const d = Math.hypot(c.x - ludantaPozicio.x, c.z - ludantaPozicio.z);
      if (d < proksimaKanuoDist) { proksimaKanuoDist = d; proksimaKanuo = c; }
    }
    if (plejProksimaPordo) {
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("eniri") + ` ` + traduki(plejProksimaPordo.name));
      promptoElemento.classList.add("montri");
    } else if (proksimaKanuo && !surKanoto) {
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("eniriKanuo"));
      promptoElemento.classList.add("montri");
    } else if (!surKanoto) {
      promptoElemento.classList.remove("montri");
    }
  }

  // ⟪ Interna piedirado 📃 ⟫
  if (rezimo === "interior" && elektitaSpec) {
    let movX = (klavoj.KeyD || klavoj.ArrowRight ? 1 : 0) - (klavoj.KeyA || klavoj.ArrowLeft ? 1 : 0);
    let movZ = (klavoj.KeyW || klavoj.ArrowUp ? 1 : 0) - (klavoj.KeyS || klavoj.ArrowDown ? 1 : 0);
    const longo = Math.hypot(movX, movZ);
    if (longo > 1) { movX /= longo; movZ /= longo; }
    const rapido = 0o215/0o40;
    const fortoX = -Math.sin(direkto), fortoZ = -Math.cos(direkto);
    const radX = Math.cos(direkto), radZ = -Math.sin(direkto);
    let novaX = ludantaPozicio.x + (fortoX * movZ + radX * movX) * rapido * deltaTempo;
    let novaZ = ludantaPozicio.z + (fortoZ * movZ + radZ * movX) * rapido * deltaTempo;

    const specX = elektitaSpec.x, specZ = elektitaSpec.z, specH0 = elektitaSpec.flugoY ?? (elektitaSpec.h0 || 0);
    const rot = elektitaSpec.rot || 0;
    const cosR = Math.cos(rot), sinR = Math.sin(rot);
    const plankoj = internaSistemo.plankoj;
    const helikso = internaSistemo.helikso;
    const ludY = ludantaPozicio.y - specH0;
    let aktivaPlanko = plankoj[0];
    let etapy = specH0;
    for (const p of plankoj) {
      if (ludY >= p.y - 0o4/0o10 && ludY < p.y + p.alto) { aktivaPlanko = p; break; }
    }
    // Konverti al lokalaj konstruajxaj koordinatoj por la krampo (turnado)
    const margxeno = 0o3/0o10;
    let lokalX = (novaX - specX) * cosR + (novaZ - specZ) * sinR;
    let lokalZ = -(novaX - specX) * sinR + (novaZ - specZ) * cosR;

    // Helika ŝtuparo. Piedirante ĉirkaŭ la kolono la ludanto leviĝas tra ĉiuj
    // etaĝoj (unu plena turno = unu etaĝo). La spiralo estas kontinue sekvata.
    let surHelikso = false;
    if (helikso && ludY >= heliksaAltecxo(helikso, -helikso.turnojSube) - 0o1/0o10 && ludY <= heliksaAltecxo(helikso, helikso.turnoj) + 0o1/0o10) {
      // Ĉu la ludanto estas sufiĉe proksima al etaĝa nivelo por paŝi de la
      // ŝtuparo sur la ringan plankon. Mezvoje inter etaĝoj la ŝtupara rando
      // estas barilo — oni ne falu al la suba etaĝo.
      let subaPlankoY = -Infinity;
      for (const p of plankoj) if (p.y <= ludY) subaPlankoY = Math.max(subaPlankoY, p.y);
      const jeEtago = ludY - subaPlankoY <= 0o4/0o10;
      // Ekstera krampo. Trans la ŝtuparan randon mezvoje inter etaĝoj la ludanto
      // glitas reen al la rando ( anstataŭ fali al la suba etaĝo ). Ĉe etaĝa
      // nivelo oni rajtas paŝi sur la ringan plankon.
      let dist = Math.hypot(lokalX, lokalZ);
      // La centra kolono estas ĈIAM solida — la ludanto neniam rajtas eniri la
      // polon, ĉu li staras sur la ŝtupoj, ĉu li paŝas de la planko aŭ falas.
      // La malnova krampo validis nur dum surHelikso, do oni povis pasi trans
      // la polon kaj fali tra gxi en la ŝakton.
      if (dist < helikso.rKol + 0o1/0o20) {
        const nR = helikso.rKol + 0o1/0o20;
        if ( dist > 0o1/0o20000 ) {
          lokalX = (lokalX / dist) * nR;
          lokalZ = (lokalZ / dist) * nR;
        } else {
          lokalX = nR;
          lokalZ = 0;
        }
        dist = nR;
      }
      if (dist > helikso.rEkster && !jeEtago) {
        const nR = helikso.rEkster - 0o1/0o40;
        lokalX = (lokalX / dist) * nR;
        lokalZ = (lokalZ / dist) * nR;
        dist = nR;
      }
      if (dist >= helikso.rKol - 0o1/0o10 && dist <= helikso.rEkster) {
        surHelikso = true;
        const ang = Math.atan2(lokalX, lokalZ);
        const frac = ((ang % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2);
        if (sxtupaTurno === null) {
          // Eniro. Komencu je la plej proksima turno al la nuna alteco. Oni rajtas
          // ankaŭ malsupreniri al la sub-teraj etaĝoj ( la ŝtuparo etendiĝas suben
          // laŭ turnojSube ), do neniu krampo al 0.
          const turno0 = ludY >= 0 ? ludY / helikso.turnoAlto : ludY / helikso.turnoAltoSub;
          const malsupraLim = -helikso.turnojSube;
          sxtupaTurno = Math.max(malsupraLim, Math.min(helikso.turnoj, Math.round(turno0 - frac) + frac));
          antauxaHeliksaFrac = frac;
        } else {
          // Daŭra vindo. Sekvu la angulon ĉirkaŭ la spiralo per la SIGNAN angula
          // delto ( supren kaj suben ). La malnova formulo ( round(t−frac)+frac )
          // repuŝis la ludanton SUPRE ĉe la suba fino de la ŝtuparo ( kaj suben ĉe
          // la supra fino ): kiam t trafis la krampon, la rondigo daŭre generis
          // valorojn super la krampo, do la ludanto resaltis kaj ne povis stari
          // firme sur la plej malalta etaĝo. Delta-spurado estas monotona kaj
          // haltas firme ĉe ambaŭ finoj.
          let delta = frac - antauxaHeliksaFrac;
          if (delta > 0o4/0o10) delta -= 1;          // pli ol duon-turno = la 2π-rivolon
          else if (delta < -0o4/0o10) delta += 1;
          antauxaHeliksaFrac = frac;
          sxtupaTurno = Math.max(-helikso.turnojSube, Math.min(helikso.turnoj, sxtupaTurno + delta));
        }
        etapy = specH0 + heliksaAltecxo(helikso, sxtupaTurno);
        novaX = specX + cosR * lokalX - sinR * lokalZ;
        novaZ = specZ + sinR * lokalX + cosR * lokalZ;
      }
    }
    if (!surHelikso) {
      sxtupaTurno = null;
      if (aktivaPlanko) {
        lokalX = Math.max(-aktivaPlanko.hw + margxeno, Math.min(aktivaPlanko.hw - margxeno, lokalX));
        lokalZ = Math.max(-aktivaPlanko.hd + margxeno, Math.min(aktivaPlanko.hd - margxeno, lokalZ));
        novaX = specX + cosR * lokalX - sinR * lokalZ;
        novaZ = specZ + sinR * lokalX + cosR * lokalZ;
        etapy = specH0 + aktivaPlanko.y;
      } else {
        etapy = specH0;
      }
    }

    ludantaPozicio.x = novaX;
    ludantaPozicio.z = novaZ;
    const moving = Math.min(1, longo);

    if (estasSurTERENO) {
      ludantaPozicio.y += (etapy - ludantaPozicio.y) * 0o3/0o20;
      rapidoY = 0;
      if ( Math.abs(ludantaPozicio.y - etapy) < 0o1/0o200 ) ludantaPozicio.y = etapy;
    } else {
      rapidoY -= 0o22 * deltaTempo;
      ludantaPozicio.y += rapidoY * deltaTempo;
      if (ludantaPozicio.y <= etapy) {
        ludantaPozicio.y = etapy;
        rapidoY = 0;
        estasSurTERENO = true;
      }
    }

    oscilo += moving * rapido * deltaTempo * 0o14/0o10;
    fotilo.position.set(
      ludantaPozicio.x,
      ludantaPozicio.y + 0o65/0o40 + Math.sin(oscilo * 2) * 0o3/0o100 * moving,
      ludantaPozicio.z
    );
    fotilo.rotation.set(klinigxo, direkto, 0);

    // Detekti manĝaĵojn kaj montri taŭgan prompton
    let proksimaManĝaĵo: MangxajxItemo | null = null;
    let proksimaManĝaĵoDist = 2;
    for (const it of internaSistemo.manĝaĵoj) {
      if (it.dead) continue;
      const spec = elektitaSpec!;
      const rot = spec.rot || 0;
      const cosR = Math.cos(rot), sinR = Math.sin(rot);
      const mX = spec.x + cosR * it.pos.x - sinR * it.pos.z;
      const mZ = spec.z + sinR * it.pos.x + cosR * it.pos.z;
      const d = Math.hypot(ludantaPozicio.x - mX, ludantaPozicio.z - mZ);
      if (d < proksimaManĝaĵoDist) { proksimaManĝaĵoDist = d; proksimaManĝaĵo = it; }
    }
    plejProksimaManĝaĵo = proksimaManĝaĵo;
    if (proksimaManĝaĵo) {
      const prefikso = traduki("actGusti");
      agordiPrompton(`<span class="klavo">E</span> ${prefikso} ${traduki("manĝ" + proksimaManĝaĵo.f.key.charAt(0).toUpperCase() + proksimaManĝaĵo.f.key.slice(1))}`);
      promptoElemento.classList.add("montri");
    } else {
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("actEliri"));
      promptoElemento.classList.add("montri");
    }
  }

  // Kanota logiko
  if (surKanoto) {
    const steer = (klavoj.KeyD || klavoj.ArrowRight ? 1 : 0) - (klavoj.KeyA || klavoj.ArrowLeft ? 1 : 0);
    let movZ = (klavoj.KeyW || klavoj.ArrowUp ? 1 : 0) - (klavoj.KeyS || klavoj.ArrowDown ? 1 : 0);
    if (steer !== 0) surKanoto.direkto -= steer * 2 * deltaTempo;
    const fortoX = -Math.sin(surKanoto.direkto), fortoZ = -Math.cos(surKanoto.direkto);
    const radX = Math.cos(surKanoto.direkto), radZ = -Math.sin(surKanoto.direkto);
    gxisdatigiKanotanFizikon(surKanoto, deltaTempo, fortoX, fortoZ, radX, radZ, 0, movZ);
    // En la lago ( aŭ ĝia tuja ĉirkaŭaĵo ) la kanuo naĝas sur la lagnivelo kaj
    // restu ene de la lagrando; ekstere la rivera krampo tenas ĝin sur la
    // ribono. La bufro ( +2 ) evitas ke la rivera krampo trenu la kanuon sur
    // sekan teron ĉe la orienta/norda lagbordo, kie la ribono jam finiĝas.
    const angK = Math.atan2( surKanoto.z - lagoZ(), surKanoto.x - LAGO_X );
    const enLagoK = Math.hypot( surKanoto.x - LAGO_X, surKanoto.z - lagoZ() ) < lagoRadio( angK ) + 0o2;
    const enNordorientaK = cxuEnNordorientaRivero(surKanoto.x, surKanoto.z);
    const akvoNiveloK = enLagoK ? lagoNivelo() : enNordorientaK ? riveraNordOrientaNivelo(surKanoto.z) : riveraAkvaNivelo(surKanoto.x);
    surKanoto.bazaY = akvoNiveloK;
    if (!enLagoK && enNordorientaK) {
      // Nordorienta rivereto — la rivero fluas laŭ x ( ne laŭ z ), do limigu
      // la kanuon al la rivercentro laŭ x ( ±0o14 ) anstataŭ laŭ z.
      const riveroX2 = riveroNordOrientaX(surKanoto.z);
      const driftX = surKanoto.x - riveroX2;
      if (Math.abs(driftX) > 6) {
        const puŝo = (Math.abs(driftX) - 6) * 0o4/0o10;
        surKanoto.vx -= Math.sign(driftX) * puŝo * deltaTempo;
      }
      surKanoto.x = riveroX2 + Math.max(-0o14, Math.min(0o14, surKanoto.x - riveroX2));
    } else if (!enLagoK) {
      const riveroZ2 = riveroZ(surKanoto.x);
      const drift = surKanoto.z - riveroZ2;
      if (Math.abs(drift) > 6) {
        const puŝo = (Math.abs(drift) - 6) * 0o4/0o10;
        surKanoto.vz -= Math.sign(drift) * puŝo * deltaTempo;
      }
      // La rivero fluas sude ( z ≈ -0o160 ), do la malnova limo ±0o120 el la
      // epoko de la malnova rivero lasus la kanuon sur la teron. limigu la
      // kanuon al la rivera zono ( ±0o14 de la rivercentro ) anstataŭe.
      surKanoto.z = riveroZ(surKanoto.x) + Math.max(-0o14, Math.min(0o14, surKanoto.z - riveroZ(surKanoto.x)));
    } else {
      // En la lago la kanuo naĝas libere — restu ene de la lagrando.
      const d = Math.hypot( surKanoto.x - LAGO_X, surKanoto.z - lagoZ() );
      const rLim = lagoRadio( angK ) * 0o23/0o24;
      if (d > rLim) {
        surKanoto.x = LAGO_X + (surKanoto.x - LAGO_X) / d * rLim;
        surKanoto.z = lagoZ() + (surKanoto.z - lagoZ()) / d * rLim;
      }
    }
    surKanoto.x = Math.max(-0o360, Math.min(0o200, surKanoto.x));
    surKanoto.x += surKanoto.vx * deltaTempo;
    surKanoto.z += surKanoto.vz * deltaTempo;

    // Doka kolizio. La kanuo ne rajtas sub la platformojn ( la fotilo restus subtera ).
    const dk = solviDokanKolizion(surKanoto.x, surKanoto.z, -999, 0o5/0o4);
    surKanoto.x = dk.x; surKanoto.z = dk.z;
    // Ne lasu la kanuon en malprofunda akvo (tereno super la akva surfaco) —
    // repuŝu al la rivercentro por ke la ludanto ne restu subtera.
    const kx = surKanoto.x, kz = surKanoto.z;
    const angK2 = Math.atan2( kz - lagoZ(), kx - LAGO_X );
    const enLagoK2 = Math.hypot( kx - LAGO_X, kz - lagoZ() ) < lagoRadio( angK2 ) + 0o2;
    const enNordorientaK2 = cxuEnNordorientaRivero(kx, kz);
    const akvoNiveloK2 = enLagoK2 ? lagoNivelo() : enNordorientaK2 ? riveraNordOrientaNivelo(kz) : riveraAkvaNivelo(kx);
    if (alteco(kx, kz) > akvoNiveloK2 + 0o1/0o4) {
      // Repuŝu al la akvocentro pli forte kaj haltigu la bankan drivon, por ke
      // la kanuo ne restu banita en malprofunda akvo. En la lago la centro estas
      // la lagcentro; en la nordorienta rivereto la rivercentro laŭ x; en la
      // cxefa rivero la rivercentro laŭ z.
      if (enLagoK2) {
        surKanoto.x += (LAGO_X - kx) * Math.min(1, 0o30 * deltaTempo);
        surKanoto.z += (lagoZ() - kz) * Math.min(1, 0o30 * deltaTempo);
      } else if (enNordorientaK2) {
        // La rivereto fluas laŭ x — repuŝu laŭ x kaj haltigu la x-drivon.
        surKanoto.x += (riveroNordOrientaX(kz) - kx) * Math.min(1, 0o30 * deltaTempo);
        surKanoto.vx = 0;
      } else {
        surKanoto.z += (riveroZ(kx) - kz) * Math.min(1, 0o30 * deltaTempo);
        surKanoto.vz = 0;
      }
    }
    // Levu la kanu-bazon super la terenon. En malprofunda akvo la akva nivelo
    // estus SUB la planko, do la kanuo kaj la fotilo enirus la teron.
    surKanoto.bazaY = Math.max(akvoNiveloK2, alteco(surKanoto.x, surKanoto.z));

    direkto = surKanoto.direkto;
    fotilo.position.set(surKanoto.x, surKanoto.bazaY + 0o3/0o40 + 0o21/0o40, surKanoto.z);
    fotilo.rotation.set(klinigxo, surKanoto.direkto, 0);
    agordiPrompton(`<span class="klavo">E</span> ` + traduki("eliriKanuo"));
    promptoElemento.classList.add("montri");
    ludantaPozicio.set(surKanoto.x, 0o155/0o100, surKanoto.z);
  }

  // Kanotaj animacioj. Ĉiu NE-rajdanta kanuo flosas sur la REALA akvosurfaco
  // ( la sama krampita nivelo kiel la akvomesho kaj la rajdanta branĉo ), ne sur
  // la kruda akvoY de la naskiĝloko — tiu povas malsami ĝis ~2 unuoj kaj lasus
  // la kanuon duone droninta. La plafono ( max kun la tereno ) evitas ke la
  // kanuo enprofundigu en malprofundan bordon.
  for (const c of kanuoj) {
    if (c !== surKanoto) c.bazaY = Math.max(akvaNivelo(c.x, c.z), alteco(c.x, c.z));
    animaciiKanoton(c, t, c === surKanoto);
  }
  // NPC-aj animacioj
  for (const n of npcoj) gxisdatigiNpc(n, deltaTempo, t, alteco);
  // Internaj animacioj
  if (rezimo === "interior") gxisdatigiInternon(internaSistemo, t);

  // Nebula drivo
  for (const sp of nebuloj) {
    sp.position.x += sp.userData.rapido * deltaTempo * 0o4/0o10;
    if (sp.position.x > 0o163) sp.position.x = -0o163;
  }

  // Kompaso / minimapo — la nadlo indikas la rigardan direkton sur la norda mapo.
  const fotilaDirekto = rezimo === "walk" ? direkto : -Math.atan2(fotilo.position.x - regiloj.target.x, fotilo.position.z - regiloj.target.z);
  (nadlo as HTMLElement).style.transform = `rotate(${fotilaDirekto + Math.PI}rad)`;
  // La mapo sekvu la vidpunkton. En promeno/interno la ludanto, en orbito la
  // fotila celo — alie la radaro restus fiksita ĉe la elirloko en orbito.
  mapX = rezimo === "orbit" ? regiloj.target.x : ludantaPozicio.x;
  mapZ = rezimo === "orbit" ? regiloj.target.z : ludantaPozicio.z;
  // La bakita mapo desegniĝas ĉiukadre — nur 2D-tavoloj, neniu sceno-submeto.
  if (bakitaMapo) {
    if (mapoMalfermita) {
      desegniPlenanMapon();
    } else if (sxargxaElemento.classList.contains("finita")) {
      desegniRadaron();
    }
  }

  // WASD orbita movado; Q/E por vertikala movo
  if (rezimo === "orbit") {
    let panX = (klavoj.KeyD ? 1 : 0) - (klavoj.KeyA ? 1 : 0);
    let panZ = (klavoj.KeyS ? 1 : 0) - (klavoj.KeyW ? 1 : 0);
    const panY = (klavoj.KeyE ? 1 : 0) - (klavoj.KeyQ ? 1 : 0);
    if (panX || panZ || panY) {
      const fotilaDir = new THREE.Vector3();
      fotilo.getWorldDirection(fotilaDir);
      fotilaDir.y = 0; fotilaDir.normalize();
      const side = new THREE.Vector3().crossVectors(fotilaDir, new THREE.Vector3(0, 1, 0)).normalize();
      const rapido = 0o50 * deltaTempo;
      const offset = new THREE.Vector3()
        .addScaledVector(side, panX * rapido)
        .addScaledVector(fotilaDir, -panZ * rapido);
      offset.y = panY * rapido;
      regiloj.target.add(offset);
      fotilo.position.add(offset);
    }
    regiloj.update();
  }

  bildilo.render(sceno, fotilo);
}

// ⟪ Sxargxo 📃 ⟫ — la stango estas pelita de la REALA konstrua progreso
// ( konstruiUrbon raportas procentojn ). La finita-klaso aldoniĝas poste, kiam
// la konstruado kaj la mapo-bakado finiĝis ( vidu la mapo-sekcion ).

// ⟪ Ŝarĝa ekrano por konstruaĵ-eniro 📃 ⟫
// Reuzu la saman ekranon kiel la lanĉo. Montru la stangon, plenigu ĝin dum
// `daŭro` ms, tiam rulu la callback kaj kaŝu.
let montriSxargxoIntervalo: ReturnType<typeof setInterval> | null = null;
let sxargxaRestorilo: ReturnType<typeof setTimeout> | null = null;
function montriSargxon(daŭro: number, callback: () => void): void {
  // Nuligu eventualan ŝarĝon/eston de antaŭa voko. Malnovaj tempigiloj nek
  // malrapidigu la nunan aperon ( la CSS defaŭlte ŝanĝiĝas je 1s ) nek rulu
  // duan fojon la callback ( ekz. duobla E-premo dum la ŝarĝo ).
  if (montriSxargxoIntervalo) { clearInterval(montriSxargxoIntervalo); montriSxargxoIntervalo = null; }
  if (sxargxaRestorilo) { clearTimeout(sxargxaRestorilo); sxargxaRestorilo = null; }
  stangoPlenigo.style.blockSize = "0%";
  sxargxaElemento.style.transition = "opacity .25s";
  sxargxaElemento.classList.remove("finita");
  let progreso = 0;
  const paŝoj = 0o40; // 32 paŝoj
  montriSxargxoIntervalo = setInterval(() => {
    progreso += 1 / paŝoj;
    stangoPlenigo.style.blockSize = `${Math.min(100, progreso * 100)}%`;
    if (progreso >= 1) {
      if (montriSxargxoIntervalo) { clearInterval(montriSxargxoIntervalo); montriSxargxoIntervalo = null; }
      // Neniam permesu ke la ŝarĝa ekrano restu blokita. eĉ se la callback
      // ĵetas ( hazarda retumila/kanvasa/WebGL-eraro ), la kaŝo estas ĉiam
      // planita en la finally, do la ludanto neniam restas antaŭ la stango.
      try {
        callback();
      } finally {
        sxargxaRestorilo = setTimeout(() => {
          sxargxaElemento.classList.add("finita");
          sxargxaRestorilo = setTimeout(() => {
            sxargxaElemento.style.transition = "";
            sxargxaRestorilo = null;
          }, 0o310);
        }, 0o310);
      }
    }
  }, daŭro / paŝoj);
}

// ⟪ Montra-seruro por piedirado ( ekstere kaj interne ) 📃 ⟫
kanvaso.addEventListener("click", () => {
  if (rezimo === "walk" || rezimo === "interior") kanvaso.requestPointerLock();
});
document.addEventListener("mousemove", (e) => {
  if (document.pointerLockElement !== kanvaso || (rezimo !== "walk" && rezimo !== "interior")) return;
  direkto -= e.movementX * 0o1/0o1000;
  klinigxo -= e.movementY * 0o1/0o1000;
  klinigxo = Math.max(-0o135/0o100, Math.min(0o135/0o100, klinigxo));
});

// ⟪ Ekfunkciigo 📃 ⟫
animacii();
