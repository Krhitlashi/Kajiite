// ≺⧼ Vidlimo 🔭 ⧽≻
// La bildiga distanco. La mondo estas granda, sed la nebulo
// ( FogExp2, denseco ~0o5/0o400 ) kaŝas preskaŭ ĉion pli malproksime ol ~0o200
// unuoj; la GPU tamen desegnas ĉiun objekton ĉiukadre, ĉu la nebulo kovras ĝin
// ĉu ne. Du iloj ĉi tie:
//
// ⟨ La spaca disdivido 📃 ⟩ — la grandaj instancigitaj tavoloj ( la arbaroj,
// la herbo, la filikoj, la rokoj, la subkreskaĵo ) kolektiĝas en UNU
// InstancedMesh kiu etendiĝas trans la tutan mondon. three.js taksas ĉiun
// objekton per sia propra limiga sfero, do tia tavolo havas sferon de la tuta
// mondo — la vidkampo neniam forigas ĝin kaj ĈIUJ ĝiaj miloj da instancoj
// trapasas la vertican shaderon ĉiukadre, ankaŭ en la ombra pasumo. La
// disdivido tranĉas ĉiun tian tavolon laŭ spaca krado en plurajn pecajn
// InstancedMesh-ojn ( la sama geometrio kaj materialo, do nenia plia memoro ),
// ĉiu kun sia propra limiga sfero. De tiam la vidkampo forigas la pecojn ekster
// la vido kaj la ombra fotilo forigas ĉion ekster sia skatolo — antaŭe ambaŭ
// desegnis la tutan mondon.
//
// ⟨ La distanca limo 📃 ⟩ — la vidkampo sola ne sufiĉas. Promenante en la urbo
// oni rigardas ankaŭ la arbaron antaŭen, kaj la malgrandaj detaloj ( herbotufo,
// musko, likeno ) pli ol 0o100 unuojn for estas malpli ol unu pikselo sub la
// nebulo — tamen ili kostas plenajn triangulojn kaj fragmentojn. Ĉiu peco
// registriĝas kun limo derivita de la FAKTA grandeco de la objekto ( limo = la
// geometria radiuso × la instanca skalo × 0o100, inter 0o100 kaj 0o400 ): la
// herbo malaperas je 0o100 ( 64 ) unuoj, la filikoj je ~0o140, la trunkoj kaj
// la rokoj restas ĝis 0o400 ( 256 ) — tio estas sub la nebulo, do la bildo ne
// ŝanĝiĝas. Ankaŭ la vivantoj ( NPC-oj, bestoj, petreloj, kanuoj ) registriĝas
// per sia propra pozicio ĉiukadre, kaj ilia per-kadra animacio preterlasas la
// kaŝitojn ( sperto.ts legas .visible ).
//
// La tuta sistemo estas malŝaltita dum la mapa bakado ( bakiMapon ) kaj dum la
// internoj ( kie la ekstera mondo estas kaŝita tute ) — vidu vidlimojnMalŝalti.
import * as THREE from "three";
import { NEBULA_DENSO_MIN, nebulVidebleco } from "./scena/paletroj.js";

// ⟪ Agordoj 📃 ⟫
// ⟨ La spaca krado 📃 ⟩ — la ĉela grandeco de la divido. 0o100 ( 64 ) unuoj
// estas proksimume la radiuso de la nebula videbleco, do peco pli malgranda ol
// tio estus forigita preskaŭ tuj post kiam ĝi aperas. La krado neniam havas pli
// ol MAKS_CXELOJ ĉelojn laŭ unu akso — sen tio tavolo disŝutita tra la tuta
// mondo ( radiuso ~0o600 ) donus tro multajn objektojn kaj la per-kadra
// trairado de la sceno multekostiĝus.
const CELA_TABELO = 0o100;        // 64 — la baza ĉela grandeco ( mondunuoj )
const MAKS_CXELOJ = 0o10;         // 8 — la maksimuma nombro da ĉeloj laŭ akso
const DIVIDA_MINIMUMO = 0o10;     // 8 — sub tiu nombro da instancoj ne indas dividi
const DIVIDA_FAKTORO = 0o3/0o2;   // 3/2 — dividu nur se la tavolo superas la ĉelon

// ⟨ La distanca limo 📃 ⟩ — la limo de objekto estas ĝia propra grandeco ×
// LIMO_FAKTORO, krampita inter MIN_LIMO kaj MAKS_LIMO. La krampo tenas la
// etajn detalojn sur videbla distanco ( malpli ol 0o100 kovrus la herbon ĉe la
// piedoj ) kaj la grandajn sur la nebul-videbleco ( pli estus malŝparo, ĉar la
// nebulo jam tute kovras ilin ).
//
// ⟨ La mezuro malantaŭ la maksimuma limo 📃 ⟩ — la nebulo estas FogExp2 kaj ĝia
// faktoro estas 1 - exp( -( denso · z )² ). La MALPLEJ densa paletra vetero estas
// la nebula ( 0o5/0o400 = 5/256 = 0.0195 ) kaj eĉ gxi jam estas 97.8% je 100
// unuoj, 99.8% je 128 kaj 99.9% je 0o207 ( 135 ). La ceteraj veteroj estas pli
// densaj ( 0o3/0o200 = 3/128 = 0.0234 ). La tuta zono inter 135 kaj la malnova
// 0o400 ( 256 ) estis do PRESKAŬ TUTE nevidebla — la arbaro, la subkreskaĵoj kaj
// la rokoj en ĝi estis tamen desegnataj ĉiukadre, kaj en la ĉefa pasumo kaj en la
// ombro-pasumo. La malnova 0o400 estis elektita laŭ la sento ( "la nebulo
// kovras ilin" ), ne laŭ la fakta denseco de la nebulo en la ludo.
//
// ⟨ Ne plu du nombroj por la sama afero 📃 ⟩ — la limo NE estas permane elektita
// nombro: gxi devenas de la paletraj nebulaj densoj mem ( paletroj.ts ), per la
// sama nebulVidebleco, kiun la ludo jam uzas por klarigi sian videblecon. Se oni
// maldensigas la paletran nebulon, la limo sekvas aŭtomate — antaŭe la du
// nombroj povis silente malkongruiĝi kaj la malproksimaj objektoj aperus kaj
// malaperus antaŭ la okuloj. ( La sama fonto nun provizas ankaŭ la komencan
// nebulan densecon de scena.ts. )
//
// ⟨ Mezurite 📃 ⟩ — la sama panoramo ( la enkonduka orbita vido ) iris de
// 0o34/0o100 He por kadro / 2317 alvokoj / 81.5 M trianguloj al 0o6/0o100 He por
// kadro / 1303 alvokoj / 26.8 M trianguloj. Parto de tio venas de ĉi tiu limo kaj
// parto de la forigita transira pasumo ( vidu scena.ts ) — ambaŭ forigas laboron,
// kiun la ludanto neniam vidis.
const LIMO_FAKTORO = 0o100;        // 64
const MIN_LIMO = 0o100;            // 64
// La maksimuma limo estas la nebul-videbleco de la plej klara paletra vetero.
const MAKS_LIMO = Math.round(nebulVidebleco(NEBULA_DENSO_MIN));   // 135
// ⟨ La histerezo 📃 ⟩ — objekto kaŝiĝas ĉe la limo sed reaperas nur iom poste.
// Sen ĝi peco sur la limo lumigus kaj malŝaltiĝus ĉe ĉiu paŝo.
const LIMO_HISTEREZO = 0o11/0o10;  // 9/8

// Unu registrita objekto. La centro venas aŭ unufoje ( la statikaj pecoj ) aŭ
// ĉiukadre de la objekta pozicio ( la vivantoj — ili moviĝas tra la mondo ).
interface Vidlima {
  obj: THREE.Object3D;
  gepatro: THREE.Object3D | null;   // la gepatro, por re-aldono post forpreno
  limo: number;        // la distanco kie la objekto kaŝiĝas
  limoPluso: number;   // la distanco kie la kaŝita objekto reaperas ( histerezo )
  radiuso: number;     // la propra radiuso de la objekto ( la limo mezuriĝas de ĝia rando )
  cx: number;
  cz: number;
  sekvi: boolean;      // ĉu la centro venas de obj.position ĉiukadre
  // La ALDONAJ limoj ( la ombro, la detaloj ) — vidu SubLimo sube.
  subLimoj: SubLimo[];
}

const registro: Vidlima[] = [];
// La turnilo de la tuta sistemo. Malŝaltita la registro lasas ĉiun objekton
// videbla — la mapa bakado bezonas la TUTAN mondon, ĉu la ludanto proksimas ĉu ne.
let aktiva = true;
// Ĉu spacigiInstancojn jam kuris — dua voko estus eraro ( la tavoloj jam
// dividiĝis, do reste ne estas kion dividi ).
let spacigita = false;

// La reuzataj tempaj objektoj de la registrado — neniu ĉiukadra asigno.
const SFERO_CENTRO = new THREE.Vector3();

// limoDeGrandeco — La bildiga limo por objekto de donita mondgrandeco.
//     @param grandeco ( number ) - La radiuso de la objekto en mondunuoj
//         ( geometria radiuso × instanca skalo ).
//     @returns ( number ) - La limo, inter MIN_LIMO kaj MAKS_LIMO.
function limoDeGrandeco(grandeco: number): number {
  return Math.min(MAKS_LIMO, Math.max(MIN_LIMO, grandeco * LIMO_FAKTORO));
}

// sferoDe — La limiga sfero de la objekto en ĝia propra spaco. Instancigita
// tavolo havas sian propran sferon ( la unio de ĉiuj instancoj ); la ceteraj
// uzas la sferon de sia geometrio. La konvencio vivas ĉi tie, ĉe la vidlimo ( la
// sola vera leganto de gxi ) — la diagnoza surmetaĵo ( statistiko.ts ) legas la
// saman funkcion anstataŭ ripeti la kalkulon, do ĝiaj nombroj kongruas kun la
// vidkampo de la bildilo.
//     @param obj ( THREE.Object3D ) - La objekto.
//     @returns ( THREE.Sphere | null ) - La sfero, aŭ null se la objekto ne havas geometrion.
export function sferoDe(obj: THREE.Object3D): THREE.Sphere | null {
  const instancigita = obj as THREE.InstancedMesh;
  if (instancigita.isInstancedMesh) {
    if (instancigita.boundingSphere === null) instancigita.computeBoundingSphere();
    return instancigita.boundingSphere;
  }
  const geometria = obj as THREE.Mesh;
  if (geometria.geometry === undefined) return null;
  if (geometria.geometry.boundingSphere === null) geometria.geometry.computeBoundingSphere();
  return geometria.geometry.boundingSphere;
}

// SubLimo — unu ALDONA limo de la objekto ( la ombra limo, la detal-limo ).
// ⟨ Kial unu tipo 📃 ⟩ — ĉiuj aldonaj limoj havas la saman formon: "kiam la
// disto de la objekto subas tiun limon, skribu tiun staton sur tiujn meshojn".
// Antaŭe la ombro kaj la detaloj estis apartaj paroj de kampoj ( ombraLimo +
// ombraj + ombranta, detalaLimo + detala + detalanta ) kaj la per-kadra komparo
// kaj la restarigo duobliĝis por ĉiu. Nun unu listo: aldonu trian limon ( ekz.
// la ombron de la malantaŭa flanko aŭ la konveksecon de io ) kostas neniom da
// nova per-kadra kodo, nur unu push.
//     eco    — kion la stato skribas: "ombro" ( castShadow ) aŭ "videbleco".
//     limo   — la distanco sub kiu la meshoj portas la staton ( kun radiuso ).
//     meshoj — la administrataj meshoj ( antaŭkalkulitaj).
//     aktiva — ĉu la meshoj nun portas la ŝaltitan staton.
interface SubLimo {
  eco: "ombro" | "videbleco";
  limo: number;
  meshoj: THREE.Mesh[];
  aktiva: boolean;
}

// aplikiSubLimon — Skribu la staton de unu aldon-limo sur ĝiajn meshojn, sed
// NUR se la stato vere ŝanĝiĝis — la komparo estas unu bulea komparo po kadro,
// la meshoj tuŝiĝas nur ĉe la transiro.
function aplikiSubLimon(s: SubLimo, aktiva: boolean): void {
  if (aktiva === s.aktiva) return;
  s.aktiva = aktiva;
  if (s.eco === "ombro") for (let i = 0; i < s.meshoj.length; i++) s.meshoj[i].castShadow = aktiva;
  else for (let i = 0; i < s.meshoj.length; i++) s.meshoj[i].visible = aktiva;
}

// radiusoDe — La efika radiuso de objekto en mondunuoj ( la limiga sfero de la
// geometrio aŭ de la instancoj multiplikita per la mondo-skalo ). La sama mezuro
// servas la registradon, la kunigitajn meshojn kaj la ordon de la detaloj, do ĝi
// vivas unufoje ĉi tie. La alvokanto certigu, ke la mondmatrico jam ĝisdatiĝis.
//     @param obj ( THREE.Object3D ) - La objekto.
//     @param sfero ( THREE.Sphere | null = sferoDe(obj) , nedeviga ) - La jam
//         legita limiga sfero, por ne legi ĝin dufoje.
//     @returns ( number ) - La radiuso, aŭ 0 se la objekto ne havas geometrion.
function radiusoDe(obj: THREE.Object3D, sfero: THREE.Sphere | null = sferoDe(obj)): number {
  return sfero === null ? 0 : sfero.radius * obj.matrixWorld.getMaxScaleOnAxis();
}

// aldonu — La komuna registro — la limoj antaŭkalkuliĝas unufoje.
function aldonu(obj: THREE.Object3D, limo: number, radiuso: number,
  cx: number, cz: number, sekvi: boolean, subLimoj: SubLimo[] = []): void {
  // ⟨ La senmovaj objektoj frostas 📃 ⟩ — la objektoj registritaj per
  // registriVidlimon ne moviĝas ( tial la centro legiĝas unufoje ). three.js
  // tamen rekalkulus ilian mondmatricon ĉiukadre, ĉar la scenejo mem devigas la
  // tutan grafeon ( vidu la klarigon pri la forpreno sube ). La flago
  // matrixWorldAutoUpdate malŝaltas tiun laboron — la matrico restas tiu, kiu
  // validis ĉe la registrado. La VIVANTOJ ( la NPC-oj, la bestoj, la kanuoj,
  // la petreloj ) moviĝas, do ilia flago restas ŝaltita.
  if (!sekvi) obj.matrixWorldAutoUpdate = false;
  registro.push({ obj, gepatro: obj.parent, limo, limoPluso: limo * LIMO_HISTEREZO, radiuso, cx, cz, sekvi,
    subLimoj });
}

// registriVidlimon — Registru senmovan objekton ( aŭ tavolon ) per ĝia limiga
// sfero. La centro kaj la radiuso legiĝas unufoje, ĉi tie — la objektoj kiujn
// ĉi tiu funkcio registras ne moviĝas poste.
//     @param obj ( THREE.Object3D ) - La objekto ( tipe instancigita tavolo ).
//     @param limo ( number ) - La distanco kie ĝi kaŝiĝu ( vidu limoDeGrandeco ).
export function registriVidlimon(obj: THREE.Object3D, limo: number): void {
  // Objekto jam kaŝita de alia sistemo restu kaŝita — la vidlimo ne revivigu ĝin.
  if (!obj.visible) return;
  obj.updateWorldMatrix(true, false);
  const sfero = sferoDe(obj);
  if (sfero === null) return;
  SFERO_CENTRO.copy(sfero.center).applyMatrix4(obj.matrixWorld);
  aldonu(obj, limo, radiusoDe(obj, sfero), SFERO_CENTRO.x, SFERO_CENTRO.z, false);
}

// ⟨ La detaloj de la figuroj 📃 ⟩ — la figuroj de la NPC-oj estas la plej
// multaj DESEGNAJ ALVOKOJ de la mondo: ĉiu figuro konsistas el ~35 meshoj
// ( ĉiu kun sia propra materialo, ĉar la vestoj, la haroj, la haŭto kaj la okuloj
// havas malsamajn kolorojn ), do dudeko da videblaj figuroj faras pli ol 600
// alvokojn. Nur la GRANDAJ partoj portas la silueton ( la korpo, la kapo, la
// kruroj, la brakoj, la robo ); la etaj ( la manoj, la palpebroj, la okuloj, la
// haraj faskoj ) estas detaloj, kiujn oni apenaŭ vidas pli ol 0o40 ( 32 )
// unuojn for — tie la figuro estas malpli ol 0o3/0o10 ( 30 ) pikselojn alta kaj
// la nebulo jam kovras duonon de ĝi. La vidlimo do tenas la KERNAJ_PARTOJ
// plej grandajn meshojn ĉiam, kaj la ceterajn nur proksime ( VIVANTA_DETALO ).
// ⟨ Mezurite 📃 ⟩ — ĉe la urba vidpunkto la alvokoj falis de 1057 al 510 kaj la
// bildila tempo ( bildilo.render ) de 14.6 al 12.1 ms.
const VIVANTA_DETALO = 0o44;   // 36 — la distanco de la etaj partoj
const KERNAJ_PARTOJ = 0o12;    // 10 — kiom da la plej grandaj partoj restas

// sekviVidlimon — Registru moviĝantan objekton ( NPC, besto, petrelo, kanuo ).
// La centro legiĝas ĉiukadre de la objekta pozicio, do la limo sekvas ĝin.
// La objekto DEVAS esti ido de la sceno mem ( aŭ de grupo sen transformo ),
// alie la loka pozicio ne estos monda.
// La du lastaj argumentoj administras la OMBRON de la objekto. La NPC-oj
// ( homoj.ts markas ĉiun parton castShadow ) estas la plej multaj ombro-kastantoj
// en la mondo — ĉirkaŭ 0o1000 objektoj en la ombra mapo. Pli malproksime ol
// 0o50 ( 40 ) unuoj la tero estas pli ol duone kovrita de la nebulo, do la ombro
// apenaŭ videblas — sed la ombra pasumo ankoraŭ desegnas la tutan figuron.
//     @param obj ( THREE.Object3D ) - La objekto.
//     @param limo ( number ) - La distanco kie ĝi kaŝiĝu.
//     @param radiuso ( number = 0o4 , nedeviga ) - La propra radiuso de la objekto.
//     @param ombraLimo ( number = 0 , nedeviga ) - La distanco sub kiu la objekto
//         kastas ombron ( 0 = ne administri ).
//     @param detalaLimo ( number = 0 , nedeviga ) - La distanco sub kiu la etaj
//         partoj desegniĝas ( 0 = ne administri ).
export function sekviVidlimon(obj: THREE.Object3D, limo: number, radiuso = 0o4,
  ombraLimo = 0, detalaLimo = 0): void {
  const subLimoj: SubLimo[] = [];
  // ⟨ La ombro 📃 ⟩ — la meshoj kiuj jam kastas ombron formas la ombran limon;
  // for de la figuro ili ne plu kastu ( la ombra pasumo lasas ilin ).
  if (ombraLimo > 0) {
    const ombraj: THREE.Mesh[] = [];
    obj.traverse(o => {
      const m = o as THREE.Mesh;
      if (m.isMesh === true && m.castShadow) ombraj.push(m);
    });
    if (ombraj.length > 0) subLimoj.push({ eco: "ombro", limo: ombraLimo, meshoj: ombraj, aktiva: true });
  }
  // ⟨ La etaj partoj 📃 ⟩ — la grando de ĉiu parto estas ĝia efika radiuso ( la
  // figuroj havas unuecan skalon ). La KERNAJ_PARTOJ plej grandaj restas ĉiam
  // videblaj; nur la ceteraj apartenas al la detal-limo.
  if (detalaLimo > 0) {
    obj.updateWorldMatrix(true, true);
    const partoj: { m: THREE.Mesh; r: number }[] = [];
    obj.traverse(o => {
      const m = o as THREE.Mesh;
      if (m.isMesh !== true) return;
      partoj.push({ m, r: radiusoDe(m) });
    });
    partoj.sort((a, b) => b.r - a.r);
    const detala: THREE.Mesh[] = [];
    for (let i = KERNAJ_PARTOJ; i < partoj.length; i++) detala.push(partoj[i].m);
    if (detala.length > 0) subLimoj.push({ eco: "videbleco", limo: detalaLimo, meshoj: detala, aktiva: true });
  }
  aldonu(obj, limo, radiuso, obj.position.x, obj.position.z, true, subLimoj);
}

// La du limoj de la vivantoj ( vidu la klarigon sube ).
const VIVANTA_LIMO = 0o200;
const VIVANTA_OMBRO = 0o50;

// registriKunigitajnMeshojn — La SENMOVAJ kunigitaj meshoj de la mondo ( la
// urbo, la konstruaĵoj, la metitaj objektoj — ĉiuj markitaj per la nomo
// "kunigita" de kunfandiMondajnMeshojn ).
//
// ⟨ Kial ili bezonas sian propran registradon 📃 ⟩ — spacigiInstancojn traktas
// nur la INSTANCIGITAJN tavolojn, kaj la vivantoj registriĝas aparte. La
// kunigitaj meshoj restis ekster la vidlimo: la vidkampo forigis la
// MALANTAŬajn, sed ĉio antaŭ la fotilo restis desegnata ĝis la fora ebeno
// ( 1400 unuoj ), kvankam la nebulo jam tute kovras ĉion trans ~0o207 ( 135 )
// unuoj. Ĝuste tiuj malproksimaj kunigoj estas la plej granda parto de la
// geometrio de la kadro — ili estis pura malŝparo.
//
// ⟨ La limo venas de la propra grandeco 📃 ⟩ — la sama limoDeGrandeco kiel ĉe
// la instancigitaj tavoloj: eta objekto ( grandeco 1–2 ) malaperas je 64, la
// grandaj restas ĝis MAKS_LIMO ( 135 ). Ĉar la kunigitaj meshoj estas malgrandaj spacaj
// ĉeloj ( meza ligila sfero ~12 unuoj ), la plej multaj ricevas la plenan
// nebulan limon.
//
// ⟨ La gardo pri la horizonto 📃 ⟩ — la TERENO, la ĉielo, la akvo kaj la
// montarringo NE rajtas malaperi. Ili estas vastaj ( ligila sfero pli granda
// ol la nebula videbleco ), do ĉiu mesho, kies radiuso superas la nebulan
// limon, restas SEN limo — neniam kaŝiĝas per la distanco. Nur la veraj
// detaloj ( pli malgrandaj ol la nebulo ) registriĝas.
//     @param radiko ( THREE.Object3D ) - La sceno ( aŭ ia radiko ) trairata.
//     @param nomo ( string = "kunigita" , nedeviga ) - La nomo de la kunigoj.
//     @returns ( number ) - Kiom da meshoj registriĝis.
export function registriKunigitajnMeshojn(radiko: THREE.Object3D, nomo = "kunigita"): number {
  const meshoj: THREE.Mesh[] = [];
  radiko.traverse(o => {
    const m = o as THREE.Mesh;
    if (m.isMesh === true && (m as THREE.InstancedMesh).isInstancedMesh !== true && o.name === nomo) meshoj.push(m);
  });
  let registritaj = 0;
  for (const m of meshoj) {
    m.updateWorldMatrix(true, false);
    if (sferoDe(m) === null) continue;
    const radiuso = radiusoDe(m);
    // La vastaj objektoj ( la tereno, la montoj ) restas ĉiam videblaj.
    if (radiuso >= MAKS_LIMO) continue;
    registriVidlimon(m, limoDeGrandeco(radiuso));
    registritaj++;
  }
  return registritaj;
}

// registriVivantojn — La vivantoj ( la NPC-oj, la kanuoj, la bestoj kaj la
// petreloj ) registriĝas ĉe la vidlimo per sia PROPRA pozicio ( ili moviĝas ), do
// ilia per-kadra animacio preterlasas la kaŝitojn.
//
// La vivanta limo — 0o200 ( 128 ) unuoj. Pli ol la nebula videbleco ( la figuroj
// restu videblaj kiam ili alproksimiĝas el la nebulo ), malpli ol la tuta mondo.
//
// ⟨ La ombra limo de la vivantoj ⟩ — 0o50 ( 40 ) unuoj. Ĉiu figuro konsistas el
// malmultaj meshoj ( la kapo, la vizaĝo, la du vestaj tavoloj, la kvar membroj,
// la manoj kaj la haroj — homoj.ts kunfandas ĉion, kio dividas materialon ) kaj
// markas ĈIUN el ili castShadow, do la NPC-oj estas la plej multaj objektoj de la
// ombra mapo ( ĉirkaŭ 0o1000 en la vido, pli ol la duono de ĉiuj ombro-kastantoj ).
// Pli malproksime ol 0o50 unuoj la tero estas jam pli ol duone kovrita de la
// nebulo, do la ombro de la figuro apenaŭ videblas — sed ĝi kostis plenan desegnan
// alvokon. La sama limo validas por la kanuoj ( malgranda ombro sur la akvo ).
export function registriVivantojn(opcioj: {
  npcoj: { group: THREE.Object3D }[];
  kanuoj: { group: THREE.Object3D }[];
  bestoj: { grupo: THREE.Object3D }[];
  petreloj: { grupo: THREE.Object3D }[];
}): void {
  for (const n of opcioj.npcoj) sekviVidlimon(n.group, VIVANTA_LIMO, 0o4, VIVANTA_OMBRO, VIVANTA_DETALO);
  for (const k of opcioj.kanuoj) sekviVidlimon(k.group, VIVANTA_LIMO, 0o4, VIVANTA_OMBRO, VIVANTA_DETALO);
  for (const b of opcioj.bestoj) sekviVidlimon(b.grupo, VIVANTA_LIMO);
  for (const p of opcioj.petreloj) sekviVidlimon(p.grupo, VIVANTA_LIMO);
}

// ⟪ La forpreno de la kaŝitoj 📃 ⟫
// La kaŝita objekto ne nur ne bildiĝas: three.js ankaŭ trairas gxin ĉiukadre.
// La buklo de la matrica ĝisdatigo ( updateMatrixWorld ) trairas la TUTAN
// scenon — ĉu videbla ĉu ne — ĉar la radiko ( la scenejo ) mem ricevas
// matrixWorldNeedsUpdate ĉiukadre kaj tiel devigas la infanojn. Mezurite: la
// matrica trairado de la sceno estas ~0o11 ( 9.6 ) ms el 0o44 ( 36 ) ms kadro,
// kaj la figuroj de la NPC-oj estas la plej granda parto de gxi ( 153 figuroj
// po ~35 meshoj, ĉirkaŭ 12 000 objektoj — pli ol duono de la mondo ).
//
// ⟨ Kial la videbleco ne sufiĉas 📃 ⟩ — du provoj ( matrixAutoUpdate = false,
// matrixWorldAutoUpdate = false ) NE helpis: kun la devigo ( force ) venanta el
// la radiko, three.js plu trairas kaj rekomputas. La sola efika rimedo estas
// FORPRENI la objekton el la grafeo ( removeFromParent ) — tiam gxi tute ne
// estas trairata — kaj re-aldoni gxin, kiam gxi revidiĝas. La gepatro
// konserviĝas en la registro, do la re-aldono estas unu voko.
function forprenu(obj: THREE.Object3D): void {
  if (obj.parent !== null) obj.removeFromParent();
}
function reAlDonu(obj: THREE.Object3D, gepatro: THREE.Object3D | null): void {
  if (obj.parent === null && gepatro !== null) gepatro.add(obj);
}

// gxisdatigiVidlimojn — La per-kadra ĝisdatigo. Voku ĝin unufoje po kadro,
// antaŭ bildilo.render, kun la FOTILO. La nebulo mezuriĝas de la okulo, do la
// distanca limo devas mezuriĝi de la sama punkto — en la orbito la ludanto kaj
// la celo povas sidi centojn da unuoj for de la fotilo, kaj tiam ĉio, kion la
// limo ankoraŭ tenas, estas jam tute nebula.
//     @param x, z ( number ) - La mondaj koordinatoj de la fotilo.
export function gxisdatigiVidlimojn(x: number, z: number): void {
  if (!aktiva) return;
  for (let i = 0; i < registro.length; i++) {
    const e = registro[i];
    const obj = e.obj;
    let cx = e.cx, cz = e.cz;
    if (e.sekvi) { cx = obj.position.x; cz = obj.position.z; }
    // Kaŝita objekto reaperas nur malantaŭ la histereza marĝeno.
    const limo = (obj.visible ? e.limoPluso : e.limo) + e.radiuso;
    const dx = cx - x, dz = cz - z;
    const disto2 = dx * dx + dz * dz;
    const videbla = disto2 <= limo * limo;
    if (videbla !== obj.visible) {
      obj.visible = videbla;
      // La moviĝantaj objektoj ( la figuroj kun dekoj da membroj ) ankaŭ
      // forpreniĝas el la grafeo — alie three.js trairus ilin ĉiukadre.
      if (e.sekvi) {
        if (videbla) reAlDonu(obj, e.gepatro);
        else forprenu(obj);
      }
    }
    // ⟨ La aldonaj limoj 📃 ⟩ — la ombro kaj la detaloj. La samo por ambaŭ: la
    // stato nur tuŝas la meshojn ĉe la transiro, la komparo mem estas unu
    // multipliko po objekto kaj limo po kadro.
    for (let k = 0; k < e.subLimoj.length; k++) {
      const s = e.subLimoj[k];
      const r = s.limo + e.radiuso;
      aplikiSubLimon(s, disto2 <= r * r);
    }
  }
}

// vidlimojnMalŝalti — Montru ĉion kaj haltigu la ĝisdatigon. La mapa bakado
// ( bakiMapon ) vokas ĉi tion, ĉar ĝi bezonas la TUTAN mondon; vidlimojnŜalti
// restarigas la normalan laboron. ( Dum la internoj la per-kadra ĝisdatigo
// simple ne vokiĝas — la ekstera mondo estas kaŝita tute tie. )
export function vidlimojnMalŝalti(): void {
  aktiva = false;
  for (let i = 0; i < registro.length; i++) {
    const e = registro[i];
    e.obj.visible = true;
    if (e.sekvi) reAlDonu(e.obj, e.gepatro);
    // La aldonaj limoj ankaŭ revenas — alie la mapa bakado ( kaj la unua kadro
    // post la reŝalto ) perdus la ombrojn kaj la detalojn de la vivantoj
    // forigitaj ĝuste antaŭe.
    for (let k = 0; k < e.subLimoj.length; k++) aplikiSubLimon(e.subLimoj[k], true);
  }
}

// vidlimojnŜalti — Reŝaltu la per-kadran ĝisdatigon post vidlimojnMalŝalti.
export function vidlimojnŜalti(): void {
  aktiva = true;
}

// vidlimaStatistiko — La stato de la registro, por la diagnozaj iloj.
//     @returns ( { eroj, videblaj, limoj } ) - La nombroj da registritaj
//         objektoj, da la nun videblaj, kaj la limoj uzitaj.
export function vidlimaStatistiko(): { eroj: number; videblaj: number; limoj: number[] } {
  let videblaj = 0;
  const limoj = new Set<number>();
  for (const e of registro) {
    if (e.obj.visible) videblaj++;
    limoj.add(e.limo);
  }
  return { eroj: registro.length, videblaj, limoj: [ ...limoj ].sort((a, b) => a - b) };
}

// ⟪ La spaca disdivido 📃 ⟫
// spacigiInstancojn — Disdividu la grandajn instancigitajn tavolojn de la
// sceno laŭ spaca krado kaj registru la pecojn ĉe la vidlimo. La ORIGINALAJ
// tavoloj malaperas ( iliaj GPU-bufroj liberiĝas per dispose — la geometrio kaj
// la materialo estas KOMUNAJ kaj restas ).
//
// Atentu — la instancigitaj tavoloj kun frustumCulled = false restas TUTAJ. Tiu
// flago signifas, ke la aŭtoro reskribas iliajn matricojn ĉiukadre per la
// instanca indekso ( la flamoj de la lampoj ); disdivido ŝanĝus la indeksojn.
//     @param radiko ( THREE.Object3D ) - La sceno ( aŭ ia radiko ) trairata.
//     @param celtabelo ( number = CELA_TABELO , nedeviga ) - La ĉela grandeco.
//     @returns ( { tavoloj, pecoj } ) - Kiom da tavoloj dividiĝis kaj kiom da pecoj naskiĝis.
export function spacigiInstancojn(radiko: THREE.Object3D,
  celtabelo = CELA_TABELO): { tavoloj: number; pecoj: number } {
  if (spacigita) return { tavoloj: 0, pecoj: 0 };
  spacigita = true;

  const tavoloj: THREE.InstancedMesh[] = [];
  radiko.traverse(o => {
    const instancigita = o as THREE.InstancedMesh;
    if (instancigita.isInstancedMesh && instancigita.frustumCulled !== false) tavoloj.push(instancigita);
  });
  radiko.updateMatrixWorld(true);

  let dividitaj = 0, pecoj = 0;
  const ujoj = new Map<number, number[]>();
  for (const m of tavoloj) {
    const nombro = m.count;
    if (nombro < DIVIDA_MINIMUMO || !m.visible) continue;
    if (m.boundingSphere === null) m.computeBoundingSphere();
    if (m.geometry.boundingSphere === null) m.geometry.computeBoundingSphere();
    const amplekso = m.boundingSphere!.radius * 2;
    // ⟨ La propra ĉela grandeco 📃 ⟩ — MAKS_CXELOJ tenas la nombron da pecoj
    // malgranda, sed ĝi ankaŭ malhelpas la distancan limon: la limo de peco
    // aldonigas la radiuson de la peco mem ( la objekto ne malaperu dum parto de
    // ĝi ankoraŭ estas videbla ), do peco de 0o100 ( 64 ) unuoj havas radiuson
    // ~0o100 kaj la limo de la tavolo efike duobliĝas. Tavolo povas do postuli
    // pli ETAN ĉelon, por ke la limo vere validu: kun pecoj de 0o50 ( 40 ) unuoj
    // la aldonita radiuso estas ~0o34 kaj la folikartoj vere malaperas ĉe sia limo.
    const propraCelo = m.userData.vidlimaCelo;
    const tabelo = typeof propraCelo === "number"
      ? propraCelo
      : Math.max(celtabelo, amplekso / MAKS_CXELOJ);
    // Tavolo pli malgranda ol la krado ne indas dividi — ĝi jam havas unu
    // limigan sferon malgrandan, do la vidkampo traktas ĝin kiel la ceterajn.
    if (amplekso <= tabelo * DIVIDA_FAKTORO) continue;

    // ⟨ La disĵeto 📃 ⟩ — ĉiu instanco en sian ĉelon. La matricoj legiĝas
    // rekte el la areo ( la pozicio estas la 13-15-aj elementoj de ĉiu 16-bloko,
    // kaj la longo de la unua kolono estas la skalo ). La maksimuma skalo donas
    // la realan grandecon de la objekto por la limo.
    const areo = m.instanceMatrix.array as Float32Array;
    ujoj.clear();
    let maksSkalo = 0;
    for (let i = 0; i < nombro; i++) {
      const o = i * 16;
      const skalo = Math.hypot(areo[o], areo[o + 1], areo[o + 2]);
      if (skalo > maksSkalo) maksSkalo = skalo;
      const ŝlosilo = Math.floor(areo[o + 12] / tabelo) * 0o100000 + Math.floor(areo[o + 14] / tabelo);
      let ujo = ujoj.get(ŝlosilo);
      if (ujo === undefined) ujoj.set(ŝlosilo, ujo = []);
      ujo.push(i);
    }
    const gepatra = m.parent;
    if (gepatra === null || ujoj.size < 2) continue;

    // ⟨ La propra limo de la tavolo 📃 ⟩ — tavolo povas postuli pli proksiman
    // limon ol tiu, kiun donas ĝia geometria grandeco. La FOLIKARTOJ de la
    // betuloj estas la ekzemplo: ili estas alpha-testataj kaj duflanke
    // desegnataj, do ili kostas multe pli ol sia grandeco sugestas — kaj ili
    // estas la plej granda unuopa peco de la kadro. La tavolo mem scias, ke ĝi
    // estas detalo ( userData.vidlimo ), kaj la vidlimo respektas ĝin.
    const propraLimo = m.userData.vidlimo;
    const limo = typeof propraLimo === "number"
      ? propraLimo
      : limoDeGrandeco(m.geometry.boundingSphere!.radius * maksSkalo);
    const koloroj = m.instanceColor;
    for (const indeksoj of ujoj.values()) {
      const peco = new THREE.InstancedMesh(m.geometry, m.material, indeksoj.length);
      const pecaAreo = peco.instanceMatrix.array as Float32Array;
      for (let k = 0; k < indeksoj.length; k++) {
        pecaAreo.set(areo.subarray(indeksoj[k] * 16, indeksoj[k] * 16 + 16), k * 16);
      }
      peco.count = indeksoj.length;
      peco.instanceMatrix.needsUpdate = true;
      if (koloroj !== null) {
        const n = koloroj.itemSize;
        const fontaAreo = koloroj.array as Float32Array;
        const pecaAreo2 = new Float32Array(indeksoj.length * n);
        for (let k = 0; k < indeksoj.length; k++) {
          pecaAreo2.set(fontaAreo.subarray(indeksoj[k] * n, indeksoj[k] * n + n), k * n);
        }
        const pecaKoloro = new THREE.InstancedBufferAttribute(pecaAreo2, n);
        pecaKoloro.needsUpdate = true;
        peco.instanceColor = pecaKoloro;
      }
      peco.castShadow = m.castShadow;
      peco.receiveShadow = m.receiveShadow;
      peco.renderOrder = m.renderOrder;
      peco.visible = m.visible;
      peco.name = m.name;
      peco.userData = m.userData;
      peco.layers.mask = m.layers.mask;
      peco.computeBoundingSphere();
      gepatra.add(peco);
      registriVidlimon(peco, limo);
      pecoj++;
    }
    gepatra.remove(m);
    m.dispose();
    dividitaj++;
  }
  return { tavoloj: dividitaj, pecoj };
}
