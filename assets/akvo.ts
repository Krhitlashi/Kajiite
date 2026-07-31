// Akva modulo — riveroj kun animaciaj ondoj, spegulaj reflektoj kaj borda sxtaumo
import * as THREE from "three";

export type RiverData = { mesh: THREE.Mesh; foamMeshes: THREE.Mesh[]; waterSurfaceY: (x: number, z: number) => number };

// konstruiRiveron — Konstruu riveron kun ribona geometrio kaj animacia akva materialo.
export function konstruiRiveron( sceno: THREE.Scene,
  riverFn: (x: number) => number,
  akvoY: (x: number) => number,
  duonaLargho: number,
  xStart: number,
  xEnd: number,
  steps: number
): RiverData {
  const pts: THREE.Vector3[] = [];
  for ( let i = 0; i <= steps; i++ ) {
    const x = xStart + (xEnd - xStart) * i / steps;
    pts.push(new THREE.Vector3(x, akvoY(x) + 1/16, riverFn(x)));
  }
  const { geometry } = konstruiRubandon(pts, duonaLargho, 0);
  const materialo = kreiOndanAkvanMaterialon(duonaLargho);
  const mesh = new THREE.Mesh(geometry, materialo);
  mesh.renderOrder = 0;
  sceno.add(mesh);

  // Borda sxtaumo — blankeca travidebla bendo lauxlonge de ambaux riveraj bordoj
  const foamMeshes: THREE.Mesh[] = [];
  const foamMaterialo = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uFoamColor: { value: new THREE.Color(0xd8ece8) },
      uRadius: { value: duonaLargho },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vDist;
      void main() {
        vUv = uv;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vDist = length(mvPos.xy);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uFoamColor;
      uniform float uRadius;
      varying vec2 vUv;
      varying float vDist;
      void main() {
        // Strip-map along UV.x to create foam at edges (uv near 0 or 1)
        float edge = 1.0 - abs(vUv.x - 0.5) * 2.0;
        // Sharp foam line at the water's edge
        float foam = smoothstep(0.88, 0.97, edge) * 0.35;
        // Lively foam texture with multiple noise-like waves
        foam += 0.18 * (0.5 + 0.5 * sin(vUv.y * 50.0 + uTime * 0.9 + sin(vUv.y * 12.0 + uTime * 0.3) * 1.5));
        foam += 0.10 * (0.5 + 0.5 * sin(vUv.y * 30.0 + uTime * 1.3 + vUv.x * 20.0));
        // Fade foam toward the center
        foam *= smoothstep(0.0, 0.35, edge);
        // Subtle sparkle on the foam line
        float sparkle = pow(max(0.0, sin(vUv.y * 80.0 + uTime * 2.0) * sin(vUv.x * 60.0 + uTime * 1.7)), 8.0) * 0.3;
        gl_FragColor = vec4(uFoamColor + vec3(sparkle * 0.5), (foam + sparkle) * 0.5);
      }
    `,
  });

  // Kreu du foamajn bendojn - unu por cxiu bordo
  for ( const side of [ -1, 1 ] ) {
    const foamPts = pts.map(p => {
      const pn = pts[Math.min(pts.indexOf(p) + 1, pts.length - 1)];
      const pp = pts[Math.max(pts.indexOf(p) - 1, 0)];
      const tan = new THREE.Vector3(pn.x - pp.x, 0, pn.z - pp.z).normalize();
      const sideVec = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), tan).normalize();
      return new THREE.Vector3(
        p.x + sideVec.x * duonaLargho * side,
        p.y + 1/32,
        p.z + sideVec.z * duonaLargho * side
      );
    });
    const { geometry: foamGeom } = konstruiRubandon(foamPts, 7/8, 0);
    const fm = new THREE.Mesh(foamGeom, foamMaterialo);
    fm.renderOrder = 1;
    sceno.add(fm);
    foamMeshes.push(fm);
  }

  return { mesh, foamMeshes, waterSurfaceY: (x: number, z: number) => akvoY(x) };
}

// konstruiRubandon — Kreu 3D rubando el punktoj kun largho kaj alta lifto.
export function konstruiRubandon( points: THREE.Vector3[],
  duonaLargho: number,
  yLift: number
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

    posArr.set([
      p.x - side.x * duonaLargho, y, p.z - side.z * duonaLargho,
      p.x + side.x * duonaLargho, y, p.z + side.z * duonaLargho,
    ], i * 6);
    uvArr.set([ 0, i / (N - 1), 1, i / (N - 1) ], i * 4);

    if ( i < N - 1 ) {
      const a = i * 2;
      indico.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    if (i % 4 === 0) samples.push(p.clone());
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uvArr, 2));
  g.setIndex(indico);
  g.computeVertexNormals();
  return { geometry: g, samples };
}

function kreiOndanAkvanMaterialon(riverHalfWidth: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uColorDeep: { value: new THREE.Color(0x104840) },
      uColorShallow: { value: new THREE.Color(0x48a898) },
      uColorRipple: { value: new THREE.Color(0x70c8b8) },
      uSunDir: { value: new THREE.Vector3(4/8, 51/64, 19/64).normalize() },
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vHeight;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;

        // Pluraj ondaj tavoloj por riĉa, natura movado
        float wave1 = sin(worldPos.x * 0.14 + worldPos.z * 0.09 + uTime * 0.7) * 0.18;
        float wave2 = sin(worldPos.x * 0.08 - worldPos.z * 0.12 + uTime * 1.1 + 1.3) * 0.14;
        float wave3 = sin((worldPos.x + worldPos.z) * 0.05 + uTime * 0.5 + 2.1) * 0.08;
        float wave4 = sin(worldPos.x * 0.18 + worldPos.z * 0.06 + uTime * 0.9 + 0.7) * 0.06;
        float wave5 = cos((worldPos.x - worldPos.z) * 0.10 + uTime * 0.6 + 3.7) * 0.05;
        float displacement = wave1 + wave2 + wave3 + wave4 + wave5;
        vHeight = displacement;

        // Approximate normal from wave derivatives
        float dx = (wave1 * 0.14 + wave2 * 0.08 + wave3 * 0.05 + wave4 * 0.18 + wave5 * 0.10) * 0.3;
        float dz = (wave1 * 0.09 - wave2 * 0.12 + wave3 * 0.05 + wave4 * 0.06 - wave5 * 0.10) * 0.3;
        vNormal = normalize(normal + vec3(-dx, 0.6, -dz));

        vec3 displacedPos = position + normal * displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColorDeep;
      uniform vec3 uColorShallow;
      uniform vec3 uColorRipple;
      uniform vec3 uSunDir;
      uniform float uTime;
      uniform float uHalfWidth;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vHeight;
      varying vec3 vNormal;

      void main() {
        // Baza koloro. gradient de profunda al malprofunda akvo
        float distFromCenter = abs(vUv.x - 0.5) * 2.0;
        vec3 baseColor = mix(uColorDeep, uColorShallow, distFromCenter * 0.7 + 0.1);

        // Aldonu subtilan koloran varianton de ondoj
        float wavePattern = 0.5 + 0.5 * sin(vWorldPos.x * 0.2 + vWorldPos.z * 0.15 + uTime * 0.5);
        baseColor = mix(baseColor, uColorRipple, wavePattern * 0.08);

        // Sunluma spegula brilo
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        vec3 normal = normalize(vNormal);
        vec3 halfVec = normalize(viewDir + uSunDir);
        float spec = pow(max(dot(normal, halfVec), 0.0), 48.0) * 0.7;
        // Plia disvastigita brilo por pli natura aspekto
        float specWide = pow(max(dot(normal, halfVec), 0.0), 12.0) * 0.25;

        // Fresnel-efiko (pli hela cxe malaltaj anguloj)
        float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 4.0) * 0.5;

        // Subtila ondbrilo
        float shimmer = 0.5 + 0.5 * sin(vWorldPos.x * 0.3 + vWorldPos.z * 0.25 + uTime * 2.0);
        shimmer *= 0.5 + 0.5 * sin(vWorldPos.x * 0.2 - vWorldPos.z * 0.3 + uTime * 1.5);

        vec3 specColor = vec3(0.85, 0.92, 1.0) * (spec + specWide);
        vec3 fresnelColor = mix(vec3(0.4, 0.5, 0.6), vec3(0.7, 0.8, 0.9), fresnel);

        vec3 finalColor = baseColor + specColor + fresnelColor * 0.5;

        // Profundeco. malheligu kie pli profunda
        finalColor *= (1.0 - distFromCenter * 0.18);

        // Aldonu malpezan akvan nebulon ce bordoj
        float edgeGlow = smoothstep(0.7, 1.0, distFromCenter) * 0.12;
        finalColor += vec3(0.3, 0.6, 0.5) * edgeGlow;

        // Travidebleco. pli travidebla cxe bordoj
        float alpha = 0.82 + distFromCenter * 0.12 + shimmer * 0.04;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
  });
}

// gxisdatigiAkvon — Gxisdatigu akvajn uniformojn cxiun kadron por animacio.
export function gxisdatigiAkvon(river: RiverData, t: number): void {
  const mat = river.mesh.material as THREE.ShaderMaterial;
  if (mat.uniforms) {
    mat.uniforms.uTime.value = t;
  }
  for (const fm of river.foamMeshes) {
    const fmat = fm.material as THREE.ShaderMaterial;
    if (fmat.uniforms) {
      fmat.uniforms.uTime.value = t;
    }
  }
}

// cxuEnAkvo — Kontrolu cxu punkto estas en la rivero (sur akva surfaco).
export function cxuEnAkvo(x: number, z: number, riverFn: (x: number) => number, riverHalfWidth: number): boolean {
  const rz = riverFn(x);
  return Math.abs(z - rz) < riverHalfWidth;
}

export function akvaSurfacaY(x: number, z: number, river: RiverData): number {
  return river.waterSurfaceY(x, z);
}
