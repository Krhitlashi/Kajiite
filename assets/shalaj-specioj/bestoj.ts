// Besta modulo — ktenoforoj ( kombuloj ), glacifisoj kaj marlaraksxoj por la rivero
// Travideblaj, biolumineskaj ĝelatenaj bestoj kun ok irizaj kombovicoj,
// preskaŭ travideblaj fiŝoj kaj etaj longkruraj marbestoj.
//  · Beroe — longforma ovalo kun granda buŝo ĉe la supro.
//  · Mnemiopsis ( marmukso ) — pli ronda korpo kun kvar loboj ĉe la buŝo.
//  · Pleŭrobrakia ( margrozberujo ) — malgranda ronda korpo kun du longaj palpoj.
//  · Glacifiso ( Channichthyidae ) — travidebla fiŝo kun granda kapo, longa
//    malalta dua dorsa naĝilo, anala naĝilo kaj LARĜAJ ventumilformaj brustaj
//    naĝiloj; ĝi remas malrapide antaŭ la fundo per la brustaj naĝiloj kaj
//    ondigas la korpon per tri-segmenta ĉeno ( vidu konstruiGlacifisanMalneton ).
//  · Marlaraksxo ( Pycnogonida ) — eta korpo kun ok longegaj kruroj, marŝanta
//    sur la riverfundo.
// Ili drivas laŭ la riverfluo kaj naĝas per pulsoj ( vidu gxisdatigiBestojn ).
//
// La specoj estas konstruitaj kiel malnetoj ( geometrioj/materialoj unufoje ),
// kaj ĉiu besto estas klono de sia malneto — la klonoj kunhavas la samajn
// geometriojn kaj materialojn, do la bestoj ne kostas teksturojn po unu.
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { alteco, akvaNivelo, biomo, akvo, cxuEnLago } from "../../src/tereno.js";
import { skulptitaBesto } from "../../src/tero-datumaro/rultempo.js";
import { kreiKanvasanTeksajxon } from "../komunajxoj/teksajxoj.js";
import { SKULPTA_PASO, SKULPTA_N, SKULPTA_ORIGINO } from "../../src/tero-datumaro/krado.js";

// trovuBestajnZonojn — la pentritaj ĉeloj de la besta-tavolo ( la skulptilo )
// kun la donita bito ( 1=akvaj bestoj, 2=petreloj, 4=NPC-oj; ĉelo povas teni
// plurajn ), kiel mondaj pozicioj. Malplena se neniu pentraĵo — nenia besto
// tiam. Akvaj bestoj bezonas akvajn ĉelojn; la petreloj povas flugi super
// ajna loko; la NPC-oj piediras nur sur tero ( la ludo filtras la akvon ).
function trovuBestajnZonojn(bito: number, nurAkvo: boolean): { x: number; z: number }[] {
  const zonoj: { x: number; z: number }[] = [];
  for ( let j = 0; j < SKULPTA_N; j++ ) {
    for ( let i = 0; i < SKULPTA_N; i++ ) {
      const x = SKULPTA_ORIGINO[0] + i * SKULPTA_PASO;
      const z = SKULPTA_ORIGINO[1] + j * SKULPTA_PASO;
      if ( ( skulptitaBesto(x, z) & bito ) === 0 ) continue;
      if ( nurAkvo && !akvo(x, z) ) continue;
      zonoj.push({ x, z });
    }
  }
  return zonoj;
}

// ⟨ Bestoj ↔ biomoj ( kiu vivas kie ) 📃 ⟩ — la kontrolo de la besta spawno.
// La akvaj bestoj ( ktenoforoj, glacifiso, marlaraksxo ) vivas en la akva
// biomo; la neĝopetreloj rondflugas super la montara biomo ( la neĝaj pintoj )
// kaj super la akva ( la lago kaj la rivero ).
export const BIOMO_DE_BESTO = {
  ktenoforoj: "akvo",
  glacifiso: "akvo",
  marlaraksxo: "akvo",
  neĝopetrelo: "montaro",
} as const;

export interface Besto {
  grupo: THREE.Group;
  korpo: THREE.Mesh;
  vosto?: THREE.Object3D;  // vosta naĝilo ( glacifiso ) — batas dum naĝado
  animajxoj: THREE.Object3D[]; // specio-specifaj movaj partoj ( palpoj, loboj, kruroj )
  segmentoj: THREE.Object3D[]; // la korpaj ĉenaj segmentoj ( glacifiso )
  naĝiloj: THREE.Object3D[];   // ĉiuj naĝiloj trafe ( glacifiso )
  bazajKruroj: Array<{ kruro: THREE.Object3D; q: THREE.Quaternion; ankro: THREE.Vector3 }>;
  x: number;           // baza x — laŭ la rivero aŭ en la lago
  zOfseto: number;     // laterala forpreno de la rivercentro
  cz: number;          // baza z — en la lago la besto restas ĉe sia propra centro
  enLago: boolean;     // ĉu la besto naĝas en la lago ( anstataŭ la rivero )
  nivelo?: number;     // la akvosurfaca Y de la besto ( de akvaNivelo aŭ de la
                       // objekta ilo ) — la animacio restas ĉe ĝi, anstataŭ
                       // ree kalkuli la akvon ĉiukadre
  bazaY: number;       // negativa kroma alteco — korpocentro sub la akvosurfaco
  direkto: number;     // la kapo-direkto — la glacifiso turniĝas al la movo
  turno: number;       // la lasta turnrapido ( por la kliniĝo de la glacifiso )
  phase: number;
  amplitudo: number;   // oscila intervalo laŭ la rivero
  rapido: number;      // naĝa rapido ( oscilfrekvenco )
  speco: string;       // speco-specifa animacio
}

export interface BestoSistemo {
  bestoj: Besto[];
  riverFn: ( x: number ) => number;
  akvoYFn: ( x: number ) => number;
  lago?: { x: number; z: number; r: number; nivelo: number };
}

// kreiKombovicanTeksajxon — Procedura teksajxo kun vertikalaj strioj ĉirkaŭ
// la korpo ( la kombovicoj ). Malhela fono, blankecaj strioj kun molaj randoj.
// La sama teksajxo funkcias kiel irideseca kaj emisia mapo — la strioj brilas
// kaj refraktas lumon en ĉielarkajn kolorojn, dum la resto restas travidebla.
function kreiKombovicanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200; // 128
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    // Malhela fono — nenia iridesco/emisio ekster la strioj.
    kunteksto.fillStyle = "rgb(6,10,16)";
    kunteksto.fillRect(0, 0, s, s);

    const strioLargho = s / 0o10;
    for ( let k = 0; k < 0o10; k++ ) {
      const cx = ( k + 0o1/0o2 ) * strioLargho;
      const r = strioLargho * 0o23/0o100;
      const gradiento = kunteksto.createLinearGradient(cx - r, 0, cx + r, 0);
      // Alterna brilo — la ok vicoj ne estas tute identaj en naturo.
      const helo = 0o3/0o4 + ( k % 0o2 ) * 0o15/0o100;
      gradiento.addColorStop(0, "rgba(255,255,255,0)");
      gradiento.addColorStop(0o1/0o2, "rgba(235,245,255," + helo + ")");
      gradiento.addColorStop(1, "rgba(255,255,255,0)");
      kunteksto.fillStyle = gradiento;
      kunteksto.fillRect(cx - r, 0, r * 0o2, s);
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}

// kreiKorpon — Lathe-korpo kun kombovicoj bakitaj en la UV-mapoj ( la
// strioj ĉirkaŭvolvas la korpon laŭlonge — ok kombovicoj ĉe ĉiu speco ).
function kreiKorpon(teksajxo: THREE.CanvasTexture, profilo: [ number, number ][],
  koloro: number, emisio: number): THREE.Mesh {
  const punktoj = profilo.map(( [ r, y ] ) => new THREE.Vector2(r, y));
  const geometrio = new THREE.LatheGeometry(punktoj, 0o20);
  const materialo = new THREE.MeshPhysicalMaterial({
    color: koloro,
    transparent: true,
    opacity: 0o3/0o10,
    depthWrite: false,
    roughness: 0o1/0o10,
    metalness: 0,
    iridescence: 1,
    iridescenceIOR: 0o25/0o20,
    iridescenceMap: teksajxo,
    emissive: emisio,
    emissiveMap: teksajxo,
    emissiveIntensity: 0o7/0o10,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(geometrio, materialo);
}

interface SpecoMalneto {
  malneto: THREE.Group;
  platigxo: THREE.Vector3;
  supro: number;   // korpa supro super la grupo-origino ( × grandeco )
  speco: string;
  mergo?: number;  // kroma subakvigo por fundaj bestoj ( pozitiva = pli profunde )
  fundaMergo?: number;   // multiplikilo de la loka akva profundo — la fiŝoj,
                         // kiuj naĝas antaŭ la fundo, anstataŭ ĉe la surfaco
  rapidaMultoblo?: number;     // multiplikilo de la naĝa oscilfrekvenco
  ampleksaMultoblo?: number;   // multiplikilo de la naĝa amplekso
}

// konstruiBeroanMalneton — Beroe. Longforma ovalo, ok kombovicoj, granda buŝo
// ĉe la supro ( malhela faringo videbla tra la travidebla korpo ), platigita.
function konstruiBeroanMalneton(teksajxo: THREE.CanvasTexture): SpecoMalneto {
  const grupo = new THREE.Group();
  const profilo: [ number, number ][] = [
    [ 0o1/0o100, -0o43/0o40 ], [ 0o7/0o40, -0o75/0o100 ], [ 0o33/0o100, -0o55/0o100 ], [ 0o11/0o20, -0o13/0o40 ],
    [ 0o23/0o40, 0 ], [ 0o45/0o100, 0o13/0o40 ], [ 0o1/0o2, 0o55/0o100 ], [ 0o33/0o100, 0o75/0o100 ], [ 0o35/0o100, 0o43/0o40 ],
  ];
  const korpo = kreiKorpon(teksajxo, profilo, 0xe8d8e0, 0x285078);
  korpo.name = "korpo";
  grupo.add(korpo);

  // Faringo — malhela buŝa tubo en la supra duono; restas ene de la korpo.
  const faringo = new THREE.Mesh(
    new THREE.CylinderGeometry(0o7/0o100, 0o7/0o100, 0o1/0o2, 0o10).translate(0, 0o1/0o4, 0),
    new THREE.MeshPhysicalMaterial({
      color: 0x986080, transparent: true, opacity: 0o5/0o20, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x402040, emissiveIntensity: 0o1/0o4,
    })
);
  faringo.name = "faringo";
  faringo.position.y = 0o5/0o10;
  grupo.add(faringo);

  return { malneto: grupo, platigxo: new THREE.Vector3(0o1, 0o1, 0o63/0o100), supro: 0o43/0o40, speco: "beroe" };
}

// konstruiMnemiopsanMalneton — Mnemiopsis. Pli ronda korpo kun kvar buŝaj loboj.
function konstruiMnemiopsanMalneton(teksajxo: THREE.CanvasTexture): SpecoMalneto {
  const grupo = new THREE.Group();
  const profilo: [ number, number ][] = [
    [ 0o1/0o100, -0o1 ], [ 0o23/0o100, -0o33/0o40 ], [ 0o45/0o100, -0o23/0o40 ], [ 0o57/0o100, -0o1/0o4 ],
    [ 0o31/0o40, 0 ], [ 0o57/0o100, 0o1/0o4 ], [ 0o5/0o10, 0o43/0o100 ], [ 0o7/0o20, 0o63/0o100 ],
    [ 0o23/0o100, 0o75/0o100 ], [ 0o21/0o100, 0o1 ],
  ];
  const korpo = kreiKorpon(teksajxo, profilo, 0xd8e8f0, 0x285878);
  korpo.name = "korpo";
  grupo.add(korpo);

  const lobaMaterialo = new THREE.MeshPhysicalMaterial({
    color: 0xd0e8f8, transparent: true, opacity: 0o5/0o20, depthWrite: false,
    roughness: 0o1/0o4, emissive: 0x285878, emissiveIntensity: 0o3/0o10, side: THREE.DoubleSide,
  });
  for ( let k = 0; k < 0o4; k++ ) {
    const a = k / 0o4 * Math.PI * 0o2 + Math.PI / 0o4;
    const lobo = new THREE.Mesh(new THREE.BoxGeometry(0o3/0o20, 0o3/0o20, 0o6/0o20), lobaMaterialo);
    lobo.name = "lobo";
    lobo.position.set(Math.sin(a) * 0o41/0o100, -0o55/0o100, Math.cos(a) * 0o41/0o100);
    lobo.rotation.y = a;
    grupo.add(lobo);
  }

  return { malneto: grupo, platigxo: new THREE.Vector3(0o1, 0o1, 0o1), supro: 0o43/0o40, speco: "mnemiopsis" };
}

// konstruiPleŭrobrakianMalneton — Pleŭrobrakia. Malgranda ronda korpo, du
// longaj sinuaj palpoj pendantaj malsupren.
function konstruiPleŭrobrakianMalneton(teksajxo: THREE.CanvasTexture): SpecoMalneto {
  const grupo = new THREE.Group();
  const profilo: [ number, number ][] = [
    [ 0o1/0o100, -0o1 ], [ 0o33/0o100, -0o63/0o100 ], [ 0o55/0o100, -0o35/0o100 ], [ 0o31/0o40, 0 ],
    [ 0o55/0o100, 0o35/0o100 ], [ 0o37/0o100, 0o63/0o100 ], [ 0o5/0o20, 0o75/0o100 ], [ 0o11/0o40, 0o1 ],
  ];
  const korpo = kreiKorpon(teksajxo, profilo, 0xd8f0e8, 0x286858);
  korpo.name = "korpo";
  grupo.add(korpo);

  const palpaMaterialo = new THREE.MeshPhysicalMaterial({
    color: 0xc8e8e0, transparent: true, opacity: 0o1/0o2, depthWrite: false,
    roughness: 0o1/0o4, emissive: 0x288878, emissiveIntensity: 0o1/0o2, side: THREE.DoubleSide,
  });
  for ( const s of [ 0o1, -0o1 ] ) {
    const punktoj: THREE.Vector3[] = [];
    for ( let i = 0; i <= 0o10; i++ ) {
      const t = i / 0o10;
      punktoj.push(new THREE.Vector3(
        s * 0o3/0o20,
        -0o1 - t * 0o123/0o40,
        Math.sin(t * Math.PI * 0o2 + s) * 0o1/0o10
));
    }
    const kurbo = new THREE.CatmullRomCurve3(punktoj);
    const palpo = new THREE.Mesh(new THREE.TubeGeometry(kurbo, 0o10, 0o3/0o100, 0o6), palpaMaterialo);
    palpo.name = "palpo";
    grupo.add(palpo);
  }

  return { malneto: grupo, platigxo: new THREE.Vector3(0o1, 0o1, 0o1), supro: 0o43/0o40, speco: "pleurobrakia" };
}

// ⟪ Glacifiso ( Channichthyidae ) 📃 ⟫
// La glacifiso estas travidebla, senhemoglobina fiŝo — preskaŭ senkolora, kun
// GRANDA kapo kaj longa malprofunda korpo. Ĝi naĝas per malrapidaj remoj de
// la grandaj brustaj naĝiloj, kaj la korpo ondigas ( tri-segmenta ĉeno ),
// anstataŭ svingiĝi rigide. La korpo estas tubo el ELIPSAJ sekcoj — lathe-korpo
// estas ronda ĉirkaŭ la akso, do ĝi aspektis kiel torpedo kaj ne kiel fiŝo —
// kaj la haŭta teksajxo portas la malhelan brankaron, la flanklinion kaj la
// etajn makulojn de la specio.

// FiŝaStacio — unu sekco de la korpo. z estas la absoluta pozicio laŭ la korpo
// ( la nazo ĉe 0, la vosto negativa ), rx la duon-larĝo kaj ry la duon-alto tie.
interface FiŝaStacio { z: number; rx: number; ry: number; }

// GLACIFISA_PROFILO — la glacifisa korpa profilo, de la nazo ĝis la vosta
// bazo. Longeco 4-5 fojojn la korpan alton, kiel vera glacifiso — profunda
// ŝultro ( la plej larĝa punkto apud la brankoj ) kaj mallarĝiĝanta vosto.
const GLACIFISA_LONGO = 0o175/0o100;
const GLACIFISA_PROFILO: FiŝaStacio[] = [
  { z: 0,                rx: 0o2/0o100,  ry: 0o2/0o100 },   // la nazpinto
  { z: -0o1/0o10,        rx: 0o5/0o100,  ry: 0o6/0o100 },   // la muzelo
  { z: -0o1/0o4,         rx: 0o7/0o100,  ry: 0o10/0o100 },  // la kapo
  { z: -0o1/0o2,         rx: 0o10/0o100, ry: 0o14/0o100 },  // la ŝultro ( brankoj )
  { z: -0o3/0o4,         rx: 0o7/0o100,  ry: 0o12/0o100 },
  { z: -0o1,             rx: 0o6/0o100,  ry: 0o10/0o100 },
  { z: -0o13/0o10,       rx: 0o4/0o100,  ry: 0o7/0o100 },   // la vosta pedunklo
  { z: -0o16/0o10,       rx: 0o2/0o100,  ry: 0o4/0o100 },
  { z: -GLACIFISA_LONGO, rx: 0o1/0o100,  ry: 0o2/0o100 },   // la vosta bazo
];
// La tri ĉenaj segmentoj — kapo, mezo, vosto. La artikoj estas ekzaktaj
// stacioj, do la ringoj kongruas kaj la kruroj de la ĉeno ne montras fendetojn.
// Kiom flanke kaj supre la okulo sidas ( 0o7/0o20 de la sekca radiuso ) —
// la tekseja orbita ombro kaj la okula globo devas samloke sidi.
const GLACIFISA_OKULA_FLANKO = 0o7/0o20;
const GLACIFISA_OKULA_Z = -0o27/0o100;
const GLACIFISA_KAPO_Z = -0o1/0o2;        // la brankoŝirmilo
const GLACIFISA_MEZO_Z = -0o13/0o10;

// katmullRom — unu-dimensia glata interpolo ( la sama kurbo kiel la terena
// krado en src/tero-datumaro/rultempo.ts ).
function katmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t, t3 = t2 * t;
  return 0o1/0o2 * ( ( 2 * p1 ) + ( -p0 + p2 ) * t
    + ( 2 * p0 - 5 * p1 + 4 * p2 - p3 ) * t2 + ( -p0 + 3 * p1 - 3 * p2 + p3 ) * t3 );
}

// subdividuStaciojn — Densigu la profilon. La malmultaj stacioj donus facetan
// tubon ( videblaj ringoj ); la Katmull-Rom-interpolo donas glatan fiŝan
// korpon, kaj la sama matematiko ĉe la artikoj redonas la saman ringon, do la
// segmentoj kongruas ekzakte.
function subdividuStaciojn(stacioj: FiŝaStacio[], poIntervalo: number): FiŝaStacio[] {
  const eligo: FiŝaStacio[] = [];
  const n = stacioj.length;
  const je = ( i: number ) => stacioj[Math.max(0, Math.min(n - 1, i))];
  const valoro = ( i: number, t: number, preni: ( s: FiŝaStacio ) => number ): number =>
    katmullRom(preni(je(i - 1)), preni(je(i)), preni(je(i + 1)), preni(je(i + 2)), t);
  for ( let i = 0; i < n - 1; i++ ) {
    for ( let k = 0; k < poIntervalo; k++ ) {
      const t = k / poIntervalo;
      eligo.push({
        z: valoro(i, t, s => s.z),
        rx: valoro(i, t, s => s.rx),
        ry: valoro(i, t, s => s.ry),
      });
    }
  }
  eligo.push({ z: stacioj[n - 1].z, rx: stacioj[n - 1].rx, ry: stacioj[n - 1].ry });
  return eligo;
}

// kreiFiŝanTubon — Tubo el elipsaj sekcoj laŭ la korpa akso. Por ĉiu sekco
// ( z, rx, ry ) ok+ anguloj da verticoj; la UV-oj mapas la korpon ( u ĉirkaŭe,
// v de la nazo ĝis la vosto ), do la haŭta teksajxo sekvas la profilon.
//     @param stacioj ( FiŝaStacio[] ) - La ( densigitaj ) sekcoj de la segmento.
//     @param anguloj ( number ) - Kiom da verticoj ĉirkaŭ la korpo.
//     @param longo ( number ) - La tuta korpa longo ( por la v-koordinato ).
//     @returns geometrio ( THREE.BufferGeometry ) - La segmenta korpo.
function kreiFiŝanTubon(stacioj: FiŝaStacio[], anguloj: number, longo: number): THREE.BufferGeometry {
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  const zDe = stacioj[0].z;   // la segmenta origino sidas ĉe sia antaŭa artiko
  // Ĉiu ringo havas anguloj+1 verticojn — la lasta ripetas la pozicion de la
  // unua sed kun u = 1 ALIVERTE. Tiu duobla kudro-vertico estas necesa — sen
  // ĝi la lasta kvarangulo de la ĉirkaŭvolvo irus de u = 15/16 reen al u = 0
  // kaj projekcius la TUTAN teksejon malantaŭen en unu strio de la korpo ( la
  // "dentoj", kiuj aperis sur la flanko de la fiŝo ).
  const ringo = anguloj + 1;
  for ( let i = 0; i < stacioj.length; i++ ) {
    const stacio = stacioj[i];
    for ( let j = 0; j <= anguloj; j++ ) {
      const angulo = j / anguloj * Math.PI * 2;
      pozicioj.push(Math.cos(angulo) * stacio.rx, Math.sin(angulo) * stacio.ry, stacio.z - zDe);
      uvoj.push(j / anguloj, -stacio.z / longo);
    }
  }
  for ( let i = 0; i < stacioj.length - 1; i++ ) {
    for ( let j = 0; j < anguloj; j++ ) {
      const a = i * ringo + j, b = a + 1;
      const c = a + ringo, d = b + ringo;
      indeksoj.push(a, c, d, a, d, b);
    }
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
  geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 2));
  geometrio.setIndex(indeksoj);
  geometrio.computeVertexNormals();
  return geometrio;
}

// normaliguUvojn — ShapeGeometry uzas la formaĵajn koordinatojn kiel UV. La
// naĝilaj teksajxoj atendalas la norman 0-1 kadron, do reskribu ilin laŭ la
// limoj de la formo ( u de la bazo ĝis la pinto ).
function normaliguUvojn(geometrio: THREE.BufferGeometry): void {
  geometrio.computeBoundingBox();
  const limoj = geometrio.boundingBox!;
  const largho = Math.max(0o1/0o1000, limoj.max.x - limoj.min.x);
  const alto = Math.max(0o1/0o1000, limoj.max.y - limoj.min.y);
  const uvoj = geometrio.getAttribute("uv") as THREE.BufferAttribute;
  for ( let i = 0; i < uvoj.count; i++ ) {
    // u = 0 ĉe la naĝila bazo, 1 ĉe la pinto ( la formoj kreskas malantaŭen,
    // do la maksimuma x estas la artiko ).
    uvoj.setXY(i, ( limoj.max.x - uvoj.getX(i) ) / largho, ( uvoj.getY(i) - limoj.min.y ) / alto);
  }
  uvoj.needsUpdate = true;
}

// kreiNaĝilon — Naĝila mesxo el 2D-formo. La formo estas desegnita en la
// ( malantaŭen, supren ) ebeno — la forma x iras malantaŭen laŭ la korpo, la
// forma y supren — kaj la geometrio turniĝas en la korpan YZ-ebonon, do ĝi
// fariĝas vertikala naĝilo ( dorsa, anala, vosta ). La flankaj naĝiloj
// ( brustaj, pelvaj ) ricevas sian klinon per rotacio sur la meshxo.
//     @param formo ( THREE.Shape ) - La naĝila konturo.
//     @param materialo ( THREE.Material ) - La naĝila materialo ( kun la sama
//         naĝila teksajxo por ĉiuj naĝiloj ).
//     @param x, y, z ( number ) - La artiko ( la formo-origino ).
//     @returns naĝilo ( THREE.Mesh ) - La preta naĝilo.
function kreiNaĝilon(formo: THREE.Shape, materialo: THREE.Material,
  x: number, y: number, z: number): THREE.Mesh {
  const geometrio = new THREE.ShapeGeometry(formo);
  normaliguUvojn(geometrio);
  geometrio.rotateY(-Math.PI / 0o2);
  const naĝilo = new THREE.Mesh(geometrio, materialo);
  naĝilo.position.set(x, y, z);
  return naĝilo;
}

// kreiGlacifisanHaŭtanTeksajxon — La glacifisa haŭto. La u-akso estas la
// angulo ĉirkaŭ la korpo ( 0.25 = la dorso, 0.75 = la ventro, 0 kaj 0.5 = la
// flankoj ), la v-akso la longo de la nazo ĝis la vosto. La malhela dorso, la
// karakteriza malhela brankaro apud la kapfino, la flanklinio kaj la etaj
// makuloj faras la beston rekon ebla anstataŭ senkolora tubo.
function kreiGlacifisanHaŭtanTeksajxon(): THREE.CanvasTexture {
  const w = 0o400, h = 0o1000;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    // La dorso-ventra gradiento — malhela blugriza dorso ( u = 0.25 ),
    // arĝentecaj flankoj ( u = 0 kaj 0.5 ) kaj preskaŭ blanka ventro
    // ( u = 0.75 ). La koloroj ĉe u = 0 kaj u = 1 KONGRUAS, ĉar ili estas la
    // sama loko ( la dekstra flanko ) sur la ĉirkaŭvolvita teksejo.
    const gradiento = kunteksto.createLinearGradient(0, 0, w, 0);
    gradiento.addColorStop(0, "#93a9b4");
    gradiento.addColorStop(0o14/0o100, "#6d8996");
    gradiento.addColorStop(0o25/0o100, "#3d5666");
    gradiento.addColorStop(0o36/0o100, "#6d8996");
    gradiento.addColorStop(0o5/0o10, "#93a9b4");
    gradiento.addColorStop(0o7/0o10, "#e4eff1");
    gradiento.addColorStop(0o4/0o5, "#c4d8de");
    gradiento.addColorStop(1, "#93a9b4");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);

    // Kiom "dorsa" kanvasa absciso estas — 1 ĉe la dorso ( u = 0.25 ), 0 ĉe la
    // ventro ( u = 0.75 ). La makuloj uzas ĝin por densiĝi supre.
    const dorsoPeco = ( x: number ): number =>
      ( 0o1 + Math.cos(( x / w - 0o25/0o100 ) * Math.PI * 2)) * 0o1/0o2;
    // makulon — mola makulo. Ĝi desegniĝas ĉe tri kahelpozicioj, do ĝi daŭras
    // trans la kudron de la ĉirkaŭvolvo ( la dekstra flanko de la fiŝo ).
    const makulon = ( x: number, y: number, r: number, rondo: number,
      alfa: number, koloro: string ): void => {
      for ( const dx of [ -w, 0, w ] ) {
        const g = kunteksto.createRadialGradient(x + dx, y, 0, x + dx, y, r);
        g.addColorStop(0, "rgba(" + koloro + "," + alfa + ")");
        g.addColorStop(1, "rgba(" + koloro + ",0)");
        kunteksto.fillStyle = g;
        kunteksto.beginPath();
        kunteksto.ellipse(x + dx, y, r, r * rondo, 0, 0, Math.PI * 2);
        kunteksto.fill();
      }
    };

    // La molaj makuloj — multaj etaj, malklaraj makuloj, densaj sur la dorso
    // kaj malplenaj sur la ventro.
    for ( let i = 0; i < 0o360; i++ ) {
      const x = w * ( 0o25/0o100 + ( Math.random() - 0o1/0o2 ) * 0o7/0o10 );
      const y = Math.random() * h;
      const r = w * ( 0o25/0o1000 + Math.random() * 0o75/0o1000 );
      makulon(x, y, r, 0o6/0o10,
        ( 0o1/0o12 + Math.random() * 0o1/0o7 ) * dorsoPeco(x), "64,90,106");
    }

    // La etaj malhelaj punktoj — la haŭto de travidebla fiŝo montras etan
    // granularon, ne ebenan koloron.
    for ( let i = 0; i < 0o1000; i++ ) {
      const x = Math.random() * w, y = Math.random() * h;
      const r = w * ( 0o5/0o1000 + Math.random() * 0o15/0o1000 );
      makulon(x, y, r, 1,
        ( 0o10/0o100 + Math.random() * 0o16/0o100 ) * dorsoPeco(x), "72,96,110");
    }

    // La myomeroj — la malfortaj muskolaj strioj, kiuj videblas tra la
    // travidebla haŭto. Ili klinas malantaŭen; la desegno transiras la kudron
    // sen videbla junto.
    kunteksto.strokeStyle = "rgba(96,124,138,0.09)";
    kunteksto.lineWidth = 1;
    for ( let y = h * 0o12/0o100; y < h * 0o6/0o7; y += h * 0o22/0o1000 ) {
      kunteksto.beginPath();
      kunteksto.moveTo(0, y);
      kunteksto.lineTo(w, y + h * 0o1/0o30);
      kunteksto.stroke();
    }

    // Malhelaj makuloj laŭ la dorso — la flankaj markoj de Channichthys.
    for ( let i = 0; i < 0o36; i++ ) {
      const x = w * ( 0o25/0o100 + ( Math.random() - 0o1/0o2 ) * 0o4/0o10 );
      const y = h * ( 0o1/0o12 + Math.random() * 0o7/0o10 );
      const r = w * ( 0o2/0o100 + Math.random() * 0o5/0o100 );
      makulon(x, y, r, 0o7/0o10,
        ( 0o16/0o100 + Math.random() * 0o1/0o6 ) * dorsoPeco(x), "44,64,80");
    }

    // La kanvasa y-akso montras malsupren, sed la tekseja v-akso ( kun la
    // defaŭlta flipY ) iras de la nazo ( v = 0, kanvasa malsupro ) al la vosto
    // ( v = 1, kanvasa supro ) — do y = ( 1 - v ) * h. Antaŭe la brankaro kaj
    // la flanklinio estis desegnitaj per la kruda v, do ili aperis ĉe la VOSTO.
    const yDe = ( v: number ): number => ( 1 - v ) * h;

    // La buŝa rando — mallarĝa malhela bando ĉe la nazpinto.
    kunteksto.fillStyle = "rgba(56,74,90,0.30)";
    kunteksto.fillRect(0, yDe(0o5/0o100), w, h * 0o35/0o1000);

    // La malhela brankaro — larĝa malklara bando ĉe la malantaŭo de la kapo
    // ( la brankoŝirmilo kaj la brustaj membranoj ), la plej karakteriza marko
    // de la glacifisoj.
    const brankV = -GLACIFISA_KAPO_Z / GLACIFISA_LONGO;
    const brankY = yDe(brankV);
    const brankaBando = kunteksto.createLinearGradient(
      0, brankY + h * 0o12/0o100, 0, brankY - h * 0o12/0o100);
    brankaBando.addColorStop(0, "rgba(48,64,80,0)");
    brankaBando.addColorStop(0o5/0o10, "rgba(40,56,72,0.42)");
    brankaBando.addColorStop(1, "rgba(48,64,80,0)");
    kunteksto.fillStyle = brankaBando;
    kunteksto.fillRect(0, brankY - h * 0o12/0o100, w, h * 0o24/0o100);
    // La branka fendeto — maldika malhela linio ĝuste malantaŭ la ŝirmilo.
    kunteksto.fillStyle = "rgba(32,48,64,0.40)";
    kunteksto.fillRect(0, yDe(brankV + 0o3/0o100) - 1, w, 2);

    // La orbita ombro — la haŭto malheliĝas ĉirkaŭ la okulo, do la malhela
    // okulo legiĝas kiel okulo anstataŭ kiel globeto sur la kapo. La angulo
    // venas el la okula pozicio ( 0.55 rx, 0.45 ry ) en la sekco.
    const okulaU = Math.acos(GLACIFISA_OKULA_FLANKO) / ( Math.PI * 2 );
    const okulaV = -GLACIFISA_OKULA_Z / GLACIFISA_LONGO;
    for ( const okulaX of [ okulaU, 0o5/0o10 - okulaU ] ) {
      makulon(okulaX * w, yDe(okulaV), w * 0o6/0o100, 0o4/0o5, 0o7/0o20, "38,56,70");
    }

    // La flanklinio — punkta linio laŭ ĉiu flanko ( u = 0 kaj u = 0.5 ), de
    // malantaŭ la brankoj ĝis la vosta pedunklo.
    kunteksto.fillStyle = "rgba(96,128,144,0.40)";
    for ( const flanka of [ 0, w / 2 ] ) {
      for ( let v = 0o32/0o100; v < 0o12/0o13; v += 0o1/0o100 ) {
        kunteksto.fillRect(flanka - 1, yDe(v), 2, 3);
      }
    }
  }, [ 1, 1 ], { anisotropio: 0o4 });
}

// kreiGlacifisanNaĝilanTeksajxon — La naĝila membrano. Pale blublanka kun
// malhelaj RADIAJ strekoj ( la naĝilaj radioj ) kaj iom pli malhela rando —
// la naĝiloj de travidebla fiŝo tiel legiĝas kiel naĝiloj, ne kiel plastaj
// rektanguloj. La u-akso iras de la bazo al la pinto ĉe ĉiuj naĝiloj
// ( normaliguUvojn ).
function kreiGlacifisanNaĝilanTeksajxon(): THREE.CanvasTexture {
  const w = 0o400, h = 0o200;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    // La membrano mem — grize blua ĉe la bazo ( la viando ), pli hela ĉe la
    // mezo, kaj duontravidebla ĉe la pinto. Antaŭe la naĝiloj estis preskaŭ
    // blankaj, do ili aspektis kiel laktaj makuloj anstataŭ naĝilaj membranoj.
    const gradiento = kunteksto.createLinearGradient(0, 0, w, 0);
    gradiento.addColorStop(0, "#6f8b9a");
    gradiento.addColorStop(0o25/0o100, "#a6c0cc");
    gradiento.addColorStop(0o7/0o10, "#c2d6de");
    gradiento.addColorStop(1, "#8fadbb");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
    // La radioj — malhelaj strekoj disverŝiĝantaj de la bazo al la pinto.
    // Ili estas la plej forta legosigno de naĝilo, do ili estu klaraj.
    for ( let i = 0; i <= 0o24; i++ ) {
      const bazaY = i / 0o24 * h;
      kunteksto.strokeStyle = i % 0o2 ? "rgba(46,72,88,0.46)" : "rgba(88,116,132,0.34)";
      kunteksto.lineWidth = i % 0o3 ? 1 : 2;
      kunteksto.beginPath();
      kunteksto.moveTo(0, h / 0o2 + ( bazaY - h / 0o2 ) * 0o7/0o10);
      kunteksto.lineTo(w, bazaY);
      kunteksto.stroke();
    }
    // La mola malklara bazo ( la viando de la naĝilo ) kaj la pli malhela,
    // pli travidebla pinto.
    kunteksto.fillStyle = "rgba(120,146,160,0.55)";
    kunteksto.fillRect(0, 0, w * 0o12/0o100, h);
    kunteksto.fillStyle = "rgba(58,84,100,0.34)";
    kunteksto.fillRect(w * 0o72/0o100, 0, w * 0o3/0o10, h);
  }, [ 1, 1 ], { anisotropio: 0o4 });
}

// konstruiGlacifisanMalneton — Glacifiso ( Channichthyidae ). Preskaŭ
// travidebla fiŝo — la antarktaj glacifisoj ne havas hemoglobinon, do ilia
// korpo estas senkolora. La korpo estas tri-segmenta ĉeno ( kapo, mezo,
// vosto ) — la animacio ondigas ĝin ( vidu gxisdatigiBestojn ) — kun granda
// kapo, longa malalta dua dorsa naĝilo, anala naĝilo, grandaj ventumilformaj
// brustaj naĝiloj, longaj pelvaj naĝiloj kaj small-forka vosta naĝilo. Okuloj,
// buŝo kaj brankoj kompletigas la kapon.
function konstruiGlacifisanMalneton(): SpecoMalneto {
  const grupo = new THREE.Group();

  const korpaMaterialo = new THREE.MeshPhysicalMaterial({
    color: 0xa8c0ca,
    map: kreiGlacifisanHaŭtanTeksajxon(),
    transparent: true,
    // Pli maldiafana ol antaŭe ( 0o7/0o20 ) — la korpo restas travidebla, sed la
    // malhela dorso kaj la makuloj legiĝas anstataŭ laviĝi.
    opacity: 0o15/0o20,
    depthWrite: false,
    roughness: 0o4/0o10,
    // Malseka, glata fiŝa haŭto — maldika travidebla lako super la mola korpo.
    // Tro da lako lavas la malhelan dorson per spegula blanko, do ĝi estas
    // modera kaj pli malglata ol antaŭe.
    clearcoat: 0o5/0o10,
    clearcoatRoughness: 0o35/0o100,
    iridescence: 0o25/0o100,
    iridescenceIOR: 0o25/0o20,
    // Neniu emisio — la akvo jam lumigas la korpon, kaj la malnova emisio lavis
    // la makulojn — la fiŝo aspektis kiel lakte blanka tubo.
    side: THREE.DoubleSide,
  });
  const naĝilaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x8ea9b8, map: kreiGlacifisanNaĝilanTeksajxon(),
    transparent: true, opacity: 0o13/0o20,
    depthWrite: false, side: THREE.DoubleSide, roughness: 0o5/0o10,
  });
  // La okulo — malgranda, malhela, brilanta; ĝi estas mergita en la kapon, kaj
  // la teksejo malheliĝas ĉirkaŭ ĝi ( la orbita ombro ), do ĝi legiĝas kiel
  // okulo anstataŭ kiel nigra globeto sur la haŭto.
  const okulaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x0e1a22, roughness: 0o12/0o100, metalness: 0o3/0o10,
  });
  const buŝaMaterialo = new THREE.MeshStandardMaterial({
    color: 0x2a323e, roughness: 0o6/0o10, side: THREE.DoubleSide,
  });

  // La tri korpaj segmentoj. Ĉiu segmento longas de sia antaŭa artiko kaj
  // rotacias ĉirkaŭ ĝi, do la naĝa ondo kurbiĝas tra la korpo. La geometrioj
  // estas plene apartaj ( kunhavataj de ĉiuj glacifisoj — ili estas klonoj ).
  const densigitaj = subdividuStaciojn(GLACIFISA_PROFILO, 0o2);
  const jeZ = ( z: number ): number => densigitaj.findIndex(s => s.z <= z + 0o1/0o10000);
  const tranĉi = ( de: number, ĝis: number ): FiŝaStacio[] => densigitaj.slice(de, ĝis + 1);
  const kapFino = jeZ(GLACIFISA_KAPO_Z);
  const mezFino = jeZ(GLACIFISA_MEZO_Z);

  const kapo = new THREE.Mesh(
    kreiFiŝanTubon(tranĉi(0, kapFino), 0o20, GLACIFISA_LONGO), korpaMaterialo);
  kapo.name = "korpo";
  kapo.position.z = -( GLACIFISA_PROFILO[0].z - GLACIFISA_LONGO * 0o1/0o2 );
  grupo.add(kapo);

  const mezo = new THREE.Mesh(
    kreiFiŝanTubon(tranĉi(kapFino, mezFino), 0o20, GLACIFISA_LONGO), korpaMaterialo);
  mezo.name = "segmento";
  mezo.position.z = GLACIFISA_KAPO_Z;
  kapo.add(mezo);

  const vosto = new THREE.Mesh(
    kreiFiŝanTubon(tranĉi(mezFino, densigitaj.length - 1), 0o20, GLACIFISA_LONGO), korpaMaterialo);
  vosto.name = "segmento";
  vosto.position.z = GLACIFISA_MEZO_Z - GLACIFISA_KAPO_Z;
  mezo.add(vosto);

  // Vosta naĝilo — malgranda, iom forka, kun rondaj loboj.
  const vostaFormo = new THREE.Shape();
  vostaFormo.moveTo(0, 0o11/0o100);
  vostaFormo.quadraticCurveTo(-0o11/0o100, 0o13/0o100, -0o16/0o100, 0o15/0o100);
  vostaFormo.quadraticCurveTo(-0o14/0o100, 0o6/0o100, -0o13/0o100, 0);
  vostaFormo.quadraticCurveTo(-0o14/0o100, -0o6/0o100, -0o16/0o100, -0o15/0o100);
  vostaFormo.quadraticCurveTo(-0o11/0o100, -0o13/0o100, 0, -0o11/0o100);
  vostaFormo.closePath();
  const vostaNaĝilo = kreiNaĝilon(vostaFormo, naĝilaMaterialo, 0, 0,
    -( GLACIFISA_LONGO + GLACIFISA_MEZO_Z));
  vostaNaĝilo.name = "vosto";
  vosto.add(vostaNaĝilo);

  // Dua dorsa naĝilo — longa, malalta, kiel vera glacifiso. Ĝi sidas sur la
  // meza segmento, do ĝi sekvas la naĝan ondon.
  const duaDorsaFormo = new THREE.Shape();
  duaDorsaFormo.moveTo(0, 0);
  duaDorsaFormo.quadraticCurveTo(-0o12/0o100, 0o13/0o100, -0o34/0o100, 0o11/0o100);
  duaDorsaFormo.quadraticCurveTo(-0o56/0o100, 0o10/0o100, -0o67/0o100, 0o4/0o100);
  duaDorsaFormo.lineTo(-0o67/0o100, 0);
  duaDorsaFormo.closePath();
  const duaDorsa = kreiNaĝilon(duaDorsaFormo, naĝilaMaterialo, 0, 0o13/0o100, 0);
  duaDorsa.name = "dorsa";
  mezo.add(duaDorsa);

  // Anala naĝilo — la spegulo de la dua dorsa naĝilo sub la korpo.
  const analaFormo = new THREE.Shape();
  analaFormo.moveTo(0, 0);
  analaFormo.quadraticCurveTo(-0o12/0o100, -0o12/0o100, -0o26/0o100, -0o10/0o100);
  analaFormo.quadraticCurveTo(-0o42/0o100, -0o7/0o100, -0o50/0o100, -0o3/0o100);
  analaFormo.lineTo(-0o50/0o100, 0);
  analaFormo.closePath();
  const anala = kreiNaĝilon(analaFormo, naĝilaMaterialo, 0, -0o13/0o100, -0o1/0o10);
  anala.name = "analo";
  mezo.add(anala);

  // Unua dorsa naĝilo — mallonga, pli alta, ĵus antaŭ la dua ( la dornaj
  // radioj de la specio ).
  const unuaDorsaFormo = new THREE.Shape();
  unuaDorsaFormo.moveTo(0, 0);
  unuaDorsaFormo.quadraticCurveTo(-0o5/0o100, 0o14/0o100, -0o13/0o100, 0o11/0o100);
  unuaDorsaFormo.lineTo(-0o22/0o100, 0);
  unuaDorsaFormo.closePath();
  const unuaDorsa = kreiNaĝilon(unuaDorsaFormo, naĝilaMaterialo, 0, 0o12/0o100, -0o3/0o10);
  unuaDorsa.name = "dorsa";
  kapo.add(unuaDorsa);

  // Okuloj — sur la supraj flankoj de la kapo, iom antaŭ la brankoj. La
  // pozicio kaj la grando DERIVIĜAS el la profilo, do okulo sekvas la korpon
  // se la profilo ŝanĝiĝas, kaj ĝi sidas en la haŭto anstataŭ naĝi antaŭ ĝi.
  const okulaZ = GLACIFISA_OKULA_Z;
  const okulaStacio = densigitaj.reduce((najbara, stacio) =>
    Math.abs(stacio.z - okulaZ) < Math.abs(najbara.z - okulaZ) ? stacio : najbara);
  // La okulo estas eta — ĉirkaŭ kvarono de la kapa alto; pli granda globo
  // aspektas kiel nigra pilko gluita sur la kapo.
  const okulaGeometrio = new THREE.SphereGeometry(okulaStacio.ry * 0o1/0o4, 0o10, 0o10);
  for ( const s of [ 0o1, -0o1 ] ) {
    const okulo = new THREE.Mesh(okulaGeometrio, okulaMaterialo);
    okulo.name = "okulo";
    okulo.position.set(s * okulaStacio.rx * GLACIFISA_OKULA_FLANKO,
      okulaStacio.ry * GLACIFISA_OKULA_FLANKO, okulaZ);
    // Plata okulo, mergita en la kapon ( ne tuta globo sur la surfaco ).
    okulo.scale.set(0o7/0o10, 0o1, 0o1);
    kapo.add(okulo);
  }

  // La buŝo — mallarĝiĝanta malhela konuso en la muzelo. La korpo estas
  // travidebla, do la malhela buŝo videblas tra la haŭto kiel vera buŝo. La
  // malnova buŝo havis frontan radiuson 0.07 — duoble pli larĝan ol la muzelo
  // mem — do ĝi elstaris el la nazo kiel nigra funelo.
  const buŝaZ = -0o1/0o12;
  const buŝaStacio = densigitaj.reduce((najbara, stacio) =>
    Math.abs(stacio.z - buŝaZ) < Math.abs(najbara.z - buŝaZ) ? stacio : najbara);
  const buŝo = new THREE.Mesh(
    new THREE.CylinderGeometry(buŝaStacio.rx * 0o35/0o100, buŝaStacio.rx * 0o7/0o10,
      0o6/0o100, 0o12, 1, true), buŝaMaterialo);
  buŝo.name = "busxo";
  buŝo.rotation.x = Math.PI / 0o2;
  buŝo.position.set(0, 0, buŝaZ);
  kapo.add(buŝo);

  // Brustaj naĝiloj — LARĜAJ ventumiloj apud la brankoj, preskaŭ horizontalaj
  // kaj iom klinitaj malsupren. Ili remas la fiŝon ( vidu gxisdatigiBestojn ).
  const brustaFormo = new THREE.Shape();
  brustaFormo.moveTo(0, 0);
  brustaFormo.quadraticCurveTo(-0o10/0o100, -0o11/0o100, -0o24/0o100, -0o13/0o100);
  brustaFormo.quadraticCurveTo(-0o37/0o100, -0o10/0o100, -0o33/0o100, 0o1/0o100);
  brustaFormo.quadraticCurveTo(-0o17/0o100, 0o6/0o100, -0o4/0o100, 0o3/0o100);
  brustaFormo.closePath();
  for ( const s of [ 0o1, -0o1 ] ) {
    const brusta = kreiNaĝilon(brustaFormo, naĝilaMaterialo, s * 0o10/0o100, -0o2/0o100, -0o45/0o100);
    brusta.name = "brusta";
    // Preskaŭ horizontala ( turnita el la vertikala ebeno ) kaj iom klinita
    // malsupren; la finaĵo iomete disverŝiĝas malantaŭen.
    brusta.rotation.z = s * -( Math.PI / 0o2 + 0o3/0o10 );
    brusta.rotation.y = s * -0o2/0o10;
    brusta.userData.bazaZ = brusta.rotation.z;
    brusta.userData.bazaY = brusta.rotation.y;
    kapo.add(brusta);
  }

  // Pelvaj naĝiloj — du longaj maldikaj lamenoj sub la kapo; veraj glacifisoj
  // apogas sin sur ili antaŭ la fundo.
  const pelvaFormo = new THREE.Shape();
  pelvaFormo.moveTo(0, 0);
  pelvaFormo.quadraticCurveTo(-0o10/0o100, -0o7/0o100, -0o22/0o100, -0o12/0o100);
  pelvaFormo.quadraticCurveTo(-0o32/0o100, -0o10/0o100, -0o20/0o100, -0o3/0o100);
  pelvaFormo.closePath();
  for ( const s of [ 0o1, -0o1 ] ) {
    const pelva = kreiNaĝilon(pelvaFormo, naĝilaMaterialo, s * 0o3/0o100, -0o15/0o100, -0o35/0o100);
    pelva.name = "pelva";
    pelva.rotation.z = s * 0o35/0o100;
    pelva.userData.bazaZ = pelva.rotation.z;
    kapo.add(pelva);
  }

  return {
    malneto: grupo, platigxo: new THREE.Vector3(0o1, 0o1, 0o1),
      supro: 0o25/0o100, speco: "glacifiso", fundaMergo: 0o5/0o10,
    // La glacifiso naĝas MALRAPIDE — ĝi remas per la brustaj naĝiloj anstataŭ
    // svingi la voston kiel rapidmova fiŝo.
    rapidaMultoblo: 0o5/0o10, ampleksaMultoblo: 0o6/0o10,
  };
}

// konstruiMarlaraksxanMalneton — Marlaraksxo ( Pycnogonida ). Eta korpo kun
// ok longegaj, maldikaj kruroj ( kvar paroj ) kaj malgranda rostro. Ili
// marŝas sur la riverfundo ( mergo metas ilin profunde sub la surfacon ).
function konstruiMarlaraksxanMalneton(): SpecoMalneto {
  const grupo = new THREE.Group();
  const korpaMaterialo = new THREE.MeshStandardMaterial({
    color: 0xc8b090, transparent: true, opacity: 0o3/0o4,
    depthWrite: false, side: THREE.DoubleSide, roughness: 0o1/0o2,
  });
  // Eta korpo — malgranda sfero.
  const korpo = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o10, 0o10, 0o6), korpaMaterialo);
  korpo.name = "korpo";
  grupo.add(korpo);

  // Rostro — eta tubo antaŭen.
  const rostro = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o100, 0o1/0o100, 0o3/0o20, 0o6), korpaMaterialo);
  rostro.rotation.x = Math.PI / 0o2;
  rostro.position.z = 0o3/0o40;
  grupo.add(rostro);

  // Ok kruroj — longegaj maldikaj cilindroj, sternitaj eksteren-malsupren.
  // Ĉiu paro havas ankaŭ antaŭen/malantaŭen disvastigon laŭ la korpo ( kiel
  // vera marlaraksxo ), kaj ĉiu kruro elkreskas el la korposurfaco — la
  // ankro sidas sur la sfero ( 0o1/0o10 ), ne for de ĝi.
  // La antaŭa harfina maldikeco ( 0.01 ) malaperis en la akva profundo.
  // Pli dikaj, kontrastaj kruroj restas legeblaj sen pligrandigi la korpon.
  const kruraGeometrio = new THREE.CylinderGeometry(0o2/0o100, 0o2/0o100, 1, 0o10);
  const kruraMaterialo = new THREE.MeshStandardMaterial({
    color: 0xd8b890, transparent: false, opacity: 1,
    // La akvo ne skribas profundon ( depthWrite false en akvo.ts ), do la
    // kruroj restas videblaj tra la travidebla akvo — sed konstruaĵoj ( kiuj
    // skribas profundon ) nun ĝuste kovras ilin, anstataŭ lasi ilin brili tra
    // la muroj ( tio okazis kiam depthTest estis malŝaltita ).
    depthWrite: true, depthTest: true, side: THREE.DoubleSide,
    roughness: 0o1/0o2, emissive: 0x382818, emissiveIntensity: 0o1/0o10,
  });
  const supren = new THREE.Vector3(0, 1, 0);
  const direkto = new THREE.Vector3();
  for ( let k = 0; k < 0o4; k++ ) {
    // Kvar paroj laŭ la korpo — malantaŭen ĝis antaŭen ( ±z ).
    const zDisvastigo = ( k / 0o4 - 0o3/0o10 ) * 0o2;
    for ( const s of [ 0o1, -0o1 ] ) {
      // Direkto. Eksteren ( ±x ), malsupren, kaj antaŭe/malantaŭe laŭ la paro.
      direkto.set(
        s * Math.sin(0o5/0o10),
        -Math.cos(0o5/0o10),
        zDisvastigo
).normalize();
      const kruro = new THREE.Mesh(kruraGeometrio, kruraMaterialo);
      kruro.name = "kruro";
      kruro.scale.y = 0o3/0o2; // longa kruro
      kruro.renderOrder = 6;
      kruro.quaternion.setFromUnitVectors(supren, direkto);
      // La baza pozo estas konservata en la malneto; la efektiva klono ricevas
      // sian propran typed-kvaternionon en konstruiBestojn ( userData ne taŭgas
      // por THREE.Quaternion, ĉar Object3D.clone serialigas ĝin al JSON ).
      // Ankru la kruron sur la korposurfaco kaj etendu laŭ la direkto
      // ( la cilindro longas 0o3/0o2, do ĝi etendiĝas de 0o1/0o10 ĝis 0o15/0o10 ).
      kruro.position.copy(direkto).multiplyScalar(0o1/0o10 + 0o3/0o4);
      grupo.add(kruro);
    }
  }

  return { malneto: grupo, platigxo: new THREE.Vector3(0o1, 0o1, 0o1), supro: 0o1/0o10, speco: "marlaraksxo", mergo: 0o2 };
}

// akvajMalnetoj — La kvin akvaj speco-malnetoj, konstruitaj nur unufoje kaj
// stokitaj module-nivele. Ĉiu besto estas klono de sia malneto, do la metado
// de multaj bestoj ne rekreu kanvasajn teksturojn aŭ geometriojn po voko.
let akvajMalnetojStoko: SpecoMalneto[] | null = null;
function akvajMalnetoj(): SpecoMalneto[] {
  if ( !akvajMalnetojStoko ) {
    const teksajxo = kreiKombovicanTeksajxon();
    akvajMalnetojStoko = [
      konstruiBeroanMalneton(teksajxo),
      konstruiMnemiopsanMalneton(teksajxo),
      konstruiPleŭrobrakianMalneton(teksajxo),
      konstruiGlacifisanMalneton(),
      konstruiMarlaraksxanMalneton(),
    ];
  }
  return akvajMalnetojStoko;
}

// konstruiBestojn — Metu la bestojn en la riveron. Hazardaj pozicioj laŭ la
// riverkurbiĝo, evitante la dokojn. Ili flosas ĉe la akvosurfaco ( aŭ marŝas
// pli profunde ) kaj naĝas per pulsoj ( vidu gxisdatigiBestojn ).
//     @param kvanto ( number ) - Kiom da bestoj.
//     @param riverFn ( funkcio ) - Rivercentra funkcio z(x).
//     @param akvoYFn ( funkcio ) - Akvosurfaca alta funkcio y(x).
//     @param duonaLargho ( number ) - Duon-larĝo de la rivero.
// Reuzataj matematikaj objektoj por la marŝa animacio — la kruroj ne
// bezonas krei novajn vektorojn aŭ kvaternionojn ĉikadre.
const kruroBataAkso = new THREE.Vector3(0, 0, 1);
const kruroLevaAkso = new THREE.Vector3(1, 0, 0);
const kruroBataKvaterniono = new THREE.Quaternion();
const kruroLevaKvaterniono = new THREE.Quaternion();
const kruroAnimKvaterniono = new THREE.Quaternion();
const kruroDirekto = new THREE.Vector3();
const kruroBazaDirekto = new THREE.Vector3(0, 1, 0);
const kruroDuonoLonga = 0o3/0o4;

// ekstraktuBestajnPartojn — Trovu la korpon, la voston kaj la animeblajn
// partojn de besto-klono, kaj konservu la bazan kruro-pozon por la marŝa
// animacio ( vidu gxisdatigiBestojn ). Reuzata de konstruiBestojn kaj
// konstruiMetitanBeston — ambaŭ dividas la saman ekstraktan logikon.
function ekstraktuBestajnPartojn(grupo: THREE.Group) {
  const korpo = grupo.getObjectByName("korpo") as THREE.Mesh;
  const vosto = grupo.getObjectByName("vosto") as THREE.Object3D | undefined;
  const animajxoj = grupo.children.filter(c => c !== korpo && c !== vosto);
  // La glacifisa korpo estas ĉeno de segmentoj ( ankaŭ infanoj, do ili fallas
  // en animajxojn ) kaj la naĝiloj sidas sur la segmentoj. La animacio trafas
  // ilin laŭ la nomoj, tra la tuta klono ( getObjectByName estas rekursiva ).
  const segmentoj: THREE.Object3D[] = [];
  grupo.traverse(o => { if (o.name === "segmento" ) segmentoj.push(o); });
  const naĝiloj: THREE.Object3D[] = [];
  grupo.traverse(o => {
    if ( o.name === "dorsa" || o.name === "analo" || o.name === "brusta" || o.name === "pelva" ) {
      naĝiloj.push(o);
    }
  });
  const bazajKruroj = animajxoj
    .filter(parto => parto.name === "kruro").map(kruro => {
      // La cilindro estas centrita sur sia longo ( 1.5 unuoj post la
      // skalo ), do la vera artik-loko estas ĉe ĝia supra fino. Konservu
      // ĝin aparte por ke la piedo svingu sen ŝiriĝi for de la korpo.
      kruroBazaDirekto.set(0, 1, 0).applyQuaternion(kruro.quaternion).normalize();
      return {
        kruro,
        q: kruro.quaternion.clone(),
        ankro: kruro.position.clone().sub(kruroBazaDirekto.clone().multiplyScalar(kruroDuonoLonga)),
      };
    });
  return { korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj };
}

export function konstruiBestojn(sceno: THREE.Scene,
  kvanto: number,
  riverFn: ( x: number ) => number,
  akvoYFn: ( x: number ) => number,
  duonaLargho: number,
  lago?: { x: number; z: number; r: number; nivelo: number }
): BestoSistemo {
  const bestoj: Besto[] = [];
  const malnetoj = akvajMalnetoj();

  // La pentrita akvaj-bestoj zono ( la skulptilo ) — la bestoj naĝas nur en
  // la pentritaj akvaj ĉeloj ( hazarda ĉelo kiel ankro ). La defaŭltaj lokoj
  // estas bakitaj en la tavolon; malplena zono signifas neniajn bestojn.
  const akvajZonoj = trovuBestajnZonojn(1, true);
  const pentritaj = akvajZonoj.length > 0;

  for ( let i = 0; i < kvanto && pentritaj; i++ ) {
    // Ĉiu besto ankoras ĉe hazarda pentrita akva ĉelo — lago aux rivero laŭ
    // la ĉelo. La lagaj bestoj ricevas la ĉelon kaj restas ĉirkaŭ ĝi,
    // anstataŭ sekvi la riverkurbon.
    const loko = akvajZonoj[( Math.random() * akvajZonoj.length ) | 0];
    const enLago = !!lago && cxuEnLago(loko.x, loko.z);
    let x = 0, zOfseto = 0, cz = 0;
    if ( enLago ) {
      x = loko.x + ( Math.random() - 0o1/0o2 ) * 0o6;
      cz = loko.z + ( Math.random() - 0o1/0o2 ) * 0o6;
    } else {
      x = loko.x;
      zOfseto = loko.z - riverFn(loko.x);
    }
    // La speco-mikso sekvas la biomon de la akvo. La rivero kaj la lago estas
    // la AKVA biomo ( la skulptita masko ) — la ktenoforoj kaj la marlaraksxo
    // estas la kutimaj akvaj specoj, dum la glacifiso preferas malvarman
    // montaran akvon ( se la skulptilo iam levus montaran lagon ).
    const zAkvo = enLago ? cz : riverFn(x) + zOfseto;
    const speco = biomo(x, zAkvo) === "montaro"
      ? malnetoj[3 + ( Math.random() < 0o1/0o2 ? 0 : 1 )]
      : malnetoj[( Math.random() * malnetoj.length ) | 0];
    // Klono kunhavas la geometriojn/materialojn de la malneto.
    const grupo = speco.malneto.clone();
    const { korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj } = ekstraktuBestajnPartojn(grupo);
    const platigxo = speco.platigxo;
    const grandeco = 0o1/0o2 + Math.random() * 0o3/0o4;
    grupo.scale.set(grandeco * platigxo.x, grandeco * platigxo.y, grandeco * platigxo.z);
    // La grupo sidas tiel, ke la korpo estas plejparte subakva — nur la supro
    // restas ĉe la surfaclinio ( plus la mergo de la fundaj bestoj ), supren
    // kaj malsupren kun la bobado ( vidu gxisdatigiBestojn ). La akvosurfaco
    // venas de akvaNivelo — la SAMA funkcio, kiun uzas la naĝanto kaj la kanuo.
    // La malnova procedura akvoYFn situas kelkajn unuojn super la skulptita
    // akvo, do la bestoj flosis en la aero super la rivero kaj la lago.
    const zLoko = enLago ? cz : riverFn(x) + zOfseto;
    const nivelo = akvaNivelo(x, zLoko);
    const profundo = Math.max(0, nivelo - alteco(x, zLoko));
    const supro = speco.supro * grandeco;
    // La fundaj bestoj ( glacifiso ) naĝas antaŭ la fundo — la mergo sekvas la
    // lokan profundon, sed restas malfermo sub la korpo.
    const mergo = ( speco.mergo ?? 0 )
      + ( speco.fundaMergo ? Math.max(0, Math.min(speco.fundaMergo * profundo, profundo - 0o6/0o10)) : 0 );
    const bazaY = -( supro + mergo ) + ( Math.random() - 0o1/0o2 ) * 0o3/0o20;
    grupo.position.set(x, nivelo + bazaY, zLoko);
    grupo.rotation.y = Math.random() * Math.PI * 0o2;
    sceno.add(grupo);

    bestoj.push({
      grupo, korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj,
      x, zOfseto, cz, enLago, bazaY, nivelo,
      direkto: Math.random() * Math.PI * 0o2,
      turno: 0,
      phase: Math.random() * Math.PI * 0o2,
      amplitudo: ( enLago ? 0o3 : 0o3 + Math.random() * 0o6 ) * ( speco.ampleksaMultoblo ?? 0o1 ),
      rapido: ( 0o1/0o4 + Math.random() * 0o3/0o10 ) * ( speco.rapidaMultoblo ?? 0o1 ),
      speco: speco.speco,
    });
  }

  return { bestoj, riverFn, akvoYFn, lago };
}

// konstruiMetitanBeston — UNU ktenoforo cxe preciza pozicio ( la objekta ilo
// de la terena skulptilo ). La besto ankoras cxe ( x, z ), naĝas enLago-stile
// ( eta oscilado cxirkau la ankro — la enLago-vojo de gxisdatigiBestojn ) kaj
// flosas sur la DONITA akvosurfaco ( nivelo ), ne sur la komuna lago.
//     @param specoIndex ( number ) - 0=Beroe, 1=Mnemiopsis, 2=Pleŭrobrakia,
//         3=Glacifiso, 4=Marlaraksxo.
//     @param x, z ( number ) - La ankro ( monda pozicio ).
//     @param akvoY ( number ) - La akvosurfaco tie.
//     @param grandeco ( number ) - La skala faktoro.
//     @returns La besto ( jam aldonita al la sceno ), aux null.
export function konstruiMetitanBeston(sceno: THREE.Scene,
  specoIndex: number,
  x: number, z: number,
  akvoY: number,
  grandeco: number
): Besto | null {
  const malnetoj = akvajMalnetoj();
  const speco = malnetoj[Math.max(0, Math.min(malnetoj.length - 1, specoIndex | 0))];
  const grupo = speco.malneto.clone();
  const { korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj } = ekstraktuBestajnPartojn(grupo);
  const platigxo = speco.platigxo;
  grupo.scale.set(grandeco * platigxo.x, grandeco * platigxo.y, grandeco * platigxo.z);
  const profundo = Math.max(0, akvoY - alteco(x, z));
  const supro = speco.supro * grandeco;
  const mergo = ( speco.mergo ?? 0 )
    + ( speco.fundaMergo ? Math.max(0, Math.min(speco.fundaMergo * profundo, profundo - 0o6/0o10)) : 0 );
  const bazaY = -( supro + mergo ) + ( Math.random() - 0o1/0o2 ) * 0o3/0o20;
  grupo.position.set(x, akvoY + bazaY, z);
  grupo.rotation.y = Math.random() * Math.PI * 0o2;
  sceno.add(grupo);
  return {
    grupo, korpo, vosto, animajxoj, bazajKruroj, segmentoj, naĝiloj,
    x, zOfseto: 0, cz: z, enLago: true,
    nivelo: akvoY, bazaY,
    direkto: Math.random() * Math.PI * 0o2,
    turno: 0,
    phase: Math.random() * Math.PI * 0o2,
    amplitudo: 0o3 * ( speco.ampleksaMultoblo ?? 0o1 ),
    rapido: ( 0o1/0o4 + Math.random() * 0o3/0o10 ) * ( speco.rapidaMultoblo ?? 0o1 ),
    speco: speco.speco,
  };
}

// lastaBestoTempo — la antaŭa animacia tempo, por la kadra tempopaso. La glata
// turniĝo de la glacifiso bezonas ĝin, kaj gxisdatigiBestojn ricevas nur la
// absolutan tempon.
let lastaBestoTempo = 0;

// gxisdatigiBestojn — Naĝiga animacio. La bestoj oscilas laŭ la rivero,
// svingas la kapon, bobas kaj pulse kunpremas la korpon ( kiel kombuloj ).
// La glacifiso turniĝas al la direkto de sia movo, kliniĝas en la turnojn,
// ondigas la korpon per la segmenta ĉeno kaj remas per la brustaj ventumiloj.
//     @param s ( BestoSistemo ) - La besta sistemo.
//     @param t ( number ) - Malsupra tempo.
export function gxisdatigiBestojn(s: BestoSistemo, t: number): void {
  // La kadra tempopaso — limigita, ĉar la unua kadro kaj paŭzoj donas grandajn
  // valorojn, kaj la turniĝo tiam saltus.
  const dt = Math.min(0o1/0o10, Math.max(0o1/0o1000, t - lastaBestoTempo));
  lastaBestoTempo = t;
  for ( const b of s.bestoj ) {
    const x = b.x + Math.sin(t * b.rapido + b.phase) * b.amplitudo;
    const bobo = Math.sin(t * 0o2 + b.phase * 0o3) * 0o3/0o20;
    let z: number;
    if ( b.enLago && ( b.nivelo !== undefined || s.lago ) ) {
      z = b.cz + Math.sin(t * 0o3/0o4 + b.phase * 0o2) * 0o1;
    } else {
      z = s.riverFn(x) + b.zOfseto + Math.sin(t * 0o3/0o4 + b.phase * 0o2) * 0o1;
    }
    // La akvosurfaco de la besto ( b.nivelo, kalkulita ĉe la metado el
    // akvaNivelo ) — la sama surfaco, ĉe kiu naĝas la ludanto.
    const surfaco = b.nivelo ?? ( b.enLago && s.lago ? s.lago.nivelo : s.akvoYFn(x) );
    const y = surfaco + b.bazaY + bobo;
    b.grupo.position.set(x, y, z);
    b.grupo.rotation.y = b.direkto + Math.sin(t * b.rapido + b.phase) * 0o1/0o4
      + Math.sin(t * 0o1/0o2 + b.phase) * 0o1/0o4;
    b.grupo.rotation.z = Math.sin(t * 0o3/0o4 + b.phase) * 0o3/0o40;
    // Naĝa pulso — la korpo larĝiĝas kaj mallarĝiĝas ritme. La glacifiso ne
    // pulsiĝas — ĝia korpo estas segmenta ĉeno, do la pulso trancxus la
    // artikojn.
    if ( b.speco !== "glacifiso" ) {
      const pulso = 0o1 + Math.sin(t * 0o3 + b.phase * 0o2) * 0o1/0o20;
      b.korpo.scale.set(pulso, 0o1, pulso);
    }
    const oscilado = Math.sin(t * b.rapido + b.phase);
    const subtila = Math.sin(t * 0o1/0o2 + b.phase * 0o3);
    // Specio-specifaj movoj. ĉiu besto havas propran pulson anstataŭ la sama
    // generika skalo. La partoj estas jam en la klono, do ĉi tie ni nur ŝanĝas
    // transformojn — neniuj geometrioj aŭ objektoj estas kreitaj ĉiukadre.
    if ( b.speco === "beroe" ) {
      b.grupo.rotation.x = subtila * 0o3/0o100;
      b.grupo.rotation.z = oscilado * 0o1/0o100;
    } else if ( b.speco === "mnemiopsis" ) {
      for ( let i = 0; i < b.animajxoj.length; i++ ) {
        const lobo = b.animajxoj[i];
        if ( lobo.name === "lobo" ) lobo.rotation.x = Math.sin(t * 0o2 + b.phase + i) * 0o2/0o10;
      }
      b.grupo.rotation.x = subtila * 0o4/0o100;
    } else if ( b.speco === "pleurobrakia" ) {
      let i = 0;
      for ( const palpo of b.animajxoj ) {
        if ( palpo.name === "palpo" ) {
          palpo.rotation.x = Math.sin(t * 0o1/0o2 + b.phase + i) * 0o2/0o10;
          palpo.rotation.z = Math.cos(t * 0o3/0o4 + b.phase + i) * 0o1/0o10;
          i++;
        }
      }
      b.grupo.rotation.x = subtila * 0o3/0o100;
    } else if ( b.speco === "glacifiso" ) {
      // ⟨ La glacifisa naĝado 📃 ⟩ — tri movoj, kiuj kune aspektigas veran
      // fiŝon. 1. La kapo TURNIGXAS al la direkto de la movo ( la analiza
      // derivaĵo de la oscila vojo ), kun glata turniĝo kaj kliniĝo en la
      // turnojn — antaŭe la fiŝo tenis fiksan hazardan angulon kaj glitis
      // flanken. 2. La korpa ondo iras malantaŭen tra la segmenta ĉeno ( ĉiu
      // segmento malfruas la antaŭan ) kaj finiĝas ĉe la vosta naĝilo.
      // 3. La brustaj ventumiloj REMAS ( malrapida, larĝa bato ), kaj la
      // pelvaj naĝiloj svingiĝas kiel palpiloj.
      const vx = Math.cos(t * b.rapido + b.phase) * b.amplitudo * b.rapido;
      const vz = Math.cos(t * 0o3/0o4 + b.phase * 0o2) * 0o3/0o4;
      let diferenco = Math.atan2(vx, vz) - b.direkto;
      diferenco = Math.atan2(Math.sin(diferenco), Math.cos(diferenco));
      const turno = diferenco * Math.min(1, 0o4 * dt);
      b.direkto += turno;
      b.turno = turno / dt;
      b.grupo.rotation.y = b.direkto;
      // Kliniĝo — la fiŝo bankas en la turnon, kaj iomete kliniĝas sub la ondo.
      b.grupo.rotation.z = Math.max(-0o6/0o10, Math.min(0o6/0o10, -b.turno * 0o3/0o10))
        + Math.sin(t * 0o3/0o4 + b.phase) * 0o3/0o40;
      // La nazo levigxas dum la supreniĝo ( la derivaĵo de la bobado ).
      b.grupo.rotation.x = -Math.cos(t * 0o2 + b.phase * 0o3) * 0o4/0o100;

      // La korpa ondo — 0o11/0o12 ondoj sekunde, do malrapida naĝa ritmo. La
      // amplekso KRESKAS malantaŭen ( la kapo preskaŭ ne moviĝas, la vosta
      // pedunklo batas ), kaj la fazmalfruo inter la artikoj faras la
      // vojaĝantan ondon. Antaŭe la meza segmento moviĝis PLI ol la vosta, do
      // la fiŝo aspektis kvazaŭ ĝi skuus la ŝultrojn.
      const ondFazo = t * 0o15/0o10 + b.phase * 0o4;
      const ampleksoj = [ 0o7/0o100, 0o17/0o100, 0o24/0o100 ];
      for ( let i = 0; i < b.segmentoj.length; i++ ) {
        const segmento = b.segmentoj[i];
        const fazo = ondFazo - ( i + 1 ) * 0o12/0o10;
        segmento.rotation.y = Math.sin(fazo) * ampleksoj[i];
        // La korpo ankaŭ iomete ruliĝas kun ĉiu bato — la vosto puŝas la
        // akvon flanken, kaj la fiŝo respondas per milda rulo.
        segmento.rotation.z = Math.cos(fazo) * 0o3/0o100 * ( i + 1 );
      }
      if ( b.vosto ) {
        // La vosta naĝilo malfruas plian duonon de la ondo rilate la voston,
        // kaj ĝi ankaŭ turniĝas supren-malsupren ( la vosto "skrapas" la
        // akvon ), kiel vera fiŝa vosto.
        const vostaFazo = ondFazo - 0o3;
        b.vosto.rotation.y = Math.sin(vostaFazo) * ampleksoj[2];
        b.vosto.rotation.x = Math.cos(vostaFazo) * 0o5/0o100;
      }

      // La remado — larĝa malrapida bato de la grandaj brustaj ventumiloj.
      // Glacifisoj REMAS per ili kvazaŭ per remiloj — la bato ( malsupren kaj
      // antaŭen ) estas pli forta, kaj la naĝilo TURNIĜAS ĉirkaŭ sia akso dum
      // la ciklo. Sen tiu plumado la naĝilo videble VANTIS la akvon — ĝi
      // svingiĝis kiel rigida lameno. La du flankoj remas preskaŭ samtempe
      // ( glacifisoj ne alternas ), kun eta malfruo por natura aspekto.
      const remFazo = t * 0o11/0o4 + b.phase;
      // La remo ne estas tute regula — la fiŝo glitas kaj poste denove remas.
      const remForto = 0o4/0o5 + Math.sin(t * 0o7/0o10 + b.phase * 0o2) * 0o2/0o10;
      for ( const naĝilo of b.naĝiloj ) {
        const bazaZ = naĝilo.userData.bazaZ as number | undefined;
        const bazaY = naĝilo.userData.bazaY as number | undefined;
        if ( naĝilo.name === "brusta" && bazaZ !== undefined ) {
          const flanko = Math.sign(bazaZ) || 1;
          const malfruo = naĝilo.position.x > 0 ? 0 : 0o2/0o10;
          const fazo = remFazo + malfruo;
          naĝilo.rotation.z = bazaZ + Math.sin(fazo) * 0o45/0o100 * remForto * flanko;
          // La plumado — la naĝilo turniĝas 90° antaŭ la bato, do ĝi trenas sin
          // tra la akvo dum la reveno kaj puŝas dum la bato.
          if ( bazaY !== undefined ) {
            naĝilo.rotation.y = bazaY + Math.cos(fazo) * 0o3/0o10 * flanko;
          }
          naĝilo.rotation.x = Math.cos(fazo) * 0o1/0o10;
        } else if ( naĝilo.name === "pelva" && bazaZ !== undefined ) {
          naĝilo.rotation.x = Math.sin(t * 0o2 + b.phase) * 0o1/0o10;
          naĝilo.rotation.z = bazaZ
            + Math.sin(t * 0o3/0o2 + b.phase + 0o6/0o10) * 0o1/0o20;
        }
      }
    } else if ( b.speco === "marlaraksxo" ) {
      // Alterna metakrona paŝado. kontraŭaj kruroj laboras kune, dum la
      // apuda paro iom postrestas. Tio aspektas kiel marŝo, ne kiel ok
      // identaj pendoloj. La fazo de la flankoj estas kontraŭa, kaj tiu de
      // la kvar laŭlongaj paroj estas iomete disvastigita por pli glata ondo.
      let i = 0;
      for ( const bazaro of b.bazajKruroj ) {
        const paro = Math.floor(i / 2);
        const flanko = i % 2;
        const fazo = t * 0o33/0o10 + b.phase + paro * 0o7/0o10 + flanko * Math.PI;
        const paŝo = Math.sin(fazo);
        // La kruro antaŭen svingiĝas dum la piedo estas sur la grundo;
        // ĉe la reveno ĝi iom leviĝas kaj retroiras pli rapide.
        const levo = Math.max(0, Math.sin(fazo + Math.PI * 0o1/0o4));
        const svingo = paŝo * 0o14/0o100 + Math.sin(fazo * 2) * 0o3/0o100;
        const klinigxo = levo * 0o16/0o100;
        kruroBataKvaterniono.setFromAxisAngle(kruroBataAkso, svingo);
        kruroLevaKvaterniono.setFromAxisAngle(kruroLevaAkso, klinigxo);
        kruroAnimKvaterniono.copy(kruroBataKvaterniono).multiply(kruroLevaKvaterniono);
        bazaro.kruro.quaternion.copy(bazaro.q).multiply(kruroAnimKvaterniono);

        // Repoziciigu la centron de la cilindro ĉirkaŭ la fiksita artiklo.
        // Sen tio rotacio de la centrita cilindro videble malligas la krurojn.
        // Derivu la direkton el la efektiva fina kvaterniono. La baza
        // direkto jam estas en loka spaco, do apliki la animan kvaternionon
        // al ĝi aparte ne estus ekvivalenta al q * animacio.
        kruroDirekto.set(0, 1, 0).applyQuaternion(bazaro.kruro.quaternion).normalize();
        bazaro.kruro.position.copy(bazaro.ankro).add(kruroDirekto.multiplyScalar(kruroDuonoLonga));
        i++;
      }
      // Malgranda kontraŭbalanco de la korpo helpas la longajn krurojn
      // "porti" la beston dum la alternaj paŝoj.
      b.grupo.rotation.x = subtila * 0o2/0o100 + Math.sin(t * 0o33/0o10 + b.phase) * 0o1/0o100;
      b.grupo.rotation.z = Math.cos(t * 0o33/0o10 + b.phase) * 0o1/0o100;
    }
  }
}

// ⟪ Neĝopetreloj ( ſᶘᴜ ſȷᴜ ſɭэ ſɭɔ / Pagodroma nivea ) ⟫
//
// Pure blankaj antarktaj marbirdoj. Malgranda ovala korpo, longaj maldikaj
// glit-flugiloj kaj nigraj beko kaj okuloj. Ili rondflugas super la lago kaj
// la rivero — glitas en larĝaj kurboj kun rapidaj flugil-batoj kaj kliniĝas
// en la turnoj, kiel la veraj neĝopetreloj super la malferma maro.
//
// La birdoj estas konstruitaj kiel malneto ( geometrioj/materialoj unufoje ),
// kaj ĉiu birdo estas klono de la malneto — la klonoj kunhavas la samajn
// geometriojn kaj materialojn, do la aro ne kostas teksturojn po unu.

export interface Petrelo {
  grupo: THREE.Group;
  flugiloj: THREE.Object3D[];   // maldekstra kaj dekstra flugiloj ( bato )
  cx: number; cz: number;       // centro de la flugcirklo
  radio: number;                // radiuso de la flugcirklo
  bazaY: number;                // baza flugalto
  rapido: number;               // angula rapido ĉirkaŭ la cirklo
  phase: number;
  direkto: number;              // flug-direkto. 1 laŭhorloĝe, -1 kontraŭhorloĝe
  batoFazo: number;             // fazo de la flugil-bato
  batoRapido: number;           // bata frekvenco ( rad/s )
  banko: number;                // kliniĝo en la kurbon ( rad )
  skalo: number;                // subtila individua grandeco
  flapAmp: number;              // individua bata amplekso
}

export interface PetreloSistemo {
  petreloj: Petrelo[];
}

// kreiPlumaranTeksajxon — Procedura plumaro-teksajxo. Sur la korpo la plumoj
// sterniĝas laŭlonge ( vertikalaj strioj ĉirkaŭ la lathe ); sur la flugiloj
// ili kuras korde ( de la antaŭa al la malantaŭa rando ) kun mola ombro ĉe la
// malantaŭa rando, kiel la malhelaj finoj de la primaraj plumoj.
function kreiPlumaranTeksajxon(lauxlonga: boolean): THREE.CanvasTexture {
  const s = 0o200; // 128 × 128
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = lauxlonga ? "#f8f8f8" : "#f0f0f8";
    kunteksto.fillRect(0, 0, s, s);
    // Plum-linioj — delikataj kurbaj strioj.
    kunteksto.strokeStyle = "rgba(178,196,202,0.4)";
    kunteksto.lineWidth = 0o1/0o10;
    for ( let i = 0; i < 0o14; i++ ) {
      const t = ( i + 0o1/0o2 ) / 0o14;
      kunteksto.beginPath();
      if ( lauxlonga ) {
        // Longe — vertikalaj strioj, milde kurbantaj ĉirkaŭ la korpo.
        const x = ( i * 0o11 ) % s;
        kunteksto.moveTo(x, 0);
        kunteksto.quadraticCurveTo(x + 0o10, s / 2, x + 0o4, s);
      } else {
        // Korde — horizontalaj strioj laŭ la kordo.
        const y = t * s;
        kunteksto.moveTo(0, y);
        kunteksto.quadraticCurveTo(s / 2, y + 0o3, s, y);
      }
      kunteksto.stroke();
    }
    // Mola ombro ĉe la malantaŭa rando ( la primaraj plumoj kaj iliaj pintoj ).
    if ( !lauxlonga ) {
      const ombro = kunteksto.createLinearGradient(0, s, 0, 0);
      ombro.addColorStop(0, "rgba(120,150,160,0.3)");
      ombro.addColorStop(0o3/0o10, "rgba(120,150,160,0.08)");
      ombro.addColorStop(1, "rgba(120,150,160,0)");
      kunteksto.fillStyle = ombro;
      kunteksto.fillRect(0, 0, s, s);
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 0o4 });
}

// kunfandiPoMaterialo — Kunfandu grupon da meshxoj en UN meshon po materialo
// ( la sama skemo kiel vojoj.ts ). La loka transformo de ĉiu parto bakiĝas en
// ĝian geometrion, do la kunfandita mesho bildigas precize la saman aferon —
// nur per malpli da desegnoj.
//     @param partoj ( Mesh[] ) - La partoj kunfandotaj.
//     @returns La kunfanditaj meshoj ( po unu materialo ).
function kunfandiPoMaterialo(partoj: THREE.Mesh[]): THREE.Mesh[] {
  const listoj = new Map<THREE.Material, THREE.BufferGeometry[]>();
  for ( const p of partoj ) {
    p.updateMatrix();
    const geometrio = p.geometry.clone().applyMatrix4(p.matrix);
    const materialo = p.material as THREE.Material;
    const listo = listoj.get(materialo);
    if ( listo ) listo.push(geometrio); else listoj.set(materialo, [ geometrio ]);
  }
  const meshoj: THREE.Mesh[] = [];
  for ( const [ materialo, listo ] of listoj ) {
    const kunigita = listo.length === 1 ? listo[0] : mergeGeometries(listo, false);
    if ( listo.length > 1 ) for ( const g of listo ) g.dispose();
    if ( kunigita ) meshoj.push(new THREE.Mesh(kunigita, materialo));
  }
  return meshoj;
}

// konstruiPetrelanMalneton — Unu neĝopetrelo, konstruita kiel malgranda vera
// marbirdo. flulinia korpo kun plena brusto kaj ronda ventro ( platigita
// flanke ), mallonga kolo kun levita kapo, tubo-naza hokbeko ( la marko de la
// petreloj ), malhela lora makulo antaŭ la okuloj, kojna vosto, etaj kunfalditaj
// piedoj kaj longaj maldikaj glit-flugiloj kun svingita mano kaj skulptitaj
// primaraj plumoj. La plumaro estas kradita per procedura teksajxo, kaj la
// flugiloj sidas en pivotaj grupoj ĉe la ŝultroj por ke la bato ( rotation.z )
// levu kaj mallevu ilin samfaze. La birdo rigardas +z.
// La senmovaj partoj kunfandiĝas ( vidu kunfandiPoMaterialo ) — la malneto
// konservas 8 meshojn anstataŭ 22, kaj la birdaro desegniĝas per tiom malpli.
export function konstruiPetrelanMalneton(): THREE.Group {
  const grupo = new THREE.Group();
  const blanka = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: kreiPlumaranTeksajxon(true),
    roughness: 0o3/0o4, metalness: 0,
  });
  const flugilaMaterialo = new THREE.MeshStandardMaterial({
    color: 0xffffff, map: kreiPlumaranTeksajxon(false),
    roughness: 0o3/0o4, metalness: 0, side: THREE.DoubleSide,
  });
  const primaraMaterialo = new THREE.MeshStandardMaterial({
    color: 0xb8c8d0, roughness: 0o4/0o4, metalness: 0, side: THREE.DoubleSide,
  });
  const nigra = new THREE.MeshStandardMaterial({ color: 0x101018, roughness: 0o3/0o10 });
  const ventra = new THREE.MeshStandardMaterial({ color: 0xe0e8f0, roughness: 0o3/0o4 });
  const ombra = new THREE.MeshStandardMaterial({ color: 0xc8d8d8, roughness: 0o3/0o4 });

  // Korpo — spindela lathe, turnita horizontale ( nazo +z ), svelta flanke
  // ( platigita laŭ x ) kaj profunda ventre, kiel ĉe vera marbirdo.
  const korpaProfilo: [ number, number ][] = [
    // La korpo finiĝas ĉe la kolo ( z≈0.6 ), ne per longa izolita pinto;
    // tiel la kapo kaj beko vere kuniĝas kun la torso.
    [ 0o1/0o200, 0o60/0o100 ], [ 0o3/0o200, 0o54/0o100 ], [ 0o7/0o200, 0o50/0o100 ],
    [ 0o13/0o200, 0o40/0o100 ], [ 0o21/0o200, 0o20/0o100 ], [ 0o23/0o200, 0 ],
    [ 0o22/0o200, -0o2/0o10 ], [ 0o20/0o200, -0o4/0o10 ], [ 0o15/0o200, -0o6/0o10 ],
    [ 0o11/0o200, -0o7/0o10 ], [ 0o5/0o200, -0o10/0o10 ], [ 0o1/0o200, -0o104/0o100 ],
  ];
  const korpaGeometrio = new THREE.LatheGeometry(
    korpaProfilo.map(( [ r, y ] ) => new THREE.Vector2(r, y)), 0o14);
  korpaGeometrio.rotateX(Math.PI / 2);
  const korpo = new THREE.Mesh(korpaGeometrio, blanka);
  korpo.name = "korpo";
  korpo.scale.set(0o7/0o10, 1, 1);
  grupo.add(korpo);

  // Ŝultroj kaj brusta kresto — molaj volumoj transigas la korpon al la
  // flugiloj kaj rompas la simplan "sfero sur bastono"-aspekton.
  const brustaKresto = new THREE.Mesh(new THREE.SphereGeometry(0o12/0o100, 0o10, 0o10), blanka);
  brustaKresto.scale.set(0o7/0o10, 0o7/0o10, 0o14/0o10);
  brustaKresto.position.set(0, 0o5/0o100, 0o32/0o100);
  grupo.add(brustaKresto);
  for ( const s of [ 0o1, -0o1 ] ) {
    const sx = new THREE.Mesh(new THREE.SphereGeometry(0o11/0o100, 0o10, 0o10), ombra);
    sx.scale.set(0o72/0o100, 0o5/0o10, 0o15/0o10);
    // Ŝultro-kovrilo. ĝi devas sidi ĉe la flugilradiko, ne ĉe la kolo.
    sx.position.set(s * 0o14/0o100, 0o10/0o100, 0o2/0o100);
    sx.rotation.z = -s * 0o12/0o10;
    sx.name = "sxultro";
    grupo.add(sx);
  }

  // Kirilo ( sternumo ) — mola ventra linio, la brustosto sub la plumaro.
  const kirilo = new THREE.Mesh(new THREE.BoxGeometry(0o6/0o100, 0o2/0o100, 0o44/0o100), ventra);
  kirilo.position.set(0, -0o10/0o100, -0o12/0o100);
  grupo.add(kirilo);

  // Kolo — mallonga ligo inter la korpo kaj la levita kapo.
  const kolo = new THREE.Mesh(new THREE.CylinderGeometry(0o4/0o100, 0o6/0o100, 0o6/0o100, 0o10), blanka);
  kolo.rotation.x = -0o1/0o10;
  kolo.position.set(0, 0o13/0o100, 0o44/0o100);
  grupo.add(kolo);

  // Kapo — malgranda levita sfero ĉe la kolopinto.
  const kapo = new THREE.Mesh(new THREE.SphereGeometry(0o11/0o100, 0o10, 0o10), blanka);
  kapo.scale.set(0o7/0o10, 1, 1);
  kapo.position.set(0, 0o17/0o100, 0o47/0o100);
  grupo.add(kapo);

  // Beko — tubo-naza hokbeko. supraj kaj malsupraj mandibloj, hoka pinto kaj
  // la karakteriza naztubo de la petreloj supre. La konusoj rigardas antaŭen
  // ( +z ). pinto ĉe la supro de la konuso.
  const makzelo = new THREE.Mesh(new THREE.ConeGeometry(0o2/0o100, 0o16/0o100, 0o6), nigra);
  makzelo.rotation.x = Math.PI / 2 + 0o10/0o100;   // antaŭen, iomete malsupren
  makzelo.position.set(0, 0o16/0o100, 0o60/0o100);
  grupo.add(makzelo);
  const hoko = new THREE.Mesh(new THREE.ConeGeometry(0o1/0o100, 0o3/0o100, 0o4), nigra);
  hoko.rotation.x = Math.PI / 2 + 0o36/0o100;      // hoka pinto kurbiĝanta malsupren
  hoko.position.set(0, 0o14/0o100, 0o66/0o100);
  grupo.add(hoko);
  const subaMakzelo = new THREE.Mesh(new THREE.ConeGeometry(0o1/0o100, 0o6/0o100, 0o4), nigra);
  subaMakzelo.rotation.x = Math.PI / 2 + 0o4/0o100; // antaŭen, iomete sub la supra
  subaMakzelo.position.set(0, 0o7/0o100, 0o52/0o100);
  grupo.add(subaMakzelo);
  const naztubo = new THREE.Mesh(new THREE.CylinderGeometry(0o1/0o100, 0o1/0o100, 0o4/0o100, 0o4), nigra);
  naztubo.rotation.x = -0o2/0o10;                   // klinita malantaŭen sur la beko
  naztubo.position.set(0, 0o20/0o100, 0o62/0o100);
  grupo.add(naztubo);

  // Okuloj kaj la malhela lora makulo antaŭ ili ( la marko de la neĝopetrelo ).
  for ( const s of [ 0o1, -0o1 ] ) {
    const okulo = new THREE.Mesh(new THREE.SphereGeometry(0o2/0o100, 0o6, 0o4), nigra);
    okulo.position.set(s * 0o7/0o100, 0o24/0o100, 0o46/0o100);
    grupo.add(okulo);
    const lora = new THREE.Mesh(new THREE.SphereGeometry(0o1/0o100, 0o4, 0o4), nigra);
    lora.scale.set(1, 0o7/0o10, 0o3/0o2);
    lora.position.set(s * 0o16/0o200, 0o21/0o100, 0o44/0o100);
    grupo.add(lora);
  }

  // Vosto — kojna klingo, platigita kaj iomete levita dum flugo.
  const vosto = new THREE.Mesh(new THREE.ConeGeometry(0o7/0o100, 0o21/0o100, 0o4), blanka);
  vosto.name = "vosto";
  vosto.scale.set(1, 1, 0o26/0o100);
  vosto.rotation.x = -Math.PI / 2 + 0o12/0o100;
  // La centra vosto ekiras el la mallarĝiĝanta malantaŭo de la korpo.
  // La korpa profilo finiĝas je z≈-1.04; la vosto devas eliri el tiu pinto,
  // ne esti kaŝita en la malantaŭa ventro.
  vosto.position.set(0, 0o1/0o100, -0o100/0o100);
  grupo.add(vosto);
  // Du flankaj vostoplumoj donas klaran forkecan silueton en la flugo.
  for ( const s of [ 0o1, -0o1 ] ) {
    const vostoplumo = new THREE.Mesh(new THREE.ConeGeometry(0o4/0o100, 0o22/0o100, 0o4), blanka);
    vostoplumo.scale.set(0o6/0o10, 0o7/0o10, 0o22/0o100);
    vostoplumo.rotation.x = -Math.PI / 2 + 0o5/0o100;
    vostoplumo.rotation.z = s * 0o63/0o100;
    // La flankaj vostoplumoj interkovru la centran voston kaj la korpan pinton.
    vostoplumo.position.set(s * 0o5/0o100, 0o1/0o100, -0o100/0o100);
    vostoplumo.name = "vostoplumo";
    grupo.add(vostoplumo);
  }

  // Piedoj — etaj malhelaj piedetoj kunfalditaj sub la vosto dum flugo.
  for ( const s of [ 0o1, -0o1 ] ) {
    const piedo = new THREE.Mesh(new THREE.SphereGeometry(0o2/0o100, 0o4, 0o4), nigra);
    piedo.scale.set(1, 0o1/0o2, 0o3/0o2);
    piedo.position.set(s * 0o3/0o100, -0o10/0o100, -0o64/0o100);
    grupo.add(piedo);
  }

  // Flugiloj — longaj maldikaj glit-flugiloj kun brako kaj svingita mano.
  // La mano svingiĝas malantaŭen kaj ties malantaŭa rando estas skulptita en
  // kvar primaraj plumoj ( pintoj malantaŭen, kiel ĉe vera marbirdo ). La
  // geometrio kuŝas en la XY-ebeno ( +x = enen, +y = antaŭen ) kaj estas
  // turnita horizontale, do la flugilo etendiĝas laŭ ±x kaj svingiĝas laŭ -z.
  const flugilaFormo = new THREE.Shape();
  flugilaFormo.moveTo(0o1/0o100, 0o3/0o100);
  // Antaŭa rando. brako ( larĝa ) → kubuto → mano ( svingita, mallarĝa ) → pinto.
  flugilaFormo.quadraticCurveTo(0o17/0o100, 0o5/0o100, 0o33/0o100, 0o6/0o100);
  flugilaFormo.quadraticCurveTo(0o44/0o100, 0o7/0o100, 0o44/0o100, 0o7/0o100);
  flugilaFormo.quadraticCurveTo(0o76/0o100, 0o4/0o100, 0o124/0o100, -0o2/0o100);
  flugilaFormo.quadraticCurveTo(0o136/0o100, -0o6/0o100, 0o132/0o100, -0o12/0o100);
  // Malantaŭa rando de la mano. kvar primaraj plumoj ( skulptitaj pintoj ).
  flugilaFormo.lineTo(0o116/0o100, -0o16/0o100);
  flugilaFormo.lineTo(0o103/0o100, -0o13/0o100);
  flugilaFormo.lineTo(0o73/0o100, -0o17/0o100);
  flugilaFormo.lineTo(0o62/0o100, -0o14/0o100);
  flugilaFormo.lineTo(0o54/0o100, -0o16/0o100);
  // Malantaŭa rando de la brako reen al la radiko.
  flugilaFormo.quadraticCurveTo(0o21/0o100, -0o10/0o100, 0o1/0o100, -0o3/0o100);
  flugilaFormo.closePath();
  const flugilaGeometrio = new THREE.ShapeGeometry(flugilaFormo, 0o14);
  flugilaGeometrio.rotateX(-Math.PI / 2);
  // Dihedro — la pinto leviĝas super la korpo ( la glitanta marbirda pozo ).
  flugilaGeometrio.rotateZ(0o4/0o100);
  // Reversu laŭ la flugakso — la antaŭa rando ( +y en la formo ) mapiĝas al +z
  // post rotateX(-π/2), sed la birdo flugas +z. La turno de π metas la antaŭan
  // randon antaŭen kaj la svingon malantaŭen, kiel ĉe vera flugila silueto.
  flugilaGeometrio.rotateY(Math.PI);
  for ( const s of [ 0o1, -0o1 ] ) {
    const flugilaGrupo = new THREE.Group();
    flugilaGrupo.name = "flugilo";
    // La pivotpunkto koincidas kun la ŝultro-kovrilo kaj la supra parto de la
    // korpo, por ke la flugiloj ne aspektu kiel apartaj platoj.
    flugilaGrupo.position.set(s * 0o14/0o100, 0o10/0o100, 0o2/0o100);
    const flugilo = new THREE.Mesh(flugilaGeometrio, flugilaMaterialo);
    // Plilongigu la flugilon ( 1.25× ) por la longa glit-flugila proporcio de la
    // marbirdo. La spegulilo estas inversigita ( -s ), ĉar la geometrio nun
    // etendiĝas laŭ -x post la reverso — la spegulo re-aligas ĝin al la ĝusta
    // flanko, konservante la spegulan simetrion de la primaraj plumoj.
    flugilo.scale.x = -s * 0o12/0o10;
    flugilaGrupo.add(flugilo);
    // Tri subtilaj primaraj plum-paneloj super la malantaŭa parto de ĉiu
    // flugilo. Ili donas ritmon al la plata silueto sen aldoni pezajn modelojn.
    // Ĉiuj tri havas la saman lokon, la saman skalon kaj la saman bat-angulon
    // ( vidu gxisdatigiPetrelojn — la angulo ne dependas de k ), do ili
    // kunfandiĝas en unu geometrion — la animacio restas identa.
    const primarajGeometrioj: THREE.BufferGeometry[] = [];
    for ( let k = 0; k < 0o3; k++ ) {
      const primaraFormo = new THREE.Shape();
      const radiko = 0o124/0o100 + k * 0o16/0o100;
      primaraFormo.moveTo(radiko, -0o10/0o100);
      primaraFormo.lineTo(radiko + 0o13/0o100, -0o13/0o100);
      primaraFormo.lineTo(radiko + 0o6/0o100, -0o23/0o100);
      primaraFormo.lineTo(radiko - 0o5/0o100, -0o22/0o100);
      primaraFormo.closePath();
      const primaraGeo = new THREE.ShapeGeometry(primaraFormo);
      primaraGeo.rotateX(-Math.PI / 2);
      primaraGeo.rotateZ(0o4/0o100);
      primaraGeo.rotateY(Math.PI);
      primarajGeometrioj.push(primaraGeo);
    }
    const primaraKunigita = mergeGeometries(primarajGeometrioj, false);
    for ( const g of primarajGeometrioj ) g.dispose();
    if ( primaraKunigita ) {
      const primara = new THREE.Mesh(primaraKunigita, primaraMaterialo);
      primara.scale.x = -s * 0o12/0o10;
      primara.position.y = 0o1/0o100;
      primara.name = "primara";
      flugilaGrupo.add(primara);
    }
    grupo.add(flugilaGrupo);
  }

  // ⟪ Kunfando 📃 ⟫ — el la 22 meshoj de la birdo nur la flugiloj moviĝas
  // ( 2 grupoj kun la flugilo kaj la primaraj paneloj ). La ceteraj — la korpo,
  // la kapo, la beko, la okuloj, la vosto, la piedoj, la ŝultroj — estas
  // senmovaj unu rilate la alian, do ili kunfandiĝas en unu meshon po
  // materialo. Tiel la birdo desegniĝas per 8 meshoj anstataŭ 22, kaj la bildo
  // estas la sama — la kunfanditaj geometrioj portas la samajn transformojn.
  const statikaj = grupo.children.filter(c => ( c as THREE.Mesh ).isMesh) as THREE.Mesh[];
  for ( const m of kunfandiPoMaterialo(statikaj) ) grupo.add(m);
  for ( const m of statikaj ) grupo.remove(m);

  return grupo;
}

// petrelaMalneto — La petrela malneto, konstruita nur unufoje kaj stokita
// module-nivele. Ĉiu birdo estas klono de ĝi, do metado de pluraj birdoj ne
// rekreu la plumarajn kanvasajn teksturojn kaj geometriojn po voko.
let petrelaMalnetoStoko: THREE.Group | null = null;
function petrelaMalneto(): THREE.Group {
  if ( !petrelaMalnetoStoko ) petrelaMalnetoStoko = konstruiPetrelanMalneton();
  return petrelaMalnetoStoko;
}

// kreiPetrelon — Klono de la petrela malneto ĉe flugcirklo ( cx, cz, radio ).
// Reuzata de konstruiPetrelojn kaj konstruiMetitanPetrelon — ambaŭ dividas
// la saman lokan kaj petrelan kread-logikon.
//     @param altecoFn ( funkcio ) - Terena alteco ( x, z ) → y.
//     @returns La petrelo ( jam aldonita al la sceno ).
function kreiPetrelon(sceno: THREE.Scene,
  cx: number, cz: number, radio: number,
  altecoFn: ( x: number, z: number ) => number
): Petrelo {
  const grupo = petrelaMalneto().clone();
  // Rekolektu la flugilojn de la klono ( la infana ordo konserviĝas ).
  const flugiloj = grupo.children.filter(c => c.name === "flugilo");
  // Flugalto. Super la PLEJ ALTA tereno ĉirkaŭ la flugcirklo ( specimena ĉe
  // la rando, ĉar la birdo rondflugas radiuson radio ), por ke neniu birdo
  // enkaverniĝu en montetojn aŭ montodeklivojn. Super la lago la tereno
  // estas sub akvo, do la akvonivelo transprenas kiel suba limo.
  let altaTereno = altecoFn(cx, cz);
  for ( let k = 0; k < 0o6; k++ ) {
    const a = k / 0o6 * Math.PI * 0o2;
    altaTereno = Math.max(altaTereno, altecoFn(cx + Math.cos(a) * radio, cz + Math.sin(a) * radio));
  }
  const bazaY = Math.max(altaTereno, 0o2) + 0o14 + Math.random() * 0o16;
  const phase = Math.random() * Math.PI * 0o2;
  const direkto = Math.random() < 0o1/0o2 ? 1 : -1;
  grupo.position.set(cx + Math.cos(phase) * radio, bazaY, cz);
  // Direktu laŭ la tangento de la flugcirklo. Laŭhorloĝaj birdoj turniĝas
  // per -ang, kontraŭhorloĝaj bezonas plian turnon de π ( alie ili flugus
  // vosto-antaŭe ).
  grupo.rotation.y = -phase + Math.PI * ( 1 - direkto ) / 2;
  const skalo = 0o72/0o100 + Math.random() * 0o2/0o10;
  grupo.scale.setScalar(skalo);
  sceno.add(grupo);
  return {
    grupo, flugiloj, cx, cz, radio, bazaY,
    rapido: 0o1/0o4 + Math.random() * 0o2/0o10,
    phase, direkto,
    batoFazo: Math.random() * Math.PI * 0o2,
    batoRapido: 0o4 + Math.random() * 0o4,
    banko: 0o3/0o20 + Math.random() * 0o3/0o40,
    skalo, flapAmp: 0o6/0o10 + Math.random() * 0o2/0o10,
  };
}

// konstruiPetrelojn — Metu la neĝopetrelojn flugantaj super la biomoj. Triono
// rondflugas super la montara biomo ( la neĝaj pintoj — la neĝopetrela hejmo ),
// la cetero super la akva biomo ( la lago, se ĝi ekzistas, kaj la rivero ).
// Ĉiu birdo sekvas sian propran cirklon ĉirkaŭ hazarda centro, je flugalto
// super la tereno ( aŭ super la akvonivelo super la lago ).
//     @param kvanto ( number ) - Kiom da birdoj.
//     @param altecoFn ( funkcio ) - Tereno, por la flugalto.
//     @param riveroFn ( funkcio ) - Rivercentra funkcio z(x).
//     @param lago ( objekto ) - La lago. x, z, r ( la birdoj rondflugas ĝin ).
export function konstruiPetrelojn(sceno: THREE.Scene,
  kvanto: number,
  altecoFn: ( x: number, z: number ) => number,
  riveroFn: ( x: number ) => number,
  lago?: { x: number; z: number; r: number }
): PetreloSistemo {
  const petreloj: Petrelo[] = [];

  // La pentrita petrela zono ( la skulptilo ) — la petreloj rondflugas
  // hazardan pentritan ĉelon. La defaŭltaj lokoj estas bakitaj en la tavolon;
  // malplena zono signifas neniajn petrelojn. Triono de la birdoj rondflugas
  // super la montaraj pentritaj ĉeloj, la cetero super la ceteraj ( akvo,
  // ebenaĵo, valo ) — la sama proporcio kiel la defaŭlta konduto.
  const petrelajZonoj = trovuBestajnZonojn(2, false);
  const montarajZonoj = petrelajZonoj.filter(l => biomo(l.x, l.z) === "montaro");
  const ceterajZonoj = petrelajZonoj.filter(l => biomo(l.x, l.z) !== "montaro");
  const pentritaj = petrelajZonoj.length > 0;

  for ( let i = 0; i < kvanto && pentritaj; i++ ) {
    // La pentrita zono elektas la fluglokon. Triono el la montaraj ĉeloj, la
    // cetero el la ceteraj — kun falo al la alia aro se unu mankas.
    const superMonto = i % 3 === 0;
    let aro = superMonto ? montarajZonoj : ceterajZonoj;
    if ( !aro.length ) aro = superMonto ? ceterajZonoj : montarajZonoj;
    const loko = aro[( Math.random() * aro.length ) | 0];
    const cx = loko.x + ( Math.random() - 0o1/0o2 ) * 0o6;
    const cz = loko.z + ( Math.random() - 0o1/0o2 ) * 0o6;
    petreloj.push(kreiPetrelon(sceno, cx, cz, 0o10 + Math.random() * 0o30, altecoFn));
  }

  return { petreloj };
}

// konstruiMetitanPetrelon — UNU neĝopetrelo cxe preciza pozicio ( la objekta
// ilo de la terena skulptilo ). La birdo rondflugas cirklon de radiuso radio
// cxirkau la ankro ( x, z ) — la sama Petrelo-strukturo kiel la zonaj
// petreloj, do la flug-animacio funkcias sen sxangxo.
//     @param x, z ( number ) - La ankro.
//     @param altecoFn ( funkcio ) - Tera alta funkcio ( flugalto sekvas la
//         plej altan terenon cxirkau la flugcirklo ).
//     @param radio ( number ) - La flugradiuso.
//     @param skalo ( number ) - La grandeco.
//     @returns La petrelo ( jam aldonita al la sceno ), aux null.
export function konstruiMetitanPetrelon(sceno: THREE.Scene,
  x: number, z: number,
  altecoFn: ( x: number, z: number ) => number,
  radio: number,
  skalo: number
): Petrelo | null {
  const petrelo = kreiPetrelon(sceno, x, z, radio, altecoFn);
  petrelo.grupo.scale.setScalar(skalo);
  petrelo.skalo = skalo;
  return petrelo;
}

// gxisdatigiPetrelojn — Flug-animacio. Ĉiu birdo rondflugas sian cirklon laŭ
// sia direkto ( ±1 ), direktante laŭ la tangento kaj kliniĝante en la kurbon
// ( la banko turniĝas kun la flug-direkto, do ĉiu birdo kliniĝas internen ).
// La flugiloj batas en eksplodoj — la neĝopetreloj glitas inter la batoj —
// kun konstanta dihedro.
//     @param s ( PetreloSistemo ) - La petrela sistemo.
//     @param t ( number ) - Malsupra tempo.
export function gxisdatigiPetrelojn(s: PetreloSistemo, t: number): void {
  for ( const p of s.petreloj ) {
    const ang = t * p.rapido * p.direkto + p.phase;
    const x = p.cx + Math.cos(ang) * p.radio;
    const z = p.cz + Math.sin(ang) * p.radio;
    const y = p.bazaY + Math.sin(t * 0o7/0o10 + p.phase * 0o2) * 0o3/0o10;
    p.grupo.position.set(x, y, z);
    // Direkto laŭ la tangento de la cirklo. La laŭhorloĝaj birdoj ( direkto 1 )
    // rigardas per -ang; la kontraŭhorloĝaj ( direkto -1 ) bezonas plian turnon
    // de π, ĉar la tangento tiam montras la alian vojon — sen tio ili flugus
    // vosto-antaŭe. Kliniĝo en la kurbon ( la banko turniĝas kun la
    // flug-direkto, do ĉiu birdo kliniĝas en sian propran kurbon ).
    p.grupo.rotation.y = -ang + Math.PI * ( 1 - p.direkto ) / 2;
    p.grupo.rotation.z = p.banko * p.direkto;
    // Flugil-bato. Eksplodoj de rapida batado inter glitoj ( la bato-amplitudo
    // ŝvelas kaj malkreskas ritme, kiel ĉe fluganta petrelo ).
    const bataSkalo = Math.sqrt(Math.max(0, Math.sin(t * 0o13/0o10 + p.batoFazo * 0o2)));
    const bato = Math.sin(t * p.batoRapido + p.batoFazo) * bataSkalo * p.flapAmp;
    // La flugo alternas inter glita kaj kelkaj rapidaj batoj. la korpo levas
    // la nazon ĉe la supren-bato kaj malstreĉiĝas dum longa glito.
    const glito = 0o1 - bataSkalo;
    p.grupo.rotation.x = Math.sin(t * 0o7/0o10 + p.phase) * 0o3/0o100 + bato * 0o1/0o20;
    p.grupo.position.y = y + glito * 0o1/0o10;
    // La maldekstra flugilo speguliĝas, do ĝia baza lev-angulo estas NEGATIVA
    // por ke la ripoza dihedro estu simetria ( ambaŭ pintoj same levitaj ) —
    // la spegulo plus la kontraŭa signo tenas la batojn samfazaj.
    p.flugiloj[0].rotation.z = 0o1/0o10 + bato;
    p.flugiloj[1].rotation.z = -( 0o1/0o10 + bato );
    for ( const flugilo of p.flugiloj ) {
      for ( const parto of flugilo.children ) {
        if ( parto.name === "primara" ) {
          parto.rotation.z = Math.sin(t * p.batoRapido + p.batoFazo) * 0o2/0o100;
        }
      }
    }
  }
}
