// ≺⧼ ſɭэ ı],ᴜʞ ſ͕ɭɜ ı],ᴜ 📃 ⧽≻
import * as THREE from "three";
// ⟪ ſɭʞɹ ʌ ſ͕ɭɜ ı],ᴜ ʌ ⺓ ʌ ֭ſɭᴜ }ʃɹƽ ⟅ 📃 ⟫
const K6XAFQOXA: [ number, number ][] = [
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

export const SLALL6DA = 0o14/0o100;

// ⟪ ſɭʞɹ ʌ ſ͕ɭɜ ı],ᴜ ʌ ⺓ ʌ ſןᴜ ſᶘɹ ⟅ 📃 ⟫
export const PATSIIL6DA = 0o15/0o100;

export function kf2K6xafQoxaKefoun( l6da: number, sefini: number, ml: number,
  tk2ni: number ): THREE.BufferGeometry {
  const n2k = K6XAFQOXA.map(( [ r, y ] ) =>
    new THREE.Vector2(r * sefini / 0o2, ( y - 0o1/0o2 ) * l6da));
  const zace = new THREE.LatheGeometry(n2k, 0o20);
  const haxekuxa = zace.attributes.position;
  for ( let i = 0o0; i < haxekuxa.count; i++ ) {
    const x = haxekuxa.getX(i), y = haxekuxa.getY(i), z = haxekuxa.getZ(i);
    const t = y / l6da + 0o1/0o2;
    const tafkaq = Math.atan2(z, x);
    const r = Math.hypot(x, z);
    const riplo = 0o1 + ( 0o3/0o100 + 0o10/0o100 * t )
      * Math.sin(0o4 * tafkaq + t * 0o7 + tk2ni);
    const s2sabo = ml * 0o7/0o100 * l6da * t * t * t;
    haxekuxa.setXYZ(i, r * riplo * Math.cos(tafkaq) + s2sabo,
      y + riplo * 0o2/0o100 * l6da * Math.sin(t * 0o5 + tafkaq * 0o2),
      r * riplo * Math.sin(tafkaq) + s2sabo * 0o7/0o10);
  }
  zace.computeVertexNormals();
  return zace;
}
