// ≺⧼ La subkreskajxoj 🌿 ⧽≻
// La miksitaj subkreskajxaj tavoloj de la arbaroj — la komuna konstruo
// ( instanciiSubkreskajxojn ) kaj la du medioj, kiuj provizas la lokojn, la
// montaro ( konstruiMontajnSubkreskajxojn ) kaj la lagrando
// ( konstruiLaganSubkreskajxojn ).
import * as THREE from "three";
import { kreiByssoidanLikenanTeksajxon } from "../../komunajxoj/teksajxoj/byssoida-likeno.js";
import { kreiFilikanTeksajxon } from "../../komunajxoj/teksajxoj/filiko.js";
import { kreiFolisanLikenanTeksajxon } from "../../komunajxoj/teksajxoj/folisa-likeno.js";
import { kreiFrutikosanLikenanTeksajxon } from "../../komunajxoj/teksajxoj/frutikosa-likeno.js";
import { kreiMuskanTeksajxon } from "../../komunajxoj/teksajxoj/musko.js";
import { kreiPurpuranFrondanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-frondo.js";
import { kreiPurpuranTrunkanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-trunko.js";
import { kreiPurpuranTrunkanBumpanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-trunko-bumpo.js";
import { kreiPurpuranTronkofilikanTeksajxon } from "../../komunajxoj/teksajxoj/purpura-trunko-filiko.js";
import { glataPaso, biomo, type Biomo } from "../../../kantaoj/mondo/tereno.js";
import { PURPURAJ_TRUNKAJ_RADIOJ, KRONA_LIBERO, kronaRadiusoBetula } from "./kronoj.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";
import { PunktaHasho, punktoLibera, montaKruteco, spronaDuono, type ArboMetado } from "./metado.js";
import { konstruiKrustanLikenGeometrion, konstruiFrutikosanLikenGeometrion, konstruiByssoidanLikenGeometrion } from "./likenoj.js";
import { konstruiFilikanRozeton, konstruiPurpuranRozeton, konstruiTavolanFrondanKronon } from "./frondoj.js";
import { konstruiHerbanTufanGeometrion } from "./herbo/tufoj.js";
import { kreiHerbanMaterialon } from "./herbo/vento.js";
import { konstruiFlokanMuskanGeometrion } from "./muskoj.js";

// instanciiSubkreskajxojn — Komuna konstruo por miksitaj subkreskajxaj tavoloj.
// Konstruas sep instancigitajn plantojn ( verdan filikon, malaltan purpuran
// planton, purpuran filikon, arboforman purpuran filikon, herbotufon,
// musko-monteton kaj likenan makulon ) kaj plenigas ilin per unu komuna
// ciklo. la proviza funkcio donas kandidat-lokojn, la evitu-arbaro kaj la
// reciproka interspaco filtrila ilin, kaj la speca loto disdonas la plantojn.
// La malsamaj medioj ( montaro, lagrando ) nur provizas malsamajn
// kandidat-samplerilojn.
//     @param sceno ( THREE.Scene ) - La sceno.
//     @param kvanto ( number ) - Nombro da plantoj.
//     @param heightFn ( funkcio ) - Teren-alto.
//     @param hazardaGenerilo ( funkcio ) - Hazarda generilo.
//     @param provizi ( funkcio ) - Kandidat-loko, aŭ null por preterpasi.
//     @param evituArbojn ( ArboMetado[] ) - Cxiuj arboj ( trunkoj/kronoj ).
//     @param gardiloLim ( number ) - Maksimumaj provoj.
function instanciiSubkreskajxojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  hazardaGenerilo: () => number,
  provizi: () => [ number, number ] | null,
  evituArbojn: ArboMetado[],
  gardiloLim = 0o10000
): void {
  // ⟨ Tri-dimensiaj plantoj 📃 ⟩ — la malgrandaj plantoj de la miksaj makuloj
  // estis ĝis nun KRUCITAJ KARTOJ: du aŭ kvar ebenoj kun bildo de planto. De
  // proksime oni vidis la rektan randon de la ebenoj, la krucon de supre
  // aspektis kiel X, kaj la sama bildo ripetiĝis sur ĉiu specimeno. Nun ili
  // uzas la samajn ARKAJN FRONDOJN kiel la filikoj de la valo — frondoj kun
  // levita raĥiso, kiuj leviĝas, malfermiĝas kaj malleviĝas.
  const filikaGeometrio = konstruiFilikanRozeton(1.35, 0o11, 0.20);
  const filikoj = new THREE.InstancedMesh(filikaGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiFilikanTeksajxon(), alphaTest: 0o15/0o50, side: THREE.DoubleSide, roughness: 1 }), kvanto);

  const purpuraGeometrio = konstruiPurpuranRozeton(1.55, 0o12, 0.22);
  const purpuraj = new THREE.InstancedMesh(purpuraGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranFrondanTeksajxon(), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), kvanto);

  // Malaltaj purpuraj plantoj — la malgranda variaĵo de la purpura filiko.
  const malaltaGeometrio = konstruiPurpuranRozeton(0.95, 0o15, 0.32, true);
  const malaltaj = new THREE.InstancedMesh(malaltaGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranFrondanTeksajxon(true), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), kvanto);

  // La herbo ankaŭ ĉi tie estas la TRI-DIMENSIA tufo ( vidu konstruiHerbon ) —
  // la krucitaj kartoj restis nur ĉi tie, en la miksaj makuloj, kaj vidigis
  // sian rektan randon inter la aliaj plantoj.
  const herboj = new THREE.InstancedMesh(konstruiHerbanTufanGeometrion(),
    kreiHerbanMaterialon(), kvanto);

  const muskaTeksturo = kreiMuskanTeksajxon();
  const muskoj = new THREE.InstancedMesh(konstruiFlokanMuskanGeometrion(),
    new THREE.MeshStandardMaterial({ map: muskaTeksturo, color: 0xffffff, roughness: 1 }), kvanto);

  // Arboformaj purpuraj filikoj — la sama trunko + tavola krono kiel en
  // konstruiAltajnPurpurajnFilikojn ( unu reprezenta speco, du tavoloj ).
  const altaSpeco = { trunkaAlto: 0o74/0o10, kronaAlto: 0o73/0o10, kronaLargho: 0o16/0o10, nombro: 0o10, mallevo: 0o10/0o10 };
  const altaKronoGeometrio = konstruiTavolanFrondanKronon(altaSpeco, 2);
  const altaTrunkaGeometrio = new THREE.CylinderGeometry(
    PURPURAJ_TRUNKAJ_RADIOJ.supro, PURPURAJ_TRUNKAJ_RADIOJ.malsupro, altaSpeco.trunkaAlto, 7);
  const altajTrunkoj = new THREE.InstancedMesh(altaTrunkaGeometrio,
    new THREE.MeshStandardMaterial({
      map: kreiPurpuranTrunkanTeksajxon(), bumpMap: kreiPurpuranTrunkanBumpanTeksajxon(),
      bumpScale: 0o6/0o10, color: 0xffffff, roughness: 0o7/0o10,
    }), kvanto);
  const altajKronoj = new THREE.InstancedMesh(altaKronoGeometrio,
    new THREE.MeshStandardMaterial({ map: kreiPurpuranTronkofilikanTeksajxon(false), alphaTest: 0o4/0o10, side: THREE.DoubleSide, roughness: 1 }), kvanto);

  // Likenaj makuloj — tri formoj ( frutikoza, folia, bisoida ), sekvantaj
  // la deklivan normalon.
  const likenojFrutikozaj = new THREE.InstancedMesh(konstruiFrutikosanLikenGeometrion(),
    new THREE.MeshStandardMaterial({ map: kreiFrutikosanLikenanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide,
      transparent: true, depthWrite: false, roughness: 1 }), kvanto);
  const likenojFolioj = new THREE.InstancedMesh(konstruiKrustanLikenGeometrion(),
    new THREE.MeshStandardMaterial({ map: kreiFolisanLikenanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide,
      transparent: true, depthWrite: false, roughness: 1 }), kvanto);
  const likenojBisoidaj = new THREE.InstancedMesh(konstruiByssoidanLikenGeometrion(),
    new THREE.MeshStandardMaterial({ map: kreiByssoidanLikenanTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide,
      transparent: true, depthWrite: false, roughness: 1 }), kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const S = new THREE.Vector3();
  const P = new THREE.Vector3();
  const C = new THREE.Color();
  const yawQ = new THREE.Quaternion();
  const vertikala = new THREE.Vector3(0, 1, 0);
  const normalo = new THREE.Vector3();
  const ena = new THREE.Vector3();
  const enX = new THREE.Vector3();
  const enZ = new THREE.Vector3();
  const metitajHasho = new PunktaHasho<[ number, number ]>(0o4);
  let fi = 0, pu = 0, mp = 0, hi = 0, ta = 0, mi = 0, li = 0, lf = 0, lo = 0, lb = 0;
  let gardilo = 0;

  // metiYaw — Metu instancan elementon ĉe ( x, y, z ) kun hazarda jaro kaj
  // unuforma skalo — la komuna pozo por la simplaj starantaj plantoj. La jaro
  // estas parametro por ke trunko kaj krono kune uzu la SAMAN turnon.
  const metiYaw = ( mesh: THREE.InstancedMesh, i: number, x: number, y: number, z: number, skalo: number, jaro?: number ): void => {
    E.set(0, jaro ?? hazardaGenerilo() * Math.PI * 2, 0);
    Q.setFromEuler(E);
    M.compose(P.set(x, y, z), Q, S.setScalar(skalo));
    mesh.setMatrixAt(i, M);
  };

  // finigi — Fiksu la efektivan nombron, ĝisdatigu la matricojn kaj aldonu la
  // instancan objekton al la sceno — la komuna fino de la instancitaj tavoloj.
  const finigi = ( mesh: THREE.InstancedMesh, nombro: number, ombras = false ): void => {
    mesh.count = nombro;
    mesh.instanceMatrix.needsUpdate = true;
    if ( mesh.instanceColor ) mesh.instanceColor.needsUpdate = true;
    if ( ombras ) mesh.castShadow = true;
    sceno.add(mesh);
  };

  while ( fi + pu + mp + hi + ta + mi + li < kvanto && gardilo++ < gardiloLim ) {
    const loko = provizi();
    if ( !loko ) continue;
    const x = loko[0], z = loko[1];
    // Speca loto unue — la arboformaj purpuraj filikoj bezonas pli da libero
    // ol la malgrandaj plantoj ( iliaj kronoj larĝas ĝis ~2.6 unuoj ).
    const speco = hazardaGenerilo();
    const alta = speco >= 0o7/0o10 && speco < 0o63/0o100;
    const arbLibero = alta ? 0o146/0o100 + KRONA_LIBERO : 0o4/0o10;
    const minDist = alta ? 0o146/0o100 * 0o2 + 0o3 : 0o14/0o10;
    // Evitu la trunkojn/kronojn de cxiuj arboj.
    let troProksima = false;
    for ( const arbo of evituArbojn ) {
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        ( arbo.r ?? kronaRadiusoBetula(arbo.s) ) + arbLibero ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    // Eta interspaco — la plantoj restu distingeblaj ( pli granda por la
    // arboformaj filikoj, kies kronoj ne trapenetru unu la alian ). La hasho
    // anstataŭ la lineara skanado ( la sama decido, O(1) po ĉelo ).
    if ( !punktoLibera(metitajHasho, x, z, minDist) ) continue;

    const y = heightFn(x, z);
    if ( speco < 0o2/0o10 ) {
      // Verda filiko.
      metiYaw(filikoj, fi++, x, y, z, 0o5/0o10 + hazardaGenerilo() * 0o6/0o10);
    } else if ( speco < 0o4/0o10 ) {
      // Malalta purpura planto.
      metiYaw(malaltaj, mp++, x, y, z, 0o6/0o10 + hazardaGenerilo() * 0o6/0o10);
    } else if ( speco < 0o6/0o10 ) {
      // Purpura filiko.
      metiYaw(purpuraj, pu++, x, y, z, 0o45/0o100 + hazardaGenerilo() * 0o5/0o10);
    } else if ( speco < 0o7/0o10 ) {
      // Herbotufo.
      metiYaw(herboj, hi++, x, y, z, 0o3/0o10 + hazardaGenerilo() * 0o5/0o10);
    } else if ( speco < 0o63/0o100 ) {
      // Arboforma purpura filiko — trunko kaj tavola krono je la sama bazo.
      const skalo = 0o5/0o10 + hazardaGenerilo() * 0o11/0o10;
      const jaro = hazardaGenerilo() * Math.PI * 2;
      metiYaw(altajTrunkoj, ta, x, y + altaSpeco.trunkaAlto * skalo / 2, z, skalo, jaro);
      metiYaw(altajKronoj, ta, x, y, z, skalo, jaro);
      // Eta helo-variaĵo po trunko — la sxoelo ne estas identa ĉie.
      const helo = 0.92 + hazardaGenerilo() * 0.08;
      C.setRGB(helo, helo * 0.98, helo * 1.02);
      altajTrunkoj.setColorAt(ta, C);
      ta++;
    } else if ( speco < 0o11/0o10 ) {
      // Musko-monteto — platigita.
      const skalo = 0o25/0o100 + hazardaGenerilo() * 0o35/0o100;
      // La musko kuŝu laŭ la sama loka deklivo kiel la likenoj. Antaŭe ĝi
      // ĉiam uzis la identan kvaternionon kaj videble flosis horizontale sur
      // flankaj terenoj.
      const paso = skalo * 0o1/0o2;
      ena.set(x, y, z);
      enX.set(x + paso, heightFn(x + paso, z), z).sub(ena);
      enZ.set(x, heightFn(x, z + paso), z).sub(ena);
      normalo.crossVectors(enZ, enX).normalize();
      const vert = normalo.y;
      const horiz = Math.hypot(normalo.x, normalo.z);
      const maxKruteco = Math.PI / 16;
      if ( horiz > 0o1/0o2000 && Math.atan2(horiz, Math.max(vert, 0o1/0o2000)) > maxKruteco ) {
        const u = Math.tan(maxKruteco);
        const hx = normalo.x / horiz;
        const hz = normalo.z / horiz;
        normalo.set(hx * u, 1, hz * u);
      }
      normalo.normalize();
      Q.setFromUnitVectors(vertikala, normalo);
      E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
      yawQ.setFromEuler(E);
      Q.multiply(yawQ);
      // Sen la pli malalta platformo la fadenaj bazoj estas ĉe y = 0 — metu
      // la monteton ĝuste sur la teron anstataŭ la malnova kusena ofseto.
      M.compose(P.set(x, y + 0o1/0o40, z), Q,
        S.set(skalo, skalo * 0o5/0o10, skalo));
      muskoj.setMatrixAt(mi++, M);
    } else {
      // Likena makulo — tridimensia, sekvas la deklivan normalon.
      const skalo = 0o6/0o10 + hazardaGenerilo() * 0o12/0o10;
      const paso = skalo * 0o1/0o2;
      ena.set(x, y, z);
      enX.set(x + paso, heightFn(x + paso, z), z).sub(ena);
      enZ.set(x, heightFn(x, z + paso), z).sub(ena);
      normalo.crossVectors(enZ, enX).normalize();
      const vert = normalo.y;
      const horiz = Math.hypot(normalo.x, normalo.z);
      const maxKruteco = Math.PI / 16;
      if ( horiz > 0o1/0o2000 && Math.atan2(horiz, Math.max(vert, 0o1/0o2000)) > maxKruteco ) {
        const u = Math.tan(maxKruteco);
        const hx = normalo.x / horiz;
        const hz = normalo.z / horiz;
        normalo.set(hx * u, 1, hz * u);
      }
      normalo.normalize();
      Q.setFromUnitVectors(vertikala, normalo);
      E.set(0, hazardaGenerilo() * Math.PI * 2, 0);
      yawQ.setFromEuler(E);
      Q.multiply(yawQ);
      M.compose(P.set(x, y + 0o1/0o40, z), Q, S.setScalar(skalo));
      // Forma loto — la tri likenaj formoj miksiĝas.
      const loto = hazardaGenerilo();
      if ( loto < 0o4/0o10 ) { likenojFrutikozaj.setMatrixAt(lf++, M); }
      else if ( loto < 0o7/0o10 ) { likenojFolioj.setMatrixAt(lo++, M); }
      else { likenojBisoidaj.setMatrixAt(lb++, M); }
      li++;
    }
    metitajHasho.meti(x, z, [ x, z ]);
  }

  finigi(filikoj, fi); finigi(malaltaj, mp); finigi(purpuraj, pu);
  finigi(herboj, hi); finigi(muskoj, mi);
  finigi(likenojFrutikozaj, lf); finigi(likenojFolioj, lo); finigi(likenojBisoidaj, lb);
  finigi(altajTrunkoj, ta, true); finigi(altajKronoj, ta, true);
}

// konstruiMontajnSubkreskajxojn — Metu subkreskajxojn tra la betulaj/larikaj
// arbaroj de la valo kaj la norda montaro. Tri kvaronoj klasterigxas cxirkaux
// la arboj — gxuste ekster la kronoj — por ke la subkreskajxo floru tie, kie
// la arbaro vivas; la resto sekvas la saman spur-siluetan x-envelopon kaj
// sudan fadon kiel la monta arbaro ( metiMontajnArbojn ), do la plantaro
// dissolvigxas nature en la valan arbaron anstataux komencigxi per dura rando.
// La arbolinia fado ( iomete pli tolerema ol tiu de la arboj, cxar arbustoj
// kreskas pli alten ) malabundigas la plantojn super la arbolinio, kaj la
// dekliva filtrajxo tenas ilin sur la piedeblaj deklivoj. Cxiuj arboj estas
// evitu-ankroj, por ke neniu planto kresku en la trunkojn aŭ kronojn.
//     @param sceno ( THREE.Scene ) - La sceno.
//     @param kvanto ( number ) - Nombro da plantoj.
//     @param heightFn ( funkcio ) - Teren-alto.
//     @param montajArboj ( ArboMetado[] ) - La klaster-ankroj ( arboj ).
//     @param evituArbojn ( ArboMetado[] ) - Cxiuj arboj ( trunkoj/kronoj ).
//     @param excludeRivers ( funkcio ) - Rivera filtro.
//     @param excludePaths ( funkcio ) - Voja filtro.
//     @param excludeBuildings ( funkcio ) - Konstruajxa filtro.
//     @param semo ( number ) - Hazarda semo.
export function konstruiMontajnSubkreskajxojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  montajArboj: ArboMetado[],
  evituArbojn: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53133,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);

  // La sama pieda fado kaj spur-silueta x-envelopo kiel en metiMontajnArbojn,
  // sed la bando kovras la tutan montaron ( la piedo gxis la norda piedo ) kaj
  // komencigxas pli sube — en la norda rando de la vala arbaro ( z ≈ 0o174 ),
  // por ke la subkreskajxo enmiksigxu en la valan betulan/larikan arbaron
  // anstataux lasi nudan strion cxe la monto-piedo.
  const sudaFado = ( z: number ): number => glataPaso(0o174, 0o210, z);
  const xEnvelopo = ( z: number ): number => spronaDuono(0o340, z, sudaFado);
  // Arbolinia fado — pli tolerema ol tiu de la arboj ( 0o16 → 0o26 ). la
  // filikoj kaj arbustoj kreskas iomete pli alten ol la arboj.
  const arboliniaFado = ( h: number ): number => 1 - glataPaso(0o20, 0o34, h);

  const provizi = (): [ number, number ] | null => {
    let x: number, z: number;
    if ( montajArboj.length && hazardaGenerilo() < 0o3/0o4 ) {
      // Klasterigxu cxirkaux la arboj — gxuste ekster la kronoj.
      const t = montajArboj[( hazardaGenerilo() * montajArboj.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      // Larĝa ringo ( 0.5..5.5 ) — la malgrandaj plantoj kreskas nature cxirkaŭ
      // la trunko, kaj la arboformaj purpuraj filikoj ( kiuj bezonas pli da
      // libero ) povas ankaux aperi apud la arboj.
      const d = ( t.r ?? kronaRadiusoBetula(t.s) ) + 0o5/0o10 + hazardaGenerilo() * 0o4;
      x = t.x + Math.sin(a) * d;
      z = t.z + Math.cos(a) * d;
    } else {
      // Envelopo — la samaj spur-siluetaj formoj kiel la monta arbaro.
      z = 0o174 + hazardaGenerilo() * 0o250;
      if ( hazardaGenerilo() > sudaFado(z) ) return null;
      x = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo(z);
    }
    if ( Math.hypot(x, z) < 0o20 ) return null;   // la urbo-centro restas malfermita
    // La biomo — la monta subkreskajxo nur en la montara biomo.
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return null;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) || excludeBuildings(x, z, 0o2) ) return null;
    if ( hazardaGenerilo() > arboliniaFado(heightFn(x, z)) ) return null;
    // Deklivo — neniu planto sxvebas sur la klifoj.
    if ( montaKruteco(heightFn, x, z) > 0o63/0o100 ) return null;
    return [ x, z ];
  };

  instanciiSubkreskajxojn(sceno, kvanto, heightFn, hazardaGenerilo, provizi, evituArbojn, 0o20000);
}

// konstruiLaganSubkreskajxojn — Metu la samajn subkreskajxojn en ringo cxirkaux
// la lago, sur la sekaj bordoj ekster la lagrando — la ondigita lagrando
// ( radioFn ) donas la formon, kaj tri kvaronoj klasterigxas cxirkaux la lagaj
// arboj ( gxuste ekster la kronoj ) por ke la plantoj floru kie la lagarbaro
// vivas. La malseka rivera kavo oriente de la lago restas sen plantoj.
//     @param sceno ( THREE.Scene ) - La sceno.
//     @param kvanto ( number ) - Nombro da plantoj.
//     @param heightFn ( funkcio ) - Teren-alto.
//     @param cx, cz ( number ) - Lagcentro.
//     @param radioFn ( ang → r ) - Lagranda radiusa funkcio.
//     @param akvoNiveloFn ( x, z → y ) - Akvosurfaca nivelo.
//     @param lagArboj ( ArboMetado[] ) - La lagaj arboj ( klaster-ankroj ).
//     @param evituArbojn ( ArboMetado[] ) - Cxiuj lagaj arboj ( trunkoj/kronoj ).
//     @param excludeRivers ( funkcio ) - Rivera filtro.
//     @param excludePaths ( funkcio ) - Voja filtro.
//     @param excludeBuildings ( funkcio ) - Konstruajxa filtro.
//     @param semo ( number ) - Hazarda semo.
export function konstruiLaganSubkreskajxojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoNiveloFn: ( x: number, z: number ) => number,
  lagArboj: ArboMetado[],
  evituArbojn: ArboMetado[],
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53134,
  biomojFiltro?: readonly Biomo[]
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);

  const provizi = (): [ number, number ] | null => {
    let x: number, z: number;
    if ( lagArboj.length && hazardaGenerilo() < 0o3/0o4 ) {
      // Klasterigxu cxirkaux la lagaj arboj — gxuste ekster la kronoj.
      const t = lagArboj[( hazardaGenerilo() * lagArboj.length ) | 0];
      const a = hazardaGenerilo() * Math.PI * 2;
      // Larĝa ringo ( 0.5..5.5 ) — same kiel en la montara/vala tavolo.
      const d = ( t.r ?? kronaRadiusoBetula(t.s) ) + 0o5/0o10 + hazardaGenerilo() * 0o4;
      x = t.x + Math.sin(a) * d;
      z = t.z + Math.cos(a) * d;
    } else {
      // Ringo de la lagrando gxis ~40 unuojn ekster gxi — sekvas la bordon.
      const angulo = hazardaGenerilo() * Math.PI * 2;
      const radiuso = radioFn(angulo) + hazardaGenerilo() * 0o40;
      x = cx + Math.cos(angulo) * radiuso;
      z = cz + Math.sin(angulo) * radiuso;
    }
    if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) return null;
    // La biomo — la lag-subkreskajxo restas en la vala biomo.
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return null;
    if ( excludeRivers(x, z) || excludePaths(x, z, 0o2) || excludeBuildings(x, z, 0o2) ) return null;
    // Nur seka bordo — la malseka kavo restas sen plantoj.
    if ( heightFn(x, z) < akvoNiveloFn(x, z) ) return null;
    return [ x, z ];
  };

  instanciiSubkreskajxojn(sceno, kvanto, heightFn, hazardaGenerilo, provizi, evituArbojn, 0o10000);
}
