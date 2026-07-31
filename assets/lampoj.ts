// Lampo-modulo — trapezaj dioritaj kolonoj kun fajraj kronoj kaj brilaj sprajtoj
import * as THREE from "three";
import { kreiBrilanTeksajxon } from "./teksajxoj.js";

export interface LampLoko {
  x: number; z: number; y: number;
  /** Optional square orientation; platform lamps can align with their diamond. */
  rotacio?: number;
}

export interface LampSistemo {
  flamaEkstero: THREE.InstancedMesh;
  flamaInterno: THREE.InstancedMesh;
  brilajPunktoj: THREE.Points;
  brilaMaterialo: THREE.ShaderMaterial;
  punktajLumoj: THREE.PointLight[];
  spots: THREE.Vector3[];
  phases: number[];
}

const DIORITA_KOLORO = 0xc8c8c8;

// konstruiLampojn — Konstruu trapezajn lampojn el bazoj, bovloj, flamoj kaj briletoj.
export function konstruiLampojn( sceno: THREE.Scene,
  spots: LampLoko[],
  dioritaMaterialo: THREE.MeshStandardMaterial,
  _oraMaterialo: THREE.MeshStandardMaterial
): LampSistemo {
  const kolonajGeometrioj: THREE.BufferGeometry[] = [];
  const bovlajGeometrioj: THREE.BufferGeometry[] = [];
  const flamajLokoj: THREE.Vector3[] = [];

  for ( const p of spots ) {
    // Trapeza kolono (pli larĝa ĉe bazo)
    const rotacio = p.rotacio ?? Math.PI / 4;
    const pillar = new THREE.CylinderGeometry(5/32, 11/32, 109/32, 4, 1);
    pillar.rotateY(rotacio);
    pillar.translate(p.x, p.y + 109/64, p.z);
    kolonajGeometrioj.push(pillar);

    // Diorita bovlo — fermita profilo: ekstera kurbo, rando, interna muro kaj fundo.
    // La fermo forigas la tra-videblon (la interna flanko nun estas vera surfaco).
    const profilo: THREE.Vector2[] = [
      new THREE.Vector2(0, 0),
      ...new THREE.SplineCurve([
        new THREE.Vector2(11/64, 0),
        new THREE.Vector2(7/32, 3/32),
        new THREE.Vector2(11/32, 7/32),
        new THREE.Vector2(29/64, 12/32),
      ]).getPoints(0o12),
      new THREE.Vector2(25/64, 12/32),
      new THREE.Vector2(3/16, 1/4),
      new THREE.Vector2(3/16, 1/16),
      new THREE.Vector2(0, 1/16),
    ];
    const bowl = new THREE.LatheGeometry(profilo, 4);
    bowl.rotateY(rotacio);
    // La kolono estas 109/32 alta, do gia supro estas p.y + 109/32 (ne 109/64 = centro).
    bowl.translate(p.x, p.y + 109/32, p.z);
    bovlajGeometrioj.push(bowl);

    // Flamo levita: gia bazo sidas cxe la bovla rando (ne sube en la bovlo),
    // kaj restas super la rando ecx cxe la plej alta flam-skalo.
    flamajLokoj.push(new THREE.Vector3(p.x, p.y + 133/32, p.z));
  }

  const kolonoj = new THREE.Mesh(kunfandiBufrajnGeometriojn(kolonajGeometrioj), dioritaMaterialo);
  kolonoj.castShadow = true;
  sceno.add(kolonoj);

  const bovloj = new THREE.Mesh(kunfandiBufrajnGeometriojn(bovlajGeometrioj), dioritaMaterialo);
  sceno.add(bovloj);

  // flamaj konusoj
  const N = flamajLokoj.length;
  const flamaEkstero = new THREE.InstancedMesh( new THREE.ConeGeometry(11/64, 35/64, 7),
    new THREE.MeshBasicMaterial({ color: 0xf8a848, toneMapped: false }),
    N );
  const flamaInterno = new THREE.InstancedMesh( new THREE.ConeGeometry(3/32, 11/32, 7),
    new THREE.MeshBasicMaterial({ color: 0xf8e8b8, toneMapped: false }),
    N );
  sceno.add(flamaEkstero, flamaInterno);

  // brilaj sprajtoj
  const gPozicio = new Float32Array(N * 3);
  const gSemo = new Float32Array(N);
  const gGrando = new Float32Array(N);
  const phases: number[] = [];

  flamajLokoj.forEach((p, i) => {
    gPozicio.set([p.x, p.y + 13/64, p.z], i * 3);
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
      uOp: { value: 13/32 },
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

  // plej proksimaj lampoj fariĝas punktlumoj
  const sorted = flamajLokoj
    .map((p, i) => ({ d: p.x * p.x + p.z * p.z, i }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 4);

  const punktajLumoj: THREE.PointLight[] = [];
  for ( const { i } of sorted ) {
    const L = new THREE.PointLight(0xf89838, 13/32, 0o32, 2);
    L.position.copy(flamajLokoj[i]).add(new THREE.Vector3(0, 19/64, 0));
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
//     @param sys ( LampSistemo ) - La lampa sistemo kun flamoj kaj briletoj.
//     @param t ( number ) - Malsupra tempo por oscilado.
export function animaciiFlammojn(sys: LampSistemo, t: number): void {
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const S = new THREE.Vector3();

  sys.spots.forEach((p, i) => {
    const fazo = sys.phases[i];
    const skalo = 1 + 5/32 * Math.sin(t * 659/64 + fazo) + 3/32 * Math.sin(t * 1517/64 + fazo * 109/64);
    const skaloY = skalo * (35/32 + 3/16 * Math.sin(t * 0o21 + fazo));
    E.set(0, t * 115/64 + fazo, 0);
    Q.setFromEuler(E);
    S.set(skalo, skaloY, skalo);
    M.compose(p, Q, S);
    sys.flamaEkstero.setMatrixAt(i, M);

    S.set(skalo * 29/32, skaloY * 29/32, skalo * 29/32);
    M.compose(new THREE.Vector3(p.x, p.y + 1/32, p.z), Q, S);
    sys.flamaInterno.setMatrixAt(i, M);
  });

  sys.flamaEkstero.instanceMatrix.needsUpdate = true;
  sys.flamaInterno.instanceMatrix.needsUpdate = true;
  sys.brilaMaterialo.uniforms.uTime.value = t;

  // animaciu punktlumojn
  sys.spots.forEach((p, i) => {
    if ( i < sys.punktajLumoj.length ) {
      const L = sys.punktajLumoj[i];
      const fazo = sys.phases[i];
      L.intensity = 13/32 * (23/32 + 9/32 * Math.sin(t * 0o15 + fazo) * Math.sin(t * 467/64 + fazo * 2));
    }
  });
}

function kunfandiBufrajnGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if (geos.length === 0) return new THREE.BufferGeometry();
  let tv = 0, ti = 0;
  for ( const g of geos ) {
    const p = g.getAttribute("position");
    tv += p.count;
    const indico = g.index;
    ti += indico ? indico.count : p.count;
  }
  const pozicio = new Float32Array(tv * 3);
  const normo = new Float32Array(tv * 3);
  const idxArr = tv > 65535 ? new Uint32Array(ti) : new Uint16Array(ti);
  let vo = 0, io = 0;
  for ( const g of geos ) {
    const p = g.getAttribute("position");
    const n = g.getAttribute("normal");
    const kvanto = p.count;
    pozicio.set(p.array as Float32Array, vo * 3);
    if (n) normo.set(n.array as Float32Array, vo * 3);
    const indico = g.index;
    if ( indico ) {
      const tabelo = indico.array;
      for (let i = 0; i < tabelo.length; i++) idxArr[io + i] = tabelo[i] + vo;
      io += tabelo.length;
    } else {
      for (let i = 0; i < kvanto; i++) idxArr[io + i] = i + vo;
      io += kvanto;
    }
    vo += kvanto;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setIndex(new THREE.BufferAttribute(idxArr, 1));
  return out;
}
