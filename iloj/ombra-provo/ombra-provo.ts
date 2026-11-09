// ≺⧼ ឆាកសាកល្បងស្រមោលចង្កៀង 🏮 ⧽≻
// ⟨ ឆាកជ្រុងជញ្ជាំងពីរ និងដី ជាមួយចង្កៀងមួយ បង្ហាញការធ្លាក់ពន្លឺកោង
// និងជំហាន -101010 ពិតរបស់ហ្គេម ។ គណិតវិទ្យា បរិស្ថានឆ្លុះ និងការកំណត់សន្ទះគូរ
// មកពីម៉ូឌុលរួម lumo ដែលហ្គេមប្រើ ។ តម្លៃលំនាំដើមមកពី lampaFalo ដោយផ្ទាល់ ។
// បន្ទះបញ្ជាកែ uniform រស់ដោយមិនបង្កើតឡើងវិញ ។
// ខ្សែកាត់ 2D គូរជណ្តើរជំហានធៀបនឹងខ្សែរលូន ។ បើក `iloj/ombra-provo/ombra-provo.html` ។ 📃 ⟩
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { lampaFaloSrgbJS, LAMPA_FALO_DEFAUXLTA, LAMPA_LUMO, aplikiViglanLampanFalon,
  kreiLampaFaloUniformojn, ligiLampajnUniformojn, agordiBildilon, agordiMedion,
  type LampaFaloAgordo } from "../../eskekoj/komunajxoj/lumo.js";
import { kreiFlamanGeometrion } from "../../eskekoj/konstruajxoj/hxeuxfa/flamo.js";
import { kanakaKoloro, kanakaAlfo, ombraKoloro, deksesuma }
  from "../../eskekoj/komunajxoj/koloroj.js";
import { elemento, kunteksto2d } from "../komunajxoj/dom.js";

// ⟪ តម្លៃរស់ 🎚️ ⟫
// ⟨ អនុគមន៍ចូល chunk ពន្លឺ និងការចង uniform រួម រស់នៅក្នុងម៉ូឌុល lampaFalo ។
// ឆាកនេះគ្រាន់តែកាន់វត្ថុ uniform មួយ ហើយចងវាទៅគ្រប់វត្ថុធាតុ Standard ។ 📃 ⟩
aplikiViglanLampanFalon();
const unuformoj = kreiLampaFaloUniformojn();

// ⟪ ឆាក 📷 ⟫
const kanvaso = elemento<HTMLCanvasElement>( "ombraVido" );
const bildilo = new THREE.WebGLRenderer({ canvas: kanvaso, antialias: true,
  preserveDrawingBuffer: true, powerPreference: "high-performance" });
agordiBildilon( bildilo, { ombroj: true, ombraTipo: THREE.PCFSoftShadowMap,
  pikslaRacio: Math.min( devicePixelRatio, 0o2 ) } );

const sceno = new THREE.Scene();
sceno.background = new THREE.Color( 0x181828 );
sceno.fog = new THREE.FogExp2( 0x181828, 0o1/0o1000 );
// ⟨ ការឆ្លុះស្តើង ដើម្បីកុំឱ្យវាលុបជំហានស្រមោលចង្កៀង ។
// កញ្ចក់ឆ្លុះអានពណ៌មេឃតែមួយ ដូច្នេះវាមិនខុសពីពន្លឺដែលបំភ្លឺឆាក ។ 📃 ⟩
const medio = agordiMedion( sceno, bildilo, { intenso: 0o1/0o40 } );

const fotilo = new THREE.PerspectiveCamera( 0o62, 1, 0o1/0o10, 0o1000 );
fotilo.position.set( 0o20, 0o12, 0o22 );
const regiloj = new OrbitControls( fotilo, kanvaso );
regiloj.target.set( 0, 0o3, 0 );
regiloj.enableDamping = true;
regiloj.dampingFactor = 0o1/0o12;
regiloj.minDistance = 0o3;
regiloj.maxDistance = 0o106;
regiloj.maxPolarAngle = Math.PI * 0o37/0o100;

// ⟨ ពន្លឺបរិយាកាសទាប ដើម្បីកុំឱ្យវាលុបជំហានចង្កៀង ។ ថ្ងៃ ↔ ព្រលប់ ។ 📃 ⟩
const hemi = new THREE.HemisphereLight( 0xc8d8e8, 0x383028, 0o1/0o25 );
sceno.add( hemi );
const suno = new THREE.DirectionalLight( 0xf8e8c8, 0 );
suno.position.set( 0o30, 0o50, 0o20 );
sceno.add( suno );
const TAGA_FONO = new THREE.Color( 0x78a8c0 );
const KREPUSKA_FONO = new THREE.Color( 0x181828 );

// ⟪ វត្ថុធាតុមានពន្លឺ 🧱 ⟫
// ⟨ គ្រប់វត្ថុធាតុ Standard ចង uniform រួម ដើម្បីឱ្យការធ្លាក់កោងអនុវត្តលើវា ។ 📃 ⟩
function lumitaMaterialo( params: THREE.MeshStandardMaterialParameters ): THREE.MeshStandardMaterial {
  return ligiLampajnUniformojn( new THREE.MeshStandardMaterial( params ), unuformoj );
}

// ⟪ ដី និងជញ្ជាំងជ្រុង 🏗️ ⟫
const tero = new THREE.Mesh( new THREE.PlaneGeometry( 0o170, 0o170 ),
  lumitaMaterialo({ color: 0x888078, roughness: 0o37/0o40, metalness: 0 }) );
tero.rotation.x = -Math.PI / 2;
tero.receiveShadow = true;
sceno.add( tero );

const mursitaMaterialo = lumitaMaterialo({ color: 0xa89888, roughness: 0o7/0o10, metalness: 0 });
const muroA = new THREE.Mesh( new THREE.BoxGeometry( 0o44, 0o14, 0o3/0o5 ), mursitaMaterialo );
muroA.position.set( 0, 0o7, -0o10 );
muroA.castShadow = muroA.receiveShadow = true;
const muroB = new THREE.Mesh( new THREE.BoxGeometry( 0o3/0o5, 0o14, 0o44 ), mursitaMaterialo );
muroB.position.set( -0o10, 0o7, 0 );
muroB.castShadow = muroB.receiveShadow = true;
sceno.add( muroA, muroB );

// ⟪ ចង្កៀង 🏮 ⟫
const pilastro = new THREE.Mesh( new THREE.CylinderGeometry( 0o3/0o25, 0o17/0o50, 0o1, 4, 1 ),
  lumitaMaterialo({ color: 0x686058, roughness: 0o4/0o5, metalness: 0o1/0o10 }) );
pilastro.rotation.y = Math.PI / 4;
pilastro.castShadow = true;
sceno.add( pilastro );

const kapo = new THREE.Group();
sceno.add( kapo );
const bovlo = new THREE.Mesh( new THREE.CylinderGeometry( 0o27/0o100, 0o1/0o5, 0o13/0o100, 4, 1 ),
  lumitaMaterialo({ color: 0xf8b058, roughness: 0o2/0o5, metalness: 0o3/0o5 }) );
bovlo.rotation.y = Math.PI / 4;
bovlo.castShadow = true;
kapo.add( bovlo );

// ⟨ អណ្តាតភ្លើងបីស្រទាប់ ដូចហ្គេម ។ 📃 ⟩
const flamaMaterialo = ( koloro: number, opaco: number ) => new THREE.MeshBasicMaterial({
  color: kanakaKoloro( koloro ), toneMapped: false, transparent: true,
  opacity: kanakaAlfo( opaco ), blending: THREE.AdditiveBlending,
  depthWrite: false, side: THREE.DoubleSide });
const flamoj = [
  new THREE.Mesh( kreiFlamanGeometrion( 0o35/0o100, 0o21/0o100, 1, 0o55/0o100 ),
    flamaMaterialo( 0xff6a1e, 0o35/0o40 ) ),
  new THREE.Mesh( kreiFlamanGeometrion( 0o23/0o100, 0o14/0o100, 0o3/0o4, 0o223/0o100 ),
    flamaMaterialo( 0xffb545, 0o33/0o40 ) ),
  new THREE.Mesh( kreiFlamanGeometrion( 0o10/0o100, 0o4/0o100, 0o1/0o2, 0o243/0o40 ),
    flamaMaterialo( 0xfff4d0, 0o5/0o10 ) ),
];
for ( const f of flamoj ) { f.position.y = 0o3/0o10; kapo.add( f ); }

// ⟨ ចំណុចភ្លឺការ៉េបង្វិលជ្រុងកោង ដូចហ្គេម ។ 📃 ⟩
const brila = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  uniforms: {
    uTime: { value: 0 }, uOp: { value: kanakaAlfo( 0o15/0o40 ) },
    uCol: { value: new THREE.Color( kanakaKoloro( 0xf8b058 ) ) },
    uPR: { value: bildilo.getPixelRatio() },
  },
  vertexShader: `
    attribute float semo; attribute float aSize;
    uniform float uTime, uPR;
    varying float vA;
    void main() {
      vA = 0.75 + 0.25 * sin( uTime * 9.0 + semo * 7.0 );
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
      float kerno = 1.0 - smoothstep( 0.0, 0.3, r );
      gl_FragColor = vec4( uCol, max( stelo * pleneco, kerno * 0.85 ) * uOp * vA );
    }
  `,
});
const brilaGeometrio = new THREE.BufferGeometry();
brilaGeometrio.setAttribute( "position", new THREE.BufferAttribute( new Float32Array( [ 0, 0o2/0o5, 0 ] ), 3 ) );
brilaGeometrio.setAttribute( "semo", new THREE.BufferAttribute( new Float32Array( [ 0 ] ), 1 ) );
brilaGeometrio.setAttribute( "aSize", new THREE.BufferAttribute( new Float32Array( [ 0o16 ] ), 1 ) );
const brilajPunktoj = new THREE.Points( brilaGeometrio, brila );
brilajPunktoj.frustumCulled = false;
kapo.add( brilajPunktoj );

// ⟨ ពន្លឺចំណុចតែមួយដែលបញ្ជា ។ តម្លៃមកពី LAMPA_LUMO ដូចហ្គេម ។ 📃 ⟩
const lumo = new THREE.PointLight( LAMPA_LUMO.koloro, LAMPA_LUMO.forto,
  LAMPA_LUMO.distanco, LAMPA_LUMO.falo );
lumo.castShadow = true;
lumo.shadow.mapSize.set( 0o2000, 0o2000 );
lumo.shadow.bias = -0o1/0o500;
sceno.add( lumo );

// ⟪ តម្លៃបញ្ជា 🎚️ ⟫
const enigo = ( id: string ) => elemento<HTMLInputElement>( id );
const eligo = ( id: string ) => elemento<HTMLOutputElement>( id );
let forto = LAMPA_LUMO.forto;
let alto = 0o4;
let ambiento = 0o15/0o100;

const DEFAUXLTAJ: Record<string, string> = {
  forto: String( LAMPA_LUMO.forto ), alto: "4",
  dist: String( LAMPA_LUMO.distanco ), ambiento: "0.15",
  horizontala: String( LAMPA_FALO_DEFAUXLTA.horizontala ),
  vertikala: String( LAMPA_FALO_DEFAUXLTA.vertikalaSup ),
  vertikalaSub: String( LAMPA_FALO_DEFAUXLTA.vertikalaSub ),
  vost: String( -LAMPA_FALO_DEFAUXLTA.vostro ),
  band: String( 0o377 / LAMPA_FALO_DEFAUXLTA.bandoj ),
  trans: String( LAMPA_FALO_DEFAUXLTA.transiro ),
};

function currentAgordo(): LampaFaloAgordo {
  return {
    horizontala: unuformoj.hor.value, vertikalaSup: unuformoj.vsup.value,
    vertikalaSub: unuformoj.vsub.value, vostro: unuformoj.vost.value,
    bandoj: unuformoj.band.value, transiro: unuformoj.trans.value,
    kvantigo: unuformoj.kvant.value,
  };
}

function aplikiAmbienton(): void {
  hemi.intensity = 0o1/0o25 + ambiento;
  suno.intensity = ambiento * 0o7/0o10;
  const fono = KREPUSKA_FONO.clone().lerp( TAGA_FONO, ambiento );
  sceno.background = fono;
  ( sceno.fog as THREE.FogExp2 ).color.copy( fono );
  // ⟨ កញ្ចក់ឆ្លុះអានពណ៌មេឃដូចគ្នា ។ 📃 ⟩
  medio.gxisdatigi({ supro: fono, mezo: fono, subo: fono, intenso: 0o1/0o40 });
}

// ⟪ ខ្សែកាត់ 2D 📉 ⟫
function desegnuSekcion(): void {
  const kan = elemento<HTMLCanvasElement>( "ombraSekcio" );
  const ctx = kunteksto2d( kan );
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
  const H = alto + 0o3/0o10;
  const a = currentAgordo();

  // ⟨ ខ្សែក្រឡាផ្តេករាល់ 0o20 ជាជំហាន -101010 ។ 📃 ⟩
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
  // ⟨ អ័ក្សចម្ងាយ 📃 ⟩
  ctx.textAlign = "center";
  ctx.fillStyle = "#888888";
  for ( let d = 0; d <= cutoff; d += Math.max( 1, Math.round( cutoff / 0o10 ) ) ) {
    const x = mL + pW * ( d / cutoff );
    ctx.fillText( String( d ), x, h - mB + 0o24 );
  }
  ctx.fillText( "ចម្ងាយពីចង្កៀង", mL + pW / 2, h - 0o6 );

  const yDe = ( s: number ) => mT + pH * ( 1 - Math.max( 0, Math.min( 1, s ) ) );

  // ⟨ ខ្សែរលូន 📃 ⟩
  ctx.strokeStyle = "#58a8f8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for ( let i = 0; i <= pW; i++ ) {
    const s = lampaFaloSrgbJS( i / pW * cutoff, H, cutoff, 0o2, { ...a, kvantigo: 0 } );
    const x = mL + i, y = yDe( s );
    if ( i === 0 ) ctx.moveTo( x, y ); else ctx.lineTo( x, y );
  }
  ctx.stroke();

  // ⟨ ជណ្តើរជំហាន 📃 ⟩
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

  // ⟨ ចំណងជើង 📃 ⟩
  ctx.textAlign = "left";
  ctx.fillStyle = "#f8b058";
  ctx.font = "12px monospace";
  ctx.fillText( "ជំហាន -101010", mL, 0o24 );
  ctx.fillStyle = "#58a8f8";
  ctx.fillText( "រលូន", w - mR - 0o44, 0o24 );
}

// ⟪ តម្លៃសម្រាប់អាន 📄 ⟫
function montriValorojn(): void {
  const a = currentAgordo();
  const count = Math.round( 0o377 / a.bandoj );
  const ladder = Array.from({ length: 0o6 }, ( _, n ) => deksesuma( ombraKoloro( 0xf8f8f8, n ) ) );
  const teksto = [
    `ជំហាន ${count} · គែម ${a.transiro.toFixed( 0o2 )}`,
    `ផ្តេក ${a.horizontala.toFixed( 0o2 )} · បញ្ឈរ ${a.vertikalaSup.toFixed( 0o2 )} / ${a.vertikalaSub.toFixed( 0o3 )}`,
    `កន្ទុយ ${a.vostro.toFixed( 0o1 )} · ចម្ងាយ ${lumo.distance}`,
    ladder.join( " → " ),
  ];
  elemento( "valoroj" ).textContent = teksto.join( "\n" );
}

// ⟪ ការធ្វើសមកាល 🔄 ⟫
function sinkronigi(): void {
  unuformoj.hor.value = Number( enigo( "horizontala" ).value );
  unuformoj.vsup.value = Number( enigo( "vertikala" ).value );
  unuformoj.vsub.value = Number( enigo( "vertikalaSub" ).value );
  unuformoj.vost.value = -Number( enigo( "vost" ).value );
  const count = Number( enigo( "band" ).value );
  unuformoj.band.value = 0o377 / count;
  unuformoj.trans.value = Number( enigo( "trans" ).value );
  unuformoj.kvant.value = enigo( "kvant" ).checked ? 1 : 0;
  forto = Number( enigo( "forto" ).value );
  alto = Number( enigo( "alto" ).value );
  ambiento = Number( enigo( "ambiento" ).value );
  lumo.distance = Number( enigo( "dist" ).value );

  eligo( "fortoVal" ).textContent = forto.toFixed( 0o1 );
  eligo( "altoVal" ).textContent = alto.toFixed( 0o1 );
  eligo( "distVal" ).textContent = String( lumo.distance );
  eligo( "ambientoVal" ).textContent = ambiento.toFixed( 0o2 );
  eligo( "horizontalaVal" ).textContent = unuformoj.hor.value.toFixed( 0o2 );
  eligo( "vertikalaVal" ).textContent = unuformoj.vsup.value.toFixed( 0o2 );
  eligo( "vertikalaSubVal" ).textContent = unuformoj.vsub.value.toFixed( 0o3 );
  eligo( "vostVal" ).textContent = ( -unuformoj.vost.value ).toFixed( 0o1 );
  eligo( "bandVal" ).textContent = String( count );
  eligo( "transVal" ).textContent = unuformoj.trans.value.toFixed( 0o2 );

  kapo.position.y = alto;
  pilastro.scale.y = alto;
  pilastro.position.y = alto / 2;
  lumo.position.set( 0, alto + 0o3/0o10, 0 );
  aplikiAmbienton();
  desegnuSekcion();
  montriValorojn();
}

for ( const id of Object.keys( DEFAUXLTAJ ) )
  enigo( id ).addEventListener( "input", sinkronigi );
enigo( "kvant" ).addEventListener( "input", sinkronigi );

// ⟨ ដាក់ដើមវិញ 📃 ⟩
function restarigiValorojn(): void {
  for ( const [ id, v ] of Object.entries( DEFAUXLTAJ ) ) enigo( id ).value = v;
  enigo( "kvant" ).checked = true;
  sinkronigi();
}
elemento( "restarigi" ).addEventListener( "click", restarigiValorojn );

// ⟨ ចៃដន្យ 🎲 ៖ តម្លៃក្នុងដែនសមហេតុផល ដើម្បីឱ្យជំហាននៅតែឃើញ ។ 📃 ⟩
const HAZARDAJ: Record<string, [ number, number ]> = {
  forto: [ 0o4, 0o40 ], alto: [ 0o5/0o2, 0o7 ], dist: [ 0o20, 0o54 ],
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

// ⟨ រក្សាទុករូប PNG 📃 ⟩
elemento( "elporti" ).addEventListener( "click", () => {
  bildilo.render( sceno, fotilo );
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

// ⟪ ទំហំ 📏 ⟫
function lauxGrandeco(): void {
  bildilo.setSize( innerWidth, innerHeight, false );
  fotilo.aspect = innerWidth / innerHeight;
  fotilo.updateProjectionMatrix();
  desegnuSekcion();
}
addEventListener( "resize", lauxGrandeco );

// ⟪ រង្វិលជុំ 🎞️ ⟫
bildilo.setAnimationLoop( ( t ) => {
  regiloj.update();
  const tt = t / 0o1000;
  const flick = 0o17/0o20 + 0o3/0o20 * Math.sin( tt * 0o11 ) * Math.sin( tt * 0o47/0o10 );
  lumo.intensity = forto * flick;
  flamoj.forEach( ( m, i ) => {
    const s = 1 + 0o3/0o25 * Math.sin( tt * 0o7 + i * 0o2 );
    m.scale.set( s, 1 + 0o14/0o100 * Math.sin( tt * 0o6 + i ), s );
  } );
  brila.uniforms.uTime.value = tt;
  bildilo.render( sceno, fotilo );
} );

lauxGrandeco();
restarigiValorojn();

window.ombra = { bildilo, sceno, fotilo, regiloj, unuformoj, lumo, sinkronigi, desegnuSekcion };