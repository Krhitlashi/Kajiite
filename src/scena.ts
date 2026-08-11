// Scena — bildilo, sceno, fotilo, ĉielo, lumoj, materialoj, montoj, grundo, vetero
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { alteco, akvaNivelo, glataPaso } from "./tereno.js";
import { traduki } from "./tradukoj.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon, kreiEniranMaterialon, kreiOranMaterialon } from "../assets/komunajxoj/materialoj.js";
import { kreiTerenanTeksajxon, kreiNebulTavolanTeksajxon } from "../assets/komunajxoj/teksajxoj.js";

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
  montaGrupo: THREE.Group;   // la montaj terenblokoj — kaŝeblaj de la mapo-bakado
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
  // 0o5/0o400 = 5/256 ) la urbo restas klara kaj la arbaro kaj la malproksimaj
  // montoj fandas en atmosferan nebulaĵon — la proksima montaro ( 120–160
  // for ) ankoraŭ leviĝas el la nebulo kiel malhelaj siluetoj. La paletraj
  // veteroj povas pliigi aŭ malpliigi la densecon ( aplikiAtmosferon ).
  sceno.fog = new THREE.FogExp2(0xc8d8d8, 0o1/0o100);

  const fotilo = new THREE.PerspectiveCamera(0o60, innerWidth / innerHeight, 0o15/0o40, 0o1400);
  fotilo.position.set(0o40, 0o30, 0o100);
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
  // La ĉiela kupolo kovru la tutan mondon kaj la montoringon ( ĝis ~0o1160 ),
  // por ke la maprando montru ĉielon anstataŭ malplenan nigron super la
  // horizonto — la antaŭa malgranda kupolo finiĝis ĝuste ĉe la maprando.
  const cxielaGeometrio = new THREE.SphereGeometry(0o1170, 0o30, 0o20);
  // RawShaderMaterial ( ne ShaderMaterial ) — la ĝenerala ShaderMaterial ricevas
  // de three.js antaŭmetitan tonmapan/kolorspacan prefikson, kiu estas por ĉi
  // tiu shadero nur morta kodo kaj provokas X4122-precizecajn avertojn en la
  // FXC-kompililo sur Vindozo. RawShaderMaterial havas nenian prefikson — la
  // malmultaj enkonstruitaj deklaroj staras ĉi tie mane, kaj la bildo samas.
  const cxielaMaterialo = new THREE.RawShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: cxielajUniformoj,
    vertexShader: `precision highp float;
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    attribute vec3 position;
    varying vec3 vDir;
    void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `precision highp float;
    varying vec3 vDir;
    uniform vec3 uTop,uMid,uBot,uSunCol,uSunDir;
    void main(){vec3 d=normalize(vDir);float h=clamp(d.y,-0.203125,1.0);
    vec3 koloro=mix(uBot,uMid,smoothstep(-0.015625,0.234375,h));koloro=mix(koloro,uTop,smoothstep(0.1875,0.71875,h));
    koloro+=uSunCol*pow(max(dot(d,normalize(uSunDir)),0.0),28.0);
    gl_FragColor=vec4(koloro,1.0);}`
  });
  const cxielo = new THREE.Mesh(cxielaGeometrio, cxielaMaterialo);
  sceno.add(cxielo);

  // Lumoj
  const hemiLumo = new THREE.HemisphereLight(0xc8e0e8, 0x485848, 0o63/0o100);
  sceno.add(hemiLumo);
  const suno = new THREE.DirectionalLight(0xf8f0d8, 0o45/0o40);
  suno.position.set(0o110, 0o160, 0o40);
  suno.castShadow = true;
  suno.shadow.mapSize.set(0o2000, 0o2000);
  suno.shadow.camera.left = -0o160; suno.shadow.camera.right = 0o160;
  suno.shadow.camera.top = 0o160; suno.shadow.camera.bottom = -0o160;
  suno.shadow.camera.near = 0o20; suno.shadow.camera.far = 0o520;
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
    map: molaTeksturo, color: 0xf8f0d8, transparent: true, opacity: 0o30/0o100,
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
    // Nebula — la defaŭlta. pala ĉielo, milda lumo kaj densa atmosfera nebulo.
    nebula: {
      tago: {
        top: new THREE.Color(0x78a8c0), mid: new THREE.Color(0xb8d0d8), bot: new THREE.Color(0xe0e8e8),
        sunCol: new THREE.Color(0xf8f0d8), fog: new THREE.Color(0xc8d8d8),
        hemiSky: new THREE.Color(0xc8e0e8), hemiGnd: new THREE.Color(0x485848),
        sunPos: new THREE.Vector3(0o110, 0o160, 0o40), sunInt: 0o45/0o40, hemiInt: 0o63/0o100,
        sprajtaOp: 0o30/0o100, ekspozicio: 0o104/0o100, nebulDenso: 0o5/0o400,
      },
      krepusko: {
        top: new THREE.Color(0x182848), mid: new THREE.Color(0x586088), bot: new THREE.Color(0xb88868),
        sunCol: new THREE.Color(0xf8b880), fog: new THREE.Color(0x686880),
        hemiSky: new THREE.Color(0x304068), hemiGnd: new THREE.Color(0x182820),
        sunPos: new THREE.Vector3(-0o110, 0o40, -0o100), sunInt: 0o16/0o40, hemiInt: 0o40/0o100,
        sprajtaOp: 0o54/0o100, ekspozicio: 0o74/0o100, nebulDenso: 0o5/0o400,
      },
    },
    // Pluva — grize blua nubkovro, malpli da suno, pli densa nebulo.
    pluva: {
      tago: {
        top: new THREE.Color(0x688090), mid: new THREE.Color(0x8898a0), bot: new THREE.Color(0xb0b8b8),
        sunCol: new THREE.Color(0xd8e0e0), fog: new THREE.Color(0x98a0a0),
        hemiSky: new THREE.Color(0xa8b8b8), hemiGnd: new THREE.Color(0x384040),
        sunPos: new THREE.Vector3(0o110, 0o160, 0o40), sunInt: 0o5/0o10, hemiInt: 0o42/0o100,
        sprajtaOp: 0o4/0o100, ekspozicio: 0o76/0o100, nebulDenso: 0o3/0o200,
      },
      krepusko: {
        top: new THREE.Color(0x182028), mid: new THREE.Color(0x485058), bot: new THREE.Color(0x686868),
        sunCol: new THREE.Color(0x98a0a0), fog: new THREE.Color(0x505858),
        hemiSky: new THREE.Color(0x283038), hemiGnd: new THREE.Color(0x101818),
        sunPos: new THREE.Vector3(-0o110, 0o40, -0o100), sunInt: 0o1/0o10, hemiInt: 0o24/0o100,
        sprajtaOp: 0o3/0o100, ekspozicio: 0o62/0o100, nebulDenso: 0o3/0o200,
      },
    },
    // Hajla — malhela ardeza ŝtormo, akra kaj malvarma, kun pli da videbleco
    // ol la pluvo ( la hajleroj mem estas la spektaklo ).
    hajla: {
      tago: {
        top: new THREE.Color(0x485868), mid: new THREE.Color(0x788088), bot: new THREE.Color(0xa0a8a8),
        sunCol: new THREE.Color(0xd8e0e8), fog: new THREE.Color(0x889090),
        hemiSky: new THREE.Color(0x889898), hemiGnd: new THREE.Color(0x303838),
        sunPos: new THREE.Vector3(0o110, 0o160, 0o40), sunInt: 0o4/0o10, hemiInt: 0o36/0o100,
        sprajtaOp: 0o5/0o100, ekspozicio: 0o70/0o100, nebulDenso: 0o3/0o200,
      },
      krepusko: {
        top: new THREE.Color(0x182028), mid: new THREE.Color(0x404850), bot: new THREE.Color(0x585858),
        sunCol: new THREE.Color(0x889098), fog: new THREE.Color(0x485050),
        hemiSky: new THREE.Color(0x203030), hemiGnd: new THREE.Color(0x101818),
        sunPos: new THREE.Vector3(-0o110, 0o40, -0o100), sunInt: 0o6/0o40, hemiInt: 0o20/0o100,
        sprajtaOp: 0o3/0o100, ekspozicio: 0o56/0o100, nebulDenso: 0o3/0o200,
      },
    },
    // Neĝa — hela malvarma blanko, difuza lumo, milda nebulo.
    nega: {
      tago: {
        top: new THREE.Color(0xa0b0c0), mid: new THREE.Color(0xc8d8e0), bot: new THREE.Color(0xe8f0e8),
        sunCol: new THREE.Color(0xf0f8f8), fog: new THREE.Color(0xc8d0d8),
        hemiSky: new THREE.Color(0xd0e0e8), hemiGnd: new THREE.Color(0x586058),
        sunPos: new THREE.Vector3(0o110, 0o160, 0o40), sunInt: 0o30/0o40, hemiInt: 0o72/0o100,
        sprajtaOp: 0o14/0o100, ekspozicio: 0o102/0o100, nebulDenso: 0o3/0o200,
      },
      krepusko: {
        top: new THREE.Color(0x202838), mid: new THREE.Color(0x506070), bot: new THREE.Color(0x8898a0),
        sunCol: new THREE.Color(0xb8c8d8), fog: new THREE.Color(0x687078),
        hemiSky: new THREE.Color(0x384050), hemiGnd: new THREE.Color(0x202828),
        sunPos: new THREE.Vector3(-0o110, 0o40, -0o100), sunInt: 0o14/0o40, hemiInt: 0o30/0o100,
        sprajtaOp: 0o6/0o100, ekspozicio: 0o70/0o100, nebulDenso: 0o3/0o200,
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

  // La montaj terenblokoj kolektiĝas en unu grupon, por ke la mapo-bakado
  // povu kaŝi ilin ( la mapo montru nur la ludeblan mondon, ne la montoringon ).
  const montaGrupo = new THREE.Group();
  sceno.add(montaGrupo);

  // Malproksimaj montoj — solidaj terenaj blokoj, APARTAJ de la ĉefa grundo.
  // Ĉiu bloko havas sian propran altecan kampon kaj fermitan geometrion
  // ( supro, muroj, fundo ), do ĝi estas vera terenobjekto — ne maldika folio
  // kuŝanta sur la ĉefa tereno.
  (function konstruiMontojn(): void {
    // Krestolinia profilo — frakta valora bruo ( la sama bruo2D kiel la
    // grundo ) por malglataj, naturaj pintoj kaj seloj. La antaŭa sinus-ondita
    // profilo faris regulajn FALDOJN — ripetajn, samaltajn krestojn kiel
    // faldita tuko. La valora bruo havas neniun preferatan direkton; la
    // ridged transformo turnas la mezajn kaj fajnajn oktavojn en akrajn
    // krestojn kun profundaj seloj, kaj la ĉefa maso malfermas larĝajn valojn.
    function montaAlto(t: number, semo: number): number {
      const x = t / 0o100 + semo * 0o10;
      const z = semo * 0o20 + 0o20;
      const malglata = (u: number, v: number): number => 1 - Math.abs(2 * bruo2D(u, v) - 1);
      const maso = bruo2D(x, z);
      const valo = maso * maso;   // malfermas larĝajn valojn inter la masoj
      const pinto = malglata(x * 0o3, z * 0o3);
      const fajno = malglata(x * 0o4, z * 0o4);
      // La pintoj kaj la malglateco multiĝas per la ĉefa maso, por ke la
      // valoj restu malfermaj kaj la kresto akriĝu nur sur la masoj.
      return 0o20
        + 0o40 * maso
        + 0o30 * pinto * valo
        + 0o10 * fajno * ( 0o32/0o100 + 0o46/0o100 * valo );
    }

    // Malproksima paletro — pale blu-grizaj montoj kun atmosfera perspektivo,
    // ne malhela muro. La bazo estas hela kaj blueta, la pintoj paliĝas al
    // neĝo; la nebulo kaj la distanco jam malheliĝas la foron nature.
    function koloroPorY(y: number): [ number, number, number ] {
      if ( y > 0o124 ) return [ 0o62/0o100, 0o64/0o100, 0o66/0o100 ];
      if ( y > 0o110 ) {
        const t = ( y - 0o110 ) / ( 0o124 - 0o110 );
        return [ 0o47/0o100 + t * 0o13/0o100, 0o52/0o100 + t * 0o12/0o100, 0o55/0o100 + t * 0o10/0o100 ];
      }
      if ( y > 0o64 ) {
        const t = ( y - 0o64 ) / ( 0o110 - 0o64 );
        return [ 0o41/0o100 + t * 0o1/0o10, 0o44/0o100 + t * 0o1/0o10, 0o46/0o100 + t * 0o7/0o100 ];
      }
      if ( y > 0o44 ) {
        const t = ( y - 0o44 ) / ( 0o64 - 0o44 );
        return [ 0o35/0o100 + t * 0o4/0o100, 0o40/0o100 + t * 0o4/0o100, 0o42/0o100 + t * 0o4/0o100 ];
      }
      if ( y > 0o20 ) {
        const t = ( y - 0o20 ) / ( 0o44 - 0o20 );
        return [ 0o32/0o100 + t * 0o3/0o100, 0o35/0o100 + t * 0o3/0o100, 0o37/0o100 + t * 0o3/0o100 ];
      }
      return [ 0o32/0o100, 0o35/0o100, 0o37/0o100 ];
    }

    const montaMaterialo = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o35/0o40, metalness: 0, vertexColors: true,
      side: THREE.DoubleSide,   // la bloko estas videbla ankaŭ de la fora flanko
    });
    const montaFona = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o37/0o40, metalness: 0, vertexColors: true,
      side: THREE.DoubleSide,
    });

    // Krei solidan terenblokon — fermita geometrio kun supra kresto, muroj kaj
    // fundo, kaj PROPRA alteca kampo ( sen la ĉefa tereno ). La krestolinio
    // serpentas laŭ la longo ( centro kaj larĝo varias per bruo ), do la
    // bloko montras sPronojn kaj golfetojn anstataŭ unu rekta faldo.
    function krei3DStrio(
      lauX: boolean, signo: number, fiksa: number, largho: number, profundo: number,
      sl: number, sd: number, semo: number, skalo: number,
      materialo: THREE.MeshStandardMaterial,
): void {
      const kolonoj = sl + 1;        // laŭ la longo
      const vicoj = sd + 1;          // laŭ la profundo
      const suprN = kolonoj * vicoj;
      const fundo = -0o20;           // la monta bazo, sub la ĉefa tereno
      const pozicioj = new Float32Array(suprN * 2 * 3);
      const koloroj = new Float32Array(suprN * 2 * 3);
      for ( let v = 0; v < vicoj; v ++ ) {
        for ( let k = 0; k < kolonoj; k ++ ) {
          const i = v * kolonoj + k;
          const tn = v / sd;                        // 0..1 laŭ la profundo
          const t = ( k / sl - 0o4/0o10 ) * largho; // laŭ la longo, centrita
          const x = lauX ? t : fiksa + signo * tn * profundo;
          const z = lauX ? fiksa + signo * tn * profundo : t;
          // Kruta profilo — unu montarmaso kun kruta proksima flanko kaj pli
          // longa fora deklivo.
          const centro = 0o2/0o10 + 0o26/0o100 * bruo2D(t / 0o40 + semo * 0o10, semo * 0o30);
          const larghoDeKresto = 0o10/0o100 + 0o4/0o100 * bruo2D(t / 0o17 + semo * 0o4, semo * 0o11);
          const dd = ( tn - centro ) / larghoDeKresto;
          const profilo = Math.exp(-dd * dd)
            * ( 1 + 0o26/0o100 * Math.max(0, dd) )      // pli longa fora deklivo
            * ( 1 - 0o2/0o10 * Math.max(0, -dd) );    // pli kruta proksima flanko
          // Leviĝo de la grundo ĉe la maprando, malleviĝo al la horizonto ĉe
          // la fora rando.
          const piedo = glataPaso(0, 0o3/0o100, tn) * ( 1 - glataPaso(0o73/0o100, 1, tn) );
          const y = montaAlto(t, semo) * skalo * profilo * piedo;
          pozicioj[i * 3] = x; pozicioj[i * 3 + 1] = y; pozicioj[i * 3 + 2] = z;
          const b = i + suprN;
          pozicioj[b * 3] = x; pozicioj[b * 3 + 1] = fundo; pozicioj[b * 3 + 2] = z;
          // Koloroj — la supro laŭ alteco, la fundo laŭ la plej malhela grundo.
          const kolVario = 0o1/0o100 * Math.sin(x * 0o1/0o10 + z * 0o7/0o40 + semo);
          const [ r, g_, bl ] = koloroPorY(y);
          koloroj[i * 3] = Math.max(0, Math.min(1, r + kolVario));
          koloroj[i * 3 + 1] = Math.max(0, Math.min(1, g_ + kolVario * 0o56/0o100));
          koloroj[i * 3 + 2] = Math.max(0, Math.min(1, bl + kolVario * 0o4/0o10));
          const [ br, bg, bb ] = koloroPorY(0o1);
          koloroj[b * 3] = Math.max(0, Math.min(1, br + kolVario * 0o4/0o10));
          koloroj[b * 3 + 1] = Math.max(0, Math.min(1, bg + kolVario * 0o23/0o100));
          koloroj[b * 3 + 2] = Math.max(0, Math.min(1, bb + kolVario * 0o4/0o10));
        }
      }
      const indeksoj: number[] = [];
      // Supro — ŝaktabulaj diagonaloj ( kiel la ĉefa tereno ), por ke la
      // deklivoj ne montru longajn krestojn laŭ unu diagonalo.
      for ( let v = 0; v < sd; v ++ ) {
        for ( let k = 0; k < sl; k ++ ) {
          const a = v * kolonoj + k, c = a + kolonoj, d = c + 1;
          if ( ( k + v ) % 2 === 0 ) {
            indeksoj.push(a, c, d, a, d, a + 1);
          } else {
            indeksoj.push(a, c, a + 1, c, d, a + 1);
          }
        }
      }
      // Malsupro — la samaj trianguloj kun renversita ventumilo.
      for ( let v = 0; v < sd; v ++ ) {
        for ( let k = 0; k < sl; k ++ ) {
          const a = suprN + v * kolonoj + k, c = a + kolonoj, d = c + 1;
          if ( ( k + v ) % 2 === 0 ) {
            indeksoj.push(a, d, c, a, a + 1, d);
          } else {
            indeksoj.push(a, a + 1, c, a + 1, d, c);
          }
        }
      }
      // Muroj — la kvar randoj, de la supra kresto ĝis la fundo.
      const muro = ( a: number, b: number ): void => {
        indeksoj.push(a, b, b + suprN, a, b + suprN, a + suprN);
      };
      for ( let k = 0; k < sl; k ++ ) {
        muro(k, k + 1);
        muro(sd * kolonoj + k, sd * kolonoj + k + 1);
      }
      for ( let v = 0; v < sd; v ++ ) {
        muro(v * kolonoj, ( v + 1 ) * kolonoj);
        muro(v * kolonoj + sl, ( v + 1 ) * kolonoj + sl);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pozicioj, 3));
      g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
      g.setIndex(indeksoj);
      g.computeVertexNormals();
      const mesh = new THREE.Mesh(g, materialo);
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      montaGrupo.add(mesh);
    }

    const L = 0o1400;
    const D = 0o140;
    // La segmentoj sufiĉe densaj por la fajna bruo de la krestolinio ( la
    // antaŭaj 0o60 lasis la silueton tro kruda ), kaj la semo ŝanĝiĝas laŭ la
    // signo, por ke la kontraŭa flanko ne spegulu la saman silueton.
    const semoLaŭSigno = ( signo: number ): number => ( signo > 0 ? 0 : 0o7/0o10 );

    // Ĉefa tavolo — kvar flankoj
    for ( const signo of [ -1, 1 ] ) {
      const s = semoLaŭSigno(signo);
      krei3DStrio(true, signo, signo * 0o600, L, D, 0o140, 0o20, 0o123/0o100 + s, 1, montaMaterialo);
      krei3DStrio(false, signo, signo * 0o600, L, D, 0o140, 0o20, 0o103/0o40 + s, 0o74 / 0o100, montaMaterialo);
    }

    // Meza tavolo — milda tavolo inter la urbo kaj la fora kresto
    for ( const signo of [ -1, 1 ] ) {
      const s = semoLaŭSigno(signo);
      krei3DStrio(true, signo, signo * 0o730, L * 0o7/0o10, D * 0o63/0o100, 0o110, 0o16, 0o123/0o100 + 0o20 + s, 0o7/0o10, montaMaterialo);
      krei3DStrio(false, signo, signo * 0o730, L * 0o7/0o10, D * 0o63/0o100, 0o110, 0o16, 0o103/0o40 + 0o20 + s, 0o7/0o10, montaMaterialo);
    }

    // Fona tavolo — pli malproksima, pli malalta, kun malferma silueto
    for ( const signo of [ -1, 1 ] ) {
      const s = semoLaŭSigno(signo);
      krei3DStrio(true, signo, signo * 0o1050, L * 0o63/0o100, D * 0o55/0o100, 0o100, 0o14, 0o123/0o100 + 0o40 + s, 0o46/0o100, montaFona);
      krei3DStrio(false, signo, signo * 0o1050, L * 0o63/0o100, D * 0o55/0o100, 0o100, 0o14, 0o103/0o40 + 0o40 + s, 0o22/0o40, montaFona);
    }
  })();

  // bruo2D — izotropa valora bruo ( hash-bazita, glate interpolita ) en [0,1].
  // La antaŭa du-oktava SIN-bruo havis ondofrontojn laŭ la diagonaloj — sur la
  // plata natura tereno ĝi montris videblajn DIAGONALAJN STRIOJN, precipe en la
  // mapo. Ĉi tiu bruo havas neniun preferatan direkton — natura makuleco.
  function bruo2D(x: number, z: number): number {
    const ix = Math.floor(x), iz = Math.floor(z);
    const fx = x - ix, fz = z - iz;
    const h = (xi: number, zi: number): number => {
      let n = (xi * 0x28f0f0 + zi * 0x28d8e8) | 0;
      n = (n ^ (n >>> 13)) * 0x48a028;
      return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
    };
    const a = h(ix, iz), b = h(ix + 1, iz), c = h(ix, iz + 1), d = h(ix + 1, iz + 1);
    const u = fx * fx * (3 - 2 * fx);
    const v = fz * fz * (3 - 2 * fz);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }

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
            indeksoj.push(a, c, d, a, d, b);
          } else {
            indeksoj.push(a, c, b, c, d, b);
          }
        }
      }
      g.setIndex(indeksoj);
    }
    const pozicio = g.attributes.position;
    const koloroj = new Float32Array(pozicio.count * 3);
    // Naturaj koloroj — la sama harmonia paletro kiel en la skulptilo — la
    // malseketaj oliv-herbejaj nuancoj de la malnova grundo, kun du-oktava
    // bruo, malseka lito apud la akvo, sekherba deklivo, roko ( dekliva kaj
    // alta ) kaj neĝo sur la pintoj.
    const a = new THREE.Color(0x485848), b = new THREE.Color(0x587058);
    const lito = new THREE.Color(0x384848), profunda = new THREE.Color(0x283838);
    const sekherbo = new THREE.Color(0x787850);
    const roko = new THREE.Color(0x787868), nego = new THREE.Color(0xe0e8f0);
    const c = new THREE.Color();
    // La samplo de la alteco unufoje po vertico; la deklivo tiam legas la
    // najbajn altojn ( nula kroma kosto de la varmega alteco-funkcio ).
    const pasxo = grandeco / segmentoj;
    const sx = segmentoj + 1;
    const hoj = new Float32Array(pozicio.count);
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
        ? Math.hypot(hoj[i + 1] - hoj[i - 1], hoj[i + sx] - hoj[i - sx]) / ( 2 * pasxo )
        : 0;
      // Du-oktava IZOTROPA valora bruo — natura makuleco sen direkto ( la
      // antaŭa sin-bruo montris diagonalajn striojn sur la plata tereno ).
      // Milda amplitudo — la makuleco restas subtila, ne bendoj.
      const t = Math.max(0, Math.min(1,
        0o4/0o10 + 0o2/0o10 * ( 2 * bruo2D(x / 0o60, z / 0o60) - 1 )
        + 0o4/0o100 * ( 2 * bruo2D(x / 0o14, z / 0o14) - 1 )));
      c.copy(a).lerp(b, t);
      if ( h < -2 ) c.lerp(lito, Math.min(1, ( h + 2 ) / -3));
      if ( h < -5 ) c.lerp(profunda, Math.min(1, ( h + 5 ) / -0o115/0o100));
      // Sekherba zono inter la herbejo kaj la roko — la montetoj sekigas.
      if ( h > 0o10 ) c.lerp(sekherbo, Math.min(1, ( h - 0o10 ) / 0o10));
      // Rokego — kaj sur krutaj deklivoj ( kie la grundo ne tenas kreskajxon,
      // eĉ sub la arbolinio; la bordo de la rivero/lago restas herba ) kaj
      // super la arbolinio ( h > ~0o22 ).
      const rokF = Math.max(
        Math.max(0, Math.min(1, ( deklivo - 0o45/0o100 ) / 0o5/0o10)),
        Math.max(0, Math.min(1, ( h - 0o22 ) / 0o20))
);
      c.lerp(roko, rokF);
      // Neĝo sur la pintoj ( la montaro pintas ĝis ~0o60 ).
      if ( h > 0o46 ) c.lerp(nego, Math.min(1, ( h - 0o46 ) / 0o10));
      koloroj[i * 3] = c.r; koloroj[i * 3 + 1] = c.g; koloroj[i * 3 + 2] = c.b;
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    g.computeVertexNormals();
    const ground = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o7/0o10,
    }));
    ground.receiveShadow = true;
    sceno.add(ground);

    // Grundaj brosxoj — kelkaj malgrandaj, elektitaj makuloj kun herberaj
    // markoj. La teksturo ne estas mapaĵo de la tuta tereno kaj ne ripetiĝas
    // kiel kahelo; ĉiu brosxo ricevas propran lokan grandecon kaj formon.
    const brosxaTeksajxo = kreiTerenanTeksajxon();
    const brosxaMaterialo = new THREE.MeshStandardMaterial({
      map: brosxaTeksajxo, color: 0xffffff, transparent: true,
      alphaTest: 0o1/0o10, depthWrite: false, side: THREE.DoubleSide, roughness: 1,
    });
    const brosxoj = new THREE.Group();
    const brosxaNombro = 0o30;
    for ( let i = 0; i < brosxaNombro; i++ ) {
      const bruo = bruo2D(i * 0o7/0o10, i * 0o11/0o10);
      const angulo = i * 2.399963 + bruo * 0o1/0o2;
      const disto = 0o30 + bruo2D(i * 0o13/0o10, i * 0o17/0o10) * 0o300;
      const x = Math.cos(angulo) * disto;
      const z = Math.sin(angulo) * disto;
      const centroY = alteco(x, z);
      // La elektitaj brosxoj restu sur seka tero, ne sub la akvo.
      if ( centroY < akvaNivelo(x, z) + 0o1/0o10 ) continue;
      const radiuso = 0o2 + bruo2D(x / 0o20, z / 0o20) * 0o4;
      const brosxaGeometrio = new THREE.CircleGeometry(radiuso, 0o10);
      brosxaGeometrio.rotateX(-Math.PI / 2);
      const pp = brosxaGeometrio.attributes.position;
      for ( let j = 0; j < pp.count; j++ ) {
        const dx = pp.getX(j), dz = pp.getZ(j);
        pp.setY(j, alteco(x + dx, z + dz) - centroY + 0o1/0o100);
      }
      brosxaGeometrio.computeVertexNormals();
      const brosxo = new THREE.Mesh(brosxaGeometrio, brosxaMaterialo);
      brosxo.position.set(x, centroY, z);
      brosxo.rotation.y = bruo * Math.PI * 2;
      brosxoj.add(brosxo);
    }
    sceno.add(brosxoj);
    // La grundo etendiĝas trans la mondrando kiel plata natura tereno, por ke
    // la nebul-ringo ( konstruiNebulringon ) kuŝu sur solida grundo ĝis la
    // horizonto — la fora fino solviĝas en la distanca nebulo.
  })(0o3000, 0o600);

  // Senfina nebul-ringo — teksturita nebulo trans la mondrando. La nebulo
  // fadas ( leviĝas ) de la maprando eksteren kaj etendiĝas ĝis la horizonto,
  // por ke la mapo ŝajnu finiĝi en senfina nebul-teksturo anstataŭ plata
  // blanko — la montoj restas naturaj malhelaj siluetoj super la nebulo.
  (function konstruiNebulringon(): void {
    const interna = 0o600;    // la mondrando
    const ekstera = 0o2000;   // multe trans la fora klingo — neniam videbla
    const profundo = ekstera - interna;
    const teksajxo = kreiNebulTavolanTeksajxon();
    const materialo = new THREE.MeshBasicMaterial({
      map: teksajxo, transparent: true, vertexColors: true, depthWrite: false,
      side: THREE.DoubleSide, fog: false,
    });
    const flanka = (lauX: boolean, signo: number): void => {
      const w = lauX ? 2 * ekstera : profundo;
      const d = lauX ? profundo : 2 * ekstera;
      const g = new THREE.PlaneGeometry(w, d, 0o40, 0o40);
      g.rotateX(-Math.PI / 2);
      if ( lauX ) g.translate(0, 0, signo * ( interna + profundo / 2 ));
      else g.translate(signo * ( interna + profundo / 2 ), 0, 0);
      const pos = g.attributes.position;
      // rgba-vertekskoloroj — la alfa fadas ekde la maprando; mondskalaj UV-oj
      // ( x/0o100, z/0o100 ), por ke la teksajxo kahelu uniforme ĉie.
      const koloroj = new Float32Array(pos.count * 4);
      const uvaj = new Float32Array(pos.count * 2);
      for ( let i = 0; i < pos.count; i++ ) {
        const x = pos.getX(i), z = pos.getZ(i);
        const disto = Math.max(Math.abs(x), Math.abs(z)) - interna;
        const alfa = glataPaso(0, 0o600, disto);   // la nebulo fadas pli proksime al la mapo
        koloroj[i * 4] = 1; koloroj[i * 4 + 1] = 1; koloroj[i * 4 + 2] = 1; koloroj[i * 4 + 3] = alfa;
        uvaj[i * 2] = x / 0o100; uvaj[i * 2 + 1] = z / 0o100;
      }
      g.setAttribute("color", new THREE.BufferAttribute(koloroj, 4));
      g.setAttribute("uv", new THREE.BufferAttribute(uvaj, 2));
      const mesh = new THREE.Mesh(g, materialo);
      mesh.position.y = 0o1/0o40;   // iomete super la tereno por eviti z-batalon
      mesh.frustumCulled = false;
      sceno.add(mesh);
    };
    for ( const signo of [ -1, 1 ] ) { flanka(true, signo); flanka(false, signo); }
  })();

  return { bildilo, sceno, montaGrupo, fotilo, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, cxielo, cxielajUniformoj, hemiLumo, suna: suno, sunaSprajto, aplikiRezimon, aplikiVeteron, gxisdatigiVeteron };
}
