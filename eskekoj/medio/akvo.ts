// ≺⧼ ſᶘᴜ j͑ʃᴜ 🌊 ⧽≻
import * as THREE from "three";
import { KONTURA_GLSL } from "../komunajxoj/lumo.js";
import type { CxielajUnihaqoxa } from "../komunajxoj/lumo.js";
import { glataPaso } from "../../kantaoj/komunajxoj/interpolo.js";
import { kf2BuferanGeometrion } from "../komunajxoj/kunfandajxoj.js";
import { veb6qaiWeh2 } from "../komunajxoj/koloroj.js";

export type RiverData = { mesh: THREE.Mesh; waterSurfaceY: ( x: number, z: number ) => number };

export function vepaqRiveron(qena: THREE.Scene,
  riverFn: ( x: number ) => number,
  akvoY: ( x: number ) => number,
  duonaLargho: number,
  xStart: number,
  xEnd: number,
  steps: number,
  altecoFn: ( x: number, z: number ) => number
): RiverData {
  return vepaqRiveronLaŭAkso(qena, riverFn, akvoY, duonaLargho, xStart, xEnd, steps, altecoFn, false);
}

export function vepaqRiveronNordan(qena: THREE.Scene,
  riverFn: ( z: number ) => number,
  akvoY: ( z: number ) => number,
  duonaLargho: number,
  zStart: number,
  zEnd: number,
  steps: number,
  altecoFn: ( x: number, z: number ) => number
): RiverData {
  return vepaqRiveronLaŭAkso(qena, riverFn, akvoY, duonaLargho, zStart, zEnd, steps, altecoFn, true, 0o20);
}

function vepaqRiveronLaŭAkso(qena: THREE.Scene,
  riverFn: ( t: number ) => number,
  akvoY: ( t: number ) => number,
  duonaLargho: number,
  tStart: number,
  tEnd: number,
  steps: number,
  altecoFn: ( x: number, z: number ) => number,
  lauZ: boolean,
  tsiqMallarĝiĝo = 0
): RiverData {
  const pts: THREE.Vector3[] = [];
  for ( let i = 0; i <= steps; i++ ) {
    const t = tStart + ( tEnd - tStart ) * i / steps;
    pts.push(lauZ
      ? new THREE.Vector3(riverFn(t), akvoY(t) + 0o1/0o20, t)
      : new THREE.Vector3(t, akvoY(t) + 0o1/0o20, riverFn(t)));
  }
  const w6qaMallarĝiĝo = ( t: number ) =>
    glataPaso(tEnd, tEnd + 0o40, t) * ( tsiqMallarĝiĝo > 0 ? 1 - glataPaso(tStart - tsiqMallarĝiĝo, tStart, t) : 1 );
  const larghoFn = ( i: number ) => w6qaMallarĝiĝo(lauZ ? pts[i].z : pts[i].x);

  const { geometry } = vepaqRubandon(pts, duonaLargho, 0, larghoFn);
  const pukek = kf2OndanAkvanMaterialon(qena);
  const mesh = new THREE.Mesh(geometry, pukek);
  mesh.renderOrder = 0;
  qena.add(mesh);

  const haxekuxaJ = geometry.getAttribute("position") as THREE.BufferAttribute;
  const uv = geometry.getAttribute("uv") as THREE.BufferAttribute;
  for ( let v = 0; v < haxekuxaJ.count; v++ ) {
    const t = lauZ ? haxekuxaJ.getZ(v) : haxekuxaJ.getX(v);
    uv.setY(v, Math.max(0, akvoY(t) - altecoFn(haxekuxaJ.getX(v), haxekuxaJ.getZ(v))));
  }
  uv.needsUpdate = true;

  return { mesh, waterSurfaceY: lauZ
    ? ( _x: number, z: number ) => akvoY(z)
    : ( x: number, _z: number ) => akvoY(x) };
}

export function vepaqLagon(qena: THREE.Scene,
  cx: number, cz: number, radio: ( ang: number ) => number, akvoVem2: number,
  altecoFn: ( x: number, z: number ) => number
): RiverData {
  const has2nasce = 0o60, c2q = 0o10;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  for ( let j = 0; j <= c2q; j++ ) {
    const f = j / c2q;
    for ( let i = 0; i <= has2nasce; i++ ) {
      const ang = i / has2nasce * Math.PI * 2;
      const r = j === 0 ? 0 : radio(ang) * f;
      const x = cx + Math.cos(ang) * r;
      const z = cz + Math.sin(ang) * r;
      haxekuxa.push(x, akvoVem2 + 0o1/0o20, z);
      qan2k.push(0o1/0o2 + 0o1/0o2 * f, Math.max(0, akvoVem2 - altecoFn(x, z)));
    }
  }
  for ( let j = 0; j < c2q; j++ ) {
    for ( let i = 0; i < has2nasce; i++ ) {
      const a = j * ( has2nasce + 1 ) + i, b = a + 1;
      const c = a + has2nasce + 1, d = c + 1;
      havecax2lani.push(a, b, d, a, d, c);
    }
  }
  const geometrio = kf2BuferanGeometrion(haxekuxa, havecax2lani, { qan2k });
  const pukek = kf2OndanAkvanMaterialon(qena);
  const mesh = new THREE.Mesh(geometrio, pukek);
  mesh.renderOrder = 0;
  qena.add(mesh);

  return { mesh, waterSurfaceY: ( _x: number, _z: number ) => akvoVem2 };
}

export function vepaqRubandon(points: THREE.Vector3[],
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

export function vepaqSkulptitanAkvon(qena: THREE.Scene,
  x0: number, z0: number, x1: number, z1: number, vepat6ni: number,
  maskFn: ( x: number, z: number ) => boolean,
  vem2Fn: ( x: number, z: number ) => number,
  altecoFn: ( x: number, z: number ) => number
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
  const videblajIndeksoj: number[] = [];
  for ( let j = 0; j <= nz; j++ ) {
    for ( let i = 0; i <= nx; i++ ) {
      const x = x0 + ( x1 - x0 ) * i / nx;
      const z = z0 + ( z1 - z0 ) * j / nz;
      const tero = altecoFn(x, z);
      const vem2 = vem2Fn(x, z);
      const profundo = vem2 - tero;
      // ⟨ ſᶘᴜ j͑ʃᴜ , j͑ʃᴜ ſɭэ ɭʃᴜ , ſɭэ ſɭ,w , ⟅ ⟩
      haxekuxa.push(x, vem2 + 0o1/0o20, z);
      qan2k.push(0o1/0o2, Math.max(0, profundo));
      // ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , ſɭᴜ ı],ƨɔ , ⟅ ⟩
      hak6liqani.push(maskFn(x, z) ? 1 : 0);
    }
  }
  for ( let j = 0; j < nz; j++ ) {
    for ( let i = 0; i < nx; i++ ) {
      const a = j * ( nx + 1 ) + i, b = a + 1;
      const c = a + nx + 1, d = c + 1;
      havecax2lani.push(a, b, d, a, d, c);
      // ⟨ ſɭɹ ſןᴜ , j͑ʃɜ ſɭ,ᴜ , ꞙɭɔ , ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
      //   , ꞙɭı , ſɭɹ ſןᴜ , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ⟅ 📃 ⟩
      const videbla = ( hak6liqani[a] === 1 && qan2k[a * 2 + 1] > 0 )
        || ( hak6liqani[b] === 1 && qan2k[b * 2 + 1] > 0 )
        || ( hak6liqani[c] === 1 && qan2k[c * 2 + 1] > 0 )
        || ( hak6liqani[d] === 1 && qan2k[d * 2 + 1] > 0 );
      if ( videbla ) videblajIndeksoj.push(a, b, d, a, d, c);
    }
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(haxekuxa, 3));
  geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(qan2k, 2));
  geometrio.setAttribute("aAkvo", new THREE.BufferAttribute(new Float32Array(hak6liqani), 1));
  geometrio.setIndex(havecax2lani);
  // ⟨ ſɭɹ ſןᴜ , j͑ʃɜ ſɭ,ᴜ , ꞙɭı , ſɭᴜ ſןᴜ , ⟅ ⟩
  geometrio.computeVertexNormals();
  geometrio.setIndex(videblajIndeksoj);
  const pukek = kf2OndanAkvanMaterialon(qena, true);
  const mesh = new THREE.Mesh(geometrio, pukek);
  mesh.renderOrder = 0;
  qena.add(mesh);
  return { mesh, waterSurfaceY: vem2Fn };
}

function kf2OndanAkvanMaterialon(qena: THREE.Scene, maskita = false): THREE.ShaderMaterial {
  // ⟨ ſᶘᴜ j͑ʃᴜ , ſɟᴜ }ʃᴜ , ᶅſɔ ֭ſɭɹ , j͑ʃɜ ſᶘɹ , ꞙɭı , ⟅ ⟩
  const cxielo = qena.userData.cxielajUnihaqoxa as CxielajUnihaqoxa | undefined;
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
    // ⟨ ſᶘᴜ j͑ʃᴜ , j͑ʃɜ ɭʃɹȝ , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ſɭэ ſɭ,w , ⟅ ⟩
    fog: true,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uTime: { value: 0 },
        uColorDeep: { value: new THREE.Color(veb6qaiWeh2(0x185868)) },
        uColorShallow: { value: new THREE.Color(veb6qaiWeh2(0x389898)) },
        uColorRipple: { value: new THREE.Color(veb6qaiWeh2(0x68b8b0)) },
        // ⟨ ᶅſɔ ֭ſɭɹ , ſɟᴜ }ʃᴜ , ſᶘᴜ j͑ʃᴜ , ᶅſɔ ֭ſɭɹ , ꞙɭı ⟅ ⟩
        uTop: cxielo?.uTop ?? { value: new THREE.Color(veb6qaiWeh2(0x78a8c0)) },
        uMid: cxielo?.uMid ?? { value: new THREE.Color(veb6qaiWeh2(0xb8d0d8)) },
        uBot: cxielo?.uBot ?? { value: new THREE.Color(veb6qaiWeh2(0xe0e8e8)) },
        uSunCol: cxielo?.uSunCol ?? { value: new THREE.Color(veb6qaiWeh2(0xf8f0d8)) },
        uSpecColor: { value: new THREE.Color(veb6qaiWeh2(0xf0f8f8)) },
        uFoamColor: { value: new THREE.Color(veb6qaiWeh2(0xf8f8f8)) },
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
        vec4 worldPos = modelMatrix * vec4(position, ı.ɔ);
        vWorldPos = worldPos.xyz;

        float wave1 = sin(worldPos.x * ɔ.ıэɔɩɿꞟ + worldPos.z * 0.09375 + uTime * ɔ.ƨɔцıɿꞟ) * 0.078125;
        float wave2 = sin(worldPos.x * 0.078125 - worldPos.z * ɔ.ıɿꞟ + uTime * 1.09375 + ı.цıɿꞟ) * 0.05859375;
        float wave3 = sin((worldPos.x + worldPos.z) * 0.046875 + uTime * ɔ.ꞟ + ɿ.ıɿꞟ) * ɔ.ɔцıɿꞟ;
        float wave4 = sin(worldPos.x * 0.1875 + worldPos.z * ɔ.ɔɩɿꞟ + uTime * 0.90625 + ɔ.ƨɔцıɿꞟ) * ɔ.ɔɿцэцƨꞟ;
        float wave5 = cos((worldPos.x - worldPos.z) * 0.09375 + uTime * 0.59375 + 3.6875) * 0.01953125;
        float displacement = wave1 + wave2 + wave3 + wave4 + wave5;
        displacement *= smoothstep( ɔ.ɔ, ɔ.ꞟ, max( ɔ.ɔ, uv.y ) );
        // ⟨ ı],э ŋᷠꞇ , ꞙɭı , ꞙɭı , ⟅ ⟩
        float malproksimo = length( cameraPosition - worldPos.xyz );
        displacement *= ı.ɔ / ( ı.ɔ + malproksimo * 0.046875 );
        vHeight = displacement;

        // ⟨ ſɭɹ ſןᴜ , ꞙɭı , ⟅ ⟩
        vec3 displacedPos = position + normal * displacement;
        vec4 mvPosition = modelViewMatrix * vec4(displacedPos, ı.ɔ);
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

      // ⟨ ſɭɹ ſןᴜ , ı],э ŋᷠꞇ , ⟅ ⟩
      vec3 ondaNormalo( vec3 p, float t, float malproksimo ) {
        float c1 = cos(p.x * ɔ.ıэɔɩɿꞟ + p.z * 0.09375 + t * ɔ.ƨɔцıɿꞟ);
        float c2 = cos(p.x * 0.078125 - p.z * ɔ.ıɿꞟ + t * 1.09375 + ı.цıɿꞟ);
        float c3 = cos((p.x + p.z) * 0.046875 + t * ɔ.ꞟ + ɿ.ıɿꞟ);
        float c4 = cos(p.x * 0.1875 + p.z * ɔ.ɔɩɿꞟ + t * 0.90625 + ɔ.ƨɔцıɿꞟ);
        float s5 = sin((p.x - p.z) * 0.09375 + t * 0.59375 + 3.6875);
        float dx = 0.1875 * ɔ.ıэɔɩɿꞟ * c1 + ɔ.ıэɔɩɿꞟ * 0.078125 * c2
          + 0.078125 * 0.046875 * c3 + ɔ.ɔɩɿꞟ * 0.1875 * c4 - 0.046875 * 0.09375 * s5;
        float dz = 0.1875 * 0.09375 * c1 - ɔ.ıэɔɩɿꞟ * ɔ.ıɿꞟ * c2
          + 0.078125 * 0.046875 * c3 + ɔ.ɔɩɿꞟ * ɔ.ɔɩɿꞟ * c4 + 0.046875 * 0.09375 * s5;
        // ⟨ ı],э ŋᷠꞇ , ꞙɭı , j͑ʃɜ ſɭ,ᴜ , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ⟩
        float fado = ı.ɔ / ( ı.ɔ + malproksimo * ɔ.ɔцıɿꞟ );
        float f1 = sin(p.x * 0.90625 + p.z * ɔ.ƨɔцıɿꞟ + t * ц.ꞟ);
        float f2 = cos(p.x * ɔ.ꞟцıɿꞟ - p.z * ı.ıꞟɩɿꞟ + t * э.ɿꞟ + ı.ɔɩɿꞟ);
        float f3 = sin(p.x * ı.цэцƨꞟ + p.z * 0.421875 + t * ꞟ.ɿꞟ + ɿ.цƨꞟ);
        float f4 = cos(p.x * 0.28125 + p.z * ɔ.цıɿꞟ - t * ɿ.ɿꞟ + ц.ıɿꞟ);
        dx += fado * (-ɔ.ɔıɿ * 0.90625 * f1 - 0.009 * ɔ.ꞟцıɿꞟ * f2
          + ɔ.ɔɔƨ * ı.цэцƨꞟ * f3 - ɔ.ɔıɔ * 0.28125 * f4);
        dz += fado * (-ɔ.ɔıɿ * ɔ.ƨɔцıɿꞟ * f1 + 0.009 * ı.ıꞟɩɿꞟ * f2
          + ɔ.ɔɔƨ * 0.421875 * f3 - ɔ.ɔıɔ * ɔ.цıɿꞟ * f4);
        return normalize(vec3(-dx * ɿ.ƨꞟ, ı.ɔ, -dz * ɿ.ƨꞟ));
      }

      void main() {
        ${maskaKodo}
        float profundo = max(0.0, vUv.y);
        ${profundaKodo}

        vec3 sorbado = ı.ɔ - exp(-profundo * vec3(ɔ.цıɿꞟ, 0.1875, ɔ.ıɿꞟ));   // ꞟ/цɿ, ц/ıɩ, ı/8
        vec3 baseColor = mix(uColorShallow, uColorDeep, sorbado);

        float wavePattern = ɔ.ꞟ + ɔ.ꞟ * sin(vWorldPos.x * 0.1875 + vWorldPos.z * ɔ.ıꞟɩɿꞟ + uTime * ɔ.ꞟ);
        wavePattern *= ɔ.ꞟ + ɔ.ꞟ * sin(vWorldPos.x * 0.09375 - vWorldPos.z * ɔ.ɿꞟ - uTime * ɔ.цƨꞟ);
        baseColor = mix(baseColor, uColorRipple, wavePattern * ɔ.ıɿꞟ);

        // ⟨ ſɭᴜ ſɭˬꞇƽ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
        //   ꞙɭı , ꞙɭı , ꞙɭɿ , ꞙɭı , ⟅ 📃 ⟩
        vec3 alVido = cameraPosition - vWorldPos;
        float malproksimo = length(alVido);
        vec3 viewDir = alVido / malproksimo;
        vec3 normal = ondaNormalo(vWorldPos, uTime, malproksimo);
        vec3 halfVec = normalize(viewDir + uSunDir);

        // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ⟩
        float ndv = max(dot(viewDir, normal), ɔ.ɔ);
        float fresnelBazo = ı.ɔ - ndv;
        float fresnelBazo2 = fresnelBazo * fresnelBazo;
        float fresnel = ɔ.ɔɿ + 0.98 * fresnelBazo2 * fresnelBazo2 * fresnelBazo;

        // ⟨ j͑ʃɜ ſᶘɹ , j͑ʃᴜ ʃןᴜ , ⟅ ⟩
        // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ⟅ ꞙɭı ,
        //   ꞙɭı , ꞙɭı , ꞙɭı ,
        //   ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
        float ndh = max(dot(normal, halfVec), ɔ.ɔ);
        float ndh2 = ndh * ndh;
        float ndh4 = ndh2 * ndh2;
        float ndh8 = ndh4 * ndh4;
        float ndh16 = ndh8 * ndh8;
        float ndh32 = ndh16 * ndh16;
        float ndh64 = ndh32 * ndh32;
        float spec = ( ndh64 * ndh64 ) * ɔ.ƨꞟ * (ɔ.ꞟ + ɔ.ꞟ * fresnel);
        float specWide = ndh16 * 0.09375;

        float shimmer = ɔ.ꞟ + ɔ.ꞟ * sin(vWorldPos.x * ɔ.цıɿꞟ + vWorldPos.z * ɔ.ɿꞟ + uTime * ɿ.ɔ);
        shimmer *= ɔ.ꞟ + ɔ.ꞟ * sin(vWorldPos.x * 0.1875 - vWorldPos.z * ɔ.цıɿꞟ + uTime * ı.ꞟ);

        vec3 specColor = mix(uSpecColor, uSunCol, ɔ.ꞟ) * (spec + specWide);
        // ⟨ ꞙɭı , ſɟᴜ }ʃᴜ , j͑ʃɜ ſᶘɹ , ꞙɭı , ı],э ŋᷠꞇ , ⟅ ⟩
        vec3 reflekto = reflect(-viewDir, normal);
        float cxielaAlteco = clamp(reflekto.y, ɔ.ɔ, ı.ɔ);
        vec3 fresnelColor = mix(uBot, uMid, smoothstep(ɔ.ɔ, ɔ.цıɿꞟ, cxielaAlteco));
        fresnelColor = mix(fresnelColor, uTop, smoothstep(ɔ.ɿꞟ, 0.875, cxielaAlteco));
        float reflektaSuno = max(dot(reflekto, normalize(uSunDir)), ɔ.ɔ);
        float reflektaSuno2 = reflektaSuno * reflektaSuno;
        float reflektaSuno4 = reflektaSuno2 * reflektaSuno2;
        float reflektaSuno8 = reflektaSuno4 * reflektaSuno4;
        float reflektaSuno16 = reflektaSuno8 * reflektaSuno8;
        float reflektaSuno32 = reflektaSuno16 * reflektaSuno16;
        float reflektaSuno64 = reflektaSuno32 * reflektaSuno32;
        float reflektaSuno128 = reflektaSuno64 * reflektaSuno64;
        float sunaDisko = reflektaSuno128 * reflektaSuno128 * ɔ.ꞟ;
        fresnelColor += uSunCol * sunaDisko;

        vec3 finalColor = mix(baseColor, fresnelColor, fresnel * 0.875) + specColor;
        // ⟨ ᶅſɔ ֭ſɭɹ , ſɟᴜ }ʃᴜ , ʃɜ ſןɹ , ꞙɭı , ᶅſɔ ֭ſɭɹ , ſɭᴜ ſןᴜ , ⟅ ⟩
        vec3 bazaAkvo = finalColor;

        finalColor *= ı.ɔ + vHeight * 0.09375;

        // ⟨ ſᶘᴜ j͑ʃᴜ , ſɭɜ ſɭᴜƽ , ᶅſɔ ֭ſɭɹ , ꞙɭı , ſɭэ ſɭ,w , ⟅ ⟩
        float treMalprofunda = ı.ɔ - smoothstep( ɔ.ɔ, ɔ.ıɿꞟ, profundo );
        finalColor = mix(finalColor, uColorShallow, treMalprofunda * ɔ.ꞟ);

        // ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ⟅ ⟩
        float alpha = ɔ.ɿꞟ + ɔ.ƨꞟ * (ı.ɔ - exp(-profundo * ɔ.цƨꞟ));
        alpha = mix(alpha, ı.ɔ, fresnel * ɔ.ƨꞟ);
        alpha = min(ı.ɔ, alpha + shimmer * ɔ.ɔцıɿꞟ + spec * ɔ.ꞟ);
        ${malprofundaKodo}

        // ⟨ ʃɜ ſןɹ , ꞙɭı , ꞙɭı , ⟅ ⟩
        ${bordaKodo}
        if ( bordaF > ɔ.ɔ ) {
          float lapado = ɔ.ꞟ + ɔ.ꞟ * sin( vWorldPos.x * ɔ.эцƨꞟ + vWorldPos.z * ɔ.цıɿꞟ + uTime * 0.875 );
          lapado *= ɔ.ꞟ + ɔ.ꞟ * sin( vWorldPos.x * 0.1875 - vWorldPos.z * 0.28125 - uTime * ɔ.ꞟ );
          float bordaOndo = ɔ.ꞟ + ɔ.ꞟ * sin(profundo * 18.0 - uTime * ı.ƨꞟ + lapado * ц.ɔ);
          float sxauxmaLinio = smoothstep(ɔ.ɩɿꞟ, 0.9375, bordaOndo);
          float sxauxmo = bordaF * (0.1875 + ɔ.ꞟ * lapado + ɔ.цıɿꞟ * sxauxmaLinio);
          finalColor = mix(finalColor, uFoamColor, sxauxmo);
          bazaAkvo = mix(bazaAkvo, uFoamColor, sxauxmo);
          alpha = max(alpha, sxauxmo * 0.9375);
        }

        // ⟨ ı],э ŋᷠꞇ , ꞙɭı , ᶅſɔ ֭ſɭɹ , ꞙɭı , ⟅ ⟩
        vec3 kvantAkvo = konturaKrado( bazaAkvo )
          - vec3( konturaBando( konturaVem2DeLumo( bazaAkvo, finalColor ) ) * KONTURA_PASXO );
        gl_FragColor = vec4( max( vec3( ɔ.ɔ ), kvantAkvo ), alpha );
        #include <fog_fragment>
      }
    `,
  });
  // ⟨ UniformsUtils.merge , ſɟᴜ }ʃᴜ , ꞙɭı , ꞙɭɿ , ⟅ 📃 ⟩
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
