// ≺⧼ ទម្រង់រួម 📐 ⧽≻
import * as THREE from "three";
import { kreiBuferanGeometrion } from "../../komunajxoj/kunfandajxoj.js";

export function superelipso(ang: number, a: number, b: number, n: number): [ number, number ] {
  const k = 0o2 / n, ko = Math.cos(ang), si = Math.sin(ang);
  return [ a * Math.sign(ko) * Math.pow(Math.abs(ko), k),
    b * Math.sign(si) * Math.pow(Math.abs(si), k) ];
}

export function kreiRinganSurfacon(ringoj: [ number, number, number ][][]): THREE.BufferGeometry {
  const pozicioj: number[] = [], indeksoj: number[] = [];
  const k = ringoj[0].length;
  for ( const ringo of ringoj ) for ( const p of ringo ) pozicioj.push(p[0], p[1], p[2]);
  for ( let v = 0; v + 0o1 < ringoj.length; v++ ) {
    for ( let i = 0; i < k; i++ ) {
      const j = ( i + 0o1 ) % k;
      const a = v * k + i, b = v * k + j;
      const c = ( v + 0o1 ) * k + i, d = ( v + 0o1 ) * k + j;
      indeksoj.push(a, b, c, b, d, c);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj);
}

// ⟨ ហេតុអ្វីស្វ៊ែរ មិនបំពង់វែងជាង 📃 ⟩
// ⟨ វានៅខាងក្នុងបន្តិច 📃 ⟩
export function kreiArtikanSferon(centro: [ number, number, number ], r: number,
  plataĵo = 0o1): THREE.BufferGeometry {
  // ⟨ ជ្រុងច្រើនជាងបំពង់ 📃 ⟩
  const sfero = new THREE.SphereGeometry(r, 0o24, 0o14);
  sfero.scale(0o1, plataĵo, 0o1);
  sfero.translate(centro[0], centro[1], centro[2]);
  return sfero;
}

export function remapiUVon(geometrio: THREE.BufferGeometry, v0: number, v1: number)
  : THREE.BufferGeometry {
  const uvo = geometrio.getAttribute("uv");
  if ( !uvo ) return geometrio;
  for ( let i = 0; i < uvo.count; i++ ) {
    uvo.setY(i, v0 + ( v1 - v0 ) * uvo.getY(i));
  }
  uvo.needsUpdate = true;
  return geometrio;
}
