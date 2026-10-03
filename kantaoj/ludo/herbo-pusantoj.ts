// ≺⧼ អ្នករុញស្មៅ 🌿 ⧽≻
import { HERBA_PUSANTOJ } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/vento.js";
import type { HerbaPusanto } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/vento.js";
import type { BestoSistemo } from "../../eskekoj/shalaj-specioj/speco-tipoj.js";
import type { Figuro } from "../../eskekoj/shalaj-specioj/homoj.js";

export interface HerbajPusajOpcioj {
  npcoj: Figuro[];
  bestoj: BestoSistemo;
  ludanto: () => { x: number; z: number };
  promenas: () => boolean;
}

export interface HerbajPusantoj {
  kolekti( x: number, z: number ): readonly HerbaPusanto[];
}

// ⟨ គ្មានសំរាមរាល់ស៊ុម 📃 ⟩
export function kreiHerbajnPusantojn( opcioj: HerbajPusajOpcioj ): HerbajPusantoj {
  const { npcoj, bestoj, ludanto, promenas } = opcioj;
  const herbaPusaProvizo: HerbaPusanto[] = [
    { x: 0, z: 0 }, { x: 0, z: 0 }, { x: 0, z: 0 }, { x: 0, z: 0 },
  ];
  const herbajPusantoj: HerbaPusanto[] = [];
  const PUSA_VIDO = 0o30;
  const PUSA_VIDO2 = PUSA_VIDO * PUSA_VIDO;
  const pusxajLokojX = [ 0, 0, 0, 0 ];
  const pusxajLokojZ = [ 0, 0, 0, 0 ];
  const pusxajD = [ 0, 0, 0, 0 ];
  let pusxajNombro = 0;

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

  function kolekti(x: number, z: number): readonly HerbaPusanto[] {
    herbajPusantoj.length = 0;
    // ⟨ អ្នកលេង 📃 ⟩
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
