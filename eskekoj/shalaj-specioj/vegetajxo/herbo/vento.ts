// ≺⧼ ខ្យល់លើស្មៅ 🌬 ⧽≻
import * as THREE from "three";
import { kreiHerbanKlinganTeksajxon } from "../../../komunajxoj/teksajxoj/klinga-herbo.js";

// ⟪ អ្នកដើរលើវាលស្មៅ 📃 ⟫
// ⟨ តារាងថេរ 📃 ⟩
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
}
export const herbajTavoloj: HerbaTavolo[] = [];

export function kreiHerbanMaterialon(limo = 0o100,
  teksajxo: THREE.CanvasTexture = kreiHerbanKlinganTeksajxon()): THREE.MeshStandardMaterial {
  const uTempo = { value: 0 };
  const uFotilo = { value: new THREE.Vector2(0, 0) };
  const uLimo = { value: limo };
  const uPusantoj = { value: Array.from({ length: HERBA_PUSANTOJ },
    () => new THREE.Vector4(0, 0, 0, 0)) };
  const materialo = new THREE.MeshStandardMaterial({
    map: teksajxo, side: THREE.DoubleSide,
    vertexColors: true, roughness: 1,
  });
  materialo.onBeforeCompile = ( shadero ) => {
    shadero.uniforms.uHerbaTempo = uTempo;
    shadero.uniforms.uHerbaFotilo = uFotilo;
    shadero.uniforms.uHerbaLimo = uLimo;
    shadero.uniforms.uHerbaPusantoj = uPusantoj;
    shadero.vertexShader = shadero.vertexShader.replace(
      "#include <common>",
      `#include <common>
      uniform float uHerbaTempo;
      uniform float uHerbaLimo;
      uniform vec2 uHerbaFotilo;
      uniform vec4 uHerbaPusantoj[ ${HERBA_PUSANTOJ} ];`
    ).replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
      {
        vec3 herbaMondo = transformed;
        #ifdef USE_INSTANCING
        herbaMondo = ( instanceMatrix * vec4( transformed, 1.0 ) ).xyz;
        #endif
        float herbaDisto = distance( herbaMondo.xz, uHerbaFotilo );
        float herbaFado = 1.0 - smoothstep( uHerbaLimo * 0.75, uHerbaLimo, herbaDisto );
        float herbaMaske = clamp( transformed.y, 0.0, 1.0 );
        float herbaFazo = herbaMondo.x * 0.53125 + herbaMondo.z * 0.3125;
        float herbaOndo = sin( uHerbaTempo * 1.703125 + herbaFazo )
          + 0.5 * sin( uHerbaTempo * 3.09375 + herbaFazo * 1.90625 );
        transformed.x += herbaOndo * 0.109375 * herbaMaske * herbaMaske;
        transformed.z += herbaOndo * 0.0703125 * herbaMaske * herbaMaske;
        // ⟨ អ្នកដើរ 📃 ⟩
        // ⟨ ហេតុអ្វីដូច្នេះ 📃 ⟩
        #ifdef USE_INSTANCING
        vec3 pusxaSumo = vec3( 0.0 );
        for ( int pi = 0; pi < ${HERBA_PUSANTOJ}; pi ++ ) {
          vec4 pusxo = uHerbaPusantoj[ pi ];
          if ( pusxo.w <= 0.0 ) continue;
          vec2 pusxaFor = herbaMondo.xz - pusxo.xy;
          float pusxaDisto = length( pusxaFor );
          if ( pusxaDisto >= pusxo.z ) continue;
          vec2 pusxaDir = pusxaFor / max( pusxaDisto, 0.0001 );
          float pusxaPezo = 1.0 - pusxaDisto / pusxo.z;
          pusxaPezo *= pusxaPezo;
          float pusxaOndo = 1.0 + 0.25 * sin( uHerbaTempo * 7.0 - pusxaDisto * 4.0 );
          pusxaSumo += vec3( pusxaDir.x, -0.6, pusxaDir.y )
            * ( pusxo.w * pusxaPezo * pusxaOndo );
        }
        mat3 pusxaM = mat3( instanceMatrix );
        vec3 pusxaLoka = vec3( dot( pusxaM[ 0 ], pusxaSumo ), dot( pusxaM[ 1 ], pusxaSumo ),
          dot( pusxaM[ 2 ], pusxaSumo ) )
          / vec3( dot( pusxaM[ 0 ], pusxaM[ 0 ] ), dot( pusxaM[ 1 ], pusxaM[ 1 ] ),
          dot( pusxaM[ 2 ], pusxaM[ 2 ] ) );
        // ⟨ ជម្រៅប៉ុន្មាន 📃 ⟩
        transformed += pusxaLoka * ( 0.75 * herbaMaske * herbaMaske );
        #endif
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
    // ⟨ អ្នកដើរ 📃 ⟩
    const glitoj = vento.uPusantoj.value as THREE.Vector4[];
    for ( let k = 0; k < HERBA_PUSANTOJ; k++ ) {
      const glito = glitoj[k];
      if ( k >= kiom ) { glito.set(0, 0, 0, 0); continue; }
      const pusanto = pusantoj![k];
      glito.set(pusanto.x, pusanto.z,
        pusanto.radiuso ?? HERBA_PUSA_RADIO, pusanto.forto ?? 1);
    }
  }
  // ⟨ ដែនមើលក្តារ 📃 ⟩
  for ( let i = 0; i < herbajTavoloj.length; i++ ) {
    const tavolo = herbajTavoloj[i];
    const dx = tavolo.cx - x, dz = tavolo.cz - z;
    const limo = tavolo.limo;
    tavolo.mesho.visible = dx * dx + dz * dz <= limo * limo;
  }
}
