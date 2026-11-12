// ≺⧼ ខ្យល់លើស្មៅ 🌬 ⧽≻
import * as THREE from "three";
import { kreiHerbanKlinganTeksajxon } from "../../../komunajxoj/teksajxoj/klinga-herbo.js";

// ⟪ អ្នកដើរលើវាលស្មៅ 📃 ⟫
export const HERBA_PUSANTOJ = 0o4;
const HERBA_PUSA_RADIO = 0o13/0o10;

// ⟪ ខ្យល់លើស្មៅ 📃 ⟫
interface HerbaVento {
  uTempo: THREE.IUniform;
  uFotilo: THREE.IUniform;
  uPusantoj: THREE.IUniform;
}
const herbajVentoj: HerbaVento[] = [];

export interface HerbaPusanto {
  x: number;
  z: number;
  radiuso?: number;
  forto?: number;
}

export interface HerbaTavolo {
  mesho: THREE.InstancedMesh;
  cx: number;
  cz: number;
  limo: number;
  // ⟨ ស្មៅពីរកម្រិត ៖ ស្មៅជិតលម្អិត , ស្មៅឆ្ងាយស្តើងជាង ។ ស្មៅឆ្ងាយលាក់លើស្មៅ
  // ស្តើង ៖ ដុំស្មៅនៅឆ្ងាយលាយចូលគ្នា , ដូច្នេះការបន្ថយកម្រិតមិនឃើញទេ ។ 📃 ⟩
  detalaj: THREE.BufferGeometry;
  malproksimaj: THREE.BufferGeometry;
  // ⟨ កម្រិតឆ្ងាយវាស់ពីគែមក្រឡាមិនមែនពីចំណុចកណ្តាល ៖ ក្រឡាធំ , ដូច្នេះបើវាស់ពី
  // កណ្តាល ស្មៅក្រោមជើងអ្នកលេងអាចក្លាយជាស្មៅស្តើង ។ 📃 ⟩
  lodDistanco: number;
  radiuso: number;
  malproksima: boolean;
}
export const herbajTavoloj: HerbaTavolo[] = [];
// ⟨ កាមេរ៉ាឈរស្ងៀមពេលងាកមើល ។ បញ្ជីក្រឡាមិនប្រែ ដូច្នេះរំលងរង្វិលជុំធំ ។ 📃 ⟩
let lastaHerbaX = Infinity, lastaHerbaZ = Infinity;

// ⟪ ជម្រើសសម្ភារៈស្មៅ 📃 ⟫
export interface HerbaMaterialajOpcioj {
  doklivo?: boolean;
  alto?: number;
  svajo?: number;
  pusxo?: number;
}

export function kreiHerbanMaterialon(limo = 0o100,
  teksajxo: THREE.CanvasTexture = kreiHerbanKlinganTeksajxon(),
  opcioj?: HerbaMaterialajOpcioj ): THREE.MeshStandardMaterial {
  const uTempo = { value: 0 };
  const uFotilo = { value: new THREE.Vector2(0, 0) };
  const uLimo = { value: limo };
  const uAlto = { value: opcioj?.alto ?? 0o1 };
  const uSvajo = { value: opcioj?.svajo ?? 0o7/0o100 };
  const uPusxo = { value: opcioj?.pusxo ?? 0o6/0o10 };
  const uPusantoj = { value: Array.from({ length: HERBA_PUSANTOJ },
    () => new THREE.Vector4(0, 0, 0, 0)) };
  const materialo = new THREE.MeshStandardMaterial({
    map: teksajxo, side: THREE.DoubleSide,
    vertexColors: true, roughness: 1,
  });
  if ( opcioj?.doklivo ) materialo.defines = { ...materialo.defines, HERBA_DOKLIVO: "" };
  materialo.onBeforeCompile = ( shadero ) => {
    shadero.uniforms.uHerbaTempo = uTempo;
    shadero.uniforms.uHerbaFotilo = uFotilo;
    shadero.uniforms.uHerbaLimo = uLimo;
    shadero.uniforms.uHerbaAlto = uAlto;
    shadero.uniforms.uHerbaSvajo = uSvajo;
    shadero.uniforms.uHerbaPusxo = uPusxo;
    shadero.uniforms.uHerbaPusantoj = uPusantoj;
    shadero.vertexShader = shadero.vertexShader.replace(
      "#include <common>",
      `#include <common>
      uniform float uHerbaTempo;
      uniform float uHerbaLimo;
      uniform float uHerbaAlto;
      uniform float uHerbaSvajo;
      uniform float uHerbaPusxo;
      uniform vec2 uHerbaFotilo;
      uniform vec4 uHerbaPusantoj[ ${HERBA_PUSANTOJ} ];
      #ifdef HERBA_DOKLIVO
        attribute vec2 herbaDoklivo;
      #endif`
    ).replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
      {
        // ⟨ គុណមាត្រីពីរដងជាមួយវ៉ិចទ័រ ជំនួសឱ្យគុណមាត្រីមាត្រី ។ លទ្ធផលដូចគ្នា
        //   តែចំនួនគុណតិចជាងពាក់កណ្តាល លើវើតិចរាប់លានរបស់ស្មៅ ។ 📃 ⟩
        vec3 herbaPunkt = transformed;
        #ifdef USE_INSTANCING
          herbaPunkt = ( modelMatrix * ( instanceMatrix * vec4( transformed, 1.0 ) ) ).xyz;
        #endif
        // ⟨ ប្រភពដុំស្មៅគឺជួរឈរទី 0o3 នៃ instanceMatrix រួចហើយ ។ ពីមុន
        //   គុណមាត្រីទាំងពីរដើម្បីបានតែចំណុច ( 0 , 0 , 0 , 1 ) ។ 📃 ⟩
        vec3 herbaBazo = herbaPunkt;
        #ifdef USE_INSTANCING
          herbaBazo = ( modelMatrix * instanceMatrix[ 3 ] ).xyz;
        #endif
        float herbaDisto = distance( herbaBazo.xz, uHerbaFotilo );
        float herbaFado = 1.0 - smoothstep( uHerbaLimo * 0.75, uHerbaLimo, herbaDisto );
        // ⟨ ពេលរសាត់ដល់សូន្យ គ្រប់ការបន្ថែមខាងក្រោមត្រូវគុណនឹងសូន្យវិញ ។
        //   ដុំស្មៅទាំងមូលមាន herbaFado តែមួយ ដូច្នេះសាខាមិនបែកខ្ញែក ។
        //   រំលងខ្យល់ និង អ្នករុញ លើដុំដែលមិនបង្ហាញស្រាប់ ។ 📃 ⟩
        if ( herbaFado > 0.0 ) {
          #ifdef HERBA_DOKLIVO
            transformed.y += dot( herbaDoklivo, transformed.xz );
          #endif
          float herbaMaske = clamp( transformed.y / uHerbaAlto, 0.0, 1.0 );
          float herbaFazo = herbaPunkt.x * 0.53125 + herbaPunkt.z * 0.3125;
          float herbaOndo = sin( uHerbaTempo * 1.703125 + herbaFazo )
            + 0.5 * sin( uHerbaTempo * 3.09375 + herbaFazo * 1.90625 );
          transformed.x += herbaOndo * uHerbaSvajo * herbaMaske * herbaMaske;
          transformed.z += herbaOndo * uHerbaSvajo * 0.6455 * herbaMaske * herbaMaske;
          #ifdef USE_INSTANCING
            vec3 pusxaSumo = vec3( 0.0 );
            for ( int pi = 0; pi < ${HERBA_PUSANTOJ}; pi ++ ) {
              vec4 pusxo = uHerbaPusantoj[ pi ];
              if ( pusxo.w <= 0.0 ) continue;
              vec2 pusxaFor = herbaPunkt.xz - pusxo.xy;
              float pusxaDisto = length( pusxaFor );
              if ( pusxaDisto >= pusxo.z ) continue;
              vec2 pusxaDir = pusxaFor / max( pusxaDisto, 0.0001 );
              float pusxaPezo = 1.0 - pusxaDisto / pusxo.z;
              pusxaPezo *= pusxaPezo;
              float pusxaOndo = 1.0 + 0.25 * sin( uHerbaTempo * 7.0 - pusxaDisto * 4.0 );
              pusxaSumo += vec3( pusxaDir.x, -0.6, pusxaDir.y )
                * ( pusxo.w * pusxaPezo * pusxaOndo );
            }
            // ⟨ ពីមុន mat3 និង ចំណែកប្រាំមួយត្រូវគណនាលើគ្រប់វើតិច
            //   ទោះបីគ្មានអ្នករុញណាមួយនៅជិតក៏ដោយ ។ ពេលផលបូកសូន្យ
            //   លទ្ធផលចែកក៏សូន្យដែរ ដូច្នេះរំលងបាន ។ 📃 ⟩
            if ( dot( pusxaSumo, pusxaSumo ) > 0.0 ) {
              mat3 pusxaM = mat3( instanceMatrix );
              vec3 pusxaLoka = vec3( dot( pusxaM[ 0 ], pusxaSumo ), dot( pusxaM[ 1 ], pusxaSumo ),
                dot( pusxaM[ 2 ], pusxaSumo ) )
              / vec3( dot( pusxaM[ 0 ], pusxaM[ 0 ] ), dot( pusxaM[ 1 ], pusxaM[ 1 ] ),
                dot( pusxaM[ 2 ], pusxaM[ 2 ] ) );
              transformed += pusxaLoka * ( uHerbaPusxo * herbaMaske * herbaMaske );
            }
          #endif
        }
        transformed *= herbaFado;
      }`
    );
  };
  herbajVentoj.push({ uTempo, uFotilo, uPusantoj });
  return materialo;
}

export function gxisdatigiHerbon(t: number, x: number, z: number,
  pusantoj?: readonly HerbaPusanto[]): void {
  const kiom = pusantoj === undefined ? 0 : Math.min(pusantoj.length, HERBA_PUSANTOJ);
  for ( let i = 0; i < herbajVentoj.length; i++ ) {
    const vento = herbajVentoj[i];
    vento.uTempo.value = t;
    ( vento.uFotilo.value as THREE.Vector2 ).set(x, z);
    const glitoj = vento.uPusantoj.value as THREE.Vector4[];
    for ( let k = 0; k < HERBA_PUSANTOJ; k++ ) {
      const glito = glitoj[k];
      if ( k >= kiom ) { glito.set(0, 0, 0, 0); continue; }
      const pusanto = pusantoj![k];
      glito.set(pusanto.x, pusanto.z,
        pusanto.radiuso ?? HERBA_PUSA_RADIO, pusanto.forto ?? 1);
    }
  }
  // ⟨ ពេលវត្ថុធាតុបានធ្វើបច្ចុប្បន្នភាពហើយ កាមេរ៉ាមិនផ្លាស់ គ្រប់ក្រឡា
  //   រក្សាភាពមើលឃើញ និង កម្រិតដដែល ។ លទ្ធផលដូចគ្នាបេះបិទ ។ 📃 ⟩
  if ( x === lastaHerbaX && z === lastaHerbaZ ) return;
  lastaHerbaX = x; lastaHerbaZ = z;
  for ( let i = 0; i < herbajTavoloj.length; i++ ) {
    const tavolo = herbajTavoloj[i];
    const dx = tavolo.cx - x, dz = tavolo.cz - z;
    const disto2 = dx * dx + dz * dz;
    const limo = tavolo.limo;
    tavolo.mesho.visible = disto2 <= limo * limo;
    if ( !tavolo.mesho.visible ) continue;
    // ⟨ ការឆ្លាស់កម្រិត ៖ អ៊ីស្តេរេសីសតូច ដើម្បីកុំឲ្យឆ្លាស់រាល់ស៊ុម ។ 📃 ⟩
    const lod = tavolo.lodDistanco + tavolo.radiuso + ( tavolo.malproksima ? 0o6 : -0o6 );
    const malproksima = disto2 > lod * lod;
    if ( malproksima !== tavolo.malproksima ) {
      tavolo.malproksima = malproksima;
      tavolo.mesho.geometry = malproksima ? tavolo.malproksimaj : tavolo.detalaj;
    }
  }
}
