// ≺⧼ ដើមឈើ 🌳 ⧽≻
import * as THREE from "three";

// ⟨ ហេតុអ្វី 📃 ⟩
export function kreiTrunkanGeometrion(larghoBazo: number, larghoSupro: number,
  larghoRadiko: number, segmentoj = 0o11): THREE.BufferGeometry {
  const profilo: THREE.Vector2[] = [
    new THREE.Vector2(0, -0o1/0o2),
    new THREE.Vector2(larghoRadiko, -0o1/0o2),
    new THREE.Vector2(larghoRadiko * 0o57/0o100, -0o17/0o40),
    new THREE.Vector2(larghoBazo * 0o111/0o100, -0o7/0o20),
    new THREE.Vector2(larghoBazo, -0o27/0o100),
    new THREE.Vector2(larghoBazo * 0o63/0o100 + larghoSupro * 0o15/0o100, -0o3/0o40),
    new THREE.Vector2(larghoBazo * 0o4/0o10 + larghoSupro * 0o4/0o10, 0o15/0o100),
    new THREE.Vector2(larghoBazo * 0o7/0o40 + larghoSupro * 0o31/0o40, 0o33/0o100),
    new THREE.Vector2(larghoSupro, 0o37/0o100),
    new THREE.Vector2(larghoSupro * 0o1/0o2, 0o1/0o2),
    new THREE.Vector2(0, 0o1/0o2),
  ];
  const geometrio = new THREE.LatheGeometry(profilo, segmentoj);
  geometrio.computeVertexNormals();
  return geometrio;
}
