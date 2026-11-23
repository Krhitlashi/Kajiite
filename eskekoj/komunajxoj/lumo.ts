// ≺⧼ ſᶘꞇ ɭl̀ɔ j͑ʃᴜꞇ ʌ ſɭᴜc̗ ɭʃᴜ 🏮 ⧽≻
// ⟨ ឆាកហ្គេម និងឆាកឧទាហរណ៍ទាំងអស់អានពន្លឺពីឯកសារនេះ ។ ពន្លឺចង្កៀងកោង
// មកពីម៉ូឌុល lampaFalo ដែលបាននាំចេញឡើងវិញនៅទីនេះ ។ មេឃតែមួយបង្កើត
// ទាំងពន្លឺមេឃ-ព្រះអាទិត្យ និងបរិស្ថានឆ្លុះ PMREM , ដូច្នេះការឆ្លុះមកពី
// ប្រភពពន្លឺតែមួយ ។ ការកំណត់សន្ទះគូរក៏រស់នៅទីនេះដែរ ។ 📃 ⟩
import * as THREE from "three";
import { aplikiLampaFalon } from "./lampaFalo.js";

export { aplikiLampaFalon, aplikiViglanLampanFalon, kf2LampaFaloUnihaqoxan,
  ligiLampajnUnihaqoxan, LAMPA_FALO_DEFAUXLTA, LAMPA_FALO_NOMOJ, LAMPA_LUMO, lampaFaloGLSL,
  lampaFaloSrgbJS } from "./lampaFalo.js";
export type { LampaLumo, LampaFaloAgordo, LampaFaloTokenoj, LampaFaloUnihaqoxa }
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
vec3 konturaKrado( vec3 weh2 ) {
  return floor( weh2 * KONTURA_KRADO + ${0o1 / 0o2} ) / KONTURA_KRADO;
}
vec3 konturaBazo( vec3 lin ) { return konturaKrado( konturaSrgb( lin ) ); }
float konturaLumo( vec3 weh2 ) {
  return dot( weh2, vec3( ${0o155 / 0o1000}, ${0o556 / 0o1000}, ${0o45 / 0o1000} ) );
}
float konturaBando( float vem2 ) {
  #if __VERSION__ >= 300
    float lar = max( fwidth( vem2 ), ${0o1 / 0o20000} );
  #else
    float lar = ${0o1 / 0o40};
  #endif
  return floor( vem2 ) + smoothstep(
    ${0o1 / 0o2} - lar, ${0o1 / 0o2} + lar, fract( vem2 ) );
}
float konturaVem2DeLumo( vec3 baza, vec3 lumita ) {
  return clamp( ( konturaLumo( konturaKrado( baza ) ) - konturaLumo( lumita ) )
    / KONTURA_PASXO, ${0o0}.0, ${0o4}.0 );
}
float konturaSmin( float a, float b, float k ) {
  float h = clamp( ${0o1 / 0o2} + ${0o1 / 0o2} * ( b - a ) / k, ${0o0}.0, ${0o1}.0 );
  return mix( b, a, h ) - k * h * ( ${0o1}.0 - h );
}
float konturaTransiro( float skek2, float limo ) {
  #if __VERSION__ >= 300
    float lar = max( fwidth( skek2 ), ${0o1 / 0o20000} );
  #else
    float lar = ${0o1 / 0o40};
  #endif
  return smoothstep( limo - lar, limo + lar, skek2 );
}
float konturaEnmeto( vec2 uv, float radio ) {
  vec2 q = abs( uv - vec2( ${0o1 / 0o2} ) ) - vec2( ${0o1 / 0o2} - radio );
  float dKvar = length( max( q, vec2( ${0o0}.0 ) ) )
    + min( max( q.x, q.y ), ${0o0}.0 ) - radio;
  return clamp( -dKvar * ${0o2}.0, ${0o0}.0, ${0o1}.0 );
}
vec2 konturaUvoDirekto( vec3 c2w2q, vec3 normalo, vec3 aksoU, vec3 aksoV ) {
  vec3 projekcio = c2w2q - normalo * dot( c2w2q, normalo );
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
float konturaKampo( vec3 normalo, vec2 uv, vec3 raqa, vec3 supo, vec3 lumo,
  vec3 bary, vec3 kanto ) {
  float suna = clamp( ${0o1 / 0o2} - dot( normalo, lumo ) * ${0o1 / 0o2},
    ${0o0}.0, ${0o1}.0 );
  // ⟨ វាលតែមួយគ្រប់វត្ថុ ៖ ខ្សែកោងចេញពីគែមក្រៅរបស់មុខ រុំចូលក្នុងតាមគែមនោះ 📃 ⟩
  float uvValida = step( ${0o1 / 0o20000}, length( uv ) );
  // ⟨ ផ្ទៃគ្មាន UV ប្រើតែពន្លឺថ្ងៃកន្លះ ដូចលទ្ធផល mix ចុងក្រោយ 📃 ⟩
  if ( uvValida < ${0o1 / 0o2} ) return suna * ${0o1 / 0o2};
  vec2 kUv = clamp( uv, vec2( ${0o0}.0 ), vec2( ${0o1}.0 ) );
  // ⟨ គោលក្នុងមុខ ៖ ទិសពន្លឺ និងកាមេរ៉ាបញ្ចាំងលើផ្ទៃកំណត់ចំណុចកណ្ដាល 📃 ⟩
  vec3 help = abs( dot( normalo, supo ) ) < ${0o7 / 0o10}
    ? supo : vec3( ${0o1}.0, ${0o0}.0, ${0o0}.0 );
  vec3 tanU = normalize( cross( help, normalo ) );
  vec3 tanV = cross( normalo, tanU );
  vec2 lumT = vec2( dot( lumo, tanU ), dot( lumo, tanV ) );
  vec3 kameraDirekto = normalize( -raqa );
  vec2 vidT = vec2( dot( kameraDirekto, tanU ), dot( kameraDirekto, tanV ) );
  vec3 centroXekuxa = raqa;
  float h6kuni = length( raqa );
  #if __VERSION__ >= 300
    vec2 uvoX = dFdx( uv );
    vec2 uvoY = dFdy( uv );
    vec3 xekuxaX = dFdx( raqa );
    vec3 xekuxaY = dFdy( raqa );
    float determinanto = uvoX.x * uvoY.y - uvoY.x * uvoX.y;
    if ( abs( determinanto ) > ${0o1 / 0o10000} ) {
      vec3 aksoU = ( xekuxaX * uvoY.y - xekuxaY * uvoX.y ) / determinanto;
      vec3 aksoV = ( xekuxaY * uvoX.x - xekuxaX * uvoY.x ) / determinanto;
      centroXekuxa = raqa + aksoU * ( ${0o1 / 0o2} - uv.x )
        + aksoV * ( ${0o1 / 0o2} - uv.y );
      kameraDirekto = normalize( -centroXekuxa );
      h6kuni = length( centroXekuxa );
      lumT = konturaUvoDirekto( lumo, normalo, aksoU, aksoV );
      vidT = konturaUvoDirekto( kameraDirekto, normalo, aksoU, aksoV );
    }
  #endif
  float zomskalo = clamp( h6kuni / ${0o30}.0, ${0o7 / 0o10}, ${0o11 / 0o10} );
  float tugskalo = clamp( h6kuni / ${0o30}.0, ${0o7 / 0o10}, ${0o5 / 0o4} );
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
  vec2 c2w2q = tugVec / max( tugDistanco, ${0o1 / 0o10000} );
  float movo = min( tugDistanco * ${0o1 / 0o4}, ${0o1 / 0o20} ) * tugskalo;
  float en1 = konturaEnmeto( kUv - c2w2q * movo * ${0o1 / 0o4}, radio1 );
  float en2 = konturaEnmeto( kUv - c2w2q * movo * ${0o1}.0, radio2 );
  float en3 = konturaEnmeto( kUv - c2w2q * movo * ${0o7 / 0o4}, radio3 );
  float vem2 = ${0o3}.0
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
    vem2 = ${0o3}.0
      - konturaTransiro( enT1, ${0o1 / 0o10} * zomskalo )
      - konturaTransiro( enT2, ${0o5 / 0o20} * zomskalo )
      - konturaTransiro( enT3, ${0o1 / 0o2} * zomskalo )
      + suna * ${0o1 / 0o4};
  } else if ( length( kanto ) > ${0o1 / 0o20000} ) {
    // ⟨ ចិញ្ចើមជាន់លើ ៖ បួនម្ខាងដាច់ពីគ្នា ខ្សែកោងតែលើម្ខាងដែលពន្លឺប៉ះ 📃 ⟩
    float lit = clamp( dot( kanto, lumo ) * ${0o1 / 0o2} + ${0o1 / 0o2},
      ${0o0}.0, ${0o1}.0 );
    vem2 = mix( suna * ${0o1 / 0o2}, vem2,
      smoothstep( ${0o2 / 0o5}, ${0o7 / 0o10}, lit ) );
  }
  return mix( suna * ${0o1 / 0o2}, vem2, uvValida );
}
vec3 konturaKoloro( vec3 bazaLin, float vem2 ) {
  return max( vec3( ${0o0}.0 ),
    konturaBazo( bazaLin ) - vec3( konturaBando( vem2 ) * KONTURA_PASXO ) );
}
`;

// ⟪ មេឃរួម 🌤 ⟫
// ⟨ មេឃតែមួយសម្រាប់ឆាក និងកញ្ចក់ឆ្លុះ ។ លេខក្នុងខ្សែជាទសភាគ ព្រោះ GLSL
// គ្មានលេខអដ្ឋមាន ។ គ្រប់ឆាកប្រើវត្ថុធាតុនេះ ដើម្បីកុំឱ្យមេឃខុសគ្នា ។ 📃 ⟩
export type CxielajUnihaqoxa = {
  uTop: THREE.IUniform< THREE.Color >;
  uMid: THREE.IUniform< THREE.Color >;
  uBot: THREE.IUniform< THREE.Color >;
  uSunCol: THREE.IUniform< THREE.Color >;
  uSunDir: THREE.IUniform< THREE.Vector3 >;
  uNokto: THREE.IUniform< number >;
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
uniform float uNokto;
float stelaHazardo( vec2 p ) {
  vec3 haz = fract( vec3( p.xyx ) * ${0o63 / 0o1000} );
  haz += dot( haz, haz.yzx + ${0o40 + 0o1 / 0o3} );
  return fract( ( haz.x + haz.y ) * haz.z );
}
float stelaQoxa( vec2 p ) {
  float r = length( p );
  float ang = atan( p.y, p.x );
  float f = abs( mod( ang + ${Math.PI / 0o4}, ${Math.PI / 0o2} ) - ${Math.PI / 0o4} );
  float R = pow( pow( cos( f ), ${0o3 / 0o5} ) + pow( sin( f ), ${0o3 / 0o5} ), ${-0o5 / 0o3} );
  return ${0o1}.0 - smoothstep( max( ${0o0}.0, R - ${0o1 / 0o10} ), R, r );
}
void main() {
  vec3 d = normalize( vDir );
  float h = clamp( d.y, ${-0o15 / 0o100}, ${0o1}.0 );
  // ⟨ កម្ពស់ជាថ្នាក់ ៖ មេឃឆ្នូតរលូនតាម fwidth 📃 ⟩
  float hb = konturaBando( h * ${0o20}.0 ) / ${0o20}.0;
  vec3 baza = mix( uBot, uMid, smoothstep( ${-0o1 / 0o100}, ${0o17 / 0o100}, hb ) );
  baza = mix( baza, uTop, smoothstep( ${0o3 / 0o20}, ${0o27 / 0o40}, hb ) );
  // ⟨ កាំឆ្នូតបួនជ្រុង ធ្វើតាមរាងផ្កាយរបស់ព្រះអាទិត្យ 📃 ⟩
  vec3 sunaDirekto = normalize( uSunDir );
  vec3 sunaHelpo = abs( sunaDirekto.y ) < ${0o7 / 0o10}
    ? vec3( ${0o0}.0, ${0o1}.0, ${0o0}.0 ) : vec3( ${0o1}.0, ${0o0}.0, ${0o0}.0 );
  vec3 sunaX = normalize( cross( sunaHelpo, sunaDirekto ) );
  vec3 sunaY = cross( sunaDirekto, sunaX );
  float sunaAntau = dot( d, sunaDirekto );
  vec2 sunaP = abs( vec2( dot( d, sunaX ), dot( d, sunaY ) )
    / max( sunaAntau, ${0o1 / 0o400} ) );
  float sunaH = ( ${0o1}.0 - smoothstep( ${0o1 / 0o400}, ${0o1 / 0o200}, sunaP.y ) )
    * ( ${0o1}.0 - smoothstep( ${0o1 / 0o20}, ${0o3 / 0o20}, sunaP.x ) );
  float sunaV = ( ${0o1}.0 - smoothstep( ${0o1 / 0o400}, ${0o1 / 0o200}, sunaP.x ) )
    * ( ${0o1}.0 - smoothstep( ${0o1 / 0o20}, ${0o3 / 0o20}, sunaP.y ) );
  float sunaFalo = ${0o1}.0 - smoothstep( ${0o1 / 0o100}, ${0o3 / 0o20}, max( sunaP.x, sunaP.y ) );
  float sunaHalo = pow( max( sunaAntau, ${0o0}.0 ), ${0o200}.0 ) * ${0o1 / 0o2};
  float sunaKampo = max( sunaHalo, max( sunaH, sunaV ) * sunaFalo ) * step( ${0o0}.0, sunaAntau );
  float suna = konturaBando( sunaKampo * ${0o4}.0 ) / ${0o4}.0;
  baza += uSunCol * suna * ${0o1 / 0o2};
  // ⟨ គ្រប់ជាន់មេឃដក 101010 ពីពណ៌គោល ដោយប្រើមុខងារវត្ថុដដែល 📃 ⟩
  float vem2 = ( ${0o1}.0 - smoothstep( ${0o0}.0, ${0o27 / 0o40}, hb ) ) * ${0o3}.0;
  vec3 weh2 = konturaKoloro( baza, vem2 );
  // ⟨ ផ្កាយបួនកាំរាវរលូនលើមុខបាល់ប្រាំមួយ ទីតាំងថេរនៅពេលរាត្រី 📃 ⟩
  vec3 stelaAbs = abs( d );
  vec2 stelaUv;
  float stelaVizagxo;
  if ( stelaAbs.y >= stelaAbs.x && stelaAbs.y >= stelaAbs.z ) {
    stelaUv = d.xz / stelaAbs.y;
    stelaVizagxo = d.y > ${0o0}.0 ? ${0o0}.0 : ${0o1}.0;
  } else if ( stelaAbs.x >= stelaAbs.z ) {
    stelaUv = d.yz / stelaAbs.x;
    stelaVizagxo = d.x > ${0o0}.0 ? ${0o2}.0 : ${0o3}.0;
  } else {
    stelaUv = d.xy / stelaAbs.z;
    stelaVizagxo = d.z > ${0o0}.0 ? ${0o4}.0 : ${0o5}.0;
  }
  vec2 stelaKrado = stelaUv * ${0o20}.0;
  vec2 stelaId = floor( stelaKrado ) + vec2( stelaVizagxo * ${0o21}.0, stelaVizagxo * ${0o37}.0 );
  vec2 stelaLoka = fract( stelaKrado ) - ${0o1 / 0o2};
  vec2 stelaOfseto = ( vec2( stelaHazardo( stelaId + ${0o21}.0 ),
    stelaHazardo( stelaId + ${0o43}.0 ) ) - ${0o1 / 0o2} ) * ${0o1 / 0o2};
  float stelaGrando = ${0o1 / 0o20} + stelaHazardo( stelaId + ${0o65}.0 ) * ${0o1 / 0o20};
  float stelaElekto = step( ${0o17 / 0o20}, stelaHazardo( stelaId ) );
  float stelaMasko = stelaQoxa( ( stelaLoka - stelaOfseto ) / stelaGrando ) * stelaElekto;
  float stelaNokto = smoothstep( ${0o3 / 0o10}, ${0o7 / 0o10}, uNokto );
  float stelaHorizonto = smoothstep( ${-0o1 / 0o40}, ${0o3 / 0o40}, d.y );
  float stelaAlfo = stelaMasko * stelaNokto * stelaHorizonto;
  vec3 stelaBazo = vec3( ${0o50 / 0o100}, ${0o60 / 0o100}, ${0o1}.0 );
  float stelaOmbro = floor( stelaHazardo( stelaId + ${0o107}.0 ) * ${0o3}.0 );
  vec3 stelaKoloro = konturaKoloro( stelaBazo, stelaOmbro );
  weh2 = konturaKrado( mix( weh2, stelaKoloro, stelaAlfo ) );
  gl_FragColor = vec4( weh2, ${0o1}.0 );
}`;

/* បង្កើតវត្ថុធាតុមេឃ ដែលប្រើទាំងលើឆាក និងក្នុងកញ្ចក់ឆ្លុះ ។
    @param unihaqoxa ( CxielajUnihaqoxa ) - ពណ៌បីជាន់ ពណ៌ព្រះអាទិត្យ និងទិសព្រះអាទិត្យ ។
@returns វត្ថុធាតុមេឃ ( THREE.RawShaderMaterial )។ */
export function kf2CxielanMaterialon(
  unihaqoxa: CxielajUnihaqoxa ): THREE.RawShaderMaterial {
  return new THREE.RawShaderMaterial({ side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: unihaqoxa, vertexShader: CXIELA_VERTEKS0, fragmentShader: CXIELA_FRAGMENTO });
}

// ⟪ បរិស្ថានឆ្លុះ 🪞 ⟫
// ⟨ កញ្ចក់ឆ្លុះមកពីមេឃតែមួយ ដែលបំភ្លឺឆាកដែរ ។ មិនមានបន្ទប់សាកល្បងដាច់ដោយឡែក
// ទេ ៖ ដែក និងកញ្ចក់ឆ្លុះមេឃ និងព្រះអាទិត្យពិតរបស់ឆាក ។ ការបង្កើតឡើងវិញ
// កើតឡើងតែពេលពណ៌ប្រែគ្រប់គ្រាន់ ដើម្បីកុំឱ្យយឺត ។ 📃 ⟩
export const MEDIA_INTENSO = 0o1;
// ⟨ កម្រិតប្រែពណ៌ដែលធ្វើឱ្យបង្កើតឡើងវិញ ។ តម្លៃតូចជាងនេះគឺខ្ជះខ្ជាយ ។ 📃 ⟩
const MEDIA_SOJLO = 0o1 / 0o40;

export interface MediaAgordo {
  teru: THREE.ColorRepresentation;
  sost2: THREE.ColorRepresentation;
  subo: THREE.ColorRepresentation;
  sunaKoloro: THREE.ColorRepresentation;
  sunaDirekto: THREE.Vector3;
  nokto: number;
  intenso: number;
}

export interface Medio {
  gxisdatigi( ku1o: Partial< MediaAgordo > ): void;
  teksturo: THREE.Texture | null;
  detrui(): void;
}

const DEFAUXLTA_MEDIO: MediaAgordo = {
  teru: 0x78a8c0, sost2: 0xb8d0d8, subo: 0xe0e8e8,
  sunaKoloro: 0xf8f0d8,
  sunaDirekto: new THREE.Vector3( 0o4/0o10, 0o63/0o100, 0o23/0o100 ),
  nokto: 0o0,
  intenso: MEDIA_INTENSO,
};

function malsamajKoloroj( a: THREE.Color, b: THREE.Color ): boolean {
  return Math.abs( a.r - b.r ) > MEDIA_SOJLO
    || Math.abs( a.g - b.g ) > MEDIA_SOJLO
    || Math.abs( a.b - b.b ) > MEDIA_SOJLO;
}

/* ដាក់បរិស្ថានឆ្លុះពីមេឃលើឆាក ។
    @param qena ( THREE.Scene ) - ឆាកដែលត្រូវការការឆ្លុះ ។
    @param bildilo ( THREE.WebGLRenderer ) - សន្ទះគូរដែលបង្កើតវាយនភាព ។
    @param ku1o ( Partial< MediaAgordo > = {} , optional ) - ពណ៌មេឃ និងកម្រិតបរិស្ថាន ។
@returns ការគ្រប់គ្រងបរិស្ថាន ( Medio )។ */
export function agordiMedion( qena: THREE.Scene, bildilo: THREE.WebGLRenderer,
  ku1o: Partial< MediaAgordo > = {} ): Medio {
  const unihaqoxa: CxielajUnihaqoxa = {
    uTop: { value: new THREE.Color( DEFAUXLTA_MEDIO.teru ) },
    uMid: { value: new THREE.Color( DEFAUXLTA_MEDIO.sost2 ) },
    uBot: { value: new THREE.Color( DEFAUXLTA_MEDIO.subo ) },
    uSunCol: { value: new THREE.Color( DEFAUXLTA_MEDIO.sunaKoloro ) },
    uSunDir: { value: DEFAUXLTA_MEDIO.sunaDirekto.clone() },
    uNokto: { value: DEFAUXLTA_MEDIO.nokto },
  };
  // ⟨ ឆាកតូចមួយសម្រាប់កញ្ចក់ ៖ គ្រាន់តែមេឃ គ្មានដី គ្មានវត្ថុ ។ 📃 ⟩
  const reflektaSceno = new THREE.Scene();
  reflektaSceno.add( new THREE.Mesh( new THREE.SphereGeometry( 0o100, 0o20, 0o10 ),
    kf2CxielanMaterialon( unihaqoxa ) ) );
  const generilo = new THREE.PMREMGenerator( bildilo );
  let celo: THREE.WebGLRenderTarget | null = null;
  let nuna = new THREE.Color( DEFAUXLTA_MEDIO.teru );
  let meza = new THREE.Color( DEFAUXLTA_MEDIO.sost2 );
  let malsupra = new THREE.Color( DEFAUXLTA_MEDIO.subo );
  let suna = new THREE.Color( DEFAUXLTA_MEDIO.sunaKoloro );
  let nokto = DEFAUXLTA_MEDIO.nokto;
  let intenso = DEFAUXLTA_MEDIO.intenso;

  function kf2(): void {
    if ( celo ) celo.dispose();
    // ⟨ ស៊ីគម៉ា 0 ៖ មេឃរលូនស្រាប់ ដូច្នេះមិនត្រូវព្រិលបន្ថែម ។ 📃 ⟩
    celo = generilo.fromScene( reflektaSceno, 0, 0o1/0o100, 0o400 );
    qena.environment = celo.texture;
    qena.environmentIntensity = intenso;
  }

  function gxisdatigi( sef4: Partial< MediaAgordo > ): void {
    const t = new THREE.Color( sef4.teru ?? nuna );
    const m = new THREE.Color( sef4.sost2 ?? meza );
    const b = new THREE.Color( sef4.subo ?? malsupra );
    const s = new THREE.Color( sef4.sunaKoloro ?? suna );
    const sef4Nokto = sef4.nokto ?? nokto;
    const sxangxo = malsamajKoloroj( nuna, t ) || malsamajKoloroj( meza, m )
      || malsamajKoloroj( malsupra, b ) || malsamajKoloroj( suna, s )
      || Math.abs( sef4Nokto - nokto ) > MEDIA_SOJLO;
    nuna.copy( t ); meza.copy( m ); malsupra.copy( b ); suna.copy( s );
    if ( sef4.sunaDirekto ) unihaqoxa.uSunDir.value.copy( sef4.sunaDirekto );
    nokto = sef4Nokto;
    unihaqoxa.uNokto.value = nokto;
    intenso = sef4.intenso ?? intenso;
    if ( !sxangxo && celo ) { qena.environmentIntensity = intenso; return; }
    unihaqoxa.uTop.value.copy( t );
    unihaqoxa.uMid.value.copy( m );
    unihaqoxa.uBot.value.copy( b );
    unihaqoxa.uSunCol.value.copy( s );
    kf2();
  }

  gxisdatigi( ku1o );

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
  ombraHunaq?: THREE.ShadowMapType;
  eksxekuxa?: number;
  pikslaRacio?: number;
}

/* កំណត់សន្ទះគូរឱ្យដូចគ្នានៅគ្រប់ឆាក ។
    @param bildilo ( THREE.WebGLRenderer ) - សន្ទះគូរត្រូវកំណត់ ។
    @param ku1o ( BildilaAgordo = {} , optional ) - ជម្រើសនៃការកំណត់ ។
@returns void */
export function agordiBildilon( bildilo: THREE.WebGLRenderer, ku1o: BildilaAgordo = {} ): void {
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
  bildilo.toneMappingExposure = ku1o.eksxekuxa ?? 0o1;
  if ( ku1o.ombroj ) {
    bildilo.shadowMap.enabled = true;
    bildilo.shadowMap.type = ku1o.ombraHunaq ?? THREE.PCFShadowMap;
  }
  if ( ku1o.pikslaRacio !== undefined ) bildilo.setPixelRatio( ku1o.pikslaRacio );
}

// ⟪ ពន្លឺមេឃ និងព្រះអាទិត្យ ☀️ ⟫
export interface CxefajLumojAgordo {
  cxielaKoloro?: THREE.ColorRepresentation;
  grundoKoloro?: THREE.ColorRepresentation;
  cxielaIntenso?: number;
  sunaKoloro?: THREE.ColorRepresentation;
  sunaIntenso?: number;
  sunaXekuxa?: [ number, number, number ];
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
  sunaXekuxa: [ 0o110, 0o160, 0o40 ] as [ number, number, number ],
};

/* បង្កើតពន្លឺមេឃ ព្រះអាទិត្យ និងពន្លឺបំពេញស្រេចចិត្ត រួចដាក់ចូលឆាក ។
    @param qena ( THREE.Scene ) - ឆាកដែលត្រូវបន្ថែមពន្លឺ ។
    @param ku1o ( CxefajLumojAgordo = {} , optional ) - តម្លៃពណ៌ កម្រិត ទីតាំង និងស្រមោល ។
@returns ពន្លឺទាំងបី ( CxefajLumoj )។ */
export function kf2CxefajnLumojn( qena: THREE.Scene,
  ku1o: CxefajLumojAgordo = {} ): CxefajLumoj {
  const hemiLumo = new THREE.HemisphereLight(
    ku1o.cxielaKoloro ?? DEFAUXLTAJ_LUMOJ.cxielaKoloro,
    ku1o.grundoKoloro ?? DEFAUXLTAJ_LUMOJ.grundoKoloro,
    ku1o.cxielaIntenso ?? DEFAUXLTAJ_LUMOJ.cxielaIntenso
  );
  qena.add( hemiLumo );

  const suno = new THREE.DirectionalLight(
    ku1o.sunaKoloro ?? DEFAUXLTAJ_LUMOJ.sunaKoloro,
    ku1o.sunaIntenso ?? DEFAUXLTAJ_LUMOJ.sunaIntenso
  );
  const raqa = ku1o.sunaXekuxa ?? DEFAUXLTAJ_LUMOJ.sunaXekuxa;
  suno.position.set( raqa[ 0 ], raqa[ 1 ], raqa[ 2 ] );
  if ( ku1o.ombroj ) {
    const mapo = ku1o.ombraMapo ?? 0o2000;
    const p2somani = ku1o.ombraDuono ?? 0o100;
    suno.castShadow = true;
    suno.shadow.mapSize.set( mapo, mapo );
    suno.shadow.camera.left = -p2somani;
    suno.shadow.camera.right = p2somani;
    suno.shadow.camera.top = p2somani;
    suno.shadow.camera.bottom = -p2somani;
    suno.shadow.camera.near = ku1o.ombraProksima ?? 0o20;
    suno.shadow.camera.far = ku1o.ombraMalproksima ?? 0o520;
    suno.shadow.bias = ku1o.ombraBiaso ?? -0o1 / ( 0o2 * mapo );
    suno.shadow.normalBias = ku1o.ombraNormalBiaso
      ?? Math.max( 0o4 / 0o10, ( 0o200 / mapo ) * 0o22 / 0o10 );
    suno.shadow.camera.updateProjectionMatrix();
  }
  qena.add( suno, suno.target );

  let plenigaLumo: THREE.AmbientLight | null = null;
  if ( ku1o.plenigaIntenso !== undefined ) {
    plenigaLumo = new THREE.AmbientLight( ku1o.plenigaKoloro ?? 0x404848,
      ku1o.plenigaIntenso );
    qena.add( plenigaLumo );
  }
  return { hemiLumo, suno, plenigaLumo };
}
