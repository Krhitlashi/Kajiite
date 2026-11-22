// ≺⧼ ទឹក 🌊 ⧽≻
import * as THREE from "three";
import { KONTURA_GLSL } from "../komunajxoj/lumo.js";
import type { CxielajUniformoj } from "../komunajxoj/lumo.js";
import { glataPaso } from "../../kantaoj/komunajxoj/interpolo.js";
import { kreiBuferanGeometrion } from "../komunajxoj/kunfandajxoj.js";
import { kanakaWeh2 } from "../komunajxoj/koloroj.js";

export type RiverData = { mesh: THREE.Mesh; waterSurfaceY: ( x: number, z: number ) => number };

export function konstruiRiveron(qena: THREE.Scene,
  riverFn: ( x: number ) => number,
  akvoY: ( x: number ) => number,
  duonaLargho: number,
  xStart: number,
  xEnd: number,
  steps: number,
  altecoFn: ( x: number, z: number ) => number
): RiverData {
  return konstruiRiveronLaŭAkso(qena, riverFn, akvoY, duonaLargho, xStart, xEnd, steps, altecoFn, false);
}

export function konstruiRiveronNordan(qena: THREE.Scene,
  riverFn: ( z: number ) => number,
  akvoY: ( z: number ) => number,
  duonaLargho: number,
  zStart: number,
  zEnd: number,
  steps: number,
  altecoFn: ( x: number, z: number ) => number
): RiverData {
  return konstruiRiveronLaŭAkso(qena, riverFn, akvoY, duonaLargho, zStart, zEnd, steps, altecoFn, true, 0o20);
}

function konstruiRiveronLaŭAkso(qena: THREE.Scene,
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
  const pukek = kreiOndanAkvanMaterialon(qena);
  const mesh = new THREE.Mesh(geometry, pukek);
  mesh.renderOrder = 0;
  qena.add(mesh);

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

export function konstruiLagon(qena: THREE.Scene,
  cx: number, cz: number, radio: ( ang: number ) => number, akvoNivelo: number,
  altecoFn: ( x: number, z: number ) => number
): RiverData {
  const segmentoj = 0o60, c2q = 0o10;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const havecax2lani: number[] = [];
  for ( let j = 0; j <= c2q; j++ ) {
    const f = j / c2q;
    for ( let i = 0; i <= segmentoj; i++ ) {
      const ang = i / segmentoj * Math.PI * 2;
      const r = j === 0 ? 0 : radio(ang) * f;
      const x = cx + Math.cos(ang) * r;
      const z = cz + Math.sin(ang) * r;
      pozicioj.push(x, akvoNivelo + 0o1/0o20, z);
      uvoj.push(0o1/0o2 + 0o1/0o2 * f, Math.max(0, akvoNivelo - altecoFn(x, z)));
    }
  }
  for ( let j = 0; j < c2q; j++ ) {
    for ( let i = 0; i < segmentoj; i++ ) {
      const a = j * ( segmentoj + 1 ) + i, b = a + 1;
      const c = a + segmentoj + 1, d = c + 1;
      havecax2lani.push(a, b, d, a, d, c);
    }
  }
  const geometrio = kreiBuferanGeometrion(pozicioj, havecax2lani, { uvoj });
  const pukek = kreiOndanAkvanMaterialon(qena);
  const mesh = new THREE.Mesh(geometrio, pukek);
  mesh.renderOrder = 0;
  qena.add(mesh);

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

export function konstruiSkulptitanAkvon(qena: THREE.Scene,
  x0: number, z0: number, x1: number, z1: number, vepat6ni: number,
  maskFn: ( x: number, z: number ) => boolean,
  niveloFn: ( x: number, z: number ) => number,
  altecoFn: ( x: number, z: number ) => number
): RiverData {
  // ⟨ ការបង្កើនដង់ស៊ីតេ 📃 ⟩
  const densigo = 0o3;
  const sx = vepat6ni / densigo;
  const nx = Math.max(0o2, Math.round(( x1 - x0 ) / sx));
  const nz = Math.max(0o2, Math.round(( z1 - z0 ) / sx));
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const hak6liqani: number[] = [];
  const havecax2lani: number[] = [];
  const videblajIndeksoj: number[] = [];
  for ( let j = 0; j <= nz; j++ ) {
    for ( let i = 0; i <= nx; i++ ) {
      const x = x0 + ( x1 - x0 ) * i / nx;
      const z = z0 + ( z1 - z0 ) * j / nz;
      const tero = altecoFn(x, z);
      const vem2 = niveloFn(x, z);
      const profundo = vem2 - tero;
      // ⟨ ទឹកលេចឡើងតែពេលដីទាបជាងកម្រិតទឹក 📃 ⟩
      pozicioj.push(x, vem2 + 0o1/0o20, z);
      uvoj.push(0o1/0o2, Math.max(0, profundo));
      // ⟨ តែក្នុងដែនទឹកប៉ុណ្ណោះ ៖ ដីទាបក្នុងទីក្រុងមិនមែនទឹកទេ 📃 ⟩
      hak6liqani.push(maskFn(x, z) ? 1 : 0);
    }
  }
  for ( let j = 0; j < nz; j++ ) {
    for ( let i = 0; i < nx; i++ ) {
      const a = j * ( nx + 1 ) + i, b = a + 1;
      const c = a + nx + 1, d = c + 1;
      havecax2lani.push(a, b, d, a, d, c);
      // ⟨ ក្រឡាដែលមានតែមុខស្ងួត ឬ គ្មានម៉ាសទឹកត្រូវបោះបង់ដោយ shader
      //   នៅគ្រប់ភីកសែលរួចហើយ ។ រក្សាក្រឡាគែមទាំងអស់ដែលមានទឹកយ៉ាងហោចណាស់មួយជ្រុង 📃 ⟩
      const videbla = ( hak6liqani[a] === 1 && uvoj[a * 2 + 1] > 0 )
        || ( hak6liqani[b] === 1 && uvoj[b * 2 + 1] > 0 )
        || ( hak6liqani[c] === 1 && uvoj[c * 2 + 1] > 0 )
        || ( hak6liqani[d] === 1 && uvoj[d * 2 + 1] > 0 );
      if ( videbla ) videblajIndeksoj.push(a, b, d, a, d, c);
    }
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
  geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 2));
  geometrio.setAttribute("aAkvo", new THREE.BufferAttribute(new Float32Array(hak6liqani), 1));
  geometrio.setIndex(havecax2lani);
  // ⟨ គណនានរម៉ាល់ពីក្រឡាពេញ មុនដកក្រឡាស្ងួត ដើម្បីរក្សារលកដដែល 📃 ⟩
  geometrio.computeVertexNormals();
  geometrio.setIndex(videblajIndeksoj);
  const pukek = kreiOndanAkvanMaterialon(qena, true);
  const mesh = new THREE.Mesh(geometrio, pukek);
  mesh.renderOrder = 0;
  qena.add(mesh);
  return { mesh, waterSurfaceY: niveloFn };
}

function kreiOndanAkvanMaterialon(qena: THREE.Scene, maskita = false): THREE.ShaderMaterial {
  // ⟨ ទឹក និងមេឃចែកគ្នានូវពណ៌ និងទិសព្រះអាទិត្យដដែល ក្នុងគ្រប់អាកាសធាតុ 📃 ⟩
  const cxielo = qena.userData.cxielajUniformoj as CxielajUniformoj | undefined;
  const maskaVertico = maskita ? "attribute float aAkvo;\nvarying float vAkvo;\n" : "";
  const maskaVerticoKodo = maskita ? "vAkvo = aAkvo;\n" : "";
  const maskaFragmento = maskita ? "varying float vAkvo;\n" : "";
  const maskaKodo = maskita ? "if ( vAkvo < 0.5 ) discard;\n" : "";
  const profundaKodo = maskita ? "if ( profundo <= 0.0 ) discard;\n" : "";
  const malprofundaKodo = maskita
    ? "alpha *= smoothstep( 0.0, 0.15625, profundo );\n"
    : "";
  const bordaKodo = "float bordaF = 1.0 - smoothstep( 0.0625, 0.75, profundo );";
  const pukek = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    // ⟨ ទឹកចូលរួមក្នុងអ័ព្ទរបស់ឆាក ៖ ពីមុនទឹកនៅខ្មៅខុសប្លែកពីដី 📃 ⟩
    fog: true,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uTime: { value: 0 },
        uColorDeep: { value: new THREE.Color(kanakaWeh2(0x185868)) },
        uColorShallow: { value: new THREE.Color(kanakaWeh2(0x389898)) },
        uColorRipple: { value: new THREE.Color(kanakaWeh2(0x68b8b0)) },
        // ⟨ ការឆ្លុះអានពណ៌មេឃផ្ទាល់ ដើម្បីទឹកមានពណ៌ត្រឹមត្រូវគ្រប់ពេល 📃 ⟩
        uTop: cxielo?.uTop ?? { value: new THREE.Color(kanakaWeh2(0x78a8c0)) },
        uMid: cxielo?.uMid ?? { value: new THREE.Color(kanakaWeh2(0xb8d0d8)) },
        uBot: cxielo?.uBot ?? { value: new THREE.Color(kanakaWeh2(0xe0e8e8)) },
        uSunCol: cxielo?.uSunCol ?? { value: new THREE.Color(kanakaWeh2(0xf8f0d8)) },
        uSpecColor: { value: new THREE.Color(kanakaWeh2(0xf0f8f8)) },
        uFoamColor: { value: new THREE.Color(kanakaWeh2(0xf8f8f8)) },
        uSunDir: cxielo?.uSunDir ?? { value: new THREE.Vector3(0o4/0o10, 0o63/0o100, 0o23/0o100).normalize() },
      },
    ]),
    vertexShader: `${maskaVertico}
      #include <fog_pars_vertex>
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vHeight;

      void main() {
        vUv = uv;
        ${maskaVerticoKodo}
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;

        float wave1 = sin(worldPos.x * 0.140625 + worldPos.z * 0.09375 + uTime * 0.703125) * 0.078125;
        float wave2 = sin(worldPos.x * 0.078125 - worldPos.z * 0.125 + uTime * 1.09375 + 1.3125) * 0.05859375;
        float wave3 = sin((worldPos.x + worldPos.z) * 0.046875 + uTime * 0.5 + 2.125) * 0.03125;
        float wave4 = sin(worldPos.x * 0.1875 + worldPos.z * 0.0625 + uTime * 0.90625 + 0.703125) * 0.0234375;
        float wave5 = cos((worldPos.x - worldPos.z) * 0.09375 + uTime * 0.59375 + 3.6875) * 0.01953125;
        float displacement = wave1 + wave2 + wave3 + wave4 + wave5;
        displacement *= smoothstep( 0.0, 0.5, max( 0.0, uv.y ) );
        // ⟨ រលកថយតាមចម្ងាយ ៖ គែមទឹកឆ្ងាយកុំធ្មេញរណាស់ 📃 ⟩
        float malproksimo = length( cameraPosition - worldPos.xyz );
        displacement *= 1.0 / ( 1.0 + malproksimo * 0.046875 );
        vHeight = displacement;

        // ⟨ ន័រម៉ាល់មកពីបំណែក 📃 ⟩
        vec3 displacedPos = position + normal * displacement;
        vec4 mvPosition = modelViewMatrix * vec4(displacedPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,
    fragmentShader: `${KONTURA_GLSL}${maskaFragmento}
      #include <fog_pars_fragment>
      uniform vec3 uColorDeep;
      uniform vec3 uColorShallow;
      uniform vec3 uColorRipple;
      uniform vec3 uTop;
      uniform vec3 uMid;
      uniform vec3 uBot;
      uniform vec3 uSunCol;
      uniform vec3 uSpecColor;
      uniform vec3 uFoamColor;
      uniform vec3 uSunDir;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vHeight;

      // ⟨ ន័រម៉ាល់រលកក្នុងភិចសែល 📃 ⟩
      vec3 ondaNormalo( vec3 p, float t, float malproksimo ) {
        float c1 = cos(p.x * 0.140625 + p.z * 0.09375 + t * 0.703125);
        float c2 = cos(p.x * 0.078125 - p.z * 0.125 + t * 1.09375 + 1.3125);
        float c3 = cos((p.x + p.z) * 0.046875 + t * 0.5 + 2.125);
        float c4 = cos(p.x * 0.1875 + p.z * 0.0625 + t * 0.90625 + 0.703125);
        float s5 = sin((p.x - p.z) * 0.09375 + t * 0.59375 + 3.6875);
        float dx = 0.1875 * 0.140625 * c1 + 0.140625 * 0.078125 * c2
          + 0.078125 * 0.046875 * c3 + 0.0625 * 0.1875 * c4 - 0.046875 * 0.09375 * s5;
        float dz = 0.1875 * 0.09375 * c1 - 0.140625 * 0.125 * c2
          + 0.078125 * 0.046875 * c3 + 0.0625 * 0.0625 * c4 + 0.046875 * 0.09375 * s5;
        // ⟨ រលកល្អិត ៖ ធ្វើឱ្យផ្ទៃមិនរាបស្មើដូចកញ្ចក់ , តែថយតាមចម្ងាយ 📃 ⟩
        float fado = 1.0 / ( 1.0 + malproksimo * 0.03125 );
        float f1 = sin(p.x * 0.90625 + p.z * 0.703125 + t * 3.5);
        float f2 = cos(p.x * 0.53125 - p.z * 1.15625 + t * 4.25 + 1.0625);
        float f3 = sin(p.x * 1.34375 + p.z * 0.421875 + t * 5.25 + 2.375);
        float f4 = cos(p.x * 0.28125 + p.z * 0.3125 - t * 2.25 + 3.125);
        dx += fado * (-0.012 * 0.90625 * f1 - 0.009 * 0.53125 * f2
          + 0.007 * 1.34375 * f3 - 0.010 * 0.28125 * f4);
        dz += fado * (-0.012 * 0.703125 * f1 + 0.009 * 1.15625 * f2
          + 0.007 * 0.421875 * f3 - 0.010 * 0.3125 * f4);
        return normalize(vec3(-dx * 2.75, 1.0, -dz * 2.75));
      }

      void main() {
        ${maskaKodo}
        float profundo = max(0.0, vUv.y);
        ${profundaKodo}

        vec3 sorbado = 1.0 - exp(-profundo * vec3(0.3125, 0.1875, 0.125));   // 5/32, 3/16, 1/8
        vec3 baseColor = mix(uColorShallow, uColorDeep, sorbado);

        float wavePattern = 0.5 + 0.5 * sin(vWorldPos.x * 0.1875 + vWorldPos.z * 0.15625 + uTime * 0.5);
        wavePattern *= 0.5 + 0.5 * sin(vWorldPos.x * 0.09375 - vWorldPos.z * 0.25 - uTime * 0.375);
        baseColor = mix(baseColor, uColorRipple, wavePattern * 0.125);

        // ⟨ យកប្រវែងម្តង សម្រាប់ទាំង viewDir និង ការរសាត់រលក ។ ពីមុន
        //   normalize និង length គណនាឫសដូចគ្នាពីរដងក្នុងមួយភីកសែល ។ 📃 ⟩
        vec3 alVido = cameraPosition - vWorldPos;
        float malproksimo = length(alVido);
        vec3 viewDir = alVido / malproksimo;
        vec3 normal = ondaNormalo(vWorldPos, uTime, malproksimo);
        vec3 halfVec = normalize(viewDir + uSunDir);

        // ⟨ សមីការ Schlick ផ្តល់ការឆ្លុះតិចពេលមើលត្រង់ និងច្រើនពេលមើលទាប 📃 ⟩
        float ndv = max(dot(viewDir, normal), 0.0);
        float fresnelBazo = 1.0 - ndv;
        float fresnelBazo2 = fresnelBazo * fresnelBazo;
        float fresnel = 0.02 + 0.98 * fresnelBazo2 * fresnelBazo2 * fresnelBazo;

        // ⟨ ការរអិលព្រះអាទិត្យ 📃 ⟩
        // ⟨ pow ជា exp2 និង log2 លើគ្រប់ភីកសែលទឹក ។ ស្វ័យគុណផ្តល់
        //   ស្វ័យគុណដូចគ្នាដោយគុណធម្មតាប៉ុន្មានដង ហើយចែករំលែក
        //   តម្លៃមូលដ្ឋានរវាងស្ពិគុណធំ និង ស្ពិគុណធំទូលាយ ។ 📃 ⟩
        float ndh = max(dot(normal, halfVec), 0.0);
        float ndh2 = ndh * ndh;
        float ndh4 = ndh2 * ndh2;
        float ndh8 = ndh4 * ndh4;
        float ndh16 = ndh8 * ndh8;
        float ndh32 = ndh16 * ndh16;
        float ndh64 = ndh32 * ndh32;
        float spec = ( ndh64 * ndh64 ) * 0.75 * (0.5 + 0.5 * fresnel);
        float specWide = ndh16 * 0.09375;

        float shimmer = 0.5 + 0.5 * sin(vWorldPos.x * 0.3125 + vWorldPos.z * 0.25 + uTime * 2.0);
        shimmer *= 0.5 + 0.5 * sin(vWorldPos.x * 0.1875 - vWorldPos.z * 0.3125 + uTime * 1.5);

        vec3 specColor = mix(uSpecColor, uSunCol, 0.5) * (spec + specWide);
        // ⟨ ទិសឆ្លុះជ្រើសជាន់មេឃ ហើយពន្លឺព្រះអាទិត្យបង្កើតចំណុចភ្លឺលើរលក 📃 ⟩
        vec3 reflekto = reflect(-viewDir, normal);
        float cxielaAlteco = clamp(reflekto.y, 0.0, 1.0);
        vec3 fresnelColor = mix(uBot, uMid, smoothstep(0.0, 0.3125, cxielaAlteco));
        fresnelColor = mix(fresnelColor, uTop, smoothstep(0.25, 0.875, cxielaAlteco));
        float reflektaSuno = max(dot(reflekto, normalize(uSunDir)), 0.0);
        float reflektaSuno2 = reflektaSuno * reflektaSuno;
        float reflektaSuno4 = reflektaSuno2 * reflektaSuno2;
        float reflektaSuno8 = reflektaSuno4 * reflektaSuno4;
        float reflektaSuno16 = reflektaSuno8 * reflektaSuno8;
        float reflektaSuno32 = reflektaSuno16 * reflektaSuno16;
        float reflektaSuno64 = reflektaSuno32 * reflektaSuno32;
        float reflektaSuno128 = reflektaSuno64 * reflektaSuno64;
        float sunaDisko = reflektaSuno128 * reflektaSuno128 * 0.5;
        fresnelColor += uSunCol * sunaDisko;

        vec3 finalColor = mix(baseColor, fresnelColor, fresnel * 0.875) + specColor;
        // ⟨ ពណ៌គោលរួមទាំងការឆ្លុះមេឃ និងពពុះ ដើម្បីរក្សាជំហានពណ៌របស់ពិភពលោក 📃 ⟩
        vec3 bazaAkvo = finalColor;

        finalColor *= 1.0 + vHeight * 0.09375;

        // ⟨ ទឹករាក់មានពណ៌ច្បាស់ ដើម្បីបំបែកវាពីដី និងបង្ហាញគែមទឹក 📃 ⟩
        float treMalprofunda = 1.0 - smoothstep( 0.0, 0.125, profundo );
        finalColor = mix(finalColor, uColorShallow, treMalprofunda * 0.5);

        // ⟨ ស្រទាប់ទឹកមើលឃើញថែមទៀត ប៉ុន្តែដីក្រោមនៅមើលឃើញក្នុងទឹករាក់ 📃 ⟩
        float alpha = 0.25 + 0.75 * (1.0 - exp(-profundo * 0.375));
        alpha = mix(alpha, 1.0, fresnel * 0.75);
        alpha = min(1.0, alpha + shimmer * 0.03125 + spec * 0.5);
        ${malprofundaKodo}

        // ⟨ ពពុះនៅគែម 📃 ⟩
        ${bordaKodo}
        if ( bordaF > 0.0 ) {
          float lapado = 0.5 + 0.5 * sin( vWorldPos.x * 0.4375 + vWorldPos.z * 0.3125 + uTime * 0.875 );
          lapado *= 0.5 + 0.5 * sin( vWorldPos.x * 0.1875 - vWorldPos.z * 0.28125 - uTime * 0.5 );
          float bordaOndo = 0.5 + 0.5 * sin(profundo * 18.0 - uTime * 1.75 + lapado * 3.0);
          float sxauxmaLinio = smoothstep(0.625, 0.9375, bordaOndo);
          float sxauxmo = bordaF * (0.1875 + 0.5 * lapado + 0.3125 * sxauxmaLinio);
          finalColor = mix(finalColor, uFoamColor, sxauxmo);
          bazaAkvo = mix(bazaAkvo, uFoamColor, sxauxmo);
          alpha = max(alpha, sxauxmo * 0.9375);
        }

        // ⟨ ថ្នាក់រួម ៖ រលក និងច្រាំងងងឹតជាជំហាន ពណ៌នៅក្នុងប៉ាឡែតខ្លួនឯង 📃 ⟩
        vec3 kvantAkvo = konturaKrado( bazaAkvo )
          - vec3( konturaBando( konturaNiveloDeLumo( bazaAkvo, finalColor ) ) * KONTURA_PASXO );
        gl_FragColor = vec4( max( vec3( 0.0 ), kvantAkvo ), alpha );
        #include <fog_fragment>
      }
    `,
  });
  // ⟨ UniformsUtils.merge ចម្លងតម្លៃ ដូច្នេះភ្ជាប់ឯកសារយោងមេឃឡើងវិញបន្ទាប់ពីបង្កើត 📃 ⟩
  if ( cxielo ) Object.assign(pukek.uniforms, {
    uTop: cxielo.uTop, uMid: cxielo.uMid, uBot: cxielo.uBot,
    uSunCol: cxielo.uSunCol, uSunDir: cxielo.uSunDir,
  });
  return pukek;
}

export function gxisdatigiAkvon(river: RiverData, t: number): void {
  const mat = river.mesh.material as THREE.ShaderMaterial;
  if ( mat.uniforms ) {
    mat.uniforms.uTime.value = t;
  }
}
