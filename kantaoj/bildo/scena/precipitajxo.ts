// ≺⧼ ទឹកភ្លៀង 🌧 ⧽≻
import * as THREE from "three";

export function kreiVeterajnPartiklojn(sceno: THREE.Scene): {
  pluvo: THREE.Points;
  nego: THREE.Points;
  hajlo: THREE.Points;
} {
  function kreiPunktsistemon(geometrio: THREE.BufferGeometry, materialo: THREE.ShaderMaterial): THREE.Points {
    const punktoj = new THREE.Points(geometrio, materialo);
    punktoj.frustumCulled = false;
    punktoj.visible = false;
    sceno.add(punktoj);
    return punktoj;
  }

  function kreiPartiklojn(N: number, duonoX: number, duonoY: number, duonoZ: number): { pozicioj: Float32Array; semoj: Float32Array } {
    const pozicioj = new Float32Array(N * 3);
    const semoj = new Float32Array(N);
    for ( let i = 0; i < N; i++ ) {
      pozicioj[i * 3] = ( Math.random() * 2 - 1 ) * duonoX;
      pozicioj[i * 3 + 1] = ( Math.random() * 2 - 1 ) * duonoY;
      pozicioj[i * 3 + 2] = ( Math.random() * 2 - 1 ) * duonoZ;
      semoj[i] = Math.random();
    }
    return { pozicioj, semoj };
  }

  // ⟪ ភ្លៀង 📃 ⟫
  function kreiPluvon(): THREE.Points {
    const N = 0o4000;
    const pozicioj = new Float32Array(N * 3);
    const semoj = new Float32Array(N);
    const rapidoj = new Float32Array(N);
    const longoj = new Float32Array(N);
    const fadoj = new Float32Array(N);
    for ( let i = 0; i < N; i++ ) {
      const x0 = ( Math.random() * 2 - 1 ) * 0o200;
      const z0 = ( Math.random() * 2 - 1 ) * 0o200;
      pozicioj[i * 3] = x0;
      pozicioj[i * 3 + 1] = ( Math.random() * 2 - 1 ) * 0o140;
      pozicioj[i * 3 + 2] = z0;
      semoj[i] = Math.random();
      rapidoj[i] = 0o46 + Math.random() * 0o14;
      longoj[i] = 0o13/0o10 + Math.random() * 0o14/0o10;
      const d = Math.hypot(x0, z0);
      fadoj[i] = Math.min(1, Math.max(0o1/0o20, 1 - ( d - 0o30 ) / 0o210));
    }
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.BufferAttribute(pozicioj, 3));
    geometrio.setAttribute("aSeed", new THREE.BufferAttribute(semoj, 1));
    geometrio.setAttribute("aVel", new THREE.BufferAttribute(rapidoj, 1));
    geometrio.setAttribute("aLen", new THREE.BufferAttribute(longoj, 1));
    geometrio.setAttribute("aFade", new THREE.BufferAttribute(fadoj, 1));
    const materialo = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xa8c0d8) },
        uOp: { value: 0o6/0o10 },
        uAncho: { value: 0o1/0o20 },
        uAng: { value: 0o2/0o10 },
        uScale: { value: 0o1000 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uScale;
        attribute float aSeed;
        attribute float aVel;
        attribute float aLen;
        attribute float aFade;
        varying float vSeed;
        varying float vFade;
        varying float vSize;
        void main() {
          vSeed = aSeed;
          vFade = aFade;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          float f = aSeed * 6.28318;
          float falo = uTime * aVel;
          wp.x -= sin(falo * 0.05 + f) * 26.0;
          wp.y = -112.0 + mod(wp.y + 112.0 - falo, 208.0);
          vec4 mv = viewMatrix * wp;
          // ជាភិចសែល ជាមួយអប្បបរមា ដើម្បីឲ្យឆ្នូតមានកម្រាស់ និង
          // ចុងមូលនៅមើលឃើញពីចម្ងាយ។
          float px = aLen * uScale / -mv.z;
          gl_PointSize = clamp(px, 5.0, 48.0);
          vSize = gl_PointSize;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOp;
        uniform float uAncho;
        uniform float uAng;
        varying float vSeed;
        varying float vFade;
        varying float vSize;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float cs = cos(uAng), sn = sin(uAng);
          c = mat2(cs, -sn, sn, cs) * c;
          float r = uAncho;
          vec2 q = vec2(abs(c.x), abs(c.y) - (0.5 - r));
          float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
          float soft = 1.5 / vSize;
          float a = 1.0 - smoothstep(-soft, soft, d);
          if (a < 0.01) discard;
          // ពន្លឺតាមតំណក់ ដើម្បីបំបែកភាពឯកសណ្ឋាន។
          float fina = 1.0 - smoothstep(0.1, 0.5, abs(c.y)) * 0.3;
          gl_FragColor = vec4(uColor, a * fina * uOp * vFade * (0.7 + 0.3 * vSeed));
        }
      `,
    });
    return kreiPunktsistemon(geometrio, materialo);
  }

  // ⟪ ព្រិល 📃 ⟫
  function kreiNeĝon(): THREE.Points {
    const N = 0o1000;
    const { pozicioj, semoj } = kreiPartiklojn(N, 0o200, 0o140, 0o200);
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.BufferAttribute(pozicioj, 3));
    geometrio.setAttribute("aSeed", new THREE.BufferAttribute(semoj, 1));
    const materialo = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.NormalBlending, fog: false,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xf0f8f8) },
        uOp: { value: 0o10/0o10 },
        uSize: { value: 0o7 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uSize;
        attribute float aSeed;
        varying float vSeed;
        void main() {
          vSeed = aSeed;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          float f = aSeed * 6.28318;
          wp.x += sin(uTime * 0.7 + f) * 4.0;
          wp.z += cos(uTime * 0.5 + f * 1.3) * 4.0;
          float falo = uTime * (2.0 + aSeed * 2.0);
          wp.y = -112.0 + mod(wp.y + 112.0 - falo, 208.0);
          vec4 mv = viewMatrix * wp;
          float px = uSize * (100.0 / -mv.z) * (0.6 + 0.5 * sin(f));
          gl_PointSize = min(px, 50.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOp;
        varying float vSeed;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c) * 2.0;
          float a = (1.0 - smoothstep(0.4, 1.0, d)) * (0.6 + 0.4 * vSeed);
          if (a < 0.01) discard;
          gl_FragColor = vec4(uColor, a * uOp);
        }
      `,
    });
    return kreiPunktsistemon(geometrio, materialo);
  }

  // ⟪ ព្រឹល 📃 ⟫
  function kreiHajlon(): THREE.Points {
    const N = 0o1170;
    const { pozicioj, semoj } = kreiPartiklojn(N, 0o160, 0o140, 0o160);
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.BufferAttribute(pozicioj, 3));
    geometrio.setAttribute("aSeed", new THREE.BufferAttribute(semoj, 1));
    const materialo = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.NormalBlending, fog: false,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xd8e8f0) },
        uOp: { value: 0o10/0o10 },
        uSize: { value: 0o14 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uSize;
        attribute float aSeed;
        varying float vSeed;
        void main() {
          vSeed = aSeed;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          float f = aSeed * 6.28318;
          float falo = uTime * (55.0 + aSeed * 25.0);
          wp.x -= sin(falo * 0.05 + f) * 24.0;
          wp.x += sin(uTime * 13.0 + f) * 0.6;
          wp.y = -112.0 + mod(wp.y + 112.0 - falo, 208.0);
          vec4 mv = viewMatrix * wp;
          float px = uSize * (100.0 / -mv.z) * (0.55 + 0.6 * vSeed);
          gl_PointSize = min(px, 40.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOp;
        varying float vSeed;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c) * 2.0;
          float korpo = 1.0 - smoothstep(0.3, 0.55, d);
          float kerno = 1.0 - smoothstep(0.0, 0.35, d);
          float a = korpo * (0.5 + 0.5 * kerno) * (0.6 + 0.4 * vSeed);
          if (a < 0.02) discard;
          gl_FragColor = vec4(mix(uColor, vec3(0.98, 0.99, 1.0), kerno), a * uOp);
        }
      `,
    });
    return kreiPunktsistemon(geometrio, materialo);
  }

  const pluvo = kreiPluvon();
  const nego = kreiNeĝon();
  const hajlo = kreiHajlon();

  return { pluvo, nego, hajlo };
}
