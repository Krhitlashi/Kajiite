// Urbo — urba konstruo. konstruajxoj, vojoj, placoj, lampoj, vegetajxo, nebulo, akvo, kanuoj
// Modula krada sistemo — vojoj kaj konstruajxaj pozicioj derivitaj de kradaj parametroj.
import * as THREE from "three";
import { konstruiSatalon, TIPARO, KonstruSpec } from "../assets/konstruajxoj/satalaj-konstruajxoj.js";
import { kreiNebulanTeksajxon } from "../assets/komunajxoj/teksajxoj.js";
import { konstruiRiveron, konstruiRiveronNordan, konstruiLagon, konstruiSkulptitanAkvon, RiverData } from "../assets/medio/akvo.js";
import { konstruiBestojn, BestoSistemo, konstruiPetrelojn, PetreloSistemo,
  konstruiMetitanBeston, konstruiMetitanPetrelon } from "../assets/shalaj-specioj/bestoj.js";
import { metiArbojn, konstruiArbaron, konstruiFilikojn, konstruiPurpurajnPlantojn, konstruiPurpurajnFilikojn,
  konstruiAltajnPurpurajnFilikojn, konstruiLikenSxtonojn, konstruiLarikon, konstruiHerbon, konstruiMusxajnMontetojn,
  konstruiFalintajnTrunkojn, konstruiCetkuojn, konstruiLikenojn, konstruiHxsxaksxlefojn, konstruiTrunkajnLikenojn,
  metiArbojnCxirkauLagon, konstruiHerbonCxirkauLagon, konstruiCakeojn, metiMontajnArbojn, konstruiMontajnRokojn,
  konstruiMontajnSubkreskajxojn, konstruiLaganSubkreskajxojn, kronaRadiusoLarika, kronaRadiusoHxsxaksxlefa,
  konstruiPussxlefojn, metiPussxlefojn, VALAJ_BIOMOJ, EBENAJAJ_BIOMOJ, MONTAJ_BIOMOJ,
  AKVAJ_PLANTOJ_BIOMOJ, EKVIZETO_BIOMOJ, konstruiMetitanRokon, konstruiMetitanFilikon } from "../assets/shalaj-specioj/vegetajxo.js";
import { kreiPussxlefojnBerojn, MangxajxItemo } from "../assets/mebloj/mangxajxoj.js";
import { konstruiVojojn, konstruiSpronon, konstruiPeriferiajnPlatformojn, konstruiIntersekcajnPlatojn, konstruiRondigitanArkon, konstruiRondajnKapojn, VojDifino } from "../assets/medio/vojoj.js";
import { konstruiDokon } from "../assets/medio/doko.js";
import { kreiKradon, tipoDeBloko, kradajDerivajoj, skaniVojanReton, superajElDatumo } from "./krado.js";
import type { KradaArangxo, CellType, AldonaBloko } from "./krado.js";
import { konstruiHxeuxfojn, HxeuxfaSistemo } from "../assets/konstruajxoj/hxeuxfa-lampo.js";
import { konstruiKeuxfhxeso, KeuxfhxesoLoko } from "../assets/mebloj/keuxfhxeso.js";
import { kreiKanoton, Kanoto } from "../assets/medio/transporto.js";
import { konstruiFiguron, gxisdatigiNpc } from "../assets/shalaj-specioj/homoj.js";
import type { Figuro, Vesto } from "../assets/shalaj-specioj/homoj.js";
import { kreiInternanSistemon, InternaSistemo } from "../assets/konstruajxoj/internoj.js";
import { konstruiKrasesxagxon } from "../assets/konstruajxoj/krasesxagxa-kosmosxipo.js";
import type { Krasesxagxo } from "../assets/konstruajxoj/krasesxagxa-kosmosxipo.js";
import { riveroZ, alteco, akvoY, montetaBazo, RIVERA_DUONLARĜO,
  LAGO_X, LAGO_RZ, RIVERA_BUŜO_X, riveraAkvaNivelo, lagoZ, lagoNivelo, lagoRadio, cxuEnLago, akvaNivelo,
  riveroNordOrientaX, riveraNordOrientaNivelo, RIVERA_NORDORIENTA_FONTO_Z,
  RIVERA_NORDORIENTA_DUONLARĜO, RIVERA_NORDORIENTA_BUŜO_Z,
  cxuEnNordorientaRivero, montaroNordOrienta, skulptitaAkvo, skulptaAkvaLimoj, akvo,
  SKULPTA_PASO, SKULPTA_AKVA_NIVELO, SKULPTA_AKTIVA } from "./tereno.js";
import { VESTOJ } from "../assets/vestaro/vestoj.js";
import { skulptitaBesto } from "./tero-datumaro/rultempo.js";
import { SKULPTA_N, SKULPTA_ORIGINO } from "./tero-datumaro/krado.js";
import { SKULPTA_OBJEKTOJ } from "./tero-datumaro/objektoj.js";
import { SKULPTA_URBOJ } from "./tero-datumaro/urboj.js";
import { SKULPTA_VOJOJ, SKULPTA_DOKOJ } from "./tero-datumaro/vojoj.js";

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
  nebuloj: THREE.Sprite[];
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
// src/tero-datumaro/krado.ts ). La krada arangxo kaj la ofseto de la urbo en la mondo
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

// SkulptaVojo — unu mond-nivela vojo ( SKULPTA_VOJOJ en src/tero-datumaro/vojoj.ts ).
// Polilinio kun nomo, larĝo ( plena larĝo en mond-unuoj ) kaj punktoj.
export interface SkulptaVojo {
  nomo: string;
  larĝo: number;
  punktoj: [ number, number ][];
}

// SkulptaPlatformo — unu doka platformo ( SKULPTA_DOKOJ en
// src/tero-datumaro/vojoj.ts ). Monda pozicio ( x, z ) kaj profundo.
export interface SkulptaPlatformo {
  x: number;
  z: number;
  profundo: number;
}

// MetitaObjekto — unu objekto metita per la objekta ilo de la terena
// skulptilo ( iloj/tero-skulptilo.html ), legata el SKULPTA_OBJEKTOJ.
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

// konstruiMetitajnObjektojn — Spawnu la individuajn objektojn de la objekta
// ilo ( SKULPTA_OBJEKTOJ ). plantoj cxe siaj precizaj pozicioj ( la
// pozicio-listaj konstruantoj akceptas unu-elementan liston ), akvaj bestoj
// kaj petreloj en la ekzistantajn animaci-sistemojn ( ili naĝas/flugas cxe la
// ankro ), kaj NPC-oj en la npc-aron ( ili piediras kiel la ceteraj ). La
// kanuoj 🛶 kaj la spacosxipo 🚀 estas ankaŭ objektoj — la kanuoj en la
// kanuan aron ( la fiziko de sperto.ts ), la sxipo en la mondan spacon super
// la cefa stacio. Revenu la konstruitan spacosxipon ( aux null se neniu ).
function konstruiMetitajnObjektojn(
  sceno: THREE.Scene,
  objektoj: MetitaObjekto[],
  altecoFn: ( x: number, z: number ) => number,
  akvoFn: ( x: number, z: number ) => boolean,
  akvaNiveloFn: ( x: number, z: number ) => number,
  bestoj: BestoSistemo,
  petreloj: PetreloSistemo,
  npcoj: Figuro[],
  kanuoj: Kanoto[],
  oraMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial,
  selektajxoj: THREE.Mesh[],
): Krasesxagxo | null {
  const xipoj: Krasesxagxo[] = [];
  for ( const o of objektoj ) {
    const s = o.skalo ?? 1;
    if ( o.speco === "betulo" ) konstruiArbaron(sceno, [ { x: o.x, z: o.z, h: altecoFn(o.x, o.z), s } ]);
    else if ( o.speco === "lariko" ) konstruiLarikon(sceno, [ { x: o.x, z: o.z, h: altecoFn(o.x, o.z), s } ]);
    else if ( o.speco === "hxsxaksxlefo" ) konstruiHxsxaksxlefojn(sceno, [ { x: o.x, z: o.z, h: altecoFn(o.x, o.z), s } ]);
    else if ( o.speco === "pussxlefo" ) konstruiPussxlefojn(sceno, [ { x: o.x, z: o.z, h: altecoFn(o.x, o.z), s } ]);
    else if ( o.speco === "roko" ) konstruiMetitanRokon(sceno, o.x, o.z, altecoFn, s, o.rotacio ?? -1);
    else if ( o.speco === "filiko" ) konstruiMetitanFilikon(sceno, o.x, o.z, altecoFn, s, o.filikaSpeco ?? 0);
    else if ( o.speco === "akvabesto" ) {
      if ( !akvoFn(o.x, o.z) ) continue;   // la akvaj bestoj naĝas nur en akvo
      const b = konstruiMetitanBeston(sceno, o.bestospeco ?? 0, o.x, o.z, akvaNiveloFn(o.x, o.z), s);
      if ( b ) bestoj.bestoj.push(b);
    } else if ( o.speco === "petrelo" ) {
      const p = konstruiMetitanPetrelon(sceno, o.x, o.z, altecoFn, o.radio ?? 4, s);
      if ( p ) petreloj.petreloj.push(p);
    } else if ( o.speco === "npco" ) {
      const v = VESTOJ[( o.vesto ?? 0 ) % VESTOJ.length];
      const fig = konstruiFiguron(v, ( o.harstilo ?? 0 ) === 1 ? "haroLonga" : "haroMalalta");
      const h = altecoFn(o.x, o.z);
      fig.group.position.set(o.x, h, o.z);
      fig.hejmo.set(o.x, h, o.z);
      fig.celo.set(o.x, h, o.z);
      fig.group.rotation.y = o.rotacio ?? 0;
      fig.atendo = Math.random() * 4;
      fig.rapido = 0o55/0o100 + Math.random() * 0o4/0o10;
      sceno.add(fig.group);
      npcoj.push(fig);
    } else if ( o.speco === "kanuo" ) {
      // La kanuoj flosas nur sur akvo ( la fiziko de sperto.ts refreŝigas
      // la nivelon ĉiukadre ). La baza nivelo venas de la akvosurfaca
      // funkcio — la sama kiel la antaŭe koditaj kanuoj.
      if ( !akvoFn(o.x, o.z) ) continue;
      kanuoj.push(kreiKanoton(sceno, o.x, o.z, o.rotacio ?? 0, oraMaterialo,
        akvaNiveloFn(o.x, o.z), o.stilo === "satala" ? "satala" : "baza"));
    } else if ( o.speco === "hxeuxfo" || o.speco === "hxeuxfoPlato" ) {
      // La lampoj kiel OBJEKTOJ jam konstruiĝis en la komuna lampa sistemo
      // ( konstruiUrbon aldonas iliajn lokojn al lampLokoj antaŭ la sistemo
      // — la flamoj animiĝas kune kaj la kolizioj aldoniĝas; la plato de la
      // hxeuxfoPlato-varianto konstruiĝis ankaŭ tie ).
    } else if ( o.speco === "keuxfhxeso" ) {
      // La keŭfĥeso — unu starfrukta strukturo kun ses oraj ripoj ( la sama
      // konstruanto kiel la kradaj keŭfĥesoj ).
      konstruiKeuxfhxeso(sceno, [ { x: o.x, z: o.z, rot: o.rotacio ?? 0 } ], altecoFn, oraMaterialo);
    } else if ( o.speco === "spacosxipo" ) {
      // La spacosxipo flosas super la cefa stacio ( y = 40 — la sama
      // alteco kiel antaŭe ). La stacia enirejo ricevas la flugan altecon
      // malsupre, post la tuta konstruo.
      xipoj.push(konstruiKrasesxagxon(sceno, o.x, 0o40, o.z, oraMaterialo, eniraMaterialo));
    } else if ( o.speco === "sanktejo" || o.speco === "turo" || o.speco === "domo"
        || o.speco === "mangxejo" || o.speco === "kasafeo" || o.speco === "stacio" ) {
      // La individuaj konstruajxoj ( sataloj ) — la samaj specoj kiel la
      // krada paletro ( stacio kiel stacioxipo ), kun la samaj tavoloj kaj
      // altoj kiel la kradaj konstruaĵoj ( kreiSpecon en konstruiKradanUrbon ).
      const tipo = o.speco === "stacio" ? "stacioxipo" : o.speco;
      const niveloj = tipo === "stacioxipo" ? 3 : tipo === "sanktejo" ? 7 : tipo === "turo" ? 0o10 : 4;
      const w = 0o10 * ( o.skalo ?? 1 ), d = w;
      konstruiSatalon({
        x: o.x, z: o.z, type: tipo, name: "objekto",
        niveloj, w, d,
        tieroAlto: tipo === "stacioxipo" ? 0o155/0o40
          : tipo === "turo" ? 0o30/0o10 : tipo === "kasafeo" ? 0o155/0o40 : 0o315/0o100,
        rot: o.rotacio ?? 0, diamond: true, h0: altecoFn(o.x, o.z),
        sube: tipo === "stacioxipo" ? 0 : niveloj, tieroAltoSub: 0o123/0o40,
      }, sceno, selektajxoj);
    }
  }
  return xipoj.length ? xipoj[0] : null;
}

// ⟪ Urba krado 📐 ⟫ — la ĉefurba krado estas DIAMANTA kruca aranĝo kun
// kvar-flanka simetrio. La krada logiko ( kreiKradon, tipoDeRingo,
// tipoDeBloko, fazoDeCelo, kradajDerivajoj kaj la tipoj KradaArangxo / CellType /
// KradaĈelo ) vivas en src/krado.ts — pura modulo komuna kun la terena
// skulptilo ( iloj/tero-skulptilo.html ). La ludo importas ĝin de tie; la
// skulptilo montras kaj redaktas la saman kradon per kreiKradanPlanon ( la
// plena voja/sprona logiko kiel puraj datumoj ).

// KradaUrbaRezulto — la rezulto de konstruiKradanUrbon. la tuta krada urbo
// ( konstruajxoj, voja reto, spronoj, platoj, arkoj, keŭfĥesoj kaj lampaj
// lokoj ) konstruita ĉe donita ofseto. La mond-nivelaj partoj ( rivero,
// dokoj, vegetajxo ) restas en konstruiUrbon, kiu vokas ĉi tiun funkcion por
// la ĈEFA urbo ( unu-bloka, grandeco 3 ) KAJ la TESTA urbo ( kvar-bloka,
// grandeco 2 ) trans la rivero.
interface KradaUrbaRezulto {
  konstruSpecoj: KonstruSpec[];
  kolizioj: { x: number; z: number; r: number }[];
  selektajxoj: THREE.Mesh[];
  konstruGrupoj: THREE.Group[];
  placajNodoj: [ number, number ][];
  vojSpecimenoj: THREE.Vector3[];
  spronajSpecimenoj: THREE.Vector3[];
  lampLokoj: { x: number; z: number; y: number; rotacio?: number }[];
  keuxfhxesoLokoj: KeuxfhxesoLoko[];
  staciaPozicio: [ number, number ];   // la stacioxipo ( la sxipo flugas tie )
  ringoX: number;                       // la unua krada vojo ( la doka avenuo kongruas al gxi )
  sudaVojo: number;                     // la plej suda krada vojo ( la avenuo komencigxas cxe gxi )
}

// konstruiKradanUrbon — Konstruu UNU kradan urbon ĉe donita ofseto. la
// konstruajxoj, la voja reto kun spronoj, la kruciĝaj platoj, la rondigitaj
// arkoj, la keŭfĥesoj kaj la lampaj lokoj. Ĉiuj kradaj derivaĵoj ( PASXO,
// nordaPinto, ringoX, ringoSuda, stacioZ ) estas RELATIVAJ al la krada
// centro — la ofseto aldonigxas al ĉiuj mondaj pozicioj. La ĉefa urbo sidas
// ĉe ( 0, 0 ); la testa kvar-bloka urbo sidas trans la rivero.
function konstruiKradanUrbon(
  sceno: THREE.Scene,
  arangxo: KradaArangxo,
  ofseto: [ number, number ],
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial,
  aldonajBlokoj: AldonaBloko[] = [],
  superoj?: Map<string, CellType>,
): KradaUrbaRezulto {
  const [ ofsX, ofsZ ] = ofseto;
  const ĉeloj = kreiKradon(arangxo);
  // La manaj ĉel-superoj de la skulptilo — la sama aplikado kiel en
  // kreiKradanPlanon ( krado.ts ). Anstataŭigo de ekzistanta ĉelo ŝanĝas
  // ĝian tipon; nova ŝlosilo ALDONAS ĉelon ( la voja reto konstruiĝas
  // ĉirkaŭ ĝi kiel ĉe la generitaj ĉeloj ). La sub-ŝlosiloj ( "c,r,NE" )
  // traktiĝas en la kvar-blokaj sub-konstruajxoj sube.
  if ( superoj ) {
    for ( const [ ŝ, tipo ] of superoj ) {
      const partoj = ŝ.split(",");
      if ( partoj.length !== 2 ) continue;
      const [ c, r ] = partoj.map(Number);
      const ind = ĉeloj.findIndex(( [ lc, lr ] ) => lc === c && lr === r);
      if ( ind >= 0 ) ĉeloj[ind] = [ c, r, tipo ];
      else ĉeloj.push([ c, r, tipo ]);
    }
  }
  const kolizioj: { x: number; z: number; r: number }[] = [];
  // La krado-derivaĵoj — komuna kun la skulptilo ( src/krado.ts ). PASXO 24/40,
  // stacio 24 norde de la pinto, kvadrata stacidoma ringo 24×24 ĉirkaŭ la
  // pinta baranta domo ( norda flanko 12 norde — 0o14 ), BLOKO 8 ( kvar-bloka
  // ofseto — konstruaĵoj je ±8, kompakta bloko 24×24 ).
  const { PASXO, nordaPinto, ringoX, ringoSuda, sudaVojo, stacioZ, staciaRingaNordo, BLOKO } = kradajDerivajoj(arangxo);

  // Konstruu la urbon el la kvadrataj celloj
  let bldgIdx = 0;
  const konstruSpecoj: KonstruSpec[] = [];
  const kreiSpecon = ( x: number, z: number, type: CellType, rot: number, fiksita?: string ): void => {
    // La pentrita "stacio" ĉelo konstruiĝas kiel la kosmoporda stacio
    // ( stacioxipo ) — la sama speco kiel la aŭtomataj stacioj.
    const estasStacio = type === "stacio";
    const specTipo = estasStacio ? "stacioxipo" : type;
    const niveloj = estasStacio ? 3 : type === "sanktejo" ? 7 : type === "turo" ? 0o10 : 4;
    const w = 0o10, d = w;  // square buildings. depth = width
    const tieroAlto = estasStacio ? 0o155/0o40
      : type === "sanktejo" ? 0o30/0o10 : type === "turo" ? 0o30/0o10 : type === "kasafeo" ? 0o155/0o40 : 0o315/0o100;
    // Sub-teraj niveloj bazitaj sur la tavoloj. ĉiu tavolo de la ekstera
    // piramido ricevas egalrespondan sub-teran nivelon, por ke la interno
    // kongruu al la ekstera strukturo ( la diamanta spegulo reflektas nur la
    // supran parton — la sub-teraj niveloj estas entombigitaj sub la spegula
    // ebeno, kaj ilia reflekto aperus SUPER la grundon ).
    const sube = estasStacio ? undefined : niveloj;
    const tieroAltoSub = 0o123/0o40;  // uniforma kel-alto (83/32 = 2.594) por cxiuj tipoj
    konstruSpecoj.push({ x, z, type: specTipo, name: "paq" + bldgIdx, niveloj, w, d, tieroAlto, sube, tieroAltoSub, rot, diamond: true, fixed: fiksita });
    bldgIdx++;
  };
  for ( const [ col, row, type ] of ĉeloj ) {
    const cx = ofsX + col * PASXO, cz = ofsZ + row * PASXO;
    if ( col === 0 && row === 0 ) {
      // La centro — la centra konstruaĵo ( sanktejo ), aŭ la STACIO en la
      // kvar-bloka krado ( "centra konstruaĵo aŭ stacio en la centro" ).
      if ( arangxo.blokaGrando === "kvar" ) {
        konstruSpecoj.push({ x: ofsX, z: ofsZ, type: "stacioxipo", name: "paq" + bldgIdx, niveloj: 3, w: 0o10, d: 0o10, tieroAlto: 0o155/0o40, rot: 0, diamond: true, fixed: "kvar" });
        bldgIdx++;
      } else {
        kreiSpecon(ofsX, ofsZ, type, 0);
      }
      continue;
    }
    if ( arangxo.blokaGrando === "kvar" ) {
      // Kvar-konstruajxa bloko — la ORIGINALA aranĝo. la kvar konstruaĵoj
      // sidas ĉe la kvar anguloj de la bloko ( NE, NW, SW, SE je ±BLOKO ),
      // ĉiu rotaciita al sia bloka flanko ( nordo, okcidento, sudo, oriento ).
      // Ĉiu pordo frontas la vojon sur sia bloka flanko — ĉiu bloko bezonas
      // vojojn sur ĉiuj kvar flankoj ( la voja bloko ).
      const suboj: [ number, number, number ][] = [
        [ BLOKO, BLOKO, 0 ],            // nord-oriento — frontas norden ( +z )
        [ -BLOKO, BLOKO, -Math.PI/2 ],  // nord-okcidento — frontas okcidenten ( -x )
        [ -BLOKO, -BLOKO, Math.PI ],    // sud-okcidento — frontas suden ( -z )
        [ BLOKO, -BLOKO, Math.PI/2 ],   // sud-oriento — frontas orienten ( +x )
      ];
      for ( const [ blx, blz, rot ] of suboj ) {
        // La sub-supero ( "c,r,NE" ktp ) ŝanĝas la INDIVIDUAN konstruaĵon
        // super la blokan miksadon — la sama decido kiel kreiKradanPlanon.
        const subNomo = blx > 0 ? ( blz > 0 ? "NE" : "SE" ) : ( blz > 0 ? "NW" : "SW" );
        const subTipo = superoj?.get(col + "," + row + "," + subNomo);
        kreiSpecon(cx + blx, cz + blz, subTipo ?? tipoDeBloko(type, col, row, blx, blz), rot, "kvar");
      }
    } else {
      kreiSpecon(cx, cz, type, 0);
    }
  }

  // La ALDONAJ blokoj ( la terena skulptilo ) — la spacosxipa stacio de la
  // cefa urbo kaj aliaj ekstraj konstruajxoj, metitaj APARTE de la krada
  // generado. Ili konstruigxas cxe siaj pozicioj ( relativa al la krada
  // centro ). La KONEKTITA bloko kunigxas kun la voja reto ( ĝia ĉelo aligxas
  // al la reto sube kaj la bloko ricevas spronon — kiel la malnova stacidoma
  // ĉelo ); la ceteraj staras solaj. La stacia bloko ( la stacia flago )
  // konstruigxas kiel la kosmoporda stacio ( stacioxipo ); la ceteraj laux
  // sia tipo. En la kvar-bloka krado la stacio restas la CENTRO ( vidu supre ).
  for ( const b of aldonajBlokoj ) {
    const fiksita = b.konektita ? "aldona-konektita" : "aldona";
    if ( b.stacia ) {
      konstruSpecoj.push({ x: ofsX + b.x, z: ofsZ + b.z, type: "stacioxipo", name: "paq" + bldgIdx, niveloj: 3, w: 0o10, d: 0o10, tieroAlto: 0o155/0o40, rot: b.rot ?? 0, diamond: true, fixed: fiksita });
      bldgIdx++;
    } else {
      kreiSpecon(ofsX + b.x, ofsZ + b.z, b.tipo, b.rot ?? 0, fiksita);
    }
  }
  // La konektitaj aldonaj blokoj aldonas sian ĉelon al la voja reto ( post
  // la konstrua buklo — la konstruajxo jam aldoniĝis, nur la reto bezonas la
  // ĉelon por la vicoj/kolumnoj kaj la spronoj ). La ĉelo estas la sama kiel
  // la malnova stacidoma ĉelo — la vojo sude, oriente kaj okcidente.
  for ( const b of aldonajBlokoj ) {
    if ( !b.konektita ) continue;
    const c = Math.round(b.x / PASXO), r = Math.round(b.z / PASXO);
    if ( !ĉeloj.some(( [ lc, lr ] ) => lc === c && lr === r) ) ĉeloj.push([ c, r, "sanktejo" ]);
  }

  // Fiksu teren-alton kaj kolizion por cxiu konstruajxo (vojoj ne bezonataj ankoraux)
  konstruSpecoj.forEach(s => {
    s.h0 = alteco(s.x, s.z);
    kolizioj.push({ x: s.x, z: s.z, r: Math.hypot(s.w, s.d) / 2 + 0o4/0o10 });
  });

  const selektajxoj: THREE.Mesh[] = [];

  // ⟪ Voja reto 📃 ⟫
  const vojDifinoj: VojDifino[] = [];

  // Kolektu cxiujn apartajn kolumnojn kaj vicojn kun ne-nulaj celloj
  const colSet = new Set<number>(), rowSet = new Set<number>();
  for ( const [ c, r, t ] of ĉeloj ) {
    if ( t !== null ) { colSet.add(c); rowSet.add(r); }
  }
  const KOLOJ = [ ...colSet ].sort(( a, b ) => a - b);
  const VICOJ = [ ...rowSet ].sort(( a, b ) => a - b);

  // NS-vojoj pozicioj (inter apudaj kolumnoj)
  const RETO_X: number[] = [];
  for ( let ci = 0; ci < KOLOJ.length - 1; ci++ ) {
    if ( KOLOJ[ci + 1] - KOLOJ[ci] === 1 ) {
      RETO_X.push(ofsX + ( KOLOJ[ci] + KOLOJ[ci + 1] ) / 2 * PASXO);
    }
  }

  // EW-vojoj pozicioj (inter apudaj vicoj)
  const RETO_Z: number[] = [];
  for ( let ri = 0; ri < VICOJ.length - 1; ri++ ) {
    if ( VICOJ[ri + 1] - VICOJ[ri] === 1 ) {
      RETO_Z.push(ofsZ + ( VICOJ[ri] + VICOJ[ri + 1] ) / 2 * PASXO);
    }
  }  // Kvar-bloka krado. ĉiu bloko havas konstruaĵojn sur ĉiuj kvar flankoj, do
  // ĉiu bloko bezonas vojojn sur ĉiuj kvar flankoj ( la voja bloko ). La
  // eksteraj vojoj ( unu pasxon preter la plej ekstera vico/kolumno ) ĉirkaŭas
  // la eksterajn blokojn — la normala krada vojo inter la plej ekstera vico
  // kaj virtuala pli ekstera vico. La unu-bloka krado ne bezonas ilin — ĉiuj
  // konstruaĵoj frontas al la centro, kaj la stacidoma ĉelo ( 0, n+1 ) ricevas
  // la vojon sude, oriente kaj okcidente aŭtomate el la apudaj vicoj/kolumnoj.
  // Ili etendiĝas nur kie reale ekzistas blokoj ( vidu hasCellAt sube ) — la
  // malplenaj korneroj de la diamanto ricevas nenian vojon.
  if ( arangxo.blokaGrando === "kvar" ) {
    const e = ( arangxo.arangxaGrando + 0o1/0o2 ) * PASXO;
    RETO_X.push(ofsX + e, ofsX - e);
    RETO_Z.push(ofsZ + e, ofsZ - e);
  }

  // Konstruajxa rotacio. frontu al centro laux la domina akso — RELATIVA al
  // la krada centro ( la ofseto ne sxovas la frontadon ).
  // (vojoj cxiam kuŝas inter apudaj vicoj/kolumnoj, do fronti al centro = fronti al plej proksima vojo)
  konstruSpecoj.forEach(s => {
    // Kvar-blokaj konstruaĵoj jam havas sian rotacion ( ĉiu frontas sian
    // blokan flankon ) — la centro-fronta regulo validas nur por unu-blokaj.
    if ( s.fixed ) return;
    const rx = s.x - ofsX, rz = s.z - ofsZ;
    if ( rx !== 0 || rz !== 0 ) {
      // La diamanta formo havas NENIAN izolitan korneran ĉelon — ĉiu pordo
      // trovas kradan vojon antaŭ si, do la centro-fronta regulo sufiĉas.
      if ( Math.abs(rx) > Math.abs(rz) ) {
        s.rot = rx > 0 ? -Math.PI / 2 : Math.PI / 2;
      } else {
        s.rot = rz > 0 ? Math.PI : 0;
      }
    }
  });

  const konstruGrupoj: THREE.Group[] = [];
  konstruSpecoj.forEach(s => konstruGrupoj.push(konstruiSatalon(s, sceno, selektajxoj)));

  // Konstruu aron da celloj por rapida sercxo. La eksteraj vojoj ( unu pasxon
  // preter la ekstera vico ) etendiĝas nur kie reale ekzistas blokoj — la
  // malplenaj korneraj ĉeloj de la diamanto ( ±n,±n ) ricevas NENIAN vojon.
  const hasCellAt = ( c: number, r: number ) =>
    ĉeloj.some(( [ lc, lr, lt ] ) => lc === c && lr === r && lt !== null);

  // La veraj rando-nodoj de la voja reto. La finoj de cxiu vojo-linio, kie la
  // segmentoj haltas ( sen aldonaj stumpoj ). Nur tiuj ricevas rondigitajn ĉapojn.
  const placajNodoj: [ number, number ][] = [];
  const cxuNodoValidas = ( x: number, z: number ): boolean => {
    if ( akvo(x, z) ) return false;
    // La urba zono — la krada rando plus libera spaco ( la nodoj de pli
    // grandaj kradoj etendiĝas pli malproksimen ). Relativa al la krada centro.
    if ( Math.hypot(x - ofsX, z - ofsZ) > nordaPinto + 0o100 ) return false;
    for ( const s of konstruSpecoj ) {
      if ( Math.hypot(x - s.x, z - s.z) < Math.max(s.w, s.d) / 2 + 0o14/0o10 ) return false;
    }
    return true;
  };
  const aldoniPlacon = ( x: number, z: number ) => {
    if ( !cxuNodoValidas(x, z) ) return;
    placajNodoj.push([ x, z ]);
  };

  // Noda registro por malkovri L-kornerojn ( kie AMBAU perpendikularaj vojoj
  // finigas samloke ). sx/sz registras la FORAN direkton — la korneran
  // kvadranton — de cxiu voja fino.
  const finoRegistro = new Map<string, { sx: number; sz: number }>();
  const aldoniFinon = ( x: number, z: number, sx: number, sz: number ) => {
    const k = x + "," + z;
    const e = finoRegistro.get(k) || { sx: 0, sz: 0 };
    if ( sx !== 0 ) e.sx = sx;
    if ( sz !== 0 ) e.sz = sz;
    finoRegistro.set(k, e);
    aldoniPlacon(x, z);
  };

  // Realaj intersekcoj de la voja reto ( kie kaj EW kaj NS vojo efektive
  // ekzistas ). Nur tiuj ricevas la kvar-lampan ŝablonon; malplenaj regionoj
  // sen vojo restas sen lampoj.
  const realajIntersekcoj = new Set<string>();
  // La ekstentoj de ĉiu vojo-linio ( kie la segmentoj reale ekzistas ) — por
  // la sprona gardo. sprono estas desegnita nur se ĝi atingas reale
  // ekzistantan vojon ( la vojoj finiĝas antaŭ la pordo, ekz. la sudaj
  // konstruaĵoj de la ĉefa urbo sen avenuo sur la okcidenta flanko ).
  const NS_ekstentoj = new Map<number, [ number, number ]>();   // NS-vojo x → [ zMin, zMax ]
  const EW_ekstentoj = new Map<number, [ number, number ]>();   // EW-vojo z → [ xMin, xMax ]

  // Por cxiu EW-vojo (inter apudaj vicoj), kreu segmentojn inter NS-vojoj.
  // La komuna segmenta skanado ( skaniVojanReton el krado.ts ) trovas la
  // uzeblajn perpendikularajn koordinatojn de ĉiu linio.
  const { EW, NS } = skaniVojanReton(RETO_X, RETO_Z, PASXO, ofsX, ofsZ,
    arangxo.blokaGrando === "unu" ? ( arangxo.arangxaGrando + 1 ) * PASXO : null, hasCellAt);
  for ( const [ roadZ, uzeblaj ] of EW ) {
    for ( const rx of uzeblaj ) realajIntersekcoj.add(rx + "," + roadZ);
    EW_ekstentoj.set(roadZ, [ uzeblaj[0], uzeblaj[uzeblaj.length - 1] ]);
    // Rando-nodoj. La du finoj de cxi tiu EW-linio. La okcidenta fino ( uzeblaj[0] )
    // havas la korpon orienten ( +x ), do la fora kvadranto estas -x; la orienta
    // fino inverse.
    aldoniFinon(uzeblaj[0], roadZ, -1, 0);
    aldoniFinon(uzeblaj[uzeblaj.length - 1], roadZ, 1, 0);
    const w = 0o16/0o10;  // uniform 1.75 half-width
    for ( let i = 0; i < uzeblaj.length - 1; i++ ) {
      const x1 = uzeblaj[i], x2 = uzeblaj[i + 1];
      if ( Math.abs(x2 - x1) > 0o1/0o10 ) {
        vojDifinoj.push({ pts: [ [ x1, roadZ ], [ x2, roadZ ] ], w });
      }
    }
  }

  // Por cxiu NS-vojo (inter apudaj kolumnoj), kreu segmentojn inter EW-vojoj
  for ( const [ roadX, uzeblaj ] of NS ) {
    for ( const rz of uzeblaj ) realajIntersekcoj.add(roadX + "," + rz);
    NS_ekstentoj.set(roadX, [ uzeblaj[0], uzeblaj[uzeblaj.length - 1] ]);
    // Rando-nodoj. La du finoj de cxi tiu NS-linio. La suda fino ( pts[0] ) havas
    // la korpon norden ( +z ), do la fora kvadranto estas -z; la norda fino inverse.
    aldoniFinon(roadX, uzeblaj[0], 0, -1);
    aldoniFinon(roadX, uzeblaj[uzeblaj.length - 1], 0, 1);
    const w = 0o16/0o10;  // uniform 1.75 half-width
    for ( let i = 0; i < uzeblaj.length - 1; i++ ) {
      const z1 = uzeblaj[i], z2 = uzeblaj[i + 1];
      if ( Math.abs(z2 - z1) > 0o1/0o10 ) {
        vojDifinoj.push({ pts: [ [ roadX, z1 ], [ roadX, z2 ] ], w });
      }
    }
  }

  // L-korneroj — nodoj kie AMBAU perpendikularaj vojoj finigas samloke ( la
  // kvar anguloj de la krada rombo ). Tiuj ricevas rondigitan arkon anstatau
  // du interkovritajn cirklajn ĉapojn.
  const arkajNodoj: { x: number; z: number; sx: number; sz: number }[] = [];
  const arkajKlavoj = new Set<string>();
  for ( const [ k, e ] of finoRegistro ) {
    if ( e.sx !== 0 && e.sz !== 0 ) {
      const [ x, z ] = k.split(",").map(Number);
      if ( cxuNodoValidas(x, z) ) {
        arkajNodoj.push({ x, z, sx: e.sx, sz: e.sz });
        arkajKlavoj.add(k);
      }
    }
  }
  for ( let i = placajNodoj.length - 1; i >= 0; i-- ) {
    const [ x, z ] = placajNodoj[i];
    if ( arkajKlavoj.has(x + "," + z) ) placajNodoj.splice(i, 1);
  }
  // T-kunigoj — nodoj kie UNU vojo finiĝas kaj la alia trapasas. La finiĝanta
  // vojo kaj la trapasanta vojo interkovras samplane ĉe la ena angulo ( la
  // samaj bendoj en la sama loko ) kaj la du tavoloj z-flagris laŭ la fotila
  // angulo. La sama levita kruciĝa plato kiel la kvarvojaj kruciĝoj kovras la
  // tutan nodon per UNU surfaco — la vojoj subiras kaj reaperas glate.
  const tNodoj = placajNodoj.filter(( [ px, pz ] ) => realajIntersekcoj.has(px + "," + pz));
  // Fermitaj flankoj por la T-kunigaj platoj — la direkto de la finiĝanta
  // vojo ( unu ne-nula komponanto ). La T-kunigo havas UNU flankon sen vojo,
  // kie la finiĝanta vojo ne daŭrigas; tiu flanko ricevas plenan andezitan
  // strion, por ke la kruciĝo ne lasu tiun flankon malfermita sen bordo.
  //
  // Tra-nodoj — la finiĝanta vojo DAŬRIGAS en la alian direkton ( la ringo
  // etendas la NS-vojon norden ĉe x=±ringoX en la unu-bloka krado, kaj la
  // doka avenuo suden ĉe x=ringoX en ambaŭ kradoj ), do la fermita-flanka
  // strio tranĉus la daŭrantan vojon kaj restus videbla andezita breto trans
  // la vojo. Tiuj nodoj ricevas la kvarvojan platon anstataŭ la T-platon —
  // la strio malaperas kaj la vojo daŭrigas glate tra la kruciĝo.
  const traNodoj = new Set<string>([ `${ofsX + ringoX},${ofsZ + sudaVojo}` ]);
  const tFermitaj = new Map<string, [ number, number ]>();
  for ( const [ tx, tz ] of tNodoj ) {
    const e = finoRegistro.get(tx + "," + tz);
    if ( e && !traNodoj.has(tx + "," + tz) ) tFermitaj.set(tx + "," + tz, e.sx !== 0 ? [ e.sx, 0 ] : [ 0, e.sz ]);
  }
  for ( const [ px, pz ] of placajNodoj ) realajIntersekcoj.delete(px + "," + pz);
  for ( const klavo of arkajKlavoj ) realajIntersekcoj.delete(klavo);

  // Neniu stacidoma ĉelo plu ekzistas en la krado — la stacio de la cefa urbo
  // estas ALDONA bloko ( la skulptilo metas ĝin aparte de la krado ), kaj la
  // kvar-bloka stacio estas la CENTRO ( vidu la konstruan buklon supre ). La
  // aldonaj blokoj ricevas nenian vojan ringon kaj nenian spronon — ili
  // konstruigxas kiel starantaj konstruajxoj cxe siaj pozicioj.

  // Voja duon-larĝo — la segmenta larĝo estas 0o16/0o10, do ĝia duon-larĝo estas 0o7/0o10.
  function vojDuonLargho(_g: number): number {
    return 0o7/0o10;
  }

  // ⟪ Spronvojoj 📃 ⟫
  // La spronaj specimenoj kovras ankaŭ la spur-vojojn, por ke neniu planto
  // povu aperi sur ili ( ili ne estas en vojDifinoj ).
  const spronajSpecimenoj: THREE.Vector3[] = [];
  // La spur-celoj estas la samaj vojo-linioj por ambaŭ kradoj. En la
  // kvar-bloka krado ĉiu bloko havas vojojn sur ĉiuj kvar flankoj ( la voja
  // bloko ), do ĉiu pordo atingas la plej proksiman kradan vojon.
  const spurXoj = RETO_X;
  const spurZoj = RETO_Z;
  // La doka avenuo ( mond-nivela vojo, konstruita poste en konstruiUrbon )
  // daŭrigas la NS-vojon ĉe x=ringoX SUDEN de ĝia fino ( sudaVojo ) ĝis la
  // kajo ( -0o130 ) — la spronoj de la sudaj konstruaĵoj atingas ĝin, do la
  // ekstento de tiu vojo-linio etendiĝas tien. La fina z nur PRECIZIGAS la
  // vojan finon — la avenuo-punktoj de la skulptilo povas komenciĝi iom
  // poste ( aparta redaktebla polilinio ), do la krado ETENDIGAS la linion
  // ĝis la kajo kaj la kunigo restas kontinua sen fendo.
  if ( arangxo.blokaGrando === "unu" ) {
    const ekst = NS_ekstentoj.get(ofsX + ringoX);
    if ( ekst ) ekst[0] = Math.min(ekst[0], ofsZ - 0o130);
  }
  for ( const s of konstruSpecoj ) {
    if ( s.x === ofsX && s.z === ofsZ ) continue;
    // La STARANTaj aldonaj blokoj ricevas nenian spronon ( la voja reto
    // koncernas nur la generitajn ĉelojn — la stacio estas atingebla per la
    // sxipo ). La KONEKTITaj aldonaj blokoj ricevas spronon kiel la malnova
    // stacidoma ĉelo ( ilia ĉelo jam estas en la reto ).
    if ( s.fixed === "aldona" ) continue;
    const rot = s.rot || 0;
    const pordoOffset = s.d / 2 + 0o14/0o10;
    const pordoX = s.x + Math.sin(rot) * pordoOffset;
    const pordoZ = s.z + Math.cos(rot) * pordoOffset;
    // La sprono komencigxas cxe la muro-bazo (ne 0o14/0o10 for), por ke la vojo
    // atingas la konstruajxon kaj estas pli longa.
    const spronoX = s.x + Math.sin(rot) * ( s.d / 2 );
    const spronoZ = s.z + Math.cos(rot) * ( s.d / 2 );

    const fX = Math.sin(rot), fZ = Math.cos(rot);
    let vojX: number, vojZ: number;

    if ( Math.abs(fX) > Math.abs(fZ) ) {
      const signo = fX > 0 ? 1 : -1;
      let celX = signo > 0 ? Math.max(...spurXoj) : Math.min(...spurXoj);
      for ( const rx of spurXoj ) {
        if ( signo > 0 && rx > pordoX && rx < celX ) celX = rx;
        if ( signo < 0 && rx < pordoX && rx > celX ) celX = rx;
      }
      // Neniu vojo antaŭ la pordo ( ekstera konstruaĵo frontanta for de la
      // urbo — sen ringo ne ekzistas vojo tie ) — nenia sprono anstataŭ vojo
      // tra la konstruaĵo.
      if ( ( signo > 0 && celX <= spronoX ) || ( signo < 0 && celX >= spronoX ) ) continue;
      // La celo-vojo devas reale ekzisti ĉe la sprona pozicio — la ekstera
      // parto estas nur blokoj ( neniu ringo ), do la eksteraj konstruaĵoj
      // frontas vojojn kiuj finiĝas antaŭ ili ( la flanka konstruaĵo de la
      // pinta bloko frontas okcidenten, sed la NS-vojo finiĝas ĉe la norda
      // kradvojo ). Nenia pendanta sprono al malplena tero.
      const duonL = 0o7/0o10;
      const ekstX = NS_ekstentoj.get(celX);
      if ( !ekstX || spronoZ < ekstX[0] - duonL || spronoZ > ekstX[1] + duonL ) continue;
      vojX = celX - signo * duonL;
      vojZ = spronoZ;
    } else {
      const signo = fZ > 0 ? 1 : -1;
      let celZ = signo > 0 ? Math.max(...spurZoj) : Math.min(...spurZoj);
      for ( const rz of spurZoj ) {
        if ( signo > 0 && rz > pordoZ && rz < celZ ) celZ = rz;
        if ( signo < 0 && rz < pordoZ && rz > celZ ) celZ = rz;
      }
      // Neniu vojo antaŭ la pordo ( vidu la x-flankan gardon supre ).
      if ( ( signo > 0 && celZ <= spronoZ ) || ( signo < 0 && celZ >= spronoZ ) ) continue;
      // La celo-vojo devas reale ekzisti ĉe la sprona pozicio ( vidu la
      // x-flankan ekstentan gardon supre ) — nenia pendanta sprono.
      const duonL = 0o7/0o10;
      const ekstZ = EW_ekstentoj.get(celZ);
      if ( !ekstZ || spronoX < ekstZ[0] - duonL || spronoX > ekstZ[1] + duonL ) continue;
      vojX = spronoX;
      vojZ = celZ - signo * duonL;
    }

    if ( Math.hypot(spronoX - vojX, spronoZ - vojZ) > 0o4/0o10 ) {
      konstruiSpronon(spronoX, spronoZ, vojX, vojZ, alteco, dioritaMaterialo, andezitaMaterialo, sceno);
      // Densaj specimenoj laŭ la sprono — saman distancon kiel la ĉefaj vojoj.
      const spurro = Math.hypot(vojX - spronoX, vojZ - spronoZ);
      const nombro = Math.max(1, Math.round(spurro / 2));
      for ( let k = 0; k <= nombro; k++ ) {
        const t = k / nombro;
        const sx = spronoX + ( vojX - spronoX ) * t;
        const sz = spronoZ + ( vojZ - spronoZ ) * t;
        spronajSpecimenoj.push(new THREE.Vector3(sx, alteco(sx, sz), sz));
      }
    }
  }

  const vojSpecimenoj = konstruiVojojn(sceno, vojDifinoj, alteco, dioritaMaterialo, andezitaMaterialo);

  // ⟪ Kruciĝaj platoj 📃 ⟫ — ĉe ĉiu kruciĝo la strioj de la du vojoj kuŝas
  // samplane kaj la teksturoj montras krucan kvadraton. Diorita centro kun
  // kvar andezitaj anguloj kovras ĉiun kruciĝon per unu levita surfaco, do la
  // duobla andezito en la anguloj malaperas kaj la vojo-randoj daŭrigas preter
  // la kruciĝo. La T-kunigoj ricevas la saman platon — la finiĝanta vojo
  // interkovras la trapasantan samplane kaj la plato estas la unu surfaco.
  konstruiIntersekcajnPlatojn(sceno, [ ...realajIntersekcoj ].map(klavo => {
    const [ x, z ] = klavo.split(",").map(Number);
    return [ x, z ] as [ number, number ];
  }).concat(tNodoj), alteco, dioritaMaterialo, andezitaMaterialo, tFermitaj);

  // Rondigitaj arkoj ĉe la L-korneroj — kvaronaj diskoj en la korneraj
  // kvadrantoj ( la libera tereno inter la vojoj ), levitaj super la tereno.
  for ( const a of arkajNodoj ) {
    konstruiRondigitanArkon(sceno, a.x, a.z, a.sx, a.sz, alteco, dioritaMaterialo, andezitaMaterialo);
  }

  // ⟪ Lampoj ( la krada parto ) 📃 ⟫ — la lampaj lokoj de ĉi tiu urbo.
  // kvar lampoj ĉirkaŭ ĉiu placo-nodo, ĉiu reala krada kruciĝo kaj ĉiu arko.
  // La monda lampo-konstruo en konstruiUrbon kunigas ĉi tiujn kun la lagaj kaj
  // montaraj lampoj kaj konstruas UNU hxeuxfa-sistemon.
  const lampLokoj: { x: number; z: number; y: number; rotacio?: number }[] = [];
  const addLamp = ( x: number, z: number, bazaY = alteco(x, z), rotacio = Math.PI / 4 ) => {
    for ( const s of konstruSpecoj ) {
      const difX = Math.sin(s.rot || 0), difZ = Math.cos(s.rot || 0);
      const pordoX = s.x + difX * ( s.d / 2 + 0o14/0o10 ), pordoZ = s.z + difZ * ( s.d / 2 + 0o14/0o10 );
      if ( Math.hypot(x - pordoX, z - pordoZ) < 4 ) return;
      if ( Math.hypot(x - s.x, z - s.z) < Math.max(s.w, s.d) / 2 + 0o14/0o10 ) return;
    }
    // Evitu meti lampojn sur ekzistantajn lampojn (ene de 2 unuoj)
    for ( const ekz of lampLokoj ) {
      if ( Math.hypot(x - ekz.x, z - ekz.z) < 2 ) return;
    }
    lampLokoj.push({ x, z, y: bazaY, rotacio });
  };
  if ( arangxo.lampoj !== false ) {
    for ( const [ aX, aZ ] of placajNodoj ) {
      for ( const [ dx, dz ] of [ [ -0o21/0o10, -0o21/0o10 ], [ 0o21/0o10, -0o21/0o10 ], [ -0o21/0o10, 0o21/0o10 ], [ 0o21/0o10, 0o21/0o10 ] ] ) addLamp(aX + dx, aZ + dz);
    }
    for ( const gx of RETO_X ) {
      for ( const gz of RETO_Z ) {
        // Nur realaj vojkruciĝoj ( kaj ne la rivero ) ricevas la kvar-lampan
        // ŝablonon; malplenaj regionoj sen vojo restas sen lampoj.
        if ( Math.abs(gz - riveroZ(gx)) < 0o14 ) continue;
        if ( !realajIntersekcoj.has(gx + "," + gz) ) continue;
        // Kvar lampoj en la kvar kvadratoj ĉirkaŭ ĉiu intersekco.
        addLamp(gx + 0o23/0o10, gz + 0o23/0o10);
        addLamp(gx + 0o23/0o10, gz - 0o23/0o10);
        addLamp(gx - 0o23/0o10, gz + 0o23/0o10);
        addLamp(gx - 0o23/0o10, gz - 0o23/0o10);
      }
    }
    // Rondigitaj arkoj — la L-korneroj ne estas en placajNodoj nek realaj
    // intersekcoj, do ili ricevas propran kvar-lampan ŝablonon por resti lumigitaj.
    for ( const a of arkajNodoj ) {
      addLamp(a.x + 0o23/0o10, a.z + 0o23/0o10);
      addLamp(a.x + 0o23/0o10, a.z - 0o23/0o10);
      addLamp(a.x - 0o23/0o10, a.z + 0o23/0o10);
      addLamp(a.x - 0o23/0o10, a.z - 0o23/0o10);
    }
  }

  // ⟪ Keŭfĥesoj 📃 ⟫ — starfrukt-formaj strukturoj ( ſɭw ʃɔɔ˞ ) kun 6-flanka
  // simetrio. Ili staras ĉe la kvar ANGULOJ de la centra konstruaĵo ( la
  // diamanta sanktejo ), unu ĝuste ekster ĉiu pinto. La sankteja piedo estas
  // kvadrato turnita je Math.PI / 4 ( kreiKlinoTavolon ), do giaj pintoj
  // alfrontas la diagonalojn 45°, 135°, 225° kaj 315° — ne la flankojn. La
  // keŭfĥesoj montriĝas nur kiam la urbo havas la flagon ( la terena
  // skulptilo sxaltas gxin per la Krado-langeto ).
  const KEUXFHXESO_R = 0o10;   // 10 — klare ekster la pinto ( 7.07 ) kaj iom pli for
  const keuxfhxesoLokoj: KeuxfhxesoLoko[] = [];
  if ( arangxo.keuxfhxeso ) {
    for ( let i = 0; i < 4; i++ ) {
      const a = Math.PI / 4 + i * Math.PI / 2;
      keuxfhxesoLokoj.push({ x: ofsX + Math.cos(a) * KEUXFHXESO_R, z: ofsZ + Math.sin(a) * KEUXFHXESO_R, rot: a });
    }
    konstruiKeuxfhxeso(sceno, keuxfhxesoLokoj, alteco, oraMaterialo);
    for ( const l of keuxfhxesoLokoj ) kolizioj.push({ x: l.x, z: l.z, r: 0o16/0o10 });
  }

  // La stacia pozicio — kie la spacosxipo flugas. La stacia ALDONA bloko ( la
  // unua stacia bloko, aux la unua aldona bloko ) fiksas gxin; sen aldonaj
  // blokoj la defaŭlto estas la malnova stacidoma pozicio ( unu. norde de la
  // pinto; kvar. la centro ).
  const staciaBloko = aldonajBlokoj.find(b => b.stacia) ?? aldonajBlokoj[0];
  return {
    konstruSpecoj, kolizioj, selektajxoj, konstruGrupoj, placajNodoj,
    vojSpecimenoj, spronajSpecimenoj, lampLokoj, keuxfhxesoLokoj,
    staciaPozicio: staciaBloko
      ? [ ofsX + staciaBloko.x, ofsZ + staciaBloko.z ]
      : [ ofsX, ofsZ + ( arangxo.blokaGrando === "kvar" ? 0 : stacioZ ) ],
    ringoX: ofsX + ringoX,
    sudaVojo: ofsZ + sudaVojo,
  };
}

export async function konstruiUrbon(
  sceno: THREE.Scene,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial,
  raportiProgreson?: ( procento: number ) => void
): Promise<UrbaSistemo> {
  // ⟪ Ŝarĝa progreso 📃 ⟫ — la konstruado cedas inter sekcioj, por ke la
  // ŝarĝa stango vere moviĝu kaj la paĝo restu respondema dum lanĉo.
  const jesi = (): Promise<void> => new Promise(r => setTimeout(r, 0));
  const STAGOJ = 12;
  let stago = 0;
  const raporti = async (): Promise<void> => {
    stago = Math.min(STAGOJ, stago + 1);
    raportiProgreson?.(stago / STAGOJ);
    await jesi();
  };

  // ═══════════════════════════════════════════════════════════
  // Urba krado — DIAMANTA kruca aranĝo kun kvar-flanka simetrio. La
  // nordo/sudo egalas la oriento/okcidento. Ĉiu flanko havas `arangxaGrando`
  // tavolojn da konstruaĵoj ( la nuna urbo estas 3 ). La tipoj laŭ ringo —
  //  · RINGO 0 ( centro ) = la centra konstruaĵo ( sanktejo ) aŭ la stacio.
  //  · RINGO 1 ( rekte apud ) = kasafeoj ( kunvenoĉambroj ) kaj mangxejoj.
  //  · RINGO 2 ( poste ) = altaj turoj ( veuxkupanko ).
  //  · RINGO 3+ ( ekstera ) = domoj ( kapuo ).
  //
  //  V = veuxkupanko (alta turo), D = domo, M = mangxejo, K = kasafeo, W = sanktejo
  //
  //       | − | − | D | D | D | − | − |   z=3 (tria tavolo — domoj)
  //       | − | V | V | V | − |   z=2 (dua tavolo — turoj)
  //       | D | V | M | K | M | V | D |   z=1 (unua tavolo — la aliaj tipoj)
  //       | D | V | K | W | K | V | D |   z=0 (centro)
  //       | D | V | M | K | M | V | D |   z=-1 (unua tavolo — la aliaj tipoj)
  //       | − | V | V | V | − |   z=-2 (dua tavolo — turoj)
  //       | − | − | D | D | D | − | − |   z=-3 (tria tavolo — domoj)
  // ═══════════════════════════════════════════════════════════
  // La urboj de SKULPTA_URBOJ ( la terena skulptilo ) — la cefa urbo
  // ( unu-bloka, grandeco 3 ) cxe la centro, kaj la testa kvar-bloka urbo
  // ( grandeco 2 ) trans la rivero. Cxiu urbo konstruigxas cxe sia ofseto.
  // La unua urbo estas la CEFA — la spacosxipo, la doka avenuo kaj la
  // keuxfhxesoj apartenas al gxi.
  // Se la listo mankas aŭ malplenas ( malnova datumaro ), la ludo konstruas
  // la defaŭltan ĉefan urbon — neniam urbo sen la cefa.
  const urboListo: SkulptaUrbo[] = SKULPTA_URBOJ.length
    ? ( SKULPTA_URBOJ as SkulptaUrbo[] )
    : [ { nomo: "Ĉefa", arangxaGrando: 3, blokaGrando: "unu", ofsX: 0, ofsZ: 0 } ];
  const urboj = urboListo.map(u => konstruiKradanUrbon(sceno,
    { arangxaGrando: u.arangxaGrando, blokaGrando: u.blokaGrando, keuxfhxeso: !!u.keuxfhxeso, lampoj: u.lampoj !== false },
    [ u.ofsX, u.ofsZ ], dioritaMaterialo, andezitaMaterialo, oraMaterialo,
    u.aldonajBlokoj ?? [], superajElDatumo(u.superoj)));
  const cefa = urboj[0];
  await raporti();

  // La kunigitaj kradaj rezultoj — la mond-nivelaj partoj ( rivero, dokoj,
  // vegetajxo ) uzas ĉi tiujn por la ekskludoj kaj la kolizioj.
  const konstruSpecoj = urboj.flatMap(r => r.konstruSpecoj);
  const kolizioj = urboj.flatMap(r => r.kolizioj);
  const selektajxoj = urboj.flatMap(r => r.selektajxoj);
  const konstruGrupoj = urboj.flatMap(r => r.konstruGrupoj);
  const placajNodoj = urboj.flatMap(r => r.placajNodoj);
  const keuxfhxesoLokoj = urboj.flatMap(r => r.keuxfhxesoLokoj);
  // La doka avenuo kongruas al la krada vojo de la ĈEFA urbo ( x=12, z=-60 ).
  const { ringoX, sudaVojo } = cefa;

  // ⟪ Rivero 📃 ⟫
  // La ribono etendiĝas okcidenten ĝis la nova mondrando ( x ≤ 0o600 ),
  // do la rivero aspektas longa kaj solviĝas en la nebulon anstataŭ halti ĉe la
  // urbo-rondo. Oriente ( -x sur la norda mapo ) ĝi enfluas la lagon. La ribono
  // finiĝas ĉe la lagbordo ( RIVERA_BUŜO_X ) kaj mallarĝiĝas glate al punkto,
  // dum la akvonivelo krampiĝas al la laga nivelo — neniu duobla surfaco aŭ
  // paŝo ĉe la buŝo. La tereno-profundo ( alteco ) koloriĝas la akvon laŭ la fundo.
  // ⟪ La akvo de la skulptita tereno 📃 ⟫ — la rivero, la lago kaj la
  // nordorienta rivereto estas BAKITAJ en la akva maskon ( la skulptilo ). La
  // maska meshxo ( skulptaAkvo ) estas la akvo; la proceduraj ribonaj/lagaj
  // meshxoj konstruigxas nur sen skulptita datumaro ( SKULPTA_AKTIVA = false ),
  // kiel sekurkopio. La rivercentraj/lagrandaj helpiloj restas por la dokoj,
  // la kanuoj, la pontoj kaj la kanua fiziko, kiuj sekvas la saman geometrion.
  const riverData: RiverData | null = SKULPTA_AKTIVA ? null
    : konstruiRiveron(sceno, riveroZ, riveraAkvaNivelo, RIVERA_DUONLARĜO, 0o600, RIVERA_BUŜO_X, 0o110, alteco);
  const riveroNordOrienta: RiverData | null = SKULPTA_AKTIVA ? null
    : konstruiRiveronNordan(sceno, riveroNordOrientaX, riveraNordOrientaNivelo,
        RIVERA_NORDORIENTA_DUONLARĜO, RIVERA_NORDORIENTA_FONTO_Z, RIVERA_NORDORIENTA_BUŜO_Z, 0o60, alteco);
  const lago: RiverData | null = SKULPTA_AKTIVA ? null
    : konstruiLagon(sceno, LAGO_X, lagoZ(), lagoRadio, lagoNivelo(), alteco);

  // ⟪ Skulptita akvo ( la terena skulptilo ) 📃 ⟫ — akvo pentrita en
  // iloj/tero-skulptilo.html. La masko limigas la meshxon al la pentrita zono;
  // nenio konstruigas se ne estas akvo.
  const limojSkulptaj = skulptaAkvaLimoj();
  const skulptaAkvo: RiverData | null = limojSkulptaj
    ? konstruiSkulptitanAkvon(sceno, limojSkulptaj.x0, limojSkulptaj.z0,
        limojSkulptaj.x1, limojSkulptaj.z1, SKULPTA_PASO, skulptitaAkvo,
        SKULPTA_AKVA_NIVELO, alteco)
    : null;

  // ⟪ Dokoj — alirejoj laŭ la riverbordo 📃 ⟫
  // La dokoj venas de SKULPTA_DOKOJ ( la terena skulptilo ) — ĉiu platformo
  // havas sian mondan pozicion ( x, z ) kaj profundon. La ludo konstruas la
  // dokojn rekte el la datumoj.
  const DOKOJ = SKULPTA_DOKOJ as SkulptaPlatformo[];
  const dokoKolizioj: { x: number; z: number; w: number; d: number; rot: number; y: number }[] = [];
  for ( let i = 0; i < DOKOJ.length; i++ ) {
    const doko = konstruiDokon(sceno, DOKOJ[i].x, DOKOJ[i].z, 0, alteco, akvoY, DOKOJ[i].profundo);
    dokoKolizioj.push({ x: DOKOJ[i].x, z: DOKOJ[i].z, w: 0o16/0o10, d: DOKOJ[i].profundo, rot: 0, y: doko.platformY });
  }
  await raporti();

  // ⟪ Kajo kaj doka avenuo ( la ĉefa urbo ) 📃 ⟫ — la ĉefaj vojoj de la kradaj
  // urboj konstruiĝas en konstruiKradanUrbon; ĉi tiuj estas la mond-nivelaj
  // vojoj de la ĉefa urbo, kiuj venas de SKULPTA_VOJOJ ( la terena skulptilo
  // — polilinioj kiujn la Vojoj-langeto redaktas ).
  const vojDifinoj: VojDifino[] = [];

  // Konstruu ĉiun vojon el SKULPTA_VOJOJ. La skulptilo redaktas ilin kiel
  // poliliniojn kun larĝo; la ludo konstruas ilin per konstruiVojojn.
  for ( const vojo of SKULPTA_VOJOJ as SkulptaVojo[] ) {
    if ( vojo.punktoj.length < 2 ) continue;
    for ( let i = 0; i < vojo.punktoj.length - 1; i++ ) {
      vojDifinoj.push({
        pts: [ [ vojo.punktoj[i][0], vojo.punktoj[i][1] ], [ vojo.punktoj[i + 1][0], vojo.punktoj[i + 1][1] ] ],
        w: vojo.larĝo / 2,
      });
    }
  }
  // La doka norda rando — la landrandoj de ĉiu doko, por la lampoj kaj la ĉapoj.
  const dockaLandaRando: [ number, number ][] = DOKOJ.map(d => [ d.x, d.z + d.profundo / 2 ]);
  const ĉefajVojSpecimenoj = konstruiVojojn(sceno, vojDifinoj, alteco, dioritaMaterialo, andezitaMaterialo);

  // Lamp-nodoj por la kajo — la samaj lampaj ŝablonoj kiel la krada reto.
  // NENIU ĉap-mesho konstruiĝas ĉe ĉi tiuj nodoj. La vojoj mem jam plenigas
  // ĉiun nodon. La nodoj restas nur por la lampoj.
  placajNodoj.push([ -0o124, -0o140 ]);
  placajNodoj.push([ 0o124, -0o122 ]);
  // La dokaj landrandoj — kie la kajo renkontas ĉiun platformon, la rando-nodo
  // markas la enirejon ( lampoj ).
  for ( const [ dx, dz ] of dockaLandaRando ) placajNodoj.push([ dx, dz ]);
  // La kvar-lampa ŝablono ĉirkaŭ la kaja placo-nodo ( la samaj ofsetoj kiel la
  // krada reto — la kradaj nodoj ricevas ilin en konstruiKradanUrbon ).
  const dokaPlacajNodoj: [ number, number ][] = [ [ -0o124, -0o140 ], [ 0o124, -0o122 ], ...dockaLandaRando ];

  // ⟪ Duoncirklaĵaj ĉapoj ĉe la doka bordo 📃 ⟫ — la du kajo-finoj ( okcidente
  // en la arbaro, oriente sur la seka bordo ) kaj la tri dokaj landrandoj
  // ( la enirejoj kie la kajo renkontas ĉiun platformon ). La komuna
  // konstruiPlacojn foriĝis ( la kapoj kuŝis sur la vojoj samplane kaj
  // z-flagris ), kaj ĉi tiuj kvin nodoj ricevas nek arkon nek platon — sen
  // ĉapo la vojoj ĉe la doka bordo finiĝas krude. La novaj kapoj estas
  // DUONCIRKLAJ, EKSTRUDITAJ per la sama dikeco kiel la voja strio
  // ( 0o2/0o10 ) kaj kuŝas samplane kun la vojo, do ili montras verajn
  // 3D-flankajn murojn kiel la ceteraj vojoj — ne plu plataj 2D-diskoj. Ĉiu
  // ĉapo elstaras en la direkto kiu daŭrigas la vojon. la du kajo-finoj bulas
  // preter la fino ( okcidenten/orienten, laŭ la lasta kaja segmento ), kaj
  // la tri dokaj landrandoj bulas suden sur la platformon ( la doko estas
  // voja etendo, do la ĉapo rondigas la transiron ). Kie ili interkovras la
  // vojon, la polygonOffset-hierarkio decidas ( la disko gajnas, la ringo
  // malgajnas kontraŭ la vojo — neniu andezito super la diorito ).
  konstruiRondajnKapojn(sceno, [ [ -0o124, -0o140 ], [ 0o124, -0o122 ], ...dockaLandaRando ],
    [ [ -0.9833, 0.1821 ], [ 0.9993, 0.0370 ], ...dockaLandaRando.map((): [ number, number ] => [ 0, -1 ]) ],
    alteco, dioritaMaterialo, andezitaMaterialo);
  await raporti();

  // ⟪ Lampoj 📃 ⟫ — la kradaj lampaj lokoj ( ambaŭ urboj ) kaj la kaja
  // placo-nodo en UNU sistemo. La mondaj plat-lampoj ( la arbar-randaj, lagaj
  // kaj montaj lampoj sur la diamantaj platformoj ) estas OBJEKTOJ de
  // SKULPTA_OBJEKTOJ ( hxeuxfoPlato ) — movitaj el la kodo al la datumaro,
  // redakteblaj per la terena skulptilo.
  const lampLokoj: { x: number; z: number; y: number; rotacio?: number }[] = urboj.flatMap(r => r.lampLokoj);
  const addLamp = ( x: number, z: number, bazaY = alteco(x, z), rotacio = Math.PI / 4 ) => {
    for ( const s of konstruSpecoj ) {
      const difX = Math.sin(s.rot || 0), difZ = Math.cos(s.rot || 0);
      const pordoX = s.x + difX * ( s.d / 2 + 0o14/0o10 ), pordoZ = s.z + difZ * ( s.d / 2 + 0o14/0o10 );
      if ( Math.hypot(x - pordoX, z - pordoZ) < 4 ) return;
      if ( Math.hypot(x - s.x, z - s.z) < Math.max(s.w, s.d) / 2 + 0o14/0o10 ) return;
    }
    // Evitu meti lampojn sur ekzistantajn lampojn (ene de 2 unuoj)
    for ( const ekz of lampLokoj ) {
      if ( Math.hypot(x - ekz.x, z - ekz.z) < 2 ) return;
    }
    lampLokoj.push({ x, z, y: bazaY, rotacio });
  };
  // La kvar-lampa ŝablono ĉirkaŭ la kaja placo-nodo ( la samaj ofsetoj kiel la
  // krada reto — la kradaj nodoj ricevas ilin en konstruiKradanUrbon ).
  for ( const [ aX, aZ ] of dokaPlacajNodoj ) {
    for ( const [ dx, dz ] of [ [ -0o21/0o10, -0o21/0o10 ], [ 0o21/0o10, -0o21/0o10 ], [ -0o21/0o10, 0o21/0o10 ], [ 0o21/0o10, 0o21/0o10 ] ] ) addLamp(aX + dx, aZ + dz);
  }

  // Lampoj kiel OBJEKTOJ ( la terena skulptilo ) — la metitaj hxeuxfoj de
  // SKULPTA_OBJEKTOJ aliĝas al la SAMA lampa sistemo kiel la kradaj/kajaj
  // lampoj. la flamoj animiĝas kune ( sperto.ts vokas unu
  // animaciiFlammojn ) kaj la kolizioj aldoniĝas. La nuda lampo sidas rekte
  // sur la tero; la varianto hxeuxfoPlato staras sur la rondigita diamanta
  // plato ( la sama platformo kiel la antaŭaj mapaj lampoj ) kaj ricevas la
  // saman levitan bazon kiel la malnovaj plat-lampoj.
  for ( const o of SKULPTA_OBJEKTOJ ) {
    if ( o.speco === "hxeuxfo" ) {
      lampLokoj.push({ x: o.x, z: o.z, y: alteco(o.x, o.z) + 0o1/0o40, rotacio: o.rotacio });
    } else if ( o.speco === "hxeuxfoPlato" ) {
      konstruiPeriferiajnPlatformojn(sceno, [ [ o.x, o.z ] ], alteco, dioritaMaterialo, andezitaMaterialo);
      lampLokoj.push({ x: o.x, z: o.z, y: alteco(o.x, o.z) + 0o4/0o10 - 0o1/0o40, rotacio: o.rotacio });
    }
  }

  const lampSistemo = konstruiHxeuxfojn(sceno, lampLokoj, dioritaMaterialo, oraMaterialo);
  // Lampaj kolizioj — malgrandaj cirkloj ĉirkaŭ ĉiu lampa kolono.
  for ( const l of lampLokoj ) kolizioj.push({ x: l.x, z: l.z, r: 0o5/0o10 });
  await raporti();

  // ⟪ Vegetajxo 📃 ⟫
  // La rivero/lago estas la skulptita akvo ( la masko ) — la plantoj restas
  // ekster la akvo, kien ajn la skulptilo pentris gxin.
  const ekskluziviRiveron = ( x: number, z: number ) => akvo(x, z);
  // La kunigitaj vojspecimenoj ( ambaŭ kradaj urboj + la spronoj + la kajo/
  // avenuo ) — la vegetajxo evitas ĉiujn vojojn de ambaŭ urboj.
  const vojSpecimenoj = [
    ...urboj.flatMap(r => [ ...r.vojSpecimenoj, ...r.spronajSpecimenoj ]),
    ...ĉefajVojSpecimenoj,
  ];
  // ⟪ Krada indekso por la voja ekskludo 📃 ⟫ — ĉelo-krado por ke la vegetajxo
  // ne skanu ĉiun vojspecimenon por ĉiu kandidata arbo ( O(1) anstataŭ O(n) ).
  const VOJA_ĈELO = 0o10;
  const vojaKrado = new Map<number, THREE.Vector3[]>();
  for ( const p of vojSpecimenoj ) {
    const kx = Math.floor(p.x / VOJA_ĈELO), kz = Math.floor(p.z / VOJA_ĈELO);
    const klavo = kx * 0o100000 + kz;
    let ĉelo = vojaKrado.get(klavo);
    if ( !ĉelo ) { ĉelo = []; vojaKrado.set(klavo, ĉelo); }
    ĉelo.push(p);
  }
  const ekskluziviVojojn = ( x: number, z: number, m: number ) => {
    // Krada sercxo anstataux la lineara skanado de cxuj vojspecimenoj.
    const r = Math.ceil(m / VOJA_ĈELO) + 1;
    const bx = Math.floor(x / VOJA_ĈELO), bz = Math.floor(z / VOJA_ĈELO);
    const m2 = m * m;
    for ( let dx = -r; dx <= r; dx++ ) {
      for ( let dz = -r; dz <= r; dz++ ) {
        const ĉelo = vojaKrado.get(( bx + dx ) * 0o100000 + ( bz + dz ));
        if ( !ĉelo ) continue;
        for ( const p of ĉelo ) {
          const ddx = x - p.x, ddz = z - p.z;
          if ( ddx * ddx + ddz * ddz < m2 ) return true;
        }
      }
    }
    // La lampaj diamantaj platformoj ( la hxeuxfoPlato-objektoj de la
    // datumaro — la eksaj periferiaj/lagaj/montaj plat-lampoj ) estas
    // pavimitaj restlokoj — neniu planto aperu sur ili.
    for ( const o of SKULPTA_OBJEKTOJ ) {
      if ( o.speco !== "hxeuxfoPlato" ) continue;
      if ( Math.hypot(x - o.x, z - o.z) < m + 3 ) return true;
    }
    // La keŭfĥesoj staras en la herbejo — neniu planto tra ili.
    for ( const l of keuxfhxesoLokoj ) if ( Math.hypot(x - l.x, z - l.z) < m + 0o25/0o10 ) return true;
    return false;
  };
  const ekskluziviKonstruajxon = ( x: number, z: number, m: number ) => {
    for ( const s of konstruSpecoj ) if ( Math.hypot(x - s.x, z - s.z) < s.w * 0o23/0o40 + m ) return true;
    return false;
  };
  // Betuloj ( arbara periferio ) — la arbaro plenigas la TUTAN valan biomon
  // ( la arbareroj de tereno.ts ). La metado specimenas uniforme tra la tuta
  // mondo kaj la biomo-filtrilo ( VALAJ_BIOMOJ = la arbareroj ) tenas la
  // arbojn en la valaj zonoj — tiel nenia vala loko restas malplena, kaj la
  // malplenaj lokoj ekster la arbareroj estas la ebenaĵa biomo. La inter-arba
  // distanco estas malgranda, por ke la arbaro legiĝu kiel vera arbaro.
  const arboj = metiArbojn(alteco, 0o1400, 0o600, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o53104, [], 0o10, [], undefined, VALAJ_BIOMOJ);
  const betulajTrunkoj = konstruiArbaron(sceno, arboj);

  // Larikoj — miksitaj kun betuloj por pli diversa arbaro
  // La inter-arba distanco estas malgranda, por ke la larikoj vere aperu
  // inter la betuloj — tro granda liberspaco lasis preskaŭ neniun lokon.
  const larikoj = metiArbojn(alteco, 0o700, 0o600, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o53114, arboj, 0o10, [], kronaRadiusoLarika, VALAJ_BIOMOJ);
  const larikajTrunkoj = konstruiLarikon(sceno, larikoj);

  // Ĥŝakŝlefoj ( ı],ͷ̗ɔʞ ֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ ) — purpuraj laktuk-arboj, 3–5
  // tavoloj de kvar grandaj kurbiĝintaj folioj kaj segmenta ŝelo
  const hxsxaksxlefoj = metiArbojn(alteco, 0o400, 0o600, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o62445, [ ...arboj, ...larikoj ], 0o10, [], kronaRadiusoHxsxaksxlefa, VALAJ_BIOMOJ);
  const hxsxaksxlefojTrunkoj = konstruiHxsxaksxlefojn(sceno, hxsxaksxlefoj);

  // Trunkaj likenoj — tridimensiaj krustaj buloj sur iuj arbotrunkoj. La
  // trunkaj matricoj jam donas la realan pozicion/kliniĝon de ĉiu arbo, do
  // la likenoj sidas ĝuste sur la ŝelo sen ripeto de la hazardaj vokoj.
  konstruiTrunkajnLikenojn(sceno, [ betulajTrunkoj, larikajTrunkoj, hxsxaksxlefojTrunkoj ]);
  await raporti();

  // Filikoj — pli da kvanto, apud arboj kaj vojoj
  konstruiFilikojn(sceno, 0o400, alteco, arboj, vojSpecimenoj, ekskluziviRiveron, ekskluziviVojojn, VALAJ_BIOMOJ);

  // Purpuraj plantoj — ringo de koloro ĉe la urba rando, kie la vojoj dissolvigas en arbaron
  konstruiPurpurajnPlantojn(sceno, 0o200, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, VALAJ_BIOMOJ);

  // Purpuraj filikoj — pli altaj violetaj frondoj kiel en Four Groves
  konstruiPurpurajnFilikojn(sceno, 0o200, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, VALAJ_BIOMOJ);
  // Altaj purpuraj filikoj — la arboformaj, kun la arba listo por ke ili ne
  // kresku en la trunkojn/kronojn de la jam metitaj betuloj, larikoj kaj
  // Ĥŝakŝlefoj.
  konstruiAltajnPurpurajnFilikojn(sceno, 0o100, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    [ ...arboj, ...larikoj, ...hxsxaksxlefoj ], VALAJ_BIOMOJ);

  // Liken-sxtonoj — en la arbaro; la metitaj pozicioj ankoras la likenojn.
  const likenSxtonoj = konstruiLikenSxtonojn(sceno, 0o60, alteco, ekskluziviRiveron, ekskluziviVojojn);

  // Likeno — krustaj makuloj sur la grundo apud arboj kaj sxtonoj
  konstruiLikenojn(sceno, 0o200, alteco, [ ...arboj, ...larikoj, ...hxsxaksxlefoj ], likenSxtonoj, ekskluziviRiveron, ekskluziviVojojn);

  // Herbo — densa herbtapiso en la arbaro kaj randoj
  konstruiHerbon(sceno, 0o1170, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, VALAJ_BIOMOJ);

  // ⟪ Ebenaĵo 📃 ⟫ — la malalta grundo ekster la arbareroj. Nur etaj plantoj
  // kreskas tie ( herbo kaj purpuraj plantoj, dense ) — neniaj arboj, neniaj
  // filikoj. La biomo-filtrilo ( EBENAJAJ_BIOMOJ ) tenas ilin en la ebenaĵa
  // biomo; la arbareroj kaj la akvo restas liberaj, kaj la lokoj sen biomo
  // ( aŭtomata / nenio ) ricevas NENION — la ebenaĵo estas la plantohava
  // malalta grundo, kontraste al la nuda aŭtomata.
  konstruiHerbon(sceno, 0o2000, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, EBENAJAJ_BIOMOJ);
  konstruiPurpurajnPlantojn(sceno, 0o1000, alteco, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, EBENAJAJ_BIOMOJ);

  // Musko montetoj — apud arboj tra la arbaro
  konstruiMusxajnMontetojn(sceno, 0o200, alteco, arboj, ekskluziviRiveron, ekskluziviVojojn);


  // Falintaj trunkoj — en la densa arbaro
  konstruiFalintajnTrunkojn(sceno, 0o40, alteco, arboj, ekskluziviRiveron, ekskluziviVojojn);

  // Cetkuoj ( ſᶘɔ ɭʃƽɹ / Equisetum praealtum ) — la altaj senbranĉaj skuraj
  // kanoj kun strobiloj, laŭ la riverbordoj ( la lago estas akvo, do neniu
  // planto ene de la lagdisko )
  // La kanoj kreskas nur en la EKVIZETA biomo ( la pentrita ekvizeta zono sur
  // la akvo ) — la riverbendo kaj la lagrando de la skulptita masko.
  konstruiCetkuojn(sceno, 0o110, alteco, riveroZ,
    ( x: number, z: number ) => ekskluziviKonstruajxon(x, z, 3), ekskluziviVojojn, EKVIZETO_BIOMOJ);
  await raporti();

  // ⟪ Vegetaĵo ĉirkaŭ la lago 📃 ⟫ — la lago sidas malproksime oriente
  // ( dist ~236 ), ekster la radiuso de la urba arbaro, do ĝiaj bordoj
  // restis nudaj. Ringo da betuloj kaj larikoj sekvas la ondigitan lagrandon
  // ( lagoRadio ), sur la sekaj bordoj ekster la lagrando; herbo kovras la
  // bordon kaj kareksoj staras ĉe la akvo. La orienta malseka kavo restas
  // malplena ( akvaNivelo kontrolas la sekecon ). La ĉef-arbaraj arboj estas
  // ankaŭ evitu-ankroj, por ke la ringo ne kunpremu la urban arbaron.
  const lagArboj = metiArbojnCxirkauLagon(alteco, 0o60, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53120, [ ...arboj, ...larikoj ], 0o10,
    undefined, VALAJ_BIOMOJ);
  const lagTrunkoj = konstruiArbaron(sceno, lagArboj);
  const lagLarikoj = metiArbojnCxirkauLagon(alteco, 0o40, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53121, [ ...lagArboj, ...arboj, ...larikoj ], 0o10,
    kronaRadiusoLarika, VALAJ_BIOMOJ);
  const lagLarikajTrunkoj = konstruiLarikon(sceno, lagLarikoj);
  // Ĥŝakŝlefoj — purpuraj laktuk-arboj miksitaj en la lagringon, por ke la
  // lagbordo ricevu la saman specan diversecon kiel la ĉef-arbaro.
  const lagHxsxaksxlefoj = metiArbojnCxirkauLagon(alteco, 0o30, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53126, [ ...lagArboj, ...lagLarikoj, ...arboj, ...larikoj ], 0o10,
    kronaRadiusoHxsxaksxlefa, VALAJ_BIOMOJ);
  const lagHxsxaksxlefojTrunkoj = konstruiHxsxaksxlefojn(sceno, lagHxsxaksxlefoj);
  // Trunkaj likenoj ankaux sur la lag-arboj ( nova semo por malsamaj buloj )
  konstruiTrunkajnLikenojn(sceno, [ lagTrunkoj, lagLarikajTrunkoj, lagHxsxaksxlefojTrunkoj ], 0o62452);
  konstruiHerbonCxirkauLagon(sceno, 0o300, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53122);
  // Cakeoj ( ſᶘᴜ ſɭɔ / Equisetum telmateia ) — la grandaj branĉet-kirlaj
  // ĉevalvostoj, kareksa rando ĉe la lagrando, kie la bordo estas malseka
  // ( ne pli ol ~2 unuojn super la akvonivelo ). La sama EKVIZETA biomo kiel
  // la cetkuoj — la du ekvizetaj specioj kreskas nur en la pentrita zono.
  konstruiCakeojn(sceno, 0o110, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    ekskluziviKonstruajxon, ekskluziviVojojn, 11605, EKVIZETO_BIOMOJ);
  // Subkreskajxo cxirkaux la lago — cxiuj malgrandaj plantoj ( verdaj filikoj,
  // malaltaj purpuraj plantoj, purpuraj filikoj, herbotufoj, musko-montetoj
  // kaj likenaj makuloj ) sekvas la ondigitan lagrandon kaj klasterigxas
  // cxirkaux la lagaj arboj, sur la sekaj bordoj.
  konstruiLaganSubkreskajxojn(sceno, 0o470, alteco, LAGO_X, lagoZ(), lagoRadio, akvaNivelo,
    [ ...lagArboj, ...lagLarikoj, ...lagHxsxaksxlefoj ], [ ...lagArboj, ...lagLarikoj, ...lagHxsxaksxlefoj ],
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53134, VALAJ_BIOMOJ);
  await raporti();

  // ⟪ Montara vegetajxo 📃 ⟫ — la norda montaro ( montaroNorda en tereno.ts )
  // ricevas alpan larikaron sur la deklivoj, betulojn pli sube, kaj rokojn
  // kaj likenojn sur la krestoj. La arboj sidas nur sur piedeblaj deklivoj sub
  // la arbolinio ( metiMontajnArbojn filtras la krutajn murojn kaj la altajn
  // pintojn ), do la montaro restas transirebla tra la selo. La montaj arboj
  // evitas la urban arbaron kaj la suda fado dissolvas la montaran arbaron en
  // la valan, por ke la du zonoj kuniĝu nature sen kudro; la arbolinia fado
  // kaj la spron-silueta x-envelopo rompas la rektangulan bordon de la arbaro.
  // La betuloj sidas ĉe la piedo, en la transira zono inter la valo kaj la
  // montaraj deklivoj; la larikoj kovras la tutan monton, ambaŭflanke de la
  // kresto, sub la arbolinio.
  const montajBetuloj = metiMontajnArbojn(alteco, 0o100, 0o210, 0o270,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53132,
    [ ...arboj, ...larikoj ], 0o10, undefined, 0, 0o340, MONTAJ_BIOMOJ);
  const montajBetulaTrunkoj = konstruiArbaron(sceno, montajBetuloj);
  const montajLarikoj = metiMontajnArbojn(alteco, 0o200, 0o260, 0o420,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53130,
    [ ...montajBetuloj, ...arboj, ...larikoj ], 0o10, kronaRadiusoLarika, 0, 0o340, MONTAJ_BIOMOJ);
  const montajLarikaTrunkoj = konstruiLarikon(sceno, montajLarikoj);
  const montajRokoj = konstruiMontajnRokojn(sceno, 0o100, alteco, ekskluziviRiveron, ekskluziviVojojn,
    undefined, 0, 0o340, 0o260, 0o160, MONTAJ_BIOMOJ);
  // Likenoj sur la montaro — grupigitaj ĉirkaŭ la montaj arboj kaj rokoj,
  // kun la samaj spur-siluetaj formoj kaj alta disdono kiel la rokoj.
  konstruiLikenojn(sceno, 0o150, alteco, [ ...montajLarikoj, ...montajBetuloj ], montajRokoj,
    ekskluziviRiveron, ekskluziviVojojn, true);
  // Trunkaj likenoj sur la montaj larikoj kaj betuloj.
  konstruiTrunkajnLikenojn(sceno, [ montajLarikaTrunkoj, montajBetulaTrunkoj ], 0o62453);

  // ⟪ Vegetaĵo de la nordorienta monto 📃 ⟫ — la nova monto oriente-norde de la
  // lago ( montaroNordOrienta, centro ≈ -0o350,0o114 ) ricevas sian propran
  // malgrandan larikaron kaj rokojn. La samaj montaj helpiloj ( kun cx/xDuono
  // parametroj ) metu la arbojn laŭ la spur-silueta envelopo de ĉi tiu monto,
  // sub la arbolinio, kaj la rokojn sur la pintoj kaj supraj deklivoj.
  const neBetuloj = metiMontajnArbojn(alteco, 0o40, 0o40, 0o140,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53135,
    [ ...arboj, ...larikoj ], 0o10, undefined, -0o350, 0o64, MONTAJ_BIOMOJ);
  const neBetulaTrunkoj = konstruiArbaron(sceno, neBetuloj);
  const neLarikoj = metiMontajnArbojn(alteco, 0o60, 0o40, 0o160,
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53140,
    [ ...neBetuloj, ...montajBetuloj, ...montajLarikoj, ...arboj, ...larikoj ], 0o10, kronaRadiusoLarika,
    -0o350, 0o64, MONTAJ_BIOMOJ);
  const neLarikaTrunkoj = konstruiLarikon(sceno, neLarikoj);
  const neRokoj = konstruiMontajnRokojn(sceno, 0o40, alteco, ekskluziviRiveron, ekskluziviVojojn,
    624513, -0o350, 0o64, 0o40, 0o100, MONTAJ_BIOMOJ);
  konstruiLikenojn(sceno, 0o60, alteco, [ ...neLarikoj, ...neBetuloj ], neRokoj,
    ekskluziviRiveron, ekskluziviVojojn, true);
  konstruiTrunkajnLikenojn(sceno, [ neLarikaTrunkoj, neBetulaTrunkoj ], 0o62450);
  // Subkreskajxo — verdaj filikoj, malaltaj purpuraj plantoj, purpuraj
  // filikoj, herbotufoj, musko-montetoj kaj likenoj tra la tutaj betulaj kaj
  // larikaj arbaroj ( valaj kaj montaj ). La plantoj klasterigxas cxirkaux la
  // arboj — gxuste ekster la kronoj — kaj la cetero sekvas la montan
  // spur-siluetan envelopon, do la subkreskajxo kovras kaj la valajn kaj la
  // montajn arbarojn. Cxiuj arboj estas evitu-ankroj, por ke neniu planto
  // kresku en la trunkojn aŭ kronojn, kaj la konstruajxoj estas ekskluditaj.
  konstruiMontajnSubkreskajxojn(sceno, 0o3000, alteco,
    [ ...arboj, ...larikoj, ...montajLarikoj, ...montajBetuloj ],
    [ ...arboj, ...larikoj, ...hxsxaksxlefoj, ...montajLarikoj, ...montajBetuloj ],
    ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon, 0o53133, MONTAJ_BIOMOJ);

  // Pussxlefoj ( ſ̀ȷɔ ı],ͷ̗ɔʞ ſןɹɔ˞ ꞁȷ̀ᴜꞇ / Pusŝlefo ) — fern-grandaj purpuraj
  // laktukaj plantoj, etaj Ĥŝakŝlefoj kun travideblaj manĝeblaj beroj. Ilia
  // metado estas la plant-spawn de la skulptita tereno — la biomo ( tereno.ts )
  // elektas la densecon laŭ la alto. plena sur la montaroj ( la natura hejmo
  // de la planto ), malofta en la valo, nula super la arbolinio. La ber-klastroj
  // estas manĝaĵobjektoj, kiujn la ludanto povas kolekti.
  const pussxlefoj = metiPussxlefojn(alteco, 0o200, ekskluziviRiveron, ekskluziviVojojn, ekskluziviKonstruajxon,
    0o62450, [ ...arboj, ...larikoj, ...hxsxaksxlefoj, ...montajLarikoj, ...montajBetuloj,
      ...neLarikoj, ...neBetuloj ]);
  konstruiPussxlefojn(sceno, pussxlefoj);
  const pussxlefoBeroj = kreiPussxlefojnBerojn(sceno, pussxlefoj);
  await raporti();

  // ⟪ Nebulaj sprajtoj 📃 ⟫
  const nebulaTeksajxo = kreiNebulanTeksajxon();
  const nebuloj: THREE.Sprite[] = [];
  for ( const [ x, z, y, skalo, op ] of [
    [ -0o110, -0o110, 0o24/0o10, 0o60, 0o5/0o40 ], [ -0o40, -0o110, 0o215/0o100, 0o60, 0o3/0o20 ],
    [ 0o30, -0o110, 0o263/0o100, 0o60, 0o5/0o40 ], [ 0o70, -0o100, 0o115/0o40, 0o40, 0o5/0o40 ],
    [ -0o60, -0o60, 0o163/0o100, 0o40, 0o11/0o100 ], [ -0o110, 0o40, 0o63/0o40, 0o30, 0o3/0o40 ],
    [ 0o110, -0o60, 0o163/0o100, 0o30, 0o3/0o40 ], [ -0o70, 0o110, 0o14/0o10, 0o30, 0o3/0o40 ],
    [ 0o100, 0o110, 0o155/0o100, 0o30, 0o5/0o100 ], [ -0o130, 0o10, 0o55/0o40, 0o30, 0o1/0o10 ],
  ] ) {
    const materialo = new THREE.SpriteMaterial({ map: nebulaTeksajxo, transparent: true, opacity: op, depthWrite: false });
    const sp = new THREE.Sprite(materialo);
    sp.position.set(x, y, z); sp.scale.setScalar(skalo);
    sp.userData = { rapido: 0o15/0o40 + Math.random() * 0o10/0o10 };
    sceno.add(sp); nebuloj.push(sp);
  }
  for ( let i = 0; i < 0o60; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = 0o130 + Math.random() * 0o300;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const y = alteco(x, z) + 0o4/0o10 + Math.random() * 3;
    const materialo = new THREE.SpriteMaterial({
      map: nebulaTeksajxo, transparent: true,
      opacity: 0o1/0o10 + Math.random() * 0o5/0o40,
      depthWrite: false,
    });
    const sp = new THREE.Sprite(materialo);
    sp.position.set(x, y, z);
    sp.scale.setScalar(0o60 + Math.random() * 0o130);
    sp.userData = { rapido: 0o15/0o100 + Math.random() * 0o4/0o10 };
    sceno.add(sp); nebuloj.push(sp);
  }
  await raporti();

  // ⟪ Ktenoforoj 📃 ⟫
  // Travideblaj kombuloj ( Beroe, Mnemiopsis, Pleŭrobrakia ) naĝas en la rivero,
  // evitante la dokojn. Ilia animacio okazas en sperto.ts ( gxisdatigiBestojn ).
  const bestoj = konstruiBestojn(sceno, 0o30, riveroZ, riveraAkvaNivelo, RIVERA_DUONLARĜO,
    { x: LAGO_X, z: lagoZ(), r: LAGO_RZ, nivelo: lagoNivelo() });

  // ⟪ Neĝopetreloj 📃 ⟫
  // Pure blankaj marbirdoj ( ſᶘᴜ ſȷᴜ ſɭэ ſɭɔ / Pagodroma nivea ) rondflugas
  // super la biomoj — triono super la montara biomo ( la neĝaj pintoj ), la
  // cetero super la vala lago kaj rivero. Ilia animacio okazas en sperto.ts
  // ( gxisdatigiPetrelojn ).
  const petreloj = konstruiPetrelojn(sceno, 0o20, alteco, riveroZ,
    { x: LAGO_X, z: lagoZ(), r: LAGO_RZ });
  await raporti();

  // ⟪ NPC-agordo 📃 ⟫ — la vestoj vivas en assets/vestaro/vestoj.ts ( VESTOJ );
  // tiu ĉi modulo nur alinomas ilin por la urba sistemo.
  const VESTA_LISTO: Vesto[] = VESTOJ;

  // NPC-oj laux la pentrita NPC-tavolo ( la skulptilo ) — la ĉeloj kun bito 4
  // de SKULPTA_BESTOJ, kiel mondaj pozicioj. La NPC-oj piediras nur sur tero.
  // la akvaj ĉeloj kaj la konstruajxoj estas ekskluditaj. La defaŭltaj lokoj
  // ( la urbo ) estas bakitaj en la tavolon; malplena zono = neniuj NPC-oj.
  const npcZonoj: { x: number; z: number }[] = [];
  for ( let j = 0; j < SKULPTA_N; j++ ) {
    for ( let i = 0; i < SKULPTA_N; i++ ) {
      const x = SKULPTA_ORIGINO[0] + i * SKULPTA_PASO;
      const z = SKULPTA_ORIGINO[1] + j * SKULPTA_PASO;
      if ( ( skulptitaBesto(x, z) & 4 ) === 0 ) continue;
      if ( akvo(x, z) ) continue;
      npcZonoj.push({ x, z });
    }
  }

  const NPCLOKOJ: [ number, number ][] = [];
  const npcoj: Figuro[] = [];
  // Provo-rezerva buklo. hazarda ĉelo; se la loko falas sur konstruajxon aux
  // akvon ( kun la jittero ), provu alian — la kvanto plenigxas tiel longe kiel
  // ekzistas validaj ĉeloj.
  let provoj = 0;
  while ( npcoj.length < 0o230 && provoj < 0o2000 && npcZonoj.length > 0 ) {
    provoj++;
    const loko = npcZonoj[( Math.random() * npcZonoj.length ) | 0];
    const sX = loko.x + ( Math.random() - 0o1/0o2 ) * 0o3;
    const sZ = loko.z + ( Math.random() - 0o1/0o2 ) * 0o3;
    if ( ekskluziviRiveron(sX, sZ) || ekskluziviKonstruajxon(sX, sZ, 3) ) continue;
    const fig = konstruiFiguron(VESTA_LISTO[npcoj.length % VESTA_LISTO.length], Math.random() < 0o1/0o4 ? "haroLonga" : "haroMalalta");
    const h = alteco(sX, sZ);
    fig.group.position.set(sX, h, sZ);
    fig.hejmo.set(sX, h, sZ);
    fig.celo.set(sX, h, sZ);
    fig.atendo = Math.random() * 4;
    fig.rapido = 0o55/0o100 + Math.random() * 0o4/0o10;
    sceno.add(fig.group);
    npcoj.push(fig);
    NPCLOKOJ.push([ sX, sZ ]);
  }
  await raporti();

  // ⟪ Metitaj objektoj ( la objekta ilo de la skulptilo ) 📃 ⟫ — la
  // individuaj objektoj de SKULPTA_OBJEKTOJ. plantoj cxe siaj precizaj
  // pozicioj, akvaj bestoj kaj petreloj en la animaci-sistemojn ( ili naĝas/
  // flugas cxe la ankro ), NPC-oj en la npc-aron, kaj la kanuoj 🛶 kaj la
  // spacosxipo 🚀 kiel la ceteraj objektoj.
  const kanuoj: Kanoto[] = [];
  const xipo = konstruiMetitajnObjektojn(sceno, SKULPTA_OBJEKTOJ as MetitaObjekto[],
    alteco, akvo, akvaNivelo, bestoj, petreloj, npcoj, kanuoj, oraMaterialo, eniraMaterialo,
    selektajxoj);
  // La sxipa interno flosas CE LA SXIPO ( ne sur la tero ). Marku la cefan
  // stacion per la fluga alteco, por ke eniri la spacosxipon teleportu al la
  // supro kie gxi estas. Sen sxipa objekto la stacio restas sur la tero.
  const stacioSxipo = cefa.konstruSpecoj.find(s => s.type === "stacioxipo");
  if ( stacioSxipo && xipo ) stacioSxipo.flugoY = xipo.group.position.y;
  await raporti();

  // ⟪ Interna sistemo 📃 ⟫
  const internaSistemo: InternaSistemo = kreiInternanSistemon();

  return {
    konstruSpecoj, kolizioj, dokoKolizioj, selektajxoj, konstruGrupoj,
    vojSpecimenoj, placajNodoj,    riverData, riveroNordOrienta, lago, skulptaAkvo, bestoj, petreloj, lampSistemo,
    nebuloj, kanuoj, pussxlefoBeroj, npcoj, internaSistemo, xipo, vojDifinoj, vojDuonLargho: ( _g: number ) => 0o7/0o10,
    NPCLOKOJ, VESTA_LISTO,
  };
}
