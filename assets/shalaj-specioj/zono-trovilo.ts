// Zono-trovilo — la pentritaj ĉeloj de la besta tavolo ( la skulptilo ).
//
// La bestoj ne aperas ie ajn: ili naskiĝas nur en la ĉeloj, kiujn la ludanto
// pentris per la tero-skulptilo ( la besta tavolo ). Ĉi tiu modulo legas tiun
// tavolon kaj redonas la mondajn poziciojn — la akvaj bestoj uzas ĝin, kaj la
// petreloj uzas ĝin kun alia bito.
import { akvo } from "../../src/tereno.js";
import { skulptitaBesto } from "../../src/tero-datumaro/rultempo.js";
import { SKULPTA_PASO, SKULPTA_N, SKULPTA_ORIGINO } from "../../src/tero-datumaro/aktiva.js";

// trovuBestajnZonojn — la pentritaj ĉeloj de la besta-tavolo ( la skulptilo )
// kun la donita bito ( 1=akvaj bestoj, 2=petreloj, 4=NPC-oj; ĉelo povas teni
// plurajn ), kiel mondaj pozicioj. Malplena se neniu pentraĵo — nenia besto
// tiam. Akvaj bestoj bezonas akvajn ĉelojn; la petreloj povas flugi super
// ajna loko; la NPC-oj piediras nur sur tero ( la ludo filtras la akvon ).
export function trovuBestajnZonojn(bito: number, nurAkvo: boolean): { x: number; z: number }[] {
  const zonoj: { x: number; z: number }[] = [];
  for ( let j = 0; j < SKULPTA_N; j++ ) {
    for ( let i = 0; i < SKULPTA_N; i++ ) {
      const x = SKULPTA_ORIGINO[0] + i * SKULPTA_PASO;
      const z = SKULPTA_ORIGINO[1] + j * SKULPTA_PASO;
      if ( ( skulptitaBesto(x, z) & bito ) === 0 ) continue;
      if ( nurAkvo && !akvo(x, z) ) continue;
      zonoj.push({ x, z });
    }
  }
  return zonoj;
}
