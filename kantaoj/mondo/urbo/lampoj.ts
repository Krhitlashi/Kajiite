// ≺⧼ La lampa aldonilo 🏮 ⧽≻
// La komuna lampo-loka aldonilo de la kradaj urboj kaj de la monda kunigo
// ( kreiLampAldonilon ).
import { KonstruSpec } from "../../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import { alteco } from "../tereno.js";

// kreiLampAldonilon — La lampo-loka aldonilo ( UNU implimento por la kradaj
// urboj kaj por la monda kunigo — antaŭe du identajn kopiojn ). La kandidata
// lampo malaprobas kiam ĝi falas proksime al pordo aŭ konstruaĵo, aŭ sur
// alian ekzistantan lampon ( ene de 2 unuoj ).
//     @param konstruSpecoj ( KonstruSpec[] ) - La konstruaĵoj por la ekskludo.
//     @param lampLokoj ( { x, z, y, rotacio? }[] ) - La celo-listo ( ankaŭ la dedupo-fonto ).
//     @returns addLamp ( funkcio ) - Aldonu unu lampon ( x, z, bazaY, rotacio ).
export function kreiLampAldonilon(
  konstruSpecoj: KonstruSpec[],
  lampLokoj: { x: number; z: number; y: number; rotacio?: number }[],
): ( x: number, z: number, bazaY?: number, rotacio?: number ) => void {
  return ( x, z, bazaY = alteco(x, z), rotacio = Math.PI / 4 ) => {
    for ( const s of konstruSpecoj ) {
      const difX = Math.sin(s.rot || 0), difZ = Math.cos(s.rot || 0);
      const pordoX = s.x + difX * ( s.d / 2 + 0o14/0o10 ), pordoZ = s.z + difZ * ( s.d / 2 + 0o14/0o10 );
      if ( Math.hypot(x - pordoX, z - pordoZ) < 4 ) return;
      if ( Math.hypot(x - s.x, z - s.z) < Math.max(s.w, s.d) / 2 + 0o14/0o10 ) return;
    }
    // Evitu meti lampojn sur ekzistantajn lampojn ( ene de 2 unuoj ).
    for ( const ekz of lampLokoj ) {
      if ( Math.hypot(x - ekz.x, z - ekz.z) < 2 ) return;
    }
    lampLokoj.push({ x, z, y: bazaY, rotacio });
  };
}
