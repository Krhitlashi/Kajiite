// ≺⧼ ɭʃᴜ ſɭɔ˞ᴜͷ̗ ꞁȷ̀ᴜꞇ ʌ j͑ʃɹ ſɟɔ j͐ʃɹ 🌲 ⧽≻
import * as THREE from "three";
import { kf2LarikanS2cel2nCac2sex } from "../../komunajxoj/cac2sex/larika-s2cel2.js";
import { kf2LarikanS2cel2nBumpanCac2sex } from "../../komunajxoj/cac2sex/larika-s2cel2-bumpo.js";
import { kunfandiGeometriojnSenIndekson } from "../../komunajxoj/kunfandajxoj.js";
import { KRONA_GEOMETRIA_RADIUSO, TAVOLA_PROPORCIO, kronaRadiusoLarika } from "./hasoza.js";
import { kf2KlinoQuaternionon, kf2Poziciilon, hazardaKoloro, kf2VegetajxanHazardon } from "./sakxoXa3e.js";
import type { ArboRaqa } from "./raqa.js";
import { kf2TrunkanGeometrion } from "./hasost2cel2sai.js";
import { hunanuWeh2 } from "../../komunajxoj/koloroj.js";

function vepaqLarikanSlafranGeometrion(pinglajHas2nasce = 0o3): { slafj: THREE.BufferGeometry; brancxoj: THREE.BufferGeometry } {
  const hakek: THREE.BufferGeometry[] = [];
  const branĉajPartoj: THREE.BufferGeometry[] = [];
  // ⟨ កំពូល 📃 ⟩
  const ALTO = 1;
  const KERNA_BOT = 0o3/0o100;
  const KERNA_SUP = 0o1/0o100;
  const lowak = new THREE.CylinderGeometry(KERNA_SUP, KERNA_BOT, ALTO, 0o12, 0o3);
  lowak.translate(0, ALTO / 2, 0);
  branĉajPartoj.push(lowak);
  const eksteraR = ( t: number ): number => 0o1/0o2 * Math.pow(1 - t, 0o7/0o10) + 0o1/0o100;
  const kernaR = ( t: number ): number => KERNA_BOT + ( KERNA_SUP - KERNA_BOT ) * t;

  const hazardo = kf2VegetajxanHazardon(0o101667);
  const kf2PinglanKarteton = ( sahakani: number, dikeco: number ): THREE.BufferGeometry => {
    const haxekuxa: number[] = [];
    const qan2k: number[] = [];
    const havecax2lani: number[] = [];
    const has2nasce = pinglajHas2nasce;
    for ( let i = 0; i <= has2nasce; i++ ) {
      const t = i / has2nasce;
      const duonLargho = dikeco * ( 0o1/0o10 + 0o2/0o5 * Math.sin(t * Math.PI) );
      const kkaxte = sahakani * 0o1/0o10 * Math.sin(t * Math.PI);
      haxekuxa.push(sahakani * t, -duonLargho, kkaxte,
        sahakani * t, 0, kkaxte + dikeco * 0o1/0o4,
        sahakani * t, duonLargho, kkaxte);
      qan2k.push(t, 0, t, 0o1/0o2, t, 0o1);
      if ( i === has2nasce ) continue;
      for ( let j = 0; j < 0o2; j++ ) {
        const kozuni = i * 0o3 + j;
        havecax2lani.push(kozuni, kozuni + 0o3, kozuni + 0o1,
          kozuni + 0o1, kozuni + 0o3, kozuni + 0o4);
      }
    }
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.Float32BufferAttribute(haxekuxa, 0o3));
    geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(qan2k, 0o2));
    geometrio.setIndex(havecax2lani);
    geometrio.computeVertexNormals();
    return geometrio;
  };

  const kf2PinglanVentumilon = ( sahakani: number, dikeco: number,
    klinoM = 0o6/0o10 ): THREE.BufferGeometry => {
    const fasko = ( turno: number ): THREE.BufferGeometry => {
      const pingloj: THREE.BufferGeometry[] = [];
      const vem2 = 0o5;
      for ( let j = 0; j < vem2; j++ ) {
        const t = j / ( vem2 - 1 ) - 0o5/0o10;
        // ⟨ ការប្រែប្រួលម្ជុល 📃 ⟩
        const klino = t * klinoM + ( hazardo() - 0o5/0o10 ) * 0o3/0o10;
        const pinglo = kf2PinglanKarteton(
          sahakani * ( 0o4/0o5 + hazardo() * 0o4/0o10 ), dikeco);
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationY(turno));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationY(
          t * 0o14/0o10 + ( hazardo() - 0o5/0o10 ) * 0o1/0o10));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationX(
          ( hazardo() - 0o5/0o10 ) * 0o5/0o10));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationZ(klino));
        pingloj.push(pinglo);
      }
      return kunfandiGeometriojnSenIndekson(pingloj);
    };
    return fasko(0);
  };

  const kirloj = 0o10;
  const faskojPoKirlo = 0o7;
  for ( let i = 0; i < kirloj * faskojPoKirlo; i++ ) {
    const kirlo = Math.floor(i / faskojPoKirlo);
    const enKirlo = i % faskojPoKirlo;
    const a = enKirlo / faskojPoKirlo * Math.PI * 2 + kirlo * 0o7/0o20
      + ( hazardo() - 0o5/0o10 ) * 0o1/0o10;
    const t = 0o7/0o100 + ( kirlo / ( kirloj - 1 ) ) * 0o66/0o100;
    const y = t * ALTO;
    const kR = kernaR(t);
    const bazoP = new THREE.Vector3(Math.cos(a) * kR, y, Math.sin(a) * kR);
    const akso = new THREE.Vector3(Math.cos(a), 0o1/0o10 + hazardo() * 0o1/0o10,
      Math.sin(a)).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0o1, 0), akso);
    const sahakani = ( eksteraR(t) - kR ) * ( 0o7/0o10 + hazardo() * 0o1/0o4 );
    const branĉo = new THREE.CylinderGeometry(0o1/0o1000, 0o1/0o100, sahakani, 0o5)
      .translate(0, sahakani / 0o2, 0);
    branĉo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
    branĉo.translate(bazoP.x, bazoP.y, bazoP.z);
    branĉajPartoj.push(branĉo);
    for ( let j = 0; j < 0o4; j++ ) {
      const laux = ( j + 0o1 ) / 0o4;
      const pinglaAkso = new THREE.Vector3(Math.cos(a) * 0o1/0o2,
        0o1, Math.sin(a) * 0o1/0o2).normalize();
      const qPingloj = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0o1, 0, 0), pinglaAkso);
      const ventumilo = kf2PinglanVentumilon(0o5/0o100 + hazardo() * 0o3/0o100,
        0o1/0o100, 0o3/0o4);
      ventumilo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(qPingloj));
      ventumilo.translate(bazoP.x + akso.x * sahakani * laux,
        bazoP.y + akso.y * sahakani * laux, bazoP.z + akso.z * sahakani * laux);
      hakek.push(ventumilo);
    }
  }
  const teru = kf2PinglanVentumilon(0o1/0o10, 0o1/0o100, 0o3/0o4);
  teru.rotateZ(Math.PI / 0o2);
  teru.translate(0, ALTO, 0);
  hakek.push(teru);
  return { slafj: kunfandiGeometriojnSenIndekson(hakek),
    brancxoj: kunfandiGeometriojnSenIndekson(branĉajPartoj) };
}

export function vepaqLarikon(qena: THREE.Scene,
  arboj: ArboRaqa[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kf2VegetajxanHazardon(0o101666);
  const larikaCac2sex = kf2LarikanS2cel2nCac2sex();
  const larikaBumpo = kf2LarikanS2cel2nBumpanCac2sex();
  const trunkaGeometrio = kf2TrunkanGeometrion(0o5/0o20, 0o11/0o100, 0o5/0o20 * 0o13/0o10, 0o11);
  const trunkaMaterialo = new THREE.MeshStandardMaterial({ map: larikaCac2sex, bumpMap: larikaBumpo, bumpScale: 0o1/0o20, roughness: 0o55/0o100 });
  const hasost2cel2sai = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return hasost2cel2sai;

  const kronaGeometrioj = vepaqLarikanSlafranGeometrion();
  const malproksimaKronaGeometrio = vepaqLarikanSlafranGeometrion(0o1).slafj;
  const kronaGeometrio = kronaGeometrioj.slafj;
  kronaGeometrio.computeBoundingBox();
  // ⟨ ម្ជុលពីរជាន់ 📃 ⟩
  const kronaMaterialo = new THREE.MeshStandardMaterial({
    color: 0xc8c068, roughness: 0o1,
    side: THREE.DoubleSide,
  });
  const MAKS_TAVOLOJ = 0o4;
  const TAVOLA_KOVRO = 0o3/0o4;
  // ⟨ មែកទទេ 📃 ⟩
  const BRANCXETOJ = 0o3;
  const brancxetaGeometrio = new THREE.CylinderGeometry(0o1/0o100, 0o5/0o100, 1, 4)
    .translate(0, 0o1/0o2, 0);
  // ⟨ ក្រឡាដើមឈើ ៖ frustum culling ធ្វើការតាម mesh , ដូច្នេះក្រឡាដីមួយៗត្រូវ
  // មាន mesh របស់ខ្លួន , បើមិនដូច្នេះព្រៃទាំងមូលគូររាល់ពេលដែលឃើញតែមួយចំណែក ។ 📃 ⟩
  interface LarikaBukedo {
    hasost2cel2sai: THREE.Matrix4[]; hasost2cel2saiKoloroj: THREE.Color[];
    hasoza: THREE.Matrix4[]; hasozaKoloroj: THREE.Color[];
    brancxetoj: THREE.Matrix4[]; brancxetojKoloroj: THREE.Color[];
  }
  const bukedoj = new Map<string, LarikaBukedo>();
  const bukedoDe = ( x: number, z: number ): LarikaBukedo => {
    const ca3aq = Math.floor(x / 0o100) + "," + Math.floor(z / 0o100);
    let bukedo = bukedoj.get(ca3aq);
    if ( !bukedo ) {
      bukedo = { hasost2cel2sai: [], hasost2cel2saiKoloroj: [], hasoza: [], hasozaKoloroj: [],
        brancxetoj: [], brancxetojKoloroj: [] };
      bukedoj.set(ca3aq, bukedo);
    }
    return bukedo;
  };

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  const yUp = new THREE.Vector3(0, 1, 0);
  const xAkso = new THREE.Vector3(1, 0, 0);
  const s2cel2Koloro = new THREE.Color();
  const paletro = [ 0xf8f0d8, 0xe8e0c8, 0xf0e8d0, 0xe0d8c0 ];

  arboj.forEach(( t, i ) => {
    // ⟨ ដុះខ្លីដែរ 📃 ⟩
    const h = (0o155/0o40 + t.s * 0o30/0o10) * (0o33/0o100 + hazardaGenerilo() * 0o10/0o10);
    // ⟨ ដើមតាមកម្ពស់ 📃 ⟩
    const trunkaLargho = 0o23/0o100 + h * 0o5/0o100;
    const Q = kf2KlinoQuaternionon(hazardaGenerilo, 0o3/0o20, hazardaGenerilo() * Math.PI * 2);
    const kozuni = new THREE.Vector3(t.x, t.h, t.z);
    const raqa = kf2Poziciilon(kozuni, Q);
    const bukedo = bukedoDe(t.x, t.z);

    M.compose(raqa(new THREE.Vector3(0, h / 2, 0)), Q,
      new THREE.Vector3(trunkaLargho, h, trunkaLargho));
    bukedo.hasost2cel2sai.push(M.clone());

    const tsije = 0o73/0o100 + hazardaGenerilo() * 0o5/0o100;
    C.setRGB(
      tsije * ( 0o77/0o100 + hazardaGenerilo() * 0o3/0o100 ),
      tsije * ( 0o75/0o100 + hazardaGenerilo() * 0o1/0o20 ),
      tsije * ( 0o35/0o40 + hazardaGenerilo() * 0o1/0o20 ));
    bukedo.hasost2cel2saiKoloroj.push(C.clone());
    s2cel2Koloro.copy(C);

    const tavoloj = 0o3 + ( ( hazardaGenerilo() * 0o2 ) | 0 );
    // ⟨ សមាមាត្រ 📃 ⟩
    // ⟨ ទទឹងមកពីការដាក់ 📃 ⟩
    // ⟨ កំពូលក៏តាមកម្ពស់ 📃 ⟩
    const kronaRadiuso = Math.min(0o3/0o4 * kronaRadiusoLarika(t.s), 0o21/0o100 * h);
    const bazaLargho = kronaRadiuso / KRONA_GEOMETRIA_RADIUSO;
    const kronaMinimumaY = kronaGeometrio.boundingBox!.min.y;
    const kronaMaksimumaY = kronaGeometrio.boundingBox!.max.y;
    const geometriaAlto = kronaMaksimumaY - kronaMinimumaY;
    // ⟨ ស្រទាប់ជាមុន 📃 ⟩
    const tavolajSkaloj: { sefini: number; l6da: number }[] = [];
    let sozaSumo = 0;
    for ( let k = 0; k < tavoloj; k++ ) {
      const m = k / MAKS_TAVOLOJ;
      const sefini = bazaLargho * ( 1 - m * 0o3/0o4 )
        * ( 0o21/0o24 + hazardaGenerilo() * 0o3/0o10 );
      const l6da = sefini * TAVOLA_PROPORCIO * ( 0o11/0o12 + hazardaGenerilo() * 0o2/0o10 );
      tavolajSkaloj.push({ sefini, l6da });
      sozaSumo += ( k === 0 ? l6da : l6da * ( 0o1 - TAVOLA_KOVRO ) ) * geometriaAlto;
    }
    let ne3ak2Supro = h + 0o3/0o10 - sozaSumo;
    for ( let k = 0; k < MAKS_TAVOLOJ; k++ ) {
      if ( k >= tavoloj ) {
        // ⟨ ស្រទាប់ទទេ ៖ គ្មានធរណីមាត្រ , តែត្រូវឆ្លងកាត់ចៃដន្យដូចដើម 📃 ⟩
        hazardaKoloro(hazardaGenerilo, C, paletro);
        continue;
      }
      const { sefini: sozaLargho, l6da: sozaAlto } = tavolajSkaloj[k];
      // ⟨ ការរលាយស្រទាប់ 📃 ⟩
      const bazaY = ne3ak2Supro - ( k === 0 ? 0 : TAVOLA_KOVRO * sozaAlto * geometriaAlto );
      const centroY = bazaY - kronaMinimumaY * sozaAlto - sozaAlto * 0o1/0o100;
      M.compose(raqa(new THREE.Vector3(
        ( hazardaGenerilo() - 0o5/0o10 ) * 0o12/0o100,
        centroY,
        ( hazardaGenerilo() - 0o5/0o10 ) * 0o12/0o100)), Q,
        new THREE.Vector3(sozaLargho, sozaAlto, sozaLargho));
      bukedo.hasoza.push(M.clone());
      bukedo.hasozaKoloroj.push(hazardaKoloro(hazardaGenerilo, C, paletro).clone());
      ne3ak2Supro = centroY + kronaMaksimumaY * sozaAlto;
    }

    for ( let b = 0; b < BRANCXETOJ; b++ ) {
      const ang = hazardaGenerilo() * Math.PI * 2;
      // ⟨ កន្លែងមែកស្ងួត 📃 ⟩
      const yBrancxo = h * ( 0o1/0o10 + b * 0o1/0o10
        + ( hazardaGenerilo() - 0o5/0o10 ) * 0o1/0o20 );
      const sahakani = ( 0o3/0o10 + hazardaGenerilo() * 0o1/0o2 ) * trunkaLargho;
      const klino = 0o17/0o10 + hazardaGenerilo() * 0o4/0o10;
      const Qb = new THREE.Quaternion().setFromAxisAngle(yUp, ang)
        .multiply(new THREE.Quaternion().setFromAxisAngle(xAkso, klino));
      const trunkaR = ( 0o5/0o20 * ( 1 - yBrancxo / h ) + 0o11/0o100 * ( yBrancxo / h ) )
        * trunkaLargho * 0o7/0o10;
      M.compose(raqa(new THREE.Vector3(
        Math.sin(ang) * trunkaR, yBrancxo, Math.cos(ang) * trunkaR)),
        Qb.premultiply(Q), new THREE.Vector3(trunkaLargho, sahakani, trunkaLargho));
      bukedo.brancxetoj.push(M.clone());
      // ⟨ ស្រមោលមែក ៖ ដក ៣ ជំហាន n0n0n0 ពីពណ៌សំបក , មិនគុណងងឹត 📃 ⟩
      bukedo.brancxetojKoloroj.push(
        C.setHex(hunanuWeh2(s2cel2Koloro.getHex(), 0o3)).clone());
    }
  });

  // ⟨ mesh មួយក្នុងមួយក្រឡា ។ 📃 ⟩
  let unuaTrunko: THREE.InstancedMesh | null = null;
  const k21eTrunkaj: THREE.InstancedMesh[] = [];
  for ( const bukedo of bukedoj.values() ) {
    const cxelajHasost2cel2sai = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, bukedo.hasost2cel2sai.length);
    const hasoza = new THREE.InstancedMesh(kronaGeometrio, kronaMaterialo, bukedo.hasoza.length);
    const folibranĉoj = new THREE.InstancedMesh(kronaGeometrioj.brancxoj, trunkaMaterialo, bukedo.hasoza.length);
    const brancxetoj = new THREE.InstancedMesh(brancxetaGeometrio, trunkaMaterialo, bukedo.brancxetoj.length);
    for ( let i = 0; i < bukedo.hasost2cel2sai.length; i++ ) {
      cxelajHasost2cel2sai.setMatrixAt(i, bukedo.hasost2cel2sai[i]);
      cxelajHasost2cel2sai.setColorAt(i, bukedo.hasost2cel2saiKoloroj[i]);
    }
    for ( let i = 0; i < bukedo.hasoza.length; i++ ) {
      hasoza.setMatrixAt(i, bukedo.hasoza[i]);
      hasoza.setColorAt(i, bukedo.hasozaKoloroj[i]);
      folibranĉoj.setMatrixAt(i, bukedo.hasoza[i]);
    }
    for ( let i = 0; i < bukedo.brancxetoj.length; i++ ) {
      brancxetoj.setMatrixAt(i, bukedo.brancxetoj[i]);
      brancxetoj.setColorAt(i, bukedo.brancxetojKoloroj[i]);
    }
    cxelajHasost2cel2sai.name = "larikaTrunko";
    hasoza.name = "larikaKrono";
    hasoza.userData.malproksimaGeometrio = malproksimaKronaGeometrio;
    folibranĉoj.name = "larikaFolibrancxo";
    folibranĉoj.instanceMatrix.needsUpdate = true;
    folibranĉoj.castShadow = true;
    brancxetoj.name = "larikaBrancxo";
    cxelajHasost2cel2sai.instanceMatrix.needsUpdate = true;
    hasoza.instanceMatrix.needsUpdate = true;
    brancxetoj.instanceMatrix.needsUpdate = true;
    if ( cxelajHasost2cel2sai.instanceColor ) cxelajHasost2cel2sai.instanceColor.needsUpdate = true;
    if ( hasoza.instanceColor ) hasoza.instanceColor.needsUpdate = true;
    if ( brancxetoj.instanceColor ) brancxetoj.instanceColor.needsUpdate = true;
    cxelajHasost2cel2sai.castShadow = hasoza.castShadow = brancxetoj.castShadow = true;
    qena.add(cxelajHasost2cel2sai, hasoza, folibranĉoj, brancxetoj);
    k21eTrunkaj.push(cxelajHasost2cel2sai);
    if ( !unuaTrunko ) unuaTrunko = cxelajHasost2cel2sai;
  }
  const tseuni = unuaTrunko ?? hasost2cel2sai;
  tseuni.userData.k21eTrunkaj = k21eTrunkaj;
  return tseuni;
}
