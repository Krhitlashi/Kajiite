// ≺⧼ Cxielo 🌤 ⧽≻
// La ĉiela kupolo — RawShaderMaterial-gradiento kun la suna brilo. La paletroj
// skribas en ĝiajn uniformojn ( aplikiAtmosferon en scena.ts ).
import * as THREE from "three";

// kreiCxielon — La ĉiela kupolo kaj ĝiaj uniformoj. La kupolo aldoniĝas al la
// sceno; la uniformoj restas viveblaj, ĉar la atmosfera lerpo skribas en ilin
// ĉiukadre ( uTop, uMid, uBot, uSunCol, uSunDir ).
//     @param sceno ( THREE.Scene ) - La sceno, al kiu la kupolo aldoniĝas.
//     @returns ( { cxielo, cxielajUniformoj } ) - La kupolo kaj ĝiaj uniformoj.
export function kreiCxielon(sceno: THREE.Scene): {
  cxielo: THREE.Mesh;
  cxielajUniformoj: Record<string, THREE.IUniform>;
} {
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
  return { cxielo, cxielajUniformoj };
}
