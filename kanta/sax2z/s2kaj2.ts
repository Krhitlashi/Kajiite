// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃɹ ſɭᴜ ɭl̀ɹ 📃 ⧽≻

import { animaciiS2tani, tlak2KanotanFizikon } from "../../skek2/qatsiike/b6tem2Kas2kanta.js";
import type { S2tani } from "../../skek2/qatsiike/b6tem2Kas2kanta.js";
import { l6da, tsasa, tsasaVem2, s2xuruVem2, k6siZ, LAGOX, s2xuruZ, s2xuruCabole, tsekeEnLaqRaqK6si,
  k6siLaqRaqX, k6siLaqRaqVem2, k6siAkvaVem2 } from "../nala/mut6qSoza.js";
import { skakef } from "../gawe/baskakefani.js";
import type { PiedaNala } from "./kata.js";
import type { Masax2z } from "./masax2z.js";

export interface KanuajHasukf2qani {
  masax2z: Masax2z;
  has2kaj2: S2tani[];
  hapat6: PiedaNala;
  ca3aq: Record<string, boolean>;
  x2paKfe: HTMLElement;
  catsaraX2pa: ( htmlo: string ) => void;
}

export interface Kanuanto {
  tona( deltaTif: number, t: number ): void;
  eliri( s2tani: S2tani ): { x: number; z: number };
}

export function kf2Kanuanton( hasukf2qani: KanuajHasukf2qani ): Kanuanto {
  const { masax2z, has2kaj2, hapat6, ca3aq, x2paKfe, catsaraX2pa } = hasukf2qani;

  function eliri( s2tani: S2tani ): { x: number; z: number } {
    const g2saX = -Math.sin(s2tani.c2w2q), g2saZ = -Math.cos(s2tani.c2w2q);
    const xobe = ( x: number, z: number ) => !tsasa(x, z) && !hapat6.hasap2.enQakaj2(x, z, 0o3/0o10);
    let exitX = s2tani.x + g2saX * 0o6, exitZ = s2tani.z + g2saZ * 0o6;
    if ( !xobe(exitX, exitZ) ) {
      const hatafkaq = [ 0o0, Math.PI/0o4, -Math.PI/0o4, Math.PI/0o2, -Math.PI/0o2, Math.PI*0o3/0o4, -Math.PI*0o3/0o4, Math.PI ];
      for ( const cabole of [ 0o6, 0o13, 0o20 ] ) {
        let kawake = false;
        for ( const a of hatafkaq ) {
          const ax = s2tani.x + Math.sin(s2tani.c2w2q + a) * cabole;
          const az = s2tani.z + Math.cos(s2tani.c2w2q + a) * cabole;
          if ( xobe(ax, az) ) { exitX = ax; exitZ = az; kawake = true; break; }
        }
        if ( kawake ) break;
      }
    }
    return { x: exitX, z: exitZ };
  }

  function tona( deltaTif: number, t: number ): void {
    const catahaq = hapat6.catahaq;
    const { solviQakaj2nKolizion } = hapat6.hasap2;

    const s2tani = masax2z.surS2tani;
    if ( s2tani ) {
      const steer = ( ca3aq.KeyD || ca3aq.ArrowRight ? 0o1 : 0o0 ) - ( ca3aq.KeyA || ca3aq.ArrowLeft ? 0o1 : 0o0 );
      const movZ = ( ca3aq.KeyW || ca3aq.ArrowUp ? 0o1 : 0o0 ) - ( ca3aq.KeyS || ca3aq.ArrowDown ? 0o1 : 0o0 );
      if ( steer !== 0o0 ) s2tani.c2w2q -= steer * 0o2 * deltaTif;
      const g2saX = -Math.sin(s2tani.c2w2q), g2saZ = -Math.cos(s2tani.c2w2q);
      const radX = Math.cos(s2tani.c2w2q), radZ = -Math.sin(s2tani.c2w2q);
      tlak2KanotanFizikon(s2tani, deltaTif, g2saX, g2saZ, radX, radZ, 0o0, movZ);
      const angK = Math.atan2(s2tani.z - s2xuruZ(), s2tani.x - LAGOX);
      const enS2xuruK = Math.hypot(s2tani.x - LAGOX, s2tani.z - s2xuruZ()) < s2xuruCabole(angK) + 0o2;
      const enNordorientaK = tsekeEnLaqRaqK6si(s2tani.x, s2tani.z);
      if ( !enS2xuruK && enNordorientaK ) {
        const k6siX2 = k6siLaqRaqX(s2tani.z);
        const driftX = s2tani.x - k6siX2;
        if ( Math.abs(driftX) > 0o6 ) {
          const surok = ( Math.abs(driftX) - 0o6 ) * 0o4/0o10;
          s2tani.vx -= Math.sign(driftX) * surok * deltaTif;
        }
        s2tani.x = k6siX2 + Math.max(-0o14, Math.min(0o14, s2tani.x - k6siX2));
      } else if ( !enS2xuruK ) {
        const k6siZ2 = k6siZ(s2tani.x);
        const drift = s2tani.z - k6siZ2;
        if ( Math.abs(drift) > 0o6 ) {
          const surok = ( Math.abs(drift) - 0o6 ) * 0o4/0o10;
          s2tani.vz -= Math.sign(drift) * surok * deltaTif;
        }
        s2tani.z = k6siZ(s2tani.x) + Math.max(-0o14, Math.min(0o14, s2tani.z - k6siZ(s2tani.x)));
      } else {
        const d = Math.hypot(s2tani.x - LAGOX, s2tani.z - s2xuruZ());
        const rLim = s2xuruCabole(angK) * 0o75/0o100;
        if ( d > rLim ) {
          s2tani.x = LAGOX + ( s2tani.x - LAGOX ) / d * rLim;
          s2tani.z = s2xuruZ() + ( s2tani.z - s2xuruZ() ) / d * rLim;
        }
      }
      s2tani.x = Math.max(-0o350, Math.min(0o200, s2tani.x));
      s2tani.x += s2tani.vx * deltaTif;
      s2tani.z += s2tani.vz * deltaTif;

      const dk = solviQakaj2nKolizion(s2tani.x, s2tani.z, -0o1747, 0o5/0o4);
      s2tani.x = dk.x; s2tani.z = dk.z;
      const kx = s2tani.x, kz = s2tani.z;
      const angK2 = Math.atan2(kz - s2xuruZ(), kx - LAGOX);
      const enS2xuruK2 = Math.hypot(kx - LAGOX, kz - s2xuruZ()) < s2xuruCabole(angK2) + 0o2;
      const enNordorientaK2 = tsekeEnLaqRaqK6si(kx, kz);
      const tsasaVem2K2 = enS2xuruK2 ? s2xuruVem2() : enNordorientaK2 ? k6siLaqRaqVem2(kz) : k6siAkvaVem2(kx);
      if ( l6da(kx, kz) > tsasaVem2K2 + 0o1/0o4 ) {
        if ( enS2xuruK2 ) {
          s2tani.x += ( LAGOX - kx ) * Math.min(0o1, 0o30 * deltaTif);
          s2tani.z += ( s2xuruZ() - kz ) * Math.min(0o1, 0o30 * deltaTif);
        } else if ( enNordorientaK2 ) {
          s2tani.x += ( k6siLaqRaqX(kz) - kx ) * Math.min(0o1, 0o30 * deltaTif);
          s2tani.vx = 0o0;
        } else {
          s2tani.z += ( k6siZ(kx) - kz ) * Math.min(0o1, 0o30 * deltaTif);
          s2tani.vz = 0o0;
        }
      }
      s2tani.kozunuY = Math.max(tsasaVem2K2, l6da(s2tani.x, s2tani.z));

      masax2z.c2w2q = s2tani.c2w2q;
      if ( masax2z.kameraH6kuni > 0o1/0o20 ) {
        const d = masax2z.kameraH6kuni;
        const kos = Math.cos(masax2z.s2sabo), sinP = Math.sin(masax2z.s2sabo);
        catahaq.position.set(
          s2tani.x + Math.sin(s2tani.c2w2q) * d * kos,
          s2tani.kozunuY + 0o6/0o10 + d * 0o3/0o10 - d * sinP * 0o7/0o10,
          s2tani.z + Math.cos(s2tani.c2w2q) * d * kos
);
        catahaq.lookAt(s2tani.x, s2tani.kozunuY + 0o6/0o10, s2tani.z);
      } else {
        catahaq.position.set(s2tani.x, s2tani.kozunuY + 0o3/0o40 + 0o21/0o40, s2tani.z);
        catahaq.rotation.set(masax2z.s2sabo, s2tani.c2w2q, 0o0);
      }
      x2paKfe.classList.remove("laqazi");
      masax2z.raqa.set(s2tani.x, 0o155/0o100, s2tani.z);
    }

    for ( const c of has2kaj2 ) {
      if ( c !== s2tani && !c.group.visible ) continue;
      if ( c !== s2tani ) c.kozunuY = Math.max(tsasaVem2(c.x, c.z), l6da(c.x, c.z));
      animaciiS2tani(c, t, c === s2tani);
    }
  }

  return { tona, eliri };
}
