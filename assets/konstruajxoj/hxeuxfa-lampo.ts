// ≺⧼ Hxeuxfa lampo 🏮 ⧽≻
// Trapezaj dioritaj kolonoj kun fajraj kronoj kaj brilaj
// sprajtoj. La lampo nomigxas huf ( ֭ſɭwʞ ) en Iikrhia. noma formo. hxeuxfo.
import * as THREE from "three";
import { kreiBrilanTeksajxon, kreiDioritanTeksajxon } from "../komunajxoj/teksajxoj.js";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";

// ⟨ La flama silueto 📃 ⟩ — la antaŭa flamo estis simpla KONUSO ( ConeGeometry
// kun sep flankoj ): ĝi aspektis kiel oranĝa triangulo, ne kiel flamo. Vera
// flamo havas VENTRON ( iomete super la bazo ), TALION super ĝi, kaj longan
// pintiĝantan langon. Ĉi tiu profilo ( r, y ) iras de la akso ĉe la bazo
// ( fermita fundo ) ĝis la pinto ĉe y = 1.
const FLAMA_PROFILO: [ number, number ][] = [
  [ 0.00, 0.00 ],   // la akso ĉe la bazo — la fundo estas fermita
  [ 0.30, 0.00 ],
  [ 0.44, 0.06 ],
  [ 0.50, 0.16 ],   // la ventro de la flamo
  [ 0.49, 0.27 ],
  [ 0.44, 0.38 ],
  [ 0.36, 0.50 ],   // la talio
  [ 0.27, 0.62 ],
  [ 0.19, 0.73 ],
  [ 0.12, 0.82 ],
  [ 0.07, 0.90 ],
  [ 0.03, 0.96 ],
  [ 0.00, 1.00 ],   // la pinto
];

// La alto de unu lango ( la malgrandaj teardropoj, kiuj lekas ĉirkaŭ la ĉefa
// flamo ) en mondunuoj. Ĝi ankaŭ estas uzata de la animacio, por ke la bazo de
// ĉiu lango restu sur la meĉo dum la lango longiĝas supren.
const LANGA_ALTO = 0o14/0o100;

// ⟨ La bovla alto 📃 ⟩ — unu nombro regas la tutan dioritan bovlon: la lathe-
// profilo, la oran randan bendon kaj la lokon de la flamo ĉiuj derivas sian
// vertikalan mezuron el ĉi tiu konstanto, do la altecon eblas ŝanĝi en unu
// loko. La bovlo estis 0.375 alta ( preskaŭ same alta kiel larĝa ĉe la rando ),
// do ĝi legiĝis kiel PROFUNDA taso, precipe ĉar la kolono sub ĝi estas mallarĝa
// — la lampo aspektis kiel pokalo. Poste 0.266 ( triono pli malalta ), sed la
// bovlo ankoraŭ legiĝis kiel pelvo kun videbla kavo. Nun 0.203: la muro
// leviĝas je preskaŭ duono de la originalo, la interna kavo preskaŭ malaperas
// ( la interna fundo estas frakcio de BOVLA_ALTO, do malaltiĝante ĝi ankaŭ
// malleviĝas ), kaj la silueto de la lampo legiĝas kiel flamo sur plata telero.
const BOVLA_ALTO = 0o15/0o100;   // 13/64 ≈ 0.203

// kreiFlamanGeometrion — Unu tavolo de la flamo: lathe-korpo laŭ FLAMA_PROFILO,
// kun du realismoj aldonitaj al la verticoj — la surfaco RIPLIĜAS ( la flamo
// ne estas glata konuso; ĝia rando ondiĝas, kaj des pli ĉe la pinto ) kaj la
// PINTO KLINIĜAS for de la akso ( flamo staras sur la meĉo, sed ĝia lango
// leviĝas malrekte ).
//     @param alto ( number ) - La flama alto en mondunuoj.
//     @param largho ( number ) - La plej granda diametro de la flamo.
//     @param ml ( number ) - La klino-multobliko ( la ekstera tavolo klinas pli ).
//     @param semo ( number ) - La hazardo-semo, por ke ĉiu tavolo riplu malsame.
//     @returns geometrio ( THREE.BufferGeometry ) - La flama tavolo, centre je y = 0.
function kreiFlamanGeometrion( alto: number, largho: number, ml: number,
  semo: number ): THREE.BufferGeometry {
  const punktoj = FLAMA_PROFILO.map(( [ r, y ] ) =>
    new THREE.Vector2(r * largho / 2, ( y - 0o1/0o2 ) * alto));
  const geometrio = new THREE.LatheGeometry(punktoj, 0o20);   // 16 flankoj
  const pozicioj = geometrio.attributes.position;
  for ( let i = 0; i < pozicioj.count; i++ ) {
    const x = pozicioj.getX(i), y = pozicioj.getY(i), z = pozicioj.getZ(i);
    const t = y / alto + 0o1/0o2;               // 0 ĉe la bazo, 1 ĉe la pinto
    const angulo = Math.atan2(z, x);
    const r = Math.hypot(x, z);
    // La riploj — kvar ondoj ĉirkaŭ la flamo, kiuj plifortiĝas supren.
    const riplo = 1 + ( 0o3/0o100 + 0o10/0o100 * t )
      * Math.sin(4 * angulo + t * 0o7 + semo);
    // La klino — la pinto leviĝas malrekte. Ĝi komenciĝas ĉe la malsupra
    // duono ( t³ ), do la ventro de la flamo restas vertikala kaj nur la lango
    // flankenkliniĝas, kiel ĉe vera flamo.
    const klino = ml * 0o7/0o100 * alto * t * t * t;
    pozicioj.setXYZ(i, r * riplo * Math.cos(angulo) + klino,
      y + riplo * 0o2/0o100 * alto * Math.sin(t * 0o5 + angulo * 2),
      r * riplo * Math.sin(angulo) + klino * 0o7/0o10);
  }
  geometrio.computeVertexNormals();
  return geometrio;
}

// facaAngulo — La angulo de la faco-centro kiu entenas teta. La kvarlata
// kolono havas angulojn cxe 0°, 90°, 180°, 270° kaj rektajn facojn inter ili.
function facaAngulo(teta: number): number {
  return Math.round(( teta - Math.PI / 4 ) / ( Math.PI / 2 )) * ( Math.PI / 2 ) + Math.PI / 4;
}

// facaRadiuso — La radiuso de la FACETA kolona surfaco cxe alto u kaj angulo
// teta. La sekco estas kvadrato ( anguloj cxe 0°, 90°, 180°, 270° je radiuso
// r ), kaj la facoj estas rektaj linioj, do la radiuso cxe angulo teta estas
// r·cos( 45° )/cos( teta - faco-centro ). La glata konusa formulo donus
// radiuson r cxie, sed tio flosus super la plataj facoj.
function facaRadiuso(u: number, teta: number, rBot: number, rTop: number, H: number): number {
  const r = rBot - ( rBot - rTop ) * ( u / H );
  const centro = facaAngulo(teta);
  return r * Math.SQRT1_2 / Math.cos(teta - centro);
}

// kreiFacetanBendon — Diagonala bendo kiu cxirkauxvolvigxas la kvarlatan
// konusan kolonon, sekvante la FACETAN surfacon ( ne la glatan konuson )
// kaj iomete eksteren ( 0o1/0o200 ) por ne z-fajfi kun la kolono. La bendo
// estas strio de kvarlateroj laux la centro-kurbo, kun fermaj cxapoj cxe la
// du finoj. La alto-funkcio uJe decidas la kolon-alton por cxiu angulo — la
// bendo povas faldegi aux volvigi diagonale laux la bezono.
//     @param uJe ( (teta) => number ) - La kolon-alto por angulo teta.
//     @param t0, t1 ( number ) - Komenca kaj fina anguloj ( radianoj ).
//     @param largxo ( number ) - Larĝo de la bendo.
//     @param rBot, rTop, H ( number ) - Kolonaj malsupra/supra radiusoj kaj alto.
// @returns bendo
function kreiFacetanBendon(uJe: ( teta: number ) => number, t0: number, t1: number, largxo: number, rBot: number, rTop: number, H: number): THREE.BufferGeometry {
  const SEG = 0o20; // 16 segmentoj laux la bendo
  const EPS = 0o1 / 0o200; // 1/128 — levita iomete super la faco
  const centroj: THREE.Vector3[] = [];
  const facoj: THREE.Vector3[] = [];
  for ( let i = 0; i <= SEG; i++ ) {
    const t = i / SEG;
    const teta = t0 + ( t1 - t0 ) * t;
    const u = uJe(teta);
    const r = facaRadiuso(u, teta, rBot, rTop, H);
    const y = -H / 2 + u;
    const c = Math.cos(teta), s = Math.sin(teta);
    const fc = facaAngulo(teta);
    const nx = Math.cos(fc), nz = Math.sin(fc);
    centroj.push(new THREE.Vector3(r * c + nx * EPS, y, r * s + nz * EPS));
    facoj.push(new THREE.Vector3(nx, 0, nz));
  }
  // Larĝo-direktoj — perpendikulaj al la vojaĝo, en la faca ebeno.
  const larghoj: THREE.Vector3[] = [];
  for ( let i = 0; i <= SEG; i++ ) {
    const antauxa = centroj[Math.max(0, i - 1)];
    const sekva = centroj[Math.min(SEG, i + 1)];
    const voja = new THREE.Vector3().subVectors(sekva, antauxa);
    larghoj.push(new THREE.Vector3().crossVectors(facoj[i], voja).normalize());
  }
  const vertoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let i = 0; i <= SEG; i++ ) {
    const C = centroj[i], D = larghoj[i];
    vertoj.push(C.x - D.x * largxo / 2, C.y - D.y * largxo / 2, C.z - D.z * largxo / 2);
    vertoj.push(C.x + D.x * largxo / 2, C.y + D.y * largxo / 2, C.z + D.z * largxo / 2);
  }
  for ( let i = 0; i < SEG; i++ ) {
    const a = i * 2, b = a + 1, c2 = a + 2, d = a + 3;
    indeksoj.push(a, c2, b, b, c2, d);
  }
  // Fermaj cxapoj — la centroj kiel apartaj vertoj cxe la du finoj.
  const lasta = SEG * 2;
  vertoj.push(centroj[0].x, centroj[0].y, centroj[0].z);
  vertoj.push(centroj[SEG].x, centroj[SEG].y, centroj[SEG].z);
  const c0 = ( SEG + 1 ) * 2, cN = c0 + 1;
  indeksoj.push(0, c0, 1, lasta, lasta + 1, cN);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertoj), 3));
  g.setIndex(indeksoj);
  g.computeVertexNormals();
  return g;
}

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
function kreiFalekon(centro: number, uPinto: number, uSubo: number, margxeno: number, largxo: number, rBot: number, rTop: number, H: number): THREE.BufferGeometry {
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

export interface HxeuxfaLoko {
  x: number; z: number; y: number;
  /** Nedeviga kvadrata orientiĝo; platformaj lampoj povas vicigi kun sia rombo. */
  rotacio?: number;
}

export interface HxeuxfaSistemo {
  flamaEkstero: THREE.InstancedMesh;
  flamaInterno: THREE.InstancedMesh;
  flamaKerno: THREE.InstancedMesh;   // la varma kerno ĉe la bazo
  flamaLangoj: THREE.InstancedMesh;  // la malgrandaj langoj, kiuj lekas supren
  langojPoLampo: number;
  langajBazoj: THREE.Vector3[];      // x, z = deŝovo de la lango; y = larĝa multiplikilo
  langajFazoj: number[];
  brilajPunktoj: THREE.Points;
  brilaMaterialo: THREE.ShaderMaterial;
  punktajLumoj: THREE.PointLight[];
  lumajIndeksoj: number[];      // la flama indico sur kiu sidas ĉiu el la kvar lumoj
  spots: THREE.Vector3[];
  phases: number[];
  sekviLumojn: ( x: number, z: number ) => void;
}

// konstruiHxeuxfojn — Konstruu trapezajn lampojn (hxeuxfojn) el bazoj, bovloj, flamoj kaj briletoj.
//     @param dioritaMaterialo ( THREE.MeshStandardMaterial ) - La komuna monda
//     diorita ŝtonmaterialo ( kreiDioritanMaterialon ), kiun la lampoj reuzas
//     por siaj kolonoj kaj bovloj. La lampo prenas PROPRIAN klonon kun pli
//     fajngrajna teksturo ( 4×4 anstataŭ 2×2 ), por ke la kristaloj konvenu
//     al la malgranda skalo de la kolono kaj bovlo.
export function konstruiHxeuxfojn(sceno: THREE.Scene,
  spots: HxeuxfaLoko[],
  dioritaMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial
): HxeuxfaSistemo {
  const kolonajGeometrioj: THREE.BufferGeometry[] = [];
  const bovlajGeometrioj: THREE.BufferGeometry[] = [];
  const orajGeometrioj: THREE.BufferGeometry[] = [];
  const flamajLokoj: THREE.Vector3[] = [];

  // Lampa diorita materialo — klono kun pli fajngrajna teksturo. La komuna
  // voja ripeto ( 2×2 ) montras tro grandajn kristalojn sur la malgranda
  // kolono kaj bovlo; la 4×4 ripeto duonigas la grajnojn kaj konvenas al la
  // lampa skalo. La teksturo-klonoj kunhavigas la bildon, do ili kostas nenion
  // plian en memoro.
  const lampaMaterialo = dioritaMaterialo.clone();
  const lampaMap = ( dioritaMaterialo.map ?? kreiDioritanTeksajxon() ).clone();
  lampaMap.repeat.set(0o4, 0o4); lampaMap.needsUpdate = true;
  lampaMaterialo.map = lampaMap;
  if ( dioritaMaterialo.bumpMap ) {
    const lampaBump = dioritaMaterialo.bumpMap.clone();
    lampaBump.repeat.set(0o4, 0o4); lampaBump.needsUpdate = true;
    lampaMaterialo.bumpMap = lampaBump;
  }

  for ( const p of spots ) {
    // Trapeza kolono ( pli largxa cxe bazo )
    const rotacio = p.rotacio ?? Math.PI / 4;
    const pillar = new THREE.CylinderGeometry(0o5/0o40, 0o13/0o40, 0o155/0o40, 4, 1);
    pillar.rotateY(rotacio);
    pillar.translate(p.x, p.y + 0o155/0o100, p.z);
    kolonajGeometrioj.push(pillar);

    // Diorita bovlo — fermita profilo. ekstera kurbo, rando, interna muro kaj fundo.
    // La fermo forigas la tra-videblon (la interna flanko nun estas vera surfaco).
    // La plata bazo havas la SAMAN radiuson kiel la kolona supro ( 0o5/0o40 =
    // 0.156 ), do la bovlo sidas tute glate sur la kolono sen videbla paŝo aŭ
    // superpendanta lipo — unu kontinua silueto. La interno estas MALKOLONGA,
    // do la bovlo aspektas kiel malprofunda pelvo kaj la malhela ena kavo ne
    // dominiĝas. Ĉiuj vertikalaj mezuroj estas FRAKCIOJ de BOVLA_ALTO, do la
    // horizontala profilo ( la kurbo de la muro ) restas identa kiam la bovlo
    // malaltiĝas.
    const profilo: THREE.Vector2[] = [
      new THREE.Vector2(0, 0),
      ...new THREE.SplineCurve([
        new THREE.Vector2(0o5/0o40, 0),
        new THREE.Vector2(0o2/0o10, BOVLA_ALTO * 0.42),
        new THREE.Vector2(0o3/0o10, BOVLA_ALTO * 0.83),
        new THREE.Vector2(0o35/0o100, BOVLA_ALTO),
      ]).getPoints(0o10),
      new THREE.Vector2(0o31/0o100, BOVLA_ALTO),
      new THREE.Vector2(0o3/0o20, BOVLA_ALTO * 0.67),
      new THREE.Vector2(0o3/0o20, BOVLA_ALTO * 0.42),
      new THREE.Vector2(0, BOVLA_ALTO * 0.42),
    ];
    const bowl = new THREE.LatheGeometry(profilo, 4);
    bowl.rotateY(rotacio);
    // La kolono estas 0o155/0o40 alta, do gia supro estas p.y + 0o155/0o40 ( ne 0o155/0o100 = centro ).
    bowl.translate(p.x, p.y + 0o155/0o40, p.z);
    bovlajGeometrioj.push(bowl);

    // Ora rando cxe la MALUPRA flanko de la bovlo — la SAMA ora materialo
    // kiel la konstruajxoj. MALdika bendo pli proksime al la bovla supro,
    // kun marĝeno — gxi ne tusxas la bovlan lipon kaj la ekstera radiuso
    // restas ene de la bovla rando. Gxi sekvas la bovlan deklivon kaj estas
    // levita iomete ( 0o1/0o200 ) por legigxi kiel rando.
    const rando = new THREE.CylinderGeometry(0o70/0o200, 0o57/0o200, 0o1/0o20, 4, 1);
    rando.rotateY(rotacio);
    rando.translate(p.x, p.y + 0o155/0o40 + BOVLA_ALTO * 0.875, p.z);
    orajGeometrioj.push(rando);

    // Kvar APARTAJ falekoj — unu po faco. Cxiu faleko estas ferma buklo kun
    // rondaj DUONCIRKLAJ kurboj cxe ambaux finoj ( la malsupra suben, la
    // supra supren ) kaj brakoj kiuj sekvigas la kolonan konusigon kun
    // KONSTANTA horizontala margxeno al la facaj randoj. La falekoj NE
    // konektigxas unu al la alia — horizontala margxeno restas cxe la anguloj.
    // La vertikalaj margxenoj estas malgrandaj.
    const falekaPinto = 0o32/0o10, falekaSubo = 0o1/0o4, falekaMargxeno = 0o1/0o20;
    for ( let k = 0; k < 4; k++ ) {
      const faleko = kreiFalekon(Math.PI / 4 + k * Math.PI / 2, falekaPinto, falekaSubo, falekaMargxeno, 0o1/0o40, 0o13/0o40, 0o5/0o40, 0o155/0o40);
      faleko.rotateY(rotacio);
      faleko.translate(p.x, p.y + 0o155/0o100, p.z);
      orajGeometrioj.push(faleko);
    }

    // Flamo levita. gia bazo sidas super la bovla rando ( ne sube en la bovlo ),
    // kaj restas super la rando ecx cxe la plej alta flam-skalo. La deŝovo
    // sekvas BOVLA_ALTO, do malaltiĝinta bovlo ankaŭ mallevas la flamon — la
    // flamo restas la sama distanco super la rando.
    flamajLokoj.push(new THREE.Vector3(p.x, p.y + 0o155/0o40 + BOVLA_ALTO * 2, p.z));
  }

  const kolonoj = new THREE.Mesh(kunfandiGeometriojn(kolonajGeometrioj), lampaMaterialo);
  kolonoj.castShadow = true;
  sceno.add(kolonoj);

  const bovloj = new THREE.Mesh(kunfandiGeometriojn(bovlajGeometrioj), lampaMaterialo);
  sceno.add(bovloj);

  // Oraj randoj kaj bendoj — la sama ora materialo kiel la konstruajxoj.
  const orajRandoj = new THREE.Mesh(kunfandiGeometriojn(orajGeometrioj), oraMaterialo);
  sceno.add(orajRandoj);

  // ⟨ La flamo — tri tavoloj 📃 ⟩ — la antaŭa flamo estis DU opakaj konusoj
  // ( unu oranĝa, unu flaveca ). Nun ĝi estas tri ALDONAJ tavoloj de la sama
  // teardropo: la ekstera oranĝa koverto, la flava mezo kaj la blanka varma
  // kerno ĉe la bazo. Ĉar la tavoloj aldonas sin ( AdditiveBlending ), la
  // centro de la flamo brilas plej forte kaj la randoj glate malaperas — la
  // flamo legiĝas kiel lumo, ne kiel oranĝa plasta konuso.
  const N = flamajLokoj.length;
  const flamaMaterialo = ( koloro: number, opaco: number ) => new THREE.MeshBasicMaterial({
    color: koloro, toneMapped: false, transparent: true, opacity: opaco,
    blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const flamaEkstero = new THREE.InstancedMesh(
    kreiFlamanGeometrion(0o35/0o100, 0o21/0o100, 1, 0.7),
    flamaMaterialo(0xff6a1e, 0o35/0o40), N);
  const flamaInterno = new THREE.InstancedMesh(
    kreiFlamanGeometrion(0o23/0o100, 0o14/0o100, 0o3/0o4, 2.3),
    flamaMaterialo(0xffb545, 0o33/0o40), N);
  const flamaKerno = new THREE.InstancedMesh(
    kreiFlamanGeometrion(0o10/0o100, 0o4/0o100, 0o1/0o2, 5.1),
    flamaMaterialo(0xfff4d0, 0o5/0o10), N);
  flamaEkstero.frustumCulled = false;
  flamaInterno.frustumCulled = false;
  flamaKerno.frustumCulled = false;
  sceno.add(flamaEkstero, flamaInterno, flamaKerno);

  // ⟨ La langoj 📃 ⟩ — la tri tavoloj supre estas SAMAKSIAJ lathe-korpoj, do
  // la flamo havas unu glatan teardropan silueton kiu nur grimpas supren kaj
  // malsupren. Vera flamo estas PLURAJ langoj: malgrandaj teardropoj, kiuj
  // sidas sur la meĉo ĉirkaŭ la ĉefa lango, lekas supren unu post la alia kaj
  // kliniĝas eksteren. Ĉiu lango havas sian propran bazan deŝovon, larĝon kaj
  // fazon, do la flamo neniam aspektas kiel unu solida formo.
  const LANGOJ = 0o3;
  const flamaLangoj = new THREE.InstancedMesh(
    kreiFlamanGeometrion(LANGA_ALTO, 0o11/0o100, 0o6/0o10, 3.7),
    flamaMaterialo(0xff8a2c, 0o17/0o40), N * LANGOJ);
  flamaLangoj.frustumCulled = false;
  sceno.add(flamaLangoj);
  const langajBazoj: THREE.Vector3[] = [];
  const langajFazoj: number[] = [];
  flamajLokoj.forEach(() => {
    // La langoj sidas ĉirkaŭ la meĉo ( radiuso ~0.07 ), ne centre — la ĉefa
    // lango restas inter ili.
    const turno = Math.random() * Math.PI * 2;
    for ( let j = 0; j < LANGOJ; j++ ) {
      const a = turno + j / LANGOJ * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o5/0o10;
      const r = 0o5/0o100 + Math.random() * 0o4/0o100;
      langajBazoj.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r,
        0o7/0o10 + Math.random() * 0o5/0o10));
      langajFazoj.push(Math.random() * Math.PI * 2);
    }
  });

  // brilaj sprajtoj
  const gPozicio = new Float32Array(N * 3);
  const gSemo = new Float32Array(N);
  const gGrando = new Float32Array(N);
  const phases: number[] = [];

  flamajLokoj.forEach(( p, i ) => {
    gPozicio.set([ p.x, p.y + 0o15/0o100, p.z ], i * 3);
    gSemo[i] = Math.random() * 0o140;
    gGrando[i] = 0o20 + Math.random() * 0o10;
    phases.push(Math.random() * Math.PI * 2);
  });

  const gg = new THREE.BufferGeometry();
  gg.setAttribute("position", new THREE.BufferAttribute(gPozicio, 3));
  gg.setAttribute("semo", new THREE.BufferAttribute(gSemo, 1));
  gg.setAttribute("aSize", new THREE.BufferAttribute(gGrando, 1));

  const brilaMaterialo = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uOp: { value: 0o15/0o40 },
      uCol: { value: new THREE.Color(0xf8b058) },
      uPR: { value: 1 },
    },
    vertexShader: `
      attribute float semo; attribute float aSize;
      uniform float uTime, uPR;
      varying float vA;
      void main() {
        vA = 0.75 + 0.25 * sin(uTime * 9.0 + semo * 7.0);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uPR * (160.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uCol; uniform float uOp;
      varying float vA;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        gl_FragColor = vec4(uCol, smoothstep(0.5, 0.0, d) * uOp * vA);
      }
    `,
  });

  const brilajPunktoj = new THREE.Points(gg, brilaMaterialo);
  brilajPunktoj.frustumCulled = false;
  sceno.add(brilajPunktoj);  // ⟪ La kvar punktlumoj 📃 ⟫ — la plej proksimaj flamoj al la vidpunkto.
  // Antaŭe la kvar lumoj elektiĝis UNUFOJE laŭ la distanco al la mond-origino
  // kaj restis tie por ĉiam ( la lampo apud la ludanto restis malluma se li
  // malproksimiĝis de la centro ). Nun ili sekvas la vidpunkton — la sama ideo
  // kiel la suna ombro-volumeno. La NOMBRO restas konstanta, do la
  // shader-programoj ne rekompiliĝas kiam la lumoj transloĝiĝas.
  const LUMOJ = Math.min(0o4, flamajLokoj.length);
  const punktajLumoj: THREE.PointLight[] = [];
  const lumajIndeksoj: number[] = [];        // la flama indico de ĉiu lumo
  const lumajDistancoj = new Float32Array(LUMOJ);   // la kvadrataj distancoj
  for ( let k = 0; k < LUMOJ; k++ ) {
    const L = new THREE.PointLight(0xf89838, 0o15/0o40, 0o32, 2);
    sceno.add(L);
    punktajLumoj.push(L);
    lumajIndeksoj.push(k);
  }

  let lumCentroX = NaN, lumCentroZ = NaN;
  // sekviLumojn — Aligu la kvar lumojn al la kvar plej proksimaj flamoj de la
  // vidpunkto. La elekto estas unu trairo sen asigno — la tabeloj jam ekzistas.
  //     @param x ( number ) - La mond-x de la vidpunkto.
  //     @param z ( number ) - La mond-z de la vidpunkto.
  function sekviLumojn( x: number, z: number ): void {
    if ( LUMOJ === 0 ) return;
    // Nur kiam la vidpunkto iris sufiĉe for — la flamoj mem ne moviĝas, do
    // senmovaj lumoj ne bezonas reelekton ĉiukadre.
    if ( Math.abs(x - lumCentroX) < 0o2 && Math.abs(z - lumCentroZ) < 0o2 ) return;
    lumCentroX = x; lumCentroZ = z;
    for ( let k = 0; k < LUMOJ; k++ ) lumajDistancoj[k] = Infinity;
    for ( let i = 0; i < flamajLokoj.length; i++ ) {
      const p = flamajLokoj[i];
      const sxovX = p.x - x, sxovZ = p.z - z;
      const d = sxovX * sxovX + sxovZ * sxovZ;
      // La plej malproksima el la tenataj — anstataŭigu ĝin se ĉi tiu flamo
      // estas pli proksima.
      let plejMalproksima = 0;
      for ( let k = 1; k < LUMOJ; k++ ) if ( lumajDistancoj[k] > lumajDistancoj[plejMalproksima] ) plejMalproksima = k;
      if ( d < lumajDistancoj[plejMalproksima] ) {
        lumajDistancoj[plejMalproksima] = d;
        lumajIndeksoj[plejMalproksima] = i;
      }
    }
    // La lumo sidas iomete super la lampo — en la flamo mem.
    for ( let k = 0; k < LUMOJ; k++ ) {
      const p = flamajLokoj[lumajIndeksoj[k]];
      punktajLumoj[k].position.set(p.x, p.y + 0o23/0o100, p.z);
    }
  }
  // La komenca elekto — la kvar plej proksimaj al la mond-origino, kiel antaŭe.
  sekviLumojn(0, 0);

  const M = new THREE.Matrix4();
  flamajLokoj.forEach(( p, i ) => {
    M.makeTranslation(p.x, p.y, p.z);
    flamaEkstero.setMatrixAt(i, M);
    flamaInterno.setMatrixAt(i, M);
    flamaKerno.setMatrixAt(i, M);
    for ( let j = 0; j < LANGOJ; j++ ) flamaLangoj.setMatrixAt(i * LANGOJ + j, M);
  });
  flamaEkstero.instanceMatrix.needsUpdate = true;
  flamaInterno.instanceMatrix.needsUpdate = true;
  flamaKerno.instanceMatrix.needsUpdate = true;
  flamaLangoj.instanceMatrix.needsUpdate = true;

  return { flamaEkstero, flamaInterno, flamaKerno, flamaLangoj, langojPoLampo: LANGOJ,
    langajBazoj, langajFazoj, brilajPunktoj, brilaMaterialo, punktajLumoj,
    lumajIndeksoj, spots: flamajLokoj, phases, sekviLumojn };
}

// animaciiFlammojn — Animaciu flamojn kaj briletan intenson cxiun kadron.
//     @param sys ( HxeuxfaSistemo ) - La lampa sistemo kun flamoj kaj briletoj.
//     @param t ( number ) - Malsupra tempo por oscilado.
// Ĉiukadra kreaĵoj hoistitaj al modula skopo — la sama objektoj reuzitaj
// ĉiun kadron ( neniu asigno je kadro ).
const FLAMA_M = new THREE.Matrix4();
const FLAMA_Q = new THREE.Quaternion();
const FLAMA_Q2 = new THREE.Quaternion();
const FLAMA_E = new THREE.Euler();
const FLAMA_E2 = new THREE.Euler();
const FLAMA_S = new THREE.Vector3();
const FLAMA_TMP = new THREE.Vector3();

export function animaciiFlammojn(sys: HxeuxfaSistemo, t: number): void {
  const M = FLAMA_M;
  const Q = FLAMA_Q;
  const E = FLAMA_E;
  const S = FLAMA_S;
  const TMP = FLAMA_TMP; // reuzita skriba vektoro — neniu ĉiukadra faro

  // Unu sola trairo de la flamlokoj — la flamaj matricoj KAJ la punktlumaj
  // intensecoj en la sama buklo ( la antaŭa duobla forEach faris du trairojn ).
  //
  // ⟨ Kial la flamo kreskas SUPRE 📃 ⟩ — la geometrio estas centre je y = 0,
  // do skalo laŭ y ankaŭ movas la bazon. Vera flamo staras sur la meĉo kaj
  // STRETĈIĜAS supren: la bazo restas, la pinto leviĝas. Tial ĉiu tavolo
  // ricevas vertikalan ŝovon ( skaloY − 1 ) × alto / 2, kiu tenas la bazon
  // fiksita dum la lango kreskas kaj malpliiĝas.
  sys.spots.forEach(( p, i ) => {
    const fazo = sys.phases[i];
    const skalo = 1 + 0o5/0o40 * Math.sin(t * 0o1223/0o100 + fazo) + 0o3/0o40 * Math.sin(t * 0o2755/0o100 + fazo * 0o155/0o100);
    const skaloY = skalo * ( 0o43/0o40 + 0o3/0o20 * Math.sin(t * 0o21 + fazo) );
    // La tuta flamo kliniĝas kaj skuiĝas iomete — la lango ŝoviĝas ĉirkaŭ la
    // meĉo anstataŭ rotacii kiel solida objekto.
    const klinoX = 0o3/0o100 * Math.sin(t * 0o17/0o10 + fazo);
    const klinoZ = 0o3/0o100 * Math.cos(t * 0o13/0o10 + fazo * 0o3/0o2);
    E.set(klinoX, t * 0o163/0o100 + fazo, klinoZ);
    Q.setFromEuler(E);
    S.set(skalo, skaloY, skalo);
    M.compose(TMP.set(p.x, p.y + ( skaloY - 1 ) * 0o35/0o200, p.z), Q, S);
    sys.flamaEkstero.setMatrixAt(i, M);

    // La flava mezo — iomete pli mallonga ol la koverto, do la oranĝa rando
    // restas videbla ĉirkaŭ ĝi.
    S.set(skalo * 0o35/0o40, skaloY * 0o35/0o40, skalo * 0o35/0o40);
    M.compose(TMP.set(p.x, p.y + ( skaloY * 0o35/0o40 - 1 ) * 0o23/0o200,
      p.z), Q, S);
    sys.flamaInterno.setMatrixAt(i, M);

    // La kerno — la plej varma, plej malgranda parto, kun propra rapida
    // tremado ( ĝi ne sekvas la malrapidan pulson de la koverto ).
    const kerna = 0o7/0o10 + 0o15/0o100 * Math.sin(t * 0o33/0o10 + fazo * 0o5/0o2)
      + 0o1/0o10 * Math.sin(t * 0o77/0o10 + fazo);
    S.set(skalo * kerna, skaloY * kerna * 0o7/0o10, skalo * kerna);
    M.compose(TMP.set(p.x, p.y + ( skaloY * kerna * 0o7/0o10 - 1 ) * 0o10/0o200, p.z), Q, S);
    sys.flamaKerno.setMatrixAt(i, M);
  });

  // La punktlumoj havas sian PROPRIAN flaman indekson ( ili sekvas la
  // vidpunkton, ne la unuajn kvar flamojn ) — la fajfado venas de la fazo de
  // la flamo, kiun ili efektive lumas.
  // ⟨ La langoj 📃 ⟩ — ĉiu lango havas sian propran ritmon. La oscilado
  // malfermas kaj fermas ĝin; kiam ĝi malfermiĝas, ĝi kreskas multe pli ALTE
  // ol LARĜE ( la flamo lekas supren ) kaj ĝia pinto kliniĝas eksteren, for
  // de la meĉo. Kiam ĝi fermiĝas, ĝi preskaŭ malaperas en la ĉefan langon.
  const langojPoLampo = sys.langojPoLampo;
  sys.spots.forEach(( p, i ) => {
    const fazoFlama = sys.phases[i];
    for ( let j = 0; j < langojPoLampo; j++ ) {
      const idx = i * langojPoLampo + j;
      const bazo = sys.langajBazoj[idx];
      const fazo = sys.langajFazoj[idx];
      const osc = 0o1/0o2 + 0o1/0o2 * Math.sin(t * ( 0.85 + 0.3 * j ) + fazo + fazoFlama);
      const sx = bazo.z * ( 0.35 + 0o3/0o4 * osc );
      const sy = 0.3 + 1.3 * osc;
      // La lango kliniĝas for de la akso — des pli, des pli malfermita ĝi estas.
      const klino = 0o1/0o10 + 0.32 * osc;
      const cx = bazo.x / Math.max(1e-6, Math.hypot(bazo.x, bazo.y));
      const cz = bazo.y / Math.max(1e-6, Math.hypot(bazo.x, bazo.y));
      FLAMA_E2.set(klino * cz, 0, -klino * cx);
      FLAMA_Q2.setFromEuler(FLAMA_E2);
      FLAMA_Q2.premultiply(Q);
      S.set(sx, sy, sx);
      M.compose(TMP.set(p.x + bazo.x * ( 0.6 + 0.4 * osc ),
        p.y + ( sy - 1 ) * LANGA_ALTO / 2 * 0o7/0o10,
        p.z + bazo.y * ( 0.6 + 0.4 * osc )), FLAMA_Q2, S);
      sys.flamaLangoj.setMatrixAt(idx, M);
    }
  });

  for ( let k = 0; k < sys.punktajLumoj.length; k++ ) {
    const fazo = sys.phases[sys.lumajIndeksoj[k]];
    sys.punktajLumoj[k].intensity = 0o15/0o40 * ( 0o27/0o40 + 0o11/0o40 * Math.sin(t * 0o15 + fazo) * Math.sin(t * 0o723/0o100 + fazo * 2) );
  }

  sys.flamaEkstero.instanceMatrix.needsUpdate = true;
  sys.flamaInterno.instanceMatrix.needsUpdate = true;
  sys.flamaKerno.instanceMatrix.needsUpdate = true;
  sys.flamaLangoj.instanceMatrix.needsUpdate = true;
  sys.brilaMaterialo.uniforms.uTime.value = t;
}
