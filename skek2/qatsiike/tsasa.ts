// ≺⧼ ſᶘᴜ j͑ʃᴜ 🌊 ⧽≻
import * as THREE from "three";
import { KONTURAGLSL } from "../x2x2q/tsije.js";
import type { CanaUnihaqoxa } from "../x2x2q/tsije.js";
import { glataTona } from "../../kanta/x2x2q/interpolo.js";
import { kf2Bufezacen } from "../x2x2q/hakox2q.js";
import { veb6qaiWeh2 } from "../x2x2q/haweh2.js";

export type RiverData = { mesh: THREE.Mesh; waterSurfaceY: ( x: number, z: number ) => number };

export function vepaqK6si(qena: THREE.Scene,
  riverFn: ( x: number ) => number,
  tsasaY: ( x: number ) => number,
  p2somaniSefini: number,
  xStart: number,
  xEnd: number,
  steps: number,
  l6daFn: ( x: number, z: number ) => number
): RiverData {
  return vepaqK6siLaŭAkso(qena, riverFn, tsasaY, p2somaniSefini, xStart, xEnd, steps, l6daFn, false);
}

export function vepaqK6siNordan(qena: THREE.Scene,
  riverFn: ( z: number ) => number,
  tsasaY: ( z: number ) => number,
  p2somaniSefini: number,
  zStart: number,
  zEnd: number,
  steps: number,
  l6daFn: ( x: number, z: number ) => number
): RiverData {
  return vepaqK6siLaŭAkso(qena, riverFn, tsasaY, p2somaniSefini, zStart, zEnd, steps, l6daFn, true, 0o20);
}

function vepaqK6siLaŭAkso(qena: THREE.Scene,
  riverFn: ( t: number ) => number,
  tsasaY: ( t: number ) => number,
  p2somaniSefini: number,
  tStart: number,
  tEnd: number,
  steps: number,
  l6daFn: ( x: number, z: number ) => number,
  lauZ: boolean,
  tsiqMallarĝiĝo = 0o0
): RiverData {
  const pts: THREE.Vector3[] = [];
  for ( let i = 0o0; i <= steps; i++ ) {
    const t = tStart + ( tEnd - tStart ) * i / steps;
    pts.push(lauZ
      ? new THREE.Vector3(riverFn(t), tsasaY(t) + 0o1/0o20, t)
      : new THREE.Vector3(t, tsasaY(t) + 0o1/0o20, riverFn(t)));
  }
  const w6qaMallarĝiĝo = ( t: number ) =>
    glataTona(tEnd, tEnd + 0o40, t) * ( tsiqMallarĝiĝo > 0o0 ? 0o1 - glataTona(tStart - tsiqMallarĝiĝo, tStart, t) : 0o1 );
  const sefiniFn = ( i: number ) => w6qaMallarĝiĝo(lauZ ? pts[i].z : pts[i].x);

  const { geometry } = vepaqRubandon(pts, p2somaniSefini, 0o0, sefiniFn);
  const pukek = kf2OndanAkvanPukekn(qena);
  const mesh = new THREE.Mesh(geometry, pukek);
  mesh.renderOrder = 0o0;
  qena.add(mesh);

  const hahaxekuxa = geometry.getAttribute("position") as THREE.BufferAttribute;
  const uv = geometry.getAttribute("uv") as THREE.BufferAttribute;
  for ( let v = 0o0; v < hahaxekuxa.count; v++ ) {
    const t = lauZ ? hahaxekuxa.getZ(v) : hahaxekuxa.getX(v);
    uv.setY(v, Math.max(0o0, tsasaY(t) - l6daFn(hahaxekuxa.getX(v), hahaxekuxa.getZ(v))));
  }
  uv.needsUpdate = true;

  return { mesh, waterSurfaceY: lauZ
    ? ( x: number, z: number ) => tsasaY(z)
    : ( x: number, z: number ) => tsasaY(x) };
}

export function vepaqS2xuru(qena: THREE.Scene,
  cx: number, cz: number, cabole: ( ang: number ) => number, tsasaVem2: number,
  l6daFn: ( x: number, z: number ) => number
): RiverData {
  const has2nasce = 0o60, c2q = 0o10;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  for ( let j = 0o0; j <= c2q; j++ ) {
    const f = j / c2q;
    for ( let i = 0o0; i <= has2nasce; i++ ) {
      const ang = i / has2nasce * Math.PI * 0o2;
      const r = j === 0o0 ? 0o0 : cabole(ang) * f;
      const x = cx + Math.cos(ang) * r;
      const z = cz + Math.sin(ang) * r;
      haxekuxa.push(x, tsasaVem2 + 0o1/0o20, z);
      qan2k.push(0o1/0o2 + 0o1/0o2 * f, Math.max(0o0, tsasaVem2 - l6daFn(x, z)));
    }
  }
  for ( let j = 0o0; j < c2q; j++ ) {
    for ( let i = 0o0; i < has2nasce; i++ ) {
      const a = j * ( has2nasce + 0o1 ) + i, b = a + 0o1;
      const c = a + has2nasce + 0o1, d = c + 0o1;
      havecax2lani.push(a, b, d, a, d, c);
    }
  }
  const zace = kf2Bufezacen(haxekuxa, havecax2lani, { qan2k });
  const pukek = kf2OndanAkvanPukekn(qena);
  const mesh = new THREE.Mesh(zace, pukek);
  mesh.renderOrder = 0o0;
  qena.add(mesh);

  return { mesh, waterSurfaceY: ( x: number, z: number ) => tsasaVem2 };
}

export function vepaqRubandon(points: THREE.Vector3[],
  p2somaniSefini: number,
  yLift: number,
  sefiniFn?: ( i: number, N: number ) => number
): { geometry: THREE.BufferGeometry; samples: THREE.Vector3[] } {
  const N = points.length;
  const posArr = new Float32Array(N * 0o2 * 0o3);
  const uvArr = new Float32Array(N * 0o2 * 0o2);
  const vecax2l: number[] = [];
  const up = new THREE.Vector3(0o0, 0o1, 0o0);
  const samples: THREE.Vector3[] = [];

  for ( let i = 0o0; i < N; i++ ) {
    const p = points[i];
    const pn = points[Math.min(i + 0o1, N - 0o1)];
    const pp = points[Math.max(i - 0o1, 0o0)];
    const tan = new THREE.Vector3(pn.x - pp.x, 0o0, pn.z - pp.z).normalize();
    const side = new THREE.Vector3().crossVectors(up, tan).normalize();
    const y = p.y + yLift;
    const w = p2somaniSefini * ( sefiniFn ? sefiniFn(i, N) : 0o1 );

    posArr.set([
      p.x - side.x * w, y, p.z - side.z * w,
      p.x + side.x * w, y, p.z + side.z * w,
    ], i * 0o6);
    uvArr.set([ 0o0, i / ( N - 0o1 ), 0o1, i / ( N - 0o1 ) ], i * 0o4);

    if ( i < N - 0o1 ) {
      const a = i * 0o2;
      vecax2l.push(a, a + 0o1, a + 0o2, a + 0o1, a + 0o3, a + 0o2);
    }
    if ( i % 0o4 === 0o0 ) samples.push(p.clone());
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(posArr, 0o3));
  g.setAttribute("uv", new THREE.BufferAttribute(uvArr, 0o2));
  g.setIndex(vecax2l);
  g.computeVertexNormals();
  return { geometry: g, samples };
}

export function vepaqKnat6keqanuitanTsasa(qena: THREE.Scene,
  x0: number, z0: number, x1: number, z1: number, vepat6ni: number,
  maskFn: ( x: number, z: number ) => boolean,
  vem2Fn: ( x: number, z: number ) => number,
  l6daFn: ( x: number, z: number ) => number
): RiverData {
  // ⟨ ſᶘᴜ j͑ʃᴜ , j͑ʃᴜ ſɭ,w , ⟅ ⟩
  const densigo = 0o3;
  const sx = vepat6ni / densigo;
  const nx = Math.max(0o2, Math.round(( x1 - x0 ) / sx));
  const nz = Math.max(0o2, Math.round(( z1 - z0 ) / sx));
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const hak6liqani: number[] = [];
  const havecax2lani: number[] = [];
  const videblajHavecax2l: number[] = [];
  for ( let j = 0o0; j <= nz; j++ ) {
    for ( let i = 0o0; i <= nx; i++ ) {
      const x = x0 + ( x1 - x0 ) * i / nx;
      const z = z0 + ( z1 - z0 ) * j / nz;
      const t6lima = l6daFn(x, z);
      const vem2 = vem2Fn(x, z);
      const jufu = vem2 - t6lima;
      // ⟨ ſᶘᴜ j͑ʃᴜ , j͑ʃᴜ ſɭэ ɭʃᴜ , ſɭэ ſɭ,w , ⟅ ⟩
      haxekuxa.push(x, vem2 + 0o1/0o20, z);
      qan2k.push(0o1/0o2, Math.max(0o0, jufu));
      // ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , ſɭᴜ ı],ƨɔ , ⟅ ⟩
      hak6liqani.push(maskFn(x, z) ? 0o1 : 0o0);
    }
  }
  for ( let j = 0o0; j < nz; j++ ) {
    for ( let i = 0o0; i < nx; i++ ) {
      const a = j * ( nx + 0o1 ) + i, b = a + 0o1;
      const c = a + nx + 0o1, d = c + 0o1;
      havecax2lani.push(a, b, d, a, d, c);
      // ⟨ ſɭɹ ſןᴜ , j͑ʃɜ ſɭ,ᴜ , ꞙɭɔ , ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
      //   , ꞙɭı , ſɭɹ ſןᴜ , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ⟅ 📃 ⟩
      const videbla = ( hak6liqani[a] === 0o1 && qan2k[a * 0o2 + 0o1] > 0o0 )
        || ( hak6liqani[b] === 0o1 && qan2k[b * 0o2 + 0o1] > 0o0 )
        || ( hak6liqani[c] === 0o1 && qan2k[c * 0o2 + 0o1] > 0o0 )
        || ( hak6liqani[d] === 0o1 && qan2k[d * 0o2 + 0o1] > 0o0 );
      if ( videbla ) videblajHavecax2l.push(a, b, d, a, d, c);
    }
  }
  const zace = new THREE.BufferGeometry();
  zace.setAttribute("position", new THREE.Float32BufferAttribute(haxekuxa, 0o3));
  zace.setAttribute("uv", new THREE.Float32BufferAttribute(qan2k, 0o2));
  zace.setAttribute("aTsasa", new THREE.BufferAttribute(new Float32Array(hak6liqani), 0o1));
  zace.setIndex(havecax2lani);
  // ⟨ ſɭɹ ſןᴜ , j͑ʃɜ ſɭ,ᴜ , ꞙɭı , ſɭᴜ ſןᴜ , ⟅ ⟩
  zace.computeVertexNormals();
  zace.setIndex(videblajHavecax2l);
  const pukek = kf2OndanAkvanPukekn(qena, true);
  const mesh = new THREE.Mesh(zace, pukek);
  mesh.renderOrder = 0o0;
  qena.add(mesh);
  return { mesh, waterSurfaceY: vem2Fn };
}

function kf2OndanAkvanPukekn(qena: THREE.Scene, maskita = false): THREE.ShaderMaterial {
  // ⟨ ſᶘᴜ j͑ʃᴜ , ſɟᴜ }ʃᴜ , ᶅſɔ ֭ſɭɹ , j͑ʃɜ ſᶘɹ , ꞙɭı , ⟅ ⟩
  const cana = qena.userData.canaajUnihaqoxa as CanaUnihaqoxa | undefined;
  const maskaXekuxa = maskita ? "attribute float aTsasa;\nvarying float vTsasa;\n" : "";
  const maskaXekuxaS2kanta = maskita ? "vTsasa = aTsasa;\n" : "";
  const maskaFragmento = maskita ? "varying float vTsasa;\n" : "";
  const maskaS2kanta = maskita ? "if ( vTsasa < 0.5 ) discard;\n" : "";
  const jufuS2kanta = maskita ? "if ( jufu <= 0.0 ) discard;\n" : "";
  const malprofundaS2kanta = maskita
    ? "alpha *= smoothstep( 0.0, 0.15625, jufu );\n"
    : "";
  const bordaS2kanta = "float bordaF = 1.0 - smoothstep( 0.0625, 0.75, jufu );";
  const pukek = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    // ⟨ ſᶘᴜ j͑ʃᴜ , j͑ʃɜ ɭʃɹȝ , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ſɭэ ſɭ,w , ⟅ ⟩
    fog: true,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uTime: { value: 0o0 },
        uColorDeep: { value: new THREE.Color(veb6qaiWeh2(0x185868)) },
        uColorShallow: { value: new THREE.Color(veb6qaiWeh2(0x389898)) },
        uColorRipple: { value: new THREE.Color(veb6qaiWeh2(0x68b8b0)) },
        // ⟨ ᶅſɔ ֭ſɭɹ , ſɟᴜ }ʃᴜ , ſᶘᴜ j͑ʃᴜ , ᶅſɔ ֭ſɭɹ , ꞙɭı ⟅ ⟩
        uTop: cana?.uTop ?? { value: new THREE.Color(veb6qaiWeh2(0x78a8c0)) },
        uMid: cana?.uMid ?? { value: new THREE.Color(veb6qaiWeh2(0xb8d0d8)) },
        uBot: cana?.uBot ?? { value: new THREE.Color(veb6qaiWeh2(0xe0e8e8)) },
        uSunCol: cana?.uSunCol ?? { value: new THREE.Color(veb6qaiWeh2(0xf8f0d8)) },
        uSpecColor: { value: new THREE.Color(veb6qaiWeh2(0xf0f8f8)) },
        uFoamColor: { value: new THREE.Color(veb6qaiWeh2(0xf8f8f8)) },
        uSunDir: cana?.uSunDir ?? { value: new THREE.Vector3(0o4/0o10, 0o63/0o100, 0o23/0o100).normalize() },
      },
    ]),
    vertexShader: `${maskaXekuxa}
      #include <fog_pars_vertex>
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vHeight;

      void main() {
        vUv = uv;
        ${maskaXekuxaS2kanta}
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;

        float wave1 = sin(worldPos.x * 0.140625 + worldPos.z * 0.09375 + uTime * 0.703125) * 0.078125;
        float wave2 = sin(worldPos.x * 0.078125 - worldPos.z * 0.125 + uTime * 1.09375 + 1.3125) * 0.05859375;
        float wave3 = sin((worldPos.x + worldPos.z) * 0.046875 + uTime * 0.5 + 2.125) * 0.03125;
        float wave4 = sin(worldPos.x * 0.1875 + worldPos.z * 0.0625 + uTime * 0.90625 + 0.703125) * 0.0234375;
        float wave5 = cos((worldPos.x - worldPos.z) * 0.09375 + uTime * 0.59375 + 3.6875) * 0.01953125;
        float displacement = wave1 + wave2 + wave3 + wave4 + wave5;
        displacement *= smoothstep( 0.0, 0.5, max( 0.0, uv.y ) );
        // ⟨ ı],э ŋᷠꞇ , ꞙɭı , ꞙɭı , ⟅ ⟩
        float malproksimo = length( cameraPosition - worldPos.xyz );
        displacement *= 1.0 / ( 1.0 + malproksimo * 0.046875 );
        vHeight = displacement;

        // ⟨ ſɭɹ ſןᴜ , ꞙɭı , ⟅ ⟩
        vec3 displacedPos = position + normal * displacement;
        vec4 mvPosition = modelViewMatrix * vec4(displacedPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,
    fragmentShader: `${KONTURAGLSL}${maskaFragmento}
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

      // ⟨ ſɭɹ ſןᴜ , ı],э ŋᷠꞇ , ⟅ ⟩
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
        // ⟨ ı],э ŋᷠꞇ , ꞙɭı , j͑ʃɜ ſɭ,ᴜ , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ⟩
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
        ${maskaS2kanta}
        float jufu = max(0.0, vUv.y);
        ${jufuS2kanta}

        vec3 sorbado = 1.0 - exp(-jufu * vec3(0.3125, 0.1875, 0.125));   // ꞟ/цɿ, ц/ıɩ, ı/8
        vec3 baseColor = mix(uColorShallow, uColorDeep, sorbado);

        float wavePattern = 0.5 + 0.5 * sin(vWorldPos.x * 0.1875 + vWorldPos.z * 0.15625 + uTime * 0.5);
        wavePattern *= 0.5 + 0.5 * sin(vWorldPos.x * 0.09375 - vWorldPos.z * 0.25 - uTime * 0.375);
        baseColor = mix(baseColor, uColorRipple, wavePattern * 0.125);

        // ⟨ ſɭᴜ ſɭˬꞇƽ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
        //   ꞙɭı , ꞙɭı , ꞙɭɿ , ꞙɭı , ⟅ 📃 ⟩
        vec3 alVido = cameraPosition - vWorldPos;
        float malproksimo = length(alVido);
        vec3 viewDir = alVido / malproksimo;
        vec3 normal = ondaNormalo(vWorldPos, uTime, malproksimo);
        vec3 halfVec = normalize(viewDir + uSunDir);

        // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ⟩
        float ndv = max(dot(viewDir, normal), 0.0);
        float fresnelKozunu = 1.0 - ndv;
        float fresnelBazo2 = fresnelKozunu * fresnelKozunu;
        float fresnel = 0.02 + 0.98 * fresnelBazo2 * fresnelBazo2 * fresnelKozunu;

        // ⟨ j͑ʃɜ ſᶘɹ , j͑ʃᴜ ʃןᴜ , ⟅ ⟩
        // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ⟅ ꞙɭı ,
        //   ꞙɭı , ꞙɭı , ꞙɭı ,
        //   ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
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
        // ⟨ ꞙɭı , ſɟᴜ }ʃᴜ , j͑ʃɜ ſᶘɹ , ꞙɭı , ı],э ŋᷠꞇ , ⟅ ⟩
        vec3 reflekto = reflect(-viewDir, normal);
        float canaL6da = clamp(reflekto.y, 0.0, 1.0);
        vec3 fresnelColor = mix(uBot, uMid, smoothstep(0.0, 0.3125, canaL6da));
        fresnelColor = mix(fresnelColor, uTop, smoothstep(0.25, 0.875, canaL6da));
        float reflektaSo12 = max(dot(reflekto, normalize(uSunDir)), 0.0);
        float reflektaSo122 = reflektaSo12 * reflektaSo12;
        float reflektaSo124 = reflektaSo122 * reflektaSo122;
        float reflektaSo128 = reflektaSo124 * reflektaSo124;
        float reflektaSo1216 = reflektaSo128 * reflektaSo128;
        float reflektaSo1232 = reflektaSo1216 * reflektaSo1216;
        float reflektaSo1264 = reflektaSo1232 * reflektaSo1232;
        float reflektaSo12128 = reflektaSo1264 * reflektaSo1264;
        float sunaDisko = reflektaSo12128 * reflektaSo12128 * 0.5;
        fresnelColor += uSunCol * sunaDisko;

        vec3 finalColor = mix(baseColor, fresnelColor, fresnel * 0.875) + specColor;
        // ⟨ ᶅſɔ ֭ſɭɹ , ſɟᴜ }ʃᴜ , ʃɜ ſןɹ , ꞙɭı , ᶅſɔ ֭ſɭɹ , ſɭᴜ ſןᴜ , ⟅ ⟩
        vec3 kozunuTsasa = finalColor;

        finalColor *= 1.0 + vHeight * 0.09375;

        // ⟨ ſᶘᴜ j͑ʃᴜ , ſɭɜ ſɭᴜƽ , ᶅſɔ ֭ſɭɹ , ꞙɭı , ſɭэ ſɭ,w , ⟅ ⟩
        float treMalprofunda = 1.0 - smoothstep( 0.0, 0.125, jufu );
        finalColor = mix(finalColor, uColorShallow, treMalprofunda * 0.5);

        // ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ⟅ ⟩
        float alpha = 0.25 + 0.75 * (1.0 - exp(-jufu * 0.375));
        alpha = mix(alpha, 1.0, fresnel * 0.75);
        alpha = min(1.0, alpha + shimmer * 0.03125 + spec * 0.5);
        ${malprofundaS2kanta}

        // ⟨ ʃɜ ſןɹ , ꞙɭı , ꞙɭı , ⟅ ⟩
        ${bordaS2kanta}
        if ( bordaF > 0.0 ) {
          float lapado = 0.5 + 0.5 * sin( vWorldPos.x * 0.4375 + vWorldPos.z * 0.3125 + uTime * 0.875 );
          lapado *= 0.5 + 0.5 * sin( vWorldPos.x * 0.1875 - vWorldPos.z * 0.28125 - uTime * 0.5 );
          float bordaOndo = 0.5 + 0.5 * sin(jufu * 18.0 - uTime * 1.75 + lapado * 3.0);
          float sxauxmaLinio = smoothstep(0.625, 0.9375, bordaOndo);
          float sxauxmo = bordaF * (0.1875 + 0.5 * lapado + 0.3125 * sxauxmaLinio);
          finalColor = mix(finalColor, uFoamColor, sxauxmo);
          kozunuTsasa = mix(kozunuTsasa, uFoamColor, sxauxmo);
          alpha = max(alpha, sxauxmo * 0.9375);
        }

        // ⟨ ı],э ŋᷠꞇ , ꞙɭı , ᶅſɔ ֭ſɭɹ , ꞙɭı , ⟅ ⟩
        vec3 kvantTsasa = konturaQox2n2k( kozunuTsasa )
          - vec3( konturaBando( konturaVem2DeLumo( kozunuTsasa, finalColor ) ) * KONTURATONA );
        gl_FragColor = vec4( max( vec3( 0.0 ), kvantTsasa ), alpha );
        #include <fog_fragment>
      }
    `,
  });
  // ⟨ UniformsUtils.merge , ſɟᴜ }ʃᴜ , ꞙɭı , ꞙɭɿ , ⟅ 📃 ⟩
  if ( cana ) Object.assign(pukek.uniforms, {
    uTop: cana.uTop, uMid: cana.uMid, uBot: cana.uBot,
    uSunCol: cana.uSunCol, uSunDir: cana.uSunDir,
  });
  return pukek;
}

export function tlak2Tsasa(river: RiverData, t: number): void {
  const mat = river.mesh.material as THREE.ShaderMaterial;
  if ( mat.uniforms ) {
    mat.uniforms.uTime.value = t;
  }
}
