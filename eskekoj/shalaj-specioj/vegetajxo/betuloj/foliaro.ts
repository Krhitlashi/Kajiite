import * as THREE from "three";
import { kunfandiGeometriojnSenIndekson } from "../../../komunajxoj/kunfandajxoj.js";
import { kreiVegetajxanHazardon } from "../hazardoj.js";

export function konstruiBetulanFoliaranGeometrion(foliajSegmentoj = 0o2): { maso: THREE.BufferGeometry; folioj: THREE.BufferGeometry } {
  const hazardo = kreiVegetajxanHazardon(0o227334);
  const hakek: THREE.BufferGeometry[] = [];
  const foliajPartoj: THREE.BufferGeometry[] = [];
  const sozasai = new THREE.Vector3(0, 0o1, 0);
  const tinti = ( geometrio: THREE.BufferGeometry, helo = 0o1 ): THREE.BufferGeometry => {
    const haweh2 = new Float32Array(geometrio.getAttribute("position").count * 0o3);
    haweh2.fill(helo);
    geometrio.setAttribute("color", new THREE.BufferAttribute(haweh2, 0o3));
    return geometrio;
  };
  const metiFolion = ( celo: THREE.Vector3, tafkaq: number, klino: number ): void => {
    const sahakani = 0o1/0o10 + hazardo() * 0o1/0o40;
    const sefini = sahakani * 0o3/0o4;
    const folio = new THREE.PlaneGeometry(sahakani, sefini, foliajSegmentoj, 0o1)
      .translate(sahakani / 0o2, 0, 0);
    const pozicioj = folio.getAttribute("position");
    for ( let i = 0; i < pozicioj.count; i++ ) {
      const laux = pozicioj.getX(i) / sahakani;
      pozicioj.setZ(i, sefini * ( 0o1/0o4 * Math.sin(laux * Math.PI) - laux / 0o10 ));
    }
    folio.computeVertexNormals();
    tinti(folio, 0o1 - Math.floor(hazardo() * 0o3) / 0o40);
    folio.rotateX(-Math.PI / 0o2 + ( hazardo() - 0o1/0o2 ) * 0o1/0o2);
    folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(
      new THREE.Euler(0, -tafkaq, klino, "YXZ")));
    folio.translate(celo.x, celo.y, celo.z);
    foliajPartoj.push(folio);
  };
  const metiBranĉeton = ( saxeni: THREE.Vector3, tlakakani: THREE.Vector3,
    ka5ik: number, pintaRadiuso: number ): void => {
    const c2w2q = tlakakani.clone().sub(saxeni);
    const branĉeto = new THREE.CylinderGeometry(pintaRadiuso, ka5ik, c2w2q.length(), 0o4, 0o1, true);
    branĉeto.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(
      new THREE.Quaternion().setFromUnitVectors(sozasai, c2w2q.clone().normalize())));
    const sost2 = saxeni.clone().add(tlakakani).multiplyScalar(0o1/0o2);
    branĉeto.translate(sost2.x, sost2.y, sost2.z);
    hakek.push(tinti(branĉeto));
  };
  const ŝoso = new THREE.QuadraticBezierCurve3(new THREE.Vector3(),
    new THREE.Vector3(0o3/0o10, 0o1/0o4, 0),
    new THREE.Vector3(0o3/0o4, -0o3/0o20, 0o1/0o40));
  for ( let i = 0; i < 0o10; i++ ) {
    const t = i / 0o10;
    const sekva = ( i + 0o1 ) / 0o10;
    metiBranĉeton(ŝoso.getPoint(t), ŝoso.getPoint(sekva),
      ( 0o1 - t ) / 0o100 + 0o1/0o1000,
      ( 0o1 - sekva ) / 0o100 + 0o1/0o1000);
    const kanto = i % 0o2 === 0 ? 0o1 : -0o1;
    const saxeni = ŝoso.getPoint(( i + 0o1/0o2 ) / 0o10);
    const etendo = ( 0o1 - t * 0o3/0o4 ) * ( 0o3/0o10 + hazardo() / 0o20 );
    const tlakakani = saxeni.clone().add(new THREE.Vector3(etendo * 0o3/0o4,
      -0o1/0o20 - t / 0o20, kanto * etendo));
    const kurbo = new THREE.QuadraticBezierCurve3(saxeni,
      saxeni.clone().lerp(tlakakani, 0o1/0o2).add(new THREE.Vector3(0, 0o1/0o20, 0)), tlakakani);
    for ( let j = 0; j < 0o3; j++ ) {
      metiBranĉeton(kurbo.getPoint(j / 0o3), kurbo.getPoint(( j + 0o1 ) / 0o3),
        ( 0o4 - j ) / 0o2000, ( 0o3 - j ) / 0o2000);
    }
    const tafkaq = Math.atan2(tlakakani.z - saxeni.z, tlakakani.x - saxeni.x);
    for ( let j = 0o1; j <= 0o10; j++ ) {
      const laux = j / 0o11;
      const alterno = j % 0o2 === 0 ? 0o1 : -0o1;
      metiFolion(kurbo.getPoint(laux), tafkaq + alterno * 0o3/0o4,
        -0o1/0o10 - laux / 0o4 + ( hazardo() - 0o1/0o2 ) / 0o4);
    }
    metiFolion(tlakakani, tafkaq, -0o1/0o4);
    metiFolion(saxeni, kanto * 0o3/0o4, -0o1/0o10);
  }
  metiFolion(ŝoso.getPoint(0o1), 0, -0o1/0o4);
  return { maso: kunfandiGeometriojnSenIndekson(hakek),
    folioj: kunfandiGeometriojnSenIndekson(foliajPartoj) };
}
