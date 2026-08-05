// Keuxfhxeso ( ſɭw ʃɔɔ˞ ) - strukturo el ses falditaj folioj kun 6-flanka
// simetrio. De supre ĝi estas mola sespinta stelo. la poloj estas rondaj kaj
// la konkavaj flankoj inter ili estas glataj arkoj, ne krevoj. De flanko ĉiu
// folio kunfaldiĝas en longan rondan ovalon, sen vertikala ŝvelaĵo. La ses
// oraj poloj sekvas la eksterajn krestojn kaj finiĝas glate en la korpo.
// La dezajno estas EN la flankoj mem kiel SVG-stila teksturo.
// cxiu folio montras 4-pintan stelon kun du parentezaj kurboj, kaj supre/
// sube - du simetriaj liniaj folioj, desegnitaj sur kanvaso kaj bakita super
// la malhel-pina bazo kun oraj bandoj ĉe AMBAŬ finoj - la korpo estas tute
// opaka, neniu travidebla centro. La arta lingvo kongruas kun la arkitekturo
// ( malhel-pina muro, oraj kadroj ) kaj la vestoj ( stelo/rombo-motivoj ).
import * as THREE from "three";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";

export interface KeuxfhxesoLoko {
  x: number; z: number;
  /** Nedeviga orientigxo - la strukturo havas 6-flankan simetrion, do tio nur vicigas la ripojn. */
  rot?: number;
}



// kreiFolianTeksajxon - SVG-stila kanvasa teksturo por cxiu folio. Cxe la
// centro estas ora 4-pinta stelo, flanke de gxi du parentezaj kurboj; supre
// kaj sube - du simetriaj liniaj folioj ( la foliaj pintoj rigardas al la
// centro ). La kanvaso havas la saman proporcion kiel la longa, mallarĝa
// folia faco ( 0o56/0o10 = 5.75 fojojn pli alta ol larĝa ), do la dezajno
// etendiĝas tra la tuta faco kaj ne estas kunpremita al la centro.
function kreiFolianTeksajxon(): THREE.CanvasTexture {
  const H = 0o1000;                  // kanvasa alto ( alta rezolucio, ne malakra )
  const STRETCH = 0o56 / 0o10;       // alto/larĝa proporcio de la folia faco
  const W = Math.round( H * STRETCH );
  const kanvasa = document.createElement( "canvas" );
  kanvasa.width = W;
  kanvasa.height = H;
  const k = kanvasa.getContext( "2d" )!;
  k.fillStyle = "#184038";
  k.fillRect( 0, 0, W, H );
  k.lineCap = "round";
  k.lineJoin = "round";
  const oro = "#e0c088";
  k.strokeStyle = oro;
  k.fillStyle = oro;
  // La centro de la folio ( la valo inter du poloj ) estas u = 0o1/0o2 laux
  // la UV-konvencio de starfruktKorpo; la dezajno estas vertikale simetria.
  const cx = W * 0o1 / 0o2;
  const cy = H * 0o1 / 0o2;

  // ── Orataj finoj: glataj oraj bandoj ĉe ambaŭ randoj ( unue, por ke
  // ili ne kovru la foliajn desegnojn ) ──
  const gr = k.createLinearGradient( 0, 0, 0, H * 0o1 / 0o10 );
  gr.addColorStop( 0, "#e0c088" );
  gr.addColorStop( 1, "rgba(224,192,136,0)" );
  k.fillStyle = gr;
  k.fillRect( 0, 0, W, H * 0o1 / 0o10 );
  const gb = k.createLinearGradient( 0, H * 0o7 / 0o10, 0, H );
  gb.addColorStop( 0, "rgba(224,192,136,0)" );
  gb.addColorStop( 1, "#e0c088" );
  k.fillStyle = gb;
  k.fillRect( 0, H * 0o7 / 0o10, W, H * 0o1 / 0o10 );

  // ── 4-pinta stelo en la centro ( la kvarStelo-motivo de la vestoj ) ──
  // La banda gradiento lasis k.fillStyle = gb ( travidebla en la centro ) —
  // reestigu la oran plenigon, alie la stelo estus nevidebla.
  k.fillStyle = oro;
  const rx = W * 0o1 / 0o3;   // larĝa sed mallonga — sur la faco ĝi estas kvadrata
  const ry = H * 0o7 / 0o200;
  const sr = 0o11 / 0o20;
  k.beginPath();
  k.moveTo( cx, cy - ry );
  k.quadraticCurveTo( cx + rx * sr, cy - ry * sr, cx + rx, cy );
  k.quadraticCurveTo( cx + rx * sr, cy + ry * sr, cx, cy + ry );
  k.quadraticCurveTo( cx - rx * sr, cy + ry * sr, cx - rx, cy );
  k.quadraticCurveTo( cx - rx * sr, cy - ry * sr, cx, cy - ry );
  k.closePath();
  k.fill();

  // ── Parentezaj kurboj ambaŭflanke de la stelo ──
  k.lineWidth = H * 0o1 / 0o100;
  k.beginPath();
  k.moveTo( cx - W * 0o3 / 0o10, cy - H * 0o3 / 0o100 );
  k.quadraticCurveTo( cx - W * 0o37 / 0o100, cy, cx - W * 0o3 / 0o10, cy + H * 0o3 / 0o100 );
  k.moveTo( cx + W * 0o3 / 0o10, cy - H * 0o3 / 0o100 );
  k.quadraticCurveTo( cx + W * 0o37 / 0o100, cy, cx + W * 0o3 / 0o10, cy + H * 0o3 / 0o100 );
  k.stroke();

  // ── Simetria folio supere kaj sube ──
  // Supro: folia pinto supre, larĝa bazo malsupren al la centro.
  const folioDuonoLargho = W * 0o16 / 0o100;
  const foliaSupro = H * 0o2 / 0o100;
  const foliaBazo = H * 0o23 / 0o100;
  const foliaMezo = H * 0o12 / 0o100;
  const foliaVeinLargho = W * 0o14 / 0o100;
  const foliaVeinAlto = H * 0o5 / 0o100;
  k.lineWidth = H * 0o1 / 0o100;
  const desegnuFolion = ( supra: boolean ) => {
    const pintoY = supra ? foliaSupro : H - foliaSupro;
    const mezoY = supra ? foliaMezo : H - foliaMezo;
    const bazoY = supra ? foliaBazo : H - foliaBazo;
    const centraBazoY = supra ? foliaBazo + H * 0o1 / 0o100 : H - foliaBazo - H * 0o1 / 0o100;
    // Konturo: ovaleca folio kun akra pinto al la ekstera rando.
    k.beginPath();
    k.moveTo( cx, pintoY );
    k.quadraticCurveTo( cx - folioDuonoLargho, mezoY, cx - folioDuonoLargho, bazoY );
    k.quadraticCurveTo( cx, centraBazoY, cx + folioDuonoLargho, bazoY );
    k.quadraticCurveTo( cx + folioDuonoLargho, mezoY, cx, pintoY );
    k.closePath();
    k.stroke();
    // Meza ribo de la folio.
    k.beginPath();
    k.moveTo( cx, pintoY );
    k.lineTo( cx, bazoY );
    k.stroke();
    // Du oblikvaj vejnoj sur cxiu flanko, ambaŭ kurbiĝantaj al la bazo.
    const veinBazY = bazoY;
    const veinMezoY = supra ? foliaMezo + foliaVeinAlto : H - foliaMezo - foliaVeinAlto;
    for ( const sgn of [ -1, 1 ] ) {
      k.beginPath();
      k.moveTo( cx, mezoY );
      k.quadraticCurveTo(
        cx + sgn * foliaVeinLargho, veinMezoY,
        cx + sgn * foliaVeinLargho * 0o11 / 0o10, veinBazY
      );
      k.stroke();
    }
  };
  desegnuFolion( true );
  desegnuFolion( false );

  const t = new THREE.CanvasTexture( kanvasa );
  t.colorSpace = THREE.SRGBColorSpace;
  // Klareco de la linia desegno: alta anizotropio kontraŭ la forto de la
  // tre mallarĝa faco ( samstile kiel la aliaj kanvasaj teksturoj ).
  t.anisotropy = 0o10;
  return t;
}

// sespintaStelo - Fermita, glata sespinta konturo. Ĉiu el la ses pintoj
// estas mallarĝa sed rondigita; inter ili estas unu kontinua, mola konkava
// arko. Neniuj Bezier-kudroj aŭ akraj faldoj aperas en la supra silueto.
function sespintaStelo( rEkstera: number ): THREE.Vector2[] {
  const punktoj: THREE.Vector2[] = [];
  const segmentoj = 0o16 * 6;
  // La valo restas klare interne, dum la pli granda eksponento faras la
  // ses eksterajn faldojn pli akraj kaj pli elegantaj, ne rondaj buloj.
  const valoraRadiuso = rEkstera * 0o45/0o100;
  const pintoAkrecajxo = 0o4;
  for ( let j = 0; j < segmentoj; j++ ) {
    const ang = j / segmentoj * Math.PI * 0o2;
    // |cos(3a)| metas pinton ĉe ĉiu sesa akso kaj valon ĝuste inter ili.
    // La granda eksponento kunpremas ĉiun pinton al eleganta faldita pinto;
    // la valoj restas unuopaj, kontinuaj konkavaj arkoj — neniu krezo.
    const pinto = Math.pow( Math.abs( Math.cos( 3 * ang ) ), pintoAkrecajxo );
    const radiuso = valoraRadiuso + ( rEkstera - valoraRadiuso ) * pinto;
    punktoj.push( new THREE.Vector2(
      Math.cos( ang ) * radiuso,
      Math.sin( ang ) * radiuso
    ) );
  }
  return punktoj;
}

// folioProfilo - Vertikala folio kun pintaj finoj kaj flankoj kiuj kurbiĝas
// internen. Pli ol sinusforma rondo, ĉi tiu iom pli streĉita profilo evitas
// eksteran ŝvelaĵon: ĝi restas mallarĝa ĝis la mezo, kie ĝi larĝiĝas glate.
function folioProfilo( t: number ): number {
  return Math.pow( Math.max( 0, Math.sin( Math.PI * t ) ), 0o23 / 0o20 );
}

// starfruktKorpo - Sxovita surfaco. La glata sespinta sekco estas skaleblata
// per la vertikala oval-profilo; de flanko ĝi aspektas kiel falditaj folioj,
// sed ĉiu konkava valo en la supra vido restas rondigita sen crease.
// la pintoj estas oraj pro la teksturaj bandoj ĉe v = 0 kaj v = 1, do neniu
// verdo. La UV-oj estas lauxfolioj ( u. 0..1 de faldo al faldo, v. 0..1 de
// malsupro al supro ), do la SVG-stila dezajno presigxas sur cxiun folion cxe
// gxia plej largxa ringo.
function starfruktKorpo( rEkstera: number, alto: number, ringoj: number ): THREE.BufferGeometry {
  const sekco = sespintaStelo( rEkstera );
  const N = sekco.length;
  const L = N / 6;   // punktoj por folio ( kresto -> nocxo -> kresto )
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  for ( let i = 0; i <= ringoj; i++ ) {
    const t = i / ringoj;
    const s = folioProfilo( t );
    const y = t * alto;
    for ( let j = 0; j < N; j++ ) {
      const p = sekco[j];
      pozicioj.push( p.x * s, y, p.y * s );
      uvoj.push( ( j % L ) / ( L - 1 ), t );
    }
  }
  const indeksoj: number[] = [];
  for ( let i = 0; i < ringoj; i++ ) {
    const r0 = i * N, r1 = ( i + 1 ) * N;
    for ( let j = 0; j < N; j++ ) {
      const j2 = ( j + 1 ) % N;
      indeksoj.push( r0 + j, r1 + j, r1 + j2, r0 + j, r1 + j2, r0 + j2 );
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute( "position", new THREE.BufferAttribute( new Float32Array( pozicioj ), 3 ) );
  g.setAttribute( "uv", new THREE.BufferAttribute( new Float32Array( uvoj ), 2 ) );
  g.setIndex( indeksoj );
  g.computeVertexNormals();
  return g;
}

// krestaRipo - Maldika ora polo sur unu vertikala kresto. Ĝi sekvas la
// ovalan flanklinion, kun rondigitaj finoj kaj neniu elstara ĉapo aŭ bulo.
function krestaRipo( rEkstera: number, alto: number, ang: number, dikeco: number ): THREE.BufferGeometry {
  const ringoj = 0o24;
  const flankoj = 8;
  const tuboRadiuso = dikeco * 0o3 / 0o5;
  const centroR = rEkstera - tuboRadiuso;
  const pozicioj: number[] = [];
  const indeksoj: number[] = [];

  for ( let i = 0; i <= ringoj; i++ ) {
    const t = i / ringoj;
    const s = folioProfilo( t );
    // La polo sekvas la saman ovalan profilon kiel la muro. ĝi maldikiĝas
    // glate al rondaj finoj kaj ne restas kiel elstara bulo ĉe la supro aŭ bazo.
    // Ĉe ĉiu alto la ekstera flanko de la polo restas ene de la muro-radiuso.
    const finaRondigo = s;
    const cx = Math.cos( ang ) * centroR * s;
    const cz = Math.sin( ang ) * centroR * s;
    // Pli akra taper ĉe la finoj konservas la oran polon kiel maldikan,
    // rondan randon; ĝi ne formas ŝvelan bulon ĉe la supro aŭ malsupro.
    const r = tuboRadiuso * ( 0o40/0o100 + 0o16/0o100 * Math.pow( finaRondigo, 0o20 / 0o10 ) );
    for ( let j = 0; j < flankoj; j++ ) {
      const a = j / flankoj * Math.PI * 0o2;
      pozicioj.push( cx + Math.cos( a ) * r, t * alto, cz + Math.sin( a ) * r );
    }
  }
  for ( let i = 0; i < ringoj; i++ ) {
    for ( let j = 0; j < flankoj; j++ ) {
      const j2 = ( j + 1 ) % flankoj;
      const a = i * flankoj + j;
      const b = ( i + 1 ) * flankoj + j;
      indeksoj.push( a, b, ( i + 1 ) * flankoj + j2, a, ( i + 1 ) * flankoj + j2, i * flankoj + j2 );
    }
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute( "position", new THREE.BufferAttribute( new Float32Array( pozicioj ), 3 ) );
  geometrio.setIndex( indeksoj );
  geometrio.computeVertexNormals();
  return geometrio;
}

// konstruiKeuxfhxeso - Konstruu la starfruktajn strukturojn en la donitaj
// lokoj. Cxiuj geometrioj estas kunfanditaj laux materialo, do la tuta aro
// estas nur du meshoj ( muro + teksturo, oro ).
//     @param sceno ( THREE.Scene ) - La sceno.
//     @param lokoj ( KeuxfhxesoLoko[] ) - Pozicioj ( kaj nedevigaj orientigxoj ).
//     @param alteco ( funkcio ) - Terena alteco ( x, z ) → y.
//     @param kadraMaterialo ( MeshStandardMaterial ) - La ora kadro-materialo.
export function konstruiKeuxfhxeso( sceno: THREE.Scene,
  lokoj: KeuxfhxesoLoko[],
  alteco: (x: number, z: number) => number,
  kadraMaterialo: THREE.MeshStandardMaterial
): THREE.Group {
  const murajGeometrioj: THREE.BufferGeometry[] = [];
  const kadrajGeometrioj: THREE.BufferGeometry[] = [];

  const R = 0o63/0o100;     // 0o63/0o100 - pli maldika kiel antaŭe
  const ALTO = 0o46 / 0o10; // 4.75

  for ( const l of lokoj ) {
    const h0 = alteco( l.x, l.z );
    const rot = l.rot ?? 0;
    const M = new THREE.Matrix4().makeRotationY( rot );

    // La korpo sidas rekte sur la tero.
    const korpo = starfruktKorpo( R, ALTO, 0o16 );
    korpo.applyMatrix4( M );
    korpo.translate( l.x, h0, l.z );
    murajGeometrioj.push( korpo );

    // Ses oraj krestaj ripoj - unu laux cxiu pinto de la stelo-sekco. Cxiu
    // ripo sekvas la korpon de malsupro gxis supro, sen elstara konverga parto.
    // La dezajno ( stelo + radioj ) estas parto de la mura TEKSTURO, bakita
    // sur cxiun folion - neniu elstara geometrio.
    for ( let k = 0; k < 6; k++ ) {
      const ripo = krestaRipo( R, ALTO, k * Math.PI / 3, 0o4 / 0o100 );
      ripo.applyMatrix4( M );
      ripo.translate( l.x, h0, l.z );
      kadrajGeometrioj.push( ripo );
    }
  }

  const grupo = new THREE.Group();
  const teksajxo = kreiFolianTeksajxon();
  // La mura koloro estas blanka, cxar la malhel-pina bazo estas BAKITA en la
  // teksturon ( #184038 ) - tiel la korpo estas tute opaka, neniu travidebla
  // centro, kaj la oro sxajnas presita sur la folio.
  const muraMaterialo = new THREE.MeshStandardMaterial( {
    color: 0xffffff, roughness: 0o3 / 0o4, metalness: 0,
    map: teksajxo,
  } );

  const korpoj = new THREE.Mesh( kunfandiGeometriojn( murajGeometrioj ), muraMaterialo );
  korpoj.castShadow = korpoj.receiveShadow = true;
  grupo.add( korpoj );
  const kadroj = new THREE.Mesh( kunfandiGeometriojn( kadrajGeometrioj ), kadraMaterialo );
  kadroj.castShadow = kadroj.receiveShadow = true;
  grupo.add( kadroj );  sceno.add( grupo );
  return grupo;
}
