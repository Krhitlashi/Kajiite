// ≺⧼ Mangxajxoj 🍲 ⧽≻
// Manĝaĵ-objektoj ( bulkoj, glasoj, vaporoj ) kaj la mangx-sistemo.
// La samaj objektoj sidas sur la tabloj kaj interne ( eniriInternon ) kaj
// ekstere ( konstruiSatalon ), do ili vivas en la mebloj modulo,
// ne en la konstruajxoj.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { kreiKanvasanTeksajxon } from "../komunajxoj/teksajxoj.js";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";
import { TABLA_SUPRO } from "./tabloj.js";

export interface MangxajxDatumo { key: string; name: string; col: number; flavor: string; }
export const FOKS: MangxajxDatumo[] = [
  { key: "fok0", name: "Fok Iimasai · Lichen Crust", col: 0xe0d8c0, flavor: "Warm lichen bread, slow duck, a fold of steam." },
  { key: "fok1", name: "Fok Iimasai · Mint Glaze", col: 0xd0e0c8, flavor: "Cool glaze against rich meat · the forest exhales." },
  { key: "fok2", name: "Fok Iimasai · Peppered", col: 0xd8c8b0, flavor: "Dark pepper bites · the bun answers sweet." },
];
export const TLAS: MangxajxDatumo[] = [
  { key: "tla0", name: "Tlatiiwa · Classic", col: 0xc8e8d0, flavor: "Vinegar, milk, mint, sparkle · a bright chord." },
  { key: "tla1", name: "Tlatiiwa · Honeyed", col: 0xe8d0a0, flavor: "Amber over acid · mint underneath." },
  { key: "tla2", name: "Tlatiiwa · Iced Birch-sap", col: 0xc0e0e8, flavor: "Birch-sap frost · the vale in a glass." },
];
// Pussxlefo-beroj — la travideblaj manĝeblaj beroj de la fern-grandaj
// Pussxlefoj ( ſ̀ȷɔ ı],ͷ̗ɔʞ ſןɹɔ˞ ꞁȷ̀ᴜꞇ ). Unu specio, laktece travidebla.
export const PUSSXLEFO_BEROJ: MangxajxDatumo[] = [
  { key: "puss0", name: "Pusŝlefo · Pearlescent", col: 0xe8e8f8, flavor: "A cool, watery pop with a faint sweet aftertaste." },
];

// ⟨ La teksajxoj de la mangxajxoj 📃 ⟩ — la bulkoj kaj la glasoj estis ebenaj
// koloroj: bulko estis sfero, glaso estis cilindro. Nun ĉiu havas bildon. Ĉiuj
// bildoj estas NEŬTRALAJ ( grizaĵo ĉirkaŭ blanko ), ĉar la koloro venas de la
// materialo de la specio — unu bildo servas ĉiujn tri fok-ojn kaj ĉiujn tri
// tla-ojn. Ĉiu bildo generiĝas unufoje por la tuta mondo ( ne po manĝaĵo ).
let bulkaTeksajxo: THREE.CanvasTexture | null = null;
function bulkaTeksajxon(): THREE.CanvasTexture {
  return bulkaTeksajxo ??= kreiKanvasanTeksajxon(0o200, 0o200, ( k ) => {
    k.fillStyle = "#ffffff"; k.fillRect(0, 0, 0o200, 0o200);
    // La mola karno — molaj makuloj, malhelaj kiel la ombro de la suba duono.
    for ( let i = 0; i < 0o100; i++ ) {
      const r = 0o10 + Math.random() * 0o30;
      const x = Math.random() * 0o200, y = Math.random() * 0o200;
      const grad = k.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(196,176,150,${0o5/0o100 + Math.random() * 0o5/0o100})`);
      grad.addColorStop(1, "rgba(196,176,150,0)");
      k.fillStyle = grad; k.beginPath(); k.arc(x, y, r, 0, Math.PI * 2); k.fill();
    }
    // Faruno — etaj helaj punktoj, kiel la polvo post vapor-kurado.
    for ( let i = 0; i < 0o400; i++ ) {
      k.fillStyle = `rgba(255,255,255,${0o25/0o100 + Math.random() * 0o40/0o100})`;
      k.fillRect(Math.random() * 0o200, Math.random() * 0o200, 1, 1);
    }
  }, [ 1, 1 ], { anisotropio: 4 });
}
let korbaTeksajxo: THREE.CanvasTexture | null = null;
function korbaTeksajxon(): THREE.CanvasTexture {
  return korbaTeksajxo ??= kreiKanvasanTeksajxon(0o100, 0o100, ( k ) => {
    k.fillStyle = "#ffffff"; k.fillRect(0, 0, 0o100, 0o100);
    // La plektaĵo — kvar vergoj en ĉiu direkto, ĉiu kun ombro ĉe ambaŭ flankoj,
    // do la vergoj legiĝas kiel cilindroj super kaj sub la najbaroj.
    const largho = 0o100 / 0o4;
    for ( let i = 0; i < 0o4; i++ ) {
      const x = i * largho;
      const horizontala = k.createLinearGradient(x, 0, x + largho, 0);
      horizontala.addColorStop(0, "rgba(150,124,92,0.45)");
      horizontala.addColorStop(0o5/0o10, "rgba(255,255,255,0.0)");
      horizontala.addColorStop(1, "rgba(150,124,92,0.45)");
      k.fillStyle = horizontala; k.fillRect(x, 0, largho, 0o100);
      const vertikala = k.createLinearGradient(0, x, 0, x + largho);
      vertikala.addColorStop(0, "rgba(120,96,68,0.30)");
      vertikala.addColorStop(0o5/0o10, "rgba(255,255,255,0.10)");
      vertikala.addColorStop(1, "rgba(120,96,68,0.30)");
      k.fillStyle = vertikala; k.fillRect(0, x, 0o100, largho);
    }
  }, [ 3, 1 ], { anisotropio: 4 });
}
let vitraTeksajxo: THREE.CanvasTexture | null = null;
function vitraTeksajxon(): THREE.CanvasTexture {
  return vitraTeksajxo ??= kreiKanvasanTeksajxon(0o100, 0o100, ( k ) => {
    k.fillStyle = "#ffffff"; k.fillRect(0, 0, 0o100, 0o100);
    // Kondenso — etaj gutoj kun hela reflekto supre. La glaso mem estas
    // travidebla, do la gutoj estas la sola signo, ke la trinkaĵo estas malvarma.
    for ( let i = 0; i < 0o120; i++ ) {
      const x = Math.random() * 0o100, y = Math.random() * 0o100, r = 0o1 + Math.random() * 0o3;
      k.fillStyle = `rgba(150,170,168,${0o30/0o100 + Math.random() * 0o40/0o100})`;
      k.beginPath(); k.arc(x, y, r, 0, Math.PI * 2); k.fill();
      k.fillStyle = "rgba(255,255,255,0.85)";
      k.beginPath(); k.arc(x - r * 0o2/0o10, y - r * 0o2/0o10, r * 0o5/0o10, 0, Math.PI * 2); k.fill();
    }
  }, [ 2, 1 ], { anisotropio: 4 });
}
let citrusaTeksajxo: THREE.CanvasTexture | null = null;
function citrusaTeksajxon(): THREE.CanvasTexture {
  return citrusaTeksajxo ??= kreiKanvasanTeksajxon(0o100, 0o100, ( k ) => {
    k.fillStyle = "#fff6e0"; k.fillRect(0, 0, 0o100, 0o100);
    const c = 0o40;
    // La sektoroj — ok maldikaj linioj, kiuj dividas la tranĉaĵon.
    k.strokeStyle = "rgba(190,138,52,0.45)"; k.lineWidth = 1;
    for ( let i = 0; i < 8; i++ ) {
      const ang = i / 8 * Math.PI * 2;
      k.beginPath(); k.moveTo(c, c);
      k.lineTo(c + Math.cos(ang) * 0o70, c + Math.sin(ang) * 0o70); k.stroke();
    }
    // La ŝelo — pli dika malhela ringo ĉe la rando.
    k.strokeStyle = "rgba(214,132,36,0.75)"; k.lineWidth = 0o2;
    k.beginPath(); k.arc(c, c, 0o45, 0, Math.PI * 2); k.stroke();
  }, [ 1, 1 ], { anisotropio: 2 });
}

// ⟪ La materiala stoko de la manĝaĵoj 📃 ⟫ — la partoj de la bulkoj kaj de la
// glasoj uzas la samajn materialojn ( la plektita korbo, la oro, la vitro, la
// mento, la subteno ), sed ĉiu parto antaŭe kreis SIAN propran. La ok manĝaĵoj
// de unu mangxejo tiel faris pli ol cent materialojn por kelkaj objektoj — ĉiu
// el ili aparta uniformaro por la bildilo. La stoko redonas UNU materialon po
// ŝlosilo ( la sama ideo kiel konstruajxaMaterialo en satalaj-konstruajxoj.ts ).
// La koloraj variantoj portas la koloron en la ŝlosilo.
const materialaStoko = new Map<string, THREE.MeshStandardMaterial>();
function materialon(sxlosilo: string, krei: () => THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  let m = materialaStoko.get(sxlosilo);
  if ( !m ) { m = krei(); materialaStoko.set(sxlosilo, m); }
  return m;
}

// punktaSemo — Determinisma pseudo-hazardo por la disĵetitaj markoj ( la likeno,
// la pipro, la glaciaj pecoj ). La sama semo donas la saman aranĝon, do la bulko
// aspektas same ĉiun fojon kaj la mondo ne ŝanĝiĝas inter la eniroj.
//     @param semo ( number ) - La semo.
//     @returns ( () => number ) - La sekva valoro en [ 0, 1 ).
function punktaSemo(semo: number): () => number {
  let s = semo >>> 0;
  return () => {
    s = ( s + 0x6D2B79F5 ) >>> 0;
    let t = s;
    t = Math.imul(t ^ ( t >>> 15 ), t | 1 );
    t ^= t + Math.imul(t ^ ( t >>> 7 ), t | 61 );
    return ( ( t ^ ( t >>> 14 ) ) >>> 0 ) / 4294967296;
  };
}

// ⟪ La partoj de unu manĝaĵo, kunigitaj 📃 ⟫ — unu bulko aŭ glaso konsistas el
// dek ĝis dek-kvin etaj meshoj ( la karno, la faldoj, la korbo, la rimo, la oraj
// stangoj; la vitro, la likvaĵo, la surfaco, la menisko, la citrono, la mento,
// la subteno ). En plena mangxejo ( kvar tabloj, ok manĝaĵoj ) tio estas pli ol
// cent desegnaj alvokoj por nur manĝaĵoj — kaj ili NE povas iri tra la monda
// kunfando ( urbo.ts ), ĉar ĉiu el ili malaperas UNUOPE kiam la ludanto manĝas
// ĝin. Ĉi tiu helpilo bakas ĉiun parton en unu geometrion PO MATERIALO ( la
// loka transformo aplikiĝas dum la bakado ), do la grupo de unu manĝaĵo portas
// tri-kvin meshojn anstataŭ dek-kvin.
//     @param g ( THREE.Group ) - La grupo de la manĝaĵo ( la partoj rekte en ĝi ).
function kunfandiPartojn(g: THREE.Group): void {
  const listoj = new Map<THREE.Material, { geoj: THREE.BufferGeometry[]; kastas: boolean }>();
  for ( const infano of g.children ) {
    const parto = infano as THREE.Mesh;
    if ( parto.isMesh !== true || Array.isArray(parto.material) ) continue;
    // La loka matrico de la parto — la grupo mem ricevas sian transformon
    // poste de la alvokanto, do ni bakas nur la lokan pozicion/rotacion/skalon.
    parto.updateMatrix();
    const geometrio = parto.geometry.clone();
    geometrio.applyMatrix4(parto.matrix);
    const materialo = parto.material as THREE.Material;
    let listo = listoj.get(materialo);
    if ( !listo ) listoj.set(materialo, listo = { geoj: [], kastas: parto.castShadow });
    listo.kastas = listo.kastas || parto.castShadow;
    listo.geoj.push(geometrio);
  }
  for ( const infano of [ ...g.children ] ) {
    const parto = infano as THREE.Mesh;
    if ( parto.isMesh === true ) parto.geometry.dispose();
    g.remove(infano);
  }
  for ( const [ materialo, listo ] of listoj ) {
    if ( listo.geoj.length === 0 ) continue;
    const kunigita = listo.geoj.length === 1 ? listo.geoj[0] : kunfandiGeometriojn(listo.geoj);
    if ( listo.geoj.length > 1 ) for ( const geo of listo.geoj ) geo.dispose();
    const mesho = new THREE.Mesh(kunigita, materialo);
    mesho.castShadow = listo.kastas;
    g.add(mesho);
  }
}

// bunMesh — Vapor-kuirita bulko en malprofunda plektita korbo: duongloba karno
// kun OK faldoj, kiuj kunvenas ĉe la pinto, la korbo mem malfermita bovlo kun
// interna fundo, rimo kaj oraj stangetoj.
//     @param f ( MangxajxDatumo ) - La specio ( la koloro ).
//     @returns g ( THREE.Group ) - La bulko kune kun ĝia korbo; la grupo-origino
//              estas la korbo-fundo, do oni metas ĝin rekte sur la tabulon.
export function bunMesh(f: MangxajxDatumo): THREE.Group {
  const g = new THREE.Group();
  const karno = materialon("karno:" + f.col,
    () => new THREE.MeshStandardMaterial({ color: f.col, roughness: 0o52/0o100, map: bulkaTeksajxon() }));
  const korbo = materialon("korbo",
    () => new THREE.MeshStandardMaterial({ color: 0xb89860, roughness: 0o63/0o100, map: korbaTeksajxon() }));
  // ⟨ La karno 📃 ⟩ — duonglobo, kiu SIDAS en la korbo: la interna fundo de la
  // korbo estas ĉe 0o2/0o100 ( 0o2 Peu ) kaj la bulka subo ĉe ~0o1 Peu, do la
  // bulko kuŝas EN la bovlo ( ĝia subo estas kaŝita de la interna fundo )
  // anstataŭ ŝvebi super ĝi. La centro 0o11/0o100 venas el la duon-alto de la
  // platigita sfero ( radiuso 0o13/0o100 × 0o55/0o100 ≈ 0o11/0o100 ).
  const bulko = new THREE.Mesh(new THREE.SphereGeometry(0o13/0o100, 0o20, 0o12), karno);
  bulko.scale.set(1, 0o55/0o100, 1); bulko.position.y = 0o11/0o100;
  bulko.castShadow = true;
  g.add(bulko);
  // ⟨ La faldoj 📃 ⟩ — ok TAPERITAJ loboj ĉirkaŭ la pinto, kiuj kliniĝas al la
  // centro. Anstataŭ unu kvin-flanka konuso ( kiu aspektis kiel ĉapelo ), la
  // supro nun estas vera plektita nodo — la rekoneblaĵo de vapor-kuirita bulko.
  const faldaj = 8;
  for ( let i = 0; i < faldaj; i++ ) {
    const ang = i / faldaj * Math.PI * 2;
    const foldo = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o50, 0o3/0o100, 0o4/0o100, 4), karno);
    foldo.position.set(Math.sin(ang) * 0o11/0o100, 0o10/0o100, Math.cos(ang) * 0o11/0o100);
    foldo.rotation.y = ang;
    foldo.rotateX(-0o3/0o10);        // kliniĝas al la centro de la supro
    foldo.castShadow = true;
    g.add(foldo);
  }
  const pinto = new THREE.Mesh(new THREE.SphereGeometry(0o3/0o100, 0o10, 8), karno);
  pinto.position.y = 0o16/0o100;
  g.add(pinto);
  // ⟨ La korbo 📃 ⟩ — malprofunda MALFERMITA bovlo ( ne fermita cilindro ), kun
  // interna fundo, rimo kaj oraj stangetoj. La malferma flanko estas la tuta
  // diferenco inter "plektita korbo" kaj "tabureto".
  // ⟨ La korbo kusxu sur la tablo 📃 ⟩ — la bovlo estas malfermita cilindro, do
  // ĝia plej malsupra rando estis je 0o1/0o100 super la grupo-origino: la korbo
  // ŝvebis 0o1 Peu super la tabulo ( mezurite per la limiga skatolo ). La tuta
  // korbo ( la bovlo, la interna fundo, la rimo kaj la stangetoj ) malsupreniĝas
  // per tiu sama kvanto, do ĝia rando tuŝas la tablon — sen kunebena faco ( la
  // bovlo ne havas fundan facon ), do neniu trembrilo.
  const korbaMalsuprenigxo = 0o1/0o100;
  const bovlo = new THREE.Mesh(new THREE.CylinderGeometry(0o17/0o100, 0o14/0o100, 0o6/0o100, 0o20, 1, true), korbo);
  bovlo.position.y = 0o4/0o100 - korbaMalsuprenigxo;
  bovlo.castShadow = true;
  g.add(bovlo);
  const fundo = new THREE.Mesh(new THREE.CircleGeometry(0o14/0o100, 0o20), korbo);
  fundo.rotation.x = -Math.PI / 2; fundo.position.y = 0o2/0o100 - korbaMalsuprenigxo;
  g.add(fundo);
  const rimo = new THREE.Mesh(new THREE.TorusGeometry(0o17/0o100, 0o1/0o100, 6, 0o20), korbo);
  rimo.rotation.x = Math.PI / 2; rimo.position.y = 0o7/0o100 - korbaMalsuprenigxo;
  rimo.castShadow = true;
  g.add(rimo);
  // Tri oraj stangetoj — vertikalaj stangoj SUR la korba flanko ( la sama ideo
  // kiel la oraj fostoj de la vendotablo ), je la radiuso de la korbo ĉe sia
  // meza alto, do ili kuŝas sur la plektaĵo anstataŭ en ĝia interno.
  const oro = materialon("oro",
    () => new THREE.MeshStandardMaterial({ color: 0xd8b068, metalness: 0o3/0o4, roughness: 0o3/0o10 }));
  for ( const ang of [ 0, Math.PI * 2 / 3, Math.PI * 4 / 3 ] ) {
    const stango = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o100, 0o1/0o100, 0o6/0o100, 6), oro);
    stango.position.set(Math.sin(ang) * 0o16/0o100, 0o4/0o100 - korbaMalsuprenigxo, Math.cos(ang) * 0o16/0o100);
    g.add(stango);
  }
  // ⟪ La varioj laŭ la priskribo 📃 ⟫ — ĉiu fok havas sian propran priskribon
  // ( "varma likena pano", "malvarma glazuro", "malhelaj pipraj mordoj" ), kaj
  // ĝis nun ĉiuj tri aspektis idente krom la koloro. Nun ĉiu ricevas tion, kion
  // ĝia teksto promesas:
  //   fok0 — LIKENA KROSTO ( palaj grizverdaj likenaj makuloj sur la pinto ) kaj
  //          faldo de pasto ( "faldo de vaporo" ).
  //   fok1 — GLAZURO ( travidebla menta kovrilo super la tuta pinto ) kaj menta
  //          foliaro supre.
  //   fok2 — PIPRAJ PUNKTOJ ( malhelaj grajnoj ) kaj dolĉa miela ringo super ili:
  //          la pipro mordas, la bulko respondas dolĉe.
  const hazardo = punktaSemo(f.key.charCodeAt(0) * 0o1000 + f.key.charCodeAt(3) * 0o10);
  const pintoY = 0o11/0o100;                       // la centro de la bulka sfero
  // ⟨ La surfaco, ne cilindro 📃 ⟩ — la ornamo devas SIDI sur la bulko. Antaŭe
  // ĉi tiu helpilo redonis fiksan radiuson ( 0o12/0o100 ) por ĉiu `levo`, tio
  // estas cilindran muron da ornamo: la grajnoj ĉe la rando ŝvebis en la aero
  // super la karno. Nun la radiuso venas el la sfera ekvacio — la punkto kuŝas
  // ĉiam sur la platigita duonglobo, je ĉiu `levo`.
  const bulkaRadiuso = 0o13/0o100, bulkaAlto = 0o55/0o100;
  const surPinto = ( ang: number, levo: number ): [ number, number, number ] => {
    const rilatumo = Math.min(1, Math.abs(levo) / (bulkaRadiuso * bulkaAlto));
    const r = bulkaRadiuso * Math.sqrt(1 - rilatumo * rilatumo);
    return [ Math.sin(ang) * r, pintoY + levo, Math.cos(ang) * r ];
  };
  if ( f.key === "fok0" ) {
    const likeno = materialon("likeno",
      () => new THREE.MeshStandardMaterial({ color: 0xb4c0a0, roughness: 0o7/0o10 }));
    // ⟨ La likenaj makuloj 📃 ⟩ — plataj, neregulaj skvamoj sur la pinto, kiel
    // likeno sur roko. Ses sufiĉas: pli ol tio kaj la bulko aspektas malsana.
    for ( let i = 0; i < 6; i++ ) {
      const ang = hazardo() * Math.PI * 2, levo = 0o1/0o100 + hazardo() * 0o6/0o100;
      const makulo = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o100 + hazardo() * 0o4/0o100, 0o10, 6), likeno);
      const [ sx, sy, sz ] = surPinto(ang, levo);
      makulo.position.set(sx, sy, sz);
      makulo.scale.set(1, 0o3/0o10, 0o7/0o10 + hazardo() * 0o5/0o10);
      makulo.rotation.y = hazardo() * Math.PI;
      g.add(makulo);
    }
    // La faldo — maldika tavolo de pasto kusxanta super la pinto.
    const faldo = new THREE.Mesh(new RoundedBoxGeometry(0o16/0o100, 0o1/0o100, 0o11/0o100, 2, 0o1/0o200), karno);
    faldo.position.set(0, pintoY + 0o13/0o100, 0);
    faldo.rotation.set(0, 0o4/0o10, 0o1/0o20);
    g.add(faldo);
  } else if ( f.key === "fok1" ) {
    const glazuro = materialon("glazuro",
      () => new THREE.MeshStandardMaterial({
        color: 0xa8d8b0, roughness: 0o3/0o10, transparent: true, opacity: 0o55/0o100,
      }));
    // ⟨ La glazuro 📃 ⟩ — travidebla menta kovrilo, iomete pli granda ol la
    // bulko, kiu fluas super ĝin.
    const kovrilo = new THREE.Mesh(new THREE.SphereGeometry(0o14/0o100, 0o20, 0o10, 0, Math.PI * 2, 0, 0o15/0o10), glazuro);
    kovrilo.scale.set(1, 0o62/0o100, 1);
    kovrilo.position.y = pintoY + 0o2/0o100;
    g.add(kovrilo);
    // La mentaj folioj supre.
    const mento = materialon("mento",
      () => new THREE.MeshStandardMaterial({ color: 0x507848, roughness: 0o6/0o10, side: THREE.DoubleSide }));
    const tigo = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o200, 0o1/0o200, 0o10/0o100, 5), mento);
    // ⟨ La tigo sidu sur la glazuro 📃 ⟩ — la glazura kovrilo pintas je ~0o16/0o100
    // super la pinto ( ĝia supro ), do la tigo baziĝas tie: la cilindro estas
    // centrita, do 0o10/0o100 mezuro metas ĝian subon ĝuste en la glazuron.
    tigo.position.set(0, pintoY + 0o10/0o100, 0);
    tigo.rotation.z = 0o5/0o10;
    g.add(tigo);
    for ( let i = 0; i < 3; i++ ) {
      const folio = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o50, 8, 6), mento);
      folio.scale.set(0o6/0o10, 0o3/0o10, 1);
      folio.position.set(i * 0o1/0o100 - 0o1/0o50, pintoY + 0o12/0o100 + i * 0o1/0o100, 0);
      folio.rotation.z = 0o15/0o10 - i * 0o1/0o10;
      g.add(folio);
    }
  } else if ( f.key === "fok2" ) {
    const pipro = materialon("pipro",
      () => new THREE.MeshStandardMaterial({ color: 0x2a2018, roughness: 0o5/0o10 }));
    // ⟨ La pipraj grajnoj 📃 ⟩ — etaj malhelaj punktoj, disĵetitaj sur la tuta
    // supraĵo ( ne nur la pinto, ĉar la pipro estas muelita super la tuta bulko ).
    for ( let i = 0; i < 0o50; i++ ) {
      const ang = hazardo() * Math.PI * 2, levo = 0o1/0o100 + hazardo() * 0o6/0o100;
      const grajno = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o200 + hazardo() * 0o1/0o100, 6, 4), pipro);
      const [ sx, sy, sz ] = surPinto(ang, levo);
      grajno.position.set(sx, sy, sz);
      g.add(grajno);
    }
    // La dolĉa respondo — maldika miela ringo, kiu ĉirkaŭvolvas la kronon. La
    // ringo kuŝas sur la karno je la alto, kie la duonglobo mem havas tiun
    // radiuson ( vidu `surPinto` ), do ĝi duone enprofundiĝas kiel vera bendo
    // anstataŭ ŝvebi super la pinto.
    const mielo = materialon("mielo",
      () => new THREE.MeshStandardMaterial({ color: 0xd8a040, roughness: 0o2/0o10, metalness: 0o1/0o10 }));
    const ringo = new THREE.Mesh(new THREE.TorusGeometry(0o7/0o100, 0o1/0o100, 6, 0o20).rotateX(Math.PI / 2), mielo);
    ringo.position.set(0, pintoY + 0o6/0o100, 0);
    g.add(ringo);
  }
  // ⟨ La kunfando 📃 ⟩ — la dek-kvin partoj fariĝas tri-kvin meshoj.
  kunfandiPartojn(g);
  return g;
}

// glassMesh — Vitro da tlatiiwa: lathe-profila glaso kun DIKO ( la interna muro
// videblas tra la trinkaĵo ), likvaĵo kun surfaca disko kaj menisko, korko-subteno,
// kondensaj gutoj, citrona tranĉaĵo sur la rimo kaj menta folio.
//     @param f ( MangxajxDatumo ) - La specio ( la trinkaĵa koloro ).
//     @returns g ( THREE.Group ) - La glaso; la grupo-origino estas la subteno.
export function glassMesh(f: MangxajxDatumo): THREE.Group {
  const g = new THREE.Group();
  const subteno = 0o1/0o100;               // 0o1 Peu da korko sub la glaso
  const vitro = materialon("vitro", () => new THREE.MeshStandardMaterial({
    color: 0xe0f0e8, transparent: true, opacity: 0o26 / 0o100, roughness: 0o6/0o100,
    depthWrite: false, side: THREE.DoubleSide, map: vitraTeksajxon(),
  }));
  // ⟨ La glasa profilo 📃 ⟩ — FERMITA lathe: ekstera fundo, ekstera muro, rimo,
  // interna muro, interna fundo. Kun fermita profilo kaj DoubleSide oni vidas
  // la malantaŭan muron tra la trinkaĵo, kaj la glaso havas videblan dikon
  // ( la antaŭa versio estis malferma cilindro — plata folio de vitro ).
  const profilo = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0o6/0o100, 0),                 // la ekstera fundo
    new THREE.Vector2(0o6/0o100, 0o1/0o100),
    new THREE.Vector2(0o5/0o100, 0o10/0o100),        // la talio
    new THREE.Vector2(0o6/0o100, 0o14/0o100),
    new THREE.Vector2(0o7/0o100, 0o16/0o100),        // la rando ( ekstere )
    new THREE.Vector2(0o5/0o100, 0o15/0o100),        // la rando ( interne )
    new THREE.Vector2(0o5/0o100, 0o1/0o100),         // la interna muro
    new THREE.Vector2(0, 0o1/0o100),                 // la interna fundo
  ];
  const glaso = new THREE.Mesh(new THREE.LatheGeometry(profilo, 0o24), vitro);
  glaso.position.y = subteno;
  g.add(glaso);
  // ⟨ La trinkaĵo 📃 ⟩ — cilindro plus SURFACA disko kaj meniska ringo; sen la
  // disko la likvaĵo aspektis kiel solida stango tra la glaso.
  const likvaMat = materialon("likvo:" + f.col, () => new THREE.MeshStandardMaterial({ color: f.col, transparent: true, opacity: 0o64 / 0o100, roughness: 0o5/0o20, depthWrite: false }));
  const likvo = new THREE.Mesh(new THREE.CylinderGeometry(0o45/0o1000, 0o45/0o1000, 0o10/0o100, 0o20), likvaMat);
  likvo.position.y = subteno + 0o5/0o100;
  g.add(likvo);
  const surfaco = new THREE.Mesh(new THREE.CircleGeometry(0o45/0o1000, 0o20), materialon("surfaco:" + f.col,
    () => new THREE.MeshStandardMaterial({ color: f.col, roughness: 0o2/0o10, transparent: true, opacity: 0o63/0o100 })));
  // ⟨ La surfaco staru sur la likvaĵo 📃 ⟩ — la disko estis je 0o11/0o100 dum la
  // likva cilindro finiĝas je 0o5/0o100 + 0o10/0o200 ( 0o11/0o100 ), do la
  // videbla "surfaco" ŝvebis 0o2 Peu super la trinkaĵo kaj la likvaĵo mem
  // aspektis kiel aparta stango sub ĝi. Nun ĝi sidas ĝuste sur la cilindra supro;
  // la eta levo ( 0o1/0o200 ) evitas la kunebenan trembrilon kun tiu supra faco.
  surfaco.rotation.x = -Math.PI / 2; surfaco.position.y = subteno + 0o5/0o100 + 0o10/0o200 + 0o1/0o200;
  g.add(surfaco);
  const menisko = new THREE.Mesh(new THREE.TorusGeometry(0o44/0o1000, 0o1/0o100, 5, 0o20), materialon("menisko",
    () => new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0o2/0o10, transparent: true, opacity: 0o45/0o100 })));
  menisko.rotation.x = Math.PI / 2; menisko.position.y = subteno + 0o5/0o100 + 0o10/0o200 + 0o1/0o200;
  g.add(menisko);
  // La citrona tranĉaĵo sur la rimo ( duondisko ), klinita en la glason. La
  // glacia trinkaĵo ricevas glacion ANSTATAŬ citrono ( betulsuka glacio ne
  // portas limonon ).
  if ( f.key !== "tla2" ) {
    const citrono = new THREE.Mesh(new THREE.CylinderGeometry(0o5/0o100, 0o5/0o100, 0o1/0o40, 0o12, 1, false, 0, Math.PI), materialon("citrono",
      () => new THREE.MeshStandardMaterial({ color: 0xe0c060, roughness: 0o45/0o100, map: citrusaTeksajxon(), side: THREE.DoubleSide })));
    citrono.position.set(0o2/0o100, subteno + 0o15/0o100, -0o4/0o100);
    citrono.rotation.set(0o14/0o10, 0, 0o1/0o10);
    g.add(citrono);
  }
  // La menta folio — tigo kaj tri folioj. ⟨ Kie ĝi sidas 📃 ⟩ — la klasika kaj
  // la glacia tenas la menton sur la rimo; la miela trinkaĵo tenas ĝin SUBE (
  // "mento sube" ), duonmergita apud la miela tavolo. La glacia ricevas neniun
  // menton — ĝia priskribo estas nur betulsuka frosto.
  if ( f.key !== "tla2" ) {
    const mento = materialon("mento",
      () => new THREE.MeshStandardMaterial({ color: 0x507848, roughness: 0o6/0o10, side: THREE.DoubleSide }));
    const mentaBazo = f.key === "tla1" ? subteno + 0o6/0o100 : subteno + 0o14/0o100;
    const tigo = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o200, 0o1/0o200, 0o12/0o100, 5), mento);
    tigo.position.set(0o4/0o100, mentaBazo, 0o2/0o100);
    tigo.rotation.z = 0o4/0o10;
    g.add(tigo);
    for ( let i = 0; i < 3; i++ ) {
      const folio = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o50, 8, 6), mento);
      folio.scale.set(0o6/0o10, 0o3/0o10, 1);
      folio.position.set(0o4/0o100 + i * 0o1/0o100 - 0o1/0o50, mentaBazo + 0o2/0o100 + i * 0o1/0o100, 0o2/0o100);
      folio.rotation.z = 0o15/0o10 - i * 0o1/0o10;
      g.add(folio);
    }
  }
  // ⟪ La varioj laŭ la priskribo 📃 ⟫ — tri trinkaĵoj kun tri priskriboj:
  //   tla0 "vinagro, lakto, mento, FAJRERO" — etaj brilaj bobeloj en la likvaĵo.
  //   tla1 "SUKCENO super acido, mento sube" — dika miela tavolo ĉe la fundo kaj
  //        mielguto sur la rimo.
  //   tla2 "betulsuka FROSTO" — tri glacipecoj kaj frosta kolumo sur la rimo.
  const hazardo = punktaSemo(f.key.charCodeAt(0) * 0o1000 + f.key.charCodeAt(3) * 0o100 + 7);
  if ( f.key === "tla0" ) {
    const fajrero = materialon("fajrero",
      () => new THREE.MeshStandardMaterial({
        color: 0xf8ffff, roughness: 0o1/0o10, metalness: 0o3/0o10, emissive: 0x88a8a0, emissiveIntensity: 0o3/0o10,
      }));
    for ( let i = 0; i < 0o12; i++ ) {
      const ang = hazardo() * Math.PI * 2, r = hazardo() * 0o5/0o100;
      const bobelo = new THREE.Mesh(new THREE.SphereGeometry(0o2/0o100 + hazardo() * 0o2/0o100, 6, 5), fajrero);
      bobelo.position.set(Math.sin(ang) * r, subteno + 0o3/0o100 + hazardo() * 0o6/0o100, Math.cos(ang) * r);
      g.add(bobelo);
    }
  } else if ( f.key === "tla1" ) {
    const mielo = materialon("mielo",
      () => new THREE.MeshStandardMaterial({ color: 0xd8a040, roughness: 0o2/0o10, metalness: 0o1/0o10 }));
    // ⟨ La miela tavolo — SUR la acido 📃 ⟩ — la priskribo diras "sukceno super
    // acido", do la mielo estas tavolo supre, ne ĉe la fundo. La likva surfaco
    // estas ĉe subteno + 0o11/0o100; la miela tavolo ( 0o4/0o100 dika ) centriĝas
    // duon-dike sub ĝi, do ĝia supro kuŝas ĝuste ĉe la surfaco kaj la mento
    // restas sub ĝi ( "mento sube" ).
    const tavolo = new THREE.Mesh(new THREE.CylinderGeometry(0o44/0o1000, 0o43/0o1000, 0o4/0o100, 0o20), mielo);
    tavolo.position.y = subteno + 0o7/0o100;
    g.add(tavolo);
    // La mielguto — malgranda guto sur la rimo, kiu fluas malsupren.
    const guto = new THREE.Mesh(new THREE.SphereGeometry(0o2/0o100, 8, 6), mielo);
    guto.scale.set(1, 0o16/0o10, 1);
    guto.position.set(-0o7/0o100, subteno + 0o16/0o100, 0o3/0o100);
    g.add(guto);
  } else if ( f.key === "tla2" ) {
    const glacio = materialon("glacio",
      () => new THREE.MeshStandardMaterial({
        color: 0xd8eef2, roughness: 0o1/0o10, transparent: true, opacity: 0o6/0o10, depthWrite: false,
      }));
    // ⟨ La glacipecoj 📃 ⟩ — tri kuboj, ĉiu klinita alie, duonmergitaj en la
    // trinkaĵo ( la priskribo promesas froston, ne unu solan glacion ).
    for ( let i = 0; i < 3; i++ ) {
      const ang = i / 3 * Math.PI * 2 + hazardo();
      const peco = new THREE.Mesh(new RoundedBoxGeometry(0o5/0o100, 0o5/0o100, 0o5/0o100, 2, 0o1/0o100), glacio);
      peco.position.set(Math.sin(ang) * 0o3/0o100, subteno + 0o6/0o100 + hazardo() * 0o5/0o100, Math.cos(ang) * 0o3/0o100);
      peco.rotation.set(hazardo() * 0o4/0o10, ang, hazardo() * 0o4/0o10);
      g.add(peco);
    }
    // La frosta kolumo — pala ringo ĉirkaŭ la rimo, kie la glacio kovras la vitron.
    const frosto = materialon("frosto",
      () => new THREE.MeshStandardMaterial({ color: 0xe8f4f8, roughness: 0o2/0o10, transparent: true, opacity: 0o5/0o10, depthWrite: false }));
    const kolumo = new THREE.Mesh(new THREE.TorusGeometry(0o6/0o100, 0o3/0o100, 8, 0o20).rotateX(Math.PI / 2), frosto);
    kolumo.position.y = subteno + 0o12/0o100;
    g.add(kolumo);
  }
  // La korko-subteno — malhela ligna disko, kiu tenas la glason kaj ligas ĝin
  // al la tablo.
  const korko = new THREE.Mesh(new THREE.CylinderGeometry(0o7/0o100, 0o7/0o100, 0o1/0o100, 0o20), materialon("korko",
    () => new THREE.MeshStandardMaterial({ color: 0x4a3524, roughness: 0o7/0o10 })));
  korko.position.y = 0o1/0o200;
  g.add(korko);
  // ⟨ La kunfando 📃 ⟩ — la dek partoj fariĝas kvin-ses meshoj.
  kunfandiPartojn(g);
  return g;
}

export interface MangxajxItemo {
  mesh: THREE.Group;
  key: string;
  f: MangxajxDatumo;
  pos: THREE.Vector3;
  dead: boolean;
  // Nuna malkreska animacio ( konsumi ) — por nuligi gxin, kiam la interno
  // estas kasxita kaj reuzata ( la animacio ne plu apartenu al la reaperanta
  // mangxajxo ).
  malkreska?: number | null;
}
// kreiMangxajxojn — Metu mangxajxojn sur la tablojn ( aux laux la malnova aera arangxo se ne estas tabloj ).
//     @param tabloj ( { x, z }[] ) - Tablo-centraj pozicioj; la mangxajxoj sidas sur la supro ( y ≈ 0o7/0o20 ).
export function kreiMangxajxojn(g: THREE.Group, cx: number, cz: number, tabloj: { x: number; z: number }[] = []): MangxajxItemo[] {
  const items: MangxajxItemo[] = [];
  const metaDe = ( k: string ): MangxajxDatumo => FOKS.find(x => x.key === k) || TLAS.find(x => x.key === k)!;
  const aldoni = ( k: string, x: number, y: number, z: number ) => {
    const meta = metaDe(k);
    const m = k.startsWith("fok") ? bunMesh(meta) : glassMesh(meta);
    m.position.set(x, y, z);
    g.add(m);
    items.push({ mesh: m, key: k, f: meta, pos: new THREE.Vector3(x, y, z), dead: false });
  };
  if ( tabloj.length > 0 ) {
    // Mangxajxoj sidas sur la tabloj, kun malgrandaj ofsetoj por aspekti arangxitaj
    const suproY = TABLA_SUPRO;
    const mangxoj = [ "fok0", "tla0", "fok1", "tla1", "fok2", "tla2" ];
    tabloj.forEach(( t, i ) => {
      aldoni(mangxoj[( i * 2 ) % mangxoj.length], t.x - 0o1/0o10, suproY, t.z);
      aldoni(mangxoj[( i * 2 + 1 ) % mangxoj.length], t.x + 0o1/0o10, suproY, t.z);
    });
  } else {
    const foods: { p: [ number, number, number ]; k: string }[] = [
      { p: [ cx + 0o15/0o40, 0o104/0o100, cz - 0o25/0o10 ], k: "fok0" }, { p: [ cx + 0o11/0o10, 0o104/0o100, cz - 0o25/0o10 ], k: "fok2" },
      { p: [ cx + 0o17/0o10, 0o104/0o100, cz - 0o25/0o10 ], k: "tla2" }, { p: [ cx + 0o35/0o10, 0o63/0o100, cz + 0o23/0o10 ], k: "fok1" }, { p: [ cx + 0o41/0o10, 0o63/0o100, cz + 0o23/0o10 ], k: "tla0" },
    ];
    for ( const f of foods ) {
      const meta = metaDe(f.k);
      const m = f.k.startsWith("fok") ? bunMesh(meta) : glassMesh(meta);
      m.position.set(f.p[0], f.p[1], f.p[2]);
      g.add(m);
      items.push({ mesh: m, key: f.k, f: meta, pos: new THREE.Vector3(f.p[0], f.p[1], f.p[2]), dead: false });
    }
  }
  return items;
}
// kreiPussxlefojnBerojn — Metu klastrojn da travideblaj manĝeblaj beroj EN la
// ŝelan tason de la Pussxlefoj ( la konuso de la unua folia tavolo ). Ne ĉiu
// planto portas berojn — nur proksimume duono — kaj ĉiu klastro estas unu
// manĝaĵobjekto, kiun la ludanto povas kolekti ( manĝi ) per E, same kiel la
// manĝaĵoj sur la tabloj.
//     @param g ( THREE.Object3D ) - La sceno ( aŭ grupo ) por aldoni la berojn.
//     @param plantoj ( { x, h, z, s, plantAlto? }[] ) - La metitaj Pussxlefoj
//              ( ArboMetado-formo ). plantAlto estas la REALA plant-alto, kiun
//              konstruiPussxlefojn skribas reen; sen gxi oni uzas la mezumon.
//     @returns items ( MangxajxItemo[] ) - La ber-klastroj.
export function kreiPussxlefojnBerojn(g: THREE.Object3D, plantoj: { x: number; h: number; z: number; s: number; plantAlto?: number }[]): MangxajxItemo[] {
  const items: MangxajxItemo[] = [];
  if ( plantoj.length === 0 ) return items;
  const f = PUSSXLEFO_BEROJ[0];
  const beroGeometrio = new THREE.SphereGeometry(1, 0o10, 0o10);
  const kernoGeometrio = new THREE.SphereGeometry(1, 8, 6);
  // Travidebla ŝelo kun hela kerno — la beroj brilas kiel frostaj gutoj.
  const beroMaterialo = new THREE.MeshStandardMaterial({
    color: f.col, transparent: true, opacity: 0o45 / 0o100, roughness: 0o15/0o100, depthWrite: false,
  });
  const kernoMaterialo = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0o35/0o100 });
  // ⟨ La trunkopinta profilo 📃 ⟩ — la sama profilo kiel en konstruiPussxlefojn
  // ( vegetajxo.ts ), ĉar la ŝela taso sidas sur la trunko kaj oni bezonas la
  // samajn mezurojn por trovi ĝian internon.
  const trunkopintaProfilon = ( t: number ): number => {
    if ( t <= 0.88 ) return 1;
    const u = Math.min(1, ( t - 0.88 ) / 0.12);
    return Math.sqrt(Math.max(0, 1 - u * u));
  };
  for ( const p of plantoj ) {
    // Proksimume 70% de la plantoj portas berojn ( 0o55/0o100 = 0.7 ).
    if ( Math.random() > 0o55/0o100 ) continue;
    const klastro = new THREE.Group();
    // ⟨ La taso 📃 ⟩ — la planto havas unu ŝelan tason ĉe sia unua folia
    // tavolo, kaj la beroj nun sidas EN tiu konuso anstataŭ flosi en la aero
    // ĉirkaŭ la maldika trunko. La mezuroj ripetas la formulojn de la konstruo
    // ( se la metado ne skribis plantAlto, ni uzas la mezumon 0o17/0o20 ).
    const plantAlto = p.plantAlto ?? ( 0o5/0o10 + p.s * 0o3/0o10 ) * 0o17/0o20;
    const unuaTavolaY = plantAlto * 0o3/0o10;
    const sxelaAlto = plantAlto * 0o2/0o10;
    const trunkoR = ( 0o5/0o40 - ( unuaTavolaY / plantAlto ) * 0o2/0o40 )
      * trunkopintaProfilon(unuaTavolaY / plantAlto);
    const ringaSkalo = Math.max(0o3/0o40, trunkoR / ( 0o13/0o40 ) * 0o11/0o10);
    // La fundo de la taso kaj la interna radiuso ĉe la fundo — la konuso
    // malfermiĝas supren, do la malsupro estas la plej mallarĝa.
    const tasoFundo = p.h + unuaTavolaY - sxelaAlto * 0o14/0o40;
    const internaR = ringaSkalo * 0o2/0o10;
    // Simetria ringo EN la taso — n beroj egale spacigitaj laŭ la angulo, ĉe
    // la sama radiuso kaj alto. La malgranda hazarda skalo tenas la klastrojn
    // diversaj inter si sen ke la beroj eliru el la taso.
    const n = 3 + ( ( Math.random() * 3 ) | 0 );
    const turno = Math.random() * Math.PI * 2;
    const skalo = 0o2/0o100 + Math.random() * 0o2/0o100;
    const dy = sxelaAlto * ( 0o2/0o10 + Math.random() * 0o3/0o10 );
    for ( let i = 0; i < n; i++ ) {
      const ang = turno + i / n * Math.PI * 2;
      const lokalo = new THREE.Vector3(Math.cos(ang) * internaR, dy, Math.sin(ang) * internaR);
      const bero = new THREE.Mesh(beroGeometrio, beroMaterialo);
      bero.position.copy(lokalo);
      bero.scale.setScalar(skalo);
      const kerno = new THREE.Mesh(kernoGeometrio, kernoMaterialo);
      kerno.position.copy(lokalo);
      kerno.scale.setScalar(skalo * 0o3/0o10);
      klastro.add(bero, kerno);
    }
    klastro.position.set(p.x, tasoFundo, p.z);
    g.add(klastro);
    items.push({ mesh: klastro, key: f.key, f, pos: new THREE.Vector3(p.x, tasoFundo, p.z), dead: false });
  }
  return items;
}

export function aldoniVaporon(g: THREE.Group, local: THREE.Vector3): { cloud: THREE.Points; basePos: THREE.Vector3 } {
  const n = 0o30, pos = new Float32Array(n * 3);
  for ( let i = 0; i < n; i++ ) pos.set([ ( Math.random() - 0o4/0o10 ) * 0o4/0o10, Math.random() * 0o23/0o20, ( Math.random() - 0o4/0o10 ) * 0o4/0o10 ], i * 3);
  const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xe8f0e8, size: 0o6/0o100, transparent: true, opacity: 0o26 / 0o100, depthWrite: false }));
  pts.position.copy(local);
  g.add(pts);
  return { cloud: pts, basePos: local.clone() };
}
