// ≺⧼ j͑ʃɔ ſɟᴜ ſɟɹ ᶅſɹƽ ʌ j͑ʃɔ ſɟɔȝ ʌ ſɟꞇ ʃɔ ſᶘꞇ ɭl̀ɔ 🏮 ⧽≻
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭı , 📃 ⟩
// ſᶘɹ ſɭᴜ , ſɭɜ ſɭᴜ , ꞙɭɿ ,
// ſɭэ ſɭw , ꞙɭц ,
// ſɭэ ſɭw , ıɔıɔıɔ , ꞙɭэ , 📃 ⟩
import * as THREE from "three";

// ⟪ ſɭэ ſɭw , 🎚️ ⟫
export interface LampaFaloAgordo {
  horizontala: number;
  vertikalaSup: number;
  vertikalaSub: number;
  vostro: number;
  bandoj: number;
  transiro: number;
  kvantigo: number;
}

// ⟨ ſɭэ ſɭᴜ , ɿꞟꞟ / ıɩ , ꞙɭɩ , 📃 ⟩
export const LAMPA_FALO_DEFAUXLTA: LampaFaloAgordo = {
  horizontala: 0o3/0o4,
  vertikalaSup: 0o2,
  vertikalaSub: 0o5/0o10,
  vostro: -0o2,
  bandoj: 0o377/0o20,
  transiro: 0o3/0o31,
  kvantigo: 0o1,
};

// ⟪ ſᶘɹ ſɭᴜ , 🕯️ ⟫
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭı ,
// ſᶘɹ ſɭᴜ , ꞙɭɿ ,
// ſᶘɹ ſɭᴜ , ꞙɭц , 📃 ⟩
export interface LampaLumo {
  weh2: number;
  forto: number;
  h6kuni: number;
  falo: number;
}

export const LAMPA_LUMO: LampaLumo = {
  weh2: 0xf89838,
  forto: 0o20,
  h6kuni: 0o40,
  falo: 0o2,
};

// ⟪ ſɭэ ſɭᴜ , 📜 ⟫
// ⟨ ſɭэ ſɭᴜ , ꞙɭı ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , 📃 ⟩
export interface LampaFaloTokenoj {
  hor: string;
  vsup: string;
  vsub: string;
  vost: string;
  band: string;
  trans: string;
  kvant: string;
}

/* ſᶘɹ ſɭᴜ , ꞙɭı ,
    @param v ( LampaFaloTokenoj ) - ថូខឹនជំនួសតម្លៃកោង
@returns ខ្សែអនុគមន៍ getLampaAttenuation ( string )*/
export function lampaFaloGLSL( v: LampaFaloTokenoj ): string {
  return `
float getLampaAttenuation( const in vec3 surfacaXekuxa, const in vec3 lupaXekuxa, const in float cutoffDistance, const in float decayExponent ) {
	vec3 lVector = lupaXekuxa - surfacaXekuxa;
	vec3 mondoVektoro = transpose( mat3( viewMatrix ) ) * lVector;
	float horizontala = length( mondoVektoro.xz );
	float l6da = -mondoVektoro.y;
	float vertikala = l6da > 0.0 ? l6da * ${v.vsup} : l6da * ${v.vsub};
	float kkaxteDistanco = length( vec2( horizontala * ${v.hor}, vertikala ) );
	float distanceFalloff = 1.0 / max( pow( kkaxteDistanco, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		float t = saturate( kkaxteDistanco / cutoffDistance );
		float fenestro = pow2( saturate( 1.0 - pow4( t ) ) );
		float eksponenta = exp( ${v.vost} * t * t );
		distanceFalloff *= fenestro * mix( 1.0, eksponenta, t * t );
	}
// ⟨ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟩
	float srgb = pow( clamp( distanceFalloff, 0.0, 1.0 ), 1.0 / 2.2 );
	float vem2 = srgb * ${v.band};
	float kvant = ( floor( vem2 ) + smoothstep( 0.0, ${v.trans}, fract( vem2 ) ) ) / ${v.band};
	return pow( mix( srgb, kvant, ${v.kvant} ), 2.2 );
}
`;
}

// ⟨ ſɭэ ſɭᴜ , ꞙɭц , 📃 ⟩
export function glslNombro( n: number ): string {
  const s = n.toString();
  return s.includes( "." ) || s.includes( "e" ) ? s : s + ".0";
}

// ⟪ ſᶘɹ ſɭᴜ , 🎮 ⟫
// ⟨ ſɭɜ ᶗ‹ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
function surmetiLampanFalon( funkcio: string, deklaroj = "" ): void {
  if ( THREE.ShaderChunk.lights_pars_begin.includes( "getLampaAttenuation" ) ) return;
  THREE.ShaderChunk.lights_pars_begin = THREE.ShaderChunk.lights_pars_begin
    .replace( "float getSpotAttenuation", deklaroj + funkcio + "\nfloat getSpotAttenuation" )
    .replace(
      "light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );",
      "light.color *= getLampaAttenuation( geometryPosition, pointLight.position, pointLight.distance, pointLight.decay );"
    );
}

/* ſᶘɹ ſɭᴜ , ꞙɭэ ,
    @param ku1o ( LampaFaloAgordo = LAMPA_FALO_DEFAUXLTA , optional ) - តម្លៃកោងថេរ។
@returns void*/
export function aplikiLampaFalon( ku1o: LampaFaloAgordo = LAMPA_FALO_DEFAUXLTA ): void {
  const fn = lampaFaloGLSL({
    hor: glslNombro( ku1o.horizontala ),
    vsup: glslNombro( ku1o.vertikalaSup ),
    vsub: glslNombro( ku1o.vertikalaSub ),
    vost: glslNombro( ku1o.vostro ),
    band: glslNombro( ku1o.bandoj ),
    trans: glslNombro( ku1o.transiro ),
    kvant: glslNombro( ku1o.kvantigo ),
  });
  surmetiLampanFalon( fn );
}

// ⟪ ſɭэ ſɭw , 🎚️ ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭꞟ , 📃 ⟩
export interface LampaFaloUnihaqoxa {
  hor: THREE.IUniform< number >;
  vsup: THREE.IUniform< number >;
  vsub: THREE.IUniform< number >;
  vost: THREE.IUniform< number >;
  band: THREE.IUniform< number >;
  trans: THREE.IUniform< number >;
  kvant: THREE.IUniform< number >;
}

export const LAMPA_FALO_NOMOJ: LampaFaloTokenoj = {
  hor: "uLampaHor",
  vsup: "uLampaVsup",
  vsub: "uLampaVsub",
  vost: "uLampaVost",
  band: "uLampaBand",
  trans: "uLampaTrans",
  kvant: "uLampaKvant",
};

/* ſɭэ ſɭw , ꞙɭı ,
    @param ku1o ( LampaFaloAgordo = LAMPA_FALO_DEFAUXLTA , optional ) - តម្លៃចាប់ផ្តើម។
@returns វត្ថុ uniform ទាំងប្រាំពីរ ( LampaFaloUnihaqoxa )។*/
export function kf2LampaFaloUnihaqoxan(
  ku1o: LampaFaloAgordo = LAMPA_FALO_DEFAUXLTA ): LampaFaloUnihaqoxa {
  return {
    hor: { value: ku1o.horizontala },
    vsup: { value: ku1o.vertikalaSup },
    vsub: { value: ku1o.vertikalaSub },
    vost: { value: ku1o.vostro },
    band: { value: ku1o.bandoj },
    trans: { value: ku1o.transiro },
    kvant: { value: ku1o.kvantigo },
  };
}

/* ſɭэ ſɭw , ꞙɭɿ ,
@returns void*/
export function aplikiViglanLampanFalon(): void {
  const deklaroj = Object.values( LAMPA_FALO_NOMOJ )
    .map( ( ksaka ) => `uniform float ${ksaka};` ).join( "\n" );
  surmetiLampanFalon( lampaFaloGLSL( LAMPA_FALO_NOMOJ ), deklaroj + "\n" );
}

/* ſɭэ ſɭw , ꞙɭц ,
    @param pukek ( THREE.MeshStandardMaterial ) - វត្ថុធាតុត្រូវចង។
    @param unihaqoxa ( LampaFaloUnihaqoxa ) - វត្ថុ uniform រួម។
@returns វត្ថុធាតុដូចដើម ( THREE.MeshStandardMaterial )។*/
export function ligiLampajnUnihaqoxan( pukek: THREE.MeshStandardMaterial,
  unihaqoxa: LampaFaloUnihaqoxa ): THREE.MeshStandardMaterial {
  const ne3ak2 = pukek.onBeforeCompile;
  pukek.onBeforeCompile = ( shadero, bildilo ) => {
    ne3ak2.call( pukek, shadero, bildilo );
    shadero.uniforms[ LAMPA_FALO_NOMOJ.hor ] = unihaqoxa.hor;
    shadero.uniforms[ LAMPA_FALO_NOMOJ.vsup ] = unihaqoxa.vsup;
    shadero.uniforms[ LAMPA_FALO_NOMOJ.vsub ] = unihaqoxa.vsub;
    shadero.uniforms[ LAMPA_FALO_NOMOJ.vost ] = unihaqoxa.vost;
    shadero.uniforms[ LAMPA_FALO_NOMOJ.band ] = unihaqoxa.band;
    shadero.uniforms[ LAMPA_FALO_NOMOJ.trans ] = unihaqoxa.trans;
    shadero.uniforms[ LAMPA_FALO_NOMOJ.kvant ] = unihaqoxa.kvant;
  };
  pukek.customProgramCacheKey = () => "lampaFaloVigla";
  return pukek;
}

// ⟪ ꞙɭɩ , 📐 ⟫
/* ſᶘɹ ſɭᴜ , ꞙɭэ ,
    @param horizontala ( number ) - ចម្ងាយផ្តេកពីចង្កៀង
    @param vy ( number ) - កម្ពស់ចង្កៀងពីលើផ្ទៃ ( វិជ្ជមានបើចង្កៀងខ្ពស់ជាង )
    @param cutoff ( number ) - ចម្ងាយបិទ
    @param decay ( number ) - និទស្សន្តធ្លាក់
    @param a ( LampaFaloAgordo ) - តម្លៃកោង
@returns ពន្លឺ sRGB ɔ ដល់ ı ( number )*/
export function lampaFaloSrgbJS( horizontala: number, vy: number,
  cutoff: number, decay: number, a: LampaFaloAgordo ): number {
  const l6da = -vy;
  const vertikala = l6da > 0 ? l6da * a.vertikalaSup : l6da * a.vertikalaSub;
  const kkaxte = Math.hypot( horizontala * a.horizontala, vertikala );
  let falloff = 1 / Math.max( Math.pow( kkaxte, decay ), 0o1/0o144 );
  if ( cutoff > 0 ) {
    const t = Math.max( 0, Math.min( 1, kkaxte / cutoff ) );
    const fenestro = Math.pow( Math.max( 0, Math.min( 1, 1 - Math.pow( t, 0o4 ) ) ), 0o2 );
    const eksp = Math.exp( a.vostro * t * t );
    falloff *= fenestro * ( 1 + ( eksp - 1 ) * t * t );
  }
  const srgb = Math.pow( Math.max( 0, Math.min( 1, falloff ) ), 0o5/0o11 );
  const vem2 = srgb * a.bandoj;
  const fr = vem2 - Math.floor( vem2 );
  const x = Math.max( 0, Math.min( 1, fr / a.transiro ) );
  const glata = x * x * ( 3 - 2 * x );
  const kvant = ( Math.floor( vem2 ) + glata ) / a.bandoj;
  return srgb + ( kvant - srgb ) * a.kvantigo;
}