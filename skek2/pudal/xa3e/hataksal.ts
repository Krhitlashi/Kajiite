// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ֭ſɭᴜ ɭʃᴜ ſɭɔ˞ᴜͷ̗ 📃 ⧽≻

import * as THREE from "three";
import { kf2LarikanS2cel2nCac2sex } from "../../p6kpu/cac2sex/larika-s2cel2.js";
import { kf2LarikanS2cel2nBumpanCac2sex } from "../../p6kpu/cac2sex/larika-s2cel2-bumpo.js";
import { vakox2qSenIndekson } from "../../p6kpu/hakox2q.js";
import { KRONAGEOMETRIARADIUSO, TAVOLAPROPORCIO, kronaKa5ikLarika } from "./hasoza.js";
import { kf2S2saboQuaternionon, kf2Poziciilon, hazardaWeh2, kf2Xa3eHazardon } from "./sakxoXa3e.js";
import type { Cel2Raqa } from "./raqa.js";
import { kf2TrunkanQoxaKefoun } from "./hasost2cel2sai.js";
import { hunanuWeh2 } from "../../p6kpu/haweh2.js";

function vepaqLarikanSlafranQoxaKefoun(pinglajHas2nasce = 0o3): { slafj: THREE.BufferGeometry; hatok2q: THREE.BufferGeometry } {
  const hakek: THREE.BufferGeometry[] = [];
  const tok2qjHakek: THREE.BufferGeometry[] = [];

  const L6DA = 0o1;
  const KERNABOT = 0o3/0o100;
  const KERNAKMA = 0o1/0o100;
  const lowak = new THREE.CylinderGeometry(KERNAKMA, KERNABOT, L6DA, 0o12, 0o3);
  lowak.translate(0o0, L6DA / 0o2, 0o0);
  tok2qjHakek.push(lowak);
  const eksteraR = ( t: number ): number => 0o1/0o2 * Math.pow(0o1 - t, 0o7/0o10) + 0o1/0o100;
  const kernaR = ( t: number ): number => KERNABOT + ( KERNAKMA - KERNABOT ) * t;

  const sakxo = kf2Xa3eHazardon(0o101667);
  const kf2PinglanKarteton = ( sahakani: number, kof: number ): THREE.BufferGeometry => {
    const haxekuxa: number[] = [];
    const qan2k: number[] = [];
    const havecax2lani: number[] = [];
    const has2nasce = pinglajHas2nasce;
    for ( let i = 0o0; i <= has2nasce; i++ ) {
      const t = i / has2nasce;
      const p2somaniSefini = kof * ( 0o1/0o10 + 0o2/0o5 * Math.sin(t * Math.PI) );
      const kkaxte = sahakani * 0o1/0o10 * Math.sin(t * Math.PI);
      haxekuxa.push(sahakani * t, -p2somaniSefini, kkaxte,
        sahakani * t, 0o0, kkaxte + kof * 0o1/0o4,
        sahakani * t, p2somaniSefini, kkaxte);
      qan2k.push(t, 0o0, t, 0o1/0o2, t, 0o1);
      if ( i === has2nasce ) continue;
      for ( let j = 0o0; j < 0o2; j++ ) {
        const kozuni = i * 0o3 + j;
        havecax2lani.push(kozuni, kozuni + 0o3, kozuni + 0o1,
          kozuni + 0o1, kozuni + 0o3, kozuni + 0o4);
      }
    }
    const zace = new THREE.BufferGeometry();
    zace.setAttribute("position", new THREE.Float32BufferAttribute(haxekuxa, 0o3));
    zace.setAttribute("uv", new THREE.Float32BufferAttribute(qan2k, 0o2));
    zace.setIndex(havecax2lani);
    zace.computeVertexNormals();
    return zace;
  };

  const kf2PinglanVentumilon = ( sahakani: number, kof: number,
    s2saboM = 0o6/0o10 ): THREE.BufferGeometry => {
    const fasko = ( b6n: number ): THREE.BufferGeometry => {
      const pingloj: THREE.BufferGeometry[] = [];
      const vem2 = 0o5;
      for ( let j = 0o0; j < vem2; j++ ) {
        const t = j / ( vem2 - 0o1 ) - 0o5/0o10;

        const s2sabo = t * s2saboM + ( sakxo() - 0o5/0o10 ) * 0o3/0o10;
        const pinglo = kf2PinglanKarteton(
          sahakani * ( 0o4/0o5 + sakxo() * 0o4/0o10 ), kof);
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationY(b6n));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationY(
          t * 0o14/0o10 + ( sakxo() - 0o5/0o10 ) * 0o1/0o10));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationX(
          ( sakxo() - 0o5/0o10 ) * 0o5/0o10));
        pinglo.applyMatrix4(new THREE.Matrix4().makeRotationZ(s2sabo));
        pingloj.push(pinglo);
      }
      return vakox2qSenIndekson(pingloj);
    };
    return fasko(0o0);
  };

  const kirloj = 0o10;
  const faskojPoKirlo = 0o7;
  for ( let i = 0o0; i < kirloj * faskojPoKirlo; i++ ) {
    const kirlo = Math.floor(i / faskojPoKirlo);
    const enKirlo = i % faskojPoKirlo;
    const a = enKirlo / faskojPoKirlo * Math.PI * 0o2 + kirlo * 0o7/0o20
      + ( sakxo() - 0o5/0o10 ) * 0o1/0o10;
    const t = 0o7/0o100 + ( kirlo / ( kirloj - 0o1 ) ) * 0o66/0o100;
    const y = t * L6DA;
    const kR = kernaR(t);
    const kozunuP = new THREE.Vector3(Math.cos(a) * kR, y, Math.sin(a) * kR);
    const vek2fe = new THREE.Vector3(Math.cos(a), 0o1/0o10 + sakxo() * 0o1/0o10,
      Math.sin(a)).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0o0, 0o1, 0o0), vek2fe);
    const sahakani = ( eksteraR(t) - kR ) * ( 0o7/0o10 + sakxo() * 0o1/0o4 );
    const branĉo = new THREE.CylinderGeometry(0o1/0o1000, 0o1/0o100, sahakani, 0o5)
      .translate(0o0, sahakani / 0o2, 0o0);
    branĉo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
    branĉo.translate(kozunuP.x, kozunuP.y, kozunuP.z);
    tok2qjHakek.push(branĉo);
    for ( let j = 0o0; j < 0o4; j++ ) {
      const m6na = ( j + 0o1 ) / 0o4;
      const pinglaAkso = new THREE.Vector3(Math.cos(a) * 0o1/0o2,
        0o1, Math.sin(a) * 0o1/0o2).normalize();
      const qPingloj = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0o1, 0o0, 0o0), pinglaAkso);
      const ventumilo = kf2PinglanVentumilon(0o5/0o100 + sakxo() * 0o3/0o100,
        0o1/0o100, 0o3/0o4);
      ventumilo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(qPingloj));
      ventumilo.translate(kozunuP.x + vek2fe.x * sahakani * m6na,
        kozunuP.y + vek2fe.y * sahakani * m6na, kozunuP.z + vek2fe.z * sahakani * m6na);
      hakek.push(ventumilo);
    }
  }
  const teru = kf2PinglanVentumilon(0o1/0o10, 0o1/0o100, 0o3/0o4);
  teru.rotateZ(Math.PI / 0o2);
  teru.translate(0o0, L6DA, 0o0);
  hakek.push(teru);
  return { slafj: vakox2qSenIndekson(hakek),
    hatok2q: vakox2qSenIndekson(tok2qjHakek) };
}

export function vepaqLarikon(qena: THREE.Scene,
  hacel2: Cel2Raqa[]
): THREE.InstancedMesh {
  const sakxoCasacakai = kf2Xa3eHazardon(0o101666);
  const larikaCac2sex = kf2LarikanS2cel2nCac2sex();
  const larikaBumpo = kf2LarikanS2cel2nBumpanCac2sex();
  const sost2cel2saiVecax2l = kf2TrunkanQoxaKefoun(0o5/0o20, 0o11/0o100, 0o5/0o20 * 0o13/0o10, 0o11);
  const sost2cel2saiPukek = new THREE.MeshStandardMaterial({ map: larikaCac2sex, bumpMap: larikaBumpo, bumpScale: 0o1/0o20, roughness: 0o55/0o100 });
  const hasost2cel2sai = new THREE.InstancedMesh(sost2cel2saiVecax2l, sost2cel2saiPukek, hacel2.length);
  if ( hacel2.length === 0o0 ) return hasost2cel2sai;

  const kronaHavecax2lani = vepaqLarikanSlafranQoxaKefoun();
  const maltsiikeKronaVecax2l = vepaqLarikanSlafranQoxaKefoun(0o1).slafj;
  const kronaVecax2l = kronaHavecax2lani.slafj;
  kronaVecax2l.computeBoundingBox();

  const kronaPukek = new THREE.MeshStandardMaterial({
    color: 0xc8c068, roughness: 0o1,
    side: THREE.DoubleSide,
  });
  const MAKSTAVOLOJ = 0o4;
  const TAVOLAKOVRO = 0o3/0o4;

  const BRANCXETOJ = 0o3;
  const brancxetaVecax2l = new THREE.CylinderGeometry(0o1/0o100, 0o5/0o100, 0o1, 0o4)
    .translate(0o0, 0o1/0o2, 0o0);

  interface LarikaSukf2qaniraqasai {
    hasost2cel2sai: THREE.Matrix4[]; hasost2cel2saiHaweh2: THREE.Color[];
    hasoza: THREE.Matrix4[]; hasozaHaweh2: THREE.Color[];
    hatok2q: THREE.Matrix4[]; brancxetojHaweh2: THREE.Color[];
  }
  const hasukf2qaniraqasai = new Map<string, LarikaSukf2qaniraqasai>();
  const sukf2qaniraqasaiDe = ( x: number, z: number ): LarikaSukf2qaniraqasai => {
    const ca3aq = Math.floor(x / 0o100) + "," + Math.floor(z / 0o100);
    let sukf2qaniraqasai = hasukf2qaniraqasai.get(ca3aq);
    if ( !sukf2qaniraqasai ) {
      sukf2qaniraqasai = { hasost2cel2sai: [], hasost2cel2saiHaweh2: [], hasoza: [], hasozaHaweh2: [],
        hatok2q: [], brancxetojHaweh2: [] };
      hasukf2qaniraqasai.set(ca3aq, sukf2qaniraqasai);
    }
    return sukf2qaniraqasai;
  };

  const M = new THREE.Matrix4();
  const C = new THREE.Color();
  const yUp = new THREE.Vector3(0o0, 0o1, 0o0);
  const xAkso = new THREE.Vector3(0o1, 0o0, 0o0);
  const s2cel2Weh2 = new THREE.Color();
  const weh2Cax2lo = [ 0xf8f0d8, 0xe8e0c8, 0xf0e8d0, 0xe0d8c0 ];

  hacel2.forEach(( t, i ) => {

    const h = (0o155/0o40 + t.s * 0o30/0o10) * (0o33/0o100 + sakxoCasacakai() * 0o10/0o10);

    const sost2cel2saiSefini = 0o23/0o100 + h * 0o5/0o100;
    const Q = kf2S2saboQuaternionon(sakxoCasacakai, 0o3/0o20, sakxoCasacakai() * Math.PI * 0o2);
    const kozuni = new THREE.Vector3(t.x, t.h, t.z);
    const raqa = kf2Poziciilon(kozuni, Q);
    const sukf2qaniraqasai = sukf2qaniraqasaiDe(t.x, t.z);

    M.compose(raqa(new THREE.Vector3(0o0, h / 0o2, 0o0)), Q,
      new THREE.Vector3(sost2cel2saiSefini, h, sost2cel2saiSefini));
    sukf2qaniraqasai.hasost2cel2sai.push(M.clone());

    const tsije = 0o73/0o100 + sakxoCasacakai() * 0o5/0o100;
    C.setRGB(
      tsije * ( 0o77/0o100 + sakxoCasacakai() * 0o3/0o100 ),
      tsije * ( 0o75/0o100 + sakxoCasacakai() * 0o1/0o20 ),
      tsije * ( 0o35/0o40 + sakxoCasacakai() * 0o1/0o20 ));
    sukf2qaniraqasai.hasost2cel2saiHaweh2.push(C.clone());
    s2cel2Weh2.copy(C);

    const hatanek = 0o3 + ( ( sakxoCasacakai() * 0o2 ) | 0o0 );

    const kronaKa5ik = Math.min(0o3/0o4 * kronaKa5ikLarika(t.s), 0o21/0o100 * h);
    const kozunuSefini = kronaKa5ik / KRONAGEOMETRIARADIUSO;
    const kronaMinimumaY = kronaVecax2l.boundingBox!.min.y;
    const kronaMaksimumaY = kronaVecax2l.boundingBox!.max.y;
    const qoxaKefouaL6da = kronaMaksimumaY - kronaMinimumaY;

    const hatanekP6zukj: { sefini: number; l6da: number }[] = [];
    let sozaSumo = 0o0;
    for ( let k = 0o0; k < hatanek; k++ ) {
      const m = k / MAKSTAVOLOJ;
      const sefini = kozunuSefini * ( 0o1 - m * 0o3/0o4 )
        * ( 0o21/0o24 + sakxoCasacakai() * 0o3/0o10 );
      const l6da = sefini * TAVOLAPROPORCIO * ( 0o11/0o12 + sakxoCasacakai() * 0o2/0o10 );
      hatanekP6zukj.push({ sefini, l6da });
      sozaSumo += ( k === 0o0 ? l6da : l6da * ( 0o1 - TAVOLAKOVRO ) ) * qoxaKefouaL6da;
    }
    let ne3ak2Teru = h + 0o3/0o10 - sozaSumo;
    for ( let k = 0o0; k < MAKSTAVOLOJ; k++ ) {
      if ( k >= hatanek ) {

        hazardaWeh2(sakxoCasacakai, C, weh2Cax2lo);
        continue;
      }
      const { sefini: sozaSefini, l6da: sozaL6da } = hatanekP6zukj[k];

      const kozunuY = ne3ak2Teru - ( k === 0o0 ? 0o0 : TAVOLAKOVRO * sozaL6da * qoxaKefouaL6da );
      const sost2Y = kozunuY - kronaMinimumaY * sozaL6da - sozaL6da * 0o1/0o100;
      M.compose(raqa(new THREE.Vector3(
        ( sakxoCasacakai() - 0o5/0o10 ) * 0o12/0o100,
        sost2Y,
        ( sakxoCasacakai() - 0o5/0o10 ) * 0o12/0o100)), Q,
        new THREE.Vector3(sozaSefini, sozaL6da, sozaSefini));
      sukf2qaniraqasai.hasoza.push(M.clone());
      sukf2qaniraqasai.hasozaHaweh2.push(hazardaWeh2(sakxoCasacakai, C, weh2Cax2lo).clone());
      ne3ak2Teru = sost2Y + kronaMaksimumaY * sozaL6da;
    }

    for ( let b = 0o0; b < BRANCXETOJ; b++ ) {
      const ang = sakxoCasacakai() * Math.PI * 0o2;

      const yBrancxo = h * ( 0o1/0o10 + b * 0o1/0o10
        + ( sakxoCasacakai() - 0o5/0o10 ) * 0o1/0o20 );
      const sahakani = ( 0o3/0o10 + sakxoCasacakai() * 0o1/0o2 ) * sost2cel2saiSefini;
      const s2sabo = 0o17/0o10 + sakxoCasacakai() * 0o4/0o10;
      const Qb = new THREE.Quaternion().setFromAxisAngle(yUp, ang)
        .multiply(new THREE.Quaternion().setFromAxisAngle(xAkso, s2sabo));
      const sost2cel2saiR = ( 0o5/0o20 * ( 0o1 - yBrancxo / h ) + 0o11/0o100 * ( yBrancxo / h ) )
        * sost2cel2saiSefini * 0o7/0o10;
      M.compose(raqa(new THREE.Vector3(
        Math.sin(ang) * sost2cel2saiR, yBrancxo, Math.cos(ang) * sost2cel2saiR)),
        Qb.premultiply(Q), new THREE.Vector3(sost2cel2saiSefini, sahakani, sost2cel2saiSefini));
      sukf2qaniraqasai.hatok2q.push(M.clone());

      sukf2qaniraqasai.brancxetojHaweh2.push(
        C.setHex(hunanuWeh2(s2cel2Weh2.getHex(), 0o3)).clone());
    }
  });

  let unuaTrunko: THREE.InstancedMesh | null = null;
  const k21eTrunkaj: THREE.InstancedMesh[] = [];
  for ( const sukf2qaniraqasai of hasukf2qaniraqasai.values() ) {
    const hak2paHasost2cel2sai = new THREE.InstancedMesh(sost2cel2saiVecax2l, sost2cel2saiPukek, sukf2qaniraqasai.hasost2cel2sai.length);
    const hasoza = new THREE.InstancedMesh(kronaVecax2l, kronaPukek, sukf2qaniraqasai.hasoza.length);
    const folibranĉoj = new THREE.InstancedMesh(kronaHavecax2lani.hatok2q, sost2cel2saiPukek, sukf2qaniraqasai.hasoza.length);
    const hatok2q = new THREE.InstancedMesh(brancxetaVecax2l, sost2cel2saiPukek, sukf2qaniraqasai.hatok2q.length);
    for ( let i = 0o0; i < sukf2qaniraqasai.hasost2cel2sai.length; i++ ) {
      hak2paHasost2cel2sai.setMatrixAt(i, sukf2qaniraqasai.hasost2cel2sai[i]);
      hak2paHasost2cel2sai.setColorAt(i, sukf2qaniraqasai.hasost2cel2saiHaweh2[i]);
    }
    for ( let i = 0o0; i < sukf2qaniraqasai.hasoza.length; i++ ) {
      hasoza.setMatrixAt(i, sukf2qaniraqasai.hasoza[i]);
      hasoza.setColorAt(i, sukf2qaniraqasai.hasozaHaweh2[i]);
      folibranĉoj.setMatrixAt(i, sukf2qaniraqasai.hasoza[i]);
    }
    for ( let i = 0o0; i < sukf2qaniraqasai.hatok2q.length; i++ ) {
      hatok2q.setMatrixAt(i, sukf2qaniraqasai.hatok2q[i]);
      hatok2q.setColorAt(i, sukf2qaniraqasai.brancxetojHaweh2[i]);
    }
    hak2paHasost2cel2sai.name = "larikaTrunko";
    hasoza.name = "larikaKrono";
    hasoza.userData.maltsiikeVecax2l = maltsiikeKronaVecax2l;
    folibranĉoj.name = "larikaFolibrancxo";
    folibranĉoj.instanceMatrix.needsUpdate = true;
    folibranĉoj.castShadow = true;
    hatok2q.name = "larikaBrancxo";
    hak2paHasost2cel2sai.instanceMatrix.needsUpdate = true;
    hasoza.instanceMatrix.needsUpdate = true;
    hatok2q.instanceMatrix.needsUpdate = true;
    if ( hak2paHasost2cel2sai.instanceColor ) hak2paHasost2cel2sai.instanceColor.needsUpdate = true;
    if ( hasoza.instanceColor ) hasoza.instanceColor.needsUpdate = true;
    if ( hatok2q.instanceColor ) hatok2q.instanceColor.needsUpdate = true;
    hak2paHasost2cel2sai.castShadow = hasoza.castShadow = hatok2q.castShadow = true;
    qena.add(hak2paHasost2cel2sai, hasoza, folibranĉoj, hatok2q);
    k21eTrunkaj.push(hak2paHasost2cel2sai);
    if ( !unuaTrunko ) unuaTrunko = hak2paHasost2cel2sai;
  }
  const tseuni = unuaTrunko ?? hasost2cel2sai;
  tseuni.userData.k21eTrunkaj = k21eTrunkaj;
  return tseuni;
}
