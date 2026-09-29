// ≺⧼ La 3D-aspekto 🏙️ ⧽≻
// La 3D-aspekto de la urba krado kaj de la mond-nivelaj vojoj en la 3D-vido —
// la VERAJ konstruaĵoj kaj vojoj de la ludo ( la samaj konstruantoj kiel
// urbo.ts kaj vojoj.ts ). La funkcioj rekonstruas la aspekton post ĉiu krada
// aŭ voja ŝanĝo; la grupoj mem ( kaj la sceno ) logxas en vido3d.js.
import * as THREE from "three";
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { konstruiSatalon } from "../../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { konstruiHxeuxfojn } from "../../../eskekoj/konstruajxoj/hxeuxfa/lampoj.js";
import { konstruiKeuxfhxeso } from "../../../eskekoj/mebloj/keuxfhxeso.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon } from "../../../eskekoj/komunajxoj/materialoj.js";
import { konstruiVojojn } from "../../../eskekoj/medio/vojoj.js";
import { VOJA_SUPRO_LEVIGXO } from "../../../eskekoj/medio/vojoj/mezuroj.js";
import { konstruiIntersekcajnPlatojn } from "../../../eskekoj/medio/vojoj/platoj.js";
import { troviVojaRetajnKunigojn } from "../../../eskekoj/medio/voj-reto.js";
// La akvo — la pontoj ( pontoVojo ) legas la akvon de la deriva kalkulo.
import { akvaRezulto, cxuAkvo } from "./akvo.js";
import { sceno3d, kradaGrupo3D, kradaStaciaGrupo3D, vojaGrupo3D, YTROIGO } from "./vido3d.js";

// ⟪ La spuritaj konstruajxoj 📃 ⟫ — konstruiSatalon aldonas la grupon ( kaj la
// spegulajn kopiojn ) REKTE al la sceno, do la objektoj estas spurataj cxi tie
// por la forigo ĉe rekonstruo kaj la videbleco dum la langetoj ( la cefa
// dosiero legas la tabelon por sxalti la videblecon ).
export let krada3DKonstruajxoj = [];

// ⟪ La ligo kun la redaktilo 📃 ⟫ — la referencoj de la cefa dosiero, ligitaj
// unufoje per agordiKradon3D. La krado-stato ( la urboj, la vojoj, la dokoj,
// la ofseto, la aktiva langeto ) sxangxigxas dum la uzo, do gxi legigxas per
// FUNKCIOJ.
let deltoInterp, pontoDuonLargho, kradoPlano, dioritaMaterialo, vojojAktiva,
  ORA_MATERIALO;
let urboj, elektitaUrbo, vojoj, dokoj, kradoOfsX, kradoOfsZ, aktivaTabo;

// agordiKradon3D — la unufoja kunligo kun la ĉefa dosiero.
//     @param k ( object ) - La referencoj de la ĉefa dosiero.
export function agordiKradon3D(k) {
  deltoInterp = k.deltoInterp; pontoDuonLargho = k.pontoDuonLargho;
  kradoPlano = k.kradoPlano; dioritaMaterialo = k.dioritaMaterialo;
  vojojAktiva = k.vojojAktiva; ORA_MATERIALO = k.ORA_MATERIALO;
  urboj = k.urboj; elektitaUrbo = k.elektitaUrbo;
  vojoj = k.vojoj; dokoj = k.dokoj;
  kradoOfsX = k.kradoOfsX; kradoOfsZ = k.kradoOfsZ;
  aktivaTabo = k.aktivaTabo;
}

// pontoVojo — la du finpunktoj de vojo, se gxi trapasas akvon ( la ponto ).
// Alie null. La akvo venas de la deriva kalkulo ( akvo.js ).
function pontoVojo( v ) {
  if ( !akvaRezulto || v.punktoj.length < 2 ) return null;
  const a = v.punktoj[0], b = v.punktoj[v.punktoj.length - 1];
  const akvas = cxuAkvo;
  if ( akvas( a[0], a[1] ) || akvas( b[0], b[1] ) ) return null;
  const longo = Math.hypot( b[0] - a[0], b[1] - a[1] );
  if ( longo < 0o10 ) return null;
  const specimenoj = Math.max( 0o10, Math.round( longo ) );
  let akvaj = 0;
  for ( let i = 0; i <= specimenoj; i++ ) {
    const t = i / specimenoj;
    if ( akvas( a[0] + ( b[0] - a[0] ) * t, a[1] + ( b[1] - a[1] ) * t ) ) akvaj++;
  }
  if ( akvaj / ( specimenoj + 1 ) < 0o2/0o5 ) return null;
  return { a, b };
}

// rekonstruiVojojn3D — la mond-nivelaj vojoj kiel reala 3D-aspekto en la
// 3D-vido — la SAMAJ dioritaj/andezitaj vojoj kiel la ludo ( konstruiVojojn
// el eskekoj/medio/vojoj.ts ), sekvantaj la terenon ( kun la sama vertikala
// troigo kiel la tera meŝo ). Videblaj nur dum la Vojoj sub-langeto estas
// aktiva ( vojojAktiva — sxaltiIlTabon / sxaltiSubTabojn administras la
// videblecon ). Rekonstruiĝas ĉe ĉiu voja ŝanĝo ( gxisdatigiVojajnRegilojn ),
// sed NE dum la treno — la 2D-mapo montras la vivan trenon, la 3D refreŝiĝas
// ĉe la fino de la treno.
export function rekonstruiVojojn3D() {
  if ( !vojaGrupo3D ) return;
  while ( vojaGrupo3D.children.length ) {
    const m = vojaGrupo3D.children.pop();
    if ( m.geometry ) m.geometry.dispose();
    if ( m.material ) {
      const matoj = Array.isArray(m.material) ? m.material : [ m.material ];
      for ( const mat of matoj ) mat.dispose();
    }
  }
  // ⟨ Unu difino po vojo 📃 ⟩ — antauxe ĉiu SEGMENTO fariĝis aparta difino, do
  // la turnoj ne rondig̃is ( la arko bezonas la tutan polilinion ) kaj la ŝtona
  // teksajxo restartis ĉe ĉiu segmento. La ludo uzas la tutan polilinion — nun
  // ankaŭ ĉi tiu antaŭvido.
  const alteco = ( x, z ) => ( bazaAlteco( x, z ) + deltoInterp( x, z ) ) * YTROIGO;
  const vojaSupro = ( p, v ) => {
    const duono = pontoDuonLargho( v );
    let maks = alteco( p[0], p[1] );
    for ( let i = 0; i < 0o10; i++ ) {
      const ang = i * Math.PI / 0o4;
      maks = Math.max( maks, alteco( p[0] + Math.cos( ang ) * duono, p[1] + Math.sin( ang ) * duono ) );
    }
    return maks + VOJA_SUPRO_LEVIGXO;
  };
  const difinoj = [];
  for ( const v of vojoj() ) {
    if ( !v.punktoj || v.punktoj.length < 2 ) continue;
    const difino = { pts: v.punktoj.map( p => [ p[0], p[1] ] ), w: ( v.larĝo || 0o7/0o2 ) / 2, kapoj: true };
    const ponto = pontoVojo( v );
    if ( ponto ) {
      const ay = vojaSupro( ponto.a, v );
      const by = vojaSupro( ponto.b, v );
      const dx = ponto.b[0] - ponto.a[0], dz = ponto.b[1] - ponto.a[1];
      const kvadrato = dx * dx + dz * dz;
      difino.heightFn = ( x, z ) => {
        const t = Math.max( 0, Math.min( 1, ( ( x - ponto.a[0] ) * dx + ( z - ponto.a[1] ) * dz ) / kvadrato ) );
        return ay + ( by - ay ) * t - VOJA_SUPRO_LEVIGXO;
      };
    }
    difinoj.push( difino );
  }
  if ( !difinoj.length ) return;
  const vojaListo = difinoj.map( d => ( { punktoj: d.pts, larĝo: 2 * d.w } ) );
  const kunigoj = troviVojaRetajnKunigojn( vojaListo, dokoj() );
  const protektoj = kunigoj.map( k => [ k.x, k.z ] );
  const diorito = kreiDioritanMaterialon();
  const andezito = kreiAndezitanMaterialon();
  konstruiVojojn( vojaGrupo3D, difinoj, alteco, diorito, andezito, protektoj );
  const fermitaj = new Map( kunigoj.map( k => [ k.x + "," + k.z, k.fermitaj ] ) );
  const rotacioj = new Map( kunigoj.map( k => [ k.x + "," + k.z, k.rotacio ] ) );
  konstruiIntersekcajnPlatojn( vojaGrupo3D, protektoj, alteco, diorito, andezito, fermitaj, rotacioj );
  vojaGrupo3D.visible = vojojAktiva();
}

// rekonstruiKradon3D — la nuna krada aranĝo kiel reala 3D-aspekto en la
// 3D-vido. la konstruaĵoj estas la VERAJ konstruaĵoj de la ludo ( la sama
// konstruiSatalon kiel en urbo.ts — realaj meshoj, materialoj, pordoj kaj la
// diamanta spegulo ) kaj la vojoj maldikaj ebenaj strioj sur la tereno ĉe la
// ofseto. konstruiSatalon aldonas la grupon ( kaj la spegulajn kopiojn )
// REKTE al la sceno, do la objektoj estas spurataj en krada3DKonstruajxoj
// por la forigo ĉe rekonstruo kaj la videbleco dum la langetoj.
export function rekonstruiKradon3D() {
  if ( !kradaGrupo3D ) return;
  // Forigu la malnovajn konstruaĵojn ( la grupoj kaj la speguloj — rekte en
  // la sceno ) kaj la vojojn el la grupo.
  for ( const o of krada3DKonstruajxoj ) {
    if ( o.parent ) o.parent.remove(o);
    const forigitaj = new Set();
    o.traverse(m => {
      if ( m.isMesh ) {
        if ( m.geometry && !forigitaj.has(m.geometry) ) { m.geometry.dispose(); forigitaj.add(m.geometry); }
        const matoj = Array.isArray(m.material) ? m.material : [ m.material ];
        for ( const mat of matoj ) if ( mat && !forigitaj.has(mat) ) { mat.dispose(); forigitaj.add(mat); }
      }
    });
  }
  krada3DKonstruajxoj = [];
  while ( kradaGrupo3D.children.length ) {
    const m = kradaGrupo3D.children.pop();
    if ( m.geometry ) m.geometry.dispose();
    if ( m.material ) m.material.dispose();
  }
  if ( kradaStaciaGrupo3D ) while ( kradaStaciaGrupo3D.children.length ) {
    const m = kradaStaciaGrupo3D.children.pop();
    if ( m.geometry ) m.geometry.dispose();
    if ( m.material ) m.material.dispose();
  }
  const plano = kradoPlano();
  const grundo = ( x, z ) => bazaAlteco(x, z) + deltoInterp(x, z);
  const vojaMaterialo = new THREE.MeshStandardMaterial({ color: 0xd8e0e8, roughness: 0.9 });
  const vojaAlto = 0o1/0o10 * 2;   // 0.25
  for ( const v of plano.vojoj ) {
    // La STACIAJ vojoj ( la etendaĵoj de la mond-nivelaj vojoj ) apartenas
    // al sia propra grupo — ili montriĝas kun la krado, sed KAŜIĜAS dum la
    // Vojoj sub-langeto ( la VERAJ mond-vojoj montriĝas tie, kaj la staciaj
    // duobligus la saman vojon ).
    const grupo = v.stacia && kradaStaciaGrupo3D ? kradaStaciaGrupo3D : kradaGrupo3D;
    const longo = Math.abs(v.al - v.de);
    const mezo = ( v.de + v.al ) / 2;
    const x = v.orient === "EW" ? mezo : v.poz;
    const z = v.orient === "EW" ? v.poz : mezo;
    const geo = new THREE.BoxGeometry(v.orient === "EW" ? longo : 0o7/0o2, vojaAlto, v.orient === "EW" ? 0o7/0o2 : longo);
    const mesho = new THREE.Mesh(geo, vojaMaterialo);
    mesho.position.set(kradoOfsX() + x, grundo(kradoOfsX() + x, kradoOfsZ() + z) + vojaAlto / 2, kradoOfsZ() + z);
    grupo.add(mesho);
  }
  // La konstruaĵoj — la VERAJ sataloj de la ludo ( la samaj specoj kiel en
  // urbo.ts. la stacidoma ĉelo ( unu ) kaj la kvar-bloka centro estas
  // stacioxipo, la ceteraj laŭ la ĉela tipo ).
  const selektajxoj = [];
  for ( let i = 0; i < plano.konstruaĵoj.length; i++ ) {
    const b = plano.konstruaĵoj[i];
    // La pentritaj stacioj ( kaj la aŭtomataj ) konstruiĝas kiel stacioxipo.
    const tipo = ( b.stacia || b.tipo === "stacio" ) ? "stacioxipo" : b.tipo;
    const wx = kradoOfsX() + b.x, wz = kradoOfsZ() + b.z;
    const niveloj = tipo === "stacioxipo" ? 3 : tipo === "turo" ? 0o10 : 4;
    const spec = {
      x: wx, z: wz, type: tipo, name: "krado" + i,
      niveloj, w: 0o10, d: 0o10,
      tieroAlto: tipo === "stacioxipo" ? 0o155/0o40 : tipo === "turo" ? 0o30/0o10 : tipo === "kasafeo" ? 0o155/0o40 : 0o315/0o100,
      rot: b.rot, diamond: true,
      h0: grundo(wx, wz),
      sube: tipo === "stacioxipo" ? 0 : niveloj,
      tieroAltoSub: 0o123/0o40,
    };
    const antaŭ = sceno3d.children.length;
    konstruiSatalon(spec, sceno3d, selektajxoj);
    // konstruiSatalon aldonas la grupon, la spegulan kopion kaj la oran
    // ringon rekte al la sceno — spurigu ĉiujn tri por la forigo/videbleco.
    krada3DKonstruajxoj.push(...sceno3d.children.slice(antaŭ));
  }
  // Keŭfĥesoj — la kvar sespintaj strukturoj ĉirkaŭ la centro ( la sama
  // geometrio kiel la ludo. R=10, unu ekster ĉiu pinto de la centra
  // sanktejo je 45°-obloj ). Montriĝas nur kiam la redaktata urbo havas
  // ilin. La grupo aldoniĝas rekte al la sceno — spurita en
  // krada3DKonstruajxoj por la forigo kaj la videbleco.
  if ( urboj()[elektitaUrbo()] && urboj()[elektitaUrbo()].keuxfhxeso ) {
    const KEUXFHXESO_R = 0o10;
    const lokoj = [];
    for ( let i = 0; i < 4; i++ ) {
      const a = Math.PI / 4 + i * Math.PI / 2;
      lokoj.push({ x: kradoOfsX() + Math.cos(a) * KEUXFHXESO_R, z: kradoOfsZ() + Math.sin(a) * KEUXFHXESO_R, rot: a });
    }
    const antaŭ = sceno3d.children.length;
    konstruiKeuxfhxeso(sceno3d, lokoj, grundo, ORA_MATERIALO);
    krada3DKonstruajxoj.push(...sceno3d.children.slice(antaŭ));
  }
  // La kradaj strato-lampoj — la kvar-lampa ŝablono ĉirkaŭ la placo-nodoj kaj
  // la kruciĝoj ( la sama geometrio kiel la ludo, de la plano ). La VERAJ
  // lampaj meshxoj de la ludo ( konstruiHxeuxfojn — kolonoj, bovloj, flamoj ),
  // kun la komuna diorita/ora materialo. La flamoj ne animiĝas ĉi tie ( la
  // ludo faras tion per animaciiFlammojn ); la sparklaj punktoj restas
  // statikaj sed videblaj.
  if ( urboj()[elektitaUrbo()] && urboj()[elektitaUrbo()].lampoj !== false ) {
    const spots = kradoPlano().lampoj.map(l => ( { x: kradoOfsX() + l.x, z: kradoOfsZ() + l.z, y: grundo(kradoOfsX() + l.x, kradoOfsZ() + l.z), rotacio: Math.PI / 4 } ));
    if ( spots.length ) {
      const antaŭ = sceno3d.children.length;
      konstruiHxeuxfojn(sceno3d, spots, dioritaMaterialo(), ORA_MATERIALO);
      krada3DKonstruajxoj.push(...sceno3d.children.slice(antaŭ));
    }
  }
  krada3DKonstruajxoj.forEach(o => { o.visible = aktivaTabo() === "krado"; });
  if ( kradaStaciaGrupo3D ) kradaStaciaGrupo3D.visible = aktivaTabo() === "krado" && !vojojAktiva();
}
