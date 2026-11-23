// ≺⧼ j͑ʃɔ ſɟᴜ ſɟɹ ᶅſɹƽ ʌ j͑ʃɔ ſɟɔȝ ʌ ſɟꞇ ʃɔ ſᶘꞇ ɭl̀ɔ 🏮 ⧽≻
// ⟨ ប្រភពរួមនៃការធ្លាក់ពន្លឺចង្កៀង ៖ ហ្គេម និងទំព័រឧទាហរណ៍ប្រើគណិតវិទ្យាតែមួយ ។
// ពន្លឺមិនធ្លាក់ជារង្វង់ទេ ៖ វាឱបទៅរកគែម ។ លើជញ្ជាំងអាគារ ព្រំដែនស្រមោលកោង
// ជារាង |_| មូល ។ ផ្នែកឆ្ងាយពីភ្លើងលាតសន្ធឹងតាមអ័ក្សកោង ហើយគ្រប់ជំហានងងឹត
// ដក 101010 ដូច hunanuWeh2 ។ តម្លៃលំនាំដើមនៅទីនេះដូចហ្គេមគ្រប់ខ្ទង់ ។ 📃 ⟩
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
	// ⟨ ស្រមោលកោងតាមគែម ជាជំហាន -101010 ដូច hunanuWeh2 📃 ⟩
	float srgb = pow( clamp( distanceFalloff, 0.0, 1.0 ), 1.0 / 2.2 );
	float vem2 = srgb * ${v.band};
	float kvant = ( floor( vem2 ) + smoothstep( 0.0, ${v.trans}, fract( vem2 ) ) ) / ${v.band};
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

// ⟪ តម្លៃរស់ 🎚️ ⟫
// ⟨ ឆាកឧទាហរណ៍កែតម្លៃកោងពេលកំពុងដំណើរការ ។ ឈ្មោះ uniform ត្រូវប្រកាស
// នៅក្នុង chunk ពន្លឺ ហើយវត្ថុធាតុត្រូវចង uniform ទាំងនោះទៅវត្ថុរួមតែមួយ ។ 📃 ⟩
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

/*បង្កើតវត្ថុ uniform រួមសម្រាប់ឆាកឧទាហរណ៍។
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

/*អនុវត្តការធ្លាក់ពន្លឺចង្កៀងដោយប្រើ uniform រស់ ម្តងគត់។
@returns void*/
export function aplikiViglanLampanFalon(): void {
  const deklaroj = Object.values( LAMPA_FALO_NOMOJ )
    .map( ( ksaka ) => `uniform float ${ksaka};` ).join( "\n" );
  surmetiLampanFalon( lampaFaloGLSL( LAMPA_FALO_NOMOJ ), deklaroj + "\n" );
}

/*ចង uniform រួមទៅវត្ថុធាតុមួយ ដើម្បីឱ្យការកែតម្លៃឃើញភ្លាមលើផ្ទៃ។
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