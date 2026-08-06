// Keuxfhxeso ( ſɭw ʃɔɔ˞ ) - strukturo el ses falditaj folioj kun 6-flanka
// simetrio. De supre ĝi estas mola sespinta stelo. la poloj estas rondaj kaj
// la konkavaj flankoj inter ili estas glataj arkoj, ne krevoj. De flanko ĉiu
// folio kunfaldiĝas en longan rondan ovalon, sen vertikala ŝvelaĵo. La ses
// oraj poloj sekvas la eksterajn krestojn kaj finiĝas glate en la korpo.
// La dezajno estas EN la flankoj mem kiel SVG-stila teksturo.
// cxiu folio montras 4-pintan stelon kun kvar ">"-krampoj kiel ekstraj
// brakoj en la diagonalaj anguloj, kaj supre/sube - du simetriaj liniaj
// folioj, desegnitaj sur kanvaso kaj bakita super
// la helblua-verda bazo kun koloraj bandoj ĉe AMBAŬ finoj - la korpo estas
// tute opaka, neniu travidebla centro. La paletro estas blua/verda ( stelo,
// krampoj kaj folioj havas siajn proprajn kolorojn ).
import * as THREE from "three";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";

export interface KeuxfhxesoLoko {
  x: number; z: number;
  /** Nedeviga orientigxo - la strukturo havas 6-flankan simetrion, do tio nur vicigas la ripojn. */
  rot?: number;
}



// kreiFolianTeksajxon - SVG-stila kanvasa teksturo por cxiu folio. Cxe la
// centro estas blua 4-pinta stelo, kun kvar ">"-krampoj kiel ekstraj brakoj
// en la diagonalaj anguloj ( ne alfiksitaj al la stelo ); supre kaj sube -
// du simetriaj liniaj folioj ( la foliaj pintoj rigardas al la centro ). La
// kanvaso havas la saman proporcion kiel la longa, mallarĝa folia faco
// ( 0o56/0o10 = 5.75 fojojn pli alta ol larĝa ), do la dezajno etendiĝas
// tra la tuta faco kaj ne estas kunpremita al la centro.
function kreiFolianTeksajxon(): THREE.CanvasTexture {
  const H = 0o1000;                  // kanvasa alto ( alta rezolucio, ne malakra )
  const STRETCH = 0o56 / 0o10;       // alto/larĝa proporcio de la folia faco
  const W = Math.round( H * STRETCH );
  const kanvasa = document.createElement( "canvas" );
  kanvasa.width = W;
  kanvasa.height = H;
  const k = kanvasa.getContext( "2d" )!;
  // Helblua-verda fono.
  k.fillStyle = "#a0c8b0";
  k.fillRect( 0, 0, W, H );
  k.lineCap = "round";
  k.lineJoin = "round";
  // Kolora paletro — la stelo, la krampoj kaj la folioj havas siajn proprajn
  // kolorojn. La supraj krampoj kaj la supra folio estas bluaj; la subaj
  // krampoj estas verdaj kaj la suba folio pli malhelblua.
  const stelaKoloro = "#3860b0";
  const supraFoliaKoloro = "#4898d0";
  const subaFoliaKoloro = "#7088b8";
  const suprajKrampojKoloro = "#5396b5";
  const subajKrampojKoloro = "#50a060";
  // La centro de la folio ( la valo inter du poloj ) estas u = 0o4/0o10 laux
  // la UV-konvencio de starfruktKorpo; la dezajno estas vertikale simetria.
  const cx = W * 0o4 / 0o10;
  const cy = H * 0o4 / 0o10;

  // ── Foliaj finoj. Mildaj koloraj bandoj ĉe ambaŭ randoj ( unue, por ke
  // ili ne kovru la foliajn desegnojn ) — la supro uzas la supran folian
  // koloron, la malsupro la suban, do la poloj kunfandiĝas kun la folioj. ──
  // La travideblaj finoj uzas 8-ciferan heks ( #rrggbbaa ), do ili restas
  // konektitaj al la foliaj kolor-konstantoj — neniu dis-sinkroniĝo.
  const gr = k.createLinearGradient( 0, 0, 0, H * 0o1 / 0o10 );
  gr.addColorStop( 0, supraFoliaKoloro );
  gr.addColorStop( 1, supraFoliaKoloro + "00" );
  k.fillStyle = gr;
  k.fillRect( 0, 0, W, H * 0o1 / 0o10 );
  const gb = k.createLinearGradient( 0, H * 0o7 / 0o10, 0, H );
  gb.addColorStop( 0, subaFoliaKoloro + "00" );
  gb.addColorStop( 1, subaFoliaKoloro );
  k.fillStyle = gb;
  k.fillRect( 0, H * 0o7 / 0o10, W, H * 0o1 / 0o10 );

  // ── 4-pinta stelo en la centro ( la kvarStelo-motivo de la vestoj ) ──
  // La banda gradiento lasis k.fillStyle travidebla — reestigu la stelan
  // plenigon, alie la stelo estus nevidebla.
  k.fillStyle = stelaKoloro;
  // Plilarĝigita — 0o31/0o100 ( 0.390625 ) anstataŭ 0o25/0o100, por ke la
  // tuta dezajno plenigas pli da la malplena horizontala rando.
  const rx = W * 0o31 / 0o100;   // larĝa sed mallonga — sur la faco ĝi estas kvadrata
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

  // ── 4 ">"-krampoj — ekstraj brakoj de la stelo ──
  // Ĉiu krampo estas ">"-forma. La du gamboj ŝvebas kun klara interspaco de
  // la stelo kaj la pinto ( la vertico ) montras EKSTEREN — supren por la
  // supraj paroj, suben por la subaj. La gamboj estas pli eksteren kaj
  // kurbiĝas al la centro ( la kontroloj estas tirataj al la stelo ), do ili
  // plenigas pli da spaco. Sub ĉiu krampo pendas vertikala linio ( ne
  // alfiksita al la krampo ), kiu plenigas la malplenan spacon sub la pinto.
  // La strokoj estas pli dikaj ol antaŭe.
  k.lineWidth = H * 0o1 / 0o40;
  for ( const sX of [ -1, 1 ] ) {
    for ( const sY of [ -1, 1 ] ) {
      // La supraj krampoj ( sY < 0 ) estas bluaj, la subaj ( sY > 0 ) verdaj.
      k.strokeStyle = sY < 0 ? suprajKrampojKoloro : subajKrampojKoloro;
      // La pinto de la ">" — for de la stelo, en la malplenan spacon.
      const ax = cx + sX * rx * 0o11 / 0o10;
      const ay = cy + sY * ry * 0o25 / 0o10;
      // Gambo 1 — iras malsupren laŭ la stela pinto, kurbiĝante al la stelo.
      const lx1 = cx + sX * rx * 0o10 / 0o10;
      const ly1 = cy + sY * ry * 0o6 / 0o10;
      // Gambo 2 — iras oblikve al la stela supro, kurbiĝante al la stelo.
      const lx2 = cx + sX * rx * 0o55 / 0o100;
      const ly2 = cy + sY * ry * 0o12 / 0o10;
      // Kontroloj — interne de la gamboj, do la kurboj kurbiĝas ENNEN ( al
      // la stelo ) sen elstara svingo ĉe la pintoj.
      const kx1 = cx + sX * rx * 0o21 / 0o20;
      const ky1 = cy + sY * ry * 0o15 / 0o10;
      const kx2 = cx + sX * rx * 0o66 / 0o100;
      const ky2 = cy + sY * ry * 0o20 / 0o10;
      k.beginPath();
      k.moveTo( ax, ay );
      k.quadraticCurveTo( kx1, ky1, lx1, ly1 );
      k.moveTo( ax, ay );
      k.quadraticCurveTo( kx2, ky2, lx2, ly2 );
      k.stroke();
      // Vertikala linio INTER la gamboj — pendas libere en la malfermo de la
      // ">", ne alfiksita, montrante al la stelo.
      const vx = cx + sX * rx * 0o7 / 0o10;
      k.beginPath();
      k.moveTo( vx, ay - sY * ry * 0o11 / 0o10 );
      k.lineTo( vx, ay - sY * ry * 0o17 / 0o10 );
      k.stroke();
    }
  }

  // ── Simetria folio supere kaj sube ──
  // Supro. Folia pinto supre, larĝa bazo malsupren al la centro.
  // Pli larĝa folio — 0o31/0o100 ( 0.390625 ) anstataŭ 0o24/0o100, por ke la
  // supraj kaj subaj formoj plenigu pli da horizontala spaco.
  const folioDuonoLargho = W * 0o31 / 0o100;
  const foliaSupro = H * 0o2 / 0o100;
  const foliaBazo = H * 0o23 / 0o100;
  const foliaMezo = H * 0o12 / 0o100;
  const foliaVeinLargho = W * 0o17 / 0o100;
  const foliaVeinAlto = H * 0o5 / 0o100;
  // Pli dikaj strokoj — samkiel la krampoj.
  k.lineWidth = H * 0o1 / 0o40;
  const desegnuFolion = ( supra: boolean, koloro: string ) => {
    k.strokeStyle = koloro;
    const pintoY = supra ? foliaSupro : H - foliaSupro;
    const mezoY = supra ? foliaMezo : H - foliaMezo;
    const bazoY = supra ? foliaBazo : H - foliaBazo;
    // Ronda bazo — la flanko proksima al la stelo ne estas plata sed
    // arkigita en rondan kapon, plenigante la malplenan spacon inter la
    // folio kaj la stelo ( kun interspaco, ne tuŝante la stelon ).
    const centraBazoY = supra ? foliaBazo + H * 0o13 / 0o100 : H - foliaBazo - H * 0o13 / 0o100;
    // Konturo. Ovaleca folio kun akra pinto al la ekstera rando.
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
  desegnuFolion( true, supraFoliaKoloro );
  desegnuFolion( false, subaFoliaKoloro );

  const t = new THREE.CanvasTexture( kanvasa );
  t.colorSpace = THREE.SRGBColorSpace;
  // Klareco de la linia desegno. Alta anizotropio kontraŭ la forto de la
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

// folioProfilo - Vertikala folio kun ASIMETRIA vertikala profilo. La mezo
// estas LARGA ronda maso. La vertikala eksponento malaltiĝis, do la plena
// larĝo tenas de ĉirkaŭ kvinono ĝis pli ol duono de la alto — la maso estas
// vertikale pli granda, NE movita, kaj la malsupro leviĝas per kurbo, ne per
// rekta linio. La supro finiĝas per ronda pinto. La malsupra parto sekvas
// PARABOLAN kurbon ( r = A·√t, la profilo de paraboloido ) — klare ronda,
// parabola fundo — kunigita al la korpo per C²-glatmikso. La krestaj ripoj
// sekvas la saman profilon, do iliaj oraj finoj kongruas.
function glataPaso( u: number ): number {
  const x = Math.min( 1, Math.max( 0, u ) );
  // Kvintika glatŝtupo ( C² ). Nula deklivo KAJ nula kurbeco ĉe ambaŭ finoj,
  // do la transiro al la korpo estas tre glata, sen kurbec-salto.
  return x * x * x * ( x * ( x * 6 - 15 ) + 10 );
}
function folioProfilo( t: number ): number {
  // 0o53/0o100 = 0.672 — la malsupren-peza remapo. La maksimumo RESTAS ĉe
  // ≈ 36% de la alto — la maso ne moviĝas, ĝi nur pli larĝiĝas. 0o6/0o10 =
  // 0.75 — la vertikala eksponento. Malalta eksponento donas LARGAN rondan
  // centran mason; alta eksponento pinĉus ĝin al nadlo.
  const pezo = 0o53 / 0o100;
  const vertikalo = 0o6 / 0o10;
  const korpo = Math.pow( Math.max( 0, Math.sin( Math.PI * Math.pow( t, pezo ) ) ), vertikalo );
  // Parabola malsupra konvergo. Sub 0o2/0o10 ( 0.25 ) la fundo sekvas
  // r = A·√t ( la profilo de paraboloido — glata ronda parabola pinto ),
  // kunigita al la korpo per la C²-glatmikso ( neniu kresto, neniu
  // kurbec-salto ). La zono estas mallonga, por ke la granda maso atingas
  // pli malsupren anstataŭ esti maldikigita de la parabolo.
  const PINTO = 0o2 / 0o10;
  if ( t >= PINTO ) return korpo;
  const korpoP = Math.pow( Math.max( 0, Math.sin( Math.PI * Math.pow( PINTO, pezo ) ) ), vertikalo );
  const A = korpoP / Math.sqrt( PINTO );   // kongruigas la parabolon al la korpo
  const blendo = glataPaso( t / PINTO );   // 0 ĉe la fundo, 1 ( nula deklivo ) ĉe PINTO
  return A * Math.sqrt( t ) * ( 1 - blendo ) + korpo * blendo;
}

// starfruktKorpo - Sxovita surfaco. La glata sespinta sekco estas skaleblata
// per la vertikala oval-profilo; de flanko ĝi aspektas kiel falditaj folioj,
// sed ĉiu konkava valo en la supra vido restas rondigita sen crease.
// la pintoj ricevas la foliajn kolorojn pro la teksturaj bandoj ĉe v = 0 kaj
// v = 1. La UV-oj estas lauxfolioj ( u. 0..1 de faldo al faldo, v. 0..1 de
// malsupro al supro ), do la SVG-stila dezajno presigxas sur cxiun folion cxe
// gxia plej largxa ringo.
function starfruktKorpo( rEkstera: number, alto: number, ringoj: number ): THREE.BufferGeometry {
  const sekco = sespintaStelo( rEkstera );
  const N = sekco.length;
  const L = N / 6;   // punktoj por folio ( kresto -> nocxo -> kresto )
  // La sekco-radiuso de ĉiu punkto ( 1 ĉe la krestoj, ≈ 0o45/0o100 ĉe la
  // valoj ). Uzata por miksi la stelon al cirklo ĉe la fundo.
  const stelFrakcioj = sekco.map( p => Math.hypot( p.x, p.y ) / rEkstera );
  const RONDO = 0o2 / 0o10;   // 0.25 — la funda zono kie la stelo fariĝas cirklo
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  for ( let i = 0; i <= ringoj; i++ ) {
    const u = i / ringoj;
    // Ne-unuforma ringa disdono ( kosinusa ). Pli da ringoj ĉe la du kurbaj
    // finoj ( la parabola malsupro kaj la akra supro ), malpli en la plata
    // mezo — tio forigas la rektajn segmentojn sur la kurbo ( la
    // faceto-efekto ĉe la fundo ).
    const t = ( 1 - Math.cos( Math.PI * u ) ) / 0o2;
    const s = folioProfilo( t );
    const y = t * alto;
    // Miksi la 6-pintan stel-sekcon al CIRKLO ĉe la fundo. La rektaj krestaj
    // linioj malsupren laŭ la flanko malaperas kaj la malsupro konvergas kiel
    // glata ronda pinto — la transiro estas ronda, ne faceta.
    const w = t < RONDO ? glataPaso( t / RONDO ) : 1;
    for ( let j = 0; j < N; j++ ) {
      const p = sekco[j];
      const rf = w * stelFrakcioj[j] + ( 1 - w );   // → 1 ( cirklo ) ĉe la fundo
      pozicioj.push( p.x * s * rf / stelFrakcioj[j], y, p.y * s * rf / stelFrakcioj[j] );
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
  const ringoj = 0o40;
  const flankoj = 8;
  const tuboRadiuso = dikeco * 0o5 / 0o10;
  const centroR = rEkstera - tuboRadiuso;
  const pozicioj: number[] = [];
  const indeksoj: number[] = [];

  for ( let i = 0; i <= ringoj; i++ ) {
    // La sama kosinusa ringa disdono kiel la korpo — la ripoj sekvas la
    // kurbojn sen rektaj segmentoj ĉe la finoj.
    const u = i / ringoj;
    const t = ( 1 - Math.cos( Math.PI * u ) ) / 0o2;
    const s = folioProfilo( t );
    // La polo sekvas la saman ovalan profilon kiel la muro. ĝi maldikiĝas
    // glate al rondaj finoj kaj ne restas kiel elstara bulo ĉe la supro aŭ bazo.
    // Ĉe ĉiu alto la ekstera flanko de la polo restas ene de la muro-radiuso.
    const finaRondigo = s;
    const cx = Math.cos( ang ) * centroR * s;
    const cz = Math.sin( ang ) * centroR * s;
    // Pli akra taper ĉe la finoj konservas la oran polon kiel maldikan,
    // rondan randon; ĝi ne formas ŝvelan bulon ĉe la supro aŭ malsupro.
    const r = tuboRadiuso * ( 0o4/0o10 + 0o16/0o100 * Math.pow( finaRondigo, 0o20 / 0o10 ) );
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
  const ALTO = 0o36 / 0o10; // 3.6 — pli malalta, pli kompakta strukturo

  for ( const l of lokoj ) {
    const h0 = alteco( l.x, l.z );
    const rot = l.rot ?? 0;
    const M = new THREE.Matrix4().makeRotationY( rot );

    // La korpo sidas rekte sur la tero.
    const korpo = starfruktKorpo( R, ALTO, 0o40 );
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
  // La mura koloro estas blanka, cxar la helblua-verda bazo estas BAKITA en
  // la teksturon ( #a0c8b0 ) - tiel la korpo estas tute opaka, neniu
  // travidebla centro, kaj la kolora dezajno sxajnas presita sur la folio.
  const muraMaterialo = new THREE.MeshStandardMaterial( {
    color: 0xffffff, roughness: 0o6 / 0o10, metalness: 0,
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
