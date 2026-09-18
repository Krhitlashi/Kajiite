// Scena — bildilo, sceno, fotilo, ĉielo, lumoj, materialoj, montoj, grundo, vetero
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { alteco, akvaNivelo, glataPaso } from "./tereno.js";
import { traduki } from "./tradukoj.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon, kreiEniranMaterialon, kreiOranMaterialon } from "../assets/komunajxoj/materialoj.js";
import { kreiTerenanTeksajxon, kreiNebulTavolanTeksajxon,
  kreiGrundanTeksajxon, kreiGrundanBumpanTeksajxon } from "../assets/komunajxoj/teksajxoj.js";
import { bruo2D, alternajDiagonalojn, terenaKoloroEn,
  terenaStrataKoloroEn } from "../assets/komunajxoj/terenkoloroj.js";
import { premuAlFormo, distancoDeFormo, radiusaDistanco, kreiFormanBazon,
  MONDO_BAZA_Y } from "../assets/komunajxoj/mapformo.js";
import { aktivaMapo } from "./tero-datumaro/mapregulo.js";

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
  aplikiRezimon: ( t: number ) => void;
  aplikiVeteron: ( v: Vetero ) => void;
  gxisdatigiVeteron: ( t: number ) => void;
  gxisdatigiOmbron: ( x: number, z: number ) => boolean;
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
  // ⟪ Ombra kadence 📃 ⟫ — la ombro-mapo ne re-desegniĝas ĉiukadre. La suno
  // ( la sola ombranta lumo ) kaj preskaŭ ĉiuj ombrantoj estas senmovaj, do
  // la ombra pasumo — la plej granda unuopa parto de la kadraj desegnoj ( ĝi
  // estis 3/4 antaux la ombro-volumena sekvo ) — plenumiĝas nur kiam la
  // ombro-volumeno moviĝas ( vidu gxisdatigiOmbron ) kaj alie nur ĉiun duan
  // kadron. Moviĝantaj ombroj ( la ludanto, la NPC-oj, la kanuoj ) prokrastiĝas
  // maksimume du kadrojn — ĉe irado tio estas kelkaj centimetroj da ombra
  // postiĝo, kion oni ne rimarkas — kaj la ombra duobla pasumo malaperas.
  bildilo.shadowMap.autoUpdate = false;
  // La frua bildigo okazas antaŭ la buklo — ĝi jam havu ombrojn.
  bildilo.shadowMap.needsUpdate = true;
  bildilo.setPixelRatio(Math.min(devicePixelRatio, 2));
  // Plenekrana kanvaso EKDE la kreo. Sen tio la bildilo restas je la defaŭlta
  // 300×150 — la frua bildigo ( dum la sxargxa kurtino ) desegnis malgrandan
  // keston supre-maldekstre gxis la unua kadro de la ĉefa buklo regrandigis.
  bildilo.setSize(innerWidth, innerHeight);

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

  // fotilaDuTan — la duobla duon-fov-a tangento ( la fov estas konstanta 0o60 ).
  // La pluvo pikseligas la gut-longojn per gxi — kalkulita unufoje, ne ĉiukadre.
  const fotilaDuTan = 2 * Math.tan(fotilo.fov * Math.PI / 360);

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
  // La ombro-volumeno estas KVARTAĴO ĉirkaŭ la vidpunkto ( gxisdatigiOmbron )
  // — ĝi ne devas kovri la tutan mondon, nur tion, kion la nebulo ankoraŭ
  // lasas videbla. Pli malgranda skatolo signifas malpli da ombro-desegnoj
  // ( la malproksimaj konstruaĵoj ne plu ombras ) kaj pli akrajn ombrojn.
  suno.shadow.camera.left = -0o100; suno.shadow.camera.right = 0o100;
  suno.shadow.camera.top = 0o100; suno.shadow.camera.bottom = -0o100;
  suno.shadow.camera.near = 0o20; suno.shadow.camera.far = 0o520;
  suno.shadow.camera.updateProjectionMatrix();
  suno.shadow.bias = -0o1/0o4000; suno.shadow.normalBias = 0o4/0o10;
  sceno.add(suno, suno.target);

  // Suna sprajto
  const molaTeksturo = ( () => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 0o400;
    const ctx = cv.getContext("2d")!;
    const gr = ctx.createRadialGradient(0o200, 0o200, 0o10, 0o200, 0o200, 0o200);
    gr.addColorStop(0, "rgba(255,255,255,0.85)"); gr.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gr; ctx.fillRect(0, 0, 0o400, 0o400);
    return new THREE.CanvasTexture(cv);
  } )();
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

  // ⟪ Sunaj ombroj 📃 ⟫ — la suna ombro-volumeno sekvas la vidpunkton ( la
  // ludanton aŭ la orbitan celon ), anstataŭ resti fiksita ĉe la mond-origino.
  // Unue tio donas ombrojn ĉie, kie la ludanto iras ( antaŭe nur ĉirkaŭ la
  // centro ), due la ombra pasumo desegnas nur la proksimajn ombrantojn — la
  // plej granda parto de la kadraj desegnoj. La suna DIREKTO restas tiu de la
  // paletro ( la krepusko kaj la vetero ŝanĝas ĝin ) — nur la volumeno moviĝas,
  // do la lumigo mem ne ŝanĝiĝas. La centro kvantiĝas al la ombra
  // teksel-krado en la lum-spaco, alie la ombraj randoj trembrus dum irado.
  const ombraTekselo = ( suno.shadow.camera.right - suno.shadow.camera.left ) / suno.shadow.mapSize.x;
  // La suna DIREKTO kaj la suna DISTANCO venas ambaŭ de la paletro — la
  // distanco estas la longo de la paletra sun-pozicio rilate la mond-originon
  // ( ~100 ĝis ~137 ), do ĝi ne dependas de tio, kie la ludanto troviĝas. Gravas
  // ke ĝi restu fiksa — la ombra fotilo havas malproksiman ebenon je 0o520, kaj
  // se la suno forflugus preter ĝi, la tuta ombro-volumeno falus ekster la
  // ombra mapo kaj la ombroj tute malaperus.
  const SUNA_DIREKTO = new THREE.Vector3().copy(suno.position).normalize();
  let sunaDistanco = suno.position.length();
  const OMBRA_DIR = new THREE.Vector3();
  const OMBRA_DEX = new THREE.Vector3();
  const OMBRA_SUP = new THREE.Vector3();
  const OMBRA_CENTRO = new THREE.Vector3();
  let ombraCentroX = 0, ombraCentroZ = 0;

  // aplikiOmbranCentron — Metu la sunon kaj ĝian celon tiel, ke la ombro-
  // volumeno centriĝu je ( ombraCentroX, ombraCentroZ ) kun la paletra direkto.
  function aplikiOmbranCentron(): void {
    OMBRA_DIR.copy(SUNA_DIREKTO);
    const distanco = sunaDistanco;
    if ( distanco === 0 ) return;
    // Orta bazo de la lumo — la teksel-krado kuŝas en ĉi tiu ebeno.
    OMBRA_SUP.set(0, 1, 0);
    if ( Math.abs(OMBRA_DIR.y) > 0o777/0o1000 ) OMBRA_SUP.set(0, 0, 1);
    OMBRA_DEX.crossVectors(OMBRA_SUP, OMBRA_DIR).normalize();
    OMBRA_SUP.crossVectors(OMBRA_DIR, OMBRA_DEX).normalize();
    // Kvantigu la centron laŭ la du flankaj aksoj ( laŭ-direkte ne gravas ).
    const dekstre = Math.round(( ombraCentroX * OMBRA_DEX.x + ombraCentroZ * OMBRA_DEX.z ) / ombraTekselo) * ombraTekselo;
    const supre = Math.round(( ombraCentroX * OMBRA_SUP.x + ombraCentroZ * OMBRA_SUP.z ) / ombraTekselo) * ombraTekselo;
    OMBRA_CENTRO.set(0, 0, 0).addScaledVector(OMBRA_DEX, dekstre).addScaledVector(OMBRA_SUP, supre);
    suno.target.position.copy(OMBRA_CENTRO);
    suno.position.copy(OMBRA_CENTRO).addScaledVector(OMBRA_DIR, distanco);
  }

  // gxisdatigiOmbron — La per-kadra sekvo. La vidpunkto venas de la buklo
  // ( la ludanto en promeno, la orbit-celo alie ). La reveno diras al la buklo
  // ĉu la ombro-volumeno moviĝis — tiam la ombro-mapo devas re-desegniĝi Tuj,
  // por ke la ombroj ne postiĝu dum la kamero glitas.
  //     @param x ( number ) - La mond-x de la vidpunkto.
  //     @param z ( number ) - La mond-z de la vidpunkto.
  //     @return ( boolean ) - Ĉu la centro moviĝis ( kaj do necesas ombra kadro ).
  function gxisdatigiOmbron( x: number, z: number ): boolean {
    if ( x === ombraCentroX && z === ombraCentroZ ) return false;
    ombraCentroX = x; ombraCentroZ = z;
    aplikiOmbranCentron();
    return true;
  }

  function aplikiAtmosferon(): void {
    const t = lastaKrepusko;
    const d = PALETROJ[nunaVetero];
    const l = ( a: THREE.Color | THREE.Vector3 | number, b: THREE.Color | THREE.Vector3 | number ): any =>
      a instanceof THREE.Color ? ( a as THREE.Color ).clone().lerp(b as THREE.Color, t) :
      a instanceof THREE.Vector3 ? ( a as THREE.Vector3 ).clone().lerp(b as THREE.Vector3, t) :
      a + ( b as number - a ) * t;
    cxielajUniformoj.uTop.value = l(d.tago.top, d.krepusko.top);
    cxielajUniformoj.uMid.value = l(d.tago.mid, d.krepusko.mid);
    cxielajUniformoj.uBot.value = l(d.tago.bot, d.krepusko.bot);
    cxielajUniformoj.uSunCol.value = l(d.tago.sunCol, d.krepusko.sunCol);
    const sunDir = new THREE.Vector3().copy(d.tago.sunPos).lerp(d.krepusko.sunPos, t);
    cxielajUniformoj.uSunDir.value = sunDir.clone().normalize();
    sceno.fog!.color.copy(d.tago.fog).lerp(d.krepusko.fog, t);
    ( sceno.fog as THREE.FogExp2 ).density = l(d.tago.nebulDenso, d.krepusko.nebulDenso);
    hemiLumo.color.copy(d.tago.hemiSky).lerp(d.krepusko.hemiSky, t);
    hemiLumo.groundColor.copy(d.tago.hemiGnd).lerp(d.krepusko.hemiGnd, t);
    hemiLumo.intensity = l(d.tago.hemiInt, d.krepusko.hemiInt);
    suno.color.copy(d.tago.sunCol).lerp(d.krepusko.sunCol, t);
    suno.intensity = l(d.tago.sunInt, d.krepusko.sunInt);
    // La paletra sun-pozicio donas la direkton kaj la distancon — la nunan
    // vidpunkton aplikiOmbranCentron aldonas ( la lumo restas ĉe la ludanto
    // anstataŭ ĉe la mond-origino, sed la lumigo kaj la ombra angulo samas ).
    SUNA_DIREKTO.copy(d.tago.sunPos).lerp(d.krepusko.sunPos, t);
    sunaDistanco = SUNA_DIREKTO.length();
    if ( sunaDistanco > 0 ) SUNA_DIREKTO.divideScalar(sunaDistanco);
    aplikiOmbranCentron();
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
    if ( !pluvo.visible && !nego.visible && !hajlo.visible ) return;
    // Ĉiuj tri sistemoj estas GPU-animitaj ( uTime ); la pluvo bezonas ankaŭ
    // la pikselan skalon, por projekcii la gut-longon al streka longo.
    if ( pluvo.visible ) {
      const mat = pluvo.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = t;
      // Pikseloj por unu mondo-unuo ĉe distanco 1 ( la fotila fov × bilda alto ).
      mat.uniforms.uScale.value = bildilo.domElement.height / fotilaDuTan;
    }
    if ( nego.visible ) (nego.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
    if ( hajlo.visible ) (hajlo.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
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
    for ( let i = 0; i < N; i++ ) {
      pozicioj[i * 3] = ( Math.random() * 2 - 1 ) * duonoX;
      pozicioj[i * 3 + 1] = ( Math.random() * 2 - 1 ) * duonoY;
      pozicioj[i * 3 + 2] = ( Math.random() * 2 - 1 ) * duonoZ;
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
    for ( let i = 0; i < N; i++ ) {
      const x0 = ( Math.random() * 2 - 1 ) * 0o200;
      const z0 = ( Math.random() * 2 - 1 ) * 0o200;
      pozicioj[i * 3] = x0;
      pozicioj[i * 3 + 1] = ( Math.random() * 2 - 1 ) * 0o140;
      pozicioj[i * 3 + 2] = z0;
      semoj[i] = Math.random();
      // Fala rapido kaj LONGECO — pli mallongaj strekoj ol antaŭe ( 1.4–2.9
      // anstataŭ 2–5 ), por ke la gutoj legiĝu kiel gutoj, ne kiel vergoj.
      rapidoj[i] = 0o46 + Math.random() * 0o14;
      longoj[i] = 0o13/0o10 + Math.random() * 0o14/0o10;
      // Distanca fado — la loka ofseto egalas la mondan distancon de la fotilo.
      const d = Math.hypot(x0, z0);
      fadoj[i] = Math.min(1, Math.max(0.05, 1 - ( d - 24 ) / 136));
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

  // ⟪ La formo de la mondo 📃 ⟫ — la tereno ne estas kvadrato. Ĉiu mapo elektas
  // sian formon ( src/tero-datumaro/mapoj.ts ) — la cirklon ( la defaŭlto ), la
  // rondigitan kvadraton aŭ la rondigitan triangulon ( assets/komunajxoj/mapformo.ts ).
  // La formo decidas la randon de la tereno, la krutaĵon sub ĝi, la montaron,
  // la ĉirkaŭan ebenon kaj la komencon de la nebulo. La aktiva mapo estas tiu,
  // kiun la ludo legas. La formo legiĝas ĉi tie, antaŭ la montaro — tiu ĉi jam
  // bezonas ĝin por meti siajn ringojn.
  const aktivaMapoDatumoj = aktivaMapo();
  const mapoFormo = aktivaMapoDatumoj.formo;
  const mapoGrandeco = aktivaMapoDatumoj.grandeco;

  // La montaj terenblokoj kolektiĝas en unu grupon — la mapo-bakado kaj la
  // estontaj vidoj povas trakti la tutan montaron kiel unu objekton.
  const montaGrupo = new THREE.Group();
  sceno.add(montaGrupo);

  // Malproksimaj montoj — solidaj terenaj blokoj, APARTAJ de la ĉefa grundo.
  // Ĉiu bloko havas sian propran altecan kampon kaj fermitan geometrion
  // ( supro, muroj, fundo ), do ĝi estas vera terenobjekto — ne maldika folio
  // kuŝanta sur la ĉefa tereno.
  //
  // ⟨ La montaro sekvas la formon de la mapo 📃 ⟩ — la montoj ne plu staras sur
  // la kvar rektaj linioj de KVADRATO. Ĉiu tavolo estas RINGO laŭ la rando de la
  // aktiva formo je konstanta kromdisto, do la montaro sekvas la cirklon, la
  // rondigitan kvadraton aŭ la rondigitan triangulon. Por la kvadrato la ringo
  // egalas la antaŭajn kvar striojn ( la kresto sidas ĝuste super la mondrando ),
  // por la cirklo la montaro fariĝas vera ĉirkaŭanta montaro.
  ( function konstruiMontojn(): void {
    // Krestolinia profilo — frakta valora bruo ( la sama bruo2D kiel la
    // grundo ) por malglataj, naturaj pintoj kaj seloj. La antaŭa sinus-ondita
    // profilo faris regulajn FALDOJN — ripetajn, samaltajn krestojn kiel
    // faldita tuko. La valora bruo havas neniun preferatan direkton; la
    // ridged transformo turnas la mezajn kaj fajnajn oktavojn en akrajn
    // krestojn kun profundaj seloj, kaj la ĉefa maso malfermas larĝajn valojn.
    // montaAlto — la kresta alteco de la montaro ĉe monda pozicio. La bruo legas
    // la MONDAJN koordinatojn, ne la longon laŭ unu rekta strio — nur tiel la
    // ringo povas ĉirkaŭi la formon sen videbla kudro, kaj ĉiu tavolo havas sian
    // propran malŝovon ( semo ) por ke la ringoj ne spegulu unu la alian.
    //     @param px, pz ( number ) - La mondaj koordinatoj de la kresto.
    //     @param semo ( number ) - La malŝovo de ĉi tiu tavolo.
    function montaAlto(px: number, pz: number, semo: number): number {
      const x = px / 0o100 + semo * 0o10;
      const z = pz / 0o100 + semo * 0o20 + 0o20;
      const malglata = ( u: number, v: number ): number => 1 - Math.abs(2 * bruo2D(u, v) - 1);
      const maso = bruo2D(x, z);
      // ⟨ La valoj 📃 ⟩ — antaŭe `valo = maso²`, do kie la ĉefa maso forestis,
      // la tuta malglataĵo kaj la pintoj ankaŭ malaperis: la montaro estis ARO
      // DA IZOLITAJ BULBOJ kun plata herbejo inter ili, kaj de supre la mapo
      // montris bendojn da makuloj anstataŭ unu montaran ĉenon. Nun resto de
      // la efiko restas en la valoj, do ankaŭ la seloj havas kreston.
      const valo = 0.35 + 0.65 * maso * maso;
      const pinto = malglata(x * 0o3, z * 0o3);
      const fajno = malglata(x * 0o4, z * 0o4);
      // ⟨ La spino 📃 ⟩ — pli malalta, pli larĝa krestolinio, kiu NE malaperas
      // en la valoj. Ĝi portas la mezajn pintojn kaj kunligas la ĉefajn masojn,
      // do la montaro legiĝas kiel ĈENO anstataŭ kiel aro da montetoj.
      const spino = malglata(x * 1.5 + 0o13, z * 1.5 + 0o27);
      // ⟨ La dentoj 📃 ⟩ — du pliaj fajnaj oktavoj: la dentaro de la krestoj.
      // La antaŭa funkcio havis nur du oktavojn, do la siluetoj estis MOLAJ
      // SFERAJ makuloj — la mapo montris aerografo-tuŝojn, tute alian teksturon
      // ol la cetera tereno, kiu havas delikatan makulecon.
      const dentoj = malglata(x * 0o10, z * 0o10);
      const grajno = malglata(x * 0o22, z * 0o22);
      // La pintoj kaj la malglateco multiĝas per la ĉefa maso, por ke la
      // kresto akriĝu nur sur la masoj; la spino anstataŭe fortas ĝuste en la
      // valoj, kiuj alie restus ebenaj.
      // ⟨ La tuta skalo 📃 ⟩ — la aldonitaj oktavoj levas la montaron, kaj la
      // neĝa linio de la paletro ( 38–46 ) estas fiksa: tro da aldono kovras la
      // tutan ringon per neĝo kaj la mapo montras blankan muron. La ĉefaj termoj
      // do iomete MALgrandiĝis, do la maksimumo restas proksimume la sama ( ~80 )
      // dum la MINIMUMO altiĝas de 16 al ~21 — tio fermiĝas la truojn inter la
      // krestoj sen pli da neĝo.
      return 0o13
        + 0o36 * maso
        + 0o10 * spino * ( 0o60/0o100 + 0o40/0o100 * ( 1 - maso ))
        + 0o24 * pinto * valo
        + 0o10 * fajno * ( 0o40/0o100 + 0o60/0o100 * valo )
        + 0o03 * dentoj * ( 0o40/0o100 + 0o60/0o100 * maso )
        + 0o02 * grajno * valo;
    }

    // La nebul-tono de la horizonto — la foraĵo miksiĝas kun ĝi.
    const NEBUL_TONO = new THREE.Color(0xc8d8d8);

    // montaKoloroEn — La koloro de monta vertico. La paletro estas la KOMUNA
    // terena paletro ( terenaKoloroEn en assets/komunajxoj/terenkoloroj.ts ) —
    // la montoj do portas la samajn herbojn, sekherbojn, rokojn kaj neĝon kiel
    // la cetera mondo, kaj la herbejoj de la deklivoj daŭras ĝis la montoj. La
    // antaŭa paletro estis simpla blu-griza gradiento laŭ la alto. ĉiuj montoj
    // aspektis kiel unu pala muro, la pintoj blindigis al blanko kaj la bake
    // montris blankan ringon anstataŭ montaron.
    //     @param celo ( THREE.Color ) - La cela koloro ( reskribita ).
    //     @param y ( number ) - La alto de la vertico.
    //     @param x, z ( number ) - La mondaj koordinatoj ( por la bruo ).
    //     @param deklivo ( number ) - La gradiento |∇h| ( la krutaj flankoj
    //         malkovras la rokon ).
    //     @param malproksimo ( number ) - Kiom for de la mondrando sidas la
    //         vertico ( 0 = ĉe la rando, 1 = la fora kresto ) — la atmosfera
    //         perspektivo de la fora silueto.
    function montaKoloroEn(celo: THREE.Color, y: number, x: number, z: number,
      deklivo: number, malproksimo: number): void {
      // La neĝa linio ONDIĜAS — malsamaj krestoj portas neĝon je malsamaj
      // altoj anstataŭ ĉiuj ekde la sama horizontala linio. DU oktavoj: la
      // malproksima movas la tutan neĝolinion, la proksima dividas ĝin en
      // langojn kaj makulojn. Kun la antaŭa sola oktavo ( amplitudo ±4 ) la
      // neĝo sur la glataj montoj estis unu BRILA BLANKA BLOBO meze de ĉiu
      // monteto — la plej okulfrapa signo, ke la montaro ne apartenas al la
      // mondo.
      const negxaOndo = ( bruo2D(x / 0o70, z / 0o70) - 0o1/0o2 ) * 0o16
        + ( bruo2D(x / 0o16, z / 0o16) - 0o1/0o2 ) * 0o7;
      terenaKoloroEn(celo, y + negxaOndo, x, z, deklivo);
      // Atmosfera perspektivo — la fora kresto miksiĝas kun la nebulo de la
      // horizonto, do la fona montaro legiĝas malproksima anstataŭ egale akra.
      if ( malproksimo > 0 ) celo.lerp(NEBUL_TONO, malproksimo * 0o35/0o100);
    }

    // ⟨ La samaj teksajxoj kiel la tereno 📃 ⟩ — la montarblokoj havis NENIAN
    // mapon, nur la verticajn kolorojn, dum la ĉefa tereno portas la grundan
    // markaron kaj reliefon. Ĉe la sama UV-skalo la montaro do estis la sola
    // GLATA parto de la mondo — de supre ĝi montriĝis kiel pentrita banto, kaj
    // de proksime kiel unukolora deklivo. Nun la ringoj uzas la samajn teksturojn
    // ( la funkcioj estas kaŝmemoritaj, do ne estas plia memoro ) kaj la samajn
    // UV-ojn, do la herba grajno, la ŝtonetoj kaj la herbotufoj daŭras sen salto
    // trans la mondrandon.
    const montaGrundo = kreiGrundanTeksajxon();
    const montaReliefo = kreiGrundanBumpanTeksajxon();
    const montaMaterialo = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o35/0o40, metalness: 0, vertexColors: true,
      map: montaGrundo, bumpMap: montaReliefo, bumpScale: 0o5/0o10,
      side: THREE.DoubleSide,   // la bloko estas videbla ankaŭ de la fora flanko
    });
    const montaFona = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o37/0o40, metalness: 0, vertexColors: true,
      map: montaGrundo, bumpMap: montaReliefo, bumpScale: 0o5/0o10,
      side: THREE.DoubleSide,
    });

    // ringaPunkto — La kresta linio de la montaro ĉe la angulo. La linio sekvas
    // la randon de la aktiva formo je la kromdisto « disto », kaj la elstara
    // normalo venas de la tanĝanto de la ringa kurbo ( ne de la radiusa direkto )
    // — tiel la larĝo de la tavolo restas egala ankaŭ ĉe la anguloj de la
    // kvadrato kaj de la triangulo.
    //     @param disto ( number ) - Kiom for de la mondrando sidas la kresto.
    //     @param ang ( number ) - La angulo ĉirkaŭ la mondcentro.
    //     @returns La punkto kaj ĝia elstara normalo.
    function ringaPunkto(disto: number, ang: number): { x: number; z: number; nx: number; nz: number } {
      const rando = radiusaDistanco(mapoFormo, mapoGrandeco, ang) + disto;
      const x = Math.cos(ang) * rando, z = Math.sin(ang) * rando;
      // La tanĝanto — la najbaraj punktoj de la ringa kurbo.
      const pa = 0o1/0o2000;
      const ra = radiusaDistanco(mapoFormo, mapoGrandeco, ang - pa) + disto;
      const rb = radiusaDistanco(mapoFormo, mapoGrandeco, ang + pa) + disto;
      const tx = Math.cos(ang + pa) * rb - Math.cos(ang - pa) * ra;
      const tz = Math.sin(ang + pa) * rb - Math.sin(ang - pa) * ra;
      const longo = Math.hypot(tx, tz) || 1;
      let nx = -tz / longo, nz = tx / longo;
      // La normalo turnuĝu FOR de la centro ( la tanĝanto havas du perpendiklojn ).
      if ( nx * Math.cos(ang) + nz * Math.sin(ang) < 0 ) { nx = -nx; nz = -nz; }
      return { x, z, nx, nz };
    }

    // krestaVagado — La krestolinio de la montaro VAGAS laŭ la angulo. La bruo
    // estas legata laŭ CIRKLO en la brua spaco, do la vagado fermiĝas sen kudro
    // ĉe la angulo 2π. La antaŭa montaro havis konstantan kreston, do ĝi aspektis
    // kiel muro egale dika ĉirkaŭ la mondo; nun la krestoj proksimiĝas kaj
    // malproksimiĝas kiel veraj montaraj spinoj.
    //     @param bazo ( number ) - La meza kresto-distanco de la ringo.
    //     @param vario ( number ) - Kiom la kresto vagas ( ± ).
    //     @param semo ( number ) - La malŝovo de ĉi tiu ringo ( por ke la ringoj
    //         ne spegulu unu la alian ).
    //     @returns la kresto-distanco laŭ la angulo.
    function krestaVagado(bazo: number, vario: number, semo: number): ( ang: number ) => number {
      return ( ang: number ): number =>
        bazo + ( bruo2D(Math.cos(ang) * 0o4 + semo, Math.sin(ang) * 0o4 + semo * 0o3) - 0o1/0o2 ) * vario;
    }

    // krestaAlto — La tuta ALTO de la ringo laŭ la angulo: la montpasejoj kaj la
    // peakoj. La antaŭa ringo havis KONSTANTAN skalon, do ĉiu parto de la mondo
    // havis montojn de la sama alteco. La neĝa linio de la paletro ( 46 ) estis
    // superita ĉie, do la tuta ringo portis unu seninterrompan blankan banton —
    // la plej forta signo, ke la montaro ne estas parto de la mondo. Nun du
    // oktavoj da bruo laŭ la angulo multiplikas la alton: partoj de la ringo
    // restas verdaj montetoj sub la arbolinio, aliaj leviĝas en verajn neĝajn
    // pintojn, kaj inter ili estas pasejoj. La bruo legas CIRKLON en la brua
    // spaco, do ĝi fermiĝas sen kudro ĉe la angulo 2π.
    //     @param bazoS ( number ) - La baza skalo de ĉi tiu tavolo.
    //     @param semo ( number ) - La malŝovo de ĉi tiu tavolo.
    //     @returns la alt-skalalo laŭ la angulo.
    function krestaAlto(bazoS: number, semo: number): ( ang: number ) => number {
      return ( ang: number ): number => {
        const u = Math.cos(ang) * 0o4 + semo;
        const v = Math.sin(ang) * 0o4 + semo * 0o3;
        return bazoS * ( 0.34 + 0.56 * bruo2D(u, v) + 0.30 * bruo2D(u * 0o3 + 0o7, v * 0o3 + 0o5) );
      };
    }

    // kreiMontanRingon — unu tavolo de la montaro, kiel solida terenbloko kun
    // supra kresto, muroj kaj fundo, kaj PROPRA alteca kampo ( sen la ĉefa
    // tereno ). La krestolinio RINGAS laŭ la rando de la formo ( vagante — vidu
    // krestaVagado ), kaj la vicoj etendiĝas eksteren laŭ la elstara normalo; la
    // bruo legas la mondajn koordinatojn, do la ringo fermiĝas sen kudro ( la
    // lasta kolumno kaj la unua kolumno sidas samloke ).
    //     @param kresto ( funkcio ) - La kresto-distanco laŭ la angulo.
    //     @param profundo ( number ) - Kiom profunda ( eksteren ) estas la tavolo.
    //     @param sl ( number ) - La kolumnoj ĉirkaŭ la ringo.
    //     @param sd ( number ) - La vicoj de la kresto ĝis la fora rando.
    //     @param skalo ( funkcio ) - La tuta alto de la ringo laŭ la angulo
    //         ( krestaAlto ) — la pasejoj kaj la peakoj de la montaro.
    //     @param malproksimo ( number ) - Kiom fora estas la ringo ( la
    //         atmosfera perspektivo en montaKoloroEn ).
    function kreiMontanRingon(
      kresto: ( ang: number ) => number,
      profundo: number, sl: number, sd: number,
      semo: number, skalo: ( ang: number ) => number, malproksimo: number,
      materialo: THREE.MeshStandardMaterial,
): void {
      const kolonoj = sl + 1;        // ĉirkaŭ la ringo ( la lasta = la unua )
      const vicoj = sd + 1;          // laŭ la profundo
      const suprN = kolonoj * vicoj;
      const fundo = MONDO_BAZA_Y - 0o4;   // la monta bazo — iomete sub la ebena fundo
      const pozicioj = new Float32Array(suprN * 2 * 3);
      const koloroj = new Float32Array(suprN * 2 * 3);
      // ⟨ La grundaj UV-oj 📃 ⟩ — la montaro portas la SAMAN grundteksajxon kaj
      // reliefon kiel la ĉefa tereno ( vidu la materialojn malsupre ), kaj la
      // UV-oj estas la SAMAJ kiel tiuj de la terena ebeno: la ebeno estas
      // 0o3000 ( 1536 ) unuojn larĝa kun la defaŭltaj 0..1 UV-oj, do ĝia UV estas
      // ( x / 1536 + 0.5, z / 1536 + 0.5 ). Kun la sama mapo kaj la samaj UV-oj
      // la grajno de la grundo daŭras trans la mondrandon sen salto — sen tio la
      // ringo estis la sola GLATA parto de la mondo, kaj de supre ĝi montriĝis
      // kiel pentrita banto anstataŭ kiel tereno.
      const uvaj = new Float32Array(suprN * 2 * 2);
      // La kradaj paŝoj — por la deklivo en la paletro ( la sama kalkulo kiel en
      // la ĉefa tereno ). La paŝo laŭ la angulo kreskas kun la radiuso, do la
      // valoro legiĝas unufoje por la meza kresto.
      const pasxoProfundo = profundo / sd;
      const pasxoAngulo = 2 * Math.PI * ( mapoGrandeco + 0o100 ) / sl;
      const altoj = new Float32Array(suprN);
      // ⟪ La supraĵo 📃 ⟫ — la altoj unue, la koloroj poste ( la paletro
      // bezonas la deklivon — la gradienton de la najbaraj verticoj ).
      for ( let v = 0; v < vicoj; v ++ ) {
        for ( let k = 0; k < kolonoj; k ++ ) {
          const i = v * kolonoj + k;
          const tn = v / sd;              // 0..1 de la kresto ĝis la fora rando
          const ang = k / sl * Math.PI * 0o2;
          // La kresta linio sekvas la randon de la formo; la vicoj etendiĝas
          // eksteren laŭ la elstara normalo de la ringa kurbo.
          const ringo = ringaPunkto(kresto(ang), ang);
          const x = ringo.x + ringo.nx * tn * profundo;
          const z = ringo.z + ringo.nz * tn * profundo;
          // ⟨ La monta profilo 📃 ⟩ — la KRESTOLINIO sidas ĉe « centro » de la
          // profundo, kaj la profilo estas GLATA S-KURBO supre kaj malsupre de
          // ĝi. La antaŭa profilo estis gaŭsa kurbo kun la kresto ĉe 0.22 de la
          // profundo: la monto atingis 37% de sia alto jam ĉe 10% de la profundo,
          // do ĝi estis 45-grada muro tuj ekster la mondrando — de supre la
          // montaro montriĝis kiel kadro ĉirkaŭ la insulo, ne kiel ĝia daŭrigo.
          // Nun la kresto staras pli fore ( 0.40..0.64 ) kaj la INTERNA flanko
          // leviĝas tra la tuta interna duono per S-kurbo: malkruta piedo ( kie
          // la paletro ankoraŭ estas la herbejo ), kruta mezdeklivo kaj plata,
          // ronda kresto. La S-kurbo havas nulan deklivon ĉe ambaŭ finoj, do la
          // kresto estas ronda kresto anstataŭ korno, kaj la piedo solviĝas en
          // la ĉirkaŭan ebenon sen paŝo.
          const centro = 0o40/0o100 + 0o24/0o100 * bruo2D(x / 0o40 + semo * 0o10, z / 0o40 + semo * 0o30);
          const kr = Math.min(1, tn / centro);
          const kresko = kr * kr * ( 3 - 2 * kr );
          const fal = glataPaso(centro, 1, tn);
          const profilo = kresko * ( 1 - fal );
          // ⟨ La aliĝo al la mondo 📃 ⟩ — ĉe la mondrando la montaro sidas sur
          // la alteco de la tereno ĝuste tie ( la interna rando de la bloko kaj
          // la rando de la mondo tiam kuntuŝiĝas sen fendo kaj sen foso ), kaj la
          // influo de tiu alteco malaperas ene de la unua kvarono de la profundo
          // — la propra monta profilo transprenas. Ĉe la fora rando la monto
          // malleviĝas ĝis la baza ebeno de la mondo, por ke la piedo solviĝu en
          // la ĉirkaŭan ebenon anstataŭ finiĝi per klifo.
          const bordo = alteco(ringo.x, ringo.z);
          const aligo = 1 - glataPaso(0, 0o1/0o4, tn);
          // ⟨ La alteco venas de la VERTICO, ne de la kresto 📃 ⟩ — antaŭe
          // montaAlto legiĝis ĉe la krestolinio, do ĝi estis KONSTANTA laŭ la
          // tuta profundo: ĉiu angula kolumno estis unu sola altaĵo elŝovita
          // eksteren, kaj la montaro havis neniun 2D-reliefon — neniaj flankaj
          // spinoj, ravinoj aŭ duarangaj pintoj. Nun la bruo legas la POZICION de
          // la vertico mem, do la kresto disfalas en sinsekvon de pintoj kaj
          // seloj, kaj la S-kurba profilo restas tio, kio faras ĝin kresto.
          const y = bordo * aligo
            + montaAlto(x, z, semo) * skalo(ang) * profilo
            + MONDO_BAZA_Y * fal;
          altoj[i] = y;
          pozicioj[i * 3] = x; pozicioj[i * 3 + 1] = y; pozicioj[i * 3 + 2] = z;
          const uvx = x / 0o3000 + 0o1/0o2, uvz = z / 0o3000 + 0o1/0o2;
          uvaj[i * 2] = uvx; uvaj[i * 2 + 1] = uvz;
          const b = i + suprN;
          pozicioj[b * 3] = x; pozicioj[b * 3 + 1] = fundo; pozicioj[b * 3 + 2] = z;
          uvaj[b * 2] = uvx; uvaj[b * 2 + 1] = uvz;
        }
      }
      // ⟨ La koloroj 📃 ⟩ — la dua paŝo. La deklivo venas de la najbaraj
      // verticoj ( laŭ la angulo kaj laŭ la profundo ), do la krutaj flankoj
      // malkovras la rokon kaj la mildaj deklivoj restas herbejaj — la sama
      // regulo kiel en la ĉefa tereno.
      const montaKoloro = new THREE.Color();
      for ( let v = 0; v < vicoj; v ++ ) {
        for ( let k = 0; k < kolonoj; k ++ ) {
          const i = v * kolonoj + k;
          const x = pozicioj[i * 3], y = altoj[i], z = pozicioj[i * 3 + 2];
          // La najbaroj ĉirkaŭe — la angulo fermiĝas ( la lasta kolumno spegulas
          // la unuan ), la profundo restas ĉe la randoj.
          const km = ( k + sl - 1 ) % sl, kp = ( k + 1 ) % sl;
          const vm = ( v > 0 ? v - 1 : v ) * kolonoj + k;
          const vp = ( v < sd ? v + 1 : v ) * kolonoj + k;
          const dAng = ( altoj[v * kolonoj + kp] - altoj[v * kolonoj + km] ) / ( 2 * pasxoAngulo );
          const dProf = ( altoj[vp] - altoj[vm] ) / ( 2 * pasxoProfundo );
          montaKoloroEn(montaKoloro, y, x, z, Math.hypot(dAng, dProf), malproksimo);
          koloroj[i * 3] = montaKoloro.r;
          koloroj[i * 3 + 1] = montaKoloro.g;
          koloroj[i * 3 + 2] = montaKoloro.b;
          // La fundo de la bloko — la tavoloj de la grundo ( la sama funkcio kiel
          // la krutaĵo de la mondo ), do la interna klifo de la montaro montras
          // la samajn tavolojn kiel la rando de la mondo.
          const b = i + suprN;
          terenaStrataKoloroEn(montaKoloro, fundo, y);
          koloroj[b * 3] = montaKoloro.r;
          koloroj[b * 3 + 1] = montaKoloro.g;
          koloroj[b * 3 + 2] = montaKoloro.b;
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
      g.setAttribute("uv", new THREE.BufferAttribute(uvaj, 2));
      g.setIndex(indeksoj);
      g.computeVertexNormals();
      const mesh = new THREE.Mesh(g, materialo);
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      montaGrupo.add(mesh);
    }

    // La kolumnoj ĉirkaŭ la ringo — sufiĉe densaj por la fajna bruo de la
    // krestolinio ( la antaŭaj 0o60 lasis la silueton tro kruda ĉe la rektaj
    // strioj ). Ĉiu tavolo havas sian propran malŝovon, por ke la ringoj ne
    // spegulu unu la alian.
    //
    // ⟨ Kiom densaj 📃 ⟩ — 0o400 ( 256 ) kolumnoj ĉe ~620-unua radiuso estas
    // 15 unuoj inter la verticoj, dum la ĉefa tereno havas verticon ĉiujn 4
    // unuojn: oni do ne povis pentri la FINE GRAJNAN makulecon de la terena
    // paletro sur la montaron, kaj ĝi restis glata. Kun 0o2000 ( 1024 ) la paŝo
    // estas ~3.8 unuoj — la sama denseco kiel la tereno, do la sama paletro kaj
    // la samaj bruo-oktavoj montriĝas ankaŭ ĉi tie.
    const ringajKolonoj = 0o2000;

    // ⟨ La tavoloj de la montaro 📃 ⟩ — du ringoj anstataŭ la tri antaŭaj. La
    // malnovaj tri tavoloj sidadis sur preskaŭ regulaj distoj ( 0, 0.8D, 2.8D )
    // kun KONSTANTA kresto, do la montaro legiĝis kiel tri koncentraj muroj.
    // Nun ĉiu ringo VAGAS — la krestoj proksimiĝas kaj malproksimiĝas kiel veraj
    // montaraj spinoj — kaj la fora ringo portas la atmosferan perspektivon.
    //
    // La proksima ringo — la grandaj krestoj ĉe la mondrando. La vagado tenas
    // la kreston 0o10..0o50 ekster la rando, do la bloko neniam koincidas kun la
    // krutaĵo de la mondo ( neniu z-batalo ) sed restas tute proksime al ĝi.
    kreiMontanRingon(krestaVagado(0o16, 0o10, 0o123/0o100), 0o240, ringajKolonoj, 0o40,
      0o123/0o100, krestaAlto(1, 0o123/0o100), 0, montaMaterialo);

    // La fora ringo — la malalta silueto malantaŭ la proksima, lokita tiel ke
    // ĝia piedo solviĝu en la ebenon antaŭ la rando de la bakita mapo.
    kreiMontanRingon(krestaVagado(0o200, 0o60, 0o123/0o100 + 0o40), 0o200, ringajKolonoj, 0o30,
      0o123/0o100 + 0o20, krestaAlto(0o7/0o10, 0o123/0o100 + 0o20), 0o35/0o100, montaFona);
  } )();

  // bruo2D — la izotropa valora bruo venas de la komuna modulo ( la sama
  // funkcio kiel en la terena skulptilo — antaŭe kopiita ĉi tie ).

  // Grundo
  ( function konstruiTerenon(grandeco: number, segmentoj: number): void {
    const g = new THREE.PlaneGeometry(grandeco, grandeco, segmentoj, segmentoj);
    g.rotateX(-Math.PI / 2);
    // Alternantaj triangul-diagonaloj ( ŝaktabulo ) — la komuna konstruanto
    // ( la sama korekto kiel en la skulptilo kaj la dukuba tereno-interpolo ).
    g.setIndex(alternajDiagonalojn(segmentoj));
    const pozicio = g.attributes.position;
    const koloroj = new Float32Array(pozicio.count * 3);
    // Naturaj koloroj — la KOMUNA paletro ( assets/komunajxoj/terenkoloroj.ts
    // ) — la malseketaj oliv-herbejaj nuancoj de la malnova grundo, kun
    // du-oktava bruo, malseka lito apud la akvo, sekherba deklivo, roko
    // ( dekliva kaj alta ) kaj neĝo sur la pintoj. La skulptilo uzas la
    // saman funkcion, do la 2D-mapo kaj la 3D-vido de la ilo kongruas.
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
      terenaKoloroEn(c, h, x, z, deklivo);
      koloroj[i * 3] = c.r; koloroj[i * 3 + 1] = c.g; koloroj[i * 3 + 2] = c.b;
    }
    // La mondo estas la FORMO, ne la krada kvadrato. La krado ( kaj la
    // datumkrado ) estas kvadrataj, do la eksteraj verticoj premiĝas sur la
    // randon laŭ sia radio — la videbla tereno estas ĝuste la formo. La troaj
    // trianguloj faldiĝas sur la randon ( degeneraj, do nevideblaj ), kaj la
    // rando de la tereno koincidas kun la krutaĵo sub ĝi.
    const premita = { x: 0, z: 0 };
    for ( let i = 0; i < pozicio.count; i++ ) {
      if ( premuAlFormo(mapoFormo, mapoGrandeco, pozicio.getX(i), pozicio.getZ(i), premita) ) {
        pozicio.setX(i, premita.x);
        pozicio.setZ(i, premita.z);
      }
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    g.computeVertexNormals();
    // La grundaj teksajxoj — la koloro ( preskaŭ blanka ripeta markaro, kiu
    // multiplikiĝas kun la verticaj koloroj, do la herba tono restas la sama )
    // kaj la reliefo ( la sama markaro en grizo ). De proksime la tereno montras
    // herbojn, tufojn kaj ŝtonetojn anstataŭ plataj koloroj; de malproksime la
    // kaheloj solviĝas reen en la verticajn kolorojn. La sama ripeto por ambaŭ,
    // do la reliefo kaj la koloro kongruas.
    const grundMaterialo = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o7/0o10,
      map: kreiGrundanTeksajxon(),
      bumpMap: kreiGrundanBumpanTeksajxon(),
      bumpScale: 0o5/0o10,
    });
    const ground = new THREE.Mesh(g, grundMaterialo);
    ground.receiveShadow = true;
    sceno.add(ground);

    // ⟪ La rando de la mondo 📃 ⟫ — la vertikala krutaĵo kaj la fundo. La mondo
    // estas terpeco, do ĝia rando bezonas flankojn malsupren al la baza ebeno kaj
    // kovrilon malsupre; sen ili oni vidus tra la tereno de malantaŭ la rando.
    // La flankoj portas la tavolojn de la grundo ( terenaStrataKoloroEn ).
    const formoBazo = kreiFormanBazon({
      formo: mapoFormo, grandeco: mapoGrandeco, koloro: terenaStrataKoloroEn,
    });
    formoBazo.aktualigu(alteco, MONDO_BAZA_Y);
    const bazaMaterialo = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 1, metalness: 0,
    });
    const bazaMesh = new THREE.Mesh(formoBazo.geometrio, bazaMaterialo);
    bazaMesh.receiveShadow = true;
    bazaMesh.castShadow = true;
    bazaMesh.frustumCulled = false;
    sceno.add(bazaMesh);

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
      // …kaj ne ekster la mondo ( la formo de la mapo ).
      if ( distancoDeFormo(mapoFormo, mapoGrandeco, x, z) > -radiuso ) continue;
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
  } )(0o3000, 0o600);

  // ⟪ La ĉirkaŭa ebeno 📃 ⟫ — la tero daŭras ekster la formo. Sen ĝi la mondo
  // estis disko ŝvebanta super malpleno — la 2D-mapo ( la bakita supraĵo )
  // montris nigran spacon ĉirkaŭ la mondrando kaj la nebul-ringo kuŝis sur nenio.
  // La ebeno radias de la rando de la formo eksteren ĝis la horizonto, je la
  // baza ebeno de la mondo ( la sama ebeno kiel la fundo de la krutaĵo ), kaj
  // ĝia ondado kreskas kun la distanco — apud la mondrando ĝi restas tute plata
  // ( nenio leviĝu super la mondon ), kaj malproksime ĝi ruliĝas kiel la natura
  // tereno. La koloro venas de la komuna paletro, do la ebeno ne distingiĝas de
  // la mondo, kaj ĝi portas la samajn grundajn markojn ( la samaj UV-oj ).
  ( function konstruiĈirkaŭanEbenon(): void {
    const KOLONOJ = 0o200;    // la anguloj ĉirkaŭ la mondo
    const VICOJ = 0o40;       // la paŝoj eksteren
    const fora = 0o6000;      // multe trans la bakita mapo
    const kolonoj = KOLONOJ + 1;   // la lasta kolumno estas la unua ( sen kudro )
    const vicoj = VICOJ + 1;
    const N = kolonoj * vicoj;
    const pozicioj = new Float32Array(N * 3);
    const koloroj = new Float32Array(N * 3);
    const uvaj = new Float32Array(N * 2);
    const koloro = new THREE.Color();
    for ( let v = 0; v < vicoj; v++ ) {
      const frac = v / VICOJ;
      // La paŝoj malproksimiĝas KVADRATE — densaj ĉe la mondrando, maldensaj
      // ĉe la horizonto ( la detaloj apud la mondo gravas, la foro ne ).
      for ( let k = 0; k < kolonoj; k++ ) {
        const i = v * kolonoj + k;
        const ang = k / KOLONOJ * Math.PI * 0o2;
        const rando = radiusaDistanco(mapoFormo, mapoGrandeco, ang);
        const r = rando + ( fora - rando ) * frac * frac;
        const x = Math.cos(ang) * r, z = Math.sin(ang) * r;
        const ondado = ( bruo2D(x / 0o200, z / 0o200) - 0o1/0o2 ) * 0o20 * frac;
        pozicioj[i * 3] = x;
        pozicioj[i * 3 + 1] = MONDO_BAZA_Y + ondado;
        pozicioj[i * 3 + 2] = z;
        // La koloro legas altan parametron NULO — la ebeno estas la baza ebeno,
        // kaj la paletro tie estas la natura herbejo. Oni ne pasigu la absolutan
        // alton de la bazo al la paletro, ĉar la akvoborda tavolo komparas ĝin
        // kun la akvonivelo kaj kolorigus la tutan ebenon subakva.
        terenaKoloroEn(koloro, 0, x, z, 0);
        koloroj[i * 3] = koloro.r;
        koloroj[i * 3 + 1] = koloro.g;
        koloroj[i * 3 + 2] = koloro.b;
        // La samaj UV-oj kiel la ĉefa grundo ( la ebeno mapas la mondon 0..1 ),
        // do la grundaj markoj daŭras sen salto trans la mondrandon.
        uvaj[i * 2] = x / 0o3000 + 0o1/0o2;
        uvaj[i * 2 + 1] = z / 0o3000 + 0o1/0o2;
      }
    }
    const indeksoj: number[] = [];
    // Ŝaktabulaj diagonaloj, kiel la ĉefa tereno — sed la ORDO de la verticoj
    // estas la MALO de tiu de la ĉefa tereno. Tie la vicoj iras laŭ +z kaj la
    // kolonoj laŭ +x; ĉi tie la vicoj iras EKSTEREN laŭ la radiuso kaj la kolonoj
    // laŭ la angulo. Kun la sama ordo la supraj facoj turniĝus malsupren — la
    // ebeno malaperus vidate de supre ( la materialo estas unuflanka ) kaj la
    // lumo venus de sube.
    for ( let v = 0; v < VICOJ; v++ ) {
      for ( let k = 0; k < KOLONOJ; k++ ) {
        const a = v * kolonoj + k, b = a + 1, c = a + kolonoj, d = c + 1;
        if ( ( k + v ) % 2 === 0 ) {
          indeksoj.push(a, d, c, a, b, d);
        } else {
          indeksoj.push(a, b, c, b, d, c);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pozicioj, 3));
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    g.setAttribute("uv", new THREE.BufferAttribute(uvaj, 2));
    g.setIndex(indeksoj);
    g.computeVertexNormals();
    const ebeno = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o7/0o10, map: kreiGrundanTeksajxon(),
    }));
    ebeno.frustumCulled = false;
    sceno.add(ebeno);
  } )();

  // Senfina nebul-ringo — teksturita nebulo trans la rando de la mondo. La
  // nebulo fadas ( leviĝas ) de la mondo eksteren kaj etendiĝas ĝis la horizonto,
  // por ke la mondo ŝajnu finiĝi en senfina nebul-teksturo anstataŭ plata blanko —
  // la montoj restas naturaj malhelaj siluetoj super la nebulo.
  // La alfa estas NULO super la mondo, do la nebulo ne bezonas truon en la mezo —
  // unu granda ebeno kovras ĉion kaj nur la zono ekster la formo videblas. La
  // distanco estas la ( radiusa ) distanco al la FORMO, ne al iama kvadrata
  // maprando, do la nebulo sekvas la cirklon, la kvadraton aŭ la triangulon.
  ( function konstruiNebulringon(): void {
    const ekstera = 0o2000;   // multe trans la fora klingo — neniam videbla
    const teksajxo = kreiNebulTavolanTeksajxon();
    const materialo = new THREE.MeshBasicMaterial({
      map: teksajxo, transparent: true, vertexColors: true, depthWrite: false,
      side: THREE.DoubleSide, fog: false,
    });
    const g = new THREE.PlaneGeometry(2 * ekstera, 2 * ekstera, 0o100, 0o100);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    // rgba-vertekskoloroj — la alfa fadas ekde la mondo; mondskalaj UV-oj
    // ( x/0o100, z/0o100 ), por ke la teksajxo kahelu uniforme ĉie.
    const koloroj = new Float32Array(pos.count * 4);
    const uvaj = new Float32Array(pos.count * 2);
    for ( let i = 0; i < pos.count; i++ ) {
      const x = pos.getX(i), z = pos.getZ(i);
      const alfa = glataPaso(0, 0o600, distancoDeFormo(mapoFormo, mapoGrandeco, x, z));
      koloroj[i * 4] = 1; koloroj[i * 4 + 1] = 1; koloroj[i * 4 + 2] = 1; koloroj[i * 4 + 3] = alfa;
      uvaj[i * 2] = x / 0o100; uvaj[i * 2 + 1] = z / 0o100;
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 4));
    g.setAttribute("uv", new THREE.BufferAttribute(uvaj, 2));
    const mesh = new THREE.Mesh(g, materialo);
    mesh.position.y = 0o1/0o40;   // iomete super la tereno por eviti z-batalon
    mesh.frustumCulled = false;
    sceno.add(mesh);
  } )();

  return { bildilo, sceno, fotilo, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, cxielo, cxielajUniformoj, hemiLumo, suna: suno, sunaSprajto, aplikiRezimon, aplikiVeteron, gxisdatigiVeteron, gxisdatigiOmbron };
}
