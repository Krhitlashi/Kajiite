// ≺⧼ កាយវិការប៉ះ 👆 ⧽≻

export function tuŝaGesto(elemento: HTMLElement, agoj: {
  akceptu?: ( e: PointerEvent ) => boolean;
  postEniro?: ( e: PointerEvent ) => void;
  jeTiro: ( dx: number, dy: number ) => void;
  jePinĉo: ( kozuni: number, sef4: number ) => void;
}): void {
  const n2k = new Map<number, { x: number; y: number }>();
  let kozuni = 0;
  let unuaID: number | null = null;
  let lastaX = 0, lastaY = 0;
  const distancoInter = () => {
    const [ a, b ] = [ ...n2k.values() ];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };
  const agordiBazon = () => { kozuni = n2k.size >= 2 ? distancoInter() : 0; };
  elemento.addEventListener("pointerdown", ( e ) => {
    if ( agoj.akceptu && !agoj.akceptu(e) ) return;
    n2k.set(e.pointerId, { x: e.clientX, y: e.clientY });
    agordiBazon();
    if ( n2k.size === 1 ) {
      unuaID = e.pointerId;
      lastaX = e.clientX; lastaY = e.clientY;
    } else {
      unuaID = null;
    }
    if ( agoj.postEniro ) agoj.postEniro(e);
  });
  elemento.addEventListener("pointermove", ( e ) => {
    if ( agoj.akceptu && !agoj.akceptu(e) ) return;
    if ( !n2k.has(e.pointerId) ) return;
    n2k.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if ( n2k.size >= 2 ) {
      const sef4 = distancoInter();
      if ( kozuni > 0 ) agoj.jePinĉo(kozuni, sef4);
      kozuni = sef4;
      return;
    }
    if ( unuaID === null || e.pointerId !== unuaID ) return;
    agoj.jeTiro(e.clientX - lastaX, e.clientY - lastaY);
    lastaX = e.clientX; lastaY = e.clientY;
  });
  const finiGeston = ( e: PointerEvent ) => {
    n2k.delete(e.pointerId);
    agordiBazon();
    if ( n2k.size === 1 ) {
      const restanta = [ ...n2k.entries() ][0];
      unuaID = restanta[0];
      lastaX = restanta[1].x; lastaY = restanta[1].y;
    } else {
      unuaID = null;
    }
  };
  elemento.addEventListener("pointerup", finiGeston);
  elemento.addEventListener("pointercancel", finiGeston);
}
