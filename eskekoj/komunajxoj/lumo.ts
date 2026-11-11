// ≺⧼ ប្រព័ន្ធពន្លឺរួម 🏮 ⧽≻
// ⟨ ឆាកហ្គេម និងឆាកឧទាហរណ៍ទាំងអស់អានពន្លឺពីឯកសារនេះ ។ ពន្លឺចង្កៀងកោង
// មកពីម៉ូឌុល lampaFalo ដែលបាននាំចេញឡើងវិញនៅទីនេះ ។ មេឃតែមួយបង្កើត
// ទាំងពន្លឺមេឃ-ព្រះអាទិត្យ និងបរិស្ថានឆ្លុះ PMREM , ដូច្នេះការឆ្លុះមកពី
// ប្រភពពន្លឺតែមួយ ។ ការកំណត់សន្ទះគូរក៏រស់នៅទីនេះដែរ ។ 📃 ⟩
import * as THREE from "three";

export { aplikiLampaFalon, aplikiViglanLampanFalon, kreiLampaFaloUniformojn,
  ligiLampajnUniformojn, LAMPA_FALO_DEFAUXLTA, LAMPA_FALO_NOMOJ, LAMPA_LUMO, lampaFaloGLSL,
  lampaFaloSrgbJS } from "./lampaFalo.js";
export type { LampaLumo, LampaFaloAgordo, LampaFaloTokenoj, LampaFaloUniformoj }
  from "./lampaFalo.js";

// ⟪ មេឃរួម 🌤 ⟫
// ⟨ មេឃតែមួយសម្រាប់ឆាក និងកញ្ចក់ឆ្លុះ ។ លេខក្នុងខ្សែជាទសភាគ ព្រោះ GLSL
// គ្មានលេខអដ្ឋមាន ។ គ្រប់ឆាកប្រើវត្ថុធាតុនេះ ដើម្បីកុំឱ្យមេឃខុសគ្នា ។ 📃 ⟩
export type CxielajUniformoj = {
  uTop: THREE.IUniform< THREE.Color >;
  uMid: THREE.IUniform< THREE.Color >;
  uBot: THREE.IUniform< THREE.Color >;
  uSunCol: THREE.IUniform< THREE.Color >;
  uSunDir: THREE.IUniform< THREE.Vector3 >;
};

export const CXIELA_VERTEKS0 = `precision highp float;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
attribute vec3 position;
varying vec3 vDir;
void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

export const CXIELA_FRAGMENTO = `precision highp float;
varying vec3 vDir;
uniform vec3 uTop,uMid,uBot,uSunCol,uSunDir;
void main(){vec3 d=normalize(vDir);float h=clamp(d.y,-0.203125,1.0);
vec3 koloro=mix(uBot,uMid,smoothstep(-0.015625,0.234375,h));koloro=mix(koloro,uTop,smoothstep(0.1875,0.71875,h));
koloro+=uSunCol*pow(max(dot(d,normalize(uSunDir)),0.0),28.0);
gl_FragColor=vec4(koloro,1.0);}`;

/* បង្កើតវត្ថុធាតុមេឃ ដែលប្រើទាំងលើឆាក និងក្នុងកញ្ចក់ឆ្លុះ ។
    @param uniformoj ( CxielajUniformoj ) - ពណ៌បីជាន់ ពណ៌ព្រះអាទិត្យ និងទិសព្រះអាទិត្យ ។
@returns វត្ថុធាតុមេឃ ( THREE.RawShaderMaterial )។ */
export function kreiCxielanMaterialon(
  uniformoj: CxielajUniformoj ): THREE.RawShaderMaterial {
  return new THREE.RawShaderMaterial({ side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: uniformoj, vertexShader: CXIELA_VERTEKS0, fragmentShader: CXIELA_FRAGMENTO });
}

// ⟪ បរិស្ថានឆ្លុះ 🪞 ⟫
// ⟨ កញ្ចក់ឆ្លុះមកពីមេឃតែមួយ ដែលបំភ្លឺឆាកដែរ ។ មិនមានបន្ទប់សាកល្បងដាច់ដោយឡែក
// ទេ ៖ ដែក និងកញ្ចក់ឆ្លុះមេឃ និងព្រះអាទិត្យពិតរបស់ឆាក ។ ការបង្កើតឡើងវិញ
// កើតឡើងតែពេលពណ៌ប្រែគ្រប់គ្រាន់ ដើម្បីកុំឱ្យយឺត ។ 📃 ⟩
export const MEDIA_INTENSO = 0o1;
// ⟨ កម្រិតប្រែពណ៌ដែលធ្វើឱ្យបង្កើតឡើងវិញ ។ តម្លៃតូចជាងនេះគឺខ្ជះខ្ជាយ ។ 📃 ⟩
const MEDIA_SOJLO = 0o1 / 0o40;

export interface MediaAgordo {
  supro: THREE.ColorRepresentation;
  mezo: THREE.ColorRepresentation;
  subo: THREE.ColorRepresentation;
  sunaKoloro: THREE.ColorRepresentation;
  sunaDirekto: THREE.Vector3;
  intenso: number;
}

export interface Medio {
  gxisdatigi( agordo: Partial< MediaAgordo > ): void;
  teksturo: THREE.Texture | null;
  detrui(): void;
}

const DEFAUXLTA_MEDIO: MediaAgordo = {
  supro: 0x78a8c0, mezo: 0xb8d0d8, subo: 0xe0e8e8,
  sunaKoloro: 0xf8f0d8,
  sunaDirekto: new THREE.Vector3( 0o4/0o10, 0o63/0o100, 0o23/0o100 ),
  intenso: MEDIA_INTENSO,
};

function malsamajKoloroj( a: THREE.Color, b: THREE.Color ): boolean {
  return Math.abs( a.r - b.r ) > MEDIA_SOJLO
    || Math.abs( a.g - b.g ) > MEDIA_SOJLO
    || Math.abs( a.b - b.b ) > MEDIA_SOJLO;
}

/* ដាក់បរិស្ថានឆ្លុះពីមេឃលើឆាក ។
    @param sceno ( THREE.Scene ) - ឆាកដែលត្រូវការការឆ្លុះ ។
    @param bildilo ( THREE.WebGLRenderer ) - សន្ទះគូរដែលបង្កើតវាយនភាព ។
    @param agordo ( Partial< MediaAgordo > = {} , optional ) - ពណ៌មេឃ និងកម្រិតបរិស្ថាន ។
@returns ការគ្រប់គ្រងបរិស្ថាន ( Medio )។ */
export function agordiMedion( sceno: THREE.Scene, bildilo: THREE.WebGLRenderer,
  agordo: Partial< MediaAgordo > = {} ): Medio {
  const uniformoj: CxielajUniformoj = {
    uTop: { value: new THREE.Color( DEFAUXLTA_MEDIO.supro ) },
    uMid: { value: new THREE.Color( DEFAUXLTA_MEDIO.mezo ) },
    uBot: { value: new THREE.Color( DEFAUXLTA_MEDIO.subo ) },
    uSunCol: { value: new THREE.Color( DEFAUXLTA_MEDIO.sunaKoloro ) },
    uSunDir: { value: DEFAUXLTA_MEDIO.sunaDirekto.clone() },
  };
  // ⟨ ឆាកតូចមួយសម្រាប់កញ្ចក់ ៖ គ្រាន់តែមេឃ គ្មានដី គ្មានវត្ថុ ។ 📃 ⟩
  const reflektaSceno = new THREE.Scene();
  reflektaSceno.add( new THREE.Mesh( new THREE.SphereGeometry( 0o100, 0o20, 0o10 ),
    kreiCxielanMaterialon( uniformoj ) ) );
  const generilo = new THREE.PMREMGenerator( bildilo );
  let celo: THREE.WebGLRenderTarget | null = null;
  let nuna = new THREE.Color( DEFAUXLTA_MEDIO.supro );
  let meza = new THREE.Color( DEFAUXLTA_MEDIO.mezo );
  let malsupra = new THREE.Color( DEFAUXLTA_MEDIO.subo );
  let suna = new THREE.Color( DEFAUXLTA_MEDIO.sunaKoloro );
  let intenso = DEFAUXLTA_MEDIO.intenso;

  function krei(): void {
    if ( celo ) celo.dispose();
    // ⟨ ស៊ីគម៉ា 0 ៖ មេឃរលូនស្រាប់ ដូច្នេះមិនត្រូវព្រិលបន្ថែម ។ 📃 ⟩
    celo = generilo.fromScene( reflektaSceno, 0, 0o1/0o100, 0o400 );
    sceno.environment = celo.texture;
    sceno.environmentIntensity = intenso;
  }

  function gxisdatigi( nova: Partial< MediaAgordo > ): void {
    const t = new THREE.Color( nova.supro ?? nuna );
    const m = new THREE.Color( nova.mezo ?? meza );
    const b = new THREE.Color( nova.subo ?? malsupra );
    const s = new THREE.Color( nova.sunaKoloro ?? suna );
    const sxangxo = malsamajKoloroj( nuna, t ) || malsamajKoloroj( meza, m )
      || malsamajKoloroj( malsupra, b ) || malsamajKoloroj( suna, s );
    nuna.copy( t ); meza.copy( m ); malsupra.copy( b ); suna.copy( s );
    if ( nova.sunaDirekto ) uniformoj.uSunDir.value.copy( nova.sunaDirekto );
    intenso = nova.intenso ?? intenso;
    if ( !sxangxo && celo ) { sceno.environmentIntensity = intenso; return; }
    uniformoj.uTop.value.copy( t );
    uniformoj.uMid.value.copy( m );
    uniformoj.uBot.value.copy( b );
    uniformoj.uSunCol.value.copy( s );
    krei();
  }

  gxisdatigi( agordo );

  return {
    gxisdatigi,
    get teksturo() { return celo ? celo.texture : null; },
    detrui(): void {
      if ( celo ) celo.dispose();
      celo = null;
      generilo.dispose();
    },
  };
}

// ⟪ សន្ទះគូរ 🖥️ ⟫
export interface BildilaAgordo {
  antialias?: boolean;
  ombroj?: boolean;
  ombraTipo?: THREE.ShadowMapType;
  ekspozicio?: number;
  pikslaRacio?: number;
}

/* កំណត់សន្ទះគូរឱ្យដូចគ្នានៅគ្រប់ឆាក ។
    @param bildilo ( THREE.WebGLRenderer ) - សន្ទះគូរត្រូវកំណត់ ។
    @param agordo ( BildilaAgordo = {} , optional ) - ជម្រើសនៃការកំណត់ ។
@returns void */
export function agordiBildilon( bildilo: THREE.WebGLRenderer, agordo: BildilaAgordo = {} ): void {
  if ( !THREE.ShaderChunk.colorspace_fragment.includes("konturaPasxo") ) {
    // ⟨ ជម្រាលត្រូវដក 101010 ពីពណ៌គោល មិនមែនពីពណ៌ដែលពន្លឺលាយឡើយ
    //   ដូច្នេះស្រមោលរក្សាពណ៌ដើមរបស់វត្ថុនីមួយៗ ។ លេខទសភាគព្រោះ GLSL គ្មានអដ្ឋមាន ។ 📃 ⟩
    THREE.ShaderChunk.colorspace_fragment += `
      #if defined( STANDARD ) && defined( OPAQUE ) && !defined( USE_TRANSMISSION )
        if ( metalnessFactor < 0.5 ) {
          float konturaPasxo = ${0o20 / 0o377};
          float konturaKrado = ${0o377 / 0o10};
          // ⟨ GLSL គ្មានលេខអដ្ឋមាន ៖ ថេរជាប្រភាគអដ្ឋមានបង្គត់ 📃 ⟩
          vec3 konturaSrgb = mix( diffuseColor.rgb * ${0o147 / 0o10},
            ${0o104 / 0o100} * pow( diffuseColor.rgb, vec3( ${0o5 / 0o14} ) ) - ${0o7 / 0o200},
            step( vec3( ${0o1 / 0o400} ), diffuseColor.rgb ) );
          vec3 konturaBazo = floor( konturaSrgb * konturaKrado + ${0o1 / 0o2} ) / konturaKrado;
          float konturaHelo = max( gl_FragColor.r, max( gl_FragColor.g, gl_FragColor.b ) );
          float konturaBazaHelo = max( konturaBazo.r, max( konturaBazo.g, konturaBazo.b ) );
          float konturaNivelo = max( ${0o0}.0, ( konturaBazaHelo - konturaHelo ) / konturaPasxo );
          float konturaRando = min( fwidth( konturaNivelo ), ${0o1 / 0o10} );
          float konturaBando = floor( konturaNivelo ) + smoothstep(
            ${0o1 / 0o2} - konturaRando, ${0o1 / 0o2} + max( konturaRando, ${0o1 / 0o20000} ), fract( konturaNivelo ) );
          gl_FragColor.rgb = max( vec3( ${0o0}.0 ), konturaBazo - vec3( konturaBando * konturaPasxo ) );
        }
      #endif
    `;
  }
  bildilo.outputColorSpace = THREE.SRGBColorSpace;
  bildilo.toneMapping = THREE.ACESFilmicToneMapping;
  bildilo.toneMappingExposure = agordo.ekspozicio ?? 0o1;
  if ( agordo.ombroj ) {
    bildilo.shadowMap.enabled = true;
    bildilo.shadowMap.type = agordo.ombraTipo ?? THREE.PCFShadowMap;
  }
  if ( agordo.pikslaRacio !== undefined ) bildilo.setPixelRatio( agordo.pikslaRacio );
}

// ⟪ ពន្លឺមេឃ និងព្រះអាទិត្យ ☀️ ⟫
export interface CxefajLumojAgordo {
  cxielaKoloro?: THREE.ColorRepresentation;
  grundoKoloro?: THREE.ColorRepresentation;
  cxielaIntenso?: number;
  sunaKoloro?: THREE.ColorRepresentation;
  sunaIntenso?: number;
  sunaPozicio?: [ number, number, number ];
  ombroj?: boolean;
  ombraMapo?: number;
  ombraDuono?: number;
  ombraProksima?: number;
  ombraMalproksima?: number;
  ombraBiaso?: number;
  ombraNormalBiaso?: number;
  plenigaKoloro?: THREE.ColorRepresentation;
  plenigaIntenso?: number;
}

export interface CxefajLumoj {
  hemiLumo: THREE.HemisphereLight;
  suno: THREE.DirectionalLight;
  plenigaLumo: THREE.AmbientLight | null;
}

// ⟨ តម្លៃលំនាំដើមដូចបាលេត nebula.tago របស់ហ្គេម ។ 📃 ⟩
const DEFAUXLTAJ_LUMOJ = {
  cxielaKoloro: 0xc8e0e8,
  grundoKoloro: 0x485848,
  cxielaIntenso: 0o63 / 0o100,
  sunaKoloro: 0xf8f0d8,
  sunaIntenso: 0o45 / 0o40,
  sunaPozicio: [ 0o110, 0o160, 0o40 ] as [ number, number, number ],
};

/* បង្កើតពន្លឺមេឃ ព្រះអាទិត្យ និងពន្លឺបំពេញស្រេចចិត្ត រួចដាក់ចូលឆាក ។
    @param sceno ( THREE.Scene ) - ឆាកដែលត្រូវបន្ថែមពន្លឺ ។
    @param agordo ( CxefajLumojAgordo = {} , optional ) - តម្លៃពណ៌ កម្រិត ទីតាំង និងស្រមោល ។
@returns ពន្លឺទាំងបី ( CxefajLumoj )។ */
export function kreiCxefajnLumojn( sceno: THREE.Scene,
  agordo: CxefajLumojAgordo = {} ): CxefajLumoj {
  const hemiLumo = new THREE.HemisphereLight(
    agordo.cxielaKoloro ?? DEFAUXLTAJ_LUMOJ.cxielaKoloro,
    agordo.grundoKoloro ?? DEFAUXLTAJ_LUMOJ.grundoKoloro,
    agordo.cxielaIntenso ?? DEFAUXLTAJ_LUMOJ.cxielaIntenso
  );
  sceno.add( hemiLumo );

  const suno = new THREE.DirectionalLight(
    agordo.sunaKoloro ?? DEFAUXLTAJ_LUMOJ.sunaKoloro,
    agordo.sunaIntenso ?? DEFAUXLTAJ_LUMOJ.sunaIntenso
  );
  const pozicio = agordo.sunaPozicio ?? DEFAUXLTAJ_LUMOJ.sunaPozicio;
  suno.position.set( pozicio[ 0 ], pozicio[ 1 ], pozicio[ 2 ] );
  if ( agordo.ombroj ) {
    const mapo = agordo.ombraMapo ?? 0o2000;
    const duono = agordo.ombraDuono ?? 0o100;
    suno.castShadow = true;
    suno.shadow.mapSize.set( mapo, mapo );
    suno.shadow.camera.left = -duono;
    suno.shadow.camera.right = duono;
    suno.shadow.camera.top = duono;
    suno.shadow.camera.bottom = -duono;
    suno.shadow.camera.near = agordo.ombraProksima ?? 0o20;
    suno.shadow.camera.far = agordo.ombraMalproksima ?? 0o520;
    suno.shadow.bias = agordo.ombraBiaso ?? -0o1 / ( 0o2 * mapo );
    suno.shadow.normalBias = agordo.ombraNormalBiaso
      ?? Math.max( 0o4 / 0o10, ( 0o200 / mapo ) * 0o22 / 0o10 );
    suno.shadow.camera.updateProjectionMatrix();
  }
  sceno.add( suno, suno.target );

  let plenigaLumo: THREE.AmbientLight | null = null;
  if ( agordo.plenigaIntenso !== undefined ) {
    plenigaLumo = new THREE.AmbientLight( agordo.plenigaKoloro ?? 0x404848,
      agordo.plenigaIntenso );
    sceno.add( plenigaLumo );
  }
  return { hemiLumo, suno, plenigaLumo };
}
