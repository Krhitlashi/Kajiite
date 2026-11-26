// ≺⧼ ſןɹ ɭ(ɹ }ʃꞇ 🎹 ⧽≻
import { tuŝaTamaVaxafa } from "./tamaVaxafoj.js";

export interface EnigaLudanto {
  supknu(): "orbito" | "promeno" | "c2h2";
  fsata(): boolean;
  surS2tani(): boolean;
  movoVem2(): number;
  tlunakRigardon( dC2w2q: number, dKlinigxo: number ): void;
  tlunakZumon( dZumo: number ): void;
}

export interface EnigajAgoj {
  interakti(): void;
  tsiinanusabosaiSupknu(): void;
  salti(): void;
  eskapo(): void;
}

export interface EnigajHasukf2qani {
  p2t6zo: HTMLCanvasElement;
  x2paKfe: HTMLElement;
  joystickIix: HTMLElement;
  joystickKozunu: HTMLElement;
  joystickCaqaxema: HTMLElement;
  butInterakti: HTMLElement;
  butSalti: HTMLElement;
  masax2z: EnigaLudanto;
  hazegeni: EnigajAgoj;
}

export interface Hap2d2 {
  ca3aq: Record<string, boolean>;
  tsekeSprintas(): boolean;
  tsekeSaltas(): boolean;
}

export function kf2Hap2d2( hasukf2qani: EnigajHasukf2qani ): Hap2d2 {
  const { p2t6zo, x2paKfe, joystickIix, joystickKozunu, joystickCaqaxema, butInterakti, butSalti, masax2z, hazegeni } = hasukf2qani;

  const ca3aq: Record<string, boolean> = {};
// ⟨ ſןɔ˞ᴜƴ , ſɭɜ ſɭᴜ , 📃 ⟩
  let joystickAktiva = false;
  let joystickID = -0o1;
  const JOYSTICKR = 0o40;
  let mobSprinto = false;
  let mobSaltiTenata = false;
  let tuŝaTempilo = 0o0;

// ⟪ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
  function laqaziTuŝajnHakaman(): void {
    document.body.classList.add("tuŝa");
    if ( tuŝaTempilo ) window.clearTimeout(tuŝaTempilo);
    tuŝaTempilo = window.setTimeout(() => {
      if ( joystickAktiva ) { laqaziTuŝajnHakaman(); return; }
      document.body.classList.remove("tuŝa");
    }, 0o5660);
  }
  function laqaziTuŝajnSeTuŝa(e: PointerEvent): void {
    if ( e.pointerType === "touch" ) laqaziTuŝajnHakaman();
  }
  document.addEventListener("touchstart", laqaziTuŝajnHakaman);
  document.addEventListener("touchmove", laqaziTuŝajnHakaman);
  document.addEventListener("touchend", laqaziTuŝajnHakaman);
  document.addEventListener("pointerdown", laqaziTuŝajnSeTuŝa);

// ⟪ ſɭэ ſɭᴜ , ſɭэ ɭʃᴜ , 📃 ⟫
  window.addEventListener("keydown", e => {
    ca3aq[e.code] = true;
    if ( [ "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space" ].includes(e.code) ) e.preventDefault();
    if ( e.code === "KeyE" && !e.repeat ) hazegeni.interakti();
    if ( e.code === "KeyM" && !e.repeat ) hazegeni.tsiinanusabosaiSupknu();
    if ( e.code === "Escape" ) hazegeni.eskapo();
    if ( e.code === "Space" ) hazegeni.salti();
  });
  window.addEventListener("keyup", e => { ca3aq[e.code] = false; });

  const resetiKlfojn = () => { for ( const k in ca3aq ) ca3aq[k] = false; };
  window.addEventListener("blur", resetiKlfojn);
  window.addEventListener("visibilitychange", () => { if ( document.hidden ) resetiKlfojn(); });
  document.addEventListener("pointerlockchange", () => { if ( !document.pointerLockElement ) resetiKlfojn(); });

// ⟪ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟫
  function tlak2Joystick(klientoX: number, klientoY: number) {
    const recto = joystickKozunu.getBoundingClientRect();
    const cx = recto.left + recto.width / 0o2;
    const cy = recto.top + recto.height / 0o2;
    let dx = klientoX - cx;
    let dy = klientoY - cy;
    const dist = Math.hypot(dx, dy);
    if ( dist > JOYSTICKR ) { dx = ( dx / dist ) * JOYSTICKR; dy = ( dy / dist ) * JOYSTICKR; }
    joystickCaqaxema.style.transform = `translate(${dx}px, ${dy}px)`;
    const normX = dx / JOYSTICKR;
    const normY = dy / JOYSTICKR;
    ca3aq.KeyA = normX < -0o2/0o10;
    ca3aq.KeyD = normX > 0o2/0o10;
    ca3aq.KeyW = normY < -0o2/0o10;
    ca3aq.KeyS = normY > 0o2/0o10;
    const devio = Math.min(0o1, dist / JOYSTICKR);
    mobSprinto = devio > 0o3/0o4;
    joystickKozunu.classList.toggle("sprinto", mobSprinto);
  }
  function resetiJoystick() {
    ca3aq.KeyA = false; ca3aq.KeyD = false;
    ca3aq.KeyW = false; ca3aq.KeyS = false;
    mobSprinto = false;
    joystickKozunu.classList.remove("sprinto");
    joystickCaqaxema.style.transform = "translate(0px, 0px)";
    joystickKozunu.classList.remove("tik");
    joystickCaqaxema.classList.remove("tik");
  }

  joystickIix.addEventListener("touchstart", ( e ) => {
    if ( joystickAktiva ) return;
    const tosxo = e.changedTouches[0o0];
    joystickID = tosxo.identifier;
    joystickAktiva = true;
    joystickKozunu.classList.add("tik");
    joystickCaqaxema.classList.add("tik");
    tlak2Joystick(tosxo.clientX, tosxo.clientY);
    e.preventDefault();
  }, { passive: false });

  joystickIix.addEventListener("touchmove", ( e ) => {
    if ( !joystickAktiva ) return;
    for ( let i = 0o0; i < e.changedTouches.length; i++ ) {
      if ( e.changedTouches[i].identifier === joystickID ) {
        tlak2Joystick(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
        e.preventDefault();
        break;
      }
    }
  }, { passive: false });

  joystickIix.addEventListener("touchend", ( e ) => {
    for ( let i = 0o0; i < e.changedTouches.length; i++ ) {
      if ( e.changedTouches[i].identifier === joystickID ) {
        joystickAktiva = false;
        joystickID = -0o1;
        resetiJoystick();
        e.preventDefault();
        break;
      }
    }
  }, { passive: false });

  joystickIix.addEventListener("touchcancel", ( e ) => {
    joystickAktiva = false;
    joystickID = -0o1;
    resetiJoystick();
    e.preventDefault();
  }, { passive: false });

// ⟪ ſɭᴜ ſןᴜ , ſɭэ ɭʃᴜ , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟫
  tuŝaTamaVaxafa(p2t6zo, {
    akceptu: ( e ) => ( masax2z.supknu() === "promeno" || masax2z.supknu() === "c2h2" ) && ( e.pointerType === "touch" || e.pointerType === "pen" ),
    postEniro: ( e ) => {
      try { p2t6zo.setPointerCapture(e.pointerId); } catch { /* ignorata */ }
    },
    jeTiro: ( dx, dy ) => {
      masax2z.tlunakRigardon(-dx * 0o1/0o400, -dy * 0o1/0o400);
    },
    jePinĉo: ( pinĉoKozunu, sef4 ) => {
      if ( !masax2z.fsata() ) masax2z.tlunakZumon(( pinĉoKozunu - sef4 ) * 0o1/0o10);
    },
  });

// ⟪ ſɭᴜ ſןᴜ , ſɭэ ɭʃᴜ , 📃 ⟫
  const tlak2Interagbutonon = () => {
    butInterakti.classList.toggle("laqazi", x2paKfe.classList.contains("laqazi"));
  };
  new MutationObserver(tlak2Interagbutonon).observe(x2paKfe, { attributes: true, attributeFilter: [ "class" ] });
  tlak2Interagbutonon();
  butInterakti.addEventListener("touchstart", ( e ) => {
    e.preventDefault();
    hazegeni.interakti();
  });
  butSalti.addEventListener("touchstart", ( e ) => {
    e.preventDefault();
    butSalti.setAttribute("aria-pressed", "true");
    if ( masax2z.supknu() === "promeno" && !masax2z.surS2tani() ) {
      mobSaltiTenata = true;
      hazegeni.salti();
    }
  });
  butSalti.addEventListener("touchend", () => { butSalti.setAttribute("aria-pressed", "false"); mobSaltiTenata = false; });
  butSalti.addEventListener("touchcancel", () => { butSalti.setAttribute("aria-pressed", "false"); mobSaltiTenata = false; });

// ⟪ ſɭэ ɭʃᴜ , ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟫
  p2t6zo.addEventListener("click", () => {
    if ( masax2z.supknu() === "promeno" || masax2z.supknu() === "c2h2" ) p2t6zo.requestPointerLock();
  });
  document.addEventListener("mousemove", ( e ) => {
    if ( document.pointerLockElement !== p2t6zo || ( masax2z.supknu() !== "promeno" && masax2z.supknu() !== "c2h2" ) ) return;
    masax2z.tlunakRigardon(-e.movementX * 0o1/0o1000, -e.movementY * 0o1/0o1000);
  });

// ⟪ ſȷƽᴜ ʃɔ , ꞙɭɿ , 📃 ⟫
  p2t6zo.addEventListener("wheel", ( e ) => {
    if ( ( masax2z.supknu() !== "promeno" && masax2z.supknu() !== "c2h2" ) || masax2z.fsata() ) return;
    e.preventDefault();
    const tona = e.deltaMode === 0o2 ? e.deltaY * 0o16 : e.deltaMode === 0o1 ? e.deltaY * 0o4/0o10 : e.deltaY * 0o3/0o400;
    masax2z.tlunakZumon(tona);
  }, { passive: false });

  return {
    ca3aq,
    tsekeSprintas: () => mobSprinto,
    tsekeSaltas: () => mobSaltiTenata,
  };
}
