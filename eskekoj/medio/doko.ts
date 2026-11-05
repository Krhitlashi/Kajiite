// ≺⧼ ចំណតទឹក ⚓ ⧽≻
import * as THREE from "three";
import { kreiAndezitanTeksajxon } from "../komunajxoj/teksajxoj/andezito.js";
import { kreiDioritanTeksajxon } from "../komunajxoj/teksajxoj/diorito.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon } from "../komunajxoj/materialoj.js";
import { surGrid, VOJA_DIKECO, VOJA_SUPRO_LEVIGXO, VOJA_TRUA_DUONO } from "./vojoj/mezuroj.js";
import { kreiDokanEksteranFormon, kreiDokanFormon, kreiDokanKadron } from "./doko/formoj.js";
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
  const antaŭaRadiuso = 0o4/0o10;
  const dioritaTeksajxo = kreiDioritanTeksajxon();
  const andezitaTeksajxo = kreiAndezitanTeksajxon();
  const diorito = kreiDioritanMaterialon(dioritaTeksajxo);
  const andezito = kreiAndezitanMaterialon(andezitaTeksajxo);
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
      kreiDokanFormon(vojaLargho, longo, antaŭaRadiuso),
      { depth: dikeco, bevelEnabled: false }
    );
    surfacaGeometrio.rotateX(-Math.PI / 2);
    const surfaco = new THREE.Mesh(surfacaGeometrio, diorito);
    surfaco.position.set(0, bazo, centroZ);
    surfaco.castShadow = surfaco.receiveShadow = true;
    group.add(surfaco);

    const rando = new THREE.Mesh(
      kreiDokanKadron(vojaLargho, longo, antaŭaRadiuso, kadraStrio, dikeco + 0o1/0o20),
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
        kreiDokanEksteranFormon(vojaLargho, longo, antaŭaRadiuso, kadraStrio + plenaProud),
        { depth: plenaSupro - plenaMalsupro, bevelEnabled: false }
      );
      plenaGeometrio.rotateX(-Math.PI / 2);
      const plenaMaso = new THREE.Mesh(plenaGeometrio, andezito);
      plenaMaso.position.set(0, plenaMalsupro, centroZ);
      plenaMaso.castShadow = plenaMaso.receiveShadow = true;
      group.add(plenaMaso);
    }
  };

  // ⟨ កម្ពស់វេទិកា 📃 ⟩
  // ⟨ កម្រិតចុះចតក៏នៅលើក្រឡា ៖ ជណ្តើរមានជំហានស្មើគ្នាបេះបិទ ។ 📃 ⟩
  // ⟨ ចំណតត្រូវរួបរួមជាមួយផ្លូវ ៖ កម្រិតរបស់វាមិនអាចទាបជាងផ្លូវបានទេ ,
  // បើមិនដូច្នេះផ្លូវហោះលើវា ហើយចំណតនៅខាងក្រោមបង្កើតជញ្ជាំងឈរ ។
  // ដូច្នេះកំណត់កម្រិតអប្បបរមាឱ្យស្មើ dikeco ( កម្រិតផ្លូវ ) ។ 📃 ⟩
  const landejaLocala = Math.max(dikeco, surGrid(waterFn(x, z) + 0o3/0o20) - vojaY);
  const flankaDuono = vojaLargho / 2 + 0o1/0o2;
  const aksaSupra = ( lz: number ): number => Math.max(
    heightFn(mondaX(flankaDuono, lz), mondaZ(flankaDuono, lz)),
    heightFn(mondaX(-flankaDuono, lz), mondaZ(-flankaDuono, lz)));
  // ⟨ កន្លែងជណ្តើរចាប់ផ្តើម 📃 ⟩
  const landejaMinimumo = 0o3;
  // ⟨ ចំណតយកត្រឹមពាក់កណ្តាល ៖ ជណ្តើរត្រូវមានកន្លែងរត់វែងល្មម 📃 ⟩
  const landejaMaksimumo = platformDepth * 0o1/0o2;
  let stuparaZ0 = -duonL + landejaMaksimumo;
  for ( let lz = -duonL; lz < -duonL + landejaMaksimumo; lz += 0o1/0o4 ) {
    if ( aksaSupra(lz) - vojaY > landejaLocala ) { stuparaZ0 = lz; break; }
  }
  // ⟨ ហើយពេលគែមនោះជិតពេក 📃 ⟩
  const landejaZ0 = Math.min(stuparaZ0, -duonL + landejaMaksimumo);
  const landejaLongo = Math.max(landejaMinimumo, landejaZ0 + duonL);
  const landejaCentroZ = landejaZ0 - landejaLongo / 2;
  const sekcioj: DokaSekcio[] = [];
  // ⟨ ជណ្តើរ ៖ ចាប់ផ្តើមត្រង់មាត់ច្រាំងចំណត , បញ្ចប់ត្រង់គែមចំណត ។
  // ចានភ្ជាប់ស្ថិតនៅចន្លោះ VOJA_EKSTERA_DUONO + KORNA_R ពីមាត់ច្រាំង , ដូច្នេះដៃរបស់
  // ចានយ៉ាងតិចឈានដល់មាត់ច្រាំងជានិច្ច ។ បើជណ្តើរចាប់ចូលក្នុងលើសពីនេះ ,
  // ហើយចាននៅឆ្ងាយ , នៅសល់ចន្លោះដីទទេដូចជំហានមួយបាត់នៅចុងជណ្តើរ ។
  // ចំណុចតែពីរ ៖ លេខជំហានត្រូវគណនាពេលដឹងកម្ពស់ចានភ្ជាប់ ។ 📃 ⟩
  const stuparaKomencoLz = duonL;
  const stuparajPunktoj: [ number, number ][] = landejaLocala >= dikeco ? [] : [
    [ mondaX(0, stuparaKomencoLz), mondaZ(0, stuparaKomencoLz) ],
    [ mondaX(0, landejaZ0), mondaZ(0, landejaZ0) ],
  ];
  // ⟨ ផ្ទៃដែលជណ្តើរឈប់ ៖ ខ្នងចំណត , ឬវេទិកាពេញ 📃 ⟩
  const landejaY = vojaY + ( landejaLocala >= dikeco ? dikeco : landejaLocala );

  // ⟨ វេទិកាឈប់ត្រង់គែមចានភ្ជាប់ 📏 ⟩ ៖ ចានភ្ជាប់ឈរនៅមាត់ដី , ហើយលាតចូលមកក្នុង
  // ចំណតប្រវែង VOJA_TRUA_DUONO ។ បើវេទិកាលាតដល់មាត់ដី , ចាននិងវេទិកាជាន់គ្នា
  // ពីរឯកតា ៖ កម្ពស់ខុសគ្នាបន្តិច , ដូច្នេះផ្ទៃពីរប៉ះគ្នាហើយលេចជាស្រទាប់ជាន់គ្នា ។
  // ដូច្នេះវេទិកាចាប់ពីគែមចាន , ហើយចានបំពេញចន្លោះរហូតដល់មាត់ដី ។ 📃 ⟩
  const landaInsido = VOJA_TRUA_DUONO;
  const landaLongo = Math.max(0o2, platformDepth - landaInsido);
  const landaCentroZ = -landaInsido / 0o2;
  if ( landejaLocala >= dikeco ) {
    // ⟨ ចំណតនៅ ( ឬក្រោម ) ផ្ទៃទឹក 📃 ⟩
    aldoniLandejon(landaCentroZ, landaLongo, dikeco);
    sekcioj.push({ lx: 0, lz: landaCentroZ, w: plenaDuono * 2, d: landaLongo, y: vojaY + dikeco });
  } else {
    aldoniLandejon(landejaCentroZ, landejaLongo, landejaLocala);
    sekcioj.push({ lx: 0, lz: landejaCentroZ, w: plenaDuono * 2, d: landejaLongo,
      y: vojaY + landejaLocala });
  }

  group.position.set(x, vojaY, z);
  group.rotation.y = direkto;
  sceno.add(group);

  return { group, x, z, platformWidth: vojaLargho, platformDepth,
    platformY: vojaY + dikeco, landejaY, sekcioj, stuparajPunktoj };
}
