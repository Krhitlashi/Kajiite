// ≺⧼ Glacifiso 🐟 ⧽≻
// Travidebla, senhemoglobina fiŝo por la rivero ( Channichthyidae ).
// Ĝi estas unu el la akvaj specoj: la korpo estas tubo el ELIPSAJ sekcoj ( lathe
// ne povas havi ne-rondan sekcon ), kun haŭta teksajxo por la brankaro, la
// flanklinio kaj la makuloj, kaj tri-segmenta ĉeno por la naĝa ondo.
//
// La speco posedas sian konstruon KAJ sian animacion, do ĉio pri la glacifiso
// troviĝas en ĉi tiu dosiero. La komuna akva sistemo ( la rivera pozicio, la
// bobado, la speco-elektado ) restas en bestoj.ts.
import * as THREE from "three";
import { kreiLoftanGeometrion } from "../komunajxoj/formoj.js";
import type { Besto, SpecoMalneto } from "./speco-tipoj.js";
// La krada interpolo — la komuna kurbo de la ludo ( kantaoj/interpolo.ts ).
import { katmullRom } from "../../kantaoj/interpolo.js";
import { kreiGlacifisanHaŭtanTeksajxon } from "../komunajxoj/teksajxoj/glacifisa-hauxto.js";
import { kreiGlacifisanNaĝilanTeksajxon } from "../komunajxoj/teksajxoj/glacifisa-nagxilo.js";

// ⟪ Glacifiso ( Channichthyidae ) 📃 ⟫
// La glacifiso estas travidebla, senhemoglobina fiŝo — preskaŭ senkolora, kun
// GRANDA kapo kaj longa malprofunda korpo. Ĝi naĝas per malrapidaj remoj de
// la grandaj brustaj naĝiloj, kaj la korpo ondigas ( tri-segmenta ĉeno ),
// anstataŭ svingiĝi rigide. La korpo estas tubo el ELIPSAJ sekcoj — lathe-korpo
// estas ronda ĉirkaŭ la akso, do ĝi aspektis kiel torpedo kaj ne kiel fiŝo —
// kaj la haŭta teksajxo portas la malhelan brankaron, la flanklinion kaj la
// etajn makulojn de la specio.

// FiŝaStacio — unu sekco de la korpo. z estas la absoluta pozicio laŭ la korpo
// ( la nazo ĉe 0, la vosto negativa ), rx la duon-larĝo kaj ry la duon-alto tie.
interface FiŝaStacio { z: number; rx: number; ry: number; }
export // GLACIFISA_PROFILO — la glacifisa korpa profilo, de la nazo ĝis la vosta
// bazo. Longeco 4-5 fojojn la korpan alton, kiel vera glacifiso — profunda
// ŝultro ( la plej larĝa punkto apud la brankoj ) kaj mallarĝiĝanta vosto.
const GLACIFISA_LONGO = 0o175/0o100;
const GLACIFISA_PROFILO: FiŝaStacio[] = [
  { z: 0,                rx: 0o2/0o100,  ry: 0o2/0o100 },   // la nazpinto
  { z: -0o1/0o10,        rx: 0o5/0o100,  ry: 0o6/0o100 },   // la muzelo
  { z: -0o1/0o4,         rx: 0o7/0o100,  ry: 0o10/0o100 },  // la kapo
  { z: -0o1/0o2,         rx: 0o10/0o100, ry: 0o14/0o100 },  // la ŝultro ( brankoj )
  { z: -0o3/0o4,         rx: 0o7/0o100,  ry: 0o12/0o100 },
  { z: -0o1,             rx: 0o6/0o100,  ry: 0o10/0o100 },
  { z: -0o13/0o10,       rx: 0o4/0o100,  ry: 0o7/0o100 },   // la vosta pedunklo
  { z: -0o16/0o10,       rx: 0o2/0o100,  ry: 0o4/0o100 },
  { z: -GLACIFISA_LONGO, rx: 0o1/0o100,  ry: 0o2/0o100 },   // la vosta bazo
];
export // La tri ĉenaj segmentoj — kapo, mezo, vosto. La artikoj estas ekzaktaj
// stacioj, do la ringoj kongruas kaj la kruroj de la ĉeno ne montras fendetojn.
// Kiom flanke kaj supre la okulo sidas ( 0o7/0o20 de la sekca radiuso ) —
// la tekseja orbita ombro kaj la okula globo devas samloke sidi.
const GLACIFISA_OKULA_FLANKO = 0o7/0o20;
const GLACIFISA_OKULA_Z = -0o27/0o100;
const GLACIFISA_KAPO_Z = -0o1/0o2;        // la brankoŝirmilo
const GLACIFISA_MEZO_Z = -0o13/0o10;

// subdividuStaciojn — Densigu la profilon. La malmultaj stacioj donus facetan
// tubon ( videblaj ringoj ); la Katmull-Rom-interpolo donas glatan fiŝan
// korpon, kaj la sama matematiko ĉe la artikoj redonas la saman ringon, do la
// segmentoj kongruas ekzakte.
function subdividuStaciojn(stacioj: FiŝaStacio[], poIntervalo: number): FiŝaStacio[] {
  const eligo: FiŝaStacio[] = [];
  const n = stacioj.length;
  const je = ( i: number ) => stacioj[Math.max(0, Math.min(n - 1, i))];
  const valoro = ( i: number, t: number, preni: ( s: FiŝaStacio ) => number ): number =>
    katmullRom(preni(je(i - 1)), preni(je(i)), preni(je(i + 1)), preni(je(i + 2)), t);
  for ( let i = 0; i < n - 1; i++ ) {
    for ( let k = 0; k < poIntervalo; k++ ) {
      const t = k / poIntervalo;
      eligo.push({
        z: valoro(i, t, s => s.z),
        rx: valoro(i, t, s => s.rx),
        ry: valoro(i, t, s => s.ry),
      });
    }
  }
  eligo.push({ z: stacioj[n - 1].z, rx: stacioj[n - 1].rx, ry: stacioj[n - 1].ry });
  return eligo;
}

// kreiFiŝanTubon — Tubo el elipsaj sekcoj laŭ la korpa akso. Por ĉiu sekco
// ( z, rx, ry ) ok+ anguloj da verticoj; la UV-oj mapas la korpon ( u ĉirkaŭe,
// v de la nazo ĝis la vosto ), do la haŭta teksajxo sekvas la profilon.
//     @param stacioj ( FiŝaStacio[] ) - La ( densigitaj ) sekcoj de la segmento.
//     @param anguloj ( number ) - Kiom da verticoj ĉirkaŭ la korpo.
//     @param longo ( number ) - La tuta korpa longo ( por la v-koordinato ).
//     @returns geometrio ( THREE.BufferGeometry ) - La segmenta korpo.
function kreiFiŝanTubon(stacioj: FiŝaStacio[], anguloj: number, longo: number): THREE.BufferGeometry {
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  const zDe = stacioj[0].z;   // la segmenta origino sidas ĉe sia antaŭa artiko
  // Ĉiu ringo havas anguloj+1 verticojn — la lasta ripetas la pozicion de la
  // unua sed kun u = 1 ALIVERTE. Tiu duobla kudro-vertico estas necesa — sen
  // ĝi la lasta kvarangulo de la ĉirkaŭvolvo irus de u = 15/16 reen al u = 0
  // kaj projekcius la TUTAN teksejon malantaŭen en unu strio de la korpo ( la
  // "dentoj", kiuj aperis sur la flanko de la fiŝo ).
  const ringo = anguloj + 1;
  for ( let i = 0; i < stacioj.length; i++ ) {
    const stacio = stacioj[i];
    for ( let j = 0; j <= anguloj; j++ ) {
      const angulo = j / anguloj * Math.PI * 2;
      pozicioj.push(Math.cos(angulo) * stacio.rx, Math.sin(angulo) * stacio.ry, stacio.z - zDe);
      uvoj.push(j / anguloj, -stacio.z / longo);
    }
  }
  for ( let i = 0; i < stacioj.length - 1; i++ ) {
    for ( let j = 0; j < anguloj; j++ ) {
      const a = i * ringo + j, b = a + 1;
      const c = a + ringo, d = b + ringo;
      indeksoj.push(a, c, d, a, d, b);
    }
  }
  return kreiLoftanGeometrion(pozicioj, uvoj, indeksoj);
}

// normaliguUvojn — ShapeGeometry uzas la formaĵajn koordinatojn kiel UV. La
// naĝilaj teksajxoj atendalas la norman 0-1 kadron, do reskribu ilin laŭ la
// limoj de la formo ( u de la bazo ĝis la pinto ).
function normaliguUvojn(geometrio: THREE.BufferGeometry): void {
  geometrio.computeBoundingBox();
  const limoj = geometrio.boundingBox!;
  const largho = Math.max(0o1/0o1000, limoj.max.x - limoj.min.x);
  const alto = Math.max(0o1/0o1000, limoj.max.y - limoj.min.y);
  const uvoj = geometrio.getAttribute("uv") as THREE.BufferAttribute;
  for ( let i = 0; i < uvoj.count; i++ ) {
    // u = 0 ĉe la naĝila bazo, 1 ĉe la pinto ( la formoj kreskas malantaŭen,
    // do la maksimuma x estas la artiko ).
    uvoj.setXY(i, ( limoj.max.x - uvoj.getX(i) ) / largho, ( uvoj.getY(i) - limoj.min.y ) / alto);
  }
  uvoj.needsUpdate = true;
}

// kreiNaĝilon — Naĝila mesxo el 2D-formo. La formo estas desegnita en la
// ( malantaŭen, supren ) ebeno — la forma x iras malantaŭen laŭ la korpo, la
// forma y supren — kaj la geometrio turniĝas en la korpan YZ-ebonon, do ĝi
// fariĝas vertikala naĝilo ( dorsa, anala, vosta ). La flankaj naĝiloj
// ( brustaj, pelvaj ) ricevas sian klinon per rotacio sur la meshxo.
//     @param formo ( THREE.Shape ) - La naĝila konturo.
//     @param materialo ( THREE.Material ) - La naĝila materialo ( kun la sama
//         naĝila teksajxo por ĉiuj naĝiloj ).
//     @param x, y, z ( number ) - La artiko ( la formo-origino ).
//     @returns naĝilo ( THREE.Mesh ) - La preta naĝilo.
function kreiNaĝilon(formo: THREE.Shape, materialo: THREE.Material,
  x: number, y: number, z: number): THREE.Mesh {
  const geometrio = new THREE.ShapeGeometry(formo);
  normaliguUvojn(geometrio);
  geometrio.rotateY(-Math.PI / 0o2);
  const naĝilo = new THREE.Mesh(geometrio, materialo);
  naĝilo.position.set(x, y, z);
  return naĝilo;
}

// konstruiGlacifisanMalneton — Glacifiso ( Channichthyidae ). Preskaŭ
// travidebla fiŝo — la antarktaj glacifisoj ne havas hemoglobinon, do ilia
// korpo estas senkolora. La korpo estas tri-segmenta ĉeno ( kapo, mezo,
// vosto ) — la animacio ondigas ĝin ( vidu gxisdatigiBestojn ) — kun granda
// kapo, longa malalta dua dorsa naĝilo, anala naĝilo, grandaj ventumilformaj
// brustaj naĝiloj, longaj pelvaj naĝiloj kaj small-forka vosta naĝilo. Okuloj,
// buŝo kaj brankoj kompletigas la kapon.
export function konstruiGlacifisanMalneton(): SpecoMalneto {
  const grupo = new THREE.Group();

  const korpaMaterialo = new THREE.MeshPhysicalMaterial({
    color: 0xa8c0ca,
    map: kreiGlacifisanHaŭtanTeksajxon({ longo: GLACIFISA_LONGO, kapoZ: GLACIFISA_KAPO_Z,
      okulaFlanko: GLACIFISA_OKULA_FLANKO, okulaZ: GLACIFISA_OKULA_Z }),
    transparent: true,
    // Pli maldiafana ol antaŭe ( 0o7/0o20 ) — la korpo restas travidebla, sed la
    // malhela dorso kaj la makuloj legiĝas anstataŭ laviĝi.
    opacity: 0o15/0o20,
    depthWrite: false,
    roughness: 0o4/0o10,
    // Malseka, glata fiŝa haŭto — maldika travidebla lako super la mola korpo.
    // Tro da lako lavas la malhelan dorson per spegula blanko, do ĝi estas
    // modera kaj pli malglata ol antaŭe.
    clearcoat: 0o5/0o10,
    clearcoatRoughness: 0o35/0o100,
    iridescence: 0o25/0o100,
    iridescenceIOR: 0o25/0o20,
    // Neniu emisio — la akvo jam lumigas la korpon, kaj la malnova emisio lavis
    // la makulojn — la fiŝo aspektis kiel lakte blanka tubo.
    side: THREE.DoubleSide,
  });
  const naĝilaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x8ea9b8, map: kreiGlacifisanNaĝilanTeksajxon(),
    transparent: true, opacity: 0o13/0o20,
    depthWrite: false, side: THREE.DoubleSide, roughness: 0o5/0o10,
  });
  // La okulo — malgranda, malhela, brilanta; ĝi estas mergita en la kapon, kaj
  // la teksejo malheliĝas ĉirkaŭ ĝi ( la orbita ombro ), do ĝi legiĝas kiel
  // okulo anstataŭ kiel nigra globeto sur la haŭto.
  const okulaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x0e1a22, roughness: 0o12/0o100, metalness: 0o3/0o10,
  });
  const buŝaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x2a323e, roughness: 0o6/0o10, side: THREE.DoubleSide,
  });

  // La tri korpaj segmentoj. Ĉiu segmento longas de sia antaŭa artiko kaj
  // rotacias ĉirkaŭ ĝi, do la naĝa ondo kurbiĝas tra la korpo. La geometrioj
  // estas plene apartaj ( kunhavataj de ĉiuj glacifisoj — ili estas klonoj ).
  const densigitaj = subdividuStaciojn(GLACIFISA_PROFILO, 0o2);
  const jeZ = ( z: number ): number => densigitaj.findIndex(s => s.z <= z + 0o1/0o10000);
  const tranĉi = ( de: number, ĝis: number ): FiŝaStacio[] => densigitaj.slice(de, ĝis + 1);
  const kapFino = jeZ(GLACIFISA_KAPO_Z);
  const mezFino = jeZ(GLACIFISA_MEZO_Z);

  const kapo = new THREE.Mesh(
    kreiFiŝanTubon(tranĉi(0, kapFino), 0o20, GLACIFISA_LONGO), korpaMaterialo);
  kapo.name = "korpo";
  kapo.position.z = -( GLACIFISA_PROFILO[0].z - GLACIFISA_LONGO * 0o1/0o2 );
  grupo.add(kapo);

  const mezo = new THREE.Mesh(
    kreiFiŝanTubon(tranĉi(kapFino, mezFino), 0o20, GLACIFISA_LONGO), korpaMaterialo);
  mezo.name = "segmento";
  mezo.position.z = GLACIFISA_KAPO_Z;
  kapo.add(mezo);

  const vosto = new THREE.Mesh(
    kreiFiŝanTubon(tranĉi(mezFino, densigitaj.length - 1), 0o20, GLACIFISA_LONGO), korpaMaterialo);
  vosto.name = "segmento";
  vosto.position.z = GLACIFISA_MEZO_Z - GLACIFISA_KAPO_Z;
  mezo.add(vosto);

  // Vosta naĝilo — malgranda, iom forka, kun rondaj loboj.
  const vostaFormo = new THREE.Shape();
  vostaFormo.moveTo(0, 0o11/0o100);
  vostaFormo.quadraticCurveTo(-0o11/0o100, 0o13/0o100, -0o16/0o100, 0o15/0o100);
  vostaFormo.quadraticCurveTo(-0o14/0o100, 0o6/0o100, -0o13/0o100, 0);
  vostaFormo.quadraticCurveTo(-0o14/0o100, -0o6/0o100, -0o16/0o100, -0o15/0o100);
  vostaFormo.quadraticCurveTo(-0o11/0o100, -0o13/0o100, 0, -0o11/0o100);
  vostaFormo.closePath();
  const vostaNaĝilo = kreiNaĝilon(vostaFormo, naĝilaMaterialo, 0, 0,
    -( GLACIFISA_LONGO + GLACIFISA_MEZO_Z));
  vostaNaĝilo.name = "vosto";
  vosto.add(vostaNaĝilo);

  // Dua dorsa naĝilo — longa, malalta, kiel vera glacifiso. Ĝi sidas sur la
  // meza segmento, do ĝi sekvas la naĝan ondon.
  const duaDorsaFormo = new THREE.Shape();
  duaDorsaFormo.moveTo(0, 0);
  duaDorsaFormo.quadraticCurveTo(-0o12/0o100, 0o13/0o100, -0o34/0o100, 0o11/0o100);
  duaDorsaFormo.quadraticCurveTo(-0o56/0o100, 0o10/0o100, -0o67/0o100, 0o4/0o100);
  duaDorsaFormo.lineTo(-0o67/0o100, 0);
  duaDorsaFormo.closePath();
  const duaDorsa = kreiNaĝilon(duaDorsaFormo, naĝilaMaterialo, 0, 0o13/0o100, 0);
  duaDorsa.name = "dorsa";
  mezo.add(duaDorsa);

  // Anala naĝilo — la spegulo de la dua dorsa naĝilo sub la korpo.
  const analaFormo = new THREE.Shape();
  analaFormo.moveTo(0, 0);
  analaFormo.quadraticCurveTo(-0o12/0o100, -0o12/0o100, -0o26/0o100, -0o10/0o100);
  analaFormo.quadraticCurveTo(-0o42/0o100, -0o7/0o100, -0o50/0o100, -0o3/0o100);
  analaFormo.lineTo(-0o50/0o100, 0);
  analaFormo.closePath();
  const anala = kreiNaĝilon(analaFormo, naĝilaMaterialo, 0, -0o13/0o100, -0o1/0o10);
  anala.name = "analo";
  mezo.add(anala);

  // Unua dorsa naĝilo — mallonga, pli alta, ĵus antaŭ la dua ( la dornaj
  // radioj de la specio ).
  const unuaDorsaFormo = new THREE.Shape();
  unuaDorsaFormo.moveTo(0, 0);
  unuaDorsaFormo.quadraticCurveTo(-0o5/0o100, 0o14/0o100, -0o13/0o100, 0o11/0o100);
  unuaDorsaFormo.lineTo(-0o22/0o100, 0);
  unuaDorsaFormo.closePath();
  const unuaDorsa = kreiNaĝilon(unuaDorsaFormo, naĝilaMaterialo, 0, 0o12/0o100, -0o3/0o10);
  unuaDorsa.name = "dorsa";
  kapo.add(unuaDorsa);

  // Okuloj — sur la supraj flankoj de la kapo, iom antaŭ la brankoj. La
  // pozicio kaj la grando DERIVIĜAS el la profilo, do okulo sekvas la korpon
  // se la profilo ŝanĝiĝas, kaj ĝi sidas en la haŭto anstataŭ naĝi antaŭ ĝi.
  const okulaZ = GLACIFISA_OKULA_Z;
  const okulaStacio = densigitaj.reduce((najbara, stacio) =>
    Math.abs(stacio.z - okulaZ) < Math.abs(najbara.z - okulaZ) ? stacio : najbara);
  // La okulo estas eta — ĉirkaŭ kvarono de la kapa alto; pli granda globo
  // aspektas kiel nigra pilko gluita sur la kapo.
  const okulaGeometrio = new THREE.SphereGeometry(okulaStacio.ry * 0o1/0o4, 0o10, 0o10);
  for ( const s of [ 0o1, -0o1 ] ) {
    const okulo = new THREE.Mesh(okulaGeometrio, okulaMaterialo);
    okulo.name = "okulo";
    okulo.position.set(s * okulaStacio.rx * GLACIFISA_OKULA_FLANKO,
      okulaStacio.ry * GLACIFISA_OKULA_FLANKO, okulaZ);
    // Plata okulo, mergita en la kapon ( ne tuta globo sur la surfaco ).
    okulo.scale.set(0o7/0o10, 0o1, 0o1);
    kapo.add(okulo);
  }

  // La buŝo — mallarĝiĝanta malhela konuso en la muzelo. La korpo estas
  // travidebla, do la malhela buŝo videblas tra la haŭto kiel vera buŝo. La
  // malnova buŝo havis frontan radiuson 0.07 — duoble pli larĝan ol la muzelo
  // mem — do ĝi elstaris el la nazo kiel nigra funelo.
  const buŝaZ = -0o1/0o12;
  const buŝaStacio = densigitaj.reduce((najbara, stacio) =>
    Math.abs(stacio.z - buŝaZ) < Math.abs(najbara.z - buŝaZ) ? stacio : najbara);
  const buŝo = new THREE.Mesh(
    new THREE.CylinderGeometry(buŝaStacio.rx * 0o35/0o100, buŝaStacio.rx * 0o7/0o10,
      0o6/0o100, 0o12, 1, true), buŝaMaterialo);
  buŝo.name = "busxo";
  buŝo.rotation.x = Math.PI / 0o2;
  buŝo.position.set(0, 0, buŝaZ);
  kapo.add(buŝo);

  // Brustaj naĝiloj — LARĜAJ ventumiloj apud la brankoj, preskaŭ horizontalaj
  // kaj iom klinitaj malsupren. Ili remas la fiŝon ( vidu gxisdatigiBestojn ).
  const brustaFormo = new THREE.Shape();
  brustaFormo.moveTo(0, 0);
  brustaFormo.quadraticCurveTo(-0o10/0o100, -0o11/0o100, -0o24/0o100, -0o13/0o100);
  brustaFormo.quadraticCurveTo(-0o37/0o100, -0o10/0o100, -0o33/0o100, 0o1/0o100);
  brustaFormo.quadraticCurveTo(-0o17/0o100, 0o6/0o100, -0o4/0o100, 0o3/0o100);
  brustaFormo.closePath();
  for ( const s of [ 0o1, -0o1 ] ) {
    const brusta = kreiNaĝilon(brustaFormo, naĝilaMaterialo, s * 0o10/0o100, -0o2/0o100, -0o45/0o100);
    brusta.name = "brusta";
    // Preskaŭ horizontala ( turnita el la vertikala ebeno ) kaj iom klinita
    // malsupren; la finaĵo iomete disverŝiĝas malantaŭen.
    brusta.rotation.z = s * -( Math.PI / 0o2 + 0o3/0o10 );
    brusta.rotation.y = s * -0o2/0o10;
    brusta.userData.bazaZ = brusta.rotation.z;
    brusta.userData.bazaY = brusta.rotation.y;
    kapo.add(brusta);
  }

  // Pelvaj naĝiloj — du longaj maldikaj lamenoj sub la kapo; veraj glacifisoj
  // apogas sin sur ili antaŭ la fundo.
  const pelvaFormo = new THREE.Shape();
  pelvaFormo.moveTo(0, 0);
  pelvaFormo.quadraticCurveTo(-0o10/0o100, -0o7/0o100, -0o22/0o100, -0o12/0o100);
  pelvaFormo.quadraticCurveTo(-0o32/0o100, -0o10/0o100, -0o20/0o100, -0o3/0o100);
  pelvaFormo.closePath();
  for ( const s of [ 0o1, -0o1 ] ) {
    const pelva = kreiNaĝilon(pelvaFormo, naĝilaMaterialo, s * 0o3/0o100, -0o15/0o100, -0o35/0o100);
    pelva.name = "pelva";
    pelva.rotation.z = s * 0o35/0o100;
    pelva.userData.bazaZ = pelva.rotation.z;
    kapo.add(pelva);
  }

  return {
    malneto: grupo, platigxo: new THREE.Vector3(0o1, 0o1, 0o1),
      supro: 0o25/0o100, speco: "glacifiso", fundaMergo: 0o5/0o10,
    // La glacifiso naĝas MALRAPIDE — ĝi remas per la brustaj naĝiloj anstataŭ
    // svingi la voston kiel rapidmova fiŝo.
    rapidaMultoblo: 0o5/0o10, ampleksaMultoblo: 0o6/0o10,
  };
}

// La supren-akso — la akso laŭ kiu la cilindroj de kreiTubon naskiĝas.

// gxisdatigiGlacifison — la glacifisa naĝado: la kapo turniĝas al la direkto
// de la movo ( kun banko kaj nazo-klino ), la korpa ondo vojaĝas malantaŭen
// tra la segmenta ĉeno, kaj la grandaj brustaj naĝiloj remas ( kun plumado ).
export function gxisdatigiGlacifison(b: Besto, t: number, dt: number): void {
  // ⟨ La glacifisa naĝado 📃 ⟩ — tri movoj, kiuj kune aspektigas veran
  // fiŝon. 1. La kapo TURNIGXAS al la direkto de la movo ( la analiza
  // derivaĵo de la oscila vojo ), kun glata turniĝo kaj kliniĝo en la
  // turnojn — antaŭe la fiŝo tenis fiksan hazardan angulon kaj glitis
  // flanken. 2. La korpa ondo iras malantaŭen tra la segmenta ĉeno ( ĉiu
  // segmento malfruas la antaŭan ) kaj finiĝas ĉe la vosta naĝilo.
  // 3. La brustaj ventumiloj REMAS ( malrapida, larĝa bato ), kaj la
  // pelvaj naĝiloj svingiĝas kiel palpiloj.
  const vx = Math.cos(t * b.rapido + b.phase) * b.amplitudo * b.rapido;
  const vz = Math.cos(t * 0o3/0o4 + b.phase * 0o2) * 0o3/0o4;
  let diferenco = Math.atan2(vx, vz) - b.direkto;
  diferenco = Math.atan2(Math.sin(diferenco), Math.cos(diferenco));
  const turno = diferenco * Math.min(1, 0o4 * dt);
  b.direkto += turno;
  b.turno = turno / dt;
  b.grupo.rotation.y = b.direkto;
  // Kliniĝo — la fiŝo bankas en la turnon, kaj iomete kliniĝas sub la ondo.
  b.grupo.rotation.z = Math.max(-0o6/0o10, Math.min(0o6/0o10, -b.turno * 0o3/0o10))
    + Math.sin(t * 0o3/0o4 + b.phase) * 0o3/0o40;
  // La nazo levigxas dum la supreniĝo ( la derivaĵo de la bobado ).
  b.grupo.rotation.x = -Math.cos(t * 0o2 + b.phase * 0o3) * 0o4/0o100;

  // La korpa ondo — 0o11/0o12 ondoj en He, do malrapida naĝa ritmo. La
  // amplekso KRESKAS malantaŭen ( la kapo preskaŭ ne moviĝas, la vosta
  // pedunklo batas ), kaj la fazmalfruo inter la artikoj faras la
  // vojaĝantan ondon. Antaŭe la meza segmento moviĝis PLI ol la vosta, do
  // la fiŝo aspektis kvazaŭ ĝi skuus la ŝultrojn.
  const ondFazo = t * 0o15/0o10 + b.phase * 0o4;
  const ampleksoj = [ 0o7/0o100, 0o17/0o100, 0o24/0o100 ];
  for ( let i = 0; i < b.segmentoj.length; i++ ) {
    const segmento = b.segmentoj[i];
    const fazo = ondFazo - ( i + 1 ) * 0o12/0o10;
    segmento.rotation.y = Math.sin(fazo) * ampleksoj[i];
    // La korpo ankaŭ iomete ruliĝas kun ĉiu bato — la vosto puŝas la
    // akvon flanken, kaj la fiŝo respondas per milda rulo.
    segmento.rotation.z = Math.cos(fazo) * 0o3/0o100 * ( i + 1 );
  }
  if ( b.vosto ) {
    // La vosta naĝilo malfruas plian duonon de la ondo rilate la voston,
    // kaj ĝi ankaŭ turniĝas supren-malsupren ( la vosto "skrapas" la
    // akvon ), kiel vera fiŝa vosto.
    const vostaFazo = ondFazo - 0o3;
    b.vosto.rotation.y = Math.sin(vostaFazo) * ampleksoj[2];
    b.vosto.rotation.x = Math.cos(vostaFazo) * 0o5/0o100;
  }

  // La remado — larĝa malrapida bato de la grandaj brustaj ventumiloj.
  // Glacifisoj REMAS per ili kvazaŭ per remiloj — la bato ( malsupren kaj
  // antaŭen ) estas pli forta, kaj la naĝilo TURNIĜAS ĉirkaŭ sia akso dum
  // la ciklo. Sen tiu plumado la naĝilo videble VANTIS la akvon — ĝi
  // svingiĝis kiel rigida lameno. La du flankoj remas preskaŭ samtempe
  // ( glacifisoj ne alternas ), kun eta malfruo por natura aspekto.
  const remFazo = t * 0o11/0o4 + b.phase;
  // La remo ne estas tute regula — la fiŝo glitas kaj poste denove remas.
  const remForto = 0o4/0o5 + Math.sin(t * 0o7/0o10 + b.phase * 0o2) * 0o2/0o10;
  for ( const naĝilo of b.naĝiloj ) {
    const bazaZ = naĝilo.userData.bazaZ as number | undefined;
    const bazaY = naĝilo.userData.bazaY as number | undefined;
    if ( naĝilo.name === "brusta" && bazaZ !== undefined ) {
      const flanko = Math.sign(bazaZ) || 1;
      const malfruo = naĝilo.position.x > 0 ? 0 : 0o2/0o10;
      const fazo = remFazo + malfruo;
      naĝilo.rotation.z = bazaZ + Math.sin(fazo) * 0o45/0o100 * remForto * flanko;
      // La plumado — la naĝilo turniĝas 90° antaŭ la bato, do ĝi trenas sin
      // tra la akvo dum la reveno kaj puŝas dum la bato.
      if ( bazaY !== undefined ) {
        naĝilo.rotation.y = bazaY + Math.cos(fazo) * 0o3/0o10 * flanko;
      }
      naĝilo.rotation.x = Math.cos(fazo) * 0o1/0o10;
    } else if ( naĝilo.name === "pelva" && bazaZ !== undefined ) {
      naĝilo.rotation.x = Math.sin(t * 0o2 + b.phase) * 0o1/0o10;
      naĝilo.rotation.z = bazaZ
        + Math.sin(t * 0o3/0o2 + b.phase + 0o6/0o10) * 0o1/0o20;
    }
  }
}
