// ≺⧼ ផ្លូវ 🛣️ ⧽≻
import * as THREE from "three";
import { kreiGeometriajnBufrojn, kreiVojajnBendojn, kreiVojojnMaterialojn, specimeniAngulojn } from "./vojoj/bufroj.js";
import { konstruiRondajnKapojn } from "./vojoj/kapoj.js";
import { VOJA_DIKECO, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO, VOJA_TRUA_DUONO } from "./vojoj/mezuroj.js";
import { konstruiSegmentonEnBufrojn, kreiSegmentajnPartojn } from "./vojoj/segmentoj.js";
import { vojSuprajxoj, type VojDifino } from "./vojoj/tipoj.js";

export function konstruiVojojn(sceno: THREE.Scene,
  defs: VojDifino[],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  kunigoj: [ number, number ][] = []
): THREE.Vector3[] {
  const samples: THREE.Vector3[] = [];
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -2, -4, -1, -1);

  const bufroj = kreiGeometriajnBufrojn();
  for ( const def of defs ) {
    const defAlt = def.heightFn || heightFn;
    for ( let i = 0; i < def.pts.length - 1; i++ ) {
      const [ aX, aZ ] = def.pts[i];
      const [ bX, bZ ] = def.pts[i + 1];
      // ⟨ រន្ធភ្ជាប់ 📃 ⟩
      const longo = Math.hypot(bX - aX, bZ - aZ);
      const bendoj = kreiVojajnBendojn(def.w, supraMaterialo, bordaMaterialo);
      const ndx = ( bX - aX ) / longo, ndz = ( bZ - aZ ) / longo;
      for ( const [ t0, t1, konstruu ] of kreiSegmentajnPartojn(aX, aZ, bX, bZ, longo, kunigoj) ) {
        const px1 = aX + ndx * t0, pz1 = aZ + ndz * t0;
        const px2 = aX + ndx * t1, pz2 = aZ + ndz * t1;
        if ( konstruu ) {
          konstruiSegmentonEnBufrojn(px1, pz1, px2, pz2, bendoj, VOJA_DIKECO, defAlt, bufroj, def.glata === true);
          continue;
        }
        const mX = ( px1 + px2 ) / 2, mZ = ( pz1 + pz2 ) / 2;
        const kunigaSupro = specimeniAngulojn(mX, mZ, VOJA_EKSTERA_DUONO, VOJA_EKSTERA_DUONO, defAlt).maksimumo
          + VOJA_SUPRO_LEVIGXO;
        vojSuprajxoj.push({ x1: px1, z1: pz1, x2: px2, z2: pz2, duono: VOJA_EKSTERA_DUONO,
          y0: kunigaSupro, y1: kunigaSupro });
      }
      const nombro = Math.max(1, Math.round(longo / 2));
      for ( let k = 0; k <= nombro; k++ ) {
        const t = k / nombro;
        const sx = aX + ( bX - aX ) * t;
        const sz = aZ + ( bZ - aZ ) * t;
        samples.push(new THREE.Vector3(sx, defAlt(sx, sz), sz));
      }
    }
  }
  bufroj.kunigi(sceno);
  // ⟨ ចុងមូលស្វ័យប្រវត្តិ 📃 ⟩
  const kapoj = new Map<( x: number, z: number ) => number, { nodoj: [ number, number ][]; direktoj: [ number, number ][] }>();
  const kapoVidita: [ number, number ][] = [];
  const finokalkulo = new Map<string, number>();
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.kapoj !== true ) continue;
    for ( const pto of [ def.pts[0], def.pts[def.pts.length - 1] ] ) {
      const klavo = pto[0] + "," + pto[1];
      finokalkulo.set(klavo, ( finokalkulo.get(klavo) ?? 0 ) + 1);
    }
  }
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.kapoj !== true ) continue;
    if ( def.stuparo === true ) continue;
    const finoj: [ [ number, number ], [ number, number ] ][] = [
      [ def.pts[0], def.pts[1] ],
      [ def.pts[def.pts.length - 1], def.pts[def.pts.length - 2] ],
    ];
    for ( const [ fino, najbaro ] of finoj ) {
      const dx = fino[0] - najbaro[0], dz = fino[1] - najbaro[1];
      const direktaLongo = Math.hypot(dx, dz);
      if ( direktaLongo < 0o1/0o100 ) continue;
      if ( ( finokalkulo.get(fino[0] + "," + fino[1]) ?? 0 ) > 1 ) continue;
      if ( kapoVidita.some(([ vx, vz ]) => Math.hypot(fino[0] - vx, fino[1] - vz) < 0o1/0o100) ) continue;
      let enTruo = false;
      for ( const [ kX, kZ ] of kunigoj ) {
        if ( Math.hypot(fino[0] - kX, fino[1] - kZ) < VOJA_TRUA_DUONO + 0o1/0o100 ) { enTruo = true; break; }
      }
      if ( enTruo ) continue;
      kapoVidita.push([ fino[0], fino[1] ]);
      const defAlt = def.heightFn || heightFn;
      let grupo = kapoj.get(defAlt);
      if ( !grupo ) { grupo = { nodoj: [], direktoj: [] }; kapoj.set(defAlt, grupo); }
      grupo.nodoj.push([ fino[0], fino[1] ]);
      grupo.direktoj.push([ dx / direktaLongo, dz / direktaLongo ]);
    }
  }
  for ( const [ altFn, grupo ] of kapoj ) {
    konstruiRondajnKapojn(sceno, grupo.nodoj, grupo.direktoj, altFn, dioritaMaterialo, andezitaMaterialo);
  }
  return samples;
}
