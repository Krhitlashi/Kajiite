// ≺⧼ ផ្លូវ 🛣️ ⧽≻
import * as THREE from "three";
import { kreiGeometriajnBufrojn, kreiVojajnBendojn, kreiVojojnMaterialojn } from "./vojoj/bufroj.js";
import { konstruiRondajnKapojn } from "./vojoj/kapoj.js";
import { kreiNivelanProfilon } from "./vojoj/niveloj.js";
import { VOJA_DIKECO, VOJA_SUPRO_LEVIGXO,
  VOJA_TRUA_DUONO } from "./vojoj/mezuroj.js";
import { konstruiGlatanSegmenton, konstruiSegmentonEnBufrojn,
  konstruiUnuformajnStuparajnSegmentojn, kreiEksteranDuonon,
  kreiSegmentajnPartojn } from "./vojoj/segmentoj.js";
import { vojSuprajxoj, type VojDifino, type VojOpcioj } from "./vojoj/tipoj.js";

// ⟪ ការសាងសង់បណ្តាញផ្លូវ 🏗️ ⟫
export function konstruiVojojn(sceno: THREE.Scene,
  defs: VojDifino[],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  kunigoj: [ number, number ][] = [],
  opcioj: VojOpcioj = {}
): THREE.Vector3[] {
  const { akvaFn, grundoFn = heightFn } = opcioj;
  const samples: THREE.Vector3[] = [];
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -2, -4, -1, -1);

  const bufroj = kreiGeometriajnBufrojn();
  // ⟨ កម្រិតផ្លូវនៅចុងក្រោយ ៖ ប្រើសម្រាប់មួកផ្លូវដែលឆ្លងចូលមកចានភ្ជាប់ ។ 📃 ⟩
  const kapoAltoj = new Map<VojDifino, { komenco: number | null; fino: number | null }>();

  for ( const def of defs ) {
    const defAlt = def.heightFn || heightFn;
    const defGrundo = def.grundoFn ?? grundoFn;
    const bendoj = kreiVojajnBendojn(def.w, supraMaterialo, bordaMaterialo);
    const eksteraDuono = kreiEksteranDuonon(bendoj);
    kapoAltoj.set( def, { komenco: null, fino: null } );
    const notiFinon = ( komenco: number | null, fino: number | null ): void => {
      const kapo = kapoAltoj.get(def)!;
      kapo.komenco = komenco;
      kapo.fino = fino;
    };
    if ( def.stuparo === true ) {
      let unua: number | null = null, lasta: number | null = null;
      for ( let i = 0; i < def.pts.length - 1; i++ ) {
        const [ aX, aZ ] = def.pts[i];
        const [ bX, bZ ] = def.pts[i + 1];
        const rezulto = konstruiUnuformajnStuparajnSegmentojn(aX, aZ, bX, bZ, bendoj, VOJA_DIKECO,
          defAlt, defGrundo, bufroj);
        if ( rezulto ) {
          if ( unua === null ) unua = rezulto.unua;
          lasta = rezulto.lasta;
        }
        aldonuSpecimenojn(samples, aX, aZ, bX, bZ, defAlt);
      }
      notiFinon(unua, lasta);
      continue;
    }
    // ⟨ កម្រិតទាំងអស់កំណត់ម្តង មុនការសាងសង់ ៖ ដូច្នេះជំហានមិនអាចលោត
    // ឬធ្លាក់ចូលរណ្តៅខ្លីនៅចន្លោះចម្រៀកបានទេ ។ 📃 ⟩
    const profilo = def.glata === true
      ? null
      : kreiNivelanProfilon(def.pts, eksteraDuono, defAlt, akvaFn);
    let unua: number | null = null, lasta: number | null = null;
    let starto = 0;
    for ( let i = 0; i < def.pts.length - 1; i++ ) {
      const [ aX, aZ ] = def.pts[i];
      const [ bX, bZ ] = def.pts[i + 1];
      const longo = Math.hypot(bX - aX, bZ - aZ);
      if ( longo < 0o1/0o100 ) continue;
      const ndx = ( bX - aX ) / longo, ndz = ( bZ - aZ ) / longo;
      for ( const [ t0, t1, konstruuPec ] of kreiSegmentajnPartojn(aX, aZ, bX, bZ, longo, kunigoj) ) {
        const px1 = aX + ndx * t0, pz1 = aZ + ndz * t0;
        const px2 = aX + ndx * t1, pz2 = aZ + ndz * t1;
        if ( konstruuPec ) {
          const rezulto = profilo
            ? konstruiSegmentonEnBufrojn(px1, pz1, px2, pz2, starto + t0, starto + t1, bendoj,
              profilo, bufroj, VOJA_DIKECO, defGrundo)
            : konstruiGlatanSegmenton(px1, pz1, px2, pz2, bendoj, VOJA_DIKECO, defAlt, defGrundo, bufroj);
          if ( rezulto ) {
            if ( unua === null ) unua = rezulto.unua;
            lasta = rezulto.lasta;
          }
          continue;
        }
        // ⟨ រន្ធភ្ជាប់ ៖ ចានភ្ជាប់គ្របទីនោះ , តែកម្រិតត្រូវកត់ទុកសម្រាប់ការប៉ះទង្គិច ។ 📃 ⟩
        const mX = ( px1 + px2 ) / 2, mZ = ( pz1 + pz2 ) / 2;
        const kunigaSupro = profilo
          ? profilo.altoCxe(starto + ( t0 + t1 ) / 2)
          : Math.max(defAlt(mX, mZ)) + 0o1/0o100 + VOJA_DIKECO;
        vojSuprajxoj.push({ x1: px1, z1: pz1, x2: px2, z2: pz2, duono: eksteraDuono,
          y0: kunigaSupro, y1: kunigaSupro });
      }
      aldonuSpecimenojn(samples, aX, aZ, bX, bZ, defAlt);
      starto += longo;
    }
    notiFinon(unua, lasta);
  }
  bufroj.kunigi(sceno);

  // ⟪ មួកផ្លូវចុងសេរី 🌗 ⟫
  const kapoj = new Map<( x: number, z: number ) => number, {
    nodoj: [ number, number ][]; direktoj: [ number, number ][];
    supraj: number[]; larĝoj: number[]; }>();
  const finokalkulo = new Map<string, number>();
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.kapoj !== true ) continue;
    for ( const pto of [ def.pts[0], def.pts[def.pts.length - 1] ] ) {
      const klavo = pto[0] + "," + pto[1];
      finokalkulo.set(klavo, ( finokalkulo.get(klavo) ?? 0 ) + 1);
    }
  }
  const kapoVidita: [ number, number ][] = [];
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.kapoj !== true || def.stuparo === true ) continue;
    const kapo = kapoAltoj.get( def );
    const finoj: [ [ number, number ], [ number, number ], number | null ][] = [
      [ def.pts[0], def.pts[1], kapo?.komenco ?? null ],
      [ def.pts[def.pts.length - 1], def.pts[def.pts.length - 2], kapo?.fino ?? null ],
    ];
    for ( const [ fino, najbaro, supraY ] of finoj ) {
      const dx = fino[0] - najbaro[0], dz = fino[1] - najbaro[1];
      const direktaLongo = Math.hypot( dx, dz );
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
      if ( !grupo ) { grupo = { nodoj: [], direktoj: [], supraj: [], larĝoj: [] }; kapoj.set(defAlt, grupo); }
      grupo.nodoj.push([ fino[0], fino[1] ]);
      grupo.direktoj.push([ dx / direktaLongo, dz / direktaLongo ]);
      grupo.supraj.push( supraY ?? defAlt(fino[0], fino[1]) + VOJA_SUPRO_LEVIGXO );
      grupo.larĝoj.push( def.w );
    }
  }
  for ( const [ altFn, grupo ] of kapoj ) {
    konstruiRondajnKapojn(sceno, grupo.nodoj, grupo.direktoj, grupo.supraj, grupo.larĝoj,
      altFn, dioritaMaterialo, andezitaMaterialo, grundoFn);
  }
  return samples;
}

// ⟪ គំរូផ្លូវសម្រាប់ការដករុក្ខជាតិ 🌿 ⟫
/*បន្ថែមចំណុចតាមបណ្តោយផ្លូវ ដើម្បីកុំឱ្យរុក្ខជាតិដុះលើផ្លូវ
    @param samples ( Vector3 [ ] ) - បញ្ជីចំណុចសរុប
    @param aX, aZ ( number ) - ចំណុចដើម
    @param bX, bZ ( number ) - ចំណុចចុង
    @param altFn ( function ) - កម្ពស់ផ្លូវ */
function aldonuSpecimenojn( samples: THREE.Vector3[], aX: number, aZ: number,
  bX: number, bZ: number, altFn: ( x: number, z: number ) => number ): void {
  const longo = Math.hypot(bX - aX, bZ - aZ);
  const nombro = Math.max(1, Math.round(longo / 2));
  for ( let k = 0; k <= nombro; k++ ) {
    const t = k / nombro;
    const sx = aX + ( bX - aX ) * t;
    const sz = aZ + ( bZ - aZ ) * t;
    samples.push(new THREE.Vector3(sx, altFn(sx, sz), sz));
  }
}
