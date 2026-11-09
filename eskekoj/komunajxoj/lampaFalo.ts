// ≺⧼ ពន្លឺចង្កៀងកោងលើផ្ទៃ 🏮 ⧽≻
// ⟨ ប្រភពរួមនៃការធ្លាក់ពន្លឺចង្កៀង ៖ ហ្គេម និងទំព័រឧទាហរណ៍ប្រើគណិតវិទ្យាតែមួយ ។
// ពន្លឺមិនធ្លាក់ជារង្វង់ទេ ៖ វាឱបទៅរកគែម ។ លើជញ្ជាំងអាគារ ព្រំដែនស្រមោលកោង
// ជារាង |_| មូល ។ ផ្នែកឆ្ងាយពីភ្លើងលាតសន្ធឹងតាមអ័ក្សកោង ហើយគ្រប់ជំហានងងឹត
// ដក 101010 ដូច ombraKoloro ។ តម្លៃលំនាំដើមនៅទីនេះដូចហ្គេមគ្រប់ខ្ទង់ ។ 📃 ⟩
import * as THREE from "three";

// ⟪ តម្លៃកោង 🎚️ ⟫
export interface LampaFaloAgordo {
  horizontala: number;
  vertikalaSup: number;
  vertikalaSub: number;
  vostro: number;
  bandoj: number;
  transiro: number;
  kvantigo: number;
}

// ⟨ ១៦ ជំហាន ៖ 255 / 16 = 15.9375 ។ គ្រប់ជំហានស្មើនឹង 0x10 ក្នុងមួយឆានែល ។ 📃 ⟩
export const LAMPA_FALO_DEFAUXLTA: LampaFaloAgordo = {
  horizontala: 0o3/0o4,
  vertikalaSup: 0o2,
  vertikalaSub: 0o5/0o10,
  vostro: -0o2,
  bandoj: 0o377/0o20,
  transiro: 0o3/0o31,
  kvantigo: 0o1,
};

// ⟪ ពន្លឺចង្កៀងរួម 🕯️ ⟫
// ⟨ ហ្គេម និងឆាកឧទាហរណ៍ប្រើចង្កៀងតែមួយ ។ ពណ៌ កម្លាំង ចម្ងាយ និងការធ្លាក់
// រស់នៅទីនេះ ដើម្បីកុំឱ្យឆាកសាកល្បងខុសពីហ្គេម ។ កម្លាំងជា candela ដូច
// three.js , ហើយការធ្លាក់កោងគុណបន្ថែម ។ 📃 ⟩
export interface LampaLumo {
  koloro: number;
  forto: number;
  distanco: number;
  falo: number;
}

export const LAMPA_LUMO: LampaLumo = {
  koloro: 0xf89838,
  forto: 0o20,
  distanco: 0o40,
  falo: 0o2,
};

// ⟪ ខ្សែ GLSL 📜 ⟫
// ⟨ ថូខឹននីមួយៗជាខ្សែ ៖ ហ្គេមដាក់លេខទសភាគថេរ , ឧទាហរណ៍ដាក់ឈ្មោះ uniform
// ដើម្បីកែរស់ ។ GLSL គ្មានលេខអដ្ឋមាន ដូច្នេះលេខក្នុងខ្សែជាទសភាគ ។ 📃 ⟩
export interface LampaFaloTokenoj {
  hor: string;
  vsup: string;
  vsub: string;
  vost: string;
  band: string;
  trans: string;
  kvant: string;
}

/*បង្កើតអនុគមន៍ GLSL ធ្លាក់ពន្លឺចង្កៀង
    @param v ( LampaFaloTokenoj ) - ថូខឹនជំនួសតម្លៃកោង
@returns ខ្សែអនុគមន៍ getLampaAttenuation ( string )*/
export function lampaFaloGLSL( v: LampaFaloTokenoj ): string {
  return `
float getLampaAttenuation( const in vec3 surfacaPozicio, const in vec3 lupaPozicio, const in float cutoffDistance, const in float decayExponent ) {
	vec3 lVector = lupaPozicio - surfacaPozicio;
	vec3 mondoVektoro = transpose( mat3( viewMatrix ) ) * lVector;
	float horizontala = length( mondoVektoro.xz );
	float alto = -mondoVektoro.y;
	float vertikala = alto > 0.0 ? alto * ${v.vsup} : alto * ${v.vsub};
	float kurbaDistanco = length( vec2( horizontala * ${v.hor}, vertikala ) );
	float distanceFalloff = 1.0 / max( pow( kurbaDistanco, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		float t = saturate( kurbaDistanco / cutoffDistance );
		float fenestro = pow2( saturate( 1.0 - pow4( t ) ) );
		float eksponenta = exp( ${v.vost} * t * t );
		distanceFalloff *= fenestro * mix( 1.0, eksponenta, t * t );
	}
	// ⟨ ស្រមោលកោងតាមគែម ជាជំហាន -101010 ដូច ombraKoloro 📃 ⟩
	float srgb = pow( clamp( distanceFalloff, 0.0, 1.0 ), 1.0 / 2.2 );
	float nivelo = srgb * ${v.band};
	float kvant = ( floor( nivelo ) + smoothstep( 0.0, ${v.trans}, fract( nivelo ) ) ) / ${v.band};
	return pow( mix( srgb, kvant, ${v.kvant} ), 2.2 );
}
`;
}

// ⟨ លេខគត់ត្រូវការក្បៀសក្នុង GLSL ដើម្បីកុំឱ្យក្លាយជា int ។ 📃 ⟩
export function glslNombro( n: number ): string {
  const s = n.toString();
  return s.includes( "." ) || s.includes( "e" ) ? s : s + ".0";
}

// ⟪ ការប៉ះពាល់ហ្គេម 🎮 ⟫
// ⟨ ស្នូលតែមួយសម្រាប់ដាក់អនុគមន៍ចូល chunk ពន្លឺ ទាំងតម្លៃថេរ និងតម្លៃរស់ ។
// ការហៅច្រើនដងមិនធ្វើអ្វីបន្ថែម ព្រោះឈ្មោះអនុគមន៍ជាសញ្ញាសម្គាល់ ។ 📃 ⟩
function surmetiLampanFalon( funkcio: string, deklaroj = "" ): void {
  if ( THREE.ShaderChunk.lights_pars_begin.includes( "getLampaAttenuation" ) ) return;
  THREE.ShaderChunk.lights_pars_begin = THREE.ShaderChunk.lights_pars_begin
    .replace( "float getSpotAttenuation", deklaroj + funkcio + "\nfloat getSpotAttenuation" )
    .replace(
      "light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );",
      "light.color *= getLampaAttenuation( geometryPosition, pointLight.position, pointLight.distance, pointLight.decay );"
    );
}

/*អនុវត្តការធ្លាក់ពន្លឺចង្កៀងទៅជាសកល ម្តងគត់ ដោយតម្លៃថេរ។
    @param agordo ( LampaFaloAgordo = LAMPA_FALO_DEFAUXLTA , optional ) - តម្លៃកោងថេរ។
@returns void*/
export function aplikiLampaFalon( agordo: LampaFaloAgordo = LAMPA_FALO_DEFAUXLTA ): void {
  const fn = lampaFaloGLSL({
    hor: glslNombro( agordo.horizontala ),
    vsup: glslNombro( agordo.vertikalaSup ),
    vsub: glslNombro( agordo.vertikalaSub ),
    vost: glslNombro( agordo.vostro ),
    band: glslNombro( agordo.bandoj ),
    trans: glslNombro( agordo.transiro ),
    kvant: glslNombro( agordo.kvantigo ),
  });
  surmetiLampanFalon( fn );
}

// ⟪ តម្លៃរស់ 🎚️ ⟫
// ⟨ ឆាកឧទាហរណ៍កែតម្លៃកោងពេលកំពុងដំណើរការ ។ ឈ្មោះ uniform ត្រូវប្រកាស
// នៅក្នុង chunk ពន្លឺ ហើយវត្ថុធាតុត្រូវចង uniform ទាំងនោះទៅវត្ថុរួមតែមួយ ។ 📃 ⟩
export interface LampaFaloUniformoj {
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

/*បង្កើតវត្ថុ uniform រួមសម្រាប់ឆាកឧទាហរណ៍។
    @param agordo ( LampaFaloAgordo = LAMPA_FALO_DEFAUXLTA , optional ) - តម្លៃចាប់ផ្តើម។
@returns វត្ថុ uniform ទាំងប្រាំពីរ ( LampaFaloUniformoj )។*/
export function kreiLampaFaloUniformojn(
  agordo: LampaFaloAgordo = LAMPA_FALO_DEFAUXLTA ): LampaFaloUniformoj {
  return {
    hor: { value: agordo.horizontala },
    vsup: { value: agordo.vertikalaSup },
    vsub: { value: agordo.vertikalaSub },
    vost: { value: agordo.vostro },
    band: { value: agordo.bandoj },
    trans: { value: agordo.transiro },
    kvant: { value: agordo.kvantigo },
  };
}

/*អនុវត្តការធ្លាក់ពន្លឺចង្កៀងដោយប្រើ uniform រស់ ម្តងគត់។
@returns void*/
export function aplikiViglanLampanFalon(): void {
  const deklaroj = Object.values( LAMPA_FALO_NOMOJ )
    .map( ( nomo ) => `uniform float ${nomo};` ).join( "\n" );
  surmetiLampanFalon( lampaFaloGLSL( LAMPA_FALO_NOMOJ ), deklaroj + "\n" );
}

/*ចង uniform រួមទៅវត្ថុធាតុមួយ ដើម្បីឱ្យការកែតម្លៃឃើញភ្លាមលើផ្ទៃ។
    @param materialo ( THREE.MeshStandardMaterial ) - វត្ថុធាតុត្រូវចង។
    @param uniformoj ( LampaFaloUniformoj ) - វត្ថុ uniform រួម។
@returns វត្ថុធាតុដូចដើម ( THREE.MeshStandardMaterial )។*/
export function ligiLampajnUniformojn( materialo: THREE.MeshStandardMaterial,
  uniformoj: LampaFaloUniformoj ): THREE.MeshStandardMaterial {
  const antaŭa = materialo.onBeforeCompile;
  materialo.onBeforeCompile = ( shadero, bildilo ) => {
    antaŭa.call( materialo, shadero, bildilo );
    shadero.uniforms[ LAMPA_FALO_NOMOJ.hor ] = uniformoj.hor;
    shadero.uniforms[ LAMPA_FALO_NOMOJ.vsup ] = uniformoj.vsup;
    shadero.uniforms[ LAMPA_FALO_NOMOJ.vsub ] = uniformoj.vsub;
    shadero.uniforms[ LAMPA_FALO_NOMOJ.vost ] = uniformoj.vost;
    shadero.uniforms[ LAMPA_FALO_NOMOJ.band ] = uniformoj.band;
    shadero.uniforms[ LAMPA_FALO_NOMOJ.trans ] = uniformoj.trans;
    shadero.uniforms[ LAMPA_FALO_NOMOJ.kvant ] = uniformoj.kvant;
  };
  materialo.customProgramCacheKey = () => "lampaFaloVigla";
  return materialo;
}

// ⟪ កញ្ចក់ JS សម្រាប់ខ្សែកាត់ 2D 📐 ⟫
/*គណនាពន្លឺធ្លាក់ដូច GLSL គ្រប់ជំហាន រួចត្រឡប់ជាពន្លឺ sRGB 0 ដល់ 1។
    @param horizontala ( number ) - ចម្ងាយផ្តេកពីចង្កៀង
    @param vy ( number ) - កម្ពស់ចង្កៀងពីលើផ្ទៃ ( វិជ្ជមានបើចង្កៀងខ្ពស់ជាង )
    @param cutoff ( number ) - ចម្ងាយបិទ
    @param decay ( number ) - និទស្សន្តធ្លាក់
    @param a ( LampaFaloAgordo ) - តម្លៃកោង
@returns ពន្លឺ sRGB 0 ដល់ 1 ( number )*/
export function lampaFaloSrgbJS( horizontala: number, vy: number,
  cutoff: number, decay: number, a: LampaFaloAgordo ): number {
  const alto = -vy;
  const vertikala = alto > 0 ? alto * a.vertikalaSup : alto * a.vertikalaSub;
  const kurba = Math.hypot( horizontala * a.horizontala, vertikala );
  let falloff = 1 / Math.max( Math.pow( kurba, decay ), 0o1/0o144 );
  if ( cutoff > 0 ) {
    const t = Math.max( 0, Math.min( 1, kurba / cutoff ) );
    const fenestro = Math.pow( Math.max( 0, Math.min( 1, 1 - Math.pow( t, 0o4 ) ) ), 0o2 );
    const eksp = Math.exp( a.vostro * t * t );
    falloff *= fenestro * ( 1 + ( eksp - 1 ) * t * t );
  }
  const srgb = Math.pow( Math.max( 0, Math.min( 1, falloff ) ), 0o5/0o11 );
  const nivelo = srgb * a.bandoj;
  const fr = nivelo - Math.floor( nivelo );
  const x = Math.max( 0, Math.min( 1, fr / a.transiro ) );
  const glata = x * x * ( 3 - 2 * x );
  const kvant = ( Math.floor( nivelo ) + glata ) / a.bandoj;
  return srgb + ( kvant - srgb ) * a.kvantigo;
}