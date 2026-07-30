// Aranis — immersive city experience (orchestrator)
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { kreiKanoton, animaciiKanoton, gxisdatigiKanotanFizikon, Kanoto } from "../assets/transporto.js";
import { VESTOJ, kreiVestanAntauxrigardon } from "../assets/vestoj.js";
import { animaciiFlammojn } from "../assets/lampoj.js";
import { gxisdatigiAkvon, cxuEnAkvo } from "../assets/akvo.js";
import { gxisdatigiNpc } from "../assets/npcoj.js";
import type { Figuro, Vesto } from "../assets/npcoj.js";
import { eniriInternon, eliriInternon as eliriElInterno, gxisdatigiInternon } from "../assets/internoj.js";
import { TIPARO, KonstruSpec, ManĝaĵItemo } from "../assets/zigurato-konstruilo.js";
import { riveroZ, akvoY, alteco } from "./tereno.js";
import { kreiScenon, ScenaSistemo } from "./scena.js";
import type { UrbaSistemo } from "./urbo.js";
import { konstruiUrbon } from "./urbo.js";
import { traduki } from "./tradukoj.js";
import { sxaltiAŭdion, cxuAŭdio, sfx, rumble, autoKomenci, registriPostAŭdio } from "../assets/sonoro.js";
import { ludi, halti, sxargiTrako, nunaTrako, cxuLudas } from "../assets/muziko/ludilo.js";

// ⟪ DOM-elementoj 📃 ⟫
const kanvaso = document.getElementById("sceno") as HTMLCanvasElement;
const kartoElemento = document.getElementById("karto")!;
const kartoNomo = document.getElementById("kartoNomo")!;
const kartoChip = document.getElementById("kartoChip")!;
const kartoStatistikoj = document.getElementById("kartoStatistikoj")!;
const kartoFlavor = document.getElementById("kartoFlavor")!;
const kartoEniri = document.getElementById("kartoEniri")!;
const promptoElemento = document.getElementById("prompto")!;
const indicoElemento = document.getElementById("sugesto")!;
const supermeta = document.getElementById("supermeta")!;
const vestaVico = document.getElementById("vestaVico")!;
const sxargxaElemento = document.getElementById("sxargxo")!;
const stangoPlenigo = document.getElementById("stangoPlenigo")!;
const sxargxaTitolo = document.getElementById("sxargxaTitolo")!;
const nadlo = document.getElementById("nadlo")!;
const titolaSkripto = document.getElementById("titolaSkripto") as HTMLImageElement;
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
const navPopFermi = document.getElementById("navPopFermi")!;
const butSonoro = document.getElementById("butSonoro")!;
const mobJoystickZono = document.getElementById("mobJoystickZono")!;
const mobJoystickBazo = document.getElementById("mobJoystickBazo")!;
const mobJoystickTenilo = document.getElementById("mobJoystickTenilo")!;
const mobButInterakti = document.getElementById("mobButInterakti")!;
const mobButSalti = document.getElementById("mobButSalti")!;
const mobButRezimo = document.getElementById("mobButRezimo")!;

// ⟪ Stirstanga stato 📃 ⟫
let joystickAktiva = false;
let joystickID = -1;
const JOYSTICK_R = 40;

// ⟪ Sonora stato 📃 ⟫
let pauxzaPaŝo = 0; // step sound cooldown counter

// ⟪ Krei scenon kaj urbon 📃 ⟫
const scena: ScenaSistemo = kreiScenon(kanvaso, titolaSkripto, sxargxaElemento);
const { bildilo, fotilo, sceno, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, aplikiRezimon } = scena;

const urbo: UrbaSistemo = konstruiUrbon(sceno, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo);
const {
  konstruSpecoj, kolizioj, selektajxoj,
  riverData, lampSistemo, nebuloj, kanuoj, npcoj, internaSistemo,
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
let plejProksimaManĝaĵo: ManĝaĵItemo | null = null;
let direkto = 0, klinigxo = -1/16;
const ludantaPozicio = new THREE.Vector3(0, 5/32, 0o44);
let rapidoY = 0, estasSurTERENO = false;
const klavoj: Record<string, boolean> = {};
let mobSprinto = false;
let oscilo = 0;
let tostaTempilo: ReturnType<typeof setTimeout> | null = null;


// ⟪ Navigada pop-up 📃 ⟫
function sxaltiNaviganPopUp() {
  navPopUp.classList.toggle("montri");
}
function fermiNaviganPopUp() {
  navPopUp.classList.remove("montri");
}
navButono.addEventListener("click", sxaltiNaviganPopUp);
navPopFermi.addEventListener("click", fermiNaviganPopUp);
navPopUp.addEventListener("click", (e) => {
  if (e.target === navPopUp) fermiNaviganPopUp();
});

// ⟪ Aŭtomata komenco je unua tuŝo/klako 📃 ⟫
function gxisdatigiSonoranButonon(aktiva: boolean) {
  butSonoro.classList.toggle("aktiva", aktiva);
  butSonoro.textContent = aktiva ? "♫" : "♬";
  gxisdatigiTrakoButonojn();
}
registriPostAŭdio(gxisdatigiSonoranButonon);
document.addEventListener("pointerdown", () => autoKomenci(), { once: true });

// ⟪ Sonora butono 📃 ⟫
if (butSonoro) {
  butSonoro.addEventListener("click", () => {
    const aktiva = sxaltiAŭdion();
    gxisdatigiSonoranButonon(aktiva);
    fermiNaviganPopUp();
  });
}

// ⟪ Traka selektilo 📃 ⟫
function gxisdatigiTrakoButonojn() {
  const nuna = nunaTrako();
  document.querySelectorAll(".trakaBut").forEach(b => {
    const i = parseInt((b as HTMLElement).dataset.trako || "0");
    b.classList.toggle("aktiva", i === nuna && cxuLudas());
  });
}
document.querySelectorAll(".trakaBut").forEach(b => {
  b.addEventListener("click", () => {
    const i = parseInt((b as HTMLElement).dataset.trako || "0");
    sxargiTrako(i);
    if (cxuLudas()) {
      halti();
      ludi();
    }
    gxisdatigiTrakoButonojn();
  });
});

// ⟪ Krepuska reĝimo 📃 ⟫
let krepuskaValoro = 0;
const butKrepusko = document.getElementById("butKrepusko")!;
const duskRegilo = document.getElementById("duskRegilo") as HTMLInputElement;
aplikiRezimon(0);
butKrepusko.addEventListener("click", () => {
  if (krepuskaValoro > 0.5) {
    krepuskaValoro = 0;
    duskRegilo.value = "0";
  } else {
    krepuskaValoro = 1;
    duskRegilo.value = "1";
  }
  butKrepusko.textContent = krepuskaValoro > 0.5 ? "☀" : "☽";
  aplikiRezimon(krepuskaValoro);
  fermiNaviganPopUp();
});
duskRegilo.addEventListener("input", () => {
  krepuskaValoro = parseFloat(duskRegilo.value);
  butKrepusko.textContent = krepuskaValoro > 0.5 ? "☀" : "☽";
  aplikiRezimon(krepuskaValoro);
});

// ⟪ Tosta sistemo 📃 ⟫
function montriTost(mesagxo: string, daŭro = 0o4230) {
  if (tostaTempilo) clearTimeout(tostaTempilo);
  tosto.innerHTML = mesagxo;
  tosto.classList.add("montri");
  tostaTempilo = setTimeout(() => tosto.classList.remove("montri"), daŭro);
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
  if (e.code === "Escape" && rezimo === "interior") eliriInternon();
  if (e.code === "Space" && rezimo === "walk" && estasSurTERENO && !surKanoto) { rapidoY = 60/8; estasSurTERENO = false; }
  indicoElemento.classList.add("kasxi");
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
  klavoj.KeyA = normX < -0.25;
  klavoj.KeyD = normX > 0.25;
  klavoj.KeyW = normY < -0.25;
  klavoj.KeyS = normY > 0.25;
}
function resetiJoystick() {
  klavoj.KeyA = false; klavoj.KeyD = false;
  klavoj.KeyW = false; klavoj.KeyS = false;
  mobJoystickTenilo.style.transform = "translate(0px, 0px)";
  mobJoystickBazo.classList.remove("aktiva");
  mobJoystickTenilo.classList.remove("aktiva");
}

mobJoystickZono.addEventListener("touchstart", (e) => {
  if (joystickAktiva) return;
  if (rezimo !== "walk" && rezimo !== "interior") return;
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
  if (el && (el === mobJoystickZono || el === mobJoystickBazo || mobJoystickZono.contains(el) || el.classList.contains("mobBut") || el.closest("#mobButaroj"))) {
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
mobButRezimo.addEventListener("click", (e) => {
  e.stopPropagation();
  sxaltiRezimon();
});
const mobButKuri = document.getElementById("mobButKuri")!;
mobButKuri.addEventListener("touchstart", (e) => {
  e.preventDefault();
  mobSprinto = true;
  mobButKuri.classList.add("aktiva");
});
mobButKuri.addEventListener("touchend", (e) => {
  e.preventDefault();
  mobSprinto = false;
  mobButKuri.classList.remove("aktiva");
});
mobButKuri.addEventListener("touchcancel", () => {
  mobSprinto = false;
  mobButKuri.classList.remove("aktiva");
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
  // Request pointer lock synchronously while user gesture is still active
  if (document.pointerLockElement !== kanvaso) kanvaso.requestPointerLock();
  if (cxuAŭdio()) sfx.door();
  pulsiEfikon();
  fariBalailon(() => {
    antauxaRezimo = rezimo as "orbit" | "walk";
    rezimo = "interior";
    elektitaSpec = spec;
    const enirPunkto = eniriInternon(internaSistemo, spec, dioritaMaterialo, andezitaMaterialo, oraMaterialo, eniraMaterialo, sceno);
    const specX = spec.x, specZ = spec.z, specH0 = spec.h0 || 0;
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
    montriTost(traduki("p4") + " " + traduki(spec.name));
    gxisdatigiRetikulon();
  });
}
function eliriInternon() {
  eliriElInterno(internaSistemo, sceno);
  if (cxuAŭdio()) sfx.door();
  pulsiEfikon();
  fariBalailon(() => {
    // Restore previous mode (walk or orbit)
    const estasWalk = antauxaRezimo === "walk";
    rezimo = antauxaRezimo || "orbit";
    antauxaRezimo = null;
    if (estasWalk) {
      regiloj.enabled = false;
      // Set up walking state from current camera position (near building door)
      direkto = fotilo.rotation.y;
      ludantaPozicio.set(fotilo.position.x, alteco(fotilo.position.x, fotilo.position.z), fotilo.position.z);
      fotilo.position.y = ludantaPozicio.y + 53/32;
      estasSurTERENO = true;
    } else {
      regiloj.enabled = true;
      if (elektitaSpec) {
        regiloj.target.set(elektitaSpec.x, elektitaSpec.h0! + 0o14, elektitaSpec.z);
        regiloj.update();
      }
    }
    (document.getElementById("butPromeni")!).classList.toggle("aktiva", estasWalk);
    gxisdatigiRetikulon();
  });
}

// ⟪ Rezima sxaltilo 📃 ⟫
function sxaltiRezimon() {
  if (rezimo === "interior") { eliriInternon(); return; }
  if (surKanoto) { surKanoto = null; ludantaPozicio.set(fotilo.position.x, 109/64, fotilo.position.z); }
  if (cxuAŭdio()) sfx.chime();
  rezimo = rezimo === "orbit" ? "walk" : "orbit";
  (document.getElementById("butPromeni")!).classList.toggle("aktiva", rezimo === "walk");
  gxisdatigiRetikulon();
  if (rezimo === "walk") {
    regiloj.enabled = false;
    direkto = Math.atan2(fotilo.position.x - regiloj.target.x, fotilo.position.z - regiloj.target.z);
    ludantaPozicio.set(fotilo.position.x, alteco(fotilo.position.x, fotilo.position.z), fotilo.position.z);
    estasSurTERENO = true;
  } else {
    regiloj.enabled = true;
    regiloj.target.copy(ludantaPozicio).add(new THREE.Vector3(0, 4, 0));
    fotilo.position.copy(ludantaPozicio).add(new THREE.Vector3(0, 4, 0o14));
  }
}
document.getElementById("butPromeni")!.addEventListener("click", sxaltiRezimon);
document.getElementById("butOrbiti")!.addEventListener("click", () => {
  if (rezimo === "walk") sxaltiRezimon();
  if (elektitaSpec) {
    regiloj.target.set(elektitaSpec.x, elektitaSpec.h0! + 0o14, elektitaSpec.z);
    regiloj.update();
  }
});

// ⟪ Vestaro 📃 ⟫
document.getElementById("butVesti")!.addEventListener("click", () => {
  vestaVico.innerHTML = "";
  VESTOJ.forEach((o, i) => {
    const card = document.createElement("div");
    card.className = "vestaKardo";
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
});
supermeta.addEventListener("click", (e) => {
  if (e.target === supermeta) supermeta.classList.remove("montri");
});
document.getElementById("supermetaFermi")!.addEventListener("click", () => {
  supermeta.classList.remove("montri");
});

// ⟪ Helpo 📃 ⟫
document.getElementById("butHelpi")!.addEventListener("click", () => {
  document.getElementById("supermetaTitolo")!.textContent = traduki("pT");
  document.getElementById("supermetaSupra")!.textContent = traduki("pU");
  vestaVico.innerHTML = `<div class="statistikoj helpa-listo">
    <b>Orbit</b> · ${traduki("pL")}<br>
    <b>Walk</b> · ${traduki("pM")}<br>
    <b>WASD</b> · ${traduki("pN")}<br>
    <b>E</b> · ${traduki("pO")}<br>
    <b>M</b> · ${traduki("pP")}<br>
    <b>Escape</b> · ${traduki("pQ")}<br>
    <b>Click spires</b> · ${traduki("pR")}<br>
    <b>WARD</b> · ${traduki("pS")}
  </div>`;
  supermeta.classList.add("montri");
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
    montriTost(traduki("pY"));
    return;
  }
  if (plejProksimaPordo) {
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
    montriTost(traduki("pX"));
    if (cxuAŭdio()) sfx.splash();
  }
}
function eliriKanoton(c: Kanoto): { x: number; z: number } {
  const fortoX = -Math.sin(c.direkto), fortoZ = -Math.cos(c.direkto);
  let exitX = c.x + fortoX * 6, exitZ = c.z + fortoZ * 6;
  if (cxuEnAkvo(exitX, exitZ, riveroZ, 7)) {
    const anguloj = [Math.PI/4, -Math.PI/4, Math.PI/2, -Math.PI/2, Math.PI*3/4, -Math.PI*3/4, Math.PI];
    for (const a of anguloj) {
      const ax = c.x + Math.sin(c.direkto + a) * 6;
      const az = c.z + Math.cos(c.direkto + a) * 6;
      if (!cxuEnAkvo(ax, az, riveroZ, 7)) { exitX = ax; exitZ = az; break; }
    }
  }
  return { x: exitX, z: exitZ };
}

function konsumi(item: ManĝaĵItemo) {
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
    ludantaPozicio.x = r.x; ludantaPozicio.z = r.z;
    const moving = Math.min(1, longo);

    const teraY = alteco(ludantaPozicio.x, ludantaPozicio.z);
    const enAkvo = cxuEnAkvo(ludantaPozicio.x, ludantaPozicio.z, riveroZ, 7);
    const akvoY = enAkvo ? riverData.waterSurfaceY(ludantaPozicio.x, ludantaPozicio.z) : -999;
    const superAkvo = enAkvo && ludantaPozicio.y < akvoY + 6/8;

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
      promptoElemento.innerHTML = `<span class="klavo">E</span> ` + traduki("p4") + ` ` + traduki(plejProksimaPordo.name);
      promptoElemento.classList.add("montri");
    } else if (proksimaKanuo && !surKanoto) {
      promptoElemento.innerHTML = `<span class="klavo">E</span> ` + traduki("pZ");
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

    const specX = elektitaSpec.x, specZ = elektitaSpec.z, specH0 = elektitaSpec.h0 || 0;
    const rot = elektitaSpec.rot || 0;
    const cosR = Math.cos(rot), sinR = Math.sin(rot);
    const plankoj = internaSistemo.plankoj;
    const ludY = ludantaPozicio.y - specH0;
    let aktivaPlanko = plankoj[0];
    let etapy = specH0;
    for (const p of plankoj) {
      if (ludY >= p.y - 0.5 && ludY < p.y + p.alto) { aktivaPlanko = p; break; }
    }
    if (aktivaPlanko) {
      // Convert to local building coordinates for clamping (handles rotation)
      const margxeno = 3/8;
      let lokalX = (novaX - specX) * cosR + (novaZ - specZ) * sinR;
      let lokalZ = -(novaX - specX) * sinR + (novaZ - specZ) * cosR;
      lokalX = Math.max(-aktivaPlanko.hw + margxeno, Math.min(aktivaPlanko.hw - margxeno, lokalX));
      lokalZ = Math.max(-aktivaPlanko.hd + margxeno, Math.min(aktivaPlanko.hd - margxeno, lokalZ));
      novaX = specX + cosR * lokalX - sinR * lokalZ;
      novaZ = specZ + sinR * lokalX + cosR * lokalZ;

      const cxeSxtuparo = Math.abs(lokalZ) < 0.8 && Math.abs(lokalX) < 2.5;
      let nunaEtagxIndekso = -1;
      for (let i = 0; i < plankoj.length; i++) {
        if (plankoj[i] === aktivaPlanko) { nunaEtagxIndekso = i; break; }
      }
      if (cxeSxtuparo && movZ > 3/8 && nunaEtagxIndekso < plankoj.length - 1) {
        const sekva = plankoj[nunaEtagxIndekso + 1];
        etapy = specH0 + sekva.y;
      } else if (cxeSxtuparo && movZ < -3/8 && nunaEtagxIndekso > 0) {
        const antauxa = plankoj[nunaEtagxIndekso - 1];
        etapy = specH0 + antauxa.y;
      } else {
        etapy = specH0 + aktivaPlanko.y;
      }
    } else {
      etapy = specH0;
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
    let proksimaManĝaĵo: ManĝaĵItemo | null = null;
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
      promptoElemento.innerHTML = `<span class="klavo">E</span> ${prefikso} ${traduki("manĝ" + proksimaManĝaĵo.f.key.charAt(0).toUpperCase() + proksimaManĝaĵo.f.key.slice(1))}`;
      promptoElemento.classList.add("montri");
    } else {
      promptoElemento.innerHTML = `<span class="klavo">E</span> ` + traduki("actEliri");
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
      const puŝo = (Math.abs(drift) - 6) * 0.5;
      surKanoto.vz -= Math.sign(drift) * puŝo * deltaTempo;
    }
    surKanoto.x = Math.max(-0o170, Math.min(0o170, surKanoto.x));
    surKanoto.z = Math.max(-0o120, Math.min(0o120, surKanoto.z));
    surKanoto.x += surKanoto.vx * deltaTempo;
    surKanoto.z += surKanoto.vz * deltaTempo;

    direkto = surKanoto.direkto;
    fotilo.position.set(surKanoto.x, surKanoto.bazaY + 3/32 + 17/32, surKanoto.z);
    fotilo.rotation.set(klinigxo, surKanoto.direkto, 0);
    promptoElemento.innerHTML = `<span class="klavo">E</span> ` + traduki("pW");
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

  // Kompaso
  const fotilaDirekto = rezimo === "walk" ? direkto : -Math.atan2(fotilo.position.x - regiloj.target.x, fotilo.position.z - regiloj.target.z);
  (nadlo as HTMLElement).style.transform = `rotate(${fotilaDirekto + Math.PI}rad)`;

  // WASD orbita movado
  if (rezimo === "orbit") {
    let panX = (klavoj.KeyD ? 1 : 0) - (klavoj.KeyA ? 1 : 0);
    let panZ = (klavoj.KeyS ? 1 : 0) - (klavoj.KeyW ? 1 : 0);
    if (panX || panZ) {
      const fotilaDir = new THREE.Vector3();
      fotilo.getWorldDirection(fotilaDir);
      fotilaDir.y = 0; fotilaDir.normalize();
      const side = new THREE.Vector3().crossVectors(fotilaDir, new THREE.Vector3(0, 1, 0)).normalize();
      const rapido = 0o50 * deltaTempo;
      const offset = new THREE.Vector3()
        .addScaledVector(side, panX * rapido)
        .addScaledVector(fotilaDir, -panZ * rapido);
      regiloj.target.add(offset);
      fotilo.position.add(offset);
    }
    regiloj.update();
  }

  bildilo.render(sceno, fotilo);
}

// ⟪ Loading 📃 ⟫
let sxargxaProgreso = 0;
const sxargxaIntervalo = setInterval(() => {
  sxargxaProgreso += 1/8;
  stangoPlenigo.style.width = `${Math.min(100, sxargxaProgreso * 100)}%`;
  if (sxargxaProgreso > 19/64) sxargxaTitolo.textContent = traduki("pH");
  if (sxargxaProgreso > 19/32) sxargxaTitolo.textContent = traduki("pI");
  if (sxargxaProgreso > 27/32) sxargxaTitolo.textContent = traduki("pJ");
  if (sxargxaProgreso >= 1) {
    clearInterval(sxargxaIntervalo);
    sxargxaElemento.classList.add("finita");
    setTimeout(() => sxargxaElemento.remove(), 0o1604);
    gxisdatigiRetikulon();
  }
}, 0o334);
setTimeout(() => indicoElemento.classList.add("kasxi"), 14000);

// ⟪ Montra-lock por piedirado ( ekstere kaj interne ) 📃 ⟫
kanvaso.addEventListener("click", () => {
  if (rezimo === "walk" || rezimo === "interior") kanvaso.requestPointerLock();
});
document.addEventListener("mousemove", (e) => {
  if (document.pointerLockElement !== kanvaso || (rezimo !== "walk" && rezimo !== "interior")) return;
  direkto -= e.movementX * 0.0021;
  klinigxo -= e.movementY * 0.0021;
  klinigxo = Math.max(-93/64, Math.min(93/64, klinigxo));
});

// ⟪ Start 📃 ⟫
animacii();
