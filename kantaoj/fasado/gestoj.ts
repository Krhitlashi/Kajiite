// ≺⧼ Tuŝaj gestoj 👆 ⧽≻
// La komuna plur-fingra gesta motoro de la du kanvasoj — la rigarda kanvaso
// ( kantaoj/ludo/sperto.ts ) kaj la plena mapo ( kantaoj/bildo/minimapo.ts ).

// tuŝaGesto — La komuna plur-fingra gesta motoro de la du kanvasoj ( la
// rigarda kanvaso kaj la plena mapo ). Tenas la punktan mapon, la pinĉan
// bazon kaj la transiron de la restanta fingro, kaj transdonas la eventojn
// al du alvokaj reĝimoj — unufingra tiro ( dx, dy ) kaj plur-fingra pinĉo
// ( la bazo kaj la nova distanco ). La bazo renoviĝas ĉiun pinĉan kadron,
// do la pinĉo renaskiĝas se la fingroj kunigxis kaj disigxas sen levigxo.
export function tuŝaGesto(elemento: HTMLElement, agoj: {
  akceptu?: ( e: PointerEvent ) => boolean;   // filtrilo por la eniro ( defaŭlte ĉiuj )
  postEniro?: ( e: PointerEvent ) => void;    // vokita post kiam la punkto aliĝis
  jeTiro: ( dx: number, dy: number ) => void;
  jePinĉo: ( bazo: number, nova: number ) => void;
}): void {
  const punktoj = new Map<number, { x: number; y: number }>();
  let bazo = 0;                     // la fingra distanco ĉe la lasta mezurado ( 0 = ne pinĉas )
  let unuaID: number | null = null; // la tiranta fingro ( null dum pinĉo )
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
      unuaID = null; // la pinĉo anstataŭas la tiradon
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
    // Post la pinĉo la restanta fingro daŭrigas la tiradon.
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
