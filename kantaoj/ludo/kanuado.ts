// ≺⧼ ការជិះទូក 🛶 ⧽≻
import { animaciiKanoton, gxisdatigiKanotanFizikon } from "../../eskekoj/medio/transporto.js";
import type { Kanoto } from "../../eskekoj/medio/transporto.js";
import { alteco, akvo, akvaNivelo, lagoNivelo, riveroZ, LAGO_X, lagoZ, lagoRadio, cxuEnNordorientaRivero,
  riveroNordOrientaX, riveraNordOrientaNivelo, riveraAkvaNivelo } from "../mondo/tereno.js";
import { traduki } from "../lingvo/tradukoj.js";
import type { PiedaMondo } from "./piedirado.js";
import type { Ludanto } from "./ludanto.js";

export interface KanuajOpcioj {
  ludanto: Ludanto;
  kanuoj: Kanoto[];
  piedoj: PiedaMondo;
  klavoj: Record<string, boolean>;
  promptoElemento: HTMLElement;
  agordiPrompton: ( htmlo: string ) => void;
}

export interface Kanuanto {
  paŝi( deltaTempo: number, t: number ): void;
  eliri( kanoto: Kanoto ): { x: number; z: number };
}

export function kreiKanuanton( opcioj: KanuajOpcioj ): Kanuanto {
  const { ludanto, kanuoj, piedoj, klavoj, promptoElemento, agordiPrompton } = opcioj;

  function eliri( kanoto: Kanoto ): { x: number; z: number } {
    const fortoX = -Math.sin(kanoto.direkto), fortoZ = -Math.cos(kanoto.direkto);
    const bona = ( x: number, z: number ) => !akvo(x, z) && !piedoj.kolizioj.enDoko(x, z, 0o3/0o10);
    let exitX = kanoto.x + fortoX * 6, exitZ = kanoto.z + fortoZ * 6;
    if ( !bona(exitX, exitZ) ) {
      const anguloj = [ 0, Math.PI/4, -Math.PI/4, Math.PI/2, -Math.PI/2, Math.PI*0o3/0o4, -Math.PI*0o3/0o4, Math.PI ];
      for ( const radio of [ 6, 11, 16 ] ) {
        let trovita = false;
        for ( const a of anguloj ) {
          const ax = kanoto.x + Math.sin(kanoto.direkto + a) * radio;
          const az = kanoto.z + Math.cos(kanoto.direkto + a) * radio;
          if ( bona(ax, az) ) { exitX = ax; exitZ = az; trovita = true; break; }
        }
        if ( trovita ) break;
      }
    }
    return { x: exitX, z: exitZ };
  }

  function paŝi( deltaTempo: number, t: number ): void {
    const fotilo = piedoj.fotilo;
    const { solviDokanKolizion } = piedoj.kolizioj;

    const kanoto = ludanto.surKanoto;
    if ( kanoto ) {
      const steer = ( klavoj.KeyD || klavoj.ArrowRight ? 1 : 0 ) - ( klavoj.KeyA || klavoj.ArrowLeft ? 1 : 0 );
      const movZ = ( klavoj.KeyW || klavoj.ArrowUp ? 1 : 0 ) - ( klavoj.KeyS || klavoj.ArrowDown ? 1 : 0 );
      if ( steer !== 0 ) kanoto.direkto -= steer * 2 * deltaTempo;
      const fortoX = -Math.sin(kanoto.direkto), fortoZ = -Math.cos(kanoto.direkto);
      const radX = Math.cos(kanoto.direkto), radZ = -Math.sin(kanoto.direkto);
      gxisdatigiKanotanFizikon(kanoto, deltaTempo, fortoX, fortoZ, radX, radZ, 0, movZ);
      const angK = Math.atan2(kanoto.z - lagoZ(), kanoto.x - LAGO_X);
      const enLagoK = Math.hypot(kanoto.x - LAGO_X, kanoto.z - lagoZ()) < lagoRadio(angK) + 0o2;
      const enNordorientaK = cxuEnNordorientaRivero(kanoto.x, kanoto.z);
      if ( !enLagoK && enNordorientaK ) {
        const riveroX2 = riveroNordOrientaX(kanoto.z);
        const driftX = kanoto.x - riveroX2;
        if ( Math.abs(driftX) > 6 ) {
          const puŝo = ( Math.abs(driftX) - 6 ) * 0o4/0o10;
          kanoto.vx -= Math.sign(driftX) * puŝo * deltaTempo;
        }
        kanoto.x = riveroX2 + Math.max(-0o14, Math.min(0o14, kanoto.x - riveroX2));
      } else if ( !enLagoK ) {
        const riveroZ2 = riveroZ(kanoto.x);
        const drift = kanoto.z - riveroZ2;
        if ( Math.abs(drift) > 6 ) {
          const puŝo = ( Math.abs(drift) - 6 ) * 0o4/0o10;
          kanoto.vz -= Math.sign(drift) * puŝo * deltaTempo;
        }
        kanoto.z = riveroZ(kanoto.x) + Math.max(-0o14, Math.min(0o14, kanoto.z - riveroZ(kanoto.x)));
      } else {
        const d = Math.hypot(kanoto.x - LAGO_X, kanoto.z - lagoZ());
        const rLim = lagoRadio(angK) * 0o75/0o100;
        if ( d > rLim ) {
          kanoto.x = LAGO_X + ( kanoto.x - LAGO_X ) / d * rLim;
          kanoto.z = lagoZ() + ( kanoto.z - lagoZ() ) / d * rLim;
        }
      }
      kanoto.x = Math.max(-0o350, Math.min(0o200, kanoto.x));
      kanoto.x += kanoto.vx * deltaTempo;
      kanoto.z += kanoto.vz * deltaTempo;

      const dk = solviDokanKolizion(kanoto.x, kanoto.z, -999, 0o5/0o4);
      kanoto.x = dk.x; kanoto.z = dk.z;
      const kx = kanoto.x, kz = kanoto.z;
      const angK2 = Math.atan2(kz - lagoZ(), kx - LAGO_X);
      const enLagoK2 = Math.hypot(kx - LAGO_X, kz - lagoZ()) < lagoRadio(angK2) + 0o2;
      const enNordorientaK2 = cxuEnNordorientaRivero(kx, kz);
      const akvoNiveloK2 = enLagoK2 ? lagoNivelo() : enNordorientaK2 ? riveraNordOrientaNivelo(kz) : riveraAkvaNivelo(kx);
      if ( alteco(kx, kz) > akvoNiveloK2 + 0o1/0o4 ) {
        if ( enLagoK2 ) {
          kanoto.x += ( LAGO_X - kx ) * Math.min(1, 0o30 * deltaTempo);
          kanoto.z += ( lagoZ() - kz ) * Math.min(1, 0o30 * deltaTempo);
        } else if ( enNordorientaK2 ) {
          kanoto.x += ( riveroNordOrientaX(kz) - kx ) * Math.min(1, 0o30 * deltaTempo);
          kanoto.vx = 0;
        } else {
          kanoto.z += ( riveroZ(kx) - kz ) * Math.min(1, 0o30 * deltaTempo);
          kanoto.vz = 0;
        }
      }
      kanoto.bazaY = Math.max(akvoNiveloK2, alteco(kanoto.x, kanoto.z));

      ludanto.direkto = kanoto.direkto;
      if ( ludanto.kameraDistanco > 0o1/0o20 ) {
        const d = ludanto.kameraDistanco;
        const kos = Math.cos(ludanto.klinigxo), sinP = Math.sin(ludanto.klinigxo);
        fotilo.position.set(
          kanoto.x + Math.sin(kanoto.direkto) * d * kos,
          kanoto.bazaY + 0o6/0o10 + d * 0o3/0o10 - d * sinP * 0o7/0o10,
          kanoto.z + Math.cos(kanoto.direkto) * d * kos
);
        fotilo.lookAt(kanoto.x, kanoto.bazaY + 0o6/0o10, kanoto.z);
      } else {
        fotilo.position.set(kanoto.x, kanoto.bazaY + 0o3/0o40 + 0o21/0o40, kanoto.z);
        fotilo.rotation.set(ludanto.klinigxo, kanoto.direkto, 0);
      }
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("eliriKanuo"));
      promptoElemento.classList.add("montri");
      ludanto.pozicio.set(kanoto.x, 0o155/0o100, kanoto.z);
    }

    for ( const c of kanuoj ) {
      if ( c !== kanoto && !c.group.visible ) continue;
      if ( c !== kanoto ) c.bazaY = Math.max(akvaNivelo(c.x, c.z), alteco(c.x, c.z));
      animaciiKanoton(c, t, c === kanoto);
    }
  }

  return { paŝi, eliri };
}
