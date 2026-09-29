// ≺⧼ Enigo 🎹 ⧽≻
// La enigo de la ludo — la klavaro, la poŝtelefona stirstango, la rigarda
// gesto, la poŝtelefonaj agbutonoj, la montra-seruro kaj la rado. La modulo
// POSEDAS la enigan staton ( la klavojn, la stirstangon, la tenatan saltbutonon,
// la tuŝekranan tempigilon ) kaj la buklo nur legas gxin.
//
// La rigardo kaj la zumo ne apartenas ĉi tien — ili pasas al la ludanto per
// aldoniRigardon kaj aldoniZumon, kiuj aplikas la limojn de la fotilo. Same la
// agoj ( la interakto, la rezimo, la salto, la Escape-fermoj ) restas en la
// orkestrilo; la enigo nur raportas, ke la klavo aŭ la butono premigxis.
import { tuŝaGesto } from "./gestoj.js";

// EnigaLudanto — la mova stato, kiun la enigo legas kaj movas.
export interface EnigaLudanto {
  rezimo(): "orbit" | "walk" | "interior";
  kuŝas(): boolean;
  surKanoto(): boolean;
  movoValoro(): number;
  aldoniRigardon( dDirekto: number, dKlinigxo: number ): void;
  aldoniZumon( dZumo: number ): void;
}

// EnigajAgoj — la agoj de la orkestrilo, kiujn la klavoj kaj la butonoj vokas.
export interface EnigajAgoj {
  interakti(): void;
  sxaltiRezimon(): void;
  salti(): void;
  eskapo(): void;          // la Escape-klavo — la fermo de la malfermitaj paneloj
}

// EnigajOpcioj — la elementoj, sur kiuj la enigo auxskultas, plus la ludanto kaj
// la agoj. La telefonaj elementoj venas aparte, ĉar la stirstango kaj la
// butonoj estas tri sendependaj partoj de la fasado.
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

// Enigoj — la klav-stato por la mova buklo plus la du telefonaj statoj, kiujn
// la buklo legas ( la stirstanga forkuro kaj la tenata saltbutono ).
export interface Enigoj {
  klavoj: Record<string, boolean>;
  cxuSprintas(): boolean;
  cxuSaltas(): boolean;
}

export function kreiEnigojn( opcioj: EnigajOpcioj ): Enigoj {
  const { kanvaso, promptoElemento, joystickZono, joystickBazo, joystickTenilo, butInterakti, butSalti, ludanto, agoj } = opcioj;

  const klavoj: Record<string, boolean> = {};
  // ⟨ La stirstanga stato 📃 ⟩
  let joystickAktiva = false;
  let joystickID = -1;
  const JOYSTICK_R = 0o40;
  let mobSprinto = false;
  let mobSaltiTenata = false;
  let tuŝaTempilo = 0;

  // ⟪ Tuŝekrano. La kontroloj aperu je tuŝo kaj kaŝiĝu post senaktiveco 📃 ⟫
  function montriTuŝajnKontrolojn(): void {
    document.body.classList.add("tuŝa");
    if ( tuŝaTempilo ) window.clearTimeout(tuŝaTempilo);
    // Post 0o63/0o10 He sen tuŝo la kontroloj malaperas ( la sekva tuŝo revenigas ilin ).
    tuŝaTempilo = window.setTimeout(() => {
      // Ne kaŝu dum la stirstango estas tenata. Touchend eble ne alvenas sur kaŝita zono.
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

  // ⟪ Klavaro 📃 ⟫
  window.addEventListener("keydown", e => {
    klavoj[e.code] = true;
    if ( [ "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space" ].includes(e.code) ) e.preventDefault();
    if ( e.code === "KeyE" && !e.repeat ) agoj.interakti();
    if ( e.code === "KeyM" && !e.repeat ) agoj.sxaltiRezimon();
    if ( e.code === "Escape" ) agoj.eskapo();
    // La salto — la impuso kaj la forpuŝa sono ( vidu salti en la orkestrilo ).
    // La ripeto de la klavo ne gravas — la surteriĝo mem estas la gardo.
    if ( e.code === "Space" ) agoj.salti();
  });
  window.addEventListener("keyup", e => { klavoj[e.code] = false; });

  // Restarigu la klavajn statojn kiam la fenestro perdas fokuson, por ke klavoj ne restu ŝaltitaj.
  const resetiKlfojn = () => { for ( const k in klavoj ) klavoj[k] = false; };
  window.addEventListener("blur", resetiKlfojn);
  window.addEventListener("visibilitychange", () => { if ( document.hidden ) resetiKlfojn(); });
  document.addEventListener("pointerlockchange", () => { if ( !document.pointerLockElement ) resetiKlfojn(); });

  // ⟪ Poŝtelefona stirstango ( virtuala joystick ) 📃 ⟫
  function gxisdatigiJoystick(klientoX: number, klientoY: number) {
    const recto = joystickBazo.getBoundingClientRect();
    const cx = recto.left + recto.width / 2;
    const cy = recto.top + recto.height / 2;
    let dx = klientoX - cx;
    let dy = klientoY - cy;
    const dist = Math.hypot(dx, dy);
    if ( dist > JOYSTICK_R ) { dx = ( dx / dist ) * JOYSTICK_R; dy = ( dy / dist ) * JOYSTICK_R; }
    // Move thumb
    joystickTenilo.style.transform = `translate(${dx}px, ${dy}px)`;
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
    // Stirstango funkcias en cxiuj rezimoj (promenado, interno kaj orbirado).
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

  // ⟪ Poŝtelefona rigarda kontrolo per tuŝo ( Pointer Events ) 📃 ⟫
  // Unu fingro turnas la rigardon ( kiel la muso en montra-seruro ). Dua fingro
  // ekas pinĉon. Fingroj kunen malzomas la fotilon kaj malfermas la trian
  // personon ( la modelon de la ludanto videblan ), fingroj disen zumas kaj
  // revenas al la unua persono. La sama konvencio kiel la rado sur labortablo
  // ( rulumi malsupren malzomas ). Pointer events estas pli fidindaj ol
  // tuŝ-eventoj por plur-fingraj gestoj ( la sama ŝablono kiel la plena mapo );
  // la muso kaj la plumo restas ĉe la montra-serura rigardo.
  tuŝaGesto(kanvaso, {
    // Nur tuŝoj kaj plumoj en la piediraj reĝimoj — la muso kaj la plumo restas
    // ĉe la montra-serura rigardo; la pinĉo malzumas la fotilon ( fingroj
    // kunen = malzomi = tria persono, fingroj disen = zumi = unua persono ).
    akceptu: ( e ) => ( ludanto.rezimo() === "walk" || ludanto.rezimo() === "interior" ) && ( e.pointerType === "touch" || e.pointerType === "pen" ),
    postEniro: ( e ) => {
      // Tenigu la geston sur la kanvaso eĉ se la fingro fordrivas de ĝi.
      try { kanvaso.setPointerCapture(e.pointerId); } catch { /* ignorata */ }
    },
    jeTiro: ( dx, dy ) => {
      ludanto.aldoniRigardon(-dx * 0o1/0o400, -dy * 0o1/0o400);
    },
    jePinĉo: ( pinĉoBazo, nova ) => {
      if ( !ludanto.kuŝas() ) ludanto.aldoniZumon(( pinĉoBazo - nova ) * 0o1/0o10);
    },
  });

  // ⟪ Poŝtelefonaj agbutonoj 📃 ⟫
  // La E-butono aperas nur kiam estas proksima interagebla — same kiel la prompto
  // ( #prompto.montri ). Observilo konservas la du en sinsekvo, do cxiu sxangxo de
  // la prompta stato ( pordo/kanuo/mangxajxo/eliro ) sxaltas ankaux la butonon.
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
    // La n2tase-stato de la ekstera stilfolio sekvas aria-pressed. Montru la
    // premitan formon dum la butono estas tenata ( la salto mem estas tenata ).
    butSalti.setAttribute("aria-pressed", "true");
    if ( ludanto.rezimo() === "walk" && !ludanto.surKanoto() ) {
      mobSaltiTenata = true;
      agoj.salti();
    }
  });
  butSalti.addEventListener("touchend", () => { butSalti.setAttribute("aria-pressed", "false"); mobSaltiTenata = false; });
  butSalti.addEventListener("touchcancel", () => { butSalti.setAttribute("aria-pressed", "false"); mobSaltiTenata = false; });

  // ⟪ Montra-seruro por piedirado ( ekstere kaj interne ) 📃 ⟫
  kanvaso.addEventListener("click", () => {
    if ( ludanto.rezimo() === "walk" || ludanto.rezimo() === "interior" ) kanvaso.requestPointerLock();
  });
  document.addEventListener("mousemove", ( e ) => {
    if ( document.pointerLockElement !== kanvaso || ( ludanto.rezimo() !== "walk" && ludanto.rezimo() !== "interior" ) ) return;
    ludanto.aldoniRigardon(-e.movementX * 0o1/0o1000, -e.movementY * 0o1/0o1000);
  });

  // ⟪ Rado — malzomo al tria persono 📃 ⟫
  // En orbito la rado jam zumas per OrbitControls. Dum promenado kaj en la
  // interno gxi malzomas eksteren por montri la modelon de la ludanto.
  kanvaso.addEventListener("wheel", ( e ) => {
    if ( ( ludanto.rezimo() !== "walk" && ludanto.rezimo() !== "interior" ) || ludanto.kuŝas() ) return;
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
