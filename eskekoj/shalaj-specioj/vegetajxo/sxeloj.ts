// ≺⧼ សំបក 🐚 ⧽≻
import * as THREE from "three";
import { kreiPurpuranSxelanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-sxelo.js";
import { kreiPurpuranSxelanBumpanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-sxelo-bumpo.js";
import { kunfandiDuGeometriojn } from "../../komunajxoj/kunfandajxoj.js";

// ⟨ កន្លែងស្លឹកចេញ 📃 ⟩
export function konstruiSxelanRingon(): THREE.BufferGeometry {
  const geometrio = new THREE.CylinderGeometry(0o16/0o40, 0o13/0o40, 1, 0o32, 0o6, true).translate(0, 0o1/0o2, 0);
  const pozicioj = geometrio.attributes.position;
  for ( let i = 0; i < pozicioj.count; i++ ) {
    const x = pozicioj.getX(i);
    const y = pozicioj.getY(i);
    const z = pozicioj.getZ(i);
    const ang = Math.atan2(x, z);
    const lobo = Math.pow(( Math.cos(4 * ang) + 1 ) / 2, 2);
    // ⟨ មូលដ្ឋានស្លឹក 📃 ⟩
    const baza = Math.pow(1 - y, 3);
    const faktoro = 1 + 0o1/0o10 * y * y + 0o1/0o20 * baza;
    const novaY = y + 2/5 * lobo * y - 0o45/0o100 * lobo * baza;
    pozicioj.setXYZ(i, x * faktoro, novaY, z * faktoro);
  }
  geometrio.computeVertexNormals();
  return geometrio;
}

// ⟨ ការធ្វើពែងម្តងទៀត 📃 ⟩
// ⟨ ធ្វើម្តងទៀតប៉ុន្មាន 📃 ⟩
// ⟨ ខ្សែកអាវ 📃 ⟩
export function kreiSxelanRinganMaterialon(ripetoY: number, taso: boolean,
  offsetY = 0): THREE.MeshStandardMaterial {
  const mapo = kreiPurpuranSxelanTeksajxon();
  const reliefo = kreiPurpuranSxelanBumpanTeksajxon();
  const uzi = ( t: THREE.Texture ): THREE.Texture => {
    if ( ripetoY === 1 ) return t;
    const klono = t.clone() as THREE.Texture;
    klono.repeat.set(1, ripetoY);
    klono.offset.set(0, offsetY);
    klono.needsUpdate = true;
    return klono;
  };
  // ⟨ ចម្លាក់ធ្លាក់ចុះ 📃 ⟩
  // ⟨ រង្វង់ថយចុះ 📃 ⟩
  return new THREE.MeshStandardMaterial({
    map: uzi(mapo), bumpMap: uzi(reliefo), bumpScale: 0o1/0o50, color: 0xffffff,
    roughness: taso ? 0o63/0o100 : 0o53/0o100,
    side: taso ? THREE.DoubleSide : THREE.FrontSide,
  });
}

// ⟨ ចុងដើម 📃 ⟩
const TRUNKOPINTA_KOMENCO = 0.88;
export function trunkopintaProfilon(t: number): number {
  if ( t <= TRUNKOPINTA_KOMENCO ) return 1;
  const u = Math.min(1, ( t - TRUNKOPINTA_KOMENCO ) / ( 1 - TRUNKOPINTA_KOMENCO ));
  return Math.sqrt(Math.max(0, 1 - u * u));
}

export function konstruiKurbanLaktukanFolion(kurbeco = 2, largxeco = 6/5, dikeco = 0o3/0o40): THREE.BufferGeometry {
  const longo = 0o5/0o2;
  const segmentoj = 0o14;
  const largxoj = 7;
  const geometrio = new THREE.PlaneGeometry(largxeco, longo, largxoj, segmentoj);
  const pozicioj = geometrio.attributes.position;
  const vicoj = segmentoj + 1;
  const paso = longo / segmentoj;
  const vicoY = new Float32Array(vicoj);
  const vicoZ = new Float32Array(vicoj);
  const suboj = 0o10;
  for ( let j = 1; j < vicoj; j++ ) {
    const s0 = ( j - 1 ) * paso;
    const s1 = j * paso;
    let dy = 0, dz = 0;
    for ( let k = 1; k <= suboj; k++ ) {
      const u = s0 + ( s1 - s0 ) * ( k - 0o1/0o2 ) / suboj;
      const angulo = Math.pow(u / longo, 2) * kurbeco;
      dy += Math.cos(angulo) * paso / suboj;
      dz += Math.sin(angulo) * paso / suboj;
    }
    vicoY[j] = vicoY[j - 1] + dy;
    vicoZ[j] = vicoZ[j - 1] + dz;
  }
  for ( let i = 0; i < pozicioj.count; i++ ) {
    const x = pozicioj.getX(i);
    const y = pozicioj.getY(i);
    const j = Math.round(( ( y + longo / 2 ) / longo ) * segmentoj);
    const t = j / segmentoj;
    const profilo = Math.sin(Math.PI * t) + 0o1/0o10 * Math.pow(1 - t, 4);
    const novaX = x * profilo;
    pozicioj.setXYZ(i, novaX, vicoY[j], vicoZ[j]);
  }
    geometrio.computeVertexNormals();
    const dorso = geometrio.clone();
    const normoj = geometrio.attributes.normal;
    const dorsoNormoj = dorso.attributes.normal;
    const frontoPozicioj = geometrio.attributes.position;
    const dorsoPozicioj = dorso.attributes.position;
    for ( let i = 0; i < frontoPozicioj.count; i++ ) {
      const nx = normoj.getX(i) * dikeco / 2;
      const ny = normoj.getY(i) * dikeco / 2;
      const nz = normoj.getZ(i) * dikeco / 2;
      frontoPozicioj.setXYZ(i, frontoPozicioj.getX(i) + nx, frontoPozicioj.getY(i) + ny, frontoPozicioj.getZ(i) + nz);
      dorsoPozicioj.setXYZ(i, dorsoPozicioj.getX(i) - nx, dorsoPozicioj.getY(i) - ny, dorsoPozicioj.getZ(i) - nz);
      dorsoNormoj.setXYZ(i, -normoj.getX(i), -normoj.getY(i), -normoj.getZ(i));
    }
    return kunfandiDuGeometriojn(geometrio, dorso);
  }
