// ≺⧼ គែមមូលរួម 🌗 ⧽≻
// ⟨ មុននេះ មួកចុងផ្លូវ , ជង្គង់កន្លែងបត់ , និងចុងចំណត មានប្រព័ន្ធបីផ្សេងគ្នា ។
// ពួកវាបង្កើតវាយនភាព ទម្រង់ធ្នូ និងប៊ូហ្វ័ររៀងខ្លួន , ដូច្នេះគែមមូលពីរ
// ដែលជួបគ្នាមានកម្រិតខុសគ្នា ហើយស្មាអាន់ដេហ្ស៊ីតជាន់លើឌីអូរីតកណ្តាល ។
// ឥឡូវគ្រប់គែមមូលឆ្លងកាត់ម៉ូឌុលតែមួយ ៖ ទម្រង់ធ្នូមួយ , សម្ភារៈដូចផ្លូវ ,
// ប៊ូហ្វ័រដូចផ្លូវ ។ ចុងផ្លូវជាពាក់រង្វង់ , ចុងចំណតជាពាក់រង្វង់ដូចគ្នា ,
// ហើយកន្លែងបត់យកតែធ្នូនៃជ្រុងខាងក្នុង មិនលាតលើផ្ទៃចម្រៀកត្រង់ទេ ។ 📃 ⟩
import * as THREE from "three";
import { ANGULA_PROVOLIRO, type VojGeometriajBufroj } from "./bufroj.js";
import { VOJA_DIKECO } from "./mezuroj.js";
import { PONT_KORPA_DIKECO } from "../doko/ponto.js";

export type Punkto2 = [ number, number ];

// ⟪ ចំនួនជំហានធ្នូ 📐 ⟫
export const RONDA_PASXOJ = 0o40;
// ⟨ ពាក់រង្វង់ 📏 ⟩ ៖ ចុងផ្លូវ និងចុងចំណត ។
export const DUONA_RONDO = Math.PI;

// ⟪ ចំណុចលើធ្នូ 📐 ⟫
/*បង្កើតចំណុចលើធ្នូក្នុងប្លង់ទម្រង់
    @param radiuso ( number ) - កាំ
    @param komenco ( number ) - មុំចាប់ផ្តើមជារ៉ាដ្យង់ក្នុងប្លង់ XZ
    @param gamo ( number ) - ទំហំមុំ , អាចអវិជ្ជមានដើម្បីរត់ថយក្រោយ
    @param pasoj ( number ) - ចំនួនជំហាន
@returns punktoj ( Punkto2 [ ] ) - ចំណុចក្នុងប្លង់ទម្រង់ */
// ⟨ សញ្ញាទីពីរ 📏 ⟩ ៖ ExtrudeGeometry រត់បង្វិល -៩០ ដឺក្រេជុំអ័ក្ស X , ដូច្នេះ
// អ័ក្ស y របស់ទម្រង់ក្លាយជា -z ក្នុងពិភព ។ សញ្ញាអវិជ្ជមានរក្សាមុំដែល
// ហៅពីប្លង់ XZ ពិត មិនចាំបាច់ប្ដូរទិសនៅរាល់អ្នកហៅ ។ 📃 ⟩
export function arkajPunktoj( radiuso: number, komenco: number, gamo: number,
  pasoj: number = RONDA_PASXOJ ): Punkto2[] {
  const rez: Punkto2[] = [];
  for ( let i = 0; i <= pasoj; i++ ) {
    const angulo = komenco + gamo * i / pasoj;
    rez.push([ radiuso * Math.cos(angulo), -radiuso * Math.sin(angulo) ]);
  }
  return rez;
}

// ⟪ ទម្រង់ធ្នូរួម 📐 ⟫
/*បង្កើតផ្ទៃជាវិស័យរង្វង់ ឬចិញ្ចៀនវិស័យ
    @param ekstera ( number ) - កាំខាងក្រៅ
    @param interna ( number ) - កាំខាងក្នុង , ០ បើចង់បានវិស័យពេញ
    @param mezo ( number ) - មុំកណ្តាលធ្នូក្នុងប្លង់ XZ
    @param gamo ( number ) - ទំហំធ្នូ
@returns formo ( Shape ) - ទម្រង់បិទគ្មានរន្ធ */
// ⟨ គ្មានរន្ធ 📏 ⟩ ៖ ចិញ្ចៀនត្រូវគូរជាពហុកោណតែមួយដែលមានគែមកាំពីរ ។
// មុននេះចិញ្ចៀនប្រើ Path ជារន្ធ ហើយរន្ធនោះរំកិលដោយចន្លោះតូចមួយ
// ដើម្បីចៀសជាន់គ្នា ។ ចន្លោះនោះបន្សល់អាន់ដេហ្ស៊ីតនៅលើឌីអូរីត ។ ឥឡូវ
// គែមកាំទាំងពីរជាផ្នែកនៃគ្រោងតែមួយ ដូច្នេះគ្មានជាន់គ្នា គ្មានរន្ធ ។ 📃 ⟩
export function kreiSektoranFormon( ekstera: number, interna: number,
  mezo: number, gamo: number ): THREE.Shape {
  const formo = new THREE.Shape();
  const duonaGamo = gamo / 0o2;
  const eksteraj = arkajPunktoj(ekstera, mezo - duonaGamo, gamo);
  formo.moveTo(eksteraj[ 0 ][ 0 ], eksteraj[ 0 ][ 1 ]);
  for ( let i = 1; i < eksteraj.length; i++ )
    formo.lineTo(eksteraj[ i ][ 0 ], eksteraj[ i ][ 1 ]);
  if ( interna > 0o0 ) {
    // ⟨ ត្រឡប់តាមធ្នូខាងក្នុងវិញ 📃 ⟩ ។
    const internaj = arkajPunktoj(interna, mezo + duonaGamo, -gamo);
    for ( const p of internaj ) formo.lineTo(p[ 0 ], p[ 1 ]);
  } else {
    formo.lineTo(0, 0);
  }
  formo.closePath();
  return formo;
}

// ⟪ ទម្រង់ទៅជាធរណីមាត្រ 🧱 ⟫
/*បង្វិលទម្រង់ពីប្លង់ XY ទៅប្លង់ XZ ហើយលាតតាមកម្រាស់
    @param formo ( Shape ) - ទម្រង់បិទ
    @param dikeco ( number ) - កម្រាស់
@returns geometrio ( ExtrudeGeometry ) - ធរណីមាត្រដែលមាន uv ពីស្វ័យប្រវត្តិ */
export function kreiRondanGeometrion( formo: THREE.Shape,
  dikeco: number ): THREE.ExtrudeGeometry {
  const geometrio = new THREE.ExtrudeGeometry(formo,
    { depth: dikeco, bevelEnabled: false, curveSegments: RONDA_PASXOJ });
  geometrio.rotateX(-Math.PI / 0o2);
  return geometrio;
}

// ⟪ គែមមូលមួយ 📏 ⟫
export interface RondaPeco {
  x: number;
  z: number;
  // ⟨ មុំកណ្តាលធ្នូក្នុងប្លង់ XZ ។ 📃 ⟩
  mezo: number;
  // ⟨ ទំហំធ្នូ ។ ពាក់រង្វង់សម្រាប់ចុងផ្លូវ , មុំបត់សម្រាប់ជង្គង់ ។ 📃 ⟩
  gamo: number;
  // ⟨ កាំឌីអូរីត ។ 📃 ⟩
  duono: number;
  // ⟨ កាំរួមស្មា ។ 📃 ⟩
  ekstera: number;
  // ⟨ កម្ពស់ផ្ទៃ ។ 📃 ⟩
  supro: number;
}

// ⟪ សាងគែមមូលទាំងអស់ 🧱 ⟫
/*បញ្ចូលគែមមូលទៅក្នុងប៊ូហ្វ័រផ្លូវរួម
    @param bufroj ( VojGeometriajBufroj ) - ប៊ូហ្វ័ររបស់ផ្លូវ
    @param pecoj ( RondaPeco [ ] ) - គែមមូលទាំងអស់
    @param supraMaterialo ( MeshStandardMaterial ) - សម្ភារៈឌីអូរីតរបស់ផ្លូវ
    @param bordaMaterialo ( MeshStandardMaterial ) - សម្ភារៈអាន់ដេហ្ស៊ីតរបស់ផ្លូវ
    @param grundoFn ( function ) - កម្ពស់ដីក្រោម
@returns void */
// ⟨ សម្ភារៈ និងប៊ូហ្វ័រដូចផ្លូវ 📏 ⟩ ៖ មុននេះគែមមូលបង្កើតវាយនភាពថ្មី
// និង polygonOffset ផ្សេងគ្នា ដើម្បីឈ្នះផ្ទៃចម្រៀកដែលជាន់គ្នា ។ ឥឡូវវិស័យ
// មិនជាន់លើចម្រៀកទេ , ដូច្នេះវាប្រើសម្ភារៈដូចគ្នាបេះបិទ ហើយរួមបញ្ចូល
// ក្នុង Mesh តែមួយជាមួយផ្លូវ ។ គ្មានជាន់គ្នា គ្មានស្នាម គ្មានវាយនភាពលើស ។ 📃 ⟩
export function aldoniRondajnPecojn( bufroj: VojGeometriajBufroj,
  pecoj: readonly RondaPeco[],
  supraMaterialo: THREE.MeshStandardMaterial,
  bordaMaterialo: THREE.MeshStandardMaterial,
  grundoFn: ( x: number, z: number ) => number
): void {
  for ( const peco of pecoj ) {
    let minimumo = grundoFn(peco.x, peco.z);
    for ( const radiuso of [ peco.duono, peco.ekstera ] ) {
      for ( const p of arkajPunktoj(radiuso, peco.mezo - peco.gamo / 0o2,
        peco.gamo, 0o20) ) {
        minimumo = Math.min(minimumo, grundoFn(peco.x + p[ 0 ], peco.z - p[ 1 ]));
      }
    }
    // ⟨ បាតឈប់ត្រង់ដី 📏 ⟩ ៖ លើទឹកគ្មានបាត គែមស្តើងដូចផ្លូវ ។ 📃 ⟩
    const dikeco = Number.isFinite(minimumo)
      ? Math.max(VOJA_DIKECO, peco.supro - ( minimumo - ANGULA_PROVOLIRO ))
      : VOJA_DIKECO;
    const matrico = new THREE.Matrix4().makeTranslation(peco.x, peco.supro - dikeco, peco.z);
    for ( const [ formo, materialo ] of [
      [ kreiSektoranFormon(peco.duono, 0o0, peco.mezo, peco.gamo), supraMaterialo ],
      [ kreiSektoranFormon(peco.ekstera, peco.duono, peco.mezo, peco.gamo), bordaMaterialo ],
    ] as [ THREE.Shape, THREE.MeshStandardMaterial ][] ) {
      bufroj.aldoni(kreiRondanGeometrion(formo, dikeco), materialo, matrico);
    }
    // ⟨ បិទរន្ធក្រោមជង្គង់លើទឹក 📏 ⟩ ៖ លើទឹក grundoFn ត្រឡប់ Infinity ,
    // ដូច្នេះជង្គង់ស្តើងដូចផ្ទៃផ្លូវ ។ ចម្រៀកត្រង់ពីរដែលជួបគ្នាត្រង់បត់
    // បន្សល់ក្រូចឆ្មារទទេនៅជ្រុងខាងក្នុង , ហើយពីចំហៀងឃើញរន្ធត្រីកោណ
    // ក្រោមផ្ទៃស្ពាន ។ បន្ថែមស្រទាប់អាន់ដេហ្ស៊ីតក្រោមជង្គង់ ជ្រៅប៉ុន
    // តួធ្នូ , ដូច្នេះជ្រុងបិទជិតដោយគ្មានផ្ទៃភ្លឺលេចលើជញ្ជាំង ។ 📃 ⟩
    if ( !Number.isFinite(minimumo) ) {
      const subaFormo = kreiSektoranFormon(peco.ekstera, 0o0, peco.mezo, peco.gamo);
      const subaMatrico = new THREE.Matrix4().makeTranslation(peco.x,
        peco.supro - dikeco - PONT_KORPA_DIKECO, peco.z);
      bufroj.aldoni(kreiRondanGeometrion(subaFormo, PONT_KORPA_DIKECO),
        bordaMaterialo, subaMatrico);
    }
  }
}
