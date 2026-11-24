// ≺⧼ j͑ʃɹ ſɟɔ j͐ʃɹ 🐚 ⧽≻
import * as THREE from "three";
import { kf2AsfanS2cel2nCac2sex } from "../../komunajxoj/cac2sex/asfa-s2cel2.js";
import { kf2AsfanS2cel2nBumpanCac2sex } from "../../komunajxoj/cac2sex/asfa-s2cel2-bumpo.js";
import { kunfandiDuGeometriojn } from "../../komunajxoj/kunfandajxoj.js";

// ⟨ ſɭᴜ ı],ƨɔ , j͑ʃͷ̗ᴜʞ , ſɭэ ɭʃᴜ , ⟅ ⟩
export function vepaqS2cel2nRingon(): THREE.BufferGeometry {
  const geometrio = new THREE.CylinderGeometry(0o16/0o40, 0o13/0o40, 1, 0o32, 0o6, true).translate(0, 0o1/0o2, 0);
  const haxekuxa = geometrio.attributes.position;
  for ( let i = 0; i < haxekuxa.count; i++ ) {
    const x = haxekuxa.getX(i);
    const y = haxekuxa.getY(i);
    const z = haxekuxa.getZ(i);
    const ang = Math.atan2(x, z);
    const lobo = Math.pow(( Math.cos(4 * ang) + 1 ) / 2, 2);
    // ⟨ ſɭɜ ſɭ,w }ʃw , j͑ʃͷ̗ᴜʞ , ⟅ ⟩
    const baza = Math.pow(1 - y, 3);
    const faktoro = 1 + 0o1/0o10 * y * y + 0o1/0o20 * baza;
    const sef4Y = y + 2/5 * lobo * y - 0o45/0o100 * lobo * baza;
    haxekuxa.setXYZ(i, x * faktoro, sef4Y, z * faktoro);
  }
  geometrio.computeVertexNormals();
  return geometrio;
}

// ⟨ ſɟᴜ ı],ɔ ŋᷠᴜ , ꞙɭı , ⟅ ⟩
// ⟨ ſɟᴜ ı],ɔ ŋᷠᴜ , ꞙɭɿ , ꞙɭı ⟅ ⟩
// ⟨ j͑ʃᴜ ֭ſɭᴜƽ ɭʃɔ , ꞙɭı , ⟅ ⟩
export function kf2S2cel2nRinganMaterialon(ripetoY: number, taso: boolean,
  offsetY = 0): THREE.MeshStandardMaterial {
  const mapo = kf2AsfanS2cel2nCac2sex();
  const reliefo = kf2AsfanS2cel2nBumpanCac2sex();
  const uzi = ( t: THREE.Texture ): THREE.Texture => {
    if ( ripetoY === 1 ) return t;
    const klono = t.clone() as THREE.Texture;
    klono.repeat.set(1, ripetoY);
    klono.offset.set(0, offsetY);
    return klono;
  };
  // ⟨ ſ͕ɭɜ ı],ᴜ , j͑ʃɜ ſ̀ȷᴜ ſɭᴜƽ , ⟅ ⟩
  // ⟨ ɭʃɹ ſ͕ɭɹ , j͑ʃɜ ſ̀ȷᴜ ſɭᴜƽ , ⟅ ⟩
  return new THREE.MeshStandardMaterial({
    map: uzi(mapo), bumpMap: uzi(reliefo), bumpScale: 0o1/0o50, color: 0xffffff,
    roughness: taso ? 0o63/0o100 : 0o53/0o100,
    side: taso ? THREE.DoubleSide : THREE.FrontSide,
  });
}

// ⟨ ɭʃɜ ſɭɹȝ , j͑ʃɜ j͐ʃɹ , ⟅ ⟩
const TRUNKOPINTA_KOMENCO = 0o7/0o10;
export function sost2cel2saipintaProfilon(t: number): number {
  if ( t <= TRUNKOPINTA_KOMENCO ) return 1;
  const u = Math.min(1, ( t - TRUNKOPINTA_KOMENCO ) / ( 1 - TRUNKOPINTA_KOMENCO ));
  return Math.sqrt(Math.max(0, 1 - u * u));
}

export function vepaqKkaxtenLaktukanSlafn(kurbeco = 2, largxeco = 6/5, dikeco = 0o3/0o40): THREE.BufferGeometry {
  const sahakani = 0o5/0o2;
  const has2nasce = 0o14;
  const largxoj = 7;
  const geometrio = new THREE.PlaneGeometry(largxeco, sahakani, largxoj, has2nasce);
  const haxekuxa = geometrio.attributes.position;
  const hax2pa = has2nasce + 1;
  const vepat6ni = sahakani / has2nasce;
  const x2paY = new Float32Array(hax2pa);
  const x2paZ = new Float32Array(hax2pa);
  const suboj = 0o10;
  for ( let j = 1; j < hax2pa; j++ ) {
    const s0 = ( j - 1 ) * vepat6ni;
    const s1 = j * vepat6ni;
    let dy = 0, dz = 0;
    for ( let k = 1; k <= suboj; k++ ) {
      const u = s0 + ( s1 - s0 ) * ( k - 0o1/0o2 ) / suboj;
      const tafkaq = Math.pow(u / sahakani, 2) * kurbeco;
      dy += Math.cos(tafkaq) * vepat6ni / suboj;
      dz += Math.sin(tafkaq) * vepat6ni / suboj;
    }
    x2paY[j] = x2paY[j - 1] + dy;
    x2paZ[j] = x2paZ[j - 1] + dz;
  }
  for ( let i = 0; i < haxekuxa.count; i++ ) {
    const x = haxekuxa.getX(i);
    const y = haxekuxa.getY(i);
    const j = Math.round(( ( y + sahakani / 2 ) / sahakani ) * has2nasce);
    const t = j / has2nasce;
    const s2qena = Math.sin(Math.PI * t) + 0o1/0o10 * Math.pow(1 - t, 4);
    const sef4X = x * s2qena;
    haxekuxa.setXYZ(i, sef4X, x2paY[j], x2paZ[j]);
  }
    geometrio.computeVertexNormals();
    const dorso = geometrio.clone();
    const normoj = geometrio.attributes.normal;
    const dorsoNormoj = dorso.attributes.normal;
    const frontoHaxekuxa = geometrio.attributes.position;
    const dorsoHaxekuxa = dorso.attributes.position;
    for ( let i = 0; i < frontoHaxekuxa.count; i++ ) {
      const nx = normoj.getX(i) * dikeco / 2;
      const ny = normoj.getY(i) * dikeco / 2;
      const nz = normoj.getZ(i) * dikeco / 2;
      frontoHaxekuxa.setXYZ(i, frontoHaxekuxa.getX(i) + nx, frontoHaxekuxa.getY(i) + ny, frontoHaxekuxa.getZ(i) + nz);
      dorsoHaxekuxa.setXYZ(i, dorsoHaxekuxa.getX(i) - nx, dorsoHaxekuxa.getY(i) - ny, dorsoHaxekuxa.getZ(i) - nz);
      dorsoNormoj.setXYZ(i, -normoj.getX(i), -normoj.getY(i), -normoj.getZ(i));
    }
    return kunfandiDuGeometriojn(geometrio, dorso);
  }
