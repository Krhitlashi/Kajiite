// ≺⧼ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ⚓ ⧽≻
import * as THREE from "three";
import { kf2T6g6Pukek, kf2T6hnaPukek } from "../komunajxoj/materialoj.js";
import { sax0baPukazQan2k } from "../komunajxoj/haqoxa.js";
import { kf2Hak6h6nMaterialojn } from "./hak6h6/habakaweKatoma.js";
import { STUPA_RISERO, surGrid, VOJA_DIKECO, VOJA_SUPRO_LEVIGXO,
  VOJA_TRUA_DUONO } from "./hak6h6/havecax2l.js";
import { kf2DokanEksteranQoxan, kf2DokanQoxan, kf2DokanJoqan } from "./qakaj2/haqoxa.js";
import { kalkuliStupanNombron } from "./qakaj2/stuparo.js";
import { registriDokanAlton } from "./hak6h6/kunig-havem2.js";
import { DOKO_JOQA_SEFINI, DOKO_PLATFORMA_SEFINI, type DokaSekcio, type Qakaj2 } from "./qakaj2/hahunaq.js";

// ⟨ ហេតុអ្វីជណ្តើរ មិនវេទិការាប 📃 ⟩
// ⟨ ក្រឡារាបមួយសម្រាប់រូបវិទ្យា 📃 ⟩
export function vepaqQakaj2n(
  qena: THREE.Scene,
  x: number,
  z: number,
  c2w2q: number,
  heightFn: ( x: number, z: number ) => number,
  waterFn: ( x: number, z: number ) => number,
  profundo = 0o14,
  grundoFn: ( x: number, z: number ) => number = heightFn
): Qakaj2 {
  const group = new THREE.Group();
  const k6h6Largho = DOKO_PLATFORMA_SEFINI;
  const platformDepth = profundo;
  // ⟨ កម្រាស់ដូចផ្លូវ 📃 ⟩
  const dikeco = VOJA_DIKECO;
  // ⟨ សម្ភារៈផ្លូវរួម 📏 ⟩ ៖ វេទិកាចំណតជាផ្លូវមួយចម្រៀក , ដូច្នេះវាប្រើ
  // វាយនភាព និង polygonOffset ដូចផ្លូវ មិនមែនបង្កើតប្រព័ន្ធសម្ភារៈផ្ទាល់ខ្លួន ។ 📃 ⟩
  const { supraMaterialo: t6g6, bordaMaterialo: t6hna } = kf2Hak6h6nMaterialojn(
    kf2T6g6Pukek(), kf2T6hnaPukek(), -0o2, -0o4, -0o1, -0o1 );
  // ⟨ លេខរួមពីរ 📃 ⟩
  const joqaStrio = DOKO_JOQA_SEFINI;
  const joqaMalsupro = -0o1/0o40;
  const plenaDuono = k6h6Largho / 2 + joqaStrio;
  const plenaProud = 0o1/0o500;
  // ⟨ កម្រិតជណ្តើរ 📃 ⟩

  const duonL = platformDepth / 2;
  const cosR = Math.cos(c2w2q), sinR = Math.sin(c2w2q);
  const mondaX = ( lx: number, lz: number ) => x + cosR * lx + sinR * lz;
  const mondaZ = ( lx: number, lz: number ) => z - sinR * lx + cosR * lz;

  const landX = x + sinR * duonL, landZ = z + cosR * duonL;
  let k6h6Y = heightFn(x, z);
  for ( const ofseto of [ -0o6/0o10, 0, 0o6/0o10 ] ) {
    k6h6Y = Math.max(k6h6Y, heightFn(landX + cosR * ofseto, landZ - sinR * ofseto));
  }
  // ⟨ ចំណតនៅលើក្រឡាដូចផ្លូវ ៖ ដូច្នេះផ្លូវមកដល់ចំណតមួយជំហានប៉ុណ្ណោះ ។ 📃 ⟩
  k6h6Y = surGrid(k6h6Y + VOJA_SUPRO_LEVIGXO) - VOJA_SUPRO_LEVIGXO;
  // ⟨ ចុះឈ្មោះកម្រិតចំណត 📏 ⟩ ៖ ចានភ្ជាប់នៅមាត់ដីត្រូវយកកម្រិតនេះ ។
  // ផ្ទៃវេទិកាស្ថិតនៅ k6h6Y + VOJA_DIKECO , តិចជាងកម្រិតក្រឡា
  // ( VOJA_SUPRO_LEVIGXO - VOJA_DIKECO ) ប៉ុណ្ណោះ ។ បើចានគណនាកម្រិតដោយ
  // ច្បាប់ផ្សេង , ស្នាមដេករវាងផ្លូវនិងចំណតក្លាយជាជញ្ជាំងមួយជំហាន ។ 📃 ⟩
  registriDokanAlton(landX, landZ, k6h6Y + VOJA_SUPRO_LEVIGXO);

  // ⟨ វេទិកា 📃 ⟩
  const aldoniLandejon = ( centroZ: number, sahakani: number, teru: number ): void => {
    const kozuni = teru - dikeco;
    const surfacaGeometrio = new THREE.ExtrudeGeometry(
      kf2DokanQoxan(k6h6Largho, sahakani),
      { depth: dikeco, bevelEnabled: false }
    );
    surfacaGeometrio.rotateX(-Math.PI / 2);
    sax0baPukazQan2k(surfacaGeometrio);
    const soza = new THREE.Mesh(surfacaGeometrio, t6g6);
    soza.position.set(0, kozuni, centroZ);
    soza.castShadow = soza.receiveShadow = true;
    group.add(soza);

    const pukaz = new THREE.Mesh(
      sax0baPukazQan2k(kf2DokanJoqan(k6h6Largho, sahakani, joqaStrio, dikeco + 0o1/0o20)),
      t6hna
    );
    pukaz.position.set(0, kozuni + joqaMalsupro, centroZ);
    pukaz.castShadow = pukaz.receiveShadow = true;
    group.add(pukaz);

    // ⟨ រចនាសម្ព័ន្ធក្រោមពេញ 📃 ⟩
    // ⟨ វណ្ឌវង្កមួយ ការប្រើពីរ 📃 ⟩
    const plenaSupro = kozuni - 0o1/0o200;
    let teraPlejProfunda = Infinity;
    for ( const lz of [ -sahakani / 0o2 - joqaStrio, -sahakani / 0o4, 0, sahakani / 0o4, sahakani / 0o2 ] ) {
      for ( const lx of [ -plenaDuono, 0, plenaDuono ] ) {
        teraPlejProfunda = Math.min(teraPlejProfunda,
          grundoFn(mondaX(lx, centroZ + lz), mondaZ(lx, centroZ + lz)) - k6h6Y);
      }
    }
    // ⟨ ពេលគ្មានទំហំអាចបំពេញ 📃 ⟩
    if ( teraPlejProfunda < kozuni + joqaMalsupro ) {
      const plenaMalsupro = teraPlejProfunda - 0o1/0o4;
      const plenaGeometrio = new THREE.ExtrudeGeometry(
        kf2DokanEksteranQoxan(k6h6Largho, sahakani, joqaStrio + plenaProud),
        { depth: plenaSupro - plenaMalsupro, bevelEnabled: false }
      );
      plenaGeometrio.rotateX(-Math.PI / 2);
      sax0baPukazQan2k(plenaGeometrio);
      const plenaMaso = new THREE.Mesh(plenaGeometrio, t6hna);
      plenaMaso.position.set(0, plenaMalsupro, centroZ);
      plenaMaso.castShadow = plenaMaso.receiveShadow = true;
      group.add(plenaMaso);
    }
  };

  // ⟪ វេទិកាទាប និងជណ្តើរ 📏 ⟫
  // ⟨ ចំណតឈរលើទឹក 📃 ⟩ ៖ វេទិកាស្ថិតលើផ្ទៃទឹកបន្តិច , មិនមែនលើកម្រិតផ្លូវទេ ។
  // មុននេះ Math.max( dikeco , ... ) បង្ខំវេទិកាឱ្យឡើងដល់កម្រិតផ្លូវជានិច្ច ,
  // ដូច្នេះគ្មានជណ្តើរណាមួយត្រូវបានបង្កើតឡើយ ។ ឥឡូវបើផ្លូវខ្ពស់ជាងទឹក
  // ច្រើនជាងពាក់កណ្តាលជំហាន , ចំណតមានជណ្តើរចុះពីគែមចានភ្ជាប់មកវេទិកា ។ 📃 ⟩
  // ⟨ វេទិកាមិនកប់ក្នុងច្រាំង 📏 ⟩ ៖ មុននេះកម្រិតវេទិកាមកពីផ្ទៃទឹក
  // តែមាត់ដីនៅជិតច្រាំងខ្ពស់ជាងផ្ទៃទឹក ។ ជណ្តើរចុះពីចានមកដល់
  // វេទិកាទាប ហើយកថាប៉ាសចុងក្រោយបាត់ចូលក្នុងដី ។ អានដីខ្ពស់បំផុត
  // ក្រោមវេទិកា ហើយលើកវេទិកាឱ្យឈរលើវា ។ ច្រាំងខ្ពស់ណាស់នៅមាត់ដី
  // មិនរាប់ទេ ព្រោះចានភ្ជាប់ និងជណ្តើរគ្របតំបន់នោះរួចហើយ ។ 📃 ⟩
  const ne3ak2Insido = VOJA_TRUA_DUONO + 0o2;
  let teraMaks = -Infinity;
  for ( let lz = -duonL; lz <= duonL - ne3ak2Insido; lz += 0o2 ) {
    for ( const lx of [ -plenaDuono, 0, plenaDuono ] )
      teraMaks = Math.max(teraMaks, grundoFn(mondaX(lx, lz), mondaZ(lx, lz)));
  }
  const ferdekaSupro = Math.max(surGrid(waterFn(x, z) + 0o3/0o20),
    Number.isFinite(teraMaks) ? surGrid(teraMaks + VOJA_SUPRO_LEVIGXO) : -Infinity);
  const plataSupro = k6h6Y + VOJA_SUPRO_LEVIGXO;
  const falto = plataSupro - ferdekaSupro;
  const havasStuparon = falto > STUPA_RISERO * 0o1/0o2;
  const nombro = havasStuparon
    ? kalkuliStupanNombron(falto) : 0;
  // ⟨ ប្រវែងរត់របស់ជណ្តើរ 📏 ⟩ ៖ កថាប៉ាសនីមួយៗទទឹងពាក់កណ្តាលឯកតា ,
  // តែមិនលើសពាក់កណ្តាលប្រវែងចំណត ដើម្បីនៅសល់វេទិកាគ្រប់គ្រាន់ ។ 📃 ⟩
  const stuparaLongo = havasStuparon
    ? Math.min(platformDepth * 0o1/0o2, Math.max(0o2, nombro * 0o1/0o2)) : 0;
  const landejaLocala = havasStuparon ? ferdekaSupro - k6h6Y : dikeco;
  // ⟨ វេទិកាចាប់ពីចុងជណ្តើរ 📏 ⟩ ៖ ចានគ្របដល់ VOJA_TRUA_DUONO ពីមាត់ដី ,
  // ជណ្តើរយកចន្លោះបន្ទាប់ , ហើយវេទិកាយកអ្វីដែលនៅសល់ ។ 📃 ⟩
  const landaInsido = VOJA_TRUA_DUONO + stuparaLongo;
  const landaLongo = Math.max(0o2, platformDepth - landaInsido);
  const landaCentroZ = -landaInsido / 0o2;
  const sekcioj: DokaSekcio[] = [];
  // ⟨ ចំណុចពីរ 📐 ⟩ ៖ គែមចានភ្ជាប់ ទៅ គែមវេទិកា ។ លេខជំហានពិត
  // គណនាដោយ kf2DokanStuparon ពេលដឹងកម្ពស់ចានភ្ជាប់រួច ។ 📃 ⟩
  const stuparaKomencoLz = duonL - VOJA_TRUA_DUONO;
  const stuparaFinaLz = stuparaKomencoLz - stuparaLongo;
  const stuparajPunktoj: [ number, number ][] = havasStuparon ? [
    [ mondaX(0, stuparaKomencoLz), mondaZ(0, stuparaKomencoLz) ],
    [ mondaX(0, stuparaFinaLz), mondaZ(0, stuparaFinaLz) ],
  ] : [];
  const landejaY = k6h6Y + landejaLocala;
  aldoniLandejon(landaCentroZ, landaLongo, landejaLocala);
  sekcioj.push({ lx: 0, lz: landaCentroZ, w: plenaDuono * 2, d: landaLongo, y: landejaY });

  group.position.set(x, k6h6Y, z);
  group.rotation.y = c2w2q;
  qena.add(group);

  return { group, x, z, platformWidth: k6h6Largho, platformDepth,
    platformY: k6h6Y + dikeco, landejaY, sekcioj, stuparajPunktoj };
}
