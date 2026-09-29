// ≺⧼ La herbotufoj 🌾 ⧽≻
// La malnova herbo — disaj TUFOJ el veraj klingoj ( konstruiHerbanTufanGeometrion ),
// metitaj hazarde tra la valo kaj la ebenaĵo ( konstruiHerbon ) kaj en densa
// ringo ĉirkaŭ la lago ( konstruiHerbonCxirkauLagon ). La kontinua tapiŝo de la
// gazono vivas en gazono.ts; ĉi tiu dosiero estas la herbo de la arbaro.
import * as THREE from "three";
import { kunfandiGeometriojnSenIndekson } from "../../../komunajxoj/kunfandajxoj.js";
import { kreiVegetajxanHazardon } from "../hazardoj.js";
import { PunktaHasho, punktoLibera } from "../metado.js";
import { biomo, type Biomo } from "../../../../kantaoj/mondo/tereno.js";
import { kreiHerbanKlingon } from "./klingoj.js";
import { kreiHerbanMaterialon } from "./vento.js";

// konstruiHerbanTufanGeometrion — Tufo el veraj klingoj. La klingoj staras sur
// eta disko ( pli densaj meze ), ĉiu kun sia propra longo, klino, arko kaj
// tordo; kelkaj ( ĉiu kvina ) estas SEKaj kaj flavaj. La koloroj estas pakataj
// en la geometrian kolor-aron, do unu materialo kaj unu instancomesho sufiĉas.
//
// ⟨ La tufo restas la malnova 📃 ⟩ — ĉi tiu funkcio konstruas la ORIGINALAN
// tufon de la herbo de la valo kaj de la ebenaĵo ( la malnova herbo ), kaj ĝi
// ne ŝanĝiĝu: la kampo ( konstruiHerbanTavolon ) havas sian propran konstruilon
// ( konstruiHerbanTavolanGeometrion ), ĉar ties klingoj disiĝas kiel tavolo
// anstataŭ amasiĝi en tufon.
//     @param semo ( number ) - La semo de la aranĝo ( ĉiuj tufoj samas ).
//     @returns geometrio ( THREE.BufferGeometry ) - La tufo.
export function konstruiHerbanTufanGeometrion(semo = 0o2715): THREE.BufferGeometry {
  const hazardo = kreiVegetajxanHazardon(semo);
  const klingoj: THREE.BufferGeometry[] = [];
  const verda = new THREE.Color();
  const seka = new THREE.Color();
  const KLINGOJ = 0o34;   // 28 klingoj
  for ( let i = 0; i < KLINGOJ; i++ ) {
    // La disko de la bazoj — densa meze ( sqrt donas egalan areon ).
    const ang = hazardo() * Math.PI * 2;
    const r = 0.17 * Math.sqrt(hazardo());
    const bazoX = Math.cos(ang) * r, bazoZ = Math.sin(ang) * r;
    // La klingoj de la rando klinas eksteren multe pli ol la internaj.
    const elen = 0o5/0o10 + r * 0.7;
    // ⟨ Larĝaj klingoj 📃 ⟩ — ĉe 0.020–0.034 la klingoj estis fadenoj: la tufo
    // aspektis kiel dratoj anstataŭ herbo. Herba klingo larĝas ĉirkaŭ 5% de sia
    // longo, kaj la plej longaj klingoj estas ankaŭ la plej dikaj ( la malnovaj
    // estis pli MALDlKAJ ju pli longaj, kio estas malnatura ).
    // ⟨ Malalta 📃 ⟩ — la klingo altas 0.14 ĝis 0.45 unuojn ( antaŭe 0.42 ĝis
    // 1.02, do la herbo atingis la genuon ). Kun la instanca skalo la herbo
    // restas sub la maleolo, kiel prizorgita gazono.
    const longo = 0.42 + hazardo() * 0.6;
    const largho = ( 0.026 + hazardo() * 0.016 ) * ( 0.72 + longo * 0.4 );
    // ⟨ La arko de la pintoj 📃 ⟩ — la klingoj de la RANDO ne nur klinas, ili
    // ankaŭ KURBIĜAS super la tufo ( herbo malfermiĝas kiel fontano ); sen tio
    // la tufo estas fasko de rektoj. La internaj klingoj restas preskaŭ vertikalaj.
    const arkaFaktoro = 0.55 + r * 2.2;
    const klino = Math.cos(ang) * elen * ( 0.35 + hazardo() * 0.65 )
      + ( hazardo() - 0o1/0o2 ) * 0.16;
    const arko = Math.sin(ang) * elen * ( 0.35 + hazardo() * 0.65 ) * arkaFaktoro
      + ( hazardo() - 0o1/0o2 ) * 0.16;
    const tordo = ( hazardo() - 0o1/0o2 ) * 1.2;
    // La nuanco — ĉiu klingo iomete malsamas, kaj ĉiu kvara estas seka.
    const sekaKlingo = i % 0o4 === 0o1;
    if ( sekaKlingo ) {
      seka.setRGB(1.06, 0.84 + hazardo() * 0o1/0o10, 0.34 + hazardo() * 0.16 );
    } else {
      verda.setRGB(0.72 + hazardo() * 0.34, 0.8 + hazardo() * 0.28, 0.62 + hazardo() * 0.3);
    }
    const klingo = kreiHerbanKlingon(longo, largho, klino, arko, tordo,
      sekaKlingo ? seka : verda);
    klingo.translate(bazoX, 0, bazoZ);
    klingoj.push(klingo);
  }
  return kunfandiGeometriojnSenIndekson(klingoj);
}

// konstruiHerbon — Metu instancigitajn herberojn en la arbaron.
export function konstruiHerbon(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(44261);
  // ⟨ Veraj klingoj 📃 ⟩ — la tufo estas konstruata el 22 tri-dimensiaj
  // klingoj ( vidu kreiHerbanKlingon ), ne el krucitaj kartoj. La materialo ne
  // bezonas alfa-teston ( la formon portas la geometrio ) kaj la per-klingajn
  // nuancojn portas la vertica kolor-aro.
  const herbaMaterialo = kreiHerbanMaterialon();
  const herboj = new THREE.InstancedMesh(konstruiHerbanTufanGeometrion(), herbaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let hi = 0;
  let gardilo = 0;

  while ( hi < kvanto && gardilo++ < 0o5660 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    // La herbo kovras la TUTAN valan biomon ( ±0o600 = la monda krado ) — la
    // biomo-filtrilo tenas gxin en la valo/malseka bordo, do nenia vala loko
    // restas nuda.
    const radiuso = 0o20 + 0o1000 * Math.sqrt(hazardaGenerilo());
    const x = Math.sin(angulo) * radiuso;
    const z = Math.cos(angulo) * radiuso;
    if ( Math.abs(x) > 0o600 || Math.abs(z) > 0o600 ) continue;
    // La biomo — la herbo restas en la vala biomo ( la montaj pintoj estas
    // rokoj kaj likenoj, ne herbejoj ).
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) continue;
    if ( excludeRivers(x, z) ) continue;
    if ( excludePaths(x, z, 2) ) continue;
    if ( excludeBuildings(x, z, 2) ) continue;
    if ( Math.hypot(x, z) < 0o16 ) continue;
    // Eta interspaco — la herboj kresku kiel tufoj, ne kiel solida tapiŝo.
    if ( !punktoLibera(metitajHasho, x, z, 0o12/0o10) ) continue;

    // ⟨ Neniu tufo staras rekte 📃 ⟩ — kun skalo egala en ĉiuj tri aksoj kaj
    // neniom da klino ĉiu tufo estis perfekte vertikala kaj same alta, do la
    // herbejo montriĝis kiel regula tapiŝo el la samaj kartoj. La klino, la
    // malegala alto kaj la etaj varioj de la larĝo rompas tion.
    const skalo = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(( hazardaGenerilo() - 0o1/0o2 ) * 0.16,
      hazardaGenerilo() * Math.PI * 2,
      ( hazardaGenerilo() - 0o1/0o2 ) * 0.16);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(skalo * ( 0.85 + hazardaGenerilo() * 0.3 ),
        skalo * ( 0o3/0o4 + hazardaGenerilo() * 0.55 ),
        skalo * ( 0.85 + hazardaGenerilo() * 0.3 )));
    herboj.setMatrixAt(hi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  herboj.count = hi;
  herboj.instanceMatrix.needsUpdate = true;
  sceno.add(herboj);
}

// konstruiHerbonCxirkauLagon — Metu herberojn en ringo ĉirkaŭ la lago, sur la
// sekaj bordoj ekster la lagrando — densa herba rando ĉirkaŭ la akvo.
export function konstruiHerbonCxirkauLagon(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoNiveloFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53122
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
  // ⟨ Veraj klingoj 📃 ⟩ — la tufo estas konstruata el 22 tri-dimensiaj
  // klingoj ( vidu kreiHerbanKlingon ), ne el krucitaj kartoj. La materialo ne
  // bezonas alfa-teston ( la formon portas la geometrio ) kaj la per-klingajn
  // nuancojn portas la vertica kolor-aro.
  const herbaMaterialo = kreiHerbanMaterialon();
  const herboj = new THREE.InstancedMesh(konstruiHerbanTufanGeometrion(), herbaMaterialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let hi = 0;
  let gardilo = 0;

  while ( hi < kvanto && gardilo++ < 0o5660 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    // Ringo de la lagrando ĝis ~40 unuojn ekster ĝi.
    const radiuso = radioFn(angulo) + hazardaGenerilo() * 0o40;
    const x = cx + Math.cos(angulo) * radiuso;
    const z = cz + Math.sin(angulo) * radiuso;
    if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) continue;
    if ( excludeRivers(x, z) || excludePaths(x, z, 2) || excludeBuildings(x, z, 2) ) continue;
    if ( heightFn(x, z) < akvoNiveloFn(x, z) ) continue;
    // Eta interspaco — la herboj kresku kiel tufoj, ne kiel solida tapiŝo.
    if ( !punktoLibera(metitajHasho, x, z, 0o12/0o10) ) continue;

    // ⟨ Neniu tufo staras rekte 📃 ⟩ — kun skalo egala en ĉiuj tri aksoj kaj
    // neniom da klino ĉiu tufo estis perfekte vertikala kaj same alta, do la
    // herbejo montriĝis kiel regula tapiŝo el la samaj kartoj. La klino, la
    // malegala alto kaj la etaj varioj de la larĝo rompas tion.
    const skalo = 0o4/0o10 + hazardaGenerilo() * 0o6/0o10;
    E.set(( hazardaGenerilo() - 0o1/0o2 ) * 0.16,
      hazardaGenerilo() * Math.PI * 2,
      ( hazardaGenerilo() - 0o1/0o2 ) * 0.16);
    Q.setFromEuler(E);
    M.compose(new THREE.Vector3(x, heightFn(x, z), z), Q,
      new THREE.Vector3(skalo * ( 0.85 + hazardaGenerilo() * 0.3 ),
        skalo * ( 0o3/0o4 + hazardaGenerilo() * 0.55 ),
        skalo * ( 0.85 + hazardaGenerilo() * 0.3 )));
    herboj.setMatrixAt(hi++, M);
    metitajHasho.meti(x, z, [ x, z ]);
  }

  herboj.count = hi;
  herboj.instanceMatrix.needsUpdate = true;
  sceno.add(herboj);
}
