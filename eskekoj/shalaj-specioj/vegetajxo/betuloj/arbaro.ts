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

// ⟨ ក្រឡាដើមឈើ ៖ ដើមឈើត្រូវដាក់ជាក្រុមតាមក្រឡាដី ។ frustum culling ធ្វើការតាម
// mesh , ដូច្នេះបើព្រៃទាំងមូលនៅក្នុង mesh តែមួយ , ដើមឈើក្រោយខ្នងក៏គូរដែរ ។
// បែងចែកជាក្រឡា ហើយបិទបានក្រឡាដែលមិននៅក្នុងវិស័យឃើញ ។ 📃 ⟩
const ARBA_KROLO = 0o100;

interface ArbaBukedo {
  trunkoj: THREE.Matrix4[]; trunkojKoloroj: THREE.Color[];
  kronoj: THREE.Matrix4[]; kronojKoloroj: THREE.Color[];
  folioj: THREE.Matrix4[]; foliojKoloroj: THREE.Color[];
  brancxoj: THREE.Matrix4[];
}

export function konstruiArbaron(sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kreiVegetajxanHazardon(0o227333);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const sxelaBumpo = kreiSxelanBumpanTeksajxon();
  const trunkaGeometrio = kreiTrunkanGeometrion(0o3/0o10, 0o7/0o40, 0o3/0o10 * 0o133/0o100, 0o13);
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
  const brancxoGeometrio = new THREE.CylinderGeometry(0o3/0o100, 0o5/0o100, 1, 5);

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  // ⟨ បន្ទះពីរ 📃 ⟩
  const paletroFolioj = [ 0xeef4dc, 0xe2ecc6, 0xf6f8ea, 0xd6e4b8, 0xe8f0d2 ];
  // ⟨ ស្នូលមិនត្រូវខ្មៅ 📃 ⟩
  const paletroMaso = [ 0x51703f, 0x476437, 0x5b7a48, 0x3f5a33, 0x4d6b3d ];

  // ⟨ ដំណាក់កាលទីមួយ ៖ គណនាការតម្រឹម ។ លំដាប់ចៃដន្យដូចដើម , ដូច្នេះព្រៃដូចគ្នា ។ 📃 ⟩
  const bukedoj = new Map<string, ArbaBukedo>();
  const bukedoDe = ( x: number, z: number ): ArbaBukedo => {
    const klavo = Math.floor(x / ARBA_KROLO) + "," + Math.floor(z / ARBA_KROLO);
    let bukedo = bukedoj.get(klavo);
    if ( !bukedo ) {
      bukedo = { trunkoj: [], trunkojKoloroj: [], kronoj: [], kronojKoloroj: [],
        folioj: [], foliojKoloroj: [], brancxoj: [] };
      bukedoj.set(klavo, bukedo);
    }
    return bukedo;
  };

  arboj.forEach(( t ) => {
    const h = 0o64/0o10 + t.s * 0o44/0o10;
    const Q = kreiKlinoQuaternionon(hazardaGenerilo, 0o2/0o20, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Q);
    const bukedo = bukedoDe(t.x, t.z);

    // ⟨ ដើមបញ្ចប់ក្នុងកំពូល 📃 ⟩
    const trunkaAlto = h * 0o35/0o40;
    M.compose(pozicio(new THREE.Vector3(0, trunkaAlto / 2, 0)), Q, new THREE.Vector3(1, trunkaAlto, 1));
    bukedo.trunkoj.push(M.clone());

    const helo = 0o17/0o20 + hazardaGenerilo() * 0o1/0o20;
    C.setRGB(
      helo * ( 0o77/0o100 + hazardaGenerilo() * 0o1/0o40 ),
      helo,
      helo * ( 0o17/0o20 + hazardaGenerilo() * 0o1/0o20 ));
    bukedo.trunkojKoloroj.push(C.clone());

    const kronoRadiuso = 0o215/0o100 * t.s + 0o63/0o100;
    const foliaraSkalo = kronoRadiuso * 0o52/0o100 * ( 0o36/0o40 + hazardaGenerilo() * 0o15/0o100 );
    // ⟨ ខ្នើយកំពូល 📃 ⟩
    // ⟨ រូបរាងកំពូល 📃 ⟩
    const padBazoj = [
      { a: 0o1/0o2, fy: 0o37/0o100, fr: 0o27/0o100, s: 0o123/0o100 },
      { a: 0o355/0o100, fy: 0o41/0o100, fr: 0o15/0o40, s: 0o53/0o40 },
      { a: 0o75/0o40, fy: 0o5/0o10, fr: 0o45/0o100, s: 0o133/0o100 },
      { a: 0o243/0o40, fy: 0o5/0o10, fr: 0o43/0o100, s: 0o53/0o40 },
      { a: 0o15/0o100, fy: 0o55/0o100, fr: 0o41/0o100, s: 0o123/0o100 },
      { a: 0o30/0o10, fy: 0o57/0o100, fr: 0o35/0o100, s: 0o127/0o100 },
      { a: 0o123/0o100, fy: 0o33/0o40, fr: 0o13/0o40, s: 0o12/0o10 },
      { a: 0o415/0o100, fy: 0o73/0o100, fr: 0o15/0o100, s: 0o123/0o100 },
    ];
    padBazoj.forEach(( pb ) => {
      const a = pb.a + ( hazardaGenerilo() - 0o5/0o10 ) * 0o6/0o10;
      const yPado = h * ( pb.fy + ( hazardaGenerilo() - 0o5/0o10 ) * 0o4/0o100 );
      const rPado = foliaraSkalo * ( pb.fr + ( hazardaGenerilo() - 0o5/0o10 ) * 0o10/0o100 );
      const sPado = foliaraSkalo * pb.s * ( 0o36/0o40 + hazardaGenerilo() * 0o15/0o100 );
      const padoQ = Q.clone().multiply(
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), a));
      M.compose(pozicio(new THREE.Vector3(Math.cos(a) * rPado, yPado, Math.sin(a) * rPado)),
        padoQ, new THREE.Vector3(sPado, sPado, sPado));
      bukedo.kronoj.push(M.clone());
      bukedo.kronojKoloroj.push(hazardaKoloro(hazardaGenerilo, C, paletroMaso).clone());
      bukedo.folioj.push(M.clone());
      bukedo.foliojKoloroj.push(hazardaKoloro(hazardaGenerilo, C, paletroFolioj).clone());

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
        bukedo.brancxoj.push(M.clone());
      }
    });
  });

  // ⟨ ដំណាក់កាលទីពីរ ៖ mesh មួយក្នុងមួយក្រឡា ។ 📃 ⟩
  let unuaTrunko: THREE.InstancedMesh | null = null;
  const ĉiujTrunkaj: THREE.InstancedMesh[] = [];
  for ( const bukedo of bukedoj.values() ) {
    const kronoj = new THREE.InstancedMesh(kronaGeometrioj.maso, kronaMaterialo, bukedo.kronoj.length);
    const folioj = new THREE.InstancedMesh(kronaGeometrioj.folioj, foliaMaterialo, bukedo.folioj.length);
    for ( let i = 0; i < bukedo.kronoj.length; i++ ) {
      kronoj.setMatrixAt(i, bukedo.kronoj[i]);
      kronoj.setColorAt(i, bukedo.kronojKoloroj[i]);
      folioj.setMatrixAt(i, bukedo.folioj[i]);
      folioj.setColorAt(i, bukedo.foliojKoloroj[i]);
    }
    const cxelajTrunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, bukedo.trunkoj.length);
    for ( let i = 0; i < bukedo.trunkoj.length; i++ ) {
      cxelajTrunkoj.setMatrixAt(i, bukedo.trunkoj[i]);
      cxelajTrunkoj.setColorAt(i, bukedo.trunkojKoloroj[i]);
    }
    // ⟨ ប័ណ្ណស្លឹកជាព័ត៌មានលម្អិត 📃 ⟩
    folioj.userData.vidlimo = 0o120;
    // ⟨ បំណែកតូចជាង 📃 ⟩
    // ⟨ វាស់វែង 📃 ⟩
    folioj.userData.vidlimaCelo = 0o50;
    const brancxoj = new THREE.InstancedMesh(brancxoGeometrio, trunkaMaterialo, bukedo.brancxoj.length);
    for ( let i = 0; i < bukedo.brancxoj.length; i++ ) brancxoj.setMatrixAt(i, bukedo.brancxoj[i]);

    cxelajTrunkoj.instanceMatrix.needsUpdate = true;
    kronoj.instanceMatrix.needsUpdate = true;
    folioj.instanceMatrix.needsUpdate = true;
    brancxoj.instanceMatrix.needsUpdate = true;
    if ( cxelajTrunkoj.instanceColor ) cxelajTrunkoj.instanceColor.needsUpdate = true;
    if ( kronoj.instanceColor ) kronoj.instanceColor.needsUpdate = true;
    if ( folioj.instanceColor ) folioj.instanceColor.needsUpdate = true;
    // ⟨ ឈ្មោះ 📃 ⟩
    cxelajTrunkoj.name = "betulaTrunko";
    kronoj.name = "betulaKrono";
    folioj.name = "betulaFolio";
    brancxoj.name = "betulaBrancxo";
    cxelajTrunkoj.castShadow = kronoj.castShadow = brancxoj.castShadow = true;
    folioj.castShadow = false;
    sceno.add(cxelajTrunkoj, kronoj, folioj, brancxoj);
    ĉiujTrunkaj.push(cxelajTrunkoj);
    if ( !unuaTrunko ) unuaTrunko = cxelajTrunkoj;
  }
  // ⟨ ដើមទាំងអស់ ៖ អ្នកហៅខ្លះចងដើមសម្រាប់ដាក់លីគែន ។ ដោយក្រឡា , ត្រូវឲ្យវាដឹង
  // រឿងក្រឡាទាំងអស់ មិនមែនតែក្រឡាដំបូងទេ ។ 📃 ⟩
  const rezulto = unuaTrunko ?? trunkoj;
  rezulto.userData.ĉiujTrunkaj = ĉiujTrunkaj;
  return rezulto;
}
