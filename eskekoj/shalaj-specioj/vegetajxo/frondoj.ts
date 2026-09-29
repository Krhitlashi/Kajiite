// ≺⧼ Frondoj 🌿 ⧽≻
// La komuna fronda ilo — la KURBA RUBANDO, el kiu ĉiu filiko kaj ĉiu purpura
// planto konstruiĝas. Ĝi vivas en sia propra dosiero, ĉar la valaj filikoj
// ( filikoj.ts ), la purpuraj plantoj ( purpuraj.ts ) kaj la miksaj makuloj de
// la montara subkreskaĵo ĉiuj uzas la samajn geometriojn. La frondo
// ( konstruiFrondanKronon ) estas tri-kolona rubando kun levita mezo-ripo kaj
// tordo laŭ sia longo, la rozetoj ( konstruiFilikanRozeton, konstruiPurpuranRozeton )
// metas ĝin sur la grundon sen trunko, kaj la tavola krono
// ( konstruiTavolanFrondanKronon ) kunigas plurajn tavolojn laŭ la trunko, kun
// la krozoj ĉe la trunka pinto.
import * as THREE from "three";
import { kreiBuferanGeometrion, kunfandiGeometriojnSenIndekson } from "../../komunajxoj/kunfandajxoj.js";
import { PURPURAJ_TRUNKAJ_RADIOJ } from "./kronoj.js";

// konstruiFrondanKronon — La frondoj de unu tavolo. ĈIU FRONDO ESTAS KURBA
// RUBANDO, ne plata ortangulo.
//
// ⟨ Kial 📃 ⟩ — antaŭe ĉiu frondo estis `PlaneGeometry` ( plata kartono )
// klinita per unu rotacio: la frondoj estis ebenaj teleroj elstarantaj el la
// trunko, kaj de la flanko la krono aspektis kiel radio de glavoj. Filika
// frondo estas ARKO: ĝi leviĝas el la trunko, ĝi malfermiĝas eksteren kaj ĝia
// pinto MALLEVIĝAS sub la propra pezo. La rubando nun havas tri kolonojn
// ( levita mezo-ripo — la raĥiso — kaj du flankoj ) kaj ses segmentojn, kaj
// ĝi ankaŭ TORDIĝAS laŭ sia longo, do ĉiu frondo estas vera kurbiĝinta
// surfaco, kiu kaptas la lumon malsame laŭ sia tuta longo.
//     @param nombro ( number ) - Kiom da frondoj en la krono.
//     @param largho ( number ) - La larĝo de frondo ĉe sia bazo.
//     @param alto ( number ) - La longo de la frondo ( laŭ la arko ).
//     @param mallevo ( number ) - La elira klino de la frondoj.
//     @param radiuso ( number ) - La trunka radiuso ĉe ĉi tiu tavolo.
//     @returns geometrio ( THREE.BufferGeometry ) - La krono de la tavolo.
export function konstruiFrondanKronon(nombro: number, largho: number, alto: number, mallevo: number,
  radiuso = 0, kurbiFaktoro = 1): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  const SEGMENTOJ = 0o6;
  for ( let i = 0; i < nombro; i++ ) {
    const frakcio = i / nombro;
    const ang = frakcio * Math.PI * 2;
    // Ĉiu frondo kurbiĝas alie — la krono ne estas rado. Per granda
    // kurbiFaktoro la frondo ruliĝas en sin ( la krozo de filiko ).
    const kurbiĝo = alto * ( 0.30 + ( i % 0o3 ) * 0.09 ) * kurbiFaktoro;
    const tordo = ( ( i % 0o5 ) - 2 ) * 0.10;
    const pozicioj: number[] = [];
    const uvoj: number[] = [];
    const indeksoj: number[] = [];
    for ( let s = 0; s <= SEGMENTOJ; s++ ) {
      const t = s / SEGMENTOJ;
      // La centro de la frondo — ĝi leviĝas, kurbiĝas eksteren ( +z ) kaj la
      // pinto ankaŭ iomete malleviĝas sub la propra pezo.
      const cy = alto * ( t - 0.10 * t * t );
      const cz = kurbiĝo * Math.pow(t, 1.7);
      // La larĝo — plej larĝa ĉe la malsupro, mallarĝiĝanta al la pinto; la
      // pinto tamen ne estas punkto ( la teksturo portas sian propran silueton ).
      const hw = largho * 0o1/0o2 * ( 1 - 0.55 * Math.pow(t, 2.2) );
      // La mezo-ripo — la raĥiso — estas levita super la foliplato.
      const ripo = Math.max(hw * 0.55, largho * 0.10);
      const a = tordo * t;
      const cos = Math.cos(a), sin = Math.sin(a);
      const kolonoj: [ number, number ][] = [ [ -hw, 0 ], [ 0, ripo ], [ hw, 0 ] ];
      for ( let kol = 0; kol < 0o3; kol++ ) {
        const dx = kolonoj[kol][0], dz = kolonoj[kol][1];
        pozicioj.push(dx * cos - dz * sin, cy, cz + dx * sin + dz * cos);
        uvoj.push(kol === 0 ? 0 : ( kol === 1 ? 0o1/0o2 : 1 ), t);
      }
    }
    for ( let s = 0; s < SEGMENTOJ; s++ ) {
      for ( let kol = 0; kol < 0o2; kol++ ) {
        const a = s * 0o3 + kol, b = a + 1, c = a + 0o3, d = a + 0o4;
        indeksoj.push(a, c, b, b, c, d);
      }
    }
    const frondo = kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
    // La frondo eliras el la trunka surfaco: unue la elira klino, poste la
    // turno ĉirkaŭ la trunko, fine la puŝo eksteren laŭ la trunka radiuso.
    frondo.applyMatrix4(new THREE.Matrix4().makeRotationX(mallevo));
    frondo.applyMatrix4(new THREE.Matrix4().makeRotationY(ang));
    // La bazo sidas sur la trunka surfaco — kaj iomete INTERNE, por ke nenia
    // interspaco videblu ĉe la kunmeto.
    frondo.translate(Math.sin(ang) * radiuso * 0.8, 0, Math.cos(ang) * radiuso * 0.8);
    partoj.push(frondo);
  }
  const geometrio = kunfandiGeometriojnSenIndekson(partoj);
  geometrio.computeBoundingBox();
  if ( geometrio.boundingBox ) geometrio.translate(0, -geometrio.boundingBox.min.y, 0);
  return geometrio;
}

// konstruiFilikanRozeton — Filika rozeto SUR LA GRUNDO: frondoj elirantaj el
// komuna bazo, sen trunko. Ĝi estas la sama arka frondo kiel ĉe la arboformaj
// filikoj, do la planto legiĝas kiel filiko el ĉiu angulo kaj NE kiel du
// krucitaj kartoj ( la rektaj randaj ebenoj kaj la X-forma kruco de supre ).
//
// ⟨ Proporcio 📃 ⟩ — filika frondo larĝas ~30% de sia longo, kaj la malfermita
// rozeto ( kun la kurbiĝo de ĉiu frondo kaj la lasta klino ) altiĝas al ~93% de
// la fronda longo. La parametro `alto` estas la ALTO DE LA PLANTO, do la
// fronda longo kaj la baza radiuso estas derivitaj el ĝi — ĉiuj filikoj en la
// mondo tiel havas la samajn proporciojn.
//     @param alto ( number ) - Kiom alta estas la tuta planto.
//     @param nombro ( number ) - Kiom da frondoj en la rozeto.
//     @param malfermo ( number ) - La elira klino de la frondoj.
//     @returns geometrio ( THREE.BufferGeometry ) - La rozeto, baz-ankrita.
export function konstruiFilikanRozeton(alto: number, nombro: number, malfermo: number): THREE.BufferGeometry {
  return konstruiFrondanKronon(nombro, alto * 0.32, alto / 0.93, malfermo, alto * 0.012, 0.62);
}

// konstruiPurpuranRozeton — La PURPURA filiko sur la grundo — la sama arka
// frondo, kun la purpuraj pinnoj. La densa varianto ( malaltaj, densaj plantoj
// ĉe la rando de la arbaro ) havas pli da frondoj, kiuj malfermiĝas pli
// mallarĝe, do la rozeto estas pli kompakta kaj la planto pli malalta.
//     @param alto ( number ) - Kiom alta estas la tuta planto.
//     @param nombro ( number ) - Kiom da frondoj en la rozeto.
//     @param malfermo ( number ) - La elira klino de la frondoj.
//     @param densa ( boolean = false ) - Ĉu la densa, malalta varianto.
//     @returns geometrio ( THREE.BufferGeometry ) - La rozeto, baz-ankrita.
export function konstruiPurpuranRozeton(alto: number, nombro: number, malfermo: number,
  densa = false): THREE.BufferGeometry {
  return konstruiFrondanKronon(nombro, alto * ( densa ? 0.30 : 0.34 ), alto / 0.93,
    malfermo, alto * 0.012, densa ? 0.78 : 0.62);
}

// konstruiTavolanFrondanKronon — Kunu plurajn frondajn tavolojn laŭ la trunko,
// por ke la folioj kresku tavole kaj la trunko transiru al ili senjunte. La plej
// suba tavolo estas ĉe y=0 ( la trunka bazo ); la supraj sekvas la trunk-alton.
//     @param speco ( objekto ) - La speco-datumoj.
//     @param tavoloj ( number ) - Kiom da foliaj tavoloj.
//     @returns geometrio ( THREE.BufferGeometry ) - La tavola krono.
export function konstruiTavolanFrondanKronon(speco: {
  trunkaAlto: number; kronaAlto: number; kronaLargho: number; nombro: number; mallevo: number;
}, tavoloj: number): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  for ( let t = 0; t < tavoloj; t++ ) {
    // La plej suba tavolo duone laŭ la trunko; la supro ĝuste sur la trunka
    // pinto — la supraj folioj kuŝas sur la trunko, nek sub nek super ĝi,
    // ĉe ĉiu plant-grandeco ( ĉio estas proporcia al la trunka alto ).
    const frakcio = 0o1/0o2 + t * ( 0o1/0o2 / ( tavoloj - 1 ) );
    // La malsupraj folioj estas pli malgrandaj; la supraj plenaj.
    const skaloT = 0o1/0o2 + t * ( 0o1/0o2 / ( tavoloj - 1 ) );
    // La trunka radiuso ĉe tiu alto ( la trunko pintigas de malsupro al supro ) —
    // la frondoj eliras el la trunka surfaco, ne sub ĝi.
    const trunkaRadiuso = PURPURAJ_TRUNKAJ_RADIOJ.malsupro
      - frakcio * ( PURPURAJ_TRUNKAJ_RADIOJ.malsupro - PURPURAJ_TRUNKAJ_RADIOJ.supro );
    const frondo = konstruiFrondanKronon(speco.nombro,
      speco.kronaLargho * skaloT, speco.kronaAlto * skaloT, speco.mallevo, trunkaRadiuso);
    frondo.translate(0, speco.trunkaAlto * frakcio, 0);
    partoj.push(frondo);
  }
  // ⟨ La krozoj 📃 ⟩ — la nova pinto de la filikarbo. Vero filiko portas ĉe sia
  // pinto kelkajn ĴUS malfermiĝantajn frondojn, RULIGITAJN en sin kiel
  // violono-sxlosilo ( la krozoj ). Ili estas la signo, kiun la okulo uzas por
  // legi planton kiel filikon, kaj sen ili la trunka pinto estis nuda bastono.
  // Tri mallongaj, forte kurbaj frondoj ĉe la trunka supro — laŭ tri anguloj.
  const krozoj = konstruiFrondanKronon(0o3, speco.kronaLargho * 0.32,
    speco.kronaAlto * 0.38, speco.mallevo * 0.2 + 0.55,
    PURPURAJ_TRUNKAJ_RADIOJ.supro, 1.35);
  krozoj.translate(0, speco.trunkaAlto * 0.98, 0);
  partoj.push(krozoj);
  return kunfandiGeometriojnSenIndekson(partoj);
}
