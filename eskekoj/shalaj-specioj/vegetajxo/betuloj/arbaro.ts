// ≺⧼ ព្រៃប៊ឺច 🌲 ⧽≻
import * as THREE from "three";
import { kreiBetulanFoliaranTeksajxon } from "../../../komunajxoj/teksajxoj/betula-foliaro.js";
import { kreiBetulanFoliaranBumpanTeksajxon } from "../../../komunajxoj/teksajxoj/betula-foliaro-bumpo.js";
import { kreiBetulanFolianTeksajxon } from "../../../komunajxoj/teksajxoj/betula-folio.js";
import { kreiSxelanTeksajxon } from "../../../komunajxoj/teksajxoj/sxelo.js";
import { kreiSxelanBumpanTeksajxon } from "../../../komunajxoj/teksajxoj/sxelo-bumpo.js";
import { kreiKlinoQuaternionon, kreiPoziciilon, hazardaKoloro, kreiVegetajxanHazardon } from "../hazardoj.js";
import { type ArboMetado } from "../metado.js";
import { kreiTrunkanGeometrion } from "../trunkoj.js";
import { konstruiBetulanFoliaranGeometrion } from "./foliaro.js";

export function konstruiArbaron(sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kreiVegetajxanHazardon(77531);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const sxelaBumpo = kreiSxelanBumpanTeksajxon();
  const trunkaGeometrio = kreiTrunkanGeometrion(0o3/0o10, 0o7/0o40, 0o3/0o10 * 1.42, 0o13);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, bumpMap: sxelaBumpo, bumpScale: 0o6/0o10, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return trunkoj;

  const kronaGeometrioj = konstruiBetulanFoliaranGeometrion();
  // ⟨ ស្លឹកពីរជាន់ 📃 ⟩
  // ⟨ ចម្លាក់ស្លឹក 📃 ⟩
  // ⟨ មាត្រវាយនភាព 📃 ⟩
  // ⟨ ការធ្វើម្តងទៀត 📃 ⟩
  const masaTeksajxo = kreiBetulanFoliaranTeksajxon().clone();
  masaTeksajxo.repeat.set(3, 3);
  masaTeksajxo.needsUpdate = true;
  const masaBumpo = kreiBetulanFoliaranBumpanTeksajxon().clone();
  masaBumpo.repeat.set(3, 3);
  masaBumpo.needsUpdate = true;
  // ⟨ vertexColors 📃 ⟩
  const kronaMaterialo = new THREE.MeshStandardMaterial({
    map: masaTeksajxo, color: 0xffffff, roughness: 0o35/0o40,
    bumpMap: masaBumpo, bumpScale: 0o12/0o10,
    vertexColors: true,
    side: THREE.DoubleSide,
  });
  // ⟨ ស្លឹកនីមួយៗ 📃 ⟩
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiBetulanFolianTeksajxon(), color: 0xffffff, roughness: 0o35/0o40,
    alphaTest: 0o45/0o100, vertexColors: true, side: THREE.DoubleSide,
  });
  const PADOJ = 0o10;
  const kronoj = new THREE.InstancedMesh(kronaGeometrioj.maso, kronaMaterialo, arboj.length * PADOJ);
  const folioj = new THREE.InstancedMesh(kronaGeometrioj.folioj, foliaMaterialo, arboj.length * PADOJ);
  // ⟨ ប័ណ្ណស្លឹកជាព័ត៌មានលម្អិត 📃 ⟩
  folioj.userData.vidlimo = 0o120;
  // ⟨ បំណែកតូចជាង 📃 ⟩
  // ⟨ វាស់វែង 📃 ⟩
  folioj.userData.vidlimaCelo = 0o50;
  const brancxoGeometrio = new THREE.CylinderGeometry(0o3/0o100, 0o5/0o100, 1, 5);
  const brancxoj = new THREE.InstancedMesh(brancxoGeometrio, trunkaMaterialo, arboj.length * PADOJ);

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  // ⟨ បន្ទះពីរ 📃 ⟩
  const paletroFolioj = [ 0xeef4dc, 0xe2ecc6, 0xf6f8ea, 0xd6e4b8, 0xe8f0d2 ];
  // ⟨ ស្នូលមិនត្រូវខ្មៅ 📃 ⟩
  const paletroMaso = [ 0x51703f, 0x476437, 0x5b7a48, 0x3f5a33, 0x4d6b3d ];

  arboj.forEach(( t, i ) => {
    const h = 0o64/0o10 + t.s * 0o44/0o10;
    const Q = kreiKlinoQuaternionon(hazardaGenerilo, 0o2/0o20, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Q);

    // ⟨ ដើមបញ្ចប់ក្នុងកំពូល 📃 ⟩
    const trunkaAlto = h * 0.9;
    M.compose(pozicio(new THREE.Vector3(0, trunkaAlto / 2, 0)), Q, new THREE.Vector3(1, trunkaAlto, 1));
    trunkoj.setMatrixAt(i, M);

    const helo = 0.94 + hazardaGenerilo() * 0.06;
    C.setRGB(
      helo * ( 0.98 + hazardaGenerilo() * 0.03 ),
      helo,
      helo * ( 0.93 + hazardaGenerilo() * 0.07 ));
    trunkoj.setColorAt(i, C);

    const kronoRadiuso = 0o215/0o100 * t.s + 0o63/0o100;
    const foliaraSkalo = kronoRadiuso * 0o52/0o100 * ( 0o36/0o40 + hazardaGenerilo() * 0o15/0o100 );
    // ⟨ ខ្នើយកំពូល 📃 ⟩
    // ⟨ រូបរាងកំពូល 📃 ⟩
    const padBazoj = [
      { a: 0o1/0o2, fy: 0.48, fr: 0.36, s: 1.30 },
      { a: 3.7, fy: 0.51, fr: 0.40, s: 1.35 },
      { a: 1.9, fy: 0.63, fr: 0.58, s: 1.42 },
      { a: 5.1, fy: 0.62, fr: 0.55, s: 1.34 },
      { a: 0.2, fy: 0.70, fr: 0.52, s: 1.30 },
      { a: 3.0, fy: 0.74, fr: 0.46, s: 1.36 },
      { a: 1.3, fy: 0.84, fr: 0.34, s: 1.25 },
      { a: 4.2, fy: 0.92, fr: 0.20, s: 1.30 },
    ];
    padBazoj.forEach(( pb, k ) => {
      const idx = i * PADOJ + k;
      const a = pb.a + ( hazardaGenerilo() - 0o5/0o10 ) * 0o6/0o10;
      const yPado = h * ( pb.fy + ( hazardaGenerilo() - 0o5/0o10 ) * 0o4/0o100 );
      const rPado = foliaraSkalo * ( pb.fr + ( hazardaGenerilo() - 0o5/0o10 ) * 0o10/0o100 );
      const sPado = foliaraSkalo * pb.s * ( 0o36/0o40 + hazardaGenerilo() * 0o15/0o100 );
      const padoQ = Q.clone().multiply(
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), a));
      M.compose(pozicio(new THREE.Vector3(Math.cos(a) * rPado, yPado, Math.sin(a) * rPado)),
        padoQ, new THREE.Vector3(sPado, sPado, sPado));
      kronoj.setMatrixAt(idx, M);
      kronoj.setColorAt(idx, hazardaKoloro(hazardaGenerilo, C, paletroMaso));
      folioj.setMatrixAt(idx, M);
      folioj.setColorAt(idx, hazardaKoloro(hazardaGenerilo, C, paletroFolioj));

      const yBrancxo = yPado - h * 0o1/0o10;
      const el = new THREE.Vector3(0, yBrancxo, 0);
      const al = new THREE.Vector3(Math.cos(a) * rPado, yPado, Math.sin(a) * rPado);
      const direkto = al.clone().sub(el);
      const longoB = direkto.length();
      if ( longoB > 0o1/0o100 ) {
        const Qb = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0), direkto.clone().normalize());
        const centroB = el.clone().add(al).multiplyScalar(0o1/0o2);
        M.compose(pozicio(centroB), Q.clone().multiply(Qb), new THREE.Vector3(1, longoB, 1));
        brancxoj.setMatrixAt(idx, M);
      }
    });
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  kronoj.instanceMatrix.needsUpdate = true;
  folioj.instanceMatrix.needsUpdate = true;
  // ⟨ ឈ្មោះ 📃 ⟩
  trunkoj.name = "betulaTrunko";
  kronoj.name = "betulaKrono";
  folioj.name = "betulaFolio";
  brancxoj.name = "betulaBrancxo";
  brancxoj.instanceMatrix.needsUpdate = true;
  if ( trunkoj.instanceColor ) trunkoj.instanceColor.needsUpdate = true;
  if ( kronoj.instanceColor ) kronoj.instanceColor.needsUpdate = true;
  if ( folioj.instanceColor ) folioj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = kronoj.castShadow = brancxoj.castShadow = true;
  folioj.castShadow = false;
  sceno.add(trunkoj, kronoj, folioj, brancxoj);
  return trunkoj;
}
