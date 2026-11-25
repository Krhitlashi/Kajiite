// ≺⧼ ſɟᴜ ſɟɹ ᶅſɹƽ ꞁȷ̀ᴜꞇ ʌ ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ 🏮 ⧽≻
import { VepaqSpec } from "../../../skek2/hapaq/satalaj/hahunaq.js";
import { l6da, tsasa, tsasaVem2 } from "../t6limaSoza.js";

export interface LampQar {
  x: number;
  z: number;
  y: number;
  s2sabo?: number;
  grupSost2?: [ number, number ];
}

export type LampAldonilo = ( x: number, z: number, kozunuY?: number, s2sabo?: number,
  serĉu?: boolean ) => boolean;

export function kf2LampAldonilon(
  vepaqPudalj: VepaqSpec[],
  lampHaqar: LampQar[],
): LampAldonilo {
  const estasKfekoc2kai = ( x: number, z: number, tsasaB: boolean ): boolean => {
    if ( tsasaB && ( tsasa( x, z ) || l6da( x, z ) <= tsasaVem2( x, z ) + 0o1/0o10 ) ) return false;
    for ( const s of vepaqPudalj ) {
      const difX = Math.sin( s.rot || 0o0 ), difZ = Math.cos( s.rot || 0o0 );
      const kevX = s.x + difX * ( s.d / 0o2 + 0o14/0o10 );
      const kevZ = s.z + difZ * ( s.d / 0o2 + 0o14/0o10 );
      if ( Math.hypot( x - kevX, z - kevZ ) < 0o4 ) return false;
      if ( Math.hypot( x - s.x, z - s.z ) < Math.max( s.w, s.d ) / 0o2 + 0o14/0o10 ) return false;
    }
    return !lampHaqar.some( l => Math.hypot( x - l.x, z - l.z ) < 0o2 );
  };
  return ( x, z, kozunuY, s2sabo = Math.PI / 0o4, serĉu = true ): boolean => {
    const hakandidato: [ number, number ][] = [ [ x, z ] ];
    if ( kozunuY === undefined && serĉu ) {
      for ( const r of [ 0o1/0o2, 0o1, 0o3/0o2, 0o2, 0o3 ] ) {
        for ( let i = 0; i < 0o20; i++ ) {
          const tafkaq = i * Math.PI * 0o2 / 0o20;
          hakandidato.push([ x + Math.cos( tafkaq ) * r, z + Math.sin( tafkaq ) * r ]);
        }
      }
    }
    for ( const [ px, pz ] of hakandidato ) {
      if ( !estasKfekoc2kai(px, pz, kozunuY === undefined) ) continue;
      lampHaqar.push({ x: px, z: pz, y: kozunuY ?? l6da( px, pz ), s2sabo });
      return true;
    }
    return false;
  };
}

export function kf2KvarLampAldonilon(
  tlunakani: LampAldonilo,
  lampHaqar: LampQar[],
): ( x: number, z: number, h6kuni: number ) => void {
  return ( x, z, h6kuni ) => {
    if ( lampHaqar.some( l => l.grupSost2
      && Math.hypot( l.grupSost2[0] - x, l.grupSost2[1] - z ) < 0o1/0o100 ) ) return;
    const ofsetoj: [ number, number ][] = [ [ 0, 0 ] ];
    for ( const r of [ 0o1/0o2, 0o1, 0o3/0o2, 0o2, 0o3 ] ) {
      for ( let i = 0; i < 0o20; i++ ) {
        const tafkaq = i * Math.PI * 0o2 / 0o20;
        ofsetoj.push([ Math.cos(tafkaq) * r, Math.sin(tafkaq) * r ]);
      }
    }
    for ( const [ ox, oz ] of ofsetoj ) {
      const xaqadi = lampHaqar.length;
      for ( const dx of [ -h6kuni, h6kuni ] ) {
        for ( const dz of [ -h6kuni, h6kuni ] ) {
          if ( !tlunakani(x + ox + dx, z + oz + dz, undefined, undefined, false) ) {
            lampHaqar.splice(xaqadi);
            break;
          }
        }
        if ( lampHaqar.length === xaqadi ) break;
      }
      if ( lampHaqar.length - xaqadi !== 0o4 ) continue;
      for ( let i = xaqadi; i < lampHaqar.length; i++ )
        lampHaqar[i].grupSost2 = [ x, z ];
      return;
    }
  };
}
