// ≺⧼ អណ្តាតភ្លើង 🔥 ⧽≻
import * as THREE from "three";
// ⟨ ស្រមោលអណ្តាតភ្លើង 📃 ⟩
const FLAMA_PROFILO: [ number, number ][] = [
  [ 0o0/0o10, 0o0/0o10 ],
  [ 0o23/0o100, 0o0/0o10 ],
  [ 0o7/0o20, 0o1/0o20 ],
  [ 0o4/0o10, 0o5/0o40 ],
  [ 0o37/0o100, 0o21/0o100 ],
  [ 0o7/0o20, 0o3/0o10 ],
  [ 0o27/0o100, 0o4/0o10 ],
  [ 0o21/0o100, 0o5/0o10 ],
  [ 0o3/0o20, 0o57/0o100 ],
  [ 0o1/0o10, 0o15/0o20 ],
  [ 0o1/0o20, 0o35/0o40 ],
  [ 0o1/0o40, 0o75/0o100 ],
  [ 0o0/0o10, 0o10/0o10 ],
];

export const LANGA_ALTO = 0o14/0o100;

// ⟨ កម្ពស់ចាន 📃 ⟩
export const BOVLA_ALTO = 0o15/0o100;

export function kreiFlamanGeometrion( alto: number, largho: number, ml: number,
  semo: number ): THREE.BufferGeometry {
  const punktoj = FLAMA_PROFILO.map(( [ r, y ] ) =>
    new THREE.Vector2(r * largho / 2, ( y - 0o1/0o2 ) * alto));
  const geometrio = new THREE.LatheGeometry(punktoj, 0o20);
  const pozicioj = geometrio.attributes.position;
  for ( let i = 0; i < pozicioj.count; i++ ) {
    const x = pozicioj.getX(i), y = pozicioj.getY(i), z = pozicioj.getZ(i);
    const t = y / alto + 0o1/0o2;
    const angulo = Math.atan2(z, x);
    const r = Math.hypot(x, z);
    const riplo = 1 + ( 0o3/0o100 + 0o10/0o100 * t )
      * Math.sin(4 * angulo + t * 0o7 + semo);
    const klino = ml * 0o7/0o100 * alto * t * t * t;
    pozicioj.setXYZ(i, r * riplo * Math.cos(angulo) + klino,
      y + riplo * 0o2/0o100 * alto * Math.sin(t * 0o5 + angulo * 2),
      r * riplo * Math.sin(angulo) + klino * 0o7/0o10);
  }
  geometrio.computeVertexNormals();
  return geometrio;
}
