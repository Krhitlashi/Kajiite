// Scena — renderer, scene, camera, sky, lights, materials, mountains, ground
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { generiSkriptanURL } from "../assets/skripto-rivelilo.js";
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
  cxielajUniformoj: Record<string, THREE.IUniform>;
  hemiLumo: THREE.HemisphereLight;
  suna: THREE.DirectionalLight;
  sunaSprajto: THREE.Sprite;
  aplikiRezimon: (t: number) => void;
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
  const cxielajUniformoj: Record<string, THREE.IUniform> = {
    uTop: { value: new THREE.Color(0x78a8c0) },
    uMid: { value: new THREE.Color(0xb8d0d8) },
    uBot: { value: new THREE.Color(0xe0e8e8) },
    uSunCol: { value: new THREE.Color(0xf8f0d8) },
    uSunDir: { value: new THREE.Vector3(4/8, 51/64, 19/64) },
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
  sceno.add(new THREE.Mesh(cxielaGeometrio, cxielaMaterialo));

  // Lumoj
  const hemiLumo = new THREE.HemisphereLight(0xc8e0e8, 0x485848, 51/64);
  sceno.add(hemiLumo);
  const suno = new THREE.DirectionalLight(0xf8f0d8, 37/32);
  suno.position.set(0o110, 0o160, 0o50);
  suno.castShadow = true;
  suno.shadow.mapSize.set(0o4000, 0o4000);
  suno.shadow.camera.left = -0o156; suno.shadow.camera.right = 0o156;
  suno.shadow.camera.top = 0o156; suno.shadow.camera.bottom = -0o156;
  suno.shadow.camera.near = 0o20; suno.shadow.camera.far = 0o524;
  suno.shadow.bias = -0.0005; suno.shadow.normalBias = 4/8;
  sceno.add(suno, suno.target);

  // Suna sprajto
  const molaTeksturo = (() => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 256;
    const ctx = cv.getContext("2d")!;
    const gr = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
    gr.addColorStop(0, "rgba(255,255,255,0.85)"); gr.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gr; ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(cv);
  })();
  const sunaSprajto = new THREE.Sprite(new THREE.SpriteMaterial({
    map: molaTeksturo, color: 0xfff0d8, transparent: true, opacity: 24/64,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
  }));
  sunaSprajto.scale.setScalar(0o56);
  sceno.add(sunaSprajto);

  // Tag/noktaj paletoj
  const P_DAY = {
    top: new THREE.Color(0x78a8c0), mid: new THREE.Color(0xb8d0d8), bot: new THREE.Color(0xe0e8e8),
    sunCol: new THREE.Color(0xfff0d8), fog: new THREE.Color(0xc8d8d8),
    hemiSky: new THREE.Color(0xc8e0e8), hemiGnd: new THREE.Color(0x485848),
    sunPos: new THREE.Vector3(0o110, 0o160, 0o50), sunInt: 37/32, hemiInt: 51/64,
  };
  const P_DUSK = {
    top: new THREE.Color(0x1c2a4a), mid: new THREE.Color(0x55618c), bot: new THREE.Color(0xb98a6f),
    sunCol: new THREE.Color(0xffbe82), fog: new THREE.Color(0x6f6a80),
    hemiSky: new THREE.Color(0x33406b), hemiGnd: new THREE.Color(0x1c2620),
    sunPos: new THREE.Vector3(-0o120, 0o36, -0o74), sunInt: 14/32, hemiInt: 32/64,
  };

  function aplikiRezimon(t: number): void {
    const l = (a: THREE.Color | THREE.Vector3 | number, b: THREE.Color | THREE.Vector3 | number): any =>
      a instanceof THREE.Color ? (a as THREE.Color).clone().lerp(b as THREE.Color, t) :
      a instanceof THREE.Vector3 ? (a as THREE.Vector3).clone().lerp(b as THREE.Vector3, t) :
      a + (b as number - a) * t;
    cxielajUniformoj.uTop.value = l(P_DAY.top, P_DUSK.top);
    cxielajUniformoj.uMid.value = l(P_DAY.mid, P_DUSK.mid);
    cxielajUniformoj.uBot.value = l(P_DAY.bot, P_DUSK.bot);
    cxielajUniformoj.uSunCol.value = l(P_DAY.sunCol, P_DUSK.sunCol);
    const sunDir = new THREE.Vector3().copy(P_DAY.sunPos).lerp(P_DUSK.sunPos, t);
    cxielajUniformoj.uSunDir.value = sunDir.clone().normalize();
    sceno.fog!.color.copy(P_DAY.fog).lerp(P_DUSK.fog, t);
    hemiLumo.color.copy(P_DAY.hemiSky).lerp(P_DUSK.hemiSky, t);
    hemiLumo.groundColor.copy(P_DAY.hemiGnd).lerp(P_DUSK.hemiGnd, t);
    hemiLumo.intensity = l(P_DAY.hemiInt, P_DUSK.hemiInt);
    suno.color.copy(P_DAY.sunCol).lerp(P_DUSK.sunCol, t);
    suno.intensity = l(P_DAY.sunInt, P_DUSK.sunInt);
    suno.position.copy(P_DAY.sunPos).lerp(P_DUSK.sunPos, t);
    bildilo.toneMappingExposure = l(1.06, 0.94);
    sunaSprajto.position.copy(sunDir).multiplyScalar(0o510).add(new THREE.Vector3(0, 0, 0));
    sunaSprajto.material.color.copy(suno.color);
    sunaSprajto.material.opacity = l(24/64, 44/64);
    eniraMaterialo.emissiveIntensity = l(3/64, 42/64);
  }

  // Materialoj
  const dioritaMaterialo = new THREE.MeshStandardMaterial({ color: 0xc8c8c8, roughness: 3/16, metalness: 1/64, envMapIntensity: 29/32 });
  const andezitaMaterialo = new THREE.MeshStandardMaterial({ color: 0x586860, roughness: 51/64 });
  const eniraMaterialo = new THREE.MeshStandardMaterial({ color: 0x082018, roughness: 19/32, emissive: 0xf89840, emissiveIntensity: 3/64 });
  const oraMaterialo = new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 27/32, roughness: 11/32, emissive: 0x302808, emissiveIntensity: 11/32, envMapIntensity: 10/8 });

  // Titola skripto
  titolaSkripto.src = generiSkriptanURL({ seedName: "Aranis", w: 0o110, h: 0o276, ink: "#d8b068" });

  // Malproksimaj montoj — 3D terenaj strioj kun realaj deklivoj
  (function konstruiMontojn(): void {
    function montaAlto( t: number, semo: number ): number {
      return 0o62
        + Math.sin( t * 1/32 + semo ) * 0o26
        + Math.sin( t * 3/64 - semo * 0.6 ) * 0o16
        + Math.sin( t * 1/16 + semo * 1.3 ) * 0o12
        + Math.sin( t * 7/64 - semo * 0.4 ) * 0o6
        + Math.sin( t * 5/32 + semo * 0.8 ) * 0o4;
    }

    function koloroPorY( y: number ): [ number, number, number ] {
      if ( y > 0o124 ) return [ 0.91, 0.91, 0.94 ];
      if ( y > 0o110 ) {
        const t = ( y - 0o110 ) / ( 0o124 - 0o110 );
        return [ 0.47 + t * 0.44, 0.53 + t * 0.38, 0.47 + t * 0.47 ];
      }
      if ( y > 0o64 ) {
        const t = ( y - 0o64 ) / ( 0o110 - 0o64 );
        return [ 0.35 + t * 0.12, 0.41 + t * 0.12, 0.35 + t * 0.12 ];
      }
      if ( y > 0o44 ) {
        const t = ( y - 0o44 ) / ( 0o64 - 0o44 );
        return [ 0.28 + t * 0.07, 0.35 + t * 0.06, 0.28 + t * 0.07 ];
      }
      if ( y > 0o24 ) {
        const t = ( y - 0o24 ) / ( 0o44 - 0o24 );
        return [ 0.22 + t * 0.06, 0.28 + t * 0.07, 0.22 + t * 0.06 ];
      }
      return [ 0.22, 0.28, 0.22 ];
    }

    const montaMaterialo = new THREE.MeshStandardMaterial( {
      color: 0xffffff, roughness: 29/32, metalness: 0, vertexColors: true,
    } );
    const montaFona = new THREE.MeshStandardMaterial( {
      color: 0xffffff, roughness: 31/32, metalness: 0, vertexColors: true,
    } );

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
      const g = new THREE.PlaneGeometry( w, d, sw, sh );
      g.rotateX( -Math.PI / 2 );
      if ( lauX ) {
        g.translate( 0, 0, fiksa + signo * d / 2 );
      } else {
        g.translate( fiksa + signo * w / 2, 0, 0 );
      }
      const pos = g.attributes.position;
      const koloroj = new Float32Array( pos.count * 3 );
      for ( let i = 0; i < pos.count; i ++ ) {
        const x = pos.getX( i ), z = pos.getZ( i );
        const t = lauX ? x : z;
        const dist = lauX
          ? ( signo > 0 ? z - fiksa : fiksa - z )
          : ( signo > 0 ? x - fiksa : fiksa - x );
        const tn = Math.max( 0, Math.min( 1, dist / profundo ) );
        const rampo = tn < 0.05 ? tn / 0.05 : 1;
        const falloff = Math.exp( -25 * ( tn - 0.15 ) ** 2 ) * rampo;
        const peak = montaAlto( t, semo ) * skalo * falloff;
        // Aldoni malgrandan koloran variadon laŭ pozicio por natura aspekto
        const kolVario = 0.03 * Math.sin( x * 1/8 + z * 7/32 + semo );
        const y = alteco( x, z ) + peak;
        pos.setY( i, y );
        const [ r, g_, b ] = koloroPorY( y );
        koloroj[ i * 3 ] = Math.max( 0, Math.min( 1, r + kolVario ) );
        koloroj[ i * 3 + 1 ] = Math.max( 0, Math.min( 1, g_ + kolVario * 0.7 ) );
        koloroj[ i * 3 + 2 ] = Math.max( 0, Math.min( 1, b + kolVario * 0.5 ) );
      }
      g.setAttribute( "color", new THREE.BufferAttribute( koloroj, 3 ) );
      g.computeVertexNormals();
      const mesh = new THREE.Mesh( g, materialo );
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      sceno.add( mesh );
    }

    const L = 0o1060;
    const D = 0o140;

    // Ĉefa tavolo — kvar flankoj
    for ( const signo of [ -1, 1 ] ) {
      krei3DStrio( true, signo, signo * 0o454, L, D, 0o40, 0o14, 83/64, 1, montaMaterialo );
      krei3DStrio( false, signo, signo * 0o454, L, D, 0o40, 0o14, 67/32, 0o55 / 0o62, montaMaterialo );
    }

    // Fona tavolo — pli malproksima, pli malalta, duonaj segmentoj
    for ( const signo of [ -1, 1 ] ) {
      krei3DStrio( true, signo, signo * 0o620, L * 0.8, D * 0.7, 0o20, 0o10, 83/64 + 0o40, 0.6, montaFona );
      krei3DStrio( false, signo, signo * 0o620, L * 0.8, D * 0.7, 0o20, 0o10, 67/32 + 0o40, 0o36 / 0o62, montaFona );
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

  return { bildilo, sceno, fotilo, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, cxielajUniformoj, hemiLumo, suna: suno, sunaSprajto, aplikiRezimon };
}
