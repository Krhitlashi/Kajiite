// ≺⧼ ɭʃɜ j͐ʃᶗ‹w 🕷️ ⧽≻
// ⟨ ſᶘɔ ʌ ſןᴜ ɭʃэ , j͑ʃᴜ ſɭэ ɭʃᴜ , ⟅ ⟩
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { Paga, PudalMalneto } from "./pudal-hahunaq.js";
import { kf2KutiklanCac2sex } from "../x2x2q/cac2sex/marlaraksxa-kutiklo.js";

const kruroBataAkso = new THREE.Vector3(0o0, 0o1, 0o0);
const kruroBataKvaterniono = new THREE.Quaternion();

const sozasai = new THREE.Vector3(0o0, 0o1, 0o0);

function kf2Tubon(de: THREE.Vector3, al: THREE.Vector3,
  rDe: number, rAl: number): THREE.BufferGeometry {
  const l6da = new THREE.Vector3().subVectors(al, de);
  const zace = new THREE.CylinderGeometry(rAl, rDe, l6da.length(), 0o6);
  zace.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(
    sozasai, l6da.normalize()));
  zace.translate(( de.x + al.x ) / 0o2, ( de.y + al.y ) / 0o2, ( de.z + al.z ) / 0o2);
  return zace;
}

function kf2Artikon(n2k: THREE.Vector3, r: number): THREE.BufferGeometry {
  return new THREE.SphereGeometry(r, 0o6, 0o5).translate(n2k.x, n2k.y, n2k.z);
}

export function vepaqMarlaraksxanMalneton(): PudalMalneto {
  const hate2 = new THREE.Group();
  const kutiklo = kf2KutiklanCac2sex();
  const korpaPukek = new THREE.MeshStandardMaterial({
    color: 0xd8b890, transparent: true, opacity: 0o3/0o4,
    depthWrite: false, side: THREE.DoubleSide, roughness: 0o1/0o2,
    map: kutiklo.weh2, bumpMap: kutiklo.reliefo, bumpScale: 0o1/0o50,
  });
  // ⟨ ɭʃɜ ſɭɹȝ , ⟅ ⟩
  const zHas2nasce = [ 0o12/0o100, 0o2/0o100, -0o4/0o100, -0o12/0o100 ];
  const sost2cel2saiHan2k = [
    new THREE.Vector3(0o0, 0o0, -0o14/0o100),
    new THREE.Vector3(0o0, 0o1/0o200, -0o7/0o100),
    new THREE.Vector3(0o0, 0o1/0o100, 0o0),
    new THREE.Vector3(0o0, 0o1/0o200, 0o7/0o100),
    new THREE.Vector3(0o0, 0o0, 0o14/0o100),
  ];
  const sost2cel2saiCakamaha = new THREE.Mesh(mergeGeometries([
    kf2Tubon(sost2cel2saiHan2k[0o0], sost2cel2saiHan2k[0o1], 0o30/0o1000, 0o44/0o1000),
    kf2Tubon(sost2cel2saiHan2k[0o1], sost2cel2saiHan2k[0o2], 0o44/0o1000, 0o50/0o1000),
    kf2Tubon(sost2cel2saiHan2k[0o2], sost2cel2saiHan2k[0o3], 0o50/0o1000, 0o46/0o1000),
    kf2Tubon(sost2cel2saiHan2k[0o3], sost2cel2saiHan2k[0o4], 0o46/0o1000, 0o32/0o1000),
    kf2Artikon(sost2cel2saiHan2k[0o0], 0o30/0o1000),
    kf2Artikon(sost2cel2saiHan2k[0o4], 0o32/0o1000),
    ...zHas2nasce.map(z => new THREE.SphereGeometry(0o50/0o1000, 0o10, 0o6)
      .scale(0o1, 0o17/0o20, 0o1/0o4).translate(0o0, 0o1/0o100, z)),
  ])!, korpaPukek);
  sost2cel2saiCakamaha.scale.set(0o1, 0o17/0o20, 0o1);
  sost2cel2saiCakamaha.name = "korpo";
  hate2.add(sost2cel2saiCakamaha);

  // ⟨ ſɭᴜ ʃןᴜ , ꞙɭı , ⟅ ⟩
  for ( const k of [ 0o0, 0o1, 0o2, 0o3 ] ) {
    for ( const s of [ 0o1, -0o1 ] ) {
      const elstaraĵo = new THREE.Mesh(
        new THREE.SphereGeometry(0o4/0o100, 0o10, 0o6), korpaPukek);
      elstaraĵo.scale.set(0o14/0o10, 0o1, 0o6/0o10);
      elstaraĵo.position.set(s * 0o6/0o100, -0o1/0o100, zHas2nasce[k]);
      hate2.add(elstaraĵo);
    }
  }

  // ⟨ j͑ʃᴜ ſɭ,w , ⟅ ⟩
  const rostrajHan2k = [
    new THREE.Vector3(0o0, -0o1/0o100, 0o16/0o100),
    new THREE.Vector3(0o0, -0o6/0o100, 0o30/0o100),
    new THREE.Vector3(0o0, -0o12/0o100, 0o44/0o100),
  ];
  const rostro = new THREE.Mesh(mergeGeometries([
    kf2Tubon(rostrajHan2k[0o0], rostrajHan2k[0o1], 0o32/0o1000, 0o26/0o1000),
    kf2Tubon(rostrajHan2k[0o1], rostrajHan2k[0o2], 0o26/0o1000, 0o20/0o1000),
    kf2Artikon(rostrajHan2k[0o2], 0o20/0o1000),
  ])!, korpaPukek);
  rostro.name = "rostro";
  hate2.add(rostro);
  const w6qaN2k = new THREE.Vector3(0o0, -0o16/0o100, 0o50/0o100);
  const rostrocet2 = new THREE.Mesh(mergeGeometries([
    kf2Tubon(rostrajHan2k[0o2], w6qaN2k, 0o20/0o1000, 0o11/0o1000),
    kf2Artikon(w6qaN2k, 0o11/0o1000),
  ])!, new THREE.MeshStandardMaterial({ color: 0x584838, roughness: 0o3/0o4,
    map: kutiklo.weh2, bumpMap: kutiklo.reliefo, bumpScale: 0o1/0o50 }));
  rostrocet2.name = "rostrocet2";
  hate2.add(rostrocet2);

  const t2banuPukek = new THREE.MeshStandardMaterial({ color: 0x182028, roughness: 0o1/0o4 });
  const tubero = new THREE.Mesh(new THREE.SphereGeometry(0o5/0o100, 0o10, 0o6), korpaPukek);
  tubero.scale.set(0o1, 0o4/0o5, 0o6/0o10);
  tubero.position.set(0o0, 0o7/0o100, 0o1/0o12);
  hate2.add(tubero);
  for ( const sx of [ 0o1, -0o1 ] ) {
    for ( const sz of [ 0o1, -0o1 ] ) {
      const t2banu = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o100, 0o6, 0o4), t2banuPukek);
      t2banu.position.set(sx * 0o3/0o100, 0o5/0o100, 0o1/0o12 + sz * 0o2/0o100);
      hate2.add(t2banu);
    }
  }

  const abdomeno = new THREE.Mesh(
    new THREE.CylinderGeometry(0o3/0o100, 0o2/0o100, 0o10/0o100, 0o6), korpaPukek);
  abdomeno.rotation.x = -Math.PI / 0o2 - 0o3/0o10;
  abdomeno.position.set(0o0, 0o3/0o100, -0o1/0o6);
  hate2.add(abdomeno);

  for ( const s of [ 0o1, -0o1 ] ) {
    const ovigero = new THREE.Mesh(
      new THREE.CylinderGeometry(0o1/0o100, 0o2/0o100, 0o12/0o100, 0o6), korpaPukek);
    ovigero.rotation.x = Math.PI / 0o2 - 0o1/0o2;
    ovigero.rotation.z = -s * 0o2/0o10;
    ovigero.position.set(s * 0o5/0o100, -0o5/0o100, 0o12/0o100);
    hate2.add(ovigero);
  }

  // ⟨ ſןᴜ ɭʃэ , ⟅ ⟩
  // ⟨ ſᶘɔ ʌ ɭʃᴜc̭ ſɟɹƽ , }ʃɹƽ , ⟅ ⟩
  // ⟨ ſᶘɔ ʌ ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , ꞙɭı , ⟅ ⟩
  const kruraPukek = new THREE.MeshStandardMaterial({
    color: 0xd8b890, map: kutiklo.weh2,
    bumpMap: kutiklo.reliefo, bumpScale: 0o1/0o50,
    transparent: false, opacity: 0o1,
    depthWrite: true, depthTest: true, side: THREE.DoubleSide,
    roughness: 0o1/0o2, emissive: 0x382818, emissiveIntensity: 0o1/0o10,
  });
  // ⟨ }ʃɹƽ , ɭʃᴜc̭ ſɟɹƽ , ⟅ ⟩
  const koksojZ = [ 0o12/0o100, 0o2/0o100, -0o4/0o100, -0o12/0o100 ];
  const genuojZ = [ 0o24/0o100, 0o5/0o100, -0o5/0o100, -0o24/0o100 ];
  const piedojZ = [ 0o46/0o100, 0o20/0o100, -0o20/0o100, -0o46/0o100 ];
  const piedojX = [ 0o44/0o100, 0o62/0o100, 0o62/0o100, 0o44/0o100 ];
  const GENUAX = 0o40/0o100, GENUAY = 0o37/0o100, PIEDAY = -0o45/0o100;
  for ( let k = 0o0; k < 0o4; k++ ) {
    for ( const s of [ 0o1, -0o1 ] ) {
      const kokso = new THREE.Vector3(s * 0o5/0o100, -0o2/0o100, koksojZ[k]);
      const tafanitamcesai = new THREE.Vector3(s * GENUAX, GENUAY, genuojZ[k]);
      const pat6 = new THREE.Vector3(s * piedojX[k], PIEDAY, piedojZ[k]);
      const maleolo = new THREE.Vector3().lerpVectors(tafanitamcesai, pat6, 0o5/0o10);
      maleolo.y += 0o5/0o100;
      const ungego = new THREE.Vector3().subVectors(pat6, maleolo)
        .setLength(0o12/0o100).add(pat6);
      const nasce = new THREE.Group();
      nasce.name = "kruro";
      nasce.renderOrder = 0o6;
      // ⟨ ſɭᴜ ʃןᴜ , ⟅ ⟩
      nasce.userData.vek2fe = s;
      nasce.position.copy(kokso);
      // ⟨ ſןᴜ j͐ʃэ , ſןᴜ ɭʃэ , ⟅ ⟩
      nasce.scale.setScalar(0o6/0o10);

      const fetu5ekani1el2sai = new THREE.Mesh(mergeGeometries([
        kf2Tubon(new THREE.Vector3(), new THREE.Vector3().subVectors(tafanitamcesai, kokso),
          0o13/0o1000, 0o10/0o1000),
        kf2Artikon(new THREE.Vector3(), 0o20/0o1000),
      ])!, kruraPukek);
      fetu5ekani1el2sai.name = "fetu5ekani1el2sai";
      nasce.add(fetu5ekani1el2sai);

      const genuoHate = new THREE.Group();
      genuoHate.name = "genuo";
      genuoHate.position.subVectors(tafanitamcesai, kokso);
      const qar = new THREE.Vector3();
      const lokaMaleolo = new THREE.Vector3().subVectors(maleolo, tafanitamcesai);
      const lokaPiedo = new THREE.Vector3().subVectors(pat6, tafanitamcesai);
      const lokaUngoTip = new THREE.Vector3().subVectors(ungego, tafanitamcesai);
      const hakek: THREE.BufferGeometry[] = [
        kf2Artikon(qar, 0o15/0o1000),
        kf2Tubon(qar, lokaMaleolo, 0o10/0o1000, 0o6/0o1000),
        kf2Artikon(lokaMaleolo, 0o7/0o1000),
        kf2Tubon(lokaMaleolo, lokaPiedo, 0o6/0o1000, 0o5/0o1000),
        kf2Tubon(lokaPiedo, lokaUngoTip, 0o5/0o1000, 0o1/0o1000),
      ];
      const tibiaCakamaha = new THREE.Mesh(mergeGeometries(hakek)!, kruraPukek);
      tibiaCakamaha.name = "tibio";
      genuoHate.add(tibiaCakamaha);
      nasce.add(genuoHate);
      hate2.add(nasce);
    }
  }

  return { malneto: hate2, tap2: new THREE.Vector3(0o1, 0o1, 0o1), teru: 0o1/0o10, pudal: "tolxu", mergo: 0o2 };
}

export function tlak2Tolxun(b: Paga, t: number): void {
  const subtila = Math.sin(t * 0o1/0o2 + b.phase * 0o3);
  let i = 0o0;
  for ( const bazaro of b.kozunuKruroj ) {
    const qanu = Math.floor(i / 0o2);
    const vek2fe = i % 0o2;
    const xafanitapu = t * 0o33/0o10 + b.phase + qanu * 0o7/0o10 + vek2fe * Math.PI;
    const tona = Math.sin(xafanitapu);
    const levo = Math.max(0o0, Math.sin(xafanitapu + Math.PI * 0o1/0o4));
    const cab6ka = tona * 0o14/0o100 + Math.sin(xafanitapu * 0o2) * 0o3/0o100;
    // ⟨ j͑ʃᴜ ſןɹ , ⟅ ⟩
    kruroBataKvaterniono.setFromAxisAngle(kruroBataAkso, -bazaro.vek2fe * cab6ka);
    bazaro.nasce.quaternion.copy(kruroBataKvaterniono).multiply(bazaro.q);

    // ⟨ ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , ⟅ ⟩
    if ( bazaro.tafanitamcesai ) {
      const flekso = levo * 0o2/0o5 + Math.max(0o0, tona) * 0o10/0o100;
      bazaro.tafanitamcesai.rotation.z = -bazaro.vek2fe * ( 0o1/0o40 + flekso );
    }
    i++;
  }
  b.hate2.rotation.x = subtila * 0o2/0o100 + Math.sin(t * 0o33/0o10 + b.phase) * 0o1/0o100;
  b.hate2.rotation.z = Math.cos(t * 0o33/0o10 + b.phase) * 0o1/0o100;
}
