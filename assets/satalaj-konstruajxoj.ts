// Satalaj konstruajxoj — sxtupajramidaj konstruajxoj. verdaj/oraj domoj (kapuo),
// brunaj/becxaj mangxejoj (kahxjenko), becxaj kasafeoj (kunvenoĉambroj) kun oraj pilieroj
// La zigurato nomigxas satal ( j͑ʃᴜ ɭʃᴜͷ̗ ) en Iikrhia. noma formo. satalo.
import * as THREE from "three";
import { generiSkribanTeksajxon } from "./skripto-rivelilo.js";
import { nomoAih } from "../src/tradukoj.js";
import { kunfandiGeometriojn, kunfandiKajVeldoiGeometriojn } from "./kunfandajxoj.js";
import { kreiEniranMaterialon, kreiOranMaterialon } from "./materialoj.js";

export interface KonstruTipo { labelKey: string; wall: number; frame: number; chip: string; flavorKey: string; }
export const TIPARO: Record<string, KonstruTipo> = {
  domo:   { labelKey: "tipDomo",      wall: 0x184838, frame: 0xd8b068, chip: "#78a888", flavorKey: "flvDomo" },
  mangxejo:  { labelKey: "tipMangxejo",  wall: 0x584028, frame: 0xd8c898, chip: "#c8a868", flavorKey: "flvMangxejo" },
  kasafeo: { labelKey: "tipKasafeo",    wall: 0xd8c898, frame: 0xd8b068, chip: "#e0d0a8", flavorKey: "flvKasafeo" },
  stacioxipo: { labelKey: "tipStacioxipo", wall: 0xc8c8c8, frame: 0xd8b068, chip: "#c8c8c8", flavorKey: "flvStacioxipo" },
  turo:   { labelKey: "tipTuro",        wall: 0x205040, frame: 0xd8b068, chip: "#88b8a0", flavorKey: "flvTuro" },
  sanktejo: { labelKey: "tipSanktejo",  wall: 0x184038, frame: 0xe0c078, chip: "#e0c078", flavorKey: "flvSanktejo" },
};

export interface KonstruSpec { x: number; z: number; type: string; name: string; niveloj: number; w: number; d: number; tieroAlto: number; sube?: number; tieroAltoSub?: number; rot: number; fixed?: string; h0?: number; diamond?: boolean; flugoY?: number; }

// kreiRondigitanKvadratanFormon — Kvadrata formo kun rondigitaj anguloj (uzata
// por la kosmoporda lancx-aprono).
function kreiRondigitanKvadratanFormon(w: number, d: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 2, hd = d / 2;
  s.moveTo(-hw + r, -hd);
  s.lineTo(hw - r, -hd);
  s.absarc(hw - r, -hd + r, r, -Math.PI / 2, 0, false);
  s.lineTo(hw, hd - r);
  s.absarc(hw - r, hd - r, r, 0, Math.PI / 2, false);
  s.lineTo(-hw + r, hd);
  s.absarc(-hw + r, hd - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(-hw, -hd + r);
  s.absarc(-hw + r, -hd + r, r, Math.PI, Math.PI * 0o3/0o2, false);
  s.closePath();
  return s;
}

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
// kreiPilolFormon — LONGAs horizontala rondigita fenestra formo: rektangulo kun
// duoncirklaj finoj (pilolo). Loka kopio de kreiPilolFenestranFormon en interno.js
// (ne importu interne: tio estus cirkla dependeco — interno jam importas ĉi tien).
function kreiPilolFormon(w: number, h: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 2, r = h / 2;
  s.moveTo(-hw + r, 0);
  s.lineTo(hw - r, 0);
  s.absarc(hw - r, r, r, -Math.PI / 2, Math.PI / 2, false);
  s.lineTo(-hw + r, h);
  s.absarc(-hw + r, r, r, Math.PI / 2, Math.PI * 0o3/0o2, false);
  s.closePath();
  return s;
}

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

// diamantajDuonoj — Tridek-du-punkta sekco de diamanto. pintoj je 45° (pli granda ol
// la malnova cirklo), enaj aksoj nur iomete enigitaj por mildigi la angulojn — la
// piliero estas pli klare diamanta (malpli ronda) ol antauxe. La konturo komencas
// cxe la FRONTA akso (0°) kaj iras horlogxe.
function diamantajDuonoj(s: number): [number, number][] {
  const okto: [number, number][] = [
    [ s * 0o7/0o20 * Math.SQRT2, 0 ],
    [ s * Math.SQRT1_2, -s * Math.SQRT1_2 ],
    [ 0, -s * 0o7/0o20 * Math.SQRT2 ],
    [ -s * Math.SQRT1_2, -s * Math.SQRT1_2 ],
    [ -s * 0o7/0o20 * Math.SQRT2, 0 ],
    [ -s * Math.SQRT1_2, s * Math.SQRT1_2 ],
    [ 0, s * 0o7/0o20 * Math.SQRT2 ],
    [ s * Math.SQRT1_2, s * Math.SQRT1_2 ],
  ];
  // 32 punktoj. cxiu oktona rando dividita en 4 — la SAMA diamanta silueto, sed
  // pli glataj randoj kaj multe malpli da facetaj faldoj sur la tubo kaj la
  // hoka pintajxo (la malnova 16-punkta ventumilo montris videblajn faldliniojn).
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

// Pilierkadroj — Ringaj kadroj por la pilieroj. tangento ta, ringa normalo m,
// longa akso L kaj largxa akso W.
interface Pilierkadroj {
  tangents: THREE.Vector3[];
  moj: THREE.Vector3[];
  Loj: THREE.Vector3[];
  Woj: THREE.Vector3[];
}
// kreiPilierkadrojn — Konstruas la kadrojn. la ringa ebeno estas cxiam
// PERPENDIKULA al la kurbo-tangento (m = ta) kaj la longa akso restas la EKSTERA
// akso (H rotaciita je 45°, do la diamantaj pintoj alfrontas la murojn kaj la
// piliero sidas apud la angulo), konstanta en la mondo — neniu Frenet-tordo, la
// sekco ne spiralas cxirkaux la kurbo, cxu la sxafto rekta, cxu la talona hoko
// kurbigxas.
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
    // Sxafto. komencu iom sub la bazo (supren) aux iom super la supro (spegule) gxis
    // la tavolo-rubo, kie la hoko komencigxas. La linia proporcio estas la SAMA
    // por ambaux direktoj (spegulitaj y-oj), do la rekto restas paralela al la
    // muro la tutan sxafton.
    const yA = upward ? yB - 0o1/0o20 : yT + 0o1/0o20;
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
  // Elira direkto H. horizontala projekcio de la lasta tangento (la hoka pinto).
  const lastTa = curve.getTangentAt(1);
  const hMag = Math.hypot(lastTa.x, lastTa.z);
  const H = hMag > 1e-3
    ? new THREE.Vector3(lastTa.x / hMag, 0, lastTa.z / hMag)
    : new THREE.Vector3(1, 0, 0);
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
function aldoniEnirejon(group: THREE.Group, d: number, kadraMaterialo: THREE.MeshStandardMaterial, eniraMaterialo: THREE.MeshStandardMaterial): void {
  const blokoLargho = 0o233/0o100, tw = blokoLargho * 0o45/0o100, eh = 0o11/0o4;
  const shape = rondigitaTrapezaFormo(blokoLargho, tw, eh, 0o3/0o20, 0o1/0o10);
  const enirejo = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0o2/0o10, bevelEnabled: true, bevelSize: 0o5/0o100, bevelThickness: 0o5/0o100, bevelSegments: 2, curveSegments: 0o12 }), eniraMaterialo);
  enirejo.position.set(0, 0, d / 2 - 0o1/0o100); group.add(enirejo);
  // Bevelo gluigxas al la pli plata pordo-fronto (d/2 + 0o5/0o20 + 0o1/0o20).
  // Densa sampado (0o64 punktoj) kun norma tensio (0o1/0o2). la ora tubo sekvas la
  // rondigitan trapezan konturon glate cxe la anguloj — neniu distordigxo kie la
  // pecoj kunigxas (la malnova 0o24/0o23/0o40 ondumis kaj pincxis cxe la anguloj).
  const ornamajPunktoj = shape.getPoints(0o64).map((p: THREE.Vector2) => new THREE.Vector3(p.x, p.y, d / 2 + 0o3/0o10));
  group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ornamajPunktoj, true, "catmullrom", 0o1/0o2), 0o100, 0o1/0o20, 6, true), kadraMaterialo));
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
    new THREE.ExtrudeGeometry(kreiSteleanFormon(0o5/0o10, 0o24/0o10, 0o1/0o10, 0o1/0o4), { depth: 0o5/0o40, bevelEnabled: false, curveSegments: 0o12 }),
    new THREE.MeshStandardMaterial({ color: 0x081818, roughness: 0o23/0o40 })
  );
  steleo.position.set(w * 0o13/0o40, signaY, d / 2 + 0o103/0o100 - 0o5/0o100); steleo.castShadow = true; group.add(steleo);
  // ShapeGeometry uzas la krudajn formo-koordinatojn kiel UV (ne [0,1]),
  // do la texturo algluigxus al la malsupra-dekstra angulo de la faco.
  // Normaligu la UV-ojn al la limig-skatolo por plenigi la tutan facon.
  const faceGeo = new THREE.ShapeGeometry(kreiSteleanFormon(0o4/0o10, 0o215/0o100, 0o1/0o10, 0o1/0o4), 0o12);
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
  face.position.set(w * 0o13/0o40, signaY, d / 2 + 0o111/0o100); group.add(face);
}

// aldoniDiamantanSpegulon — Reflektu la konstruajxon suben (diamanta spegulo) kun
// ora ringo cxe la bazo.
function aldoniDiamantanSpegulon(sceno: THREE.Scene, spec: KonstruSpec, group: THREE.Group, w: number): void {
  const mg = group.clone();
  mg.scale.y = -1;
  mg.position.y = (spec.h0 || 0) - 0o2/0o100;
  mg.traverse( m => { if ( m instanceof THREE.Mesh ) m.castShadow = false; } );
  sceno.add( mg );
  const oroMaterialo = new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0.85, roughness: 0.34, emissive: 0x302808, emissiveIntensity: 0.35 });
  const ringGeo = new THREE.RingGeometry( Math.max(0.01, w * 0o23/0o100 + 0o11/0o100), Math.max(0.02, w * 0o23/0o100 + 0o21/0o100), 32 );
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
  const sube = spec.sube || 0, tieroAltoSub = spec.tieroAltoSub || tieroAlto;
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
    const tavolo = kreiKlinoTavolon(hw, hd, hw - klino, hd - klino, tieroAlto);
    tavolo.translate(0, y + tieroAlto / 2, 0); murajGeometrioj.push(tavolo);
    for (const sX of [ -1, 1 ]) for (const sZ of [ -1, 1 ]) aldoniKadranTubon(kadrajGeometrioj, sX * hw, sZ * hd, y, y + tieroAlto, sX, sZ, true, klino);
    // Pli plata horizontala rando. la supraj kadraj stangoj estas pli maldikaj
    // sed restas proksime al la supra rando (supro 0o1/0o100 sub gxi).
    for ( const sZ of [ -1, 1 ] ) { const stango = new THREE.BoxGeometry((hw - klino) * 2 + 0o11/0o100, 0o3/0o40, 0o15/0o100); stango.translate(0, y + tieroAlto - 0o1/0o20, sZ * (hd - klino)); kadrajGeometrioj.push(stango); }
    for ( const sX of [ -1, 1 ] ) { const bar2 = new THREE.BoxGeometry(0o15/0o100, 0o3/0o40, (hd - klino) * 2 + 0o11/0o100); bar2.translate(sX * (hw - klino), y + tieroAlto - 0o1/0o20, 0); kadrajGeometrioj.push(bar2); }
  }
  for ( let j = 1; j <= sube; j++ ) {
    const hw = Math.max(supraLargho * 0o33/0o100, w / 2 - j * malpliiX), hd = Math.max(supraProfundo * 0o33/0o100, d / 2 - j * malpliiZ);
    const yTop = -(j - 1) * tieroAltoSub, yBot = -j * tieroAltoSub;
    // Sub-teraj tavoloj klinigxas inverse. pli largxaj supre (en la grundo), pli mallargxaj sube.
    const tavolo = kreiKlinoTavolon(hw - klino, hd - klino, hw, hd, tieroAltoSub);
    tavolo.translate(0, (yTop + yBot) / 2, 0); murajGeometrioj.push(tavolo);
    // Sub-teraj pilieroj restas simplaj (folio = false) — ili estas entombigitaj.
    for (const sX of [ -1, 1 ]) for (const sZ of [ -1, 1 ]) aldoniKadranTubon(kadrajGeometrioj, sX * hw, sZ * hd, yBot, yTop, sX, sZ, false, klino, false);
  }

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

  // Uniforma enirejo por cxiuj tipoj — reuzebla komponanto.
  aldoniEnirejon(group, d, kadraMaterialo, eniraMaterialo);

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
    const apronFormo = kreiRondigitanKvadratanFormon(w + 4, d + 4, 0o10/0o10);
    const apronGeo = new THREE.ExtrudeGeometry(apronFormo, { depth: 0o3/0o40, bevelEnabled: false, curveSegments: 0o12 });
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
          new THREE.ShapeGeometry(kreiPilolFormon(ww, fenAlto), 0o100),
          fenestraMaterialo
        );
        monto.add(fen);
        // Ora pilola rando ĉirkaŭ la fenestro
        const konturo = kreiPilolFormon(ww, fenAlto).getPoints(0o200)
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
    const beigeMat = new THREE.MeshStandardMaterial({ color: 0xd8c898, roughness: 0o41/0o100, metalness: 0o11/0o100 });
    const brownMat = new THREE.MeshStandardMaterial({ color: 0x483828, roughness: 0o23/0o40, metalness: 0o3/0o100 });
    // Eksteraj rondo-tabloj (kotatsu-stilaj)
    for ( let i = -1; i <= 1; i += 2 ) {
      const tx = i * 5, tz = d / 2 + 3;
      // Ronda tablo surplanke (sen kolono)
      const top = new THREE.CylinderGeometry(0o33/0o40, 0o35/0o40, 0o14/0o40, 0o20);
      const tm = new THREE.Mesh(top, beigeMat);
      tm.position.set(tx, 0o6/0o40, tz); tm.castShadow = true; group.add(tm);
      // Rondaj segxoj
      for ( const [ox, oz] of [ [ 0o55/0o40, 0 ], [ -0o55/0o40, 0 ], [ 0, 0o55/0o40 ], [ 0, -0o55/0o40 ] ] ) {
        const st = new THREE.Mesh(new THREE.CylinderGeometry(0o25/0o100, 0o33/0o100, 0o4/0o10, 0o12), brownMat);
        st.position.set(tx + ox, 0o17/0o100, tz + oz); st.castShadow = true; group.add(st);
      }
    }
  }
  // Flankaj pordoj forigitaj laux peto de uzanto
  // Stacia platformo forigita laux peto de uzanto
  if ( sube > 0 ) {
    for ( const sZ of [ -1, 1 ] ) {
      const b1 = new THREE.BoxGeometry(w + 0o115/0o100, 0o23/0o100, 0o4/0o10); b1.translate(0, 0o3/0o40, sZ * (d / 2 + 0o15/0o100)); group.add(new THREE.Mesh(b1, kadraMaterialo));
    }
    for ( const sX of [ -1, 1 ] ) {
      const b2 = new THREE.BoxGeometry(0o4/0o10, 0o23/0o100, d + 0o115/0o100); b2.translate(sX * (w / 2 + 0o15/0o100), 0o3/0o40, 0); group.add(new THREE.Mesh(b2, kadraMaterialo));
    }
  }

  group.position.set(spec.x, spec.h0 || 0, spec.z);
  group.rotation.y = spec.rot;
  sceno.add(group);
  if ( spec.diamond ) aldoniDiamantanSpegulon(sceno, spec, group, w);
  return group;
}

// ── Food/Eating system ──────────────────────────────────────
export interface MangxajxDatumo { key: string; name: string; col: number; flavor: string; }
export const FOKS: MangxajxDatumo[] = [
  { key: "fok0", name: "Fok Iimasai · Lichen Crust", col: 0xdcd8c2, flavor: "Warm lichen bread, slow duck, a fold of steam." },
  { key: "fok1", name: "Fok Iimasai · Mint Glaze", col: 0xcfe0c8, flavor: "Cool glaze against rich meat · the forest exhales." },
  { key: "fok2", name: "Fok Iimasai · Peppered", col: 0xd6c9ae, flavor: "Dark pepper bites · the bun answers sweet." },
];
export const TLAS: MangxajxDatumo[] = [
  { key: "tla0", name: "Tlatiiwa · Classic", col: 0xc8e6d2, flavor: "Vinegar, milk, mint, sparkle · a bright chord." },
  { key: "tla1", name: "Tlatiiwa · Honeyed", col: 0xe6cf9e, flavor: "Amber over acid · mint underneath." },
  { key: "tla2", name: "Tlatiiwa · Iced Birch-sap", col: 0xbfe0e6, flavor: "Birch-sap frost · the vale in a glass." },
];

export function bunMesh(f: MangxajxDatumo): THREE.Group {
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
export function glassMesh(f: MangxajxDatumo): THREE.Group {
  const g = new THREE.Group();
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.3, 12),
    new THREE.MeshStandardMaterial({ color: 0xdfeee6, transparent: true, opacity: 0o26 / 0o100, roughness: 0.1, depthWrite: false }));
  glass.position.y = 0.15;
  const liq = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.058, 0.24, 12),
    new THREE.MeshStandardMaterial({ color: f.col, transparent: true, opacity: 0o64 / 0o100, roughness: 0.3 }));
  liq.position.y = 0.12;
  const sprig = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.16), new THREE.MeshStandardMaterial({ color: 0x4c7a44, side: THREE.DoubleSide }));
  sprig.position.set(0.05, 0.3, 0); sprig.rotation.z = 1.2;
  g.add(glass, liq, sprig); return g;
}

export interface MangxajxItemo {
  mesh: THREE.Group;
  key: string;
  f: MangxajxDatumo;
  pos: THREE.Vector3;
  dead: boolean;
}
// kreiMangxajxojn — Metu mangxajxojn sur la tablojn ( aux laux la malnova aera arangxo se ne estas tabloj ).
//     @param tabloj ( { x, z }[] ) - Tablo-centraj pozicioj; la mangxajxoj sidas sur la supro ( y ≈ 0o7/0o20 ).
export function kreiMangxajxojn(g: THREE.Group, cx: number, cz: number, tabloj: { x: number; z: number }[] = []): MangxajxItemo[] {
  const items: MangxajxItemo[] = [];
  const metaDe = (k: string): MangxajxDatumo => FOKS.find(x => x.key === k) || TLAS.find(x => x.key === k)!;
  const aldoni = (k: string, x: number, y: number, z: number) => {
    const meta = metaDe(k);
    const m = k.startsWith("fok") ? bunMesh(meta) : glassMesh(meta);
    m.position.set(x, y, z);
    g.add(m);
    items.push({ mesh: m, key: k, f: meta, pos: new THREE.Vector3(x, y, z), dead: false });
  };
  if ( tabloj.length > 0 ) {
    // Mangxajxoj sidas sur la tabloj, kun malgrandaj ofsetoj por aspekti arangxitaj
    const suproY = 0o7/0o20 + 0o1/0o40;
    const mangxoj = [ "fok0", "tla0", "fok1", "tla1", "fok2", "tla2" ];
    tabloj.forEach(( t, i ) => {
      aldoni( mangxoj[( i * 2 ) % mangxoj.length], t.x - 0o1/0o10, suproY, t.z );
      aldoni( mangxoj[( i * 2 + 1 ) % mangxoj.length], t.x + 0o1/0o10, suproY, t.z );
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
  for (let i = 0; i < n; i++) pos.set([(Math.random() - 0o4/0o10) * 0o4/0o10, Math.random() * 1.2, (Math.random() - 0o4/0o10) * 0o4/0o10], i * 3);
  const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xe8efe9, size: 0.09, transparent: true, opacity: 0o26 / 0o100, depthWrite: false }));
  pts.position.copy(local);
  g.add(pts);
  return { cloud: pts, basePos: local.clone() };
}

// kunfandiGeometriojn / kunfandiKajVeldoiGeometriojn — nun en ./kunfandajxoj.js