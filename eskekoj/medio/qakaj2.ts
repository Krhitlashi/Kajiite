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

// ⟨ ſᶘɔ ʌ ſןɔ˞ᴜƴ , ꞙɭɔ , ſɭэ ֭ſɭэ , ⟅ ⟩
// ⟨ ſɭɹ ſןᴜ , ꞙɭı , ſɭᴜ ſ͕ȷɔ , ⟅ ⟩
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
  // ⟨ j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , ⟅ ⟩
  const dikeco = VOJA_DIKECO;
  // ⟨ ſןw ſɭɔƽ , ſɭэ ֭ſɭэ , ꞙɭı 📏 ⟩ , ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭı ,
  //   j͑ʃɜ ſɭ,ᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭɔ , ꞙɭı , ſןw ſɭɔƽ , ⟅ 📃 ⟩
  const { supraMaterialo: t6g6, bordaMaterialo: t6hna } = kf2Hak6h6nMaterialojn(
    kf2T6g6Pukek(), kf2T6hnaPukek(), -0o2, -0o4, -0o1, -0o1 );
  // ⟨ j͑ʃ'ɔ ŋᷠɹ , ꞙɭɿ , ⟅ ⟩
  const joqaStrio = DOKO_JOQA_SEFINI;
  const joqaMalsupro = -0o1/0o40;
  const plenaDuono = k6h6Largho / 2 + joqaStrio;
  const plenaProud = 0o1/0o500;
  // ⟨ j͑ʃ'ɔ ŋᷠɹ , ſןɔ˞ᴜƴ , ⟅ ⟩

  const duonL = platformDepth / 2;
  const cosR = Math.cos(c2w2q), sinR = Math.sin(c2w2q);
  const mondaX = ( lx: number, lz: number ) => x + cosR * lx + sinR * lz;
  const mondaZ = ( lx: number, lz: number ) => z - sinR * lx + cosR * lz;

  const landX = x + sinR * duonL, landZ = z + cosR * duonL;
  let k6h6Y = heightFn(x, z);
  for ( const ofseto of [ -0o6/0o10, 0, 0o6/0o10 ] ) {
    k6h6Y = Math.max(k6h6Y, heightFn(landX + cosR * ofseto, landZ - sinR * ofseto));
  }
  // ⟨ ſɭᴜ ſןᴜ , ſɭɹ ſןᴜ , ſɭэ ֭ſɭэ , ⟅ ſɭэ ֭ſɭэ , ꞙɭı , ⟅ 📃 ⟩
  k6h6Y = surGrid(k6h6Y + VOJA_SUPRO_LEVIGXO) - VOJA_SUPRO_LEVIGXO;
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ſɭᴜ ſןᴜ 📏 ⟩ , ſɭᴜ ſןᴜ , ſɭɜ ſɭ,w , ꞙɭı ,
  //   k6h6Y + VOJA_DIKECO , ꞙɭɔ , ſɭɹ ſןᴜ ,
  //   ( VOJA_SUPRO_LEVIGXO - VOJA_DIKECO ) , ſɭᴜ ſןᴜ , ⟅ ꞙɭı ,
  //   ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭı , ⟅ 📃 ⟩
  registriDokanAlton(landX, landZ, k6h6Y + VOJA_SUPRO_LEVIGXO);

  // ⟨ ſɭᴜ ſןᴜ , ⟅ ⟩
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

    // ⟨ j͑ʃᴜ ʃɜ , ꞙɭı , ⟅ ⟩
    // ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı , ꞙɭɿ ⟅ ⟩
    const plenaSupro = kozuni - 0o1/0o200;
    let teraPlejProfunda = Infinity;
    for ( const lz of [ -sahakani / 0o2 - joqaStrio, -sahakani / 0o4, 0, sahakani / 0o4, sahakani / 0o2 ] ) {
      for ( const lx of [ -plenaDuono, 0, plenaDuono ] ) {
        teraPlejProfunda = Math.min(teraPlejProfunda,
          grundoFn(mondaX(lx, centroZ + lz), mondaZ(lx, centroZ + lz)) - k6h6Y);
      }
    }
    // ⟨ ꞙɭı , ſɭᴜ ſןᴜ , ⟅ ⟩
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

  // ⟪ ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ 📏 ⟫
  // ⟨ ſɭᴜ ſןᴜ , ſᶘᴜ j͑ʃᴜ , ⟅ ꞙɭı , ſᶘᴜ j͑ʃᴜ , ſɭэ ֭ſɭэ , ⟅
  //   ꞙɭı , ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭı ,
  //   ꞙɭɔ , ſןɔ˞ᴜƴ , ⟅ ſɭэ ֭ſɭэ , ſᶘᴜ j͑ʃᴜ ,
  //   ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
  // ⟨ ſɭᴜ ſןᴜ , ſɭɜ ſɭ,w , 📏 ⟩ , ſɭᴜ ſןᴜ , ſᶘᴜ j͑ʃᴜ ,
  //   ſɭɜ ſɭ,w , ſᶘᴜ j͑ʃᴜ , ſןɔ˞ᴜƴ , ſɭᴜ ſןᴜ , ꞙɭı ,
  //   ſɭᴜ ſןᴜ , ꞙɭı , ſɭᴜ ſןᴜ , ſɭɜ ſɭ,w ,
  //   ſɭᴜ ſןᴜ , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭı , ſɭᴜ ſןᴜ ,
  //   ꞙɭɔ , ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ , ꞙɭı , ⟅ 📃 ⟩
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
  // ⟨ ſןɔ˞ᴜƴ , j͑ʃᴜ ʃɜ 📏 ⟩ , ꞙɭı , ꞙɭı ,
  //   ꞙɭɔ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const stuparaLongo = havasStuparon
    ? Math.min(platformDepth * 0o1/0o2, Math.max(0o2, nombro * 0o1/0o2)) : 0;
  const landejaLocala = havasStuparon ? ferdekaSupro - k6h6Y : dikeco;
  // ⟨ ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ 📏 ⟩ , ſɭᴜ ſןᴜ , VOJA_TRUA_DUONO , ꞙɭı ,
  //   ſןɔ˞ᴜƴ , ꞙɭı , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
  const landaInsido = VOJA_TRUA_DUONO + stuparaLongo;
  const landaLongo = Math.max(0o2, platformDepth - landaInsido);
  const landaCentroZ = -landaInsido / 0o2;
  const sekcioj: DokaSekcio[] = [];
  // ⟨ }ʃɹƽ , ꞙɭɿ 📐 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ſɭᴜ ſןᴜ ⟅ ꞙɭı ,
  //   kf2DokanStuparon , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
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
