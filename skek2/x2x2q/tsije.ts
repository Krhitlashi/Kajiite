// ≺⧼ ſᶘꞇ ɭl̀ɔ j͑ʃᴜꞇ ʌ ſɭᴜc̗ ɭʃᴜ 🏮 ⧽≻
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭı ,
// ſᶘɹ ſɭᴜ , ꞙɭɿ ,
// ſᶘɹ ſɭᴜ , ꞙɭц ,
// ſᶘɹ ſɭᴜ , ꞙɭэ , 📃 ⟩
import * as THREE from "three";
import { ku1oSotlakak } from "./so3akak.js";

export { ku1oSotlakak, ku1oPufosakanSotlakak, kf2SotlakakUnihaqoxan,
  c2kSotlakakUnihaqoxan, SO3AKAKTAJ2, SO3AKAKKSAKAJ, HUFWUK2TSIJE, so3akakGLSL,
  so3akakSrgbJS } from "./so3akak.js";
export type { Hufwuk2Tsije, SotlakakKu1o, SotlakakEsxaq, SotlakakUnihaqoxa }
  from "./so3akak.js";

// ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭı , 📃 ⟩
export const KONTURAGLSL = `
const float KONTURATONA = ${0o20 / 0o377};
const float KONTURAQOX2N2K = ${0o377 / 0o10};
vec3 konturaSrgb( vec3 lin ) {
  return mix( lin * ${0o147 / 0o10},
    ${0o104 / 0o100} * pow( lin, vec3( ${0o5 / 0o14} ) ) - ${0o7 / 0o200},
    step( vec3( ${0o1 / 0o400} ), lin ) );
}
vec3 konturaQox2n2k( vec3 weh2 ) {
  return floor( weh2 * KONTURAQOX2N2K + ${0o1 / 0o2} ) / KONTURAQOX2N2K;
}
vec3 konturaKozunu( vec3 lin ) { return konturaQox2n2k( konturaSrgb( lin ) ); }
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
float konturaVem2DeLumo( vec3 kozunu, vec3 lumita ) {
  return clamp( ( konturaLumo( konturaQox2n2k( kozunu ) ) - konturaLumo( lumita ) )
    / KONTURATONA, ${0o0}.0, ${0o4}.0 );
}
float konturaSmin( float a, float b, float k ) {
  float h = clamp( ${0o1 / 0o2} + ${0o1 / 0o2} * ( b - a ) / k, ${0o0}.0, ${0o1}.0 );
  return mix( b, a, h ) - k * h * ( ${0o1}.0 - h );
}
float konturaTransiro( float skek2, float plosteq ) {
  #if __VERSION__ >= 300
    float lar = max( fwidth( skek2 ), ${0o1 / 0o20000} );
  #else
    float lar = ${0o1 / 0o40};
  #endif
  return smoothstep( plosteq - lar, plosteq + lar, skek2 );
}
float konturaEnmeto( vec2 uv, float cabole ) {
  vec2 q = abs( uv - vec2( ${0o1 / 0o2} ) ) - vec2( ${0o1 / 0o2} - cabole );
  float dKvar = length( max( q, vec2( ${0o0}.0 ) ) )
    + min( max( q.x, q.y ), ${0o0}.0 ) - cabole;
  return clamp( -dKvar * ${0o2}.0, ${0o0}.0, ${0o1}.0 );
}
vec2 konturaUvoC2w2q( vec3 c2w2q, vec3 x2x2q, vec3 vek2feU, vec3 vek2feV ) {
  vec3 phaka = c2w2q - x2x2q * dot( c2w2q, x2x2q );
  float sahakaniU = dot( vek2feU, vek2feU );
  float krucProdukto = dot( vek2feU, vek2feV );
  float sahakaniV = dot( vek2feV, vek2feV );
  float determinanto = sahakaniU * sahakaniV - krucProdukto * krucProdukto;
  if ( determinanto <= ${0o1 / 0o10000} ) return vec2( ${0o0}.0 );
  vec2 komponantoj = vec2(
    ( dot( phaka, vek2feU ) * sahakaniV - dot( phaka, vek2feV ) * krucProdukto ) / determinanto,
    ( dot( phaka, vek2feV ) * sahakaniU - dot( phaka, vek2feU ) * krucProdukto ) / determinanto );
  float komponantaSahakani = length( komponantoj );
  if ( komponantaSahakani <= ${0o1 / 0o10000} ) return vec2( ${0o0}.0 );
  return komponantoj / komponantaSahakani * length( phaka );
}
float konturaKampo( vec3 x2x2q, vec2 uv, vec3 raqa, vec3 supo, vec3 tsije,
  vec3 bary, vec3 vek2fe ) {
  float sotsii = clamp( ${0o1 / 0o2} - dot( x2x2q, tsije ) * ${0o1 / 0o2},
    ${0o0}.0, ${0o1}.0 );
// ⟨ ſɭᴜ ſןᴜ , ſɭɜ ſɭᴜ , 📃 ⟩
  float uvValida = step( ${0o1 / 0o20000}, length( uv ) );
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
  if ( uvValida < ${0o1 / 0o2} ) return sotsii * ${0o1 / 0o2};
  vec2 kUv = clamp( uv, vec2( ${0o0}.0 ), vec2( ${0o1}.0 ) );
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
  vec3 help = abs( dot( x2x2q, supo ) ) < ${0o7 / 0o10}
    ? supo : vec3( ${0o1}.0, ${0o0}.0, ${0o0}.0 );
  vec3 tanU = normalize( cross( help, x2x2q ) );
  vec3 tanV = cross( x2x2q, tanU );
  vec2 lumT = vec2( dot( tsije, tanU ), dot( tsije, tanV ) );
  vec3 kameraC2w2q = normalize( -raqa );
  vec2 vidT = vec2( dot( kameraC2w2q, tanU ), dot( kameraC2w2q, tanV ) );
  vec3 sost2Xekuxa = raqa;
  float h6kuni = length( raqa );
  #if __VERSION__ >= 300
    vec2 uvoX = dFdx( uv );
    vec2 uvoY = dFdy( uv );
    vec3 xekuxaX = dFdx( raqa );
    vec3 xekuxaY = dFdy( raqa );
    float determinanto = uvoX.x * uvoY.y - uvoY.x * uvoX.y;
    if ( abs( determinanto ) > ${0o1 / 0o10000} ) {
      vec3 vek2feU = ( xekuxaX * uvoY.y - xekuxaY * uvoX.y ) / determinanto;
      vec3 vek2feV = ( xekuxaY * uvoX.x - xekuxaX * uvoY.x ) / determinanto;
      sost2Xekuxa = raqa + vek2feU * ( ${0o1 / 0o2} - uv.x )
        + vek2feV * ( ${0o1 / 0o2} - uv.y );
      kameraC2w2q = normalize( -sost2Xekuxa );
      h6kuni = length( sost2Xekuxa );
      lumT = konturaUvoC2w2q( tsije, x2x2q, vek2feU, vek2feV );
      vidT = konturaUvoC2w2q( kameraC2w2q, x2x2q, vek2feU, vek2feV );
    }
  #endif
  float zomp6zuk = clamp( h6kuni / ${0o30}.0, ${0o7 / 0o10}, ${0o11 / 0o10} );
  float tugp6zuk = clamp( h6kuni / ${0o30}.0, ${0o7 / 0o10}, ${0o5 / 0o4} );
// ⟨ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
  float radio1 = ${0o3 / 0o20} * zomp6zuk;
  float plosteq1 = ${0o1 / 0o10} * zomp6zuk;
  float plosteq2 = ${0o5 / 0o20} * zomp6zuk;
  float plosteq3 = ${0o1 / 0o2} * zomp6zuk;
// ⟨ ſɭᴜ ſןᴜ , ꞙɭэ , 📃 ⟩
  float radio2 = min( radio1 + ( plosteq2 - plosteq1 ) * ${0o1 / 0o2},
    ${0o1 / 0o2 - 0o1 / 0o100} );
  float radio3 = min( radio1 + ( plosteq3 - plosteq1 ) * ${0o1 / 0o2},
    ${0o1 / 0o2 - 0o1 / 0o100} );
  vec2 tugVec = lumT + vidT * ${0o3 / 0o2};
  float tugH6kuni = length( tugVec );
  vec2 c2w2q = tugVec / max( tugH6kuni, ${0o1 / 0o10000} );
  float mov = min( tugH6kuni * ${0o1 / 0o4}, ${0o1 / 0o20} ) * tugp6zuk;
  float en1 = konturaEnmeto( kUv - c2w2q * mov * ${0o1 / 0o4}, radio1 );
  float en2 = konturaEnmeto( kUv - c2w2q * mov * ${0o1}.0, radio2 );
  float en3 = konturaEnmeto( kUv - c2w2q * mov * ${0o7 / 0o4}, radio3 );
  float vem2 = ${0o3}.0
    - konturaTransiro( en1, plosteq1 )
    - konturaTransiro( en2, plosteq2 )
    - konturaTransiro( en3, plosteq3 )
    + sotsii * ${0o1 / 0o4};
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɩ , 📃 ⟩
  if ( length( bary ) > ${0o1 / 0o20000} ) {
    vec2 of = ( lumT + vidT * ${0o3 / 0o2} ) * ${0o1 / 0o4};
    vec3 cb = vec3( ${0o1 / 0o3} )
      + vec3( of.x, of.y, -of.x - of.y ) * ${0o3 / 0o5};
    vec3 sost2OfsetoT = cb - vec3( ${0o1 / 0o3} );
    float sost2H6kuniT = length( sost2OfsetoT );
    vec3 c2w2qT = sost2OfsetoT / max( sost2H6kuniT, ${0o1 / 0o10000} );
    float movoT = min( sost2H6kuniT * ${0o1 / 0o2}, ${0o1 / 0o24} ) * zomp6zuk;
    vec3 b1 = bary - c2w2qT * movoT * ${0o1 / 0o2};
    vec3 b2 = bary - c2w2qT * movoT * ${0o5 / 0o4};
    vec3 b3 = bary - c2w2qT * movoT * ${0o2}.0;
    float enT1 = clamp( konturaSmin( konturaSmin( b1.x, b1.y, ${0o1 / 0o10} ),
      b1.z, ${0o1 / 0o10} ) * ${0o3}.0, ${0o0}.0, ${0o1}.0 );
    float enT2 = clamp( konturaSmin( konturaSmin( b2.x, b2.y, ${0o1 / 0o10} ),
      b2.z, ${0o1 / 0o10} ) * ${0o3}.0, ${0o0}.0, ${0o1}.0 );
    float enT3 = clamp( konturaSmin( konturaSmin( b3.x, b3.y, ${0o1 / 0o10} ),
      b3.z, ${0o1 / 0o10} ) * ${0o3}.0, ${0o0}.0, ${0o1}.0 );
    vem2 = ${0o3}.0
      - konturaTransiro( enT1, ${0o1 / 0o10} * zomp6zuk )
      - konturaTransiro( enT2, ${0o5 / 0o20} * zomp6zuk )
      - konturaTransiro( enT3, ${0o1 / 0o2} * zomp6zuk )
      + sotsii * ${0o1 / 0o4};
  } else if ( length( vek2fe ) > ${0o1 / 0o20000} ) {
// ⟨ ſɭᴜ ſןᴜ , ꞙɭꞟ , 📃 ⟩
    float lit = clamp( dot( vek2fe, tsije ) * ${0o1 / 0o2} + ${0o1 / 0o2},
      ${0o0}.0, ${0o1}.0 );
    vem2 = mix( sotsii * ${0o1 / 0o2}, vem2,
      smoothstep( ${0o2 / 0o5}, ${0o7 / 0o10}, lit ) );
  }
  return mix( sotsii * ${0o1 / 0o2}, vem2, uvValida );
}
vec3 konturaWeh2( vec3 kozunuLin, float vem2 ) {
  return max( vec3( ${0o0}.0 ),
    konturaKozunu( kozunuLin ) - vec3( konturaBando( vem2 ) * KONTURATONA ) );
}
`;

// ⟪ ſᶘɹ ſɭᴜ , 🌤 ⟫
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭı ,
// ſᶘɹ ſɭᴜ , ꞙɭɿ , 📃 ⟩
export type CanaUnihaqoxa = {
  uTop: THREE.IUniform< THREE.Color >;
  uMid: THREE.IUniform< THREE.Color >;
  uBot: THREE.IUniform< THREE.Color >;
  uSunCol: THREE.IUniform< THREE.Color >;
  uSunDir: THREE.IUniform< THREE.Vector3 >;
  uHunastaf: THREE.IUniform< number >;
};

export const CANAVERTEKS0 = `precision highp float;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
attribute vec3 position;
varying vec3 vDir;
void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

export const CANAFRAGMENTO = `precision highp float;
${KONTURAGLSL}
varying vec3 vDir;
uniform vec3 uTop,uMid,uBot,uSunCol,uSunDir;
uniform float uHunastaf;
float sexiaHazardo( vec2 p ) {
  vec3 haz = fract( vec3( p.xyx ) * ${0o63 / 0o1000} );
  haz += dot( haz, haz.yzx + ${0o40 + 0o1 / 0o3} );
  return fract( ( haz.x + haz.y ) * haz.z );
}
float sexiaQoxa( vec2 p ) {
  float r = length( p );
  float ang = atan( p.y, p.x );
  float f = abs( mod( ang + ${Math.PI / 0o4}, ${Math.PI / 0o2} ) - ${Math.PI / 0o4} );
  float R = pow( pow( cos( f ), ${0o3 / 0o5} ) + pow( sin( f ), ${0o3 / 0o5} ), ${-0o5 / 0o3} );
  return ${0o1}.0 - smoothstep( max( ${0o0}.0, R - ${0o1 / 0o10} ), R, r );
}
void main() {
  vec3 d = normalize( vDir );
  float h = clamp( d.y, ${-0o15 / 0o100}, ${0o1}.0 );
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭц , 📃 ⟩
  float hb = konturaBando( h * ${0o20}.0 ) / ${0o20}.0;
  vec3 kozunu = mix( uBot, uMid, smoothstep( ${-0o1 / 0o100}, ${0o17 / 0o100}, hb ) );
  kozunu = mix( kozunu, uTop, smoothstep( ${0o3 / 0o20}, ${0o27 / 0o40}, hb ) );
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭэ , 📃 ⟩
  vec3 sotsiiC2w2q = normalize( uSunDir );
  vec3 sotsiiHelpo = abs( sotsiiC2w2q.y ) < ${0o7 / 0o10}
    ? vec3( ${0o0}.0, ${0o1}.0, ${0o0}.0 ) : vec3( ${0o1}.0, ${0o0}.0, ${0o0}.0 );
  vec3 sotsiiX = normalize( cross( sotsiiHelpo, sotsiiC2w2q ) );
  vec3 sotsiiY = cross( sotsiiC2w2q, sotsiiX );
  float sotsiiAntau = dot( d, sotsiiC2w2q );
  vec2 sotsiiP = abs( vec2( dot( d, sotsiiX ), dot( d, sotsiiY ) )
    / max( sotsiiAntau, ${0o1 / 0o400} ) );
  float sotsiiH = ( ${0o1}.0 - smoothstep( ${0o1 / 0o400}, ${0o1 / 0o200}, sotsiiP.y ) )
    * ( ${0o1}.0 - smoothstep( ${0o1 / 0o20}, ${0o3 / 0o20}, sotsiiP.x ) );
  float sotsiiV = ( ${0o1}.0 - smoothstep( ${0o1 / 0o400}, ${0o1 / 0o200}, sotsiiP.x ) )
    * ( ${0o1}.0 - smoothstep( ${0o1 / 0o20}, ${0o3 / 0o20}, sotsiiP.y ) );
  float sotsiiFalo = ${0o1}.0 - smoothstep( ${0o1 / 0o100}, ${0o3 / 0o20}, max( sotsiiP.x, sotsiiP.y ) );
  float sotsiiHalo = pow( max( sotsiiAntau, ${0o0}.0 ), ${0o200}.0 ) * ${0o1 / 0o2};
  float sotsiiKampo = max( sotsiiHalo, max( sotsiiH, sotsiiV ) * sotsiiFalo ) * step( ${0o0}.0, sotsiiAntau );
  float sotsii = konturaBando( sotsiiKampo * ${0o4}.0 ) / ${0o4}.0;
  kozunu += uSunCol * sotsii * ${0o1 / 0o2};
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭɩ , 📃 ⟩
  float vem2 = ( ${0o1}.0 - smoothstep( ${0o0}.0, ${0o27 / 0o40}, hb ) ) * ${0o3}.0;
  vec3 weh2 = konturaWeh2( kozunu, vem2 );
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭꞟ , 📃 ⟩
  vec3 sexiaAbs = abs( d );
  vec2 sexiaUv;
  float sexiaVizagxo;
  if ( sexiaAbs.y >= sexiaAbs.x && sexiaAbs.y >= sexiaAbs.z ) {
    sexiaUv = d.xz / sexiaAbs.y;
    sexiaVizagxo = d.y > ${0o0}.0 ? ${0o0}.0 : ${0o1}.0;
  } else if ( sexiaAbs.x >= sexiaAbs.z ) {
    sexiaUv = d.yz / sexiaAbs.x;
    sexiaVizagxo = d.x > ${0o0}.0 ? ${0o2}.0 : ${0o3}.0;
  } else {
    sexiaUv = d.xy / sexiaAbs.z;
    sexiaVizagxo = d.z > ${0o0}.0 ? ${0o4}.0 : ${0o5}.0;
  }
  vec2 sexiaQox2n2k = sexiaUv * ${0o20}.0;
  vec2 sexiaId = floor( sexiaQox2n2k ) + vec2( sexiaVizagxo * ${0o21}.0, sexiaVizagxo * ${0o37}.0 );
  vec2 sexiaLoka = fract( sexiaQox2n2k ) - ${0o1 / 0o2};
  vec2 sexiaOfseto = ( vec2( sexiaHazardo( sexiaId + ${0o21}.0 ),
    sexiaHazardo( sexiaId + ${0o43}.0 ) ) - ${0o1 / 0o2} ) * ${0o1 / 0o2};
  float sexiaGpukaz = ${0o1 / 0o20} + sexiaHazardo( sexiaId + ${0o65}.0 ) * ${0o1 / 0o20};
  float sexiaSukf2qo = step( ${0o17 / 0o20}, sexiaHazardo( sexiaId ) );
  float sexiaMasko = sexiaQoxa( ( sexiaLoka - sexiaOfseto ) / sexiaGpukaz ) * sexiaSukf2qo;
  float sexiaNokto = smoothstep( ${0o3 / 0o10}, ${0o7 / 0o10}, uHunastaf );
  float sexiaHorizonto = smoothstep( ${-0o1 / 0o40}, ${0o3 / 0o40}, d.y );
  float sexiaAlfo = sexiaMasko * sexiaNokto * sexiaHorizonto;
  vec3 sexiaKozunu = vec3( ${0o50 / 0o100}, ${0o60 / 0o100}, ${0o1}.0 );
  float sexiaOmbro = floor( sexiaHazardo( sexiaId + ${0o107}.0 ) * ${0o3}.0 );
  vec3 sexiaWeh2 = konturaWeh2( sexiaKozunu, sexiaOmbro );
  weh2 = konturaQox2n2k( mix( weh2, sexiaWeh2, sexiaAlfo ) );
  gl_FragColor = vec4( weh2, ${0o1}.0 );
}`;

/* ſᶘɹ ſɭᴜ , ꞙɭı ,
    @param unihaqoxa ( CanaUnihaqoxa ) - j͑ʃɔ ſɭᴜ ｡ ſᶘꞇ ɭl̀ɔ ｡ ɭʃᴜ ｡
@returns ſɟᴜ ſןᴜȝ ｡ ( THREE.RawShaderMaterial ) ｡ */
export function kf2CananPukekn(
  unihaqoxa: CanaUnihaqoxa ): THREE.RawShaderMaterial {
  return new THREE.RawShaderMaterial({ side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: unihaqoxa, vertexShader: CANAVERTEKS0, fragmentShader: CANAFRAGMENTO });
}

// ⟪ ſ͕ɭɜ ı],ᴜ , 🪞 ⟫
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
// ſᶘɹ ſɭᴜ , ꞙɭɿ ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭц , 📃 ⟩
export const QATSIIKEVEM2 = 0o1;
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭэ , 📃 ⟩
const QATSIIKEPLOSTEQ = 0o1 / 0o40;

export interface QatsiikeKu1o {
  teru: THREE.ColorRepresentation;
  sost2: THREE.ColorRepresentation;
  psaz: THREE.ColorRepresentation;
  sotsiiWeh2: THREE.ColorRepresentation;
  sotsiiC2w2q: THREE.Vector3;
  hunastaf: number;
  vem2: number;
}

export interface Qatsiike {
  tlak2( ku1o: Partial< QatsiikeKu1o > ): void;
  texture: THREE.Texture | null;
  detrui(): void;
}

const TAJ2QATSIIKE: QatsiikeKu1o = {
  teru: 0x78a8c0, sost2: 0xb8d0d8, psaz: 0xe0e8e8,
  sotsiiWeh2: 0xf8f0d8,
  sotsiiC2w2q: new THREE.Vector3( 0o4/0o10, 0o63/0o100, 0o23/0o100 ),
  hunastaf: 0o0,
  vem2: QATSIIKEVEM2,
};

function veq6k2Haweh2( a: THREE.Color, b: THREE.Color ): boolean {
  return Math.abs( a.r - b.r ) > QATSIIKEPLOSTEQ
    || Math.abs( a.g - b.g ) > QATSIIKEPLOSTEQ
    || Math.abs( a.b - b.b ) > QATSIIKEPLOSTEQ;
}

/* ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
    @param qena ( THREE.Scene ) - ſɭꞇ ı],ɹ ｡ j͑ʃᴜ ｡
    @param k2fcakuk ( THREE.WebGLRenderer ) - ſɭɹʞ ｡ }ʃᴜ ｡
    @param ku1o ( Partial< QatsiikeKu1o > = {} , optional ) - j͑ʃɔ ſɭᴜ ｡ j͑ʃɜ ｡
@returns j͑ʃᴜ j͑ʃɜ ｡ ( Qatsiike ) ｡ */
export function catsaraQatsiiken( qena: THREE.Scene, k2fcakuk: THREE.WebGLRenderer,
  ku1o: Partial< QatsiikeKu1o > = {} ): Qatsiike {
  const unihaqoxa: CanaUnihaqoxa = {
    uTop: { value: new THREE.Color( TAJ2QATSIIKE.teru ) },
    uMid: { value: new THREE.Color( TAJ2QATSIIKE.sost2 ) },
    uBot: { value: new THREE.Color( TAJ2QATSIIKE.psaz ) },
    uSunCol: { value: new THREE.Color( TAJ2QATSIIKE.sotsiiWeh2 ) },
    uSunDir: { value: TAJ2QATSIIKE.sotsiiC2w2q.clone() },
    uHunastaf: { value: TAJ2QATSIIKE.hunastaf },
  };
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭɿ , 📃 ⟩
  const peqeniKagani = new THREE.Scene();
  peqeniKagani.add( new THREE.Mesh( new THREE.SphereGeometry( 0o100, 0o20, 0o10 ),
    kf2CananPukekn( unihaqoxa ) ) );
  const generilo = new THREE.PMREMGenerator( k2fcakuk );
  let natakatomasai: THREE.WebGLRenderTarget | null = null;
  let cutlu = new THREE.Color( TAJ2QATSIIKE.teru );
  let sost2Weh2 = new THREE.Color( TAJ2QATSIIKE.sost2 );
  let psazWeh2 = new THREE.Color( TAJ2QATSIIKE.psaz );
  let sotsii = new THREE.Color( TAJ2QATSIIKE.sotsiiWeh2 );
  let hunastaf = TAJ2QATSIIKE.hunastaf;
  let vem2 = TAJ2QATSIIKE.vem2;

  function kf2(): void {
    if ( natakatomasai ) natakatomasai.dispose();
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭц , 📃 ⟩
    natakatomasai = generilo.fromScene( peqeniKagani, 0o0, 0o1/0o100, 0o400 );
    qena.environment = natakatomasai.texture;
    qena.environmentIntensity = vem2;
  }

  function tlak2( sef4: Partial< QatsiikeKu1o > ): void {
    const t = new THREE.Color( sef4.teru ?? cutlu );
    const m = new THREE.Color( sef4.sost2 ?? sost2Weh2 );
    const b = new THREE.Color( sef4.psaz ?? psazWeh2 );
    const s = new THREE.Color( sef4.sotsiiWeh2 ?? sotsii );
    const sef4Nokto = sef4.hunastaf ?? hunastaf;
    const veq6k2 = veq6k2Haweh2( cutlu, t ) || veq6k2Haweh2( sost2Weh2, m )
      || veq6k2Haweh2( psazWeh2, b ) || veq6k2Haweh2( sotsii, s )
      || Math.abs( sef4Nokto - hunastaf ) > QATSIIKEPLOSTEQ;
    cutlu.copy( t ); sost2Weh2.copy( m ); psazWeh2.copy( b ); sotsii.copy( s );
    if ( sef4.sotsiiC2w2q ) unihaqoxa.uSunDir.value.copy( sef4.sotsiiC2w2q );
    hunastaf = sef4Nokto;
    unihaqoxa.uHunastaf.value = hunastaf;
    vem2 = sef4.vem2 ?? vem2;
    if ( !veq6k2 && natakatomasai ) { qena.environmentIntensity = vem2; return; }
    unihaqoxa.uTop.value.copy( t );
    unihaqoxa.uMid.value.copy( m );
    unihaqoxa.uBot.value.copy( b );
    unihaqoxa.uSunCol.value.copy( s );
    kf2();
  }

  tlak2( ku1o );

  return {
    tlak2,
    get texture() { return natakatomasai ? natakatomasai.texture : null; },
    detrui(): void {
      if ( natakatomasai ) natakatomasai.dispose();
      natakatomasai = null;
      generilo.dispose();
    },
  };
}

// ⟪ ſɭэ ſɭw , 🖥️ ⟫
export interface BildilaCatsara {
  antialias?: boolean;
  hahunanu?: boolean;
  ombraHunaq?: THREE.ShadowMapType;
  eksxekuxa?: number;
  pikslaRacio?: number;
}

/* ſɭэ ſɭw , ꞙɭı ,
    @param k2fcakuk ( THREE.WebGLRenderer ) - ſɭɹʞ ｡ j͑ʃᴜ ｡
    @param ku1o ( BildilaCatsara = {} , optional ) - j͑ʃw ſɭʞɹȝ ｡
@returns void */
export function catsaraTonan( k2fcakuk: THREE.WebGLRenderer, ku1o: BildilaCatsara = {} ): void {
// ⟨ ſɭэ ſɭw , ꞙɭɿ , 📃 ⟩
  ku1oSotlakak();
  if ( !THREE.ShaderChunk.uv_pars_vertex.includes( "vKonturaUv" ) ) {
// ⟨ ſɭэ ſɭw , ꞙɭц , 📃 ⟩
    THREE.ShaderChunk.uv_pars_vertex += `
      varying vec2 vKonturaUv;
      varying vec3 vKonturaPoz;
      #ifndef USE_UV1
        attribute vec2 uv1;
      #endif
      attribute float aKonturaK6liq;
      attribute vec4 aKonturaEkstra;
      varying vec3 vKonturaBary;
      varying vec3 vKonturaFlanko;
    `;
    THREE.ShaderChunk.uv_vertex += `
      vKonturaUv = uv;
// ⟨ ſɭэ ſɭw , ꞙɭэ , 📃 ⟩
      if ( aKonturaK6liq < -0.5 ) {
        vKonturaUv = uv1;
      } else if ( aKonturaK6liq > 0.0 ) {
        vKonturaUv.y = ( uv.y - aKonturaK6liq ) / max( 1.0 - aKonturaK6liq, 0.000030517578125 );
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
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɩ , 📃 ⟩
    THREE.ShaderChunk.color_pars_fragment = KONTURAGLSL + THREE.ShaderChunk.color_pars_fragment;
  }
  if ( !THREE.ShaderChunk.colorspace_fragment.includes( "konturaKampo" ) ) {
// ⟨ ſɭᴜ ſןᴜ , ꞙɭꞟ , 📃 ⟩
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
        gl_FragColor.rgb = konturaWeh2( diffuseColor.rgb,
          konturaKampo( konturaNormalo, vKonturaUv, vKonturaPoz, konturaSupo,
            konturaLumo, vKonturaBary, vKonturaFlanko ) );
      #endif
    `;
  }
  k2fcakuk.outputColorSpace = THREE.SRGBColorSpace;
  k2fcakuk.toneMapping = THREE.ACESFilmicToneMapping;
  k2fcakuk.toneMappingExposure = ku1o.eksxekuxa ?? 0o1;
  if ( ku1o.hahunanu ) {
    k2fcakuk.shadowMap.enabled = true;
    k2fcakuk.shadowMap.type = ku1o.ombraHunaq ?? THREE.PCFShadowMap;
  }
  if ( ku1o.pikslaRacio !== undefined ) k2fcakuk.setPixelRatio( ku1o.pikslaRacio );
}

// ⟪ ſᶘɹ ſɭᴜ , ☀️ ⟫
export interface GelesTsijeKu1o {
  canaWeh2?: THREE.ColorRepresentation;
  kozuWeh2?: THREE.ColorRepresentation;
  canaVem2?: number;
  sotsiiWeh2?: THREE.ColorRepresentation;
  sotsiiVem2?: number;
  sotsiiHaxekuxa?: [ number, number, number ];
  hahunanu?: boolean;
  ombraBal2?: number;
  ombraP2somani?: number;
  ombraTsiike?: number;
  ombraMaltsiike?: number;
  ombraBiaso?: number;
  ombraNormalBiaso?: number;
  vetem2Weh2?: THREE.ColorRepresentation;
  vetem2Vem2?: number;
}

export interface GelesTsijeJ {
  hemiTsije: THREE.HemisphereLight;
  sotsii: THREE.DirectionalLight;
  vetem2Tsije: THREE.AmbientLight | null;
}

// ⟨ ſᶘɹ ſɭᴜ , ꞙɭı , 📃 ⟩
const TAJ2TSIJEJ = {
  canaWeh2: 0xc8e0e8,
  kozuWeh2: 0x485848,
  canaVem2: 0o63 / 0o100,
  sotsiiWeh2: 0xf8f0d8,
  sotsiiVem2: 0o45 / 0o40,
  sotsiiHaxekuxa: [ 0o110, 0o160, 0o40 ] as [ number, number, number ],
};

/* ſᶘɹ ſɭᴜ , ꞙɭɿ ,
    @param qena ( THREE.Scene ) - ſɭꞇ ı],ɹ ｡ ſᶘɔ ɭl̀ɹȝ ｡ ſɭᴜ ｡
    @param ku1o ( GelesTsijeKu1o = {} , optional ) - j͑ʃɔ ſɭᴜ ｡ j͑ʃ'ɔ ŋᷠɹ ｡ j͑ʃэ ɭl̀э ｡ ֭ſɭw }ʃᴜ }ʃw ｡
@returns ſᶘɔ ɭl̀ɹȝ 3 ( GelesTsijeJ ) ｡ */
export function kf2GelesTsijen( qena: THREE.Scene,
  ku1o: GelesTsijeKu1o = {} ): GelesTsijeJ {
  const hemiTsije = new THREE.HemisphereLight(
    ku1o.canaWeh2 ?? TAJ2TSIJEJ.canaWeh2,
    ku1o.kozuWeh2 ?? TAJ2TSIJEJ.kozuWeh2,
    ku1o.canaVem2 ?? TAJ2TSIJEJ.canaVem2
  );
  qena.add( hemiTsije );

  const sotsii = new THREE.DirectionalLight(
    ku1o.sotsiiWeh2 ?? TAJ2TSIJEJ.sotsiiWeh2,
    ku1o.sotsiiVem2 ?? TAJ2TSIJEJ.sotsiiVem2
  );
  const raqa = ku1o.sotsiiHaxekuxa ?? TAJ2TSIJEJ.sotsiiHaxekuxa;
  sotsii.position.set( raqa[ 0o0 ], raqa[ 0o1 ], raqa[ 0o2 ] );
  if ( ku1o.hahunanu ) {
    const bal2 = ku1o.ombraBal2 ?? 0o2000;
    const p2somani = ku1o.ombraP2somani ?? 0o100;
    sotsii.castShadow = true;
    sotsii.shadow.mapSize.set( bal2, bal2 );
    sotsii.shadow.camera.left = -p2somani;
    sotsii.shadow.camera.right = p2somani;
    sotsii.shadow.camera.top = p2somani;
    sotsii.shadow.camera.bottom = -p2somani;
    sotsii.shadow.camera.near = ku1o.ombraTsiike ?? 0o20;
    sotsii.shadow.camera.far = ku1o.ombraMaltsiike ?? 0o520;
    sotsii.shadow.bias = ku1o.ombraBiaso ?? -0o1 / ( 0o2 * bal2 );
    sotsii.shadow.normalBias = ku1o.ombraNormalBiaso
      ?? Math.max( 0o4 / 0o10, ( 0o200 / bal2 ) * 0o22 / 0o10 );
    sotsii.shadow.camera.updateProjectionMatrix();
  }
  qena.add( sotsii, sotsii.target );

  let vetem2Tsije: THREE.AmbientLight | null = null;
  if ( ku1o.vetem2Vem2 !== undefined ) {
    vetem2Tsije = new THREE.AmbientLight( ku1o.vetem2Weh2 ?? 0x404848,
      ku1o.vetem2Vem2 );
    qena.add( vetem2Tsije );
  }
  return { hemiTsije, sotsii, vetem2Tsije };
}
