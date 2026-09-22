// ≺⧼ Satalaj konstruaĵoj 🏛️ ⧽≻
// Sxtupajramidaj konstruajxoj. verdaj/oraj domoj (kapuo), brunaj/becxaj mangxejoj
// (kahxjenko), becxaj kasafeoj (kunvenoĉambroj) kun oraj pilieroj.
// La zigurato nomigxas satal ( j͑ʃᴜ ɭʃᴜͷ̗ ) en Iikrhia. noma formo. satalo.
import * as THREE from "three";
import { generiSkribanTeksajxon } from "../komunajxoj/skripto-rivelilo.js";
import { nomoAih } from "../../src/tradukoj.js";
import { kunfandiGeometriojn, kunfandiKajVeldoiGeometriojn } from "../komunajxoj/kunfandajxoj.js";
import { kreiPordanMaterialon, kreiFenestranMaterialon, kreiOranMaterialon } from "../komunajxoj/materialoj.js";
import { kreiPilolFenestranFormon, kreiStelanFenestranFormon, kreiRondigitanRektangulanFormon,
  rondigiKonturon } from "../komunajxoj/formoj.js";
import { aldoniManĝtablon, LIGNA_KOLORO } from "../mebloj/tabloj.js";

export interface KonstruTipo { labelKey: string; wall: number; frame: number; chip: string; flavorKey: string; }
export const TIPARO: Record<string, KonstruTipo> = {
  domo:   { labelKey: "tipDomo",      wall: 0x184838, frame: 0xd8b068, chip: "#78a88880", flavorKey: "flvDomo" },
  mangxejo:  { labelKey: "tipMangxejo",  wall: 0x584028, frame: 0xd8c898, chip: "#c8a86880", flavorKey: "flvMangxejo" },
  kasafeo: { labelKey: "tipKasafeo",    wall: 0xd8c898, frame: 0xd8b068, chip: "#e0d0a880", flavorKey: "flvKasafeo" },
  stacioxipo: { labelKey: "tipStacioxipo", wall: 0xc8c8c8, frame: 0xd8b068, chip: "#c8c8c880", flavorKey: "flvStacioxipo" },
  turo:   { labelKey: "tipTuro",        wall: 0x205040, frame: 0xd8b068, chip: "#88b8a080", flavorKey: "flvTuro" },
  sanktejo: { labelKey: "tipSanktejo",  wall: 0x184038, frame: 0xe0c078, chip: "#e0c07880", flavorKey: "flvSanktejo" },
};

export interface KonstruSpec { x: number; z: number; type: string; name: string; niveloj: number; w: number; d: number; tieroAlto: number; sube?: number; tieroAltoSub?: number; rot: number; fixed?: string; h0?: number; diamond?: boolean; flugoY?: number; }

// konstruajxaMaterialo — La komuna materiala cacheo de la satalaj konstruajxoj.
// La sama ( tipo, koloro ) kombinajxo aperas en dekdekon da konstruaĵoj — la
// cacheo redonas UNU materialon po ŝlosilo anstataŭ freŝa materialo po voko
// ( malpli da materialoj = malpli da ŝanĝoj de materialo inter desegno-vokoj ).
const konstruajxaMaterialaStoko = new Map<string, THREE.MeshStandardMaterial>();
function konstruajxaMaterialo(ŝlosilo: string, krei: () => THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  let m = konstruajxaMaterialaStoko.get(ŝlosilo);
  if ( !m ) { m = krei(); konstruajxaMaterialaStoko.set(ŝlosilo, m); }
  return m;
}

// La klino de la tieraj muroj — kiom la muroj malleviĝas INTERNEN dum unu tiera
// alto. La pordo sur la teretaĝa muro kliniĝas laŭ la SAMA valoro ( vidu
// aldoniEnirejon ), do ĝi restas paralela al la muro.
const MURA_KLINO = 0o5/0o20;

// La rondigita kvadrata formo ( kreiRondigitanRektangulanFormon ) venas el la
// komuna forma modulo — la sama formo kiel la vojoj, dividita inter ili.
function rondigitaTrapezaFormo(blokoLargho: number, tw: number, h: number, rb: number, rt: number): THREE.Shape {
  const s = new THREE.Shape(), sl = ( blokoLargho / 2 - tw / 2 ) / h;
  s.moveTo(-blokoLargho / 2 + rb, 0); s.lineTo(blokoLargho / 2 - rb, 0);
  s.quadraticCurveTo(blokoLargho / 2, 0, blokoLargho / 2 - sl * rt, rt);
  s.lineTo(tw / 2 + sl * rt, h - rt); s.quadraticCurveTo(tw / 2, h, tw / 2 - rt, h);
  s.lineTo(-tw / 2 + rt, h); s.quadraticCurveTo(-tw / 2, h, -tw / 2 - sl * rt, h - rt);
  s.lineTo(-blokoLargho / 2 + sl * rb, rb); s.quadraticCurveTo(-blokoLargho / 2, 0, -blokoLargho / 2 + rb, 0);
  return s;
}

// kreiKlinoTavolon — Kvadrata tavolo kun klinitaj muroj. la supro estas pli
// mallargxa ol la bazo, do cxiu tavolo aspektas kiel trapezoido.
// 4-segmenta cilindro donas precize kvadratan frustumon (cxiuj konstruajxoj estas kvadrataj).
// Eksportita por ke la spacosxipo reuzu la samajn tavolojn.
export function kreiKlinoTavolon(hwB: number, hdB: number, hwT: number, hdT: number, alto: number): THREE.BufferGeometry {
  const rB = Math.max(0o1/0o20, Math.hypot(hwB, hdB));
  const rT = Math.max(0o1/0o20, Math.hypot(hwT, hdT));
  const g = new THREE.CylinderGeometry(rT, rB, alto, 4, 1);
  g.rotateY(Math.PI / 4);
  return g;
}

// kreiSteleanFormon — Vertikala signa plato kun nesimetriaj rondigitaj supraj
// anguloj (r1 ≠ r2) kaj rektaj malsupraj anguloj. Uzata por la steloj.
// ⟨ Kiu angulo rondigxas 📃 ⟩ — la GRANDA rondo ( r1 ) sidas cxe la maldekstra
// supra angulo vidate de la fronto ( +z ), la malgranda ( r2 ) cxe la dekstra;
// la plato do kliniĝas maldekstren. Speguli la signon signifas nur interŝanĝi la
// du radiusojn cxe la alvokoj — la formo mem restas nesimetria.
// La pilola fenestra formo ( kreiPilolFenestranFormon ) venas el formoj.js —
// la komuna modulo, por ke interno kaj la konstruajxoj uzu la saman formon.
function kreiSteleanFormon(w: number, h: number, r1: number, r2: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 2;
  s.moveTo(-hw, 0);
  s.lineTo(hw, 0);
  s.lineTo(hw, h - r2);
  s.absarc(hw - r2, h - r2, r2, 0, Math.PI / 2, false);
  s.lineTo(-hw + r1, h);
  s.absarc(-hw + r1, h - r1, r1, Math.PI / 2, Math.PI, false);
  s.closePath();
  return s;
}// ⟨ La sekco de la pilieroj 📃 ⟩ — diamantajDuonoj. Kvar pintoj je 45° alfrontas la
// murojn, sed la ORAJ anguloj estas rondigitaj per veraj cirklaj arkoj, do la kvar
// flankoj restas PLENE EBENAJ kaj la sekco estas konveksa cxie —
// neniu konkaveco. La konturo komencas cxe la fronta akso ( 0° ) kaj iras horlogxe.
//
// ⟨ Kial ne CatmullRom-tondado 📃 ⟩ — la antaŭa funkcio rondigis la angulojn per
// centripeta CatmullRom-kurbo tra la angulaj punktoj. Tiu kurbo tamen trafas
// precize la SAMajn punktojn ( la punktoj estas egale disigitaj laŭ la perimetro ),
// do ĝi efektive NENION rondigis — ĝi nur trenis la kvar angulojn akraj kaj lasis
// la flankojn iom svingiĝi. La sekco do aspektis faceta, kaj la velditaj normaloj
// ĉe la bazo kavigis la baz-facon. Nun la anguloj estas veraj arkoj ( radiuso rc )
// kaj la flankoj restas ebenaj.
//     @param s ( number ) - La duon-diagonalo de la diamanto ( la anguloj ).
//     @param rc ( number ) - La radiuso de la rondigitaj anguloj.
//     @returns punktoj - La 0o24 konturaj punktoj, en ordo ( horlogxe ).
function diamantajDuonoj(s: number, rc = 0o1/0o20): [ number, number ][] {
  const d = s * Math.SQRT1_2;
  const kvar: [ number, number ][] = [ [ d, -d ], [ -d, -d ], [ -d, d ], [ d, d ] ];
  // Tri paŝoj sur ĉiu angula arko ( do kvar punktoj ) kaj unu punkto meze de ĉiu
  // ebena flanko. La anguloj kaj la flankoj do havas po la saman konturon ĉe la
  // tubo, ĉe la baza kapo kaj ĉe la pinta kapo — ili kongruas precize.
  const ARKOJ = 3, FLATAJ = 1;
  const punktoj: [ number, number ][] = [];
  for ( let j = 0; j < kvar.length; j++ ) {
    const a = kvar[j];
    const antauxa = kvar[( j + kvar.length - 1 ) % kvar.length];
    const sekva = kvar[( j + 1 ) % kvar.length];
    // u — la direkto de la alvenanta rando, v — de la foriranta.
    const u = new THREE.Vector2(a[0] - antauxa[0], a[1] - antauxa[1]).normalize();
    const v = new THREE.Vector2(sekva[0] - a[0], sekva[1] - a[1]).normalize();
    // La arka centro sidas rc for de AMBAŬ randoj, do la arko tanĝas ilin sen
    // angulo. La arko iras de la tanĝa punkto ĉe la alvenanta rando al la tanĝa
    // punkto ĉe la foriranta, kaj la angulo malpliiĝas ( la konturo iras horlogxe ).
    const centro = [ a[0] + rc * ( v.x - u.x ), a[1] + rc * ( v.y - u.y) ];
    const komencaAngulo = Math.atan2(-v.y, -v.x);
    for ( let k = 0; k <= ARKOJ; k++ ) {
      const angulo = komencaAngulo - k / ARKOJ * Math.PI / 2;
      punktoj.push([ centro[0] + rc * Math.cos(angulo), centro[1] + rc * Math.sin(angulo) ]);
    }
    // La ebena flanko inter ĉi tiu arko kaj la sekva.
    const rando = new THREE.Vector2(sekva[0] - a[0], sekva[1] - a[1]);
    const longeco = rando.length() - 2 * rc;
    for ( let k = 1; k <= FLATAJ; k++ ) {
      punktoj.push([
        a[0] + v.x * rc + v.x * longeco * k / ( FLATAJ + 1 ),
        a[1] + v.y * rc + v.y * longeco * k / ( FLATAJ + 1 ),
      ]);
    }
  }
  return punktoj;
}

// Pilierkadroj — Ringaj kadroj por la pilieroj. tangento ta, ringa normalo m,
// longa akso L kaj largxa akso W.
interface Pilierkadroj {
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
function kreiPilierkadrojn(curve: THREE.Curve<THREE.Vector3>, segmentoj: number, H: THREE.Vector3): Pilierkadroj {
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
function kreiDiamantanSvingon(
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
    // milimetrojn de la bazo — la bazo aspektis distordita. Nun la sekco mem
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
function kreiRondigitanDiamantanKapon(
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

// ⟨ La pilol-fenestroj 📃 ⟩ — la sama LONGAs horizontala rondigita fenestro kun ora
// rando aperas sur la kosmosxipo, sur la kunvenejo ( kasafeo ) kaj sur la
// stacidomo ( stacioxipo ). La meto estas la delikata parto: la monto-grupo sidas
// ĉe la fenestra SUBO, do ĝia z-offset devas esti la muro-radiuso TIE — ne la
// radiuso ĉe la fenestra CENTRO ( lv.faco ). Ĉar ĉiu tavolo malvastiĝas supren per
// `klino`, la muro ĉe la fenestra subo estas klino·fenAlto/(2·tieroAlto) pli
// larĝa ol la centro-radiuso: kun la centro-radiuso la supraj fenestroj
// entombiĝis 0.0115 en la muron ( kaj la spegulitaj subaj flosis 0.043 eksteren )
// — ili tute ne montriĝis. La tri lokoj antaŭe kalkulis tion mem; nun unu helpilo.
const fenProud = 0o1/0o100;

// kadroRondigo — Kiom granda la glata tranĉo ĉe ĉiu angulo de la stela fenestra
// kadro ( la bendo, la pintoj kaj iliaj ŝultroj ). La antaŭa kadro havis akrajn
// angulojn ĉe ĉiu pinto kaj ĉe ĉiu ŝultro.
const kadroRondigo = 0o1/0o20;

// fenestraSubFaco — La muro-radiuso ĉe la fenestra SUBO, plus eta elstaro antaŭen.
//     @param facaRadiuso ( number ) - La muro-radiuso ĉe la fenestra CENTRO.
//     @param suba ( boolean ) - Ĉu la tavolo speguliĝas: malsuprenirantaj tavoloj
//              malvastiĝas malsupren, do tie la signo de la klino inversiĝas.
export function fenestraSubFaco(facaRadiuso: number, klino: number, fenAlto: number,
  tieroAlto: number, suba = false
): number {
  const klinaAngulo = Math.atan(klino / tieroAlto);
  return facaRadiuso + ( suba ? -1 : 1 ) * klino * fenAlto / ( 2 * tieroAlto )
    + fenProud / Math.cos(klinaAngulo);
}

// fenestraMargxeno — La horizontala interspaco ĉe ĉiu flanko de la fenestro.
// ⟨ UNU nombro por la tuta konstruaĵo 📃 ⟩ La marĝeno estas kalkulita UNUFOJE kaj
// ĉiu tavolo ricevas precize tiun nombron, sen multipliko aux divido per sia propra
// faco. La libera spaco ĉe la anguloj estas do la SAMA nombro sur ĉiu tavolo kaj ĝi
// VIDEBIAS ie ajn. La fenestra alto ne ŝanĝiĝas de tavolo al tavolo, do la fenestroj
// mallongiĝas precize per la sama kvanto, kiun mallongiĝas la tavoloj.
// ⟨ Kiom granda 📃 ⟩ 0o2/0o10 de la muro-radiuso de la PLEJ LARĜA ( teretaĝa ) faco,
// t.e. 0o1/0o10 de la faco ĉe ĉiu flanko — la fenestro do okupas 0o6/0o10 de la
// plej larĝa faco kaj 0o1/0o10 da libera muro restas ĉe ĉiu flanko.
// ⟨ Kial ne el la pinta tavolo 📃 ⟩ Se la marĝeno estus kalkulita el la plej
// mallarĝa tavolo, la nombro estus tiel malgranda ( 0.4 sur la kunvenejo ), ke la
// ora kadro plenigus la tutan liberan spacon kaj la fenestro aspektus kiel la tuta
// muro — la interspaco tute ne videblus. Anstataŭe la tro mallarĝaj tavoloj restas
// SEN fenestro ( vidu konstruiSatalon ).
//     @param facaRadiusoLarga ( number ) - La muro-radiuso de la plej larĝa
//              ( teretaĝa ) tavolo, kie fenestroj estas.
//     @returns marĝeno ( number ) - La interspaco po flanko, por ĉiuj tavoloj.
export function fenestraMargxeno(facaRadiusoLarga: number): number {
  return facaRadiusoLarga * 0o2/0o10;
}

// fenestraLargho — Kiom longa fenestro taŭgas sur tiu faco.
// ⟨ Kun marĝeno 📃 ⟩ La fenestro estas la tuta faco minus la marĝeno ĉe ambaŭ
// flankoj. Se tio estus pli mallonga ol la fenestra alto, la alvokanto simple
// malhavas la fenestron sur tiu tavolo — pli bone nenia fenestro ol stumpo.
// ⟨ Sen marĝeno 📃 ⟩ La malnova laŭtavola regulo, por alvokantoj, kiuj volas
// siajn proprajn proporciojn ( nun neniu — ĉiuj pasigas la marĝenon ).
export function fenestraLargho(facaRadiuso: number, fenAlto: number, margxeno?: number): number {
  if ( margxeno !== undefined ) return facaRadiuso * 2 - margxeno * 2;
  return Math.min(facaRadiuso * 2 - 0o3/0o10, facaRadiuso * 4/3 + 0o1/0o4, fenAlto * 9);
}

// aldoniPilolFenestron — Metu unu pilol-fenestron sur unu facon de unu tavolo.
//     @param suba ( boolean = false ) - Ĉu la tavolo speguliĝas malsupren.
//     @param margxeno ( number, nedeviga ) - La sama horizontala interspaco por
//              ĉiuj tavoloj de konstruaĵo ( vidu fenestraMargxeno ). Sen ĝi la
//              malnova laŭtavola regulo validas.
//     @param vertikala ( boolean = false ) - Ĉu la fenestro staras VERTIKALE.
//              ⟨ Kiam ĝi utilas 📃 ⟩ Sur la plej mallarĝaj tavoloj horizontala
//              fenestro ne plu enirus kun la sama marĝeno, sed la sama fenestro
//              turnita per 90° ankoraŭ havas lokon — la tavola alto donas la
//              longan mezuron. La mallonga mezuro restas la fenestra alto, do la
//              fenestroj aspektas samaj, nur staras vertikale.
//     @returns La vitro-panelo ( la kosmosxipo kolektas ilin por la flug-pulso ).
export function aldoniPilolFenestron(
  group: THREE.Group, kadraMaterialo: THREE.MeshStandardMaterial,
  fenestraMaterialo: THREE.MeshStandardMaterial,
  facoIndekso: number, yCentro: number, facaRadiuso: number,
  klino: number, tieroAlto: number, fenAlto: number, suba = false, margxeno?: number,
  vertikala = false
): THREE.Mesh {
  const klinaAngulo = Math.atan(klino / tieroAlto);
  // ⟨ La longa mezuro 📃 ⟩ Horizontale ĝi venas el la faco minus la marĝeno.
  // Vertikale ĝi estas du fenestraj altoj — la sama fenestro, nur turnita, do ĝi
  // restas kompakta anstataux longa fendo en la tuta tavola alto.
  const ww = vertikala ? fenAlto * 0o2 : fenestraLargho(facaRadiuso, fenAlto, margxeno);
  // ⟨ La vertikala mezuro de la fenestro 📃 ⟩ Por la monto-grupo gravas ĉi tiu,
  // ne la longa — la grupo sidas ĉe la fenestra SUBO kaj la fenestro estas
  // centrita en la tavolo.
  const fenAltoTuta = vertikala ? ww : fenAlto;
  // La faco-grupo turnas la fenestron al sia muro; la monto-grupo sidas ĉe la
  // fenestra SUBO kaj kliniĝas ĉirkaŭ la propra centro, do la fenestro kuŝas
  // plate sur la klinita muro ( ne svingiĝas ĉirkaŭ la konstruaĵa origino ).
  const faco = new THREE.Group();
  faco.rotation.y = facoIndekso * Math.PI / 2;
  const monto = new THREE.Group();
  monto.position.set(0, yCentro - fenAltoTuta / 2,
    fenestraSubFaco(facaRadiuso, klino, fenAltoTuta, tieroAlto, suba));
  monto.rotation.x = suba ? klinaAngulo : -klinaAngulo;
  faco.add(monto);
  // Densa sampado de la pilolo — la arkoj aspektas RONDIGITAJ ( la malnova
  // 0o24 lasis la duoncirklajn finojn facete poligonaj ).
  // ⟨ La vertikala turno 📃 ⟩ La tuta formo ( la vitro kaj la kadro ) estas la
  // sama, nur turnita per 90° ĉirkaŭ la monto-najbaro — poste oni ŝovas ĝin reen
  // al la monto-origino, ĉar la turno metus la vitro-subon dekstren.
  const formo = kreiPilolFenestranFormon(ww, fenAlto);
  const fenGeometrio = new THREE.ShapeGeometry(formo, 0o100);
  if ( vertikala ) {
    fenGeometrio.rotateZ(Math.PI / 2);
    fenGeometrio.translate(fenAlto / 2, ww / 2, 0);
  }
  const fen = new THREE.Mesh(fenGeometrio, fenestraMaterialo);
  monto.add(fen);
  // ⟨ La ora kadro estas PLATA PLATO 📃 ⟩ Antaŭe la kadro estis RONDA TUBO laŭ
  // la konturo — ĝi legiĝis kiel kanalo de dukto. Nun ĝi estas PLATA kaj PLENA
  // plato: la stela konturo estas plenigita formo, el kiu oni eltranĉas la
  // vitron, do la oro kuŝas sur la muro kiel plata bendo kun kvar pintoj.
  // ⟨ Kial la stelo estas ŝveligita 📃 ⟩ La stela konturo de la antaŭa versio
  // sekvis la pilolon mem, do plenigita ĝi estus nur kvar oraj trianguloj —
  // la vitra fenestro havus NENIAN kadron ĉirkaŭ si. La konturo nun estas la
  // pilolo ŜVELIGITA per la kadra larĝo ( kadroLargho ), do la oro ĉirkaŭas la
  // vitron per egala bendo, kaj la pintoj elstaras el tiu bendo.
  // La truo estas la pilolo iomete malpli larĝa, por ke la oro kovru la randon
  // de la vitro sen ia fendo. La plato elstaras maldike antaŭen ( kadroDikeco )
  // kaj kuŝas plata sur la muro — neniu bevelo, neniu rondaĵo.
  // La kadra larĝo estas egala al la DIAMETRO de la malnova tubo ( 0.125 ), do
  // la kadro havas la saman videblan pezon kiel antaŭe, sed plata. La dikeco
  // ( 0.0625 ) estas la malnova tuba radiuso — la plato do elstaras same
  // malmulte, nur sen la rondaĵo.
  const kadroLargho = 0o1/0o10, kadroDikeco = 0o1/0o20;
  // ⟨ La flankaj pintoj restu sur la faco 📃 ⟩ La pinto de la kadro neniam rajtas
  // elstari preter la rando de la faco — sur la mallarĝaj pintaj tavoloj de la
  // kosmosxipo, kaj sur la teretaĝo de la kunvenejo, la libera spaco estas
  // malgranda ( 0.26 kaj 0.39 ) dum la pinto estas 0.3125. La krampo mallongigas
  // NUR la flankajn pintojn; la supraj/malsupraj restas konstante longaj, ĉar ili
  // iras laŭ la tavola alto kaj havas ĉiam lokon.
  // ⟨ Kiom da libera spaco 📃 ⟩ La longa kaj la mallonga aksoj havas malsamajn
  // limojn — horizontale la faco, vertikale la tavola alto.
  const liberoLonga = vertikala ? ( tieroAlto - ww ) * 0o1/0o2 : facaRadiuso - ww * 0o1/0o2;
  const liberoMallonga = vertikala ? facaRadiuso - fenAlto * 0o1/0o2
    : ( tieroAlto - fenAlto ) * 0o1/0o2;
  const pintoSupre = fenAlto * 0o1/0o2;
  const pintoFlanko = Math.max(0, Math.min(pintoSupre, liberoLonga - kadroLargho - 0o1/0o100));
  const pintoMallonga = Math.max(0, Math.min(pintoSupre,
    liberoMallonga - kadroLargho - 0o1/0o100));
  // ⟨ Nenia angulo 📃 ⟩ La konturo de la stelo estas glatigita per rondigita
  // tranĉo ĉe ĉiu angulo ( rondigiKonturon ) — la bendo fluas en la pintojn per
  // kurbo, kaj la pintoj mem finiĝas per malgranda rondo anstataŭ per akra
  // vertico. La formo do restas stelo, sed sen ia rompita rando.
  const stelo = rondigiKonturon(
    kreiStelanFenestranFormon(ww, fenAlto, kadroLargho, pintoFlanko, pintoMallonga).getPoints(0o20),
    kadroRondigo);
  const truo = kreiPilolFenestranFormon(ww - 0o1/0o100, fenAlto - 0o1/0o100).getPoints(0o20);
  stelo.holes.push(new THREE.Path(truo.reverse()));
  const kadroGeometrio = new THREE.ExtrudeGeometry(stelo,
    { depth: kadroDikeco, bevelEnabled: false, curveSegments: 0o10 });
  if ( vertikala ) {
    kadroGeometrio.rotateZ(Math.PI / 2);
    kadroGeometrio.translate(fenAlto / 2, ww / 2, 0);
  }
  monto.add(new THREE.Mesh(kadroGeometrio, kadraMaterialo));
  group.add(faco);
  return fen;
}

// fenestraMaterialo. La vitro de la eksteraj fenestroj, unu dividita instance por
// ĉiuj konstruaĵoj ( same kiel la muroj kaj la kadroj ). La difino mem venas el
// la komuna fabriko ( kreiFenestranMaterialon ), do la konstruaĵoj, la internoj,
// la kosmoŝipo kaj la vitraj pordoj uzas la SAMAN vitron. La kosmoŝipo ricevas
// sian propran instancon, ĉar la flugo pulsas ĝian brilon.
function fenestraMaterialo(): THREE.MeshStandardMaterial {
  return konstruajxaMaterialo("fenestro", () => kreiFenestranMaterialon());
}

// aldoniEnirejon — Uniforma enirejo por cxiuj tipoj. pli malgranda kaj pli plata
// (malpli profunda), sidanta sur la tero, kun ora bevelo cxirkaux la rando.
//     @param flankoj ( number ) - Kiom da pordoj ( la sanktejo havas 4, unu po flanko ).
// Elportita ( export ) ankaŭ por la inspektilo, kiu montras la pordon sola.
// kreiKadranKurbon — La konturo de formo kiel TRIDIMENSIA, FERMITA CurvePath en la
// ebeno z. La tubo de la ora kadro sekvas tiun vojon SEN interpola svingo.
// ⟨ Kial 📃 ⟩ — la malnova kodo prenis cent punktaron el la formo ( getPoints ) kaj
// pasigis gxin tra CatmullRomCurve3. Tiu kurbo interkalkulas sian propran interpolon
// tra la punktoj kaj Svingigxas ekster la formo — cxe la anguloj gi elstaris kiel
// nudoj kaj la tubo montris diskontinuajn helajn makulojn, do la kadro aspektis nek
// glata nek kunligita. Nun la segmentoj de la formo mem estas samplitaj kaj
// kunligitaj per rektaj pecoj, do la kadro kusxas GXUSTE sur la konturo kaj estas
// unu senjunta buklo.
//     @param formo ( THREE.Path ) - La formo de la pordo ( aux la truo ).
//     @param z ( number ) - La ebeno, en kiun la konturo translokigxas.
//     @param sampoj ( number = 0o20 ) - Kiom da pecoj po formo-segmento.
//     @returns putho ( THREE.CurvePath ) - La fermita vojo, sen duobla finpunkto.
export function kreiKadranKurbon(formo: THREE.Path, z: number,
  sampoj = 0o20): THREE.CurvePath<THREE.Vector3> {
  const putho = new THREE.CurvePath<THREE.Vector3>();
  const punktoj: THREE.Vector3[] = [];
  for ( const kurbo of formo.curves ) {
    const partoj = kurbo.getPoints(sampoj);
    for ( let i = 0; i < partoj.length; i++ ) {
      // La unua punkto de ĉiu segmento ripetas la lastan de la antaŭa.
      if ( i === 0 && punktoj.length > 0 ) continue;
      punktoj.push(new THREE.Vector3(partoj[i].x, partoj[i].y, z));
    }
  }
  // La ferma segmento revenas al la unua punkto — tio estas jam la fino de la
  // buklo, do la duobla punkto forfalas ( alie la tubo ricevus degeneran ringon ).
  if ( punktoj.length > 1 && punktoj[0].distanceTo(punktoj[punktoj.length - 1]) < 1e-6 ) punktoj.pop();
  for ( let i = 0; i < punktoj.length - 1; i++ ) putho.add(new THREE.LineCurve3(punktoj[i], punktoj[i + 1]));
  return putho;
}

//     @param flankoj ( number ) - Kiom da flankoj ricevas pordon ( 1 aux 4 ).
//     @param tieroAlto ( number ) - La alto de unu tiero ( por la klino de la
//              muro ). 0 = sen klino ( la inspektilo, kiu montras la pordon sola ).
export function aldoniEnirejon(group: THREE.Group, d: number, kadraMaterialo: THREE.MeshStandardMaterial, eniraMaterialo: THREE.MeshStandardMaterial, flankoj = 1, tieroAlto = 0, nagetoj = false): void {
  const pordGrupo = new THREE.Group();
  const blokoLargho = 0o233/0o100, tw = blokoLargho * 0o45/0o100, eh = 0o11/0o4;
  // ⟨ La kadro estas SIMETRIA 📃 ⟩ — la kvar anguloj ricevas la SAMAN radiuson
  // ( 0o1/0o4 ), do la ora kadro rondigxas egale supre kaj malsupre. La antauxa
  // malsama paro ( pli ronda bazo, pli akra supro ) igis la kadron nesimetria.
  const shape = rondigitaTrapezaFormo(blokoLargho, tw, eh, 0o1/0o4, 0o1/0o4);
  // ⟨ La pordo estas MALDIKA 📃 ⟩ La folio estas 0o7/0o100 ( 0.109375 ) profunda
  // kun eta bevelo ( antaŭe 0o2/0o10 = 0.25 kun 0o5/0o100 da bevelo, do la pordo
  // elstaris 0.31 de la muro kaj aspektis kiel skatolo sur ĝi ).
  // ⟨ Nun PLI LONGA antauxen 📃 ⟩ La folio iris de 0o1/0o20 ( 0.0625 ) al
  // 0o7/0o100 ( 0.109375 ). Nur la FRONTO moviĝas, la malantaŭa faco restas en la
  // muro, do la pordo elstaras 0.125 anstataŭ 0.078. La sama dikeco estas uzata
  // ankaŭ de la kosmosxipa pordo, do la du pordoj restas la sama familio.
  // ⟨ Kial ne 0o3/0o40 📃 ⟩ La unua provo iris nur al 0o3/0o40 ( 0.09375 ). La
  // pliigo estis 0.03125, proksimume 1% de la porda larĝo, kaj oni preskaŭ ne
  // vidis ĝin en la mondo. La ora kadro sekvas mem, ĉar ĝia radio estas la DUONO
  // de la tuta dikeco, do la kadro dikiĝas kune kaj daŭre kovras la tutan pordon.
  const pordDikeco = 0o7/0o100, pordBevelo = 0o1/0o40;
  const pordDikecoTuta = pordDikeco + pordBevelo * 2;
  // La rotacia grupo — la pordo kaj la kadro sidas ene de ĝi, do la KLINO
  // ( malsupre ) turnas ambaŭ kune ĉirkaŭ la linio kie la pordo tuŝas la grundon.
  const klinGrupo = new THREE.Group();
  klinGrupo.position.set(0, 0, d / 2);
  pordGrupo.add(klinGrupo);
  const enirejo = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: pordDikeco, bevelEnabled: true, bevelSize: pordBevelo, bevelThickness: pordBevelo, bevelSegments: 2, curveSegments: 0o20 }), eniraMaterialo);
  // La malantaŭa faco restas iomete EN la muro ( 0o1/0o100 ), do neniu fendo
  // malantaŭ la pordo; la tuta dikeco estas pordDikecoTuta.
  const pordZ = -0o1/0o100;
  enirejo.position.set(0, 0, pordZ); klinGrupo.add(enirejo);
  // ⟨ La kadro KOVRAS la tutan pordon 📃 ⟩ — la tubo kuŝas sur la MEZA ebeno de
  // la folio ( ne antaŭ ĝi ) kaj ĝia radio egalas la DUONON de la tuta dikeco
  // ( la folio kaj ĝiaj du beveloj ), do la ora kadro ĉirkaŭas la tutan
  // eksteran randon de la pordo: malantaŭe, antaŭe kaj flanke. Antaŭe la
  // maldika tubo staris antaŭ la dika folio kaj kovris nur ĝian frontan randon.
  // La kadro sekvas la konturon de la formo MEM ( kreiKadranKurbon ) — ne
  // CatmullRom-interpon tra punktaro — do la tubo kuŝas GXUSTE sur la pordo-formo,
  // sen nudoj kaj sen diskontinuajxoj cxe la anguloj, kaj gi estas unu glata
  // senjunta buklo. La tubo mem estas RONDA ( 0o14 flankoj anstataux 6 ) kaj la
  // sama granda angula radiuso cxe la kvar anguloj ( 0o1/0o4 ) RONDIGAS la kadron.
  const kadraKurbo = kreiKadranKurbon(shape, pordZ + pordDikeco / 2);
  klinGrupo.add(new THREE.Mesh(new THREE.TubeGeometry(kadraKurbo, 0o200, pordDikecoTuta / 2, 0o14, true), kadraMaterialo));
  // ⟨ La pordo KLINIGXAS kun la muro 📃 ⟩ — la muroj mallevigxas INTERNEN je
  // MURA_KLINO dum unu tiera alto, do pordo staranta vertikale nur tusxus la
  // muron per sia baza rando kaj malproksimigxus supren (~0.18 cxe la supro).
  // La pordo nun turnigxas laux la SAMA angulo, do gi restas PARALELA al sia
  // muro sur la tuta alto. La turno okazas ĉirkaŭ la baza linio ( klinGrupo ),
  // do la bazo restas sur la grundo.
  if ( tieroAlto > 0 ) klinGrupo.rotation.x = -Math.atan(MURA_KLINO / tieroAlto);
  // ⟨ La nagxetoj de la centra konstruajxo 📃 ⟩ — po DU triangulaj platoj ĉe ĉiu
  // pordo ( unu maldekstre, unu dekstre ), kiuj LEVIĜAS de la plata bazo kaj
  // tuŝas la oran kadron de la pordo laŭlonge de ĝia klinita flanko — kiel
  // nagxetoj aux sxnuroj, kiuj ligas la pordon al la bazplato. La interna rando
  // de ĉiu triangulo kuŝas GXUSTE sur la porda flanko ( de la baza angulo gxis la
  // malalta fino de la supra ronda angulo ), do la pinto algluiĝas al la kadro
  // sen trapasi ĝin; la ekstera pinto staras sur la ora bazplato ( 2.6 el la
  // mezo, bone ene de la plato je 4.45 ).
  if ( nagetoj ) {
    // ⟨ La nagxetoj estas ETAJ ALETOJ ANTAUXEN 📃 ⟩ — antaŭe ili kuŝis PLATE en la
    // muro-ebeno: grandaj oraj kojnoj disvastiĝantaj flanken de la pordaj supraj
    // anguloj malsupren al la rando de la bazplato. De antaŭe ili legiĝis kiel
    // pentritaj trianguloj SUR la muro, ne kiel parto de la konstruaĵo.
    //
    // Nun ĉiu naĝeto estas ALETO, kiu ELSTARAS ANTAŬEN el la muro — vertikala
    // triangula plato en la ebeno, kiu enhavas la KLINITAN FLANKON de la pordo
    // ( de la baza angulo supren al la supra angulo ) kaj la antaŭan direkton.
    // Ĝia interna rando do kuŝas GXUSTE sur la porda flanko ( la ronda kadra tubo
    // kovras ĝin, same kiel ĉe la malnovaj trianguloj ) kaj ĝia pinto etendiĝas
    // antaŭen ĉe la bazo — ĝi legiĝas kiel alo, kiu portas la pordan kadron.
    //
    // ⟨ Kial la ebeno ne estas simpla vertikala ebeno 📃 ⟩ — la porda flanko
    // DEKLIVAS ( la trapezo mallarĝiĝas supren ), do vertikala plato tuŝus la
    // kadron nur ĉe sia bazo. Nia plato sekvas la deklivon, do ĝi restas
    // algluiĝinta al la kadro la tutan vojon.
    const bazaX = blokoLargho / 2;                         // la porda baza angulo
    const supraX = tw / 2;                                 // la porda supra angulo
    const nagetaDikeco = 0o1/0o20;                         // 0.0625 — pli maldika ol la pordo
    // ⟨ La bazo de la nagxeto restas SUR la bazplato 📃 ⟩ — la antaŭa pinto
    // ( la tria vertico ) elstaras antaŭen je `nagetaProfundo` KAJ supren je
    // sin(klino) · nagetaProfundo ( la pordo klinigxas kun la muro ), dum la ora
    // bazplato finigxas je d/2 + 0o36/0o100 ( 4.36 cxe la sanktejo ). Kun 0.625
    // ( la malnova valoro ) la piedo de la triangulo elstaris 0.29 PREter la
    // randon de la plato kaj sxvebis super la grundo; 0.3 lasas la pinton 0.04
    // ene, do la nagxeto legigxas kiel parto de la bazplato.
    const nagetaProfundo = 0o3/0o10;                       // 0.3 — ene de la bazplato
    // La meza ebeno de la pordo — la sama ebeno kiel la centro de la kadra tubo.
    const zMebl = pordZ + pordDikeco / 2;
    for ( const sX of [ -1, 1 ] ) {
      const malsupra = new THREE.Vector3(sX * bazaX, 0, zMebl);
      const supra = new THREE.Vector3(sX * supraX, eh, zMebl);
      const lauxFlanko = supra.clone().sub(malsupra);
      const longo = lauxFlanko.length();
      const unuo = lauxFlanko.clone().divideScalar(longo);   // laux la porda flanko
      const antauxen = new THREE.Vector3(0, 0, 1);           // antauxen el la muro
      const normalo = new THREE.Vector3().crossVectors(unuo, antauxen).normalize();
      const triangulo = new THREE.Shape();
      triangulo.moveTo(0, 0);
      triangulo.lineTo(longo, 0);
      triangulo.lineTo(0, nagetaProfundo);
      triangulo.closePath();
      const geometrio = new THREE.ExtrudeGeometry(triangulo, { depth: nagetaDikeco, bevelEnabled: false });
      // La plato centriĝas sur la porda flanko ( duone enen, duone eksteren ).
      const matrico = new THREE.Matrix4().makeBasis(unuo, antauxen, normalo);
      matrico.setPosition(malsupra.clone().addScaledVector(normalo, -nagetaDikeco / 2));
      geometrio.applyMatrix4(matrico);
      klinGrupo.add(new THREE.Mesh(geometrio, kadraMaterialo));
    }
  }
  // Turnitaj kopioj — la sama pordo sur cxiu flanko. La kopioj kunhavigas la
  // geometriojn kaj materialojn de la unua, do la multaj pordoj ne kostas aldone.
  // La Y-turno estas la PLI EKSTERA grupo, do cxiu pordo klinigxas enen de sia
  // propra muro ( ne laux unu komuna direkto ).
  for ( let i = 0; i < flankoj; i++ ) {
    const kopio = i === 0 ? pordGrupo : pordGrupo.clone();
    kopio.rotation.y = i * Math.PI / 2;
    group.add(kopio);
  }
}

// steleaVitro — La dividita frosta vitro de la steleaj signoj ( unu materialo
// por la tuta mondo, kiel la muroj kaj la kadroj ). Konstruu gxin per la sama
// kasxo kiel la aliaj konstruajxaj materialoj, por ke la tagnokta sxangxo
// ( gxisdatigiSteleanVitron ) kaj la konstruo atingu la SAMAN objekton.
//
// ⟨ LA FROSTA VITRO — nenia `transmission` 📃 ⟩ — la plato estas DUONTRATRAVIDA
// `transparent` + `opacity` 0o5/0o10 lasas 0.375 de la fono tra, kaj alta
// `roughness` ( 0o5/0o10 ) forprenas la spegulojn — la plato legigxas kiel
// frostigita vitro, ne kiel spegulo nek kiel aero. La fono NE malklarigxas
// frostigita vitro malklarigas ĝin, kaj la plato nun havas pli da korpo.
//
// ⟨ Kial NE `transmission` 📃 ⟩ — tiu materialo devigas la bildilon re-desegni la
// TUTAN maldiafanan scenon en apartan bufron ( la transira pasumo ). Mezurite per
// ?statistiko tio kostis 354 kromajn desegnajn alvokojn kaj 21.6 M da trianguloj
// po kadro — triono de la tuta geometria laboro de ĉiu kadro. Por kelkaj
// malgrandaj signoj tio ne indas. La transiro tag/nokto sxangxas la BAZAN KOLORON
// ( vidu sube ), do la signo ankaux mallumigxas nokte.
//
// ⟨ Kial 0.625 kaj ne pli travidebla 📃 ⟩ — vera transira vitro ( la malnova
// versio ) lasis la fonon tro klare tra, do la literoj luktis kun la bildo
// malantaŭ ili. Kun 0.625 la fono restas videbla sed malklara — la plato ne
// estas travidebla — kaj la flava teksto legigxas pli firme.
function steleaVitro(): THREE.MeshStandardMaterial {
  return konstruajxaMaterialo("steleo",
    () => new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o5/0o10, metalness: 0,
      // ⟨ Pli maldiafana 📃 ⟩ — 0o6/0o10 ( 0.75 ) anstataŭ 0o5/0o10 ( 0.625 ).
      // La literoj jam batalis kun la fono; kun kvarono de la fono tra ili la
      // flava inko legigxas firme kaj la plato havas ankoraux pli da korpo.
      transparent: true, opacity: 0o6/0o10,
      // Nenia `transmission` — tiu pasumo kostis trionon de la geometrio ( vidu supre )
      emissive: 0x0a1a18, emissiveIntensity: 0o1/0o4,
    }));
}

// ⟨ La KONTURO de la signa teksto 📃 ⟩ — la literoj portas maldikan konturon,
// kiu estas NIGRA tage kaj BLANKA nokte ( ĝi transiras kune kun la tagnokta
// ciklo, kiel la plato mem ). Ni faras tion per malgranda shadero: la teksajxo
// entenas la glifojn kiel MASKON ( blanka alfa kanalo ), kaj la fragment-shadero
// desegnas la ORAN inkon plus la konturon — la plej granda alfa valoro en la
// ĉirkaŭaĵo ( ok direktoj, du radiusoj ) estas la konturo. Tiel la koloro de la
// konturo estas uniformo ( unu komuna `Color` por ĉiuj signoj, do la tagnokta
// transiro sxangxas unu valoron ), kaj la fona `discard` forigas ankaŭ la etan
// tinton, kiun alie lasus la mipmapoj de la malgranda teksto.
// ⟨ La inko de la teksto — FLAVA 📃 ⟩ — antaŭe gxi estis ora-bejxa ( 0xd8b068,
// la sama koloro kiel la kadroj ), kiu legigxis bruna sur la hela vitro. Nun la
// teksto estas vere FLAVA, kaj gxi sekvas la tagnokton kiel la plato: MUTA flava
// tage ( 0xc2b32f — sufice malhela kontraux la hela frosta vitro ) kaj PALA
// flava nokte ( 0xf2eea6 — preskaux lumanta kontraux la nigra plato ).
//
// ⟨ Kial la flava ne estas ORA 📃 ⟩ — la ora bejxo ( 0xd8b068 ) kaj gxia
// malhela versio ( 0xc79b2b ) havas la RUĜAN kanalon rimarkeble super la VERDA
// ( 0xc7 = 199 kontraŭ 0x9b = 155 ), do la teksto legigxis ORANGXA sur la hela
// vitro. Flavo bezonas la du kanalojn preskaux EGAJN: nun la tagan inkon
// ( 0xc2b32f → 194 / 179 ) kaj la noktan ( 0xf2eea6 → 242 / 238 ) apartigas nur
// kelkaj unuoj, do la nuanco restas flava, ne oranĝa.
//
// ⟨ Unu komuna koloro 📃 ⟩ — la uniformoj de cxiuj signaj shaderoj montras al
// cxi tiuj du `Color`-objektoj, do la tagnokta transiro sxangxas ilin unufoje kaj
// cxiuj signoj sekvas ( sen listo de materialoj ).
const STELEA_INKO_TAGE = new THREE.Color(0xc2b32f);
const STELEA_INKO_NOKTE = new THREE.Color(0xf2eea6);
const steleaInkaKoloro = new THREE.Color().copy(STELEA_INKO_TAGE);
// La KONTURO de la teksto estas la MALO de la plato: BLANKA tage, NIGRA nokte —
// do la literoj cxiam havas randon, kiu kontrastas kun la fono ( hela halo sur la
// hela vitro, malhela streko sur la nigra plato ).
const steleaBordoKoloro = new THREE.Color(0xffffff);
function steleaTeksto(mapo: THREE.Texture): THREE.ShaderMaterial {
  const im = mapo.image as { width: number; height: number };
  return new THREE.ShaderMaterial({
    uniforms: {
      uMapo: { value: mapo },
      uInko: { value: steleaInkaKoloro },
      uBordo: { value: steleaBordoKoloro },
      uTeksele: { value: new THREE.Vector2(1 / im.width, 1 / im.height) },
      uDikeco: { value: 0o5/0o2 },   // 2.5 tekseloj da konturo
    },
    transparent: true, depthWrite: false, toneMapped: false,
    vertexShader: `varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }`,
    fragmentShader: `precision highp float;
    uniform sampler2D uMapo; uniform vec3 uInko; uniform vec3 uBordo;
    uniform vec2 uTeksele; uniform float uDikeco; varying vec2 vUv;
    void main(){
      float a = texture2D( uMapo, vUv ).a;
      float r = 0.0;
      for ( int i = 0; i < 8; i++ ) {
        float ang = float( i ) * 0.7853981634;
        vec2 of = vec2( cos( ang ), sin( ang ) ) * uTeksele * uDikeco;
        r = max( r, texture2D( uMapo, vUv + of ).a );
        r = max( r, texture2D( uMapo, vUv + of * 0.55 ).a );
      }
      float inka = smoothstep( 0.35, 0.6, a );
      float kontura = smoothstep( 0.35, 0.6, r );
      if ( kontura < 0.004 ) discard;
      gl_FragColor = vec4( mix( uBordo, uInko, inka ), max( inka, kontura ) );
    }`,
  });
}

// ⟨ La stelea vitro sekvas la tagnokton 📃 ⟩ — la plato de ĉiu signo estas
// BLANKA tagmeze kaj NIGRA en la nokto, kaj ĝi transiras glate tra la tuta
// ciklo ( la sama parametro `malhelo` kiel la ĉielo, la nebulo kaj la pordoj —
// 0 = tago, 1 = krepusko ).
//
// ⟨ La koloro ankaŭ FILTRAS la trapason 📃 ⟩ — en la fizika modelo de three la
// baza koloro multiplikas la trapasantan lumon: blanka koloro lasas la fono tra
// ( frosta vitro ), nigra ĝin sufokas ( solida nigra tabulo ). Tiel unu valoro
// regas kaj la koloron kaj la travideblecon — la signo neniam konkuras kun la
// fono, sed tenas sian propran korpon.
//
// La KONTURO de la teksto iras la malan direkton ( nigra tage, blanka nokte ),
// ĉar la filtraĵo de la plato malheligas ankaŭ la malantaŭan bildon: tage la
// literoj bezonas malhelan konturon sur la hela vitro, nokte helan konturon sur
// la nigra plato.
//     @param malhelo ( number ) - 0 = plena tago ( blanka ), 1 = plena nokto ( nigra ).
export function gxisdatigiSteleanVitron(malhelo: number): void {
  const v = 1 - Math.max(0, Math.min(1, malhelo));
  // Skribu nur kiam la valoro vere sxangxigxis — la ciklo vokas cxiun kadron.
  if ( Math.abs(v - lastaVitraLumo) < 0o1/0o100 ) return;
  lastaVitraLumo = v;
  const m = steleaVitro();
  m.color.setRGB(v, v, v);
  // La INKO de la teksto transiras de PALA flava ( nokte ) al MUTA flava ( tage ).
  steleaInkaKoloro.lerpColors(STELEA_INKO_NOKTE, STELEA_INKO_TAGE, v);
  // La KONTURO iras la MALAN direkton ol la plato: blanka tage, nigra nokte.
  steleaBordoKoloro.setRGB(v, v, v);
  // Nokte ankaŭ la emisio malaperas, do la signo estas vere nigra.
  m.emissiveIntensity = v * 0o1/0o4;
}
let lastaVitraLumo = 1;

// aldoniSteleanSignon — Uniforma 3D stela signo por cxiuj konstruajxoj. nesimetriaj
// rondigitaj supraj anguloj (r1 = 0o1/0o4, r2 = 0o1/0o10), rektaj malsupraj. La Gawekiif-nomo
// staras sur la tero apud la pordo. La texturo estas travidebla — nur la teksto
// montrigxas super la malhela steleo (neniu nigra bloko).
//     @param tipo ( string ) - La konstrua-tipo ( satala TIPARO-sxlosilo ) — la
//              defauxta tip-nomo anstatauxas la nomon kiam la konstruajxo estas sennoma.
// Elportita ( export ) ankaŭ por la inspektilo, kiu montras la signon sola.
export function aldoniSteleanSignon(group: THREE.Group, name: string, tipo: string, w: number, d: number): void {
  // ⟨ La teksajxo estas MASKO 📃 ⟩ — la shadero legas nur la alfa-kanalon, do
  // la glifoj estas desegnitaj blankaj kaj la ORAN inkon donas la shadero mem
  // ( kune kun la tagnokta konturo ).
  const teksajxo = generiSkribanTeksajxon(nomoAih(name, tipo), { w: 0o300, h: 0o1516, ink: "#ffffff" });
  teksajxo.wrapS = teksajxo.wrapT = THREE.ClampToEdgeWrapping;
  // La signo staras sur la tero apud la pordo (0o1/0o100 levita por ne z-fajfi kun la grundo).
  const signaY = 0o1/0o100;
  const steleo = new THREE.Mesh(
    new THREE.ExtrudeGeometry(kreiSteleanFormon(0o5/0o10, 0o24/0o10, 0o1/0o4, 0o1/0o10), { depth: 0o5/0o40, bevelEnabled: false, curveSegments: 0o10 }),
    // ⟨ La steleo estas FROSTA VITRO 📃 ⟩ — la sama dividita materialo por
    // ĉiuj konstruaĵoj ( kiel la muroj kaj la kadroj ). La plato estas
    // DUONTRATRAVIDA: `transparent` + `opacity` 0o5/0o10 lasas 0.375 de la fono
    // tra, kaj alta `roughness` ( 0.42 ) forprenas la spegulojn — la plato
    // legiĝas kiel frostigita vitro, ne kiel spegulo kaj ne kiel aero.
    //
    // ⟨ Kial NE `transmission` 📃 ⟩ — la antaŭa versio estis vera transira vitro.
    // Tiu materialo postulas apartan pasumon de la tuta maldiafana sceno ( vidu
    // la mezurojn en scena.ts ); por kelkaj malgrandaj signoj tio estis triono de
    // la geometria laboro de ĉiu kadro. La fono ankaŭ ne plu malklarigxas — kio
    // taŭgas, ĉar la plato nun estas pli maldiafana ol antaŭe.
    //
    // ⟨ Kial la koloro estas HELA 📃 ⟩ — la baza koloro venas de la TAGNOKTA
    // transiro ( vidu gxisdatigiSteleanVitron ) — blanka tage, nigra nokte — kaj
    // kun ĝi iras la OPACECO: tage frosta vitro, nokte preskaŭ solida nigra
    // tabulo.
    //
    // La plato NE ĵetas ombron: travidebla objekto kun maldiafana ombro aspektus
    // kiel solida nigra tabulo.
    steleaVitro()
);
  steleo.position.set(w * 0o13/0o40, signaY, d / 2 + 0o104/0o100 - 0o5/0o100); steleo.castShadow = false; group.add(steleo);
  // ShapeGeometry uzas la krudajn formo-koordinatojn kiel UV (ne [0,1]),
  // do la texturo algluigxus al la malsupra-dekstra angulo de la faco.
  // Normaligu la UV-ojn al la limig-skatolo por plenigi la tutan facon.
  // ⟨ La faco havas la SAMAN konturon kiel la plato 📃 ⟩ — antaŭe ĝi estis pli
  // malgranda ( 0o4/0o10 × 0o215/0o100 anstataŭ 0o5/0o10 × 0o24/0o10 ) kaj
  // flosis antaux la plato, do ĝi legigxis kiel aparta KARTO ene de la signo.
  // Nun ĝi kusxas GXUSTE sur la fronta faco de la plato ( la sama formo, la sama
  // grandeco ), do la teksto sxajnas esti presita SUR la vitro.
  const faceGeo = new THREE.ShapeGeometry(kreiSteleanFormon(0o5/0o10, 0o24/0o10, 0o1/0o4, 0o1/0o10), 0o10);
  faceGeo.computeBoundingBox();
  const facePoz = faceGeo.getAttribute("position");
  const faceUV = faceGeo.getAttribute("uv");
  const faceUjo = faceGeo.boundingBox!;
  const faceLargho = Math.max(1e-6, faceUjo.max.x - faceUjo.min.x);
  const faceAlto = Math.max(1e-6, faceUjo.max.y - faceUjo.min.y);
  // ⟨ La teksto estas iomete PLI MALGRANDA ol la faco 📃 ⟩ — la glifoj plenigas
  // ~83% de la teksajxo-larĝo, do sur la tuta faco ili preskaŭ tusxus la randon de
  // la plato. Ni disetendas la UV-ojn 7/6-obla ĉirkaŭ la centro: la teksto tiel
  // sxrumpas al ~86% kaj la randoj de la teksajxo ( travideblaj — 8.6% cxiuflanke )
  // restas ekstere, kie la `discard` de la shadero forigas ilin.
  const tekstaSkalo = 0o7/0o6;
  for ( let i = 0; i < faceUV.count; i++ ) {
    const u = ( facePoz.getX(i) - faceUjo.min.x ) / faceLargho;
    const v = ( facePoz.getY(i) - faceUjo.min.y ) / faceAlto;
    faceUV.setXY(i, 0.5 + ( u - 0.5 ) * tekstaSkalo, 0.5 + ( v - 0.5 ) * tekstaSkalo);
  }
  faceUV.needsUpdate = true;
  const face = new THREE.Mesh(faceGeo, steleaTeksto(teksajxo));
  // La faco sidas TUCXE antaux la fronto de la plato ( la ekstrudo 0o5/0o40
  // profunda finigxas je d/2 + 0o111/0o100 ) — 0o1/0o300 ( ~0.005 ) da spaco
  // suficxas por eviti z-fajfon, sed restas nevidebla de la flanko.
  face.position.set(w * 0o13/0o40, signaY, d / 2 + 0o111/0o100 + 0o1/0o300); group.add(face);
}

// aldoniDiamantanSpegulon — Reflektu la konstruajxon suben (diamanta spegulo) kun
// ora ringo cxe la bazo.
function aldoniDiamantanSpegulon(sceno: THREE.Scene, spec: KonstruSpec, group: THREE.Group, w: number): void {
  const mg = group.clone();
  mg.scale.y = -1;
  mg.position.y = ( spec.h0 || 0 ) - 0o2/0o100;
  mg.traverse(m => { if ( m instanceof THREE.Mesh ) m.castShadow = false; });
  sceno.add(mg);
  const oroMaterialo = konstruajxaMaterialo("spegulaOro",
    () => new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0o7/0o10, roughness: 0o26/0o100, emissive: 0x302808, emissiveIntensity: 0o26/0o100 }));
  const ringGeo = new THREE.RingGeometry(Math.max(0o1/0o100, w * 0o23/0o100 + 0o11/0o100), Math.max(0o2/0o100, w * 0o23/0o100 + 0o21/0o100), 32);
  const ring = new THREE.Mesh(ringGeo, oroMaterialo);
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(spec.x, ( spec.h0 || 0 ) + 0o1/0o100, spec.z);
  sceno.add(ring);
}

// aldoniTavolanRandon — La ORA rando ĉe la supro de unu tiera muro.
// ⟨ RONDIGITAJ supraj randoj 📃 ⟩ — antaŭe kvar apartaj skatoloj ( du laŭ ĉiu
// akso ) kun AKRAJ anguloj, kiuj renkontiĝis en la kvar anguloj de la tavolo.
// Nun unu RONDIGITA kadro ( la sama formo kiel la ora bazplato de la sanktejo
// kaj la vojoj ) ĉirkaŭas la tutan tavolon per unu senjunta bendo kun molaj
// anguloj. La dikeco kaj la alto restas la samaj kiel la malnovaj stangoj, do la
// rando aspektas idente — nur la anguloj rondiĝis.
//     @param geos ( THREE.BufferGeometry[] ) - La kadraj geometrioj ( kunfandataj ).
//     @param hw, hd ( number ) - La duon-larĝo kaj duon-profundo de la tavolo.
//     @param y ( number ) - La malsupra nivelo de la tavolo.
//     @param klino, tieroAlto ( number ) - La muro-deklivo kaj la tiera alto.
// Elportita ( export ) ankaŭ por la inspektilo, kiu montras unu tavolon sola.
export function aldoniTavolanRandon(geos: THREE.BufferGeometry[], hw: number, hd: number, y: number, klino: number, tieroAlto: number): void {
  // ⟨ La rando estas TRE MALDIKA kaj havas LIPON 📃 ⟩ — la antaŭa bendo estis
  // sola kaj 0.2 larĝa ( ĝi legiĝis kiel dika ora strio ĉirkaŭ la tavolo ). Nun
  // ĝi estas maldika strio ( 0.125 larĝa, 0.031 alta ), kaj SUR la tavola supro
  // kuŝas dua samforma tavolo — la LIPO — kiu leviĝas 0.025 super la supron. La
  // du formas kune maldikan oran randon kun supra eĝo, anstataŭ platbenda
  // ĉirkaŭaĵo. La kvar anguloj restas rondaj ( la sama kreiRondigitan... formo
  // kiel la bazplato kaj la vojoj ).
  const randoLargho = 0o1/0o10;   // 0.125 — la larĝo de la ora strio
  const randoAlto = 0o1/0o40;     // 0.031 — la maldika vertikala strio
  const lipoAlto = 0o1/0o50;      // 0.025 — la supra lipo
  const randoR = 0o3/0o20;
  // randoBendo — unu rondigita kadro el la sama formo, je la sama loko, kun
  // propra alto kaj propria baza nivelo. La ena truo estas pli malgranda je la
  // bendo-larĝo, kun la MALA ( CW ) ventumilo — kiel la porda truo en internoj.ts
  // kaj la bazplato, por ke Earcut rekonu ĝin kiel truon.
  const randoBendo = (alto: number, bazaY: number): void => {
    const formo = kreiRondigitanRektangulanFormon(
      ( hw - klino ) * 2 + randoLargho, ( hd - klino ) * 2 + randoLargho, randoR);
    const truo = kreiRondigitanRektangulanFormon(
      ( hw - klino ) * 2 - randoLargho, ( hd - klino ) * 2 - randoLargho,
      Math.max(0o1/0o20, randoR - randoLargho)).getPoints(0o40);
    formo.holes.push(new THREE.Path(truo.reverse()));
    const geo = new THREE.ExtrudeGeometry(formo, { depth: alto, bevelEnabled: false, curveSegments: 0o40 });
    // Plata ( rotaciita X ) — la dikeco fariĝas vertikala.
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, bazaY, 0);
    geos.push(geo);
  };
  // La maldika vertikala strio — ĝia supro estas la tavola supro.
  randoBendo(randoAlto, y + tieroAlto - randoAlto);
  // La lipo — sur la tavola supro, iomete levita super ĝin.
  randoBendo(lipoAlto, y + tieroAlto);
}

// konstruiSatalon — Konstruu sxton-sxtupan piramidon (satalon) el specifaj tieroj kaj sub-teroj.
//     @param spec ( KonstruSpec ) - Konstruajxa specifo kun grandeco, tipo, nombro da tieroj.
//     @param sceno ( THREE.Scene ) - Sceno al kiu aldoni la konstruajxon.
//     @param selektajxoj ( THREE.Mesh[] ) - Listo de muso-selektajxoj por aldoni la murojn.
export function konstruiSatalon(spec: KonstruSpec, sceno: THREE.Scene, selektajxoj: THREE.Mesh[]): THREE.Group {
  const { niveloj: tiers, tieroAlto, w, d, type: typeKey, name } = spec;
  const sube = spec.sube || 0;
  // Kaj la kosmopordo kaj la generalaj stacioj havas pli similajn tavolojn
  // (pli milda deklivo, malpli granda interspaco inter etagxoj).
  const estasStacio = typeKey === "stacioxipo";
  const supraLargho = estasStacio ? w * 0o5/0o10 : Math.max(0o215/0o100, w * 0o23/0o100);
  const supraProfundo = estasStacio ? d * 0o5/0o10 : Math.max(0o20/0o10, d * 0o23/0o100);
  const malpliiX = ( w / 2 - supraLargho / 2 ) / Math.max(1, tiers - 1), malpliiZ = ( d / 2 - supraProfundo / 2 ) / Math.max(1, tiers - 1);
  const T = TIPARO[typeKey] || TIPARO.domo;
  const muraKoloro = T.wall, kadraKoloro = T.frame;
  const murajGeometrioj: THREE.BufferGeometry[] = [], kadrajGeometrioj: THREE.BufferGeometry[] = [];
  // Klinitaj muroj. cxiu tavolo estas trapezoida (supro pli mallargxa ol bazo).
  const klino = MURA_KLINO;

  for ( let i = 0; i < tiers; i++ ) {
    const hw = w / 2 - i * malpliiX, hd = d / 2 - i * malpliiZ, y = i * tieroAlto;
    const tavolo = kreiKlinoTavolon(hw, hd, hw - klino, hd - klino, tieroAlto);
    tavolo.translate(0, y + tieroAlto / 2, 0); murajGeometrioj.push(tavolo);
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) aldoniKadranTubon(kadrajGeometrioj, sX * hw, sZ * hd, y, y + tieroAlto, sX, sZ, true, klino);
    aldoniTavolanRandon(kadrajGeometrioj, hw, hd, y, klino, tieroAlto);
  }
  // NENIUJ sub-teraj muroj/pilieroj por la ekstera konstruajxo — la sub-teraj
  // niveloj estas konstruataj nur de la interno ( eniriInternon konstruas siajn
  // proprajn murojn/plankojn por ĉiu sub-tera etaĝo laux spec.sube ). Entombigita
  // ekstera strukturo aperus kiel duobla konstruajxo ene de la sub-teraj ĉambroj.
  // spec.sube/tieroAltoSub restas en la spec, por ke la interno povu kongrui.

  const group = new THREE.Group();
  // La konstruajxaj materialoj estas KOMUNAJ — po ( tipo, koloro ) cacheitaj
  // je la modulo-nivelo. Antaŭe ĉiu el la ĉirkaŭ kvardek konstruaĵoj kreis siajn
  // proprajn murajn/kadrajn/enirajn materialojn — la sama malgranda aro da
  // ( koloro, roughness ) kombinaĵoj ripete. La materialoj ne estas mutaciataj
  // poste ( la koloroj estas fiksitaj laŭ tipo ), do la dividado estas sekura.
  const muraMaterialo = konstruajxaMaterialo("muro" + muraKoloro + ( typeKey === "kasafeo" ? "k" : "" ),
    () => new THREE.MeshStandardMaterial({ color: muraKoloro, roughness: typeKey === "kasafeo" ? 0o41/0o100 : 0o3/0o4, metalness: 0, envMapIntensity: 0 }));
  const kadraMaterialo = konstruajxaMaterialo("kadro" + kadraKoloro,
    () => kreiOranMaterialon(kadraKoloro));
  // ⟨ La pordo uzas la MURON mem 📃 ⟩ La folio ricevas kopion de la mura
  // materialo kun malheleigita koloro ( kreiPordanMaterialon faras tion ), do la
  // pordo havas la saman surfacon kiel sia muro, kun ĝia roughness, ĝia metalness
  // kaj eĉ ĝiaj teksajxoj, kaj la mura koloro restas rekonebla. La cache-ŝlosilo
  // inkluzivas la koloron, do la materialoj restas dividitaj inter la
  // konstruaĵoj de la sama muro-koloro.
  //
  // ⟨ La VITRAJ pordoj 📃 ⟩ — la kunvenejo ( kasafeo ) kaj la stacidomo
  // ( stacioxipo ) ricevas la VITRON de iliaj propraj fenestraj vicoj anstataŭ
  // muran koloron, same kiel la kosmoŝipo ( kiu havas sian propran vitran eniran
  // materialon en scena.ts ). Temas pri la sama triopo, kiu jam portas la LONGAn
  // pilol-fenestran vicon — do la tri vitro-plenaj konstruaĵoj de la mondo ankaŭ
  // havas vitrajn pordojn, dum la ŝtonaj domoj, turoj kaj sanktejoj restas kun
  // siaj mur-koloraj pordoj.
  const vitraPordo = typeKey === "kasafeo" || typeKey === "stacioxipo";
  const eniraMaterialo = vitraPordo
    ? fenestraMaterialo()
    : konstruajxaMaterialo("eniro" + muraKoloro, () => kreiPordanMaterialon(muraMaterialo));

  const muroj = new THREE.Mesh(kunfandiGeometriojn(murajGeometrioj), muraMaterialo);
  muroj.castShadow = muroj.receiveShadow = true;
  muroj.userData = { spec, buildingType: T };
  selektajxoj.push(muroj);
  group.add(muroj);
  group.add(new THREE.Mesh(kunfandiGeometriojn(kadrajGeometrioj), kadraMaterialo));

  // Uniforma enirejo por cxiuj tipoj — reuzebla komponanto. La sanktejo ricevas
  // pordojn sur CXIUJ kvar flankoj ( turnitaj kopioj de la sama pordo ).
  // La centra konstruajxo ( sanktejo ) ricevas la nagxetojn ce siaj pordoj — la
  // triangulaj platoj, kiuj levigxas de la baza plato al la porda kadro.
  aldoniEnirejon(group, d, kadraMaterialo, eniraMaterialo,
    typeKey === "sanktejo" ? 4 : 1, tieroAlto, typeKey === "sanktejo");

  if ( typeKey === "sanktejo" ) {
    const pintajxo = new THREE.Mesh(new THREE.ConeGeometry(supraLargho * 0o43/0o100, 0o63/0o40, 4).rotateY(Math.PI / 4), kadraMaterialo);
    pintajxo.position.y = tiers * tieroAlto + 0o63/0o100; pintajxo.castShadow = true; group.add(pintajxo);
  }

  if ( typeKey === "stacioxipo" ) {
    // Kosmoporda stacio. blanka lancx-aprono cxirkaux la bazo kun oraj kvadrataj
    // bendoj SUR la aprono. La aprono estas 0o3/0o40 alta je y=0o1/0o100, do gxia supro
    // estas je 0o1/0o20 — la oraj bendoj sidas je y=0o7/0o100 (0o1/0o100 libero super la
    // apron-supro), alie iliaj facoj koincidus kun la aprono kaj flagretus
    // (z-fighting).
    // Rondigita lancx-aprono. kvadrata formo kun rondigitaj anguloj, 0o3/0o40 alta.
    // La ekstrudo kusxas plata (rotaciita X), do la dikeco farigxas vertikala.
    const apronFormo = kreiRondigitanRektangulanFormon(w + 4, d + 4, 0o10/0o10);
    const apronGeo = new THREE.ExtrudeGeometry(apronFormo, { depth: 0o3/0o40, bevelEnabled: false, curveSegments: 0o10 });
    apronGeo.rotateX(-Math.PI / 2);
    apronGeo.translate(0, -0o1/0o40, 0);
    const apron = new THREE.Mesh(apronGeo, muraMaterialo);
    apron.receiveShadow = true; group.add(apron);
    for ( const sZ of [ -1, 1 ] ) {
      const b1 = new THREE.BoxGeometry(w + 4, 0o1/0o20, 0o5/0o20); b1.translate(0, 0o7/0o100, sZ * ( d / 2 + 0o4/0o10 )); group.add(new THREE.Mesh(b1, kadraMaterialo));
    }
    for ( const sX of [ -1, 1 ] ) {
      const b2 = new THREE.BoxGeometry(0o5/0o20, 0o1/0o20, d + 4); b2.translate(sX * ( w / 2 + 0o4/0o10 ), 0o7/0o100, 0); group.add(new THREE.Mesh(b2, kadraMaterialo));
    }
    // Kvar lancx-pilieroj cxe la apronaj anguloj kun brilaj pintoj.
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      const piliero = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o10, 0o3/0o20, 0o7/0o4, 6), kadraMaterialo);
      piliero.position.set(sX * ( w / 2 + 0o15/0o10 ), 0o7/0o10, sZ * ( d / 2 + 0o15/0o10 )); piliero.castShadow = true; group.add(piliero);
      const brilo = new THREE.Mesh(new THREE.SphereGeometry(0o5/0o40, 0o10, 0o6), eniraMaterialo);
      brilo.position.set(sX * ( w / 2 + 0o15/0o10 ), 0o7/0o4 + 0o5/0o40, sZ * ( d / 2 + 0o15/0o10 )); group.add(brilo);
    }
    // Malgranda ora lancx-ringo sur la tegmento, sub la sxipo.
    const roofY = tiers * tieroAlto;
    const ringo = new THREE.Mesh(new THREE.RingGeometry(0o15/0o20, 0o23/0o20, 0o40).rotateX(-Math.PI / 2), kadraMaterialo);
    ringo.position.y = roofY + 0o1/0o40; group.add(ringo);
  }

  // ⟨ La eksteraj fenestroj sur ĈIUJ kvar flankoj 📃 ⟩ — la sama LONGA
  // pilol-fenestra vico kiel la kosmosxipo ( kiun oni vidas fluganta super la
  // stacidomo ): unu fenestro po faco po tavolo.
  // ⟨ La regulo 📃 ⟩ — fenestro sur ĉiu faco de ĉiu tavolo, KROM kie estas
  // pordo: la fronta faco ( f = 0, +z ) de la teretaĝo havas la enirejon, kaj la
  // sanktejo havas pordon sur ĉiu el la kvar flankoj de sia teretaĝo. La tavolaj
  // muroj kliniĝas, sed la sama `klino` regas ĉiujn konstruaĵojn, do la sama
  // helpilo metu la fenestrojn.
  //
  // ⟨ NENIAJ eksteraj fenestroj — la domoj, la mangxejoj, la turoj kaj la
  // sanktejo 📃 ⟩ — tiuj kvar tipoj estas SOLIDAJ de la strato: la tavolaj muroj
  // portas nur la muron kaj la oran framon. La INTERNA fenestro ( aldoniLongan-
  // fenestron en internoj.ts ) restas, do la loĝanto vidas eksteren tra sia
  // propria fenestro dum la pasanto vidas nur muron — la unudirekta vitro de la
  // realaj urboj.
  // ⟨ La sanktejo 📃 ⟩ — ĝi perdis sian eksteran vicon lastmomente laux peto de
  // uzanto. Ĝi estas la CENTRA konstruajxo ( la kerno de la krado ), kaj ĝia
  // fasado montras la oran signon kaj la muron; la blanka fenestr-vico de la
  // stacidomo kaj de la kosmosxipo restas la sola luma vico de la urbo.
  // ⟨ La kunvenejo ( kasafeo ) 📃 ⟩ — nur ĝi kaj la stacidomo montras sian
  // internon al la strato: la kunvenejo estas publika halo, kaj la stacidomo mem
  // estas spegulo de la kosmosxipa fenestr-vico. La loĝejoj, la restoracioj, la
  // altaj turoj kaj nun ankaŭ la sanktejo estas privataj/funkciaj — iliaj
  // fasadoj montras muron kaj la oran signon, ne la internon.
  const senEksterajFenestroj = typeKey === "domo" || typeKey === "mangxejo"
    || typeKey === "turo" || typeKey === "sanktejo";
  if ( !senEksterajFenestroj ) {
    const fenAlto = Math.min(0o5/0o10, tieroAlto * 0o23/0o100);
    const vitro = fenestraMaterialo();
    // ⟨ UNU marĝena nombro por la tuta konstruaĵo 📃 ⟩ La nombro estas kalkulita
    // unufoje ( fenestraMargxeno ) kaj ĉiuj tavoloj uzas ĝin TIEL, sen multipliko
    // aux divido per sia propra faco. La libera spaco ĉe la anguloj estas do la
    // sama nombro ĉien kaj ĝi VIDEBIAS. La fenestra alto ne ŝanĝiĝas, do la
    // fenestroj mallongiĝas precize per la sama kvanto, kiun mallongiĝas la tavoloj.
    const facoLarga = Math.min(w / 2, d / 2) - klino / 2;
    const fenMargxeno = fenestraMargxeno(facoLarga);
    for ( let i = 0; i < tiers; i++ ) {
      const hwT = w / 2 - i * malpliiX, hdT = d / 2 - i * malpliiZ;
      const faco = Math.min(hwT, hdT) - klino / 2;
      // ⟨ Tavolo tro mallarĝa 📃 ⟩ Se la sama marĝeno ne lasas lokon por
      // horizontala fenestro, la tavolo ricevas VERTIKALAN fenestron — la tavola
      // alto donas la longan mezuron. Nur se eĉ la mallonga mezuro ne enirus
      // ( la vitro kun la bendo ), la tavolo restas sen fenestro.
      const horizontala = faco * 2 - fenMargxeno * 2 >= fenAlto;
      if ( !horizontala && faco < fenAlto * 0o1/0o2 + 0o1/0o10 ) continue;
      const yC = i * tieroAlto + tieroAlto / 2;
      for ( let f = 0; f < 4; f++ ) {
        // Neniu fenestro sur la teretaĝa fronto — tie estas la pordo.
        if ( i === 0 && f === 0 ) continue;
        aldoniPilolFenestron(group, kadraMaterialo, vitro, f, yC, faco,
          klino, tieroAlto, fenAlto, false, horizontala ? fenMargxeno : undefined,
          !horizontala);
      }
    }
  }

  // Uniforma 3D stela signo por cxiuj konstruajxoj — reuzebla komponanto.
  aldoniSteleanSignon(group, name, typeKey, w, d);

  // Eksteraj tabloj — la SAMA tablo/segxo-aseto kiel la internaj mangxejo-
  // tabloj ( aldoniManĝtablon el la mebloj-modulo ), en la sama bruna ligna
  // koloro kiel la internaj tabloj. Nur la SOLAJ konstruajxoj ( la skulptitaj
  // objektoj ) ricevas ilin — la kvar-blokaj krado-konstruajxoj ( fixed
  // "kvar" ) staras tuj apud la vojo kaj la tabloj falus en gxin. Ili iras en
  // apartan grupon ALDONITAN POST la diamanta spegulo ( vidu sube ), por ke
  // la spegulo neniam reflektu ilin — la renversitaj kopioj elstaris el la
  // grundo sur la deklivoj.
  const eksterajTabloj = typeKey === "mangxejo" && spec.fixed !== "kvar" ? new THREE.Group() : null;
  if ( eksterajTabloj ) {
    const lignaMaterialo = konstruajxaMaterialo("ligno",
      () => new THREE.MeshStandardMaterial({ color: LIGNA_KOLORO, roughness: 0o41/0o100, metalness: 0o11/0o100 }));
    for ( let i = -1; i <= 1; i += 2 ) {
      const tx = i * 5, tz = d / 2 + 3;
      // La tablo kun la kvar benkoj cxirkaux gxi — la sama manĝa arangxo kiel
      // en la internaj mangxejoj ( aldoniManĝtablon el la mebloj-modulo ), kun
      // la sama ligna kaj ora rando ( kadraMaterialo ).
      aldoniManĝtablon(eksterajTabloj, tx, tz, 0, lignaMaterialo, kadraMaterialo);
    }
  }
  // Flankaj pordoj forigitaj laux peto de uzanto
  // Stacia platformo forigita laux peto de uzanto
  // La ora bazplato restas nur sur la sanktejo ( la speciala centra konstruajxo )
  // — la normalaj konstruajxoj ( domo/turo/mangxejo/kasafeo ) ne havas gxin.
  if ( sube > 0 && typeKey === "sanktejo" ) {
    // Rondigita ora bazplato — kvadrata kadro kun RONDIGITAJ anguloj cxirkaux la
    // piedo de la konstruajxo ( la malnovaj kvar rektaj stangoj formis akrajn
    // angulojn ).
    // ⟨ La bazo estas PLI PLATA 📃 ⟩ — la antaŭa plato altis 0.297 kaj estis
    // centrita je 0.094, do gxi elstaris 0.24 super la grundo kiel sojlo. Nun gxi
    // estas 0.125 alta kaj kusxas SUR la grundo ( de 0 gxis 0.125 ), do la tuta
    // bazajxo legigxas kiel plata oro-bordita plato, ne kiel stupo.
    const kadroW = w + 0o72/0o100, kadroD = d + 0o72/0o100;  // ekstera rando je d/2 + 0o35/0o100
    const dikeco = 0o1/0o2;                                  // 0.5 — sama kiel la malnova stango
    // 0.5 — modesta rondigo. la kadra angulo atingas la diagonalajn angulpilierojn
    // ( la malnova 1.0 fortrancxis la kadron sub la pilieroj ).
    const rAnguloj = 0o1/0o2;
    const platoAlto = 0o1/0o10;                              // 0.125 — plata
    const kadroFormo = kreiRondigitanRektangulanFormon(kadroW, kadroD, rAnguloj);
    // La ena truo estas la sama rondigita kvadrato, pli malgranda je la dikeco,
    // kun la MALA ( CW ) ventumilo — kiel la porda truo en internoj.ts, por ke
    // Earcut rekonu gxin kiel truon ( neniu normaligo en triangulateShape ).
    const ena = kreiRondigitanRektangulanFormon(
      kadroW - dikeco * 2, kadroD - dikeco * 2, Math.max(0o1/0o20, rAnguloj - dikeco)
).getPoints(0o40);
    kadroFormo.holes.push(new THREE.Path(ena.reverse()));
    const kadroGeo = new THREE.ExtrudeGeometry(kadroFormo, { depth: platoAlto, bevelEnabled: false, curveSegments: 0o40 });
    // Plata ( rotaciita X ) — la dikeco farigxas vertikala, kaj la plato kusxas
    // rekte sur la grundo ( gxia bazo je y = 0 ).
    kadroGeo.rotateX(-Math.PI / 2);
    group.add(new THREE.Mesh(kadroGeo, kadraMaterialo));
  }

  group.position.set(spec.x, spec.h0 || 0, spec.z);
  group.rotation.y = spec.rot;
  sceno.add(group);
  if ( spec.diamond ) aldoniDiamantanSpegulon(sceno, spec, group, w);
  // La tabloj post la spegulo — la spegulo klonas la grupon ĝis nun, do la
  // tabloj restas unuflankaj ( nenia renversita kopio sub la grundo ).
  if ( eksterajTabloj ) group.add(eksterajTabloj);
  return group;
}