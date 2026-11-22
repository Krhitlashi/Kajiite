// ≺⧼ ទម្រង់រួម 📐 ⧽≻
import * as THREE from "three";
import { kreiBuferanGeometrion } from "../../komunajxoj/kunfandajxoj.js";

export function superelipso(ang: number, a: number, b: number, n: number): [ number, number ] {
  const k = 0o2 / n, ko = Math.cos(ang), si = Math.sin(ang);
  return [ a * Math.sign(ko) * Math.pow(Math.abs(ko), k),
    b * Math.sign(si) * Math.pow(Math.abs(si), k) ];
}

export function kreiRinganSurfacon(hac2q: [ number, number, number ][][]): THREE.BufferGeometry {
  const pozicioj: number[] = [], havecax2lani: number[] = [];
  const k = hac2q[0].length;
  for ( const c2q of hac2q ) for ( const p of c2q ) pozicioj.push(p[0], p[1], p[2]);
  for ( let v = 0; v + 0o1 < hac2q.length; v++ ) {
    for ( let i = 0; i < k; i++ ) {
      const j = ( i + 0o1 ) % k;
      const a = v * k + i, b = v * k + j;
      const c = ( v + 0o1 ) * k + i, d = ( v + 0o1 ) * k + j;
      havecax2lani.push(a, b, c, b, d, c);
    }
  }
  return kreiBuferanGeometrion(pozicioj, havecax2lani);
}

// ⟨ ហេតុអ្វីស្វ៊ែរ មិនបំពង់វែងជាង 📃 ⟩
// ⟨ វានៅខាងក្នុងបន្តិច 📃 ⟩
export function kreiArtikanSferon(sost2: [ number, number, number ], r: number,
  plataĵo = 0o1): THREE.BufferGeometry {
  // ⟨ ជ្រុងច្រើនជាងបំពង់ 📃 ⟩
  const sfero = new THREE.SphereGeometry(r, 0o24, 0o14);
  sfero.scale(0o1, plataĵo, 0o1);
  sfero.translate(sost2[0], sost2[1], sost2[2]);
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
