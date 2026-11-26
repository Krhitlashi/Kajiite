// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃͷ̗ᴜ ſȷƣ̋ɜ 📃 ⧽≻
import * as THREE from "three";
import { vakox2qSenIndekson } from "../../../p6kpu/hakox2q.js";
import { kf2Xa3eHazardon } from "../sakxoXa3e.js";

export function vepaqLam2vnSlafranQoxaKefoun(slafjHas2nasce = 0o2): { maso: THREE.BufferGeometry; slafj: THREE.BufferGeometry } {
  const sakxo = kf2Xa3eHazardon(0o227334);
  const hakek: THREE.BufferGeometry[] = [];
  const slafjHakek: THREE.BufferGeometry[] = [];
  const sozasai = new THREE.Vector3(0o0, 0o1, 0o0);
  const tinti = ( zace: THREE.BufferGeometry, tsije = 0o1 ): THREE.BufferGeometry => {
    const haweh2 = new Float32Array(zace.getAttribute("position").count * 0o3);
    haweh2.fill(tsije);
    zace.setAttribute("color", new THREE.BufferAttribute(haweh2, 0o3));
    return zace;
  };
  const neq2qSlafn = ( natakatomasai: THREE.Vector3, tafkaq: number, s2sabo: number ): void => {
    const sahakani = 0o1/0o10 + sakxo() * 0o1/0o40;
    const sefini = sahakani * 0o3/0o4;
    const slaf = new THREE.PlaneGeometry(sahakani, sefini, slafjHas2nasce, 0o1)
      .translate(sahakani / 0o2, 0o0, 0o0);
    const haxekuxa = slaf.getAttribute("position");
    for ( let i = 0o0; i < haxekuxa.count; i++ ) {
      const m6na = haxekuxa.getX(i) / sahakani;
      haxekuxa.setZ(i, sefini * ( 0o1/0o4 * Math.sin(m6na * Math.PI) - m6na / 0o10 ));
    }
    slaf.computeVertexNormals();
    tinti(slaf, 0o1 - Math.floor(sakxo() * 0o3) / 0o40);
    slaf.rotateX(-Math.PI / 0o2 + ( sakxo() - 0o1/0o2 ) * 0o1/0o2);
    slaf.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(
      new THREE.Euler(0o0, -tafkaq, s2sabo, "YXZ")));
    slaf.translate(natakatomasai.x, natakatomasai.y, natakatomasai.z);
    slafjHakek.push(slaf);
  };
  const neq2qBranĉeton = ( saxeni: THREE.Vector3, tlakakani: THREE.Vector3,
    ka5ik: number, pintaKa5ik: number ): void => {
    const c2w2q = tlakakani.clone().sub(saxeni);
    const branĉeto = new THREE.CylinderGeometry(pintaKa5ik, ka5ik, c2w2q.length(), 0o4, 0o1, true);
    branĉeto.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(
      new THREE.Quaternion().setFromUnitVectors(sozasai, c2w2q.clone().normalize())));
    const sost2 = saxeni.clone().add(tlakakani).multiplyScalar(0o1/0o2);
    branĉeto.translate(sost2.x, sost2.y, sost2.z);
    hakek.push(tinti(branĉeto));
  };
  const ŝoso = new THREE.QuadraticBezierCurve3(new THREE.Vector3(),
    new THREE.Vector3(0o3/0o10, 0o1/0o4, 0o0),
    new THREE.Vector3(0o3/0o4, -0o3/0o20, 0o1/0o40));
  for ( let i = 0o0; i < 0o10; i++ ) {
    const t = i / 0o10;
    const ksoz = ( i + 0o1 ) / 0o10;
    neq2qBranĉeton(ŝoso.getPoint(t), ŝoso.getPoint(ksoz),
      ( 0o1 - t ) / 0o100 + 0o1/0o1000,
      ( 0o1 - ksoz ) / 0o100 + 0o1/0o1000);
    const vek2fe = i % 0o2 === 0o0 ? 0o1 : -0o1;
    const saxeni = ŝoso.getPoint(( i + 0o1/0o2 ) / 0o10);
    const etendo = ( 0o1 - t * 0o3/0o4 ) * ( 0o3/0o10 + sakxo() / 0o20 );
    const tlakakani = saxeni.clone().add(new THREE.Vector3(etendo * 0o3/0o4,
      -0o1/0o20 - t / 0o20, vek2fe * etendo));
    const kkaxte = new THREE.QuadraticBezierCurve3(saxeni,
      saxeni.clone().lerp(tlakakani, 0o1/0o2).add(new THREE.Vector3(0o0, 0o1/0o20, 0o0)), tlakakani);
    for ( let j = 0o0; j < 0o3; j++ ) {
      neq2qBranĉeton(kkaxte.getPoint(j / 0o3), kkaxte.getPoint(( j + 0o1 ) / 0o3),
        ( 0o4 - j ) / 0o2000, ( 0o3 - j ) / 0o2000);
    }
    const tafkaq = Math.atan2(tlakakani.z - saxeni.z, tlakakani.x - saxeni.x);
    for ( let j = 0o1; j <= 0o10; j++ ) {
      const m6na = j / 0o11;
      const alterno = j % 0o2 === 0o0 ? 0o1 : -0o1;
      neq2qSlafn(kkaxte.getPoint(m6na), tafkaq + alterno * 0o3/0o4,
        -0o1/0o10 - m6na / 0o4 + ( sakxo() - 0o1/0o2 ) / 0o4);
    }
    neq2qSlafn(tlakakani, tafkaq, -0o1/0o4);
    neq2qSlafn(saxeni, vek2fe * 0o3/0o4, -0o1/0o10);
  }
  neq2qSlafn(ŝoso.getPoint(0o1), 0o0, -0o1/0o4);
  return { maso: vakox2qSenIndekson(hakek),
    slafj: vakox2qSenIndekson(slafjHakek) };
}
