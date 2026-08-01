// Ziggurat-konstruilo — sxtupajramidaj konstruajxoj. verdaj/oraj domoj, brunaj/becxaj mangxejoj, blankaj/grizaj stacioj
import * as THREE from "three";
import { generiSkribanTeksajxon } from "./skripto-rivelilo.js";
import { nomoAih } from "../src/tradukoj.js";

export interface KonstruTipo { labelKey: string; wall: number; frame: number; chip: string; flavorKey: string; }
export const TIPARO: Record<string, KonstruTipo> = {
  domo:   { labelKey: "tipDomo",      wall: 0x184838, frame: 0xd8b068, chip: "#78a888", flavorKey: "flvDomo" },
  manĝejo:  { labelKey: "tipMangxejo",  wall: 0x584028, frame: 0xd8c898, chip: "#c8a868", flavorKey: "flvMangxejo" },
  stacio: { labelKey: "tipStacio",      wall: 0xd8e0e0, frame: 0x889898, chip: "#c0c8c8", flavorKey: "flvStacio" },
  stacioxipo: { labelKey: "tipStacioxipo", wall: 0xc8c8c8, frame: 0xd8b068, chip: "#c8c8c8", flavorKey: "flvStacioxipo" },
  turo:   { labelKey: "tipTuro",        wall: 0x205040, frame: 0xd8b068, chip: "#88b8a0", flavorKey: "flvTuro" },
  sanktejo: { labelKey: "tipSanktejo",  wall: 0x184038, frame: 0xe0c078, chip: "#e0c078", flavorKey: "flvSanktejo" },
};

export interface KonstruSpec { x: number; z: number; type: string; name: string; niveloj: number; w: number; d: number; tieroAlto: number; sube?: number; tieroAltoSub?: number; rot: number; fixed?: string; h0?: number; diamond?: boolean; flugoY?: number; }

function rondigitaTrapezaFormo(blokoLargho: number, tw: number, h: number, rb: number, rt: number): THREE.Shape {
  const s = new THREE.Shape(), sl = (blokoLargho / 2 - tw / 2) / h;
  s.moveTo(-blokoLargho / 2 + rb, 0); s.lineTo(blokoLargho / 2 - rb, 0);
  s.quadraticCurveTo(blokoLargho / 2, 0, blokoLargho / 2 - sl * rt, rt);
  s.lineTo(tw / 2 + sl * rt, h - rt); s.quadraticCurveTo(tw / 2, h, tw / 2 - rt, h);
  s.lineTo(-tw / 2 + rt, h); s.quadraticCurveTo(-tw / 2, h, -tw / 2 - sl * rt, h - rt);
  s.lineTo(-blokoLargho / 2 + sl * rb, rb); s.quadraticCurveTo(-blokoLargho / 2, 0, -blokoLargho / 2 + rb, 0);
  return s;
}

// kreiKlinoTavolon — Kvadrata tavolo kun klinitaj muroj: la supro estas pli
// mallarĝa ol la bazo, do cxiu tavolo aspektas kiel trapezoido.
// 4-segmenta cilindro donas precize kvadratan frustumon (cxiuj konstruajxoj estas kvadrataj).
// Eksportita por ke la spacosxipo reuzu la samajn tavolojn.
export function kreiKlinoTavolon(hwB: number, hdB: number, hwT: number, hdT: number, alto: number): THREE.BufferGeometry {
  const rB = Math.max(1/16, Math.hypot(hwB, hdB));
  const rT = Math.max(1/16, Math.hypot(hwT, hdT));
  const g = new THREE.CylinderGeometry(rT, rB, alto, 4, 1);
  g.rotateY(Math.PI / 4);
  return g;
}

// kreiSteleanFormon — Vertikala signa plato kun nesimetriaj rondigitaj supraj
// anguloj (r1 ≠ r2) kaj rektaj malsupraj anguloj. Uzata por la steloj.
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

// diamantajDuonoj — Tridek-du-punkta sekco de diamanto: pintoj je 45° (pli granda ol
// la malnova cirklo), enaj aksoj nur iomete enigitaj por mildigi la angulojn — la
// piliero estas pli klare diamanta (malpli ronda) ol antauxe. La konturo komencas
// ĉe la FRONTA akso (0°) kaj iras horloĝe.
function diamantajDuonoj(s: number): [number, number][] {
  const okto: [number, number][] = [
    [ s * 7/16 * Math.SQRT2, 0 ],
    [ s * Math.SQRT1_2, -s * Math.SQRT1_2 ],
    [ 0, -s * 7/16 * Math.SQRT2 ],
    [ -s * Math.SQRT1_2, -s * Math.SQRT1_2 ],
    [ -s * 7/16 * Math.SQRT2, 0 ],
    [ -s * Math.SQRT1_2, s * Math.SQRT1_2 ],
    [ 0, s * 7/16 * Math.SQRT2 ],
    [ s * Math.SQRT1_2, s * Math.SQRT1_2 ],
  ];
  // 32 punktoj: ĉiu oktona rando dividita en 4 — la SAMA diamanta silueto, sed
  // pli glataj randoj kaj multe malpli da facetaj faldoj sur la tubo kaj la
  // hoka pintaĵo (la malnova 16-punkta ventumilo montris videblajn faldliniojn).
  const punktoj: [number, number][] = [];
  for ( let j = 0; j < okto.length; j++ ) {
    const a = okto[j], b = okto[(j + 1) % okto.length];
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

// Pilierkadroj — Ringaj kadroj por la pilieroj: tangento ta, ringa normalo m,
// longa akso L kaj larĝa akso W.
interface Pilierkadroj {
  tangents: THREE.Vector3[];
  moj: THREE.Vector3[];
  Loj: THREE.Vector3[];
  Woj: THREE.Vector3[];
}
// kreiPilierkadrojn — Konstruas la kadrojn: la ringa ebeno estas ĉiam
// PERPENDIKULA al la kurbo-tangento (m = ta) kaj la longa akso restas la EKSTERA
// akso (H rotaciita je 45°, do la diamantaj pintoj alfrontas la murojn kaj la
// piliero sidas apud la angulo), konstanta en la mondo — neniu Frenet-tordo, la
// sekco ne spiralas ĉirkaŭ la kurbo, ĉu la ŝafto rekta, ĉu la talona hoko
// kurbiĝas.
function kreiPilierkadrojn(curve: THREE.Curve<THREE.Vector3>, segmentoj: number, H: THREE.Vector3): Pilierkadroj {
  const Lbazo = new THREE.Vector3((H.x - H.z) * Math.SQRT1_2, 0, (H.x + H.z) * Math.SQRT1_2).normalize();
  const tangents: THREE.Vector3[] = [], moj: THREE.Vector3[] = [], Loj: THREE.Vector3[] = [], Woj: THREE.Vector3[] = [];
  for ( let i = 0; i <= segmentoj; i++ ) {
    const t = i / segmentoj;
    const ta = curve.getTangentAt(t).normalize();
    const m = ta;
    const L = new THREE.Vector3().copy(Lbazo).addScaledVector(m, -Lbazo.dot(m)).normalize();
    const W = new THREE.Vector3().crossVectors(m, L).normalize();
    tangents.push(ta); moj.push(m); Loj.push(L); Woj.push(W);
  }
  return { tangents, moj, Loj, Woj };
}

// kreiDiamantanSvingon — Kvazaŭ-tubo laŭ unu kontinua kurbo kun DIAMANTA sekco
// (ne cirkla). La ŝafto enfluas senrompe en pli platan kronon, kiu finiĝas per
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
  // la malnova pinĉo ĉe la duonlun-forma transiro ne plu aperu.
  const punktoj = Array.from({ length: ringoj }, ( _, i ) => curve.getPointAt(i / ( ringoj - 1 )));
  const vertoj: number[] = [];
  for ( let i = 0; i < ringoj; i++ ) {
    let p = punktoj[i];
    if ( i === segmentoj && tipLongeco > 0 ) {
      p = p.clone().addScaledVector(curve.getTangentAt(1).normalize(), -tipLongeco);
    }
    const L = kadroj.Loj[i], W = kadroj.Woj[i];
    // Nur la lastaj tri ringoj transiras iom post iom al la rondigita konturo;
    // tiel la plata folio ne subite ŝanĝas formon ĉe la kapo.
    const rondiga = Math.max(0, Math.min(1, (i - (ringoj - 4)) / 3));
    const konturo = rondiga > 0
      ? duonoj.map(( punkto, j ) => [
          punkto[0] + (rondajDuonoj[j][0] - punkto[0]) * rondiga,
          punkto[1] + (rondajDuonoj[j][1] - punkto[1]) * rondiga,
        ] as [number, number])
      : duonoj;
    // La sekco restas plena laŭ la ŝafto kaj iom post iom transiras al la
    // pli plata krono per glata Hermita funkcio.
    const t = i / ( ringoj - 1 );
    const u = talonoS0 > 0 ? Math.max(0, Math.min(1, (t - talonoS0) / (1 - talonoS0))) : 0;
    // La krono malvastiĝas glate al la malgranda rondigita pinto, sen kunfalo
    // de la fina ringo en degenerajn triangulojn.
    const glata = u * u * ( 3 - 2 * u );
    const skalo = talonoS0 > 0 ? 1 - ( 1 - finialaSkalo ) * glata : 1;
    const larĝaSkalo = talonoS0 > 0 ? 1 - ( 1 - finialaLargho ) * glata : 1;
    for ( const [a, c] of konturo ) vertoj.push(
      p.x + L.x * a * skalo + W.x * c * skalo * larĝaSkalo,
      p.y + L.y * a * skalo + W.y * c * skalo * larĝaSkalo,
      p.z + L.z * a * skalo + W.z * c * skalo * larĝaSkalo
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

// kreiDiamantanKapon — Ferma kapo por la diamanta kvazaŭ-tubo: triangula ventumilo
// de la centro ĝis la ringo, perpendikulare al la tangento.
function kreiDiamantanKapon(
  p: THREE.Vector3, ta: THREE.Vector3, n: THREE.Vector3, b: THREE.Vector3, s: number,
  longaSkalo = 1, larĝaSkalo = 1, centro: THREE.Vector3 = p
): THREE.BufferGeometry {
  const duonoj = diamantajDuonoj(s);
  const kvanto = duonoj.length;
  const vertoj: number[] = [ centro.x, centro.y, centro.z ];
  for ( const [a, c] of duonoj ) vertoj.push(
    p.x + n.x * a * longaSkalo + b.x * c * larĝaSkalo,
    p.y + n.y * a * longaSkalo + b.y * c * larĝaSkalo,
    p.z + n.z * a * longaSkalo + b.z * c * larĝaSkalo
  );
  const indeksoj: number[] = [];
  for ( let j = 0; j < kvanto; j++ ) indeksoj.push(0, j + 1, ((j + 1) % kvanto) + 1);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertoj), 3));
  g.setIndex(indeksoj);
  g.computeVertexNormals();
  return g;
}

// kreiRondigitanDiamantanKapon — Unu sola plata finaĵo kun rondigitaj
// diamanto-anguloj. Ĝi ne enhavas aldonajn ringojn aŭ centran ventumilon: la
// svingo jam liveras la flankojn, kaj ĉi tiu formo nur fermas ĝian lastan ringon.
function kreiRondigitanDiamantanKapon(
  p: THREE.Vector3, ta: THREE.Vector3, n: THREE.Vector3, b: THREE.Vector3, s: number,
  longaSkalo: number, larĝaSkalo: number
): THREE.BufferGeometry {
  const formo = new THREE.Shape();
  const punktoj = rondigitajDuonoj(s).reverse();
  formo.moveTo(punktoj[0][0] * longaSkalo, punktoj[0][1] * longaSkalo * larĝaSkalo);
  for ( const [a, c] of punktoj.slice(1) ) formo.lineTo(a * longaSkalo, c * longaSkalo * larĝaSkalo);
  formo.closePath();
  const kapo = new THREE.ShapeGeometry(formo);
  kapo.applyMatrix4(new THREE.Matrix4().makeBasis(n, b, ta));
  // La ĉapo sidas ĝuste sur la fina ringo: la flankaĵo estas malfermita ĉe
  // tiu ebenaĵo, do ne estas dua samloka surfaco kiu povus z-fajfi aŭ desegni
  // krucan X.
  kapo.translate(p.x, p.y, p.z);
  return kapo;
}

export function aldoniKadranTubon(geos: THREE.BufferGeometry[], cX: number, cZ: number, yB: number, yT: number, sX: number, sZ: number, upward: boolean, klino = 0, folio = true): void {
  // La finialo estas TALONA HOKO kun glata, iom ronda krono kaj rondigitaj
  // anguloj ĉe la folia/diamanta supro. La sekco transiras seninterrompe al la
  // malgranda antaŭenpuŝita finaĵo; ĝi ne estas tranĉita plata aŭ akra.
  // out = 7/16: la hoka pinto elstaras ~1/2 de la angulo.
  const out = 7/16;
  // fora = 41/256: la ŝafto staras eĉ pli proksime al la muro-faco (~1/300 libero
  // ĉe la plej mallongaj tavoloj) — apenaŭ tuŝas la konstruaĵon.
  const fora = 41/256;
  // Sub-teraj (malsuprenirantaj) pilieroj bezonas pli da libero: ĉe la mallongaj
  // sub-teraj tavoloj la pli malgranda fora enigus la diamanton en la muro-facon
  // (la malnova 21/128 donas +0.0028; 41/256 klipus je -0.0013).
  const foraSub = 21/128;
  const cXT = cX - sX * klino, cZT = cZ - sZ * klino;
  // Ŝafto KLINITA samkiel la muroj: rekta linio PARALELA al la klinita muro (ne
  // vertikala), do la libero al la muro restas konstanta laŭlonge kaj la piliero
  // sidas apud la muro ĉie — neniu kreskanta truo inter piliero kaj muro.
  // La malsuprenirantaj (flipped) pilieroj estas la PRECIZA vertikala spegulo de
  // la suprenirantaj — la samaj formoj ambaŭflanke de la sxipo.
  const tieroAlto = yT - yB;
  // Komuna talona kurbo — supren kaj la vertikala spegulo malsupren: rekta ŝafto
  // PARALELA al la klinita muro (samaj deklivoj — neniu kreskanta truo inter
  // piliero kaj muro), kiu ĉe la rando komencigas unu glatan suprenan svingon.
  // La unua kontrolo kuŝas SUR la ŝafto-direkto, do la kurbiĝo komenciĝas glate
  // (C¹, neniu angulo). La arko leviĝas al iom rondigita folia/diamanta krono,
  // sen ekzakte plata supro. La malsupra versio estas la vertikala spegulo de la
  // supra — la samaj formoj ambaŭflanke de la sxipo.
  const kreiTalonanKurbo = (): { curve: THREE.Curve<THREE.Vector3>; talonoS0: number } => {
    // Ŝafto: komencu iom sub la bazo (supren) aŭ iom super la supro (spegule) ĝis
    // la tavolo-rubo, kie la hoko komenciĝas. La linia proporcio estas la SAMA
    // por ambaŭ direktoj (spegulitaj y-oj), do la rekto restas paralela al la
    // muro la tutan ŝafton.
    const yA = upward ? yB - 1/16 : yT + 1/16;
    const yS = upward ? yT - 1/4 : yB + 1/4;
    const yF = upward ? yT + 3/8 : yB - 3/8;
    const linia = (tieroAlto - 1/64) / tieroAlto;
    const suproX = cX + sX * (fora - klino * linia);
    const suproZ = cZ + sZ * (fora - klino * linia);
    const p0 = new THREE.Vector3(cX + sX * fora, yA, cZ + sZ * fora);
    const p1 = new THREE.Vector3(suproX, yS, suproZ);
    const p2 = new THREE.Vector3(cXT + sX * out, yF, cZT + sZ * out);
    const dx = p1.x - p0.x, dy = p1.y - p0.y, dz = p1.z - p0.z;
    const direkto = new THREE.Vector3(dx, dy, dz).normalize();
    // Unu rekta ŝafto kaj unu kubika hoko: la unua kontrolo de la hoko kuŝas
    // sur la ŝafto-direkto, do la kuniĝo estas C¹ kaj ne montras angulon.
    // La dua kontrolo estas iom sub la pinto, por ke la supro estu ronda
    // folio/diamanto, ne ekzakte horizontala kaj ne tranĉite plata.
    const hoko = new THREE.CubicBezierCurve3(
      p1,
      p1.clone().addScaledVector(direkto, 3/16),
      new THREE.Vector3(p2.x - sX * 3/16, p2.y + ( upward ? -1/32 : 1/32 ), p2.z - sZ * 3/16),
      p2
    );
    const putho = new THREE.CurvePath<THREE.Vector3>();
    putho.add(new THREE.LineCurve3(p0, p1));
    putho.add(hoko);
    // La malvastiĝo komenciĝas ĝuste ĉe la pli malalta ŝultro, laŭ la arka
    // longo de la tuta kontinua kurbo.
    const shaftLen = p0.distanceTo(p1);
    const tutaKurbaLongeco = putho.getLength();
    return { curve: putho, talonoS0: tutaKurbaLongeco > 0 ? Math.min(7/8, shaftLen / tutaKurbaLongeco) : 0 };
  };
  // Sub-teraj (entombigitaj) pilieroj restas simplaj unu-becieraj tuboj (folio=false).
  const subtera = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(cX + sX * foraSub, yT - 1/64, cZ + sZ * foraSub),
    new THREE.Vector3(cXT + sX * foraSub, yB + 13/32, cZT + sZ * foraSub),
    new THREE.Vector3(cXT + sX * out, yB - 3/8, cZT + sZ * out)
  );
  const folia = upward || folio ? kreiTalonanKurbo() : null;
  const curve = folia ? folia.curve : subtera;
  const talonoS0 = folia ? folia.talonoS0 : 0;
  // Pli dika diamanta sekco (ne ronda tubo). Uzu la SAMAjn tordo-reduktajn
  // kadrojn kiel la svingo, por ke la kapringoj precize kongruu (neniu spiralo).
  const s = 7/32;
  // Elira direkto H: horizontala projekcio de la lasta tangento (la hoka pinto).
  const lastTa = curve.getTangentAt(1);
  const hMag = Math.hypot(lastTa.x, lastTa.z);
  const H = hMag > 1e-3
    ? new THREE.Vector3(lastTa.x / hMag, 0, lastTa.z / hMag)
    : new THREE.Vector3(1, 0, 0);
  // Pli densaj ringoj por la finialo (0o140): la hoko okupas nur la finan arkon,
  // do la krono ricevas sufiĉe da ringoj por esti glata kaj milde rondigita (ne
  // plata aŭ pinĉita), dum la ŝafto restas glata diamanto. La entombigitaj
  // pilieroj restas malpezaj (0o40).
  const SEG = upward || folio ? 0o140 : 0o40;
  const kadroj = kreiPilierkadrojn(curve, SEG, H);
  // Unu UNUIGITA aseto po piliero: la svingo (tubo) kaj la fermaj kapoj estas
  // kunfanditaj en UNU geometrion tuj ĉi tie — ne pluraj apartaj partoj.
  // Ĉiu piliero do estas unusola, memstara peco, identa por konstruaĵoj kaj
  // por la spacosxipo (la sama reuzebla aseto ambaŭflanke).
  const partoj: THREE.BufferGeometry[] = [];
  if ( upward || folio ) {
    // La supra parto estas duonluno: ĝi eliras per kontinua tangento el la
    // ŝafto, havas pli platan kronon, kaj finiĝas per malgranda rondigita pinto.
    // Ambaŭ aksoj samgrade ŝrumpas, do la fino ne aspektas plata aŭ tranĉita.
    const finialaSkalo = 1/4, finialaLargho = 1/4, tipLongeco = 1/64;
    partoj.push(kreiDiamantanSvingon(curve, SEG, s, kadroj, talonoS0, finialaSkalo, finialaLargho, tipLongeco));
    partoj.push(kreiDiamantanKapon(curve.getPointAt(0), kadroj.tangents[0], kadroj.Loj[0], kadroj.Woj[0], s));
    const tipaCentro = curve.getPointAt(1);
    const tipaRingo = tipaCentro.clone().addScaledVector(kadroj.tangents[SEG], -1/64);
    // La svingo finiĝas ĉe tipaRingo kaj la unu sola plata ĉapo estas iomete
    // antaŭ ĝi. Ne kreu duan ringaron aŭ samlokan kapon: tio estis la fonto de
    // la krucita finaĵo.
    const finaKapo = kreiRondigitanDiamantanKapon(tipaRingo, kadroj.tangents[SEG], kadroj.Loj[SEG], kadroj.Woj[SEG], s, finialaSkalo, finialaLargho);
    // La plata ĉapo restu aparta, por ke ĝi ne ricevu la flankajn normalojn de
    // la tubo kaj ne montriĝu kiel krucita X.
    geos.push(kunfandiKajVeldoiGeometriojn(partoj));
    geos.push(finaKapo);
  } else {
    // Sub-teraj (entombigitaj) pilieroj restas simplaj diamantaj tuboj kun fermitaj kapoj.
    partoj.push(kreiDiamantanSvingon(curve, SEG, s, kadroj));
    for ( const t of [ 0, SEG ] ) {
      partoj.push(kreiDiamantanKapon(curve.getPoint(t / SEG), kadroj.tangents[t], kadroj.Loj[t], kadroj.Woj[t], s));
    }
  }
  // Kunfandi KAJ VELDI la kontinuajn partojn en unu geometrion. La supra plata
  // ĉapo estis jam aldonita aparte supre, por ke ĝiaj normaloj restu ebenaj.
  if ( !( upward || folio ) ) geos.push(kunfandiKajVeldoiGeometriojn(partoj));
}

// aldoniEnirejon — Uniforma enirejo por cxiuj tipoj: pli malgranda kaj pli plata
// (malpli profunda), sidanta sur la tero, kun ora bevelo cxirkaux la rando.
function aldoniEnirejon(group: THREE.Group, d: number, kadraMaterialo: THREE.MeshStandardMaterial, eniraMaterialo: THREE.MeshStandardMaterial): void {
  const blokoLargho = 155/64, tw = blokoLargho * 37/64, eh = 9/4;
  const shape = rondigitaTrapezaFormo(blokoLargho, tw, eh, 3/16, 1/8);
  const enirejo = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 2/8, bevelEnabled: true, bevelSize: 5/64, bevelThickness: 5/64, bevelSegments: 2, curveSegments: 0o12 }), eniraMaterialo);
  enirejo.position.set(0, 0, d / 2 - 1/64); group.add(enirejo);
  // Bevelo gluiĝas al la pli plata pordo-fronto (d/2 + 5/16 + 1/16).
  // Densa sampado (0o64 punktoj) kun norma tensio (1/2): la ora tubo sekvas la
  // rondigitan trapezan konturon glate ĉe la anguloj — neniu distordiĝo kie la
  // pecoj kuniĝas (la malnova 0o24/19/32 ondumis kaj pinĉis ĉe la anguloj).
  const ornamajPunktoj = shape.getPoints(0o64).map((p: THREE.Vector2) => new THREE.Vector3(p.x, p.y, d / 2 + 3/8));
  group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ornamajPunktoj, true, "catmullrom", 1/2), 0o100, 1/16, 6, true), kadraMaterialo));
}

// aldoniSteleanSignon — Uniforma 3D stela signo por cxiuj konstruajxoj: nesimetriaj
// rondigitaj supraj anguloj (r1 = 1/8, r2 = 1/4), rektaj malsupraj. La Gawekiif-nomo
// staras sur la tero apud la pordo. La texturo estas travidebla — nur la teksto
// montrigxas super la malhela steleo (neniu nigra bloko).
function aldoniSteleanSignon(group: THREE.Group, name: string, w: number, d: number): void {
  const teksajxo = generiSkribanTeksajxon(nomoAih(name), { w: 0o300, h: 0o1516, ink: "#d8b068" });
  teksajxo.wrapS = teksajxo.wrapT = THREE.ClampToEdgeWrapping;
  // La signo staras sur la tero apud la pordo (1/64 levita por ne z-fajfi kun la grundo).
  const signaY = 1/64;
  const steleo = new THREE.Mesh(
    new THREE.ExtrudeGeometry(kreiSteleanFormon(5/8, 20/8, 1/8, 1/4), { depth: 5/32, bevelEnabled: false, curveSegments: 0o12 }),
    new THREE.MeshStandardMaterial({ color: 0x081818, roughness: 19/32 })
  );
  steleo.position.set(w * 11/32, signaY, d / 2 + 67/64 - 5/64); steleo.castShadow = true; group.add(steleo);
  // ShapeGeometry uzas la krudajn formo-koordinatojn kiel UV (ne [0,1]),
  // do la texturo algluiĝus al la malsupra-dekstra angulo de la faco.
  // Normaligu la UV-ojn al la limig-skatolo por plenigi la tutan facon.
  const faceGeo = new THREE.ShapeGeometry(kreiSteleanFormon(4/8, 141/64, 1/8, 1/4), 0o12);
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
  face.position.set(w * 11/32, signaY, d / 2 + 73/64); group.add(face);
}

// aldoniDiamantanSpegulon — Reflektu la konstruajxon suben (diamanta spegulo) kun
// ora ringo ĉe la bazo.
function aldoniDiamantanSpegulon(sceno: THREE.Scene, spec: KonstruSpec, group: THREE.Group, w: number): void {
  const mg = group.clone();
  mg.scale.y = -1;
  mg.position.y = (spec.h0 || 0) - 2/64;
  mg.traverse( m => { if ( m instanceof THREE.Mesh ) m.castShadow = false; } );
  sceno.add( mg );
  const oroMaterialo = new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0.85, roughness: 0.34, emissive: 0x302808, emissiveIntensity: 0.35 });
  const ringGeo = new THREE.RingGeometry( Math.max(0.01, w * 19/64 + 9/64), Math.max(0.02, w * 19/64 + 17/64), 32 );
  const ring = new THREE.Mesh( ringGeo, oroMaterialo );
  ring.rotation.x = -Math.PI / 2;
  ring.position.set( spec.x, (spec.h0 || 0) + 1/64, spec.z );
  sceno.add( ring );
}

// konstruiZiguraton — Konstruu sxton-sxtupan piramidon el specifaj tieroj kaj sub-teroj.
//     @param spec ( KonstruSpec ) - Konstruajxa specifo kun grandeco, tipo, nombro da tieroj.
//     @param sceno ( THREE.Scene ) - Sceno al kiu aldoni la konstruajxon.
//     @param selektajxoj ( THREE.Mesh[] ) - Listo de muso-selektajxoj por aldoni la murojn.
export function konstruiZiguraton(spec: KonstruSpec, sceno: THREE.Scene, selektajxoj: THREE.Mesh[]): THREE.Group {
  const { niveloj: tiers, tieroAlto, w, d, type: typeKey, name } = spec;
  const sube = spec.sube || 0, tieroAltoSub = spec.tieroAltoSub || tieroAlto;
  // Kaj la kosmopordo kaj la generalaj stacioj havas pli similajn tavolojn
  // (pli milda deklivo, malpli granda interspaco inter etaĝoj).
  const estasStacio = typeKey === "stacioxipo" || typeKey === "stacio";
  const supraLargho = estasStacio ? w * 5/8 : Math.max(141/64, w * 19/64);
  const supraProfundo = estasStacio ? d * 5/8 : Math.max(16/8, d * 19/64);
  const malpliiX = (w / 2 - supraLargho / 2) / Math.max(1, tiers - 1), malpliiZ = (d / 2 - supraProfundo / 2) / Math.max(1, tiers - 1);
  const T = TIPARO[typeKey] || TIPARO.domo;
  const muraKoloro = T.wall, kadraKoloro = T.frame;
  const murajGeometrioj: THREE.BufferGeometry[] = [], kadrajGeometrioj: THREE.BufferGeometry[] = [];
  // Klinitaj muroj: cxiu tavolo estas trapezoida (supro pli mallarĝa ol bazo).
  const klino = 5/16;

  for ( let i = 0; i < tiers; i++ ) {
    const hw = w / 2 - i * malpliiX, hd = d / 2 - i * malpliiZ, y = i * tieroAlto;
    const tavolo = kreiKlinoTavolon(hw, hd, hw - klino, hd - klino, tieroAlto);
    tavolo.translate(0, y + tieroAlto / 2, 0); murajGeometrioj.push(tavolo);
    for (const sX of [ -1, 1 ]) for (const sZ of [ -1, 1 ]) aldoniKadranTubon(kadrajGeometrioj, sX * hw, sZ * hd, y, y + tieroAlto, sX, sZ, true, klino);
    // Pli plata horizontala rando: la supraj kadraj stangoj estas pli maldikaj
    // sed restas proksime al la supra rando (supro 1/64 sub ĝi).
    for ( const sZ of [ -1, 1 ] ) { const stango = new THREE.BoxGeometry((hw - klino) * 2 + 9/64, 3/32, 13/64); stango.translate(0, y + tieroAlto - 1/16, sZ * (hd - klino)); kadrajGeometrioj.push(stango); }
    for ( const sX of [ -1, 1 ] ) { const bar2 = new THREE.BoxGeometry(13/64, 3/32, (hd - klino) * 2 + 9/64); bar2.translate(sX * (hw - klino), y + tieroAlto - 1/16, 0); kadrajGeometrioj.push(bar2); }
  }
  for ( let j = 1; j <= sube; j++ ) {
    const hw = Math.max(supraLargho * 27/64, w / 2 - j * malpliiX), hd = Math.max(supraProfundo * 27/64, d / 2 - j * malpliiZ);
    const yTop = -(j - 1) * tieroAltoSub, yBot = -j * tieroAltoSub;
    // Sub-teraj tavoloj klinigxas inverse: pli larĝaj supre (en la grundo), pli mallarĝaj sube.
    const tavolo = kreiKlinoTavolon(hw - klino, hd - klino, hw, hd, tieroAltoSub);
    tavolo.translate(0, (yTop + yBot) / 2, 0); murajGeometrioj.push(tavolo);
    // Sub-teraj pilieroj restas simplaj (folio = false) — ili estas entombigitaj.
    for (const sX of [ -1, 1 ]) for (const sZ of [ -1, 1 ]) aldoniKadranTubon(kadrajGeometrioj, sX * hw, sZ * hd, yBot, yTop, sX, sZ, false, klino, false);
  }

  const group = new THREE.Group();
  // Malpli reflekta mura materialo: pli alta malglateco, preskaux neniu metaleco.
  const muraMaterialo = new THREE.MeshStandardMaterial({ color: muraKoloro, roughness: typeKey === "stacio" ? 5/8 : 3/4, metalness: 0, envMapIntensity: 0 });
  const kadraMaterialo = new THREE.MeshStandardMaterial({ color: kadraKoloro, metalness: 27/32, roughness: 11/32, emissive: 0x302808, emissiveIntensity: 11/32, envMapIntensity: 10/8 });
  const eniraMaterialo = new THREE.MeshStandardMaterial({ color: 0x082018, roughness: 19/32, emissive: 0xf89840, emissiveIntensity: 3/64 });

  const muroj = new THREE.Mesh(kunfandiGeometriojn(murajGeometrioj), muraMaterialo);
  muroj.castShadow = muroj.receiveShadow = true;
  muroj.userData = { spec, buildingType: T };
  selektajxoj.push(muroj);
  group.add(muroj);
  group.add(new THREE.Mesh(kunfandiGeometriojn(kadrajGeometrioj), kadraMaterialo));

  // Uniforma enirejo por cxiuj tipoj — reuzebla komponanto.
  aldoniEnirejon(group, d, kadraMaterialo, eniraMaterialo);

  if ( typeKey === "sanktejo" ) {
    const pintajxo = new THREE.Mesh(new THREE.ConeGeometry(supraLargho * 35/64, 51/32, 4).rotateY(Math.PI / 4), kadraMaterialo);
    pintajxo.position.y = tiers * tieroAlto + 51/64; pintajxo.castShadow = true; group.add(pintajxo);
  }

  if ( typeKey === "stacioxipo" ) {
    // Kosmoporda stacio: malhela lanĉ-aprono ĉirkaŭ la bazo kun ora kvadrata ringo.
    const apron = new THREE.Mesh(new THREE.BoxGeometry(w + 4, 3/32, d + 4), muraMaterialo);
    apron.position.y = 1/64; apron.receiveShadow = true; group.add(apron);
    for ( const sZ of [ -1, 1 ] ) {
      const b1 = new THREE.BoxGeometry(w + 4, 1/16, 5/16); b1.translate(0, 1/32, sZ * (d / 2 + 4/8)); group.add(new THREE.Mesh(b1, kadraMaterialo));
    }
    for ( const sX of [ -1, 1 ] ) {
      const b2 = new THREE.BoxGeometry(5/16, 1/16, d + 4); b2.translate(sX * (w / 2 + 4/8), 1/32, 0); group.add(new THREE.Mesh(b2, kadraMaterialo));
    }
    // Kvar lanĉ-pilieroj ĉe la apronaj anguloj kun brilaj pintoj.
    for ( const sX of [ -1, 1 ] ) for ( const sZ of [ -1, 1 ] ) {
      const piliero = new THREE.Mesh(new THREE.CylinderGeometry(1/8, 3/16, 7/4, 6), kadraMaterialo);
      piliero.position.set(sX * (w / 2 + 13/8), 7/8, sZ * (d / 2 + 13/8)); piliero.castShadow = true; group.add(piliero);
      const brilo = new THREE.Mesh(new THREE.SphereGeometry(5/32, 0o10, 0o6), eniraMaterialo);
      brilo.position.set(sX * (w / 2 + 13/8), 7/4 + 5/32, sZ * (d / 2 + 13/8)); group.add(brilo);
    }
    // Malgranda ora lanĉ-ringo sur la tegmento, sub la sxipo.
    const roofY = tiers * tieroAlto;
    const ringo = new THREE.Mesh(new THREE.RingGeometry(13/16, 19/16, 0o40).rotateX(-Math.PI / 2), kadraMaterialo);
    ringo.position.y = roofY + 1/32; group.add(ringo);
  }

  // Uniforma 3D stela signo por cxiuj konstruajxoj — reuzebla komponanto.
  aldoniSteleanSignon(group, name, w, d);

  if ( typeKey === "manĝejo" ) {
    const beigeMat = new THREE.MeshStandardMaterial({ color: 0xd8c898, roughness: 33/64, metalness: 9/64 });
    const brownMat = new THREE.MeshStandardMaterial({ color: 0x483828, roughness: 19/32, metalness: 3/64 });
    // Eksteraj rondo-tabloj (kotatsu-stilaj)
    for ( let i = -1; i <= 1; i += 2 ) {
      const tx = i * 5, tz = d / 2 + 3;
      // Ronda tablo surplanke (sen kolono)
      const top = new THREE.CylinderGeometry(27/32, 29/32, 12/32, 0o20);
      const tm = new THREE.Mesh(top, beigeMat);
      tm.position.set(tx, 6/32, tz); tm.castShadow = true; group.add(tm);
      // Rondaj seĝoj
      for ( const [ox, oz] of [ [ 45/32, 0 ], [ -45/32, 0 ], [ 0, 45/32 ], [ 0, -45/32 ] ] ) {
        const st = new THREE.Mesh(new THREE.CylinderGeometry(21/64, 27/64, 4/8, 0o12), brownMat);
        st.position.set(tx + ox, 15/64, tz + oz); st.castShadow = true; group.add(st);
      }
    }
  }
  // Flankaj pordoj forigitaj laux peto de uzanto
  // Stacia platformo forigita laux peto de uzanto
  if ( sube > 0 ) {
    for ( const sZ of [ -1, 1 ] ) {
      const b1 = new THREE.BoxGeometry(w + 77/64, 19/64, 4/8); b1.translate(0, 3/32, sZ * (d / 2 + 13/64)); group.add(new THREE.Mesh(b1, kadraMaterialo));
    }
    for ( const sX of [ -1, 1 ] ) {
      const b2 = new THREE.BoxGeometry(4/8, 19/64, d + 77/64); b2.translate(sX * (w / 2 + 13/64), 3/32, 0); group.add(new THREE.Mesh(b2, kadraMaterialo));
    }
  }

  group.position.set(spec.x, spec.h0 || 0, spec.z);
  group.rotation.y = spec.rot;
  sceno.add(group);
  if ( spec.diamond ) aldoniDiamantanSpegulon(sceno, spec, group, w);
  return group;
}

// ── Food/Eating system ──────────────────────────────────────
export interface ManĝaĵDatumo { key: string; name: string; col: number; flavor: string; }
export const FOKS: ManĝaĵDatumo[] = [
  { key: "fok0", name: "Fok Iimasai · Lichen Crust", col: 0xdcd8c2, flavor: "Warm lichen bread, slow duck, a fold of steam." },
  { key: "fok1", name: "Fok Iimasai · Mint Glaze", col: 0xcfe0c8, flavor: "Cool glaze against rich meat · the forest exhales." },
  { key: "fok2", name: "Fok Iimasai · Peppered", col: 0xd6c9ae, flavor: "Dark pepper bites · the bun answers sweet." },
];
export const TLAS: ManĝaĵDatumo[] = [
  { key: "tla0", name: "Tlatiiwa · Classic", col: 0xc8e6d2, flavor: "Vinegar, milk, mint, sparkle · a bright chord." },
  { key: "tla1", name: "Tlatiiwa · Honeyed", col: 0xe6cf9e, flavor: "Amber over acid · mint underneath." },
  { key: "tla2", name: "Tlatiiwa · Iced Birch-sap", col: 0xbfe0e6, flavor: "Birch-sap frost · the vale in a glass." },
];

export function bunMesh(f: ManĝaĵDatumo): THREE.Group {
  const g = new THREE.Group();
  const bun = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10),
    new THREE.MeshStandardMaterial({ color: f.col, roughness: 0.65 }));
  bun.scale.set(1, 0.74, 1); bun.position.y = 0.16;
  const pleat = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.09, 5), new THREE.MeshStandardMaterial({ color: f.col, roughness: 0.6 }));
  pleat.scale.set(1, 1, 0.55); pleat.position.y = 0.29; pleat.rotation.y = 0.6;
  const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.07, 14), new THREE.MeshStandardMaterial({ color: 0xb99a62, roughness: 0.8 }));
  basket.position.y = 0.035;
  g.add(bun, pleat, basket); return g;
}
export function glassMesh(f: ManĝaĵDatumo): THREE.Group {
  const g = new THREE.Group();
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.3, 12),
    new THREE.MeshStandardMaterial({ color: 0xdfeee6, transparent: true, opacity: 22 / 64, roughness: 0.1, depthWrite: false }));
  glass.position.y = 0.15;
  const liq = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.058, 0.24, 12),
    new THREE.MeshStandardMaterial({ color: f.col, transparent: true, opacity: 52 / 64, roughness: 0.3 }));
  liq.position.y = 0.12;
  const sprig = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.16), new THREE.MeshStandardMaterial({ color: 0x4c7a44, side: THREE.DoubleSide }));
  sprig.position.set(0.05, 0.3, 0); sprig.rotation.z = 1.2;
  g.add(glass, liq, sprig); return g;
}

export interface ManĝaĵItemo {
  mesh: THREE.Group;
  key: string;
  f: ManĝaĵDatumo;
  pos: THREE.Vector3;
  dead: boolean;
}
// kreiManĝaĵojn — Metu manĝaĵojn sur la tablojn ( aŭ laŭ la malnova aera aranĝo se ne estas tabloj ).
//     @param tabloj ( { x, z }[] ) - Tablo-centraj pozicioj; la manĝaĵoj sidas sur la supro ( y ≈ 7/16 ).
export function kreiManĝaĵojn(g: THREE.Group, cx: number, cz: number, tabloj: { x: number; z: number }[] = []): ManĝaĵItemo[] {
  const items: ManĝaĵItemo[] = [];
  const metaDe = (k: string): ManĝaĵDatumo => FOKS.find(x => x.key === k) || TLAS.find(x => x.key === k)!;
  const aldoni = (k: string, x: number, y: number, z: number) => {
    const meta = metaDe(k);
    const m = k.startsWith("fok") ? bunMesh(meta) : glassMesh(meta);
    m.position.set(x, y, z);
    g.add(m);
    items.push({ mesh: m, key: k, f: meta, pos: new THREE.Vector3(x, y, z), dead: false });
  };
  if ( tabloj.length > 0 ) {
    // Manĝaĵoj sidas sur la tabloj, kun malgrandaj ofsetoj por aspekti aranĝitaj
    const suproY = 7/16 + 1/32;
    const manĝoj = [ "fok0", "tla0", "fok1", "tla1", "fok2", "tla2" ];
    tabloj.forEach(( t, i ) => {
      aldoni( manĝoj[( i * 2 ) % manĝoj.length], t.x - 1/8, suproY, t.z );
      aldoni( manĝoj[( i * 2 + 1 ) % manĝoj.length], t.x + 1/8, suproY, t.z );
    });
  } else {
    const foods: { p: [number, number, number]; k: string }[] = [
      { p: [cx + 0.4, 1.05, cz - 2.6], k: "fok0" }, { p: [cx + 1.1, 1.05, cz - 2.6], k: "fok2" },
      { p: [cx + 1.9, 1.05, cz - 2.6], k: "tla2" }, { p: [cx + 3.6, 0.8, cz + 2.4], k: "fok1" }, { p: [cx + 4.2, 0.8, cz + 2.4], k: "tla0" },
    ];
    for (const f of foods) {
      const meta = metaDe(f.k);
      const m = f.k.startsWith("fok") ? bunMesh(meta) : glassMesh(meta);
      m.position.set(f.p[0], f.p[1], f.p[2]);
      g.add(m);
      items.push({ mesh: m, key: f.k, f: meta, pos: new THREE.Vector3(f.p[0], f.p[1], f.p[2]), dead: false });
    }
  }
  return items;
}
export function aldoniVaporon(g: THREE.Group, local: THREE.Vector3): { cloud: THREE.Points; basePos: THREE.Vector3 } {
  const n = 20, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) pos.set([(Math.random() - 4/8) * 4/8, Math.random() * 1.2, (Math.random() - 4/8) * 4/8], i * 3);
  const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xe8efe9, size: 0.09, transparent: true, opacity: 22 / 64, depthWrite: false }));
  pts.position.copy(local);
  g.add(pts);
  return { cloud: pts, basePos: local.clone() };
}

function kunfandiGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if (geos.length === 0) return new THREE.BufferGeometry();
  let tv = 0, ti = 0;
  for ( const g of geos ) { tv += g.getAttribute("position").count; ti += g.index ? g.index.count : g.getAttribute("position").count; }
  const pozicio = new Float32Array(tv * 3), normo = new Float32Array(tv * 3);
  const idxArr = tv > 65535 ? new Uint32Array(ti) : new Uint16Array(ti);
  let vo = 0, io = 0;
  for ( const g of geos ) {
    const p = g.getAttribute("position"), n = g.getAttribute("normal"), c = p.count;
    pozicio.set(p.array as Float32Array, vo * 3);
    if (n) normo.set(n.array as Float32Array, vo * 3);
    const indico = g.index;
    if ( indico ) { for (let i = 0; i < indico.array.length; i++) idxArr[io + i] = indico.array[i] + vo; io += indico.array.length; }
    else { for (let i = 0; i < c; i++) idxArr[io + i] = i + vo; io += c; }
    vo += c;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setIndex(new THREE.BufferAttribute(idxArr, 1));
  return out;
}

// kunfandiKajVeldoiGeometriojn — Kunfandas la piliero-partojn en UNU geometrion
// kaj VELDAS la koincidajn vertojn (la ferma-kapo-rando kun la unua/lasta ringo
// de la svingo) kaj REKOMPUTAS la normalojn: la kapoj ombriĝas seninterrompe en
// la pilieron — NENIA videbla kudro ĉe la supro aŭ la malsupro; la supro estas
// unu glata strukturo (la hoka pinto kreskas el la ŝafto, ne kuŝas kiel kovrilo).
function kunfandiKajVeldoiGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if (geos.length === 0) return new THREE.BufferGeometry();
  let tv = 0, ti = 0;
  for ( const g of geos ) { tv += g.getAttribute("position").count; ti += g.index ? g.index.count : g.getAttribute("position").count; }
  const pozicio = new Float32Array(tv * 3);
  const idxArr = tv > 65535 ? new Uint32Array(ti) : new Uint16Array(ti);
  let vo = 0, io = 0;
  for ( const g of geos ) {
    const p = g.getAttribute("position"), c = p.count;
    pozicio.set(p.array as Float32Array, vo * 3);
    const indico = g.index;
    if ( indico ) { for (let i = 0; i < indico.array.length; i++) idxArr[io + i] = indico.array[i] + vo; io += indico.array.length; }
    else { for (let i = 0; i < c; i++) idxArr[io + i] = i + vo; io += c; }
    vo += c;
  }
  // Veldi: koincidaj vertoj (en 1/4096) dividas la saman indekson. La pli fajna
  // krado gravas ĉe la eta fina ringo: je 1/512 pluraj najbaraj rondangulaj
  // punktoj kunfalis en la saman verton kaj kreis la videblan krucan ĉapon.
  // La aksoj de la kapo kaj svingo ankoraŭ koincidas, sed la malgranda folia
  // konturo konservas ĉiujn siajn punktojn; post veldado la normaloj rekalkuliĝas.
  const skalo = 4096;
  const mapo = new Map<string, number>();
  const novaIndekso = new Uint32Array(tv);
  let nv = 0;
  for ( let i = 0; i < tv; i++ ) {
    const ŝlosilo = Math.round(pozicio[i*3] * skalo) + "," + Math.round(pozicio[i*3+1] * skalo) + "," + Math.round(pozicio[i*3+2] * skalo);
    const trovita = mapo.get(ŝlosilo);
    if ( trovita !== undefined ) { novaIndekso[i] = trovita; }
    else { mapo.set(ŝlosilo, nv); novaIndekso[i] = nv; nv++; }
  }
  const veldita = new Float32Array(nv * 3);
  for ( let i = 0; i < tv; i++ ) {
    veldita[novaIndekso[i]*3] = pozicio[i*3];
    veldita[novaIndekso[i]*3+1] = pozicio[i*3+1];
    veldita[novaIndekso[i]*3+2] = pozicio[i*3+2];
  }
  for ( let i = 0; i < idxArr.length; i++ ) idxArr[i] = novaIndekso[idxArr[i]];
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(veldita, 3));
  out.setIndex(new THREE.BufferAttribute(idxArr, 1));
  out.computeVertexNormals();
  return out;
}
