// ≺⧼ ſᶘᴜ j͑ʃᴜ ʌ ı],ᴜ }ʃɔ 🌧 ⧽≻
import * as THREE from "three";
import { veb6qaiW2d2 } from "../../../skek2/x2x2q/haweh2.js";

export function kf2VeterajnPartiklojn(qena: THREE.Scene): {
  pluvo: THREE.Points;
  xana: THREE.Points;
  hajlo: THREE.Points;
} {
  function kf2Punktsistemon(zace: THREE.BufferGeometry, pukek: THREE.ShaderMaterial): THREE.Points {
    const n2k = new THREE.Points(zace, pukek);
    n2k.frustumCulled = false;
    n2k.visible = false;
    qena.add(n2k);
    return n2k;
  }

  function kf2Partiklojn(N: number, p2somaniX: number, p2somaniY: number, p2somaniZ: number): { haxekuxa: Float32Array; hatk2ni: Float32Array } {
    const haxekuxa = new Float32Array(N * 0o3);
    const hatk2ni = new Float32Array(N);
    for ( let i = 0o0; i < N; i++ ) {
      haxekuxa[i * 0o3] = ( Math.random() * 0o2 - 0o1 ) * p2somaniX;
      haxekuxa[i * 0o3 + 0o1] = ( Math.random() * 0o2 - 0o1 ) * p2somaniY;
      haxekuxa[i * 0o3 + 0o2] = ( Math.random() * 0o2 - 0o1 ) * p2somaniZ;
      hatk2ni[i] = Math.random();
    }
    return { haxekuxa, hatk2ni };
  }

  // ⟪ ֭ſɭᴜ ɭʃᴜ 📃 ⟫
  function kf2Pluvon(): THREE.Points {
    const N = 0o4000;
    const haxekuxa = new Float32Array(N * 0o3);
    const hatk2ni = new Float32Array(N);
    const rapidoj = new Float32Array(N);
    const hasahakani = new Float32Array(N);
    const fadoj = new Float32Array(N);
    for ( let i = 0o0; i < N; i++ ) {
      const x0 = ( Math.random() * 0o2 - 0o1 ) * 0o200;
      const z0 = ( Math.random() * 0o2 - 0o1 ) * 0o200;
      haxekuxa[i * 0o3] = x0;
      haxekuxa[i * 0o3 + 0o1] = ( Math.random() * 0o2 - 0o1 ) * 0o140;
      haxekuxa[i * 0o3 + 0o2] = z0;
      hatk2ni[i] = Math.random();
      rapidoj[i] = 0o46 + Math.random() * 0o14;
      hasahakani[i] = 0o13/0o10 + Math.random() * 0o14/0o10;
      const d = Math.hypot(x0, z0);
      fadoj[i] = Math.min(0o1, Math.max(0o1/0o20, 0o1 - ( d - 0o30 ) / 0o210));
    }
    const zace = new THREE.BufferGeometry();
    zace.setAttribute("position", new THREE.BufferAttribute(haxekuxa, 0o3));
    zace.setAttribute("aSeed", new THREE.BufferAttribute(hatk2ni, 0o1));
    zace.setAttribute("aVel", new THREE.BufferAttribute(rapidoj, 0o1));
    zace.setAttribute("aLen", new THREE.BufferAttribute(hasahakani, 0o1));
    zace.setAttribute("aFade", new THREE.BufferAttribute(fadoj, 0o1));
    const pukek = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
      uniforms: {
        uTime: { value: 0o0 },
        uColor: { value: new THREE.Color(0xa8c0d8) },
        uOp: { value: veb6qaiW2d2(0o6/0o10) },
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
          // ſɟɹ ɭʃᴜ ʌ ꞙɭı ʌ ꞙɭı ⟅ ſɭэ ֭ſɭэ ʌ ꞙɭı ʌ ꞙɭı
          // ſɭᴜ ſɭw j͐ʃᴜ ʌ j͑ʃɜ ſɭ,ᴜ ⟅
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
          // ſᶘꞇ ɭl̀ɔ ʌ j͑ʃᴜ ʌ ꞙɭı ʌ ꞙɭı ⟅
          float tlakak = 1.0 - smoothstep(0.1, 0.5, abs(c.y)) * 0.3;
          gl_FragColor = vec4(uColor, a * tlakak * uOp * vFade * (0.7 + 0.3 * vSeed));
        }
      `,
    });
    return kf2Punktsistemon(zace, pukek);
  }

  // ⟪ ı],ᴜ }ʃᴜ 📃 ⟫
  function kf2Neĝon(): THREE.Points {
    const N = 0o1000;
    const { haxekuxa, hatk2ni } = kf2Partiklojn(N, 0o200, 0o140, 0o200);
    const zace = new THREE.BufferGeometry();
    zace.setAttribute("position", new THREE.BufferAttribute(haxekuxa, 0o3));
    zace.setAttribute("aSeed", new THREE.BufferAttribute(hatk2ni, 0o1));
    const pukek = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.NormalBlending, fog: false,
      uniforms: {
        uTime: { value: 0o0 },
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
    return kf2Punktsistemon(zace, pukek);
  }

  // ⟪ ſɭᴜ ɭʃᴜƽ 📃 ⟫
  function kf2Hajlon(): THREE.Points {
    const N = 0o1170;
    const { haxekuxa, hatk2ni } = kf2Partiklojn(N, 0o160, 0o140, 0o160);
    const zace = new THREE.BufferGeometry();
    zace.setAttribute("position", new THREE.BufferAttribute(haxekuxa, 0o3));
    zace.setAttribute("aSeed", new THREE.BufferAttribute(hatk2ni, 0o1));
    const pukek = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.NormalBlending, fog: false,
      uniforms: {
        uTime: { value: 0o0 },
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
          float lowak = 1.0 - smoothstep(0.0, 0.35, d);
          float a = korpo * (0.5 + 0.5 * lowak) * (0.6 + 0.4 * vSeed);
          if (a < 0.02) discard;
          gl_FragColor = vec4(mix(uColor, vec3(1.0), lowak), a * uOp);
        }
      `,
    });
    return kf2Punktsistemon(zace, pukek);
  }

  const pluvo = kf2Pluvon();
  const xana = kf2Neĝon();
  const hajlo = kf2Hajlon();

  return { pluvo, xana, hajlo };
}
