// ≺⧼ ឧបករណ៍បន្ថែមចង្កៀង 🏮 ⧽≻
import { KonstruSpec } from "../../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import { alteco } from "../tereno.js";

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
    for ( const ekz of lampLokoj ) {
      if ( Math.hypot(x - ekz.x, z - ekz.z) < 2 ) return;
    }
    lampLokoj.push({ x, z, y: bazaY, rotacio });
  };
}
