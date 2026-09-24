// ≺⧼ Mapformo 🗺️ ⧽≻
// La formo de la mondo. La tereno ne plu estas kvadrato — ĝi estas la
// formo elektita per la mapo ( src/tero-datumaro/mapoj.ts ): cirklo ( la
// defaŭlto ), rondigita kvadrato aŭ rondigita triangulo. La formo difinas la
// randon de la tereno, la vertikalan krutaĵon sub ĝi kaj la komencon de la
// nebulo — ĉio, kio antaŭe estis « la maprando » ( la kvadrata ±MONDO_HALFO ).
//
// Ĉi tiu modulo estas la UNU FONTO por la formo. La ludo ( scena.ts ) kaj la
// terena skulptilo ( iloj/tero-skulptilo/tero-skulptilo.js ) importas ĝin, do la 2D-mapoj, la
// 3D-vidoj kaj la bakita minimapo kongruas.
//
// La formoj estas stel-formaj ( ĉiu radio el la centro trafas la randon unufoje )
// kaj konveksaj, do la tuta geometrio priskribeblas per unu funkcio —
// radiusaDistanco( ang ), la distanco de la centro al la rando laŭ angulo. La
// rondigitaj formoj estas la malrondigita formo dikigita per la angula rondo
// ( Minkowski-sumo ), do iliaj rektaj partoj kuŝas ĝuste sur la randoj de la
// malrondigita formo kaj la anguloj estas arkoj de la angula rondo.
import * as THREE from "three";

export type MapFormo = "rondo" | "kvadrato" | "triangulo";

// La formoj de la mapo, kun siaj nomoj por la iloj.
export const FORMOJ: { kodo: MapFormo; nomo: string }[] = [
  { kodo: "rondo", nomo: "Cirklo 🌐" },
  { kodo: "kvadrato", nomo: "Kvadrato 🔲" },
  { kodo: "triangulo", nomo: "Triangulo 🔺" },
];

// MONDO_BAZA_Y — la alto de la fundo de la mondo ( la suba ebeno de la krutaĵo ).
// La tereno estas terpeco, ne senfina tavolo — ĝiaj flankoj malsupreniras ĝis ĉi
// tiu ebeno. Sufiĉe profunda por ke la flankoj aspektu kiel grundo ( kaj por ke
// la profundaĵoj de la lago restu supre de la fundo ), sed ne tiom ke la mondo
// aspektu kiel alta kesto.
export const MONDO_BAZA_Y = -0o20;   // -16

// La angula rondo — proporcio de la duon-grando. Sufiĉe granda por ke la anguloj
// estu klare rondaj, sed ne tiom ke la formo aspektu kiel disko. La kvadrato
// postulas rondon malpli grandan ol la duon-grando, la triangulo malpli grandan
// ol duono de ĝi ( la pintoj moviĝas duoble pli ol la randoj ) — 0.3 plenumas
// ambaŭ kun granda rando.
const ANGULA_PROPORCIO = 0o3/0o10;

// Alto — la terena alta funkcio ( alteco en la ludo, la skulpta krado en la ilo ).
export type Alto = ( x: number, z: number ) => number;

// StrataKoloro — koloriga funkcio por la krutaĵo ( la tavoloj de la terpeco ).
//     @param c ( THREE.Color ) - La kolora objekto por plenigi.
//     @param y ( number ) - La alto de la punkto sur la krutaĵo.
//     @param surfY ( number ) - La terena alto ĝuste super ĝi.
export type StrataKoloro = ( c: THREE.Color, y: number, surfY: number ) => void;

// formoRondo — la radiuso de la angulaj arkoj. La cirklo ne havas angulojn — ĝia
// « angula rondo » estas ĝia tuta radiuso, do la cirklo fariĝas unu arko.
export function formoRondo( formo: MapFormo, grandeco: number ): number {
  return formo === "rondo" ? grandeco : grandeco * ANGULA_PROPORCIO;
}

// formoVerticoj — la pintoj de la MALRONDIGITA formo, en la ( x, z ) ebeno. La
// cirklo ne havas pintojn ( la rondo mem estas la formo ), la triangulo montras
// norden ( +z ) kaj la kvadrato estas la akso-paralela kvadrato de duon-grando
// « grandeco ». La ordo estas kontraŭhorloĝa en la ( x, z ) ebeno.
export function formoVerticoj( formo: MapFormo, grandeco: number ): number[][] {
  if ( formo === "rondo" ) return [];
  if ( formo === "kvadrato" ) {
    return [
      [ grandeco, grandeco ], [ -grandeco, grandeco ],
      [ -grandeco, -grandeco ], [ grandeco, -grandeco ],
    ];
  }
  const h = grandeco * Math.sqrt(3) / 2;
  return [ [ 0, grandeco ], [ -h, -grandeco / 2 ], [ h, -grandeco / 2 ] ];
}

// formoInternaj — la centroj de la angulaj arkoj ( la pintoj de la formo
// malgrandigita per la angula rondo ). La rondigita formo estas ĉi tiu formo
// dikigita per la angula rondo. La pintoj de regula formo moviĝas al la centro
// laŭ sia propra radio; la movo estas rc / sin( duon-angulo ) — por la kvadrato
// rc·√2 ( 90° anguloj ), por la triangulo 2·rc ( 60° anguloj ).
export function formoInternaj( formo: MapFormo, grandeco: number ): number[][] {
  const rc = formoRondo( formo, grandeco );
  const movo = formo === "kvadrato" ? rc * Math.SQRT2 : 2 * rc;
  return formoVerticoj(formo, grandeco).map(p => {
    const d = Math.hypot(p[0], p[1]) || 1;
    return [ p[0] * ( 1 - movo / d ), p[1] * ( 1 - movo / d ) ];
  });
}

// randajNormalojKunInradiusoj — la elstaraj normaloj kaj iliaj inradiusoj. La
// formoj estas regulaj kaj centritaj, do la normalo de rando estas la unuobla
// vektoro de la centro al la mezo de la rando kaj la inradiuso estas la longo de
// tiu vektoro. Komputitaj unufoje po alvoko de radiusaDistanco — la varmega buklo
// ne rajtas konstrui tabelojn por ĉiu kandidato.
function randajNormalojKunInradiusoj( verticoj: number[][] ):
  { normaloj: number[][]; inradiusoj: number[] } {
  const n = verticoj.length;
  const normaloj: number[][] = [];
  const inradiusoj: number[] = [];
  for ( let i = 0; i < n; i++ ) {
    const a = verticoj[i], b = verticoj[( i + 1 ) % n];
    const mx = ( a[0] + b[0] ) / 2, mz = ( a[1] + b[1] ) / 2;
    const d = Math.hypot(mx, mz) || 1;
    normaloj.push([ mx / d, mz / d ]);
    inradiusoj.push(d);
  }
  return { normaloj, inradiusoj };
}

// cxuEnMalrondigita — ĉu la punkto estas en la malrondigita formo ( aŭ sur ĝia
// rando ). Uzata por kontroli kandidatojn de radiusaDistanco — la rando de linio
// plilongigita preter sia rando falas ekster la formo kaj estas forĵetata.
function cxuEnMalrondigita( normaloj: number[][], inradiusoj: number[], x: number, z: number ): boolean {
  for ( let i = 0; i < normaloj.length; i++ ) {
    if ( normaloj[i][0] * x + normaloj[i][1] * z > inradiusoj[i] + 0o1/0o1000 ) return false;
  }
  return true;
}

// radiusaDistanco — la distanco de la centro al la rando de la formo laŭ la
// angulo. La kandidatoj estas la rektaj partoj ( la linioj de la randoj de la
// malrondigita formo ) kaj la angulaj arkoj; la ĝusta rando estas la plej fora
// kandidato kiu ankoraŭ kuŝas en la malrondigita formo — la rando de linio
// plilongigita preter sia rando falas ekster ĝin kaj estas forĵetata.
//     @param ang ( number ) - La angulo ( la sama konvencio kiel atan2 ).
//     @returns La radiuso de la rando laŭ tiu angulo.
export function radiusaDistanco( formo: MapFormo, grandeco: number, ang: number ): number {
  if ( formo === "rondo" ) return grandeco;
  const ux = Math.cos(ang), uz = Math.sin(ang);
  const rc = formoRondo(formo, grandeco);
  const verticoj = formoVerticoj(formo, grandeco);
  const { normaloj, inradiusoj } = randajNormalojKunInradiusoj(verticoj);
  const internaj = formoInternaj(formo, grandeco);
  let plej = 0;
  // La rektaj partoj — la radiosenco kontraŭ la linio de ĉiu rando.
  for ( let i = 0; i < verticoj.length; i++ ) {
    const a = verticoj[i], b = verticoj[( i + 1 ) % verticoj.length];
    const dx = b[0] - a[0], dz = b[1] - a[1];
    const determinanto = ux * dz - uz * dx;
    if ( Math.abs(determinanto) < 1e-9 ) continue;   // paralela — ne trapasas
    const t = ( a[0] * dz - a[1] * dx ) / determinanto;
    if ( t > plej && cxuEnMalrondigita(normaloj, inradiusoj, ux * t, uz * t) ) plej = t;
  }
  // La angulaj arkoj — cirkloj de la angula rondo ĉe la internaj pintoj.
  for ( const p of internaj ) {
    const projekcio = ux * p[0] + uz * p[1];
    const sub = projekcio * projekcio - ( p[0] * p[0] + p[1] * p[1] ) + rc * rc;
    if ( sub < 0 ) continue;   // la radio trafas preter la arko
    const t = projekcio + Math.sqrt(sub);
    if ( t > plej && cxuEnMalrondigita(normaloj, inradiusoj, ux * t, uz * t) ) plej = t;
  }
  return plej;
}

// distancoDeFormo — la radiusa distanco al la rando ( negativa ene, pozitiva
// ekstere ). Sufiĉas por ĉiuj testoj de la modulo — la formoj estas stel-formaj,
// do la signo kaj la grando laŭ la radio priskribas la randon precize.
export function distancoDeFormo( formo: MapFormo, grandeco: number, x: number, z: number ): number {
  const r = Math.hypot(x, z);
  if ( r < 1e-9 ) return -radiusaDistanco(formo, grandeco, 0);
  return r - radiusaDistanco(formo, grandeco, Math.atan2(z, x));
}

// cxuEnFormo — ĉu la punkto estas en la mondo ( aŭ sur ĝia rando ).
export function cxuEnFormo( formo: MapFormo, grandeco: number, x: number, z: number ): boolean {
  return distancoDeFormo(formo, grandeco, x, z) <= 0;
}

// premuAlFormo — premu punkton ekster la formo sur la randon ( laŭ ĝia radio ).
// La datumkrado kaj la terena krado estas kvadrataj, sed la mondo estas la formo.
// La eksteraj verticoj ( kaj iliaj trianguloj ) premiĝas sur la randon, do la
// videbla tereno estas ĝuste la formo kaj ĝia rando koincidas kun la krutaĵo.
// La verticoj kiuj jam estas ene restas netuŝitaj.
//     @param eligo ( { x, z } ) - La eliga objekto ( evitigas rubaĵon en la varmega buklo ).
//     @returns Ĉu la punkto estis premata.
export function premuAlFormo( formo: MapFormo, grandeco: number, x: number, z: number,
  eligo: { x: number; z: number } ): boolean {
  const r = Math.hypot(x, z);
  if ( r < 1e-9 ) return false;
  const ang = Math.atan2(z, x);
  const rando = radiusaDistanco(formo, grandeco, ang);
  if ( r <= rando ) return false;
  eligo.x = Math.cos(ang) * rando;
  eligo.z = Math.sin(ang) * rando;
  return true;
}

// formajRandPunktoj — la randolinio de la formo kiel sinsekvaj ( x, z ) paroj.
// Malfermita ciklo — la lasta punkto NE ripetas la unuan. La angulaj arkoj estas
// delikate dividitaj; la rektaj partoj ricevas nur siajn finojn, ĉar punktoj sur
// la sama rekta rando ne aldonas informon.
//     @param punktojPoArko ( number ) - La dividoj de ĉiu angula arko.
//     @returns La randaj punktoj.
export function formajRandPunktoj( formo: MapFormo, grandeco: number,
  punktojPoArko = 0o200 ): number[][] {
  if ( formo === "rondo" ) {
    const kvanto = punktojPoArko * 4;
    const punktoj: number[][] = [];
    for ( let i = 0; i < kvanto; i++ ) {
      const ang = i / kvanto * Math.PI * 2;
      punktoj.push([ Math.cos(ang) * grandeco, Math.sin(ang) * grandeco ]);
    }
    return punktoj;
  }
  const rc = formoRondo(formo, grandeco);
  const verticoj = formoVerticoj(formo, grandeco);
  const { normaloj } = randajNormalojKunInradiusoj(verticoj);
  const internaj = formoInternaj(formo, grandeco);
  const n = verticoj.length;
  const punktoj: number[][] = [];
  for ( let i = 0; i < n; i++ ) {
    // La arko ĉe la pinto i — de la normalo de la antaŭa rando al la normalo de
    // la sekva, laŭ la plej mallonga vojo ( la anguloj de niaj formoj estas
    // malpli ol π, do la mallonga vojo estas la arko mem ).
    const p = internaj[i];
    const antaŭa = normaloj[( i + n - 1 ) % n];
    const sekva = normaloj[i];
    const a0 = Math.atan2(antaŭa[1], antaŭa[0]);
    const a1 = Math.atan2(sekva[1], sekva[0]);
    let diferenco = a1 - a0;
    while ( diferenco > Math.PI ) diferenco -= Math.PI * 2;
    while ( diferenco < -Math.PI ) diferenco += Math.PI * 2;
    for ( let k = 0; k <= punktojPoArko; k++ ) {
      const ang = a0 + diferenco * k / punktojPoArko;
      punktoj.push([ p[0] + Math.cos(ang) * rc, p[1] + Math.sin(ang) * rc ]);
    }
    // La fina punkto de ĉi tiu arko kaj la unua punkto de la sekva kuŝas ambaŭ
    // sur la rando i ( ili havas la normalon de tiu rando ), do la linio inter
    // ili estas la rando mem — neniu plia punkto necesas.
  }
  return punktoj;
}

// FormaBazo — la krutaĵo kaj la fundo de la mondo.
export interface FormaBazo {
  geometrio: THREE.BufferGeometry;
  randPunktoj: number[][];
  // aktualigu — sekvigu la krutaĵon al la tereno ( kaj al la baza ebeno ).
  aktualigu( alto: Alto, bazaY: number ): void;
}

// kreiFormanBazon — la vertikala krutaĵo kaj la funda kovrilo de la mondo. La
// mondo ne estas senfina tavolo — ĝi estas terpeco kun rando, do la rando
// bezonas flankojn malsupren al la baza ebeno kaj kovrilon malsupre. La flankoj
// sekvas la terenon ĉe ĉiu randa punkto ( la sama alto kiel la supraĵo ), do la
// tereno kaj la krutaĵo kuntuŝiĝas sen fendo, kaj la koloro malsupreniras tra la
// tavoloj de la grundo ( terenaStrataKoloroEn ).
//     @param opcioj.formo, grandeco - La formo de la mondo.
//     @param opcioj.koloro ( StrataKoloro ) - La koloriga funkcio de la krutaĵo.
//     @param opcioj.punktojPoArko ( number ) - La dividoj de ĉiu angula arko.
export function kreiFormanBazon( opcioj: {
  formo: MapFormo; grandeco: number; koloro: StrataKoloro; punktojPoArko?: number;
} ): FormaBazo {
  const randPunktoj = formajRandPunktoj(opcioj.formo, opcioj.grandeco,
    opcioj.punktojPoArko ?? 0o200);
  // La kontraŭhorloĝa ordo — la frontoj de la krutaĵo turniĝas eksteren nur se la
  // randaj punktoj rondiras kontraŭhorloĝe en la ( x, z ) ebeno. La areo decidas.
  let areo = 0;
  for ( let i = 0; i < randPunktoj.length; i++ ) {
    const a = randPunktoj[i], b = randPunktoj[( i + 1 ) % randPunktoj.length];
    areo += a[0] * b[1] - b[0] * a[1];
  }
  if ( areo < 0 ) randPunktoj.reverse();
  const P = randPunktoj.length;
  const geometrio = new THREE.BufferGeometry();
  const pozicioj = new Float32Array(( P * 2 + 1 ) * 3);
  const koloroj = new Float32Array(( P * 2 + 1 ) * 3);
  const indeksoj: number[] = [];
  for ( let i = 0; i < P; i++ ) {
    const j = ( i + 1 ) % P;
    // La flankoj — du trianguloj po rando. La horizontalaj pozicioj neniam
    // ŝanĝiĝas; nur la altoj de la supraj kaj la malsupraj ringoj.
    indeksoj.push(i, P + j, P + i, i, j, P + j);
    // La funda kovrilo — trianguloj el la centra punkto ( la lasta vertico ).
    indeksoj.push(P * 2, P + i, P + j);
  }
  const centro = P * 2;
  for ( let i = 0; i < P; i++ ) {
    pozicioj[i * 3] = randPunktoj[i][0];
    pozicioj[i * 3 + 2] = randPunktoj[i][1];
    pozicioj[( P + i ) * 3] = randPunktoj[i][0];
    pozicioj[( P + i ) * 3 + 2] = randPunktoj[i][1];
  }
  geometrio.setAttribute("position", new THREE.BufferAttribute(pozicioj, 3));
  geometrio.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
  geometrio.setIndex(indeksoj);
  const koloro = new THREE.Color();
  const bazo: FormaBazo = {
    geometrio,
    randPunktoj,
    aktualigu( alto: Alto, bazaY: number ): void {
      for ( let i = 0; i < P; i++ ) {
        const x = randPunktoj[i][0], z = randPunktoj[i][1];
        const surfY = alto(x, z);
        pozicioj[i * 3 + 1] = surfY;
        pozicioj[( P + i ) * 3 + 1] = bazaY;
        opcioj.koloro(koloro, surfY, surfY);
        koloroj[i * 3] = koloro.r; koloroj[i * 3 + 1] = koloro.g; koloroj[i * 3 + 2] = koloro.b;
        opcioj.koloro(koloro, bazaY, surfY);
        koloroj[( P + i ) * 3] = koloro.r; koloroj[( P + i ) * 3 + 1] = koloro.g; koloroj[( P + i ) * 3 + 2] = koloro.b;
      }
      // La centro de la fundo — profunda roko.
      pozicioj[centro * 3 + 1] = bazaY;
      opcioj.koloro(koloro, bazaY, bazaY);
      koloroj[centro * 3] = koloro.r; koloroj[centro * 3 + 1] = koloro.g; koloroj[centro * 3 + 2] = koloro.b;
      geometrio.attributes.position.needsUpdate = true;
      geometrio.attributes.color.needsUpdate = true;
      geometrio.computeVertexNormals();
    },
  };
  return bazo;
}
