// ≺⧼ ទឹក 🌊 ⧽≻
import * as THREE from "three";
import { glataPaso } from "../../kantaoj/mondo/tereno.js";
import { kreiBuferanGeometrion } from "../komunajxoj/kunfandajxoj.js";

export type RiverData = { mesh: THREE.Mesh; waterSurfaceY: ( x: number, z: number ) => number };

export function konstruiRiveron(sceno: THREE.Scene,
  riverFn: ( x: number ) => number,
  akvoY: ( x: number ) => number,
  duonaLargho: number,
  xStart: number,
  xEnd: number,
  steps: number,
  altecoFn: ( x: number, z: number ) => number
): RiverData {
  return konstruiRiveronLaŭAkso(sceno, riverFn, akvoY, duonaLargho, xStart, xEnd, steps, altecoFn, false);
}

export function konstruiRiveronNordan(sceno: THREE.Scene,
  riverFn: ( z: number ) => number,
  akvoY: ( z: number ) => number,
  duonaLargho: number,
  zStart: number,
  zEnd: number,
  steps: number,
  altecoFn: ( x: number, z: number ) => number
): RiverData {
  return konstruiRiveronLaŭAkso(sceno, riverFn, akvoY, duonaLargho, zStart, zEnd, steps, altecoFn, true, 0o20);
}

function konstruiRiveronLaŭAkso(sceno: THREE.Scene,
  riverFn: ( t: number ) => number,
  akvoY: ( t: number ) => number,
  duonaLargho: number,
  tStart: number,
  tEnd: number,
  steps: number,
  altecoFn: ( x: number, z: number ) => number,
  lauZ: boolean,
  fontaMallarĝiĝo = 0
): RiverData {
  const pts: THREE.Vector3[] = [];
  for ( let i = 0; i <= steps; i++ ) {
    const t = tStart + ( tEnd - tStart ) * i / steps;
    pts.push(lauZ
      ? new THREE.Vector3(riverFn(t), akvoY(t) + 0o1/0o20, t)
      : new THREE.Vector3(t, akvoY(t) + 0o1/0o20, riverFn(t)));
  }
  const buŝaMallarĝiĝo = ( t: number ) =>
    glataPaso(tEnd, tEnd + 0o40, t) * ( fontaMallarĝiĝo > 0 ? 1 - glataPaso(tStart - fontaMallarĝiĝo, tStart, t) : 1 );
  const larghoFn = ( i: number ) => buŝaMallarĝiĝo(lauZ ? pts[i].z : pts[i].x);

  const { geometry } = konstruiRubandon(pts, duonaLargho, 0, larghoFn);
  const materialo = kreiOndanAkvanMaterialon();
  const mesh = new THREE.Mesh(geometry, materialo);
  mesh.renderOrder = 0;
  sceno.add(mesh);

  const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
  const uv = geometry.getAttribute("uv") as THREE.BufferAttribute;
  for ( let v = 0; v < pos.count; v++ ) {
    const t = lauZ ? pos.getZ(v) : pos.getX(v);
    uv.setY(v, Math.max(0, akvoY(t) - altecoFn(pos.getX(v), pos.getZ(v))));
  }
  uv.needsUpdate = true;

  return { mesh, waterSurfaceY: lauZ
    ? ( _x: number, z: number ) => akvoY(z)
    : ( x: number, _z: number ) => akvoY(x) };
}

export function konstruiLagon(sceno: THREE.Scene,
  cx: number, cz: number, radio: ( ang: number ) => number, akvoNivelo: number,
  altecoFn: ( x: number, z: number ) => number
): RiverData {
  const segmentoj = 0o60, ringoj = 0o10;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let j = 0; j <= ringoj; j++ ) {
    const f = j / ringoj;
    for ( let i = 0; i <= segmentoj; i++ ) {
      const ang = i / segmentoj * Math.PI * 2;
      const r = j === 0 ? 0 : radio(ang) * f;
      const x = cx + Math.cos(ang) * r;
      const z = cz + Math.sin(ang) * r;
      pozicioj.push(x, akvoNivelo + 0o1/0o20, z);
      uvoj.push(0o1/0o2 + 0o1/0o2 * f, Math.max(0, akvoNivelo - altecoFn(x, z)));
    }
  }
  for ( let j = 0; j < ringoj; j++ ) {
    for ( let i = 0; i < segmentoj; i++ ) {
      const a = j * ( segmentoj + 1 ) + i, b = a + 1;
      const c = a + segmentoj + 1, d = c + 1;
      indeksoj.push(a, b, d, a, d, c);
    }
  }
  const geometrio = kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
  const materialo = kreiOndanAkvanMaterialon();
  const mesh = new THREE.Mesh(geometrio, materialo);
  mesh.renderOrder = 0;
  sceno.add(mesh);

  return { mesh, waterSurfaceY: ( _x: number, _z: number ) => akvoNivelo };
}

export function konstruiRubandon(points: THREE.Vector3[],
  duonaLargho: number,
  yLift: number,
  larghoFn?: ( i: number, N: number ) => number
): { geometry: THREE.BufferGeometry; samples: THREE.Vector3[] } {
  const N = points.length;
  const posArr = new Float32Array(N * 2 * 3);
  const uvArr = new Float32Array(N * 2 * 2);
  const indico: number[] = [];
  const up = new THREE.Vector3(0, 1, 0);
  const samples: THREE.Vector3[] = [];

  for ( let i = 0; i < N; i++ ) {
    const p = points[i];
    const pn = points[Math.min(i + 1, N - 1)];
    const pp = points[Math.max(i - 1, 0)];
    const tan = new THREE.Vector3(pn.x - pp.x, 0, pn.z - pp.z).normalize();
    const side = new THREE.Vector3().crossVectors(up, tan).normalize();
    const y = p.y + yLift;
    const w = duonaLargho * ( larghoFn ? larghoFn(i, N) : 1 );

    posArr.set([
      p.x - side.x * w, y, p.z - side.z * w,
      p.x + side.x * w, y, p.z + side.z * w,
    ], i * 6);
    uvArr.set([ 0, i / ( N - 1 ), 1, i / ( N - 1 ) ], i * 4);

    if ( i < N - 1 ) {
      const a = i * 2;
      indico.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    if ( i % 4 === 0 ) samples.push(p.clone());
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uvArr, 2));
  g.setIndex(indico);
  g.computeVertexNormals();
  return { geometry: g, samples };
}

export function konstruiSkulptitanAkvon(sceno: THREE.Scene,
  x0: number, z0: number, x1: number, z1: number, paso: number,
  maskFn: ( x: number, z: number ) => boolean,
  niveloFn: ( x: number, z: number ) => number,
  altecoFn: ( x: number, z: number ) => number
): RiverData {
  // ⟨ ការបង្កើនដង់ស៊ីតេ 📃 ⟩
  const densigo = 0o3;
  const sx = paso / densigo;
  const nx = Math.max(0o2, Math.round(( x1 - x0 ) / sx));
  const nz = Math.max(0o2, Math.round(( z1 - z0 ) / sx));
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const maskoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let j = 0; j <= nz; j++ ) {
    for ( let i = 0; i <= nx; i++ ) {
      const x = x0 + ( x1 - x0 ) * i / nx;
      const z = z0 + ( z1 - z0 ) * j / nz;
      const tero = altecoFn(x, z);
      const nivelo = niveloFn(x, z);
      const profundo = nivelo - tero;
      // ⟨ ទឹកលេចឡើងតែពេលដីទាបជាងកម្រិតទឹក 📃 ⟩
      pozicioj.push(x, nivelo + 0o1/0o20, z);
      uvoj.push(0o1/0o2, Math.max(0, profundo));
      maskoj.push(profundo > 0 ? 1 : 0);
    }
  }
  for ( let j = 0; j < nz; j++ ) {
    for ( let i = 0; i < nx; i++ ) {
      const a = j * ( nx + 1 ) + i, b = a + 1;
      const c = a + nx + 1, d = c + 1;
      indeksoj.push(a, b, d, a, d, c);
    }
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
  geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 2));
  geometrio.setAttribute("aAkvo", new THREE.BufferAttribute(new Float32Array(maskoj), 1));
  geometrio.setIndex(indeksoj);
  geometrio.computeVertexNormals();
  const materialo = kreiOndanAkvanMaterialon(true);
  const mesh = new THREE.Mesh(geometrio, materialo);
  mesh.renderOrder = 0;
  sceno.add(mesh);
  return { mesh, waterSurfaceY: niveloFn };
}

function kreiOndanAkvanMaterialon(maskita = false): THREE.ShaderMaterial {
  const maskaVertico = maskita ? "attribute float aAkvo;\nvarying float vAkvo;\n" : "";
  const maskaVerticoKodo = maskita ? "vAkvo = aAkvo;\n" : "";
  const maskaFragmento = maskita ? "varying float vAkvo;\n" : "";
  const maskaKodo = "";
  const profundaKodo = maskita ? "if ( profundo <= 0.015625 ) discard;\n" : "";
  const malprofundaKodo = maskita
    ? "alpha *= smoothstep( 0.0, 0.0625, profundo );\n"
    : "";
  const bordaKodo = maskita
    ? "float bordaF = 1.0 - smoothstep( 0.02, 0.14, profundo );"
    : "float bordaF = 1.0 - smoothstep( 1.0, 3.0, profundo );";
  return new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uColorDeep: { value: new THREE.Color(0x083838) },
      uColorShallow: { value: new THREE.Color(0x286858) },
      uColorRipple: { value: new THREE.Color(0x387868) },
      uSunDir: { value: new THREE.Vector3(0o4/0o10, 0o63/0o100, 0o23/0o100).normalize() },
    },
    vertexShader: `${maskaVertico}
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vHeight;

      void main() {
        vUv = uv;
        ${maskaVerticoKodo}
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;

        float wave1 = sin(worldPos.x * 0.140625 + worldPos.z * 0.09375 + uTime * 0.703125) * 0.1875;
        float wave2 = sin(worldPos.x * 0.078125 - worldPos.z * 0.125 + uTime * 1.09375 + 1.3125) * 0.140625;
        float wave3 = sin((worldPos.x + worldPos.z) * 0.046875 + uTime * 0.5 + 2.125) * 0.078125;
        float wave4 = sin(worldPos.x * 0.1875 + worldPos.z * 0.0625 + uTime * 0.90625 + 0.703125) * 0.0625;
        float wave5 = cos((worldPos.x - worldPos.z) * 0.09375 + uTime * 0.59375 + 3.6875) * 0.046875;
        float displacement = wave1 + wave2 + wave3 + wave4 + wave5;
        displacement *= smoothstep( 0.0, 0.5, max( 0.0, uv.y ) );
        vHeight = displacement;

        // ⟨ ន័រម៉ាល់មកពីបំណែក 📃 ⟩
        vec3 displacedPos = position + normal * displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPos, 1.0);
      }
    `,
    fragmentShader: `${maskaFragmento}
      uniform vec3 uColorDeep;
      uniform vec3 uColorShallow;
      uniform vec3 uColorRipple;
      uniform vec3 uSunDir;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vHeight;

      // ⟨ ន័រម៉ាល់រលកក្នុងភិចសែល 📃 ⟩
      vec3 ondaNormalo( vec3 p, float t ) {
        float c1 = cos(p.x * 0.140625 + p.z * 0.09375 + t * 0.703125);
        float c2 = cos(p.x * 0.078125 - p.z * 0.125 + t * 1.09375 + 1.3125);
        float c3 = cos((p.x + p.z) * 0.046875 + t * 0.5 + 2.125);
        float c4 = cos(p.x * 0.1875 + p.z * 0.0625 + t * 0.90625 + 0.703125);
        float s5 = sin((p.x - p.z) * 0.09375 + t * 0.59375 + 3.6875);
        float dx = 0.1875 * 0.140625 * c1 + 0.140625 * 0.078125 * c2
          + 0.078125 * 0.046875 * c3 + 0.0625 * 0.1875 * c4 - 0.046875 * 0.09375 * s5;
        float dz = 0.1875 * 0.09375 * c1 - 0.140625 * 0.125 * c2
          + 0.078125 * 0.046875 * c3 + 0.0625 * 0.0625 * c4 + 0.046875 * 0.09375 * s5;
        float s6 = sin(p.x * 0.625 + p.z * 0.4375 + t * 2.5);
        float s7 = sin(p.x * 0.3125 - p.z * 0.8125 + t * 3.25);
        float c8 = cos((p.x - p.z) * 1.1875 + t * 4.5);
        dx += -0.02 * 0.625 * s6 - 0.016 * 0.3125 * s7 + 0.012 * 1.1875 * c8;
        dz += -0.02 * 0.4375 * s6 + 0.016 * 0.8125 * s7 - 0.012 * 1.1875 * c8;
        return normalize(vec3(-dx * 8.0, 1.0, -dz * 8.0));
      }

      void main() {
        ${maskaKodo}
        float profundo = max(0.0, vUv.y);
        ${profundaKodo}

        vec3 sorbado = 1.0 - exp(-profundo * vec3(0.3125, 0.1875, 0.125));   // 5/32, 3/16, 1/8
        vec3 baseColor = mix(uColorShallow, uColorDeep, sorbado);

        float wavePattern = 0.5 + 0.5 * sin(vWorldPos.x * 0.1875 + vWorldPos.z * 0.15625 + uTime * 0.5);
        baseColor = mix(baseColor, uColorRipple, wavePattern * 0.078125);

        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        vec3 normal = ondaNormalo(vWorldPos, uTime);
        vec3 halfVec = normalize(viewDir + uSunDir);

        float ndv = max(dot(viewDir, normal), 0.0);
        float fresnel = pow(1.0 - ndv, 4.0);

        // ⟨ ការរអិលព្រះអាទិត្យ 📃 ⟩
        float spec = pow(max(dot(normal, halfVec), 0.0), 128.0) * 0.6875 * (0.5 + 0.5 * fresnel);
        float specWide = pow(max(dot(normal, halfVec), 0.0), 16.0) * 0.09375;

        float shimmer = 0.5 + 0.5 * sin(vWorldPos.x * 0.3125 + vWorldPos.z * 0.25 + uTime * 2.0);
        shimmer *= 0.5 + 0.5 * sin(vWorldPos.x * 0.1875 - vWorldPos.z * 0.3125 + uTime * 1.5);

        vec3 specColor = vec3(0.90625, 0.9375, 0.96875) * (spec + specWide);
        // ⟨ ការឆ្លុះមេឃតាមទិសឆ្លុះ 📃 ⟩
        // ⟨ ពណ៌ខៀវពីរ 📃 ⟩
        vec3 reflekto = reflect(-viewDir, normal);
        float horizonta = pow(1.0 - clamp(abs(reflekto.y), 0.0, 1.0), 3.0);
        vec3 fresnelColor = mix(vec3(0.21875, 0.34375, 0.46875), vec3(0.75, 0.84375, 0.9375), horizonta);

        vec3 finalColor = mix(baseColor, fresnelColor, fresnel * 0.75) + specColor;

        finalColor *= 1.0 + vHeight * 0.09375;

        float alpha = 0.09375 + 0.90625 * (1.0 - exp(-profundo * 0.25));
        alpha = mix(alpha, 1.0, fresnel * 0.5);
        alpha = min(1.0, alpha + shimmer * 0.03125);
        ${malprofundaKodo}

        // ⟨ ពពុះនៅគែម 📃 ⟩
        ${bordaKodo}
        if ( bordaF > 0.0 ) {
          float lapado = 0.5 + 0.5 * sin( vWorldPos.x * 0.4375 + vWorldPos.z * 0.3125 + uTime * 0.875 );
          lapado *= 0.5 + 0.5 * sin( vWorldPos.x * 0.1875 - vWorldPos.z * 0.28125 - uTime * 0.5 );
          float sxauxmo = bordaF * ( 0.25 + 0.75 * lapado ) * 0.4375;
          finalColor = mix( finalColor, vec3( 0.9375, 0.96875, 0.96875 ), sxauxmo );
          alpha = max( alpha, sxauxmo * 0.875 );
        }

        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
  });
}

export function gxisdatigiAkvon(river: RiverData, t: number): void {
  const mat = river.mesh.material as THREE.ShaderMaterial;
  if ( mat.uniforms ) {
    mat.uniforms.uTime.value = t;
  }
}

export function cxuEnAkvo(x: number, z: number, riverFn: ( x: number ) => number, riverHalfWidth: number): boolean {
  const rz = riverFn(x);
  return Math.abs(z - rz) < riverHalfWidth;
}
