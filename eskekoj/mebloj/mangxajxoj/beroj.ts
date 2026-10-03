// ≺⧼ ផ្លែនៃដើមភ្នំ 🫐 ⧽≻
import * as THREE from "three";
import { PUSSXLEFO_BEROJ } from "./datumoj.js";
import type { MangxajxItemo } from "./tipoj.js";
export function kreiPussxlefojnBerojn(g: THREE.Object3D, plantoj: { x: number; h: number; z: number; s: number; plantAlto?: number }[]): MangxajxItemo[] {
  const items: MangxajxItemo[] = [];
  if ( plantoj.length === 0 ) return items;
  const f = PUSSXLEFO_BEROJ[0];
  const beroGeometrio = new THREE.SphereGeometry(1, 0o10, 0o10);
  const kernoGeometrio = new THREE.SphereGeometry(1, 8, 6);
  const beroMaterialo = new THREE.MeshStandardMaterial({
    color: f.col, transparent: true, opacity: 0o45 / 0o100, roughness: 0o15/0o100, depthWrite: false,
  });
  const kernoMaterialo = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0o35/0o100 });
  // ⟨ ប្រវែងកាត់ចុងដើម 📃 ⟩
  const trunkopintaProfilon = ( t: number ): number => {
    if ( t <= 0.88 ) return 1;
    const u = Math.min(1, ( t - 0.88 ) / 0.12);
    return Math.sqrt(Math.max(0, 1 - u * u));
  };
  for ( const p of plantoj ) {
    if ( Math.random() > 0o55/0o100 ) continue;
    const klastro = new THREE.Group();
    // ⟨ ពែង 📃 ⟩
    const plantAlto = p.plantAlto ?? ( 0o5/0o10 + p.s * 0o3/0o10 ) * 0o17/0o20;
    const unuaTavolaY = plantAlto * 0o3/0o10;
    const sxelaAlto = plantAlto * 0o2/0o10;
    const trunkoR = ( 0o5/0o40 - ( unuaTavolaY / plantAlto ) * 0o2/0o40 )
      * trunkopintaProfilon(unuaTavolaY / plantAlto);
    const ringaSkalo = Math.max(0o3/0o40, trunkoR / ( 0o13/0o40 ) * 0o11/0o10);
    const tasoFundo = p.h + unuaTavolaY - sxelaAlto * 0o14/0o40;
    const internaR = ringaSkalo * 0o2/0o10;
    const n = 3 + ( ( Math.random() * 3 ) | 0 );
    const turno = Math.random() * Math.PI * 2;
    const skalo = 0o2/0o100 + Math.random() * 0o2/0o100;
    const dy = sxelaAlto * ( 0o2/0o10 + Math.random() * 0o3/0o10 );
    for ( let i = 0; i < n; i++ ) {
      const ang = turno + i / n * Math.PI * 2;
      const lokalo = new THREE.Vector3(Math.cos(ang) * internaR, dy, Math.sin(ang) * internaR);
      const bero = new THREE.Mesh(beroGeometrio, beroMaterialo);
      bero.position.copy(lokalo);
      bero.scale.setScalar(skalo);
      const kerno = new THREE.Mesh(kernoGeometrio, kernoMaterialo);
      kerno.position.copy(lokalo);
      kerno.scale.setScalar(skalo * 0o3/0o10);
      klastro.add(bero, kerno);
    }
    klastro.position.set(p.x, tasoFundo, p.z);
    g.add(klastro);
    items.push({ mesh: klastro, key: f.key, f, pos: new THREE.Vector3(p.x, tasoFundo, p.z), dead: false });
  }
  return items;
}
