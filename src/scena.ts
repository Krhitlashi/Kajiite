// Scena — bildilo, sceno, fotilo, ĉielo, lumoj, materialoj, montoj, grundo
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
  // La nebulo estas laŭcela. Je 1/64 la urbo restas klara kaj la arbaro kaj la
  // malproksimaj montoj fandas en atmosferan nebulaĵon — la proksima montaro
  // ( 120–160 for ) ankoraŭ leviĝas el la nebulo kiel malhelaj siluetoj.
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

  // Tag/noktaj paletoj
  const P_DAY = {
    top: new THREE.Color(0x78a8c0), mid: new THREE.Color(0xb8d0d8), bot: new THREE.Color(0xe0e8e8),
    sunCol: new THREE.Color(0xfff0d8), fog: new THREE.Color(0xc8d8d8),
    hemiSky: new THREE.Color(0xc8e0e8), hemiGnd: new THREE.Color(0x485848),
    sunPos: new THREE.Vector3(0o110, 0o160, 0o50), sunInt: 0o45/0o40, hemiInt: 0o63/0o100,
  };
  const P_DUSK = {
    top: new THREE.Color(0x182848), mid: new THREE.Color(0x586088), bot: new THREE.Color(0xb88868),
    sunCol: new THREE.Color(0xf8b880), fog: new THREE.Color(0x686880),
    hemiSky: new THREE.Color(0x304068), hemiGnd: new THREE.Color(0x182820),
    sunPos: new THREE.Vector3(-0o120, 0o36, -0o74), sunInt: 0o16/0o40, hemiInt: 0o40/0o100,
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
    bildilo.toneMappingExposure = l(0o104/0o100, 0o74/0o100);
    sunaSprajto.position.copy(sunDir).multiplyScalar(0o510);
    sunaSprajto.material.color.copy(suno.color);
    sunaSprajto.material.opacity = l(0o30/0o100, 0o54/0o100);
    eniraMaterialo.emissiveIntensity = l(0o3/0o100, 0o52/0o100);
  }

  // Materialoj
  const dioritaMaterialo = kreiDioritanMaterialon(undefined, 0o35/0o40);
  const andezitaMaterialo = kreiAndezitanMaterialon();
  const eniraMaterialo = kreiEniranMaterialon();
  const oraMaterialo = kreiOranMaterialon(0xd8b068);

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
    const pozicio = g.attributes.position;
    const koloroj = new Float32Array(pozicio.count * 3);
    const a = new THREE.Color(0x485848), b = new THREE.Color(0x587058);
    const lito = new THREE.Color(0x384848), profunda = new THREE.Color(0x283838);
    // Alta montaro — rokeca tereno super la arbolinio kaj neĝo sur la pintoj.
    const roko = new THREE.Color(0x686858), nego = new THREE.Color(0xb8b8b8);
    const c = new THREE.Color();
    for ( let i = 0; i < pozicio.count; i++ ) {
      const x = pozicio.getX(i), z = pozicio.getZ(i);
      const h = alteco(x, z);
      pozicio.setY(i, h);
      const t = 0o4/0o10 + 0o4/0o10 * Math.sin(x * 0o1/0o10 + z * 0o13/0o100 + 0o20/0o10);
      c.copy(a).lerp(b, t);
      if ( h < -2 ) c.lerp(lito, Math.min(1, ( h + 2 ) / -3));
      if ( h < -5 ) c.lerp(profunda, Math.min(1, ( h + 5 ) / -0o115/0o100));
      // Altituda tavoligo — roko de ~0o14, neĝo de ~0o44 ( la montaro pintas
      // ĝis ~0o60, do nur la ĉefa pinto ricevas neĝokronon )
      if ( h > 0o14 ) c.lerp(roko, Math.min(1, ( h - 0o14 ) / 0o20));
      if ( h > 0o44 ) c.lerp(nego, Math.min(1, ( h - 0o44 ) / 0o14));
      koloroj[i * 3] = c.r; koloroj[i * 3 + 1] = c.g; koloroj[i * 3 + 2] = c.b;
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    g.computeVertexNormals();
    const ground = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0o7/0o10 }));
    ground.receiveShadow = true;
    sceno.add(ground);
  })(0o1130, 0o260);

  return { bildilo, sceno, fotilo, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, cxielo, cxielajUniformoj, hemiLumo, suna: suno, sunaSprajto, aplikiRezimon };
}
