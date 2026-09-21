// Vidlimo — la bildiga distanco. La mondo estas granda, sed la nebulo
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
// piedoj ) kaj la grandajn sur la nebula ( pli ol 0o220 estus malŝparo, ĉar la
// nebulo jam tute kovras ilin ).
//
// ⟨ La mezuro malantaŭ 0o220 ( 144 ) 📃 ⟩ — la nebulo estas FogExp2 kaj ĝia
// faktoro estas 1 - exp( -( denso · z )² ). La MALPLEJ densa vetero estas la
// nebula ( 0o5/0o400 = 5/256 = 0.0195 ) kaj eĉ gxi jam estas 97.8% je 100
// unuoj, 99.8% je 128 kaj 99.96% je 144. La ceteraj veteroj estas pli densaj
// ( 0o3/0o200 = 3/128 = 0.0234 ). La tuta zono inter 144 kaj la malnova 0o400
// ( 256 ) estis do PRESKAŬ TUTE nevidebla — la arbaro, la subkreskaĵoj kaj la
// rokoj en ĝi estis tamen desegnataj ĉiukadre, kaj en la ĉefa pasumo kaj en la
// ombro-pasumo. La malnova 0o400 estis elektita laŭ la sento ( "la nebulo
// kovras ilin" ), ne laŭ la fakta denseco de la nebulo en la ludo.
//
// ⟨ Mezurite 📃 ⟩ — la sama panoramo ( la enkonduka orbita vido ) iris de 4.9
// fps / 202 ms / 2317 alvokoj / 81.5 M trianguloj al 23.8 fps / 42 ms / 1303
// alvokoj / 26.8 M trianguloj. Parto de tio venas de ĉi tiu limo kaj parto de
// la forigita transira pasumo ( vidu scena.ts ) — ambaŭ forigas laboron, kiun
// la ludanto neniam vidis.
const LIMO_FAKTORO = 0o100;        // 64
const MIN_LIMO = 0o100;            // 64
const MAKS_LIMO = 0o220;           // 144
// ⟨ La histerezo 📃 ⟩ — objekto kaŝiĝas ĉe la limo sed reaperas nur iom poste.
// Sen ĝi peco sur la limo lumigus kaj malŝaltiĝus ĉe ĉiu paŝo.
const LIMO_HISTEREZO = 0o11/0o10;  // 9/8

// Unu registrita objekto. La centro venas aŭ unufoje ( la statikaj pecoj ) aŭ
// ĉiukadre de la objekta pozicio ( la vivantoj — ili moviĝas tra la mondo ).
interface Vidlima {
  obj: THREE.Object3D;
  limo: number;        // la distanco kie la objekto kaŝiĝas
  limoPluso: number;   // la distanco kie la kaŝita objekto reaperas ( histerezo )
  radiuso: number;     // la propra radiuso de la objekto ( la limo mezuriĝas de ĝia rando )
  cx: number;
  cz: number;
  sekvi: boolean;      // ĉu la centro venas de obj.position ĉiukadre
  // ⟨ La ombra limo 📃 ⟩ — la distanco sub kiu la objekto RAJTAS kasti ombron
  // ( 0 = la ombro ne administriĝas ). Vidu la klarigon ĉe sekviVidlimon.
  ombraLimo: number;
  ombraj: THREE.Mesh[];   // la meshoj kiuj kastas ombron ( antaŭkalkulitaj )
  ombranta: boolean;      // ĉu ili nun kastas
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
// uzas la sferon de sia geometrio.
//     @param obj ( THREE.Object3D ) - La objekto.
//     @returns ( THREE.Sphere | null ) - La sfero, aŭ null se la objekto ne havas geometrion.
function sferoDe(obj: THREE.Object3D): THREE.Sphere | null {
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

// aldonu — La komuna registro — la limoj antaŭkalkuliĝas unufoje.
function aldonu(obj: THREE.Object3D, limo: number, radiuso: number,
  cx: number, cz: number, sekvi: boolean, ombraLimo = 0, ombraj: THREE.Mesh[] = []): void {
  registro.push({ obj, limo, limoPluso: limo * LIMO_HISTEREZO, radiuso, cx, cz, sekvi,
    ombraLimo, ombraj, ombranta: true });
}

// registriVidlimon — Registru senmovan objekton ( aŭ tavolon ) per ĝia limiga
// sfero. La centro kaj la radiuso legiĝas unufoje, ĉi tie — la objektoj kiujn
// ĉi tiu funkcio registras ne moviĝas poste.
//     @param obj ( THREE.Object3D ) - La objekto ( tipe instancigita tavolo ).
//     @param limo ( number ) - La distanco kie ĝi kaŝiĝu ( vidu limoDeGrandeco ).
export function registriVidlimon(obj: THREE.Object3D, limo: number): void {
  // Objekto jam kaŝita de alia sistemo restu kaŝita — la vidlimo ne revivigu ĝin.
  if (!obj.visible) return;
  const sfero = sferoDe(obj);
  if (sfero === null) return;
  obj.updateWorldMatrix(true, false);
  const matrico = obj.matrixWorld;
  SFERO_CENTRO.copy(sfero.center).applyMatrix4(matrico);
  aldonu(obj, limo, sfero.radius * matrico.getMaxScaleOnAxis(),
    SFERO_CENTRO.x, SFERO_CENTRO.z, false);
}

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
export function sekviVidlimon(obj: THREE.Object3D, limo: number, radiuso = 0o4,
  ombraLimo = 0): void {
  const ombraj: THREE.Mesh[] = [];
  if (ombraLimo > 0) {
    obj.traverse(o => {
      const m = o as THREE.Mesh;
      if (m.isMesh === true && m.castShadow) ombraj.push(m);
    });
  }
  aldonu(obj, limo, radiuso, obj.position.x, obj.position.z, true, ombraLimo, ombraj);
}

// gxisdatigiVidlimojn — La per-kadra ĝisdatigo. Voku ĝin unufoje po kadro,
// antaŭ bildilo.render, kun la vidpunkto ( la ludanto aŭ la orbita celo ).
//     @param x, z ( number ) - La mondaj koordinatoj de la vidpunkto.
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
    if (videbla !== obj.visible) obj.visible = videbla;
    // ⟨ La ombra limo 📃 ⟩ — nur la ŝanĝo tuŝas la meshojn; la komparo mem
    // estas unu multipliko por objekto po kadro.
    if (e.ombraj.length > 0) {
      const ombru = disto2 <= (e.ombraLimo + e.radiuso) * (e.ombraLimo + e.radiuso);
      if (ombru !== e.ombranta) {
        e.ombranta = ombru;
        for (let k = 0; k < e.ombraj.length; k++) e.ombraj[k].castShadow = ombru;
      }
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
    // La ombroj ankaŭ revenas — alie la mapa bakado ( kaj la unua kadro post
    // la reŝalto ) perdus la ombrojn de la vivantoj forigitaj ĝuste antaŭe.
    if (e.ombraj.length > 0 && !e.ombranta) {
      e.ombranta = true;
      for (let k = 0; k < e.ombraj.length; k++) e.ombraj[k].castShadow = true;
    }
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
    const tabelo = Math.max(celtabelo, amplekso / MAKS_CXELOJ);
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

    const limo = limoDeGrandeco(m.geometry.boundingSphere!.radius * maksSkalo);
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
