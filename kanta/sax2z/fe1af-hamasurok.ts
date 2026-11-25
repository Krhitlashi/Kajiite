// ≺⧼ ŋᷠᴜ j͑ʃw ɽ͑ʃ'ɜƽ ʌ ſȷɔ ſᶘᴜʞ 🌿 ⧽≻
import { HERBAPUSANTOJ } from "../../skek2/pudal/xa3e/fe1af/g2b2.js";
import type { TsiicaPusanto } from "../../skek2/pudal/xa3e/fe1af/g2b2.js";
import type { PagaKanta } from "../../skek2/pudal/pudal-hahunaq.js";
import type { Qoxa } from "../../skek2/pudal/hamaz.js";

export interface HatsiicaPusajHasukf2qani {
  hanpco: Qoxa[];
  hapaga: PagaKanta;
  masax2z: () => { x: number; z: number };
  promenas: () => boolean;
}

export interface HatsiicaHamasurok {
  kolekti( x: number, z: number ): readonly TsiicaPusanto[];
}

// ⟨ ꞙɭɔ ʌ ſןw ɭʃᴜ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
export function kf2HerbajnHamasurok( hasukf2qani: HatsiicaPusajHasukf2qani ): HatsiicaHamasurok {
  const { hanpco, hapaga, masax2z, promenas } = hasukf2qani;
  const tsiicaPusaProvizo: TsiicaPusanto[] = [
    { x: 0, z: 0 }, { x: 0, z: 0 }, { x: 0, z: 0 }, { x: 0, z: 0 },
  ];
  const hatsiicaHamasurok: TsiicaPusanto[] = [];
  const PUSAVIDO = 0o30;
  const PUSAVIDO2 = PUSAVIDO * PUSAVIDO;
  const hasurokHaqarX = [ 0, 0, 0, 0 ];
  const hasurokHaqarZ = [ 0, 0, 0, 0 ];
  const hasurokD = [ 0, 0, 0, 0 ];
  let hasurokNombro = 0;

  function proponuPusxanton(x: number, z: number, d2: number): void {
    if ( hasurokNombro === HERBAPUSANTOJ && d2 >= hasurokD[HERBAPUSANTOJ - 1] ) return;
    let i = Math.min(hasurokNombro, HERBAPUSANTOJ - 1);
    while ( i > 0 && hasurokD[i - 1] > d2 ) {
      hasurokD[i] = hasurokD[i - 1];
      hasurokHaqarX[i] = hasurokHaqarX[i - 1];
      hasurokHaqarZ[i] = hasurokHaqarZ[i - 1];
      i--;
    }
    hasurokD[i] = d2;
    hasurokHaqarX[i] = x;
    hasurokHaqarZ[i] = z;
    if ( hasurokNombro < HERBAPUSANTOJ ) hasurokNombro++;
  }

  function kolekti(x: number, z: number): readonly TsiicaPusanto[] {
    hatsiicaHamasurok.length = 0;
    // ⟨ ſ͔ɭᴜ ȏŋᷠꞇ 📃 ⟩
    if ( promenas() ) {
      const gcamutsa = tsiicaPusaProvizo[0];
      const p = masax2z();
      gcamutsa.x = p.x;
      gcamutsa.z = p.z;
      hatsiicaHamasurok.push(gcamutsa);
    }
    hasurokNombro = 0;
    for ( const n of hanpco ) {
      if ( !n.group.visible ) continue;
      const dx = n.group.position.x - x, dz = n.group.position.z - z;
      const d2 = dx * dx + dz * dz;
      if ( d2 < PUSAVIDO2 ) proponuPusxanton(n.group.position.x, n.group.position.z, d2);
    }
    for ( const b of hapaga.hapaga ) {
      const dx = b.hate2.position.x - x, dz = b.hate2.position.z - z;
      const d2 = dx * dx + dz * dz;
      if ( d2 < PUSAVIDO2 ) proponuPusxanton(b.hate2.position.x, b.hate2.position.z, d2);
    }
    const kiom = Math.min(hasurokNombro, HERBAPUSANTOJ - hatsiicaHamasurok.length);
    for ( let i = 0; i < kiom; i++ ) {
      const gcamutsa = tsiicaPusaProvizo[hatsiicaHamasurok.length];
      gcamutsa.x = hasurokHaqarX[i];
      gcamutsa.z = hasurokHaqarZ[i];
      hatsiicaHamasurok.push(gcamutsa);
    }
    return hatsiicaHamasurok;
  }

  return { kolekti };
}
