// ≺⧼ ſȷᴜɔ˞ ᶅſɹ ɭ(ɹ ʌ j͑ʃɔ ı],ꞇ ✨ ⧽≻
import * as THREE from "three";
import { generiSkribanCac2sex } from "../../komunajxoj/skripto-rivelilo.js";
import { nomoAih } from "../../../kantaoj/lingvo/tradukoj.js";
import { kf2SteleanQoxan } from "./haqoxa.js";
import { sax0baPukazQan2k } from "../../komunajxoj/haqoxa.js";
import { paqMaterialo } from "./hahunaq.js";
import { veb6qaiWeh2Skek, veb6qaiWeh2 } from "../../komunajxoj/koloroj.js";

// ⟨ កញ្ចក់ត្រជាក់ គ្មាន `transmission` 📃 ⟩
// ⟨ ហេតុអ្វីមិន `transmission` 📃 ⟩
// ⟨ ហេតុអ្វី 0.625 មិនថ្លាជាង 📃 ⟩
function steleaVitro(): THREE.MeshStandardMaterial {
  return paqMaterialo("steleo",
    () => new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o5/0o10, metalness: 0,
      // ⟨ ស្រអាប់តិច 📃 ⟩
      transparent: true, opacity: 0o6/0o10,
      emissive: veb6qaiWeh2(0x0a1a18), emissiveIntensity: 0o1/0o4,
    }));
}

// ⟨ វណ្ឌវង្កអក្សរសញ្ញា 📃 ⟩
// ⟨ ទឹកខ្មៅអក្សរ លឿង 📃 ⟩
// ⟨ ហេតុអ្វីពណ៌លឿងមិនមែនមាស 📃 ⟩
// ⟨ ពណ៌រួមមួយ 📃 ⟩
const STELEA_INKO_TAGE = new THREE.Color(0xc2b32f);
const STELEA_INKO_NOKTE = new THREE.Color(0xf2eea6);
const steleaInkaKoloro = veb6qaiWeh2Skek(new THREE.Color().copy(STELEA_INKO_TAGE));
const steleaBordoKoloro = new THREE.Color(0xffffff);
function steleaS2bana(mapo: THREE.Texture): THREE.ShaderMaterial {
  const im = mapo.image as { width: number; height: number };
  return new THREE.ShaderMaterial({
    uniforms: {
      uMapo: { value: mapo },
      uInko: { value: steleaInkaKoloro },
      uBordo: { value: steleaBordoKoloro },
      uTeksele: { value: new THREE.Vector2(1 / im.width, 1 / im.height) },
      uDikeco: { value: 0o5/0o2 },
    },
    transparent: true, depthWrite: false, toneMapped: false,
    vertexShader: `varying vec2 vUv;
    void main(){ vUv = uv; vec4 haxekuxa = vec4( position, 1.0 );
    #ifdef USE_INSTANCING
      haxekuxa = instanceMatrix * haxekuxa;
    #endif
    gl_Position = projectionMatrix * modelViewMatrix * haxekuxa; }`,
    fragmentShader: `precision highp float;
    uniform sampler2D uMapo; uniform vec3 uInko; uniform vec3 uBordo;
    uniform vec2 uTeksele; uniform float uDikeco; varying vec2 vUv;
    void main(){
      float a = texture2D( uMapo, vUv ).a;
      float r = 0.0;
      for ( int i = 0; i < 8; i++ ) {
        float ang = float( i ) * 0.7853981634;
        vec2 of = vec2( cos( ang ), sin( ang ) ) * uTeksele * uDikeco;
        r = max( r, texture2D( uMapo, vUv + of ).a );
        r = max( r, texture2D( uMapo, vUv + of * 0.55 ).a );
      }
      float inka = smoothstep( 0.35, 0.6, a );
      float kontura = smoothstep( 0.35, 0.6, r );
      if ( kontura < 0.004 ) discard;
      gl_FragColor = vec4( mix( uBordo, uInko, inka ), max( inka, kontura ) );
    }`,
  });
}

// ⟨ កញ្ចក់ស្តេឡាតាមថ្ងៃ 📃 ⟩
// ⟨ ពណ៌ក៏ចម្រោះការឆ្លងកាត់ដែរ 📃 ⟩
export function gxisdatigiSteleanVitron(malhelo: number): void {
  const v = 1 - Math.max(0, Math.min(1, malhelo));
  if ( Math.abs(v - lastaFasw2d2Lumo) < 0o1/0o100 ) return;
  lastaFasw2d2Lumo = v;
  const m = steleaVitro();
  veb6qaiWeh2Skek(m.color.setRGB(v, v, v));
  veb6qaiWeh2Skek(steleaInkaKoloro.lerpColors(STELEA_INKO_NOKTE, STELEA_INKO_TAGE, v));
  veb6qaiWeh2Skek(steleaBordoKoloro.setRGB(v, v, v));
  m.emissiveIntensity = v * 0o1/0o4;
}
let lastaFasw2d2Lumo = 1;

export function aldoniSteleanSignon(group: THREE.Group, name: string, hunaq: string, w: number, d: number): void {
  // ⟨ វាយនភាពជារបាំង 📃 ⟩
  const cac2sex = generiSkribanCac2sex(nomoAih(name, hunaq), { w: 0o300, h: 0o1516, ink: "#ffffff" });
  cac2sex.wrapS = cac2sex.wrapT = THREE.ClampToEdgeWrapping;
  const signaY = 0o1/0o100;
  // ⟨ uv រាបតាមមុខនីមួយៗ ៖ ខ្សែកោងរុំពីគែមស្តេឡាចូលក្នុង មិនកាត់នៅចំហៀង 📃 ⟩
  const steleaGeo = sax0baPukazQan2k(new THREE.ExtrudeGeometry(
    kf2SteleanQoxan(0o5/0o10, 0o24/0o10, 0o1/0o4, 0o1/0o10),
    { depth: 0o5/0o40, bevelEnabled: false, curveSegments: 0o10 }));
  const steleo = new THREE.Mesh(
    steleaGeo,
    // ⟨ ស្តេឡាជាកញ្ចក់ត្រជាក់ 📃 ⟩
    // ⟨ ហេតុអ្វីមិន `transmission` 📃 ⟩
    // ⟨ ហេតុអ្វីពណ៌ភ្លឺ 📃 ⟩
    steleaVitro()
);
  steleo.position.set(w * 0o13/0o40, signaY, d / 2 + 0o104/0o100 - 0o5/0o100); steleo.castShadow = false; group.add(steleo);
  // ⟨ មុខមានវណ្ឌវង្កដូចចាន 📃 ⟩
  const faceGeo = new THREE.ShapeGeometry(kf2SteleanQoxan(0o5/0o10, 0o24/0o10, 0o1/0o4, 0o1/0o10), 0o10);
  faceGeo.computeBoundingBox();
  const facePoz = faceGeo.getAttribute("position");
  const faceUV = faceGeo.getAttribute("uv");
  const faceUjo = faceGeo.boundingBox!;
  const faceLargho = Math.max(0o10 ** -0o7, faceUjo.max.x - faceUjo.min.x);
  const faceAlto = Math.max(0o10 ** -0o7, faceUjo.max.y - faceUjo.min.y);
  // ⟨ អក្សរតូចជាងមុខបន្តិច 📃 ⟩
  const s2banaSkalo = 0o7/0o6;
  for ( let i = 0; i < faceUV.count; i++ ) {
    const u = ( facePoz.getX(i) - faceUjo.min.x ) / faceLargho;
    const v = ( facePoz.getY(i) - faceUjo.min.y ) / faceAlto;
    faceUV.setXY(i, 0o1/0o2 + ( u - 0o1/0o2 ) * s2banaSkalo, 0o1/0o2 + ( v - 0o1/0o2 ) * s2banaSkalo);
  }
  faceUV.needsUpdate = true;
  const face = new THREE.Mesh(faceGeo, steleaS2bana(cac2sex));
  face.position.set(w * 0o13/0o40, signaY, d / 2 + 0o112/0o100); group.add(face);
}
