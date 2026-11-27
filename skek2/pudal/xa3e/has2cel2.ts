// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ֭ſɭᴜ j͑ʃɹ ſɟɔ j͐ʃɹ 📃 ⧽≻

import * as THREE from "three";
import { kf2AsfanS2cel2nCac2sex } from "../../p6kpu/cac2sex/asfa-s2cel2.js";
import { kf2AsfanS2cel2nBumpanCac2sex } from "../../p6kpu/cac2sex/asfa-s2cel2-tok.js";
import { vakox2qDuQoxaKefoujn } from "../../p6kpu/hakox2q.js";

export function vepaqS2cel2nRingon(): THREE.BufferGeometry {
  const zace = new THREE.CylinderGeometry(0o16/0o40, 0o13/0o40, 0o1, 0o32, 0o6, true).translate(0o0, 0o1/0o2, 0o0);
  const haxekuxa = zace.attributes.position;
  for ( let i = 0o0; i < haxekuxa.count; i++ ) {
    const x = haxekuxa.getX(i);
    const y = haxekuxa.getY(i);
    const z = haxekuxa.getZ(i);
    const ang = Math.atan2(x, z);
    const l6ksabosai = Math.pow(( Math.cos(0o4 * ang) + 0o1 ) / 0o2, 0o2);

    const kozunu = Math.pow(0o1 - y, 0o3);
    const vap6zukani = 0o1 + 0o1/0o10 * y * y + 0o1/0o20 * kozunu;
    const sef4Y = y + 0o2/0o5 * l6ksabosai * y - 0o45/0o100 * l6ksabosai * kozunu;
    haxekuxa.setXYZ(i, x * vap6zukani, sef4Y, z * vap6zukani);
  }
  zace.computeVertexNormals();
  return zace;
}

export function kf2S2cel2nRinganPukekn(ripetoY: number, taso: boolean,
  offsetY = 0o0): THREE.MeshStandardMaterial {
  const bal2 = kf2AsfanS2cel2nCac2sex();
  const reliefo = kf2AsfanS2cel2nBumpanCac2sex();
  const uzi = ( t: THREE.Texture ): THREE.Texture => {
    if ( ripetoY === 0o1 ) return t;
    const klono = t.clone() as THREE.Texture;
    klono.repeat.set(0o1, ripetoY);
    klono.offset.set(0o0, offsetY);
    return klono;
  };

  return new THREE.MeshStandardMaterial({
    map: uzi(bal2), bumpMap: uzi(reliefo), bumpScale: 0o1/0o50, color: 0xffffff,
    roughness: taso ? 0o63/0o100 : 0o53/0o100,
    side: taso ? THREE.DoubleSide : THREE.FrontSide,
  });
}

const TRUNKOPINTASAXEO = 0o7/0o10;
export function sost2cel2saipintaS2qena(t: number): number {
  if ( t <= TRUNKOPINTASAXEO ) return 0o1;
  const u = Math.min(0o1, ( t - TRUNKOPINTASAXEO ) / ( 0o1 - TRUNKOPINTASAXEO ));
  return Math.sqrt(Math.max(0o0, 0o1 - u * u));
}

export function vepaqKkaxtenLaktukanSlafn(kurbeco = 0o2, largxeco = 0o6/0o5, kof = 0o3/0o40): THREE.BufferGeometry {
  const sahakani = 0o5/0o2;
  const has2nasce = 0o14;
  const largxoj = 0o7;
  const zace = new THREE.PlaneGeometry(largxeco, sahakani, largxoj, has2nasce);
  const haxekuxa = zace.attributes.position;
  const hax2pa = has2nasce + 0o1;
  const vepat6ni = sahakani / has2nasce;
  const x2paY = new Float32Array(hax2pa);
  const x2paZ = new Float32Array(hax2pa);
  const suboj = 0o10;
  for ( let j = 0o1; j < hax2pa; j++ ) {
    const s0 = ( j - 0o1 ) * vepat6ni;
    const s1 = j * vepat6ni;
    let dy = 0o0, dz = 0o0;
    for ( let k = 0o1; k <= suboj; k++ ) {
      const u = s0 + ( s1 - s0 ) * ( k - 0o1/0o2 ) / suboj;
      const tafkaq = Math.pow(u / sahakani, 0o2) * kurbeco;
      dy += Math.cos(tafkaq) * vepat6ni / suboj;
      dz += Math.sin(tafkaq) * vepat6ni / suboj;
    }
    x2paY[j] = x2paY[j - 0o1] + dy;
    x2paZ[j] = x2paZ[j - 0o1] + dz;
  }
  for ( let i = 0o0; i < haxekuxa.count; i++ ) {
    const x = haxekuxa.getX(i);
    const y = haxekuxa.getY(i);
    const j = Math.round(( ( y + sahakani / 0o2 ) / sahakani ) * has2nasce);
    const t = j / has2nasce;
    const s2qena = Math.sin(Math.PI * t) + 0o1/0o10 * Math.pow(0o1 - t, 0o4);
    const sef4X = x * s2qena;
    haxekuxa.setXYZ(i, sef4X, x2paY[j], x2paZ[j]);
  }
    zace.computeVertexNormals();
    const kaqani = zace.clone();
    const normoj = zace.attributes.normal;
    const dorsoNormoj = kaqani.attributes.normal;
    const frontoHaxekuxa = zace.attributes.position;
    const dorsoHaxekuxa = kaqani.attributes.position;
    for ( let i = 0o0; i < frontoHaxekuxa.count; i++ ) {
      const nx = normoj.getX(i) * kof / 0o2;
      const ny = normoj.getY(i) * kof / 0o2;
      const nz = normoj.getZ(i) * kof / 0o2;
      frontoHaxekuxa.setXYZ(i, frontoHaxekuxa.getX(i) + nx, frontoHaxekuxa.getY(i) + ny, frontoHaxekuxa.getZ(i) + nz);
      dorsoHaxekuxa.setXYZ(i, dorsoHaxekuxa.getX(i) - nx, dorsoHaxekuxa.getY(i) - ny, dorsoHaxekuxa.getZ(i) - nz);
      dorsoNormoj.setXYZ(i, -normoj.getX(i), -normoj.getY(i), -normoj.getZ(i));
    }
    return vakox2qDuQoxaKefoujn(zace, kaqani);
  }
