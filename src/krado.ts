// ≺⧼ Urba krado 📐 ⧽≻
// Pura, sendependa modulo ( NENIU three.js, NENIU DOM ) — la komuna krada
// logiko de la ludo ( urbo.ts ) kaj de la terena skulptilo ( iloj/ ). La
// ludo konstruas la urbon el ĉi tiuj funkcioj; la skulptilo montras kaj
// redaktas la saman kradon per la plena plano ( kreiKradanPlanon ) kaj
// kontrolas ĝin per validiKradon.
//
// kreiKradanPlanon reflektas la voja/sprona logikon de konstruiKradanUrbon en
// urbo.ts ( la sama algoritmo, sed puraj datumoj anstataŭ meshoj ). Se oni
// ŝanĝas la vojan aŭ spronan logikon en urbo.ts, oni ŝanĝu ankaŭ ĉi tiun
// planon — la skulptilo montras la saman logikon.
//
// La koordinatoj estas RELATIVAJ al la krada centro ( ofseto 0 ).

// ── Tipoj ──────────────────────────────────────────────────────────────────

export interface KradaArangxo {
  arangxaGrando: number;             // la tavoloj sur ĉiu flanko
  blokaGrando: "unu" | "kvar";       // unu konstruaĵo po ĉelo, aŭ kvar en bloko
}

export type CellType = "domo" | "turo" | "mangxejo" | "kasafeo" | "sanktejo";

export type KradaĈelo = [ number, number, CellType ];

export interface KradaKonstruajxo {
  x: number; z: number; rot: number; tipo: CellType;
  cx: number; cz: number;            // la ĉelo ( kolumno, vico )
  sub: "centro" | "NE" | "NW" | "SW" | "SE";  // pozicio en la bloko ( unu: "centro" )
  stacia: boolean;                   // la kosmoporda stacio ( unu. norde; kvar. centro )
}

export interface KradaVojSegmento {
  orient: "NS" | "EW";
  poz: number;                       // la fiksa koordinato ( x por NS, z por EW )
  de: number; al: number;            // la intervalo laŭ la alia akso
  stacia?: boolean;                  // stacidoma ringo/vojo ( nur unu-bloka krado )
}

export interface KradaSpono {
  de: [ number, number ];            // muro-bazo de la pordo
  al: [ number, number ];            // la celo sur la vojo
  konstruajxo: number;               // indekso en konstruaĵoj
}

export interface KradaPlano {
  arangxo: KradaArangxo;
  ĉeloj: KradaĈelo[];
  PASXO: number;
  nordaPinto: number;                // la plej norda vico
  ringoX: number;                    // la vojo inter kolumnoj 0 kaj 1
  ringoSuda: number;                 // la vojo inter la du plej nordaj vicoj
  sudaVojo: number;                  // la plej suda krada vojo
  stacioZ: number;                   // la stacio sidas 24 norde de la pinto ( unu )
  staciaRingaNordo: number;          // la norda flanko de la stacidoma ringo ( unu )
  konstruaĵoj: KradaKonstruajxo[];
  vojoj: KradaVojSegmento[];
  spronoj: KradaSpono[];
  spurXoj: number[];
  spurZoj: number[];
  retoX: number[];
  retoZ: number[];
}

// ── Kradaj derivajoj ────────────────────────────────────────────────────────

// La krado-derivaĵoj — la samaj formuloj kiel en konstruiKradanUrbon.
export function kradajDerivajoj(arangxo: KradaArangxo): {
  PASXO: number; nordaPinto: number; ringoX: number; ringoSuda: number;
  sudaVojo: number; stacioZ: number; staciaRingaNordo: number; BLOKO: number;
} {
  const PASXO = arangxo.blokaGrando === "kvar" ? 0o40 : 0o30;
  const nordaPinto = arangxo.arangxaGrando * PASXO;
  const ringoX = PASXO / 2;
  const ringoSuda = ( arangxo.arangxaGrando - 0o1/0o2 ) * PASXO;
  const sudaVojo = -ringoSuda;
  const stacioZ = nordaPinto + 0o30;
  const staciaRingaNordo = nordaPinto + 0o14;
  const BLOKO = 0o10;
  return { PASXO, nordaPinto, ringoX, ringoSuda, sudaVojo, stacioZ, staciaRingaNordo, BLOKO };
}

// ── La ĉela krado ───────────────────────────────────────────────────────────

// kreiKradon — la ĉefurba krado kun kvar-flanka simetrio.
//   · n=1 — plus-formo. centro kun kvar ĉirkaŭantaj.
//   · n≥2 — DIAMANTO |x| + |z| ≤ n + 1. rondeta, kvazaŭ-cirkla formo — la
//     meza bendo plenlarĝa, la flankoj glate malkreskas al la diagonalaj
//     pintoj. NENIAM kvadrato, NENIAM izolita kornera bloko kaj NENIAM
//     ŝtuparo — ĉiu ĉelo konektiĝas al sia najbaro sen malplenaj spacoj
//     ( grandeco 3 = 37 ĉeloj, 4 = 57, 5 = 81, 6 = 109 ).
export function kreiKradon(arangxo: KradaArangxo): KradaĈelo[] {
  const n = arangxo.arangxaGrando;
  const ĉeloj: KradaĈelo[] = [];
  if ( n === 1 ) {
    // Unu tavolo — centro kun kvar ĉirkaŭantaj ( plus-formo ).
    for ( const [ x, z ] of [ [ 0, 1 ], [ 0, -1 ], [ -1, 0 ], [ 1, 0 ] ] ) ĉeloj.push([ x, z, "kasafeo" ]);
    ĉeloj.push([ 0, 0, "sanktejo" ]);
    return ĉeloj;
  }
  for ( let z = n; z >= -n; z-- ) {
    for ( let x = -n; x <= n; x++ ) {
      if ( x === 0 && z === 0 ) { ĉeloj.push([ 0, 0, "sanktejo" ]); continue; }
      if ( enKrado(n, x, z) ) {
        ĉeloj.push([ x, z, tipoDeRingo(Math.max(Math.abs(x), Math.abs(z)), x, z) ]);
      }
    }
  }
  return ĉeloj;
}

// enKrado — ĉu la ĉelo ( x, z ) apartenas al la krado je grandeco n? ( la
// diamanto priskribita supre ).
function enKrado(n: number, x: number, z: number): boolean {
  return Math.abs(x) + Math.abs(z) <= n + 1;
}

// tipoDeRingo — la konstruaĵa tipo de ĉelo laŭ ĝia ringo ( la Chebyshev-
// distanco de la centro ). La tipoj estas simetriaj sur ĉiuj kvar flankoj.
// La ALIAJ tipoj ( krom la domoj ) kreskas kun la grandeco — pli granda urbo
// havas pli da turoj, kasafeoj kaj mangxejoj, ne nur pli da domoj. La domoj
// tamen ĉiam superas la aliajn konstruaĵojn kune ( „pli da domoj ol la
// aliaj konstruaĵoj ĝenerale“ ).
//   · ringo 0 — la centra konstruaĵo ( sanktejo ).
//   · ringo 1 ( rekte apud la centro ) — kasafeoj ( kunvenoĉambroj ) ĉe la
//     kardinaloj, mangxejoj ĉe la diagonaloj.
//   · ringo 2 — turoj sur la kardinalaj aksoj, domoj alie.
//   · ringo 3 — la proksim-diagonalaj ĉeloj ( |x|+|z| = 5, koordinatoj 2 kaj
//     3 ) alternas kasafeojn kaj mangxejojn ĉirkaŭ la diamanto ( ili ekzistas
//     nur de grandeco 4 supren — ĉe grandeco 3 ĉi tiu ringo estas tute domoj
//     ); la cetero domoj.
//   · ringo 4+ — turoj sur la kardinalaj aksoj, domoj alie ( la turoj kreskas
//     kvar po ringo ).
export function tipoDeRingo(r: number, x: number, z: number): CellType {
  if ( r === 0 ) return "sanktejo";
  if ( r === 1 ) return Math.abs(x) === Math.abs(z) ? "mangxejo" : "kasafeo";
  if ( r === 2 ) return Math.min(Math.abs(x), Math.abs(z)) === 0 ? "turo" : "domo";
  if ( r === 3 ) {
    // La proksim-diagonalaj ĉeloj ( koordinatoj 2 kaj 3 ) alternas la tipojn
    // ĉirkaŭ la diamanto. Kasafeo kiam la signoj de x·z kaj |x|−|z| kongruas.
    // (3,2), (−2,3), (−3,−2), (2,−3) — kaj la aliaj kvar estas mangxejoj.
    // La aro estas fermita sub 90°-rotacio, do la tuta krado restas simetria.
    if ( Math.abs(x) + Math.abs(z) === 5 ) {
      return ( x * z > 0 ) === ( Math.abs(x) > Math.abs(z) ) ? "kasafeo" : "mangxejo";
    }
    return "domo";
  }
  return Math.min(Math.abs(x), Math.abs(z)) === 0 ? "turo" : "domo";
}

// fazoDeCelo — la rotacia fazo de kvar-bloka ĉelo. la baza miksado de la
// bloko rotaciiĝas per ĉi tiu kvanto laŭ la pozicio de la ĉelo en la
// rotacia ciklo de la krado ( N→W→S→E, NE→NW→SW→SE ), por ke la TUTA krado
// estu simetria sub 90°-rotacio — la kardinalaj ĉeloj ( sur la centraj
// linioj ) kaj la diagonalaj ĉiuj rotacias laŭ sia pozicio.
export function fazoDeCelo(cx: number, cz: number): number {
  const ax = Math.abs(cx), az = Math.abs(cz);
  if ( ax === az ) {  // diagonaloj — (+,+)=0, (−,+)=1, (−,−)=2, (+,−)=3
    if ( cx > 0 && cz > 0 ) return 0;
    if ( cx < 0 && cz > 0 ) return 1;
    if ( cx < 0 && cz < 0 ) return 2;
    return 3;
  }
  if ( az > ax ) return cz > 0 ? 0 : 2;   // nordo/sudo sur la centra linio
  return cx > 0 ? 3 : 1;                  // oriento/okcidento sur la centra linio
}

// tipoDeBloko — la tipo de unu sub-konstruaĵo en kvar-bloka ĉelo. La sub-
// pozicioj estas la kvar anguloj ( NE, NW, SW, SE ), ĉiu rotaciita al sia
// flanko. La tipoj miksiĝas en la bloko ( la escepto — domoj restas kune pli
// ofte ), kaj la baza miksado rotaciiĝas per la ĉela fazo ( vidu
// fazoDeCelo ), por ke la tuta krado restu simetria.
export function tipoDeBloko(bazo: CellType, cx: number, cz: number, ox: number, oz: number): CellType {
  if ( bazo === "sanktejo" ) return bazo;          // la centro restas unuopa
  if ( bazo === "domo" ) return "domo";            // domoj okazas kune pli ofte
  // La bazaj miksadoj ( ĉe fazo 0 ). turo-bloko — domo ĉe NE, kasafeo ĉe SW,
  // turoj ĉe NW/SE; kasafeo/mangxejo — kasafeoj ĉe NE/SW, mangxejoj ĉe NW/SE.
  const bazoTipoj: CellType[] = bazo === "turo"
    ? [ "domo", "turo", "kasafeo", "turo" ]
    : [ "kasafeo", "mangxejo", "kasafeo", "mangxejo" ];
  const fazo = fazoDeCelo(cx, cz);
  const i = ox > 0 ? ( oz > 0 ? 0 : 3 ) : ( oz > 0 ? 1 : 2 );   // NE=0, NW=1, SW=2, SE=3
  return bazoTipoj[( i - fazo + 4 ) % 4];
}

// ── La plena plano ──────────────────────────────────────────────────────────

// kreiKradanPlanon — la plenan kradan urbon ( konstruaĵoj, vojoj, spronoj )
// kiel PURAJN datumojn. Ĝi reflektas la loĝikan strukturon de
// konstruiKradanUrbon en urbo.ts ( sen la meshoj ). la samaj pozicioj,
// rotacioj, vojo-linioj, ekstentoj kaj spronoj. La terena skulptilo montras
// ĉi tiun planon — se la ludo ŝanĝiĝas, la plano devas ŝanĝiĝi same.
// superoj — manaj ĉel-superoj de la terena skulptilo. la ŝlosilo estas
// "c,r", la valoro la ĉela tipo. Anstataŭigo de ekzistanta ĉelo ŝanĝas ĝian
// tipon; nova ŝlosilo ALDONAS ĉelon ( la voja reto konstruiĝas ĉirkaŭ ĝi
// kiel ĉe la generitaj ĉeloj ).
export function kreiKradanPlanon(arangxo: KradaArangxo, superoj?: Map<string, CellType>): KradaPlano {
  const { PASXO, nordaPinto, ringoX, ringoSuda, sudaVojo, stacioZ, staciaRingaNordo, BLOKO } = kradajDerivajoj(arangxo);
  const n = arangxo.arangxaGrando;
  const ĉeloj = kreiKradon(arangxo);
  if ( superoj ) {
    for ( const [ ŝ, tipo ] of superoj ) {
      const [ c, r ] = ŝ.split(",").map(Number);
      const ind = ĉeloj.findIndex(([lc, lr]) => lc === c && lr === r);
      if ( ind >= 0 ) ĉeloj[ind] = [ c, r, tipo ];
      else ĉeloj.push([ c, r, tipo ]);
    }
  }
  // La stacio estas ĈELO de la krado ( nur unu-bloka ) — la plej norda ĉelo
  // ( 0, n+1 ), rekte norde de la pinto. la voja reto konstruiĝas ĉirkaŭ ĝi
  // kiel ĉirkaŭ ĉiu alia ĉelo ( la vojo sude, oriente kaj okcidente ), kaj
  // la stacio konektiĝas per normala sprono. En la kvar-bloka krado la
  // stacio estas la CENTRO ( vidu la konstruan buklon sube ).
  if ( arangxo.blokaGrando === "unu" && !ĉeloj.some(([c, r]) => c === 0 && r === n + 1) ) {
    ĉeloj.push([ 0, n + 1, "sanktejo" ]);
  }

  // ── Konstruaĵoj ──
  const konstruaĵoj: KradaKonstruajxo[] = [];
  const aldoni = (x: number, z: number, rot: number, tipo: CellType, sub: KradaKonstruajxo["sub"], stacia: boolean) => {
    konstruaĵoj.push({ x, z, rot, tipo, cx: Math.round(x / PASXO), cz: Math.round(z / PASXO), sub, stacia });
  };
  for (const [ col, row, tipo ] of ĉeloj) {
    const cx = col * PASXO, cz = row * PASXO;
    if ( arangxo.blokaGrando === "unu" && col === 0 && row === n + 1 ) {
      // La stacidoma ĉelo ( 0, n+1 ) — la kosmoporda stacio, pordo suden al
      // la kradvojo ( la fronta regulo sube turnas ĝin suden ).
      aldoni(0, stacioZ, Math.PI, "sanktejo", "centro", true);
      continue;
    }
    if ( col === 0 && row === 0 ) {
      // La centro — la centra konstruaĵo ( sanktejo ), aŭ la STACIO en la
      // kvar-bloka krado ( "centra konstruaĵo aŭ stacio en la centro" ).
      if ( arangxo.blokaGrando === "kvar" ) aldoni(0, 0, 0, "sanktejo", "centro", true);
      else aldoni(0, 0, 0, tipo, "centro", false);
      continue;
    }
    if ( arangxo.blokaGrando === "kvar" ) {
      // Kvar-konstruajxa bloko — la ORIGINALA aranĝo. la kvar konstruaĵoj
      // sidas ĉe la kvar anguloj ( NE, NW, SW, SE je ±BLOKO ), ĉiu rotaciita
      // al sia bloka flanko ( nordo, okcidento, sudo, oriento ).
      const suboj: [ number, number, number, KradaKonstruajxo["sub"] ][] = [
        [  BLOKO,  BLOKO,  0,            "NE" ],
        [ -BLOKO,  BLOKO,  -Math.PI / 2, "NW" ],
        [ -BLOKO, -BLOKO,   Math.PI,     "SW" ],
        [  BLOKO, -BLOKO,   Math.PI / 2, "SE" ],
      ];
      for ( const [ blx, blz, rot, sub ] of suboj ) aldoni(cx + blx, cz + blz, rot, tipoDeBloko(tipo, col, row, blx, blz), sub, false);
    } else {
      aldoni(cx, cz, 0, tipo, "centro", false);
    }
  }
  // La fronta regulo ( unu-bloka ) — frontu al la centro laŭ la domina akso
  // ( la sama regulo kiel en urbo.ts ). La diamanta formo havas NENIAN
  // izolitan korneran ĉelon, do ĉiu pordo trovas kradan vojon antaŭ si.
  if ( arangxo.blokaGrando === "unu" ) {
    for ( const k of konstruaĵoj ) {
      if ( k.stacia || ( k.x === 0 && k.z === 0 ) ) continue;
      if ( Math.abs(k.x) > Math.abs(k.z) ) k.rot = k.x > 0 ? -Math.PI / 2 : Math.PI / 2;
      else k.rot = k.z > 0 ? Math.PI : 0;
    }
  }

  // ── Voja reto ──
  const vojoj: KradaVojSegmento[] = [];
  const colSet = new Set<number>(), rowSet = new Set<number>();
  for ( const [ c, r, t ] of ĉeloj ) { if ( t !== null ) { colSet.add(c); rowSet.add(r); } }
  const KOLOJ = [ ...colSet ].sort((a, b) => a - b);
  const VICOJ = [ ...rowSet ].sort((a, b) => a - b);
  // NS-vojoj ( inter apudaj kolumnoj ) kaj EW-vojoj ( inter apudaj vicoj ).
  const RETO_X: number[] = [];
  for ( let ci = 0; ci < KOLOJ.length - 1; ci++ ) {
    if ( KOLOJ[ci + 1] - KOLOJ[ci] === 1 ) RETO_X.push(( KOLOJ[ci] + KOLOJ[ci + 1] ) / 2 * PASXO);
  }
  const RETO_Z: number[] = [];
  for ( let ri = 0; ri < VICOJ.length - 1; ri++ ) {
    if ( VICOJ[ri + 1] - VICOJ[ri] === 1 ) RETO_Z.push(( VICOJ[ri] + VICOJ[ri + 1] ) / 2 * PASXO);
  }
  // La eksteraj vojoj ( unu pasxon preter la plej ekstera vico/kolumno ). la
  // kvar-bloka krado bezonas ilin, ĉar ĉiu bloko havas konstruaĵojn sur ĉiuj
  // kvar flankoj ( la voja bloko ). La unu-bloka krado ne bezonas ilin — ĉiuj
  // konstruaĵoj frontas al la centro, do la plej ekstera vojo-linio kuŝas
  // inter la du plej eksteraj vicoj/kolumnoj. Ili etendiĝas nur kie reale
  // ekzistas blokoj ( vidu hasCellAt sube ) — la malplenaj korneroj de la
  // diamanto ricevas nenian vojon.
  if ( arangxo.blokaGrando === "kvar" ) {
    const e = ( n + 0o1/0o2 ) * PASXO;
    RETO_X.push(e, -e);
    RETO_Z.push(e, -e);
  }
  const hasCellAt = (c: number, r: number) =>
    ĉeloj.some(([lc, lr, lt]) => lc === c && lr === r && lt !== null);

  // La ekstentoj de ĉiu vojo-linio ( kie la segmentoj reale ekzistas ) — por
  // la sprona gardo ( la samaj ekstentoj kiel en urbo.ts ).
  const NS_ekstentoj = new Map<number, [ number, number ]>();
  const EW_ekstentoj = new Map<number, [ number, number ]>();
  // EW-vojoj ( inter apudaj vicoj ) — segmentoj NUR inter intersekcaj NS-vojoj.
  for ( const roadZ of RETO_Z ) {
    const r1 = Math.round(roadZ / PASXO - 0o4/0o10);
    const r2 = Math.round(roadZ / PASXO + 0o4/0o10);
    const intersecting: number[] = [];
    for ( const rx of RETO_X ) {
      const c1 = Math.round(rx / PASXO - 0o4/0o10);
      const c2 = Math.round(rx / PASXO + 0o4/0o10);
      if ( hasCellAt(c1, r1) || hasCellAt(c1, r2) || hasCellAt(c2, r1) || hasCellAt(c2, r2) ) intersecting.push(rx);
    }
    if ( intersecting.length < 2 ) continue;
    const pts = [ ...intersecting ].sort((a, b) => a - b);
    // La DIAMANTA limo ( unu-bloka ). la vojoj ne ĉirkaŭvolvas la kornerajn
    // blokojn — segmento ekzistas nur se ĝia mezo kuŝas ene de la krada
    // diamanto |x| + |z| ≤ ( n + 1 )·PASXO ( relativa al la centro ). La
    // korneraj blokoj ( ±(n−1), ±(n−1) ) ricevas vojon nur sur siaj internaj
    // flankoj — NE la plenan vojan kvadraton kiel la flankaj blokoj.
    let uzeblaj = pts;
    if ( arangxo.blokaGrando === "unu" ) {
      const limo = ( n + 1 ) * PASXO;
      let unua = -1, lasta = -1;
      for ( let i = 0; i < pts.length - 1; i++ ) {
        if ( Math.abs(( pts[i] + pts[i + 1] ) / 2) + Math.abs(roadZ) <= limo ) {
          if ( unua < 0 ) unua = i;
          lasta = i;
        }
      }
      if ( unua < 0 ) continue;
      uzeblaj = pts.slice(unua, lasta + 2);
    }
    EW_ekstentoj.set(roadZ, [ uzeblaj[0], uzeblaj[uzeblaj.length - 1] ]);
    for ( let i = 0; i < uzeblaj.length - 1; i++ ) {
      const x1 = uzeblaj[i], x2 = uzeblaj[i + 1];
      if ( Math.abs(x2 - x1) > 0o1/0o10 ) vojoj.push({ orient: "EW", poz: roadZ, de: x1, al: x2 });
    }
  }
  // NS-vojoj ( inter apudaj kolumnoj ) — segmentoj NUR inter intersekcaj EW-vojoj.
  for ( const roadX of RETO_X ) {
    const c1 = Math.round(roadX / PASXO - 0o4/0o10);
    const c2 = Math.round(roadX / PASXO + 0o4/0o10);
    const intersecting: number[] = [];
    for ( const rz of RETO_Z ) {
      const r1 = Math.round(rz / PASXO - 0o4/0o10);
      const r2 = Math.round(rz / PASXO + 0o4/0o10);
      if ( hasCellAt(c1, r1) || hasCellAt(c1, r2) || hasCellAt(c2, r1) || hasCellAt(c2, r2) ) intersecting.push(rz);
    }
    if ( intersecting.length < 2 ) continue;
    const pts = [ ...intersecting ].sort((a, b) => a - b);
    let uzeblaj = pts;
    if ( arangxo.blokaGrando === "unu" ) {
      const limo = ( n + 1 ) * PASXO;
      let unua = -1, lasta = -1;
      for ( let i = 0; i < pts.length - 1; i++ ) {
        if ( Math.abs(roadX) + Math.abs(( pts[i] + pts[i + 1] ) / 2) <= limo ) {
          if ( unua < 0 ) unua = i;
          lasta = i;
        }
      }
      if ( unua < 0 ) continue;
      uzeblaj = pts.slice(unua, lasta + 2);
    }
    NS_ekstentoj.set(roadX, [ uzeblaj[0], uzeblaj[uzeblaj.length - 1] ]);
    for ( let i = 0; i < uzeblaj.length - 1; i++ ) {
      const z1 = uzeblaj[i], z2 = uzeblaj[i + 1];
      if ( Math.abs(z2 - z1) > 0o1/0o10 ) vojoj.push({ orient: "NS", poz: roadX, de: z1, al: z2 });
    }
  }

  // ── Spronoj ──
  const spronoj: KradaSpono[] = [];
  // La doka avenuo ( mond-nivela vojo de la ĉefa urbo ) daŭrigas la NS-vojon
  // ĉe x=ringoX SUDEN de ĝia fino ( sudaVojo ) ĝis la kajo ( -0o130 ) — la
  // spronoj de la sudaj konstruaĵoj atingas ĝin, do la ekstento de tiu
  // vojo-linio etendiĝas tien ( nur unu-bloka ).
  if ( arangxo.blokaGrando === "unu" ) {
    const ekst = NS_ekstentoj.get(ringoX);
    if ( ekst ) ekst[0] = Math.min(ekst[0], -0o130);
  }
  for ( let i = 0; i < konstruaĵoj.length; i++ ) {
    const s = konstruaĵoj[i];
    if ( s.x === 0 && s.z === 0 ) continue;   // la centro ( kaj la kvar-bloka stacio )
    const rot = s.rot || 0;
    const duonD = 0o10 / 2;                        // d/2 — la konstruaĵoj estas kvadrataj ( w = d = 0o10 )
    const pordoOffset = duonD + 0o14/0o10;
    const pordoX = s.x + Math.sin(rot) * pordoOffset;
    const pordoZ = s.z + Math.cos(rot) * pordoOffset;
    const spronoX = s.x + Math.sin(rot) * duonD;   // la sprono komenciĝas ĉe la muro-bazo
    const spronoZ = s.z + Math.cos(rot) * duonD;
    const fX = Math.sin(rot), fZ = Math.cos(rot);
    const duonL = 0o7/0o10;
    let celX = 0, celZ = 0, celita = false;
    if ( Math.abs(fX) > Math.abs(fZ) ) {
      const signo = fX > 0 ? 1 : -1;
      celX = signo > 0 ? Math.max(...RETO_X) : Math.min(...RETO_X);
      for ( const rx of RETO_X ) {
        if ( signo > 0 && rx > pordoX && rx < celX ) celX = rx;
        if ( signo < 0 && rx < pordoX && rx > celX ) celX = rx;
      }
      // Neniu vojo antaŭ la pordo ( ekstera konstruaĵo frontanta for de la
      // urbo ) — nenia sprono anstataŭ vojo tra la konstruaĵo.
      if ( ( signo > 0 && celX <= spronoX ) || ( signo < 0 && celX >= spronoX ) ) continue;
      // La celo-vojo devas reale ekzisti ĉe la sprona pozicio ( la ekstenta
      // gardo de urbo.ts ) — nenia pendanta sprono al malplena tero.
      const ekstX = NS_ekstentoj.get(celX);
      if ( !ekstX || spronoZ < ekstX[0] - duonL || spronoZ > ekstX[1] + duonL ) continue;
      celZ = spronoZ;
      celita = true;
    } else {
      const signo = fZ > 0 ? 1 : -1;
      celZ = signo > 0 ? Math.max(...RETO_Z) : Math.min(...RETO_Z);
      for ( const rz of RETO_Z ) {
        if ( signo > 0 && rz > pordoZ && rz < celZ ) celZ = rz;
        if ( signo < 0 && rz < pordoZ && rz > celZ ) celZ = rz;
      }
      if ( ( signo > 0 && celZ <= spronoZ ) || ( signo < 0 && celZ >= spronoZ ) ) continue;
      const ekstZ = EW_ekstentoj.get(celZ);
      if ( !ekstZ || spronoX < ekstZ[0] - duonL || spronoX > ekstZ[1] + duonL ) continue;
      celX = spronoX;
      celita = true;
    }
    const celoX = celX - fX * duonL;
    const celoZ = celZ - fZ * duonL;
    if ( celita && Math.hypot(spronoX - celoX, spronoZ - celoZ) > 0o4/0o10 ) {
      spronoj.push({ de: [ spronoX, spronoZ ], al: [ celoX, celoZ ], konstruajxo: i });
    }
  }

  // La stacidoma ĉelo ( 0, n+1 ) ricevas siajn vojojn el la normala reto. la
  // EW-vojo ĉe ( n + 0.5 )·PASXO ( inter la pinta vico kaj la stacidoma
  // vico ) estas la suda flanko — la sprono de la stacio atingas ĝin — kaj la
  // NS-vojoj ĉe x=±ringoX estas la orienta/okcidenta flankoj. Neniu aparta
  // stacidoma ringo bezonatas. la norda pinta domo ( 0, n ) sidas inter la
  // vojoj ĉe z=( n − 0.5 )·PASXO kaj z=( n + 0.5 )·PASXO — neniu vojo
  // trairas ĝin. La diamanta limo ( supre ) tranĉas la kornonan vojon ĉe
  // z=( n + 0.5 )·PASXO al la stacidoma kolumno — la korneraj blokoj de la
  // pinta vico ricevas nenian vojon norde.

  return { arangxo, ĉeloj, PASXO, nordaPinto, ringoX, ringoSuda, sudaVojo, stacioZ, staciaRingaNordo, konstruaĵoj, vojoj, spronoj, spurXoj: RETO_X, spurZoj: RETO_Z, retoX: RETO_X, retoZ: RETO_Z };
}

// ── Validigoj ───────────────────────────────────────────────────────────────

export interface KradaProblemo { kodo: string; mesaĝo: string; }

// validiKradon — kontrolas la planon per la reguloj de la krada urbo.
//   · ĉiu ne-stacia konstruaĵo estas konektita per sprono ( neniu konstruaĵo
//     sen vojo, neniu pendanta sprono al malplena tero );
//   · neniu sprono transiras alian konstruaĵon;
//   · kvar-bloka. ĉiu bloko havas vojojn sur ĉiuj kvar flankoj ( la voja
//     bloko ), kaj la spaco inter la konstruaĵoj en la bloko egalas la
//     distancon de la konstruaĵo al la vojo;
//   · la TUTA krado estas simetria sub 90°-rotacio ( pozicioj kaj tipoj por
//     ĉiuj konstruaĵoj; rotacioj ankaŭ por la kvar-bloka krado kaj por la
//     ne-diagonalaj konstruaĵoj de la unu-bloka — la diagonalaj pordoj de la
//     unu-bloka frontas norden/suden, heredaĵo de la originala urbo );
//   · neniu vojo kuŝas en malplena regiono ( la korneroj de la diamanto ).
export function validiKradon(plano: KradaPlano): KradaProblemo[] {
  const problemoj: KradaProblemo[] = [];
  const { arangxo, konstruaĵoj, vojoj, spronoj, PASXO } = plano;
  const konektitaj = new Set(spronoj.map(s => s.konstruajxo));

  // 1. Ĉiu ne-stacia konstruaĵo havas spronon.
  for ( let i = 0; i < konstruaĵoj.length; i++ ) {
    const k = konstruaĵoj[i];
    if ( k.stacia || ( k.x === 0 && k.z === 0 ) ) continue;
    if ( !konektitaj.has(i) ) {
      problemoj.push({ kodo: "sen-sprono", mesaĝo: `konstruaĵo ${i} ( ${k.tipo} @ ${k.x},${k.z} ) havas neniun spronon` });
    }
  }

  // 2. Neniu sprono transiras alian konstruaĵon. La spronoj estas ĉiam
  //    aks-paralelaj ( la pordo frontas laŭ la domina akso, la celo kuŝas sur
  //    la sama linio ), do sufiĉas intervala interkovro sur ambaŭ aksoj.
  const duonLarĝo = 0o10 / 2;   // la konstruaĵoj estas kvadrataj ( w = d = 0o10 )
  for ( const sp of spronoj ) {
    const [ ax, az ] = sp.de, [ bx, bz ] = sp.al;
    const x1 = Math.min(ax, bx), x2 = Math.max(ax, bx);
    const z1 = Math.min(az, bz), z2 = Math.max(az, bz);
    for ( let j = 0; j < konstruaĵoj.length; j++ ) {
      if ( j === sp.konstruajxo ) continue;
      const k = konstruaĵoj[j];
      if ( x1 <= k.x + duonLarĝo && x2 >= k.x - duonLarĝo && z1 <= k.z + duonLarĝo && z2 >= k.z - duonLarĝo ) {
        problemoj.push({ kodo: "sprono-transiras", mesaĝo: `sprono ${sp.konstruajxo} ( ${konstruaĵoj[sp.konstruajxo].tipo} ) transiras konstruaĵon ${j} ( ${k.tipo} @ ${k.x},${k.z} )` });
      }
    }
  }

  // 3. Kvar-bloka. la voja bloko — ĉiu bloko havas vojojn sur ĉiuj kvar flankoj.
  if ( arangxo.blokaGrando === "kvar" ) {
    const M = PASXO / 2;
    const havasNS = (rx: number, z: number) => vojoj.some(v => v.orient === "NS" && Math.abs(v.poz - rx) < 0.01 && v.de <= z && z <= v.al);
    const havasEW = (rz: number, x: number) => vojoj.some(v => v.orient === "EW" && Math.abs(v.poz - rz) < 0.01 && v.de <= x && x <= v.al);
    for ( const [ c, r, t ] of plano.ĉeloj ) {
      if ( c === 0 && r === 0 ) continue;
      const cx = c * PASXO, cz = r * PASXO;
      const mankas: string[] = [];
      if ( !havasEW(cz + M, cx) ) mankas.push("nordo");
      if ( !havasEW(cz - M, cx) ) mankas.push("sudo");
      if ( !havasNS(cx - M, cz) ) mankas.push("okcidento");
      if ( !havasNS(cx + M, cz) ) mankas.push("oriento");
      if ( mankas.length ) problemoj.push({ kodo: "voja-bloko", mesaĝo: `bloko (${c},${r}) ${t} mankas vojojn: ${mankas.join(", ")}` });
    }
  }

  // 4. La TUTA krado simetria sub 90°-rotacio ( la stacio estas escepto — en
  //    la unu-bloka ĝi sidas sur la norda akso, en la kvar-bloka ĝi estas la
  //    rotacie-simetria centro ).
  const normalizi = (r: number) => { const m = ((r % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI); return m > Math.PI ? m - 2 * Math.PI : m; };
  const neStaciaj = konstruaĵoj.filter(k => !k.stacia);
  const signaturo = (k: KradaKonstruajxo, rotita: boolean, kunRotacio: boolean): string => {
    const x = rotita ? -k.z : k.x;
    const z = rotita ? k.x : k.z;
    const rot = kunRotacio ? normalizi(rotita ? k.rot - Math.PI / 2 : k.rot) : 0;
    return `${x.toFixed(3)},${z.toFixed(3)},${k.tipo},${rot.toFixed(3)}`;
  };
  const kontroliSimetrion = (kunRotacio: boolean, kodo: string) => {
    const originalo = new Set(neStaciaj.map(k => signaturo(k, false, kunRotacio)));
    const rotita = new Set(neStaciaj.map(k => signaturo(k, true, kunRotacio)));
    if ( originalo.size !== rotita.size || [ ...originalo ].some(s => !rotita.has(s)) ) {
      const mankantaj = [ ...originalo ].filter(s => !rotita.has(s)).slice(0, 4);
      problemoj.push({ kodo, mesaĝo: `la krado ne estas 4-oble simetria — mankas: ${mankantaj.join(" ; ")}` });
    }
  };
  kontroliSimetrion(false, "simetrio-pozicia");
  // La rotaciaj simetrioj. la kvar-bloka tenas poziciojn KAJ rotaciojn
  // ekzakte; la unu-bloka tenas la rotaciojn de la ne-diagonalaj konstruaĵoj
  // ( la diagonalaj pordoj — |x| = |z| — frontas norden/suden, la hereda
  // fronta regulo de la originala urbo, kaj ne transformiĝas sub rotacio ).
  if ( arangxo.blokaGrando === "kvar" ) kontroliSimetrion(true, "simetrio-rotacia");
  else {
    const neDiagonalaj = neStaciaj.filter(k => Math.abs(k.x) !== Math.abs(k.z));
    const originalo = new Set(neDiagonalaj.map(k => signaturo(k, false, true)));
    const rotita = new Set(neDiagonalaj.map(k => signaturo(k, true, true)));
    if ( originalo.size !== rotita.size || [ ...originalo ].some(s => !rotita.has(s)) ) {
      const mankantaj = [ ...originalo ].filter(s => !rotita.has(s)).slice(0, 4);
      problemoj.push({ kodo: "simetrio-rotacia", mesaĝo: `la ne-diagonalaj rotacioj ne estas 4-oble simetriaj — mankas: ${mankantaj.join(" ; ")}` });
    }
  }

  // 5. Kvar-bloka. la spaco inter la konstruaĵoj en la bloko ( 8 ) egalas la
  //    distancon de la konstruaĵo al la vojo ( muro → voja centro = spur-longeco
  //    + duonL ). La kvar konstruaĵoj de bloko sidas je ±BLOKO ( 8 ), duon-
  //    larĝo 4 → la gapo inter apudaj muroj en la bloko estas 8.
  if ( arangxo.blokaGrando === "kvar" ) {
    const duonL = 0o7/0o10;
    for ( const sp of spronoj ) {
      const longo = Math.hypot(sp.al[0] - sp.de[0], sp.al[1] - sp.de[1]);
      const dist = longo + duonL;
      if ( Math.abs(dist - 8) > 0.01 ) {
        problemoj.push({ kodo: "spaco", mesaĝo: `sprono ${sp.konstruajxo}: distanco al vojo ${dist.toFixed(2)} ≠ 8 ( la spaco en la bloko )` });
      }
    }
  }

  // 6. Neniu vojo en malplena regiono — la vojoj restas apud la blokoj ( la
  //    korneroj de la diamanto kaj la regionoj preter la eksteraj blokoj
  //    ricevas nenian vojon ). Ĉiu segmento havas siajn du finojn kaj sian
  //    mezon ene de 2 pasxoj de la plej proksima ĉelo — la longaj "vostoj"
  //    laŭ la rando ( de la kornera ŝtuparo al la kolumnaj blokoj ) pasas je
  //    ~1.5 pasxoj, sed vojo tra la MEZO de malplena regiono ( pli ol 2
  //    pasxoj de ĉiu ĉelo ) estas problemo.
  const ĉelPozoj = plano.ĉeloj.map(([ c, r ]) => [ c * PASXO, r * PASXO ] as [ number, number ]);
  const distMin = (x: number, z: number) =>
    Math.min(...ĉelPozoj.map(([ cx, cz ]) => Math.hypot(x - cx, z - cz)));
  for ( const v of vojoj ) {
    if ( v.stacia ) continue;
    const punktoj = [ v.de, (v.de + v.al) / 2, v.al ];
    const distoj = v.orient === "EW"
      ? punktoj.map(x => distMin(x, v.poz))
      : punktoj.map(z => distMin(v.poz, z));
    if ( distoj.some(d => d > 2 * PASXO) ) {
      problemoj.push({ kodo: "vojo-malplena", mesaĝo: `segmento ${v.orient} @ ${v.poz} ( ${v.de}..${v.al} ) pasas pli ol 2 pasxojn de la plej proksima ĉelo` });
    }
  }

  return problemoj;
}
