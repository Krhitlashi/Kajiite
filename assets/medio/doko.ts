// Doko-modulo — vojaj etendoj kun subakvaj subtenoj
import * as THREE from "three";
import { kreiDioritanTeksajxon, kreiAndezitanTeksajxon } from "../komunajxoj/teksajxoj.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon } from "../komunajxoj/materialoj.js";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";
import { aldoniKadranTubon } from "../konstruajxoj/satalaj-konstruajxoj.js";

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
  const rad = Math.max(0, Math.min(r + strio, duonW + strio, ( duonL + strio ) / 2));
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

// PONT_DEKA_DIKECO — La dikeco de la ponta deko — la sama kiel ĉiuj vojoj
// ( VOJA_DIKECO ), ĉar la deko MEM estas voja rubando ( vidu malsupre ).
export const PONT_DEKA_DIKECO = 0o2/0o10;

// PONT_FINA_LEVIGXO — Kiom la SUFACO de la deko staras super la platforma
// supro ĉe ĉiu FINO de la ponto. GXi egalas la dekan dikecon, do la malsupro de
// la rubando kuŝas GXUSTE sur la platforma supro — la ponto sidas sur la dokoj
// ( kaj sur la kajo-vojoj, kiuj kuras laŭ iliaj landbordoj ), sen ŝtupo kaj sen
// z-flagro.
export const PONT_FINA_LEVIGXO = PONT_DEKA_DIKECO;

// PONT_POL_LEVIGXO — Kiom la ORA balustrado LEVIGXAS super sia baza alto ĉe la
// KRONO de la ponto. La deko mem estas REKTA ( la ponto estas simpla rekta
// trabo inter la du bordoj ); la arkon portas la balustrado — la fostoj altiĝas
// kaj malaltiĝas laŭ sinusoido, do la supra trabo svingiĝas supren meze de la
// ponto. ⟨ La boata klareco 📃 ⟩ — la akvo sidas je -4.5, kaj la REKTA deko
// restas pli ol 4.2 unuojn super gxi tra la tuta rivero ( la kanoto altas 0.78 ),
// dum la fostaj paroj restas flanke de la naviga kanalo.
export const PONT_POL_LEVIGXO = 0o3/0o2;

// pontaDeko — La SURFACO de la ponto je la parametro t ( 0 = la unua fino, 1 =
// la dua ). La deko estas REKTA linio inter la du finaj suproj — neniu arko en
// la veturebla surfaco, do la ponto legigxas kiel rekta trabo.
//     @param t ( number ) - La pozicio laŭ la ponto ( 0..1 ).
//     @param ay, by ( number ) - La altoj de la du finoj ( la platformaj suproj
//              plus PONT_FINA_LEVIGXO ).
//     @returns y ( number ) - La mondo-alto de la veturebla surfaco.
export function pontaDeko(t: number, ay: number, by: number): number {
  return ay + ( by - ay ) * t;
}

// pontaPolSupro — La mondo-alto de la SUPRO de balustrada fosto je la parametro
// t, se gxi staras sur la deko je alto dekaY. La fostaj suproj sekvas la dekan
// nivelon PLUS sinusan levigxon, do la supra trabo arkas supren meze de la ponto
// dum la fostoj mem altigxas — la sama sinusa profilo ĉe ambaŭ finoj ( nula
// deklivo-sxangxo ), do la balustrado eniras la bordon glate.
//     @param t ( number ) - La pozicio laŭ la ponto ( 0..1 ).
//     @param dekaY ( number ) - La alto de la deka surfaco je t.
//     @param polAlto ( number ) - La baza alto de la fosto super la deko.
//     @param levigxo ( number = PONT_POL_LEVIGXO ) - La levigxo ĉe la krono.
//     @returns y ( number ) - La mondo-alto de la fosto-supro.
export function pontaPolSupro(t: number, dekaY: number, polAlto: number,
  levigxo = PONT_POL_LEVIGXO): number {
  return dekaY + polAlto + levigxo * Math.sin(Math.PI * t);
}

// konstruiPonton — La SUPRAĴOJ de ponto inter du dokaj LANDbordoj. La veturebla
// SURFACO kaj la andezitaj randoj mem venas de la voja reto — la mond-nivela
// vojo "Ponto" ricevas la REKTAN supran funkcion ( pontaDeko ) en urbo.ts, do la
// voja rubando estas la rekta deko. Ĉi tiu funkcio aldonas tion, kion la vojo ne
// povas:
//   · la ORA balustrado — fostoj en la SAMA stilo kiel la angulaj pilieroj de la
//     konstruajxoj ( la sama diamanta sekco, la sama talona hoko supre, la sama
//     ora materialo — aldoniKadranTubon kun fora = 0 ), plus ora trabo laŭ iliaj
//     suproj. La ponto do legiĝas kiel parto de la urbo, ne kiel fremda peco.
//   · la ANDEZITAJ fostoj sub la deko, kiuj malsupreniras en la akvon — la samaj
//     konusaj cilindroj kiel la dokaj fostoj.
//     @param ax, az, ay ( number ) - La unua doka pinto kaj la alto de gxia platformo.
//     @param bx, bz, by ( number ) - La dua doka pinto kaj gxia platformo-alto.
//     @param largho ( number ) - La largho de la ponto-deko ( la voja largho ).
//     @param heightFn ( funkcio ) - La terena alto ( por la fundo de la fostoj ).
//     @param andezitaMaterialo, oraMaterialo ( materialoj ) - La dokaj kaj la
//              konstruajxaj materialoj ( la ponto kunhavigas ambaŭ familiojn ).
export function konstruiPonton(
  sceno: THREE.Scene,
  ax: number, az: number, ay: number,
  bx: number, bz: number, by: number,
  largho: number,
  heightFn: ( x: number, z: number ) => number,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial
): void {
  const longo = Math.hypot(bx - ax, bz - az);
  if ( longo < 0o1/0o10 ) return;
  const direkto = Math.atan2(bx - ax, bz - az);
  const duon = largho / 2;
  const grupo = new THREE.Group();
  grupo.position.set(ax, 0, az);
  grupo.rotation.y = direkto;
  const cosR = Math.cos(direkto), sinR = Math.sin(direkto);
  // La loka ( x, z ) → monda transformo — la fostoj bezonas la teren-alton.
  const mondaX = (lx: number, lz: number) => ax + cosR * lx + sinR * lz;
  const mondaZ = (lx: number, lz: number) => az - sinR * lx + cosR * lz;
  // La voja rubando dikegas 0o2/0o10, do la malsupro de la deko.
  const dekaDikeco = PONT_DEKA_DIKECO;
  const arko = (t: number) => pontaDeko(t, ay, by);
  // ⟨ La ORA balustrado 📃 ⟩ — fostoj en la piliera stilo sur ambaŭ flankoj de
  // la deko. La fostoj sekvas la arkon ( ĉiu staras sur la deko je sia propra
  // loko ) kaj iliaj hokoj svingiĝas EKSTEREN, super la akvon.
  const polAlto = 0o13/0o20;            // 0.8125 — la balustrada alto super la deko
  // Kiom da fostoj po flanko — la SAMA ritmo (~2.5-unua interspaco) sendepende de
  // la ponta longo, do longa ponto ne ricevas maldensan balustradon.
  const poloj = Math.max(0o5, Math.round(longo / 0o25/0o10) + 1);
  const polLargho = 0o7/0o40;           // 0.109 — la duon-larĝo de la diamanta sekco
  const polX = duon - 0o1/0o10;         // La fostoj staras iom ene de la rando.
  const geos: THREE.BufferGeometry[] = [];
  for ( const sX of [ -1, 1 ] ) {
    for ( let i = 0; i < poloj; i++ ) {
      const t = i / ( poloj - 1 );
      const lz = longo * t;
      const bazo = arko(t) - 0o1/0o100;   // Iom en la deko — neniu z-flagro.
      // La fosto altigxas al la arka balustrada linio, do gxia propra alto
      // kreskas meze de la ponto ( pontaPolSupro ).
      const supro = pontaPolSupro(t, bazo, polAlto);
      aldoniKadranTubon(geos, sX * polX, lz, bazo, supro, sX, 0, true, 0, true, 0);
    }
    // La ora trabo laŭ la suproj de la fostoj — glata tubo, kiu sekvas la ARKON
    // de la balustrado ( ne de la deko ): gxi svingigxas supren meze de la ponto.
    const traboPunktoj: THREE.Vector3[] = [];
    const trabajSekcioj = poloj * 2;
    for ( let i = 0; i <= trabajSekcioj; i++ ) {
      const t = i / trabajSekcioj;
      traboPunktoj.push(new THREE.Vector3(sX * polX, pontaPolSupro(t, arko(t), polAlto), longo * t));
    }
    const trabaKurbo = new THREE.CatmullRomCurve3(traboPunktoj, false, "centripetal", 0);
    const trabo = new THREE.Mesh(
      new THREE.TubeGeometry(trabaKurbo, trabajSekcioj, 0o1/0o20, 0o10, false), oraMaterialo);
    trabo.castShadow = true;
    grupo.add(trabo);
  }
  const balustrado = new THREE.Mesh(kunfandiGeometriojn(geos), oraMaterialo);
  balustrado.castShadow = true;
  grupo.add(balustrado);
  // ⟨ La ANDEZITAJ fostoj 📃 ⟩ — paroj da konusaj cilindroj ( la samaj kiel la
  // dokaj fostoj ) sub la deko, regule laŭ la tuta spano. Ili malsupreniras ĝis la
  // riverfundo ( por ke ili ne ŝvebu ) kaj iliaj suproj sekvas la arkon. La MEZA
  // TRIONO restas SEN fostoj — tiu estas la naviga kanalo, tra kiu la boatoj
  // pasas sub la ponto ( la kanoto altas 0.78 kaj la deko restas pli ol 4 unuojn
  // super la akvo ). Sen la pli multaj paroj longa ponto ŝvebus super la deklivaj
  // bordoj — la deko nun havas subtenon laŭ sia tuta longo.
  const fostaX = duon - 0o3/0o20;
  for ( const t of [ 0o1/0o6, 0o1/0o3, 0o2/0o3, 0o5/0o6 ] ) {
    const lz = longo * t;
    const dekaMalsupro = arko(t) - dekaDikeco;
    for ( const sX of [ -1, 1 ] ) {
      const lx = sX * fostaX;
      const fundo = heightFn(mondaX(lx, lz), mondaZ(lx, lz)) - 0o1/0o10;
      const alto = dekaMalsupro - fundo;
      if ( alto <= 0 ) continue;
      const fosto = new THREE.Mesh(
        new THREE.CylinderGeometry(0o3/0o20, 0o5/0o20, alto, 6), andezitaMaterialo);
      fosto.position.set(lx, fundo + alto / 2, lz);
      fosto.castShadow = true;
      grupo.add(fosto);
    }
  }
  sceno.add(grupo);
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
  let vojaY = heightFn(x, z);
  for ( const ofseto of [ -0o6/0o10, 0, 0o6/0o10 ] ) {
    vojaY = Math.max(vojaY, heightFn(landX + cosR * ofseto, landZ - sinR * ofseto));
  }
  const akvaY = waterFn(x);
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
      group.add(fosto);
    }
  }

  group.position.set(x, vojaY, z);
  group.rotation.y = direkto;
  sceno.add(group);

  // La ekstrudita plato etendiĝas de loka y=0 ĝis y=dikeco, do la supro
  // ( la piedira nivelo ) estas vojaY + dikeco en monda spaco.
  return { group, x, z, platformWidth: vojaLargho, platformDepth, platformY: vojaY + dikeco };
}
