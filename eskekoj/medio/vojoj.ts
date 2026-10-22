// ≺⧼ ផ្លូវ 🛣️ ⧽≻
import * as THREE from "three";
import { kreiGeometriajnBufrojn, kreiVojajnBendojn, kreiVojojnMaterialojn,
  type VojGeometriajBufroj } from "./vojoj/bufroj.js";
import { konstruiRondajnKapojn } from "./vojoj/kapoj.js";
import { VOJA_DIKECO, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO, VOJA_TRUA_DUONO } from "./vojoj/mezuroj.js";
import { konstruiSegmentonEnBufrojn, konstruiUnuformajnStuparajnSegmentojn,
  kreiSegmentajnPartojn, STUPA_RISERO, VOJA_KUNIGO_RADIO,
  type VojStuparaStato } from "./vojoj/segmentoj.js";
import { vojSuprajxoj, type VojDifino, type VojKunigoAlto, type VojOpcioj } from "./vojoj/tipoj.js";

export function konstruiVojojn(sceno: THREE.Scene,
  defs: VojDifino[],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  kunigoj: [ number, number ][] = [],
  opcioj: VojOpcioj = {}
): THREE.Vector3[] {
  const { akvaFn, kunigoAltoj, altojDeKunigo } = opcioj;
  const samples: THREE.Vector3[] = [];
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -2, -4, -1, -1);

  const bufroj = kreiGeometriajnBufrojn();
  // ⟨ កម្រិតចានភ្ជាប់នៅចុងក្រោយនៃផ្លូវ ៖ ប្រើសម្រាបមួកផ្លូវដែលឆ្លងចូលមកចានភ្ជាប់ ។ 📃 ⟩
  const kapoAltoj = new Map<VojDifino, { komenco: number | null; fino: number | null }>();
  // ⟨ កានភ្ជាប់ដែលនៅចំណុចមួយ ៖ ចានភ្ជាប់ដែលនៅចំណុចនោះ ។ 📃 ⟩
  const kunigoKlavoPor = ( mX: number, mZ: number ): string | null => {
    let plej: [ number, number ] | null = null, plejDisto = Infinity;
    for ( const [ kX, kZ ] of kunigoj ) {
      const d = Math.hypot( kX - mX, kZ - mZ );
      if ( d < plejDisto ) { plejDisto = d; plej = [ kX, kZ ]; }
    }
    return plej ? plej[0] + "," + plej[1] : null;
  };
  // ⟨ សង្កត់ផ្លូវ ៖ រកកម្រិតចានភ្ជាប់ត្រូវជាមួយកម្រិតផ្លូវដែលឆ្លងចូលមក ។ 📃 ⟩
  const konstruu = ( bufo: VojGeometriajBufroj,
    altojPorKunigo: Map<string, number> | null,
    kunigoAltojUzata: VojKunigoAlto[] | undefined,
    kolektiSampoj: boolean ): void => {
    for ( const def of defs ) {
      const defAlt = def.heightFn || heightFn;
      kapoAltoj.set( def, { komenco: null, fino: null } );
      if ( def.stuparo === true ) {
        const bendoj = kreiVojajnBendojn(def.w, supraMaterialo, bordaMaterialo);
        for ( let i = 0; i < def.pts.length - 1; i++ ) {
          const [ aX, aZ ] = def.pts[i];
          const [ bX, bZ ] = def.pts[i + 1];
          konstruiUnuformajnStuparajnSegmentojn(aX, aZ, bX, bZ, bendoj, VOJA_DIKECO,
            defAlt, def.grundoFn ?? defAlt, bufo);
          if ( !kolektiSampoj ) continue;
          const longo = Math.hypot(bX - aX, bZ - aZ);
          const nombro = Math.max(1, Math.round(longo / 2));
          for ( let k = 0; k <= nombro; k++ ) {
            const t = k / nombro;
            const sx = aX + ( bX - aX ) * t;
            const sz = aZ + ( bZ - aZ ) * t;
            samples.push(new THREE.Vector3(sx, defAlt(sx, sz), sz));
          }
        }
        continue;
      }
      // ⟨ ស្ថានភាពមួយក្នុងមួយផ្លូវ ៖ ចម្រៀកបន្តកម្ពស់ពីគម្រៀកមុន ,
      // ដូច្នេះផ្លូវមិនលោតឡើងឬធ្លាក់ចុះភ្លាមៗនៅចន្លោះចម្រៀក ។ 📃 ⟩
      const stato: VojStuparaStato = { supro: null, komenco: null, unua: null };
      for ( let i = 0; i < def.pts.length - 1; i++ ) {
        const [ aX, aZ ] = def.pts[i];
        const [ bX, bZ ] = def.pts[i + 1];
        // ⟨ រន្ធភ្ជាប់ 📃 ⟩
        const longo = Math.hypot(bX - aX, bZ - aZ);
        const bendoj = kreiVojajnBendojn(def.w, supraMaterialo, bordaMaterialo);
        const ndx = ( bX - aX ) / longo, ndz = ( bZ - aZ ) / longo;
        // ⟨ ទិសឆ្លេងនៃផ្លូវ ៖ ដើម្បីស្ថានភាពចានភ្ជាប់ដូចផ្លូវ ។ 📃 ⟩
        const latX = -ndz * VOJA_EKSTERA_DUONO, latZ = ndx * VOJA_EKSTERA_DUONO;
        // ⟨ ចានភ្ជាប់មុន ៖ ចានភ្ជាប់ដែលទាញ់ផ្លូវចុងមក ដើម្បីកំណត់កម្រិតផ្លូវនៅចុងទៀត ។ 📃 ⟩
        let antaŭaKunigoKlavo: string | null = null;
        for ( const [ t0, t1, konstruuPec ] of kreiSegmentajnPartojn(aX, aZ, bX, bZ, longo, kunigoj) ) {
          const px1 = aX + ndx * t0, pz1 = aZ + ndz * t0;
          const px2 = aX + ndx * t1, pz2 = aZ + ndz * t1;
          if ( konstruuPec ) {
            stato.unua = null;
            konstruiSegmentonEnBufrojn(px1, pz1, px2, pz2, bendoj, VOJA_DIKECO, defAlt, bufo,
              def.glata === true, stato, def.stuparaRisero ?? STUPA_RISERO, def.grundoFn ?? defAlt,
              akvaFn, kunigoAltojUzata);
            // ⟨ កម្រិតផ្លូវនៅចុងទៀត ៖ កម្រិតជំហានដំបូងនៃបទាឆ់បង្ក្កាននេះ ។ 📃 ⟩
            if ( altojPorKunigo && antaŭaKunigoKlavo && stato.unua !== null ) {
              const antaŭa = altojPorKunigo.get( antaŭaKunigoKlavo );
              if ( antaŭa === undefined || stato.unua > antaŭa )
                altojPorKunigo.set( antaŭaKunigoKlavo, stato.unua );
            }
            antaŭaKunigoKlavo = null;
            continue;
          }
          const mX = ( px1 + px2 ) / 2, mZ = ( pz1 + pz2 ) / 2;
          // ⟨ កម្រិតចានភ្ជាប់ ៖ ចានភ្ជាប់ត្រូវដូចកម្រិតផ្លូវដែលឆ្លងចូលមក ដើម្បីកុំឱ្យចានលិចទៅផ្លូវ ។ 📃 ⟩
          let kunigaSupro = Math.max(
            defAlt(mX, mZ),
            defAlt(mX + latX, mZ + latZ),
            defAlt(mX - latX, mZ - latZ)) + VOJA_SUPRO_LEVIGXO;
          if ( kunigoAltojUzata ) {
            for ( const k of kunigoAltojUzata ) {
              if ( Math.hypot( k.x - mX, k.z - mZ ) <= VOJA_KUNIGO_RADIO ) { kunigaSupro = k.alto; break; }
            }
          }
          vojSuprajxoj.push({ x1: px1, z1: pz1, x2: px2, z2: pz2, duono: VOJA_EKSTERA_DUONO,
            y0: kunigaSupro, y1: kunigaSupro });
          // ⟨ កម្រិតចានភ្ជាប់ដែលបានកំណតដោយផ្លូវ ៖ ចានភ្ជាប់ត្រូវនៅកម្រិតផ្លូវនៅចុងទៀត ដើម្បីឱ្យចានភ្ជាប់ជាមួយផ្លូវ ។ 📃 ⟩
          const kunigoKlavo = kunigoKlavoPor( mX, mZ );
          if ( altojPorKunigo && kunigoKlavo && stato.supro !== null ) {
            const antaŭa = altojPorKunigo.get( kunigoKlavo );
            if ( antaŭa === undefined || stato.supro > antaŭa ) altojPorKunigo.set( kunigoKlavo, stato.supro );
          }
          antaŭaKunigoKlavo = kunigoKlavo;
        }
        if ( !kolektiSampoj ) continue;
        const nombro = Math.max(1, Math.round(longo / 2));
        for ( let k = 0; k <= nombro; k++ ) {
          const t = k / nombro;
          const sx = aX + ( bX - aX ) * t;
          const sz = aZ + ( bZ - aZ ) * t;
          samples.push(new THREE.Vector3(sx, defAlt(sx, sz), sz));
        }
      }
      const kapo = kapoAltoj.get( def )!;
      kapo.komenco = stato.komenco;
      kapo.fino = stato.supro;
    }
  };
  // ⟪ ជំហានទីពីរ ៖ កម្រិតចានភ្ជាប់ត្រូវគ្រប់គ្នា ដើម្បីកុំឱ្យមានជំហានស្មើគ្នា និងកុំឱ្យផ្លូវកប់ក្នុងដី ។ 📃 ⟩
  // ⟨ ជំហានទីមួយ ៖ ផ្លូវត្រូវឡើងដល់កម្រិតដីដែលស្មើគ្នានឹងចានភ្ជាប់ ,
  // ដើម្បីរកកម្រិតចានភ្ជាប់ដែលត្រូវជាមួយផ្លូវទាំងអស់ ។ 📃 ⟩
  const alkunigoAltoj: VojKunigoAlto[] = [];
  if ( altojDeKunigo && kunigoj.length > 0 ) {
    const provajAltoj = new Map<string, number>();
    const malutilaBufroj: VojGeometriajBufroj = {
      listoj: new Map(),
      aldoni: () => {},
      kunigi: () => {},
    };
    const konservitaj = vojSuprajxoj.length;
    konstruu( malutilaBufroj, provajAltoj, undefined, false );
    vojSuprajxoj.length = konservitaj;
    for ( const [ klavo, alto ] of provajAltoj ) {
      const [ kx, kz ] = klavo.split( "," ).map( v => parseFloat( v ) );
      if ( !Number.isFinite( kx ) || !Number.isFinite( kz ) ) continue;
      alkunigoAltoj.push( { x: kx, z: kz, alto } );
      altojDeKunigo.set( klavo, alto );
    }
  }
  konstruu( bufroj, altojDeKunigo ?? null, alkunigoAltoj.length > 0 ? alkunigoAltoj : kunigoAltoj, true );
  bufroj.kunigi(sceno);
  // ⟨ ចុងមូលស្វថយប្រវត្តិ 📃 ⟩
  const kapoj = new Map<( x: number, z: number ) => number, {
    nodoj: [ number, number ][]; direktoj: [ number, number ][];
    supraj: number[]; larĝoj: number[]; }>();
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
    const kapo = kapoAltoj.get( def );
    const finoj: [ [ number, number ], [ number, number ], number | null ][] = [
      [ def.pts[0], def.pts[1], kapo?.komenco ?? null ],
      [ def.pts[def.pts.length - 1], def.pts[def.pts.length - 2], kapo?.fino ?? null ],
    ];
    for ( const [ fino, najbaro, supraY ] of finoj ) {
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
      if ( !grupo ) { grupo = { nodoj: [], direktoj: [], supraj: [], larĝoj: [] }; kapoj.set(defAlt, grupo); }
      grupo.nodoj.push([ fino[0], fino[1] ]);
      grupo.direktoj.push([ dx / direktaLongo, dz / direktaLongo ]);
      grupo.supraj.push( supraY ?? defAlt(fino[0], fino[1]) + VOJA_SUPRO_LEVIGXO );
      grupo.larĝoj.push( def.w );
    }
  }
  for ( const [ altFn, grupo ] of kapoj ) {
    konstruiRondajnKapojn(sceno, grupo.nodoj, grupo.direktoj, grupo.supraj, grupo.larĝoj,
      altFn, dioritaMaterialo, andezitaMaterialo);
  }
  return samples;
}
