// Hxeuxfa lampo — trapezaj dioritaj kolonoj kun fajraj kronoj kaj brilaj
// sprajtoj. La lampo nomigxas huf ( ֭ſɭwʞ ) en Iikrhia. noma formo. hxeuxfo.
import * as THREE from "three";
import { kreiBrilanTeksajxon, kreiDioritanTeksajxon } from "../komunajxoj/teksajxoj.js";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";

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
// la kvarlata kolono. La linio estas ferma buklo — gxi komencigxas cxe la
// supro ( la angulo ), iras rekte malsupren laux la dekstra flanko, kurbigxas
// en DUONCIRKLO cxe la malsupro kaj reiras rekte supren laux la maldekstra
// flanko gxis la supro, kie la du brakoj rekontigxas kiel unu sama linio. La
// duoncirklo do estas simple la linio mem kurbiganta — ne aparta peco. Gxi
// kusxas sur la faceta faco, levita iomete ( 0o1/0o200 ) por ne z-fajfi.
//     @param centro ( number ) - La angulo de la faco-centro.
//     @param uPinto ( number ) - Alto de la supro ( la angulo ).
//     @param uC ( number ) - Alto de la duoncirkla centro.
//     @param R ( number ) - Radiuso de la duoncirklo.
//     @param largxo ( number ) - Larĝo de la linio.
//     @param rBot, rTop, H ( number ) - Kolonaj malsupra/supra radiusoj kaj alto.
// @returns faleko
function kreiFalekon(centro: number, uPinto: number, uC: number, R: number, largxo: number, rBot: number, rTop: number, H: number): THREE.BufferGeometry {
  const SEG = 0o20; // 16 segmentoj por la duoncirklo
  const ARMA = 0o10; // 8 segmentoj laux cxiu rekta brako
  const EPS = 0o1 / 0o200;
  const cx = Math.cos(centro), cz = Math.sin(centro);
  const tx = -cz, tz = cx;
  const d = ( u: number ) => ( rBot - ( rBot - rTop ) * ( u / H ) ) * Math.SQRT1_2;
  // La vojo ( x, u ) en la faca ebeno — ferma buklo de la supro malsupren
  // laux la dekstra brako, tra la duoncirklo kaj supren laux la maldekstra
  // brako. La lasta punkto estas la unua — la buklo fermigxas.
  const vojo: Array<[ number, number ]> = [];
  for ( let i = 0; i <= ARMA; i++ ) {
    const t = i / ARMA;
    vojo.push([ R * t, uPinto + ( uC - uPinto ) * t ]);
  }
  for ( let i = 1; i < SEG; i++ ) {
    const a0 = -Math.PI * i / SEG;
    vojo.push([ R * Math.cos(a0), uC + R * Math.sin(a0) ]);
  }
  for ( let i = 0; i < ARMA; i++ ) {
    const t = i / ARMA;
    vojo.push([ -R * ( 1 - t ), uC + ( uPinto - uC ) * t ]);
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
  brilajPunktoj: THREE.Points;
  brilaMaterialo: THREE.ShaderMaterial;
  punktajLumoj: THREE.PointLight[];
  spots: THREE.Vector3[];
  phases: number[];
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
    // superpendanta lipo — unu kontinua silueto. La interno estas MALKOLONGA
    // ( la fundo leviĝas al 0o5/0o40 ), do la bovlo aspektas pli kiel malprofunda
    // pelvo kaj la malhela ena kavo ne dominiĝas.
    const profilo: THREE.Vector2[] = [
      new THREE.Vector2(0, 0),
      ...new THREE.SplineCurve([
        new THREE.Vector2(0o5/0o40, 0),
        new THREE.Vector2(0o2/0o10, 0o5/0o40),
        new THREE.Vector2(0o3/0o10, 0o5/0o20),
        new THREE.Vector2(0o35/0o100, 0o14/0o40),
      ]).getPoints(0o10),
      new THREE.Vector2(0o31/0o100, 0o14/0o40),
      new THREE.Vector2(0o3/0o20, 0o4/0o20),
      new THREE.Vector2(0o3/0o20, 0o5/0o40),
      new THREE.Vector2(0, 0o5/0o40),
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
    rando.translate(p.x, p.y + 0o155/0o40 + 0o25/0o100, p.z);
    orajGeometrioj.push(rando);

    // Kvar APARTAJ falekoj — unu po faco. Cxiu faleko havas angulon supre
    // ( du rektaj linioj ) kaj la linioj kunfluas en DUONCIRKLO cxe la
    // malsupro. La falekoj NE konektigxas unu al la alia — horizontala
    // marĝeno restas cxe la anguloj. La vertikalaj marĝenoj estas malgrandaj.
    const falekaPinto = 0o32/0o10, falekaC = 0o32/0o100, falekaR = 0o5/0o40;
    for ( let k = 0; k < 4; k++ ) {
      const faleko = kreiFalekon(Math.PI / 4 + k * Math.PI / 2, falekaPinto, falekaC, falekaR, 0o1/0o40, 0o13/0o40, 0o5/0o40, 0o155/0o40);
      faleko.rotateY(rotacio);
      faleko.translate(p.x, p.y + 0o155/0o100, p.z);
      orajGeometrioj.push(faleko);
    }

    // Flamo levita. gia bazo sidas cxe la bovla rando ( ne sube en la bovlo ),
    // kaj restas super la rando ecx cxe la plej alta flam-skalo.
    flamajLokoj.push(new THREE.Vector3(p.x, p.y + 0o205/0o40, p.z));
  }

  const kolonoj = new THREE.Mesh(kunfandiGeometriojn(kolonajGeometrioj), lampaMaterialo);
  kolonoj.castShadow = true;
  sceno.add(kolonoj);

  const bovloj = new THREE.Mesh(kunfandiGeometriojn(bovlajGeometrioj), lampaMaterialo);
  sceno.add(bovloj);

  // Oraj randoj kaj bendoj — la sama ora materialo kiel la konstruajxoj.
  const orajRandoj = new THREE.Mesh(kunfandiGeometriojn(orajGeometrioj), oraMaterialo);
  sceno.add(orajRandoj);

  // flamaj konusoj
  const N = flamajLokoj.length;
  const flamaEkstero = new THREE.InstancedMesh(new THREE.ConeGeometry(0o13/0o100, 0o43/0o100, 7),
    new THREE.MeshBasicMaterial({ color: 0xf8a848, toneMapped: false }),
    N);
  const flamaInterno = new THREE.InstancedMesh(new THREE.ConeGeometry(0o3/0o40, 0o13/0o40, 7),
    new THREE.MeshBasicMaterial({ color: 0xf8e8b8, toneMapped: false }),
    N);
  sceno.add(flamaEkstero, flamaInterno);

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
  sceno.add(brilajPunktoj);

  // plej proksimaj lampoj farigxas punktlumoj
  const sorted = flamajLokoj
    .map(( p, i ) => ( { d: p.x * p.x + p.z * p.z, i } ))
    .sort(( a, b ) => a.d - b.d)
    .slice(0, 4);

  const punktajLumoj: THREE.PointLight[] = [];
  for ( const { i } of sorted ) {
    const L = new THREE.PointLight(0xf89838, 0o15/0o40, 0o32, 2);
    L.position.copy(flamajLokoj[i]).add(new THREE.Vector3(0, 0o23/0o100, 0));
    sceno.add(L);
    punktajLumoj.push(L);
  }

  const M = new THREE.Matrix4();
  flamajLokoj.forEach(( p, i ) => {
    M.makeTranslation(p.x, p.y, p.z);
    flamaEkstero.setMatrixAt(i, M);
    flamaInterno.setMatrixAt(i, M);
  });
  flamaEkstero.instanceMatrix.needsUpdate = true;
  flamaInterno.instanceMatrix.needsUpdate = true;

  return { flamaEkstero, flamaInterno, brilajPunktoj, brilaMaterialo, punktajLumoj, spots: flamajLokoj, phases };
}

// animaciiFlammojn — Animaciu flamojn kaj briletan intenson cxiun kadron.
//     @param sys ( HxeuxfaSistemo ) - La lampa sistemo kun flamoj kaj briletoj.
//     @param t ( number ) - Malsupra tempo por oscilado.
export function animaciiFlammojn(sys: HxeuxfaSistemo, t: number): void {
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const S = new THREE.Vector3();
  const TMP = new THREE.Vector3(); // reuzita skriba vektoro — neniu ĉiukadra faro

  // Unu sola trairo de la flamlokoj — la flamaj matricoj KAJ la punktlumaj
  // intensecoj en la sama buklo ( la antaŭa duobla forEach faris du trairojn ).
  sys.spots.forEach(( p, i ) => {
    const fazo = sys.phases[i];
    const skalo = 1 + 0o5/0o40 * Math.sin(t * 0o1223/0o100 + fazo) + 0o3/0o40 * Math.sin(t * 0o2755/0o100 + fazo * 0o155/0o100);
    const skaloY = skalo * ( 0o43/0o40 + 0o3/0o20 * Math.sin(t * 0o21 + fazo) );
    E.set(0, t * 0o163/0o100 + fazo, 0);
    Q.setFromEuler(E);
    S.set(skalo, skaloY, skalo);
    M.compose(p, Q, S);
    sys.flamaEkstero.setMatrixAt(i, M);

    S.set(skalo * 0o35/0o40, skaloY * 0o35/0o40, skalo * 0o35/0o40);
    M.compose(TMP.set(p.x, p.y + 0o1/0o40, p.z), Q, S);
    sys.flamaInterno.setMatrixAt(i, M);

    if ( i < sys.punktajLumoj.length ) {
      const L = sys.punktajLumoj[i];
      L.intensity = 0o15/0o40 * ( 0o27/0o40 + 0o11/0o40 * Math.sin(t * 0o15 + fazo) * Math.sin(t * 0o723/0o100 + fazo * 2) );
    }
  });

  sys.flamaEkstero.instanceMatrix.needsUpdate = true;
  sys.flamaInterno.instanceMatrix.needsUpdate = true;
  sys.brilaMaterialo.uniforms.uTime.value = t;
}
