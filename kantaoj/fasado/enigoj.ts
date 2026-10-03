// ≺⧼ ការបញ្ចូល 🎹 ⧽≻
import { tuŝaGesto } from "./gestoj.js";

export interface EnigaLudanto {
  rezimo(): "orbito" | "promeno" | "interno";
  kuŝas(): boolean;
  surKanoto(): boolean;
  movoValoro(): number;
  aldoniRigardon( dDirekto: number, dKlinigxo: number ): void;
  aldoniZumon( dZumo: number ): void;
}

export interface EnigajAgoj {
  interakti(): void;
  sxaltiRezimon(): void;
  salti(): void;
  eskapo(): void;
}

export interface EnigajOpcioj {
  kanvaso: HTMLCanvasElement;
  promptoElemento: HTMLElement;
  joystickZono: HTMLElement;
  joystickBazo: HTMLElement;
  joystickTenilo: HTMLElement;
  butInterakti: HTMLElement;
  butSalti: HTMLElement;
  ludanto: EnigaLudanto;
  agoj: EnigajAgoj;
}

export interface Enigoj {
  klavoj: Record<string, boolean>;
  cxuSprintas(): boolean;
  cxuSaltas(): boolean;
}

export function kreiEnigojn( opcioj: EnigajOpcioj ): Enigoj {
  const { kanvaso, promptoElemento, joystickZono, joystickBazo, joystickTenilo, butInterakti, butSalti, ludanto, agoj } = opcioj;

  const klavoj: Record<string, boolean> = {};
  // ⟨ ស្ថានភាពដងចង្កូត 📃 ⟩
  let joystickAktiva = false;
  let joystickID = -1;
  const JOYSTICK_R = 0o40;
  let mobSprinto = false;
  let mobSaltiTenata = false;
  let tuŝaTempilo = 0;

  // ⟪ អេក្រង់ប៉ះ។ ការបញ្ជាលេចពេលប៉ះ និងលាក់ពេលអសកម្ម 📃 ⟫
  function montriTuŝajnKontrolojn(): void {
    document.body.classList.add("tuŝa");
    if ( tuŝaTempilo ) window.clearTimeout(tuŝaTempilo);
    tuŝaTempilo = window.setTimeout(() => {
      if ( joystickAktiva ) { montriTuŝajnKontrolojn(); return; }
      document.body.classList.remove("tuŝa");
    }, 0o5660);
  }
  function montriTuŝajnSeTuŝa(e: PointerEvent): void {
    if ( e.pointerType === "touch" ) montriTuŝajnKontrolojn();
  }
  document.addEventListener("touchstart", montriTuŝajnKontrolojn);
  document.addEventListener("touchmove", montriTuŝajnKontrolojn);
  document.addEventListener("touchend", montriTuŝajnKontrolojn);
  document.addEventListener("pointerdown", montriTuŝajnSeTuŝa);

  // ⟪ ក្តារចុច 📃 ⟫
  window.addEventListener("keydown", e => {
    klavoj[e.code] = true;
    if ( [ "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space" ].includes(e.code) ) e.preventDefault();
    if ( e.code === "KeyE" && !e.repeat ) agoj.interakti();
    if ( e.code === "KeyM" && !e.repeat ) agoj.sxaltiRezimon();
    if ( e.code === "Escape" ) agoj.eskapo();
    if ( e.code === "Space" ) agoj.salti();
  });
  window.addEventListener("keyup", e => { klavoj[e.code] = false; });

  const resetiKlfojn = () => { for ( const k in klavoj ) klavoj[k] = false; };
  window.addEventListener("blur", resetiKlfojn);
  window.addEventListener("visibilitychange", () => { if ( document.hidden ) resetiKlfojn(); });
  document.addEventListener("pointerlockchange", () => { if ( !document.pointerLockElement ) resetiKlfojn(); });

  // ⟪ ដងចង្កូតទូរស័ព្ទ ( joystick និម្មិត ) 📃 ⟫
  function gxisdatigiJoystick(klientoX: number, klientoY: number) {
    const recto = joystickBazo.getBoundingClientRect();
    const cx = recto.left + recto.width / 2;
    const cy = recto.top + recto.height / 2;
    let dx = klientoX - cx;
    let dy = klientoY - cy;
    const dist = Math.hypot(dx, dy);
    if ( dist > JOYSTICK_R ) { dx = ( dx / dist ) * JOYSTICK_R; dy = ( dy / dist ) * JOYSTICK_R; }
    joystickTenilo.style.transform = `translate(${dx}px, ${dy}px)`;
    const normX = dx / JOYSTICK_R;
    const normY = dy / JOYSTICK_R;
    klavoj.KeyA = normX < -0o2/0o10;
    klavoj.KeyD = normX > 0o2/0o10;
    klavoj.KeyW = normY < -0o2/0o10;
    klavoj.KeyS = normY > 0o2/0o10;
    const devio = Math.min(1, dist / JOYSTICK_R);
    mobSprinto = devio > 0o3/0o4;
    joystickBazo.classList.toggle("sprinto", mobSprinto);
  }
  function resetiJoystick() {
    klavoj.KeyA = false; klavoj.KeyD = false;
    klavoj.KeyW = false; klavoj.KeyS = false;
    mobSprinto = false;
    joystickBazo.classList.remove("sprinto");
    joystickTenilo.style.transform = "translate(0px, 0px)";
    joystickBazo.classList.remove("aktiva");
    joystickTenilo.classList.remove("aktiva");
  }

  joystickZono.addEventListener("touchstart", ( e ) => {
    if ( joystickAktiva ) return;
    const tosxo = e.changedTouches[0];
    joystickID = tosxo.identifier;
    joystickAktiva = true;
    joystickBazo.classList.add("aktiva");
    joystickTenilo.classList.add("aktiva");
    gxisdatigiJoystick(tosxo.clientX, tosxo.clientY);
    e.preventDefault();
  }, { passive: false });

  joystickZono.addEventListener("touchmove", ( e ) => {
    if ( !joystickAktiva ) return;
    for ( let i = 0; i < e.changedTouches.length; i++ ) {
      if ( e.changedTouches[i].identifier === joystickID ) {
        gxisdatigiJoystick(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
        e.preventDefault();
        break;
      }
    }
  }, { passive: false });

  joystickZono.addEventListener("touchend", ( e ) => {
    for ( let i = 0; i < e.changedTouches.length; i++ ) {
      if ( e.changedTouches[i].identifier === joystickID ) {
        joystickAktiva = false;
        joystickID = -1;
        resetiJoystick();
        e.preventDefault();
        break;
      }
    }
  }, { passive: false });

  joystickZono.addEventListener("touchcancel", ( e ) => {
    joystickAktiva = false;
    joystickID = -1;
    resetiJoystick();
    e.preventDefault();
  }, { passive: false });

  // ⟪ ការបញ្ជាមើលលើទូរស័ព្ទដោយប៉ះ ( Pointer Events ) 📃 ⟫
  tuŝaGesto(kanvaso, {
    akceptu: ( e ) => ( ludanto.rezimo() === "promeno" || ludanto.rezimo() === "interno" ) && ( e.pointerType === "touch" || e.pointerType === "pen" ),
    postEniro: ( e ) => {
      try { kanvaso.setPointerCapture(e.pointerId); } catch { /* ignorata */ }
    },
    jeTiro: ( dx, dy ) => {
      ludanto.aldoniRigardon(-dx * 0o1/0o400, -dy * 0o1/0o400);
    },
    jePinĉo: ( pinĉoBazo, nova ) => {
      if ( !ludanto.kuŝas() ) ludanto.aldoniZumon(( pinĉoBazo - nova ) * 0o1/0o10);
    },
  });

  // ⟪ ប៊ូតុងសកម្មភាពទូរស័ព្ទ 📃 ⟫
  const gxisdatigiInteragbutonon = () => {
    butInterakti.classList.toggle("montri", promptoElemento.classList.contains("montri"));
  };
  new MutationObserver(gxisdatigiInteragbutonon).observe(promptoElemento, { attributes: true, attributeFilter: [ "class" ] });
  gxisdatigiInteragbutonon();
  butInterakti.addEventListener("touchstart", ( e ) => {
    e.preventDefault();
    agoj.interakti();
  });
  butSalti.addEventListener("touchstart", ( e ) => {
    e.preventDefault();
    butSalti.setAttribute("aria-pressed", "true");
    if ( ludanto.rezimo() === "promeno" && !ludanto.surKanoto() ) {
      mobSaltiTenata = true;
      agoj.salti();
    }
  });
  butSalti.addEventListener("touchend", () => { butSalti.setAttribute("aria-pressed", "false"); mobSaltiTenata = false; });
  butSalti.addEventListener("touchcancel", () => { butSalti.setAttribute("aria-pressed", "false"); mobSaltiTenata = false; });

  // ⟪ សោបង្ហាញសម្រាប់ការដើរ ( ខាងក្រៅ និងខាងក្នុង ) 📃 ⟫
  kanvaso.addEventListener("click", () => {
    if ( ludanto.rezimo() === "promeno" || ludanto.rezimo() === "interno" ) kanvaso.requestPointerLock();
  });
  document.addEventListener("mousemove", ( e ) => {
    if ( document.pointerLockElement !== kanvaso || ( ludanto.rezimo() !== "promeno" && ludanto.rezimo() !== "interno" ) ) return;
    ludanto.aldoniRigardon(-e.movementX * 0o1/0o1000, -e.movementY * 0o1/0o1000);
  });

  // ⟪ កង់ , ពីជិតទៅមុំទីបី 📃 ⟫
  kanvaso.addEventListener("wheel", ( e ) => {
    if ( ( ludanto.rezimo() !== "promeno" && ludanto.rezimo() !== "interno" ) || ludanto.kuŝas() ) return;
    e.preventDefault();
    const paŝo = e.deltaMode === 2 ? e.deltaY * 0o16 : e.deltaMode === 1 ? e.deltaY * 0o4/0o10 : e.deltaY * 0o3/0o400;
    ludanto.aldoniZumon(paŝo);
  }, { passive: false });

  return {
    klavoj,
    cxuSprintas: () => mobSprinto,
    cxuSaltas: () => mobSaltiTenata,
  };
}
