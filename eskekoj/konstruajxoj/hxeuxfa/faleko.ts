// ≺⧼ ផ្លេក 🪶 ⧽≻
import * as THREE from "three";

export function kreiFalekon(centro: number, uPinto: number, uSubo: number, margxeno: number, largxo: number, rBot: number, rTop: number, H: number): THREE.BufferGeometry {
  const SEG = 0o20;
  const ARMA = 0o10;
  const EPS = 0o1 / 0o200;
  const cx = Math.cos(centro), cz = Math.sin(centro);
  const tx = -cz, tz = cx;
  const d = ( u: number ) => ( rBot - ( rBot - rTop ) * ( u / H ) ) * Math.SQRT1_2;
  const deklivo = ( rBot - rTop ) * Math.SQRT1_2 / H;
  const uB = ( uSubo + rBot * Math.SQRT1_2 - margxeno ) / ( 1 + deklivo );
  const Rb = d(uB) - margxeno;
  const uT = ( uPinto - rBot * Math.SQRT1_2 + margxeno ) / ( 1 - deklivo );
  const Rt = d(uT) - margxeno;
  const vojo: Array<[ number, number ]> = [];
  for ( let i = 0; i <= SEG; i++ ) {
    const a = Math.PI - Math.PI * i / SEG;
    vojo.push([ Rt * Math.cos(a), uT + Rt * Math.sin(a) ]);
  }
  for ( let i = 1; i <= ARMA; i++ ) {
    const u = uT + ( uB - uT ) * i / ARMA;
    vojo.push([ d(u) - margxeno, u ]);
  }
  for ( let i = 1; i <= SEG; i++ ) {
    const a = -Math.PI * i / SEG;
    vojo.push([ Rb * Math.cos(a), uB + Rb * Math.sin(a) ]);
  }
  for ( let i = 1; i < ARMA; i++ ) {
    const u = uB + ( uT - uB ) * i / ARMA;
    vojo.push([ -( d(u) - margxeno ), u ]);
  }
  const N = vojo.length;
  const vertoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let i = 0; i < N; i++ ) {
    const [ x, u ] = vojo[i];
    const [ xa, ua ] = vojo[( i - 1 + N ) % N];
    const [ xs, us ] = vojo[( i + 1 ) % N];
    let dx = xs - xa, du = us - ua;
    const len = Math.hypot(dx, du) || 1;
    dx /= len; du /= len;
    const px = du, pu = -dx;
    for ( let s = -1; s <= 1; s += 2 ) {
      const x1 = x + px * largxo / 2 * s;
      const u1 = u + pu * largxo / 2 * s;
      vertoj.push(cx * d(u1) + tx * x1 + EPS * cx, -H / 2 + u1, cz * d(u1) + tz * x1 + EPS * cz);
    }
  }
  for ( let i = 0; i < N; i++ ) {
    const j = ( i + 1 ) % N;
    const a = i * 2, b = a + 1, c2 = j * 2, d2 = c2 + 1;
    indeksoj.push(a, c2, b, b, c2, d2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertoj), 3));
  g.setIndex(indeksoj);
  g.computeVertexNormals();
  return g;
}
