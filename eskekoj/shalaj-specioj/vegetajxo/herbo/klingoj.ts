// ≺⧼ Herba klingo 🌿 ⧽≻
// La komuna herba klingo de la tuta herba familio — la tri-kolona, tordita
// rubando ( kreiHerbanKlingon ) el kiu la TUFOJ ( tufoj.ts ) kaj la kontinua
// TAPETO ( gazono.ts ) konstruas ĉiun sian klingon. Ĝi vivas en sia propra
// dosiero, ĉar ambaŭ herboj dividas ĝin sed malsame ĝin alvokas.
import * as THREE from "three";

// kreiHerbanKlingon — UNU herba klingo kiel VERA tri-dimensia rubando.
//
// ⟨ Kial ne kartono 📃 ⟩ — la herbo estis krucitaj kartoj ( du ebenaj
// ortanguloj kun alfa-teksajxo ), do ĉiu tufo estis plata: de iu ajn angulo oni
// vidis la rektan randon de la kartono kaj la klingoj ne havis profilon nek
// aĝon. Ĉi tiu klingo estas rubando el TRI kolonoj ( maldekstra, levita meza
// kresto, dekstra ) kaj KVAR segmentoj: ĝi kurbiĝas flanken kaj antaŭen, ĝi
// mallarĝiĝas al akra pinto, kaj ĝi tORDIĜAS ĉirkaŭ sia propra akso, do ĉiu
// klingo kaptas la lumon alie.
//     @param longo ( number ) - La longo de la klingo ( 1 = la tufa alto ).
//     @param largho ( number ) - La larĝo ĉe la bazo.
//     @param klino ( number ) - Kiom la pinto kliniĝas flanken ( +x ).
//     @param arko ( number ) - Kiom la pinto kurbiĝas antaŭen ( +z ).
//     @param tordo ( number ) - Kiom la klingo turniĝas ĉirkaŭ sia akso.
//     @param koloro ( THREE.Color ) - La per-klinga nuanco ( multiplikata ).
//     @param segmentoj ( number = 0o4 , nedeviga ) - Kiom da kurbaj segmentoj
//         la klingo havas ( pli da segmentoj = pli glata arko ).
//     @param pintPotenco ( number = 0o7/0o10 , nedeviga ) - Kiom akre la klingo
//         mallarĝiĝas al sia pinto ( 0.7 = akrapinta, 0.5 = pli ronda, pufa ).
//     @param foliaProfilo ( boolean = false , nedeviga ) - Ĉu la klingo uzu la
//         LANCETAN profilon ( mallarĝa bazo, larĝa triono, akra pinto ) anstataŭ
//         la malnovan "plej larĝa ĉe la tero" profilon.
//     @returns geometrio ( THREE.BufferGeometry ) - La klingo.
export function kreiHerbanKlingon(longo: number, largho: number, klino: number,
  arko: number, tordo: number, koloro: THREE.Color, segmentoj = 0o4,
  pintPotenco = 0o7/0o10, foliaProfilo = false): THREE.BufferGeometry {
  // La segmentoj estas parametro — la klingo de la vala herbo portas kvar
  // ( glata arko ), la klingo de la KAMPA herbo nur tri ( la tufoj estas pli
  // malgrandaj kaj pli multaj, do ĉiu triangulo kalkuligxas multe pli ofte ).
  const SEGMENTOJ = segmentoj;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const koloroj: number[] = [];
  const indeksoj: number[] = [];
  for ( let i = 0; i <= SEGMENTOJ; i++ ) {
    const t = i / SEGMENTOJ;
    // La centro de la klingo — la pinto kliniĝas flanken ( klino ) kaj
    // kurbiĝas antaŭen ( arko ) kiel herba folio sub sia propra pezo.
    const cx = klino * t * t;
    const cz = arko * t * t;
    // ⟨ La pinto 📃 ⟩ — la potenco de la mallarĝiĝo estas parametro: la
    // originala tufo restas akrapinta ( 0.7 ), sed la KONTINUA gazono ricevas
    // pli malaltan potencon — la klingoj larĝiĝas malsupren per pli mola kurbo
    // kaj la pinto estas pli ronda, kiel mola, pufa gazono.
    //
    // ⟨ La FOLIA profilo 📃 ⟩ — por la kontinua gazono la klingo estas LANCETA
    // ( kiel la folioj de la herbo en Genshin ): mallarĝa, preskaŭ pinta bazo,
    // la plej larĝa parto je proksimume triono de la alto, kaj poste longa, pura
    // mallarĝiĝo al la pinto. La malnova klingo male estas la plej larĝa ĉe la
    // tero kaj mallarĝiĝas senĉese — tio legiĝas kiel nadlo aŭ kano, dum la
    // folia profilo legiĝas kiel vera greso, kaj la maldika bazo lasas la teron
    // kaj la bazon de la tufo videblaj anstataŭ ŝtopi ĉion per verda muro.
    const profilo = foliaProfilo
      ? ( t < 0o3/0o10
        ? 0o44/0o100 + 0o34/0o100 * ( t / ( 0o3/0o10 ) )
        : Math.pow(1 - ( t - 0o3/0o10 ) / ( 0o7/0o10 ), pintPotenco) )
      : Math.pow(1 - t, pintPotenco);
    const duonLarĝo = largho * 0o1/0o2 * profilo;
    // La meza kolono estas levita laŭ la loka Z — la kresto de la klingo.
    const kresto = duonLarĝo * 0.9 + largho * 0.12;
    // La tordo turnas la kolonojn ĉirkaŭ la vertikala akso.
    const ang = tordo * t;
    const cos = Math.cos(ang), sin = Math.sin(ang);
    const kolonoj: [ number, number ][] = [
      [ -duonLarĝo, 0 ], [ 0, kresto ], [ duonLarĝo, 0 ] ];
    for ( let kol = 0; kol < 0o3; kol++ ) {
      const dx = kolonoj[kol][0], dz = kolonoj[kol][1];
      pozicioj.push(cx + dx * cos - dz * sin, longo * t, cz + dx * sin + dz * cos);
      uvoj.push(kol === 0 ? 0 : ( kol === 1 ? 0o1/0o2 : 1 ), t);
      koloroj.push(koloro.r, koloro.g, koloro.b);
    }
  }
  for ( let i = 0; i < SEGMENTOJ; i++ ) {
    for ( let kol = 0; kol < 0o2; kol++ ) {
      const a = i * 0o3 + kol, b = a + 1, c = a + 0o3, d = a + 0o4;
      indeksoj.push(a, c, b, b, c, d);
    }
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
  geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 2));
  geometrio.setAttribute("color", new THREE.Float32BufferAttribute(koloroj, 3));
  geometrio.setIndex(indeksoj);
  geometrio.computeVertexNormals();
  return geometrio;
}
