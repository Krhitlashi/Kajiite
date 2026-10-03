// ≺⧼ ពីងពាងសមុទ្រ 🕷️ ⧽≻
// ⟨ ហេតុអ្វីជើងមើលទៅបែក 📃 ⟩
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { Besto, SpecoMalneto } from "./speco-tipoj.js";
import { kreiKutiklanTeksajxon } from "../komunajxoj/teksajxoj/marlaraksxa-kutiklo.js";

const kruroBataAkso = new THREE.Vector3(0, 1, 0);
const kruroBataKvaterniono = new THREE.Quaternion();

const supren = new THREE.Vector3(0, 1, 0);

function kreiTubon(de: THREE.Vector3, al: THREE.Vector3,
  rDe: number, rAl: number): THREE.BufferGeometry {
  const delto = new THREE.Vector3().subVectors(al, de);
  const geometrio = new THREE.CylinderGeometry(rAl, rDe, delto.length(), 0o6);
  geometrio.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(
    supren, delto.normalize()));
  geometrio.translate(( de.x + al.x ) / 0o2, ( de.y + al.y ) / 0o2, ( de.z + al.z ) / 0o2);
  return geometrio;
}

function kreiArtikon(punkto: THREE.Vector3, r: number): THREE.BufferGeometry {
  return new THREE.SphereGeometry(r, 0o6, 0o5).translate(punkto.x, punkto.y, punkto.z);
}

export function konstruiMarlaraksxanMalneton(): SpecoMalneto {
  const grupo = new THREE.Group();
  const kutiklo = kreiKutiklanTeksajxon();
  const korpaMaterialo = new THREE.MeshStandardMaterial({
    color: 0xd8b890, transparent: true, opacity: 0o3/0o4,
    depthWrite: false, side: THREE.DoubleSide, roughness: 0o1/0o2,
    map: kutiklo.koloro, bumpMap: kutiklo.reliefo, bumpScale: 0o1/0o50,
  });
  // ⟨ ដើម 📃 ⟩
  const zSegmentoj = [ 0o12/0o100, 0o2/0o100, -0o4/0o100, -0o12/0o100 ];
  const trunkajPunktoj = [
    new THREE.Vector3(0, 0, -0o14/0o100),
    new THREE.Vector3(0, 0o1/0o200, -0o7/0o100),
    new THREE.Vector3(0, 0o1/0o100, 0),
    new THREE.Vector3(0, 0o1/0o200, 0o7/0o100),
    new THREE.Vector3(0, 0, 0o14/0o100),
  ];
  const trunkaMesho = new THREE.Mesh(mergeGeometries([
    kreiTubon(trunkajPunktoj[0], trunkajPunktoj[1], 0o30/0o1000, 0o44/0o1000),
    kreiTubon(trunkajPunktoj[1], trunkajPunktoj[2], 0o44/0o1000, 0o50/0o1000),
    kreiTubon(trunkajPunktoj[2], trunkajPunktoj[3], 0o50/0o1000, 0o46/0o1000),
    kreiTubon(trunkajPunktoj[3], trunkajPunktoj[4], 0o46/0o1000, 0o32/0o1000),
    kreiArtikon(trunkajPunktoj[0], 0o30/0o1000),
    kreiArtikon(trunkajPunktoj[4], 0o32/0o1000),
    ...zSegmentoj.map(z => new THREE.SphereGeometry(0o50/0o1000, 0o10, 0o6)
      .scale(0o1, 0o17/0o20, 0o1/0o4).translate(0, 0o1/0o100, z)),
  ])!, korpaMaterialo);
  trunkaMesho.scale.set(0o1, 0o17/0o20, 0o1);
  trunkaMesho.name = "korpo";
  grupo.add(trunkaMesho);

  // ⟨ ការលេចចេញចំហៀង 📃 ⟩
  for ( const k of [ 0, 0o1, 0o2, 0o3 ] ) {
    for ( const s of [ 0o1, -0o1 ] ) {
      const elstaraĵo = new THREE.Mesh(
        new THREE.SphereGeometry(0o4/0o100, 0o10, 0o6), korpaMaterialo);
      elstaraĵo.scale.set(0o14/0o10, 0o1, 0o6/0o10);
      elstaraĵo.position.set(s * 0o6/0o100, -0o1/0o100, zSegmentoj[k]);
      grupo.add(elstaraĵo);
    }
  }

  // ⟨ កម្រាស់ 📃 ⟩
  const rostrajPunktoj = [
    new THREE.Vector3(0, -0o1/0o100, 0o16/0o100),
    new THREE.Vector3(0, -0o6/0o100, 0o30/0o100),
    new THREE.Vector3(0, -0o12/0o100, 0o44/0o100),
  ];
  const rostro = new THREE.Mesh(mergeGeometries([
    kreiTubon(rostrajPunktoj[0], rostrajPunktoj[1], 0o32/0o1000, 0o26/0o1000),
    kreiTubon(rostrajPunktoj[1], rostrajPunktoj[2], 0o26/0o1000, 0o20/0o1000),
    kreiArtikon(rostrajPunktoj[2], 0o20/0o1000),
  ])!, korpaMaterialo);
  rostro.name = "rostro";
  grupo.add(rostro);
  const buŝaPunkto = new THREE.Vector3(0, -0o16/0o100, 0o50/0o100);
  const rostropinto = new THREE.Mesh(mergeGeometries([
    kreiTubon(rostrajPunktoj[2], buŝaPunkto, 0o20/0o1000, 0o11/0o1000),
    kreiArtikon(buŝaPunkto, 0o11/0o1000),
  ])!, new THREE.MeshStandardMaterial({ color: 0x584838, roughness: 0o3/0o4,
    map: kutiklo.koloro, bumpMap: kutiklo.reliefo, bumpScale: 0o1/0o50 }));
  rostropinto.name = "rostropinto";
  grupo.add(rostropinto);

  const okulaMaterialo = new THREE.MeshStandardMaterial({ color: 0x18202a, roughness: 0o1/0o4 });
  const tubero = new THREE.Mesh(new THREE.SphereGeometry(0o5/0o100, 0o10, 0o6), korpaMaterialo);
  tubero.scale.set(1, 0o4/0o5, 0o6/0o10);
  tubero.position.set(0, 0o7/0o100, 0o1/0o12);
  grupo.add(tubero);
  for ( const sx of [ 0o1, -0o1 ] ) {
    for ( const sz of [ 0o1, -0o1 ] ) {
      const okulo = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o100, 0o6, 0o4), okulaMaterialo);
      okulo.position.set(sx * 0o3/0o100, 0o5/0o100, 0o1/0o12 + sz * 0o2/0o100);
      grupo.add(okulo);
    }
  }

  const abdomeno = new THREE.Mesh(
    new THREE.CylinderGeometry(0o3/0o100, 0o2/0o100, 0o10/0o100, 0o6), korpaMaterialo);
  abdomeno.rotation.x = -Math.PI / 0o2 - 0o3/0o10;
  abdomeno.position.set(0, 0o3/0o100, -0o1/0o6);
  grupo.add(abdomeno);

  for ( const s of [ 0o1, -0o1 ] ) {
    const ovigero = new THREE.Mesh(
      new THREE.CylinderGeometry(0o1/0o100, 0o2/0o100, 0o12/0o100, 0o6), korpaMaterialo);
    ovigero.rotation.x = Math.PI / 0o2 - 0o1/0o2;
    ovigero.rotation.z = -s * 0o2/0o10;
    ovigero.position.set(s * 0o5/0o100, -0o5/0o100, 0o12/0o100);
    grupo.add(ovigero);
  }

  // ⟨ ជើង 📃 ⟩
  // ⟨ ហេតុអ្វីសន្លាក់ជាចំណុច 📃 ⟩
  // ⟨ ហេតុអ្វីជង្គង់ស្មើគ្នា 📃 ⟩
  const kruraMaterialo = new THREE.MeshStandardMaterial({
    color: 0xd8b890, map: kutiklo.koloro,
    bumpMap: kutiklo.reliefo, bumpScale: 0o1/0o50,
    transparent: false, opacity: 1,
    depthWrite: true, depthTest: true, side: THREE.DoubleSide,
    roughness: 0o1/0o2, emissive: 0x382818, emissiveIntensity: 0o1/0o10,
  });
  // ⟨ ចំណុចសន្លាក់ 📃 ⟩
  const koksojZ = [ 0o12/0o100, 0o2/0o100, -0o4/0o100, -0o12/0o100 ];
  const genuojZ = [ 0o24/0o100, 0o5/0o100, -0o5/0o100, -0o24/0o100 ];
  const piedojZ = [ 0o46/0o100, 0o20/0o100, -0o20/0o100, -0o46/0o100 ];
  const piedojX = [ 0o44/0o100, 0o62/0o100, 0o62/0o100, 0o44/0o100 ];
  const GENUA_X = 0o40/0o100, GENUA_Y = 0o37/0o100, PIEDA_Y = -0o45/0o100;
  for ( let k = 0; k < 0o4; k++ ) {
    for ( const s of [ 0o1, -0o1 ] ) {
      const kokso = new THREE.Vector3(s * 0o5/0o100, -0o2/0o100, koksojZ[k]);
      const genuo = new THREE.Vector3(s * GENUA_X, GENUA_Y, genuojZ[k]);
      const piedo = new THREE.Vector3(s * piedojX[k], PIEDA_Y, piedojZ[k]);
      const maleolo = new THREE.Vector3().lerpVectors(genuo, piedo, 0o5/0o10);
      maleolo.y += 0o5/0o100;
      const ungego = new THREE.Vector3().subVectors(piedo, maleolo)
        .setLength(0o12/0o100).add(piedo);
      const kruro = new THREE.Group();
      kruro.name = "kruro";
      kruro.renderOrder = 6;
      // ⟨ ចំហៀង 📃 ⟩
      kruro.userData.flanko = s;
      kruro.position.copy(kokso);
      // ⟨ មាត្រជើង 📃 ⟩
      kruro.scale.setScalar(0o6/0o10);

      const femuro = new THREE.Mesh(mergeGeometries([
        kreiTubon(new THREE.Vector3(), new THREE.Vector3().subVectors(genuo, kokso),
          0o13/0o1000, 0o10/0o1000),
        kreiArtikon(new THREE.Vector3(), 0o20/0o1000),
      ])!, kruraMaterialo);
      femuro.name = "femuro";
      kruro.add(femuro);

      const genuoGrupo = new THREE.Group();
      genuoGrupo.name = "genuo";
      genuoGrupo.position.subVectors(genuo, kokso);
      const loka = new THREE.Vector3();
      const lokaMaleolo = new THREE.Vector3().subVectors(maleolo, genuo);
      const lokaPiedo = new THREE.Vector3().subVectors(piedo, genuo);
      const lokaUngoTip = new THREE.Vector3().subVectors(ungego, genuo);
      const partoj: THREE.BufferGeometry[] = [
        kreiArtikon(loka, 0o15/0o1000),
        kreiTubon(loka, lokaMaleolo, 0o10/0o1000, 0o6/0o1000),
        kreiArtikon(lokaMaleolo, 0o7/0o1000),
        kreiTubon(lokaMaleolo, lokaPiedo, 0o6/0o1000, 0o5/0o1000),
        kreiTubon(lokaPiedo, lokaUngoTip, 0o5/0o1000, 0o1/0o1000),
      ];
      const tibiaMesho = new THREE.Mesh(mergeGeometries(partoj)!, kruraMaterialo);
      tibiaMesho.name = "tibio";
      genuoGrupo.add(tibiaMesho);
      kruro.add(genuoGrupo);
      grupo.add(kruro);
    }
  }

  return { malneto: grupo, platigxo: new THREE.Vector3(0o1, 0o1, 0o1), supro: 0o1/0o10, speco: "marlaraksxo", mergo: 0o2 };
}

export function gxisdatigiMarlaraksxon(b: Besto, t: number): void {
  const subtila = Math.sin(t * 0o1/0o2 + b.phase * 0o3);
  let i = 0;
  for ( const bazaro of b.bazajKruroj ) {
    const paro = Math.floor(i / 2);
    const flanko = i % 2;
    const fazo = t * 0o33/0o10 + b.phase + paro * 0o7/0o10 + flanko * Math.PI;
    const paŝo = Math.sin(fazo);
    const levo = Math.max(0, Math.sin(fazo + Math.PI * 0o1/0o4));
    const svingo = paŝo * 0o14/0o100 + Math.sin(fazo * 2) * 0o3/0o100;
    // ⟨ ការវាយ 📃 ⟩
    kruroBataKvaterniono.setFromAxisAngle(kruroBataAkso, -bazaro.flanko * svingo);
    bazaro.kruro.quaternion.copy(kruroBataKvaterniono).multiply(bazaro.q);

    // ⟨ ជង្គង់ 📃 ⟩
    if ( bazaro.genuo ) {
      const flekso = levo * 0o2/0o5 + Math.max(0, paŝo) * 0o10/0o100;
      bazaro.genuo.rotation.z = -bazaro.flanko * ( 0o1/0o40 + flekso );
    }
    i++;
  }
  b.grupo.rotation.x = subtila * 0o2/0o100 + Math.sin(t * 0o33/0o10 + b.phase) * 0o1/0o100;
  b.grupo.rotation.z = Math.cos(t * 0o33/0o10 + b.phase) * 0o1/0o100;
}
