// ≺⧼ La krada urbo 📐 ⧽≻
// La ĉefurba krado estas DIAMANTA kruca aranĝo kun kvar-flanka simetrio. La
// krada logiko ( kreiKradon, tipoDeRingo, tipoDeBloko, fazoDeCelo,
// kradajDerivajoj kaj la tipoj KradaArangxo / CellType / KradaĈelo ) vivas en
// kantaoj/mondo/krado/ — pura modulo komuna kun la terena skulptilo
// ( iloj/tero-skulptilo/tero-skulptilo.html ). La skulptilo montras kaj
// redaktas la saman kradon per kreiKradanPlanon ( la plena voja/sprona logiko
// kiel puraj datumoj ).
// La konstruo de UNU krada urbo ĉe donita ofseto — la konstruaĵoj, la voja reto
// kun spronoj, la kruciĝaj platoj, la rondigitaj arkoj, la keŭfĥesoj kaj la
// lampaj lokoj ( KradaUrbaRezulto, konstruiKradanUrbon ).
import * as THREE from "three";
import { kunfandiMondajnMeshojn } from "../../../eskekoj/komunajxoj/kunfandajxoj.js";
import { konstruiSatalon } from "../../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { KonstruSpec } from "../../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import type { VojDifino } from "../../../eskekoj/medio/vojoj/tipoj.js";
import { kreiKradon, tipoDeBloko } from "../krado/celoj.js";
import { kradajDerivajoj } from "../krado/derivajoj.js";
import { skaniVojanReton } from "../krado/skanado.js";
import { aplikiSuperojn } from "../krado/superoj.js";
import type { KradaArangxo, CellType, AldonaBloko } from "../krado/tipoj.js";
import { konstruiKeuxfhxeso, KeuxfhxesoLoko } from "../../../eskekoj/mebloj/keuxfhxeso.js";
import { riveroZ, alteco, akvo } from "../tereno.js";
import { kreiLampAldonilon } from "./lampoj.js";

// KradaUrbaRezulto — la rezulto de konstruiKradanUrbon. la tuta krada urbo
// ( konstruajxoj, voja reto, spronoj, platoj, arkoj, keŭfĥesoj kaj lampaj
// lokoj ) konstruita ĉe donita ofseto. La mond-nivelaj partoj ( rivero,
// dokoj, vegetajxo ) restas en konstruiUrbon, kiu vokas ĉi tiun funkcion por
// la ĈEFA urbo ( unu-bloka, grandeco 3 ) KAJ la TESTA urbo ( kvar-bloka,
// grandeco 2 ) trans la rivero.
export interface KradaUrbaRezulto {
  konstruSpecoj: KonstruSpec[];
  kolizioj: { x: number; z: number; r: number }[];
  selektajxoj: THREE.Mesh[];
  konstruGrupoj: THREE.Group[];
  placajNodoj: [ number, number ][];
  // ⟨ La voja reto kiel DATUMOJ, ne kiel geometrio 📃 ⟩ — la krada urbo NE plu
  // konstruas siajn proprajn vojojn kaj platojn. Ĝi redonas ilin, kaj
  // konstruiUrbon kunigas la kradajn difinojn, la spronojn KAJ la skulptitajn
  // mondvojojn en UNU konstruadon — vidu "Unu reto, unu konstruado" sube.
  // Antaŭe du apartaj konstruadoj faris du sendependajn retojn, do la krado
  // ne sciis pri la mondo-vojoj ( kaj inverse ) — ĉiu kunigo inter la du
  // restis sen truo kaj sen plato, kaj la du vojoj kuŝis unu en la alia.
  vojDifinoj: VojDifino[];
  kunigajPunktoj: [ number, number ][];
  kunigajFermitaj: Map<string, [ number, number ]>;
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
export function konstruiKradanUrbon(
  sceno: THREE.Scene,
  arangxo: KradaArangxo,
  ofseto: [ number, number ],
  oraMaterialo: THREE.MeshStandardMaterial,
  aldonajBlokoj: AldonaBloko[] = [],
  superoj?: Map<string, CellType>,
): KradaUrbaRezulto {
  const [ ofsX, ofsZ ] = ofseto;
  const ĉeloj = kreiKradon(arangxo);
  // La manaj ĉel-superoj de la skulptilo — la sama aplikado kiel en
  // kreiKradanPlanon ( krado.ts ), tra la komuna helpilo aplikiSuperojn.
  // Anstataŭigo de ekzistanta ĉelo ŝanĝas ĝian tipon; nova ŝlosilo ALDONAS
  // ĉelon ( la voja reto konstruiĝas ĉirkaŭ ĝi kiel ĉe la generitaj ĉeloj ).
  // La sub-ŝlosiloj ( "c,r,NE" ) traktiĝas en la kvar-blokaj sub-konstruajxoj
  // sube.
  aplikiSuperojn(ĉeloj, superoj);
  const kolizioj: { x: number; z: number; r: number }[] = [];
  // La krado-derivaĵoj — komuna kun la skulptilo ( kantaoj/mondo/krado.ts ). PASXO 24/40,
  // stacio 24 norde de la pinto, kvadrata stacidoma ringo 24×24 ĉirkaŭ la
  // pinta baranta domo ( norda flanko 12 norde — 0o14 ), BLOKO 8 ( kvar-bloka
  // ofseto — konstruaĵoj je ±8, kompakta bloko 24×24 ).
  const { PASXO, nordaPinto, ringoX, sudaVojo, stacioZ, BLOKO } = kradajDerivajoj(arangxo);

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
  const antaŭajGefiloj = new Set<THREE.Object3D>(sceno.children);
  konstruSpecoj.forEach(s => konstruGrupoj.push(konstruiSatalon(s, sceno, selektajxoj)));
  // ⟪ La urbaj konstruaĵoj kunfandiĝas 📃 ⟫ — ĉiu konstruaĵo estas aro da 10-20
  // etaj meshoj ( la klinitaj tavoloj, la oraj kadroj, la pordoj, la fenestroj,
  // la steleoj kaj signoj, la tabloj ) plus sia diamanta spegulo sub la grundo.
  // Ĉiu el tiuj meshoj estas aparta desegna alvoko en la ĈEFA pasumo KAJ denove
  // en la OMBRA pasumo — la konstruaĵoj estas la plej granda unuopa fonto de
  // alvokoj en la tuta ludo ( ĉirkaŭ 600 alvokoj por ĉirkaŭ 40 konstruaĵoj ).
  // Ili neniam moviĝas, do ili povas dividi la samajn kunigitajn meshojn po
  // ( materialo · ombra stato · spaca ĉelo ). La muroj ( la elekteblaj meshoj,
  // kiuj portas userData.spec por la klako kaj la internoj ) restas APARTAJ.
  const konservotaj = new Set<THREE.Object3D>(selektajxoj);
  kunfandiMondajnMeshojn(sceno, sceno.children.filter(o => !antaŭajGefiloj.has(o)), {
    celo: 0o100,                             // 64 unuoj — kongrua kun la vidlimoj
    konservu: ( m ) => konservotaj.has(m),
  });

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

  // L-korneroj — nodoj kie AMBAŬ perpendikularaj vojoj finiĝas samloke ( la
  // kvar anguloj de la krada rombo ). Tiuj ricevas la SAMAN kunigan platon kiel
  // la T-kunigoj kaj la kruciĝoj — kun AMBAŬ direktoj fermitaj. La libera
  // kvadranto de la plato ricevas la arkon de la tuta voja larĝo ( la ekstera
  // arko de la kornero ), kaj la enkoreja kvadranto la arkon de la bordo-larĝo.
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
  // vojo haltas ĉe la rando de la kuniga plato, do ĝiaj andezitaj flankoj ne
  // kuŝas super la diorita centro de la trapasanta vojo; la plato mem desegnas
  // la sekcon de la trapasanta vojo kaj rondigas la du angulojn de la kunigo.
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
  // La spronaj T-kunigoj — kie pordo-sprono de konstruajxo atingas la kradan
  // vojon. Anstataux nura interkovro ili ricevas la SAMAN rondigitan T-platon
  // kiel la kradaj T-kunigoj, do cxiu konstruajxa aliro estas vera T-krucigxo.
  // La mapo plenigxas dum la sprona buklo malsupre.
  const spronajKunigoj = new Map<string, [ number, number ]>();
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

  // ⟪ Spronvojoj 📃 ⟫
  // ⟨ La spronoj estas ORDINARAJ vojoj 📃 ⟩ — la vojeto de konstruaĵa pordo al
  // la strato nun estas ordinara `VojDifino` en la SAMA listo kiel la kradaj
  // stratoj kaj la skulptitaj mondvojoj. Ĝi do ricevas la saman sekcon, la
  // samajn materialojn, la saman ŝtupan generacion, la saman kunigan truon kaj
  // la saman kunigan platon — kaj la specimensampado de la voja konstruilo jam
  // kovras ĝin, do neniu aparta specimen-listo necesas.
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
    let spronaKunigo: [ number, number, number, number ] | null = null;

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
      // ⟨ GXIS LA VOJA CENTRO 📃 ⟩ — la sprono iras gxis la CENTRO de la
      // kunigo, ĝuste kiel ĉiu krada aŭ skulptita vojo. La voja konstruilo
      // mem fortranĉas la parton ene de la kuniga truo ( vidu
      // kreiSegmentajnPartojn ) — la plato posedas tiun kvadraton kaj rondigas
      // la kunigon. Antaŭe la sprono haltis mane ĉe la plato-rando, do ĝia
      // geometrio neniam estis tranĉita kaj povis finiĝi super la plato.
      vojX = celX;
      vojZ = spronoZ;
      spronaKunigo = [ celX, spronoZ, signo, 0 ];
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
      // La sprono iras gxis la centro de la kunigo ( vidu la x-flankan noton
      // supre ) — la konstruilo fortranĉas la enon de la kuniga truo.
      vojX = spronoX;
      vojZ = celZ;
      spronaKunigo = [ spronoX, celZ, 0, signo ];
    }

    if ( Math.hypot(spronoX - vojX, spronoZ - vojZ) > 0o4/0o10 ) {
      // La kunigo ricevas T-platon se gxi ne jam estas krada krucigxo aux
      // T/arka nodo — la sprono finigxas gxuste cxe la plato-brako.
      if ( spronaKunigo ) {
        const klavo = spronaKunigo[0] + "," + spronaKunigo[1];
        if ( !tFermitaj.has(klavo) && !realajIntersekcoj.has(klavo) && !arkajKlavoj.has(klavo) )
          spronajKunigoj.set(klavo, [ spronaKunigo[2], spronaKunigo[3] ]);
      }
      // La sprono kiel ORDINARA voja difino — la SAMA larĝo kiel la krada
      // strato ( `w` estas la larĝo de la diorita bendo, vidu
      // kreiVojajnBendojn kaj la kradajn difinojn supre; la andezitaj randoj
      // alkalkuliĝas ambaŭflanke ) kaj la sama listo kiel la kradaj vojoj, do
      // la konstruilo traktas ĝin idente. La malnova konstruiSpronon uzis ĉi
      // tiun saman larĝon ( 0o16/0o10 ).
      vojDifinoj.push({ pts: [ [ spronoX, spronoZ ], [ vojX, vojZ ] ], w: 0o16/0o10 });
    }
  }

  // ⟪ Kunigaj platoj 📃 ⟫ — ĈIU kunigo de la voja reto ( la kvarvojaj kruciĝoj,
  // la T-kunigoj, la spronaj kunigoj kaj la L-korneroj ) ricevas platon kiu
  // posedas la kunigan kvadraton. La vojoj lasas truon en tiu kvadrato kaj la
  // plato kovras gxin — dioritaj strioj laŭ la vojoj kaj andezitaj anguloj
  // RONDIGITAJ per la arko de la L-kornero. La andezitaj flankoj de la vojoj
  // tial ne plu kuŝas super la dioritaj partoj de la plato, kaj ĉiuj kunigoj
  // aspektas la same rondigitaj — unu listo por la geometria truo kaj por la
  // platoj mem.
  const kunigajKlavoj = [ ...realajIntersekcoj, ...spronajKunigoj.keys(), ...arkajKlavoj,
    ...tNodoj.map(( [ px, pz ] ) => px + "," + pz ) ];
  const kunigajPunktoj = kunigajKlavoj.map(klavo => klavo.split(",").map(Number) as [ number, number ]);
  // La fermitaj direktoj — T-kunigo havas unu ( la flanko de la finiĝanta
  // vojo ), L-kornero du ( la libera kvadranto ), kaj la kvarvoja kruciĝo
  // neniun. La spronaj kunigoj aldonas sian propran fermitan direkton.
  const fermitaj = new Map<string, [ number, number ]>([ ...tFermitaj, ...spronajKunigoj ]);
  for ( const a of arkajNodoj ) fermitaj.set(a.x + "," + a.z, [ a.sx, a.sz ]);

  // ⟨ Unu reto, unu konstruado 📃 ⟩ — ĉi tiu urbo NE konstruas siajn vojojn
  // nun. La difinoj, la kunigaj punktoj kaj la fermitaj direktoj revenas al
  // konstruiUrbon, kiu kunigas ĉiujn kradajn urbojn, ĉiujn spronojn kaj ĉiujn
  // skulptitajn mondvojojn en UNU liston kaj konstruas ilin per UNU voko al
  // konstruiVojojn kaj UNU voko al konstruiIntersekcajnPlatojn. Ĉiu kunigo —
  // krada kruciĝo, T-kunigo, arko, sprono al krada strato aŭ sprono al la
  // kajo — nun ricevas sian truon en ĉiuj vojoj kaj sian ununuran platon.

  // ⟪ Lampoj ( la krada parto ) 📃 ⟫ — la lampaj lokoj de ĉi tiu urbo.
  // kvar lampoj ĉirkaŭ ĉiu placo-nodo, ĉiu reala krada kruciĝo kaj ĉiu arko.
  // La monda lampo-konstruo en konstruiUrbon kunigas ĉi tiujn kun la lagaj kaj
  // montaraj lampoj kaj konstruas UNU hxeuxfa-sistemon.
  const lampLokoj: { x: number; z: number; y: number; rotacio?: number }[] = [];
  const addLamp = kreiLampAldonilon(konstruSpecoj, lampLokoj);
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
    vojDifinoj, kunigajPunktoj, kunigajFermitaj: fermitaj,
    lampLokoj, keuxfhxesoLokoj,
    staciaPozicio: staciaBloko
      ? [ ofsX + staciaBloko.x, ofsZ + staciaBloko.z ]
      : [ ofsX, ofsZ + ( arangxo.blokaGrando === "kvar" ? 0 : stacioZ ) ],
    ringoX: ofsX + ringoX,
    sudaVojo: ofsZ + sudaVojo,
  };
}
