// ≺⧼ ចំណតទឹក ⚓ ⧽≻
import * as THREE from "three";
import { kreiAndezitanTeksajxon } from "../komunajxoj/teksajxoj/andezito.js";
import { kreiDioritanTeksajxon } from "../komunajxoj/teksajxoj/diorito.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon } from "../komunajxoj/materialoj.js";
import { VOJA_DIKECO } from "./vojoj/mezuroj.js";
import { kreiDokanEksteranFormon, kreiDokanFormon, kreiDokanKadron } from "./doko/formoj.js";
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
  profundo = 0o14
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
          heightFn(mondaX(lx, centroZ + lz), mondaZ(lx, centroZ + lz)) - vojaY);
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
  const landejaLocala = waterFn(x, z) - vojaY + 0o3/0o20;
  const flankaDuono = vojaLargho / 2 + 0o1/0o2;
  const aksaSupra = ( lz: number ): number => Math.max(
    heightFn(mondaX(flankaDuono, lz), mondaZ(flankaDuono, lz)),
    heightFn(mondaX(-flankaDuono, lz), mondaZ(-flankaDuono, lz)));
  // ⟨ កន្លែងជណ្តើរចាប់ផ្តើម 📃 ⟩
  const landejaMinimumo = 0o3;
  const landejaMaksimumo = platformDepth * 0o3/0o4;
  let stuparaZ0 = -duonL + landejaMaksimumo;
  for ( let lz = -duonL; lz < -duonL + landejaMaksimumo; lz += 0o1/0o4 ) {
    if ( aksaSupra(lz) - vojaY > landejaLocala ) { stuparaZ0 = lz; break; }
  }
  // ⟨ ហើយពេលគែមនោះជិតពេក 📃 ⟩
  const landejaZ0 = Math.min(stuparaZ0, -duonL + landejaMaksimumo);
  const landejaLongo = Math.max(landejaMinimumo, landejaZ0 + duonL);
  const landejaCentroZ = landejaZ0 - landejaLongo / 2;
  const sekcioj: DokaSekcio[] = [];
  const stuparajPunktoj: [ number, number ][] = [];

  if ( landejaLocala >= dikeco ) {
    // ⟨ ចំណតនៅ ( ឬក្រោម ) ផ្ទៃទឹក 📃 ⟩
    aldoniLandejon(0, platformDepth, dikeco);
    sekcioj.push({ lx: 0, lz: 0, w: plenaDuono * 2, d: platformDepth, y: vojaY + dikeco });
  } else {
    aldoniLandejon(landejaCentroZ, landejaLongo, landejaLocala);
    sekcioj.push({ lx: 0, lz: landejaCentroZ, w: plenaDuono * 2, d: landejaLongo,
      y: vojaY + landejaLocala });

    // ⟨ ជណ្តើរជាផ្លូវធម្មតា 📃 ⟩
    const STUPA_ALTIGXO = 0o3/0o20;
    const STUPA_PASO = 0o1/0o20;
    const STUPA_LONGO_MAKS = 0o3;
    const stuparaSupra = ( lz: number ): number => Math.min(vojaY, aksaSupra(lz));
    let lz = duonL + 0o3/0o2;
    let nivelo = stuparaSupra(lz);
    stuparajPunktoj.push([ mondaX(0, lz), mondaZ(0, lz) ]);
    while ( lz > landejaZ0 + STUPA_PASO ) {
      let rando = Math.max(landejaZ0, lz - STUPA_LONGO_MAKS);
      for ( let testo = lz - STUPA_PASO; testo > rando + STUPA_PASO; testo -= STUPA_PASO ) {
        if ( stuparaSupra(testo) <= nivelo - STUPA_ALTIGXO ) { rando = testo; break; }
      }
      rando = Math.max(landejaZ0, rando);
      stuparajPunktoj.push([ mondaX(0, rando), mondaZ(0, rando) ]);
      lz = rando;
      nivelo = stuparaSupra(lz);
    }
    if ( lz > landejaZ0 + 0o1/0o100 ) {
      stuparajPunktoj.push([ mondaX(0, landejaZ0), mondaZ(0, landejaZ0) ]);
    }
  }

  group.position.set(x, vojaY, z);
  group.rotation.y = direkto;
  sceno.add(group);

  return { group, x, z, platformWidth: vojaLargho, platformDepth,
    platformY: vojaY + dikeco, sekcioj, stuparajPunktoj, stuparaSupro: vojaY };
}
