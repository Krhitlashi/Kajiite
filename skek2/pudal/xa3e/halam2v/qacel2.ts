// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſ͕ɭᴜ ſɟɔ j͐ʃɹ 📃 ⧽≻

import * as THREE from "three";
import { kf2Lam2vnSlafCac2sex } from "../../../p6kpu/cac2sex/lam2v-slaf.js";
import { kf2S2cel2nCac2sex } from "../../../p6kpu/cac2sex/s2cel2.js";
import { kf2S2cel2nBumpanCac2sex } from "../../../p6kpu/cac2sex/s2cel2-tok.js";
import { kf2S2saboQuaternionon, kf2Poziciilon, hazardaWeh2, kf2Xa3eHazardon } from "../sakxoXa3e.js";
import { type Cel2Raqa } from "../raqa.js";
import { kf2TrunkanQoxaKefoun } from "../hasost2cel2sai.js";
import { vepaqLam2vnSlafanQoxaKefoun } from "./slaf.js";

const ARBAKROLO = 0o100;

interface ArbaSukf2qaniraqasai {
  hasost2cel2sai: THREE.Matrix4[]; hasost2cel2saiHaweh2: THREE.Color[];
  hasoza: THREE.Matrix4[]; hasozaHaweh2: THREE.Color[];
  slafj: THREE.Matrix4[]; slafjHaweh2: THREE.Color[];
  hatok2q: THREE.Matrix4[];
}

export function vepaqQacel2n(qena: THREE.Scene,
  hacel2: Cel2Raqa[]
): THREE.InstancedMesh {
  const sakxoCasacakai = kf2Xa3eHazardon(0o227333);
  const s2cel2Cac2sex = kf2S2cel2nCac2sex();
  const s2cel2Sap2 = kf2S2cel2nBumpanCac2sex();
  const sost2cel2saiVecax2l = kf2TrunkanQoxaKefoun(0o1/0o4, 0o1/0o40, 0o3/0o10, 0o14);
  const sost2cel2saiPukek = new THREE.MeshStandardMaterial({ map: s2cel2Cac2sex, bumpMap: s2cel2Sap2, bumpScale: 0o1/0o20, roughness: 0o55/0o100 });
  const hasost2cel2sai = new THREE.InstancedMesh(sost2cel2saiVecax2l, sost2cel2saiPukek, hacel2.length);
  if ( hacel2.length === 0o0 ) return hasost2cel2sai;

  const kronaHavecax2lani = vepaqLam2vnSlafanQoxaKefoun();

  const maltsiikeSlafVecax2l = vepaqLam2vnSlafanQoxaKefoun(0o1).slafj;
  const kronaPukek = new THREE.MeshStandardMaterial({
    color: 0x887858, roughness: 0o1, vertexColors: true,
  });

  const slafPukek = new THREE.MeshStandardMaterial({
    map: kf2Lam2vnSlafCac2sex(), color: 0xffffff, roughness: 0o35/0o40,
    alphaTest: 0o45/0o100, vertexColors: true, side: THREE.DoubleSide,
  });
  const brancxoVecax2l = new THREE.CylinderGeometry(0o3/0o4, 0o1, 0o1, 0o6, 0o1, true);

  const M = new THREE.Matrix4();
  const C = new THREE.Color();

  const weh2Cax2loSlafj = [ 0xf0f8e8, 0xe8f0d8, 0xe0e8d0, 0xe8f0e0 ];

  const weh2Cax2loMaso = [ 0xf0f8e8, 0xe8f0e0, 0xe0e8d8, 0xf8f8f0 ];

  const hasukf2qaniraqasai = new Map<string, ArbaSukf2qaniraqasai>();
  const sukf2qaniraqasaiDe = ( x: number, z: number ): ArbaSukf2qaniraqasai => {
    const ca3aq = Math.floor(x / ARBAKROLO) + "," + Math.floor(z / ARBAKROLO);
    let sukf2qaniraqasai = hasukf2qaniraqasai.get(ca3aq);
    if ( !sukf2qaniraqasai ) {
      sukf2qaniraqasai = { hasost2cel2sai: [], hasost2cel2saiHaweh2: [], hasoza: [], hasozaHaweh2: [],
        slafj: [], slafjHaweh2: [], hatok2q: [] };
      hasukf2qaniraqasai.set(ca3aq, sukf2qaniraqasai);
    }
    return sukf2qaniraqasai;
  };

  hacel2.forEach(( t ) => {
    const h = 0o64/0o10 + t.s * 0o44/0o10;
    const Q = kf2S2saboQuaternionon(sakxoCasacakai, 0o2/0o20, sakxoCasacakai() * Math.PI * 0o2);
    const kozuni = new THREE.Vector3(t.x, t.h, t.z);
    const raqa = kf2Poziciilon(kozuni, Q);
    const sukf2qaniraqasai = sukf2qaniraqasaiDe(t.x, t.z);

    const sost2cel2saiL6da = h * 0o3/0o4;
    M.compose(raqa(new THREE.Vector3(0o0, sost2cel2saiL6da / 0o2, 0o0)), Q, new THREE.Vector3(0o1, sost2cel2saiL6da, 0o1));
    sukf2qaniraqasai.hasost2cel2sai.push(M.clone());

    const tsije = 0o17/0o20 + sakxoCasacakai() * 0o1/0o20;
    C.setRGB(
      tsije * ( 0o77/0o100 + sakxoCasacakai() * 0o1/0o40 ),
      tsije,
      tsije * ( 0o17/0o20 + sakxoCasacakai() * 0o1/0o20 ));
    sukf2qaniraqasai.hasost2cel2saiHaweh2.push(C.clone());

    const sozaKa5ik = 0o7/0o4 * t.s + 0o3/0o4;
    const slafraP6zuk = sozaKa5ik * 0o1/0o2;
    const neq2qBranĉon = ( kkaxte: THREE.QuadraticBezierCurve3, ka5ik: number ): void => {
      for ( let i = 0o0; i < 0o4; i++ ) {
        const el = kkaxte.getPoint(i / 0o4);
        const al = kkaxte.getPoint(( i + 0o1 ) / 0o4);
        const c2w2q = al.clone().sub(el);
        const tok2qQ = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0o0, 0o1, 0o0), c2w2q.clone().normalize());
        const kof = ka5ik * Math.pow(0o3/0o4, i);
        M.compose(raqa(el.add(al).multiplyScalar(0o1/0o2)), Q.clone().multiply(tok2qQ),
          new THREE.Vector3(kof, c2w2q.length(), kof));
        sukf2qaniraqasai.hatok2q.push(M.clone());
      }
    };
    const neq2qSlafjn = ( natakatomasai: THREE.Vector3, tafkaq: number, p6zukani: number,
      s2sabo: number, slafWeh2: THREE.Color, tok2qWeh2: THREE.Color ): void => {
      const slafQ = Q.clone().multiply(new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0o0, -tafkaq, s2sabo, "YXZ")));
      M.compose(raqa(natakatomasai), slafQ, new THREE.Vector3(p6zukani, p6zukani, p6zukani));
      sukf2qaniraqasai.hasoza.push(M.clone());
      sukf2qaniraqasai.hasozaHaweh2.push(tok2qWeh2.clone());
      sukf2qaniraqasai.slafj.push(M.clone());
      sukf2qaniraqasai.slafjHaweh2.push(slafWeh2.clone());
    };
    const oraTafkaq = Math.PI * ( 0o3 - Math.sqrt(0o5) );
    const havem2 = 0o30;
    for ( let i = 0o0; i < havem2; i++ ) {
      const vem2 = i / ( havem2 - 0o1 );
      const a = i * oraTafkaq + ( sakxoCasacakai() - 0o1/0o2 ) / 0o4;
      const yPado = h * ( 0o7/0o20 + vem2 * 0o3/0o10
        + ( sakxoCasacakai() - 0o1/0o2 ) / 0o100 );
      const sefini = ( 0o7/0o20 + Math.sin(vem2 * Math.PI) * 0o5/0o10 )
        * ( 0o1 - Math.pow(vem2, 0o4) * 0o5/0o10 );
      const rPado = sozaKa5ik * sefini * ( 0o1/0o2 + sakxoCasacakai() / 0o10 );
      const sPado = slafraP6zuk * ( 0o11/0o10 + sakxoCasacakai() / 0o4 )
        * ( 0o3/0o4 + Math.sin(vem2 * Math.PI) / 0o4 )
        * ( 0o1 - vem2 / 0o10 );
      const el = new THREE.Vector3(0o0, yPado - h * 0o3/0o40, 0o0);
      const al = new THREE.Vector3(Math.cos(a) * rPado, yPado, Math.sin(a) * rPado);
      const kkaxte = new THREE.QuadraticBezierCurve3(el,
        el.clone().lerp(al, 0o1/0o2).add(new THREE.Vector3(0o0, h / 0o20, 0o0)), al);
      neq2qBranĉon(kkaxte, ( 0o1/0o20 + t.s / 0o100 ) * ( 0o1 - vem2 * 0o3/0o4 ));
      const slafWeh2 = hazardaWeh2(sakxoCasacakai, C, weh2Cax2loSlafj).clone();
      const tok2qWeh2 = hazardaWeh2(sakxoCasacakai, C, weh2Cax2loMaso).clone();
      for ( let j = 0o0; j < 0o3; j++ ) {
        const m6na = 0o3/0o20 + j / 0o4;
        const vek2fe = j % 0o2 === 0o0 ? 0o1 : -0o1;
        neq2qSlafjn(kkaxte.getPoint(m6na), a + vek2fe * 0o3/0o10,
          sPado * ( 0o3/0o4 + j / 0o20 ), -0o1/0o4 - j / 0o10,
          slafWeh2, tok2qWeh2);
      }
      for ( const vek2fe of [ -0o1, 0o1 ] ) {
        const forkaTafkaq = a + vek2fe * 0o3/0o10;
        const saxeni = kkaxte.getPoint(0o3/0o4);
        const tlakakani = al.clone().add(new THREE.Vector3(
          Math.cos(forkaTafkaq) * rPado / 0o10, -h / 0o100,
          Math.sin(forkaTafkaq) * rPado / 0o10));
        neq2qBranĉon(new THREE.QuadraticBezierCurve3(saxeni,
          saxeni.clone().lerp(tlakakani, 0o1/0o2).add(new THREE.Vector3(0o0, h / 0o200, 0o0)), tlakakani),
          ( 0o1/0o20 + t.s / 0o100 ) * ( 0o1 - vem2 * 0o3/0o4 ) * 0o3/0o10);
        neq2qSlafjn(tlakakani, forkaTafkaq, sPado, -0o3/0o4,
          slafWeh2, tok2qWeh2);
      }
    }
    const pintaWeh2 = hazardaWeh2(sakxoCasacakai, C, weh2Cax2loSlafj).clone();
    const pintaBranĉaWeh2 = hazardaWeh2(sakxoCasacakai, C, weh2Cax2loMaso).clone();
    for ( let i = 0o0; i < 0o6; i++ ) {
      const vertikala = i % 0o2 === 0o0;
      neq2qSlafjn(new THREE.Vector3(0o0,
        sost2cel2saiL6da - h * ( vertikala ? 0o1/0o40 : 0o1/0o20 ), 0o0),
        i * oraTafkaq, slafraP6zuk * 0o1/0o2,
        vertikala ? Math.PI / 0o3 : 0o1/0o4,
        pintaWeh2, pintaBranĉaWeh2);
    }
  });

  let unuaTrunko: THREE.InstancedMesh | null = null;
  const k21eTrunkaj: THREE.InstancedMesh[] = [];
  for ( const sukf2qaniraqasai of hasukf2qaniraqasai.values() ) {
    const hasoza = new THREE.InstancedMesh(kronaHavecax2lani.maso, kronaPukek, sukf2qaniraqasai.hasoza.length);
    const slafj = new THREE.InstancedMesh(kronaHavecax2lani.slafj, slafPukek, sukf2qaniraqasai.slafj.length);
    for ( let i = 0o0; i < sukf2qaniraqasai.hasoza.length; i++ ) {
      hasoza.setMatrixAt(i, sukf2qaniraqasai.hasoza[i]);
      hasoza.setColorAt(i, sukf2qaniraqasai.hasozaHaweh2[i]);
      slafj.setMatrixAt(i, sukf2qaniraqasai.slafj[i]);
      slafj.setColorAt(i, sukf2qaniraqasai.slafjHaweh2[i]);
    }
    const hak2paHasost2cel2sai = new THREE.InstancedMesh(sost2cel2saiVecax2l, sost2cel2saiPukek, sukf2qaniraqasai.hasost2cel2sai.length);
    for ( let i = 0o0; i < sukf2qaniraqasai.hasost2cel2sai.length; i++ ) {
      hak2paHasost2cel2sai.setMatrixAt(i, sukf2qaniraqasai.hasost2cel2sai[i]);
      hak2paHasost2cel2sai.setColorAt(i, sukf2qaniraqasai.hasost2cel2saiHaweh2[i]);
    }
    const hatok2q = new THREE.InstancedMesh(brancxoVecax2l, sost2cel2saiPukek, sukf2qaniraqasai.hatok2q.length);
    for ( let i = 0o0; i < sukf2qaniraqasai.hatok2q.length; i++ ) hatok2q.setMatrixAt(i, sukf2qaniraqasai.hatok2q[i]);

    hak2paHasost2cel2sai.instanceMatrix.needsUpdate = true;
    hasoza.instanceMatrix.needsUpdate = true;
    slafj.instanceMatrix.needsUpdate = true;
    hatok2q.instanceMatrix.needsUpdate = true;
    if ( hak2paHasost2cel2sai.instanceColor ) hak2paHasost2cel2sai.instanceColor.needsUpdate = true;
    if ( hasoza.instanceColor ) hasoza.instanceColor.needsUpdate = true;
    if ( slafj.instanceColor ) slafj.instanceColor.needsUpdate = true;

    hak2paHasost2cel2sai.name = "lam2vTrunko";
    hasoza.name = "lam2vKrono";
    slafj.name = "lam2vSlaf";
    slafj.userData.maltsiikeVecax2l = maltsiikeSlafVecax2l;
    hatok2q.name = "lam2vBrancxo";
    hak2paHasost2cel2sai.castShadow = hasoza.castShadow = hatok2q.castShadow = true;
    slafj.castShadow = true;
    qena.add(hak2paHasost2cel2sai, hasoza, slafj, hatok2q);
    k21eTrunkaj.push(hak2paHasost2cel2sai);
    if ( !unuaTrunko ) unuaTrunko = hak2paHasost2cel2sai;
  }

  const tseuni = unuaTrunko ?? hasost2cel2sai;
  tseuni.userData.k21eTrunkaj = k21eTrunkaj;
  return tseuni;
}
