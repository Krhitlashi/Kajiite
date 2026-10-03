// ≺⧼ ស្លឹក 🌿 ⧽≻
import * as THREE from "three";
import { kreiBuferanGeometrion, kunfandiGeometriojnSenIndekson } from "../../komunajxoj/kunfandajxoj.js";
import { PURPURAJ_TRUNKAJ_RADIOJ } from "./kronoj.js";

// ⟨ ហេតុអ្វី 📃 ⟩
export function konstruiFrondanKronon(nombro: number, largho: number, alto: number, mallevo: number,
  radiuso = 0, kurbiFaktoro = 1): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  const SEGMENTOJ = 0o6;
  for ( let i = 0; i < nombro; i++ ) {
    const frakcio = i / nombro;
    const ang = frakcio * Math.PI * 2;
    const kurbiĝo = alto * ( 0.30 + ( i % 0o3 ) * 0.09 ) * kurbiFaktoro;
    const tordo = ( ( i % 0o5 ) - 2 ) * 0.10;
    const pozicioj: number[] = [];
    const uvoj: number[] = [];
    const indeksoj: number[] = [];
    for ( let s = 0; s <= SEGMENTOJ; s++ ) {
      const t = s / SEGMENTOJ;
      const cy = alto * ( t - 0.10 * t * t );
      const cz = kurbiĝo * Math.pow(t, 1.7);
      const hw = largho * 0o1/0o2 * ( 1 - 0.55 * Math.pow(t, 2.2) );
      const ripo = Math.max(hw * 0.55, largho * 0.10);
      const a = tordo * t;
      const cos = Math.cos(a), sin = Math.sin(a);
      const kolonoj: [ number, number ][] = [ [ -hw, 0 ], [ 0, ripo ], [ hw, 0 ] ];
      for ( let kol = 0; kol < 0o3; kol++ ) {
        const dx = kolonoj[kol][0], dz = kolonoj[kol][1];
        pozicioj.push(dx * cos - dz * sin, cy, cz + dx * sin + dz * cos);
        uvoj.push(kol === 0 ? 0 : ( kol === 1 ? 0o1/0o2 : 1 ), t);
      }
    }
    for ( let s = 0; s < SEGMENTOJ; s++ ) {
      for ( let kol = 0; kol < 0o2; kol++ ) {
        const a = s * 0o3 + kol, b = a + 1, c = a + 0o3, d = a + 0o4;
        indeksoj.push(a, c, b, b, c, d);
      }
    }
    const frondo = kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
    frondo.applyMatrix4(new THREE.Matrix4().makeRotationX(mallevo));
    frondo.applyMatrix4(new THREE.Matrix4().makeRotationY(ang));
    frondo.translate(Math.sin(ang) * radiuso * 0.8, 0, Math.cos(ang) * radiuso * 0.8);
    partoj.push(frondo);
  }
  const geometrio = kunfandiGeometriojnSenIndekson(partoj);
  geometrio.computeBoundingBox();
  if ( geometrio.boundingBox ) geometrio.translate(0, -geometrio.boundingBox.min.y, 0);
  return geometrio;
}

// ⟨ សមាមាត្រ 📃 ⟩
export function konstruiFilikanRozeton(alto: number, nombro: number, malfermo: number): THREE.BufferGeometry {
  return konstruiFrondanKronon(nombro, alto * 0.32, alto / 0.93, malfermo, alto * 0.012, 0.62);
}

export function konstruiPurpuranRozeton(alto: number, nombro: number, malfermo: number,
  densa = false): THREE.BufferGeometry {
  return konstruiFrondanKronon(nombro, alto * ( densa ? 0.30 : 0.34 ), alto / 0.93,
    malfermo, alto * 0.012, densa ? 0.78 : 0.62);
}

export function konstruiTavolanFrondanKronon(speco: {
  trunkaAlto: number; kronaAlto: number; kronaLargho: number; nombro: number; mallevo: number;
}, tavoloj: number): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  for ( let t = 0; t < tavoloj; t++ ) {
    const frakcio = 0o1/0o2 + t * ( 0o1/0o2 / ( tavoloj - 1 ) );
    const skaloT = 0o1/0o2 + t * ( 0o1/0o2 / ( tavoloj - 1 ) );
    const trunkaRadiuso = PURPURAJ_TRUNKAJ_RADIOJ.malsupro
      - frakcio * ( PURPURAJ_TRUNKAJ_RADIOJ.malsupro - PURPURAJ_TRUNKAJ_RADIOJ.supro );
    const frondo = konstruiFrondanKronon(speco.nombro,
      speco.kronaLargho * skaloT, speco.kronaAlto * skaloT, speco.mallevo, trunkaRadiuso);
    frondo.translate(0, speco.trunkaAlto * frakcio, 0);
    partoj.push(frondo);
  }
  // ⟨ ក្តោង 📃 ⟩
  const krozoj = konstruiFrondanKronon(0o3, speco.kronaLargho * 0.32,
    speco.kronaAlto * 0.38, speco.mallevo * 0.2 + 0.55,
    PURPURAJ_TRUNKAJ_RADIOJ.supro, 1.35);
  krozoj.translate(0, speco.trunkaAlto * 0.98, 0);
  partoj.push(krozoj);
  return kunfandiGeometriojnSenIndekson(partoj);
}
