// ≺⧼ La oraj pilieroj 🏛️ ⧽≻
// La oraj kadraj tuboj laŭ kurbo — la kadroj ( Pilierkadroj, kreiPilierkadrojn ),
// la diamanta svingo ( kreiDiamantanSvingon ), la rondigita diamanta kapo
// ( kreiRondigitanDiamantanKapon ) kaj la tubo mem ( aldoniKadranTubon ).
import * as THREE from "three";
import { kunfandiKajVeldoiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { diamantajDuonoj } from "./formoj.js";

// Pilierkadroj — Ringaj kadroj por la pilieroj. tangento ta, ringa normalo m,
// longa akso L kaj largxa akso W.
export interface Pilierkadroj {
  tangents: THREE.Vector3[];
  moj: THREE.Vector3[];
  Loj: THREE.Vector3[];
  Woj: THREE.Vector3[];
}
// kreiPilierkadrojn — Konstruas la kadrojn. La ringa ebeno estas cxiam
// PERPENDIKULA al la kurbo-tangento (m = ta). La sekco neniam spiralu: cxiu ringo
// ricevas sian orientigxon REKTE el la ekstera akso H — la FRONTA angulo de la
// diamanto estas la projekcio de H sur la ringan ebenon. Tial la fronta kresto
// restas cxiam en la vertikala ebeno kiu enhavas H, kaj la "meza linio" de la
// piliero — tiu kresto — estas perfekte REKTA de la bazo gxis la pinto, trapasante
// la pinton mem. La flankoj restas laux la muroj kaj la kvar pintoj laux la
// diagonaloj, cxu la sxafto rekta, cxu la talona hoko kurbigxas.
// ⟨ Kial ne paralela transporto 📃 ⟩ — la malnova kadro turnis la sekcon nur per
// la rotacio kiu turnas la tangenton. Cxe la hoko tiu rotacio turnigxas cxirkaux
// la LATERALA akso (la turno de la tangento okazas en la ebeno H–y, do la akso
// estas Lr), kaj ruligi la diamanton cxirkaux Lr pusxas la frontan kreston flanken:
// la kresto flankenigxis gxis 0o27/0o1000 — pli ol triono de la loka radiuso cxe la
// malvasta pinto — do la pinto aspektis klinita kaj la meza linio fleksigxis. La
// desegno nun estas funkcio de la tangento mem, sen akumula tordo. (La ankaux
// malnova rekt-projekcio de la FIKSA horizontala Lbazo estis la alia ekstremo: la
// sekco spiralu ~90° cxe la pinto, cxar tie Lbazo preskaux paralelas la tangenton.
// Projekcii H — la frontan akson — evitas ambaux difektojn.)
export function kreiPilierkadrojn(curve: THREE.Curve<THREE.Vector3>, segmentoj: number, H: THREE.Vector3): Pilierkadroj {
  const tangents: THREE.Vector3[] = [], moj: THREE.Vector3[] = [], Loj: THREE.Vector3[] = [], Woj: THREE.Vector3[] = [];
  const V = new THREE.Vector3(), antauxaV = new THREE.Vector3().copy(H);
  const U = new THREE.Vector3(), antauxaU = new THREE.Vector3();
  const L = new THREE.Vector3();
  for ( let i = 0; i <= segmentoj; i++ ) {
    const ta = curve.getTangentAt(i / segmentoj).normalize();
    const m = ta;
    // La fronta angulo: H sen la tangenta komponanto. Nur se la tangento estas
    // preskaux PARALELA al H (neniam okazas cxe tiuj cxi pilieroj — la hoko restas
    // 0o3/0o8 sub la horizonto) la projekcio kolapsas; tiam la pasinta direkto.
    V.copy(H).addScaledVector(m, -H.dot(m));
    if ( V.lengthSq() < 1e-8 ) V.copy(antauxaV).addScaledVector(m, -antauxaV.dot(m));
    if ( V.lengthSq() < 1e-8 ) V.copy(antauxaU);
    V.normalize();
    U.crossVectors(m, V).normalize();
    // La du aksoj estas la DUONANGULOJ de la fronta angulo: tiel la kvar pintoj de
    // la sekco kusxas aux sur la fronta akso (V) aux sur la laterala (U) — la sama
    // orientigxo kiun la baza kadro cxiam havis (H rotaciita je 45°).
    L.addVectors(V, U).multiplyScalar(Math.SQRT1_2);
    const W = new THREE.Vector3().crossVectors(m, L).normalize();
    tangents.push(ta); moj.push(m); Loj.push(L.clone()); Woj.push(W);
    antauxaV.copy(V); antauxaU.copy(U);
  }
  return { tangents, moj, Loj, Woj };
}

// kreiDiamantanSvingon — Kvazaux-tubo laux unu kontinua kurbo kun DIAMANTA sekco
// (ne cirkla). La sxafto enfluas senrompe en pli platan kronon, kiu finigxas per
// malgranda rondigita folio/diamanto, sen degeneraj trianguloj.
export function kreiDiamantanSvingon(
  curve: THREE.Curve<THREE.Vector3>, segmentoj: number, s: number, kadroj: Pilierkadroj,
  talonoS0 = 0, finialaSkalo = 1, finialaLargho = 1, tipLongeco = 0
): THREE.BufferGeometry {
  const duonoj = diamantajDuonoj(s);
  const RINGO = duonoj.length;
  const ringoj = segmentoj + 1;
  // Samplu la kurbon per la sama normaligita parametro kiel la kadrojn, por ke
  // la malnova pincxo cxe la duonlun-forma transiro ne plu aperu.
  const punktoj = Array.from({ length: ringoj }, ( _, i ) => curve.getPointAt(i / ( ringoj - 1 )));
  const vertoj: number[] = [];
  for ( let i = 0; i < ringoj; i++ ) {
    let p = punktoj[i];
    if ( i === segmentoj && tipLongeco > 0 ) {
      p = p.clone().addScaledVector(curve.getTangentAt(1).normalize(), -tipLongeco);
    }
    const L = kadroj.Loj[i], W = kadroj.Woj[i];
    // ⟨ Unu sola konturo 📃 ⟩ — la sama sekco por ĉiu ringo, de la bazo ĝis la
    // pinto. La antaŭa kodo morfe miksis du KONTOUROJN kun malsamaj punkt-ordonoj
    // ( la akran kaj la "rondigitan" ), kaj tiu miksajxo kavigis la lastajn
    // 0o1/0o20 Peuojn de la bazo — la bazo aspektis distordita. Nun la sekco mem
    // havas la rondigitajn angulojn, do neniu transiro necesas.
    const konturo = duonoj;
    // La sekco restas plena laux la sxafto kaj iom post iom transiras al la
    // pli plata krono per glata Hermita funkcio.
    const t = i / ( ringoj - 1 );
    const u = talonoS0 > 0 ? Math.max(0, Math.min(1, ( t - talonoS0 ) / ( 1 - talonoS0 ))) : 0;
    // La krono malvastigxas glate al la malgranda rondigita pinto, sen kunfalo
    // de la fina ringo en degenerajn triangulojn.
    const glata = u * u * ( 3 - 2 * u );
    // ⟨ Kial la larĝo NE multiplikiĝas 📃 ⟩ — `largxaSkalo` estas la REKTA skalo de
    // la W-akso, ne faktoro de `skalo`. La malnova `skalo * largxaSkalo` multiplikis
    // la du malvastigojn: kun finialaSkalo = finialaLargho = 0o1/0o10 la sekco ĉe la
    // pinto estis 8-obla ortangulo (0o1/0o10 × 0o1/0o100) anstataŭ kvadrato, do la
    // pinto finiĝis per maldika PLATA LAMENO — ĝi aspektis kiel ortangulo el ĉiu
    // flanka angulo. Nun la du aksoj malvastiĝas egale, kiel la komento promesas.
    const skalo = talonoS0 > 0 ? 1 - ( 1 - finialaSkalo ) * glata : 1;
    const largxaSkalo = talonoS0 > 0 ? 1 - ( 1 - finialaLargho ) * glata : 1;
    for ( const [ a, c ] of konturo ) vertoj.push(
      p.x + L.x * a * skalo + W.x * c * largxaSkalo,
      p.y + L.y * a * skalo + W.y * c * largxaSkalo,
      p.z + L.z * a * skalo + W.z * c * largxaSkalo
);
  }
  const indeksoj: number[] = [];
  for ( let i = 0; i < segmentoj; i++ ) {
    const r0 = i * RINGO, r1 = ( i + 1 ) * RINGO;
    for ( let j = 0; j < RINGO; j++ ) {
      const j2 = ( j + 1 ) % RINGO;
      indeksoj.push(r0 + j, r1 + j, r1 + j2, r0 + j, r1 + j2, r0 + j2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertoj), 3));
  g.setIndex(indeksoj);
  g.computeVertexNormals();
  return g;
}



// kreiRondigitanDiamantanKapon — Ferma kapo kun rondigitaj diamanto-anguloj,
// sen aldonaj ringoj aux centra ventumilo. la svingo jam liveras la flankojn,
// kaj cxi tiu formo nur fermas la ringon. renversita kontrolas la frontan
// direkton. false frontas kontraux la tangento (la bazo de la piliero), true
// frontas laux la tangento (la folia pinto).
export function kreiRondigitanDiamantanKapon(
  p: THREE.Vector3, ta: THREE.Vector3, n: THREE.Vector3, b: THREE.Vector3, s: number,
  longaSkalo: number, largxaSkalo: number, renversita = false
): THREE.BufferGeometry {
  const formo = new THREE.Shape();
  const punktoj = diamantajDuonoj(s);
  const konturo = renversita ? [ ...punktoj ].reverse() : punktoj;
  // La sama korekto kiel en kreiDiamantanSvingon: la larĝa skalo aplikiĝas memstare
  // (la malnova produto faris la finan ĉapon 8-obla lameno — la "ortangula pinto").
  formo.moveTo(konturo[0][0] * longaSkalo, konturo[0][1] * largxaSkalo);
  for ( const [ a, c ] of konturo.slice(1) ) formo.lineTo(a * longaSkalo, c * largxaSkalo);
  formo.closePath();
  const kapo = new THREE.ShapeGeometry(formo);
  kapo.applyMatrix4(new THREE.Matrix4().makeBasis(n, b, ta));
  // La cxapo sidas gxuste sur la fina ringo. la flankajxo estas malfermita cxe
  // tiu ebenajxo, do ne estas dua samloka surfaco kiu povus z-fajfi aux desegni
  // krucan X.
  kapo.translate(p.x, p.y, p.z);
  return kapo;
}

//     @param fora ( number = 0o101/0o1000 ) - Kiom la sxafto staras EKSTER la
//              donita linio ( cX, cZ ). La konstruajxoj pasigas sian mur-facon,
//              do la piliero algluiĝas al ĝi; la PONTA balustrado pasigas la
//              randon de la deko kun fora = 0, do la fosto staras SUR la deko.
export function aldoniKadranTubon(geos: THREE.BufferGeometry[], cX: number, cZ: number, yB: number, yT: number, sX: number, sZ: number, upward: boolean, klino = 0, folio = true, fora = 0o101/0o1000): void {
  // La finialo estas TALONA HOKO kun glata, iom ronda krono kaj rondigitaj
  // anguloj cxe la folia/diamanta supro. La sekco transiras seninterrompe al la
  // malgranda antauxenpusxita finajxo; gxi ne estas trancxita plata aux akra.
  // out = 0o7/0o20. la hoka pinto elstaras ~0o1/0o2 de la angulo.
  const out = 0o7/0o20;
  // fora = 0o101/0o1000. la sxafto RXUSTAS sur la muro-faco (~0o1/0o400 libero):
  // la diamanta sekco estas 0.1237 duon-larĝa, do 0.127 lasas la ebenan flankon
  // 0.0033 ekster la muro — la piliero legiĝas KUNLIPITA al la konstruajxo, sen
  // fendiĝi videble. ( La antaŭa 0o51/0o400 = 0.159 lasis 0.035 — kvarcentonon da
  // muro da videbla fendo, kiu legiĝis kiel aparta stango apud la domo. )
  // Sub-teraj (malsuprenirantaj) pilieroj bezonas pli da libero. cxe la mallongaj
  // sub-teraj tavoloj la pli malgranda fora enigus la diamanton en la muro-facon
  // (la malnova 0o25/0o200 donas +0.0028; 0o51/0o400 klipus je -0.0013).
  const foraSub = 0o25/0o200;
  const cXT = cX - sX * klino, cZT = cZ - sZ * klino;
  // Sxafto KLINITA samkiel la muroj. rekta linio PARALELA al la klinita muro (ne
  // vertikala), do la libero al la muro restas konstanta lauxlonge kaj la piliero
  // sidas apud la muro cxie — neniu kreskanta truo inter piliero kaj muro.
  // La malsuprenirantaj (flipped) pilieroj estas la PRECIZA vertikala spegulo de
  // la suprenirantaj — la samaj formoj ambauxflanke de la sxipo.
  const tieroAlto = yT - yB;
  // Komuna talona kurbo — supren kaj la vertikala spegulo malsupren. rekta sxafto
  // PARALELA al la klinita muro (samaj deklivoj — neniu kreskanta truo inter
  // piliero kaj muro), kiu cxe la rando komencigas unu glatan suprenan svingon.
  // La unua kontrolo kusxas SUR la sxafto-direkto, do la kurbigxo komencigxas glate
  // (C¹, neniu angulo). La arko levigxas al iom rondigita folia/diamanta krono,
  // sen ekzakte plata supro. La malsupra versio estas la vertikala spegulo de la
  // supra — la samaj formoj ambauxflanke de la sxipo.
  // ⟨ La PINTO 📃 ⟩ — la hoko mem restas kiel gxi estis (la formo kaj la finpunktoj
  // estas bonaj). La difekto estis la SEKC-KONVERGXO, ne la kurbo. Du aferoj igis la
  // pinton aspekti ortangula: unue `finialaSkalo` malgrandigis la diamanton nur al
  // 0o1/0o4 (37.5%), do la piliero finigxis per preskaŭ plenlarĝa bloko; due — kaj
  // cxe CXIuj valoroj — la larĝa skalo MULTIPLIKIGXIS kun la longa (vidu la riparon
  // en kreiDiamantanSvingon), do la sekco mem estis 0o10-obla ortangulo cxe la pinto.
  // Nun ambaŭ aksoj malgrandigxas egale al OKONO de la larĝo, do la hoko vere
  // PINTIGXAS iom rondigita de la malgranda kapo (kreiRondigitanDiamantanKapon),
  // ne plata. 0o1/0o10 = 12.5% — la sama valoro por ambaŭ aksoj, kiel la sekcio
  // postulas por resti kvadrata.
  const kreiTalonanKurbo = (): { curve: THREE.Curve<THREE.Vector3>; talonoS0: number } => {
    // Sxafto. komencu GXUSTE cxe la bazo (supren) aux cxe la supro (spegule) gxis
    // la tavolo-rubo, kie la hoko komencigxas — nenio elstaras SUB la bazo (la
    // diamanta spegulo reflektus tian elstarajxon SUPER la grundon, apud la
    // pilier-bazo). La linia proporcio estas la SAMA por ambaux direktoj
    // (spegulitaj y-oj), do la rekto restas paralela al la muro la tutan sxafton.
    const yA = upward ? yB : yT;
    const yS = upward ? yT - 0o1/0o4 : yB + 0o1/0o4;
    const yF = upward ? yT + 0o3/0o10 : yB - 0o3/0o10;
    const linia = ( tieroAlto - 0o1/0o100 ) / tieroAlto;
    const suproX = cX + sX * ( fora - klino * linia );
    const suproZ = cZ + sZ * ( fora - klino * linia );
    const p0 = new THREE.Vector3(cX + sX * fora, yA, cZ + sZ * fora);
    const p1 = new THREE.Vector3(suproX, yS, suproZ);
    const p2 = new THREE.Vector3(cXT + sX * out, yF, cZT + sZ * out);
    const dx = p1.x - p0.x, dy = p1.y - p0.y, dz = p1.z - p0.z;
    const direkto = new THREE.Vector3(dx, dy, dz).normalize();
    // Unu rekta sxafto kaj unu kubika hoko. la unua kontrolo de la hoko kusxas
    // sur la sxafto-direkto, do la kunigxo estas C¹ kaj ne montras angulon.
    // La dua kontrolo estas iom sub la pinto, por ke la supro estu ronda
    // folio/diamanto, ne ekzakte horizontala kaj ne trancxite plata.
    const hoko = new THREE.CubicBezierCurve3(
      p1,
      p1.clone().addScaledVector(direkto, 0o3/0o20),
      new THREE.Vector3(p2.x - sX * 0o3/0o20, p2.y + ( upward ? -0o1/0o40 : 0o1/0o40 ), p2.z - sZ * 0o3/0o20),
      p2
);
    const putho = new THREE.CurvePath<THREE.Vector3>();
    // ⟨ La bazo iras REKTE MALSUPREN 📃 ⟩ — la sxafto mem, sen ia ajn levigxo aux
    // plilargxigxo cxe la fino. La bazo do finigxas per la sama diamanta sekco kiel
    // la tuta piliero, kaj la rondigita ferma kapo ( kreiRondigitanDiamantanKapon )
    // glatigas la finon mem — neniu aparta piedo aux funelo, kiu rompus la rektan
    // silueton de la piliero.
    putho.add(new THREE.LineCurve3(p0, p1));
    putho.add(hoko);
    // La malvastigxo komencigxas gxuste cxe la pli malalta sxultro, laux la arka
    // longo de la tuta kontinua kurbo.
    const shaftLen = p0.distanceTo(p1);
    const tutaKurbaLongeco = putho.getLength();
    return { curve: putho, talonoS0: tutaKurbaLongeco > 0 ? Math.min(0o7/0o10, shaftLen / tutaKurbaLongeco) : 0 };
  };
  // Sub-teraj (entombigitaj) pilieroj restas simplaj unu-becieraj tuboj (folio=false).
  const subtera = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(cX + sX * foraSub, yT - 0o1/0o100, cZ + sZ * foraSub),
    new THREE.Vector3(cXT + sX * foraSub, yB + 0o15/0o40, cZT + sZ * foraSub),
    new THREE.Vector3(cXT + sX * out, yB - 0o3/0o10, cZT + sZ * out)
);
  const folia = upward || folio ? kreiTalonanKurbo() : null;
  const curve = folia ? folia.curve : subtera;
  const talonoS0 = folia ? folia.talonoS0 : 0;
  // Pli dika diamanta sekco (ne ronda tubo). Uzu la SAMAjn tordo-reduktajn
  // kadrojn kiel la svingo, por ke la kapringoj precize kongruu (neniu spiralo).
  const s = 0o7/0o40;
  // Elira direkto H — la ekstera diagonalo de la angulo. La diamantaj pintoj
  // restas laux la diagonaloj kaj la flankoj laux la muroj ( la sama orientigxo
  // kiel la sxafto ), cxu la sxafto rekta, cxu la talona hoko kurbigxas.
  const H = new THREE.Vector3(sX, 0, sZ).normalize();
  // Pli densaj ringoj por la finialo (0o140). la hoko okupas nur la finan arkon,
  // do la krono ricevas suficxe da ringoj por esti glata kaj milde rondigita (ne
  // plata aux pincxita), dum la sxafto restas glata diamanto. La entombigitaj
  // pilieroj restas malpezaj (0o40).
  const SEG = upward || folio ? 0o140 : 0o40;
  const kadroj = kreiPilierkadrojn(curve, SEG, H);
  // Unu UNUIGITA aseto po piliero. la svingo (tubo) kaj la fermaj kapoj estas
  // kunfanditaj en UNU geometrion tuj cxi tie — ne pluraj apartaj partoj.
  // Cxiu piliero do estas unusola, memstara peco, identa por konstruajxoj kaj
  // por la spacosxipo (la sama reuzebla aseto ambauxflanke).
  const partoj: THREE.BufferGeometry[] = [];
  if ( upward || folio ) {
    // La supra parto estas duonluno. gxi eliras per kontinua tangento el la
    // sxafto, havas pli platan kronon, kaj finigxas per malgranda rondigita pinto.
    // Ambaux aksoj samgrade sxrumpas, do la fino ne aspektas plata aux trancxita.
    const finialaSkalo = 0o1/0o10, finialaLargho = 0o1/0o10, tipLongeco = 0o1/0o100;
    partoj.push(kreiDiamantanSvingon(curve, SEG, s, kadroj, talonoS0, finialaSkalo, finialaLargho, tipLongeco));
    // Rondigita ferma kapo cxe la bazo (frontas kontraux la tangento, for de la
    // sxafto) — la malnova angula ventumilo lasis kvadratan randon cxe la fino.
    // ⟨ La baza kapo restu APARTA 📃 ⟩ — se oni veldus gxin kun la tubo, la
    // komunaj normaloj de la rando mezanigus la ebenan baz-facon kun la flankaj
    // normaloj de la tubo, kaj la bazo aspektus KAVIGITA kaj distordita ( la sama
    // kialo, pro kiu la pinta kapo jam restas aparta ). Konsekvence la bazo
    // legigxas kiel pura, plata tranĉo sur la grundo.
    const bazaKapo = kreiRondigitanDiamantanKapon(curve.getPointAt(0), kadroj.tangents[0], kadroj.Loj[0], kadroj.Woj[0], s, 1, 1);
    const tipaCentro = curve.getPointAt(1);
    const tipaRingo = tipaCentro.clone().addScaledVector(kadroj.tangents[SEG], -0o1/0o100);
    // La svingo finigxas cxe tipaRingo kaj la unu sola plata cxapo estas iomete
    // antaux gxi. Ne kreu duan ringaron aux samlokan kapon. tio estis la fonto de
    // la krucita finajxo.
    const finaKapo = kreiRondigitanDiamantanKapon(tipaRingo, kadroj.tangents[SEG], kadroj.Loj[SEG], kadroj.Woj[SEG], s, finialaSkalo, finialaLargho, true);
    // La plata cxapo restu aparta, por ke gxi ne ricevu la flankajn normalojn de
    // la tubo kaj ne montrigxu kiel krucita X.
    geos.push(kunfandiKajVeldoiGeometriojn(partoj));
    geos.push(bazaKapo, finaKapo);
  } else {
    // Sub-teraj (entombigitaj) pilieroj restas simplaj diamantaj tuboj kun
    // rondigitaj fermitaj kapoj (bazo frontas kontraux la tangento, pinto laux gxi).
    partoj.push(kreiDiamantanSvingon(curve, SEG, s, kadroj));
    partoj.push(kreiRondigitanDiamantanKapon(curve.getPointAt(0), kadroj.tangents[0], kadroj.Loj[0], kadroj.Woj[0], s, 1, 1));
    partoj.push(kreiRondigitanDiamantanKapon(curve.getPointAt(1), kadroj.tangents[SEG], kadroj.Loj[SEG], kadroj.Woj[SEG], s, 1, 1, true));
  }
  // Kunfandi KAJ VELDI la kontinuajn partojn en unu geometrion. La supra plata
  // cxapo estis jam aldonita aparte supre, por ke gxiaj normaloj restu ebenaj.
  if ( !( upward || folio ) ) geos.push(kunfandiKajVeldoiGeometriojn(partoj));
}
