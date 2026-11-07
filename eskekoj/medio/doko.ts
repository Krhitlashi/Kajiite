// ≺⧼ ចំណតទឹក ⚓ ⧽≻
import * as THREE from "three";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon } from "../komunajxoj/materialoj.js";
import { kreiVojojnMaterialojn } from "./vojoj/bufroj.js";
import { STUPA_RISERO, surGrid, VOJA_DIKECO, VOJA_SUPRO_LEVIGXO,
  VOJA_TRUA_DUONO } from "./vojoj/mezuroj.js";
import { kreiDokanEksteranFormon, kreiDokanFormon, kreiDokanKadron } from "./doko/formoj.js";
import { kalkuliStupanNombron } from "./doko/stuparo.js";
import { registriDokanAlton } from "./vojoj/kunig-niveloj.js";
import { DOKO_KADRA_LARĜO, DOKO_PLATFORMA_LARĜO, type DokaSekcio, type Doko } from "./doko/tipoj.js";

// ⟨ ហេតុអ្វីជណ្តើរ មិនវេទិការាប 📃 ⟩
// ⟨ ក្រឡារាបមួយសម្រាប់រូបវិទ្យា 📃 ⟩
export function konstruiDokon(
  sceno: THREE.Scene,
  x: number,
  z: number,
  direkto: number,
  heightFn: ( x: number, z: number ) => number,
  waterFn: ( x: number, z: number ) => number,
  profundo = 0o14,
  grundoFn: ( x: number, z: number ) => number = heightFn
): Doko {
  const group = new THREE.Group();
  const vojaLargho = DOKO_PLATFORMA_LARĜO;
  const platformDepth = profundo;
  // ⟨ កម្រាស់ដូចផ្លូវ 📃 ⟩
  const dikeco = VOJA_DIKECO;
  // ⟨ សម្ភារៈផ្លូវរួម 📏 ⟩ ៖ វេទិកាចំណតជាផ្លូវមួយចម្រៀក , ដូច្នេះវាប្រើ
  // វាយនភាព និង polygonOffset ដូចផ្លូវ មិនមែនបង្កើតប្រព័ន្ធសម្ភារៈផ្ទាល់ខ្លួន ។ 📃 ⟩
  const { supraMaterialo: diorito, bordaMaterialo: andezito } = kreiVojojnMaterialojn(
    kreiDioritanMaterialon(), kreiAndezitanMaterialon(), -0o2, -0o4, -0o1, -0o1 );
  // ⟨ លេខរួមពីរ 📃 ⟩
  const kadraStrio = DOKO_KADRA_LARĜO;
  const kadraMalsupro = -0o1/0o40;
  const plenaDuono = vojaLargho / 2 + kadraStrio;
  const plenaProud = 0o1/0o500;
  // ⟨ កម្រិតជណ្តើរ 📃 ⟩

  const duonL = platformDepth / 2;
  const cosR = Math.cos(direkto), sinR = Math.sin(direkto);
  const mondaX = ( lx: number, lz: number ) => x + cosR * lx + sinR * lz;
  const mondaZ = ( lx: number, lz: number ) => z - sinR * lx + cosR * lz;

  const landX = x + sinR * duonL, landZ = z + cosR * duonL;
  let vojaY = heightFn(x, z);
  for ( const ofseto of [ -0o6/0o10, 0, 0o6/0o10 ] ) {
    vojaY = Math.max(vojaY, heightFn(landX + cosR * ofseto, landZ - sinR * ofseto));
  }
  // ⟨ ចំណតនៅលើក្រឡាដូចផ្លូវ ៖ ដូច្នេះផ្លូវមកដល់ចំណតមួយជំហានប៉ុណ្ណោះ ។ 📃 ⟩
  vojaY = surGrid(vojaY + VOJA_SUPRO_LEVIGXO) - VOJA_SUPRO_LEVIGXO;
  // ⟨ ចុះឈ្មោះកម្រិតចំណត 📏 ⟩ ៖ ចានភ្ជាប់នៅមាត់ដីត្រូវយកកម្រិតនេះ ។
  // ផ្ទៃវេទិកាស្ថិតនៅ vojaY + VOJA_DIKECO , តិចជាងកម្រិតក្រឡា
  // ( VOJA_SUPRO_LEVIGXO - VOJA_DIKECO ) ប៉ុណ្ណោះ ។ បើចានគណនាកម្រិតដោយ
  // ច្បាប់ផ្សេង , ស្នាមដេករវាងផ្លូវនិងចំណតក្លាយជាជញ្ជាំងមួយជំហាន ។ 📃 ⟩
  registriDokanAlton(landX, landZ, vojaY + VOJA_SUPRO_LEVIGXO);

  // ⟨ វេទិកា 📃 ⟩
  const aldoniLandejon = ( centroZ: number, longo: number, supro: number ): void => {
    const bazo = supro - dikeco;
    const surfacaGeometrio = new THREE.ExtrudeGeometry(
      kreiDokanFormon(vojaLargho, longo),
      { depth: dikeco, bevelEnabled: false }
    );
    surfacaGeometrio.rotateX(-Math.PI / 2);
    const surfaco = new THREE.Mesh(surfacaGeometrio, diorito);
    surfaco.position.set(0, bazo, centroZ);
    surfaco.castShadow = surfaco.receiveShadow = true;
    group.add(surfaco);

    const rando = new THREE.Mesh(
      kreiDokanKadron(vojaLargho, longo, kadraStrio, dikeco + 0o1/0o20),
      andezito
    );
    rando.position.set(0, bazo + kadraMalsupro, centroZ);
    rando.castShadow = rando.receiveShadow = true;
    group.add(rando);

    // ⟨ រចនាសម្ព័ន្ធក្រោមពេញ 📃 ⟩
    // ⟨ វណ្ឌវង្កមួយ ការប្រើពីរ 📃 ⟩
    const plenaSupro = bazo - 0o1/0o200;
    let teraPlejProfunda = Infinity;
    for ( const lz of [ -longo / 0o2 - kadraStrio, -longo / 0o4, 0, longo / 0o4, longo / 0o2 ] ) {
      for ( const lx of [ -plenaDuono, 0, plenaDuono ] ) {
        teraPlejProfunda = Math.min(teraPlejProfunda,
          grundoFn(mondaX(lx, centroZ + lz), mondaZ(lx, centroZ + lz)) - vojaY);
      }
    }
    // ⟨ ពេលគ្មានទំហំអាចបំពេញ 📃 ⟩
    if ( teraPlejProfunda < bazo + kadraMalsupro ) {
      const plenaMalsupro = teraPlejProfunda - 0o1/0o4;
      const plenaGeometrio = new THREE.ExtrudeGeometry(
        kreiDokanEksteranFormon(vojaLargho, longo, kadraStrio + plenaProud),
        { depth: plenaSupro - plenaMalsupro, bevelEnabled: false }
      );
      plenaGeometrio.rotateX(-Math.PI / 2);
      const plenaMaso = new THREE.Mesh(plenaGeometrio, andezito);
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
  const antaŭaInsido = VOJA_TRUA_DUONO + 0o2;
  let teraMaks = -Infinity;
  for ( let lz = -duonL; lz <= duonL - antaŭaInsido; lz += 0o2 ) {
    for ( const lx of [ -plenaDuono, 0, plenaDuono ] )
      teraMaks = Math.max(teraMaks, grundoFn(mondaX(lx, lz), mondaZ(lx, lz)));
  }
  const ferdekaSupro = Math.max(surGrid(waterFn(x, z) + 0o3/0o20),
    Number.isFinite(teraMaks) ? surGrid(teraMaks + VOJA_SUPRO_LEVIGXO) : -Infinity);
  const plataSupro = vojaY + VOJA_SUPRO_LEVIGXO;
  const falto = plataSupro - ferdekaSupro;
  const havasStuparon = falto > STUPA_RISERO * 0o1/0o2;
  const nombro = havasStuparon
    ? kalkuliStupanNombron(falto) : 0;
  // ⟨ ប្រវែងរត់របស់ជណ្តើរ 📏 ⟩ ៖ កថាប៉ាសនីមួយៗទទឹងពាក់កណ្តាលឯកតា ,
  // តែមិនលើសពាក់កណ្តាលប្រវែងចំណត ដើម្បីនៅសល់វេទិកាគ្រប់គ្រាន់ ។ 📃 ⟩
  const stuparaLongo = havasStuparon
    ? Math.min(platformDepth * 0o1/0o2, Math.max(0o2, nombro * 0o1/0o2)) : 0;
  const landejaLocala = havasStuparon ? ferdekaSupro - vojaY : dikeco;
  // ⟨ វេទិកាចាប់ពីចុងជណ្តើរ 📏 ⟩ ៖ ចានគ្របដល់ VOJA_TRUA_DUONO ពីមាត់ដី ,
  // ជណ្តើរយកចន្លោះបន្ទាប់ , ហើយវេទិកាយកអ្វីដែលនៅសល់ ។ 📃 ⟩
  const landaInsido = VOJA_TRUA_DUONO + stuparaLongo;
  const landaLongo = Math.max(0o2, platformDepth - landaInsido);
  const landaCentroZ = -landaInsido / 0o2;
  const sekcioj: DokaSekcio[] = [];
  // ⟨ ចំណុចពីរ 📐 ⟩ ៖ គែមចានភ្ជាប់ ទៅ គែមវេទិកា ។ លេខជំហានពិត
  // គណនាដោយ kreiDokanStuparon ពេលដឹងកម្ពស់ចានភ្ជាប់រួច ។ 📃 ⟩
  const stuparaKomencoLz = duonL - VOJA_TRUA_DUONO;
  const stuparaFinaLz = stuparaKomencoLz - stuparaLongo;
  const stuparajPunktoj: [ number, number ][] = havasStuparon ? [
    [ mondaX(0, stuparaKomencoLz), mondaZ(0, stuparaKomencoLz) ],
    [ mondaX(0, stuparaFinaLz), mondaZ(0, stuparaFinaLz) ],
  ] : [];
  const landejaY = vojaY + landejaLocala;
  aldoniLandejon(landaCentroZ, landaLongo, landejaLocala);
  sekcioj.push({ lx: 0, lz: landaCentroZ, w: plenaDuono * 2, d: landaLongo, y: landejaY });

  group.position.set(x, vojaY, z);
  group.rotation.y = direkto;
  sceno.add(group);

  return { group, x, z, platformWidth: vojaLargho, platformDepth,
    platformY: vojaY + dikeco, landejaY, sekcioj, stuparajPunktoj };
}
