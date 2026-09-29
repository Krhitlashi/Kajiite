// ≺⧼ La vojaj segmentoj 🧩 ⧽≻
// La interna maŝinaro de unu voja segmento — la kunigaj truoj
// ( kreiSegmentajnPartojn ) kaj la buffer-a geometrio kun la ŝtupoj kaj la
// glata ponta deko ( konstruiSegmentonEnBufrojn ).
import { matricoPor, ANGULA_PROVOLIRO, type VojBendo, type VojGeometriajBufroj } from "./bufroj.js";
import { kreiSegmentGeometrion } from "./formoj.js";
import { VOJA_EKSTERA_DUONO, VOJA_TRUA_DUONO } from "./mezuroj.js";
import { vojSuprajxoj } from "./tipoj.js";

// kreiSegmentajnPartojn — La partoj de unu voja segmento kiujn la geometrio
// konstruu, laŭ la segmentaj distancoj ( 0 .. longo ). Ĉiu KUNIGO forprenas la
// truan duonon de la vojo ( VOJA_TRUA_DUONO ) ambaŭflanke de la
// kuniga punkto — la kuniga plato kaj gxiaj stumpoj plenigas tiun intervalon
// per sia propra surfaco, do la andezitaj flankoj de la vojoj ne povas kuŝi
// super la dioritaj partoj de la plato ( tion faris la rektangulaj anguloj
// antauxe ).
//
// ⟨ La perpendikulara tolero 📃 ⟩ — la kunigaj punktoj de la KRADA urbo sidas
// ĝuste SUR la vojaj centrolinioj ( la linioj kruciĝas en la punkto mem ), do
// ilia perpendikulara distanco estas nulo. Kelkaj skulptitaj vojoj tamen
// FINIĜAS ĉe la RANDO de la vojo, kiun ili renkontas — la ponto kaj la avenuo
// finiĝas ĉe VOJA_EKSTERA_DUONO de la kaja centrolinio, ne ĉe ĝi mem ( la deko
// devas surteriĝi sur la kajan rubandon, ne trapasi ĝin ĝis la mezo ). Tia
// kunigo sidas 1.475 unuojn FLANKEN de la finiĝanta vojo, do malstrikta tolero
// estas nepra ĉe la segmentaj FINOJ; meze de vojo ĝi restas preskaŭ nula, ĉar
// tie tranĉus nur kunigo, kiu apartenas al ALIA vojo — truo, kiun tiu plato ne
// kovrus. Sen ĉi tiu apartigo la fino de la ponto neniam ricevis truon: ĝia
// rubando penetris en la kunigan kvadraton, du pavimoj kuŝis samalte unu en la
// alia, kaj la rekta andezita rando de la deko tranĉis la rondigitan kornon de
// la plato.
//     @param aX, aZ, bX, bZ ( number ) - La segmentaj finoj.
//     @param longo ( number ) - La segmenta longo.
//     @param kunigoj ( [ number, number ][] ) - Ĉiuj kunigaj punktoj.
//     @returns partoj ( [ number, number, boolean ][] ) - La komenco, la fino
//       kaj ĉu la parto estas KONSTRUOTA ( malvera = truo de kunigo ).
export function kreiSegmentajnPartojn(aX: number, aZ: number, bX: number, bZ: number,
  longo: number,
  kunigoj: [ number, number ][]
): [ number, number, boolean ][] {
  const ndx = ( bX - aX ) / longo, ndz = ( bZ - aZ ) / longo;
  const truoj: [ number, number ][] = [];
  for ( const [ kX, kZ ] of kunigoj ) {
    const rx = kX - aX, rz = kZ - aZ;
    const laux = rx * ndx + rz * ndz;
    if ( laux < -VOJA_TRUA_DUONO || laux > longo + VOJA_TRUA_DUONO ) continue;
    const perpendikulara = Math.abs(rx * ndz - rz * ndx);
    // ⟨ Meze — ĝuste sur la centrolinio 📃 ⟩ kaj ⟨ Ĉe la finoj — ĝis la
    // rubanda rando 📃 ⟩ — vidu la klarigon super la funkcio.
    const cxeFino = laux <= VOJA_TRUA_DUONO || laux >= longo - VOJA_TRUA_DUONO;
    const perpendikularaTolero = ( cxeFino ? VOJA_EKSTERA_DUONO : 0o1/0o100 ) + 0o1/0o1000;
    if ( perpendikulara > perpendikularaTolero ) continue;
    truoj.push([ Math.max(0, laux - VOJA_TRUA_DUONO), Math.min(longo, laux + VOJA_TRUA_DUONO) ]);
  }
  truoj.sort(( p, q ) => p[0] - q[0]);
  const partoj: [ number, number, boolean ][] = [];
  let kur = 0;
  for ( const [ t0, t1 ] of truoj ) {
    if ( t1 <= kur ) continue;
    if ( t0 > kur ) partoj.push([ kur, t0, true ]);
    partoj.push([ Math.max(kur, t0), t1, false ]);
    kur = t1;
  }
  if ( kur < longo ) partoj.push([ kur, longo, true ]);
  return partoj;
}

// konstruiSegmentonEnBufrojn — La buffer-a internaĵo de unu voja segmento.
// ĈIU vojo — la kradaj stratoj, la spronoj de la konstruaĵoj kaj la
// skulptitaj mondvojoj — iras tra ĉi tiu SAMA funkcio, kolektite en la samajn
// bufrojn ( unu po materialo por la tuta reto ).
// ⟨ Nur ŝtupoj 📃 ⟩ — ĉiu ordinara intervalo estas PLATA ŝtupo. Ĝi specimenas la
// du RANDOJN ( la komenco kaj la fino — la maksimuman kaj minimuman teren-altojn
// de iliaj lateralaj anguloj ), KAJ la INTERNON de la intervalo ( kvaronaj
// punktoj laŭlonge — vidu "Kromaj specimenoj meze" sube ), sidas je la ALTA
// rando ( la maksimumo de ĉiuj specimenoj ) kaj havas vertikalan vizaĝon ĝis sub
// la teron. La vojo NENIAM kliniĝas — la alto ŝanĝiĝas nur per la naturaj ŝtupoj,
// kaj la najbaraj ŝtupoj kunhavas randan specimenon, do la transiro restas
// preciza. La profundo ĉiam etendiĝas sub la minimuman specimenon + margxeno —
// neniu ŝvebanta rando, neniu sinko. ( La nura escepto estas `glata: true` — la REKTA ponta
// deko, kiu devas resti unu linio kun sia balustrado kaj arko. )
export function konstruiSegmentonEnBufrojn(x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  heightFn: ( x: number, z: number ) => number,
  bufroj: VojGeometriajBufroj,
  glata = false
): void {
  const difX = x2 - x1, difZ = z2 - z1;
  const longo = Math.hypot(difX, difZ);
  if ( longo < 0o1/0o100 ) return;
  const steps = Math.max(1, Math.round(longo / 4));
  const pasoLongo = longo / steps;
  const ndx = difX / longo, ndz = difZ / longo;
  // La ekstera benda duon-largho — la randaj specimenadoj kovras la tutan sekcon.
  let eksteraDuon = 0;
  for ( const bendo of bendoj ) {
    const rando = Math.abs(bendo.ofseto) + bendo.largho / 2;
    if ( rando > eksteraDuon ) eksteraDuon = rando;
  }
  // La laterala duon-vektoro ( ⊥ al la voja direkto ) — la du anguloj de
  // ĉiu rando sidas je ± ĉi tiu de la randa centro.
  const latX = -ndz * eksteraDuon, latZ = ndx * eksteraDuon;
  for ( let s = 0; s < steps; s++ ) {
    const t0 = s / steps, t1 = ( s + 1 ) / steps;
    const sx1 = x1 + difX * t0, sz1 = z1 + difZ * t0;
    const sx2 = x1 + difX * t1, sz2 = z1 + difZ * t1;
    const movX = ( sx1 + sx2 ) / 2, movZ = ( sz1 + sz2 ) / 2;
    // ⟨ Randaj specimenadoj 📃 ⟩ — la maksimuman kaj minimuman teren-altojn de
    // la du lateralaj anguloj de ĉiu rando. La najbara ŝtupo specimenas LA
    // SAMAJN punktojn ĉe la komuna rando — la supro daŭriĝas kontinue.
    const h0a = heightFn(sx1 - latX, sz1 - latZ);
    const h0b = heightFn(sx1 + latX, sz1 + latZ);
    const h1a = heightFn(sx2 - latX, sz2 - latZ);
    const h1b = heightFn(sx2 + latX, sz2 + latZ);
    const minimum0 = Math.min(h0a, h0b);
    const minimum1 = Math.min(h1a, h1b);
    const maks0 = Math.max(h0a, h0b);
    const maks1 = Math.max(h1a, h1b);
    if ( glata ) {
      // ⟨ Glata deklivo ( nur la ponta deko ) 📃 ⟩ — la ponta deko estas unu
      // REKTA trabo, kaj ĝia balustrado kaj arko ( konstruiPonton ) sekvas la
      // saman rektan linion. Se la deko ŝtupus, la fostoj kaj la arko misalignus
      // kun la ŝtupoj, do nur ĉi tiu speciala difino ( `glata: true` ) restas
      // klinita — ĉiuj ordinaraj vojoj ŝtupas ( sube ).
      const s0 = maks0 + 0o1/0o100 + dikecoBaza;
      const s1 = maks1 + 0o1/0o100 + dikecoBaza;
      const difo = s1 - s0;
      vojSuprajxoj.push({ x1: sx1, z1: sz1, x2: sx2, z2: sz2, duono: eksteraDuon, y0: s0, y1: s1 });
      const klinoL = Math.hypot(pasoLongo, difo);
      const ang = Math.atan2(difo, pasoLongo);
      const dikeco = ( Math.max(s0 - minimum0, s1 - minimum1) + ANGULA_PROVOLIRO ) / Math.cos(ang);
      const y = ( s0 + s1 ) / 2 - dikeco * Math.cos(ang);
      for ( const bendo of bendoj ) {
        const geometrio = kreiSegmentGeometrion(bendo.largho, klinoL, dikeco, bendo.ofseto);
        geometrio.rotateX(ang);
        bufroj.aldoni(geometrio, bendo.materialo, matricoPor(difX, difZ, movX, y, movZ));
      }
      continue;
    }
    // ⟨ ĈIAM ŝtupoj, neniam deklivo 📃 ⟩ — ĉiu ordinara vojo NENIAM kliniĝas.
    // Ĉiu intervalo estas PLATA ŝtupo, kies supro sidas je la ALTA rando de la
    // intervalo ( la maksimumo de la du randaj specimenoj ), kaj la sekva
    // intervalo komenciĝas je la sama komuna rando. La alto do ŝanĝiĝas per
    // naturaj ŝtupoj — la riso estas ĝuste la terena falo trans unu intervalon —
    // anstataŭ per glata malsupren-kurbiĝo. Ĉar la ŝtupo sidas je la alta rando,
    // la vojo ĉiam kovras la terenon ( nek sinko nek elfluo ), kaj la profundo
    // malsupreniras sub ambaŭ randajn minimumojn + margxenon — la vertikala
    // vizaĝo montras la andezitan/dioritan bordon kiel la ŝtupa riso.
    // ⟨ Kromaj specimenoj meze 📃 ⟩ — la tereno povas ELSTARI inter la du randoj
    // de intervalo. La krado specimeniĝas ĉiun SKULPTA_PASOn ( 0o4 unuoj ), kaj la
    // intervalaj randoj ne ĉiam falas sur kradonodon, do la maksimumo de la du
    // randaj specimenoj povas preterlasi terenan elstaraĵon MEZE de la intervalo
    // — la tero tiam pinĉas tra la plata supro ( ĝuste tio estis la "duone sub la
    // tero" simptomo ĉe la kajo apud la riverbordo ). Ni do specimenas ankaŭ la
    // INTERNON de la intervalo — kvaronaj punktoj laŭlonge kaj la mezo flanke —
    // kaj prenas la maksimumon por la supro kaj la minimumon por la profundo. La
    // randoj restas la samaj specimenoj, do la ŝtupoj daŭre kongruas ĉe la komunaj
    // randoj kaj la alta rando de ĉiu intervalo restas la reganta.
    let maksSupro = Math.max(maks0, maks1);
    let minProfundo = Math.min(minimum0, minimum1);
    for ( const f of [ 0o1/0o4, 0o1/0o2, 0o3/0o4 ] ) {
      const mezaX = sx1 + ( sx2 - sx1 ) * f, mezaZ = sz1 + ( sz2 - sz1 ) * f;
      const hmA = heightFn(mezaX - latX, mezaZ - latZ);
      const hmB = heightFn(mezaX + latX, mezaZ + latZ);
      const hmC = heightFn(mezaX, mezaZ);
      if ( hmA > maksSupro ) maksSupro = hmA;
      if ( hmB > maksSupro ) maksSupro = hmB;
      if ( hmC > maksSupro ) maksSupro = hmC;
      if ( hmA < minProfundo ) minProfundo = hmA;
      if ( hmB < minProfundo ) minProfundo = hmB;
      if ( hmC < minProfundo ) minProfundo = hmC;
    }
    const supro = maksSupro + 0o1/0o100 + dikecoBaza;
    // Registru la piedeblan supraĵon de la ŝtupo — plata supro je supro.
    vojSuprajxoj.push({ x1: sx1, z1: sz1, x2: sx2, z2: sz2, duono: eksteraDuon, y0: supro, y1: supro });
    const dikeco = supro - ( minProfundo - ANGULA_PROVOLIRO );
    const y = supro - dikeco;
    for ( const bendo of bendoj ) {
      const geometrio = kreiSegmentGeometrion(bendo.largho, pasoLongo, dikeco, bendo.ofseto);
      bufroj.aldoni(geometrio, bendo.materialo, matricoPor(difX, difZ, movX, y, movZ));
    }
  }
}
