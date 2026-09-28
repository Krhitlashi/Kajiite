// ≺⧼ Petrela malneto 🕊️ ⧽≻
// La neĝopetrela ( ſᶘᴜ ſȷᴜ ſɭэ ſɭɔ / Pagodroma nivea ) modelo — la korpo, la
// kapo, la tubo-naza hokbeko, la flugiloj kaj la kojna vosto. La konstruilo
// staras aparte de la besta modulo ( bestoj.ts ), ĉar la birdo estas la sola
// specio kun vera flugila modelo, kaj la besta modulo restu legebla.
//
// ⟨ Kial la korpo estas LOFT 📃 ⟩ — vera marbirda korpo NE estas lathe-korpo.
// Lathe estas ronda ĉirkaŭ vertikala akso, do ĝi ne povas porti kurbiĝantan
// spinon: la kapo de la antaŭa modelo sidis kiel aparta pilko sur la korpo kaj
// la kolo estis izolita cilindro. La korpo nun estas serio da elipsaj ringoj
// laŭ GLATA spino de la vosta bazo ĝis la bekbazo — la brusto antaŭe, la
// mallarĝiĝanta kolo kaj la kapo supre — do la kapo vere kreskas el la kolo.
//
// ⟨ Kial ankaŭ la flugiloj estas LOFT 📃 ⟩ — la antaŭa flugilo estis DU
// eltranĉitaj platoj ( la brako kaj la mano ) kiuj INTERKOVRIS ĉe la kubuto,
// do la flugilo montris ŝtupon, fendon kaj duoblan surfacon ĝuste tie, kie la
// plej multaj okuloj rigardas. Nun la flugilo estas glata lofto de maldikaj
// lensaj sekcoj laŭ la enverguro, kaj la brako kaj la mano KUNHAVAS sian
// kubutan sekcon — la surfaco daŭras senkude trans la artikon.
//
// La birdo rigardas +z, la flugiloj etendiĝas laŭ ±x kaj la vosto etendiĝas
// malantaŭen ( -z ). Ĉiu mezuro estas en la sama spaco kiel la animacio
// ( vidu gxisdatigiPetrelojn en bestoj.ts ), kiu turnas la grupojn „flugilo“,
// „mano“ kaj „vosto“.
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { kreiLoftanGeometrion } from "../komunajxoj/formoj.js";
// La krada interpolo — la komuna kurbo de la ludo ( kantaoj/interpolo.ts ).
import { katmullRom } from "../../kantaoj/interpolo.js";
import { petrelajTeksajxoj } from "../komunajxoj/teksajxoj/petrela-plumaro.js";

// PetrelaStacio — unu sekco de la birda korpo. z kaj y estas la centro de la
// ringo ( la spino ) kaj r ĝia radiuso.
interface PetrelaStacio { z: number; y: number; r: number; }

// PETRELA_SPINO — la korpa profilo de la vosta bazo ĝis la bekbazo. La plej
// larĝa punkto sidas ĉe la ventro malantaŭ la mezo, la kolo mallarĝiĝas kaj la
// kapo ree ŝvelas — la kapo de marbirdo sidas ALTE, ne sur la korpa akso, kaj
// tiel la beko kaj la okuloj havas sian propran lokon super la brusto.
const PETRELA_SPINO: PetrelaStacio[] = [
  { z: -0o50/0o200, y:  0o2/0o200,  r: 0o3/0o200 },    // la vosta bazo
  { z: -0o40/0o200, y:  0o1/0o200,  r: 0o10/0o200 },   // la posta korpo
  { z: -0o20/0o200, y: -0o1/0o200,  r: 0o16/0o200 },   // la ventro ( larĝa )
  { z:  0,          y:  0,          r: 0o20/0o200 },   // la plej larĝa punkto
  { z:  0o14/0o200, y:  0o1/0o100,  r: 0o17/0o200 },   // la brusto
  { z:  0o25/0o200, y:  0o7/0o200,  r: 0o12/0o200 },   // la kola bazo
  { z:  0o32/0o200, y:  0o13/0o200, r: 0o6/0o200 },    // la kolo ( mallarĝa )
  { z:  0o40/0o200, y:  0o16/0o200, r: 0o10/0o200 },   // la kapo
  { z:  0o46/0o200, y:  0o17/0o200, r: 0o7/0o200 },    // la kapo antaŭe
  { z:  0o54/0o200, y:  0o17/0o200, r: 0o4/0o200 },    // la bekbazo
  { z:  0o60/0o200, y:  0o16/0o200, r: 0o2/0o200 },    // la frunto ĉe la beko
];

// La korpa larĝo rilate al la alto — la birda korpo estas profunda, ne larĝa.
const PETRELA_LARGHO = 0o16/0o20;

// spinoEn — La spino ( y kaj r ) je iu ajn z. La okuloj kaj la piedoj bezonas
// SIDI sur la korpa surfaco — antaŭe ili estis metitaj per permanaj nombroj kaj
// finiĝis ene de la kapo aŭ tute ekster ĝi.
//     @param z ( number ) - La pozicio laŭ la korpo.
//     @returns { y, r } - La spina alto kaj la ringa radiuso tie.
function spinoEn(z: number): { y: number; r: number } {
  const n = PETRELA_SPINO.length;
  if ( z <= PETRELA_SPINO[0].z ) return { y: PETRELA_SPINO[0].y, r: PETRELA_SPINO[0].r };
  if ( z >= PETRELA_SPINO[n - 1].z ) {
    return { y: PETRELA_SPINO[n - 1].y, r: PETRELA_SPINO[n - 1].r };
  }
  for ( let i = 0; i < n - 1; i++ ) {
    const a = PETRELA_SPINO[i], b = PETRELA_SPINO[i + 1];
    if ( z >= a.z && z <= b.z ) {
      const t = ( z - a.z ) / ( b.z - a.z );
      return { y: a.y + ( b.y - a.y ) * t, r: a.r + ( b.r - a.r ) * t };
    }
  }
  return { y: 0, r: 0 };
}

// surfacxaPunkto — Punkto SUR la korpa surfaco, je z kaj je la ringa angulo
// ( 0 = la flanko, π/2 = la dorso ).
//     @param s ( number ) - La flanko ( ±1 ).
//     @param z ( number ) - La pozicio laŭ la korpo.
//     @param angulo ( number ) - La ringa angulo de la punkto.
//     @returns La punkto sur la surfaco.
function surfacxaPunkto(s: number, z: number, angulo: number): THREE.Vector3 {
  const spino = spinoEn(z);
  return new THREE.Vector3(s * Math.cos(angulo) * spino.r * PETRELA_LARGHO,
    spino.y + Math.sin(angulo) * spino.r, z);
}

// vPorZ — La tekstura v ( laŭ la spino ) de iu z. La korpa teksajxo uzas v = 0
// ĉe la vosta bazo kaj v = 1 ĉe la bekbazo, do la lora makulo povas esti
// PENTRITA ĝuste antaŭ la okuloj anstataŭ esti aparta malluma globo ( la
// antaŭa globo trapasis la tutan kapon kaj aspektis kiel nigra kapuĉo ).
//     @param z ( number ) - La pozicio laŭ la korpo.
//     @returns La tekstura v.
export function vPorZ(z: number): number {
  const n = PETRELA_SPINO.length;
  const limigita = Math.min(PETRELA_SPINO[n - 1].z, Math.max(PETRELA_SPINO[0].z, z));
  for ( let i = 0; i < n - 1; i++ ) {
    const a = PETRELA_SPINO[i], b = PETRELA_SPINO[i + 1];
    if ( limigita >= a.z && limigita <= b.z ) {
      const t = ( limigita - a.z ) / ( b.z - a.z );
      return ( i + t ) / ( n - 1 );
    }
  }
  return 1;
}

// kreiLofton — La korpo kiel glata tubo el elipsaj ringoj. La stacioj densiĝas
// per Katmull-Rom ( la sama kurbo por z, y kaj r ), kaj ĉiu ringo estas elipsa —
// pli mallarĝa ol alta ( la birda korpo estas profunda, ne larĝa ), kun iomete
// pli plena ventro.
//     @param stacioj ( PetrelaStacio[] ) - La korpa profilo.
//     @param subdividoj ( number ) - Kiom da ringoj po stacio-intervalo.
//     @param anguloj ( number ) - Kiom da verticoj ĉirkaŭ la ringo.
//     @param largho ( number ) - La larĝo de la ringo rilate al la alto.
//     @returns La geometrio de la korpo ( glata, UV-ita por la plumaro ).
function kreiLofton(stacioj: PetrelaStacio[], subdividoj: number,
  anguloj: number, largho: number): THREE.BufferGeometry {
  const n = stacioj.length;
  const je = ( i: number ) => stacioj[Math.max(0, Math.min(n - 1, i))];
  const valoro = ( i: number, t: number, preni: ( s: PetrelaStacio ) => number ): number =>
    katmullRom(preni(je(i - 1)), preni(je(i)), preni(je(i + 1)), preni(je(i + 2)), t);
  const densaj: PetrelaStacio[] = [];
  for ( let i = 0; i < n - 1; i++ ) {
    for ( let k = 0; k < subdividoj; k++ ) {
      const t = k / subdividoj;
      densaj.push({
        z: valoro(i, t, s => s.z),
        y: valoro(i, t, s => s.y),
        r: valoro(i, t, s => s.r),
      });
    }
  }
  densaj.push(je(n - 1));
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  const ringo = anguloj + 1;   // la lasta vertico duobliĝas por la UV-kudro
  for ( let i = 0; i < densaj.length; i++ ) {
    const stacio = densaj[i];
    for ( let j = 0; j <= anguloj; j++ ) {
      const angulo = j / anguloj * Math.PI * 2;
      const cos = Math.cos(angulo), sin = Math.sin(angulo);
      // La ventro estas iomete pli plena ol la dorso — la birdo kuŝas sur sia
      // brusto, do la malsupra duono de la ringo etendiĝas pli.
      const vertikala = sin < 0 ? stacio.r * 0o11/0o10 : stacio.r;
      pozicioj.push(cos * stacio.r * largho, stacio.y + sin * vertikala, stacio.z);
      uvoj.push(j / anguloj, i / ( densaj.length - 1 ));
    }
  }
  for ( let i = 0; i < densaj.length - 1; i++ ) {
    for ( let j = 0; j < anguloj; j++ ) {
      const a = i * ringo + j, b = a + 1;
      const c = a + ringo, d = b + ringo;
      // La stacioj iras laŭ +z kaj la ringoj turniĝas maldekstrume ĉirkaŭ +z, do
      // tiu ordo turnas ĉiun facon EKSTEREN — la korpo ne bezonas DoubleSide.
      indeksoj.push(a, b, d, a, d, c);
    }
  }
  return kreiLoftanGeometrion(pozicioj, uvoj, indeksoj);
}

// PetrelaRipo — unu sekco de la flugilo. x estas la enverguro ( 0 = la ŝultro ),
// y la alto de la sekco ( la flugilpinto leviĝas super la ŝultro ), antauxo kaj
// malantauxo la z de la antaŭa kaj de la malantaŭa randoj, kaj dikeco la
// dikeco de la sekco ( la flugilo mallarĝiĝas al la pinto ).
interface PetrelaRipo {
  x: number; y: number; antauxo: number; malantauxo: number; dikeco: number;
}

// FLUGILAJ_RIPOJ — la sekcoj de la flugilo de la radiko ĝis la pinto. La antaŭa
// rando preskaŭ rektas ĝis la kubuto kaj poste malantaŭen kurbiĝas al la pinto;
// la kordo mallarĝiĝas de 0.234 ( la radiko ) al 0.016 ( la pinto ) kaj la pinto
// leviĝas iomete super la ŝultro ( la malalta dihedro de glitanta petrelo — la
// animacio aldonas la reston per la rotacio de la grupo „flugilo“ ).
const FLUGILAJ_RIPOJ: PetrelaRipo[] = [
  { x: -0o6/0o100,  y: 0,           antauxo:  0o6/0o200,  malantauxo: -0o30/0o200, dikeco: 0o22/0o2000 },
  { x:  0o5/0o100,  y: 0o1/0o200,   antauxo:  0o6/0o200,  malantauxo: -0o31/0o200, dikeco: 0o22/0o2000 },
  { x:  0o15/0o100, y: 0o2/0o200,   antauxo:  0o5/0o200,  malantauxo: -0o31/0o200, dikeco: 0o20/0o2000 },
  { x:  0o24/0o100, y: 0o2/0o200,   antauxo:  0o4/0o200,  malantauxo: -0o30/0o200, dikeco: 0o17/0o2000 },
  { x:  0o33/0o100, y: 0o3/0o200,   antauxo:  0o2/0o200,  malantauxo: -0o27/0o200, dikeco: 0o15/0o2000 },
  { x:  0o43/0o100, y: 0o3/0o200,   antauxo: -0o1/0o200,  malantauxo: -0o26/0o200, dikeco: 0o13/0o2000 },
  { x:  0o52/0o100, y: 0o4/0o200,   antauxo: -0o4/0o200,  malantauxo: -0o25/0o200, dikeco: 0o11/0o2000 },
  { x:  0o61/0o100, y: 0o5/0o200,   antauxo: -0o6/0o200,  malantauxo: -0o24/0o200, dikeco: 0o10/0o2000 },
  { x:  0o66/0o100, y: 0o5/0o200,   antauxo: -0o11/0o200, malantauxo: -0o22/0o200, dikeco: 0o6/0o2000 },
  { x:  0o70/0o100, y: 0o6/0o200,   antauxo: -0o13/0o200, malantauxo: -0o20/0o200, dikeco: 0o4/0o2000 },
  { x:  0o72/0o100, y: 0o6/0o200,   antauxo: -0o15/0o200, malantauxo: -0o17/0o200, dikeco: 0o2/0o2000 },
];

// La kubuta sekco — la sekco, kie la brako kaj la mano kuniĝas. La du partoj
// KUNHAVAS ĝin, do la flugila surfaco ne havas ŝtupon ĉe la artiko.
const KUBUTA_INDESKO = 0o4;
const KUBUTA_X = FLUGILAJ_RIPOJ[KUBUTA_INDESKO].x;

// kreiFlugilon — La flugilo kiel GLATA LOFTO de maldikaj lensaj sekcoj, same
// kiel la korpo. Ĉiu sekco estas elipso en la ( z, y )-ebeno: la z iras de la
// malantaŭa al la antaŭa rando, la y de la malsupra al la supra surfaco. La
// UV: la u laŭ la enverguro ( tra la tuta flugilo, do la brako kaj la mano
// povas kunhavigi unu teksajxon ) kaj la v laŭ la kordo ( 1 = la antaŭa rando ).
//     @param ripoj ( PetrelaRipo[] ) - La sekcoj de la segmento.
//     @param uDe ( number ) - La u ĉe la unua sekco.
//     @param uAl ( number ) - La u ĉe la lasta sekco.
//     @param subdividoj ( number ) - Kiom da sekcoj po ripa intervalo.
//     @param anguloj ( number ) - Kiom da verticoj ĉirkaŭ ĉiu sekco.
//     @returns La geometrio de la flugila segmento.
function kreiFlugilon(ripoj: PetrelaRipo[], uDe: number, uAl: number,
  subdividoj: number, anguloj: number): THREE.BufferGeometry {
  const n = ripoj.length;
  const je = ( i: number ) => ripoj[Math.max(0, Math.min(n - 1, i))];
  const valoro = ( i: number, t: number, preni: ( r: PetrelaRipo ) => number ): number =>
    katmullRom(preni(je(i - 1)), preni(je(i)), preni(je(i + 1)), preni(je(i + 2)), t);
  const densaj: PetrelaRipo[] = [];
  for ( let i = 0; i < n - 1; i++ ) {
    for ( let k = 0; k < subdividoj; k++ ) {
      const t = k / subdividoj;
      densaj.push({
        x: valoro(i, t, r => r.x), y: valoro(i, t, r => r.y),
        antauxo: valoro(i, t, r => r.antauxo),
        malantauxo: valoro(i, t, r => r.malantauxo),
        dikeco: valoro(i, t, r => r.dikeco),
      });
    }
  }
  densaj.push(je(n - 1));
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  const ringo = anguloj + 1;
  for ( let i = 0; i < densaj.length; i++ ) {
    const ripo = densaj[i];
    const u = uDe + ( uAl - uDe ) * ( i / ( densaj.length - 1 ) );
    for ( let j = 0; j <= anguloj; j++ ) {
      const angulo = j / anguloj * Math.PI * 2;
      const cos = Math.cos(angulo), sin = Math.sin(angulo);
      const kordo = ( 1 + cos ) / 0o2;
      pozicioj.push(ripo.x, ripo.y - sin * ripo.dikeco / 0o2,
        ripo.malantauxo + kordo * ( ripo.antauxo - ripo.malantauxo ));
      uvoj.push(u, kordo);
    }
  }
  for ( let i = 0; i < densaj.length - 1; i++ ) {
    for ( let j = 0; j < anguloj; j++ ) {
      const a = i * ringo + j, b = a + 1;
      const c = a + ringo, d = b + ringo;
      // La sekcoj iras laŭ +x kaj la ringoj turniĝas dekstrume ĉirkaŭ +x, do
      // tiu ordo turnas ĉiun facon EKSTEREN — kiel ĉe la korpo.
      indeksoj.push(a, b, d, a, d, c);
    }
  }
  return kreiLoftanGeometrion(pozicioj, uvoj, indeksoj);
}

// Kunfandajxo — la rezulto por unu materialo: la mesho kiu restos en la grupo
// kaj la fontaj partoj ( kiuj foriĝos se ili estis pli ol unu ).
interface Kunfandajxo { mesho: THREE.Mesh; fontoj: THREE.Mesh[]; }

// kunfandiPoMaterialo — Kunfandu grupon da meshxoj en UN meshon po materialo
// ( la sama skemo kiel vojoj.ts ). La loka transformo de ĉiu parto bakiĝas en
// ĝian geometrion, do la kunfandita mesho bildigas precize la saman aferon —
// nur per malpli da desegnoj. Parto, kiu estas SOLA kun sia materialo, restas
// kiel ĝi estas — tiel ĝia nomo ( „korpo“ ) konserviĝas por la konsolo kaj por
// la kodaj iloj.
//     @param partoj ( Mesh[] ) - La partoj kunfandotaj.
//     @returns La kunfandaĵoj ( po unu materialo ).
function kunfandiPoMaterialo(partoj: THREE.Mesh[]): Kunfandajxo[] {
  const listoj = new Map<THREE.Material, THREE.Mesh[]>();
  for ( const p of partoj ) {
    const materialo = p.material as THREE.Material;
    const listo = listoj.get(materialo);
    if ( listo ) listo.push(p); else listoj.set(materialo, [ p ]);
  }
  const kunfandajxoj: Kunfandajxo[] = [];
  for ( const [ materialo, listo ] of listoj ) {
    if ( listo.length === 1 ) {
      kunfandajxoj.push({ mesho: listo[0], fontoj: listo });
      continue;
    }
    const geometrioj = listo.map(p => {
      p.updateMatrix();
      return p.geometry.clone().applyMatrix4(p.matrix);
    });
    const kunigita = mergeGeometries(geometrioj, false);
    for ( const g of geometrioj ) g.dispose();
    if ( kunigita ) kunfandajxoj.push({ mesho: new THREE.Mesh(kunigita, materialo), fontoj: listo });
  }
  return kunfandajxoj;
}

// konstruiPetrelanModelon — Unu neĝopetrelo, konstruita kiel vera marbirdo.
//
// ⟨ La mezuroj 📃 ⟩ — la korpo longas 0.69 ( de la vosta bazo ĝis la frunto ),
// la beko aldonas 0.09, la vosto 0.20 kaj la flugiloj etendiĝas al ±0.93, do la
// enverguro estas 1.86 — 2.7 fojojn la korpa longo, kiel ĉe vera neĝopetrelo.
//
// La senmovaj partoj ( la korpo, la beko, la naztubo, la okuloj, la piedoj )
// kunfandiĝas en unu meshon po materialo — la flugiloj ( 2 grupoj kun la brako
// kaj la mano ) kaj la vosto restas apartaj, ĉar la animacio turnas ilin.
//     @returns La petrela malneto ( la birdo rigardas +z ).
export function konstruiPetrelanModelon(): THREE.Group {
  const grupo = new THREE.Group();
  const teksajxoj = petrelajTeksajxoj(vPorZ);
  const blanka = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: teksajxoj.korpo, bumpMap: teksajxoj.korpoBump,
    bumpScale: 0o1/0o200, roughness: 0o3/0o4, metalness: 0,
  });
  // ⟨ La flugila materialo 📃 ⟩ — UNU materialo por la brako kaj la mano: la
  // nigra pinto venas el la teksajxo ( la u ), ne el aparta materialo. Tiel la
  // transiro de la blanko al la nigro povas esti mola kaj oblikva, kiel ĉe la
  // vera birdo, anstataŭ perfekte rekta rando ĉe la kubuto. La flugilo estas
  // maldika kaj videbla de ambaŭ flankoj, do ĝi restas DoubleSide.
  const flugilaMaterialo = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: teksajxoj.flugilo, bumpMap: teksajxoj.flugiloBump,
    bumpScale: 0o1/0o200, roughness: 0o3/0o4, metalness: 0,
    side: THREE.DoubleSide,
  });
  const nigra = new THREE.MeshStandardMaterial({
    color: 0x101018, roughness: 0o1/0o4, metalness: 0,
  });

  // ⟨ La korpo 📃 ⟩ — la lofto.
  const korpo = new THREE.Mesh(kreiLofton(PETRELA_SPINO, 0o4, 0o20, PETRELA_LARGHO), blanka);
  korpo.name = "korpo";
  grupo.add(korpo);

  // ⟨ La beko 📃 ⟩ — tubo-naza hokbeko. La supra bordo malsupreniĝas al la
  // pinto ( la hoko ) kaj la naztubo de la petreloj sidas supre — la sola
  // familio de marbirdoj kun tuboj sur la beko.
  // ⟨ La beka dikeco 📃 ⟩ — la beko NE povas esti pli dika ol la kapopinto
  // ( r = 0.016 ), alie la tuta kapo aspektas kiel nigra kapuĉo.
  // ⟨ La beka profilo 📃 ⟩ — la beko maldikiĝas UNUFORME de la bekbazo al la
  // hoka pinto. Antaŭe la tria stacio estis pli dika ol la dua ( 0.0156 kontraŭ
  // 0.0117 ), do la beko ŝvelis meze kaj aspektis kiel nigra bulo.
  const bekajStacioj: PetrelaStacio[] = [
    { z: 0o60/0o200, y: 0o16/0o200, r: 0o2/0o200 },    // la bekbazo
    { z: 0o66/0o200, y: 0o16/0o200, r: 0o6/0o1000 },   // la bekmezo
    { z: 0o72/0o200, y: 0o15/0o200, r: 0o5/0o1000 },   // la pinto
    { z: 0o75/0o200, y: 0o13/0o200, r: 0o3/0o1000 },   // la hoka fino ( malsupre )
  ];
  const beko = new THREE.Mesh(kreiLofton(bekajStacioj, 0o3, 0o10, 0o6/0o10), nigra);
  beko.name = "beko";
  grupo.add(beko);
  // La naztubo — la marko de la petreloj. Ĝi kuŝas sur la bekmezo, klinita
  // iomete supren antaŭen.
  const naztubo = new THREE.Mesh(new THREE.CylinderGeometry(
    0o6/0o1000, 0o6/0o1000, 0o4/0o100, 0o6), nigra);
  naztubo.rotation.x = Math.PI / 0o2 - 0o1/0o20;
  naztubo.position.set(0, 0o17/0o200, 0o64/0o200);
  grupo.add(naztubo);

  // ⟨ La okuloj 📃 ⟩ — malhelaj globetoj SUR la korpa surfaco, kalkulitaj per
  // spinoEn kaj surfacxaPunkto. Ili sidas alteriĝe sur la flanko de la kapo,
  // iomete super la mezo, kaj elstaras iomete el la surfaco. La lora makulo
  // antaŭ la okulo estas PENTRITA en la korpa teksajxo ( vidu
  // kreiKorpanTeksajxon ), ne plia globo — la antaŭa lora globo trapasis la
  // tutan kapon kaj aspektis kiel nigra kapuĉo.
  const OKULA_Z = 0o50/0o200, OKULA_ANGULO = 0o7/0o20;
  const okulaRadiuso = 0o5/0o1000;
  for ( const s of [ 0o1, -0o1 ] ) {
    const surfaco = surfacxaPunkto(s, OKULA_Z, OKULA_ANGULO);
    // La okulo eniras la surfacon je DUONO de sia radiuso, do ĝi sidas preskaŭ
    // ebene — videbla, sed ne kiel gluita nigra pilko sur la kapo. ( Antaŭe ĝi
    // elstaris du trionojn kaj sidis tro alte, kvazaŭ sur la krono. )
    const interna = new THREE.Vector3(s * Math.cos(OKULA_ANGULO),
      Math.sin(OKULA_ANGULO), 0).multiplyScalar(okulaRadiuso * 0o1/0o2);
    const okulo = new THREE.Mesh(
      new THREE.SphereGeometry(okulaRadiuso, 0o10, 0o10), nigra);
    okulo.position.copy(surfaco).sub(interna);
    okulo.name = "okulo";
    grupo.add(okulo);
  }    // La piedoj — etaj malhelaj piedetoj, KUNFALDITAJ sub la ventro dum flugo,
    // kie la korpo estas plej profunda ( antaŭe ili sidis malantaŭ la korpo kaj
    // pendis en la aero apud la vosto ).
    for ( const s of [ 0o1, -0o1 ] ) {
      const piedo = new THREE.Mesh(new THREE.SphereGeometry(0o10/0o1000, 0o10, 0o10), nigra);
      piedo.scale.set(0o5/0o10, 0o5/0o10, 0o16/0o10);
      piedo.position.set(s * 0o14/0o1000, -0o10/0o100, -0o34/0o200);
      grupo.add(piedo);
    }

  // ⟨ La vosto 📃 ⟩ — kvin plumoj en kojno. La grupo „vosto“ sidas ĉe la vosta
  // bazo, do la animacio povas turni la tutan direktilon ( la banko kaj la
  // ventumado de la petrelo ). La plumoj kuniĝas en unu geometrion.
  const vostaGrupo = new THREE.Group();
  vostaGrupo.name = "vosto";
  vostaGrupo.position.set(0, 0o2/0o200, -0o50/0o200);
  const vostaj: THREE.BufferGeometry[] = [];
  for ( let k = -0o2; k <= 0o2; k++ ) {
    const longo = 0o15/0o100 - Math.abs(k) * 0o1/0o100;
    const duono = 0o3/0o200;
    const formo = new THREE.Shape();
    formo.moveTo(0, -duono);
    formo.quadraticCurveTo(longo * 0o7/0o10, -duono * 0o11/0o10, longo, 0);
    formo.quadraticCurveTo(longo * 0o7/0o10, duono * 0o11/0o10, 0, duono);
    formo.closePath();
    const plumo = new THREE.ExtrudeGeometry(formo, {
      depth: 0o4/0o1000, bevelEnabled: false, curveSegments: 0o10,
    });
    // La plumo kuŝas plata kaj etendiĝas malantaŭen ( la formo iras laŭ +x, do
    // ĝi turniĝas al -z ) kaj svingiĝas laŭ la kojno.
    plumo.rotateX(Math.PI / 0o2);
    plumo.rotateY(Math.PI / 0o2 + k * 0o13/0o100);
    plumo.translate(0, 0o1/0o200, 0);
    vostaj.push(plumo);
  }
  const vostajKunigitaj = mergeGeometries(vostaj, false);
  for ( const g of vostaj ) g.dispose();
  if ( vostajKunigitaj ) {
    const vostaMesho = new THREE.Mesh(vostajKunigitaj, blanka);
    vostaMesho.name = "vostoplumoj";
    vostaGrupo.add(vostaMesho);
    grupo.add(vostaGrupo);
  }

  // ⟨ La flugiloj 📃 ⟩ — glataj glit-flugiloj. La BRAKO iras de la ŝultro ĝis
  // la kubuto kaj la MANO de la kubuto ĝis la pinto; la du partoj kunhavas la
  // kubutan sekcon. La u de la UV estas unu kontinua skaloj tra ambaŭ partoj
  // ( la brako ricevas la unuan duonon de la flugila teksajxo, la mano la duan ),
  // do la nigra pinto de la teksajxo falas ĝuste sur la manon.
  const brakaGeometrio = kreiFlugilon(
    FLUGILAJ_RIPOJ.slice(0, KUBUTA_INDESKO + 1), 0, 0o52/0o100, 0o3, 0o12);
  // La mano: la SAMA kubuta sekco unue ( do la surfacoj kongruas ), poste la
  // sekcoj al la pinto — ĉiuj ŝovitaj reen al la kubuta grupo-origino.
  const manajRipoj = FLUGILAJ_RIPOJ.slice(KUBUTA_INDESKO)
    .map(r => ({ ...r, x: r.x - KUBUTA_X }));
  const manaGeometrio = kreiFlugilon(manajRipoj, 0o52/0o100, 1, 0o3, 0o12);

  // ⟨ La spegulado 📃 ⟩ — la geomerioj iras laŭ +x ( la radiko ĉe x = -0.094,
  // la pinto ĉe x = 0.906 ), do la flugilo de unu flanko speguliĝas per
  // scale.x = -1. ĈAR la spegulo ankaŭ renversas la RADIKON, la grupo devas
  // sidi je -s × 0.094 — tiel la radiko ( la malfermita fino de la lofto )
  // finiĝas ĝuste ĉe x = 0, en la MEZO de la korpo, kaj la pinto etendiĝas
  // eksteren. Sen tiu signo la radiko elstaris 0.19 ekster la korpo ( la korpa
  // duon-larĝo estas 0.065 ), do la malfermita fino de la flugilo videblis kiel
  // blanka plato super la birda dorso.
  for ( const s of [ 0o1, -0o1 ] ) {
    const flugilaGrupo = new THREE.Group();
    flugilaGrupo.name = "flugilo";
    flugilaGrupo.position.set(-s * 0o6/0o100, 0o11/0o200, 0o15/0o100);
    const spegulo = -s;
    const brako = new THREE.Mesh(brakaGeometrio, flugilaMaterialo);
    brako.name = "brako";
    brako.scale.x = spegulo;
    flugilaGrupo.add(brako);

    // ⟨ La mano 📃 ⟩ — la dua segmento, turniĝanta ĉe la kubuto. La grupo ankaŭ
    // sidas je -s × la kubuta sekco, ĉar la spegulita brako etendiĝas al -x.
    const manoGrupo = new THREE.Group();
    manoGrupo.name = "mano";
    manoGrupo.position.set(-s * KUBUTA_X, 0, 0);
    manoGrupo.scale.x = spegulo;
    const mano = new THREE.Mesh(manaGeometrio, flugilaMaterialo);
    mano.name = "mano";
    manoGrupo.add(mano);
    flugilaGrupo.add(manoGrupo);
    grupo.add(flugilaGrupo);
  }

  // ⟪ Kunfando 📃 ⟫ — la korpo, la beko, la naztubo, la okuloj kaj la piedoj
  // estas senmovaj unu rilate la alian, do ili kunfandiĝas en unu meshon po
  // materialo. La flugilaj grupoj kaj la vosta grupo restas ( la animacio
  // turnas ilin ).
  const statikaj = grupo.children.filter(c => ( c as THREE.Mesh ).isMesh) as THREE.Mesh[];
  for ( const k of kunfandiPoMaterialo(statikaj) ) {
    if ( k.fontoj.length === 1 ) continue;   // ĝi restas surloke ( kun sia nomo )
    for ( const m of k.fontoj ) grupo.remove(m);
    grupo.add(k.mesho);
  }

  return grupo;
}
