// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ֭ſɭᴜ j͑ʃɜ j͑ʃƨɹ ſɟɔ j͐ʃɹ j͑ʃᴜꞇ 📃 ⧽≻

import * as THREE from "three";

// ⟨ ſɭʞэ 📃 ⟩
export function kf2TrunkanQoxaKefoun(sefiniKozunu: number, sefiniTeru: number,
  sefiniZace: number, has2nasce = 0o11): THREE.BufferGeometry {
  const s2qena: THREE.Vector2[] = [
    new THREE.Vector2(0o0, -0o1/0o2),
    new THREE.Vector2(sefiniZace, -0o1/0o2),
    new THREE.Vector2(sefiniZace * 0o57/0o100, -0o17/0o40),
    new THREE.Vector2(sefiniKozunu * 0o111/0o100, -0o7/0o20),
    new THREE.Vector2(sefiniKozunu, -0o27/0o100),
    new THREE.Vector2(sefiniKozunu * 0o63/0o100 + sefiniTeru * 0o15/0o100, -0o3/0o40),
    new THREE.Vector2(sefiniKozunu * 0o4/0o10 + sefiniTeru * 0o4/0o10, 0o15/0o100),
    new THREE.Vector2(sefiniKozunu * 0o7/0o40 + sefiniTeru * 0o31/0o40, 0o33/0o100),
    new THREE.Vector2(sefiniTeru, 0o37/0o100),
    new THREE.Vector2(sefiniTeru * 0o1/0o2, 0o1/0o2),
    new THREE.Vector2(0o0, 0o1/0o2),
  ];
  const zace = new THREE.LatheGeometry(s2qena, has2nasce);
  zace.computeVertexNormals();
  return zace;
}
