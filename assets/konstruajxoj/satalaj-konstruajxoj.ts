// Satalaj konstruajxoj — sxtupajramidaj konstruajxoj. verdaj/oraj domoj (kapuo),
// brunaj/becxaj mangxejoj (kahxjenko), becxaj kasafeoj (kunvenoĉambroj) kun oraj pilieroj
// La zigurato nomigxas satal ( j͑ʃᴜ ɭʃᴜͷ̗ ) en Iikrhia. noma formo. satalo.
import * as THREE from "three";
import { generiSkribanTeksajxon } from "../komunajxoj/skripto-rivelilo.js";
import { nomoAih } from "../../src/tradukoj.js";
import { kunfandiGeometriojn, kunfandiKajVeldoiGeometriojn } from "../komunajxoj/kunfandajxoj.js";
import { kreiEniranMaterialon, kreiOranMaterialon } from "../komunajxoj/materialoj.js";
import { kreiPilolFenestranFormon, kreiRondigitanRektangulanFormon } from "../komunajxoj/formoj.js";
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

// La rondigita kvadrata formo ( kreiRondigitanRektangulanFormon ) venas el la
// komuna forma modulo — la sama formo kiel la vojoj, dividita inter ili.
function rondigitaTrapezaFormo(blokoLargho: number, tw: number, h: number, rb: number, rt: number): THREE.Shape {
  const s = new THREE.Shape(), sl = (blokoLargho / 2 - tw / 2) / h;
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
}

// diamantajDuonoj — Rektaflanka diamanta sekco por la pilieroj. Kvar pintoj je 45°
// alfrontas la murojn, kun REKTAJ flankoj inter ili. La malnova sekco estis
// konkava ( la enaj aksoj sidadis je preskaux duone de la pintoj kaj kavigis la
// flankojn kiel stelon ); la nova estas plenkorpa konveksa diamanto. La konturo
// komencas cxe la fronta akso ( 0° ) kaj iras horlogxe.
function diamantajDuonoj(s: number): [number, number][] {
  const kvar: [number, number][] = [
    [ s * Math.SQRT1_2, -s * Math.SQRT1_2 ],
    [ -s * Math.SQRT1_2, -s * Math.SQRT1_2 ],
    [ -s * Math.SQRT1_2, s * Math.SQRT1_2 ],
    [ s * Math.SQRT1_2, s * Math.SQRT1_2 ],
  ];
  // 0o20 punktoj. cxiu diamanta rando dividita en 4 — la SAMA rekta silueto, sed
  // pli glataj randoj kaj malpli da facetaj faldoj sur la tubo kaj la hoka pintajxo.
  const punktoj: [number, number][] = [];
  for ( let j = 0; j < kvar.length; j++ ) {
    const a = kvar[j], b = kvar[(j + 1) % kvar.length];
    for ( let k = 0; k < 4; k++ ) punktoj.push([ a[0] + (b[0] - a[0]) * k / 4, a[1] + (b[1] - a[1]) * k / 4 ]);
  }
  return punktoj;
}

// rondigitajDuonoj — Rondigu la angulojn de la fina diamanta ringo per densa
// centripeta kurbo, konservante la saman nombron da punktoj por senjunta ligado.
function rondigitajDuonoj(s: number): [number, number][] {
  const bazaj = diamantajDuonoj(s);
  const kurbo = new THREE.CatmullRomCurve3(
    bazaj.map(( [a, c] ) => new THREE.Vector3(a, c, 0)), true, "centripetal"
  );
  const kvanto = bazaj.length;
  return Array.from({ length: kvanto }, ( _, i ) => {
    const p = kurbo.getPointAt(i / kvanto);
    return [ p.x, p.y ] as [number, number];
  });
}

// Pilierkadroj — Ringaj kadroj por la pilieroj. tangento ta, ringa normalo m,
// longa akso L kaj largxa akso W.
interface Pilierkadroj {
  tangents: THREE.Vector3[];
  moj: THREE.Vector3[];
  Loj: THREE.Vector3[];
  Woj: THREE.Vector3[];
}
// kreiPilierkadrojn — Konstruas la kadrojn. la ringa ebeno estas cxiam
// PERPENDIKULA al la kurbo-tangento (m = ta). La komenca kadro cxe la bazo estas
// la EKSTERA akso (H rotaciita je 45°, do la diamantaj pintoj alfrontas la
// diagonalojn kaj la flankoj laux la muroj), kaj la kadro sekvas la kurbon per
// PARALELA TRANSPORTO — cxiu ringo rotacias nur per la rotacio kiu turnas la
// tangenton, NENIAM per la tordo cxirkaux la tangento mem. La malnova projekcio
// re-projekciis la fiksitan horizontalan Lbazo en cxiu ringo; kiam la hoko
// klinigxas, tio lasis la sekcon spirali ~90° cxe la pinto (W farigxis preskaux
// vertikala kaj la fronta pinto de la diamanto fleksigxis strange flanken). Kun
// paralela transporto la fronta pinto restas fronta kaj la krono transiras glate
// kaj plata, cxu la sxafto rekta, cxu la talona hoko kurbigxas.
function kreiPilierkadrojn(curve: THREE.Curve<THREE.Vector3>, segmentoj: number, H: THREE.Vector3): Pilierkadroj {
  const Lbazo = new THREE.Vector3((H.x - H.z) * Math.SQRT1_2, 0, (H.x + H.z) * Math.SQRT1_2).normalize();
  const tangents: THREE.Vector3[] = [], moj: THREE.Vector3[] = [], Loj: THREE.Vector3[] = [], Woj: THREE.Vector3[] = [];
  const antauxaT = curve.getTangentAt(0).normalize();
  const antauxaL = new THREE.Vector3().copy(Lbazo).addScaledVector(antauxaT, -Lbazo.dot(antauxaT)).normalize();
  const axoTemp = new THREE.Vector3(), kvaternio = new THREE.Quaternion();
  for ( let i = 0; i <= segmentoj; i++ ) {
    const t = i / segmentoj;
    const ta = curve.getTangentAt(t).normalize();
    const m = ta;
    const L = new THREE.Vector3();
    if ( i === 0 ) {
      L.copy(antauxaL);
    } else {
      // La rotacio de la pasinta tangento al la nuna — la akso estas ilia kruca
      // produto. Se ili estas ( preskaux ) paralelaj, neniu rotacio necesas.
      axoTemp.crossVectors(antauxaT, ta);
      const sin = axoTemp.length();
      if ( sin > 1e-8 ) {
        axoTemp.normalize();
        const angulo = Math.atan2(sin, Math.max(-1, Math.min(1, antauxaT.dot(ta))));
        kvaternio.setFromAxisAngle(axoTemp, angulo);
        L.copy(antauxaL).applyQuaternion(kvaternio);
      } else {
        L.copy(antauxaL);
      }
    }
    // Re-ortonormaligu: forigu la tangentan komponanton kaj normaligu.
    L.addScaledVector(m, -L.dot(m)).normalize();
    const W = new THREE.Vector3().crossVectors(m, L).normalize();
    tangents.push(ta); moj.push(m); Loj.push(L); Woj.push(W);
    antauxaT.copy(ta); antauxaL.copy(L);
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
  const rondajDuonoj = rondigitajDuonoj(s);
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
    // La unuaj tri ringoj cxe la BAZO ankaux transiras iom post iom al la rondigita
    // konturo, por ke la rondigita ferma kapo kongruu perfekte (la malnova angula
    // kapo lasis kvadratan randon cxe la piliero-fino); la lastaj tri ringoj cxe la
    // kapo rondigas por la folio.
    const finRondiga = Math.max(0, Math.min(1, (i - (ringoj - 4)) / 3));
    const bazRondiga = Math.max(0, Math.min(1, (3 - i) / 3));
    const rondiga = Math.max(finRondiga, bazRondiga);
    const konturo = rondiga > 0
      ? duonoj.map(( punkto, j ) => [
          punkto[0] + (rondajDuonoj[j][0] - punkto[0]) * rondiga,
          punkto[1] + (rondajDuonoj[j][1] - punkto[1]) * rondiga,
        ] as [number, number])
      : duonoj;
    // La sekco restas plena laux la sxafto kaj iom post iom transiras al la
    // pli plata krono per glata Hermita funkcio.
    const t = i / ( ringoj - 1 );
    const u = talonoS0 > 0 ? Math.max(0, Math.min(1, (t - talonoS0) / (1 - talonoS0))) : 0;
    // La krono malvastigxas glate al la malgranda rondigita pinto, sen kunfalo
    // de la fina ringo en degenerajn triangulojn.
    const glata = u * u * ( 3 - 2 * u );
    const skalo = talonoS0 > 0 ? 1 - ( 1 - finialaSkalo ) * glata : 1;
    const largxaSkalo = talonoS0 > 0 ? 1 - ( 1 - finialaLargho ) * glata : 1;
    for ( const [a, c] of konturo ) vertoj.push(
      p.x + L.x * a * skalo + W.x * c * skalo * largxaSkalo,
      p.y + L.y * a * skalo + W.y * c * skalo * largxaSkalo,
      p.z + L.z * a * skalo + W.z * c * skalo * largxaSkalo
    );
  }
  const indeksoj: number[] = [];
  for ( let i = 0; i < segmentoj; i++ ) {
    const r0 = i * RINGO, r1 = (i + 1) * RINGO;
    for ( let j = 0; j < RINGO; j++ ) {
      const j2 = (j + 1) % RINGO;
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
  const punktoj = rondigitajDuonoj(s);
  const konturo = renversita ? [...punktoj].reverse() : punktoj;
  formo.moveTo(konturo[0][0] * longaSkalo, konturo[0][1] * longaSkalo * largxaSkalo);
  for ( const [a, c] of konturo.slice(1) ) formo.lineTo(a * longaSkalo, c * longaSkalo * largxaSkalo);
  formo.closePath();
  const kapo = new THREE.ShapeGeometry(formo);
  kapo.applyMatrix4(new THREE.Matrix4().makeBasis(n, b, ta));
  // La cxapo sidas gxuste sur la fina ringo. la flankajxo estas malfermita cxe
  // tiu ebenajxo, do ne estas dua samloka surfaco kiu povus z-fajfi aux desegni
  // krucan X.
  kapo.translate(p.x, p.y, p.z);
  return kapo;
}

export function aldoniKadranTubon(geos: THREE.BufferGeometry[], cX: number, cZ: number, yB: number, yT: number, sX: number, sZ: number, upward: boolean, klino = 0, folio = true): void {
  // La finialo estas TALONA HOKO kun glata, iom ronda krono kaj rondigitaj
  // anguloj cxe la folia/diamanta supro. La sekco transiras seninterrompe al la
  // malgranda antauxenpusxita finajxo; gxi ne estas trancxita plata aux akra.
  // out = 0o7/0o20. la hoka pinto elstaras ~0o1/0o2 de la angulo.
  const out = 0o7/0o20;
  // fora = 0o51/0o400. la sxafto staras ecx pli proksime al la muro-faco (~0o1/0o454 libero
  // cxe la plej mallongaj tavoloj) — apenaux tusxas la konstruajxon.
  const fora = 0o51/0o400;
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
  const kreiTalonanKurbo = (): { curve: THREE.Curve<THREE.Vector3>; talonoS0: number } => {
    // Sxafto. komencu GXUSTE cxe la bazo (supren) aux cxe la supro (spegule) gxis
    // la tavolo-rubo, kie la hoko komencigxas — nenio elstaras SUB la bazo (la
    // diamanta spegulo reflektus tian elstarajxon SUPER la grundon, apud la
    // pilier-bazo). La linia proporcio estas la SAMA por ambaux direktoj
    // (spegulitaj y-oj), do la rekto restas paralela al la muro la tutan sxafton.
    const yA = upward ? yB : yT;
    const yS = upward ? yT - 0o1/0o4 : yB + 0o1/0o4;
    const yF = upward ? yT + 0o3/0o10 : yB - 0o3/0o10;
    const linia = (tieroAlto - 0o1/0o100) / tieroAlto;
    const suproX = cX + sX * (fora - klino * linia);
    const suproZ = cZ + sZ * (fora - klino * linia);
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
    const finialaSkalo = 0o1/0o4, finialaLargho = 0o1/0o4, tipLongeco = 0o1/0o100;
    partoj.push(kreiDiamantanSvingon(curve, SEG, s, kadroj, talonoS0, finialaSkalo, finialaLargho, tipLongeco));
    // Rondigita ferma kapo cxe la bazo (frontas kontraux la tangento, for de la
    // sxafto) — la malnova angula ventumilo lasis kvadratan randon cxe la fino.
    partoj.push(kreiRondigitanDiamantanKapon(curve.getPointAt(0), kadroj.tangents[0], kadroj.Loj[0], kadroj.Woj[0], s, 1, 1));
    const tipaCentro = curve.getPointAt(1);
    const tipaRingo = tipaCentro.clone().addScaledVector(kadroj.tangents[SEG], -0o1/0o100);
    // La svingo finigxas cxe tipaRingo kaj la unu sola plata cxapo estas iomete
    // antaux gxi. Ne kreu duan ringaron aux samlokan kapon. tio estis la fonto de
    // la krucita finajxo.
    const finaKapo = kreiRondigitanDiamantanKapon(tipaRingo, kadroj.tangents[SEG], kadroj.Loj[SEG], kadroj.Woj[SEG], s, finialaSkalo, finialaLargho, true);
    // La plata cxapo restu aparta, por ke gxi ne ricevu la flankajn normalojn de
    // la tubo kaj ne montrigxu kiel krucita X.
    geos.push(kunfandiKajVeldoiGeometriojn(partoj));
    geos.push(finaKapo);
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

// aldoniEnirejon — Uniforma enirejo por cxiuj tipoj. pli malgranda kaj pli plata
// (malpli profunda), sidanta sur la tero, kun ora bevelo cxirkaux la rando.
//     @param flankoj ( number ) - Kiom da pordoj ( la sanktejo havas 4, unu po flanko ).
function aldoniEnirejon(group: THREE.Group, d: number, kadraMaterialo: THREE.MeshStandardMaterial, eniraMaterialo: THREE.MeshStandardMaterial, flankoj = 1): void {
  const pordGrupo = new THREE.Group();
  const blokoLargho = 0o233/0o100, tw = blokoLargho * 0o45/0o100, eh = 0o11/0o4;
  const shape = rondigitaTrapezaFormo(blokoLargho, tw, eh, 0o3/0o20, 0o1/0o10);
  const enirejo = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0o2/0o10, bevelEnabled: true, bevelSize: 0o5/0o100, bevelThickness: 0o5/0o100, bevelSegments: 2, curveSegments: 0o10 }), eniraMaterialo);
  enirejo.position.set(0, 0, d / 2 - 0o1/0o100); pordGrupo.add(enirejo);
  // Bevelo gluigxas al la pli plata pordo-fronto (d/2 + 0o5/0o20 + 0o1/0o20).
  // Densa sampado (0o64 punktoj) kun norma tensio (0o1/0o2). la ora tubo sekvas la
  // rondigitan trapezan konturon glate cxe la anguloj — neniu distordigxo kie la
  // pecoj kunigxas (la malnova 0o24/0o23/0o40 ondumis kaj pincxis cxe la anguloj).
  const ornamajPunktoj = shape.getPoints(0o64).map((p: THREE.Vector2) => new THREE.Vector3(p.x, p.y, d / 2 + 0o3/0o10));
  pordGrupo.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ornamajPunktoj, true, "catmullrom", 0o1/0o2), 0o100, 0o1/0o20, 6, true), kadraMaterialo));
  // Turnitaj kopioj — la sama pordo sur cxiu flanko. La kopioj kunhavigas la
  // geometriojn kaj materialojn de la unua, do la multaj pordoj ne kostas aldone.
  for ( let i = 0; i < flankoj; i++ ) {
    const kopio = i === 0 ? pordGrupo : pordGrupo.clone();
    kopio.rotation.y = i * Math.PI / 2;
    group.add( kopio );
  }
}

// aldoniSteleanSignon — Uniforma 3D stela signo por cxiuj konstruajxoj. nesimetriaj
// rondigitaj supraj anguloj (r1 = 0o1/0o10, r2 = 0o1/0o4), rektaj malsupraj. La Gawekiif-nomo
// staras sur la tero apud la pordo. La texturo estas travidebla — nur la teksto
// montrigxas super la malhela steleo (neniu nigra bloko).
function aldoniSteleanSignon(group: THREE.Group, name: string, w: number, d: number): void {
  const teksajxo = generiSkribanTeksajxon(nomoAih(name), { w: 0o300, h: 0o1516, ink: "#d8b068" });
  teksajxo.wrapS = teksajxo.wrapT = THREE.ClampToEdgeWrapping;
  // La signo staras sur la tero apud la pordo (0o1/0o100 levita por ne z-fajfi kun la grundo).
  const signaY = 0o1/0o100;
  const steleo = new THREE.Mesh(
    new THREE.ExtrudeGeometry(kreiSteleanFormon(0o5/0o10, 0o24/0o10, 0o1/0o10, 0o1/0o4), { depth: 0o5/0o40, bevelEnabled: false, curveSegments: 0o10 }),
    new THREE.MeshStandardMaterial({ color: 0x081818, roughness: 0o23/0o40 })
  );
  steleo.position.set(w * 0o13/0o40, signaY, d / 2 + 0o104/0o100 - 0o5/0o100); steleo.castShadow = true; group.add(steleo);
  // ShapeGeometry uzas la krudajn formo-koordinatojn kiel UV (ne [0,1]),
  // do la texturo algluigxus al la malsupra-dekstra angulo de la faco.
  // Normaligu la UV-ojn al la limig-skatolo por plenigi la tutan facon.
  const faceGeo = new THREE.ShapeGeometry(kreiSteleanFormon(0o4/0o10, 0o215/0o100, 0o1/0o10, 0o1/0o4), 0o10);
  faceGeo.computeBoundingBox();
  const facePoz = faceGeo.getAttribute("position");
  const faceUV = faceGeo.getAttribute("uv");
  const faceUjo = faceGeo.boundingBox!;
  const faceLargho = Math.max(1e-6, faceUjo.max.x - faceUjo.min.x);
  const faceAlto = Math.max(1e-6, faceUjo.max.y - faceUjo.min.y);
  for ( let i = 0; i < faceUV.count; i++ ) {
    faceUV.setXY(i,
      (facePoz.getX(i) - faceUjo.min.x) / faceLargho,
      (facePoz.getY(i) - faceUjo.min.y) / faceAlto);
  }
  faceUV.needsUpdate = true;
  const face = new THREE.Mesh(
    faceGeo,
    new THREE.MeshBasicMaterial({ map: teksajxo, transparent: true, toneMapped: false })
  );
  // La faco sidas klare ANTAUX la steleo-fronto ( la ekstrudo 0o5/0o40 profunda
  // finigxas je d/2 + 0o111/0o100 ) — la malnova sama pozicio z-fajfis kun la
  // malhela plato kaj la teksto flagris.
  face.position.set(w * 0o13/0o40, signaY, d / 2 + 0o116/0o100); group.add(face);
}

// aldoniDiamantanSpegulon — Reflektu la konstruajxon suben (diamanta spegulo) kun
// ora ringo cxe la bazo.
function aldoniDiamantanSpegulon(sceno: THREE.Scene, spec: KonstruSpec, group: THREE.Group, w: number): void {
  const mg = group.clone();
  mg.scale.y = -1;
  mg.position.y = (spec.h0 || 0) - 0o2/0o100;
  mg.traverse( m => { if ( m instanceof THREE.Mesh ) m.castShadow = false; } );
  sceno.add( mg );
  const oroMaterialo = new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0o7/0o10, roughness: 0o26/0o100, emissive: 0x302808, emissiveIntensity: 0o26/0o100 });
  const ringGeo = new THREE.RingGeometry( Math.max(0o1/0o100, w * 0o23/0o100 + 0o11/0o100), Math.max(0o2/0o100, w * 0o23/0o100 + 0o21/0o100), 32 );
  const ring = new THREE.Mesh( ringGeo, oroMaterialo );
  ring.rotation.x = -Math.PI / 2;
  ring.position.set( spec.x, (spec.h0 || 0) + 0o1/0o100, spec.z );
  sceno.add( ring );
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
  const malpliiX = (w / 2 - supraLargho / 2) / Math.max(1, tiers - 1), malpliiZ = (d / 2 - supraProfundo / 2) / Math.max(1, tiers - 1);
  const T = TIPARO[typeKey] || TIPARO.domo;
  const muraKoloro = T.wall, kadraKoloro = T.frame;
  const murajGeometrioj: THREE.BufferGeometry[] = [], kadrajGeometrioj: THREE.BufferGeometry[] = [];
  // Klinitaj muroj. cxiu tavolo estas trapezoida (supro pli mallargxa ol bazo).
  const klino = 0o5/0o20;

  for ( let i = 0; i < tiers; i++ ) {
    const hw = w / 2 - i * malpliiX, hd = d / 2 - i * malpliiZ, y = i * tieroAlto;
    const tavolo = kreiKlinoTavolon( hw, hd, hw - klino, hd - klino, tieroAlto );
    tavolo.translate( 0, y + tieroAlto / 2, 0 ); murajGeometrioj.push( tavolo );
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) aldoniKadranTubon( kadrajGeometrioj, sX * hw, sZ * hd, y, y + tieroAlto, sX, sZ, true, klino );
    // Pli plata horizontala rando. la supraj kadraj stangoj estas pli maldikaj
    // sed restas proksime al la supra rando (supro 0o1/0o100 sub gxi).
    for ( const sZ of [ -1, 1 ] ) { const stango = new THREE.BoxGeometry((hw - klino) * 2 + 0o11/0o100, 0o3/0o40, 0o15/0o100); stango.translate(0, y + tieroAlto - 0o1/0o20, sZ * (hd - klino)); kadrajGeometrioj.push(stango); }
    for ( const sX of [ -1, 1 ] ) { const bar2 = new THREE.BoxGeometry(0o15/0o100, 0o3/0o40, (hd - klino) * 2 + 0o11/0o100); bar2.translate(sX * (hw - klino), y + tieroAlto - 0o1/0o20, 0); kadrajGeometrioj.push(bar2); }
  }
  // NENIUJ sub-teraj muroj/pilieroj por la ekstera konstruajxo — la sub-teraj
  // niveloj estas konstruataj nur de la interno ( eniriInternon konstruas siajn
  // proprajn murojn/plankojn por ĉiu sub-tera etaĝo laux spec.sube ). Entombigita
  // ekstera strukturo aperus kiel duobla konstruajxo ene de la sub-teraj ĉambroj.
  // spec.sube/tieroAltoSub restas en la spec, por ke la interno povu kongrui.

  const group = new THREE.Group();
  // Malpli reflekta mura materialo. pli alta malglateco, preskaux neniu metaleco.
  const muraMaterialo = new THREE.MeshStandardMaterial({ color: muraKoloro, roughness: typeKey === "kasafeo" ? 0o41/0o100 : 0o3/0o4, metalness: 0, envMapIntensity: 0 });
  const kadraMaterialo = kreiOranMaterialon( kadraKoloro );
  const eniraMaterialo = kreiEniranMaterialon();

  const muroj = new THREE.Mesh(kunfandiGeometriojn(murajGeometrioj), muraMaterialo);
  muroj.castShadow = muroj.receiveShadow = true;
  muroj.userData = { spec, buildingType: T };
  selektajxoj.push(muroj);
  group.add(muroj);
  group.add(new THREE.Mesh(kunfandiGeometriojn(kadrajGeometrioj), kadraMaterialo));

  // Uniforma enirejo por cxiuj tipoj — reuzebla komponanto. La sanktejo ricevas
  // pordojn sur CXIUJ kvar flankoj ( turnitaj kopioj de la sama pordo ).
  aldoniEnirejon( group, d, kadraMaterialo, eniraMaterialo, typeKey === "sanktejo" ? 4 : 1 );

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
      const b1 = new THREE.BoxGeometry(w + 4, 0o1/0o20, 0o5/0o20); b1.translate(0, 0o7/0o100, sZ * (d / 2 + 0o4/0o10)); group.add(new THREE.Mesh(b1, kadraMaterialo));
    }
    for ( const sX of [ -1, 1 ] ) {
      const b2 = new THREE.BoxGeometry(0o5/0o20, 0o1/0o20, d + 4); b2.translate(sX * (w / 2 + 0o4/0o10), 0o7/0o100, 0); group.add(new THREE.Mesh(b2, kadraMaterialo));
    }
    // Kvar lancx-pilieroj cxe la apronaj anguloj kun brilaj pintoj.
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      const piliero = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o10, 0o3/0o20, 0o7/0o4, 6), kadraMaterialo);
      piliero.position.set(sX * (w / 2 + 0o15/0o10), 0o7/0o10, sZ * (d / 2 + 0o15/0o10)); piliero.castShadow = true; group.add(piliero);
      const brilo = new THREE.Mesh(new THREE.SphereGeometry(0o5/0o40, 0o10, 0o6), eniraMaterialo);
      brilo.position.set(sX * (w / 2 + 0o15/0o10), 0o7/0o4 + 0o5/0o40, sZ * (d / 2 + 0o15/0o10)); group.add(brilo);
    }
    // Malgranda ora lancx-ringo sur la tegmento, sub la sxipo.
    const roofY = tiers * tieroAlto;
    const ringo = new THREE.Mesh(new THREE.RingGeometry(0o15/0o20, 0o23/0o20, 0o40).rotateX(-Math.PI / 2), kadraMaterialo);
    ringo.position.y = roofY + 0o1/0o40; group.add(ringo);
  }

  if ( typeKey === "kasafeo" ) {
    // Videblaj pilol-fenestroj sur la ekstero (kiel sur la kosmosxipo) — unu per
    // faco per etagxo. La muroj klinigxas, do la fenestroj estas TURNITAJ je la
    // klin-angulo por kusxi plate sur la klinita muro (kiel la sxipaj fenestroj).
    // La fronta faco (f=0, +z) de la teretagxo havas la pordon — neniu fenestro tie.
    const fenAlto = Math.min(0o5/0o10, tieroAlto * 0o3/0o12);
    const klinaAngulo = Math.atan(klino / tieroAlto);
    const fenestraMaterialo = new THREE.MeshStandardMaterial({
      color: 0x0a1a18, emissive: 0x688888, emissiveIntensity: 0o3/0o20,
      roughness: 0o3/0o20, metalness: 0o3/0o20, transparent: true, opacity: 0o7/0o10,
    });
    for ( let i = 0; i < tiers; i++ ) {
      const hwT = w / 2 - i * malpliiX, hdT = d / 2 - i * malpliiZ;
      const yC = i * tieroAlto + tieroAlto / 2;
      const faco = Math.min(hwT, hdT) - klino / 2;
      const ww = Math.min(faco * 2 - 0o3/0o10, faco * 4/3 + 0o1/0o4);
      for ( let f = 0; f < 4; f++ ) {
        if ( i === 0 && f === 0 ) continue;
        const faca = new THREE.Group();
        faca.rotation.y = f * Math.PI / 2;
        const monto = new THREE.Group();
        monto.position.set( 0, yC - fenAlto / 2, faco + 0o1/0o100 );
        monto.rotation.x = -klinaAngulo;
        faca.add(monto);
        const fen = new THREE.Mesh(
          new THREE.ShapeGeometry(kreiPilolFenestranFormon(ww, fenAlto), 0o100),
          fenestraMaterialo
        );
        monto.add(fen);
        // Ora pilola rando ĉirkaŭ la fenestro
        const konturo = kreiPilolFenestranFormon(ww, fenAlto).getPoints(0o200)
          .map((p: THREE.Vector2) => new THREE.Vector3(p.x, p.y, 0));
        const rimo = new THREE.Mesh(
          new THREE.TubeGeometry(new THREE.CatmullRomCurve3(konturo, true, "centripetal"), 0o100, 0o1/0o20, 6, true),
          kadraMaterialo
        );
        monto.add(rimo);
        group.add(faca);
      }
    }
  }

  // Uniforma 3D stela signo por cxiuj konstruajxoj — reuzebla komponanto.
  aldoniSteleanSignon(group, name, w, d);

  if ( typeKey === "mangxejo" ) {
    // Eksteraj tabloj — la SAMA tablo/segxo-aseto kiel la internaj mangxejo-
    // tabloj ( aldoniManĝtablon el la mebloj-modulo ), en la sama bruna ligna
    // koloro kiel la internaj tabloj.
    const lignaMaterialo = new THREE.MeshStandardMaterial({ color: LIGNA_KOLORO, roughness: 0o41/0o100, metalness: 0o11/0o100 });
    for ( let i = -1; i <= 1; i += 2 ) {
      const tx = i * 5, tz = d / 2 + 3;
      // La tablo kun la kvar benkoj cxirkaux gxi — la sama manĝa arangxo kiel
      // en la internaj mangxejoj ( aldoniManĝtablon el la mebloj-modulo ), kun
      // la sama ligna kaj ora rando ( kadraMaterialo ).
      aldoniManĝtablon( group, tx, tz, 0, lignaMaterialo, kadraMaterialo );
    }
  }
  // Flankaj pordoj forigitaj laux peto de uzanto
  // Stacia platformo forigita laux peto de uzanto
  // La ora bazplato restas nur sur la sanktejo ( la speciala centra konstruajxo )
  // — la normalaj konstruajxoj ( domo/turo/mangxejo/kasafeo ) ne havas gxin.
  if ( sube > 0 && typeKey === "sanktejo" ) {
    // Rondigita ora bazplato — kvadrata kadro kun RONDIGITAJ anguloj cxirkaux la
    // piedo de la konstruajxo ( la malnovaj kvar rektaj stangoj formis akrajn
    // angulojn ). La sama dikeco ( 0o1/0o2 ) kaj alto ( 0o23/0o100 ) kiel la
    // malnovaj stangoj, sed unu kontinua kadro kun molaj anguloj.
    const kadroW = w + 0o72/0o100, kadroD = d + 0o72/0o100;  // ekstera rando je d/2 + 0o35/0o100
    const dikeco = 0o1/0o2;                                  // 0.5 — sama kiel la malnova stango
    // 0.5 — modesta rondigo: la kadra angulo atingas la diagonalajn angulpilierojn
    // ( la malnova 1.0 fortrancxis la kadron sub la pilieroj ).
    const rAnguloj = 0o1/0o2;
    const kadroFormo = kreiRondigitanRektangulanFormon( kadroW, kadroD, rAnguloj );
    // La ena truo estas la sama rondigita kvadrato, pli malgranda je la dikeco,
    // kun la MALA ( CW ) ventumilo — kiel la porda truo en internoj.ts, por ke
    // Earcut rekonu gxin kiel truon ( neniu normaligo en triangulateShape ).
    const ena = kreiRondigitanRektangulanFormon(
      kadroW - dikeco * 2, kadroD - dikeco * 2, Math.max( 0o1/0o20, rAnguloj - dikeco )
    ).getPoints( 0o40 );
    kadroFormo.holes.push( new THREE.Path( ena.reverse() ) );
    const kadroGeo = new THREE.ExtrudeGeometry( kadroFormo, { depth: 0o23/0o100, bevelEnabled: false, curveSegments: 0o40 } );
    // Plata ( rotaciita X ) — la dikeco farigxas vertikala, kaj la kadro sidas
    // centrita je la sama nivelo kiel la malnova stango ( 0o3/0o40 ).
    kadroGeo.rotateX( -Math.PI / 2 );
    kadroGeo.translate( 0, -0o23/0o200, 0 );
    const kadro = new THREE.Mesh( kadroGeo, kadraMaterialo );
    kadro.position.y = 0o3/0o40;
    group.add( kadro );
  }

  group.position.set(spec.x, spec.h0 || 0, spec.z);
  group.rotation.y = spec.rot;
  sceno.add(group);
  if ( spec.diamond ) aldoniDiamantanSpegulon(sceno, spec, group, w);
  return group;
}