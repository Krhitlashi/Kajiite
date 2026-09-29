// ≺⧼ La vizaĝaj formoj 👁️ ⧽≻
// La formoj de la kapo — la krania profilo ( kreiKapanKranion ), la okuloj
// ( kreiOkulon, kreiPalpebrojn, palpebraPivoto ), la brovoj kaj la okulharoj
// ( kreiVizaĝajnStrikojn ), la buŝo ( kreiBuŝon ), la nazo ( kreiNazon ) kaj la
// oreloj ( kreiOrelon ). Ili ĉiuj sidas SUR la kapa sfero ( vizaĝaBazaro ) kaj
// uzas la okulan teksturon el okuloj.ts.
import * as THREE from "three";
import { kreiBuferanGeometrion, kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { superelipso, kreiRinganSurfacon } from "./formoj.js";
import { KAPA_Y, KOLO_Y } from "./mezuroj.js";
import { OKULA_ALTO, OKULA_DX, OKULA_DY, OKULA_DZ, OKULA_LARĜO, BROVA_DUONO, BROVA_ALTO, BROVA_ARko, BROVA_KLINO, BROVA_LARĜO, BROVA_DIKECO, BROVA_LEVO, LAŜO_LARĜO, LAŜO_DIKECO, LAŜO_LEVO, BUŜO_DUONO, BUŜO_ANGULO, BUŜO_MEZO, BUŜO_LARĜO, BUŜO_DIKECO, BUŜO_LEVO, BUŜO_STACIOJ, STRIO_STACIOJ, OKULA_DIKO, PALPEBRA_GRANDO, PALPEBRA_DIKO, OKULA_NORMALA_Y, PALPEBRA_STRIO } from "./okuloj.js";

// ⟪ La vizaĝaj formoj 👁️ ⟫

// vizaĝaBazaro — La ortonorma bazaro de punkto sur la kapa sfero — la horizontala,
// la vertikala kaj la ekstera normalo. La okuloj kaj la nazo orientiĝas per ĝi, do
// ili kuŝas SUR la vizaĝo ( la supra duono de la kranio sekvas tiun saman sferon ). ( La malnova lenso turniĝis per setFromUnitVectors, kiu
// elektas la plej mallongan turnon — la formo do turniĝis hazarde ĉirkaŭ sia akso
// kaj brovo povis montri flanken. )
//     @param dx, dy, dz ( number ) - La direkto de la kapcentro al la punkto.
//     @returns ( [ horizontala, vertikala, normalo ] ) - La tri aksoj.
function vizaĝaBazaro(dx: number, dy: number, dz: number)
  : [ THREE.Vector3, THREE.Vector3, THREE.Vector3 ] {
  const normalo = new THREE.Vector3(dx, dy, dz).normalize();
  const horizontala = new THREE.Vector3(0, 0o1, 0).cross(normalo).normalize();
  return [ horizontala, normalo.clone().cross(horizontala).normalize(), normalo ];
}

// kreiOkulon — La okulo — FOLIO-forma malhela lenso sur la vizaĝo. La
// formo estas vera folio — du cirklaj arkoj renkontiĝantaj ĉe du akraj pintoj,
// glata kaj plena en la mezo — kaj la okulo elstaras nur kelkajn milimetrojn el la
// kapo, do ĝi legiĝas kiel okulo anstataŭ kiel glubendo. ( La antaŭa okulo estis
// platpremita GLOBO — malhela RONDO sur la vizaĝo. )
//     @param dir ( number ) - -1 maldekstre, +1 dekstre.
//     @param dx, dy, dz ( number ) - La centro, rilate al la kapcentro.
//     @param largho, alto ( number ) - La duonlarĝo kaj la duonalto de la folio.
//     @param klino ( number ) - La turno ĉirkaŭ la normalo ( la interna angulo de
//         okulo sidas pli malalte ol la ekstera, do la rigardo havas direkton ).
//     @returns geometrio ( THREE.BufferGeometry ) - La okulo.
export function kreiOkulon(dir: number, dx: number, dy: number, dz: number,
  largho: number, alto: number, klino: number): THREE.BufferGeometry {
  const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(dir * dx, dy, dz);
  // ⟨ La folio bezonas pli da punktoj 📃 ⟩ — kun 0o14 la du pintoj estis precizaj
  // verticoj sed la arko inter ili montris kvar aŭ kvin rektajn randojn, do la
  // okulo legiĝis kiel plurangulo. La folia arko estas glata, do 0o20 punktoj
  // estas la minimumo por ke la rando restu kurba.
  const N = 0o20;                       // la punktoj ĉirkaŭ la folio
  const DIKO = 0o1/0o200;               // 0.0078 — kiom la okulo elstaras
  const bazo = new THREE.Vector3(dir * dx, KAPA_Y + dy, dz);
  const kos = Math.cos(klino), sin = Math.sin(klino);
  const pozicioj: number[] = [];
  // ⟨ La UV-oj montras la pupilon 📃 ⟩ — la kanvaso enhavas la pupilon meze, do
  // ĉiu vertico spegulas sian 2D-lokan ofseton ( rx, ry ) en la kanvon. Sen UV-oj
  // la tuta folio legis la saman angulan punkton kaj la okulo restis unukolora.
  const uvoj: number[] = [];
  // ⟨ Du ringoj kaj la centro 📃 ⟩ — la sama ventumila skemo kiel la nazo — la
  // rando sidas sur la kapo, pli malgranda ringo elstaras iomete, kaj la centro
  // plej multe. Sen la meza ringo la lenso estus plata disko.
  for ( const [ grando, diko ] of [ [ 0o1, 0 ], [ 0o11/0o20, DIKO * 0o7/0o10 ] ] as [ number, number ][] ) {
    // ⟨ La radiuso de la folia arko 📃 ⟩ — la cirklo kiu trapasas la tri punktojn
    // ( ±largho, 0 ) kaj ( 0, alto ). Ĝi estas kalkulita el la SKALITA duonlarĝo
    // kaj duonalto, do la interna ringo estas preciza malgrandigo de la rando.
    const lg = largho * grando, ag = alto * grando;
    const R = ( lg * lg + ag * ag ) / ( 0o2 * ag );
    const Rr = R * R, Rm = R - ag;
    for ( let i = 0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2;
      const k = Math.cos(t), s = Math.sin(t);
      // ⟨ La folio 📃 ⟩ — la malnova profilo estis superelipso kun la eksponento
      // 0o3 anstataŭ 0o2 — ĝi restis preskaŭ same larĝa ĝis la finoj kaj pinĉiĝis
      // nur tie, do la okulo legiĝis kiel ortangulo kun du pintoj. La folio venas
      // el DU CIRKLAJ ARKOJ kiuj renkontiĝas ĉe la du pintoj — la arko trapasas
      // ( ±largho, 0 ) kaj ( 0, alto ) — do la kurbo estas glata kaj plena en la
      // mezo kaj akriĝas nur ĉe la pintoj, kiel folio.
      const fx = lg * k;
      const folio = Math.sqrt(Math.max(0, Rr - fx * fx)) - Rm;
      const py = Math.sign(s) * folio;
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      pozicioj.push(
        bazo.x + horizontala.x * rx + vertikala.x * ry + normalo.x * diko,
        bazo.y + horizontala.y * rx + vertikala.y * ry + normalo.y * diko,
        bazo.z + horizontala.z * rx + vertikala.z * ry + normalo.z * diko);
      uvoj.push(0o1/0o2 + rx / ( 0o2 * largho ), 0o1/0o2 + ry / ( 0o2 * alto ));
    }
  }
  pozicioj.push(bazo.x + normalo.x * DIKO, bazo.y + normalo.y * DIKO, bazo.z + normalo.z * DIKO);
  uvoj.push(0o1/0o2, 0o1/0o2);
  const indeksoj: number[] = [];
  for ( let i = 0; i < N; i++ ) {
    const a = i, b = ( i + 0o1 ) % N, c = N + i, d = N + ( i + 0o1 ) % N;
    indeksoj.push(a, b, c, b, d, c);     // la rando inter la du ringoj
    indeksoj.push(c, d, N * 0o2);        // la ventumilo al la centro
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

// palpebraPivoto — La alto de la pivoto de la palpebroj, rilate al la kapo-grupo.
// La mesho SKALIĜAS malsupren el ĉi tiu linio ( vidu la palpebrumon en
// marŝSvingon ), do la linio estas la strio, al kiu la malfermita palpebro
// kunpremiĝas. La du okuloj sidas je la sama alto, do unu nombro servas ambaŭ kaj
// la tuta palpebraro estas unu mesho.
// ⟨ Kial la pivoto egalas al la strio 📃 ⟩ — PALPEBRA_STRIO ( vidu la konstantojn
// supre ) estas la nura libera nombro de la tuta palpebro — ĉio alia devenas de
// la okulo mem. La folio de la geometrio deŝoviĝas malsupren per levo, kiu
// enhavas OKULA_NORMALA_Y-on; tiu deŝovo kaj la pivoto kune metas la folion ĝuste
// sur la okulcentron kiam la skalo estas 1, kaj ĉe skalo 0 la mesho kolapsas
// ĝuste sur ĉi tiun linion.
//     @returns alto ( number ) - La pivoto, rilate al la kapo-grupo.
export function palpebraPivoto(): number {
  return KAPA_Y + OKULA_DY + PALPEBRA_STRIO - KOLO_Y;
}

// kreiPalpebrojn — La palpebroj — du haŭtaj folioj, unu antaŭ ĉiu okulo. Ĉiu folio
// estas la SAMA folia lenso kiel la okulo ( vidu kreiOkulon ), nur PALPEBRA_GRANDON
// pli granda, do ĝi plene kovras la okulon kiam ĝi fermas — la okulharoj kaj la
// pintoj de la okulo neniam restas videblaj.
// ⟨ La palpebro estas PARALELA al la okulo 📃 ⟩ — ĝi ricevas la saman bazaron kaj
// la saman kliniĝon kiel la okulo, do la du folioj restas paralelaj kaj la
// antaŭeno estas egala ĉie. Kun folio GLOBITA sur la kranian surfacon ( kiel la
// brovoj ) la vizaĝo reirus ĉe la anguloj dum la plata okulo restus antaŭe — la
// okulo tiam trapikus la palpebron ĝuste ĉe siaj anguloj.
// ⟨ La alto de la geometrio estas ŝovita 📃 ⟩ — la geometrio mem ne enhavas la
// absolutajn altojn de la kapo ( male ol la okulo, kiu bakas KAPA_Y-on en ĉiun
// verticon ), ĉar skalo devas multipliki la folion kaj ne la tutan kapon. Nur la
// vertikala parto do aperas en la y-koordinato, kaj levo deŝovas la folion
// malsupren tiom, ke la mesho ĉe palpebraPivoto metos ĝin ĝuste sur la okulon.
//     @returns geometrio ( THREE.BufferGeometry ) - La du palpebroj, ĉe la kapo.
export function kreiPalpebrojn(): THREE.BufferGeometry {
  const N = 0o20;                      // la punktoj ĉirkaŭ la folio
  const largho = OKULA_LARĜO * PALPEBRA_GRANDO;
  const alto = OKULA_ALTO * PALPEBRA_GRANDO;
  const diko = OKULA_DIKO + PALPEBRA_DIKO;
  // Kiom la folio deŝoviĝas malsupren en la geometrio. La unua parto portas la
  // folion de la pivoto ( la strio ) malsupren al la okulcentro, la dua forprenas
  // la antaŭenon, kiun la normala klineco aldonas al la alto de la folio — sen
  // ĝi la folio sidus 0.0037 tro malalte kaj la fermita okulo montrus okul-sakon.
  const levo = PALPEBRA_STRIO + OKULA_NORMALA_Y * diko;
  const R = ( largho * largho + alto * alto ) / ( 0o2 * alto ), Rr = R * R, Rm = R - alto;
  const partoj: THREE.BufferGeometry[] = [];
  for ( const dir of [ -0o1, 0o1 ] ) {
    const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(dir * OKULA_DX,
      OKULA_DY, OKULA_DZ);
    // ⟨ La klino de la okulo restas 📃 ⟩ — la interna angulo de la fermita okulo
    // devas sidi same kiel tiu de la malfermita, alie la okulo ŝajnus turniĝi dum
    // ĉiu palpebrumo.
    const klino = dir * 0o1/0o10;
    const kos = Math.cos(klino), sin = Math.sin(klino);
    const pozicioj: number[] = [], uvoj: number[] = [], indeksoj: number[] = [];
    for ( let i = 0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2, k = Math.cos(t), s = Math.sin(t);
      const fx = largho * k;
      const folio = Math.sqrt(Math.max(0, Rr - fx * fx)) - Rm;
      const py = Math.sign(s) * folio;
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      pozicioj.push(dir * OKULA_DX + horizontala.x * rx + vertikala.x * ry
        + normalo.x * diko, vertikala.y * ry + normalo.y * diko - levo,
        OKULA_DZ + horizontala.z * rx + vertikala.z * ry + normalo.z * diko);
      uvoj.push(0o1/0o2 + rx / ( 0o2 * largho ), 0o1/0o2 + ry / ( 0o2 * alto ));
    }
    pozicioj.push(dir * OKULA_DX + normalo.x * diko, normalo.y * diko - levo,
      OKULA_DZ + normalo.z * diko);
    uvoj.push(0o1/0o2, 0o1/0o2);
    for ( let i = 0; i < N; i++ ) indeksoj.push(i, ( i + 0o1 ) % N, N);
    partoj.push(kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj }));
  }
  return kunfandiGeometriojn(partoj);
}

// kapaSurfaco — Punkto sur la krania surfaco laŭ direkto, kaj ĝia normalo. La
// kranio estas TAVOLO de elipsoj ( vidu KRANIAJN_RINGOJN ), do la surfaco
// kalkuliĝas per la sama interpolo. La brovoj uzas ĝin por kuŝi SUR la haŭto —
// la malnova brovo estis plata lenso, kiu aŭ flosis antaŭ la vizaĝo aŭ malaperis
// interne de ĝi, ĉar la facetoj de la malalt-poligona kranio sidas interne de la
// ideala sfero.
//     @param dx, dy, dz ( number ) - La direkto de la kapcentro al la punkto.
//     @returns ( [ punkto, normalo ] ) - La punkto sur la haŭto kaj la normalo.
function kapaSurfaco(dx: number, dy: number, dz: number)
  : [ THREE.Vector3, THREE.Vector3 ] {
  let sube = KRANIAJ_RINGOJ[0], supre = KRANIAJ_RINGOJ[KRANIAJ_RINGOJ.length - 0o1];
  for ( let i = 0; i + 0o1 < KRANIAJ_RINGOJ.length; i++ ) {
    if ( dy <= KRANIAJ_RINGOJ[i][0] && dy >= KRANIAJ_RINGOJ[i + 0o1][0] ) {
      sube = KRANIAJ_RINGOJ[i]; supre = KRANIAJ_RINGOJ[i + 0o1];
      break;
    }
  }
  const t = ( sube[0] - dy ) / ( sube[0] - supre[0] || 0o1 );
  const a = sube[1] + ( supre[1] - sube[1] ) * t;
  const b = sube[2] + ( supre[2] - sube[2] ) * t;
  const antaŭen = sube[3] + ( supre[3] - sube[3] ) * t;
  const k = 0o1 / Math.hypot(dx / a, dz / b);
  return [ new THREE.Vector3(dx * k, KAPA_Y + dy, dz * k + antaŭen),
    new THREE.Vector3(dx, dy, dz).normalize() ];
}

// kreiVizaĝanStrikon — Maldika RUBANDO laŭ kurbo sur la vizaĝo. Ĝi estas la
// komuna ilo de la brovoj kaj de la okulharoj — la kurbo, la normalo kaj la larĝo
// venas el la alvokanto. Ĉiu stacio havas kvar angulojn ( plata ortangulo ), do la
// strio legiĝas kiel tufo da haro anstataŭ kiel plata glubendo, kaj ĉiu stacio
// portas sian propran larĝon, do la finoj PINTIĜAS.
//     @param centroj ( THREE.Vector3[] ) - La centroj de la stacioj.
//     @param normaloj ( THREE.Vector3[] ) - La eksteraj normaloj de la stacioj.
//     @param larĝoj ( number[] ) - La larĝo ĉe ĉiu stacio.
//     @param dikeco ( number ) - La dikeco de la rubando.
//     @returns geometrio ( THREE.BufferGeometry ) - La rubando.
function kreiVizaĝanStrikon(centroj: THREE.Vector3[], normaloj: THREE.Vector3[],
  larĝoj: number[], dikeco: number): THREE.BufferGeometry {
  const K = 0o4;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let i = 0; i < centroj.length; i++ ) {
    // ⟨ La larĝa akso venas el la KURBO 📃 ⟩ — la tanĝanto de la stacio ( el la
    // antaŭa kaj la sekva centroj ) kaj ĝia perpendikularo en la vizaĝa ebeno.
    // Sen ĝi la rubando turniĝus kun la kurbo kaj la brovo montrus sian randon.
    const antaŭ = centroj[Math.max(0, i - 0o1)];
    const post = centroj[Math.min(centroj.length - 0o1, i + 0o1)];
    const tanĝanto = post.clone().sub(antaŭ).normalize();
    const normalo = normaloj[i];
    const larĝa = new THREE.Vector3().crossVectors(normalo, tanĝanto).normalize();
    const duonLarĝo = larĝoj[i] * 0o1/0o2, duonDikeco = dikeco * 0o1/0o2;
    for ( const [ sb, sn ] of [ [ 0o1, 0o1 ], [ -0o1, 0o1 ], [ -0o1, -0o1 ], [ 0o1, -0o1 ] ] ) {
      pozicioj.push(centroj[i].x + larĝa.x * sb * duonLarĝo + normalo.x * sn * duonDikeco,
        centroj[i].y + larĝa.y * sb * duonLarĝo + normalo.y * sn * duonDikeco,
        centroj[i].z + larĝa.z * sb * duonLarĝo + normalo.z * sn * duonDikeco);
      // ⟨ La UV-oj montras la har-teksajxon 📃 ⟩ — la strio specimenas la fadenojn
      // LAŬ sia longo; sen UV-oj la tuta brovo legus unu angulan punkton kaj restus
      // plata koloro, dum la hararo mem havus fadenojn.
      uvoj.push(i / ( centroj.length - 0o1 ), 0o1/0o2 + sn * 0o1/0o2);
    }
  }
  for ( let i = 0; i + 0o1 < centroj.length; i++ ) {
    for ( let j = 0; j < K; j++ ) {
      const a = i * K + j, b = i * K + ( j + 0o1 ) % K;
      const c = ( i + 0o1 ) * K + j, d = ( i + 0o1 ) * K + ( j + 0o1 ) % K;
      indeksoj.push(a, b, c, b, d, c);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

// kreiVizaĝajnStrikojn — La brovoj kaj la okulharoj kiel UNU geometrio. Ili portas
// la HARAN materialon ( vidu konstruiFiguron ), do ili estas kolorigitaj kiel la
// hararo de la figuro kaj la brovoj de blondulo estas blondaj. La vipoj sekvas la
// saman kliniĝon kiel la okuloj, do ili restas super la okulo kiam la rigardo
// havas direkton.
//     @returns geometrio ( THREE.BufferGeometry ) - La brovoj kaj la okulharoj.
export function kreiVizaĝajnStrikojn(): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  const centro = new THREE.Vector3(0, KAPA_Y, 0);
  for ( const dir of [ -0o1, 0o1 ] ) {
    const klino = dir * 0o1/0o10;
    const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(dir * OKULA_DX, OKULA_DY, OKULA_DZ);
    const bazo = new THREE.Vector3(dir * OKULA_DX, KAPA_Y + OKULA_DY, OKULA_DZ);
    // ⟨ La brovo 📃 ⟩ — arko super la okulo, kun la mezo levita kaj la ekstera
    // fino iomete mallevita ( la rigardo ricevas direkton ).
    const brovCentroj: THREE.Vector3[] = [];
    const brovNormaloj: THREE.Vector3[] = [];
    const brovLarĝoj: number[] = [];
    for ( let i = 0; i <= STRIO_STACIOJ; i++ ) {
      const s = -0o1 + 0o2 * i / STRIO_STACIOJ;
      const p = bazo.clone()
        .addScaledVector(horizontala, s * BROVA_DUONO)
        .addScaledVector(vertikala, BROVA_ALTO + BROVA_ARko * ( 0o1 - s * s ) - BROVA_KLINO * s * dir);
      const [ surfaco, n ] = kapaSurfaco(p.x - centro.x, p.y - centro.y, p.z - centro.z);
      brovCentroj.push(surfaco.addScaledVector(n, BROVA_LEVO)); brovNormaloj.push(n);
      brovLarĝoj.push(BROVA_LARĜO * ( 0o1 - 0o3/0o4 * s * s ));
    }
    partoj.push(kreiVizaĝanStrikon(brovCentroj, brovNormaloj, brovLarĝoj, BROVA_DIKECO));
    // ⟨ La okulharoj 📃 ⟩ — la supra arko de la okula folio. La rimo de la
    // okulo sidas sur la tanĝanta ebeno ( la geometrio de la okulo ) kaj la lenso
    // leviĝas internen, do la haroj kuŝas sur la rimo kaj kovras ĝian randon.
    const laŝCentroj: THREE.Vector3[] = [];
    const laŝNormaloj: THREE.Vector3[] = [];
    const laŝLarĝoj: number[] = [];
    const R = ( OKULA_LARĜO * OKULA_LARĜO + OKULA_ALTO * OKULA_ALTO ) / ( 0o2 * OKULA_ALTO );
    const kos = Math.cos(klino), sin = Math.sin(klino);
    for ( let i = 0; i <= STRIO_STACIOJ; i++ ) {
      const fi = Math.PI * i / STRIO_STACIOJ;
      const fx = OKULA_LARĜO * Math.cos(fi);
      const py = Math.sqrt(Math.max(0, R * R - fx * fx)) - (R - OKULA_ALTO);
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      laŝCentroj.push(bazo.clone()
        .addScaledVector(horizontala, rx)
        .addScaledVector(vertikala, ry)
        .addScaledVector(normalo, LAŜO_LEVO));
      laŝNormaloj.push(normalo.clone());
      const rando = Math.abs(i / STRIO_STACIOJ * 0o2 - 0o1);   // 1 ĉe la finoj
      laŝLarĝoj.push(LAŜO_LARĜO * ( 0o1 - 0o3/0o4 * rando * rando ));
    }
    partoj.push(kreiVizaĝanStrikon(laŝCentroj, laŝNormaloj, laŝLarĝoj, LAŜO_DIKECO));
  }
  return kunfandiGeometriojn(partoj);
}

// kreiBuŝon — La buŝo — LONGA V sur la malsupra vizaĝo. La du brakoj de la V
// venas el la du anguloj malsupren al la mezo, kaj ĉiu brako estas APARTA rubando
// ( vidu kreiVizaĝanStrikon ) — kun unu rubando tra la pinto la larĝa akso de la
// rubando turniĝus je 90° ĉe la angulo kaj la strio tordiĝus en la mezo. La
// punktoj venas el kapaSurfaco, do la buŝo kuŝas SUR la haŭto de la makzelo kaj
// sekvas ĝian kurbiĝon anstataŭ flosi antaŭ la vizaĝo.
// ⟨ La UV-oj montras la MALHELAN angulon 📃 ⟩ — la vizaĝa geometrio portas la
// okulan materialon ( unu el kvar paletroj ) kaj ĉiu okula kanvaso estas malhela
// ( 0x100808 ) krom la blanka folio mem. La buŝo do ricevas la UV-on de la supra
// maldekstra angulo de la kanvaso, kie la folio neniam atingas — la buŝo estas
// malhela ĉe ĉiu paletro sen propra materialo kaj sen plia bildiga alvoko.
//     @returns geometrio ( THREE.BufferGeometry ) - La buŝo, sur la malsupra vizaĝo.
export function kreiBuŝon(): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  for ( const dir of [ -0o1, 0o1 ] ) {
    const centroj: THREE.Vector3[] = [];
    const normaloj: THREE.Vector3[] = [];
    const larĝoj: number[] = [];
    for ( let i = 0; i <= BUŜO_STACIOJ; i++ ) {
      const t = i / BUŜO_STACIOJ;
      // ⟨ La anguloj LEVIĜAS kaj la mezo MALSUPRENIRAS 📃 ⟩ — la alto de la strio
      // iras linie de la angulo al la mezo, do la du brakoj estas REKTAJ kaj la
      // buŝo legiĝas kiel V ( kun la rondaj finoj de la rubando ), ne kiel U.
      const [ surfaco, n ] = kapaSurfaco(dir * BUŜO_DUONO * ( 0o1 - t ),
        BUŜO_ANGULO + ( BUŜO_MEZO - BUŜO_ANGULO ) * t, OKULA_DZ);
      centroj.push(surfaco.addScaledVector(n, BUŜO_LEVO));
      normaloj.push(n);
      // ⟨ La strio PINTIĜAS al la anguloj 📃 ⟩ — la larĝo kreskas de kvarono ĝis
      // la plena al la mezo, do la buŝo mallarĝiĝas ĉe la du anguloj kaj la mezo
      // portas la tutan dikecon — sama lingvo kiel la brovoj.
      larĝoj.push(BUŜO_LARĜO * ( 0o1/0o4 + 0o3/0o4 * t ));
    }
    partoj.push(kreiVizaĝanStrikon(centroj, normaloj, larĝoj, BUŜO_DIKECO));
  }
  const geometrio = kunfandiGeometriojn(partoj);
  const uvoj = geometrio.attributes.uv;
  for ( let i = 0; i < uvoj.count; i++ ) uvoj.setXY(i, 0o4/0o100, 0o4/0o100);
  return geometrio;
}

// kreiNazon — La nazo — RONDIGITA TRIANGULO antaŭ la vizaĝo, kun la pinto malsupre
// kaj la ponto supre. La formo venas el la subtena funkcio de triangulo ( la
// intersekto de tri duon-ebonoj ) kun MOLA maksimumo — kun akra maksimumo la
// anguloj estus tranĉaj, kun la mola ili rondiĝas — la sama lingvo kiel la
// rondigitaj skatoloj de la mondo ( vidu S2WENI/Referencoj/Priskribo.md ). La
// pinto ankaŭ elstaras pli ol la ponto, do la nazo kreskas el la vizaĝo anstataŭ
// sidi sur ĝi kiel glata tubero.
//     @returns geometrio ( THREE.BufferGeometry ) - La nazo, sur la vizaĝo.
export function kreiNazon(): THREE.BufferGeometry {
  // ⟨ La nazo sidas SUR la vizaĝo 📃 ⟩ — la malnova bazo ( −0.109, 0.164 ) estis
  // 0.025 ANTAŬ la kapo mem, do la tuta nazo flosis en la aero. Nun la bazo sidas
  // sur la krania profilo ( la punkto de la profilo, kies direkto egalas la
  // direkton de la bazo ) — la nazo do elkreskas el la vizaĝo.
  // ⟨ La nazo leviĝis kaj MALGRANDIĜIS 📃 ⟩ — la buŝo bezonas spacon sub la nazo,
  // sed la nazo ( duonalto 0.025, do 0.05 entute ) okupis preskaŭ la tutan mezon
  // de la malsupra vizaĝo kaj la punkto de la nazo preskaŭ tuŝis la menton. La
  // nazo nun sidas pli alte ( 0.0703 anstataŭ 0.0781 ) kaj estas pli malgranda,
  // do inter ĝia pinto kaj la mentono restas 0.08 — vera spaco por buŝo.
  const dy = -0o44/0o1000, dz = 0o122/0o1000;   // −0.0703 / 0.1602 — sur la kranio
  const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(0, dy, dz);
  const bazo = new THREE.Vector3(0, KAPA_Y + dy, dz);
  const ALTO = 0o13/0o1000;                 // 0.0215 — la duonalto de la triangulo
  const anguloj: [ number, number ][] = [
    [ 0, ALTO ], [ -0o1/0o40, -ALTO ], [ 0o1/0o40, -ALTO ] ];
  // ⟨ La subtenaj ebenoj 📃 ⟩ — ĉiu rando de la triangulo difinas ebenon tra la
  // centro; la normalo montras for de la centro kaj la disto estas la radiuso de
  // la rando. La formo en la direkto u estas la plej malgranda disto inter la
  // ebenoj — la preciza triangulo — kaj la mola maksimumo rondigas la angulojn.
  const ebenoj: [ number, number, number ][] = [];   // [ nx, ny, disto ]
  for ( let i = 0; i < 0o3; i++ ) {
    const a = anguloj[i], b = anguloj[( i + 0o1 ) % 0o3 ];
    const rx = b[0] - a[0], ry = b[1] - a[1];
    const longo = Math.hypot(rx, ry);
    let nx = ry / longo, ny = -rx / longo;
    let disto = nx * a[0] + ny * a[1];
    if ( disto < 0 ) { nx = -nx; ny = -ny; disto = -disto; }
    ebenoj.push([ nx, ny, disto ]);
  }
  const N = 0o16;
  const pozicioj: number[] = [];
  for ( const [ grando, faktoro ] of [ [ 0o1, 0o4/0o1000 ], [ 0o11/0o20, 0o11/0o1000 ] ] as [ number, number ][] ) {
    for ( let i = 0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2;
      const ux = Math.cos(t), uy = Math.sin(t);
      let sumo = 0;
      for ( const [ nx, ny, disto ] of ebenoj ) {
        const valoro = ( nx * ux + ny * uy ) / disto;
        if ( valoro > 0 ) sumo += valoro ** 0o4;
      }
      const r = sumo > 0 ? Math.pow(sumo, -0o1/0o4) : 0;
      const px = r * ux, py = r * uy;
      // ⟨ La pinto elstaras pli 📃 ⟩ — la elstaro malkreskas supre, do la ponto
      // de la nazo preskaŭ tuŝas la vizaĝon kaj la pinto elstaras. Sen tio la nazo
      // estus egala tubero de la frunto ĝis la buŝo.
      const f = 0o55/0o100 + 0o45/0o100 * ( 0o1 - ( py / ( 0o2 * ALTO ) + 0o1/0o2 ) );
      const diko = faktoro * f;
      pozicioj.push(
        bazo.x + horizontala.x * px * grando + vertikala.x * py * grando + normalo.x * diko,
        bazo.y + horizontala.y * px * grando + vertikala.y * py * grando + normalo.y * diko,
        bazo.z + horizontala.z * px * grando + vertikala.z * py * grando + normalo.z * diko);
    }
  }
  const pinto = 0o12/0o1000;                // 0.0195 — la elstaro de la pinto ( 10 / 512 )
  pozicioj.push(bazo.x + normalo.x * pinto, bazo.y + normalo.y * pinto,
    bazo.z + normalo.z * pinto);
  const indeksoj: number[] = [];
  for ( let i = 0; i < N; i++ ) {
    const a = i, b = ( i + 0o1 ) % N, c = N + i, d = N + ( i + 0o1 ) % N;
    indeksoj.push(a, b, c, b, d, c);
    indeksoj.push(c, d, N * 0o2);
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj);
}
// ⟪ La krania profilo 🗿 ⟫
// KRANIAJ_RINGOJ — la profilo de la kapo, de la krono malsupren. La tabelo estas
// MODULE-nivela, ĉar ankaŭ la brovoj ( vidu kreiVizaĝajnStrikojn ) devas scii kie
// la haŭto sidas — brovo kiu flosas antaŭ la vizaĝo legiĝas kiel naĝilo. La
// unuaj tri kolonoj estas la duonlarĝo, la duonprofundo kaj la antaŭen-ŝovo de
// ĉiu ringo ( la ringoj mem estas elipsoj en la ( x, z )-ebeno, vidu
// kreiRinganSurfacon ), la unua la alto rilate al la kapcentro.
// [ y, duonlarĝo, duonprofundo, antaŭen-ŝovo ]
const KRANIAJ_RINGOJ: [ number, number, number, number ][] = [
  [  0o122/0o1000, 0o40/0o1000,  0o40/0o1000, 0           ],   // +0.156 — la krono
  [  0o110/0o1000, 0o63/0o1000,  0o63/0o1000, 0           ],   // +0.140
  [  0o71/0o1000,  0o103/0o1000, 0o103/0o1000, 0          ],   // +0.112 — la frunto
  [  0o45/0o1000,  0o117/0o1000, 0o117/0o1000, 0          ],   // +0.072
  [  0o20/0o1000,  0o126/0o1000, 0o126/0o1000, 0          ],   // +0.032
  [ -0o4/0o1000,   0o127/0o1000, 0o127/0o1000, 0          ],   // −0.008 — la plej larĝa
  [ -0o34/0o1000,  0o123/0o1000, 0o123/0o1000, 0          ],   // −0.055 — sub la okuloj
  [ -0o50/0o1000,  0o116/0o1000, 0o121/0o1000, 0          ],   // −0.078 — la makzelo komenciĝas
  [ -0o66/0o1000,  0o77/0o1000,  0o107/0o1000, 0          ],   // −0.105
  [ -0o102/0o1000, 0o56/0o1000,  0o74/0o1000,  0o2/0o1000 ],  // −0.129
  [ -0o114/0o1000, 0o36/0o1000,  0o57/0o1000,  0o5/0o1000 ],  // −0.148
  [ -0o124/0o1000, 0o20/0o1000,  0o41/0o1000,  0o11/0o1000 ], // −0.162 — la mentono
  [ -0o130/0o1000, 0o6/0o1000,   0o22/0o1000,  0o13/0o1000 ], // −0.172 — la pinto
];

// kreiKapanKranion — La kranio — la kapo mem, sen la oreloj, la nazo kaj la kolo.
// ⟨ La kapo havas ANIME-formon 📃 ⟩ — antaŭe ĝi estis sfero, do la vizaĝo havis
// neniun makzelon. Nun la SUPRA duono sekvas la saman sferon ( la okuloj kaj la
// nazo sidas sur ĝi, do ili ne rajtas moviĝi ) kaj la MALSUPRA duono mallarĝiĝas
// malsupren en larĝo dum ĝi konservas sian profundon kaj puŝiĝas antaŭen. Tiel
// naskiĝas la makzelo kaj la pinta mentono de animea kapo — granda kranio kaj
// mallarĝa vizaĝo malsupre.
// ⟨ La kapo ne plu estas sfero 📃 ⟩ — la sekco ankaŭ estas ELIPSO ( la makzelo
// estas pli profunda ol larĝa ) kaj la mentono portas antaŭen-ŝovon, do la kapo
// havas veran profilon. Ĉiuj ringoj restas INTERNE de la malnova sfero, do la
// har-ĉapo ( kiu sekvas tiun sferon, vidu kreiHaranĈapon ) ankoraŭ kovras la
// kranion kun spaco.
//     @returns geometrio ( THREE.BufferGeometry ) - La kranio, ĉe la kapo.
export function kreiKapanKranion(): THREE.BufferGeometry {
  const K = 0o20;
  const ringoj = KRANIAJ_RINGOJ;
  const centro = ( y: number, dz: number ) => Array.from({ length: K },
    () => [ 0, KAPA_Y + y, dz ] as [ number, number, number ]);
  return kreiRinganSurfacon([ centro(ringoj[0][0], ringoj[0][3]),
    ...ringoj.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
      const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
      return [ x, KAPA_Y + y, z + dz ] as [ number, number, number ];
    })), centro(ringoj[ringoj.length - 0o1][0], ringoj[ringoj.length - 0o1][3]) ]);
}

// ⟪ La oreloj 👂 ⟫
// ORELAJ_SEKCOJ — la profilo de la orelo, de la supra rimo malsupren. Ĉiu vico
// estas [ la alto , la antaŭa rando , la malantaŭa rando , la elstaro ] rilate al
// la kapcentro. La lasta nombro estas faktoro de ORELA_KLINO — vera orelo NE
// staras egale for de la kapo laŭ sia tuta alto: la rimo elstaras plej multe
// supre-meze ( la helikso ) kaj la lobo preskaŭ tuŝas la kapon.
// ⟨ Kial PROPRa tabelo 📃 ⟩ — la malnova orelo estis premita GLOBO sur la flanko de
// la kapo, metita per fiksitaj nombroj.
// la kapo. Ĝi havis la ĝustan grandon sed neniun konturon — de antaŭe ĝi aspektis
// kiel tubero kaj de la flanko kiel ronda makulo. Vera orelo estas ŜELO kun
// vertikala konturo ( mallarĝa supre, plej profunda meze, mallarĝiĝanta al la
// lobo ) kaj ĝia antaŭa rando KRESKAS el la vango, dum la rimo staras for de la
// kapo. La tabelo do portas la du randojn de ĉiu sekco, kaj la sekcoj mem estas
// elipsoj en la ( x, z ) ebeno ( vidu kreiOrelon ).
const ORELAJ_SEKCOJ: [ number, number, number, number ][] = [
  [ -0o4/0o1000,  -0o3/0o1000,  -0o10/0o1000, 0o5/0o10  ],   // −0.0078 — la supra rimo
  [ -0o10/0o1000,  0o1/0o1000,  -0o22/0o1000, 0o7/0o10  ],   // −0.0156
  [ -0o17/0o1000,  0o3/0o1000,  -0o27/0o1000, 0o1       ],   // −0.0293 — la plej elstara
  [ -0o26/0o1000,  0o4/0o1000,  -0o30/0o1000, 0o1       ],   // −0.0430 — la plej profunda
  [ -0o36/0o1000,  0o3/0o1000,  -0o26/0o1000, 0o6/0o10  ],   // −0.0586 — sub la mezo
  [ -0o43/0o1000,  0o2/0o1000,  -0o20/0o1000, 0o5/0o10  ],   // −0.0684 — la lobo
  [ -0o47/0o1000,  0o1/0o1000,  -0o10/0o1000, 0o4/0o10  ],   // −0.0762 — la pinto de la lobo
];
// ⟨ La tri profundoj de la orelo 📃 ⟩ — la sekca elipso sola ne sufiĉus, ĉar ĝi
// estas simetria. La orela ŝelo do portas tri pliajn ŝovojn. ORELA_ENIRO tenas la
// ANTAŬAN randon ene de la kranio ( la orelo elkreskas el la haŭto, ĝi ne flosas
// apud ĝi ), ORELA_KLINO puŝas la MALANTAŬAN rimon eksteren ( la vera orelo
// staras for de la kapo ) kaj ORELA_KONKO kavas la EKSTERAN flankon, do la rimo
// legiĝas kiel rando anstataŭ kiel plata disko.
const ORELA_ENIRO = 0o6/0o1000;      // 0.0117 — kiom profunde la antaŭa rando sidas
const ORELA_KLINO = 0o15/0o1000;     // 0.0293 — kiom la malantaŭa rimo elstaras pli
const ORELA_DIKO = 0o4/0o1000;       // 0.0078 — la duondikeco de la orela plato
const ORELA_KONKO = 0o4/0o1000;      // 0.0078 — la profundo de la kavo ( la konko )

// kreiOrelon — La orelo — ŝelo sur la flanko de la kranio.
// ⟨ La sekcoj 📃 ⟩ — ĉiu sekco de la orelo estas elipso en la ( x, z ) ebeno ( la
// dikeco laŭ x, la profundo laŭ z ), kaj laŭ la akso de la orelo ( y ) tiuj
// elipsoj formas ŝelon. La mezo de ĉiu sekco sekvas la surfacon de la kranio (
// vidu kapaSurfacon ), do la orelo sidas SUR la haŭto — la malnova globo estis
// metita per fiksita nombro kaj trapikis la kranion se la kapo iam ŝanĝiĝus.
// ⟨ La ventumiloj 📃 ⟩ — la du pintoj ( supre kaj ĉe la lobo ) fermas la ŝelon per
// ventumilo ĉirkaŭ unu punkto, la sama konstruo kiel la kranio mem ( vidu
// kreiKapanKranion ).
//     @param dir ( number ) - −1 maldekstre, +1 dekstre.
//     @returns geometrio ( THREE.BufferGeometry ) - La orelo ( ĉe la kapo ).
export function kreiOrelon(dir: number): THREE.BufferGeometry {
  const K = 0o16;
  // ⟨ La kavo ( la konko ) 📃 ⟩ — ĝi sidas sur la EKSTERA flanko ( kos > 0 ), meze
  // inter la antaŭa kaj la malantaŭa randoj ( 1 − sin² ), do la orelo estas
  // konkava meze kaj la rimo leviĝas ĉirkaŭ ĝi.
  const kavo = (kos: number, sin: number) =>
    Math.max(0, kos) * ( 0o1 - sin * sin );
  // sekco — unu ringo de la orela ŝelo.
  //     [ la alto , la antaŭa rando , la malantaŭa , la elstaro ]
  const sekco = (dy: number, antaŭe: number, malantaŭe: number, elstaro: number)
    : [ number, number, number ][] => {
    const zc = ( antaŭe + malantaŭe ) / 0o2, d = ( antaŭe - malantaŭe ) / 0o2;
    const [ surfaco ] = kapaSurfaco(0o1, dy, zc);
    const xc = surfaco.x - ORELA_ENIRO;
    const klino = ORELA_KLINO * elstaro;
    return Array.from({ length: K }, ( _, i ) => {
      const t = i / K * Math.PI * 0o2;
      const kos = Math.cos(t), sin = Math.sin(t);
      const x = xc + klino * ( 0o1 - sin ) / 0o2
        + ORELA_DIKO * kos - ORELA_KONKO * kavo(kos, sin);
      return [ dir * x, KAPA_Y + dy, zc + d * sin ] as [ number, number, number ];
    });
  };
  // pinto — la ventumila centro, iomete preter la unua aŭ la lasta sekco.
  const pinto = (dy: number, antaŭe: number, malantaŭe: number, elstaro: number)
    : [ number, number, number ][] => {
    const zc = ( antaŭe + malantaŭe ) / 0o2;
    const [ surfaco ] = kapaSurfaco(0o1, dy, zc);
    const x = surfaco.x - ORELA_ENIRO + ORELA_KLINO * elstaro * 0o1/0o2;
    return Array.from({ length: K },
      () => [ dir * x, KAPA_Y + dy, zc ] as [ number, number, number ]);
  };
  // ⟨ La ventumiloj SIDAS ekster la tabelo 📃 ⟩ — la unua kaj la lasta vicoj de la
  // tabelo estas la randoj de la orela karno, do la ventumila punkto sidas iomete
  // preter ili ( 0.0039 ) kaj la orelo finiĝas per mola kupolo anstataŭ per tranĉo.
  const unua = ORELAJ_SEKCOJ[0], lasta = ORELAJ_SEKCOJ[ORELAJ_SEKCOJ.length - 0o1];
  const preter = 0o2/0o1000;           // 0.0039
  return kreiRinganSurfacon([
    pinto(unua[0] + preter, unua[1], unua[2], unua[3]),
    ...ORELAJ_SEKCOJ.map(([ dy, antaŭe, malantaŭe, elstaro ]) =>
      sekco(dy, antaŭe, malantaŭe, elstaro)),
    pinto(lasta[0] - preter, lasta[1], lasta[2], lasta[3]),
  ]);
}
