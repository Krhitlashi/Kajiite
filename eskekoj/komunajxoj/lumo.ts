// ≺⧼ ប្រព័ន្ធពន្លឺរួម 🏮 ⧽≻
// ⟨ ឆាកហ្គេម និងឆាកឧទាហរណ៍ទាំងអស់អានពន្លឺពីឯកសារនេះ ។ ពន្លឺចង្កៀងកោង
// មកពីម៉ូឌុល lampaFalo ដែលបាននាំចេញឡើងវិញនៅទីនេះ ។ មេឃតែមួយបង្កើត
// ទាំងពន្លឺមេឃ-ព្រះអាទិត្យ និងបរិស្ថានឆ្លុះ PMREM , ដូច្នេះការឆ្លុះមកពី
// ប្រភពពន្លឺតែមួយ ។ ការកំណត់សន្ទះគូរក៏រស់នៅទីនេះដែរ ។ 📃 ⟩
import * as THREE from "three";
import { aplikiLampaFalon } from "./lampaFalo.js";

export { aplikiLampaFalon, aplikiViglanLampanFalon, kreiLampaFaloUniformojn,
  ligiLampajnUniformojn, LAMPA_FALO_DEFAUXLTA, LAMPA_FALO_NOMOJ, LAMPA_LUMO, lampaFaloGLSL,
  lampaFaloSrgbJS } from "./lampaFalo.js";
export type { LampaLumo, LampaFaloAgordo, LampaFaloTokenoj, LampaFaloUniformoj }
  from "./lampaFalo.js";

// ⟨ វាលកោងរួមតែមួយ ៖ សម្ភារៈជាប់ខ្លួន ទឹក និងមេឃហៅមុខងារដូចគ្នា គ្មានផ្លូវដាច់ដោយឡែក 📃 ⟩
export const KONTURA_GLSL = `
const float KONTURA_PASXO = ${0o20 / 0o377};
const float KONTURA_KRADO = ${0o377 / 0o10};
vec3 konturaSrgb( vec3 lin ) {
  return mix( lin * ${0o147 / 0o10},
    ${0o104 / 0o100} * pow( lin, vec3( ${0o5 / 0o14} ) ) - ${0o7 / 0o200},
    step( vec3( ${0o1 / 0o400} ), lin ) );
}
vec3 konturaKrado( vec3 koloro ) {
  return floor( koloro * KONTURA_KRADO + ${0o1 / 0o2} ) / KONTURA_KRADO;
}
vec3 konturaBazo( vec3 lin ) { return konturaKrado( konturaSrgb( lin ) ); }
float konturaLumo( vec3 koloro ) {
  return dot( koloro, vec3( ${0o155 / 0o1000}, ${0o556 / 0o1000}, ${0o45 / 0o1000} ) );
}
float konturaBando( float nivelo ) {
  #if __VERSION__ >= 300
    float lar = max( fwidth( nivelo ), ${0o1 / 0o20000} );
  #else
    float lar = ${0o1 / 0o40};
  #endif
  return floor( nivelo ) + smoothstep(
    ${0o1 / 0o2} - lar, ${0o1 / 0o2} + lar, fract( nivelo ) );
}
float konturaNiveloDeLumo( vec3 baza, vec3 lumita ) {
  return clamp( ( konturaLumo( konturaKrado( baza ) ) - konturaLumo( lumita ) )
    / KONTURA_PASXO, ${0o0}.0, ${0o4}.0 );
}
float konturaSmin( float a, float b, float k ) {
  float h = clamp( ${0o1 / 0o2} + ${0o1 / 0o2} * ( b - a ) / k, ${0o0}.0, ${0o1}.0 );
  return mix( b, a, h ) - k * h * ( ${0o1}.0 - h );
}
float konturaTransiro( float valoro, float limo ) {
  #if __VERSION__ >= 300
    float lar = max( fwidth( valoro ), ${0o1 / 0o20000} );
  #else
    float lar = ${0o1 / 0o40};
  #endif
  return smoothstep( limo - lar, limo + lar, valoro );
}
float konturaEnmeto( vec2 uv, float radio ) {
  vec2 q = abs( uv - vec2( ${0o1 / 0o2} ) ) - vec2( ${0o1 / 0o2} - radio );
  float dKvar = length( max( q, vec2( ${0o0}.0 ) ) )
    + min( max( q.x, q.y ), ${0o0}.0 ) - radio;
  return clamp( -dKvar * ${0o2}.0, ${0o0}.0, ${0o1}.0 );
}
vec2 konturaUvoDirekto( vec3 direkto, vec3 normalo, vec3 aksoU, vec3 aksoV ) {
  vec3 projekcio = direkto - normalo * dot( direkto, normalo );
  float longoU = dot( aksoU, aksoU );
  float krucProdukto = dot( aksoU, aksoV );
  float longoV = dot( aksoV, aksoV );
  float determinanto = longoU * longoV - krucProdukto * krucProdukto;
  if ( determinanto <= ${0o1 / 0o10000} ) return vec2( ${0o0}.0 );
  vec2 komponantoj = vec2(
    ( dot( projekcio, aksoU ) * longoV - dot( projekcio, aksoV ) * krucProdukto ) / determinanto,
    ( dot( projekcio, aksoV ) * longoU - dot( projekcio, aksoU ) * krucProdukto ) / determinanto );
  float komponantaLongo = length( komponantoj );
  if ( komponantaLongo <= ${0o1 / 0o10000} ) return vec2( ${0o0}.0 );
  return komponantoj / komponantaLongo * length( projekcio );
}
float konturaKampo( vec3 normalo, vec2 uv, vec3 pozicio, vec3 supo, vec3 lumo,
  vec3 bary, vec3 flanko ) {
  float suna = clamp( ${0o1 / 0o2} - dot( normalo, lumo ) * ${0o1 / 0o2},
    ${0o0}.0, ${0o1}.0 );
  // ⟨ វាលតែមួយគ្រប់វត្ថុ ៖ ខ្សែកោងចេញពីគែមក្រៅរបស់មុខ រុំចូលក្នុងតាមគែមនោះ 📃 ⟩
  float uvValida = step( ${0o1 / 0o20000}, length( uv ) );
  vec2 kUv = clamp( uv, vec2( ${0o0}.0 ), vec2( ${0o1}.0 ) );
  // ⟨ គោលក្នុងមុខ ៖ ទិសពន្លឺ និងកាមេរ៉ាបញ្ចាំងលើផ្ទៃកំណត់ចំណុចកណ្ដាល 📃 ⟩
  vec3 help = abs( dot( normalo, supo ) ) < ${0o7 / 0o10}
    ? supo : vec3( ${0o1}.0, ${0o0}.0, ${0o0}.0 );
  vec3 tanU = normalize( cross( help, normalo ) );
  vec3 tanV = cross( normalo, tanU );
  vec2 lumT = vec2( dot( lumo, tanU ), dot( lumo, tanV ) );
  vec3 kameraDirekto = normalize( -pozicio );
  vec2 vidT = vec2( dot( kameraDirekto, tanU ), dot( kameraDirekto, tanV ) );
  vec3 centroPozicio = pozicio;
  float distanco = length( pozicio );
  #if __VERSION__ >= 300
    vec2 uvoX = dFdx( uv );
    vec2 uvoY = dFdy( uv );
    vec3 pozicioX = dFdx( pozicio );
    vec3 pozicioY = dFdy( pozicio );
    float determinanto = uvoX.x * uvoY.y - uvoY.x * uvoX.y;
    if ( abs( determinanto ) > ${0o1 / 0o10000} ) {
      vec3 aksoU = ( pozicioX * uvoY.y - pozicioY * uvoX.y ) / determinanto;
      vec3 aksoV = ( pozicioY * uvoX.x - pozicioX * uvoY.x ) / determinanto;
      centroPozicio = pozicio + aksoU * ( ${0o1 / 0o2} - uv.x )
        + aksoV * ( ${0o1 / 0o2} - uv.y );
      kameraDirekto = normalize( -centroPozicio );
      distanco = length( centroPozicio );
      lumT = konturaUvoDirekto( lumo, normalo, aksoU, aksoV );
      vidT = konturaUvoDirekto( kameraDirekto, normalo, aksoU, aksoV );
    }
  #endif
  float zomskalo = clamp( distanco / ${0o30}.0, ${0o7 / 0o10}, ${0o11 / 0o10} );
  float tugskalo = clamp( distanco / ${0o30}.0, ${0o7 / 0o10}, ${0o5 / 0o4} );
  // ⟨ ខ្សែកោងជ្រុងមូលរុំចូលដោយបកប្រែជាន់តាមកាមេរ៉ានិងពន្លឺ 📃 ⟩
  float radio1 = ${0o3 / 0o20} * zomskalo;
  float limo1 = ${0o1 / 0o10} * zomskalo;
  float limo2 = ${0o5 / 0o20} * zomskalo;
  float limo3 = ${0o1 / 0o2} * zomskalo;
  // ⟨ បន្ថែមកាំតាមការរុញចូល ដើម្បីរក្សាជ្រុងមូលនៅគ្រប់ជាន់ 📃 ⟩
  float radio2 = min( radio1 + ( limo2 - limo1 ) * ${0o1 / 0o2},
    ${0o1 / 0o2 - 0o1 / 0o100} );
  float radio3 = min( radio1 + ( limo3 - limo1 ) * ${0o1 / 0o2},
    ${0o1 / 0o2 - 0o1 / 0o100} );
  vec2 tugVec = lumT + vidT * ${0o3 / 0o2};
  float tugDistanco = length( tugVec );
  vec2 direkto = tugVec / max( tugDistanco, ${0o1 / 0o10000} );
  float movo = min( tugDistanco * ${0o1 / 0o4}, ${0o1 / 0o20} ) * tugskalo;
  float en1 = konturaEnmeto( kUv - direkto * movo * ${0o1 / 0o4}, radio1 );
  float en2 = konturaEnmeto( kUv - direkto * movo * ${0o1}.0, radio2 );
  float en3 = konturaEnmeto( kUv - direkto * movo * ${0o7 / 0o4}, radio3 );
  float nivelo = ${0o3}.0
    - konturaTransiro( en1, limo1 )
    - konturaTransiro( en2, limo2 )
    - konturaTransiro( en3, limo3 )
    + suna * ${0o1 / 0o4};
  // ⟨ មុខត្រីកោណ ៖ ខ្សែកោងស្របនឹងគែមទាំងបី ជ្រុងមូលតាម smin 📃 ⟩
  if ( length( bary ) > ${0o1 / 0o20000} ) {
    vec2 of = ( lumT + vidT * ${0o3 / 0o2} ) * ${0o1 / 0o4};
    vec3 cb = vec3( ${0o1 / 0o3} )
      + vec3( of.x, of.y, -of.x - of.y ) * ${0o3 / 0o5};
    vec3 centroOfsetoT = cb - vec3( ${0o1 / 0o3} );
    float centroDistancoT = length( centroOfsetoT );
    vec3 direktoT = centroOfsetoT / max( centroDistancoT, ${0o1 / 0o10000} );
    float movoT = min( centroDistancoT * ${0o1 / 0o2}, ${0o1 / 0o24} ) * zomskalo;
    vec3 b1 = bary - direktoT * movoT * ${0o1 / 0o2};
    vec3 b2 = bary - direktoT * movoT * ${0o5 / 0o4};
    vec3 b3 = bary - direktoT * movoT * ${0o2}.0;
    float enT1 = clamp( konturaSmin( konturaSmin( b1.x, b1.y, ${0o1 / 0o10} ),
      b1.z, ${0o1 / 0o10} ) * ${0o3}.0, ${0o0}.0, ${0o1}.0 );
    float enT2 = clamp( konturaSmin( konturaSmin( b2.x, b2.y, ${0o1 / 0o10} ),
      b2.z, ${0o1 / 0o10} ) * ${0o3}.0, ${0o0}.0, ${0o1}.0 );
    float enT3 = clamp( konturaSmin( konturaSmin( b3.x, b3.y, ${0o1 / 0o10} ),
      b3.z, ${0o1 / 0o10} ) * ${0o3}.0, ${0o0}.0, ${0o1}.0 );
    nivelo = ${0o3}.0
      - konturaTransiro( enT1, ${0o1 / 0o10} * zomskalo )
      - konturaTransiro( enT2, ${0o5 / 0o20} * zomskalo )
      - konturaTransiro( enT3, ${0o1 / 0o2} * zomskalo )
      + suna * ${0o1 / 0o4};
  } else if ( length( flanko ) > ${0o1 / 0o20000} ) {
    // ⟨ ចិញ្ចើមជាន់លើ ៖ បួនម្ខាងដាច់ពីគ្នា ខ្សែកោងតែលើម្ខាងដែលពន្លឺប៉ះ 📃 ⟩
    float lit = clamp( dot( flanko, lumo ) * ${0o1 / 0o2} + ${0o1 / 0o2},
      ${0o0}.0, ${0o1}.0 );
    nivelo = mix( suna * ${0o1 / 0o2}, nivelo,
      smoothstep( ${0o2 / 0o5}, ${0o7 / 0o10}, lit ) );
  }
  return mix( suna * ${0o1 / 0o2}, nivelo, uvValida );
}
vec3 konturaKoloro( vec3 bazaLin, float nivelo ) {
  return max( vec3( ${0o0}.0 ),
    konturaBazo( bazaLin ) - vec3( konturaBando( nivelo ) * KONTURA_PASXO ) );
}
`;

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
${KONTURA_GLSL}
varying vec3 vDir;
uniform vec3 uTop,uMid,uBot,uSunCol,uSunDir;
void main(){vec3 d=normalize(vDir);float h=clamp(d.y,-0.203125,1.0);
// ⟨ កម្ពស់ជាថ្នាក់ ៖ មេឃឆ្នូតរលូនតាម fwidth 📃 ⟩
float hb=konturaBando(h*${0o20}.0)/${0o20}.0;
vec3 koloro=mix(uBot,uMid,smoothstep(-0.015625,0.234375,hb));koloro=mix(koloro,uTop,smoothstep(0.1875,0.71875,hb));
float suna=konturaBando(pow(max(dot(d,normalize(uSunDir)),0.0),28.0)*${0o4}.0)/${0o4}.0;
koloro=konturaKrado(koloro+uSunCol*suna);
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
  // ⟨ សន្ទះគូរទាំងអស់ទទួលជំហានពណ៌ផ្ទៃ និងពន្លឺចង្កៀងដូចគ្នា 📃 ⟩
  aplikiLampaFalon();
  if ( !THREE.ShaderChunk.uv_pars_vertex.includes( "vKonturaUv" ) ) {
    // ⟨ ផ្ញើ uv ទៅគ្រប់សម្ភារៈស្តង់ដារ ៖ ជម្រាលកោងតាមគែមលើ-ក្រោមគ្រប់វត្ថុ គ្មានផ្លូវដាច់ដោយឡែក 📃 ⟩
    THREE.ShaderChunk.uv_pars_vertex += `
      varying vec2 vKonturaUv;
      varying vec3 vKonturaPoz;
      #ifndef USE_UV1
        attribute vec2 uv1;
      #endif
      attribute float aKonturaKovrilo;
      attribute vec4 aKonturaEkstra;
      varying vec3 vKonturaBary;
      varying vec3 vKonturaFlanko;
    `;
    THREE.ShaderChunk.uv_vertex += `
      vKonturaUv = uv;
      // ⟨ uv1 គឺផ្ទៃពេញ ។ តម្លៃវិជ្ជមានជ្រើសតែផ្នែកដែលមិនត្រូវបានគ្រប 📃 ⟩
      if ( aKonturaKovrilo < -0.5 ) {
        vKonturaUv = uv1;
      } else if ( aKonturaKovrilo > 0.0 ) {
        vKonturaUv.y = ( uv.y - aKonturaKovrilo ) / max( 1.0 - aKonturaKovrilo, 0.000030517578125 );
      }
      #ifdef USE_INSTANCING
        vKonturaPoz = ( modelViewMatrix * instanceMatrix * vec4( position, 1.0 ) ).xyz;
      #else
        vKonturaPoz = ( modelViewMatrix * vec4( position, 1.0 ) ).xyz;
      #endif
      vKonturaBary = aKonturaEkstra.w > 0.5 ? vec3( 0.0 ) : aKonturaEkstra.xyz;
      #ifdef USE_INSTANCING
        vKonturaFlanko = aKonturaEkstra.w > 0.5 ? normalize( mat3( modelViewMatrix ) * mat3( instanceMatrix ) * aKonturaEkstra.xyz ) : vec3( 0.0 );
      #else
        vKonturaFlanko = aKonturaEkstra.w > 0.5 ? normalize( mat3( modelViewMatrix ) * aKonturaEkstra.xyz ) : vec3( 0.0 );
      #endif
    `;
    THREE.ShaderChunk.uv_pars_fragment += "\nvarying vec2 vKonturaUv;\nvarying vec3 vKonturaPoz;\nvarying vec3 vKonturaBary;\nvarying vec3 vKonturaFlanko;\n";
  }
  if ( !THREE.ShaderChunk.color_pars_fragment.includes( "konturaKampo" ) ) {
    // ⟨ មុខងាររួមនៅកំពូល fragment ៖ សម្ភារៈជាប់ខ្លួនទាំងអស់ប្រើវាលតែមួយ 📃 ⟩
    THREE.ShaderChunk.color_pars_fragment = KONTURA_GLSL + THREE.ShaderChunk.color_pars_fragment;
  }
  if ( !THREE.ShaderChunk.colorspace_fragment.includes( "konturaKampo" ) ) {
    // ⟨ ផ្ទៃជាប់ខ្លួនទាំងអស់ ៖ standard physical phong lambert toon basic និង matcap 📃 ⟩
    THREE.ShaderChunk.colorspace_fragment += `
      #if defined( STANDARD ) || defined( PHONG ) || defined( LAMBERT ) || defined( TOON ) || defined( BASIC ) || defined( MATCAP )
        #if defined( BASIC ) || defined( MATCAP )
          vec3 konturaNormalo = normalize( cross( dFdx( vKonturaPoz ), dFdy( vKonturaPoz ) ) )
            * ( float( gl_FrontFacing ) * ${0o2}.0 - ${0o1}.0 );
        #else
          #ifdef FLAT_SHADED
            vec3 konturaNormalo = normal;
          #else
            vec3 konturaNormalo = normalize( vNormal )
              * ( float( gl_FrontFacing ) * ${0o2}.0 - ${0o1}.0 );
          #endif
        #endif
        vec3 konturaSupo = normalize( viewMatrix[ 1 ].xyz );
        #if !defined( BASIC ) && !defined( MATCAP ) && NUM_DIR_LIGHTS > 0
          vec3 konturaLumo = directionalLights[ 0 ].direction;
        #else
          vec3 konturaLumo = normalize( vec3( ${0o1 / 0o2}, ${0o3 / 0o4}, ${0o1 / 0o4} ) );
        #endif
        gl_FragColor.rgb = konturaKoloro( diffuseColor.rgb,
          konturaKampo( konturaNormalo, vKonturaUv, vKonturaPoz, konturaSupo,
            konturaLumo, vKonturaBary, vKonturaFlanko ) );
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
