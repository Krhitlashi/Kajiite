// ≺⧼ ស្ពាន 🌉 ⧽≻
import * as THREE from "three";
import { VOJA_BORDA_LARĜO, VOJA_DIKECO } from "../vojoj/mezuroj.js";

// ⟪ មាត្រស្ពាន 📏 ⟫
// ⟨ កម្រាស់ផ្ទៃស្ពាន ៖ ដូចកម្រាស់ផ្លូវ ។ 📃 ⟩
export const PONT_DEKA_DIKECO = VOJA_DIKECO;

export const PONT_FINA_LEVIGXO = PONT_DEKA_DIKECO;

// ⟨ កម្រាស់ជញ្ជាំងស្ពានក្រោមផ្ទៃនៅលើទឹក ។ 📃 ⟩
export const PONT_KORPA_DIKECO = 0o2;

// ⟨ ជម្រៅបន្ថែមក្រោមដី ៖ ជញ្ជាំងស្ពានចុះកប់ក្នុងដីបន្តិច ។ 📃 ⟩
export const PONT_TERA_PROFUNDECO = 0o1/0o10;

// ⟨ ចំណែកតូចបំផុតដែលចុងគ្របដណ្តប់ ៖ ស្ពានវែងមានធ្នូស្តើងនៅកណ្តាល ។ 📃 ⟩
export const PONT_FINA_ORDO = 0o1/0o5;

// ⟨ ចំណែកធំបំផុត ៖ ស្ពានខ្លីជ្រៅមិនអាចបត់ក្នុងប្រវែងតូច ។ 📃 ⟩
export const PONT_FINA_ORDO_MAKSO = 0o1/0o2;

// ⟨ ចំនួនគំរូតាមប្រវែងស្ពាន ៖ ស្ពានវែងត្រូវការគំរូច្រើនជាង ។ 📃 ⟩
const PONT_SPECIMENOJ_POR_METRO = 0o4;
const PONT_SPECIMENOJ_MINIMUME = 0o20;
const PONT_SPECIMENOJ_MAKSIMUME = 0o200;

/*ចំណែកប្រវែងស្ពានដែលកោងចុះដល់ដី
    @param longo ( number ) - ប្រវែងស្ពាន
    @param profundo ( number ) - ជម្រៅជញ្ជាំងនៅចុង
@returns ordo ( number ) - ចំណែកនៅចុងនីមួយៗ
    ស្ពានវែង ឬទាប ប្រើចំណែកតូច , ហើយស្ពានខ្លីជ្រៅប្រើចំណែកធំ
    ដើម្បីឱ្យបាតកោងរលូនដោយគ្មានជញ្ជាំងឈរ ។ */
export function pontaFinaOrdo( longo: number, profundo: number ): number {
  if ( longo <= 0 ) return PONT_FINA_ORDO_MAKSO;
  return Math.min(PONT_FINA_ORDO_MAKSO,
    Math.max(PONT_FINA_ORDO, profundo / longo * 0o1/0o2));
}

/*កម្ពស់បាតស្ពានតាមបណ្តោយធ្នូ
    @param longo ( number ) - ប្រវែងស្ពាន
    @param supra ( function ) - កម្ពស់កំពូលស្ពាននៅ t ( 0..1 )
    @param fundo ( function , optional ) - កម្ពស់ដីក្រោមស្ពាននៅ t
@returns malsupra ( function ) - កម្ពស់បាតស្ពាននៅ t
    ចុងទាំងពីរចុះដល់ដីដោយរលូន , កណ្តាលរក្សាកម្រាស់ថេរតាមផ្ទៃផ្លូវ ។ */
export function kreiPontanSubon(
  longo: number,
  supra: ( t: number ) => number,
  fundo?: ( t: number ) => number
): ( t: number ) => number {
  const arkaDikeco = Math.min(PONT_KORPA_DIKECO, longo / 0o4);
  const profundaKomenco = fundo ? Math.max(0, supra(0) - fundo(0)) : 0;
  const profundaFino = fundo ? Math.max(0, supra(1) - fundo(1)) : 0;
  const ordoKomenco = pontaFinaOrdo(longo, profundaKomenco);
  const ordoFino = pontaFinaOrdo(longo, profundaFino);
  return ( t: number ): number => {
    const supro = supra(t);
    if ( !fundo ) return supro - arkaDikeco;
    const plena = supro - fundo(t);
    const bando = Math.max(0, Math.min(arkaDikeco, plena));
    const u = Math.max(0, Math.min(1, t / ordoKomenco, ( 1 - t ) / ordoFino));
    // ⟨ កោងចុះដល់ដីតែនៅចុងទាំងពីរ ៖ កណ្តាលតាមកោងផ្ទៃផ្លូវ ។ 📃 ⟩
    const glata = u * u * ( 0o3 - 0o2 * u );
    return supro - ( plena + ( bando - plena ) * glata );
  };
}


// ⟪ ចន្លោះពីទឹក 📏 ⟫
// ⟨ ធ្នូត្រូវខ្ពស់ជាងរលក ៖ រលកលើកផ្ទៃទឹកបួនជាន់រួមគ្នាដល់ជាងពីរភាគបួន ,
// បូកនឹងការលើកផ្ទៃទឹក ៗ ដូច្នេះស្ពានទាបជាងនោះមើលទៅលិចទឹក ៗ 📃 ⟩
export const PONT_AKVA_KLARANCO = 0o2;

/*សាងសង់តួស្ពានក្រោមផ្ទៃផ្លូវ
    @param sceno ( Scene ) - ឆាក
    @param ax, az ( number ) - ចំណុចដើមធ្នូ
    @param bx, bz ( number ) - ចំណុចចុងធ្នូ
    @param largho ( number ) - ទទឹងផ្លូវ
    @param andezitaMaterialo ( MeshStandardMaterial ) - វត្ថុអង់ដេស៊ីត
    @param deko ( function ) - កម្ពស់ផ្ទៃស្ពាន
    @param teraAlto ( function , optional ) - កម្ពស់ដីក្រោមស្ពាន */
export function konstruiPonton(
  sceno: THREE.Scene,
  ax: number, az: number,
  bx: number, bz: number,
  largho: number,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  deko: ( t: number ) => number,
  teraAlto?: ( x: number, z: number ) => number
): void {
  const dx = bx - ax, dz = bz - az;
  const longo = Math.hypot(dx, dz);
  if ( longo < 0o1/0o100 ) return;
  const ndx = dx / longo, ndz = dz / longo;

  const duono = largho / 4 + VOJA_BORDA_LARĜO;
  const fasadaLarĝo = Math.min(VOJA_BORDA_LARĜO, duono);
  const kernoDuono = duono - fasadaLarĝo;
  const pasxoj = Math.max(PONT_SPECIMENOJ_MINIMUME,
    Math.min(PONT_SPECIMENOJ_MAKSIMUME,
      Math.round(longo * PONT_SPECIMENOJ_POR_METRO)));
  const supraAlto = ( t: number ): number => deko(t) - PONT_DEKA_DIKECO + 0o1/0o200;
  // ⟨ បាតអង់ដេស៊ីតកោងចុះដល់ដីនៅចុងទាំងពីរ ហើយតាមកោងផ្លូវនៅកណ្តាល ។ 📃 ⟩
  const malsupraAlto = kreiPontanSubon(longo, supraAlto,
    teraAlto
      ? ( t: number ) => Math.min(supraAlto(t),
        teraAlto(ax + ndx * longo * t, az + ndz * longo * t) - PONT_TERA_PROFUNDECO)
      : undefined);
  const formo = new THREE.Shape();
  formo.moveTo(0, malsupraAlto(0));
  for ( let i = 1; i <= pasxoj; i++ ) {
    const t = i / pasxoj;
    formo.lineTo(longo * t, malsupraAlto(t));
  }
  for ( let i = pasxoj; i >= 0; i-- ) {
    const t = i / pasxoj;
    formo.lineTo(longo * t, supraAlto(t));
  }
  formo.closePath();

  const kreiLonganGeometrion = ( profilo: THREE.Shape, larĝo: number, ofseto: number ): THREE.ExtrudeGeometry => {
    const geometrio = new THREE.ExtrudeGeometry(profilo, { depth: larĝo, bevelEnabled: false });
    geometrio.rotateY(-Math.PI / 2);
    geometrio.translate(ofseto, 0, 0);
    return geometrio;
  };

  const grupo = new THREE.Group();
  grupo.position.set(ax, 0, az);
  grupo.rotation.y = Math.atan2(dx, dz);
  if ( kernoDuono > 0o1/0o1000 ) {
    const geometrio = kreiLonganGeometrion(formo, kernoDuono * 2, kernoDuono);
    const maŝo = new THREE.Mesh(geometrio, andezitaMaterialo);
    maŝo.castShadow = true;
    maŝo.receiveShadow = true;
    grupo.add(maŝo);
  }

  // ⟨ អង់ដេស៊ីតគ្របជញ្ជាំងឈរនៅគែមផ្លូវ ៖ បាតរបស់វាក៏កោងឡើងតាមធ្នូដែរ ។ 📃 ⟩
  const fasado = new THREE.Shape();
  fasado.moveTo(0, malsupraAlto(0));
  for ( let i = 1; i <= pasxoj; i++ ) {
    const t = i / pasxoj;
    fasado.lineTo(longo * t, malsupraAlto(t));
  }
  for ( let i = pasxoj; i >= 0; i-- ) {
    const t = i / pasxoj;
    fasado.lineTo(longo * t, deko(t) + 0o1/0o200);
  }
  fasado.closePath();
  for ( const ofseto of [ duono, -kernoDuono ] ) {
    const fasadaGeometrio = kreiLonganGeometrion(fasado, fasadaLarĝo, ofseto);
    const fasadaMaŝo = new THREE.Mesh(fasadaGeometrio, andezitaMaterialo);
    fasadaMaŝo.castShadow = true;
    fasadaMaŝo.receiveShadow = true;
    grupo.add(fasadaMaŝo);
  }
  sceno.add(grupo);
}
