// ≺⧼ ſᶘɹ }ʃᴜ }ʃꞇ 👆 ⧽≻

export function tuŝaTamaVaxafa(kfe: HTMLElement, hazegeni: {
  akceptu?: ( e: PointerEvent ) => boolean;
  postEniro?: ( e: PointerEvent ) => void;
  jeTiro: ( dx: number, dy: number ) => void;
  jePinĉo: ( kozuni: number, sef4: number ) => void;
}): void {
  const n2k = new Map<number, { x: number; y: number }>();
  let kozuni = 0o0;
  let unuaID: number | null = null;
  let tlakakaiX = 0o0, tlakakaiY = 0o0;
  const h6kuniInter = () => {
    const [ a, b ] = [ ...n2k.values() ];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };
  const catsaraKozunu = () => { kozuni = n2k.size >= 0o2 ? h6kuniInter() : 0o0; };
  kfe.addEventListener("pointerdown", ( e ) => {
    if ( hazegeni.akceptu && !hazegeni.akceptu(e) ) return;
    n2k.set(e.pointerId, { x: e.clientX, y: e.clientY });
    catsaraKozunu();
    if ( n2k.size === 0o1 ) {
      unuaID = e.pointerId;
      tlakakaiX = e.clientX; tlakakaiY = e.clientY;
    } else {
      unuaID = null;
    }
    if ( hazegeni.postEniro ) hazegeni.postEniro(e);
  });
  kfe.addEventListener("pointermove", ( e ) => {
    if ( hazegeni.akceptu && !hazegeni.akceptu(e) ) return;
    if ( !n2k.has(e.pointerId) ) return;
    n2k.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if ( n2k.size >= 0o2 ) {
      const sef4 = h6kuniInter();
      if ( kozuni > 0o0 ) hazegeni.jePinĉo(kozuni, sef4);
      kozuni = sef4;
      return;
    }
    if ( unuaID === null || e.pointerId !== unuaID ) return;
    hazegeni.jeTiro(e.clientX - tlakakaiX, e.clientY - tlakakaiY);
    tlakakaiX = e.clientX; tlakakaiY = e.clientY;
  });
  const finiTamaVaxafan = ( e: PointerEvent ) => {
    n2k.delete(e.pointerId);
    catsaraKozunu();
    if ( n2k.size === 0o1 ) {
      const restanta = [ ...n2k.entries() ][0o0];
      unuaID = restanta[0o0];
      tlakakaiX = restanta[0o1].x; tlakakaiY = restanta[0o1].y;
    } else {
      unuaID = null;
    }
  };
  kfe.addEventListener("pointerup", finiTamaVaxafan);
  kfe.addEventListener("pointercancel", finiTamaVaxafan);
}
