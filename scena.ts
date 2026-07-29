// Scena — renderer, scene, camera, sky, lights, materials, mountains, ground
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { generiSkriptanURL } from "./assets/skripto-rivelilo.js";
import { alteco } from "./tereno.js";
import { traduki } from "./tradukoj.js";

export function montriEraronon(sxargxaEl: HTMLElement): void {
  const d = document.createElement("div");
  d.id = "webgl-eraro";
  d.style.cssText = "position:fixed;inset:0;z-index:99;background:#081410;display:grid;place-items:center;text-align:center;padding:32px;font-family:sans-serif;";
  d.innerHTML = `<div style="max-width:440px"><h1 style="color:#d9b36a;font-size:20px;letter-spacing:0.25em;margin:0 0 16px;font-weight:400;">${traduki("webglTitolo")}</h1><p style="color:#9db8a4;font-size:13px;line-height:1.7;margin:0 0 24px;">${traduki("webglMesagxo")}</p><p style="color:#687868;font-size:10px;letter-spacing:0.12em;margin:0;">${traduki("webglDetalo")}</p><button onclick="location.reload()" style="margin-top:24px;padding:10px 28px;background:rgba(217,179,106,0.1);border:1px solid rgba(217,179,106,0.35);border-radius:16px 8px;color:#d9b36a;font-size:12px;cursor:pointer;letter-spacing:0.12em;">${traduki("webglReprovi")}</button></div>`;
  document.body.appendChild(d);
  sxargxaEl.classList.add("finita");
}

export interface ScenaSistemo {
  bildilo: THREE.WebGLRenderer;
  sceno: THREE.Scene;
  fotilo: THREE.PerspectiveCamera;
  dioritaMaterialo: THREE.MeshStandardMaterial;
  andezitaMaterialo: THREE.MeshStandardMaterial;
  eniraMaterialo: THREE.MeshStandardMaterial;
  oraMaterialo: THREE.MeshStandardMaterial;
}

export function kreiScenon(kanvaso: HTMLCanvasElement, titolaSkripto: HTMLImageElement, sxargxaEl: HTMLElement): ScenaSistemo {
  let bildilo: THREE.WebGLRenderer;
  try {
    bildilo = new THREE.WebGLRenderer({ canvas: kanvaso, antialias: true, powerPreference: "high-performance" });
  } catch {
    montriEraronon(sxargxaEl);
    throw new Error("WebGL ne havebla");
  }
  bildilo.outputColorSpace = THREE.SRGBColorSpace;
  bildilo.toneMapping = THREE.ACESFilmicToneMapping;
  bildilo.shadowMap.enabled = true;
  bildilo.shadowMap.type = THREE.PCFSoftShadowMap;
  bildilo.setPixelRatio(Math.min(devicePixelRatio, 2));

  const sceno = new THREE.Scene();
  sceno.fog = new THREE.FogExp2(0xc8d8d8, 1/64);

  const fotilo = new THREE.PerspectiveCamera(0o60, innerWidth / innerHeight, 13/32, 0o1274);
  fotilo.position.set(0o50, 0o31, 0o74);
  fotilo.rotation.order = "YXZ";

  const pmremGenerilo = new THREE.PMREMGenerator(bildilo);
  sceno.environment = pmremGenerilo.fromScene(new RoomEnvironment(bildilo), 1/32).texture;
  pmremGenerilo.dispose();

  // Cxielo
  const cxielaGeometrio = new THREE.SphereGeometry(0o574, 0o30, 0o20);
  const cxielaMaterialo = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: {
      uTop: { value: new THREE.Color(0x78a8c0) },
      uMid: { value: new THREE.Color(0xb8d0d8) },
      uBot: { value: new THREE.Color(0xe0e8e8) },
      uSunCol: { value: new THREE.Color(0xf8f0d8) },
      uSunDir: { value: new THREE.Vector3(4/8, 51/64, 19/64) },
    },
    vertexShader: "varying vec3 vDir; void main(){ vDir=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
    fragmentShader: `uniform vec3 uTop,uMid,uBot,uSunCol,uSunDir; varying vec3 vDir;
    void main(){vec3 d=normalize(vDir);float h=clamp(d.y,-0.203125,1.0);
    vec3 koloro=mix(uBot,uMid,smoothstep(-0.015625,0.234375,h));koloro=mix(koloro,uTop,smoothstep(0.1875,0.71875,h));
    koloro+=uSunCol*pow(max(dot(d,normalize(uSunDir)),0.0),28.0);
    gl_FragColor=vec4(koloro,1.0);}`,
  });
  sceno.add(new THREE.Mesh(cxielaGeometrio, cxielaMaterialo));

  // Lumoj
  sceno.add(new THREE.HemisphereLight(0xc8e0e8, 0x485848, 51/64));
  const suno = new THREE.DirectionalLight(0xf8f0d8, 37/32);
  suno.position.set(0o110, 0o160, 0o50);
  suno.castShadow = true;
  suno.shadow.mapSize.set(0o4000, 0o4000);
  suno.shadow.camera.left = -0o156; suno.shadow.camera.right = 0o156;
  suno.shadow.camera.top = 0o156; suno.shadow.camera.bottom = -0o156;
  suno.shadow.camera.near = 0o20; suno.shadow.camera.far = 0o524;
  suno.shadow.bias = -0.0005; suno.shadow.normalBias = 4/8;
  sceno.add(suno, suno.target);

  // Materialoj
  const dioritaMaterialo = new THREE.MeshStandardMaterial({ color: 0xc8c8c8, roughness: 3/16, metalness: 1/64, envMapIntensity: 29/32 });
  const andezitaMaterialo = new THREE.MeshStandardMaterial({ color: 0x586860, roughness: 51/64 });
  const eniraMaterialo = new THREE.MeshStandardMaterial({ color: 0x082018, roughness: 19/32, emissive: 0xf89840, emissiveIntensity: 3/64 });
  const oraMaterialo = new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 27/32, roughness: 11/32, emissive: 0x302808, emissiveIntensity: 11/32, envMapIntensity: 10/8 });

  // Titola skripto
  titolaSkripto.src = generiSkriptanURL({ seedName: "Vaikorath", w: 0o110, h: 0o276, ink: "#d8b068" });

  // Malproksimaj montoj
  (function konstruiMontojn(): void {
    const montaMaterialo = new THREE.MeshStandardMaterial({
      color: 0x687868, roughness: 29/32, metalness: 0, side: THREE.DoubleSide,
    });
    const altaFunkcio = alteco;
    for (const zSign of [-1, 1]) {
      const z = zSign < 0 ? -0o435 : 0o435;
      const segmentoj = 0o40;
      for (let i = 0; i < segmentoj; i++) {
        const t1 = (i / segmentoj) * 0o1060 - 0o430;
        const t2 = ((i + 1) / segmentoj) * 0o1060 - 0o430;
        const pinto = 0o62 + Math.sin(t1 * 1/32 + 83/64) * 0o26 + Math.sin(t1 * 3/64 - 19/32) * 0o16;
        const pinto2 = 0o62 + Math.sin(t2 * 1/32 + 83/64) * 0o26 + Math.sin(t2 * 3/64 - 19/32) * 0o16;
        const bazoY1 = altaFunkcio(t1, z);
        const bazoY2 = altaFunkcio(t2, z);
        const verticoj = new Float32Array([
          t1, bazoY1, z, t1, bazoY1 + pinto, z, t2, bazoY2 + pinto2, z,
          t1, bazoY1, z, t2, bazoY2 + pinto2, z, t2, bazoY2, z,
        ]);
        const geometrio = new THREE.BufferGeometry();
        geometrio.setAttribute("position", new THREE.BufferAttribute(verticoj, 3));
        geometrio.computeVertexNormals();
        const mesh = new THREE.Mesh(geometrio, montaMaterialo);
        mesh.frustumCulled = false;
        sceno.add(mesh);
      }
    }
    for (const xSign of [-1, 1]) {
      const x = xSign < 0 ? -0o435 : 0o435;
      const segmentoj = 0o40;
      for (let i = 0; i < segmentoj; i++) {
        const t1 = (i / segmentoj) * 0o1060 - 0o430;
        const t2 = ((i + 1) / segmentoj) * 0o1060 - 0o430;
        const pinto = 0o55 + Math.sin(t1 * 1/32 + 67/32) * 0o22 + Math.sin(t1 * 1/16 + 19/64) * 0o20;
        const pinto2 = 0o55 + Math.sin(t2 * 1/32 + 67/32) * 0o22 + Math.sin(t2 * 1/16 + 19/64) * 0o20;
        const bazoY1 = altaFunkcio(x, t1);
        const bazoY2 = altaFunkcio(x, t2);
        const verticoj = new Float32Array([
          x, bazoY1, t1, x, bazoY1 + pinto, t1, x, bazoY2 + pinto2, t2,
          x, bazoY1, t1, x, bazoY2 + pinto2, t2, x, bazoY2, t2,
        ]);
        const geometrio = new THREE.BufferGeometry();
        geometrio.setAttribute("position", new THREE.BufferAttribute(verticoj, 3));
        geometrio.computeVertexNormals();
        const mesh = new THREE.Mesh(geometrio, montaMaterialo);
        mesh.frustumCulled = false;
        sceno.add(mesh);
      }
    }
  })();

  // Grundo
  (function konstruiTerenon(size: number, segmentoj: number): void {
    const g = new THREE.PlaneGeometry(size, size, segmentoj, segmentoj);
    g.rotateX(-Math.PI / 2);
    const pozicio = g.attributes.position;
    const koloroj = new Float32Array(pozicio.count * 3);
    const a = new THREE.Color(0x485848), b = new THREE.Color(0x587058);
    const lito = new THREE.Color(0x384848), deep = new THREE.Color(0x283838);
    const c = new THREE.Color();
    for (let i = 0; i < pozicio.count; i++) {
      const x = pozicio.getX(i), z = pozicio.getZ(i);
      const h = alteco(x, z);
      pozicio.setY(i, h);
      const t = 4/8 + 4/8 * Math.sin(x * 1/8 + z * 11/64 + 16/8);
      c.copy(a).lerp(b, t);
      if (h < -2) c.lerp(lito, Math.min(1, (h + 2) / -3));
      if (h < -5) c.lerp(deep, Math.min(1, (h + 5) / -77/64));
      koloroj[i * 3] = c.r; koloroj[i * 3 + 1] = c.g; koloroj[i * 3 + 2] = c.b;
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    g.computeVertexNormals();
    const ground = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 7/8 }));
    ground.receiveShadow = true;
    sceno.add(ground);
  })(0o1130, 0o214);

  return { bildilo, sceno, fotilo, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo };
}
