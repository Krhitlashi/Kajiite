// ≺⧼ La urbaj tipoj 🏙️ ⧽≻
// La datumaj tipoj de la urba konstruado — la nebulaj makuloj ( NebulaSistemo ),
// la tuta urba sistemo ( UrbaSistemo ), la skulptitaj urboj, vojoj kaj
// platformoj ( SkulptaUrbo, SkulptaVojo, SkulptaPlatformo ) kaj la metitaj
// objektoj de la terena skulptilo ( MetitaObjekto ).
import * as THREE from "three";
import { KonstruSpec } from "../../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import { RiverData } from "../../../eskekoj/medio/akvo.js";
import { BestoSistemo, PetreloSistemo } from "../../../eskekoj/shalaj-specioj/bestoj.js";
import { MangxajxItemo } from "../../../eskekoj/mebloj/mangxajxoj/tipoj.js";
import type { VojDifino } from "../../../eskekoj/medio/vojoj/tipoj.js";
import type { AldonaBloko } from "../krado/tipoj.js";
import { HxeuxfaSistemo } from "../../../eskekoj/konstruajxoj/hxeuxfa/tipoj.js";
import { Kanoto } from "../../../eskekoj/medio/transporto.js";
import type { Figuro, Vesto } from "../../../eskekoj/shalaj-specioj/homoj.js";
import type { InternaSistemo } from "../../../eskekoj/konstruajxoj/internoj/tipoj.js";
import type { Krasesxagxo } from "../../../eskekoj/konstruajxoj/krasesxagxa-kosmosxipo.js";


// NebulaSistemo — la nebulaj makuloj kiel UNU GPU-punktsistemo ( antaŭe
// ĉirkaŭ 0o70 individuaj SpriteMaterial-oj, unu shader-programo kaj unu
// draw-call po sprajto ). La makuloj restas ankrigitaj al la mondo; la
// vertica shadero drivas ilin orienten kaj ĉirkaŭvolvas ilin per uTime —
// neniu CPU-ĝisdatigo po kadro, nur uTime.
export interface NebulaSistemo {
  punktoj: THREE.Points;
  uTime: { value: number };
}

export interface UrbaSistemo {
  konstruSpecoj: KonstruSpec[];
  kolizioj: { x: number; z: number; r: number }[];
  // Doka kolizio — rektangulaj platformoj (kun rotacio) por bloki suben-iron.
  // y = monda supro de la platformo ( la nivelo sur kiu oni piediras ).
  dokoKolizioj: { x: number; z: number; w: number; d: number; rot: number; y: number }[];
  selektajxoj: THREE.Mesh[];
  konstruGrupoj: THREE.Group[];
  vojSpecimenoj: THREE.Vector3[];
  placajNodoj: [ number, number ][];
  // La akvo de la skulptita tereno ( la masko ) estas la akvo — la proceduraj
  // rivero/lago meshxoj konstruigxas nur sen skulptita datumaro.
  riverData: RiverData | null;
  riveroNordOrienta: RiverData | null;
  lago: RiverData | null;
  skulptaAkvo: RiverData | null;
  bestoj: BestoSistemo;
  petreloj: PetreloSistemo;
  lampSistemo: HxeuxfaSistemo;
  nebulSistemo: NebulaSistemo;
  kanuoj: Kanoto[];
  // Pussxlefo-beroj — la manĝeblaj travideblaj beroj en la mondo.
  pussxlefoBeroj: MangxajxItemo[];
  npcoj: Figuro[];
  internaSistemo: InternaSistemo;
  // La spacosxipo — objekto de SKULPTA_OBJEKTOJ ( null se neniu metita ).
  xipo: Krasesxagxo | null;
  vojDifinoj: VojDifino[];
  vojDuonLargho: ( g: number ) => number;
  NPCLOKOJ: [ number, number ][];
  VESTA_LISTO: Vesto[];
}

// SkulptaUrbo — unu urbo de la terena skulptilo ( SKULPTA_URBOJ en
// kantaoj/tero-datumaro/krado.ts ). La krada arangxo kaj la ofseto de la urbo en la mondo
// — la sama informo kiun la ludo antauxe havis kiel du koditajn urbojn.
export interface SkulptaUrbo {
  nomo: string;
  arangxaGrando: number;
  blokaGrando: "unu" | "kvar";
  ofsX: number;
  ofsZ: number;
  // La kvar keŭfĥesoj ĉirkaŭ la centro ( defaŭlte malŝaltitaj — la malnova
  // konduto montris ilin nur ĉe la unu-bloka krado ).
  keuxfhxeso?: boolean;
  // La kvar-lampa strato-ŝablono ( defaŭlte ŝaltita — ĉiu krada urbo havis
  // lampojn antaŭ la flago ).
  lampoj?: boolean;
  // La ALDONAJ blokoj de la urbo ( la terena skulptilo metas ilin aparte de
  // la krado — la spacosxipa stacio de la cefa urbo estas unu ). La ludo
  // konstruas ilin per la bloka konstruanto ( aldoniBlokon ).
  aldonajBlokoj?: AldonaBloko[];
  // La konservitaj ĉel-superoj de la terena skulptilo ( "c,r" → tipo aux
  // "c,r,SUB" → tipo por la kvar-blokaj sub-konstruajxoj ). La ludo aplikas
  // ilin al la generita krado — la samaj redaktoj kiujn la Krado-langeto
  // faras ( vidu superajElDatumo en krado.ts ).
  superoj?: Record<string, string>;
}

// SkulptaVojo — unu mond-nivela vojo ( SKULPTA_VOJOJ en kantaoj/tero-datumaro/vojoj.ts ).
// Polilinio kun nomo, larĝo ( plena larĝo en mond-unuoj ) kaj punktoj.
export interface SkulptaVojo {
  nomo: string;
  larĝo: number;
  punktoj: [ number, number ][];
  // pontoLarĝo — la larĝo de la PONTO, se ĉi tiu vojo trapasas akvon. Malplena
  // signifas la ordinaran vojan larĝon. Ĝi permesas konstrui estontajn pontojn
  // de alia larĝo ol sia vojo sen ŝanĝi la vojon mem — do ponto povas resti
  // mallarĝa apud pli larĝaj vojoj sen entrudiĝi en ilin. La tuta ponto ( la
  // deko, la andezita arko kaj la balustrado ) uzas ĉi tiun larĝon.
  pontoLarĝo?: number;
}

// SkulptaPlatformo — unu doka platformo ( SKULPTA_DOKOJ en
// kantaoj/tero-datumaro/vojoj.ts ). Monda pozicio ( x, z ), profundo kaj turno. La
// TURNO ( rotacio, kiel la metitaj objektoj ) decidas, al kiu flanko la pinto
// montras: 0 = la landa rando norde kaj la akva pinto suden ( la kajo de la
// urbo ), Math.PI = la landa rando sude kaj la pinto norde ( la malproksima
// bordo de la rivero, por ke la boatoj havu surterigxon ankaŭ tie ).
export interface SkulptaPlatformo {
  x: number;
  z: number;
  profundo: number;
  rotacio?: number;      // turno ĉirkaŭ la vertikala akso ( defaŭlte 0 )
}

// MetitaObjekto — unu objekto metita per la objekta ilo de la terena
// skulptilo ( iloj/tero-skulptilo/tero-skulptilo.html ), legata el SKULPTA_OBJEKTOJ.
export interface MetitaObjekto {
  x: number;              // monda pozicio
  z: number;
  speco: string;          // "betulo" | "lariko" | "hxsxaksxlefo" | "pussxlefo"
                          // | "akvabesto" | "petrelo" | "npco" | "sanktejo" | "turo"
                          // | "domo" | "mangxejo" | "kasafeo" | "stacio" | "hxeuxfo"
                          // | "keuxfhxeso" | "kanuo" | "spacosxipo"
  skalo?: number;         // grandeco ( defaŭlte 1 )
  rotacio?: number;       // turno ( NPC-oj, rokoj, kanuoj, konstruajxoj, mebloj )
  bestospeco?: number;    // ktenofora speco ( akvabesto ). 0-4
  radio?: number;         // flugradiuso ( petrelo )
  vesto?: number;         // vesta indekso ( npco )
  harstilo?: number;      // harstila indekso ( npco ). 0=mallonga, 1=longa
  filikaSpeco?: number;   // filika vario ( filiko ). 0=verda, 1=purpura
  stilo?: string;         // kanua stilo ( "baza" | "satala" )
}
