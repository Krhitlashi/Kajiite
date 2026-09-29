// ≺⧼ Precipitajxo 🌧 ⧽≻
// La tri veteraj partiklo-sistemoj — la pluvo, la neĝo kaj la hajlo. Ĉiuj tri
// estas GPU-animitaj ( uTime ), do la per-kadra gxisdatigo nur skribas la
// tempon kaj movas la skatolon kun la fotilo ( gxisdatigiVeteron en scena.ts ).
import * as THREE from "three";

// kreiVeterajnPartiklojn — La tri sistemoj, ĉiuj aldoniĝintaj al la sceno kaj
// kaŝitaj; aplikiVeteron montras nur la aktivan.
//     @param sceno ( THREE.Scene ) - La sceno, al kiu la sistemoj aldoniĝas.
//     @returns ( { pluvo, nego, hajlo } ) - La tri partiklo-sistemoj.
export function kreiVeterajnPartiklojn(sceno: THREE.Scene): {
  pluvo: THREE.Points;
  nego: THREE.Points;
  hajlo: THREE.Points;
} {
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

  return { pluvo, nego, hajlo };
}
