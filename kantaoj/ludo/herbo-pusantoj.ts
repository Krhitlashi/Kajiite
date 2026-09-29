// ≺⧼ La herbo-puŝantoj 🌿 ⧽≻
// La gazono cedas sub la piedoj ( vidu gxisdatigiHerbon en vegetajxo.ts ). La
// shadera tabelo havas HERBA_PUSANTOJ glitojn, do nur tiom da figuroj premas
// samtempe — la plej proksimaj al la vidpunkto, ĉar premon oni vidas nur apud
// si. La ludanto okupas la unuan gliton dum promenado ( la fotilo povas esti
// malantaŭ la figuro, do ĝia distanco ne gravas ).
import { HERBA_PUSANTOJ } from "../../eskekoj/shalaj-specioj/vegetajxo.js";
import type { HerbaPusanto } from "../../eskekoj/shalaj-specioj/vegetajxo.js";
import type { BestoSistemo } from "../../eskekoj/shalaj-specioj/speco-tipoj.js";
import type { Figuro } from "../../eskekoj/shalaj-specioj/homoj.js";

// HerbajPusajOpcioj — kion la kolektilo bezonas de la orkestrilo: la moviĝantoj
// ( iliaj pozicioj estas legataj ĉiun kadron ) kaj la du statoj de la ludanto.
export interface HerbajPusajOpcioj {
  npcoj: Figuro[];
  bestoj: BestoSistemo;
  ludanto: () => { x: number; z: number };
  promenas: () => boolean;          // la ludanto estas ekstere kaj ne sur kanuo
}

export interface HerbajPusantoj {
  kolekti( x: number, z: number ): readonly HerbaPusanto[];
}

// ⟨ Neniu ĉiukadra rubo 📃 ⟩ — la glitoj REUZIĜAS el provizo kaj la kandidatoj
// kolektiĝas per simpla enŝovo en kvar nombrojn, sen ordigo kaj sen novaj
// objektoj. La trairado de la NPC-oj kaj de la bestoj okazas unufoje po kadro
// kaj nur mezuras distancojn.
export function kreiHerbajnPusantojn( opcioj: HerbajPusajOpcioj ): HerbajPusantoj {
  const { npcoj, bestoj, ludanto, promenas } = opcioj;
  const herbaPusaProvizo: HerbaPusanto[] = [
    { x: 0, z: 0 }, { x: 0, z: 0 }, { x: 0, z: 0 }, { x: 0, z: 0 },
  ];
  const herbajPusantoj: HerbaPusanto[] = [];
  // Kiom malproksime figuro ankoraŭ premas la herbon ( mondunuoj ).
  const PUSA_VIDO = 0o30;                  // 24
  const PUSA_VIDO2 = PUSA_VIDO * PUSA_VIDO;
  // La plej proksimaj figuroj, ordigitaj de la plej proksima — iliaj pozicioj kaj
  // la kvadratoj de iliaj distancoj. Reuzataj tabeloj, do neniu asigno po kadro.
  const pusxajLokojX = [ 0, 0, 0, 0 ];
  const pusxajLokojZ = [ 0, 0, 0, 0 ];
  const pusxajD = [ 0, 0, 0, 0 ];
  let pusxajNombro = 0;

  // proponuPusxanton — Konsideru unu figuron por la tabelo de la premo. La tabelo
  // estas ordigita de la plej proksima al la plej fora, do la kandidato enŝoviĝas
  // antaŭ la pli forajn kaj la plej fora elfalas ( se la tabelo estis plena ).
  //     @param x, z ( number ) - La piedo de la figuro.
  //     @param d2 ( number ) - La kvadrato de ĝia distanco al la vidpunkto.
  function proponuPusxanton(x: number, z: number, d2: number): void {
    if ( pusxajNombro === HERBA_PUSANTOJ && d2 >= pusxajD[HERBA_PUSANTOJ - 1] ) return;
    let i = Math.min(pusxajNombro, HERBA_PUSANTOJ - 1);
    while ( i > 0 && pusxajD[i - 1] > d2 ) {
      pusxajD[i] = pusxajD[i - 1];
      pusxajLokojX[i] = pusxajLokojX[i - 1];
      pusxajLokojZ[i] = pusxajLokojZ[i - 1];
      i--;
    }
    pusxajD[i] = d2;
    pusxajLokojX[i] = x;
    pusxajLokojZ[i] = z;
    if ( pusxajNombro < HERBA_PUSANTOJ ) pusxajNombro++;
  }

  // kolekti — La glitoj de la premo por ĉi tiu kadro. La vidpunkto estas la
  // FOTILO, ĉar ĝi estas ankaŭ la centro de la fado de la herbo.
  //     @param x, z ( number ) - La vidpunkto ( la fotilo ).
  //     @returns pusantoj ( readonly HerbaPusanto[] ) - La glitoj, la plej proksima
  //         unue. Nur la unuaj HERBA_PUSANTOJ uzas la shaderon.
  function kolekti(x: number, z: number): readonly HerbaPusanto[] {
    herbajPusantoj.length = 0;
    // ⟨ La ludanto 📃 ⟩ — ĉiam la unua, ĉar la herbo sub oniaj propraj piedoj cedas
    // ankaŭ kiam la fotilo estas malantaŭ la figuro.
    if ( promenas() ) {
      const glito = herbaPusaProvizo[0];
      const p = ludanto();
      glito.x = p.x;
      glito.z = p.z;
      herbajPusantoj.push(glito);
    }
    pusxajNombro = 0;
    for ( const n of npcoj ) {
      if ( !n.group.visible ) continue;
      const dx = n.group.position.x - x, dz = n.group.position.z - z;
      const d2 = dx * dx + dz * dz;
      if ( d2 < PUSA_VIDO2 ) proponuPusxanton(n.group.position.x, n.group.position.z, d2);
    }
    for ( const b of bestoj.bestoj ) {
      const dx = b.grupo.position.x - x, dz = b.grupo.position.z - z;
      const d2 = dx * dx + dz * dz;
      if ( d2 < PUSA_VIDO2 ) proponuPusxanton(b.grupo.position.x, b.grupo.position.z, d2);
    }
    const kiom = Math.min(pusxajNombro, HERBA_PUSANTOJ - herbajPusantoj.length);
    for ( let i = 0; i < kiom; i++ ) {
      const glito = herbaPusaProvizo[herbajPusantoj.length];
      glito.x = pusxajLokojX[i];
      glito.z = pusxajLokojZ[i];
      herbajPusantoj.push(glito);
    }
    return herbajPusantoj;
  }

  return { kolekti };
}
