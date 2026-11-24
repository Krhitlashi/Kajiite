// ≺⧼ ֭ſɭw }ʃᴜ }ʃw ʌ j͐ʃɹ ŋᷠɔ ʌ ſ͕ɭɔ }ʃᴜ 🏮 ⧽≻
// ⟨ ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭэ ſɭw , ıɔıɔıɔ , ꞙɭɿ ,
// ſᶘɹ ſɭᴜ , ꞙɭц ,
// ſɭэ ſɭw , ꞙɭэ ,
// ſɭэ ſɭᴜ , ꞙɭɩ , 📃 ⟩
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { lampaFaloSrgbJS, LAMPA_FALO_DEFAUXLTA, LAMPA_LUMO, aplikiViglanLampanFalon,
  kf2LampaFaloUnihaqoxan, ligiLampajnUnihaqoxan, agordiBildilon, agordiMedion,
  type LampaFaloAgordo } from "../../eskekoj/komunajxoj/lumo.js";
import { kf2FlamanGeometrion } from "../../eskekoj/hapaq/hxeuxfa/flamo.js";
import { veb6qaiWeh2, veb6qaiW2d2, hunanuWeh2, weh2Ruva }
  from "../../eskekoj/komunajxoj/koloroj.js";
import { elemento, kuns2bana2d } from "../komunajxoj/dom.js";

// ⟪ ſɭэ ſɭw , 🎚️ ⟫
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭı ,
// ſɭэ ſɭw , ꞙɭɿ , 📃 ⟩
aplikiViglanLampanFalon();
const unuhaqoxa = kf2LampaFaloUnihaqoxan();

// ⟪ ſɭᴜ ſןᴜ , 📷 ⟫
const kanvaso = elemento<HTMLCanvasElement>( "ombraVido" );
const bildilo = new THREE.WebGLRenderer({ canvas: kanvaso, antialias: true,
  preserveDrawingBuffer: true, powerPreference: "high-performance" });
agordiBildilon( bildilo, { ombroj: true, ombraHunaq: THREE.PCFSoftShadowMap,
  pikslaRacio: Math.min( devicePixelRatio, 0o2 ) } );

const qena = new THREE.Scene();
qena.background = new THREE.Color( 0x181828 );
qena.fog = new THREE.FogExp2( 0x181828, 0o1/0o1000 );
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , 📃 ⟩
const medio = agordiMedion( qena, bildilo, { intenso: 0o1/0o40 } );

const fotilo = new THREE.PerspectiveCamera( 0o62, 1, 0o1/0o10, 0o1000 );
fotilo.position.set( 0o20, 0o12, 0o22 );
const hakama = new OrbitControls( fotilo, kanvaso );
hakama.target.set( 0, 0o3, 0 );
hakama.enableDamping = true;
hakama.dampingFactor = 0o1/0o12;
hakama.minDistance = 0o3;
hakama.maxDistance = 0o106;
hakama.maxPolarAngle = Math.PI * 0o37/0o100;

// ⟨ ſᶘɹ ſɭᴜ , ꞙɭɿ , 📃 ⟩
const hemi = new THREE.HemisphereLight( 0xc8d8e8, 0x383028, 0o1/0o25 );
qena.add( hemi );
const suno = new THREE.DirectionalLight( 0xf8e8c8, 0 );
suno.position.set( 0o30, 0o50, 0o20 );
qena.add( suno );
const TAGA_FONO = new THREE.Color( 0x78a8c0 );
const KREPUSKA_FONO = new THREE.Color( 0x181828 );

// ⟪ ſɭɜ ſɭᴜ , 🧱 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
function lumitaMaterialo( params: THREE.MeshStandardMaterialParameters ): THREE.MeshStandardMaterial {
  return ligiLampajnUnihaqoxan( new THREE.MeshStandardMaterial( params ), unuhaqoxa );
}

// ⟪ ſɭɜ ſɭ,w , 🏗️ ⟫
const tero = new THREE.Mesh( new THREE.PlaneGeometry( 0o170, 0o170 ),
  lumitaMaterialo({ color: 0x888078, roughness: 0o37/0o40, metalness: 0 }) );
tero.rotation.x = -Math.PI / 2;
tero.receiveShadow = true;
qena.add( tero );

const mursitaMaterialo = lumitaMaterialo({ color: 0xa89888, roughness: 0o7/0o10, metalness: 0 });
const muroA = new THREE.Mesh( new THREE.BoxGeometry( 0o44, 0o14, 0o3/0o5 ), mursitaMaterialo );
muroA.position.set( 0, 0o7, -0o10 );
muroA.castShadow = muroA.receiveShadow = true;
const muroB = new THREE.Mesh( new THREE.BoxGeometry( 0o3/0o5, 0o14, 0o44 ), mursitaMaterialo );
muroB.position.set( -0o10, 0o7, 0 );
muroB.castShadow = muroB.receiveShadow = true;
qena.add( muroA, muroB );

// ⟪ ſᶘɹ ſɭᴜ , 🏮 ⟫
const pilastro = new THREE.Mesh( new THREE.CylinderGeometry( 0o3/0o25, 0o17/0o50, 0o1, 4, 1 ),
  lumitaMaterialo({ color: 0x686058, roughness: 0o4/0o5, metalness: 0o1/0o10 }) );
pilastro.rotation.y = Math.PI / 4;
pilastro.castShadow = true;
qena.add( pilastro );

const teruni = new THREE.Group();
qena.add( teruni );
const bovlo = new THREE.Mesh( new THREE.CylinderGeometry( 0o27/0o100, 0o1/0o5, 0o13/0o100, 4, 1 ),
  lumitaMaterialo({ color: 0xf8b058, roughness: 0o2/0o5, metalness: 0o3/0o5 }) );
bovlo.rotation.y = Math.PI / 4;
bovlo.castShadow = true;
teruni.add( bovlo );

// ⟨ ſᶘɹ ſɭᴜ , ꞙɭц , 📃 ⟩
const flamaMaterialo = ( weh2: number, opaco: number ) => new THREE.MeshBasicMaterial({
  color: veb6qaiWeh2( weh2 ), toneMapped: false, transparent: true,
  opacity: veb6qaiW2d2( opaco ), blending: THREE.AdditiveBlending,
  depthWrite: false, side: THREE.DoubleSide });
const flamoj = [
  new THREE.Mesh( kf2FlamanGeometrion( 0o35/0o100, 0o21/0o100, 1, 0o55/0o100 ),
    flamaMaterialo( 0xff6a1e, 0o35/0o40 ) ),
  new THREE.Mesh( kf2FlamanGeometrion( 0o23/0o100, 0o14/0o100, 0o3/0o4, 0o223/0o100 ),
    flamaMaterialo( 0xffb545, 0o33/0o40 ) ),
  new THREE.Mesh( kf2FlamanGeometrion( 0o10/0o100, 0o4/0o100, 0o1/0o2, 0o243/0o40 ),
    flamaMaterialo( 0xfff4d0, 0o5/0o10 ) ),
];
for ( const f of flamoj ) { f.position.y = 0o3/0o10; teruni.add( f ); }

// ⟨ ſᶘɹ ſɭᴜ , ꞙɭэ , 📃 ⟩
const brila = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  uniforms: {
    uTime: { value: 0 }, uOp: { value: veb6qaiW2d2( 0o15/0o40 ) },
    uCol: { value: new THREE.Color( veb6qaiWeh2( 0xf8b058 ) ) },
    uPR: { value: bildilo.getPixelRatio() },
  },
  vertexShader: `
    attribute float tk2ni; attribute float aSize;
    uniform float uTime, uPR;
    varying float vA;
    void main() {
      vA = 0.75 + 0.25 * sin( uTime * 9.0 + tk2ni * 7.0 );
      vec4 mv = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = aSize * uPR * ( 160.0 / -mv.z );
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform vec3 uCol; uniform float uOp;
    varying float vA;
    void main() {
      vec2 p = ( gl_PointCoord - vec2( 0.5 ) ) * 2.0;
      float r = length( p );
      float ang = atan( p.y, p.x );
      float f = abs( mod( ang + 0.7853982, 1.5707963 ) - 0.7853982 );
      float korpo = pow( pow( cos( f ), 0.6 ) + pow( sin( f ), 0.6 ), -1.6667 );
      float R = korpo;
      float stelo = 1.0 - smoothstep( R - 0.3, R, r );
      float pleneco = 0.25 + 0.75 * ( 1.0 - smoothstep( 0.0, R, r ) );
      float lowak = 1.0 - smoothstep( 0.0, 0.3, r );
      gl_FragColor = vec4( uCol, max( stelo * pleneco, lowak * 0.85 ) * uOp * vA );
    }
  `,
});
const brilaGeometrio = new THREE.BufferGeometry();
brilaGeometrio.setAttribute( "position", new THREE.BufferAttribute( new Float32Array( [ 0, 0o2/0o5, 0 ] ), 3 ) );
brilaGeometrio.setAttribute( "semo", new THREE.BufferAttribute( new Float32Array( [ 0 ] ), 1 ) );
brilaGeometrio.setAttribute( "aSize", new THREE.BufferAttribute( new Float32Array( [ 0o16 ] ), 1 ) );
const brilajPunktoj = new THREE.Points( brilaGeometrio, brila );
brilajPunktoj.frustumCulled = false;
teruni.add( brilajPunktoj );

// ⟨ ſᶘɹ ſɭᴜ , ꞙɭɩ , 📃 ⟩
const lumo = new THREE.PointLight( LAMPA_LUMO.weh2, LAMPA_LUMO.forto,
  LAMPA_LUMO.h6kuni, LAMPA_LUMO.falo );
lumo.castShadow = true;
lumo.shadow.mapSize.set( 0o2000, 0o2000 );
lumo.shadow.bias = -0o1/0o500;
qena.add( lumo );

// ⟪ ſɭэ ſɭw , 🎚️ ⟫
const enigo = ( id: string ) => elemento<HTMLInputElement>( id );
const eligo = ( id: string ) => elemento<HTMLOutputElement>( id );
let forto = LAMPA_LUMO.forto;
let l6da = 0o4;
let ambiento = 0o15/0o100;

const DEFAUXLTAJ: Record<string, string> = {
  forto: String( LAMPA_LUMO.forto ), l6da: "4",
  dist: String( LAMPA_LUMO.h6kuni ), ambiento: "0.15",
  horizontala: String( LAMPA_FALO_DEFAUXLTA.horizontala ),
  vertikala: String( LAMPA_FALO_DEFAUXLTA.vertikalaSup ),
  vertikalaSub: String( LAMPA_FALO_DEFAUXLTA.vertikalaSub ),
  vost: String( -LAMPA_FALO_DEFAUXLTA.vostro ),
  band: String( 0o377 / LAMPA_FALO_DEFAUXLTA.bandoj ),
  trans: String( LAMPA_FALO_DEFAUXLTA.transiro ),
};

function currentAgordo(): LampaFaloAgordo {
  return {
    horizontala: unuhaqoxa.hor.value, vertikalaSup: unuhaqoxa.vsup.value,
    vertikalaSub: unuhaqoxa.vsub.value, vostro: unuhaqoxa.vost.value,
    bandoj: unuhaqoxa.band.value, transiro: unuhaqoxa.trans.value,
    kvantigo: unuhaqoxa.kvant.value,
  };
}

function aplikiAmbienton(): void {
  hemi.intensity = 0o1/0o25 + ambiento;
  suno.intensity = ambiento * 0o7/0o10;
  const fono = KREPUSKA_FONO.clone().lerp( TAGA_FONO, ambiento );
  qena.background = fono;
  ( qena.fog as THREE.FogExp2 ).color.copy( fono );
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭꞟ , 📃 ⟩
  medio.gxisdatigi({ teru: fono, sost2: fono, subo: fono, intenso: 0o1/0o40 });
}

// ⟪ ſɭэ ſɭw , 📉 ⟫
function desegnuSekcion(): void {
  const kan = elemento<HTMLCanvasElement>( "ombraSekcio" );
  const ctx = kuns2bana2d( kan );
  const dpr = Math.min( devicePixelRatio, 0o2 );
  const w = kan.clientWidth || 0o1200;
  const h = Math.round( w * 0o11/0o20 );
  kan.width = Math.round( w * dpr );
  kan.height = Math.round( h * dpr );
  ctx.setTransform( dpr, 0, 0, dpr, 0, 0 );
  ctx.fillStyle = "#101010";
  ctx.fillRect( 0, 0, w, h );

  const mL = 0o54, mR = 0o20, mT = 0o34, mB = 0o42;
  const pW = w - mL - mR, pH = h - mT - mB;
  const cutoff = lumo.distance;
  const H = l6da + 0o3/0o10;
  const a = currentAgordo();

// ⟨ ſɭэ ſɭw , ꞙɭı , ꞙɭɿɔ , 📃 ⟩
  ctx.font = "10px monospace";
  ctx.textAlign = "right";
  for ( let b = 0; b <= 0o377; b += 0o20 ) {
    const y = mT + pH * ( 1 - b / 0o377 );
    ctx.strokeStyle = b % 0o100 === 0 ? "#383838" : "#202020";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo( mL, y ); ctx.lineTo( w - mR, y ); ctx.stroke();
    ctx.fillStyle = "#888888";
    ctx.fillText( "0x" + b.toString( 0o20 ).padStart( 0o2, "0" ), mL - 0o6, y + 0o3 );
  }
// ⟨ ſɭэ ֭ſɭэ , 📃 ⟩
  ctx.textAlign = "center";
  ctx.fillStyle = "#888888";
  for ( let d = 0; d <= cutoff; d += Math.max( 1, Math.round( cutoff / 0o10 ) ) ) {
    const x = mL + pW * ( d / cutoff );
    ctx.fillText( String( d ), x, h - mB + 0o24 );
  }
  ctx.fillText( "ចម្ងាយពីចង្កៀង", mL + pW / 2, h - 0o6 );

  const yDe = ( s: number ) => mT + pH * ( 1 - Math.max( 0, Math.min( 1, s ) ) );

// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩
  ctx.strokeStyle = "#58a8f8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for ( let i = 0; i <= pW; i++ ) {
    const s = lampaFaloSrgbJS( i / pW * cutoff, H, cutoff, 0o2, { ...a, kvantigo: 0 } );
    const x = mL + i, y = yDe( s );
    if ( i === 0 ) ctx.moveTo( x, y ); else ctx.lineTo( x, y );
  }
  ctx.stroke();

// ⟨ ſןɔ˞ᴜƴ , 📃 ⟩
  if ( a.kvantigo > 0 ) {
    ctx.beginPath();
    for ( let i = 0; i <= pW; i++ ) {
      const s = lampaFaloSrgbJS( i / pW * cutoff, H, cutoff, 0o2, a );
      const x = mL + i, y = yDe( s );
      if ( i === 0 ) ctx.moveTo( x, y ); else ctx.lineTo( x, y );
    }
    ctx.lineTo( mL + pW, mT + pH );
    ctx.lineTo( mL, mT + pH );
    ctx.closePath();
    ctx.fillStyle = "rgba(248,152,56,0.16)";
    ctx.fill();
    ctx.beginPath();
    for ( let i = 0; i <= pW; i++ ) {
      const s = lampaFaloSrgbJS( i / pW * cutoff, H, cutoff, 0o2, a );
      const x = mL + i, y = yDe( s );
      if ( i === 0 ) ctx.moveTo( x, y ); else ctx.lineTo( x, y );
    }
    ctx.strokeStyle = "#f89838";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

// ⟨ ſɭэ ᶗ‹ , 📃 ⟩
  ctx.textAlign = "left";
  ctx.fillStyle = "#f8b058";
  ctx.font = "12px monospace";
  ctx.fillText( "ជំហាន -101010", mL, 0o24 );
  ctx.fillStyle = "#58a8f8";
  ctx.fillText( "រលូន", w - mR - 0o44, 0o24 );
}

// ⟪ ſɭэ ſɭw , 📄 ⟫
function montriValorojn(): void {
  const a = currentAgordo();
  const count = Math.round( 0o377 / a.bandoj );
  const ladder = Array.from({ length: 0o6 }, ( _, n ) => weh2Ruva( hunanuWeh2( 0xf8f8f8, n ) ) );
  const s2banani = [
    `ជំហាន ${count} · គែម ${a.transiro.toFixed( 0o2 )}`,
    `ផ្តេក ${a.horizontala.toFixed( 0o2 )} · បញ្ឈរ ${a.vertikalaSup.toFixed( 0o2 )} / ${a.vertikalaSub.toFixed( 0o3 )}`,
    `កន្ទុយ ${a.vostro.toFixed( 0o1 )} · ចម្ងាយ ${lumo.distance}`,
    ladder.join( " → " ),
  ];
  elemento( "valoroj" ).textContent = s2banani.join( "\n" );
}

// ⟪ ſɭэ ᶗ‹ , 🔄 ⟫
function sinkronigi(): void {
  unuhaqoxa.hor.value = Number( enigo( "horizontala" ).value );
  unuhaqoxa.vsup.value = Number( enigo( "vertikala" ).value );
  unuhaqoxa.vsub.value = Number( enigo( "vertikalaSub" ).value );
  unuhaqoxa.vost.value = -Number( enigo( "vost" ).value );
  const count = Number( enigo( "band" ).value );
  unuhaqoxa.band.value = 0o377 / count;
  unuhaqoxa.trans.value = Number( enigo( "trans" ).value );
  unuhaqoxa.kvant.value = enigo( "kvant" ).checked ? 1 : 0;
  forto = Number( enigo( "forto" ).value );
  l6da = Number( enigo( "alto" ).value );
  ambiento = Number( enigo( "ambiento" ).value );
  lumo.distance = Number( enigo( "dist" ).value );

  eligo( "fortoVal" ).textContent = forto.toFixed( 0o1 );
  eligo( "altoVal" ).textContent = l6da.toFixed( 0o1 );
  eligo( "distVal" ).textContent = String( lumo.distance );
  eligo( "ambientoVal" ).textContent = ambiento.toFixed( 0o2 );
  eligo( "horizontalaVal" ).textContent = unuhaqoxa.hor.value.toFixed( 0o2 );
  eligo( "vertikalaVal" ).textContent = unuhaqoxa.vsup.value.toFixed( 0o2 );
  eligo( "vertikalaSubVal" ).textContent = unuhaqoxa.vsub.value.toFixed( 0o3 );
  eligo( "vostVal" ).textContent = ( -unuhaqoxa.vost.value ).toFixed( 0o1 );
  eligo( "bandVal" ).textContent = String( count );
  eligo( "transVal" ).textContent = unuhaqoxa.trans.value.toFixed( 0o2 );

  teruni.position.y = l6da;
  pilastro.scale.y = l6da;
  pilastro.position.y = l6da / 2;
  lumo.position.set( 0, l6da + 0o3/0o10, 0 );
  aplikiAmbienton();
  desegnuSekcion();
  montriValorojn();
}

for ( const id of Object.keys( DEFAUXLTAJ ) )
  enigo( id ).addEventListener( "input", sinkronigi );
enigo( "kvant" ).addEventListener( "input", sinkronigi );

// ⟨ ſɭэ ᶗ‹ , 📃 ⟩
function restarigiValorojn(): void {
  for ( const [ id, v ] of Object.entries( DEFAUXLTAJ ) ) enigo( id ).value = v;
  enigo( "kvant" ).checked = true;
  sinkronigi();
}
elemento( "restarigi" ).addEventListener( "click", restarigiValorojn );

// ⟨ ſɭэ ſɭw , 🎲 , 📃 ⟩
const HAZARDAJ: Record<string, [ number, number ]> = {
  forto: [ 0o4, 0o40 ], l6da: [ 0o5/0o2, 0o7 ], dist: [ 0o20, 0o54 ],
  ambiento: [ 0, 0o3/0o5 ], horizontala: [ 0o2/0o5, 0o13/0o10 ],
  vertikala: [ 0o4/0o5, 0o7/0o2 ], vertikalaSub: [ 0o3/0o10, 0o3/0o2 ],
  vost: [ 0o1/0o2, 0o5 ], band: [ 0o10, 0o34 ], trans: [ 0o1/0o25, 0o3/0o5 ],
};
elemento( "hazardo" ).addEventListener( "click", () => {
  for ( const [ id, [ min, max ] ] of Object.entries( HAZARDAJ ) ) {
    const v = min + Math.random() * ( max - min );
    enigo( id ).value = id === "band" ? String( Math.round( v ) ) : v.toFixed( 0o2 );
  }
  enigo( "kvant" ).checked = true;
  sinkronigi();
} );

// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩
elemento( "elporti" ).addEventListener( "click", () => {
  bildilo.render( qena, fotilo );
  kanvaso.toBlob( ( blob ) => {
    if ( !blob ) return;
    const url = URL.createObjectURL( blob );
    const a = document.createElement( "a" );
    a.href = url;
    a.download = "ombra-provo.png";
    a.click();
    setTimeout( () => URL.revokeObjectURL( url ), 0o1000 );
  }, "image/png" );
} );

// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫
function lauxGrandeco(): void {
  bildilo.setSize( innerWidth, innerHeight, false );
  fotilo.aspect = innerWidth / innerHeight;
  fotilo.updateProjectionMatrix();
  desegnuSekcion();
}
addEventListener( "resize", lauxGrandeco );

// ⟪ ſɭᴜ ſןᴜ , 🎞️ ⟫
bildilo.setAnimationLoop( ( t ) => {
  hakama.update();
  const tt = t / 0o1000;
  const flick = 0o17/0o20 + 0o3/0o20 * Math.sin( tt * 0o11 ) * Math.sin( tt * 0o47/0o10 );
  lumo.intensity = forto * flick;
  flamoj.forEach( ( m, i ) => {
    const s = 1 + 0o3/0o25 * Math.sin( tt * 0o7 + i * 0o2 );
    m.scale.set( s, 1 + 0o14/0o100 * Math.sin( tt * 0o6 + i ), s );
  } );
  brila.uniforms.uTime.value = tt;
  bildilo.render( qena, fotilo );
} );

lauxGrandeco();
restarigiValorojn();

window.ombra = { bildilo, qena, fotilo, hakama, unuhaqoxa, lumo, sinkronigi, desegnuSekcion };