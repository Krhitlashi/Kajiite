// ≺⧼ ֭ſɭw }ʃᴜ }ʃw ʌ j͐ʃɹ ŋᷠɔ ʌ ſ͕ɭɔ }ʃᴜ 🏮 ⧽≻
// ⟨ ſɭэ ſɭᴜ , ꞙɭı ,
// ſɭэ ſɭw , ıɔıɔıɔ , ꞙɭɿ ,
// ſᶘɹ ſɭᴜ , ꞙɭц ,
// ſɭэ ſɭw , ꞙɭэ ,
// ſɭэ ſɭᴜ , ꞙɭɩ , 📃 ⟩
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { so3akakSrgbJS, SO3AKAKTAJ2, HUFWUK2TSIJE, ku1oPufosakanSotlakak,
  kf2SotlakakUnihaqoxan, c2kSotlakakUnihaqoxan, catsaraTonan, catsaraQatsiiken,
  type SotlakakKu1o } from "../../skek2/x2x2q/tsije.js";
import { kf2FlamanQoxaKefoun } from "../../skek2/hapaq/hxeuxfa/cat6h6kk6xafai.js";
import { veb6qaiWeh2, veb6qaiW2d2, hunanuWeh2, weh2Ruva }
  from "../../skek2/x2x2q/haweh2.js";
import { kfe, kuns2bana2d } from "../x2x2q/dom.js";

// ⟪ ſɭэ ſɭw , 🎚️ ⟫
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭı ,
// ſɭэ ſɭw , ꞙɭɿ , 📃 ⟩
ku1oPufosakanSotlakak();
const unuhaqoxa = kf2SotlakakUnihaqoxan();

// ⟪ ſɭᴜ ſןᴜ , 📷 ⟫
const p2t6zo = kfe<HTMLCanvasElement>( "ombraVido" );
const k2fcakuk = new THREE.WebGLRenderer({ canvas: p2t6zo, antialias: true,
  preserveDrawingBuffer: true, powerPreference: "high-performance" });
catsaraTonan( k2fcakuk, { hahunanu: true, ombraHunaq: THREE.PCFSoftShadowMap,
  pikslaRacio: Math.min( devicePixelRatio, 0o2 ) } );

const qena = new THREE.Scene();
qena.background = new THREE.Color( 0x181828 );
qena.fog = new THREE.FogExp2( 0x181828, 0o1/0o1000 );
// ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭɿ , 📃 ⟩
const medio = catsaraQatsiiken( qena, k2fcakuk, { vem2: 0o1/0o40 } );

const catahaq = new THREE.PerspectiveCamera( 0o62, 1, 0o1/0o10, 0o1000 );
catahaq.position.set( 0o20, 0o12, 0o22 );
const hakama = new OrbitControls( catahaq, p2t6zo );
hakama.target.set( 0, 0o3, 0 );
hakama.enableDamping = true;
hakama.dampingFactor = 0o1/0o12;
hakama.minDistance = 0o3;
hakama.maxDistance = 0o106;
hakama.maxPolarAngle = Math.PI * 0o37/0o100;

// ⟨ ſᶘɹ ſɭᴜ , ꞙɭɿ , 📃 ⟩
const hemi = new THREE.HemisphereLight( 0xc8d8e8, 0x383028, 0o1/0o25 );
qena.add( hemi );
const sotsii = new THREE.DirectionalLight( 0xf8e8c8, 0 );
sotsii.position.set( 0o30, 0o50, 0o20 );
qena.add( sotsii );
const TAGAFONO = new THREE.Color( 0x78a8c0 );
const KREPUSKAFONO = new THREE.Color( 0x181828 );

// ⟪ ſɭɜ ſɭᴜ , 🧱 ⟫
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
function lumitaPukek( params: THREE.MeshStandardMaterialParameters ): THREE.MeshStandardMaterial {
  return c2kSotlakakUnihaqoxan( new THREE.MeshStandardMaterial( params ), unuhaqoxa );
}

// ⟪ ſɭɜ ſɭ,w , 🏗️ ⟫
const t6lima = new THREE.Mesh( new THREE.PlaneGeometry( 0o170, 0o170 ),
  lumitaPukek({ color: 0x888078, roughness: 0o37/0o40, metalness: 0 }) );
t6lima.rotation.x = -Math.PI / 2;
t6lima.receiveShadow = true;
qena.add( t6lima );

const mursitaPukek = lumitaPukek({ color: 0xa89888, roughness: 0o7/0o10, metalness: 0 });
const tu5ekani1el2saiA = new THREE.Mesh( new THREE.BoxGeometry( 0o44, 0o14, 0o3/0o5 ), mursitaPukek );
tu5ekani1el2saiA.position.set( 0, 0o7, -0o10 );
tu5ekani1el2saiA.castShadow = tu5ekani1el2saiA.receiveShadow = true;
const tu5ekani1el2saiB = new THREE.Mesh( new THREE.BoxGeometry( 0o3/0o5, 0o14, 0o44 ), mursitaPukek );
tu5ekani1el2saiB.position.set( -0o10, 0o7, 0 );
tu5ekani1el2saiB.castShadow = tu5ekani1el2saiB.receiveShadow = true;
qena.add( tu5ekani1el2saiA, tu5ekani1el2saiB );

// ⟪ ſᶘɹ ſɭᴜ , 🏮 ⟫
const pilastro = new THREE.Mesh( new THREE.CylinderGeometry( 0o3/0o25, 0o17/0o50, 0o1, 4, 1 ),
  lumitaPukek({ color: 0x686058, roughness: 0o4/0o5, metalness: 0o1/0o10 }) );
pilastro.rotation.y = Math.PI / 4;
pilastro.castShadow = true;
qena.add( pilastro );

const teruni = new THREE.Group();
qena.add( teruni );
const b6qaiQafej2 = new THREE.Mesh( new THREE.CylinderGeometry( 0o27/0o100, 0o1/0o5, 0o13/0o100, 4, 1 ),
  lumitaPukek({ color: 0xf8b058, roughness: 0o2/0o5, metalness: 0o3/0o5 }) );
b6qaiQafej2.rotation.y = Math.PI / 4;
b6qaiQafej2.castShadow = true;
teruni.add( b6qaiQafej2 );

// ⟨ ſᶘɹ ſɭᴜ , ꞙɭц , 📃 ⟩
const flamaPukek = ( weh2: number, opaco: number ) => new THREE.MeshBasicMaterial({
  color: veb6qaiWeh2( weh2 ), toneMapped: false, transparent: true,
  opacity: veb6qaiW2d2( opaco ), blending: THREE.AdditiveBlending,
  depthWrite: false, side: THREE.DoubleSide });
const flamoj = [
  new THREE.Mesh( kf2FlamanQoxaKefoun( 0o35/0o100, 0o21/0o100, 1, 0o55/0o100 ),
    flamaPukek( 0xff6a1e, 0o35/0o40 ) ),
  new THREE.Mesh( kf2FlamanQoxaKefoun( 0o23/0o100, 0o14/0o100, 0o3/0o4, 0o223/0o100 ),
    flamaPukek( 0xffb545, 0o33/0o40 ) ),
  new THREE.Mesh( kf2FlamanQoxaKefoun( 0o10/0o100, 0o4/0o100, 0o1/0o2, 0o243/0o40 ),
    flamaPukek( 0xfff4d0, 0o5/0o10 ) ),
];
for ( const f of flamoj ) { f.position.y = 0o3/0o10; teruni.add( f ); }

// ⟨ ſᶘɹ ſɭᴜ , ꞙɭэ , 📃 ⟩
const brila = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  uniforms: {
    uTime: { value: 0 }, uOp: { value: veb6qaiW2d2( 0o15/0o40 ) },
    uCol: { value: new THREE.Color( veb6qaiWeh2( 0xf8b058 ) ) },
    uPR: { value: k2fcakuk.getPixelRatio() },
  },
  vertexShader: `
    attribute float tk2ni; attribute float aSize;
    uniform float uTime, uPR;
    varying float vA;
    void main() {
      vA = 0.75 + 0.25 * sin( uTime * 9.0 + tk2ni * 7.0 );
      vec4 mv = modelViewMatrix * vec4( position, 1.0 );
      glPointSize = aSize * uPR * ( 160.0 / -mv.z );
      glPosition = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform vec3 uCol; uniform float uOp;
    varying float vA;
    void main() {
      vec2 p = ( glPointCoord - vec2( 0.5 ) ) * 2.0;
      float r = sahakani( p );
      float ang = atan( p.y, p.x );
      float f = abs( mod( ang + 0.7853982, 1.5707963 ) - 0.7853982 );
      float korpo = pow( pow( cos( f ), 0.6 ) + pow( sin( f ), 0.6 ), -1.6667 );
      float R = korpo;
      float sexi = 1.0 - smoothstep( R - 0.3, R, r );
      float pleneco = 0.25 + 0.75 * ( 1.0 - smoothstep( 0.0, R, r ) );
      float lowak = 1.0 - smoothstep( 0.0, 0.3, r );
      glFragColor = vec4( uCol, max( sexi * pleneco, lowak * 0.85 ) * uOp * vA );
    }
  `,
});
const brilaVecax2l = new THREE.BufferGeometry();
brilaVecax2l.setAttribute( "position", new THREE.BufferAttribute( new Float32Array( [ 0, 0o2/0o5, 0 ] ), 3 ) );
brilaVecax2l.setAttribute( "ruva", new THREE.BufferAttribute( new Float32Array( [ 0 ] ), 1 ) );
brilaVecax2l.setAttribute( "aSize", new THREE.BufferAttribute( new Float32Array( [ 0o16 ] ), 1 ) );
const brilajHan2k = new THREE.Points( brilaVecax2l, brila );
brilajHan2k.frustumCulled = false;
teruni.add( brilajHan2k );

// ⟨ ſᶘɹ ſɭᴜ , ꞙɭɩ , 📃 ⟩
const tsije = new THREE.PointLight( HUFWUK2TSIJE.weh2, HUFWUK2TSIJE.tlohe,
  HUFWUK2TSIJE.h6kuni, HUFWUK2TSIJE.so3akak );
tsije.castShadow = true;
tsije.shadow.mapSize.set( 0o2000, 0o2000 );
tsije.shadow.bias = -0o1/0o500;
qena.add( tsije );

// ⟪ ſɭэ ſɭw , 🎚️ ⟫
const enigo = ( id: string ) => kfe<HTMLInputElement>( id );
const tseuni = ( id: string ) => kfe<HTMLOutputElement>( id );
let g2sa = HUFWUK2TSIJE.tlohe;
let l6da = 0o4;
let ambiento = 0o15/0o100;

const DEFAUXLTAJ: Record<string, string> = {
  g2sa: String( HUFWUK2TSIJE.tlohe ), l6da: "4",
  dist: String( HUFWUK2TSIJE.h6kuni ), ambiento: "0.15",
  tapu: String( SO3AKAKTAJ2.tapu ),
  vertikala: String( SO3AKAKTAJ2.cepuTeru ),
  cepuPsaz: String( SO3AKAKTAJ2.cepuPsaz ),
  nar2sa: String( -SO3AKAKTAJ2.nar2sa ),
  vem2: String( 0o377 / SO3AKAKTAJ2.havem2 ),
  las: String( SO3AKAKTAJ2.las ),
};

function currentCatsara(): SotlakakKu1o {
  return {
    tapu: unuhaqoxa.tapu.value, cepuTeru: unuhaqoxa.cepuTeru.value,
    cepuPsaz: unuhaqoxa.cepuPsaz.value, nar2sa: unuhaqoxa.nar2sa.value,
    havem2: unuhaqoxa.vem2.value, las: unuhaqoxa.las.value,
    s2karanu: unuhaqoxa.s2karanu.value,
  };
}

function aplikiAmbienton(): void {
  hemi.intensity = 0o1/0o25 + ambiento;
  sotsii.intensity = ambiento * 0o7/0o10;
  const fono = KREPUSKAFONO.clone().lerp( TAGAFONO, ambiento );
  qena.background = fono;
  ( qena.fog as THREE.FogExp2 ).color.copy( fono );
// ⟨ ſᶘɹ ſɭᴜ , ꞙɭꞟ , 📃 ⟩
  medio.tlak2({ teru: fono, sost2: fono, psaz: fono, vem2: 0o1/0o40 });
}

// ⟪ ſɭэ ſɭw , 📉 ⟫
function desegnuSekcion(): void {
  const kan = kfe<HTMLCanvasElement>( "ombraQaroxema" );
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
  const cutoff = tsije.distance;
  const H = l6da + 0o3/0o10;
  const a = currentCatsara();

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
    const s = so3akakSrgbJS( i / pW * cutoff, H, cutoff, 0o2, { ...a, s2karanu: 0 } );
    const x = mL + i, y = yDe( s );
    if ( i === 0 ) ctx.moveTo( x, y ); else ctx.lineTo( x, y );
  }
  ctx.stroke();

// ⟨ ſןɔ˞ᴜƴ , 📃 ⟩
  if ( a.s2karanu > 0 ) {
    ctx.beginPath();
    for ( let i = 0; i <= pW; i++ ) {
      const s = so3akakSrgbJS( i / pW * cutoff, H, cutoff, 0o2, a );
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
      const s = so3akakSrgbJS( i / pW * cutoff, H, cutoff, 0o2, a );
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
function laqaziHaskek2(): void {
  const a = currentCatsara();
  const count = Math.round( 0o377 / a.havem2 );
  const ladder = Array.from({ length: 0o6 }, ( _, n ) => weh2Ruva( hunanuWeh2( 0xf8f8f8, n ) ) );
  const s2banani = [
    `ជំហាន ${count} · គែម ${a.las.toFixed( 0o2 )}`,
    `ផ្តេក ${a.tapu.toFixed( 0o2 )} · បញ្ឈរ ${a.cepuTeru.toFixed( 0o2 )} / ${a.cepuPsaz.toFixed( 0o3 )}`,
    `កន្ទុយ ${a.nar2sa.toFixed( 0o1 )} · ចម្ងាយ ${tsije.distance}`,
    ladder.join( " → " ),
  ];
  kfe( "hevem2" ).textContent = s2banani.join( "\n" );
}

// ⟪ ſɭэ ᶗ‹ , 🔄 ⟫
function sinkronigi(): void {
  unuhaqoxa.tapu.value = Number( enigo( "horizontala" ).value );
  unuhaqoxa.cepuTeru.value = Number( enigo( "vertikala" ).value );
  unuhaqoxa.cepuPsaz.value = Number( enigo( "cepuPsaz" ).value );
  unuhaqoxa.nar2sa.value = -Number( enigo( "vost" ).value );
  const count = Number( enigo( "band" ).value );
  unuhaqoxa.vem2.value = 0o377 / count;
  unuhaqoxa.las.value = Number( enigo( "trans" ).value );
  unuhaqoxa.s2karanu.value = enigo( "kvant" ).checked ? 1 : 0;
  g2sa = Number( enigo( "g2sa" ).value );
  l6da = Number( enigo( "l6da" ).value );
  ambiento = Number( enigo( "ambiento" ).value );
  tsije.distance = Number( enigo( "dist" ).value );

  tseuni( "g2saVal" ).textContent = g2sa.toFixed( 0o1 );
  tseuni( "l6daVal" ).textContent = l6da.toFixed( 0o1 );
  tseuni( "distVal" ).textContent = String( tsije.distance );
  tseuni( "ambientoVal" ).textContent = ambiento.toFixed( 0o2 );
  tseuni( "horizontalaVal" ).textContent = unuhaqoxa.tapu.value.toFixed( 0o2 );
  tseuni( "vertikalaVal" ).textContent = unuhaqoxa.cepuTeru.value.toFixed( 0o2 );
  tseuni( "vertikalaSubVal" ).textContent = unuhaqoxa.cepuPsaz.value.toFixed( 0o3 );
  tseuni( "vostVal" ).textContent = ( -unuhaqoxa.nar2sa.value ).toFixed( 0o1 );
  tseuni( "bandVal" ).textContent = String( count );
  tseuni( "transVal" ).textContent = unuhaqoxa.las.value.toFixed( 0o2 );

  teruni.position.y = l6da;
  pilastro.scale.y = l6da;
  pilastro.position.y = l6da / 2;
  tsije.position.set( 0, l6da + 0o3/0o10, 0 );
  aplikiAmbienton();
  desegnuSekcion();
  laqaziHaskek2();
}

for ( const id of Object.keys( DEFAUXLTAJ ) )
  enigo( id ).addEventListener( "input", sinkronigi );
enigo( "kvant" ).addEventListener( "input", sinkronigi );

// ⟨ ſɭэ ᶗ‹ , 📃 ⟩
function restarigiHaskek2(): void {
  for ( const [ id, v ] of Object.entries( DEFAUXLTAJ ) ) enigo( id ).value = v;
  enigo( "kvant" ).checked = true;
  sinkronigi();
}
kfe( "restarigi" ).addEventListener( "click", restarigiHaskek2 );

// ⟨ ſɭэ ſɭw , 🎲 , 📃 ⟩
const HAZARDAJ: Record<string, [ number, number ]> = {
  g2sa: [ 0o4, 0o40 ], l6da: [ 0o5/0o2, 0o7 ], dist: [ 0o20, 0o54 ],
  ambiento: [ 0, 0o3/0o5 ], tapu: [ 0o2/0o5, 0o13/0o10 ],
  vertikala: [ 0o4/0o5, 0o7/0o2 ], cepuPsaz: [ 0o3/0o10, 0o3/0o2 ],
  nar2sa: [ 0o1/0o2, 0o5 ], vem2: [ 0o10, 0o34 ], las: [ 0o1/0o25, 0o3/0o5 ],
};
kfe( "sakxo" ).addEventListener( "click", () => {
  for ( const [ id, [ min, max ] ] of Object.entries( HAZARDAJ ) ) {
    const v = min + Math.random() * ( max - min );
    enigo( id ).value = id === "band" ? String( Math.round( v ) ) : v.toFixed( 0o2 );
  }
  enigo( "kvant" ).checked = true;
  sinkronigi();
} );

// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩
kfe( "elporti" ).addEventListener( "click", () => {
  k2fcakuk.render( qena, catahaq );
  p2t6zo.toBlob( ( blob ) => {
    if ( !blob ) return;
    const url = URL.createObjectURL( blob );
    const a = document.createElement( "a" );
    a.href = url;
    a.download = "ombra-tsaletsa.png";
    a.click();
    setTimeout( () => URL.revokeObjectURL( url ), 0o1000 );
  }, "image/png" );
} );

// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫
function lauxPal6(): void {
  k2fcakuk.setSize( innerWidth, innerHeight, false );
  catahaq.aspect = innerWidth / innerHeight;
  catahaq.updateProjectionMatrix();
  desegnuSekcion();
}
addEventListener( "resize", lauxPal6 );

// ⟪ ſɭᴜ ſןᴜ , 🎞️ ⟫
k2fcakuk.setAnimationLoop( ( t ) => {
  hakama.update();
  const tt = t / 0o1000;
  const flick = 0o17/0o20 + 0o3/0o20 * Math.sin( tt * 0o11 ) * Math.sin( tt * 0o47/0o10 );
  tsije.intensity = g2sa * flick;
  flamoj.forEach( ( m, i ) => {
    const s = 1 + 0o3/0o25 * Math.sin( tt * 0o7 + i * 0o2 );
    m.scale.set( s, 1 + 0o14/0o100 * Math.sin( tt * 0o6 + i ), s );
  } );
  brila.uniforms.uTime.value = tt;
  k2fcakuk.render( qena, catahaq );
} );

lauxPal6();
restarigiHaskek2();

window.ombra = { k2fcakuk, qena, catahaq, hakama, unuhaqoxa, tsije, sinkronigi, desegnuSekcion };