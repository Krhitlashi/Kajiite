// Hxeuxfa lampo — trapezaj dioritaj kolonoj kun fajraj kronoj kaj brilaj
// sprajtoj. La lampo nomigxas huf ( ֭ſɭwʞ ) en Iikrhia. noma formo. hxeuxfo.
import * as THREE from "three";
import { kreiBrilanTeksajxon, kreiDioritanTeksajxon } from "../komunajxoj/teksajxoj.js";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";

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
  _oraMaterialo: THREE.MeshStandardMaterial
): HxeuxfaSistemo {
  const kolonajGeometrioj: THREE.BufferGeometry[] = [];
  const bovlajGeometrioj: THREE.BufferGeometry[] = [];
  const flamajLokoj: THREE.Vector3[] = [];

  // Lampa diorita materialo — klono kun pli fajngrajna teksturo. La komuna
  // voja ripeto ( 2×2 ) montras tro grandajn kristalojn sur la malgranda
  // kolono kaj bovlo; la 4×4 ripeto duonigas la grajnojn kaj konvenas al la
  // lampa skalo. La teksturo-klonoj kunhavigas la bildon, do ili kostas nenion
  // plian en memoro.
  const lampaMaterialo = dioritaMaterialo.clone();
  const lampaMap = ( dioritaMaterialo.map ?? kreiDioritanTeksajxon() ).clone();
  lampaMap.repeat.set( 0o4, 0o4 ); lampaMap.needsUpdate = true;
  lampaMaterialo.map = lampaMap;
  if ( dioritaMaterialo.bumpMap ) {
    const lampaBump = dioritaMaterialo.bumpMap.clone();
    lampaBump.repeat.set( 0o4, 0o4 ); lampaBump.needsUpdate = true;
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
      ]).getPoints(0o12),
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

    // Flamo levita. gia bazo sidas cxe la bovla rando ( ne sube en la bovlo ),
    // kaj restas super la rando ecx cxe la plej alta flam-skalo.
    flamajLokoj.push(new THREE.Vector3(p.x, p.y + 0o205/0o40, p.z));
  }

  const kolonoj = new THREE.Mesh(kunfandiGeometriojn(kolonajGeometrioj), lampaMaterialo);
  kolonoj.castShadow = true;
  sceno.add(kolonoj);

  const bovloj = new THREE.Mesh(kunfandiGeometriojn(bovlajGeometrioj), lampaMaterialo);
  sceno.add(bovloj);

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

  flamajLokoj.forEach((p, i) => {
    gPozicio.set([p.x, p.y + 0o15/0o100, p.z], i * 3);
    gSemo[i] = Math.random() * 0o144;
    gGrando[i] = 0o24 + Math.random() * 0o12;
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
    .map((p, i) => ({ d: p.x * p.x + p.z * p.z, i }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 4);

  const punktajLumoj: THREE.PointLight[] = [];
  for ( const { i } of sorted ) {
    const L = new THREE.PointLight(0xf89838, 0o15/0o40, 0o32, 2);
    L.position.copy(flamajLokoj[i]).add(new THREE.Vector3(0, 0o23/0o100, 0));
    sceno.add(L);
    punktajLumoj.push(L);
  }

  const M = new THREE.Matrix4();
  flamajLokoj.forEach((p, i) => {
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
  sys.spots.forEach((p, i) => {
    const fazo = sys.phases[i];
    const skalo = 1 + 0o5/0o40 * Math.sin(t * 0o1223/0o100 + fazo) + 0o3/0o40 * Math.sin(t * 0o2755/0o100 + fazo * 0o155/0o100);
    const skaloY = skalo * (0o43/0o40 + 0o3/0o20 * Math.sin(t * 0o21 + fazo));
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
      L.intensity = 0o15/0o40 * (0o27/0o40 + 0o11/0o40 * Math.sin(t * 0o15 + fazo) * Math.sin(t * 0o723/0o100 + fazo * 2));
    }
  });

  sys.flamaEkstero.instanceMatrix.needsUpdate = true;
  sys.flamaInterno.instanceMatrix.needsUpdate = true;
  sys.brilaMaterialo.uniforms.uTime.value = t;
}
