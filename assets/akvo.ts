// Akva modulo — riveroj kun animaciaj ondoj kaj spegulaj reflektoj
import * as THREE from "three";
import { glataPaso } from "../src/tereno.js";

export type RiverData = { mesh: THREE.Mesh; waterSurfaceY: (x: number, z: number) => number };

// konstruiRiveron — Konstruu riveron kun ribona geometrio kaj animacia akva materialo.
//     @param akvoY ( funkcio ) - Akvosurfaca nivelo ( eble krampita al la lago ĉe la buŝo ).
//     @param xEnd ( number ) - La rivera buŝo. kie la ribono eniras la lagon.
//     @param altecoFn ( funkcio ) - Tereno, por realaj profundoj ( kolorigo laŭ la fundo ).
export function konstruiRiveron( sceno: THREE.Scene,
  riverFn: (x: number) => number,
  akvoY: (x: number) => number,
  duonaLargho: number,
  xStart: number,
  xEnd: number,
  steps: number,
  altecoFn: (x: number, z: number) => number
): RiverData {
  const pts: THREE.Vector3[] = [];
  for ( let i = 0; i <= steps; i++ ) {
    const x = xStart + (xEnd - xStart) * i / steps;
    pts.push(new THREE.Vector3(x, akvoY(x) + 0o1/0o20, riverFn(x)));
  }
  // La buŝo-mallarĝiĝo — la ribono maldikiĝas glate al punkto ĉe la lagbordo
  // ( xEnd ), por ke neniu parto de la rivero transiru la lagrandon aŭ lasu
  // truon. Plena larĝo okcidente de la buŝo; nulo ĝuste cxe la buŝo. La sama
  // 0o40-unua fenestro kiel la terena delto ( tereno.ts ), por ke la ribono
  // restu pli larĝa ol la malseka kanalo la tutan vojon ĝis la bordo.
  const buŝaMallarĝiĝo = (x: number) => glataPaso( xEnd, xEnd + 0o40, x );
  const larghoFn = (i: number) => buŝaMallarĝiĝo( pts[i].x );

  const { geometry } = konstruiRubandon(pts, duonaLargho, 0, larghoFn);
  const materialo = kreiOndanAkvanMaterialon();
  const mesh = new THREE.Mesh(geometry, materialo);
  mesh.renderOrder = 0;
  sceno.add(mesh);

  // Realaj profundoj ( vUv.y ) por la tuta ribono — malprofundaj bordoj helaj,
  // profunda kanalo malhela.
  const pos = geometry.getAttribute( "position" ) as THREE.BufferAttribute;
  const uv = geometry.getAttribute( "uv" ) as THREE.BufferAttribute;
  for ( let v = 0; v < pos.count; v++ ) {
    uv.setY( v, Math.max( 0, akvoY( pos.getX( v ) ) - altecoFn( pos.getX( v ), pos.getZ( v ) ) ) );
  }
  uv.needsUpdate = true;

  return { mesh, waterSurfaceY: (x: number, z: number) => akvoY(x) };
}

// konstruiLagon — Konstruu lagon. organika akvosurfaco ( la rando sekvas la
// donitan radiusan funkcion ). La lago sidas cxe la fino de la rivero ( la
// rivero enfluas gxin ); la akva nivelo estas egala al la rivera cxe la enfluo,
// por ke ne estu videbla paso.
//     @param sceno ( THREE.Scene ) - La sceno.
//     @param cx, cz ( number ) - Lagcentro.
//     @param radio ( funkcio ) - Radia funkcio ( angulo → radiuso ) por la rando.
//     @param akvoNivelo ( number ) - Monda Y de la akvosurfaco.
//     @returns lago ( RiverData ) - Samforma kiel la rivero, por animacio.
export function konstruiLagon( sceno: THREE.Scene,
  cx: number, cz: number, radio: ( ang: number ) => number, akvoNivelo: number,
  altecoFn: ( x: number, z: number ) => number
): RiverData {
  // La akva disko — ventumila ringa reto de la centro al la rando. La rando
  // sekvas la radiusan funkcion ( la ondigita lagbordo ). uv.y tenas la REALAN
  // profundon ( akvonivelo − tereno ), por ke la materialo koloriĝu laŭ la fundo
  // anstataŭ laŭ falsa radia gradiento.
  const segmentoj = 0o60, ringoj = 0o10;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let j = 0; j <= ringoj; j++ ) {
    const f = j / ringoj;                    // 0 centro, 1 rando
    for ( let i = 0; i <= segmentoj; i++ ) {
      const ang = i / segmentoj * Math.PI * 2;
      const r = j === 0 ? 0 : radio( ang ) * f;
      const x = cx + Math.cos( ang ) * r;
      const z = cz + Math.sin( ang ) * r;
      pozicioj.push( x, akvoNivelo + 0o1/0o20, z );
      uvoj.push( 0o1/0o2 + 0o1/0o2 * f, Math.max( 0, akvoNivelo - altecoFn( x, z ) ) );
    }
  }
  for ( let j = 0; j < ringoj; j++ ) {
    for ( let i = 0; i < segmentoj; i++ ) {
      const a = j * ( segmentoj + 1 ) + i, b = a + 1;
      const c = a + segmentoj + 1, d = c + 1;
      indeksoj.push( a, b, d, a, d, c );
    }
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute( "position", new THREE.Float32BufferAttribute( pozicioj, 3 ) );
  geometrio.setAttribute( "uv", new THREE.Float32BufferAttribute( uvoj, 2 ) );
  geometrio.setIndex( indeksoj );
  geometrio.computeVertexNormals();
  const materialo = kreiOndanAkvanMaterialon();
  const mesh = new THREE.Mesh( geometrio, materialo );
  mesh.renderOrder = 0;
  sceno.add( mesh );

  return { mesh, waterSurfaceY: (x: number, z: number) => akvoNivelo };
}

// konstruiRubandon — Kreu 3D rubando el punktoj kun largho kaj alta lifto.
//     @param larghoFn ( funkcio ) - Laŭpunkta larĝa multiplikilo ( por buŝo- 
//     mallarĝiĝoj ); defaŭlte konstanta plena larĝo.
export function konstruiRubandon( points: THREE.Vector3[],
  duonaLargho: number,
  yLift: number,
  larghoFn?: ( i: number, N: number ) => number
): { geometry: THREE.BufferGeometry; samples: THREE.Vector3[] } {
  const N = points.length;
  const posArr = new Float32Array(N * 2 * 3);
  const uvArr = new Float32Array(N * 2 * 2);
  const indico: number[] = [];
  const up = new THREE.Vector3(0, 1, 0);
  const samples: THREE.Vector3[] = [];

  for ( let i = 0; i < N; i++ ) {
    const p = points[i];
    const pn = points[Math.min(i + 1, N - 1)];
    const pp = points[Math.max(i - 1, 0)];
    const tan = new THREE.Vector3(pn.x - pp.x, 0, pn.z - pp.z).normalize();
    const side = new THREE.Vector3().crossVectors(up, tan).normalize();
    const y = p.y + yLift;
    const w = duonaLargho * ( larghoFn ? larghoFn( i, N ) : 1 );

    posArr.set([
      p.x - side.x * w, y, p.z - side.z * w,
      p.x + side.x * w, y, p.z + side.z * w,
    ], i * 6);
    uvArr.set([ 0, i / (N - 1), 1, i / (N - 1) ], i * 4);

    if ( i < N - 1 ) {
      const a = i * 2;
      indico.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    if (i % 4 === 0) samples.push(p.clone());
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uvArr, 2));
  g.setIndex(indico);
  g.computeVertexNormals();
  return { geometry: g, samples };
}

function kreiOndanAkvanMaterialon(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uColorDeep: { value: new THREE.Color(0x083838) },
      uColorShallow: { value: new THREE.Color(0x286858) },
      uColorRipple: { value: new THREE.Color(0x387868) },
      uSunDir: { value: new THREE.Vector3(0o4/0o10, 0o63/0o100, 0o23/0o100).normalize() },
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vHeight;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;

        // Pluraj ondaj tavoloj por riĉa, natura movado. Ĉiuj konstantoj estas
        // duumaj frakcioj ( 0.140625 = 9/64, 0.1875 = 3/16 … ) — GLSL ne
        // subtenas 0o-notacion, do ili aperas kiel ekzaktaj potencoj-de-2.
        float wave1 = sin(worldPos.x * 0.140625 + worldPos.z * 0.09375 + uTime * 0.703125) * 0.1875;
        float wave2 = sin(worldPos.x * 0.078125 - worldPos.z * 0.125 + uTime * 1.09375 + 1.3125) * 0.140625;
        float wave3 = sin((worldPos.x + worldPos.z) * 0.046875 + uTime * 0.5 + 2.125) * 0.078125;
        float wave4 = sin(worldPos.x * 0.1875 + worldPos.z * 0.0625 + uTime * 0.90625 + 0.703125) * 0.0625;
        float wave5 = cos((worldPos.x - worldPos.z) * 0.09375 + uTime * 0.59375 + 3.6875) * 0.046875;
        float displacement = wave1 + wave2 + wave3 + wave4 + wave5;
        vHeight = displacement;

        // Analizaj derivaĵoj de la onda sumo ( ∂/∂x, ∂/∂z ) por korektaj normaloj
        float c1 = cos(worldPos.x * 0.140625 + worldPos.z * 0.09375 + uTime * 0.703125);
        float c2 = cos(worldPos.x * 0.078125 - worldPos.z * 0.125 + uTime * 1.09375 + 1.3125);
        float c3 = cos((worldPos.x + worldPos.z) * 0.046875 + uTime * 0.5 + 2.125);
        float c4 = cos(worldPos.x * 0.1875 + worldPos.z * 0.0625 + uTime * 0.90625 + 0.703125);
        float s5 = sin((worldPos.x - worldPos.z) * 0.09375 + uTime * 0.59375 + 3.6875);
        float dx = 0.1875 * 0.140625 * c1 + 0.140625 * 0.078125 * c2 + 0.078125 * 0.046875 * c3 + 0.0625 * 0.1875 * c4 - 0.046875 * 0.09375 * s5;
        float dz = 0.1875 * 0.09375 * c1 - 0.140625 * 0.125 * c2 + 0.078125 * 0.046875 * c3 + 0.0625 * 0.0625 * c4 + 0.046875 * 0.09375 * s5;
        vNormal = normalize(normal + vec3(-dx, 0.625, -dz));

        vec3 displacedPos = position + normal * displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColorDeep;
      uniform vec3 uColorShallow;
      uniform vec3 uColorRipple;
      uniform vec3 uSunDir;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying float vHeight;
      varying vec3 vNormal;

      void main() {
        // Profundo ( mondaj unuoj ) — enpakita en uv.y dum la konstruado.
        float profundo = max(0.0, vUv.y);

        // Beer–Lambert-sorbado — la lumo estingiĝas eksponente kun la
        // profundo, kaj la ruĝa sorbatas plej rapide, la blua plej malrapide
        // ( realisma profundiĝo. muta te-verdo ĉe la bordo → malhela blu-verdo
        // en la kanalo, anstataŭ hela turkiso ).
        vec3 sorbado = 1.0 - exp(-profundo * vec3(0.3125, 0.1875, 0.125));   // 5/32, 3/16, 1/8
        vec3 baseColor = mix(uColorShallow, uColorDeep, sorbado);

        // Subtila kolorvariado de ondoj
        float wavePattern = 0.5 + 0.5 * sin(vWorldPos.x * 0.1875 + vWorldPos.z * 0.15625 + uTime * 0.5);
        baseColor = mix(baseColor, uColorRipple, wavePattern * 0.078125);

        // Sunluma spegula brilo
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        vec3 normal = normalize(vNormal);
        vec3 halfVec = normalize(viewDir + uSunDir);

        // Fresnel — reflekto kreskas ĉe malaltaj anguloj ( la sama 4-a potenco
        // kiel la ĉiela materialo, por kongrua brilo ). Ĝi opakigas la
        // surfacon kaj fortigas la sunan brilon ĉe la horizonto.
        float ndv = max(dot(viewDir, normal), 0.0);
        float fresnel = pow(1.0 - ndv, 4.0);

        float spec = pow(max(dot(normal, halfVec), 0.0), 48.0) * 0.4375 * (0.5 + 0.5 * fresnel);
        float specWide = pow(max(dot(normal, halfVec), 0.0), 12.0) * 0.25;

        // Subtila ondbrilo
        float shimmer = 0.5 + 0.5 * sin(vWorldPos.x * 0.3125 + vWorldPos.z * 0.25 + uTime * 2.0);
        shimmer *= 0.5 + 0.5 * sin(vWorldPos.x * 0.1875 - vWorldPos.z * 0.3125 + uTime * 1.5);

        vec3 specColor = vec3(0.90625, 0.9375, 0.96875) * (spec + specWide);
        vec3 fresnelColor = mix(vec3(0.3125, 0.40625, 0.5), vec3(0.5625, 0.6875, 0.8125), fresnel * 0.5);

        vec3 finalColor = baseColor + specColor + fresnelColor * 0.75;

        // Onda alteco donas malgrandan brilecon al la ondoj
        finalColor *= 1.0 + vHeight * 0.09375;

        // Travidebleco — la transiro al travidebla. La alpha sekvas la saman
        // Beer–Lambert-kurbon kiel la koloro. ĉe profundo 0 la akvo estas
        // preskaŭ travidebla ( la fundo kaj la river-buŝa delto videblas ), kaj
        // glate iĝas opaka kun la profundo. La malgranda bazo lasas la malhelan
        // riverfundon montriĝi tra la malprofunda akvo, kaj la Fresnel-opakeco
        // reflektas la ĉielon ĉe malaltaj anguloj.
        float alpha = 0.09375 + 0.90625 * (1.0 - exp(-profundo * 0.25));
        alpha = mix(alpha, 1.0, fresnel * 0.5);
        alpha = min(1.0, alpha + shimmer * 0.03125);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
  });
}

// gxisdatigiAkvon — Gxisdatigu akvajn uniformojn cxiun kadron por animacio.
export function gxisdatigiAkvon(river: RiverData, t: number): void {
  const mat = river.mesh.material as THREE.ShaderMaterial;
  if (mat.uniforms) {
    mat.uniforms.uTime.value = t;
  }
}

// cxuEnAkvo — Kontrolu cxu punkto estas en la rivero (sur akva surfaco).
export function cxuEnAkvo(x: number, z: number, riverFn: (x: number) => number, riverHalfWidth: number): boolean {
  const rz = riverFn(x);
  return Math.abs(z - rz) < riverHalfWidth;
}

export function akvaSurfacaY(x: number, z: number, river: RiverData): number {
  return river.waterSurfaceY(x, z);
}
