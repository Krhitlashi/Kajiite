// ≺⧼ ſᶘꞇ ɭl̀ɔ j͑ʃɜ ſ̀ȷᴜ ſɭᴜƽ 📃 ⧽≻
import * as THREE from "three";

// ⟪ ı],ɔ ŋᷠᴜ ʌ ſᶘꞇ ɭl̀ɔ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſ͕ɭɜ ı],ᴜ ⟅ 📃 ⟫
export interface SotlakakKu1o {
  tapu: number;
  cepuTeru: number;
  cepuPsaz: number;
  nar2sa: number;
  havem2: number;
  las: number;
  s2karanu: number;
}

// ⟪ j͑ʃ'ɔ ɭʃɔ ŋᷠɹ ʌ ſ͕ɭɜ ı],ᴜ ʌ ⺓ ʌ ſɭɹ ſȷɔ ⟅ 📃 ⟫
export const SO3AKAKTAJ2: SotlakakKu1o = {
  tapu: 0o3/0o4,
  cepuTeru: 0o2,
  cepuPsaz: 0o5/0o10,
  nar2sa: -0o2,
  havem2: 0o377/0o20,
  las: 0o3/0o31,
  s2karanu: 0o1,
};

// ⟪ ı],ɔ ŋᷠᴜ ʌ ſᶘꞇ ɭl̀ɔ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſᶘꞇ ɭl̀ɔ ⟅ 📃 ⟫
export interface Hufwuk2Tsije {
  weh2: number;
  tlohe: number;
  h6kuni: number;
  so3akak: number;
}

export const HUFWUK2TSIJE: Hufwuk2Tsije = {
  weh2: 0xf89838,
  tlohe: 0o7,
  h6kuni: 0o40,
  so3akak: 0o2,
};

// ⟪ ı],ɔ ŋᷠᴜ ʌ ſᶘꞇ ɭl̀ɔ ſȷэⅎ ʌ ⺓ ʌ ſ͕ɭɜ ı],ᴜ ⟅ 📃 ⟫
export interface SotlakakEsxaq {
  tapu: string;
  cepuTeru: string;
  cepuPsaz: string;
  nar2sa: string;
  vem2: string;
  las: string;
  s2karanu: string;
}

/* ſɭʞɹ ʌ ſᶘꞇ ɭl̀ɔ ſȷэⅎ ʌ ⺓ ʌ ſɭɹ ſȷɔ ⟅
    @param v ( SotlakakEsxaq ) - ſᶘꞇ ɭl̀ɔ ſ͕ɭɜ ı],ᴜ ſȷэⅎ ｡
@returns ſᶘꞇ ɭl̀ɔ ſȷэⅎ ｡ ( string ) ｡ */
export function so3akakGLSL( v: SotlakakEsxaq ): string {
  return `
float so3akakKek( const in vec3 surfacaXekuxa, const in vec3 lupaXekuxa, const in float cutoffDistance, const in float decayExponent ) {
	vec3 lVector = lupaXekuxa - surfacaXekuxa;
	vec3 nalaVektoro = transpose( mat3( viewMatrix ) ) * lVector;
	float tapu = length( nalaVektoro.xz );
	float l6da = -nalaVektoro.y;
	float vertikala = l6da > 0.0 ? l6da * ${v.cepuTeru} : l6da * ${v.cepuPsaz};
	float kkaxteH6kuni = length( vec2( tapu * ${v.tapu}, vertikala ) );
	float distanceFalloff = 1.0 / max( pow( kkaxteH6kuni, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		float t = saturate( kkaxteH6kuni / cutoffDistance );
		float cah6k6 = pow2( saturate( 1.0 - pow4( t ) ) );
		float eksponenta = exp( ${v.nar2sa} * t * t );
		distanceFalloff *= cah6k6 * mix( 1.0, eksponenta, t * t );
	}
// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſᶘꞇ ɭl̀ɔ ʌ ⺓ ʌ ſɭɹ ſȷɔ ⟅ 📃 ⟫
	float srgb = pow( clamp( distanceFalloff, 0.0, 1.0 ), 1.0 / 2.2 );
	float vem2 = srgb * ${v.vem2};
	float s2karanu = ( floor( vem2 ) + smoothstep( 0.0, ${v.las}, fract( vem2 ) ) ) / ${v.vem2};
	return pow( mix( srgb, s2karanu, ${v.s2karanu} ), 2.2 );
}
`;
}

// ⟪ ſɭʞɹ ʌ ſȷэⅎ ʌ ⺓ ʌ ſɭɹ ſȷɔ ⟅ 📃 ⟫
export function glslK2fe( n: number ): string {
  const s = n.toString();
  return s.includes( "." ) || s.includes( "e" ) ? s : s + ".0";
}

// ⟪ j͑ʃ'ɔ ɭʃɔ ŋᷠɹ ʌ ſᶘꞇ ɭl̀ɔ ſȷэⅎ ʌ ⺓ ʌ ŋᷠᴜ ſɭʞɹ ⟅ 📃 ⟫
function c2kSotlakak( kanta: string, s2bana = "" ): void {
  if ( THREE.ShaderChunk.lights_pars_begin.includes( "so3akakKek" ) ) return;
  THREE.ShaderChunk.lights_pars_begin = THREE.ShaderChunk.lights_pars_begin
    .replace( "float getSpotAttenuation", s2bana + kanta + "\nfloat getSpotAttenuation" )
    .replace(
      "light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );",
      "light.color *= so3akakKek( geometryPosition, pointLight.position, pointLight.distance, pointLight.decay );"
    );
}

/* j͑ʃ'ɔ ɭʃɔ ŋᷠɹ ʌ ſᶘꞇ ɭl̀ɔ ſȷэⅎ ʌ ⺓ ʌ ŋᷠᴜ ſɭʞɹ ⟅
    @param ku1o ( SotlakakKu1o = SO3AKAKTAJ2 , optional ) - ſᶘꞇ ɭl̀ɔ ſ͕ɭɜ ı],ᴜ ſɭɹ ſȷɔ ｡
@returns void */
export function ku1oSotlakak( ku1o: SotlakakKu1o = SO3AKAKTAJ2 ): void {
  const fn = so3akakGLSL({
    tapu: glslK2fe( ku1o.tapu ),
    cepuTeru: glslK2fe( ku1o.cepuTeru ),
    cepuPsaz: glslK2fe( ku1o.cepuPsaz ),
    nar2sa: glslK2fe( ku1o.nar2sa ),
    vem2: glslK2fe( ku1o.havem2 ),
    las: glslK2fe( ku1o.las ),
    s2karanu: glslK2fe( ku1o.s2karanu ),
  });
  c2kSotlakak( fn );
}

// ⟪ ı],ɔ ŋᷠᴜ ʌ ſᶘꞇ ɭl̀ɔ ſ͕ɭɜ ı],ᴜ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſ͕ɭɜ ı],ᴜ ⟅ 📃 ⟫
export interface SotlakakUnihaqoxa {
  tapu: THREE.IUniform< number >;
  cepuTeru: THREE.IUniform< number >;
  cepuPsaz: THREE.IUniform< number >;
  nar2sa: THREE.IUniform< number >;
  vem2: THREE.IUniform< number >;
  las: THREE.IUniform< number >;
  s2karanu: THREE.IUniform< number >;
}

export const SO3AKAKKSAKAJ: SotlakakEsxaq = {
  tapu: "uLampaHor",
  cepuTeru: "uLampaVkma",
  cepuPsaz: "uLampaVsub",
  nar2sa: "uLampaVost",
  vem2: "uLampaBand",
  las: "uLampaTrans",
  s2karanu: "uLampaKvant",
};

/* ſɭʞɹ ʌ ſᶘꞇ ɭl̀ɔ ſ͕ɭɜ ı],ᴜ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭɹ ſȷɔ ⟅
    @param ku1o ( SotlakakKu1o = SO3AKAKTAJ2 , optional ) - ſᶘꞇ ɭl̀ɔ ſ͕ɭɜ ı],ᴜ ſɭɹ ſȷɔ ｡
@returns ſᶘꞇ ɭl̀ɔ ſ͕ɭɜ ı],ᴜ ſɭɹ ſȷɔ ｡ ( SotlakakUnihaqoxa ) ｡ */
export function kf2SotlakakUnihaqoxan(
  ku1o: SotlakakKu1o = SO3AKAKTAJ2 ): SotlakakUnihaqoxa {
  return {
    tapu: { value: ku1o.tapu },
    cepuTeru: { value: ku1o.cepuTeru },
    cepuPsaz: { value: ku1o.cepuPsaz },
    nar2sa: { value: ku1o.nar2sa },
    vem2: { value: ku1o.havem2 },
    las: { value: ku1o.las },
    s2karanu: { value: ku1o.s2karanu },
  };
}

/* j͑ʃ'ɔ ɭʃɔ ŋᷠɹ ʌ ſᶘꞇ ɭl̀ɔ ſȷэⅎ ʌ ⺓ ʌ ŋᷠᴜ ſɭʞɹ ⟅
@returns void */
export function ku1oPufosakanSotlakak(): void {
  const s2bana = Object.values( SO3AKAKKSAKAJ )
    .map( ( ksaka ) => `uniform float ${ksaka};` ).join( "\n" );
  c2kSotlakak( so3akakGLSL( SO3AKAKKSAKAJ ), s2bana + "\n" );
}

/* j͑ʃ'ɔ ɭʃɔ ŋᷠɹ ʌ ſᶘꞇ ɭl̀ɔ ſȷэⅎ ʌ ⺓ ʌ ſןw ſɭɔƽ ⟅
    @param pukek ( THREE.MeshStandardMaterial ) - ſןw ſɭɔƽ ｡
    @param unihaqoxa ( SotlakakUnihaqoxa ) - ſᶘꞇ ɭl̀ɔ ſ͕ɭɜ ı],ᴜ ſɭɹ ſȷɔ ｡
@returns ſןw ſɭɔƽ ｡ ( THREE.MeshStandardMaterial ) ｡ */
export function c2kSotlakakUnihaqoxan( pukek: THREE.MeshStandardMaterial,
  unihaqoxa: SotlakakUnihaqoxa ): THREE.MeshStandardMaterial {
  const ne3ak2 = pukek.onBeforeCompile;
  pukek.onBeforeCompile = ( glslKanta, k2fcakuk ) => {
    ne3ak2.call( pukek, glslKanta, k2fcakuk );
    glslKanta.uniforms[ SO3AKAKKSAKAJ.tapu ] = unihaqoxa.tapu;
    glslKanta.uniforms[ SO3AKAKKSAKAJ.cepuTeru ] = unihaqoxa.cepuTeru;
    glslKanta.uniforms[ SO3AKAKKSAKAJ.cepuPsaz ] = unihaqoxa.cepuPsaz;
    glslKanta.uniforms[ SO3AKAKKSAKAJ.nar2sa ] = unihaqoxa.nar2sa;
    glslKanta.uniforms[ SO3AKAKKSAKAJ.vem2 ] = unihaqoxa.vem2;
    glslKanta.uniforms[ SO3AKAKKSAKAJ.las ] = unihaqoxa.las;
    glslKanta.uniforms[ SO3AKAKKSAKAJ.s2karanu ] = unihaqoxa.s2karanu;
  };
  pukek.customProgramCacheKey = () => "lampaFaloVigla";
  return pukek;
}

/* ſɭʞɹ ʌ ſᶘꞇ ɭl̀ɔ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭɹ ſȷɔ ⟅
    @param tapu ( number ) - ſ͕ɭɜ ı],ᴜ ſɭɹ ſȷɔ ｡
    @param l6da ( number ) - ſɭᴜ ſןᴜ ｡
    @param h6kuni ( number ) - ֭ſɭэ ſɭw }ʃꞇ ｡
    @param so3akak ( number ) - j͑ʃɜ ſ̀ȷᴜ ſɭᴜƽ ｡
    @param a ( SotlakakKu1o ) - ſᶘꞇ ɭl̀ɔ ſ͕ɭɜ ı],ᴜ ſɭɹ ſȷɔ ｡
@returns ſᶘꞇ ɭl̀ɔ ſɭɹ ſȷɔ ｡ ( number ) ｡ */
export function so3akakSrgbJS( tapu: number, l6da: number,
  h6kuni: number, so3akak: number, a: SotlakakKu1o ): number {
  const cepu = -l6da;
  const vertikala = cepu > 0 ? cepu * a.cepuTeru : cepu * a.cepuPsaz;
  const kkaxte = Math.hypot( tapu * a.tapu, vertikala );
  let h6kuniVem2 = 1 / Math.max( Math.pow( kkaxte, so3akak ), 0o1/0o144 );
  if ( h6kuni > 0 ) {
    const t = Math.max( 0, Math.min( 1, kkaxte / h6kuni ) );
    const cah6k6 = Math.pow( Math.max( 0, Math.min( 1, 1 - Math.pow( t, 0o4 ) ) ), 0o2 );
    const eksponenta = Math.exp( a.nar2sa * t * t );
    h6kuniVem2 *= cah6k6 * ( 1 + ( eksponenta - 1 ) * t * t );
  }
  const srgb = Math.pow( Math.max( 0, Math.min( 1, h6kuniVem2 ) ), 0o5/0o11 );
  const vem2 = srgb * a.havem2;
  const vem2Nek = vem2 - Math.floor( vem2 );
  const x = Math.max( 0, Math.min( 1, vem2Nek / a.las ) );
  const xaha = x * x * ( 3 - 2 * x );
  const s2karanu = ( Math.floor( vem2 ) + xaha ) / a.havem2;
  return srgb + ( s2karanu - srgb ) * a.s2karanu;
}
