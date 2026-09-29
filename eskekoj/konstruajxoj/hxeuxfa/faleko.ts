// ≺⧼ La faleko 🪶 ⧽≻
// La faldo de la flama linio sur la kolonaj facoj ( kreiFalekon ).
import * as THREE from "three";

// kreiFalekon — Unu SENINTERROMPA ora linio en faleko-formo sur unu faco de
// la kvarlata kolono. La linio estas ferma buklo — du rektaj brakoj kunigitaj
// per duoncirkla kurbo cxe ĉiu fino ( la malsupra kurbiĝas suben, la supra
// supren ), do ankaŭ la supro estas ronda, ne akra. La brakoj ne estas
// vertikalaj — ili kliniĝas laŭ la kolona konusigo, konservante la SAMAN
// horizontalan marĝenon ( margxeno ) al la facaj randoj je ĉiu alto, do la
// malplena spaco apud la linio restas paralela kun la faco. Ĝi kuŝas sur la
// faceta faco, levita iomete ( 0o1/0o200 ) por ne z-fajfi.
//     @param centro ( number ) - La angulo de la faco-centro.
//     @param uPinto ( number ) - Alto de la supro de la supra duoncirklo.
//     @param uSubo ( number ) - Alto de la malsupro de la malsupra duoncirklo.
//     @param margxeno ( number ) - Konstanta horizontala marĝeno al la facaj randoj.
//     @param largxo ( number ) - Larĝo de la linio.
//     @param rBot, rTop, H ( number ) - Kolonaj malsupra/supra radiusoj kaj alto.
// @returns faleko
export function kreiFalekon(centro: number, uPinto: number, uSubo: number, margxeno: number, largxo: number, rBot: number, rTop: number, H: number): THREE.BufferGeometry {
  const SEG = 0o20; // 16 segmentoj por ĉiu duoncirklo
  const ARMA = 0o10; // 8 segmentoj laŭ ĉiu rektaj brako
  const EPS = 0o1 / 0o200;
  const cx = Math.cos(centro), cz = Math.sin(centro);
  const tx = -cz, tz = cx;
  const d = ( u: number ) => ( rBot - ( rBot - rTop ) * ( u / H ) ) * Math.SQRT1_2;
  // La faca duonlargeco d ( u ) malkreskas linie, kaj la brako kuŝas je
  // d ( u ) - margxeno, do la duoncirklaj radiusoj kaj la finaj altoj sekvas
  // el tiu kondiĉo — la fundo de la malsupra kurbo estas uSubo kaj la supro
  // de la supra kurbo estas uPinto.
  const deklivo = ( rBot - rTop ) * Math.SQRT1_2 / H;
  const uB = ( uSubo + rBot * Math.SQRT1_2 - margxeno ) / ( 1 + deklivo );
  const Rb = d(uB) - margxeno;
  const uT = ( uPinto - rBot * Math.SQRT1_2 + margxeno ) / ( 1 - deklivo );
  const Rt = d(uT) - margxeno;
  // La vojo ( x, u ) en la faca ebeno — ferma buklo de la maldekstra fino de
  // la supra kurbo super la supro, malsupren laŭ la dekstra brako, tra la
  // malsupra duoncirklo kaj supren laŭ la maldekstra brako. La lasta punkto
  // konektas al la unua — la buklo fermiĝas kiel unu sama linio.
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
    // Perpendikla direkto en la faca ebeno ( x, u ).
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
