// ≺⧼ ដើមឈើ 🌳 ⧽≻
import * as THREE from "three";

// ⟨ ហេតុអ្វី 📃 ⟩
export function kreiTrunkanGeometrion(larghoBazo: number, larghoSupro: number,
  larghoRadiko: number, segmentoj = 0o11): THREE.BufferGeometry {
  const profilo: THREE.Vector2[] = [
    new THREE.Vector2(0, -0o1/0o2),
    new THREE.Vector2(larghoRadiko, -0o1/0o2),
    new THREE.Vector2(larghoRadiko * 0.74, -0.465),
    new THREE.Vector2(larghoBazo * 1.14, -0.43),
    new THREE.Vector2(larghoBazo, -0.36),
    new THREE.Vector2(larghoBazo * 0.80 + larghoSupro * 0.20, -0.10),
    new THREE.Vector2(larghoBazo * 0.50 + larghoSupro * 0.50, 0.20),
    new THREE.Vector2(larghoBazo * 0.22 + larghoSupro * 0.78, 0.42),
    new THREE.Vector2(larghoSupro, 0.48),
    new THREE.Vector2(larghoSupro * 0o1/0o2, 0o1/0o2),
    new THREE.Vector2(0, 0o1/0o2),
  ];
  const geometrio = new THREE.LatheGeometry(profilo, segmentoj);
  geometrio.computeVertexNormals();
  return geometrio;
}
