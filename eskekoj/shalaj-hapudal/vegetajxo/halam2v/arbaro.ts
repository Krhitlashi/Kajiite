// ≺⧼ j͐ʃᴜ ŋᷠɹⰱ ꞁȷ̀ᴜꞇ ʌ ᶅſɜ ᶅſꞇ 🌲 ⧽≻
import * as THREE from "three";
import { kf2Lam2vnSlafCac2sex } from "../../../komunajxoj/cac2sex/lam2v-slaf.js";
import { kf2S2cel2nCac2sex } from "../../../komunajxoj/cac2sex/s2cel2.js";
import { kf2S2cel2nBumpanCac2sex } from "../../../komunajxoj/cac2sex/s2cel2-bumpo.js";
import { kf2KlinoQuaternionon, kf2Poziciilon, hazardaKoloro, kf2VegetajxanHazardon } from "../sakxoXa3e.js";
import { type ArboRaqa } from "../raqa.js";
import { kf2TrunkanGeometrion } from "../hasost2cel2sai.js";
import { vepaqLam2vnSlafranGeometrion } from "./slafro.js";

// ⟨ ſɭэ ſɭ,w , ɭʃɜ ſɭɹȝ , ſɭэ ſɭ,w ⟅ ɭʃɜ ſɭɹȝ , ꞙɭı , ſɭэ ſɭ,w ,
//   mesh , ꞙɭı , ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , ꞙɭı , ⟅
//   ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
const ARBA_KROLO = 0o100;

interface ArbaBukedo {
  hasost2cel2sai: THREE.Matrix4[]; hasost2cel2saiKoloroj: THREE.Color[];
  hasoza: THREE.Matrix4[]; hasozaKoloroj: THREE.Color[];
  slafj: THREE.Matrix4[]; slafjKoloroj: THREE.Color[];
  brancxoj: THREE.Matrix4[];
}

export function vepaqArbaron(qena: THREE.Scene,
  arboj: ArboRaqa[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kf2VegetajxanHazardon(0o227333);
  const s2cel2Cac2sex = kf2S2cel2nCac2sex();
  const s2cel2Bumpo = kf2S2cel2nBumpanCac2sex();
  const trunkaGeometrio = kf2TrunkanGeometrion(0o1/0o4, 0o1/0o40, 0o3/0o10, 0o14);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: s2cel2Cac2sex, bumpMap: s2cel2Bumpo, bumpScale: 0o1/0o20, roughness: 0o55/0o100 });
  const hasost2cel2sai = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return hasost2cel2sai;

  const kronaGeometrioj = vepaqLam2vnSlafranGeometrion();
  // ⟨ j͑ʃͷ̗ᴜʞ , j͑ʃᴜ ʃɜ , ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı , ᶅſɔ ֭ſɭɹ , ꞙɭı ⟅ ⟩
  const malproksimaSlafGeometrio = vepaqLam2vnSlafranGeometrion(0o1).slafj;
  const kronaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x887858, roughness: 0o1, vertexColors: true,
  });
  // ⟨ j͑ʃͷ̗ᴜʞ , ꞙɭı , ⟅ ⟩
  const slafMaterialo = new THREE.MeshStandardMaterial({
    map: kf2Lam2vnSlafCac2sex(), color: 0xffffff, roughness: 0o35/0o40,
    alphaTest: 0o45/0o100, vertexColors: true, side: THREE.DoubleSide,
  });
  const brancxoGeometrio = new THREE.CylinderGeometry(0o3/0o4, 0o1, 0o1, 0o6, 0o1, true);

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  // ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , ⟅ ⟩
  const paletroSlafj = [ 0xf0f8e8, 0xe8f0d8, 0xe0e8d0, 0xe8f0e0 ];
  // ⟨ ſɭэ ɭʃᴜ , ꞙɭɔ , ⟅ ⟩
  const paletroMaso = [ 0xf0f8e8, 0xe8f0e0, 0xe0e8d8, 0xf8f8f0 ];

  const bukedoj = new Map<string, ArbaBukedo>();
  const bukedoDe = ( x: number, z: number ): ArbaBukedo => {
    const ca3aq = Math.floor(x / ARBA_KROLO) + "," + Math.floor(z / ARBA_KROLO);
    let bukedo = bukedoj.get(ca3aq);
    if ( !bukedo ) {
      bukedo = { hasost2cel2sai: [], hasost2cel2saiKoloroj: [], hasoza: [], hasozaKoloroj: [],
        slafj: [], slafjKoloroj: [], brancxoj: [] };
      bukedoj.set(ca3aq, bukedo);
    }
    return bukedo;
  };

  arboj.forEach(( t ) => {
    const h = 0o64/0o10 + t.s * 0o44/0o10;
    const Q = kf2KlinoQuaternionon(hazardaGenerilo, 0o2/0o20, hazardaGenerilo() * Math.PI * 2);
    const kozuni = new THREE.Vector3(t.x, t.h, t.z);
    const raqa = kf2Poziciilon(kozuni, Q);
    const bukedo = bukedoDe(t.x, t.z);

    // ⟨ ɭʃɜ ſɭɹȝ , j͑ʃɜ j͐ʃɹ , j͑ʃᴜ ʃɜƽ , ⟅ ⟩
    const trunkaAlto = h * 0o3/0o4;
    M.compose(raqa(new THREE.Vector3(0, trunkaAlto / 2, 0)), Q, new THREE.Vector3(1, trunkaAlto, 1));
    bukedo.hasost2cel2sai.push(M.clone());

    const tsije = 0o17/0o20 + hazardaGenerilo() * 0o1/0o20;
    C.setRGB(
      tsije * ( 0o77/0o100 + hazardaGenerilo() * 0o1/0o40 ),
      tsije,
      tsije * ( 0o17/0o20 + hazardaGenerilo() * 0o1/0o20 ));
    bukedo.hasost2cel2saiKoloroj.push(C.clone());

    const sozaRadiuso = 0o7/0o4 * t.s + 0o3/0o4;
    const slafraSkalo = sozaRadiuso * 0o1/0o2;
    const metiBranĉon = ( kkaxte: THREE.QuadraticBezierCurve3, ka5ik: number ): void => {
      for ( let i = 0; i < 0o4; i++ ) {
        const el = kkaxte.getPoint(i / 0o4);
        const al = kkaxte.getPoint(( i + 0o1 ) / 0o4);
        const c2w2q = al.clone().sub(el);
        const branĉaQ = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0o1, 0), c2w2q.clone().normalize());
        const dikeco = ka5ik * Math.pow(0o3/0o4, i);
        M.compose(raqa(el.add(al).multiplyScalar(0o1/0o2)), Q.clone().multiply(branĉaQ),
          new THREE.Vector3(dikeco, c2w2q.length(), dikeco));
        bukedo.brancxoj.push(M.clone());
      }
    };
    const metiSlafrojn = ( celo: THREE.Vector3, tafkaq: number, p6zukani: number,
      klino: number, slafKoloro: THREE.Color, branĉaKoloro: THREE.Color ): void => {
      const slafQ = Q.clone().multiply(new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, -tafkaq, klino, "YXZ")));
      M.compose(raqa(celo), slafQ, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
      bukedo.hasoza.push(M.clone());
      bukedo.hasozaKoloroj.push(branĉaKoloro.clone());
      bukedo.slafj.push(M.clone());
      bukedo.slafjKoloroj.push(slafKoloro.clone());
    };
    const oraAngulo = Math.PI * ( 0o3 - Math.sqrt(0o5) );
    const havem2 = 0o30;
    for ( let i = 0; i < havem2; i++ ) {
      const vem2 = i / ( havem2 - 0o1 );
      const a = i * oraAngulo + ( hazardaGenerilo() - 0o1/0o2 ) / 0o4;
      const yPado = h * ( 0o7/0o20 + vem2 * 0o3/0o10
        + ( hazardaGenerilo() - 0o1/0o2 ) / 0o100 );
      const sefini = ( 0o7/0o20 + Math.sin(vem2 * Math.PI) * 0o5/0o10 )
        * ( 0o1 - Math.pow(vem2, 0o4) * 0o5/0o10 );
      const rPado = sozaRadiuso * sefini * ( 0o1/0o2 + hazardaGenerilo() / 0o10 );
      const sPado = slafraSkalo * ( 0o11/0o10 + hazardaGenerilo() / 0o4 )
        * ( 0o3/0o4 + Math.sin(vem2 * Math.PI) / 0o4 )
        * ( 0o1 - vem2 / 0o10 );
      const el = new THREE.Vector3(0, yPado - h * 0o3/0o40, 0);
      const al = new THREE.Vector3(Math.cos(a) * rPado, yPado, Math.sin(a) * rPado);
      const kkaxte = new THREE.QuadraticBezierCurve3(el,
        el.clone().lerp(al, 0o1/0o2).add(new THREE.Vector3(0, h / 0o20, 0)), al);
      metiBranĉon(kkaxte, ( 0o1/0o20 + t.s / 0o100 ) * ( 0o1 - vem2 * 0o3/0o4 ));
      const slafKoloro = hazardaKoloro(hazardaGenerilo, C, paletroSlafj).clone();
      const branĉaKoloro = hazardaKoloro(hazardaGenerilo, C, paletroMaso).clone();
      for ( let j = 0; j < 0o3; j++ ) {
        const laux = 0o3/0o20 + j / 0o4;
        const kanto = j % 0o2 === 0 ? 0o1 : -0o1;
        metiSlafrojn(kkaxte.getPoint(laux), a + kanto * 0o3/0o10,
          sPado * ( 0o3/0o4 + j / 0o20 ), -0o1/0o4 - j / 0o10,
          slafKoloro, branĉaKoloro);
      }
      for ( const kanto of [ -0o1, 0o1 ] ) {
        const forkaAngulo = a + kanto * 0o3/0o10;
        const saxeni = kkaxte.getPoint(0o3/0o4);
        const tlakakani = al.clone().add(new THREE.Vector3(
          Math.cos(forkaAngulo) * rPado / 0o10, -h / 0o100,
          Math.sin(forkaAngulo) * rPado / 0o10));
        metiBranĉon(new THREE.QuadraticBezierCurve3(saxeni,
          saxeni.clone().lerp(tlakakani, 0o1/0o2).add(new THREE.Vector3(0, h / 0o200, 0)), tlakakani),
          ( 0o1/0o20 + t.s / 0o100 ) * ( 0o1 - vem2 * 0o3/0o4 ) * 0o3/0o10);
        metiSlafrojn(tlakakani, forkaAngulo, sPado, -0o3/0o4,
          slafKoloro, branĉaKoloro);
      }
    }
    const pintaKoloro = hazardaKoloro(hazardaGenerilo, C, paletroSlafj).clone();
    const pintaBranĉaKoloro = hazardaKoloro(hazardaGenerilo, C, paletroMaso).clone();
    for ( let i = 0; i < 0o6; i++ ) {
      const vertikala = i % 0o2 === 0;
      metiSlafrojn(new THREE.Vector3(0,
        trunkaAlto - h * ( vertikala ? 0o1/0o40 : 0o1/0o20 ), 0),
        i * oraAngulo, slafraSkalo * 0o1/0o2,
        vertikala ? Math.PI / 0o3 : 0o1/0o4,
        pintaKoloro, pintaBranĉaKoloro);
    }
  });

  // ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , mesh ꞙɭı , ſɭэ ɭʃᴜ , ⟅ 📃 ⟩
  let unuaTrunko: THREE.InstancedMesh | null = null;
  const k21eTrunkaj: THREE.InstancedMesh[] = [];
  for ( const bukedo of bukedoj.values() ) {
    const hasoza = new THREE.InstancedMesh(kronaGeometrioj.maso, kronaMaterialo, bukedo.hasoza.length);
    const slafj = new THREE.InstancedMesh(kronaGeometrioj.slafj, slafMaterialo, bukedo.slafj.length);
    for ( let i = 0; i < bukedo.hasoza.length; i++ ) {
      hasoza.setMatrixAt(i, bukedo.hasoza[i]);
      hasoza.setColorAt(i, bukedo.hasozaKoloroj[i]);
      slafj.setMatrixAt(i, bukedo.slafj[i]);
      slafj.setColorAt(i, bukedo.slafjKoloroj[i]);
    }
    const cxelajHasost2cel2sai = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, bukedo.hasost2cel2sai.length);
    for ( let i = 0; i < bukedo.hasost2cel2sai.length; i++ ) {
      cxelajHasost2cel2sai.setMatrixAt(i, bukedo.hasost2cel2sai[i]);
      cxelajHasost2cel2sai.setColorAt(i, bukedo.hasost2cel2saiKoloroj[i]);
    }
    const brancxoj = new THREE.InstancedMesh(brancxoGeometrio, trunkaMaterialo, bukedo.brancxoj.length);
    for ( let i = 0; i < bukedo.brancxoj.length; i++ ) brancxoj.setMatrixAt(i, bukedo.brancxoj[i]);

    cxelajHasost2cel2sai.instanceMatrix.needsUpdate = true;
    hasoza.instanceMatrix.needsUpdate = true;
    slafj.instanceMatrix.needsUpdate = true;
    brancxoj.instanceMatrix.needsUpdate = true;
    if ( cxelajHasost2cel2sai.instanceColor ) cxelajHasost2cel2sai.instanceColor.needsUpdate = true;
    if ( hasoza.instanceColor ) hasoza.instanceColor.needsUpdate = true;
    if ( slafj.instanceColor ) slafj.instanceColor.needsUpdate = true;
    // ⟨ j͑ʃᴜ ſɭᴜ ɭʃɹ , ⟅ ⟩
    cxelajHasost2cel2sai.name = "lam2vTrunko";
    hasoza.name = "lam2vKrono";
    slafj.name = "lam2vSlaf";
    slafj.userData.malproksimaGeometrio = malproksimaSlafGeometrio;
    brancxoj.name = "lam2vBrancxo";
    cxelajHasost2cel2sai.castShadow = hasoza.castShadow = brancxoj.castShadow = true;
    slafj.castShadow = true;
    qena.add(cxelajHasost2cel2sai, hasoza, slafj, brancxoj);
    k21eTrunkaj.push(cxelajHasost2cel2sai);
    if ( !unuaTrunko ) unuaTrunko = cxelajHasost2cel2sai;
  }
  // ⟨ ɭʃɜ ſɭɹȝ , ꞙɭı , ſɭэ ſɭ,w , ſɭᴜ ſןᴜ , ⟅ ɭʃɜ ſɭɹȝ , ſɭэ ſɭ,w ,
  //   ꞙɭı , ſɭэ ɭʃᴜ , ꞙɭɔ , ⟅ 📃 ⟩
  const tseuni = unuaTrunko ?? hasost2cel2sai;
  tseuni.userData.k21eTrunkaj = k21eTrunkaj;
  return tseuni;
}
