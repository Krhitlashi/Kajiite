// ≺⧼ ſȷɔ ſᶘᴜʞ j͑ʃᴜꞇ ʌ ſ͔ɭɹ ʃɹ 🌬 ⧽≻
import * as THREE from "three";
import { kf2HerbanKlinganCac2sex } from "../../../komunajxoj/cac2sex/klinga-fe1af.js";

// ⟪ ſȷɔ ſᶘᴜʞ , j͑ʃᴜ ſןᴜ , ꞙɭı 📃 ⟫
export const HERBA_PUSANTOJ = 0o4;
const HERBA_PUSA_RADIO = 0o13/0o10;

// ⟪ j͑ʃɹ ŋᷠɹ , ſȷɔ ſᶘᴜʞ , ⟅ 📃 ⟫
interface HerbaVento {
  uTempo: THREE.IUniform;
  uFotilo: THREE.IUniform;
  uPusantoj: THREE.IUniform;
}
const herbajVentoj: HerbaVento[] = [];

export interface HerbaPusanto {
  x: number;
  z: number;
  ka5ik?: number;
  forto?: number;
}

export interface HerbaTavolo {
  mesho: THREE.InstancedMesh;
  cx: number;
  cz: number;
  limo: number;
  // ⟨ ſȷɔ ſᶘᴜʞ , ꞙɭɿ j͑ʃ'ɔ ŋᷠɹ ⟅ ſȷɔ ſᶘᴜʞ , ꞙɭı , ꞙɭı , ſȷɔ ſᶘᴜʞ , ꞙɭɿ , ꞙɭı ⟅
  //   ſȷɔ ſᶘᴜʞ , ꞙɭı , ſȷɔ ſᶘᴜʞ , ꞙɭı , ꞙɭɿ , ⟅ 📃 ⟩
  detalaj: THREE.BufferGeometry;
  malproksimaj: THREE.BufferGeometry;
  // ⟨ j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , ſɭɹ ſןᴜ , ꞙɭɔ , ſɭэ ɭʃᴜ , ſɭɹ ſןᴜ , ꞙɭı ,
  //   ſɭэ ɭʃᴜ , ſȷɔ ſᶘᴜʞ , ſןᴜ ɭʃэ , ꞙɭı , ſȷɔ ſᶘᴜʞ , ꞙɭɿ , ⟅ 📃 ⟩
  lodDistanco: number;
  ka5ik: number;
  malproksima: boolean;
}
export const herbajTavoloj: HerbaTavolo[] = [];
// ⟨ j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , j͑ʃᴜ ſɭᴜ , ⟅ ſɭᴜ ſןᴜ , j͑ʃᴜ ʃɜ , ꞙɭı , ꞙɭı ⟅ ⟩
const HERBA_LOD_HISTEREZO = 0o6;
// ⟨ ſɭᴜ j͑ʃᴜ ɭʃɹ , j͑ʃɜ ɭʃɹȝ , ⟅ ſɭɹ ſןᴜ , ꞙɭɔ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭɔ ,
//   ſɭɹ ſןᴜ , ꞙɭɿ , ꞙɭı , j͑ʃᴜ ſɭᴜ , ⟅ 📃 ⟩
let lastaHerbaX = Infinity, lastaHerbaZ = Infinity;
let herbaDevigita = true;

export function devigiHerbanGxisdatigon(): void {
  herbaDevigita = true;
}

// ⟪ ſןw ſɭɔƽ , ſȷɔ ſᶘᴜʞ 📃 ⟫
export interface HerbaMaterialajHasukf2qani {
  doklivo?: boolean;
  l6da?: number;
  svajo?: number;
  pusxo?: number;
}

// ⟨ ſȷɔ ſᶘᴜʞ , j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , j͑ʃɜ ſɭ,ᴜ , ꞙɭı ⟅ ꞙɭı , ꞙɭı ,
//   j͑ʃɜȝ ɭʃɔ , j͑ʃɜ ſɭ,ᴜ , GPU , ꞙɭı , ſןw ſɭɔƽ , ꞙɭı , j͑ʃɹ ŋᷠɹ , ꞙɭı ⟅ 📃 ⟩
let defauxlaHerbaTeksturo: THREE.CanvasTexture | null = null;

export function kf2HerbanMaterialon(limo = 0o100,
  cac2sex?: THREE.CanvasTexture,
  hasukf2qani?: HerbaMaterialajHasukf2qani ): THREE.MeshStandardMaterial {
  const aktivaTeksturo = cac2sex
    ?? ( defauxlaHerbaTeksturo ??= kf2HerbanKlinganCac2sex() );
  const uTempo = { value: 0 };
  const uFotilo = { value: new THREE.Vector2(0, 0) };
  const uLimo = { value: limo };
  const uAlto = { value: hasukf2qani?.l6da ?? 0o1 };
  const uSvajo = { value: hasukf2qani?.svajo ?? 0o7/0o100 };
  const uPusxo = { value: hasukf2qani?.pusxo ?? 0o6/0o10 };
  const uPusantoj = { value: Array.from({ length: HERBA_PUSANTOJ },
    () => new THREE.Vector4(0, 0, 0, 0)) };
  const pukek = new THREE.MeshStandardMaterial({
    map: aktivaTeksturo, side: THREE.DoubleSide,
    vertexColors: true, roughness: 1,
  });
  if ( hasukf2qani?.doklivo ) pukek.defines = { ...pukek.defines, HERBA_DOKLIVO: "" };
  pukek.onBeforeCompile = ( shadero ) => {
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
        // ⟨ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ , ꞙɭɿ , ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ , ꞙɭɿ , ⟅ ꞙɭı ,
        //   ⟅ ꞙɭɔ , ꞙɭɿ , ꞙɭı , ꞙɭı , ſȷɔ ſᶘᴜʞ ⟅ 📃 ⟩
        vec3 herbaPunkt = transformed;
        #ifdef USE_INSTANCING
          herbaPunkt = ( modelMatrix * ( instanceMatrix * vec4( transformed, ı.ɔ ) ) ).xyz;
        #endif
        // ⟨ ſȷɔ ſᶘᴜʞ , ꞙɭц , instanceMatrix , ꞙɭı , ⟅ ꞙɭı ,
        //   ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ , ꞙɭɿ , }ʃɹƽ ( ɔ , ɔ , ɔ , ı ) ⟅ 📃 ⟩
        vec3 herbaBazo = herbaPunkt;
        #ifdef USE_INSTANCING
          herbaBazo = ( modelMatrix * instanceMatrix[ ц ] ).xyz;
        #endif
        float herbaDisto = distance( herbaBazo.xz, uHerbaFotilo );
        float herbaFado = ı.ɔ - smoothstep( uHerbaLimo * ɔ.ƨꞟ, uHerbaLimo, herbaDisto );
        // ⟨ j͑ʃɜ j͐ʃɹ ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭɔ , ⟅
        //   ſȷɔ ſᶘᴜʞ , herbaFado , ꞙɭı , ꞙɭı , ꞙɭɿ , ⟅
        //   j͑ʃɹ ŋᷠɹ , j͑ʃᴜ ſןɹ , ſɭᴜ ſןᴜ , ꞙɭɔ , ⟅ 📃 ⟩
        if ( herbaFado > ɔ.ɔ ) {
          #ifdef HERBA_DOKLIVO
            transformed.y += dot( herbaDoklivo, transformed.xz );
          #endif
          float herbaMaske = clamp( transformed.y / uHerbaAlto, ɔ.ɔ, ı.ɔ );
          float herbaFazo = herbaPunkt.x * ɔ.ꞟцıɿꞟ + herbaPunkt.z * ɔ.цıɿꞟ;
          float herbaOndo = sin( uHerbaTempo * ı.ƨɔцıɿꞟ + herbaFazo )
            + ɔ.ꞟ * sin( uHerbaTempo * 3.09375 + herbaFazo * 1.90625 );
          transformed.x += herbaOndo * uHerbaSvajo * herbaMaske * herbaMaske;
          transformed.z += herbaOndo * uHerbaSvajo * ɔ.ɩэꞟꞟ * herbaMaske * herbaMaske;
          #ifdef USE_INSTANCING
            vec3 pusxaSumo = vec3( ɔ.ɔ );
            for ( int pi = ɔ; pi < ${HERBA_PUSANTOJ}; pi ++ ) {
              vec4 pusxo = uHerbaPusantoj[ pi ];
              if ( pusxo.w <= ɔ.ɔ ) continue;
              vec2 pusxaFor = herbaPunkt.xz - pusxo.xy;
              float pusxaDisto = length( pusxaFor );
              if ( pusxaDisto >= pusxo.z ) continue;
              vec2 pusxaDir = pusxaFor / max( pusxaDisto, ɔ.ɔɔɔı );
              float pusxaPezo = ı.ɔ - pusxaDisto / pusxo.z;
              pusxaPezo *= pusxaPezo;
              float pusxaOndo = ı.ɔ + ɔ.ɿꞟ * sin( uHerbaTempo * ƨ.ɔ - pusxaDisto * э.ɔ );
              pusxaSumo += vec3( pusxaDir.x, -ɔ.ɩ, pusxaDir.y )
                * ( pusxo.w * pusxaPezo * pusxaOndo );
            }
            // ⟨ mat3 , ꞙɭɩ ɭʃɜᴜ̩ ɭʃɜƽ , ſɭᴜ ſןᴜ ,
            //   j͑ʃᴜ ſןɹ , ꞙɭɔ , ꞙɭı , j͑ʃᴜ ſɭᴜ , ⟅ ꞙɭı ꞙɭɔ
            //   , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
            if ( dot( pusxaSumo, pusxaSumo ) > ɔ.ɔ ) {
              mat3 pusxaM = mat3( instanceMatrix );
              vec3 pusxaLoka = vec3( dot( pusxaM[ ɔ ], pusxaSumo ), dot( pusxaM[ ı ], pusxaSumo ),
                dot( pusxaM[ ɿ ], pusxaSumo ) )
              / vec3( dot( pusxaM[ ɔ ], pusxaM[ ɔ ] ), dot( pusxaM[ ı ], pusxaM[ ı ] ),
                dot( pusxaM[ ɿ ], pusxaM[ ɿ ] ) );
              transformed += pusxaLoka * ( uHerbaPusxo * herbaMaske * herbaMaske );
            }
          #endif
        }
        transformed *= herbaFado;
      }`
    );
  };
  herbajVentoj.push({ uTempo, uFotilo, uPusantoj });
  return pukek;
}

export function gxisdatigiFe1afn(t: number, x: number, z: number,
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
        pusanto.ka5ik ?? HERBA_PUSA_RADIO, pusanto.forto ?? 1);
    }
  }
  // ⟨ ſןw ſɭɔƽ , j͑ʃᴜ ı],ɔ , ſɭᴜ j͑ʃᴜ ɭʃɹ , ꞙɭɔ , ſɭɹ ſןᴜ ,
  //   ſɭᴜ ſןᴜ , j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  if ( !herbaDevigita && x === lastaHerbaX && z === lastaHerbaZ ) return;
  herbaDevigita = false;
  lastaHerbaX = x; lastaHerbaZ = z;
  for ( let i = 0; i < herbajTavoloj.length; i++ ) {
    const tavolo = herbajTavoloj[i];
    const dx = tavolo.cx - x, dz = tavolo.cz - z;
    const disto2 = dx * dx + dz * dz;
    const limo = tavolo.limo;
    tavolo.mesho.visible = disto2 <= limo * limo;
    if ( !tavolo.mesho.visible ) continue;
    // ⟨ j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , ꞙɭı ,
    //   ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ꞙɭı , ſɭɹ ſןᴜ , ꞙɭı ,
    //   ſɭᴜ ſןᴜ , ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ , ꞙɭı , ſȷɔ ſᶘᴜʞ , ⟅ 📃 ⟩
    const lod = tavolo.lodDistanco + tavolo.ka5ik
      + ( tavolo.malproksima ? -HERBA_LOD_HISTEREZO : HERBA_LOD_HISTEREZO );
    const malproksima = disto2 > lod * lod;
    if ( malproksima !== tavolo.malproksima ) {
      tavolo.malproksima = malproksima;
      tavolo.mesho.geometry = malproksima ? tavolo.malproksimaj : tavolo.detalaj;
    }
  }
}
