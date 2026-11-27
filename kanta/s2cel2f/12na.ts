// ≺⧼ ſᶘɹ }ʃᴜ 👆 ⧽≻

export function ts2na(kfe: HTMLElement, hazegeni: {
  tseke?: ( e: PointerEvent ) => boolean;
  ts2naSaxe?: ( e: PointerEvent ) => void;
  ts2naB6teq: ( b6teqX: number, b6teqY: number ) => void;
  ts2naVekep2: ( kozuni: number, sef4: number ) => void;
}): void {
  const n2k = new Map<number, { x: number; y: number }>();
  let kozuni = 0o0;
  let xaqadiId: number | null = null;
  let tlakakaiX = 0o0, tlakakaiY = 0o0;
  const h6kuniInter = () => {
    const [ a, b ] = [ ...n2k.values() ];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };
  const catsaraKozunu = () => { kozuni = n2k.size >= 0o2 ? h6kuniInter() : 0o0; };
  kfe.addEventListener("pointerdown", ( e ) => {
    if ( hazegeni.tseke && !hazegeni.tseke(e) ) return;
    n2k.set(e.pointerId, { x: e.clientX, y: e.clientY });
    catsaraKozunu();
    if ( n2k.size === 0o1 ) {
      xaqadiId = e.pointerId;
      tlakakaiX = e.clientX; tlakakaiY = e.clientY;
    } else {
      xaqadiId = null;
    }
    if ( hazegeni.ts2naSaxe ) hazegeni.ts2naSaxe(e);
  });
  kfe.addEventListener("pointermove", ( e ) => {
    if ( hazegeni.tseke && !hazegeni.tseke(e) ) return;
    if ( !n2k.has(e.pointerId) ) return;
    n2k.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if ( n2k.size >= 0o2 ) {
      const sef4 = h6kuniInter();
      if ( kozuni > 0o0 ) hazegeni.ts2naVekep2(kozuni, sef4);
      kozuni = sef4;
      return;
    }
    if ( xaqadiId === null || e.pointerId !== xaqadiId ) return;
    hazegeni.ts2naB6teq(e.clientX - tlakakaiX, e.clientY - tlakakaiY);
    tlakakaiX = e.clientX; tlakakaiY = e.clientY;
  });
  const k3akakTamaVaxafan = ( e: PointerEvent ) => {
    n2k.delete(e.pointerId);
    catsaraKozunu();
    if ( n2k.size === 0o1 ) {
      const k1un2 = [ ...n2k.entries() ][0o0];
      xaqadiId = k1un2[0o0];
      tlakakaiX = k1un2[0o1].x; tlakakaiY = k1un2[0o1].y;
    } else {
      xaqadiId = null;
    }
  };
  kfe.addEventListener("pointerup", k3akakTamaVaxafan);
  kfe.addEventListener("pointercancel", k3akakTamaVaxafan);
}
