// Doko-modulo — vojaj etendoj kun subakvaj subtenoj
import * as THREE from "three";
import { kreiDioritanTeksajxon, kreiAndezitanTeksajxon } from "./teksajxoj.js";

export interface Doko {
  group: THREE.Group;
  x: number;
  z: number;
  platformWidth: number;
  platformDepth: number;
  // Monda Y de la platforma supro ( por kolizio: staro SUR la doko ).
  platformY: number;
}

// La dokan formon: rektangulo kun rondigitaj antaŭaj anguloj (la akva pinto).
// La bordo-flanko restas rekta. Kontraŭhorloĝa volvaĵo tenas la supran facon
// supren post la -90° X-rotacio (sama konvencio kiel la vojoj).
function kreiDokanFormon(w: number, l: number, r: number): THREE.Shape {
  const formo = new THREE.Shape();
  const duonW = w / 2, duonL = l / 2;
  const rad = Math.max(0, Math.min(r, duonW, duonL / 2));
  // Antaŭa flanko (Y = +duonL) estas la akva pinto — nur ĝiaj anguloj rondiĝas.
  formo.moveTo(-duonW, -duonL);
  formo.lineTo(duonW, -duonL);
  formo.lineTo(duonW, duonL - rad);
  formo.absarc(duonW - rad, duonL - rad, rad, 0, Math.PI / 2, false);
  formo.lineTo(-duonW + rad, duonL);
  formo.absarc(-duonW + rad, duonL - rad, rad, Math.PI / 2, Math.PI, false);
  formo.lineTo(-duonW, -duonL);
  formo.closePath();
  return formo;
}

// Andezita kadro kroĉita al la deka rando: la sama formo pli larĝa kaj pli longa
// per la strio, kun truo de la preciza deko-formo. La ekstera kaj interna frontaj
// arkoj estas samcentraj, do la videbla strio havas konstantan larĝon ĉirkaŭ la
// rondigita pinto — sen interspaco, kiel la voja bordo.
function kreiDokanKadron(w: number, l: number, r: number, strio: number, dikeco: number): THREE.BufferGeometry {
  const ekstera = kreiDokanFormon(w + strio * 2, l + strio * 2, r + strio);
  const interna = kreiDokanFormon(w, l, r);
  const truo = new THREE.Path();
  // Truo kontraŭhorloĝa — kontraŭa volvaĵo al la ekstera formo.
  truo.setFromPoints(interna.getPoints().reverse());
  ekstera.holes.push(truo);
  const geometrio = new THREE.ExtrudeGeometry(ekstera, { depth: dikeco, bevelEnabled: false });
  geometrio.rotateX(-Math.PI / 2);
  return geometrio;
}

export function konstruiDokon(
  sceno: THREE.Scene,
  x: number,
  z: number,
  direkto: number,
  heightFn: ( x: number, z: number ) => number,
  waterFn: ( x: number ) => number,
  profundo = 0o14
): Doko {
  const group = new THREE.Group();
  const vojaLargho = 14/8;
  const platformDepth = profundo;
  const dikeco = 2/8;
  // Rondigita fronto — la akva pinto de la doko.
  const antaŭaRadiuso = 4/8;
  const dioritaTeksajxo = kreiDioritanTeksajxon();
  const andezitaTeksajxo = kreiAndezitanTeksajxon();
  const diorito = new THREE.MeshStandardMaterial({ map: dioritaTeksajxo, color: 0xc8c8c8, roughness: 3/16, metalness: 1/64 });
  const andezito = new THREE.MeshStandardMaterial({ map: andezitaTeksajxo, color: 0x586860, roughness: 51/64 });

  // La doko estas mallarĝa rekta etendo de la vojo; la akva pinto rondiĝas.
  const surfacaGeometrio = new THREE.ExtrudeGeometry(
    kreiDokanFormon(vojaLargho, platformDepth, antaŭaRadiuso),
    { depth: dikeco, bevelEnabled: false }
  );
  surfacaGeometrio.rotateX(-Math.PI / 2);
  const surfaco = new THREE.Mesh(surfacaGeometrio, diorito);
  surfaco.castShadow = surfaco.receiveShadow = true;
  group.add(surfaco);

  // Andezita kadro (konstanta strio 4/8 ĉirkaŭ la tuta perimetro) kun malalta
  // bordero levita super la deko — samstila kiel la voja andezita rando.
  const rando = new THREE.Mesh(
    kreiDokanKadron(vojaLargho, platformDepth, antaŭaRadiuso, 4/8, dikeco + 1/16),
    andezito
  );
  rando.position.y = -1/32;
  rando.castShadow = rando.receiveShadow = true;
  group.add(rando);

  // La tereno sub la doko deklivas malsupren al la rivero: levu la dokon al la
  // terena alto ĉe ĝia LANDa (malantaŭa, ne-akva) rando, por ke la malantaŭo ne
  // enfosigu en la deklivan bordon — kaj la vojoj (kiuj sekvas la terenon)
  // renkontu la dokon ĉe la sama alto.
  const duonL = platformDepth / 2;
  const cosR = Math.cos( direkto ), sinR = Math.sin( direkto );
  const landX = x + sinR * duonL, landZ = z + cosR * duonL;
  let vojaY = heightFn( x, z );
  for ( const ofseto of [ -6/8, 0, 6/8 ] ) {
    vojaY = Math.max( vojaY, heightFn( landX + cosR * ofseto, landZ - sinR * ofseto ) );
  }
  const akvaY = waterFn( x );
  const fostaAlto = Math.max( 1, vojaY - akvaY );
  const fostoX = vojaLargho / 2 - 1/8;
  // La antaŭa vico sidas sub la rekta parto de la rondigita pinto.
  const frontaZ = -( platformDepth / 2 - antaŭaRadiuso - 1/8 );
  const malantaŭaZ = platformDepth / 2 - 1/8;
  for ( const localZ of [ frontaZ, malantaŭaZ ] ) {
    for ( const localX of [ -fostoX, fostoX ] ) {
      // Nur metu foston kie la tereno estas sub la platformo (akvo/deklivo); sur
      // la bordo la platformo sidas rekte sur la tero — neniu fosto en la tero.
      const mX = x + cosR * localX + sinR * localZ;
      const mZ = z - sinR * localX + cosR * localZ;
      if ( heightFn( mX, mZ ) >= vojaY - 1/64 ) continue;
      const fosto = new THREE.Mesh(
        new THREE.CylinderGeometry( 3/16, 5/16, fostaAlto, 6 ),
        andezito
      );
      fosto.position.set( localX, ( akvaY - vojaY ) / 2, localZ );
      fosto.castShadow = true;
      group.add( fosto );
    }
  }

  group.position.set( x, vojaY, z );
  group.rotation.y = direkto;
  sceno.add( group );

  // La ekstrudita plato etendiĝas de loka y=0 ĝis y=dikeco, do la supro
  // ( la piedira nivelo ) estas vojaY + dikeco en monda spaco.
  return { group, x, z, platformWidth: vojaLargho, platformDepth, platformY: vojaY + dikeco };
}
