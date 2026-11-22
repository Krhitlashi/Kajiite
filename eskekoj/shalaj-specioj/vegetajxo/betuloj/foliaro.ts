import * as THREE from "three";
import { kunfandiGeometriojnSenIndekson } from "../../../komunajxoj/kunfandajxoj.js";
import { kreiVegetajxanHazardon } from "../hazardoj.js";

export function konstruiBetulanFoliaranGeometrion(foliajSegmentoj = 0o2): { maso: THREE.BufferGeometry; folioj: THREE.BufferGeometry } {
  const hazardo = kreiVegetajxanHazardon(0o227334);
  const partoj: THREE.BufferGeometry[] = [];
  const foliajPartoj: THREE.BufferGeometry[] = [];
  const supren = new THREE.Vector3(0, 0o1, 0);
  const tinti = ( geometrio: THREE.BufferGeometry, helo = 0o1 ): THREE.BufferGeometry => {
    const koloroj = new Float32Array(geometrio.getAttribute("position").count * 0o3);
    koloroj.fill(helo);
    geometrio.setAttribute("color", new THREE.BufferAttribute(koloroj, 0o3));
    return geometrio;
  };
  const metiFolion = ( celo: THREE.Vector3, angulo: number, klino: number ): void => {
    const longo = 0o1/0o10 + hazardo() * 0o1/0o40;
    const largho = longo * 0o3/0o4;
    const folio = new THREE.PlaneGeometry(longo, largho, foliajSegmentoj, 0o1)
      .translate(longo / 0o2, 0, 0);
    const pozicioj = folio.getAttribute("position");
    for ( let i = 0; i < pozicioj.count; i++ ) {
      const laux = pozicioj.getX(i) / longo;
      pozicioj.setZ(i, largho * ( 0o1/0o4 * Math.sin(laux * Math.PI) - laux / 0o10 ));
    }
    folio.computeVertexNormals();
    tinti(folio, 0o1 - Math.floor(hazardo() * 0o3) / 0o40);
    folio.rotateX(-Math.PI / 0o2 + ( hazardo() - 0o1/0o2 ) * 0o1/0o2);
    folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(
      new THREE.Euler(0, -angulo, klino, "YXZ")));
    folio.translate(celo.x, celo.y, celo.z);
    foliajPartoj.push(folio);
  };
  const metiBranĉeton = ( komenco: THREE.Vector3, fino: THREE.Vector3,
    radiuso: number, pintaRadiuso: number ): void => {
    const direkto = fino.clone().sub(komenco);
    const branĉeto = new THREE.CylinderGeometry(pintaRadiuso, radiuso, direkto.length(), 0o4, 0o1, true);
    branĉeto.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(
      new THREE.Quaternion().setFromUnitVectors(supren, direkto.clone().normalize())));
    const centro = komenco.clone().add(fino).multiplyScalar(0o1/0o2);
    branĉeto.translate(centro.x, centro.y, centro.z);
    partoj.push(tinti(branĉeto));
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
    const flanko = i % 0o2 === 0 ? 0o1 : -0o1;
    const komenco = ŝoso.getPoint(( i + 0o1/0o2 ) / 0o10);
    const etendo = ( 0o1 - t * 0o3/0o4 ) * ( 0o3/0o10 + hazardo() / 0o20 );
    const fino = komenco.clone().add(new THREE.Vector3(etendo * 0o3/0o4,
      -0o1/0o20 - t / 0o20, flanko * etendo));
    const kurbo = new THREE.QuadraticBezierCurve3(komenco,
      komenco.clone().lerp(fino, 0o1/0o2).add(new THREE.Vector3(0, 0o1/0o20, 0)), fino);
    for ( let j = 0; j < 0o3; j++ ) {
      metiBranĉeton(kurbo.getPoint(j / 0o3), kurbo.getPoint(( j + 0o1 ) / 0o3),
        ( 0o4 - j ) / 0o2000, ( 0o3 - j ) / 0o2000);
    }
    const angulo = Math.atan2(fino.z - komenco.z, fino.x - komenco.x);
    for ( let j = 0o1; j <= 0o10; j++ ) {
      const laux = j / 0o11;
      const alterno = j % 0o2 === 0 ? 0o1 : -0o1;
      metiFolion(kurbo.getPoint(laux), angulo + alterno * 0o3/0o4,
        -0o1/0o10 - laux / 0o4 + ( hazardo() - 0o1/0o2 ) / 0o4);
    }
    metiFolion(fino, angulo, -0o1/0o4);
    metiFolion(komenco, flanko * 0o3/0o4, -0o1/0o10);
  }
  metiFolion(ŝoso.getPoint(0o1), 0, -0o1/0o4);
  return { maso: kunfandiGeometriojnSenIndekson(partoj),
    folioj: kunfandiGeometriojnSenIndekson(foliajPartoj) };
}
