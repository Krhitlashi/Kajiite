// ≺⧼ ɭʃɜ j͐ʃᶗ‹w 🕷️ ⧽≻
// ⟨ ſᶘɔ ʌ ſןᴜ ɭʃэ , j͑ʃᴜ ſɭэ ɭʃᴜ , ⟅ ⟩
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { Paga, PudalMalneto } from "./pudal-hahunaq.js";
import { kf2KutiklanCac2sex } from "../komunajxoj/cac2sex/marlaraksxa-kutiklo.js";

const kruroBataAkso = new THREE.Vector3(0, 1, 0);
const kruroBataKvaterniono = new THREE.Quaternion();

const sozasai = new THREE.Vector3(0, 1, 0);

function kf2Tubon(de: THREE.Vector3, al: THREE.Vector3,
  rDe: number, rAl: number): THREE.BufferGeometry {
  const l6da = new THREE.Vector3().subVectors(al, de);
  const geometrio = new THREE.CylinderGeometry(rAl, rDe, l6da.length(), 0o6);
  geometrio.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(
    sozasai, l6da.normalize()));
  geometrio.translate(( de.x + al.x ) / 0o2, ( de.y + al.y ) / 0o2, ( de.z + al.z ) / 0o2);
  return geometrio;
}

function kf2Artikon(n2k: THREE.Vector3, r: number): THREE.BufferGeometry {
  return new THREE.SphereGeometry(r, 0o6, 0o5).translate(n2k.x, n2k.y, n2k.z);
}

export function vepaqMarlaraksxanMalneton(): PudalMalneto {
  const hate = new THREE.Group();
  const kutiklo = kf2KutiklanCac2sex();
  const korpaMaterialo = new THREE.MeshStandardMaterial({
    color: 0xd8b890, transparent: true, opacity: 0o3/0o4,
    depthWrite: false, side: THREE.DoubleSide, roughness: 0o1/0o2,
    map: kutiklo.weh2, bumpMap: kutiklo.reliefo, bumpScale: 0o1/0o50,
  });
  // ⟨ ɭʃɜ ſɭɹȝ , ⟅ ⟩
  const zHas2nasce = [ 0o12/0o100, 0o2/0o100, -0o4/0o100, -0o12/0o100 ];
  const trunkajPunktoj = [
    new THREE.Vector3(0, 0, -0o14/0o100),
    new THREE.Vector3(0, 0o1/0o200, -0o7/0o100),
    new THREE.Vector3(0, 0o1/0o100, 0),
    new THREE.Vector3(0, 0o1/0o200, 0o7/0o100),
    new THREE.Vector3(0, 0, 0o14/0o100),
  ];
  const trunkaMesho = new THREE.Mesh(mergeGeometries([
    kf2Tubon(trunkajPunktoj[0], trunkajPunktoj[1], 0o30/0o1000, 0o44/0o1000),
    kf2Tubon(trunkajPunktoj[1], trunkajPunktoj[2], 0o44/0o1000, 0o50/0o1000),
    kf2Tubon(trunkajPunktoj[2], trunkajPunktoj[3], 0o50/0o1000, 0o46/0o1000),
    kf2Tubon(trunkajPunktoj[3], trunkajPunktoj[4], 0o46/0o1000, 0o32/0o1000),
    kf2Artikon(trunkajPunktoj[0], 0o30/0o1000),
    kf2Artikon(trunkajPunktoj[4], 0o32/0o1000),
    ...zHas2nasce.map(z => new THREE.SphereGeometry(0o50/0o1000, 0o10, 0o6)
      .scale(0o1, 0o17/0o20, 0o1/0o4).translate(0, 0o1/0o100, z)),
  ])!, korpaMaterialo);
  trunkaMesho.scale.set(0o1, 0o17/0o20, 0o1);
  trunkaMesho.name = "korpo";
  hate.add(trunkaMesho);

  // ⟨ ſɭᴜ ʃןᴜ , ꞙɭı , ⟅ ⟩
  for ( const k of [ 0, 0o1, 0o2, 0o3 ] ) {
    for ( const s of [ 0o1, -0o1 ] ) {
      const elstaraĵo = new THREE.Mesh(
        new THREE.SphereGeometry(0o4/0o100, 0o10, 0o6), korpaMaterialo);
      elstaraĵo.scale.set(0o14/0o10, 0o1, 0o6/0o10);
      elstaraĵo.position.set(s * 0o6/0o100, -0o1/0o100, zHas2nasce[k]);
      hate.add(elstaraĵo);
    }
  }

  // ⟨ j͑ʃᴜ ſɭ,w , ⟅ ⟩
  const rostrajPunktoj = [
    new THREE.Vector3(0, -0o1/0o100, 0o16/0o100),
    new THREE.Vector3(0, -0o6/0o100, 0o30/0o100),
    new THREE.Vector3(0, -0o12/0o100, 0o44/0o100),
  ];
  const rostro = new THREE.Mesh(mergeGeometries([
    kf2Tubon(rostrajPunktoj[0], rostrajPunktoj[1], 0o32/0o1000, 0o26/0o1000),
    kf2Tubon(rostrajPunktoj[1], rostrajPunktoj[2], 0o26/0o1000, 0o20/0o1000),
    kf2Artikon(rostrajPunktoj[2], 0o20/0o1000),
  ])!, korpaMaterialo);
  rostro.name = "rostro";
  hate.add(rostro);
  const w6qaPunkto = new THREE.Vector3(0, -0o16/0o100, 0o50/0o100);
  const rostropinto = new THREE.Mesh(mergeGeometries([
    kf2Tubon(rostrajPunktoj[2], w6qaPunkto, 0o20/0o1000, 0o11/0o1000),
    kf2Artikon(w6qaPunkto, 0o11/0o1000),
  ])!, new THREE.MeshStandardMaterial({ color: 0x584838, roughness: 0o3/0o4,
    map: kutiklo.weh2, bumpMap: kutiklo.reliefo, bumpScale: 0o1/0o50 }));
  rostropinto.name = "rostropinto";
  hate.add(rostropinto);

  const t2banuMaterialo = new THREE.MeshStandardMaterial({ color: 0x18202a, roughness: 0o1/0o4 });
  const tubero = new THREE.Mesh(new THREE.SphereGeometry(0o5/0o100, 0o10, 0o6), korpaMaterialo);
  tubero.scale.set(1, 0o4/0o5, 0o6/0o10);
  tubero.position.set(0, 0o7/0o100, 0o1/0o12);
  hate.add(tubero);
  for ( const sx of [ 0o1, -0o1 ] ) {
    for ( const sz of [ 0o1, -0o1 ] ) {
      const okulo = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o100, 0o6, 0o4), t2banuMaterialo);
      okulo.position.set(sx * 0o3/0o100, 0o5/0o100, 0o1/0o12 + sz * 0o2/0o100);
      hate.add(okulo);
    }
  }

  const abdomeno = new THREE.Mesh(
    new THREE.CylinderGeometry(0o3/0o100, 0o2/0o100, 0o10/0o100, 0o6), korpaMaterialo);
  abdomeno.rotation.x = -Math.PI / 0o2 - 0o3/0o10;
  abdomeno.position.set(0, 0o3/0o100, -0o1/0o6);
  hate.add(abdomeno);

  for ( const s of [ 0o1, -0o1 ] ) {
    const ovigero = new THREE.Mesh(
      new THREE.CylinderGeometry(0o1/0o100, 0o2/0o100, 0o12/0o100, 0o6), korpaMaterialo);
    ovigero.rotation.x = Math.PI / 0o2 - 0o1/0o2;
    ovigero.rotation.z = -s * 0o2/0o10;
    ovigero.position.set(s * 0o5/0o100, -0o5/0o100, 0o12/0o100);
    hate.add(ovigero);
  }

  // ⟨ ſןᴜ ɭʃэ , ⟅ ⟩
  // ⟨ ſᶘɔ ʌ ɭʃᴜc̭ ſɟɹƽ , }ʃɹƽ , ⟅ ⟩
  // ⟨ ſᶘɔ ʌ ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , ꞙɭı , ⟅ ⟩
  const kruraMaterialo = new THREE.MeshStandardMaterial({
    color: 0xd8b890, map: kutiklo.weh2,
    bumpMap: kutiklo.reliefo, bumpScale: 0o1/0o50,
    transparent: false, opacity: 1,
    depthWrite: true, depthTest: true, side: THREE.DoubleSide,
    roughness: 0o1/0o2, emissive: 0x382818, emissiveIntensity: 0o1/0o10,
  });
  // ⟨ }ʃɹƽ , ɭʃᴜc̭ ſɟɹƽ , ⟅ ⟩
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
      // ⟨ ſɭᴜ ʃןᴜ , ⟅ ⟩
      kruro.userData.kanto = s;
      kruro.position.copy(kokso);
      // ⟨ ſןᴜ j͐ʃэ , ſןᴜ ɭʃэ , ⟅ ⟩
      kruro.scale.setScalar(0o6/0o10);

      const femuro = new THREE.Mesh(mergeGeometries([
        kf2Tubon(new THREE.Vector3(), new THREE.Vector3().subVectors(genuo, kokso),
          0o13/0o1000, 0o10/0o1000),
        kf2Artikon(new THREE.Vector3(), 0o20/0o1000),
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
      const hakek: THREE.BufferGeometry[] = [
        kf2Artikon(loka, 0o15/0o1000),
        kf2Tubon(loka, lokaMaleolo, 0o10/0o1000, 0o6/0o1000),
        kf2Artikon(lokaMaleolo, 0o7/0o1000),
        kf2Tubon(lokaMaleolo, lokaPiedo, 0o6/0o1000, 0o5/0o1000),
        kf2Tubon(lokaPiedo, lokaUngoTip, 0o5/0o1000, 0o1/0o1000),
      ];
      const tibiaMesho = new THREE.Mesh(mergeGeometries(hakek)!, kruraMaterialo);
      tibiaMesho.name = "tibio";
      genuoGrupo.add(tibiaMesho);
      kruro.add(genuoGrupo);
      hate.add(kruro);
    }
  }

  return { malneto: hate, platigxo: new THREE.Vector3(0o1, 0o1, 0o1), teru: 0o1/0o10, pudal: "tolxu", mergo: 0o2 };
}

export function gxisdatigiTolxun(b: Paga, t: number): void {
  const subtila = Math.sin(t * 0o1/0o2 + b.phase * 0o3);
  let i = 0;
  for ( const bazaro of b.bazajKruroj ) {
    const paro = Math.floor(i / 2);
    const kanto = i % 2;
    const fazo = t * 0o33/0o10 + b.phase + paro * 0o7/0o10 + kanto * Math.PI;
    const tona = Math.sin(fazo);
    const levo = Math.max(0, Math.sin(fazo + Math.PI * 0o1/0o4));
    const svingo = tona * 0o14/0o100 + Math.sin(fazo * 2) * 0o3/0o100;
    // ⟨ j͑ʃᴜ ſןɹ , ⟅ ⟩
    kruroBataKvaterniono.setFromAxisAngle(kruroBataAkso, -bazaro.kanto * svingo);
    bazaro.kruro.quaternion.copy(kruroBataKvaterniono).multiply(bazaro.q);

    // ⟨ ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , ⟅ ⟩
    if ( bazaro.genuo ) {
      const flekso = levo * 0o2/0o5 + Math.max(0, tona) * 0o10/0o100;
      bazaro.genuo.rotation.z = -bazaro.kanto * ( 0o1/0o40 + flekso );
    }
    i++;
  }
  b.hate.rotation.x = subtila * 0o2/0o100 + Math.sin(t * 0o33/0o10 + b.phase) * 0o1/0o100;
  b.hate.rotation.z = Math.cos(t * 0o33/0o10 + b.phase) * 0o1/0o100;
}
