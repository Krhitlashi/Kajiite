// ≺⧼ កាយវិការប៉ះ 👆 ⧽≻

export function tuŝaGesto(elemento: HTMLElement, agoj: {
  akceptu?: ( e: PointerEvent ) => boolean;
  postEniro?: ( e: PointerEvent ) => void;
  jeTiro: ( dx: number, dy: number ) => void;
  jePinĉo: ( bazo: number, nova: number ) => void;
}): void {
  const punktoj = new Map<number, { x: number; y: number }>();
  let bazo = 0;
  let unuaID: number | null = null;
  let lastaX = 0, lastaY = 0;
  const distancoInter = () => {
    const [ a, b ] = [ ...punktoj.values() ];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };
  const agordiBazon = () => { bazo = punktoj.size >= 2 ? distancoInter() : 0; };
  elemento.addEventListener("pointerdown", ( e ) => {
    if ( agoj.akceptu && !agoj.akceptu(e) ) return;
    punktoj.set(e.pointerId, { x: e.clientX, y: e.clientY });
    agordiBazon();
    if ( punktoj.size === 1 ) {
      unuaID = e.pointerId;
      lastaX = e.clientX; lastaY = e.clientY;
    } else {
      unuaID = null;
    }
    if ( agoj.postEniro ) agoj.postEniro(e);
  });
  elemento.addEventListener("pointermove", ( e ) => {
    if ( agoj.akceptu && !agoj.akceptu(e) ) return;
    if ( !punktoj.has(e.pointerId) ) return;
    punktoj.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if ( punktoj.size >= 2 ) {
      const nova = distancoInter();
      if ( bazo > 0 ) agoj.jePinĉo(bazo, nova);
      bazo = nova;
      return;
    }
    if ( unuaID === null || e.pointerId !== unuaID ) return;
    agoj.jeTiro(e.clientX - lastaX, e.clientY - lastaY);
    lastaX = e.clientX; lastaY = e.clientY;
  });
  const finiGeston = ( e: PointerEvent ) => {
    punktoj.delete(e.pointerId);
    agordiBazon();
    if ( punktoj.size === 1 ) {
      const restanta = [ ...punktoj.entries() ][0];
      unuaID = restanta[0];
      lastaX = restanta[1].x; lastaY = restanta[1].y;
    } else {
      unuaID = null;
    }
  };
  elemento.addEventListener("pointerup", finiGeston);
  elemento.addEventListener("pointercancel", finiGeston);
}
