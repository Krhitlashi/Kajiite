// ≺⧼ ឧបករណ៍បន្ថែមចង្កៀង 🏮 ⧽≻
import { KonstruSpec } from "../../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import { alteco, akvo, akvaNivelo } from "../tereno.js";

export interface LampLoko {
  x: number;
  z: number;
  y: number;
  rotacio?: number;
  grupCentro?: [ number, number ];
}

export type LampAldonilo = ( x: number, z: number, bazaY?: number, rotacio?: number,
  serĉu?: boolean ) => boolean;

export function kreiLampAldonilon(
  konstruSpecoj: KonstruSpec[],
  lampLokoj: LampLoko[],
): LampAldonilo {
  const estasLibera = ( x: number, z: number, akva: boolean ): boolean => {
    if ( akva && ( akvo( x, z ) || alteco( x, z ) <= akvaNivelo( x, z ) + 0o1/0o10 ) ) return false;
    for ( const s of konstruSpecoj ) {
      const difX = Math.sin( s.rot || 0o0 ), difZ = Math.cos( s.rot || 0o0 );
      const pordoX = s.x + difX * ( s.d / 0o2 + 0o14/0o10 );
      const pordoZ = s.z + difZ * ( s.d / 0o2 + 0o14/0o10 );
      if ( Math.hypot( x - pordoX, z - pordoZ ) < 0o4 ) return false;
      if ( Math.hypot( x - s.x, z - s.z ) < Math.max( s.w, s.d ) / 0o2 + 0o14/0o10 ) return false;
    }
    return !lampLokoj.some( l => Math.hypot( x - l.x, z - l.z ) < 0o2 );
  };
  return ( x, z, bazaY, rotacio = Math.PI / 0o4, serĉu = true ): boolean => {
    const kandidatoj: [ number, number ][] = [ [ x, z ] ];
    if ( bazaY === undefined && serĉu ) {
      for ( const r of [ 0o1/0o2, 0o1, 0o3/0o2, 0o2, 0o3 ] ) {
        for ( let i = 0; i < 0o20; i++ ) {
          const angulo = i * Math.PI * 0o2 / 0o20;
          kandidatoj.push([ x + Math.cos( angulo ) * r, z + Math.sin( angulo ) * r ]);
        }
      }
    }
    for ( const [ px, pz ] of kandidatoj ) {
      if ( !estasLibera(px, pz, bazaY === undefined) ) continue;
      lampLokoj.push({ x: px, z: pz, y: bazaY ?? alteco( px, pz ), rotacio });
      return true;
    }
    return false;
  };
}

export function kreiKvarLampAldonilon(
  aldoni: LampAldonilo,
  lampLokoj: LampLoko[],
): ( x: number, z: number, distanco: number ) => void {
  return ( x, z, distanco ) => {
    if ( lampLokoj.some( l => l.grupCentro
      && Math.hypot( l.grupCentro[0] - x, l.grupCentro[1] - z ) < 0o1/0o100 ) ) return;
    const ofsetoj: [ number, number ][] = [ [ 0, 0 ] ];
    for ( const r of [ 0o1/0o2, 0o1, 0o3/0o2, 0o2, 0o3 ] ) {
      for ( let i = 0; i < 0o20; i++ ) {
        const angulo = i * Math.PI * 0o2 / 0o20;
        ofsetoj.push([ Math.cos(angulo) * r, Math.sin(angulo) * r ]);
      }
    }
    for ( const [ ox, oz ] of ofsetoj ) {
      const unua = lampLokoj.length;
      for ( const dx of [ -distanco, distanco ] ) {
        for ( const dz of [ -distanco, distanco ] ) {
          if ( !aldoni(x + ox + dx, z + oz + dz, undefined, undefined, false) ) {
            lampLokoj.splice(unua);
            break;
          }
        }
        if ( lampLokoj.length === unua ) break;
      }
      if ( lampLokoj.length - unua !== 0o4 ) continue;
      for ( let i = unua; i < lampLokoj.length; i++ )
        lampLokoj[i].grupCentro = [ x, z ];
      return;
    }
  };
}
