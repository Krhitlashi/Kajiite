// ≺⧼ Sxeloj 🐚 ⧽≻
// La komuna ŝela ilo de la purpuraj laktukaj plantoj — la rigidaj ŝelaj tasoj
// ( konstruiSxelanRingon ), la ŝela materialo ( kreiSxelanRinganMaterialon ), la
// rondigita trunkopinto ( trunkopintaProfilon ) kaj la kurba laktuka folio
// ( konstruiKurbanLaktukanFolion ). La Ĥŝakŝlefo ( hxsxaksxlefo.ts ) kaj la
// Pussxlefo ( pussxlefo.ts ) konstruiĝas el ĉi tiuj samaj partoj, do ili vivas
// en sia propra dosiero anstataŭ duoble.
import * as THREE from "three";
import { kreiPurpuranSxelanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-sxelo.js";
import { kreiPurpuranSxelanBumpanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-sxelo-bumpo.js";
import { kunfandiDuGeometriojn } from "../../komunajxoj/kunfandajxoj.js";

// konstruiSxelanRingon — La rigidaj ŝelaj tasoj de la purpuraj laktukaj
// plantoj ( Ĥŝakŝlefo kaj Pussxlefo ) — simetriaj TASOJ malfermitaj supren:
// mallarĝaj ĉe la malsupro, kie ili brakumas la trunkon, kaj kurbiĝantaj
// eksteren kaj SUPren ( trumpeto-formo ), kies supra rando disiĝas en kvar
// foliformajn lobojn ĉe la kvar flankoj de la folioj.
//
// ⟨ Kie la folioj eliras 📃 ⟩ — la foliaj bazoj sidas INTERNE de la taso
// ( la taso estas metita tiel, ke ĝia mallarĝa malsupro estas sub ili ), do la
// folioj leviĝas el la interno de la taso kaj etendiĝas eksteren super ĝia
// rando. La taso do NE pendas malsupren — ĝi malfermiĝas al la ĉielo.
export function konstruiSxelanRingon(): THREE.BufferGeometry {
  const geometrio = new THREE.CylinderGeometry(0o16/0o40, 0o13/0o40, 1, 0o32, 0o6, true).translate(0, 0o1/0o2, 0);
  const pozicioj = geometrio.attributes.position;
  for ( let i = 0; i < pozicioj.count; i++ ) {
    const x = pozicioj.getX(i);
    const y = pozicioj.getY(i);
    const z = pozicioj.getZ(i);
    // La kvar foliaj loboj — unu je ĉiu folia flanko.
    const ang = Math.atan2(x, z);
    const lobo = Math.pow(( Math.cos(4 * ang) + 1 ) / 2, 2);
    // ⟨ La folia bazo 📃 ⟩ — antaŭe la TASO estis cilindro: ĝia malsupra rando
    // estis rekta cirklo ĉirkaŭ la trunko, do la kunmeto de trunko kaj taso
    // aspektis kiel glaso ŝovita sur bastonon. Nun la malsupra rando MEM estas
    // foliforma: ĉe ĉiu folio ĝi MALLEVIĜAS en pintan lobon, kiu brakumas la
    // trunkon ( la bazo de folio, ne la rando de ujo ), kaj la efiko malaperas
    // supren, kie la kolumo malfermiĝas kiel korneto. La supra rando retenas
    // siajn kvar levitajn lobojn.
    const baza = Math.pow(1 - y, 3);
    // La rando kurbiĝas eksteren SUPren — ju pli alta la punkto, des pli
    // larĝa la radiuso ( kaj des pli la rando malfermiĝas kiel korneto ).
    const faktoro = 1 + 0o1/0o10 * y * y + 0o1/0o20 * baza;
    const novaY = y + 2/5 * lobo * y - 0o45/0o100 * lobo * baza;
    pozicioj.setXYZ(i, x * faktoro, novaY, z * faktoro);
  }
  geometrio.computeVertexNormals();
  return geometrio;
}

// kreiSxelanRinganMaterialon — La ŝela materialo por la trunko aŭ por la
// kolumaj tasoj.
//
// ⟨ La ripeto de la taso 📃 ⟩ — la trunko kaj la taso uzas la SAMAN bildon sed
// en tre malsamaj proporcioj: la trunko estas ~1.5 unuojn ĉirkaŭe kaj 8–19
// unuojn alta, la taso ~2 unuojn ĉirkaŭe kaj nur 0.75 unuojn alta. Kun la sama
// ripeto la taso montris nur ~6% de la bilda alto, do ĝiaj ringoj smiriĝis en
// unu senforman bendon. La tasoj ricevas PROPRAN teksturo-klonon kun vertikala
// ripeto de 0o1/0o20 ( 5% ): la sama rastrumera denseco kiel la trunko, kaj ĉar
// la bildo estas malhela ĉe sia malsupro, la taso restas malhela ĉe sia bazo
// kaj heliĝas al sia rando — la intencita aspekto. La klonoj kunhavigas la
// bildon, do ili kostas preskaŭ nenion en memoro.
// ⟨ Kiom ripeti 📃 ⟩ — la teksajxo estas desegnita por MEZA Ĥŝakŝlefa trunko:
// ~13 unuoj alta kun ~20 folio-cikatriĉaj ringoj. Ĉiu alia surfaco ricevas
// propran vertikalan ripeton, por ke la ringoj havu la saman GRANDON en la mondo
// ( la sama rastrumera denseco ) anstataŭ la saman nombron:
//   Ĥŝakŝlefa trunko ( 8–19 unuoj )  → 1      ( la tuta bildo )
//   Ĥŝakŝlefa kolumo ( 0.75 unuoj )  → 0.05   ( ~1 ringo sur la kolumo )
//   Pussxlefa trunko ( ~0.6 unuoj )  → 0.05
//   Pussxlefa kolumo ( ~0.12 unuoj ) → 0.015
// Sen ĉi tio la etaj Pussxlefoj portis ĉiujn ringojn sur duon-unuan trunkon —
// pura sub-piksela bruo. La propraj teksturoj kunhavigas la bildon, do la
// klonoj kostas preskaŭ nenion en memoro.
//     @param ripetoY ( number ) - La vertikala ripeto ( 1 = la tuta bildo ).
//     @param taso ( boolean ) - Ĉu ĉi tiu materialo estas por koluma taso.
//     @param offsetY ( number = 0 ) - Kie en la bildo la legata bando komenciĝas.
//              ⟨ La koluma bando 📃 ⟩ — la kolumaj tasoj legas la bandon, kiu
//              FINIĝAS ĉe la pinta rando de la bildo ( offset.y = 1 − ripeto ),
//              ĉar ili sidas alte sur la trunko. Tiu bando ( vidu
//              desegniLaSxelanKolumon en teksajxoj.ts ) estas la plej hela ŝelo
//              de la trunko PLUS la vico da altaj foli-formaj skvamoj. Antaŭe la
//              tasoj legis la plej malhelan malsupron de la bildo ( offset 0 ),
//              do ĉiu kolumo estis preskaŭ nigra dum la trunko estis mez-purpura.
//     @returns materialo ( THREE.MeshStandardMaterial ) - La preta materialo.
export function kreiSxelanRinganMaterialon(ripetoY: number, taso: boolean,
  offsetY = 0): THREE.MeshStandardMaterial {
  const mapo = kreiPurpuranSxelanTeksajxon();
  const reliefo = kreiPurpuranSxelanBumpanTeksajxon();
  // La klonoj estas kreitaj nur kiam la ripeto devias de 1 — tiam la origina
  // teksturo restas senŝanĝa por la aliaj uzoj.
  const uzi = ( t: THREE.Texture ): THREE.Texture => {
    if ( ripetoY === 1 ) return t;
    const klono = t.clone() as THREE.Texture;
    klono.repeat.set(1, ripetoY);
    klono.offset.set(0, offsetY);
    klono.needsUpdate = true;
    return klono;
  };
  // ⟨ La reliefo mallevigxis 📃 ⟩ — la reliefa teksajxo de la ŝelo portas cikatrojn
  // kaj fibrojn kun forta kontrasto, kaj sur la maldika trunko ( radiuso ~0.2 unuoj )
  // granda bumpScale faras la surfacon KRISPA — ĉiu ringo kaj ĉiu fibro legigxas
  // kiel gravurita sulko. Nun la reliefo estas kvaroble pli mola, do la trunko
  // legigxas glata kaj la cikatroj restas nur kiel mola ombro sur la surfaco.
  // ⟨ La ringoj malpliiĝis 📃 ⟩ — la skizo portas nun duonon da cikatroj kaj da
  // fibroj, do ankaŭ la reliefo malleviĝis ( 0o1/0o50 anstataŭ 0o1/0o40 ): la
  // ŝelo montras la ringojn kiel molan ombron, ne kiel gravuritan sulkon.
  return new THREE.MeshStandardMaterial({
    map: uzi(mapo), bumpMap: uzi(reliefo), bumpScale: 0o1/0o50, color: 0xffffff,
    roughness: taso ? 0o63/0o100 : 0o53/0o100,
    side: taso ? THREE.DoubleSide : THREE.FrontSide,
  });
}

// ⟨ La trunkopinto 📃 ⟩ — La purpuraj ŝlefoj finiĝis per PLATA TRANĈA DISKO:
// la trunka cilindro havas supran kovrilon, kaj ĉar la pinta krono malfermiĝas
// supren, tiu kovrilo restis videbla en la mezo de la krono — de supre la
// planto finiĝis per hela plata poligono, kaj de flanke per rekta ŝtupo. Ĉi tiu
// profilo mallarĝigas la lastan parton de la trunko ĝis nulo, do la pinto estas
// rondigita konuseto ( kreskanta burĝono ), kaj la supra kovrilo kolapsas en
// punkton kaj tute malaperas. La sama profilo ankaŭ regas la radiuson, kiun la
// folioj kaj la ŝelaj tasoj uzas por sidiĝi sur la trunko — do ĉio kongruas.
//     @param t ( number ) - La frakcio de la trunka alto ( 0 malsupre, 1 supre ).
//     @returns faktoro ( number ) - La multiplikilo de la trunka radiuso.
const TRUNKOPINTA_KOMENCO = 0.88;
export function trunkopintaProfilon(t: number): number {
  if ( t <= TRUNKOPINTA_KOMENCO ) return 1;
  const u = Math.min(1, ( t - TRUNKOPINTA_KOMENCO ) / ( 1 - TRUNKOPINTA_KOMENCO ));
  return Math.sqrt(Math.max(0, 1 - u * u));
}

// konstruiKurbanLaktukanFolion — Konstruu kurbiĝintan laktukan folion.
// La folio etendiĝas de la bazo ( tigo ) kaj kurbiĝas malantaŭen al la pinto,
// kun larĝa, plena klingo ( kiel laktuko aŭ brasiko ) kaj glataj randoj.
// La bazo estas ĉe y=0. La kurbeco estas integrita laŭ la longeco
// vico post vico, do la arka longeco restas egala al la origina longeco —
// neniu streĉo ĉe la pinto.
//     @param kurbeco ( number ) - Kiom la folio kurbiĝas al la pinto.
//     @param largxeco ( number ) - La largxa faktoro de la klingo.
//     @param dikeco ( number ) - La reala tri-dimensia diko de la klingo.
//     @returns geometrio ( THREE.BufferGeometry ) - La kurba folio.
export function konstruiKurbanLaktukanFolion(kurbeco = 2, largxeco = 6/5, dikeco = 0o3/0o40): THREE.BufferGeometry {
  // Pli longa klingo — la folioj branĉiĝas pli eksteren.
  const longo = 0o5/0o2;
  const segmentoj = 0o14;
  const largxoj = 7;
  const geometrio = new THREE.PlaneGeometry(largxeco, longo, largxoj, segmentoj);
  const pozicioj = geometrio.attributes.position;
  const vicoj = segmentoj + 1;
  const paso = longo / segmentoj;
  // Integrita kurbeco — ĉiu vico faldiĝas je la kreskanta angulo. Akumulu
  // la tangentajn ( cos, sin ) paŝojn anstataŭ turni la tutan longon.
  const vicoY = new Float32Array(vicoj);
  const vicoZ = new Float32Array(vicoj);
  const suboj = 0o10;
  for ( let j = 1; j < vicoj; j++ ) {
    const s0 = ( j - 1 ) * paso;
    const s1 = j * paso;
    let dy = 0, dz = 0;
    for ( let k = 1; k <= suboj; k++ ) {
      const u = s0 + ( s1 - s0 ) * ( k - 0o1/0o2 ) / suboj;
      const angulo = Math.pow(u / longo, 2) * kurbeco;
      dy += Math.cos(angulo) * paso / suboj;
      dz += Math.sin(angulo) * paso / suboj;
    }
    vicoY[j] = vicoY[j - 1] + dy;
    vicoZ[j] = vicoZ[j - 1] + dz;
  }
  for ( let i = 0; i < pozicioj.count; i++ ) {
    const x = pozicioj.getX(i);
    const y = pozicioj.getY(i);
    const j = Math.round(( ( y + longo / 2 ) / longo ) * segmentoj);
    const t = j / segmentoj;
    // La profilo estas glata elipso — mallarĝa ĉe la bazo kaj pinto, plej
    // larĝa meze — do la flankoj ne pikas. Eta baza amplekso tenas la folion
    // sur la trunko, kiel etendo de la ŝeloj.
    const profilo = Math.sin(Math.PI * t) + 0o1/0o10 * Math.pow(1 - t, 4);
    const novaX = x * profilo;
    pozicioj.setXYZ(i, novaX, vicoY[j], vicoZ[j]);
  }
    geometrio.computeVertexNormals();
    // Du tavoloj laŭ la normaloj donas la folion realan dikon — la rando
    // montras la interspacon, do la klingo aspektas dika kaj karna.
    const dorso = geometrio.clone();
    const normoj = geometrio.attributes.normal;
    const dorsoNormoj = dorso.attributes.normal;
    const frontoPozicioj = geometrio.attributes.position;
    const dorsoPozicioj = dorso.attributes.position;
    for ( let i = 0; i < frontoPozicioj.count; i++ ) {
      const nx = normoj.getX(i) * dikeco / 2;
      const ny = normoj.getY(i) * dikeco / 2;
      const nz = normoj.getZ(i) * dikeco / 2;
      frontoPozicioj.setXYZ(i, frontoPozicioj.getX(i) + nx, frontoPozicioj.getY(i) + ny, frontoPozicioj.getZ(i) + nz);
      dorsoPozicioj.setXYZ(i, dorsoPozicioj.getX(i) - nx, dorsoPozicioj.getY(i) - ny, dorsoPozicioj.getZ(i) - nz);
      // La dorsa tavolo rigardas malsupren — turnu ĝiajn normojn, por ke
      // la suba flanko lumiĝu ĝuste ankaŭ sen DoubleSide.
      dorsoNormoj.setXYZ(i, -normoj.getX(i), -normoj.getY(i), -normoj.getZ(i));
    }
    return kunfandiDuGeometriojn(geometrio, dorso);
  }
