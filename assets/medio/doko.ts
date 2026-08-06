// Doko-modulo — vojaj etendoj kun subakvaj subtenoj
import * as THREE from "three";
import { kreiDioritanTeksajxon, kreiAndezitanTeksajxon } from "../komunajxoj/teksajxoj.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon } from "../komunajxoj/materialoj.js";

export interface Doko {
  group: THREE.Group;
  x: number;
  z: number;
  platformWidth: number;
  platformDepth: number;
  // Monda Y de la platforma supro ( por kolizio. Staro SUR la doko ).
  platformY: number;
}

// La dokan formon. Rektangulo kun rondigitaj antaŭaj anguloj ( la akva pinto ).
// La bordo-flanko restas rekta. Kontraŭhorloĝa volvaĵo tenas la supran facon
// supren post la -90° X-rotacio ( sama konvencio kiel la vojoj ).
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

// Andezita kadro kroĉita al la deka rando — U-forma, MALFERMA sur la landa
// flanko. La ekstera formo havas la saman larĝon kaj la saman rondigitan akvan
// pinton kiel la interna ( samcentraj arkoj kun konstanta strio 0o4/0o10 ), sed
// ĝia landa rando kuŝas je la INTERNA pozicio ( -duonL ) — la du konturoj
// tuŝiĝas precize tie, kaj Earcut tranĉas la nulan bendon pura ( neniu triangulo
// kun nul areo ). Neniu kadra strio kuŝas super la vojo kiu alvenas al la doko,
// do la transiro restas unutavola kiel la kruciĝaj platoj.
function kreiDokanKadron(w: number, l: number, r: number, strio: number, dikeco: number): THREE.BufferGeometry {
  const interna = kreiDokanFormon(w, l, r);
  const duonW = w / 2, duonL = l / 2;
  const rad = Math.max(0, Math.min(r + strio, duonW + strio, (duonL + strio) / 2));
  const landa = -duonL;
  const ekstera = new THREE.Shape();
  ekstera.moveTo(-duonW - strio, landa);
  ekstera.lineTo(duonW + strio, landa);
  ekstera.lineTo(duonW + strio, duonL + strio - rad);
  ekstera.absarc(duonW + strio - rad, duonL + strio - rad, rad, 0, Math.PI / 2, false);
  ekstera.lineTo(-duonW - strio + rad, duonL + strio);
  ekstera.absarc(-duonW - strio + rad, duonL + strio - rad, rad, Math.PI / 2, Math.PI, false);
  ekstera.lineTo(-duonW - strio, landa);
  ekstera.closePath();
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
  const vojaLargho = 0o16/0o10;
  const platformDepth = profundo;
  const dikeco = 0o2/0o10;
  // Rondigita fronto — la akva pinto de la doko.
  const antaŭaRadiuso = 0o4/0o10;
  const dioritaTeksajxo = kreiDioritanTeksajxon();
  const andezitaTeksajxo = kreiAndezitanTeksajxon();
  const diorito = kreiDioritanMaterialon(dioritaTeksajxo);
  const andezito = kreiAndezitanMaterialon(andezitaTeksajxo);

  // La doko estas mallarĝa rekta etendo de la vojo; la akva pinto rondiĝas.
  const surfacaGeometrio = new THREE.ExtrudeGeometry(
    kreiDokanFormon(vojaLargho, platformDepth, antaŭaRadiuso),
    { depth: dikeco, bevelEnabled: false }
  );
  surfacaGeometrio.rotateX(-Math.PI / 2);
  const surfaco = new THREE.Mesh(surfacaGeometrio, diorito);
  surfaco.castShadow = surfaco.receiveShadow = true;
  group.add(surfaco);

  // Andezita kadro ( konstanta strio 0o4/0o10 ĉirkaŭ la tuta perimetro ) kun malalta
  // bordero levita super la deko — samstila kiel la voja andezita rando.
  const rando = new THREE.Mesh(
    kreiDokanKadron(vojaLargho, platformDepth, antaŭaRadiuso, 0o4/0o10, dikeco + 0o1/0o20),
    andezito
  );
  rando.position.y = -0o1/0o40;
  rando.castShadow = rando.receiveShadow = true;
  group.add(rando);

  // La tereno sub la doko deklivas malsupren al la rivero. Levu la dokon al la
  // terena alto ĉe ĝia LANDa (malantaŭa, ne-akva) rando, por ke la malantaŭo ne
  // enfosigu en la deklivan bordon — kaj la vojoj (kiuj sekvas la terenon)
  // renkontu la dokon ĉe la sama alto.
  const duonL = platformDepth / 2;
  const cosR = Math.cos(direkto), sinR = Math.sin(direkto);
  const landX = x + sinR * duonL, landZ = z + cosR * duonL;
  let vojaY = heightFn( x, z );
  for ( const ofseto of [ -0o6/0o10, 0, 0o6/0o10 ] ) {
    vojaY = Math.max(vojaY, heightFn(landX + cosR * ofseto, landZ - sinR * ofseto));
  }
  const akvaY = waterFn( x );
  const fostaAlto = Math.max(1, vojaY - akvaY);
  const fostoX = vojaLargho / 2 - 0o1/0o10;
  // La antaŭa vico sidas sub la rekta parto de la rondigita pinto.
  const frontaZ = -( platformDepth / 2 - antaŭaRadiuso - 0o1/0o10 );
  const malantaŭaZ = platformDepth / 2 - 0o1/0o10;
  for ( const localZ of [ frontaZ, malantaŭaZ ] ) {
    for ( const localX of [ -fostoX, fostoX ] ) {
      // Nur metu foston kie la tereno estas sub la platformo ( akvo/deklivo ); sur
      // la bordo la platformo sidas rekte sur la tero — neniu fosto en la tero.
      const mX = x + cosR * localX + sinR * localZ;
      const mZ = z - sinR * localX + cosR * localZ;
      if ( heightFn(mX, mZ) >= vojaY - 0o1/0o100 ) continue;
      const fosto = new THREE.Mesh(
        new THREE.CylinderGeometry(0o3/0o20, 0o5/0o20, fostaAlto, 6),
        andezito
      );
      fosto.position.set(localX, ( akvaY - vojaY ) / 2, localZ);
      fosto.castShadow = true;
      group.add( fosto );
    }
  }

  group.position.set(x, vojaY, z);
  group.rotation.y = direkto;
  sceno.add(group);

  // La ekstrudita plato etendiĝas de loka y=0 ĝis y=dikeco, do la supro
  // ( la piedira nivelo ) estas vojaY + dikeco en monda spaco.
  return { group, x, z, platformWidth: vojaLargho, platformDepth, platformY: vojaY + dikeco };
}
