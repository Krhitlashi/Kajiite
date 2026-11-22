// ≺⧼ ព្រៃប៊ឺច 🌲 ⧽≻
import * as THREE from "three";
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

export function konstruiArbaron(qena: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kreiVegetajxanHazardon(0o227333);
  const sxelaTeksajxo = kreiSxelanTeksajxon();
  const sxelaBumpo = kreiSxelanBumpanTeksajxon();
  const trunkaGeometrio = kreiTrunkanGeometrion(0o1/0o4, 0o1/0o40, 0o3/0o10, 0o14);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: sxelaTeksajxo, bumpMap: sxelaBumpo, bumpScale: 0o1/0o20, roughness: 0o55/0o100 });
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return trunkoj;

  const kronaGeometrioj = konstruiBetulanFoliaranGeometrion();
  // ⟨ ស្លឹកឆ្ងាយមានខ្សែកោងតែមួយ ប៉ុន្តែទីតាំង និង ពណ៌ដូចស្លឹកជិត 📃 ⟩
  const malproksimaFoliaGeometrio = konstruiBetulanFoliaranGeometrion(0o1).folioj;
  const kronaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x887858, roughness: 0o1, vertexColors: true,
  });
  // ⟨ ស្លឹកនីមួយៗ 📃 ⟩
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiBetulanFolianTeksajxon(), color: 0xffffff, roughness: 0o35/0o40,
    alphaTest: 0o45/0o100, vertexColors: true, side: THREE.DoubleSide,
  });
  const brancxoGeometrio = new THREE.CylinderGeometry(0o3/0o4, 0o1, 0o1, 0o6, 0o1, true);

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  // ⟨ បន្ទះពីរ 📃 ⟩
  const paletroFolioj = [ 0xf0f8e8, 0xe8f0d8, 0xe0e8d0, 0xe8f0e0 ];
  // ⟨ ស្នូលមិនត្រូវខ្មៅ 📃 ⟩
  const paletroMaso = [ 0xf0f8e8, 0xe8f0e0, 0xe0e8d8, 0xf8f8f0 ];

  const bukedoj = new Map<string, ArbaBukedo>();
  const bukedoDe = ( x: number, z: number ): ArbaBukedo => {
    const ca3aq = Math.floor(x / ARBA_KROLO) + "," + Math.floor(z / ARBA_KROLO);
    let bukedo = bukedoj.get(ca3aq);
    if ( !bukedo ) {
      bukedo = { trunkoj: [], trunkojKoloroj: [], kronoj: [], kronojKoloroj: [],
        folioj: [], foliojKoloroj: [], brancxoj: [] };
      bukedoj.set(ca3aq, bukedo);
    }
    return bukedo;
  };

  arboj.forEach(( t ) => {
    const h = 0o64/0o10 + t.s * 0o44/0o10;
    const Q = kreiKlinoQuaternionon(hazardaGenerilo, 0o2/0o20, hazardaGenerilo() * Math.PI * 2);
    const kozuni = new THREE.Vector3(t.x, t.h, t.z);
    const raqa = kreiPoziciilon(kozuni, Q);
    const bukedo = bukedoDe(t.x, t.z);

    // ⟨ ដើមបញ្ចប់ក្នុងកំពូល 📃 ⟩
    const trunkaAlto = h * 0o35/0o40;
    M.compose(raqa(new THREE.Vector3(0, trunkaAlto / 2, 0)), Q, new THREE.Vector3(1, trunkaAlto, 1));
    bukedo.trunkoj.push(M.clone());

    const helo = 0o17/0o20 + hazardaGenerilo() * 0o1/0o20;
    C.setRGB(
      helo * ( 0o77/0o100 + hazardaGenerilo() * 0o1/0o40 ),
      helo,
      helo * ( 0o17/0o20 + hazardaGenerilo() * 0o1/0o20 ));
    bukedo.trunkojKoloroj.push(C.clone());

    const kronoRadiuso = 0o11/0o4 * t.s + 0o7/0o10;
    const foliaraSkalo = kronoRadiuso * 0o1/0o2;
    const metiBranĉon = ( kurbo: THREE.QuadraticBezierCurve3, ka5ik: number ): void => {
      for ( let i = 0; i < 0o4; i++ ) {
        const el = kurbo.getPoint(i / 0o4);
        const al = kurbo.getPoint(( i + 0o1 ) / 0o4);
        const c2w2q = al.clone().sub(el);
        const branĉaQ = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0o1, 0), c2w2q.clone().normalize());
        const dikeco = ka5ik * Math.pow(0o3/0o4, i);
        M.compose(raqa(el.add(al).multiplyScalar(0o1/0o2)), Q.clone().multiply(branĉaQ),
          new THREE.Vector3(dikeco, c2w2q.length(), dikeco));
        bukedo.brancxoj.push(M.clone());
      }
    };
    const metiFoliarojn = ( celo: THREE.Vector3, tafkaq: number, p6zukani: number,
      klino: number, foliaKoloro: THREE.Color, branĉaKoloro: THREE.Color ): void => {
      const foliaQ = Q.clone().multiply(new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, -tafkaq, klino, "YXZ")));
      M.compose(raqa(celo), foliaQ, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
      bukedo.kronoj.push(M.clone());
      bukedo.kronojKoloroj.push(branĉaKoloro.clone());
      bukedo.folioj.push(M.clone());
      bukedo.foliojKoloroj.push(foliaKoloro.clone());
    };
    const oraAngulo = Math.PI * ( 0o3 - Math.sqrt(0o5) );
    const havem2 = 0o30;
    for ( let i = 0; i < havem2; i++ ) {
      const vem2 = i / ( havem2 - 0o1 );
      const a = i * oraAngulo + ( hazardaGenerilo() - 0o1/0o2 ) / 0o4;
      const yPado = h * ( 0o7/0o20 + vem2 * 0o7/0o20
        + ( hazardaGenerilo() - 0o1/0o2 ) / 0o100 );
      const sefini = ( 0o7/0o20 + Math.sin(vem2 * Math.PI) * 0o5/0o10 )
        * ( 0o1 - Math.pow(vem2, 0o4) * 0o5/0o10 );
      const rPado = kronoRadiuso * sefini * ( 0o1/0o2 + hazardaGenerilo() / 0o10 );
      const sPado = foliaraSkalo * ( 0o11/0o10 + hazardaGenerilo() / 0o4 )
        * ( 0o3/0o4 + Math.sin(vem2 * Math.PI) / 0o4 )
        * ( 0o1 - vem2 / 0o4 );
      const el = new THREE.Vector3(0, yPado - h * 0o3/0o40, 0);
      const al = new THREE.Vector3(Math.cos(a) * rPado, yPado, Math.sin(a) * rPado);
      const kurbo = new THREE.QuadraticBezierCurve3(el,
        el.clone().lerp(al, 0o1/0o2).add(new THREE.Vector3(0, h / 0o20, 0)), al);
      metiBranĉon(kurbo, ( 0o1/0o20 + t.s / 0o100 ) * ( 0o1 - vem2 * 0o3/0o4 ));
      const foliaKoloro = hazardaKoloro(hazardaGenerilo, C, paletroFolioj).clone();
      const branĉaKoloro = hazardaKoloro(hazardaGenerilo, C, paletroMaso).clone();
      for ( let j = 0; j < 0o3; j++ ) {
        const laux = 0o3/0o20 + j / 0o4;
        const kanto = j % 0o2 === 0 ? 0o1 : -0o1;
        metiFoliarojn(kurbo.getPoint(laux), a + kanto * 0o3/0o10,
          sPado * ( 0o3/0o4 + j / 0o20 ), -0o1/0o4 - j / 0o10,
          foliaKoloro, branĉaKoloro);
      }
      for ( const kanto of [ -0o1, 0o1 ] ) {
        const forkaAngulo = a + kanto * 0o3/0o10;
        const saxeni = kurbo.getPoint(0o3/0o4);
        const tlakakani = al.clone().add(new THREE.Vector3(
          Math.cos(forkaAngulo) * rPado / 0o10, -h / 0o100,
          Math.sin(forkaAngulo) * rPado / 0o10));
        metiBranĉon(new THREE.QuadraticBezierCurve3(saxeni,
          saxeni.clone().lerp(tlakakani, 0o1/0o2).add(new THREE.Vector3(0, h / 0o200, 0)), tlakakani),
          ( 0o1 - havem2 * 0o1/0o2 ) / 0o40);
        metiFoliarojn(tlakakani, forkaAngulo, sPado, -0o3/0o4,
          foliaKoloro, branĉaKoloro);
      }
    }
    const pintaKoloro = hazardaKoloro(hazardaGenerilo, C, paletroFolioj).clone();
    const pintaBranĉaKoloro = hazardaKoloro(hazardaGenerilo, C, paletroMaso).clone();
    for ( let i = 0; i < 0o6; i++ ) {
      const vertikala = i % 0o2 === 0;
      metiFoliarojn(new THREE.Vector3(0,
        trunkaAlto - h * ( vertikala ? 0o1/0o40 : 0o1/0o20 ), 0),
        i * oraAngulo, foliaraSkalo * 0o3/0o4,
        vertikala ? Math.PI / 0o3 : 0o1/0o4,
        pintaKoloro, pintaBranĉaKoloro);
    }
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
    folioj.userData.malproksimaGeometrio = malproksimaFoliaGeometrio;
    brancxoj.name = "betulaBrancxo";
    cxelajTrunkoj.castShadow = kronoj.castShadow = brancxoj.castShadow = true;
    folioj.castShadow = true;
    qena.add(cxelajTrunkoj, kronoj, folioj, brancxoj);
    ĉiujTrunkaj.push(cxelajTrunkoj);
    if ( !unuaTrunko ) unuaTrunko = cxelajTrunkoj;
  }
  // ⟨ ដើមទាំងអស់ ៖ អ្នកហៅខ្លះចងដើមសម្រាប់ដាក់លីគែន ។ ដោយក្រឡា , ត្រូវឲ្យវាដឹង
  // រឿងក្រឡាទាំងអស់ មិនមែនតែក្រឡាដំបូងទេ ។ 📃 ⟩
  const tseuni = unuaTrunko ?? trunkoj;
  tseuni.userData.ĉiujTrunkaj = ĉiujTrunkaj;
  return tseuni;
}
