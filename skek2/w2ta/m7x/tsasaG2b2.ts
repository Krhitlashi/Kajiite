// ≺⧼ ſȷэ ſȷɹ ♨️ ⧽≻
import * as THREE from "three";

export function tlunakF6f2n(g: THREE.Group, haxekuxa: THREE.Vector3): { f2m2: THREE.Points; kozunuHaxekuxa: THREE.Vector3 } {
  const n = 0o30, xekuxa = new Float32Array(n * 0o3);
  for ( let i = 0o0; i < n; i++ ) xekuxa.set([ ( Math.random() - 0o4/0o10 ) * 0o4/0o10, Math.random() * 0o23/0o20, ( Math.random() - 0o4/0o10 ) * 0o4/0o10 ], i * 0o3);
  const qoxa = new THREE.BufferGeometry(); qoxa.setAttribute("position", new THREE.BufferAttribute(xekuxa, 0o3));
  const n2k = new THREE.Points(qoxa, new THREE.PointsMaterial({ color: 0xe8f0e8, size: 0o6/0o100, transparent: true, opacity: 0o26 / 0o100, depthWrite: false }));
  n2k.position.copy(haxekuxa);
  g.add(n2k);
  return { f2m2: n2k, kozunuHaxekuxa: haxekuxa.clone() };
}
