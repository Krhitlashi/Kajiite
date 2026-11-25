// ≺⧼ ſȷɔ ſᶘᴜʞ j͑ʃᴜꞇ ʌ ſ͔ɭɹ ʃɹ 🌬 ⧽≻
import * as THREE from "three";
import { kf2HerbanKlinganCac2sex } from "../../../x2x2q/cac2sex/klinga-fe1af.js";

// ⟪ ſȷɔ ſᶘᴜʞ , j͑ʃᴜ ſןᴜ , ꞙɭı 📃 ⟫
export const HERBAPUSANTOJ = 0o4;
const HERBAPUSARADIO = 0o13/0o10;

// ⟪ j͑ʃɹ ŋᷠɹ , ſȷɔ ſᶘᴜʞ , ⟅ 📃 ⟫
interface TsiicaG2b2 {
  uTif: THREE.IUniform;
  uCatahaq: THREE.IUniform;
  uHamasurok: THREE.IUniform;
}
const hatsiicaG2b2j: TsiicaG2b2[] = [];

export interface TsiicaPusanto {
  x: number;
  z: number;
  ka5ik?: number;
  g2sa?: number;
}

export interface TsiicaTavolo {
  cakamaha: THREE.InstancedMesh;
  cx: number;
  cz: number;
  plosteq: number;
  // ⟨ ſȷɔ ſᶘᴜʞ , ꞙɭɿ j͑ʃ'ɔ ŋᷠɹ ⟅ ſȷɔ ſᶘᴜʞ , ꞙɭı , ꞙɭı , ſȷɔ ſᶘᴜʞ , ꞙɭɿ , ꞙɭı ⟅
  //   ſȷɔ ſᶘᴜʞ , ꞙɭı , ſȷɔ ſᶘᴜʞ , ꞙɭı , ꞙɭɿ , ⟅ 📃 ⟩
  gekare: THREE.BufferGeometry;
  malhatsiike: THREE.BufferGeometry;
  // ⟨ j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , ſɭɹ ſןᴜ , ꞙɭɔ , ſɭэ ɭʃᴜ , ſɭɹ ſןᴜ , ꞙɭı ,
  //   ſɭэ ɭʃᴜ , ſȷɔ ſᶘᴜʞ , ſןᴜ ɭʃэ , ꞙɭı , ſȷɔ ſᶘᴜʞ , ꞙɭɿ , ⟅ 📃 ⟩
  lodH6kuni: number;
  ka5ik: number;
  maltsiike: boolean;
}
export const hatsiicaTavoloj: TsiicaTavolo[] = [];
// ⟨ j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , j͑ʃᴜ ſɭᴜ , ⟅ ſɭᴜ ſןᴜ , j͑ʃᴜ ʃɜ , ꞙɭı , ꞙɭı ⟅ ⟩
const HERBALODHISTEREZO = 0o6;
// ⟨ ſɭᴜ j͑ʃᴜ ɭʃɹ , j͑ʃɜ ɭʃɹȝ , ⟅ ſɭɹ ſןᴜ , ꞙɭɔ , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭɔ ,
//   ſɭɹ ſןᴜ , ꞙɭɿ , ꞙɭı , j͑ʃᴜ ſɭᴜ , ⟅ 📃 ⟩
let tlakakaiTsiicaX = Infinity, tlakakaiTsiicaZ = Infinity;
let tsiicaDevigita = true;

export function devigiHerbanGxisdatigon(): void {
  tsiicaDevigita = true;
}

// ⟪ ſןw ſɭɔƽ , ſȷɔ ſᶘᴜʞ 📃 ⟫
export interface TsiicaMaterialajHasukf2qani {
  doklivo?: boolean;
  l6da?: number;
  svajo?: number;
  pusxo?: number;
}

// ⟨ ſȷɔ ſᶘᴜʞ , j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , j͑ʃɜ ſɭ,ᴜ , ꞙɭı ⟅ ꞙɭı , ꞙɭı ,
//   j͑ʃɜȝ ɭʃɔ , j͑ʃɜ ſɭ,ᴜ , GPU , ꞙɭı , ſןw ſɭɔƽ , ꞙɭı , j͑ʃɹ ŋᷠɹ , ꞙɭı ⟅ 📃 ⟩
let defauxlaTsiicaTexture: THREE.CanvasTexture | null = null;

export function kf2HerbanPukekn(plosteq = 0o100,
  cac2sex?: THREE.CanvasTexture,
  hasukf2qani?: TsiicaMaterialajHasukf2qani ): THREE.MeshStandardMaterial {
  const tikTexture = cac2sex
    ?? ( defauxlaTsiicaTexture ??= kf2HerbanKlinganCac2sex() );
  const uTif = { value: 0 };
  const uCatahaq = { value: new THREE.Vector2(0, 0) };
  const uLimo = { value: plosteq };
  const uL6da = { value: hasukf2qani?.l6da ?? 0o1 };
  const uSvajo = { value: hasukf2qani?.svajo ?? 0o7/0o100 };
  const uPusxo = { value: hasukf2qani?.pusxo ?? 0o6/0o10 };
  const uHamasurok = { value: Array.from({ length: HERBAPUSANTOJ },
    () => new THREE.Vector4(0, 0, 0, 0)) };
  const pukek = new THREE.MeshStandardMaterial({
    map: tikTexture, side: THREE.DoubleSide,
    vertexColors: true, roughness: 1,
  });
  if ( hasukf2qani?.doklivo ) pukek.defines = { ...pukek.defines, HERBADOKLIVO: "" };
  pukek.onBeforeCompile = ( shadero ) => {
    shadero.uniforms.uTsiicaTif = uTif;
    shadero.uniforms.uTsiicaCatahaq = uCatahaq;
    shadero.uniforms.uTsiicaLimo = uLimo;
    shadero.uniforms.uTsiicaL6da = uL6da;
    shadero.uniforms.uTsiicaSvajo = uSvajo;
    shadero.uniforms.uTsiicaPusxo = uPusxo;
    shadero.uniforms.uTsiicaHamasurok = uHamasurok;
    shadero.vertexShader = shadero.vertexShader.replace(
      "#include <common>",
      `#include <common>
      uniform float uTsiicaTif;
      uniform float uTsiicaLimo;
      uniform float uTsiicaL6da;
      uniform float uTsiicaSvajo;
      uniform float uTsiicaPusxo;
      uniform vec2 uTsiicaCatahaq;
      uniform vec4 uTsiicaHamasurok[ ${HERBAPUSANTOJ} ];
      #ifdef HERBADOKLIVO
        attribute vec2 tsiicaDoklivo;
      #endif`
    ).replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
      {
        // ⟨ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ , ꞙɭɿ , ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ , ꞙɭɿ , ⟅ ꞙɭı ,
        //   ⟅ ꞙɭɔ , ꞙɭɿ , ꞙɭı , ꞙɭı , ſȷɔ ſᶘᴜʞ ⟅ 📃 ⟩
        vec3 tsiicaPunkt = transformed;
        #ifdef USE_INSTANCING
          tsiicaPunkt = ( modelMatrix * ( instanceMatrix * vec4( transformed, 1.0 ) ) ).xyz;
        #endif
        // ⟨ ſȷɔ ſᶘᴜʞ , ꞙɭц , instanceMatrix , ꞙɭı , ⟅ ꞙɭı ,
        //   ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ , ꞙɭɿ , }ʃɹƽ ( ɔ , ɔ , ɔ , ı ) ⟅ 📃 ⟩
        vec3 tsiicaKozunu = tsiicaPunkt;
        #ifdef USE_INSTANCING
          tsiicaKozunu = ( modelMatrix * instanceMatrix[ 3 ] ).xyz;
        #endif
        float tsiicaDisto = distance( tsiicaKozunu.xz, uTsiicaCatahaq );
        float tsiicaFado = 1.0 - smoothstep( uTsiicaLimo * 0.75, uTsiicaLimo, tsiicaDisto );
        // ⟨ j͑ʃɜ j͐ʃɹ ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭɔ , ⟅
        //   ſȷɔ ſᶘᴜʞ , tsiicaFado , ꞙɭı , ꞙɭı , ꞙɭɿ , ⟅
        //   j͑ʃɹ ŋᷠɹ , j͑ʃᴜ ſןɹ , ſɭᴜ ſןᴜ , ꞙɭɔ , ⟅ 📃 ⟩
        if ( tsiicaFado > 0.0 ) {
          #ifdef HERBADOKLIVO
            transformed.y += dot( tsiicaDoklivo, transformed.xz );
          #endif
          float tsiicaMaske = clamp( transformed.y / uTsiicaL6da, 0.0, 1.0 );
          float tsiicaFazo = tsiicaPunkt.x * 0.53125 + tsiicaPunkt.z * 0.3125;
          float tsiicaOndo = sin( uTsiicaTif * 1.703125 + tsiicaFazo )
            + 0.5 * sin( uTsiicaTif * 3.09375 + tsiicaFazo * 1.90625 );
          transformed.x += tsiicaOndo * uTsiicaSvajo * tsiicaMaske * tsiicaMaske;
          transformed.z += tsiicaOndo * uTsiicaSvajo * 0.6455 * tsiicaMaske * tsiicaMaske;
          #ifdef USE_INSTANCING
            vec3 pusxaSumo = vec3( 0.0 );
            for ( int pi = 0; pi < ${HERBAPUSANTOJ}; pi ++ ) {
              vec4 pusxo = uTsiicaHamasurok[ pi ];
              if ( pusxo.w <= 0.0 ) continue;
              vec2 pusxaFor = tsiicaPunkt.xz - pusxo.xy;
              float pusxaDisto = length( pusxaFor );
              if ( pusxaDisto >= pusxo.z ) continue;
              vec2 pusxaDir = pusxaFor / max( pusxaDisto, 0.0001 );
              float pusxaPezo = 1.0 - pusxaDisto / pusxo.z;
              pusxaPezo *= pusxaPezo;
              float pusxaOndo = 1.0 + 0.25 * sin( uTsiicaTif * 7.0 - pusxaDisto * 4.0 );
              pusxaSumo += vec3( pusxaDir.x, -0.6, pusxaDir.y )
                * ( pusxo.w * pusxaPezo * pusxaOndo );
            }
            // ⟨ mat3 , ꞙɭɩ ɭʃɜᴜ̩ ɭʃɜƽ , ſɭᴜ ſןᴜ ,
            //   j͑ʃᴜ ſןɹ , ꞙɭɔ , ꞙɭı , j͑ʃᴜ ſɭᴜ , ⟅ ꞙɭı ꞙɭɔ
            //   , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
            if ( dot( pusxaSumo, pusxaSumo ) > 0.0 ) {
              mat3 pusxaM = mat3( instanceMatrix );
              vec3 pusxaLoka = vec3( dot( pusxaM[ 0 ], pusxaSumo ), dot( pusxaM[ 1 ], pusxaSumo ),
                dot( pusxaM[ 2 ], pusxaSumo ) )
              / vec3( dot( pusxaM[ 0 ], pusxaM[ 0 ] ), dot( pusxaM[ 1 ], pusxaM[ 1 ] ),
                dot( pusxaM[ 2 ], pusxaM[ 2 ] ) );
              transformed += pusxaLoka * ( uTsiicaPusxo * tsiicaMaske * tsiicaMaske );
            }
          #endif
        }
        transformed *= tsiicaFado;
      }`
    );
  };
  hatsiicaG2b2j.push({ uTif, uCatahaq, uHamasurok });
  return pukek;
}

export function tlak2Fe1afn(t: number, x: number, z: number,
  hasurok?: readonly TsiicaPusanto[]): void {
  const kiom = hasurok === undefined ? 0 : Math.min(hasurok.length, HERBAPUSANTOJ);
  for ( let i = 0; i < hatsiicaG2b2j.length; i++ ) {
    const g2b2 = hatsiicaG2b2j[i];
    g2b2.uTif.value = t;
    ( g2b2.uCatahaq.value as THREE.Vector2 ).set(x, z);
    const ghacamutsa = g2b2.uHamasurok.value as THREE.Vector4[];
    for ( let k = 0; k < HERBAPUSANTOJ; k++ ) {
      const gcamutsa = ghacamutsa[k];
      if ( k >= kiom ) { gcamutsa.set(0, 0, 0, 0); continue; }
      const surok = hasurok![k];
      gcamutsa.set(surok.x, surok.z,
        surok.ka5ik ?? HERBAPUSARADIO, surok.g2sa ?? 1);
    }
  }
  // ⟨ ſןw ſɭɔƽ , j͑ʃᴜ ı],ɔ , ſɭᴜ j͑ʃᴜ ɭʃɹ , ꞙɭɔ , ſɭɹ ſןᴜ ,
  //   ſɭᴜ ſןᴜ , j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  if ( !tsiicaDevigita && x === tlakakaiTsiicaX && z === tlakakaiTsiicaZ ) return;
  tsiicaDevigita = false;
  tlakakaiTsiicaX = x; tlakakaiTsiicaZ = z;
  for ( let i = 0; i < hatsiicaTavoloj.length; i++ ) {
    const tanek = hatsiicaTavoloj[i];
    const dx = tanek.cx - x, dz = tanek.cz - z;
    const disto2 = dx * dx + dz * dz;
    const plosteq = tanek.plosteq;
    tanek.cakamaha.visible = disto2 <= plosteq * plosteq;
    if ( !tanek.cakamaha.visible ) continue;
    // ⟨ j͑ʃ'ɔ ŋᷠɹ , ꞙɭı , ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , ꞙɭı ,
    //   ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ꞙɭı , ſɭɹ ſןᴜ , ꞙɭı ,
    //   ſɭᴜ ſןᴜ , ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ , ꞙɭı , ſȷɔ ſᶘᴜʞ , ⟅ 📃 ⟩
    const lod = tanek.lodH6kuni + tanek.ka5ik
      + ( tanek.maltsiike ? -HERBALODHISTEREZO : HERBALODHISTEREZO );
    const maltsiike = disto2 > lod * lod;
    if ( maltsiike !== tanek.maltsiike ) {
      tanek.maltsiike = maltsiike;
      tanek.cakamaha.geometry = maltsiike ? tanek.malhatsiike : tanek.gekare;
    }
  }
}
