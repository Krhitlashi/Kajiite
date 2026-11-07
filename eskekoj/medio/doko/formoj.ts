// ≺⧼ ទម្រង់ចំណត 📐 ⧽≻
// ⟨ ចុងចំណតឥឡូវជាពាក់រង្វង់ពេញ ដូចមួកចុងផ្លូវ ។ មុននេះវាជាចតុកោណ
// ដែលមានជ្រុងពីរបត់តិចៗ , ដូច្នេះចុងចំណតមិនដូចចុងផ្លូវទេ ។ ធ្នូមកពី
// ម៉ូឌុលគែមមូលរួម , ដូច្នេះផ្លូវ និងចំណតប្រើទម្រង់តែមួយ ។ 📃 ⟩
import * as THREE from "three";
import { arkajPunktoj } from "../vojoj/rondoj.js";

// ⟪ ចុងពាក់រង្វង់ 📐 ⟫
/*បន្ថែមធ្នូពាក់រង្វង់ខាងលើទៅទម្រង់
    @param formo ( Shape ) - ទម្រង់ដែលកំពុងសាង
    @param radiuso ( number ) - កាំធ្នូ
    @param centroY ( number ) - អ័ក្ស y នៃអង្កត់ផ្ចិត
    @param flankaX ( number ) - កន្លះទទឹងជ្រុងត្រង់
@returns void */
// ⟨ គ្មានជ្រុងតូច 📏 ⟩ ៖ កាំស្មើនឹងកន្លះទទឹងវេទិកា , ដូច្នេះគែមទាំងពីរ
// ប្រែជាធ្នូដោយគ្មានបន្ទាត់ត្រង់នៅចុង ។ 📃 ⟩
function aldoniAntauxanDuonrondon( formo: THREE.Shape, radiuso: number,
  centroY: number, flankaX: number ): void {
  formo.lineTo(flankaX, centroY);
  for ( const p of arkajPunktoj(radiuso, 0, -Math.PI) )
    formo.lineTo(p[ 0 ], p[ 1 ] + centroY);
  // ⟨ ចៀសចំណុចជាន់គ្នា 📏 ⟩ ៖ ពេលកាំស្មើនឹងកន្លះទទឹង ចំណុចចុងធ្នូ
  // ស្ថិតលើគែមត្រង់រួចហើយ ។ បន្ថែមវាម្តងទៀតបង្កើតត្រីកោណរួញ ។ 📃 ⟩
  if ( flankaX - radiuso > 0o1 / 0o1000 ) formo.lineTo(-flankaX, centroY);
}

// ⟪ ទម្រង់ផ្ទៃឌីអូរីត 📐 ⟫
/*បង្កើតវេទិកាដែលមានចុងពាក់រង្វង់ពេញ
    @param w ( number ) - ទទឹងឌីអូរីត
    @param l ( number ) - ប្រវែងសរុប
@returns formo ( Shape ) - ទម្រង់បិទ */
export function kreiDokanFormon(w: number, l: number): THREE.Shape {
  const formo = new THREE.Shape();
  const duonW = w / 2, duonL = l / 2;
  const radiuso = Math.min(duonW, duonL);
  const centroY = duonL - radiuso;
  formo.moveTo(-duonW, -duonL);
  formo.lineTo(duonW, -duonL);
  aldoniAntauxanDuonrondon(formo, radiuso, centroY, duonW);
  formo.lineTo(-duonW, -duonL);
  formo.closePath();
  return formo;
}

// ⟪ ទម្រង់ខាងក្រៅ 📐 ⟫
/*បង្កើតវណ្ឌវង្កដែលលាតស្មាស្មើគ្នាជុំវិញវេទិកា
    @param w ( number ) - ទទឹងឌីអូរីត
    @param l ( number ) - ប្រវែងសរុប
    @param strio ( number ) - ទទឹងស្មាអាន់ដេហ្ស៊ីត
@returns formo ( Shape ) - ទម្រង់បិទ */
// ⟨ វណ្ឌវង្កមួយ ការប្រើពីរ 📃 ⟩ ៖ ស៊ុម និងម៉ាសក្រោមអានទម្រង់ដូចគ្នា ។
export function kreiDokanEksteranFormon(w: number, l: number, strio: number): THREE.Shape {
  const duonW = w / 2, duonL = l / 2;
  const radiuso = Math.min(duonW, duonL);
  const centroY = duonL - radiuso;
  const formo = new THREE.Shape();
  const flankaX = duonW + strio;
  formo.moveTo(-flankaX, -duonL);
  formo.lineTo(flankaX, -duonL);
  aldoniAntauxanDuonrondon(formo, radiuso + strio, centroY, flankaX);
  formo.lineTo(-flankaX, -duonL);
  formo.closePath();
  return formo;
}

// ⟪ ស៊ុមអាន់ដេហ្ស៊ីត 📐 ⟫
/*បង្កើតស៊ុមជាចិញ្ចៀនជុំវិញផ្ទៃឌីអូរីត
    @param w ( number ) - ទទឹងឌីអូរីត
    @param l ( number ) - ប្រវែងសរុប
    @param strio ( number ) - ទទឹងស្មា
    @param dikeco ( number ) - កម្រាស់
@returns geometrio ( BufferGeometry ) - ស៊ុមដែលបានបង្វិល */
export function kreiDokanKadron(w: number, l: number, strio: number,
  dikeco: number): THREE.BufferGeometry {
  const ekstera = kreiDokanEksteranFormon(w, l, strio);
  const truo = new THREE.Path();
  truo.setFromPoints(kreiDokanFormon(w, l).getPoints().reverse());
  ekstera.holes.push(truo);
  const geometrio = new THREE.ExtrudeGeometry(ekstera,
    { depth: dikeco, bevelEnabled: false });
  geometrio.rotateX(-Math.PI / 2);
  return geometrio;
}
