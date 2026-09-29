// ≺⧼ La internaj muroj kaj fenestroj 🧱 ⧽≻
// La muroj el rondigitaj skatol-segmentoj kun pilola fenestra truo
// ( konstruiMuronKunPilolaTruo ) kaj la longaj horizontalaj fenestroj
// ( aldoniLonganFenestron ).
import * as THREE from "three";
import { kreiPilolFenestranFormon, kreiStelanFenestranFormon, rondigiKonturon } from "../../komunajxoj/formoj.js";

// konstruiMuronKunPilolaTruo — Muro el fidindaj skatol-segmentoj ( kiuj plene
// kovras la muron ) kun kvar rondigitaj angulaj plenigaĵoj, por ke la malkovro
// kongruu precize al la pilola fenestro sen akraj rektangulaj anguloj.
// ( La malnova unupe ekstrudita panelo kun pilola truo ne kovris la murojn
// fidinde — la skatol-segmentoj estas la originala, pruvita konstruo. )
export function konstruiMuronKunPilolaTruo(
  g: THREE.Group,
  plataLargho: number,
  bazaY: number,
  alto: number,
  dikeco: number,
  ww: number,
  hh: number,
  fenY: number,
  materialo: THREE.MeshStandardMaterial,
  cx: number,
  cz: number,
  rotacio = 0
): void {
  const wc = ww / 2;
  const fenLokY = fenY - bazaY;
  const segLargho = plataLargho - ww / 2;
  const segAlto = alto - ( fenLokY + hh );

  // ⟨ Ĉio estas konstruata en LOKA grupo 📃 ⟩ — la segmentoj, la rondigitaj
  // anguloj kaj la truo sidas en grupo ĉe la ORIGINO ( x laŭ la muro, y supren ),
  // kaj la grupo mem portas la rotacion kaj la pozicion. Antaŭe ĉiu bloko ricevis
  // la rotacion aparte kaj ĝiaj lokaj ofsetoj estis miksitaj kun la mondaj
  // koordinatoj — tio funkciis nur por la rotacioj 0 kaj ±90°, kaj la angulaj
  // formoj eĉ bezonis apartan spegulon. Nun la sama konstruo servas ankaŭ la
  // ANTAŬAN muron ( rotacio π ), kiu ricevis fenestron.
  const grupo = new THREE.Group();
  grupo.position.set(cx, bazaY, cz);
  grupo.rotation.y = rotacio;
  g.add(grupo);

  // Skatola segmento en la mura loka kadro ( x laŭ la muro, y vertikala ).
  const aldoniBlokon = ( lokalX: number, lokalY: number, largho: number, alteco: number ) => {
    if ( largho <= 0 || alteco <= 0 ) return;
    const b = new THREE.Mesh(new THREE.BoxGeometry(largho, alteco, dikeco), materialo);
    b.position.set(lokalX + largho / 2, lokalY + alteco / 2, 0);
    grupo.add(b);
  };
  // Rondigita angula plenigaĵo ( formo sen truo — malgranda, fidinda ).
  const aldoniAngulon = ( formo: THREE.Shape, cxLoka: number, cyLoka: number ) => {
    const geo = new THREE.ExtrudeGeometry(formo, { depth: dikeco, bevelEnabled: false, curveSegments: 0o20 });
    geo.translate(0, 0, -dikeco / 2);
    const m = new THREE.Mesh(geo, materialo);
    m.position.set(cxLoka, cyLoka, 0);
    grupo.add(m);
  };

  // Malsegmentoj maldekstre/dekstre de la fenestro
  if ( segLargho > 0 ) {
    aldoniBlokon(-plataLargho, 0, segLargho, alto);
    aldoniBlokon(wc, 0, segLargho, alto);
  }
  // Malsegmentoj sub kaj super la fenestro
  if ( fenLokY > 0 ) aldoniBlokon(-wc, 0, ww, fenLokY);
  if ( segAlto > 0 ) aldoniBlokon(-wc, fenLokY + hh, ww, segAlto);

  // Kvar rondigitaj angulaj plenigaĵoj. La regiono inter la rektangula truo kaj
  // la duoncirklaj ĉap-finoj de la pilola fenestro. Ĉiu formo estas konstruita
  // en sia propra loka kadro ( centrita je la angula centro ) kaj metita per
  // aldoniAngulon ĉe la koresponda angulo.
  const r = hh / 2;
  const cyArk = fenLokY + r;
  // Ĉiu plenigaĵo estas kvadrato r×r kun kvaroncirkla arko kuŝanta sur la
  // ĉap-cirklo de la pilola fenestro — la plenigaĵo restas en la muro, ekster
  // la malfermo. La arko-centro estas la angulo de la rektangula truo plej
  // proksima al la fenestra ĉap-centro ( lokalaj (∓r/2, ∓r/2) sube-dekstre ).
  // Supre-dekstre
  const tr = new THREE.Shape();
  tr.moveTo(r / 2, -r / 2);
  tr.lineTo(r / 2, r / 2);
  tr.lineTo(-r / 2, r / 2);
  tr.absarc(-r / 2, -r / 2, r, Math.PI / 2, 0, true);
  tr.closePath();
  aldoniAngulon(tr, wc - r / 2, cyArk + r / 2);
  // Malsupre-dekstre
  const br = new THREE.Shape();
  br.moveTo(r / 2, r / 2);
  br.lineTo(r / 2, -r / 2);
  br.lineTo(-r / 2, -r / 2);
  br.absarc(-r / 2, r / 2, r, -Math.PI / 2, 0, false);
  br.closePath();
  aldoniAngulon(br, wc - r / 2, cyArk - r / 2);
  // Supre-maldekstre
  const tl = new THREE.Shape();
  tl.moveTo(-r / 2, -r / 2);
  tl.lineTo(-r / 2, r / 2);
  tl.lineTo(r / 2, r / 2);
  tl.absarc(r / 2, -r / 2, r, Math.PI / 2, Math.PI, false);
  tl.closePath();
  aldoniAngulon(tl, -( wc - r / 2 ), cyArk + r / 2);
  // Malsupre-maldekstre
  const bl = new THREE.Shape();
  bl.moveTo(-r / 2, r / 2);
  bl.lineTo(-r / 2, -r / 2);
  bl.lineTo(r / 2, -r / 2);
  bl.absarc(r / 2, r / 2, r, -Math.PI / 2, -Math.PI, true);
  bl.closePath();
  aldoniAngulon(bl, -( wc - r / 2 ), cyArk - r / 2);
}

// aldoniLonganFenestron — Unu centrita LONGAs horizontala RONDIGITA fenestro kun
// la ORA STELA kadro de la eksteraj fenestroj sur muro.
// orientacio. "malantaŭ" ( la muro ĉe −z, fakas +z ), "antaŭ" ( la muro ĉe +z,
// fakas −z ), "maldekstra" ( fakas +x ), "dekstra" ( fakas −x ).
//     @param kadraMaterialo ( MeshStandardMaterial ) - La ORA kadra materialo de
//         la konstruajxo ( la sama kiel la porda rando kaj la angulaj kolonoj ).
//         La malnova interna kadro estis du apartaj materialoj ( tuba rando kaj
//         linia kadro ); la stela plato estas unu solida mesho, do ĝi uzas unu.
export function aldoniLonganFenestron(
  group: THREE.Group,
  cx: number, cz: number, bazaY: number, alto: number,
  plataLargho: number,
  orientacio: "antaŭ" | "malantaŭ" | "maldekstra" | "dekstra",
  muraMaterialo: THREE.MeshStandardMaterial,
  fenestraMaterialo: THREE.MeshStandardMaterial,
  kadraMaterialo: THREE.MeshStandardMaterial
): void {
  // Fenestro-larĝo laŭ la tavolflanko. Pli longa sur pli longaj muroj, kun
  // malgranda libero ĉe ĉiu fino (2/3 de la flanko + kvarono).
  const ww = Math.min(plataLargho * 2 - 0o3/0o10, plataLargho * 4/3 + 0o1/0o4);
  const hh = Math.min(0o5/0o10, alto * 0o23/0o100);
  const fenY = bazaY + Math.max(alto * 2/5, 0o3/0o4);
  if ( fenY + hh > bazaY + alto ) return;
  const malantaŭ = orientacio === "malantaŭ";
  const antaŭ = orientacio === "antaŭ";
  // ⟨ Kvar orientoj 📃 ⟩ — la antaŭa muro ( ĉe +z ) turnas la fenestron per π :
  // ĝia enĉambra flanko estas −z. La malnova tri-kaza versio lasis ĝin sen
  // fenestro, do la ĉambro havis nur tri.
  const rotacio = orientacio === "dekstra" ? -Math.PI / 2
    : orientacio === "maldekstra" ? Math.PI / 2 : Math.PI;
  // La vitra panelo kaj ora kadro sidas ĉe la ĉambro-flanko de la muro (ne en ĝia centro)
  const ofseto = 0o3/0o40;
  const aCx = malantaŭ || antaŭ ? cx : cx + ( orientacio === "dekstra" ? -ofseto : ofseto );
  const aCz = malantaŭ ? cz + ofseto : antaŭ ? cz - ofseto : cz;
  const dikeco = 0o3/0o20;
  // Unu muro kun rondigita (pilola) truo — la malkovro kongruas precize al la
  // pilola fenestro, sen akraj rektangulaj anguloj. La malantaŭa muro restas
  // nerotaciita ( rotacio validas nur por la flankaj muroj ).
  konstruiMuronKunPilolaTruo(group, plataLargho, bazaY, alto, dikeco, ww, hh, fenY, muraMaterialo, cx, cz, malantaŭ ? 0 : rotacio);
  // Vitra panelo (pilola formo) + ora pilola rando — Densa sampado por ke la
  // duoncirkloj estu glate rondaj, ne facetaj.
  const fenGeo = new THREE.ShapeGeometry(kreiPilolFenestranFormon(ww, hh), 0o100);
  const fen = new THREE.Mesh(fenGeo, fenestraMaterialo);
  fen.position.set(aCx, fenY, aCz);
  if ( !malantaŭ ) fen.rotation.y = rotacio;
  group.add(fen);
  // ⟨ La SAMA stela kadro kiel la ekstera fenestro 📃 ⟩ — la interno havis sian
  // propran kadron: rondan oran tubon laŭ la pilola konturo PLUS maldikan linian
  // skatolon. La eksteraj fenestroj ( la kunvenejo, la stacidomo kaj la kosmoŝipo
  // — vidu aldoniPilolFenestron en satalaj-konstruajxoj.ts ) portas PLATAN PLENAN
  // oran platon en la formo de stelo: la pilolo ŝveligita per la kadra larĝo, kun
  // kvar pintoj, kaj la vitra pilolo eltranĉita el la mezo. Oni vidas la fenestron
  // de ambaŭ flankoj de la muro, do la interno nun konstruas la SAMAN kadron per
  // la samaj helpiloj ( kreiStelanFenestranFormon + rondigiKonturon ), nur el siaj
  // propraj mezuroj: la oro ĉirkaŭas la vitron per egala bendo kaj la pintoj
  // elstaras el tiu bendo.
  const kadroLargho = 0o1/0o10, kadroDikeco = 0o1/0o20;
  // ⟨ Kiom da libera muro ĉirkaŭ la fenestro 📃 ⟩ — la pintoj neniam rajtas
  // elstari preter la rando de la muro. Horizontale la muro donas plataLargho −
  // ww/2 kaj vertikale la PLI MALGRANDAN liberon de supre kaj sube ( la fenestro
  // ne estas vertikale centrita en la muro, malkiel la eksteraj, kiuj sidas en la
  // mezo de sia tavolo ).
  const liberoLonga = plataLargho - ww / 2;
  const liberoMallonga = Math.min(fenY - hh / 2 - bazaY, bazaY + alto - fenY - hh / 2);
  const pintoSupre = hh * 0o1/0o2;
  const pintoFlanko = Math.max(0, Math.min(pintoSupre, liberoLonga - kadroLargho - 0o1/0o100));
  const pintoMallonga = Math.max(0, Math.min(pintoSupre, liberoMallonga - kadroLargho - 0o1/0o100));
  const stelo = rondigiKonturon(
    kreiStelanFenestranFormon(ww, hh, kadroLargho, pintoFlanko, pintoMallonga).getPoints(0o20),
    0o1/0o20);
  const truo = kreiPilolFenestranFormon(ww - 0o1/0o100, hh - 0o1/0o100).getPoints(0o20);
  stelo.holes.push(new THREE.Path(truo.reverse()));
  const kadroGeo = new THREE.ExtrudeGeometry(stelo,
    { depth: kadroDikeco, bevelEnabled: false, curveSegments: 0o10 });
  const kadro = new THREE.Mesh(kadroGeo, kadraMaterialo);
  // ⟨ Eta elstaro antaŭ la vitro 📃 ⟩ — la plato kuŝas sur la ĉambra faco de la
  // muro, tuj antaŭ la vitra ebeno. Sen la eta ŝovo ( 0o1/0o100 ) la malantaŭa
  // faco de la plato kaj la vitro estus sam-ebenaj sur la mallarĝa rondo, kie la
  // oro kovras la randon de la vitro — tio flagretus ( z-fighting ).
  const elstaro = 0o1/0o100;
  kadro.position.set(
    malantaŭ || antaŭ ? aCx : aCx + ( orientacio === "dekstra" ? -elstaro : elstaro ),
    fenY,
    malantaŭ ? aCz + elstaro : antaŭ ? aCz - elstaro : aCz);
  if ( !malantaŭ ) kadro.rotation.y = rotacio;
  group.add(kadro);
}
