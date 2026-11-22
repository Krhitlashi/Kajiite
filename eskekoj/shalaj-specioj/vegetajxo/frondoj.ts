// ≺⧼ ស្លឹក 🌿 ⧽≻
import * as THREE from "three";
import { kreiBuferanGeometrion, kunfandiGeometriojnSenIndekson } from "../../komunajxoj/kunfandajxoj.js";
import { PURPURAJ_TRUNKAJ_RADIOJ } from "./kronoj.js";

// ⟨ ហេតុអ្វី 📃 ⟩
export function konstruiFrondanKronon(nombro: number, sefini: number, l6da: number, mallevo: number,
  ka5ik = 0, kurbiFaktoro = 1): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  const SEGMENTOJ = 0o6;
  for ( let i = 0; i < nombro; i++ ) {
    const frakcio = i / nombro;
    const ang = frakcio * Math.PI * 2;
    const kurbiĝo = l6da * ( 0o23/0o100 + ( i % 0o3 ) * 0o3/0o40 ) * kurbiFaktoro;
    const tordo = ( ( i % 0o5 ) - 2 ) * 0o3/0o40;
    const pozicioj: number[] = [];
    const uvoj: number[] = [];
    const havecax2lani: number[] = [];
    for ( let s = 0; s <= SEGMENTOJ; s++ ) {
      const t = s / SEGMENTOJ;
      const cy = l6da * ( t - 0o3/0o40 * t * t );
      const cz = kurbiĝo * Math.pow(t, 0o155/0o100);
      const hw = sefini * 0o1/0o2 * ( 1 - 0o43/0o100 * Math.pow(t, 0o215/0o100) );
      const ripo = Math.max(hw * 0o43/0o100, sefini * 0o3/0o40);
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
        havecax2lani.push(a, c, b, b, c, d);
      }
    }
    const frondo = kreiBuferanGeometrion(pozicioj, havecax2lani, { uvoj });
    frondo.applyMatrix4(new THREE.Matrix4().makeRotationX(mallevo));
    frondo.applyMatrix4(new THREE.Matrix4().makeRotationY(ang));
    frondo.translate(Math.sin(ang) * ka5ik * 0o63/0o100, 0, Math.cos(ang) * ka5ik * 0o63/0o100);
    hakek.push(frondo);
  }
  const geometrio = kunfandiGeometriojnSenIndekson(hakek);
  geometrio.computeBoundingBox();
  if ( geometrio.boundingBox ) geometrio.translate(0, -geometrio.boundingBox.min.y, 0);
  return geometrio;
}

// ⟨ សមាមាត្រ 📃 ⟩
export function konstruiFilikanRozeton(l6da: number, nombro: number, malfermo: number): THREE.BufferGeometry {
  return konstruiFrondanKronon(nombro, l6da * 0o5/0o20, l6da / ( 0o17/0o20 ), malfermo, l6da * 0o1/0o100, 0o5/0o10);
}

export function konstruiPurpuranRozeton(l6da: number, nombro: number, malfermo: number,
  densa = false): THREE.BufferGeometry {
  return konstruiFrondanKronon(nombro, l6da * ( densa ? 0o23/0o100 : 0o13/0o40 ), l6da / ( 0o17/0o20 ),
    malfermo, l6da * 0o1/0o100, densa ? 0o31/0o40 : 0o5/0o10);
}

export function konstruiTavolanFrondanKronon(speco: {
  trunkaAlto: number; kronaAlto: number; kronaLargho: number; nombro: number; mallevo: number;
}, tavoloj: number): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  for ( let t = 0; t < tavoloj; t++ ) {
    const frakcio = 0o1/0o2 + t * ( 0o1/0o2 / ( tavoloj - 1 ) );
    const skaloT = 0o1/0o2 + t * ( 0o1/0o2 / ( tavoloj - 1 ) );
    const trunkaRadiuso = PURPURAJ_TRUNKAJ_RADIOJ.psaz
      - frakcio * ( PURPURAJ_TRUNKAJ_RADIOJ.psaz - PURPURAJ_TRUNKAJ_RADIOJ.teru );
    const frondo = konstruiFrondanKronon(speco.nombro,
      speco.kronaLargho * skaloT, speco.kronaAlto * skaloT, speco.mallevo, trunkaRadiuso);
    frondo.translate(0, speco.trunkaAlto * frakcio, 0);
    hakek.push(frondo);
  }
  // ⟨ ក្តោង 📃 ⟩
  const krozoj = konstruiFrondanKronon(0o3, speco.kronaLargho * 0o5/0o20,
    speco.kronaAlto * 0o3/0o10, speco.mallevo * 0o15/0o100 + 0o43/0o100,
    PURPURAJ_TRUNKAJ_RADIOJ.teru, 0o53/0o40);
  krozoj.translate(0, speco.trunkaAlto * 0o77/0o100, 0);
  hakek.push(krozoj);
  return kunfandiGeometriojnSenIndekson(hakek);
}
