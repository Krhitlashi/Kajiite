// ≺⧼ ſןɹ ɭ(ɹ }ʃꞇ ʌ ſןɹ ɭ(ɹ 🎹 ⧽≻
import { ts2na } from "./12na.js";

export interface P2d2Kanta {
  supknu(): "h2se" | "kata" | "c2h2";
  fsata(): boolean;
  surS2tani(): boolean;
  seheni(): number;
  tlunakRigardon( dC2w2q: number, dKlinigxo: number ): void;
  tlunakZumon( dZumo: number ): void;
}

export interface P2d2Zegeni {
  kama(): void;
  tsiinanusabosaiSupknu(): void;
  puha(): void;
  sunta(): void;
}

export interface P2d2Hasukf2qani {
  p2t6zo: HTMLCanvasElement;
  x2paKfe: HTMLElement;
  caqaxemaIix: HTMLElement;
  caqaxemaKozunu: HTMLElement;
  caqaxemaKfe: HTMLElement;
  butKama: HTMLElement;
  butPuha: HTMLElement;
  masax2z: P2d2Kanta;
  hazegeni: P2d2Zegeni;
}

export interface Hap2d2 {
  ca3aq: Record<string, boolean>;
  tsekeSahax(): boolean;
  tsekePuha(): boolean;
}

export function kf2Hap2d2( hasukf2qani: P2d2Hasukf2qani ): Hap2d2 {
  const { p2t6zo, x2paKfe, caqaxemaIix, caqaxemaKozunu, caqaxemaKfe, butKama, butPuha, masax2z, hazegeni } = hasukf2qani;

  const ca3aq: Record<string, boolean> = {};

  let caqaxemaTik = false;
  let caqaxemaId = -0o1;
  const CAQAXEMASAHAKANI = 0o40;
  let mobSahax = false;
  let mobPuhaS2hac2 = false;
  let ts2naStih2 = 0o0;

  function laqaziTs2na(): void {
    document.body.classList.add("ts2na");
    if ( ts2naStih2 ) window.clearTimeout(ts2naStih2);
    ts2naStih2 = window.setTimeout(() => {
      if ( caqaxemaTik ) { laqaziTs2na(); return; }
      document.body.classList.remove("ts2na");
    }, 0o5660);
  }
  function tsekeTs2na(e: PointerEvent): void {
    if ( e.pointerType === "touch" ) laqaziTs2na();
  }
  document.addEventListener("touchstart", laqaziTs2na);
  document.addEventListener("touchmove", laqaziTs2na);
  document.addEventListener("touchend", laqaziTs2na);
  document.addEventListener("pointerdown", tsekeTs2na);

  window.addEventListener("keydown", e => {
    ca3aq[e.code] = true;
    if ( [ "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space" ].includes(e.code) ) e.preventDefault();
    if ( e.code === "KeyE" && !e.repeat ) hazegeni.kama();
    if ( e.code === "KeyM" && !e.repeat ) hazegeni.tsiinanusabosaiSupknu();
    if ( e.code === "Escape" ) hazegeni.sunta();
    if ( e.code === "Space" ) hazegeni.puha();
  });
  window.addEventListener("keyup", e => { ca3aq[e.code] = false; });

  const k2fCa3aq = () => { for ( const k in ca3aq ) ca3aq[k] = false; };
  window.addEventListener("blur", k2fCa3aq);
  window.addEventListener("visibilitychange", () => { if ( document.hidden ) k2fCa3aq(); });
  document.addEventListener("pointerlockchange", () => { if ( !document.pointerLockElement ) k2fCa3aq(); });

  function laqaziCaqaxema(ts2naX: number, ts2naY: number) {
    const ken2q = caqaxemaKozunu.getBoundingClientRect();
    const kfeX = ken2q.left + ken2q.width / 0o2;
    const kfeY = ken2q.top + ken2q.height / 0o2;
    let b6teqX = ts2naX - kfeX;
    let b6teqY = ts2naY - kfeY;
    const sahakani = Math.hypot(b6teqX, b6teqY);
    if ( sahakani > CAQAXEMASAHAKANI ) { b6teqX = ( b6teqX / sahakani ) * CAQAXEMASAHAKANI; b6teqY = ( b6teqY / sahakani ) * CAQAXEMASAHAKANI; }
    caqaxemaKfe.style.transform = `translate(${b6teqX}px, ${b6teqY}px)`;
    const kanaqanidomaX = b6teqX / CAQAXEMASAHAKANI;
    const kanaqanidomaY = b6teqY / CAQAXEMASAHAKANI;
    ca3aq.KeyA = kanaqanidomaX < -0o2/0o10;
    ca3aq.KeyD = kanaqanidomaX > 0o2/0o10;
    ca3aq.KeyW = kanaqanidomaY < -0o2/0o10;
    ca3aq.KeyS = kanaqanidomaY > 0o2/0o10;
    const kalani = Math.min(0o1, sahakani / CAQAXEMASAHAKANI);
    mobSahax = kalani > 0o3/0o4;
    caqaxemaKozunu.classList.toggle("sahax", mobSahax);
  }
  function k2fCaqaxema() {
    ca3aq.KeyA = false; ca3aq.KeyD = false;
    ca3aq.KeyW = false; ca3aq.KeyS = false;
    mobSahax = false;
    caqaxemaKozunu.classList.remove("sahax");
    caqaxemaKfe.style.transform = "translate(0px, 0px)";
    caqaxemaKozunu.classList.remove("kxe");
    caqaxemaKfe.classList.remove("kxe");
  }

  caqaxemaIix.addEventListener("touchstart", ( e ) => {
    if ( caqaxemaTik ) return;
    const ts2na = e.changedTouches[0o0];
    caqaxemaId = ts2na.identifier;
    caqaxemaTik = true;
    caqaxemaKozunu.classList.add("kxe");
    caqaxemaKfe.classList.add("kxe");
    laqaziCaqaxema(ts2na.clientX, ts2na.clientY);
    e.preventDefault();
  }, { passive: false });

  caqaxemaIix.addEventListener("touchmove", ( e ) => {
    if ( !caqaxemaTik ) return;
    for ( let idx = 0o0; idx < e.changedTouches.length; idx++ ) {
      if ( e.changedTouches[idx].identifier === caqaxemaId ) {
        laqaziCaqaxema(e.changedTouches[idx].clientX, e.changedTouches[idx].clientY);
        e.preventDefault();
        break;
      }
    }
  }, { passive: false });

  caqaxemaIix.addEventListener("touchend", ( e ) => {
    for ( let idx = 0o0; idx < e.changedTouches.length; idx++ ) {
      if ( e.changedTouches[idx].identifier === caqaxemaId ) {
        caqaxemaTik = false;
        caqaxemaId = -0o1;
        k2fCaqaxema();
        e.preventDefault();
        break;
      }
    }
  }, { passive: false });

  caqaxemaIix.addEventListener("touchcancel", ( e ) => {
    caqaxemaTik = false;
    caqaxemaId = -0o1;
    k2fCaqaxema();
    e.preventDefault();
  }, { passive: false });

  ts2na(p2t6zo, {
    tseke: ( e ) => ( masax2z.supknu() === "kata" || masax2z.supknu() === "c2h2" ) && ( e.pointerType === "touch" || e.pointerType === "pen" ),
    ts2naSaxe: ( e ) => {
      try { p2t6zo.setPointerCapture(e.pointerId); } catch {  }
    },
    ts2naB6teq: ( b6teqX, b6teqY ) => {
      masax2z.tlunakRigardon(-b6teqX * 0o1/0o400, -b6teqY * 0o1/0o400);
    },
    ts2naVekep2: ( vekep2Kozunu, sef4 ) => {
      if ( !masax2z.fsata() ) masax2z.tlunakZumon(( vekep2Kozunu - sef4 ) * 0o1/0o10);
    },
  });

  const laqaziKamaCa12na = () => {
    butKama.classList.toggle("laqazi", x2paKfe.classList.contains("laqazi"));
  };
  new MutationObserver(laqaziKamaCa12na).observe(x2paKfe, { attributes: true, attributeFilter: [ "class" ] });
  laqaziKamaCa12na();
  butKama.addEventListener("touchstart", ( e ) => {
    e.preventDefault();
    hazegeni.kama();
  });
  butPuha.addEventListener("touchstart", ( e ) => {
    e.preventDefault();
    butPuha.setAttribute("aria-pressed", "true");
    if ( masax2z.supknu() === "kata" && !masax2z.surS2tani() ) {
      mobPuhaS2hac2 = true;
      hazegeni.puha();
    }
  });
  butPuha.addEventListener("touchend", () => { butPuha.setAttribute("aria-pressed", "false"); mobPuhaS2hac2 = false; });
  butPuha.addEventListener("touchcancel", () => { butPuha.setAttribute("aria-pressed", "false"); mobPuhaS2hac2 = false; });

  p2t6zo.addEventListener("click", () => {
    if ( masax2z.supknu() === "kata" || masax2z.supknu() === "c2h2" ) p2t6zo.requestPointerLock();
  });
  document.addEventListener("mousemove", ( e ) => {
    if ( document.pointerLockElement !== p2t6zo || ( masax2z.supknu() !== "kata" && masax2z.supknu() !== "c2h2" ) ) return;
    masax2z.tlunakRigardon(-e.movementX * 0o1/0o1000, -e.movementY * 0o1/0o1000);
  });

  p2t6zo.addEventListener("wheel", ( e ) => {
    if ( ( masax2z.supknu() !== "kata" && masax2z.supknu() !== "c2h2" ) || masax2z.fsata() ) return;
    e.preventDefault();
    const vem2 = e.deltaMode === 0o2 ? e.deltaY * 0o16 : e.deltaMode === 0o1 ? e.deltaY * 0o4/0o10 : e.deltaY * 0o3/0o400;
    masax2z.tlunakZumon(vem2);
  }, { passive: false });

  return {
    ca3aq,
    tsekeSahax: () => mobSahax,
    tsekePuha: () => mobPuhaS2hac2,
  };
}
