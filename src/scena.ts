// Scena — bildilo, sceno, fotilo, ĉielo, lumoj, materialoj, montoj, grundo, vetero
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { alteco } from "./tereno.js";
import { traduki } from "./tradukoj.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon, kreiEniranMaterialon, kreiOranMaterialon } from "../assets/komunajxoj/materialoj.js";

export function montriEraronon(sxargxaEl: HTMLElement): void {
  const d = document.createElement("div");
  // La ekstera stilfolio provizas la plenekranan tegilon ( .sozanu + .er2ha +
  // .a3e ) kaj la tutan tipografion/spacojn de h1/p/button — nenia loka CSS,
  // neniaj enliniaj stiloj.
  d.className = "sozanu er2ha a3e";
  d.innerHTML = `<h1>${traduki("titoloSxargxo")}</h1><p>${traduki("webglMesagxo")}</p><p>${traduki("webglDetalo")}</p><button onclick="location.reload()">${traduki("webglReprovi")}</button>`;
  document.body.appendChild(d);
  sxargxaEl.classList.add("finita");
}

// Vetero — la kvar eblaj atmosferoj apud la kutima krepuska reĝimo. La
// defaŭlta estas la nebula ( la urbo sidas en nebula betularo ).
export type Vetero = "nebula" | "pluva" | "hajla" | "nega";

export interface ScenaSistemo {
  bildilo: THREE.WebGLRenderer;
  sceno: THREE.Scene;
  fotilo: THREE.PerspectiveCamera;
  dioritaMaterialo: THREE.MeshStandardMaterial;
  andezitaMaterialo: THREE.MeshStandardMaterial;
  eniraMaterialo: THREE.MeshStandardMaterial;
  oraMaterialo: THREE.MeshStandardMaterial;
  cxielo: THREE.Mesh;
  cxielajUniformoj: Record<string, THREE.IUniform>;
  hemiLumo: THREE.HemisphereLight;
  suna: THREE.DirectionalLight;
  sunaSprajto: THREE.Sprite;
  aplikiRezimon: (t: number) => void;
  aplikiVeteron: (v: Vetero) => void;
  gxisdatigiVeteron: (t: number) => void;
}

export function kreiScenon(kanvaso: HTMLCanvasElement, sxargxaEl: HTMLElement): ScenaSistemo {
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
  bildilo.shadowMap.type = THREE.PCFShadowMap;
  bildilo.setPixelRatio(Math.min(devicePixelRatio, 2));

  const sceno = new THREE.Scene();
  // La nebulo estas laŭcela. Je la defaŭlta denseco ( la nebula vetero uzas
  // 0o1/0o64 = 1/52 ) la urbo restas klara kaj la arbaro kaj la malproksimaj
  // montoj fandas en atmosferan nebulaĵon — la proksima montaro ( 120–160
  // for ) ankoraŭ leviĝas el la nebulo kiel malhelaj siluetoj. La paletraj
  // veteroj povas pliigi aŭ malpliigi la densecon ( aplikiAtmosferon ).
  sceno.fog = new THREE.FogExp2(0xc8d8d8, 0o1/0o100);

  const fotilo = new THREE.PerspectiveCamera(0o60, innerWidth / innerHeight, 0o15/0o40, 0o1274);
  fotilo.position.set(0o50, 0o31, 0o74);
  fotilo.rotation.order = "YXZ";

  const pmremGenerilo = new THREE.PMREMGenerator(bildilo);
  sceno.environment = pmremGenerilo.fromScene(new RoomEnvironment(bildilo), 0o1/0o40).texture;
  pmremGenerilo.dispose();

  // Cxielo
  const cxielajUniformoj: Record<string, THREE.IUniform> = {
    uTop: { value: new THREE.Color(0x78a8c0) },
    uMid: { value: new THREE.Color(0xb8d0d8) },
    uBot: { value: new THREE.Color(0xe0e8e8) },
    uSunCol: { value: new THREE.Color(0xf8f0d8) },
    uSunDir: { value: new THREE.Vector3(0o4/0o10, 0o63/0o100, 0o23/0o100) },
  };
  const cxielaGeometrio = new THREE.SphereGeometry(0o574, 0o30, 0o20);
  const cxielaMaterialo = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: cxielajUniformoj,
    vertexShader: "varying vec3 vDir; void main(){ vDir=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
    fragmentShader: `uniform vec3 uTop,uMid,uBot,uSunCol,uSunDir; varying vec3 vDir;
    void main(){vec3 d=normalize(vDir);float h=clamp(d.y,-0.203125,1.0);
    vec3 koloro=mix(uBot,uMid,smoothstep(-0.015625,0.234375,h));koloro=mix(koloro,uTop,smoothstep(0.1875,0.71875,h));
    koloro+=uSunCol*pow(max(dot(d,normalize(uSunDir)),0.0),28.0);
    gl_FragColor=vec4(koloro,1.0);}`,
  });
  const cxielo = new THREE.Mesh(cxielaGeometrio, cxielaMaterialo);
  sceno.add(cxielo);

  // Lumoj
  const hemiLumo = new THREE.HemisphereLight(0xc8e0e8, 0x485848, 0o63/0o100);
  sceno.add(hemiLumo);
  const suno = new THREE.DirectionalLight(0xf8f0d8, 0o45/0o40);
  suno.position.set(0o110, 0o160, 0o50);
  suno.castShadow = true;
  suno.shadow.mapSize.set(0o2000, 0o2000);
  suno.shadow.camera.left = -0o156; suno.shadow.camera.right = 0o156;
  suno.shadow.camera.top = 0o156; suno.shadow.camera.bottom = -0o156;
  suno.shadow.camera.near = 0o20; suno.shadow.camera.far = 0o524;
  suno.shadow.bias = -0o1/0o4000; suno.shadow.normalBias = 0o4/0o10;
  sceno.add(suno, suno.target);

  // Suna sprajto
  const molaTeksturo = (() => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 0o400;
    const ctx = cv.getContext("2d")!;
    const gr = ctx.createRadialGradient(0o200, 0o200, 0o10, 0o200, 0o200, 0o200);
    gr.addColorStop(0, "rgba(255,255,255,0.85)"); gr.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gr; ctx.fillRect(0, 0, 0o400, 0o400);
    return new THREE.CanvasTexture(cv);
  })();
  const sunaSprajto = new THREE.Sprite(new THREE.SpriteMaterial({
    map: molaTeksturo, color: 0xfff0d8, transparent: true, opacity: 0o30/0o100,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
  }));
  sunaSprajto.scale.setScalar(0o56);
  sceno.add(sunaSprajto);

  // Tag/krepuskaj paletroj — po unu paro ( tago · krepusko ) por ĉiu vetero.
  // La nebula vetero konservas la originajn valorojn ( kun iom pli densa
  // nebulo, por ke la nomo estu honesta ); la pluva, la hajla kaj la neĝa
  // ŝanĝas la ĉielon, la lumon kaj la nebulan densecon en sia karaktero.
  interface VeteraPaletro {
    top: THREE.Color; mid: THREE.Color; bot: THREE.Color;
    sunCol: THREE.Color; fog: THREE.Color;
    hemiSky: THREE.Color; hemiGnd: THREE.Color;
    sunPos: THREE.Vector3;
    sunInt: number; hemiInt: number; sprajtaOp: number; ekspozicio: number; nebulDenso: number;
  }
  interface VeteraDuopo { tago: VeteraPaletro; krepusko: VeteraPaletro; }

  const PALETROJ: Record<Vetero, VeteraDuopo> = {
    // Nebula — la defaŭlta: pala ĉielo, milda lumo kaj densa atmosfera nebulo.
    nebula: {
      tago: {
        top: new THREE.Color(0x78a8c0), mid: new THREE.Color(0xb8d0d8), bot: new THREE.Color(0xe0e8e8),
        sunCol: new THREE.Color(0xfff0d8), fog: new THREE.Color(0xc8d8d8),
        hemiSky: new THREE.Color(0xc8e0e8), hemiGnd: new THREE.Color(0x485848),
        sunPos: new THREE.Vector3(0o110, 0o160, 0o50), sunInt: 0o45/0o40, hemiInt: 0o63/0o100,
        sprajtaOp: 0o30/0o100, ekspozicio: 0o104/0o100, nebulDenso: 0o1/0o64,
      },
      krepusko: {
        top: new THREE.Color(0x182848), mid: new THREE.Color(0x586088), bot: new THREE.Color(0xb88868),
        sunCol: new THREE.Color(0xf8b880), fog: new THREE.Color(0x686880),
        hemiSky: new THREE.Color(0x304068), hemiGnd: new THREE.Color(0x182820),
        sunPos: new THREE.Vector3(-0o120, 0o36, -0o74), sunInt: 0o16/0o40, hemiInt: 0o40/0o100,
        sprajtaOp: 0o54/0o100, ekspozicio: 0o74/0o100, nebulDenso: 0o1/0o64,
      },
    },
    // Pluva — grize blua nubkovro, malpli da suno, pli densa nebulo.
    pluva: {
      tago: {
        top: new THREE.Color(0x688090), mid: new THREE.Color(0x8a98a0), bot: new THREE.Color(0xb0b8b8),
        sunCol: new THREE.Color(0xd8e0e0), fog: new THREE.Color(0x98a0a0),
        hemiSky: new THREE.Color(0xa8b8b8), hemiGnd: new THREE.Color(0x384040),
        sunPos: new THREE.Vector3(0o110, 0o160, 0o50), sunInt: 0o5/0o10, hemiInt: 0o42/0o100,
        sprajtaOp: 0o4/0o100, ekspozicio: 0o76/0o100, nebulDenso: 0o1/0o50,
      },
      krepusko: {
        top: new THREE.Color(0x182028), mid: new THREE.Color(0x485258), bot: new THREE.Color(0x686868),
        sunCol: new THREE.Color(0x98a0a0), fog: new THREE.Color(0x505858),
        hemiSky: new THREE.Color(0x283238), hemiGnd: new THREE.Color(0x101616),
        sunPos: new THREE.Vector3(-0o120, 0o36, -0o74), sunInt: 0o1/0o10, hemiInt: 0o24/0o100,
        sprajtaOp: 0o3/0o100, ekspozicio: 0o62/0o100, nebulDenso: 0o1/0o50,
      },
    },
    // Hajla — malhela ardeza ŝtormo, akra kaj malvarma, kun pli da videbleco
    // ol la pluvo ( la hajleroj mem estas la spektaklo ).
    hajla: {
      tago: {
        top: new THREE.Color(0x485868), mid: new THREE.Color(0x788088), bot: new THREE.Color(0xa0a8a8),
        sunCol: new THREE.Color(0xd8e0e8), fog: new THREE.Color(0x889090),
        hemiSky: new THREE.Color(0x889898), hemiGnd: new THREE.Color(0x303838),
        sunPos: new THREE.Vector3(0o110, 0o160, 0o50), sunInt: 0o4/0o10, hemiInt: 0o36/0o100,
        sprajtaOp: 0o5/0o100, ekspozicio: 0o70/0o100, nebulDenso: 0o1/0o50,
      },
      krepusko: {
        top: new THREE.Color(0x141c24), mid: new THREE.Color(0x3c444c), bot: new THREE.Color(0x585858),
        sunCol: new THREE.Color(0x889098), fog: new THREE.Color(0x444c50),
        hemiSky: new THREE.Color(0x202c30), hemiGnd: new THREE.Color(0x101414),
        sunPos: new THREE.Vector3(-0o120, 0o36, -0o74), sunInt: 0o6/0o40, hemiInt: 0o20/0o100,
        sprajtaOp: 0o3/0o100, ekspozicio: 0o56/0o100, nebulDenso: 0o1/0o50,
      },
    },
    // Neĝa — hela malvarma blanko, difuza lumo, milda nebulo.
    nega: {
      tago: {
        top: new THREE.Color(0xa0b0c0), mid: new THREE.Color(0xc8d4dc), bot: new THREE.Color(0xe8ece8),
        sunCol: new THREE.Color(0xf0f4f8), fog: new THREE.Color(0xc8d0d8),
        hemiSky: new THREE.Color(0xd0dce4), hemiGnd: new THREE.Color(0x586058),
        sunPos: new THREE.Vector3(0o110, 0o160, 0o50), sunInt: 0o30/0o40, hemiInt: 0o72/0o100,
        sprajtaOp: 0o14/0o100, ekspozicio: 0o102/0o100, nebulDenso: 0o1/0o60,
      },
      krepusko: {
        top: new THREE.Color(0x202838), mid: new THREE.Color(0x506070), bot: new THREE.Color(0x8a98a0),
        sunCol: new THREE.Color(0xb8c8d8), fog: new THREE.Color(0x687078),
        hemiSky: new THREE.Color(0x34404c), hemiGnd: new THREE.Color(0x202828),
        sunPos: new THREE.Vector3(-0o120, 0o36, -0o74), sunInt: 0o14/0o40, hemiInt: 0o30/0o100,
        sprajtaOp: 0o6/0o100, ekspozicio: 0o70/0o100, nebulDenso: 0o1/0o60,
      },
    },
  };

  let nunaVetero: Vetero = "nebula";
  let lastaKrepusko = 0;

  function aplikiAtmosferon(): void {
    const t = lastaKrepusko;
    const d = PALETROJ[nunaVetero];
    const l = (a: THREE.Color | THREE.Vector3 | number, b: THREE.Color | THREE.Vector3 | number): any =>
      a instanceof THREE.Color ? (a as THREE.Color).clone().lerp(b as THREE.Color, t) :
      a instanceof THREE.Vector3 ? (a as THREE.Vector3).clone().lerp(b as THREE.Vector3, t) :
      a + (b as number - a) * t;
    cxielajUniformoj.uTop.value = l(d.tago.top, d.krepusko.top);
    cxielajUniformoj.uMid.value = l(d.tago.mid, d.krepusko.mid);
    cxielajUniformoj.uBot.value = l(d.tago.bot, d.krepusko.bot);
    cxielajUniformoj.uSunCol.value = l(d.tago.sunCol, d.krepusko.sunCol);
    const sunDir = new THREE.Vector3().copy(d.tago.sunPos).lerp(d.krepusko.sunPos, t);
    cxielajUniformoj.uSunDir.value = sunDir.clone().normalize();
    sceno.fog!.color.copy(d.tago.fog).lerp(d.krepusko.fog, t);
    (sceno.fog as THREE.FogExp2).density = l(d.tago.nebulDenso, d.krepusko.nebulDenso);
    hemiLumo.color.copy(d.tago.hemiSky).lerp(d.krepusko.hemiSky, t);
    hemiLumo.groundColor.copy(d.tago.hemiGnd).lerp(d.krepusko.hemiGnd, t);
    hemiLumo.intensity = l(d.tago.hemiInt, d.krepusko.hemiInt);
    suno.color.copy(d.tago.sunCol).lerp(d.krepusko.sunCol, t);
    suno.intensity = l(d.tago.sunInt, d.krepusko.sunInt);
    suno.position.copy(d.tago.sunPos).lerp(d.krepusko.sunPos, t);
    bildilo.toneMappingExposure = l(d.tago.ekspozicio, d.krepusko.ekspozicio);
    sunaSprajto.position.copy(sunDir).multiplyScalar(0o510);
    sunaSprajto.material.color.copy(suno.color);
    sunaSprajto.material.opacity = l(d.tago.sprajtaOp, d.krepusko.sprajtaOp);
    eniraMaterialo.emissiveIntensity = l(0o3/0o100, 0o52/0o100);
  }

  function aplikiRezimon(t: number): void {
    lastaKrepusko = t;
    aplikiAtmosferon();
  }

  function aplikiVeteron(v: Vetero): void {
    nunaVetero = v;
    pluvo.visible = v === "pluva";
    hajlo.visible = v === "hajla";
    nego.visible = v === "nega";
    aplikiAtmosferon();
  }

  function gxisdatigiVeteron(t: number): void {
    // En la nebula vetero neniu precipita sistemo estas videbla — nenio farendas.
    if (!pluvo.visible && !nego.visible && !hajlo.visible) return;
    // Ĉiuj tri sistemoj estas GPU-animitaj ( uTime ); la pluvo bezonas ankaŭ
    // la pikselan skalon, por projekcii la gut-longon al streka longo.
    if (pluvo.visible) {
      const mat = pluvo.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = t;
      // Pikseloj por unu mondo-unuo ĉe distanco 1 ( la fotila fov × bilda alto ).
      mat.uniforms.uScale.value =
        bildilo.domElement.height / (2 * Math.tan(fotilo.fov * Math.PI / 360));
    }
    if (nego.visible) (nego.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
    if (hajlo.visible) (hajlo.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
    // La skatoloj sekvas la fotilon — ĉiuj tri ( ankaŭ la pluvo, kiu nun
    // estas loka skatolo kiel la neĝo kaj la hajlo ).
    pluvo.position.copy(fotilo.position);
    nego.position.copy(fotilo.position);
    hajlo.position.copy(fotilo.position);
  }

  // Materialoj — la diorito estas polurita ŝtono, do ĝi reflektas la
  // ĉirkaŭan medion pli forte por la brila poluro.
  const dioritaMaterialo = kreiDioritanMaterialon(undefined, 0o6/0o10);
  const andezitaMaterialo = kreiAndezitanMaterialon();
  const eniraMaterialo = kreiEniranMaterialon();
  const oraMaterialo = kreiOranMaterialon(0xd8b068);

  // kreiPunktsistemon — Komuna fino de la veteraj partiklo-sistemoj. La
  // geometrio kaj la materialo estas malsamaj por ĉiu vetero ( pluvo, neĝo,
  // hajlo ), sed ĉiu estas malfermita Points-sistemo en la sceno, kaŝita ĝis
  // la vetero montras ĝin.
  //     @param geometrio ( THREE.BufferGeometry ) - La partikla geometrio.
  //     @param materialo ( THREE.ShaderMaterial ) - La partikla materialo.
  //     @returns punktoj ( THREE.Points ) - La sistemo, en la sceno kaj kaŝita.
  function kreiPunktsistemon(geometrio: THREE.BufferGeometry, materialo: THREE.ShaderMaterial): THREE.Points {
    const punktoj = new THREE.Points(geometrio, materialo);
    punktoj.frustumCulled = false;
    punktoj.visible = false;
    sceno.add(punktoj);
    return punktoj;
  }

  // kreiPartiklojn — Hazardaj pozicioj en skatolo ( ±x, ±y, ±z ) kun hazarda
  // semo po partiklo. Komuna bazo por la neĝo kaj la hajlo; la pluvo havas
  // siajn proprajn atributojn ( rapido, longeco, fado ) kaj restas aparta.
  //     @param N ( number ) - Partikla nombro.
  //     @param duonoX, duonoY, duonoZ ( number ) - Duon-grandoj de la skatolo.
  //     @returns datumoj ( { pozicioj, semoj } ) - La atributaj areoj.
  function kreiPartiklojn(N: number, duonoX: number, duonoY: number, duonoZ: number): { pozicioj: Float32Array; semoj: Float32Array } {
    const pozicioj = new Float32Array(N * 3);
    const semoj = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pozicioj[i * 3] = (Math.random() * 2 - 1) * duonoX;
      pozicioj[i * 3 + 1] = (Math.random() * 2 - 1) * duonoY;
      pozicioj[i * 3 + 2] = (Math.random() * 2 - 1) * duonoZ;
      semoj[i] = Math.random();
    }
    return { pozicioj, semoj };
  }

  // ⟪ Pluvo 📃 ⟫ — ĉiu guto estas KAPSULO ( cilindra streko kun rondigitaj
  // finoj ) desegnita en la fragment-shadero sur kvadrata gl_PointSize-punkto.
  // La antaŭaj LineSegments estis 1px kun kvadrataj finoj ( WebGL ne kapablas
  // linio-dikecon nek rondigitajn ĉapojn ), kaj la punkta streko estis kvadrata
  // sprite. La kapsula distanca funkcio donas veran dikecon kaj rondigitajn
  // finojn. La falo, la venta bofo kaj la ĉirkaŭvolvo okazas en la vertica
  // shadero ( GPU ), do necesas nur uTime po kadro — neniu CPU-ĝisdatigo.
  function kreiPluvon(): THREE.Points {
    // La strekoj estas pli dikaj ol la antaŭaj 1px linioj, do necesas iom pli
    // da gutoj por ke la pluvo restu klare ĉeestanta kontraŭ la nebulo.
    const N = 0o4000;
    const pozicioj = new Float32Array(N * 3);
    const semoj = new Float32Array(N);
    const rapidoj = new Float32Array(N);
    const longoj = new Float32Array(N);
    const fadoj = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const x0 = (Math.random() * 2 - 1) * 0o200;
      const z0 = (Math.random() * 2 - 1) * 0o200;
      pozicioj[i * 3] = x0;
      pozicioj[i * 3 + 1] = (Math.random() * 2 - 1) * 0o140;
      pozicioj[i * 3 + 2] = z0;
      semoj[i] = Math.random();
      // Fala rapido kaj LONGECO — pli mallongaj strekoj ol antaŭe ( 1.4–2.9
      // anstataŭ 2–5 ), por ke la gutoj legiĝu kiel gutoj, ne kiel vergoj.
      rapidoj[i] = 0o46 + Math.random() * 0o14;
      longoj[i] = 0o13/0o10 + Math.random() * 0o14/0o10;
      // Distanca fado — la loka ofseto egalas la mondan distancon de la fotilo.
      const d = Math.hypot(x0, z0);
      fadoj[i] = Math.min(1, Math.max(0.05, 1 - (d - 24) / 136));
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
        uAncho: { value: 0o1/0o20 },   // fina radiuso kiel frakcio de la punkta alto
        uAng: { value: 0o2/0o10 },    // venta klino de la strekoj ( 14° )
        uScale: { value: 0o1000 },    // pikseloj por unu mondo-unuo ĉe distanco 1
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
          // Vertikala falo kun venta bofo — la sinusoido donas neniun salton.
          float falo = uTime * aVel;
          wp.x -= sin(falo * 0.05 + f) * 26.0;
          wp.y = -112.0 + mod(wp.y + 112.0 - falo, 208.0);
          vec4 mv = viewMatrix * wp;
          // Punkta grandeco = la projekciita mondo-longo de la guto ( aLen )
          // en pikseloj, kun minimumo por ke la streko havu dikecon kaj la
          // rondigitaj finoj restu videblaj malproksime.
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
          // Venta klino — turnu la strekon tiel, ke ĝia supro klinas ventdirekte.
          float cs = cos(uAng), sn = sin(uAng);
          c = mat2(cs, -sn, sn, cs) * c;
          // Kapsula distanca funkcio — rektangulo kun duoncirklaj finoj. La
          // punkto estas la plena streko ( alto 1 ); r estas la fina radiuso.
          float r = uAncho;
          vec2 q = vec2(abs(c.x), abs(c.y) - (0.5 - r));
          float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
          float soft = 1.5 / vSize;
          float a = 1.0 - smoothstep(-soft, soft, d);
          if (a < 0.01) discard;
          // Subtila maliĝo al la finoj — la guto estas plej hela meze — kaj
          // per-guta brileco por rompi la unuformecon.
          float fina = 1.0 - smoothstep(0.1, 0.5, abs(c.y)) * 0.3;
          gl_FragColor = vec4(uColor, a * fina * uOp * vFade * (0.7 + 0.3 * vSeed));
        }
      `,
    });
    return kreiPunktsistemon(geometrio, materialo);
  }

  // ⟪ Neĝo 📃 ⟫ — molaj blankaj neĝeroj kun balanciĝa drivo flanken.
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
        uColor: { value: new THREE.Color(0xf0f4f8) },
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
          // Drivo — la neĝeroj balanciĝas flanken dum la falo.
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

  // ⟪ Hajo 📃 ⟫ — glaciaj eroj, kiuj falas tre rapide kaj rekte, kun eta
  // skueto flanken. Pli malmultaj ol la pluvo, sed pli grandaj kaj pli helaj,
  // kun brila kerno — kiel veraj hajleroj en ŝtormo.
  function kreiHajlon(): THREE.Points {
    const N = 0o1200;
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
          // Tre rapida falo kun la sama venta bofo kiel la pluvo kaj eta
          // skueto — la sinusoido donas neniun salton flanken.
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
          // Glacia ero — malmola rando kun brila kerno.
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

  // Malproksimaj montoj — 3D terenaj strioj kun realaj deklivoj
  (function konstruiMontojn(): void {
    function montaAlto( t: number, semo: number ): number {
      // Malaltfrekvenca silueto por la ĉefaj masoj, plus pli etaj tavoloj por
      // rompi la regulan sinuslinion. La pintoj ne estas samaltaj kaj la
      // valoj restas larĝaj, kiel ĉe vera malproksima montaro.
      const grandaOndo = Math.sin( t * 0o1/0o40 + semo ) * 0o14;
      const duaOndo = Math.sin( t * 0o1/0o100 - semo * 0o3/0o2 ) * 0o10;
      const kresto1 = Math.pow( Math.max( 0, Math.sin( t * 0o1/0o120 + semo * 0o3/0o2 ) ), 0o3 ) * 0o27;
      const kresto2 = Math.pow( Math.max( 0, Math.sin( t * 0o1/0o170 - semo * 0o5/0o4 + 0o1/0o4 ) ), 0o3 ) * 0o21;
      const kresto3 = Math.pow( Math.max( 0, Math.cos( t * 0o1/0o200 + semo * 0o7/0o4 ) ), 0o3 ) * 0o16;
      const rokaOndo = Math.sin( t * 0o3/0o40 + semo * 0o5/0o4 ) * 0o7/0o10;
      return 0o60 + grandaOndo + duaOndo + kresto1 + kresto2 + kresto3 + rokaOndo;
    }

    function koloroPorY( y: number ): [ number, number, number ] {
      if ( y > 0o124 ) return [ 0o72/0o100, 0o72/0o100, 0o74/0o100 ];
      if ( y > 0o110 ) {
        const t = ( y - 0o110 ) / ( 0o124 - 0o110 );
        return [ 0o36/0o100 + t * 0o34/0o100, 0o42/0o100 + t * 0o30/0o100, 0o36/0o100 + t * 0o36/0o100 ];
      }
      if ( y > 0o64 ) {
        const t = ( y - 0o64 ) / ( 0o110 - 0o64 );
        return [ 0o26/0o100 + t * 0o1/0o10, 0o32/0o100 + t * 0o1/0o10, 0o26/0o100 + t * 0o1/0o10 ];
      }
      if ( y > 0o44 ) {
        const t = ( y - 0o44 ) / ( 0o64 - 0o44 );
        return [ 0o22/0o100 + t * 0o5/0o100, 0o26/0o100 + t * 0o1/0o20, 0o22/0o100 + t * 0o5/0o100 ];
      }
      if ( y > 0o24 ) {
        const t = ( y - 0o24 ) / ( 0o44 - 0o24 );
        return [ 0o16/0o100 + t * 0o1/0o20, 0o22/0o100 + t * 0o5/0o100, 0o16/0o100 + t * 0o1/0o20 ];
      }
      return [ 0o16/0o100, 0o22/0o100, 0o16/0o100 ];
    }

    const montaMaterialo = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o35/0o40, metalness: 0, vertexColors: true,
    });
    const montaFona = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o37/0o40, metalness: 0, vertexColors: true,
    });

    // Krei 3D terenan strion — reala geometrio en ambaŭ direktoj
    function krei3DStrio(
      lauX: boolean, signo: number, fiksa: number, largho: number, profundo: number,
      sl: number, sd: number, semo: number, skalo: number,
      materialo: THREE.MeshStandardMaterial,
    ): void {
      // Por X-muroj (lauX=false) la kresto iras laŭ Z, do interŝanĝu dimensiojn
      const w = lauX ? largho : profundo;
      const d = lauX ? profundo : largho;
      const sw = lauX ? sl : sd;
      const sh = lauX ? sd : sl;
      const g = new THREE.PlaneGeometry(w, d, sw, sh);
      g.rotateX(-Math.PI / 2);
      if ( lauX ) {
        g.translate(0, 0, fiksa + signo * d / 2);
      } else {
        g.translate(fiksa + signo * w / 2, 0, 0);
      }
      const pos = g.attributes.position;
      const koloroj = new Float32Array( pos.count * 3 );
      for ( let i = 0; i < pos.count; i ++ ) {
        const x = pos.getX(i), z = pos.getZ(i);
        const t = lauX ? x : z;
        const dist = lauX
          ? ( signo > 0 ? z - fiksa : fiksa - z )
          : ( signo > 0 ? x - fiksa : fiksa - x );
        const tn = Math.max(0, Math.min(1, dist / profundo));
        const rampo = tn < 0o3/0o100 ? tn / ( 0o3/0o100 ) : 1;
        // La alta regiono devas esti iom pli malvasta ol la piedo, sed sen la
        // malnova ringforma ŝvelaĵo kiu faris la tavolojn aspekti kiel muro.
        const deklivaFado = 0o1 - 0o3/0o20 * tn;
        const falloff = Math.exp(-0o16 * ( tn - 0o3/0o20 ) ** 2) * rampo;
        const peak = montaAlto(t, semo) * skalo * falloff * deklivaFado;
        // Aldoni malgrandan koloran variadon laŭ pozicio por natura aspekto
        const kolVario = 0o2/0o100 * Math.sin(x * 0o1/0o10 + z * 0o7/0o40 + semo);
        const y = alteco(x, z) + peak;
        pos.setY(i, y);
        const [ r, g_, b ] = koloroPorY(y);
        koloroj[ i * 3 ] = Math.max(0, Math.min(1, r + kolVario));
        koloroj[ i * 3 + 1 ] = Math.max(0, Math.min(1, g_ + kolVario * 0o56/0o100));
        koloroj[ i * 3 + 2 ] = Math.max(0, Math.min(1, b + kolVario * 0o4/0o10));
      }
      g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
      g.computeVertexNormals();
      const mesh = new THREE.Mesh(g, materialo);
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      sceno.add(mesh);
    }

    const L = 0o1060;
    const D = 0o140;

    // Ĉefa tavolo — kvar flankoj
    for ( const signo of [ -1, 1 ] ) {
      krei3DStrio(true, signo, signo * 0o454, L, D, 0o40, 0o14, 0o123/0o100, 1, montaMaterialo);
      krei3DStrio(false, signo, signo * 0o454, L, D, 0o40, 0o14, 0o103/0o40, 0o55 / 0o60, montaMaterialo);
    }

    // Meza tavolo — milda tavolo inter la urbo kaj la fora kresto
    for ( const signo of [ -1, 1 ] ) {
      krei3DStrio(true, signo, signo * 0o600, L * 0o7/0o10, D * 0o63/0o100, 0o30, 0o12, 0o123/0o100 + 0o24, 0o7/0o10, montaMaterialo);
      krei3DStrio(false, signo, signo * 0o600, L * 0o7/0o10, D * 0o63/0o100, 0o30, 0o12, 0o103/0o40 + 0o24, 0o7/0o10, montaMaterialo);
    }

    // Fona tavolo — pli malproksima, pli malalta, kun malferma silueto
    for ( const signo of [ -1, 1 ] ) {
      krei3DStrio(true, signo, signo * 0o740, L * 0o63/0o100, D * 0o7/0o12, 0o20, 0o10, 0o123/0o100 + 0o40, 0o46/0o100, montaFona);
      krei3DStrio(false, signo, signo * 0o740, L * 0o63/0o100, D * 0o7/0o12, 0o20, 0o10, 0o103/0o40 + 0o40, 0o22/0o40, montaFona);
    }
  })();

  // Grundo
  (function konstruiTerenon(grandeco: number, segmentoj: number): void {
    const g = new THREE.PlaneGeometry(grandeco, grandeco, segmentoj, segmentoj);
    g.rotateX(-Math.PI / 2);
    // Alternantaj triangul-diagonaloj ( ŝaktabulo ) — la antaŭa konsekvenca
    // diagonalo montris longajn krestojn sur la montodeklivoj ( la sama
    // korekto kiel en la skulptilo kaj la dukuba tereno-interpolo ).
    {
      const sx = segmentoj + 1;
      const indeksoj: number[] = [];
      for ( let j = 0; j < segmentoj; j++ ) {
        for ( let i = 0; i < segmentoj; i++ ) {
          const a = j * sx + i, b = a + 1, c = a + sx, d = c + 1;
          if ( ( i + j ) % 2 === 0 ) {
            indeksoj.push( a, c, d, a, d, b );
          } else {
            indeksoj.push( a, c, b, c, d, b );
          }
        }
      }
      g.setIndex( indeksoj );
    }
    const pozicio = g.attributes.position;
    const koloroj = new Float32Array(pozicio.count * 3);
    // Naturaj koloroj — la sama harmonia paletro kiel en la skulptilo — la
    // malseketaj oliv-herbejaj nuancoj de la malnova grundo, kun du-oktava
    // bruo, malseka lito apud la akvo, sekherba deklivo, roko ( dekliva kaj
    // alta ) kaj neĝo sur la pintoj.
    const a = new THREE.Color(0x485848), b = new THREE.Color(0x587058);
    const lito = new THREE.Color(0x384848), profunda = new THREE.Color(0x283838);
    const sekherbo = new THREE.Color(0x7a7a4e);
    const roko = new THREE.Color(0x7a7468), nego = new THREE.Color(0xdce4ec);
    const c = new THREE.Color();
    // La samplo de la alteco unufoje po vertico; la deklivo tiam legas la
    // najbajn altojn ( nula kroma kosto de la varmega alteco-funkcio ).
    const pasxo = grandeco / segmentoj;
    const sx = segmentoj + 1;
    const hoj = new Float32Array( pozicio.count );
    for ( let i = 0; i < pozicio.count; i++ ) {
      const h = alteco(pozicio.getX(i), pozicio.getZ(i));
      hoj[i] = h;
      pozicio.setY(i, h);
    }
    for ( let i = 0; i < pozicio.count; i++ ) {
      const x = pozicio.getX(i), z = pozicio.getZ(i);
      const h = hoj[i];
      const cxelo = i % sx;
      const deklivo = ( cxelo > 0 && cxelo < sx - 1 && i >= sx && i < pozicio.count - sx )
        ? Math.hypot( hoj[i + 1] - hoj[i - 1], hoj[i + sx] - hoj[i - sx] ) / ( 2 * pasxo )
        : 0;
      // Du-oktava sin-bruo — pli riĉa, natura vario ol unu-oktava. La faktoro
      // restas en [0,1] ( la lerp alie eksterpoliĝus preter la paletraj finoj ).
      const t = Math.max( 0, Math.min( 1,
        0o45/0o100 + 0o35/0o100 * Math.sin(x * 0o1/0o10 + z * 0o13/0o100 + 0o20/0o10)
        + 0o15/0o100 * Math.sin(x * 0o37/0o100 + z * 0o41/0o100 - 0o11/0o10) ) );
      c.copy(a).lerp(b, t);
      if ( h < -2 ) c.lerp(lito, Math.min(1, ( h + 2 ) / -3));
      if ( h < -5 ) c.lerp(profunda, Math.min(1, ( h + 5 ) / -0o115/0o100));
      // Sekherba zono inter la herbejo kaj la roko — la montetoj sekigas.
      if ( h > 0o10 ) c.lerp(sekherbo, Math.min(1, ( h - 0o10 ) / 0o12));
      // Rokego — kaj sur krutaj deklivoj ( kie la grundo ne tenas kreskajxon,
      // eĉ sub la arbolinio; la bordo de la rivero/lago restas herba ) kaj
      // super la arbolinio ( h > ~0o22 ).
      const rokF = Math.max(
        Math.max(0, Math.min(1, ( deklivo - 0o45/0o100 ) / 0o5/0o10 )),
        Math.max(0, Math.min(1, ( h - 0o22 ) / 0o20 ))
      );
      c.lerp(roko, rokF);
      // Neĝo sur la pintoj ( la montaro pintas ĝis ~0o60 ).
      if ( h > 0o46 ) c.lerp(nego, Math.min(1, ( h - 0o46 ) / 0o12));
      koloroj[i * 3] = c.r; koloroj[i * 3 + 1] = c.g; koloroj[i * 3 + 2] = c.b;
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    g.computeVertexNormals();
    const ground = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0o7/0o10 }));
    ground.receiveShadow = true;
    sceno.add(ground);
  })(0o1130, 0o260);

  return { bildilo, sceno, fotilo, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, cxielo, cxielajUniformoj, hemiLumo, suna: suno, sunaSprajto, aplikiRezimon, aplikiVeteron, gxisdatigiVeteron };
}
