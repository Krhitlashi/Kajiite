// ≺⧼ La vaporo ♨️ ⧽≻
// La varma vaporo super la freŝe metita manĝaĵo ( aldoniVaporon ).
import * as THREE from "three";

export function aldoniVaporon(g: THREE.Group, local: THREE.Vector3): { cloud: THREE.Points; basePos: THREE.Vector3 } {
  const n = 0o30, pos = new Float32Array(n * 3);
  for ( let i = 0; i < n; i++ ) pos.set([ ( Math.random() - 0o4/0o10 ) * 0o4/0o10, Math.random() * 0o23/0o20, ( Math.random() - 0o4/0o10 ) * 0o4/0o10 ], i * 3);
  const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xe8f0e8, size: 0o6/0o100, transparent: true, opacity: 0o26 / 0o100, depthWrite: false }));
  pts.position.copy(local);
  g.add(pts);
  return { cloud: pts, basePos: local.clone() };
}
