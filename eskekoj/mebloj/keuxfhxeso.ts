// ≺⧼ Keuxfhxeso ⭐ ⧽≻
// La keŭfĥeso ( ſɭw ʃɔɔ˞ ). strukturo el ses falditaj folioj kun 6-flanka
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
import { kreiBuferanGeometrion, kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";
import { kreiFolianTeksajxon } from "../komunajxoj/teksajxoj/keuxfhxesa-folio.js";

export interface KeuxfhxesoLoko {
  x: number; z: number;
  /** Nedeviga orientigxo - la strukturo havas 6-flankan simetrion, do tio nur vicigas la ripojn. */
  rot?: number;
}

// sespintaStelo - Fermita, glata sespinta konturo. Ĉiu el la ses pintoj
// estas mallarĝa sed rondigita; inter ili estas unu kontinua, mola konkava
// arko. Neniuj Bezier-kudroj aŭ akraj faldoj aperas en la supra silueto.
function sespintaStelo(rEkstera: number): THREE.Vector2[] {
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
    const pinto = Math.pow(Math.abs(Math.cos(3 * ang)), pintoAkrecajxo);
    const radiuso = valoraRadiuso + ( rEkstera - valoraRadiuso ) * pinto;
    punktoj.push(new THREE.Vector2(
      Math.cos(ang) * radiuso,
      Math.sin(ang) * radiuso
));
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
function glataPaso(u: number): number {
  const x = Math.min(1, Math.max(0, u));
  // Kvintika glatŝtupo ( C² ). Nula deklivo KAJ nula kurbeco ĉe ambaŭ finoj,
  // do la transiro al la korpo estas tre glata, sen kurbec-salto.
  return x * x * x * ( x * ( x * 6 - 15 ) + 10 );
}
function folioProfilo(t: number): number {
  // 0o53/0o100 = 0.672 — la malsupren-peza remapo. La maksimumo RESTAS ĉe
  // ≈ 36% de la alto — la maso ne moviĝas, ĝi nur pli larĝiĝas. 0o6/0o10 =
  // 0.75 — la vertikala eksponento. Malalta eksponento donas LARGAN rondan
  // centran mason; alta eksponento pinĉus ĝin al nadlo.
  const pezo = 0o53 / 0o100;
  const vertikalo = 0o6 / 0o10;
  const korpo = Math.pow(Math.max(0, Math.sin(Math.PI * Math.pow(t, pezo))), vertikalo);
  // Parabola malsupra konvergo. Sub 0o2/0o10 ( 0.25 ) la fundo sekvas
  // r = A·√t ( la profilo de paraboloido — glata ronda parabola pinto ),
  // kunigita al la korpo per la C²-glatmikso ( neniu kresto, neniu
  // kurbec-salto ). La zono estas mallonga, por ke la granda maso atingas
  // pli malsupren anstataŭ esti maldikigita de la parabolo.
  const PINTO = 0o2 / 0o10;
  if ( t >= PINTO ) return korpo;
  const korpoP = Math.pow(Math.max(0, Math.sin(Math.PI * Math.pow(PINTO, pezo))), vertikalo);
  const A = korpoP / Math.sqrt(PINTO);   // kongruigas la parabolon al la korpo
  const blendo = glataPaso(t / PINTO);   // 0 ĉe la fundo, 1 ( nula deklivo ) ĉe PINTO
  return A * Math.sqrt(t) * ( 1 - blendo ) + korpo * blendo;
}

// starfruktKorpo - Sxovita surfaco. La glata sespinta sekco estas skaleblata
// per la vertikala oval-profilo; de flanko ĝi aspektas kiel falditaj folioj,
// sed ĉiu konkava valo en la supra vido restas rondigita sen crease.
// la pintoj ricevas la foliajn kolorojn pro la teksturaj bandoj ĉe v = 0 kaj
// v = 1. La UV-oj estas lauxfolioj ( u. 0..1 de faldo al faldo, v. 0..1 de
// malsupro al supro ), do la SVG-stila dezajno presigxas sur cxiun folion cxe
// gxia plej largxa ringo.
function starfruktKorpo(rEkstera: number, alto: number, ringoj: number): THREE.BufferGeometry {
  const sekco = sespintaStelo(rEkstera);
  const N = sekco.length;
  const L = N / 6;   // punktoj por folio ( kresto -> nocxo -> kresto )
  // La sekco-radiuso de ĉiu punkto ( 1 ĉe la krestoj, ≈ 0o45/0o100 ĉe la
  // valoj ). Uzata por miksi la stelon al cirklo ĉe la fundo.
  const stelFrakcioj = sekco.map(p => Math.hypot(p.x, p.y) / rEkstera);
  // La inversoj anticipe — unu multipliko po verto anstataŭ divido.
  const stelFrakciojRecip = stelFrakcioj.map(f => 1 / f);
  const RONDO = 0o2 / 0o10;   // 0.25 — la funda zono kie la stelo fariĝas cirklo
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  for ( let i = 0; i <= ringoj; i++ ) {
    const u = i / ringoj;
    // Ne-unuforma ringa disdono ( kosinusa ). Pli da ringoj ĉe la du kurbaj
    // finoj ( la parabola malsupro kaj la akra supro ), malpli en la plata
    // mezo — tio forigas la rektajn segmentojn sur la kurbo ( la
    // faceto-efekto ĉe la fundo ).
    const t = ( 1 - Math.cos(Math.PI * u) ) / 0o2;
    const s = folioProfilo(t);
    const y = t * alto;
    // Miksi la 6-pintan stel-sekcon al CIRKLO ĉe la fundo. La rektaj krestaj
    // linioj malsupren laŭ la flanko malaperas kaj la malsupro konvergas kiel
    // glata ronda pinto — la transiro estas ronda, ne faceta.
    const w = t < RONDO ? glataPaso(t / RONDO) : 1;
    for ( let j = 0; j < N; j++ ) {
      const p = sekco[j];
      const rf = w * stelFrakcioj[j] + ( 1 - w );   // → 1 ( cirklo ) ĉe la fundo
      pozicioj.push(p.x * s * rf * stelFrakciojRecip[j], y, p.y * s * rf * stelFrakciojRecip[j]);
      uvoj.push(( j % L ) / ( L - 1 ), t);
    }
  }
  const indeksoj: number[] = [];
  for ( let i = 0; i < ringoj; i++ ) {
    const r0 = i * N, r1 = ( i + 1 ) * N;
    for ( let j = 0; j < N; j++ ) {
      const j2 = ( j + 1 ) % N;
      indeksoj.push(r0 + j, r1 + j, r1 + j2, r0 + j, r1 + j2, r0 + j2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pozicioj), 3));
  g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(uvoj), 2));
  g.setIndex(indeksoj);
  g.computeVertexNormals();
  return g;
}

// krestaRipo - Maldika ora polo sur unu vertikala kresto. Ĝi sekvas la
// ovalan flanklinion, kun rondigitaj finoj kaj neniu elstara ĉapo aŭ bulo.
function krestaRipo(rEkstera: number, alto: number, ang: number, dikeco: number): THREE.BufferGeometry {
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
    const t = ( 1 - Math.cos(Math.PI * u) ) / 0o2;
    const s = folioProfilo(t);
    // La polo sekvas la saman ovalan profilon kiel la muro. ĝi maldikiĝas
    // glate al rondaj finoj kaj ne restas kiel elstara bulo ĉe la supro aŭ bazo.
    // Ĉe ĉiu alto la ekstera flanko de la polo restas ene de la muro-radiuso.
    const cx = Math.cos(ang) * centroR * s;
    const cz = Math.sin(ang) * centroR * s;
    // Pli akra taper ĉe la finoj konservas la oran polon kiel maldikan,
    // rondan randon; ĝi ne formas ŝvelan bulon ĉe la supro aŭ malsupro.
    const r = tuboRadiuso * ( 0o4/0o10 + 0o16/0o100 * Math.pow(s, 0o20 / 0o10) );
    for ( let j = 0; j < flankoj; j++ ) {
      const a = j / flankoj * Math.PI * 0o2;
      pozicioj.push(cx + Math.cos(a) * r, t * alto, cz + Math.sin(a) * r);
    }
  }
  for ( let i = 0; i < ringoj; i++ ) {
    for ( let j = 0; j < flankoj; j++ ) {
      const j2 = ( j + 1 ) % flankoj;
      const a = i * flankoj + j;
      const b = ( i + 1 ) * flankoj + j;
      indeksoj.push(a, b, ( i + 1 ) * flankoj + j2, a, ( i + 1 ) * flankoj + j2, i * flankoj + j2);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj);
}

// La folia teksajxo kaj la mura materialo estas identaj por ĉiuj strukturoj —
// stoku ilin module-nivele, do pluraj konstruoj kunhavas ilin anstataŭ
// rekrei kanvasan teksturon po voko.
let foliaTeksajxoStoko: THREE.CanvasTexture | null = null;
let muraMaterialoStoko: THREE.MeshStandardMaterial | null = null;

// konstruiKeuxfhxeso - Konstruu la starfruktajn strukturojn en la donitaj
// lokoj. Cxiuj geometrioj estas kunfanditaj laux materialo, do la tuta aro
// estas nur du meshoj ( muro + teksturo, oro ).
//     @param sceno ( THREE.Scene ) - La sceno.
//     @param lokoj ( KeuxfhxesoLoko[] ) - Pozicioj ( kaj nedevigaj orientigxoj ).
//     @param alteco ( funkcio ) - Terena alteco ( x, z ) → y.
//     @param kadraMaterialo ( MeshStandardMaterial ) - La ora kadro-materialo.
export function konstruiKeuxfhxeso(sceno: THREE.Scene,
  lokoj: KeuxfhxesoLoko[],
  alteco: ( x: number, z: number ) => number,
  kadraMaterialo: THREE.MeshStandardMaterial
): THREE.Group {
  const murajGeometrioj: THREE.BufferGeometry[] = [];
  const kadrajGeometrioj: THREE.BufferGeometry[] = [];

  const R = 0o63/0o100;     // 0o63/0o100 - pli maldika kiel antaŭe
  const ALTO = 0o36 / 0o10; // 3.6 — pli malalta, pli kompakta strukturo

  // Ŝablonoj — la korpo kaj la ses ripoj estas identaj por ĉiu loko, do ili
  // konstruiĝas unufoje kaj kloniĝas po loko ( la klonado kostas multe malpli
  // ol la geometria konstruo ).
  const korpaSablono = starfruktKorpo(R, ALTO, 0o40);
  const ripajSablonoj: THREE.BufferGeometry[] = [];
  for ( let k = 0; k < 6; k++ ) {
    ripajSablonoj.push(krestaRipo(R, ALTO, k * Math.PI / 3, 0o4 / 0o100));
  }

  for ( const l of lokoj ) {
    const h0 = alteco(l.x, l.z);
    const rot = l.rot ?? 0;
    const M = new THREE.Matrix4().makeRotationY(rot);

    // La korpo sidas rekte sur la tero.
    const korpo = korpaSablono.clone();
    korpo.applyMatrix4(M);
    korpo.translate(l.x, h0, l.z);
    murajGeometrioj.push(korpo);

    // Ses oraj krestaj ripoj - unu laux cxiu pinto de la stelo-sekco. Cxiu
    // ripo sekvas la korpon de malsupro gxis supro, sen elstara konverga parto.
    // La dezajno ( stelo + radioj ) estas parto de la mura TEKSTURO, bakita
    // sur cxiun folion - neniu elstara geometrio.
    for ( let k = 0; k < 6; k++ ) {
      const ripo = ripajSablonoj[k].clone();
      ripo.applyMatrix4(M);
      ripo.translate(l.x, h0, l.z);
      kadrajGeometrioj.push(ripo);
    }
  }

  const grupo = new THREE.Group();
  if ( !muraMaterialoStoko ) {
    foliaTeksajxoStoko = kreiFolianTeksajxon();
    // La mura koloro estas blanka, cxar la helblua-verda bazo estas BAKITA en
    // la teksturon ( #a0c8b0 ) - tiel la korpo estas tute opaka, neniu
    // travidebla centro, kaj la kolora dezajno sxajnas presita sur la folio.
    muraMaterialoStoko = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o6 / 0o10, metalness: 0,
      map: foliaTeksajxoStoko,
    });
  }
  const muraMaterialo = muraMaterialoStoko;

  const korpoj = new THREE.Mesh(kunfandiGeometriojn(murajGeometrioj), muraMaterialo);
  korpoj.castShadow = korpoj.receiveShadow = true;
  grupo.add(korpoj);
  const kadroj = new THREE.Mesh(kunfandiGeometriojn(kadrajGeometrioj), kadraMaterialo);
  kadroj.castShadow = kadroj.receiveShadow = true;
  grupo.add(kadroj);  sceno.add(grupo);
  return grupo;
}
