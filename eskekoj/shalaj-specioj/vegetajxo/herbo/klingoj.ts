// ≺⧼ ស្លឹកស្មៅ 🌿 ⧽≻
import * as THREE from "three";

export function kreiHerbanKlingon(longo: number, largho: number, klino: number,
  arko: number, tordo: number, koloro: THREE.Color, segmentoj = 0o4,
  pintPotenco = 0o7/0o10): THREE.BufferGeometry {
  const SEGMENTOJ = segmentoj;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const koloroj: number[] = [];
  const indeksoj: number[] = [];
  for ( let i = 0; i <= SEGMENTOJ; i++ ) {
    const t = i / SEGMENTOJ;
    const cx = klino * t * t;
    const cz = arko * t * t;
    const profilo = Math.pow(1 - t, pintPotenco) * ( 0o17/0o20 + t * 0o3/0o10 );
    const duonLarĝo = largho * 0o1/0o2 * profilo;
    const kresto = duonLarĝo * 0o35/0o40 + largho * 0o1/0o10;
    const dikeco = duonLarĝo * 0o3/0o4;
    const ang = tordo * t;
    const cos = Math.cos(ang), sin = Math.sin(ang);
    const sekcioj: [ number, number ][] = [
      [ -duonLarĝo, 0 ], [ 0, kresto ], [ duonLarĝo, 0 ],
      [ duonLarĝo, -dikeco ], [ -duonLarĝo, -dikeco ]];
    for ( let kol = 0; kol < 0o5; kol++ ) {
      const dx = sekcioj[kol][0], dz = sekcioj[kol][1];
      pozicioj.push(cx + dx * cos - dz * sin, longo * t, cz + dx * sin + dz * cos);
      uvoj.push(kol / 0o4, t);
      koloroj.push(koloro.r, koloro.g, koloro.b);
    }
  }
  for ( let i = 0; i < SEGMENTOJ; i++ ) {
    for ( let kol = 0; kol < 0o5; kol++ ) {
      const sek = ( kol + 1 ) % 0o5;
      const a = i * 0o5 + kol, b = i * 0o5 + sek;
      const c = a + 0o5, d = b + 0o5;
      indeksoj.push(a, c, b, b, c, d);
    }
  }
  const fino = SEGMENTOJ * 0o5;
  indeksoj.push(0, 2, 1, 0, 3, 2, 0, 4, 3);
  indeksoj.push(fino, fino + 1, fino + 2, fino, fino + 2, fino + 3,
    fino, fino + 3, fino + 4);
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
  geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 2));
  geometrio.setAttribute("color", new THREE.Float32BufferAttribute(koloroj, 3));
  geometrio.setIndex(indeksoj);
  geometrio.computeVertexNormals();
  return geometrio;
}
