// Aranis — immersive city experience (orchestrator)
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { kreiKanoton, animaciiKanoton, gxisdatigiKanotanFizikon, Kanoto } from "../assets/transporto.js";
import { VESTOJ, kreiVestanAntauxrigardon } from "../assets/vestoj.js";
import { animaciiFlammojn } from "../assets/hxeuxfa-lampo.js";
import { gxisdatigiAkvon, cxuEnAkvo } from "../assets/akvo.js";
import { gxisdatigiNpc } from "../assets/npcoj.js";
import type { Figuro, Vesto } from "../assets/npcoj.js";
import { eniriInternon, eliriInternon as eliriElInterno, gxisdatigiInternon, heliksaAltecxo } from "../assets/internoj.js";
import { animaciiKrasesxagxon } from "../assets/krasesxagxa-kosmosxipo.js";
import { TIPARO, KonstruSpec, MangxajxItemo } from "../assets/satalaj-konstruajxoj.js";
import { riveroZ, akvoY, alteco, RIVERA_DUONLARĜO } from "./tereno.js";
import { kreiScenon, ScenaSistemo } from "./scena.js";
import type { UrbaSistemo } from "./urbo.js";
import { konstruiUrbon } from "./urbo.js";
import { traduki, cxuAih } from "./tradukoj.js";
import { sxaltiAŭdion, cxuAŭdio, sxaltiBruon, cxuBruo, sfx, rumble, autoKomenci, registriPostAŭdio } from "../assets/sonoro.js";
import { ludi, sxargiTrako, nunaTrako, cxuLudas } from "../assets/muziko/ludilo.js";

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

// ⟪ Stirstanga stato 📃 ⟫
let joystickAktiva = false;
let joystickID = -1;
const JOYSTICK_R = 0o50;

// ⟪ Sonora stato 📃 ⟫
let pauxzaPaŝo = 0; // step sound cooldown counter

// ⟪ Krei scenon kaj urbon 📃 ⟫
const scena: ScenaSistemo = kreiScenon(kanvaso, sxargxaElemento);
const { bildilo, fotilo, sceno, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, aplikiRezimon } = scena;

const urbo: UrbaSistemo = konstruiUrbon(sceno, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo);
const {
  konstruSpecoj, kolizioj, dokoKolizioj, selektajxoj,
  riverData, lampSistemo, nebuloj, kanuoj, npcoj, internaSistemo, xipo,
} = urbo;

// ⟪ Orbit-regiloj 📃 ⟫
const regiloj = new OrbitControls(fotilo, bildilo.domElement);
regiloj.target.set(0, 2, 0);
regiloj.enableDamping = true;
regiloj.dampingFactor = 5/64;
regiloj.maxPolarAngle = Math.PI * 31/64;
regiloj.minDistance = 0o10;
regiloj.maxDistance = 0o334;
regiloj.update();

// ⟪ Stato 📃 ⟫
let rezimo: "orbit" | "walk" | "interior" = "orbit";
let antauxaRezimo: "orbit" | "walk" | null = null;
let surKanoto: Kanoto | null = null;
let elektitaSpec: KonstruSpec | null = null;
let plejProksimaPordo: KonstruSpec | null = null;
let plejProksimaManĝaĵo: MangxajxItemo | null = null;
// Kontinua vindo de la helika ŝtuparo (nulo = ne sur la spiralo).
let sxtupaTurno: number | null = null;
let direkto = 0, klinigxo = -1/16;
const ludantaPozicio = new THREE.Vector3(0, 5/32, 0o44);
let rapidoY = 0, estasSurTERENO = false;
const klavoj: Record<string, boolean> = {};
let mobSprinto = false;
let oscilo = 0;
let tostaTempilo: ReturnType<typeof setTimeout> | null = null;


// ⟪ Navigada pop-up 📃 ⟫
// La butono mem estas la fermilo: 二 fermita · 川 malfermita ( kaj la glifo sekvas la staton ).
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

// ⟪ Aŭtomata komenco je unua tuŝo/klako 📃 ⟫
function gxisdatigiSonoranButonon(aktiva: boolean) {
  butSonoro.setAttribute("aria-pressed", String(aktiva));
  butSonoro.textContent = aktiva ? "♫" : "♬";
  gxisdatigiTrakoButonojn();
}
registriPostAŭdio(gxisdatigiSonoranButonon);
document.addEventListener("pointerdown", () => autoKomenci(), { once: true });

// ⟪ Tuŝekrano: la kontroloj aperu je tuŝo kaj kaŝiĝu post senaktiveco 📃 ⟫
let tuŝaTempilo = 0;
function montriTuŝajnKontrolojn(): void {
  document.body.classList.add("tuŝa");
  if (tuŝaTempilo) window.clearTimeout(tuŝaTempilo);
  // Post 3 sekundoj sen tuŝo la kontroloj malaperas ( la sekva tuŝo revenigas ilin ).
  tuŝaTempilo = window.setTimeout(() => {
    // Ne kaŝu dum la stirstango estas tenata: touchend eble ne alvenas sur kaŝita zono.
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
butKrepusko.setAttribute("aria-pressed", String(krepuskaValoro > 4/8));
aplikiRezimon(0);
butKrepusko.addEventListener("click", () => {
  if (krepuskaValoro > 4/8) {
    krepuskaValoro = 0;
    duskRegilo.value = "0";
  } else {
    krepuskaValoro = 1;
    duskRegilo.value = "1";
  }
  butKrepusko.textContent = krepuskaValoro > 4/8 ? "☀" : "☽";
  butKrepusko.setAttribute("aria-pressed", String(krepuskaValoro > 4/8));
  aplikiRezimon(krepuskaValoro);
  fermiNaviganPopUp();
});
duskRegilo.addEventListener("input", () => {
  krepuskaValoro = parseFloat(duskRegilo.value);
  butKrepusko.textContent = krepuskaValoro > 4/8 ? "☀" : "☽";
  butKrepusko.setAttribute("aria-pressed", String(krepuskaValoro > 4/8));
  aplikiRezimon(krepuskaValoro);
});

// ⟪ Vacepu: envolvi la vortojn de la flosantaj kartoj en la aih-a lingvo. ⟫
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

// La prompto sxangxigxas cxiun kadron: envolvu nur kiam la teksto vere sxangxigxis.
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
    if (mapoMalfermita) fermiMapon();
    else if (rezimo === "interior") eliriInternon();
  }
  if (e.code === "Space" && rezimo === "walk" && estasSurTERENO && !surKanoto) { rapidoY = 60/8; estasSurTERENO = false; }
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
  klavoj.KeyA = normX < -2/8;
  klavoj.KeyD = normX > 2/8;
  klavoj.KeyW = normY < -2/8;
  klavoj.KeyS = normY > 2/8;
  // Forkuri: puŝu la tenilon preter 3/4 de la radio (la mezo restas normala piedirado).
  const devio = Math.min(1, dist / JOYSTICK_R);
  mobSprinto = devio > 3/4;
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
      direkto -= dx * 0.0035;
      klinigxo -= dy * 0.0035;
      klinigxo = Math.max(-93/64, Math.min(93/64, klinigxo));
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
  if (rezimo === "walk" && estasSurTERENO && !surKanoto) {
    rapidoY = 60/8;
    estasSurTERENO = false;
  }
});

// ⟪ Retikula kontrolo 📃 ⟫
function gxisdatigiRetikulon() {
  retikulo.classList.toggle("montri", rezimo === "orbit");
}

// ⟪ Konstruajxa karto 📃 ⟫
function montriKarton(spec: KonstruSpec, bt: { labelKey: string; chip: string; flavorKey: string; wall: number; frame: number }) {
  elektitaSpec = spec;
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

// ⟪ Interna vido 📃 ⟫
function eniriKonstruajxon(spec: KonstruSpec, bt: { labelKey: string; flavorKey: string }) {
  sxtupaTurno = null;
  // Request pointer lock synchronously while user gesture is still active
  if (document.pointerLockElement !== kanvaso) kanvaso.requestPointerLock();
  if (cxuAŭdio()) sfx.door();
  pulsiEfikon();
  montriSargxon(0o1500, () => {
    antauxaRezimo = rezimo as "orbit" | "walk";
    rezimo = "interior";
    elektitaSpec = spec;
    const enirPunkto = eniriInternon(internaSistemo, spec, dioritaMaterialo, andezitaMaterialo, oraMaterialo, eniraMaterialo, sceno);
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
  });
}
function eliriInternon() {
  sxtupaTurno = null;
  eliriElInterno(internaSistemo, sceno);
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
        const pordX = speco.x + Math.sin(rot) * (speco.d / 2 + 12/8);
        const pordZ = speco.z + Math.cos(rot) * (speco.d / 2 + 12/8);
        ludantaPozicio.set(pordX, alteco(pordX, pordZ), pordZ);
        fotilo.position.set(pordX, alteco(pordX, pordZ) + 53/32, pordZ);
        direkto = rot;
      } else {
        // Set up walking state from current camera position (near building door)
        direkto = fotilo.rotation.y;
        ludantaPozicio.set(fotilo.position.x, alteco(fotilo.position.x, fotilo.position.z), fotilo.position.z);
        fotilo.position.y = ludantaPozicio.y + 53/32;
      }
      estasSurTERENO = true;
    } else {
      regiloj.enabled = true;
      if (speco) {
        if (speco.type === "stacioxipo") {
          // En orbito: movu la fotilon malsupren al la stacio (ne restu ĉe la sxipo).
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
  if (surKanoto) { surKanoto = null; ludantaPozicio.set(fotilo.position.x, 109/64, fotilo.position.z); }
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
    const card = document.createElement("div");
    card.className = "vestaKardo aih";
    const kanvasa = kreiVestanAntauxrigardon(o);
    card.appendChild(kanvasa);
    const name = document.createElement("div");
    name.className = "vn"; name.textContent = traduki(o.name);
    card.appendChild(name);
    card.addEventListener("click", () => {
      supermeta.classList.remove("montri");
      montriTost(traduki(o.name));
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
    ludantaPozicio.set(exit.x, 109/64, exit.z);
    surKanoto = null;
    promptoElemento.classList.remove("montri");
    montriTost(traduki("eliri"));
    return;
  }
  // En orbita reximo E movas la fotilon vertikale, do la pordo/kanuo
  // interago validas nur dum promenado (ne kun malnovaj statoj).
  if (plejProksimaPordo && rezimo === "walk") {
    const bt = TIPARO[plejProksimaPordo.type] || TIPARO.domo;
    eniriKonstruajxon(plejProksimaPordo, bt);
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
  const bona = (x: number, z: number) => !cxuEnAkvo(x, z, riveroZ, RIVERA_DUONLARĜO) && !enDoko(x, z, 3/8);
  let exitX = c.x + fortoX * 6, exitZ = c.z + fortoZ * 6;
  if (!bona(exitX, exitZ)) {
    // Serĉu sekan, ne-dokan punkton — ĉe kreskantaj distancoj por eviti la
    // (maloftan) kazon ke ĉiuj proksimaj kandidatoj falas sur dokon.
    const anguloj = [0, Math.PI/4, -Math.PI/4, Math.PI/2, -Math.PI/2, Math.PI*3/4, -Math.PI*3/4, Math.PI];
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
    m.scale.setScalar(Math.max(0.001, 1 - t));
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
      const min = c.r + 4/8;
      if (d < min && d > 0.0001) {
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
// stari SUR la doko (supre), sed ne eniri sub gxin: nur punktoj sub la platforma
// supro (d.y) estas elpusxataj. marge = radiuso de la ento (ludanto 3/8, kanuo 5/4).
function solviDokanKolizion(x: number, z: number, y: number, marge = 3/8): { x: number; z: number } {
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
      if (Math.abs(lx) < hw && Math.abs(lz) < hd && y < d.y - 1/4) {
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
// La mapo estas dua WebGL-bildilo kun orta fotilo rigardanta rekte malsupren:
// ĝi bildigas la SAMAN scenon, do vojoj, konstruaĵoj, rivero kaj arbaro aperas
// aŭtomate. Nebulo estas malŝaltita nur dum ĉi tiuj bildigoj, kaj la ludanta
// markilo kuŝas sur aparta tavolo ( 2 ), nevidebla por la ĉefa fotilo.
let mapoMalfermita = false;
let kadraNombro = 0;
let minimapaBildilo: THREE.WebGLRenderer | null = null;
let minimapaFotilo: THREE.OrthographicCamera | null = null;
let plenaBildilo: THREE.WebGLRenderer | null = null;
let plenaFotilo: THREE.OrthographicCamera | null = null;

const RADARA_DUONO = 0o30;   // duon-larĝo de la radara mapo ( mondaj unuoj ) — pli proksima ol antaŭe, por montri la tujan ĉirkaŭaĵon
const PLENA_DUONO = 0o214;   // duon-larĝo de la plena mapo ( la tuta valo )
const MINA_DUONO = 0o10;     // plej proksima zomo de la plena mapo
const MAXA_DUONO = 0o500;    // plej malproksima zomo de la plena mapo
const MAPA_ALTECO = 0o130;   // fotila alto super la tero
let plenaDuono = PLENA_DUONO; // nuna duon-larĝo ( zomo ) de la plena mapo
let mapaPanX = 0;            // tirado: horizontala forpreno de la sekv-punkto
let mapaPanZ = 0;            // tirado: vertikala forpreno de la sekv-punkto

// La ludanta markilo: ora sago ( direkto ) sur disko. Tavolo 2 = nur mapaj fotiloj.
const mapoMarkilo = new THREE.Group();
{
  const sago = new THREE.Mesh(new THREE.ConeGeometry(7/8, 14/8, 3), oraMaterialo);
  sago.geometry.rotateX(-Math.PI / 2); // kuŝas plate kun la pinto al -z
  sago.position.y = 3/8;
  const disko = new THREE.Mesh(new THREE.CircleGeometry(5/8, 0o24), oraMaterialo);
  disko.rotation.x = -Math.PI / 2;
  mapoMarkilo.add(sago, disko);
  mapoMarkilo.traverse(o => o.layers.set(2));
}
sceno.add(mapoMarkilo);

function kreiMapanSistemon(canvas: HTMLCanvasElement, duono: number): { bildilo: THREE.WebGLRenderer; fotilo: THREE.OrthographicCamera } {
  const bildilo = new THREE.WebGLRenderer({ canvas, antialias: false });
  bildilo.setPixelRatio(1);
  bildilo.setSize(canvas.width, canvas.height, false);
  bildilo.setClearColor(0x0a1814, 1);
  // Samaj koloro-agordoj kiel la ĉefa bildilo: sen ili la mapo uzus linian
  // kolorospacon kaj neniun ton-mapiĝon, do la vojoj aperus malklaraj/malhelaj.
  bildilo.outputColorSpace = THREE.SRGBColorSpace;
  bildilo.toneMapping = THREE.ACESFilmicToneMapping;
  bildilo.toneMappingExposure = 1.06;
  bildilo.shadowMap.enabled = false;
  const fotilo = new THREE.OrthographicCamera(-duono, duono, duono, -duono, 1, 0o240);
  fotilo.up.set(0, 0, 1); // mapo-supro = nordo ( +z )
  fotilo.layers.enable(2);
  return { bildilo, fotilo };
}

// Bildigu la scenon de supre; la supro de la mapo estas ĉiam nordo.
function bildigiMapon(bildilo: THREE.WebGLRenderer, fotilo: THREE.OrthographicCamera, cx: number, cz: number): void {
  const f = sceno.fog;
  sceno.fog = null;
  fotilo.position.set(cx, MAPA_ALTECO, cz);
  fotilo.lookAt(cx, 0, cz);
  bildilo.render(sceno, fotilo);
  sceno.fog = f;
}

// La plena mapo estas plenekrana, do la orta fotilo sekvu la kanvasan grandecon
// ( sen fiksaj dimensioj ) kaj la nunan zomon ĉiukadre.
function agordiPlenanFotilon(): void {
  if (!plenaBildilo || !plenaFotilo) return;
  const kanvasa = plenaBildilo.domElement;
  const w = kanvasa.clientWidth || innerWidth;
  const h = kanvasa.clientHeight || innerHeight;
  if (kanvasa.width !== w || kanvasa.height !== h) {
    kanvasa.width = w;
    kanvasa.height = h;
    plenaBildilo.setSize(w, h, false);
  }
  const aspekto = w / h;
  plenaFotilo.left = -plenaDuono * aspekto;
  plenaFotilo.right = plenaDuono * aspekto;
  plenaFotilo.top = plenaDuono;
  plenaFotilo.bottom = -plenaDuono;
  plenaFotilo.updateProjectionMatrix();
}

// La kompaso malfermas la plenan vidon: plenekrana kanvaso rekte en #supermeta.
function malfermiMapon(): void {
  if (mapoMalfermita) return;
  if (!plenaBildilo) {
    const kanvasa = document.createElement("canvas");
    kanvasa.id = "plenaKanvaso";
    // Plenekrana: la CSS plenigas la tutan #supermeta ( inset:0 ); la bildilo
    // kaj la orta fotilo adaptiĝas al la ekrana grandeco/proporcio ĉiukadre,
    // do neniu fiksa grandeco necesas kaj ĝi funkcias ankaŭ sur poŝtelefono.
    kanvasa.width = innerWidth;
    kanvasa.height = innerHeight;
    try {
      const plena = kreiMapanSistemon(kanvasa, PLENA_DUONO);
      plenaBildilo = plena.bildilo;
      plenaFotilo = plena.fotilo;
    } catch (e) {
      console.warn("Plena mapo ne havebla:", e);
      return;
    }
    // Zomo: rado ( labortablo ) kaj pinĉo ( tuŝo ). La duon-larĝo de la orta
    // fotilo ŝanĝiĝas; la ludanta markilo restas centrita dum la zomo.
    kanvasa.addEventListener("wheel", (e) => {
      e.preventDefault();
      // Normaligu la radan unuon: liniaj deltoj ( iuj kusenetoj ) ≈ 16 pikseloj.
      const delt = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      plenaDuono = Math.max(MINA_DUONO, Math.min(MAXA_DUONO, plenaDuono * Math.exp(delt * 0.001)));
    }, { passive: false });
    // Pinĉa zomo: zorgu ankaŭ se tria fingro aliĝas aŭ forlasas meze. Tiri ( unu
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
    // Pikseloj → mondaj unuoj: la mapo estas nedistorĉita ( samaj skvamoj en ambaŭ
    // aksoj ), do unu konverta faktoro sufiĉas. Limigu la tiradon al la maksimuma
    // zomo, por ke la mapo ne perdiĝu tute.
    const tiriPans = (dx: number, dy: number) => {
      const pp = (2 * plenaDuono) / (kanvasa.clientHeight || innerHeight);
      mapaPanX = Math.max(-MAXA_DUONO, Math.min(MAXA_DUONO, mapaPanX + dx * pp));
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
  supermeta.appendChild(plenaBildilo.domElement);
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
  plenaBildilo?.domElement.remove();
}
kompaso.addEventListener("click", malfermiMapon);
kompaso.addEventListener("keydown", (e) => {
  if (e.code === "Enter" || e.code === "Space") { e.preventDefault(); malfermiMapon(); }
});
// Fermo: la ekzistanta ✕ kaj la skrim-klako jam forigas .montri; jen nia stato.
supermeta.addEventListener("click", (e) => {
  if (mapoMalfermita && (e.target === supermeta || (e.target as HTMLElement).id === "supermetaFermi")) fermiMapon();
});

// La radara mapo ekde lanĉo ( se WebGL permesas duan kuntekston ).
try {
  miniKanvaso.width = miniKanvaso.height = 128;
  const mini = kreiMapanSistemon(miniKanvaso, RADARA_DUONO);
  minimapaBildilo = mini.bildilo;
  minimapaFotilo = mini.fotilo;
} catch (e) {
  console.warn("Radara mapo ne havebla:", e);
}

// ⟪ Animacio 📃 ⟫
const horlogxo = new THREE.Clock();
function animacii() {
  requestAnimationFrame(animacii);
  const deltaTempo = Math.min(horlogxo.getDelta(), 3/64);
  const t = horlogxo.elapsedTime;

  // Reskaligi
  const w = innerWidth, h = innerHeight;
  if (kanvaso.width !== Math.floor(w * devicePixelRatio) || kanvaso.height !== Math.floor(h * devicePixelRatio)) {
    fotilo.aspect = w / h; fotilo.updateProjectionMatrix();
    bildilo.setSize(w, h);
  }

  // Flamoj
  animaciiFlammojn(lampSistemo, t);
  // Akva animacio
  gxisdatigiAkvon(riverData, t);
  // Krasesxagxo — oscila flosado super la kosmopordo
  animaciiKrasesxagxon(xipo, t, false);

  // Promena reximo
  if (rezimo === "walk" && !surKanoto) {
    let movX = (klavoj.KeyD || klavoj.ArrowRight ? 1 : 0) - (klavoj.KeyA || klavoj.ArrowLeft ? 1 : 0);
    let movZ = (klavoj.KeyW || klavoj.ArrowUp ? 1 : 0) - (klavoj.KeyS || klavoj.ArrowDown ? 1 : 0);
    const longo = Math.hypot(movX, movZ);
    if (longo > 1) { movX /= longo; movZ /= longo; }
    const sprinto = klavoj.ShiftLeft || klavoj.ShiftRight || mobSprinto;
    const rapido = sprinto ? 84/8 : 173/32;
    const fortoX = -Math.sin(direkto), fortoZ = -Math.cos(direkto);
    const radX = Math.cos(direkto), radZ = -Math.sin(direkto);
    let novaX = ludantaPozicio.x + (fortoX * movZ + radX * movX) * rapido * deltaTempo;
    let novaZ = ludantaPozicio.z + (fortoZ * movZ + radZ * movX) * rapido * deltaTempo;
    novaX = Math.max(-0o144, Math.min(0o144, novaX));
    novaZ = Math.max(-0o200, Math.min(0o144, novaZ));

    const r = solviKolizion(novaX, novaZ);
    // Dokoj: bloku eniron SUB la platformon (sur-gxin piedirado restas libera)
    const rd = solviDokanKolizion(r.x, r.z, ludantaPozicio.y);
    ludantaPozicio.x = rd.x; ludantaPozicio.z = rd.z;
    const moving = Math.min(1, longo);

    const teraY = Math.max(alteco(ludantaPozicio.x, ludantaPozicio.z), dokaSuproY(ludantaPozicio.x, ludantaPozicio.z));
    const enAkvo = cxuEnAkvo(ludantaPozicio.x, ludantaPozicio.z, riveroZ, RIVERA_DUONLARĜO);
    const akvoY = enAkvo ? riverData.waterSurfaceY(ludantaPozicio.x, ludantaPozicio.z) : -999;
    // Nur flosu kie la tero vere estas sub la akvosurfaco — la sekaj bordo-strioj
    // ene de la (pli larĝa) akvo-zono restas piedireblaj anstataŭ ŝvebi.
    const superAkvo = enAkvo && ludantaPozicio.y < akvoY + 6/8 && teraY < akvoY;

    if (enAkvo && superAkvo) {
      const floatY = akvoY + 3/8 + Math.sin(t * 2 + ludantaPozicio.x * 0.1) * 1/16;
      ludantaPozicio.y += (floatY - ludantaPozicio.y) * 0.15;
      rapidoY = 0;
      estasSurTERENO = false;
    } else if (estasSurTERENO) {
      if (ludantaPozicio.y > teraY + 19/64) {
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

    oscilo += moving * rapido * deltaTempo * 12/8;
    fotilo.position.set(
      ludantaPozicio.x,
      ludantaPozicio.y + 53/32 + Math.sin(oscilo * 2) * 3/64 * moving,
      ludantaPozicio.z
    );
    fotilo.rotation.set(klinigxo, direkto, 0);

    // Paŝaj sonoj (ĉiun ~0.4 sekundojn dum movado)
    pauxzaPaŝo += moving * deltaTempo;
    if (pauxzaPaŝo > 0.4 && cxuAŭdio()) {
      sfx.step();
      pauxzaPaŝo = 0;
    }

    // Detekti pordojn kaj kanuojn
    let proksimaPordo: KonstruSpec | null = null;
    let proksimaPordoDist = 3;
    for (const s of konstruSpecoj) {
      if (s.x === 0 && s.z === 0) continue;
      const difX = Math.sin(s.rot || 0), difZ = Math.cos(s.rot || 0);
      const pordoX = s.x + difX * (s.d / 2 + 12/8), pordoZ = s.z + difZ * (s.d / 2 + 12/8);
      const d = Math.hypot(ludantaPozicio.x - pordoX, ludantaPozicio.z - pordoZ);
      if (d < proksimaPordoDist) { proksimaPordoDist = d; proksimaPordo = s; }
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
    const rapido = 141/32;
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
      if (ludY >= p.y - 4/8 && ludY < p.y + p.alto) { aktivaPlanko = p; break; }
    }
    // Konverti al lokalaj konstruajxaj koordinatoj por la krampo (turnado)
    const margxeno = 3/8;
    let lokalX = (novaX - specX) * cosR + (novaZ - specZ) * sinR;
    let lokalZ = -(novaX - specX) * sinR + (novaZ - specZ) * cosR;

    // Helika ŝtuparo: piedirante ĉirkaŭ la kolono la ludanto leviĝas tra ĉiuj
    // etaĝoj (unu plena turno = unu etaĝo). La spiralo estas kontinue sekvata.
    let surHelikso = false;
    if (helikso && ludY >= heliksaAltecxo(helikso, -helikso.turnojSube) - 1/8 && ludY <= heliksaAltecxo(helikso, helikso.turnoj) + 1/8) {
      // Ĉu la ludanto estas sufiĉe proksima al etaĝa nivelo por paŝi de la
      // ŝtuparo sur la ringan plankon. Mezvoje inter etaĝoj la ŝtupara rando
      // estas barilo — oni ne falu al la suba etaĝo.
      let subaPlankoY = -Infinity;
      for (const p of plankoj) if (p.y <= ludY) subaPlankoY = Math.max(subaPlankoY, p.y);
      const jeEtago = ludY - subaPlankoY <= 4/8;
      // Ekstera krampo. Trans la ŝtuparan randon mezvoje inter etaĝoj la ludanto
      // glitas reen al la rando ( anstataŭ fali al la suba etaĝo ). Ĉe etaĝa
      // nivelo oni rajtas paŝi sur la ringan plankon.
      let dist = Math.hypot(lokalX, lokalZ);
      if (dist > helikso.rEkster && !jeEtago) {
        const nR = helikso.rEkster - 1/32;
        lokalX = (lokalX / dist) * nR;
        lokalZ = (lokalZ / dist) * nR;
        dist = nR;
      }
      if (dist >= helikso.rKol - 1/8 && dist <= helikso.rEkster) {
        surHelikso = true;
        // Radiusa krampo nur kontraŭ la kolono ( la ringa planko komenciĝas ĉe
        // rEkster ). la ekstera rando estas barilo mezvoje inter etaĝoj.
        if (dist < helikso.rKol + 1/16) {
          const nR = helikso.rKol + 1/16;
          lokalX = (lokalX / dist) * nR;
          lokalZ = (lokalZ / dist) * nR;
        }
        const ang = Math.atan2(lokalX, lokalZ);
        const frac = ((ang % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2);
        if (sxtupaTurno === null) {
          // Eniro: komencu je la plej proksima turno al la nuna alteco. Oni rajtas
          // ankaŭ malsupreniri al la sub-teraj etaĝoj ( la ŝtuparo etendiĝas suben
          // laŭ turnojSube ), do neniu krampo al 0.
          const turno0 = ludY >= 0 ? ludY / helikso.turnoAlto : ludY / helikso.turnoAltoSub;
          const malsupraLim = -helikso.turnojSube;
          sxtupaTurno = Math.max(malsupraLim, Math.min(helikso.turnoj, Math.round(turno0 - frac) + frac));
        } else {
          // Daŭra vindo: sekvu la angulon ĉirkaŭ la spiralo (supren kaj suben)
          sxtupaTurno = Math.max(-helikso.turnojSube, Math.min(helikso.turnoj, Math.round(sxtupaTurno - frac) + frac));
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
      ludantaPozicio.y += (etapy - ludantaPozicio.y) * 0.2;
      rapidoY = 0;
      if (Math.abs(ludantaPozicio.y - etapy) < 0.01) ludantaPozicio.y = etapy;
    } else {
      rapidoY -= 0o22 * deltaTempo;
      ludantaPozicio.y += rapidoY * deltaTempo;
      if (ludantaPozicio.y <= etapy) {
        ludantaPozicio.y = etapy;
        rapidoY = 0;
        estasSurTERENO = true;
      }
    }

    oscilo += moving * rapido * deltaTempo * 12/8;
    fotilo.position.set(
      ludantaPozicio.x,
      ludantaPozicio.y + 53/32 + Math.sin(oscilo * 2) * 3/64 * moving,
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
      const prefikso = proksimaManĝaĵo.key.startsWith("fok") ? traduki("actGusti") : traduki("actTrinketi");
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
    surKanoto.bazaY = akvoY(surKanoto.x);
    const riveroZ2 = riveroZ(surKanoto.x);
    const drift = surKanoto.z - riveroZ2;
    if (Math.abs(drift) > 6) {
      const puŝo = (Math.abs(drift) - 6) * 4/8;
      surKanoto.vz -= Math.sign(drift) * puŝo * deltaTempo;
    }
    surKanoto.x = Math.max(-0o170, Math.min(0o170, surKanoto.x));
    // La rivero fluas sude ( z ≈ -0o160 ), do la malnova limo ±0o120 el la
    // epoko de la malnova rivero lasus la kanuon sur la teron. limigu la
    // kanuon al la rivera zono ( ±0o14 de la rivercentro ) anstataŭe.
    surKanoto.z = riveroZ(surKanoto.x) + Math.max(-0o14, Math.min(0o14, surKanoto.z - riveroZ(surKanoto.x)));
    surKanoto.x += surKanoto.vx * deltaTempo;
    surKanoto.z += surKanoto.vz * deltaTempo;

    // Doka kolizio: la kanuo ne rajtas sub la platformojn (la fotilo restus subtera).
    const dk = solviDokanKolizion(surKanoto.x, surKanoto.z, -999, 5/4);
    surKanoto.x = dk.x; surKanoto.z = dk.z;
    // Ne lasu la kanuon en malprofunda akvo (tereno super la akva surfaco) —
    // repuŝu al la rivercentro por ke la ludanto ne restu subtera.
    const kx = surKanoto.x, kz = surKanoto.z;
    if (alteco(kx, kz) > akvoY(kx) + 1/4) {
      // Repuŝu al la rivercentro pli forte kaj haltigu la bankan drivon, por ke
      // la kanuo ne restu banita en malprofunda akvo.
      surKanoto.z += (riveroZ(kx) - kz) * Math.min(1, 0o30 * deltaTempo);
      surKanoto.vz = 0;
    }
    // Levu la kanu-bazon super la terenon: en malprofunda akvo la akva nivelo
    // (akvoY) estus SUB la planko, do la kanuo kaj la fotilo enirus la teron.
    surKanoto.bazaY = Math.max(akvoY(surKanoto.x), alteco(surKanoto.x, surKanoto.z));

    direkto = surKanoto.direkto;
    fotilo.position.set(surKanoto.x, surKanoto.bazaY + 3/32 + 17/32, surKanoto.z);
    fotilo.rotation.set(klinigxo, surKanoto.direkto, 0);
    agordiPrompton(`<span class="klavo">E</span> ` + traduki("eliriKanuo"));
    promptoElemento.classList.add("montri");
    ludantaPozicio.set(surKanoto.x, 109/64, surKanoto.z);
  }

  // Kanotaj animacioj
  for (const c of kanuoj) animaciiKanoton(c, t, c === surKanoto);
  // NPC-aj animacioj
  for (const n of npcoj) gxisdatigiNpc(n, deltaTempo, t, alteco);
  // Internaj animacioj
  gxisdatigiInternon(internaSistemo, t);

  // Nebula drivo
  for (const sp of nebuloj) {
    sp.position.x += sp.userData.rapido * deltaTempo * 4/8;
    if (sp.position.x > 0o163) sp.position.x = -0o163;
  }

  // Kompaso / minimapo — la nadlo indikas la rigardan direkton sur la norda mapo.
  const fotilaDirekto = rezimo === "walk" ? direkto : -Math.atan2(fotilo.position.x - regiloj.target.x, fotilo.position.z - regiloj.target.z);
  (nadlo as HTMLElement).style.transform = `rotate(${fotilaDirekto + Math.PI}rad)`;
  // La mapo sekvu la vidpunkton: en promeno/interno la ludanto, en orbito la
  // fotila celo — alie la radaro restus fiksita ĉe la elirloko en orbito.
  const mapX = rezimo === "orbit" ? regiloj.target.x : ludantaPozicio.x;
  const mapZ = rezimo === "orbit" ? regiloj.target.z : ludantaPozicio.z;
  const mapY = (rezimo === "orbit" ? regiloj.target.y : ludantaPozicio.y) + 1/8;
  mapoMarkilo.position.set(mapX, mapY, mapZ);
  mapoMarkilo.rotation.y = fotilaDirekto;
  // Dum la plena mapo estas malfermita, bildigu tiun; alie la radar ( ĉiun duan
  // kadron, kaj nur post la ŝarĝa ekrano — antaŭe la kompaso estas kovrita ).
  if (mapoMalfermita && plenaBildilo && plenaFotilo) {
    // La plena mapo sekvas la saman vidpunkton, kiel la radaro, plus la tiradan
    // forprenon: la ora markilo restas ĉe la ludanta mondo-pozicio ( eble ekster-
    // centro post tirado ), dum la ĉirkaŭaĵo montriĝas. La fotilo sekvas la
    // kanvasan grandecon kaj la zomon ĉiukadre.
    agordiPlenanFotilon();
    bildigiMapon(plenaBildilo, plenaFotilo, mapX + mapaPanX, mapZ + mapaPanZ);
  } else if (minimapaBildilo && minimapaFotilo && sxargxaElemento.classList.contains("finita") && (kadraNombro++ & 1) === 0) {
    bildigiMapon(minimapaBildilo, minimapaFotilo, mapX, mapZ);
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

// ⟪ Sxargxo 📃 ⟫
let sxargxaProgreso = 0;
const sxargxaIntervalo = setInterval(() => {
  sxargxaProgreso += 1/8;
  // La stango estas vertikala, do la plenigo kreskas laux la bloka akso ( malsupro → supro ).
  stangoPlenigo.style.blockSize = `${Math.min(100, sxargxaProgreso * 100)}%`;
  const novaTitolo = sxargxaProgreso > 27/32 ? traduki("sxargxaNebulo") : sxargxaProgreso > 19/32 ? traduki("sxargxaTraboj") : sxargxaProgreso > 19/64 ? traduki("sxargxaSatalo") : null;
  // Nur sxangxu la titolon kiam la teksto vere sxangxigxas, por ne detrui la vacepu-vortojn.
  if (novaTitolo !== null && sxargxaTitolo.textContent !== novaTitolo) {
    sxargxaTitolo.textContent = novaTitolo;
    if (cxuAih() && typeof vacepu === "function") vacepu("aih");
  }
  if (sxargxaProgreso >= 1) {
    clearInterval(sxargxaIntervalo);
    // La elemento restas kaŝita en la DOM-o ( .finita ), por ke montriSargxon
    // povu reuzi ĝin kiel ŝarĝan ekranon dum konstruaĵ-eniro.
    sxargxaElemento.classList.add("finita");
    gxisdatigiRetikulon();
  }
}, 0o334);

// ⟪ Ŝarĝa ekrano por konstruaĵ-eniro 📃 ⟫
// Reuzu la saman ekranon kiel la lanĉo: montru la stangon, plenigu ĝin dum
// `daŭro` ms, tiam rulu la callback kaj kaŝu.
let montriSxargxoIntervalo: ReturnType<typeof setInterval> | null = null;
let sxargxaRestorilo: ReturnType<typeof setTimeout> | null = null;
function montriSargxon(daŭro: number, callback: () => void): void {
  // Nuligu eventualan ŝarĝon/eston de antaŭa voko: malnovaj tempigiloj nek
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
      callback();
      sxargxaRestorilo = setTimeout(() => {
        sxargxaElemento.classList.add("finita");
        sxargxaRestorilo = setTimeout(() => {
          sxargxaElemento.style.transition = "";
          sxargxaRestorilo = null;
        }, 0o310);
      }, 0o310);
    }
  }, daŭro / paŝoj);
}

// ⟪ Montra-seruro por piedirado ( ekstere kaj interne ) 📃 ⟫
kanvaso.addEventListener("click", () => {
  if (rezimo === "walk" || rezimo === "interior") kanvaso.requestPointerLock();
});
document.addEventListener("mousemove", (e) => {
  if (document.pointerLockElement !== kanvaso || (rezimo !== "walk" && rezimo !== "interior")) return;
  direkto -= e.movementX * 0.0021;
  klinigxo -= e.movementY * 0.0021;
  klinigxo = Math.max(-93/64, Math.min(93/64, klinigxo));
});

// ⟪ Ekfunkciigo 📃 ⟫
animacii();
