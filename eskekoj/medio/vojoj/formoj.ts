// ≺⧼ La vojaj formoj 📐 ⧽≻
// La malgrandaj geometriaj iloj de la vojoj — la arkoj ( kreiArkPunktojn,
// kreiEnanKornanArkon, kreiEksteranKurbanArkon ), la kvarona ringo
// ( kreiKvaronanRingon ), la kunigaj altoj ( plataAltoj ), la Shape-iloj
// ( kreiFormonElPunktoj ) kaj la baza segmenta geometrio ( kreiSegmentGeometrion ).
import * as THREE from "three";
import { KORNA_ENA_R, KORNA_R, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO } from "./mezuroj.js";

/**
 * Konstruu ŝtupetan vojan segmenton inter du vojpunktoj.
 * Specimenigas la terenon-altecon ĉiun ~4 unuojn, por ke la vojo nature
 * formu ŝtupojn kie la grundo deklivas kaj restu glata sur ebena grundo.
 */
// kreiArkPunktojn — La specimenaj punktoj de KVONA ARKO ( radiuso r ĉirkaŭ la
// centro ( cx, cz ) ) de la akso laŭ sx ĝis la akso laŭ sz, ambaŭ finoj
// inkluzive. La SAMA arko rondigas ĉiun angulon de la voja reto — la angulojn
// de la kruciĝaj platoj, la liberan kvadranton de la L-kornero kaj la kvaronajn
// diskojn — do la kurbo estas ĉie la sama.
//     @param cx, cz ( number ) - La centro de la arko ( relative al la nodo ).
//     @param r ( number ) - La radiuso de la arko.
//     @param sx, sz ( number ) - La kvadranto ( cxiu ±1 ).
//     @returns punktoj ( [ number, number ][] ) - La specimenaj punktoj.
export function kreiArkPunktojn(cx: number, cz: number, r: number, sx: number, sz: number): [ number, number ][] {
  const punktoj: [ number, number ][] = [];
  const pasxoj = 0o40;
  // La arko sidas EN la donita kvadranto, do la anguloj restas ene de unu
  // kvvaro — de la akso laŭ sx al la akso laŭ sz. La negativaj kvadrantoj
  // iras tra -π/2 aux 3π/2 ( ne rekte al -π/2, kio trapasus la malĝustan
  // kvadranton ).
  const a0 = sx > 0 ? 0 : Math.PI;
  const a1 = sz > 0 ? Math.PI / 2 : ( sx > 0 ? -Math.PI / 2 : 3 * Math.PI / 2 );
  for ( let i = 0; i <= pasxoj; i++ ) {
    const ang = a0 + ( a1 - a0 ) * ( i / pasxoj );
    punktoj.push([ cx + r * Math.cos(ang), cz + r * Math.sin(ang) ]);
  }
  return punktoj;
}

// kreiKvaronanRingon — La kvarona ringo inter du samcentraj arkoj en unu
// kvadranto ( sx, sz ) ĉirkaŭ la centro ( cx, cz ). La ekstera arko iras de
// la akso laŭ sx al la akso laŭ sz kaj la interna arko reiras inverse, do la
// fermo donas la du radialajn randojn sen aparta kodo. Gxi rondigas la
// liberan kvadranton de la L-kornero.
//     @param cx, cz ( number ) - La centro de la arkoj ( relative al la nodo ).
//     @param rEna, rEkstera ( number ) - La interna kaj la ekstera radiusoj.
//     @param sx, sz ( number ) - La kvadranto ( cxiu ±1 ).
//     @returns ringo ( [ number, number ][] ) - La fermita ringa poligono.
export function kreiKvaronanRingon(cx: number, cz: number, rEna: number, rEkstera: number, sx: number, sz: number): [ number, number ][] {
  return [ ...kreiArkPunktojn(cx, cz, rEkstera, sx, sz),
    ...kreiArkPunktojn(cx, cz, rEna, sx, sz).reverse() ];
}

function specimeniRotitajn(
  x: number,
  z: number,
  duono: number,
  rotacio: number,
  heightFn: ( x: number, z: number ) => number
): { maksimumo: number; minimumo: number } {
  const kos = Math.cos( rotacio ), sin = Math.sin( rotacio );
  let maksimumo = -Infinity, minimumo = Infinity;
  for ( const lx of [ -duono, duono ] ) for ( const lz of [ -duono, duono ] ) {
    const h = heightFn( x + kos * lx - sin * lz, z + sin * lx + kos * lz );
    maksimumo = Math.max( maksimumo, h );
    minimumo = Math.min( minimumo, h );
  }
  return { maksimumo, minimumo };
}

// plataAltoj — La SUPRO kaj la MINIMUMO de kuniga plato je la kunigo ( x, z )
// kun la rotacio de la kunigo. La plato sidas je la maksimuma angula teren-alto
// ( plus la sama levigxo kiel la vojoj — VOJA_SUPRO_LEVIGXO ), kaj la minimumo
// restas por la profundo de la plato.
// ⟨ Kial aparta funkcio 📃 ⟩ — la PONTaj finoj legas GXUSTE cxi tiun supran
// valoron. Ponto alvenas SUR la kunigan platon ( gxia fino sidas sub la plato ),
// do se la deko legus nur la terenon sub si, gxi finigxus gxis 0.4 unuojn sub la
// plato kaj la ponto sxajnus duone enfosita cxe siaj surterigxejoj. Unu formulo,
// du legantoj — la plato kaj la ponto restas samnivelaj.
//     @param x, z ( number ) - La centro de la kunigo.
//     @param rotacio ( number ) - La rotacio de la kunigo ( el rotacioPor ).
//     @param heightFn ( function ) - La terena alta funkcio.
//     @returns { supro, minimumo } ( object ) - La plata supro kaj la minimuma angula alto.
export function plataAltoj(x: number, z: number, rotacio: number,
  heightFn: ( x: number, z: number ) => number
): { supro: number; minimumo: number } {
  const altoj = specimeniRotitajn(x, z, VOJA_EKSTERA_DUONO, rotacio, heightFn);
  return { supro: Math.max( heightFn(x, z), altoj.maksimumo ) + VOJA_SUPRO_LEVIGXO,
    minimumo: altoj.minimumo };
}

// kreiEnanKornanArkon — La U-forma interna rando de la TUTA angulo en la
// DU-braka kvadranto ( sx, sz ). Gxi iras de voj-rando al voj-rando ( de S1 al
// E1 ) cxirkaux la ekstera centro O per la radiuso KORNA_ENA_R, do la akra V
// farigxas glata U. La centro O estas la sama kiel tiu de la ekstera kurbo,
// do ambaux arkoj estas samcentraj. La SAMA arko rondigas cxiun kvarvojan
// krucigxon, cxiun T-kunigon kaj la enan angulon de cxiun L-korneron.
//     @param sx, sz ( number ) - La kvadranto ( cxiu ±1 ).
//     @param ekstera ( number ) - La voja ekstera duono ( por O, S1 kaj E1 ).
//     @returns arko ( [ number, number ][] ) - La U-arko de S1 al E1.
export function kreiEnanKornanArkon(sx: number, sz: number, ekstera: number): [ number, number ][] {
  return kreiArkPunktojn(sx * ( ekstera + KORNA_R ), sz * ( ekstera + KORNA_R ), KORNA_ENA_R, -sx, -sz).reverse();
}

// kreiEksteranKurbanArkon — La ekstera kurbo de la TUTA angulo en la DU-braka
// kvadranto ( sx, sz ). Gxi iras de voj-rando al voj-rando ( de E1 al S1 )
// cxirkaux la sama centro O per la radiuso KORNA_R kaj tangentigxas al ambaux
// vojaj eksteraj randoj, do la vojaj bordoj fluas glate en la kurbon.
//     @param sx, sz ( number ) - La kvadranto ( cxiu ±1 ).
//     @param ekstera ( number ) - La voja ekstera duono ( por O, S1 kaj E1 ).
//     @returns arko ( [ number, number ][] ) - La kurbo de E1 al S1.
export function kreiEksteranKurbanArkon(sx: number, sz: number, ekstera: number): [ number, number ][] {
  return kreiArkPunktojn(sx * ( ekstera + KORNA_R ), sz * ( ekstera + KORNA_R ), KORNA_R, -sx, -sz);
}

// kreiFormonElPunktoj — THREE.Shape el relative punktoj ( Δx, Δz ) ĉirkaŭ la
// origino. La formo-ebeno uzas ( x, -z ) — la sama konvencio kiel la aliaj
// ekstruditaj formoj post rotateX( -π/2 ). La volvaĵo normaliĝas CCW per la
// shoelace-signo — la supra faco supren post la rotacio, sendepende de la
// eniga ordo.
//     @param punktoj ( [ number, number ][] ) - La relative punktoj ( Δx, Δz ).
//     @returns formo ( Shape ) - La formo el la punktoj.
export function kreiFormonElPunktoj(punktoj: [ number, number ][]): THREE.Shape {
  const formaj = punktoj.map(p => [ p[0], -p[1] ] as [ number, number ]);
  let areo = 0;
  for ( let i = 0; i < formaj.length; i++ ) {
    const a = formaj[i], b = formaj[( i + 1 ) % formaj.length];
    areo += a[0] * b[1] - b[0] * a[1];
  }
  if ( areo < 0 ) formaj.reverse();
  const formo = new THREE.Shape();
  formo.moveTo(formaj[0][0], formaj[0][1]);
  for ( let i = 1; i < formaj.length; i++ ) formo.lineTo(formaj[i][0], formaj[i][1]);
  formo.closePath();
  return formo;
}

export function kreiSegmentGeometrion(w: number, l: number, d: number, ofsetoX: number = 0): THREE.ExtrudeGeometry {
  // Konektitaj vojo-etendoj restas rektaj; nur la kradaj platoj ricevas rondajn angulojn.
  // ofsetoX sxovas la strion laux la loka flank-akso ( ⊥ al la voja direkto ),
  // por ke la andezitaj flankoj sidu APUD la diorita centro — ne sub gxi.
  const formo = new THREE.Shape();
  const duonW = w / 2, duonL = l / 2;
  formo.moveTo(-duonW + ofsetoX, -duonL);
  formo.lineTo(duonW + ofsetoX, -duonL);
  formo.lineTo(duonW + ofsetoX, duonL);
  formo.lineTo(-duonW + ofsetoX, duonL);
  formo.closePath();
  return new THREE.ExtrudeGeometry(formo, { depth: d, bevelEnabled: false });
}
