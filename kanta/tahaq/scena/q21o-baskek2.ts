// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſ͕ɭɹ ſᶘɜ ʌ ʃᴜ j͑ʃƽɔ ſɭɹ 📃 ⧽≻

import * as THREE from "three";
import { veb6qaiW2d2 } from "../../../skek2/p6kpu/haweh2.js";

export function kf2Q21oBaskek2jn(qena: THREE.Scene): {
  hata: THREE.Points;
  xana: THREE.Points;
  katak: THREE.Points;
} {
  function kf2N2kKantan(zace: THREE.BufferGeometry, pukek: THREE.ShaderMaterial): THREE.Points {
    const n2k = new THREE.Points(zace, pukek);
    n2k.frustumCulled = false;
    n2k.visible = false;
    qena.add(n2k);
    return n2k;
  }

  function kf2Baskek2jn(vem2: number, p2somaniX: number, p2somaniY: number, p2somaniZ: number): { haxekuxa: Float32Array; hatk2ni: Float32Array } {
    const haxekuxa = new Float32Array(vem2 * 0o3);
    const hatk2ni = new Float32Array(vem2);
    for ( let kek = 0o0; kek < vem2; kek++ ) {
      haxekuxa[kek * 0o3] = ( Math.random() * 0o2 - 0o1 ) * p2somaniX;
      haxekuxa[kek * 0o3 + 0o1] = ( Math.random() * 0o2 - 0o1 ) * p2somaniY;
      haxekuxa[kek * 0o3 + 0o2] = ( Math.random() * 0o2 - 0o1 ) * p2somaniZ;
      hatk2ni[kek] = Math.random();
    }
    return { haxekuxa, hatk2ni };
  }

  // ⟪ ֭ſɭᴜ ɭʃᴜ 📃 ⟫
  function kf2Hata(): THREE.Points {
    const vem2 = 0o4000;
    const haxekuxa = new Float32Array(vem2 * 0o3);
    const hatk2ni = new Float32Array(vem2);
    const seheni = new Float32Array(vem2);
    const hasahakani = new Float32Array(vem2);
    const sohok = new Float32Array(vem2);
    for ( let kek = 0o0; kek < vem2; kek++ ) {
      const saxeX = ( Math.random() * 0o2 - 0o1 ) * 0o200;
      const saxeZ = ( Math.random() * 0o2 - 0o1 ) * 0o200;
      haxekuxa[kek * 0o3] = saxeX;
      haxekuxa[kek * 0o3 + 0o1] = ( Math.random() * 0o2 - 0o1 ) * 0o140;
      haxekuxa[kek * 0o3 + 0o2] = saxeZ;
      hatk2ni[kek] = Math.random();
      seheni[kek] = 0o46 + Math.random() * 0o14;
      hasahakani[kek] = 0o13/0o10 + Math.random() * 0o14/0o10;
      const h6kuni = Math.hypot(saxeX, saxeZ);
      sohok[kek] = Math.min(0o1, Math.max(0o1/0o20, 0o1 - ( h6kuni - 0o30 ) / 0o210));
    }
    const zace = new THREE.BufferGeometry();
    zace.setAttribute("position", new THREE.BufferAttribute(haxekuxa, 0o3));
    zace.setAttribute("aHatk2ni", new THREE.BufferAttribute(hatk2ni, 0o1));
    zace.setAttribute("aSeheni", new THREE.BufferAttribute(seheni, 0o1));
    zace.setAttribute("aSahakani", new THREE.BufferAttribute(hasahakani, 0o1));
    zace.setAttribute("aSohok", new THREE.BufferAttribute(sohok, 0o1));
    const pukek = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
      uniforms: {
        uStih2: { value: 0o0 },
        uWeh2: { value: new THREE.Color(0xa8c0d8) },
        uVem2: { value: veb6qaiW2d2(0o6/0o10) },
        uSefini: { value: 0o1/0o20 },
        uTafkaq: { value: 0o2/0o10 },
        uP6zuk: { value: 0o1000 },
      },
      vertexShader: `
        uniform float uStih2;
        uniform float uP6zuk;
        attribute float aHatk2ni;
        attribute float aSeheni;
        attribute float aSahakani;
        attribute float aSohok;
        varying float vHatk2ni;
        varying float vSohok;
        varying float vPal6;
        void main() {
          vHatk2ni = aHatk2ni;
          vSohok = aSohok;
          vec4 haxekuxaKozu = modelMatrix * vec4(position, 1.0);
          float f = aHatk2ni * 6.28318;
          float so3akak = uStih2 * aSeheni;
          haxekuxaKozu.x -= sin(so3akak * 0.05 + f) * 26.0;
          haxekuxaKozu.y = -112.0 + mod(haxekuxaKozu.y + 112.0 - so3akak, 208.0);
          vec4 haxekuxaCatahaq = viewMatrix * haxekuxaKozu;
          // ſɟɹ ɭʃᴜ ʌ ꞙɭı ʌ ꞙɭı ⟅ ſɭэ ֭ſɭэ ʌ ꞙɭı ʌ ꞙɭı
          // ſɭᴜ ſɭw j͐ʃᴜ ʌ j͑ʃɜ ſɭ,ᴜ ⟅
          float n2kPal6 = aSahakani * uP6zuk / -haxekuxaCatahaq.z;
          gl_PointSize = clamp(n2kPal6, 5.0, 48.0);
          vPal6 = gl_PointSize;
          gl_Position = projectionMatrix * haxekuxaCatahaq;
        }
      `,
      fragmentShader: `
        uniform vec3 uWeh2;
        uniform float uVem2;
        uniform float uSefini;
        uniform float uTafkaq;
        varying float vHatk2ni;
        varying float vSohok;
        varying float vPal6;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float cs = cos(uTafkaq), sn = sin(uTafkaq);
          c = mat2(cs, -sn, sn, cs) * c;
          float r = uSefini;
          vec2 q = vec2(abs(c.x), abs(c.y) - (0.5 - r));
          float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
          float xaha = 1.5 / vPal6;
          float a = 1.0 - smoothstep(-xaha, xaha, d);
          if (a < 0.01) discard;
          // ſᶘꞇ ɭl̀ɔ ʌ j͑ʃᴜ ʌ ꞙɭı ʌ ꞙɭı ⟅
          float tlakak = 1.0 - smoothstep(0.1, 0.5, abs(c.y)) * 0.3;
          gl_FragColor = vec4(uWeh2, a * tlakak * uVem2 * vSohok * (0.7 + 0.3 * vHatk2ni));
        }
      `,
    });
    return kf2N2kKantan(zace, pukek);
  }

  function kf2Xana(): THREE.Points {
    const vem2 = 0o1000;
    const { haxekuxa, hatk2ni } = kf2Baskek2jn(vem2, 0o200, 0o140, 0o200);
    const zace = new THREE.BufferGeometry();
    zace.setAttribute("position", new THREE.BufferAttribute(haxekuxa, 0o3));
    zace.setAttribute("aHatk2ni", new THREE.BufferAttribute(hatk2ni, 0o1));
    const pukek = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.NormalBlending, fog: false,
      uniforms: {
        uStih2: { value: 0o0 },
        uWeh2: { value: new THREE.Color(0xf0f8f8) },
        uVem2: { value: 0o10/0o10 },
        uPal6: { value: 0o7 },
      },
      vertexShader: `
        uniform float uStih2;
        uniform float uPal6;
        attribute float aHatk2ni;
        varying float vHatk2ni;
        void main() {
          vHatk2ni = aHatk2ni;
          vec4 haxekuxaKozu = modelMatrix * vec4(position, 1.0);
          float f = aHatk2ni * 6.28318;
          haxekuxaKozu.x += sin(uStih2 * 0.7 + f) * 4.0;
          haxekuxaKozu.z += cos(uStih2 * 0.5 + f * 1.3) * 4.0;
          float so3akak = uStih2 * (2.0 + aHatk2ni * 2.0);
          haxekuxaKozu.y = -112.0 + mod(haxekuxaKozu.y + 112.0 - so3akak, 208.0);
          vec4 haxekuxaCatahaq = viewMatrix * haxekuxaKozu;
          float n2kPal6 = uPal6 * (100.0 / -haxekuxaCatahaq.z) * (0.6 + 0.5 * sin(f));
          gl_PointSize = min(n2kPal6, 50.0);
          gl_Position = projectionMatrix * haxekuxaCatahaq;
        }
      `,
      fragmentShader: `
        uniform vec3 uWeh2;
        uniform float uVem2;
        varying float vHatk2ni;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c) * 2.0;
          float a = (1.0 - smoothstep(0.4, 1.0, d)) * (0.6 + 0.4 * vHatk2ni);
          if (a < 0.01) discard;
          gl_FragColor = vec4(uWeh2, a * uVem2);
        }
      `,
    });
    return kf2N2kKantan(zace, pukek);
  }

  // ⟪ ſɭᴜ ɭʃᴜƽ 📃 ⟫
  function kf2Katak(): THREE.Points {
    const vem2 = 0o1170;
    const { haxekuxa, hatk2ni } = kf2Baskek2jn(vem2, 0o160, 0o140, 0o160);
    const zace = new THREE.BufferGeometry();
    zace.setAttribute("position", new THREE.BufferAttribute(haxekuxa, 0o3));
    zace.setAttribute("aHatk2ni", new THREE.BufferAttribute(hatk2ni, 0o1));
    const pukek = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.NormalBlending, fog: false,
      uniforms: {
        uStih2: { value: 0o0 },
        uWeh2: { value: new THREE.Color(0xd8e8f0) },
        uVem2: { value: 0o10/0o10 },
        uPal6: { value: 0o14 },
      },
      vertexShader: `
        uniform float uStih2;
        uniform float uPal6;
        attribute float aHatk2ni;
        varying float vHatk2ni;
        void main() {
          vHatk2ni = aHatk2ni;
          vec4 haxekuxaKozu = modelMatrix * vec4(position, 1.0);
          float f = aHatk2ni * 6.28318;
          float so3akak = uStih2 * (55.0 + aHatk2ni * 25.0);
          haxekuxaKozu.x -= sin(so3akak * 0.05 + f) * 24.0;
          haxekuxaKozu.x += sin(uStih2 * 13.0 + f) * 0.6;
          haxekuxaKozu.y = -112.0 + mod(haxekuxaKozu.y + 112.0 - so3akak, 208.0);
          vec4 haxekuxaCatahaq = viewMatrix * haxekuxaKozu;
          float n2kPal6 = uPal6 * (100.0 / -haxekuxaCatahaq.z) * (0.55 + 0.6 * vHatk2ni);
          gl_PointSize = min(n2kPal6, 40.0);
          gl_Position = projectionMatrix * haxekuxaCatahaq;
        }
      `,
      fragmentShader: `
        uniform vec3 uWeh2;
        uniform float uVem2;
        varying float vHatk2ni;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c) * 2.0;
          float soq = 1.0 - smoothstep(0.3, 0.55, d);
          float lowak = 1.0 - smoothstep(0.0, 0.35, d);
          float a = soq * (0.5 + 0.5 * lowak) * (0.6 + 0.4 * vHatk2ni);
          if (a < 0.02) discard;
          gl_FragColor = vec4(mix(uWeh2, vec3(1.0), lowak), a * uVem2);
        }
      `,
    });
    return kf2N2kKantan(zace, pukek);
  }

  const hata = kf2Hata();
  const xana = kf2Xana();
  const katak = kf2Katak();

  return { hata, xana, katak };
}
