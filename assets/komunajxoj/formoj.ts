// Forma modulo — komunaj formo-fabrikoj dividitaj inter la konstruajxoj kaj la interno.
import * as THREE from "three";

// kreiPilolFenestranFormon — Longan horizontalan rondigitan fenestron. Rektangulo
// kun duoncirklaj finoj (pilolo). Uzata por la internaj fenestroj (centritaj sur
// cxiu muro), la kasafeaj eksteraj fenestroj kaj la spacosxipaj fenestroj.
export function kreiPilolFenestranFormon(w: number, h: number): THREE.Shape {
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

// kreiStelanFenestranFormon — Stela pilolo. La sama pilolo kiel
// kreiPilolFenestranFormon, sed ĉe la du finoj kaj ĉe la mezo de la supra kaj
// malsupra rando elstaras PINTO.
// ⟨ Kiel ĝi estas uzata 📃 ⟩ Ĝi estas la EKSTERA konturo de la PLATA kadro de la
// fenestro — la alvokanto ŝveligas la pilolon per la kadra larĝo kaj eltranĉas
// la vitron kiel truon, do la oro kuŝas sur la muro kiel plata bendo kun kvar
// pintoj ( la fenestroj de la konstruaĵoj kaj de la kosmoŝipo ).
// ⟨ Kial la pintoj elstaras ekster la vitro 📃 ⟩ La konturo ĉirkaŭas la pilolon
// ĉie, do la kadro neniam transiras la vitron. Ĉe la finoj la pinto eliras el
// la du 45°-punktoj de la fina duoncirklo, ĉe la mezo ĝi eliras el la rekta
// rando — tri punktoj do tenas la triangulan pinton kaj ĝi restas akra ( kun la
// sama alto kiel la duono de la fenestra alto ĝi estas orta angulo ).
// ⟨ La interna mezuro kaj la bendo 📃 ⟩ La funkcio ricevas la FENESTRON ( la
// vitron ) kaj la kadran larĝon, kaj ŝveligas la pilolon mem. Tio gravas pro la
// centro — la ŝveligita konturo havas la SAMAN centron kiel la vitro ( la arkoj
// de la du formoj havas la samajn centrojn ), do la bendo estas egale larĝa ĉie
// kaj la vitro sidas precize centre de la kadro. Kiam la alvokanto mem ŝveligis
// la formon ( pasigante w + 2b ), la konturo iris de 0 ĝis h + 2b dum la truo
// iris de 0 ĝis h, do la bendo estis pli dika supre ol malsupre.
//     @param w ( number ) - La longo de la FENESTRO ( la vitro ).
//     @param h ( number ) - La alto de la fenestro.
//     @param bendo ( number ) - La kadra larĝo ĉirkaŭ la vitro.
//     @param pintoFlanko ( number ) - Kiom la du FINAJ pintoj elstaras. La
//         alvokanto krampas ĝin per la libera spaco ĝis la rando de la faco, do
//         la pinto restas sur la muro ankaŭ sur la mallarĝaj pintaj tavoloj.
//     @param pintoSupre ( number ) - Kiom la pintoj ĉe la mezoj de la longaj randoj
//         ( supre kaj malsupre ) elstaras.
//     @returns formo ( THREE.Shape ) - La stela konturo ( anguloj NE rondigitaj ).
export function kreiStelanFenestranFormon(w: number, h: number, bendo: number, pintoFlanko: number, pintoSupre: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 2, r = h / 2;
  // La ekstera radiuso de la bendo, kaj la supraj/malsupraj randoj de la bendo.
  const R = r + bendo, supro = h + bendo, malsupro = -bendo;
  // La 45°-punktoj de la eksteraj finaj duoncirkloj — la bazo de la finaj pintoj.
  const d = R * Math.SQRT1_2;
  // ⟨ La plata parto 📃 ⟩ La supra kaj malsupra randoj restas REKTAJ — paralelaj
  // al la vitro — gxis preskaux la mezo, kaj nur poste ili levigxas kurbe al la
  // pinto. Antauxe la Bézier ekllevigxis jam en la mezo de la duono, do la tuta
  // rando aspektis kiel longa svingo; nun la rekta parto portas la plimulton.
  const plata = ( hw - r ) * 0o3/0o10;
  // ⟨ La flankaj pintoj estas GLATAJ LENSOJ 📃 ⟩ La pinto ĉe la fino antaŭe
  // eliris per rekta streko kaj resaltis reen al la arko, do la transiro havis
  // angulon kaj la pinto aspektis kiel nadlo. Nun la konturo eliras el la
  // 45°-punkto laŭ la SAMA tanĝanto kiel la arko kaj reeniras al la alia
  // 45°-punkto per du kubikaj kurboj, do la pinto legigxas kiel folio.
  const brako = r - d + bendo + pintoFlanko;
  const svingo = brako * 0o1/0o2;
  s.moveTo(hw - r, malsupro);
  // La dekstra fino — la malsupra kvarona arko, la lensa pinto, la supra arko.
  s.absarc(hw - r, r, R, -Math.PI / 2, -Math.PI / 4, false);
  s.bezierCurveTo(hw - r + d + svingo * Math.SQRT1_2, r - d + svingo * Math.SQRT1_2,
    hw + bendo + pintoFlanko - svingo, r, hw + bendo + pintoFlanko, r);
  s.bezierCurveTo(hw + bendo + pintoFlanko - svingo, r,
    hw - r + d + svingo * Math.SQRT1_2, r + d - svingo * Math.SQRT1_2,
    hw - r + d, r + d);
  s.absarc(hw - r, r, R, Math.PI / 4, Math.PI / 2, false);
  // ⟨ La rando restas PARALELA al la vitro, poste kurvas al la pinto 📃 ⟩ La
  // supra kaj malsupra randoj de la kadro estas REKTAJ, paralelaj al la vitro,
  // dum la plimulto de la rando, kaj nur la meza parto levigxas ( aux mallevigxas )
  // kurbe al la pinto. La unua kontrolo de la kubika Bézier sidas je duono de la
  // plata parto, kaj la dua nur je kvarono de la pinto. Des pli alta la dua
  // kontrolo, des pli frue la rando levigxus — per la malalta dua kontrolo la
  // levigxo okazas PROKSIME AL LA MEZO, kaj la kurbo alvenas vertikale al la
  // pinto. La pinto restas akra, la transiro ronda.
  s.lineTo(plata, supro);
  s.bezierCurveTo(plata * 0o1/0o2, supro, 0, supro + pintoSupre * 0o1/0o2, 0, supro + pintoSupre);
  s.bezierCurveTo(0, supro + pintoSupre * 0o1/0o2, -plata * 0o1/0o2, supro, -plata, supro);
  s.lineTo(-hw + r, supro);
  // La maldekstra fino — preciza spegulo de la dekstra.
  s.absarc(-hw + r, r, R, Math.PI / 2, Math.PI * 0o3/0o4, false);
  s.bezierCurveTo(-hw + r - d - svingo * Math.SQRT1_2, r + d - svingo * Math.SQRT1_2,
    -hw - bendo - pintoFlanko + svingo, r, -hw - bendo - pintoFlanko, r);
  s.bezierCurveTo(-hw - bendo - pintoFlanko + svingo, r,
    -hw + r - d - svingo * Math.SQRT1_2, r - d + svingo * Math.SQRT1_2,
    -hw + r - d, r - d);
  s.absarc(-hw + r, r, R, Math.PI * 0o5/0o4, Math.PI * 0o3/0o2, false);
  // La malsupra rando — la sama plata rando kun la kurbo malsupren.
  s.lineTo(-plata, malsupro);
  s.bezierCurveTo(-plata * 0o1/0o2, malsupro, 0, malsupro - pintoSupre * 0o1/0o2, 0, malsupro - pintoSupre);
  s.bezierCurveTo(0, malsupro - pintoSupre * 0o1/0o2, plata * 0o1/0o2, malsupro, plata, malsupro);
  s.closePath();
  return s;
}

// rondigiKonturon — Fermita formo el punktaro, kun ĉiu angulo RONDIGITA per
// kvadrata Bézier-tranĉo. Ĉiu tranĉo ekiras kaj alvenas laŭ la sama direkto kiel
// la antaŭa kaj la sekva peco, do la konturo estas GLATA ĉie — neniu angulo, eĉ
// ĉe la pintoj de la stelo, kiuj nur mallarĝiĝas ĝis malgranda ronda fino.
//     @param punktoj ( THREE.Vector2[] ) - La konturo, en ordo.
//     @param radio ( number ) - Kiom granda la rondigo. Ĝi estas aŭtomate
//         malgrandigita se la pecoj ĉirkaŭ la angulo estas pli mallongaj.
//     @returns formo ( THREE.Shape ) - La glata konturo.
export function rondigiKonturon(punktoj: THREE.Vector2[], radio: number): THREE.Shape {
  const s = new THREE.Shape();
  const n = punktoj.length;
  const direktu = (a: THREE.Vector2, b: THREE.Vector2): THREE.Vector2 =>
    new THREE.Vector2(b.x - a.x, b.y - a.y).normalize();
  for ( let i = 0; i < n; i++ ) {
    const V = punktoj[i], A = punktoj[(i + n - 1) % n], B = punktoj[(i + 1) % n];
    const u = direktu(A, V), v = direktu(V, B);
    // ⟨ Neniu rondigo ĉe vera pinto 📃 ⟩ Se la vojo turnigxas reen ( la pinto mem
    // de la stelo kaj ĉe la finoj ), la tranĉo degenerus — la kurbo revenus al
    // la sama punkto kaj lasus nulan lamenon. La pinto do restas pinto.
    if ( u.dot(v) < -0o17/0o20 ) { s.lineTo(V.x, V.y); continue; }
    // Neniam prenu pli ol la duono de la najbaraj pecoj, alie la tranĉoj de la
    // du anguloj renkontus unu la alian kaj la konturo mem interkruciĝus.
    const h = Math.min(radio, A.distanceTo(V) * 0.5, V.distanceTo(B) * 0.5);
    const komenco = V.clone().addScaledVector(u, -h);
    const fino = V.clone().addScaledVector(v, h);
    if ( i === 0 ) s.moveTo(komenco.x, komenco.y); else s.lineTo(komenco.x, komenco.y);
    s.quadraticCurveTo(V.x, V.y, fino.x, fino.y);
  }
  s.closePath();
  return s;
}

// kreiRondigitanRektangulanFormon — Rondigita rektangulo ( nur la kvar anguloj
// estas rondaj ). Kontrauxhorlogxa volvajxo tenas la supran facon de
// ExtrudeGeometry supren post la ekzistanta -90° X-rotacio. Uzata de la vojoj
// ( kreiRondanRektangulon, kiu krampas la radiuson ), la kosmoporda lancx-
// apronoj kaj la ora bazplato — la sama formo en la tuta mondo.
//     @param w ( number ) - Largho.
//     @param d ( number ) - Profundo.
//     @param r ( number ) - Radio de la rondaj anguloj ( la alvokanto zorgu
//         pri krampo al la duon-dimensioj se necesas ).
//     @returns formo ( THREE.Shape ) - La rondigita rektangulo.
export function kreiRondigitanRektangulanFormon(w: number, d: number, r: number): THREE.Shape {
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
