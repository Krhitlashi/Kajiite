// ≺⧼ ស្លឹកស្មៅ 🌿 ⧽≻
import * as THREE from "three";

// ⟨ ហេតុអ្វីមិនក្រដាសកាតុង 📃 ⟩
export function kreiHerbanKlingon(longo: number, largho: number, klino: number,
  arko: number, tordo: number, koloro: THREE.Color, segmentoj = 0o4,
  pintPotenco = 0o7/0o10, foliaProfilo = false): THREE.BufferGeometry {
  const SEGMENTOJ = segmentoj;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const koloroj: number[] = [];
  const indeksoj: number[] = [];
  for ( let i = 0; i <= SEGMENTOJ; i++ ) {
    const t = i / SEGMENTOJ;
    const cx = klino * t * t;
    const cz = arko * t * t;
    // ⟨ ចុង 📃 ⟩
    // ⟨ ប្រវែងកាត់ស្លឹក 📃 ⟩
    const profilo = foliaProfilo
      ? ( t < 0o3/0o10
        ? 0o44/0o100 + 0o34/0o100 * ( t / ( 0o3/0o10 ) )
        : Math.pow(1 - ( t - 0o3/0o10 ) / ( 0o7/0o10 ), pintPotenco) )
      : Math.pow(1 - t, pintPotenco);
    const duonLarĝo = largho * 0o1/0o2 * profilo;
    const kresto = duonLarĝo * 0.9 + largho * 0.12;
    const ang = tordo * t;
    const cos = Math.cos(ang), sin = Math.sin(ang);
    const kolonoj: [ number, number ][] = [
      [ -duonLarĝo, 0 ], [ 0, kresto ], [ duonLarĝo, 0 ] ];
    for ( let kol = 0; kol < 0o3; kol++ ) {
      const dx = kolonoj[kol][0], dz = kolonoj[kol][1];
      pozicioj.push(cx + dx * cos - dz * sin, longo * t, cz + dx * sin + dz * cos);
      uvoj.push(kol === 0 ? 0 : ( kol === 1 ? 0o1/0o2 : 1 ), t);
      koloroj.push(koloro.r, koloro.g, koloro.b);
    }
  }
  for ( let i = 0; i < SEGMENTOJ; i++ ) {
    for ( let kol = 0; kol < 0o2; kol++ ) {
      const a = i * 0o3 + kol, b = a + 1, c = a + 0o3, d = a + 0o4;
      indeksoj.push(a, c, b, b, c, d);
    }
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
  geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 2));
  geometrio.setAttribute("color", new THREE.Float32BufferAttribute(koloroj, 3));
  geometrio.setIndex(indeksoj);
  geometrio.computeVertexNormals();
  return geometrio;
}
