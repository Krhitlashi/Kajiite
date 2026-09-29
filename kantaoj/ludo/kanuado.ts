// ≺⧼ Kanuado 🛶 ⧽≻
// La kanua bloko — la direktado, la rivera kaj laga krampoj, la doka kolizio,
// la kanua fotilo, la elira prompto kaj la flosado de ĉiuj NE-rajdantaj kanuoj.
// La buklo vokas paŝi unu fojon ĉiukadre ( la rajda parto mem elektas ĉu ĝi agu )
// kaj la E-ago vokas eliri por trovi sekan bordon.
import { animaciiKanoton, gxisdatigiKanotanFizikon } from "../../eskekoj/medio/transporto.js";
import type { Kanoto } from "../../eskekoj/medio/transporto.js";
import { alteco, akvo, akvaNivelo, lagoNivelo, riveroZ, LAGO_X, lagoZ, lagoRadio, cxuEnNordorientaRivero,
  riveroNordOrientaX, riveraNordOrientaNivelo, riveraAkvaNivelo } from "../mondo/tereno.js";
import { traduki } from "../lingvo/tradukoj.js";
import type { PiedaMondo } from "./piedirado.js";
import type { Ludanto } from "./ludanto.js";

// KanuajOpcioj — la stato, la enigo, la kanuoj de la mondo ( ili venas de la
// urba sistemo ), la kolizia krado kaj la promptilo de la fasado.
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
  // eliri — la seka, ne-doka bordo-punkto apud la kanuo, por la E-eliro.
  eliri( kanoto: Kanoto ): { x: number; z: number };
}

export function kreiKanuanton( opcioj: KanuajOpcioj ): Kanuanto {
  const { ludanto, kanuoj, piedoj, klavoj, promptoElemento, agordiPrompton } = opcioj;

  // eliri — Serĉu sekan, ne-dokan punkton — unue antaŭ la pruo, poste ĉe
  // kreskantaj distancoj ( por eviti la maloftan kazon ke ĉiuj proksimaj
  // kandidatoj falas sur dokon aŭ en la akvon ).
  //     @param kanoto ( Kanoto , deviga ) - La kanuo, kiun la ludanto rajdas.
  //     @returns ( x, z ) - La elira punkto sur la bordo.
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

    // Kanota logiko
    const kanoto = ludanto.surKanoto;
    if ( kanoto ) {
      const steer = ( klavoj.KeyD || klavoj.ArrowRight ? 1 : 0 ) - ( klavoj.KeyA || klavoj.ArrowLeft ? 1 : 0 );
      const movZ = ( klavoj.KeyW || klavoj.ArrowUp ? 1 : 0 ) - ( klavoj.KeyS || klavoj.ArrowDown ? 1 : 0 );
      if ( steer !== 0 ) kanoto.direkto -= steer * 2 * deltaTempo;
      const fortoX = -Math.sin(kanoto.direkto), fortoZ = -Math.cos(kanoto.direkto);
      const radX = Math.cos(kanoto.direkto), radZ = -Math.sin(kanoto.direkto);
      gxisdatigiKanotanFizikon(kanoto, deltaTempo, fortoX, fortoZ, radX, radZ, 0, movZ);
      // En la lago ( aŭ ĝia tuja ĉirkaŭaĵo ) la kanuo naĝas sur la lagnivelo kaj
      // restu ene de la lagrando; ekstere la rivera krampo tenas ĝin sur la
      // ribono. La bufro ( +2 ) evitas ke la rivera krampo trenu la kanuon sur
      // sekan teron ĉe la orienta/norda lagbordo, kie la ribono jam finiĝas.
      const angK = Math.atan2(kanoto.z - lagoZ(), kanoto.x - LAGO_X);
      const enLagoK = Math.hypot(kanoto.x - LAGO_X, kanoto.z - lagoZ()) < lagoRadio(angK) + 0o2;
      const enNordorientaK = cxuEnNordorientaRivero(kanoto.x, kanoto.z);
      if ( !enLagoK && enNordorientaK ) {
        // Nordorienta rivereto — la rivero fluas laŭ x ( ne laŭ z ), do limigu
        // la kanuon al la rivercentro laŭ x ( ±0o14 ) anstataŭ laŭ z.
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
        // La rivero fluas sude ( z ≈ -0o160 ), do la malnova limo ±0o120 el la
        // epoko de la malnova rivero lasus la kanuon sur la teron. limigu la
        // kanuon al la rivera zono ( ±0o14 de la rivercentro ) anstataŭe.
        kanoto.z = riveroZ(kanoto.x) + Math.max(-0o14, Math.min(0o14, kanoto.z - riveroZ(kanoto.x)));
      } else {
        // En la lago la kanuo naĝas libere — restu ene de la lagrando.
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

      // Doka kolizio. La kanuo ne rajtas sub la platformojn ( la fotilo restus subtera ).
      const dk = solviDokanKolizion(kanoto.x, kanoto.z, -999, 0o5/0o4);
      kanoto.x = dk.x; kanoto.z = dk.z;
      // Ne lasu la kanuon en malprofunda akvo (tereno super la akva surfaco) —
      // repuŝu al la rivercentro por ke la ludanto ne restu subtera.
      const kx = kanoto.x, kz = kanoto.z;
      const angK2 = Math.atan2(kz - lagoZ(), kx - LAGO_X);
      const enLagoK2 = Math.hypot(kx - LAGO_X, kz - lagoZ()) < lagoRadio(angK2) + 0o2;
      const enNordorientaK2 = cxuEnNordorientaRivero(kx, kz);
      const akvoNiveloK2 = enLagoK2 ? lagoNivelo() : enNordorientaK2 ? riveraNordOrientaNivelo(kz) : riveraAkvaNivelo(kx);
      if ( alteco(kx, kz) > akvoNiveloK2 + 0o1/0o4 ) {
        // Repuŝu al la akvocentro pli forte kaj haltigu la bankan drivon, por ke
        // la kanuo ne restu banita en malprofunda akvo. En la lago la centro estas
        // la lagcentro; en la nordorienta rivereto la rivercentro laŭ x; en la
        // cxefa rivero la rivercentro laŭ z.
        if ( enLagoK2 ) {
          kanoto.x += ( LAGO_X - kx ) * Math.min(1, 0o30 * deltaTempo);
          kanoto.z += ( lagoZ() - kz ) * Math.min(1, 0o30 * deltaTempo);
        } else if ( enNordorientaK2 ) {
          // La rivereto fluas laŭ x — repuŝu laŭ x kaj haltigu la x-drivon.
          kanoto.x += ( riveroNordOrientaX(kz) - kx ) * Math.min(1, 0o30 * deltaTempo);
          kanoto.vx = 0;
        } else {
          kanoto.z += ( riveroZ(kx) - kz ) * Math.min(1, 0o30 * deltaTempo);
          kanoto.vz = 0;
        }
      }
      // Levu la kanu-bazon super la terenon. En malprofunda akvo la akva nivelo
      // estus SUB la planko, do la kanuo kaj la fotilo enirus la teron.
      kanoto.bazaY = Math.max(akvoNiveloK2, alteco(kanoto.x, kanoto.z));

      ludanto.direkto = kanoto.direkto;
      if ( ludanto.kameraDistanco > 0o1/0o20 ) {
        // Tria persono — la fotilo orbitas malantaux la kanuo.
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

    // Kanotaj animacioj. Ĉiu NE-rajdanta kanuo flosas sur la REALA akvosurfaco
    // ( la sama krampita nivelo kiel la akvomesho kaj la rajdanta branĉo ), ne sur
    // la kruda akvoY de la naskiĝloko — tiu povas malsami ĝis ~2 unuoj kaj lasus
    // la kanuon duone droninta. La plafono ( max kun la tereno ) evitas ke la
    // kanuo enprofundigu en malprofundan bordon.
    for ( const c of kanuoj ) {
      // Malproksima kanuo ne animaciiĝas — ĝi reaperos ĉe sia loko sen salto.
      if ( c !== kanoto && !c.group.visible ) continue;
      if ( c !== kanoto ) c.bazaY = Math.max(akvaNivelo(c.x, c.z), alteco(c.x, c.z));
      animaciiKanoton(c, t, c === kanoto);
    }
  }

  return { paŝi, eliri };
}
